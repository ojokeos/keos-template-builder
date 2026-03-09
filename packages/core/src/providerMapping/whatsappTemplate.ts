import type { Campaign } from '../types.js';
import type { ProviderMappingResult } from './types.js';

type MetaTemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
type MetaHeaderFormat = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';

interface MetaBodyExample {
  body_text?: string[][];
}

interface MetaHeaderExample {
  header_text?: string[];
}

type MetaTemplateComponent =
  | {
      type: 'HEADER';
      format: MetaHeaderFormat;
      text?: string;
      example?: MetaHeaderExample;
    }
  | {
      type: 'BODY';
      text: string;
      example?: MetaBodyExample;
    }
  | {
      type: 'FOOTER';
      text: string;
    }
  | { type: 'BUTTONS'; buttons: MetaButton[] };

type MetaButton =
  | { type: 'QUICK_REPLY'; text: string }
  | { type: 'URL'; text: string; url?: string; example?: string[] }
  | { type: 'PHONE_NUMBER'; text: string; phone_number?: string }
  | { type: 'COPY_CODE'; text: string; example?: string }
  | {
      type: 'OTP';
      text: string;
      otp_type?: 'COPY_CODE' | 'ONE_TAP';
      autofill_text?: string;
      package_name?: string;
      signature_hash?: string;
    };

type GupshupButton =
  | { type: 'QUICK_REPLY'; title: string }
  | { type: 'URL'; title: string; url?: string; example?: string[] }
  | { type: 'PHONE_NUMBER'; title: string; phoneNumber?: string }
  | { type: 'OPT_OUT'; title: string }
  | { type: 'COPY_CODE'; title: string; example?: string }
  | {
      type: 'OTP';
      title: string;
      otp_type: 'COPY_CODE' | 'ONE_TAP';
      autofill_text?: string;
      package_name?: string;
      signature_hash?: string;
    };

export interface MetaWhatsAppTemplateCreatePayload {
  name: string;
  category: MetaTemplateCategory;
  language: string;
  components: MetaTemplateComponent[];
}

export interface GupshupWhatsAppTemplateCreatePayload {
  elementName: string;
  languageCode: string;
  category: MetaTemplateCategory;
  templateType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'CAROUSEL';
  content: string;
  /** Use-case label shown during Meta review (e.g. "Order Updates", "Promotions"). Required by Gupshup. */
  vertical?: string;
  /** Body text with placeholders filled with real sample values. Required for Meta approval. */
  example?: string;
  /** Media handle ID from Gupshup media upload. Required for IMAGE/VIDEO/DOCUMENT templates. */
  exampleMedia?: string;
  header?: string;
  footer?: string;
  buttons?: GupshupButton[];
  /** Include sample data in Meta review submission. */
  enableSample?: boolean;
  /** Allow Meta to change the template category during review. */
  allowTemplateCategoryChange?: boolean;
  /** Add OTP security recommendation text (AUTHENTICATION templates only). */
  addSecurityRecommendation?: boolean;
  /** OTP code expiry time in minutes (AUTHENTICATION templates only). */
  codeExpirationMinutes?: number;
  /** For providers/accounts that accept Meta-style structure via Gupshup */
  metaTemplate: MetaWhatsAppTemplateCreatePayload;
  /** Explicit Meta payload mirror for downstream integrations. */
  metaWhatsApp?: MetaWhatsAppTemplateCreatePayload;
  /** Best-effort pass-through of advanced builder data not universally standardized. */
  advanced?: Record<string, unknown>;
}

interface PlaceholderTransformResult {
  text: string;
  varOrder: string[];
}

interface SerializeOptions {
  /**
   * Optional sample values used to generate BODY/HEADER examples in the same
   * index order as transformed placeholders.
   */
  exampleData?: Record<string, string>;
}

function toProviderCategory(raw: unknown): MetaTemplateCategory {
  const value = String(raw ?? '').trim().toLowerCase();
  if (value === 'authentication') return 'AUTHENTICATION';
  if (value === 'utility') return 'UTILITY';
  return 'MARKETING';
}

function normalizeTemplateName(rawName: unknown, fallback = 'template_message'): string {
  const source = String(rawName ?? '').trim();
  const name = source || fallback;
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 512) || fallback;
}

