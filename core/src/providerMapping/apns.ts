import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';

/**
 * Maps canonical Campaign to Apple Push Notification service (APNs) payload shape.
 * APNs uses: expiration as timestamp, priority 10/5, apns-collapse-id, content-available for silent.
 */
export function toAPNs(campaign: Campaign): ProviderMappingResult {
  const warnings: string[] = [];
  const { message, delivery } = campaign;

  const ttlSeconds = delivery.ttl_seconds;
  const expirationTimestamp = Math.floor(Date.now() / 1000) + ttlSeconds;

  const aps: Record<string, unknown> = {
    alert: {
      title: message.title_template,
      body: message.body_template,
    },
    'mutable-content': !!message.image_url,
    ...(delivery.silent_push && { 'content-available': 1 }),
  };

  if (delivery.silent_push) {
    delete aps.alert;
    warnings.push('APNs silent push: alert omitted (content-available only)');
  }

  const payload: Record<string, unknown> = {
    aps,
    payload_options: {
      expiration: expirationTimestamp,
      priority: delivery.priority === 'high' ? 10 : 5,
      ...(delivery.collapse_key && { 'apns-collapse-id': delivery.collapse_key }),
    },
  };

  if (message.deep_link) {
    (payload as Record<string, unknown>).deep_link = message.deep_link;
  }
  if (campaign.tracking?.campaign_name) {
    (payload as Record<string, unknown>).campaign_name = campaign.tracking.campaign_name;
  }

  if (Array.isArray((message as any).actions) && (message as any).actions.length > 0) {
    (payload as Record<string, unknown>).actions = (message as any).actions;
  }

  return { payload, warnings };
}
