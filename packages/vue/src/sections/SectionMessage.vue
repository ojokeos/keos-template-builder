<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CampaignMessage, NtfyAction } from '@keos/notification-builder-core';
import type { Platform } from '@keos/notification-builder-core';

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    titleCount: number;
    bodyCount: number;
    titleLimit: number;
    bodyLimit: number;
    selectedPlatform: Platform;
    showReset?: boolean;
    titleError?: string;
    bodyError?: string;
    imageUrlError?: string;
    deepLinkError?: string;
  }>(),
  { showReset: false }
);

const emit = defineEmits<{
  update: [partial: any];
  reset: [];
}>();

const msg = computed(() => props.message as any);

// ── Variables ─────────────────────────────────────────────────────────────
const defaultVariables = [
  'first_name', 'last_name', 'full_name', 'user_id', 'app_name',
  'order_id', 'order_status', 'tracking_url', 'coupon_code', 'cart_total',
  'city', 'country',
];
const localVariables = computed(() => {
  const vars = ((msg.value.variables ?? []) as string[]).filter(Boolean);
  return vars.length ? Array.from(new Set(vars)) : defaultVariables;
});
const activeVarTarget = ref<'title' | 'body' | null>(null);

function toggleVarPicker(target: 'title' | 'body') {
  activeVarTarget.value = activeVarTarget.value === target ? null : target;
}
function applyVarChoice(target: 'title' | 'body', variable: string) {
  const token = ` {{ .${variable} }}`;
  const existingVars = ((msg.value.variables ?? []) as string[]).filter(Boolean);
  const nextVars = Array.from(new Set([...existingVars, variable]));
  if (target === 'title') {
    emit('update', { title: `${props.message.title || ''}${token}`, variables: nextVars });
  } else {
    emit('update', { body: `${props.message.body || ''}${token}`, variables: nextVars });
  }
  activeVarTarget.value = null;
}

// ── Tags ──────────────────────────────────────────────────────────────────
const tagInput = ref('');
const tags = computed<string[]>(() => (msg.value.tags ?? []) as string[]);

function addTag() {
  const val = tagInput.value.trim().toLowerCase().replace(/\s+/g, '_');
  if (!val) return;
  const next = Array.from(new Set([...tags.value, val]));
  emit('update', { tags: next });
  tagInput.value = '';
}
function removeTag(tag: string) {
  emit('update', { tags: tags.value.filter((t) => t !== tag) });
}
function onTagKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag();
  }
}

const COMMON_TAGS = ['warning', 'white_check_mark', 'rotating_light', 'loudspeaker', 'package', 'truck', 'calendar', 'key', 'bell', 'fire'];

// ── Actions ───────────────────────────────────────────────────────────────
const MAX_ACTIONS = 3;
const actions = computed<NtfyAction[]>(() => (msg.value.actions ?? []) as NtfyAction[]);

const ACTION_TYPES = [
  { value: 'view', label: 'View', hint: 'Open a URL in the browser or app.' },
  { value: 'http', label: 'HTTP request', hint: 'Send an HTTP request when tapped.' },
  { value: 'broadcast', label: 'Broadcast', hint: 'Android intent (automation apps).' },
  { value: 'copy', label: 'Copy to clipboard', hint: 'Copy a value to the clipboard.' },
] as const;

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

function addAction() {
  const next: NtfyAction[] = [...actions.value, { id: `action_${Date.now()}`, action: 'view', label: '' }];
  emit('update', { actions: next });
}
function removeAction(i: number) {
  const next = [...actions.value];
  next.splice(i, 1);
  emit('update', { actions: next });
}
function updateAction(i: number, patch: Partial<NtfyAction>) {
  const next = [...actions.value];
  next[i] = { ...next[i], ...patch };
  emit('update', { actions: next });
}
function onActionTypeChange(i: number, type: NtfyAction['action']) {
  const base: NtfyAction = { id: actions.value[i]?.id, action: type, label: actions.value[i]?.label ?? '' };
  const next = [...actions.value];
  next[i] = base;
  emit('update', { actions: next });
}

