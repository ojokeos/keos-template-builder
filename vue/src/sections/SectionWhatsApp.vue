<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CampaignMessage } from '@keos/notification-builder-core';

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    showReset?: boolean;
    disabledCategories?: string[];
    disabledFormats?: string[];
  }>(),
  {
    showReset: false,
    disabledCategories: () => [],
    disabledFormats: () => [],
  }
);

const emit = defineEmits<{
  update: [partial: any];
  reset: [];
}>();

const FORMAT_OPTIONS = [
  { value: 'text', label: 'Text', hint: 'Standard text template.' },
  { value: 'image', label: 'Rich media (image header)', hint: 'Body with image in header.' },
  { value: 'video', label: 'Rich media (video header)', hint: 'Body with video in header.' },
  { value: 'document', label: 'Rich media (document header)', hint: 'Body with PDF/document in header.' },
  { value: 'carousel', label: 'Carousel', hint: 'Up to 10 cards with media + buttons.' },
  { value: 'flow', label: 'WhatsApp Flow', hint: 'Launch a multi-step in-chat flow.' },
  { value: 'lto', label: 'Limited-time offer', hint: 'Adds expiry urgency to the offer.' },
  { value: 'catalog', label: 'Catalog', hint: 'Open WhatsApp catalog or product list.' },
  { value: 'mpm', label: 'Multi-product', hint: 'Show multiple products in one template.' },
  { value: 'auth', label: 'Authentication', hint: 'OTP/login verification template.' },
] as const;

const CATEGORY_OPTIONS = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'utility', label: 'Utility' },
  { value: 'authentication', label: 'Authentication' },
] as const;

const HEADER_LIMIT = 60;
const BODY_LIMIT = 1024;
const FOOTER_LIMIT = 60;
const MAX_BUTTONS = 10;
const MAX_CAROUSEL_CARDS = 10;

const messageAny = computed(() => props.message as any);
const currentFormat = computed(() => messageAny.value.template_type ?? 'text');
const headerType = computed(() => messageAny.value.header_type ?? 'none');
const headerText = computed(() => String(messageAny.value.header ?? ''));
const bodyText = computed(() => String(messageAny.value.body ?? ''));
const footerText = computed(() => String(messageAny.value.footer ?? ''));
const buttons = computed(() => (messageAny.value.buttons as any[]) ?? []);
const products = computed(() => (messageAny.value.products as any[]) ?? []);
const cards = computed(() => (messageAny.value.cards as any[]) ?? []);

const selectedFormatHint = computed(() => {
  const found = FORMAT_OPTIONS.find((f) => f.value === currentFormat.value);
  return found?.hint ?? 'Choose the approved WhatsApp template format.';
});
const categoryLabel = computed(() => {
  const raw = String(messageAny.value.template_category ?? '').trim();
  if (!raw) return 'Uncategorized';
  return raw.charAt(0).toUpperCase() + raw.slice(1);
});
const formatLabel = computed(() => {
  const found = FORMAT_OPTIONS.find((f) => f.value === currentFormat.value);
  return found?.label ?? 'Text';
});
const setupProgressLabel = computed(() => {
  if (!messageAny.value.template_name) return 'Needs setup';
  if (!bodyText.value.trim()) return 'Draft';
  return 'Ready to validate';
});
const disabledCategorySet = computed(() => new Set((props.disabledCategories ?? []).map((v) => String(v).trim())));
const disabledFormatSet = computed(() => new Set((props.disabledFormats ?? []).map((v) => String(v).trim())));

function extractPlaceholders(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const re = /\{\{\s*([^}]+?)\s*\}\}/g;
  const set = new Set<string>();
  let m;
  while ((m = re.exec(text)) !== null) set.add(m[1].trim());
  return Array.from(set);
}

const templateFields = computed(() => {
  const header = (props.message as any).header ?? '';
  const body = (props.message as any).body ?? props.message.body ?? '';
  const vars = new Set((props.message.variables ?? []) as string[]);
  const placeholders = [...extractPlaceholders(header), ...extractPlaceholders(body)];
  const uniq = Array.from(new Set(placeholders));
  return uniq.map((name) => ({ name, configured: vars.has(name) }));
});
const defaultVariables = [
  'first_name',
  'last_name',
  'full_name',
  'order_id',
  'order_status',
  'tracking_url',
  'delivery_date',
  'appointment_date',
  'appointment_time',
  'otp_code',
  'coupon_code',
  'product_name',
  'store_name',
  'support_phone',
  'city',
  'country',
];
const localVariables = computed(() => {
  const vars = ((props.message.variables ?? []) as string[]).filter(Boolean);
  return vars.length ? Array.from(new Set(vars)) : defaultVariables;
});
const activeVarTarget = ref<string | null>(null);

function emitUpdate(partial: Record<string, unknown>) {
  emit('update', partial);
}

function toggleVarPicker(target: string) {
  activeVarTarget.value = activeVarTarget.value === target ? null : target;
}

