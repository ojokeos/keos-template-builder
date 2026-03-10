<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import type {
  Campaign,
  BuilderExtensionHooks,
} from "@keos/notification-builder-core";
import type { GupshupWhatsAppTemplateCreatePayload } from "@keos/notification-builder-core";
import { toGupshupWhatsAppTemplate } from "@keos/notification-builder-core";
import { spacing, colors, radius } from "@keos/notification-builder-ui-tokens";
import { useCampaignState } from "./composables/useCampaignState";
import { useAutosave } from "./composables/useAutosave";
import BuilderHeader from "./BuilderHeader.vue";
import SectionPersonalization from "./sections/SectionPersonalization.vue";
import SectionWhatsApp from "./sections/SectionWhatsApp.vue";
import WhatsAppTemplatePreview from "./WhatsAppTemplatePreview.vue";
import type { WaPreviewTemplate } from "./WhatsAppTemplatePreview.vue";
import { WHATSAPP_PRESETS } from "./config/presets";
import {
  DEFAULT_SAMPLE_PROFILES,
  renderTemplatePreview,
} from "./utils/renderTemplatePreview";

const WA_HEADER_LIMIT = 60;
const WA_BODY_LIMIT = 1024;
const WA_FOOTER_LIMIT = 60;
const WA_MAX_BUTTONS = 10;
const WA_MAX_CAROUSEL_CARDS = 10;
const WA_MEDIA_TYPES = new Set(["image", "video", "document"]);
const REQUIRED_GUPSHUP_KEYS = new Set([
  "elementName",
  "languageCode",
  "category",
  "templateType",
  "content",
  "metaTemplate",
  "metaWhatsApp",
]);

function hasContentValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value as Record<string, unknown>).length > 0;
  return true;
}

function buildCompactGupshupMessage(
  payload: GupshupWhatsAppTemplateCreatePayload,
): Record<string, unknown> {
  const compact: Record<string, unknown> = {
    elementName: payload.elementName,
    languageCode: payload.languageCode,
    category: payload.category,
    templateType: payload.templateType,
    content: payload.content,
    metaTemplate: payload.metaTemplate,
    metaWhatsApp: payload.metaWhatsApp ?? payload.metaTemplate,
    header: payload.header,
    footer: payload.footer,
    buttons: payload.buttons,
    example: payload.example,
    exampleMedia: payload.exampleMedia,
    vertical: payload.vertical,
    enableSample: payload.enableSample,
    allowTemplateCategoryChange: payload.allowTemplateCategoryChange,
    addSecurityRecommendation: payload.addSecurityRecommendation,
    codeExpirationMinutes: payload.codeExpirationMinutes,
    advanced: payload.advanced,
  };
  return Object.fromEntries(
    Object.entries(compact).filter(([key, value]) => {
      if (REQUIRED_GUPSHUP_KEYS.has(key)) return true;
      return hasContentValue(value);
    }),
  );
}

function normalizeWhatsAppMessage(message: Record<string, unknown>): Record<string, unknown> {
  const next = { ...message } as Record<string, unknown>;
  const templateType = String(next.template_type ?? "text").trim().toLowerCase();
  const headerType = String(next.header_type ?? "none").trim().toLowerCase();
  const hasMedia = WA_MEDIA_TYPES.has(templateType) || WA_MEDIA_TYPES.has(headerType);

  if (!hasMedia) {
    next.media_url = undefined;
    next.media_caption = undefined;
    next.document_filename = undefined;
    next.document_size = undefined;
  }

  if (templateType !== "carousel") {
    next.cards = undefined;
  }
  if (templateType !== "catalog" && templateType !== "mpm") {
    next.products = undefined;
  }
  if (templateType !== "flow") {
    next.flow_id = undefined;
    next.flow_cta_label = undefined;
  }
  if (templateType !== "lto") {
    next.lto_expiry = undefined;
  }
  if (templateType !== "auth") {
    next.auth_type = undefined;
    next.auth_label = undefined;
    next.auth_code = undefined;
    next.otp_code = undefined;
  }
  if (templateType !== "document" && headerType !== "document") {
    next.document_filename = undefined;
    next.document_size = undefined;
  }
  if (templateType !== "location") {
    next.location = undefined;
  }

  const buttons = Array.isArray(next.buttons) ? next.buttons : [];
  next.buttons = buttons;
  return next;
}

