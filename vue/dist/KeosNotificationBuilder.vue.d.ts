import { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import { VersionEntry } from './BuilderVersionHistoryModal.vue';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    /** Version history entries (from parent) for "Version history" modal */
    versions?: VersionEntry[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showHistory?: boolean;
    showSaveVersion?: boolean;
    showDuplicate?: boolean;
    /**
     * When true (default), builder is design-only: message content + preview.
     * Audience, delivery/schedule, and send options are configured on another page.
     */
    designOnly?: boolean;
}>, {
    disabledSections: () => never[];
    variableOptions: () => never[];
    versions: () => never[];
    showSave: boolean;
    showClose: boolean;
    showHistory: boolean;
    showSaveVersion: boolean;
    showDuplicate: boolean;
    designOnly: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (campaign: Campaign) => void;
    "update:modelValue": (campaign: Campaign) => void;
    save: (campaign: Campaign) => void;
    edit: () => void;
    "send-test": (campaign: Campaign) => void;
    schedule: (campaign: Campaign) => void;
    send: (campaign: Campaign) => void;
    duplicate: (campaign: Campaign) => void;
    "save-version": (campaign: Campaign) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    /** Version history entries (from parent) for "Version history" modal */
    versions?: VersionEntry[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showHistory?: boolean;
    showSaveVersion?: boolean;
    showDuplicate?: boolean;
    /**
     * When true (default), builder is design-only: message content + preview.
     * Audience, delivery/schedule, and send options are configured on another page.
     */
    designOnly?: boolean;
}>, {
    disabledSections: () => never[];
    variableOptions: () => never[];
    versions: () => never[];
    showSave: boolean;
    showClose: boolean;
    showHistory: boolean;
    showSaveVersion: boolean;
    showDuplicate: boolean;
    designOnly: boolean;
}>>> & Readonly<{
    onChange?: ((campaign: Campaign) => any) | undefined;
    "onUpdate:modelValue"?: ((campaign: Campaign) => any) | undefined;
    onSave?: ((campaign: Campaign) => any) | undefined;
    onEdit?: (() => any) | undefined;
    "onSend-test"?: ((campaign: Campaign) => any) | undefined;
    onSchedule?: ((campaign: Campaign) => any) | undefined;
    onSend?: ((campaign: Campaign) => any) | undefined;
    onDuplicate?: ((campaign: Campaign) => any) | undefined;
    "onSave-version"?: ((campaign: Campaign) => any) | undefined;
}>, {
    versions: VersionEntry[];
    variableOptions: string[];
    disabledSections: string[];
    showSave: boolean;
    showClose: boolean;
    showDuplicate: boolean;
    designOnly: boolean;
    showHistory: boolean;
    showSaveVersion: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
//# sourceMappingURL=KeosNotificationBuilder.vue.d.ts.map