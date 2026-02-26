<script setup lang="ts">
import { spacing } from '@keos/notification-builder-ui-tokens';

withDefaults(
  defineProps<{
    label?: string;
    /** Optional id for section (e.g. for outline scroll) */
    sectionId?: string;
  }>(),
  { label: '' }
);
</script>

<template>
  <div
    class="kb-form-shell"
    :id="sectionId ?? undefined"
    :style="{
      padding: `${spacing[24]}px ${spacing[24]}px ${spacing[32]}px`,
      marginBottom: 0,
    }"
  >
    <div v-if="label" class="kb-form-shell__head" :style="{ marginBottom: spacing[24], paddingBottom: spacing[24], borderBottom: `1px solid #f1f5f9` }">
      <span class="kb-form-shell__label" :style="{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: spacing[12] }">{{ label }}</span>
      <slot name="head" />
    </div>
    <div v-else class="kb-form-shell__head">
      <slot name="head" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.kb-form-shell__label {
  display: block;
}
</style>
