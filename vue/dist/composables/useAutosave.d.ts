import { Ref } from 'vue';
import { Campaign } from '@keos/notification-builder-core';

export interface UseAutosaveOptions {
    channel: string;
    /** Override key; otherwise derived from campaign.id / campaign.name */
    key?: string;
    /** If true, do not write to storage (e.g. when campaign is saved to server) */
    enabled?: Ref<boolean> | boolean;
}
export declare function useAutosave(campaign: Ref<Campaign>, options: UseAutosaveOptions): {
    lastSavedAt: Ref<Date | null, Date | null>;
    clearDraft: () => void;
    getDraft: () => Campaign | null;
    persist: () => void;
};
//# sourceMappingURL=useAutosave.d.ts.map