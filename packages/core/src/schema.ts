import { SCHEMA_VERSION } from './constants.js';
import type { Campaign, CampaignAudience, CampaignDelivery, CampaignMessage, CampaignTracking } from './types.js';
import {
  AUDIENCE_TYPES,
  DEFAULT_PRIORITY,
  DEFAULT_TTL_SECONDS,
  PLATFORMS,
  PRIORITIES,
} from './constants.js';

export function createEmptyAudience(): CampaignAudience {
  return {
    type: 'topic',
    topic_name: 'default',
    platforms: [...PLATFORMS],
    test_mode: false,
  };
}

export function createEmptyMessage(): CampaignMessage {
  return {
    title: '',
    body: '',
    variables: [],
    // No actions by default; UI can add up to provider-supported count.
    // When omitted, mappers simply won't include actions.
    // @ts-expect-error actions is optional on CampaignMessage but we initialize as empty.
    actions: [],
  };
}

export function createEmptyDelivery(): CampaignDelivery {
  return {
    priority: DEFAULT_PRIORITY,
    ttl: DEFAULT_TTL_SECONDS,
    quiet_hours: false,
    local_time: false,
    silent_push: false,
  };
}

export function createEmptyTracking(): CampaignTracking {
  return {
    campaign_name: '',
    tags: [],
    ab_test: false,
  };
}

export function createEmptyCampaign(overrides?: Partial<Campaign>): Campaign {
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

export function ensureSchemaVersion(campaign: Partial<Campaign>): Campaign {
  const c = campaign as Campaign;
  if (!c.schema_version) {
    c.schema_version = SCHEMA_VERSION;
  }
  if (!c.audience) c.audience = createEmptyAudience();
  if (!c.message) c.message = createEmptyMessage();
  if (!c.delivery) c.delivery = createEmptyDelivery();
  if (!c.tracking) c.tracking = createEmptyTracking();
  if (!PRIORITIES.includes(c.delivery.priority)) c.delivery.priority = DEFAULT_PRIORITY;
  if (c.delivery.ttl === undefined) c.delivery.ttl = DEFAULT_TTL_SECONDS;
  if (!AUDIENCE_TYPES.includes(c.audience.type)) c.audience.type = 'topic';
  if (c.audience.type === 'topic' && !c.audience.topic_name) c.audience.topic_name = 'default';
  return c;
}
