<script setup lang="ts">
import { spacing, colors, radius } from '@keos/notification-builder-ui-tokens';

withDefaults(
  defineProps<{
    /** Current channel for the switcher */
    channel?: 'push' | 'whatsapp' | 'sms' | 'email';
    /** Environment label, e.g. Sandbox / Production */
    environment?: string;
    /** Help URL for documentation icon */
    helpUrl?: string;
  }>(),
  { channel: 'push', environment: '', helpUrl: '' }
);

const emit = defineEmits<{
  'switch-channel': [channel: 'push' | 'whatsapp' | 'sms' | 'email'];
}>();

const channels = [
  { id: 'push' as const, label: 'Push' },
  { id: 'whatsapp' as const, label: 'WhatsApp' },
  { id: 'sms' as const, label: 'SMS' },
  { id: 'email' as const, label: 'Email' },
];
</script>

<template>
  <div class="kb-shell">
    <header class="kb-shell__header" :style="{ padding: `${spacing[12]}px ${spacing[24]}px`, borderBottom: `1px solid ${colors.neutral.border}`, background: colors.neutral.bg }">
      <div class="kb-shell__brand">
        <span class="kb-shell__logo" aria-hidden="true">KEOS</span>
      </div>
      <nav class="kb-shell__nav" role="tablist" aria-label="Channel">
        <button
          v-for="ch in channels"
          :key="ch.id"
          type="button"
          class="kb-shell__channel"
          :class="{ 'kb-shell__channel--active': channel === ch.id }"
          role="tab"
          :aria-selected="channel === ch.id"
          @click="emit('switch-channel', ch.id)"
        >
          {{ ch.label }}
        </button>
      </nav>
      <div class="kb-shell__meta">
        <span v-if="environment" class="kb-shell__env" :style="{ padding: `2px 8px`, borderRadius: `${radius.input}px`, fontSize: '0.75rem', background: colors.neutral.bg, color: colors.neutral.textMuted }">
          {{ environment }}
        </span>
        <a
          v-if="helpUrl"
          :href="helpUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="kb-shell__help"
          aria-label="Help / Documentation"
          :style="{ color: colors.neutral.textMuted, fontSize: '1.25rem', textDecoration: 'none' }"
        >
          ?
        </a>
      </div>
    </header>
    <div class="kb-shell__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.kb-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.kb-shell__header {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}
.kb-shell__brand {
  flex-shrink: 0;
}
.kb-shell__logo {
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.02em;
  color: #0f172a;
}
.kb-shell__nav {
  display: flex;
  gap: 4px;
}
.kb-shell__channel {
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
}
.kb-shell__channel:hover {
  color: #334155;
  background: #f1f5f9;
}
.kb-shell__channel--active {
  color: #0f172a;
  background: #e2e8f0;
}
.kb-shell__meta {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}
.kb-shell__help:hover {
  color: #0f172a;
}
.kb-shell__body {
  flex: 1;
  min-height: 0;
}
</style>