function validateWhatsAppTemplate(c: Campaign): string[] {
  const errors: string[] = [];
  const msg = c.message as any;
  const category = (msg.template_category ?? "").toString().trim();
  const templateType = (msg.template_type ?? "text").toString();
  const headerType = (msg.header_type ?? "none").toString();
  const headerText = (msg.header ?? "").toString();
  const body = (msg.body ?? "").toString();
  const footer = (msg.footer ?? "").toString();
  const buttons = Array.isArray(msg.buttons) ? msg.buttons : [];
  const cards = Array.isArray(msg.cards) ? msg.cards : [];

  if (!c.name?.trim()) errors.push("Template name is required");
  if (!msg.template_name?.trim())
    errors.push("WhatsApp template name is required");
  if (!category)
    errors.push("WhatsApp category is required (Marketing, Utility, or Authentication)");
  if (!body.trim()) errors.push("Body is required");

  if (headerType === "text" && headerText.length > WA_HEADER_LIMIT) {
    errors.push(`Header text cannot exceed ${WA_HEADER_LIMIT} characters`);
  }
  if (body.length > WA_BODY_LIMIT) {
    errors.push(`Body cannot exceed ${WA_BODY_LIMIT} characters`);
  }
  if (footer.length > WA_FOOTER_LIMIT) {
    errors.push(`Footer cannot exceed ${WA_FOOTER_LIMIT} characters`);
  }
  if (buttons.length > WA_MAX_BUTTONS) {
    errors.push(`Buttons cannot exceed ${WA_MAX_BUTTONS}`);
  }

  if (
    (templateType === "image" ||
      templateType === "video" ||
      templateType === "document" ||
      headerType === "image" ||
      headerType === "video" ||
      headerType === "document") &&
    !msg.media_url
  ) {
    errors.push("Media URL is required for rich media templates");
  }

  if (category === "authentication" && templateType !== "auth") {
    errors.push("Authentication category must use Authentication format");
  }
  if (templateType === "auth" && !msg.auth_label?.trim() && !body.includes("{{")) {
    errors.push("Authentication templates should include a code label or placeholder variable");
  }
  if (templateType === "lto" && !msg.lto_expiry) {
    errors.push("Limited-time offer requires an expiry");
  }
  if ((templateType === "mpm" || templateType === "catalog") && !msg.products?.length) {
    errors.push("Catalog and multi-product templates require at least one product");
  }
  if (templateType === "flow" && !msg.flow_id?.trim()) {
    errors.push("WhatsApp Flow format requires a flow ID");
  }
  if (templateType === "carousel") {
    if (!cards.length) {
      errors.push("Carousel format requires at least one card");
    } else if (cards.length > WA_MAX_CAROUSEL_CARDS) {
      errors.push(`Carousel supports up to ${WA_MAX_CAROUSEL_CARDS} cards`);
    }
  }

  return errors;
}

function validateDisabledWhatsAppOptions(
  c: Campaign,
  disabledCategories: string[],
  disabledFormats: string[],
): string[] {
  const msg = c.message as any;
  const category = String(msg.template_category ?? "").trim();
  const format = String(msg.template_type ?? "text").trim();
  const errors: string[] = [];
  if (category && disabledCategories.includes(category)) {
    errors.push(`WhatsApp category "${category}" is disabled in this builder configuration`);
  }
  if (format && disabledFormats.includes(format)) {
    errors.push(`WhatsApp format "${format}" is disabled in this builder configuration`);
  }
  return errors;
}

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    disabledTemplateCategories?: string[];
    disabledTemplateFormats?: string[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showDuplicate?: boolean;
    /** Optional helper text shown on the left side of the action bar. */
    actionsNote?: string;
    /**
     * When true (default), builder is design-only: template content + preview.
     * Audience and send options are configured on another page.
     */
    designOnly?: boolean;
    /**
     * When true, campaign name is normalized by replacing spaces with hyphens
     * as the user types (e.g. "Spring Sale" → "Spring-Sale").
     */
    enforceSlugName?: boolean;
    /**
     * Your backend endpoint for uploading sample media files.
     * Must accept a multipart/form-data POST with a `file` field and return
     * `{ mediaId: string }`. Your backend is responsible for forwarding the
     * file to Gupshup and returning the handle — never expose Gupshup
     * credentials in the frontend.
     * Example: 'https://yourapi.example.com/whatsapp/upload-media'
     */
    mediaUploadUrl?: string;
    /**
     * Optional headers sent with the media upload request.
     * Use for bearer tokens or any other auth your backend requires.
     * Example: { Authorization: 'Bearer <token>' }
     */
    mediaUploadHeaders?: Record<string, string>;
  }>(),
  {
    disabledSections: () => [],
    variableOptions: () => [],
    disabledTemplateCategories: () => [],
    disabledTemplateFormats: () => [],
    showSave: true,
    showClose: true,
    showDuplicate: true,
    actionsNote: "",
    designOnly: true,
    enforceSlugName: false,
  },
);

function hydrateMessageFromGupshup(message: Record<string, unknown> | undefined): Record<string, unknown> {
  if (!message) return {};
  const metaTemplate =
    (message.metaTemplate as Record<string, unknown> | undefined) ??
    (message.metaWhatsApp as Record<string, unknown> | undefined);
  const firstBody = Array.isArray(metaTemplate?.components)
    ? (metaTemplate?.components as any[]).find((c) => c?.type === "BODY")
    : undefined;
  const firstFooter = Array.isArray(metaTemplate?.components)
    ? (metaTemplate?.components as any[]).find((c) => c?.type === "FOOTER")
    : undefined;
  const firstHeader = Array.isArray(metaTemplate?.components)
    ? (metaTemplate?.components as any[]).find((c) => c?.type === "HEADER")
    : undefined;

  const content = String(message.content ?? "").trim();
  const templateName = String(message.elementName ?? "").trim();
  const languageCode = String(message.languageCode ?? "").trim();
  const category = String(message.category ?? "").trim().toLowerCase();
  const templateType = String(message.templateType ?? "").trim().toLowerCase();
  const footer = String(message.footer ?? "").trim();
  const headerText = String(message.header ?? "").trim();

  return {
    ...message,
    ...(templateName && !message.template_name ? { template_name: templateName } : {}),
    ...(languageCode && !message.template_language ? { template_language: languageCode } : {}),
    ...(category && !message.template_category ? { template_category: category } : {}),
    ...(templateType && !message.template_type ? { template_type: templateType } : {}),
    ...(content && !message.body ? { body: content } : {}),
    ...(footer && !message.footer ? { footer } : {}),
    ...(headerText && !message.header ? { header: headerText } : {}),
    ...(!message.body && firstBody?.text ? { body: String(firstBody.text) } : {}),
    ...(!message.footer && firstFooter?.text ? { footer: String(firstFooter.text) } : {}),
    ...(!message.header && firstHeader?.text ? { header: String(firstHeader.text) } : {}),
  };
}

