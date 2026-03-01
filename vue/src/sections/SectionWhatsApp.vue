<script setup lang="ts">
import { computed } from 'vue';
import type { CampaignMessage } from '@keos/notification-builder-core';

const props = withDefaults(
  defineProps<{
    message: CampaignMessage;
    showReset?: boolean;
  }>(),
  { showReset: false }
);

const emit = defineEmits<{
  update: [partial: any];
  reset: [];
}>();

function extractPlaceholders(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const re = /\{\{\s*([^}]+?)\s*\}\}/g;
  const set = new Set<string>();
  let m;
  while ((m = re.exec(text)) !== null) set.add(m[1].trim());
  return Array.from(set);
}

const templateFields = computed(() => {
  const header = (props.message as any).header ?? '';
  const body = (props.message as any).body ?? props.message.body ?? '';
  const vars = new Set((props.message.variables ?? []) as string[]);
  const placeholders = [...extractPlaceholders(header), ...extractPlaceholders(body)];
  const uniq = Array.from(new Set(placeholders));
  return uniq.map((name) => ({ name, configured: vars.has(name) }));
});
</script>

<template>
  <section class="kb-section">
    <div class="kb-section__head">
      <h3 class="kb-section__title">WhatsApp message</h3>
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
      Configure how this campaign will look when sent as a WhatsApp template message.
    </p>

    <div class="kb-field">
      <label class="kb-label">
        Template type
        <span class="kb-helper">Match the content type approved in WhatsApp (text, media, coupon, offer, catalog, etc.).</span>
      </label>
      <select
        class="kb-select"
        :value="(props.message as any).template_type ?? 'text'"
        @change="
          (e) =>
            emit('update', {
              template_type: (e.target as HTMLSelectElement).value,
            })
        "
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="document">Document</option>
        <option value="location">Location</option>
        <option value="coupon">Coupon code</option>
        <option value="lto">Limited time offer</option>
        <option value="mpm">Multi product message</option>
        <option value="catalog">Catalog</option>
        <option value="auth">Authentication</option>
      </select>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Template name
        <span class="kb-helper">Match the approved template name in your WhatsApp Business provider.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. order_update_1"
        :value="(props.message as any).template_name ?? ''"
        @input="
          (e) =>
            emit('update', {
              template_name: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <!-- Media configuration -->
    <div
      v-if="['image', 'video', 'document'].includes(((props.message as any).template_type ?? 'text'))"
      class="kb-field"
    >
      <label class="kb-label">
        Media URL
        <span class="kb-helper">Public URL for the image, video, or document used in the template.</span>
      </label>
      <input
        type="url"
        class="kb-input"
        placeholder="https://..."
        :value="(props.message as any).media_url ?? ''"
        @input="
          (e) =>
            emit('update', {
              media_url: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>
    <div
      v-if="['image', 'video', 'document'].includes(((props.message as any).template_type ?? 'text'))"
      class="kb-field"
    >
      <label class="kb-label">
        Media caption (optional)
        <span class="kb-helper">Short line shown below the media.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. Your order is on the way"
        :value="(props.message as any).media_caption ?? ''"
        @input="
          (e) =>
            emit('update', {
              media_caption: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <!-- Location configuration -->
    <div
      v-if="(props.message as any).template_type === 'location'"
      class="kb-field kb-field--inline"
    >
      <label class="kb-label">
        Location
        <span class="kb-helper">Coordinates and label for the location card.</span>
      </label>
      <div class="kb-location-row">
        <input
          type="number"
          step="0.000001"
          class="kb-input"
          placeholder="Latitude"
          :value="(props.message as any).location?.lat ?? ''"
          @input="
            (e) => {
              const loc = { ...( (props.message as any).location ?? {} ) };
              loc.lat = Number((e.target as HTMLInputElement).value);
              emit('update', { location: loc });
            }
          "
        />
        <input
          type="number"
          step="0.000001"
          class="kb-input"
          placeholder="Longitude"
          :value="(props.message as any).location?.lon ?? ''"
          @input="
            (e) => {
              const loc = { ...( (props.message as any).location ?? {} ) };
              loc.lon = Number((e.target as HTMLInputElement).value);
              emit('update', { location: loc });
            }
          "
        />
      </div>
      <input
        type="text"
        class="kb-input"
        placeholder="Location name"
        :value="(props.message as any).location?.name ?? ''"
        @input="
          (e) => {
            const loc = { ...( (props.message as any).location ?? {} ) };
            loc.name = (e.target as HTMLInputElement).value || undefined;
            emit('update', { location: loc });
          }
        "
      />
      <input
        type="text"
        class="kb-input"
        placeholder="Address (optional)"
        :value="(props.message as any).location?.address ?? ''"
        @input="
          (e) => {
            const loc = { ...( (props.message as any).location ?? {} ) };
            loc.address = (e.target as HTMLInputElement).value || undefined;
            emit('update', { location: loc });
          }
        "
      />
    </div>

    <!-- Coupon configuration -->
    <div
      v-if="(props.message as any).template_type === 'coupon'"
      class="kb-field"
    >
      <label class="kb-label">
        Coupon code
        <span class="kb-helper">Single coupon code placeholder used in the template.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. SAVE20"
        :value="(props.message as any).coupon_code ?? ''"
        @input="
          (e) =>
            emit('update', {
              coupon_code: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <!-- LTO configuration -->
    <div
      v-if="(props.message as any).template_type === 'lto'"
      class="kb-field"
    >
      <label class="kb-label">
        Offer expiry
        <span class="kb-helper">When this limited-time offer ends (for your reference and preview).</span>
      </label>
      <input
        type="datetime-local"
        class="kb-input"
        :value="(props.message as any).lto_expiry ?? ''"
        @input="
          (e) =>
            emit('update', {
              lto_expiry: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <!-- MPM / Catalog configuration -->
    <div
      v-if="['mpm', 'catalog'].includes((props.message as any).template_type)"
      class="kb-field"
    >
      <label class="kb-label">
        Products
        <span class="kb-helper">
          Add product identifiers in the order they should appear in the WhatsApp template.
        </span>
      </label>
      <div class="kb-wa-buttons">
        <div
          v-for="(item, index) in ((props.message as any).products ?? [])"
          :key="item.id || index"
          class="kb-wa-button-row"
        >
          <input
            type="text"
            class="kb-input kb-input--btn-label"
            placeholder="Product ID"
            :value="item.productId"
            @input="
              (e) => {
                const next = [...(((props.message as any).products as any[]) ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `prod_${i + 1}`,
                  productId: (e.target as HTMLInputElement).value,
                };
                emit('update', { products: next });
              }
            "
          />
          <input
            type="text"
            class="kb-input kb-input--btn-target"
            placeholder="Section title (optional)"
            :value="item.sectionTitle"
            @input="
              (e) => {
                const next = [...(((props.message as any).products as any[]) ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `prod_${i + 1}`,
                  sectionTitle: (e.target as HTMLInputElement).value || undefined,
                };
                emit('update', { products: next });
              }
            "
          />
          <button
            type="button"
            class="kb-wa-btn-remove"
            @click="
              () => {
                const next = [...(((props.message as any).products as any[]) ?? [])];
                next.splice(Number(index), 1);
                emit('update', { products: next });
              }
            "
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="kb-wa-btn-add"
          @click="
            () => {
              const current = (((props.message as any).products as any[]) ?? []);
              const next = [...current];
              next.push({
                id: `prod_${next.length + 1}`,
                productId: '',
              });
              emit('update', { products: next });
            }
          "
        >
          Add product
        </button>
      </div>
    </div>

    <!-- Authentication configuration -->
    <div
      v-if="(props.message as any).template_type === 'auth'"
      class="kb-field"
    >
      <label class="kb-label">
        Authentication template
        <span class="kb-helper">Configure how OTP / login codes should appear in this template.</span>
      </label>
      <select
        class="kb-select"
        :value="(props.message as any).auth_type ?? 'otp'"
        @change="
          (e) =>
            emit('update', {
              auth_type: (e.target as HTMLSelectElement).value,
            })
        "
      >
        <option value="otp">One-time password (OTP)</option>
        <option value="login">Login approval</option>
      </select>
      <input
        type="text"
        class="kb-input"
        placeholder="Code label (e.g. Your code is {{1}})"
        :value="(props.message as any).auth_label ?? ''"
        @input="
          (e) =>
            emit('update', {
              auth_label: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Header (optional)
        <span class="kb-helper">Short text or variable used as the WhatsApp template header.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. Order update"
        :value="(props.message as any).header ?? ''"
        @input="
          (e) =>
            emit('update', {
              header: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Body
        <span class="kb-helper">
          Use the exact template body including variables like {{1}}, {{2}} as approved in WhatsApp.
        </span>
      </label>
      <textarea
        class="kb-textarea"
        rows="4"
        placeholder="Hi {{1}}, your order {{2}} has been shipped..."
        :value="(props.message as any).body ?? ''"
        @input="
          (e) =>
            emit('update', {
              body: (e.target as HTMLTextAreaElement).value || undefined,
            })
        "
      />
    </div>

    <div v-if="templateFields.length > 0" class="kb-field kb-wa-template-fields">
      <label class="kb-label">Template fields</label>
      <p class="kb-helper">Placeholders used in header/body and whether they are configured.</p>
      <ul class="kb-wa-fields-list">
        <li v-for="f in templateFields" :key="f.name" class="kb-wa-field-item" :class="{ 'kb-wa-field-item--ok': f.configured }">
          <span class="kb-wa-field-name">{{ f.name }}</span>
          <span class="kb-wa-field-status">{{ f.configured ? 'Configured' : 'Missing' }}</span>
        </li>
      </ul>
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Footer (optional)
        <span class="kb-helper">Small, muted line shown at the bottom of the message.</span>
      </label>
      <input
        type="text"
        class="kb-input"
        placeholder="e.g. Reply STOP to unsubscribe"
        :value="(props.message as any).footer ?? ''"
        @input="
          (e) =>
            emit('update', {
              footer: (e.target as HTMLInputElement).value || undefined,
            })
        "
      />
    </div>

    <div class="kb-field">
      <label class="kb-label">
        Buttons (optional)
        <span class="kb-helper">
          Add quick replies or call-to-action buttons. Order should match your provider configuration.
        </span>
      </label>
      <div class="kb-wa-buttons">
        <div
          v-for="(btn, index) in ((props.message as any).buttons ?? [])"
          :key="btn.id || index"
          class="kb-wa-button-row"
        >
          <input
            type="text"
            class="kb-input kb-input--btn-label"
            placeholder="Button label (e.g. View order)"
            :value="btn.label"
            @input="
              (e) => {
                const next = [...(((props.message as any).buttons as any[]) ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `btn_${i + 1}`,
                  label: (e.target as HTMLInputElement).value,
                };
                emit('update', { buttons: next });
              }
            "
          />
          <select
            class="kb-select kb-select--btn-type"
            :value="btn.type ?? 'quick_reply'"
            @change="
              (e) => {
                const next = [...(((props.message as any).buttons as any[]) ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `btn_${i + 1}`,
                  type: (e.target as HTMLSelectElement).value,
                };
                emit('update', { buttons: next });
              }
            "
          >
            <option value="quick_reply">Quick reply</option>
            <option value="url">Visit URL</option>
            <option value="call">Call phone</option>
          </select>
          <input
            v-if="btn.type === 'url'"
            type="url"
            class="kb-input kb-input--btn-target"
            placeholder="https://..."
            :value="btn.url"
            @input="
              (e) => {
                const next = [...(((props.message as any).buttons as any[]) ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `btn_${i + 1}`,
                  url: (e.target as HTMLInputElement).value || undefined,
                };
                emit('update', { buttons: next });
              }
            "
          />
          <input
            v-else-if="btn.type === 'call'"
            type="tel"
            class="kb-input kb-input--btn-target"
            placeholder="+1 555 123 4567"
            :value="btn.phone"
            @input="
              (e) => {
                const next = [...(((props.message as any).buttons as any[]) ?? [])];
                const i = Number(index);
                next[i] = {
                  ...next[i],
                  id: next[i]?.id || `btn_${i + 1}`,
                  phone: (e.target as HTMLInputElement).value || undefined,
                };
                emit('update', { buttons: next });
              }
            "
          />
          <button
            type="button"
            class="kb-wa-btn-remove"
            @click="
              () => {
                const next = [...(((props.message as any).buttons as any[]) ?? [])];
                next.splice(Number(index), 1);
                emit('update', { buttons: next });
              }
            "
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="kb-wa-btn-add"
          :disabled="(((props.message as any).buttons as any[]) ?? []).length >= 3"
          @click="
            () => {
              const current = (((props.message as any).buttons as any[]) ?? []);
              const next = [...current];
              next.push({
                id: `btn_${next.length + 1}`,
                label: '',
                type: 'quick_reply',
              });
              emit('update', { buttons: next });
            }
          "
        >
          Add button
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
.kb-wa-fields-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}
.kb-wa-field-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8125rem;
  margin-bottom: 4px;
  background: #fef2f2;
  color: #991b1b;
}
.kb-wa-field-item--ok {
  background: #f0fdf4;
  color: #166534;
}
.kb-wa-field-name {
  font-family: monospace;
}
.kb-wa-field-status {
  font-size: 0.75rem;
  font-weight: 500;
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
.kb-wa-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kb-wa-button-row {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.1fr) minmax(0, 1.2fr) auto;
  gap: 0.5rem;
  align-items: center;
}
.kb-wa-btn-add,
.kb-wa-btn-remove {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
}
.kb-wa-btn-add {
  align-self: flex-start;
}
.kb-wa-btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.kb-wa-btn-add:hover:not(:disabled),
.kb-wa-btn-remove:hover {
  background: #f1f5f9;
}
@media (max-width: 720px) {
  .kb-wa-button-row {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    grid-auto-rows: auto;
  }
}

.kb-field--inline .kb-location-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

