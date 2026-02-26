import { useState, useCallback, useMemo } from 'react';
import type { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import {
  createEmptyCampaign,
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

export interface UseCampaignStateOptions {
  initial?: Partial<Campaign>;
  hooks?: BuilderExtensionHooks;
  onDirty?: () => void;
}

export function useCampaignState(options: UseCampaignStateOptions = {}) {
  const [raw, setRaw] = useState<Campaign>(() =>
    ensureSchemaVersion(options.initial ?? createEmptyCampaign())
  );
  const hooks = options.hooks ?? {};
  const [dirty, setDirty] = useState(false);

  const update = useCallback(
    (partial: Partial<Campaign>) => {
      setRaw((prev) => ({ ...prev, ...partial }));
      setDirty(true);
      options.onDirty?.();
    },
    [options]
  );

  const updateAudience = useCallback(
    (partial: Partial<Campaign['audience']>) => {
      setRaw((prev) => ({ ...prev, audience: { ...prev.audience, ...partial } }));
      setDirty(true);
      options.onDirty?.();
    },
    [options]
  );

  const updateMessage = useCallback(
    (partial: Partial<Campaign['message']>) => {
      setRaw((prev) => ({ ...prev, message: { ...prev.message, ...partial } }));
      setDirty(true);
      options.onDirty?.();
    },
    [options]
  );

  const updateDelivery = useCallback(
    (partial: Partial<Campaign['delivery']>) => {
      setRaw((prev) => ({ ...prev, delivery: { ...prev.delivery, ...partial } }));
      setDirty(true);
      options.onDirty?.();
    },
    [options]
  );

  const updateTracking = useCallback(
    (partial: Partial<Campaign['tracking']>) => {
      setRaw((prev) => ({
        ...prev,
        tracking: prev.tracking
          ? { ...prev.tracking, ...partial }
          : { campaign_name: '', tags: [], ab_test: false, ...partial },
      }));
      setDirty(true);
      options.onDirty?.();
    },
    [options]
  );

  const validation = useMemo(() => validateCampaign(raw), [raw]);

  const getValidationWithWarnings = useCallback(
    (estimatedReach?: number) => {
      const result = validateCampaignWithWarnings(raw, estimatedReach);
      return {
        ...result,
        blockingErrors: getBlockingErrors(result),
        warnings: getWarnings(result),
        valid: result.valid,
      };
    },
    [raw]
  );

  const previewInput = useMemo(
    () => ({
      title: raw.message.title_template,
      body: raw.message.body_template,
      imageUrl: raw.message.image_url,
    }),
    [raw.message]
  );

  const getPreview = useCallback(
    (platform: Platform, opts?: { expanded?: boolean }): PreviewResult => {
      const input = {
        title: raw.message.title_template,
        body: raw.message.body_template,
        imageUrl: raw.message.image_url,
      };
      switch (platform) {
        case 'android':
          return simulateAndroid(input, { expanded: opts?.expanded });
        case 'ios':
          return simulateIOS(input);
        case 'web':
          return simulateWeb(input);
        default:
          return simulateWeb(input);
      }
    },
    [raw.message]
  );

  const characterLimits = PLATFORM_LIMITS;

  const runCustomValidators = useCallback(async (): Promise<string[]> => {
    if (!hooks.customValidators) return [];
    return hooks.customValidators(raw);
  }, [hooks, raw]);

  return {
    campaign: raw,
    setCampaign: setRaw,
    dirty,
    validation,
    getValidationWithWarnings,
    update,
    updateAudience,
    updateMessage,
    updateDelivery,
    updateTracking,
    getPreview,
    previewInput,
    characterLimits,
    runCustomValidators,
    hooks,
  };
}
