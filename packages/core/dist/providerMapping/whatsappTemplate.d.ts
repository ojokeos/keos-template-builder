import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';
type MetaTemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
type MetaHeaderFormat = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
interface MetaBodyExample {
    body_text?: string[][];
}
interface MetaHeaderExample {
    header_text?: string[];
}
type MetaTemplateComponent = {
    type: 'HEADER';
    format: MetaHeaderFormat;
    text?: string;
    example?: MetaHeaderExample;
} | {
    type: 'BODY';
    text: string;
    example?: MetaBodyExample;
} | {
    type: 'FOOTER';
    text: string;
} | {
    type: 'BUTTONS';
    buttons: MetaButton[];
};
type MetaButton = {
    type: 'QUICK_REPLY';
    text: string;
} | {
    type: 'URL';
    text: string;
    url?: string;
    example?: string[];
} | {
    type: 'PHONE_NUMBER';
    text: string;
    phone_number?: string;
} | {
    type: 'COPY_CODE';
    text: string;
    example?: string;
} | {
    type: 'OTP';
    text: string;
    otp_type?: 'COPY_CODE' | 'ONE_TAP';
    autofill_text?: string;
    package_name?: string;
    signature_hash?: string;
};
type GupshupButton = {
    type: 'QUICK_REPLY';
    title: string;
} | {
    type: 'URL';
    title: string;
    url?: string;
    example?: string[];
} | {
    type: 'PHONE_NUMBER';
    title: string;
    phoneNumber?: string;
} | {
    type: 'OPT_OUT';
    title: string;
} | {
    type: 'COPY_CODE';
    title: string;
    example?: string;
} | {
    type: 'OTP';
    title: string;
    otp_type: 'COPY_CODE' | 'ONE_TAP';
    autofill_text?: string;
    package_name?: string;
    signature_hash?: string;
};
export interface MetaWhatsAppTemplateCreatePayload {
    name: string;
    category: MetaTemplateCategory;
    language: string;
    components: MetaTemplateComponent[];
}
export interface GupshupWhatsAppTemplateCreatePayload {
    elementName: string;
    languageCode: string;
    category: MetaTemplateCategory;
    templateType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'CAROUSEL';
    /**
     * Body text. Not submitted for AUTHENTICATION templates — Meta presets the body automatically.
     */
    content?: string;
    /** Use-case label shown during Meta review (e.g. "Order Updates", "Promotions"). Required by Gupshup. */
    vertical?: string;
    /** Body text with placeholders filled with real sample values. Required for Meta approval. */
    example?: string;
    /** Media handle ID from Gupshup media upload. Required for IMAGE/VIDEO/DOCUMENT templates. */
    exampleMedia?: string;
    /**
     * JSON-encoded header metadata. Required for TEXT headers.
     * Format: `{"header":{"type":"TEXT","text":"...","example":{"header_text":["sample"]}}}`
     * Not used for media headers (IMAGE/VIDEO/DOCUMENT) — those are conveyed via `templateType`.
     */
    containerMeta?: string;
    footer?: string;
    buttons?: GupshupButton[];
    /** Include sample data in Meta review submission. */
    enableSample?: boolean;
    /** Allow Meta to change the template category during review. */
    allowTemplateCategoryChange?: boolean;
    /** Add OTP security recommendation text (AUTHENTICATION templates only). */
    addSecurityRecommendation?: boolean;
    /** OTP code expiry time in minutes (AUTHENTICATION templates only). */
    codeExpirationMinutes?: number;
    /** For providers/accounts that accept Meta-style structure via Gupshup */
    metaTemplate: MetaWhatsAppTemplateCreatePayload;
    /** Explicit Meta payload mirror for downstream integrations. */
    metaWhatsApp?: MetaWhatsAppTemplateCreatePayload;
    /** Best-effort pass-through of advanced builder data not universally standardized. */
    advanced?: Record<string, unknown>;
}
interface SerializeOptions {
    /**
     * Optional sample values used to generate BODY/HEADER examples in the same
     * index order as transformed placeholders.
     */
    exampleData?: Record<string, string>;
}
export declare function toMetaWhatsAppTemplate(campaign: Campaign, options?: SerializeOptions): ProviderMappingResult<MetaWhatsAppTemplateCreatePayload>;
export declare function toGupshupWhatsAppTemplate(campaign: Campaign, options?: SerializeOptions): ProviderMappingResult<GupshupWhatsAppTemplateCreatePayload>;
export {};
//# sourceMappingURL=whatsappTemplate.d.ts.map