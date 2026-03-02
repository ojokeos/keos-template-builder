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
import SectionMessage from "./sections/SectionMessage.vue";
import SectionPersonalization from "./sections/SectionPersonalization.vue";
import SectionTemplateType from "./sections/SectionTemplateType.vue";
import SectionDelivery from "./sections/SectionDelivery.vue";
import SectionAdvanced from "./sections/SectionAdvanced.vue";
import PreviewPanel from "./PreviewPanel.vue";
import BuilderVersionHistoryModal from "./BuilderVersionHistoryModal.vue";
import type { VersionEntry } from "./BuilderVersionHistoryModal.vue";
import type { Platform } from "@keos/notification-builder-core";
import { PUSH_PRESETS } from "./config/presets";
import { DEFAULT_SAMPLE_PROFILES } from "./utils/renderTemplatePreview";

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    /** Version history entries (from parent) for "Version history" modal */
    versions?: VersionEntry[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showHistory?: boolean;
    showSaveVersion?: boolean;
    showDuplicate?: boolean;
    /**
     * Optional helper text shown on the left side of the action bar.
     * Useful for comments like “Changes auto-saved” or “Design only”.
     */
    actionsNote?: string;
    /**
     * When true (default), builder is design-only: message content + preview.
     * Audience, delivery/schedule, and send options are configured on another page.
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
    versions: () => [],
    showSave: true,
    showClose: true,
    showHistory: true,
    showSaveVersion: true,
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
  "save-version": [campaign: Campaign];
}>();

const selectedPlatform = ref<Platform>("android");
const selectedPreviewProfileId = ref<string>("");
const presetConfirmOpen = ref(false);
const pendingPreset = ref<(typeof PUSH_PRESETS)[0] | null>(null);
const versionHistoryOpen = ref(false);

const workflowStatus = computed(
  () => (campaign.value as any).workflow_status ?? "draft",
);

const previewProfile = computed(() => {
  const id = selectedPreviewProfileId.value;
  if (!id) return null;
  return DEFAULT_SAMPLE_PROFILES.find((p) => p.id === id) ?? null;
});

function applyPreset(preset: (typeof PUSH_PRESETS)[0]) {
  const c = campaign.value;
  const msg = preset.campaign.message
    ? { ...c.message, ...preset.campaign.message }
    : c.message;
  const del = preset.campaign.delivery
    ? { ...c.delivery, ...preset.campaign.delivery }
    : c.delivery;
  update({
    ...preset.campaign,
    message: msg,
    delivery: del,
  });
  pendingPreset.value = null;
  presetConfirmOpen.value = false;
}

function onPresetSelect(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  if (!value) return;
  const preset = PUSH_PRESETS.find((p) => p.id === value);
  if (!preset) return;
  if (dirty.value) {
    pendingPreset.value = preset;
    presetConfirmOpen.value = true;
  } else {
    applyPreset(preset);
  }
  (e.target as HTMLSelectElement).value = "";
}

function onRestoreVersion(snapshot: Campaign) {
  campaign.value = snapshot;
  versionHistoryOpen.value = false;
}

const {
  campaign,
  dirty,
  customValidatorErrors,
  getValidationWithWarnings,
  update,
  updateMessage,
  updateDelivery,
  undo,
  redo,
  canUndo,
  canRedo,
  resetMessage,
  resetDelivery,
  getPreview,
  characterLimits,
  hooks,
} = useCampaignState({
  initial: props.modelValue,
  hooks: {
    ...props.hooks,
    customValidators: async (c) => {
      const errors: string[] = [];
      if (!c.name?.trim()) errors.push("Template name is required");
      if (!c.message?.body?.trim()) errors.push("Message body is required");
      const fromHost = props.hooks?.customValidators
        ? await props.hooks.customValidators(c)
        : [];
      return [...errors, ...fromHost];
    },
  },
  onDirty: () => emit("change", campaign.value),
});

const { lastSavedAt } = useAutosave(campaign, { channel: "push" });

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
const canSchedule = ref(true);

async function resolveHooks() {
  if (hooks.estimateReach) {
    try {
      estimatedReach.value = await hooks.estimateReach(campaign.value.audience);
    } catch {
      estimatedReach.value = undefined;
    }
  }
  if (hooks.canSend) canSend.value = await Promise.resolve(hooks.canSend());
  if (hooks.canSchedule)
    canSchedule.value = await Promise.resolve(hooks.canSchedule());
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

const titleLimit = computed(
  () => characterLimits[selectedPlatform.value].title,
);
const bodyLimit = computed(() => characterLimits[selectedPlatform.value].body);
const titleCount = computed(() => campaign.value.message.title.length);
const bodyCount = computed(() => campaign.value.message.body.length);

const titleError = computed(() => {
  if (titleCount.value > titleLimit.value)
    return `Title exceeds ${titleLimit.value} characters for ${selectedPlatform.value}.`;
  return undefined;
});
const bodyError = computed(() => {
  const e = blockingErrors.value.find(
    (x) => x.message === "Message body is required",
  );
  if (e) return e.message;
  if (bodyCount.value > bodyLimit.value)
    return `Body exceeds ${bodyLimit} characters for ${selectedPlatform.value}.`;
  return undefined;
});

const templateType = computed(
  () => (campaign.value as any).template_type ?? "transactional",
);

function updateTemplateType(value: "transactional" | "marketing") {
  update({ template_type: value } as Partial<Campaign>);
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
    updateMessage({
      title: campaign.value.message.title + token,
      variables: nextVars,
    });
  } else {
    updateMessage({
      body: campaign.value.message.body + token,
      variables: nextVars,
    });
  }
}

function onSave() {
  if (!isValid.value) return;
  emit("save", campaign.value);
}
</script>

<template>
  <div class="keos-notification-builder">
    <div class="kb-builder-top">
      <BuilderHeader
        :campaign-name="campaign.name"
        :status="campaign.status"
        :dirty="dirty"
        :last-saved-at="lastSavedAt"
        :can-undo="canUndo"
        :can-redo="canRedo"
        :workflow-status="workflowStatus"
        :slugify-name="props.enforceSlugName"
        @update:campaign-name="updateName"
        @update:workflow-status="
          (v: string) => update({ workflow_status: v } as any)
        "
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

    <div class="kb-push-layout">
      <aside class="kb-push-sidebar">
        <div v-if="!disabledSections.includes('message')" class="kb-push-form">
          <div
            v-if="!campaign.message.title && !campaign.message.body"
            class="kb-hint-card"
          >
            Add a title and message below to get started.
          </div>
          <div class="kb-push-form-head">
            <span class="kb-push-form-head-label">Template</span>
            <div class="kb-push-form-head-row">
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
                <option v-for="p in PUSH_PRESETS" :key="p.id" :value="p.id">
                  {{ p.label }}
                </option>
              </select>
            </div>
          </div>
          <SectionMessage
            :message="campaign.message"
            :title-count="titleCount"
            :body-count="bodyCount"
            :title-limit="titleLimit"
            :body-limit="bodyLimit"
            :selected-platform="selectedPlatform"
            :show-reset="true"
            :title-error="titleError"
            :body-error="bodyError"
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

        <div
          v-if="!designOnly && !disabledSections.includes('delivery')"
          class="kb-push-form"
        >
          <div class="kb-push-form-head">
            <span class="kb-push-form-head-label">Schedule</span>
          </div>
          <SectionDelivery
            :delivery="campaign.delivery"
            :show-push-options="true"
            :show-reset="true"
            @update="updateDelivery"
            @reset="resetDelivery()"
          />
          <SectionAdvanced
            :delivery="campaign.delivery"
            @update="updateDelivery"
          />
        </div>
      </aside>

      <main class="kb-push-canvas">
        <div
          v-if="!designOnly && campaign.audience.test_mode"
          class="kb-push-test-banner"
        >
          <span class="kb-push-test-banner-dot"></span>
          Test mode — only your test segment will receive this.
        </div>
        <div class="kb-push-preview-chrome">
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
          <div
            class="kb-push-device-toggle"
            role="tablist"
            aria-label="Preview platform"
          >
            <button
              v-for="p in ['android', 'ios', 'web'] as const"
              :key="p"
              type="button"
              class="kb-push-device-btn"
              :class="{ 'kb-push-device-btn--active': selectedPlatform === p }"
              role="tab"
              :aria-selected="selectedPlatform === p"
              :aria-controls="`kb-preview-panel-${p}`"
              @click="selectedPlatform = p"
            >
              {{ p.toUpperCase() }}
            </button>
          </div>
          <div class="kb-push-preview-frame">
            <div
              v-if="!campaign.message.title && !campaign.message.body"
              class="kb-push-preview-empty"
              data-preview-empty
            >
              <p class="kb-push-preview-empty-text">
                Start adding content to see a live preview here.
              </p>
            </div>
            <PreviewPanel
              v-else
              :get-preview="getPreview"
              :selected-platform="selectedPlatform"
              :preview-profile="previewProfile"
              @update:selected-platform="
                (p: Platform) => (selectedPlatform = p)
              "
            />
          </div>
        </div>
      </main>
    </div>

    <footer class="kb-push-actions">
      <div v-if="props.actionsNote" class="kb-actions-note">
        {{ props.actionsNote }}
      </div>
      <div class="kb-push-actions-right">
        <button
          v-if="!designOnly && showHistory"
          type="button"
          class="kb-push-action kb-push-action--secondary"
          @click="versionHistoryOpen = true"
        >
          Version history
        </button>
        <button
          v-if="!designOnly && showSaveVersion"
          type="button"
          class="kb-push-action kb-push-action--secondary"
          @click="emit('save-version', JSON.parse(JSON.stringify(campaign)))"
        >
          Save as version
        </button>
        <button
          v-if="showDuplicate"
          type="button"
          class="kb-push-action kb-push-action--secondary"
          @click="emit('duplicate', JSON.parse(JSON.stringify(campaign)))"
        >
          Duplicate
        </button>
        <button
          v-if="showSave"
          type="button"
          class="kb-push-action kb-push-action--secondary"
          @click="onSave"
        >
          Save
        </button>
        <button
          v-if="showClose"
          type="button"
          class="kb-push-action kb-push-action--primary"
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
      aria-labelledby="preset-confirm-title"
    >
      <div class="kb-confirm-dialog">
        <h2 id="preset-confirm-title" class="kb-confirm-title">
          Replace content?
        </h2>
        <p class="kb-confirm-text">
          Current changes will be replaced by the preset. Continue?
        </p>
        <div class="kb-confirm-actions">
          <button
            type="button"
            class="kb-push-action kb-push-action--secondary"
            @click="
              presetConfirmOpen = false;
              pendingPreset = null;
            "
          >
            Cancel
          </button>
          <button
            type="button"
            class="kb-push-action kb-push-action--primary"
            @click="pendingPreset && applyPreset(pendingPreset)"
          >
            Replace
          </button>
        </div>
      </div>
    </div>

    <BuilderVersionHistoryModal
      :open="versionHistoryOpen"
      :versions="versions"
      @close="versionHistoryOpen = false"
      @restore="onRestoreVersion"
    />
  </div>
</template>

<style scoped>
.keos-notification-builder {
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

.keos-notification-builder button,
.keos-notification-builder input,
.keos-notification-builder textarea,
.keos-notification-builder select {
  font-family: inherit;
  box-sizing: border-box;
}

.kb-builder-top {
  margin-left: 24px;
  margin-right: 24px;
  flex-shrink: 0;
}

.kb-push-layout {
  display: grid;
  background: linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%);
  grid-template-columns: 380px 1fr;
  gap: 0;
  flex: 1;
  min-height: 0;
  align-items: stretch;
  margin-top: 24px;
}
@media (max-width: 1023px) {
  .kb-push-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    margin-top: 20px;
  }
}

.kb-push-sidebar {
  background: #fff;
  padding: 0;
  margin: 0;
  border-radius: 0;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-left: none;
  box-shadow: 2px 0 12px -4px rgba(15, 23, 42, 0.06);
  overflow-y: auto;
  overflow-x: hidden;
  height: 95dvh;
  -webkit-overflow-scrolling: touch;
}
@media (max-width: 1023px) {
  .kb-push-sidebar {
    order: 1;
    margin: 0;
    border-radius: 0;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-top: none;
    box-shadow: 0 -2px 12px -4px rgba(15, 23, 42, 0.06);
    min-height: 0;
  }
}

.kb-push-form {
  padding: 28px 24px 40px 24px;
}
.kb-push-form-head {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}
.kb-push-form-head-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin-bottom: 12px;
}
.kb-push-form-head-row {
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

.keos-notification-builder .kb-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: stretch;
  max-width: 100%;
  box-sizing: border-box;
}

.kb-push-canvas {
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
  .kb-push-canvas {
    order: -1;
    padding: 28px 20px 32px 20px;
    gap: 24px;
  }
}

.kb-push-test-banner {
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
.kb-push-test-banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  animation: kb-pulse 1.5s ease-in-out infinite;
}
@keyframes kb-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.kb-push-preview-chrome {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 8px;
}
.kb-push-preview-title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin: 0;
  align-self: flex-start;
}
.kb-push-device-toggle {
  display: inline-flex;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.kb-push-device-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s;
}
.kb-push-device-btn:hover {
  color: #334155;
  background: #f8fafc;
}
.kb-push-device-btn--active {
  color: #0f172a;
  background: #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.kb-push-preview-frame {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.08),
    0 2px 4px -2px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  min-height: 200px;
}
.kb-push-preview-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 24px;
  text-align: center;
  background: #f8fafc;
  color: #64748b;
}
.kb-push-preview-empty-text {
  margin: 0;
  font-size: 0.875rem;
}
.kb-hint-card {
  padding: 12px 16px;
  margin-bottom: 16px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  font-size: 0.8125rem;
  color: #1e40af;
}

.kb-actions-note {
  font-size: 0.75rem;
  color: #64748b;
  max-width: 50%;
}

.kb-push-actions {
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
.kb-push-actions-right {
  display: flex;
  gap: 16px;
  margin-left: auto;
}
.kb-push-action {
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
.kb-push-action:active {
  transform: scale(0.98);
}
.kb-push-action--secondary {
  background: #f1f5f9;
  color: #475569;
}
.kb-push-action--secondary:hover {
  background: #e2e8f0;
  color: #334155;
}
.kb-push-action--primary {
  background: #0f172a;
  color: #fff;
}
.kb-push-action--primary:hover {
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
