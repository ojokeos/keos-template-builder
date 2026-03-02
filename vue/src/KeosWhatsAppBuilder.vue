<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import type {
  Campaign,
  BuilderExtensionHooks,
} from "@keos/notification-builder-core";
import { spacing, colors, radius } from "@keos/notification-builder-ui-tokens";
import { useCampaignState } from "./composables/useCampaignState";
import { useAutosave } from "./composables/useAutosave";
import BuilderHeader from "./BuilderHeader.vue";
import SectionPersonalization from "./sections/SectionPersonalization.vue";
import SectionWhatsApp from "./sections/SectionWhatsApp.vue";
import WhatsAppTemplatePreview from "./WhatsAppTemplatePreview.vue";
import type { WaPreviewTemplate } from "./WhatsAppTemplatePreview.vue";
import { WHATSAPP_PRESETS } from "./config/presets";
import {
  DEFAULT_SAMPLE_PROFILES,
  renderTemplatePreview,
} from "./utils/renderTemplatePreview";

const WA_HEADER_LIMIT = 60;
const WA_BODY_LIMIT = 1024;
const WA_FOOTER_LIMIT = 60;
const WA_MAX_BUTTONS = 10;
const WA_MAX_CAROUSEL_CARDS = 10;

function validateWhatsAppTemplate(c: Campaign): string[] {
  const errors: string[] = [];
  const msg = c.message as any;
  const category = (msg.template_category ?? "").toString().trim();
  const templateType = (msg.template_type ?? "text").toString();
  const headerType = (msg.header_type ?? "none").toString();
  const headerText = (msg.header ?? "").toString();
  const body = (msg.body ?? "").toString();
  const footer = (msg.footer ?? "").toString();
  const buttons = Array.isArray(msg.buttons) ? msg.buttons : [];
  const cards = Array.isArray(msg.cards) ? msg.cards : [];

  if (!c.name?.trim()) errors.push("Template name is required");
  if (!msg.template_name?.trim())
    errors.push("WhatsApp template name is required");
  if (!category)
    errors.push("WhatsApp category is required (Marketing, Utility, or Authentication)");
  if (!body.trim()) errors.push("Body is required");

  if (headerType === "text" && headerText.length > WA_HEADER_LIMIT) {
    errors.push(`Header text cannot exceed ${WA_HEADER_LIMIT} characters`);
  }
  if (body.length > WA_BODY_LIMIT) {
    errors.push(`Body cannot exceed ${WA_BODY_LIMIT} characters`);
  }
  if (footer.length > WA_FOOTER_LIMIT) {
    errors.push(`Footer cannot exceed ${WA_FOOTER_LIMIT} characters`);
  }
  if (buttons.length > WA_MAX_BUTTONS) {
    errors.push(`Buttons cannot exceed ${WA_MAX_BUTTONS}`);
  }

  if (
    (templateType === "image" ||
      templateType === "video" ||
      templateType === "document" ||
      headerType === "image" ||
      headerType === "video" ||
      headerType === "document") &&
    !msg.media_url
  ) {
    errors.push("Media URL is required for rich media templates");
  }

  if (category === "authentication" && templateType !== "auth") {
    errors.push("Authentication category must use Authentication format");
  }
  if (templateType === "auth" && !msg.auth_label?.trim() && !body.includes("{{")) {
    errors.push("Authentication templates should include a code label or placeholder variable");
  }
  if (templateType === "lto" && !msg.lto_expiry) {
    errors.push("Limited-time offer requires an expiry");
  }
  if ((templateType === "mpm" || templateType === "catalog") && !msg.products?.length) {
    errors.push("Catalog and multi-product templates require at least one product");
  }
  if (templateType === "flow" && !msg.flow_id?.trim()) {
    errors.push("WhatsApp Flow format requires a flow ID");
  }
  if (templateType === "carousel") {
    if (!cards.length) {
      errors.push("Carousel format requires at least one card");
    } else if (cards.length > WA_MAX_CAROUSEL_CARDS) {
      errors.push(`Carousel supports up to ${WA_MAX_CAROUSEL_CARDS} cards`);
    }
  }

  return errors;
}

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showDuplicate?: boolean;
    /** Optional helper text shown on the left side of the action bar. */
    actionsNote?: string;
    /**
     * When true (default), builder is design-only: template content + preview.
     * Audience and send options are configured on another page.
     */
    designOnly?: boolean;
    /**
     * When true, campaign name is normalized by replacing spaces with hyphens
     * as the user types (e.g. "Spring Sale" → "Spring-Sale").
     */
    enforceSlugName?: boolean;
  }>(),
  {
    disabledSections: () => [],
    variableOptions: () => [],
    showSave: true,
    showClose: true,
    showDuplicate: true,
    actionsNote: "",
    designOnly: true,
    enforceSlugName: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [campaign: Campaign];
  change: [campaign: Campaign];
  save: [campaign: Campaign];
  edit: [];
  "send-test": [campaign: Campaign];
  schedule: [campaign: Campaign];
  send: [campaign: Campaign];
  duplicate: [campaign: Campaign];
}>();

