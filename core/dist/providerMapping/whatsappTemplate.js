function toProviderCategory(raw) {
    const value = String(raw ?? '').trim().toLowerCase();
    if (value === 'authentication')
        return 'AUTHENTICATION';
    if (value === 'utility')
        return 'UTILITY';
    return 'MARKETING';
}
function normalizeTemplateName(rawName, fallback = 'template_message') {
    const source = String(rawName ?? '').trim();
    const name = source || fallback;
    return name
        .toLowerCase()
        .replace(/[^a-z0-9_]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 512) || fallback;
}
function inferHeaderFormat(msg) {
    const headerType = String(msg.header_type ?? '').trim().toLowerCase();
    if (headerType === 'image')
        return 'IMAGE';
    if (headerType === 'video')
        return 'VIDEO';
    if (headerType === 'document')
        return 'DOCUMENT';
    if (headerType === 'text')
        return 'TEXT';
    const templateType = String(msg.template_type ?? '').trim().toLowerCase();
    if (templateType === 'image')
        return 'IMAGE';
    if (templateType === 'video')
        return 'VIDEO';
    if (templateType === 'document')
        return 'DOCUMENT';
    return null;
}
function transformGoPlaceholdersToPositional(input, existingOrder = []) {
    if (!input)
        return { text: '', varOrder: [...existingOrder] };
    const varOrder = [...existingOrder];
    const indexMap = new Map();
    varOrder.forEach((v, i) => indexMap.set(v, i + 1));
    const text = input.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (_m, key) => {
        if (!indexMap.has(key)) {
            indexMap.set(key, varOrder.length + 1);
            varOrder.push(key);
        }
        return `{{${indexMap.get(key)}}}`;
    });
    return { text, varOrder };
}
function exampleValues(varOrder, sample) {
    return varOrder.map((v) => {
        const found = sample?.[v];
        if (typeof found === 'string' && found.length > 0)
            return found;
        return `sample_${v}`;
    });
}
function mapButtonsToMeta(buttonsRaw, varOrderSeed) {
    const warnings = [];
    let varOrder = [...varOrderSeed];
    const mapped = buttonsRaw
        .slice(0, 10)
        .map((b) => {
        const btn = b;
        const type = String(btn.type ?? 'quick_reply').trim().toLowerCase();
        const text = String(btn.label ?? '').trim() || 'Button';
        if (type === 'url') {
            const transformed = transformGoPlaceholdersToPositional(String(btn.url ?? ''), varOrder);
            varOrder = transformed.varOrder;
            return { type: 'URL', text, url: transformed.text || undefined };
        }
        if (type === 'call') {
            return {
                type: 'PHONE_NUMBER',
                text,
                phone_number: String(btn.phone ?? '').trim() || undefined,
            };
        }
        if (type === 'opt_out') {
            warnings.push('Opt-out button is provider-specific; mapped as QUICK_REPLY.');
            return { type: 'QUICK_REPLY', text };
        }
        return { type: 'QUICK_REPLY', text };
    })
        .filter((b) => Boolean(b.text));
    return { buttons: mapped, varOrder, warnings };
}
function collectAdvancedFields(msg) {
    const advanced = {};
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
    ];
    for (const key of keys) {
        if (msg[key] !== undefined && msg[key] !== null && msg[key] !== '') {
            advanced[key] = msg[key];
        }
    }
    return Object.keys(advanced).length ? advanced : undefined;
}
export function toMetaWhatsAppTemplate(campaign, options = {}) {
    const warnings = [];
    const msg = campaign.message;
    const components = [];
    const name = normalizeTemplateName(msg.template_name ?? campaign.name, campaign.name || 'template_message');
    const category = toProviderCategory(msg.template_category);
    const language = String(msg.template_language ?? 'en_US').trim() || 'en_US';
    let globalVarOrder = [];
    const headerFormat = inferHeaderFormat(msg);
    const headerTextRaw = String(msg.header ?? '').trim();
    if (headerFormat === 'TEXT' && headerTextRaw) {
        const transformed = transformGoPlaceholdersToPositional(headerTextRaw, globalVarOrder);
        globalVarOrder = transformed.varOrder;
        const headerExamples = exampleValues(globalVarOrder, options.exampleData);
        components.push({
            type: 'HEADER',
            format: 'TEXT',
            text: transformed.text,
            ...(headerExamples.length ? { example: { header_text: headerExamples } } : {}),
        });
    }
    else if (headerFormat && headerFormat !== 'TEXT') {
        components.push({ type: 'HEADER', format: headerFormat });
        if (!msg.media_url) {
            warnings.push(`Header format ${headerFormat} selected but media_url is empty.`);
        }
    }
    const bodyRaw = String(msg.body ?? '').trim();
    const bodyTransformed = transformGoPlaceholdersToPositional(bodyRaw, globalVarOrder);
    globalVarOrder = bodyTransformed.varOrder;
    const bodyExample = exampleValues(globalVarOrder, options.exampleData);
    components.push({
        type: 'BODY',
        text: bodyTransformed.text,
        ...(bodyExample.length ? { example: { body_text: [bodyExample] } } : {}),
    });
    const footerRaw = String(msg.footer ?? '').trim();
    if (footerRaw) {
        components.push({
            type: 'FOOTER',
            text: footerRaw,
        });
    }
    const buttonsRaw = Array.isArray(msg.buttons) ? msg.buttons : [];
    if (buttonsRaw.length) {
        const mapped = mapButtonsToMeta(buttonsRaw, globalVarOrder);
        globalVarOrder = mapped.varOrder;
        warnings.push(...mapped.warnings);
        if (mapped.buttons.length)
            components.push({ type: 'BUTTONS', buttons: mapped.buttons });
    }
    const templateType = String(msg.template_type ?? 'text').trim().toLowerCase();
    if (['catalog', 'mpm', 'carousel', 'flow', 'lto', 'auth'].includes(templateType)) {
        warnings.push(`template_type="${templateType}" has provider-specific requirements; verify advanced payload fields before submission.`);
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
export function toGupshupWhatsAppTemplate(campaign, options = {}) {
    const meta = toMetaWhatsAppTemplate(campaign, options);
    const msg = campaign.message;
    const header = meta.payload.components.find((c) => c.type === 'HEADER');
    const body = meta.payload.components.find((c) => c.type === 'BODY');
    const footer = meta.payload.components.find((c) => c.type === 'FOOTER');
    const buttonComp = meta.payload.components.find((c) => c.type === 'BUTTONS');
    const templateType = (() => {
        const v = String(msg.template_type ?? '').trim().toLowerCase();
        if (v === 'image')
            return 'IMAGE';
        if (v === 'video')
            return 'VIDEO';
        if (v === 'document')
            return 'DOCUMENT';
        return 'TEXT';
    })();
    const payload = {
        elementName: meta.payload.name,
        languageCode: meta.payload.language,
        category: meta.payload.category,
        templateType,
        content: body?.text ?? '',
        ...(header?.format === 'TEXT' && header.text ? { header: header.text } : {}),
        ...(footer?.text ? { footer: footer.text } : {}),
        ...(buttonComp?.buttons?.length
            ? {
                buttons: buttonComp.buttons.map((b) => ({
                    type: b.type,
                    title: b.text,
                    ...(b.url ? { url: b.url } : {}),
                    ...(b.phone_number ? { phoneNumber: b.phone_number } : {}),
                })),
            }
            : {}),
        ...(body?.example?.body_text?.[0]?.length ? { example: body.example.body_text[0] } : {}),
        metaTemplate: meta.payload,
        ...(collectAdvancedFields(msg) ? { advanced: collectAdvancedFields(msg) } : {}),
    };
    return { payload, warnings: meta.warnings };
}
//# sourceMappingURL=whatsappTemplate.js.map