function applyVar(target: string, variable: string) {
  const token = ` {{ .${variable} }}`;
  const existingVars = ((props.message.variables ?? []) as string[]).filter(Boolean);
  const nextVars = Array.from(new Set([...existingVars, variable]));
  if (target === 'header') {
    emitUpdate({ header: `${headerText.value || ''}${token}`, variables: nextVars });
  } else if (target === 'body') {
    emitUpdate({ body: `${bodyText.value || ''}${token}`, variables: nextVars });
  } else if (target === 'footer') {
    emitUpdate({ footer: `${footerText.value || ''}${token}`, variables: nextVars });
  } else if (target.startsWith('btn-label:')) {
    const idx = Number(target.split(':')[1]);
    if (Number.isFinite(idx)) updateButton(idx, { label: `${String(buttons.value[idx]?.label ?? '')}${token}` });
    emitUpdate({ variables: nextVars });
  }
  activeVarTarget.value = null;
}

function onCategoryChange(value: string) {
  const partial: Record<string, unknown> = {
    template_category: value || undefined,
  };
  if (value === 'authentication' && currentFormat.value !== 'auth') {
    partial.template_type = 'auth';
  }
  emitUpdate(partial);
}

function onFormatChange(value: string) {
  const partial: Record<string, unknown> = { template_type: value };
  if (value === 'auth') partial.template_category = 'authentication';
  if (value === 'image' || value === 'video' || value === 'document') {
    partial.header_type = value;
  } else if (
    headerType.value === 'image' ||
    headerType.value === 'video' ||
    headerType.value === 'document'
  ) {
    partial.header_type = 'none';
  }
  emitUpdate(partial);
}

function updateButton(index: number, patch: Record<string, unknown>) {
  const next = [...buttons.value];
  next[index] = {
    ...next[index],
    id: next[index]?.id || `btn_${index + 1}`,
    ...patch,
  };
  emitUpdate({ buttons: next });
}

function removeButton(index: number) {
  const next = [...buttons.value];
  next.splice(index, 1);
  emitUpdate({ buttons: next });
}

function addButton() {
  const next = [...buttons.value];
  next.push({ id: `btn_${next.length + 1}`, label: '', type: 'quick_reply' });
  emitUpdate({ buttons: next });
}

function updateProduct(index: number, patch: Record<string, unknown>) {
  const next = [...products.value];
  next[index] = {
    ...next[index],
    id: next[index]?.id || `prod_${index + 1}`,
    ...patch,
  };
  emitUpdate({ products: next });
}

function removeProduct(index: number) {
  const next = [...products.value];
  next.splice(index, 1);
  emitUpdate({ products: next });
}

function addProduct() {
  const next = [...products.value];
  next.push({ id: `prod_${next.length + 1}`, productId: '' });
  emitUpdate({ products: next });
}

function updateCard(index: number, patch: Record<string, unknown>) {
  const next = [...cards.value];
  next[index] = {
    ...next[index],
    id: next[index]?.id || `card_${index + 1}`,
    ...patch,
  };
  emitUpdate({ cards: next });
}

function removeCard(index: number) {
  const next = [...cards.value];
  next.splice(index, 1);
  emitUpdate({ cards: next });
}

function addCard() {
  const next = [...cards.value];
  next.push({
    id: `card_${next.length + 1}`,
    headerType: 'IMAGE',
    mediaId: '',
    body: '',
    sampleText: '',
    buttons: [],
  });
  emitUpdate({ cards: next });
}

function addCardButton(cardIndex: number) {
  const next = [...cards.value];
  const card = { ...(next[cardIndex] as any) };
  card.buttons = [...(card.buttons ?? []), { type: 'QUICK_REPLY', label: '' }];
  next[cardIndex] = card;
  emitUpdate({ cards: next });
}

function removeCardButton(cardIndex: number, btnIndex: number) {
  const next = [...cards.value];
  const card = { ...(next[cardIndex] as any) };
  card.buttons = [...(card.buttons ?? [])];
  card.buttons.splice(btnIndex, 1);
  next[cardIndex] = card;
  emitUpdate({ cards: next });
}

function updateCardButton(cardIndex: number, btnIndex: number, patch: Record<string, unknown>) {
  const next = [...cards.value];
  const card = { ...(next[cardIndex] as any) };
  card.buttons = [...(card.buttons ?? [])];
  card.buttons[btnIndex] = { ...card.buttons[btnIndex], ...patch };
  next[cardIndex] = card;
  emitUpdate({ cards: next });
}
</script>

