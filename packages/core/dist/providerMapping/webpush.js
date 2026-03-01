/**
 * Maps canonical Campaign to Web Push API payload shape.
 * Web Push: TTL in seconds, no priority field, tag for dedupe/collapse.
 */
export function toWebPush(campaign) {
    const warnings = [];
    const { message, delivery } = campaign;
    const payload = {
        title: message.title,
        body: message.body,
        ...(message.image_url && { image: message.image_url }),
        ...(message.deep_link && { url: message.deep_link }),
        ...(delivery.collapse_key && { tag: delivery.collapse_key }),
        data: {
            ttl: delivery.ttl,
            ...(message.deep_link && { deep_link: message.deep_link }),
            ...(campaign.tracking?.campaign_name && { campaign_name: campaign.tracking.campaign_name }),
            ...(message.location && (message.location.lat != null || message.location.lon != null || message.location.name || message.location.address) && { location: message.location }),
        },
    };
    if (Array.isArray(message.actions) && message.actions.length > 0) {
        const actions = message.actions;
        payload.actions = actions.map((a) => ({
            action: a.id,
            title: a.label,
        }));
        payload.data.actions = actions;
    }
    if (delivery.priority && delivery.priority !== 'normal') {
        warnings.push('Web Push does not support priority; value ignored');
    }
    if (delivery.silent_push) {
        payload.data_only = true;
        delete payload.title;
        delete payload.body;
        warnings.push('Web Push data-only: no title/body in notification');
    }
    return { payload, warnings };
}
//# sourceMappingURL=webpush.js.map