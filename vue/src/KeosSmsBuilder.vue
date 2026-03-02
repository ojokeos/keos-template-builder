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
import SectionTemplateType from "./sections/SectionTemplateType.vue";
import SectionSms from "./sections/SectionSms.vue";
import { SMS_PRESETS } from "./config/presets";
import {
  DEFAULT_SAMPLE_PROFILES,
  renderTemplatePreview,
} from "./utils/renderTemplatePreview";

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    /** Cost per SMS segment for cost estimator (e.g. 0.05) */
    costPerSegment?: number;
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
    costPerSegment: 0,
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
      const errors: string[] = [];
      if (!c.name?.trim()) errors.push("Template name is required");
      const fromHost = props.hooks?.customValidators
        ? await props.hooks.customValidators(c)
        : [];
      return [...errors, ...fromHost];
    },
  },
  onDirty: () => emit("change", campaign.value),
});

const { lastSavedAt } = useAutosave(campaign, { channel: "sms" });

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
const setupScore = computed(() => {
  const msg = campaign.value.message as any;
  const checks = [
    Boolean(campaign.value.name?.trim()),
    Boolean(msg.body?.trim()),
    Boolean(msg.sender_id?.trim()),
    Boolean((campaign.value as any).template_type),
    (msg.body ?? "").length > 20,
  ];
  const passed = checks.filter(Boolean).length;
  return Math.round((passed / checks.length) * 100);
});
const setupStatusLabel = computed(() => {
  if (setupScore.value >= 90) return "Production ready";
  if (setupScore.value >= 70) return "Strong draft";
  if (setupScore.value >= 40) return "In progress";
  return "Needs setup";
});

const templateType = computed(
  () => (campaign.value as any).template_type ?? "transactional",
);
const selectedPreviewProfileId = ref<string>("");
const presetConfirmOpen = ref(false);
const pendingPreset = ref<(typeof SMS_PRESETS)[0] | null>(null);

const previewProfile = computed(() => {
  const id = selectedPreviewProfileId.value;
  if (!id) return null;
  return DEFAULT_SAMPLE_PROFILES.find((p) => p.id === id) ?? null;
});

const smsBodyDisplayPreview = computed(() => {
  const body = smsBodyRaw.value;
  if (!previewProfile.value) return body;
  return renderTemplatePreview(body, previewProfile.value.data);
});

function applyPreset(preset: (typeof SMS_PRESETS)[0]) {
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
  const preset = SMS_PRESETS.find((p) => p.id === value);
  if (!preset) return;
  if (dirty.value) {
    pendingPreset.value = preset;
    presetConfirmOpen.value = true;
  } else {
    applyPreset(preset);
  }
  (e.target as HTMLSelectElement).value = "";
}

function updateTemplateType(value: "transactional" | "marketing") {
  update({ template_type: value } as Partial<Campaign>);
}

function updateName(name: string) {
  update({
    name,
    tracking: { ...(campaign.value.tracking ?? {}), campaign_name: name },
  });
}

const smsBodyRaw = computed(
  () => (((campaign.value.message as any).body ?? "") as string) || "",
);
const smsCharCount = computed(() => smsBodyRaw.value.length);
const smsSegmentCount = computed(() => {
  if (!smsCharCount.value) return 0;
  return smsCharCount.value <= 160 ? 1 : Math.ceil(smsCharCount.value / 153);
});
const smsBodyDisplay = computed(() => {
  const substituted = smsBodyDisplayPreview.value;
  return substituted.trim().length
    ? substituted
    : "Your SMS message preview will appear here.";
});

const smsEstimatedCost = computed(() => {
  const cost = props.costPerSegment ?? 0;
  if (!cost || smsSegmentCount.value === 0) return null;
  return (smsSegmentCount.value * cost).toFixed(2);
});

const smsTruncationHint = computed(() => {
  const n = smsCharCount.value;
  if (n <= 160) return null;
  if (n <= 306) return "Consider shortening to stay within 2 segments.";
  return "Shorten this message to reduce segment count and cost.";
});
const smsSenderId = computed(
  () =>
    ((campaign.value.message as any).sender_id as string | undefined) ??
    "YourBrand",
);

function onSave() {
  if (!isValid.value) return;
  emit("save", campaign.value);
}
</script>

