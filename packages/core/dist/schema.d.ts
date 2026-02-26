import type { Campaign, CampaignAudience, CampaignDelivery, CampaignMessage, CampaignTracking } from './types.js';
export declare function createEmptyAudience(): CampaignAudience;
export declare function createEmptyMessage(): CampaignMessage;
export declare function createEmptyDelivery(): CampaignDelivery;
export declare function createEmptyTracking(): CampaignTracking;
export declare function createEmptyCampaign(overrides?: Partial<Campaign>): Campaign;
export declare function ensureSchemaVersion(campaign: Partial<Campaign>): Campaign;
//# sourceMappingURL=schema.d.ts.map