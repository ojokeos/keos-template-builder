<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CampaignMessage } from '@keos/notification-builder-core';
import {
  subjectLengthBucket as subjectLengthBucketFn,
  preheaderLengthBucket as preheaderLengthBucketFn,
  getSpammyWords as getSpammyWordsFn,
  getSubjectAnalyzerLabel,
  getPreviewAnalyzerLabel,
} from '../utils/emailAnalyzer';

export type EmailBlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'divider'
  | 'spacer'
  | 'footer'
  | 'list'
  | 'quote'
  | 'social'
  | 'video'
  | 'link_list'
  | 'columns'
  | 'row'
  | 'navbar'
  | 'accordion'
  | 'carousel'
  | 'countdown'
  | 'product_card'
  | 'liquid'
  | 'code_block'
  | 'rss_feed'
  | 'dynamic_image';

export type BlockAlignment = 'left' | 'center' | 'right';

export interface EmailBlockBase {
  id: string;
  type: EmailBlockType;
  /** Optional alignment for block content (left, center, right). */
  alignment?: BlockAlignment;
  /** Optional full-width layout (e.g. button, image). */
  fullWidth?: boolean;
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

export type EmailBlock =
  | EmailBlockHeading
  | EmailBlockParagraph
  | EmailBlockImage
  | EmailBlockButton
  | EmailBlockDivider
  | EmailBlockSpacer
  | EmailBlockFooter
  | EmailBlockList
  | EmailBlockQuote
  | EmailBlockSocial
  | EmailBlockVideo
  | EmailBlockLinkList
  | EmailBlockColumns
  | EmailBlockRow
  | EmailBlockNavbar
  | EmailBlockAccordion
  | EmailBlockCarousel
  | EmailBlockCountdown
  | EmailBlockProductCard
  | EmailBlockLiquid
  | EmailBlockCodeBlock
  | EmailBlockRssFeed
  | EmailBlockDynamicImage;

function blockId() {
  return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

const DEFAULT_SOCIAL_LINKS: EmailSocialLink[] = [
  { platform: 'facebook', url: '' },
  { platform: 'twitter', url: '' },
  { platform: 'instagram', url: '' },
  { platform: 'linkedin', url: '' },
];

/** Block types that show Alignment and Full width layout options. */
const blockLayoutTypes: EmailBlockType[] = [
  'heading', 'paragraph', 'image', 'button', 'divider', 'spacer',
  'footer', 'quote', 'list', 'social', 'video', 'link_list',
];

function createBlock(type: EmailBlockType): EmailBlock {
  switch (type) {
    case 'heading':
      return { id: blockId(), type: 'heading', level: 1, content: 'Heading', alignment: 'left', fullWidth: false };
    case 'paragraph':
      return { id: blockId(), type: 'paragraph', content: 'Your text here. Use {{ .first_name }} for personalization.', alignment: 'left', fullWidth: false };
    case 'image':
      return { id: blockId(), type: 'image', src: '', alt: '', linkUrl: '', alignment: 'left', fullWidth: false };
    case 'button':
      return { id: blockId(), type: 'button', text: 'Click here', url: 'https://', borderRadius: 8, fullWidth: false, ghost: false, alignment: 'left' };
    case 'divider':
      return { id: blockId(), type: 'divider', thickness: 1, color: '#e2e8f0', lineStyle: 'solid', alignment: 'left', fullWidth: false };
    case 'spacer':
      return { id: blockId(), type: 'spacer', height: 24 };
    case 'footer':
      return {
        id: blockId(),
        type: 'footer',
        content: 'You received this email because you signed up at our site.',
        unsubscribeUrl: '',
        companyAddress: '',
        alignment: 'left',
        fullWidth: false,
      };
    case 'list':
      return { id: blockId(), type: 'list', style: 'bullet', items: ['First item', 'Second item', 'Third item'], alignment: 'left', fullWidth: false };
    case 'quote':
      return { id: blockId(), type: 'quote', content: 'Highlight a key message or testimonial here.', style: 'default', alignment: 'left', fullWidth: false };
    case 'social':
      return { id: blockId(), type: 'social', links: DEFAULT_SOCIAL_LINKS.map((l) => ({ ...l })), alignment: 'center', fullWidth: false };
    case 'video':
      return { id: blockId(), type: 'video', thumbnailUrl: '', videoUrl: 'https://', caption: '', alignment: 'left', fullWidth: false };
    case 'link_list':
      return {
        id: blockId(),
        type: 'link_list',
        links: [
          { text: 'Unsubscribe', url: '' },
          { text: 'Preferences', url: '' },
          { text: 'View in browser', url: '' },
        ],
        separator: ' | ',
        alignment: 'center',
        fullWidth: false,
      };
    case 'columns':
      return {
        id: blockId(),
        type: 'columns',
        leftContent: 'Left column text or {{ .variable }}.',
        rightContent: 'Right column text.',
      };
    case 'row':
      return {
        id: blockId(),
        type: 'row',
        columnCount: 2,
        cells: ['Left column content.', 'Right column content.'],
      };
    case 'navbar':
      return {
        id: blockId(),
        type: 'navbar',
        links: [
          { text: 'View in browser', url: '' },
          { text: 'Unsubscribe', url: '' },
        ],
        separator: ' | ',
      };
    case 'accordion':
      return {
        id: blockId(),
        type: 'accordion',
        items: [
          { title: 'Section 1', content: 'Expandable content for section 1.' },
          { title: 'Section 2', content: 'Expandable content for section 2.' },
        ],
      };
    case 'carousel':
      return {
        id: blockId(),
        type: 'carousel',
        slides: [
          { imageUrl: '', linkUrl: '', alt: 'Slide 1' },
          { imageUrl: '', linkUrl: '', alt: 'Slide 2' },
        ],
      };
    case 'countdown':
      return {
        id: blockId(),
        type: 'countdown',
        endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        label: 'Offer ends in',
      };
    case 'product_card':
      return {
        id: blockId(),
        type: 'product_card',
        imageUrl: '',
        title: 'Product name',
        price: '€0.00',
        buttonText: 'Buy now',
        buttonUrl: 'https://',
      };
    case 'liquid':
      return {
        id: blockId(),
        type: 'liquid',
        content: '{% if user.last_purchase %}\n  <!-- conditional content -->\n{% endif %}',
      };
    case 'code_block':
      return {
        id: blockId(),
        type: 'code_block',
        content: '// Code or snippet to display\nconst example = {{ .order_id }};',
        caption: '',
      };
    case 'rss_feed':
      return {
        id: blockId(),
        type: 'rss_feed',
        feedUrl: 'https://',
        maxItems: 5,
      };
    case 'dynamic_image':
      return {
        id: blockId(),
        type: 'dynamic_image',
        imageUrl: 'https://example.com/map/{{ .store_id }}.png',
        alt: 'Dynamic image',
        fallbackUrl: '',
      };
    default:
      return { id: blockId(), type: 'paragraph', content: '' };
  }
}

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    variableOptions?: string[];
    showReset?: boolean;
  }>(),
  { showReset: false }
);

const emit = defineEmits<{
  update: [partial: Partial<CampaignMessage> & Record<string, unknown>];
  reset: [];
}>();

const defaultVariables = ['first_name', 'last_name', 'order_id', 'city', 'email'];
const localVariables = ref<string[]>(
  props.variableOptions?.length ? [...props.variableOptions] : defaultVariables
);
const selectedVariable = ref<string>(localVariables.value[0] ?? 'first_name');
const newVariable = ref('');

watch(
  () => props.variableOptions,
  (next) => {
    if (next?.length) {
      localVariables.value = [...next];
      if (!localVariables.value.includes(selectedVariable.value)) {
        selectedVariable.value = localVariables.value[0];
      }
    }
  }
);

const subject = computed(() => ((props.message as any).subject ?? '') as string);
const previewText = computed(() => ((props.message as any).preview_text ?? '') as string);

const subjectBucket = computed(() => subjectLengthBucketFn(subject.value));
const previewBucket = computed(() => preheaderLengthBucketFn(previewText.value));
const subjectSpammy = computed(() => getSpammyWordsFn(subject.value));
const previewSpammy = computed(() => getSpammyWordsFn(previewText.value));
const blocks = computed(() => {
  const raw = (props.message as any).blocks;
  if (Array.isArray(raw) && raw.length > 0) return raw as EmailBlock[];
  return [createBlock('paragraph')] as EmailBlock[];
});

watch(
  () => (props.message as any).blocks,
  (raw) => {
    if (!Array.isArray(raw) || raw.length === 0) {
      emit('update', { blocks: [createBlock('paragraph')] } as any);
    }
  },
  { immediate: true }
);

function updateBlocks(next: EmailBlock[]) {
  emit('update', { blocks: next } as any);
}