// ── HTTP Action: headers ──────────────────────────────────────────────────
function getHeaders(action: NtfyAction): Array<{ key: string; value: string }> {
  const h = action.headers ?? {};
  return Object.entries(h).map(([key, value]) => ({ key, value }));
}
function addHeader(i: number) {
  const headers = { ...(actions.value[i].headers ?? {}) };
  headers[''] = '';
  updateAction(i, { headers });
}
function updateHeader(i: number, oldKey: string, key: string, value: string) {
  const headers: Record<string, string> = {};
  for (const [k, v] of Object.entries(actions.value[i].headers ?? {})) {
    headers[k === oldKey ? key : k] = k === oldKey ? value : v as string;
  }
  updateAction(i, { headers });
}
function removeHeader(i: number, key: string) {
  const headers = { ...(actions.value[i].headers ?? {}) };
  delete headers[key];
  updateAction(i, { headers });
}

// ── Broadcast Action: extras ──────────────────────────────────────────────
function getExtras(action: NtfyAction): Array<{ key: string; value: string }> {
  const e = action.extras ?? {};
  return Object.entries(e).map(([key, value]) => ({ key, value }));
}
function addExtra(i: number) {
  const extras = { ...(actions.value[i].extras ?? {}) };
  extras[''] = '';
  updateAction(i, { extras });
}
function updateExtra(i: number, oldKey: string, key: string, value: string) {
  const extras: Record<string, string> = {};
  for (const [k, v] of Object.entries(actions.value[i].extras ?? {})) {
    extras[k === oldKey ? key : k] = k === oldKey ? value : v as string;
  }
  updateAction(i, { extras });
}
function removeExtra(i: number, key: string) {
  const extras = { ...(actions.value[i].extras ?? {}) };
  delete extras[key];
  updateAction(i, { extras });
}
</script>