const {
  campaign,
  dirty,
  customValidatorErrors,
  getValidationWithWarnings,
  update,
  updateMessage,
  undo,
  redo,
  canUndo,
  canRedo,
  resetMessage,
  hooks,
} = useCampaignState({
  initial: props.modelValue,
  hooks: {
    ...props.hooks,
    customValidators: async (c) => {
      const errors = validateWhatsAppTemplate(c);
      const fromHost = props.hooks?.customValidators
        ? await props.hooks.customValidators(c)
        : [];
      return [...errors, ...fromHost];
    },
  },
  onDirty: () => emit("change", campaign.value),
});

const { lastSavedAt } = useAutosave(campaign, { channel: "whatsapp" });

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === "z") {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});

watch(campaign, (c) => emit("update:modelValue", c), { deep: true });

const estimatedReach = ref<number | undefined>();
const canSend = ref(true);

async function resolveHooks() {
  if (hooks.estimateReach) {
    try {
      estimatedReach.value = await hooks.estimateReach(campaign.value.audience);
    } catch {
      estimatedReach.value = undefined;
    }
  }
  if (hooks.canSend) canSend.value = await Promise.resolve(hooks.canSend());
}

resolveHooks();
watch(() => campaign.value.audience, resolveHooks, { deep: true });

const validationFull = computed(() => {
  void customValidatorErrors.value;
  return getValidationWithWarnings(estimatedReach.value);
});
const blockingErrors = computed(() => validationFull.value.blockingErrors);
const warningsList = computed(() => validationFull.value.warnings);
const isValid = computed(() => validationFull.value.valid);

const selectedPreviewProfileId = ref<string>("");
const presetConfirmOpen = ref(false);
const pendingPreset = ref<(typeof WHATSAPP_PRESETS)[0] | null>(null);

const previewProfile = computed(() => {
  const id = selectedPreviewProfileId.value;
  if (!id) return null;
  return DEFAULT_SAMPLE_PROFILES.find((p) => p.id === id) ?? null;
});

const waBodyDisplay = computed(() => {
  const body = (campaign.value.message as any).body ?? "";
  if (!previewProfile.value) return body;
  return renderTemplatePreview(body, previewProfile.value.data);
});
const waHeaderDisplay = computed(() => {
  const header = (campaign.value.message as any).header ?? "";
  if (!previewProfile.value) return header;
  return renderTemplatePreview(header, previewProfile.value.data);
});

