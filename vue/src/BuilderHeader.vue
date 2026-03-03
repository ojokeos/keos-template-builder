<script setup lang="ts">
import { spacing, colors, radius } from '@keos/notification-builder-ui-tokens';

const WORKFLOW_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'ready_for_review', label: 'Ready for review' },
  { value: 'approved', label: 'Approved' },
  { value: 'archived', label: 'Archived' },
];

const props = withDefaults(
  defineProps<{
    campaignName: string;
    status: string;
    dirty: boolean;
    saving?: boolean;
    lastSavedAt?: Date | null;
    canUndo?: boolean;
    canRedo?: boolean;
    /** When set, show workflow status dropdown (Draft → Ready for review → Approved → Archived) */
    workflowStatus?: string;
    /**
     * When true, normalize the name by replacing consecutive whitespace
     * characters with a single hyphen (e.g. "Spring Sale" → "Spring-Sale").
     */
    slugifyName?: boolean;
  }>(),
  { canUndo: false, canRedo: false, slugifyName: false }
);

const emit = defineEmits<{
  'update:campaignName': [value: string];
  'update:workflowStatus': [value: string];
  undo: [];
  redo: [];
}>();

const hasCampaignName = () => Boolean((props.campaignName || '').trim());

function normalizeName(value: string) {
  if (!props.slugifyName) return value;
  return value.trim().replace(/\s+/g, '-');
}

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function statusPillStyle(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    draft: { bg: '#f1f5f9', color: '#475569' },
    ready_for_review: { bg: '#dbeafe', color: '#1e40af' },
    approved: { bg: '#dcfce7', color: '#166534' },
    archived: { bg: '#f1f5f9', color: '#64748b' },
  };
  return map[status] ?? map.draft;
}
</script>

<template>
  <header
    class="kb-header"
    :style="{
      padding: `${spacing[16]}px 0`,
      borderBottom: `1px solid ${colors.neutral.border}`,
      marginBottom: `${spacing[16]}px`,
    }"
  >
    <div class="kb-header__row">
      <div class="kb-header__name-section" :class="{ 'kb-header__name-section--filled': hasCampaignName() }">
        <label class="kb-header__name-label">Template Name</label>
        <input
          type="text"
          class="kb-header__name"
          :value="campaignName"
          placeholder="Name this template (e.g. Spring Sale Push)"
          :style="{ fontSize: '1rem', fontWeight: 600 }"
          @input="emit('update:campaignName', normalizeName(($event.target as HTMLInputElement).value))"
          aria-label="Campaign name"
        />
        <span class="kb-header__name-helper">
          This name is used as your template/campaign label.
        </span>
      </div>
      <div class="kb-header__actions">
        <button
          type="button"
          class="kb-header__btn"
          title="Undo (⌘Z)"
          aria-label="Undo"
          :disabled="!canUndo"
          @click="emit('undo')"
        >
          Undo
        </button>
        <button
          type="button"
          class="kb-header__btn"
          title="Redo (⇧⌘Z)"
          aria-label="Redo"
          :disabled="!canRedo"
          @click="emit('redo')"
        >
          Redo
        </button>
      </div>
      <template v-if="workflowStatus !== undefined">
        <select
          :value="workflowStatus"
          class="kb-header__status-select"
          :style="{
            padding: `${spacing[4]}px ${spacing[8]}px`,
            borderRadius: `${radius.input}px`,
            fontSize: '0.8125rem',
            border: '1px solid transparent',
            cursor: 'pointer',
            fontWeight: 500,
            ...statusPillStyle(workflowStatus),
          }"
          aria-label="Workflow status"
          @change="emit('update:workflowStatus', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in WORKFLOW_STATUS_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </template>
      <span
        v-else
        class="kb-header__status"
        :style="{
          padding: `${spacing[4]}px ${spacing[8]}px`,
          borderRadius: `${radius.input}px`,
          background: colors.neutral.bg,
          fontSize: '0.8125rem',
          color: colors.neutral.textMuted,
        }"
      >
        {{ status }}
      </span>
    </div>
    <div class="kb-header__indicator" :style="{ fontSize: '0.8125rem', color: colors.neutral.textMuted, marginTop: `${spacing[4]}px` }">
      <template v-if="saving">Saving…</template>
      <template v-else-if="dirty">Unsaved changes</template>
      <template v-else-if="lastSavedAt">Last saved at {{ formatTime(lastSavedAt) }}</template>
    </div>
  </header>
</template>

<style scoped>
.kb-header__row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  border: 1px solid #d8e3ee;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 0.65rem 0.72rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 8px 18px rgba(15, 23, 42, 0.05);
}
.kb-header__name-section {
  flex: 1;
  min-width: 220px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  padding: 0.1rem 0.15rem;
  transition: box-shadow 0.16s ease, background 0.16s ease;
}
.kb-header__name-section:focus-within {
  border-color: transparent;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    0 0 0 3px rgba(37, 99, 235, 0.12);
  background: #ffffff;
}
.kb-header__name-section--filled {
  background: #ffffff;
}
.kb-header__name-label {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  margin-bottom: 0.28rem;
}
.kb-header__name {
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  outline: none;
  margin: 0;
}
.kb-header__name::placeholder {
  color: #94a3b8;
}
.kb-header__name-helper {
  display: block;
  margin-top: 0.28rem;
  font-size: 0.72rem;
  color: #7a889b;
  line-height: 1.25;
}
.kb-header__actions {
  display: flex;
  gap: 6px;
  margin-left: auto;
}
.kb-header__btn {
  padding: 4px 10px;
  font-size: 0.8125rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  color: #475569;
  cursor: pointer;
}
.kb-header__btn:hover:not(:disabled) {
  background: #f8fafc;
  color: #0f172a;
}
.kb-header__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.kb-header__status-select {
  appearance: auto;
  border: 1px solid #d4deea !important;
}
.kb-header__status-select:focus {
  outline: none;
}
@media (max-width: 760px) {
  .kb-header__row {
    align-items: flex-start;
  }
  .kb-header__actions {
    margin-left: 0;
  }
}
</style>