function hydrateCampaignFromGupshup(source?: Partial<Campaign>): Partial<Campaign> | undefined {
  if (!source) return source;
  const msg = hydrateMessageFromGupshup(source.message as Record<string, unknown> | undefined);
  return { ...source, message: msg as any };
}

const emit = defineEmits<{
  "update:modelValue": [campaign: Campaign];
  change: [campaign: Campaign];
  save: [campaign: Campaign];
  "save-gupshup-template": [
    payload: GupshupWhatsAppTemplateCreatePayload,
    warnings: string[],
    campaign: Campaign,
  ];
  edit: [];
  "send-test": [campaign: Campaign];
  schedule: [campaign: Campaign];
  send: [campaign: Campaign];
  duplicate: [campaign: Campaign];
}>();

function withGupshupMessage(c: Campaign): Campaign {
  const mapped = toGupshupWhatsAppTemplate(c, {
    exampleData: previewProfile.value?.data,
  });
  return {
    ...c,
    message: buildCompactGupshupMessage(mapped.payload) as any,
  };
}

const {
  campaign,
  dirty,
  customValidatorErrors,
  getValidationWithWarnings,
  update,
  updateMessage,
  undo,
  redo,
  canUndo,
  canRedo,
  resetMessage,
  hooks,
} = useCampaignState({
  initial: hydrateCampaignFromGupshup(props.modelValue),
  hooks: {
    ...props.hooks,
    customValidators: async (c) => {
      const errors = [
        ...validateWhatsAppTemplate(c),
        ...validateDisabledWhatsAppOptions(
          c,
          props.disabledTemplateCategories,
          props.disabledTemplateFormats,
        ),
      ];
      const fromHost = props.hooks?.customValidators
        ? await props.hooks.customValidators(c)
        : [];
      return [...errors, ...fromHost];
    },
  },
  onDirty: () => emit("change", withGupshupMessage(campaign.value)),
});

const { lastSavedAt } = useAutosave(campaign, { channel: "whatsapp" });

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === "z") {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});

watch(campaign, (c) => emit("update:modelValue", withGupshupMessage(c)), {
  deep: true,
});

const estimatedReach = ref<number | undefined>();
const canSend = ref(true);

async function resolveHooks() {
  if (hooks.estimateReach) {
    try {
      estimatedReach.value = await hooks.estimateReach(campaign.value.audience);
    } catch {
      estimatedReach.value = undefined;
    }
  }
  if (hooks.canSend) canSend.value = await Promise.resolve(hooks.canSend());
}

resolveHooks();
watch(() => campaign.value.audience, resolveHooks, { deep: true });

const validationFull = computed(() => {
  void customValidatorErrors.value;
  return getValidationWithWarnings(estimatedReach.value);
});
const blockingErrors = computed(() => validationFull.value.blockingErrors);
const warningsList = computed(() => validationFull.value.warnings);
const isValid = computed(() => validationFull.value.valid);
const setupScore = computed(() => {
  const msg = campaign.value.message as any;
  const checks = [
    Boolean(msg.template_name?.trim()),
    Boolean(msg.template_category?.trim()),
    Boolean((msg.body ?? "").toString().trim()),
    Boolean(msg.template_language?.trim()),
    Array.isArray(msg.buttons) ? msg.buttons.length > 0 : false,
  ];
  const passed = checks.filter(Boolean).length;
  return Math.round((passed / checks.length) * 100);
});
const setupStatusLabel = computed(() => {
  if (setupScore.value >= 90) return "Production ready";
  if (setupScore.value >= 70) return "Strong draft";
  if (setupScore.value >= 40) return "In progress";
  return "Needs setup";
});
const hasWaPreviewContent = computed(() => {
  const msg = campaign.value.message as any;
  return Boolean(
    (msg.body ?? "").toString().trim() ||
      (msg.header ?? "").toString().trim() ||
      msg.media_url ||
      msg.flow_id ||
      msg.coupon_code ||
      msg.lto_expiry ||
      msg.voice_transcript ||
      msg.contact_name ||
      msg.link_title ||
      msg.order_title ||
      (Array.isArray(msg.buttons) && msg.buttons.length) ||
      (Array.isArray(msg.products) && msg.products.length) ||
      (Array.isArray(msg.cards) && msg.cards.length),
  );
});

