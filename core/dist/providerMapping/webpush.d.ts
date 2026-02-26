import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';
/**
 * Maps canonical Campaign to Web Push API payload shape.
 * Web Push: TTL in seconds, no priority field, tag for dedupe/collapse.
 */
export declare function toWebPush(campaign: Campaign): ProviderMappingResult;
//# sourceMappingURL=webpush.d.ts.map