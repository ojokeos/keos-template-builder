const TTL_LABELS = {
    3600: '1 hour',
    7200: '2 hours',
    86400: '24 hours',
    172800: '48 hours',
};
function formatSendTime(scheduledAt) {
    if (!scheduledAt?.trim())
        return 'Now';
    try {
        const d = new Date(scheduledAt);
        if (Number.isNaN(d.getTime()))
            return scheduledAt;
        return d.toLocaleString(undefined, {
            dateStyle: 'short',
            timeStyle: 'short',
        });
    }
    catch {
        return scheduledAt;
    }
}
export function computeDeliverySummary(campaign, estimatedReach) {
    const { audience, delivery } = campaign;
    const reach = estimatedReach ?? audience.estimated_reach;
    const ttlLabel = TTL_LABELS[delivery.ttl_seconds] ?? `${delivery.ttl_seconds}s`;
    return {
        sendTime: formatSendTime(delivery.scheduled_at),
        audienceType: audience.type,
        estimatedReach: reach,
        platforms: [...audience.platforms],
        priority: delivery.priority,
        ttlLabel,
    };
}
const LARGE_AUDIENCE_THRESHOLD = 100000;
export function computeSendWarnings(campaign, estimatedReach) {
    const warnings = [];
    const reach = estimatedReach ?? campaign.audience.estimated_reach;
    if (reach !== undefined && reach >= LARGE_AUDIENCE_THRESHOLD) {
        warnings.push({
            message: `Estimated reach is very high (${reach.toLocaleString()} users). Consider rate limits.`,
            severity: 'warning',
        });
    }
    if (campaign.tracking &&
        !campaign.tracking.campaign_name?.trim() &&
        !campaign.name?.trim()) {
        warnings.push({
            message: 'No campaign name set for reporting.',
            severity: 'warning',
        });
    }
    if (!campaign.message.deep_link?.trim()) {
        warnings.push({
            message: 'Consider adding a deep link for better engagement.',
            severity: 'info',
        });
    }
    return warnings;
}
//# sourceMappingURL=deliverySummary.js.map