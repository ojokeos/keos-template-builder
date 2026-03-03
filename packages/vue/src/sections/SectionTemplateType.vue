<script setup lang="ts">
defineProps<{
  templateType: 'transactional' | 'marketing';
}>();

const emit = defineEmits<{
  update: [value: 'transactional' | 'marketing'];
}>();
</script>

<template>
  <section class="kb-section kb-section--template-type">
    <h3 class="kb-section__title">Template type</h3>
    <p class="kb-section__desc">
      Choose how this template will be used. Your system uses this to route and apply policies.
    </p>
    <div class="kb-field">
      <div class="kb-radio-group">
        <label class="kb-radio">
          <input
            type="radio"
            name="template-type"
            value="transactional"
            :checked="templateType === 'transactional'"
            @change="emit('update', 'transactional')"
          />
          <span>Transactional</span>
        </label>
        <label class="kb-radio">
          <input
            type="radio"
            name="template-type"
            value="marketing"
            :checked="templateType === 'marketing'"
            @change="emit('update', 'marketing')"
          />
          <span>Marketing</span>
        </label>
      </div>
      <p class="kb-hint">
        Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions.
      </p>
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
.kb-radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.kb-radio {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: #475569;
}
.kb-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 6px 0 0 0;
  display: block;
}
</style>
