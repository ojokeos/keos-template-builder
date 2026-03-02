<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import { spacing, colors, radius } from '@keos/notification-builder-ui-tokens';
import { useCampaignState } from './composables/useCampaignState';
import { useAutosave } from './composables/useAutosave';
import BuilderHeader from './BuilderHeader.vue';
import SectionTemplateType from './sections/SectionTemplateType.vue';
import SectionEmail from './sections/SectionEmail.vue';
import { EMAIL_PRESETS } from './config/presets';
import { DEFAULT_SAMPLE_PROFILES, renderTemplatePreview } from './utils/renderTemplatePreview';

/** Compile blocks to HTML for preview (and optional send). */
function emailBlocksToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
  }
  const escape = (s: string) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const LAYOUT_BLOCKS = ['heading', 'paragraph', 'image', 'button', 'divider', 'spacer', 'footer', 'quote', 'list', 'social', 'video', 'link_list'] as const;
  const wrapLayout = (html: string, block: any) => {
    if (!LAYOUT_BLOCKS.includes(block.type)) return html;
    const align = block.alignment || 'left';
    const fullW = !!block.fullWidth;
    return `<div style="text-align:${align};${fullW ? 'width:100%;' : ''}">${html}</div>`;
  };
  const parts: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case 'heading': {
        const level = Math.min(3, Math.max(1, Number(b.level) || 1));
        const content = escape(b.content || '').replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        parts.push(wrapLayout(`<h${level} style="margin:0 0 12px;font-size:${level === 1 ? '22' : level === 2 ? '18' : '16'}px;font-weight:600;line-height:1.3;color:#0f172a;">${content || 'Heading'}</h${level}>`, b));
        break;
      }
      case 'paragraph': {
        const content = escape(b.content || '').replace(/\n/g, '<br/>').replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        parts.push(wrapLayout(`<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${content || 'Paragraph'}</p>`, b));
        break;
      }
      case 'image': {
        const src = (b.src || '').trim();
        const alt = escape(b.alt || '');
        const linkUrl = (b.linkUrl || '').trim();
        const fullW = !!b.fullWidth;
        const imgStyle = fullW ? 'width:100%;max-width:100%;height:auto;display:block;border:0;' : 'max-width:100%;height:auto;display:block;border:0;';
        const img = src
          ? `<img src="${escape(src)}" alt="${alt}" style="${imgStyle}" />`
          : `<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>`;
        parts.push(
          wrapLayout(`<div style="margin:0 0 12px;">${linkUrl ? `<a href="${escape(linkUrl)}" style="color:#2563eb;">${img}</a>` : img}</div>`, b)
        );
        break;
      }
      case 'button': {
        const text = escape(b.text || 'Button');
        const url = (b.url || '#').trim();
        const radius = Math.min(24, Math.max(0, Number(b.borderRadius) ?? 8));
        const fullWidth = !!b.fullWidth;
        const ghost = !!b.ghost;
        const bg = ghost ? 'transparent' : '#0f172a';
        const color = ghost ? '#0f172a' : '#fff';
        const border = ghost ? '2px solid #0f172a' : 'none';
        const display = fullWidth ? 'block' : 'inline-block';
        const width = fullWidth ? '100%' : 'auto';
        parts.push(
          wrapLayout(`<p style="margin:0 0 12px;"><a href="${escape(url)}" style="display:${display};width:${width};text-align:center;padding:12px 24px;background:${bg};color:${color};border:${border};text-decoration:none;font-size:14px;font-weight:600;border-radius:${radius}px;">${text}</a></p>`, b)
        );
        break;
      }
      case 'divider': {
        const thickness = Math.min(8, Math.max(1, Number(b.thickness) || 1));
        const color = (b.color || '#e2e8f0').trim() || '#e2e8f0';
        const lineStyle = b.lineStyle || 'solid';
        parts.push(
          wrapLayout(`<hr style="margin:16px 0;border:0;border-top:${thickness}px ${lineStyle} ${color};" />`, b)
        );
        break;
      }
      case 'spacer': {
        const h = Math.min(120, Math.max(8, Number(b.height) || 24));
        parts.push(wrapLayout(`<div style="height:${h}px;"></div>`, b));
        break;
      }
      case 'footer': {
        const content = escape(b.content || '').replace(/\n/g, '<br/>').replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        const unsub = (b.unsubscribeUrl || '').trim();
        const addr = escape(b.companyAddress || '');
        parts.push(
          wrapLayout(
            `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${content || 'Footer'}` +
              (unsub ? `<p style="margin:8px 0 0;"><a href="${escape(unsub)}" style="color:#2563eb;">Unsubscribe</a></p>` : '') +
              (addr ? `<p style="margin:4px 0 0;">${addr}</p>` : '') +
              `</div>`,
            b
          )
        );
        break;
      }
      case 'list': {
        const style = b.style === 'numbered' ? 'ol' : 'ul';
        const items = Array.isArray(b.items) ? b.items : [];
        const lis = items
          .map(
            (item: string) =>
              `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${escape(String(item)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
          )
          .join('');
        parts.push(wrapLayout(`<${style} style="margin:0 0 12px;padding-left:24px;">${lis || '<li>Item</li>'}</${style}>`, b));
        break;
      }
      case 'quote': {
        const content = escape(b.content || '').replace(/\n/g, '<br/>').replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        const styleMap: Record<string, string> = {
          default: 'border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;',
          info: 'border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;',
          success: 'border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;',
          warning: 'border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;',
        };
        const qStyle = styleMap[b.style || 'default'] || styleMap.default;
        parts.push(
          wrapLayout(
            `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${qStyle}font-size:14px;line-height:1.6;">${content || 'Quote'}</div>`,
            b
          )
        );
        break;
      }
      case 'social': {
        const links = Array.isArray(b.links) ? b.links : [];
        const validLinks = links.filter((l: any) => (l.url || '').trim());
        if (validLinks.length === 0) {
          parts.push(
            wrapLayout('<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>', b)
          );
        } else {
          const anchor = (l: any) =>
            `<a href="${escape((l.url || '').trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${escape(l.platform || 'Link')}</a>`;
          parts.push(wrapLayout(`<div style="margin:0 0 12px;">${validLinks.map(anchor).join('')}</div>`, b));
        }
        break;
      }
      case 'video': {
        const thumb = (b.thumbnailUrl || '').trim();
        const videoUrl = (b.videoUrl || '#').trim();
        const caption = escape(b.caption || '');
        const fullW = !!b.fullWidth;
        const vidStyle = fullW ? 'width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;' : 'max-width:100%;height:auto;display:block;border:0;border-radius:8px;';
        const img = thumb
          ? `<img src="${escape(thumb)}" alt="Video" style="${vidStyle}" />`
          : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
        parts.push(
          wrapLayout(
            `<div style="margin:0 0 12px;">` +
              `<a href="${escape(videoUrl)}" style="display:block;color:inherit;">${img}</a>` +
              (caption ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${caption}</p>` : '') +
              `</div>`,
            b
          )
        );
        break;
      }
      case 'link_list': {
        const linkItems = Array.isArray(b.links) ? b.links : [];
        const sep = escape((b.separator || ' | ') as string);
        const valid = linkItems.filter((l: any) => (l.text || l.url) && (l.url || '').trim());
        const linkParts = valid.map(
          (l: any) => `<a href="${escape((l.url || '#').trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${escape(l.text || 'Link')}</a>`
        );
        parts.push(
          wrapLayout(`<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${linkParts.join(sep)}</p>`, b)
        );
        break;
      }
      case 'columns': {
        const left = escape(b.leftContent || '')
          .replace(/\n/g, '<br/>')
          .replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        const right = escape(b.rightContent || '')
          .replace(/\n/g, '<br/>')
          .replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        parts.push(
          `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;">` +
            `<tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${left || 'Left'}</td>` +
            `<td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${right || 'Right'}</td></tr></table>`
        );
        break;
      }
      case 'row': {
        const colCount = Math.min(4, Math.max(1, Number(b.columnCount) || 2));
        const cells = Array.isArray(b.cells) ? b.cells.slice(0, colCount) : [];
        const pct = 100 / colCount;
        const cellHtml = Array.from({ length: colCount }, (_, i) => {
          const raw = cells[i] ?? '';
          const content = escape(raw)
            .replace(/\n/g, '<br/>')
            .replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
          return `<td width="${pct}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${content || '—'}</td>`;
        }).join('');
        parts.push(
          `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${cellHtml}</tr></table>`
        );
        break;
      }
      case 'navbar': {
        const navLinks = Array.isArray(b.links) ? b.links : [];
        const navSep = escape((b.separator || ' | ') as string);
        const navValid = navLinks.filter((l: any) => (l.text || l.url) && (l.url || '').trim());
        const navParts = navValid.map(
          (l: any) => `<a href="${escape((l.url || '#').trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${escape(l.text || 'Link')}</a>`
        );
        parts.push(
          `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${navParts.length ? navParts.join(navSep) : 'View in browser · Unsubscribe'}</div>`
        );
        break;
      }
      case 'accordion': {
        const accItems = Array.isArray(b.items) ? b.items : [];
        const accHtml = accItems
          .map((item: any) => {
            const title = escape(item.title || 'Section');
            const content = escape(item.content || '')
              .replace(/\n/g, '<br/>')
              .replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">` +
              `<summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${title}</summary>` +
              `<div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${content}</div></details>`;
          })
          .join('');
        parts.push(accHtml ? `<div style="margin:0 0 12px;">${accHtml}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>');
        break;
      }
      case 'carousel': {
        const slides = Array.isArray(b.slides) ? b.slides : [];
        const carouselSlides = slides.filter((s: any) => (s.imageUrl || '').trim());
        if (carouselSlides.length === 0) {
          parts.push('<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>');
        } else {
          const first = carouselSlides[0];
          const img = `<img src="${escape(first.imageUrl)}" alt="${escape(first.alt || 'Slide')}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`;
          const link = (first.linkUrl || '').trim();
          parts.push(
            `<div style="margin:0 0 12px;">${link ? `<a href="${escape(link)}">${img}</a>` : img}` +
              (carouselSlides.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${carouselSlides.length - 1} more slide(s)</p>` : '') +
              `</div>`
          );
        }
        break;
      }
      case 'countdown': {
        const label = escape(b.label || 'Offer ends in');
        const endStr = b.endDateTime ? new Date(b.endDateTime).toLocaleString() : '—';
        parts.push(
          `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;">` +
            `<p style="margin:0 0 8px;font-size:12px;color:#64748b;">${label}</p>` +
            `<p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${endStr}</p>` +
            `<p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
        );
        break;
      }
      case 'product_card': {
        const imgUrl = (b.imageUrl || '').trim();
        const title = escape(b.title || 'Product');
        const price = escape(b.price || '');
        const btnText = escape(b.buttonText || 'Buy now');
        const btnUrl = (b.buttonUrl || '#').trim();
        const img = imgUrl
          ? `<img src="${escape(imgUrl)}" alt="${escape(b.alt || title)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />`
          : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
        parts.push(
          `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">` +
            `<div style="margin:0 0 12px;">${img}</div>` +
            `<div style="padding:0 12px 12px;">` +
            `<p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${title}</p>` +
            (price ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${price}</p>` : '') +
            `<a href="${escape(btnUrl)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${btnText}</a>` +
            `</div></div>`
        );
        break;
      }
      case 'liquid': {
        const code = escape((b.content || '').trim());
        parts.push(
          `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${code || 'Liquid / conditional block — rendered at send'}</div>`
        );
        break;
      }
      case 'code_block': {
        const codeContent = (b.content || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/\n/g, '<br/>')
          .replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
        const caption = escape((b.caption || '').trim());
        parts.push(
          `<div style="margin:0 0 12px;">` +
            (caption ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${caption}</p>` : '') +
            `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${codeContent || 'Code snippet'}</div>` +
            `</div>`
        );
        break;
      }
      case 'rss_feed': {
        const feedUrl = (b.feedUrl || '').trim();
        const maxItems = Math.min(20, Math.max(1, Number(b.maxItems) ?? 5));
        parts.push(
          `<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;">` +
            `<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>` +
            (feedUrl ? `<p style="margin:0;font-size:12px;color:#64748b;">${escape(feedUrl)} · max ${maxItems} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') +
            `</div>`
        );
        break;
      }
      case 'dynamic_image': {
        const dynUrl = (b.imageUrl || '').trim();
        const fallback = (b.fallbackUrl || '').trim();
        const alt = escape(b.alt || 'Dynamic image');
        if (dynUrl) {
          parts.push(
            `<div style="margin:0 0 12px;">` +
              `<img src="${escape(dynUrl)}" alt="${alt}" style="max-width:100%;height:auto;display:block;border:0;" />` +
              (fallback ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${escape(fallback)}</p>` : '') +
              `</div>`
          );
        } else {
          parts.push(
            '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
          );
        }
        break;
      }
      default:
        break;
    }
  }
  return parts.join('');
}

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<Campaign>;
    hooks?: BuilderExtensionHooks;
    disabledSections?: string[];
    variableOptions?: string[];
    /** Footer button visibility controls */
    showSave?: boolean;
    showClose?: boolean;
    showDuplicate?: boolean;
    /**
     * Optional helper text shown on the left side of the action bar.
     */
    actionsNote?: string;
    /**
     * When true (default), builder is design-only: template content + preview.
     * Audience and send options are configured on another page.
     */
    designOnly?: boolean;
  }>(),
  {
    disabledSections: () => [],
    variableOptions: () => [],
    showSave: true,
    showClose: true,
    showDuplicate: true,
    actionsNote: '',
    designOnly: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [campaign: Campaign];
  change: [campaign: Campaign];
  save: [campaign: Campaign];
  edit: [];
  'send-test': [campaign: Campaign];
  schedule: [campaign: Campaign];
  send: [campaign: Campaign];
  duplicate: [campaign: Campaign];
}>();

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
  initial: props.modelValue,
  hooks: {
    ...props.hooks,
    customValidators: async (c) => {
      const errors: string[] = [];
      if (!c.name?.trim()) errors.push('Template name is required');
      const msg = c.message as { subject?: string; html?: string; blocks?: unknown[] };
      if (!msg?.subject?.trim()) errors.push('Subject is required');
      const fromHost = props.hooks?.customValidators ? await props.hooks.customValidators(c) : [];
      return [...errors, ...fromHost];
    },
  },
  onDirty: () => emit('change', campaign.value),
});

