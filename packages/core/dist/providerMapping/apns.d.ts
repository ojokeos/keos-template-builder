import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';
/**
 * Maps canonical Campaign to Apple Push Notification service (APNs) payload shape.
 * APNs uses: expiration as timestamp, priority 10/5, apns-collapse-id, content-available for silent.
 */
export declare function toAPNs(campaign: Campaign): ProviderMappingResult;
//# sourceMappingURL=apns.d.ts.map