const selectedPreviewProfileId = ref<string>("");
const presetConfirmOpen = ref(false);
const pendingPreset = ref<(typeof WHATSAPP_PRESETS)[0] | null>(null);
const disabledCategorySet = computed(
  () => new Set((props.disabledTemplateCategories ?? []).map((v) => String(v).trim().toLowerCase())),
);
const disabledFormatSet = computed(
  () => new Set((props.disabledTemplateFormats ?? []).map((v) => String(v).trim().toLowerCase())),
);
const availablePresets = computed(() =>
  WHATSAPP_PRESETS.filter((p) => {
    const msg = (p.campaign?.message ?? {}) as Record<string, unknown>;
    const cat = String(msg.template_category ?? '').trim().toLowerCase();
    const fmt = String(msg.template_type ?? '').trim().toLowerCase();
    if (cat && disabledCategorySet.value.has(cat)) return false;
    if (fmt && disabledFormatSet.value.has(fmt)) return false;
    return true;
  }),
);

const previewProfile = computed(() => {
  const id = selectedPreviewProfileId.value;
  if (!id) return null;
  return DEFAULT_SAMPLE_PROFILES.find((p) => p.id === id) ?? null;
});

const waBodyDisplay = computed(() => {
  const body = (campaign.value.message as any).body ?? "";
  if (!previewProfile.value) return body;
  return renderTemplatePreview(body, previewProfile.value.data);
});
const waHeaderDisplay = computed(() => {
  const header = (campaign.value.message as any).header ?? "";
  if (!previewProfile.value) return header;
  return renderTemplatePreview(header, previewProfile.value.data);
});

/** Map campaign.message to the WhatsAppTemplatePreview template shape (cream phone + green bubble). */
const waPreviewTemplate = computed((): WaPreviewTemplate => {
  const msg = campaign.value.message as any;
  const templateType = msg.template_type ?? "text";
  const headerType = msg.header_type ?? "none";
  let header: WaPreviewTemplate["header"] | undefined;
  let location: WaPreviewTemplate["location"] | undefined;
  let catalog: WaPreviewTemplate["catalog"] | undefined;
  let multiProduct: WaPreviewTemplate["multiProduct"] | undefined;
  let coupon: WaPreviewTemplate["coupon"] | undefined;
  let limitedOffer: WaPreviewTemplate["limitedOffer"] | undefined;
  let auth: WaPreviewTemplate["auth"] | undefined;

  if ((templateType === "image" || headerType === "image") && msg.media_url) {
    header = { type: "image", url: msg.media_url };
  } else if ((templateType === "video" || headerType === "video") && msg.media_url) {
    header = { type: "video", url: msg.media_url };
  } else if (templateType === "document" || headerType === "document") {
    header = {
      type: "document",
      url: msg.media_url || undefined,
      filename: msg.document_filename || msg.media_url || "document.pdf",
    };
  } else if (headerType === "text" && msg.header) {
    header = { type: "text", text: waHeaderDisplay.value };
  } else if (msg.header) {
    header = { type: "text", text: waHeaderDisplay.value };
  }
  const body =
    waBodyDisplay.value || "Start adding content to see a live preview here.";

  if (templateType === "location" && msg.location) {
    const rawLoc = msg.location as any;
    const lat = rawLoc.lat ?? rawLoc.latitude;
    const lng = rawLoc.lng ?? rawLoc.lon ?? rawLoc.longitude;
    if (lat != null && lng != null) {
      location = {
        lat,
        lng,
        name: rawLoc.name ?? rawLoc.title,
        address: rawLoc.address ?? `${lat}, ${lng}`,
      };
    }
  }

  if (
    (templateType === "catalog" || templateType === "mpm") &&
    Array.isArray(msg.products) &&
    msg.products.length
  ) {
    catalog = true;
    multiProduct = (msg.products as any[]).map((p) => ({
      image: p.image ?? p.imageUrl,
      name: p.name ?? p.sectionTitle ?? p.title ?? "Product",
      price: p.price ?? p.productId ?? "",
    }));
  }
  if (templateType === "carousel" && Array.isArray(msg.cards) && msg.cards.length) {
    catalog = true;
    multiProduct = (msg.cards as any[]).map((c) => ({
      image: c.image ?? c.media_url,
      name: c.title ?? "Card",
      price: c.button_label ?? "",
    }));
  }

  if (templateType === "coupon" && msg.coupon_code) {
    coupon = { code: msg.coupon_code };
  }

  if (templateType === "lto" && msg.lto_expiry) {
    limitedOffer = msg.lto_expiry;
  }

  if (templateType === "auth") {
    const code = msg.auth_code ?? (msg as any).otp_code ?? "123 456";
    auth = { code };
  }

  const buttonsRaw = (msg.buttons as { label?: string; type?: string; value?: string }[] | undefined) ?? [];
  if (templateType === "flow" && msg.flow_cta_label?.trim()) {
    buttonsRaw.push({
      label: msg.flow_cta_label,
    });
  }
  return {
    format: templateType,
    templateName: msg.template_name || undefined,
    templateLanguage: msg.template_language || undefined,
    templateCategory: msg.template_category || undefined,
    header,
    body,
    mediaCaption: msg.media_caption || undefined,
    footer: msg.footer || undefined,
    buttons: buttonsRaw.map((b) => ({ text: b.label || "Button", type: b.type, value: b.value })),
    location,
    catalog,
    multiProduct,
    coupon,
    limitedOffer,
    auth,
    linkPreview:
      msg.link_title || msg.link_description || msg.link_url
        ? {
            title: msg.link_title || undefined,
            description: msg.link_description || undefined,
            domain: msg.link_domain || undefined,
            url: msg.link_url || undefined,
            thumbnail: msg.link_thumbnail_url || undefined,
          }
        : undefined,
    voiceNote:
      msg.voice_transcript || msg.voice_duration || msg.voice_profile_image
        ? {
            transcript: msg.voice_transcript || undefined,
            duration: msg.voice_duration || undefined,
            profileImage: msg.voice_profile_image || undefined,
          }
        : undefined,
    contactCard:
      msg.contact_name || msg.contact_phone || msg.contact_email
        ? {
            name: msg.contact_name || undefined,
            title: msg.contact_title || undefined,
            phone: msg.contact_phone || undefined,
            email: msg.contact_email || undefined,
            address: msg.contact_address || undefined,
          }
        : undefined,
    documentCard:
      msg.document_filename || templateType === "document" || headerType === "document"
        ? {
            filename: msg.document_filename || msg.media_url || "document.pdf",
            size: msg.document_size || undefined,
            caption: msg.media_caption || undefined,
          }
        : undefined,
    locationRequest: msg.location_request_label
      ? { label: msg.location_request_label }
      : undefined,
    orderCard:
      msg.order_title || msg.order_items || msg.order_image
        ? {
            title: msg.order_title || undefined,
            items: msg.order_items || undefined,
            image: msg.order_image || undefined,
            buttonLabel: msg.order_button_label || undefined,
          }
        : undefined,
    carouselCards:
      templateType === "carousel" && Array.isArray(msg.cards)
        ? (msg.cards as any[]).map((c) => ({
            title: c.title || undefined,
            description: c.description || msg.body || undefined,
            image: c.media_url || undefined,
            button: c.button_label || undefined,
          }))
        : undefined,
    reactionEmoji: msg.reaction_emoji || undefined,
    flow:
      templateType === "flow"
        ? {
            id: msg.flow_id || undefined,
            ctaLabel: msg.flow_cta_label || "Open flow",
          }
        : undefined,
  };
});

