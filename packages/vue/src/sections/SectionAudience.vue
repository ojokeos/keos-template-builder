<script setup lang="ts">
import type { CampaignAudience } from '@keos/notification-builder-core';
import { AUDIENCE_TYPES, PLATFORMS } from '@keos/notification-builder-core';

defineProps<{
  audience: CampaignAudience;
  estimatedReach?: number;
  canUseTestMode?: boolean;
}>();

const emit = defineEmits<{
  update: [partial: Partial<CampaignAudience>];
}>();

function onTypeChange(type: CampaignAudience['type']) {
  emit('update', { type });
}

function onTopicChange(e: Event) {
  emit('update', { topic_name: (e.target as HTMLInputElement).value });
}
</script>

<template>
  <section class="kb-section">
    <h3 class="kb-section__title">Audience</h3>
    <p class="kb-section__desc">
      Define who should receive this campaign. Start broad, then narrow down if needed.
    </p>

    <div class="kb-field">
      <label class="kb-label">
        Audience type
        <span class="kb-helper">Choose between topics, saved segments, or an explicit user list.</span>
      </label>
      <div class="kb-radio-group">
        <label v-for="t in AUDIENCE_TYPES" :key="t" class="kb-radio">
          <input
            type="radio"
            :value="t"
            :checked="audience.type === t"
            @change="onTypeChange(t as CampaignAudience['type'])"
          />
          <span>{{ t }}</span>
        </label>
      </div>
    </div>

    <div v-if="audience.type === 'topic'" class="kb-field">
      <label class="kb-label">
        Topic name
        <span class="kb-helper">Logical channel like promo_users, sports_updates, or product_news.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. promo_users, sports_updates"
        :value="audience.topic_name"
        @input="onTopicChange"
      />
    </div>

    <div v-if="audience.type === 'segment'" class="kb-field">
      <label class="kb-label">
        Segment query (JSON)
        <span class="kb-helper">Expert mode. Use your own segmentation DSL or JSON rules.</span>
      </label>
      <textarea
        class="kb-input kb-textarea"
        rows="3"
        placeholder='{"property": "country", "op": "eq", "value": "US"}'
        :value="audience.segment_query_json"
        @input="(e) => $emit('update', { segment_query_json: (e.target as HTMLTextAreaElement).value })"
      />
    </div>

    <div v-if="audience.type === 'user_list'" class="kb-field">
      <label class="kb-label">
        User IDs or tokens (one per line)
        <span class="kb-helper">Paste a short list of internal IDs or push tokens for targeted sends.</span>
      </label>
      <textarea
        class="kb-input kb-textarea"
        rows="3"
        placeholder="user_123&#10;user_456"
        :value="audience.user_list?.join('\n')"
        @input="(e) => $emit('update', { user_list: (e.target as HTMLTextAreaElement).value.split('\n').map(s => s.trim()).filter(Boolean) })"
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Platforms
        <span class="kb-helper">Only selected platforms will receive this campaign.</span>
      </label>
      <div class="kb-checkbox-group">
        <label v-for="p in PLATFORMS" :key="p" class="kb-checkbox">
          <input
            type="checkbox"
            :checked="audience.platforms.includes(p)"
            @change="
              $emit('update', {
                platforms: audience.platforms.includes(p)
                  ? audience.platforms.filter((x) => x !== p)
                  : [...audience.platforms, p],
              })
            "
          />
          <span>{{ p }}</span>
        </label>
      </div>
    </div>

    <div v-if="canUseTestMode" class="kb-field">
      <label class="kb-checkbox">
        <input
          type="checkbox"
          :checked="audience.test_mode"
          @change="$emit('update', { test_mode: !audience.test_mode })"
        />
        <span>Send to test device / test group only</span>
      </label>
    </div>

    <div v-if="estimatedReach !== undefined" class="kb-reach">
      Estimated reach: {{ estimatedReach.toLocaleString() }}
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
.kb-input,
.kb-textarea {
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
.kb-textarea:focus {
  outline: none;
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
}
.kb-input::placeholder,
.kb-textarea::placeholder {
  color: #94a3b8;
}
.kb-textarea {
  resize: vertical;
  min-height: 64px;
}
.kb-radio-group,
.kb-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.kb-radio,
.kb-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  cursor: pointer;
}
.kb-reach {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}
</style>
