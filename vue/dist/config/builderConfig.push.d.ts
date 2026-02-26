export interface BuilderSectionConfig {
    id: string;
    title: string;
    /** Component name or key for rendering */
    sectionKey: string;
    order: number;
}
export interface BuilderPreviewConfig {
    hasDeviceToggle: boolean;
    supportsThemeToggle: boolean;
    platformOptions: readonly string[];
}
export declare const pushSections: BuilderSectionConfig[];
export declare const pushPreviewConfig: BuilderPreviewConfig;
//# sourceMappingURL=builderConfig.push.d.ts.map