<template>
  <section class="kb-section">
    <div class="kb-section__head">
      <h3 class="kb-section__title">WhatsApp message</h3>
      <button
        v-if="showReset"
        type="button"
        class="kb-section__reset"
        @click="$emit('reset')"
      >
        Reset section
      </button>
    </div>
    <p class="kb-section__desc">
      Configure purpose, format, and components for your approved WhatsApp template.
    </p>
    <div class="kb-summary-bar">
      <span class="kb-pill kb-pill--category">{{ categoryLabel }}</span>
      <span class="kb-pill kb-pill--format">{{ formatLabel }}</span>
      <span class="kb-pill kb-pill--status">{{ setupProgressLabel }}</span>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Category (purpose)
        <span class="kb-helper">Defines the business intent and pricing bucket.</span>
      </label>
      <select
        class="kb-select"
        :value="messageAny.template_category ?? ''"
        @change="onCategoryChange(($event.target as HTMLSelectElement).value)"
      >
        <option value="">Select category</option>
        <option
          v-for="opt in CATEGORY_OPTIONS"
          :key="opt.value"
          :value="opt.value"
          :disabled="disabledCategorySet.has(opt.value)"
        >
          {{ opt.label }}{{ disabledCategorySet.has(opt.value) ? ' (Disabled)' : '' }}
        </option>
      </select>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Functional format
        <span class="kb-helper">{{ selectedFormatHint }}</span>
      </label>
      <select
        class="kb-select"
        :value="currentFormat"
        @change="onFormatChange(($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="opt in FORMAT_OPTIONS"
          :key="opt.value"
          :value="opt.value"
          :disabled="disabledFormatSet.has(opt.value)"
        >
          {{ opt.label }}{{ disabledFormatSet.has(opt.value) ? ' (Disabled)' : '' }}
        </option>
      </select>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Template name
        <span class="kb-helper">Auto-synced from the campaign name in the header.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        :value="messageAny.template_name ?? ''"
        readonly
        disabled
      />
    </div>

    <div class="kb-field kb-field--inline kb-field--language-limits">
      <div class="kb-field-half">
        <label class="kb-label">
          Template language
          <span class="kb-helper">Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).</span>
        </label>
        <input
          type="text"
          class="kb-input"
          placeholder="e.g. en_US"
          :value="messageAny.template_language ?? ''"
          @input="
            (e) =>
              emitUpdate({
                template_language: (e.target as HTMLInputElement).value || undefined,
              })
          "
        />
      </div>
      <div class="kb-field-half">
        <div class="kb-meta-card">
          <span class="kb-meta-title">Component limits</span>
          <ul class="kb-meta-list">
            <li>Header text: {{ HEADER_LIMIT }} chars</li>
            <li>Body: {{ BODY_LIMIT }} chars</li>
            <li>Footer: {{ FOOTER_LIMIT }} chars</li>
            <li>Buttons: up to {{ MAX_BUTTONS }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Vertical (use-case label)
        <span class="kb-helper">Describes the business use-case shown during Meta review. Required by Gupshup (e.g. "Order Updates", "Promotions", "Authentication").</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. Order Updates"
        :value="messageAny.vertical ?? ''"
        @input="
          (e) =>
            emitUpdate({
              vertical: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <div class="kb-field kb-field--toggles">
      <label class="kb-label">Submission options</label>
      <label class="kb-toggle-row">
        <input
          type="checkbox"
          class="kb-toggle"
          :checked="!!messageAny.enable_sample"
          @change="(e) => emitUpdate({ enable_sample: (e.target as HTMLInputElement).checked || undefined })"
        />
        <span class="kb-toggle-label">Include sample data in Meta review</span>
      </label>
      <label class="kb-toggle-row">
        <input
          type="checkbox"
          class="kb-toggle"
          :checked="!!messageAny.allow_category_change"
          @change="(e) => emitUpdate({ allow_category_change: (e.target as HTMLInputElement).checked || undefined })"
        />
        <span class="kb-toggle-label">Allow Meta to re-categorize this template</span>
      </label>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Header component (optional)
        <span class="kb-helper">Header can be text or rich media.</span>
      </label>
      <select
        class="kb-select"
        :value="headerType"
        @change="emitUpdate({ header_type: ($event.target as HTMLSelectElement).value })"
      >
        <option value="none">No header</option>
        <option value="text">Text header</option>
        <option value="image">Image header</option>
        <option value="video">Video header</option>
        <option value="document">Document header</option>
      </select>
    </div>

    <div v-if="headerType === 'text'" class="kb-field">
      <label class="kb-label">
        Header text
        <span
          class="kb-counter"
          :class="{ 'kb-counter--warn': headerText.length > HEADER_LIMIT }"
        >
          {{ headerText.length }}/{{ HEADER_LIMIT }}
        </span>
      </label>
      <div class="kb-input-with-var">
        <input
          type="text"
          class="kb-input"
          placeholder="e.g. Order update"
          :value="headerText"
          @input="
            (e) =>
              emitUpdate({
                header: (e.target as HTMLInputElement).value || undefined,
              })
          "
        />
        <div class="kb-var-picker-wrap">
          <button type="button" class="kb-btn-insert" @click="toggleVarPicker('header')">&#123;&#123; .var &#125;&#125;</button>
          <div v-if="activeVarTarget === 'header'" class="kb-var-menu" role="menu">
            <button v-for="v in localVariables" :key="`wa-header-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVar('header', v)">{{ v }}</button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="['image', 'video', 'document'].includes(headerType) || ['image', 'video', 'document'].includes(currentFormat)"
      class="kb-field"
    >
      <label class="kb-label">
        Media URL
        <span class="kb-helper">Public URL for the image, video, or document used in the template.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https://..."
        :value="messageAny.media_url ?? ''"
        @input="
          (e) =>
            emitUpdate({
              media_url: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>
    <div
      v-if="['image', 'video', 'document'].includes(headerType) || ['image', 'video', 'document'].includes(currentFormat)"
      class="kb-field"
    >
      <label class="kb-label">
        Media handle (exampleMedia)
        <span class="kb-helper">Gupshup media handle ID obtained after uploading via the media upload API. Required for template approval with rich media.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. 6462811350485912"
        :value="messageAny.media_handle ?? ''"
        @input="
          (e) =>
            emitUpdate({
              media_handle: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>
    <div
      v-if="headerType === 'document' || currentFormat === 'document'"
      class="kb-field"
    >
      <label class="kb-label">
        Document filename
        <span class="kb-helper">Filename shown in the document preview.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. invoice.pdf"
        :value="messageAny.document_filename ?? ''"
        @input="
          (e) =>
            emitUpdate({
              document_filename: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>
    <div
      v-if="['image', 'video', 'document'].includes(headerType) || ['image', 'video', 'document'].includes(currentFormat)"
      class="kb-field"
    >
      <label class="kb-label">
        Media caption (optional)
        <span class="kb-helper">Short line shown below the media.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. Your order is on the way"
        :value="messageAny.media_caption ?? ''"
        @input="
          (e) =>
            emitUpdate({
              media_caption: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <!-- LTO configuration -->
    <div
      v-if="currentFormat === 'lto'"
      class="kb-field"
    >
      <label class="kb-label">
        Offer expiry
        <span class="kb-helper">When this limited-time offer ends (for your reference and preview).</span>
      </label>
      <input
        type="datetime-local"
        class="kb-input"
        :value="messageAny.lto_expiry ?? ''"
        @input="
          (e) =>
            emitUpdate({
              lto_expiry: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <div v-if="currentFormat === 'flow'" class="kb-field">
      <label class="kb-label">
        Flow
        <span class="kb-helper">Connect this template to a published WhatsApp Flow.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="Flow ID"
        :value="messageAny.flow_id ?? ''"
        @input="
          (e) =>
            emitUpdate({
              flow_id: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
      <input
        type="text"
        class="kb-input"
        placeholder="Flow CTA label (e.g. Start booking)"
        :value="messageAny.flow_cta_label ?? ''"
        @input="
          (e) =>
            emitUpdate({
              flow_cta_label: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <div v-if="currentFormat === 'carousel'" class="kb-field">
      <label class="kb-label">
        Carousel cards
        <span class="kb-helper">MARKETING only. Each card requires a media header (IMAGE or VIDEO), body text, and can have URL + quick-reply buttons. Max {{ MAX_CAROUSEL_CARDS }} cards.</span>
      </label>
      <div class="kb-wa-buttons">
        <div
          v-for="(card, index) in cards"
          :key="(card as any).id || index"
          class="kb-carousel-card"
        >
          <div class="kb-carousel-card__head">
            <span class="kb-carousel-card__num">Card {{ index + 1 }}</span>
            <button type="button" class="kb-wa-btn-remove" @click="removeCard(Number(index))">Remove</button>
          </div>
          <div class="kb-field-inline-2">
            <div>
              <label class="kb-label kb-label--sm">Header type</label>
              <select
                class="kb-select"
                :value="(card as any).headerType ?? 'IMAGE'"
                @change="updateCard(Number(index), { headerType: ($event.target as HTMLSelectElement).value })"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>
            <div>
              <label class="kb-label kb-label--sm">Media handle ID</label>
              <input
                type="text"
                class="kb-input"
                placeholder="e.g. 6462811350485912"
                :value="(card as any).mediaId ?? ''"
                @input="updateCard(Number(index), { mediaId: ($event.target as HTMLInputElement).value })"
              />
            </div>
          </div>
          <div>
            <label class="kb-label kb-label--sm">Card body</label>
            <textarea
              class="kb-textarea"
              rows="2"
              placeholder="Card body text with {{1}} variables"
              :value="(card as any).body ?? ''"
              @input="updateCard(Number(index), { body: ($event.target as HTMLTextAreaElement).value })"
            />
          </div>
          <div>
            <label class="kb-label kb-label--sm">Sample text (body with real values for Meta approval)</label>
            <textarea
              class="kb-textarea"
              rows="2"
              placeholder="Card body with real values filled in"
              :value="(card as any).sampleText ?? ''"
              @input="updateCard(Number(index), { sampleText: ($event.target as HTMLTextAreaElement).value })"
            />
          </div>
          <div class="kb-carousel-card__btns">
            <label class="kb-label kb-label--sm">Card buttons</label>
            <div
              v-for="(cbtn, bi) in ((card as any).buttons ?? [])"
              :key="bi"
              class="kb-wa-button-row kb-wa-button-row--sm"
            >
              <input
                type="text"
                class="kb-input kb-input--btn-label"
                placeholder="Button label"
                :value="cbtn.label ?? ''"
                @input="updateCardButton(Number(index), Number(bi), { label: ($event.target as HTMLInputElement).value })"
              />
              <select
                class="kb-select kb-select--btn-type"
                :value="cbtn.type ?? 'QUICK_REPLY'"
                @change="updateCardButton(Number(index), Number(bi), { type: ($event.target as HTMLSelectElement).value })"
              >
                <option value="QUICK_REPLY">Quick reply</option>
                <option value="URL">Visit URL</option>
              </select>
              <template v-if="cbtn.type === 'URL'">
                <input
                  type="url"
                  class="kb-input kb-input--btn-target"
                  placeholder="https://example.com/shop?promo={{1}}"
                  :value="cbtn.url ?? ''"
                  @input="updateCardButton(Number(index), Number(bi), { url: ($event.target as HTMLInputElement).value })"
                />
                <input
                  type="url"
                  class="kb-input kb-input--btn-target"
                  placeholder="Example URL (e.g. https://example.com/shop?promo=SUMMER23)"
                  :value="cbtn.url_example ?? ''"
                  @input="updateCardButton(Number(index), Number(bi), { url_example: ($event.target as HTMLInputElement).value })"
                />
              </template>
              <button type="button" class="kb-wa-btn-remove" @click="removeCardButton(Number(index), Number(bi))">Remove</button>
            </div>
            <button
              type="button"
              class="kb-wa-btn-add"
              :disabled="((card as any).buttons ?? []).length >= 2"
              @click="addCardButton(Number(index))"
            >
              Add button
            </button>
          </div>
        </div>
        <button
          type="button"
          class="kb-wa-btn-add"
          :disabled="cards.length >= MAX_CAROUSEL_CARDS"
          @click="addCard"
        >
          Add card
        </button>
      </div>
    </div>

    <!-- MPM / Catalog configuration -->
    <div
      v-if="['mpm', 'catalog'].includes(currentFormat)"
      class="kb-field"
    >
      <label class="kb-label">
        Products
        <span class="kb-helper">
          Add product identifiers in the order they should appear in the WhatsApp template.
        </span>
      </label>
      <div class="kb-wa-buttons">
        <div
          v-for="(item, index) in products"
          :key="item.id || index"
          class="kb-product-row"
        >
          <input
            type="text"
            class="kb-input kb-input--btn-label"
            placeholder="Product ID"
            :value="item.productId"
            @input="updateProduct(Number(index), { productId: ($event.target as HTMLInputElement).value })"
          />
          <input
            type="text"
            class="kb-input kb-input--btn-target"
            placeholder="Section title (optional)"
            :value="item.sectionTitle"
            @input="updateProduct(Number(index), { sectionTitle: ($event.target as HTMLInputElement).value || undefined })"
          />
          <button
            type="button"
            class="kb-wa-btn-remove"
            @click="removeProduct(Number(index))"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="kb-wa-btn-add"
          @click="addProduct"
        >
          Add product
        </button>
      </div>
    </div>

    <!-- Authentication configuration -->
    <div
      v-if="currentFormat === 'auth'"
      class="kb-field"
    >
      <label class="kb-label">
        Authentication template
        <span class="kb-helper">Category must be AUTHENTICATION. Only OTP buttons allowed; no media, URLs, or custom body text.</span>
      </label>
      <select
        class="kb-select"
        :value="messageAny.auth_type ?? 'otp'"
        @change="
          (e) =>
            emitUpdate({
              auth_type: (e.target as HTMLSelectElement).value,
            })
        "
      >
        <option value="otp">One-time password (OTP)</option>
        <option value="login">Login approval</option>
      </select>
      <input
        type="text"
        class="kb-input"
        style="margin-top: 0.5rem"
        placeholder="Code label (e.g. Your code is {{ .otp_code }})"
        :value="messageAny.auth_label ?? ''"
        @input="
          (e) =>
            emitUpdate({
              auth_label: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
      <div class="kb-auth-options">
        <label class="kb-toggle-row">
          <input
            type="checkbox"
            class="kb-toggle"
            :checked="!!messageAny.add_security_recommendation"
            @change="(e) => emitUpdate({ add_security_recommendation: (e.target as HTMLInputElement).checked || undefined })"
          />
          <span class="kb-toggle-label">Add security recommendation (warns user not to share code)</span>
        </label>
        <div class="kb-auth-expiry">
          <label class="kb-label kb-label--sm">Code expiration (minutes)</label>
          <input
            type="number"
            class="kb-input kb-input--sm"
            placeholder="e.g. 10"
            min="1"
            :value="messageAny.code_expiration_minutes ?? ''"
            @input="
              (e) => {
                const v = parseInt((e.target as HTMLInputElement).value, 10);
                emitUpdate({ code_expiration_minutes: isNaN(v) ? undefined : v });
              }
            "
          />
        </div>
      </div>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Body
        <span class="kb-helper">
          Body is required. Use Go placeholders like &#123;&#123; .first_name &#125;&#125;, &#123;&#123; .order_id &#125;&#125;.
        </span>
        <span
          class="kb-counter"
          :class="{ 'kb-counter--warn': bodyText.length > BODY_LIMIT }"
        >
          {{ bodyText.length }}/{{ BODY_LIMIT }}
        </span>
      </label>
      <div class="kb-input-with-var">
        <textarea
          class="kb-textarea"
          rows="4"
          placeholder="Hi {{ .first_name }}, your order {{ .order_id }} has been shipped..."
          :value="bodyText"
          @input="
            (e) =>
              emitUpdate({
                body: (e.target as HTMLTextAreaElement).value || undefined,
              })
          "
        />
        <div class="kb-var-picker-wrap">
          <button type="button" class="kb-btn-insert" @click="toggleVarPicker('body')">&#123;&#123; .var &#125;&#125;</button>
          <div v-if="activeVarTarget === 'body'" class="kb-var-menu" role="menu">
            <button v-for="v in localVariables" :key="`wa-body-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVar('body', v)">{{ v }}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Body example (for Meta approval)
        <span class="kb-helper">Paste the body text with placeholders replaced by real sample values. Required by Meta for template approval.</span>
      </label>
      <textarea
        class="kb-textarea"
        rows="3"
        placeholder="Hi John, your order ORD-5531 has been shipped..."
        :value="messageAny.template_example ?? ''"
        @input="
          (e) =>
            emitUpdate({
              template_example: (e.target as HTMLTextAreaElement).value || undefined,
            })
        "
      />
    </div>

    <div v-if="templateFields.length > 0" class="kb-field kb-wa-template-fields">
      <label class="kb-label">Template fields</label>
      <p class="kb-helper">Placeholders used in header/body and whether they are configured.</p>
      <ul class="kb-wa-fields-list">
        <li v-for="f in templateFields" :key="f.name" class="kb-wa-field-item" :class="{ 'kb-wa-field-item--ok': f.configured }">
          <span class="kb-wa-field-name">{{ f.name }}</span>
          <span class="kb-wa-field-status">{{ f.configured ? 'Configured' : 'Missing' }}</span>
        </li>
      </ul>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Footer (optional)
        <span class="kb-helper">Small, muted line shown at the bottom of the message.</span>
      </label>
      <div class="kb-input-with-var">
        <input
          type="text"
          class="kb-input"
          placeholder="e.g. Reply STOP to unsubscribe"
          :value="footerText"
          @input="
            (e) =>
              emitUpdate({
                footer: (e.target as HTMLInputElement).value || undefined,
              })
          "
        />
        <div class="kb-var-picker-wrap">
          <button type="button" class="kb-btn-insert" @click="toggleVarPicker('footer')">&#123;&#123; .var &#125;&#125;</button>
          <div v-if="activeVarTarget === 'footer'" class="kb-var-menu" role="menu">
            <button v-for="v in localVariables" :key="`wa-footer-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVar('footer', v)">{{ v }}</button>
          </div>
        </div>
      </div>
      <div
        class="kb-counter kb-counter--inline"
        :class="{ 'kb-counter--warn': footerText.length > FOOTER_LIMIT }"
      >
        {{ footerText.length }}/{{ FOOTER_LIMIT }}
      </div>
    </div>

    <div v-if="bodyText.trim().length > 0" class="kb-field">
      <label class="kb-label">
        Buttons (optional)
        <span class="kb-helper">
          Use quick replies, CTA (URL/phone), or marketing opt-out. Max {{ MAX_BUTTONS }} buttons.
        </span>
      </label>
      <div class="kb-wa-buttons">
        <div
          v-for="(btn, index) in buttons"
          :key="btn.id || index"
          class="kb-wa-button-row"
        >
          <div class="kb-input-with-var kb-input-with-var--btn">
            <input
              type="text"
              class="kb-input kb-input--btn-label"
              placeholder="Button label (e.g. View order)"
              :value="btn.label"
              @input="updateButton(Number(index), { label: ($event.target as HTMLInputElement).value })"
            />
            <div class="kb-var-picker-wrap">
              <button type="button" class="kb-btn-insert" @click="toggleVarPicker(`btn-label:${index}`)">&#123;&#123; .var &#125;&#125;</button>
              <div v-if="activeVarTarget === `btn-label:${index}`" class="kb-var-menu" role="menu">
                <button v-for="v in localVariables" :key="`wa-btn-label-var-${index}-${v}`" type="button" class="kb-var-menu-item" @click="applyVar(`btn-label:${index}`, v)">{{ v }}</button>
              </div>
            </div>
          </div>
          <select
            class="kb-select kb-select--btn-type"
            :value="btn.type ?? 'quick_reply'"
            @change="updateButton(Number(index), { type: ($event.target as HTMLSelectElement).value })"
          >
            <option value="quick_reply">Quick reply</option>
            <option value="url">Visit URL</option>
            <option value="call">Call phone</option>
            <option value="copy_code">Copy coupon code</option>
            <option value="otp" :disabled="messageAny.template_category !== 'authentication'">OTP (authentication only)</option>
            <option value="opt_out">Marketing opt-out</option>
          </select>
          <!-- URL button fields -->
          <template v-if="btn.type === 'url'">
            <input
              type="url"
              class="kb-input kb-input--btn-target"
              placeholder="https://example.com/path/{{1}}"
              :value="btn.url"
              @input="updateButton(Number(index), { url: ($event.target as HTMLInputElement).value || undefined })"
            />
            <input
              type="url"
              class="kb-input kb-input--btn-target"
              placeholder="Example URL with real value (e.g. https://example.com/path/ORD-5531)"
              :value="btn.url_example"
              @input="updateButton(Number(index), { url_example: ($event.target as HTMLInputElement).value || undefined })"
            />
          </template>
          <!-- Phone button -->
          <input
            v-else-if="btn.type === 'call'"
            type="tel"
            class="kb-input kb-input--btn-target"
            placeholder="+1 555 123 4567"
            :value="btn.phone"
            @input="updateButton(Number(index), { phone: ($event.target as HTMLInputElement).value || undefined })"
          />
          <!-- Copy coupon code button -->
          <input
            v-else-if="btn.type === 'copy_code'"
            type="text"
            class="kb-input kb-input--btn-target"
            placeholder="Example coupon code (e.g. SAVE30DEC)"
            :value="btn.example"
            @input="updateButton(Number(index), { example: ($event.target as HTMLInputElement).value || undefined })"
          />
          <!-- OTP button (authentication only) -->
          <template v-else-if="btn.type === 'otp'">
            <select
              class="kb-select kb-select--btn-type"
              :value="btn.otp_type ?? 'COPY_CODE'"
              @change="updateButton(Number(index), { otp_type: ($event.target as HTMLSelectElement).value })"
            >
              <option value="COPY_CODE">Copy code</option>
              <option value="ONE_TAP">One-tap autofill</option>
            </select>
            <template v-if="btn.otp_type === 'ONE_TAP'">
              <input
                type="text"
                class="kb-input kb-input--btn-target"
                placeholder="Autofill button text (e.g. Tap to autofill)"
                :value="btn.autofill_text"
                @input="updateButton(Number(index), { autofill_text: ($event.target as HTMLInputElement).value || undefined })"
              />
              <input
                type="text"
                class="kb-input kb-input--btn-target"
                placeholder="Android package name (e.g. com.example.app)"
                :value="btn.package_name"
                @input="updateButton(Number(index), { package_name: ($event.target as HTMLInputElement).value || undefined })"
              />
              <input
                type="text"
                class="kb-input kb-input--btn-target"
                placeholder="App signature hash"
                :value="btn.signature_hash"
                @input="updateButton(Number(index), { signature_hash: ($event.target as HTMLInputElement).value || undefined })"
              />
            </template>
          </template>
          <!-- Opt-out -->
          <span v-else-if="btn.type === 'opt_out'" class="kb-opt-out-note">
            Sends a built-in opt-out action.
          </span>
          <button
            type="button"
            class="kb-wa-btn-remove"
            @click="removeButton(Number(index))"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="kb-wa-btn-add"
          :disabled="buttons.length >= MAX_BUTTONS"
          @click="addButton"
        >
          Add button
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kb-section {
  --wa-surface: var(--kb-surface, #ffffff);
  --wa-surface-muted: #f5f8fc;
  --wa-border: var(--kb-border, #d6e0eb);
  --wa-border-strong: #c6d4e4;
  --wa-text: var(--kb-text-strong, #0f172a);
  --wa-text-muted: var(--kb-text-muted, #56657a);
  --wa-focus: var(--kb-brand, #2563eb);
  margin-bottom: 1rem;
  border: 1px solid var(--wa-border);
  border-radius: 16px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
}
.kb-section__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 0.3rem;
}
.kb-section__title {
  font-size: 1.04rem;
  font-weight: 750;
  margin: 0;
  color: var(--wa-text);
  letter-spacing: 0.01em;
}
.kb-section__reset {
  font-size: 0.75rem;
  color: #334155;
  background: var(--wa-surface);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 0.36rem 0.62rem;
  border-radius: 999px;
  font-weight: 600;
}
.kb-section__reset:hover {
  color: #0f172a;
  background: #eef2f7;
}
.kb-section__desc {
  font-size: 0.875rem;
  color: var(--wa-text-muted);
  margin: 0;
  line-height: 1.45;
}
.kb-summary-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.8rem 0 1rem;
}
.kb-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.3rem 0.64rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
}
.kb-pill--category {
  color: #166534;
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.kb-pill--format {
  color: #1e40af;
  background: #eff6ff;
  border-color: #bfdbfe;
}
.kb-pill--status {
  color: #334155;
  background: #f3f6fa;
  border-color: #ccd6e2;
}
.kb-wa-fields-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}
.kb-wa-field-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.46rem 0.62rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  margin-bottom: 6px;
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #991b1b;
}
.kb-wa-field-item--ok {
  background: #ecfdf5;
  border-color: #86efac;
  color: #166534;
}
.kb-wa-field-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.kb-wa-field-status {
  font-size: 0.75rem;
  font-weight: 700;
}
.kb-field {
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
.kb-field:focus-within {
  border-color: #bad0ea;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 0 0 3px rgba(37, 99, 235, 0.08);
}
.kb-field:last-child {
  margin-bottom: 0;
}
.kb-field-half {
  min-width: 0;
}
.kb-field--inline {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 0.7rem;
  align-items: start;
}
.kb-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 720;
  color: var(--wa-text);
  margin-bottom: 0.46rem;
  letter-spacing: 0.02em;
}
.kb-helper {
  display: block;
  font-size: 0.75rem;
  color: var(--wa-text-muted);
  margin-top: 0.38rem;
  line-height: 1.35;
}
.kb-counter {
  font-size: 0.75rem;
  color: #334155;
  margin-left: 8px;
  font-weight: 700;
}
.kb-counter--inline {
  margin-left: 0;
  margin-top: 6px;
}
.kb-counter--warn {
  color: #b91c1c;
}
.kb-input,
.kb-textarea,
.kb-select {
  width: -webkit-fill-available;
  width: stretch;
  box-sizing: border-box;
  min-height: 44px;
  padding: 0.72rem 0.8rem;
  border: 1px solid #c6d3e2;
  border-radius: 11px;
  font-size: 0.9rem;
  color: #0f172a;
  background: #ffffff;
  transition: border-color 0.15s, box-shadow 0.15s, background-color 0.15s;
}
.kb-input:focus,
.kb-textarea:focus,
.kb-select:focus {
  outline: none;
  border-color: var(--wa-focus);
  box-shadow: 0 0 0 3px rgba(30, 90, 255, 0.16);
  background-color: #ffffff;
}
.kb-input::placeholder,
.kb-textarea::placeholder {
  color: #90a0b6;
}
.kb-textarea {
  resize: vertical;
  min-height: 86px;
  line-height: 1.45;
}
.kb-wa-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.68rem;
}
.kb-btn-insert {
  padding: 0.35rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}
.kb-btn-insert:hover {
  background: #f1f5f9;
}
.kb-input-with-var {
  position: relative;
  min-width: 0;
  width: -webkit-fill-available;
  width: stretch;
}
.kb-input-with-var .kb-input,
.kb-input-with-var .kb-textarea {
  padding-right: 104px;
}
.kb-input-with-var--btn .kb-input {
  padding-right: 98px;
}
.kb-var-picker-wrap {
  display: inline-flex;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
}
.kb-var-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 20;
  min-width: 170px;
  max-height: 220px;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid #d1dbe8;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
}
.kb-var-menu-item {
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
.kb-var-menu-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.kb-card-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 0.56rem;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface-muted);
  border-radius: 11px;
  padding: 0.56rem;
  align-items: center;
}
.kb-carousel-card {
  display: flex;
  flex-direction: column;
  gap: 0.56rem;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface-muted);
  border-radius: 12px;
  padding: 0.8rem;
}
.kb-carousel-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kb-carousel-card__num {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--wa-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.kb-carousel-card__btns {
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
  border-top: 1px solid var(--wa-border);
  padding-top: 0.56rem;
  margin-top: 0.2rem;
}
.kb-field-inline-2 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: 0.56rem;
  align-items: start;
}
.kb-wa-button-row--sm {
  padding: 0.44rem;
}
.kb-label--sm {
  font-size: 0.74rem;
  margin-bottom: 0.3rem;
}
.kb-field--toggles {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kb-toggle-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.kb-toggle {
  width: 16px;
  height: 16px;
  accent-color: var(--wa-focus);
  cursor: pointer;
  flex-shrink: 0;
}
.kb-toggle-label {
  font-size: 0.82rem;
  color: var(--wa-text);
}
.kb-auth-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--wa-border);
}
.kb-auth-expiry {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.kb-input--sm {
  max-width: 140px;
}
.kb-wa-button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.56rem;
  align-items: center;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface-muted);
  border-radius: 11px;
  padding: 0.56rem;
}
.kb-wa-button-row .kb-input--btn-label {
  flex: 1 1 220px;
}
.kb-wa-button-row .kb-input-with-var--btn {
  flex: 1 1 220px;
  min-width: 0;
}
.kb-wa-button-row .kb-select--btn-type {
  flex: 0 0 170px;
  min-width: 170px;
}
.kb-wa-button-row .kb-input--btn-target,
.kb-wa-button-row .kb-opt-out-note {
  flex: 1 1 220px;
}
.kb-product-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 0.56rem;
  align-items: center;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface-muted);
  border-radius: 11px;
  padding: 0.56rem;
}
.kb-product-row .kb-wa-btn-remove {
  justify-self: end;
}
.kb-card-row .kb-wa-btn-remove,
.kb-wa-button-row .kb-wa-btn-remove {
  justify-self: end;
  margin-left: auto;
}
.kb-wa-btn-add,
.kb-wa-btn-remove {
  font-size: 0.75rem;
  padding: 0.38rem 0.72rem;
  border-radius: 999px;
  border: 1px solid var(--wa-border-strong);
  background: #ffffff;
  cursor: pointer;
  color: #334155;
  font-weight: 700;
  transition: all 0.14s ease;
}
.kb-wa-btn-add {
  align-self: flex-start;
  background: #edf2ff;
  border-color: #c7d2fe;
  color: #1d4ed8;
}
.kb-wa-btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.kb-wa-btn-add:hover:not(:disabled),
.kb-wa-btn-remove:hover {
  background: #e8eef5;
}
.kb-opt-out-note {
  font-size: 0.75rem;
  color: #334155;
  background: #ecfeff;
  border: 1px solid #a5f3fc;
  border-radius: 999px;
  padding: 0.34rem 0.55rem;
  display: inline-flex;
  align-items: center;
  width: max-content;
}
.kb-meta-card {
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.65rem 0.75rem;
  min-height: 100%;
}
.kb-meta-title {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.4rem;
  letter-spacing: 0.02em;
}
.kb-meta-list {
  margin: 0;
  padding-left: 0.95rem;
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.5;
}
.kb-field--language-limits {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.7rem;
}
.kb-field--language-limits .kb-field-half {
  flex: 1 1 280px;
}
.kb-field--language-limits .kb-meta-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}
.kb-field--language-limits .kb-meta-list li {
  border: 1px solid #d7e3f1;
  background: #ffffff;
  border-radius: 999px;
  padding: 0.22rem 0.52rem;
  white-space: nowrap;
}
.kb-select {
  appearance: auto;
  background-image: none;
  padding-right: 0.8rem;
}
@media (max-width: 1480px) {
  .kb-field--inline {
    grid-template-columns: minmax(0, 1fr);
  }
  .kb-field--language-limits {
    display: flex;
    flex-wrap: wrap;
  }
}
@media (max-width: 1280px) {
  .kb-card-row,
  .kb-product-row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
  }
  .kb-product-row .kb-wa-btn-remove,
  .kb-card-row .kb-wa-btn-remove,
  .kb-wa-button-row .kb-wa-btn-remove {
    justify-self: start;
  }
}
@media (max-width: 1240px) {
  .kb-field {
    padding: 0.85rem;
  }
  .kb-input,
  .kb-textarea,
  .kb-select {
    font-size: 0.9rem;
  }
}
@media (max-width: 720px) {
  .kb-section {
    padding: 0.75rem;
  }
  .kb-input-with-var .kb-input,
  .kb-input-with-var .kb-textarea {
    padding-right: 90px;
  }
  .kb-btn-insert {
    padding: 0.28rem 0.54rem;
    font-size: 0.73rem;
  }
  .kb-opt-out-note {
    width: 100%;
  }
  .kb-card-row,
  .kb-product-row {
    grid-template-columns: minmax(0, 1fr);
  }
}

.kb-field--inline .kb-location-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.kb-field--inline .kb-location-row .kb-input {
  flex: 1 1 180px;
}
.kb-location-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.kb-location-row .kb-input {
  flex: 1 1 180px;
}
</style>
