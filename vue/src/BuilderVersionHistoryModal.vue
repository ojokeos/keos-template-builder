<script setup lang="ts">
import type { Campaign } from '@keos/notification-builder-core';

export interface VersionEntry {
  id: string;
  label?: string;
  timestamp: string;
  snapshot: Campaign;
}

defineProps<{
  open: boolean;
  versions: VersionEntry[];
}>();

const emit = defineEmits<{
  close: [];
  restore: [snapshot: Campaign];
}>();

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return iso;
  }
}
</script>

<template>
  <div
    v-if="open"
    class="kb-version-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="version-history-title"
    tabindex="-1"
    @keydown.escape="emit('close')"
  >
    <div class="kb-version-dialog">
      <h2 id="version-history-title" class="kb-version-title">
        Version history
      </h2>
      <p class="kb-version-desc">
        Restore a previous version. Current unsaved changes will be replaced.
      </p>

      <div v-if="versions.length === 0" class="kb-version-empty">
        No versions saved yet. Use "Save as version" to create one.
      </div>

      <ul v-else class="kb-version-list">
        <li
          v-for="v in versions"
          :key="v.id"
          class="kb-version-item"
        >
          <span class="kb-version-item-label">
            {{ v.label || formatDate(v.timestamp) }}
          </span>
          <button
            type="button"
            class="kb-version-restore"
            @click="emit('restore', v.snapshot); emit('close')"
          >
            Restore
          </button>
        </li>
      </ul>

      <div class="kb-version-actions">
        <button type="button" class="kb-version-btn kb-version-btn--primary" @click="emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-version-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.kb-version-dialog {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  max-width: 480px;
  width: 100%;
  max-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.4);
}

.kb-version-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
}

.kb-version-desc {
  margin: 0 0 16px 0;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.45;
}

.kb-version-empty {
  padding: 24px 16px;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 16px;
}

.kb-version-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.kb-version-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  background: #fff;
  transition: background 0.15s;
}

.kb-version-item:last-child {
  border-bottom: none;
}

.kb-version-item:hover {
  background: #f8fafc;
}

.kb-version-item-label {
  font-size: 0.875rem;
  color: #334155;
  flex: 1;
  min-width: 0;
}

.kb-version-restore {
  flex-shrink: 0;
  padding: 6px 14px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #0f172a;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.kb-version-restore:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.kb-version-restore:active {
  transform: scale(0.98);
}

.kb-version-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid #f1f5f9;
}

.kb-version-btn {
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.kb-version-btn:active {
  transform: scale(0.98);
}

.kb-version-btn--primary {
  background: #0f172a;
  color: #fff;
}

.kb-version-btn--primary:hover {
  background: #1e293b;
}
</style>
