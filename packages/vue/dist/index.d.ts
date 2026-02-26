import { App } from 'vue';
import { default as KeosNotificationBuilder } from './KeosNotificationBuilder.vue';
import { default as KeosWhatsAppBuilder } from './KeosWhatsAppBuilder.vue';
import { default as KeosSmsBuilder } from './KeosSmsBuilder.vue';
import { default as KeosEmailBuilder } from './KeosEmailBuilder.vue';
import { default as BuilderShell } from './BuilderShell.vue';
import { default as BuilderOutline } from './BuilderOutline.vue';
import { default as BuilderVersionHistoryModal } from './BuilderVersionHistoryModal.vue';
import { default as BuilderFormShell } from './BuilderFormShell.vue';
import { default as BuilderActionsBar } from './BuilderActionsBar.vue';
import { default as BuilderTopShell } from './BuilderTopShell.vue';

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
export declare function install(app: App): void;
declare const _default: {
    install: typeof install;
    KeosNotificationBuilder: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        versions: {
            type: import('vue').PropType<import('./BuilderVersionHistoryModal.vue').VersionEntry[]>;
            default: () => never[];
        };
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        change: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        "update:modelValue": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        save: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        edit: () => void;
        "send-test": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        schedule: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        send: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        duplicate: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        "save-version": (campaign: import('@keos/notification-builder-core').Campaign) => void;
    }, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        versions: {
            type: import('vue').PropType<import('./BuilderVersionHistoryModal.vue').VersionEntry[]>;
            default: () => never[];
        };
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
    }>> & Readonly<{
        onChange?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        "onUpdate:modelValue"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSave?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onEdit?: (() => any) | undefined;
        "onSend-test"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSchedule?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSend?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onDuplicate?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        "onSave-version"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
    }>, {
        versions: import('./BuilderVersionHistoryModal.vue').VersionEntry[];
        variableOptions: string[];
        disabledSections: string[];
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    KeosWhatsAppBuilder: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        change: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        "update:modelValue": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        save: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        edit: () => void;
        "send-test": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        schedule: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        send: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        duplicate: (campaign: import('@keos/notification-builder-core').Campaign) => void;
    }, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
    }>> & Readonly<{
        onChange?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        "onUpdate:modelValue"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSave?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onEdit?: (() => any) | undefined;
        "onSend-test"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSchedule?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSend?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onDuplicate?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
    }>, {
        variableOptions: string[];
        disabledSections: string[];
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    KeosSmsBuilder: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        costPerSegment: {
            type: import('vue').PropType<number>;
            default: number;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        change: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        "update:modelValue": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        save: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        edit: () => void;
        "send-test": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        schedule: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        send: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        duplicate: (campaign: import('@keos/notification-builder-core').Campaign) => void;
    }, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        costPerSegment: {
            type: import('vue').PropType<number>;
            default: number;
        };
    }>> & Readonly<{
        onChange?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        "onUpdate:modelValue"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSave?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onEdit?: (() => any) | undefined;
        "onSend-test"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSchedule?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSend?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onDuplicate?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
    }>, {
        variableOptions: string[];
        disabledSections: string[];
        costPerSegment: number;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    KeosEmailBuilder: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        change: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        "update:modelValue": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        save: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        edit: () => void;
        "send-test": (campaign: import('@keos/notification-builder-core').Campaign) => void;
        schedule: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        send: (campaign: import('@keos/notification-builder-core').Campaign) => void;
        duplicate: (campaign: import('@keos/notification-builder-core').Campaign) => void;
    }, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        variableOptions: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<Partial<import('@keos/notification-builder-core').Campaign>>;
        };
        hooks: {
            type: import('vue').PropType<import('@keos/notification-builder-core').BuilderExtensionHooks>;
        };
        disabledSections: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
    }>> & Readonly<{
        onChange?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        "onUpdate:modelValue"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSave?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onEdit?: (() => any) | undefined;
        "onSend-test"?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSchedule?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onSend?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
        onDuplicate?: ((campaign: import('@keos/notification-builder-core').Campaign) => any) | undefined;
    }>, {
        variableOptions: string[];
        disabledSections: string[];
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map