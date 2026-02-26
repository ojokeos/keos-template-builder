---
name: modernize-all-builders
overview: Implement advanced UX, editing, preview, collaboration, and channel-specific features across all four message builders (Push, WhatsApp, SMS, Email) to reach a modern, industry-grade standard.
todos:
  - id: phase-1-history-autosave
    content: Implement undo/redo, autosave, and per-section reset across all builders
    status: completed
  - id: phase-2-presets-preview
    content: Add channel-specific template presets and sample-data-based "Preview as"
    status: completed
  - id: phase-3-shell-nav-validation
    content: Introduce global shell, section navigation rail, empty states, and inline validation
    status: completed
  - id: phase-4-collab-workflow
    content: Add notes panel, version history, and status badge logic
    status: completed
  - id: phase-5-channel-smarts
    content: Implement channel-specific smarts (Push/WhatsApp/SMS/Email) and email block library
    status: completed
  - id: phase-6-arch-a11y
    content: Refactor to config-driven builders, shared form shells, and full accessibility audit
    status: completed
isProject: false
---

# Modernizing All Builders to Industry-Grade

## Scope

We will enhance all four builders (Push, WhatsApp, SMS, Email) across five dimensions:

- UX & layout
- Editing experience & power features
- Preview capabilities
- Collaboration & workflow
- Channel-specific intelligence
- Underlying developer architecture

## 1. UX polish & layout upgrades

- **Global shell**
  - Add a top-level shell component (used by all builders) that provides:
    - Product logo/brand area
    - Channel switcher (Push / WhatsApp / SMS / Email)
    - Environment badge (e.g. Sandbox / Production from props or config)
    - Help link / documentation icon
  - Wrap existing builder roots (e.g. `keos-notification-builder`, `keos-whatsapp-builder`, etc.) inside this shell.
- **Section navigation rail**
  - Introduce a shared `BuilderOutline` component rendered on the left edge of the customization panel (or within the sidebar) listing sections:
    - Template, Audience, Delivery, Tracking, Advanced (per builder’s actual sections)
  - Implement scroll-sync:
    - Each section root in the sidebar gets an `id` and an intersection observer (or scroll listener) updates the active item.
    - Clicking an item scrolls the sidebar to the corresponding section.
- **Empty states**
  - For each builder’s preview:
    - If required parts of the campaign are empty (e.g. no title/body for Push, no blocks for Email, no SMS body), show a skeleton preview with copy like “Start adding content to see a live preview here”.
  - For the customization area:
    - Where applicable, show a friendly hint card at the top explaining the first key step (e.g. “Choose a template type first”).
- **Inline validation**
  - Extend `useCampaignState` or builder-specific validation so each field can surface per-field errors/warnings:
    - Title/body length over limits
    - Required URLs missing or invalid
    - WhatsApp required template fields missing
  - In section components (e.g. `SectionMessage`, `SectionEmail`, `SectionWhatsApp`, `SectionSms`, `SectionDelivery`):
    - Render small inline messages under the specific field, using consistent styles and icons, instead of only top-level banners.

## 2. Editing experience & power features

- **Undo / redo per builder**
  - Add a lightweight history stack to `useCampaignState`:
    - Keep a `past: Campaign[]`, `present: Campaign`, `future: Campaign[]` (or simple linear stack) with a max length (e.g. 20).
    - Whenever `updateMessage`, `updateDelivery`, etc. mutate the campaign, push a snapshot to history.
  - Expose `undo` / `redo` methods + `canUndo` / `canRedo` flags.
  - In each builder’s footer or header, add Undo/Redo buttons and wire `Cmd+Z / Shift+Cmd+Z` keyboard shortcuts.
- **Autosave drafts**
  - Create a shared `useAutosave` composable:
    - Keyed by `channel` + `campaign.id` (or `campaign.name` fallback).
    - Watches `campaign` and debounces writes to `localStorage`.
    - On mount, attempts to load an existing draft and merge / prompt user to restore.
  - Add a small “Last saved at HH:MM” indicator near the header using a reactive timestamp.
- **Template presets**
  - Define per-channel presets in a config module (e.g. `presets.ts`):
    - Push: Simple alert, Promotion with image, Transactional.
    - WhatsApp: OTP, Order status, Promotion, Support reply.
    - Email: Announcement, Newsletter, Offer, Receipt as prebuilt `email_blocks` + envelope.
    - SMS: Short alert, OTP, Shipping update, Promo text.
  - Add a `Presets` dropdown in each builder’s form head:
    - Selecting a preset replaces (or merges into) the campaign’s message/delivery/etc. with a deep clone of the preset.
    - Confirm dialog if the builder is already dirty.
- **Clone & reset**
  - **Duplicate template**:
    - Add a “Duplicate” action per builder (in header overflow or footer): emits a cloned `Campaign` object to the parent (so the hosting app can create a new campaign pre-filled with the same data).
  - **Per-section reset**:
    - In each section component, add a small “Reset section” link/button.
    - Implement per-section default factories (e.g. `defaultDelivery()`, `defaultTracking()`, `defaultMessage(channel)`), and use them when resetting.

## 3. Preview enhancements

