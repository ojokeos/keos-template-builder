<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import { spacing, colors, radius } from '@keos/notification-builder-ui-tokens';
import { useCampaignState } from './composables/useCampaignState';
import { useAutosave } from './composables/useAutosave';
import BuilderHeader from './BuilderHeader.vue';
import SectionTemplateType from './sections/SectionTemplateType.vue';
import SectionSms from './sections/SectionSms.vue';
import { SMS_PRESETS } from './config/presets';
import { DEFAULT_SAMPLE_PROFILES, renderTemplatePreview } from './utils/renderTemplatePreview';

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
    /**
     * When true (default), builder is design-only: template content + preview.
     * Audience and send options are configured on another page.
     */
    designOnly?: boolean;
  }>(),
  {
    disabledSections: () => [],
    variableOptions: () => [],
    costPerSegment: 0,
    showSave: true,
    showClose: true,
    showDuplicate: true,
    designOnly: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [campaign: Campaign];
  change: [campaign: Campaign];
  save: [campaign: Campaign];
  edit: [];
  'send-test': [campaign: Campaign];
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
      if (!c.name?.trim()) errors.push('Template name is required');
      const fromHost = props.hooks?.customValidators ? await props.hooks.customValidators(c) : [];
      return [...errors, ...fromHost];
    },
  },
  onDirty: () => emit('change', campaign.value),
});

const { lastSavedAt } = useAutosave(campaign, { channel: 'sms' });

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});

watch(
  campaign,
  (c) => emit('update:modelValue', c),
  { deep: true }
);

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

const templateType = computed(() => (campaign.value as any).template_type ?? 'transactional');
const selectedPreviewProfileId = ref<string>('');
const presetConfirmOpen = ref(false);
const pendingPreset = ref<typeof SMS_PRESETS[0] | null>(null);

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

function applyPreset(preset: typeof SMS_PRESETS[0]) {
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
  (e.target as HTMLSelectElement).value = '';
}

function updateTemplateType(value: 'transactional' | 'marketing') {
  update({ template_type: value } as Partial<Campaign>);
}

function updateName(name: string) {
  update({
    name,
    tracking: { ...(campaign.value.tracking ?? {}), campaign_name: name },
  });
}

const smsBodyRaw = computed(() => (((campaign.value.message as any).sms_body ?? '') as string) || '');
const smsCharCount = computed(() => smsBodyRaw.value.length);
const smsSegmentCount = computed(() => {
  if (!smsCharCount.value) return 0;
  return smsCharCount.value <= 160 ? 1 : Math.ceil(smsCharCount.value / 153);
});
const smsBodyDisplay = computed(() => {
  const substituted = smsBodyDisplayPreview.value;
  return substituted.trim().length
    ? substituted
    : 'Your SMS message preview will appear here.';
});

const smsEstimatedCost = computed(() => {
  const cost = props.costPerSegment ?? 0;
  if (!cost || smsSegmentCount.value === 0) return null;
  return (smsSegmentCount.value * cost).toFixed(2);
});

const smsTruncationHint = computed(() => {
  const n = smsCharCount.value;
  if (n <= 160) return null;
  if (n <= 306) return 'Consider shortening to stay within 2 segments.';
  return 'Shorten this message to reduce segment count and cost.';
});
const smsSenderId = computed(
  () => ((campaign.value.message as any).sms_sender_id as string | undefined) ?? 'YourBrand'
);