const { lastSavedAt } = useAutosave(campaign, { channel: 'email' });

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});

watch(
  campaign,
  (c) => emit('update:modelValue', c),
  { deep: true }
);

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

const templateType = computed(() => (campaign.value as any).template_type ?? 'transactional');
const selectedPreviewProfileId = ref<string>('');
const presetConfirmOpen = ref(false);
const pendingPreset = ref<typeof EMAIL_PRESETS[0] | null>(null);

const previewProfile = computed(() => {
  const id = selectedPreviewProfileId.value;
  if (!id) return null;
  return DEFAULT_SAMPLE_PROFILES.find((p) => p.id === id) ?? null;
});

function applyPreset(preset: typeof EMAIL_PRESETS[0]) {
  const c = campaign.value;
  const msg = preset.campaign.message
    ? { ...c.message, ...preset.campaign.message }
    : c.message;
  update({
    ...preset.campaign,
    message: msg,
  });
  pendingPreset.value = null;
  presetConfirmOpen.value = false;
}

function onPresetSelect(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  if (!value) return;
  const preset = EMAIL_PRESETS.find((p) => p.id === value);
  if (!preset) return;
  if (dirty.value) {
    pendingPreset.value = preset;
    presetConfirmOpen.value = true;
  } else {
    applyPreset(preset);
  }
  (e.target as HTMLSelectElement).value = '';
}

