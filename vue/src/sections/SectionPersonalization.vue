<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CampaignMessage } from '@keos/notification-builder-core';

const props = defineProps<{
  message: CampaignMessage;
  variableOptions?: string[];
  targets?: Array<'title' | 'body' | 'footer'>;
}>();

const emit = defineEmits<{
  update: [partial: Partial<CampaignMessage>];
  insertVariable: [payload: { variable: string; field: 'title' | 'body' | 'footer' }];
}>();

const defaultVariables = ['first_name', 'last_name', 'order_id', 'city'];

const localVariables = ref<string[]>(props.variableOptions ?? defaultVariables);
const selectedVariable = ref(localVariables.value[0] ?? defaultVariables[0]);
const newVariable = ref('');

watch(
  () => props.variableOptions,
  (next) => {
    if (next && next.length) {
      localVariables.value = [...next];
      if (!localVariables.value.includes(selectedVariable.value)) {
        selectedVariable.value = localVariables.value[0];
      }
    }
  }
);

const allVariables = computed(() => localVariables.value);
const insertTargets = computed<Array<'title' | 'body' | 'footer'>>(() => {
  const targets = props.targets?.length ? props.targets : ['title', 'body'];
  return targets as Array<'title' | 'body' | 'footer'>;
});

function insertInto(field: 'title' | 'body' | 'footer') {
  emit('insertVariable', { variable: selectedVariable.value, field });
}

function addVariable() {
  const name = newVariable.value.trim();
  if (!name) return;
  if (!localVariables.value.includes(name)) {
    localVariables.value = [...localVariables.value, name];
  }
  selectedVariable.value = name;
  newVariable.value = '';
}
</script>

<template>
  <section class="kb-section kb-section--inline-personalization">
    <h3 class="kb-section__title">Insert variables</h3>
    <p class="kb-section__desc">Add &#123;&#123; .variable_name &#125;&#125; into the title or message above where you need it.</p>

    <div class="kb-field">
      <label class="kb-label">Variable</label>
      <div class="kb-insert-row">
        <select v-model="selectedVariable" class="kb-select">
          <option v-for="v in allVariables" :key="v" :value="v">{{ v }}</option>
        </select>
        <button v-if="insertTargets.includes('title')" type="button" class="kb-btn-insert" @click="insertInto('title')">
          Into title
        </button>
        <button v-if="insertTargets.includes('body')" type="button" class="kb-btn-insert" @click="insertInto('body')">
          Into message
        </button>
        <button v-if="insertTargets.includes('footer')" type="button" class="kb-btn-insert" @click="insertInto('footer')">
          Into footer
        </button>
      </div>
    </div>

    <div class="kb-field">
      <label class="kb-label">Add custom variable</label>
      <div class="kb-insert-row">
        <input
          v-model="newVariable"
          type="text"
          class="kb-input"
          placeholder="e.g. account_id"
        />
        <button type="button" class="kb-btn-insert" @click="addVariable">
          Add
        </button>
      </div>
    </div>

    <div class="kb-field">
      <label class="kb-label">Available variables</label>
      <p class="kb-hint">
        Insert in title or message: &#123;&#123; .variable_name &#125;&#125;. Fallback can be set when sending.
      </p>
      <ul class="kb-variable-list">
        <li v-for="v in allVariables" :key="v">
          <code>&#123;&#123; .{{ v }} &#125;&#125;</code>
        </li>
      </ul>
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
.kb-section--inline-personalization {
  margin-top: 1rem;
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
.kb-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 6px 0 0 0;
  display: block;
}
.kb-variable-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.kb-variable-list code {
  font-size: 0.8125rem;
  padding: 0.2rem 0.5rem;
  background: #f1f5f9;
  border-radius: 4px;
}
.kb-insert-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
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
.kb-input {
  width: stretch;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  min-width: 8rem;
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
.kb-select {
  width: stretch;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  min-width: 8rem;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.kb-select:focus {
  outline: none;
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
}
.kb-btn-insert {
  padding: 0.35rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}
.kb-btn-insert:hover {
  background: #f1f5f9;
}
</style>