function updateSubject(e: Event) {
  emit('update', { subject: (e.target as HTMLInputElement).value } as any);
}

function updatePreviewText(e: Event) {
  const v = (e.target as HTMLInputElement).value;
  emit('update', { preview_text: v || undefined } as any);
}

function updateFromName(e: Event) {
  emit('update', { from_name: (e.target as HTMLInputElement).value || undefined } as any);
}

function updateFromAddress(e: Event) {
  emit('update', { from_address: (e.target as HTMLInputElement).value || undefined } as any);
}

function updateReplyTo(e: Event) {
  emit('update', { reply_to: (e.target as HTMLInputElement).value || undefined } as any);
}

const LIBRARY_PRESETS: { id: string; label: string; blocks: () => EmailBlock[] }[] = [
  {
    id: 'hero',
    label: 'Hero',
    blocks: () => [createBlock('heading'), createBlock('paragraph'), createBlock('button')],
  },
  {
    id: 'row',
    label: 'Row (1–4 col)',
    blocks: () => [createBlock('row')],
  },
  {
    id: 'two_column',
    label: '2-column',
    blocks: () => [createBlock('columns')],
  },
  {
    id: 'menu_navbar',
    label: 'Menu / Navbar',
    blocks: () => [createBlock('navbar')],
  },
  {
    id: 'social_footer',
    label: 'Social footer',
    blocks: () => [createBlock('social'), createBlock('divider')],
  },
  {
    id: 'legal_footer',
    label: 'Legal footer (Unsubscribe, Address, View in browser)',
    blocks: () => [createBlock('footer'), createBlock('link_list')],
  },
];

function insertFromLibrary(preset: typeof LIBRARY_PRESETS[0]) {
  const toAdd = preset.blocks();
  updateBlocks([...blocks.value, ...toAdd]);
}

function addBlock(type: EmailBlockType) {
  const next = [...blocks.value, createBlock(type)];
  updateBlocks(next);
}

function removeBlock(id: string) {
  updateBlocks(blocks.value.filter((b) => b.id !== id));
}

function moveBlock(id: string, dir: 'up' | 'down') {
  const i = blocks.value.findIndex((b) => b.id === id);
  if (i < 0) return;
  const j = dir === 'up' ? i - 1 : i + 1;
  if (j < 0 || j >= blocks.value.length) return;
  const arr = [...blocks.value];
  [arr[i], arr[j]] = [arr[j], arr[i]];
  updateBlocks(arr);
}

function updateBlock(id: string, patch: Partial<EmailBlock>) {
  const next = blocks.value.map((b) => (b.id === id ? { ...b, ...patch } : b)) as EmailBlock[];
  updateBlocks(next);
}

function updateListBlockItem(blockId: string, index: number, value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockList | undefined;
  if (!block || block.type !== 'list') return;
  const items = [...(block.items || [])];
  items[index] = value;
  updateBlock(blockId, { items });
}

function addListBlockItem(blockId: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockList | undefined;
  if (!block || block.type !== 'list') return;
  updateBlock(blockId, { items: [...(block.items || []), 'New item'] });
}

function removeListBlockItem(blockId: string, index: number) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockList | undefined;
  if (!block || block.type !== 'list') return;
  const items = (block.items || []).filter((_, i) => i !== index);
  updateBlock(blockId, { items });
}

function updateSocialLink(blockId: string, index: number, key: 'platform' | 'url', value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockSocial | undefined;
  if (!block || block.type !== 'social') return;
  const links = (block.links || []).map((l, i) => (i === index ? { ...l, [key]: value } : l));
  updateBlock(blockId, { links });
}

function addSocialLink(blockId: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockSocial | undefined;
  if (!block || block.type !== 'social') return;
  updateBlock(blockId, { links: [...(block.links || []), { platform: 'custom', url: '' }] });
}

function removeSocialLink(blockId: string, index: number) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockSocial | undefined;
  if (!block || block.type !== 'social') return;
  const links = (block.links || []).filter((_, i) => i !== index);
  updateBlock(blockId, { links });
}

function updateLinkListItem(blockId: string, index: number, key: 'text' | 'url', value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockLinkList | undefined;
  if (!block || block.type !== 'link_list') return;
  const links = (block.links || []).map((l, i) => (i === index ? { ...l, [key]: value } : l));
  updateBlock(blockId, { links });
}

function addLinkListItem(blockId: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockLinkList | undefined;
  if (!block || block.type !== 'link_list') return;
  updateBlock(blockId, { links: [...(block.links || []), { text: '', url: '' }] });
}

function removeLinkListItem(blockId: string, index: number) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockLinkList | undefined;
  if (!block || block.type !== 'link_list') return;
  const links = (block.links || []).filter((_, i) => i !== index);
  updateBlock(blockId, { links });
}

function updateRowBlock(blockId: string, patch: Partial<EmailBlockRow>) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockRow | undefined;
  if (!block || block.type !== 'row') return;
  if (patch.columnCount !== undefined && patch.columnCount !== block.columnCount) {
    const cells = [...(block.cells || [])];
    while (cells.length < patch.columnCount) cells.push('Cell content');
    patch.cells = cells.slice(0, patch.columnCount);
  }
  updateBlock(blockId, patch);
}

function updateRowCell(blockId: string, index: number, value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockRow | undefined;
  if (!block || block.type !== 'row') return;
  const cells = [...(block.cells || [])];
  cells[index] = value;
  updateBlock(blockId, { cells });
}

function updateNavbarLink(blockId: string, index: number, key: 'text' | 'url', value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockNavbar | undefined;
  if (!block || block.type !== 'navbar') return;
  const links = (block.links || []).map((l, i) => (i === index ? { ...l, [key]: value } : l));
  updateBlock(blockId, { links });
}

function addNavbarLink(blockId: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockNavbar | undefined;
  if (!block || block.type !== 'navbar') return;
  updateBlock(blockId, { links: [...(block.links || []), { text: '', url: '' }] });
}

function removeNavbarLink(blockId: string, index: number) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockNavbar | undefined;
  if (!block || block.type !== 'navbar') return;
  updateBlock(blockId, { links: (block.links || []).filter((_, i) => i !== index) });
}

function updateAccordionItem(blockId: string, index: number, key: 'title' | 'content', value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockAccordion | undefined;
  if (!block || block.type !== 'accordion') return;
  const items = (block.items || []).map((item, i) => (i === index ? { ...item, [key]: value } : item));
  updateBlock(blockId, { items });
}

function addAccordionItem(blockId: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockAccordion | undefined;
  if (!block || block.type !== 'accordion') return;
  updateBlock(blockId, { items: [...(block.items || []), { title: 'New section', content: '' }] });
}

function removeAccordionItem(blockId: string, index: number) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockAccordion | undefined;
  if (!block || block.type !== 'accordion') return;
  updateBlock(blockId, { items: (block.items || []).filter((_, i) => i !== index) });
}

function updateCarouselSlide(blockId: string, index: number, key: keyof EmailBlockCarouselSlide, value: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockCarousel | undefined;
  if (!block || block.type !== 'carousel') return;
  const slides = (block.slides || []).map((s, i) => (i === index ? { ...s, [key]: value } : s));
  updateBlock(blockId, { slides });
}

function addCarouselSlide(blockId: string) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockCarousel | undefined;
  if (!block || block.type !== 'carousel') return;
  updateBlock(blockId, { slides: [...(block.slides || []), { imageUrl: '', linkUrl: '', alt: '' }] });
}

function removeCarouselSlide(blockId: string, index: number) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockCarousel | undefined;
  if (!block || block.type !== 'carousel') return;
  updateBlock(blockId, { slides: (block.slides || []).filter((_, i) => i !== index) });
}

function insertVariableInto(field: 'subject' | 'preview', variable = selectedVariable.value) {
  const token = ` {{ .${variable} }}`;
  const existingVars = ((props.message as any).variables ?? []) as string[];
  const nextVars = Array.from(new Set([...existingVars, variable]));

  if (field === 'subject') {
    emit('update', {
      subject: (subject.value || '') + token,
      variables: nextVars,
    } as any);
  } else {
    emit('update', {
      preview_text: (previewText.value || '') + token,
      variables: nextVars,
    } as any);
  }
}

function insertVariableIntoBlock(blockId: string, variable = selectedVariable.value) {
  const block = blocks.value.find((b) => b.id === blockId);
  if (!block || (block.type !== 'paragraph' && block.type !== 'heading' && block.type !== 'footer' && block.type !== 'quote' && block.type !== 'liquid' && block.type !== 'code_block')) return;
  const token = ` {{ .${variable} }}`;
  const existingVars = ((props.message as any).variables ?? []) as string[];
  const nextVars = Array.from(new Set([...existingVars, variable]));
  const contentKey = block.type === 'footer' ? 'content' : 'content';
  const current = (block as any)[contentKey] ?? '';
  const next = current + token;
  const nextBlocks = blocks.value.map((b) =>
    b.id === blockId ? { ...b, [contentKey]: next } : b
  ) as EmailBlock[];
  emit('update', { blocks: nextBlocks, variables: nextVars } as any);
}