<template>
  <div class="keos-sms-builder">
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
          <li v-for="e in blockingErrors" :key="e.message">
            {{ e.message }}
          </li>
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
          <li v-for="w in warningsList" :key="w.message">
            {{ w.message }}
          </li>
        </ul>
      </div>
    </div>

    <div class="kb-sms-layout">
      <aside class="kb-sms-sidebar">
        <div v-if="!disabledSections.includes('sms')" class="kb-sms-form">
          <div class="kb-sms-form-head">
            <div class="kb-sms-form-head-top">
              <span class="kb-sms-form-head-label">Template</span>
              <span class="kb-sms-health-pill">{{ setupStatusLabel }}</span>
            </div>
            <div class="kb-wa-form-head-row">
              <SectionTemplateType
                :template-type="templateType"
                @update="updateTemplateType"
              />
              <select
                class="kb-preset-select"
                aria-label="Load template preset"
                @change="onPresetSelect"
              >
                <option value="">Presets…</option>
                <option v-for="p in SMS_PRESETS" :key="p.id" :value="p.id">
                  {{ p.label }}
                </option>
              </select>
            </div>
            <div class="kb-sms-health">
              <div class="kb-sms-health-row">
                <span class="kb-sms-health-title">Setup quality</span>
                <span class="kb-sms-health-value">{{ setupScore }}%</span>
              </div>
              <div class="kb-sms-health-bar"><span class="kb-sms-health-fill" :style="{ width: `${setupScore}%` }"></span></div>
            </div>
          </div>
          <SectionSms
            :message="campaign.message"
            :variable-options="variableOptions"
            :show-reset="true"
            @update="updateMessage"
            @reset="resetMessage()"
          />
        </div>
      </aside>

      <main class="kb-sms-canvas">
        <div
          v-if="!designOnly && campaign.audience.test_mode"
          class="kb-sms-test-banner"
        >
          <span class="kb-sms-test-banner-dot"></span>
          Test mode — only your test segment will receive this.
        </div>
        <div class="kb-sms-preview-chrome">
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
            <div class="kb-preview-status">
              <span class="kb-preview-status-label">Segments</span>
              <strong>{{ smsSegmentCount || 0 }}</strong>
            </div>
          </div>
          <div class="kb-sms-preview-frame">
            <div class="kb-preview">
              <div class="kb-sms-preview">
                <div class="kb-sms-phone">
                  <div class="kb-sms-status-bar">
                    <span class="kb-sms-time">9:41</span>
                    <span class="kb-sms-icons">◆ ◆ ◆</span>
                  </div>
                  <div class="kb-sms-header">
                    <div class="kb-sms-sender">
                      {{ smsSenderId }}
                    </div>
                    <div class="kb-sms-meta">Text message</div>
                  </div>
                  <div class="kb-sms-thread">
                    <div class="kb-sms-bubble kb-sms-bubble--outgoing">
                      <span class="kb-sms-text">
                        {{ smsBodyDisplay }}
                      </span>
                      <span class="kb-sms-bubble-meta"> 09:21 </span>
                    </div>
                  </div>
                </div>
                <p class="kb-sms-counter">
                  {{ smsCharCount }} characters ·
                  <span v-if="smsSegmentCount === 0">0 segments</span>
                  <span v-else-if="smsSegmentCount === 1">1 segment</span>
                  <span v-else>{{ smsSegmentCount }} segments</span>
                  (160 chars for 1 segment, 153 for multi-part)
                  <span v-if="smsEstimatedCost !== null" class="kb-sms-cost">
                    · Est. {{ smsEstimatedCost }}
                  </span>
                </p>
                <p v-if="smsTruncationHint" class="kb-sms-truncation-hint">
                  {{ smsTruncationHint }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <footer class="kb-sms-actions">
      <div v-if="props.actionsNote" class="kb-actions-note">
        {{ props.actionsNote }}
      </div>
      <div class="kb-sms-actions-right">
        <button
          v-if="showDuplicate"
          type="button"
          class="kb-sms-action kb-sms-action--secondary"
          @click="emit('duplicate', JSON.parse(JSON.stringify(campaign)))"
        >
          Duplicate
        </button>
        <button
          v-if="showSave"
          type="button"
          class="kb-sms-action kb-sms-action--secondary"
          @click="onSave"
        >
          Save
        </button>
        <button
          v-if="showClose"
          type="button"
          class="kb-sms-action kb-sms-action--primary"
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
      aria-labelledby="sms-preset-confirm-title"
    >
      <div class="kb-confirm-dialog">
        <h2 id="sms-preset-confirm-title" class="kb-confirm-title">
          Replace content?
        </h2>
        <p class="kb-confirm-text">
          Current changes will be replaced by the preset. Continue?
        </p>
        <div class="kb-confirm-actions">
          <button
            type="button"
            class="kb-sms-action kb-sms-action--secondary"
            @click="
              presetConfirmOpen = false;
              pendingPreset = null;
            "
          >
            Cancel
          </button>
          <button
            type="button"
            class="kb-sms-action kb-sms-action--primary"
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
.kb-sms-form-head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.kb-preset-select {
  font-size: 0.82rem;
  font-weight: 500;
  padding: 7px 12px;
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: #fff;
  color: var(--kb-text-strong);
  transition: border-color 0.16s, box-shadow 0.16s;
}
.kb-preset-select:focus {
  outline: none;
  border-color: var(--kb-brand);
  box-shadow: 0 0 0 3px rgba(30, 90, 255, 0.16);
}
.kb-push-preview-controls {
  margin-bottom: 12px;
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  background: #fff;
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
}
.kb-push-preview-as {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.kb-push-preview-as-label {
  font-size: 0.8125rem;
  color: var(--kb-text-muted);
  font-weight: 600;
  letter-spacing: 0.02em;
}
.keos-sms-builder {
  --kb-bg: #ffffff;
  --kb-surface: #ffffff;
  --kb-surface-muted: #f6f9fc;
  --kb-border: #d4deea;
  --kb-border-strong: #c1cedf;
  --kb-text: #1e293b;
  --kb-text-strong: #0b1220;
  --kb-text-muted: #5e7087;
  --kb-brand: #2563eb;
  --kb-shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.04);
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: var(--kb-text);
  max-width: 100%;
  box-sizing: border-box;
  background: var(--kb-bg);
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.keos-sms-builder button,
.keos-sms-builder input,
.keos-sms-builder textarea,
.keos-sms-builder select {
  font-family: inherit;
  box-sizing: border-box;
}

.kb-builder-top {
  margin-left: 26px;
  margin-right: 26px;
  flex-shrink: 0;
}

.kb-sms-layout {
  display: grid;
  background: linear-gradient(145deg, #f7fafc 0%, #eef3f8 100%);
  grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
  gap: 14px;
  flex: 1;
  min-height: 0;
  align-items: stretch;
  margin: 20px 16px 0;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #d8e1ec;
}
@media (max-width: 1023px) {
  .kb-sms-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    margin: 16px 10px 0;
    padding: 8px;
    gap: 12px;
  }
}

.kb-sms-sidebar {
  background: var(--kb-surface);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  border-radius: 16px;
  border: 1px solid var(--kb-border);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
  height: 100vh;
  -webkit-overflow-scrolling: touch;
} 
@media (max-width: 1023px) {
  .kb-sms-sidebar {
    order: 1;
    margin: 0;
    border-radius: 14px;
    border: 1px solid var(--kb-border);
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
    min-height: 0;
    height: auto;
  }
}

.kb-sms-form {
  padding: 20px 18px 22px;
}
.kb-sms-form-head {
  margin-bottom: 24px;
  padding: 12px;
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}
.kb-sms-form-head-label {
  display: block;
  font-size: 0.69rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #72839a;
  margin-bottom: 10px;
}
.kb-sms-health-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  border: 1px solid #cfe0ff;
  background: #eef4ff;
  color: #1e40af;
  font-size: 0.7rem;
  font-weight: 700;
}
.kb-sms-health {
  margin-top: 10px;
}
.kb-sms-health-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}
.kb-sms-health-title {
  color: var(--kb-text-muted);
  font-weight: 600;
}
.kb-sms-health-value {
  color: var(--kb-text-strong);
  font-weight: 700;
}
.kb-sms-health-bar {
  margin-top: 6px;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #e8edf4;
  overflow: hidden;
}
.kb-sms-health-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transition: width 0.22s ease;
}

