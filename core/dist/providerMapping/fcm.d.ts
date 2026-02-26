import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';
/**
 * Maps canonical Campaign to Firebase Cloud Messaging (FCM) payload shape.
 * FCM uses: TTL in seconds, priority high/normal, collapse_key, content_available for silent.
 */
export declare function toFCM(campaign: Campaign): ProviderMappingResult;
//# sourceMappingURL=fcm.d.ts.map