function applyPreset(preset: (typeof WHATSAPP_PRESETS)[0]) {
  const c = campaign.value;
  const msg = normalizeWhatsAppMessage({
    ...(preset.campaign.message
      ? (preset.campaign.message as unknown as Record<string, unknown>)
      : (c.message as unknown as Record<string, unknown>)),
    template_name:
      (preset.campaign.message as any)?.template_name ??
      (preset.campaign.name as string | undefined) ??
      c.name ??
      undefined,
  });
  update({
    ...preset.campaign,
    message: msg as any,
  });
  pendingPreset.value = null;
  presetConfirmOpen.value = false;
}

function onPresetSelect(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  if (!value) return;
  const preset = availablePresets.value.find((p) => p.id === value);
  if (!preset) return;
  if (dirty.value) {
    pendingPreset.value = preset;
    presetConfirmOpen.value = true;
  } else {
    applyPreset(preset);
  }
  (e.target as HTMLSelectElement).value = "";
}

function updateName(name: string) {
  update({
    name,
    message: { ...campaign.value.message, template_name: name || undefined } as any,
    tracking: { ...(campaign.value.tracking ?? {}), campaign_name: name },
  });
}

function onWhatsAppMessageUpdate(partial: any) {
  const current = campaign.value.message as Record<string, unknown>;
  const merged = normalizeWhatsAppMessage({
    ...current,
    ...(partial ?? {}),
  });
  updateMessage(merged as any);
  if (Object.prototype.hasOwnProperty.call(partial ?? {}, "template_name")) {
    const nextName = String(partial?.template_name ?? "");
    if (nextName !== campaign.value.name) {
      update({
        name: nextName,
        tracking: {
          ...(campaign.value.tracking ?? {}),
          campaign_name: nextName,
        },
      });
    }
  }
}

watch(
  () => campaign.value.name,
  (name) => {
    const currentTemplateName = String((campaign.value.message as any).template_name ?? "");
    if ((name || "") !== currentTemplateName) {
      updateMessage({ template_name: name || undefined } as any);
    }
  },
  { immediate: true },
);

function onInsertVariable(payload: {
  variable: string;
  field: "title" | "body" | "footer";
}) {
  const token = ` {{ .${payload.variable} }}`;
  const existingVars = campaign.value.message.variables ?? [];
  const nextVars = Array.from(new Set([...existingVars, payload.variable]));
  if (payload.field === "title") {
    const currentHeader = (campaign.value.message as any).header ?? "";
    updateMessage({
      variables: nextVars,
      header: currentHeader + token,
    } as any);
  } else if (payload.field === "footer") {
    const currentFooter = (campaign.value.message as any).footer ?? "";
    updateMessage({
      variables: nextVars,
      footer: currentFooter + token,
    } as any);
  } else {
    const currentBody = (campaign.value.message as any).body ?? "";
    updateMessage({
      variables: nextVars,
      body: currentBody + token,
    } as any);
  }
}

