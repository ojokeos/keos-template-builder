import { CampaignMessage, Platform } from '@keos/notification-builder-core';

export declare function SectionMessage({ message, titleCount, bodyCount, titleLimit, bodyLimit, onUpdate, }: {
    message: CampaignMessage;
    titleCount: number;
    bodyCount: number;
    titleLimit: number;
    bodyLimit: number;
    selectedPlatform: Platform;
    onUpdate: (partial: Partial<CampaignMessage>) => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SectionMessage.d.ts.map