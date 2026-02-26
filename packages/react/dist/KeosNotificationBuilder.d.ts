import { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';

export interface KeosNotificationBuilderProps {
    campaign?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    onChange?: (campaign: Campaign) => void;
    onSave?: (campaign: Campaign) => void;
    onSendTest?: (campaign: Campaign) => void;
    onSchedule?: (campaign: Campaign) => void;
    onSend?: (campaign: Campaign) => void;
}
export declare function KeosNotificationBuilder({ campaign: initialCampaign, hooks, disabledSections, variableOptions, onChange, onSave, onSendTest, onSchedule, onSend, }: KeosNotificationBuilderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=KeosNotificationBuilder.d.ts.map