/** Map campaign.message to the WhatsAppTemplatePreview template shape (cream phone + green bubble). */
const waPreviewTemplate = computed((): WaPreviewTemplate => {
  const msg = campaign.value.message as any;
  const templateType = msg.template_type ?? "text";
  const headerType = msg.header_type ?? "none";
  let header: WaPreviewTemplate["header"] | undefined;
  let location: WaPreviewTemplate["location"] | undefined;
  let catalog: WaPreviewTemplate["catalog"] | undefined;
  let multiProduct: WaPreviewTemplate["multiProduct"] | undefined;
  let coupon: WaPreviewTemplate["coupon"] | undefined;
  let limitedOffer: WaPreviewTemplate["limitedOffer"] | undefined;
  let auth: WaPreviewTemplate["auth"] | undefined;

  if ((templateType === "image" || headerType === "image") && msg.media_url) {
    header = { type: "image", url: msg.media_url };
  } else if ((templateType === "video" || headerType === "video") && msg.media_url) {
    header = { type: "video", url: msg.media_url };
  } else if (templateType === "document" || headerType === "document") {
    header = {
      type: "document",
      filename: msg.document_filename || msg.media_url || "document.pdf",
    };
  } else if (headerType === "text" && msg.header) {
    header = { type: "text", text: waHeaderDisplay.value };
  } else if (msg.header) {
    header = { type: "text", text: waHeaderDisplay.value };
  }
  const body =
    waBodyDisplay.value || "Start adding content to see a live preview here.";

  if (templateType === "location" && msg.location) {
    const rawLoc = msg.location as any;
    const lat = rawLoc.lat ?? rawLoc.latitude;
    const lng = rawLoc.lng ?? rawLoc.lon ?? rawLoc.longitude;
    if (lat != null && lng != null) {
      location = {
        lat,
        lng,
        name: rawLoc.name ?? rawLoc.title,
        address: rawLoc.address ?? `${lat}, ${lng}`,
      };
    }
  }

  if (
    (templateType === "catalog" || templateType === "mpm") &&
    Array.isArray(msg.products) &&
    msg.products.length
  ) {
    catalog = true;
    multiProduct = (msg.products as any[]).map((p) => ({
      image: p.image ?? p.imageUrl,
      name: p.name ?? p.sectionTitle ?? p.title ?? "Product",
      price: p.price ?? p.productId ?? "",
    }));
  }
  if (templateType === "carousel" && Array.isArray(msg.cards) && msg.cards.length) {
    catalog = true;
    multiProduct = (msg.cards as any[]).map((c) => ({
      image: c.image ?? c.media_url,
      name: c.title ?? "Card",
      price: c.button_label ?? "",
    }));
  }

  if (templateType === "coupon" && msg.coupon_code) {
    coupon = { code: msg.coupon_code };
  }

  if (templateType === "lto" && msg.lto_expiry) {
    limitedOffer = msg.lto_expiry;
  }

  if (templateType === "auth") {
    const code = msg.auth_code ?? (msg as any).otp_code ?? "123 456";
    auth = { code };
  }

  const buttonsRaw = (msg.buttons as { label?: string }[] | undefined) ?? [];
  if (templateType === "flow") {
    buttonsRaw.push({
      label: msg.flow_cta_label ?? "Open flow",
    });
  }
  return {
    format: templateType,
    templateName: msg.template_name || undefined,
    templateLanguage: msg.template_language || undefined,
    templateCategory: msg.template_category || undefined,
    header,
    body,
    mediaCaption: msg.media_caption || undefined,
    footer: msg.footer || undefined,
    buttons: buttonsRaw.map((b) => ({ text: b.label || "Button" })),
    location,
    catalog,
    multiProduct,
    coupon,
    limitedOffer,
    auth,
    flow:
      templateType === "flow"
        ? {
            id: msg.flow_id || undefined,
            ctaLabel: msg.flow_cta_label || "Open flow",
          }
        : undefined,
  };
});

function applyPreset(preset: (typeof WHATSAPP_PRESETS)[0]) {
  const c = campaign.value;
  const msg = preset.campaign.message
    ? { ...c.message, ...preset.campaign.message }
    : c.message;
  update({
    ...preset.campaign,
    message: msg,
  });
  pendingPreset.value = null;
  presetConfirmOpen.value = false;
}

