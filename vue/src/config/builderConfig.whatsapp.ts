import type { BuilderSectionConfig, BuilderPreviewConfig } from './builderConfig.push';

export const whatsappSections: BuilderSectionConfig[] = [
  { id: 'section-template', title: 'Template', sectionKey: 'whatsapp', order: 0 },
];

export const whatsappPreviewConfig: BuilderPreviewConfig = {
  hasDeviceToggle: true,
  supportsThemeToggle: true,
  platformOptions: ['android', 'ios', 'desktop'],
};
