<script setup lang="ts">
import type { CampaignTracking } from '@keos/notification-builder-core';

defineProps<{
  tracking: CampaignTracking;
}>();

defineEmits<{
  update: [partial: Partial<CampaignTracking>];
}>();
</script>

<template>
  <section class="kb-section">
    <h3 class="kb-section__title">Tracking & analytics</h3>
    <p class="kb-section__desc">
      Help your analytics and reporting tools understand this campaign.
    </p>

    <div class="kb-field">
      <label class="kb-label">
        Campaign name
        <span class="kb-helper">Shown in reports and dashboards. Use something marketers will recognize.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. Spring Sale Promo"
        :value="tracking.campaign_name"
        @input="(e) => $emit('update', { campaign_name: (e.target as HTMLInputElement).value })"
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Tags
        <span class="kb-helper">Comma-separated labels used for filtering and grouping (e.g. sale, lifecycle).</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="sale, promo, march"
        :value="tracking.tags?.join(', ')"
        @input="(e) => $emit('update', { tags: (e.target as HTMLInputElement).value.split(',').map((s) => s.trim()).filter(Boolean) })"
      />
    </div>

    <div class="kb-field">
      <label class="kb-checkbox">
        <input
          type="checkbox"
          :checked="tracking.ab_test"
          @change="$emit('update', { ab_test: !tracking.ab_test })"
        />
        <span>Mark as part of an A/B test</span>
      </label>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Conversion event
        <span class="kb-helper">Name of the event that represents success for this campaign (e.g. purchase_completed).</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. purchase_completed"
        :value="tracking.conversion_event"
        @input="(e) => $emit('update', { conversion_event: (e.target as HTMLInputElement).value || undefined })"
      />
    </div>
  </section>
</template>

<style scoped>
.kb-section {
  --wa-surface: var(--kb-surface, #ffffff);
  --wa-border: var(--kb-border, #d6e0eb);
  --wa-text: var(--kb-text-strong, #0f172a);
  --wa-text-muted: var(--kb-text-muted, #56657a);
  margin-bottom: 1rem;
  border: 1px solid var(--wa-border);
  border-radius: 16px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
}
.kb-section__title {
  font-size: 1.04rem;
  font-weight: 750;
  margin: 0;
  color: var(--wa-text);
  letter-spacing: 0.01em;
}
.kb-section__desc {
  font-size: 0.875rem;
  color: var(--wa-text-muted);
  margin: 0;
  line-height: 1.45;
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
