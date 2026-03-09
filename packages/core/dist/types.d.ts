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
    /** Emoji shortcode tags shown with the notification (e.g. ["warning", "computer"]). */
    tags?: string[];
    /** Enable Markdown formatting in the notification body. */
    markdown?: boolean;
    /** Notification icon URL (JPEG/PNG). */
    icon?: string;
    /** External file URL to attach to the notification. */
    attach?: string;
    /** Filename override for the attachment. */
    attachment_filename?: string;
    /** Forward notification to this email address. */
    email_forward?: string;
    /** Initiate a phone call to this number when notification is received. */
    call?: string;
    /** Scheduled delivery delay (e.g. "30min", "1h", "tomorrow, 3pm", Unix timestamp). */
    delay?: string;
    /** Enable server-side message caching. */
    cache?: boolean;
    /** Enable Firebase Cloud Messaging delivery. */
    firebase?: boolean;
    /** Enable UnifiedPush delivery. */
    unified_push?: boolean;
    /** ntfy.sh-compatible action buttons (up to 3). */
    actions?: NtfyAction[];
    subject?: string;
    preview_text?: string;
    from_name?: string;
    from_address?: string;
    reply_to?: string;
    blocks?: unknown[];
    html?: string;
    header?: string;
    header_type?: string;
    footer?: string;
    template_type?: string;
    template_category?: string;
    template_language?: string;
    template_name?: string;
    template_example?: string;
    vertical?: string;
    media_url?: string;
    media_handle?: string;
    document_filename?: string;
    media_caption?: string;
    coupon_code?: string;
    lto_expiry?: string;
    enable_sample?: boolean;
    allow_category_change?: boolean;
    add_security_recommendation?: boolean;
    code_expiration_minutes?: number;
    products?: unknown[];
    cards?: unknown[];
    buttons?: Array<{
        id?: string;
        label?: string;
        type?: string;
        url?: string;
        url_example?: string;
        phone?: string;
        example?: string;
        otp_type?: string;
        autofill_text?: string;
        package_name?: string;
        signature_hash?: string;
    }>;
    auth_type?: string;
    auth_label?: string;
    auth_code?: string;
    flow_id?: string;
    flow_cta_label?: string;
    sender_id?: string;
}
/**
 * ntfy.sh-compatible notification action button (up to 3 per notification).
 * Supports view, http, broadcast, and copy action types.
 */
export interface NtfyAction {
    id?: string;
    /** Action type */
    action: 'view' | 'http' | 'broadcast' | 'copy';
    /** Button label shown to the user */
    label: string;
    /** Dismiss notification after action is triggered */
    clear?: boolean;
    /** view / http: URL to open or send request to */
    url?: string;
    /** http: HTTP method (default: POST) */
    method?: string;
    /** http: Request headers as key-value pairs */
    headers?: Record<string, string>;
    /** http: Request body */
    body?: string;
    /** broadcast: Android intent action name */
    intent?: string;
    /** broadcast: Intent extras as key-value string pairs */
    extras?: Record<string, string>;
    /** copy: Value to copy to clipboard */
    value?: string;
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