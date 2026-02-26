<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Align buttons (default: end) */
    align?: 'start' | 'end' | 'between';
  }>(),
  { align: 'end' }
);
</script>

<template>
  <footer
    class="kb-actions-bar"
    role="contentinfo"
    :style="{
      display: 'flex',
      justifyContent: align === 'start' ? 'flex-start' : align === 'between' ? 'space-between' : 'flex-end',
      gap: '16px',
      padding: '20px 32px 24px',
      marginTop: '24px',
      background: '#fff',
      borderTop: '1px solid #e2e8f0',
      position: 'sticky',
      bottom: 0,
      zIndex: 10,
      boxShadow: '0 -4px 24px -4px rgba(15, 23, 42, 0.06)',
    }"
  >
    <slot />
  </footer>
</template>
