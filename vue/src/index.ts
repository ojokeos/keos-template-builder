import { type App } from 'vue';
import KeosNotificationBuilder from './KeosNotificationBuilder.vue';
import KeosWhatsAppBuilder from './KeosWhatsAppBuilder.vue';
import KeosSmsBuilder from './KeosSmsBuilder.vue';
import KeosEmailBuilder from './KeosEmailBuilder.vue';
import BuilderShell from './BuilderShell.vue';
import BuilderOutline from './BuilderOutline.vue';
import BuilderVersionHistoryModal from './BuilderVersionHistoryModal.vue';
import BuilderFormShell from './BuilderFormShell.vue';
import BuilderActionsBar from './BuilderActionsBar.vue';
import BuilderTopShell from './BuilderTopShell.vue';

export { KeosNotificationBuilder, KeosWhatsAppBuilder, KeosSmsBuilder, KeosEmailBuilder };
export { BuilderShell, BuilderOutline, BuilderVersionHistoryModal, BuilderFormShell, BuilderActionsBar, BuilderTopShell };
export type { OutlineItem } from './BuilderOutline.vue';
export type { VersionEntry } from './BuilderVersionHistoryModal.vue';
export { useCampaignState } from './composables/useCampaignState';
export type { UseCampaignStateOptions } from './composables/useCampaignState';
export { useAutosave } from './composables/useAutosave';
export type { UseAutosaveOptions } from './composables/useAutosave';
export { renderTemplatePreview, DEFAULT_SAMPLE_PROFILES } from './utils/renderTemplatePreview';
export type { SampleProfile } from './utils/renderTemplatePreview';

export function install(app: App) {
  app.component('KeosNotificationBuilder', KeosNotificationBuilder);
  app.component('KeosWhatsAppBuilder', KeosWhatsAppBuilder);
  app.component('KeosSmsBuilder', KeosSmsBuilder);
  app.component('KeosEmailBuilder', KeosEmailBuilder);
  app.component('BuilderShell', BuilderShell);
  app.component('BuilderOutline', BuilderOutline);
  app.component('BuilderVersionHistoryModal', BuilderVersionHistoryModal);
  app.component('BuilderFormShell', BuilderFormShell);
  app.component('BuilderActionsBar', BuilderActionsBar);
  app.component('BuilderTopShell', BuilderTopShell);
}

export default {
  install,
  KeosNotificationBuilder,
  KeosWhatsAppBuilder,
  KeosSmsBuilder,
  KeosEmailBuilder,
};
