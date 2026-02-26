<script setup lang="ts">
import type { CampaignDelivery } from '@keos/notification-builder-core';

defineProps<{
  delivery: CampaignDelivery;
}>();

defineEmits<{
  update: [partial: Partial<CampaignDelivery>];
}>();
</script>

<template>
  <details class="kb-accordion">
    <summary class="kb-accordion__summary">Advanced push behavior (optional)</summary>
    <div class="kb-accordion__body">
      <div class="kb-field">
        <label class="kb-label">
          Collapse key
          <span class="kb-helper">Use the same key to replace older notifications from this campaign.</span>
        </label>
        <input
          type="text"
          class="kb-input"
          placeholder="e.g. order_updates"
          :value="delivery.collapse_key"
          @input="(e) => $emit('update', { collapse_key: (e.target as HTMLInputElement).value || undefined })"
        />
      </div>
      <div class="kb-field">
        <label class="kb-checkbox">
          <input
            type="checkbox"
            :checked="delivery.silent_push"
            @change="$emit('update', { silent_push: !delivery.silent_push })"
          />
          <span>Silent push (background only)</span>
        </label>
      </div>
    </div>
  </details>
</template>

<style scoped>
.kb-accordion {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1.25rem;
}
.kb-accordion__summary {
  padding: 0.75rem 1rem;
  font-weight: 500;
  cursor: pointer;
  list-style: none;
}
.kb-accordion__summary::-webkit-details-marker {
  display: none;
}
.kb-accordion__body {
  padding: 0 1rem 1rem;
  border-top: 1px solid #e2e8f0;
}
.kb-field {
  margin-bottom: 18px;
}
.kb-field:last-child {
  margin-bottom: 0;
}
.kb-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #475569;
  margin-bottom: 8px;
}
.kb-helper {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 6px;
}
.kb-input {
  width: stretch;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.kb-input:focus {
  outline: none;
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
}
.kb-input::placeholder {
  color: #94a3b8;
}
.kb-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  cursor: pointer;
}
</style>
