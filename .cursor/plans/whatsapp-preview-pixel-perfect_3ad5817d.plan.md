---
name: whatsapp-preview-pixel-perfect
overview: Make the WhatsApp preview in the Keos builder visually match the standalone pixel-perfect HTML sample while keeping the existing Keos shell and data mapping.
todos:
  - id: wa-preview-structure
    content: Restructure WhatsAppTemplatePreview.vue template to a single WhatsApp-style bubble that mirrors the sample HTML
    status: completed
  - id: wa-preview-css
    content: Port and adapt CSS from the sample bubble to scoped wa-* classes in WhatsAppTemplatePreview.vue
    status: completed
  - id: wa-preview-data-mapping
    content: Wire WaPreviewTemplate fields (header, body, footer, buttons, location, catalog, products, coupon, auth) into the new bubble layout
    status: completed
  - id: wa-preview-integration
    content: Verify the new preview inside KeosWhatsAppBuilder preview frame for different viewport widths and content lengths
    status: completed
  - id: wa-preview-polish
    content: Fine-tune fonts, colors, spacing, and timestamp so the builder preview visually matches the provided sample
    status: completed
isProject: false
---

### Goal

Align the in-builder WhatsApp preview with the pixel-perfect bubble UI from `whats_app_pixel_preview.html`, while preserving the Keos builder shell (header, sidebar, sticky actions) and the existing `WaPreviewTemplate` data mapping.

### Current state

- The WhatsApp builder uses `[packages/vue/src/KeosWhatsAppBuilder.vue](packages/vue/src/KeosWhatsAppBuilder.vue)` with `WhatsAppTemplatePreview` for the right-hand preview.
- The form section is in `[packages/vue/src/sections/SectionWhatsApp.vue](packages/vue/src/sections/SectionWhatsApp.vue)` and already captures rich template metadata (template type, name, media, location, coupon, LTO, products, etc.).
- The current `[packages/vue/src/WhatsAppTemplatePreview.vue](packages/vue/src/WhatsAppTemplatePreview.vue)` renders a single bubble on a WA-style background, but its styling still differs from the provided standalone sample `whats_app_pixel_preview.html`:
  - The sample uses a fixed phone container, wallpaper image, and a compact right-aligned bubble with a header, body, footer, buttons row, and timestamp positioned absolutely.
  - Our component needs to match the bubble’s proportions, typography, spacing, and colors more closely, while still mapping dynamic content instead of the hard-coded example.

### Plan

1. **Analyze the sample preview markup and CSS**
  - Re-examine `whats_app_pixel_preview.html` to extract the key structural pieces:
    - `.phone`, `.chat-header`, `.chat-body`, `.row`, `.bubble`, `.media`, `.header`, `.body`, `.footer`, `.buttons`, `.btn`, `.time`.
  - Identify which parts are purely chrome (e.g., outer phone frame, header) vs. the message bubble itself.
  - Decide on the minimal subset to reproduce inside the Keos preview: background + chat body + single `.bubble` inside the existing builder canvas (skip the outer phone shell so it fits our preview frame consistently).
2. **Restructure `WhatsAppTemplatePreview.vue` template around the sample bubble**
  - Keep the existing `WaPreviewTemplate` props and computed `formattedBody` / `googleMapImage` logic intact.
  - Replace the current `phone` + header + chat markup with a lean structure modeled after the sample:
    - Root container (e.g. `wa-preview-root` + `wa-preview-inner`).
    - A single `wa-bubble` div matching `.bubble` from the sample:
      - Optional `wa-media` block when header type is image/video/document.
      - `wa-header` + `wa-header-text` for text header.
      - `wa-body` div that uses `v-html="formattedBody"` and matches `.body` spacing and font size.
      - Optional `wa-footer` below, styled like `.footer`.
      - `wa-buttons` container with one `wa-button` per template button, styled like `.btn`.
      - `wa-time` absolutely positioned in the bottom-right, like `.time`.
  - Map existing location/catalog/multi-product/coupon/auth sections into small sub-blocks that appear between body/footer/buttons but do not change the bubble proportions (keep typography consistent with the sample).
3. **Port and adapt CSS from the sample to scoped styles**
  - Start from the sample’s CSS in `whats_app_pixel_preview.html` for `.bubble`, `.header`, `.body`, `.footer`, `.buttons`, `.btn`, `.time` and translate to `wa-`* class names in `[packages/vue/src/WhatsAppTemplatePreview.vue](packages/vue/src/WhatsAppTemplatePreview.vue)`.
  - Ensure:
    - Fonts use the same system stack already used in Keos (`Inter` / system-ui), not the sample’s global reset.
    - Colors match or are extremely close to the WhatsApp sample values (#111b21, #667781, #00a884, timestamp gray, etc.).
    - Bubble max-width, padding, and radius align with the sample (`max-width ~320px`, `border-radius` combo for outgoing bubble tail, subtle box-shadow).
    - The timestamp is positioned with `position:absolute; right:8px; bottom:4px` inside the bubble, without clipping.
  - Wrap the preview root in a simple background that evokes WhatsApp but fits Keos’ preview frame (e.g., solid `#e5ddd5` or subtle wallpaper) without reintroducing a full phone frame.
4. **Preserve and simplify behaviour from the previous preview**
  - Remove any dark-mode toggles and phone header/chrome: the sample preview doesn’t have them and they distract from template content.
  - Keep body formatting (`*bold`*, `_italic_`, newlines) exactly as currently implemented.
  - For location, catalog, multi-product, coupon, LTO, and auth content:
    - Use compact blocks with styles inspired by WhatsApp’s cards, but keep them visually subordinate to the main header/body/footer, so the bubble remains clean like the sample.
    - Ensure these blocks don’t push the timestamp off-bubble; adjust padding where necessary.
5. **Integrate cleanly into Keos builder preview frame**
  - Verify that `[packages/vue/src/KeosWhatsAppBuilder.vue](packages/vue/src/KeosWhatsAppBuilder.vue)` still passes `waPreviewTemplate` unchanged to the updated preview component.
  - Check that the new preview fits nicely inside the existing `kb-wa-preview-frame` without extra scrollbars or clipping.
  - Ensure responsive behavior is acceptable: the bubble shrinks on narrow viewports and stays right-aligned within the preview card.
6. **Visual polish and consistency checks**
  - Compare the final builder preview side-by-side with `whats_app_pixel_preview.html` to tweak:
    - Font sizes and weights for header/body/footer.
    - Vertical spacing between sections.
    - Corner radii and background tones.
  - Make small adjustments until the bubble visually matches the sample “at a glance” while still looking at home in the Keos builder.

### Todos

- Inspect and finalize bubble structure and class names in `WhatsAppTemplatePreview.vue` to mirror the sample.
- Port and adapt the sample’s bubble CSS into scoped `wa-`* styles, preserving fonts, colors, paddings, and timestamp placement.
- Map dynamic template parts (header/body/footer/buttons/location/etc.) into the new structure.
- Verify rendering inside `KeosWhatsAppBuilder` preview frame at different widths and content combinations.
- Do a visual pass comparing against `whats_app_pixel_preview.html` and adjust styling until they closely match.

