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
  margin-bottom: 1.25rem;
}
.kb-section__title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}
.kb-section__desc {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
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
