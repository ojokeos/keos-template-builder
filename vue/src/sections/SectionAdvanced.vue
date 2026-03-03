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
  --wa-surface: var(--kb-surface, #ffffff);
  --wa-border: var(--kb-border, #d6e0eb);
  --wa-text: var(--kb-text-strong, #0f172a);
  --wa-text-muted: var(--kb-text-muted, #56657a);
  border: 1px solid #e2e8f0;
  border-color: var(--wa-border);
  border-radius: 16px;
  margin-bottom: 1rem;
  background: #fff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
}
.kb-accordion__summary {
  padding: 0.9rem 1rem;
  font-size: 1.04rem;
  font-weight: 750;
  color: var(--wa-text);
  cursor: pointer;
  list-style: none;
}
.kb-accordion__summary::-webkit-details-marker {
  display: none;
}
.kb-accordion__body {
  padding: 0.25rem 1rem 1rem;
  border-top: 1px solid var(--wa-border);
}
.kb-field {
  margin-bottom: 0.88rem;
  border: 1px solid var(--wa-border);
  background: var(--wa-surface);
  border-radius: 12px;
  padding: 0.82rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 1px 0 rgba(15, 23, 42, 0.02);
  transition: border-color 0.16s ease, box-shadow 0.16s ease;
}
.kb-field:focus-within {
  border-color: #bad0ea;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 0 0 3px rgba(37, 99, 235, 0.08);
}
.kb-field:last-child {
  margin-bottom: 0;
}
.kb-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 720;
  color: var(--wa-text);
  margin-bottom: 0.46rem;
  letter-spacing: 0.02em;
}
.kb-helper {
  display: block;
  font-size: 0.75rem;
  color: var(--wa-text-muted);
  margin-top: 0.38rem;
  line-height: 1.35;
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
