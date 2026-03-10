<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CampaignMessage } from '@keos/notification-builder-core';

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    showReset?: boolean;
    disabledCategories?: string[];
    disabledFormats?: string[];
    /**
     * Controls how variable placeholders are inserted into template fields.
     * - 'named'    (default) — inserts `{{ .variable_name }}` tokens; your backend converts them to positional `{{1}}` at send time.
     * - 'numbered' — inserts `{{1}}`, `{{2}}`… directly; standard Gupshup / WhatsApp format.
     */
    placeholderMode?: 'named' | 'numbered';
    /**
     * Your backend endpoint that accepts a multipart/form-data POST with a
     * `file` field and returns `{ mediaId: string }` (or `media_id` / `handle`).
     * When provided, an upload widget appears next to the Media Handle field.
     */
    mediaUploadUrl?: string;
    /** Optional headers sent with the media upload POST. */
    mediaUploadHeaders?: Record<string, string>;
  }>(),
  {
    showReset: false,
    disabledCategories: () => [],
    disabledFormats: () => [],
    placeholderMode: 'named',
    mediaUploadUrl: undefined,
    mediaUploadHeaders: undefined,
  }
);

const emit = defineEmits<{
  update: [partial: any];
  reset: [];
}>();

// ── HEADER component type options ────────────────────────────────────────────
const HEADER_TYPE_OPTIONS = [
  { value: 'none',     label: 'None',         hint: 'No header component.' },
  { value: 'text',     label: 'Text',          hint: 'Bold heading above the body. Max 60 chars. Supports one {{1}} variable.' },
  { value: 'image',    label: 'Image',         hint: 'JPEG or PNG. Max 5 MB. Cropped to 1.91:1 in chat.' },
  { value: 'video',    label: 'Video',         hint: 'MP4 only (H.264 + AAC). Max 16 MB.' },
  { value: 'document', label: 'Document',      hint: 'PDF only. Max 100 MB. Set a filename at send time.' },
  { value: 'location', label: 'Location pin',  hint: 'Map pin injected at send time. No media upload needed.' },
] as const;

// ── Template variant options (special non-standard types) ────────────────────
const VARIANT_OPTIONS = [
  { value: 'standard', label: 'Standard',          hint: 'Standard HEADER + BODY + FOOTER + BUTTONS structure.' },
  { value: 'carousel', label: 'Carousel',           hint: 'Up to 10 cards with media + body + buttons. MARKETING only.' },
  { value: 'flow',     label: 'WhatsApp Flow',      hint: 'Launches a multi-step in-chat flow.' },
  { value: 'lto',      label: 'Limited-time offer', hint: 'Adds offer-expiry urgency. MARKETING only.' },
  { value: 'catalog',  label: 'Catalog',            hint: 'Opens the WhatsApp catalog. MARKETING only.' },
  { value: 'mpm',      label: 'Multi-product',      hint: 'Multiple products in one message. MARKETING only.' },
] as const;

const VARIANTS_BY_CATEGORY: Record<string, readonly string[]> = {
  marketing:      ['standard', 'carousel', 'flow', 'lto', 'catalog', 'mpm'],
  utility:        ['standard', 'flow'],
  authentication: [],
};

// ── Button types per category ────────────────────────────────────────────────
const BUTTON_TYPES_BY_CATEGORY: Record<string, readonly string[]> = {
  marketing:      ['quick_reply', 'url', 'call', 'copy_code', 'opt_out'],
  utility:        ['quick_reply', 'url', 'call'],
  authentication: ['otp'],
};

const ALL_BUTTON_TYPE_OPTIONS = [
  { value: 'quick_reply', label: 'Quick reply' },
  { value: 'url',         label: 'Visit URL' },
  { value: 'call',        label: 'Call phone' },
  { value: 'copy_code',   label: 'Copy coupon code' },
  { value: 'opt_out',     label: 'Marketing opt-out' },
  { value: 'otp',         label: 'OTP (auth only)' },
] as const;

const HEADER_LIMIT = 60;
const BODY_LIMIT = 1024;
const FOOTER_LIMIT = 60;
const MAX_BUTTONS = 10;
const MAX_CAROUSEL_CARDS = 10;

// ── Reactive accessors ────────────────────────────────────────────────────────
const messageAny   = computed(() => props.message as any);
const currentFormat = computed(() => String(messageAny.value.template_type ?? 'text').trim());
const currentCategory = computed(() => String(messageAny.value.template_category ?? 'marketing').trim());
const headerType   = computed(() => String(messageAny.value.header_type ?? 'none').trim());
const headerText   = computed(() => String(messageAny.value.header ?? ''));
const bodyText     = computed(() => String(messageAny.value.body ?? ''));
const footerText   = computed(() => String(messageAny.value.footer ?? ''));
const buttons      = computed(() => (messageAny.value.buttons as any[]) ?? []);
const products     = computed(() => (messageAny.value.products as any[]) ?? []);
const cards        = computed(() => (messageAny.value.cards as any[]) ?? []);

// ── Derived state ────────────────────────────────────────────────────────────
const isAuth = computed(() => currentCategory.value === 'authentication');

const currentVariant = computed(() => {
  const f = currentFormat.value;
  if (['carousel', 'flow', 'lto', 'catalog', 'mpm'].includes(f)) return f;
  return 'standard';
});
const isSpecialVariant = computed(() => currentVariant.value !== 'standard');

const availableVariants = computed(() => {
  const allowed = new Set(VARIANTS_BY_CATEGORY[currentCategory.value] ?? VARIANTS_BY_CATEGORY.marketing);
  const disabled = new Set((props.disabledFormats ?? []).map(v => String(v).trim()));
  return VARIANT_OPTIONS.filter(v => allowed.has(v.value) && !disabled.has(v.value));
});

const availableHeaderTypes = computed(() => {
  const disabled = new Set((props.disabledFormats ?? []).map(v => String(v).trim()));
  return HEADER_TYPE_OPTIONS.filter(h => !disabled.has(h.value));
});

const availableButtonTypes = computed(() => {
  const allowed = new Set(BUTTON_TYPES_BY_CATEGORY[currentCategory.value] ?? BUTTON_TYPES_BY_CATEGORY.marketing);
  return ALL_BUTTON_TYPE_OPTIONS.filter(t => allowed.has(t.value));
});

const maxButtons = computed(() => isAuth.value ? 1 : MAX_BUTTONS);

/** True when any non-QR CTA button is mixed with QR buttons (ordering reminder). */
const hasMixedButtonTypes = computed(() => {
  const hasQR = buttons.value.some((b: any) => b.type === 'quick_reply' || b.type === 'opt_out');
  const hasCTA = buttons.value.some((b: any) => ['url', 'call', 'copy_code'].includes(b.type));
  return hasQR && hasCTA;
});

const categoryLabel = computed(() => {
  const raw = currentCategory.value;
  if (!raw) return 'Uncategorized';
  return raw.charAt(0).toUpperCase() + raw.slice(1);
});

const variantLabel = computed(() => {
  if (isAuth.value) return 'Authentication OTP';
  if (currentVariant.value !== 'standard') {
    return VARIANT_OPTIONS.find(v => v.value === currentVariant.value)?.label ?? 'Standard';
  }
  const ht = HEADER_TYPE_OPTIONS.find(h => h.value === headerType.value);
  return ht && ht.value !== 'none' ? `${ht.label} header` : 'Text only';
});

const setupProgressLabel = computed(() => {
  if (!messageAny.value.template_name) return 'Needs setup';
  if (!isAuth.value && !bodyText.value.trim()) return 'Draft';
  return 'Ready to validate';
});

/** Auth body preview based on current options. */
const authBodyPreview = computed(() => {
  const parts = ['{{OTP}} is your verification code.'];
  if (messageAny.value.add_security_recommendation) parts.push('For your security, do not share this code.');
  if (messageAny.value.code_expiration_minutes) parts.push(`This code expires in ${messageAny.value.code_expiration_minutes} minutes.`);
  return parts.join(' ');
});