function onSave() {
  if (!isValid.value) return;
  const mapped = toGupshupWhatsAppTemplate(campaign.value, {
    exampleData: previewProfile.value?.data,
  });
  const hostCampaign = withGupshupMessage(campaign.value);
  emit("save-gupshup-template", mapped.payload, mapped.warnings, hostCampaign);
  emit("save", hostCampaign);
}
</script>

<template>
  <div class="keos-whatsapp-builder">
    <div class="kb-builder-top">
      <BuilderHeader
        :campaign-name="campaign.name"
        :status="campaign.status"
        :dirty="dirty"
        :last-saved-at="lastSavedAt"
        :can-undo="canUndo"
        :can-redo="canRedo"
        :slugify-name="props.enforceSlugName"
        @update:campaign-name="updateName"
        @undo="undo"
        @redo="redo"
      />

      <div
        v-if="blockingErrors.length > 0"
        class="kb-errors"
        :style="{
          background: colors.dangerBg,
          border: `1px solid ${colors.dangerBorder}`,
          borderRadius: `${radius.input}px`,
          padding: `${spacing[12]}px ${spacing[16]}px`,
          marginBottom: `${spacing[16]}px`,
        }"
      >
        <ul
          :style="{ margin: 0, paddingLeft: '1.25rem', color: colors.danger }"
        >
          <li v-for="e in blockingErrors" :key="e.message">{{ e.message }}</li>
        </ul>
      </div>
    </div>

    <div class="kb-wa-layout">
      <aside class="kb-wa-sidebar">
        <div v-if="!disabledSections.includes('whatsapp')" class="kb-wa-form">
          <div class="kb-wa-form-head">
            <div class="kb-wa-form-head-top">
              <span class="kb-wa-form-head-label">Template</span>
              <span class="kb-wa-health-pill">{{ setupStatusLabel }}</span>
            </div>
            <div class="kb-wa-form-head-row">
              <select
                class="kb-preset-select"
                aria-label="Load template preset"
                @change="onPresetSelect"
              >
                <option value="">Presets…</option>
                <option v-for="p in availablePresets" :key="p.id" :value="p.id">
                  {{ p.label }}
                </option>
              </select>
            </div>
            <div class="kb-wa-health">
              <div class="kb-wa-health-row">
                <span class="kb-wa-health-title">Setup quality</span>
                <span class="kb-wa-health-value">{{ setupScore }}%</span>
              </div>
              <div class="kb-wa-health-bar" role="presentation">
                <span class="kb-wa-health-fill" :style="{ width: `${setupScore}%` }"></span>
              </div>
            </div>
          </div>
          <SectionWhatsApp
            :message="campaign.message"
            :show-reset="true"
            :disabled-categories="disabledTemplateCategories"
            :disabled-formats="disabledTemplateFormats"
            :media-upload-url="mediaUploadUrl"
            :media-upload-headers="mediaUploadHeaders"
            @update="onWhatsAppMessageUpdate"
            @reset="resetMessage()"
          />
          <SectionPersonalization
            :message="campaign.message"
            :variable-options="variableOptions"
            :targets="['title', 'body', 'footer']"
            @update="updateMessage"
            @insert-variable="onInsertVariable"
          />
        </div>
      </aside>

      <main class="kb-wa-canvas">
        <div
          v-if="!designOnly && campaign.audience.test_mode"
          class="kb-wa-test-banner"
        >
          <span class="kb-wa-test-banner-dot"></span>
          Test mode — only your test segment will receive this.
        </div>
        <div class="kb-wa-preview-chrome">
          <div class="kb-push-preview-controls">
            <label class="kb-push-preview-as">
              <span class="kb-push-preview-as-label">Preview as</span>
              <select
                v-model="selectedPreviewProfileId"
                class="kb-preset-select"
                aria-label="Preview as profile"
              >
                <option value="">No substitution</option>
                <option
                  v-for="pr in DEFAULT_SAMPLE_PROFILES"
                  :key="pr.id"
                  :value="pr.id"
                >
                  {{ pr.label }}
                </option>
              </select>
            </label>
            <div class="kb-preview-status">
              <span class="kb-preview-status-label">Live render</span>
              <strong>{{ (campaign.message as any).template_type || "text" }}</strong>
            </div>
          </div>
          <div
            class="kb-wa-preview-frame"
            :class="{ 'kb-wa-preview-frame--empty': !hasWaPreviewContent }"
          >
            <WhatsAppTemplatePreview :template="waPreviewTemplate" />
          </div>
        </div>
      </main>
    </div>

    <footer class="kb-wa-actions">
      <div v-if="warningsList.length > 0" class="kb-actions-note">
        <strong>Warning:</strong> {{ warningsList[0]?.message }}
        <span v-if="warningsList.length > 1">
          (+{{ warningsList.length - 1 }} more)
        </span>
      </div>
      <div class="kb-wa-actions-right">
        <button
          v-if="showDuplicate"
          type="button"
          class="kb-wa-action kb-wa-action--secondary"
          @click="emit('duplicate', JSON.parse(JSON.stringify(campaign)))"
        >
          Duplicate
        </button>
        <button
          v-if="showSave"
          type="button"
          class="kb-wa-action kb-wa-action--secondary"
          @click="onSave"
        >
          Save
        </button>
        <button
          v-if="showClose"
          type="button"
          class="kb-wa-action kb-wa-action--primary"
          @click="emit('edit')"
        >
          Close
        </button>
      </div>
    </footer>

    <div
      v-if="presetConfirmOpen"
      class="kb-confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-preset-confirm-title"
    >
      <div class="kb-confirm-dialog">
        <h2 id="wa-preset-confirm-title" class="kb-confirm-title">
          Replace content?
        </h2>
        <p class="kb-confirm-text">
          Current changes will be replaced by the preset. Continue?
        </p>
        <div class="kb-confirm-actions">
          <button
            type="button"
            class="kb-wa-action kb-wa-action--secondary"
            @click="
              presetConfirmOpen = false;
              pendingPreset = null;
            "
          >
            Cancel
          </button>
          <button
            type="button"
            class="kb-wa-action kb-wa-action--primary"
            @click="pendingPreset && applyPreset(pendingPreset)"
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-wa-form-head-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.kb-wa-form-head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.kb-preset-select {
  font-size: 0.82rem;
  font-weight: 500;
  padding: 7px 12px;
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: #fff;
  color: var(--kb-text-strong);
  transition: border-color 0.16s, box-shadow 0.16s;
}
.kb-preset-select:focus {
  outline: none;
  border-color: var(--kb-brand);
  box-shadow: 0 0 0 3px rgba(30, 90, 255, 0.16);
}
.kb-push-preview-controls {
  margin-bottom: 12px;
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  background: #fff;
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
}
.kb-push-preview-as {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.kb-push-preview-as-label {
  font-size: 0.8125rem;
  color: var(--kb-text-muted);
  font-weight: 600;
  letter-spacing: 0.02em;
}
.keos-whatsapp-builder {
  --kb-bg: #ffffff;
  --kb-surface: #ffffff;
  --kb-surface-muted: #f6f9fc;
  --kb-border: #d4deea;
  --kb-border-strong: #c1cedf;
  --kb-text: #1e293b;
  --kb-text-strong: #0b1220;
  --kb-text-muted: #5e7087;
  --kb-brand: #2563eb;
  --kb-brand-soft: #e8f0ff;
  --kb-success: #0f766e;
  --kb-shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.04);
  --kb-shadow-md: 0 10px 24px rgba(15, 23, 42, 0.08);
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: var(--kb-text);
  max-width: 100%;
  box-sizing: border-box;
  background: var(--kb-bg);
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.keos-whatsapp-builder button,
.keos-whatsapp-builder input,
.keos-whatsapp-builder textarea,
.keos-whatsapp-builder select {
  font-family: inherit;
  box-sizing: border-box;
}

.kb-builder-top {
  margin-left: 26px;
  margin-right: 26px;
  flex-shrink: 0;
}

.kb-wa-layout {
  display: grid;
  background: linear-gradient(145deg, #f7fafc 0%, #eef3f8 100%);
  grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
  gap: 14px;
  flex: 1;
  min-height: 0;
  align-items: stretch;
  margin: 20px 16px 0;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #d8e1ec;
}
@media (max-width: 1360px) {
  .kb-wa-layout {
    grid-template-columns: minmax(360px, 392px) minmax(0, 1fr);
  }
}
@media (max-width: 1023px) {
  .kb-wa-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    margin: 16px 10px 0;
    padding: 8px;
    gap: 12px;
  }
}

.kb-wa-sidebar {
  background: var(--kb-surface);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  border-radius: 16px;
  border: 1px solid var(--kb-border);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
  height: 100vh;
  -webkit-overflow-scrolling: touch;
}
@media (max-width: 1023px) {
  .kb-wa-sidebar {
    order: 1;
    margin: 0;
    border-radius: 14px;
    border: 1px solid var(--kb-border);
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
    min-height: 0;
    height: auto;
  }
}

.kb-wa-form {
  padding: 20px 18px 22px;
}
@media (max-width: 1360px) {
  .kb-wa-form {
    padding: 18px 14px 20px;
  }
}
.kb-wa-form-head {
  margin-bottom: 24px;
  padding: 12px;
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}
.kb-wa-form-head-label {
  display: block;
  font-size: 0.69rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #72839a;
  margin-bottom: 10px;
}
.kb-wa-health-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  border: 1px solid #cfe0ff;
  background: #eef4ff;
  color: #1e40af;
  font-size: 0.7rem;
  font-weight: 700;
}
.kb-wa-health {
  margin-top: 10px;
}
.kb-wa-health-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}
.kb-wa-health-title {
  color: var(--kb-text-muted);
  font-weight: 600;
}
.kb-wa-health-value {
  color: var(--kb-text-strong);
  font-weight: 700;
}
.kb-wa-health-bar {
  margin-top: 6px;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #e8edf4;
  overflow: hidden;
}
.kb-wa-health-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transition: width 0.22s ease;
}

