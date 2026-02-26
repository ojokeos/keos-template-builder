import { CampaignMessage } from '@keos/notification-builder-core';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    message: CampaignMessage;
    variableOptions?: string[];
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    update: (partial: Partial<CampaignMessage>) => void;
    insertVariable: (payload: {
        variable: string;
        field: "title" | "body";
    }) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    message: CampaignMessage;
    variableOptions?: string[];
}>>> & Readonly<{
    onUpdate?: ((partial: Partial<CampaignMessage>) => any) | undefined;
    onInsertVariable?: ((payload: {
        variable: string;
        field: "title" | "body";
    }) => any) | undefined;
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
//# sourceMappingURL=SectionPersonalization.vue.d.ts.map