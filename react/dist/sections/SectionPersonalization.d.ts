import { CampaignMessage } from '@keos/notification-builder-core';

export declare function SectionPersonalization({ variableOptions, onInsertVariable, }: {
    message: CampaignMessage;
    variableOptions?: string[];
    onInsertVariable?: (payload: {
        variable: string;
        field: 'title' | 'body';
    }) => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SectionPersonalization.d.ts.map