.keos-whatsapp-builder .kb-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.kb-wa-canvas {
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  min-width: 0;
  min-height: 0;
  overflow: visible;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(247, 250, 252, 0.86));
  border: 1px solid #d9e2ee;
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
}
@media (max-width: 1023px) {
  .kb-wa-canvas {
    order: -1;
    padding: 20px 14px 22px;
    gap: 16px;
  }
}

.kb-wa-test-banner {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8125rem;
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 8px;
}
.kb-wa-test-banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  animation: kb-pulse-wa 1.5s ease-in-out infinite;
}
@keyframes kb-pulse-wa {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.kb-wa-preview-chrome {
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  margin-top: 0;
}
.kb-wa-preview-frame {
  width: 100%;
  min-height: 200px;
  height: auto;
  margin: 0 auto;
  background: linear-gradient(180deg, #eef4fa, #e7eff6);
  border: 1px solid var(--kb-border);
  border-radius: 18px;
  box-shadow:
    0 18px 34px rgba(15, 23, 42, 0.11),
    0 2px 8px rgba(15, 23, 42, 0.08);
  padding: 10px;
  overflow: hidden;
  display: grid;
  place-items: center;
}
.kb-wa-preview-frame--empty {
  min-height: 200px;
}
.kb-preview-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d6e0ee;
  border-radius: 999px;
  padding: 6px 10px;
  background: #f8fbff;
}
.kb-preview-status-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  font-weight: 700;
}
.kb-preview-status strong {
  font-size: 0.75rem;
  text-transform: capitalize;
  color: #0f172a;
}