function updateTemplateType(value: 'transactional' | 'marketing') {
  update({ template_type: value } as Partial<Campaign>);
}

function updateName(name: string) {
  update({
    name,
    tracking: { ...(campaign.value.tracking ?? {}), campaign_name: name },
  });
}

const emailSubject = computed(
  () => ((campaign.value.message as any).subject as string | undefined) ?? ''
);
const emailPreviewText = computed(
  () => ((campaign.value.message as any).preview_text as string | undefined) ?? ''
);
const emailHtml = computed(
  () => ((campaign.value.message as any).html as string | undefined) ?? ''
);
const emailFromName = computed(
  () => ((campaign.value.message as any).from_name as string | undefined) ?? 'Your App'
);
const emailFromAddress = computed(
  () =>
    ((campaign.value.message as any).from_address as string | undefined) ??
    'notifications@example.com'
);

const emailBlocks = computed(() => (campaign.value.message as any).blocks ?? []);

const emailBodyHtml = computed(() => {
  const blocks = emailBlocks.value;
  if (Array.isArray(blocks) && blocks.length > 0) return emailBlocksToHtml(blocks);
  const html = emailHtml.value;
  if (html && html.trim()) return html;
  return emailBlocksToHtml([]);
});

const displayEmailSubject = computed(() => {
  const s = emailSubject.value;
  if (!previewProfile.value) return s;
  return renderTemplatePreview(s, previewProfile.value.data);
});
const displayPreviewText = computed(() => {
  const p = emailPreviewText.value;
  if (!previewProfile.value) return p;
  return renderTemplatePreview(p, previewProfile.value.data);
});
const displayEmailBodyHtml = computed(() => {
  const html = emailBodyHtml.value;
  if (!previewProfile.value) return html;
  return renderTemplatePreview(html, previewProfile.value.data);
});

