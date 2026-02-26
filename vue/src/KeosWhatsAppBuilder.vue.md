<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import { computeDeliverySummary } from '@keos/notification-builder-core';
import { spacing, colors, radius, elevation } from '@keos/notification-builder-ui-tokens';
import { useCampaignState } from './composables/useCampaignState';
import SectionCard from './SectionCard.vue';
import BuilderHeader from './BuilderHeader.vue';
import DeliverySummaryCard from './DeliverySummaryCard.vue';
import SectionAudience from './sections/SectionAudience.vue';
import SectionPersonalization from './sections/SectionPersonalization.vue';
import SectionAdvanced from './sections/SectionAdvanced.vue';
import SectionTracking from './sections/SectionTracking.vue';
import SectionWhatsApp from './sections/SectionWhatsApp.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
  }>(),
  { disabledSections: () => [], variableOptions: () => [] }
);

const emit = defineEmits<{
  'update:modelValue': [campaign: Campaign];
  change: [campaign: Campaign];
  save: [campaign: Campaign];
  'send-test': [campaign: Campaign];
  schedule: [campaign: Campaign];
  send: [campaign: Campaign];
}>();

const allSteps = [
  { id: 'audience', label: 'Audience', description: 'Who receives this WhatsApp message?' },
  { id: 'whatsapp', label: 'Template', description: 'Header, body, footer, and buttons' },
  { id: 'personalization', label: 'Personalization', description: 'Optional variables' },
  { id: 'advanced', label: 'Advanced', description: 'Silent / system-level tweaks' },
  { id: 'tracking', label: 'Tracking', description: 'Campaign name and tags' },
] as const;

const {
  campaign,
  dirty,
  getValidationWithWarnings,
  updateAudience,
  updateMessage,
  updateDelivery,
  updateTracking,
  hooks,
} = useCampaignState({
  initial: props.modelValue,
  hooks: props.hooks,
  onDirty: () => emit('change', campaign.value),
});

watch(
  campaign,
  (c) => emit('update:modelValue', c),
  { deep: true }
);

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
  if (hooks.canSchedule) canSchedule.value = await Promise.resolve(hooks.canSchedule());
}

resolveHooks();
watch(() => campaign.value.audience, resolveHooks, { deep: true });

const validationFull = computed(() => getValidationWithWarnings(estimatedReach.value));
const blockingErrors = computed(() => validationFull.value.blockingErrors);
const warningsList = computed(() => validationFull.value.warnings);
const isValid = computed(() => validationFull.value.valid);

const deliverySummary = computed(() => computeDeliverySummary(campaign.value, estimatedReach.value));

const selectedDevice = ref<'android' | 'ios' | 'desktop'>('android');

const visibleSteps = computed(() =>
  allSteps.filter((step) => !props.disabledSections.includes(step.id))
);

const currentStepId = ref<(typeof allSteps)[number]['id']>(
  visibleSteps.value[0]?.id ?? 'audience'
);

watch(
  () => props.disabledSections,
  () => {
    const firstVisible = visibleSteps.value[0];
    if (firstVisible && !visibleSteps.value.some((s) => s.id === currentStepId.value)) {
      currentStepId.value = firstVisible.id;
    }
  },
  { deep: true }
);

const currentStepIndex = computed(() =>
  visibleSteps.value.findIndex((s) => s.id === currentStepId.value)
);

const canGoNext = computed(
  () => currentStepIndex.value > -1 && currentStepIndex.value < visibleSteps.value.length - 1
);
const canGoPrev = computed(() => currentStepIndex.value > 0);

function goToStep(id: (typeof allSteps)[number]['id']) {
  if (visibleSteps.value.some((s) => s.id === id)) {
    currentStepId.value = id;
  }
}

function goNext() {
  if (!canGoNext.value) return;
  const next = visibleSteps.value[currentStepIndex.value + 1];
  if (next) currentStepId.value = next.id;
}

