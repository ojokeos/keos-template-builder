<script setup lang="ts">
import { computed } from 'vue';

export interface WaPreviewTemplate {
  format?: string;
  templateName?: string;
  templateLanguage?: string;
  templateCategory?: string;
  header?: {
    type: 'text' | 'image' | 'video' | 'document';
    text?: string;
    url?: string;
    filename?: string;
  };
  body: string;
  mediaCaption?: string;
  footer?: string;
  buttons?: { text: string }[];
  location?: {
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  };
  catalog?: { label?: string } | boolean;
  multiProduct?: { image?: string; name?: string; price?: string }[];
  coupon?: { code: string };
  limitedOffer?: string;
  auth?: { code: string };
  flow?: { id?: string; ctaLabel?: string };
}

const props = defineProps<{
  template: WaPreviewTemplate;
}>();

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const formattedBody = computed(() => {
  const raw = props.template?.body ?? '';
  const escaped = escapeHtml(raw);
  return escaped
    .replace(/\n/g, '<br>')
    .replace(/\*(.*?)\*/g, '<b>$1</b>')
    .replace(/_(.*?)_/g, '<i>$1</i>');
});

const displayTitle = computed(() => props.template.templateName || 'Ecoshop');
const displaySubtitle = computed(() => 'Business Account');
const isFlowPreview = computed(() => props.template.format === 'flow' || Boolean(props.template.flow));
const primaryButton = computed(() => props.template.buttons?.[0]?.text || props.template.flow?.ctaLabel || 'Continue');
const actionButtons = computed(() => props.template.buttons ?? []);
const hasProductList = computed(() => (props.template.multiProduct?.length ?? 0) > 0);
const formatLabel = computed(() => (props.template.format || 'text').toUpperCase());
const mediaLabel = computed(() => {
  const h = props.template.header;
  if (!h || h.type === 'text') return '';
  if (h.type === 'image') return h.url || 'Image';
  if (h.type === 'video') return h.url || 'Video';
  return h.filename || h.url || 'Document';
});
const mediaPreviewStyle = computed(() => {
  const h = props.template.header;
  if (!h || h.type !== 'image' || !h.url) return undefined;
  return { backgroundImage: `url(${h.url})` };
});
const assistantReply = computed(() => {
  const t = props.template;
  if (t.format === 'flow') return 'Thanks, we received your preferences.';
  if (t.auth?.code) return 'Use the verification code and let us know if it works.';
  if (t.coupon?.code) return `Your coupon ${t.coupon.code} is active now.`;
  if (t.limitedOffer) return `Great choice. This offer is valid until ${t.limitedOffer}.`;
  if (props.template.multiProduct?.length) {
    return `Here are ${props.template.multiProduct.length} options based on your selection.`;
  }
  return 'Thanks for contacting us. We have shared the latest template details above.';
});
const followUpMessage = computed(() => {
  const t = props.template;
  if (t.location) return t.location.name || t.location.address || `${t.location.lat}, ${t.location.lng}`;
  if (t.auth?.code) return `Verification code: ${t.auth.code}`;
  if (t.flow?.id) return `Flow ID: ${t.flow.id}`;
  if (t.templateLanguage) return `Template language: ${t.templateLanguage}`;
  return `Category: ${t.templateCategory || 'utility'} • Format: ${t.format || 'text'}`;
});
const flowOptions = computed(() => {
  const t = props.template;
  if (t.multiProduct?.length) return t.multiProduct.slice(0, 5).map((p) => p.name || 'Product');
  if (t.buttons?.length) return t.buttons.slice(0, 5).map((b) => b.text || 'Option');
  const fromBody = (t.body || '')
    .split(/\n|\.|,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
  if (fromBody.length) return fromBody;
  return ['Option A', 'Option B', 'Option C'];
});
</script>

<template>
  <div class="wa-preview-root">
    <div class="wa-device">
      <div class="wa-screen">
        <div class="wa-statusbar">
          <span class="wa-time">11:59</span>
          <div class="wa-status-icons" aria-hidden="true">
            <span class="wa-signal"></span>
            <span class="wa-wifi"></span>
            <span class="wa-battery"></span>
          </div>
        </div>

        <div class="wa-header">
          <span class="wa-back">&#x2190;</span>
          <div class="wa-avatar">ES</div>
          <div class="wa-titleblock">
            <div class="wa-title-row">
              <span class="wa-title">{{ displayTitle }}</span>
              <span class="wa-verified">✓</span>
            </div>
            <span class="wa-subtitle">{{ displaySubtitle }}</span>
          </div>
          <div class="wa-header-actions" aria-hidden="true">
            <span class="wa-icon wa-icon--store"></span>
            <span class="wa-icon wa-icon--phone"></span>
            <span class="wa-icon wa-icon--menu"></span>
          </div>
        </div>

        <template v-if="isFlowPreview">
          <div class="wa-flow-shell">
            <div class="wa-flow-top-handle"></div>
            <div class="wa-flow-header">
              <span class="wa-flow-close">&#x2715;</span>
              <span class="wa-flow-title">{{ displayTitle }}</span>
              <span class="wa-flow-menu">⋮</span>
            </div>
            <div class="wa-flow-content">
              <p class="wa-flow-eyebrow">{{ template.body || 'Please choose an option below.' }}</p>
              <div v-for="(opt, i) in flowOptions" :key="`flow-opt-${i}`" class="wa-flow-option">
                <span>{{ opt }}</span>
                <span class="wa-radio" :class="{ 'wa-radio--on': i === 0 }"></span>
              </div>

              <div v-if="template.multiProduct?.length" class="wa-flow-products">
                <div v-for="(p, i) in template.multiProduct.slice(0, 3)" :key="i" class="wa-flow-product">
                  <div>
                    <strong>{{ p.name || 'Product' }}</strong>
                    <p>{{ p.price || 'Price on request' }}</p>
                  </div>
                  <span class="wa-radio"></span>
                </div>
              </div>
            </div>
            <div class="wa-flow-footer">
              <button type="button" class="wa-flow-cta">{{ primaryButton }}</button>
              <p class="wa-managed">Managed by EcoShop. <a href="#" @click.prevent>Learn more</a></p>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="wa-thread">
            <div class="wa-date-chip">Today</div>
            <div class="wa-secure-banner">
              <span>●</span>
              This business uses a secure service from Meta to manage this chat.
              <a href="#" @click.prevent>Learn more</a>
            </div>

            <div class="wa-msg wa-msg--in">
              <div class="wa-template-card">
                <div v-if="template.header && template.header.type !== 'text'" class="wa-card-media">
                  <div class="wa-card-media-tag">{{ formatLabel }} TEMPLATE</div>
                  <div class="wa-card-media-sub">{{ mediaLabel }}</div>
                  <div v-if="mediaPreviewStyle" class="wa-card-media-image" :style="mediaPreviewStyle"></div>
                </div>
                <div v-else-if="template.header?.text" class="wa-card-header-text">
                  {{ template.header.text }}
                </div>

                <div class="wa-card-body" v-html="formattedBody"></div>

                <div v-if="template.location" class="wa-inline-note">
                  📍 {{ template.location.name || template.location.address || `${template.location.lat}, ${template.location.lng}` }}
                </div>
                <div v-if="template.coupon?.code" class="wa-inline-note">
                  Coupon: <strong>{{ template.coupon.code }}</strong>
                </div>
                <div v-if="template.auth?.code" class="wa-inline-note">
                  Verification code: <strong>{{ template.auth.code }}</strong>
                </div>
                <div v-if="template.limitedOffer" class="wa-inline-note wa-inline-note--warn">
                  Expires: {{ template.limitedOffer }}
                </div>
                <div v-if="template.footer" class="wa-inline-note wa-inline-note--muted">
                  {{ template.footer }}
                </div>

                <div v-if="hasProductList" class="wa-product-list">
                  <div
                    v-for="(p, i) in template.multiProduct?.slice(0, 4)"
                    :key="`prod-${i}`"
                    class="wa-product-row"
                  >
                    <span class="wa-product-name">{{ p.name || `Item ${i + 1}` }}</span>
                    <span class="wa-product-price">{{ p.price || '-' }}</span>
                  </div>
                </div>

                <button v-if="primaryButton" type="button" class="wa-template-cta">{{ primaryButton }}</button>
                <div v-if="actionButtons.length > 1" class="wa-template-actions">
                  <button
                    v-for="(btn, i) in actionButtons.slice(1, 4)"
                    :key="`action-${i}`"
                    type="button"
                    class="wa-template-action"
                  >
                    {{ btn.text }}
                  </button>
                </div>

                <div class="wa-meta-time">11:59</div>
              </div>
            </div>

            <div class="wa-msg wa-msg--out">
              <div class="wa-bubble wa-bubble--out">
                <span class="wa-bubble-author">{{ displayTitle }}</span>
                <p>{{ assistantReply }}</p>
                <div class="wa-meta-time">11:59 ✓✓</div>
              </div>
            </div>

            <div class="wa-msg wa-msg--in">
              <div class="wa-bubble wa-bubble--in">
                <p>{{ followUpMessage }}</p>
                <a v-if="template.flow?.id" href="#" @click.prevent>wa-flow://{{ template.flow.id }}</a>
                <div class="wa-meta-time">11:59</div>
              </div>
            </div>
          </div>
        </template>

        <div class="wa-inputbar">
          <span class="wa-input-icon wa-input-icon--emoji"></span>
          <span class="wa-input-placeholder">Message</span>
          <span class="wa-input-icon wa-input-icon--attach"></span>
          <span class="wa-input-icon wa-input-icon--camera"></span>
          <button type="button" class="wa-mic">
            <span class="wa-input-icon wa-input-icon--mic"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wa-preview-root {
  --wa-green: #075e54;
  --wa-green-soft: #128c7e;
  --wa-accent: #25d366;
  --wa-thread-bg: #efeae2;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 10% 10%, #f6fafc 0%, #e6ecf1 52%, #dbe3ea 100%);
  padding: clamp(10px, 2.2vw, 20px);
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.wa-device {
  width: min(100%, clamp(300px, 40vw, 388px));
  aspect-ratio: 9 / 18.8;
  border-radius: 34px;
  border: 3px solid #101418;
  background: linear-gradient(160deg, #1b2128, #0f1419);
  padding: 7px;
  box-shadow:
    0 28px 54px rgba(8, 15, 26, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform: translateY(0);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.wa-device:hover {
  transform: translateY(-2px);
  box-shadow:
    0 32px 58px rgba(8, 15, 26, 0.36),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.wa-screen {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  background: var(--wa-thread-bg);
  background-image: url('https://static.whatsapp.net/rsrc.php/v3/yA/r/3XjvM8yK5Q0.png');
  background-size: 408px auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.wa-statusbar {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #f3f4f6;
  color: #111;
  font-size: 0.76rem;
  font-weight: 600;
}

.wa-status-icons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.wa-signal,
.wa-wifi,
.wa-battery {
  width: 12px;
  height: 7px;
  border-radius: 2px;
  background: #1f2937;
  opacity: 0.86;
}

.wa-header {
  background: var(--wa-green);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 12px;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 10px;
  align-items: center;
  color: #fff;
}

.wa-back {
  font-size: 1.12rem;
  color: #fff;
  line-height: 1;
}

.wa-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 25%, #2ecf74, #0f7f3f 62%, #0c6a34 100%);
  display: grid;
  place-items: center;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #e8ffe9;
}

.wa-titleblock {
  min-width: 0;
}

.wa-title-row {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.wa-title {
  font-size: 0.91rem;
  font-weight: 600;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-verified {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #25d366;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.wa-subtitle {
  font-size: 0.66rem;
  color: rgba(255, 255, 255, 0.78);
}

.wa-header-actions {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: #fff;
}

.wa-icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  position: relative;
  opacity: 0.94;
}

.wa-icon--store::before {
  content: '';
  position: absolute;
  inset: 2px 1px 1px;
  border: 1.6px solid currentColor;
  border-top-width: 2.8px;
  border-radius: 2px;
}

.wa-icon--phone::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border: 1.6px solid currentColor;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 6px;
  transform: rotate(45deg);
  inset: 3px 0 0 3px;
}

.wa-icon--menu::before {
  content: '⋮';
  position: absolute;
  inset: -4px 1px 0;
  font-size: 17px;
  line-height: 14px;
}

.wa-thread {
  flex: 1;
  overflow-y: auto;
  padding: 10px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wa-thread,
.wa-flow-content {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.wa-thread::-webkit-scrollbar,
.wa-flow-content::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.wa-date-chip {
  align-self: center;
  font-size: 0.62rem;
  color: #6b7280;
  background: rgba(232, 244, 255, 0.95);
  border: 1px solid #cfe2f3;
  border-radius: 7px;
  padding: 3px 9px;
}

.wa-secure-banner {
  align-self: center;
  max-width: 94%;
  background: #d6f5dd;
  border: 1px solid #bdeac8;
  color: #4b5563;
  border-radius: 8px;
  font-size: 0.64rem;
  line-height: 1.25;
  padding: 7px 9px;
}

.wa-secure-banner a {
  color: #2563eb;
  text-decoration: none;
}

.wa-msg {
  display: flex;
  animation: wa-fade-in 0.22s ease both;
}

.wa-msg:nth-child(3) {
  animation-delay: 0.05s;
}

.wa-msg:nth-child(4) {
  animation-delay: 0.1s;
}

.wa-msg:nth-child(5) {
  animation-delay: 0.15s;
}

.wa-msg--in {
  justify-content: flex-start;
}

.wa-msg--out {
  justify-content: flex-end;
}

.wa-template-card {
  width: min(286px, 93%);
  background: #fff;
  border: 1px solid #d8dee8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}

.wa-template-card:hover {
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.14);
  transform: translateY(-1px);
}

.wa-card-media {
  height: 124px;
  background: linear-gradient(140deg, #0f4660, #1e3a8a 48%, #7c3aed);
  display: grid;
  place-items: end start;
  padding: 9px;
}

.wa-card-media-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
}

.wa-card-media-sub {
  font-size: 0.64rem;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 4px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-card-media-image {
  margin-top: 8px;
  height: 62px;
  width: 100%;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.wa-card-header-text {
  padding: 8px 8px 2px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #1f2937;
}

.wa-card-body {
  padding: 9px 10px 4px;
  font-size: 0.88rem;
  line-height: 1.36;
  color: #111827;
}

.wa-card-body :deep(b) {
  font-weight: 700;
}

.wa-card-body :deep(i) {
  font-style: italic;
}

.wa-inline-note {
  margin: 0 8px 6px;
  font-size: 0.72rem;
  color: #4b5563;
}

.wa-inline-note--warn {
  color: #9f1239;
}

.wa-inline-note--muted {
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.64rem;
  letter-spacing: 0.03em;
}

.wa-product-list {
  margin: 2px 8px 6px;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  overflow: hidden;
}

.wa-product-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 7px;
  font-size: 0.72rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.wa-product-row:last-child {
  border-bottom: 0;
}

.wa-product-name {
  color: #111827;
}

.wa-product-price {
  color: #0f766e;
  font-weight: 600;
}

.wa-template-cta {
  width: calc(100% - 18px);
  margin: 2px 9px 4px;
  border: none;
  border-top: 1px solid #ebedef;
  background: transparent;
  color: #2563eb;
  font-size: 0.87rem;
  font-weight: 600;
  padding: 10px 4px 9px;
  cursor: pointer;
}

.wa-template-actions {
  display: flex;
  flex-direction: column;
  margin: 0 8px 4px;
  border-top: 1px solid #ebedef;
}

.wa-template-action {
  border: none;
  border-top: 1px solid #ebedef;
  background: transparent;
  color: #1d4ed8;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 7px 4px;
}

.wa-bubble {
  width: min(258px, 91%);
  border-radius: 8px;
  padding: 7px 9px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.wa-bubble--out {
  background: #d9fdd3;
  border-radius: 8px 8px 2px 8px;
}

.wa-bubble--in {
  background: #fff;
  border-radius: 8px 8px 8px 2px;
}

.wa-bubble p {
  margin: 0;
  font-size: 0.83rem;
  line-height: 1.35;
  color: #111827;
}

.wa-bubble a {
  display: inline-block;
  margin-top: 6px;
  color: #2563eb;
  text-decoration: none;
  font-size: 0.8rem;
}

.wa-bubble-author {
  display: inline-block;
  font-size: 0.67rem;
  color: #2563eb;
  margin-bottom: 2px;
}

.wa-meta-time {
  text-align: right;
  font-size: 0.62rem;
  color: #6b7280;
  margin: 4px 6px 5px;
}

.wa-flow-shell {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.wa-flow-top-handle {
  width: 46px;
  height: 4px;
  border-radius: 999px;
  background: #d1d5db;
  align-self: center;
  margin: 7px 0 5px;
}

.wa-flow-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
}

.wa-flow-title {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1f2937;
}

.wa-flow-close,
.wa-flow-menu {
  color: #1f2937;
  font-size: 1rem;
}

.wa-flow-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.wa-flow-eyebrow {
  margin: 0;
  font-size: 0.73rem;
  color: #6b7280;
}

.wa-flow-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.9rem;
  color: #1f2937;
}

.wa-radio {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 2px solid #8b939d;
}

.wa-radio--on {
  border-color: #16a34a;
  box-shadow: inset 0 0 0 3px #fff;
  background: #16a34a;
}

.wa-flow-products {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.wa-flow-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.wa-flow-product strong {
  font-size: 0.86rem;
  color: #111827;
}

.wa-flow-product p {
  margin: 2px 0 0;
  font-size: 0.72rem;
  color: #6b7280;
}

.wa-flow-footer {
  border-top: 1px solid #e5e7eb;
  padding: 10px 12px 12px;
}

.wa-flow-cta {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 10px 12px;
  background: #23a455;
  color: #fff;
  font-size: 0.83rem;
  font-weight: 700;
}

.wa-managed {
  margin: 8px 0 0;
  text-align: center;
  font-size: 0.68rem;
  color: #6b7280;
}

.wa-managed a {
  color: #2563eb;
  text-decoration: none;
}

.wa-inputbar {
  background: #f3f2f0;
  border-top: 1px solid #d3d8df;
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  gap: 7px;
  padding: 9px 10px;
}

.wa-input-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  border-radius: 50%;
  position: relative;
  color: #5b6573;
}

.wa-input-icon::before {
  content: '';
  position: absolute;
  inset: 0;
}

.wa-input-icon--emoji::before {
  border: 1.8px solid currentColor;
  border-radius: 50%;
}

.wa-input-icon--attach::before {
  content: '⎙';
  font-size: 14px;
  line-height: 18px;
  text-align: center;
}

.wa-input-icon--camera::before {
  content: '◫';
  font-size: 13px;
  line-height: 18px;
  text-align: center;
}

.wa-input-icon--mic {
  width: 13px;
  height: 13px;
  color: #fff;
}

.wa-input-icon--mic::before {
  content: '';
  inset: 1px 4px 3px;
  border-radius: 5px 5px 3px 3px;
  background: currentColor;
}

.wa-input-placeholder {
  background: #fff;
  border: 1px solid #cfd5dd;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.84rem;
  color: #94a0af;
}

.wa-mic {
  width: 33px;
  height: 33px;
  border: none;
  border-radius: 999px;
  background: var(--wa-accent);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 6px 14px rgba(20, 163, 89, 0.3);
}

@keyframes wa-fade-in {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 720px) {
  .wa-device {
    width: min(100%, 350px);
  }
}
</style>
