/**
 * Maps canonical Campaign to Apple Push Notification service (APNs) payload shape.
 * APNs uses: expiration as timestamp, priority 10/5, apns-collapse-id, content-available for silent.
 */
export function toAPNs(campaign) {
    const warnings = [];
    const { message, delivery } = campaign;
    const ttlSeconds = delivery.ttl;
    const expirationTimestamp = Math.floor(Date.now() / 1000) + ttlSeconds;
    const aps = {
        alert: {
            title: message.title,
            body: message.body,
        },
        'mutable-content': !!message.image_url,
        ...(delivery.silent_push && { 'content-available': 1 }),
    };
    if (delivery.silent_push) {
        delete aps.alert;
        warnings.push('APNs silent push: alert omitted (content-available only)');
    }
    const payload = {
        aps,
        payload_options: {
            expiration: expirationTimestamp,
            priority: delivery.priority === 'high' ? 10 : 5,
            ...(delivery.collapse_key && { 'apns-collapse-id': delivery.collapse_key }),
        },
    };
    if (message.deep_link) {
        payload.deep_link = message.deep_link;
    }
    if (message.location && (message.location.lat != null || message.location.lon != null || message.location.name || message.location.address)) {
        payload.location = message.location;
    }
    if (campaign.tracking?.campaign_name) {
        payload.campaign_name = campaign.tracking.campaign_name;
    }
    if (Array.isArray(message.actions) && message.actions.length > 0) {
        payload.actions = message.actions;
    }
    return { payload, warnings };
}
//# sourceMappingURL=apns.js.map