.kb-actions-note {
  font-size: 0.78rem;
  color: var(--kb-text-muted);
  max-width: 56%;
  line-height: 1.35;
}

.kb-wa-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 32px 22px;
  margin: 0;
  background: var(--kb-surface);
  border: 1px solid var(--kb-border);
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  flex-shrink: 0;
  box-shadow: var(--kb-shadow-sm);
  position: sticky;
  bottom: 0;
  z-index: 10;
}
.kb-wa-actions-right {
  display: flex;
  gap: 16px;
  margin-left: auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.kb-wa-action {
  padding: 11px 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.15s,
    transform 0.1s,
    border-color 0.15s;
}
.kb-wa-action:active {
  transform: scale(0.98);
}
.kb-wa-action--secondary {
  background: #f8fafd;
  color: #334155;
  border-color: var(--kb-border-strong);
}
.kb-wa-action--secondary:hover {
  background: #edf2f7;
  border-color: #b9c8da;
}
.kb-wa-action--primary {
  background: linear-gradient(120deg, #0f172a, #1f2937);
  color: #fff;
  box-shadow: none;
}
.kb-wa-action--primary:hover {
  background: #1e293b;
}

@media (max-width: 1023px) {
  .kb-builder-top {
    margin-left: 12px;
    margin-right: 12px;
  }
  .kb-wa-layout {
    margin-top: 16px;
  }
  .kb-push-preview-controls {
    padding: 10px;
  }
  .kb-wa-actions {
    margin: 0;
    padding: 16px 12px 18px;
    gap: 12px;
    flex-direction: column;
    align-items: stretch;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
  .kb-actions-note {
    max-width: 100%;
  }
  .kb-wa-actions-right {
    margin-left: 0;
    justify-content: stretch;
  }
  .kb-wa-action {
    flex: 1;
  }
  .kb-wa-preview-frame {
    min-height: 200px;
    padding: 8px;
  }
  .kb-preview-status {
    width: 100%;
    justify-content: space-between;
  }
}

.kb-stepper {
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.kb-stepper__item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  background: #fff;
  border: 0;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  text-align: left;
}
.kb-stepper__item:last-child {
  border-bottom: 0;
}
.kb-stepper__item--active {
  background: #eff6ff;
}
.kb-stepper__index {
  font-size: 0.75rem;
  font-weight: 600;
  width: 20px;
  text-align: center;
  color: #2563eb;
}
.kb-stepper__content {
  flex: 1;
}
.kb-stepper__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
}
.kb-stepper__description {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
}
.kb-stepper__status {
  font-size: 0.75rem;
  font-weight: 500;
  color: #b91c1c;
}
.kb-stepper__status--warning {
  color: #b45309;
}
.kb-stepper__status--ok {
  color: #15803d;
}
.kb-confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.kb-confirm-dialog {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.4);
}
.kb-confirm-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
}
.kb-confirm-text {
  margin: 0;
  font-size: 0.875rem;
  color: #475569;
}
.kb-confirm-summary {
  margin: 0 0 12px 0;
  padding-left: 1.1rem;
  font-size: 0.875rem;
  color: #0f172a;
}
.kb-confirm-summary li {
  margin-bottom: 4px;
}
.kb-confirm-errors,
.kb-confirm-warnings {
  margin-bottom: 12px;
  font-size: 0.8125rem;
}
.kb-confirm-errors strong {
  color: #b91c1c;
}
.kb-confirm-warnings strong {
  color: #b45309;
}
.kb-confirm-errors ul,
.kb-confirm-warnings ul {
  margin: 4px 0 0 1rem;
  padding: 0;
}
.kb-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
