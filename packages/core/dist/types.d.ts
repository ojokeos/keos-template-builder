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
    segment_query?: string;
    user_list?: string[];
    platforms: Platform[];
    estimated_reach?: number;
    /** Test mode: send only to test tokens / test group (host-provided) */
    test_mode?: boolean;
    test_tokens?: string[];
}
/**
 * Message payload: standalone key names only (no channel prefix, no _template suffix).
 * Push: title, body, image_url, deep_link, location.
 * Email: subject, preview_text, from_name, from_address, reply_to, blocks, html.
 * WhatsApp: header, body, footer, template_type, template_name, media_url, etc.
 */
export interface CampaignMessage {
    title: string;
    body: string;
    image_url?: string;
    deep_link?: string;
    variables?: string[];
    title_by_locale?: Record<string, string>;
    body_by_locale?: Record<string, string>;
    /** Optional location (push: rich notification / open in maps; WhatsApp: location template). */
    location?: {
        lat?: number;
        lon?: number;
        name?: string;
        address?: string;
    };
    subject?: string;
    preview_text?: string;
    from_name?: string;
    from_address?: string;
    reply_to?: string;
    blocks?: unknown[];
    html?: string;
    header?: string;
    footer?: string;
    template_type?: string;
    template_name?: string;
    media_url?: string;
    document_filename?: string;
    media_caption?: string;
    coupon_code?: string;
    lto_expiry?: string;
    products?: unknown[];
    buttons?: {
        label?: string;
        url?: string;
    }[];
    auth_type?: string;
    auth_label?: string;
    auth_code?: string;
    sender_id?: string;
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
    ttl: number;
    collapse_key?: string;
    local_time?: boolean;
    quiet_hours?: boolean;
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