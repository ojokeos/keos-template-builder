export interface WaPreviewTemplate {
    format?: string;
    templateName?: string;
    templateLanguage?: string;
    templateCategory?: string;
    header?: {
        type: 'text' | 'image' | 'video' | 'document';
        text?: string;
        url?: string;
        filename?: string;
    };
    body: string;
    mediaCaption?: string;
    footer?: string;
    buttons?: {
        text: string;
        type?: string;
        value?: string;
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
    flow?: {
        id?: string;
        ctaLabel?: string;
    };
    linkPreview?: {
        title?: string;
        description?: string;
        domain?: string;
        url?: string;
        thumbnail?: string;
    };
    voiceNote?: {
        duration?: string;
        transcript?: string;
        profileImage?: string;
    };
    contactCard?: {
        name?: string;
        title?: string;
        phone?: string;
        email?: string;
        address?: string;
    };
    documentCard?: {
        filename?: string;
        size?: string;
        caption?: string;
    };
    locationRequest?: {
        label?: string;
    };
    orderCard?: {
        title?: string;
        items?: string;
        image?: string;
        buttonLabel?: string;
    };
    carouselCards?: {
        title?: string;
        description?: string;
        image?: string;
        button?: string;
    }[];
    reactionEmoji?: string;
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