function insertVariableIntoRow(blockId: string, cellIndex: number, variable = selectedVariable.value) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockRow | undefined;
  if (!block || block.type !== 'row') return;
  const token = ` {{ .${variable} }}`;
  const existingVars = ((props.message as any).variables ?? []) as string[];
  const nextVars = Array.from(new Set([...existingVars, variable]));
  const cells = [...(block.cells || [])];
  cells[cellIndex] = (cells[cellIndex] || '') + token;
  updateBlock(blockId, { cells });
  emit('update', { variables: nextVars } as any);
}

function insertVariableIntoColumns(blockId: string, column: 'left' | 'right', variable = selectedVariable.value) {
  const block = blocks.value.find((b) => b.id === blockId) as EmailBlockColumns | undefined;
  if (!block || block.type !== 'columns') return;
  const token = ` {{ .${variable} }}`;
  const existingVars = ((props.message as any).variables ?? []) as string[];
  const nextVars = Array.from(new Set([...existingVars, variable]));
  const key = column === 'left' ? 'leftContent' : 'rightContent';
  const current = (block as any)[key] ?? '';
  const next = current + token;
  updateBlock(blockId, { [key]: next });
  emit('update', { variables: nextVars } as any);
}

const activeVarTarget = ref<string | null>(null);
const activeEmojiTarget = ref<string | null>(null);
const BLOCK_EMOJIS = [
  '😀', '😃', '😄', '😁', '😂', '🤣', '😊', '😍', '🤩', '😉', '🙌', '👏',
  '👍', '👎', '🙏', '🔥', '✨', '⭐', '💯', '✅', '⚠️', '❌', '⚡', '💡',
  '🎉', '🎁', '🏷️', '💸', '💳', '📦', '🛍️', '🚚', '📣', '📢', '📈', '📉',
  '🆕', '⏰', '🕒', '⌛', '📅', '📌', '🔒', '🔓', '🛡️', '🧾', '📎', '✉️',
  '📧', '📱', '💬', '📝', '🔗', '📍', '🌐', '❤️', '💙', '💚', '🧡', '💜',
  '🙂', '🤔', '😎', '😇', '🤝', '🚀',
];
function toggleVarPicker(target: string) {
  activeVarTarget.value = activeVarTarget.value === target ? null : target;
}
function applyVarChoice(target: string, variable: string) {
  if (!variable) return;
  if (target === 'subject') insertVariableInto('subject', variable);
  else if (target === 'preview') insertVariableInto('preview', variable);
  else if (target.startsWith('block:')) insertVariableIntoBlock(target.slice(6), variable);
  else if (target.startsWith('col-left:')) insertVariableIntoColumns(target.slice(9), 'left', variable);
  else if (target.startsWith('col-right:')) insertVariableIntoColumns(target.slice(10), 'right', variable);
  else if (target.startsWith('row:')) {
    const [, id, index] = target.split(':');
    insertVariableIntoRow(id, Number(index), variable);
  }
  activeVarTarget.value = null;
}

function toggleEmojiPicker(target: string) {
  activeEmojiTarget.value = activeEmojiTarget.value === target ? null : target;
}

function appendEmoji(value: unknown, emoji: string): string {
  return `${String(value ?? '')}${emoji}`;
}

function applyEmojiToBlock(blockId: string, emoji: string) {
  if (!emoji) return;
  const block = blocks.value.find((b) => b.id === blockId) as any;
  if (!block) return;

  switch (block.type) {
    case 'heading':
    case 'paragraph':
    case 'footer':
    case 'quote':
    case 'liquid':
    case 'code_block':
      updateBlock(blockId, { content: `${String(block.content ?? '')}${emoji}` });
      break;
    case 'button':
      updateBlock(blockId, { text: `${String(block.text ?? '')}${emoji}` });
      break;
    case 'image':
      updateBlock(blockId, { alt: `${String(block.alt ?? '')}${emoji}` });
      break;
    case 'video':
      updateBlock(blockId, { caption: `${String(block.caption ?? '')}${emoji}` });
      break;
    case 'columns':
      updateBlock(blockId, { leftContent: `${String(block.leftContent ?? '')}${emoji}` });
      break;
    case 'row': {
      const cells = (Array.isArray(block.cells) ? [...block.cells] : []).map((c) => String(c ?? ''));
      if (cells.length === 0) cells.push('');
      cells[0] = `${String(cells[0] ?? '')}${emoji}`;
      updateBlock(blockId, { cells });
      break;
    }
    case 'navbar':
    case 'link_list': {
      const links = Array.isArray(block.links) ? [...block.links] : [];
      if (!links.length) links.push({ text: '', url: '' });
      links[0] = { ...links[0], text: `${String(links[0]?.text ?? '')}${emoji}` };
      updateBlock(blockId, { links });
      break;
    }
    case 'accordion': {
      const items = Array.isArray(block.items) ? [...block.items] : [];
      if (!items.length) items.push({ title: '', content: '' });
      items[0] = { ...items[0], title: `${String(items[0]?.title ?? '')}${emoji}` };
      updateBlock(blockId, { items });
      break;
    }
    case 'countdown':
      updateBlock(blockId, { label: `${String(block.label ?? '')}${emoji}` });
      break;
    case 'product_card':
      updateBlock(blockId, { title: `${String(block.title ?? '')}${emoji}` });
      break;
    case 'dynamic_image':
      updateBlock(blockId, { alt: `${String(block.alt ?? '')}${emoji}` });
      break;
    default:
      break;
  }
  activeEmojiTarget.value = null;
}

function applyEmojiChoice(target: string, emoji: string) {
  if (!emoji) return;
  if (target === 'subject') {
    emit('update', { subject: appendEmoji(subject.value, emoji) } as any);
  } else if (target === 'preview') {
    emit('update', { preview_text: appendEmoji(previewText.value, emoji) } as any);
  } else if (target === 'from-name') {
    emit('update', { from_name: appendEmoji((props.message as any).from_name, emoji) } as any);
  } else if (target.startsWith('block:')) {
    applyEmojiToBlock(target.slice(6), emoji);
    return;
  } else if (target.startsWith('col-left:')) {
    const id = target.slice(9);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockColumns | undefined;
    if (block?.type === 'columns') updateBlock(id, { leftContent: appendEmoji(block.leftContent, emoji) });
  } else if (target.startsWith('col-right:')) {
    const id = target.slice(10);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockColumns | undefined;
    if (block?.type === 'columns') updateBlock(id, { rightContent: appendEmoji(block.rightContent, emoji) });
  } else if (target.startsWith('row:')) {
    const [, id, indexRaw] = target.split(':');
    const index = Number(indexRaw);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockRow | undefined;
    if (block?.type === 'row' && Number.isFinite(index)) {
      const cells = [...(block.cells || [])].map((v) => String(v ?? ''));
      cells[index] = appendEmoji(cells[index], emoji);
      updateBlock(id, { cells });
    }
  } else if (target.startsWith('button-text:')) {
    const id = target.slice(12);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockButton | undefined;
    if (block?.type === 'button') updateBlock(id, { text: appendEmoji(block.text, emoji) });
  } else if (target.startsWith('image-alt:')) {
    const id = target.slice(10);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockImage | undefined;
    if (block?.type === 'image') updateBlock(id, { alt: appendEmoji(block.alt, emoji) });
  } else if (target.startsWith('video-caption:')) {
    const id = target.slice(14);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockVideo | undefined;
    if (block?.type === 'video') updateBlock(id, { caption: appendEmoji(block.caption, emoji) });
  } else if (target.startsWith('dynamic-alt:')) {
    const id = target.slice(12);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockDynamicImage | undefined;
    if (block?.type === 'dynamic_image') updateBlock(id, { alt: appendEmoji(block.alt, emoji) });
  } else if (target.startsWith('countdown-label:')) {
    const id = target.slice(16);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockCountdown | undefined;
    if (block?.type === 'countdown') updateBlock(id, { label: appendEmoji(block.label, emoji) });
  } else if (target.startsWith('product-title:')) {
    const id = target.slice(14);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockProductCard | undefined;
    if (block?.type === 'product_card') updateBlock(id, { title: appendEmoji(block.title, emoji) });
  } else if (target.startsWith('product-price:')) {
    const id = target.slice(14);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockProductCard | undefined;
    if (block?.type === 'product_card') updateBlock(id, { price: appendEmoji(block.price, emoji) });
  } else if (target.startsWith('product-button:')) {
    const id = target.slice(15);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockProductCard | undefined;
    if (block?.type === 'product_card') updateBlock(id, { buttonText: appendEmoji(block.buttonText, emoji) });
  } else if (target.startsWith('footer-address:')) {
    const id = target.slice(15);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockFooter | undefined;
    if (block?.type === 'footer') updateBlock(id, { companyAddress: appendEmoji(block.companyAddress, emoji) });
  } else if (target.startsWith('code-caption:')) {
    const id = target.slice(13);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockCodeBlock | undefined;
    if (block?.type === 'code_block') updateBlock(id, { caption: appendEmoji(block.caption, emoji) });
  } else if (target.startsWith('list-item:')) {
    const [, id, indexRaw] = target.split(':');
    const index = Number(indexRaw);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockList | undefined;
    if (block?.type === 'list' && Number.isFinite(index)) {
      updateListBlockItem(id, index, appendEmoji(block.items?.[index], emoji));
    }
  } else if (target.startsWith('link-list-item:')) {
    const [, id, indexRaw] = target.split(':');
    const index = Number(indexRaw);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockLinkList | undefined;
    if (block?.type === 'link_list' && Number.isFinite(index)) {
      updateLinkListItem(id, index, 'text', appendEmoji(block.links?.[index]?.text, emoji));
    }
  } else if (target.startsWith('navbar-item:')) {
    const [, id, indexRaw] = target.split(':');
    const index = Number(indexRaw);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockNavbar | undefined;
    if (block?.type === 'navbar' && Number.isFinite(index)) {
      updateNavbarLink(id, index, 'text', appendEmoji(block.links?.[index]?.text, emoji));
    }
  } else if (target.startsWith('accordion-title:')) {
    const [, id, indexRaw] = target.split(':');
    const index = Number(indexRaw);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockAccordion | undefined;
    if (block?.type === 'accordion' && Number.isFinite(index)) {
      updateAccordionItem(id, index, 'title', appendEmoji(block.items?.[index]?.title, emoji));
    }
  } else if (target.startsWith('accordion-content:')) {
    const [, id, indexRaw] = target.split(':');
    const index = Number(indexRaw);
    const block = blocks.value.find((b) => b.id === id) as EmailBlockAccordion | undefined;
    if (block?.type === 'accordion' && Number.isFinite(index)) {
      updateAccordionItem(id, index, 'content', appendEmoji(block.items?.[index]?.content, emoji));
    }
  }
  activeEmojiTarget.value = null;
}

