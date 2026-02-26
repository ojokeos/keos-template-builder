export interface WaPreviewTemplate {
    header?: {
        type: 'text' | 'image' | 'video' | 'document';
        text?: string;
        url?: string;
        filename?: string;
    };
    body: string;
    footer?: string;
    buttons?: {
        text: string;
    }[];
    location?: {
        lat: number;
        lng: number;
        name?: string;
        address?: string;
    };
    catalog?: {
        label?: string;
    } | boolean;
    multiProduct?: {
        image?: string;
        name?: string;
        price?: string;
    }[];
    coupon?: {
        code: string;
    };
    limitedOffer?: string;
    auth?: {
        code: string;
    };
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    template: WaPreviewTemplate;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    template: WaPreviewTemplate;
}>>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
//# sourceMappingURL=WhatsAppTemplatePreview.vue.d.ts.map