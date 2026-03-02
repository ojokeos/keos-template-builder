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

const previewTitle = computed(() => props.template?.templateName || 'Business Account');
const previewCategory = computed(() => {
  const c = props.template?.templateCategory;
  if (!c) return '';
  return c.charAt(0).toUpperCase() + c.slice(1);
});
const previewFormat = computed(() => props.template?.format || 'text');
</script>

<template>
  <div class="wa-preview-root">
    <div class="wa-device">
      <div class="wa-notch"></div>
      <div class="wa-app">
        <div class="wa-topbar">
          <div class="wa-left">
            <span class="wa-back">&#x2039;</span>
            <div class="wa-avatar"><span class="wa-avatar-icon">B</span></div>
          </div>
          <div class="wa-chat-meta">
            <div class="wa-chat-title">{{ previewTitle }}</div>
            <div class="wa-chat-status">Business account</div>
          </div>
          <div class="wa-actions" aria-hidden="true">
            <span>📹</span>
            <span>📞</span>
            <span>⋮</span>
          </div>
        </div>

        <div class="wa-thread">
          <div class="wa-encryption-banner">
            Messages and calls are end-to-end encrypted. No one outside this chat can read or listen.
          </div>
          <div class="wa-date-chip">Today</div>

          <div class="wa-row wa-row--in">
            <div class="wa-bubble wa-bubble--in">
              <div class="wa-bubble-text">Hello, I just placed an order. Any update?</div>
              <div class="wa-meta">12:29</div>
            </div>
          </div>

          <div class="wa-row wa-row--out">
            <div class="wa-bubble wa-bubble--out wa-template">
              <div class="wa-template-meta">
                <span>{{ previewCategory || 'utility' }}</span>
                <span>{{ previewFormat }}</span>
                <span v-if="template.templateLanguage">{{ template.templateLanguage }}</span>
              </div>

              <div v-if="template.header && template.header.type !== 'text'" class="wa-media">
                <strong>{{ template.header.type.toUpperCase() }}</strong>
                <span v-if="template.header.url" class="wa-media-meta">{{ template.header.url }}</span>
                <span v-else-if="template.header.filename" class="wa-media-meta">{{ template.header.filename }}</span>
              </div>

              <div v-if="template.header && template.header.type === 'text'" class="wa-header">
                {{ template.header.text }}
              </div>

              <div class="wa-body" v-html="formattedBody"></div>
              <div v-if="template.mediaCaption" class="wa-media-caption">{{ template.mediaCaption }}</div>

              <div v-if="template.location" class="wa-location-inline">
                <span class="wa-pin">📍</span>
                <span>
                  {{
                    template.location.name ||
                    template.location.address ||
                    `${template.location.lat}, ${template.location.lng}`
                  }}
                </span>
              </div>

              <div v-if="template.footer" class="wa-footer">{{ template.footer }}</div>

              <div v-if="template.coupon?.code" class="wa-coupon">
                Coupon: <strong>{{ template.coupon.code }}</strong>
              </div>

              <div v-if="template.limitedOffer" class="wa-lto">
                Limited-time offer ends: {{ template.limitedOffer }}
              </div>

              <div v-if="template.auth?.code" class="wa-auth">
                <span class="wa-auth-label">Verification code</span>
                <strong class="wa-auth-code">{{ template.auth.code }}</strong>
              </div>

              <div v-if="template.flow" class="wa-flow">
                <span class="wa-flow-label">WhatsApp Flow</span>
                <span v-if="template.flow.id" class="wa-flow-id">ID: {{ template.flow.id }}</span>
                <span class="wa-flow-cta">{{ template.flow.ctaLabel || 'Open flow' }}</span>
              </div>

              <div v-if="template.multiProduct?.length" class="wa-products">
                <div
                  v-for="(p, i) in template.multiProduct.slice(0, 3)"
                  :key="i"
                  class="wa-product"
                >
                  <div class="wa-product-name">{{ p.name || 'Product' }}</div>
                  <div class="wa-product-price">{{ p.price || '-' }}</div>
                </div>
                <div v-if="template.multiProduct.length > 3" class="wa-product-more">
                  +{{ template.multiProduct.length - 3 }} more
                </div>
              </div>

              <div v-if="template.buttons?.length" class="wa-buttons">
                <div v-for="(btn, i) in template.buttons" :key="i" class="wa-btn">{{ btn.text }}</div>
              </div>

              <div class="wa-meta">12:34 <span class="wa-ticks">✓✓</span></div>
            </div>
          </div>

          <div class="wa-row wa-row--in">
            <div class="wa-bubble wa-bubble--in">
              <div class="wa-bubble-text">Perfect, thank you.</div>
              <div class="wa-meta">12:35</div>
            </div>
          </div>
        </div>

        <div class="wa-inputbar">
          <span>😊</span>
          <span class="wa-placeholder">Message</span>
          <span>📎</span>
          <span>📷</span>
          <button class="wa-mic" type="button" aria-label="voice">🎤</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wa-preview-root {
  background: radial-gradient(circle at 30% 20%, #dae6ea 0%, #d3dde1 40%, #cfd8dc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
}

.wa-device {
  width: clamp(300px, 86vw, 360px);
  aspect-ratio: 9 / 19.5;
  height: auto;
  max-height: 700px;
  border-radius: 34px;
  padding: 8px;
  background: linear-gradient(160deg, #1f2933 0%, #111827 100%);
  box-shadow:
    0 32px 70px rgba(0, 0, 0, 0.35),
    0 8px 18px rgba(0, 0, 0, 0.25);
  position: relative;
}

.wa-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 126px;
  height: 22px;
  border-radius: 0 0 14px 14px;
  background: #111827;
  z-index: 2;
}

.wa-app {
  width: 100%;
  height: 100%;
  border-radius: 26px;
  overflow: hidden;
  background: #efeae2;
  background-image: url('https://static.whatsapp.net/rsrc.php/v3/yA/r/3XjvM8yK5Q0.png');
  background-size: 420px auto;
  background-position: center;
  display: flex;
  flex-direction: column;
}

.wa-topbar {
  background: #1f2c33;
  color: #e9edef;
  padding: 13px 12px 11px;
  display: flex;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.wa-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wa-back {
  font-size: 1.4rem;
  line-height: 1;
  color: #d1d7db;
}

.wa-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #54656f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
}

.wa-chat-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.wa-chat-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #f8f9fa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-chat-status {
  font-size: 0.73rem;
  color: #b1bcc4;
}