function onSave() {
  if (!isValid.value) return;
  emit('save', campaign.value);
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
        <ul :style="{ margin: 0, paddingLeft: '1.25rem', color: colors.danger }">
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
        <strong :style="{ display: 'block', marginBottom: `${spacing[4]}px` }">Warnings</strong>
        <ul :style="{ margin: 0, paddingLeft: '1.25rem' }">
          <li v-for="w in warningsList" :key="w.message">
            {{ w.message }}
          </li>
        </ul>
      </div>
    </div>

    <div class="kb-sms-layout">
      <aside class="kb-sms-sidebar">
        <div
          v-if="!disabledSections.includes('sms')"
          class="kb-sms-form"
        >
          <div class="kb-sms-form-head">
            <span class="kb-sms-form-head-label">Template</span>
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
                <option v-for="p in SMS_PRESETS" :key="p.id" :value="p.id">{{ p.label }}</option>
              </select>
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
        <div v-if="!designOnly && campaign.audience.test_mode" class="kb-sms-test-banner">
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
                <option v-for="pr in DEFAULT_SAMPLE_PROFILES" :key="pr.id" :value="pr.id">{{ pr.label }}</option>
              </select>
            </label>
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
                    <span class="kb-sms-bubble-meta">
                      09:21
                    </span>
                  </div>
                </div>
              </div>
              <p class="kb-sms-counter">
                {{ smsCharCount }} characters ·
                <span v-if="smsSegmentCount === 0">0 segments</span>
                <span v-else-if="smsSegmentCount === 1">1 segment</span>
                <span v-else>{{ smsSegmentCount }} segments</span>
                (160 chars for 1 segment, 153 for multi-part)
                <span v-if="smsEstimatedCost !== null" class="kb-sms-cost"> · Est. {{ smsEstimatedCost }} </span>
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
    </footer>

    <div v-if="presetConfirmOpen" class="kb-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="sms-preset-confirm-title">
      <div class="kb-confirm-dialog">
        <h2 id="sms-preset-confirm-title" class="kb-confirm-title">Replace content?</h2>
        <p class="kb-confirm-text">Current changes will be replaced by the preset. Continue?</p>
        <div class="kb-confirm-actions">
          <button type="button" class="kb-sms-action kb-sms-action--secondary" @click="presetConfirmOpen = false; pendingPreset = null">Cancel</button>
          <button type="button" class="kb-sms-action kb-sms-action--primary" @click="pendingPreset && applyPreset(pendingPreset)">Replace</button>
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
.keos-sms-builder {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #0f172a;
  max-width: 100%;
  box-sizing: border-box;
  background: linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
  padding: 0 0 32px 0;
}
.kb-builder-top {
  margin-left: 24px;
  margin-right: 24px;
}

.kb-sms-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 0;
  min-height: calc(100vh - 120px);
  align-items: start;
  margin-top: 24px;
}
@media (max-width: 1023px) {
  .kb-sms-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    margin-top: 20px;
  }
}

.kb-sms-sidebar {
  background: #fff;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  padding: 0;
  margin: 12px 0;
  border-radius: 0 20px 20px 0;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-left: none;
  box-shadow:
    8px 0 32px -8px rgba(15, 23, 42, 0.1),
    4px 0 16px -4px rgba(15, 23, 42, 0.06);
}
@media (max-width: 1023px) {
  .kb-sms-sidebar {
    order: 1;
    margin: 0 0 12px 0;
    border-radius: 0 0 20px 20px;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-top: none;
    box-shadow: 0 8px 32px -8px rgba(15, 23, 42, 0.1), 0 4px 16px -4px rgba(15, 23, 42, 0.06);
    max-height: none;
  }
}

.kb-sms-form {
  padding: 28px 24px 40px 24px;
}
.kb-sms-form-head {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}
.kb-sms-form-head-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin-bottom: 12px;
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
  padding: 40px 48px 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  min-width: 0;
}
@media (max-width: 1023px) {
  .kb-sms-canvas {
    order: -1;
    padding: 28px 20px 32px 20px;
    gap: 24px;
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.kb-sms-preview-chrome {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 8px;
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
  max-width: 420px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.kb-sms-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 20px 32px 24px;
  margin-top: 24px;
  background: #fff;
  border-top: 1px solid #e2e8f0;
  position: sticky;
  bottom: 0;
  z-index: 10;
  box-shadow: 0 -4px 24px -4px rgba(15, 23, 42, 0.06);
}
.kb-sms-action {
  padding: 12px 24px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.kb-sms-action:active {
  transform: scale(0.98);
}
.kb-sms-action--secondary {
  background: #f1f5f9;
  color: #475569;
}
.kb-sms-action--secondary:hover {
  background: #e2e8f0;
  color: #334155;
}
.kb-sms-action--primary {
  background: #0f172a;
  color: #fff;
}
.kb-sms-action--primary:hover {
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
  margin: 0 0 12px 0;
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

