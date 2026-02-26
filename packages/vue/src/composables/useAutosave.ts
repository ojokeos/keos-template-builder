import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { Campaign } from '@keos/notification-builder-core';
import { ensureSchemaVersion } from '@keos/notification-builder-core';

const STORAGE_PREFIX = 'keos-draft';
const DEBOUNCE_MS = 2000;

export interface UseAutosaveOptions {
  channel: string;
  /** Override key; otherwise derived from campaign.id / campaign.name */
  key?: string;
  /** If true, do not write to storage (e.g. when campaign is saved to server) */
  enabled?: Ref<boolean> | boolean;
}

function getStorageKey(channel: string, campaignKey: string): string {
  return `${STORAGE_PREFIX}-${channel}-${campaignKey}`;
}

export function useAutosave(
  campaign: Ref<Campaign>,
  options: UseAutosaveOptions
) {
  const channel = options.channel;
  const storageKey = computed(() =>
    getStorageKey(
      channel,
      options.key ?? campaign.value?.id ?? campaign.value?.name ?? 'draft'
    )
  );

  const lastSavedAt = ref<Date | null>(null);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  function persist() {
    try {
      const payload = JSON.stringify(campaign.value);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(storageKey.value, payload);
        lastSavedAt.value = new Date();
      }
    } catch (_) {
      // ignore quota / serialization errors
    }
  }

  function clearDraft() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(storageKey.value);
      }
    } catch (_) {
      // ignore
    }
  }

  function getDraft(): Campaign | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const raw = window.localStorage.getItem(storageKey.value);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<Campaign>;
      return ensureSchemaVersion(parsed);
    } catch (_) {
      return null;
    }
  }

  function isEnabled(): boolean {
    if (options.enabled === undefined) return true;
    if (typeof options.enabled === 'boolean') return options.enabled;
    return options.enabled.value;
  }

  watch(
    campaign,
    () => {
      if (!isEnabled()) return;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        persist();
      }, DEBOUNCE_MS);
    },
    { deep: true }
  );

  return {
    lastSavedAt,
    clearDraft,
    getDraft,
    persist,
  };
}