.wa-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d1d7db;
  font-size: 1rem;
}

.wa-thread {
  flex: 1;
  padding: 10px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.wa-encryption-banner {
  align-self: center;
  max-width: 92%;
  background: #fff8cc;
  color: #5c5b53;
  border-radius: 8px;
  border: 1px solid #f4e6a1;
  font-size: 0.67rem;
  line-height: 1.35;
  padding: 6px 8px;
  text-align: center;
}

.wa-date-chip {
  align-self: center;
  background: #d8efff;
  color: #54656f;
  font-size: 0.68rem;
  padding: 4px 10px;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.wa-row {
  display: flex;
  align-items: flex-end;
}

.wa-row--in {
  justify-content: flex-start;
}

.wa-row--out {
  justify-content: flex-end;
}

.wa-bubble {
  max-width: 88%;
  position: relative;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.09);
  font-size: 0.88rem;
  color: #111b21;
  padding: 7px 9px 4px;
}

.wa-bubble--in {
  background: #ffffff;
  border-radius: 8px 8px 8px 2px;
}

.wa-bubble--out {
  background: #d9fdd3;
  border-radius: 8px 8px 2px 8px;
}

.wa-bubble-text {
  font-size: 0.88rem;
  line-height: 1.38;
}

.wa-template {
  min-width: 240px;
}

.wa-template-meta {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}

.wa-template-meta span {
  font-size: 0.63rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: rgba(17, 27, 33, 0.08);
  color: #3b4a54;
  border-radius: 999px;
  padding: 2px 6px;
}

.wa-media {
  background: rgba(31, 44, 51, 0.08);
  border-radius: 6px;
  padding: 8px 9px;
  text-align: left;
  margin-bottom: 6px;
  color: #3b4a54;
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-media-meta {
  font-size: 0.67rem;
  color: #4a5963;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-header {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 4px;
  color: #111b21;
}

.wa-body {
  font-size: 0.86rem;
  line-height: 1.4;
  color: #111b21;
  white-space: pre-wrap;
}

.wa-body :deep(b) {
  font-weight: 700;
}

.wa-body :deep(i) {
  font-style: italic;
}

.wa-location-inline {
  margin-top: 4px;
  font-size: 0.74rem;
  color: #54656f;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.wa-media-caption {
  margin-top: 4px;
  font-size: 0.71rem;
  color: #54656f;
}

.wa-footer {
  font-size: 0.67rem;
  color: #667781;
  margin-top: 5px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

.wa-coupon {
  margin-top: 6px;
  font-size: 0.73rem;
  background: #fff7ed;
  color: #9a3412;
  border: 1px dashed #fdba74;
  border-radius: 6px;
  padding: 5px 7px;
}

.wa-lto {
  margin-top: 6px;
  font-size: 0.7rem;
  color: #9f1239;
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 6px;
  padding: 5px 7px;
}

.wa-auth {
  margin-top: 6px;
  border: 1px solid #d1fae5;
  background: #ecfdf5;
  border-radius: 6px;
  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.wa-auth-label {
  font-size: 0.68rem;
  color: #065f46;
}

.wa-auth-code {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: #064e3b;
}

.wa-flow {
  margin-top: 6px;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  border-radius: 6px;
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-flow-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: #1d4ed8;
}

.wa-flow-id {
  font-size: 0.66rem;
  color: #1e40af;
}

.wa-flow-cta {
  font-size: 0.7rem;
  color: #1e3a8a;
}

.wa-products {
  margin-top: 6px;
  display: grid;
  gap: 4px;
}

.wa-product {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.wa-product-name {
  font-size: 0.72rem;
  color: #111b21;
}

.wa-product-price {
  font-size: 0.69rem;
  color: #0f766e;
}

.wa-product-more {
  font-size: 0.66rem;
  color: #64748b;
}

.wa-buttons {
  border-top: 1px solid rgba(17, 27, 33, 0.12);
  margin-top: 6px;
}

.wa-btn {
  text-align: center;
  padding: 10px 8px;
  border-top: 1px solid rgba(17, 27, 33, 0.12);
  color: #00a884;
  font-weight: 500;
  font-size: 0.79rem;
}

.wa-meta {
  margin-top: 2px;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  font-size: 0.64rem;
  color: #667781;
  line-height: 1;
}

.wa-ticks {
  color: #53bdeb;
  letter-spacing: -0.06em;
  font-weight: 700;
}

.wa-pin {
  font-size: 0.8rem;
}

.wa-inputbar {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 8px;
  align-items: center;
  padding: 8px 10px calc(8px + env(safe-area-inset-bottom));
  background: #f0f2f5;
  border-top: 1px solid #dfe5e7;
  color: #54656f;
}

.wa-placeholder {
  background: #ffffff;
  border: 1px solid #d1d7db;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.84rem;
  color: #8696a0;
}

.wa-mic {
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  background: #00a884;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
}

@media (max-width: 720px) {
  .wa-device {
    width: min(100%, 340px);
    max-height: 640px;
    border-radius: 28px;
    padding: 7px;
  }
  .wa-app {
    border-radius: 22px;
  }
  .wa-notch {
    width: 110px;
    height: 18px;
  }
}
</style>
