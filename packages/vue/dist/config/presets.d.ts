import { Campaign } from '@keos/notification-builder-core';

export interface PresetOption {
    id: string;
    label: string;
    /** Partial campaign to merge into current (message, delivery, etc.) */
    campaign: Partial<Campaign>;
}
export declare const PUSH_PRESETS: PresetOption[];
export declare const WHATSAPP_PRESETS: PresetOption[];
export declare const SMS_PRESETS: PresetOption[];
export declare const EMAIL_PRESETS: PresetOption[];
//# sourceMappingURL=presets.d.ts.map