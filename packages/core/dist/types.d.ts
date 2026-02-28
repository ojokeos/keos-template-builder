import type { AudienceType, Platform, Priority } from './constants.js';
export interface Campaign {
    id?: string;
    /** Primary campaign identifier: display name in header, listing, API. Header binds here. */
    name: string;
    status: CampaignStatus;
    created_by?: string;
    created_at?: string;
    scheduled_at?: string;
    sent_at?: string;
    schema_version: string;
    audience: CampaignAudience;
    message: CampaignMessage;
    delivery: CampaignDelivery;
    tracking?: CampaignTracking;
}
export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
export interface CampaignAudience {
    type: AudienceType;
    topic_name?: string;
    segment_query_json?: string;
    user_list?: string[];
    platforms: Platform[];
    estimated_reach?: number;
    /** Test mode: send only to test tokens / test group (host-provided) */
    test_mode?: boolean;
    test_tokens?: string[];
}
export interface CampaignMessage {
    title: string;
    body: string;
    image_url?: string;
    deep_link?: string;
    variables_used?: string[];
    /** Phase 2: localized title/body by locale code */
    title_by_locale?: Record<string, string>;
    body_by_locale?: Record<string, string>;
}
export interface NotificationAction {
    /** Stable identifier used in clients / handlers */
    id: string;
    /** Button label shown to the user */
    label: string;
    /** Optional deep link or URL to open when this action is tapped */
    url?: string;
    /** Optional flag for destructive actions (where supported by platform) */
    destructive?: boolean;
}
export interface CampaignDelivery {
    priority: Priority;
    ttl_seconds: number;
    collapse_key?: string;
    send_local_time?: boolean;
    quiet_hours_respected?: boolean;
    silent_push?: boolean;
    /** Schedule: fixed send time (ISO string) */
    scheduled_at?: string;
    timezone?: string;
}
export interface CampaignTracking {
    /** Optional override for reporting/analytics only. If unset, reporting can fall back to Campaign.name. */
    campaign_name: string;
    tags?: string[];
    ab_test?: boolean;
    conversion_event?: string;
}
export interface CampaignMetrics {
    campaign_id: string;
    delivered_count?: number;
    opened_count?: number;
    clicked_count?: number;
    converted_count?: number;
    failed_count?: number;
}
/** Builder embedding: extension hooks provided by host */
export interface BuilderExtensionHooks {
    customValidators?: (campaign: Campaign) => Promise<string[]>;
    canSend?: () => boolean | Promise<boolean>;
    canSchedule?: () => boolean | Promise<boolean>;
    canEditTemplate?: () => boolean | Promise<boolean>;
    estimateReach?: (audience: CampaignAudience) => Promise<number | undefined>;
    getRateLimitHint?: (audience: CampaignAudience) => string | undefined;
}
//# sourceMappingURL=types.d.ts.map