const previewWidth = ref<'desktop' | 'mobile'>('desktop');

function onSave() {
  if (!isValid.value) return;
  emit('save', campaign.value);
}
</script>

<template>
  <div class="keos-email-builder">
    <div class="kb-builder-top">
      <BuilderHeader
        :campaign-name="campaign.name"
        :status="campaign.status"
        :dirty="dirty"
        :last-saved-at="lastSavedAt"
        :can-undo="canUndo"
        :can-redo="canRedo"
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
          padding: `${spacing[16]}px ${spacing[24]}px`,
          marginBottom: `${spacing[24]}px`,
        }"
      >
        <ul :style="{ margin: 0, paddingLeft: '1.25rem', color: colors.danger }">
          <li v-for="e in blockingErrors" :key="e.message">
            {{ e.message }}
          </li>
        </ul>
      </div>

      <div
        v-if="warningsList.length > 0"
        class="kb-warnings"
        :style="{
          background: colors.neutral.bg,
          border: `1px solid ${colors.neutral.border}`,
          borderRadius: `${radius.input}px`,
          padding: `${spacing[16]}px ${spacing[24]}px`,
          marginBottom: `${spacing[24]}px`,
          fontSize: '0.875rem',
          color: colors.neutral.textMuted,
        }"
      >
        <strong :style="{ display: 'block', marginBottom: `${spacing[4]}px` }">Warnings</strong>
        <ul :style="{ margin: 0, paddingLeft: '1.25rem' }">
          <li v-for="w in warningsList" :key="w.message">
            {{ w.message }}
          </li>
        </ul>
      </div>
    </div>

    <div class="kb-email-layout">
      <aside class="kb-email-sidebar">
        <div
          v-if="!disabledSections.includes('email')"
          class="kb-email-form"
        >
          <div class="kb-email-form-head">
            <span class="kb-email-form-head-label">Template</span>
            <div class="kb-wa-form-head-row">
              <SectionTemplateType
                :template-type="templateType"
                @update="updateTemplateType"
              />
              <select
                class="kb-preset-select"
                aria-label="Load template preset"
                @change="onPresetSelect"
              >
                <option value="">Presets…</option>
                <option v-for="p in EMAIL_PRESETS" :key="p.id" :value="p.id">{{ p.label }}</option>
              </select>
            </div>
          </div>
          <SectionEmail
            :message="campaign.message"
            :variable-options="variableOptions"
            :show-reset="true"
            @update="updateMessage"
            @reset="resetMessage({ blocks: [] } as any)"
          />
        </div>
      </aside>

      <main class="kb-email-canvas">
        <div v-if="!designOnly && campaign.audience.test_mode" class="kb-email-test-banner">
          <span class="kb-email-test-banner-dot"></span>
          Test mode — only your test segment will receive this.
        </div>
        <div class="kb-email-preview-chrome">
          <div class="kb-push-preview-controls">
            <label class="kb-push-preview-as">
              <span class="kb-push-preview-as-label">Preview as</span>
              <select
                v-model="selectedPreviewProfileId"
                class="kb-preset-select"
                aria-label="Preview as profile"
              >
                <option value="">No substitution</option>
                <option v-for="pr in DEFAULT_SAMPLE_PROFILES" :key="pr.id" :value="pr.id">{{ pr.label }}</option>
              </select>
            </label>
          </div>
          <div class="kb-email-device-toggle" role="tablist" aria-label="Viewport">
            <button
              type="button"
              class="kb-email-device-btn"
              :class="{ 'kb-email-device-btn--active': previewWidth === 'desktop' }"
              @click="previewWidth = 'desktop'"
            >
              <svg class="kb-email-device-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Desktop
            </button>
            <button
              type="button"
              class="kb-email-device-btn"
              :class="{ 'kb-email-device-btn--active': previewWidth === 'mobile' }"
              @click="previewWidth = 'mobile'"
            >
              <svg class="kb-email-device-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              Mobile
            </button>
          </div>
          <div
            class="kb-email-preview-frame"
            :class="{ 'kb-email-preview-frame--mobile': previewWidth === 'mobile' }"
          >
            <div class="kb-email-inbox-strip">
              <div class="kb-email-inbox-from">
                <span class="kb-email-inbox-from-name">{{ emailFromName }}</span>
                <span class="kb-email-inbox-from-addr">&lt;{{ emailFromAddress }}&gt;</span>
              </div>
              <div class="kb-email-inbox-subject">
                <span class="kb-email-inbox-subject-text" :title="displayEmailSubject || 'No subject'">
                  {{ displayEmailSubject || 'No subject' }}
                </span>
                <span v-if="displayPreviewText" class="kb-email-inbox-preheader"> — {{ displayPreviewText }}</span>
              </div>
            </div>
            <div class="kb-email-body-canvas">
              <div class="kb-email-body-inner" data-email-body v-html="displayEmailBodyHtml" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <footer class="kb-email-actions">
      <div v-if="props.actionsNote" class="kb-actions-note">
        {{ props.actionsNote }}
      </div>
      <div class="kb-email-actions-right">
        <button
          v-if="showDuplicate"
          type="button"
          class="kb-email-action kb-email-action--secondary"
          @click="emit('duplicate', JSON.parse(JSON.stringify(campaign)))"
        >
          Duplicate
        </button>
        <button
          v-if="showSave"
          type="button"
          class="kb-email-action kb-email-action--secondary"
          @click="onSave"
        >
          Save
        </button>
        <button
          v-if="showClose"
          type="button"
          class="kb-email-action kb-email-action--primary"
          @click="emit('edit')"
        >
          Close
        </button>
      </div>
    </footer>

    <div v-if="presetConfirmOpen" class="kb-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="email-preset-confirm-title">
      <div class="kb-confirm-dialog">
        <h2 id="email-preset-confirm-title" class="kb-confirm-title">Replace content?</h2>
        <p class="kb-confirm-text">Current changes will be replaced by the preset. Continue?</p>
        <div class="kb-confirm-actions">
          <button type="button" class="kb-email-action kb-email-action--secondary" @click="presetConfirmOpen = false; pendingPreset = null">Cancel</button>
          <button type="button" class="kb-email-action kb-email-action--primary" @click="pendingPreset && applyPreset(pendingPreset)">Replace</button>
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
.kb-preset-select {
  font-size: 0.8125rem;
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #334155;
}
.kb-push-preview-controls {
  margin-bottom: 12px;
  align-self: flex-start;
}
.kb-push-preview-as {
  display: flex;
  align-items: center;
  gap: 8px;
}
.kb-push-preview-as-label {
  font-size: 0.8125rem;
  color: #64748b;
}
.keos-email-builder {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #0f172a;
  max-width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  min-height: 100vh;
  /* padding: 0 0 32px 0; */
}

