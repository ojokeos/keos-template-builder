<script setup lang="ts">
import type { CampaignDelivery } from '@keos/notification-builder-core';
import { PRIORITIES, TTL_PRESETS } from '@keos/notification-builder-core';

withDefaults(
  defineProps<{
    delivery: CampaignDelivery;
    /** When false, only show send time and schedule (for SMS, Email, WhatsApp). When true, show TTL, priority, quiet hours (push). */
    showPushOptions?: boolean;
    showReset?: boolean;
  }>(),
  { showPushOptions: true, showReset: false }
);

defineEmits<{
  update: [partial: Partial<CampaignDelivery>];
  reset: [];
}>();

const ttlLabels: Record<number, string> = {
  3600: '1 hour',
  7200: '2 hours',
  86400: '24 hours',
  172800: '48 hours',
};
</script>

<template>
  <section class="kb-section">
    <div class="kb-section__head">
      <h3 class="kb-section__title">Schedule</h3>
      <button
        v-if="showReset"
        type="button"
        class="kb-section__reset"
        @click="$emit('reset')"
      >
        Reset section
      </button>
    </div>
    <p class="kb-section__desc">
      {{ showPushOptions ? 'Choose when this campaign should go out and how it should be delivered.' : 'Send now or schedule for later.' }}
    </p>

    <div class="kb-field">
      <label class="kb-label">Send time</label>
      <div class="kb-radio-group">
        <label class="kb-radio">
          <input
            type="radio"
            name="send-mode"
            :checked="!delivery.scheduled_at"
            @change="$emit('update', { scheduled_at: undefined })"
          />
          <span>Send immediately</span>
        </label>
        <label class="kb-radio">
          <input
            type="radio"
            name="send-mode"
            :checked="!!delivery.scheduled_at"
            @change="$emit('update', { scheduled_at: new Date().toISOString().slice(0, 16) })"
          />
          <span>Schedule for later</span>
        </label>
      </div>
    </div>

    <div v-if="delivery.scheduled_at" class="kb-field kb-row">
      <input
        type="datetime-local"
        class="kb-input"
        :value="delivery.scheduled_at?.slice(0, 16)"
        @input="(e) => $emit('update', { scheduled_at: (e.target as HTMLInputElement).value })"
      />
      <input
        type="text"
        class="kb-input"
        placeholder="Timezone e.g. UTC"
        :value="delivery.timezone"
        @input="(e) => $emit('update', { timezone: (e.target as HTMLInputElement).value })"
      />
    </div>

    <template v-if="showPushOptions">
      <div class="kb-field">
        <label class="kb-label">
          Expiration (TTL)
          <span class="kb-helper">How long the push is eligible to deliver before it expires.</span>
        </label>
        <select
          class="kb-select"
          :value="delivery.ttl"
          @change="(e) => $emit('update', { ttl: Number((e.target as HTMLSelectElement).value) })"
        >
          <option v-for="s in TTL_PRESETS" :key="s" :value="s">{{ ttlLabels[s] ?? s + 's' }}</option>
        </select>
      </div>

      <div class="kb-field">
        <label class="kb-label">
          Priority
          <span class="kb-helper">High can wake devices; low is best-effort only.</span>
        </label>
        <select
          class="kb-select"
          :value="delivery.priority"
          @change="(e) => $emit('update', { priority: (e.target as HTMLSelectElement).value as CampaignDelivery['priority'] })"
        >
          <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>

      <div class="kb-field">
        <label class="kb-checkbox">
          <input
            type="checkbox"
            :checked="delivery.quiet_hours"
            @change="$emit('update', { quiet_hours: !delivery.quiet_hours })"
          />
          <span>Respect quiet hours</span>
        </label>
      </div>
    </template>
  </section>
</template>

<style scoped>
.kb-section {
  margin-bottom: 1.25rem;
}
.kb-section__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 0.25rem;
}
.kb-section__title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}
.kb-section__reset {
  font-size: 0.75rem;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.kb-section__reset:hover {
  color: #0f172a;
  background: #f1f5f9;
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
.kb-radio-group {
  display: flex;
  gap: 1rem;
}
.kb-radio,
.kb-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  cursor: pointer;
}
.kb-input,
.kb-select {
  width: stretch;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.kb-input:focus,
.kb-select:focus {
  outline: none;
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
}
.kb-input::placeholder {
  color: #94a3b8;
}
.kb-select {
  min-width: 10rem;
}
.kb-row {
  display: flex;
  gap: 0.5rem;
}
.kb-row .kb-input {
  flex: 1;
}
</style>