function inferHeaderFormat(msg: Record<string, unknown>): MetaHeaderFormat | null {
  const headerType = String(msg.header_type ?? '').trim().toLowerCase();
  if (headerType === 'image') return 'IMAGE';
  if (headerType === 'video') return 'VIDEO';
  if (headerType === 'document') return 'DOCUMENT';
  if (headerType === 'text') return 'TEXT';

  const templateType = String(msg.template_type ?? '').trim().toLowerCase();
  if (templateType === 'image') return 'IMAGE';
  if (templateType === 'video') return 'VIDEO';
  if (templateType === 'document') return 'DOCUMENT';
  return null;
}

function transformGoPlaceholdersToPositional(
  input: string,
  existingOrder: string[] = [],
): PlaceholderTransformResult {
  if (!input) return { text: '', varOrder: [...existingOrder] };
  const varOrder = [...existingOrder];
  const indexMap = new Map<string, number>();
  varOrder.forEach((v, i) => indexMap.set(v, i + 1));

  const text = input.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (_m, key: string) => {
    if (!indexMap.has(key)) {
      indexMap.set(key, varOrder.length + 1);
      varOrder.push(key);
    }
    return `{{${indexMap.get(key)}}}`;
  });
  return { text, varOrder };
}

function exampleValues(varOrder: string[], sample?: Record<string, string>): string[] {
  return varOrder.map((v) => {
    const found = sample?.[v];
    if (typeof found === 'string' && found.length > 0) return found;
    return `sample_${v}`;
  });
}

/**
 * Attempts to extract per-variable example values by matching a filled example
 * string against a positional body template (e.g. "Hi {{1}}, order {{2}}").
 * Returns a partial map of varName → real value; empty object on failure.
 */
function deriveExampleDataFromPositional(
  positionalBody: string,
  exampleText: string,
  varOrder: string[],
): Record<string, string> {
  if (!positionalBody || !exampleText || varOrder.length === 0) return {};
  try {
    // Split on {{N}} tokens, escape literal segments, rejoin with capture groups.
    const parts = positionalBody.split(/\{\{\d+\}\}/);
    const regexStr = parts
      .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('(.+?)');
    const regex = new RegExp(`^${regexStr}$`, 's');
    const match = exampleText.match(regex);
    if (!match) return {};
    const result: Record<string, string> = {};
    varOrder.forEach((varName, idx) => {
      const captured = match[idx + 1];
      if (captured) result[varName] = captured.trim();
    });
    return result;
  } catch {
    return {};
  }
}

function mapButtonsToMeta(
  buttonsRaw: unknown[],
  varOrderSeed: string[],
): { buttons: MetaButton[]; varOrder: string[]; warnings: string[] } {
  const warnings: string[] = [];
  let varOrder = [...varOrderSeed];

  const mapped = buttonsRaw
    .slice(0, 10)
    .map((b): MetaButton | null => {
      const btn = b as Record<string, unknown>;
      const type = String(btn.type ?? 'quick_reply').trim().toLowerCase();
      const text = String(btn.label ?? '').trim() || 'Button';
      if (type === 'url') {
        const transformed = transformGoPlaceholdersToPositional(String(btn.url ?? ''), varOrder);
        varOrder = transformed.varOrder;
        const urlExample = String(btn.url_example ?? '').trim() || undefined;
        return {
          type: 'URL' as const,
          text,
          url: transformed.text || undefined,
          ...(urlExample ? { example: [urlExample] } : {}),
        };
      }
      if (type === 'call') {
        return {
          type: 'PHONE_NUMBER' as const,
          text,
          phone_number: String(btn.phone ?? '').trim() || undefined,
        };
      }
      if (type === 'copy_code') {
        const example = String(btn.example ?? '').trim() || undefined;
        return { type: 'COPY_CODE' as const, text, ...(example ? { example } : {}) };
      }
      if (type === 'otp') {
        const otpType = String(btn.otp_type ?? 'COPY_CODE').toUpperCase() as 'COPY_CODE' | 'ONE_TAP';
        return {
          type: 'OTP' as const,
          text,
          otp_type: otpType,
          ...(String(btn.autofill_text ?? '').trim() ? { autofill_text: String(btn.autofill_text).trim() } : {}),
          ...(String(btn.package_name ?? '').trim() ? { package_name: String(btn.package_name).trim() } : {}),
          ...(String(btn.signature_hash ?? '').trim() ? { signature_hash: String(btn.signature_hash).trim() } : {}),
        };
      }
      if (type === 'opt_out') {
        // Meta has no OPT_OUT type; use QUICK_REPLY as the closest equivalent in the meta payload.
        return { type: 'QUICK_REPLY' as const, text };
      }
      return { type: 'QUICK_REPLY' as const, text };
    })
    .filter((b): b is MetaButton => Boolean(b?.text));

  return { buttons: mapped, varOrder, warnings };
}

