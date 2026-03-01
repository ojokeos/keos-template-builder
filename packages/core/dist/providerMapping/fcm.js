/**
 * Maps canonical Campaign to Firebase Cloud Messaging (FCM) payload shape.
 * FCM uses: TTL in seconds, priority high/normal, collapse_key, content_available for silent.
 */
export function toFCM(campaign) {
    const warnings = [];
    const { message, delivery, audience } = campaign;
    const payload = {
        notification: {
            title: message.title,
            body: message.body,
            ...(message.image_url && { image: message.image_url }),
            ...(message.deep_link && { click_action: message.deep_link }),
        },
        data: {},
        android: {
            priority: delivery.priority === 'high' ? 'high' : 'normal',
            ttl: `${delivery.ttl}s`,
            ...(delivery.collapse_key && { collapseKey: delivery.collapse_key }),
            ...(message.deep_link && { clickAction: message.deep_link }),
        },
        apns: undefined,
        webpush: undefined,
    };
    if (delivery.silent_push) {
        payload.content_available = true;
        if (payload.notification && typeof payload.notification === 'object') {
            delete payload.notification.title;
            delete payload.notification.body;
        }
        warnings.push('FCM silent push: notification title/body may be omitted by client');
    }
    if (campaign.tracking?.campaign_name) {
        payload.data['campaign_name'] = campaign.tracking.campaign_name;
    }
    if (message.deep_link) {
        payload.data['deep_link'] = message.deep_link;
    }
    if (message.location && (message.location.lat != null || message.location.lon != null || message.location.name || message.location.address)) {
        payload.data['location'] = message.location;
    }
    if (Array.isArray(message.actions) && message.actions.length > 0) {
        payload.data['actions'] = message.actions;
    }
    if (audience.type === 'topic' && audience.topic_name) {
        payload.topic = audience.topic_name;
    }
    return { payload, warnings };
}
//# sourceMappingURL=fcm.js.map