function addVariable() {
  const name = newVariable.value.trim();
  if (!name || localVariables.value.includes(name)) return;
  localVariables.value = [...localVariables.value, name];
  selectedVariable.value = name;
  newVariable.value = '';
}

const varChipLabel = '{{ .var }}';
</script>

<template>
  <section class="em-section">
    <div class="em-strip kb-section">
      <div class="em-strip-head">
        <h4 class="em-strip-title">Sender & envelope</h4>
        <button
          v-if="showReset"
          type="button"
          class="em-section-reset"
          @click="$emit('reset')"
        >
          Reset section
        </button>
      </div>
      <p class="em-strip-desc">Who the email is from and how it appears in the inbox.</p>
      <div class="em-field kb-field">
        <label class="em-label">From name</label>
        <div class="em-input-group">
          <input
            type="text"
            class="em-input em-input--flex"
            placeholder="e.g. Your Brand"
            :value="(message as any).from_name ?? ''"
            @input="updateFromName"
          />
          <div class="em-var-picker-wrap">
            <button type="button" class="em-chip" @click="toggleEmojiPicker('from-name')" title="Insert emoji">😊</button>
            <div v-if="activeEmojiTarget === 'from-name'" class="em-emoji-menu" role="menu">
              <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-from-name-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice('from-name', emoji)">{{ emoji }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="em-field kb-field">
        <label class="em-label">From address</label>
        <input
          type="email"
          class="em-input"
          placeholder="notifications@yourdomain.com"
          :value="(message as any).from_address ?? ''"
          @input="updateFromAddress"
        />
      </div>
      <div class="em-field kb-field">
        <label class="em-label">Reply-to <span class="em-optional">optional</span></label>
        <input
          type="email"
          class="em-input"
          placeholder="support@yourdomain.com"
          :value="(message as any).reply_to ?? ''"
          @input="updateReplyTo"
        />
      </div>
      <div class="em-field kb-field">
        <label class="em-label">Subject line</label>
        <div class="em-input-group">
            <input
              type="text"
              class="em-input em-input--flex"
              placeholder="e.g. Your order {{ .order_id }} has shipped"
              :value="subject"
              @input="updateSubject"
            />
          <div class="em-var-picker-wrap">
            <button type="button" class="em-chip" @click="toggleVarPicker('subject')" title="Insert variable">
              {{ varChipLabel }}
            </button>
            <button type="button" class="em-chip" @click="toggleEmojiPicker('subject')" title="Insert emoji">😊</button>
            <div v-if="activeVarTarget === 'subject'" class="em-var-menu" role="menu">
              <button
                v-for="v in localVariables"
                :key="`subject-var-${v}`"
                type="button"
                class="em-var-menu-item"
                @click="applyVarChoice('subject', v)"
              >
                {{ v }}
              </button>
            </div>
            <div v-if="activeEmojiTarget === 'subject'" class="em-emoji-menu" role="menu">
              <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-subject-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice('subject', emoji)">{{ emoji }}</button>
            </div>
          </div>
        </div>
        <span class="em-analyzer" :class="`em-analyzer--${subjectBucket}`">{{ getSubjectAnalyzerLabel(subjectBucket) }}</span>
        <span v-if="subjectSpammy.length" class="em-analyzer em-analyzer--spam">Spammy: {{ subjectSpammy.join(', ') }}</span>
      </div>
      <div class="em-field kb-field">
        <label class="em-label">Preview text <span class="em-optional">preheader</span></label>
        <div class="em-input-group">
          <input
            type="text"
            class="em-input em-input--flex"
            placeholder="Shown next to subject in inbox"
            :value="previewText"
            @input="updatePreviewText"
          />
          <div class="em-var-picker-wrap">
            <button type="button" class="em-chip" @click="toggleVarPicker('preview')" title="Insert variable">
              {{ varChipLabel }}
            </button>
            <button type="button" class="em-chip" @click="toggleEmojiPicker('preview')" title="Insert emoji">😊</button>
            <div v-if="activeVarTarget === 'preview'" class="em-var-menu" role="menu">
              <button
                v-for="v in localVariables"
                :key="`preview-var-${v}`"
                type="button"
                class="em-var-menu-item"
                @click="applyVarChoice('preview', v)"
              >
                {{ v }}
              </button>
            </div>
            <div v-if="activeEmojiTarget === 'preview'" class="em-emoji-menu" role="menu">
              <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-preview-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice('preview', emoji)">{{ emoji }}</button>
            </div>
          </div>
        </div>
        <span class="em-hint">~130 characters for best display.</span>
        <span class="em-analyzer" :class="`em-analyzer--${previewBucket}`">{{ getPreviewAnalyzerLabel(previewBucket) }}</span>
        <span v-if="previewSpammy.length" class="em-analyzer em-analyzer--spam">Spammy: {{ previewSpammy.join(', ') }}</span>
      </div>
    </div>

    <div class="em-strip kb-section em-strip--library">
      <h4 class="em-strip-title">Block library</h4>
      <p class="em-strip-desc">Insert reusable blocks.</p>
      <div class="em-library-chips">
        <button
          v-for="preset in LIBRARY_PRESETS"
          :key="preset.id"
          type="button"
          class="em-library-chip"
          @click="insertFromLibrary(preset)"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>

    <div class="em-strip kb-section em-strip--blocks">
      <h4 class="em-strip-title">Content blocks</h4>
      <p class="em-strip-desc">Build the body. Reorder with arrows.</p>

      <div class="em-block-list">
        <div
          v-for="(block, index) in blocks"
          :key="block.id"
          class="em-block"
          :data-type="block.type"
        >
          <div class="em-block-bar">
            <span class="em-block-type">{{ block.type }}</span>
            <div class="em-block-actions">
              <button
                type="button"
                class="em-block-btn"
                :disabled="index === 0"
                @click="moveBlock(block.id, 'up')"
                title="Move up"
                aria-label="Move up"
              >↑</button>
              <button
                type="button"
                class="em-block-btn"
                :disabled="index === blocks.length - 1"
                @click="moveBlock(block.id, 'down')"
                title="Move down"
                aria-label="Move down"
              >↓</button>
              <button
                type="button"
                class="em-block-btn em-block-btn--remove"
                @click="removeBlock(block.id)"
                title="Remove"
                aria-label="Remove"
              >×</button>
            </div>
          </div>

          <div v-if="block.type === 'heading'" class="em-block-fields">
            <select
              :value="(block as any).level"
              class="em-select em-select--sm"
              @change="(e) => updateBlock(block.id, { level: Number((e.target as HTMLSelectElement).value) as 1 | 2 | 3 })"
            >
              <option :value="1">H1</option>
              <option :value="2">H2</option>
              <option :value="3">H3</option>
            </select>
            <input
              type="text"
              class="em-input"
              :value="(block as any).content"
              @input="(e) => updateBlock(block.id, { content: (e.target as HTMLInputElement).value })"
              placeholder="Heading text"
            />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`block:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:block:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `block:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`block-var-heading-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`block:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:block:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-heading-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`block:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'paragraph'" class="em-block-fields">
            <textarea
              class="em-textarea em-textarea--sm"
              :value="(block as any).content"
              @input="(e) => updateBlock(block.id, { content: (e.target as HTMLTextAreaElement).value })"
              placeholder="Paragraph text"
              rows="2"
            />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`block:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:block:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `block:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`block-var-paragraph-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`block:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:block:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-paragraph-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`block:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'image'" class="em-block-fields">
            <input type="url" class="em-input" :value="(block as any).src" @input="(e) => updateBlock(block.id, { src: (e.target as HTMLInputElement).value })" placeholder="Image URL" />
            <input type="text" class="em-input" :value="(block as any).alt" @input="(e) => updateBlock(block.id, { alt: (e.target as HTMLInputElement).value })" placeholder="Alt text" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`image-alt:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `image-alt:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-image-alt-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`image-alt:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="url" class="em-input" :value="(block as any).linkUrl" @input="(e) => updateBlock(block.id, { linkUrl: (e.target as HTMLInputElement).value })" placeholder="Link URL (optional)" />
          </div>

          <div v-else-if="block.type === 'button'" class="em-block-fields">
            <input type="text" class="em-input" :value="(block as any).text" @input="(e) => updateBlock(block.id, { text: (e.target as HTMLInputElement).value })" placeholder="Button text" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`button-text:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `button-text:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-button-text-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`button-text:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="url" class="em-input" :value="(block as any).url" @input="(e) => updateBlock(block.id, { url: (e.target as HTMLInputElement).value })" placeholder="Button URL" />
            <div class="em-block-fields--row">
              <label class="em-inline-label">Border radius</label>
              <input type="number" class="em-input em-input--narrow" min="0" max="24" :value="(block as any).borderRadius ?? 8" @input="(e) => updateBlock(block.id, { borderRadius: Number((e.target as HTMLInputElement).value) || 0 })" />
            </div>
            <label class="em-check-row">
              <input type="checkbox" :checked="(block as any).ghost" @change="(e) => updateBlock(block.id, { ghost: (e.target as HTMLInputElement).checked })" />
              <span>Ghost (outline) style</span>
            </label>
          </div>

          <div v-else-if="block.type === 'spacer'" class="em-block-fields em-block-fields--row">
            <label class="em-inline-label">Height</label>
            <input type="number" class="em-input em-input--narrow" min="8" max="120" :value="(block as any).height" @input="(e) => updateBlock(block.id, { height: Number((e.target as HTMLInputElement).value) || 24 })" />
            <span class="em-inline-label">px</span>
          </div>

          <div v-else-if="block.type === 'footer'" class="em-block-fields">
            <textarea class="em-textarea em-textarea--sm" :value="(block as any).content" @input="(e) => updateBlock(block.id, { content: (e.target as HTMLTextAreaElement).value })" placeholder="Footer text" rows="2" />
            <input type="url" class="em-input" :value="(block as any).unsubscribeUrl" @input="(e) => updateBlock(block.id, { unsubscribeUrl: (e.target as HTMLInputElement).value })" placeholder="Unsubscribe URL" />
            <input type="text" class="em-input" :value="(block as any).companyAddress" @input="(e) => updateBlock(block.id, { companyAddress: (e.target as HTMLInputElement).value })" placeholder="Company address" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`footer-address:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `footer-address:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-footer-address-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`footer-address:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`block:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:block:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `block:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`block-var-footer-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`block:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:block:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-footer-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`block:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'list'" class="em-block-fields">
            <select
              :value="(block as any).style"
              class="em-select em-select--sm"
              @change="(e) => updateBlock(block.id, { style: (e.target as HTMLSelectElement).value as 'bullet' | 'numbered' })"
            >
              <option value="bullet">Bullet list</option>
              <option value="numbered">Numbered list</option>
            </select>
            <div class="em-list-items">
              <div v-for="(item, i) in ((block as any).items || [])" :key="i" class="em-list-item-row">
                <input
                  type="text"
                  class="em-input em-input--flex"
                  :value="item"
                  @input="(e) => updateListBlockItem(block.id, i, (e.target as HTMLInputElement).value)"
                  :placeholder="`Item ${i + 1}`"
                />
                <div class="em-var-picker-wrap">
                  <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`list-item:${block.id}:${i}`)" title="Insert emoji">😊</button>
                  <div v-if="activeEmojiTarget === `list-item:${block.id}:${i}`" class="em-emoji-menu" role="menu">
                    <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-list-item-${block.id}-${i}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`list-item:${block.id}:${i}`, emoji)">{{ emoji }}</button>
                  </div>
                </div>
                <button type="button" class="em-block-btn em-block-btn--remove" @click="removeListBlockItem(block.id, i)" title="Remove" aria-label="Remove">×</button>
              </div>
            </div>
            <button type="button" class="em-add-btn em-add-btn--sm" @click="addListBlockItem(block.id)">+ Add item</button>
          </div>

          <div v-else-if="block.type === 'quote'" class="em-block-fields">
            <select
              :value="(block as any).style || 'default'"
              class="em-select em-select--sm"
              @change="(e) => updateBlock(block.id, { style: (e.target as HTMLSelectElement).value as any })"
            >
              <option value="default">Default</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
            </select>
            <textarea
              class="em-textarea em-textarea--sm"
              :value="(block as any).content"
              @input="(e) => updateBlock(block.id, { content: (e.target as HTMLTextAreaElement).value })"
              placeholder="Quote or callout text"
              rows="3"
            />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`block:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:block:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `block:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`block-var-quote-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`block:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:block:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-quote-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`block:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'social'" class="em-block-fields">
            <div class="em-social-links">
              <div v-for="(link, i) in ((block as any).links || [])" :key="i" class="em-social-row">
                <select
                  :value="link.platform"
                  class="em-select em-select--sm"
                  @change="(e) => updateSocialLink(block.id, i, 'platform', (e.target as HTMLSelectElement).value)"
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="custom">Custom</option>
                </select>
                <input
                  type="url"
                  class="em-input em-input--flex"
                  :value="link.url"
                  @input="(e) => updateSocialLink(block.id, i, 'url', (e.target as HTMLInputElement).value)"
                  placeholder="Profile URL"
                />
                <button type="button" class="em-block-btn em-block-btn--remove" @click="removeSocialLink(block.id, i)" title="Remove" aria-label="Remove">×</button>
              </div>
            </div>
            <button type="button" class="em-add-btn em-add-btn--sm" @click="addSocialLink(block.id)">+ Add link</button>
          </div>

          <div v-else-if="block.type === 'video'" class="em-block-fields">
            <input type="url" class="em-input" :value="(block as any).thumbnailUrl" @input="(e) => updateBlock(block.id, { thumbnailUrl: (e.target as HTMLInputElement).value })" placeholder="Thumbnail image URL" />
            <input type="url" class="em-input" :value="(block as any).videoUrl" @input="(e) => updateBlock(block.id, { videoUrl: (e.target as HTMLInputElement).value })" placeholder="Video URL (click destination)" />
            <input type="text" class="em-input" :value="(block as any).caption" @input="(e) => updateBlock(block.id, { caption: (e.target as HTMLInputElement).value })" placeholder="Caption (optional)" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`video-caption:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `video-caption:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-video-caption-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`video-caption:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'link_list'" class="em-block-fields">
            <input type="text" class="em-input em-input--narrow" :value="(block as any).separator" @input="(e) => updateBlock(block.id, { separator: (e.target as HTMLInputElement).value || ' | ' })" placeholder="Separator" title="e.g. | or ·" />
            <div class="em-link-list-items">
              <div v-for="(link, i) in ((block as any).links || [])" :key="i" class="em-link-list-row">
                <input type="text" class="em-input em-input--flex" :value="link.text" @input="(e) => updateLinkListItem(block.id, i, 'text', (e.target as HTMLInputElement).value)" placeholder="Label" />
                <div class="em-var-picker-wrap">
                  <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`link-list-item:${block.id}:${i}`)" title="Insert emoji">😊</button>
                  <div v-if="activeEmojiTarget === `link-list-item:${block.id}:${i}`" class="em-emoji-menu" role="menu">
                    <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-link-list-item-${block.id}-${i}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`link-list-item:${block.id}:${i}`, emoji)">{{ emoji }}</button>
                  </div>
                </div>
                <input type="url" class="em-input em-input--flex" :value="link.url" @input="(e) => updateLinkListItem(block.id, i, 'url', (e.target as HTMLInputElement).value)" placeholder="URL" />
                <button type="button" class="em-block-btn em-block-btn--remove" @click="removeLinkListItem(block.id, i)" title="Remove" aria-label="Remove">×</button>
              </div>
            </div>
            <button type="button" class="em-add-btn em-add-btn--sm" @click="addLinkListItem(block.id)">+ Add link</button>
          </div>

          <div v-else-if="block.type === 'columns'" class="em-block-fields">
            <label class="em-inline-label">Left column</label>
            <textarea class="em-textarea em-textarea--sm" :value="(block as any).leftContent" @input="(e) => updateBlock(block.id, { leftContent: (e.target as HTMLTextAreaElement).value })" placeholder="Left column text" rows="2" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`col-left:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:col-left:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `col-left:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`col-left-var-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`col-left:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:col-left:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-col-left-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`col-left:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <label class="em-inline-label">Right column</label>
            <textarea class="em-textarea em-textarea--sm" :value="(block as any).rightContent" @input="(e) => updateBlock(block.id, { rightContent: (e.target as HTMLTextAreaElement).value })" placeholder="Right column text" rows="2" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`col-right:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:col-right:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `col-right:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`col-right-var-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`col-right:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:col-right:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-col-right-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`col-right:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'divider'" class="em-block-fields">
            <div class="em-block-fields--row">
              <label class="em-inline-label">Thickness</label>
              <input type="number" class="em-input em-input--narrow" min="1" max="8" :value="(block as any).thickness ?? 1" @input="(e) => updateBlock(block.id, { thickness: Number((e.target as HTMLInputElement).value) || 1 })" />
              <span class="em-inline-label">px</span>
            </div>
            <div class="em-block-fields--row">
              <label class="em-inline-label">Color</label>
              <input type="text" class="em-input em-input--narrow" :value="(block as any).color ?? '#e2e8f0'" @input="(e) => updateBlock(block.id, { color: (e.target as HTMLInputElement).value || '#e2e8f0' })" placeholder="#e2e8f0" />
            </div>
            <select
              :value="(block as any).lineStyle ?? 'solid'"
              class="em-select em-select--sm"
              @change="(e) => updateBlock(block.id, { lineStyle: (e.target as HTMLSelectElement).value as 'solid' | 'dashed' | 'dotted' })"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </div>

          <div v-else-if="block.type === 'row'" class="em-block-fields">
            <label class="em-inline-label">Columns</label>
            <select
              :value="(block as any).columnCount"
              class="em-select em-select--sm"
              @change="(e) => updateRowBlock(block.id, { columnCount: Number((e.target as HTMLSelectElement).value) as 1 | 2 | 3 | 4 })"
            >
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
            </select>
            <div v-for="(cell, ci) in ((block as any).cells || [])" :key="ci" class="em-row-cell">
              <label class="em-inline-label">Column {{ ci + 1 }}</label>
              <textarea class="em-textarea em-textarea--sm" :value="cell" @input="(e) => updateRowCell(block.id, ci, (e.target as HTMLTextAreaElement).value)" placeholder="Cell content" rows="2" />
              <div class="em-var-picker-wrap">
                <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`row:${block.id}:${ci}`)">{{ varChipLabel }}</button>
                <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:row:${block.id}:${ci}`)" title="Insert emoji">😊</button>
                <div v-if="activeVarTarget === `row:${block.id}:${ci}`" class="em-var-menu" role="menu">
                  <button v-for="v in localVariables" :key="`row-var-${block.id}-${ci}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`row:${block.id}:${ci}`, v)">{{ v }}</button>
                </div>
                <div v-if="activeEmojiTarget === `emoji:row:${block.id}:${ci}`" class="em-emoji-menu" role="menu">
                  <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-row-${block.id}-${ci}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`row:${block.id}:${ci}`, emoji)">{{ emoji }}</button>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="block.type === 'navbar'" class="em-block-fields">
            <input type="text" class="em-input em-input--narrow" :value="(block as any).separator" @input="(e) => updateBlock(block.id, { separator: (e.target as HTMLInputElement).value || ' | ' })" placeholder="Separator" title="e.g. | or ·" />
            <div class="em-link-list-items">
              <div v-for="(link, i) in ((block as any).links || [])" :key="i" class="em-link-list-row">
                <input type="text" class="em-input em-input--flex" :value="link.text" @input="(e) => updateNavbarLink(block.id, i, 'text', (e.target as HTMLInputElement).value)" placeholder="Label" />
                <div class="em-var-picker-wrap">
                  <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`navbar-item:${block.id}:${i}`)" title="Insert emoji">😊</button>
                  <div v-if="activeEmojiTarget === `navbar-item:${block.id}:${i}`" class="em-emoji-menu" role="menu">
                    <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-navbar-item-${block.id}-${i}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`navbar-item:${block.id}:${i}`, emoji)">{{ emoji }}</button>
                  </div>
                </div>
                <input type="url" class="em-input em-input--flex" :value="link.url" @input="(e) => updateNavbarLink(block.id, i, 'url', (e.target as HTMLInputElement).value)" placeholder="URL" />
                <button type="button" class="em-block-btn em-block-btn--remove" @click="removeNavbarLink(block.id, i)" title="Remove" aria-label="Remove">×</button>
              </div>
            </div>
            <button type="button" class="em-add-btn em-add-btn--sm" @click="addNavbarLink(block.id)">+ Add link</button>
          </div>

          <div v-else-if="block.type === 'accordion'" class="em-block-fields">
            <div v-for="(item, ai) in ((block as any).items || [])" :key="ai" class="em-accordion-item">
              <input type="text" class="em-input" :value="item.title" @input="(e) => updateAccordionItem(block.id, ai, 'title', (e.target as HTMLInputElement).value)" placeholder="Section title" />
              <div class="em-var-picker-wrap">
                <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`accordion-title:${block.id}:${ai}`)" title="Insert emoji">😊</button>
                <div v-if="activeEmojiTarget === `accordion-title:${block.id}:${ai}`" class="em-emoji-menu" role="menu">
                  <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-accordion-title-${block.id}-${ai}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`accordion-title:${block.id}:${ai}`, emoji)">{{ emoji }}</button>
                </div>
              </div>
              <textarea class="em-textarea em-textarea--sm" :value="item.content" @input="(e) => updateAccordionItem(block.id, ai, 'content', (e.target as HTMLTextAreaElement).value)" placeholder="Expandable content" rows="2" />
              <div class="em-var-picker-wrap">
                <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`accordion-content:${block.id}:${ai}`)" title="Insert emoji">😊</button>
                <div v-if="activeEmojiTarget === `accordion-content:${block.id}:${ai}`" class="em-emoji-menu" role="menu">
                  <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-accordion-content-${block.id}-${ai}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`accordion-content:${block.id}:${ai}`, emoji)">{{ emoji }}</button>
                </div>
              </div>
              <button type="button" class="em-block-btn em-block-btn--remove" @click="removeAccordionItem(block.id, ai)" title="Remove" aria-label="Remove">×</button>
            </div>
            <button type="button" class="em-add-btn em-add-btn--sm" @click="addAccordionItem(block.id)">+ Add section</button>
          </div>

          <div v-else-if="block.type === 'carousel'" class="em-block-fields">
            <div v-for="(slide, si) in ((block as any).slides || [])" :key="si" class="em-carousel-slide">
              <input type="url" class="em-input" :value="slide.imageUrl" @input="(e) => updateCarouselSlide(block.id, si, 'imageUrl', (e.target as HTMLInputElement).value)" placeholder="Image URL" />
              <input type="text" class="em-input" :value="slide.alt" @input="(e) => updateCarouselSlide(block.id, si, 'alt', (e.target as HTMLInputElement).value)" placeholder="Alt text" />
              <input type="url" class="em-input" :value="slide.linkUrl" @input="(e) => updateCarouselSlide(block.id, si, 'linkUrl', (e.target as HTMLInputElement).value)" placeholder="Link URL (optional)" />
              <button type="button" class="em-block-btn em-block-btn--remove" @click="removeCarouselSlide(block.id, si)" title="Remove" aria-label="Remove">×</button>
            </div>
            <button type="button" class="em-add-btn em-add-btn--sm" @click="addCarouselSlide(block.id)">+ Add slide</button>
          </div>

          <div v-else-if="block.type === 'countdown'" class="em-block-fields">
            <input type="text" class="em-input" :value="(block as any).label" @input="(e) => updateBlock(block.id, { label: (e.target as HTMLInputElement).value })" placeholder="Label (e.g. Offer ends in)" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`countdown-label:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `countdown-label:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-countdown-label-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`countdown-label:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="datetime-local" class="em-input" :value="(block as any).endDateTime ? (block as any).endDateTime.slice(0, 16) : ''" @input="(e) => updateBlock(block.id, { endDateTime: (e.target as HTMLInputElement).value ? new Date((e.target as HTMLInputElement).value).toISOString() : '' })" placeholder="End date & time" />
            <span class="em-hint">Preview shows placeholder; real countdown uses dynamic GIF in send.</span>
          </div>

          <div v-else-if="block.type === 'product_card'" class="em-block-fields">
            <input type="url" class="em-input" :value="(block as any).imageUrl" @input="(e) => updateBlock(block.id, { imageUrl: (e.target as HTMLInputElement).value })" placeholder="Product image URL" />
            <input type="text" class="em-input" :value="(block as any).title" @input="(e) => updateBlock(block.id, { title: (e.target as HTMLInputElement).value })" placeholder="Product title" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`product-title:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `product-title:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-product-title-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`product-title:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="text" class="em-input" :value="(block as any).price" @input="(e) => updateBlock(block.id, { price: (e.target as HTMLInputElement).value })" placeholder="Price (e.g. €29.99)" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`product-price:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `product-price:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-product-price-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`product-price:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="text" class="em-input" :value="(block as any).buttonText" @input="(e) => updateBlock(block.id, { buttonText: (e.target as HTMLInputElement).value })" placeholder="Button text" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`product-button:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `product-button:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-product-button-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`product-button:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="url" class="em-input" :value="(block as any).buttonUrl" @input="(e) => updateBlock(block.id, { buttonUrl: (e.target as HTMLInputElement).value })" placeholder="Button URL" />
          </div>

          <div v-else-if="block.type === 'liquid'" class="em-block-fields">
            <textarea class="em-textarea em-textarea--sm" :value="(block as any).content" @input="(e) => updateBlock(block.id, { content: (e.target as HTMLTextAreaElement).value })" placeholder="Liquid / conditional code (e.g. {% if %})" rows="4" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`block:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:block:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `block:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`block-var-liquid-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`block:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:block:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-liquid-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`block:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <span class="em-hint">Advanced: conditional content. Rendered server-side at send.</span>
          </div>

          <div v-else-if="block.type === 'code_block'" class="em-block-fields">
            <input type="text" class="em-input" :value="(block as any).caption" @input="(e) => updateBlock(block.id, { caption: (e.target as HTMLInputElement).value })" placeholder="Caption (optional)" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`code-caption:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `code-caption:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-code-caption-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`code-caption:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <textarea class="em-textarea em-textarea--sm" :value="(block as any).content" @input="(e) => updateBlock(block.id, { content: (e.target as HTMLTextAreaElement).value })" placeholder="Code or snippet to display to the recipient" rows="5" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleVarPicker(`block:${block.id}`)">{{ varChipLabel }}</button>
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`emoji:block:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeVarTarget === `block:${block.id}`" class="em-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`block-var-code-${block.id}-${v}`" type="button" class="em-var-menu-item" @click="applyVarChoice(`block:${block.id}`, v)">{{ v }}</button>
              </div>
              <div v-if="activeEmojiTarget === `emoji:block:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-code-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`block:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <span class="em-hint">Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.</span>
          </div>

          <div v-else-if="block.type === 'rss_feed'" class="em-block-fields">
            <input type="url" class="em-input" :value="(block as any).feedUrl" @input="(e) => updateBlock(block.id, { feedUrl: (e.target as HTMLInputElement).value })" placeholder="RSS feed URL" />
            <div class="em-block-fields--row">
              <label class="em-inline-label">Max items</label>
              <input type="number" class="em-input em-input--narrow" min="1" max="20" :value="(block as any).maxItems ?? 5" @input="(e) => updateBlock(block.id, { maxItems: Number((e.target as HTMLInputElement).value) || 5 })" />
            </div>
            <span class="em-hint">Feed content is pulled at send time.</span>
          </div>

          <div v-else-if="block.type === 'dynamic_image'" class="em-block-fields">
            <input type="url" class="em-input" :value="(block as any).imageUrl" @input="(e) => updateBlock(block.id, { imageUrl: (e.target as HTMLInputElement).value })" placeholder="Image URL (use {{ .var }} for per-recipient)" />
            <input type="text" class="em-input" :value="(block as any).alt" @input="(e) => updateBlock(block.id, { alt: (e.target as HTMLInputElement).value })" placeholder="Alt text" />
            <div class="em-var-picker-wrap">
              <button type="button" class="em-chip em-chip--sm" @click="toggleEmojiPicker(`dynamic-alt:${block.id}`)" title="Insert emoji">😊</button>
              <div v-if="activeEmojiTarget === `dynamic-alt:${block.id}`" class="em-emoji-menu" role="menu">
                <button v-for="emoji in BLOCK_EMOJIS" :key="`emoji-dynamic-alt-${block.id}-${emoji}`" type="button" class="em-emoji-menu-item" @click="applyEmojiChoice(`dynamic-alt:${block.id}`, emoji)">{{ emoji }}</button>
              </div>
            </div>
            <input type="url" class="em-input" :value="(block as any).fallbackUrl" @input="(e) => updateBlock(block.id, { fallbackUrl: (e.target as HTMLInputElement).value })" placeholder="Fallback URL (optional)" />
          </div>

          <div v-if="blockLayoutTypes.includes(block.type)" class="em-block-fields em-block-fields--row em-block-fields--layout">
            <div class="em-align-group" role="group" aria-label="Block alignment">
              <button
                type="button"
                class="em-align-btn"
                :class="{ 'em-align-btn--active': ((block as any).alignment ?? 'left') === 'left' }"
                title="Align left"
                aria-label="Align left"
                @click="updateBlock(block.id, { alignment: 'left' as BlockAlignment })"
              >
                <span aria-hidden="true">≡</span>
              </button>
              <button
                type="button"
                class="em-align-btn"
                :class="{ 'em-align-btn--active': ((block as any).alignment ?? 'left') === 'center' }"
                title="Align center"
                aria-label="Align center"
                @click="updateBlock(block.id, { alignment: 'center' as BlockAlignment })"
              >
                <span aria-hidden="true">≣</span>
              </button>
              <button
                type="button"
                class="em-align-btn"
                :class="{ 'em-align-btn--active': ((block as any).alignment ?? 'left') === 'right' }"
                title="Align right"
                aria-label="Align right"
                @click="updateBlock(block.id, { alignment: 'right' as BlockAlignment })"
              >
                <span aria-hidden="true">☰</span>
              </button>
            </div>
            <label class="em-check-row">
              <input type="checkbox" :checked="(block as any).fullWidth" @change="(e) => updateBlock(block.id, { fullWidth: (e.target as HTMLInputElement).checked })" />
              <span>Full width</span>
            </label>
          </div>
        </div>
      </div>

      <div class="em-add-bar kb-field kb-field--add-bar">
        <span class="em-add-bar-label">Add block</span>
        <div class="em-add-bar-btns">
          <button type="button" class="em-add-btn" @click="addBlock('heading')" title="Heading">H</button>
          <button type="button" class="em-add-btn" @click="addBlock('paragraph')" title="Text">T</button>
          <button type="button" class="em-add-btn" @click="addBlock('image')" title="Image">🖼</button>
          <button type="button" class="em-add-btn" @click="addBlock('button')" title="Button">Btn</button>
          <button type="button" class="em-add-btn" @click="addBlock('list')" title="List">List</button>
          <button type="button" class="em-add-btn" @click="addBlock('quote')" title="Quote">Quote</button>
          <button type="button" class="em-add-btn" @click="addBlock('row')" title="Row (1–4 columns)">Row</button>
          <button type="button" class="em-add-btn" @click="addBlock('columns')" title="Two columns">2 col</button>
          <button type="button" class="em-add-btn" @click="addBlock('divider')" title="Divider">—</button>
          <button type="button" class="em-add-btn" @click="addBlock('spacer')" title="Spacer">▢</button>
          <button type="button" class="em-add-btn" @click="addBlock('navbar')" title="Menu / Navbar">Nav</button>
          <button type="button" class="em-add-btn" @click="addBlock('video')" title="Video">Video</button>
          <button type="button" class="em-add-btn" @click="addBlock('social')" title="Social links">Social</button>
          <button type="button" class="em-add-btn" @click="addBlock('accordion')" title="Accordion">Accord</button>
          <button type="button" class="em-add-btn" @click="addBlock('carousel')" title="Carousel">Carousel</button>
          <button type="button" class="em-add-btn" @click="addBlock('countdown')" title="Countdown">Timer</button>
          <button type="button" class="em-add-btn" @click="addBlock('product_card')" title="Product card">Product</button>
          <button type="button" class="em-add-btn" @click="addBlock('liquid')" title="Liquid / code">Liquid</button>
          <button type="button" class="em-add-btn" @click="addBlock('code_block')" title="Code block">Code</button>
          <button type="button" class="em-add-btn" @click="addBlock('rss_feed')" title="RSS feed">RSS</button>
          <button type="button" class="em-add-btn" @click="addBlock('dynamic_image')" title="Dynamic image">Dyn img</button>
          <button type="button" class="em-add-btn" @click="addBlock('link_list')" title="Link list">Links</button>
          <button type="button" class="em-add-btn" @click="addBlock('footer')" title="Footer">Footer</button>
        </div>
      </div>
    </div>

    <div class="em-strip kb-section em-strip--personalize">
      <h4 class="em-strip-title">Personalization</h4>
      <p class="em-strip-desc">Merge tags for subject, preheader, and text blocks.</p>
      <div class="em-field kb-field">
        <label class="em-label">Variable</label>
        <div class="em-input-group">
          <select v-model="selectedVariable" class="em-select em-select--flex">
            <option v-for="v in localVariables" :key="v" :value="v">{{ v }}</option>
          </select>
        </div>
      </div>
      <div class="em-field kb-field">
        <label class="em-label">Add custom</label>
        <div class="em-input-group">
          <input v-model="newVariable" type="text" class="em-input em-input--flex" placeholder="e.g. plan_name" />
          <button type="button" class="em-chip" @click="addVariable">Add</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.em-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.kb-section,
.em-strip {
  --wa-surface: var(--kb-surface, #ffffff);
  --wa-border: var(--kb-border, #d6e0eb);
  --wa-text: var(--kb-text-strong, #0f172a);
  --wa-text-muted: var(--kb-text-muted, #56657a);
  margin-bottom: 0;
  border: 1px solid var(--wa-border);
  border-radius: 16px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
}
.em-strip--blocks {
  padding-top: 1rem;
}
.em-strip--personalize {
  padding-top: 1rem;
}
.em-strip-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 0.3rem;
}
.em-strip-title {
  font-size: 1.04rem;
  font-weight: 750;
  color: var(--wa-text);
  margin: 0;
  letter-spacing: 0.01em;
}
.em-section-reset {
  font-size: 0.75rem;
  color: #334155;
  background: var(--wa-surface);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 0.36rem 0.62rem;
  border-radius: 999px;
  font-weight: 600;
}
.em-section-reset:hover {
  color: #0f172a;
  background: #eef2f7;
}
.em-strip-desc {
  font-size: 0.875rem;
  color: var(--wa-text-muted);
  margin: 0 0 0.75rem 0;
  line-height: 1.45;
}
.kb-field,
.em-field {
  margin-bottom: 0.88rem;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface);
  border-radius: 12px;
  padding: 0.82rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 1px 0 rgba(15, 23, 42, 0.02);
  transition: border-color 0.16s ease, box-shadow 0.16s ease;
}
.kb-field:focus-within,
.em-field:focus-within {
  border-color: #bad0ea;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 0 0 3px rgba(37, 99, 235, 0.08);
}
.em-field:last-child {
  margin-bottom: 0;
}
.em-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 720;
  color: var(--wa-text);
  margin-bottom: 0.46rem;
  letter-spacing: 0.02em;
}
.em-optional { font-weight: 400; color: #94a3b8; }
.em-hint {
  font-size: 0.75rem;
  color: var(--wa-text-muted);
  margin-top: 0.38rem;
  line-height: 1.35;
  display: block;
}
.em-analyzer {
  display: inline-block;
  margin-top: 6px;
  margin-right: 8px;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 6px;
}
.em-analyzer--too_short {
  background: #fef3c7;
  color: #b45309;
}
.em-analyzer--good {
  background: #dcfce7;
  color: #166534;
}
.em-analyzer--too_long {
  background: #fee2e2;
  color: #b91c1c;
}
.em-analyzer--spam {
  background: #fee2e2;
  color: #b91c1c;
}
.em-library-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.em-library-chip {
  font-size: 0.8125rem;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
}
.em-library-chip:hover {
  background: #f8fafc;
  color: #0f172a;
}
.em-input,
.em-textarea,
.em-select {
  width: stretch;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.em-input:focus,
.em-textarea:focus,
.em-select:focus {
  outline: none;
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
}
.em-input::placeholder,
.em-textarea::placeholder {
  color: #94a3b8;
}
.em-input--flex { flex: 1; min-width: 0; }
.em-input--narrow { width: 72px; }
.em-select--flex { flex: 1; min-width: 0; }
.em-select--sm { width: auto; max-width: 100px; }
.em-textarea { resize: vertical; min-height: 64px; }
.em-textarea--sm { min-height: 60px; }
.em-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.em-chip {
  padding: 10px 14px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.em-chip:hover {
  background: #e2e8f0;
  color: #0f172a;
}
.em-chip--sm {
  padding: 8px 12px;
  font-size: 0.6875rem;
}
.em-var-picker-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  position: relative;
}
.em-var-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 25;
  min-width: 180px;
  max-width: 260px;
  max-height: 220px;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid #d1dbe8;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
}
.em-var-menu-item {
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 8px 10px;
  text-align: left;
  background: transparent;
  color: #334155;
  font-size: 0.78rem;
  cursor: pointer;
}
.em-var-menu-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.em-block-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}
.em-block {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 18px;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.em-block:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}
.em-block-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}
.em-block-type {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}
.em-block-actions {
  display: flex;
  gap: 6px;
}
.em-emoji-wrap {
  position: relative;
}
.em-emoji-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 30;
  min-width: 168px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 4px;
  padding: 8px;
  border: 1px solid #dbe7f4;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
}
.em-emoji-menu-item {
  width: 24px;
  height: 24px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.em-emoji-menu-item:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}
.em-block-btn {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.em-block-btn:hover:not(:disabled) {
  background: #f1f5f9;
  color: #334155;
}
.em-block-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.em-block-btn--remove {
  color: #dc2626;
  background: #fef2f2;
  border-color: #fecaca;
}
.em-block-btn--remove:hover {
  background: #fee2e2;
  color: #b91c1c;
}
.em-block-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(180deg, #f8fbff 0%, #f3f8ff 100%);
  border: 1px solid #dbe7f4;
  border-radius: 10px;
  padding: 0.75rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    0 1px 2px rgba(15, 23, 42, 0.035);
}
.em-block-fields .em-input {
  margin-bottom: 0;
}
.em-block-fields--row {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.em-block-fields--layout {
  margin-top: 0.55rem;
  background: #f7fbff;
  border-color: #cfdeef;
}
.em-align-group {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.em-align-btn {
  width: 34px;
  height: 30px;
  border: 1px solid #c9d9ec;
  border-radius: 8px;
  background: #fff;
  color: #365372;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.em-align-btn:hover {
  border-color: #9db9db;
  background: #f5f9ff;
  color: #1e3a5f;
}
.em-align-btn--active {
  border-color: #7fa5d1;
  background: #e8f0ff;
  color: #163a63;
}
.em-inline-label {
  font-size: 0.8125rem;
  color: #64748b;
}
.em-muted {
  font-size: 0.8125rem;
  color: #94a3b8;
}
.em-add-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 0.25rem;
}
.kb-field--add-bar,
.em-add-bar.kb-field {
  background:
    linear-gradient(180deg, #f8fbff 0%, #f2f8ff 100%),
    var(--wa-surface);
  border-color: #cfe0f3;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 10px 20px rgba(37, 99, 235, 0.08);
}
.em-add-bar-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #1e3a5f;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.em-add-bar-btns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  gap: 10px;
}
.em-add-btn {
  padding: 0.58rem 0.72rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #28425f;
  background: #ffffff;
  border: 1px solid #c9d9ec;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s, box-shadow 0.15s;
}
.em-add-btn:hover {
  border-color: #9ab8db;
  background: #f5f9ff;
  color: #0f172a;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.em-add-btn--sm {
  align-self: flex-start;
}
.em-list-items,
.em-social-links,
.em-link-list-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.em-check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: #334155;
}
.em-row-cell {
  margin-top: 8px;
}
.em-accordion-item {
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}
.em-accordion-item .em-block-btn--remove {
  margin-top: 4px;
}
.em-carousel-slide {
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}
.em-carousel-slide .em-block-btn--remove {
  margin-top: 4px;
}
.em-list-item-row,
.em-social-row,
.em-link-list-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.em-list-item-row .em-input--flex,
.em-social-row .em-input--flex,
.em-link-list-row .em-input--flex {
  min-width: 0;
}
</style>
