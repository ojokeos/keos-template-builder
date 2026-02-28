import { SCHEMA_VERSION } from './constants.js';
import { AUDIENCE_TYPES, DEFAULT_PRIORITY, DEFAULT_TTL_SECONDS, PLATFORMS, PRIORITIES, } from './constants.js';
export function createEmptyAudience() {
    return {
        type: 'topic',
        topic_name: 'default',
        platforms: [...PLATFORMS],
        test_mode: false,
    };
}
export function createEmptyMessage() {
    return {
        title: '',
        body: '',
        variables_used: [],
        // No actions by default; UI can add up to provider-supported count.
        // When omitted, mappers simply won't include actions.
        // @ts-expect-error actions is optional on CampaignMessage but we initialize as empty.
        actions: [],
    };
}
export function createEmptyDelivery() {
    return {
        priority: DEFAULT_PRIORITY,
        ttl_seconds: DEFAULT_TTL_SECONDS,
        quiet_hours_respected: false,
        send_local_time: false,
        silent_push: false,
    };
}
export function createEmptyTracking() {
    return {
        campaign_name: '',
        tags: [],
        ab_test: false,
    };
}
export function createEmptyCampaign(overrides) {
    return {
        schema_version: SCHEMA_VERSION,
        name: '',
        status: 'draft',
        audience: createEmptyAudience(),
        message: createEmptyMessage(),
        delivery: createEmptyDelivery(),
        tracking: createEmptyTracking(),
        ...overrides,
    };
}
export function ensureSchemaVersion(campaign) {
    const c = campaign;
    if (!c.schema_version) {
        c.schema_version = SCHEMA_VERSION;
    }
    if (!c.audience)
        c.audience = createEmptyAudience();
    if (!c.message)
        c.message = createEmptyMessage();
    if (!c.delivery)
        c.delivery = createEmptyDelivery();
    if (!c.tracking)
        c.tracking = createEmptyTracking();
    if (!PRIORITIES.includes(c.delivery.priority))
        c.delivery.priority = DEFAULT_PRIORITY;
    if (!AUDIENCE_TYPES.includes(c.audience.type))
        c.audience.type = 'topic';
    if (c.audience.type === 'topic' && !c.audience.topic_name)
        c.audience.topic_name = 'default';
    return c;
}
//# sourceMappingURL=schema.js.map