// ── Placeholder mode ─────────────────────────────────────────────────────────
const varPickerBtnLabel = computed(() =>
  props.placeholderMode === 'named' ? '{{ .var }}' : '{{N}}'
);

function getNextVarIndex(text: string): number {
  const re = /\{\{(\d+)\}\}/g;
  let max = 0;
  let m;
  while ((m = re.exec(text)) !== null) max = Math.max(max, Number(m[1]));
  return max + 1;
}

// ── Variable handling ─────────────────────────────────────────────────────────
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
  const body   = (props.message as any).body ?? props.message.body ?? '';
  const vars   = new Set((props.message.variables ?? []) as string[]);
  const uniq   = Array.from(new Set([...extractPlaceholders(header), ...extractPlaceholders(body)]));
  return uniq.map(name => ({ name, configured: vars.has(name) }));
});

const defaultVariables = [
  'first_name', 'last_name', 'full_name', 'order_id', 'order_status',
  'tracking_url', 'delivery_date', 'appointment_date', 'appointment_time',
  'otp_code', 'coupon_code', 'product_name', 'store_name',
  'support_phone', 'city', 'country',
];
const localVariables = computed(() => {
  const vars = ((props.message.variables ?? []) as string[]).filter(Boolean);
  return vars.length ? Array.from(new Set(vars)) : defaultVariables;
});
const activeVarTarget = ref<string | null>(null);

// ── Media upload ─────────────────────────────────────────────────────────────
const mediaUploadFileRef   = ref<HTMLInputElement | null>(null);
const mediaUploadFile      = ref<File | null>(null);
const mediaUploadStatus    = ref<'idle' | 'uploading' | 'done' | 'error'>('idle');
const mediaUploadError     = ref<string>('');
const isDragging           = ref(false);

function onMediaFileSelected(e: Event) {
  const input = e.target as HTMLInputElement;
  mediaUploadFile.value    = input.files?.[0] ?? null;
  mediaUploadStatus.value  = 'idle';
  mediaUploadError.value   = '';
}

function onFileDrop(e: DragEvent) {
  isDragging.value = false;
  const file = e.dataTransfer?.files?.[0] ?? null;
  if (file) { mediaUploadFile.value = file; mediaUploadStatus.value = 'idle'; mediaUploadError.value = ''; }
}

