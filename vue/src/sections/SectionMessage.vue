<script setup lang="ts">
import type { CampaignMessage } from '@keos/notification-builder-core';
import type { Platform } from '@keos/notification-builder-core';

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    titleCount: number;
    bodyCount: number;
    titleLimit: number;
    bodyLimit: number;
    selectedPlatform: Platform;
    showReset?: boolean;
    /** Inline validation messages (optional) */
    titleError?: string;
    bodyError?: string;
    imageUrlError?: string;
    deepLinkError?: string;
  }>(),
  { showReset: false }
);

defineEmits<{
  update: [partial: any];
  reset: [];
}>();
</script>

<template>
  <section class="kb-section">
    <div class="kb-section__head">
      <h3 class="kb-section__title">Message</h3>
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
      Message body is required. Title is optional. Character limits depend on the selected platform ({{ selectedPlatform }}).
    </p>

    <div class="kb-field">
      <label class="kb-label">
        Title
        <span class="kb-counter" :class="{ 'kb-counter--warn': titleCount > titleLimit }">
          {{ titleCount }}/{{ titleLimit }}
        </span>
      </label>
      <div class="kb-field-with-rail">
        <input
          type="text"
          class="kb-input"
          placeholder="Notification title"
          :value="message.title"
          :aria-invalid="!!titleError"
          :aria-describedby="titleError ? 'title-error' : undefined"
          @input="(e) => $emit('update', { title: (e.target as HTMLInputElement).value })"
        />
        <div class="kb-char-rail" role="presentation" :style="{ '--pct': Math.min(100, (titleCount / titleLimit) * 100) + '%' }">
          <div class="kb-char-rail__fill" />
        </div>
      </div>
      <p v-if="titleError" id="title-error" class="kb-inline-error" role="alert">{{ titleError }}</p>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Message
        <span class="kb-counter" :class="{ 'kb-counter--warn': bodyCount > bodyLimit }">
          {{ bodyCount }}/{{ bodyLimit }}
        </span>
      </label>
      <div class="kb-field-with-rail">
        <textarea
          class="kb-textarea"
          rows="3"
          placeholder="Notification body"
          :value="message.body"
          :aria-invalid="!!bodyError"
          :aria-describedby="bodyError ? 'body-error' : undefined"
          @input="(e) => $emit('update', { body: (e.target as HTMLTextAreaElement).value })"
        />
        <div class="kb-char-rail" role="presentation" :style="{ '--pct': Math.min(100, (bodyCount / bodyLimit) * 100) + '%' }">
          <div class="kb-char-rail__fill" />
        </div>
      </div>
      <p v-if="bodyError" id="body-error" class="kb-inline-error" role="alert">{{ bodyError }}</p>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Media (image URL)
        <span class="kb-helper">Optional. Large hero images work best on web and Android.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https://..."
        :value="message.image_url"
        :aria-invalid="!!imageUrlError"
        :aria-describedby="imageUrlError ? 'image-url-error' : undefined"
        @input="(e) => $emit('update', { image_url: (e.target as HTMLInputElement).value || undefined })"
      />
      <p v-if="imageUrlError" id="image-url-error" class="kb-inline-error" role="alert">{{ imageUrlError }}</p>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Deep link / Action URL
        <span class="kb-helper">Where users land after tapping the notification.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https:// or app://..."
        :value="message.deep_link"
        :aria-invalid="!!deepLinkError"
        :aria-describedby="deepLinkError ? 'deeplink-error' : undefined"
        @input="(e) => $emit('update', { deep_link: (e.target as HTMLInputElement).value || undefined })"
      />
      <p v-if="deepLinkError" id="deeplink-error" class="kb-inline-error" role="alert">{{ deepLinkError }}</p>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Location (optional)
        <span class="kb-helper">Coordinates and label for rich notifications or open-in-maps.</span>
      </label>
      <div class="kb-location-row">
        <input
          type="number"
          step="0.000001"
          class="kb-input"
          placeholder="Latitude"
          :value="(message as any).location?.lat ?? ''"
          @input="
            (e) => {
              const loc = { ...((message as any).location ?? {}) };
              const v = (e.target as HTMLInputElement).value;
              loc.lat = v === '' ? undefined : Number(v);
              $emit('update', { location: loc });
            }
          "
        />
        <input
          type="number"
          step="0.000001"
          class="kb-input"
          placeholder="Longitude"
          :value="(message as any).location?.lon ?? ''"
          @input="
            (e) => {
              const loc = { ...((message as any).location ?? {}) };
              const v = (e.target as HTMLInputElement).value;
              loc.lon = v === '' ? undefined : Number(v);
              $emit('update', { location: loc });
            }
          "
        />
      </div>
      <input
        type="text"
        class="kb-input"
        placeholder="Location name (e.g. Store name)"
        :value="(message as any).location?.name ?? ''"
        @input="
          (e) => {
            const loc = { ...((message as any).location ?? {}) };
            loc.name = (e.target as HTMLInputElement).value || undefined;
            $emit('update', { location: loc });
          }
        "
      />
      <input
        type="text"
        class="kb-input"
        placeholder="Address (optional)"
        :value="(message as any).location?.address ?? ''"
        @input="
          (e) => {
            const loc = { ...((message as any).location ?? {}) };
            loc.address = (e.target as HTMLInputElement).value || undefined;
            $emit('update', { location: loc });
          }
        "
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Actions (optional)
        <span class="kb-helper">
          Add buttons shown on the notification (where supported). Most platforms support up to 2 actions.
        </span>
      </label>
      <div class="kb-actions-list">
        <div
          v-for="(action, index) in ((props.message as any).actions ?? [])"
          :key="action.id || index"
          class="kb-action-row"
        >
          <input
            type="text"
            class="kb-input kb-input--action-label"
            placeholder="Button label (e.g. View, Dismiss)"
            :value="action.label"
            @input="
              (e) => {
                const next = [...((props.message as any).actions ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `action_${i + 1}`,
                  label: (e.target as HTMLInputElement).value,
                };
                $emit('update', { actions: next });
              }
            "
          />
          <input
            type="url"
            class="kb-input kb-input--action-url"
            placeholder='Optional deep link (https:// or app://)'
            :value="action.url"
            @input="
              (e) => {
                const next = [...((props.message as any).actions ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `action_${i + 1}`,
                  url: (e.target as HTMLInputElement).value || undefined,
                };
                $emit('update', { actions: next });
              }
            "
          />
          <button
            type="button"
            class="kb-btn-remove-action"
            @click="
              () => {
                const next = [...((props.message as any).actions ?? [])];
                next.splice(Number(index), 1);
                $emit('update', { actions: next });
              }
            "
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="kb-btn-add-action"
          :disabled="((props.message as any).actions ?? []).length >= 3"
          @click="
            () => {
              const next = [...((props.message as any).actions ?? [])];
              next.push({
                id: `action_${next.length + 1}`,
                label: '',
                url: '',
              });
              $emit('update', { actions: next });
            }
          "
        >
          Add action
        </button>
        <div class="kb-action-chips">
          <span class="kb-action-chips-label">Suggestions:</span>
          <button
            v-for="suggestion in ['View order', 'Track shipment', 'Open app']"
            :key="suggestion"
            type="button"
            class="kb-action-chip"
            :disabled="((props.message as any).actions ?? []).length >= 3"
            @click="
              () => {
                const next = [...((props.message as any).actions ?? [])];
                next.push({
                  id: `action_${Date.now()}`,
                  label: suggestion,
                  url: '',
                });
                $emit('update', { actions: next });
              }
            "
          >
            {{ suggestion }}
          </button>
        </div>
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
.kb-inline-error {
  margin: 4px 0 0;
  font-size: 0.75rem;
  color: #dc2626;
}
.kb-field-with-rail {
  position: relative;
}
.kb-char-rail {
  height: 3px;
  margin-top: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}
.kb-char-rail__fill {
  height: 100%;
  width: var(--pct, 0%);
  max-width: 100%;
  background: linear-gradient(90deg, #22c55e 0%, #eab308 80%, #dc2626 100%);
  border-radius: 2px;
  transition: width 0.15s ease;
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
.kb-location-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.kb-actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kb-action-row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.4fr) auto;
  gap: 0.5rem;
  align-items: center;
}
.kb-btn-add-action,
.kb-btn-remove-action {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
}
.kb-btn-add-action {
  align-self: flex-start;
}
.kb-btn-add-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.kb-btn-add-action:hover:not(:disabled),
.kb-btn-remove-action:hover {
  background: #f1f5f9;
}
.kb-action-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}
.kb-action-chips-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-right: 4px;
}
.kb-action-chip {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
}
.kb-action-chip:hover:not(:disabled) {
  background: #f1f5f9;
  color: #0f172a;
}
.kb-action-chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
