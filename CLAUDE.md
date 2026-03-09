# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build all packages in dependency order (core → ui-tokens → vue → react)
npm run build

# Build individual packages
npm run build:core    # TypeScript compilation only
npm run build:vue     # Vite build + type check
npm run build:react   # Vite build + type check

# Run demo apps
npm run dev:vue       # Vue demo at localhost
npm run dev:react     # React demo at localhost
```

No test or lint scripts are currently configured. TypeScript type checking runs as part of builds (`vue-tsc --noEmit` / `tsc --noEmit`).

## Architecture

This is a monorepo (npm workspaces) exporting embeddable notification campaign builder components for both Vue 3.5 and React.

```
packages/
  core/          # Framework-agnostic: types, validation, preview engine, provider mapping
  ui-tokens/     # Shared design tokens (colors, spacing, typography, radius, elevation)
  vue/           # Vue 3.5 builder components
  react/         # React builder components
apps/
  demo-vue/      # Vue demo (Push, WhatsApp, SMS, Email builders)
  demo-react/    # React demo (Push builder)
```

### Core Package

The core package is the source of truth and has zero framework dependencies.

- **`types.ts`** — `Campaign`, `CampaignAudience`, `CampaignMessage`, `CampaignDelivery`, `CampaignTracking` interfaces
- **`constants.ts`** — Platform character limits, TTL presets, priority levels, `SCHEMA_VERSION`
- **`validation.ts`** — Campaign validation returning typed errors
- **`deliverySummary.ts`** — Computes send warnings and delivery metadata
- **`preview/`** — `simulateAndroid.ts`, `simulateIOS.ts`, `simulateWeb.ts` — platform-specific notification preview logic with text truncation
- **`providerMapping/`** — Convert `Campaign` → FCM, APNs, Web Push, WhatsApp payloads

### Vue / React Packages

Both packages mirror each other structurally:

- **Main entry**: `KeosNotificationBuilder` — top-level builder component
- **`sections/`** — `SectionAudience`, `SectionMessage`, `SectionPersonalization`, `SectionDelivery`, `SectionAdvanced`, `SectionTracking`
- **`PreviewPanel`** — Live device preview using core's simulate functions
- **`DeliverySummaryCard`** — Renders delivery metadata from `deliverySummary.ts`
- **State management**: `useCampaignState` composable/hook — validation, dirty tracking, save/send events

Vue also has:
- `KeosWhatsAppBuilder`, `KeosSmsBuilder`, `KeosEmailBuilder` — additional channel builders
- `useAutosave` composable
- `config/presets.ts` — push notification template presets
- `config/builderConfig.*.ts` — per-channel configuration

### Campaign Data Model

```typescript
Campaign {
  audience: { type: "topic" | "segment" | "user_list", platforms: ["android","ios","web"][], ... }
  message:  { title, body, image_url, deep_link, variables: string[], title_by_locale, body_by_locale, ... }
  delivery: { priority: "low"|"normal"|"high", ttl: number, collapse_key, scheduled_at, quiet_hours_respected, silent_push }
  tracking: { campaign_name, tags, ab_test, conversion_event }
}
```

### Extension Points

The builder accepts `BuilderExtensionHooks` props:
- `customValidators(campaign)` — additional validation errors
- `canSend()`, `canSchedule()`, `canEditTemplate()` — permission gates
- `estimateReach(audience)` — audience size estimate
- `getRateLimitHint(audience)` — rate limit warnings

### Build Dependencies

Core must be built before Vue/React (they import from `@keos/notification-builder-core`). UI Tokens must also be built first. The root `npm run build` handles ordering.
