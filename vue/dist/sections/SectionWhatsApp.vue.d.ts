import { CampaignMessage } from '@keos/notification-builder-core';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    message: CampaignMessage;
    showReset?: boolean;
    disabledCategories?: string[];
    disabledFormats?: string[];
    /**
     * Your backend endpoint that accepts a multipart/form-data POST with a
     * `file` field and returns `{ mediaId: string }` (or `media_id`/`handle`).
     * When provided, an upload widget appears next to the Media Handle field.
     * Keep your Gupshup credentials server-side — never expose them here.
     */
    mediaUploadUrl?: string;
    /**
     * Optional request headers sent with the media upload POST.
     * Use for auth tokens, API keys, or any custom headers your backend requires.
     * Example: { Authorization: 'Bearer <token>' }
     */
    mediaUploadHeaders?: Record<string, string>;
}>, {
    showReset: boolean;
    disabledCategories: () => never[];
    disabledFormats: () => never[];
    mediaUploadUrl: undefined;
    mediaUploadHeaders: undefined;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    reset: () => void;
    update: (partial: any) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    message: CampaignMessage;
    showReset?: boolean;
    disabledCategories?: string[];
    disabledFormats?: string[];
    /**
     * Your backend endpoint that accepts a multipart/form-data POST with a
     * `file` field and returns `{ mediaId: string }` (or `media_id`/`handle`).
     * When provided, an upload widget appears next to the Media Handle field.
     * Keep your Gupshup credentials server-side — never expose them here.
     */
    mediaUploadUrl?: string;
    /**
     * Optional request headers sent with the media upload POST.
     * Use for auth tokens, API keys, or any custom headers your backend requires.
     * Example: { Authorization: 'Bearer <token>' }
     */
    mediaUploadHeaders?: Record<string, string>;
}>, {
    showReset: boolean;
    disabledCategories: () => never[];
    disabledFormats: () => never[];
    mediaUploadUrl: undefined;
    mediaUploadHeaders: undefined;
}>>> & Readonly<{
    onReset?: (() => any) | undefined;
    onUpdate?: ((partial: any) => any) | undefined;
}>, {
    showReset: boolean;
    disabledCategories: string[];
    disabledFormats: string[];
    mediaUploadUrl: string;
    mediaUploadHeaders: Record<string, string>;
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
//# sourceMappingURL=SectionWhatsApp.vue.d.ts.map