function onPresetSelect(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  if (!value) return;
  const preset = WHATSAPP_PRESETS.find((p) => p.id === value);
  if (!preset) return;
  if (dirty.value) {
    pendingPreset.value = preset;
    presetConfirmOpen.value = true;
  } else {
    applyPreset(preset);
  }
  (e.target as HTMLSelectElement).value = "";
}

function updateName(name: string) {
  update({
    name,
    tracking: { ...(campaign.value.tracking ?? {}), campaign_name: name },
  });
}

function onInsertVariable(payload: {
  variable: string;
  field: "title" | "body";
}) {
  const token = ` {{ ${payload.variable} }}`;
  const existingVars = campaign.value.message.variables ?? [];
  const nextVars = Array.from(new Set([...existingVars, payload.variable]));
  if (payload.field === "title") {
    const currentHeader = (campaign.value.message as any).header ?? "";
    updateMessage({
      variables: nextVars,
      header: currentHeader + token,
    } as any);
  } else {
    const currentBody = (campaign.value.message as any).body ?? "";
    updateMessage({
      variables: nextVars,
      body: currentBody + token,
    } as any);
  }
}

function onSave() {
  if (!isValid.value) return;
  emit("save", campaign.value);
}
</script>

<template>
  <div class="keos-whatsapp-builder">
    <div class="kb-builder-top">
      <BuilderHeader
        :campaign-name="campaign.name"
        :status="campaign.status"
        :dirty="dirty"
        :last-saved-at="lastSavedAt"
        :can-undo="canUndo"
        :can-redo="canRedo"
        :slugify-name="props.enforceSlugName"
        @update:campaign-name="updateName"
        @undo="undo"
        @redo="redo"
      />

      <div
        v-if="blockingErrors.length > 0"
        class="kb-errors"
        :style="{
          background: colors.dangerBg,
          border: `1px solid ${colors.dangerBorder}`,
          borderRadius: `${radius.input}px`,
          padding: `${spacing[12]}px ${spacing[16]}px`,
          marginBottom: `${spacing[16]}px`,
        }"
      >
        <ul
          :style="{ margin: 0, paddingLeft: '1.25rem', color: colors.danger }"
        >
          <li v-for="e in blockingErrors" :key="e.message">{{ e.message }}</li>
        </ul>
      </div>
      <div
        v-if="warningsList.length > 0"
        class="kb-warnings"
        :style="{
          background: colors.neutral.bg,
          border: `1px solid ${colors.neutral.border}`,
          borderRadius: `${radius.input}px`,
          padding: `${spacing[12]}px ${spacing[16]}px`,
          marginBottom: `${spacing[16]}px`,
          fontSize: '0.875rem',
          color: colors.neutral.textMuted,
        }"
      >
        <strong :style="{ display: 'block', marginBottom: `${spacing[4]}px` }"
          >Warnings</strong
        >
        <ul :style="{ margin: 0, paddingLeft: '1.25rem' }">
          <li v-for="w in warningsList" :key="w.message">{{ w.message }}</li>
        </ul>
      </div>
    </div>

    <div class="kb-wa-layout">
      <aside class="kb-wa-sidebar">
        <div v-if="!disabledSections.includes('whatsapp')" class="kb-wa-form">
          <div class="kb-wa-form-head">
            <span class="kb-wa-form-head-label">Template</span>
            <div class="kb-wa-form-head-row">
              <select
                class="kb-preset-select"
                aria-label="Load template preset"
                @change="onPresetSelect"
              >
                <option value="">Presets…</option>
                <option v-for="p in WHATSAPP_PRESETS" :key="p.id" :value="p.id">
                  {{ p.label }}
                </option>
              </select>
            </div>
          </div>
          <SectionWhatsApp
            :message="campaign.message"
            :show-reset="true"
            @update="updateMessage"
            @reset="resetMessage()"
          />
          <SectionPersonalization
            :message="campaign.message"
            :variable-options="variableOptions"
            @update="updateMessage"
            @insert-variable="onInsertVariable"
          />
        </div>
      </aside>

      <main class="kb-wa-canvas">
        <div
          v-if="!designOnly && campaign.audience.test_mode"
          class="kb-wa-test-banner"
        >
          <span class="kb-wa-test-banner-dot"></span>
          Test mode — only your test segment will receive this.
        </div>
        <div class="kb-wa-preview-chrome">
          <div class="kb-push-preview-controls">
            <label class="kb-push-preview-as">
              <span class="kb-push-preview-as-label">Preview as</span>
              <select
                v-model="selectedPreviewProfileId"
                class="kb-preset-select"
                aria-label="Preview as profile"
              >
                <option value="">No substitution</option>
                <option
                  v-for="pr in DEFAULT_SAMPLE_PROFILES"
                  :key="pr.id"
                  :value="pr.id"
                >
                  {{ pr.label }}
                </option>
              </select>
            </label>
          </div>
          <div class="kb-wa-preview-frame">
            <WhatsAppTemplatePreview :template="waPreviewTemplate" />
          </div>
        </div>
      </main>
    </div>

    <footer class="kb-wa-actions">
      <div v-if="props.actionsNote" class="kb-actions-note">
        {{ props.actionsNote }}
      </div>
      <div class="kb-wa-actions-right">
        <button
          v-if="showDuplicate"
          type="button"
          class="kb-wa-action kb-wa-action--secondary"
          @click="emit('duplicate', JSON.parse(JSON.stringify(campaign)))"
        >
          Duplicate
        </button>
        <button
          v-if="showSave"
          type="button"
          class="kb-wa-action kb-wa-action--secondary"
          @click="onSave"
        >
          Save
        </button>
        <button
          v-if="showClose"
          type="button"
          class="kb-wa-action kb-wa-action--primary"
          @click="emit('edit')"
        >
          Close
        </button>
      </div>
    </footer>

    <div
      v-if="presetConfirmOpen"
      class="kb-confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-preset-confirm-title"
    >
      <div class="kb-confirm-dialog">
        <h2 id="wa-preset-confirm-title" class="kb-confirm-title">
          Replace content?
        </h2>
        <p class="kb-confirm-text">
          Current changes will be replaced by the preset. Continue?
        </p>
        <div class="kb-confirm-actions">
          <button
            type="button"
            class="kb-wa-action kb-wa-action--secondary"
            @click="
              presetConfirmOpen = false;
              pendingPreset = null;
            "
          >
            Cancel
          </button>
          <button
            type="button"
            class="kb-wa-action kb-wa-action--primary"
            @click="pendingPreset && applyPreset(pendingPreset)"
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-wa-form-head-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.kb-preset-select {
  font-size: 0.8125rem;
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #334155;
}
.kb-push-preview-controls {
  margin-bottom: 12px;
  align-self: flex-start;
}
.kb-push-preview-as {
  display: flex;
  align-items: center;
  gap: 8px;
}
.kb-push-preview-as-label {
  font-size: 0.8125rem;
  color: #64748b;
}
.keos-whatsapp-builder {
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 14px;
  color: #0f172a;
  max-width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.keos-whatsapp-builder button,
.keos-whatsapp-builder input,
.keos-whatsapp-builder textarea,
.keos-whatsapp-builder select {
  font-family: inherit;
  box-sizing: border-box;
}

.kb-builder-top {
  margin-left: 24px;
  margin-right: 24px;
  flex-shrink: 0;
}

.kb-wa-layout {
  display: grid;
  background: linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%);
  grid-template-columns: minmax(360px, 420px) minmax(420px, 1fr);
  gap: 0;
  flex: 1;
  min-height: 0;
  align-items: stretch;
  margin-top: 24px;
}
@media (max-width: 1360px) {
  .kb-wa-layout {
    grid-template-columns: minmax(340px, 400px) minmax(400px, 1fr);
  }
}
@media (max-width: 1023px) {
  .kb-wa-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    margin-top: 20px;
  }
}