.keos-sms-builder .kb-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: stretch;
  max-width: 100%;
  box-sizing: border-box;
}

.kb-sms-canvas {
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  min-width: 0;
  min-height: 0;
  overflow: visible;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(247, 250, 252, 0.86));
  border: 1px solid #d9e2ee;
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
}
@media (max-width: 1023px) {
  .kb-sms-canvas {
    order: -1;
    padding: 20px 14px 22px;
    gap: 16px;
  }
}

.kb-sms-test-banner {
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
.kb-sms-test-banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  animation: kb-pulse-sms 1.5s ease-in-out infinite;
}
@keyframes kb-pulse-sms {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.kb-sms-preview-chrome {
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  margin-top: 0;
}
.kb-sms-preview-title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin: 0;
  align-self: flex-start;
}
.kb-sms-preview-frame {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: linear-gradient(180deg, #eef4fa, #e7eff6);
  border: 1px solid var(--kb-border);
  border-radius: 18px;
  box-shadow:
    0 18px 34px rgba(15, 23, 42, 0.11),
    0 2px 8px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.kb-preview-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d6e0ee;
  border-radius: 999px;
  padding: 6px 10px;
  background: #f8fbff;
}
.kb-preview-status-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  font-weight: 700;
}
.kb-preview-status strong {
  font-size: 0.75rem;
  color: #0f172a;
}