- **Live variable preview (“Preview as…”)**
  - Use `[sample-data.json](/Users/ojoxdan/KEOS/keos-notification-builder/sample-data.json)` to define one or more named sample profiles.
  - Add a “Preview as…” select control in each preview chrome (Push, WhatsApp, SMS, Email).
  - Introduce a shared helper to render templates:
    - Given a string with `{{ variable }}` placeholders and a sample profile, substitute values for preview only (does not modify stored templates).
  - Apply this render function in `PreviewPanel` (Push), WhatsApp preview, SMS preview, and email HTML rendering.
- **Theme toggle for previews**
  - Push & WhatsApp:
    - Add a light/dark toggle in the preview chrome that switches CSS classes on the device container:
      - Light: brighter device shell and text colors.
      - Dark: current styling.
  - Email:
    - Enhance the existing preview to support a split option (toggle between Inbox view only vs. Inbox + full body as now, or a side-by-side layout on wide screens).
- **Side-by-side compare (A/B)**
  - Add an optional “Compare variant” mode per builder:
    - Introduce secondary in-memory `variantB` structure or a simple diff view, and show two previews side-by-side.
    - Start light: allow editing only the primary variant; treat B as a read-only or lightly editable “what if” view.

## 4. Collaboration & workflow

- **Comments / notes per builder**
  - Add a `Notes` panel component anchored to the right of the customization area or under the header.
  - Store notes in the `Campaign` model as a `notes` field (string or array of notes with timestamps).
  - Simple markdown or plain text with auto-sizing textarea.
- **Version history**
  - Per builder, add a “Save as version” button in the footer or header overflow:
    - Stores a lightweight version object `{ id, label, timestamp, snapshot }` in memory / parent props.
  - Add a “Version history” modal listing versions with:
    - Restore action (replace current campaign with snapshot).
    - Optional diff summary (later enhancement).
- **Status badge logic**
  - Define a small state machine for `status` (Draft → Ready for review → Approved → Archived).
  - Update `BuilderHeader` to:
    - Edit or transition status via a dropdown.
    - Reflect status with color-coded pill and contextual help (e.g. Approved disables editing unless explicitly re-opened).

## 5. Channel-specific smarts

- **Push**
  - Extend existing character counting to:
    - Visual rails under title/body fields (soft gradient or subtle bar showing usage vs. limit for each platform).
  - Add action button suggestions as chips under the actions section (e.g. `View order`, `Track shipment`, `Open app`). Clicking a chip populates a new action.
- **WhatsApp**
  - Add a “Template fields” panel:
    - Parse placeholders used in the WhatsApp template (body, header) and list them with whether they’re configured.
  - Introduce a `Language variants` tab:
    - Data model: array of `{ locale, messageOverrides }`.
    - Simple UI to add locales and override text blocks.
- **SMS**
  - Segment cost estimator:
    - Config for cost per segment (prop or global config).
    - Show `segments × price` under the SMS preview, updated as user types.
  - Smart truncation suggestions:
    - When text goes beyond a configurable segment threshold, show inline suggestions (e.g. “Shorten this phrase”, highlight parts that can be cut).
- **Email**
  - Block library
    - Add a “Block library” sidebar panel listing reusable named blocks (Hero, 2-column features, Social footer, Legal footer, etc.).
    - Allow “Save current block as reusable” and “Insert from library” into the `email_blocks` list.
  - Preheader & subject analyzer
    - Add a small analyzer badge by the subject and preview text fields:
      - Shows length buckets (too short / good / too long).
      - Flags simple “spammy” words (FREE!!!, 100% guaranteed, etc.) using a small keyword list.

## 6. Developer-quality improvements

- **Config-driven builders**
  - Introduce a config module per channel (e.g. `builderConfig.push.ts`, `builderConfig.whatsapp.ts`, etc.) describing:
    - Sections: ids, titles, components to render, order.
    - Preview capabilities: hasDeviceToggle, supportsThemeToggle, etc.
  - Refactor the builder templates to map over these configs instead of hardcoding section blocks where reasonable.
- **Shared form shell components**
  - Extract shared components:
    - `BuilderFormShell` (for `kb-*-form` + head + label).
    - `BuilderActionsBar` (for the sticky Save/Continue actions).
    - `BuilderTopShell` (for header + error/warning container and margins).
  - Update all four builders to use these shared components to reduce duplication and keep styling in sync.
- **Accessibility**
  - Audit roles and labels:
    - Ensure all toggles and tabs (device & platform) have proper `role="tablist"`, `role="tab"`, `aria-selected`, and `aria-controls`.
    - Ensure form inputs have `label` or `aria-label`, and error messages are announced via `aria-describedby`.
  - Keyboard support:
    - Tab/arrow-key navigation for device/platform toggles.
    - Escape/Enter handling for dialogs (presets, version history, etc.).

## Implementation phases

To keep changes manageable and shippable, we’ll implement in phases:

1. **Phase 1 – Editing & safety**
  - Undo/redo history, autosave drafts, per-section reset.
2. **Phase 2 – Presets & preview data**
  - Template presets per channel.
  - “Preview as…” sample-data rendering.
3. **Phase 3 – UX shell & navigation**
  - Global shell, section rail, refined empty states, inline validation.
4. **Phase 4 – Collaboration & workflow**
  - Notes panel, version history, status machine.
5. **Phase 5 – Channel smarts & library**
  - Push/WhatsApp/SMS/Email extra intelligence, block library, analyzer.
6. **Phase 6 – Architecture & accessibility**
  - Config-driven sections, shared shell components, full a11y pass.

