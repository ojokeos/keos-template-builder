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

export const pushSections: BuilderSectionConfig[] = [
  { id: 'section-template', title: 'Template', sectionKey: 'template', order: 0 },
  { id: 'section-schedule', title: 'Schedule', sectionKey: 'schedule', order: 1 },
];

export const pushPreviewConfig: BuilderPreviewConfig = {
  hasDeviceToggle: true,
  supportsThemeToggle: true,
  platformOptions: ['android', 'ios', 'web'],
};
