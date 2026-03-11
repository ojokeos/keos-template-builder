import { ref as re, watch as Ne, computed as $, defineComponent as Pe, openBlock as a, createElementBlock as n, normalizeStyle as Ie, unref as C, createElementVNode as e, normalizeClass as xe, Fragment as U, renderList as V, toDisplayString as c, createTextVNode as F, createCommentVNode as b, withDirectives as je, vModelText as ut, createStaticVNode as tt, vModelSelect as Ge, withKeys as aa, onMounted as st, onUnmounted as lt, createVNode as Me, createBlock as na, withModifiers as Ke, renderSlot as Je } from "vue";
const Se = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Xe = {
  input: 6,
  card: 12,
  button: 6
}, Ue = {
  primary: "#0f172a",
  primaryHover: "#1e293b",
  danger: "#dc2626",
  dangerBg: "#fef2f2",
  dangerBorder: "#fecaca",
  neutral: {
    border: "#e2e8f0",
    bg: "#f8fafc",
    bgCard: "#f1f5f9",
    text: "#0f172a",
    textMuted: "#64748b",
    textMeta: "#475569"
  }
};
Ue.neutral.textMuted, Ue.neutral.textMeta;
const dt = {
  android: {
    title: 60,
    body: 240
  },
  ios: {
    title: 50,
    body: 120
  },
  web: {
    title: 60,
    body: 240
  }
}, sa = ["android", "ios", "web"], Dt = "normal", Ht = ["low", "normal", "high"], jt = 86400, la = [3600, 7200, 86400, 172800], Wt = "1.0", oa = ["topic", "segment", "user_list"];
function ht() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...sa],
    test_mode: !1
  };
}
function ft() {
  return {
    title: "",
    body: "",
    variables: [],
    actions: []
  };
}
function gt() {
  return {
    priority: Dt,
    ttl: jt,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function kt() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function ia(i) {
  return {
    schema_version: Wt,
    name: "",
    status: "draft",
    audience: ht(),
    message: ft(),
    delivery: gt(),
    tracking: kt(),
    ...i
  };
}
function qt(i) {
  const p = i;
  return p.schema_version || (p.schema_version = Wt), p.audience || (p.audience = ht()), p.message || (p.message = ft()), p.delivery || (p.delivery = gt()), p.tracking || (p.tracking = kt()), Ht.includes(p.delivery.priority) || (p.delivery.priority = Dt), p.delivery.ttl === void 0 && (p.delivery.ttl = jt), oa.includes(p.audience.type) || (p.audience.type = "topic"), p.audience.type === "topic" && !p.audience.topic_name && (p.audience.topic_name = "default"), p;
}
const ra = 1e5;
function ua(i, p) {
  var k, S, A;
  const m = [], y = p ?? i.audience.estimated_reach;
  return y !== void 0 && y >= ra && m.push({
    message: `Estimated reach is very high (${y.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), i.tracking && !((k = i.tracking.campaign_name) != null && k.trim()) && !((S = i.name) != null && S.trim()) && m.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (A = i.message.deep_link) != null && A.trim() || m.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), m;
}
function Ft(i, p = "error") {
  return { message: i, severity: p };
}
function zt(i) {
  const p = [];
  return i.schema_version || p.push(Ft("Missing schema_version")), {
    valid: p.length === 0,
    errors: p
  };
}
function da(i, p) {
  const m = zt(i), y = ua(i, p);
  return {
    valid: m.valid,
    errors: [
      ...m.errors,
      ...y.map((k) => Ft(k.message, k.severity))
    ]
  };
}
function ca(i) {
  return i.errors.filter((p) => p.severity === "error");
}
function pa(i) {
  return i.errors.filter((p) => p.severity !== "error");
}
function ma(i) {
  const p = String(i ?? "").trim().toLowerCase();
  return p === "authentication" ? "AUTHENTICATION" : p === "utility" ? "UTILITY" : "MARKETING";
}
function va(i, p = "template_message") {
  return (String(i ?? "").trim() || p).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || p;
}
function ba(i) {
  const p = String(i.header_type ?? "").trim().toLowerCase();
  if (p === "image")
    return "IMAGE";
  if (p === "video")
    return "VIDEO";
  if (p === "document")
    return "DOCUMENT";
  if (p === "text")
    return "TEXT";
  const m = String(i.template_type ?? "").trim().toLowerCase();
  return m === "image" ? "IMAGE" : m === "video" ? "VIDEO" : m === "document" ? "DOCUMENT" : null;
}
function nt(i, p = []) {
  if (!i)
    return { text: "", varOrder: [...p] };
  const m = [...p], y = /* @__PURE__ */ new Map();
  return m.forEach((S, A) => y.set(S, A + 1)), { text: i.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (S, A) => (y.has(A) || (y.set(A, m.length + 1), m.push(A)), `{{${y.get(A)}}}`)), varOrder: m };
}
function $t(i, p) {
  return i.map((m) => {
    const y = p == null ? void 0 : p[m];
    return typeof y == "string" && y.length > 0 ? y : `sample_${m}`;
  });
}
function ya(i, p, m) {
  if (!i || !p || m.length === 0)
    return {};
  try {
    const k = i.split(/\{\{\d+\}\}/).map((O) => O.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+?)"), S = new RegExp(`^${k}$`, "s"), A = p.match(S);
    if (!A)
      return {};
    const T = {};
    return m.forEach((O, B) => {
      const G = A[B + 1];
      G && (T[O] = G.trim());
    }), T;
  } catch {
    return {};
  }
}
function Yt(i, p) {
  const m = [];
  let y = [...p];
  return { buttons: i.slice(0, 10).map((S) => {
    const A = S, T = String(A.type ?? "quick_reply").trim().toLowerCase(), O = String(A.label ?? "").trim() || "Button";
    if (T === "url") {
      const B = nt(String(A.url ?? ""), y);
      y = B.varOrder;
      const G = String(A.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        text: O,
        url: B.text || void 0,
        ...G ? { example: [G] } : {}
      };
    }
    if (T === "call")
      return {
        type: "PHONE_NUMBER",
        text: O,
        phone_number: String(A.phone ?? "").trim() || void 0
      };
    if (T === "copy_code") {
      const B = String(A.example ?? "").trim() || void 0;
      return { type: "COPY_CODE", text: O, ...B ? { example: B } : {} };
    }
    if (T === "otp") {
      const B = String(A.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        text: O,
        otp_type: B,
        ...String(A.autofill_text ?? "").trim() ? { autofill_text: String(A.autofill_text).trim() } : {},
        ...String(A.package_name ?? "").trim() ? { package_name: String(A.package_name).trim() } : {},
        ...String(A.signature_hash ?? "").trim() ? { signature_hash: String(A.signature_hash).trim() } : {}
      };
    }
    return T === "opt_out" ? { type: "QUICK_REPLY", text: O } : { type: "QUICK_REPLY", text: O };
  }).filter((S) => !!(S != null && S.text)), varOrder: y, warnings: m };
}
function ha(i) {
  return i.slice(0, 10).map((p) => {
    const m = p, y = String(m.type ?? "quick_reply").trim().toLowerCase(), k = String(m.label ?? "").trim() || "Button";
    if (y === "url") {
      const S = String(m.url ?? "").trim() || void 0, A = String(m.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        text: k,
        ...S ? { url: S } : {},
        ...A ? { example: [A] } : {}
      };
    }
    if (y === "call")
      return {
        type: "PHONE_NUMBER",
        text: k,
        ...String(m.phone ?? "").trim() ? { phoneNumber: String(m.phone).trim() } : {}
      };
    if (y === "opt_out")
      return { type: "OPT_OUT", text: k };
    if (y === "copy_code")
      return {
        type: "COPY_CODE",
        text: k,
        ...String(m.example ?? "").trim() ? { example: String(m.example).trim() } : {}
      };
    if (y === "otp") {
      const S = String(m.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        text: k,
        otp_type: S,
        ...String(m.autofill_text ?? "").trim() ? { autofill_text: String(m.autofill_text).trim() } : {},
        ...String(m.package_name ?? "").trim() ? { package_name: String(m.package_name).trim() } : {},
        ...String(m.signature_hash ?? "").trim() ? { signature_hash: String(m.signature_hash).trim() } : {}
      };
    }
    return { type: "QUICK_REPLY", text: k };
  }).filter((p) => !!p.text);
}
function wt(i) {
  const p = {}, m = [
    "flow_id",
    "flow_cta_label",
    "lto_expiry",
    "products",
    "cards",
    "auth_type",
    "auth_label",
    "auth_code",
    "document_filename",
    "media_url",
    "media_handle",
    "media_caption",
    "coupon_code"
  ];
  for (const y of m)
    i[y] !== void 0 && i[y] !== null && i[y] !== "" && (p[y] = i[y]);
  return Object.keys(p).length ? p : void 0;
}
function fa(i, p = {}) {
  const m = [], y = i.message, k = [], S = va(y.template_name ?? i.name, i.name || "template_message"), A = ma(y.template_category), T = String(y.template_language ?? "en_US").trim() || "en_US";
  let O = [];
  const B = String(y.body ?? "").trim(), G = nt(B, []), te = String(y.template_example ?? "").trim(), se = !p.exampleData && te ? ya(G.text, te, G.varOrder) : {}, ce = p.exampleData ?? (Object.keys(se).length ? se : void 0), H = ba(y), ne = String(y.header ?? "").trim();
  if (H === "TEXT" && ne) {
    const ye = nt(ne, O);
    O = ye.varOrder;
    const Ce = $t(O, ce);
    k.push({
      type: "HEADER",
      format: "TEXT",
      text: ye.text,
      ...Ce.length ? { example: { header_text: Ce } } : {}
    });
  } else H && H !== "TEXT" && (k.push({ type: "HEADER", format: H }), y.media_url || m.push(`Header format ${H} selected but media_url is empty.`));
  const q = String(y.body ?? "").trim(), pe = nt(q, O);
  O = pe.varOrder;
  const D = $t(O, ce);
  k.push({
    type: "BODY",
    text: pe.text,
    ...D.length ? { example: { body_text: [D] } } : {}
  });
  const Y = String(y.footer ?? "").trim();
  if (Y) {
    const ye = nt(Y, O);
    O = ye.varOrder, k.push({
      type: "FOOTER",
      text: ye.text
    });
  }
  const J = Array.isArray(y.buttons) ? y.buttons : [];
  if (J.length) {
    const ye = Yt(J, O);
    O = ye.varOrder, m.push(...ye.warnings), ye.buttons.length && k.push({ type: "BUTTONS", buttons: ye.buttons });
  }
  const ae = String(y.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(ae) && m.push(`template_type="${ae}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: S,
      category: A,
      language: T,
      components: k
    },
    warnings: m
  };
}
function ga(i, p) {
  var k;
  const m = (k = p == null ? void 0 : p.example) == null ? void 0 : k.header_text, y = {
    header: {
      type: "TEXT",
      text: i,
      ...m != null && m.length ? { example: { header_text: m } } : {}
    }
  };
  return JSON.stringify(y);
}
function xt(i) {
  const p = /* @__PURE__ */ new Set(["URL", "PHONE_NUMBER", "COPY_CODE", "OPT_OUT", "OTP"]);
  return [
    ...i.filter((m) => p.has(m.type)),
    ...i.filter((m) => !p.has(m.type))
  ];
}
const Ct = {
  MARKETING: /* @__PURE__ */ new Set(["quick_reply", "url", "call", "copy_code", "opt_out"]),
  UTILITY: /* @__PURE__ */ new Set(["quick_reply", "url", "call"]),
  AUTHENTICATION: /* @__PURE__ */ new Set(["otp"])
};
function St(i, p = {}) {
  const m = fa(i, p), y = i.message, k = [...m.warnings], S = m.payload.category, A = S === "AUTHENTICATION", T = Ct[S] ?? Ct.MARKETING, B = (Array.isArray(y.buttons) ? y.buttons : []).filter((h) => {
    const le = String(h.type ?? "quick_reply").trim().toLowerCase();
    return T.has(le) ? !0 : (k.push(`Button type "${le}" is not allowed for ${S}; removed from payload.`), !1);
  }), G = A ? 1 : 10;
  B.length > G && k.push(`${S} allows at most ${G} button(s); extra buttons removed.`);
  const te = B.slice(0, G), se = xt(ha(te)), ce = m.payload.components.filter((h) => !(A && h.type === "HEADER" || A && h.type === "FOOTER"));
  if (te.length) {
    const h = ce.findIndex((we) => we.type === "BUTTONS"), { buttons: le } = Yt(te, []), $e = xt(le), _e = { type: "BUTTONS", buttons: $e };
    h >= 0 ? ce[h] = _e : $e.length && ce.push(_e);
  } else {
    const h = ce.findIndex((le) => le.type === "BUTTONS");
    h >= 0 && ce.splice(h, 1);
  }
  const H = { ...m.payload, components: ce }, ne = ce.find((h) => h.type === "HEADER"), q = ce.find((h) => h.type === "BODY"), pe = ce.find((h) => h.type === "FOOTER"), D = String(y.body ?? "").trim(), Y = String(y.header ?? "").trim(), J = String(y.footer ?? "").trim(), ae = (() => {
    const h = String(y.template_type ?? "").trim().toLowerCase();
    return h === "image" ? "IMAGE" : h === "video" ? "VIDEO" : h === "document" ? "DOCUMENT" : h === "carousel" ? "CAROUSEL" : "TEXT";
  })(), ye = String(y.vertical ?? "").trim() || void 0, Ce = String(y.template_example ?? "").trim() || void 0, Z = String(y.media_handle ?? "").trim() || void 0, f = typeof y.enable_sample == "boolean" ? y.enable_sample : void 0, E = !A && typeof y.allow_category_change == "boolean" ? y.allow_category_change : void 0, j = typeof y.add_security_recommendation == "boolean" ? y.add_security_recommendation : void 0, ke = typeof y.code_expiration_minutes == "number" ? y.code_expiration_minutes : void 0, oe = !A && (ne == null ? void 0 : ne.format) === "TEXT" && (Y || ne.text) || "", R = oe ? ga(oe, ne) : void 0;
  return { payload: {
    elementName: H.name,
    languageCode: H.language,
    category: H.category,
    templateType: ae,
    // AUTHENTICATION templates must NOT include content/example — Meta presets the body.
    ...A ? {} : { content: D || (q == null ? void 0 : q.text) || "" },
    ...ye ? { vertical: ye } : {},
    ...!A && Ce ? { example: Ce } : {},
    ...Z ? { exampleMedia: Z } : {},
    // TEXT headers go into containerMeta; media headers are expressed via templateType.
    ...R ? { containerMeta: R } : {},
    // Footer is forbidden for AUTHENTICATION templates.
    ...!A && (J || pe != null && pe.text) ? { footer: J || (pe == null ? void 0 : pe.text) } : {},
    ...se.length ? { buttons: se } : {},
    ...f !== void 0 ? { enableSample: f } : {},
    // allowTemplateCategoryChange is forbidden for AUTHENTICATION templates.
    ...E !== void 0 ? { allowTemplateCategoryChange: E } : {},
    ...j !== void 0 ? { addSecurityRecommendation: j } : {},
    ...ke !== void 0 ? { codeExpirationMinutes: ke } : {},
    metaTemplate: H,
    metaWhatsApp: H,
    ...wt(y) ? { advanced: wt(y) } : {}
  }, warnings: k };
}
function Ze(i, p) {
  return i.length <= p ? { text: i, truncated: !1 } : { text: i.slice(0, Math.max(0, p - 3)) + "...", truncated: !0 };
}
const rt = dt.android;
function ka(i) {
  const { title: p, body: m } = i, y = Ze(p || "", rt.title), k = Ze(m || "", rt.body);
  return {
    title: y.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function _a(i) {
  const { title: p, body: m } = i, y = Ze(p || "", rt.title), k = Ze(m || "", rt.body);
  return {
    title: y.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: k.truncated,
    expanded: !0
  };
}
function $a(i, p = {}) {
  const m = p.expanded ? _a(i) : ka(i);
  return p.darkMode !== void 0 && (m.darkMode = p.darkMode), m;
}
const It = dt.ios;
function Kt(i) {
  const { title: p, body: m } = i, y = Ze(p || "", It.title), k = Ze(m || "", It.body);
  return {
    title: y.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function wa(i) {
  return Kt(i);
}
function xa(i, p = {}) {
  const m = p.variant === "lockscreen" ? wa(i) : Kt(i);
  return p.darkMode !== void 0 && (m.darkMode = p.darkMode), m;
}
const Tt = dt.web;
function At(i) {
  const { title: p, body: m } = i, y = Ze(p || "", Tt.title), k = Ze(m || "", Tt.body);
  return {
    title: y.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: k.truncated
  };
}
function Ca(i) {
  return i.map((p) => ({ message: p, severity: "error" }));
}
function vt(i) {
  return JSON.parse(JSON.stringify(i));
}
function ct(i = {}) {
  const p = re(
    qt(i.initial ?? ia())
  ), m = i.hooks ?? {}, y = re(!1), k = re([]);
  Ne(
    p,
    () => {
      if (!m.customValidators) {
        k.value = [];
        return;
      }
      m.customValidators(p.value).then((j) => {
        k.value = j;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const S = re([]), A = re([]);
  function T() {
    const j = vt(p.value);
    S.value = [...S.value.slice(-19), j], A.value = [];
  }
  const O = $(() => S.value.length > 0), B = $(() => A.value.length > 0);
  function G() {
    S.value.length !== 0 && (A.value = [vt(p.value), ...A.value], p.value = S.value[S.value.length - 1], S.value = S.value.slice(0, -1));
  }
  function te() {
    A.value.length !== 0 && (S.value = [...S.value, vt(p.value)], p.value = A.value[0], A.value = A.value.slice(1));
  }
  Ne(
    p,
    () => {
      var j;
      y.value = !0, (j = i.onDirty) == null || j.call(i);
    },
    { deep: !0 }
  );
  const se = $(() => zt(p.value));
  function ce(j) {
    const ke = da(p.value, j), oe = Ca(k.value), R = [...ca(ke), ...oe], W = [...ke.errors, ...oe], h = ke.valid && oe.length === 0;
    return {
      ...ke,
      errors: W,
      valid: h,
      blockingErrors: R,
      warnings: pa(ke)
    };
  }
  function H(j) {
    T(), p.value = { ...p.value, ...j };
  }
  function ne(j) {
    T(), p.value = {
      ...p.value,
      audience: { ...p.value.audience, ...j }
    };
  }
  function q(j) {
    T(), p.value = {
      ...p.value,
      message: { ...p.value.message, ...j }
    };
  }
  function pe(j) {
    T(), p.value = {
      ...p.value,
      delivery: { ...p.value.delivery, ...j }
    };
  }
  function D(j) {
    T(), p.value = {
      ...p.value,
      tracking: p.value.tracking ? { ...p.value.tracking, ...j } : { campaign_name: "", tags: [], ab_test: !1, ...j }
    };
  }
  function Y(j) {
    T(), p.value = {
      ...p.value,
      message: { ...ft(), ...j }
    };
  }
  function J(j) {
    T(), p.value = {
      ...p.value,
      delivery: { ...gt(), ...j }
    };
  }
  function ae(j) {
    T(), p.value = {
      ...p.value,
      tracking: { ...kt(), ...j }
    };
  }
  function ye(j) {
    T(), p.value = {
      ...p.value,
      audience: { ...ht(), ...j }
    };
  }
  const Ce = $(() => ({
    title: p.value.message.title,
    body: p.value.message.body,
    imageUrl: p.value.message.image_url
  }));
  function Z(j, ke) {
    const oe = Ce.value;
    let R;
    switch (j) {
      case "android":
        R = $a(oe, { expanded: ke == null ? void 0 : ke.expanded });
        break;
      case "ios":
        R = xa(oe);
        break;
      case "web":
        R = At(oe);
        break;
      default:
        R = At(oe);
    }
    const W = p.value.message.actions ?? [], h = p.value.message.location;
    return { ...R, actions: W, location: h ?? void 0 };
  }
  const f = dt;
  async function E() {
    return m.customValidators ? m.customValidators(p.value) : [];
  }
  return {
    campaign: p,
    dirty: y,
    validation: se,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: k,
    getValidationWithWarnings: ce,
    update: H,
    updateAudience: ne,
    updateMessage: q,
    updateDelivery: pe,
    updateTracking: D,
    undo: G,
    redo: te,
    canUndo: O,
    canRedo: B,
    resetMessage: Y,
    resetDelivery: J,
    resetTracking: ae,
    resetAudience: ye,
    getPreview: Z,
    previewInput: Ce,
    characterLimits: f,
    runCustomValidators: E,
    hooks: m
  };
}
const Sa = "keos-draft", Ia = 2e3;
function Ta(i, p) {
  return `${Sa}-${i}-${p}`;
}
function pt(i, p) {
  const m = p.channel, y = $(
    () => {
      var G, te;
      return Ta(
        m,
        p.key ?? ((G = i.value) == null ? void 0 : G.id) ?? ((te = i.value) == null ? void 0 : te.name) ?? "draft"
      );
    }
  ), k = re(null);
  let S = null;
  function A() {
    try {
      const G = JSON.stringify(i.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(y.value, G), k.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function T() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(y.value);
    } catch {
    }
  }
  function O() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const G = window.localStorage.getItem(y.value);
      if (!G) return null;
      const te = JSON.parse(G);
      return qt(te);
    } catch {
      return null;
    }
  }
  function B() {
    return p.enabled === void 0 ? !0 : typeof p.enabled == "boolean" ? p.enabled : p.enabled.value;
  }
  return Ne(
    i,
    () => {
      B() && (S && clearTimeout(S), S = setTimeout(() => {
        S = null, A();
      }, Ia));
    },
    { deep: !0 }
  ), {
    lastSavedAt: k,
    clearDraft: T,
    getDraft: O,
    persist: A
  };
}
const Aa = { class: "kb-header__row" }, Ua = ["value"], Ra = { class: "kb-header__actions" }, Ea = ["disabled"], Pa = ["disabled"], Ba = ["value"], La = ["value"], Oa = /* @__PURE__ */ Pe({
  __name: "BuilderHeader",
  props: {
    campaignName: {},
    status: {},
    dirty: { type: Boolean },
    saving: { type: Boolean },
    lastSavedAt: {},
    canUndo: { type: Boolean, default: !1 },
    canRedo: { type: Boolean, default: !1 },
    workflowStatus: {},
    slugifyName: { type: Boolean, default: !1 }
  },
  emits: ["update:campaignName", "update:workflowStatus", "undo", "redo"],
  setup(i, { emit: p }) {
    const m = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], y = i, k = p, S = () => !!(y.campaignName || "").trim();
    function A(B) {
      return y.slugifyName ? B.trim().replace(/\s+/g, "-") : B;
    }
    function T(B) {
      return B.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function O(B) {
      const G = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return G[B] ?? G.draft;
    }
    return (B, G) => (a(), n("header", {
      class: "kb-header",
      style: Ie({
        padding: `${C(Se)[16]}px 0`,
        borderBottom: `1px solid ${C(Ue).neutral.border}`,
        marginBottom: `${C(Se)[16]}px`
      })
    }, [
      e("div", Aa, [
        e("div", {
          class: xe(["kb-header__name-section", { "kb-header__name-section--filled": S() }])
        }, [
          G[4] || (G[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: i.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: G[0] || (G[0] = (te) => k("update:campaignName", A(te.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Ua),
          G[5] || (G[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Ra, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !i.canUndo,
            onClick: G[1] || (G[1] = (te) => k("undo"))
          }, " Undo ", 8, Ea),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !i.canRedo,
            onClick: G[2] || (G[2] = (te) => k("redo"))
          }, " Redo ", 8, Pa)
        ]),
        i.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: i.workflowStatus,
          class: "kb-header__status-select",
          style: Ie({
            padding: `${C(Se)[4]}px ${C(Se)[8]}px`,
            borderRadius: `${C(Xe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...O(i.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: G[3] || (G[3] = (te) => k("update:workflowStatus", te.target.value))
        }, [
          (a(), n(U, null, V(m, (te) => e("option", {
            key: te.value,
            value: te.value
          }, c(te.label), 9, La)), 64))
        ], 44, Ba)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: Ie({
            padding: `${C(Se)[4]}px ${C(Se)[8]}px`,
            borderRadius: `${C(Xe).input}px`,
            background: C(Ue).neutral.bg,
            fontSize: "0.8125rem",
            color: C(Ue).neutral.textMuted
          })
        }, c(i.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: Ie({ fontSize: "0.8125rem", color: C(Ue).neutral.textMuted, marginTop: `${C(Se)[4]}px` })
      }, [
        i.saving ? (a(), n(U, { key: 0 }, [
          F("Saving…")
        ], 64)) : i.dirty ? (a(), n(U, { key: 1 }, [
          F("Unsaved changes")
        ], 64)) : i.lastSavedAt ? (a(), n(U, { key: 2 }, [
          F("Last saved at " + c(T(i.lastSavedAt)), 1)
        ], 64)) : b("", !0)
      ], 4)
    ], 4));
  }
}), Le = (i, p) => {
  const m = i.__vccOpts || i;
  for (const [y, k] of p)
    m[y] = k;
  return m;
}, mt = /* @__PURE__ */ Le(Oa, [["__scopeId", "data-v-56efb3ec"]]), Na = { class: "kb-section" }, Ma = { class: "kb-section__head" }, Va = { class: "kb-field" }, Da = { class: "kb-label" }, Ha = { class: "kb-field-with-rail" }, ja = ["value", "aria-invalid"], Wa = { class: "kb-var-picker-wrap" }, qa = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Fa = ["onClick"], za = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, Ya = { class: "kb-field" }, Ka = { class: "kb-label" }, Ga = { class: "kb-field-with-rail" }, Ja = ["value", "aria-invalid"], Qa = { class: "kb-var-picker-wrap" }, Xa = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Za = ["onClick"], en = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, tn = {
  class: "kb-toggle-row",
  style: { "margin-top": "0.5rem" }
}, an = ["checked"], nn = { class: "kb-field" }, sn = { class: "kb-tags-wrap" }, ln = ["onClick"], on = { class: "kb-tag-suggestions" }, rn = ["onClick"], un = { class: "kb-field" }, dn = ["value"], cn = { class: "kb-field" }, pn = ["value", "aria-invalid"], mn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, vn = ["value"], bn = { class: "kb-field" }, yn = ["value", "aria-invalid"], hn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, fn = { class: "kb-field" }, gn = { class: "kb-actions-list" }, kn = { class: "kb-action-card__head" }, _n = { class: "kb-action-card__num" }, $n = { class: "kb-action-card__type-row" }, wn = ["value", "onChange"], xn = ["value"], Cn = { class: "kb-toggle-row kb-toggle-row--inline" }, Sn = ["checked", "onChange"], In = ["onClick"], Tn = ["value", "onInput"], An = ["value", "onInput"], Un = { class: "kb-action-http-row" }, Rn = ["value", "onChange"], En = ["value"], Pn = ["value", "onInput"], Bn = ["value", "onInput"], Ln = { class: "kb-kv-section" }, On = ["value", "onInput"], Nn = ["value", "onInput"], Mn = ["onClick"], Vn = ["onClick"], Dn = ["value", "onInput"], Hn = { class: "kb-kv-section" }, jn = ["value", "onInput"], Wn = ["value", "onInput"], qn = ["onClick"], Fn = ["onClick"], zn = ["value", "onInput"], Yn = { class: "kb-actions-footer" }, Kn = ["disabled"], Gn = { class: "kb-action-chips" }, Jn = ["disabled", "onClick"], Qn = { class: "kb-field" }, Xn = { class: "kb-location-row" }, Zn = ["value"], es = ["value"], ts = ["value"], as = ["value"], ns = { class: "kb-field" }, ss = ["value"], ls = { class: "kb-field" }, os = ["value"], is = { class: "kb-field" }, rs = { class: "kb-delay-row" }, us = ["value"], ds = { class: "kb-delay-chips" }, cs = ["onClick"], ps = { class: "kb-advanced-toggles" }, ms = { class: "kb-advanced-toggles__body" }, vs = { class: "kb-toggle-row" }, bs = ["checked"], ys = { class: "kb-toggle-row" }, hs = ["checked"], fs = { class: "kb-toggle-row" }, gs = ["checked"], bt = 3, ks = /* @__PURE__ */ Pe({
  __name: "SectionMessage",
  props: {
    message: {},
    titleCount: {},
    bodyCount: {},
    titleLimit: {},
    bodyLimit: {},
    selectedPlatform: {},
    showReset: { type: Boolean, default: !1 },
    titleError: {},
    bodyError: {},
    imageUrlError: {},
    deepLinkError: {}
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    const m = i, y = p, k = $(() => m.message), S = [
      "first_name",
      "last_name",
      "full_name",
      "user_id",
      "app_name",
      "order_id",
      "order_status",
      "tracking_url",
      "coupon_code",
      "cart_total",
      "city",
      "country"
    ], A = $(() => {
      const W = (k.value.variables ?? []).filter(Boolean);
      return W.length ? Array.from(new Set(W)) : S;
    }), T = re(null);
    function O(W) {
      T.value = T.value === W ? null : W;
    }
    function B(W, h) {
      const le = ` {{ .${h} }}`, $e = (k.value.variables ?? []).filter(Boolean), _e = Array.from(/* @__PURE__ */ new Set([...$e, h]));
      W === "title" ? y("update", { title: `${m.message.title || ""}${le}`, variables: _e }) : y("update", { body: `${m.message.body || ""}${le}`, variables: _e }), T.value = null;
    }
    const G = re(""), te = $(() => k.value.tags ?? []);
    function se() {
      const W = G.value.trim().toLowerCase().replace(/\s+/g, "_");
      if (!W) return;
      const h = Array.from(/* @__PURE__ */ new Set([...te.value, W]));
      y("update", { tags: h }), G.value = "";
    }
    function ce(W) {
      y("update", { tags: te.value.filter((h) => h !== W) });
    }
    function H(W) {
      (W.key === "Enter" || W.key === ",") && (W.preventDefault(), se());
    }
    const ne = ["warning", "white_check_mark", "rotating_light", "loudspeaker", "package", "truck", "calendar", "key", "bell", "fire"], q = $(() => k.value.actions ?? []), pe = [
      { value: "view", label: "View", hint: "Open a URL in the browser or app." },
      { value: "http", label: "HTTP request", hint: "Send an HTTP request when tapped." },
      { value: "broadcast", label: "Broadcast", hint: "Android intent (automation apps)." },
      { value: "copy", label: "Copy to clipboard", hint: "Copy a value to the clipboard." }
    ], D = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    function Y() {
      const W = [...q.value, { id: `action_${Date.now()}`, action: "view", label: "" }];
      y("update", { actions: W });
    }
    function J(W) {
      const h = [...q.value];
      h.splice(W, 1), y("update", { actions: h });
    }
    function ae(W, h) {
      const le = [...q.value];
      le[W] = { ...le[W], ...h }, y("update", { actions: le });
    }
    function ye(W, h) {
      var _e, we;
      const le = { id: (_e = q.value[W]) == null ? void 0 : _e.id, action: h, label: ((we = q.value[W]) == null ? void 0 : we.label) ?? "" }, $e = [...q.value];
      $e[W] = le, y("update", { actions: $e });
    }
    function Ce(W) {
      const h = W.headers ?? {};
      return Object.entries(h).map(([le, $e]) => ({ key: le, value: $e }));
    }
    function Z(W) {
      const h = { ...q.value[W].headers ?? {} };
      h[""] = "", ae(W, { headers: h });
    }
    function f(W, h, le, $e) {
      const _e = {};
      for (const [we, P] of Object.entries(q.value[W].headers ?? {}))
        _e[we === h ? le : we] = we === h ? $e : P;
      ae(W, { headers: _e });
    }
    function E(W, h) {
      const le = { ...q.value[W].headers ?? {} };
      delete le[h], ae(W, { headers: le });
    }
    function j(W) {
      const h = W.extras ?? {};
      return Object.entries(h).map(([le, $e]) => ({ key: le, value: $e }));
    }
    function ke(W) {
      const h = { ...q.value[W].extras ?? {} };
      h[""] = "", ae(W, { extras: h });
    }
    function oe(W, h, le, $e) {
      const _e = {};
      for (const [we, P] of Object.entries(q.value[W].extras ?? {}))
        _e[we === h ? le : we] = we === h ? $e : P;
      ae(W, { extras: _e });
    }
    function R(W, h) {
      const le = { ...q.value[W].extras ?? {} };
      delete le[h], ae(W, { extras: le });
    }
    return (W, h) => {
      var le, $e, _e, we;
      return a(), n("section", Na, [
        e("div", Ma, [
          h[21] || (h[21] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: h[0] || (h[0] = (P) => W.$emit("reset"))
          }, "Reset section")) : b("", !0)
        ]),
        h[45] || (h[45] = e("p", { class: "kb-section__desc" }, " Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required. ", -1)),
        e("div", Va, [
          e("label", Da, [
            h[22] || (h[22] = F(" Title ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": i.titleCount > i.titleLimit }])
            }, c(i.titleCount) + "/" + c(i.titleLimit), 3)
          ]),
          e("div", Ha, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: i.message.title,
              "aria-invalid": !!i.titleError,
              onInput: h[1] || (h[1] = (P) => W.$emit("update", { title: P.target.value }))
            }, null, 40, ja),
            e("div", Wa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: h[2] || (h[2] = (P) => O("title"))
              }, "{{ .var }}"),
              T.value === "title" ? (a(), n("div", qa, [
                (a(!0), n(U, null, V(A.value, (P) => (a(), n("button", {
                  key: `title-var-${P}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (Q) => B("title", P)
                }, c(P), 9, Fa))), 128))
              ])) : b("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ie({ "--pct": Math.min(100, i.titleCount / i.titleLimit * 100) + "%" })
            }, [...h[23] || (h[23] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          i.titleError ? (a(), n("p", za, c(i.titleError), 1)) : b("", !0)
        ]),
        e("div", Ya, [
          e("label", Ka, [
            h[24] || (h[24] = F(" Message ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": i.bodyCount > i.bodyLimit }])
            }, c(i.bodyCount) + "/" + c(i.bodyLimit), 3)
          ]),
          e("div", Ga, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: i.message.body,
              "aria-invalid": !!i.bodyError,
              onInput: h[3] || (h[3] = (P) => W.$emit("update", { body: P.target.value }))
            }, null, 40, Ja),
            e("div", Qa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: h[4] || (h[4] = (P) => O("body"))
              }, "{{ .var }}"),
              T.value === "body" ? (a(), n("div", Xa, [
                (a(!0), n(U, null, V(A.value, (P) => (a(), n("button", {
                  key: `body-var-${P}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (Q) => B("body", P)
                }, c(P), 9, Za))), 128))
              ])) : b("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ie({ "--pct": Math.min(100, i.bodyCount / i.bodyLimit * 100) + "%" })
            }, [...h[25] || (h[25] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          i.bodyError ? (a(), n("p", en, c(i.bodyError), 1)) : b("", !0),
          e("label", tn, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!k.value.markdown,
              onChange: h[5] || (h[5] = (P) => W.$emit("update", { markdown: P.target.checked || void 0 }))
            }, null, 40, an),
            h[26] || (h[26] = e("span", { class: "kb-toggle-label" }, "Enable Markdown formatting", -1))
          ])
        ]),
        e("div", nn, [
          h[28] || (h[28] = e("label", { class: "kb-label" }, [
            F(" Tags "),
            e("span", { class: "kb-helper" }, [
              F("Emoji shortcodes displayed with the notification (e.g. "),
              e("code", null, "warning"),
              F(", "),
              e("code", null, "white_check_mark"),
              F(", "),
              e("code", null, "rotating_light"),
              F(").")
            ])
          ], -1)),
          e("div", sn, [
            (a(!0), n(U, null, V(te.value, (P) => (a(), n("span", {
              key: P,
              class: "kb-tag"
            }, [
              F(c(P) + " ", 1),
              e("button", {
                type: "button",
                class: "kb-tag__remove",
                onClick: (Q) => ce(P),
                "aria-label": "Remove tag"
              }, "×", 8, ln)
            ]))), 128)),
            je(e("input", {
              type: "text",
              class: "kb-input kb-input--tag",
              placeholder: "Add tag, press Enter",
              "onUpdate:modelValue": h[6] || (h[6] = (P) => G.value = P),
              onKeydown: H,
              onBlur: se
            }, null, 544), [
              [ut, G.value]
            ])
          ]),
          e("div", on, [
            h[27] || (h[27] = e("span", {
              class: "kb-helper",
              style: { "margin-right": "0.4rem" }
            }, "Common:", -1)),
            (a(), n(U, null, V(ne, (P) => e("button", {
              key: P,
              type: "button",
              class: xe(["kb-tag-chip", { "kb-tag-chip--active": te.value.includes(P) }]),
              onClick: (Q) => te.value.includes(P) ? ce(P) : (G.value = P, se())
            }, c(P), 11, rn)), 64))
          ])
        ]),
        e("div", un, [
          h[29] || (h[29] = e("label", { class: "kb-label" }, [
            F(" Icon URL "),
            e("span", { class: "kb-helper" }, "Custom notification icon (JPEG or PNG). Shown in the notification drawer.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://example.com/icon.png",
            value: k.value.icon ?? "",
            onInput: h[7] || (h[7] = (P) => W.$emit("update", { icon: P.target.value || void 0 }))
          }, null, 40, dn)
        ]),
        e("div", cn, [
          h[30] || (h[30] = e("label", { class: "kb-label" }, [
            F(" Image / Attachment URL "),
            e("span", { class: "kb-helper" }, [
              F("External file URL attached to the notification ("),
              e("code", null, "attach"),
              F("). Also used as hero image where supported.")
            ])
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.message.image_url ?? k.value.attach ?? "",
            "aria-invalid": !!i.imageUrlError,
            onInput: h[8] || (h[8] = (P) => W.$emit("update", { image_url: P.target.value || void 0, attach: P.target.value || void 0 }))
          }, null, 40, pn),
          i.imageUrlError ? (a(), n("p", mn, c(i.imageUrlError), 1)) : b("", !0),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Filename override (e.g. invoice.pdf) — optional",
            value: k.value.attachment_filename ?? "",
            onInput: h[9] || (h[9] = (P) => W.$emit("update", { attachment_filename: P.target.value || void 0 }))
          }, null, 40, vn)
        ]),
        e("div", bn, [
          h[31] || (h[31] = e("label", { class: "kb-label" }, [
            F(" Click URL ("),
            e("code", null, "click"),
            F(") "),
            e("span", { class: "kb-helper" }, "URL or deep link opened when the user taps the notification body.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: i.message.deep_link ?? "",
            "aria-invalid": !!i.deepLinkError,
            onInput: h[10] || (h[10] = (P) => W.$emit("update", { deep_link: P.target.value || void 0 }))
          }, null, 40, yn),
          i.deepLinkError ? (a(), n("p", hn, c(i.deepLinkError), 1)) : b("", !0)
        ]),
        e("div", fn, [
          e("label", { class: "kb-label" }, [
            h[32] || (h[32] = F(" Action buttons ", -1)),
            e("span", { class: "kb-helper" }, "Up to " + c(bt) + " interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.")
          ]),
          e("div", gn, [
            (a(!0), n(U, null, V(q.value, (P, Q) => (a(), n("div", {
              key: P.id || Q,
              class: "kb-action-card"
            }, [
              e("div", kn, [
                e("span", _n, "Button " + c(Q + 1), 1),
                e("div", $n, [
                  e("select", {
                    class: "kb-select kb-select--action-type",
                    value: P.action,
                    onChange: (z) => ye(Q, z.target.value)
                  }, [
                    (a(), n(U, null, V(pe, (z) => e("option", {
                      key: z.value,
                      value: z.value
                    }, c(z.label), 9, xn)), 64))
                  ], 40, wn),
                  e("label", Cn, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!P.clear,
                      onChange: (z) => ae(Q, { clear: z.target.checked || void 0 })
                    }, null, 40, Sn),
                    h[33] || (h[33] = e("span", { class: "kb-toggle-label" }, "Dismiss after tap", -1))
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "kb-btn-remove-action",
                  onClick: (z) => J(Q)
                }, "Remove", 8, In)
              ]),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label (e.g. View order)",
                value: P.label,
                onInput: (z) => ae(Q, { label: z.target.value })
              }, null, 40, Tn),
              P.action === "view" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input",
                placeholder: "URL to open (https:// or app://)",
                value: P.url ?? "",
                onInput: (z) => ae(Q, { url: z.target.value || void 0 })
              }, null, 40, An)) : P.action === "http" ? (a(), n(U, { key: 1 }, [
                e("div", Un, [
                  e("select", {
                    class: "kb-select kb-select--method",
                    value: P.method ?? "POST",
                    onChange: (z) => ae(Q, { method: z.target.value })
                  }, [
                    (a(), n(U, null, V(D, (z) => e("option", {
                      key: z,
                      value: z
                    }, c(z), 9, En)), 64))
                  ], 40, Rn),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "Endpoint URL",
                    value: P.url ?? "",
                    onInput: (z) => ae(Q, { url: z.target.value || void 0 })
                  }, null, 40, Pn)
                ]),
                e("textarea", {
                  class: "kb-textarea kb-textarea--sm",
                  rows: "2",
                  placeholder: 'Request body (e.g. {"status":"closed"})',
                  value: P.body ?? "",
                  onInput: (z) => ae(Q, { body: z.target.value || void 0 })
                }, null, 40, Bn),
                e("div", Ln, [
                  h[34] || (h[34] = e("span", { class: "kb-kv-label" }, "Headers", -1)),
                  (a(!0), n(U, null, V(Ce(P), (z, he) => (a(), n("div", {
                    key: he,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Header name",
                      value: z.key,
                      onInput: (ie) => f(Q, z.key, ie.target.value, z.value)
                    }, null, 40, On),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: z.value,
                      onInput: (ie) => f(Q, z.key, z.key, ie.target.value)
                    }, null, 40, Nn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (ie) => E(Q, z.key)
                    }, "×", 8, Mn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (z) => Z(Q)
                  }, "+ Add header", 8, Vn)
                ])
              ], 64)) : P.action === "broadcast" ? (a(), n(U, { key: 2 }, [
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "Intent (default: io.heckel.ntfy.USER_ACTION)",
                  value: P.intent ?? "",
                  onInput: (z) => ae(Q, { intent: z.target.value || void 0 })
                }, null, 40, Dn),
                e("div", Hn, [
                  h[35] || (h[35] = e("span", { class: "kb-kv-label" }, "Extras", -1)),
                  (a(!0), n(U, null, V(j(P), (z, he) => (a(), n("div", {
                    key: he,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Key",
                      value: z.key,
                      onInput: (ie) => oe(Q, z.key, ie.target.value, z.value)
                    }, null, 40, jn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: z.value,
                      onInput: (ie) => oe(Q, z.key, z.key, ie.target.value)
                    }, null, 40, Wn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (ie) => R(Q, z.key)
                    }, "×", 8, qn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (z) => ke(Q)
                  }, "+ Add extra", 8, Fn)
                ])
              ], 64)) : P.action === "copy" ? (a(), n("input", {
                key: 3,
                type: "text",
                class: "kb-input",
                placeholder: "Value to copy to clipboard",
                value: P.value ?? "",
                onInput: (z) => ae(Q, { value: z.target.value || void 0 })
              }, null, 40, zn)) : b("", !0)
            ]))), 128)),
            e("div", Yn, [
              e("button", {
                type: "button",
                class: "kb-btn-add-action",
                disabled: q.value.length >= bt,
                onClick: Y
              }, " Add action ", 8, Kn),
              e("div", Gn, [
                h[36] || (h[36] = e("span", { class: "kb-action-chips-label" }, "Quick add:", -1)),
                (a(), n(U, null, V(["View order", "Track shipment", "Dismiss"], (P) => e("button", {
                  key: P,
                  type: "button",
                  class: "kb-action-chip",
                  disabled: q.value.length >= bt,
                  onClick: () => {
                    const Q = [...q.value, { id: `action_${Date.now()}`, action: "view", label: P }];
                    W.$emit("update", { actions: Q });
                  }
                }, c(P), 9, Jn)), 64))
              ])
            ])
          ])
        ]),
        e("div", Qn, [
          h[37] || (h[37] = e("label", { class: "kb-label" }, [
            F(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Attach coordinates for rich notifications or open-in-maps support.")
          ], -1)),
          e("div", Xn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((le = k.value.location) == null ? void 0 : le.lat) ?? "",
              onInput: h[11] || (h[11] = (P) => {
                const Q = { ...k.value.location ?? {} }, z = P.target.value;
                Q.lat = z === "" ? void 0 : Number(z), W.$emit("update", { location: Q });
              })
            }, null, 40, Zn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: (($e = k.value.location) == null ? void 0 : $e.lon) ?? "",
              onInput: h[12] || (h[12] = (P) => {
                const Q = { ...k.value.location ?? {} }, z = P.target.value;
                Q.lon = z === "" ? void 0 : Number(z), W.$emit("update", { location: Q });
              })
            }, null, 40, es)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. HQ, Store name)",
            value: ((_e = k.value.location) == null ? void 0 : _e.name) ?? "",
            onInput: h[13] || (h[13] = (P) => {
              const Q = { ...k.value.location ?? {} };
              Q.name = P.target.value || void 0, W.$emit("update", { location: Q });
            })
          }, null, 40, ts),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Address (optional)",
            value: ((we = k.value.location) == null ? void 0 : we.address) ?? "",
            onInput: h[14] || (h[14] = (P) => {
              const Q = { ...k.value.location ?? {} };
              Q.address = P.target.value || void 0, W.$emit("update", { location: Q });
            })
          }, null, 40, as)
        ]),
        e("div", ns, [
          h[38] || (h[38] = e("label", { class: "kb-label" }, [
            F(" Email forward ("),
            e("code", null, "email"),
            F(") "),
            e("span", { class: "kb-helper" }, "Forward this notification to an email address.")
          ], -1)),
          e("input", {
            type: "email",
            class: "kb-input",
            placeholder: "recipient@example.com",
            value: k.value.email_forward ?? "",
            onInput: h[15] || (h[15] = (P) => W.$emit("update", { email_forward: P.target.value || void 0 }))
          }, null, 40, ss)
        ]),
        e("div", ls, [
          h[39] || (h[39] = e("label", { class: "kb-label" }, [
            F(" Phone call ("),
            e("code", null, "call"),
            F(") "),
            e("span", { class: "kb-helper" }, "Initiate a phone call to this number when the notification is received.")
          ], -1)),
          e("input", {
            type: "tel",
            class: "kb-input",
            placeholder: "+1 555 123 4567",
            value: k.value.call ?? "",
            onInput: h[16] || (h[16] = (P) => W.$emit("update", { call: P.target.value || void 0 }))
          }, null, 40, os)
        ]),
        e("div", is, [
          h[40] || (h[40] = tt('<label class="kb-label" data-v-03f4fc73> Delivery delay (<code data-v-03f4fc73>delay</code>) <span class="kb-helper" data-v-03f4fc73>Schedule delivery for later. Accepts durations (<code data-v-03f4fc73>30min</code>, <code data-v-03f4fc73>2h</code>, <code data-v-03f4fc73>1day</code>), times (<code data-v-03f4fc73>9am</code>, <code data-v-03f4fc73>8:30pm</code>), natural language (<code data-v-03f4fc73>tomorrow, 3pm</code>), or Unix timestamps. Max 3 days.</span></label>', 1)),
          e("div", rs, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. 30min, 2h, tomorrow 9am, 1693000000",
              value: k.value.delay ?? "",
              onInput: h[17] || (h[17] = (P) => W.$emit("update", { delay: P.target.value || void 0 }))
            }, null, 40, us),
            e("div", ds, [
              (a(), n(U, null, V(["30min", "1h", "4h", "tomorrow"], (P) => e("button", {
                key: P,
                type: "button",
                class: xe(["kb-delay-chip", { "kb-delay-chip--active": k.value.delay === P }]),
                onClick: (Q) => W.$emit("update", { delay: k.value.delay === P ? void 0 : P })
              }, c(P), 11, cs)), 64))
            ])
          ])
        ]),
        e("details", ps, [
          h[44] || (h[44] = e("summary", { class: "kb-advanced-toggles__summary" }, "Advanced options", -1)),
          e("div", ms, [
            e("label", vs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.cache,
                onChange: h[18] || (h[18] = (P) => W.$emit("update", { cache: P.target.checked || void 0 }))
              }, null, 40, bs),
              h[41] || (h[41] = e("span", { class: "kb-toggle-label" }, [
                F("Enable server-side caching ("),
                e("code", null, "cache"),
                F(")")
              ], -1))
            ]),
            e("label", ys, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.firebase,
                onChange: h[19] || (h[19] = (P) => W.$emit("update", { firebase: P.target.checked || void 0 }))
              }, null, 40, hs),
              h[42] || (h[42] = e("span", { class: "kb-toggle-label" }, [
                F("Deliver via Firebase Cloud Messaging ("),
                e("code", null, "firebase"),
                F(")")
              ], -1))
            ]),
            e("label", fs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.unified_push,
                onChange: h[20] || (h[20] = (P) => W.$emit("update", { unified_push: P.target.checked || void 0 }))
              }, null, 40, gs),
              h[43] || (h[43] = e("span", { class: "kb-toggle-label" }, [
                F("UnifiedPush delivery ("),
                e("code", null, "unified_push"),
                F(")")
              ], -1))
            ])
          ])
        ])
      ]);
    };
  }
}), _s = /* @__PURE__ */ Le(ks, [["__scopeId", "data-v-03f4fc73"]]), $s = { class: "kb-section kb-section--inline-personalization" }, ws = { class: "kb-field" }, xs = { class: "kb-insert-row" }, Cs = ["value"], Ss = { class: "kb-field" }, Is = { class: "kb-insert-row" }, Ts = { class: "kb-field" }, As = { class: "kb-variable-list" }, Us = /* @__PURE__ */ Pe({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(i, { emit: p }) {
    var H;
    const m = i, y = p, k = [
      "first_name",
      "last_name",
      "full_name",
      "user_id",
      "app_name",
      "order_id",
      "order_status",
      "tracking_url",
      "coupon_code",
      "cart_total",
      "city",
      "country"
    ], S = [
      "first_name",
      "last_name",
      "full_name",
      "order_id",
      "order_status",
      "tracking_url",
      "delivery_date",
      "appointment_date",
      "appointment_time",
      "otp_code",
      "coupon_code",
      "product_name",
      "store_name",
      "support_phone",
      "city",
      "country"
    ], A = $(
      () => (m.targets ?? []).includes("footer") ? S : k
    ), T = re(
      (H = m.variableOptions) != null && H.length ? [...m.variableOptions] : [...A.value]
    ), O = re(T.value[0] ?? A.value[0]), B = re("");
    Ne(
      () => m.variableOptions,
      (ne) => {
        ne && ne.length ? (T.value = [...ne], T.value.includes(O.value) || (O.value = T.value[0])) : (T.value = [...A.value], T.value.includes(O.value) || (O.value = T.value[0]));
      }
    ), Ne(
      A,
      (ne) => {
        var q;
        (q = m.variableOptions) != null && q.length || (T.value = [...ne], T.value.includes(O.value) || (O.value = T.value[0]));
      }
    );
    const G = $(() => T.value), te = $(() => {
      var q;
      return (q = m.targets) != null && q.length ? m.targets : ["title", "body"];
    });
    function se(ne) {
      y("insertVariable", { variable: O.value, field: ne });
    }
    function ce() {
      const ne = B.value.trim();
      ne && (T.value.includes(ne) || (T.value = [...T.value, ne]), O.value = ne, B.value = "");
    }
    return (ne, q) => (a(), n("section", $s, [
      q[9] || (q[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      q[10] || (q[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", ws, [
        q[5] || (q[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", xs, [
          je(e("select", {
            "onUpdate:modelValue": q[0] || (q[0] = (pe) => O.value = pe),
            class: "kb-select"
          }, [
            (a(!0), n(U, null, V(G.value, (pe) => (a(), n("option", {
              key: pe,
              value: pe
            }, c(pe), 9, Cs))), 128))
          ], 512), [
            [Ge, O.value]
          ]),
          te.value.includes("title") ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[1] || (q[1] = (pe) => se("title"))
          }, " Into title ")) : b("", !0),
          te.value.includes("body") ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[2] || (q[2] = (pe) => se("body"))
          }, " Into message ")) : b("", !0),
          te.value.includes("footer") ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[3] || (q[3] = (pe) => se("footer"))
          }, " Into footer ")) : b("", !0)
        ])
      ]),
      e("div", Ss, [
        q[6] || (q[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Is, [
          je(e("input", {
            "onUpdate:modelValue": q[4] || (q[4] = (pe) => B.value = pe),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [ut, B.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ce
          }, " Add ")
        ])
      ]),
      e("div", Ts, [
        q[7] || (q[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        q[8] || (q[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", As, [
          (a(!0), n(U, null, V(G.value, (pe) => (a(), n("li", { key: pe }, [
            e("code", null, "{{ ." + c(pe) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ Le(Us, [["__scopeId", "data-v-ab96d6bb"]]), Rs = { class: "kb-section kb-section--template-type" }, Es = { class: "kb-field" }, Ps = { class: "kb-radio-group" }, Bs = { class: "kb-radio" }, Ls = ["checked"], Os = { class: "kb-radio" }, Ns = ["checked"], Ms = /* @__PURE__ */ Pe({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(i, { emit: p }) {
    const m = p;
    return (y, k) => (a(), n("section", Rs, [
      k[5] || (k[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      k[6] || (k[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Es, [
        e("div", Ps, [
          e("label", Bs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: i.templateType === "transactional",
              onChange: k[0] || (k[0] = (S) => m("update", "transactional"))
            }, null, 40, Ls),
            k[2] || (k[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Os, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: i.templateType === "marketing",
              onChange: k[1] || (k[1] = (S) => m("update", "marketing"))
            }, null, 40, Ns),
            k[3] || (k[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        k[4] || (k[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Le(Ms, [["__scopeId", "data-v-ff2e1bd8"]]), Vs = { class: "kb-section" }, Ds = { class: "kb-section__head" }, Hs = { class: "kb-section__desc" }, js = { class: "kb-field" }, Ws = { class: "kb-radio-group" }, qs = { class: "kb-radio" }, Fs = ["checked"], zs = { class: "kb-radio" }, Ys = ["checked"], Ks = {
  key: 0,
  class: "kb-field kb-row"
}, Gs = ["value"], Js = ["value"], Qs = { class: "kb-field" }, Xs = ["value"], Zs = ["value"], el = { class: "kb-field" }, tl = ["value"], al = ["value"], nl = { class: "kb-field" }, sl = { class: "kb-checkbox" }, ll = ["checked"], ol = /* @__PURE__ */ Pe({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i) {
    const p = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (m, y) => {
      var k;
      return a(), n("section", Vs, [
        e("div", Ds, [
          y[8] || (y[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: y[0] || (y[0] = (S) => m.$emit("reset"))
          }, " Reset section ")) : b("", !0)
        ]),
        e("p", Hs, c(i.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", js, [
          y[11] || (y[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Ws, [
            e("label", qs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !i.delivery.scheduled_at,
                onChange: y[1] || (y[1] = (S) => m.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Fs),
              y[9] || (y[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", zs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!i.delivery.scheduled_at,
                onChange: y[2] || (y[2] = (S) => m.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Ys),
              y[10] || (y[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        i.delivery.scheduled_at ? (a(), n("div", Ks, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (k = i.delivery.scheduled_at) == null ? void 0 : k.slice(0, 16),
            onInput: y[3] || (y[3] = (S) => m.$emit("update", { scheduled_at: S.target.value }))
          }, null, 40, Gs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: i.delivery.timezone,
            onInput: y[4] || (y[4] = (S) => m.$emit("update", { timezone: S.target.value }))
          }, null, 40, Js)
        ])) : b("", !0),
        i.showPushOptions ? (a(), n(U, { key: 1 }, [
          e("div", Qs, [
            y[12] || (y[12] = e("label", { class: "kb-label" }, [
              F(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: i.delivery.ttl,
              onChange: y[5] || (y[5] = (S) => m.$emit("update", { ttl: Number(S.target.value) }))
            }, [
              (a(!0), n(U, null, V(C(la), (S) => (a(), n("option", {
                key: S,
                value: S
              }, c(p[S] ?? S + "s"), 9, Zs))), 128))
            ], 40, Xs)
          ]),
          e("div", el, [
            y[13] || (y[13] = e("label", { class: "kb-label" }, [
              F(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: i.delivery.priority,
              onChange: y[6] || (y[6] = (S) => m.$emit("update", { priority: S.target.value }))
            }, [
              (a(!0), n(U, null, V(C(Ht), (S) => (a(), n("option", {
                key: S,
                value: S
              }, c(S), 9, al))), 128))
            ], 40, tl)
          ]),
          e("div", nl, [
            e("label", sl, [
              e("input", {
                type: "checkbox",
                checked: i.delivery.quiet_hours,
                onChange: y[7] || (y[7] = (S) => m.$emit("update", { quiet_hours: !i.delivery.quiet_hours }))
              }, null, 40, ll),
              y[14] || (y[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : b("", !0)
      ]);
    };
  }
}), il = /* @__PURE__ */ Le(ol, [["__scopeId", "data-v-5707a2a7"]]), rl = { class: "kb-accordion" }, ul = { class: "kb-accordion__body" }, dl = { class: "kb-field" }, cl = ["value"], pl = { class: "kb-field" }, ml = { class: "kb-checkbox" }, vl = ["checked"], bl = /* @__PURE__ */ Pe({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(i) {
    return (p, m) => (a(), n("details", rl, [
      m[4] || (m[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", ul, [
        e("div", dl, [
          m[2] || (m[2] = e("label", { class: "kb-label" }, [
            F(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: i.delivery.collapse_key,
            onInput: m[0] || (m[0] = (y) => p.$emit("update", { collapse_key: y.target.value || void 0 }))
          }, null, 40, cl)
        ]),
        e("div", pl, [
          e("label", ml, [
            e("input", {
              type: "checkbox",
              checked: i.delivery.silent_push,
              onChange: m[1] || (m[1] = (y) => p.$emit("update", { silent_push: !i.delivery.silent_push }))
            }, null, 40, vl),
            m[3] || (m[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), yl = /* @__PURE__ */ Le(bl, [["__scopeId", "data-v-699e4501"]]);
function Qe(i, p) {
  return !i || typeof i != "string" ? i : i.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, y) => {
    const S = String(y).trim().replace(/^\./, "");
    return S in p ? String(p[S]) : m;
  });
}
const et = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], hl = { class: "kb-preview" }, fl = { class: "kb-preview__toggle" }, gl = { class: "kb-preview__mode" }, kl = { class: "kb-preview__quality" }, _l = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, $l = ["src"], wl = { class: "kb-android-body-row" }, xl = { class: "kb-android-body-content" }, Cl = {
  key: 0,
  class: "kb-android-title"
}, Sl = {
  key: 1,
  class: "kb-android-text"
}, Il = {
  key: 2,
  class: "kb-android-location-line"
}, Tl = {
  key: 0,
  class: "kb-android-thumb"
}, Al = ["src"], Ul = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Rl = ["src"], El = {
  key: 0,
  class: "kb-preview-map__caption"
}, Pl = {
  key: 2,
  class: "kb-android-actions"
}, Bl = {
  key: 3,
  class: "kb-preview-warning"
}, Ll = { class: "kb-ios-banner" }, Ol = { class: "kb-ios-content" }, Nl = {
  key: 0,
  class: "kb-ios-title"
}, Ml = {
  key: 1,
  class: "kb-ios-text"
}, Vl = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, Dl = ["src"], Hl = {
  key: 0,
  class: "kb-preview-map__caption"
}, jl = {
  key: 4,
  class: "kb-ios-actions"
}, Wl = {
  key: 5,
  class: "kb-preview-warning"
}, ql = {
  key: 0,
  class: "kb-ios-thumb"
}, Fl = ["src"], zl = { class: "kb-web-toast" }, Yl = { class: "kb-web-body" }, Kl = {
  key: 0,
  class: "kb-web-title"
}, Gl = {
  key: 1,
  class: "kb-web-text"
}, Jl = {
  key: 3,
  class: "kb-web-image"
}, Ql = ["src"], Xl = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Zl = ["src"], eo = {
  key: 0,
  class: "kb-preview-map__caption"
}, to = {
  key: 0,
  class: "kb-web-actions"
}, ao = {
  key: 1,
  class: "kb-preview-warning"
}, no = /* @__PURE__ */ Pe({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(i) {
    const p = i, m = re("shade"), y = re("banner"), k = re("toast"), S = $(() => m.value === "expanded"), A = $(
      () => p.getPreview(p.selectedPlatform, {
        expanded: p.selectedPlatform === "android" ? S.value : void 0
      })
    ), T = $(() => {
      const Z = A.value;
      return p.previewProfile ? {
        ...Z,
        title: Qe((Z == null ? void 0 : Z.title) ?? "", p.previewProfile.data),
        body: Qe((Z == null ? void 0 : Z.body) ?? "", p.previewProfile.data)
      } : Z;
    }), O = {
      android: {
        heads_up: { title: 38, body: 72 },
        shade: { title: 46, body: 132 },
        expanded: { title: 60, body: 260 }
      },
      ios: {
        banner: { title: 44, body: 92 },
        lock: { title: 56, body: 160 },
        center: { title: 72, body: 260 }
      },
      web: {
        toast: { title: 58, body: 130 },
        center: { title: 72, body: 260 }
      }
    };
    function B(Z, f) {
      const E = (Z ?? "").trim();
      return E ? E.length <= f ? E : `${E.slice(0, Math.max(0, f - 1)).trimEnd()}…` : "";
    }
    const G = $(() => p.selectedPlatform === "android" ? m.value : p.selectedPlatform === "ios" ? y.value : k.value), te = $(() => (O[p.selectedPlatform] ?? O.web)[G.value] ?? { title: 60, body: 160 }), se = $(
      () => {
        var Z;
        return B((Z = T.value) == null ? void 0 : Z.title, te.value.title);
      }
    ), ce = $(
      () => {
        var Z;
        return B((Z = T.value) == null ? void 0 : Z.body, te.value.body);
      }
    ), H = { android: 3, ios: 4, web: 2 }, ne = $(
      () => {
        var Z;
        return Array.isArray((Z = T.value) == null ? void 0 : Z.actions) ? T.value.actions : [];
      }
    ), q = $(
      () => ne.value.slice(0, H[p.selectedPlatform] ?? 2)
    ), pe = $(
      () => Math.max(0, ne.value.length - q.value.length)
    ), D = $(() => {
      var Z;
      return (((Z = p.message) == null ? void 0 : Z.deep_link) ?? "").trim();
    }), Y = $(() => D.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(D.value) : !1), J = $(() => D.value ? D.value.length <= 40 ? D.value : `${D.value.slice(0, 37)}…` : ""), ae = $(() => {
      var f, E, j;
      const Z = [];
      return (f = p.delivery) != null && f.priority && Z.push(`Priority: ${p.delivery.priority}`), typeof ((E = p.delivery) == null ? void 0 : E.ttl) == "number" && Z.push(`TTL: ${p.delivery.ttl}s`), (j = p.delivery) != null && j.silent_push && Z.push("Silent push"), Z;
    }), ye = $(() => {
      var oe;
      const Z = (oe = T.value) == null ? void 0 : oe.location;
      if (!Z || Z.lat == null && Z.lon == null) return null;
      const f = Number(Z.lat) || 0, E = Number(Z.lon) || 0, j = 8e-3, ke = [E - j, f - j, E + j, f + j].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(ke)}&layer=mapnik&marker=${f},${E}`;
    }), Ce = $(() => {
      var f;
      const Z = (f = T.value) == null ? void 0 : f.location;
      return Z && (Z.lat != null || Z.lon != null || Z.name || Z.address);
    });
    return (Z, f) => {
      var E, j, ke, oe, R, W, h, le, $e, _e, we, P, Q, z, he, ie;
      return a(), n("div", hl, [
        e("div", fl, [
          e("label", gl, [
            f[6] || (f[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            i.selectedPlatform === "android" ? je((a(), n("select", {
              key: 0,
              "onUpdate:modelValue": f[0] || (f[0] = (me) => m.value = me),
              class: "kb-preview__mode-select"
            }, [...f[3] || (f[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ge, m.value]
            ]) : i.selectedPlatform === "ios" ? je((a(), n("select", {
              key: 1,
              "onUpdate:modelValue": f[1] || (f[1] = (me) => y.value = me),
              class: "kb-preview__mode-select"
            }, [...f[4] || (f[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ge, y.value]
            ]) : je((a(), n("select", {
              key: 2,
              "onUpdate:modelValue": f[2] || (f[2] = (me) => k.value = me),
              class: "kb-preview__mode-select"
            }, [...f[5] || (f[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ge, k.value]
            ])
          ]),
          e("div", kl, [
            (a(!0), n(U, null, V(ae.value, (me) => (a(), n("span", {
              key: me,
              class: "kb-preview__badge"
            }, c(me), 1))), 128))
          ])
        ]),
        i.selectedPlatform === "android" ? (a(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: xe(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${m.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          f[9] || (f[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: xe(["kb-android-notification", { "kb-android-notification--expanded": S.value }])
          }, [
            f[8] || (f[8] = tt('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: xe(["kb-android-body", { "kb-android-body--expanded": S.value }])
            }, [
              S.value && T.value.imageUrl ? (a(), n("div", _l, [
                e("img", {
                  src: T.value.imageUrl,
                  alt: ""
                }, null, 8, $l)
              ])) : b("", !0),
              e("div", wl, [
                e("div", xl, [
                  se.value ? (a(), n("div", Cl, c(se.value), 1)) : b("", !0),
                  ce.value ? (a(), n("div", Sl, c(ce.value), 1)) : b("", !0),
                  Ce.value && !S.value && ((E = T.value.location) != null && E.name || (j = T.value.location) != null && j.address) ? (a(), n("div", Il, [
                    f[7] || (f[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    F(" " + c(((ke = T.value.location) == null ? void 0 : ke.name) || ((oe = T.value.location) == null ? void 0 : oe.address)), 1)
                  ])) : b("", !0),
                  D.value ? (a(), n("div", {
                    key: 3,
                    class: xe(["kb-preview-link", { "kb-preview-link--invalid": !Y.value }])
                  }, c(Y.value ? J.value : "Invalid deep link format"), 3)) : b("", !0)
                ]),
                !S.value && T.value.imageUrl ? (a(), n("div", Tl, [
                  e("img", {
                    src: T.value.imageUrl,
                    alt: ""
                  }, null, 8, Al)
                ])) : b("", !0)
              ]),
              Ce.value && ye.value && S.value ? (a(), n("div", Ul, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Rl),
                (R = T.value.location) != null && R.name || (W = T.value.location) != null && W.address ? (a(), n("div", El, c(((h = T.value.location) == null ? void 0 : h.name) || ((le = T.value.location) == null ? void 0 : le.address)), 1)) : b("", !0)
              ])) : b("", !0),
              q.value.length ? (a(), n("div", Pl, [
                (a(!0), n(U, null, V(q.value, (me) => (a(), n("button", {
                  key: me.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, c(me.label || "Action"), 1))), 128))
              ])) : b("", !0),
              pe.value > 0 ? (a(), n("p", Bl, " Showing " + c(q.value.length) + " of " + c(ne.value.length) + " actions on " + c(i.selectedPlatform) + ". ", 1)) : b("", !0)
            ], 2)
          ], 2)
        ], 2)) : i.selectedPlatform === "ios" ? (a(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: xe(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${y.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          f[12] || (f[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", Ll, [
            f[11] || (f[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Ol, [
              f[10] || (f[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              se.value ? (a(), n("div", Nl, c(se.value), 1)) : b("", !0),
              ce.value ? (a(), n("div", Ml, c(ce.value), 1)) : b("", !0),
              D.value ? (a(), n("div", {
                key: 2,
                class: xe(["kb-preview-link", { "kb-preview-link--invalid": !Y.value }])
              }, c(Y.value ? J.value : "Invalid deep link format"), 3)) : b("", !0),
              Ce.value && ye.value ? (a(), n("div", Vl, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Dl),
                ($e = T.value.location) != null && $e.name || (_e = T.value.location) != null && _e.address ? (a(), n("div", Hl, c(((we = T.value.location) == null ? void 0 : we.name) || ((P = T.value.location) == null ? void 0 : P.address)), 1)) : b("", !0)
              ])) : b("", !0),
              q.value.length ? (a(), n("div", jl, [
                (a(!0), n(U, null, V(q.value, (me) => (a(), n("button", {
                  key: me.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, c(me.label || "Action"), 1))), 128))
              ])) : b("", !0),
              pe.value > 0 ? (a(), n("p", Wl, " Showing " + c(q.value.length) + " of " + c(ne.value.length) + " actions on " + c(i.selectedPlatform) + ". ", 1)) : b("", !0)
            ]),
            T.value.imageUrl ? (a(), n("div", ql, [
              e("img", {
                src: T.value.imageUrl,
                alt: ""
              }, null, 8, Fl)
            ])) : b("", !0)
          ])
        ], 2)) : (a(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: xe(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${k.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          f[14] || (f[14] = tt('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", zl, [
            f[13] || (f[13] = tt('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", Yl, [
              se.value ? (a(), n("div", Kl, c(se.value), 1)) : b("", !0),
              ce.value ? (a(), n("div", Gl, c(ce.value), 1)) : b("", !0),
              D.value ? (a(), n("div", {
                key: 2,
                class: xe(["kb-preview-link", { "kb-preview-link--invalid": !Y.value }])
              }, c(Y.value ? J.value : "Invalid deep link format"), 3)) : b("", !0),
              T.value.imageUrl ? (a(), n("div", Jl, [
                e("img", {
                  src: T.value.imageUrl,
                  alt: ""
                }, null, 8, Ql)
              ])) : b("", !0),
              Ce.value && ye.value ? (a(), n("div", Xl, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Zl),
                (Q = T.value.location) != null && Q.name || (z = T.value.location) != null && z.address ? (a(), n("div", eo, c(((he = T.value.location) == null ? void 0 : he.name) || ((ie = T.value.location) == null ? void 0 : ie.address)), 1)) : b("", !0)
              ])) : b("", !0)
            ]),
            q.value.length ? (a(), n("div", to, [
              (a(!0), n(U, null, V(q.value, (me, Re) => (a(), n("button", {
                key: me.id || Re,
                type: "button",
                class: xe(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Re) > 0 }])
              }, c(me.label || "Action"), 3))), 128))
            ])) : b("", !0),
            pe.value > 0 ? (a(), n("p", ao, " Showing " + c(q.value.length) + " of " + c(ne.value.length) + " actions on " + c(i.selectedPlatform) + ". ", 1)) : b("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), so = /* @__PURE__ */ Le(no, [["__scopeId", "data-v-4fc616d9"]]), lo = { class: "kb-version-dialog" }, oo = {
  key: 0,
  class: "kb-version-empty"
}, io = {
  key: 1,
  class: "kb-version-list"
}, ro = { class: "kb-version-item-label" }, uo = ["onClick"], co = { class: "kb-version-actions" }, po = /* @__PURE__ */ Pe({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(i, { emit: p }) {
    const m = p;
    function y(k) {
      try {
        return new Date(k).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return k;
      }
    }
    return (k, S) => i.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: S[1] || (S[1] = aa((A) => m("close"), ["escape"]))
    }, [
      e("div", lo, [
        S[2] || (S[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        S[3] || (S[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        i.versions.length === 0 ? (a(), n("div", oo, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", io, [
          (a(!0), n(U, null, V(i.versions, (A) => (a(), n("li", {
            key: A.id,
            class: "kb-version-item"
          }, [
            e("span", ro, c(A.label || y(A.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (T) => {
                m("restore", A.snapshot), m("close");
              }
            }, " Restore ", 8, uo)
          ]))), 128))
        ])),
        e("div", co, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: S[0] || (S[0] = (A) => m("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : b("", !0);
  }
}), Jt = /* @__PURE__ */ Le(po, [["__scopeId", "data-v-ce35a513"]]), Ut = [
  {
    id: "simple-alert",
    label: "Simple alert",
    campaign: {
      message: {
        title: "Heads up",
        body: "Your update is ready.",
        variables: [],
        tags: ["bell"]
      }
    }
  },
  {
    id: "promo-image",
    label: "Promotion with image",
    campaign: {
      message: {
        title: "Special offer inside",
        body: "Tap to see your exclusive deal.",
        image_url: "https://example.com/promo.png",
        attach: "https://example.com/promo.png",
        icon: "https://example.com/icon.png",
        tags: ["loudspeaker", "fire"],
        variables: []
      }
    }
  },
  {
    id: "transactional",
    label: "Transactional",
    campaign: {
      message: {
        title: "Order {{ .order_id }} update",
        body: "Hi {{ .first_name }}, your order has shipped.",
        variables: ["first_name", "order_id"],
        tags: ["package", "truck"],
        actions: [
          { id: "act_1", action: "view", label: "Track order", url: "https://example.com/orders/{{.order_id}}", clear: !0 }
        ]
      }
    }
  },
  {
    id: "location-alert",
    label: "Location / Store nearby",
    campaign: {
      message: {
        title: "We're nearby",
        body: "Visit our store – tap to open in maps.",
        variables: [],
        tags: ["round_pushpin"],
        location: {
          lat: 6.5244,
          lon: 3.3792,
          name: "Flagship Store",
          address: "12 Marina Rd, Lagos"
        },
        actions: [
          { id: "act_1", action: "view", label: "Open in Maps", url: "https://maps.google.com/?q=6.5244,3.3792", clear: !1 }
        ]
      }
    }
  },
  {
    id: "ntfy-http-action",
    label: "HTTP action (server callback)",
    campaign: {
      message: {
        title: "Action required",
        body: "Tap a button to respond.",
        variables: [],
        tags: ["rotating_light"],
        actions: [
          {
            id: "act_1",
            action: "http",
            label: "Approve",
            url: "https://api.example.com/approve",
            method: "POST",
            headers: { Authorization: "Bearer <token>", "Content-Type": "application/json" },
            body: '{"status":"approved"}',
            clear: !0
          },
          {
            id: "act_2",
            action: "http",
            label: "Reject",
            url: "https://api.example.com/reject",
            method: "POST",
            body: '{"status":"rejected"}',
            clear: !0
          }
        ]
      }
    }
  },
  {
    id: "ntfy-copy-otp",
    label: "OTP copy-to-clipboard",
    campaign: {
      message: {
        title: "Your verification code",
        body: "Use code {{ .otp_code }} to complete sign-in. Valid for 5 minutes.",
        variables: ["otp_code"],
        tags: ["key"],
        actions: [
          { id: "act_1", action: "copy", label: "Copy code", value: "{{.otp_code}}", clear: !0 }
        ]
      }
    }
  },
  {
    id: "ntfy-scheduled",
    label: "Scheduled / delayed send",
    campaign: {
      message: {
        title: "Morning briefing",
        body: "Your daily summary is ready.",
        variables: [],
        tags: ["calendar"],
        delay: "9am",
        cache: !0,
        firebase: !0
      }
    }
  },
  {
    id: "ntfy-broadcast",
    label: "Android broadcast (automation)",
    campaign: {
      message: {
        title: "Automation trigger",
        body: "Tap to fire the Android intent.",
        variables: [],
        tags: ["zap"],
        actions: [
          {
            id: "act_1",
            action: "broadcast",
            label: "Take picture",
            intent: "io.heckel.ntfy.USER_ACTION",
            extras: { cmd: "pic", camera: "front" },
            clear: !0
          }
        ]
      }
    }
  },
  {
    id: "ntfy-email-forward",
    label: "Email forward",
    campaign: {
      message: {
        title: "Alert – also emailed",
        body: "This notification is also forwarded to your inbox.",
        variables: [],
        tags: ["envelope"],
        email_forward: "you@example.com"
      }
    }
  }
], mo = [
  {
    id: "wa-text-simple",
    label: "Text - Simple",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your order is confirmed.",
        variables: ["first_name"],
        template_type: "text",
        template_category: "utility",
        template_language: "en",
        template_name: "wa_text_simple",
        vertical: "Order Confirmations",
        template_example: "Hi John, your order is confirmed.",
        enable_sample: !0
      }
    }
  },
  {
    id: "wa-text-complex",
    label: "Text - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your order {{ .order_id }} has shipped and will arrive by tomorrow.",
        variables: ["first_name", "order_id"],
        template_type: "text",
        template_category: "utility",
        template_language: "en",
        template_name: "wa_text_complex",
        vertical: "Order Updates",
        template_example: "Hi John, your order ORD-12345 has shipped and will arrive by tomorrow.",
        header_type: "text",
        header: "Order update",
        footer: "Reply STOP to unsubscribe",
        enable_sample: !0,
        allow_category_change: !1,
        buttons: [
          { id: "btn_1", label: "Track order", type: "url", url: "https://example.com/orders/{{ .order_id }}", url_example: "https://example.com/orders/ORD-12345" },
          { id: "btn_2", label: "Contact support", type: "quick_reply" }
        ]
      }
    }
  },
  {
    id: "wa-image-simple",
    label: "Image - Simple",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, discover our latest collection.",
        variables: ["first_name"],
        template_type: "image",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_image_simple",
        vertical: "Promotions",
        template_example: "Hi John, discover our latest collection.",
        header_type: "image",
        media_url: "https://via.placeholder.com/600x400.png?text=New+Collection",
        media_handle: "",
        enable_sample: !0
      }
    }
  },
  {
    id: "wa-image-complex",
    label: "Image - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, enjoy 25% off selected items this weekend only.",
        variables: ["first_name"],
        template_type: "image",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_image_complex",
        vertical: "Promotions",
        template_example: "Hi John, enjoy 25% off selected items this weekend only.",
        header_type: "image",
        media_url: "https://via.placeholder.com/600x400.png?text=Flash+Sale",
        media_handle: "",
        footer: "Offer valid while stock lasts",
        enable_sample: !0,
        buttons: [
          { id: "btn_1", label: "View deals", type: "url", url: "https://example.com/deals", url_example: "https://example.com/deals" },
          { id: "btn_2", label: "Copy promo code", type: "copy_code", example: "SALE25" }
        ]
      }
    }
  },
  {
    id: "wa-video-simple",
    label: "Video - Simple",
    campaign: {
      message: {
        title: "",
        body: "Watch this quick update on our newest product.",
        variables: [],
        template_type: "video",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_video_simple",
        vertical: "Product Showcase",
        template_example: "Watch this quick update on our newest product.",
        header_type: "video",
        media_url: "https://example.com/product-teaser.mp4",
        media_handle: "",
        enable_sample: !0
      }
    }
  },
  {
    id: "wa-video-complex",
    label: "Video - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, check the demo and tap below to book a session.",
        variables: ["first_name"],
        template_type: "video",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_video_complex",
        vertical: "Product Demo",
        template_example: "Hi John, check the demo and tap below to book a session.",
        header_type: "video",
        media_url: "https://example.com/live-walkthrough.mp4",
        media_handle: "",
        footer: "Spots are limited",
        enable_sample: !0,
        buttons: [
          { id: "btn_1", label: "Book slot", type: "url", url: "https://example.com/book-demo", url_example: "https://example.com/book-demo" },
          { id: "btn_2", label: "Remind me later", type: "quick_reply" }
        ]
      }
    }
  },
  {
    id: "wa-document-simple",
    label: "Document - Simple",
    campaign: {
      message: {
        title: "",
        body: "Please find your invoice attached.",
        variables: [],
        template_type: "document",
        template_category: "utility",
        template_language: "en",
        template_name: "wa_document_simple",
        vertical: "Billing",
        template_example: "Please find your invoice attached.",
        header_type: "document",
        document_filename: "invoice.pdf",
        media_url: "https://example.com/invoice.pdf",
        media_handle: "",
        enable_sample: !0
      }
    }
  },
  {
    id: "wa-document-complex",
    label: "Document - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, here is the receipt for order {{ .order_id }}.",
        variables: ["first_name", "order_id"],
        template_type: "document",
        template_category: "utility",
        template_language: "en",
        template_name: "wa_document_complex",
        vertical: "Order Documents",
        template_example: "Hi John, here is the receipt for order ORD-12345.",
        header_type: "document",
        document_filename: "receipt-{{ .order_id }}.pdf",
        media_url: "https://example.com/receipt.pdf",
        media_handle: "",
        footer: "For questions, reply to this message",
        enable_sample: !0,
        buttons: [
          { id: "btn_1", label: "Download again", type: "url", url: "https://example.com/receipt/{{ .order_id }}", url_example: "https://example.com/receipt/ORD-12345" },
          { id: "btn_2", label: "Need help", type: "quick_reply" }
        ]
      }
    }
  },
  {
    id: "wa-carousel-simple",
    label: "Carousel - Simple",
    campaign: {
      message: {
        title: "",
        body: "Swipe through our featured picks.",
        variables: [],
        template_type: "carousel",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_carousel_simple",
        vertical: "Product Showcase",
        template_example: "Swipe through our featured picks.",
        enable_sample: !0,
        cards: [
          {
            id: "card_1",
            headerType: "IMAGE",
            mediaId: "",
            body: "Starter Bundle – everything you need.",
            sampleText: "Starter Bundle – everything you need.",
            buttons: [
              { type: "URL", label: "View", url: "https://example.com/starter", url_example: "https://example.com/starter" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "wa-carousel-complex",
    label: "Carousel - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, explore these personalized recommendations.",
        variables: ["first_name"],
        template_type: "carousel",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_carousel_complex",
        vertical: "Product Showcase",
        template_example: "Hi John, explore these personalized recommendations.",
        enable_sample: !0,
        cards: [
          {
            id: "card_1",
            headerType: "IMAGE",
            mediaId: "",
            body: "Trail Sneakers – built for the long run.",
            sampleText: "Trail Sneakers – built for the long run.",
            buttons: [
              { type: "URL", label: "Shop sneakers", url: "https://example.com/sneakers", url_example: "https://example.com/sneakers" },
              { type: "QUICK_REPLY", label: "Not for me" }
            ]
          },
          {
            id: "card_2",
            headerType: "IMAGE",
            mediaId: "",
            body: "City Backpack – carry more, carry light.",
            sampleText: "City Backpack – carry more, carry light.",
            buttons: [
              { type: "URL", label: "Shop backpack", url: "https://example.com/backpack", url_example: "https://example.com/backpack" },
              { type: "QUICK_REPLY", label: "Not for me" }
            ]
          },
          {
            id: "card_3",
            headerType: "IMAGE",
            mediaId: "",
            body: "Fitness Watch – track every move.",
            sampleText: "Fitness Watch – track every move.",
            buttons: [
              { type: "URL", label: "Shop watch", url: "https://example.com/watch", url_example: "https://example.com/watch" },
              { type: "QUICK_REPLY", label: "Not for me" }
            ]
          }
        ]
      }
    }
  },
  {
    id: "wa-flow-simple",
    label: "Flow - Simple",
    campaign: {
      message: {
        title: "",
        body: "Tap below to complete your request in a guided flow.",
        variables: [],
        template_type: "flow",
        template_category: "utility",
        template_language: "en",
        template_name: "wa_flow_simple",
        vertical: "Support",
        template_example: "Tap below to complete your request in a guided flow.",
        flow_id: "flow_support_v1",
        flow_cta_label: "Open flow",
        enable_sample: !0
      }
    }
  },
  {
    id: "wa-flow-complex",
    label: "Flow - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, use the flow to choose your slot and confirm.",
        variables: ["first_name"],
        template_type: "flow",
        template_category: "utility",
        template_language: "en",
        template_name: "wa_flow_complex",
        vertical: "Booking",
        template_example: "Hi John, use the flow to choose your slot and confirm.",
        flow_id: "flow_booking_v2",
        flow_cta_label: "Start booking",
        footer: "Estimated completion time: 1 minute",
        enable_sample: !0,
        buttons: [{ id: "btn_1", label: "Need agent help", type: "quick_reply" }]
      }
    }
  },
  {
    id: "wa-lto-simple",
    label: "Limited-time offer - Simple",
    campaign: {
      message: {
        title: "",
        body: "Offer ends today. Tap to claim now.",
        variables: [],
        template_type: "lto",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_lto_simple",
        vertical: "Promotions",
        template_example: "Offer ends today. Tap to claim now.",
        lto_expiry: "Today, 11:59 PM",
        enable_sample: !0
      }
    }
  },
  {
    id: "wa-lto-complex",
    label: "Limited-time offer - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your exclusive deal expires soon. Don't miss it.",
        variables: ["first_name"],
        template_type: "lto",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_lto_complex",
        vertical: "Promotions",
        template_example: "Hi John, your exclusive deal expires soon. Don't miss it.",
        lto_expiry: "Today, 11:59 PM",
        header_type: "text",
        header: "Last chance offer",
        footer: "Terms apply",
        enable_sample: !0,
        buttons: [
          { id: "btn_1", label: "Claim now", type: "url", url: "https://example.com/claim", url_example: "https://example.com/claim" }
        ]
      }
    }
  },
  {
    id: "wa-catalog-simple",
    label: "Catalog - Simple",
    campaign: {
      message: {
        title: "",
        body: "Browse our catalog for the latest products.",
        variables: [],
        template_type: "catalog",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_catalog_simple",
        vertical: "Product Showcase",
        template_example: "Browse our catalog for the latest products.",
        enable_sample: !0,
        products: [
          { image: "https://via.placeholder.com/80?text=C1", sectionTitle: "Featured", productId: "CAT-001" }
        ]
      }
    }
  },
  {
    id: "wa-catalog-complex",
    label: "Catalog - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, browse our curated catalog sections.",
        variables: ["first_name"],
        template_type: "catalog",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_catalog_complex",
        vertical: "Product Showcase",
        template_example: "Hi John, browse our curated catalog sections.",
        footer: "Updated daily",
        enable_sample: !0,
        products: [
          { image: "https://via.placeholder.com/80?text=C1", sectionTitle: "Jackets", productId: "CAT-JACKETS" },
          { image: "https://via.placeholder.com/80?text=C2", sectionTitle: "Jeans", productId: "CAT-JEANS" },
          { image: "https://via.placeholder.com/80?text=C3", sectionTitle: "Accessories", productId: "CAT-ACC" }
        ]
      }
    }
  },
  {
    id: "wa-mpm-simple",
    label: "Multi-product - Simple",
    campaign: {
      message: {
        title: "",
        body: "Pick one of these top products.",
        variables: [],
        template_type: "mpm",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_mpm_simple",
        vertical: "Product Showcase",
        template_example: "Pick one of these top products.",
        enable_sample: !0,
        products: [
          { image: "https://via.placeholder.com/80?text=P1", sectionTitle: "Sneakers", productId: "$79.99" },
          { image: "https://via.placeholder.com/80?text=P2", sectionTitle: "Backpack", productId: "$49.00" }
        ]
      }
    }
  },
  {
    id: "wa-mpm-complex",
    label: "Multi-product - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, we selected these products for you.",
        variables: ["first_name"],
        template_type: "mpm",
        template_category: "marketing",
        template_language: "en",
        template_name: "wa_mpm_complex",
        vertical: "Product Showcase",
        template_example: "Hi John, we selected these products for you.",
        footer: "Prices subject to change",
        enable_sample: !0,
        products: [
          { image: "https://via.placeholder.com/80?text=P1", sectionTitle: "Trail Sneakers", productId: "$89.99" },
          { image: "https://via.placeholder.com/80?text=P2", sectionTitle: "Travel Backpack", productId: "$59.00" },
          { image: "https://via.placeholder.com/80?text=P3", sectionTitle: "Fitness Watch", productId: "$129.00" }
        ],
        buttons: [{ id: "btn_1", label: "Talk to sales", type: "quick_reply" }]
      }
    }
  },
  {
    id: "wa-auth-simple",
    label: "Authentication - Simple (copy code)",
    campaign: {
      message: {
        title: "",
        body: "Your code is {{ .otp_code }}. Valid for 10 minutes.",
        variables: ["otp_code"],
        template_type: "auth",
        template_category: "authentication",
        template_language: "en",
        template_name: "wa_auth_simple",
        vertical: "Authentication",
        template_example: "Your code is 847291. Valid for 10 minutes.",
        auth_type: "otp",
        auth_label: "Your verification code",
        add_security_recommendation: !0,
        code_expiration_minutes: 10,
        enable_sample: !0,
        buttons: [
          { id: "btn_1", label: "Copy code", type: "otp", otp_type: "COPY_CODE" }
        ]
      }
    }
  },
  {
    id: "wa-auth-complex",
    label: "Authentication - Complex (one-tap)",
    campaign: {
      message: {
        title: "",
        body: "Use {{ .otp_code }} to sign in. If this was not you, ignore this message.",
        variables: ["otp_code"],
        template_type: "auth",
        template_category: "authentication",
        template_language: "en",
        template_name: "wa_auth_complex",
        vertical: "Authentication",
        template_example: "Use 847291 to sign in. If this was not you, ignore this message.",
        auth_type: "login",
        auth_label: "Secure sign-in code",
        add_security_recommendation: !0,
        code_expiration_minutes: 5,
        enable_sample: !0,
        buttons: [
          {
            id: "btn_1",
            label: "Autofill code",
            type: "otp",
            otp_type: "ONE_TAP",
            autofill_text: "Tap to autofill",
            package_name: "com.example.app",
            signature_hash: "K8a%2FAINcGX7"
          }
        ]
      }
    }
  }
], Rt = [
  {
    id: "short-alert",
    label: "Short alert",
    campaign: {
      message: {
        title: "",
        body: "Your appointment is confirmed for tomorrow at 10am.",
        variables: [],
        sender_id: "YourBrand"
      }
    }
  },
  {
    id: "otp",
    label: "OTP",
    campaign: {
      message: {
        title: "",
        body: "Your code: {{ .otp_code }}",
        variables: ["otp_code"],
        sender_id: "YourBrand"
      }
    }
  },
  {
    id: "shipping",
    label: "Shipping update",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your order {{ .order_id }} has shipped.",
        variables: ["first_name", "order_id"],
        sender_id: "YourBrand"
      }
    }
  },
  {
    id: "promo",
    label: "Promo text",
    campaign: {
      message: {
        title: "",
        body: "Flash sale today! Use SAVE20 at checkout. {{ .link }}",
        variables: ["link"],
        sender_id: "YourBrand"
      }
    }
  }
], Et = [
  {
    id: "announcement",
    label: "Announcement",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: [],
        subject: "Important update",
        preview_text: "We have news for you.",
        from_name: "Your Brand",
        from_address: "hello@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Important update" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, here is what's new." }
        ]
      }
    }
  },
  {
    id: "newsletter",
    label: "Newsletter",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name"],
        subject: "Your weekly digest",
        preview_text: "Top stories and updates",
        from_name: "Your Brand",
        from_address: "news@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Weekly digest" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, here are this week's highlights." },
          { id: "btn1", type: "button", text: "Read more", url: "https://example.com" }
        ]
      }
    }
  },
  {
    id: "offer",
    label: "Offer",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name"],
        subject: "Special offer for you, {{ .first_name }}",
        preview_text: "Limited time only",
        from_name: "Your Brand",
        from_address: "offers@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Exclusive offer" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, enjoy 20% off your next order." },
          { id: "btn1", type: "button", text: "Claim offer", url: "https://example.com/offer" }
        ]
      }
    }
  },
  {
    id: "receipt",
    label: "Receipt",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name", "order_id"],
        subject: "Receipt for order {{ .order_id }}",
        preview_text: "Thank you for your order",
        from_name: "Your Brand",
        from_address: "orders@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Thank you for your order" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, we received your order {{ .order_id }}." }
        ]
      }
    }
  },
  {
    id: "abandoned-cart-complex",
    label: "Abandoned cart (complex)",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name", "cart_value", "checkout_url", "support_email"],
        subject: "{{ .first_name }}, your cart is waiting",
        preview_text: "Items in your cart are almost sold out.",
        from_name: "Luma Store",
        from_address: "hello@lumastore.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "You left something behind", alignment: "left" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, your selected items are still available. Complete checkout before they go out of stock." },
          { id: "pc1", type: "product_card", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900", title: "Urban Trail Jacket", price: "$89.00", buttonText: "Return to cart", buttonUrl: "{{ .checkout_url }}" },
          { id: "sp1", type: "spacer", height: 12 },
          { id: "row1", type: "row", columnCount: 2, cells: ["Cart value", "{{ .cart_value }}"] },
          { id: "btn1", type: "button", text: "Complete purchase", url: "{{ .checkout_url }}", fullWidth: !0, borderRadius: 8 },
          { id: "q1", type: "quote", style: "warning", content: "This cart expires in 24 hours." },
          { id: "f1", type: "footer", content: "Need help? Contact {{ .support_email }}" }
        ]
      }
    }
  },
  {
    id: "saas-onboarding-complex",
    label: "SaaS onboarding (complex)",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name", "workspace_name", "dashboard_url", "docs_url"],
        subject: "Welcome to Keos Cloud, {{ .first_name }}",
        preview_text: "Your workspace is ready. Start in under 5 minutes.",
        from_name: "Keos Cloud",
        from_address: "product@keoscloud.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Welcome to {{ .workspace_name }}" },
          { id: "p1", type: "paragraph", content: "You are all set. Here is your recommended setup path:" },
          { id: "list1", type: "list", style: "numbered", items: ["Create your first campaign", "Connect your delivery provider", "Send a test to your device"] },
          { id: "btn1", type: "button", text: "Open dashboard", url: "{{ .dashboard_url }}", borderRadius: 8 },
          { id: "cols1", type: "columns", leftContent: "Watch 3-min setup video", rightContent: "Read implementation docs" },
          { id: "links1", type: "link_list", separator: "•", links: [{ text: "Docs", url: "{{ .docs_url }}" }, { text: "API Reference", url: "https://docs.keos.dev/api" }, { text: "Status Page", url: "https://status.keos.dev" }] },
          { id: "social1", type: "social", links: [{ platform: "linkedin", url: "https://linkedin.com/company/keos" }, { platform: "twitter", url: "https://x.com/keos" }] },
          { id: "f1", type: "footer", content: "You are receiving this because your team created a Keos Cloud account." }
        ]
      }
    }
  },
  {
    id: "invoice-dunning-complex",
    label: "Invoice reminder (complex)",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name", "invoice_id", "due_date", "amount_due", "pay_url"],
        subject: "Invoice {{ .invoice_id }} is due on {{ .due_date }}",
        preview_text: "Payment reminder for your active subscription.",
        from_name: "Billing Desk",
        from_address: "billing@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Payment reminder" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, this is a reminder that invoice {{ .invoice_id }} is due soon." },
          { id: "row1", type: "row", columnCount: 2, cells: ["Amount due", "{{ .amount_due }}"] },
          { id: "row2", type: "row", columnCount: 2, cells: ["Due date", "{{ .due_date }}"] },
          { id: "btn1", type: "button", text: "Pay invoice", url: "{{ .pay_url }}", fullWidth: !0, borderRadius: 6 },
          { id: "acc1", type: "accordion", items: [{ title: "Accepted payment methods", content: "Visa, Mastercard, ACH bank transfer." }, { title: "Need an extension?", content: "Contact billing support before the due date." }] },
          { id: "code1", type: "code_block", content: "{{ .invoice_id }}", caption: "Reference ID" },
          { id: "f1", type: "footer", content: "If payment has already been made, please ignore this reminder." }
        ]
      }
    }
  },
  {
    id: "webinar-reminder-complex",
    label: "Webinar reminder (complex)",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["first_name", "event_title", "start_time", "join_url", "timezone"],
        subject: "Reminder: {{ .event_title }} starts at {{ .start_time }}",
        preview_text: "Join link and agenda inside.",
        from_name: "Events Team",
        from_address: "events@example.com",
        blocks: [
          { id: "img1", type: "image", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200", alt: "Webinar session", fullWidth: !0 },
          { id: "h1", type: "heading", level: 1, content: "See you soon, {{ .first_name }}" },
          { id: "p1", type: "paragraph", content: "{{ .event_title }} starts at {{ .start_time }} ({{ .timezone }})." },
          { id: "btn1", type: "button", text: "Join webinar", url: "{{ .join_url }}", fullWidth: !0, borderRadius: 999 },
          { id: "nav1", type: "navbar", separator: "•", links: [{ text: "Add to calendar", url: "{{ .join_url }}" }, { text: "Speaker bios", url: "https://example.com/speakers" }, { text: "FAQ", url: "https://example.com/faq" }] },
          { id: "q1", type: "quote", style: "info", content: "Tip: join 5 minutes early for audio checks." },
          { id: "f1", type: "footer", content: "You are receiving this event reminder because you registered for this webinar." }
        ]
      }
    }
  },
  {
    id: "incident-update-complex",
    label: "Incident update (complex)",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: ["incident_id", "service_name", "status_page_url", "next_update_time"],
        subject: "Incident {{ .incident_id }} update: {{ .service_name }}",
        preview_text: "Current status, impact, and next update window.",
        from_name: "Ops Status",
        from_address: "status@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Service incident update" },
          { id: "q1", type: "quote", style: "warning", content: "{{ .service_name }} is currently degraded. Engineers are actively investigating." },
          { id: "row1", type: "row", columnCount: 2, cells: ["Incident ID", "{{ .incident_id }}"] },
          { id: "row2", type: "row", columnCount: 2, cells: ["Next update", "{{ .next_update_time }}"] },
          { id: "btn1", type: "button", text: "View live status", url: "{{ .status_page_url }}", borderRadius: 6 },
          { id: "div1", type: "divider", thickness: 1, color: "#d1d5db", lineStyle: "solid" },
          { id: "p1", type: "paragraph", content: "We will continue to share updates until the issue is fully resolved." },
          { id: "f1", type: "footer", content: "This is a service notification email." }
        ]
      }
    }
  },
  {
    id: "webpage-style-ultra-complex",
    label: "Webpage-style (ultra complex)",
    campaign: {
      message: {
        title: "",
        body: "",
        variables: [
          "first_name",
          "company_name",
          "trial_days_left",
          "cta_url",
          "demo_url",
          "pricing_url",
          "support_email"
        ],
        subject: "{{ .first_name }}, your {{ .company_name }} growth hub is ready",
        preview_text: "A full landing-page style email experience in one template.",
        from_name: "Keos Growth",
        from_address: "hello@keosgrowth.com",
        blocks: [
          { id: "nav1", type: "navbar", separator: "•", links: [{ text: "Platform", url: "https://example.com/platform" }, { text: "Pricing", url: "{{ .pricing_url }}" }, { text: "Customers", url: "https://example.com/customers" }, { text: "Book demo", url: "{{ .demo_url }}" }] },
          { id: "hero_img", type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400", alt: "Analytics dashboard", fullWidth: !0 },
          { id: "hero_h1", type: "heading", level: 1, content: "Scale lifecycle campaigns like a product team" },
          { id: "hero_p", type: "paragraph", content: "Hi {{ .first_name }}, turn your messaging stack into a conversion engine. Your {{ .company_name }} workspace already includes advanced orchestration, previews, and provider-ready templates." },
          { id: "hero_btn_row", type: "row", columnCount: 2, cells: ["🚀 Launch-ready templates", "⚡ Real-time preview + personalization"] },
          { id: "hero_btn", type: "button", text: "Open your workspace", url: "{{ .cta_url }}", fullWidth: !0, borderRadius: 999 },
          { id: "sp1", type: "spacer", height: 16 },
          { id: "sec_h2_1", type: "heading", level: 2, content: "What you can launch this week" },
          { id: "cols1", type: "columns", leftContent: "WhatsApp flows, carousel cards, and utility templates with provider mapping.", rightContent: "Email journeys with dynamic blocks, variable pickers, and reusable preset kits." },
          { id: "card1", type: "product_card", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000", title: "Lifecycle orchestration", price: "From $99/mo", buttonText: "Explore orchestration", buttonUrl: "https://example.com/orchestration" },
          { id: "card2", type: "product_card", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000", title: "Template governance", price: "From $49/mo", buttonText: "Explore governance", buttonUrl: "https://example.com/governance" },
          { id: "sec_h2_2", type: "heading", level: 2, content: "Customer stories" },
          { id: "carousel1", type: "carousel", slides: [{ imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200", alt: "Team success 1", linkUrl: "https://example.com/story-1" }, { imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", alt: "Team success 2", linkUrl: "https://example.com/story-2" }, { imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200", alt: "Team success 3", linkUrl: "https://example.com/story-3" }] },
          { id: "quote1", type: "quote", style: "success", content: '"We replaced three tools and doubled conversion in 45 days."' },
          { id: "sec_h2_3", type: "heading", level: 2, content: "How it works" },
          { id: "list1", type: "list", style: "numbered", items: ["Connect channels and providers", "Design templates with variables", "Preview and publish", "Measure delivery + conversion"] },
          { id: "countdown1", type: "countdown", endDateTime: "2026-12-31T23:59:59Z", label: "{{ .trial_days_left }} days left in your trial" },
          { id: "faq_h2", type: "heading", level: 2, content: "Frequently asked questions" },
          { id: "faq1", type: "accordion", items: [{ title: "Can I migrate existing templates?", content: "Yes. Import existing payloads and map them to canonical template models." }, { title: "Do you support provider-specific payloads?", content: "Yes. Canonical models can output Gupshup and Meta-compatible JSON." }, { title: "Can teams collaborate safely?", content: "Yes. Role-based workflows, validation, and change history are supported." }] },
          { id: "links_h2", type: "heading", level: 2, content: "Resources" },
          { id: "links1", type: "link_list", separator: "•", links: [{ text: "Developer docs", url: "https://docs.example.com" }, { text: "API Reference", url: "https://docs.example.com/api" }, { text: "Security", url: "https://example.com/security" }, { text: "Status", url: "https://status.example.com" }] },
          { id: "cta_h2", type: "heading", level: 2, content: "Ready to ship your next campaign?" },
          { id: "cta_p", type: "paragraph", content: "Move from mockups to production-ready templates with confidence." },
          { id: "cta_btn", type: "button", text: "Start now", url: "{{ .cta_url }}", fullWidth: !0, borderRadius: 10 },
          { id: "social1", type: "social", links: [{ platform: "linkedin", url: "https://linkedin.com/company/keos" }, { platform: "twitter", url: "https://x.com/keos" }, { platform: "youtube", url: "https://youtube.com/@keos" }] },
          { id: "footer1", type: "footer", content: "Questions? Reach us at {{ .support_email }}. You are receiving this because you requested product updates." }
        ]
      }
    }
  }
], vo = { class: "keos-notification-builder" }, bo = { class: "kb-builder-top" }, yo = { class: "kb-push-layout" }, ho = { class: "kb-push-sidebar" }, fo = {
  key: 0,
  class: "kb-push-form"
}, go = {
  key: 0,
  class: "kb-hint-card"
}, ko = { class: "kb-push-form-head" }, _o = { class: "kb-push-form-head-top" }, $o = { class: "kb-push-health-pill" }, wo = { class: "kb-push-form-head-row" }, xo = ["value"], Co = { class: "kb-push-health" }, So = { class: "kb-push-health-row" }, Io = { class: "kb-push-health-value" }, To = { class: "kb-push-health-bar" }, Ao = {
  key: 1,
  class: "kb-push-form"
}, Uo = { class: "kb-push-canvas" }, Ro = {
  key: 0,
  class: "kb-push-test-banner"
}, Eo = { class: "kb-push-preview-chrome" }, Po = { class: "kb-push-preview-controls" }, Bo = { class: "kb-push-preview-as" }, Lo = ["value"], Oo = { class: "kb-preview-status" }, No = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Mo = ["aria-selected", "aria-controls", "onClick"], Vo = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Do = { class: "kb-push-actions" }, Ho = {
  key: 0,
  class: "kb-actions-note"
}, jo = { key: 0 }, Wo = { class: "kb-push-actions-right" }, qo = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Fo = { class: "kb-confirm-dialog" }, zo = { class: "kb-confirm-actions" }, Yo = /* @__PURE__ */ Pe({
  __name: "KeosNotificationBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    versions: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showHistory: { type: Boolean, default: !0 },
    showSaveVersion: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    actionsNote: { default: "" },
    designOnly: { type: Boolean, default: !0 },
    enforceSlugName: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate", "save-version"],
  setup(i, { emit: p }) {
    const m = i, y = p, k = re("android"), S = re(""), A = re(!1), T = re(null), O = re(!1), B = $(
      () => H.value.workflow_status ?? "draft"
    ), G = $(() => {
      const s = S.value;
      return s ? et.find((o) => o.id === s) ?? null : null;
    });
    function te(s) {
      const o = H.value, g = s.campaign.message ? { ...o.message, ...s.campaign.message } : o.message, v = s.campaign.delivery ? { ...o.delivery, ...s.campaign.delivery } : o.delivery;
      D({
        ...s.campaign,
        message: g,
        delivery: v
      }), T.value = null, A.value = !1;
    }
    function se(s) {
      const o = s.target.value;
      if (!o) return;
      const g = Ut.find((v) => v.id === o);
      g && (ne.value ? (T.value = g, A.value = !0) : te(g), s.target.value = "");
    }
    function ce(s) {
      H.value = s, O.value = !1;
    }
    const {
      campaign: H,
      dirty: ne,
      customValidatorErrors: q,
      getValidationWithWarnings: pe,
      update: D,
      updateMessage: Y,
      updateDelivery: J,
      undo: ae,
      redo: ye,
      canUndo: Ce,
      canRedo: Z,
      resetMessage: f,
      resetDelivery: E,
      getPreview: j,
      characterLimits: ke,
      hooks: oe
    } = ct({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (s) => {
          var v, M, I, N;
          const o = [];
          (v = s.name) != null && v.trim() || o.push("Template name is required"), (I = (M = s.message) == null ? void 0 : M.body) != null && I.trim() || o.push("Message body is required");
          const g = (N = m.hooks) != null && N.customValidators ? await m.hooks.customValidators(s) : [];
          return [...o, ...g];
        }
      },
      onDirty: () => y("change", H.value)
    }), { lastSavedAt: R } = pt(H, { channel: "push" });
    function W(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ye() : ae());
    }
    st(() => {
      window.addEventListener("keydown", W);
    }), lt(() => {
      window.removeEventListener("keydown", W);
    }), Ne(H, (s) => y("update:modelValue", s), { deep: !0 });
    const h = re(), le = re(!0), $e = re(!0);
    async function _e() {
      if (oe.estimateReach)
        try {
          h.value = await oe.estimateReach(H.value.audience);
        } catch {
          h.value = void 0;
        }
      oe.canSend && (le.value = await Promise.resolve(oe.canSend())), oe.canSchedule && ($e.value = await Promise.resolve(oe.canSchedule()));
    }
    _e(), Ne(() => H.value.audience, _e, { deep: !0 });
    const we = $(() => (q.value, pe(h.value))), P = $(() => we.value.blockingErrors), Q = $(() => we.value.warnings), z = $(() => we.value.valid), he = $(() => {
      var v, M, I;
      const s = H.value.message, o = [
        !!((v = H.value.name) != null && v.trim()),
        !!((M = s.title) != null && M.trim()),
        !!((I = s.body) != null && I.trim()),
        !!(s.template_type ?? H.value.template_type),
        Array.isArray(s.actions) ? s.actions.length > 0 : !1
      ], g = o.filter(Boolean).length;
      return Math.round(g / o.length * 100);
    }), ie = $(() => he.value >= 90 ? "Production ready" : he.value >= 70 ? "Strong draft" : he.value >= 40 ? "In progress" : "Needs setup"), me = $(() => {
      const s = H.value.message;
      return !!((s.title ?? "").toString().trim() || (s.body ?? "").toString().trim() || Array.isArray(s.actions) && s.actions.length);
    }), Re = $(
      () => ke[k.value].title
    ), Be = $(() => ke[k.value].body), Oe = $(() => H.value.message.title.length), be = $(() => H.value.message.body.length), De = $(() => {
      if (Oe.value > Re.value)
        return `Title exceeds ${Re.value} characters for ${k.value}.`;
    }), Ee = $(() => {
      const s = P.value.find(
        (o) => o.message === "Message body is required"
      );
      if (s) return s.message;
      if (be.value > Be.value)
        return `Body exceeds ${Be} characters for ${k.value}.`;
    }), We = $(
      () => H.value.template_type ?? "transactional"
    );
    function qe(s) {
      D({ template_type: s });
    }
    function Fe(s) {
      D({
        name: s,
        tracking: { ...H.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Ae(s) {
      const o = ` {{ .${s.variable} }}`, g = H.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, s.variable]));
      s.field === "title" ? Y({
        title: H.value.message.title + o,
        variables: v
      }) : Y({
        body: H.value.message.body + o,
        variables: v
      });
    }
    function ue() {
      z.value && y("save", H.value);
    }
    return (s, o) => {
      var g;
      return a(), n("div", vo, [
        e("div", bo, [
          Me(mt, {
            "campaign-name": C(H).name,
            status: C(H).status,
            dirty: C(ne),
            "last-saved-at": C(R),
            "can-undo": C(Ce),
            "can-redo": C(Z),
            "workflow-status": B.value,
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": Fe,
            "onUpdate:workflowStatus": o[0] || (o[0] = (v) => C(D)({ workflow_status: v })),
            onUndo: C(ae),
            onRedo: C(ye)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          P.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ie({
              background: C(Ue).dangerBg,
              border: `1px solid ${C(Ue).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(Se)[12]}px ${C(Se)[16]}px`,
              marginBottom: `${C(Se)[16]}px`
            })
          }, [
            e("ul", {
              style: Ie({ margin: 0, paddingLeft: "1.25rem", color: C(Ue).danger })
            }, [
              (a(!0), n(U, null, V(P.value, (v) => (a(), n("li", {
                key: v.message
              }, c(v.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", yo, [
          e("aside", ho, [
            i.disabledSections.includes("message") ? b("", !0) : (a(), n("div", fo, [
              !C(H).message.title && !C(H).message.body ? (a(), n("div", go, " Add a title and message below to get started. ")) : b("", !0),
              e("div", ko, [
                e("div", _o, [
                  o[12] || (o[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", $o, c(ie.value), 1)
                ]),
                e("div", wo, [
                  Me(_t, {
                    "template-type": We.value,
                    onUpdate: qe
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: se
                  }, [
                    o[13] || (o[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, V(C(Ut), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, xo))), 128))
                  ], 32)
                ]),
                e("div", Co, [
                  e("div", So, [
                    o[14] || (o[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", Io, c(he.value) + "%", 1)
                  ]),
                  e("div", To, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: Ie({ width: `${he.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(_s, {
                message: C(H).message,
                "title-count": Oe.value,
                "body-count": be.value,
                "title-limit": Re.value,
                "body-limit": Be.value,
                "selected-platform": k.value,
                "show-reset": !0,
                "title-error": De.value,
                "body-error": Ee.value,
                onUpdate: C(Y),
                onReset: o[1] || (o[1] = (v) => C(f)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Me(Gt, {
                message: C(H).message,
                "variable-options": i.variableOptions,
                onUpdate: C(Y),
                onInsertVariable: Ae
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !i.designOnly && !i.disabledSections.includes("delivery") ? (a(), n("div", Ao, [
              o[15] || (o[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Me(il, {
                delivery: C(H).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: C(J),
                onReset: o[2] || (o[2] = (v) => C(E)())
              }, null, 8, ["delivery", "onUpdate"]),
              Me(yl, {
                delivery: C(H).delivery,
                onUpdate: C(J)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : b("", !0)
          ]),
          e("main", Uo, [
            !i.designOnly && C(H).audience.test_mode ? (a(), n("div", Ro, [...o[16] || (o[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Eo, [
              e("div", Po, [
                e("label", Bo, [
                  o[18] || (o[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": o[3] || (o[3] = (v) => S.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[17] || (o[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, V(C(et), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Lo))), 128))
                  ], 512), [
                    [Ge, S.value]
                  ])
                ]),
                e("div", Oo, [
                  o[19] || (o[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, c(k.value), 1)
                ])
              ]),
              e("div", No, [
                (a(), n(U, null, V(["android", "ios", "web"], (v) => e("button", {
                  key: v,
                  type: "button",
                  class: xe(["kb-push-device-btn", { "kb-push-device-btn--active": k.value === v }]),
                  role: "tab",
                  "aria-selected": k.value === v,
                  "aria-controls": `kb-preview-panel-${v}`,
                  onClick: (M) => k.value = v
                }, c(v.toUpperCase()), 11, Mo)), 64))
              ]),
              e("div", {
                class: xe(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !me.value }])
              }, [
                !C(H).message.title && !C(H).message.body ? (a(), n("div", Vo, [...o[20] || (o[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), na(so, {
                  key: 1,
                  "get-preview": C(j),
                  "selected-platform": k.value,
                  "preview-profile": G.value,
                  message: C(H).message,
                  delivery: C(H).delivery,
                  "onUpdate:selectedPlatform": o[4] || (o[4] = (v) => k.value = v)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Do, [
          Q.value.length > 0 ? (a(), n("div", Ho, [
            o[21] || (o[21] = e("strong", null, "Warning:", -1)),
            F(" " + c((g = Q.value[0]) == null ? void 0 : g.message) + " ", 1),
            Q.value.length > 1 ? (a(), n("span", jo, " (+" + c(Q.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", Wo, [
            !i.designOnly && i.showHistory ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[5] || (o[5] = (v) => O.value = !0)
            }, " Version history ")) : b("", !0),
            !i.designOnly && i.showSaveVersion ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[6] || (o[6] = (v) => y("save-version", JSON.parse(JSON.stringify(C(H)))))
            }, " Save as version ")) : b("", !0),
            i.showDuplicate ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[7] || (o[7] = (v) => y("duplicate", JSON.parse(JSON.stringify(C(H)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (a(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: ue
            }, " Save ")) : b("", !0),
            i.showClose ? (a(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: o[8] || (o[8] = (v) => y("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        A.value ? (a(), n("div", qo, [
          e("div", Fo, [
            o[22] || (o[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[23] || (o[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", zo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: o[9] || (o[9] = (v) => {
                  A.value = !1, T.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: o[10] || (o[10] = (v) => T.value && te(T.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0),
        Me(Jt, {
          open: O.value,
          versions: i.versions,
          onClose: o[11] || (o[11] = (v) => O.value = !1),
          onRestore: ce
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Qt = /* @__PURE__ */ Le(Yo, [["__scopeId", "data-v-18771e1a"]]), Ko = { class: "kb-section" }, Go = { class: "kb-section__head" }, Jo = { class: "kb-summary-bar" }, Qo = { class: "kb-pill kb-pill--category" }, Xo = { class: "kb-pill kb-pill--format" }, Zo = { class: "kb-pill kb-pill--status" }, ei = { class: "kb-setup-group" }, ti = { class: "kb-field" }, ai = ["value"], ni = ["value", "disabled"], si = {
  key: 0,
  class: "kb-field"
}, li = ["value"], oi = ["value"], ii = { class: "kb-helper" }, ri = { class: "kb-field" }, ui = ["value"], di = { class: "kb-field kb-field--inline kb-field--language-limits" }, ci = { class: "kb-field-half" }, pi = ["value"], mi = { class: "kb-field-half" }, vi = { class: "kb-meta-card" }, bi = { class: "kb-meta-list" }, yi = { class: "kb-field" }, hi = ["value"], fi = { class: "kb-field kb-field--toggles" }, gi = { class: "kb-toggle-row" }, ki = ["checked"], _i = {
  key: 0,
  class: "kb-toggle-row"
}, $i = ["checked"], wi = {
  key: 0,
  class: "kb-field"
}, xi = { class: "kb-wa-buttons" }, Ci = { class: "kb-carousel-card__head" }, Si = { class: "kb-carousel-card__num" }, Ii = ["onClick"], Ti = { class: "kb-field-inline-2" }, Ai = ["value", "onChange"], Ui = ["value", "onInput"], Ri = { class: "kb-input-with-var" }, Ei = ["placeholder", "value", "onInput"], Pi = { class: "kb-var-picker-wrap" }, Bi = ["onClick"], Li = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Oi = ["onClick"], Ni = ["value", "onInput"], Mi = { class: "kb-carousel-card__btns" }, Vi = ["value", "onInput"], Di = ["value", "onChange"], Hi = ["value", "onInput"], ji = ["value", "onInput"], Wi = ["onClick"], qi = ["disabled", "onClick"], Fi = ["disabled"], zi = {
  key: 1,
  class: "kb-field"
}, Yi = ["value"], Ki = ["value"], Gi = {
  key: 2,
  class: "kb-field"
}, Ji = ["value"], Qi = {
  key: 3,
  class: "kb-field"
}, Xi = { class: "kb-wa-buttons" }, Zi = ["value", "onInput"], er = ["value", "onInput"], tr = ["onClick"], ar = {
  key: 0,
  class: "kb-comp kb-comp--header"
}, nr = { class: "kb-comp__body" }, sr = { class: "kb-field-no-border" }, lr = { class: "kb-header-type-grid" }, or = ["onClick"], ir = { class: "kb-header-type-btn__label" }, rr = {
  key: 0,
  class: "kb-helper"
}, ur = {
  key: 0,
  class: "kb-field-no-border",
  style: { "margin-top": "0.7rem" }
}, dr = { class: "kb-label" }, cr = { class: "kb-input-with-var" }, pr = ["placeholder", "value"], mr = { class: "kb-var-picker-wrap" }, vr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, br = ["onClick"], yr = {
  key: 1,
  style: { "margin-top": "0.7rem", display: "flex", "flex-direction": "column", gap: "0.6rem" }
}, hr = ["value"], fr = ["value"], gr = { class: "kb-mu" }, kr = { class: "kb-mu__text kb-mu__text--file" }, _r = { class: "kb-mu__size" }, $r = { class: "kb-mu__text kb-mu__text--hint" }, wr = { class: "kb-mu__right" }, xr = ["disabled"], Cr = {
  key: 0,
  class: "kb-mu__spinner"
}, Sr = {
  key: 0,
  class: "kb-mu__error"
}, Ir = { key: 0 }, Tr = ["value"], Ar = {
  key: 2,
  class: "kb-comp__note kb-comp__note--info",
  style: { "margin-top": "0.7rem" }
}, Ur = { class: "kb-comp kb-comp--body" }, Rr = { class: "kb-comp__head" }, Er = {
  key: 0,
  class: "kb-comp__meta"
}, Pr = {
  key: 1,
  class: "kb-comp__meta kb-comp__meta--preset"
}, Br = { class: "kb-comp__body" }, Lr = { class: "kb-comp__note kb-comp__note--auth" }, Or = { class: "kb-auth-preview" }, Nr = { style: { display: "flex", "flex-direction": "column", gap: "0.56rem", "margin-top": "0.7rem" } }, Mr = { class: "kb-toggle-row" }, Vr = ["checked"], Dr = ["value"], Hr = { class: "kb-field-no-border" }, jr = { class: "kb-label" }, Wr = { class: "kb-input-with-var" }, qr = ["placeholder", "value"], Fr = { class: "kb-var-picker-wrap" }, zr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Yr = ["onClick"], Kr = {
  class: "kb-field-no-border",
  style: { "margin-top": "0.6rem" }
}, Gr = ["value"], Jr = {
  key: 0,
  class: "kb-field-no-border",
  style: { "margin-top": "0.5rem" }
}, Qr = { class: "kb-wa-fields-list" }, Xr = { class: "kb-wa-field-name" }, Zr = { class: "kb-wa-field-status" }, eu = {
  key: 1,
  class: "kb-comp kb-comp--footer"
}, tu = { class: "kb-comp__body" }, au = { class: "kb-field-no-border" }, nu = { class: "kb-label" }, su = ["value"], lu = { class: "kb-comp kb-comp--buttons" }, ou = { class: "kb-comp__head" }, iu = {
  key: 0,
  class: "kb-comp__meta kb-comp__meta--required"
}, ru = {
  key: 1,
  class: "kb-comp__meta"
}, uu = { class: "kb-comp__body" }, du = {
  key: 0,
  class: "kb-comp__note kb-comp__note--warn",
  style: { "margin-bottom": "0.7rem" }
}, cu = {
  key: 1,
  class: "kb-comp__note kb-comp__note--info",
  style: { "margin-bottom": "0.7rem" }
}, pu = {
  key: 2,
  class: "kb-comp__note kb-comp__note--auth",
  style: { "margin-bottom": "0.7rem" }
}, mu = { class: "kb-wa-buttons" }, vu = {
  key: 0,
  class: "kb-input-with-var kb-input-with-var--btn"
}, bu = ["value", "onInput"], yu = { class: "kb-var-picker-wrap" }, hu = ["onClick"], fu = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, gu = ["onClick"], ku = ["value", "onChange"], _u = ["value"], $u = { class: "kb-input-with-var kb-input-with-var--btn" }, wu = ["placeholder", "value", "onInput"], xu = { class: "kb-var-picker-wrap" }, Cu = ["onClick"], Su = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Iu = ["onClick"], Tu = ["value", "onInput"], Au = ["value", "onInput"], Uu = ["value", "onInput"], Ru = {
  key: 4,
  class: "kb-opt-out-note"
}, Eu = ["value", "onInput"], Pu = ["value", "onChange"], Bu = ["value", "onInput"], Lu = ["value", "onInput"], Ou = ["value", "onInput"], Nu = ["onClick"], Mu = ["disabled"], Vu = {
  key: 3,
  class: "kb-buttons-order-hint"
}, yt = 60, ot = 1024, it = 60, Du = 10, Pt = 10, Hu = /* @__PURE__ */ Pe({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] },
    placeholderMode: { default: "named" },
    mediaUploadUrl: { default: void 0 },
    mediaUploadHeaders: { default: void 0 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    const m = i, y = p, k = [
      { value: "none", label: "None", hint: "No header component." },
      { value: "text", label: "Text", hint: "Bold heading above the body. Max 60 chars. Supports one {{1}} variable." },
      { value: "image", label: "Image", hint: "JPEG or PNG. Max 5 MB. Cropped to 1.91:1 in chat." },
      { value: "video", label: "Video", hint: "MP4 only (H.264 + AAC). Max 16 MB." },
      { value: "document", label: "Document", hint: "PDF only. Max 100 MB. Set a filename at send time." },
      { value: "location", label: "Location pin", hint: "Map pin injected at send time. No media upload needed." }
    ], S = [
      { value: "standard", label: "Standard", hint: "Standard HEADER + BODY + FOOTER + BUTTONS structure." },
      { value: "carousel", label: "Carousel", hint: "Up to 10 cards with media + body + buttons. MARKETING only." },
      { value: "flow", label: "WhatsApp Flow", hint: "Launches a multi-step in-chat flow." },
      { value: "lto", label: "Limited-time offer", hint: "Adds offer-expiry urgency. MARKETING only." },
      { value: "catalog", label: "Catalog", hint: "Opens the WhatsApp catalog. MARKETING only." },
      { value: "mpm", label: "Multi-product", hint: "Multiple products in one message. MARKETING only." }
    ], A = {
      marketing: ["standard", "carousel", "flow", "lto", "catalog", "mpm"],
      utility: ["standard", "flow"],
      authentication: []
    }, T = {
      marketing: ["quick_reply", "url", "call", "copy_code", "opt_out"],
      utility: ["quick_reply", "url", "call"],
      authentication: ["otp"]
    }, O = [
      { value: "quick_reply", label: "Quick reply" },
      { value: "url", label: "Visit URL" },
      { value: "call", label: "Call phone" },
      { value: "copy_code", label: "Copy coupon code" },
      { value: "opt_out", label: "Marketing opt-out" },
      { value: "otp", label: "OTP (auth only)" }
    ], B = $(() => m.message), G = $(() => String(B.value.template_type ?? "text").trim()), te = $(() => String(B.value.template_category ?? "marketing").trim()), se = $(() => String(B.value.header_type ?? "none").trim()), ce = $(() => String(B.value.header ?? "")), H = $(() => String(B.value.body ?? "")), ne = $(() => String(B.value.footer ?? "")), q = $(() => B.value.buttons ?? []), pe = $(() => B.value.products ?? []), D = $(() => B.value.cards ?? []), Y = $(() => te.value === "authentication"), J = $(() => {
      const _ = G.value;
      return ["carousel", "flow", "lto", "catalog", "mpm"].includes(_) ? _ : "standard";
    }), ae = $(() => J.value !== "standard"), ye = $(() => {
      const _ = new Set(A[te.value] ?? A.marketing), u = new Set((m.disabledFormats ?? []).map((d) => String(d).trim()));
      return S.filter((d) => _.has(d.value) && !u.has(d.value));
    }), Ce = $(() => {
      const _ = new Set((m.disabledFormats ?? []).map((u) => String(u).trim()));
      return k.filter((u) => !_.has(u.value));
    }), Z = $(() => {
      const _ = new Set(T[te.value] ?? T.marketing);
      return O.filter((u) => _.has(u.value));
    }), f = $(() => Y.value ? 1 : Du), E = $(() => {
      const _ = q.value.some((d) => d.type === "quick_reply" || d.type === "opt_out"), u = q.value.some((d) => ["url", "call", "copy_code"].includes(d.type));
      return _ && u;
    }), j = $(() => {
      const _ = te.value;
      return _ ? _.charAt(0).toUpperCase() + _.slice(1) : "Uncategorized";
    }), ke = $(() => {
      var u;
      if (Y.value) return "Authentication OTP";
      if (J.value !== "standard")
        return ((u = S.find((d) => d.value === J.value)) == null ? void 0 : u.label) ?? "Standard";
      const _ = k.find((d) => d.value === se.value);
      return _ && _.value !== "none" ? `${_.label} header` : "Text only";
    }), oe = $(() => B.value.template_name ? !Y.value && !H.value.trim() ? "Draft" : "Ready to validate" : "Needs setup"), R = $(() => {
      const _ = ["{{OTP}} is your verification code."];
      return B.value.add_security_recommendation && _.push("For your security, do not share this code."), B.value.code_expiration_minutes && _.push(`This code expires in ${B.value.code_expiration_minutes} minutes.`), _.join(" ");
    }), W = $(
      () => m.placeholderMode === "named" ? "{{ .var }}" : "{{N}}"
    );
    function h(_) {
      const u = /\{\{(\d+)\}\}/g;
      let d = 0, r;
      for (; (r = u.exec(_)) !== null; ) d = Math.max(d, Number(r[1]));
      return d + 1;
    }
    function le(_) {
      if (!_ || typeof _ != "string") return [];
      const u = /\{\{\s*([^}]+?)\s*\}\}/g, d = /* @__PURE__ */ new Set();
      let r;
      for (; (r = u.exec(_)) !== null; ) d.add(r[1].trim());
      return Array.from(d);
    }
    const $e = $(() => {
      const _ = m.message.header ?? "", u = m.message.body ?? m.message.body ?? "", d = new Set(m.message.variables ?? []);
      return Array.from(/* @__PURE__ */ new Set([...le(_), ...le(u)])).map((t) => ({ name: t, configured: d.has(t) }));
    }), _e = [
      "first_name",
      "last_name",
      "full_name",
      "order_id",
      "order_status",
      "tracking_url",
      "delivery_date",
      "appointment_date",
      "appointment_time",
      "otp_code",
      "coupon_code",
      "product_name",
      "store_name",
      "support_phone",
      "city",
      "country"
    ], we = $(() => {
      const _ = (m.message.variables ?? []).filter(Boolean);
      return _.length ? Array.from(new Set(_)) : _e;
    }), P = re(null), Q = re(null), z = re(null), he = re("idle"), ie = re(""), me = re(!1);
    function Re(_) {
      var d;
      const u = _.target;
      z.value = ((d = u.files) == null ? void 0 : d[0]) ?? null, he.value = "idle", ie.value = "";
    }
    function Be(_) {
      var d, r;
      me.value = !1;
      const u = ((r = (d = _.dataTransfer) == null ? void 0 : d.files) == null ? void 0 : r[0]) ?? null;
      u && (z.value = u, he.value = "idle", ie.value = "");
    }
    async function Oe() {
      if (!(!z.value || !m.mediaUploadUrl)) {
        he.value = "uploading", ie.value = "";
        try {
          const _ = new FormData();
          _.append("file", z.value);
          const u = await fetch(m.mediaUploadUrl, {
            method: "POST",
            headers: m.mediaUploadHeaders ?? {},
            body: _
          });
          if (!u.ok) {
            const t = await u.text().catch(() => u.statusText);
            throw new Error(`${u.status}: ${t}`);
          }
          const d = await u.json(), r = d.mediaId ?? d.media_id ?? d.handle ?? d.id;
          if (!r) throw new Error(`No mediaId in response: ${JSON.stringify(d)}`);
          be({ media_handle: r }), he.value = "done", z.value = null, Q.value && (Q.value.value = "");
        } catch (_) {
          he.value = "error", ie.value = _ instanceof Error ? _.message : String(_);
        }
      }
    }
    function be(_) {
      y("update", _);
    }
    function De(_) {
      if (m.placeholderMode === "numbered") {
        Ee(_, "");
        return;
      }
      P.value = P.value === _ ? null : _;
    }
    function Ee(_, u) {
      var l, x, L;
      const d = m.placeholderMode !== "numbered", r = (m.message.variables ?? []).filter(Boolean), t = d && u ? Array.from(/* @__PURE__ */ new Set([...r, u])) : r;
      function w(fe) {
        return d ? ` {{ .${u} }}` : ` {{${h(fe)}}}`;
      }
      if (_ === "header") {
        const fe = ce.value || "";
        be({ header: `${fe}${w(fe)}`, variables: t });
      } else if (_ === "body") {
        const fe = H.value || "";
        be({ body: `${fe}${w(fe)}`, variables: t });
      } else if (_.startsWith("btn-label:")) {
        const fe = Number(_.split(":")[1]);
        if (Number.isFinite(fe)) {
          const Ve = String(((l = q.value[fe]) == null ? void 0 : l.label) ?? "");
          Ae(fe, { label: `${Ve}${w(Ve)}` });
        }
        d && u && be({ variables: t });
      } else if (_.startsWith("btn-url:")) {
        const fe = Number(_.split(":")[1]);
        if (Number.isFinite(fe)) {
          const Ve = String(((x = q.value[fe]) == null ? void 0 : x.url) ?? "");
          Ae(fe, { url: `${Ve}${w(Ve)}` });
        }
        d && u && be({ variables: t });
      } else if (_.startsWith("card-body:")) {
        const fe = Number(_.split(":")[1]);
        if (Number.isFinite(fe)) {
          const Ve = String(((L = D.value[fe]) == null ? void 0 : L.body) ?? "");
          M(fe, { body: `${Ve}${w(Ve)}` });
        }
        d && u && be({ variables: t });
      }
      P.value = null;
    }
    function We(_) {
      const u = { template_category: _ || void 0 };
      if (_ === "authentication") {
        u.template_type = "auth", u.header_type = void 0, u.header = void 0, u.footer = void 0, u.allow_category_change = void 0, u.media_url = void 0, u.media_handle = void 0, u.media_caption = void 0, u.document_filename = void 0;
        const d = q.value.filter((r) => (r.type ?? "quick_reply") === "otp");
        u.buttons = d;
      } else {
        G.value === "auth" && (u.template_type = "text");
        const d = new Set(T[_] ?? T.marketing), r = q.value.filter((w) => d.has(w.type ?? "quick_reply"));
        r.length !== q.value.length && (u.buttons = r), new Set(A[_] ?? A.marketing).has(J.value) || (u.template_type = "text");
      }
      be(u);
    }
    function qe(_) {
      const u = {};
      if (_ === "standard") {
        const d = se.value;
        u.template_type = ["image", "video", "document"].includes(d) ? d : "text";
      } else
        u.template_type = _, _ === "carousel" && (u.header_type = void 0, u.header = void 0, u.footer = void 0);
      be(u);
    }
    function Fe(_) {
      const u = { header_type: _ };
      _ === "image" || _ === "video" || _ === "document" ? u.template_type = _ : u.template_type = "text", ["image", "video", "document"].includes(_) || (u.media_url = void 0, u.media_handle = void 0, u.media_caption = void 0, u.document_filename = void 0), _ !== "text" && (u.header = void 0), be(u);
    }
    function Ae(_, u) {
      var r;
      const d = [...q.value];
      d[_] = { ...d[_], id: ((r = d[_]) == null ? void 0 : r.id) || `btn_${_ + 1}`, ...u }, be({ buttons: d });
    }
    function ue(_) {
      const u = [...q.value];
      u.splice(_, 1), be({ buttons: u });
    }
    function s() {
      var d;
      if (q.value.length >= f.value) return;
      const _ = ((d = Z.value[0]) == null ? void 0 : d.value) ?? "quick_reply", u = [...q.value];
      u.push({ id: `btn_${u.length + 1}`, label: "", type: _ }), be({ buttons: u });
    }
    function o(_, u) {
      var r;
      const d = [...pe.value];
      d[_] = { ...d[_], id: ((r = d[_]) == null ? void 0 : r.id) || `prod_${_ + 1}`, ...u }, be({ products: d });
    }
    function g(_) {
      const u = [...pe.value];
      u.splice(_, 1), be({ products: u });
    }
    function v() {
      const _ = [...pe.value];
      _.push({ id: `prod_${_.length + 1}`, productId: "" }), be({ products: _ });
    }
    function M(_, u) {
      var r;
      const d = [...D.value];
      d[_] = { ...d[_], id: ((r = d[_]) == null ? void 0 : r.id) || `card_${_ + 1}`, ...u }, be({ cards: d });
    }
    function I(_) {
      const u = [...D.value];
      u.splice(_, 1), be({ cards: u });
    }
    function N() {
      const _ = [...D.value];
      _.push({ id: `card_${_.length + 1}`, headerType: "IMAGE", mediaId: "", body: "", sampleText: "", buttons: [] }), be({ cards: _ });
    }
    function K(_) {
      const u = [...D.value], d = { ...u[_] };
      d.buttons = [...d.buttons ?? [], { type: "QUICK_REPLY", label: "" }], u[_] = d, be({ cards: u });
    }
    function ve(_, u) {
      const d = [...D.value], r = { ...d[_] };
      r.buttons = [...r.buttons ?? []], r.buttons.splice(u, 1), d[_] = r, be({ cards: d });
    }
    function ee(_, u, d) {
      const r = [...D.value], t = { ...r[_] };
      t.buttons = [...t.buttons ?? []], t.buttons[u] = { ...t.buttons[u], ...d }, r[_] = t, be({ cards: r });
    }
    return (_, u) => {
      var d, r;
      return a(), n("section", Ko, [
        e("div", Go, [
          u[27] || (u[27] = e("h3", { class: "kb-section__title" }, "WhatsApp template", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: u[0] || (u[0] = (t) => _.$emit("reset"))
          }, " Reset ")) : b("", !0)
        ]),
        u[91] || (u[91] = e("p", { class: "kb-section__desc" }, " Build your template by configuring each component. Constraints are enforced per Gupshup's API rules. ", -1)),
        e("div", Jo, [
          e("span", Qo, c(j.value), 1),
          e("span", Xo, c(ke.value), 1),
          e("span", Zo, c(oe.value), 1)
        ]),
        e("div", ei, [
          e("div", ti, [
            u[29] || (u[29] = e("label", { class: "kb-label" }, [
              F(" Category "),
              e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: B.value.template_category ?? "",
              onChange: u[1] || (u[1] = (t) => We(t.target.value))
            }, [
              u[28] || (u[28] = e("option", { value: "" }, "Select category", -1)),
              (a(), n(U, null, V([{ value: "marketing", label: "Marketing" }, { value: "utility", label: "Utility" }, { value: "authentication", label: "Authentication" }], (t) => e("option", {
                key: t.value,
                value: t.value,
                disabled: new Set((i.disabledCategories ?? []).map((w) => String(w))).has(t.value)
              }, c(t.label) + c(new Set((i.disabledCategories ?? []).map((w) => String(w))).has(t.value) ? " (Disabled)" : ""), 9, ni)), 64))
            ], 40, ai)
          ]),
          !Y.value && ye.value.length > 1 ? (a(), n("div", si, [
            u[30] || (u[30] = e("label", { class: "kb-label" }, [
              F(" Template variant "),
              e("span", { class: "kb-helper" }, "Standard uses the 4-component structure. Special types have their own configuration.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: J.value,
              onChange: u[2] || (u[2] = (t) => qe(t.target.value))
            }, [
              (a(!0), n(U, null, V(ye.value, (t) => (a(), n("option", {
                key: t.value,
                value: t.value
              }, c(t.label), 9, oi))), 128))
            ], 40, li),
            e("span", ii, c((d = S.find((t) => t.value === J.value)) == null ? void 0 : d.hint), 1)
          ])) : b("", !0),
          e("div", ri, [
            u[31] || (u[31] = e("label", { class: "kb-label" }, [
              F(" Template name "),
              e("span", { class: "kb-helper" }, "Auto-synced from campaign name. Must be lowercase with underscores.")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              value: B.value.template_name ?? "",
              readonly: "",
              disabled: ""
            }, null, 8, ui)
          ]),
          e("div", di, [
            e("div", ci, [
              u[32] || (u[32] = e("label", { class: "kb-label" }, [
                F(" Language "),
                e("span", { class: "kb-helper" }, "Locale code, e.g. en, en_US, pt_BR, hi.")
              ], -1)),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "e.g. en_US",
                value: B.value.template_language ?? "",
                onInput: u[3] || (u[3] = (t) => be({ template_language: t.target.value || void 0 }))
              }, null, 40, pi)
            ]),
            e("div", mi, [
              e("div", vi, [
                u[33] || (u[33] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
                e("ul", bi, [
                  e("li", null, "Header text: " + c(yt) + " chars"),
                  e("li", null, "Body: " + c(ot) + " chars"),
                  e("li", null, "Footer: " + c(it) + " chars · no variables"),
                  e("li", null, "Buttons: " + c(f.value) + " max · label 25 chars", 1)
                ])
              ])
            ])
          ]),
          e("div", yi, [
            u[34] || (u[34] = e("label", { class: "kb-label" }, [
              F(" Vertical (use-case label) "),
              e("span", { class: "kb-helper" }, 'Business use-case shown during Meta review. Required (e.g. "Order Updates", "Promotions", "Authentication").')
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. Order Updates",
              value: B.value.vertical ?? "",
              onInput: u[4] || (u[4] = (t) => be({ vertical: t.target.value || void 0 }))
            }, null, 40, hi)
          ]),
          e("div", fi, [
            u[37] || (u[37] = e("label", { class: "kb-label" }, "Submission options", -1)),
            e("label", gi, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!B.value.enable_sample,
                onChange: u[5] || (u[5] = (t) => be({ enable_sample: t.target.checked || void 0 }))
              }, null, 40, ki),
              u[35] || (u[35] = e("span", { class: "kb-toggle-label" }, "Include sample data in Meta review", -1))
            ]),
            Y.value ? b("", !0) : (a(), n("label", _i, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!B.value.allow_category_change,
                onChange: u[6] || (u[6] = (t) => be({ allow_category_change: t.target.checked || void 0 }))
              }, null, 40, $i),
              u[36] || (u[36] = e("span", { class: "kb-toggle-label" }, "Allow Meta to re-categorize this template", -1))
            ]))
          ])
        ]),
        J.value === "carousel" ? (a(), n("div", wi, [
          e("label", { class: "kb-label" }, [
            u[38] || (u[38] = F(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "MARKETING only. Each card: IMAGE or VIDEO header + body + up to 2 buttons. All cards must use the same header type. Max " + c(Pt) + " cards.")
          ]),
          e("div", xi, [
            (a(!0), n(U, null, V(D.value, (t, w) => (a(), n("div", {
              key: t.id || w,
              class: "kb-carousel-card"
            }, [
              e("div", Ci, [
                e("span", Si, "Card " + c(w + 1), 1),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-remove",
                  onClick: (l) => I(Number(w))
                }, "Remove", 8, Ii)
              ]),
              e("div", Ti, [
                e("div", null, [
                  u[40] || (u[40] = e("label", { class: "kb-label kb-label--sm" }, "Header type", -1)),
                  e("select", {
                    class: "kb-select",
                    value: t.headerType ?? "IMAGE",
                    onChange: (l) => M(Number(w), { headerType: l.target.value })
                  }, [...u[39] || (u[39] = [
                    e("option", { value: "IMAGE" }, "Image", -1),
                    e("option", { value: "VIDEO" }, "Video", -1)
                  ])], 40, Ai)
                ]),
                e("div", null, [
                  u[41] || (u[41] = e("label", { class: "kb-label kb-label--sm" }, "Media handle ID", -1)),
                  e("input", {
                    type: "text",
                    class: "kb-input",
                    placeholder: "e.g. 6462811350485912",
                    value: t.mediaId ?? "",
                    onInput: (l) => M(Number(w), { mediaId: l.target.value })
                  }, null, 40, Ui)
                ])
              ]),
              e("div", null, [
                u[42] || (u[42] = e("label", { class: "kb-label kb-label--sm" }, "Card body", -1)),
                e("div", Ri, [
                  e("textarea", {
                    class: "kb-textarea",
                    rows: "2",
                    placeholder: i.placeholderMode === "named" ? "Card body with {{ .variable }} tokens" : "Card body text with {{1}} variables",
                    value: t.body ?? "",
                    onInput: (l) => M(Number(w), { body: l.target.value })
                  }, null, 40, Ei),
                  e("div", Pi, [
                    e("button", {
                      type: "button",
                      class: "kb-btn-insert",
                      onClick: (l) => De(`card-body:${w}`)
                    }, c(W.value), 9, Bi),
                    P.value === `card-body:${w}` ? (a(), n("div", Li, [
                      (a(!0), n(U, null, V(we.value, (l) => (a(), n("button", {
                        key: `wa-card-body-var-${w}-${l}`,
                        type: "button",
                        class: "kb-var-menu-item",
                        onClick: (x) => Ee(`card-body:${w}`, l)
                      }, c(l), 9, Oi))), 128))
                    ])) : b("", !0)
                  ])
                ])
              ]),
              e("div", null, [
                u[43] || (u[43] = e("label", { class: "kb-label kb-label--sm" }, "Sample body (body with real values for Meta approval)", -1)),
                e("textarea", {
                  class: "kb-textarea",
                  rows: "2",
                  placeholder: "Card body with all variables replaced by realistic values",
                  value: t.sampleText ?? "",
                  onInput: (l) => M(Number(w), { sampleText: l.target.value })
                }, null, 40, Ni)
              ]),
              e("div", Mi, [
                u[45] || (u[45] = e("label", { class: "kb-label kb-label--sm" }, "Card buttons (max 2)", -1)),
                (a(!0), n(U, null, V(t.buttons ?? [], (l, x) => (a(), n("div", {
                  key: x,
                  class: "kb-wa-button-row kb-wa-button-row--sm"
                }, [
                  e("input", {
                    type: "text",
                    class: "kb-input kb-input--btn-label",
                    placeholder: "Button label",
                    value: l.label ?? "",
                    onInput: (L) => ee(Number(w), Number(x), { label: L.target.value })
                  }, null, 40, Vi),
                  e("select", {
                    class: "kb-select kb-select--btn-type",
                    value: l.type ?? "QUICK_REPLY",
                    onChange: (L) => ee(Number(w), Number(x), { type: L.target.value })
                  }, [...u[44] || (u[44] = [
                    e("option", { value: "QUICK_REPLY" }, "Quick reply", -1),
                    e("option", { value: "URL" }, "Visit URL", -1)
                  ])], 40, Di),
                  l.type === "URL" ? (a(), n(U, { key: 0 }, [
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "https://example.com/shop?promo={{1}}",
                      value: l.url ?? "",
                      onInput: (L) => ee(Number(w), Number(x), { url: L.target.value })
                    }, null, 40, Hi),
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "Example URL with real value",
                      value: l.url_example ?? "",
                      onInput: (L) => ee(Number(w), Number(x), { url_example: L.target.value })
                    }, null, 40, ji)
                  ], 64)) : b("", !0),
                  e("button", {
                    type: "button",
                    class: "kb-wa-btn-remove",
                    onClick: (L) => ve(Number(w), Number(x))
                  }, "Remove", 8, Wi)
                ]))), 128)),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-add",
                  disabled: (t.buttons ?? []).length >= 2,
                  onClick: (l) => K(Number(w))
                }, " Add button ", 8, qi)
              ])
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: D.value.length >= Pt,
              onClick: N
            }, " Add card ", 8, Fi)
          ])
        ])) : b("", !0),
        J.value === "flow" ? (a(), n("div", zi, [
          u[46] || (u[46] = e("label", { class: "kb-label" }, [
            F(" WhatsApp Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: B.value.flow_id ?? "",
            onInput: u[7] || (u[7] = (t) => be({ flow_id: t.target.value || void 0 }))
          }, null, 40, Yi),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.44rem" },
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: B.value.flow_cta_label ?? "",
            onInput: u[8] || (u[8] = (t) => be({ flow_cta_label: t.target.value || void 0 }))
          }, null, 40, Ki)
        ])) : b("", !0),
        J.value === "lto" ? (a(), n("div", Gi, [
          u[47] || (u[47] = e("label", { class: "kb-label" }, [
            F(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer expires.")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: B.value.lto_expiry ?? "",
            onInput: u[9] || (u[9] = (t) => be({ lto_expiry: t.target.value || void 0 }))
          }, null, 40, Ji)
        ])) : b("", !0),
        ["mpm", "catalog"].includes(J.value) ? (a(), n("div", Qi, [
          u[48] || (u[48] = e("label", { class: "kb-label" }, [
            F(" Products "),
            e("span", { class: "kb-helper" }, "Add product identifiers in the order they should appear.")
          ], -1)),
          e("div", Xi, [
            (a(!0), n(U, null, V(pe.value, (t, w) => (a(), n("div", {
              key: t.id || w,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: t.productId,
                onInput: (l) => o(Number(w), { productId: l.target.value })
              }, null, 40, Zi),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: t.sectionTitle,
                onInput: (l) => o(Number(w), { sectionTitle: l.target.value || void 0 })
              }, null, 40, er),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (l) => g(Number(w))
              }, "Remove", 8, tr)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: v
            }, "Add product")
          ])
        ])) : b("", !0),
        ae.value ? b("", !0) : (a(), n(U, { key: 4 }, [
          Y.value ? b("", !0) : (a(), n("div", ar, [
            u[64] || (u[64] = e("div", { class: "kb-comp__head" }, [
              e("span", { class: "kb-comp__badge kb-comp__badge--header" }, "HEADER"),
              e("span", { class: "kb-comp__meta" }, "Optional  ·  MARKETING & UTILITY only")
            ], -1)),
            e("div", nr, [
              e("div", sr, [
                u[49] || (u[49] = e("label", { class: "kb-label" }, "Header type", -1)),
                e("div", lr, [
                  (a(!0), n(U, null, V(Ce.value, (t) => (a(), n("button", {
                    key: t.value,
                    type: "button",
                    class: xe(["kb-header-type-btn", { "kb-header-type-btn--active": se.value === t.value }]),
                    onClick: (w) => Fe(t.value)
                  }, [
                    e("span", ir, c(t.label), 1)
                  ], 10, or))), 128))
                ]),
                se.value !== "none" ? (a(), n("span", rr, c((r = k.find((t) => t.value === se.value)) == null ? void 0 : r.hint), 1)) : b("", !0)
              ]),
              se.value === "text" ? (a(), n("div", ur, [
                e("label", dr, [
                  u[50] || (u[50] = F(" Header text ", -1)),
                  e("span", {
                    class: xe(["kb-counter", { "kb-counter--warn": ce.value.length > yt }])
                  }, c(ce.value.length) + "/" + c(yt), 3)
                ]),
                e("div", cr, [
                  e("input", {
                    type: "text",
                    class: "kb-input",
                    placeholder: i.placeholderMode === "named" ? "e.g. Order update for {{ .first_name }}" : "e.g. Order update for {{1}}",
                    value: ce.value,
                    onInput: u[10] || (u[10] = (t) => be({ header: t.target.value || void 0 }))
                  }, null, 40, pr),
                  e("div", mr, [
                    e("button", {
                      type: "button",
                      class: "kb-btn-insert",
                      onClick: u[11] || (u[11] = (t) => De("header"))
                    }, c(W.value), 1),
                    P.value === "header" ? (a(), n("div", vr, [
                      (a(!0), n(U, null, V(we.value, (t) => (a(), n("button", {
                        key: `wa-header-var-${t}`,
                        type: "button",
                        class: "kb-var-menu-item",
                        onClick: (w) => Ee("header", t)
                      }, c(t), 9, br))), 128))
                    ])) : b("", !0)
                  ])
                ]),
                u[51] || (u[51] = e("span", { class: "kb-helper" }, [
                  F("Supports one "),
                  e("code", { class: "kb-code" }, "{{1}}"),
                  F(" variable (sent as last param at send time).")
                ], -1))
              ])) : ["image", "video", "document"].includes(se.value) ? (a(), n("div", yr, [
                e("div", null, [
                  u[52] || (u[52] = e("label", { class: "kb-label kb-label--sm" }, [
                    F(" Media URL "),
                    e("span", { class: "kb-tag-opt" }, "send-time")
                  ], -1)),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "https://...",
                    value: B.value.media_url ?? "",
                    onInput: u[12] || (u[12] = (t) => be({ media_url: t.target.value || void 0 }))
                  }, null, 40, hr),
                  u[53] || (u[53] = e("span", { class: "kb-helper" }, [
                    F("Public URL sent in the "),
                    e("code", { class: "kb-code" }, "message"),
                    F(" field at send time.")
                  ], -1))
                ]),
                e("div", null, [
                  u[59] || (u[59] = e("label", { class: "kb-label kb-label--sm" }, [
                    F(" Media handle — "),
                    e("code", { class: "kb-code" }, "exampleMedia"),
                    F(),
                    e("span", { class: "kb-tag-req" }, "required for approval")
                  ], -1)),
                  e("input", {
                    type: "text",
                    class: "kb-input",
                    placeholder: "e.g. 746306494021786",
                    value: B.value.media_handle ?? "",
                    onInput: u[13] || (u[13] = (t) => be({ media_handle: t.target.value || void 0 }))
                  }, null, 40, fr),
                  u[60] || (u[60] = e("span", { class: "kb-helper" }, [
                    F(" Upload Handle ID from Gupshup media API — "),
                    e("strong", null, "not a URL"),
                    F(". Use the uploader below or paste an existing handle. ")
                  ], -1)),
                  e("div", gr, [
                    e("input", {
                      ref_key: "mediaUploadFileRef",
                      ref: Q,
                      type: "file",
                      class: "kb-mu__file-input",
                      accept: "image/jpeg,image/png,video/mp4,application/pdf",
                      onChange: Re
                    }, null, 544),
                    e("div", {
                      class: xe(["kb-mu__row", {
                        "kb-mu__row--drag": me.value,
                        "kb-mu__row--done": he.value === "done",
                        "kb-mu__row--error": he.value === "error"
                      }]),
                      onDragover: u[18] || (u[18] = Ke((t) => me.value = !0, ["prevent"])),
                      onDragleave: u[19] || (u[19] = Ke((t) => me.value = !1, ["prevent"])),
                      onDrop: Ke(Be, ["prevent"])
                    }, [
                      e("div", {
                        class: "kb-mu__left",
                        onClick: u[14] || (u[14] = (t) => {
                          var w;
                          return i.mediaUploadUrl ? (w = Q.value) == null ? void 0 : w.click() : void 0;
                        })
                      }, [
                        he.value === "done" ? (a(), n(U, { key: 0 }, [
                          u[54] || (u[54] = e("svg", {
                            class: "kb-mu__icon kb-mu__icon--ok",
                            viewBox: "0 0 16 16",
                            fill: "none"
                          }, [
                            e("circle", {
                              cx: "8",
                              cy: "8",
                              r: "7",
                              fill: "#dcfce7",
                              stroke: "#16a34a",
                              "stroke-width": "1.2"
                            }),
                            e("path", {
                              d: "M5 8l2.5 2.5L11 5.5",
                              stroke: "#16a34a",
                              "stroke-width": "1.4",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ], -1)),
                          u[55] || (u[55] = e("span", { class: "kb-mu__text kb-mu__text--ok" }, "Handle applied", -1))
                        ], 64)) : z.value ? (a(), n(U, { key: 1 }, [
                          u[56] || (u[56] = e("svg", {
                            class: "kb-mu__icon",
                            viewBox: "0 0 16 16",
                            fill: "none"
                          }, [
                            e("path", {
                              d: "M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z",
                              stroke: "currentColor",
                              "stroke-width": "1.3",
                              "stroke-linejoin": "round"
                            }),
                            e("path", {
                              d: "M9 2v4h4",
                              stroke: "currentColor",
                              "stroke-width": "1.3",
                              "stroke-linejoin": "round"
                            })
                          ], -1)),
                          e("span", kr, c(z.value.name), 1),
                          e("span", _r, c((z.value.size / 1024).toFixed(0)) + " KB", 1)
                        ], 64)) : (a(), n(U, { key: 2 }, [
                          u[57] || (u[57] = e("svg", {
                            class: "kb-mu__icon kb-mu__icon--muted",
                            viewBox: "0 0 16 16",
                            fill: "none"
                          }, [
                            e("path", {
                              d: "M8 10V4m0 0L5.5 6.5M8 4l2.5 2.5",
                              stroke: "currentColor",
                              "stroke-width": "1.4",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            }),
                            e("path", {
                              d: "M2 12h12",
                              stroke: "currentColor",
                              "stroke-width": "1.3",
                              "stroke-linecap": "round"
                            })
                          ], -1)),
                          e("span", $r, c(i.mediaUploadUrl ? me.value ? "Drop file" : "Click or drop · JPEG PNG MP4 PDF" : "Set mediaUploadUrl prop to enable uploads"), 1)
                        ], 64))
                      ]),
                      e("div", wr, [
                        he.value === "done" ? (a(), n("button", {
                          key: 0,
                          type: "button",
                          class: "kb-mu__btn kb-mu__btn--ghost",
                          onClick: u[15] || (u[15] = (t) => {
                            he.value = "idle", z.value = null, Q.value && (Q.value.value = "");
                          })
                        }, "Upload another")) : z.value ? (a(), n(U, { key: 1 }, [
                          e("button", {
                            type: "button",
                            class: "kb-mu__btn kb-mu__btn--ghost",
                            onClick: u[16] || (u[16] = Ke((t) => {
                              z.value = null, he.value = "idle", ie.value = "", Q.value && (Q.value.value = "");
                            }, ["stop"]))
                          }, "Clear"),
                          e("button", {
                            type: "button",
                            class: "kb-mu__btn kb-mu__btn--primary",
                            disabled: he.value === "uploading",
                            onClick: Oe
                          }, [
                            he.value === "uploading" ? (a(), n("span", Cr)) : b("", !0),
                            F(" " + c(he.value === "uploading" ? "Uploading…" : "Get handle"), 1)
                          ], 8, xr)
                        ], 64)) : i.mediaUploadUrl ? (a(), n("button", {
                          key: 2,
                          type: "button",
                          class: "kb-mu__btn kb-mu__btn--ghost",
                          onClick: u[17] || (u[17] = (t) => {
                            var w;
                            return (w = Q.value) == null ? void 0 : w.click();
                          })
                        }, "Browse")) : b("", !0)
                      ])
                    ], 34),
                    he.value === "error" ? (a(), n("p", Sr, [
                      u[58] || (u[58] = e("svg", {
                        viewBox: "0 0 12 12",
                        fill: "none"
                      }, [
                        e("circle", {
                          cx: "6",
                          cy: "6",
                          r: "5",
                          stroke: "currentColor",
                          "stroke-width": "1.2"
                        }),
                        e("path", {
                          d: "M6 4v2.5M6 8v.3",
                          stroke: "currentColor",
                          "stroke-width": "1.2",
                          "stroke-linecap": "round"
                        })
                      ], -1)),
                      F(" " + c(ie.value), 1)
                    ])) : b("", !0)
                  ])
                ]),
                se.value === "document" ? (a(), n("div", Ir, [
                  u[61] || (u[61] = e("label", { class: "kb-label kb-label--sm" }, [
                    F("Document filename "),
                    e("span", { class: "kb-tag-opt" }, "send-time")
                  ], -1)),
                  e("input", {
                    type: "text",
                    class: "kb-input",
                    placeholder: "e.g. Invoice_0042.pdf",
                    value: B.value.document_filename ?? "",
                    onInput: u[20] || (u[20] = (t) => be({ document_filename: t.target.value || void 0 }))
                  }, null, 40, Tr),
                  u[62] || (u[62] = e("span", { class: "kb-helper" }, "Filename shown to the recipient in chat — does not rename the actual file.", -1))
                ])) : b("", !0)
              ])) : se.value === "location" ? (a(), n("div", Ar, [...u[63] || (u[63] = [
                F(" Location coordinates, name, and address are injected at send time via the ", -1),
                e("code", { class: "kb-code" }, "message", -1),
                F(" field. No media upload or handle needed. The ", -1),
                e("code", { class: "kb-code" }, "templateType", -1),
                F(" will be set to ", -1),
                e("code", { class: "kb-code" }, "TEXT", -1),
                F(". ", -1)
              ])])) : b("", !0)
            ])
          ])),
          e("div", Ur, [
            e("div", Rr, [
              u[70] || (u[70] = e("span", { class: "kb-comp__badge kb-comp__badge--body" }, "BODY", -1)),
              Y.value ? (a(), n("span", Pr, "Preset by Meta — not configurable")) : (a(), n("span", Er, [
                F("Required  ·  Max " + c(ot) + " chars  ·  Supports "),
                u[65] || (u[65] = e("code", { class: "kb-code-inline" }, "*bold*", -1)),
                u[66] || (u[66] = F()),
                u[67] || (u[67] = e("code", { class: "kb-code-inline" }, "_italic_", -1)),
                u[68] || (u[68] = F()),
                u[69] || (u[69] = e("code", { class: "kb-code-inline" }, "\\n", -1))
              ]))
            ]),
            e("div", Br, [
              Y.value ? (a(), n(U, { key: 0 }, [
                e("div", Lr, [
                  u[71] || (u[71] = e("strong", null, "Body is preset by Meta.", -1)),
                  u[72] || (u[72] = F(" You cannot customize it. ", -1)),
                  e("div", Or, c(R.value), 1)
                ]),
                e("div", Nr, [
                  e("label", Mr, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!B.value.add_security_recommendation,
                      onChange: u[21] || (u[21] = (t) => be({ add_security_recommendation: t.target.checked || void 0 }))
                    }, null, 40, Vr),
                    u[73] || (u[73] = e("span", { class: "kb-toggle-label" }, [
                      F("Add security recommendation"),
                      e("br"),
                      e("span", { class: "kb-toggle-sub" }, 'Appends "For your security, do not share this code."')
                    ], -1))
                  ]),
                  e("div", null, [
                    u[74] || (u[74] = e("label", { class: "kb-label kb-label--sm" }, "Code expiry (minutes)", -1)),
                    e("input", {
                      type: "number",
                      class: "kb-input kb-input--sm",
                      placeholder: "e.g. 10",
                      min: "1",
                      value: B.value.code_expiration_minutes ?? "",
                      onInput: u[22] || (u[22] = (t) => {
                        const w = parseInt(t.target.value, 10);
                        be({ code_expiration_minutes: isNaN(w) ? void 0 : w });
                      })
                    }, null, 40, Dr),
                    u[75] || (u[75] = e("span", { class: "kb-helper" }, 'Appends "This code expires in N minutes."', -1))
                  ])
                ])
              ], 64)) : (a(), n(U, { key: 1 }, [
                e("div", Hr, [
                  e("label", jr, [
                    u[76] || (u[76] = F(" Body text ", -1)),
                    e("span", {
                      class: xe(["kb-counter", { "kb-counter--warn": H.value.length > ot }])
                    }, c(H.value.length) + "/" + c(ot), 3)
                  ]),
                  e("div", Wr, [
                    e("textarea", {
                      class: "kb-textarea",
                      rows: "4",
                      placeholder: i.placeholderMode === "named" ? "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped..." : "Hi {{1}}, your order {{2}} has been shipped...",
                      value: H.value,
                      onInput: u[23] || (u[23] = (t) => be({ body: t.target.value || void 0 }))
                    }, null, 40, qr),
                    e("div", Fr, [
                      e("button", {
                        type: "button",
                        class: "kb-btn-insert",
                        onClick: u[24] || (u[24] = (t) => De("body"))
                      }, c(W.value), 1),
                      P.value === "body" ? (a(), n("div", zr, [
                        (a(!0), n(U, null, V(we.value, (t) => (a(), n("button", {
                          key: `wa-body-var-${t}`,
                          type: "button",
                          class: "kb-var-menu-item",
                          onClick: (w) => Ee("body", t)
                        }, c(t), 9, Yr))), 128))
                      ])) : b("", !0)
                    ])
                  ])
                ]),
                e("div", Kr, [
                  u[77] || (u[77] = e("label", { class: "kb-label" }, [
                    F(" Body example "),
                    e("span", { class: "kb-tag-req" }, "required for approval")
                  ], -1)),
                  e("textarea", {
                    class: "kb-textarea",
                    rows: "3",
                    placeholder: "Hi John, your order ORD-5531 has been shipped...",
                    value: B.value.template_example ?? "",
                    onInput: u[25] || (u[25] = (t) => be({ template_example: t.target.value || void 0 }))
                  }, null, 40, Gr),
                  u[78] || (u[78] = e("span", { class: "kb-helper" }, [
                    F("Body text with all "),
                    e("code", { class: "kb-code" }, "{{1}}"),
                    F(" placeholders replaced by realistic values. Meta reviewers read this.")
                  ], -1))
                ]),
                $e.value.length > 0 ? (a(), n("div", Jr, [
                  u[79] || (u[79] = e("label", { class: "kb-label" }, "Detected variables", -1)),
                  e("ul", Qr, [
                    (a(!0), n(U, null, V($e.value, (t) => (a(), n("li", {
                      key: t.name,
                      class: xe(["kb-wa-field-item", { "kb-wa-field-item--ok": t.configured }])
                    }, [
                      e("span", Xr, c(t.name), 1),
                      e("span", Zr, c(t.configured ? "Configured" : "Missing"), 1)
                    ], 2))), 128))
                  ])
                ])) : b("", !0)
              ], 64))
            ])
          ]),
          Y.value ? b("", !0) : (a(), n("div", eu, [
            e("div", { class: "kb-comp__head" }, [
              u[80] || (u[80] = e("span", { class: "kb-comp__badge kb-comp__badge--footer" }, "FOOTER", -1)),
              e("span", { class: "kb-comp__meta" }, "Optional  ·  Max " + c(it) + " chars  ·  No variables  ·  Plain text only")
            ]),
            e("div", tu, [
              e("div", au, [
                e("label", nu, [
                  u[81] || (u[81] = F(" Footer text ", -1)),
                  e("span", {
                    class: xe(["kb-counter", { "kb-counter--warn": ne.value.length > it }])
                  }, c(ne.value.length) + "/" + c(it), 3)
                ]),
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "e.g. Reply STOP to unsubscribe",
                  value: ne.value,
                  onInput: u[26] || (u[26] = (t) => be({ footer: t.target.value || void 0 }))
                }, null, 40, su),
                u[82] || (u[82] = e("span", { class: "kb-helper" }, "Static text only — variables and formatting are not supported in the footer.", -1))
              ])
            ])
          ])),
          e("div", lu, [
            e("div", ou, [
              u[83] || (u[83] = e("span", { class: "kb-comp__badge kb-comp__badge--buttons" }, "BUTTONS", -1)),
              Y.value ? (a(), n("span", iu, "OTP button required  ·  Exactly 1")) : (a(), n("span", ru, "Optional  ·  Max " + c(f.value) + "  ·  Button label max 25 chars", 1))
            ]),
            e("div", uu, [
              E.value ? (a(), n("div", du, [...u[84] || (u[84] = [
                e("strong", null, "Ordering rule:", -1),
                F(" CTA buttons (URL, Phone, Copy Code) must appear ", -1),
                e("em", null, "before", -1),
                F(" Quick Reply buttons or the API will reject the template. ", -1)
              ])])) : b("", !0),
              !Y.value && q.value.length === 0 ? (a(), n("div", cu, [
                u[85] || (u[85] = F(" Available for ", -1)),
                e("strong", null, c(j.value), 1),
                u[86] || (u[86] = F(": ", -1)),
                (a(!0), n(U, null, V(Z.value, (t) => (a(), n("span", {
                  key: t.value,
                  class: "kb-comp__type-chip"
                }, c(t.label), 1))), 128))
              ])) : b("", !0),
              Y.value && q.value.length === 0 ? (a(), n("div", pu, " Authentication templates require exactly one OTP button. Add it below. ")) : b("", !0),
              e("div", mu, [
                (a(!0), n(U, null, V(q.value, (t, w) => (a(), n("div", {
                  key: t.id || w,
                  class: "kb-wa-button-row"
                }, [
                  t.type !== "otp" ? (a(), n("div", vu, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--btn-label",
                      placeholder: "Button label (max 25 chars)",
                      value: t.label,
                      onInput: (l) => Ae(Number(w), { label: l.target.value })
                    }, null, 40, bu),
                    e("div", yu, [
                      e("button", {
                        type: "button",
                        class: "kb-btn-insert",
                        onClick: (l) => De(`btn-label:${w}`)
                      }, c(W.value), 9, hu),
                      P.value === `btn-label:${w}` ? (a(), n("div", fu, [
                        (a(!0), n(U, null, V(we.value, (l) => (a(), n("button", {
                          key: `wa-btn-label-var-${w}-${l}`,
                          type: "button",
                          class: "kb-var-menu-item",
                          onClick: (x) => Ee(`btn-label:${w}`, l)
                        }, c(l), 9, gu))), 128))
                      ])) : b("", !0)
                    ])
                  ])) : b("", !0),
                  e("select", {
                    class: "kb-select kb-select--btn-type",
                    value: t.type ?? "quick_reply",
                    onChange: (l) => Ae(Number(w), { type: l.target.value })
                  }, [
                    (a(!0), n(U, null, V(Z.value, (l) => (a(), n("option", {
                      key: l.value,
                      value: l.value
                    }, c(l.label), 9, _u))), 128))
                  ], 40, ku),
                  t.type === "url" ? (a(), n(U, { key: 1 }, [
                    e("div", $u, [
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: i.placeholderMode === "named" ? "https://example.com/track/{{ .order_id }}" : "https://example.com/track/{{1}}",
                        value: t.url,
                        onInput: (l) => Ae(Number(w), { url: l.target.value || void 0 })
                      }, null, 40, wu),
                      e("div", xu, [
                        e("button", {
                          type: "button",
                          class: "kb-btn-insert",
                          onClick: (l) => De(`btn-url:${w}`)
                        }, c(W.value), 9, Cu),
                        P.value === `btn-url:${w}` ? (a(), n("div", Su, [
                          (a(!0), n(U, null, V(we.value, (l) => (a(), n("button", {
                            key: `wa-btn-url-var-${w}-${l}`,
                            type: "button",
                            class: "kb-var-menu-item",
                            onClick: (x) => Ee(`btn-url:${w}`, l)
                          }, c(l), 9, Iu))), 128))
                        ])) : b("", !0)
                      ])
                    ]),
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "Example URL with real value (required if URL has a variable)",
                      value: t.url_example,
                      onInput: (l) => Ae(Number(w), { url_example: l.target.value || void 0 })
                    }, null, 40, Tu)
                  ], 64)) : t.type === "call" ? (a(), n("input", {
                    key: 2,
                    type: "tel",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "+1 555 123 4567 (E.164 format)",
                    value: t.phone,
                    onInput: (l) => Ae(Number(w), { phone: l.target.value || void 0 })
                  }, null, 40, Au)) : t.type === "copy_code" ? (a(), n("input", {
                    key: 3,
                    type: "text",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "Sample coupon code (e.g. SAVE30DEC)",
                    value: t.example,
                    onInput: (l) => Ae(Number(w), { example: l.target.value || void 0 })
                  }, null, 40, Uu)) : t.type === "opt_out" ? (a(), n("span", Ru, " Sends a built-in marketing opt-out action. ")) : t.type === "otp" ? (a(), n(U, { key: 5 }, [
                    u[88] || (u[88] = e("label", {
                      class: "kb-label kb-label--sm",
                      style: { "margin-top": "0.3rem" }
                    }, "OTP button label", -1)),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--btn-label",
                      placeholder: "e.g. Copy Code",
                      value: t.label,
                      onInput: (l) => Ae(Number(w), { label: l.target.value })
                    }, null, 40, Eu),
                    u[89] || (u[89] = e("label", {
                      class: "kb-label kb-label--sm",
                      style: { "margin-top": "0.3rem" }
                    }, "OTP sub-type", -1)),
                    e("select", {
                      class: "kb-select kb-select--btn-type",
                      value: t.otp_type ?? "COPY_CODE",
                      onChange: (l) => Ae(Number(w), { otp_type: l.target.value })
                    }, [...u[87] || (u[87] = [
                      e("option", { value: "COPY_CODE" }, "Copy code — user manually copies the OTP", -1),
                      e("option", { value: "ONE_TAP" }, "One-tap autofill — autofills on Android", -1)
                    ])], 40, Pu),
                    t.otp_type === "ONE_TAP" ? (a(), n(U, { key: 0 }, [
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: "Autofill hint text (e.g. Tap to autofill)",
                        value: t.autofill_text,
                        onInput: (l) => Ae(Number(w), { autofill_text: l.target.value || void 0 })
                      }, null, 40, Bu),
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: "Android package name (e.g. com.example.app)",
                        value: t.package_name,
                        onInput: (l) => Ae(Number(w), { package_name: l.target.value || void 0 })
                      }, null, 40, Lu),
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: "App signature hash (e.g. K8a%2FAINcGX7)",
                        value: t.signature_hash,
                        onInput: (l) => Ae(Number(w), { signature_hash: l.target.value || void 0 })
                      }, null, 40, Ou)
                    ], 64)) : b("", !0)
                  ], 64)) : b("", !0),
                  e("button", {
                    type: "button",
                    class: "kb-wa-btn-remove",
                    onClick: (l) => ue(Number(w))
                  }, "Remove", 8, Nu)
                ]))), 128)),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-add",
                  disabled: q.value.length >= f.value,
                  onClick: s
                }, c(Y.value ? "Add OTP button" : "Add button"), 9, Mu)
              ]),
              q.value.length > 1 && !Y.value ? (a(), n("div", Vu, [
                u[90] || (u[90] = e("span", { class: "kb-buttons-order-hint__label" }, "Send order:", -1)),
                (a(!0), n(U, null, V(q.value, (t, w) => (a(), n("span", {
                  key: t.id || w,
                  class: xe(["kb-buttons-order-hint__chip", {
                    "kb-buttons-order-hint__chip--cta": ["url", "call", "copy_code", "opt_out"].includes(t.type ?? ""),
                    "kb-buttons-order-hint__chip--qr": t.type === "quick_reply"
                  }])
                }, c(t.label || t.type || "button"), 3))), 128))
              ])) : b("", !0)
            ])
          ])
        ], 64))
      ]);
    };
  }
}), ju = /* @__PURE__ */ Le(Hu, [["__scopeId", "data-v-cc14b256"]]), Wu = { class: "wa-preview-root" }, qu = { class: "wa-device" }, Fu = { class: "wa-screen" }, zu = { class: "wa-header" }, Yu = { class: "wa-titleblock" }, Ku = { class: "wa-title-row" }, Gu = { class: "wa-title" }, Ju = { class: "wa-subtitle" }, Qu = {
  key: 0,
  class: "wa-flow-shell"
}, Xu = { class: "wa-flow-header" }, Zu = { class: "wa-flow-title" }, ed = { class: "wa-flow-content" }, td = { class: "wa-flow-eyebrow" }, ad = {
  key: 0,
  class: "wa-flow-products"
}, nd = { class: "wa-flow-footer" }, sd = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, ld = { class: "wa-managed" }, od = {
  key: 1,
  class: "wa-thread"
}, id = { class: "wa-secure-banner" }, rd = { class: "wa-msg wa-msg--in" }, ud = { class: "wa-template-card" }, dd = {
  key: 0,
  class: "wa-card-media"
}, cd = ["src"], pd = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, md = ["src"], vd = { class: "wa-card-media-doc-icon" }, bd = ["title"], yd = {
  key: 3,
  class: "wa-card-media-fallback"
}, hd = { class: "wa-card-media-tag" }, fd = { class: "wa-card-media-sub" }, gd = {
  key: 1,
  class: "wa-card-header-text"
}, kd = ["innerHTML"], _d = {
  key: 2,
  class: "wa-link-preview"
}, $d = { class: "wa-link-preview-head" }, wd = { class: "wa-link-preview-text" }, xd = ["href"], Cd = {
  key: 3,
  class: "wa-inline-note"
}, Sd = {
  key: 4,
  class: "wa-inline-note"
}, Id = {
  key: 5,
  class: "wa-inline-note"
}, Td = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Ad = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, Ud = {
  key: 8,
  class: "wa-product-list"
}, Rd = { class: "wa-product-name" }, Ed = { class: "wa-product-price" }, Pd = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Bd = {
  key: 10,
  class: "wa-template-actions"
}, Ld = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Od = { class: "wa-order-card" }, Nd = { class: "wa-order-card-top" }, Md = ["src"], Vd = { type: "button" }, Dd = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Hd = { class: "wa-document-card" }, jd = { class: "wa-document-file" }, Wd = { class: "wa-document-icon" }, qd = ["title"], Fd = { class: "wa-document-caption" }, zd = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Yd = { class: "wa-voice-card" }, Kd = { class: "wa-voice-top" }, Gd = { class: "wa-voice-profile" }, Jd = ["src"], Qd = { class: "wa-voice-duration" }, Xd = { class: "wa-voice-transcript" }, Zd = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, ec = { class: "wa-contact-card" }, tc = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, ac = { class: "wa-location-card" }, nc = { class: "wa-location-content" }, sc = { type: "button" }, lc = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, oc = { class: "wa-carousel-track" }, ic = { type: "button" }, rc = { class: "wa-msg wa-msg--out" }, uc = { class: "wa-bubble wa-bubble--out" }, dc = { class: "wa-bubble-author" }, cc = {
  key: 0,
  class: "wa-reaction"
}, pc = { class: "wa-msg wa-msg--in" }, mc = { class: "wa-bubble wa-bubble--in" }, vc = /* @__PURE__ */ Pe({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(i) {
    const p = i;
    function m(f) {
      return String(f).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const y = $(() => {
      var j;
      const f = ((j = p.template) == null ? void 0 : j.body) ?? "";
      return m(f).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), k = $(() => p.template.templateName || "Ecoshop"), S = $(() => "Business Account"), A = $(() => p.template.format === "flow" || !!p.template.flow), T = $(() => {
      var f;
      return (f = p.template.buttons) == null ? void 0 : f[0];
    }), O = $(() => {
      var f, E;
      return ((f = T.value) == null ? void 0 : f.text) || ((E = p.template.flow) == null ? void 0 : E.ctaLabel) || "";
    }), B = $(() => p.template.buttons ?? []), G = $(() => {
      var f;
      return (((f = p.template.multiProduct) == null ? void 0 : f.length) ?? 0) > 0;
    }), te = $(() => (p.template.format || "text").toUpperCase()), se = $(() => {
      const f = p.template.header;
      return !f || f.type === "text" ? "" : f.type === "image" ? f.url || "Image" : f.type === "video" ? f.url || "Video" : f.filename || f.url || "Document";
    }), ce = $(() => {
      const f = p.template.header;
      if (!(!f || f.type !== "image" || !f.url))
        return { backgroundImage: `url(${f.url})` };
    });
    function H(f) {
      if (!f) return "";
      try {
        const E = f.split("?")[0].split("#")[0], j = E.substring(E.lastIndexOf("/") + 1);
        return decodeURIComponent(j || "");
      } catch {
        return "";
      }
    }
    const ne = $(() => {
      const f = p.template.header;
      return !f || f.type !== "document" ? "" : f.filename || H(f.url) || "document.pdf";
    }), q = $(() => {
      const f = (p.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (f == null ? void 0 : f[0]) || "";
    });
    function pe(f) {
      try {
        return new URL(f).hostname;
      } catch {
        return "example.com";
      }
    }
    const D = $(() => {
      const f = p.template.linkPreview;
      return !f && !q.value ? null : {
        title: (f == null ? void 0 : f.title) || "Link preview",
        description: (f == null ? void 0 : f.description) || "Preview from your WhatsApp template link.",
        domain: (f == null ? void 0 : f.domain) || (q.value ? pe(q.value) : "example.com"),
        url: (f == null ? void 0 : f.url) || q.value || "#",
        thumbnail: (f == null ? void 0 : f.thumbnail) || ""
      };
    }), Y = $(() => {
      var j, ke, oe;
      const E = (oe = (((j = p.template.documentCard) == null ? void 0 : j.filename) || ((ke = p.template.header) == null ? void 0 : ke.filename) || "").split(".").pop()) == null ? void 0 : oe.trim().toUpperCase();
      return E ? E.slice(0, 4) : "DOC";
    });
    function J(f, E) {
      return f === "phone_number" ? "wa-btn-icon--phone" : f === "url" ? "wa-btn-icon--external" : f === "copy_code" ? "wa-btn-icon--code" : f === "opt_out" || (E || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (E || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ae = $(() => {
      var f;
      return p.template.location || p.template.locationRequest ? "wa-side-icon--info" : ((f = p.template.header) == null ? void 0 : f.type) === "video" || p.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ye = $(() => {
      var E, j, ke;
      const f = p.template;
      return f.format === "flow" ? "Thanks, we received your preferences." : (E = f.auth) != null && E.code ? "Use the verification code and let us know if it works." : (j = f.coupon) != null && j.code ? `Your coupon ${f.coupon.code} is active now.` : f.limitedOffer ? `Great choice. This offer is valid until ${f.limitedOffer}.` : (ke = p.template.multiProduct) != null && ke.length ? `Here are ${p.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), Ce = $(() => {
      var E, j;
      const f = p.template;
      return f.location ? f.location.name || f.location.address || `${f.location.lat}, ${f.location.lng}` : (E = f.auth) != null && E.code ? `Verification code: ${f.auth.code}` : (j = f.flow) != null && j.id ? `Flow ID: ${f.flow.id}` : f.templateLanguage ? `Template language: ${f.templateLanguage}` : `Category: ${f.templateCategory || "utility"} • Format: ${f.format || "text"}`;
    }), Z = $(() => {
      var j, ke;
      const f = p.template;
      if ((j = f.multiProduct) != null && j.length) return f.multiProduct.slice(0, 5).map((oe) => oe.name || "Product");
      if ((ke = f.buttons) != null && ke.length) return f.buttons.slice(0, 5).map((oe) => oe.text || "Option");
      const E = (f.body || "").split(/\n|\.|,/).map((oe) => oe.trim()).filter(Boolean).slice(0, 5);
      return E.length ? E : ["Option A", "Option B", "Option C"];
    });
    return (f, E) => {
      var j, ke, oe, R, W, h, le, $e, _e, we, P, Q, z, he;
      return a(), n("div", Wu, [
        e("div", qu, [
          e("div", Fu, [
            E[30] || (E[30] = tt('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", zu, [
              E[7] || (E[7] = e("span", { class: "wa-back" }, "←", -1)),
              E[8] || (E[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Yu, [
                e("div", Ku, [
                  e("span", Gu, c(k.value), 1),
                  E[6] || (E[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Ju, c(S.value), 1)
              ]),
              E[9] || (E[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            A.value ? (a(), n("div", Qu, [
              E[14] || (E[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Xu, [
                E[10] || (E[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Zu, c(k.value), 1),
                E[11] || (E[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", ed, [
                e("p", td, c(i.template.body || "Please choose an option below."), 1),
                (a(!0), n(U, null, V(Z.value, (ie, me) => (a(), n("div", {
                  key: `flow-opt-${me}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, c(ie), 1),
                  e("span", {
                    class: xe(["wa-radio", { "wa-radio--on": me === 0 }])
                  }, null, 2)
                ]))), 128)),
                (j = i.template.multiProduct) != null && j.length ? (a(), n("div", ad, [
                  (a(!0), n(U, null, V(i.template.multiProduct.slice(0, 3), (ie, me) => (a(), n("div", {
                    key: me,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, c(ie.name || "Product"), 1),
                      e("p", null, c(ie.price || "Price on request"), 1)
                    ]),
                    E[12] || (E[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : b("", !0)
              ]),
              e("div", nd, [
                O.value ? (a(), n("button", sd, c(O.value), 1)) : b("", !0),
                e("p", ld, [
                  E[13] || (E[13] = F("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: E[0] || (E[0] = Ke(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), n("div", od, [
              E[29] || (E[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", id, [
                E[15] || (E[15] = e("span", null, "●", -1)),
                E[16] || (E[16] = F(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: E[1] || (E[1] = Ke(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", rd, [
                e("div", ud, [
                  i.template.header && i.template.header.type !== "text" ? (a(), n("div", dd, [
                    i.template.header.type === "image" && i.template.header.url ? (a(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: i.template.header.url,
                      alt: "Header media"
                    }, null, 8, cd)) : i.template.header.type === "video" && i.template.header.url ? (a(), n("div", pd, [
                      e("video", {
                        src: i.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, md),
                      E[17] || (E[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : i.template.header.type === "document" ? (a(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: E[2] || (E[2] = Ke(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", vd, c(Y.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ne.value
                      }, c(ne.value), 9, bd)
                    ])) : (a(), n("div", yd, [
                      e("div", hd, c(te.value) + " TEMPLATE", 1),
                      e("div", fd, c(se.value), 1),
                      ce.value ? (a(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: Ie(ce.value)
                      }, null, 4)) : b("", !0)
                    ]))
                  ])) : (ke = i.template.header) != null && ke.text ? (a(), n("div", gd, c(i.template.header.text), 1)) : b("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: y.value
                  }, null, 8, kd),
                  D.value ? (a(), n("div", _d, [
                    e("div", $d, [
                      D.value.thumbnail ? (a(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: Ie({ backgroundImage: `url(${D.value.thumbnail})` })
                      }, null, 4)) : b("", !0),
                      e("div", wd, [
                        e("strong", null, c(D.value.title), 1),
                        e("p", null, c(D.value.description), 1),
                        e("span", null, c(D.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: D.value.url,
                      onClick: E[3] || (E[3] = Ke(() => {
                      }, ["prevent"]))
                    }, c(D.value.url), 9, xd)
                  ])) : b("", !0),
                  i.template.location ? (a(), n("div", Cd, " 📍 " + c(i.template.location.name || i.template.location.address || `${i.template.location.lat}, ${i.template.location.lng}`), 1)) : b("", !0),
                  (oe = i.template.coupon) != null && oe.code ? (a(), n("div", Sd, [
                    E[18] || (E[18] = F(" Coupon: ", -1)),
                    e("strong", null, c(i.template.coupon.code), 1)
                  ])) : b("", !0),
                  (R = i.template.auth) != null && R.code ? (a(), n("div", Id, [
                    E[19] || (E[19] = F(" Verification code: ", -1)),
                    e("strong", null, c(i.template.auth.code), 1)
                  ])) : b("", !0),
                  i.template.limitedOffer ? (a(), n("div", Td, " Expires: " + c(i.template.limitedOffer), 1)) : b("", !0),
                  i.template.footer ? (a(), n("div", Ad, c(i.template.footer), 1)) : b("", !0),
                  G.value ? (a(), n("div", Ud, [
                    (a(!0), n(U, null, V((W = i.template.multiProduct) == null ? void 0 : W.slice(0, 4), (ie, me) => (a(), n("div", {
                      key: `prod-${me}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Rd, c(ie.name || `Item ${me + 1}`), 1),
                      e("span", Ed, c(ie.price || "-"), 1)
                    ]))), 128))
                  ])) : b("", !0),
                  O.value ? (a(), n("button", Pd, [
                    T.value ? (a(), n("span", {
                      key: 0,
                      class: xe(["wa-btn-icon", J(T.value.type, T.value.value || T.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : b("", !0),
                    F(" " + c(O.value), 1)
                  ])) : b("", !0),
                  B.value.length > 1 ? (a(), n("div", Bd, [
                    (a(!0), n(U, null, V(B.value.slice(1, 4), (ie, me) => (a(), n("button", {
                      key: `action-${me}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: xe(["wa-btn-icon", J(ie.type, ie.value || ie.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      F(" " + c(ie.text), 1)
                    ]))), 128))
                  ])) : b("", !0),
                  E[20] || (E[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: xe(["wa-side-icon", ae.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              i.template.orderCard ? (a(), n("div", Ld, [
                e("div", Od, [
                  e("div", Nd, [
                    i.template.orderCard.image ? (a(), n("img", {
                      key: 0,
                      src: i.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Md)) : b("", !0),
                    e("div", null, [
                      e("strong", null, c(i.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, c(i.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Vd, c(i.template.orderCard.buttonLabel || "View"), 1),
                  E[21] || (E[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : b("", !0),
              i.template.documentCard || ((h = i.template.header) == null ? void 0 : h.type) === "document" ? (a(), n("div", Dd, [
                e("div", Hd, [
                  e("div", jd, [
                    e("span", Wd, c(Y.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((le = i.template.documentCard) == null ? void 0 : le.filename) || (($e = i.template.header) == null ? void 0 : $e.filename) || "document.pdf"
                      }, c(((_e = i.template.documentCard) == null ? void 0 : _e.filename) || ((we = i.template.header) == null ? void 0 : we.filename) || "document.pdf"), 9, qd),
                      e("p", null, c(((P = i.template.documentCard) == null ? void 0 : P.size) || "243 KB • html"), 1)
                    ]),
                    E[22] || (E[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Fd, c(((Q = i.template.documentCard) == null ? void 0 : Q.caption) || i.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : b("", !0),
              i.template.voiceNote ? (a(), n("div", zd, [
                e("div", Yd, [
                  e("div", Kd, [
                    E[24] || (E[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    E[25] || (E[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Gd, [
                      i.template.voiceNote.profileImage ? (a(), n("img", {
                        key: 0,
                        src: i.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Jd)) : b("", !0),
                      E[23] || (E[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Qd, c(i.template.voiceNote.duration || "0:10"), 1),
                  e("p", Xd, c(i.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : b("", !0),
              i.template.contactCard ? (a(), n("div", Zd, [
                e("div", ec, [
                  e("strong", null, c(i.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, c(i.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, c(i.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, c(i.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, c(i.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : b("", !0),
              i.template.location && i.template.locationRequest ? (a(), n("div", tc, [
                e("div", ac, [
                  E[26] || (E[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", nc, [
                    e("strong", null, c(i.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: E[4] || (E[4] = Ke(() => {
                      }, ["prevent"]))
                    }, c(i.template.location.address || `${i.template.location.lat}, ${i.template.location.lng}`), 1)
                  ]),
                  e("button", sc, c(i.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : b("", !0),
              (z = i.template.carouselCards) != null && z.length ? (a(), n("div", lc, [
                e("div", oc, [
                  (a(!0), n(U, null, V(i.template.carouselCards.slice(0, 4), (ie, me) => (a(), n("article", {
                    key: `c-${me}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: Ie(ie.image ? { backgroundImage: `url(${ie.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, c(ie.title || `Card ${me + 1}`), 1),
                    e("p", null, c(ie.description || "Card description"), 1),
                    e("button", ic, c(ie.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : b("", !0),
              e("div", rc, [
                e("div", uc, [
                  e("span", dc, c(k.value), 1),
                  e("p", null, c(ye.value), 1),
                  E[27] || (E[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  i.template.reactionEmoji ? (a(), n("span", cc, c(i.template.reactionEmoji), 1)) : b("", !0)
                ])
              ]),
              e("div", pc, [
                e("div", mc, [
                  e("p", null, c(Ce.value), 1),
                  (he = i.template.flow) != null && he.id ? (a(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: E[5] || (E[5] = Ke(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + c(i.template.flow.id), 1)) : b("", !0),
                  E[28] || (E[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            E[31] || (E[31] = tt('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), bc = /* @__PURE__ */ Le(vc, [["__scopeId", "data-v-244c945a"]]), yc = { class: "keos-whatsapp-builder" }, hc = { class: "kb-builder-top" }, fc = { class: "kb-wa-layout" }, gc = { class: "kb-wa-sidebar" }, kc = {
  key: 0,
  class: "kb-wa-form"
}, _c = { class: "kb-wa-form-head" }, $c = { class: "kb-wa-form-head-top" }, wc = { class: "kb-wa-health-pill" }, xc = { class: "kb-wa-form-head-row" }, Cc = ["value"], Sc = { class: "kb-wa-health" }, Ic = { class: "kb-wa-health-row" }, Tc = { class: "kb-wa-health-value" }, Ac = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Uc = { class: "kb-wa-canvas" }, Rc = {
  key: 0,
  class: "kb-wa-test-banner"
}, Ec = { class: "kb-wa-preview-chrome" }, Pc = { class: "kb-push-preview-controls" }, Bc = { class: "kb-push-preview-as" }, Lc = ["value"], Oc = { class: "kb-preview-status" }, Nc = { class: "kb-wa-actions" }, Mc = {
  key: 0,
  class: "kb-actions-note"
}, Vc = { key: 0 }, Dc = { class: "kb-wa-actions-right" }, Hc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, jc = { class: "kb-confirm-dialog" }, Wc = { class: "kb-confirm-actions" }, Bt = 60, Lt = 1024, Ot = 60, Nt = 10, Mt = 10, qc = /* @__PURE__ */ Pe({
  __name: "KeosWhatsAppBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    disabledTemplateCategories: { default: () => [] },
    disabledTemplateFormats: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    actionsNote: { default: "" },
    designOnly: { type: Boolean, default: !0 },
    enforceSlugName: { type: Boolean, default: !1 },
    mediaUploadUrl: {},
    mediaUploadHeaders: {},
    placeholderMode: { default: "named" }
  },
  emits: ["update:modelValue", "change", "save", "save-gupshup-template", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(i, { emit: p }) {
    const m = /* @__PURE__ */ new Set(["image", "video", "document"]), y = /* @__PURE__ */ new Set([
      "elementName",
      "languageCode",
      "category",
      "templateType",
      "content",
      "metaTemplate",
      "metaWhatsApp"
    ]);
    function k(s) {
      return s == null ? !1 : typeof s == "string" ? s.trim().length > 0 : Array.isArray(s) ? s.length > 0 : typeof s == "object" ? Object.keys(s).length > 0 : !0;
    }
    function S(s) {
      const o = {
        elementName: s.elementName,
        languageCode: s.languageCode,
        category: s.category,
        templateType: s.templateType,
        content: s.content,
        metaTemplate: s.metaTemplate,
        metaWhatsApp: s.metaWhatsApp ?? s.metaTemplate,
        containerMeta: s.containerMeta,
        footer: s.footer,
        buttons: s.buttons,
        example: s.example,
        exampleMedia: s.exampleMedia,
        vertical: s.vertical,
        enableSample: s.enableSample,
        allowTemplateCategoryChange: s.allowTemplateCategoryChange,
        addSecurityRecommendation: s.addSecurityRecommendation,
        codeExpirationMinutes: s.codeExpirationMinutes,
        advanced: s.advanced
      };
      return Object.fromEntries(
        Object.entries(o).filter(([g, v]) => y.has(g) ? !0 : k(v))
      );
    }
    function A(s) {
      const o = { ...s }, g = String(o.template_type ?? "text").trim().toLowerCase(), v = String(o.header_type ?? "none").trim().toLowerCase();
      m.has(g) || m.has(v) || (o.media_url = void 0, o.media_caption = void 0, o.document_filename = void 0, o.document_size = void 0), g !== "carousel" && (o.cards = void 0), g !== "catalog" && g !== "mpm" && (o.products = void 0), g !== "flow" && (o.flow_id = void 0, o.flow_cta_label = void 0), g !== "lto" && (o.lto_expiry = void 0), g !== "auth" && (o.auth_type = void 0, o.auth_label = void 0, o.auth_code = void 0, o.otp_code = void 0), g !== "document" && v !== "document" && (o.document_filename = void 0, o.document_size = void 0), g !== "location" && (o.location = void 0);
      const I = Array.isArray(o.buttons) ? o.buttons : [];
      return o.buttons = I, o;
    }
    function T(s) {
      var u, d, r, t, w;
      const o = [], g = s.message, v = (g.template_category ?? "").toString().trim(), M = (g.template_type ?? "text").toString(), I = (g.header_type ?? "none").toString(), N = (g.header ?? "").toString(), K = (g.body ?? "").toString(), ve = (g.footer ?? "").toString(), ee = Array.isArray(g.buttons) ? g.buttons : [], _ = Array.isArray(g.cards) ? g.cards : [];
      return (u = s.name) != null && u.trim() || o.push("Template name is required"), (d = g.template_name) != null && d.trim() || o.push("WhatsApp template name is required"), v || o.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), K.trim() || o.push("Body is required"), I === "text" && N.length > Bt && o.push(`Header text cannot exceed ${Bt} characters`), K.length > Lt && o.push(`Body cannot exceed ${Lt} characters`), ve.length > Ot && o.push(`Footer cannot exceed ${Ot} characters`), ee.length > Nt && o.push(`Buttons cannot exceed ${Nt}`), (M === "image" || M === "video" || M === "document" || I === "image" || I === "video" || I === "document") && !g.media_url && o.push("Media URL is required for rich media templates"), v === "authentication" && M !== "auth" && o.push("Authentication category must use Authentication format"), M === "auth" && !((r = g.auth_label) != null && r.trim()) && !K.includes("{{") && o.push("Authentication templates should include a code label or placeholder variable"), M === "lto" && !g.lto_expiry && o.push("Limited-time offer requires an expiry"), (M === "mpm" || M === "catalog") && !((t = g.products) != null && t.length) && o.push("Catalog and multi-product templates require at least one product"), M === "flow" && !((w = g.flow_id) != null && w.trim()) && o.push("WhatsApp Flow format requires a flow ID"), M === "carousel" && (_.length ? _.length > Mt && o.push(`Carousel supports up to ${Mt} cards`) : o.push("Carousel format requires at least one card")), o;
    }
    function O(s, o, g) {
      const v = s.message, M = String(v.template_category ?? "").trim(), I = String(v.template_type ?? "text").trim(), N = [];
      return M && o.includes(M) && N.push(`WhatsApp category "${M}" is disabled in this builder configuration`), I && g.includes(I) && N.push(`WhatsApp format "${I}" is disabled in this builder configuration`), N;
    }
    const B = i;
    function G(s) {
      if (!s) return {};
      const o = s.metaTemplate ?? s.metaWhatsApp, g = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((d) => (d == null ? void 0 : d.type) === "BODY") : void 0, v = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((d) => (d == null ? void 0 : d.type) === "FOOTER") : void 0, M = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((d) => (d == null ? void 0 : d.type) === "HEADER") : void 0, I = String(s.content ?? "").trim(), N = String(s.elementName ?? "").trim(), K = String(s.languageCode ?? "").trim(), ve = String(s.category ?? "").trim().toLowerCase(), ee = String(s.templateType ?? "").trim().toLowerCase(), _ = String(s.footer ?? "").trim(), u = String(s.header ?? "").trim();
      return {
        ...s,
        ...N && !s.template_name ? { template_name: N } : {},
        ...K && !s.template_language ? { template_language: K } : {},
        ...ve && !s.template_category ? { template_category: ve } : {},
        ...ee && !s.template_type ? { template_type: ee } : {},
        ...I && !s.body ? { body: I } : {},
        ..._ && !s.footer ? { footer: _ } : {},
        ...u && !s.header ? { header: u } : {},
        ...!s.body && (g != null && g.text) ? { body: String(g.text) } : {},
        ...!s.footer && (v != null && v.text) ? { footer: String(v.text) } : {},
        ...!s.header && (M != null && M.text) ? { header: String(M.text) } : {}
      };
    }
    function te(s) {
      if (!s) return s;
      const o = G(s.message);
      return { ...s, message: o };
    }
    const se = p;
    function ce(s) {
      var g;
      const o = St(s, {
        exampleData: (g = Be.value) == null ? void 0 : g.data
      });
      return {
        ...s,
        message: S(o.payload)
      };
    }
    const {
      campaign: H,
      dirty: ne,
      customValidatorErrors: q,
      getValidationWithWarnings: pe,
      update: D,
      updateMessage: Y,
      undo: J,
      redo: ae,
      canUndo: ye,
      canRedo: Ce,
      resetMessage: Z,
      hooks: f
    } = ct({
      initial: te(B.modelValue),
      hooks: {
        ...B.hooks,
        customValidators: async (s) => {
          var v;
          const o = [
            ...T(s),
            ...O(
              s,
              B.disabledTemplateCategories,
              B.disabledTemplateFormats
            )
          ], g = (v = B.hooks) != null && v.customValidators ? await B.hooks.customValidators(s) : [];
          return [...o, ...g];
        }
      },
      onDirty: () => se("change", ce(H.value))
    }), { lastSavedAt: E } = pt(H, { channel: "whatsapp" });
    function j(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ae() : J());
    }
    st(() => {
      window.addEventListener("keydown", j);
    }), lt(() => {
      window.removeEventListener("keydown", j);
    }), Ne(H, (s) => se("update:modelValue", ce(s)), {
      deep: !0
    });
    const ke = re(), oe = re(!0);
    async function R() {
      if (f.estimateReach)
        try {
          ke.value = await f.estimateReach(H.value.audience);
        } catch {
          ke.value = void 0;
        }
      f.canSend && (oe.value = await Promise.resolve(f.canSend()));
    }
    R(), Ne(() => H.value.audience, R, { deep: !0 });
    const W = $(() => (q.value, pe(ke.value))), h = $(() => W.value.blockingErrors), le = $(() => W.value.warnings), $e = $(() => W.value.valid), _e = $(() => {
      var v, M, I;
      const s = H.value.message, o = [
        !!((v = s.template_name) != null && v.trim()),
        !!((M = s.template_category) != null && M.trim()),
        !!(s.body ?? "").toString().trim(),
        !!((I = s.template_language) != null && I.trim()),
        Array.isArray(s.buttons) ? s.buttons.length > 0 : !1
      ], g = o.filter(Boolean).length;
      return Math.round(g / o.length * 100);
    }), we = $(() => _e.value >= 90 ? "Production ready" : _e.value >= 70 ? "Strong draft" : _e.value >= 40 ? "In progress" : "Needs setup"), P = $(() => {
      const s = H.value.message;
      return !!((s.body ?? "").toString().trim() || (s.header ?? "").toString().trim() || s.media_url || s.flow_id || s.coupon_code || s.lto_expiry || s.voice_transcript || s.contact_name || s.link_title || s.order_title || Array.isArray(s.buttons) && s.buttons.length || Array.isArray(s.products) && s.products.length || Array.isArray(s.cards) && s.cards.length);
    }), Q = re(""), z = re(!1), he = re(null), ie = $(
      () => new Set((B.disabledTemplateCategories ?? []).map((s) => String(s).trim().toLowerCase()))
    ), me = $(
      () => new Set((B.disabledTemplateFormats ?? []).map((s) => String(s).trim().toLowerCase()))
    ), Re = $(
      () => mo.filter((s) => {
        var M;
        const o = ((M = s.campaign) == null ? void 0 : M.message) ?? {}, g = String(o.template_category ?? "").trim().toLowerCase(), v = String(o.template_type ?? "").trim().toLowerCase();
        return !(g && ie.value.has(g) || v && me.value.has(v));
      })
    ), Be = $(() => {
      const s = Q.value;
      return s ? et.find((o) => o.id === s) ?? null : null;
    }), Oe = $(() => {
      const s = H.value.message.body ?? "";
      return Be.value ? Qe(s, Be.value.data) : s;
    }), be = $(() => {
      const s = H.value.message.header ?? "";
      return Be.value ? Qe(s, Be.value.data) : s;
    }), De = $(() => {
      var d;
      const s = H.value.message, o = s.template_type ?? "text", g = s.header_type ?? "none";
      let v, M, I, N, K, ve, ee;
      (o === "image" || g === "image") && s.media_url ? v = { type: "image", url: s.media_url } : (o === "video" || g === "video") && s.media_url ? v = { type: "video", url: s.media_url } : o === "document" || g === "document" ? v = {
        type: "document",
        url: s.media_url || void 0,
        filename: s.document_filename || s.media_url || "document.pdf"
      } : g === "text" && s.header ? v = { type: "text", text: be.value } : s.header && (v = { type: "text", text: be.value });
      const _ = Oe.value || "Start adding content to see a live preview here.";
      if (o === "location" && s.location) {
        const r = s.location, t = r.lat ?? r.latitude, w = r.lng ?? r.lon ?? r.longitude;
        t != null && w != null && (M = {
          lat: t,
          lng: w,
          name: r.name ?? r.title,
          address: r.address ?? `${t}, ${w}`
        });
      }
      (o === "catalog" || o === "mpm") && Array.isArray(s.products) && s.products.length && (I = !0, N = s.products.map((r) => ({
        image: r.image ?? r.imageUrl,
        name: r.name ?? r.sectionTitle ?? r.title ?? "Product",
        price: r.price ?? r.productId ?? ""
      }))), o === "carousel" && Array.isArray(s.cards) && s.cards.length && (I = !0, N = s.cards.map((r) => ({
        image: r.image ?? r.media_url,
        name: r.title ?? "Card",
        price: r.button_label ?? ""
      }))), o === "coupon" && s.coupon_code && (K = { code: s.coupon_code }), o === "lto" && s.lto_expiry && (ve = s.lto_expiry), o === "auth" && (ee = { code: s.auth_code ?? s.otp_code ?? "123 456" });
      const u = s.buttons ?? [];
      return o === "flow" && ((d = s.flow_cta_label) != null && d.trim()) && u.push({
        label: s.flow_cta_label
      }), {
        format: o,
        templateName: s.template_name || void 0,
        templateLanguage: s.template_language || void 0,
        templateCategory: s.template_category || void 0,
        header: v,
        body: _,
        mediaCaption: s.media_caption || void 0,
        footer: s.footer || void 0,
        buttons: u.map((r) => ({ text: r.label || "Button", type: r.type, value: r.value })),
        location: M,
        catalog: I,
        multiProduct: N,
        coupon: K,
        limitedOffer: ve,
        auth: ee,
        linkPreview: s.link_title || s.link_description || s.link_url ? {
          title: s.link_title || void 0,
          description: s.link_description || void 0,
          domain: s.link_domain || void 0,
          url: s.link_url || void 0,
          thumbnail: s.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: s.voice_transcript || s.voice_duration || s.voice_profile_image ? {
          transcript: s.voice_transcript || void 0,
          duration: s.voice_duration || void 0,
          profileImage: s.voice_profile_image || void 0
        } : void 0,
        contactCard: s.contact_name || s.contact_phone || s.contact_email ? {
          name: s.contact_name || void 0,
          title: s.contact_title || void 0,
          phone: s.contact_phone || void 0,
          email: s.contact_email || void 0,
          address: s.contact_address || void 0
        } : void 0,
        documentCard: s.document_filename || o === "document" || g === "document" ? {
          filename: s.document_filename || s.media_url || "document.pdf",
          size: s.document_size || void 0,
          caption: s.media_caption || void 0
        } : void 0,
        locationRequest: s.location_request_label ? { label: s.location_request_label } : void 0,
        orderCard: s.order_title || s.order_items || s.order_image ? {
          title: s.order_title || void 0,
          items: s.order_items || void 0,
          image: s.order_image || void 0,
          buttonLabel: s.order_button_label || void 0
        } : void 0,
        carouselCards: o === "carousel" && Array.isArray(s.cards) ? s.cards.map((r) => ({
          title: r.title || void 0,
          description: r.description || s.body || void 0,
          image: r.media_url || void 0,
          button: r.button_label || void 0
        })) : void 0,
        reactionEmoji: s.reaction_emoji || void 0,
        flow: o === "flow" ? {
          id: s.flow_id || void 0,
          ctaLabel: s.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Ee(s) {
      var v;
      const o = H.value, g = A({
        ...s.campaign.message ? s.campaign.message : o.message,
        template_name: ((v = s.campaign.message) == null ? void 0 : v.template_name) ?? s.campaign.name ?? o.name ?? void 0
      });
      D({
        ...s.campaign,
        message: g
      }), he.value = null, z.value = !1;
    }
    function We(s) {
      const o = s.target.value;
      if (!o) return;
      const g = Re.value.find((v) => v.id === o);
      g && (ne.value ? (he.value = g, z.value = !0) : Ee(g), s.target.value = "");
    }
    function qe(s) {
      D({
        name: s,
        message: { ...H.value.message, template_name: s || void 0 },
        tracking: { ...H.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Fe(s) {
      const o = H.value.message, g = A({
        ...o,
        ...s ?? {}
      });
      if (Y(g), Object.prototype.hasOwnProperty.call(s ?? {}, "template_name")) {
        const v = String((s == null ? void 0 : s.template_name) ?? "");
        v !== H.value.name && D({
          name: v,
          tracking: {
            ...H.value.tracking ?? {},
            campaign_name: v
          }
        });
      }
    }
    Ne(
      () => H.value.name,
      (s) => {
        const o = String(H.value.message.template_name ?? "");
        (s || "") !== o && Y({ template_name: s || void 0 });
      },
      { immediate: !0 }
    );
    function Ae(s) {
      const o = ` {{ .${s.variable} }}`, g = H.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, s.variable]));
      if (s.field === "title") {
        const M = H.value.message.header ?? "";
        Y({
          variables: v,
          header: M + o
        });
      } else if (s.field === "footer") {
        const M = H.value.message.footer ?? "";
        Y({
          variables: v,
          footer: M + o
        });
      } else {
        const M = H.value.message.body ?? "";
        Y({
          variables: v,
          body: M + o
        });
      }
    }
    function ue() {
      var g;
      if (!$e.value) return;
      const s = St(H.value, {
        exampleData: (g = Be.value) == null ? void 0 : g.data
      }), o = ce(H.value);
      se("save-gupshup-template", s.payload, s.warnings, o), se("save", o);
    }
    return (s, o) => {
      var g;
      return a(), n("div", yc, [
        e("div", hc, [
          Me(mt, {
            "campaign-name": C(H).name,
            status: C(H).status,
            dirty: C(ne),
            "last-saved-at": C(E),
            "can-undo": C(ye),
            "can-redo": C(Ce),
            "slugify-name": B.enforceSlugName,
            "onUpdate:campaignName": qe,
            onUndo: C(J),
            onRedo: C(ae)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          h.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ie({
              background: C(Ue).dangerBg,
              border: `1px solid ${C(Ue).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(Se)[12]}px ${C(Se)[16]}px`,
              marginBottom: `${C(Se)[16]}px`
            })
          }, [
            e("ul", {
              style: Ie({ margin: 0, paddingLeft: "1.25rem", color: C(Ue).danger })
            }, [
              (a(!0), n(U, null, V(h.value, (v) => (a(), n("li", {
                key: v.message
              }, c(v.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", fc, [
          e("aside", gc, [
            i.disabledSections.includes("whatsapp") ? b("", !0) : (a(), n("div", kc, [
              e("div", _c, [
                e("div", $c, [
                  o[6] || (o[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", wc, c(we.value), 1)
                ]),
                e("div", xc, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: We
                  }, [
                    o[7] || (o[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, V(Re.value, (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Cc))), 128))
                  ], 32)
                ]),
                e("div", Sc, [
                  e("div", Ic, [
                    o[8] || (o[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", Tc, c(_e.value) + "%", 1)
                  ]),
                  e("div", Ac, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: Ie({ width: `${_e.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(ju, {
                message: C(H).message,
                "show-reset": !0,
                "disabled-categories": i.disabledTemplateCategories,
                "disabled-formats": i.disabledTemplateFormats,
                "placeholder-mode": i.placeholderMode,
                "media-upload-url": i.mediaUploadUrl,
                "media-upload-headers": i.mediaUploadHeaders,
                onUpdate: Fe,
                onReset: o[0] || (o[0] = (v) => C(Z)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats", "placeholder-mode", "media-upload-url", "media-upload-headers"]),
              Me(Gt, {
                message: C(H).message,
                "variable-options": i.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: C(Y),
                onInsertVariable: Ae
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Uc, [
            !i.designOnly && C(H).audience.test_mode ? (a(), n("div", Rc, [...o[9] || (o[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Ec, [
              e("div", Pc, [
                e("label", Bc, [
                  o[11] || (o[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (v) => Q.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[10] || (o[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, V(C(et), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Lc))), 128))
                  ], 512), [
                    [Ge, Q.value]
                  ])
                ]),
                e("div", Oc, [
                  o[12] || (o[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, c(C(H).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: xe(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !P.value }])
              }, [
                Me(bc, { template: De.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Nc, [
          le.value.length > 0 ? (a(), n("div", Mc, [
            o[13] || (o[13] = e("strong", null, "Warning:", -1)),
            F(" " + c((g = le.value[0]) == null ? void 0 : g.message) + " ", 1),
            le.value.length > 1 ? (a(), n("span", Vc, " (+" + c(le.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", Dc, [
            i.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: o[2] || (o[2] = (v) => se("duplicate", JSON.parse(JSON.stringify(C(H)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: ue
            }, " Save ")) : b("", !0),
            i.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: o[3] || (o[3] = (v) => se("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        z.value ? (a(), n("div", Hc, [
          e("div", jc, [
            o[14] || (o[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[15] || (o[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Wc, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: o[4] || (o[4] = (v) => {
                  z.value = !1, he.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: o[5] || (o[5] = (v) => he.value && Ee(he.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0)
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Le(qc, [["__scopeId", "data-v-56eaa3ab"]]), Fc = { class: "kb-section" }, zc = { class: "kb-section__head" }, Yc = { class: "kb-field" }, Kc = ["value"], Gc = { class: "kb-field" }, Jc = { class: "kb-label" }, Qc = { key: 0 }, Xc = { key: 1 }, Zc = { key: 2 }, ep = { class: "kb-field-with-var" }, tp = ["value"], ap = { class: "kb-var-picker-wrap" }, np = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, sp = ["onClick"], lp = {
  key: 0,
  class: "kb-truncation-hint"
}, op = { class: "kb-field" }, ip = { class: "kb-insert-row" }, rp = ["value"], up = { class: "kb-field" }, dp = { class: "kb-insert-row" }, cp = /* @__PURE__ */ Pe({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    const m = i, y = p, k = [
      "first_name",
      "last_name",
      "full_name",
      "phone",
      "order_id",
      "order_status",
      "tracking_url",
      "appointment_date",
      "appointment_time",
      "otp_code",
      "support_phone",
      "city"
    ], S = re(m.variableOptions && m.variableOptions.length ? [...m.variableOptions] : k), A = re(S.value[0] ?? k[0]), T = re("");
    Ne(
      () => m.variableOptions,
      (Y) => {
        Y && Y.length && (S.value = [...Y], S.value.includes(A.value) || (A.value = S.value[0]));
      }
    );
    const O = $(() => m.message.body ?? ""), B = re(null), G = $(() => O.value.length), te = $(() => G.value ? G.value <= 160 ? 1 : Math.ceil(G.value / 153) : 0), se = $(() => {
      const Y = G.value;
      return Y <= 160 ? null : Y <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function ce(Y) {
      const J = Y.target.value;
      y("update", {
        sender_id: J || void 0
      });
    }
    function H(Y) {
      const J = Y.target.value;
      y("update", {
        body: J
      });
    }
    function ne() {
      const Y = A.value;
      if (!Y) return;
      const J = ` {{ .${Y} }}`, ae = O.value || "", ye = m.message.variables ?? [], Ce = Array.from(/* @__PURE__ */ new Set([...ye, Y]));
      y("update", {
        body: ae + J,
        variables: Ce
      });
    }
    function q(Y) {
      B.value = B.value === Y ? null : Y;
    }
    function pe(Y, J) {
      const ae = ` {{ .${J} }}`, ye = O.value || "", Ce = m.message.variables ?? [], Z = Array.from(/* @__PURE__ */ new Set([...Ce, J]));
      y("update", {
        body: ye + ae,
        variables: Z
      }), B.value = null;
    }
    function D() {
      const Y = T.value.trim();
      Y && (S.value.includes(Y) || (S.value = [...S.value, Y]), A.value = Y, T.value = "");
    }
    return (Y, J) => (a(), n("section", Fc, [
      e("div", zc, [
        J[4] || (J[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        i.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: J[0] || (J[0] = (ae) => Y.$emit("reset"))
        }, " Reset section ")) : b("", !0)
      ]),
      J[11] || (J[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Yc, [
        J[5] || (J[5] = e("label", { class: "kb-label" }, [
          F(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: m.message.sender_id ?? "",
          onInput: ce
        }, null, 40, Kc)
      ]),
      e("div", Gc, [
        e("label", Jc, [
          J[6] || (J[6] = F(" Message body ", -1)),
          e("span", {
            class: xe(["kb-counter", { "kb-counter--warn": te.value > 3 }])
          }, [
            F(c(G.value) + " chars · ", 1),
            te.value === 0 ? (a(), n("span", Qc, "0 segments")) : te.value === 1 ? (a(), n("span", Xc, "1 segment")) : (a(), n("span", Zc, c(te.value) + " segments", 1))
          ], 2)
        ]),
        e("div", ep, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: O.value,
            onInput: H
          }, null, 40, tp),
          e("div", ap, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: J[1] || (J[1] = (ae) => q("body"))
            }, "{{ .var }}"),
            B.value === "body" ? (a(), n("div", np, [
              (a(!0), n(U, null, V(S.value, (ae) => (a(), n("button", {
                key: `sms-body-var-${ae}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (ye) => pe("body", ae)
              }, c(ae), 9, sp))), 128))
            ])) : b("", !0)
          ])
        ]),
        J[7] || (J[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        se.value ? (a(), n("p", lp, c(se.value), 1)) : b("", !0)
      ]),
      e("div", op, [
        J[8] || (J[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", ip, [
          je(e("select", {
            "onUpdate:modelValue": J[2] || (J[2] = (ae) => A.value = ae),
            class: "kb-select"
          }, [
            (a(!0), n(U, null, V(S.value, (ae) => (a(), n("option", {
              key: ae,
              value: ae
            }, c(ae), 9, rp))), 128))
          ], 512), [
            [Ge, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ne
          }, " Insert into message ")
        ]),
        J[9] || (J[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", up, [
        J[10] || (J[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", dp, [
          je(e("input", {
            "onUpdate:modelValue": J[3] || (J[3] = (ae) => T.value = ae),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [ut, T.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: D
          }, " Add ")
        ])
      ])
    ]));
  }
}), pp = /* @__PURE__ */ Le(cp, [["__scopeId", "data-v-68a73354"]]), mp = { class: "keos-sms-builder" }, vp = { class: "kb-builder-top" }, bp = { class: "kb-sms-layout" }, yp = { class: "kb-sms-sidebar" }, hp = {
  key: 0,
  class: "kb-sms-form"
}, fp = { class: "kb-sms-form-head" }, gp = { class: "kb-sms-form-head-top" }, kp = { class: "kb-sms-health-pill" }, _p = { class: "kb-wa-form-head-row" }, $p = ["value"], wp = { class: "kb-sms-health" }, xp = { class: "kb-sms-health-row" }, Cp = { class: "kb-sms-health-value" }, Sp = { class: "kb-sms-health-bar" }, Ip = { class: "kb-sms-canvas" }, Tp = {
  key: 0,
  class: "kb-sms-test-banner"
}, Ap = { class: "kb-sms-preview-chrome" }, Up = { class: "kb-push-preview-controls" }, Rp = { class: "kb-push-preview-as" }, Ep = ["value"], Pp = { class: "kb-preview-status" }, Bp = { class: "kb-preview" }, Lp = { class: "kb-sms-preview" }, Op = { class: "kb-sms-phone" }, Np = { class: "kb-sms-header" }, Mp = { class: "kb-sms-sender-avatar" }, Vp = { class: "kb-sms-header-copy" }, Dp = { class: "kb-sms-sender" }, Hp = { class: "kb-sms-meta" }, jp = { class: "kb-sms-thread" }, Wp = {
  key: 0,
  class: "kb-sms-empty"
}, qp = { class: "kb-sms-text" }, Fp = { class: "kb-sms-bubble-meta" }, zp = {
  key: 0,
  class: "kb-sms-segment-chip"
}, Yp = {
  key: 0,
  class: "kb-sms-more-segments"
}, Kp = { class: "kb-sms-delivery-line" }, Gp = { class: "kb-sms-counter" }, Jp = { key: 0 }, Qp = { key: 1 }, Xp = { key: 2 }, Zp = {
  key: 3,
  class: "kb-sms-cost"
}, em = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, tm = { class: "kb-sms-actions" }, am = {
  key: 0,
  class: "kb-actions-note"
}, nm = { key: 0 }, sm = { class: "kb-sms-actions-right" }, lm = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, om = { class: "kb-confirm-dialog" }, im = { class: "kb-confirm-actions" }, rm = /* @__PURE__ */ Pe({
  __name: "KeosSmsBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    costPerSegment: { default: 0 },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    actionsNote: { default: "" },
    designOnly: { type: Boolean, default: !0 },
    enforceSlugName: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(i, { emit: p }) {
    const m = i, y = p, {
      campaign: k,
      dirty: S,
      customValidatorErrors: A,
      getValidationWithWarnings: T,
      update: O,
      updateMessage: B,
      undo: G,
      redo: te,
      canUndo: se,
      canRedo: ce,
      resetMessage: H,
      hooks: ne
    } = ct({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (ue) => {
          var g, v;
          const s = [];
          (g = ue.name) != null && g.trim() || s.push("Template name is required");
          const o = (v = m.hooks) != null && v.customValidators ? await m.hooks.customValidators(ue) : [];
          return [...s, ...o];
        }
      },
      onDirty: () => y("change", k.value)
    }), { lastSavedAt: q } = pt(k, { channel: "sms" });
    function pe(ue) {
      (ue.metaKey || ue.ctrlKey) && ue.key === "z" && (ue.preventDefault(), ue.shiftKey ? te() : G());
    }
    st(() => {
      window.addEventListener("keydown", pe);
    }), lt(() => {
      window.removeEventListener("keydown", pe);
    }), Ne(k, (ue) => y("update:modelValue", ue), { deep: !0 });
    const D = re(), Y = re(!0);
    async function J() {
      if (ne.estimateReach)
        try {
          D.value = await ne.estimateReach(k.value.audience);
        } catch {
          D.value = void 0;
        }
      ne.canSend && (Y.value = await Promise.resolve(ne.canSend()));
    }
    J(), Ne(() => k.value.audience, J, { deep: !0 });
    const ae = $(() => (A.value, T(D.value))), ye = $(() => ae.value.blockingErrors), Ce = $(() => ae.value.warnings), Z = $(() => ae.value.valid), f = $(() => {
      var g, v, M;
      const ue = k.value.message, s = [
        !!((g = k.value.name) != null && g.trim()),
        !!((v = ue.body) != null && v.trim()),
        !!((M = ue.sender_id) != null && M.trim()),
        !!k.value.template_type,
        (ue.body ?? "").length > 20
      ], o = s.filter(Boolean).length;
      return Math.round(o / s.length * 100);
    }), E = $(() => f.value >= 90 ? "Production ready" : f.value >= 70 ? "Strong draft" : f.value >= 40 ? "In progress" : "Needs setup"), j = $(() => !!Q.value.trim()), ke = $(
      () => k.value.template_type ?? "transactional"
    ), oe = re(""), R = re(!1), W = re(null), h = $(() => {
      const ue = oe.value;
      return ue ? et.find((s) => s.id === ue) ?? null : null;
    }), le = $(() => {
      const ue = Q.value;
      return h.value ? Qe(ue, h.value.data) : ue;
    });
    function $e(ue) {
      const s = k.value, o = ue.campaign.message ? { ...s.message, ...ue.campaign.message } : s.message;
      O({
        ...ue.campaign,
        message: o
      }), W.value = null, R.value = !1;
    }
    function _e(ue) {
      const s = ue.target.value;
      if (!s) return;
      const o = Rt.find((g) => g.id === s);
      o && (S.value ? (W.value = o, R.value = !0) : $e(o), ue.target.value = "");
    }
    function we(ue) {
      O({ template_type: ue });
    }
    function P(ue) {
      O({
        name: ue,
        tracking: { ...k.value.tracking ?? {}, campaign_name: ue }
      });
    }
    const Q = $(
      () => (k.value.message.body ?? "") || ""
    ), z = $(() => Q.value.length), he = $(() => /[^\x00-\x7f]/.test(Q.value)), ie = $(() => he.value ? 70 : 160), me = $(() => he.value ? 67 : 153), Re = $(() => z.value ? z.value <= ie.value ? 1 : Math.ceil(z.value / me.value) : 0), Be = $(() => {
      const ue = le.value.trim();
      if (!ue) return [];
      const s = Re.value <= 1 ? ie.value : me.value, o = [];
      for (let g = 0; g < ue.length; g += s)
        o.push(ue.slice(g, g + s));
      return o;
    }), Oe = $(() => Be.value.slice(0, 3)), be = $(
      () => Math.max(0, Be.value.length - Oe.value.length)
    ), De = $(() => he.value ? "Unicode" : "GSM-7"), Ee = $(() => j.value ? Re.value > 3 ? "Queued" : "Delivered" : "Draft"), We = $(() => {
      const ue = m.costPerSegment ?? 0;
      return !ue || Re.value === 0 ? null : (Re.value * ue).toFixed(2);
    }), qe = $(() => {
      const ue = z.value, s = ie.value + me.value;
      return ue <= ie.value ? null : ue <= s ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Fe = $(
      () => k.value.message.sender_id ?? "YourBrand"
    );
    function Ae() {
      Z.value && y("save", k.value);
    }
    return (ue, s) => {
      var o;
      return a(), n("div", mp, [
        e("div", vp, [
          Me(mt, {
            "campaign-name": C(k).name,
            status: C(k).status,
            dirty: C(S),
            "last-saved-at": C(q),
            "can-undo": C(se),
            "can-redo": C(ce),
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": P,
            onUndo: C(G),
            onRedo: C(te)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ye.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ie({
              background: C(Ue).dangerBg,
              border: `1px solid ${C(Ue).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(Se)[12]}px ${C(Se)[16]}px`,
              marginBottom: `${C(Se)[16]}px`
            })
          }, [
            e("ul", {
              style: Ie({ margin: 0, paddingLeft: "1.25rem", color: C(Ue).danger })
            }, [
              (a(!0), n(U, null, V(ye.value, (g) => (a(), n("li", {
                key: g.message
              }, c(g.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", bp, [
          e("aside", yp, [
            i.disabledSections.includes("sms") ? b("", !0) : (a(), n("div", hp, [
              e("div", fp, [
                e("div", gp, [
                  s[6] || (s[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", kp, c(E.value), 1)
                ]),
                e("div", _p, [
                  Me(_t, {
                    "template-type": ke.value,
                    onUpdate: we
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: _e
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, V(C(Rt), (g) => (a(), n("option", {
                      key: g.id,
                      value: g.id
                    }, c(g.label), 9, $p))), 128))
                  ], 32)
                ]),
                e("div", wp, [
                  e("div", xp, [
                    s[8] || (s[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", Cp, c(f.value) + "%", 1)
                  ]),
                  e("div", Sp, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: Ie({ width: `${f.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(pp, {
                message: C(k).message,
                "variable-options": i.variableOptions,
                "show-reset": !0,
                onUpdate: C(B),
                onReset: s[0] || (s[0] = (g) => C(H)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Ip, [
            !i.designOnly && C(k).audience.test_mode ? (a(), n("div", Tp, [...s[9] || (s[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Ap, [
              e("div", Up, [
                e("label", Rp, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (g) => oe.value = g),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, V(C(et), (g) => (a(), n("option", {
                      key: g.id,
                      value: g.id
                    }, c(g.label), 9, Ep))), 128))
                  ], 512), [
                    [Ge, oe.value]
                  ])
                ]),
                e("div", Pp, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, c(Re.value || 0), 1)
                ])
              ]),
              e("div", {
                class: xe(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !j.value }])
              }, [
                e("div", Bp, [
                  e("div", Lp, [
                    e("div", Op, [
                      s[15] || (s[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Np, [
                        e("div", Mp, c(Fe.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Vp, [
                          e("div", Dp, c(Fe.value), 1),
                          e("div", Hp, "Text message · " + c(Ee.value), 1)
                        ])
                      ]),
                      e("div", jp, [
                        j.value ? (a(), n(U, { key: 1 }, [
                          (a(!0), n(U, null, V(Oe.value, (g, v) => (a(), n("div", {
                            key: `${v}-${g.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", qp, c(g), 1),
                            e("span", Fp, [
                              s[13] || (s[13] = F(" 09:21 ", -1)),
                              Oe.value.length > 1 ? (a(), n("span", zp, "Part " + c(v + 1), 1)) : b("", !0)
                            ])
                          ]))), 128)),
                          be.value > 0 ? (a(), n("div", Yp, " +" + c(be.value) + " more segments ", 1)) : b("", !0),
                          e("div", Kp, [
                            s[14] || (s[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            F(" " + c(Ee.value), 1)
                          ])
                        ], 64)) : (a(), n("div", Wp, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Gp, [
                      F(c(z.value) + " characters · ", 1),
                      Re.value === 0 ? (a(), n("span", Jp, "0 segments")) : Re.value === 1 ? (a(), n("span", Qp, "1 segment")) : (a(), n("span", Xp, c(Re.value) + " segments", 1)),
                      F(" (" + c(ie.value) + " chars single, " + c(me.value) + " multi-part · " + c(De.value) + ") ", 1),
                      We.value !== null ? (a(), n("span", Zp, " · Est. " + c(We.value), 1)) : b("", !0)
                    ]),
                    qe.value ? (a(), n("p", em, c(qe.value), 1)) : b("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", tm, [
          Ce.value.length > 0 ? (a(), n("div", am, [
            s[16] || (s[16] = e("strong", null, "Warning:", -1)),
            F(" " + c((o = Ce.value[0]) == null ? void 0 : o.message) + " ", 1),
            Ce.value.length > 1 ? (a(), n("span", nm, " (+" + c(Ce.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", sm, [
            i.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: s[2] || (s[2] = (g) => y("duplicate", JSON.parse(JSON.stringify(C(k)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Ae
            }, " Save ")) : b("", !0),
            i.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: s[3] || (s[3] = (g) => y("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        R.value ? (a(), n("div", lm, [
          e("div", om, [
            s[17] || (s[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[18] || (s[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", im, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: s[4] || (s[4] = (g) => {
                  R.value = !1, W.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: s[5] || (s[5] = (g) => W.value && $e(W.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0)
      ]);
    };
  }
}), Zt = /* @__PURE__ */ Le(rm, [["__scopeId", "data-v-5e442b56"]]), um = 30, dm = 60, cm = 130;
function pm(i) {
  const p = (i ?? "").trim().length;
  return p < um ? "too_short" : p <= dm ? "good" : "too_long";
}
function mm(i) {
  const p = (i ?? "").trim().length;
  return p === 0 ? "too_short" : p <= cm ? "good" : "too_long";
}
const vm = [
  /\bFREE!!!?\b/i,
  /\b100%\s*guaranteed\b/i,
  /\bact\s*now\b/i,
  /\bclick\s*here\b/i,
  /\blimited\s*time\b/i,
  /\bwinner\b/i,
  /\bcongratulations\b/i,
  /\burgent\b/i,
  /\brisk[- ]?free\b/i
];
function Vt(i) {
  if (!i || typeof i != "string") return [];
  const p = [];
  for (const m of vm) {
    const y = i.match(m);
    y && p.push(y[0]);
  }
  return p;
}
function bm(i) {
  switch (i) {
    case "too_short":
      return "Short";
    case "good":
      return "Good length";
    case "too_long":
      return "Long";
    default:
      return "";
  }
}
function ym(i) {
  switch (i) {
    case "too_short":
      return "Add preheader";
    case "good":
      return "Good";
    case "too_long":
      return "Long";
    default:
      return "";
  }
}
const hm = { class: "em-section" }, fm = { class: "em-strip kb-section" }, gm = { class: "em-strip-head" }, km = { class: "em-field kb-field" }, _m = { class: "em-input-group em-input-group--overlay" }, $m = ["value"], wm = { class: "em-var-picker-wrap" }, xm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Cm = ["onClick"], Sm = { class: "em-field kb-field" }, Im = ["value"], Tm = { class: "em-field kb-field" }, Am = ["value"], Um = { class: "em-field kb-field" }, Rm = { class: "em-input-group em-input-group--overlay" }, Em = ["value"], Pm = { class: "em-var-picker-wrap" }, Bm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Lm = ["onClick"], Om = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Nm = ["onClick"], Mm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Vm = { class: "em-field kb-field" }, Dm = { class: "em-input-group" }, Hm = ["value"], jm = { class: "em-var-picker-wrap" }, Wm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, qm = ["onClick"], Fm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, zm = ["onClick"], Ym = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Km = { class: "em-strip kb-section em-strip--library" }, Gm = { class: "em-library-chips" }, Jm = ["onClick"], Qm = { class: "em-strip kb-section em-strip--blocks" }, Xm = { class: "em-block-list" }, Zm = ["data-type"], ev = { class: "em-block-bar" }, tv = { class: "em-block-type" }, av = { class: "em-block-actions" }, nv = ["disabled", "onClick"], sv = ["disabled", "onClick"], lv = ["onClick"], ov = {
  key: 0,
  class: "em-block-fields"
}, iv = ["value", "onChange"], rv = ["value", "onInput"], uv = { class: "em-var-picker-wrap" }, dv = ["onClick"], cv = ["onClick"], pv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, mv = ["onClick"], vv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, bv = ["onClick"], yv = {
  key: 1,
  class: "em-block-fields"
}, hv = ["value", "onInput"], fv = { class: "em-var-picker-wrap" }, gv = ["onClick"], kv = ["onClick"], _v = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, $v = ["onClick"], wv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, xv = ["onClick"], Cv = {
  key: 2,
  class: "em-block-fields"
}, Sv = ["value", "onInput"], Iv = ["value", "onInput"], Tv = { class: "em-var-picker-wrap" }, Av = ["onClick"], Uv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Rv = ["onClick"], Ev = ["value", "onInput"], Pv = {
  key: 3,
  class: "em-block-fields"
}, Bv = ["value", "onInput"], Lv = { class: "em-var-picker-wrap" }, Ov = ["onClick"], Nv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Mv = ["onClick"], Vv = ["value", "onInput"], Dv = { class: "em-block-fields--row" }, Hv = ["value", "onInput"], jv = { class: "em-check-row" }, Wv = ["checked", "onChange"], qv = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, Fv = ["value", "onInput"], zv = {
  key: 5,
  class: "em-block-fields"
}, Yv = ["value", "onInput"], Kv = ["value", "onInput"], Gv = ["value", "onInput"], Jv = { class: "em-var-picker-wrap" }, Qv = ["onClick"], Xv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Zv = ["onClick"], eb = { class: "em-var-picker-wrap" }, tb = ["onClick"], ab = ["onClick"], nb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, sb = ["onClick"], lb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, ob = ["onClick"], ib = {
  key: 6,
  class: "em-block-fields"
}, rb = ["value", "onChange"], ub = { class: "em-list-items" }, db = ["value", "onInput", "placeholder"], cb = { class: "em-var-picker-wrap" }, pb = ["onClick"], mb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, vb = ["onClick"], bb = ["onClick"], yb = ["onClick"], hb = {
  key: 7,
  class: "em-block-fields"
}, fb = ["value", "onChange"], gb = ["value", "onInput"], kb = { class: "em-var-picker-wrap" }, _b = ["onClick"], $b = ["onClick"], wb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, xb = ["onClick"], Cb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Sb = ["onClick"], Ib = {
  key: 8,
  class: "em-block-fields"
}, Tb = { class: "em-social-links" }, Ab = ["value", "onChange"], Ub = ["value", "onInput"], Rb = ["onClick"], Eb = ["onClick"], Pb = {
  key: 9,
  class: "em-block-fields"
}, Bb = ["value", "onInput"], Lb = ["value", "onInput"], Ob = ["value", "onInput"], Nb = { class: "em-var-picker-wrap" }, Mb = ["onClick"], Vb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Db = ["onClick"], Hb = {
  key: 10,
  class: "em-block-fields"
}, jb = ["value", "onInput"], Wb = { class: "em-link-list-items" }, qb = ["value", "onInput"], Fb = { class: "em-var-picker-wrap" }, zb = ["onClick"], Yb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Kb = ["onClick"], Gb = ["value", "onInput"], Jb = ["onClick"], Qb = ["onClick"], Xb = {
  key: 11,
  class: "em-block-fields"
}, Zb = ["value", "onInput"], ey = { class: "em-var-picker-wrap" }, ty = ["onClick"], ay = ["onClick"], ny = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, sy = ["onClick"], ly = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, oy = ["onClick"], iy = ["value", "onInput"], ry = { class: "em-var-picker-wrap" }, uy = ["onClick"], dy = ["onClick"], cy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, py = ["onClick"], my = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, vy = ["onClick"], by = {
  key: 12,
  class: "em-block-fields"
}, yy = { class: "em-block-fields--row" }, hy = ["value", "onInput"], fy = { class: "em-block-fields--row" }, gy = ["value", "onInput"], ky = ["value", "onChange"], _y = {
  key: 13,
  class: "em-block-fields"
}, $y = ["value", "onChange"], wy = { class: "em-inline-label" }, xy = ["value", "onInput"], Cy = { class: "em-var-picker-wrap" }, Sy = ["onClick"], Iy = ["onClick"], Ty = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ay = ["onClick"], Uy = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Ry = ["onClick"], Ey = {
  key: 14,
  class: "em-block-fields"
}, Py = ["value", "onInput"], By = { class: "em-link-list-items" }, Ly = ["value", "onInput"], Oy = { class: "em-var-picker-wrap" }, Ny = ["onClick"], My = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Vy = ["onClick"], Dy = ["value", "onInput"], Hy = ["onClick"], jy = ["onClick"], Wy = {
  key: 15,
  class: "em-block-fields"
}, qy = ["value", "onInput"], Fy = { class: "em-var-picker-wrap" }, zy = ["onClick"], Yy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ky = ["onClick"], Gy = ["value", "onInput"], Jy = { class: "em-var-picker-wrap" }, Qy = ["onClick"], Xy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Zy = ["onClick"], eh = ["onClick"], th = ["onClick"], ah = {
  key: 16,
  class: "em-block-fields"
}, nh = ["value", "onInput"], sh = ["value", "onInput"], lh = ["value", "onInput"], oh = ["onClick"], ih = ["onClick"], rh = {
  key: 17,
  class: "em-block-fields"
}, uh = ["value", "onInput"], dh = { class: "em-var-picker-wrap" }, ch = ["onClick"], ph = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, mh = ["onClick"], vh = ["value", "onInput"], bh = {
  key: 18,
  class: "em-block-fields"
}, yh = ["value", "onInput"], hh = ["value", "onInput"], fh = { class: "em-var-picker-wrap" }, gh = ["onClick"], kh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, _h = ["onClick"], $h = ["value", "onInput"], wh = { class: "em-var-picker-wrap" }, xh = ["onClick"], Ch = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Sh = ["onClick"], Ih = ["value", "onInput"], Th = { class: "em-var-picker-wrap" }, Ah = ["onClick"], Uh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Rh = ["onClick"], Eh = ["value", "onInput"], Ph = {
  key: 19,
  class: "em-block-fields"
}, Bh = ["value", "onInput"], Lh = { class: "em-var-picker-wrap" }, Oh = ["onClick"], Nh = ["onClick"], Mh = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Vh = ["onClick"], Dh = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Hh = ["onClick"], jh = {
  key: 20,
  class: "em-block-fields"
}, Wh = ["value", "onInput"], qh = { class: "em-var-picker-wrap" }, Fh = ["onClick"], zh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Yh = ["onClick"], Kh = ["value", "onInput"], Gh = { class: "em-var-picker-wrap" }, Jh = ["onClick"], Qh = ["onClick"], Xh = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Zh = ["onClick"], ef = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, tf = ["onClick"], af = {
  key: 21,
  class: "em-block-fields"
}, nf = ["value", "onInput"], sf = { class: "em-block-fields--row" }, lf = ["value", "onInput"], of = {
  key: 22,
  class: "em-block-fields"
}, rf = ["value", "onInput"], uf = ["value", "onInput"], df = { class: "em-var-picker-wrap" }, cf = ["onClick"], pf = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, mf = ["onClick"], vf = ["value", "onInput"], bf = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, yf = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, hf = ["onClick"], ff = ["onClick"], gf = ["onClick"], kf = { class: "em-check-row" }, _f = ["checked", "onChange"], $f = { class: "em-add-bar kb-field kb-field--add-bar" }, wf = { class: "em-add-bar-btns" }, xf = { class: "em-strip kb-section em-strip--personalize" }, Cf = { class: "em-field kb-field" }, Sf = { class: "em-input-group" }, If = ["value"], Tf = { class: "em-field kb-field" }, Af = { class: "em-input-group" }, ze = "{{ .var }}", Uf = /* @__PURE__ */ Pe({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    var u;
    function m() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const y = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], k = [
      "heading",
      "paragraph",
      "image",
      "button",
      "divider",
      "spacer",
      "footer",
      "quote",
      "list",
      "social",
      "video",
      "link_list"
    ];
    function S(d) {
      switch (d) {
        case "heading":
          return { id: m(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: m(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: m(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: m(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: m(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: m(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: m(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: m(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: m(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: m(), type: "social", links: y.map((r) => ({ ...r })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: m(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: m(),
            type: "link_list",
            links: [
              { text: "Unsubscribe", url: "" },
              { text: "Preferences", url: "" },
              { text: "View in browser", url: "" }
            ],
            separator: " | ",
            alignment: "center",
            fullWidth: !1
          };
        case "columns":
          return {
            id: m(),
            type: "columns",
            leftContent: "Left column text or {{ .variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: m(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: m(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: m(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: m(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: m(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: m(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: m(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: m(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ .order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: m(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: m(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: m(), type: "paragraph", content: "" };
      }
    }
    const A = i, T = p, O = [
      "first_name",
      "last_name",
      "full_name",
      "email",
      "company_name",
      "plan_name",
      "order_id",
      "order_status",
      "tracking_url",
      "invoice_id",
      "due_date",
      "amount_due",
      "appointment_date",
      "appointment_time",
      "otp_code",
      "cta_url",
      "support_email",
      "unsubscribe_url",
      "city",
      "country"
    ], B = re(
      (u = A.variableOptions) != null && u.length ? [...A.variableOptions] : O
    ), G = re(B.value[0] ?? "first_name"), te = re("");
    Ne(
      () => A.variableOptions,
      (d) => {
        d != null && d.length && (B.value = [...d], B.value.includes(G.value) || (G.value = B.value[0]));
      }
    );
    const se = $(() => A.message.subject ?? ""), ce = $(() => A.message.preview_text ?? ""), H = $(() => pm(se.value)), ne = $(() => mm(ce.value)), q = $(() => Vt(se.value)), pe = $(() => Vt(ce.value)), D = $(() => {
      const d = A.message.blocks;
      return Array.isArray(d) && d.length > 0 ? d : [S("paragraph")];
    });
    Ne(
      () => A.message.blocks,
      (d) => {
        (!Array.isArray(d) || d.length === 0) && T("update", { blocks: [S("paragraph")] });
      },
      { immediate: !0 }
    );
    function Y(d) {
      T("update", { blocks: d });
    }
    function J(d) {
      T("update", { subject: d.target.value });
    }
    function ae(d) {
      const r = d.target.value;
      T("update", { preview_text: r || void 0 });
    }
    function ye(d) {
      T("update", { from_name: d.target.value || void 0 });
    }
    function Ce(d) {
      T("update", { from_address: d.target.value || void 0 });
    }
    function Z(d) {
      T("update", { reply_to: d.target.value || void 0 });
    }
    const f = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [S("heading"), S("paragraph"), S("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [S("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [S("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [S("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [S("social"), S("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [S("footer"), S("link_list")]
      }
    ];
    function E(d) {
      const r = d.blocks();
      Y([...D.value, ...r]);
    }
    function j(d) {
      const r = [...D.value, S(d)];
      Y(r);
    }
    function ke(d) {
      Y(D.value.filter((r) => r.id !== d));
    }
    function oe(d, r) {
      const t = D.value.findIndex((x) => x.id === d);
      if (t < 0) return;
      const w = r === "up" ? t - 1 : t + 1;
      if (w < 0 || w >= D.value.length) return;
      const l = [...D.value];
      [l[t], l[w]] = [l[w], l[t]], Y(l);
    }
    function R(d, r) {
      const t = D.value.map((w) => w.id === d ? { ...w, ...r } : w);
      Y(t);
    }
    function W(d, r, t) {
      const w = D.value.find((x) => x.id === d);
      if (!w || w.type !== "list") return;
      const l = [...w.items || []];
      l[r] = t, R(d, { items: l });
    }
    function h(d) {
      const r = D.value.find((t) => t.id === d);
      !r || r.type !== "list" || R(d, { items: [...r.items || [], "New item"] });
    }
    function le(d, r) {
      const t = D.value.find((l) => l.id === d);
      if (!t || t.type !== "list") return;
      const w = (t.items || []).filter((l, x) => x !== r);
      R(d, { items: w });
    }
    function $e(d, r, t, w) {
      const l = D.value.find((L) => L.id === d);
      if (!l || l.type !== "social") return;
      const x = (l.links || []).map((L, fe) => fe === r ? { ...L, [t]: w } : L);
      R(d, { links: x });
    }
    function _e(d) {
      const r = D.value.find((t) => t.id === d);
      !r || r.type !== "social" || R(d, { links: [...r.links || [], { platform: "custom", url: "" }] });
    }
    function we(d, r) {
      const t = D.value.find((l) => l.id === d);
      if (!t || t.type !== "social") return;
      const w = (t.links || []).filter((l, x) => x !== r);
      R(d, { links: w });
    }
    function P(d, r, t, w) {
      const l = D.value.find((L) => L.id === d);
      if (!l || l.type !== "link_list") return;
      const x = (l.links || []).map((L, fe) => fe === r ? { ...L, [t]: w } : L);
      R(d, { links: x });
    }
    function Q(d) {
      const r = D.value.find((t) => t.id === d);
      !r || r.type !== "link_list" || R(d, { links: [...r.links || [], { text: "", url: "" }] });
    }
    function z(d, r) {
      const t = D.value.find((l) => l.id === d);
      if (!t || t.type !== "link_list") return;
      const w = (t.links || []).filter((l, x) => x !== r);
      R(d, { links: w });
    }
    function he(d, r) {
      const t = D.value.find((w) => w.id === d);
      if (!(!t || t.type !== "row")) {
        if (r.columnCount !== void 0 && r.columnCount !== t.columnCount) {
          const w = [...t.cells || []];
          for (; w.length < r.columnCount; ) w.push("Cell content");
          r.cells = w.slice(0, r.columnCount);
        }
        R(d, r);
      }
    }
    function ie(d, r, t) {
      const w = D.value.find((x) => x.id === d);
      if (!w || w.type !== "row") return;
      const l = [...w.cells || []];
      l[r] = t, R(d, { cells: l });
    }
    function me(d, r, t, w) {
      const l = D.value.find((L) => L.id === d);
      if (!l || l.type !== "navbar") return;
      const x = (l.links || []).map((L, fe) => fe === r ? { ...L, [t]: w } : L);
      R(d, { links: x });
    }
    function Re(d) {
      const r = D.value.find((t) => t.id === d);
      !r || r.type !== "navbar" || R(d, { links: [...r.links || [], { text: "", url: "" }] });
    }
    function Be(d, r) {
      const t = D.value.find((w) => w.id === d);
      !t || t.type !== "navbar" || R(d, { links: (t.links || []).filter((w, l) => l !== r) });
    }
    function Oe(d, r, t, w) {
      const l = D.value.find((L) => L.id === d);
      if (!l || l.type !== "accordion") return;
      const x = (l.items || []).map((L, fe) => fe === r ? { ...L, [t]: w } : L);
      R(d, { items: x });
    }
    function be(d) {
      const r = D.value.find((t) => t.id === d);
      !r || r.type !== "accordion" || R(d, { items: [...r.items || [], { title: "New section", content: "" }] });
    }
    function De(d, r) {
      const t = D.value.find((w) => w.id === d);
      !t || t.type !== "accordion" || R(d, { items: (t.items || []).filter((w, l) => l !== r) });
    }
    function Ee(d, r, t, w) {
      const l = D.value.find((L) => L.id === d);
      if (!l || l.type !== "carousel") return;
      const x = (l.slides || []).map((L, fe) => fe === r ? { ...L, [t]: w } : L);
      R(d, { slides: x });
    }
    function We(d) {
      const r = D.value.find((t) => t.id === d);
      !r || r.type !== "carousel" || R(d, { slides: [...r.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function qe(d, r) {
      const t = D.value.find((w) => w.id === d);
      !t || t.type !== "carousel" || R(d, { slides: (t.slides || []).filter((w, l) => l !== r) });
    }
    function Fe(d, r = G.value) {
      const t = ` {{ .${r} }}`, w = A.message.variables ?? [], l = Array.from(/* @__PURE__ */ new Set([...w, r]));
      d === "subject" ? T("update", {
        subject: (se.value || "") + t,
        variables: l
      }) : T("update", {
        preview_text: (ce.value || "") + t,
        variables: l
      });
    }
    function Ae(d, r = G.value) {
      const t = D.value.find((Ye) => Ye.id === d);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const w = ` {{ .${r} }}`, l = A.message.variables ?? [], x = Array.from(/* @__PURE__ */ new Set([...l, r])), L = (t.type === "footer", "content"), Ve = (t[L] ?? "") + w, at = D.value.map(
        (Ye) => Ye.id === d ? { ...Ye, [L]: Ve } : Ye
      );
      T("update", { blocks: at, variables: x });
    }
    function ue(d, r, t = G.value) {
      const w = D.value.find((Ve) => Ve.id === d);
      if (!w || w.type !== "row") return;
      const l = ` {{ .${t} }}`, x = A.message.variables ?? [], L = Array.from(/* @__PURE__ */ new Set([...x, t])), fe = [...w.cells || []];
      fe[r] = (fe[r] || "") + l, R(d, { cells: fe }), T("update", { variables: L });
    }
    function s(d, r, t = G.value) {
      const w = D.value.find((Ye) => Ye.id === d);
      if (!w || w.type !== "columns") return;
      const l = ` {{ .${t} }}`, x = A.message.variables ?? [], L = Array.from(/* @__PURE__ */ new Set([...x, t])), fe = r === "left" ? "leftContent" : "rightContent", at = (w[fe] ?? "") + l;
      R(d, { [fe]: at }), T("update", { variables: L });
    }
    const o = re(null), g = re(null), v = [
      "😀",
      "😃",
      "😄",
      "😁",
      "😂",
      "🤣",
      "😊",
      "😍",
      "🤩",
      "😉",
      "🙌",
      "👏",
      "👍",
      "👎",
      "🙏",
      "🔥",
      "✨",
      "⭐",
      "💯",
      "✅",
      "⚠️",
      "❌",
      "⚡",
      "💡",
      "🎉",
      "🎁",
      "🏷️",
      "💸",
      "💳",
      "📦",
      "🛍️",
      "🚚",
      "📣",
      "📢",
      "📈",
      "📉",
      "🆕",
      "⏰",
      "🕒",
      "⌛",
      "📅",
      "📌",
      "🔒",
      "🔓",
      "🛡️",
      "🧾",
      "📎",
      "✉️",
      "📧",
      "📱",
      "💬",
      "📝",
      "🔗",
      "📍",
      "🌐",
      "❤️",
      "💙",
      "💚",
      "🧡",
      "💜",
      "🙂",
      "🤔",
      "😎",
      "😇",
      "🤝",
      "🚀"
    ];
    function M(d) {
      o.value = o.value === d ? null : d;
    }
    function I(d, r) {
      if (r) {
        if (d === "subject") Fe("subject", r);
        else if (d === "preview") Fe("preview", r);
        else if (d.startsWith("block:")) Ae(d.slice(6), r);
        else if (d.startsWith("col-left:")) s(d.slice(9), "left", r);
        else if (d.startsWith("col-right:")) s(d.slice(10), "right", r);
        else if (d.startsWith("row:")) {
          const [, t, w] = d.split(":");
          ue(t, Number(w), r);
        }
        o.value = null;
      }
    }
    function N(d) {
      g.value = g.value === d ? null : d;
    }
    function K(d, r) {
      return `${String(d ?? "")}${r}`;
    }
    function ve(d, r) {
      var w, l;
      if (!r) return;
      const t = D.value.find((x) => x.id === d);
      if (t) {
        switch (t.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            R(d, { content: `${String(t.content ?? "")}${r}` });
            break;
          case "button":
            R(d, { text: `${String(t.text ?? "")}${r}` });
            break;
          case "image":
            R(d, { alt: `${String(t.alt ?? "")}${r}` });
            break;
          case "video":
            R(d, { caption: `${String(t.caption ?? "")}${r}` });
            break;
          case "columns":
            R(d, { leftContent: `${String(t.leftContent ?? "")}${r}` });
            break;
          case "row": {
            const x = (Array.isArray(t.cells) ? [...t.cells] : []).map((L) => String(L ?? ""));
            x.length === 0 && x.push(""), x[0] = `${String(x[0] ?? "")}${r}`, R(d, { cells: x });
            break;
          }
          case "navbar":
          case "link_list": {
            const x = Array.isArray(t.links) ? [...t.links] : [];
            x.length || x.push({ text: "", url: "" }), x[0] = { ...x[0], text: `${String(((w = x[0]) == null ? void 0 : w.text) ?? "")}${r}` }, R(d, { links: x });
            break;
          }
          case "accordion": {
            const x = Array.isArray(t.items) ? [...t.items] : [];
            x.length || x.push({ title: "", content: "" }), x[0] = { ...x[0], title: `${String(((l = x[0]) == null ? void 0 : l.title) ?? "")}${r}` }, R(d, { items: x });
            break;
          }
          case "countdown":
            R(d, { label: `${String(t.label ?? "")}${r}` });
            break;
          case "product_card":
            R(d, { title: `${String(t.title ?? "")}${r}` });
            break;
          case "dynamic_image":
            R(d, { alt: `${String(t.alt ?? "")}${r}` });
            break;
        }
        g.value = null;
      }
    }
    function ee(d, r) {
      var t, w, l, x, L, fe, Ve, at, Ye;
      if (r) {
        if (d === "subject")
          T("update", { subject: K(se.value, r) });
        else if (d === "preview")
          T("update", { preview_text: K(ce.value, r) });
        else if (d === "from-name")
          T("update", { from_name: K(A.message.from_name, r) });
        else if (d.startsWith("block:")) {
          ve(d.slice(6), r);
          return;
        } else if (d.startsWith("col-left:")) {
          const de = d.slice(9), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "columns" && R(de, { leftContent: K(X.leftContent, r) });
        } else if (d.startsWith("col-right:")) {
          const de = d.slice(10), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "columns" && R(de, { rightContent: K(X.rightContent, r) });
        } else if (d.startsWith("row:")) {
          const [, de, X] = d.split(":"), ge = Number(X), Te = D.value.find((He) => He.id === de);
          if ((Te == null ? void 0 : Te.type) === "row" && Number.isFinite(ge)) {
            const He = [...Te.cells || []].map((ta) => String(ta ?? ""));
            He[ge] = K(He[ge], r), R(de, { cells: He });
          }
        } else if (d.startsWith("button-text:")) {
          const de = d.slice(12), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "button" && R(de, { text: K(X.text, r) });
        } else if (d.startsWith("image-alt:")) {
          const de = d.slice(10), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "image" && R(de, { alt: K(X.alt, r) });
        } else if (d.startsWith("video-caption:")) {
          const de = d.slice(14), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "video" && R(de, { caption: K(X.caption, r) });
        } else if (d.startsWith("dynamic-alt:")) {
          const de = d.slice(12), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "dynamic_image" && R(de, { alt: K(X.alt, r) });
        } else if (d.startsWith("countdown-label:")) {
          const de = d.slice(16), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "countdown" && R(de, { label: K(X.label, r) });
        } else if (d.startsWith("product-title:")) {
          const de = d.slice(14), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "product_card" && R(de, { title: K(X.title, r) });
        } else if (d.startsWith("product-price:")) {
          const de = d.slice(14), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "product_card" && R(de, { price: K(X.price, r) });
        } else if (d.startsWith("product-button:")) {
          const de = d.slice(15), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "product_card" && R(de, { buttonText: K(X.buttonText, r) });
        } else if (d.startsWith("footer-address:")) {
          const de = d.slice(15), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "footer" && R(de, { companyAddress: K(X.companyAddress, r) });
        } else if (d.startsWith("code-caption:")) {
          const de = d.slice(13), X = D.value.find((ge) => ge.id === de);
          (X == null ? void 0 : X.type) === "code_block" && R(de, { caption: K(X.caption, r) });
        } else if (d.startsWith("list-item:")) {
          const [, de, X] = d.split(":"), ge = Number(X), Te = D.value.find((He) => He.id === de);
          (Te == null ? void 0 : Te.type) === "list" && Number.isFinite(ge) && W(de, ge, K((t = Te.items) == null ? void 0 : t[ge], r));
        } else if (d.startsWith("link-list-item:")) {
          const [, de, X] = d.split(":"), ge = Number(X), Te = D.value.find((He) => He.id === de);
          (Te == null ? void 0 : Te.type) === "link_list" && Number.isFinite(ge) && P(de, ge, "text", K((l = (w = Te.links) == null ? void 0 : w[ge]) == null ? void 0 : l.text, r));
        } else if (d.startsWith("navbar-item:")) {
          const [, de, X] = d.split(":"), ge = Number(X), Te = D.value.find((He) => He.id === de);
          (Te == null ? void 0 : Te.type) === "navbar" && Number.isFinite(ge) && me(de, ge, "text", K((L = (x = Te.links) == null ? void 0 : x[ge]) == null ? void 0 : L.text, r));
        } else if (d.startsWith("accordion-title:")) {
          const [, de, X] = d.split(":"), ge = Number(X), Te = D.value.find((He) => He.id === de);
          (Te == null ? void 0 : Te.type) === "accordion" && Number.isFinite(ge) && Oe(de, ge, "title", K((Ve = (fe = Te.items) == null ? void 0 : fe[ge]) == null ? void 0 : Ve.title, r));
        } else if (d.startsWith("accordion-content:")) {
          const [, de, X] = d.split(":"), ge = Number(X), Te = D.value.find((He) => He.id === de);
          (Te == null ? void 0 : Te.type) === "accordion" && Number.isFinite(ge) && Oe(de, ge, "content", K((Ye = (at = Te.items) == null ? void 0 : at[ge]) == null ? void 0 : Ye.content, r));
        }
        g.value = null;
      }
    }
    function _() {
      const d = te.value.trim();
      !d || B.value.includes(d) || (B.value = [...B.value, d], G.value = d, te.value = "");
    }
    return (d, r) => (a(), n("section", hm, [
      e("div", fm, [
        e("div", gm, [
          r[31] || (r[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: r[0] || (r[0] = (t) => d.$emit("reset"))
          }, " Reset section ")) : b("", !0)
        ]),
        r[38] || (r[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", km, [
          r[32] || (r[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", _m, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: i.message.from_name ?? "",
              onInput: ye
            }, null, 40, $m),
            e("div", wm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[1] || (r[1] = (t) => N("from-name")),
                title: "Insert emoji"
              }, "😊"),
              g.value === "from-name" ? (a(), n("div", xm, [
                (a(), n(U, null, V(v, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (w) => ee("from-name", t)
                }, c(t), 9, Cm)), 64))
              ])) : b("", !0)
            ])
          ])
        ]),
        e("div", Sm, [
          r[33] || (r[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: i.message.from_address ?? "",
            onInput: Ce
          }, null, 40, Im)
        ]),
        e("div", Tm, [
          r[34] || (r[34] = e("label", { class: "em-label" }, [
            F("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: i.message.reply_to ?? "",
            onInput: Z
          }, null, 40, Am)
        ]),
        e("div", Um, [
          r[35] || (r[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Rm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: se.value,
              onInput: J
            }, null, 40, Em),
            e("div", Pm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[2] || (r[2] = (t) => M("subject")),
                title: "Insert variable"
              }, c(ze)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[3] || (r[3] = (t) => N("subject")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "subject" ? (a(), n("div", Bm, [
                (a(!0), n(U, null, V(B.value, (t) => (a(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (w) => I("subject", t)
                }, c(t), 9, Lm))), 128))
              ])) : b("", !0),
              g.value === "subject" ? (a(), n("div", Om, [
                (a(), n(U, null, V(v, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (w) => ee("subject", t)
                }, c(t), 9, Nm)), 64))
              ])) : b("", !0)
            ])
          ]),
          e("span", {
            class: xe(["em-analyzer", `em-analyzer--${H.value}`])
          }, c(C(bm)(H.value)), 3),
          q.value.length ? (a(), n("span", Mm, "Spammy: " + c(q.value.join(", ")), 1)) : b("", !0)
        ]),
        e("div", Vm, [
          r[36] || (r[36] = e("label", { class: "em-label" }, [
            F("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Dm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: ce.value,
              onInput: ae
            }, null, 40, Hm),
            e("div", jm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[4] || (r[4] = (t) => M("preview")),
                title: "Insert variable"
              }, c(ze)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[5] || (r[5] = (t) => N("preview")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "preview" ? (a(), n("div", Wm, [
                (a(!0), n(U, null, V(B.value, (t) => (a(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (w) => I("preview", t)
                }, c(t), 9, qm))), 128))
              ])) : b("", !0),
              g.value === "preview" ? (a(), n("div", Fm, [
                (a(), n(U, null, V(v, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (w) => ee("preview", t)
                }, c(t), 9, zm)), 64))
              ])) : b("", !0)
            ])
          ]),
          r[37] || (r[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: xe(["em-analyzer", `em-analyzer--${ne.value}`])
          }, c(C(ym)(ne.value)), 3),
          pe.value.length ? (a(), n("span", Ym, "Spammy: " + c(pe.value.join(", ")), 1)) : b("", !0)
        ])
      ]),
      e("div", Km, [
        r[39] || (r[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        r[40] || (r[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Gm, [
          (a(), n(U, null, V(f, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (w) => E(t)
          }, c(t.label), 9, Jm)), 64))
        ])
      ]),
      e("div", Qm, [
        r[67] || (r[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        r[68] || (r[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Xm, [
          (a(!0), n(U, null, V(D.value, (t, w) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", ev, [
              e("span", tv, c(t.type), 1),
              e("div", av, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: w === 0,
                  onClick: (l) => oe(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, nv),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: w === D.value.length - 1,
                  onClick: (l) => oe(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, sv),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (l) => ke(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, lv)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", ov, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (l) => R(t.id, { level: Number(l.target.value) })
              }, [...r[41] || (r[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, iv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (l) => R(t.id, { content: l.target.value }),
                placeholder: "Heading text"
              }, null, 40, rv),
              e("div", uv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`block:${t.id}`)
                }, c(ze), 8, dv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, cv),
                o.value === `block:${t.id}` ? (a(), n("div", pv, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `block-var-heading-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`block:${t.id}`, l)
                  }, c(l), 9, mv))), 128))
                ])) : b("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", vv, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-heading-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`block:${t.id}`, l)
                  }, c(l), 9, bv)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), n("div", yv, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (l) => R(t.id, { content: l.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, hv),
              e("div", fv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`block:${t.id}`)
                }, c(ze), 8, gv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, kv),
                o.value === `block:${t.id}` ? (a(), n("div", _v, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `block-var-paragraph-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`block:${t.id}`, l)
                  }, c(l), 9, $v))), 128))
                ])) : b("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", wv, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-paragraph-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`block:${t.id}`, l)
                  }, c(l), 9, xv)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "image" ? (a(), n("div", Cv, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (l) => R(t.id, { src: l.target.value }),
                placeholder: "Image URL"
              }, null, 40, Sv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (l) => R(t.id, { alt: l.target.value }),
                placeholder: "Alt text"
              }, null, 40, Iv),
              e("div", Tv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Av),
                g.value === `image-alt:${t.id}` ? (a(), n("div", Uv, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-image-alt-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`image-alt:${t.id}`, l)
                  }, c(l), 9, Rv)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (l) => R(t.id, { linkUrl: l.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Ev)
            ])) : t.type === "button" ? (a(), n("div", Pv, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (l) => R(t.id, { text: l.target.value }),
                placeholder: "Button text"
              }, null, 40, Bv),
              e("div", Lv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ov),
                g.value === `button-text:${t.id}` ? (a(), n("div", Nv, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-button-text-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`button-text:${t.id}`, l)
                  }, c(l), 9, Mv)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (l) => R(t.id, { url: l.target.value }),
                placeholder: "Button URL"
              }, null, 40, Vv),
              e("div", Dv, [
                r[42] || (r[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (l) => R(t.id, { borderRadius: Number(l.target.value) || 0 })
                }, null, 40, Hv)
              ]),
              e("label", jv, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (l) => R(t.id, { ghost: l.target.checked })
                }, null, 40, Wv),
                r[43] || (r[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", qv, [
              r[44] || (r[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (l) => R(t.id, { height: Number(l.target.value) || 24 })
              }, null, 40, Fv),
              r[45] || (r[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", zv, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (l) => R(t.id, { content: l.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Yv),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (l) => R(t.id, { unsubscribeUrl: l.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Kv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (l) => R(t.id, { companyAddress: l.target.value }),
                placeholder: "Company address"
              }, null, 40, Gv),
              e("div", Jv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Qv),
                g.value === `footer-address:${t.id}` ? (a(), n("div", Xv, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-footer-address-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`footer-address:${t.id}`, l)
                  }, c(l), 9, Zv)), 64))
                ])) : b("", !0)
              ]),
              e("div", eb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`block:${t.id}`)
                }, c(ze), 8, tb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ab),
                o.value === `block:${t.id}` ? (a(), n("div", nb, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `block-var-footer-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`block:${t.id}`, l)
                  }, c(l), 9, sb))), 128))
                ])) : b("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", lb, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-footer-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`block:${t.id}`, l)
                  }, c(l), 9, ob)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "list" ? (a(), n("div", ib, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (l) => R(t.id, { style: l.target.value })
              }, [...r[46] || (r[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, rb),
              e("div", ub, [
                (a(!0), n(U, null, V(t.items || [], (l, x) => (a(), n("div", {
                  key: x,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: l,
                    onInput: (L) => W(t.id, x, L.target.value),
                    placeholder: `Item ${x + 1}`
                  }, null, 40, db),
                  e("div", cb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (L) => N(`list-item:${t.id}:${x}`),
                      title: "Insert emoji"
                    }, "😊", 8, pb),
                    g.value === `list-item:${t.id}:${x}` ? (a(), n("div", mb, [
                      (a(), n(U, null, V(v, (L) => e("button", {
                        key: `emoji-list-item-${t.id}-${x}-${L}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (fe) => ee(`list-item:${t.id}:${x}`, L)
                      }, c(L), 9, vb)), 64))
                    ])) : b("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => le(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, bb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (l) => h(t.id)
              }, "+ Add item", 8, yb)
            ])) : t.type === "quote" ? (a(), n("div", hb, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (l) => R(t.id, { style: l.target.value })
              }, [...r[47] || (r[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, fb),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (l) => R(t.id, { content: l.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, gb),
              e("div", kb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`block:${t.id}`)
                }, c(ze), 8, _b),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, $b),
                o.value === `block:${t.id}` ? (a(), n("div", wb, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `block-var-quote-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`block:${t.id}`, l)
                  }, c(l), 9, xb))), 128))
                ])) : b("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Cb, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-quote-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`block:${t.id}`, l)
                  }, c(l), 9, Sb)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "social" ? (a(), n("div", Ib, [
              e("div", Tb, [
                (a(!0), n(U, null, V(t.links || [], (l, x) => (a(), n("div", {
                  key: x,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: l.platform,
                    class: "em-select em-select--sm",
                    onChange: (L) => $e(t.id, x, "platform", L.target.value)
                  }, [...r[48] || (r[48] = [
                    tt('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, Ab),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: l.url,
                    onInput: (L) => $e(t.id, x, "url", L.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Ub),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => we(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Rb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (l) => _e(t.id)
              }, "+ Add link", 8, Eb)
            ])) : t.type === "video" ? (a(), n("div", Pb, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (l) => R(t.id, { thumbnailUrl: l.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Bb),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (l) => R(t.id, { videoUrl: l.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Lb),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (l) => R(t.id, { caption: l.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Ob),
              e("div", Nb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Mb),
                g.value === `video-caption:${t.id}` ? (a(), n("div", Vb, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-video-caption-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`video-caption:${t.id}`, l)
                  }, c(l), 9, Db)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "link_list" ? (a(), n("div", Hb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (l) => R(t.id, { separator: l.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, jb),
              e("div", Wb, [
                (a(!0), n(U, null, V(t.links || [], (l, x) => (a(), n("div", {
                  key: x,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: l.text,
                    onInput: (L) => P(t.id, x, "text", L.target.value),
                    placeholder: "Label"
                  }, null, 40, qb),
                  e("div", Fb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (L) => N(`link-list-item:${t.id}:${x}`),
                      title: "Insert emoji"
                    }, "😊", 8, zb),
                    g.value === `link-list-item:${t.id}:${x}` ? (a(), n("div", Yb, [
                      (a(), n(U, null, V(v, (L) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${x}-${L}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (fe) => ee(`link-list-item:${t.id}:${x}`, L)
                      }, c(L), 9, Kb)), 64))
                    ])) : b("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: l.url,
                    onInput: (L) => P(t.id, x, "url", L.target.value),
                    placeholder: "URL"
                  }, null, 40, Gb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => z(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Jb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (l) => Q(t.id)
              }, "+ Add link", 8, Qb)
            ])) : t.type === "columns" ? (a(), n("div", Xb, [
              r[49] || (r[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (l) => R(t.id, { leftContent: l.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Zb),
              e("div", ey, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`col-left:${t.id}`)
                }, c(ze), 8, ty),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ay),
                o.value === `col-left:${t.id}` ? (a(), n("div", ny, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `col-left-var-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`col-left:${t.id}`, l)
                  }, c(l), 9, sy))), 128))
                ])) : b("", !0),
                g.value === `emoji:col-left:${t.id}` ? (a(), n("div", ly, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-col-left-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`col-left:${t.id}`, l)
                  }, c(l), 9, oy)), 64))
                ])) : b("", !0)
              ]),
              r[50] || (r[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (l) => R(t.id, { rightContent: l.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, iy),
              e("div", ry, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`col-right:${t.id}`)
                }, c(ze), 8, uy),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, dy),
                o.value === `col-right:${t.id}` ? (a(), n("div", cy, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `col-right-var-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`col-right:${t.id}`, l)
                  }, c(l), 9, py))), 128))
                ])) : b("", !0),
                g.value === `emoji:col-right:${t.id}` ? (a(), n("div", my, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-col-right-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`col-right:${t.id}`, l)
                  }, c(l), 9, vy)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "divider" ? (a(), n("div", by, [
              e("div", yy, [
                r[51] || (r[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (l) => R(t.id, { thickness: Number(l.target.value) || 1 })
                }, null, 40, hy),
                r[52] || (r[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", fy, [
                r[53] || (r[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (l) => R(t.id, { color: l.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, gy)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (l) => R(t.id, { lineStyle: l.target.value })
              }, [...r[54] || (r[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, ky)
            ])) : t.type === "row" ? (a(), n("div", _y, [
              r[56] || (r[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (l) => he(t.id, { columnCount: Number(l.target.value) })
              }, [...r[55] || (r[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, $y),
              (a(!0), n(U, null, V(t.cells || [], (l, x) => (a(), n("div", {
                key: x,
                class: "em-row-cell"
              }, [
                e("label", wy, "Column " + c(x + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: l,
                  onInput: (L) => ie(t.id, x, L.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, xy),
                e("div", Cy, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (L) => M(`row:${t.id}:${x}`)
                  }, c(ze), 8, Sy),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (L) => N(`emoji:row:${t.id}:${x}`),
                    title: "Insert emoji"
                  }, "😊", 8, Iy),
                  o.value === `row:${t.id}:${x}` ? (a(), n("div", Ty, [
                    (a(!0), n(U, null, V(B.value, (L) => (a(), n("button", {
                      key: `row-var-${t.id}-${x}-${L}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (fe) => I(`row:${t.id}:${x}`, L)
                    }, c(L), 9, Ay))), 128))
                  ])) : b("", !0),
                  g.value === `emoji:row:${t.id}:${x}` ? (a(), n("div", Uy, [
                    (a(), n(U, null, V(v, (L) => e("button", {
                      key: `emoji-row-${t.id}-${x}-${L}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (fe) => ee(`row:${t.id}:${x}`, L)
                    }, c(L), 9, Ry)), 64))
                  ])) : b("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", Ey, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (l) => R(t.id, { separator: l.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Py),
              e("div", By, [
                (a(!0), n(U, null, V(t.links || [], (l, x) => (a(), n("div", {
                  key: x,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: l.text,
                    onInput: (L) => me(t.id, x, "text", L.target.value),
                    placeholder: "Label"
                  }, null, 40, Ly),
                  e("div", Oy, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (L) => N(`navbar-item:${t.id}:${x}`),
                      title: "Insert emoji"
                    }, "😊", 8, Ny),
                    g.value === `navbar-item:${t.id}:${x}` ? (a(), n("div", My, [
                      (a(), n(U, null, V(v, (L) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${x}-${L}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (fe) => ee(`navbar-item:${t.id}:${x}`, L)
                      }, c(L), 9, Vy)), 64))
                    ])) : b("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: l.url,
                    onInput: (L) => me(t.id, x, "url", L.target.value),
                    placeholder: "URL"
                  }, null, 40, Dy),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => Be(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Hy)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (l) => Re(t.id)
              }, "+ Add link", 8, jy)
            ])) : t.type === "accordion" ? (a(), n("div", Wy, [
              (a(!0), n(U, null, V(t.items || [], (l, x) => (a(), n("div", {
                key: x,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: l.title,
                  onInput: (L) => Oe(t.id, x, "title", L.target.value),
                  placeholder: "Section title"
                }, null, 40, qy),
                e("div", Fy, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (L) => N(`accordion-title:${t.id}:${x}`),
                    title: "Insert emoji"
                  }, "😊", 8, zy),
                  g.value === `accordion-title:${t.id}:${x}` ? (a(), n("div", Yy, [
                    (a(), n(U, null, V(v, (L) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${x}-${L}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (fe) => ee(`accordion-title:${t.id}:${x}`, L)
                    }, c(L), 9, Ky)), 64))
                  ])) : b("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: l.content,
                  onInput: (L) => Oe(t.id, x, "content", L.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Gy),
                e("div", Jy, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (L) => N(`accordion-content:${t.id}:${x}`),
                    title: "Insert emoji"
                  }, "😊", 8, Qy),
                  g.value === `accordion-content:${t.id}:${x}` ? (a(), n("div", Xy, [
                    (a(), n(U, null, V(v, (L) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${x}-${L}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (fe) => ee(`accordion-content:${t.id}:${x}`, L)
                    }, c(L), 9, Zy)), 64))
                  ])) : b("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (L) => De(t.id, x),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, eh)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (l) => be(t.id)
              }, "+ Add section", 8, th)
            ])) : t.type === "carousel" ? (a(), n("div", ah, [
              (a(!0), n(U, null, V(t.slides || [], (l, x) => (a(), n("div", {
                key: x,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: l.imageUrl,
                  onInput: (L) => Ee(t.id, x, "imageUrl", L.target.value),
                  placeholder: "Image URL"
                }, null, 40, nh),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: l.alt,
                  onInput: (L) => Ee(t.id, x, "alt", L.target.value),
                  placeholder: "Alt text"
                }, null, 40, sh),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: l.linkUrl,
                  onInput: (L) => Ee(t.id, x, "linkUrl", L.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, lh),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (L) => qe(t.id, x),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, oh)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (l) => We(t.id)
              }, "+ Add slide", 8, ih)
            ])) : t.type === "countdown" ? (a(), n("div", rh, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (l) => R(t.id, { label: l.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, uh),
              e("div", dh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ch),
                g.value === `countdown-label:${t.id}` ? (a(), n("div", ph, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`countdown-label:${t.id}`, l)
                  }, c(l), 9, mh)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (l) => R(t.id, { endDateTime: l.target.value ? new Date(l.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, vh),
              r[57] || (r[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", bh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (l) => R(t.id, { imageUrl: l.target.value }),
                placeholder: "Product image URL"
              }, null, 40, yh),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (l) => R(t.id, { title: l.target.value }),
                placeholder: "Product title"
              }, null, 40, hh),
              e("div", fh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, gh),
                g.value === `product-title:${t.id}` ? (a(), n("div", kh, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-product-title-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`product-title:${t.id}`, l)
                  }, c(l), 9, _h)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (l) => R(t.id, { price: l.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, $h),
              e("div", wh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, xh),
                g.value === `product-price:${t.id}` ? (a(), n("div", Ch, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-product-price-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`product-price:${t.id}`, l)
                  }, c(l), 9, Sh)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (l) => R(t.id, { buttonText: l.target.value }),
                placeholder: "Button text"
              }, null, 40, Ih),
              e("div", Th, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ah),
                g.value === `product-button:${t.id}` ? (a(), n("div", Uh, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-product-button-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`product-button:${t.id}`, l)
                  }, c(l), 9, Rh)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (l) => R(t.id, { buttonUrl: l.target.value }),
                placeholder: "Button URL"
              }, null, 40, Eh)
            ])) : t.type === "liquid" ? (a(), n("div", Ph, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (l) => R(t.id, { content: l.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Bh),
              e("div", Lh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`block:${t.id}`)
                }, c(ze), 8, Oh),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Nh),
                o.value === `block:${t.id}` ? (a(), n("div", Mh, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `block-var-liquid-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`block:${t.id}`, l)
                  }, c(l), 9, Vh))), 128))
                ])) : b("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Dh, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-liquid-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`block:${t.id}`, l)
                  }, c(l), 9, Hh)), 64))
                ])) : b("", !0)
              ]),
              r[58] || (r[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", jh, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (l) => R(t.id, { caption: l.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Wh),
              e("div", qh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Fh),
                g.value === `code-caption:${t.id}` ? (a(), n("div", zh, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-code-caption-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`code-caption:${t.id}`, l)
                  }, c(l), 9, Yh)), 64))
                ])) : b("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (l) => R(t.id, { content: l.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Kh),
              e("div", Gh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => M(`block:${t.id}`)
                }, c(ze), 8, Jh),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Qh),
                o.value === `block:${t.id}` ? (a(), n("div", Xh, [
                  (a(!0), n(U, null, V(B.value, (l) => (a(), n("button", {
                    key: `block-var-code-${t.id}-${l}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => I(`block:${t.id}`, l)
                  }, c(l), 9, Zh))), 128))
                ])) : b("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", ef, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-code-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`block:${t.id}`, l)
                  }, c(l), 9, tf)), 64))
                ])) : b("", !0)
              ]),
              r[59] || (r[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", af, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (l) => R(t.id, { feedUrl: l.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, nf),
              e("div", sf, [
                r[60] || (r[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (l) => R(t.id, { maxItems: Number(l.target.value) || 5 })
                }, null, 40, lf)
              ]),
              r[61] || (r[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", of, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (l) => R(t.id, { imageUrl: l.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, rf),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (l) => R(t.id, { alt: l.target.value }),
                placeholder: "Alt text"
              }, null, 40, uf),
              e("div", df, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (l) => N(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, cf),
                g.value === `dynamic-alt:${t.id}` ? (a(), n("div", pf, [
                  (a(), n(U, null, V(v, (l) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${l}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => ee(`dynamic-alt:${t.id}`, l)
                  }, c(l), 9, mf)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (l) => R(t.id, { fallbackUrl: l.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, vf)
            ])) : b("", !0),
            k.includes(t.type) ? (a(), n("div", bf, [
              e("div", yf, [
                e("button", {
                  type: "button",
                  class: xe(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (l) => R(t.id, { alignment: "left" })
                }, [...r[62] || (r[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, hf),
                e("button", {
                  type: "button",
                  class: xe(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (l) => R(t.id, { alignment: "center" })
                }, [...r[63] || (r[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, ff),
                e("button", {
                  type: "button",
                  class: xe(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (l) => R(t.id, { alignment: "right" })
                }, [...r[64] || (r[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, gf)
              ]),
              e("label", kf, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (l) => R(t.id, { fullWidth: l.target.checked })
                }, null, 40, _f),
                r[65] || (r[65] = e("span", null, "Full width", -1))
              ])
            ])) : b("", !0)
          ], 8, Zm))), 128))
        ]),
        e("div", $f, [
          r[66] || (r[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", wf, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[6] || (r[6] = (t) => j("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[7] || (r[7] = (t) => j("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[8] || (r[8] = (t) => j("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[9] || (r[9] = (t) => j("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[10] || (r[10] = (t) => j("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[11] || (r[11] = (t) => j("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[12] || (r[12] = (t) => j("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[13] || (r[13] = (t) => j("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[14] || (r[14] = (t) => j("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[15] || (r[15] = (t) => j("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[16] || (r[16] = (t) => j("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[17] || (r[17] = (t) => j("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[18] || (r[18] = (t) => j("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[19] || (r[19] = (t) => j("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[20] || (r[20] = (t) => j("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[21] || (r[21] = (t) => j("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[22] || (r[22] = (t) => j("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[23] || (r[23] = (t) => j("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[24] || (r[24] = (t) => j("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[25] || (r[25] = (t) => j("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[26] || (r[26] = (t) => j("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[27] || (r[27] = (t) => j("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[28] || (r[28] = (t) => j("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", xf, [
        r[71] || (r[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        r[72] || (r[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Cf, [
          r[69] || (r[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Sf, [
            je(e("select", {
              "onUpdate:modelValue": r[29] || (r[29] = (t) => G.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(U, null, V(B.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, c(t), 9, If))), 128))
            ], 512), [
              [Ge, G.value]
            ])
          ])
        ]),
        e("div", Tf, [
          r[70] || (r[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Af, [
            je(e("input", {
              "onUpdate:modelValue": r[30] || (r[30] = (t) => te.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [ut, te.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: _
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Rf = /* @__PURE__ */ Le(Uf, [["__scopeId", "data-v-62cf50f4"]]), Ef = { class: "keos-email-builder" }, Pf = { class: "kb-builder-top" }, Bf = { class: "kb-email-layout" }, Lf = { class: "kb-email-sidebar" }, Of = {
  key: 0,
  class: "kb-email-form"
}, Nf = { class: "kb-email-form-head" }, Mf = { class: "kb-email-form-head-top" }, Vf = { class: "kb-email-health-pill" }, Df = { class: "kb-wa-form-head-row" }, Hf = ["value"], jf = { class: "kb-email-health" }, Wf = { class: "kb-email-health-row" }, qf = { class: "kb-email-health-value" }, Ff = { class: "kb-email-health-bar" }, zf = { class: "kb-email-canvas" }, Yf = {
  key: 0,
  class: "kb-email-test-banner"
}, Kf = { class: "kb-email-preview-chrome" }, Gf = { class: "kb-push-preview-controls" }, Jf = { class: "kb-push-preview-as" }, Qf = ["value"], Xf = { class: "kb-preview-status" }, Zf = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, eg = { class: "kb-email-inbox-strip" }, tg = { class: "kb-email-inbox-from" }, ag = { class: "kb-email-inbox-from-name" }, ng = { class: "kb-email-inbox-from-addr" }, sg = { class: "kb-email-inbox-subject" }, lg = ["title"], og = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, ig = { class: "kb-email-body-canvas" }, rg = ["innerHTML"], ug = { class: "kb-email-actions" }, dg = {
  key: 0,
  class: "kb-actions-note"
}, cg = { key: 0 }, pg = { class: "kb-email-actions-right" }, mg = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, vg = { class: "kb-confirm-dialog" }, bg = { class: "kb-confirm-actions" }, yg = /* @__PURE__ */ Pe({
  __name: "KeosEmailBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    actionsNote: { default: "" },
    designOnly: { type: Boolean, default: !0 },
    enforceSlugName: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(i, { emit: p }) {
    function m(s) {
      if (!Array.isArray(s) || s.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const o = (I) => String(I).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), g = [
        "heading",
        "paragraph",
        "image",
        "button",
        "divider",
        "spacer",
        "footer",
        "quote",
        "list",
        "social",
        "video",
        "link_list"
      ], v = (I, N) => {
        if (!g.includes(N.type)) return I;
        const K = N.alignment || "left", ve = !!N.fullWidth;
        return `<div style="text-align:${K};${ve ? "width:100%;" : ""}">${I}</div>`;
      }, M = [];
      for (const I of s)
        switch (I.type) {
          case "heading": {
            const N = Math.min(3, Math.max(1, Number(I.level) || 1)), K = o(I.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              v(
                `<h${N} style="margin:0 0 12px;font-size:${N === 1 ? "22" : N === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${K || "Heading"}</h${N}>`,
                I
              )
            );
            break;
          }
          case "paragraph": {
            const N = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${N || "Paragraph"}</p>`,
                I
              )
            );
            break;
          }
          case "image": {
            const N = (I.src || "").trim(), K = o(I.alt || ""), ve = (I.linkUrl || "").trim(), _ = !!I.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", u = N ? `<img src="${o(N)}" alt="${K}" style="${_}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            M.push(
              v(
                `<div style="margin:0 0 12px;">${ve ? `<a href="${o(ve)}" style="color:#2563eb;">${u}</a>` : u}</div>`,
                I
              )
            );
            break;
          }
          case "button": {
            const N = o(I.text || "Button"), K = (I.url || "#").trim(), ve = Math.min(24, Math.max(0, Number(I.borderRadius) ?? 8)), ee = !!I.fullWidth, _ = !!I.ghost, u = _ ? "transparent" : "#0f172a", d = _ ? "#0f172a" : "#fff", r = _ ? "2px solid #0f172a" : "none", t = ee ? "block" : "inline-block", w = ee ? "100%" : "auto";
            M.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${o(K)}" style="display:${t};width:${w};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${u};color:${d};border:${r};text-decoration:none;font-size:14px;font-weight:600;border-radius:${ve}px;overflow-wrap:anywhere;">${N}</a></p>`,
                I
              )
            );
            break;
          }
          case "divider": {
            const N = Math.min(8, Math.max(1, Number(I.thickness) || 1)), K = (I.color || "#e2e8f0").trim() || "#e2e8f0", ve = I.lineStyle || "solid";
            M.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${N}px ${ve} ${K};" />`,
                I
              )
            );
            break;
          }
          case "spacer": {
            const N = Math.min(120, Math.max(8, Number(I.height) || 24));
            M.push(v(`<div style="height:${N}px;"></div>`, I));
            break;
          }
          case "footer": {
            const N = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = (I.unsubscribeUrl || "").trim(), ve = o(I.companyAddress || "");
            M.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${N || "Footer"}` + (K ? `<p style="margin:8px 0 0;"><a href="${o(K)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (ve ? `<p style="margin:4px 0 0;">${ve}</p>` : "") + "</div>",
                I
              )
            );
            break;
          }
          case "list": {
            const N = I.style === "numbered" ? "ol" : "ul", ve = (Array.isArray(I.items) ? I.items : []).map(
              (ee) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${o(String(ee)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            M.push(
              v(
                `<${N} style="margin:0 0 12px;padding-left:24px;">${ve || "<li>Item</li>"}</${N}>`,
                I
              )
            );
            break;
          }
          case "quote": {
            const N = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, ve = K[I.style || "default"] || K.default;
            M.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${ve}font-size:14px;line-height:1.6;">${N || "Quote"}</div>`,
                I
              )
            );
            break;
          }
          case "social": {
            const K = (Array.isArray(I.links) ? I.links : []).filter((ve) => (ve.url || "").trim());
            if (K.length === 0)
              M.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  I
                )
              );
            else {
              const ve = (ee) => `<a href="${o((ee.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${o(ee.platform || "Link")}</a>`;
              M.push(
                v(
                  `<div style="margin:0 0 12px;">${K.map(ve).join("")}</div>`,
                  I
                )
              );
            }
            break;
          }
          case "video": {
            const N = (I.thumbnailUrl || "").trim(), K = (I.videoUrl || "#").trim(), ve = o(I.caption || ""), _ = !!I.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", u = N ? `<img src="${o(N)}" alt="Video" style="${_}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            M.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${o(K)}" style="display:block;color:inherit;">${u}</a>` + (ve ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${ve}</p>` : "") + "</div>",
                I
              )
            );
            break;
          }
          case "link_list": {
            const N = Array.isArray(I.links) ? I.links : [], K = o(I.separator || " | "), ee = N.filter(
              (_) => (_.text || _.url) && (_.url || "").trim()
            ).map(
              (_) => `<a href="${o((_.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(_.text || "Link")}</a>`
            );
            M.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${ee.join(K)}</p>`,
                I
              )
            );
            break;
          }
          case "columns": {
            const N = o(I.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = o(I.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${N || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${K || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const N = Math.min(4, Math.max(1, Number(I.columnCount) || 2)), K = Array.isArray(I.cells) ? I.cells.slice(0, N) : [], ve = 100 / N, ee = Array.from({ length: N }, (_, u) => {
              const d = K[u] ?? "", r = o(d).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${ve}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${r || "—"}</td>`;
            }).join("");
            M.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${ee}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const N = Array.isArray(I.links) ? I.links : [], K = o(I.separator || " | "), ee = N.filter(
              (_) => (_.text || _.url) && (_.url || "").trim()
            ).map(
              (_) => `<a href="${o((_.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(_.text || "Link")}</a>`
            );
            M.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${ee.length ? ee.join(K) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const K = (Array.isArray(I.items) ? I.items : []).map((ve) => {
              const ee = o(ve.title || "Section"), _ = o(ve.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${ee}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${_}</div></details>`;
            }).join("");
            M.push(
              K ? `<div style="margin:0 0 12px;">${K}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const K = (Array.isArray(I.slides) ? I.slides : []).filter(
              (ve) => (ve.imageUrl || "").trim()
            );
            if (K.length === 0)
              M.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const ve = K[0], ee = `<img src="${o(ve.imageUrl)}" alt="${o(ve.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, _ = (ve.linkUrl || "").trim();
              M.push(
                `<div style="margin:0 0 12px;">${_ ? `<a href="${o(_)}">${ee}</a>` : ee}` + (K.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${K.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const N = o(I.label || "Offer ends in"), K = I.endDateTime ? new Date(I.endDateTime).toLocaleString() : "—";
            M.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${N}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${K}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const N = (I.imageUrl || "").trim(), K = o(I.title || "Product"), ve = o(I.price || ""), ee = o(I.buttonText || "Buy now"), _ = (I.buttonUrl || "#").trim(), u = N ? `<img src="${o(N)}" alt="${o(I.alt || K)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            M.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${u}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${K}</p>` + (ve ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${ve}</p>` : "") + `<a href="${o(_)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${ee}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const N = o((I.content || "").trim());
            M.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${N || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const N = (I.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = o((I.caption || "").trim());
            M.push(
              '<div style="margin:0 0 12px;">' + (K ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${K}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${N || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const N = (I.feedUrl || "").trim(), K = Math.min(20, Math.max(1, Number(I.maxItems) ?? 5));
            M.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (N ? `<p style="margin:0;font-size:12px;color:#64748b;">${o(N)} · max ${K} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const N = (I.imageUrl || "").trim(), K = (I.fallbackUrl || "").trim(), ve = o(I.alt || "Dynamic image");
            N ? M.push(
              `<div style="margin:0 0 12px;"><img src="${o(N)}" alt="${ve}" style="max-width:100%;height:auto;display:block;border:0;" />` + (K ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${o(K)}</p>` : "") + "</div>"
            ) : M.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return M.join("");
    }
    function y(s) {
      return /<\s*html[\s>]/i.test(s) || /<!doctype\s+html/i.test(s);
    }
    function k(s) {
      const o = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return o ? o[1] : s;
    }
    function S(s, o, g) {
      const v = (o || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), M = (g || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${v}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        M ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${M}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${s}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const A = i, T = p, {
      campaign: O,
      dirty: B,
      customValidatorErrors: G,
      getValidationWithWarnings: te,
      update: se,
      updateMessage: ce,
      undo: H,
      redo: ne,
      canUndo: q,
      canRedo: pe,
      resetMessage: D,
      hooks: Y
    } = ct({
      initial: A.modelValue,
      hooks: {
        ...A.hooks,
        customValidators: async (s) => {
          var M, I, N;
          const o = [];
          (M = s.name) != null && M.trim() || o.push("Template name is required");
          const g = s.message;
          (I = g == null ? void 0 : g.subject) != null && I.trim() || o.push("Subject is required");
          const v = (N = A.hooks) != null && N.customValidators ? await A.hooks.customValidators(s) : [];
          return [...o, ...v];
        }
      },
      onDirty: () => T("change", O.value)
    }), { lastSavedAt: J } = pt(O, { channel: "email" });
    function ae(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ne() : H());
    }
    st(() => {
      window.addEventListener("keydown", ae);
    }), lt(() => {
      window.removeEventListener("keydown", ae);
    }), Ne(
      O,
      (s) => T("update:modelValue", {
        ...s,
        message: {
          ...s.message,
          html: Ee.value
        }
      }),
      { deep: !0 }
    );
    const ye = re(), Ce = re(!0);
    async function Z() {
      if (Y.estimateReach)
        try {
          ye.value = await Y.estimateReach(O.value.audience);
        } catch {
          ye.value = void 0;
        }
      Y.canSend && (Ce.value = await Promise.resolve(Y.canSend()));
    }
    Z(), Ne(() => O.value.audience, Z, { deep: !0 });
    const f = $(() => (G.value, te(ye.value))), E = $(() => f.value.blockingErrors), j = $(() => f.value.warnings), ke = $(() => f.value.valid), oe = $(() => {
      var v, M, I;
      const s = O.value.message, o = [
        !!((v = O.value.name) != null && v.trim()),
        !!((M = s.subject) != null && M.trim()),
        !!((I = s.from_address) != null && I.trim()),
        !!(Array.isArray(s.blocks) ? s.blocks.length : (s.html ?? "").trim().length),
        !!O.value.template_type
      ], g = o.filter(Boolean).length;
      return Math.round(g / o.length * 100);
    }), R = $(() => oe.value >= 90 ? "Production ready" : oe.value >= 70 ? "Strong draft" : oe.value >= 40 ? "In progress" : "Needs setup"), W = $(
      () => O.value.template_type ?? "transactional"
    ), h = re(""), le = re(!1), $e = re(null), _e = $(() => {
      const s = h.value;
      return s ? et.find((o) => o.id === s) ?? null : null;
    });
    function we(s) {
      const o = O.value, g = s.campaign.message ? { ...o.message, ...s.campaign.message } : o.message;
      se({
        ...s.campaign,
        message: g
      }), $e.value = null, le.value = !1;
    }
    function P(s) {
      const o = s.target.value;
      if (!o) return;
      const g = Et.find((v) => v.id === o);
      g && (B.value ? ($e.value = g, le.value = !0) : we(g), s.target.value = "");
    }
    function Q(s) {
      se({ template_type: s });
    }
    function z(s) {
      se({
        name: s,
        tracking: { ...O.value.tracking ?? {}, campaign_name: s }
      });
    }
    const he = $(
      () => O.value.message.subject ?? ""
    ), ie = $(
      () => O.value.message.preview_text ?? ""
    ), me = $(
      () => O.value.message.html ?? ""
    ), Re = $(
      () => O.value.message.from_name ?? "Your App"
    ), Be = $(
      () => O.value.message.from_address ?? "notifications@example.com"
    ), Oe = $(
      () => O.value.message.blocks ?? []
    ), be = $(() => {
      const s = O.value.message, o = (s.html ?? "").trim(), v = (Array.isArray(s.blocks) ? s.blocks : []).some((M) => {
        if (!M || typeof M != "object") return !1;
        const I = (M.type ?? "").toString();
        if (I === "paragraph" || I === "heading" || I === "quote" || I === "footer") {
          const N = (M.content ?? "").toString().trim();
          return !(!N || N === "Heading" || N.startsWith("Your text here."));
        }
        return I === "image" || I === "video" || I === "dynamic_image" ? !!(M.src ?? M.imageUrl ?? M.thumbnailUrl ?? "").toString().trim() : I === "button" ? !!(M.text ?? "").toString().trim() : !0;
      });
      return !!((s.subject ?? "").toString().trim() || (s.preview_text ?? "").toString().trim() || o || v);
    }), De = $(() => {
      const s = Oe.value;
      if (Array.isArray(s) && s.length > 0)
        return m(s);
      const o = me.value;
      return o && o.trim() ? y(o) ? k(o) : o : m([]);
    }), Ee = $(() => {
      const s = Oe.value;
      if (Array.isArray(s) && s.length > 0)
        return S(
          m(s),
          he.value,
          ie.value
        );
      const o = me.value;
      return o && o.trim() ? y(o) ? o : S(o, he.value, ie.value) : S(
        m([]),
        he.value,
        ie.value
      );
    }), We = $(() => {
      const s = he.value;
      return _e.value ? Qe(s, _e.value.data) : s;
    }), qe = $(() => {
      const s = ie.value;
      return _e.value ? Qe(s, _e.value.data) : s;
    }), Fe = $(() => {
      const s = De.value;
      return _e.value ? Qe(s, _e.value.data) : s;
    }), Ae = re("desktop");
    function ue() {
      ke.value && T("save", {
        ...O.value,
        message: {
          ...O.value.message,
          html: Ee.value
        }
      });
    }
    return (s, o) => {
      var g;
      return a(), n("div", Ef, [
        e("div", Pf, [
          Me(mt, {
            "campaign-name": C(O).name,
            status: C(O).status,
            dirty: C(B),
            "last-saved-at": C(J),
            "can-undo": C(q),
            "can-redo": C(pe),
            "slugify-name": A.enforceSlugName,
            "onUpdate:campaignName": z,
            onUndo: C(H),
            onRedo: C(ne)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          E.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ie({
              background: C(Ue).dangerBg,
              border: `1px solid ${C(Ue).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(Se)[16]}px ${C(Se)[24]}px`,
              marginBottom: `${C(Se)[24]}px`
            })
          }, [
            e("ul", {
              style: Ie({ margin: 0, paddingLeft: "1.25rem", color: C(Ue).danger })
            }, [
              (a(!0), n(U, null, V(E.value, (v) => (a(), n("li", {
                key: v.message
              }, c(v.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", Bf, [
          e("aside", Lf, [
            i.disabledSections.includes("email") ? b("", !0) : (a(), n("div", Of, [
              e("div", Nf, [
                e("div", Mf, [
                  o[8] || (o[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Vf, c(R.value), 1)
                ]),
                e("div", Df, [
                  Me(_t, {
                    "template-type": W.value,
                    onUpdate: Q
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: P
                  }, [
                    o[9] || (o[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, V(C(Et), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Hf))), 128))
                  ], 32)
                ]),
                e("div", jf, [
                  e("div", Wf, [
                    o[10] || (o[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", qf, c(oe.value) + "%", 1)
                  ]),
                  e("div", Ff, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: Ie({ width: `${oe.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(Rf, {
                message: C(O).message,
                "variable-options": i.variableOptions,
                "show-reset": !0,
                onUpdate: C(ce),
                onReset: o[0] || (o[0] = (v) => C(D)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", zf, [
            !i.designOnly && C(O).audience.test_mode ? (a(), n("div", Yf, [...o[11] || (o[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Kf, [
              e("div", Gf, [
                e("label", Jf, [
                  o[13] || (o[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (v) => h.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[12] || (o[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, V(C(et), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Qf))), 128))
                  ], 512), [
                    [Ge, h.value]
                  ])
                ]),
                e("div", Xf, [
                  o[14] || (o[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, c(Ae.value), 1)
                ])
              ]),
              e("div", Zf, [
                e("button", {
                  type: "button",
                  class: xe(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ae.value === "desktop"
                  }]),
                  onClick: o[2] || (o[2] = (v) => Ae.value = "desktop")
                }, [...o[15] || (o[15] = [
                  e("svg", {
                    class: "kb-email-device-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("rect", {
                      x: "2",
                      y: "3",
                      width: "20",
                      height: "14",
                      rx: "2",
                      ry: "2"
                    }),
                    e("line", {
                      x1: "8",
                      y1: "21",
                      x2: "16",
                      y2: "21"
                    }),
                    e("line", {
                      x1: "12",
                      y1: "17",
                      x2: "12",
                      y2: "21"
                    })
                  ], -1),
                  F(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: xe(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ae.value === "mobile"
                  }]),
                  onClick: o[3] || (o[3] = (v) => Ae.value = "mobile")
                }, [...o[16] || (o[16] = [
                  e("svg", {
                    class: "kb-email-device-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("rect", {
                      x: "5",
                      y: "2",
                      width: "14",
                      height: "20",
                      rx: "2",
                      ry: "2"
                    }),
                    e("line", {
                      x1: "12",
                      y1: "18",
                      x2: "12.01",
                      y2: "18"
                    })
                  ], -1),
                  F(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: xe(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Ae.value === "mobile",
                  "kb-email-preview-frame--empty": !be.value
                }])
              }, [
                e("div", eg, [
                  e("div", tg, [
                    e("span", ag, c(Re.value), 1),
                    e("span", ng, "<" + c(Be.value) + ">", 1)
                  ]),
                  e("div", sg, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: We.value || "No subject"
                    }, c(We.value || "No subject"), 9, lg),
                    qe.value ? (a(), n("span", og, " — " + c(qe.value), 1)) : b("", !0)
                  ])
                ]),
                e("div", ig, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: Fe.value
                  }, null, 8, rg)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", ug, [
          j.value.length > 0 ? (a(), n("div", dg, [
            o[17] || (o[17] = e("strong", null, "Warning:", -1)),
            F(" " + c((g = j.value[0]) == null ? void 0 : g.message) + " ", 1),
            j.value.length > 1 ? (a(), n("span", cg, " (+" + c(j.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", pg, [
            i.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: o[4] || (o[4] = (v) => T("duplicate", JSON.parse(JSON.stringify(C(O)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: ue
            }, " Save ")) : b("", !0),
            i.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: o[5] || (o[5] = (v) => T("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        le.value ? (a(), n("div", mg, [
          e("div", vg, [
            o[18] || (o[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[19] || (o[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", bg, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: o[6] || (o[6] = (v) => {
                  le.value = !1, $e.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: o[7] || (o[7] = (v) => $e.value && we($e.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0)
      ]);
    };
  }
}), ea = /* @__PURE__ */ Le(yg, [["__scopeId", "data-v-f45fc2a3"]]), hg = { class: "kb-shell" }, fg = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, gg = ["aria-selected", "onClick"], kg = { class: "kb-shell__meta" }, _g = ["href"], $g = { class: "kb-shell__body" }, wg = /* @__PURE__ */ Pe({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(i, { emit: p }) {
    const m = p, y = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (k, S) => (a(), n("div", hg, [
      e("header", {
        class: "kb-shell__header",
        style: Ie({ padding: `${C(Se)[12]}px ${C(Se)[24]}px`, borderBottom: `1px solid ${C(Ue).neutral.border}`, background: C(Ue).neutral.bg })
      }, [
        S[0] || (S[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", fg, [
          (a(), n(U, null, V(y, (A) => e("button", {
            key: A.id,
            type: "button",
            class: xe(["kb-shell__channel", { "kb-shell__channel--active": i.channel === A.id }]),
            role: "tab",
            "aria-selected": i.channel === A.id,
            onClick: (T) => m("switch-channel", A.id)
          }, c(A.label), 11, gg)), 64))
        ]),
        e("div", kg, [
          i.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: Ie({ padding: "2px 8px", borderRadius: `${C(Xe).input}px`, fontSize: "0.75rem", background: C(Ue).neutral.bg, color: C(Ue).neutral.textMuted })
          }, c(i.environment), 5)) : b("", !0),
          i.helpUrl ? (a(), n("a", {
            key: 1,
            href: i.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: Ie({ color: C(Ue).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, _g)) : b("", !0)
        ])
      ], 4),
      e("div", $g, [
        Je(k.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), xg = /* @__PURE__ */ Le(wg, [["__scopeId", "data-v-0df30803"]]), Cg = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Sg = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Ig = ["onClick"], Tg = /* @__PURE__ */ Pe({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(i) {
    var S;
    const p = i, m = re(((S = p.items[0]) == null ? void 0 : S.id) ?? "");
    let y = null;
    function k(A) {
      const T = document.getElementById(A);
      T && T.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return st(() => {
      const A = p.scrollContainerId ? document.getElementById(p.scrollContainerId) : document;
      A && (y = new IntersectionObserver(
        (T) => {
          for (const O of T)
            if (O.isIntersecting) {
              const B = O.target.getAttribute("data-outline-id");
              B && (m.value = B);
            }
        },
        { root: A === document ? null : A, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), p.items.forEach((T) => {
        const O = document.getElementById(T.id);
        O && (y == null || y.observe(O));
      }));
    }), lt(() => {
      y == null || y.disconnect();
    }), Ne(
      () => p.items,
      (A) => {
        A.length && !m.value && (m.value = A[0].id);
      },
      { immediate: !0 }
    ), (A, T) => (a(), n("nav", Cg, [
      e("ul", Sg, [
        (a(!0), n(U, null, V(i.items, (O) => (a(), n("li", {
          key: O.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: xe(["kb-outline__btn", { "kb-outline__btn--active": m.value === O.id }]),
            style: Ie({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${C(Se)[8]}px ${C(Se)[12]}px`,
              border: "none",
              borderRadius: `${C(Xe).input}px`,
              background: m.value === O.id ? C(Ue).neutral.bg : "transparent",
              color: m.value === O.id ? "#0f172a" : C(Ue).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: m.value === O.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (B) => k(O.id)
          }, c(O.label), 15, Ig)
        ]))), 128))
      ])
    ]));
  }
}), Ag = /* @__PURE__ */ Le(Tg, [["__scopeId", "data-v-25c37675"]]), Ug = ["id"], Rg = {
  key: 1,
  class: "kb-form-shell__head"
}, Eg = /* @__PURE__ */ Pe({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(i) {
    return (p, m) => (a(), n("div", {
      class: "kb-form-shell",
      id: i.sectionId ?? void 0,
      style: Ie({
        padding: `${C(Se)[24]}px ${C(Se)[24]}px ${C(Se)[32]}px`,
        marginBottom: 0
      })
    }, [
      i.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: Ie({ marginBottom: C(Se)[24], paddingBottom: C(Se)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: Ie({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: C(Se)[12] })
        }, c(i.label), 5),
        Je(p.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", Rg, [
        Je(p.$slots, "head", {}, void 0, !0)
      ])),
      Je(p.$slots, "default", {}, void 0, !0)
    ], 12, Ug));
  }
}), Pg = /* @__PURE__ */ Le(Eg, [["__scopeId", "data-v-6504df41"]]), Bg = /* @__PURE__ */ Pe({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(i) {
    return (p, m) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: Ie({
        display: "flex",
        justifyContent: i.align === "start" ? "flex-start" : i.align === "between" ? "space-between" : "flex-end",
        gap: "16px",
        padding: "20px 32px 24px",
        marginTop: "24px",
        background: "#fff",
        borderTop: "1px solid #e2e8f0",
        position: "sticky",
        bottom: 0,
        zIndex: 10,
        boxShadow: "0 -4px 24px -4px rgba(15, 23, 42, 0.06)"
      })
    }, [
      Je(p.$slots, "default")
    ], 4));
  }
}), Lg = /* @__PURE__ */ Pe({
  __name: "BuilderTopShell",
  setup(i) {
    return (p, m) => (a(), n("div", {
      class: "kb-top-shell",
      style: Ie({
        marginLeft: C(Se)[24],
        marginRight: C(Se)[24]
      })
    }, [
      Je(p.$slots, "header"),
      Je(p.$slots, "errors"),
      Je(p.$slots, "warnings"),
      Je(p.$slots, "default")
    ], 4));
  }
});
function Og(i) {
  i.component("KeosNotificationBuilder", Qt), i.component("KeosWhatsAppBuilder", Xt), i.component("KeosSmsBuilder", Zt), i.component("KeosEmailBuilder", ea), i.component("BuilderShell", xg), i.component("BuilderOutline", Ag), i.component("BuilderVersionHistoryModal", Jt), i.component("BuilderFormShell", Pg), i.component("BuilderActionsBar", Bg), i.component("BuilderTopShell", Lg);
}
const Mg = {
  install: Og,
  KeosNotificationBuilder: Qt,
  KeosWhatsAppBuilder: Xt,
  KeosSmsBuilder: Zt,
  KeosEmailBuilder: ea
};
export {
  Bg as BuilderActionsBar,
  Pg as BuilderFormShell,
  Ag as BuilderOutline,
  xg as BuilderShell,
  Lg as BuilderTopShell,
  Jt as BuilderVersionHistoryModal,
  et as DEFAULT_SAMPLE_PROFILES,
  ea as KeosEmailBuilder,
  Qt as KeosNotificationBuilder,
  Zt as KeosSmsBuilder,
  Xt as KeosWhatsAppBuilder,
  Mg as default,
  Og as install,
  Qe as renderTemplatePreview,
  pt as useAutosave,
  ct as useCampaignState
};
//# sourceMappingURL=index.js.map