function mapButtonsToGupshupCanonical(buttonsRaw: unknown[]): GupshupButton[] {
  return buttonsRaw
    .slice(0, 10)
    .map((b) => {
      const btn = b as Record<string, unknown>;
      const type = String(btn.type ?? 'quick_reply').trim().toLowerCase();
      const title = String(btn.label ?? '').trim() || 'Button';
      if (type === 'url') {
        const url = String(btn.url ?? '').trim() || undefined;
        const urlExample = String(btn.url_example ?? '').trim() || undefined;
        return {
          type: 'URL' as const,
          title,
          ...(url ? { url } : {}),
          ...(urlExample ? { example: [urlExample] } : {}),
        };
      }
      if (type === 'call') {
        return {
          type: 'PHONE_NUMBER' as const,
          title,
          ...(String(btn.phone ?? '').trim() ? { phoneNumber: String(btn.phone).trim() } : {}),
        };
      }
      if (type === 'opt_out') {
        return { type: 'OPT_OUT' as const, title };
      }
      if (type === 'copy_code') {
        return {
          type: 'COPY_CODE' as const,
          title,
          ...(String(btn.example ?? '').trim() ? { example: String(btn.example).trim() } : {}),
        };
      }
      if (type === 'otp') {
        const otpType = String(btn.otp_type ?? 'COPY_CODE').toUpperCase() as 'COPY_CODE' | 'ONE_TAP';
        return {
          type: 'OTP' as const,
          title,
          otp_type: otpType,
          ...(String(btn.autofill_text ?? '').trim() ? { autofill_text: String(btn.autofill_text).trim() } : {}),
          ...(String(btn.package_name ?? '').trim() ? { package_name: String(btn.package_name).trim() } : {}),
          ...(String(btn.signature_hash ?? '').trim() ? { signature_hash: String(btn.signature_hash).trim() } : {}),
        };
      }
      return { type: 'QUICK_REPLY' as const, title };
    })
    .filter((b) => Boolean(b.title));
}

function collectAdvancedFields(msg: Record<string, unknown>): Record<string, unknown> | undefined {
  const advanced: Record<string, unknown> = {};
  const keys = [
    'flow_id',
    'flow_cta_label',
    'lto_expiry',
    'products',
    'cards',
    'auth_type',
    'auth_label',
    'auth_code',
    'document_filename',
    'media_url',
    'media_handle',
    'media_caption',
    'coupon_code',
  ];
  for (const key of keys) {
    if (msg[key] !== undefined && msg[key] !== null && msg[key] !== '') {
      advanced[key] = msg[key];
    }
  }
  return Object.keys(advanced).length ? advanced : undefined;
}