function goPrev() {
  if (!canGoPrev.value) return;
  const prev = visibleSteps.value[currentStepIndex.value - 1];
  if (prev) currentStepId.value = prev.id;
}

const hasBlockingErrors = computed(() => blockingErrors.value.length > 0);
const hasWarnings = computed(() => warningsList.value.length > 0);

const showConfirm = ref(false);
const confirmAction = ref<'send' | 'schedule' | null>(null);

function openConfirm(action: 'send' | 'schedule') {
  if (!isValid.value) return;
  confirmAction.value = action;
  showConfirm.value = true;
}

function closeConfirm() {
  showConfirm.value = false;
  confirmAction.value = null;
}

function confirmAndEmit() {
  if (!confirmAction.value || !isValid.value) {
    closeConfirm();
    return;
  }
  if (confirmAction.value === 'send') {
    emit('send', campaign.value);
  } else if (confirmAction.value === 'schedule') {
    emit('schedule', campaign.value);
  }
  closeConfirm();
}

function updateName(name: string) {
  campaign.value = { ...campaign.value, name };
}
</script>

<template>
  <div class="keos-whatsapp-builder">
    <BuilderHeader
      :campaign-name="campaign.name"
      :status="campaign.status"
      :dirty="dirty"
      @update:campaign-name="updateName"
    />

    <div v-if="blockingErrors.length > 0" class="kb-errors" :style="{ background: colors.dangerBg, border: `1px solid ${colors.dangerBorder}`, borderRadius: `${radius.input}px`, padding: `${spacing[12]}px ${spacing[16]}px`, marginBottom: `${spacing[16]}px` }">
      <ul :style="{ margin: 0, paddingLeft: '1.25rem', color: colors.danger }">
        <li v-for="e in blockingErrors" :key="e.message">{{ e.message }}</li>
      </ul>
    </div>
    <div v-if="warningsList.length > 0" class="kb-warnings" :style="{ background: colors.neutral.bg, border: `1px solid ${colors.neutral.border}`, borderRadius: `${radius.input}px`, padding: `${spacing[12]}px ${spacing[16]}px`, marginBottom: `${spacing[16]}px`, fontSize: '0.875rem', color: colors.neutral.textMuted }">
      <strong :style="{ display: 'block', marginBottom: `${spacing[4]}px` }">Warnings</strong>
      <ul :style="{ margin: 0, paddingLeft: '1.25rem' }">
        <li v-for="w in warningsList" :key="w.message">{{ w.message }}</li>
      </ul>
    </div>

    <div class="kb-two-pane">
      <div class="kb-pane-left">
        <nav class="kb-stepper">
          <button
            v-for="(step, index) in visibleSteps"
            :key="step.id"
            type="button"
            class="kb-stepper__item"
            :class="{
              'kb-stepper__item--active': currentStepId === step.id,
            }"
            @click="goToStep(step.id)"
          >
            <span class="kb-stepper__index">{{ index + 1 }}</span>
            <span class="kb-stepper__content">
              <span class="kb-stepper__label">{{ step.label }}</span>
              <span class="kb-stepper__description">{{ step.description }}</span>
            </span>
            <span class="kb-stepper__status" v-if="hasBlockingErrors">
              Errors
            </span>
            <span
              v-else-if="hasWarnings"
              class="kb-stepper__status kb-stepper__status--warning"
            >
              Warnings
            </span>
            <span
              v-else-if="isValid"
              class="kb-stepper__status kb-stepper__status--ok"
            >
              Ready
            </span>
          </button>
        </nav>

        <div
          v-if="currentStepId === 'audience' && !disabledSections.includes('audience')"
          class="kb-section-wrap"
          :style="{ marginBottom: `${spacing[16]}px` }"
        >
          <SectionCard icon="👥" title="Audience" subtitle="Who receives this WhatsApp message">
            <SectionAudience
              :audience="campaign.audience"
              :estimated-reach="estimatedReach"
              :can-use-test-mode="true"
              @update="updateAudience"
            />
          </SectionCard>
        </div>

        <div
          v-if="currentStepId === 'whatsapp' && !disabledSections.includes('whatsapp')"
          class="kb-section-wrap"
          :style="{ marginBottom: `${spacing[16]}px` }"
        >
          <SectionCard icon="💬" title="WhatsApp template" subtitle="Template name, content, and buttons">
            <SectionWhatsApp
              :message="campaign.message"
              @update="updateMessage"
            />
          </SectionCard>
        </div>

        <div
          v-if="currentStepId === 'personalization' && !disabledSections.includes('personalization')"
          class="kb-section-wrap"
          :style="{ marginBottom: `${spacing[16]}px` }"
        >
          <SectionCard icon="🔤" title="Personalization" subtitle="Optional variables">
            <SectionPersonalization
              :message="campaign.message"
              :variable-options="variableOptions"
              @update="updateMessage"
            />
          </SectionCard>
        </div>

        <div
          v-if="currentStepId === 'advanced' && !disabledSections.includes('advanced')"
          class="kb-section-wrap"
          :style="{ marginBottom: `${spacing[16]}px` }"
        >
          <SectionCard icon="⚙️" title="Advanced" subtitle="Service-level flags">
            <SectionAdvanced :delivery="campaign.delivery" @update="updateDelivery" />
          </SectionCard>
        </div>

        <div
          v-if="currentStepId === 'tracking' && !disabledSections.includes('tracking')"
          class="kb-section-wrap"
          :style="{ marginBottom: `${spacing[16]}px` }"
        >
          <SectionCard v-if="campaign.tracking" icon="📊" title="Tracking & analytics" subtitle="Campaign name and tags">
            <SectionTracking
              :tracking="campaign.tracking"
              @update="updateTracking"
            />
          </SectionCard>
        </div>
      </div>

      <div class="kb-pane-right">
        <details class="kb-preview-details" open>
          <summary class="kb-preview-summary">Live preview</summary>
          <div class="kb-preview-wrap" :style="{ maxHeight: '320px', overflowY: 'auto' }">
            <h3 class="kb-preview-title" :style="{ fontSize: '1rem', fontWeight: 600, margin: `0 0 ${spacing[8]}px 0` }">Live preview</h3>
            <div class="kb-whatsapp-preview">
              <div class="kb-wa-device-tabs">
                <button
                  type="button"
                  class="kb-wa-device-tab"
                  :class="{ 'kb-wa-device-tab--active': selectedDevice === 'android' }"
                  @click="selectedDevice = 'android'"
                >
                  Android
                </button>
                <button
                  type="button"
                  class="kb-wa-device-tab"
                  :class="{ 'kb-wa-device-tab--active': selectedDevice === 'ios' }"
                  @click="selectedDevice = 'ios'"
                >
                  iOS
                </button>
                <button
                  type="button"
                  class="kb-wa-device-tab"
                  :class="{ 'kb-wa-device-tab--active': selectedDevice === 'desktop' }"
                  @click="selectedDevice = 'desktop'"
                >
                  Desktop
                </button>
              </div>
              <div class="kb-wa-phone" :class="`kb-wa-phone--${selectedDevice}`">
                <div class="kb-wa-header-bar">
                  <div class="kb-wa-avatar"></div>
                  <div class="kb-wa-header-text">
                    <div class="kb-wa-contact">Your Business</div>
                    <div class="kb-wa-status-line">online</div>
                  </div>
                  <div class="kb-wa-header-icons">📞 ⋮</div>
                </div>
                <div class="kb-wa-chat">
                  <div class="kb-wa-bubble kb-wa-bubble--incoming">
                    <span class="kb-wa-bubble-text">Hi, how can we help you today?</span>
                    <span class="kb-wa-bubble-meta">09:20</span>
                  </div>
                  <div class="kb-wa-bubble kb-wa-bubble--outgoing kb-wa-bubble--template">
                    <!-- Media/header area -->
                    <div
                      v-if="['image', 'video', 'document'].includes(((campaign.message as any).whatsapp_template_type ?? 'text'))"
                      class="kb-wa-template-media"
                    >
                      <template v-if="(campaign.message as any).whatsapp_template_type === 'image'">
                        <div class="kb-wa-media kb-wa-media--image">
                          <div class="kb-wa-media-main">
                            <div
                              v-if="(campaign.message as any).whatsapp_media_url"
                              class="kb-wa-media-image-wrapper"
                            >
                              <img
                                :src="(campaign.message as any).whatsapp_media_url"
                                alt="Template image"
                              />
                            </div>
                            <div
                              v-else
                              class="kb-wa-media-image-placeholder"
                            >
                              Image
                            </div>
                          </div>
                          <div
                            v-if="(campaign.message as any).whatsapp_media_caption"
                            class="kb-wa-media-label"
                          >
                            {{ (campaign.message as any).whatsapp_media_caption }}
                          </div>
                          <div
                            v-if="(campaign.message as any).whatsapp_media_url"
                            class="kb-wa-media-url"
                          >
                            {{ (campaign.message as any).whatsapp_media_url }}
                          </div>
                        </div>
                      </template>
                      <template v-else-if="(campaign.message as any).whatsapp_template_type === 'video'">
                        <div class="kb-wa-media kb-wa-media--video">
                          <span class="kb-wa-media-play">▶</span>
                          <span class="kb-wa-media-label">
                            {{ (campaign.message as any).whatsapp_media_caption || 'Video message' }}
                          </span>
                          <div
                            v-if="(campaign.message as any).whatsapp_media_url"
                            class="kb-wa-media-url"
                          >
                            {{ (campaign.message as any).whatsapp_media_url }}
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="kb-wa-media kb-wa-media--document">
                          📄
                          <span class="kb-wa-media-label">
                            {{ (campaign.message as any).whatsapp_media_caption || 'Document' }}
                          </span>
                          <div
                            v-if="(campaign.message as any).whatsapp_media_url"
                            class="kb-wa-media-url"
                          >
                            {{ (campaign.message as any).whatsapp_media_url }}
                          </div>
                        </div>
                      </template>
                    </div>

                    <div
                      v-if="(campaign.message as any).whatsapp_header"
                      class="kb-wa-template-header"
                    >
                      {{ (campaign.message as any).whatsapp_header }}
                    </div>
                    <div class="kb-wa-template-body">
                      {{ (campaign.message as any).whatsapp_body || campaign.message.body_template }}
                    </div>
                    <!-- Location preview -->
                    <div
                      v-if="(campaign.message as any).whatsapp_template_type === 'location' && (campaign.message as any).whatsapp_location"
                      class="kb-wa-template-location"
                    >
                      <div class="kb-wa-location-pin">📍</div>
                      <div class="kb-wa-location-text">
                        <div class="kb-wa-location-name">
                          {{ (campaign.message as any).whatsapp_location.name || 'Pinned location' }}
                        </div>
                        <div class="kb-wa-location-address">
                          {{ (campaign.message as any).whatsapp_location.address || ((campaign.message as any).whatsapp_location.lat + ', ' + (campaign.message as any).whatsapp_location.lon) }}
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="(campaign.message as any).whatsapp_footer"
                      class="kb-wa-template-footer"
                    >
                      {{ (campaign.message as any).whatsapp_footer }}
                    </div>
                    <!-- Coupon preview -->
                    <div
                      v-if="(campaign.message as any).whatsapp_template_type === 'coupon' && (campaign.message as any).whatsapp_coupon_code"
                      class="kb-wa-template-coupon"
                    >
                      <span class="kb-wa-coupon-label">COUPON</span>
                      <span class="kb-wa-coupon-code">{{ (campaign.message as any).whatsapp_coupon_code }}</span>
                    </div>
                    <!-- LTO preview -->
                    <div
                      v-if="(campaign.message as any).whatsapp_template_type === 'lto' && (campaign.message as any).whatsapp_lto_expiry"
                      class="kb-wa-template-lto"
                    >
                      Offer valid until
                      {{ (campaign.message as any).whatsapp_lto_expiry }}
                    </div>
                    <!-- Products / catalog preview -->
                    <div
                      v-if="['mpm', 'catalog'].includes((campaign.message as any).whatsapp_template_type) && ((campaign.message as any).whatsapp_products as any[])?.length"
                      class="kb-wa-template-products"
                    >
                      <div
                        v-for="(prod, idx) in ((campaign.message as any).whatsapp_products as any[])"
                        :key="prod.id || idx"
                        class="kb-wa-product-row"
                      >
                        <div class="kb-wa-product-title">
                          {{ prod.sectionTitle || 'Product ' + (idx + 1) }}
                        </div>
                        <div class="kb-wa-product-meta">
                          ID: {{ prod.productId || '—' }}
                        </div>
                      </div>
                    </div>
                    <!-- Auth preview -->
                    <div
                      v-if="(campaign.message as any).whatsapp_template_type === 'auth'"
                      class="kb-wa-template-auth"
                    >
                      <span class="kb-wa-auth-code">123&nbsp;456</span>
                      <span class="kb-wa-auth-label">
                        {{ (campaign.message as any).whatsapp_auth_label || 'Use this code to verify your login.' }}
                      </span>
                    </div>
                    <div
                      v-if="((campaign.message as any).whatsapp_buttons as any[])?.length"
                      class="kb-wa-preview-buttons"
                    >
                      <button
                        v-for="(btn, idx) in ((campaign.message as any).whatsapp_buttons as any[])"
                        :key="btn.id || idx"
                        type="button"
                        class="kb-wa-preview-btn"
                      >
                        {{ btn.label || 'Button' }}
                      </button>
                    </div>
                    <span class="kb-wa-bubble-meta kb-wa-bubble-meta--outgoing">09:21 ✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
        <DeliverySummaryCard :summary="deliverySummary" />
      </div>
    </div>

    <div
      class="kb-actions kb-actions--sticky"
      :style="{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${spacing[8]}px`,
        padding: `${spacing[16]}px 0`,
        borderTop: `1px solid ${colors.neutral.border}`,
        background: '#fff',
        boxShadow: elevation.stickyBar,
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
      }"
    >
      <button
        type="button"
        class="kb-btn kb-btn--ghost"
        :disabled="!canGoPrev"
        @click="goPrev"
      >
        Previous step
      </button>
      <button
        type="button"
        class="kb-btn kb-btn--ghost"
        :disabled="!canGoNext"
        @click="goNext"
      >
        Next step
      </button>
      <button type="button" class="kb-btn kb-btn--secondary" @click="openConfirm('schedule')">
        Schedule
      </button>
      <button
        type="button"
        class="kb-btn kb-btn--primary"
        :disabled="!isValid"
        @click="openConfirm('send')"
      >
        Send
      </button>
    </div>

    <div v-if="showConfirm" class="kb-confirm-overlay">
      <div class="kb-confirm-dialog">
        <h3 class="kb-confirm-title">
          {{ confirmAction === 'send' ? 'Confirm WhatsApp send' : 'Confirm WhatsApp schedule' }}
        </h3>
        <p class="kb-confirm-text">
          You are about to
          {{ confirmAction === 'send' ? 'send this WhatsApp campaign' : 'schedule this WhatsApp campaign' }}.
          Please review the key details below.
        </p>
        <ul class="kb-confirm-summary">
          <li>
            <strong>Audience:</strong>
            {{ deliverySummary.audienceType }}
          </li>
          <li v-if="deliverySummary.estimatedReach !== undefined">
            <strong>Estimated reach:</strong>
            {{ deliverySummary.estimatedReach.toLocaleString() }}
          </li>
          <li>
            <strong>Send time:</strong>
            {{ deliverySummary.sendTime }}
          </li>
        </ul>
        <div v-if="blockingErrors.length > 0" class="kb-confirm-errors">
          <strong>Blocking issues:</strong>
          <ul>
            <li v-for="e in blockingErrors" :key="e.message">{{ e.message }}</li>
          </ul>
        </div>
        <div v-else-if="warningsList.length > 0" class="kb-confirm-warnings">
          <strong>Warnings:</strong>
          <ul>
            <li v-for="w in warningsList" :key="w.message">{{ w.message }}</li>
          </ul>
        </div>
        <div class="kb-confirm-actions">
          <button type="button" class="kb-btn kb-btn--secondary" @click="closeConfirm">
            Cancel
          </button>
          <button
            type="button"
            class="kb-btn kb-btn--primary"
            :disabled="!isValid"
            @click="confirmAndEmit"
          >
            {{ confirmAction === 'send' ? 'Confirm & send' : 'Confirm & schedule' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keos-whatsapp-builder {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #0f172a;
  max-width: 100%;
  box-sizing: border-box;
}
.kb-two-pane {
  display: grid;
  grid-template-columns: 1fr minmax(320px, 400px);
  gap: 24px;
  align-items: start;
  margin-bottom: 24px;
}
.kb-pane-left {
  min-width: 0;
  max-width: 800px;
  overflow-y: auto;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}
.kb-section-wrap {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
.keos-whatsapp-builder .kb-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.kb-pane-right {
  position: sticky;
  top: 0;
  overflow-y: auto;
  max-height: calc(100vh - 180px);
}
.kb-actions .kb-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
}
.kb-actions .kb-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.kb-actions .kb-btn--primary {
  background: #0f172a;
  color: #fff;
  border-color: #0f172a;
}
.kb-actions .kb-btn--secondary {
  background: #fff;
  color: #334155;
  border-color: #e2e8f0;
}
.kb-actions .kb-btn--secondary:hover:not(:disabled) {
  background: #f1f5f9;
}
.kb-actions .kb-btn--primary:hover:not(:disabled) {
  background: #1e293b;
}
.kb-actions .kb-btn--ghost {
  background: transparent;
  color: #64748b;
  border-color: transparent;
}
.kb-actions .kb-btn--ghost:hover:not(:disabled) {
  background: #f1f5f9;
}
@media (max-width: 899px) {
  .kb-two-pane {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .kb-pane-right {
    order: -1;
    position: static;
    max-height: none;
  }
  .kb-pane-left {
    max-width: none;
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
.kb-whatsapp-preview {
  border-radius: 16px;
  background: #020617;
  padding: 12px;
  color: #e5e7eb;
}
.kb-wa-device-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}
.kb-wa-device-tab {
  padding: 2px 8px;
  font-size: 0.75rem;
  border-radius: 999px;
  border: 1px solid #1f2937;
  background: transparent;
  color: #e5e7eb;
  cursor: pointer;
}
.kb-wa-device-tab--active {
  background: #22c55e;
  color: #022c22;
  border-color: #22c55e;
}
.kb-wa-phone {
  max-width: 360px;
  margin: 0 auto;
  border-radius: 24px;
  background: #111b21;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  border: 1px solid #0b141a;
}
.kb-wa-phone--android,
.kb-wa-phone--ios,
.kb-wa-phone--desktop {
  background: #111b21;
}
.kb-wa-phone--desktop {
  max-width: 420px;
}
.kb-wa-header-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #202c33;
  color: #e9edef;
}
.kb-wa-avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #00a884;
}
.kb-wa-header-text {
  flex: 1;
}
.kb-wa-contact {
  font-size: 0.9rem;
  font-weight: 500;
}
.kb-wa-status-line {
  font-size: 0.75rem;
  color: #8696a0;
}
.kb-wa-header-icons {
  margin-left: auto;
  font-size: 0.9rem;
  color: #8696a0;
}
.kb-wa-chat {
  background: #0b141a;
  padding: 10px 8px 12px;
  min-height: 220px;
}
.kb-wa-bubble {
  max-width: 75%;
  margin-bottom: 6px;
  padding: 6px 8px;
  border-radius: 7.5px;
  font-size: 0.8rem;
  position: relative;
}
.kb-wa-bubble--incoming {
  background: #202c33;
  color: #e9edef;
  border-bottom-left-radius: 0;
}
.kb-wa-bubble--outgoing {
  margin-left: auto;
  background: #005c4b;
  color: #e9edef;
  border-bottom-right-radius: 0;
}
.kb-wa-bubble-text {
  white-space: pre-wrap;
}
.kb-wa-bubble-meta {
  display: block;
  margin-top: 2px;
  font-size: 0.7rem;
  color: #8696a0;
  text-align: right;
}
.kb-wa-bubble-meta--outgoing {
  color: #8696a0;
}
.kb-wa-bubble--template {
  padding-bottom: 8px;
}
.kb-wa-template-header {
  font-weight: 600;
  margin-bottom: 3px;
}
.kb-wa-template-body {
  white-space: pre-wrap;
}
.kb-wa-template-footer {
  margin-top: 3px;
  font-size: 0.75rem;
  color: #8696a0;
}
.kb-wa-template-media {
  margin-bottom: 6px;
}
.kb-wa-media {
  border-radius: 8px;
  background: #0b141a;
  padding: 6px 8px;
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #e9edef;
}
.kb-wa-media-main {
  display: flex;
  align-items: center;
  gap: 6px;
}
.kb-wa-media--image {
  justify-content: center;
}
.kb-wa-media--video {
  justify-content: flex-start;
}
.kb-wa-media-play {
  font-size: 0.9rem;
}
.kb-wa-media-label {
  font-size: 0.78rem;
}
.kb-wa-media--document {
  justify-content: flex-start;
}
.kb-wa-media-image-wrapper {
  width: 100%;
  max-height: 140px;
  border-radius: 6px;
  overflow: hidden;
  background: #020617;
}
.kb-wa-media-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.kb-wa-media-image-placeholder {
  width: 100%;
  border-radius: 6px;
  padding: 24px 0;
  text-align: center;
  background: #020617;
  color: #64748b;
}
.kb-wa-media-url {
  font-size: 0.7rem;
  color: #8696a0;
  word-break: break-all;
}
.kb-wa-template-location {
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid rgba(233, 237, 239, 0.1);
  padding: 6px 8px;
  display: flex;
  gap: 6px;
  background: #0b141a;
}
.kb-wa-location-pin {
  font-size: 0.9rem;
}
.kb-wa-location-name {
  font-size: 0.78rem;
  font-weight: 600;
}
.kb-wa-location-address {
  font-size: 0.75rem;
  color: #8696a0;
}
.kb-wa-template-coupon {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 6px;
  border-radius: 999px;
  background: #0b141a;
}
.kb-wa-coupon-label {
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8696a0;
}
.kb-wa-coupon-code {
  font-size: 0.8rem;
  font-weight: 600;
}
.kb-wa-template-lto {
  margin-top: 4px;
  font-size: 0.75rem;
  color: #8696a0;
}
.kb-wa-template-products {
  margin-top: 6px;
  border-radius: 8px;
  background: #0b141a;
  padding: 4px 6px;
}
.kb-wa-product-row {
  padding: 3px 2px;
  border-bottom: 1px solid rgba(233, 237, 239, 0.06);
}
.kb-wa-product-row:last-child {
  border-bottom: 0;
}
.kb-wa-product-title {
  font-size: 0.78rem;
  font-weight: 600;
}
.kb-wa-product-meta {
  font-size: 0.72rem;
  color: #8696a0;
}
.kb-wa-template-auth {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.kb-wa-auth-code {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.kb-wa-auth-label {
  font-size: 0.75rem;
  color: #8696a0;
}
.kb-wa-preview-buttons {
  margin-top: 6px;
  border-top: 1px solid rgba(233, 237, 239, 0.08);
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.kb-wa-preview-btn {
  width: 100%;
  text-align: center;
  padding: 3px 4px;
  border-radius: 4px;
  border: 1px solid rgba(233, 237, 239, 0.2);
  background: transparent;
  font-size: 0.75rem;
  color: #00a884;
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

