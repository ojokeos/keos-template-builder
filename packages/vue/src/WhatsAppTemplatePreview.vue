<script setup lang="ts">
import { computed, ref } from 'vue';

export interface WaPreviewTemplate {
  header?: {
    type: 'text' | 'image' | 'video' | 'document';
    text?: string;
    url?: string;
    filename?: string;
  };
  body: string;
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
}

const props = defineProps<{
  template: WaPreviewTemplate;
}>();

const theme = ref<'light' | 'dark'>('light');
const isDark = computed(() => theme.value === 'dark');

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

const googleMapImage = computed(() => {
  const loc = props.template.location;
  if (!loc) return '';
  const { lat, lng } = loc;
  if (lat == null || lng == null) return '';
  // NOTE: In a real app you would inject an API key or use a proxy.
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&markers=${lat},${lng}`;
});
</script>

<template>
  <div class="wa-wrapper" :class="{ 'wa-wrapper--dark': isDark }">
    <div class="phone" :class="{ 'phone--dark': isDark }">
      <div class="phone-theme-toggle">
        <button
          type="button"
          class="phone-theme-btn"
          :class="{ 'phone-theme-btn--active': !isDark }"
          @click="theme = 'light'"
        >
          Light
        </button>
        <button
          type="button"
          class="phone-theme-btn"
          :class="{ 'phone-theme-btn--active': isDark }"
          @click="theme = 'dark'"
        >
          Dark
        </button>
      </div>
      <div class="phone-header">
        <div class="phone-header-left">
          <div class="avatar"></div>
          <div class="meta">
            <div class="name">Customer</div>
            <div class="status">online</div>
          </div>
        </div>
        <div class="phone-header-actions" aria-hidden="true">
          <!-- Video call icon -->
          <button type="button" class="icon-btn">
            <svg viewBox="0 0 24 24" class="icon-svg" focusable="false">
              <path
                d="M4 7.75A1.75 1.75 0 0 1 5.75 6h7.5A1.75 1.75 0 0 1 15 7.75v1.69l3.02-2.01A.75.75 0 0 1 19.25 8v8a.75.75 0 0 1-1.23.59L15 14.58v1.67A1.75 1.75 0 0 1 13.25 18h-7.5A1.75 1.75 0 0 1 4 16.25z"
                fill="currentColor"
              />
            </svg>
          </button>
          <!-- Voice call icon -->
          <button type="button" class="icon-btn">
            <svg viewBox="0 0 24 24" class="icon-svg" focusable="false">
              <path
                d="M6.54 4.23 8.4 4.5a1.25 1.25 0 0 1 1.06.99l.42 2.11a1.25 1.25 0 0 1-.36 1.16l-1.03 1.02a8.46 8.46 0 0 0 4.23 4.23l1.02-1.03a1.25 1.25 0 0 1 1.16-.36l2.11.42a1.25 1.25 0 0 1 .99 1.06l.27 1.86a1.25 1.25 0 0 1-1.07 1.39C16.78 17.8 14 17 11.5 15.5S6.2 11.22 5.02 8.4A1.25 1.25 0 0 1 6.4 7.33l.14-.95a1.25 1.25 0 0 1 0-.28z"
                fill="currentColor"
              />
            </svg>
          </button>
          <!-- Menu (three dots) -->
          <button type="button" class="icon-btn">
            <span class="dots"></span>
          </button>
        </div>
      </div>
      <div class="chat-area">
        <div class="bubble">
          <!-- HEADER -->
          <div v-if="template.header" class="header">
            <div v-if="template.header.type === 'text'" class="header-text">
              {{ template.header.text }}
            </div>
            <img
              v-else-if="template.header.type === 'image'"
              :src="template.header.url"
              class="media"
              alt=""
            />
            <video
              v-else-if="template.header.type === 'video'"
              :src="template.header.url"
              controls
              class="media"
            />
            <div v-else-if="template.header.type === 'document'" class="document">
              📄 {{ template.header.filename }}
            </div>
          </div>

          <!-- BODY -->
          <div class="body" v-html="formattedBody"></div>

          <!-- LOCATION -->
          <div v-if="template.location" class="location-card">
            <img
              v-if="googleMapImage"
              :src="googleMapImage"
              class="map"
              alt=""
            />
            <div class="location-info">
              <strong>{{ template.location.name }}</strong>
              <div>{{ template.location.address }}</div>
            </div>
          </div>

          <!-- CATALOG -->
          <div v-if="template.catalog" class="catalog-card">
            <div class="catalog-header">
              🛍
              <span class="catalog-title">
                {{
                  typeof template.catalog === 'object' && template.catalog.label
                    ? template.catalog.label
                    : 'Full catalog'
                }}
              </span>
            </div>
            <div class="catalog-sub">Browse all items</div>
            <div class="catalog-cta">VIEW CATALOG</div>
          </div>

          <!-- MULTI PRODUCT -->
          <div v-if="template.multiProduct?.length" class="multi-products">
            <div
              v-for="(product, i) in template.multiProduct"
              :key="i"
              class="product"
            >
              <img
                v-if="product.image"
                :src="product.image"
                alt=""
              />
              <div class="product-info">
                <div class="title">{{ product.name }}</div>
                <div class="price">{{ product.price }}</div>
              </div>
            </div>
          </div>

          <!-- COUPON -->
          <div v-if="template.coupon" class="coupon">
            <div class="coupon-discount">Special offer</div>
            <div class="coupon-code">
              Code:
              <span>{{ template.coupon.code }}</span>
            </div>
            <div class="coupon-cta">COPY CODE</div>
          </div>

          <!-- LIMITED TIME OFFER -->
          <div v-if="template.limitedOffer" class="offer">
            ⏳ Offer expires {{ template.limitedOffer }}
          </div>

          <!-- AUTHENTICATION -->
          <div v-if="template.auth" class="auth">
            <div class="auth-icon">🔐</div>
            <div class="auth-title">Confirm your phone number</div>
            <div class="auth-code">{{ template.auth.code }}</div>
            <button type="button" class="auth-btn">CONTINUE</button>
          </div>

          <!-- FOOTER -->
          <div v-if="template.footer" class="footer">
            {{ template.footer }}
          </div>

          <!-- BUTTONS -->
          <div v-if="template.buttons?.length" class="buttons">
            <button
              v-for="(btn, i) in template.buttons"
              :key="i"
              type="button"
              class="button"
            >
              {{ btn.text }}
            </button>
          </div>

          <!-- TIME -->
          <div class="time">
            12:45 ✓✓
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wa-wrapper {
  background: #e5ddd5;
  padding: 40px;
  display: flex;
  justify-content: center;
}

.phone {
  width: 360px;
  max-width: 100%;
  background: #efeae2;
  padding: 16px 12px 20px 12px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

.phone-theme-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-bottom: 4px;
}
.phone-theme-btn {
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: rgba(255, 255, 255, 0.85);
  padding: 2px 8px;
  font-size: 10px;
  line-height: 1.4;
  color: #475569;
  cursor: pointer;
}
.phone-theme-btn--active {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
}

.phone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px 10px 6px;
}
.phone-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #38bdf8, #0f766e);
}
.meta {
  display: flex;
  flex-direction: column;
}
.meta .name {
  font-size: 13px;
  font-weight: 600;
  color: #020617;
}
.meta .status {
  font-size: 11px;
  color: #22c55e;
}
.phone-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0f172a;
  opacity: 0.85;
  font-size: 16px;
}
.icon-btn {
  border: none;
  background: transparent;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  cursor: default;
}
.icon-svg {
  width: 18px;
  height: 18px;
}
.dots {
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: currentColor;
  position: relative;
}
.dots::before,
.dots::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: currentColor;
  left: 0;
}
.dots::before {
  top: -5px;
}
.dots::after {
  top: 5px;
}

.chat-area {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: 260px;
}

.bubble {
  background: #d9fdd3;
  border-radius: 18px;
  padding: 12px 14px 18px 14px;
  max-width: 85%;
  font-size: 14px;
  position: relative;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header {
  margin-bottom: 4px;
}
.header-text {
  font-weight: 600;
  margin-bottom: 4px;
}

.media {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 6px;
}

.body {
  white-space: normal;
  line-height: 1.4;
  color: #111827;
}

.body :deep(b) {
  font-weight: 700;
}

.body :deep(i) {
  font-style: italic;
}

.location-card {
  margin-top: 6px;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
}
.map {
  width: 100%;
  display: block;
}
.location-info {
  padding: 6px 8px 8px;
  font-size: 12px;
  color: #111827;
}
.location-info strong {
  display: block;
  margin-bottom: 2px;
}

.catalog-card {
  margin-top: 6px;
  border-radius: 10px;
  background: #ffffff;
  font-size: 13px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.catalog-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px 4px 10px;
  font-weight: 600;
  color: #111827;
}
.catalog-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.catalog-sub {
  padding: 0 10px 8px 28px;
  font-size: 12px;
  color: #6b7280;
}
.catalog-cta {
  border-top: 1px solid #e5e7eb;
  padding: 8px 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #00a884;
}

.multi-products {
  margin-top: 6px;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
}
.product {
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
}
.product:last-child {
  border-bottom: 0;
}
.product img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
}
.product-info {
  flex: 1;
}
.product-info .title {
  font-size: 13px;
  color: #111827;
}
.price {
  font-size: 12px;
  color: #16a34a;
  margin-top: 2px;
}

.coupon,
.offer,
.auth {
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #ffffff;
  font-size: 13px;
}
.coupon {
  border: 2px dashed #00a884;
  background: #f0fff4;
  text-align: center;
}
.coupon-discount {
  font-weight: 700;
  color: #00a884;
  margin-bottom: 2px;
}
.coupon-code {
  font-size: 12px;
  color: #111827;
}
.coupon-code span {
  font-weight: 600;
}
.coupon-cta {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #00a884;
}
.offer {
  color: #b91c1c;
  font-weight: 600;
}
.auth {
  text-align: center;
}
.auth-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.auth-title {
  font-size: 14px;
  margin-bottom: 4px;
  color: #111827;
}
.auth-code {
  font-size: 13px;
  margin-bottom: 8px;
  color: #4b5563;
}
.auth-btn {
  border: none;
  background: #00a884;
  color: #ffffff;
  padding: 6px 18px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  cursor: default;
}

.footer {
  font-size: 11px;
  color: #667781;
  margin-top: 8px;
}

.buttons {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.button {
  background: #ffffff;
  border: none;
  border-top: 1px solid #e5e7eb;
  padding: 10px;
  font-size: 13px;
  cursor: default;
  color: #00a884;
  font-weight: 500;
  text-align: center;
}

.time {
  font-size: 10px;
  color: #667781;
  position: absolute;
  bottom: 4px;
  right: 8px;
}

.wa-wrapper.wa-wrapper--dark {
  background: #111b21;
}
.wa-wrapper.wa-wrapper--dark .phone {
  background: #111b21;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7);
}
.wa-wrapper.wa-wrapper--dark .meta .name {
  color: #e9edef;
}
.wa-wrapper.wa-wrapper--dark .meta .status {
  color: #25d366;
}
.wa-wrapper.wa-wrapper--dark .bubble {
  background: #005e54;
  color: #e9edef;
}
.wa-wrapper.wa-wrapper--dark .body {
  color: #e9edef;
}
.wa-wrapper.wa-wrapper--dark .location-card,
.wa-wrapper.wa-wrapper--dark .catalog-card,
.wa-wrapper.wa-wrapper--dark .multi-products,
.wa-wrapper.wa-wrapper--dark .coupon,
.wa-wrapper.wa-wrapper--dark .offer,
.wa-wrapper.wa-wrapper--dark .auth {
  background: #202c33;
  border-color: #2f3e4d;
}
.wa-wrapper.wa-wrapper--dark .catalog-sub,
.wa-wrapper.wa-wrapper--dark .coupon-code,
.wa-wrapper.wa-wrapper--dark .auth-code,
.wa-wrapper.wa-wrapper--dark .footer,
.wa-wrapper.wa-wrapper--dark .time {
  color: #9ca3af;
}
.wa-wrapper.wa-wrapper--dark .button {
  border-top-color: #374151;
  color: #25d366;
}
.wa-wrapper.wa-wrapper--dark .phone-theme-btn {
  background: rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
  border-color: rgba(148, 163, 184, 0.6);
}
.wa-wrapper.wa-wrapper--dark .phone-theme-btn--active {
  background: #e9edef;
  color: #111827;
  border-color: #e9edef;
}
</style>
