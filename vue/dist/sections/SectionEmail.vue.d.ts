import { CampaignMessage } from '@keos/notification-builder-core';

export type EmailBlockType = 'heading' | 'paragraph' | 'image' | 'button' | 'divider' | 'spacer' | 'footer' | 'list' | 'quote' | 'social' | 'video' | 'link_list' | 'columns' | 'row' | 'navbar' | 'accordion' | 'carousel' | 'countdown' | 'product_card' | 'liquid' | 'code_block' | 'rss_feed' | 'dynamic_image';
export interface EmailBlockBase {
    id: string;
    type: EmailBlockType;
}
export interface EmailBlockHeading extends EmailBlockBase {
    type: 'heading';
    level: 1 | 2 | 3;
    content: string;
}
export interface EmailBlockParagraph extends EmailBlockBase {
    type: 'paragraph';
    content: string;
}
export interface EmailBlockImage extends EmailBlockBase {
    type: 'image';
    src: string;
    alt?: string;
    linkUrl?: string;
}
export interface EmailBlockButton extends EmailBlockBase {
    type: 'button';
    text: string;
    url: string;
    borderRadius?: number;
    fullWidth?: boolean;
    ghost?: boolean;
}
export interface EmailBlockDivider extends EmailBlockBase {
    type: 'divider';
    thickness?: number;
    color?: string;
    lineStyle?: 'solid' | 'dashed' | 'dotted';
}
export interface EmailBlockSpacer extends EmailBlockBase {
    type: 'spacer';
    height: number;
}
export interface EmailBlockFooter extends EmailBlockBase {
    type: 'footer';
    content: string;
    unsubscribeUrl?: string;
    companyAddress?: string;
}
export interface EmailBlockList extends EmailBlockBase {
    type: 'list';
    style: 'bullet' | 'numbered';
    items: string[];
}
export interface EmailBlockQuote extends EmailBlockBase {
    type: 'quote';
    content: string;
    style?: 'default' | 'info' | 'success' | 'warning';
}
export interface EmailSocialLink {
    platform: string;
    url: string;
}
export interface EmailBlockSocial extends EmailBlockBase {
    type: 'social';
    links: EmailSocialLink[];
}
export interface EmailBlockVideo extends EmailBlockBase {
    type: 'video';
    thumbnailUrl: string;
    videoUrl: string;
    caption?: string;
}
export interface EmailLinkItem {
    text: string;
    url: string;
}
export interface EmailBlockLinkList extends EmailBlockBase {
    type: 'link_list';
    links: EmailLinkItem[];
    separator?: string;
}
export interface EmailBlockColumns extends EmailBlockBase {
    type: 'columns';
    leftContent: string;
    rightContent: string;
}
export interface EmailBlockRow extends EmailBlockBase {
    type: 'row';
    columnCount: 1 | 2 | 3 | 4;
    cells: string[];
}
export interface EmailBlockNavbar extends EmailBlockBase {
    type: 'navbar';
    links: EmailLinkItem[];
    separator?: string;
}
export interface EmailBlockAccordionItem {
    title: string;
    content: string;
}
export interface EmailBlockAccordion extends EmailBlockBase {
    type: 'accordion';
    items: EmailBlockAccordionItem[];
}
export interface EmailBlockCarouselSlide {
    imageUrl: string;
    linkUrl?: string;
    alt?: string;
}
export interface EmailBlockCarousel extends EmailBlockBase {
    type: 'carousel';
    slides: EmailBlockCarouselSlide[];
}
export interface EmailBlockCountdown extends EmailBlockBase {
    type: 'countdown';
    endDateTime: string;
    label?: string;
}
export interface EmailBlockProductCard extends EmailBlockBase {
    type: 'product_card';
    imageUrl: string;
    title: string;
    price: string;
    buttonText: string;
    buttonUrl: string;
}
export interface EmailBlockLiquid extends EmailBlockBase {
    type: 'liquid';
    content: string;
}
export interface EmailBlockCodeBlock extends EmailBlockBase {
    type: 'code_block';
    content: string;
    caption?: string;
}
export interface EmailBlockRssFeed extends EmailBlockBase {
    type: 'rss_feed';
    feedUrl: string;
    maxItems?: number;
}
export interface EmailBlockDynamicImage extends EmailBlockBase {
    type: 'dynamic_image';
    imageUrl: string;
    alt?: string;
    fallbackUrl?: string;
}
export type EmailBlock = EmailBlockHeading | EmailBlockParagraph | EmailBlockImage | EmailBlockButton | EmailBlockDivider | EmailBlockSpacer | EmailBlockFooter | EmailBlockList | EmailBlockQuote | EmailBlockSocial | EmailBlockVideo | EmailBlockLinkList | EmailBlockColumns | EmailBlockRow | EmailBlockNavbar | EmailBlockAccordion | EmailBlockCarousel | EmailBlockCountdown | EmailBlockProductCard | EmailBlockLiquid | EmailBlockCodeBlock | EmailBlockRssFeed | EmailBlockDynamicImage;
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    message: CampaignMessage;
    variableOptions?: string[];
    showReset?: boolean;
}>, {
    showReset: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    reset: () => void;
    update: (partial: Partial<CampaignMessage> & Record<string, unknown>) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    message: CampaignMessage;
    variableOptions?: string[];
    showReset?: boolean;
}>, {
    showReset: boolean;
}>>> & Readonly<{
    onReset?: (() => any) | undefined;
    onUpdate?: ((partial: Partial<CampaignMessage> & Record<string, unknown>) => any) | undefined;
}>, {
    showReset: boolean;
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
//# sourceMappingURL=SectionEmail.vue.d.ts.map