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
    buttons: Array<{
        type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
        text: string;
        url?: string;
        phone_number?: string;
    }>;
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
    templateType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    content: string;
    header?: string;
    footer?: string;
    buttons?: Array<{
        type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER' | 'OPT_OUT';
        title: string;
        url?: string;
        phoneNumber?: string;
    }>;
    example?: string[];
    /** For providers/accounts that accept Meta-style structure via Gupshup */
    metaTemplate: MetaWhatsAppTemplateCreatePayload;
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