export function toMetaWhatsAppTemplate(
  campaign: Campaign,
  options: SerializeOptions = {},
): ProviderMappingResult<MetaWhatsAppTemplateCreatePayload> {
  const warnings: string[] = [];
  const msg = campaign.message as unknown as Record<string, unknown>;
  const components: MetaTemplateComponent[] = [];

  const name = normalizeTemplateName(msg.template_name ?? campaign.name, campaign.name || 'template_message');
  const category = toProviderCategory(msg.template_category);
  const language = String(msg.template_language ?? 'en_US').trim() || 'en_US';

  let globalVarOrder: string[] = [];

  // Pre-compute body positional form so we can derive example values from
  // template_example before building components (used for both body and header).
  const bodyRawEarly = String(msg.body ?? '').trim();
  const bodyTransformedEarly = transformGoPlaceholdersToPositional(bodyRawEarly, []);
  const templateExampleText = String(msg.template_example ?? '').trim();
  const derivedExampleData: Record<string, string> =
    !options.exampleData && templateExampleText
      ? deriveExampleDataFromPositional(
          bodyTransformedEarly.text,
          templateExampleText,
          bodyTransformedEarly.varOrder,
        )
      : {};
  const resolvedExampleData: Record<string, string> | undefined =
    options.exampleData ?? (Object.keys(derivedExampleData).length ? derivedExampleData : undefined);

  const headerFormat = inferHeaderFormat(msg);
  const headerTextRaw = String(msg.header ?? '').trim();
  if (headerFormat === 'TEXT' && headerTextRaw) {
    const transformed = transformGoPlaceholdersToPositional(headerTextRaw, globalVarOrder);
    globalVarOrder = transformed.varOrder;
    const headerExamples = exampleValues(globalVarOrder, resolvedExampleData);
    components.push({
      type: 'HEADER',
      format: 'TEXT',
      text: transformed.text,
      ...(headerExamples.length ? { example: { header_text: headerExamples } } : {}),
    });
  } else if (headerFormat && headerFormat !== 'TEXT') {
    components.push({ type: 'HEADER', format: headerFormat });
    if (!msg.media_url) {
      warnings.push(`Header format ${headerFormat} selected but media_url is empty.`);
    }
  }

  const bodyRaw = String(msg.body ?? '').trim();
  const bodyTransformed = transformGoPlaceholdersToPositional(bodyRaw, globalVarOrder);
  globalVarOrder = bodyTransformed.varOrder;
  const bodyExample = exampleValues(globalVarOrder, resolvedExampleData);
  components.push({
    type: 'BODY',
    text: bodyTransformed.text,
    ...(bodyExample.length ? { example: { body_text: [bodyExample] } } : {}),
  });

  const footerRaw = String(msg.footer ?? '').trim();
  if (footerRaw) {
    const footerTransformed = transformGoPlaceholdersToPositional(footerRaw, globalVarOrder);
    globalVarOrder = footerTransformed.varOrder;
    components.push({
      type: 'FOOTER',
      text: footerTransformed.text,
    });
  }

  const buttonsRaw = Array.isArray(msg.buttons) ? (msg.buttons as unknown[]) : [];
  if (buttonsRaw.length) {
    const mapped = mapButtonsToMeta(buttonsRaw, globalVarOrder);
    globalVarOrder = mapped.varOrder;
    warnings.push(...mapped.warnings);
    if (mapped.buttons.length) components.push({ type: 'BUTTONS', buttons: mapped.buttons });
  }

  const templateType = String(msg.template_type ?? 'text').trim().toLowerCase();
  if (['catalog', 'mpm', 'carousel', 'flow', 'lto', 'auth'].includes(templateType)) {
    warnings.push(
      `template_type="${templateType}" has provider-specific requirements; verify advanced payload fields before submission.`,
    );
  }

  return {
    payload: {
      name,
      category,
      language,
      components,
    },
    warnings,
  };
}

/** Button types permitted per category — enforced at payload-build time. */
const ALLOWED_BUTTON_TYPES_BY_CATEGORY: Record<string, Set<string>> = {
  MARKETING:      new Set(['quick_reply', 'url', 'call', 'copy_code', 'opt_out']),
  UTILITY:        new Set(['quick_reply', 'url', 'call']),
  AUTHENTICATION: new Set(['otp']),
};

