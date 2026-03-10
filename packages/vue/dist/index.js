import { ref as ue, watch as Le, computed as w, defineComponent as Ee, openBlock as a, createElementBlock as n, normalizeStyle as Se, unref as $, createElementVNode as e, normalizeClass as we, Fragment as U, renderList as D, toDisplayString as c, createTextVNode as F, createCommentVNode as y, withDirectives as je, vModelText as ut, createStaticVNode as tt, vModelSelect as Ke, withKeys as aa, onMounted as st, onUnmounted as lt, createVNode as Oe, createBlock as na, withModifiers as Ye, renderSlot as Ge } from "vue";
const Ce = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Qe = {
  input: 6,
  card: 12,
  button: 6
}, Ae = {
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
Ae.neutral.textMuted, Ae.neutral.textMeta;
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
}, sa = ["android", "ios", "web"], Dt = "normal", jt = ["low", "normal", "high"], Ht = 86400, la = [3600, 7200, 86400, 172800], Wt = "1.0", oa = ["topic", "segment", "user_list"];
function ht() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...sa],
    test_mode: !1
  };
}
function gt() {
  return {
    title: "",
    body: "",
    variables: [],
    actions: []
  };
}
function ft() {
  return {
    priority: Dt,
    ttl: Ht,
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
    message: gt(),
    delivery: ft(),
    tracking: kt(),
    ...i
  };
}
function qt(i) {
  const p = i;
  return p.schema_version || (p.schema_version = Wt), p.audience || (p.audience = ht()), p.message || (p.message = gt()), p.delivery || (p.delivery = ft()), p.tracking || (p.tracking = kt()), jt.includes(p.delivery.priority) || (p.delivery.priority = Dt), p.delivery.ttl === void 0 && (p.delivery.ttl = Ht), oa.includes(p.audience.type) || (p.audience.type = "topic"), p.audience.type === "topic" && !p.audience.topic_name && (p.audience.topic_name = "default"), p;
}
const ra = 1e5;
function ua(i, p) {
  var k, C, T;
  const m = [], b = p ?? i.audience.estimated_reach;
  return b !== void 0 && b >= ra && m.push({
    message: `Estimated reach is very high (${b.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), i.tracking && !((k = i.tracking.campaign_name) != null && k.trim()) && !((C = i.name) != null && C.trim()) && m.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (T = i.message.deep_link) != null && T.trim() || m.push({
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
  const m = zt(i), b = ua(i, p);
  return {
    valid: m.valid,
    errors: [
      ...m.errors,
      ...b.map((k) => Ft(k.message, k.severity))
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
  const m = [...p], b = /* @__PURE__ */ new Map();
  return m.forEach((C, T) => b.set(C, T + 1)), { text: i.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (C, T) => (b.has(T) || (b.set(T, m.length + 1), m.push(T)), `{{${b.get(T)}}}`)), varOrder: m };
}
function wt(i, p) {
  return i.map((m) => {
    const b = p == null ? void 0 : p[m];
    return typeof b == "string" && b.length > 0 ? b : `sample_${m}`;
  });
}
function ya(i, p, m) {
  if (!i || !p || m.length === 0)
    return {};
  try {
    const k = i.split(/\{\{\d+\}\}/).map((L) => L.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+?)"), C = new RegExp(`^${k}$`, "s"), T = p.match(C);
    if (!T)
      return {};
    const I = {};
    return m.forEach((L, P) => {
      const G = T[P + 1];
      G && (I[L] = G.trim());
    }), I;
  } catch {
    return {};
  }
}
function Yt(i, p) {
  const m = [];
  let b = [...p];
  return { buttons: i.slice(0, 10).map((C) => {
    const T = C, I = String(T.type ?? "quick_reply").trim().toLowerCase(), L = String(T.label ?? "").trim() || "Button";
    if (I === "url") {
      const P = nt(String(T.url ?? ""), b);
      b = P.varOrder;
      const G = String(T.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        text: L,
        url: P.text || void 0,
        ...G ? { example: [G] } : {}
      };
    }
    if (I === "call")
      return {
        type: "PHONE_NUMBER",
        text: L,
        phone_number: String(T.phone ?? "").trim() || void 0
      };
    if (I === "copy_code") {
      const P = String(T.example ?? "").trim() || void 0;
      return { type: "COPY_CODE", text: L, ...P ? { example: P } : {} };
    }
    if (I === "otp") {
      const P = String(T.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        text: L,
        otp_type: P,
        ...String(T.autofill_text ?? "").trim() ? { autofill_text: String(T.autofill_text).trim() } : {},
        ...String(T.package_name ?? "").trim() ? { package_name: String(T.package_name).trim() } : {},
        ...String(T.signature_hash ?? "").trim() ? { signature_hash: String(T.signature_hash).trim() } : {}
      };
    }
    return I === "opt_out" ? { type: "QUICK_REPLY", text: L } : { type: "QUICK_REPLY", text: L };
  }).filter((C) => !!(C != null && C.text)), varOrder: b, warnings: m };
}
function ha(i) {
  return i.slice(0, 10).map((p) => {
    const m = p, b = String(m.type ?? "quick_reply").trim().toLowerCase(), k = String(m.label ?? "").trim() || "Button";
    if (b === "url") {
      const C = String(m.url ?? "").trim() || void 0, T = String(m.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        title: k,
        ...C ? { url: C } : {},
        ...T ? { example: [T] } : {}
      };
    }
    if (b === "call")
      return {
        type: "PHONE_NUMBER",
        title: k,
        ...String(m.phone ?? "").trim() ? { phoneNumber: String(m.phone).trim() } : {}
      };
    if (b === "opt_out")
      return { type: "OPT_OUT", title: k };
    if (b === "copy_code")
      return {
        type: "COPY_CODE",
        title: k,
        ...String(m.example ?? "").trim() ? { example: String(m.example).trim() } : {}
      };
    if (b === "otp") {
      const C = String(m.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        title: k,
        otp_type: C,
        ...String(m.autofill_text ?? "").trim() ? { autofill_text: String(m.autofill_text).trim() } : {},
        ...String(m.package_name ?? "").trim() ? { package_name: String(m.package_name).trim() } : {},
        ...String(m.signature_hash ?? "").trim() ? { signature_hash: String(m.signature_hash).trim() } : {}
      };
    }
    return { type: "QUICK_REPLY", title: k };
  }).filter((p) => !!p.title);
}
function $t(i) {
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
  for (const b of m)
    i[b] !== void 0 && i[b] !== null && i[b] !== "" && (p[b] = i[b]);
  return Object.keys(p).length ? p : void 0;
}
function ga(i, p = {}) {
  const m = [], b = i.message, k = [], C = va(b.template_name ?? i.name, i.name || "template_message"), T = ma(b.template_category), I = String(b.template_language ?? "en_US").trim() || "en_US";
  let L = [];
  const P = String(b.body ?? "").trim(), G = nt(P, []), te = String(b.template_example ?? "").trim(), le = !p.exampleData && te ? ya(G.text, te, G.varOrder) : {}, pe = p.exampleData ?? (Object.keys(le).length ? le : void 0), N = ba(b), se = String(b.header ?? "").trim();
  if (N === "TEXT" && se) {
    const ye = nt(se, L);
    L = ye.varOrder;
    const xe = wt(L, pe);
    k.push({
      type: "HEADER",
      format: "TEXT",
      text: ye.text,
      ...xe.length ? { example: { header_text: xe } } : {}
    });
  } else N && N !== "TEXT" && (k.push({ type: "HEADER", format: N }), b.media_url || m.push(`Header format ${N} selected but media_url is empty.`));
  const q = String(b.body ?? "").trim(), me = nt(q, L);
  L = me.varOrder;
  const M = wt(L, pe);
  k.push({
    type: "BODY",
    text: me.text,
    ...M.length ? { example: { body_text: [M] } } : {}
  });
  const K = String(b.footer ?? "").trim();
  if (K) {
    const ye = nt(K, L);
    L = ye.varOrder, k.push({
      type: "FOOTER",
      text: ye.text
    });
  }
  const X = Array.isArray(b.buttons) ? b.buttons : [];
  if (X.length) {
    const ye = Yt(X, L);
    L = ye.varOrder, m.push(...ye.warnings), ye.buttons.length && k.push({ type: "BUTTONS", buttons: ye.buttons });
  }
  const ae = String(b.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(ae) && m.push(`template_type="${ae}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: C,
      category: T,
      language: I,
      components: k
    },
    warnings: m
  };
}
function fa(i, p) {
  var k;
  const m = (k = p == null ? void 0 : p.example) == null ? void 0 : k.header_text, b = {
    header: {
      type: "TEXT",
      text: i,
      ...m != null && m.length ? { example: { header_text: m } } : {}
    }
  };
  return JSON.stringify(b);
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
  const m = ga(i, p), b = i.message, k = [...m.warnings], C = m.payload.category, T = C === "AUTHENTICATION", I = Ct[C] ?? Ct.MARKETING, P = (Array.isArray(b.buttons) ? b.buttons : []).filter((h) => {
    const ie = String(h.type ?? "quick_reply").trim().toLowerCase();
    return I.has(ie) ? !0 : (k.push(`Button type "${ie}" is not allowed for ${C}; removed from payload.`), !1);
  }), G = T ? 1 : 10;
  P.length > G && k.push(`${C} allows at most ${G} button(s); extra buttons removed.`);
  const te = P.slice(0, G), le = xt(ha(te)), pe = m.payload.components.filter((h) => !(T && h.type === "HEADER" || T && h.type === "FOOTER"));
  if (te.length) {
    const h = pe.findIndex((_e) => _e.type === "BUTTONS"), { buttons: ie } = Yt(te, []), ke = xt(ie), ve = { type: "BUTTONS", buttons: ke };
    h >= 0 ? pe[h] = ve : ke.length && pe.push(ve);
  } else {
    const h = pe.findIndex((ie) => ie.type === "BUTTONS");
    h >= 0 && pe.splice(h, 1);
  }
  const N = { ...m.payload, components: pe }, se = pe.find((h) => h.type === "HEADER"), q = pe.find((h) => h.type === "BODY"), me = pe.find((h) => h.type === "FOOTER"), M = String(b.body ?? "").trim(), K = String(b.header ?? "").trim(), X = String(b.footer ?? "").trim(), ae = (() => {
    const h = String(b.template_type ?? "").trim().toLowerCase();
    return h === "image" ? "IMAGE" : h === "video" ? "VIDEO" : h === "document" ? "DOCUMENT" : h === "carousel" ? "CAROUSEL" : "TEXT";
  })(), ye = String(b.vertical ?? "").trim() || void 0, xe = String(b.template_example ?? "").trim() || void 0, ee = String(b.media_handle ?? "").trim() || void 0, f = typeof b.enable_sample == "boolean" ? b.enable_sample : void 0, R = !T && typeof b.allow_category_change == "boolean" ? b.allow_category_change : void 0, V = typeof b.add_security_recommendation == "boolean" ? b.add_security_recommendation : void 0, fe = typeof b.code_expiration_minutes == "number" ? b.code_expiration_minutes : void 0, oe = !T && (se == null ? void 0 : se.format) === "TEXT" && (K || se.text) || "", A = oe ? fa(oe, se) : void 0;
  return { payload: {
    elementName: N.name,
    languageCode: N.language,
    category: N.category,
    templateType: ae,
    // AUTHENTICATION templates must NOT include content/example — Meta presets the body.
    ...T ? {} : { content: M || (q == null ? void 0 : q.text) || "" },
    ...ye ? { vertical: ye } : {},
    ...!T && xe ? { example: xe } : {},
    ...ee ? { exampleMedia: ee } : {},
    // TEXT headers go into containerMeta; media headers are expressed via templateType.
    ...A ? { containerMeta: A } : {},
    // Footer is forbidden for AUTHENTICATION templates.
    ...!T && (X || me != null && me.text) ? { footer: X || (me == null ? void 0 : me.text) } : {},
    ...le.length ? { buttons: le } : {},
    ...f !== void 0 ? { enableSample: f } : {},
    // allowTemplateCategoryChange is forbidden for AUTHENTICATION templates.
    ...R !== void 0 ? { allowTemplateCategoryChange: R } : {},
    ...V !== void 0 ? { addSecurityRecommendation: V } : {},
    ...fe !== void 0 ? { codeExpirationMinutes: fe } : {},
    metaTemplate: N,
    metaWhatsApp: N,
    ...$t(b) ? { advanced: $t(b) } : {}
  }, warnings: k };
}
function Xe(i, p) {
  return i.length <= p ? { text: i, truncated: !1 } : { text: i.slice(0, Math.max(0, p - 3)) + "...", truncated: !0 };
}
const rt = dt.android;
function ka(i) {
  const { title: p, body: m } = i, b = Xe(p || "", rt.title), k = Xe(m || "", rt.body);
  return {
    title: b.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function _a(i) {
  const { title: p, body: m } = i, b = Xe(p || "", rt.title), k = Xe(m || "", rt.body);
  return {
    title: b.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: k.truncated,
    expanded: !0
  };
}
function wa(i, p = {}) {
  const m = p.expanded ? _a(i) : ka(i);
  return p.darkMode !== void 0 && (m.darkMode = p.darkMode), m;
}
const It = dt.ios;
function Kt(i) {
  const { title: p, body: m } = i, b = Xe(p || "", It.title), k = Xe(m || "", It.body);
  return {
    title: b.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function $a(i) {
  return Kt(i);
}
function xa(i, p = {}) {
  const m = p.variant === "lockscreen" ? $a(i) : Kt(i);
  return p.darkMode !== void 0 && (m.darkMode = p.darkMode), m;
}
const Tt = dt.web;
function At(i) {
  const { title: p, body: m } = i, b = Xe(p || "", Tt.title), k = Xe(m || "", Tt.body);
  return {
    title: b.text,
    body: k.text,
    imageUrl: i.imageUrl,
    titleTruncated: b.truncated,
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
  const p = ue(
    qt(i.initial ?? ia())
  ), m = i.hooks ?? {}, b = ue(!1), k = ue([]);
  Le(
    p,
    () => {
      if (!m.customValidators) {
        k.value = [];
        return;
      }
      m.customValidators(p.value).then((V) => {
        k.value = V;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const C = ue([]), T = ue([]);
  function I() {
    const V = vt(p.value);
    C.value = [...C.value.slice(-19), V], T.value = [];
  }
  const L = w(() => C.value.length > 0), P = w(() => T.value.length > 0);
  function G() {
    C.value.length !== 0 && (T.value = [vt(p.value), ...T.value], p.value = C.value[C.value.length - 1], C.value = C.value.slice(0, -1));
  }
  function te() {
    T.value.length !== 0 && (C.value = [...C.value, vt(p.value)], p.value = T.value[0], T.value = T.value.slice(1));
  }
  Le(
    p,
    () => {
      var V;
      b.value = !0, (V = i.onDirty) == null || V.call(i);
    },
    { deep: !0 }
  );
  const le = w(() => zt(p.value));
  function pe(V) {
    const fe = da(p.value, V), oe = Ca(k.value), A = [...ca(fe), ...oe], W = [...fe.errors, ...oe], h = fe.valid && oe.length === 0;
    return {
      ...fe,
      errors: W,
      valid: h,
      blockingErrors: A,
      warnings: pa(fe)
    };
  }
  function N(V) {
    I(), p.value = { ...p.value, ...V };
  }
  function se(V) {
    I(), p.value = {
      ...p.value,
      audience: { ...p.value.audience, ...V }
    };
  }
  function q(V) {
    I(), p.value = {
      ...p.value,
      message: { ...p.value.message, ...V }
    };
  }
  function me(V) {
    I(), p.value = {
      ...p.value,
      delivery: { ...p.value.delivery, ...V }
    };
  }
  function M(V) {
    I(), p.value = {
      ...p.value,
      tracking: p.value.tracking ? { ...p.value.tracking, ...V } : { campaign_name: "", tags: [], ab_test: !1, ...V }
    };
  }
  function K(V) {
    I(), p.value = {
      ...p.value,
      message: { ...gt(), ...V }
    };
  }
  function X(V) {
    I(), p.value = {
      ...p.value,
      delivery: { ...ft(), ...V }
    };
  }
  function ae(V) {
    I(), p.value = {
      ...p.value,
      tracking: { ...kt(), ...V }
    };
  }
  function ye(V) {
    I(), p.value = {
      ...p.value,
      audience: { ...ht(), ...V }
    };
  }
  const xe = w(() => ({
    title: p.value.message.title,
    body: p.value.message.body,
    imageUrl: p.value.message.image_url
  }));
  function ee(V, fe) {
    const oe = xe.value;
    let A;
    switch (V) {
      case "android":
        A = wa(oe, { expanded: fe == null ? void 0 : fe.expanded });
        break;
      case "ios":
        A = xa(oe);
        break;
      case "web":
        A = At(oe);
        break;
      default:
        A = At(oe);
    }
    const W = p.value.message.actions ?? [], h = p.value.message.location;
    return { ...A, actions: W, location: h ?? void 0 };
  }
  const f = dt;
  async function R() {
    return m.customValidators ? m.customValidators(p.value) : [];
  }
  return {
    campaign: p,
    dirty: b,
    validation: le,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: k,
    getValidationWithWarnings: pe,
    update: N,
    updateAudience: se,
    updateMessage: q,
    updateDelivery: me,
    updateTracking: M,
    undo: G,
    redo: te,
    canUndo: L,
    canRedo: P,
    resetMessage: K,
    resetDelivery: X,
    resetTracking: ae,
    resetAudience: ye,
    getPreview: ee,
    previewInput: xe,
    characterLimits: f,
    runCustomValidators: R,
    hooks: m
  };
}
const Sa = "keos-draft", Ia = 2e3;
function Ta(i, p) {
  return `${Sa}-${i}-${p}`;
}
function pt(i, p) {
  const m = p.channel, b = w(
    () => {
      var G, te;
      return Ta(
        m,
        p.key ?? ((G = i.value) == null ? void 0 : G.id) ?? ((te = i.value) == null ? void 0 : te.name) ?? "draft"
      );
    }
  ), k = ue(null);
  let C = null;
  function T() {
    try {
      const G = JSON.stringify(i.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(b.value, G), k.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function I() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(b.value);
    } catch {
    }
  }
  function L() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const G = window.localStorage.getItem(b.value);
      if (!G) return null;
      const te = JSON.parse(G);
      return qt(te);
    } catch {
      return null;
    }
  }
  function P() {
    return p.enabled === void 0 ? !0 : typeof p.enabled == "boolean" ? p.enabled : p.enabled.value;
  }
  return Le(
    i,
    () => {
      P() && (C && clearTimeout(C), C = setTimeout(() => {
        C = null, T();
      }, Ia));
    },
    { deep: !0 }
  ), {
    lastSavedAt: k,
    clearDraft: I,
    getDraft: L,
    persist: T
  };
}
const Aa = { class: "kb-header__row" }, Ua = ["value"], Ra = { class: "kb-header__actions" }, Ea = ["disabled"], Pa = ["disabled"], Ba = ["value"], La = ["value"], Oa = /* @__PURE__ */ Ee({
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
    ], b = i, k = p, C = () => !!(b.campaignName || "").trim();
    function T(P) {
      return b.slugifyName ? P.trim().replace(/\s+/g, "-") : P;
    }
    function I(P) {
      return P.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function L(P) {
      const G = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return G[P] ?? G.draft;
    }
    return (P, G) => (a(), n("header", {
      class: "kb-header",
      style: Se({
        padding: `${$(Ce)[16]}px 0`,
        borderBottom: `1px solid ${$(Ae).neutral.border}`,
        marginBottom: `${$(Ce)[16]}px`
      })
    }, [
      e("div", Aa, [
        e("div", {
          class: we(["kb-header__name-section", { "kb-header__name-section--filled": C() }])
        }, [
          G[4] || (G[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: i.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: G[0] || (G[0] = (te) => k("update:campaignName", T(te.target.value))),
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
          style: Se({
            padding: `${$(Ce)[4]}px ${$(Ce)[8]}px`,
            borderRadius: `${$(Qe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...L(i.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: G[3] || (G[3] = (te) => k("update:workflowStatus", te.target.value))
        }, [
          (a(), n(U, null, D(m, (te) => e("option", {
            key: te.value,
            value: te.value
          }, c(te.label), 9, La)), 64))
        ], 44, Ba)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: Se({
            padding: `${$(Ce)[4]}px ${$(Ce)[8]}px`,
            borderRadius: `${$(Qe).input}px`,
            background: $(Ae).neutral.bg,
            fontSize: "0.8125rem",
            color: $(Ae).neutral.textMuted
          })
        }, c(i.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: Se({ fontSize: "0.8125rem", color: $(Ae).neutral.textMuted, marginTop: `${$(Ce)[4]}px` })
      }, [
        i.saving ? (a(), n(U, { key: 0 }, [
          F("Saving…")
        ], 64)) : i.dirty ? (a(), n(U, { key: 1 }, [
          F("Unsaved changes")
        ], 64)) : i.lastSavedAt ? (a(), n(U, { key: 2 }, [
          F("Last saved at " + c(I(i.lastSavedAt)), 1)
        ], 64)) : y("", !0)
      ], 4)
    ], 4));
  }
}), Be = (i, p) => {
  const m = i.__vccOpts || i;
  for (const [b, k] of p)
    m[b] = k;
  return m;
}, mt = /* @__PURE__ */ Be(Oa, [["__scopeId", "data-v-56efb3ec"]]), Na = { class: "kb-section" }, Ma = { class: "kb-section__head" }, Va = { class: "kb-field" }, Da = { class: "kb-label" }, ja = { class: "kb-field-with-rail" }, Ha = ["value", "aria-invalid"], Wa = { class: "kb-var-picker-wrap" }, qa = {
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
}, gn = { class: "kb-field" }, fn = { class: "kb-actions-list" }, kn = { class: "kb-action-card__head" }, _n = { class: "kb-action-card__num" }, wn = { class: "kb-action-card__type-row" }, $n = ["value", "onChange"], xn = ["value"], Cn = { class: "kb-toggle-row kb-toggle-row--inline" }, Sn = ["checked", "onChange"], In = ["onClick"], Tn = ["value", "onInput"], An = ["value", "onInput"], Un = { class: "kb-action-http-row" }, Rn = ["value", "onChange"], En = ["value"], Pn = ["value", "onInput"], Bn = ["value", "onInput"], Ln = { class: "kb-kv-section" }, On = ["value", "onInput"], Nn = ["value", "onInput"], Mn = ["onClick"], Vn = ["onClick"], Dn = ["value", "onInput"], jn = { class: "kb-kv-section" }, Hn = ["value", "onInput"], Wn = ["value", "onInput"], qn = ["onClick"], Fn = ["onClick"], zn = ["value", "onInput"], Yn = { class: "kb-actions-footer" }, Kn = ["disabled"], Gn = { class: "kb-action-chips" }, Jn = ["disabled", "onClick"], Qn = { class: "kb-field" }, Xn = { class: "kb-location-row" }, Zn = ["value"], es = ["value"], ts = ["value"], as = ["value"], ns = { class: "kb-field" }, ss = ["value"], ls = { class: "kb-field" }, os = ["value"], is = { class: "kb-field" }, rs = { class: "kb-delay-row" }, us = ["value"], ds = { class: "kb-delay-chips" }, cs = ["onClick"], ps = { class: "kb-advanced-toggles" }, ms = { class: "kb-advanced-toggles__body" }, vs = { class: "kb-toggle-row" }, bs = ["checked"], ys = { class: "kb-toggle-row" }, hs = ["checked"], gs = { class: "kb-toggle-row" }, fs = ["checked"], bt = 3, ks = /* @__PURE__ */ Ee({
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
    const m = i, b = p, k = w(() => m.message), C = [
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
    ], T = w(() => {
      const W = (k.value.variables ?? []).filter(Boolean);
      return W.length ? Array.from(new Set(W)) : C;
    }), I = ue(null);
    function L(W) {
      I.value = I.value === W ? null : W;
    }
    function P(W, h) {
      const ie = ` {{ .${h} }}`, ke = (k.value.variables ?? []).filter(Boolean), ve = Array.from(/* @__PURE__ */ new Set([...ke, h]));
      W === "title" ? b("update", { title: `${m.message.title || ""}${ie}`, variables: ve }) : b("update", { body: `${m.message.body || ""}${ie}`, variables: ve }), I.value = null;
    }
    const G = ue(""), te = w(() => k.value.tags ?? []);
    function le() {
      const W = G.value.trim().toLowerCase().replace(/\s+/g, "_");
      if (!W) return;
      const h = Array.from(/* @__PURE__ */ new Set([...te.value, W]));
      b("update", { tags: h }), G.value = "";
    }
    function pe(W) {
      b("update", { tags: te.value.filter((h) => h !== W) });
    }
    function N(W) {
      (W.key === "Enter" || W.key === ",") && (W.preventDefault(), le());
    }
    const se = ["warning", "white_check_mark", "rotating_light", "loudspeaker", "package", "truck", "calendar", "key", "bell", "fire"], q = w(() => k.value.actions ?? []), me = [
      { value: "view", label: "View", hint: "Open a URL in the browser or app." },
      { value: "http", label: "HTTP request", hint: "Send an HTTP request when tapped." },
      { value: "broadcast", label: "Broadcast", hint: "Android intent (automation apps)." },
      { value: "copy", label: "Copy to clipboard", hint: "Copy a value to the clipboard." }
    ], M = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    function K() {
      const W = [...q.value, { id: `action_${Date.now()}`, action: "view", label: "" }];
      b("update", { actions: W });
    }
    function X(W) {
      const h = [...q.value];
      h.splice(W, 1), b("update", { actions: h });
    }
    function ae(W, h) {
      const ie = [...q.value];
      ie[W] = { ...ie[W], ...h }, b("update", { actions: ie });
    }
    function ye(W, h) {
      var ve, _e;
      const ie = { id: (ve = q.value[W]) == null ? void 0 : ve.id, action: h, label: ((_e = q.value[W]) == null ? void 0 : _e.label) ?? "" }, ke = [...q.value];
      ke[W] = ie, b("update", { actions: ke });
    }
    function xe(W) {
      const h = W.headers ?? {};
      return Object.entries(h).map(([ie, ke]) => ({ key: ie, value: ke }));
    }
    function ee(W) {
      const h = { ...q.value[W].headers ?? {} };
      h[""] = "", ae(W, { headers: h });
    }
    function f(W, h, ie, ke) {
      const ve = {};
      for (const [_e, E] of Object.entries(q.value[W].headers ?? {}))
        ve[_e === h ? ie : _e] = _e === h ? ke : E;
      ae(W, { headers: ve });
    }
    function R(W, h) {
      const ie = { ...q.value[W].headers ?? {} };
      delete ie[h], ae(W, { headers: ie });
    }
    function V(W) {
      const h = W.extras ?? {};
      return Object.entries(h).map(([ie, ke]) => ({ key: ie, value: ke }));
    }
    function fe(W) {
      const h = { ...q.value[W].extras ?? {} };
      h[""] = "", ae(W, { extras: h });
    }
    function oe(W, h, ie, ke) {
      const ve = {};
      for (const [_e, E] of Object.entries(q.value[W].extras ?? {}))
        ve[_e === h ? ie : _e] = _e === h ? ke : E;
      ae(W, { extras: ve });
    }
    function A(W, h) {
      const ie = { ...q.value[W].extras ?? {} };
      delete ie[h], ae(W, { extras: ie });
    }
    return (W, h) => {
      var ie, ke, ve, _e;
      return a(), n("section", Na, [
        e("div", Ma, [
          h[21] || (h[21] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: h[0] || (h[0] = (E) => W.$emit("reset"))
          }, "Reset section")) : y("", !0)
        ]),
        h[45] || (h[45] = e("p", { class: "kb-section__desc" }, " Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required. ", -1)),
        e("div", Va, [
          e("label", Da, [
            h[22] || (h[22] = F(" Title ", -1)),
            e("span", {
              class: we(["kb-counter", { "kb-counter--warn": i.titleCount > i.titleLimit }])
            }, c(i.titleCount) + "/" + c(i.titleLimit), 3)
          ]),
          e("div", ja, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: i.message.title,
              "aria-invalid": !!i.titleError,
              onInput: h[1] || (h[1] = (E) => W.$emit("update", { title: E.target.value }))
            }, null, 40, Ha),
            e("div", Wa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: h[2] || (h[2] = (E) => L("title"))
              }, "{{ .var }}"),
              I.value === "title" ? (a(), n("div", qa, [
                (a(!0), n(U, null, D(T.value, (E) => (a(), n("button", {
                  key: `title-var-${E}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (Q) => P("title", E)
                }, c(E), 9, Fa))), 128))
              ])) : y("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Se({ "--pct": Math.min(100, i.titleCount / i.titleLimit * 100) + "%" })
            }, [...h[23] || (h[23] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          i.titleError ? (a(), n("p", za, c(i.titleError), 1)) : y("", !0)
        ]),
        e("div", Ya, [
          e("label", Ka, [
            h[24] || (h[24] = F(" Message ", -1)),
            e("span", {
              class: we(["kb-counter", { "kb-counter--warn": i.bodyCount > i.bodyLimit }])
            }, c(i.bodyCount) + "/" + c(i.bodyLimit), 3)
          ]),
          e("div", Ga, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: i.message.body,
              "aria-invalid": !!i.bodyError,
              onInput: h[3] || (h[3] = (E) => W.$emit("update", { body: E.target.value }))
            }, null, 40, Ja),
            e("div", Qa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: h[4] || (h[4] = (E) => L("body"))
              }, "{{ .var }}"),
              I.value === "body" ? (a(), n("div", Xa, [
                (a(!0), n(U, null, D(T.value, (E) => (a(), n("button", {
                  key: `body-var-${E}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (Q) => P("body", E)
                }, c(E), 9, Za))), 128))
              ])) : y("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Se({ "--pct": Math.min(100, i.bodyCount / i.bodyLimit * 100) + "%" })
            }, [...h[25] || (h[25] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          i.bodyError ? (a(), n("p", en, c(i.bodyError), 1)) : y("", !0),
          e("label", tn, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!k.value.markdown,
              onChange: h[5] || (h[5] = (E) => W.$emit("update", { markdown: E.target.checked || void 0 }))
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
            (a(!0), n(U, null, D(te.value, (E) => (a(), n("span", {
              key: E,
              class: "kb-tag"
            }, [
              F(c(E) + " ", 1),
              e("button", {
                type: "button",
                class: "kb-tag__remove",
                onClick: (Q) => pe(E),
                "aria-label": "Remove tag"
              }, "×", 8, ln)
            ]))), 128)),
            je(e("input", {
              type: "text",
              class: "kb-input kb-input--tag",
              placeholder: "Add tag, press Enter",
              "onUpdate:modelValue": h[6] || (h[6] = (E) => G.value = E),
              onKeydown: N,
              onBlur: le
            }, null, 544), [
              [ut, G.value]
            ])
          ]),
          e("div", on, [
            h[27] || (h[27] = e("span", {
              class: "kb-helper",
              style: { "margin-right": "0.4rem" }
            }, "Common:", -1)),
            (a(), n(U, null, D(se, (E) => e("button", {
              key: E,
              type: "button",
              class: we(["kb-tag-chip", { "kb-tag-chip--active": te.value.includes(E) }]),
              onClick: (Q) => te.value.includes(E) ? pe(E) : (G.value = E, le())
            }, c(E), 11, rn)), 64))
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
            onInput: h[7] || (h[7] = (E) => W.$emit("update", { icon: E.target.value || void 0 }))
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
            onInput: h[8] || (h[8] = (E) => W.$emit("update", { image_url: E.target.value || void 0, attach: E.target.value || void 0 }))
          }, null, 40, pn),
          i.imageUrlError ? (a(), n("p", mn, c(i.imageUrlError), 1)) : y("", !0),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Filename override (e.g. invoice.pdf) — optional",
            value: k.value.attachment_filename ?? "",
            onInput: h[9] || (h[9] = (E) => W.$emit("update", { attachment_filename: E.target.value || void 0 }))
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
            onInput: h[10] || (h[10] = (E) => W.$emit("update", { deep_link: E.target.value || void 0 }))
          }, null, 40, yn),
          i.deepLinkError ? (a(), n("p", hn, c(i.deepLinkError), 1)) : y("", !0)
        ]),
        e("div", gn, [
          e("label", { class: "kb-label" }, [
            h[32] || (h[32] = F(" Action buttons ", -1)),
            e("span", { class: "kb-helper" }, "Up to " + c(bt) + " interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.")
          ]),
          e("div", fn, [
            (a(!0), n(U, null, D(q.value, (E, Q) => (a(), n("div", {
              key: E.id || Q,
              class: "kb-action-card"
            }, [
              e("div", kn, [
                e("span", _n, "Button " + c(Q + 1), 1),
                e("div", wn, [
                  e("select", {
                    class: "kb-select kb-select--action-type",
                    value: E.action,
                    onChange: (J) => ye(Q, J.target.value)
                  }, [
                    (a(), n(U, null, D(me, (J) => e("option", {
                      key: J.value,
                      value: J.value
                    }, c(J.label), 9, xn)), 64))
                  ], 40, $n),
                  e("label", Cn, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!E.clear,
                      onChange: (J) => ae(Q, { clear: J.target.checked || void 0 })
                    }, null, 40, Sn),
                    h[33] || (h[33] = e("span", { class: "kb-toggle-label" }, "Dismiss after tap", -1))
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "kb-btn-remove-action",
                  onClick: (J) => X(Q)
                }, "Remove", 8, In)
              ]),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label (e.g. View order)",
                value: E.label,
                onInput: (J) => ae(Q, { label: J.target.value })
              }, null, 40, Tn),
              E.action === "view" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input",
                placeholder: "URL to open (https:// or app://)",
                value: E.url ?? "",
                onInput: (J) => ae(Q, { url: J.target.value || void 0 })
              }, null, 40, An)) : E.action === "http" ? (a(), n(U, { key: 1 }, [
                e("div", Un, [
                  e("select", {
                    class: "kb-select kb-select--method",
                    value: E.method ?? "POST",
                    onChange: (J) => ae(Q, { method: J.target.value })
                  }, [
                    (a(), n(U, null, D(M, (J) => e("option", {
                      key: J,
                      value: J
                    }, c(J), 9, En)), 64))
                  ], 40, Rn),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "Endpoint URL",
                    value: E.url ?? "",
                    onInput: (J) => ae(Q, { url: J.target.value || void 0 })
                  }, null, 40, Pn)
                ]),
                e("textarea", {
                  class: "kb-textarea kb-textarea--sm",
                  rows: "2",
                  placeholder: 'Request body (e.g. {"status":"closed"})',
                  value: E.body ?? "",
                  onInput: (J) => ae(Q, { body: J.target.value || void 0 })
                }, null, 40, Bn),
                e("div", Ln, [
                  h[34] || (h[34] = e("span", { class: "kb-kv-label" }, "Headers", -1)),
                  (a(!0), n(U, null, D(xe(E), (J, $e) => (a(), n("div", {
                    key: $e,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Header name",
                      value: J.key,
                      onInput: (be) => f(Q, J.key, be.target.value, J.value)
                    }, null, 40, On),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: J.value,
                      onInput: (be) => f(Q, J.key, J.key, be.target.value)
                    }, null, 40, Nn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (be) => R(Q, J.key)
                    }, "×", 8, Mn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (J) => ee(Q)
                  }, "+ Add header", 8, Vn)
                ])
              ], 64)) : E.action === "broadcast" ? (a(), n(U, { key: 2 }, [
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "Intent (default: io.heckel.ntfy.USER_ACTION)",
                  value: E.intent ?? "",
                  onInput: (J) => ae(Q, { intent: J.target.value || void 0 })
                }, null, 40, Dn),
                e("div", jn, [
                  h[35] || (h[35] = e("span", { class: "kb-kv-label" }, "Extras", -1)),
                  (a(!0), n(U, null, D(V(E), (J, $e) => (a(), n("div", {
                    key: $e,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Key",
                      value: J.key,
                      onInput: (be) => oe(Q, J.key, be.target.value, J.value)
                    }, null, 40, Hn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: J.value,
                      onInput: (be) => oe(Q, J.key, J.key, be.target.value)
                    }, null, 40, Wn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (be) => A(Q, J.key)
                    }, "×", 8, qn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (J) => fe(Q)
                  }, "+ Add extra", 8, Fn)
                ])
              ], 64)) : E.action === "copy" ? (a(), n("input", {
                key: 3,
                type: "text",
                class: "kb-input",
                placeholder: "Value to copy to clipboard",
                value: E.value ?? "",
                onInput: (J) => ae(Q, { value: J.target.value || void 0 })
              }, null, 40, zn)) : y("", !0)
            ]))), 128)),
            e("div", Yn, [
              e("button", {
                type: "button",
                class: "kb-btn-add-action",
                disabled: q.value.length >= bt,
                onClick: K
              }, " Add action ", 8, Kn),
              e("div", Gn, [
                h[36] || (h[36] = e("span", { class: "kb-action-chips-label" }, "Quick add:", -1)),
                (a(), n(U, null, D(["View order", "Track shipment", "Dismiss"], (E) => e("button", {
                  key: E,
                  type: "button",
                  class: "kb-action-chip",
                  disabled: q.value.length >= bt,
                  onClick: () => {
                    const Q = [...q.value, { id: `action_${Date.now()}`, action: "view", label: E }];
                    W.$emit("update", { actions: Q });
                  }
                }, c(E), 9, Jn)), 64))
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
              value: ((ie = k.value.location) == null ? void 0 : ie.lat) ?? "",
              onInput: h[11] || (h[11] = (E) => {
                const Q = { ...k.value.location ?? {} }, J = E.target.value;
                Q.lat = J === "" ? void 0 : Number(J), W.$emit("update", { location: Q });
              })
            }, null, 40, Zn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ke = k.value.location) == null ? void 0 : ke.lon) ?? "",
              onInput: h[12] || (h[12] = (E) => {
                const Q = { ...k.value.location ?? {} }, J = E.target.value;
                Q.lon = J === "" ? void 0 : Number(J), W.$emit("update", { location: Q });
              })
            }, null, 40, es)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. HQ, Store name)",
            value: ((ve = k.value.location) == null ? void 0 : ve.name) ?? "",
            onInput: h[13] || (h[13] = (E) => {
              const Q = { ...k.value.location ?? {} };
              Q.name = E.target.value || void 0, W.$emit("update", { location: Q });
            })
          }, null, 40, ts),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Address (optional)",
            value: ((_e = k.value.location) == null ? void 0 : _e.address) ?? "",
            onInput: h[14] || (h[14] = (E) => {
              const Q = { ...k.value.location ?? {} };
              Q.address = E.target.value || void 0, W.$emit("update", { location: Q });
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
            onInput: h[15] || (h[15] = (E) => W.$emit("update", { email_forward: E.target.value || void 0 }))
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
            onInput: h[16] || (h[16] = (E) => W.$emit("update", { call: E.target.value || void 0 }))
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
              onInput: h[17] || (h[17] = (E) => W.$emit("update", { delay: E.target.value || void 0 }))
            }, null, 40, us),
            e("div", ds, [
              (a(), n(U, null, D(["30min", "1h", "4h", "tomorrow"], (E) => e("button", {
                key: E,
                type: "button",
                class: we(["kb-delay-chip", { "kb-delay-chip--active": k.value.delay === E }]),
                onClick: (Q) => W.$emit("update", { delay: k.value.delay === E ? void 0 : E })
              }, c(E), 11, cs)), 64))
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
                onChange: h[18] || (h[18] = (E) => W.$emit("update", { cache: E.target.checked || void 0 }))
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
                onChange: h[19] || (h[19] = (E) => W.$emit("update", { firebase: E.target.checked || void 0 }))
              }, null, 40, hs),
              h[42] || (h[42] = e("span", { class: "kb-toggle-label" }, [
                F("Deliver via Firebase Cloud Messaging ("),
                e("code", null, "firebase"),
                F(")")
              ], -1))
            ]),
            e("label", gs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.unified_push,
                onChange: h[20] || (h[20] = (E) => W.$emit("update", { unified_push: E.target.checked || void 0 }))
              }, null, 40, fs),
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
}), _s = /* @__PURE__ */ Be(ks, [["__scopeId", "data-v-03f4fc73"]]), ws = { class: "kb-section kb-section--inline-personalization" }, $s = { class: "kb-field" }, xs = { class: "kb-insert-row" }, Cs = ["value"], Ss = { class: "kb-field" }, Is = { class: "kb-insert-row" }, Ts = { class: "kb-field" }, As = { class: "kb-variable-list" }, Us = /* @__PURE__ */ Ee({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(i, { emit: p }) {
    var N;
    const m = i, b = p, k = [
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
    ], C = [
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
    ], T = w(
      () => (m.targets ?? []).includes("footer") ? C : k
    ), I = ue(
      (N = m.variableOptions) != null && N.length ? [...m.variableOptions] : [...T.value]
    ), L = ue(I.value[0] ?? T.value[0]), P = ue("");
    Le(
      () => m.variableOptions,
      (se) => {
        se && se.length ? (I.value = [...se], I.value.includes(L.value) || (L.value = I.value[0])) : (I.value = [...T.value], I.value.includes(L.value) || (L.value = I.value[0]));
      }
    ), Le(
      T,
      (se) => {
        var q;
        (q = m.variableOptions) != null && q.length || (I.value = [...se], I.value.includes(L.value) || (L.value = I.value[0]));
      }
    );
    const G = w(() => I.value), te = w(() => {
      var q;
      return (q = m.targets) != null && q.length ? m.targets : ["title", "body"];
    });
    function le(se) {
      b("insertVariable", { variable: L.value, field: se });
    }
    function pe() {
      const se = P.value.trim();
      se && (I.value.includes(se) || (I.value = [...I.value, se]), L.value = se, P.value = "");
    }
    return (se, q) => (a(), n("section", ws, [
      q[9] || (q[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      q[10] || (q[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", $s, [
        q[5] || (q[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", xs, [
          je(e("select", {
            "onUpdate:modelValue": q[0] || (q[0] = (me) => L.value = me),
            class: "kb-select"
          }, [
            (a(!0), n(U, null, D(G.value, (me) => (a(), n("option", {
              key: me,
              value: me
            }, c(me), 9, Cs))), 128))
          ], 512), [
            [Ke, L.value]
          ]),
          te.value.includes("title") ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[1] || (q[1] = (me) => le("title"))
          }, " Into title ")) : y("", !0),
          te.value.includes("body") ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[2] || (q[2] = (me) => le("body"))
          }, " Into message ")) : y("", !0),
          te.value.includes("footer") ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[3] || (q[3] = (me) => le("footer"))
          }, " Into footer ")) : y("", !0)
        ])
      ]),
      e("div", Ss, [
        q[6] || (q[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Is, [
          je(e("input", {
            "onUpdate:modelValue": q[4] || (q[4] = (me) => P.value = me),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [ut, P.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: pe
          }, " Add ")
        ])
      ]),
      e("div", Ts, [
        q[7] || (q[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        q[8] || (q[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", As, [
          (a(!0), n(U, null, D(G.value, (me) => (a(), n("li", { key: me }, [
            e("code", null, "{{ ." + c(me) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ Be(Us, [["__scopeId", "data-v-ab96d6bb"]]), Rs = { class: "kb-section kb-section--template-type" }, Es = { class: "kb-field" }, Ps = { class: "kb-radio-group" }, Bs = { class: "kb-radio" }, Ls = ["checked"], Os = { class: "kb-radio" }, Ns = ["checked"], Ms = /* @__PURE__ */ Ee({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(i, { emit: p }) {
    const m = p;
    return (b, k) => (a(), n("section", Rs, [
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
              onChange: k[0] || (k[0] = (C) => m("update", "transactional"))
            }, null, 40, Ls),
            k[2] || (k[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Os, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: i.templateType === "marketing",
              onChange: k[1] || (k[1] = (C) => m("update", "marketing"))
            }, null, 40, Ns),
            k[3] || (k[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        k[4] || (k[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Be(Ms, [["__scopeId", "data-v-ff2e1bd8"]]), Vs = { class: "kb-section" }, Ds = { class: "kb-section__head" }, js = { class: "kb-section__desc" }, Hs = { class: "kb-field" }, Ws = { class: "kb-radio-group" }, qs = { class: "kb-radio" }, Fs = ["checked"], zs = { class: "kb-radio" }, Ys = ["checked"], Ks = {
  key: 0,
  class: "kb-field kb-row"
}, Gs = ["value"], Js = ["value"], Qs = { class: "kb-field" }, Xs = ["value"], Zs = ["value"], el = { class: "kb-field" }, tl = ["value"], al = ["value"], nl = { class: "kb-field" }, sl = { class: "kb-checkbox" }, ll = ["checked"], ol = /* @__PURE__ */ Ee({
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
    return (m, b) => {
      var k;
      return a(), n("section", Vs, [
        e("div", Ds, [
          b[8] || (b[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (C) => m.$emit("reset"))
          }, " Reset section ")) : y("", !0)
        ]),
        e("p", js, c(i.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Hs, [
          b[11] || (b[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Ws, [
            e("label", qs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !i.delivery.scheduled_at,
                onChange: b[1] || (b[1] = (C) => m.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Fs),
              b[9] || (b[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", zs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!i.delivery.scheduled_at,
                onChange: b[2] || (b[2] = (C) => m.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Ys),
              b[10] || (b[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        i.delivery.scheduled_at ? (a(), n("div", Ks, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (k = i.delivery.scheduled_at) == null ? void 0 : k.slice(0, 16),
            onInput: b[3] || (b[3] = (C) => m.$emit("update", { scheduled_at: C.target.value }))
          }, null, 40, Gs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: i.delivery.timezone,
            onInput: b[4] || (b[4] = (C) => m.$emit("update", { timezone: C.target.value }))
          }, null, 40, Js)
        ])) : y("", !0),
        i.showPushOptions ? (a(), n(U, { key: 1 }, [
          e("div", Qs, [
            b[12] || (b[12] = e("label", { class: "kb-label" }, [
              F(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: i.delivery.ttl,
              onChange: b[5] || (b[5] = (C) => m.$emit("update", { ttl: Number(C.target.value) }))
            }, [
              (a(!0), n(U, null, D($(la), (C) => (a(), n("option", {
                key: C,
                value: C
              }, c(p[C] ?? C + "s"), 9, Zs))), 128))
            ], 40, Xs)
          ]),
          e("div", el, [
            b[13] || (b[13] = e("label", { class: "kb-label" }, [
              F(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: i.delivery.priority,
              onChange: b[6] || (b[6] = (C) => m.$emit("update", { priority: C.target.value }))
            }, [
              (a(!0), n(U, null, D($(jt), (C) => (a(), n("option", {
                key: C,
                value: C
              }, c(C), 9, al))), 128))
            ], 40, tl)
          ]),
          e("div", nl, [
            e("label", sl, [
              e("input", {
                type: "checkbox",
                checked: i.delivery.quiet_hours,
                onChange: b[7] || (b[7] = (C) => m.$emit("update", { quiet_hours: !i.delivery.quiet_hours }))
              }, null, 40, ll),
              b[14] || (b[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : y("", !0)
      ]);
    };
  }
}), il = /* @__PURE__ */ Be(ol, [["__scopeId", "data-v-5707a2a7"]]), rl = { class: "kb-accordion" }, ul = { class: "kb-accordion__body" }, dl = { class: "kb-field" }, cl = ["value"], pl = { class: "kb-field" }, ml = { class: "kb-checkbox" }, vl = ["checked"], bl = /* @__PURE__ */ Ee({
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
            onInput: m[0] || (m[0] = (b) => p.$emit("update", { collapse_key: b.target.value || void 0 }))
          }, null, 40, cl)
        ]),
        e("div", pl, [
          e("label", ml, [
            e("input", {
              type: "checkbox",
              checked: i.delivery.silent_push,
              onChange: m[1] || (m[1] = (b) => p.$emit("update", { silent_push: !i.delivery.silent_push }))
            }, null, 40, vl),
            m[3] || (m[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), yl = /* @__PURE__ */ Be(bl, [["__scopeId", "data-v-699e4501"]]);
function Je(i, p) {
  return !i || typeof i != "string" ? i : i.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, b) => {
    const C = String(b).trim().replace(/^\./, "");
    return C in p ? String(p[C]) : m;
  });
}
const Ze = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], hl = { class: "kb-preview" }, gl = { class: "kb-preview__toggle" }, fl = { class: "kb-preview__mode" }, kl = { class: "kb-preview__quality" }, _l = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, wl = ["src"], $l = { class: "kb-android-body-row" }, xl = { class: "kb-android-body-content" }, Cl = {
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
}, Dl = ["src"], jl = {
  key: 0,
  class: "kb-preview-map__caption"
}, Hl = {
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
}, no = /* @__PURE__ */ Ee({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(i) {
    const p = i, m = ue("shade"), b = ue("banner"), k = ue("toast"), C = w(() => m.value === "expanded"), T = w(
      () => p.getPreview(p.selectedPlatform, {
        expanded: p.selectedPlatform === "android" ? C.value : void 0
      })
    ), I = w(() => {
      const ee = T.value;
      return p.previewProfile ? {
        ...ee,
        title: Je((ee == null ? void 0 : ee.title) ?? "", p.previewProfile.data),
        body: Je((ee == null ? void 0 : ee.body) ?? "", p.previewProfile.data)
      } : ee;
    }), L = {
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
    function P(ee, f) {
      const R = (ee ?? "").trim();
      return R ? R.length <= f ? R : `${R.slice(0, Math.max(0, f - 1)).trimEnd()}…` : "";
    }
    const G = w(() => p.selectedPlatform === "android" ? m.value : p.selectedPlatform === "ios" ? b.value : k.value), te = w(() => (L[p.selectedPlatform] ?? L.web)[G.value] ?? { title: 60, body: 160 }), le = w(
      () => {
        var ee;
        return P((ee = I.value) == null ? void 0 : ee.title, te.value.title);
      }
    ), pe = w(
      () => {
        var ee;
        return P((ee = I.value) == null ? void 0 : ee.body, te.value.body);
      }
    ), N = { android: 3, ios: 4, web: 2 }, se = w(
      () => {
        var ee;
        return Array.isArray((ee = I.value) == null ? void 0 : ee.actions) ? I.value.actions : [];
      }
    ), q = w(
      () => se.value.slice(0, N[p.selectedPlatform] ?? 2)
    ), me = w(
      () => Math.max(0, se.value.length - q.value.length)
    ), M = w(() => {
      var ee;
      return (((ee = p.message) == null ? void 0 : ee.deep_link) ?? "").trim();
    }), K = w(() => M.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(M.value) : !1), X = w(() => M.value ? M.value.length <= 40 ? M.value : `${M.value.slice(0, 37)}…` : ""), ae = w(() => {
      var f, R, V;
      const ee = [];
      return (f = p.delivery) != null && f.priority && ee.push(`Priority: ${p.delivery.priority}`), typeof ((R = p.delivery) == null ? void 0 : R.ttl) == "number" && ee.push(`TTL: ${p.delivery.ttl}s`), (V = p.delivery) != null && V.silent_push && ee.push("Silent push"), ee;
    }), ye = w(() => {
      var oe;
      const ee = (oe = I.value) == null ? void 0 : oe.location;
      if (!ee || ee.lat == null && ee.lon == null) return null;
      const f = Number(ee.lat) || 0, R = Number(ee.lon) || 0, V = 8e-3, fe = [R - V, f - V, R + V, f + V].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(fe)}&layer=mapnik&marker=${f},${R}`;
    }), xe = w(() => {
      var f;
      const ee = (f = I.value) == null ? void 0 : f.location;
      return ee && (ee.lat != null || ee.lon != null || ee.name || ee.address);
    });
    return (ee, f) => {
      var R, V, fe, oe, A, W, h, ie, ke, ve, _e, E, Q, J, $e, be;
      return a(), n("div", hl, [
        e("div", gl, [
          e("label", fl, [
            f[6] || (f[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            i.selectedPlatform === "android" ? je((a(), n("select", {
              key: 0,
              "onUpdate:modelValue": f[0] || (f[0] = (he) => m.value = he),
              class: "kb-preview__mode-select"
            }, [...f[3] || (f[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ke, m.value]
            ]) : i.selectedPlatform === "ios" ? je((a(), n("select", {
              key: 1,
              "onUpdate:modelValue": f[1] || (f[1] = (he) => b.value = he),
              class: "kb-preview__mode-select"
            }, [...f[4] || (f[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ke, b.value]
            ]) : je((a(), n("select", {
              key: 2,
              "onUpdate:modelValue": f[2] || (f[2] = (he) => k.value = he),
              class: "kb-preview__mode-select"
            }, [...f[5] || (f[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ke, k.value]
            ])
          ]),
          e("div", kl, [
            (a(!0), n(U, null, D(ae.value, (he) => (a(), n("span", {
              key: he,
              class: "kb-preview__badge"
            }, c(he), 1))), 128))
          ])
        ]),
        i.selectedPlatform === "android" ? (a(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: we(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${m.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          f[9] || (f[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: we(["kb-android-notification", { "kb-android-notification--expanded": C.value }])
          }, [
            f[8] || (f[8] = tt('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: we(["kb-android-body", { "kb-android-body--expanded": C.value }])
            }, [
              C.value && I.value.imageUrl ? (a(), n("div", _l, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, wl)
              ])) : y("", !0),
              e("div", $l, [
                e("div", xl, [
                  le.value ? (a(), n("div", Cl, c(le.value), 1)) : y("", !0),
                  pe.value ? (a(), n("div", Sl, c(pe.value), 1)) : y("", !0),
                  xe.value && !C.value && ((R = I.value.location) != null && R.name || (V = I.value.location) != null && V.address) ? (a(), n("div", Il, [
                    f[7] || (f[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    F(" " + c(((fe = I.value.location) == null ? void 0 : fe.name) || ((oe = I.value.location) == null ? void 0 : oe.address)), 1)
                  ])) : y("", !0),
                  M.value ? (a(), n("div", {
                    key: 3,
                    class: we(["kb-preview-link", { "kb-preview-link--invalid": !K.value }])
                  }, c(K.value ? X.value : "Invalid deep link format"), 3)) : y("", !0)
                ]),
                !C.value && I.value.imageUrl ? (a(), n("div", Tl, [
                  e("img", {
                    src: I.value.imageUrl,
                    alt: ""
                  }, null, 8, Al)
                ])) : y("", !0)
              ]),
              xe.value && ye.value && C.value ? (a(), n("div", Ul, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Rl),
                (A = I.value.location) != null && A.name || (W = I.value.location) != null && W.address ? (a(), n("div", El, c(((h = I.value.location) == null ? void 0 : h.name) || ((ie = I.value.location) == null ? void 0 : ie.address)), 1)) : y("", !0)
              ])) : y("", !0),
              q.value.length ? (a(), n("div", Pl, [
                (a(!0), n(U, null, D(q.value, (he) => (a(), n("button", {
                  key: he.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, c(he.label || "Action"), 1))), 128))
              ])) : y("", !0),
              me.value > 0 ? (a(), n("p", Bl, " Showing " + c(q.value.length) + " of " + c(se.value.length) + " actions on " + c(i.selectedPlatform) + ". ", 1)) : y("", !0)
            ], 2)
          ], 2)
        ], 2)) : i.selectedPlatform === "ios" ? (a(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: we(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${b.value}`]),
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
              le.value ? (a(), n("div", Nl, c(le.value), 1)) : y("", !0),
              pe.value ? (a(), n("div", Ml, c(pe.value), 1)) : y("", !0),
              M.value ? (a(), n("div", {
                key: 2,
                class: we(["kb-preview-link", { "kb-preview-link--invalid": !K.value }])
              }, c(K.value ? X.value : "Invalid deep link format"), 3)) : y("", !0),
              xe.value && ye.value ? (a(), n("div", Vl, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Dl),
                (ke = I.value.location) != null && ke.name || (ve = I.value.location) != null && ve.address ? (a(), n("div", jl, c(((_e = I.value.location) == null ? void 0 : _e.name) || ((E = I.value.location) == null ? void 0 : E.address)), 1)) : y("", !0)
              ])) : y("", !0),
              q.value.length ? (a(), n("div", Hl, [
                (a(!0), n(U, null, D(q.value, (he) => (a(), n("button", {
                  key: he.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, c(he.label || "Action"), 1))), 128))
              ])) : y("", !0),
              me.value > 0 ? (a(), n("p", Wl, " Showing " + c(q.value.length) + " of " + c(se.value.length) + " actions on " + c(i.selectedPlatform) + ". ", 1)) : y("", !0)
            ]),
            I.value.imageUrl ? (a(), n("div", ql, [
              e("img", {
                src: I.value.imageUrl,
                alt: ""
              }, null, 8, Fl)
            ])) : y("", !0)
          ])
        ], 2)) : (a(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: we(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${k.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          f[14] || (f[14] = tt('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", zl, [
            f[13] || (f[13] = tt('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", Yl, [
              le.value ? (a(), n("div", Kl, c(le.value), 1)) : y("", !0),
              pe.value ? (a(), n("div", Gl, c(pe.value), 1)) : y("", !0),
              M.value ? (a(), n("div", {
                key: 2,
                class: we(["kb-preview-link", { "kb-preview-link--invalid": !K.value }])
              }, c(K.value ? X.value : "Invalid deep link format"), 3)) : y("", !0),
              I.value.imageUrl ? (a(), n("div", Jl, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, Ql)
              ])) : y("", !0),
              xe.value && ye.value ? (a(), n("div", Xl, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Zl),
                (Q = I.value.location) != null && Q.name || (J = I.value.location) != null && J.address ? (a(), n("div", eo, c((($e = I.value.location) == null ? void 0 : $e.name) || ((be = I.value.location) == null ? void 0 : be.address)), 1)) : y("", !0)
              ])) : y("", !0)
            ]),
            q.value.length ? (a(), n("div", to, [
              (a(!0), n(U, null, D(q.value, (he, Ue) => (a(), n("button", {
                key: he.id || Ue,
                type: "button",
                class: we(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Ue) > 0 }])
              }, c(he.label || "Action"), 3))), 128))
            ])) : y("", !0),
            me.value > 0 ? (a(), n("p", ao, " Showing " + c(q.value.length) + " of " + c(se.value.length) + " actions on " + c(i.selectedPlatform) + ". ", 1)) : y("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), so = /* @__PURE__ */ Be(no, [["__scopeId", "data-v-4fc616d9"]]), lo = { class: "kb-version-dialog" }, oo = {
  key: 0,
  class: "kb-version-empty"
}, io = {
  key: 1,
  class: "kb-version-list"
}, ro = { class: "kb-version-item-label" }, uo = ["onClick"], co = { class: "kb-version-actions" }, po = /* @__PURE__ */ Ee({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(i, { emit: p }) {
    const m = p;
    function b(k) {
      try {
        return new Date(k).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return k;
      }
    }
    return (k, C) => i.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: C[1] || (C[1] = aa((T) => m("close"), ["escape"]))
    }, [
      e("div", lo, [
        C[2] || (C[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        C[3] || (C[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        i.versions.length === 0 ? (a(), n("div", oo, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", io, [
          (a(!0), n(U, null, D(i.versions, (T) => (a(), n("li", {
            key: T.id,
            class: "kb-version-item"
          }, [
            e("span", ro, c(T.label || b(T.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (I) => {
                m("restore", T.snapshot), m("close");
              }
            }, " Restore ", 8, uo)
          ]))), 128))
        ])),
        e("div", co, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: C[0] || (C[0] = (T) => m("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : y("", !0);
  }
}), Jt = /* @__PURE__ */ Be(po, [["__scopeId", "data-v-ce35a513"]]), Ut = [
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
          { id: "btn_1", label: "Track order", type: "url", url: "https://example.com/orders/{{1}}", url_example: "https://example.com/orders/ORD-12345" },
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
          { id: "btn_1", label: "Download again", type: "url", url: "https://example.com/receipt/{{1}}", url_example: "https://example.com/receipt/ORD-12345" },
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
], vo = { class: "keos-notification-builder" }, bo = { class: "kb-builder-top" }, yo = { class: "kb-push-layout" }, ho = { class: "kb-push-sidebar" }, go = {
  key: 0,
  class: "kb-push-form"
}, fo = {
  key: 0,
  class: "kb-hint-card"
}, ko = { class: "kb-push-form-head" }, _o = { class: "kb-push-form-head-top" }, wo = { class: "kb-push-health-pill" }, $o = { class: "kb-push-form-head-row" }, xo = ["value"], Co = { class: "kb-push-health" }, So = { class: "kb-push-health-row" }, Io = { class: "kb-push-health-value" }, To = { class: "kb-push-health-bar" }, Ao = {
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
}, Do = { class: "kb-push-actions" }, jo = {
  key: 0,
  class: "kb-actions-note"
}, Ho = { key: 0 }, Wo = { class: "kb-push-actions-right" }, qo = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Fo = { class: "kb-confirm-dialog" }, zo = { class: "kb-confirm-actions" }, Yo = /* @__PURE__ */ Ee({
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
    const m = i, b = p, k = ue("android"), C = ue(""), T = ue(!1), I = ue(null), L = ue(!1), P = w(
      () => N.value.workflow_status ?? "draft"
    ), G = w(() => {
      const s = C.value;
      return s ? Ze.find((o) => o.id === s) ?? null : null;
    });
    function te(s) {
      const o = N.value, g = s.campaign.message ? { ...o.message, ...s.campaign.message } : o.message, v = s.campaign.delivery ? { ...o.delivery, ...s.campaign.delivery } : o.delivery;
      M({
        ...s.campaign,
        message: g,
        delivery: v
      }), I.value = null, T.value = !1;
    }
    function le(s) {
      const o = s.target.value;
      if (!o) return;
      const g = Ut.find((v) => v.id === o);
      g && (se.value ? (I.value = g, T.value = !0) : te(g), s.target.value = "");
    }
    function pe(s) {
      N.value = s, L.value = !1;
    }
    const {
      campaign: N,
      dirty: se,
      customValidatorErrors: q,
      getValidationWithWarnings: me,
      update: M,
      updateMessage: K,
      updateDelivery: X,
      undo: ae,
      redo: ye,
      canUndo: xe,
      canRedo: ee,
      resetMessage: f,
      resetDelivery: R,
      getPreview: V,
      characterLimits: fe,
      hooks: oe
    } = ct({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (s) => {
          var v, j, S, O;
          const o = [];
          (v = s.name) != null && v.trim() || o.push("Template name is required"), (S = (j = s.message) == null ? void 0 : j.body) != null && S.trim() || o.push("Message body is required");
          const g = (O = m.hooks) != null && O.customValidators ? await m.hooks.customValidators(s) : [];
          return [...o, ...g];
        }
      },
      onDirty: () => b("change", N.value)
    }), { lastSavedAt: A } = pt(N, { channel: "push" });
    function W(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ye() : ae());
    }
    st(() => {
      window.addEventListener("keydown", W);
    }), lt(() => {
      window.removeEventListener("keydown", W);
    }), Le(N, (s) => b("update:modelValue", s), { deep: !0 });
    const h = ue(), ie = ue(!0), ke = ue(!0);
    async function ve() {
      if (oe.estimateReach)
        try {
          h.value = await oe.estimateReach(N.value.audience);
        } catch {
          h.value = void 0;
        }
      oe.canSend && (ie.value = await Promise.resolve(oe.canSend())), oe.canSchedule && (ke.value = await Promise.resolve(oe.canSchedule()));
    }
    ve(), Le(() => N.value.audience, ve, { deep: !0 });
    const _e = w(() => (q.value, me(h.value))), E = w(() => _e.value.blockingErrors), Q = w(() => _e.value.warnings), J = w(() => _e.value.valid), $e = w(() => {
      var v, j, S;
      const s = N.value.message, o = [
        !!((v = N.value.name) != null && v.trim()),
        !!((j = s.title) != null && j.trim()),
        !!((S = s.body) != null && S.trim()),
        !!(s.template_type ?? N.value.template_type),
        Array.isArray(s.actions) ? s.actions.length > 0 : !1
      ], g = o.filter(Boolean).length;
      return Math.round(g / o.length * 100);
    }), be = w(() => $e.value >= 90 ? "Production ready" : $e.value >= 70 ? "Strong draft" : $e.value >= 40 ? "In progress" : "Needs setup"), he = w(() => {
      const s = N.value.message;
      return !!((s.title ?? "").toString().trim() || (s.body ?? "").toString().trim() || Array.isArray(s.actions) && s.actions.length);
    }), Ue = w(
      () => fe[k.value].title
    ), de = w(() => fe[k.value].body), Pe = w(() => N.value.message.title.length), Ne = w(() => N.value.message.body.length), qe = w(() => {
      if (Pe.value > Ue.value)
        return `Title exceeds ${Ue.value} characters for ${k.value}.`;
    }), Me = w(() => {
      const s = E.value.find(
        (o) => o.message === "Message body is required"
      );
      if (s) return s.message;
      if (Ne.value > de.value)
        return `Body exceeds ${de} characters for ${k.value}.`;
    }), He = w(
      () => N.value.template_type ?? "transactional"
    );
    function Re(s) {
      M({ template_type: s });
    }
    function We(s) {
      M({
        name: s,
        tracking: { ...N.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Ve(s) {
      const o = ` {{ .${s.variable} }}`, g = N.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, s.variable]));
      s.field === "title" ? K({
        title: N.value.message.title + o,
        variables: v
      }) : K({
        body: N.value.message.body + o,
        variables: v
      });
    }
    function re() {
      J.value && b("save", N.value);
    }
    return (s, o) => {
      var g;
      return a(), n("div", vo, [
        e("div", bo, [
          Oe(mt, {
            "campaign-name": $(N).name,
            status: $(N).status,
            dirty: $(se),
            "last-saved-at": $(A),
            "can-undo": $(xe),
            "can-redo": $(ee),
            "workflow-status": P.value,
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": We,
            "onUpdate:workflowStatus": o[0] || (o[0] = (v) => $(M)({ workflow_status: v })),
            onUndo: $(ae),
            onRedo: $(ye)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          E.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: $(Ae).dangerBg,
              border: `1px solid ${$(Ae).dangerBorder}`,
              borderRadius: `${$(Qe).input}px`,
              padding: `${$(Ce)[12]}px ${$(Ce)[16]}px`,
              marginBottom: `${$(Ce)[16]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: $(Ae).danger })
            }, [
              (a(!0), n(U, null, D(E.value, (v) => (a(), n("li", {
                key: v.message
              }, c(v.message), 1))), 128))
            ], 4)
          ], 4)) : y("", !0)
        ]),
        e("div", yo, [
          e("aside", ho, [
            i.disabledSections.includes("message") ? y("", !0) : (a(), n("div", go, [
              !$(N).message.title && !$(N).message.body ? (a(), n("div", fo, " Add a title and message below to get started. ")) : y("", !0),
              e("div", ko, [
                e("div", _o, [
                  o[12] || (o[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", wo, c(be.value), 1)
                ]),
                e("div", $o, [
                  Oe(_t, {
                    "template-type": He.value,
                    onUpdate: Re
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: le
                  }, [
                    o[13] || (o[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, D($(Ut), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, xo))), 128))
                  ], 32)
                ]),
                e("div", Co, [
                  e("div", So, [
                    o[14] || (o[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", Io, c($e.value) + "%", 1)
                  ]),
                  e("div", To, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: Se({ width: `${$e.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(_s, {
                message: $(N).message,
                "title-count": Pe.value,
                "body-count": Ne.value,
                "title-limit": Ue.value,
                "body-limit": de.value,
                "selected-platform": k.value,
                "show-reset": !0,
                "title-error": qe.value,
                "body-error": Me.value,
                onUpdate: $(K),
                onReset: o[1] || (o[1] = (v) => $(f)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Oe(Gt, {
                message: $(N).message,
                "variable-options": i.variableOptions,
                onUpdate: $(K),
                onInsertVariable: Ve
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !i.designOnly && !i.disabledSections.includes("delivery") ? (a(), n("div", Ao, [
              o[15] || (o[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Oe(il, {
                delivery: $(N).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: $(X),
                onReset: o[2] || (o[2] = (v) => $(R)())
              }, null, 8, ["delivery", "onUpdate"]),
              Oe(yl, {
                delivery: $(N).delivery,
                onUpdate: $(X)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : y("", !0)
          ]),
          e("main", Uo, [
            !i.designOnly && $(N).audience.test_mode ? (a(), n("div", Ro, [...o[16] || (o[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : y("", !0),
            e("div", Eo, [
              e("div", Po, [
                e("label", Bo, [
                  o[18] || (o[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": o[3] || (o[3] = (v) => C.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[17] || (o[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, D($(Ze), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Lo))), 128))
                  ], 512), [
                    [Ke, C.value]
                  ])
                ]),
                e("div", Oo, [
                  o[19] || (o[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, c(k.value), 1)
                ])
              ]),
              e("div", No, [
                (a(), n(U, null, D(["android", "ios", "web"], (v) => e("button", {
                  key: v,
                  type: "button",
                  class: we(["kb-push-device-btn", { "kb-push-device-btn--active": k.value === v }]),
                  role: "tab",
                  "aria-selected": k.value === v,
                  "aria-controls": `kb-preview-panel-${v}`,
                  onClick: (j) => k.value = v
                }, c(v.toUpperCase()), 11, Mo)), 64))
              ]),
              e("div", {
                class: we(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !he.value }])
              }, [
                !$(N).message.title && !$(N).message.body ? (a(), n("div", Vo, [...o[20] || (o[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), na(so, {
                  key: 1,
                  "get-preview": $(V),
                  "selected-platform": k.value,
                  "preview-profile": G.value,
                  message: $(N).message,
                  delivery: $(N).delivery,
                  "onUpdate:selectedPlatform": o[4] || (o[4] = (v) => k.value = v)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Do, [
          Q.value.length > 0 ? (a(), n("div", jo, [
            o[21] || (o[21] = e("strong", null, "Warning:", -1)),
            F(" " + c((g = Q.value[0]) == null ? void 0 : g.message) + " ", 1),
            Q.value.length > 1 ? (a(), n("span", Ho, " (+" + c(Q.value.length - 1) + " more) ", 1)) : y("", !0)
          ])) : y("", !0),
          e("div", Wo, [
            !i.designOnly && i.showHistory ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[5] || (o[5] = (v) => L.value = !0)
            }, " Version history ")) : y("", !0),
            !i.designOnly && i.showSaveVersion ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[6] || (o[6] = (v) => b("save-version", JSON.parse(JSON.stringify($(N)))))
            }, " Save as version ")) : y("", !0),
            i.showDuplicate ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[7] || (o[7] = (v) => b("duplicate", JSON.parse(JSON.stringify($(N)))))
            }, " Duplicate ")) : y("", !0),
            i.showSave ? (a(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: re
            }, " Save ")) : y("", !0),
            i.showClose ? (a(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: o[8] || (o[8] = (v) => b("edit"))
            }, " Close ")) : y("", !0)
          ])
        ]),
        T.value ? (a(), n("div", qo, [
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
                  T.value = !1, I.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: o[10] || (o[10] = (v) => I.value && te(I.value))
              }, " Replace ")
            ])
          ])
        ])) : y("", !0),
        Oe(Jt, {
          open: L.value,
          versions: i.versions,
          onClose: o[11] || (o[11] = (v) => L.value = !1),
          onRestore: pe
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Qt = /* @__PURE__ */ Be(Yo, [["__scopeId", "data-v-18771e1a"]]), Ko = { class: "kb-section" }, Go = { class: "kb-section__head" }, Jo = { class: "kb-summary-bar" }, Qo = { class: "kb-pill kb-pill--category" }, Xo = { class: "kb-pill kb-pill--format" }, Zo = { class: "kb-pill kb-pill--status" }, ei = { class: "kb-setup-group" }, ti = { class: "kb-field" }, ai = ["value"], ni = ["value", "disabled"], si = {
  key: 0,
  class: "kb-field"
}, li = ["value"], oi = ["value"], ii = { class: "kb-helper" }, ri = { class: "kb-field" }, ui = ["value"], di = { class: "kb-field kb-field--inline kb-field--language-limits" }, ci = { class: "kb-field-half" }, pi = ["value"], mi = { class: "kb-field-half" }, vi = { class: "kb-meta-card" }, bi = { class: "kb-meta-list" }, yi = { class: "kb-field" }, hi = ["value"], gi = { class: "kb-field kb-field--toggles" }, fi = { class: "kb-toggle-row" }, ki = ["checked"], _i = {
  key: 0,
  class: "kb-toggle-row"
}, wi = ["checked"], $i = {
  key: 0,
  class: "kb-field"
}, xi = { class: "kb-wa-buttons" }, Ci = { class: "kb-carousel-card__head" }, Si = { class: "kb-carousel-card__num" }, Ii = ["onClick"], Ti = { class: "kb-field-inline-2" }, Ai = ["value", "onChange"], Ui = ["value", "onInput"], Ri = ["value", "onInput"], Ei = ["value", "onInput"], Pi = { class: "kb-carousel-card__btns" }, Bi = ["value", "onInput"], Li = ["value", "onChange"], Oi = ["value", "onInput"], Ni = ["value", "onInput"], Mi = ["onClick"], Vi = ["disabled", "onClick"], Di = ["disabled"], ji = {
  key: 1,
  class: "kb-field"
}, Hi = ["value"], Wi = ["value"], qi = {
  key: 2,
  class: "kb-field"
}, Fi = ["value"], zi = {
  key: 3,
  class: "kb-field"
}, Yi = { class: "kb-wa-buttons" }, Ki = ["value", "onInput"], Gi = ["value", "onInput"], Ji = ["onClick"], Qi = {
  key: 0,
  class: "kb-comp kb-comp--header"
}, Xi = { class: "kb-comp__body" }, Zi = { class: "kb-field-no-border" }, er = { class: "kb-header-type-grid" }, tr = ["onClick"], ar = { class: "kb-header-type-btn__label" }, nr = {
  key: 0,
  class: "kb-helper"
}, sr = {
  key: 0,
  class: "kb-field-no-border",
  style: { "margin-top": "0.7rem" }
}, lr = { class: "kb-label" }, or = { class: "kb-input-with-var" }, ir = ["value"], rr = { class: "kb-var-picker-wrap" }, ur = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, dr = ["onClick"], cr = {
  key: 1,
  style: { "margin-top": "0.7rem", display: "flex", "flex-direction": "column", gap: "0.6rem" }
}, pr = ["value"], mr = ["value"], vr = { class: "kb-mu" }, br = { class: "kb-mu__text kb-mu__text--file" }, yr = { class: "kb-mu__size" }, hr = { class: "kb-mu__text kb-mu__text--hint" }, gr = { class: "kb-mu__right" }, fr = ["disabled"], kr = {
  key: 0,
  class: "kb-mu__spinner"
}, _r = {
  key: 0,
  class: "kb-mu__error"
}, wr = { key: 0 }, $r = ["value"], xr = {
  key: 2,
  class: "kb-comp__note kb-comp__note--info",
  style: { "margin-top": "0.7rem" }
}, Cr = { class: "kb-comp kb-comp--body" }, Sr = { class: "kb-comp__head" }, Ir = {
  key: 0,
  class: "kb-comp__meta"
}, Tr = {
  key: 1,
  class: "kb-comp__meta kb-comp__meta--preset"
}, Ar = { class: "kb-comp__body" }, Ur = { class: "kb-comp__note kb-comp__note--auth" }, Rr = { class: "kb-auth-preview" }, Er = { style: { display: "flex", "flex-direction": "column", gap: "0.56rem", "margin-top": "0.7rem" } }, Pr = { class: "kb-toggle-row" }, Br = ["checked"], Lr = ["value"], Or = { class: "kb-field-no-border" }, Nr = { class: "kb-label" }, Mr = { class: "kb-input-with-var" }, Vr = ["value"], Dr = { class: "kb-var-picker-wrap" }, jr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Hr = ["onClick"], Wr = {
  class: "kb-field-no-border",
  style: { "margin-top": "0.6rem" }
}, qr = ["value"], Fr = {
  key: 0,
  class: "kb-field-no-border",
  style: { "margin-top": "0.5rem" }
}, zr = { class: "kb-wa-fields-list" }, Yr = { class: "kb-wa-field-name" }, Kr = { class: "kb-wa-field-status" }, Gr = {
  key: 1,
  class: "kb-comp kb-comp--footer"
}, Jr = { class: "kb-comp__body" }, Qr = { class: "kb-field-no-border" }, Xr = { class: "kb-label" }, Zr = ["value"], eu = { class: "kb-comp kb-comp--buttons" }, tu = { class: "kb-comp__head" }, au = {
  key: 0,
  class: "kb-comp__meta kb-comp__meta--required"
}, nu = {
  key: 1,
  class: "kb-comp__meta"
}, su = { class: "kb-comp__body" }, lu = {
  key: 0,
  class: "kb-comp__note kb-comp__note--warn",
  style: { "margin-bottom": "0.7rem" }
}, ou = {
  key: 1,
  class: "kb-comp__note kb-comp__note--info",
  style: { "margin-bottom": "0.7rem" }
}, iu = {
  key: 2,
  class: "kb-comp__note kb-comp__note--auth",
  style: { "margin-bottom": "0.7rem" }
}, ru = { class: "kb-wa-buttons" }, uu = {
  key: 0,
  class: "kb-input-with-var kb-input-with-var--btn"
}, du = ["value", "onInput"], cu = { class: "kb-var-picker-wrap" }, pu = ["onClick"], mu = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, vu = ["onClick"], bu = ["value", "onChange"], yu = ["value"], hu = ["value", "onInput"], gu = ["value", "onInput"], fu = ["value", "onInput"], ku = ["value", "onInput"], _u = {
  key: 4,
  class: "kb-opt-out-note"
}, wu = ["value", "onInput"], $u = ["value", "onChange"], xu = ["value", "onInput"], Cu = ["value", "onInput"], Su = ["value", "onInput"], Iu = ["onClick"], Tu = ["disabled"], Au = {
  key: 3,
  class: "kb-buttons-order-hint"
}, yt = 60, ot = 1024, it = 60, Uu = 10, Pt = 10, Ru = /* @__PURE__ */ Ee({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] },
    mediaUploadUrl: { default: void 0 },
    mediaUploadHeaders: { default: void 0 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    const m = i, b = p, k = [
      { value: "none", label: "None", hint: "No header component." },
      { value: "text", label: "Text", hint: "Bold heading above the body. Max 60 chars. Supports one {{1}} variable." },
      { value: "image", label: "Image", hint: "JPEG or PNG. Max 5 MB. Cropped to 1.91:1 in chat." },
      { value: "video", label: "Video", hint: "MP4 only (H.264 + AAC). Max 16 MB." },
      { value: "document", label: "Document", hint: "PDF only. Max 100 MB. Set a filename at send time." },
      { value: "location", label: "Location pin", hint: "Map pin injected at send time. No media upload needed." }
    ], C = [
      { value: "standard", label: "Standard", hint: "Standard HEADER + BODY + FOOTER + BUTTONS structure." },
      { value: "carousel", label: "Carousel", hint: "Up to 10 cards with media + body + buttons. MARKETING only." },
      { value: "flow", label: "WhatsApp Flow", hint: "Launches a multi-step in-chat flow." },
      { value: "lto", label: "Limited-time offer", hint: "Adds offer-expiry urgency. MARKETING only." },
      { value: "catalog", label: "Catalog", hint: "Opens the WhatsApp catalog. MARKETING only." },
      { value: "mpm", label: "Multi-product", hint: "Multiple products in one message. MARKETING only." }
    ], T = {
      marketing: ["standard", "carousel", "flow", "lto", "catalog", "mpm"],
      utility: ["standard", "flow"],
      authentication: []
    }, I = {
      marketing: ["quick_reply", "url", "call", "copy_code", "opt_out"],
      utility: ["quick_reply", "url", "call"],
      authentication: ["otp"]
    }, L = [
      { value: "quick_reply", label: "Quick reply" },
      { value: "url", label: "Visit URL" },
      { value: "call", label: "Call phone" },
      { value: "copy_code", label: "Copy coupon code" },
      { value: "opt_out", label: "Marketing opt-out" },
      { value: "otp", label: "OTP (auth only)" }
    ], P = w(() => m.message), G = w(() => String(P.value.template_type ?? "text").trim()), te = w(() => String(P.value.template_category ?? "marketing").trim()), le = w(() => String(P.value.header_type ?? "none").trim()), pe = w(() => String(P.value.header ?? "")), N = w(() => String(P.value.body ?? "")), se = w(() => String(P.value.footer ?? "")), q = w(() => P.value.buttons ?? []), me = w(() => P.value.products ?? []), M = w(() => P.value.cards ?? []), K = w(() => te.value === "authentication"), X = w(() => {
      const _ = G.value;
      return ["carousel", "flow", "lto", "catalog", "mpm"].includes(_) ? _ : "standard";
    }), ae = w(() => X.value !== "standard"), ye = w(() => {
      const _ = new Set(T[te.value] ?? T.marketing), u = new Set((m.disabledFormats ?? []).map((B) => String(B).trim()));
      return C.filter((B) => _.has(B.value) && !u.has(B.value));
    }), xe = w(() => {
      const _ = new Set((m.disabledFormats ?? []).map((u) => String(u).trim()));
      return k.filter((u) => !_.has(u.value));
    }), ee = w(() => {
      const _ = new Set(I[te.value] ?? I.marketing);
      return L.filter((u) => _.has(u.value));
    }), f = w(() => K.value ? 1 : Uu), R = w(() => {
      const _ = q.value.some((B) => B.type === "quick_reply" || B.type === "opt_out"), u = q.value.some((B) => ["url", "call", "copy_code"].includes(B.type));
      return _ && u;
    }), V = w(() => {
      const _ = te.value;
      return _ ? _.charAt(0).toUpperCase() + _.slice(1) : "Uncategorized";
    }), fe = w(() => {
      var u;
      if (K.value) return "Authentication OTP";
      if (X.value !== "standard")
        return ((u = C.find((B) => B.value === X.value)) == null ? void 0 : u.label) ?? "Standard";
      const _ = k.find((B) => B.value === le.value);
      return _ && _.value !== "none" ? `${_.label} header` : "Text only";
    }), oe = w(() => P.value.template_name ? !K.value && !N.value.trim() ? "Draft" : "Ready to validate" : "Needs setup"), A = w(() => {
      const _ = ["{{OTP}} is your verification code."];
      return P.value.add_security_recommendation && _.push("For your security, do not share this code."), P.value.code_expiration_minutes && _.push(`This code expires in ${P.value.code_expiration_minutes} minutes.`), _.join(" ");
    });
    function W(_) {
      if (!_ || typeof _ != "string") return [];
      const u = /\{\{\s*([^}]+?)\s*\}\}/g, B = /* @__PURE__ */ new Set();
      let ne;
      for (; (ne = u.exec(_)) !== null; ) B.add(ne[1].trim());
      return Array.from(B);
    }
    const h = w(() => {
      const _ = m.message.header ?? "", u = m.message.body ?? m.message.body ?? "", B = new Set(m.message.variables ?? []);
      return Array.from(/* @__PURE__ */ new Set([...W(_), ...W(u)])).map((r) => ({ name: r, configured: B.has(r) }));
    }), ie = [
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
    ], ke = w(() => {
      const _ = (m.message.variables ?? []).filter(Boolean);
      return _.length ? Array.from(new Set(_)) : ie;
    }), ve = ue(null), _e = ue(null), E = ue(null), Q = ue("idle"), J = ue(""), $e = ue(!1);
    function be(_) {
      var B;
      const u = _.target;
      E.value = ((B = u.files) == null ? void 0 : B[0]) ?? null, Q.value = "idle", J.value = "";
    }
    function he(_) {
      var B, ne;
      $e.value = !1;
      const u = ((ne = (B = _.dataTransfer) == null ? void 0 : B.files) == null ? void 0 : ne[0]) ?? null;
      u && (E.value = u, Q.value = "idle", J.value = "");
    }
    async function Ue() {
      if (!(!E.value || !m.mediaUploadUrl)) {
        Q.value = "uploading", J.value = "";
        try {
          const _ = new FormData();
          _.append("file", E.value);
          const u = await fetch(m.mediaUploadUrl, {
            method: "POST",
            headers: m.mediaUploadHeaders ?? {},
            body: _
          });
          if (!u.ok) {
            const r = await u.text().catch(() => u.statusText);
            throw new Error(`${u.status}: ${r}`);
          }
          const B = await u.json(), ne = B.mediaId ?? B.media_id ?? B.handle ?? B.id;
          if (!ne) throw new Error(`No mediaId in response: ${JSON.stringify(B)}`);
          de({ media_handle: ne }), Q.value = "done", E.value = null, _e.value && (_e.value.value = "");
        } catch (_) {
          Q.value = "error", J.value = _ instanceof Error ? _.message : String(_);
        }
      }
    }
    function de(_) {
      b("update", _);
    }
    function Pe(_) {
      ve.value = ve.value === _ ? null : _;
    }
    function Ne(_, u) {
      var l;
      const B = ` {{ .${u} }}`, ne = (m.message.variables ?? []).filter(Boolean), r = Array.from(/* @__PURE__ */ new Set([...ne, u]));
      if (_ === "header")
        de({ header: `${pe.value || ""}${B}`, variables: r });
      else if (_ === "body")
        de({ body: `${N.value || ""}${B}`, variables: r });
      else if (_.startsWith("btn-label:")) {
        const t = Number(_.split(":")[1]);
        Number.isFinite(t) && Re(t, { label: `${String(((l = q.value[t]) == null ? void 0 : l.label) ?? "")}${B}` }), de({ variables: r });
      }
      ve.value = null;
    }
    function qe(_) {
      const u = { template_category: _ || void 0 };
      if (_ === "authentication") {
        u.template_type = "auth", u.header_type = void 0, u.header = void 0, u.footer = void 0, u.allow_category_change = void 0, u.media_url = void 0, u.media_handle = void 0, u.media_caption = void 0, u.document_filename = void 0;
        const B = q.value.filter((ne) => (ne.type ?? "quick_reply") === "otp");
        u.buttons = B;
      } else {
        G.value === "auth" && (u.template_type = "text");
        const B = new Set(I[_] ?? I.marketing), ne = q.value.filter((l) => B.has(l.type ?? "quick_reply"));
        ne.length !== q.value.length && (u.buttons = ne), new Set(T[_] ?? T.marketing).has(X.value) || (u.template_type = "text");
      }
      de(u);
    }
    function Me(_) {
      const u = {};
      if (_ === "standard") {
        const B = le.value;
        u.template_type = ["image", "video", "document"].includes(B) ? B : "text";
      } else
        u.template_type = _, _ === "carousel" && (u.header_type = void 0, u.header = void 0, u.footer = void 0);
      de(u);
    }
    function He(_) {
      const u = { header_type: _ };
      _ === "image" || _ === "video" || _ === "document" ? u.template_type = _ : u.template_type = "text", ["image", "video", "document"].includes(_) || (u.media_url = void 0, u.media_handle = void 0, u.media_caption = void 0, u.document_filename = void 0), _ !== "text" && (u.header = void 0), de(u);
    }
    function Re(_, u) {
      var ne;
      const B = [...q.value];
      B[_] = { ...B[_], id: ((ne = B[_]) == null ? void 0 : ne.id) || `btn_${_ + 1}`, ...u }, de({ buttons: B });
    }
    function We(_) {
      const u = [...q.value];
      u.splice(_, 1), de({ buttons: u });
    }
    function Ve() {
      var B;
      if (q.value.length >= f.value) return;
      const _ = ((B = ee.value[0]) == null ? void 0 : B.value) ?? "quick_reply", u = [...q.value];
      u.push({ id: `btn_${u.length + 1}`, label: "", type: _ }), de({ buttons: u });
    }
    function re(_, u) {
      var ne;
      const B = [...me.value];
      B[_] = { ...B[_], id: ((ne = B[_]) == null ? void 0 : ne.id) || `prod_${_ + 1}`, ...u }, de({ products: B });
    }
    function s(_) {
      const u = [...me.value];
      u.splice(_, 1), de({ products: u });
    }
    function o() {
      const _ = [...me.value];
      _.push({ id: `prod_${_.length + 1}`, productId: "" }), de({ products: _ });
    }
    function g(_, u) {
      var ne;
      const B = [...M.value];
      B[_] = { ...B[_], id: ((ne = B[_]) == null ? void 0 : ne.id) || `card_${_ + 1}`, ...u }, de({ cards: B });
    }
    function v(_) {
      const u = [...M.value];
      u.splice(_, 1), de({ cards: u });
    }
    function j() {
      const _ = [...M.value];
      _.push({ id: `card_${_.length + 1}`, headerType: "IMAGE", mediaId: "", body: "", sampleText: "", buttons: [] }), de({ cards: _ });
    }
    function S(_) {
      const u = [...M.value], B = { ...u[_] };
      B.buttons = [...B.buttons ?? [], { type: "QUICK_REPLY", label: "" }], u[_] = B, de({ cards: u });
    }
    function O(_, u) {
      const B = [...M.value], ne = { ...B[_] };
      ne.buttons = [...ne.buttons ?? []], ne.buttons.splice(u, 1), B[_] = ne, de({ cards: B });
    }
    function Y(_, u, B) {
      const ne = [...M.value], r = { ...ne[_] };
      r.buttons = [...r.buttons ?? []], r.buttons[u] = { ...r.buttons[u], ...B }, ne[_] = r, de({ cards: ne });
    }
    return (_, u) => {
      var B, ne;
      return a(), n("section", Ko, [
        e("div", Go, [
          u[27] || (u[27] = e("h3", { class: "kb-section__title" }, "WhatsApp template", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: u[0] || (u[0] = (r) => _.$emit("reset"))
          }, " Reset ")) : y("", !0)
        ]),
        u[91] || (u[91] = e("p", { class: "kb-section__desc" }, " Build your template by configuring each component. Constraints are enforced per Gupshup's API rules. ", -1)),
        e("div", Jo, [
          e("span", Qo, c(V.value), 1),
          e("span", Xo, c(fe.value), 1),
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
              value: P.value.template_category ?? "",
              onChange: u[1] || (u[1] = (r) => qe(r.target.value))
            }, [
              u[28] || (u[28] = e("option", { value: "" }, "Select category", -1)),
              (a(), n(U, null, D([{ value: "marketing", label: "Marketing" }, { value: "utility", label: "Utility" }, { value: "authentication", label: "Authentication" }], (r) => e("option", {
                key: r.value,
                value: r.value,
                disabled: new Set((i.disabledCategories ?? []).map((l) => String(l))).has(r.value)
              }, c(r.label) + c(new Set((i.disabledCategories ?? []).map((l) => String(l))).has(r.value) ? " (Disabled)" : ""), 9, ni)), 64))
            ], 40, ai)
          ]),
          !K.value && ye.value.length > 1 ? (a(), n("div", si, [
            u[30] || (u[30] = e("label", { class: "kb-label" }, [
              F(" Template variant "),
              e("span", { class: "kb-helper" }, "Standard uses the 4-component structure. Special types have their own configuration.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: X.value,
              onChange: u[2] || (u[2] = (r) => Me(r.target.value))
            }, [
              (a(!0), n(U, null, D(ye.value, (r) => (a(), n("option", {
                key: r.value,
                value: r.value
              }, c(r.label), 9, oi))), 128))
            ], 40, li),
            e("span", ii, c((B = C.find((r) => r.value === X.value)) == null ? void 0 : B.hint), 1)
          ])) : y("", !0),
          e("div", ri, [
            u[31] || (u[31] = e("label", { class: "kb-label" }, [
              F(" Template name "),
              e("span", { class: "kb-helper" }, "Auto-synced from campaign name. Must be lowercase with underscores.")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              value: P.value.template_name ?? "",
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
                value: P.value.template_language ?? "",
                onInput: u[3] || (u[3] = (r) => de({ template_language: r.target.value || void 0 }))
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
              value: P.value.vertical ?? "",
              onInput: u[4] || (u[4] = (r) => de({ vertical: r.target.value || void 0 }))
            }, null, 40, hi)
          ]),
          e("div", gi, [
            u[37] || (u[37] = e("label", { class: "kb-label" }, "Submission options", -1)),
            e("label", fi, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!P.value.enable_sample,
                onChange: u[5] || (u[5] = (r) => de({ enable_sample: r.target.checked || void 0 }))
              }, null, 40, ki),
              u[35] || (u[35] = e("span", { class: "kb-toggle-label" }, "Include sample data in Meta review", -1))
            ]),
            K.value ? y("", !0) : (a(), n("label", _i, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!P.value.allow_category_change,
                onChange: u[6] || (u[6] = (r) => de({ allow_category_change: r.target.checked || void 0 }))
              }, null, 40, wi),
              u[36] || (u[36] = e("span", { class: "kb-toggle-label" }, "Allow Meta to re-categorize this template", -1))
            ]))
          ])
        ]),
        X.value === "carousel" ? (a(), n("div", $i, [
          e("label", { class: "kb-label" }, [
            u[38] || (u[38] = F(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "MARKETING only. Each card: IMAGE or VIDEO header + body + up to 2 buttons. All cards must use the same header type. Max " + c(Pt) + " cards.")
          ]),
          e("div", xi, [
            (a(!0), n(U, null, D(M.value, (r, l) => (a(), n("div", {
              key: r.id || l,
              class: "kb-carousel-card"
            }, [
              e("div", Ci, [
                e("span", Si, "Card " + c(l + 1), 1),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-remove",
                  onClick: (t) => v(Number(l))
                }, "Remove", 8, Ii)
              ]),
              e("div", Ti, [
                e("div", null, [
                  u[40] || (u[40] = e("label", { class: "kb-label kb-label--sm" }, "Header type", -1)),
                  e("select", {
                    class: "kb-select",
                    value: r.headerType ?? "IMAGE",
                    onChange: (t) => g(Number(l), { headerType: t.target.value })
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
                    value: r.mediaId ?? "",
                    onInput: (t) => g(Number(l), { mediaId: t.target.value })
                  }, null, 40, Ui)
                ])
              ]),
              e("div", null, [
                u[42] || (u[42] = e("label", { class: "kb-label kb-label--sm" }, "Card body", -1)),
                e("textarea", {
                  class: "kb-textarea",
                  rows: "2",
                  placeholder: "Card body text with {{1}} variables",
                  value: r.body ?? "",
                  onInput: (t) => g(Number(l), { body: t.target.value })
                }, null, 40, Ri)
              ]),
              e("div", null, [
                u[43] || (u[43] = e("label", { class: "kb-label kb-label--sm" }, "Sample body (body with real values for Meta approval)", -1)),
                e("textarea", {
                  class: "kb-textarea",
                  rows: "2",
                  placeholder: "Card body with all variables replaced by realistic values",
                  value: r.sampleText ?? "",
                  onInput: (t) => g(Number(l), { sampleText: t.target.value })
                }, null, 40, Ei)
              ]),
              e("div", Pi, [
                u[45] || (u[45] = e("label", { class: "kb-label kb-label--sm" }, "Card buttons (max 2)", -1)),
                (a(!0), n(U, null, D(r.buttons ?? [], (t, z) => (a(), n("div", {
                  key: z,
                  class: "kb-wa-button-row kb-wa-button-row--sm"
                }, [
                  e("input", {
                    type: "text",
                    class: "kb-input kb-input--btn-label",
                    placeholder: "Button label",
                    value: t.label ?? "",
                    onInput: (d) => Y(Number(l), Number(z), { label: d.target.value })
                  }, null, 40, Bi),
                  e("select", {
                    class: "kb-select kb-select--btn-type",
                    value: t.type ?? "QUICK_REPLY",
                    onChange: (d) => Y(Number(l), Number(z), { type: d.target.value })
                  }, [...u[44] || (u[44] = [
                    e("option", { value: "QUICK_REPLY" }, "Quick reply", -1),
                    e("option", { value: "URL" }, "Visit URL", -1)
                  ])], 40, Li),
                  t.type === "URL" ? (a(), n(U, { key: 0 }, [
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "https://example.com/shop?promo={{1}}",
                      value: t.url ?? "",
                      onInput: (d) => Y(Number(l), Number(z), { url: d.target.value })
                    }, null, 40, Oi),
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "Example URL with real value",
                      value: t.url_example ?? "",
                      onInput: (d) => Y(Number(l), Number(z), { url_example: d.target.value })
                    }, null, 40, Ni)
                  ], 64)) : y("", !0),
                  e("button", {
                    type: "button",
                    class: "kb-wa-btn-remove",
                    onClick: (d) => O(Number(l), Number(z))
                  }, "Remove", 8, Mi)
                ]))), 128)),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-add",
                  disabled: (r.buttons ?? []).length >= 2,
                  onClick: (t) => S(Number(l))
                }, " Add button ", 8, Vi)
              ])
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: M.value.length >= Pt,
              onClick: j
            }, " Add card ", 8, Di)
          ])
        ])) : y("", !0),
        X.value === "flow" ? (a(), n("div", ji, [
          u[46] || (u[46] = e("label", { class: "kb-label" }, [
            F(" WhatsApp Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: P.value.flow_id ?? "",
            onInput: u[7] || (u[7] = (r) => de({ flow_id: r.target.value || void 0 }))
          }, null, 40, Hi),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.44rem" },
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: P.value.flow_cta_label ?? "",
            onInput: u[8] || (u[8] = (r) => de({ flow_cta_label: r.target.value || void 0 }))
          }, null, 40, Wi)
        ])) : y("", !0),
        X.value === "lto" ? (a(), n("div", qi, [
          u[47] || (u[47] = e("label", { class: "kb-label" }, [
            F(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer expires.")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: P.value.lto_expiry ?? "",
            onInput: u[9] || (u[9] = (r) => de({ lto_expiry: r.target.value || void 0 }))
          }, null, 40, Fi)
        ])) : y("", !0),
        ["mpm", "catalog"].includes(X.value) ? (a(), n("div", zi, [
          u[48] || (u[48] = e("label", { class: "kb-label" }, [
            F(" Products "),
            e("span", { class: "kb-helper" }, "Add product identifiers in the order they should appear.")
          ], -1)),
          e("div", Yi, [
            (a(!0), n(U, null, D(me.value, (r, l) => (a(), n("div", {
              key: r.id || l,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: r.productId,
                onInput: (t) => re(Number(l), { productId: t.target.value })
              }, null, 40, Ki),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: r.sectionTitle,
                onInput: (t) => re(Number(l), { sectionTitle: t.target.value || void 0 })
              }, null, 40, Gi),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (t) => s(Number(l))
              }, "Remove", 8, Ji)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: o
            }, "Add product")
          ])
        ])) : y("", !0),
        ae.value ? y("", !0) : (a(), n(U, { key: 4 }, [
          K.value ? y("", !0) : (a(), n("div", Qi, [
            u[64] || (u[64] = e("div", { class: "kb-comp__head" }, [
              e("span", { class: "kb-comp__badge kb-comp__badge--header" }, "HEADER"),
              e("span", { class: "kb-comp__meta" }, "Optional  ·  MARKETING & UTILITY only")
            ], -1)),
            e("div", Xi, [
              e("div", Zi, [
                u[49] || (u[49] = e("label", { class: "kb-label" }, "Header type", -1)),
                e("div", er, [
                  (a(!0), n(U, null, D(xe.value, (r) => (a(), n("button", {
                    key: r.value,
                    type: "button",
                    class: we(["kb-header-type-btn", { "kb-header-type-btn--active": le.value === r.value }]),
                    onClick: (l) => He(r.value)
                  }, [
                    e("span", ar, c(r.label), 1)
                  ], 10, tr))), 128))
                ]),
                le.value !== "none" ? (a(), n("span", nr, c((ne = k.find((r) => r.value === le.value)) == null ? void 0 : ne.hint), 1)) : y("", !0)
              ]),
              le.value === "text" ? (a(), n("div", sr, [
                e("label", lr, [
                  u[50] || (u[50] = F(" Header text ", -1)),
                  e("span", {
                    class: we(["kb-counter", { "kb-counter--warn": pe.value.length > yt }])
                  }, c(pe.value.length) + "/" + c(yt), 3)
                ]),
                e("div", or, [
                  e("input", {
                    type: "text",
                    class: "kb-input",
                    placeholder: "e.g. Order update",
                    value: pe.value,
                    onInput: u[10] || (u[10] = (r) => de({ header: r.target.value || void 0 }))
                  }, null, 40, ir),
                  e("div", rr, [
                    e("button", {
                      type: "button",
                      class: "kb-btn-insert",
                      onClick: u[11] || (u[11] = (r) => Pe("header"))
                    }, "{{ .var }}"),
                    ve.value === "header" ? (a(), n("div", ur, [
                      (a(!0), n(U, null, D(ke.value, (r) => (a(), n("button", {
                        key: `wa-header-var-${r}`,
                        type: "button",
                        class: "kb-var-menu-item",
                        onClick: (l) => Ne("header", r)
                      }, c(r), 9, dr))), 128))
                    ])) : y("", !0)
                  ])
                ]),
                u[51] || (u[51] = e("span", { class: "kb-helper" }, [
                  F("Supports one "),
                  e("code", { class: "kb-code" }, "{{1}}"),
                  F(" variable (sent as last param at send time).")
                ], -1))
              ])) : ["image", "video", "document"].includes(le.value) ? (a(), n("div", cr, [
                e("div", null, [
                  u[52] || (u[52] = e("label", { class: "kb-label kb-label--sm" }, [
                    F(" Media URL "),
                    e("span", { class: "kb-tag-opt" }, "send-time")
                  ], -1)),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "https://...",
                    value: P.value.media_url ?? "",
                    onInput: u[12] || (u[12] = (r) => de({ media_url: r.target.value || void 0 }))
                  }, null, 40, pr),
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
                    value: P.value.media_handle ?? "",
                    onInput: u[13] || (u[13] = (r) => de({ media_handle: r.target.value || void 0 }))
                  }, null, 40, mr),
                  u[60] || (u[60] = e("span", { class: "kb-helper" }, [
                    F(" Upload Handle ID from Gupshup media API — "),
                    e("strong", null, "not a URL"),
                    F(". Use the uploader below or paste an existing handle. ")
                  ], -1)),
                  e("div", vr, [
                    e("input", {
                      ref_key: "mediaUploadFileRef",
                      ref: _e,
                      type: "file",
                      class: "kb-mu__file-input",
                      accept: "image/jpeg,image/png,video/mp4,application/pdf",
                      onChange: be
                    }, null, 544),
                    e("div", {
                      class: we(["kb-mu__row", {
                        "kb-mu__row--drag": $e.value,
                        "kb-mu__row--done": Q.value === "done",
                        "kb-mu__row--error": Q.value === "error"
                      }]),
                      onDragover: u[18] || (u[18] = Ye((r) => $e.value = !0, ["prevent"])),
                      onDragleave: u[19] || (u[19] = Ye((r) => $e.value = !1, ["prevent"])),
                      onDrop: Ye(he, ["prevent"])
                    }, [
                      e("div", {
                        class: "kb-mu__left",
                        onClick: u[14] || (u[14] = (r) => {
                          var l;
                          return i.mediaUploadUrl ? (l = _e.value) == null ? void 0 : l.click() : void 0;
                        })
                      }, [
                        Q.value === "done" ? (a(), n(U, { key: 0 }, [
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
                        ], 64)) : E.value ? (a(), n(U, { key: 1 }, [
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
                          e("span", br, c(E.value.name), 1),
                          e("span", yr, c((E.value.size / 1024).toFixed(0)) + " KB", 1)
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
                          e("span", hr, c(i.mediaUploadUrl ? $e.value ? "Drop file" : "Click or drop · JPEG PNG MP4 PDF" : "Set mediaUploadUrl prop to enable uploads"), 1)
                        ], 64))
                      ]),
                      e("div", gr, [
                        Q.value === "done" ? (a(), n("button", {
                          key: 0,
                          type: "button",
                          class: "kb-mu__btn kb-mu__btn--ghost",
                          onClick: u[15] || (u[15] = (r) => {
                            Q.value = "idle", E.value = null, _e.value && (_e.value.value = "");
                          })
                        }, "Upload another")) : E.value ? (a(), n(U, { key: 1 }, [
                          e("button", {
                            type: "button",
                            class: "kb-mu__btn kb-mu__btn--ghost",
                            onClick: u[16] || (u[16] = Ye((r) => {
                              E.value = null, Q.value = "idle", J.value = "", _e.value && (_e.value.value = "");
                            }, ["stop"]))
                          }, "Clear"),
                          e("button", {
                            type: "button",
                            class: "kb-mu__btn kb-mu__btn--primary",
                            disabled: Q.value === "uploading",
                            onClick: Ue
                          }, [
                            Q.value === "uploading" ? (a(), n("span", kr)) : y("", !0),
                            F(" " + c(Q.value === "uploading" ? "Uploading…" : "Get handle"), 1)
                          ], 8, fr)
                        ], 64)) : i.mediaUploadUrl ? (a(), n("button", {
                          key: 2,
                          type: "button",
                          class: "kb-mu__btn kb-mu__btn--ghost",
                          onClick: u[17] || (u[17] = (r) => {
                            var l;
                            return (l = _e.value) == null ? void 0 : l.click();
                          })
                        }, "Browse")) : y("", !0)
                      ])
                    ], 34),
                    Q.value === "error" ? (a(), n("p", _r, [
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
                      F(" " + c(J.value), 1)
                    ])) : y("", !0)
                  ])
                ]),
                le.value === "document" ? (a(), n("div", wr, [
                  u[61] || (u[61] = e("label", { class: "kb-label kb-label--sm" }, [
                    F("Document filename "),
                    e("span", { class: "kb-tag-opt" }, "send-time")
                  ], -1)),
                  e("input", {
                    type: "text",
                    class: "kb-input",
                    placeholder: "e.g. Invoice_0042.pdf",
                    value: P.value.document_filename ?? "",
                    onInput: u[20] || (u[20] = (r) => de({ document_filename: r.target.value || void 0 }))
                  }, null, 40, $r),
                  u[62] || (u[62] = e("span", { class: "kb-helper" }, "Filename shown to the recipient in chat — does not rename the actual file.", -1))
                ])) : y("", !0)
              ])) : le.value === "location" ? (a(), n("div", xr, [...u[63] || (u[63] = [
                F(" Location coordinates, name, and address are injected at send time via the ", -1),
                e("code", { class: "kb-code" }, "message", -1),
                F(" field. No media upload or handle needed. The ", -1),
                e("code", { class: "kb-code" }, "templateType", -1),
                F(" will be set to ", -1),
                e("code", { class: "kb-code" }, "TEXT", -1),
                F(". ", -1)
              ])])) : y("", !0)
            ])
          ])),
          e("div", Cr, [
            e("div", Sr, [
              u[70] || (u[70] = e("span", { class: "kb-comp__badge kb-comp__badge--body" }, "BODY", -1)),
              K.value ? (a(), n("span", Tr, "Preset by Meta — not configurable")) : (a(), n("span", Ir, [
                F("Required  ·  Max " + c(ot) + " chars  ·  Supports "),
                u[65] || (u[65] = e("code", { class: "kb-code-inline" }, "*bold*", -1)),
                u[66] || (u[66] = F()),
                u[67] || (u[67] = e("code", { class: "kb-code-inline" }, "_italic_", -1)),
                u[68] || (u[68] = F()),
                u[69] || (u[69] = e("code", { class: "kb-code-inline" }, "\\n", -1))
              ]))
            ]),
            e("div", Ar, [
              K.value ? (a(), n(U, { key: 0 }, [
                e("div", Ur, [
                  u[71] || (u[71] = e("strong", null, "Body is preset by Meta.", -1)),
                  u[72] || (u[72] = F(" You cannot customize it. ", -1)),
                  e("div", Rr, c(A.value), 1)
                ]),
                e("div", Er, [
                  e("label", Pr, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!P.value.add_security_recommendation,
                      onChange: u[21] || (u[21] = (r) => de({ add_security_recommendation: r.target.checked || void 0 }))
                    }, null, 40, Br),
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
                      value: P.value.code_expiration_minutes ?? "",
                      onInput: u[22] || (u[22] = (r) => {
                        const l = parseInt(r.target.value, 10);
                        de({ code_expiration_minutes: isNaN(l) ? void 0 : l });
                      })
                    }, null, 40, Lr),
                    u[75] || (u[75] = e("span", { class: "kb-helper" }, 'Appends "This code expires in N minutes."', -1))
                  ])
                ])
              ], 64)) : (a(), n(U, { key: 1 }, [
                e("div", Or, [
                  e("label", Nr, [
                    u[76] || (u[76] = F(" Body text ", -1)),
                    e("span", {
                      class: we(["kb-counter", { "kb-counter--warn": N.value.length > ot }])
                    }, c(N.value.length) + "/" + c(ot), 3)
                  ]),
                  e("div", Mr, [
                    e("textarea", {
                      class: "kb-textarea",
                      rows: "4",
                      placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
                      value: N.value,
                      onInput: u[23] || (u[23] = (r) => de({ body: r.target.value || void 0 }))
                    }, null, 40, Vr),
                    e("div", Dr, [
                      e("button", {
                        type: "button",
                        class: "kb-btn-insert",
                        onClick: u[24] || (u[24] = (r) => Pe("body"))
                      }, "{{ .var }}"),
                      ve.value === "body" ? (a(), n("div", jr, [
                        (a(!0), n(U, null, D(ke.value, (r) => (a(), n("button", {
                          key: `wa-body-var-${r}`,
                          type: "button",
                          class: "kb-var-menu-item",
                          onClick: (l) => Ne("body", r)
                        }, c(r), 9, Hr))), 128))
                      ])) : y("", !0)
                    ])
                  ])
                ]),
                e("div", Wr, [
                  u[77] || (u[77] = e("label", { class: "kb-label" }, [
                    F(" Body example "),
                    e("span", { class: "kb-tag-req" }, "required for approval")
                  ], -1)),
                  e("textarea", {
                    class: "kb-textarea",
                    rows: "3",
                    placeholder: "Hi John, your order ORD-5531 has been shipped...",
                    value: P.value.template_example ?? "",
                    onInput: u[25] || (u[25] = (r) => de({ template_example: r.target.value || void 0 }))
                  }, null, 40, qr),
                  u[78] || (u[78] = e("span", { class: "kb-helper" }, [
                    F("Body text with all "),
                    e("code", { class: "kb-code" }, "{{1}}"),
                    F(" placeholders replaced by realistic values. Meta reviewers read this.")
                  ], -1))
                ]),
                h.value.length > 0 ? (a(), n("div", Fr, [
                  u[79] || (u[79] = e("label", { class: "kb-label" }, "Detected variables", -1)),
                  e("ul", zr, [
                    (a(!0), n(U, null, D(h.value, (r) => (a(), n("li", {
                      key: r.name,
                      class: we(["kb-wa-field-item", { "kb-wa-field-item--ok": r.configured }])
                    }, [
                      e("span", Yr, c(r.name), 1),
                      e("span", Kr, c(r.configured ? "Configured" : "Missing"), 1)
                    ], 2))), 128))
                  ])
                ])) : y("", !0)
              ], 64))
            ])
          ]),
          K.value ? y("", !0) : (a(), n("div", Gr, [
            e("div", { class: "kb-comp__head" }, [
              u[80] || (u[80] = e("span", { class: "kb-comp__badge kb-comp__badge--footer" }, "FOOTER", -1)),
              e("span", { class: "kb-comp__meta" }, "Optional  ·  Max " + c(it) + " chars  ·  No variables  ·  Plain text only")
            ]),
            e("div", Jr, [
              e("div", Qr, [
                e("label", Xr, [
                  u[81] || (u[81] = F(" Footer text ", -1)),
                  e("span", {
                    class: we(["kb-counter", { "kb-counter--warn": se.value.length > it }])
                  }, c(se.value.length) + "/" + c(it), 3)
                ]),
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "e.g. Reply STOP to unsubscribe",
                  value: se.value,
                  onInput: u[26] || (u[26] = (r) => de({ footer: r.target.value || void 0 }))
                }, null, 40, Zr),
                u[82] || (u[82] = e("span", { class: "kb-helper" }, "Static text only — variables and formatting are not supported in the footer.", -1))
              ])
            ])
          ])),
          e("div", eu, [
            e("div", tu, [
              u[83] || (u[83] = e("span", { class: "kb-comp__badge kb-comp__badge--buttons" }, "BUTTONS", -1)),
              K.value ? (a(), n("span", au, "OTP button required  ·  Exactly 1")) : (a(), n("span", nu, "Optional  ·  Max " + c(f.value) + "  ·  Button label max 25 chars", 1))
            ]),
            e("div", su, [
              R.value ? (a(), n("div", lu, [...u[84] || (u[84] = [
                e("strong", null, "Ordering rule:", -1),
                F(" CTA buttons (URL, Phone, Copy Code) must appear ", -1),
                e("em", null, "before", -1),
                F(" Quick Reply buttons or the API will reject the template. ", -1)
              ])])) : y("", !0),
              !K.value && q.value.length === 0 ? (a(), n("div", ou, [
                u[85] || (u[85] = F(" Available for ", -1)),
                e("strong", null, c(V.value), 1),
                u[86] || (u[86] = F(": ", -1)),
                (a(!0), n(U, null, D(ee.value, (r) => (a(), n("span", {
                  key: r.value,
                  class: "kb-comp__type-chip"
                }, c(r.label), 1))), 128))
              ])) : y("", !0),
              K.value && q.value.length === 0 ? (a(), n("div", iu, " Authentication templates require exactly one OTP button. Add it below. ")) : y("", !0),
              e("div", ru, [
                (a(!0), n(U, null, D(q.value, (r, l) => (a(), n("div", {
                  key: r.id || l,
                  class: "kb-wa-button-row"
                }, [
                  r.type !== "otp" ? (a(), n("div", uu, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--btn-label",
                      placeholder: "Button label (max 25 chars)",
                      value: r.label,
                      onInput: (t) => Re(Number(l), { label: t.target.value })
                    }, null, 40, du),
                    e("div", cu, [
                      e("button", {
                        type: "button",
                        class: "kb-btn-insert",
                        onClick: (t) => Pe(`btn-label:${l}`)
                      }, "{{ .var }}", 8, pu),
                      ve.value === `btn-label:${l}` ? (a(), n("div", mu, [
                        (a(!0), n(U, null, D(ke.value, (t) => (a(), n("button", {
                          key: `wa-btn-label-var-${l}-${t}`,
                          type: "button",
                          class: "kb-var-menu-item",
                          onClick: (z) => Ne(`btn-label:${l}`, t)
                        }, c(t), 9, vu))), 128))
                      ])) : y("", !0)
                    ])
                  ])) : y("", !0),
                  e("select", {
                    class: "kb-select kb-select--btn-type",
                    value: r.type ?? "quick_reply",
                    onChange: (t) => Re(Number(l), { type: t.target.value })
                  }, [
                    (a(!0), n(U, null, D(ee.value, (t) => (a(), n("option", {
                      key: t.value,
                      value: t.value
                    }, c(t.label), 9, yu))), 128))
                  ], 40, bu),
                  r.type === "url" ? (a(), n(U, { key: 1 }, [
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "https://example.com/track/{{1}}",
                      value: r.url,
                      onInput: (t) => Re(Number(l), { url: t.target.value || void 0 })
                    }, null, 40, hu),
                    e("input", {
                      type: "url",
                      class: "kb-input kb-input--btn-target",
                      placeholder: "Example URL with real value (required if URL has {{1}})",
                      value: r.url_example,
                      onInput: (t) => Re(Number(l), { url_example: t.target.value || void 0 })
                    }, null, 40, gu)
                  ], 64)) : r.type === "call" ? (a(), n("input", {
                    key: 2,
                    type: "tel",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "+1 555 123 4567 (E.164 format)",
                    value: r.phone,
                    onInput: (t) => Re(Number(l), { phone: t.target.value || void 0 })
                  }, null, 40, fu)) : r.type === "copy_code" ? (a(), n("input", {
                    key: 3,
                    type: "text",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "Sample coupon code (e.g. SAVE30DEC)",
                    value: r.example,
                    onInput: (t) => Re(Number(l), { example: t.target.value || void 0 })
                  }, null, 40, ku)) : r.type === "opt_out" ? (a(), n("span", _u, " Sends a built-in marketing opt-out action. ")) : r.type === "otp" ? (a(), n(U, { key: 5 }, [
                    u[88] || (u[88] = e("label", {
                      class: "kb-label kb-label--sm",
                      style: { "margin-top": "0.3rem" }
                    }, "OTP button label", -1)),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--btn-label",
                      placeholder: "e.g. Copy Code",
                      value: r.label,
                      onInput: (t) => Re(Number(l), { label: t.target.value })
                    }, null, 40, wu),
                    u[89] || (u[89] = e("label", {
                      class: "kb-label kb-label--sm",
                      style: { "margin-top": "0.3rem" }
                    }, "OTP sub-type", -1)),
                    e("select", {
                      class: "kb-select kb-select--btn-type",
                      value: r.otp_type ?? "COPY_CODE",
                      onChange: (t) => Re(Number(l), { otp_type: t.target.value })
                    }, [...u[87] || (u[87] = [
                      e("option", { value: "COPY_CODE" }, "Copy code — user manually copies the OTP", -1),
                      e("option", { value: "ONE_TAP" }, "One-tap autofill — autofills on Android", -1)
                    ])], 40, $u),
                    r.otp_type === "ONE_TAP" ? (a(), n(U, { key: 0 }, [
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: "Autofill hint text (e.g. Tap to autofill)",
                        value: r.autofill_text,
                        onInput: (t) => Re(Number(l), { autofill_text: t.target.value || void 0 })
                      }, null, 40, xu),
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: "Android package name (e.g. com.example.app)",
                        value: r.package_name,
                        onInput: (t) => Re(Number(l), { package_name: t.target.value || void 0 })
                      }, null, 40, Cu),
                      e("input", {
                        type: "text",
                        class: "kb-input kb-input--btn-target",
                        placeholder: "App signature hash (e.g. K8a%2FAINcGX7)",
                        value: r.signature_hash,
                        onInput: (t) => Re(Number(l), { signature_hash: t.target.value || void 0 })
                      }, null, 40, Su)
                    ], 64)) : y("", !0)
                  ], 64)) : y("", !0),
                  e("button", {
                    type: "button",
                    class: "kb-wa-btn-remove",
                    onClick: (t) => We(Number(l))
                  }, "Remove", 8, Iu)
                ]))), 128)),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-add",
                  disabled: q.value.length >= f.value,
                  onClick: Ve
                }, c(K.value ? "Add OTP button" : "Add button"), 9, Tu)
              ]),
              q.value.length > 1 && !K.value ? (a(), n("div", Au, [
                u[90] || (u[90] = e("span", { class: "kb-buttons-order-hint__label" }, "Send order:", -1)),
                (a(!0), n(U, null, D(q.value, (r, l) => (a(), n("span", {
                  key: r.id || l,
                  class: we(["kb-buttons-order-hint__chip", {
                    "kb-buttons-order-hint__chip--cta": ["url", "call", "copy_code", "opt_out"].includes(r.type ?? ""),
                    "kb-buttons-order-hint__chip--qr": r.type === "quick_reply"
                  }])
                }, c(r.label || r.type || "button"), 3))), 128))
              ])) : y("", !0)
            ])
          ])
        ], 64))
      ]);
    };
  }
}), Eu = /* @__PURE__ */ Be(Ru, [["__scopeId", "data-v-c85a7355"]]), Pu = { class: "wa-preview-root" }, Bu = { class: "wa-device" }, Lu = { class: "wa-screen" }, Ou = { class: "wa-header" }, Nu = { class: "wa-titleblock" }, Mu = { class: "wa-title-row" }, Vu = { class: "wa-title" }, Du = { class: "wa-subtitle" }, ju = {
  key: 0,
  class: "wa-flow-shell"
}, Hu = { class: "wa-flow-header" }, Wu = { class: "wa-flow-title" }, qu = { class: "wa-flow-content" }, Fu = { class: "wa-flow-eyebrow" }, zu = {
  key: 0,
  class: "wa-flow-products"
}, Yu = { class: "wa-flow-footer" }, Ku = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, Gu = { class: "wa-managed" }, Ju = {
  key: 1,
  class: "wa-thread"
}, Qu = { class: "wa-secure-banner" }, Xu = { class: "wa-msg wa-msg--in" }, Zu = { class: "wa-template-card" }, ed = {
  key: 0,
  class: "wa-card-media"
}, td = ["src"], ad = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, nd = ["src"], sd = { class: "wa-card-media-doc-icon" }, ld = ["title"], od = {
  key: 3,
  class: "wa-card-media-fallback"
}, id = { class: "wa-card-media-tag" }, rd = { class: "wa-card-media-sub" }, ud = {
  key: 1,
  class: "wa-card-header-text"
}, dd = ["innerHTML"], cd = {
  key: 2,
  class: "wa-link-preview"
}, pd = { class: "wa-link-preview-head" }, md = { class: "wa-link-preview-text" }, vd = ["href"], bd = {
  key: 3,
  class: "wa-inline-note"
}, yd = {
  key: 4,
  class: "wa-inline-note"
}, hd = {
  key: 5,
  class: "wa-inline-note"
}, gd = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, fd = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, kd = {
  key: 8,
  class: "wa-product-list"
}, _d = { class: "wa-product-name" }, wd = { class: "wa-product-price" }, $d = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, xd = {
  key: 10,
  class: "wa-template-actions"
}, Cd = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Sd = { class: "wa-order-card" }, Id = { class: "wa-order-card-top" }, Td = ["src"], Ad = { type: "button" }, Ud = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Rd = { class: "wa-document-card" }, Ed = { class: "wa-document-file" }, Pd = { class: "wa-document-icon" }, Bd = ["title"], Ld = { class: "wa-document-caption" }, Od = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Nd = { class: "wa-voice-card" }, Md = { class: "wa-voice-top" }, Vd = { class: "wa-voice-profile" }, Dd = ["src"], jd = { class: "wa-voice-duration" }, Hd = { class: "wa-voice-transcript" }, Wd = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, qd = { class: "wa-contact-card" }, Fd = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, zd = { class: "wa-location-card" }, Yd = { class: "wa-location-content" }, Kd = { type: "button" }, Gd = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Jd = { class: "wa-carousel-track" }, Qd = { type: "button" }, Xd = { class: "wa-msg wa-msg--out" }, Zd = { class: "wa-bubble wa-bubble--out" }, ec = { class: "wa-bubble-author" }, tc = {
  key: 0,
  class: "wa-reaction"
}, ac = { class: "wa-msg wa-msg--in" }, nc = { class: "wa-bubble wa-bubble--in" }, sc = /* @__PURE__ */ Ee({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(i) {
    const p = i;
    function m(f) {
      return String(f).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const b = w(() => {
      var V;
      const f = ((V = p.template) == null ? void 0 : V.body) ?? "";
      return m(f).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), k = w(() => p.template.templateName || "Ecoshop"), C = w(() => "Business Account"), T = w(() => p.template.format === "flow" || !!p.template.flow), I = w(() => {
      var f;
      return (f = p.template.buttons) == null ? void 0 : f[0];
    }), L = w(() => {
      var f, R;
      return ((f = I.value) == null ? void 0 : f.text) || ((R = p.template.flow) == null ? void 0 : R.ctaLabel) || "";
    }), P = w(() => p.template.buttons ?? []), G = w(() => {
      var f;
      return (((f = p.template.multiProduct) == null ? void 0 : f.length) ?? 0) > 0;
    }), te = w(() => (p.template.format || "text").toUpperCase()), le = w(() => {
      const f = p.template.header;
      return !f || f.type === "text" ? "" : f.type === "image" ? f.url || "Image" : f.type === "video" ? f.url || "Video" : f.filename || f.url || "Document";
    }), pe = w(() => {
      const f = p.template.header;
      if (!(!f || f.type !== "image" || !f.url))
        return { backgroundImage: `url(${f.url})` };
    });
    function N(f) {
      if (!f) return "";
      try {
        const R = f.split("?")[0].split("#")[0], V = R.substring(R.lastIndexOf("/") + 1);
        return decodeURIComponent(V || "");
      } catch {
        return "";
      }
    }
    const se = w(() => {
      const f = p.template.header;
      return !f || f.type !== "document" ? "" : f.filename || N(f.url) || "document.pdf";
    }), q = w(() => {
      const f = (p.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (f == null ? void 0 : f[0]) || "";
    });
    function me(f) {
      try {
        return new URL(f).hostname;
      } catch {
        return "example.com";
      }
    }
    const M = w(() => {
      const f = p.template.linkPreview;
      return !f && !q.value ? null : {
        title: (f == null ? void 0 : f.title) || "Link preview",
        description: (f == null ? void 0 : f.description) || "Preview from your WhatsApp template link.",
        domain: (f == null ? void 0 : f.domain) || (q.value ? me(q.value) : "example.com"),
        url: (f == null ? void 0 : f.url) || q.value || "#",
        thumbnail: (f == null ? void 0 : f.thumbnail) || ""
      };
    }), K = w(() => {
      var V, fe, oe;
      const R = (oe = (((V = p.template.documentCard) == null ? void 0 : V.filename) || ((fe = p.template.header) == null ? void 0 : fe.filename) || "").split(".").pop()) == null ? void 0 : oe.trim().toUpperCase();
      return R ? R.slice(0, 4) : "DOC";
    });
    function X(f, R) {
      return f === "phone_number" ? "wa-btn-icon--phone" : f === "url" ? "wa-btn-icon--external" : f === "copy_code" ? "wa-btn-icon--code" : f === "opt_out" || (R || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (R || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ae = w(() => {
      var f;
      return p.template.location || p.template.locationRequest ? "wa-side-icon--info" : ((f = p.template.header) == null ? void 0 : f.type) === "video" || p.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ye = w(() => {
      var R, V, fe;
      const f = p.template;
      return f.format === "flow" ? "Thanks, we received your preferences." : (R = f.auth) != null && R.code ? "Use the verification code and let us know if it works." : (V = f.coupon) != null && V.code ? `Your coupon ${f.coupon.code} is active now.` : f.limitedOffer ? `Great choice. This offer is valid until ${f.limitedOffer}.` : (fe = p.template.multiProduct) != null && fe.length ? `Here are ${p.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), xe = w(() => {
      var R, V;
      const f = p.template;
      return f.location ? f.location.name || f.location.address || `${f.location.lat}, ${f.location.lng}` : (R = f.auth) != null && R.code ? `Verification code: ${f.auth.code}` : (V = f.flow) != null && V.id ? `Flow ID: ${f.flow.id}` : f.templateLanguage ? `Template language: ${f.templateLanguage}` : `Category: ${f.templateCategory || "utility"} • Format: ${f.format || "text"}`;
    }), ee = w(() => {
      var V, fe;
      const f = p.template;
      if ((V = f.multiProduct) != null && V.length) return f.multiProduct.slice(0, 5).map((oe) => oe.name || "Product");
      if ((fe = f.buttons) != null && fe.length) return f.buttons.slice(0, 5).map((oe) => oe.text || "Option");
      const R = (f.body || "").split(/\n|\.|,/).map((oe) => oe.trim()).filter(Boolean).slice(0, 5);
      return R.length ? R : ["Option A", "Option B", "Option C"];
    });
    return (f, R) => {
      var V, fe, oe, A, W, h, ie, ke, ve, _e, E, Q, J, $e;
      return a(), n("div", Pu, [
        e("div", Bu, [
          e("div", Lu, [
            R[30] || (R[30] = tt('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Ou, [
              R[7] || (R[7] = e("span", { class: "wa-back" }, "←", -1)),
              R[8] || (R[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Nu, [
                e("div", Mu, [
                  e("span", Vu, c(k.value), 1),
                  R[6] || (R[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Du, c(C.value), 1)
              ]),
              R[9] || (R[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            T.value ? (a(), n("div", ju, [
              R[14] || (R[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Hu, [
                R[10] || (R[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Wu, c(k.value), 1),
                R[11] || (R[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", qu, [
                e("p", Fu, c(i.template.body || "Please choose an option below."), 1),
                (a(!0), n(U, null, D(ee.value, (be, he) => (a(), n("div", {
                  key: `flow-opt-${he}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, c(be), 1),
                  e("span", {
                    class: we(["wa-radio", { "wa-radio--on": he === 0 }])
                  }, null, 2)
                ]))), 128)),
                (V = i.template.multiProduct) != null && V.length ? (a(), n("div", zu, [
                  (a(!0), n(U, null, D(i.template.multiProduct.slice(0, 3), (be, he) => (a(), n("div", {
                    key: he,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, c(be.name || "Product"), 1),
                      e("p", null, c(be.price || "Price on request"), 1)
                    ]),
                    R[12] || (R[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : y("", !0)
              ]),
              e("div", Yu, [
                L.value ? (a(), n("button", Ku, c(L.value), 1)) : y("", !0),
                e("p", Gu, [
                  R[13] || (R[13] = F("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: R[0] || (R[0] = Ye(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), n("div", Ju, [
              R[29] || (R[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Qu, [
                R[15] || (R[15] = e("span", null, "●", -1)),
                R[16] || (R[16] = F(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: R[1] || (R[1] = Ye(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", Xu, [
                e("div", Zu, [
                  i.template.header && i.template.header.type !== "text" ? (a(), n("div", ed, [
                    i.template.header.type === "image" && i.template.header.url ? (a(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: i.template.header.url,
                      alt: "Header media"
                    }, null, 8, td)) : i.template.header.type === "video" && i.template.header.url ? (a(), n("div", ad, [
                      e("video", {
                        src: i.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, nd),
                      R[17] || (R[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : i.template.header.type === "document" ? (a(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: R[2] || (R[2] = Ye(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", sd, c(K.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: se.value
                      }, c(se.value), 9, ld)
                    ])) : (a(), n("div", od, [
                      e("div", id, c(te.value) + " TEMPLATE", 1),
                      e("div", rd, c(le.value), 1),
                      pe.value ? (a(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: Se(pe.value)
                      }, null, 4)) : y("", !0)
                    ]))
                  ])) : (fe = i.template.header) != null && fe.text ? (a(), n("div", ud, c(i.template.header.text), 1)) : y("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: b.value
                  }, null, 8, dd),
                  M.value ? (a(), n("div", cd, [
                    e("div", pd, [
                      M.value.thumbnail ? (a(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: Se({ backgroundImage: `url(${M.value.thumbnail})` })
                      }, null, 4)) : y("", !0),
                      e("div", md, [
                        e("strong", null, c(M.value.title), 1),
                        e("p", null, c(M.value.description), 1),
                        e("span", null, c(M.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: M.value.url,
                      onClick: R[3] || (R[3] = Ye(() => {
                      }, ["prevent"]))
                    }, c(M.value.url), 9, vd)
                  ])) : y("", !0),
                  i.template.location ? (a(), n("div", bd, " 📍 " + c(i.template.location.name || i.template.location.address || `${i.template.location.lat}, ${i.template.location.lng}`), 1)) : y("", !0),
                  (oe = i.template.coupon) != null && oe.code ? (a(), n("div", yd, [
                    R[18] || (R[18] = F(" Coupon: ", -1)),
                    e("strong", null, c(i.template.coupon.code), 1)
                  ])) : y("", !0),
                  (A = i.template.auth) != null && A.code ? (a(), n("div", hd, [
                    R[19] || (R[19] = F(" Verification code: ", -1)),
                    e("strong", null, c(i.template.auth.code), 1)
                  ])) : y("", !0),
                  i.template.limitedOffer ? (a(), n("div", gd, " Expires: " + c(i.template.limitedOffer), 1)) : y("", !0),
                  i.template.footer ? (a(), n("div", fd, c(i.template.footer), 1)) : y("", !0),
                  G.value ? (a(), n("div", kd, [
                    (a(!0), n(U, null, D((W = i.template.multiProduct) == null ? void 0 : W.slice(0, 4), (be, he) => (a(), n("div", {
                      key: `prod-${he}`,
                      class: "wa-product-row"
                    }, [
                      e("span", _d, c(be.name || `Item ${he + 1}`), 1),
                      e("span", wd, c(be.price || "-"), 1)
                    ]))), 128))
                  ])) : y("", !0),
                  L.value ? (a(), n("button", $d, [
                    I.value ? (a(), n("span", {
                      key: 0,
                      class: we(["wa-btn-icon", X(I.value.type, I.value.value || I.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : y("", !0),
                    F(" " + c(L.value), 1)
                  ])) : y("", !0),
                  P.value.length > 1 ? (a(), n("div", xd, [
                    (a(!0), n(U, null, D(P.value.slice(1, 4), (be, he) => (a(), n("button", {
                      key: `action-${he}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: we(["wa-btn-icon", X(be.type, be.value || be.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      F(" " + c(be.text), 1)
                    ]))), 128))
                  ])) : y("", !0),
                  R[20] || (R[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: we(["wa-side-icon", ae.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              i.template.orderCard ? (a(), n("div", Cd, [
                e("div", Sd, [
                  e("div", Id, [
                    i.template.orderCard.image ? (a(), n("img", {
                      key: 0,
                      src: i.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Td)) : y("", !0),
                    e("div", null, [
                      e("strong", null, c(i.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, c(i.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Ad, c(i.template.orderCard.buttonLabel || "View"), 1),
                  R[21] || (R[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : y("", !0),
              i.template.documentCard || ((h = i.template.header) == null ? void 0 : h.type) === "document" ? (a(), n("div", Ud, [
                e("div", Rd, [
                  e("div", Ed, [
                    e("span", Pd, c(K.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((ie = i.template.documentCard) == null ? void 0 : ie.filename) || ((ke = i.template.header) == null ? void 0 : ke.filename) || "document.pdf"
                      }, c(((ve = i.template.documentCard) == null ? void 0 : ve.filename) || ((_e = i.template.header) == null ? void 0 : _e.filename) || "document.pdf"), 9, Bd),
                      e("p", null, c(((E = i.template.documentCard) == null ? void 0 : E.size) || "243 KB • html"), 1)
                    ]),
                    R[22] || (R[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ld, c(((Q = i.template.documentCard) == null ? void 0 : Q.caption) || i.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : y("", !0),
              i.template.voiceNote ? (a(), n("div", Od, [
                e("div", Nd, [
                  e("div", Md, [
                    R[24] || (R[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    R[25] || (R[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Vd, [
                      i.template.voiceNote.profileImage ? (a(), n("img", {
                        key: 0,
                        src: i.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Dd)) : y("", !0),
                      R[23] || (R[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", jd, c(i.template.voiceNote.duration || "0:10"), 1),
                  e("p", Hd, c(i.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : y("", !0),
              i.template.contactCard ? (a(), n("div", Wd, [
                e("div", qd, [
                  e("strong", null, c(i.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, c(i.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, c(i.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, c(i.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, c(i.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : y("", !0),
              i.template.location && i.template.locationRequest ? (a(), n("div", Fd, [
                e("div", zd, [
                  R[26] || (R[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Yd, [
                    e("strong", null, c(i.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: R[4] || (R[4] = Ye(() => {
                      }, ["prevent"]))
                    }, c(i.template.location.address || `${i.template.location.lat}, ${i.template.location.lng}`), 1)
                  ]),
                  e("button", Kd, c(i.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : y("", !0),
              (J = i.template.carouselCards) != null && J.length ? (a(), n("div", Gd, [
                e("div", Jd, [
                  (a(!0), n(U, null, D(i.template.carouselCards.slice(0, 4), (be, he) => (a(), n("article", {
                    key: `c-${he}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: Se(be.image ? { backgroundImage: `url(${be.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, c(be.title || `Card ${he + 1}`), 1),
                    e("p", null, c(be.description || "Card description"), 1),
                    e("button", Qd, c(be.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : y("", !0),
              e("div", Xd, [
                e("div", Zd, [
                  e("span", ec, c(k.value), 1),
                  e("p", null, c(ye.value), 1),
                  R[27] || (R[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  i.template.reactionEmoji ? (a(), n("span", tc, c(i.template.reactionEmoji), 1)) : y("", !0)
                ])
              ]),
              e("div", ac, [
                e("div", nc, [
                  e("p", null, c(xe.value), 1),
                  ($e = i.template.flow) != null && $e.id ? (a(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: R[5] || (R[5] = Ye(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + c(i.template.flow.id), 1)) : y("", !0),
                  R[28] || (R[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            R[31] || (R[31] = tt('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), lc = /* @__PURE__ */ Be(sc, [["__scopeId", "data-v-244c945a"]]), oc = { class: "keos-whatsapp-builder" }, ic = { class: "kb-builder-top" }, rc = { class: "kb-wa-layout" }, uc = { class: "kb-wa-sidebar" }, dc = {
  key: 0,
  class: "kb-wa-form"
}, cc = { class: "kb-wa-form-head" }, pc = { class: "kb-wa-form-head-top" }, mc = { class: "kb-wa-health-pill" }, vc = { class: "kb-wa-form-head-row" }, bc = ["value"], yc = { class: "kb-wa-health" }, hc = { class: "kb-wa-health-row" }, gc = { class: "kb-wa-health-value" }, fc = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, kc = { class: "kb-wa-canvas" }, _c = {
  key: 0,
  class: "kb-wa-test-banner"
}, wc = { class: "kb-wa-preview-chrome" }, $c = { class: "kb-push-preview-controls" }, xc = { class: "kb-push-preview-as" }, Cc = ["value"], Sc = { class: "kb-preview-status" }, Ic = { class: "kb-wa-actions" }, Tc = {
  key: 0,
  class: "kb-actions-note"
}, Ac = { key: 0 }, Uc = { class: "kb-wa-actions-right" }, Rc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Ec = { class: "kb-confirm-dialog" }, Pc = { class: "kb-confirm-actions" }, Bt = 60, Lt = 1024, Ot = 60, Nt = 10, Mt = 10, Bc = /* @__PURE__ */ Ee({
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
    mediaUploadHeaders: {}
  },
  emits: ["update:modelValue", "change", "save", "save-gupshup-template", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(i, { emit: p }) {
    const m = /* @__PURE__ */ new Set(["image", "video", "document"]), b = /* @__PURE__ */ new Set([
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
    function C(s) {
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
        Object.entries(o).filter(([g, v]) => b.has(g) ? !0 : k(v))
      );
    }
    function T(s) {
      const o = { ...s }, g = String(o.template_type ?? "text").trim().toLowerCase(), v = String(o.header_type ?? "none").trim().toLowerCase();
      m.has(g) || m.has(v) || (o.media_url = void 0, o.media_caption = void 0, o.document_filename = void 0, o.document_size = void 0), g !== "carousel" && (o.cards = void 0), g !== "catalog" && g !== "mpm" && (o.products = void 0), g !== "flow" && (o.flow_id = void 0, o.flow_cta_label = void 0), g !== "lto" && (o.lto_expiry = void 0), g !== "auth" && (o.auth_type = void 0, o.auth_label = void 0, o.auth_code = void 0, o.otp_code = void 0), g !== "document" && v !== "document" && (o.document_filename = void 0, o.document_size = void 0), g !== "location" && (o.location = void 0);
      const S = Array.isArray(o.buttons) ? o.buttons : [];
      return o.buttons = S, o;
    }
    function I(s) {
      var ne, r, l, t, z;
      const o = [], g = s.message, v = (g.template_category ?? "").toString().trim(), j = (g.template_type ?? "text").toString(), S = (g.header_type ?? "none").toString(), O = (g.header ?? "").toString(), Y = (g.body ?? "").toString(), _ = (g.footer ?? "").toString(), u = Array.isArray(g.buttons) ? g.buttons : [], B = Array.isArray(g.cards) ? g.cards : [];
      return (ne = s.name) != null && ne.trim() || o.push("Template name is required"), (r = g.template_name) != null && r.trim() || o.push("WhatsApp template name is required"), v || o.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), Y.trim() || o.push("Body is required"), S === "text" && O.length > Bt && o.push(`Header text cannot exceed ${Bt} characters`), Y.length > Lt && o.push(`Body cannot exceed ${Lt} characters`), _.length > Ot && o.push(`Footer cannot exceed ${Ot} characters`), u.length > Nt && o.push(`Buttons cannot exceed ${Nt}`), (j === "image" || j === "video" || j === "document" || S === "image" || S === "video" || S === "document") && !g.media_url && o.push("Media URL is required for rich media templates"), v === "authentication" && j !== "auth" && o.push("Authentication category must use Authentication format"), j === "auth" && !((l = g.auth_label) != null && l.trim()) && !Y.includes("{{") && o.push("Authentication templates should include a code label or placeholder variable"), j === "lto" && !g.lto_expiry && o.push("Limited-time offer requires an expiry"), (j === "mpm" || j === "catalog") && !((t = g.products) != null && t.length) && o.push("Catalog and multi-product templates require at least one product"), j === "flow" && !((z = g.flow_id) != null && z.trim()) && o.push("WhatsApp Flow format requires a flow ID"), j === "carousel" && (B.length ? B.length > Mt && o.push(`Carousel supports up to ${Mt} cards`) : o.push("Carousel format requires at least one card")), o;
    }
    function L(s, o, g) {
      const v = s.message, j = String(v.template_category ?? "").trim(), S = String(v.template_type ?? "text").trim(), O = [];
      return j && o.includes(j) && O.push(`WhatsApp category "${j}" is disabled in this builder configuration`), S && g.includes(S) && O.push(`WhatsApp format "${S}" is disabled in this builder configuration`), O;
    }
    const P = i;
    function G(s) {
      if (!s) return {};
      const o = s.metaTemplate ?? s.metaWhatsApp, g = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((r) => (r == null ? void 0 : r.type) === "BODY") : void 0, v = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((r) => (r == null ? void 0 : r.type) === "FOOTER") : void 0, j = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((r) => (r == null ? void 0 : r.type) === "HEADER") : void 0, S = String(s.content ?? "").trim(), O = String(s.elementName ?? "").trim(), Y = String(s.languageCode ?? "").trim(), _ = String(s.category ?? "").trim().toLowerCase(), u = String(s.templateType ?? "").trim().toLowerCase(), B = String(s.footer ?? "").trim(), ne = String(s.header ?? "").trim();
      return {
        ...s,
        ...O && !s.template_name ? { template_name: O } : {},
        ...Y && !s.template_language ? { template_language: Y } : {},
        ..._ && !s.template_category ? { template_category: _ } : {},
        ...u && !s.template_type ? { template_type: u } : {},
        ...S && !s.body ? { body: S } : {},
        ...B && !s.footer ? { footer: B } : {},
        ...ne && !s.header ? { header: ne } : {},
        ...!s.body && (g != null && g.text) ? { body: String(g.text) } : {},
        ...!s.footer && (v != null && v.text) ? { footer: String(v.text) } : {},
        ...!s.header && (j != null && j.text) ? { header: String(j.text) } : {}
      };
    }
    function te(s) {
      if (!s) return s;
      const o = G(s.message);
      return { ...s, message: o };
    }
    const le = p;
    function pe(s) {
      var g;
      const o = St(s, {
        exampleData: (g = de.value) == null ? void 0 : g.data
      });
      return {
        ...s,
        message: C(o.payload)
      };
    }
    const {
      campaign: N,
      dirty: se,
      customValidatorErrors: q,
      getValidationWithWarnings: me,
      update: M,
      updateMessage: K,
      undo: X,
      redo: ae,
      canUndo: ye,
      canRedo: xe,
      resetMessage: ee,
      hooks: f
    } = ct({
      initial: te(P.modelValue),
      hooks: {
        ...P.hooks,
        customValidators: async (s) => {
          var v;
          const o = [
            ...I(s),
            ...L(
              s,
              P.disabledTemplateCategories,
              P.disabledTemplateFormats
            )
          ], g = (v = P.hooks) != null && v.customValidators ? await P.hooks.customValidators(s) : [];
          return [...o, ...g];
        }
      },
      onDirty: () => le("change", pe(N.value))
    }), { lastSavedAt: R } = pt(N, { channel: "whatsapp" });
    function V(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ae() : X());
    }
    st(() => {
      window.addEventListener("keydown", V);
    }), lt(() => {
      window.removeEventListener("keydown", V);
    }), Le(N, (s) => le("update:modelValue", pe(s)), {
      deep: !0
    });
    const fe = ue(), oe = ue(!0);
    async function A() {
      if (f.estimateReach)
        try {
          fe.value = await f.estimateReach(N.value.audience);
        } catch {
          fe.value = void 0;
        }
      f.canSend && (oe.value = await Promise.resolve(f.canSend()));
    }
    A(), Le(() => N.value.audience, A, { deep: !0 });
    const W = w(() => (q.value, me(fe.value))), h = w(() => W.value.blockingErrors), ie = w(() => W.value.warnings), ke = w(() => W.value.valid), ve = w(() => {
      var v, j, S;
      const s = N.value.message, o = [
        !!((v = s.template_name) != null && v.trim()),
        !!((j = s.template_category) != null && j.trim()),
        !!(s.body ?? "").toString().trim(),
        !!((S = s.template_language) != null && S.trim()),
        Array.isArray(s.buttons) ? s.buttons.length > 0 : !1
      ], g = o.filter(Boolean).length;
      return Math.round(g / o.length * 100);
    }), _e = w(() => ve.value >= 90 ? "Production ready" : ve.value >= 70 ? "Strong draft" : ve.value >= 40 ? "In progress" : "Needs setup"), E = w(() => {
      const s = N.value.message;
      return !!((s.body ?? "").toString().trim() || (s.header ?? "").toString().trim() || s.media_url || s.flow_id || s.coupon_code || s.lto_expiry || s.voice_transcript || s.contact_name || s.link_title || s.order_title || Array.isArray(s.buttons) && s.buttons.length || Array.isArray(s.products) && s.products.length || Array.isArray(s.cards) && s.cards.length);
    }), Q = ue(""), J = ue(!1), $e = ue(null), be = w(
      () => new Set((P.disabledTemplateCategories ?? []).map((s) => String(s).trim().toLowerCase()))
    ), he = w(
      () => new Set((P.disabledTemplateFormats ?? []).map((s) => String(s).trim().toLowerCase()))
    ), Ue = w(
      () => mo.filter((s) => {
        var j;
        const o = ((j = s.campaign) == null ? void 0 : j.message) ?? {}, g = String(o.template_category ?? "").trim().toLowerCase(), v = String(o.template_type ?? "").trim().toLowerCase();
        return !(g && be.value.has(g) || v && he.value.has(v));
      })
    ), de = w(() => {
      const s = Q.value;
      return s ? Ze.find((o) => o.id === s) ?? null : null;
    }), Pe = w(() => {
      const s = N.value.message.body ?? "";
      return de.value ? Je(s, de.value.data) : s;
    }), Ne = w(() => {
      const s = N.value.message.header ?? "";
      return de.value ? Je(s, de.value.data) : s;
    }), qe = w(() => {
      var r;
      const s = N.value.message, o = s.template_type ?? "text", g = s.header_type ?? "none";
      let v, j, S, O, Y, _, u;
      (o === "image" || g === "image") && s.media_url ? v = { type: "image", url: s.media_url } : (o === "video" || g === "video") && s.media_url ? v = { type: "video", url: s.media_url } : o === "document" || g === "document" ? v = {
        type: "document",
        url: s.media_url || void 0,
        filename: s.document_filename || s.media_url || "document.pdf"
      } : g === "text" && s.header ? v = { type: "text", text: Ne.value } : s.header && (v = { type: "text", text: Ne.value });
      const B = Pe.value || "Start adding content to see a live preview here.";
      if (o === "location" && s.location) {
        const l = s.location, t = l.lat ?? l.latitude, z = l.lng ?? l.lon ?? l.longitude;
        t != null && z != null && (j = {
          lat: t,
          lng: z,
          name: l.name ?? l.title,
          address: l.address ?? `${t}, ${z}`
        });
      }
      (o === "catalog" || o === "mpm") && Array.isArray(s.products) && s.products.length && (S = !0, O = s.products.map((l) => ({
        image: l.image ?? l.imageUrl,
        name: l.name ?? l.sectionTitle ?? l.title ?? "Product",
        price: l.price ?? l.productId ?? ""
      }))), o === "carousel" && Array.isArray(s.cards) && s.cards.length && (S = !0, O = s.cards.map((l) => ({
        image: l.image ?? l.media_url,
        name: l.title ?? "Card",
        price: l.button_label ?? ""
      }))), o === "coupon" && s.coupon_code && (Y = { code: s.coupon_code }), o === "lto" && s.lto_expiry && (_ = s.lto_expiry), o === "auth" && (u = { code: s.auth_code ?? s.otp_code ?? "123 456" });
      const ne = s.buttons ?? [];
      return o === "flow" && ((r = s.flow_cta_label) != null && r.trim()) && ne.push({
        label: s.flow_cta_label
      }), {
        format: o,
        templateName: s.template_name || void 0,
        templateLanguage: s.template_language || void 0,
        templateCategory: s.template_category || void 0,
        header: v,
        body: B,
        mediaCaption: s.media_caption || void 0,
        footer: s.footer || void 0,
        buttons: ne.map((l) => ({ text: l.label || "Button", type: l.type, value: l.value })),
        location: j,
        catalog: S,
        multiProduct: O,
        coupon: Y,
        limitedOffer: _,
        auth: u,
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
        carouselCards: o === "carousel" && Array.isArray(s.cards) ? s.cards.map((l) => ({
          title: l.title || void 0,
          description: l.description || s.body || void 0,
          image: l.media_url || void 0,
          button: l.button_label || void 0
        })) : void 0,
        reactionEmoji: s.reaction_emoji || void 0,
        flow: o === "flow" ? {
          id: s.flow_id || void 0,
          ctaLabel: s.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Me(s) {
      var v;
      const o = N.value, g = T({
        ...s.campaign.message ? s.campaign.message : o.message,
        template_name: ((v = s.campaign.message) == null ? void 0 : v.template_name) ?? s.campaign.name ?? o.name ?? void 0
      });
      M({
        ...s.campaign,
        message: g
      }), $e.value = null, J.value = !1;
    }
    function He(s) {
      const o = s.target.value;
      if (!o) return;
      const g = Ue.value.find((v) => v.id === o);
      g && (se.value ? ($e.value = g, J.value = !0) : Me(g), s.target.value = "");
    }
    function Re(s) {
      M({
        name: s,
        message: { ...N.value.message, template_name: s || void 0 },
        tracking: { ...N.value.tracking ?? {}, campaign_name: s }
      });
    }
    function We(s) {
      const o = N.value.message, g = T({
        ...o,
        ...s ?? {}
      });
      if (K(g), Object.prototype.hasOwnProperty.call(s ?? {}, "template_name")) {
        const v = String((s == null ? void 0 : s.template_name) ?? "");
        v !== N.value.name && M({
          name: v,
          tracking: {
            ...N.value.tracking ?? {},
            campaign_name: v
          }
        });
      }
    }
    Le(
      () => N.value.name,
      (s) => {
        const o = String(N.value.message.template_name ?? "");
        (s || "") !== o && K({ template_name: s || void 0 });
      },
      { immediate: !0 }
    );
    function Ve(s) {
      const o = ` {{ .${s.variable} }}`, g = N.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, s.variable]));
      if (s.field === "title") {
        const j = N.value.message.header ?? "";
        K({
          variables: v,
          header: j + o
        });
      } else if (s.field === "footer") {
        const j = N.value.message.footer ?? "";
        K({
          variables: v,
          footer: j + o
        });
      } else {
        const j = N.value.message.body ?? "";
        K({
          variables: v,
          body: j + o
        });
      }
    }
    function re() {
      var g;
      if (!ke.value) return;
      const s = St(N.value, {
        exampleData: (g = de.value) == null ? void 0 : g.data
      }), o = pe(N.value);
      le("save-gupshup-template", s.payload, s.warnings, o), le("save", o);
    }
    return (s, o) => {
      var g;
      return a(), n("div", oc, [
        e("div", ic, [
          Oe(mt, {
            "campaign-name": $(N).name,
            status: $(N).status,
            dirty: $(se),
            "last-saved-at": $(R),
            "can-undo": $(ye),
            "can-redo": $(xe),
            "slugify-name": P.enforceSlugName,
            "onUpdate:campaignName": Re,
            onUndo: $(X),
            onRedo: $(ae)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          h.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: $(Ae).dangerBg,
              border: `1px solid ${$(Ae).dangerBorder}`,
              borderRadius: `${$(Qe).input}px`,
              padding: `${$(Ce)[12]}px ${$(Ce)[16]}px`,
              marginBottom: `${$(Ce)[16]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: $(Ae).danger })
            }, [
              (a(!0), n(U, null, D(h.value, (v) => (a(), n("li", {
                key: v.message
              }, c(v.message), 1))), 128))
            ], 4)
          ], 4)) : y("", !0)
        ]),
        e("div", rc, [
          e("aside", uc, [
            i.disabledSections.includes("whatsapp") ? y("", !0) : (a(), n("div", dc, [
              e("div", cc, [
                e("div", pc, [
                  o[6] || (o[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", mc, c(_e.value), 1)
                ]),
                e("div", vc, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: He
                  }, [
                    o[7] || (o[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, D(Ue.value, (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, bc))), 128))
                  ], 32)
                ]),
                e("div", yc, [
                  e("div", hc, [
                    o[8] || (o[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", gc, c(ve.value) + "%", 1)
                  ]),
                  e("div", fc, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: Se({ width: `${ve.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(Eu, {
                message: $(N).message,
                "show-reset": !0,
                "disabled-categories": i.disabledTemplateCategories,
                "disabled-formats": i.disabledTemplateFormats,
                "media-upload-url": i.mediaUploadUrl,
                "media-upload-headers": i.mediaUploadHeaders,
                onUpdate: We,
                onReset: o[0] || (o[0] = (v) => $(ee)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats", "media-upload-url", "media-upload-headers"]),
              Oe(Gt, {
                message: $(N).message,
                "variable-options": i.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: $(K),
                onInsertVariable: Ve
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", kc, [
            !i.designOnly && $(N).audience.test_mode ? (a(), n("div", _c, [...o[9] || (o[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : y("", !0),
            e("div", wc, [
              e("div", $c, [
                e("label", xc, [
                  o[11] || (o[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (v) => Q.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[10] || (o[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, D($(Ze), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Cc))), 128))
                  ], 512), [
                    [Ke, Q.value]
                  ])
                ]),
                e("div", Sc, [
                  o[12] || (o[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, c($(N).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: we(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !E.value }])
              }, [
                Oe(lc, { template: qe.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Ic, [
          ie.value.length > 0 ? (a(), n("div", Tc, [
            o[13] || (o[13] = e("strong", null, "Warning:", -1)),
            F(" " + c((g = ie.value[0]) == null ? void 0 : g.message) + " ", 1),
            ie.value.length > 1 ? (a(), n("span", Ac, " (+" + c(ie.value.length - 1) + " more) ", 1)) : y("", !0)
          ])) : y("", !0),
          e("div", Uc, [
            i.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: o[2] || (o[2] = (v) => le("duplicate", JSON.parse(JSON.stringify($(N)))))
            }, " Duplicate ")) : y("", !0),
            i.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: re
            }, " Save ")) : y("", !0),
            i.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: o[3] || (o[3] = (v) => le("edit"))
            }, " Close ")) : y("", !0)
          ])
        ]),
        J.value ? (a(), n("div", Rc, [
          e("div", Ec, [
            o[14] || (o[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[15] || (o[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Pc, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: o[4] || (o[4] = (v) => {
                  J.value = !1, $e.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: o[5] || (o[5] = (v) => $e.value && Me($e.value))
              }, " Replace ")
            ])
          ])
        ])) : y("", !0)
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Be(Bc, [["__scopeId", "data-v-e830eabf"]]), Lc = { class: "kb-section" }, Oc = { class: "kb-section__head" }, Nc = { class: "kb-field" }, Mc = ["value"], Vc = { class: "kb-field" }, Dc = { class: "kb-label" }, jc = { key: 0 }, Hc = { key: 1 }, Wc = { key: 2 }, qc = { class: "kb-field-with-var" }, Fc = ["value"], zc = { class: "kb-var-picker-wrap" }, Yc = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Kc = ["onClick"], Gc = {
  key: 0,
  class: "kb-truncation-hint"
}, Jc = { class: "kb-field" }, Qc = { class: "kb-insert-row" }, Xc = ["value"], Zc = { class: "kb-field" }, ep = { class: "kb-insert-row" }, tp = /* @__PURE__ */ Ee({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    const m = i, b = p, k = [
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
    ], C = ue(m.variableOptions && m.variableOptions.length ? [...m.variableOptions] : k), T = ue(C.value[0] ?? k[0]), I = ue("");
    Le(
      () => m.variableOptions,
      (K) => {
        K && K.length && (C.value = [...K], C.value.includes(T.value) || (T.value = C.value[0]));
      }
    );
    const L = w(() => m.message.body ?? ""), P = ue(null), G = w(() => L.value.length), te = w(() => G.value ? G.value <= 160 ? 1 : Math.ceil(G.value / 153) : 0), le = w(() => {
      const K = G.value;
      return K <= 160 ? null : K <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function pe(K) {
      const X = K.target.value;
      b("update", {
        sender_id: X || void 0
      });
    }
    function N(K) {
      const X = K.target.value;
      b("update", {
        body: X
      });
    }
    function se() {
      const K = T.value;
      if (!K) return;
      const X = ` {{ .${K} }}`, ae = L.value || "", ye = m.message.variables ?? [], xe = Array.from(/* @__PURE__ */ new Set([...ye, K]));
      b("update", {
        body: ae + X,
        variables: xe
      });
    }
    function q(K) {
      P.value = P.value === K ? null : K;
    }
    function me(K, X) {
      const ae = ` {{ .${X} }}`, ye = L.value || "", xe = m.message.variables ?? [], ee = Array.from(/* @__PURE__ */ new Set([...xe, X]));
      b("update", {
        body: ye + ae,
        variables: ee
      }), P.value = null;
    }
    function M() {
      const K = I.value.trim();
      K && (C.value.includes(K) || (C.value = [...C.value, K]), T.value = K, I.value = "");
    }
    return (K, X) => (a(), n("section", Lc, [
      e("div", Oc, [
        X[4] || (X[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        i.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: X[0] || (X[0] = (ae) => K.$emit("reset"))
        }, " Reset section ")) : y("", !0)
      ]),
      X[11] || (X[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Nc, [
        X[5] || (X[5] = e("label", { class: "kb-label" }, [
          F(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: m.message.sender_id ?? "",
          onInput: pe
        }, null, 40, Mc)
      ]),
      e("div", Vc, [
        e("label", Dc, [
          X[6] || (X[6] = F(" Message body ", -1)),
          e("span", {
            class: we(["kb-counter", { "kb-counter--warn": te.value > 3 }])
          }, [
            F(c(G.value) + " chars · ", 1),
            te.value === 0 ? (a(), n("span", jc, "0 segments")) : te.value === 1 ? (a(), n("span", Hc, "1 segment")) : (a(), n("span", Wc, c(te.value) + " segments", 1))
          ], 2)
        ]),
        e("div", qc, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: L.value,
            onInput: N
          }, null, 40, Fc),
          e("div", zc, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: X[1] || (X[1] = (ae) => q("body"))
            }, "{{ .var }}"),
            P.value === "body" ? (a(), n("div", Yc, [
              (a(!0), n(U, null, D(C.value, (ae) => (a(), n("button", {
                key: `sms-body-var-${ae}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (ye) => me("body", ae)
              }, c(ae), 9, Kc))), 128))
            ])) : y("", !0)
          ])
        ]),
        X[7] || (X[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        le.value ? (a(), n("p", Gc, c(le.value), 1)) : y("", !0)
      ]),
      e("div", Jc, [
        X[8] || (X[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Qc, [
          je(e("select", {
            "onUpdate:modelValue": X[2] || (X[2] = (ae) => T.value = ae),
            class: "kb-select"
          }, [
            (a(!0), n(U, null, D(C.value, (ae) => (a(), n("option", {
              key: ae,
              value: ae
            }, c(ae), 9, Xc))), 128))
          ], 512), [
            [Ke, T.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: se
          }, " Insert into message ")
        ]),
        X[9] || (X[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Zc, [
        X[10] || (X[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", ep, [
          je(e("input", {
            "onUpdate:modelValue": X[3] || (X[3] = (ae) => I.value = ae),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [ut, I.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: M
          }, " Add ")
        ])
      ])
    ]));
  }
}), ap = /* @__PURE__ */ Be(tp, [["__scopeId", "data-v-68a73354"]]), np = { class: "keos-sms-builder" }, sp = { class: "kb-builder-top" }, lp = { class: "kb-sms-layout" }, op = { class: "kb-sms-sidebar" }, ip = {
  key: 0,
  class: "kb-sms-form"
}, rp = { class: "kb-sms-form-head" }, up = { class: "kb-sms-form-head-top" }, dp = { class: "kb-sms-health-pill" }, cp = { class: "kb-wa-form-head-row" }, pp = ["value"], mp = { class: "kb-sms-health" }, vp = { class: "kb-sms-health-row" }, bp = { class: "kb-sms-health-value" }, yp = { class: "kb-sms-health-bar" }, hp = { class: "kb-sms-canvas" }, gp = {
  key: 0,
  class: "kb-sms-test-banner"
}, fp = { class: "kb-sms-preview-chrome" }, kp = { class: "kb-push-preview-controls" }, _p = { class: "kb-push-preview-as" }, wp = ["value"], $p = { class: "kb-preview-status" }, xp = { class: "kb-preview" }, Cp = { class: "kb-sms-preview" }, Sp = { class: "kb-sms-phone" }, Ip = { class: "kb-sms-header" }, Tp = { class: "kb-sms-sender-avatar" }, Ap = { class: "kb-sms-header-copy" }, Up = { class: "kb-sms-sender" }, Rp = { class: "kb-sms-meta" }, Ep = { class: "kb-sms-thread" }, Pp = {
  key: 0,
  class: "kb-sms-empty"
}, Bp = { class: "kb-sms-text" }, Lp = { class: "kb-sms-bubble-meta" }, Op = {
  key: 0,
  class: "kb-sms-segment-chip"
}, Np = {
  key: 0,
  class: "kb-sms-more-segments"
}, Mp = { class: "kb-sms-delivery-line" }, Vp = { class: "kb-sms-counter" }, Dp = { key: 0 }, jp = { key: 1 }, Hp = { key: 2 }, Wp = {
  key: 3,
  class: "kb-sms-cost"
}, qp = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Fp = { class: "kb-sms-actions" }, zp = {
  key: 0,
  class: "kb-actions-note"
}, Yp = { key: 0 }, Kp = { class: "kb-sms-actions-right" }, Gp = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Jp = { class: "kb-confirm-dialog" }, Qp = { class: "kb-confirm-actions" }, Xp = /* @__PURE__ */ Ee({
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
    const m = i, b = p, {
      campaign: k,
      dirty: C,
      customValidatorErrors: T,
      getValidationWithWarnings: I,
      update: L,
      updateMessage: P,
      undo: G,
      redo: te,
      canUndo: le,
      canRedo: pe,
      resetMessage: N,
      hooks: se
    } = ct({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (re) => {
          var g, v;
          const s = [];
          (g = re.name) != null && g.trim() || s.push("Template name is required");
          const o = (v = m.hooks) != null && v.customValidators ? await m.hooks.customValidators(re) : [];
          return [...s, ...o];
        }
      },
      onDirty: () => b("change", k.value)
    }), { lastSavedAt: q } = pt(k, { channel: "sms" });
    function me(re) {
      (re.metaKey || re.ctrlKey) && re.key === "z" && (re.preventDefault(), re.shiftKey ? te() : G());
    }
    st(() => {
      window.addEventListener("keydown", me);
    }), lt(() => {
      window.removeEventListener("keydown", me);
    }), Le(k, (re) => b("update:modelValue", re), { deep: !0 });
    const M = ue(), K = ue(!0);
    async function X() {
      if (se.estimateReach)
        try {
          M.value = await se.estimateReach(k.value.audience);
        } catch {
          M.value = void 0;
        }
      se.canSend && (K.value = await Promise.resolve(se.canSend()));
    }
    X(), Le(() => k.value.audience, X, { deep: !0 });
    const ae = w(() => (T.value, I(M.value))), ye = w(() => ae.value.blockingErrors), xe = w(() => ae.value.warnings), ee = w(() => ae.value.valid), f = w(() => {
      var g, v, j;
      const re = k.value.message, s = [
        !!((g = k.value.name) != null && g.trim()),
        !!((v = re.body) != null && v.trim()),
        !!((j = re.sender_id) != null && j.trim()),
        !!k.value.template_type,
        (re.body ?? "").length > 20
      ], o = s.filter(Boolean).length;
      return Math.round(o / s.length * 100);
    }), R = w(() => f.value >= 90 ? "Production ready" : f.value >= 70 ? "Strong draft" : f.value >= 40 ? "In progress" : "Needs setup"), V = w(() => !!Q.value.trim()), fe = w(
      () => k.value.template_type ?? "transactional"
    ), oe = ue(""), A = ue(!1), W = ue(null), h = w(() => {
      const re = oe.value;
      return re ? Ze.find((s) => s.id === re) ?? null : null;
    }), ie = w(() => {
      const re = Q.value;
      return h.value ? Je(re, h.value.data) : re;
    });
    function ke(re) {
      const s = k.value, o = re.campaign.message ? { ...s.message, ...re.campaign.message } : s.message;
      L({
        ...re.campaign,
        message: o
      }), W.value = null, A.value = !1;
    }
    function ve(re) {
      const s = re.target.value;
      if (!s) return;
      const o = Rt.find((g) => g.id === s);
      o && (C.value ? (W.value = o, A.value = !0) : ke(o), re.target.value = "");
    }
    function _e(re) {
      L({ template_type: re });
    }
    function E(re) {
      L({
        name: re,
        tracking: { ...k.value.tracking ?? {}, campaign_name: re }
      });
    }
    const Q = w(
      () => (k.value.message.body ?? "") || ""
    ), J = w(() => Q.value.length), $e = w(() => /[^\x00-\x7f]/.test(Q.value)), be = w(() => $e.value ? 70 : 160), he = w(() => $e.value ? 67 : 153), Ue = w(() => J.value ? J.value <= be.value ? 1 : Math.ceil(J.value / he.value) : 0), de = w(() => {
      const re = ie.value.trim();
      if (!re) return [];
      const s = Ue.value <= 1 ? be.value : he.value, o = [];
      for (let g = 0; g < re.length; g += s)
        o.push(re.slice(g, g + s));
      return o;
    }), Pe = w(() => de.value.slice(0, 3)), Ne = w(
      () => Math.max(0, de.value.length - Pe.value.length)
    ), qe = w(() => $e.value ? "Unicode" : "GSM-7"), Me = w(() => V.value ? Ue.value > 3 ? "Queued" : "Delivered" : "Draft"), He = w(() => {
      const re = m.costPerSegment ?? 0;
      return !re || Ue.value === 0 ? null : (Ue.value * re).toFixed(2);
    }), Re = w(() => {
      const re = J.value, s = be.value + he.value;
      return re <= be.value ? null : re <= s ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), We = w(
      () => k.value.message.sender_id ?? "YourBrand"
    );
    function Ve() {
      ee.value && b("save", k.value);
    }
    return (re, s) => {
      var o;
      return a(), n("div", np, [
        e("div", sp, [
          Oe(mt, {
            "campaign-name": $(k).name,
            status: $(k).status,
            dirty: $(C),
            "last-saved-at": $(q),
            "can-undo": $(le),
            "can-redo": $(pe),
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": E,
            onUndo: $(G),
            onRedo: $(te)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ye.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: $(Ae).dangerBg,
              border: `1px solid ${$(Ae).dangerBorder}`,
              borderRadius: `${$(Qe).input}px`,
              padding: `${$(Ce)[12]}px ${$(Ce)[16]}px`,
              marginBottom: `${$(Ce)[16]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: $(Ae).danger })
            }, [
              (a(!0), n(U, null, D(ye.value, (g) => (a(), n("li", {
                key: g.message
              }, c(g.message), 1))), 128))
            ], 4)
          ], 4)) : y("", !0)
        ]),
        e("div", lp, [
          e("aside", op, [
            i.disabledSections.includes("sms") ? y("", !0) : (a(), n("div", ip, [
              e("div", rp, [
                e("div", up, [
                  s[6] || (s[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", dp, c(R.value), 1)
                ]),
                e("div", cp, [
                  Oe(_t, {
                    "template-type": fe.value,
                    onUpdate: _e
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: ve
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, D($(Rt), (g) => (a(), n("option", {
                      key: g.id,
                      value: g.id
                    }, c(g.label), 9, pp))), 128))
                  ], 32)
                ]),
                e("div", mp, [
                  e("div", vp, [
                    s[8] || (s[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", bp, c(f.value) + "%", 1)
                  ]),
                  e("div", yp, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: Se({ width: `${f.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(ap, {
                message: $(k).message,
                "variable-options": i.variableOptions,
                "show-reset": !0,
                onUpdate: $(P),
                onReset: s[0] || (s[0] = (g) => $(N)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", hp, [
            !i.designOnly && $(k).audience.test_mode ? (a(), n("div", gp, [...s[9] || (s[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : y("", !0),
            e("div", fp, [
              e("div", kp, [
                e("label", _p, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (g) => oe.value = g),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, D($(Ze), (g) => (a(), n("option", {
                      key: g.id,
                      value: g.id
                    }, c(g.label), 9, wp))), 128))
                  ], 512), [
                    [Ke, oe.value]
                  ])
                ]),
                e("div", $p, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, c(Ue.value || 0), 1)
                ])
              ]),
              e("div", {
                class: we(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !V.value }])
              }, [
                e("div", xp, [
                  e("div", Cp, [
                    e("div", Sp, [
                      s[15] || (s[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Ip, [
                        e("div", Tp, c(We.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Ap, [
                          e("div", Up, c(We.value), 1),
                          e("div", Rp, "Text message · " + c(Me.value), 1)
                        ])
                      ]),
                      e("div", Ep, [
                        V.value ? (a(), n(U, { key: 1 }, [
                          (a(!0), n(U, null, D(Pe.value, (g, v) => (a(), n("div", {
                            key: `${v}-${g.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", Bp, c(g), 1),
                            e("span", Lp, [
                              s[13] || (s[13] = F(" 09:21 ", -1)),
                              Pe.value.length > 1 ? (a(), n("span", Op, "Part " + c(v + 1), 1)) : y("", !0)
                            ])
                          ]))), 128)),
                          Ne.value > 0 ? (a(), n("div", Np, " +" + c(Ne.value) + " more segments ", 1)) : y("", !0),
                          e("div", Mp, [
                            s[14] || (s[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            F(" " + c(Me.value), 1)
                          ])
                        ], 64)) : (a(), n("div", Pp, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Vp, [
                      F(c(J.value) + " characters · ", 1),
                      Ue.value === 0 ? (a(), n("span", Dp, "0 segments")) : Ue.value === 1 ? (a(), n("span", jp, "1 segment")) : (a(), n("span", Hp, c(Ue.value) + " segments", 1)),
                      F(" (" + c(be.value) + " chars single, " + c(he.value) + " multi-part · " + c(qe.value) + ") ", 1),
                      He.value !== null ? (a(), n("span", Wp, " · Est. " + c(He.value), 1)) : y("", !0)
                    ]),
                    Re.value ? (a(), n("p", qp, c(Re.value), 1)) : y("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Fp, [
          xe.value.length > 0 ? (a(), n("div", zp, [
            s[16] || (s[16] = e("strong", null, "Warning:", -1)),
            F(" " + c((o = xe.value[0]) == null ? void 0 : o.message) + " ", 1),
            xe.value.length > 1 ? (a(), n("span", Yp, " (+" + c(xe.value.length - 1) + " more) ", 1)) : y("", !0)
          ])) : y("", !0),
          e("div", Kp, [
            i.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: s[2] || (s[2] = (g) => b("duplicate", JSON.parse(JSON.stringify($(k)))))
            }, " Duplicate ")) : y("", !0),
            i.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Ve
            }, " Save ")) : y("", !0),
            i.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: s[3] || (s[3] = (g) => b("edit"))
            }, " Close ")) : y("", !0)
          ])
        ]),
        A.value ? (a(), n("div", Gp, [
          e("div", Jp, [
            s[17] || (s[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[18] || (s[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Qp, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: s[4] || (s[4] = (g) => {
                  A.value = !1, W.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: s[5] || (s[5] = (g) => W.value && ke(W.value))
              }, " Replace ")
            ])
          ])
        ])) : y("", !0)
      ]);
    };
  }
}), Zt = /* @__PURE__ */ Be(Xp, [["__scopeId", "data-v-5e442b56"]]), Zp = 30, em = 60, tm = 130;
function am(i) {
  const p = (i ?? "").trim().length;
  return p < Zp ? "too_short" : p <= em ? "good" : "too_long";
}
function nm(i) {
  const p = (i ?? "").trim().length;
  return p === 0 ? "too_short" : p <= tm ? "good" : "too_long";
}
const sm = [
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
  for (const m of sm) {
    const b = i.match(m);
    b && p.push(b[0]);
  }
  return p;
}
function lm(i) {
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
function om(i) {
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
const im = { class: "em-section" }, rm = { class: "em-strip kb-section" }, um = { class: "em-strip-head" }, dm = { class: "em-field kb-field" }, cm = { class: "em-input-group em-input-group--overlay" }, pm = ["value"], mm = { class: "em-var-picker-wrap" }, vm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, bm = ["onClick"], ym = { class: "em-field kb-field" }, hm = ["value"], gm = { class: "em-field kb-field" }, fm = ["value"], km = { class: "em-field kb-field" }, _m = { class: "em-input-group em-input-group--overlay" }, wm = ["value"], $m = { class: "em-var-picker-wrap" }, xm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Cm = ["onClick"], Sm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Im = ["onClick"], Tm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Am = { class: "em-field kb-field" }, Um = { class: "em-input-group" }, Rm = ["value"], Em = { class: "em-var-picker-wrap" }, Pm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Bm = ["onClick"], Lm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Om = ["onClick"], Nm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Mm = { class: "em-strip kb-section em-strip--library" }, Vm = { class: "em-library-chips" }, Dm = ["onClick"], jm = { class: "em-strip kb-section em-strip--blocks" }, Hm = { class: "em-block-list" }, Wm = ["data-type"], qm = { class: "em-block-bar" }, Fm = { class: "em-block-type" }, zm = { class: "em-block-actions" }, Ym = ["disabled", "onClick"], Km = ["disabled", "onClick"], Gm = ["onClick"], Jm = {
  key: 0,
  class: "em-block-fields"
}, Qm = ["value", "onChange"], Xm = ["value", "onInput"], Zm = { class: "em-var-picker-wrap" }, ev = ["onClick"], tv = ["onClick"], av = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, nv = ["onClick"], sv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, lv = ["onClick"], ov = {
  key: 1,
  class: "em-block-fields"
}, iv = ["value", "onInput"], rv = { class: "em-var-picker-wrap" }, uv = ["onClick"], dv = ["onClick"], cv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, pv = ["onClick"], mv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, vv = ["onClick"], bv = {
  key: 2,
  class: "em-block-fields"
}, yv = ["value", "onInput"], hv = ["value", "onInput"], gv = { class: "em-var-picker-wrap" }, fv = ["onClick"], kv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, _v = ["onClick"], wv = ["value", "onInput"], $v = {
  key: 3,
  class: "em-block-fields"
}, xv = ["value", "onInput"], Cv = { class: "em-var-picker-wrap" }, Sv = ["onClick"], Iv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Tv = ["onClick"], Av = ["value", "onInput"], Uv = { class: "em-block-fields--row" }, Rv = ["value", "onInput"], Ev = { class: "em-check-row" }, Pv = ["checked", "onChange"], Bv = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, Lv = ["value", "onInput"], Ov = {
  key: 5,
  class: "em-block-fields"
}, Nv = ["value", "onInput"], Mv = ["value", "onInput"], Vv = ["value", "onInput"], Dv = { class: "em-var-picker-wrap" }, jv = ["onClick"], Hv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Wv = ["onClick"], qv = { class: "em-var-picker-wrap" }, Fv = ["onClick"], zv = ["onClick"], Yv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Kv = ["onClick"], Gv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Jv = ["onClick"], Qv = {
  key: 6,
  class: "em-block-fields"
}, Xv = ["value", "onChange"], Zv = { class: "em-list-items" }, eb = ["value", "onInput", "placeholder"], tb = { class: "em-var-picker-wrap" }, ab = ["onClick"], nb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, sb = ["onClick"], lb = ["onClick"], ob = ["onClick"], ib = {
  key: 7,
  class: "em-block-fields"
}, rb = ["value", "onChange"], ub = ["value", "onInput"], db = { class: "em-var-picker-wrap" }, cb = ["onClick"], pb = ["onClick"], mb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, vb = ["onClick"], bb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, yb = ["onClick"], hb = {
  key: 8,
  class: "em-block-fields"
}, gb = { class: "em-social-links" }, fb = ["value", "onChange"], kb = ["value", "onInput"], _b = ["onClick"], wb = ["onClick"], $b = {
  key: 9,
  class: "em-block-fields"
}, xb = ["value", "onInput"], Cb = ["value", "onInput"], Sb = ["value", "onInput"], Ib = { class: "em-var-picker-wrap" }, Tb = ["onClick"], Ab = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ub = ["onClick"], Rb = {
  key: 10,
  class: "em-block-fields"
}, Eb = ["value", "onInput"], Pb = { class: "em-link-list-items" }, Bb = ["value", "onInput"], Lb = { class: "em-var-picker-wrap" }, Ob = ["onClick"], Nb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Mb = ["onClick"], Vb = ["value", "onInput"], Db = ["onClick"], jb = ["onClick"], Hb = {
  key: 11,
  class: "em-block-fields"
}, Wb = ["value", "onInput"], qb = { class: "em-var-picker-wrap" }, Fb = ["onClick"], zb = ["onClick"], Yb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Kb = ["onClick"], Gb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Jb = ["onClick"], Qb = ["value", "onInput"], Xb = { class: "em-var-picker-wrap" }, Zb = ["onClick"], ey = ["onClick"], ty = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ay = ["onClick"], ny = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, sy = ["onClick"], ly = {
  key: 12,
  class: "em-block-fields"
}, oy = { class: "em-block-fields--row" }, iy = ["value", "onInput"], ry = { class: "em-block-fields--row" }, uy = ["value", "onInput"], dy = ["value", "onChange"], cy = {
  key: 13,
  class: "em-block-fields"
}, py = ["value", "onChange"], my = { class: "em-inline-label" }, vy = ["value", "onInput"], by = { class: "em-var-picker-wrap" }, yy = ["onClick"], hy = ["onClick"], gy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, fy = ["onClick"], ky = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, _y = ["onClick"], wy = {
  key: 14,
  class: "em-block-fields"
}, $y = ["value", "onInput"], xy = { class: "em-link-list-items" }, Cy = ["value", "onInput"], Sy = { class: "em-var-picker-wrap" }, Iy = ["onClick"], Ty = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ay = ["onClick"], Uy = ["value", "onInput"], Ry = ["onClick"], Ey = ["onClick"], Py = {
  key: 15,
  class: "em-block-fields"
}, By = ["value", "onInput"], Ly = { class: "em-var-picker-wrap" }, Oy = ["onClick"], Ny = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, My = ["onClick"], Vy = ["value", "onInput"], Dy = { class: "em-var-picker-wrap" }, jy = ["onClick"], Hy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Wy = ["onClick"], qy = ["onClick"], Fy = ["onClick"], zy = {
  key: 16,
  class: "em-block-fields"
}, Yy = ["value", "onInput"], Ky = ["value", "onInput"], Gy = ["value", "onInput"], Jy = ["onClick"], Qy = ["onClick"], Xy = {
  key: 17,
  class: "em-block-fields"
}, Zy = ["value", "onInput"], eh = { class: "em-var-picker-wrap" }, th = ["onClick"], ah = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, nh = ["onClick"], sh = ["value", "onInput"], lh = {
  key: 18,
  class: "em-block-fields"
}, oh = ["value", "onInput"], ih = ["value", "onInput"], rh = { class: "em-var-picker-wrap" }, uh = ["onClick"], dh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ch = ["onClick"], ph = ["value", "onInput"], mh = { class: "em-var-picker-wrap" }, vh = ["onClick"], bh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, yh = ["onClick"], hh = ["value", "onInput"], gh = { class: "em-var-picker-wrap" }, fh = ["onClick"], kh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, _h = ["onClick"], wh = ["value", "onInput"], $h = {
  key: 19,
  class: "em-block-fields"
}, xh = ["value", "onInput"], Ch = { class: "em-var-picker-wrap" }, Sh = ["onClick"], Ih = ["onClick"], Th = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ah = ["onClick"], Uh = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Rh = ["onClick"], Eh = {
  key: 20,
  class: "em-block-fields"
}, Ph = ["value", "onInput"], Bh = { class: "em-var-picker-wrap" }, Lh = ["onClick"], Oh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Nh = ["onClick"], Mh = ["value", "onInput"], Vh = { class: "em-var-picker-wrap" }, Dh = ["onClick"], jh = ["onClick"], Hh = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Wh = ["onClick"], qh = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Fh = ["onClick"], zh = {
  key: 21,
  class: "em-block-fields"
}, Yh = ["value", "onInput"], Kh = { class: "em-block-fields--row" }, Gh = ["value", "onInput"], Jh = {
  key: 22,
  class: "em-block-fields"
}, Qh = ["value", "onInput"], Xh = ["value", "onInput"], Zh = { class: "em-var-picker-wrap" }, eg = ["onClick"], tg = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ag = ["onClick"], ng = ["value", "onInput"], sg = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, lg = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, og = ["onClick"], ig = ["onClick"], rg = ["onClick"], ug = { class: "em-check-row" }, dg = ["checked", "onChange"], cg = { class: "em-add-bar kb-field kb-field--add-bar" }, pg = { class: "em-add-bar-btns" }, mg = { class: "em-strip kb-section em-strip--personalize" }, vg = { class: "em-field kb-field" }, bg = { class: "em-input-group" }, yg = ["value"], hg = { class: "em-field kb-field" }, gg = { class: "em-input-group" }, Fe = "{{ .var }}", fg = /* @__PURE__ */ Ee({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: p }) {
    var ne;
    function m() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const b = [
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
    function C(r) {
      switch (r) {
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
          return { id: m(), type: "social", links: b.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
    const T = i, I = p, L = [
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
    ], P = ue(
      (ne = T.variableOptions) != null && ne.length ? [...T.variableOptions] : L
    ), G = ue(P.value[0] ?? "first_name"), te = ue("");
    Le(
      () => T.variableOptions,
      (r) => {
        r != null && r.length && (P.value = [...r], P.value.includes(G.value) || (G.value = P.value[0]));
      }
    );
    const le = w(() => T.message.subject ?? ""), pe = w(() => T.message.preview_text ?? ""), N = w(() => am(le.value)), se = w(() => nm(pe.value)), q = w(() => Vt(le.value)), me = w(() => Vt(pe.value)), M = w(() => {
      const r = T.message.blocks;
      return Array.isArray(r) && r.length > 0 ? r : [C("paragraph")];
    });
    Le(
      () => T.message.blocks,
      (r) => {
        (!Array.isArray(r) || r.length === 0) && I("update", { blocks: [C("paragraph")] });
      },
      { immediate: !0 }
    );
    function K(r) {
      I("update", { blocks: r });
    }
    function X(r) {
      I("update", { subject: r.target.value });
    }
    function ae(r) {
      const l = r.target.value;
      I("update", { preview_text: l || void 0 });
    }
    function ye(r) {
      I("update", { from_name: r.target.value || void 0 });
    }
    function xe(r) {
      I("update", { from_address: r.target.value || void 0 });
    }
    function ee(r) {
      I("update", { reply_to: r.target.value || void 0 });
    }
    const f = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [C("heading"), C("paragraph"), C("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [C("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [C("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [C("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [C("social"), C("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [C("footer"), C("link_list")]
      }
    ];
    function R(r) {
      const l = r.blocks();
      K([...M.value, ...l]);
    }
    function V(r) {
      const l = [...M.value, C(r)];
      K(l);
    }
    function fe(r) {
      K(M.value.filter((l) => l.id !== r));
    }
    function oe(r, l) {
      const t = M.value.findIndex((x) => x.id === r);
      if (t < 0) return;
      const z = l === "up" ? t - 1 : t + 1;
      if (z < 0 || z >= M.value.length) return;
      const d = [...M.value];
      [d[t], d[z]] = [d[z], d[t]], K(d);
    }
    function A(r, l) {
      const t = M.value.map((z) => z.id === r ? { ...z, ...l } : z);
      K(t);
    }
    function W(r, l, t) {
      const z = M.value.find((x) => x.id === r);
      if (!z || z.type !== "list") return;
      const d = [...z.items || []];
      d[l] = t, A(r, { items: d });
    }
    function h(r) {
      const l = M.value.find((t) => t.id === r);
      !l || l.type !== "list" || A(r, { items: [...l.items || [], "New item"] });
    }
    function ie(r, l) {
      const t = M.value.find((d) => d.id === r);
      if (!t || t.type !== "list") return;
      const z = (t.items || []).filter((d, x) => x !== l);
      A(r, { items: z });
    }
    function ke(r, l, t, z) {
      const d = M.value.find((H) => H.id === r);
      if (!d || d.type !== "social") return;
      const x = (d.links || []).map((H, Te) => Te === l ? { ...H, [t]: z } : H);
      A(r, { links: x });
    }
    function ve(r) {
      const l = M.value.find((t) => t.id === r);
      !l || l.type !== "social" || A(r, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function _e(r, l) {
      const t = M.value.find((d) => d.id === r);
      if (!t || t.type !== "social") return;
      const z = (t.links || []).filter((d, x) => x !== l);
      A(r, { links: z });
    }
    function E(r, l, t, z) {
      const d = M.value.find((H) => H.id === r);
      if (!d || d.type !== "link_list") return;
      const x = (d.links || []).map((H, Te) => Te === l ? { ...H, [t]: z } : H);
      A(r, { links: x });
    }
    function Q(r) {
      const l = M.value.find((t) => t.id === r);
      !l || l.type !== "link_list" || A(r, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function J(r, l) {
      const t = M.value.find((d) => d.id === r);
      if (!t || t.type !== "link_list") return;
      const z = (t.links || []).filter((d, x) => x !== l);
      A(r, { links: z });
    }
    function $e(r, l) {
      const t = M.value.find((z) => z.id === r);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const z = [...t.cells || []];
          for (; z.length < l.columnCount; ) z.push("Cell content");
          l.cells = z.slice(0, l.columnCount);
        }
        A(r, l);
      }
    }
    function be(r, l, t) {
      const z = M.value.find((x) => x.id === r);
      if (!z || z.type !== "row") return;
      const d = [...z.cells || []];
      d[l] = t, A(r, { cells: d });
    }
    function he(r, l, t, z) {
      const d = M.value.find((H) => H.id === r);
      if (!d || d.type !== "navbar") return;
      const x = (d.links || []).map((H, Te) => Te === l ? { ...H, [t]: z } : H);
      A(r, { links: x });
    }
    function Ue(r) {
      const l = M.value.find((t) => t.id === r);
      !l || l.type !== "navbar" || A(r, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function de(r, l) {
      const t = M.value.find((z) => z.id === r);
      !t || t.type !== "navbar" || A(r, { links: (t.links || []).filter((z, d) => d !== l) });
    }
    function Pe(r, l, t, z) {
      const d = M.value.find((H) => H.id === r);
      if (!d || d.type !== "accordion") return;
      const x = (d.items || []).map((H, Te) => Te === l ? { ...H, [t]: z } : H);
      A(r, { items: x });
    }
    function Ne(r) {
      const l = M.value.find((t) => t.id === r);
      !l || l.type !== "accordion" || A(r, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function qe(r, l) {
      const t = M.value.find((z) => z.id === r);
      !t || t.type !== "accordion" || A(r, { items: (t.items || []).filter((z, d) => d !== l) });
    }
    function Me(r, l, t, z) {
      const d = M.value.find((H) => H.id === r);
      if (!d || d.type !== "carousel") return;
      const x = (d.slides || []).map((H, Te) => Te === l ? { ...H, [t]: z } : H);
      A(r, { slides: x });
    }
    function He(r) {
      const l = M.value.find((t) => t.id === r);
      !l || l.type !== "carousel" || A(r, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Re(r, l) {
      const t = M.value.find((z) => z.id === r);
      !t || t.type !== "carousel" || A(r, { slides: (t.slides || []).filter((z, d) => d !== l) });
    }
    function We(r, l = G.value) {
      const t = ` {{ .${l} }}`, z = T.message.variables ?? [], d = Array.from(/* @__PURE__ */ new Set([...z, l]));
      r === "subject" ? I("update", {
        subject: (le.value || "") + t,
        variables: d
      }) : I("update", {
        preview_text: (pe.value || "") + t,
        variables: d
      });
    }
    function Ve(r, l = G.value) {
      const t = M.value.find((ze) => ze.id === r);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const z = ` {{ .${l} }}`, d = T.message.variables ?? [], x = Array.from(/* @__PURE__ */ new Set([...d, l])), H = (t.type === "footer", "content"), et = (t[H] ?? "") + z, at = M.value.map(
        (ze) => ze.id === r ? { ...ze, [H]: et } : ze
      );
      I("update", { blocks: at, variables: x });
    }
    function re(r, l, t = G.value) {
      const z = M.value.find((et) => et.id === r);
      if (!z || z.type !== "row") return;
      const d = ` {{ .${t} }}`, x = T.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...x, t])), Te = [...z.cells || []];
      Te[l] = (Te[l] || "") + d, A(r, { cells: Te }), I("update", { variables: H });
    }
    function s(r, l, t = G.value) {
      const z = M.value.find((ze) => ze.id === r);
      if (!z || z.type !== "columns") return;
      const d = ` {{ .${t} }}`, x = T.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...x, t])), Te = l === "left" ? "leftContent" : "rightContent", at = (z[Te] ?? "") + d;
      A(r, { [Te]: at }), I("update", { variables: H });
    }
    const o = ue(null), g = ue(null), v = [
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
    function j(r) {
      o.value = o.value === r ? null : r;
    }
    function S(r, l) {
      if (l) {
        if (r === "subject") We("subject", l);
        else if (r === "preview") We("preview", l);
        else if (r.startsWith("block:")) Ve(r.slice(6), l);
        else if (r.startsWith("col-left:")) s(r.slice(9), "left", l);
        else if (r.startsWith("col-right:")) s(r.slice(10), "right", l);
        else if (r.startsWith("row:")) {
          const [, t, z] = r.split(":");
          re(t, Number(z), l);
        }
        o.value = null;
      }
    }
    function O(r) {
      g.value = g.value === r ? null : r;
    }
    function Y(r, l) {
      return `${String(r ?? "")}${l}`;
    }
    function _(r, l) {
      var z, d;
      if (!l) return;
      const t = M.value.find((x) => x.id === r);
      if (t) {
        switch (t.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            A(r, { content: `${String(t.content ?? "")}${l}` });
            break;
          case "button":
            A(r, { text: `${String(t.text ?? "")}${l}` });
            break;
          case "image":
            A(r, { alt: `${String(t.alt ?? "")}${l}` });
            break;
          case "video":
            A(r, { caption: `${String(t.caption ?? "")}${l}` });
            break;
          case "columns":
            A(r, { leftContent: `${String(t.leftContent ?? "")}${l}` });
            break;
          case "row": {
            const x = (Array.isArray(t.cells) ? [...t.cells] : []).map((H) => String(H ?? ""));
            x.length === 0 && x.push(""), x[0] = `${String(x[0] ?? "")}${l}`, A(r, { cells: x });
            break;
          }
          case "navbar":
          case "link_list": {
            const x = Array.isArray(t.links) ? [...t.links] : [];
            x.length || x.push({ text: "", url: "" }), x[0] = { ...x[0], text: `${String(((z = x[0]) == null ? void 0 : z.text) ?? "")}${l}` }, A(r, { links: x });
            break;
          }
          case "accordion": {
            const x = Array.isArray(t.items) ? [...t.items] : [];
            x.length || x.push({ title: "", content: "" }), x[0] = { ...x[0], title: `${String(((d = x[0]) == null ? void 0 : d.title) ?? "")}${l}` }, A(r, { items: x });
            break;
          }
          case "countdown":
            A(r, { label: `${String(t.label ?? "")}${l}` });
            break;
          case "product_card":
            A(r, { title: `${String(t.title ?? "")}${l}` });
            break;
          case "dynamic_image":
            A(r, { alt: `${String(t.alt ?? "")}${l}` });
            break;
        }
        g.value = null;
      }
    }
    function u(r, l) {
      var t, z, d, x, H, Te, et, at, ze;
      if (l) {
        if (r === "subject")
          I("update", { subject: Y(le.value, l) });
        else if (r === "preview")
          I("update", { preview_text: Y(pe.value, l) });
        else if (r === "from-name")
          I("update", { from_name: Y(T.message.from_name, l) });
        else if (r.startsWith("block:")) {
          _(r.slice(6), l);
          return;
        } else if (r.startsWith("col-left:")) {
          const ce = r.slice(9), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "columns" && A(ce, { leftContent: Y(Z.leftContent, l) });
        } else if (r.startsWith("col-right:")) {
          const ce = r.slice(10), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "columns" && A(ce, { rightContent: Y(Z.rightContent, l) });
        } else if (r.startsWith("row:")) {
          const [, ce, Z] = r.split(":"), ge = Number(Z), Ie = M.value.find((De) => De.id === ce);
          if ((Ie == null ? void 0 : Ie.type) === "row" && Number.isFinite(ge)) {
            const De = [...Ie.cells || []].map((ta) => String(ta ?? ""));
            De[ge] = Y(De[ge], l), A(ce, { cells: De });
          }
        } else if (r.startsWith("button-text:")) {
          const ce = r.slice(12), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "button" && A(ce, { text: Y(Z.text, l) });
        } else if (r.startsWith("image-alt:")) {
          const ce = r.slice(10), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "image" && A(ce, { alt: Y(Z.alt, l) });
        } else if (r.startsWith("video-caption:")) {
          const ce = r.slice(14), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "video" && A(ce, { caption: Y(Z.caption, l) });
        } else if (r.startsWith("dynamic-alt:")) {
          const ce = r.slice(12), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "dynamic_image" && A(ce, { alt: Y(Z.alt, l) });
        } else if (r.startsWith("countdown-label:")) {
          const ce = r.slice(16), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "countdown" && A(ce, { label: Y(Z.label, l) });
        } else if (r.startsWith("product-title:")) {
          const ce = r.slice(14), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "product_card" && A(ce, { title: Y(Z.title, l) });
        } else if (r.startsWith("product-price:")) {
          const ce = r.slice(14), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "product_card" && A(ce, { price: Y(Z.price, l) });
        } else if (r.startsWith("product-button:")) {
          const ce = r.slice(15), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "product_card" && A(ce, { buttonText: Y(Z.buttonText, l) });
        } else if (r.startsWith("footer-address:")) {
          const ce = r.slice(15), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "footer" && A(ce, { companyAddress: Y(Z.companyAddress, l) });
        } else if (r.startsWith("code-caption:")) {
          const ce = r.slice(13), Z = M.value.find((ge) => ge.id === ce);
          (Z == null ? void 0 : Z.type) === "code_block" && A(ce, { caption: Y(Z.caption, l) });
        } else if (r.startsWith("list-item:")) {
          const [, ce, Z] = r.split(":"), ge = Number(Z), Ie = M.value.find((De) => De.id === ce);
          (Ie == null ? void 0 : Ie.type) === "list" && Number.isFinite(ge) && W(ce, ge, Y((t = Ie.items) == null ? void 0 : t[ge], l));
        } else if (r.startsWith("link-list-item:")) {
          const [, ce, Z] = r.split(":"), ge = Number(Z), Ie = M.value.find((De) => De.id === ce);
          (Ie == null ? void 0 : Ie.type) === "link_list" && Number.isFinite(ge) && E(ce, ge, "text", Y((d = (z = Ie.links) == null ? void 0 : z[ge]) == null ? void 0 : d.text, l));
        } else if (r.startsWith("navbar-item:")) {
          const [, ce, Z] = r.split(":"), ge = Number(Z), Ie = M.value.find((De) => De.id === ce);
          (Ie == null ? void 0 : Ie.type) === "navbar" && Number.isFinite(ge) && he(ce, ge, "text", Y((H = (x = Ie.links) == null ? void 0 : x[ge]) == null ? void 0 : H.text, l));
        } else if (r.startsWith("accordion-title:")) {
          const [, ce, Z] = r.split(":"), ge = Number(Z), Ie = M.value.find((De) => De.id === ce);
          (Ie == null ? void 0 : Ie.type) === "accordion" && Number.isFinite(ge) && Pe(ce, ge, "title", Y((et = (Te = Ie.items) == null ? void 0 : Te[ge]) == null ? void 0 : et.title, l));
        } else if (r.startsWith("accordion-content:")) {
          const [, ce, Z] = r.split(":"), ge = Number(Z), Ie = M.value.find((De) => De.id === ce);
          (Ie == null ? void 0 : Ie.type) === "accordion" && Number.isFinite(ge) && Pe(ce, ge, "content", Y((ze = (at = Ie.items) == null ? void 0 : at[ge]) == null ? void 0 : ze.content, l));
        }
        g.value = null;
      }
    }
    function B() {
      const r = te.value.trim();
      !r || P.value.includes(r) || (P.value = [...P.value, r], G.value = r, te.value = "");
    }
    return (r, l) => (a(), n("section", im, [
      e("div", rm, [
        e("div", um, [
          l[31] || (l[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          i.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => r.$emit("reset"))
          }, " Reset section ")) : y("", !0)
        ]),
        l[38] || (l[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", dm, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", cm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: i.message.from_name ?? "",
              onInput: ye
            }, null, 40, pm),
            e("div", mm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[1] || (l[1] = (t) => O("from-name")),
                title: "Insert emoji"
              }, "😊"),
              g.value === "from-name" ? (a(), n("div", vm, [
                (a(), n(U, null, D(v, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (z) => u("from-name", t)
                }, c(t), 9, bm)), 64))
              ])) : y("", !0)
            ])
          ])
        ]),
        e("div", ym, [
          l[33] || (l[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: i.message.from_address ?? "",
            onInput: xe
          }, null, 40, hm)
        ]),
        e("div", gm, [
          l[34] || (l[34] = e("label", { class: "em-label" }, [
            F("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: i.message.reply_to ?? "",
            onInput: ee
          }, null, 40, fm)
        ]),
        e("div", km, [
          l[35] || (l[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", _m, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: le.value,
              onInput: X
            }, null, 40, wm),
            e("div", $m, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => j("subject")),
                title: "Insert variable"
              }, c(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[3] || (l[3] = (t) => O("subject")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "subject" ? (a(), n("div", xm, [
                (a(!0), n(U, null, D(P.value, (t) => (a(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (z) => S("subject", t)
                }, c(t), 9, Cm))), 128))
              ])) : y("", !0),
              g.value === "subject" ? (a(), n("div", Sm, [
                (a(), n(U, null, D(v, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (z) => u("subject", t)
                }, c(t), 9, Im)), 64))
              ])) : y("", !0)
            ])
          ]),
          e("span", {
            class: we(["em-analyzer", `em-analyzer--${N.value}`])
          }, c($(lm)(N.value)), 3),
          q.value.length ? (a(), n("span", Tm, "Spammy: " + c(q.value.join(", ")), 1)) : y("", !0)
        ]),
        e("div", Am, [
          l[36] || (l[36] = e("label", { class: "em-label" }, [
            F("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Um, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: pe.value,
              onInput: ae
            }, null, 40, Rm),
            e("div", Em, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[4] || (l[4] = (t) => j("preview")),
                title: "Insert variable"
              }, c(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[5] || (l[5] = (t) => O("preview")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "preview" ? (a(), n("div", Pm, [
                (a(!0), n(U, null, D(P.value, (t) => (a(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (z) => S("preview", t)
                }, c(t), 9, Bm))), 128))
              ])) : y("", !0),
              g.value === "preview" ? (a(), n("div", Lm, [
                (a(), n(U, null, D(v, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (z) => u("preview", t)
                }, c(t), 9, Om)), 64))
              ])) : y("", !0)
            ])
          ]),
          l[37] || (l[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: we(["em-analyzer", `em-analyzer--${se.value}`])
          }, c($(om)(se.value)), 3),
          me.value.length ? (a(), n("span", Nm, "Spammy: " + c(me.value.join(", ")), 1)) : y("", !0)
        ])
      ]),
      e("div", Mm, [
        l[39] || (l[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[40] || (l[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Vm, [
          (a(), n(U, null, D(f, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (z) => R(t)
          }, c(t.label), 9, Dm)), 64))
        ])
      ]),
      e("div", jm, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Hm, [
          (a(!0), n(U, null, D(M.value, (t, z) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", qm, [
              e("span", Fm, c(t.type), 1),
              e("div", zm, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: z === 0,
                  onClick: (d) => oe(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Ym),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: z === M.value.length - 1,
                  onClick: (d) => oe(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Km),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (d) => fe(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Gm)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", Jm, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (d) => A(t.id, { level: Number(d.target.value) })
              }, [...l[41] || (l[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Qm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (d) => A(t.id, { content: d.target.value }),
                placeholder: "Heading text"
              }, null, 40, Xm),
              e("div", Zm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`block:${t.id}`)
                }, c(Fe), 8, ev),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, tv),
                o.value === `block:${t.id}` ? (a(), n("div", av, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `block-var-heading-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`block:${t.id}`, d)
                  }, c(d), 9, nv))), 128))
                ])) : y("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", sv, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-heading-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`block:${t.id}`, d)
                  }, c(d), 9, lv)), 64))
                ])) : y("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), n("div", ov, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (d) => A(t.id, { content: d.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, iv),
              e("div", rv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`block:${t.id}`)
                }, c(Fe), 8, uv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, dv),
                o.value === `block:${t.id}` ? (a(), n("div", cv, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `block-var-paragraph-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`block:${t.id}`, d)
                  }, c(d), 9, pv))), 128))
                ])) : y("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", mv, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-paragraph-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`block:${t.id}`, d)
                  }, c(d), 9, vv)), 64))
                ])) : y("", !0)
              ])
            ])) : t.type === "image" ? (a(), n("div", bv, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (d) => A(t.id, { src: d.target.value }),
                placeholder: "Image URL"
              }, null, 40, yv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (d) => A(t.id, { alt: d.target.value }),
                placeholder: "Alt text"
              }, null, 40, hv),
              e("div", gv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, fv),
                g.value === `image-alt:${t.id}` ? (a(), n("div", kv, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-image-alt-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`image-alt:${t.id}`, d)
                  }, c(d), 9, _v)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (d) => A(t.id, { linkUrl: d.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, wv)
            ])) : t.type === "button" ? (a(), n("div", $v, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (d) => A(t.id, { text: d.target.value }),
                placeholder: "Button text"
              }, null, 40, xv),
              e("div", Cv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Sv),
                g.value === `button-text:${t.id}` ? (a(), n("div", Iv, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-button-text-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`button-text:${t.id}`, d)
                  }, c(d), 9, Tv)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (d) => A(t.id, { url: d.target.value }),
                placeholder: "Button URL"
              }, null, 40, Av),
              e("div", Uv, [
                l[42] || (l[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (d) => A(t.id, { borderRadius: Number(d.target.value) || 0 })
                }, null, 40, Rv)
              ]),
              e("label", Ev, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (d) => A(t.id, { ghost: d.target.checked })
                }, null, 40, Pv),
                l[43] || (l[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", Bv, [
              l[44] || (l[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (d) => A(t.id, { height: Number(d.target.value) || 24 })
              }, null, 40, Lv),
              l[45] || (l[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", Ov, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (d) => A(t.id, { content: d.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Nv),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (d) => A(t.id, { unsubscribeUrl: d.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Mv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (d) => A(t.id, { companyAddress: d.target.value }),
                placeholder: "Company address"
              }, null, 40, Vv),
              e("div", Dv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, jv),
                g.value === `footer-address:${t.id}` ? (a(), n("div", Hv, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-footer-address-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`footer-address:${t.id}`, d)
                  }, c(d), 9, Wv)), 64))
                ])) : y("", !0)
              ]),
              e("div", qv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`block:${t.id}`)
                }, c(Fe), 8, Fv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, zv),
                o.value === `block:${t.id}` ? (a(), n("div", Yv, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `block-var-footer-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`block:${t.id}`, d)
                  }, c(d), 9, Kv))), 128))
                ])) : y("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Gv, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-footer-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`block:${t.id}`, d)
                  }, c(d), 9, Jv)), 64))
                ])) : y("", !0)
              ])
            ])) : t.type === "list" ? (a(), n("div", Qv, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (d) => A(t.id, { style: d.target.value })
              }, [...l[46] || (l[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Xv),
              e("div", Zv, [
                (a(!0), n(U, null, D(t.items || [], (d, x) => (a(), n("div", {
                  key: x,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: d,
                    onInput: (H) => W(t.id, x, H.target.value),
                    placeholder: `Item ${x + 1}`
                  }, null, 40, eb),
                  e("div", tb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => O(`list-item:${t.id}:${x}`),
                      title: "Insert emoji"
                    }, "😊", 8, ab),
                    g.value === `list-item:${t.id}:${x}` ? (a(), n("div", nb, [
                      (a(), n(U, null, D(v, (H) => e("button", {
                        key: `emoji-list-item-${t.id}-${x}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => u(`list-item:${t.id}:${x}`, H)
                      }, c(H), 9, sb)), 64))
                    ])) : y("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => ie(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, lb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (d) => h(t.id)
              }, "+ Add item", 8, ob)
            ])) : t.type === "quote" ? (a(), n("div", ib, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (d) => A(t.id, { style: d.target.value })
              }, [...l[47] || (l[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, rb),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (d) => A(t.id, { content: d.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, ub),
              e("div", db, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`block:${t.id}`)
                }, c(Fe), 8, cb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, pb),
                o.value === `block:${t.id}` ? (a(), n("div", mb, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `block-var-quote-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`block:${t.id}`, d)
                  }, c(d), 9, vb))), 128))
                ])) : y("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", bb, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-quote-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`block:${t.id}`, d)
                  }, c(d), 9, yb)), 64))
                ])) : y("", !0)
              ])
            ])) : t.type === "social" ? (a(), n("div", hb, [
              e("div", gb, [
                (a(!0), n(U, null, D(t.links || [], (d, x) => (a(), n("div", {
                  key: x,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: d.platform,
                    class: "em-select em-select--sm",
                    onChange: (H) => ke(t.id, x, "platform", H.target.value)
                  }, [...l[48] || (l[48] = [
                    tt('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, fb),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: d.url,
                    onInput: (H) => ke(t.id, x, "url", H.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, kb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => _e(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, _b)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (d) => ve(t.id)
              }, "+ Add link", 8, wb)
            ])) : t.type === "video" ? (a(), n("div", $b, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (d) => A(t.id, { thumbnailUrl: d.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, xb),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (d) => A(t.id, { videoUrl: d.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Cb),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (d) => A(t.id, { caption: d.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Sb),
              e("div", Ib, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Tb),
                g.value === `video-caption:${t.id}` ? (a(), n("div", Ab, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-video-caption-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`video-caption:${t.id}`, d)
                  }, c(d), 9, Ub)), 64))
                ])) : y("", !0)
              ])
            ])) : t.type === "link_list" ? (a(), n("div", Rb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (d) => A(t.id, { separator: d.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Eb),
              e("div", Pb, [
                (a(!0), n(U, null, D(t.links || [], (d, x) => (a(), n("div", {
                  key: x,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: d.text,
                    onInput: (H) => E(t.id, x, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, Bb),
                  e("div", Lb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => O(`link-list-item:${t.id}:${x}`),
                      title: "Insert emoji"
                    }, "😊", 8, Ob),
                    g.value === `link-list-item:${t.id}:${x}` ? (a(), n("div", Nb, [
                      (a(), n(U, null, D(v, (H) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${x}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => u(`link-list-item:${t.id}:${x}`, H)
                      }, c(H), 9, Mb)), 64))
                    ])) : y("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: d.url,
                    onInput: (H) => E(t.id, x, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, Vb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => J(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Db)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (d) => Q(t.id)
              }, "+ Add link", 8, jb)
            ])) : t.type === "columns" ? (a(), n("div", Hb, [
              l[49] || (l[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (d) => A(t.id, { leftContent: d.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Wb),
              e("div", qb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`col-left:${t.id}`)
                }, c(Fe), 8, Fb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, zb),
                o.value === `col-left:${t.id}` ? (a(), n("div", Yb, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `col-left-var-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`col-left:${t.id}`, d)
                  }, c(d), 9, Kb))), 128))
                ])) : y("", !0),
                g.value === `emoji:col-left:${t.id}` ? (a(), n("div", Gb, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-col-left-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`col-left:${t.id}`, d)
                  }, c(d), 9, Jb)), 64))
                ])) : y("", !0)
              ]),
              l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (d) => A(t.id, { rightContent: d.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Qb),
              e("div", Xb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`col-right:${t.id}`)
                }, c(Fe), 8, Zb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ey),
                o.value === `col-right:${t.id}` ? (a(), n("div", ty, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `col-right-var-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`col-right:${t.id}`, d)
                  }, c(d), 9, ay))), 128))
                ])) : y("", !0),
                g.value === `emoji:col-right:${t.id}` ? (a(), n("div", ny, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-col-right-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`col-right:${t.id}`, d)
                  }, c(d), 9, sy)), 64))
                ])) : y("", !0)
              ])
            ])) : t.type === "divider" ? (a(), n("div", ly, [
              e("div", oy, [
                l[51] || (l[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (d) => A(t.id, { thickness: Number(d.target.value) || 1 })
                }, null, 40, iy),
                l[52] || (l[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", ry, [
                l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (d) => A(t.id, { color: d.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, uy)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (d) => A(t.id, { lineStyle: d.target.value })
              }, [...l[54] || (l[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, dy)
            ])) : t.type === "row" ? (a(), n("div", cy, [
              l[56] || (l[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (d) => $e(t.id, { columnCount: Number(d.target.value) })
              }, [...l[55] || (l[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, py),
              (a(!0), n(U, null, D(t.cells || [], (d, x) => (a(), n("div", {
                key: x,
                class: "em-row-cell"
              }, [
                e("label", my, "Column " + c(x + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: d,
                  onInput: (H) => be(t.id, x, H.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, vy),
                e("div", by, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => j(`row:${t.id}:${x}`)
                  }, c(Fe), 8, yy),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => O(`emoji:row:${t.id}:${x}`),
                    title: "Insert emoji"
                  }, "😊", 8, hy),
                  o.value === `row:${t.id}:${x}` ? (a(), n("div", gy, [
                    (a(!0), n(U, null, D(P.value, (H) => (a(), n("button", {
                      key: `row-var-${t.id}-${x}-${H}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (Te) => S(`row:${t.id}:${x}`, H)
                    }, c(H), 9, fy))), 128))
                  ])) : y("", !0),
                  g.value === `emoji:row:${t.id}:${x}` ? (a(), n("div", ky, [
                    (a(), n(U, null, D(v, (H) => e("button", {
                      key: `emoji-row-${t.id}-${x}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => u(`row:${t.id}:${x}`, H)
                    }, c(H), 9, _y)), 64))
                  ])) : y("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", wy, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (d) => A(t.id, { separator: d.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, $y),
              e("div", xy, [
                (a(!0), n(U, null, D(t.links || [], (d, x) => (a(), n("div", {
                  key: x,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: d.text,
                    onInput: (H) => he(t.id, x, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, Cy),
                  e("div", Sy, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => O(`navbar-item:${t.id}:${x}`),
                      title: "Insert emoji"
                    }, "😊", 8, Iy),
                    g.value === `navbar-item:${t.id}:${x}` ? (a(), n("div", Ty, [
                      (a(), n(U, null, D(v, (H) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${x}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => u(`navbar-item:${t.id}:${x}`, H)
                      }, c(H), 9, Ay)), 64))
                    ])) : y("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: d.url,
                    onInput: (H) => he(t.id, x, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, Uy),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => de(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Ry)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (d) => Ue(t.id)
              }, "+ Add link", 8, Ey)
            ])) : t.type === "accordion" ? (a(), n("div", Py, [
              (a(!0), n(U, null, D(t.items || [], (d, x) => (a(), n("div", {
                key: x,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: d.title,
                  onInput: (H) => Pe(t.id, x, "title", H.target.value),
                  placeholder: "Section title"
                }, null, 40, By),
                e("div", Ly, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => O(`accordion-title:${t.id}:${x}`),
                    title: "Insert emoji"
                  }, "😊", 8, Oy),
                  g.value === `accordion-title:${t.id}:${x}` ? (a(), n("div", Ny, [
                    (a(), n(U, null, D(v, (H) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${x}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => u(`accordion-title:${t.id}:${x}`, H)
                    }, c(H), 9, My)), 64))
                  ])) : y("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: d.content,
                  onInput: (H) => Pe(t.id, x, "content", H.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Vy),
                e("div", Dy, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => O(`accordion-content:${t.id}:${x}`),
                    title: "Insert emoji"
                  }, "😊", 8, jy),
                  g.value === `accordion-content:${t.id}:${x}` ? (a(), n("div", Hy, [
                    (a(), n(U, null, D(v, (H) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${x}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => u(`accordion-content:${t.id}:${x}`, H)
                    }, c(H), 9, Wy)), 64))
                  ])) : y("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => qe(t.id, x),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, qy)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (d) => Ne(t.id)
              }, "+ Add section", 8, Fy)
            ])) : t.type === "carousel" ? (a(), n("div", zy, [
              (a(!0), n(U, null, D(t.slides || [], (d, x) => (a(), n("div", {
                key: x,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: d.imageUrl,
                  onInput: (H) => Me(t.id, x, "imageUrl", H.target.value),
                  placeholder: "Image URL"
                }, null, 40, Yy),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: d.alt,
                  onInput: (H) => Me(t.id, x, "alt", H.target.value),
                  placeholder: "Alt text"
                }, null, 40, Ky),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: d.linkUrl,
                  onInput: (H) => Me(t.id, x, "linkUrl", H.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Gy),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => Re(t.id, x),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Jy)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (d) => He(t.id)
              }, "+ Add slide", 8, Qy)
            ])) : t.type === "countdown" ? (a(), n("div", Xy, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (d) => A(t.id, { label: d.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Zy),
              e("div", eh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, th),
                g.value === `countdown-label:${t.id}` ? (a(), n("div", ah, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`countdown-label:${t.id}`, d)
                  }, c(d), 9, nh)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (d) => A(t.id, { endDateTime: d.target.value ? new Date(d.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, sh),
              l[57] || (l[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", lh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (d) => A(t.id, { imageUrl: d.target.value }),
                placeholder: "Product image URL"
              }, null, 40, oh),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (d) => A(t.id, { title: d.target.value }),
                placeholder: "Product title"
              }, null, 40, ih),
              e("div", rh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, uh),
                g.value === `product-title:${t.id}` ? (a(), n("div", dh, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-product-title-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`product-title:${t.id}`, d)
                  }, c(d), 9, ch)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (d) => A(t.id, { price: d.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, ph),
              e("div", mh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, vh),
                g.value === `product-price:${t.id}` ? (a(), n("div", bh, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-product-price-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`product-price:${t.id}`, d)
                  }, c(d), 9, yh)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (d) => A(t.id, { buttonText: d.target.value }),
                placeholder: "Button text"
              }, null, 40, hh),
              e("div", gh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, fh),
                g.value === `product-button:${t.id}` ? (a(), n("div", kh, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-product-button-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`product-button:${t.id}`, d)
                  }, c(d), 9, _h)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (d) => A(t.id, { buttonUrl: d.target.value }),
                placeholder: "Button URL"
              }, null, 40, wh)
            ])) : t.type === "liquid" ? (a(), n("div", $h, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (d) => A(t.id, { content: d.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, xh),
              e("div", Ch, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`block:${t.id}`)
                }, c(Fe), 8, Sh),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ih),
                o.value === `block:${t.id}` ? (a(), n("div", Th, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `block-var-liquid-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`block:${t.id}`, d)
                  }, c(d), 9, Ah))), 128))
                ])) : y("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Uh, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-liquid-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`block:${t.id}`, d)
                  }, c(d), 9, Rh)), 64))
                ])) : y("", !0)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", Eh, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (d) => A(t.id, { caption: d.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Ph),
              e("div", Bh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Lh),
                g.value === `code-caption:${t.id}` ? (a(), n("div", Oh, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-code-caption-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`code-caption:${t.id}`, d)
                  }, c(d), 9, Nh)), 64))
                ])) : y("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (d) => A(t.id, { content: d.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Mh),
              e("div", Vh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => j(`block:${t.id}`)
                }, c(Fe), 8, Dh),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, jh),
                o.value === `block:${t.id}` ? (a(), n("div", Hh, [
                  (a(!0), n(U, null, D(P.value, (d) => (a(), n("button", {
                    key: `block-var-code-${t.id}-${d}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (x) => S(`block:${t.id}`, d)
                  }, c(d), 9, Wh))), 128))
                ])) : y("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", qh, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-code-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`block:${t.id}`, d)
                  }, c(d), 9, Fh)), 64))
                ])) : y("", !0)
              ]),
              l[59] || (l[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", zh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (d) => A(t.id, { feedUrl: d.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Yh),
              e("div", Kh, [
                l[60] || (l[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (d) => A(t.id, { maxItems: Number(d.target.value) || 5 })
                }, null, 40, Gh)
              ]),
              l[61] || (l[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", Jh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (d) => A(t.id, { imageUrl: d.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, Qh),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (d) => A(t.id, { alt: d.target.value }),
                placeholder: "Alt text"
              }, null, 40, Xh),
              e("div", Zh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (d) => O(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, eg),
                g.value === `dynamic-alt:${t.id}` ? (a(), n("div", tg, [
                  (a(), n(U, null, D(v, (d) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${d}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (x) => u(`dynamic-alt:${t.id}`, d)
                  }, c(d), 9, ag)), 64))
                ])) : y("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (d) => A(t.id, { fallbackUrl: d.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, ng)
            ])) : y("", !0),
            k.includes(t.type) ? (a(), n("div", sg, [
              e("div", lg, [
                e("button", {
                  type: "button",
                  class: we(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (d) => A(t.id, { alignment: "left" })
                }, [...l[62] || (l[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, og),
                e("button", {
                  type: "button",
                  class: we(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (d) => A(t.id, { alignment: "center" })
                }, [...l[63] || (l[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, ig),
                e("button", {
                  type: "button",
                  class: we(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (d) => A(t.id, { alignment: "right" })
                }, [...l[64] || (l[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, rg)
              ]),
              e("label", ug, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (d) => A(t.id, { fullWidth: d.target.checked })
                }, null, 40, dg),
                l[65] || (l[65] = e("span", null, "Full width", -1))
              ])
            ])) : y("", !0)
          ], 8, Wm))), 128))
        ]),
        e("div", cg, [
          l[66] || (l[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", pg, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => V("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => V("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => V("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => V("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => V("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => V("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => V("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => V("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => V("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => V("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => V("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => V("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => V("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => V("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => V("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => V("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => V("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => V("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => V("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => V("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[26] || (l[26] = (t) => V("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[27] || (l[27] = (t) => V("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[28] || (l[28] = (t) => V("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", mg, [
        l[71] || (l[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[72] || (l[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", vg, [
          l[69] || (l[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", bg, [
            je(e("select", {
              "onUpdate:modelValue": l[29] || (l[29] = (t) => G.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(U, null, D(P.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, c(t), 9, yg))), 128))
            ], 512), [
              [Ke, G.value]
            ])
          ])
        ]),
        e("div", hg, [
          l[70] || (l[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", gg, [
            je(e("input", {
              "onUpdate:modelValue": l[30] || (l[30] = (t) => te.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [ut, te.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: B
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), kg = /* @__PURE__ */ Be(fg, [["__scopeId", "data-v-62cf50f4"]]), _g = { class: "keos-email-builder" }, wg = { class: "kb-builder-top" }, $g = { class: "kb-email-layout" }, xg = { class: "kb-email-sidebar" }, Cg = {
  key: 0,
  class: "kb-email-form"
}, Sg = { class: "kb-email-form-head" }, Ig = { class: "kb-email-form-head-top" }, Tg = { class: "kb-email-health-pill" }, Ag = { class: "kb-wa-form-head-row" }, Ug = ["value"], Rg = { class: "kb-email-health" }, Eg = { class: "kb-email-health-row" }, Pg = { class: "kb-email-health-value" }, Bg = { class: "kb-email-health-bar" }, Lg = { class: "kb-email-canvas" }, Og = {
  key: 0,
  class: "kb-email-test-banner"
}, Ng = { class: "kb-email-preview-chrome" }, Mg = { class: "kb-push-preview-controls" }, Vg = { class: "kb-push-preview-as" }, Dg = ["value"], jg = { class: "kb-preview-status" }, Hg = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Wg = { class: "kb-email-inbox-strip" }, qg = { class: "kb-email-inbox-from" }, Fg = { class: "kb-email-inbox-from-name" }, zg = { class: "kb-email-inbox-from-addr" }, Yg = { class: "kb-email-inbox-subject" }, Kg = ["title"], Gg = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Jg = { class: "kb-email-body-canvas" }, Qg = ["innerHTML"], Xg = { class: "kb-email-actions" }, Zg = {
  key: 0,
  class: "kb-actions-note"
}, ef = { key: 0 }, tf = { class: "kb-email-actions-right" }, af = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, nf = { class: "kb-confirm-dialog" }, sf = { class: "kb-confirm-actions" }, lf = /* @__PURE__ */ Ee({
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
      const o = (S) => String(S).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), g = [
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
      ], v = (S, O) => {
        if (!g.includes(O.type)) return S;
        const Y = O.alignment || "left", _ = !!O.fullWidth;
        return `<div style="text-align:${Y};${_ ? "width:100%;" : ""}">${S}</div>`;
      }, j = [];
      for (const S of s)
        switch (S.type) {
          case "heading": {
            const O = Math.min(3, Math.max(1, Number(S.level) || 1)), Y = o(S.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              v(
                `<h${O} style="margin:0 0 12px;font-size:${O === 1 ? "22" : O === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${Y || "Heading"}</h${O}>`,
                S
              )
            );
            break;
          }
          case "paragraph": {
            const O = o(S.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${O || "Paragraph"}</p>`,
                S
              )
            );
            break;
          }
          case "image": {
            const O = (S.src || "").trim(), Y = o(S.alt || ""), _ = (S.linkUrl || "").trim(), B = !!S.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", ne = O ? `<img src="${o(O)}" alt="${Y}" style="${B}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            j.push(
              v(
                `<div style="margin:0 0 12px;">${_ ? `<a href="${o(_)}" style="color:#2563eb;">${ne}</a>` : ne}</div>`,
                S
              )
            );
            break;
          }
          case "button": {
            const O = o(S.text || "Button"), Y = (S.url || "#").trim(), _ = Math.min(24, Math.max(0, Number(S.borderRadius) ?? 8)), u = !!S.fullWidth, B = !!S.ghost, ne = B ? "transparent" : "#0f172a", r = B ? "#0f172a" : "#fff", l = B ? "2px solid #0f172a" : "none", t = u ? "block" : "inline-block", z = u ? "100%" : "auto";
            j.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${o(Y)}" style="display:${t};width:${z};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${ne};color:${r};border:${l};text-decoration:none;font-size:14px;font-weight:600;border-radius:${_}px;overflow-wrap:anywhere;">${O}</a></p>`,
                S
              )
            );
            break;
          }
          case "divider": {
            const O = Math.min(8, Math.max(1, Number(S.thickness) || 1)), Y = (S.color || "#e2e8f0").trim() || "#e2e8f0", _ = S.lineStyle || "solid";
            j.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${O}px ${_} ${Y};" />`,
                S
              )
            );
            break;
          }
          case "spacer": {
            const O = Math.min(120, Math.max(8, Number(S.height) || 24));
            j.push(v(`<div style="height:${O}px;"></div>`, S));
            break;
          }
          case "footer": {
            const O = o(S.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), Y = (S.unsubscribeUrl || "").trim(), _ = o(S.companyAddress || "");
            j.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${O || "Footer"}` + (Y ? `<p style="margin:8px 0 0;"><a href="${o(Y)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (_ ? `<p style="margin:4px 0 0;">${_}</p>` : "") + "</div>",
                S
              )
            );
            break;
          }
          case "list": {
            const O = S.style === "numbered" ? "ol" : "ul", _ = (Array.isArray(S.items) ? S.items : []).map(
              (u) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${o(String(u)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            j.push(
              v(
                `<${O} style="margin:0 0 12px;padding-left:24px;">${_ || "<li>Item</li>"}</${O}>`,
                S
              )
            );
            break;
          }
          case "quote": {
            const O = o(S.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), Y = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, _ = Y[S.style || "default"] || Y.default;
            j.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${_}font-size:14px;line-height:1.6;">${O || "Quote"}</div>`,
                S
              )
            );
            break;
          }
          case "social": {
            const Y = (Array.isArray(S.links) ? S.links : []).filter((_) => (_.url || "").trim());
            if (Y.length === 0)
              j.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  S
                )
              );
            else {
              const _ = (u) => `<a href="${o((u.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${o(u.platform || "Link")}</a>`;
              j.push(
                v(
                  `<div style="margin:0 0 12px;">${Y.map(_).join("")}</div>`,
                  S
                )
              );
            }
            break;
          }
          case "video": {
            const O = (S.thumbnailUrl || "").trim(), Y = (S.videoUrl || "#").trim(), _ = o(S.caption || ""), B = !!S.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", ne = O ? `<img src="${o(O)}" alt="Video" style="${B}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            j.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${o(Y)}" style="display:block;color:inherit;">${ne}</a>` + (_ ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${_}</p>` : "") + "</div>",
                S
              )
            );
            break;
          }
          case "link_list": {
            const O = Array.isArray(S.links) ? S.links : [], Y = o(S.separator || " | "), u = O.filter(
              (B) => (B.text || B.url) && (B.url || "").trim()
            ).map(
              (B) => `<a href="${o((B.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(B.text || "Link")}</a>`
            );
            j.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${u.join(Y)}</p>`,
                S
              )
            );
            break;
          }
          case "columns": {
            const O = o(S.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), Y = o(S.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${O || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${Y || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const O = Math.min(4, Math.max(1, Number(S.columnCount) || 2)), Y = Array.isArray(S.cells) ? S.cells.slice(0, O) : [], _ = 100 / O, u = Array.from({ length: O }, (B, ne) => {
              const r = Y[ne] ?? "", l = o(r).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${_}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "—"}</td>`;
            }).join("");
            j.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${u}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const O = Array.isArray(S.links) ? S.links : [], Y = o(S.separator || " | "), u = O.filter(
              (B) => (B.text || B.url) && (B.url || "").trim()
            ).map(
              (B) => `<a href="${o((B.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(B.text || "Link")}</a>`
            );
            j.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${u.length ? u.join(Y) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const Y = (Array.isArray(S.items) ? S.items : []).map((_) => {
              const u = o(_.title || "Section"), B = o(_.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${u}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${B}</div></details>`;
            }).join("");
            j.push(
              Y ? `<div style="margin:0 0 12px;">${Y}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const Y = (Array.isArray(S.slides) ? S.slides : []).filter(
              (_) => (_.imageUrl || "").trim()
            );
            if (Y.length === 0)
              j.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const _ = Y[0], u = `<img src="${o(_.imageUrl)}" alt="${o(_.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, B = (_.linkUrl || "").trim();
              j.push(
                `<div style="margin:0 0 12px;">${B ? `<a href="${o(B)}">${u}</a>` : u}` + (Y.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${Y.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const O = o(S.label || "Offer ends in"), Y = S.endDateTime ? new Date(S.endDateTime).toLocaleString() : "—";
            j.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${O}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${Y}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const O = (S.imageUrl || "").trim(), Y = o(S.title || "Product"), _ = o(S.price || ""), u = o(S.buttonText || "Buy now"), B = (S.buttonUrl || "#").trim(), ne = O ? `<img src="${o(O)}" alt="${o(S.alt || Y)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            j.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${ne}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${Y}</p>` + (_ ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${_}</p>` : "") + `<a href="${o(B)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${u}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const O = o((S.content || "").trim());
            j.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${O || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const O = (S.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), Y = o((S.caption || "").trim());
            j.push(
              '<div style="margin:0 0 12px;">' + (Y ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${Y}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${O || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const O = (S.feedUrl || "").trim(), Y = Math.min(20, Math.max(1, Number(S.maxItems) ?? 5));
            j.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (O ? `<p style="margin:0;font-size:12px;color:#64748b;">${o(O)} · max ${Y} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const O = (S.imageUrl || "").trim(), Y = (S.fallbackUrl || "").trim(), _ = o(S.alt || "Dynamic image");
            O ? j.push(
              `<div style="margin:0 0 12px;"><img src="${o(O)}" alt="${_}" style="max-width:100%;height:auto;display:block;border:0;" />` + (Y ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${o(Y)}</p>` : "") + "</div>"
            ) : j.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return j.join("");
    }
    function b(s) {
      return /<\s*html[\s>]/i.test(s) || /<!doctype\s+html/i.test(s);
    }
    function k(s) {
      const o = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return o ? o[1] : s;
    }
    function C(s, o, g) {
      const v = (o || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), j = (g || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${v}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        j ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${j}</div>` : "",
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
    const T = i, I = p, {
      campaign: L,
      dirty: P,
      customValidatorErrors: G,
      getValidationWithWarnings: te,
      update: le,
      updateMessage: pe,
      undo: N,
      redo: se,
      canUndo: q,
      canRedo: me,
      resetMessage: M,
      hooks: K
    } = ct({
      initial: T.modelValue,
      hooks: {
        ...T.hooks,
        customValidators: async (s) => {
          var j, S, O;
          const o = [];
          (j = s.name) != null && j.trim() || o.push("Template name is required");
          const g = s.message;
          (S = g == null ? void 0 : g.subject) != null && S.trim() || o.push("Subject is required");
          const v = (O = T.hooks) != null && O.customValidators ? await T.hooks.customValidators(s) : [];
          return [...o, ...v];
        }
      },
      onDirty: () => I("change", L.value)
    }), { lastSavedAt: X } = pt(L, { channel: "email" });
    function ae(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? se() : N());
    }
    st(() => {
      window.addEventListener("keydown", ae);
    }), lt(() => {
      window.removeEventListener("keydown", ae);
    }), Le(
      L,
      (s) => I("update:modelValue", {
        ...s,
        message: {
          ...s.message,
          html: Me.value
        }
      }),
      { deep: !0 }
    );
    const ye = ue(), xe = ue(!0);
    async function ee() {
      if (K.estimateReach)
        try {
          ye.value = await K.estimateReach(L.value.audience);
        } catch {
          ye.value = void 0;
        }
      K.canSend && (xe.value = await Promise.resolve(K.canSend()));
    }
    ee(), Le(() => L.value.audience, ee, { deep: !0 });
    const f = w(() => (G.value, te(ye.value))), R = w(() => f.value.blockingErrors), V = w(() => f.value.warnings), fe = w(() => f.value.valid), oe = w(() => {
      var v, j, S;
      const s = L.value.message, o = [
        !!((v = L.value.name) != null && v.trim()),
        !!((j = s.subject) != null && j.trim()),
        !!((S = s.from_address) != null && S.trim()),
        !!(Array.isArray(s.blocks) ? s.blocks.length : (s.html ?? "").trim().length),
        !!L.value.template_type
      ], g = o.filter(Boolean).length;
      return Math.round(g / o.length * 100);
    }), A = w(() => oe.value >= 90 ? "Production ready" : oe.value >= 70 ? "Strong draft" : oe.value >= 40 ? "In progress" : "Needs setup"), W = w(
      () => L.value.template_type ?? "transactional"
    ), h = ue(""), ie = ue(!1), ke = ue(null), ve = w(() => {
      const s = h.value;
      return s ? Ze.find((o) => o.id === s) ?? null : null;
    });
    function _e(s) {
      const o = L.value, g = s.campaign.message ? { ...o.message, ...s.campaign.message } : o.message;
      le({
        ...s.campaign,
        message: g
      }), ke.value = null, ie.value = !1;
    }
    function E(s) {
      const o = s.target.value;
      if (!o) return;
      const g = Et.find((v) => v.id === o);
      g && (P.value ? (ke.value = g, ie.value = !0) : _e(g), s.target.value = "");
    }
    function Q(s) {
      le({ template_type: s });
    }
    function J(s) {
      le({
        name: s,
        tracking: { ...L.value.tracking ?? {}, campaign_name: s }
      });
    }
    const $e = w(
      () => L.value.message.subject ?? ""
    ), be = w(
      () => L.value.message.preview_text ?? ""
    ), he = w(
      () => L.value.message.html ?? ""
    ), Ue = w(
      () => L.value.message.from_name ?? "Your App"
    ), de = w(
      () => L.value.message.from_address ?? "notifications@example.com"
    ), Pe = w(
      () => L.value.message.blocks ?? []
    ), Ne = w(() => {
      const s = L.value.message, o = (s.html ?? "").trim(), v = (Array.isArray(s.blocks) ? s.blocks : []).some((j) => {
        if (!j || typeof j != "object") return !1;
        const S = (j.type ?? "").toString();
        if (S === "paragraph" || S === "heading" || S === "quote" || S === "footer") {
          const O = (j.content ?? "").toString().trim();
          return !(!O || O === "Heading" || O.startsWith("Your text here."));
        }
        return S === "image" || S === "video" || S === "dynamic_image" ? !!(j.src ?? j.imageUrl ?? j.thumbnailUrl ?? "").toString().trim() : S === "button" ? !!(j.text ?? "").toString().trim() : !0;
      });
      return !!((s.subject ?? "").toString().trim() || (s.preview_text ?? "").toString().trim() || o || v);
    }), qe = w(() => {
      const s = Pe.value;
      if (Array.isArray(s) && s.length > 0)
        return m(s);
      const o = he.value;
      return o && o.trim() ? b(o) ? k(o) : o : m([]);
    }), Me = w(() => {
      const s = Pe.value;
      if (Array.isArray(s) && s.length > 0)
        return C(
          m(s),
          $e.value,
          be.value
        );
      const o = he.value;
      return o && o.trim() ? b(o) ? o : C(o, $e.value, be.value) : C(
        m([]),
        $e.value,
        be.value
      );
    }), He = w(() => {
      const s = $e.value;
      return ve.value ? Je(s, ve.value.data) : s;
    }), Re = w(() => {
      const s = be.value;
      return ve.value ? Je(s, ve.value.data) : s;
    }), We = w(() => {
      const s = qe.value;
      return ve.value ? Je(s, ve.value.data) : s;
    }), Ve = ue("desktop");
    function re() {
      fe.value && I("save", {
        ...L.value,
        message: {
          ...L.value.message,
          html: Me.value
        }
      });
    }
    return (s, o) => {
      var g;
      return a(), n("div", _g, [
        e("div", wg, [
          Oe(mt, {
            "campaign-name": $(L).name,
            status: $(L).status,
            dirty: $(P),
            "last-saved-at": $(X),
            "can-undo": $(q),
            "can-redo": $(me),
            "slugify-name": T.enforceSlugName,
            "onUpdate:campaignName": J,
            onUndo: $(N),
            onRedo: $(se)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          R.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: $(Ae).dangerBg,
              border: `1px solid ${$(Ae).dangerBorder}`,
              borderRadius: `${$(Qe).input}px`,
              padding: `${$(Ce)[16]}px ${$(Ce)[24]}px`,
              marginBottom: `${$(Ce)[24]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: $(Ae).danger })
            }, [
              (a(!0), n(U, null, D(R.value, (v) => (a(), n("li", {
                key: v.message
              }, c(v.message), 1))), 128))
            ], 4)
          ], 4)) : y("", !0)
        ]),
        e("div", $g, [
          e("aside", xg, [
            i.disabledSections.includes("email") ? y("", !0) : (a(), n("div", Cg, [
              e("div", Sg, [
                e("div", Ig, [
                  o[8] || (o[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Tg, c(A.value), 1)
                ]),
                e("div", Ag, [
                  Oe(_t, {
                    "template-type": W.value,
                    onUpdate: Q
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: E
                  }, [
                    o[9] || (o[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(U, null, D($(Et), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Ug))), 128))
                  ], 32)
                ]),
                e("div", Rg, [
                  e("div", Eg, [
                    o[10] || (o[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", Pg, c(oe.value) + "%", 1)
                  ]),
                  e("div", Bg, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: Se({ width: `${oe.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(kg, {
                message: $(L).message,
                "variable-options": i.variableOptions,
                "show-reset": !0,
                onUpdate: $(pe),
                onReset: o[0] || (o[0] = (v) => $(M)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Lg, [
            !i.designOnly && $(L).audience.test_mode ? (a(), n("div", Og, [...o[11] || (o[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              F(" Test mode — only your test segment will receive this. ", -1)
            ])])) : y("", !0),
            e("div", Ng, [
              e("div", Mg, [
                e("label", Vg, [
                  o[13] || (o[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (v) => h.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[12] || (o[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(U, null, D($(Ze), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, c(v.label), 9, Dg))), 128))
                  ], 512), [
                    [Ke, h.value]
                  ])
                ]),
                e("div", jg, [
                  o[14] || (o[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, c(Ve.value), 1)
                ])
              ]),
              e("div", Hg, [
                e("button", {
                  type: "button",
                  class: we(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ve.value === "desktop"
                  }]),
                  onClick: o[2] || (o[2] = (v) => Ve.value = "desktop")
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
                  class: we(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ve.value === "mobile"
                  }]),
                  onClick: o[3] || (o[3] = (v) => Ve.value = "mobile")
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
                class: we(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Ve.value === "mobile",
                  "kb-email-preview-frame--empty": !Ne.value
                }])
              }, [
                e("div", Wg, [
                  e("div", qg, [
                    e("span", Fg, c(Ue.value), 1),
                    e("span", zg, "<" + c(de.value) + ">", 1)
                  ]),
                  e("div", Yg, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: He.value || "No subject"
                    }, c(He.value || "No subject"), 9, Kg),
                    Re.value ? (a(), n("span", Gg, " — " + c(Re.value), 1)) : y("", !0)
                  ])
                ]),
                e("div", Jg, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: We.value
                  }, null, 8, Qg)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Xg, [
          V.value.length > 0 ? (a(), n("div", Zg, [
            o[17] || (o[17] = e("strong", null, "Warning:", -1)),
            F(" " + c((g = V.value[0]) == null ? void 0 : g.message) + " ", 1),
            V.value.length > 1 ? (a(), n("span", ef, " (+" + c(V.value.length - 1) + " more) ", 1)) : y("", !0)
          ])) : y("", !0),
          e("div", tf, [
            i.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: o[4] || (o[4] = (v) => I("duplicate", JSON.parse(JSON.stringify($(L)))))
            }, " Duplicate ")) : y("", !0),
            i.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: re
            }, " Save ")) : y("", !0),
            i.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: o[5] || (o[5] = (v) => I("edit"))
            }, " Close ")) : y("", !0)
          ])
        ]),
        ie.value ? (a(), n("div", af, [
          e("div", nf, [
            o[18] || (o[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[19] || (o[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", sf, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: o[6] || (o[6] = (v) => {
                  ie.value = !1, ke.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: o[7] || (o[7] = (v) => ke.value && _e(ke.value))
              }, " Replace ")
            ])
          ])
        ])) : y("", !0)
      ]);
    };
  }
}), ea = /* @__PURE__ */ Be(lf, [["__scopeId", "data-v-f45fc2a3"]]), of = { class: "kb-shell" }, rf = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, uf = ["aria-selected", "onClick"], df = { class: "kb-shell__meta" }, cf = ["href"], pf = { class: "kb-shell__body" }, mf = /* @__PURE__ */ Ee({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(i, { emit: p }) {
    const m = p, b = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (k, C) => (a(), n("div", of, [
      e("header", {
        class: "kb-shell__header",
        style: Se({ padding: `${$(Ce)[12]}px ${$(Ce)[24]}px`, borderBottom: `1px solid ${$(Ae).neutral.border}`, background: $(Ae).neutral.bg })
      }, [
        C[0] || (C[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", rf, [
          (a(), n(U, null, D(b, (T) => e("button", {
            key: T.id,
            type: "button",
            class: we(["kb-shell__channel", { "kb-shell__channel--active": i.channel === T.id }]),
            role: "tab",
            "aria-selected": i.channel === T.id,
            onClick: (I) => m("switch-channel", T.id)
          }, c(T.label), 11, uf)), 64))
        ]),
        e("div", df, [
          i.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: Se({ padding: "2px 8px", borderRadius: `${$(Qe).input}px`, fontSize: "0.75rem", background: $(Ae).neutral.bg, color: $(Ae).neutral.textMuted })
          }, c(i.environment), 5)) : y("", !0),
          i.helpUrl ? (a(), n("a", {
            key: 1,
            href: i.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: Se({ color: $(Ae).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, cf)) : y("", !0)
        ])
      ], 4),
      e("div", pf, [
        Ge(k.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), vf = /* @__PURE__ */ Be(mf, [["__scopeId", "data-v-0df30803"]]), bf = {
  class: "kb-outline",
  "aria-label": "Sections"
}, yf = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, hf = ["onClick"], gf = /* @__PURE__ */ Ee({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(i) {
    var C;
    const p = i, m = ue(((C = p.items[0]) == null ? void 0 : C.id) ?? "");
    let b = null;
    function k(T) {
      const I = document.getElementById(T);
      I && I.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return st(() => {
      const T = p.scrollContainerId ? document.getElementById(p.scrollContainerId) : document;
      T && (b = new IntersectionObserver(
        (I) => {
          for (const L of I)
            if (L.isIntersecting) {
              const P = L.target.getAttribute("data-outline-id");
              P && (m.value = P);
            }
        },
        { root: T === document ? null : T, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), p.items.forEach((I) => {
        const L = document.getElementById(I.id);
        L && (b == null || b.observe(L));
      }));
    }), lt(() => {
      b == null || b.disconnect();
    }), Le(
      () => p.items,
      (T) => {
        T.length && !m.value && (m.value = T[0].id);
      },
      { immediate: !0 }
    ), (T, I) => (a(), n("nav", bf, [
      e("ul", yf, [
        (a(!0), n(U, null, D(i.items, (L) => (a(), n("li", {
          key: L.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: we(["kb-outline__btn", { "kb-outline__btn--active": m.value === L.id }]),
            style: Se({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${$(Ce)[8]}px ${$(Ce)[12]}px`,
              border: "none",
              borderRadius: `${$(Qe).input}px`,
              background: m.value === L.id ? $(Ae).neutral.bg : "transparent",
              color: m.value === L.id ? "#0f172a" : $(Ae).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: m.value === L.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (P) => k(L.id)
          }, c(L.label), 15, hf)
        ]))), 128))
      ])
    ]));
  }
}), ff = /* @__PURE__ */ Be(gf, [["__scopeId", "data-v-25c37675"]]), kf = ["id"], _f = {
  key: 1,
  class: "kb-form-shell__head"
}, wf = /* @__PURE__ */ Ee({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(i) {
    return (p, m) => (a(), n("div", {
      class: "kb-form-shell",
      id: i.sectionId ?? void 0,
      style: Se({
        padding: `${$(Ce)[24]}px ${$(Ce)[24]}px ${$(Ce)[32]}px`,
        marginBottom: 0
      })
    }, [
      i.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: Se({ marginBottom: $(Ce)[24], paddingBottom: $(Ce)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: Se({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: $(Ce)[12] })
        }, c(i.label), 5),
        Ge(p.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", _f, [
        Ge(p.$slots, "head", {}, void 0, !0)
      ])),
      Ge(p.$slots, "default", {}, void 0, !0)
    ], 12, kf));
  }
}), $f = /* @__PURE__ */ Be(wf, [["__scopeId", "data-v-6504df41"]]), xf = /* @__PURE__ */ Ee({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(i) {
    return (p, m) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: Se({
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
      Ge(p.$slots, "default")
    ], 4));
  }
}), Cf = /* @__PURE__ */ Ee({
  __name: "BuilderTopShell",
  setup(i) {
    return (p, m) => (a(), n("div", {
      class: "kb-top-shell",
      style: Se({
        marginLeft: $(Ce)[24],
        marginRight: $(Ce)[24]
      })
    }, [
      Ge(p.$slots, "header"),
      Ge(p.$slots, "errors"),
      Ge(p.$slots, "warnings"),
      Ge(p.$slots, "default")
    ], 4));
  }
});
function Sf(i) {
  i.component("KeosNotificationBuilder", Qt), i.component("KeosWhatsAppBuilder", Xt), i.component("KeosSmsBuilder", Zt), i.component("KeosEmailBuilder", ea), i.component("BuilderShell", vf), i.component("BuilderOutline", ff), i.component("BuilderVersionHistoryModal", Jt), i.component("BuilderFormShell", $f), i.component("BuilderActionsBar", xf), i.component("BuilderTopShell", Cf);
}
const Tf = {
  install: Sf,
  KeosNotificationBuilder: Qt,
  KeosWhatsAppBuilder: Xt,
  KeosSmsBuilder: Zt,
  KeosEmailBuilder: ea
};
export {
  xf as BuilderActionsBar,
  $f as BuilderFormShell,
  ff as BuilderOutline,
  vf as BuilderShell,
  Cf as BuilderTopShell,
  Jt as BuilderVersionHistoryModal,
  Ze as DEFAULT_SAMPLE_PROFILES,
  ea as KeosEmailBuilder,
  Qt as KeosNotificationBuilder,
  Zt as KeosSmsBuilder,
  Xt as KeosWhatsAppBuilder,
  Tf as default,
  Sf as install,
  Je as renderTemplatePreview,
  pt as useAutosave,
  ct as useCampaignState
};
//# sourceMappingURL=index.js.map