.kb-wa-sidebar {
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  border-radius: 0 10px 10px 0;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-left: none;
  box-shadow: 2px 0 12px -4px rgba(15, 23, 42, 0.06);
  height: 95dvh;
  -webkit-overflow-scrolling: touch;
}
@media (max-width: 1023px) {
  .kb-wa-sidebar {
    order: 1;
    margin: 0;
    border-radius: 0;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-top: none;
    box-shadow: 0 -2px 12px -4px rgba(15, 23, 42, 0.06);
    min-height: 0;
  }
}

.kb-wa-form {
  padding: 28px 24px 40px 24px;
}
@media (max-width: 1360px) {
  .kb-wa-form {
    padding: 24px 18px 34px 18px;
  }
}
.kb-wa-form-head {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}
.kb-wa-form-head-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin-bottom: 12px;
}

.keos-whatsapp-builder .kb-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: stretch;
  max-width: 100%;
  box-sizing: border-box;
}

.kb-wa-canvas {
  padding: 40px 48px 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
}
@media (max-width: 1023px) {
  .kb-wa-canvas {
    order: -1;
    padding: 28px 20px 32px 20px;
    gap: 24px;
  }
}

.kb-wa-test-banner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8125rem;
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 8px;
}
.kb-wa-test-banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  animation: kb-pulse-wa 1.5s ease-in-out infinite;
}
@keyframes kb-pulse-wa {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.kb-wa-preview-chrome {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 8px;
}
.kb-wa-preview-frame {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.08),
    0 2px 4px -2px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.03);
}

