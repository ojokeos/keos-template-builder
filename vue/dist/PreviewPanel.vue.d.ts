import { Platform } from '@keos/notification-builder-core';
import { SampleProfile } from './utils/renderTemplatePreview';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    getPreview: (platform: Platform, options?: {
        expanded?: boolean;
    }) => any;
    selectedPlatform: Platform;
    previewProfile?: SampleProfile | null;
    message?: {
        deep_link?: string;
    };
    delivery?: {
        priority?: string;
        ttl?: number;
        silent_push?: boolean;
    };
}>, {
    previewProfile: null;
    message: undefined;
    delivery: undefined;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    getPreview: (platform: Platform, options?: {
        expanded?: boolean;
    }) => any;
    selectedPlatform: Platform;
    previewProfile?: SampleProfile | null;
    message?: {
        deep_link?: string;
    };
    delivery?: {
        priority?: string;
        ttl?: number;
        silent_push?: boolean;
    };
}>, {
    previewProfile: null;
    message: undefined;
    delivery: undefined;
}>>> & Readonly<{}>, {
    message: {
        deep_link?: string;
    };
    delivery: {
        priority?: string;
        ttl?: number;
        silent_push?: boolean;
    };
    previewProfile: SampleProfile | null;
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
//# sourceMappingURL=PreviewPanel.vue.d.ts.map