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
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
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
