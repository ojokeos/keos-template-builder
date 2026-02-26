import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';

/**
 * Maps canonical Campaign to Firebase Cloud Messaging (FCM) payload shape.
 * FCM uses: TTL in seconds, priority high/normal, collapse_key, content_available for silent.
 */
export function toFCM(campaign: Campaign): ProviderMappingResult {
  const warnings: string[] = [];
  const { message, delivery, audience } = campaign;

  const payload: Record<string, unknown> = {
    notification: {
      title: message.title_template,
      body: message.body_template,
      ...(message.image_url && { image: message.image_url }),
      ...(message.deep_link && { click_action: message.deep_link }),
    },
    data: {},
    android: {
      priority: delivery.priority === 'high' ? 'high' : 'normal',
      ttl: `${delivery.ttl_seconds}s`,
      ...(delivery.collapse_key && { collapseKey: delivery.collapse_key }),
      ...(message.deep_link && { clickAction: message.deep_link }),
    },
    apns: undefined,
    webpush: undefined,
  };

  if (delivery.silent_push) {
    (payload as Record<string, unknown>).content_available = true;
    if (payload.notification && typeof payload.notification === 'object') {
      delete (payload.notification as Record<string, unknown>).title;
      delete (payload.notification as Record<string, unknown>).body;
    }
    warnings.push('FCM silent push: notification title/body may be omitted by client');
  }

  if (campaign.tracking?.campaign_name) {
    (payload.data as Record<string, string>)['campaign_name'] = campaign.tracking.campaign_name;
  }
  if (message.deep_link) {
    (payload.data as Record<string, string>)['deep_link'] = message.deep_link;
  }

  if (Array.isArray((message as any).actions) && (message as any).actions.length > 0) {
    (payload.data as Record<string, unknown>)['actions'] = (message as any).actions;
  }

  if (audience.type === 'topic' && audience.topic_name) {
    (payload as Record<string, unknown>).topic = audience.topic_name;
  }

  return { payload, warnings };
}