.keos-email-builder button,
.keos-email-builder input,
.keos-email-builder textarea,
.keos-email-builder select {
  font-family: inherit;
  box-sizing: border-box;
}

.kb-builder-top {
  margin-left: 24px;
  margin-right: 24px;
}

.kb-email-layout {
  display: grid;
  background: linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%);
  grid-template-columns: 380px 1fr;
  gap: 0;
  height: calc(100vh - 120px);
  min-height: 320px;
  align-items: stretch;
  margin-top: 24px;
}
@media (max-width: 1023px) {
  .kb-email-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    margin-top: 20px;
  }
}

.kb-email-sidebar {
  background: #fff;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  border-radius: 0;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-left: none;
  box-shadow: 2px 0 12px -4px rgba(15, 23, 42, 0.06);
  min-height: 0;
}
@media (max-width: 1023px) {
  .kb-email-sidebar {
    margin: 0;
    border-radius: 0;
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-top: none;
    box-shadow: 0 -2px 12px -4px rgba(15, 23, 42, 0.06);
    max-height: none;
  }
}

.kb-email-form {
  padding: 28px 24px 40px 24px;
}
.kb-email-form-head {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}
.kb-email-form-head-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin-bottom: 12px;
}

.kb-email-canvas {
  padding: 40px 48px 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
}
@media (max-width: 1023px) {
  .kb-email-canvas {
    padding: 28px 20px 32px 20px;
    gap: 24px;
  }
}

