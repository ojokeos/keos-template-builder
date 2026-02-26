import { Campaign, BuilderExtensionHooks, PreviewResult, Platform } from '@keos/notification-builder-core';

export interface UseCampaignStateOptions {
    initial?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    onDirty?: () => void;
}
export declare function useCampaignState(options?: UseCampaignStateOptions): {
    campaign: Campaign;
    setCampaign: import('react').Dispatch<import('react').SetStateAction<Campaign>>;
    dirty: boolean;
    validation: import('@keos/notification-builder-core').ValidationResult;
    getValidationWithWarnings: (estimatedReach?: number) => {
        blockingErrors: import('@keos/notification-builder-core').ValidationIssue[];
        warnings: import('@keos/notification-builder-core').ValidationIssue[];
        valid: boolean;
        errors: import('@keos/notification-builder-core').ValidationIssue[];
    };
    update: (partial: Partial<Campaign>) => void;
    updateAudience: (partial: Partial<Campaign["audience"]>) => void;
    updateMessage: (partial: Partial<Campaign["message"]>) => void;
    updateDelivery: (partial: Partial<Campaign["delivery"]>) => void;
    updateTracking: (partial: Partial<Campaign["tracking"]>) => void;
    getPreview: (platform: Platform, opts?: {
        expanded?: boolean;
    }) => PreviewResult;
    previewInput: {
        title: string;
        body: string;
        imageUrl: string | undefined;
    };
    characterLimits: {
        readonly android: {
            readonly title: 60;
            readonly body: 240;
        };
        readonly ios: {
            readonly title: 50;
            readonly body: 120;
        };
        readonly web: {
            readonly title: 60;
            readonly body: 240;
        };
    };
    runCustomValidators: () => Promise<string[]>;
    hooks: BuilderExtensionHooks;
};
//# sourceMappingURL=useCampaignState.d.ts.map