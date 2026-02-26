<script setup lang="ts">
import type { DeliverySummary } from '@keos/notification-builder-core';
import { spacing, radius, colors } from '@keos/notification-builder-ui-tokens';

defineProps<{
  summary: DeliverySummary;
}>();
</script>

<template>
  <div
    class="kb-delivery-summary"
    :style="{
      padding: `${spacing[16]}px`,
      borderRadius: `${radius.card}px`,
      background: colors.neutral.bgCard,
      border: `1px solid ${colors.neutral.border}`,
      marginTop: `${spacing[16]}px`,
    }"
  >
    <h4 class="kb-delivery-summary__title" :style="{ fontSize: '0.875rem', fontWeight: 600, margin: `0 0 ${spacing[8]}px 0` }">Delivery summary</h4>
    <dl class="kb-delivery-summary__list" :style="{ margin: 0, fontSize: '0.8125rem', color: colors.neutral.textMeta }">
      <div class="kb-delivery-summary__row">
        <dt :style="{ margin: 0 }">Send time</dt>
        <dd :style="{ margin: 0 }">{{ summary.sendTime }}</dd>
      </div>
      <div class="kb-delivery-summary__row">
        <dt :style="{ margin: 0 }">Audience</dt>
        <dd :style="{ margin: 0 }">{{ summary.audienceType }}</dd>
      </div>
      <div v-if="summary.estimatedReach !== undefined" class="kb-delivery-summary__row">
        <dt :style="{ margin: 0 }">Estimated reach</dt>
        <dd :style="{ margin: 0 }">{{ summary.estimatedReach.toLocaleString() }}</dd>
      </div>
      <div class="kb-delivery-summary__row">
        <dt :style="{ margin: 0 }">Platforms</dt>
        <dd :style="{ margin: 0 }">{{ summary.platforms.join(', ') }}</dd>
      </div>
      <div class="kb-delivery-summary__row">
        <dt :style="{ margin: 0 }">Priority</dt>
        <dd :style="{ margin: 0 }">{{ summary.priority }}</dd>
      </div>
      <div class="kb-delivery-summary__row">
        <dt :style="{ margin: 0 }">TTL</dt>
        <dd :style="{ margin: 0 }">{{ summary.ttlLabel }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.kb-delivery-summary__row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 0;
}
.kb-delivery-summary__row dt {
  color: var(--kb-text-muted, #64748b);
}
</style>
