declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    campaignName: string;
    status: string;
    dirty: boolean;
    saving?: boolean;
    lastSavedAt?: Date | null;
    canUndo?: boolean;
    canRedo?: boolean;
    /** When set, show workflow status dropdown (Draft → Ready for review → Approved → Archived) */
    workflowStatus?: string;
}>, {
    canUndo: boolean;
    canRedo: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:campaignName": (value: string) => void;
    "update:workflowStatus": (value: string) => void;
    undo: () => void;
    redo: () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    campaignName: string;
    status: string;
    dirty: boolean;
    saving?: boolean;
    lastSavedAt?: Date | null;
    canUndo?: boolean;
    canRedo?: boolean;
    /** When set, show workflow status dropdown (Draft → Ready for review → Approved → Archived) */
    workflowStatus?: string;
}>, {
    canUndo: boolean;
    canRedo: boolean;
}>>> & Readonly<{
    "onUpdate:campaignName"?: ((value: string) => any) | undefined;
    "onUpdate:workflowStatus"?: ((value: string) => any) | undefined;
    onUndo?: (() => any) | undefined;
    onRedo?: (() => any) | undefined;
}>, {
    canUndo: boolean;
    canRedo: boolean;
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
//# sourceMappingURL=BuilderHeader.vue.d.ts.map