.kb-actions-note {
  font-size: 0.75rem;
  color: #64748b;
  max-width: 50%;
}

.kb-wa-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 32px 24px;
  background: #fff;
  border-top: 1px solid #e2e8f0;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}
.kb-wa-actions-right {
  display: flex;
  gap: 16px;
  margin-left: auto;
}
.kb-wa-action {
  padding: 12px 24px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition:
    background 0.15s,
    transform 0.1s;
}
.kb-wa-action:active {
  transform: scale(0.98);
}
.kb-wa-action--secondary {
  background: #f1f5f9;
  color: #475569;
}
.kb-wa-action--secondary:hover {
  background: #e2e8f0;
  color: #334155;
}
.kb-wa-action--primary {
  background: #0f172a;
  color: #fff;
}
.kb-wa-action--primary:hover {
  background: #1e293b;
}

.kb-stepper {
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.kb-stepper__item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  background: #fff;
  border: 0;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  text-align: left;
}
.kb-stepper__item:last-child {
  border-bottom: 0;
}
.kb-stepper__item--active {
  background: #eff6ff;
}
.kb-stepper__index {
  font-size: 0.75rem;
  font-weight: 600;
  width: 20px;
  text-align: center;
  color: #2563eb;
}
.kb-stepper__content {
  flex: 1;
}
.kb-stepper__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
}
.kb-stepper__description {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
}
.kb-stepper__status {
  font-size: 0.75rem;
  font-weight: 500;
  color: #b91c1c;
}
.kb-stepper__status--warning {
  color: #b45309;
}
.kb-stepper__status--ok {
  color: #15803d;
}
.kb-confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.kb-confirm-dialog {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.4);
}
.kb-confirm-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
}
.kb-confirm-text {
  margin: 0;
  font-size: 0.875rem;
  color: #475569;
}
.kb-confirm-summary {
  margin: 0 0 12px 0;
  padding-left: 1.1rem;
  font-size: 0.875rem;
  color: #0f172a;
}
.kb-confirm-summary li {
  margin-bottom: 4px;
}
.kb-confirm-errors,
.kb-confirm-warnings {
  margin-bottom: 12px;
  font-size: 0.8125rem;
}
.kb-confirm-errors strong {
  color: #b91c1c;
}
.kb-confirm-warnings strong {
  color: #b45309;
}
.kb-confirm-errors ul,
.kb-confirm-warnings ul {
  margin: 4px 0 0 1rem;
  padding: 0;
}
.kb-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
