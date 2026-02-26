import { CampaignDelivery } from '@keos/notification-builder-core';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    delivery: CampaignDelivery;
    /** When false, only show send time and schedule (for SMS, Email, WhatsApp). When true, show TTL, priority, quiet hours (push). */
    showPushOptions?: boolean;
    showReset?: boolean;
}>, {
    showPushOptions: boolean;
    showReset: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    reset: () => void;
    update: (partial: Partial<CampaignDelivery>) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    delivery: CampaignDelivery;
    /** When false, only show send time and schedule (for SMS, Email, WhatsApp). When true, show TTL, priority, quiet hours (push). */
    showPushOptions?: boolean;
    showReset?: boolean;
}>, {
    showPushOptions: boolean;
    showReset: boolean;
}>>> & Readonly<{
    onReset?: (() => any) | undefined;
    onUpdate?: ((partial: Partial<CampaignDelivery>) => any) | undefined;
}>, {
    showReset: boolean;
    showPushOptions: boolean;
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
//# sourceMappingURL=SectionDelivery.vue.d.ts.map