async function doUploadMedia() {
  if (!mediaUploadFile.value || !props.mediaUploadUrl) return;
  mediaUploadStatus.value = 'uploading';
  mediaUploadError.value  = '';
  try {
    const form = new FormData();
    form.append('file', mediaUploadFile.value);
    const response = await fetch(props.mediaUploadUrl, {
      method: 'POST',
      headers: props.mediaUploadHeaders ?? {},
      body: form,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      throw new Error(`${response.status}: ${text}`);
    }
    const data = await response.json() as Record<string, unknown>;
    const mediaId =
      (data.mediaId  as string | undefined) ??
      (data.media_id as string | undefined) ??
      (data.handle   as string | undefined) ??
      (data.id       as string | undefined);
    if (!mediaId) throw new Error(`No mediaId in response: ${JSON.stringify(data)}`);
    emitUpdate({ media_handle: mediaId });
    mediaUploadStatus.value  = 'done';
    mediaUploadFile.value    = null;
    if (mediaUploadFileRef.value) mediaUploadFileRef.value.value = '';
  } catch (err) {
    mediaUploadStatus.value = 'error';
    mediaUploadError.value  = err instanceof Error ? err.message : String(err);
  }
}

// ── Emit helper ───────────────────────────────────────────────────────────────
function emitUpdate(partial: Record<string, unknown>) {
  emit('update', partial);
}

// ── Variable picker ───────────────────────────────────────────────────────────
function toggleVarPicker(target: string) {
  if (props.placeholderMode === 'numbered') {
    applyVar(target, '');
    return;
  }
  activeVarTarget.value = activeVarTarget.value === target ? null : target;
}

function applyVar(target: string, variable: string) {
  const isNamed  = props.placeholderMode !== 'numbered';
  const existing = ((props.message.variables ?? []) as string[]).filter(Boolean);
  const nextVars = isNamed && variable ? Array.from(new Set([...existing, variable])) : existing;

  function makeToken(currentText: string): string {
    if (isNamed) return ` {{ .${variable} }}`;
    return ` {{${getNextVarIndex(currentText)}}}`;
  }

  if (target === 'header') {
    const cur = headerText.value || '';
    emitUpdate({ header: `${cur}${makeToken(cur)}`, variables: nextVars });
  } else if (target === 'body') {
    const cur = bodyText.value || '';
    emitUpdate({ body: `${cur}${makeToken(cur)}`, variables: nextVars });
  } else if (target.startsWith('btn-label:')) {
    const idx = Number(target.split(':')[1]);
    if (Number.isFinite(idx)) {
      const cur = String(buttons.value[idx]?.label ?? '');
      updateButton(idx, { label: `${cur}${makeToken(cur)}` });
    }
    if (isNamed && variable) emitUpdate({ variables: nextVars });
  } else if (target.startsWith('btn-url:')) {
    const idx = Number(target.split(':')[1]);
    if (Number.isFinite(idx)) {
      const cur = String(buttons.value[idx]?.url ?? '');
      updateButton(idx, { url: `${cur}${makeToken(cur)}` });
    }
    if (isNamed && variable) emitUpdate({ variables: nextVars });
  } else if (target.startsWith('card-body:')) {
    const cardIdx = Number(target.split(':')[1]);
    if (Number.isFinite(cardIdx)) {
      const cur = String((cards.value[cardIdx] as any)?.body ?? '');
      updateCard(cardIdx, { body: `${cur}${makeToken(cur)}` });
    }
    if (isNamed && variable) emitUpdate({ variables: nextVars });
  }
  activeVarTarget.value = null;
}

// ── Category change ───────────────────────────────────────────────────────────
function onCategoryChange(value: string) {
  const partial: Record<string, unknown> = { template_category: value || undefined };

  if (value === 'authentication') {
    // Auth is always TEXT templateType + no header/footer.
    partial.template_type = 'auth';
    partial.header_type   = undefined;
    partial.header        = undefined;
    partial.footer        = undefined;
    partial.allow_category_change = undefined;
    partial.media_url     = undefined;
    partial.media_handle  = undefined;
    partial.media_caption = undefined;
    partial.document_filename = undefined;
    // Sanitize buttons: auth only allows OTP.
    const filtered = buttons.value.filter((b: any) => (b.type ?? 'quick_reply') === 'otp');
    partial.buttons = filtered;
  } else {
    // Restore a sensible template_type when leaving auth.
    if (currentFormat.value === 'auth') partial.template_type = 'text';
    // Sanitize buttons: remove button types not allowed in target category.
    const allowed = new Set(BUTTON_TYPES_BY_CATEGORY[value] ?? BUTTON_TYPES_BY_CATEGORY.marketing);
    const filtered = buttons.value.filter((b: any) => allowed.has(b.type ?? 'quick_reply'));
    if (filtered.length !== buttons.value.length) partial.buttons = filtered;
    // Remove special variants not available for target category.
    const allowedVariants = new Set(VARIANTS_BY_CATEGORY[value] ?? VARIANTS_BY_CATEGORY.marketing);
    if (!allowedVariants.has(currentVariant.value)) partial.template_type = 'text';
  }

  emitUpdate(partial);
}

// ── Variant change (special types) ───────────────────────────────────────────
function onVariantChange(value: string) {
  const partial: Record<string, unknown> = {};
  if (value === 'standard') {
    const ht = headerType.value;
    partial.template_type = ['image', 'video', 'document'].includes(ht) ? ht : 'text';
  } else {
    partial.template_type = value;
    if (value === 'carousel') {
      partial.header_type = undefined;
      partial.header      = undefined;
      partial.footer      = undefined;
    }
  }
  emitUpdate(partial);
}

// ── Header component type change ──────────────────────────────────────────────
function onHeaderTypeChange(value: string) {
  const partial: Record<string, unknown> = { header_type: value };
  // Sync templateType: media headers require their own templateType value.
  if (value === 'image' || value === 'video' || value === 'document') {
    partial.template_type = value;
  } else {
    partial.template_type = 'text';
  }
  // Clear media fields when leaving media header types.
  if (!['image', 'video', 'document'].includes(value)) {
    partial.media_url      = undefined;
    partial.media_handle   = undefined;
    partial.media_caption  = undefined;
    partial.document_filename = undefined;
  }
  // Clear text header when leaving text header type.
  if (value !== 'text') {
    partial.header = undefined;
  }
  emitUpdate(partial);
}

// ── Button management ─────────────────────────────────────────────────────────
function updateButton(index: number, patch: Record<string, unknown>) {
  const next = [...buttons.value];
  next[index] = { ...next[index], id: next[index]?.id || `btn_${index + 1}`, ...patch };
  emitUpdate({ buttons: next });
}
function removeButton(index: number) {
  const next = [...buttons.value];
  next.splice(index, 1);
  emitUpdate({ buttons: next });
}
function addButton() {
  if (buttons.value.length >= maxButtons.value) return;
  const defaultType = availableButtonTypes.value[0]?.value ?? 'quick_reply';
  const next = [...buttons.value];
  next.push({ id: `btn_${next.length + 1}`, label: '', type: defaultType });
  emitUpdate({ buttons: next });
}

// ── Product management ────────────────────────────────────────────────────────
function updateProduct(index: number, patch: Record<string, unknown>) {
  const next = [...products.value];
  next[index] = { ...next[index], id: next[index]?.id || `prod_${index + 1}`, ...patch };
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

// ── Carousel card management ──────────────────────────────────────────────────
function updateCard(index: number, patch: Record<string, unknown>) {
  const next = [...cards.value];
  next[index] = { ...next[index], id: next[index]?.id || `card_${index + 1}`, ...patch };
  emitUpdate({ cards: next });
}
function removeCard(index: number) {
  const next = [...cards.value];
  next.splice(index, 1);
  emitUpdate({ cards: next });
}
function addCard() {
  const next = [...cards.value];
  next.push({ id: `card_${next.length + 1}`, headerType: 'IMAGE', mediaId: '', body: '', sampleText: '', buttons: [] });
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

    <!-- ── Section header ──────────────────────────────────────────────────── -->
    <div class="kb-section__head">
      <h3 class="kb-section__title">WhatsApp template</h3>
      <button v-if="showReset" type="button" class="kb-section__reset" @click="$emit('reset')">
        Reset
      </button>
    </div>
    <p class="kb-section__desc">
      Build your template by configuring each component. Constraints are enforced per Gupshup's API rules.
    </p>

    <!-- ── Summary pills ───────────────────────────────────────────────────── -->
    <div class="kb-summary-bar">
      <span class="kb-pill kb-pill--category">{{ categoryLabel }}</span>
      <span class="kb-pill kb-pill--format">{{ variantLabel }}</span>
      <span class="kb-pill kb-pill--status">{{ setupProgressLabel }}</span>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════════
         TEMPLATE SETUP — Metadata (not components)
         ══════════════════════════════════════════════════════════════════════ -->
    <div class="kb-setup-group">

      <!-- Category -->
      <div class="kb-field">
        <label class="kb-label">
          Category
          <span class="kb-helper">Defines the business intent and pricing bucket.</span>
        </label>
        <select
          class="kb-select"
          :value="messageAny.template_category ?? ''"
          @change="onCategoryChange(($event.target as HTMLSelectElement).value)"
        >
          <option value="">Select category</option>
          <option
            v-for="opt in [{ value: 'marketing', label: 'Marketing' }, { value: 'utility', label: 'Utility' }, { value: 'authentication', label: 'Authentication' }]"
            :key="opt.value"
            :value="opt.value"
            :disabled="new Set((disabledCategories ?? []).map(v => String(v))).has(opt.value)"
          >
            {{ opt.label }}{{ new Set((disabledCategories ?? []).map(v => String(v))).has(opt.value) ? ' (Disabled)' : '' }}
          </option>
        </select>
      </div>

      <!-- Template variant (special types only; not shown for auth) -->
      <div v-if="!isAuth && availableVariants.length > 1" class="kb-field">
        <label class="kb-label">
          Template variant
          <span class="kb-helper">Standard uses the 4-component structure. Special types have their own configuration.</span>
        </label>
        <select
          class="kb-select"
          :value="currentVariant"
          @change="onVariantChange(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="v in availableVariants" :key="v.value" :value="v.value">
            {{ v.label }}
          </option>
        </select>
        <span class="kb-helper">{{ VARIANT_OPTIONS.find(v => v.value === currentVariant)?.hint }}</span>
      </div>

      <!-- Template name -->
      <div class="kb-field">
        <label class="kb-label">
          Template name
          <span class="kb-helper">Auto-synced from campaign name. Must be lowercase with underscores.</span>
        </label>
        <input type="text" class="kb-input" :value="messageAny.template_name ?? ''" readonly disabled />
      </div>

      <!-- Language + char limits -->
      <div class="kb-field kb-field--inline kb-field--language-limits">
        <div class="kb-field-half">
          <label class="kb-label">
            Language
            <span class="kb-helper">Locale code, e.g. en, en_US, pt_BR, hi.</span>
          </label>
          <input
            type="text"
            class="kb-input"
            placeholder="e.g. en_US"
            :value="messageAny.template_language ?? ''"
            @input="(e) => emitUpdate({ template_language: (e.target as HTMLInputElement).value || undefined })"
          />
        </div>
        <div class="kb-field-half">
          <div class="kb-meta-card">
            <span class="kb-meta-title">Component limits</span>
            <ul class="kb-meta-list">
              <li>Header text: {{ HEADER_LIMIT }} chars</li>
              <li>Body: {{ BODY_LIMIT }} chars</li>
              <li>Footer: {{ FOOTER_LIMIT }} chars · no variables</li>
              <li>Buttons: {{ maxButtons }} max · label 25 chars</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Vertical -->
      <div class="kb-field">
        <label class="kb-label">
          Vertical (use-case label)
          <span class="kb-helper">Business use-case shown during Meta review. Required (e.g. "Order Updates", "Promotions", "Authentication").</span>
        </label>
        <input
          type="text"
          class="kb-input"
          placeholder="e.g. Order Updates"
          :value="messageAny.vertical ?? ''"
          @input="(e) => emitUpdate({ vertical: (e.target as HTMLInputElement).value || undefined })"
        />
      </div>

      <!-- Submission options -->
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
        <label v-if="!isAuth" class="kb-toggle-row">
          <input
            type="checkbox"
            class="kb-toggle"
            :checked="!!messageAny.allow_category_change"
            @change="(e) => emitUpdate({ allow_category_change: (e.target as HTMLInputElement).checked || undefined })"
          />
          <span class="kb-toggle-label">Allow Meta to re-categorize this template</span>
        </label>
      </div>
    </div>
    <!-- end setup group -->


    <!-- ══════════════════════════════════════════════════════════════════════
         SPECIAL VARIANT CONFIGURATION (carousel / flow / lto / catalog / mpm)
         ══════════════════════════════════════════════════════════════════════ -->

    <!-- Carousel -->
    <div v-if="currentVariant === 'carousel'" class="kb-field">
      <label class="kb-label">
        Carousel cards
        <span class="kb-helper">MARKETING only. Each card: IMAGE or VIDEO header + body + up to 2 buttons. All cards must use the same header type. Max {{ MAX_CAROUSEL_CARDS }} cards.</span>
      </label>
      <div class="kb-wa-buttons">
        <div v-for="(card, index) in cards" :key="(card as any).id || index" class="kb-carousel-card">
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
            <div class="kb-input-with-var">
              <textarea
                class="kb-textarea"
                rows="2"
                :placeholder="placeholderMode === 'named' ? 'Card body with {{ .variable }} tokens' : 'Card body text with {{1}} variables'"
                :value="(card as any).body ?? ''"
                @input="updateCard(Number(index), { body: ($event.target as HTMLTextAreaElement).value })"
              />
              <div class="kb-var-picker-wrap">
                <button type="button" class="kb-btn-insert" @click="toggleVarPicker(`card-body:${index}`)">{{ varPickerBtnLabel }}</button>
                <div v-if="activeVarTarget === `card-body:${index}`" class="kb-var-menu" role="menu">
                  <button v-for="v in localVariables" :key="`wa-card-body-var-${index}-${v}`" type="button" class="kb-var-menu-item" @click="applyVar(`card-body:${index}`, v)">{{ v }}</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="kb-label kb-label--sm">Sample body (body with real values for Meta approval)</label>
            <textarea
              class="kb-textarea"
              rows="2"
              placeholder="Card body with all variables replaced by realistic values"
              :value="(card as any).sampleText ?? ''"
              @input="updateCard(Number(index), { sampleText: ($event.target as HTMLTextAreaElement).value })"
            />
          </div>
          <div class="kb-carousel-card__btns">
            <label class="kb-label kb-label--sm">Card buttons (max 2)</label>
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
                  placeholder="Example URL with real value"
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
        <button type="button" class="kb-wa-btn-add" :disabled="cards.length >= MAX_CAROUSEL_CARDS" @click="addCard">
          Add card
        </button>
      </div>
    </div>

    <!-- Flow -->
    <div v-if="currentVariant === 'flow'" class="kb-field">
      <label class="kb-label">
        WhatsApp Flow
        <span class="kb-helper">Connect this template to a published Flow.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="Flow ID"
        :value="messageAny.flow_id ?? ''"
        @input="(e) => emitUpdate({ flow_id: (e.target as HTMLInputElement).value || undefined })"
      />
      <input
        type="text"
        class="kb-input"
        style="margin-top:0.44rem"
        placeholder="Flow CTA label (e.g. Start booking)"
        :value="messageAny.flow_cta_label ?? ''"
        @input="(e) => emitUpdate({ flow_cta_label: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>

    <!-- LTO -->
    <div v-if="currentVariant === 'lto'" class="kb-field">
      <label class="kb-label">
        Offer expiry
        <span class="kb-helper">When this limited-time offer expires.</span>
      </label>
      <input
        type="datetime-local"
        class="kb-input"
        :value="messageAny.lto_expiry ?? ''"
        @input="(e) => emitUpdate({ lto_expiry: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>

    <!-- Catalog / MPM products -->
    <div v-if="['mpm', 'catalog'].includes(currentVariant)" class="kb-field">
      <label class="kb-label">
        Products
        <span class="kb-helper">Add product identifiers in the order they should appear.</span>
      </label>
      <div class="kb-wa-buttons">
        <div v-for="(item, index) in products" :key="item.id || index" class="kb-product-row">
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
          <button type="button" class="kb-wa-btn-remove" @click="removeProduct(Number(index))">Remove</button>
        </div>
        <button type="button" class="kb-wa-btn-add" @click="addProduct">Add product</button>
      </div>
    </div>


    <!-- ══════════════════════════════════════════════════════════════════════
         STANDARD COMPONENT BUILDER
         ══════════════════════════════════════════════════════════════════════ -->
    <template v-if="!isSpecialVariant">

      <!-- ── HEADER Component ──────────────────────────────────────────────── -->
      <div v-if="!isAuth" class="kb-comp kb-comp--header">
        <div class="kb-comp__head">
          <span class="kb-comp__badge kb-comp__badge--header">HEADER</span>
          <span class="kb-comp__meta">Optional &nbsp;·&nbsp; MARKETING &amp; UTILITY only</span>
        </div>
        <div class="kb-comp__body">

          <!-- Header type selector -->
          <div class="kb-field-no-border">
            <label class="kb-label">Header type</label>
            <div class="kb-header-type-grid">
              <button
                v-for="ht in availableHeaderTypes"
                :key="ht.value"
                type="button"
                class="kb-header-type-btn"
                :class="{ 'kb-header-type-btn--active': headerType === ht.value }"
                @click="onHeaderTypeChange(ht.value)"
              >
                <span class="kb-header-type-btn__label">{{ ht.label }}</span>
              </button>
            </div>
            <span v-if="headerType !== 'none'" class="kb-helper">
              {{ HEADER_TYPE_OPTIONS.find(h => h.value === headerType)?.hint }}
            </span>
          </div>

          <!-- TEXT header fields -->
          <template v-if="headerType === 'text'">
            <div class="kb-field-no-border" style="margin-top:0.7rem">
              <label class="kb-label">
                Header text
                <span
                  class="kb-counter"
                  :class="{ 'kb-counter--warn': headerText.length > HEADER_LIMIT }"
                >{{ headerText.length }}/{{ HEADER_LIMIT }}</span>
              </label>
              <div class="kb-input-with-var">
                <input
                  type="text"
                  class="kb-input"
                  :placeholder="placeholderMode === 'named' ? 'e.g. Order update for {{ .first_name }}' : 'e.g. Order update for {{1}}'"
                  :value="headerText"
                  @input="(e) => emitUpdate({ header: (e.target as HTMLInputElement).value || undefined })"
                />
                <div class="kb-var-picker-wrap">
                  <button type="button" class="kb-btn-insert" @click="toggleVarPicker('header')">{{ varPickerBtnLabel }}</button>
                  <div v-if="activeVarTarget === 'header'" class="kb-var-menu" role="menu">
                    <button v-for="v in localVariables" :key="`wa-header-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVar('header', v)">{{ v }}</button>
                  </div>
                </div>
              </div>
              <span class="kb-helper">Supports one <code class="kb-code">&#123;&#123;1&#125;&#125;</code> variable (sent as last param at send time).</span>
            </div>
          </template>

          <!-- IMAGE / VIDEO / DOCUMENT header fields -->
          <template v-else-if="['image', 'video', 'document'].includes(headerType)">
            <div style="margin-top:0.7rem;display:flex;flex-direction:column;gap:0.6rem">

              <!-- Media URL (send-time, optional preview) -->
              <div>
                <label class="kb-label kb-label--sm">
                  Media URL <span class="kb-tag-opt">send-time</span>
                </label>
                <input
                  type="url"
                  class="kb-input"
                  placeholder="https://..."
                  :value="messageAny.media_url ?? ''"
                  @input="(e) => emitUpdate({ media_url: (e.target as HTMLInputElement).value || undefined })"
                />
                <span class="kb-helper">Public URL sent in the <code class="kb-code">message</code> field at send time.</span>
              </div>

              <!-- Media handle (exampleMedia — required for approval) -->
              <div>
                <label class="kb-label kb-label--sm">
                  Media handle — <code class="kb-code">exampleMedia</code> <span class="kb-tag-req">required for approval</span>
                </label>
                <input
                  type="text"
                  class="kb-input"
                  placeholder="e.g. 746306494021786"
                  :value="messageAny.media_handle ?? ''"
                  @input="(e) => emitUpdate({ media_handle: (e.target as HTMLInputElement).value || undefined })"
                />
                <span class="kb-helper">
                  Upload Handle ID from Gupshup media API — <strong>not a URL</strong>. Use the uploader below or paste an existing handle.
                </span>

                <!-- Compact upload widget -->
                <div class="kb-mu">
                  <input
                    ref="mediaUploadFileRef"
                    type="file"
                    class="kb-mu__file-input"
                    accept="image/jpeg,image/png,video/mp4,application/pdf"
                    @change="onMediaFileSelected"
                  />
                  <div
                    class="kb-mu__row"
                    :class="{
                      'kb-mu__row--drag': isDragging,
                      'kb-mu__row--done': mediaUploadStatus === 'done',
                      'kb-mu__row--error': mediaUploadStatus === 'error',
                    }"
                    @dragover.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="onFileDrop"
                  >
                    <div class="kb-mu__left" @click="mediaUploadUrl ? mediaUploadFileRef?.click() : undefined">
                      <template v-if="mediaUploadStatus === 'done'">
                        <svg class="kb-mu__icon kb-mu__icon--ok" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#dcfce7" stroke="#16a34a" stroke-width="1.2"/><path d="M5 8l2.5 2.5L11 5.5" stroke="#16a34a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <span class="kb-mu__text kb-mu__text--ok">Handle applied</span>
                      </template>
                      <template v-else-if="mediaUploadFile">
                        <svg class="kb-mu__icon" viewBox="0 0 16 16" fill="none"><path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
                        <span class="kb-mu__text kb-mu__text--file">{{ mediaUploadFile.name }}</span>
                        <span class="kb-mu__size">{{ (mediaUploadFile.size / 1024).toFixed(0) }} KB</span>
                      </template>
                      <template v-else>
                        <svg class="kb-mu__icon kb-mu__icon--muted" viewBox="0 0 16 16" fill="none"><path d="M8 10V4m0 0L5.5 6.5M8 4l2.5 2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                        <span class="kb-mu__text kb-mu__text--hint">
                          {{ !mediaUploadUrl ? 'Set mediaUploadUrl prop to enable uploads' : (isDragging ? 'Drop file' : 'Click or drop · JPEG PNG MP4 PDF') }}
                        </span>
                      </template>
                    </div>
                    <div class="kb-mu__right">
                      <template v-if="mediaUploadStatus === 'done'">
                        <button type="button" class="kb-mu__btn kb-mu__btn--ghost" @click="mediaUploadStatus = 'idle'; mediaUploadFile = null; if (mediaUploadFileRef) mediaUploadFileRef.value = '';">Upload another</button>
                      </template>
                      <template v-else-if="mediaUploadFile">
                        <button type="button" class="kb-mu__btn kb-mu__btn--ghost" @click.stop="mediaUploadFile = null; mediaUploadStatus = 'idle'; mediaUploadError = ''; if (mediaUploadFileRef) mediaUploadFileRef.value = '';">Clear</button>
                        <button type="button" class="kb-mu__btn kb-mu__btn--primary" :disabled="mediaUploadStatus === 'uploading'" @click="doUploadMedia">
                          <span v-if="mediaUploadStatus === 'uploading'" class="kb-mu__spinner" />
                          {{ mediaUploadStatus === 'uploading' ? 'Uploading…' : 'Get handle' }}
                        </button>
                      </template>
                      <template v-else-if="mediaUploadUrl">
                        <button type="button" class="kb-mu__btn kb-mu__btn--ghost" @click="mediaUploadFileRef?.click()">Browse</button>
                      </template>
                    </div>
                  </div>
                  <p v-if="mediaUploadStatus === 'error'" class="kb-mu__error">
                    <svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 4v2.5M6 8v.3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                    {{ mediaUploadError }}
                  </p>
                </div>
              </div>

              <!-- Document filename -->
              <div v-if="headerType === 'document'">
                <label class="kb-label kb-label--sm">Document filename <span class="kb-tag-opt">send-time</span></label>
                <input
                  type="text"
                  class="kb-input"
                  placeholder="e.g. Invoice_0042.pdf"
                  :value="messageAny.document_filename ?? ''"
                  @input="(e) => emitUpdate({ document_filename: (e.target as HTMLInputElement).value || undefined })"
                />
                <span class="kb-helper">Filename shown to the recipient in chat — does not rename the actual file.</span>
              </div>

            </div>
          </template>

          <!-- LOCATION header note -->
          <div v-else-if="headerType === 'location'" class="kb-comp__note kb-comp__note--info" style="margin-top:0.7rem">
            Location coordinates, name, and address are injected at send time via the <code class="kb-code">message</code> field.
            No media upload or handle needed. The <code class="kb-code">templateType</code> will be set to <code class="kb-code">TEXT</code>.
          </div>

        </div>
      </div>
      <!-- end HEADER -->


      <!-- ── BODY Component ────────────────────────────────────────────────── -->
      <div class="kb-comp kb-comp--body">
        <div class="kb-comp__head">
          <span class="kb-comp__badge kb-comp__badge--body">BODY</span>
          <span v-if="!isAuth" class="kb-comp__meta">Required &nbsp;·&nbsp; Max {{ BODY_LIMIT }} chars &nbsp;·&nbsp; Supports <code class="kb-code-inline">*bold*</code> <code class="kb-code-inline">_italic_</code> <code class="kb-code-inline">\n</code></span>
          <span v-else class="kb-comp__meta kb-comp__meta--preset">Preset by Meta — not configurable</span>
        </div>
        <div class="kb-comp__body">

          <!-- AUTHENTICATION body -->
          <template v-if="isAuth">
            <div class="kb-comp__note kb-comp__note--auth">
              <strong>Body is preset by Meta.</strong> You cannot customize it.
              <div class="kb-auth-preview">{{ authBodyPreview }}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.56rem;margin-top:0.7rem">
              <label class="kb-toggle-row">
                <input
                  type="checkbox"
                  class="kb-toggle"
                  :checked="!!messageAny.add_security_recommendation"
                  @change="(e) => emitUpdate({ add_security_recommendation: (e.target as HTMLInputElement).checked || undefined })"
                />
                <span class="kb-toggle-label">Add security recommendation<br><span class="kb-toggle-sub">Appends "For your security, do not share this code."</span></span>
              </label>
              <div>
                <label class="kb-label kb-label--sm">Code expiry (minutes)</label>
                <input
                  type="number"
                  class="kb-input kb-input--sm"
                  placeholder="e.g. 10"
                  min="1"
                  :value="messageAny.code_expiration_minutes ?? ''"
                  @input="(e) => { const v = parseInt((e.target as HTMLInputElement).value, 10); emitUpdate({ code_expiration_minutes: isNaN(v) ? undefined : v }); }"
                />
                <span class="kb-helper">Appends "This code expires in N minutes."</span>
              </div>
            </div>
          </template>

          <!-- Standard body -->
          <template v-else>
            <div class="kb-field-no-border">
              <label class="kb-label">
                Body text
                <span class="kb-counter" :class="{ 'kb-counter--warn': bodyText.length > BODY_LIMIT }">
                  {{ bodyText.length }}/{{ BODY_LIMIT }}
                </span>
              </label>
              <div class="kb-input-with-var">
                <textarea
                  class="kb-textarea"
                  rows="4"
                  :placeholder="placeholderMode === 'named' ? 'Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...' : 'Hi {{1}}, your order {{2}} has been shipped...'"
                  :value="bodyText"
                  @input="(e) => emitUpdate({ body: (e.target as HTMLTextAreaElement).value || undefined })"
                />
                <div class="kb-var-picker-wrap">
                  <button type="button" class="kb-btn-insert" @click="toggleVarPicker('body')">{{ varPickerBtnLabel }}</button>
                  <div v-if="activeVarTarget === 'body'" class="kb-var-menu" role="menu">
                    <button v-for="v in localVariables" :key="`wa-body-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVar('body', v)">{{ v }}</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Body example -->
            <div class="kb-field-no-border" style="margin-top:0.6rem">
              <label class="kb-label">
                Body example <span class="kb-tag-req">required for approval</span>
              </label>
              <textarea
                class="kb-textarea"
                rows="3"
                placeholder="Hi John, your order ORD-5531 has been shipped..."
                :value="messageAny.template_example ?? ''"
                @input="(e) => emitUpdate({ template_example: (e.target as HTMLTextAreaElement).value || undefined })"
              />
              <span class="kb-helper">Body text with all <code class="kb-code">&#123;&#123;1&#125;&#125;</code> placeholders replaced by realistic values. Meta reviewers read this.</span>
            </div>

            <!-- Variable status -->
            <div v-if="templateFields.length > 0" class="kb-field-no-border" style="margin-top:0.5rem">
              <label class="kb-label">Detected variables</label>
              <ul class="kb-wa-fields-list">
                <li v-for="f in templateFields" :key="f.name" class="kb-wa-field-item" :class="{ 'kb-wa-field-item--ok': f.configured }">
                  <span class="kb-wa-field-name">{{ f.name }}</span>
                  <span class="kb-wa-field-status">{{ f.configured ? 'Configured' : 'Missing' }}</span>
                </li>
              </ul>
            </div>
          </template>

        </div>
      </div>
      <!-- end BODY -->


      <!-- ── FOOTER Component ──────────────────────────────────────────────── -->
      <div v-if="!isAuth" class="kb-comp kb-comp--footer">
        <div class="kb-comp__head">
          <span class="kb-comp__badge kb-comp__badge--footer">FOOTER</span>
          <span class="kb-comp__meta">Optional &nbsp;·&nbsp; Max {{ FOOTER_LIMIT }} chars &nbsp;·&nbsp; No variables &nbsp;·&nbsp; Plain text only</span>
        </div>
        <div class="kb-comp__body">
          <div class="kb-field-no-border">
            <label class="kb-label">
              Footer text
              <span class="kb-counter" :class="{ 'kb-counter--warn': footerText.length > FOOTER_LIMIT }">
                {{ footerText.length }}/{{ FOOTER_LIMIT }}
              </span>
            </label>
            <input
              type="text"
              class="kb-input"
              placeholder="e.g. Reply STOP to unsubscribe"
              :value="footerText"
              @input="(e) => emitUpdate({ footer: (e.target as HTMLInputElement).value || undefined })"
            />
            <span class="kb-helper">Static text only — variables and formatting are not supported in the footer.</span>
          </div>
        </div>
      </div>
      <!-- end FOOTER -->


      <!-- ── BUTTONS Component ─────────────────────────────────────────────── -->
      <div class="kb-comp kb-comp--buttons">
        <div class="kb-comp__head">
          <span class="kb-comp__badge kb-comp__badge--buttons">BUTTONS</span>
          <span v-if="isAuth" class="kb-comp__meta kb-comp__meta--required">OTP button required &nbsp;·&nbsp; Exactly 1</span>
          <span v-else class="kb-comp__meta">Optional &nbsp;·&nbsp; Max {{ maxButtons }} &nbsp;·&nbsp; Button label max 25 chars</span>
        </div>
        <div class="kb-comp__body">

          <!-- Ordering rule banner (shown when CTA + QR mixed) -->
          <div v-if="hasMixedButtonTypes" class="kb-comp__note kb-comp__note--warn" style="margin-bottom:0.7rem">
            <strong>Ordering rule:</strong> CTA buttons (URL, Phone, Copy Code) must appear <em>before</em> Quick Reply buttons or the API will reject the template.
          </div>

          <!-- Button type support table (collapsed hint) -->
          <div v-if="!isAuth && buttons.length === 0" class="kb-comp__note kb-comp__note--info" style="margin-bottom:0.7rem">
            Available for <strong>{{ categoryLabel }}</strong>:
            <span v-for="bt in availableButtonTypes" :key="bt.value" class="kb-comp__type-chip">{{ bt.label }}</span>
          </div>

          <!-- Auth OTP note -->
          <div v-if="isAuth && buttons.length === 0" class="kb-comp__note kb-comp__note--auth" style="margin-bottom:0.7rem">
            Authentication templates require exactly one OTP button. Add it below.
          </div>

          <!-- Button list -->
          <div class="kb-wa-buttons">
            <div
              v-for="(btn, index) in buttons"
              :key="btn.id || index"
              class="kb-wa-button-row"
            >
              <!-- Label (not for OTP — Meta uses built-in label) -->
              <div v-if="btn.type !== 'otp'" class="kb-input-with-var kb-input-with-var--btn">
                <input
                  type="text"
                  class="kb-input kb-input--btn-label"
                  placeholder="Button label (max 25 chars)"
                  :value="btn.label"
                  @input="updateButton(Number(index), { label: ($event.target as HTMLInputElement).value })"
                />
                <div class="kb-var-picker-wrap">
                  <button type="button" class="kb-btn-insert" @click="toggleVarPicker(`btn-label:${index}`)">{{ varPickerBtnLabel }}</button>
                  <div v-if="activeVarTarget === `btn-label:${index}`" class="kb-var-menu" role="menu">
                    <button v-for="v in localVariables" :key="`wa-btn-label-var-${index}-${v}`" type="button" class="kb-var-menu-item" @click="applyVar(`btn-label:${index}`, v)">{{ v }}</button>
                  </div>
                </div>
              </div>

              <!-- Type selector -->
              <select
                class="kb-select kb-select--btn-type"
                :value="btn.type ?? 'quick_reply'"
                @change="updateButton(Number(index), { type: ($event.target as HTMLSelectElement).value })"
              >
                <option v-for="typeOpt in availableButtonTypes" :key="typeOpt.value" :value="typeOpt.value">
                  {{ typeOpt.label }}
                </option>
              </select>

              <!-- Type-specific fields -->

              <!-- URL -->
              <template v-if="btn.type === 'url'">
                <div class="kb-input-with-var kb-input-with-var--btn">
                  <input
                    type="text"
                    class="kb-input kb-input--btn-target"
                    :placeholder="placeholderMode === 'named' ? 'https://example.com/track/{{ .order_id }}' : 'https://example.com/track/{{1}}'"
                    :value="btn.url"
                    @input="updateButton(Number(index), { url: ($event.target as HTMLInputElement).value || undefined })"
                  />
                  <div class="kb-var-picker-wrap">
                    <button type="button" class="kb-btn-insert" @click="toggleVarPicker(`btn-url:${index}`)">{{ varPickerBtnLabel }}</button>
                    <div v-if="activeVarTarget === `btn-url:${index}`" class="kb-var-menu" role="menu">
                      <button v-for="v in localVariables" :key="`wa-btn-url-var-${index}-${v}`" type="button" class="kb-var-menu-item" @click="applyVar(`btn-url:${index}`, v)">{{ v }}</button>
                    </div>
                  </div>
                </div>
                <input
                  type="url"
                  class="kb-input kb-input--btn-target"
                  placeholder="Example URL with real value (required if URL has a variable)"
                  :value="btn.url_example"
                  @input="updateButton(Number(index), { url_example: ($event.target as HTMLInputElement).value || undefined })"
                />
              </template>

              <!-- Phone -->
              <input
                v-else-if="btn.type === 'call'"
                type="tel"
                class="kb-input kb-input--btn-target"
                placeholder="+1 555 123 4567 (E.164 format)"
                :value="btn.phone"
                @input="updateButton(Number(index), { phone: ($event.target as HTMLInputElement).value || undefined })"
              />

              <!-- Copy coupon code -->
              <input
                v-else-if="btn.type === 'copy_code'"
                type="text"
                class="kb-input kb-input--btn-target"
                placeholder="Sample coupon code (e.g. SAVE30DEC)"
                :value="btn.example"
                @input="updateButton(Number(index), { example: ($event.target as HTMLInputElement).value || undefined })"
              />

              <!-- Opt-out -->
              <span v-else-if="btn.type === 'opt_out'" class="kb-opt-out-note">
                Sends a built-in marketing opt-out action.
              </span>

              <!-- OTP (authentication) -->
              <template v-else-if="btn.type === 'otp'">
                <label class="kb-label kb-label--sm" style="margin-top:0.3rem">OTP button label</label>
                <input
                  type="text"
                  class="kb-input kb-input--btn-label"
                  placeholder="e.g. Copy Code"
                  :value="btn.label"
                  @input="updateButton(Number(index), { label: ($event.target as HTMLInputElement).value })"
                />
                <label class="kb-label kb-label--sm" style="margin-top:0.3rem">OTP sub-type</label>
                <select
                  class="kb-select kb-select--btn-type"
                  :value="btn.otp_type ?? 'COPY_CODE'"
                  @change="updateButton(Number(index), { otp_type: ($event.target as HTMLSelectElement).value })"
                >
                  <option value="COPY_CODE">Copy code — user manually copies the OTP</option>
                  <option value="ONE_TAP">One-tap autofill — autofills on Android</option>
                </select>
                <template v-if="btn.otp_type === 'ONE_TAP'">
                  <input
                    type="text"
                    class="kb-input kb-input--btn-target"
                    placeholder="Autofill hint text (e.g. Tap to autofill)"
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
                    placeholder="App signature hash (e.g. K8a%2FAINcGX7)"
                    :value="btn.signature_hash"
                    @input="updateButton(Number(index), { signature_hash: ($event.target as HTMLInputElement).value || undefined })"
                  />
                </template>
              </template>

              <button type="button" class="kb-wa-btn-remove" @click="removeButton(Number(index))">Remove</button>
            </div>

            <button
              type="button"
              class="kb-wa-btn-add"
              :disabled="buttons.length >= maxButtons"
              @click="addButton"
            >
              {{ isAuth ? 'Add OTP button' : 'Add button' }}
            </button>
          </div>

          <!-- Ordering summary when mixed -->
          <div v-if="buttons.length > 1 && !isAuth" class="kb-buttons-order-hint">
            <span class="kb-buttons-order-hint__label">Send order:</span>
            <span
              v-for="(btn, i) in buttons"
              :key="btn.id || i"
              class="kb-buttons-order-hint__chip"
              :class="{
                'kb-buttons-order-hint__chip--cta': ['url','call','copy_code','opt_out'].includes(btn.type ?? ''),
                'kb-buttons-order-hint__chip--qr': btn.type === 'quick_reply',
              }"
            >
              {{ btn.label || btn.type || 'button' }}
            </span>
          </div>

        </div>
      </div>
      <!-- end BUTTONS -->

    </template>
    <!-- end standard component builder -->

  </section>
</template>

<style scoped>
/* ── Section shell ────────────────────────────────────────────────────────── */
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
.kb-section__reset:hover { color: #0f172a; background: #eef2f7; }
.kb-section__desc {
  font-size: 0.875rem;
  color: var(--wa-text-muted);
  margin: 0;
  line-height: 1.45;
}

/* ── Summary pills ────────────────────────────────────────────────────────── */
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
.kb-pill--category { color: #166534; background: #f0fdf4; border-color: #bbf7d0; }
.kb-pill--format   { color: #1e40af; background: #eff6ff; border-color: #bfdbfe; }
.kb-pill--status   { color: #334155; background: #f3f6fa; border-color: #ccd6e2; }

/* ── Setup group ─────────────────────────────────────────────────────────── */
.kb-setup-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 1rem;
}


/* ── Generic field card ──────────────────────────────────────────────────── */
.kb-field {
  margin-bottom: 0.7rem;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface);
  border-radius: 12px;
  padding: 0.82rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.75), 0 1px 0 rgba(15,23,42,0.02);
  transition: border-color 0.16s, box-shadow 0.16s;
}
.kb-field:focus-within {
  border-color: #bad0ea;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.75), 0 0 0 3px rgba(37,99,235,0.08);
}
.kb-field:last-child { margin-bottom: 0; }
.kb-field-no-border { /* inside a comp card */ }
.kb-field-half { min-width: 0; }
.kb-field--inline {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 0.7rem;
  align-items: start;
}

/* ── Component cards ─────────────────────────────────────────────────────── */
.kb-comp {
  border-radius: 13px;
  border: 1.5px solid var(--wa-border);
  background: var(--wa-surface);
  margin-bottom: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(15,23,42,0.04);
}
.kb-comp__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.58rem 0.9rem;
  background: var(--wa-surface-muted);
  border-bottom: 1.5px solid var(--wa-border);
  flex-wrap: wrap;
}
.kb-comp__badge {
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.26rem 0.58rem;
  border-radius: 5px;
  font-family: ui-monospace, SFMono-Regular, monospace;
}
.kb-comp__badge--header  { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.kb-comp__badge--body    { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.kb-comp__badge--footer  { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }
.kb-comp__badge--buttons { background: #faf5ff; color: #7c3aed; border: 1px solid #ddd6fe; }
.kb-comp__meta {
  font-size: 0.74rem;
  color: var(--wa-text-muted);
  flex: 1;
}
.kb-comp__meta--preset   { color: #b45309; font-style: italic; }
.kb-comp__meta--required { color: #7c3aed; font-weight: 700; }
.kb-comp__body {
  padding: 0.9rem;
}

/* Component notes */
.kb-comp__note {
  font-size: 0.815rem;
  border-radius: 8px;
  padding: 0.65rem 0.8rem;
  line-height: 1.55;
}
.kb-comp__note--info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
.kb-comp__note--warn { background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; }
.kb-comp__note--auth { background: #faf5ff; color: #5b21b6; border: 1px solid #ede9fe; }

/* Auth body preview */
.kb-auth-preview {
  margin-top: 0.44rem;
  padding: 0.5rem 0.7rem;
  border-radius: 7px;
  background: #ffffff;
  border: 1px dashed #c4b5fd;
  font-size: 0.8rem;
  color: #1e1b4b;
  font-style: italic;
  line-height: 1.5;
}

/* Type chips */
.kb-comp__type-chip {
  display: inline-block;
  margin: 0 3px;
  padding: 0.18rem 0.5rem;
  background: #fff;
  border: 1px solid #c7d2fe;
  border-radius: 5px;
  font-size: 0.7rem;
  color: #4338ca;
  font-weight: 600;
}

/* ── Header type grid ────────────────────────────────────────────────────── */
.kb-header-type-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.44rem;
  margin-bottom: 0.44rem;
}
.kb-header-type-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.4rem 0.78rem;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 0.82rem;
  color: #374151;
  font-weight: 600;
  transition: all 0.14s;
}
.kb-header-type-btn:hover { border-color: #93c5fd; background: #eff6ff; color: #1d4ed8; }
.kb-header-type-btn--active {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #1d4ed8;
  box-shadow: 0 0 0 2.5px rgba(59,130,246,0.18);
}

/* ── Labels / helpers ────────────────────────────────────────────────────── */
.kb-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 720;
  color: var(--wa-text);
  margin-bottom: 0.44rem;
  letter-spacing: 0.02em;
}
.kb-label--sm { font-size: 0.75rem; margin-bottom: 0.3rem; }
.kb-helper {
  display: block;
  font-size: 0.75rem;
  color: var(--wa-text-muted);
  margin-top: 0.36rem;
  line-height: 1.35;
}
.kb-counter { font-size: 0.75rem; color: #334155; margin-left: 8px; font-weight: 700; }
.kb-counter--warn { color: #b91c1c; }
.kb-code { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 0.78rem; }
.kb-code-inline { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 0.72rem; background: #f1f5f9; padding: 1px 4px; border-radius: 3px; }
.kb-tag-req { font-size: 0.68rem; font-weight: 700; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; padding: 1px 6px; border-radius: 4px; margin-left: 5px; }
.kb-tag-opt { font-size: 0.68rem; font-weight: 600; color: #6b7280; background: #f3f4f6; border: 1px solid #e5e7eb; padding: 1px 6px; border-radius: 4px; margin-left: 5px; }

/* ── Inputs ──────────────────────────────────────────────────────────────── */
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
  transition: border-color 0.15s, box-shadow 0.15s;
}
.kb-input:focus, .kb-textarea:focus, .kb-select:focus {
  outline: none;
  border-color: var(--wa-focus);
  box-shadow: 0 0 0 3px rgba(30,90,255,0.16);
}
.kb-input::placeholder, .kb-textarea::placeholder { color: #90a0b6; }
.kb-textarea { resize: vertical; min-height: 86px; line-height: 1.45; }
.kb-input--sm { min-height: 36px; padding: 0.4rem 0.7rem; font-size: 0.85rem; }

/* ── Variable picker ─────────────────────────────────────────────────────── */
.kb-input-with-var { position: relative; min-width: 0; width: -webkit-fill-available; width: stretch; }
.kb-input-with-var .kb-input, .kb-input-with-var .kb-textarea { padding-right: 104px; }
.kb-input-with-var--btn .kb-input { padding-right: 98px; }
.kb-var-picker-wrap { display: inline-flex; position: absolute; top: 8px; right: 8px; z-index: 5; }
.kb-btn-insert { padding: 0.35rem 0.75rem; font-size: 0.8125rem; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; cursor: pointer; }
.kb-btn-insert:hover { background: #f1f5f9; }
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
  box-shadow: 0 10px 24px rgba(15,23,42,0.14);
}
.kb-var-menu-item { width: 100%; border: 0; border-radius: 8px; padding: 8px 10px; text-align: left; background: transparent; color: #334155; font-size: 0.78rem; cursor: pointer; }
.kb-var-menu-item:hover { background: #f1f5f9; color: #0f172a; }

/* ── Toggles ─────────────────────────────────────────────────────────────── */
.kb-field--toggles { display: flex; flex-direction: column; gap: 0.44rem; }
.kb-toggle-row { display: flex; align-items: flex-start; gap: 8px; font-size: 0.84rem; color: var(--wa-text); cursor: pointer; line-height: 1.4; }
.kb-toggle { margin-top: 2px; flex-shrink: 0; cursor: pointer; }
.kb-toggle-label { user-select: none; }
.kb-toggle-sub { font-size: 0.72rem; color: var(--wa-text-muted); }

/* ── Buttons component rows ──────────────────────────────────────────────── */
.kb-wa-buttons { display: flex; flex-direction: column; gap: 0.68rem; }
.kb-wa-button-row {
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
  border: 1px solid var(--wa-border);
  border-radius: 10px;
  padding: 0.65rem 0.75rem;
  background: var(--wa-surface-muted);
}
.kb-wa-button-row--sm { padding: 0.44rem 0.56rem; }
.kb-wa-btn-remove {
  align-self: flex-end;
  background: none;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.28rem 0.6rem;
  margin-top: 0.18rem;
}
.kb-wa-btn-remove:hover { background: #fef2f2; }
.kb-wa-btn-add {
  background: none;
  border: 1.5px dashed #93c5fd;
  border-radius: 9px;
  color: #2563eb;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.52rem 0.9rem;
  text-align: center;
  transition: all 0.14s;
}
.kb-wa-btn-add:hover:not(:disabled) { background: #eff6ff; border-color: #3b82f6; }
.kb-wa-btn-add:disabled { opacity: 0.4; cursor: not-allowed; }
.kb-input--btn-label { min-height: 40px; padding: 0.56rem 0.8rem; }
.kb-input--btn-target { min-height: 40px; padding: 0.56rem 0.8rem; }
.kb-select--btn-type { min-height: 40px; padding: 0.56rem 0.7rem; font-size: 0.85rem; }
.kb-opt-out-note { font-size: 0.78rem; color: var(--wa-text-muted); font-style: italic; padding: 0.3rem 0; }

/* ── Button ordering hint ────────────────────────────────────────────────── */
.kb-buttons-order-hint {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 0.7rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--wa-border);
  font-size: 0.74rem;
}
.kb-buttons-order-hint__label { color: var(--wa-text-muted); font-weight: 600; flex-shrink: 0; }
.kb-buttons-order-hint__chip {
  padding: 0.18rem 0.5rem;
  border-radius: 5px;
  font-size: 0.72rem;
  font-weight: 600;
}
.kb-buttons-order-hint__chip--cta { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.kb-buttons-order-hint__chip--qr  { background: #f5f3ff; color: #6d28d9; border: 1px solid #ddd6fe; }

/* ── Template fields / variable list ─────────────────────────────────────── */
.kb-wa-fields-list { list-style: none; padding: 0; margin: 6px 0 0; }
.kb-wa-field-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.42rem 0.56rem;
  border-radius: 7px;
  font-size: 0.79rem;
  margin-bottom: 4px;
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #991b1b;
}
.kb-wa-field-item--ok { background: #ecfdf5; border-color: #86efac; color: #166534; }
.kb-wa-field-name { font-family: ui-monospace, SFMono-Regular, monospace; }
.kb-wa-field-status { font-size: 0.72rem; font-weight: 700; }

/* ── Meta card (char limits) ─────────────────────────────────────────────── */
.kb-meta-card {
  background: var(--wa-surface-muted);
  border: 1px solid var(--wa-border);
  border-radius: 10px;
  padding: 0.62rem 0.76rem;
  height: 100%;
}
.kb-meta-title { display: block; font-size: 0.66rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--wa-text-muted); margin-bottom: 6px; }
.kb-meta-list { list-style: none; padding: 0; margin: 0; font-size: 0.74rem; color: var(--wa-text-muted); display: flex; flex-direction: column; gap: 3px; }

/* ── Media upload widget ──────────────────────────────────────────────────── */
.kb-mu { margin-top: 0.44rem; }
.kb-mu__file-input { display: none; }
.kb-mu__row {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1.5px dashed #d1d5db;
  border-radius: 9px;
  padding: 0.52rem 0.72rem;
  background: #fafafa;
  cursor: default;
  min-height: 40px;
  transition: border-color 0.15s, background 0.15s;
}
.kb-mu__row--drag  { border-color: #3b82f6; background: #eff6ff; }
.kb-mu__row--done  { border-color: #16a34a; background: #f0fdf4; }
.kb-mu__row--error { border-color: #dc2626; background: #fef2f2; }
.kb-mu__left { display: flex; align-items: center; gap: 7px; flex: 1; min-width: 0; cursor: pointer; }
.kb-mu__icon { width: 15px; height: 15px; flex-shrink: 0; color: #9ca3af; }
.kb-mu__icon--ok { color: #16a34a; }
.kb-mu__icon--muted { opacity: 0.55; }
.kb-mu__text { font-size: 0.78rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.kb-mu__text--ok { color: #15803d; font-weight: 600; }
.kb-mu__text--file { color: #1e40af; font-weight: 600; }
.kb-mu__text--hint { color: #9ca3af; }
.kb-mu__size { font-size: 0.7rem; color: #6b7280; white-space: nowrap; }
.kb-mu__right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.kb-mu__btn { font-size: 0.74rem; font-weight: 600; padding: 0.28rem 0.6rem; border-radius: 6px; cursor: pointer; transition: all 0.13s; line-height: 1; }
.kb-mu__btn--ghost { background: #fff; border: 1px solid #d1d5db; color: #374151; }
.kb-mu__btn--ghost:hover { background: #f3f4f6; }
.kb-mu__btn--primary { background: #2563eb; border: 1px solid #2563eb; color: #fff; }
.kb-mu__btn--primary:hover:not(:disabled) { background: #1d4ed8; }
.kb-mu__btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.kb-mu__spinner {
  display: inline-block;
  width: 10px; height: 10px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: kb-spin 0.7s linear infinite;
  vertical-align: middle;
  margin-right: 4px;
}
@keyframes kb-spin { to { transform: rotate(360deg); } }
.kb-mu__error {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  color: #dc2626;
  margin-top: 5px;
}
.kb-mu__error svg { width: 12px; height: 12px; flex-shrink: 0; }

/* ── Carousel card ────────────────────────────────────────────────────────── */
.kb-carousel-card {
  display: flex;
  flex-direction: column;
  gap: 0.56rem;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface-muted);
  border-radius: 12px;
  padding: 0.8rem;
}
.kb-carousel-card__head { display: flex; align-items: center; justify-content: space-between; }
.kb-carousel-card__num { font-size: 0.78rem; font-weight: 700; color: var(--wa-text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.kb-carousel-card__btns { display: flex; flex-direction: column; gap: 0.44rem; border-top: 1px solid var(--wa-border); padding-top: 0.56rem; margin-top: 0.2rem; }
.kb-field-inline-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.56rem; }

/* ── Products ─────────────────────────────────────────────────────────────── */
.kb-product-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) auto;
  gap: 0.44rem;
  align-items: center;
}
</style>
