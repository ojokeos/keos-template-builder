<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Platform } from '@keos/notification-builder-core';
import { renderTemplatePreview } from './utils/renderTemplatePreview';
import type { SampleProfile } from './utils/renderTemplatePreview';

const props = withDefaults(
  defineProps<{
    getPreview: (platform: Platform, options?: { expanded?: boolean }) => any;
    selectedPlatform: Platform;
    previewProfile?: SampleProfile | null;
  }>(),
  { previewProfile: null }
);

const expanded = ref(false);
const preview = computed(() =>
  props.getPreview(props.selectedPlatform, {
    expanded: props.selectedPlatform === 'android' ? expanded.value : undefined,
  })
);

const displayPreview = computed(() => {
  const p = preview.value;
  if (!props.previewProfile) return p;
  return {
    ...p,
    title: renderTemplatePreview(p?.title ?? '', props.previewProfile!.data),
    body: renderTemplatePreview(p?.body ?? '', props.previewProfile!.data),
  };
});
</script>

<template>
  <div class="kb-preview">
    <div v-if="selectedPlatform === 'android'" class="kb-preview__toggle">
      <label class="kb-checkbox">
        <input v-model="expanded" type="checkbox" />
        <span>Expanded notification</span>
      </label>
    </div>

    <!-- ANDROID PREVIEW -->
    <div
      v-if="selectedPlatform === 'android'"
      :id="`kb-preview-panel-android`"
      class="kb-preview__device kb-preview__device--android"
      role="tabpanel"
      aria-labelledby="kb-preview-tab-android"
    >
      <div class="kb-android-status-bar">
        <span class="kb-android-time">12:30</span>
        <span class="kb-android-icons">  </span>
      </div>
      <div class="kb-android-notification" :class="{ 'kb-android-notification--expanded': expanded }">
        <div class="kb-android-header">
          <div class="kb-android-app-icon">A</div>
          <div class="kb-android-app-meta">
            <div class="kb-android-app-name">Your App</div>
            <div class="kb-android-app-channel">Promotions · now</div>
          </div>
          <div class="kb-android-more">⋮</div>
        </div>
        <div class="kb-android-body">
          <div v-if="displayPreview.title" class="kb-android-title">
            {{ displayPreview.title }}
          </div>
          <div v-if="displayPreview.body" class="kb-android-text">
            {{ displayPreview.body }}
          </div>
          <div v-if="displayPreview.imageUrl" class="kb-android-image">
            <img :src="displayPreview.imageUrl" alt="" />
          </div>
          <div v-if="displayPreview.actions && displayPreview.actions.length" class="kb-android-actions">
            <button
              v-for="a in displayPreview.actions"
              :key="a.id"
              type="button"
              class="kb-android-action-btn"
            >
              {{ a.label || 'Action' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- IOS PREVIEW -->
    <div
      v-else-if="selectedPlatform === 'ios'"
      :id="`kb-preview-panel-ios`"
      class="kb-preview__device kb-preview__device--ios"
      role="tabpanel"
      aria-labelledby="kb-preview-tab-ios"
    >
      <div class="kb-ios-status-bar">
        <span class="kb-ios-time">9:41</span>
        <span class="kb-ios-indicators">•••</span>
      </div>
      <div class="kb-ios-banner">
        <div class="kb-ios-app-icon">A</div>
        <div class="kb-ios-content">
          <div class="kb-ios-meta">
            <span class="kb-ios-app-name">Your App</span>
            <span class="kb-ios-time-label">now</span>
          </div>
          <div v-if="displayPreview.title" class="kb-ios-title">
            {{ displayPreview.title }}
          </div>
          <div v-if="displayPreview.body" class="kb-ios-text">
            {{ displayPreview.body }}
          </div>
          <div v-if="displayPreview.actions && displayPreview.actions.length" class="kb-ios-actions">
            <button
              v-for="a in displayPreview.actions"
              :key="a.id"
              type="button"
              class="kb-ios-action-btn"
            >
              {{ a.label || 'Action' }}
            </button>
          </div>
        </div>
        <div v-if="displayPreview.imageUrl" class="kb-ios-thumb">
          <img :src="displayPreview.imageUrl" alt="" />
        </div>
      </div>
    </div>

    <!-- WEB PREVIEW -->
    <div
      v-else
      :id="`kb-preview-panel-web`"
      class="kb-preview__device kb-preview__device--web"
      role="tabpanel"
      aria-labelledby="kb-preview-tab-web"
    >
      <div class="kb-web-browser-chrome">
        <span class="kb-web-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="kb-web-url-bar">
          <span class="kb-web-lock">🔒</span>
          <span class="kb-web-origin">yourapp.com</span>
        </div>
      </div>
      <div class="kb-web-toast">
        <div class="kb-web-header">
          <div class="kb-web-site-icon">Y</div>
          <div class="kb-web-site-meta">
            <div class="kb-web-site-name">yourapp.com</div>
            <div class="kb-web-site-time">now</div>
          </div>
        </div>
        <div class="kb-web-body">
          <div v-if="displayPreview.title" class="kb-web-title">
            {{ displayPreview.title }}
          </div>
          <div v-if="displayPreview.body" class="kb-web-text">
            {{ displayPreview.body }}
          </div>
          <div v-if="displayPreview.imageUrl" class="kb-web-image">
            <img :src="displayPreview.imageUrl" alt="" />
          </div>
        </div>
        <div v-if="displayPreview.actions && displayPreview.actions.length" class="kb-web-actions">
            <button
              v-for="(a, idx) in displayPreview.actions"
            :key="a.id || idx"
            type="button"
            class="kb-web-action-btn"
            :class="{ 'kb-web-action-btn--secondary': Number(idx) > 0 }"
          >
            {{ a.label || 'Action' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-preview {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  background: #f8fafc;
  width: 100%;
  box-sizing: border-box;
}
.kb-preview__toggle {
  margin-bottom: 0.5rem;
}
.kb-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  cursor: pointer;
}
.kb-preview__device {
  border-radius: 16px;
  padding: 0.75rem;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.18);
  background: #020617;
  color: #e5e7eb;
  font-size: 0.8125rem;
  max-width: 100%;
  margin: 0 auto;
}

/* Android */
.kb-preview__device--android {
  max-width: 360px;
}
.kb-android-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  opacity: 0.85;
  margin-bottom: 6px;
}
.kb-android-time {
  letter-spacing: 0.03em;
}
.kb-android-icons {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.kb-android-notification {
  background: #111827;
  border-radius: 12px;
  padding: 8px 10px;
}
.kb-android-notification--expanded {
  padding-bottom: 10px;
}
.kb-android-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.kb-android-app-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #0ea5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}
.kb-android-app-meta {
  flex: 1;
}
.kb-android-app-name {
  font-size: 0.75rem;
  font-weight: 600;
}
.kb-android-app-channel {
  font-size: 0.7rem;
  color: #9ca3af;
}
.kb-android-more {
  font-size: 1rem;
  color: #9ca3af;
}
.kb-android-body {
  margin-top: 4px;
}
.kb-android-title {
  font-weight: 600;
  font-size: 0.8125rem;
  margin-bottom: 2px;
}
.kb-android-text {
  font-size: 0.78rem;
  color: #d1d5db;
}
.kb-android-image {
  margin-top: 6px;
}
.kb-android-image img {
  width: 100%;
  border-radius: 8px;
  display: block;
}
.kb-android-actions {
  margin-top: 6px;
  display: flex;
  gap: 8px;
}
.kb-android-action-btn {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: transparent;
  color: #e5e7eb;
  font-size: 0.75rem;
}

/* iOS */
.kb-preview__device--ios {
  max-width: 360px;
  background: radial-gradient(circle at top, #1e293b 0, #020617 60%);
}
.kb-ios-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding: 0 4px 8px;
  color: #e5e7eb;
}
.kb-ios-indicators {
  opacity: 0.8;
}
.kb-ios-banner {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 14px;
  padding: 8px 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.kb-ios-app-icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: linear-gradient(135deg, #22c55e, #0ea5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}
.kb-ios-content {
  flex: 1;
  min-width: 0;
}
.kb-ios-meta {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 0.75rem;
  color: #9ca3af;
}
.kb-ios-app-name {
  font-weight: 600;
  color: #e5e7eb;
}
.kb-ios-title {
  margin-top: 2px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #f9fafb;
}
.kb-ios-text {
  margin-top: 1px;
  font-size: 0.78rem;
  color: #d1d5db;
}
.kb-ios-thumb {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
}
.kb-ios-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.kb-ios-actions {
  margin-top: 4px;
  display: flex;
  gap: 6px;
}
.kb-ios-action-btn {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: transparent;
  color: #e5e7eb;
  font-size: 0.75rem;
}

/* Web */
.kb-preview__device--web {
  max-width: 420px;
  background: #0b1120;
}
.kb-web-browser-chrome {
  display: flex;
  align-items: center;
  padding: 4px 8px 8px;
}
.kb-web-dots {
  display: flex;
  gap: 4px;
  margin-right: 8px;
}
.kb-web-dots span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #475569;
}
.kb-web-url-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #020617;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.75rem;
  color: #e5e7eb;
}
.kb-web-lock {
  font-size: 0.8rem;
}
.kb-web-origin {
  opacity: 0.9;
}
.kb-web-toast {
  margin-top: 6px;
  margin-left: auto;
  width: 320px;
  background: #020617;
  border-radius: 8px;
  padding: 8px 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
}
.kb-web-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.kb-web-site-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}
.kb-web-site-meta {
  flex: 1;
}
.kb-web-site-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #e5e7eb;
}
.kb-web-site-time {
  font-size: 0.7rem;
  color: #94a3b8;
}
.kb-web-body {
  font-size: 0.78rem;
  color: #e5e7eb;
}
.kb-web-title {
  font-weight: 600;
  margin-bottom: 2px;
}
.kb-web-text {
  color: #cbd5f5;
}
.kb-web-image {
  margin-top: 6px;
}
.kb-web-image img {
  width: 100%;
  border-radius: 6px;
}
.kb-web-actions {
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}
.kb-web-action-btn {
  border-radius: 999px;
  border: 1px solid #1d4ed8;
  background: #1d4ed8;
  color: #e5e7eb;
  font-size: 0.75rem;
  padding: 2px 10px;
  cursor: default;
}
.kb-web-action-btn--secondary {
  background: transparent;
  border-color: #475569;
}
</style>
