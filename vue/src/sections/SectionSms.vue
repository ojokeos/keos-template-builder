<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CampaignMessage } from '@keos/notification-builder-core';

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    variableOptions?: string[];
    showReset?: boolean;
  }>(),
  { showReset: false }
);

const emit = defineEmits<{
  update: [partial: Partial<CampaignMessage> & Record<string, any>];
  reset: [];
}>();

const defaultVariables = ['first_name', 'last_name', 'order_id', 'city'];

const localVariables = ref<string[]>(props.variableOptions && props.variableOptions.length ? [...props.variableOptions] : defaultVariables);
const selectedVariable = ref<string>(localVariables.value[0] ?? defaultVariables[0]);
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

const bodyText = computed(() => ((props.message as any).sms_body ?? '') as string);
const charCount = computed(() => bodyText.value.length);
const segmentCount = computed(() => {
  if (!charCount.value) return 0;
  return charCount.value <= 160 ? 1 : Math.ceil(charCount.value / 153);
});

const truncationHint = computed(() => {
  const n = charCount.value;
  if (n <= 160) return null;
  if (n <= 306) return 'Consider shortening to stay within 2 segments.';
  return 'Shorten this message to reduce segment count and cost.';
});

function updateSenderId(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('update', {
    sms_sender_id: value || undefined,
  } as any);
}

function updateBody(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value;
  emit('update', {
    sms_body: value,
  } as any);
}

function insertVariable() {
  const variable = selectedVariable.value;
  if (!variable) return;
  const token = ` {{ ${variable} }}`;
  const currentBody = bodyText.value || '';
  const existingVars = ((props.message as any).variables_used ?? []) as string[];
  const nextVars = Array.from(new Set([...existingVars, variable]));
  emit('update', {
    sms_body: currentBody + token,
    variables_used: nextVars,
  } as any);
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
  <section class="kb-section">
    <div class="kb-section__head">
      <h3 class="kb-section__title">SMS content</h3>
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
      Configure sender ID and message body. We’ll estimate characters and segments as you type.
    </p>

    <div class="kb-field">
      <label class="kb-label">
        Sender ID
        <span class="kb-helper">
          Alphanumeric (up to 11 characters) or phone number depending on country rules.
        </span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. KEOS, +12025550123"
        :value="(props.message as any).sms_sender_id ?? ''"
        @input="updateSenderId"
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Message body
        <span class="kb-counter" :class="{ 'kb-counter--warn': segmentCount > 3 }">
          {{ charCount }} chars ·
          <span v-if="segmentCount === 0">0 segments</span>
          <span v-else-if="segmentCount === 1">1 segment</span>
          <span v-else>{{ segmentCount }} segments</span>
        </span>
      </label>
      <textarea
        class="kb-textarea"
        rows="4"
        placeholder="Hi {{ first_name }}, your order {{ order_id }} is out for delivery."
        :value="bodyText"
        @input="updateBody"
      />
      <p class="kb-hint">
        Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153
        characters per segment).
      </p>
      <p v-if="truncationHint" class="kb-truncation-hint">
        {{ truncationHint }}
      </p>
    </div>

    <div class="kb-field">
      <label class="kb-label">Personalization variables</label>
      <div class="kb-insert-row">
        <select v-model="selectedVariable" class="kb-select">
          <option v-for="v in localVariables" :key="v" :value="v">
            {{ v }}
          </option>
        </select>
        <button type="button" class="kb-btn-insert" @click="insertVariable">
          Insert into message
        </button>
      </div>
      <p class="kb-hint">
        Variables render as &#123;&#123; variable_name &#125;&#125; at send time (e.g. first_name, city).
      </p>
    </div>

    <div class="kb-field">
      <label class="kb-label">Add custom variable</label>
      <div class="kb-insert-row">
        <input
          v-model="newVariable"
          type="text"
          class="kb-input"
          placeholder="e.g. appointment_time"
        />
        <button type="button" class="kb-btn-insert" @click="addVariable">
          Add
        </button>
      </div>
    </div>
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
.kb-counter {
  font-weight: 400;
  color: #64748b;
  margin-left: 0.25rem;
}
.kb-counter--warn {
  color: #dc2626;
}
.kb-input,
.kb-textarea,
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
.kb-textarea:focus,
.kb-select:focus {
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
.kb-truncation-hint {
  margin-top: 6px;
  font-size: 0.75rem;
  color: #b45309;
}
.kb-hint {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 4px 0 0 0;
}
.kb-insert-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.kb-btn-insert {
  padding: 0.4rem 0.75rem;
  font-size: 0.8125rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #0f172a;
  cursor: pointer;
}
.kb-btn-insert:hover {
  background: #e5edff;
  border-color: #bfdbfe;
}
</style>

