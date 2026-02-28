# Keos Notification Builder

Embeddable push notification campaign composer (template builder) for **Vue 3.5** and **React**. Build campaigns with audience targeting, message content, delivery controls, and live device preview. Outputs a backend-ready campaign payload with optional provider mapping (FCM, APNs, Web Push).

## Packages

| Package | Description |
|---------|-------------|
| `@keos/notification-builder-core` | Types, schema, validation, provider mapping, preview engine. Framework-agnostic. |
| `@keos/notification-builder-vue` | Vue 3.5 composer UI (Sections A–F + preview + actions). |
| `@keos/notification-builder-react` | React composer UI (same structure and API). |

## Embedding in Vue 3.5

1. Install:

```bash
npm install @keos/notification-builder-core @keos/notification-builder-vue
```

2. (Vue) Import the default styles in your entry (e.g. `main.ts`):  
   `import '@keos/notification-builder-vue/dist/style.css';`

3. Use the component:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { KeosNotificationBuilder } from '@keos/notification-builder-vue';
import type { Campaign } from '@keos/notification-builder-core';

const campaign = ref();

function onSave(c: Campaign) {
  // Persist or send to API
}

function onSend(c: Campaign) {
  // Trigger send via your backend
}
</script>

<template>
  <KeosNotificationBuilder
    v-model="campaign"
    @save="onSave"
    @send-test="(c) => console.log('Test', c)"
    @schedule="(c) => console.log('Schedule', c)"
    @send="onSend"
    @change="(c) => (campaign = c)"
  />
</template>
```

**Props**

- `modelValue` / `v-model`: Initial or current campaign (partial `Campaign`).
- `hooks`: Optional `BuilderExtensionHooks` (e.g. `customValidators`, `canSend`, `canSchedule`, `estimateReach`).
- `disabledSections`: Array of section ids to hide (`audience`, `message`, `personalization`, `delivery`, `advanced`, `tracking`).
- `variableOptions`: Optional list of variable names for personalization.

**Events**

- `update:modelValue` / `change`: Fired when campaign state changes (full `Campaign`).
- `save`: User clicked “Save template” (valid campaign).
- `send-test`: User clicked “Send test”.
- `schedule`: User clicked “Schedule” (valid campaign).
- `send`: User clicked “Send” (valid campaign).

## Embedding in React

1. Install:

```bash
npm install @keos/notification-builder-core @keos/notification-builder-react
```

2. Use the component:

```tsx
import { useState } from 'react';
import { KeosNotificationBuilder } from '@keos/notification-builder-react';
import type { Campaign } from '@keos/notification-builder-core';

function App() {
  const [campaign, setCampaign] = useState<Partial<Campaign>>();

  return (
    <KeosNotificationBuilder
      campaign={campaign}
      onChange={setCampaign}
      onSave={(c) => { /* persist */ }}
      onSendTest={(c) => console.log('Test', c)}
      onSchedule={(c) => { /* schedule */ }}
      onSend={(c) => { /* send */ }}
    />
  );
}
```

**Props**

- `campaign`: Initial or controlled campaign (partial `Campaign`).
- `onChange`: Called when campaign state changes.
- `hooks`, `disabledSections`, `variableOptions`: Same as Vue.
- `onSave`, `onSendTest`, `onSchedule`, `onSend`: Callbacks for action bar.

## Extension hooks

Pass `hooks` to customize behavior without forking:

- **`customValidators(campaign)`**: Return extra validation errors (async).
- **`canSend()`** / **`canSchedule()`** / **`canEditTemplate()`**: Permission checks; builder disables actions when false.
- **`estimateReach(audience)`**: Return estimated reach for the audience (async).
- **`getRateLimitHint(audience)`**: Optional warning message for large sends.

## Personalization (Phase 2)

Use **variables** in title or body (e.g. `{{ first_name }}`). The builder’s Personalization section includes an **Insert variable** dropdown: choose a variable and click “Into title” or “Into message” to append it. At send time, the host or backend should replace variables with per-user values or fallbacks. Optional: show a **preview substitution** line (e.g. “Hi {{ first_name }}” → “Hi Alex”) when a sample or fallback is provided.

## Execution and confirmations

The builder emits events when the user clicks **Save template**, **Send test**, **Schedule**, or **Send**. It does not show confirmation modals or large-audience warnings itself. **Host applications** should:

- **Confirmation modal:** Before acting on `send` or `schedule`, show a confirmation dialog (e.g. “Send to X users?” or “Schedule for …?”) and only call your backend when the user confirms.
- **Large-audience warning:** Use `hooks.estimateReach` and/or `hooks.getRateLimitHint` to detect very large audiences and show a warning (e.g. “You are about to send to 500,000 users”) before sending or scheduling.
- **Final preview:** Optionally show a snapshot of the campaign (e.g. from `computeDeliverySummary` and the preview engine) inside the confirmation modal.

This keeps the builder focused on composition while the host controls risk and compliance.

## Provider mapping (core)

Convert the canonical campaign payload to provider-specific format:

```ts
import { toFCM, toAPNs, toWebPush } from '@keos/notification-builder-core';

const campaign = { /* ... */ };
const { payload, warnings } = toFCM(campaign);
// payload is FCM-shaped; warnings list unsupported or ignored options
```

## Preview engine (core)

Preview logic lives in core so Vue and React render the same result:

```ts
import { simulateAndroid, simulateIOS, simulateWeb } from '@keos/notification-builder-core';

const result = simulateAndroid({ title: 'Hi', body: '...' }, { expanded: true });
// result: { title, body, titleTruncated, bodyTruncated, ... }
```

## Build and demos

From the repo root (npm workspaces):

```bash
npm run build:core
npm run build:vue
npm run build:react
npm run dev:vue    # apps/demo-vue
npm run dev:react  # apps/demo-react
```

## Data model

Campaign payload includes `schema_version: "1.0"` and:

- **Campaign**: `name`, `status`, `audience`, `message`, `delivery`, `tracking`.
- **CampaignAudience**: `type` (topic | segment | user_list), `topic_name`, `platforms[]`, `test_mode`, etc.
- **CampaignMessage**: `title`, `body`, `image_url`, `deep_link`, `variables_used[]`.
- **CampaignDelivery**: `priority`, `ttl_seconds`, `collapse_key`, `quiet_hours_respected`, `scheduled_at`, etc.
- **CampaignTracking**: `campaign_name`, `tags[]`, `ab_test`, `conversion_event`.

**Campaign naming:** `Campaign.name` is the primary identifier (header, listing, API). `Campaign.tracking.campaign_name` is an optional override for reporting only; if unset, reporting can fall back to `Campaign.name`. Do not duplicate the same name in both fields.

The builder is UI-only; your app or backend is responsible for persisting drafts and sending via FCM/APNs/Web Push (using provider mapping if desired).
