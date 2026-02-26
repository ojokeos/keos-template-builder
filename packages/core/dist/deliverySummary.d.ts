import type { Campaign } from './types.js';
export interface DeliverySummary {
    sendTime: string;
    audienceType: string;
    estimatedReach: number | undefined;
    platforms: string[];
    priority: string;
    ttlLabel: string;
}
export declare function computeDeliverySummary(campaign: Campaign, estimatedReach?: number): DeliverySummary;
export interface SendWarning {
    message: string;
    severity: 'warning' | 'info';
}
export declare function computeSendWarnings(campaign: Campaign, estimatedReach?: number): SendWarning[];
//# sourceMappingURL=deliverySummary.d.ts.map