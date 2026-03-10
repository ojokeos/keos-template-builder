import { Campaign, BuilderExtensionHooks, GupshupWhatsAppTemplateCreatePayload } from '@keos/notification-builder-core';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    disabledTemplateCategories?: string[];
    disabledTemplateFormats?: string[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showDuplicate?: boolean;
    /** Optional helper text shown on the left side of the action bar. */
    actionsNote?: string;
    /**
     * When true (default), builder is design-only: template content + preview.
     * Audience and send options are configured on another page.
     */
    designOnly?: boolean;
    /**
     * When true, campaign name is normalized by replacing spaces with hyphens
     * as the user types (e.g. "Spring Sale" → "Spring-Sale").
     */
    enforceSlugName?: boolean;
    /**
     * Your backend endpoint for uploading sample media files.
     * Must accept a multipart/form-data POST with a `file` field and return
     * `{ mediaId: string }`. Your backend is responsible for forwarding the
     * file to Gupshup and returning the handle — never expose Gupshup
     * credentials in the frontend.
     * Example: 'https://yourapi.example.com/whatsapp/upload-media'
     */
    mediaUploadUrl?: string;
    /**
     * Optional headers sent with the media upload request.
     * Use for bearer tokens or any other auth your backend requires.
     * Example: { Authorization: 'Bearer <token>' }
     */
    mediaUploadHeaders?: Record<string, string>;
}>, {
    disabledSections: () => never[];
    variableOptions: () => never[];
    disabledTemplateCategories: () => never[];
    disabledTemplateFormats: () => never[];
    showSave: boolean;
    showClose: boolean;
    showDuplicate: boolean;
    actionsNote: string;
    designOnly: boolean;
    enforceSlugName: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (campaign: Campaign) => void;
    "update:modelValue": (campaign: Campaign) => void;
    save: (campaign: Campaign) => void;
    edit: () => void;
    "send-test": (campaign: Campaign) => void;
    schedule: (campaign: Campaign) => void;
    send: (campaign: Campaign) => void;
    duplicate: (campaign: Campaign) => void;
    "save-gupshup-template": (payload: GupshupWhatsAppTemplateCreatePayload, warnings: string[], campaign: Campaign) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    disabledTemplateCategories?: string[];
    disabledTemplateFormats?: string[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showDuplicate?: boolean;
    /** Optional helper text shown on the left side of the action bar. */
    actionsNote?: string;
    /**
     * When true (default), builder is design-only: template content + preview.
     * Audience and send options are configured on another page.
     */
    designOnly?: boolean;
    /**
     * When true, campaign name is normalized by replacing spaces with hyphens
     * as the user types (e.g. "Spring Sale" → "Spring-Sale").
     */
    enforceSlugName?: boolean;
    /**
     * Your backend endpoint for uploading sample media files.
     * Must accept a multipart/form-data POST with a `file` field and return
     * `{ mediaId: string }`. Your backend is responsible for forwarding the
     * file to Gupshup and returning the handle — never expose Gupshup
     * credentials in the frontend.
     * Example: 'https://yourapi.example.com/whatsapp/upload-media'
     */
    mediaUploadUrl?: string;
    /**
     * Optional headers sent with the media upload request.
     * Use for bearer tokens or any other auth your backend requires.
     * Example: { Authorization: 'Bearer <token>' }
     */
    mediaUploadHeaders?: Record<string, string>;
}>, {
    disabledSections: () => never[];
    variableOptions: () => never[];
    disabledTemplateCategories: () => never[];
    disabledTemplateFormats: () => never[];
    showSave: boolean;
    showClose: boolean;
    showDuplicate: boolean;
    actionsNote: string;
    designOnly: boolean;
    enforceSlugName: boolean;
}>>> & Readonly<{
    onChange?: ((campaign: Campaign) => any) | undefined;
    "onUpdate:modelValue"?: ((campaign: Campaign) => any) | undefined;
    onSave?: ((campaign: Campaign) => any) | undefined;
    onEdit?: (() => any) | undefined;
    "onSend-test"?: ((campaign: Campaign) => any) | undefined;
    onSchedule?: ((campaign: Campaign) => any) | undefined;
    onSend?: ((campaign: Campaign) => any) | undefined;
    onDuplicate?: ((campaign: Campaign) => any) | undefined;
    "onSave-gupshup-template"?: ((payload: GupshupWhatsAppTemplateCreatePayload, warnings: string[], campaign: Campaign) => any) | undefined;
}>, {
    variableOptions: string[];
    disabledSections: string[];
    showSave: boolean;
    showClose: boolean;
    showDuplicate: boolean;
    actionsNote: string;
    designOnly: boolean;
    enforceSlugName: boolean;
    disabledTemplateCategories: string[];
    disabledTemplateFormats: string[];
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
//# sourceMappingURL=KeosWhatsAppBuilder.vue.d.ts.map