<template>
  <section class="kb-section">
    <div class="kb-section__head">
      <h3 class="kb-section__title">Message</h3>
      <button v-if="showReset" type="button" class="kb-section__reset" @click="$emit('reset')">Reset section</button>
    </div>
    <p class="kb-section__desc">
      Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required.
    </p>

    <!-- ── Title ─────────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Title
        <span class="kb-counter" :class="{ 'kb-counter--warn': titleCount > titleLimit }">{{ titleCount }}/{{ titleLimit }}</span>
      </label>
      <div class="kb-field-with-rail">
        <input
          type="text"
          class="kb-input"
          placeholder="Notification title"
          :value="message.title"
          :aria-invalid="!!titleError"
          @input="(e) => $emit('update', { title: (e.target as HTMLInputElement).value })"
        />
        <div class="kb-var-picker-wrap">
          <button type="button" class="kb-var-chip" @click="toggleVarPicker('title')">&#123;&#123; .var &#125;&#125;</button>
          <div v-if="activeVarTarget === 'title'" class="kb-var-menu" role="menu">
            <button v-for="v in localVariables" :key="`title-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVarChoice('title', v)">{{ v }}</button>
          </div>
        </div>
        <div class="kb-char-rail" :style="{ '--pct': Math.min(100, (titleCount / titleLimit) * 100) + '%' }">
          <div class="kb-char-rail__fill" />
        </div>
      </div>
      <p v-if="titleError" class="kb-inline-error" role="alert">{{ titleError }}</p>
    </div>

    <!-- ── Message body ───────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Message
        <span class="kb-counter" :class="{ 'kb-counter--warn': bodyCount > bodyLimit }">{{ bodyCount }}/{{ bodyLimit }}</span>
      </label>
      <div class="kb-field-with-rail">
        <textarea
          class="kb-textarea"
          rows="3"
          placeholder="Notification body"
          :value="message.body"
          :aria-invalid="!!bodyError"
          @input="(e) => $emit('update', { body: (e.target as HTMLTextAreaElement).value })"
        />
        <div class="kb-var-picker-wrap">
          <button type="button" class="kb-var-chip" @click="toggleVarPicker('body')">&#123;&#123; .var &#125;&#125;</button>
          <div v-if="activeVarTarget === 'body'" class="kb-var-menu" role="menu">
            <button v-for="v in localVariables" :key="`body-var-${v}`" type="button" class="kb-var-menu-item" @click="applyVarChoice('body', v)">{{ v }}</button>
          </div>
        </div>
        <div class="kb-char-rail" :style="{ '--pct': Math.min(100, (bodyCount / bodyLimit) * 100) + '%' }">
          <div class="kb-char-rail__fill" />
        </div>
      </div>
      <p v-if="bodyError" class="kb-inline-error" role="alert">{{ bodyError }}</p>
      <label class="kb-toggle-row" style="margin-top: 0.5rem">
        <input
          type="checkbox"
          class="kb-toggle"
          :checked="!!msg.markdown"
          @change="(e) => $emit('update', { markdown: (e.target as HTMLInputElement).checked || undefined })"
        />
        <span class="kb-toggle-label">Enable Markdown formatting</span>
      </label>
    </div>

    <!-- ── Tags ──────────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Tags
        <span class="kb-helper">Emoji shortcodes displayed with the notification (e.g. <code>warning</code>, <code>white_check_mark</code>, <code>rotating_light</code>).</span>
      </label>
      <div class="kb-tags-wrap">
        <span v-for="tag in tags" :key="tag" class="kb-tag">
          {{ tag }}
          <button type="button" class="kb-tag__remove" @click="removeTag(tag)" aria-label="Remove tag">×</button>
        </span>
        <input
          type="text"
          class="kb-input kb-input--tag"
          placeholder="Add tag, press Enter"
          v-model="tagInput"
          @keydown="onTagKeydown"
          @blur="addTag"
        />
      </div>
      <div class="kb-tag-suggestions">
        <span class="kb-helper" style="margin-right: 0.4rem">Common:</span>
        <button
          v-for="t in COMMON_TAGS"
          :key="t"
          type="button"
          class="kb-tag-chip"
          :class="{ 'kb-tag-chip--active': tags.includes(t) }"
          @click="tags.includes(t) ? removeTag(t) : (tagInput = t, addTag())"
        >{{ t }}</button>
      </div>
    </div>

    <!-- ── Appearance ─────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Icon URL
        <span class="kb-helper">Custom notification icon (JPEG or PNG). Shown in the notification drawer.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https://example.com/icon.png"
        :value="msg.icon ?? ''"
        @input="(e) => $emit('update', { icon: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Image / Attachment URL
        <span class="kb-helper">External file URL attached to the notification (<code>attach</code>). Also used as hero image where supported.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https://..."
        :value="message.image_url ?? msg.attach ?? ''"
        :aria-invalid="!!imageUrlError"
        @input="(e) => $emit('update', { image_url: (e.target as HTMLInputElement).value || undefined, attach: (e.target as HTMLInputElement).value || undefined })"
      />
      <p v-if="imageUrlError" class="kb-inline-error" role="alert">{{ imageUrlError }}</p>
      <input
        type="text"
        class="kb-input"
        style="margin-top: 0.5rem"
        placeholder="Filename override (e.g. invoice.pdf) — optional"
        :value="msg.attachment_filename ?? ''"
        @input="(e) => $emit('update', { attachment_filename: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>

    <!-- ── Click URL ──────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Click URL (<code>click</code>)
        <span class="kb-helper">URL or deep link opened when the user taps the notification body.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https:// or app://..."
        :value="message.deep_link ?? ''"
        :aria-invalid="!!deepLinkError"
        @input="(e) => $emit('update', { deep_link: (e.target as HTMLInputElement).value || undefined })"
      />
      <p v-if="deepLinkError" class="kb-inline-error" role="alert">{{ deepLinkError }}</p>
    </div>

    <!-- ── Actions ────────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Action buttons
        <span class="kb-helper">Up to {{ MAX_ACTIONS }} interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.</span>
      </label>
      <div class="kb-actions-list">
        <div v-for="(action, i) in actions" :key="action.id || i" class="kb-action-card">
          <div class="kb-action-card__head">
            <span class="kb-action-card__num">Button {{ i + 1 }}</span>
            <div class="kb-action-card__type-row">
              <select
                class="kb-select kb-select--action-type"
                :value="action.action"
                @change="onActionTypeChange(i, ($event.target as HTMLSelectElement).value as NtfyAction['action'])"
              >
                <option v-for="t in ACTION_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
              <label class="kb-toggle-row kb-toggle-row--inline">
                <input
                  type="checkbox"
                  class="kb-toggle"
                  :checked="!!action.clear"
                  @change="updateAction(i, { clear: ($event.target as HTMLInputElement).checked || undefined })"
                />
                <span class="kb-toggle-label">Dismiss after tap</span>
              </label>
            </div>
            <button type="button" class="kb-btn-remove-action" @click="removeAction(i)">Remove</button>
          </div>

          <input
            type="text"
            class="kb-input"
            placeholder="Button label (e.g. View order)"
            :value="action.label"
            @input="updateAction(i, { label: ($event.target as HTMLInputElement).value })"
          />

          <!-- view action -->
          <template v-if="action.action === 'view'">
            <input
              type="url"
              class="kb-input"
              placeholder="URL to open (https:// or app://)"
              :value="action.url ?? ''"
              @input="updateAction(i, { url: ($event.target as HTMLInputElement).value || undefined })"
            />
          </template>

          <!-- http action -->
          <template v-else-if="action.action === 'http'">
            <div class="kb-action-http-row">
              <select
                class="kb-select kb-select--method"
                :value="action.method ?? 'POST'"
                @change="updateAction(i, { method: ($event.target as HTMLSelectElement).value })"
              >
                <option v-for="m in HTTP_METHODS" :key="m" :value="m">{{ m }}</option>
              </select>
              <input
                type="url"
                class="kb-input"
                placeholder="Endpoint URL"
                :value="action.url ?? ''"
                @input="updateAction(i, { url: ($event.target as HTMLInputElement).value || undefined })"
              />
            </div>
            <textarea
              class="kb-textarea kb-textarea--sm"
              rows="2"
              placeholder='Request body (e.g. {"status":"closed"})'
              :value="action.body ?? ''"
              @input="updateAction(i, { body: ($event.target as HTMLTextAreaElement).value || undefined })"
            />
            <div class="kb-kv-section">
              <span class="kb-kv-label">Headers</span>
              <div v-for="(hdr, hi) in getHeaders(action)" :key="hi" class="kb-kv-row">
                <input type="text" class="kb-input kb-input--kv" placeholder="Header name" :value="hdr.key"
                  @input="updateHeader(i, hdr.key, ($event.target as HTMLInputElement).value, hdr.value)" />
                <input type="text" class="kb-input kb-input--kv" placeholder="Value" :value="hdr.value"
                  @input="updateHeader(i, hdr.key, hdr.key, ($event.target as HTMLInputElement).value)" />
                <button type="button" class="kb-btn-kv-remove" @click="removeHeader(i, hdr.key)">×</button>
              </div>
              <button type="button" class="kb-btn-kv-add" @click="addHeader(i)">+ Add header</button>
            </div>
          </template>

          <!-- broadcast action -->
          <template v-else-if="action.action === 'broadcast'">
            <input
              type="text"
              class="kb-input"
              placeholder="Intent (default: io.heckel.ntfy.USER_ACTION)"
              :value="action.intent ?? ''"
              @input="updateAction(i, { intent: ($event.target as HTMLInputElement).value || undefined })"
            />
            <div class="kb-kv-section">
              <span class="kb-kv-label">Extras</span>
              <div v-for="(ext, ei) in getExtras(action)" :key="ei" class="kb-kv-row">
                <input type="text" class="kb-input kb-input--kv" placeholder="Key" :value="ext.key"
                  @input="updateExtra(i, ext.key, ($event.target as HTMLInputElement).value, ext.value)" />
                <input type="text" class="kb-input kb-input--kv" placeholder="Value" :value="ext.value"
                  @input="updateExtra(i, ext.key, ext.key, ($event.target as HTMLInputElement).value)" />
                <button type="button" class="kb-btn-kv-remove" @click="removeExtra(i, ext.key)">×</button>
              </div>
              <button type="button" class="kb-btn-kv-add" @click="addExtra(i)">+ Add extra</button>
            </div>
          </template>

          <!-- copy action -->
          <template v-else-if="action.action === 'copy'">
            <input
              type="text"
              class="kb-input"
              placeholder="Value to copy to clipboard"
              :value="action.value ?? ''"
              @input="updateAction(i, { value: ($event.target as HTMLInputElement).value || undefined })"
            />
          </template>
        </div>

        <div class="kb-actions-footer">
          <button type="button" class="kb-btn-add-action" :disabled="actions.length >= MAX_ACTIONS" @click="addAction">
            Add action
          </button>
          <div class="kb-action-chips">
            <span class="kb-action-chips-label">Quick add:</span>
            <button
              v-for="suggestion in ['View order', 'Track shipment', 'Dismiss']"
              :key="suggestion"
              type="button"
              class="kb-action-chip"
              :disabled="actions.length >= MAX_ACTIONS"
              @click="() => { const next = [...actions, { id: `action_${Date.now()}`, action: 'view' as const, label: suggestion }]; $emit('update', { actions: next }); }"
            >{{ suggestion }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Location ───────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Location (optional)
        <span class="kb-helper">Attach coordinates for rich notifications or open-in-maps support.</span>
      </label>
      <div class="kb-location-row">
        <input
          type="number" step="0.000001" class="kb-input" placeholder="Latitude"
          :value="msg.location?.lat ?? ''"
          @input="(e) => { const loc = { ...(msg.location ?? {}) }; const v = (e.target as HTMLInputElement).value; loc.lat = v === '' ? undefined : Number(v); $emit('update', { location: loc }); }"
        />
        <input
          type="number" step="0.000001" class="kb-input" placeholder="Longitude"
          :value="msg.location?.lon ?? ''"
          @input="(e) => { const loc = { ...(msg.location ?? {}) }; const v = (e.target as HTMLInputElement).value; loc.lon = v === '' ? undefined : Number(v); $emit('update', { location: loc }); }"
        />
      </div>
      <input
        type="text" class="kb-input" placeholder="Location name (e.g. HQ, Store name)"
        :value="msg.location?.name ?? ''"
        @input="(e) => { const loc = { ...(msg.location ?? {}) }; loc.name = (e.target as HTMLInputElement).value || undefined; $emit('update', { location: loc }); }"
      />
      <input
        type="text" class="kb-input" style="margin-top: 0.5rem" placeholder="Address (optional)"
        :value="msg.location?.address ?? ''"
        @input="(e) => { const loc = { ...(msg.location ?? {}) }; loc.address = (e.target as HTMLInputElement).value || undefined; $emit('update', { location: loc }); }"
      />
    </div>

    <!-- ── Routing ────────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Email forward (<code>email</code>)
        <span class="kb-helper">Forward this notification to an email address.</span>
      </label>
      <input
        type="email"
        class="kb-input"
        placeholder="recipient@example.com"
        :value="msg.email_forward ?? ''"
        @input="(e) => $emit('update', { email_forward: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Phone call (<code>call</code>)
        <span class="kb-helper">Initiate a phone call to this number when the notification is received.</span>
      </label>
      <input
        type="tel"
        class="kb-input"
        placeholder="+1 555 123 4567"
        :value="msg.call ?? ''"
        @input="(e) => $emit('update', { call: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>

    <!-- ── Delay ──────────────────────────────────────────────────────── -->
    <div class="kb-field">
      <label class="kb-label">
        Delivery delay (<code>delay</code>)
        <span class="kb-helper">Schedule delivery for later. Accepts durations (<code>30min</code>, <code>2h</code>, <code>1day</code>), times (<code>9am</code>, <code>8:30pm</code>), natural language (<code>tomorrow, 3pm</code>), or Unix timestamps. Max 3 days.</span>
      </label>
      <div class="kb-delay-row">
        <input
          type="text"
          class="kb-input"
          placeholder="e.g. 30min, 2h, tomorrow 9am, 1693000000"
          :value="msg.delay ?? ''"
          @input="(e) => $emit('update', { delay: (e.target as HTMLInputElement).value || undefined })"
        />
        <div class="kb-delay-chips">
          <button v-for="preset in ['30min', '1h', '4h', 'tomorrow']" :key="preset" type="button" class="kb-delay-chip"
            :class="{ 'kb-delay-chip--active': msg.delay === preset }"
            @click="$emit('update', { delay: msg.delay === preset ? undefined : preset })">
            {{ preset }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Advanced toggles ───────────────────────────────────────────── -->
    <details class="kb-advanced-toggles">
      <summary class="kb-advanced-toggles__summary">Advanced options</summary>
      <div class="kb-advanced-toggles__body">
        <label class="kb-toggle-row">
          <input type="checkbox" class="kb-toggle" :checked="!!msg.cache"
            @change="(e) => $emit('update', { cache: (e.target as HTMLInputElement).checked || undefined })" />
          <span class="kb-toggle-label">Enable server-side caching (<code>cache</code>)</span>
        </label>
        <label class="kb-toggle-row">
          <input type="checkbox" class="kb-toggle" :checked="!!msg.firebase"
            @change="(e) => $emit('update', { firebase: (e.target as HTMLInputElement).checked || undefined })" />
          <span class="kb-toggle-label">Deliver via Firebase Cloud Messaging (<code>firebase</code>)</span>
        </label>
        <label class="kb-toggle-row">
          <input type="checkbox" class="kb-toggle" :checked="!!msg.unified_push"
            @change="(e) => $emit('update', { unified_push: (e.target as HTMLInputElement).checked || undefined })" />
          <span class="kb-toggle-label">UnifiedPush delivery (<code>unified_push</code>)</span>
        </label>
      </div>
    </details>
  </section>
</template>

<style scoped>
.kb-section {
  --s-border: var(--kb-border, #d6e0eb);
  --s-surface: var(--kb-surface, #ffffff);
  --s-text: var(--kb-text-strong, #0f172a);
  --s-muted: var(--kb-text-muted, #56657a);
  --s-focus: var(--kb-brand, #2563eb);
  margin-bottom: 1rem;
  border: 1px solid var(--s-border);
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
  color: var(--s-text);
  letter-spacing: 0.01em;
}
.kb-section__reset {
  font-size: 0.75rem;
  color: #334155;
  background: var(--s-surface);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 0.36rem 0.62rem;
  border-radius: 999px;
  font-weight: 600;
}
.kb-section__reset:hover { background: #eef2f7; color: #0f172a; }
.kb-section__desc {
  font-size: 0.875rem;
  color: var(--s-muted);
  margin: 0 0 0.8rem;
  line-height: 1.45;
}
.kb-field {
  margin-bottom: 0.88rem;
  border: 1px solid var(--s-border);
  background: var(--s-surface);
  border-radius: 12px;
  padding: 0.82rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.75), 0 1px 0 rgba(15,23,42,.02);
  transition: border-color 0.16s, box-shadow 0.16s;
}
.kb-field:focus-within {
  border-color: #bad0ea;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.75), 0 0 0 3px rgba(37,99,235,.08);
}
.kb-field:last-child { margin-bottom: 0; }
.kb-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 720;
  color: var(--s-text);
  margin-bottom: 0.46rem;
  letter-spacing: 0.02em;
}
.kb-helper {
  display: block;
  font-size: 0.75rem;
  color: var(--s-muted);
  margin-top: 0.28rem;
  line-height: 1.35;
  font-weight: 400;
}
.kb-counter {
  font-weight: 400;
  color: #64748b;
  margin-left: 0.25rem;
}
.kb-counter--warn { color: #dc2626; }
.kb-inline-error {
  margin: 4px 0 0;
  font-size: 0.75rem;
  color: #dc2626;
}
/* inputs */
.kb-input, .kb-textarea, .kb-select {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 1px solid #d1dbe8;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.kb-input:focus, .kb-textarea:focus, .kb-select:focus {
  outline: none;
  border-color: var(--s-focus);
  box-shadow: 0 0 0 3px rgba(37,99,235,.12);
}
.kb-input::placeholder, .kb-textarea::placeholder { color: #94a3b8; }
.kb-textarea { resize: vertical; min-height: 64px; line-height: 1.45; }
.kb-textarea--sm { min-height: 48px; }
/* field with progress rail */
.kb-field-with-rail { position: relative; }
.kb-var-picker-wrap {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
}
.kb-var-chip {
  padding: 5px 9px;
  border: 1px solid #d1dbe8;
  border-radius: 8px;
  background: #f8fafc;
  color: #475569;
  font-size: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
}
.kb-var-chip:hover { background: #f1f5f9; }
.kb-var-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 160px;
  max-height: 220px;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid #d1dbe8;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15,23,42,.14);
  z-index: 20;
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
.kb-var-menu-item:hover { background: #f1f5f9; color: #0f172a; }
.kb-char-rail {
  height: 3px;
  margin-top: 5px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}
.kb-char-rail__fill {
  height: 100%;
  width: var(--pct, 0%);
  max-width: 100%;
  background: linear-gradient(90deg, #22c55e 0%, #eab308 80%, #dc2626 100%);
  border-radius: 2px;
  transition: width 0.15s;
}
/* toggle */
.kb-toggle-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}
.kb-toggle-row--inline { flex-shrink: 0; }
.kb-toggle {
  width: 15px;
  height: 15px;
  accent-color: var(--s-focus);
  flex-shrink: 0;
  cursor: pointer;
}
.kb-toggle-label { font-size: 0.82rem; color: var(--s-text); }
/* tags */
.kb-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  padding: 6px 8px;
  border: 1px solid #d1dbe8;
  border-radius: 10px;
  background: #fff;
}
.kb-input--tag {
  border: none;
  padding: 4px 6px;
  min-width: 140px;
  flex: 1;
  box-shadow: none;
  font-size: 0.82rem;
}
.kb-input--tag:focus { outline: none; border: none; box-shadow: none; }
.kb-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 3px 8px 3px 10px;
  font-size: 0.75rem;
  color: #1d4ed8;
  font-weight: 600;
}
.kb-tag__remove {
  border: none;
  background: none;
  color: #93c5fd;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  padding: 0 2px;
}
.kb-tag__remove:hover { color: #1d4ed8; }
.kb-tag-suggestions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
}
.kb-tag-chip {
  font-size: 0.72rem;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
}
.kb-tag-chip:hover, .kb-tag-chip--active {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
/* location */
.kb-location-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
/* actions */
.kb-actions-list { display: flex; flex-direction: column; gap: 0.6rem; }
.kb-action-card {
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
  border: 1px solid var(--s-border);
  border-radius: 11px;
  padding: 0.7rem;
  background: #f8fafc;
}
.kb-action-card__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.kb-action-card__num {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--s-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}
.kb-action-card__type-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  flex-wrap: wrap;
}
.kb-select--action-type { flex: 1; min-width: 150px; max-width: 200px; }
.kb-select--method { width: 90px; flex-shrink: 0; }
.kb-btn-remove-action {
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  color: #64748b;
  margin-left: auto;
}
.kb-btn-remove-action:hover { background: #fee2e2; border-color: #fca5a5; color: #991b1b; }
.kb-action-http-row { display: flex; gap: 0.44rem; align-items: center; }
.kb-action-http-row .kb-input { flex: 1; }
/* key-value pairs */
.kb-kv-section { margin-top: 0.4rem; }
.kb-kv-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--s-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.3rem;
}
.kb-kv-row { display: flex; gap: 0.3rem; align-items: center; margin-bottom: 0.3rem; }
.kb-input--kv { flex: 1; min-width: 0; font-size: 0.8rem; padding: 7px 10px; }
.kb-btn-kv-remove {
  font-size: 0.9rem;
  line-height: 1;
  border: none;
  background: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
}
.kb-btn-kv-remove:hover { background: #fee2e2; color: #991b1b; }
.kb-btn-kv-add {
  font-size: 0.74rem;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}
/* actions footer */
.kb-actions-footer {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.kb-btn-add-action {
  font-size: 0.75rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid #c7d2fe;
  background: #edf2ff;
  color: #1d4ed8;
  cursor: pointer;
  font-weight: 700;
}
.kb-btn-add-action:hover:not(:disabled) { background: #e0e7ff; }
.kb-btn-add-action:disabled { opacity: 0.5; cursor: not-allowed; }
.kb-action-chips { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; }
.kb-action-chips-label { font-size: 0.72rem; color: #64748b; }
.kb-action-chip {
  font-size: 0.72rem;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
}
.kb-action-chip:hover:not(:disabled) { background: #f1f5f9; color: #0f172a; }
.kb-action-chip:disabled { opacity: 0.5; cursor: not-allowed; }
/* delay */
.kb-delay-row { display: flex; flex-direction: column; gap: 0.5rem; }
.kb-delay-chips { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.kb-delay-chip {
  font-size: 0.74rem;
  padding: 4px 11px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
}
.kb-delay-chip:hover, .kb-delay-chip--active {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
/* advanced toggles accordion */
.kb-advanced-toggles {
  border: 1px solid var(--s-border);
  border-radius: 12px;
  background: #f8fafc;
  margin-top: 0.88rem;
}
.kb-advanced-toggles__summary {
  padding: 0.72rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--s-muted);
  cursor: pointer;
  list-style: none;
  user-select: none;
}
.kb-advanced-toggles__summary::-webkit-details-marker { display: none; }
.kb-advanced-toggles__body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0 0.9rem 0.8rem;
  border-top: 1px solid var(--s-border);
}
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.8em;
  background: #f1f5f9;
  border-radius: 4px;
  padding: 1px 4px;
  color: #1e40af;
}
@media (max-width: 720px) {
  .kb-location-row { grid-template-columns: 1fr; }
  .kb-action-card__type-row { flex-direction: column; align-items: flex-start; }
  .kb-action-http-row { flex-direction: column; }
}
</style>
