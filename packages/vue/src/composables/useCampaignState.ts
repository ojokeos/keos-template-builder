import { ref, computed, watch } from 'vue';
import type { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import {
  createEmptyCampaign,
  createEmptyMessage,
  createEmptyDelivery,
  createEmptyTracking,
  createEmptyAudience,
  ensureSchemaVersion,
  validateCampaign,
  validateCampaignWithWarnings,
  getBlockingErrors,
  getWarnings,
  simulateAndroid,
  simulateIOS,
  simulateWeb,
  type PreviewResult,
  PLATFORM_LIMITS,
  type Platform,
} from '@keos/notification-builder-core';

const HISTORY_MAX = 20;

function cloneCampaign(c: Campaign): Campaign {
  return JSON.parse(JSON.stringify(c)) as Campaign;
}

export interface UseCampaignStateOptions {
  initial?: Partial<Campaign>;
  hooks?: BuilderExtensionHooks;
  onDirty?: () => void;
}

export function useCampaignState(options: UseCampaignStateOptions = {}) {
  const raw = ref<Campaign>(
    ensureSchemaVersion(options.initial ?? createEmptyCampaign())
  );
  const hooks = options.hooks ?? {};
  const dirty = ref(false);

  const past = ref<Campaign[]>([]);
  const future = ref<Campaign[]>([]);

  function pushHistory() {
    const snapshot = cloneCampaign(raw.value);
    past.value = [...past.value.slice(-(HISTORY_MAX - 1)), snapshot];
    future.value = [];
  }

  const canUndo = computed(() => past.value.length > 0);
  const canRedo = computed(() => future.value.length > 0);

  function undo() {
    if (past.value.length === 0) return;
    future.value = [cloneCampaign(raw.value), ...future.value];
    raw.value = past.value[past.value.length - 1];
    past.value = past.value.slice(0, -1);
  }

  function redo() {
    if (future.value.length === 0) return;
    past.value = [...past.value, cloneCampaign(raw.value)];
    raw.value = future.value[0];
    future.value = future.value.slice(1);
  }

  watch(
    raw,
    () => {
      dirty.value = true;
      options.onDirty?.();
    },
    { deep: true }
  );

  const validation = computed(() => validateCampaign(raw.value));

  /** Use when estimatedReach is available for full validation + warnings. */
  function getValidationWithWarnings(estimatedReach?: number) {
    const result = validateCampaignWithWarnings(raw.value, estimatedReach);
    return {
      ...result,
      blockingErrors: getBlockingErrors(result),
      warnings: getWarnings(result),
      valid: result.valid,
    };
  }

  function update(partial: Partial<Campaign>) {
    pushHistory();
    raw.value = { ...raw.value, ...partial };
  }

  function updateAudience(partial: Partial<Campaign['audience']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      audience: { ...raw.value.audience, ...partial },
    };
  }

  function updateMessage(partial: Partial<Campaign['message']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      message: { ...raw.value.message, ...partial },
    };
  }

  function updateDelivery(partial: Partial<Campaign['delivery']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      delivery: { ...raw.value.delivery, ...partial },
    };
  }

  function updateTracking(partial: Partial<Campaign['tracking']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      tracking: raw.value.tracking
        ? { ...raw.value.tracking, ...partial }
        : { campaign_name: '', tags: [], ab_test: false, ...partial },
    };
  }

  function resetMessage(overrides?: Partial<Campaign['message']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      message: { ...createEmptyMessage(), ...overrides },
    };
  }

  function resetDelivery(overrides?: Partial<Campaign['delivery']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      delivery: { ...createEmptyDelivery(), ...overrides },
    };
  }

  function resetTracking(overrides?: Partial<Campaign['tracking']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      tracking: { ...createEmptyTracking(), ...overrides },
    };
  }

  function resetAudience(overrides?: Partial<Campaign['audience']>) {
    pushHistory();
    raw.value = {
      ...raw.value,
      audience: { ...createEmptyAudience(), ...overrides },
    };
  }

  const previewInput = computed(() => ({
    title: raw.value.message.title,
    body: raw.value.message.body,
    imageUrl: raw.value.message.image_url,
  }));

  function getPreview(platform: Platform, options?: { expanded?: boolean }): PreviewResult {
    const input = previewInput.value;
    let base: PreviewResult;
    switch (platform) {
      case 'android':
        base = simulateAndroid(input, { expanded: options?.expanded });
        break;
      case 'ios':
        base = simulateIOS(input);
        break;
      case 'web':
        base = simulateWeb(input);
        break;
      default:
        base = simulateWeb(input);
    }
    const actions = (raw.value.message as any).actions ?? [];
    return { ...(base as any), actions } as PreviewResult;
  }

  const characterLimits = PLATFORM_LIMITS;

  async function runCustomValidators(): Promise<string[]> {
    if (!hooks.customValidators) return [];
    return hooks.customValidators(raw.value);
  }

  return {
    campaign: raw,
    dirty,
    validation,
    getValidationWithWarnings,
    update,
    updateAudience,
    updateMessage,
    updateDelivery,
    updateTracking,
    undo,
    redo,
    canUndo,
    canRedo,
    resetMessage,
    resetDelivery,
    resetTracking,
    resetAudience,
    getPreview,
    previewInput,
    characterLimits,
    runCustomValidators,
    hooks,
  };
}
