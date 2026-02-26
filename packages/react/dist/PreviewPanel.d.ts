import { PreviewResult, Platform } from '@keos/notification-builder-core';

export declare function PreviewPanel({ getPreview, selectedPlatform, onPlatformChange, }: {
    getPreview: (platform: Platform, options?: {
        expanded?: boolean;
    }) => PreviewResult;
    selectedPlatform: Platform;
    onPlatformChange: (platform: Platform) => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PreviewPanel.d.ts.map