.kb-email-test-banner {
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
.kb-email-test-banner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  animation: kb-pulse 1.5s ease-in-out infinite;
}
@keyframes kb-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.kb-email-preview-chrome {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 8px;
}

.kb-email-device-toggle {
  display: inline-flex;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.kb-email-device-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}
.kb-email-device-btn:hover {
  color: #334155;
  background: #f8fafc;
}
.kb-email-device-btn--active {
  color: #0f172a;
  background: #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.kb-email-device-icon {
  width: 18px;
  height: 18px;
  opacity: 0.85;
}

.kb-email-preview-frame {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition: max-width 0.25s ease;
}
.kb-email-preview-frame--mobile {
  max-width: 320px;
}

.kb-email-inbox-strip {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
}
.kb-email-inbox-from {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
}
.kb-email-inbox-from-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #0f172a;
}
.kb-email-inbox-from-addr {
  font-size: 0.75rem;
  color: #64748b;
}
.kb-email-inbox-subject {
  margin-top: 10px;
  font-size: 0.875rem;
  color: #334155;
}
.kb-email-inbox-subject-text {
  font-weight: 500;
  color: #0f172a;
}
.kb-email-inbox-preheader {
  color: #64748b;
  font-weight: 400;
}

.kb-email-body-canvas {
  flex: 1;
  min-height: 0;
  padding: 28px 24px 36px 24px;
}
.kb-email-body-inner {
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
}
.kb-email-body-inner :deep(a) {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}
.kb-email-body-inner :deep(a:hover) {
  text-decoration: underline;
}
.kb-email-body-inner :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.kb-actions-note {
  font-size: 0.75rem;
  color: #64748b;
  max-width: 50%;
}

.kb-email-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 32px 24px;
  /* margin-top: 24px; */
  background: #fff;
  border-top: 1px solid #e2e8f0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}
.kb-email-actions-right {
  display: flex;
  gap: 16px;
  margin-left: auto;
}
.kb-email-action {
  padding: 12px 24px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.kb-email-action:active {
  transform: scale(0.98);
}
.kb-email-action--secondary {
  background: #f1f5f9;
  color: #475569;
}
.kb-email-action--secondary:hover {
  background: #e2e8f0;
  color: #334155;
}
.kb-email-action--primary {
  background: #0f172a;
  color: #fff;
}
.kb-email-action--primary:hover {
  background: #1e293b;
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
.kb-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>

