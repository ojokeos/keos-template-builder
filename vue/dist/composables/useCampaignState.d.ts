import { Campaign, BuilderExtensionHooks, PreviewResult, Platform } from '@keos/notification-builder-core';

export interface UseCampaignStateOptions {
    initial?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    onDirty?: () => void;
}
export declare function useCampaignState(options?: UseCampaignStateOptions): {
    campaign: import('vue').Ref<{
        id?: string | undefined;
        name: string;
        status: import('@keos/notification-builder-core').CampaignStatus;
        created_by?: string | undefined;
        created_at?: string | undefined;
        scheduled_at?: string | undefined;
        sent_at?: string | undefined;
        schema_version: string;
        audience: {
            type: import('@keos/notification-builder-core').AudienceType;
            topic_name?: string | undefined;
            segment_query_json?: string | undefined;
            user_list?: string[] | undefined;
            platforms: Platform[];
            estimated_reach?: number | undefined;
            test_mode?: boolean | undefined;
            test_tokens?: string[] | undefined;
        };
        message: {
            title: string;
            body: string;
            image_url?: string | undefined;
            deep_link?: string | undefined;
            variables_used?: string[] | undefined;
            title_by_locale?: Record<string, string> | undefined;
            body_by_locale?: Record<string, string> | undefined;
        };
        delivery: {
            priority: import('@keos/notification-builder-core').Priority;
            ttl_seconds: number;
            collapse_key?: string | undefined;
            send_local_time?: boolean | undefined;
            quiet_hours_respected?: boolean | undefined;
            silent_push?: boolean | undefined;
            scheduled_at?: string | undefined;
            timezone?: string | undefined;
        };
        tracking?: {
            campaign_name: string;
            tags?: string[] | undefined;
            ab_test?: boolean | undefined;
            conversion_event?: string | undefined;
        } | undefined;
    }, Campaign | {
        id?: string | undefined;
        name: string;
        status: import('@keos/notification-builder-core').CampaignStatus;
        created_by?: string | undefined;
        created_at?: string | undefined;
        scheduled_at?: string | undefined;
        sent_at?: string | undefined;
        schema_version: string;
        audience: {
            type: import('@keos/notification-builder-core').AudienceType;
            topic_name?: string | undefined;
            segment_query_json?: string | undefined;
            user_list?: string[] | undefined;
            platforms: Platform[];
            estimated_reach?: number | undefined;
            test_mode?: boolean | undefined;
            test_tokens?: string[] | undefined;
        };
        message: {
            title: string;
            body: string;
            image_url?: string | undefined;
            deep_link?: string | undefined;
            variables_used?: string[] | undefined;
            title_by_locale?: Record<string, string> | undefined;
            body_by_locale?: Record<string, string> | undefined;
        };
        delivery: {
            priority: import('@keos/notification-builder-core').Priority;
            ttl_seconds: number;
            collapse_key?: string | undefined;
            send_local_time?: boolean | undefined;
            quiet_hours_respected?: boolean | undefined;
            silent_push?: boolean | undefined;
            scheduled_at?: string | undefined;
            timezone?: string | undefined;
        };
        tracking?: {
            campaign_name: string;
            tags?: string[] | undefined;
            ab_test?: boolean | undefined;
            conversion_event?: string | undefined;
        } | undefined;
    }>;
    dirty: import('vue').Ref<boolean, boolean>;
    validation: import('vue').ComputedRef<import('@keos/notification-builder-core').ValidationResult>;
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: import('vue').Ref<string[], string[]>;
    getValidationWithWarnings: (estimatedReach?: number) => {
        errors: import('@keos/notification-builder-core').ValidationIssue[];
        valid: boolean;
        blockingErrors: import('@keos/notification-builder-core').ValidationIssue[];
        warnings: import('@keos/notification-builder-core').ValidationIssue[];
    };
    update: (partial: Partial<Campaign>) => void;
    updateAudience: (partial: Partial<Campaign["audience"]>) => void;
    updateMessage: (partial: Partial<Campaign["message"]>) => void;
    updateDelivery: (partial: Partial<Campaign["delivery"]>) => void;
    updateTracking: (partial: Partial<Campaign["tracking"]>) => void;
    undo: () => void;
    redo: () => void;
    canUndo: import('vue').ComputedRef<boolean>;
    canRedo: import('vue').ComputedRef<boolean>;
    resetMessage: (overrides?: Partial<Campaign["message"]>) => void;
    resetDelivery: (overrides?: Partial<Campaign["delivery"]>) => void;
    resetTracking: (overrides?: Partial<Campaign["tracking"]>) => void;
    resetAudience: (overrides?: Partial<Campaign["audience"]>) => void;
    getPreview: (platform: Platform, options?: {
        expanded?: boolean;
    }) => PreviewResult;
    previewInput: import('vue').ComputedRef<{
        title: string;
        body: string;
        imageUrl: string | undefined;
    }>;
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