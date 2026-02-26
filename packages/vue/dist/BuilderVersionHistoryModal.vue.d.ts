import { Campaign } from '@keos/notification-builder-core';

export interface VersionEntry {
    id: string;
    label?: string;
    timestamp: string;
    snapshot: Campaign;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    open: boolean;
    versions: VersionEntry[];
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => void;
    restore: (snapshot: Campaign) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    open: boolean;
    versions: VersionEntry[];
}>>> & Readonly<{
    onClose?: (() => any) | undefined;
    onRestore?: ((snapshot: Campaign) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
//# sourceMappingURL=BuilderVersionHistoryModal.vue.d.ts.map