.kb-actions-note {
  font-size: 0.78rem;
  color: var(--kb-text-muted);
  max-width: 56%;
  line-height: 1.35;
}

.kb-sms-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 32px 22px;
  margin: 0;
  background: var(--kb-surface);
  border: 1px solid var(--kb-border);
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  flex-shrink: 0;
  box-shadow: var(--kb-shadow-sm);
  position: sticky;
  bottom: 0;
  z-index: 10;
}
.kb-sms-actions-right {
  display: flex;
  gap: 16px;
  margin-left: auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.kb-sms-action {
  padding: 11px 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.15s,
    transform 0.1s,
    border-color 0.15s;
}
.kb-sms-action:active {
  transform: scale(0.98);
}
.kb-sms-action--secondary {
  background: #f8fafd;
  color: #334155;
  border-color: var(--kb-border-strong);
}
.kb-sms-action--secondary:hover {
  background: #edf2f7;
  border-color: #b9c8da;
}
.kb-sms-action--primary {
  background: linear-gradient(120deg, #0f172a, #1f2937);
  color: #fff;
}
.kb-sms-action--primary:hover {
  background: #1e293b;
}
@media (max-width: 1023px) {
  .kb-builder-top {
    margin-left: 12px;
    margin-right: 12px;
  }
  .kb-push-preview-controls {
    padding: 10px;
  }
  .kb-preview-status {
    width: 100%;
    justify-content: space-between;
  }
  .kb-sms-actions {
    margin: 0;
    padding: 16px 12px 18px;
    gap: 12px;
    flex-direction: column;
    align-items: stretch;
    border-left: 0;
    border-right: 0;
  }
  .kb-actions-note {
    max-width: 100%;
  }
  .kb-sms-actions-right {
    margin-left: 0;
    justify-content: stretch;
  }
  .kb-sms-action {
    flex: 1;
  }
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
.kb-preview {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  background: #f8fafc;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}
.kb-sms-preview {
  margin-top: 8px;
}
.kb-sms-phone {
  max-width: 360px;
  margin: 0 auto;
  border-radius: 24px;
  background: #020617;
  padding: 10px 12px 14px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.5);
  color: #e5e7eb;
}
.kb-sms-status-bar {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 6px;
}
.kb-sms-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;
}
.kb-sms-sender {
  font-weight: 600;
  font-size: 0.875rem;
}
.kb-sms-meta {
  font-size: 0.75rem;
  color: #9ca3af;
}
.kb-sms-thread {
  margin-top: 6px;
}
.kb-sms-bubble {
  max-width: 80%;
  margin-left: auto;
  border-radius: 18px;
  padding: 8px 10px;
  font-size: 0.875rem;
  line-height: 1.35;
  background: linear-gradient(to right, #22c55e, #16a34a);
  color: #022c22;
  position: relative;
}
.kb-sms-bubble-meta {
  display: block;
  font-size: 0.7rem;
  color: #0f172a;
  opacity: 0.75;
  margin-top: 4px;
  text-align: right;
}
.kb-sms-text {
  white-space: pre-wrap;
}
.kb-sms-counter {
  margin-top: 8px;
  font-size: 0.75rem;
  color: #64748b;
}
.kb-sms-cost {
  font-weight: 500;
  color: #0f172a;
}
.kb-sms-truncation-hint {
  margin-top: 4px;
  font-size: 0.75rem;
  color: #b45309;
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