export function toGupshupWhatsAppTemplate(
  campaign: Campaign,
  options: SerializeOptions = {},
): ProviderMappingResult<GupshupWhatsAppTemplateCreatePayload> {
  const meta = toMetaWhatsAppTemplate(campaign, options);
  const msg = campaign.message as unknown as Record<string, unknown>;
  const warnings = [...meta.warnings];

  // ── Category enforcement ───────────────────────────────────────────────────
  // Enforce at payload-build time regardless of what the UI allowed through.
  const resolvedCategory = meta.payload.category; // 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
  const isAuth = resolvedCategory === 'AUTHENTICATION';
  const allowedBtnTypes = ALLOWED_BUTTON_TYPES_BY_CATEGORY[resolvedCategory] ?? ALLOWED_BUTTON_TYPES_BY_CATEGORY.MARKETING;

  const allButtonsRaw = Array.isArray(msg.buttons) ? (msg.buttons as unknown[]) : [];
  const buttonsRaw = allButtonsRaw.filter((b) => {
    const t = String((b as Record<string, unknown>).type ?? 'quick_reply').trim().toLowerCase();
    if (!allowedBtnTypes.has(t)) {
      warnings.push(`Button type "${t}" is not allowed for ${resolvedCategory}; removed from payload.`);
      return false;
    }
    return true;
  });
  // Authentication allows at most 1 button.
  const maxBtns = isAuth ? 1 : 10;
  if (buttonsRaw.length > maxBtns) {
    warnings.push(`${resolvedCategory} allows at most ${maxBtns} button(s); extra buttons removed.`);
  }
  const filteredButtonsRaw = buttonsRaw.slice(0, maxBtns);
  const gupshupButtons = mapButtonsToGupshupCanonical(filteredButtonsRaw);

  // Rebuild meta template with the filtered buttons so the embedded payload is consistent.
  const metaComponents = meta.payload.components.filter((c) => {
    if (isAuth && c.type === 'HEADER') return false;
    if (isAuth && c.type === 'FOOTER') return false;
    return true;
  });
  if (filteredButtonsRaw.length) {
    // Replace the BUTTONS component with one built from the filtered set.
    const btnIdx = metaComponents.findIndex((c) => c.type === 'BUTTONS');
    const { buttons: metaBtns, varOrder } = mapButtonsToMeta(filteredButtonsRaw, []);
    void varOrder; // used internally
    const buttonsComponent: MetaTemplateComponent = { type: 'BUTTONS', buttons: metaBtns };
    if (btnIdx >= 0) metaComponents[btnIdx] = buttonsComponent;
    else if (metaBtns.length) metaComponents.push(buttonsComponent);
  } else {
    // Remove buttons component if no buttons remain.
    const btnIdx = metaComponents.findIndex((c) => c.type === 'BUTTONS');
    if (btnIdx >= 0) metaComponents.splice(btnIdx, 1);
  }
  const cleanMetaPayload: MetaWhatsAppTemplateCreatePayload = { ...meta.payload, components: metaComponents };
  // ── End enforcement ────────────────────────────────────────────────────────

  const header = metaComponents.find((c) => c.type === 'HEADER') as
    | Extract<MetaTemplateComponent, { type: 'HEADER' }>
    | undefined;
  const body = metaComponents.find((c) => c.type === 'BODY') as
    | Extract<MetaTemplateComponent, { type: 'BODY' }>
    | undefined;
  const footer = metaComponents.find((c) => c.type === 'FOOTER') as
    | Extract<MetaTemplateComponent, { type: 'FOOTER' }>
    | undefined;

  const bodyRaw = String(msg.body ?? '').trim();
  const headerRaw = String(msg.header ?? '').trim();
  const footerRaw = String(msg.footer ?? '').trim();

  const templateType = (() => {
    const v = String(msg.template_type ?? '').trim().toLowerCase();
    if (v === 'image') return 'IMAGE' as const;
    if (v === 'video') return 'VIDEO' as const;
    if (v === 'document') return 'DOCUMENT' as const;
    if (v === 'carousel') return 'CAROUSEL' as const;
    return 'TEXT' as const;
  })();

  const vertical = String(msg.vertical ?? '').trim() || undefined;
  const templateExample = String(msg.template_example ?? '').trim() || undefined;
  const mediaHandle = String(msg.media_handle ?? '').trim() || undefined;
  const enableSample = typeof msg.enable_sample === 'boolean' ? msg.enable_sample : undefined;
  const allowCategoryChange = !isAuth && typeof msg.allow_category_change === 'boolean' ? msg.allow_category_change : undefined;
  const addSecurityRec = typeof msg.add_security_recommendation === 'boolean' ? msg.add_security_recommendation : undefined;
  const codeExpiry = typeof msg.code_expiration_minutes === 'number' ? msg.code_expiration_minutes : undefined;

  const payload: GupshupWhatsAppTemplateCreatePayload = {
    elementName: cleanMetaPayload.name,
    languageCode: cleanMetaPayload.language,
    category: cleanMetaPayload.category,
    templateType,
    content: bodyRaw || body?.text || '',
    ...(vertical ? { vertical } : {}),
    ...(templateExample ? { example: templateExample } : {}),
    ...(mediaHandle ? { exampleMedia: mediaHandle } : {}),
    // Header and footer are forbidden for AUTHENTICATION templates.
    ...(!isAuth && header?.format === 'TEXT' && (headerRaw || header.text)
      ? { header: headerRaw || header.text }
      : {}),
    ...(!isAuth && (footerRaw || footer?.text) ? { footer: footerRaw || footer?.text } : {}),
    ...(gupshupButtons.length ? { buttons: gupshupButtons } : {}),
    ...(enableSample !== undefined ? { enableSample } : {}),
    // allowTemplateCategoryChange is forbidden for AUTHENTICATION templates.
    ...(allowCategoryChange !== undefined ? { allowTemplateCategoryChange: allowCategoryChange } : {}),
    ...(addSecurityRec !== undefined ? { addSecurityRecommendation: addSecurityRec } : {}),
    ...(codeExpiry !== undefined ? { codeExpirationMinutes: codeExpiry } : {}),
    metaTemplate: cleanMetaPayload,
    metaWhatsApp: cleanMetaPayload,
    ...(collectAdvancedFields(msg) ? { advanced: collectAdvancedFields(msg) } : {}),
  };

  return { payload, warnings };
}
