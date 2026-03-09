import { ref as be, watch as Oe, computed as w, defineComponent as Pe, openBlock as n, createElementBlock as s, normalizeStyle as Se, unref as x, createElementVNode as e, normalizeClass as $e, Fragment as E, renderList as W, toDisplayString as u, createTextVNode as G, createCommentVNode as g, withDirectives as je, vModelText as it, createStaticVNode as Ge, vModelSelect as Ye, withKeys as aa, onMounted as st, onUnmounted as lt, createVNode as Ne, createBlock as na, withModifiers as at, renderSlot as Ke } from "vue";
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
const rt = {
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
}, sa = ["android", "ios", "web"], Dt = "normal", Wt = ["low", "normal", "high"], jt = 86400, la = [3600, 7200, 86400, 172800], Ht = "1.0", oa = ["topic", "segment", "user_list"];
function yt() {
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
function ia(o) {
  return {
    schema_version: Ht,
    name: "",
    status: "draft",
    audience: yt(),
    message: gt(),
    delivery: ft(),
    tracking: kt(),
    ...o
  };
}
function qt(o) {
  const d = o;
  return d.schema_version || (d.schema_version = Ht), d.audience || (d.audience = yt()), d.message || (d.message = gt()), d.delivery || (d.delivery = ft()), d.tracking || (d.tracking = kt()), Wt.includes(d.delivery.priority) || (d.delivery.priority = Dt), d.delivery.ttl === void 0 && (d.delivery.ttl = jt), oa.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const ra = 1e5;
function ua(o, d) {
  var k, S, A;
  const p = [], h = d ?? o.audience.estimated_reach;
  return h !== void 0 && h >= ra && p.push({
    message: `Estimated reach is very high (${h.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), o.tracking && !((k = o.tracking.campaign_name) != null && k.trim()) && !((S = o.name) != null && S.trim()) && p.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (A = o.message.deep_link) != null && A.trim() || p.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), p;
}
function Ft(o, d = "error") {
  return { message: o, severity: d };
}
function zt(o) {
  const d = [];
  return o.schema_version || d.push(Ft("Missing schema_version")), {
    valid: d.length === 0,
    errors: d
  };
}
function da(o, d) {
  const p = zt(o), h = ua(o, d);
  return {
    valid: p.valid,
    errors: [
      ...p.errors,
      ...h.map((k) => Ft(k.message, k.severity))
    ]
  };
}
function ca(o) {
  return o.errors.filter((d) => d.severity === "error");
}
function pa(o) {
  return o.errors.filter((d) => d.severity !== "error");
}
function ma(o) {
  const d = String(o ?? "").trim().toLowerCase();
  return d === "authentication" ? "AUTHENTICATION" : d === "utility" ? "UTILITY" : "MARKETING";
}
function va(o, d = "template_message") {
  return (String(o ?? "").trim() || d).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || d;
}
function ba(o) {
  const d = String(o.header_type ?? "").trim().toLowerCase();
  if (d === "image")
    return "IMAGE";
  if (d === "video")
    return "VIDEO";
  if (d === "document")
    return "DOCUMENT";
  if (d === "text")
    return "TEXT";
  const p = String(o.template_type ?? "").trim().toLowerCase();
  return p === "image" ? "IMAGE" : p === "video" ? "VIDEO" : p === "document" ? "DOCUMENT" : null;
}
function nt(o, d = []) {
  if (!o)
    return { text: "", varOrder: [...d] };
  const p = [...d], h = /* @__PURE__ */ new Map();
  return p.forEach((S, A) => h.set(S, A + 1)), { text: o.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (S, A) => (h.has(A) || (h.set(A, p.length + 1), p.push(A)), `{{${h.get(A)}}}`)), varOrder: p };
}
function wt(o, d) {
  return o.map((p) => {
    const h = d == null ? void 0 : d[p];
    return typeof h == "string" && h.length > 0 ? h : `sample_${p}`;
  });
}
function ha(o, d, p) {
  if (!o || !d || p.length === 0)
    return {};
  try {
    const k = o.split(/\{\{\d+\}\}/).map((B) => B.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+?)"), S = new RegExp(`^${k}$`, "s"), A = d.match(S);
    if (!A)
      return {};
    const I = {};
    return p.forEach((B, U) => {
      const q = A[U + 1];
      q && (I[B] = q.trim());
    }), I;
  } catch {
    return {};
  }
}
function Yt(o, d) {
  const p = [];
  let h = [...d];
  return { buttons: o.slice(0, 10).map((S) => {
    const A = S, I = String(A.type ?? "quick_reply").trim().toLowerCase(), B = String(A.label ?? "").trim() || "Button";
    if (I === "url") {
      const U = nt(String(A.url ?? ""), h);
      h = U.varOrder;
      const q = String(A.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        text: B,
        url: U.text || void 0,
        ...q ? { example: [q] } : {}
      };
    }
    if (I === "call")
      return {
        type: "PHONE_NUMBER",
        text: B,
        phone_number: String(A.phone ?? "").trim() || void 0
      };
    if (I === "copy_code") {
      const U = String(A.example ?? "").trim() || void 0;
      return { type: "COPY_CODE", text: B, ...U ? { example: U } : {} };
    }
    if (I === "otp") {
      const U = String(A.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        text: B,
        otp_type: U,
        ...String(A.autofill_text ?? "").trim() ? { autofill_text: String(A.autofill_text).trim() } : {},
        ...String(A.package_name ?? "").trim() ? { package_name: String(A.package_name).trim() } : {},
        ...String(A.signature_hash ?? "").trim() ? { signature_hash: String(A.signature_hash).trim() } : {}
      };
    }
    return I === "opt_out" ? { type: "QUICK_REPLY", text: B } : { type: "QUICK_REPLY", text: B };
  }).filter((S) => !!(S != null && S.text)), varOrder: h, warnings: p };
}
function ya(o) {
  return o.slice(0, 10).map((d) => {
    const p = d, h = String(p.type ?? "quick_reply").trim().toLowerCase(), k = String(p.label ?? "").trim() || "Button";
    if (h === "url") {
      const S = String(p.url ?? "").trim() || void 0, A = String(p.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        title: k,
        ...S ? { url: S } : {},
        ...A ? { example: [A] } : {}
      };
    }
    if (h === "call")
      return {
        type: "PHONE_NUMBER",
        title: k,
        ...String(p.phone ?? "").trim() ? { phoneNumber: String(p.phone).trim() } : {}
      };
    if (h === "opt_out")
      return { type: "OPT_OUT", title: k };
    if (h === "copy_code")
      return {
        type: "COPY_CODE",
        title: k,
        ...String(p.example ?? "").trim() ? { example: String(p.example).trim() } : {}
      };
    if (h === "otp") {
      const S = String(p.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        title: k,
        otp_type: S,
        ...String(p.autofill_text ?? "").trim() ? { autofill_text: String(p.autofill_text).trim() } : {},
        ...String(p.package_name ?? "").trim() ? { package_name: String(p.package_name).trim() } : {},
        ...String(p.signature_hash ?? "").trim() ? { signature_hash: String(p.signature_hash).trim() } : {}
      };
    }
    return { type: "QUICK_REPLY", title: k };
  }).filter((d) => !!d.title);
}
function $t(o) {
  const d = {}, p = [
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
  for (const h of p)
    o[h] !== void 0 && o[h] !== null && o[h] !== "" && (d[h] = o[h]);
  return Object.keys(d).length ? d : void 0;
}
function ga(o, d = {}) {
  const p = [], h = o.message, k = [], S = va(h.template_name ?? o.name, o.name || "template_message"), A = ma(h.template_category), I = String(h.template_language ?? "en_US").trim() || "en_US";
  let B = [];
  const U = String(h.body ?? "").trim(), q = nt(U, []), ae = String(h.template_example ?? "").trim(), oe = !d.exampleData && ae ? ha(q.text, ae, q.varOrder) : {}, de = d.exampleData ?? (Object.keys(oe).length ? oe : void 0), M = ba(h), ne = String(h.header ?? "").trim();
  if (M === "TEXT" && ne) {
    const ye = nt(ne, B);
    B = ye.varOrder;
    const _e = wt(B, de);
    k.push({
      type: "HEADER",
      format: "TEXT",
      text: ye.text,
      ..._e.length ? { example: { header_text: _e } } : {}
    });
  } else M && M !== "TEXT" && (k.push({ type: "HEADER", format: M }), h.media_url || p.push(`Header format ${M} selected but media_url is empty.`));
  const F = String(h.body ?? "").trim(), ce = nt(F, B);
  B = ce.varOrder;
  const D = wt(B, de);
  k.push({
    type: "BODY",
    text: ce.text,
    ...D.length ? { example: { body_text: [D] } } : {}
  });
  const Q = String(h.footer ?? "").trim();
  if (Q) {
    const ye = nt(Q, B);
    B = ye.varOrder, k.push({
      type: "FOOTER",
      text: ye.text
    });
  }
  const Z = Array.isArray(h.buttons) ? h.buttons : [];
  if (Z.length) {
    const ye = Yt(Z, B);
    B = ye.varOrder, p.push(...ye.warnings), ye.buttons.length && k.push({ type: "BUTTONS", buttons: ye.buttons });
  }
  const se = String(h.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(se) && p.push(`template_type="${se}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: S,
      category: A,
      language: I,
      components: k
    },
    warnings: p
  };
}
const xt = {
  MARKETING: /* @__PURE__ */ new Set(["quick_reply", "url", "call", "copy_code", "opt_out"]),
  UTILITY: /* @__PURE__ */ new Set(["quick_reply", "url", "call"]),
  AUTHENTICATION: /* @__PURE__ */ new Set(["otp"])
};
function Ct(o, d = {}) {
  const p = ga(o, d), h = o.message, k = [...p.warnings], S = p.payload.category, A = S === "AUTHENTICATION", I = xt[S] ?? xt.MARKETING, U = (Array.isArray(h.buttons) ? h.buttons : []).filter(($) => {
    const O = String($.type ?? "quick_reply").trim().toLowerCase();
    return I.has(O) ? !0 : (k.push(`Button type "${O}" is not allowed for ${S}; removed from payload.`), !1);
  }), q = A ? 1 : 10;
  U.length > q && k.push(`${S} allows at most ${q} button(s); extra buttons removed.`);
  const ae = U.slice(0, q), oe = ya(ae), de = p.payload.components.filter(($) => !(A && $.type === "HEADER" || A && $.type === "FOOTER"));
  if (ae.length) {
    const $ = de.findIndex((ie) => ie.type === "BUTTONS"), { buttons: O } = Yt(ae, []), _ = { type: "BUTTONS", buttons: O };
    $ >= 0 ? de[$] = _ : O.length && de.push(_);
  } else {
    const $ = de.findIndex((O) => O.type === "BUTTONS");
    $ >= 0 && de.splice($, 1);
  }
  const M = { ...p.payload, components: de }, ne = de.find(($) => $.type === "HEADER"), F = de.find(($) => $.type === "BODY"), ce = de.find(($) => $.type === "FOOTER"), D = String(h.body ?? "").trim(), Q = String(h.header ?? "").trim(), Z = String(h.footer ?? "").trim(), se = (() => {
    const $ = String(h.template_type ?? "").trim().toLowerCase();
    return $ === "image" ? "IMAGE" : $ === "video" ? "VIDEO" : $ === "document" ? "DOCUMENT" : $ === "carousel" ? "CAROUSEL" : "TEXT";
  })(), ye = String(h.vertical ?? "").trim() || void 0, _e = String(h.template_example ?? "").trim() || void 0, ee = String(h.media_handle ?? "").trim() || void 0, f = typeof h.enable_sample == "boolean" ? h.enable_sample : void 0, R = !A && typeof h.allow_category_change == "boolean" ? h.allow_category_change : void 0, L = typeof h.add_security_recommendation == "boolean" ? h.add_security_recommendation : void 0, he = typeof h.code_expiration_minutes == "number" ? h.code_expiration_minutes : void 0;
  return { payload: {
    elementName: M.name,
    languageCode: M.language,
    category: M.category,
    templateType: se,
    content: D || (F == null ? void 0 : F.text) || "",
    ...ye ? { vertical: ye } : {},
    ..._e ? { example: _e } : {},
    ...ee ? { exampleMedia: ee } : {},
    // Header and footer are forbidden for AUTHENTICATION templates.
    ...!A && (ne == null ? void 0 : ne.format) === "TEXT" && (Q || ne.text) ? { header: Q || ne.text } : {},
    ...!A && (Z || ce != null && ce.text) ? { footer: Z || (ce == null ? void 0 : ce.text) } : {},
    ...oe.length ? { buttons: oe } : {},
    ...f !== void 0 ? { enableSample: f } : {},
    // allowTemplateCategoryChange is forbidden for AUTHENTICATION templates.
    ...R !== void 0 ? { allowTemplateCategoryChange: R } : {},
    ...L !== void 0 ? { addSecurityRecommendation: L } : {},
    ...he !== void 0 ? { codeExpirationMinutes: he } : {},
    metaTemplate: M,
    metaWhatsApp: M,
    ...$t(h) ? { advanced: $t(h) } : {}
  }, warnings: k };
}
function Xe(o, d) {
  return o.length <= d ? { text: o, truncated: !1 } : { text: o.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const ot = rt.android;
function fa(o) {
  const { title: d, body: p } = o, h = Xe(d || "", ot.title), k = Xe(p || "", ot.body);
  return {
    title: h.text,
    body: k.text,
    imageUrl: o.imageUrl,
    titleTruncated: h.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function ka(o) {
  const { title: d, body: p } = o, h = Xe(d || "", ot.title), k = Xe(p || "", ot.body);
  return {
    title: h.text,
    body: k.text,
    imageUrl: o.imageUrl,
    titleTruncated: h.truncated,
    bodyTruncated: k.truncated,
    expanded: !0
  };
}
function _a(o, d = {}) {
  const p = d.expanded ? ka(o) : fa(o);
  return d.darkMode !== void 0 && (p.darkMode = d.darkMode), p;
}
const St = rt.ios;
function Kt(o) {
  const { title: d, body: p } = o, h = Xe(d || "", St.title), k = Xe(p || "", St.body);
  return {
    title: h.text,
    body: k.text,
    imageUrl: o.imageUrl,
    titleTruncated: h.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function wa(o) {
  return Kt(o);
}
function $a(o, d = {}) {
  const p = d.variant === "lockscreen" ? wa(o) : Kt(o);
  return d.darkMode !== void 0 && (p.darkMode = d.darkMode), p;
}
const It = rt.web;
function Tt(o) {
  const { title: d, body: p } = o, h = Xe(d || "", It.title), k = Xe(p || "", It.body);
  return {
    title: h.text,
    body: k.text,
    imageUrl: o.imageUrl,
    titleTruncated: h.truncated,
    bodyTruncated: k.truncated
  };
}
function xa(o) {
  return o.map((d) => ({ message: d, severity: "error" }));
}
function pt(o) {
  return JSON.parse(JSON.stringify(o));
}
function ut(o = {}) {
  const d = be(
    qt(o.initial ?? ia())
  ), p = o.hooks ?? {}, h = be(!1), k = be([]);
  Oe(
    d,
    () => {
      if (!p.customValidators) {
        k.value = [];
        return;
      }
      p.customValidators(d.value).then((L) => {
        k.value = L;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const S = be([]), A = be([]);
  function I() {
    const L = pt(d.value);
    S.value = [...S.value.slice(-19), L], A.value = [];
  }
  const B = w(() => S.value.length > 0), U = w(() => A.value.length > 0);
  function q() {
    S.value.length !== 0 && (A.value = [pt(d.value), ...A.value], d.value = S.value[S.value.length - 1], S.value = S.value.slice(0, -1));
  }
  function ae() {
    A.value.length !== 0 && (S.value = [...S.value, pt(d.value)], d.value = A.value[0], A.value = A.value.slice(1));
  }
  Oe(
    d,
    () => {
      var L;
      h.value = !0, (L = o.onDirty) == null || L.call(o);
    },
    { deep: !0 }
  );
  const oe = w(() => zt(d.value));
  function de(L) {
    const he = da(d.value, L), re = xa(k.value), $ = [...ca(he), ...re], O = [...he.errors, ...re], _ = he.valid && re.length === 0;
    return {
      ...he,
      errors: O,
      valid: _,
      blockingErrors: $,
      warnings: pa(he)
    };
  }
  function M(L) {
    I(), d.value = { ...d.value, ...L };
  }
  function ne(L) {
    I(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...L }
    };
  }
  function F(L) {
    I(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...L }
    };
  }
  function ce(L) {
    I(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...L }
    };
  }
  function D(L) {
    I(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...L } : { campaign_name: "", tags: [], ab_test: !1, ...L }
    };
  }
  function Q(L) {
    I(), d.value = {
      ...d.value,
      message: { ...gt(), ...L }
    };
  }
  function Z(L) {
    I(), d.value = {
      ...d.value,
      delivery: { ...ft(), ...L }
    };
  }
  function se(L) {
    I(), d.value = {
      ...d.value,
      tracking: { ...kt(), ...L }
    };
  }
  function ye(L) {
    I(), d.value = {
      ...d.value,
      audience: { ...yt(), ...L }
    };
  }
  const _e = w(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function ee(L, he) {
    const re = _e.value;
    let $;
    switch (L) {
      case "android":
        $ = _a(re, { expanded: he == null ? void 0 : he.expanded });
        break;
      case "ios":
        $ = $a(re);
        break;
      case "web":
        $ = Tt(re);
        break;
      default:
        $ = Tt(re);
    }
    const O = d.value.message.actions ?? [], _ = d.value.message.location;
    return { ...$, actions: O, location: _ ?? void 0 };
  }
  const f = rt;
  async function R() {
    return p.customValidators ? p.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: h,
    validation: oe,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: k,
    getValidationWithWarnings: de,
    update: M,
    updateAudience: ne,
    updateMessage: F,
    updateDelivery: ce,
    updateTracking: D,
    undo: q,
    redo: ae,
    canUndo: B,
    canRedo: U,
    resetMessage: Q,
    resetDelivery: Z,
    resetTracking: se,
    resetAudience: ye,
    getPreview: ee,
    previewInput: _e,
    characterLimits: f,
    runCustomValidators: R,
    hooks: p
  };
}
const Ca = "keos-draft", Sa = 2e3;
function Ia(o, d) {
  return `${Ca}-${o}-${d}`;
}
function dt(o, d) {
  const p = d.channel, h = w(
    () => {
      var q, ae;
      return Ia(
        p,
        d.key ?? ((q = o.value) == null ? void 0 : q.id) ?? ((ae = o.value) == null ? void 0 : ae.name) ?? "draft"
      );
    }
  ), k = be(null);
  let S = null;
  function A() {
    try {
      const q = JSON.stringify(o.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(h.value, q), k.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function I() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(h.value);
    } catch {
    }
  }
  function B() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const q = window.localStorage.getItem(h.value);
      if (!q) return null;
      const ae = JSON.parse(q);
      return qt(ae);
    } catch {
      return null;
    }
  }
  function U() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return Oe(
    o,
    () => {
      U() && (S && clearTimeout(S), S = setTimeout(() => {
        S = null, A();
      }, Sa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: k,
    clearDraft: I,
    getDraft: B,
    persist: A
  };
}
const Ta = { class: "kb-header__row" }, Aa = ["value"], Ra = { class: "kb-header__actions" }, Ua = ["disabled"], Ea = ["disabled"], Pa = ["value"], Ba = ["value"], La = /* @__PURE__ */ Pe({
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
  setup(o, { emit: d }) {
    const p = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], h = o, k = d, S = () => !!(h.campaignName || "").trim();
    function A(U) {
      return h.slugifyName ? U.trim().replace(/\s+/g, "-") : U;
    }
    function I(U) {
      return U.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function B(U) {
      const q = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return q[U] ?? q.draft;
    }
    return (U, q) => (n(), s("header", {
      class: "kb-header",
      style: Se({
        padding: `${x(Ce)[16]}px 0`,
        borderBottom: `1px solid ${x(Ae).neutral.border}`,
        marginBottom: `${x(Ce)[16]}px`
      })
    }, [
      e("div", Ta, [
        e("div", {
          class: $e(["kb-header__name-section", { "kb-header__name-section--filled": S() }])
        }, [
          q[4] || (q[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: o.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: q[0] || (q[0] = (ae) => k("update:campaignName", A(ae.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Aa),
          q[5] || (q[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Ra, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !o.canUndo,
            onClick: q[1] || (q[1] = (ae) => k("undo"))
          }, " Undo ", 8, Ua),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !o.canRedo,
            onClick: q[2] || (q[2] = (ae) => k("redo"))
          }, " Redo ", 8, Ea)
        ]),
        o.workflowStatus !== void 0 ? (n(), s("select", {
          key: 0,
          value: o.workflowStatus,
          class: "kb-header__status-select",
          style: Se({
            padding: `${x(Ce)[4]}px ${x(Ce)[8]}px`,
            borderRadius: `${x(Qe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...B(o.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: q[3] || (q[3] = (ae) => k("update:workflowStatus", ae.target.value))
        }, [
          (n(), s(E, null, W(p, (ae) => e("option", {
            key: ae.value,
            value: ae.value
          }, u(ae.label), 9, Ba)), 64))
        ], 44, Pa)) : (n(), s("span", {
          key: 1,
          class: "kb-header__status",
          style: Se({
            padding: `${x(Ce)[4]}px ${x(Ce)[8]}px`,
            borderRadius: `${x(Qe).input}px`,
            background: x(Ae).neutral.bg,
            fontSize: "0.8125rem",
            color: x(Ae).neutral.textMuted
          })
        }, u(o.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: Se({ fontSize: "0.8125rem", color: x(Ae).neutral.textMuted, marginTop: `${x(Ce)[4]}px` })
      }, [
        o.saving ? (n(), s(E, { key: 0 }, [
          G("Saving…")
        ], 64)) : o.dirty ? (n(), s(E, { key: 1 }, [
          G("Unsaved changes")
        ], 64)) : o.lastSavedAt ? (n(), s(E, { key: 2 }, [
          G("Last saved at " + u(I(o.lastSavedAt)), 1)
        ], 64)) : g("", !0)
      ], 4)
    ], 4));
  }
}), Le = (o, d) => {
  const p = o.__vccOpts || o;
  for (const [h, k] of d)
    p[h] = k;
  return p;
}, ct = /* @__PURE__ */ Le(La, [["__scopeId", "data-v-56efb3ec"]]), Oa = { class: "kb-section" }, Na = { class: "kb-section__head" }, Ma = { class: "kb-field" }, Va = { class: "kb-label" }, Da = { class: "kb-field-with-rail" }, Wa = ["value", "aria-invalid"], ja = { class: "kb-var-picker-wrap" }, Ha = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, qa = ["onClick"], Fa = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, za = { class: "kb-field" }, Ya = { class: "kb-label" }, Ka = { class: "kb-field-with-rail" }, Ga = ["value", "aria-invalid"], Ja = { class: "kb-var-picker-wrap" }, Qa = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Xa = ["onClick"], Za = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, en = {
  class: "kb-toggle-row",
  style: { "margin-top": "0.5rem" }
}, tn = ["checked"], an = { class: "kb-field" }, nn = { class: "kb-tags-wrap" }, sn = ["onClick"], ln = { class: "kb-tag-suggestions" }, on = ["onClick"], rn = { class: "kb-field" }, un = ["value"], dn = { class: "kb-field" }, cn = ["value", "aria-invalid"], pn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, mn = ["value"], vn = { class: "kb-field" }, bn = ["value", "aria-invalid"], hn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, yn = { class: "kb-field" }, gn = { class: "kb-actions-list" }, fn = { class: "kb-action-card__head" }, kn = { class: "kb-action-card__num" }, _n = { class: "kb-action-card__type-row" }, wn = ["value", "onChange"], $n = ["value"], xn = { class: "kb-toggle-row kb-toggle-row--inline" }, Cn = ["checked", "onChange"], Sn = ["onClick"], In = ["value", "onInput"], Tn = ["value", "onInput"], An = { class: "kb-action-http-row" }, Rn = ["value", "onChange"], Un = ["value"], En = ["value", "onInput"], Pn = ["value", "onInput"], Bn = { class: "kb-kv-section" }, Ln = ["value", "onInput"], On = ["value", "onInput"], Nn = ["onClick"], Mn = ["onClick"], Vn = ["value", "onInput"], Dn = { class: "kb-kv-section" }, Wn = ["value", "onInput"], jn = ["value", "onInput"], Hn = ["onClick"], qn = ["onClick"], Fn = ["value", "onInput"], zn = { class: "kb-actions-footer" }, Yn = ["disabled"], Kn = { class: "kb-action-chips" }, Gn = ["disabled", "onClick"], Jn = { class: "kb-field" }, Qn = { class: "kb-location-row" }, Xn = ["value"], Zn = ["value"], es = ["value"], ts = ["value"], as = { class: "kb-field" }, ns = ["value"], ss = { class: "kb-field" }, ls = ["value"], os = { class: "kb-field" }, is = { class: "kb-delay-row" }, rs = ["value"], us = { class: "kb-delay-chips" }, ds = ["onClick"], cs = { class: "kb-advanced-toggles" }, ps = { class: "kb-advanced-toggles__body" }, ms = { class: "kb-toggle-row" }, vs = ["checked"], bs = { class: "kb-toggle-row" }, hs = ["checked"], ys = { class: "kb-toggle-row" }, gs = ["checked"], mt = 3, fs = /* @__PURE__ */ Pe({
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
  setup(o, { emit: d }) {
    const p = o, h = d, k = w(() => p.message), S = [
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
    ], A = w(() => {
      const O = (k.value.variables ?? []).filter(Boolean);
      return O.length ? Array.from(new Set(O)) : S;
    }), I = be(null);
    function B(O) {
      I.value = I.value === O ? null : O;
    }
    function U(O, _) {
      const ie = ` {{ .${_} }}`, J = (k.value.variables ?? []).filter(Boolean), fe = Array.from(/* @__PURE__ */ new Set([...J, _]));
      O === "title" ? h("update", { title: `${p.message.title || ""}${ie}`, variables: fe }) : h("update", { body: `${p.message.body || ""}${ie}`, variables: fe }), I.value = null;
    }
    const q = be(""), ae = w(() => k.value.tags ?? []);
    function oe() {
      const O = q.value.trim().toLowerCase().replace(/\s+/g, "_");
      if (!O) return;
      const _ = Array.from(/* @__PURE__ */ new Set([...ae.value, O]));
      h("update", { tags: _ }), q.value = "";
    }
    function de(O) {
      h("update", { tags: ae.value.filter((_) => _ !== O) });
    }
    function M(O) {
      (O.key === "Enter" || O.key === ",") && (O.preventDefault(), oe());
    }
    const ne = ["warning", "white_check_mark", "rotating_light", "loudspeaker", "package", "truck", "calendar", "key", "bell", "fire"], F = w(() => k.value.actions ?? []), ce = [
      { value: "view", label: "View", hint: "Open a URL in the browser or app." },
      { value: "http", label: "HTTP request", hint: "Send an HTTP request when tapped." },
      { value: "broadcast", label: "Broadcast", hint: "Android intent (automation apps)." },
      { value: "copy", label: "Copy to clipboard", hint: "Copy a value to the clipboard." }
    ], D = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    function Q() {
      const O = [...F.value, { id: `action_${Date.now()}`, action: "view", label: "" }];
      h("update", { actions: O });
    }
    function Z(O) {
      const _ = [...F.value];
      _.splice(O, 1), h("update", { actions: _ });
    }
    function se(O, _) {
      const ie = [...F.value];
      ie[O] = { ...ie[O], ..._ }, h("update", { actions: ie });
    }
    function ye(O, _) {
      var fe, we;
      const ie = { id: (fe = F.value[O]) == null ? void 0 : fe.id, action: _, label: ((we = F.value[O]) == null ? void 0 : we.label) ?? "" }, J = [...F.value];
      J[O] = ie, h("update", { actions: J });
    }
    function _e(O) {
      const _ = O.headers ?? {};
      return Object.entries(_).map(([ie, J]) => ({ key: ie, value: J }));
    }
    function ee(O) {
      const _ = { ...F.value[O].headers ?? {} };
      _[""] = "", se(O, { headers: _ });
    }
    function f(O, _, ie, J) {
      const fe = {};
      for (const [we, P] of Object.entries(F.value[O].headers ?? {}))
        fe[we === _ ? ie : we] = we === _ ? J : P;
      se(O, { headers: fe });
    }
    function R(O, _) {
      const ie = { ...F.value[O].headers ?? {} };
      delete ie[_], se(O, { headers: ie });
    }
    function L(O) {
      const _ = O.extras ?? {};
      return Object.entries(_).map(([ie, J]) => ({ key: ie, value: J }));
    }
    function he(O) {
      const _ = { ...F.value[O].extras ?? {} };
      _[""] = "", se(O, { extras: _ });
    }
    function re(O, _, ie, J) {
      const fe = {};
      for (const [we, P] of Object.entries(F.value[O].extras ?? {}))
        fe[we === _ ? ie : we] = we === _ ? J : P;
      se(O, { extras: fe });
    }
    function $(O, _) {
      const ie = { ...F.value[O].extras ?? {} };
      delete ie[_], se(O, { extras: ie });
    }
    return (O, _) => {
      var ie, J, fe, we;
      return n(), s("section", Oa, [
        e("div", Na, [
          _[21] || (_[21] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          o.showReset ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: _[0] || (_[0] = (P) => O.$emit("reset"))
          }, "Reset section")) : g("", !0)
        ]),
        _[45] || (_[45] = e("p", { class: "kb-section__desc" }, " Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required. ", -1)),
        e("div", Ma, [
          e("label", Va, [
            _[22] || (_[22] = G(" Title ", -1)),
            e("span", {
              class: $e(["kb-counter", { "kb-counter--warn": o.titleCount > o.titleLimit }])
            }, u(o.titleCount) + "/" + u(o.titleLimit), 3)
          ]),
          e("div", Da, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: o.message.title,
              "aria-invalid": !!o.titleError,
              onInput: _[1] || (_[1] = (P) => O.$emit("update", { title: P.target.value }))
            }, null, 40, Wa),
            e("div", ja, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: _[2] || (_[2] = (P) => B("title"))
              }, "{{ .var }}"),
              I.value === "title" ? (n(), s("div", Ha, [
                (n(!0), s(E, null, W(A.value, (P) => (n(), s("button", {
                  key: `title-var-${P}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (te) => U("title", P)
                }, u(P), 9, qa))), 128))
              ])) : g("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Se({ "--pct": Math.min(100, o.titleCount / o.titleLimit * 100) + "%" })
            }, [..._[23] || (_[23] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.titleError ? (n(), s("p", Fa, u(o.titleError), 1)) : g("", !0)
        ]),
        e("div", za, [
          e("label", Ya, [
            _[24] || (_[24] = G(" Message ", -1)),
            e("span", {
              class: $e(["kb-counter", { "kb-counter--warn": o.bodyCount > o.bodyLimit }])
            }, u(o.bodyCount) + "/" + u(o.bodyLimit), 3)
          ]),
          e("div", Ka, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: o.message.body,
              "aria-invalid": !!o.bodyError,
              onInput: _[3] || (_[3] = (P) => O.$emit("update", { body: P.target.value }))
            }, null, 40, Ga),
            e("div", Ja, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: _[4] || (_[4] = (P) => B("body"))
              }, "{{ .var }}"),
              I.value === "body" ? (n(), s("div", Qa, [
                (n(!0), s(E, null, W(A.value, (P) => (n(), s("button", {
                  key: `body-var-${P}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (te) => U("body", P)
                }, u(P), 9, Xa))), 128))
              ])) : g("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Se({ "--pct": Math.min(100, o.bodyCount / o.bodyLimit * 100) + "%" })
            }, [..._[25] || (_[25] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.bodyError ? (n(), s("p", Za, u(o.bodyError), 1)) : g("", !0),
          e("label", en, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!k.value.markdown,
              onChange: _[5] || (_[5] = (P) => O.$emit("update", { markdown: P.target.checked || void 0 }))
            }, null, 40, tn),
            _[26] || (_[26] = e("span", { class: "kb-toggle-label" }, "Enable Markdown formatting", -1))
          ])
        ]),
        e("div", an, [
          _[28] || (_[28] = e("label", { class: "kb-label" }, [
            G(" Tags "),
            e("span", { class: "kb-helper" }, [
              G("Emoji shortcodes displayed with the notification (e.g. "),
              e("code", null, "warning"),
              G(", "),
              e("code", null, "white_check_mark"),
              G(", "),
              e("code", null, "rotating_light"),
              G(").")
            ])
          ], -1)),
          e("div", nn, [
            (n(!0), s(E, null, W(ae.value, (P) => (n(), s("span", {
              key: P,
              class: "kb-tag"
            }, [
              G(u(P) + " ", 1),
              e("button", {
                type: "button",
                class: "kb-tag__remove",
                onClick: (te) => de(P),
                "aria-label": "Remove tag"
              }, "×", 8, sn)
            ]))), 128)),
            je(e("input", {
              type: "text",
              class: "kb-input kb-input--tag",
              placeholder: "Add tag, press Enter",
              "onUpdate:modelValue": _[6] || (_[6] = (P) => q.value = P),
              onKeydown: M,
              onBlur: oe
            }, null, 544), [
              [it, q.value]
            ])
          ]),
          e("div", ln, [
            _[27] || (_[27] = e("span", {
              class: "kb-helper",
              style: { "margin-right": "0.4rem" }
            }, "Common:", -1)),
            (n(), s(E, null, W(ne, (P) => e("button", {
              key: P,
              type: "button",
              class: $e(["kb-tag-chip", { "kb-tag-chip--active": ae.value.includes(P) }]),
              onClick: (te) => ae.value.includes(P) ? de(P) : (q.value = P, oe())
            }, u(P), 11, on)), 64))
          ])
        ]),
        e("div", rn, [
          _[29] || (_[29] = e("label", { class: "kb-label" }, [
            G(" Icon URL "),
            e("span", { class: "kb-helper" }, "Custom notification icon (JPEG or PNG). Shown in the notification drawer.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://example.com/icon.png",
            value: k.value.icon ?? "",
            onInput: _[7] || (_[7] = (P) => O.$emit("update", { icon: P.target.value || void 0 }))
          }, null, 40, un)
        ]),
        e("div", dn, [
          _[30] || (_[30] = e("label", { class: "kb-label" }, [
            G(" Image / Attachment URL "),
            e("span", { class: "kb-helper" }, [
              G("External file URL attached to the notification ("),
              e("code", null, "attach"),
              G("). Also used as hero image where supported.")
            ])
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: o.message.image_url ?? k.value.attach ?? "",
            "aria-invalid": !!o.imageUrlError,
            onInput: _[8] || (_[8] = (P) => O.$emit("update", { image_url: P.target.value || void 0, attach: P.target.value || void 0 }))
          }, null, 40, cn),
          o.imageUrlError ? (n(), s("p", pn, u(o.imageUrlError), 1)) : g("", !0),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Filename override (e.g. invoice.pdf) — optional",
            value: k.value.attachment_filename ?? "",
            onInput: _[9] || (_[9] = (P) => O.$emit("update", { attachment_filename: P.target.value || void 0 }))
          }, null, 40, mn)
        ]),
        e("div", vn, [
          _[31] || (_[31] = e("label", { class: "kb-label" }, [
            G(" Click URL ("),
            e("code", null, "click"),
            G(") "),
            e("span", { class: "kb-helper" }, "URL or deep link opened when the user taps the notification body.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: o.message.deep_link ?? "",
            "aria-invalid": !!o.deepLinkError,
            onInput: _[10] || (_[10] = (P) => O.$emit("update", { deep_link: P.target.value || void 0 }))
          }, null, 40, bn),
          o.deepLinkError ? (n(), s("p", hn, u(o.deepLinkError), 1)) : g("", !0)
        ]),
        e("div", yn, [
          e("label", { class: "kb-label" }, [
            _[32] || (_[32] = G(" Action buttons ", -1)),
            e("span", { class: "kb-helper" }, "Up to " + u(mt) + " interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.")
          ]),
          e("div", gn, [
            (n(!0), s(E, null, W(F.value, (P, te) => (n(), s("div", {
              key: P.id || te,
              class: "kb-action-card"
            }, [
              e("div", fn, [
                e("span", kn, "Button " + u(te + 1), 1),
                e("div", _n, [
                  e("select", {
                    class: "kb-select kb-select--action-type",
                    value: P.action,
                    onChange: (z) => ye(te, z.target.value)
                  }, [
                    (n(), s(E, null, W(ce, (z) => e("option", {
                      key: z.value,
                      value: z.value
                    }, u(z.label), 9, $n)), 64))
                  ], 40, wn),
                  e("label", xn, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!P.clear,
                      onChange: (z) => se(te, { clear: z.target.checked || void 0 })
                    }, null, 40, Cn),
                    _[33] || (_[33] = e("span", { class: "kb-toggle-label" }, "Dismiss after tap", -1))
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "kb-btn-remove-action",
                  onClick: (z) => Z(te)
                }, "Remove", 8, Sn)
              ]),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label (e.g. View order)",
                value: P.label,
                onInput: (z) => se(te, { label: z.target.value })
              }, null, 40, In),
              P.action === "view" ? (n(), s("input", {
                key: 0,
                type: "url",
                class: "kb-input",
                placeholder: "URL to open (https:// or app://)",
                value: P.url ?? "",
                onInput: (z) => se(te, { url: z.target.value || void 0 })
              }, null, 40, Tn)) : P.action === "http" ? (n(), s(E, { key: 1 }, [
                e("div", An, [
                  e("select", {
                    class: "kb-select kb-select--method",
                    value: P.method ?? "POST",
                    onChange: (z) => se(te, { method: z.target.value })
                  }, [
                    (n(), s(E, null, W(D, (z) => e("option", {
                      key: z,
                      value: z
                    }, u(z), 9, Un)), 64))
                  ], 40, Rn),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "Endpoint URL",
                    value: P.url ?? "",
                    onInput: (z) => se(te, { url: z.target.value || void 0 })
                  }, null, 40, En)
                ]),
                e("textarea", {
                  class: "kb-textarea kb-textarea--sm",
                  rows: "2",
                  placeholder: 'Request body (e.g. {"status":"closed"})',
                  value: P.body ?? "",
                  onInput: (z) => se(te, { body: z.target.value || void 0 })
                }, null, 40, Pn),
                e("div", Bn, [
                  _[34] || (_[34] = e("span", { class: "kb-kv-label" }, "Headers", -1)),
                  (n(!0), s(E, null, W(_e(P), (z, xe) => (n(), s("div", {
                    key: xe,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Header name",
                      value: z.key,
                      onInput: (pe) => f(te, z.key, pe.target.value, z.value)
                    }, null, 40, Ln),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: z.value,
                      onInput: (pe) => f(te, z.key, z.key, pe.target.value)
                    }, null, 40, On),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (pe) => R(te, z.key)
                    }, "×", 8, Nn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (z) => ee(te)
                  }, "+ Add header", 8, Mn)
                ])
              ], 64)) : P.action === "broadcast" ? (n(), s(E, { key: 2 }, [
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "Intent (default: io.heckel.ntfy.USER_ACTION)",
                  value: P.intent ?? "",
                  onInput: (z) => se(te, { intent: z.target.value || void 0 })
                }, null, 40, Vn),
                e("div", Dn, [
                  _[35] || (_[35] = e("span", { class: "kb-kv-label" }, "Extras", -1)),
                  (n(!0), s(E, null, W(L(P), (z, xe) => (n(), s("div", {
                    key: xe,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Key",
                      value: z.key,
                      onInput: (pe) => re(te, z.key, pe.target.value, z.value)
                    }, null, 40, Wn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: z.value,
                      onInput: (pe) => re(te, z.key, z.key, pe.target.value)
                    }, null, 40, jn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (pe) => $(te, z.key)
                    }, "×", 8, Hn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (z) => he(te)
                  }, "+ Add extra", 8, qn)
                ])
              ], 64)) : P.action === "copy" ? (n(), s("input", {
                key: 3,
                type: "text",
                class: "kb-input",
                placeholder: "Value to copy to clipboard",
                value: P.value ?? "",
                onInput: (z) => se(te, { value: z.target.value || void 0 })
              }, null, 40, Fn)) : g("", !0)
            ]))), 128)),
            e("div", zn, [
              e("button", {
                type: "button",
                class: "kb-btn-add-action",
                disabled: F.value.length >= mt,
                onClick: Q
              }, " Add action ", 8, Yn),
              e("div", Kn, [
                _[36] || (_[36] = e("span", { class: "kb-action-chips-label" }, "Quick add:", -1)),
                (n(), s(E, null, W(["View order", "Track shipment", "Dismiss"], (P) => e("button", {
                  key: P,
                  type: "button",
                  class: "kb-action-chip",
                  disabled: F.value.length >= mt,
                  onClick: () => {
                    const te = [...F.value, { id: `action_${Date.now()}`, action: "view", label: P }];
                    O.$emit("update", { actions: te });
                  }
                }, u(P), 9, Gn)), 64))
              ])
            ])
          ])
        ]),
        e("div", Jn, [
          _[37] || (_[37] = e("label", { class: "kb-label" }, [
            G(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Attach coordinates for rich notifications or open-in-maps support.")
          ], -1)),
          e("div", Qn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((ie = k.value.location) == null ? void 0 : ie.lat) ?? "",
              onInput: _[11] || (_[11] = (P) => {
                const te = { ...k.value.location ?? {} }, z = P.target.value;
                te.lat = z === "" ? void 0 : Number(z), O.$emit("update", { location: te });
              })
            }, null, 40, Xn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((J = k.value.location) == null ? void 0 : J.lon) ?? "",
              onInput: _[12] || (_[12] = (P) => {
                const te = { ...k.value.location ?? {} }, z = P.target.value;
                te.lon = z === "" ? void 0 : Number(z), O.$emit("update", { location: te });
              })
            }, null, 40, Zn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. HQ, Store name)",
            value: ((fe = k.value.location) == null ? void 0 : fe.name) ?? "",
            onInput: _[13] || (_[13] = (P) => {
              const te = { ...k.value.location ?? {} };
              te.name = P.target.value || void 0, O.$emit("update", { location: te });
            })
          }, null, 40, es),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Address (optional)",
            value: ((we = k.value.location) == null ? void 0 : we.address) ?? "",
            onInput: _[14] || (_[14] = (P) => {
              const te = { ...k.value.location ?? {} };
              te.address = P.target.value || void 0, O.$emit("update", { location: te });
            })
          }, null, 40, ts)
        ]),
        e("div", as, [
          _[38] || (_[38] = e("label", { class: "kb-label" }, [
            G(" Email forward ("),
            e("code", null, "email"),
            G(") "),
            e("span", { class: "kb-helper" }, "Forward this notification to an email address.")
          ], -1)),
          e("input", {
            type: "email",
            class: "kb-input",
            placeholder: "recipient@example.com",
            value: k.value.email_forward ?? "",
            onInput: _[15] || (_[15] = (P) => O.$emit("update", { email_forward: P.target.value || void 0 }))
          }, null, 40, ns)
        ]),
        e("div", ss, [
          _[39] || (_[39] = e("label", { class: "kb-label" }, [
            G(" Phone call ("),
            e("code", null, "call"),
            G(") "),
            e("span", { class: "kb-helper" }, "Initiate a phone call to this number when the notification is received.")
          ], -1)),
          e("input", {
            type: "tel",
            class: "kb-input",
            placeholder: "+1 555 123 4567",
            value: k.value.call ?? "",
            onInput: _[16] || (_[16] = (P) => O.$emit("update", { call: P.target.value || void 0 }))
          }, null, 40, ls)
        ]),
        e("div", os, [
          _[40] || (_[40] = Ge('<label class="kb-label" data-v-03f4fc73> Delivery delay (<code data-v-03f4fc73>delay</code>) <span class="kb-helper" data-v-03f4fc73>Schedule delivery for later. Accepts durations (<code data-v-03f4fc73>30min</code>, <code data-v-03f4fc73>2h</code>, <code data-v-03f4fc73>1day</code>), times (<code data-v-03f4fc73>9am</code>, <code data-v-03f4fc73>8:30pm</code>), natural language (<code data-v-03f4fc73>tomorrow, 3pm</code>), or Unix timestamps. Max 3 days.</span></label>', 1)),
          e("div", is, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. 30min, 2h, tomorrow 9am, 1693000000",
              value: k.value.delay ?? "",
              onInput: _[17] || (_[17] = (P) => O.$emit("update", { delay: P.target.value || void 0 }))
            }, null, 40, rs),
            e("div", us, [
              (n(), s(E, null, W(["30min", "1h", "4h", "tomorrow"], (P) => e("button", {
                key: P,
                type: "button",
                class: $e(["kb-delay-chip", { "kb-delay-chip--active": k.value.delay === P }]),
                onClick: (te) => O.$emit("update", { delay: k.value.delay === P ? void 0 : P })
              }, u(P), 11, ds)), 64))
            ])
          ])
        ]),
        e("details", cs, [
          _[44] || (_[44] = e("summary", { class: "kb-advanced-toggles__summary" }, "Advanced options", -1)),
          e("div", ps, [
            e("label", ms, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.cache,
                onChange: _[18] || (_[18] = (P) => O.$emit("update", { cache: P.target.checked || void 0 }))
              }, null, 40, vs),
              _[41] || (_[41] = e("span", { class: "kb-toggle-label" }, [
                G("Enable server-side caching ("),
                e("code", null, "cache"),
                G(")")
              ], -1))
            ]),
            e("label", bs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.firebase,
                onChange: _[19] || (_[19] = (P) => O.$emit("update", { firebase: P.target.checked || void 0 }))
              }, null, 40, hs),
              _[42] || (_[42] = e("span", { class: "kb-toggle-label" }, [
                G("Deliver via Firebase Cloud Messaging ("),
                e("code", null, "firebase"),
                G(")")
              ], -1))
            ]),
            e("label", ys, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!k.value.unified_push,
                onChange: _[20] || (_[20] = (P) => O.$emit("update", { unified_push: P.target.checked || void 0 }))
              }, null, 40, gs),
              _[43] || (_[43] = e("span", { class: "kb-toggle-label" }, [
                G("UnifiedPush delivery ("),
                e("code", null, "unified_push"),
                G(")")
              ], -1))
            ])
          ])
        ])
      ]);
    };
  }
}), ks = /* @__PURE__ */ Le(fs, [["__scopeId", "data-v-03f4fc73"]]), _s = { class: "kb-section kb-section--inline-personalization" }, ws = { class: "kb-field" }, $s = { class: "kb-insert-row" }, xs = ["value"], Cs = { class: "kb-field" }, Ss = { class: "kb-insert-row" }, Is = { class: "kb-field" }, Ts = { class: "kb-variable-list" }, As = /* @__PURE__ */ Pe({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(o, { emit: d }) {
    var M;
    const p = o, h = d, k = [
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
    ], A = w(
      () => (p.targets ?? []).includes("footer") ? S : k
    ), I = be(
      (M = p.variableOptions) != null && M.length ? [...p.variableOptions] : [...A.value]
    ), B = be(I.value[0] ?? A.value[0]), U = be("");
    Oe(
      () => p.variableOptions,
      (ne) => {
        ne && ne.length ? (I.value = [...ne], I.value.includes(B.value) || (B.value = I.value[0])) : (I.value = [...A.value], I.value.includes(B.value) || (B.value = I.value[0]));
      }
    ), Oe(
      A,
      (ne) => {
        var F;
        (F = p.variableOptions) != null && F.length || (I.value = [...ne], I.value.includes(B.value) || (B.value = I.value[0]));
      }
    );
    const q = w(() => I.value), ae = w(() => {
      var F;
      return (F = p.targets) != null && F.length ? p.targets : ["title", "body"];
    });
    function oe(ne) {
      h("insertVariable", { variable: B.value, field: ne });
    }
    function de() {
      const ne = U.value.trim();
      ne && (I.value.includes(ne) || (I.value = [...I.value, ne]), B.value = ne, U.value = "");
    }
    return (ne, F) => (n(), s("section", _s, [
      F[9] || (F[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      F[10] || (F[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", ws, [
        F[5] || (F[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", $s, [
          je(e("select", {
            "onUpdate:modelValue": F[0] || (F[0] = (ce) => B.value = ce),
            class: "kb-select"
          }, [
            (n(!0), s(E, null, W(q.value, (ce) => (n(), s("option", {
              key: ce,
              value: ce
            }, u(ce), 9, xs))), 128))
          ], 512), [
            [Ye, B.value]
          ]),
          ae.value.includes("title") ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: F[1] || (F[1] = (ce) => oe("title"))
          }, " Into title ")) : g("", !0),
          ae.value.includes("body") ? (n(), s("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: F[2] || (F[2] = (ce) => oe("body"))
          }, " Into message ")) : g("", !0),
          ae.value.includes("footer") ? (n(), s("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: F[3] || (F[3] = (ce) => oe("footer"))
          }, " Into footer ")) : g("", !0)
        ])
      ]),
      e("div", Cs, [
        F[6] || (F[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ss, [
          je(e("input", {
            "onUpdate:modelValue": F[4] || (F[4] = (ce) => U.value = ce),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [it, U.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: de
          }, " Add ")
        ])
      ]),
      e("div", Is, [
        F[7] || (F[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        F[8] || (F[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ts, [
          (n(!0), s(E, null, W(q.value, (ce) => (n(), s("li", { key: ce }, [
            e("code", null, "{{ ." + u(ce) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ Le(As, [["__scopeId", "data-v-ab96d6bb"]]), Rs = { class: "kb-section kb-section--template-type" }, Us = { class: "kb-field" }, Es = { class: "kb-radio-group" }, Ps = { class: "kb-radio" }, Bs = ["checked"], Ls = { class: "kb-radio" }, Os = ["checked"], Ns = /* @__PURE__ */ Pe({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(o, { emit: d }) {
    const p = d;
    return (h, k) => (n(), s("section", Rs, [
      k[5] || (k[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      k[6] || (k[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Us, [
        e("div", Es, [
          e("label", Ps, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: o.templateType === "transactional",
              onChange: k[0] || (k[0] = (S) => p("update", "transactional"))
            }, null, 40, Bs),
            k[2] || (k[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: o.templateType === "marketing",
              onChange: k[1] || (k[1] = (S) => p("update", "marketing"))
            }, null, 40, Os),
            k[3] || (k[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        k[4] || (k[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Le(Ns, [["__scopeId", "data-v-ff2e1bd8"]]), Ms = { class: "kb-section" }, Vs = { class: "kb-section__head" }, Ds = { class: "kb-section__desc" }, Ws = { class: "kb-field" }, js = { class: "kb-radio-group" }, Hs = { class: "kb-radio" }, qs = ["checked"], Fs = { class: "kb-radio" }, zs = ["checked"], Ys = {
  key: 0,
  class: "kb-field kb-row"
}, Ks = ["value"], Gs = ["value"], Js = { class: "kb-field" }, Qs = ["value"], Xs = ["value"], Zs = { class: "kb-field" }, el = ["value"], tl = ["value"], al = { class: "kb-field" }, nl = { class: "kb-checkbox" }, sl = ["checked"], ll = /* @__PURE__ */ Pe({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o) {
    const d = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (p, h) => {
      var k;
      return n(), s("section", Ms, [
        e("div", Vs, [
          h[8] || (h[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          o.showReset ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: h[0] || (h[0] = (S) => p.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        e("p", Ds, u(o.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Ws, [
          h[11] || (h[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", js, [
            e("label", Hs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !o.delivery.scheduled_at,
                onChange: h[1] || (h[1] = (S) => p.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, qs),
              h[9] || (h[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Fs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!o.delivery.scheduled_at,
                onChange: h[2] || (h[2] = (S) => p.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, zs),
              h[10] || (h[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        o.delivery.scheduled_at ? (n(), s("div", Ys, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (k = o.delivery.scheduled_at) == null ? void 0 : k.slice(0, 16),
            onInput: h[3] || (h[3] = (S) => p.$emit("update", { scheduled_at: S.target.value }))
          }, null, 40, Ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: o.delivery.timezone,
            onInput: h[4] || (h[4] = (S) => p.$emit("update", { timezone: S.target.value }))
          }, null, 40, Gs)
        ])) : g("", !0),
        o.showPushOptions ? (n(), s(E, { key: 1 }, [
          e("div", Js, [
            h[12] || (h[12] = e("label", { class: "kb-label" }, [
              G(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.ttl,
              onChange: h[5] || (h[5] = (S) => p.$emit("update", { ttl: Number(S.target.value) }))
            }, [
              (n(!0), s(E, null, W(x(la), (S) => (n(), s("option", {
                key: S,
                value: S
              }, u(d[S] ?? S + "s"), 9, Xs))), 128))
            ], 40, Qs)
          ]),
          e("div", Zs, [
            h[13] || (h[13] = e("label", { class: "kb-label" }, [
              G(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.priority,
              onChange: h[6] || (h[6] = (S) => p.$emit("update", { priority: S.target.value }))
            }, [
              (n(!0), s(E, null, W(x(Wt), (S) => (n(), s("option", {
                key: S,
                value: S
              }, u(S), 9, tl))), 128))
            ], 40, el)
          ]),
          e("div", al, [
            e("label", nl, [
              e("input", {
                type: "checkbox",
                checked: o.delivery.quiet_hours,
                onChange: h[7] || (h[7] = (S) => p.$emit("update", { quiet_hours: !o.delivery.quiet_hours }))
              }, null, 40, sl),
              h[14] || (h[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : g("", !0)
      ]);
    };
  }
}), ol = /* @__PURE__ */ Le(ll, [["__scopeId", "data-v-5707a2a7"]]), il = { class: "kb-accordion" }, rl = { class: "kb-accordion__body" }, ul = { class: "kb-field" }, dl = ["value"], cl = { class: "kb-field" }, pl = { class: "kb-checkbox" }, ml = ["checked"], vl = /* @__PURE__ */ Pe({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(o) {
    return (d, p) => (n(), s("details", il, [
      p[4] || (p[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", rl, [
        e("div", ul, [
          p[2] || (p[2] = e("label", { class: "kb-label" }, [
            G(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: o.delivery.collapse_key,
            onInput: p[0] || (p[0] = (h) => d.$emit("update", { collapse_key: h.target.value || void 0 }))
          }, null, 40, dl)
        ]),
        e("div", cl, [
          e("label", pl, [
            e("input", {
              type: "checkbox",
              checked: o.delivery.silent_push,
              onChange: p[1] || (p[1] = (h) => d.$emit("update", { silent_push: !o.delivery.silent_push }))
            }, null, 40, ml),
            p[3] || (p[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), bl = /* @__PURE__ */ Le(vl, [["__scopeId", "data-v-699e4501"]]);
function Je(o, d) {
  return !o || typeof o != "string" ? o : o.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (p, h) => {
    const S = String(h).trim().replace(/^\./, "");
    return S in d ? String(d[S]) : p;
  });
}
const Ze = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], hl = { class: "kb-preview" }, yl = { class: "kb-preview__toggle" }, gl = { class: "kb-preview__mode" }, fl = { class: "kb-preview__quality" }, kl = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, _l = ["src"], wl = { class: "kb-android-body-row" }, $l = { class: "kb-android-body-content" }, xl = {
  key: 0,
  class: "kb-android-title"
}, Cl = {
  key: 1,
  class: "kb-android-text"
}, Sl = {
  key: 2,
  class: "kb-android-location-line"
}, Il = {
  key: 0,
  class: "kb-android-thumb"
}, Tl = ["src"], Al = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Rl = ["src"], Ul = {
  key: 0,
  class: "kb-preview-map__caption"
}, El = {
  key: 2,
  class: "kb-android-actions"
}, Pl = {
  key: 3,
  class: "kb-preview-warning"
}, Bl = { class: "kb-ios-banner" }, Ll = { class: "kb-ios-content" }, Ol = {
  key: 0,
  class: "kb-ios-title"
}, Nl = {
  key: 1,
  class: "kb-ios-text"
}, Ml = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, Vl = ["src"], Dl = {
  key: 0,
  class: "kb-preview-map__caption"
}, Wl = {
  key: 4,
  class: "kb-ios-actions"
}, jl = {
  key: 5,
  class: "kb-preview-warning"
}, Hl = {
  key: 0,
  class: "kb-ios-thumb"
}, ql = ["src"], Fl = { class: "kb-web-toast" }, zl = { class: "kb-web-body" }, Yl = {
  key: 0,
  class: "kb-web-title"
}, Kl = {
  key: 1,
  class: "kb-web-text"
}, Gl = {
  key: 3,
  class: "kb-web-image"
}, Jl = ["src"], Ql = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Xl = ["src"], Zl = {
  key: 0,
  class: "kb-preview-map__caption"
}, eo = {
  key: 0,
  class: "kb-web-actions"
}, to = {
  key: 1,
  class: "kb-preview-warning"
}, ao = /* @__PURE__ */ Pe({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(o) {
    const d = o, p = be("shade"), h = be("banner"), k = be("toast"), S = w(() => p.value === "expanded"), A = w(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? S.value : void 0
      })
    ), I = w(() => {
      const ee = A.value;
      return d.previewProfile ? {
        ...ee,
        title: Je((ee == null ? void 0 : ee.title) ?? "", d.previewProfile.data),
        body: Je((ee == null ? void 0 : ee.body) ?? "", d.previewProfile.data)
      } : ee;
    }), B = {
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
    function U(ee, f) {
      const R = (ee ?? "").trim();
      return R ? R.length <= f ? R : `${R.slice(0, Math.max(0, f - 1)).trimEnd()}…` : "";
    }
    const q = w(() => d.selectedPlatform === "android" ? p.value : d.selectedPlatform === "ios" ? h.value : k.value), ae = w(() => (B[d.selectedPlatform] ?? B.web)[q.value] ?? { title: 60, body: 160 }), oe = w(
      () => {
        var ee;
        return U((ee = I.value) == null ? void 0 : ee.title, ae.value.title);
      }
    ), de = w(
      () => {
        var ee;
        return U((ee = I.value) == null ? void 0 : ee.body, ae.value.body);
      }
    ), M = { android: 3, ios: 4, web: 2 }, ne = w(
      () => {
        var ee;
        return Array.isArray((ee = I.value) == null ? void 0 : ee.actions) ? I.value.actions : [];
      }
    ), F = w(
      () => ne.value.slice(0, M[d.selectedPlatform] ?? 2)
    ), ce = w(
      () => Math.max(0, ne.value.length - F.value.length)
    ), D = w(() => {
      var ee;
      return (((ee = d.message) == null ? void 0 : ee.deep_link) ?? "").trim();
    }), Q = w(() => D.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(D.value) : !1), Z = w(() => D.value ? D.value.length <= 40 ? D.value : `${D.value.slice(0, 37)}…` : ""), se = w(() => {
      var f, R, L;
      const ee = [];
      return (f = d.delivery) != null && f.priority && ee.push(`Priority: ${d.delivery.priority}`), typeof ((R = d.delivery) == null ? void 0 : R.ttl) == "number" && ee.push(`TTL: ${d.delivery.ttl}s`), (L = d.delivery) != null && L.silent_push && ee.push("Silent push"), ee;
    }), ye = w(() => {
      var re;
      const ee = (re = I.value) == null ? void 0 : re.location;
      if (!ee || ee.lat == null && ee.lon == null) return null;
      const f = Number(ee.lat) || 0, R = Number(ee.lon) || 0, L = 8e-3, he = [R - L, f - L, R + L, f + L].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(he)}&layer=mapnik&marker=${f},${R}`;
    }), _e = w(() => {
      var f;
      const ee = (f = I.value) == null ? void 0 : f.location;
      return ee && (ee.lat != null || ee.lon != null || ee.name || ee.address);
    });
    return (ee, f) => {
      var R, L, he, re, $, O, _, ie, J, fe, we, P, te, z, xe, pe;
      return n(), s("div", hl, [
        e("div", yl, [
          e("label", gl, [
            f[6] || (f[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            o.selectedPlatform === "android" ? je((n(), s("select", {
              key: 0,
              "onUpdate:modelValue": f[0] || (f[0] = (ve) => p.value = ve),
              class: "kb-preview__mode-select"
            }, [...f[3] || (f[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ye, p.value]
            ]) : o.selectedPlatform === "ios" ? je((n(), s("select", {
              key: 1,
              "onUpdate:modelValue": f[1] || (f[1] = (ve) => h.value = ve),
              class: "kb-preview__mode-select"
            }, [...f[4] || (f[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ye, h.value]
            ]) : je((n(), s("select", {
              key: 2,
              "onUpdate:modelValue": f[2] || (f[2] = (ve) => k.value = ve),
              class: "kb-preview__mode-select"
            }, [...f[5] || (f[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ye, k.value]
            ])
          ]),
          e("div", fl, [
            (n(!0), s(E, null, W(se.value, (ve) => (n(), s("span", {
              key: ve,
              class: "kb-preview__badge"
            }, u(ve), 1))), 128))
          ])
        ]),
        o.selectedPlatform === "android" ? (n(), s("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: $e(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${p.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          f[9] || (f[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: $e(["kb-android-notification", { "kb-android-notification--expanded": S.value }])
          }, [
            f[8] || (f[8] = Ge('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: $e(["kb-android-body", { "kb-android-body--expanded": S.value }])
            }, [
              S.value && I.value.imageUrl ? (n(), s("div", kl, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, _l)
              ])) : g("", !0),
              e("div", wl, [
                e("div", $l, [
                  oe.value ? (n(), s("div", xl, u(oe.value), 1)) : g("", !0),
                  de.value ? (n(), s("div", Cl, u(de.value), 1)) : g("", !0),
                  _e.value && !S.value && ((R = I.value.location) != null && R.name || (L = I.value.location) != null && L.address) ? (n(), s("div", Sl, [
                    f[7] || (f[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    G(" " + u(((he = I.value.location) == null ? void 0 : he.name) || ((re = I.value.location) == null ? void 0 : re.address)), 1)
                  ])) : g("", !0),
                  D.value ? (n(), s("div", {
                    key: 3,
                    class: $e(["kb-preview-link", { "kb-preview-link--invalid": !Q.value }])
                  }, u(Q.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0)
                ]),
                !S.value && I.value.imageUrl ? (n(), s("div", Il, [
                  e("img", {
                    src: I.value.imageUrl,
                    alt: ""
                  }, null, 8, Tl)
                ])) : g("", !0)
              ]),
              _e.value && ye.value && S.value ? (n(), s("div", Al, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Rl),
                ($ = I.value.location) != null && $.name || (O = I.value.location) != null && O.address ? (n(), s("div", Ul, u(((_ = I.value.location) == null ? void 0 : _.name) || ((ie = I.value.location) == null ? void 0 : ie.address)), 1)) : g("", !0)
              ])) : g("", !0),
              F.value.length ? (n(), s("div", El, [
                (n(!0), s(E, null, W(F.value, (ve) => (n(), s("button", {
                  key: ve.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, u(ve.label || "Action"), 1))), 128))
              ])) : g("", !0),
              ce.value > 0 ? (n(), s("p", Pl, " Showing " + u(F.value.length) + " of " + u(ne.value.length) + " actions on " + u(o.selectedPlatform) + ". ", 1)) : g("", !0)
            ], 2)
          ], 2)
        ], 2)) : o.selectedPlatform === "ios" ? (n(), s("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: $e(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${h.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          f[12] || (f[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", Bl, [
            f[11] || (f[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Ll, [
              f[10] || (f[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              oe.value ? (n(), s("div", Ol, u(oe.value), 1)) : g("", !0),
              de.value ? (n(), s("div", Nl, u(de.value), 1)) : g("", !0),
              D.value ? (n(), s("div", {
                key: 2,
                class: $e(["kb-preview-link", { "kb-preview-link--invalid": !Q.value }])
              }, u(Q.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0),
              _e.value && ye.value ? (n(), s("div", Ml, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Vl),
                (J = I.value.location) != null && J.name || (fe = I.value.location) != null && fe.address ? (n(), s("div", Dl, u(((we = I.value.location) == null ? void 0 : we.name) || ((P = I.value.location) == null ? void 0 : P.address)), 1)) : g("", !0)
              ])) : g("", !0),
              F.value.length ? (n(), s("div", Wl, [
                (n(!0), s(E, null, W(F.value, (ve) => (n(), s("button", {
                  key: ve.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, u(ve.label || "Action"), 1))), 128))
              ])) : g("", !0),
              ce.value > 0 ? (n(), s("p", jl, " Showing " + u(F.value.length) + " of " + u(ne.value.length) + " actions on " + u(o.selectedPlatform) + ". ", 1)) : g("", !0)
            ]),
            I.value.imageUrl ? (n(), s("div", Hl, [
              e("img", {
                src: I.value.imageUrl,
                alt: ""
              }, null, 8, ql)
            ])) : g("", !0)
          ])
        ], 2)) : (n(), s("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: $e(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${k.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          f[14] || (f[14] = Ge('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", Fl, [
            f[13] || (f[13] = Ge('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", zl, [
              oe.value ? (n(), s("div", Yl, u(oe.value), 1)) : g("", !0),
              de.value ? (n(), s("div", Kl, u(de.value), 1)) : g("", !0),
              D.value ? (n(), s("div", {
                key: 2,
                class: $e(["kb-preview-link", { "kb-preview-link--invalid": !Q.value }])
              }, u(Q.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0),
              I.value.imageUrl ? (n(), s("div", Gl, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, Jl)
              ])) : g("", !0),
              _e.value && ye.value ? (n(), s("div", Ql, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Xl),
                (te = I.value.location) != null && te.name || (z = I.value.location) != null && z.address ? (n(), s("div", Zl, u(((xe = I.value.location) == null ? void 0 : xe.name) || ((pe = I.value.location) == null ? void 0 : pe.address)), 1)) : g("", !0)
              ])) : g("", !0)
            ]),
            F.value.length ? (n(), s("div", eo, [
              (n(!0), s(E, null, W(F.value, (ve, Re) => (n(), s("button", {
                key: ve.id || Re,
                type: "button",
                class: $e(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Re) > 0 }])
              }, u(ve.label || "Action"), 3))), 128))
            ])) : g("", !0),
            ce.value > 0 ? (n(), s("p", to, " Showing " + u(F.value.length) + " of " + u(ne.value.length) + " actions on " + u(o.selectedPlatform) + ". ", 1)) : g("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), no = /* @__PURE__ */ Le(ao, [["__scopeId", "data-v-4fc616d9"]]), so = { class: "kb-version-dialog" }, lo = {
  key: 0,
  class: "kb-version-empty"
}, oo = {
  key: 1,
  class: "kb-version-list"
}, io = { class: "kb-version-item-label" }, ro = ["onClick"], uo = { class: "kb-version-actions" }, co = /* @__PURE__ */ Pe({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(o, { emit: d }) {
    const p = d;
    function h(k) {
      try {
        return new Date(k).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return k;
      }
    }
    return (k, S) => o.open ? (n(), s("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: S[1] || (S[1] = aa((A) => p("close"), ["escape"]))
    }, [
      e("div", so, [
        S[2] || (S[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        S[3] || (S[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        o.versions.length === 0 ? (n(), s("div", lo, ' No versions saved yet. Use "Save as version" to create one. ')) : (n(), s("ul", oo, [
          (n(!0), s(E, null, W(o.versions, (A) => (n(), s("li", {
            key: A.id,
            class: "kb-version-item"
          }, [
            e("span", io, u(A.label || h(A.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (I) => {
                p("restore", A.snapshot), p("close");
              }
            }, " Restore ", 8, ro)
          ]))), 128))
        ])),
        e("div", uo, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: S[0] || (S[0] = (A) => p("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : g("", !0);
  }
}), Jt = /* @__PURE__ */ Le(co, [["__scopeId", "data-v-ce35a513"]]), At = [
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
], po = [
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
], Ut = [
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
], mo = { class: "keos-notification-builder" }, vo = { class: "kb-builder-top" }, bo = { class: "kb-push-layout" }, ho = { class: "kb-push-sidebar" }, yo = {
  key: 0,
  class: "kb-push-form"
}, go = {
  key: 0,
  class: "kb-hint-card"
}, fo = { class: "kb-push-form-head" }, ko = { class: "kb-push-form-head-top" }, _o = { class: "kb-push-health-pill" }, wo = { class: "kb-push-form-head-row" }, $o = ["value"], xo = { class: "kb-push-health" }, Co = { class: "kb-push-health-row" }, So = { class: "kb-push-health-value" }, Io = { class: "kb-push-health-bar" }, To = {
  key: 1,
  class: "kb-push-form"
}, Ao = { class: "kb-push-canvas" }, Ro = {
  key: 0,
  class: "kb-push-test-banner"
}, Uo = { class: "kb-push-preview-chrome" }, Eo = { class: "kb-push-preview-controls" }, Po = { class: "kb-push-preview-as" }, Bo = ["value"], Lo = { class: "kb-preview-status" }, Oo = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, No = ["aria-selected", "aria-controls", "onClick"], Mo = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Vo = { class: "kb-push-actions" }, Do = {
  key: 0,
  class: "kb-actions-note"
}, Wo = { key: 0 }, jo = { class: "kb-push-actions-right" }, Ho = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, qo = { class: "kb-confirm-dialog" }, Fo = { class: "kb-confirm-actions" }, zo = /* @__PURE__ */ Pe({
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
  setup(o, { emit: d }) {
    const p = o, h = d, k = be("android"), S = be(""), A = be(!1), I = be(null), B = be(!1), U = w(
      () => M.value.workflow_status ?? "draft"
    ), q = w(() => {
      const t = S.value;
      return t ? Ze.find((l) => l.id === t) ?? null : null;
    });
    function ae(t) {
      const l = M.value, y = t.campaign.message ? { ...l.message, ...t.campaign.message } : l.message, v = t.campaign.delivery ? { ...l.delivery, ...t.campaign.delivery } : l.delivery;
      D({
        ...t.campaign,
        message: y,
        delivery: v
      }), I.value = null, A.value = !1;
    }
    function oe(t) {
      const l = t.target.value;
      if (!l) return;
      const y = At.find((v) => v.id === l);
      y && (ne.value ? (I.value = y, A.value = !0) : ae(y), t.target.value = "");
    }
    function de(t) {
      M.value = t, B.value = !1;
    }
    const {
      campaign: M,
      dirty: ne,
      customValidatorErrors: F,
      getValidationWithWarnings: ce,
      update: D,
      updateMessage: Q,
      updateDelivery: Z,
      undo: se,
      redo: ye,
      canUndo: _e,
      canRedo: ee,
      resetMessage: f,
      resetDelivery: R,
      getPreview: L,
      characterLimits: he,
      hooks: re
    } = ut({
      initial: p.modelValue,
      hooks: {
        ...p.hooks,
        customValidators: async (t) => {
          var v, j, T, N;
          const l = [];
          (v = t.name) != null && v.trim() || l.push("Template name is required"), (T = (j = t.message) == null ? void 0 : j.body) != null && T.trim() || l.push("Message body is required");
          const y = (N = p.hooks) != null && N.customValidators ? await p.hooks.customValidators(t) : [];
          return [...l, ...y];
        }
      },
      onDirty: () => h("change", M.value)
    }), { lastSavedAt: $ } = dt(M, { channel: "push" });
    function O(t) {
      (t.metaKey || t.ctrlKey) && t.key === "z" && (t.preventDefault(), t.shiftKey ? ye() : se());
    }
    st(() => {
      window.addEventListener("keydown", O);
    }), lt(() => {
      window.removeEventListener("keydown", O);
    }), Oe(M, (t) => h("update:modelValue", t), { deep: !0 });
    const _ = be(), ie = be(!0), J = be(!0);
    async function fe() {
      if (re.estimateReach)
        try {
          _.value = await re.estimateReach(M.value.audience);
        } catch {
          _.value = void 0;
        }
      re.canSend && (ie.value = await Promise.resolve(re.canSend())), re.canSchedule && (J.value = await Promise.resolve(re.canSchedule()));
    }
    fe(), Oe(() => M.value.audience, fe, { deep: !0 });
    const we = w(() => (F.value, ce(_.value))), P = w(() => we.value.blockingErrors), te = w(() => we.value.warnings), z = w(() => we.value.valid), xe = w(() => {
      var v, j, T;
      const t = M.value.message, l = [
        !!((v = M.value.name) != null && v.trim()),
        !!((j = t.title) != null && j.trim()),
        !!((T = t.body) != null && T.trim()),
        !!(t.template_type ?? M.value.template_type),
        Array.isArray(t.actions) ? t.actions.length > 0 : !1
      ], y = l.filter(Boolean).length;
      return Math.round(y / l.length * 100);
    }), pe = w(() => xe.value >= 90 ? "Production ready" : xe.value >= 70 ? "Strong draft" : xe.value >= 40 ? "In progress" : "Needs setup"), ve = w(() => {
      const t = M.value.message;
      return !!((t.title ?? "").toString().trim() || (t.body ?? "").toString().trim() || Array.isArray(t.actions) && t.actions.length);
    }), Re = w(
      () => he[k.value].title
    ), Be = w(() => he[k.value].body), Ee = w(() => M.value.message.title.length), We = w(() => M.value.message.body.length), qe = w(() => {
      if (Ee.value > Re.value)
        return `Title exceeds ${Re.value} characters for ${k.value}.`;
    }), Me = w(() => {
      const t = P.value.find(
        (l) => l.message === "Message body is required"
      );
      if (t) return t.message;
      if (We.value > Be.value)
        return `Body exceeds ${Be} characters for ${k.value}.`;
    }), He = w(
      () => M.value.template_type ?? "transactional"
    );
    function Ve(t) {
      D({ template_type: t });
    }
    function V(t) {
      D({
        name: t,
        tracking: { ...M.value.tracking ?? {}, campaign_name: t }
      });
    }
    function c(t) {
      const l = ` {{ .${t.variable} }}`, y = M.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...y, t.variable]));
      t.field === "title" ? Q({
        title: M.value.message.title + l,
        variables: v
      }) : Q({
        body: M.value.message.body + l,
        variables: v
      });
    }
    function b() {
      z.value && h("save", M.value);
    }
    return (t, l) => {
      var y;
      return n(), s("div", mo, [
        e("div", vo, [
          Ne(ct, {
            "campaign-name": x(M).name,
            status: x(M).status,
            dirty: x(ne),
            "last-saved-at": x($),
            "can-undo": x(_e),
            "can-redo": x(ee),
            "workflow-status": U.value,
            "slugify-name": p.enforceSlugName,
            "onUpdate:campaignName": V,
            "onUpdate:workflowStatus": l[0] || (l[0] = (v) => x(D)({ workflow_status: v })),
            onUndo: x(se),
            onRedo: x(ye)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          P.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Qe).input}px`,
              padding: `${x(Ce)[12]}px ${x(Ce)[16]}px`,
              marginBottom: `${x(Ce)[16]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (n(!0), s(E, null, W(P.value, (v) => (n(), s("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", bo, [
          e("aside", ho, [
            o.disabledSections.includes("message") ? g("", !0) : (n(), s("div", yo, [
              !x(M).message.title && !x(M).message.body ? (n(), s("div", go, " Add a title and message below to get started. ")) : g("", !0),
              e("div", fo, [
                e("div", ko, [
                  l[12] || (l[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", _o, u(pe.value), 1)
                ]),
                e("div", wo, [
                  Ne(_t, {
                    "template-type": He.value,
                    onUpdate: Ve
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: oe
                  }, [
                    l[13] || (l[13] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(E, null, W(x(At), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, $o))), 128))
                  ], 32)
                ]),
                e("div", xo, [
                  e("div", Co, [
                    l[14] || (l[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", So, u(xe.value) + "%", 1)
                  ]),
                  e("div", Io, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: Se({ width: `${xe.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ne(ks, {
                message: x(M).message,
                "title-count": Ee.value,
                "body-count": We.value,
                "title-limit": Re.value,
                "body-limit": Be.value,
                "selected-platform": k.value,
                "show-reset": !0,
                "title-error": qe.value,
                "body-error": Me.value,
                onUpdate: x(Q),
                onReset: l[1] || (l[1] = (v) => x(f)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Ne(Gt, {
                message: x(M).message,
                "variable-options": o.variableOptions,
                onUpdate: x(Q),
                onInsertVariable: c
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !o.designOnly && !o.disabledSections.includes("delivery") ? (n(), s("div", To, [
              l[15] || (l[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Ne(ol, {
                delivery: x(M).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: x(Z),
                onReset: l[2] || (l[2] = (v) => x(R)())
              }, null, 8, ["delivery", "onUpdate"]),
              Ne(bl, {
                delivery: x(M).delivery,
                onUpdate: x(Z)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : g("", !0)
          ]),
          e("main", Ao, [
            !o.designOnly && x(M).audience.test_mode ? (n(), s("div", Ro, [...l[16] || (l[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Uo, [
              e("div", Eo, [
                e("label", Po, [
                  l[18] || (l[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[3] || (l[3] = (v) => S.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[17] || (l[17] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(E, null, W(x(Ze), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Bo))), 128))
                  ], 512), [
                    [Ye, S.value]
                  ])
                ]),
                e("div", Lo, [
                  l[19] || (l[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(k.value), 1)
                ])
              ]),
              e("div", Oo, [
                (n(), s(E, null, W(["android", "ios", "web"], (v) => e("button", {
                  key: v,
                  type: "button",
                  class: $e(["kb-push-device-btn", { "kb-push-device-btn--active": k.value === v }]),
                  role: "tab",
                  "aria-selected": k.value === v,
                  "aria-controls": `kb-preview-panel-${v}`,
                  onClick: (j) => k.value = v
                }, u(v.toUpperCase()), 11, No)), 64))
              ]),
              e("div", {
                class: $e(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !ve.value }])
              }, [
                !x(M).message.title && !x(M).message.body ? (n(), s("div", Mo, [...l[20] || (l[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (n(), na(no, {
                  key: 1,
                  "get-preview": x(L),
                  "selected-platform": k.value,
                  "preview-profile": q.value,
                  message: x(M).message,
                  delivery: x(M).delivery,
                  "onUpdate:selectedPlatform": l[4] || (l[4] = (v) => k.value = v)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Vo, [
          te.value.length > 0 ? (n(), s("div", Do, [
            l[21] || (l[21] = e("strong", null, "Warning:", -1)),
            G(" " + u((y = te.value[0]) == null ? void 0 : y.message) + " ", 1),
            te.value.length > 1 ? (n(), s("span", Wo, " (+" + u(te.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", jo, [
            !o.designOnly && o.showHistory ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[5] || (l[5] = (v) => B.value = !0)
            }, " Version history ")) : g("", !0),
            !o.designOnly && o.showSaveVersion ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[6] || (l[6] = (v) => h("save-version", JSON.parse(JSON.stringify(x(M)))))
            }, " Save as version ")) : g("", !0),
            o.showDuplicate ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[7] || (l[7] = (v) => h("duplicate", JSON.parse(JSON.stringify(x(M)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (n(), s("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: b
            }, " Save ")) : g("", !0),
            o.showClose ? (n(), s("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: l[8] || (l[8] = (v) => h("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        A.value ? (n(), s("div", Ho, [
          e("div", qo, [
            l[22] || (l[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[23] || (l[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Fo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: l[9] || (l[9] = (v) => {
                  A.value = !1, I.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: l[10] || (l[10] = (v) => I.value && ae(I.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0),
        Ne(Jt, {
          open: B.value,
          versions: o.versions,
          onClose: l[11] || (l[11] = (v) => B.value = !1),
          onRestore: de
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Qt = /* @__PURE__ */ Le(zo, [["__scopeId", "data-v-18771e1a"]]), Yo = { class: "kb-section" }, Ko = { class: "kb-section__head" }, Go = { class: "kb-summary-bar" }, Jo = { class: "kb-pill kb-pill--category" }, Qo = { class: "kb-pill kb-pill--format" }, Xo = { class: "kb-pill kb-pill--status" }, Zo = { class: "kb-field" }, ei = ["value"], ti = ["value", "disabled"], ai = { class: "kb-field" }, ni = { class: "kb-label" }, si = { class: "kb-helper" }, li = ["value"], oi = ["value"], ii = { class: "kb-field" }, ri = ["value"], ui = { class: "kb-field kb-field--inline kb-field--language-limits" }, di = { class: "kb-field-half" }, ci = ["value"], pi = { class: "kb-field" }, mi = ["value"], vi = { class: "kb-field kb-field--toggles" }, bi = { class: "kb-toggle-row" }, hi = ["checked"], yi = {
  key: 0,
  class: "kb-toggle-row"
}, gi = ["checked"], fi = {
  key: 0,
  class: "kb-field"
}, ki = ["value"], _i = {
  key: 1,
  class: "kb-field"
}, wi = { class: "kb-label" }, $i = { class: "kb-input-with-var" }, xi = ["value"], Ci = { class: "kb-var-picker-wrap" }, Si = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Ii = ["onClick"], Ti = {
  key: 2,
  class: "kb-field"
}, Ai = ["value"], Ri = {
  key: 3,
  class: "kb-field"
}, Ui = ["value"], Ei = {
  key: 4,
  class: "kb-field"
}, Pi = ["value"], Bi = {
  key: 5,
  class: "kb-field"
}, Li = ["value"], Oi = {
  key: 6,
  class: "kb-field"
}, Ni = ["value"], Mi = {
  key: 7,
  class: "kb-field"
}, Vi = ["value"], Di = ["value"], Wi = {
  key: 8,
  class: "kb-field"
}, ji = { class: "kb-wa-buttons" }, Hi = { class: "kb-carousel-card__head" }, qi = { class: "kb-carousel-card__num" }, Fi = ["onClick"], zi = { class: "kb-field-inline-2" }, Yi = ["value", "onChange"], Ki = ["value", "onInput"], Gi = ["value", "onInput"], Ji = ["value", "onInput"], Qi = { class: "kb-carousel-card__btns" }, Xi = ["value", "onInput"], Zi = ["value", "onChange"], er = ["value", "onInput"], tr = ["value", "onInput"], ar = ["onClick"], nr = ["disabled", "onClick"], sr = ["disabled"], lr = {
  key: 9,
  class: "kb-field"
}, or = { class: "kb-wa-buttons" }, ir = ["value", "onInput"], rr = ["value", "onInput"], ur = ["onClick"], dr = {
  key: 10,
  class: "kb-field"
}, cr = ["value"], pr = ["value"], mr = { class: "kb-auth-options" }, vr = { class: "kb-toggle-row" }, br = ["checked"], hr = { class: "kb-auth-expiry" }, yr = ["value"], gr = { class: "kb-field" }, fr = { class: "kb-label" }, kr = { class: "kb-input-with-var" }, _r = ["value"], wr = { class: "kb-var-picker-wrap" }, $r = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, xr = ["onClick"], Cr = { class: "kb-field" }, Sr = ["value"], Ir = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, Tr = { class: "kb-wa-fields-list" }, Ar = { class: "kb-wa-field-name" }, Rr = { class: "kb-wa-field-status" }, Ur = {
  key: 12,
  class: "kb-field"
}, Er = { class: "kb-input-with-var" }, Pr = ["value"], Br = { class: "kb-var-picker-wrap" }, Lr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Or = ["onClick"], Nr = {
  key: 13,
  class: "kb-field"
}, Mr = { class: "kb-label" }, Vr = { class: "kb-helper" }, Dr = { class: "kb-wa-buttons" }, Wr = { class: "kb-input-with-var kb-input-with-var--btn" }, jr = ["value", "onInput"], Hr = { class: "kb-var-picker-wrap" }, qr = ["onClick"], Fr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, zr = ["onClick"], Yr = ["value", "onChange"], Kr = ["value"], Gr = ["value", "onInput"], Jr = ["value", "onInput"], Qr = ["value", "onInput"], Xr = ["value", "onInput"], Zr = ["value", "onChange"], eu = ["value", "onInput"], tu = ["value", "onInput"], au = ["value", "onInput"], nu = {
  key: 4,
  class: "kb-opt-out-note"
}, su = ["onClick"], lu = ["disabled"], vt = 60, bt = 1024, ht = 60, Et = 10, Pt = 10, ou = /* @__PURE__ */ Pe({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(o, { emit: d }) {
    const p = o, h = d, k = [
      { value: "text", label: "Text", hint: "Standard text template." },
      { value: "image", label: "Rich media (image header)", hint: "Body with image in header." },
      { value: "video", label: "Rich media (video header)", hint: "Body with video in header." },
      { value: "document", label: "Rich media (document header)", hint: "Body with PDF/document in header." },
      { value: "carousel", label: "Carousel", hint: "Up to 10 cards with media + buttons. Marketing only." },
      { value: "flow", label: "WhatsApp Flow", hint: "Launch a multi-step in-chat flow." },
      { value: "lto", label: "Limited-time offer", hint: "Adds expiry urgency to the offer. Marketing only." },
      { value: "catalog", label: "Catalog", hint: "Open WhatsApp catalog or product list. Marketing only." },
      { value: "mpm", label: "Multi-product", hint: "Show multiple products in one template. Marketing only." },
      { value: "auth", label: "Authentication", hint: "OTP/login verification template. Authentication only." }
    ], S = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], A = {
      marketing: ["text", "image", "video", "document", "carousel", "flow", "lto", "catalog", "mpm"],
      utility: ["text", "image", "video", "document", "flow"],
      authentication: ["auth"]
    }, I = {
      marketing: ["quick_reply", "url", "call", "copy_code", "opt_out"],
      utility: ["quick_reply", "url", "call"],
      authentication: ["otp"]
    }, B = [
      { value: "quick_reply", label: "Quick reply" },
      { value: "url", label: "Visit URL" },
      { value: "call", label: "Call phone" },
      { value: "copy_code", label: "Copy coupon code" },
      { value: "otp", label: "OTP (authentication only)" },
      { value: "opt_out", label: "Marketing opt-out" }
    ], U = w(() => p.message), q = w(() => U.value.template_type ?? "text"), ae = w(() => String(U.value.template_category ?? "marketing").trim()), oe = w(() => U.value.header_type ?? "none"), de = w(() => String(U.value.header ?? "")), M = w(() => String(U.value.body ?? "")), ne = w(() => String(U.value.footer ?? "")), F = w(() => U.value.buttons ?? []), ce = w(() => U.value.products ?? []), D = w(() => U.value.cards ?? []), Q = w(() => {
      const V = k.find((c) => c.value === q.value);
      return (V == null ? void 0 : V.hint) ?? "Choose the approved WhatsApp template format.";
    }), Z = w(() => {
      const V = String(U.value.template_category ?? "").trim();
      return V ? V.charAt(0).toUpperCase() + V.slice(1) : "Uncategorized";
    }), se = w(() => {
      const V = k.find((c) => c.value === q.value);
      return (V == null ? void 0 : V.label) ?? "Text";
    }), ye = w(() => U.value.template_name ? M.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), _e = w(() => new Set((p.disabledCategories ?? []).map((V) => String(V).trim()))), ee = w(() => new Set((p.disabledFormats ?? []).map((V) => String(V).trim()))), f = w(() => {
      const V = new Set(A[ae.value] ?? A.marketing);
      return k.filter((c) => V.has(c.value) && !ee.value.has(c.value));
    }), R = w(() => {
      const V = new Set(I[ae.value] ?? I.marketing);
      return B.filter((c) => V.has(c.value));
    }), L = w(() => ae.value === "authentication" ? 1 : Et), he = w(() => ae.value === "authentication");
    function re(V) {
      if (!V || typeof V != "string") return [];
      const c = /\{\{\s*([^}]+?)\s*\}\}/g, b = /* @__PURE__ */ new Set();
      let t;
      for (; (t = c.exec(V)) !== null; ) b.add(t[1].trim());
      return Array.from(b);
    }
    const $ = w(() => {
      const V = p.message.header ?? "", c = p.message.body ?? p.message.body ?? "", b = new Set(p.message.variables ?? []), t = [...re(V), ...re(c)];
      return Array.from(new Set(t)).map((y) => ({ name: y, configured: b.has(y) }));
    }), O = [
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
    ], _ = w(() => {
      const V = (p.message.variables ?? []).filter(Boolean);
      return V.length ? Array.from(new Set(V)) : O;
    }), ie = be(null);
    function J(V) {
      h("update", V);
    }
    function fe(V) {
      ie.value = ie.value === V ? null : V;
    }
    function we(V, c) {
      var y;
      const b = ` {{ .${c} }}`, t = (p.message.variables ?? []).filter(Boolean), l = Array.from(/* @__PURE__ */ new Set([...t, c]));
      if (V === "header")
        J({ header: `${de.value || ""}${b}`, variables: l });
      else if (V === "body")
        J({ body: `${M.value || ""}${b}`, variables: l });
      else if (V === "footer")
        J({ footer: `${ne.value || ""}${b}`, variables: l });
      else if (V.startsWith("btn-label:")) {
        const v = Number(V.split(":")[1]);
        Number.isFinite(v) && z(v, { label: `${String(((y = F.value[v]) == null ? void 0 : y.label) ?? "")}${b}` }), J({ variables: l });
      }
      ie.value = null;
    }
    function P(V) {
      const c = {
        template_category: V || void 0
      };
      new Set(A[V] ?? A.marketing).has(q.value) ? V === "authentication" && q.value !== "auth" && (c.template_type = "auth") : c.template_type = V === "authentication" ? "auth" : "text", V === "authentication" && (c.header_type = void 0, c.header = void 0, c.footer = void 0, c.allow_category_change = void 0, c.media_url = void 0, c.media_handle = void 0, c.media_caption = void 0, c.document_filename = void 0);
      const t = new Set(I[V] ?? I.marketing), l = F.value.filter((y) => t.has(y.type ?? "quick_reply"));
      l.length !== F.value.length && (c.buttons = l), J(c);
    }
    function te(V) {
      const c = { template_type: V };
      V === "auth" && (c.template_category = "authentication"), V === "image" || V === "video" || V === "document" ? c.header_type = V : (oe.value === "image" || oe.value === "video" || oe.value === "document") && (c.header_type = "none"), J(c);
    }
    function z(V, c) {
      var t;
      const b = [...F.value];
      b[V] = {
        ...b[V],
        id: ((t = b[V]) == null ? void 0 : t.id) || `btn_${V + 1}`,
        ...c
      }, J({ buttons: b });
    }
    function xe(V) {
      const c = [...F.value];
      c.splice(V, 1), J({ buttons: c });
    }
    function pe() {
      var b;
      if (F.value.length >= L.value) return;
      const V = ((b = R.value[0]) == null ? void 0 : b.value) ?? "quick_reply", c = [...F.value];
      c.push({ id: `btn_${c.length + 1}`, label: "", type: V }), J({ buttons: c });
    }
    function ve(V, c) {
      var t;
      const b = [...ce.value];
      b[V] = {
        ...b[V],
        id: ((t = b[V]) == null ? void 0 : t.id) || `prod_${V + 1}`,
        ...c
      }, J({ products: b });
    }
    function Re(V) {
      const c = [...ce.value];
      c.splice(V, 1), J({ products: c });
    }
    function Be() {
      const V = [...ce.value];
      V.push({ id: `prod_${V.length + 1}`, productId: "" }), J({ products: V });
    }
    function Ee(V, c) {
      var t;
      const b = [...D.value];
      b[V] = {
        ...b[V],
        id: ((t = b[V]) == null ? void 0 : t.id) || `card_${V + 1}`,
        ...c
      }, J({ cards: b });
    }
    function We(V) {
      const c = [...D.value];
      c.splice(V, 1), J({ cards: c });
    }
    function qe() {
      const V = [...D.value];
      V.push({
        id: `card_${V.length + 1}`,
        headerType: "IMAGE",
        mediaId: "",
        body: "",
        sampleText: "",
        buttons: []
      }), J({ cards: V });
    }
    function Me(V) {
      const c = [...D.value], b = { ...c[V] };
      b.buttons = [...b.buttons ?? [], { type: "QUICK_REPLY", label: "" }], c[V] = b, J({ cards: c });
    }
    function He(V, c) {
      const b = [...D.value], t = { ...b[V] };
      t.buttons = [...t.buttons ?? []], t.buttons.splice(c, 1), b[V] = t, J({ cards: b });
    }
    function Ve(V, c, b) {
      const t = [...D.value], l = { ...t[V] };
      l.buttons = [...l.buttons ?? []], l.buttons[c] = { ...l.buttons[c], ...b }, t[V] = l, J({ cards: t });
    }
    return (V, c) => (n(), s("section", Yo, [
      e("div", Ko, [
        c[26] || (c[26] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        o.showReset ? (n(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: c[0] || (c[0] = (b) => V.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      c[67] || (c[67] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Go, [
        e("span", Jo, u(Z.value), 1),
        e("span", Qo, u(se.value), 1),
        e("span", Xo, u(ye.value), 1)
      ]),
      e("div", Zo, [
        c[28] || (c[28] = e("label", { class: "kb-label" }, [
          G(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: U.value.template_category ?? "",
          onChange: c[1] || (c[1] = (b) => P(b.target.value))
        }, [
          c[27] || (c[27] = e("option", { value: "" }, "Select category", -1)),
          (n(), s(E, null, W(S, (b) => e("option", {
            key: b.value,
            value: b.value,
            disabled: _e.value.has(b.value)
          }, u(b.label) + u(_e.value.has(b.value) ? " (Disabled)" : ""), 9, ti)), 64))
        ], 40, ei)
      ]),
      e("div", ai, [
        e("label", ni, [
          c[29] || (c[29] = G(" Functional format ", -1)),
          e("span", si, u(Q.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: q.value,
          onChange: c[2] || (c[2] = (b) => te(b.target.value))
        }, [
          (n(!0), s(E, null, W(f.value, (b) => (n(), s("option", {
            key: b.value,
            value: b.value
          }, u(b.label), 9, oi))), 128))
        ], 40, li)
      ]),
      e("div", ii, [
        c[30] || (c[30] = e("label", { class: "kb-label" }, [
          G(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: U.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, ri)
      ]),
      e("div", ui, [
        e("div", di, [
          c[31] || (c[31] = e("label", { class: "kb-label" }, [
            G(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: U.value.template_language ?? "",
            onInput: c[3] || (c[3] = (b) => J({
              template_language: b.target.value || void 0
            }))
          }, null, 40, ci)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            c[32] || (c[32] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + u(vt) + " chars"),
              e("li", null, "Body: " + u(bt) + " chars"),
              e("li", null, "Footer: " + u(ht) + " chars"),
              e("li", null, "Buttons: up to " + u(Et))
            ])
          ])
        ])
      ]),
      e("div", pi, [
        c[33] || (c[33] = e("label", { class: "kb-label" }, [
          G(" Vertical (use-case label) "),
          e("span", { class: "kb-helper" }, 'Describes the business use-case shown during Meta review. Required by Gupshup (e.g. "Order Updates", "Promotions", "Authentication").')
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order Updates",
          value: U.value.vertical ?? "",
          onInput: c[4] || (c[4] = (b) => J({
            vertical: b.target.value || void 0
          }))
        }, null, 40, mi)
      ]),
      e("div", vi, [
        c[36] || (c[36] = e("label", { class: "kb-label" }, "Submission options", -1)),
        e("label", bi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!U.value.enable_sample,
            onChange: c[5] || (c[5] = (b) => J({ enable_sample: b.target.checked || void 0 }))
          }, null, 40, hi),
          c[34] || (c[34] = e("span", { class: "kb-toggle-label" }, "Include sample data in Meta review", -1))
        ]),
        he.value ? g("", !0) : (n(), s("label", yi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!U.value.allow_category_change,
            onChange: c[6] || (c[6] = (b) => J({ allow_category_change: b.target.checked || void 0 }))
          }, null, 40, gi),
          c[35] || (c[35] = e("span", { class: "kb-toggle-label" }, "Allow Meta to re-categorize this template", -1))
        ]))
      ]),
      he.value ? g("", !0) : (n(), s("div", fi, [
        c[38] || (c[38] = e("label", { class: "kb-label" }, [
          G(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: oe.value,
          onChange: c[7] || (c[7] = (b) => J({ header_type: b.target.value }))
        }, [...c[37] || (c[37] = [
          Ge('<option value="none" data-v-4702767b>No header</option><option value="text" data-v-4702767b>Text header</option><option value="image" data-v-4702767b>Image header</option><option value="video" data-v-4702767b>Video header</option><option value="document" data-v-4702767b>Document header</option>', 5)
        ])], 40, ki)
      ])),
      oe.value === "text" ? (n(), s("div", _i, [
        e("label", wi, [
          c[39] || (c[39] = G(" Header text ", -1)),
          e("span", {
            class: $e(["kb-counter", { "kb-counter--warn": de.value.length > vt }])
          }, u(de.value.length) + "/" + u(vt), 3)
        ]),
        e("div", $i, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: de.value,
            onInput: c[8] || (c[8] = (b) => J({
              header: b.target.value || void 0
            }))
          }, null, 40, xi),
          e("div", Ci, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: c[9] || (c[9] = (b) => fe("header"))
            }, "{{ .var }}"),
            ie.value === "header" ? (n(), s("div", Si, [
              (n(!0), s(E, null, W(_.value, (b) => (n(), s("button", {
                key: `wa-header-var-${b}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (t) => we("header", b)
              }, u(b), 9, Ii))), 128))
            ])) : g("", !0)
          ])
        ])
      ])) : g("", !0),
      ["image", "video", "document"].includes(oe.value) || ["image", "video", "document"].includes(q.value) ? (n(), s("div", Ti, [
        c[40] || (c[40] = e("label", { class: "kb-label" }, [
          G(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: U.value.media_url ?? "",
          onInput: c[10] || (c[10] = (b) => J({
            media_url: b.target.value || void 0
          }))
        }, null, 40, Ai)
      ])) : g("", !0),
      ["image", "video", "document"].includes(oe.value) || ["image", "video", "document"].includes(q.value) ? (n(), s("div", Ri, [
        c[41] || (c[41] = e("label", { class: "kb-label" }, [
          G(" Media handle (exampleMedia) "),
          e("span", { class: "kb-helper" }, "Gupshup media handle ID obtained after uploading via the media upload API. Required for template approval with rich media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. 6462811350485912",
          value: U.value.media_handle ?? "",
          onInput: c[11] || (c[11] = (b) => J({
            media_handle: b.target.value || void 0
          }))
        }, null, 40, Ui)
      ])) : g("", !0),
      oe.value === "document" || q.value === "document" ? (n(), s("div", Ei, [
        c[42] || (c[42] = e("label", { class: "kb-label" }, [
          G(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: U.value.document_filename ?? "",
          onInput: c[12] || (c[12] = (b) => J({
            document_filename: b.target.value || void 0
          }))
        }, null, 40, Pi)
      ])) : g("", !0),
      ["image", "video", "document"].includes(oe.value) || ["image", "video", "document"].includes(q.value) ? (n(), s("div", Bi, [
        c[43] || (c[43] = e("label", { class: "kb-label" }, [
          G(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: U.value.media_caption ?? "",
          onInput: c[13] || (c[13] = (b) => J({
            media_caption: b.target.value || void 0
          }))
        }, null, 40, Li)
      ])) : g("", !0),
      q.value === "lto" ? (n(), s("div", Oi, [
        c[44] || (c[44] = e("label", { class: "kb-label" }, [
          G(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: U.value.lto_expiry ?? "",
          onInput: c[14] || (c[14] = (b) => J({
            lto_expiry: b.target.value || void 0
          }))
        }, null, 40, Ni)
      ])) : g("", !0),
      q.value === "flow" ? (n(), s("div", Mi, [
        c[45] || (c[45] = e("label", { class: "kb-label" }, [
          G(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: U.value.flow_id ?? "",
          onInput: c[15] || (c[15] = (b) => J({
            flow_id: b.target.value || void 0
          }))
        }, null, 40, Vi),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: U.value.flow_cta_label ?? "",
          onInput: c[16] || (c[16] = (b) => J({
            flow_cta_label: b.target.value || void 0
          }))
        }, null, 40, Di)
      ])) : g("", !0),
      q.value === "carousel" ? (n(), s("div", Wi, [
        e("label", { class: "kb-label" }, [
          c[46] || (c[46] = G(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "MARKETING only. Each card requires a media header (IMAGE or VIDEO), body text, and can have URL + quick-reply buttons. Max " + u(Pt) + " cards.")
        ]),
        e("div", ji, [
          (n(!0), s(E, null, W(D.value, (b, t) => (n(), s("div", {
            key: b.id || t,
            class: "kb-carousel-card"
          }, [
            e("div", Hi, [
              e("span", qi, "Card " + u(t + 1), 1),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (l) => We(Number(t))
              }, "Remove", 8, Fi)
            ]),
            e("div", zi, [
              e("div", null, [
                c[48] || (c[48] = e("label", { class: "kb-label kb-label--sm" }, "Header type", -1)),
                e("select", {
                  class: "kb-select",
                  value: b.headerType ?? "IMAGE",
                  onChange: (l) => Ee(Number(t), { headerType: l.target.value })
                }, [...c[47] || (c[47] = [
                  e("option", { value: "IMAGE" }, "Image", -1),
                  e("option", { value: "VIDEO" }, "Video", -1)
                ])], 40, Yi)
              ]),
              e("div", null, [
                c[49] || (c[49] = e("label", { class: "kb-label kb-label--sm" }, "Media handle ID", -1)),
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "e.g. 6462811350485912",
                  value: b.mediaId ?? "",
                  onInput: (l) => Ee(Number(t), { mediaId: l.target.value })
                }, null, 40, Ki)
              ])
            ]),
            e("div", null, [
              c[50] || (c[50] = e("label", { class: "kb-label kb-label--sm" }, "Card body", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body text with {{1}} variables",
                value: b.body ?? "",
                onInput: (l) => Ee(Number(t), { body: l.target.value })
              }, null, 40, Gi)
            ]),
            e("div", null, [
              c[51] || (c[51] = e("label", { class: "kb-label kb-label--sm" }, "Sample text (body with real values for Meta approval)", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body with real values filled in",
                value: b.sampleText ?? "",
                onInput: (l) => Ee(Number(t), { sampleText: l.target.value })
              }, null, 40, Ji)
            ]),
            e("div", Qi, [
              c[53] || (c[53] = e("label", { class: "kb-label kb-label--sm" }, "Card buttons", -1)),
              (n(!0), s(E, null, W(b.buttons ?? [], (l, y) => (n(), s("div", {
                key: y,
                class: "kb-wa-button-row kb-wa-button-row--sm"
              }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-label",
                  placeholder: "Button label",
                  value: l.label ?? "",
                  onInput: (v) => Ve(Number(t), Number(y), { label: v.target.value })
                }, null, 40, Xi),
                e("select", {
                  class: "kb-select kb-select--btn-type",
                  value: l.type ?? "QUICK_REPLY",
                  onChange: (v) => Ve(Number(t), Number(y), { type: v.target.value })
                }, [...c[52] || (c[52] = [
                  e("option", { value: "QUICK_REPLY" }, "Quick reply", -1),
                  e("option", { value: "URL" }, "Visit URL", -1)
                ])], 40, Zi),
                l.type === "URL" ? (n(), s(E, { key: 0 }, [
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "https://example.com/shop?promo={{1}}",
                    value: l.url ?? "",
                    onInput: (v) => Ve(Number(t), Number(y), { url: v.target.value })
                  }, null, 40, er),
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "Example URL (e.g. https://example.com/shop?promo=SUMMER23)",
                    value: l.url_example ?? "",
                    onInput: (v) => Ve(Number(t), Number(y), { url_example: v.target.value })
                  }, null, 40, tr)
                ], 64)) : g("", !0),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-remove",
                  onClick: (v) => He(Number(t), Number(y))
                }, "Remove", 8, ar)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "kb-wa-btn-add",
                disabled: (b.buttons ?? []).length >= 2,
                onClick: (l) => Me(Number(t))
              }, " Add button ", 8, nr)
            ])
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: D.value.length >= Pt,
            onClick: qe
          }, " Add card ", 8, sr)
        ])
      ])) : g("", !0),
      ["mpm", "catalog"].includes(q.value) ? (n(), s("div", lr, [
        c[54] || (c[54] = e("label", { class: "kb-label" }, [
          G(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", or, [
          (n(!0), s(E, null, W(ce.value, (b, t) => (n(), s("div", {
            key: b.id || t,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: b.productId,
              onInput: (l) => ve(Number(t), { productId: l.target.value })
            }, null, 40, ir),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: b.sectionTitle,
              onInput: (l) => ve(Number(t), { sectionTitle: l.target.value || void 0 })
            }, null, 40, rr),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (l) => Re(Number(t))
            }, " Remove ", 8, ur)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: Be
          }, " Add product ")
        ])
      ])) : g("", !0),
      q.value === "auth" ? (n(), s("div", dr, [
        c[58] || (c[58] = e("label", { class: "kb-label" }, [
          G(" Authentication template "),
          e("span", { class: "kb-helper" }, "Category must be AUTHENTICATION. Only OTP buttons allowed; no media, URLs, or custom body text.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: U.value.auth_type ?? "otp",
          onChange: c[17] || (c[17] = (b) => J({
            auth_type: b.target.value
          }))
        }, [...c[55] || (c[55] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, cr),
        e("input", {
          type: "text",
          class: "kb-input",
          style: { "margin-top": "0.5rem" },
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: U.value.auth_label ?? "",
          onInput: c[18] || (c[18] = (b) => J({
            auth_label: b.target.value || void 0
          }))
        }, null, 40, pr),
        e("div", mr, [
          e("label", vr, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!U.value.add_security_recommendation,
              onChange: c[19] || (c[19] = (b) => J({ add_security_recommendation: b.target.checked || void 0 }))
            }, null, 40, br),
            c[56] || (c[56] = e("span", { class: "kb-toggle-label" }, "Add security recommendation (warns user not to share code)", -1))
          ]),
          e("div", hr, [
            c[57] || (c[57] = e("label", { class: "kb-label kb-label--sm" }, "Code expiration (minutes)", -1)),
            e("input", {
              type: "number",
              class: "kb-input kb-input--sm",
              placeholder: "e.g. 10",
              min: "1",
              value: U.value.code_expiration_minutes ?? "",
              onInput: c[20] || (c[20] = (b) => {
                const t = parseInt(b.target.value, 10);
                J({ code_expiration_minutes: isNaN(t) ? void 0 : t });
              })
            }, null, 40, yr)
          ])
        ])
      ])) : g("", !0),
      e("div", gr, [
        e("label", fr, [
          c[59] || (c[59] = G(" Body ", -1)),
          c[60] || (c[60] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: $e(["kb-counter", { "kb-counter--warn": M.value.length > bt }])
          }, u(M.value.length) + "/" + u(bt), 3)
        ]),
        e("div", kr, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
            value: M.value,
            onInput: c[21] || (c[21] = (b) => J({
              body: b.target.value || void 0
            }))
          }, null, 40, _r),
          e("div", wr, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: c[22] || (c[22] = (b) => fe("body"))
            }, "{{ .var }}"),
            ie.value === "body" ? (n(), s("div", $r, [
              (n(!0), s(E, null, W(_.value, (b) => (n(), s("button", {
                key: `wa-body-var-${b}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (t) => we("body", b)
              }, u(b), 9, xr))), 128))
            ])) : g("", !0)
          ])
        ])
      ]),
      e("div", Cr, [
        c[61] || (c[61] = e("label", { class: "kb-label" }, [
          G(" Body example (for Meta approval) "),
          e("span", { class: "kb-helper" }, "Paste the body text with placeholders replaced by real sample values. Required by Meta for template approval.")
        ], -1)),
        e("textarea", {
          class: "kb-textarea",
          rows: "3",
          placeholder: "Hi John, your order ORD-5531 has been shipped...",
          value: U.value.template_example ?? "",
          onInput: c[23] || (c[23] = (b) => J({
            template_example: b.target.value || void 0
          }))
        }, null, 40, Sr)
      ]),
      $.value.length > 0 ? (n(), s("div", Ir, [
        c[62] || (c[62] = e("label", { class: "kb-label" }, "Template fields", -1)),
        c[63] || (c[63] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", Tr, [
          (n(!0), s(E, null, W($.value, (b) => (n(), s("li", {
            key: b.name,
            class: $e(["kb-wa-field-item", { "kb-wa-field-item--ok": b.configured }])
          }, [
            e("span", Ar, u(b.name), 1),
            e("span", Rr, u(b.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : g("", !0),
      he.value ? g("", !0) : (n(), s("div", Ur, [
        c[64] || (c[64] = e("label", { class: "kb-label" }, [
          G(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("div", Er, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: ne.value,
            onInput: c[24] || (c[24] = (b) => J({
              footer: b.target.value || void 0
            }))
          }, null, 40, Pr),
          e("div", Br, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: c[25] || (c[25] = (b) => fe("footer"))
            }, "{{ .var }}"),
            ie.value === "footer" ? (n(), s("div", Lr, [
              (n(!0), s(E, null, W(_.value, (b) => (n(), s("button", {
                key: `wa-footer-var-${b}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (t) => we("footer", b)
              }, u(b), 9, Or))), 128))
            ])) : g("", !0)
          ])
        ]),
        e("div", {
          class: $e(["kb-counter kb-counter--inline", { "kb-counter--warn": ne.value.length > ht }])
        }, u(ne.value.length) + "/" + u(ht), 3)
      ])),
      M.value.trim().length > 0 ? (n(), s("div", Nr, [
        e("label", Mr, [
          c[65] || (c[65] = G(" Buttons (optional) ", -1)),
          e("span", Vr, " Available types depend on the selected category. Max " + u(L.value) + " button" + u(L.value === 1 ? "" : "s") + ". ", 1)
        ]),
        e("div", Dr, [
          (n(!0), s(E, null, W(F.value, (b, t) => (n(), s("div", {
            key: b.id || t,
            class: "kb-wa-button-row"
          }, [
            e("div", Wr, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: b.label,
                onInput: (l) => z(Number(t), { label: l.target.value })
              }, null, 40, jr),
              e("div", Hr, [
                e("button", {
                  type: "button",
                  class: "kb-btn-insert",
                  onClick: (l) => fe(`btn-label:${t}`)
                }, "{{ .var }}", 8, qr),
                ie.value === `btn-label:${t}` ? (n(), s("div", Fr, [
                  (n(!0), s(E, null, W(_.value, (l) => (n(), s("button", {
                    key: `wa-btn-label-var-${t}-${l}`,
                    type: "button",
                    class: "kb-var-menu-item",
                    onClick: (y) => we(`btn-label:${t}`, l)
                  }, u(l), 9, zr))), 128))
                ])) : g("", !0)
              ])
            ]),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: b.type ?? "quick_reply",
              onChange: (l) => z(Number(t), { type: l.target.value })
            }, [
              (n(!0), s(E, null, W(R.value, (l) => (n(), s("option", {
                key: l.value,
                value: l.value
              }, u(l.label), 9, Kr))), 128))
            ], 40, Yr),
            b.type === "url" ? (n(), s(E, { key: 0 }, [
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://example.com/path/{{1}}",
                value: b.url,
                onInput: (l) => z(Number(t), { url: l.target.value || void 0 })
              }, null, 40, Gr),
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "Example URL with real value (e.g. https://example.com/path/ORD-5531)",
                value: b.url_example,
                onInput: (l) => z(Number(t), { url_example: l.target.value || void 0 })
              }, null, 40, Jr)
            ], 64)) : b.type === "call" ? (n(), s("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: b.phone,
              onInput: (l) => z(Number(t), { phone: l.target.value || void 0 })
            }, null, 40, Qr)) : b.type === "copy_code" ? (n(), s("input", {
              key: 2,
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Example coupon code (e.g. SAVE30DEC)",
              value: b.example,
              onInput: (l) => z(Number(t), { example: l.target.value || void 0 })
            }, null, 40, Xr)) : b.type === "otp" ? (n(), s(E, { key: 3 }, [
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: b.otp_type ?? "COPY_CODE",
                onChange: (l) => z(Number(t), { otp_type: l.target.value })
              }, [...c[66] || (c[66] = [
                e("option", { value: "COPY_CODE" }, "Copy code", -1),
                e("option", { value: "ONE_TAP" }, "One-tap autofill", -1)
              ])], 40, Zr),
              b.otp_type === "ONE_TAP" ? (n(), s(E, { key: 0 }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Autofill button text (e.g. Tap to autofill)",
                  value: b.autofill_text,
                  onInput: (l) => z(Number(t), { autofill_text: l.target.value || void 0 })
                }, null, 40, eu),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Android package name (e.g. com.example.app)",
                  value: b.package_name,
                  onInput: (l) => z(Number(t), { package_name: l.target.value || void 0 })
                }, null, 40, tu),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "App signature hash",
                  value: b.signature_hash,
                  onInput: (l) => z(Number(t), { signature_hash: l.target.value || void 0 })
                }, null, 40, au)
              ], 64)) : g("", !0)
            ], 64)) : b.type === "opt_out" ? (n(), s("span", nu, " Sends a built-in opt-out action. ")) : g("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (l) => xe(Number(t))
            }, " Remove ", 8, su)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: F.value.length >= L.value,
            onClick: pe
          }, " Add button ", 8, lu)
        ])
      ])) : g("", !0)
    ]));
  }
}), iu = /* @__PURE__ */ Le(ou, [["__scopeId", "data-v-4702767b"]]), ru = { class: "wa-preview-root" }, uu = { class: "wa-device" }, du = { class: "wa-screen" }, cu = { class: "wa-header" }, pu = { class: "wa-titleblock" }, mu = { class: "wa-title-row" }, vu = { class: "wa-title" }, bu = { class: "wa-subtitle" }, hu = {
  key: 0,
  class: "wa-flow-shell"
}, yu = { class: "wa-flow-header" }, gu = { class: "wa-flow-title" }, fu = { class: "wa-flow-content" }, ku = { class: "wa-flow-eyebrow" }, _u = {
  key: 0,
  class: "wa-flow-products"
}, wu = { class: "wa-flow-footer" }, $u = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, xu = { class: "wa-managed" }, Cu = {
  key: 1,
  class: "wa-thread"
}, Su = { class: "wa-secure-banner" }, Iu = { class: "wa-msg wa-msg--in" }, Tu = { class: "wa-template-card" }, Au = {
  key: 0,
  class: "wa-card-media"
}, Ru = ["src"], Uu = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, Eu = ["src"], Pu = { class: "wa-card-media-doc-icon" }, Bu = ["title"], Lu = {
  key: 3,
  class: "wa-card-media-fallback"
}, Ou = { class: "wa-card-media-tag" }, Nu = { class: "wa-card-media-sub" }, Mu = {
  key: 1,
  class: "wa-card-header-text"
}, Vu = ["innerHTML"], Du = {
  key: 2,
  class: "wa-link-preview"
}, Wu = { class: "wa-link-preview-head" }, ju = { class: "wa-link-preview-text" }, Hu = ["href"], qu = {
  key: 3,
  class: "wa-inline-note"
}, Fu = {
  key: 4,
  class: "wa-inline-note"
}, zu = {
  key: 5,
  class: "wa-inline-note"
}, Yu = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Ku = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, Gu = {
  key: 8,
  class: "wa-product-list"
}, Ju = { class: "wa-product-name" }, Qu = { class: "wa-product-price" }, Xu = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Zu = {
  key: 10,
  class: "wa-template-actions"
}, ed = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, td = { class: "wa-order-card" }, ad = { class: "wa-order-card-top" }, nd = ["src"], sd = { type: "button" }, ld = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, od = { class: "wa-document-card" }, id = { class: "wa-document-file" }, rd = { class: "wa-document-icon" }, ud = ["title"], dd = { class: "wa-document-caption" }, cd = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, pd = { class: "wa-voice-card" }, md = { class: "wa-voice-top" }, vd = { class: "wa-voice-profile" }, bd = ["src"], hd = { class: "wa-voice-duration" }, yd = { class: "wa-voice-transcript" }, gd = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, fd = { class: "wa-contact-card" }, kd = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, _d = { class: "wa-location-card" }, wd = { class: "wa-location-content" }, $d = { type: "button" }, xd = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Cd = { class: "wa-carousel-track" }, Sd = { type: "button" }, Id = { class: "wa-msg wa-msg--out" }, Td = { class: "wa-bubble wa-bubble--out" }, Ad = { class: "wa-bubble-author" }, Rd = {
  key: 0,
  class: "wa-reaction"
}, Ud = { class: "wa-msg wa-msg--in" }, Ed = { class: "wa-bubble wa-bubble--in" }, Pd = /* @__PURE__ */ Pe({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(o) {
    const d = o;
    function p(f) {
      return String(f).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const h = w(() => {
      var L;
      const f = ((L = d.template) == null ? void 0 : L.body) ?? "";
      return p(f).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), k = w(() => d.template.templateName || "Ecoshop"), S = w(() => "Business Account"), A = w(() => d.template.format === "flow" || !!d.template.flow), I = w(() => {
      var f;
      return (f = d.template.buttons) == null ? void 0 : f[0];
    }), B = w(() => {
      var f, R;
      return ((f = I.value) == null ? void 0 : f.text) || ((R = d.template.flow) == null ? void 0 : R.ctaLabel) || "";
    }), U = w(() => d.template.buttons ?? []), q = w(() => {
      var f;
      return (((f = d.template.multiProduct) == null ? void 0 : f.length) ?? 0) > 0;
    }), ae = w(() => (d.template.format || "text").toUpperCase()), oe = w(() => {
      const f = d.template.header;
      return !f || f.type === "text" ? "" : f.type === "image" ? f.url || "Image" : f.type === "video" ? f.url || "Video" : f.filename || f.url || "Document";
    }), de = w(() => {
      const f = d.template.header;
      if (!(!f || f.type !== "image" || !f.url))
        return { backgroundImage: `url(${f.url})` };
    });
    function M(f) {
      if (!f) return "";
      try {
        const R = f.split("?")[0].split("#")[0], L = R.substring(R.lastIndexOf("/") + 1);
        return decodeURIComponent(L || "");
      } catch {
        return "";
      }
    }
    const ne = w(() => {
      const f = d.template.header;
      return !f || f.type !== "document" ? "" : f.filename || M(f.url) || "document.pdf";
    }), F = w(() => {
      const f = (d.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (f == null ? void 0 : f[0]) || "";
    });
    function ce(f) {
      try {
        return new URL(f).hostname;
      } catch {
        return "example.com";
      }
    }
    const D = w(() => {
      const f = d.template.linkPreview;
      return !f && !F.value ? null : {
        title: (f == null ? void 0 : f.title) || "Link preview",
        description: (f == null ? void 0 : f.description) || "Preview from your WhatsApp template link.",
        domain: (f == null ? void 0 : f.domain) || (F.value ? ce(F.value) : "example.com"),
        url: (f == null ? void 0 : f.url) || F.value || "#",
        thumbnail: (f == null ? void 0 : f.thumbnail) || ""
      };
    }), Q = w(() => {
      var L, he, re;
      const R = (re = (((L = d.template.documentCard) == null ? void 0 : L.filename) || ((he = d.template.header) == null ? void 0 : he.filename) || "").split(".").pop()) == null ? void 0 : re.trim().toUpperCase();
      return R ? R.slice(0, 4) : "DOC";
    });
    function Z(f, R) {
      return f === "phone_number" ? "wa-btn-icon--phone" : f === "url" ? "wa-btn-icon--external" : f === "copy_code" ? "wa-btn-icon--code" : f === "opt_out" || (R || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (R || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const se = w(() => {
      var f;
      return d.template.location || d.template.locationRequest ? "wa-side-icon--info" : ((f = d.template.header) == null ? void 0 : f.type) === "video" || d.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ye = w(() => {
      var R, L, he;
      const f = d.template;
      return f.format === "flow" ? "Thanks, we received your preferences." : (R = f.auth) != null && R.code ? "Use the verification code and let us know if it works." : (L = f.coupon) != null && L.code ? `Your coupon ${f.coupon.code} is active now.` : f.limitedOffer ? `Great choice. This offer is valid until ${f.limitedOffer}.` : (he = d.template.multiProduct) != null && he.length ? `Here are ${d.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), _e = w(() => {
      var R, L;
      const f = d.template;
      return f.location ? f.location.name || f.location.address || `${f.location.lat}, ${f.location.lng}` : (R = f.auth) != null && R.code ? `Verification code: ${f.auth.code}` : (L = f.flow) != null && L.id ? `Flow ID: ${f.flow.id}` : f.templateLanguage ? `Template language: ${f.templateLanguage}` : `Category: ${f.templateCategory || "utility"} • Format: ${f.format || "text"}`;
    }), ee = w(() => {
      var L, he;
      const f = d.template;
      if ((L = f.multiProduct) != null && L.length) return f.multiProduct.slice(0, 5).map((re) => re.name || "Product");
      if ((he = f.buttons) != null && he.length) return f.buttons.slice(0, 5).map((re) => re.text || "Option");
      const R = (f.body || "").split(/\n|\.|,/).map((re) => re.trim()).filter(Boolean).slice(0, 5);
      return R.length ? R : ["Option A", "Option B", "Option C"];
    });
    return (f, R) => {
      var L, he, re, $, O, _, ie, J, fe, we, P, te, z, xe;
      return n(), s("div", ru, [
        e("div", uu, [
          e("div", du, [
            R[30] || (R[30] = Ge('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", cu, [
              R[7] || (R[7] = e("span", { class: "wa-back" }, "←", -1)),
              R[8] || (R[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", pu, [
                e("div", mu, [
                  e("span", vu, u(k.value), 1),
                  R[6] || (R[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", bu, u(S.value), 1)
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
            A.value ? (n(), s("div", hu, [
              R[14] || (R[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", yu, [
                R[10] || (R[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", gu, u(k.value), 1),
                R[11] || (R[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", fu, [
                e("p", ku, u(o.template.body || "Please choose an option below."), 1),
                (n(!0), s(E, null, W(ee.value, (pe, ve) => (n(), s("div", {
                  key: `flow-opt-${ve}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, u(pe), 1),
                  e("span", {
                    class: $e(["wa-radio", { "wa-radio--on": ve === 0 }])
                  }, null, 2)
                ]))), 128)),
                (L = o.template.multiProduct) != null && L.length ? (n(), s("div", _u, [
                  (n(!0), s(E, null, W(o.template.multiProduct.slice(0, 3), (pe, ve) => (n(), s("div", {
                    key: ve,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, u(pe.name || "Product"), 1),
                      e("p", null, u(pe.price || "Price on request"), 1)
                    ]),
                    R[12] || (R[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : g("", !0)
              ]),
              e("div", wu, [
                B.value ? (n(), s("button", $u, u(B.value), 1)) : g("", !0),
                e("p", xu, [
                  R[13] || (R[13] = G("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: R[0] || (R[0] = at(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (n(), s("div", Cu, [
              R[29] || (R[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Su, [
                R[15] || (R[15] = e("span", null, "●", -1)),
                R[16] || (R[16] = G(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: R[1] || (R[1] = at(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", Iu, [
                e("div", Tu, [
                  o.template.header && o.template.header.type !== "text" ? (n(), s("div", Au, [
                    o.template.header.type === "image" && o.template.header.url ? (n(), s("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: o.template.header.url,
                      alt: "Header media"
                    }, null, 8, Ru)) : o.template.header.type === "video" && o.template.header.url ? (n(), s("div", Uu, [
                      e("video", {
                        src: o.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, Eu),
                      R[17] || (R[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : o.template.header.type === "document" ? (n(), s("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: R[2] || (R[2] = at(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", Pu, u(Q.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ne.value
                      }, u(ne.value), 9, Bu)
                    ])) : (n(), s("div", Lu, [
                      e("div", Ou, u(ae.value) + " TEMPLATE", 1),
                      e("div", Nu, u(oe.value), 1),
                      de.value ? (n(), s("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: Se(de.value)
                      }, null, 4)) : g("", !0)
                    ]))
                  ])) : (he = o.template.header) != null && he.text ? (n(), s("div", Mu, u(o.template.header.text), 1)) : g("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: h.value
                  }, null, 8, Vu),
                  D.value ? (n(), s("div", Du, [
                    e("div", Wu, [
                      D.value.thumbnail ? (n(), s("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: Se({ backgroundImage: `url(${D.value.thumbnail})` })
                      }, null, 4)) : g("", !0),
                      e("div", ju, [
                        e("strong", null, u(D.value.title), 1),
                        e("p", null, u(D.value.description), 1),
                        e("span", null, u(D.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: D.value.url,
                      onClick: R[3] || (R[3] = at(() => {
                      }, ["prevent"]))
                    }, u(D.value.url), 9, Hu)
                  ])) : g("", !0),
                  o.template.location ? (n(), s("div", qu, " 📍 " + u(o.template.location.name || o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)) : g("", !0),
                  (re = o.template.coupon) != null && re.code ? (n(), s("div", Fu, [
                    R[18] || (R[18] = G(" Coupon: ", -1)),
                    e("strong", null, u(o.template.coupon.code), 1)
                  ])) : g("", !0),
                  ($ = o.template.auth) != null && $.code ? (n(), s("div", zu, [
                    R[19] || (R[19] = G(" Verification code: ", -1)),
                    e("strong", null, u(o.template.auth.code), 1)
                  ])) : g("", !0),
                  o.template.limitedOffer ? (n(), s("div", Yu, " Expires: " + u(o.template.limitedOffer), 1)) : g("", !0),
                  o.template.footer ? (n(), s("div", Ku, u(o.template.footer), 1)) : g("", !0),
                  q.value ? (n(), s("div", Gu, [
                    (n(!0), s(E, null, W((O = o.template.multiProduct) == null ? void 0 : O.slice(0, 4), (pe, ve) => (n(), s("div", {
                      key: `prod-${ve}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Ju, u(pe.name || `Item ${ve + 1}`), 1),
                      e("span", Qu, u(pe.price || "-"), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  B.value ? (n(), s("button", Xu, [
                    I.value ? (n(), s("span", {
                      key: 0,
                      class: $e(["wa-btn-icon", Z(I.value.type, I.value.value || I.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : g("", !0),
                    G(" " + u(B.value), 1)
                  ])) : g("", !0),
                  U.value.length > 1 ? (n(), s("div", Zu, [
                    (n(!0), s(E, null, W(U.value.slice(1, 4), (pe, ve) => (n(), s("button", {
                      key: `action-${ve}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: $e(["wa-btn-icon", Z(pe.type, pe.value || pe.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      G(" " + u(pe.text), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  R[20] || (R[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: $e(["wa-side-icon", se.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              o.template.orderCard ? (n(), s("div", ed, [
                e("div", td, [
                  e("div", ad, [
                    o.template.orderCard.image ? (n(), s("img", {
                      key: 0,
                      src: o.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, nd)) : g("", !0),
                    e("div", null, [
                      e("strong", null, u(o.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, u(o.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", sd, u(o.template.orderCard.buttonLabel || "View"), 1),
                  R[21] || (R[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : g("", !0),
              o.template.documentCard || ((_ = o.template.header) == null ? void 0 : _.type) === "document" ? (n(), s("div", ld, [
                e("div", od, [
                  e("div", id, [
                    e("span", rd, u(Q.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((ie = o.template.documentCard) == null ? void 0 : ie.filename) || ((J = o.template.header) == null ? void 0 : J.filename) || "document.pdf"
                      }, u(((fe = o.template.documentCard) == null ? void 0 : fe.filename) || ((we = o.template.header) == null ? void 0 : we.filename) || "document.pdf"), 9, ud),
                      e("p", null, u(((P = o.template.documentCard) == null ? void 0 : P.size) || "243 KB • html"), 1)
                    ]),
                    R[22] || (R[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", dd, u(((te = o.template.documentCard) == null ? void 0 : te.caption) || o.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : g("", !0),
              o.template.voiceNote ? (n(), s("div", cd, [
                e("div", pd, [
                  e("div", md, [
                    R[24] || (R[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    R[25] || (R[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", vd, [
                      o.template.voiceNote.profileImage ? (n(), s("img", {
                        key: 0,
                        src: o.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, bd)) : g("", !0),
                      R[23] || (R[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", hd, u(o.template.voiceNote.duration || "0:10"), 1),
                  e("p", yd, u(o.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : g("", !0),
              o.template.contactCard ? (n(), s("div", gd, [
                e("div", fd, [
                  e("strong", null, u(o.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, u(o.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, u(o.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, u(o.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, u(o.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : g("", !0),
              o.template.location && o.template.locationRequest ? (n(), s("div", kd, [
                e("div", _d, [
                  R[26] || (R[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", wd, [
                    e("strong", null, u(o.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: R[4] || (R[4] = at(() => {
                      }, ["prevent"]))
                    }, u(o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)
                  ]),
                  e("button", $d, u(o.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : g("", !0),
              (z = o.template.carouselCards) != null && z.length ? (n(), s("div", xd, [
                e("div", Cd, [
                  (n(!0), s(E, null, W(o.template.carouselCards.slice(0, 4), (pe, ve) => (n(), s("article", {
                    key: `c-${ve}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: Se(pe.image ? { backgroundImage: `url(${pe.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, u(pe.title || `Card ${ve + 1}`), 1),
                    e("p", null, u(pe.description || "Card description"), 1),
                    e("button", Sd, u(pe.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : g("", !0),
              e("div", Id, [
                e("div", Td, [
                  e("span", Ad, u(k.value), 1),
                  e("p", null, u(ye.value), 1),
                  R[27] || (R[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  o.template.reactionEmoji ? (n(), s("span", Rd, u(o.template.reactionEmoji), 1)) : g("", !0)
                ])
              ]),
              e("div", Ud, [
                e("div", Ed, [
                  e("p", null, u(_e.value), 1),
                  (xe = o.template.flow) != null && xe.id ? (n(), s("a", {
                    key: 0,
                    href: "#",
                    onClick: R[5] || (R[5] = at(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + u(o.template.flow.id), 1)) : g("", !0),
                  R[28] || (R[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            R[31] || (R[31] = Ge('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Bd = /* @__PURE__ */ Le(Pd, [["__scopeId", "data-v-244c945a"]]), Ld = { class: "keos-whatsapp-builder" }, Od = { class: "kb-builder-top" }, Nd = { class: "kb-wa-layout" }, Md = { class: "kb-wa-sidebar" }, Vd = {
  key: 0,
  class: "kb-wa-form"
}, Dd = { class: "kb-wa-form-head" }, Wd = { class: "kb-wa-form-head-top" }, jd = { class: "kb-wa-health-pill" }, Hd = { class: "kb-wa-form-head-row" }, qd = ["value"], Fd = { class: "kb-wa-health" }, zd = { class: "kb-wa-health-row" }, Yd = { class: "kb-wa-health-value" }, Kd = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Gd = { class: "kb-wa-canvas" }, Jd = {
  key: 0,
  class: "kb-wa-test-banner"
}, Qd = { class: "kb-wa-preview-chrome" }, Xd = { class: "kb-push-preview-controls" }, Zd = { class: "kb-push-preview-as" }, ec = ["value"], tc = { class: "kb-preview-status" }, ac = { class: "kb-wa-actions" }, nc = {
  key: 0,
  class: "kb-actions-note"
}, sc = { key: 0 }, lc = { class: "kb-wa-actions-right" }, oc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, ic = { class: "kb-confirm-dialog" }, rc = { class: "kb-confirm-actions" }, Bt = 60, Lt = 1024, Ot = 60, Nt = 10, Mt = 10, uc = /* @__PURE__ */ Pe({
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
    enforceSlugName: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "save", "save-gupshup-template", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(o, { emit: d }) {
    const p = /* @__PURE__ */ new Set(["image", "video", "document"]), h = /* @__PURE__ */ new Set([
      "elementName",
      "languageCode",
      "category",
      "templateType",
      "content",
      "metaTemplate",
      "metaWhatsApp"
    ]);
    function k(t) {
      return t == null ? !1 : typeof t == "string" ? t.trim().length > 0 : Array.isArray(t) ? t.length > 0 : typeof t == "object" ? Object.keys(t).length > 0 : !0;
    }
    function S(t) {
      const l = {
        elementName: t.elementName,
        languageCode: t.languageCode,
        category: t.category,
        templateType: t.templateType,
        content: t.content,
        metaTemplate: t.metaTemplate,
        metaWhatsApp: t.metaWhatsApp ?? t.metaTemplate,
        header: t.header,
        footer: t.footer,
        buttons: t.buttons,
        example: t.example,
        advanced: t.advanced
      };
      return Object.fromEntries(
        Object.entries(l).filter(([y, v]) => h.has(y) ? !0 : k(v))
      );
    }
    function A(t) {
      const l = { ...t }, y = String(l.template_type ?? "text").trim().toLowerCase(), v = String(l.header_type ?? "none").trim().toLowerCase();
      p.has(y) || p.has(v) || (l.media_url = void 0, l.media_caption = void 0, l.document_filename = void 0, l.document_size = void 0), y !== "carousel" && (l.cards = void 0), y !== "catalog" && y !== "mpm" && (l.products = void 0), y !== "flow" && (l.flow_id = void 0, l.flow_cta_label = void 0), y !== "lto" && (l.lto_expiry = void 0), y !== "auth" && (l.auth_type = void 0, l.auth_label = void 0, l.auth_code = void 0, l.otp_code = void 0), y !== "document" && v !== "document" && (l.document_filename = void 0, l.document_size = void 0), y !== "location" && (l.location = void 0);
      const T = Array.isArray(l.buttons) ? l.buttons : [];
      return l.buttons = T, l;
    }
    function I(t) {
      var Ue, m, i, a, Y;
      const l = [], y = t.message, v = (y.template_category ?? "").toString().trim(), j = (y.template_type ?? "text").toString(), T = (y.header_type ?? "none").toString(), N = (y.header ?? "").toString(), K = (y.body ?? "").toString(), me = (y.footer ?? "").toString(), le = Array.isArray(y.buttons) ? y.buttons : [], ke = Array.isArray(y.cards) ? y.cards : [];
      return (Ue = t.name) != null && Ue.trim() || l.push("Template name is required"), (m = y.template_name) != null && m.trim() || l.push("WhatsApp template name is required"), v || l.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), K.trim() || l.push("Body is required"), T === "text" && N.length > Bt && l.push(`Header text cannot exceed ${Bt} characters`), K.length > Lt && l.push(`Body cannot exceed ${Lt} characters`), me.length > Ot && l.push(`Footer cannot exceed ${Ot} characters`), le.length > Nt && l.push(`Buttons cannot exceed ${Nt}`), (j === "image" || j === "video" || j === "document" || T === "image" || T === "video" || T === "document") && !y.media_url && l.push("Media URL is required for rich media templates"), v === "authentication" && j !== "auth" && l.push("Authentication category must use Authentication format"), j === "auth" && !((i = y.auth_label) != null && i.trim()) && !K.includes("{{") && l.push("Authentication templates should include a code label or placeholder variable"), j === "lto" && !y.lto_expiry && l.push("Limited-time offer requires an expiry"), (j === "mpm" || j === "catalog") && !((a = y.products) != null && a.length) && l.push("Catalog and multi-product templates require at least one product"), j === "flow" && !((Y = y.flow_id) != null && Y.trim()) && l.push("WhatsApp Flow format requires a flow ID"), j === "carousel" && (ke.length ? ke.length > Mt && l.push(`Carousel supports up to ${Mt} cards`) : l.push("Carousel format requires at least one card")), l;
    }
    function B(t, l, y) {
      const v = t.message, j = String(v.template_category ?? "").trim(), T = String(v.template_type ?? "text").trim(), N = [];
      return j && l.includes(j) && N.push(`WhatsApp category "${j}" is disabled in this builder configuration`), T && y.includes(T) && N.push(`WhatsApp format "${T}" is disabled in this builder configuration`), N;
    }
    const U = o;
    function q(t) {
      if (!t) return {};
      const l = t.metaTemplate ?? t.metaWhatsApp, y = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((m) => (m == null ? void 0 : m.type) === "BODY") : void 0, v = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((m) => (m == null ? void 0 : m.type) === "FOOTER") : void 0, j = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((m) => (m == null ? void 0 : m.type) === "HEADER") : void 0, T = String(t.content ?? "").trim(), N = String(t.elementName ?? "").trim(), K = String(t.languageCode ?? "").trim(), me = String(t.category ?? "").trim().toLowerCase(), le = String(t.templateType ?? "").trim().toLowerCase(), ke = String(t.footer ?? "").trim(), Ue = String(t.header ?? "").trim();
      return {
        ...t,
        ...N && !t.template_name ? { template_name: N } : {},
        ...K && !t.template_language ? { template_language: K } : {},
        ...me && !t.template_category ? { template_category: me } : {},
        ...le && !t.template_type ? { template_type: le } : {},
        ...T && !t.body ? { body: T } : {},
        ...ke && !t.footer ? { footer: ke } : {},
        ...Ue && !t.header ? { header: Ue } : {},
        ...!t.body && (y != null && y.text) ? { body: String(y.text) } : {},
        ...!t.footer && (v != null && v.text) ? { footer: String(v.text) } : {},
        ...!t.header && (j != null && j.text) ? { header: String(j.text) } : {}
      };
    }
    function ae(t) {
      if (!t) return t;
      const l = q(t.message);
      return { ...t, message: l };
    }
    const oe = d;
    function de(t) {
      var y;
      const l = Ct(t, {
        exampleData: (y = Be.value) == null ? void 0 : y.data
      });
      return {
        ...t,
        message: S(l.payload)
      };
    }
    const {
      campaign: M,
      dirty: ne,
      customValidatorErrors: F,
      getValidationWithWarnings: ce,
      update: D,
      updateMessage: Q,
      undo: Z,
      redo: se,
      canUndo: ye,
      canRedo: _e,
      resetMessage: ee,
      hooks: f
    } = ut({
      initial: ae(U.modelValue),
      hooks: {
        ...U.hooks,
        customValidators: async (t) => {
          var v;
          const l = [
            ...I(t),
            ...B(
              t,
              U.disabledTemplateCategories,
              U.disabledTemplateFormats
            )
          ], y = (v = U.hooks) != null && v.customValidators ? await U.hooks.customValidators(t) : [];
          return [...l, ...y];
        }
      },
      onDirty: () => oe("change", de(M.value))
    }), { lastSavedAt: R } = dt(M, { channel: "whatsapp" });
    function L(t) {
      (t.metaKey || t.ctrlKey) && t.key === "z" && (t.preventDefault(), t.shiftKey ? se() : Z());
    }
    st(() => {
      window.addEventListener("keydown", L);
    }), lt(() => {
      window.removeEventListener("keydown", L);
    }), Oe(M, (t) => oe("update:modelValue", de(t)), {
      deep: !0
    });
    const he = be(), re = be(!0);
    async function $() {
      if (f.estimateReach)
        try {
          he.value = await f.estimateReach(M.value.audience);
        } catch {
          he.value = void 0;
        }
      f.canSend && (re.value = await Promise.resolve(f.canSend()));
    }
    $(), Oe(() => M.value.audience, $, { deep: !0 });
    const O = w(() => (F.value, ce(he.value))), _ = w(() => O.value.blockingErrors), ie = w(() => O.value.warnings), J = w(() => O.value.valid), fe = w(() => {
      var v, j, T;
      const t = M.value.message, l = [
        !!((v = t.template_name) != null && v.trim()),
        !!((j = t.template_category) != null && j.trim()),
        !!(t.body ?? "").toString().trim(),
        !!((T = t.template_language) != null && T.trim()),
        Array.isArray(t.buttons) ? t.buttons.length > 0 : !1
      ], y = l.filter(Boolean).length;
      return Math.round(y / l.length * 100);
    }), we = w(() => fe.value >= 90 ? "Production ready" : fe.value >= 70 ? "Strong draft" : fe.value >= 40 ? "In progress" : "Needs setup"), P = w(() => {
      const t = M.value.message;
      return !!((t.body ?? "").toString().trim() || (t.header ?? "").toString().trim() || t.media_url || t.flow_id || t.coupon_code || t.lto_expiry || t.voice_transcript || t.contact_name || t.link_title || t.order_title || Array.isArray(t.buttons) && t.buttons.length || Array.isArray(t.products) && t.products.length || Array.isArray(t.cards) && t.cards.length);
    }), te = be(""), z = be(!1), xe = be(null), pe = w(
      () => new Set((U.disabledTemplateCategories ?? []).map((t) => String(t).trim().toLowerCase()))
    ), ve = w(
      () => new Set((U.disabledTemplateFormats ?? []).map((t) => String(t).trim().toLowerCase()))
    ), Re = w(
      () => po.filter((t) => {
        var j;
        const l = ((j = t.campaign) == null ? void 0 : j.message) ?? {}, y = String(l.template_category ?? "").trim().toLowerCase(), v = String(l.template_type ?? "").trim().toLowerCase();
        return !(y && pe.value.has(y) || v && ve.value.has(v));
      })
    ), Be = w(() => {
      const t = te.value;
      return t ? Ze.find((l) => l.id === t) ?? null : null;
    }), Ee = w(() => {
      const t = M.value.message.body ?? "";
      return Be.value ? Je(t, Be.value.data) : t;
    }), We = w(() => {
      const t = M.value.message.header ?? "";
      return Be.value ? Je(t, Be.value.data) : t;
    }), qe = w(() => {
      var m;
      const t = M.value.message, l = t.template_type ?? "text", y = t.header_type ?? "none";
      let v, j, T, N, K, me, le;
      (l === "image" || y === "image") && t.media_url ? v = { type: "image", url: t.media_url } : (l === "video" || y === "video") && t.media_url ? v = { type: "video", url: t.media_url } : l === "document" || y === "document" ? v = {
        type: "document",
        url: t.media_url || void 0,
        filename: t.document_filename || t.media_url || "document.pdf"
      } : y === "text" && t.header ? v = { type: "text", text: We.value } : t.header && (v = { type: "text", text: We.value });
      const ke = Ee.value || "Start adding content to see a live preview here.";
      if (l === "location" && t.location) {
        const i = t.location, a = i.lat ?? i.latitude, Y = i.lng ?? i.lon ?? i.longitude;
        a != null && Y != null && (j = {
          lat: a,
          lng: Y,
          name: i.name ?? i.title,
          address: i.address ?? `${a}, ${Y}`
        });
      }
      (l === "catalog" || l === "mpm") && Array.isArray(t.products) && t.products.length && (T = !0, N = t.products.map((i) => ({
        image: i.image ?? i.imageUrl,
        name: i.name ?? i.sectionTitle ?? i.title ?? "Product",
        price: i.price ?? i.productId ?? ""
      }))), l === "carousel" && Array.isArray(t.cards) && t.cards.length && (T = !0, N = t.cards.map((i) => ({
        image: i.image ?? i.media_url,
        name: i.title ?? "Card",
        price: i.button_label ?? ""
      }))), l === "coupon" && t.coupon_code && (K = { code: t.coupon_code }), l === "lto" && t.lto_expiry && (me = t.lto_expiry), l === "auth" && (le = { code: t.auth_code ?? t.otp_code ?? "123 456" });
      const Ue = t.buttons ?? [];
      return l === "flow" && ((m = t.flow_cta_label) != null && m.trim()) && Ue.push({
        label: t.flow_cta_label
      }), {
        format: l,
        templateName: t.template_name || void 0,
        templateLanguage: t.template_language || void 0,
        templateCategory: t.template_category || void 0,
        header: v,
        body: ke,
        mediaCaption: t.media_caption || void 0,
        footer: t.footer || void 0,
        buttons: Ue.map((i) => ({ text: i.label || "Button", type: i.type, value: i.value })),
        location: j,
        catalog: T,
        multiProduct: N,
        coupon: K,
        limitedOffer: me,
        auth: le,
        linkPreview: t.link_title || t.link_description || t.link_url ? {
          title: t.link_title || void 0,
          description: t.link_description || void 0,
          domain: t.link_domain || void 0,
          url: t.link_url || void 0,
          thumbnail: t.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: t.voice_transcript || t.voice_duration || t.voice_profile_image ? {
          transcript: t.voice_transcript || void 0,
          duration: t.voice_duration || void 0,
          profileImage: t.voice_profile_image || void 0
        } : void 0,
        contactCard: t.contact_name || t.contact_phone || t.contact_email ? {
          name: t.contact_name || void 0,
          title: t.contact_title || void 0,
          phone: t.contact_phone || void 0,
          email: t.contact_email || void 0,
          address: t.contact_address || void 0
        } : void 0,
        documentCard: t.document_filename || l === "document" || y === "document" ? {
          filename: t.document_filename || t.media_url || "document.pdf",
          size: t.document_size || void 0,
          caption: t.media_caption || void 0
        } : void 0,
        locationRequest: t.location_request_label ? { label: t.location_request_label } : void 0,
        orderCard: t.order_title || t.order_items || t.order_image ? {
          title: t.order_title || void 0,
          items: t.order_items || void 0,
          image: t.order_image || void 0,
          buttonLabel: t.order_button_label || void 0
        } : void 0,
        carouselCards: l === "carousel" && Array.isArray(t.cards) ? t.cards.map((i) => ({
          title: i.title || void 0,
          description: i.description || t.body || void 0,
          image: i.media_url || void 0,
          button: i.button_label || void 0
        })) : void 0,
        reactionEmoji: t.reaction_emoji || void 0,
        flow: l === "flow" ? {
          id: t.flow_id || void 0,
          ctaLabel: t.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Me(t) {
      var v;
      const l = M.value, y = A({
        ...t.campaign.message ? t.campaign.message : l.message,
        template_name: ((v = t.campaign.message) == null ? void 0 : v.template_name) ?? t.campaign.name ?? l.name ?? void 0
      });
      D({
        ...t.campaign,
        message: y
      }), xe.value = null, z.value = !1;
    }
    function He(t) {
      const l = t.target.value;
      if (!l) return;
      const y = Re.value.find((v) => v.id === l);
      y && (ne.value ? (xe.value = y, z.value = !0) : Me(y), t.target.value = "");
    }
    function Ve(t) {
      D({
        name: t,
        message: { ...M.value.message, template_name: t || void 0 },
        tracking: { ...M.value.tracking ?? {}, campaign_name: t }
      });
    }
    function V(t) {
      const l = M.value.message, y = A({
        ...l,
        ...t ?? {}
      });
      if (Q(y), Object.prototype.hasOwnProperty.call(t ?? {}, "template_name")) {
        const v = String((t == null ? void 0 : t.template_name) ?? "");
        v !== M.value.name && D({
          name: v,
          tracking: {
            ...M.value.tracking ?? {},
            campaign_name: v
          }
        });
      }
    }
    Oe(
      () => M.value.name,
      (t) => {
        const l = String(M.value.message.template_name ?? "");
        (t || "") !== l && Q({ template_name: t || void 0 });
      },
      { immediate: !0 }
    );
    function c(t) {
      const l = ` {{ .${t.variable} }}`, y = M.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...y, t.variable]));
      if (t.field === "title") {
        const j = M.value.message.header ?? "";
        Q({
          variables: v,
          header: j + l
        });
      } else if (t.field === "footer") {
        const j = M.value.message.footer ?? "";
        Q({
          variables: v,
          footer: j + l
        });
      } else {
        const j = M.value.message.body ?? "";
        Q({
          variables: v,
          body: j + l
        });
      }
    }
    function b() {
      var y;
      if (!J.value) return;
      const t = Ct(M.value, {
        exampleData: (y = Be.value) == null ? void 0 : y.data
      }), l = de(M.value);
      oe("save-gupshup-template", t.payload, t.warnings, l), oe("save", l);
    }
    return (t, l) => {
      var y;
      return n(), s("div", Ld, [
        e("div", Od, [
          Ne(ct, {
            "campaign-name": x(M).name,
            status: x(M).status,
            dirty: x(ne),
            "last-saved-at": x(R),
            "can-undo": x(ye),
            "can-redo": x(_e),
            "slugify-name": U.enforceSlugName,
            "onUpdate:campaignName": Ve,
            onUndo: x(Z),
            onRedo: x(se)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          _.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Qe).input}px`,
              padding: `${x(Ce)[12]}px ${x(Ce)[16]}px`,
              marginBottom: `${x(Ce)[16]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (n(!0), s(E, null, W(_.value, (v) => (n(), s("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Nd, [
          e("aside", Md, [
            o.disabledSections.includes("whatsapp") ? g("", !0) : (n(), s("div", Vd, [
              e("div", Dd, [
                e("div", Wd, [
                  l[6] || (l[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", jd, u(we.value), 1)
                ]),
                e("div", Hd, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: He
                  }, [
                    l[7] || (l[7] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(E, null, W(Re.value, (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, qd))), 128))
                  ], 32)
                ]),
                e("div", Fd, [
                  e("div", zd, [
                    l[8] || (l[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", Yd, u(fe.value) + "%", 1)
                  ]),
                  e("div", Kd, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: Se({ width: `${fe.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ne(iu, {
                message: x(M).message,
                "show-reset": !0,
                "disabled-categories": o.disabledTemplateCategories,
                "disabled-formats": o.disabledTemplateFormats,
                onUpdate: V,
                onReset: l[0] || (l[0] = (v) => x(ee)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              Ne(Gt, {
                message: x(M).message,
                "variable-options": o.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: x(Q),
                onInsertVariable: c
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Gd, [
            !o.designOnly && x(M).audience.test_mode ? (n(), s("div", Jd, [...l[9] || (l[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Qd, [
              e("div", Xd, [
                e("label", Zd, [
                  l[11] || (l[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (v) => te.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[10] || (l[10] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(E, null, W(x(Ze), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, ec))), 128))
                  ], 512), [
                    [Ye, te.value]
                  ])
                ]),
                e("div", tc, [
                  l[12] || (l[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(x(M).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: $e(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !P.value }])
              }, [
                Ne(Bd, { template: qe.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", ac, [
          ie.value.length > 0 ? (n(), s("div", nc, [
            l[13] || (l[13] = e("strong", null, "Warning:", -1)),
            G(" " + u((y = ie.value[0]) == null ? void 0 : y.message) + " ", 1),
            ie.value.length > 1 ? (n(), s("span", sc, " (+" + u(ie.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", lc, [
            o.showDuplicate ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: l[2] || (l[2] = (v) => oe("duplicate", JSON.parse(JSON.stringify(x(M)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: b
            }, " Save ")) : g("", !0),
            o.showClose ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: l[3] || (l[3] = (v) => oe("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        z.value ? (n(), s("div", oc, [
          e("div", ic, [
            l[14] || (l[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[15] || (l[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", rc, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: l[4] || (l[4] = (v) => {
                  z.value = !1, xe.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: l[5] || (l[5] = (v) => xe.value && Me(xe.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Le(uc, [["__scopeId", "data-v-79c11b0a"]]), dc = { class: "kb-section" }, cc = { class: "kb-section__head" }, pc = { class: "kb-field" }, mc = ["value"], vc = { class: "kb-field" }, bc = { class: "kb-label" }, hc = { key: 0 }, yc = { key: 1 }, gc = { key: 2 }, fc = { class: "kb-field-with-var" }, kc = ["value"], _c = { class: "kb-var-picker-wrap" }, wc = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, $c = ["onClick"], xc = {
  key: 0,
  class: "kb-truncation-hint"
}, Cc = { class: "kb-field" }, Sc = { class: "kb-insert-row" }, Ic = ["value"], Tc = { class: "kb-field" }, Ac = { class: "kb-insert-row" }, Rc = /* @__PURE__ */ Pe({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: d }) {
    const p = o, h = d, k = [
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
    ], S = be(p.variableOptions && p.variableOptions.length ? [...p.variableOptions] : k), A = be(S.value[0] ?? k[0]), I = be("");
    Oe(
      () => p.variableOptions,
      (Q) => {
        Q && Q.length && (S.value = [...Q], S.value.includes(A.value) || (A.value = S.value[0]));
      }
    );
    const B = w(() => p.message.body ?? ""), U = be(null), q = w(() => B.value.length), ae = w(() => q.value ? q.value <= 160 ? 1 : Math.ceil(q.value / 153) : 0), oe = w(() => {
      const Q = q.value;
      return Q <= 160 ? null : Q <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function de(Q) {
      const Z = Q.target.value;
      h("update", {
        sender_id: Z || void 0
      });
    }
    function M(Q) {
      const Z = Q.target.value;
      h("update", {
        body: Z
      });
    }
    function ne() {
      const Q = A.value;
      if (!Q) return;
      const Z = ` {{ .${Q} }}`, se = B.value || "", ye = p.message.variables ?? [], _e = Array.from(/* @__PURE__ */ new Set([...ye, Q]));
      h("update", {
        body: se + Z,
        variables: _e
      });
    }
    function F(Q) {
      U.value = U.value === Q ? null : Q;
    }
    function ce(Q, Z) {
      const se = ` {{ .${Z} }}`, ye = B.value || "", _e = p.message.variables ?? [], ee = Array.from(/* @__PURE__ */ new Set([..._e, Z]));
      h("update", {
        body: ye + se,
        variables: ee
      }), U.value = null;
    }
    function D() {
      const Q = I.value.trim();
      Q && (S.value.includes(Q) || (S.value = [...S.value, Q]), A.value = Q, I.value = "");
    }
    return (Q, Z) => (n(), s("section", dc, [
      e("div", cc, [
        Z[4] || (Z[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        o.showReset ? (n(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: Z[0] || (Z[0] = (se) => Q.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      Z[11] || (Z[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", pc, [
        Z[5] || (Z[5] = e("label", { class: "kb-label" }, [
          G(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: p.message.sender_id ?? "",
          onInput: de
        }, null, 40, mc)
      ]),
      e("div", vc, [
        e("label", bc, [
          Z[6] || (Z[6] = G(" Message body ", -1)),
          e("span", {
            class: $e(["kb-counter", { "kb-counter--warn": ae.value > 3 }])
          }, [
            G(u(q.value) + " chars · ", 1),
            ae.value === 0 ? (n(), s("span", hc, "0 segments")) : ae.value === 1 ? (n(), s("span", yc, "1 segment")) : (n(), s("span", gc, u(ae.value) + " segments", 1))
          ], 2)
        ]),
        e("div", fc, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: B.value,
            onInput: M
          }, null, 40, kc),
          e("div", _c, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: Z[1] || (Z[1] = (se) => F("body"))
            }, "{{ .var }}"),
            U.value === "body" ? (n(), s("div", wc, [
              (n(!0), s(E, null, W(S.value, (se) => (n(), s("button", {
                key: `sms-body-var-${se}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (ye) => ce("body", se)
              }, u(se), 9, $c))), 128))
            ])) : g("", !0)
          ])
        ]),
        Z[7] || (Z[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        oe.value ? (n(), s("p", xc, u(oe.value), 1)) : g("", !0)
      ]),
      e("div", Cc, [
        Z[8] || (Z[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Sc, [
          je(e("select", {
            "onUpdate:modelValue": Z[2] || (Z[2] = (se) => A.value = se),
            class: "kb-select"
          }, [
            (n(!0), s(E, null, W(S.value, (se) => (n(), s("option", {
              key: se,
              value: se
            }, u(se), 9, Ic))), 128))
          ], 512), [
            [Ye, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ne
          }, " Insert into message ")
        ]),
        Z[9] || (Z[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Tc, [
        Z[10] || (Z[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ac, [
          je(e("input", {
            "onUpdate:modelValue": Z[3] || (Z[3] = (se) => I.value = se),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [it, I.value]
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
}), Uc = /* @__PURE__ */ Le(Rc, [["__scopeId", "data-v-68a73354"]]), Ec = { class: "keos-sms-builder" }, Pc = { class: "kb-builder-top" }, Bc = { class: "kb-sms-layout" }, Lc = { class: "kb-sms-sidebar" }, Oc = {
  key: 0,
  class: "kb-sms-form"
}, Nc = { class: "kb-sms-form-head" }, Mc = { class: "kb-sms-form-head-top" }, Vc = { class: "kb-sms-health-pill" }, Dc = { class: "kb-wa-form-head-row" }, Wc = ["value"], jc = { class: "kb-sms-health" }, Hc = { class: "kb-sms-health-row" }, qc = { class: "kb-sms-health-value" }, Fc = { class: "kb-sms-health-bar" }, zc = { class: "kb-sms-canvas" }, Yc = {
  key: 0,
  class: "kb-sms-test-banner"
}, Kc = { class: "kb-sms-preview-chrome" }, Gc = { class: "kb-push-preview-controls" }, Jc = { class: "kb-push-preview-as" }, Qc = ["value"], Xc = { class: "kb-preview-status" }, Zc = { class: "kb-preview" }, ep = { class: "kb-sms-preview" }, tp = { class: "kb-sms-phone" }, ap = { class: "kb-sms-header" }, np = { class: "kb-sms-sender-avatar" }, sp = { class: "kb-sms-header-copy" }, lp = { class: "kb-sms-sender" }, op = { class: "kb-sms-meta" }, ip = { class: "kb-sms-thread" }, rp = {
  key: 0,
  class: "kb-sms-empty"
}, up = { class: "kb-sms-text" }, dp = { class: "kb-sms-bubble-meta" }, cp = {
  key: 0,
  class: "kb-sms-segment-chip"
}, pp = {
  key: 0,
  class: "kb-sms-more-segments"
}, mp = { class: "kb-sms-delivery-line" }, vp = { class: "kb-sms-counter" }, bp = { key: 0 }, hp = { key: 1 }, yp = { key: 2 }, gp = {
  key: 3,
  class: "kb-sms-cost"
}, fp = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, kp = { class: "kb-sms-actions" }, _p = {
  key: 0,
  class: "kb-actions-note"
}, wp = { key: 0 }, $p = { class: "kb-sms-actions-right" }, xp = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Cp = { class: "kb-confirm-dialog" }, Sp = { class: "kb-confirm-actions" }, Ip = /* @__PURE__ */ Pe({
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
  setup(o, { emit: d }) {
    const p = o, h = d, {
      campaign: k,
      dirty: S,
      customValidatorErrors: A,
      getValidationWithWarnings: I,
      update: B,
      updateMessage: U,
      undo: q,
      redo: ae,
      canUndo: oe,
      canRedo: de,
      resetMessage: M,
      hooks: ne
    } = ut({
      initial: p.modelValue,
      hooks: {
        ...p.hooks,
        customValidators: async (b) => {
          var y, v;
          const t = [];
          (y = b.name) != null && y.trim() || t.push("Template name is required");
          const l = (v = p.hooks) != null && v.customValidators ? await p.hooks.customValidators(b) : [];
          return [...t, ...l];
        }
      },
      onDirty: () => h("change", k.value)
    }), { lastSavedAt: F } = dt(k, { channel: "sms" });
    function ce(b) {
      (b.metaKey || b.ctrlKey) && b.key === "z" && (b.preventDefault(), b.shiftKey ? ae() : q());
    }
    st(() => {
      window.addEventListener("keydown", ce);
    }), lt(() => {
      window.removeEventListener("keydown", ce);
    }), Oe(k, (b) => h("update:modelValue", b), { deep: !0 });
    const D = be(), Q = be(!0);
    async function Z() {
      if (ne.estimateReach)
        try {
          D.value = await ne.estimateReach(k.value.audience);
        } catch {
          D.value = void 0;
        }
      ne.canSend && (Q.value = await Promise.resolve(ne.canSend()));
    }
    Z(), Oe(() => k.value.audience, Z, { deep: !0 });
    const se = w(() => (A.value, I(D.value))), ye = w(() => se.value.blockingErrors), _e = w(() => se.value.warnings), ee = w(() => se.value.valid), f = w(() => {
      var y, v, j;
      const b = k.value.message, t = [
        !!((y = k.value.name) != null && y.trim()),
        !!((v = b.body) != null && v.trim()),
        !!((j = b.sender_id) != null && j.trim()),
        !!k.value.template_type,
        (b.body ?? "").length > 20
      ], l = t.filter(Boolean).length;
      return Math.round(l / t.length * 100);
    }), R = w(() => f.value >= 90 ? "Production ready" : f.value >= 70 ? "Strong draft" : f.value >= 40 ? "In progress" : "Needs setup"), L = w(() => !!te.value.trim()), he = w(
      () => k.value.template_type ?? "transactional"
    ), re = be(""), $ = be(!1), O = be(null), _ = w(() => {
      const b = re.value;
      return b ? Ze.find((t) => t.id === b) ?? null : null;
    }), ie = w(() => {
      const b = te.value;
      return _.value ? Je(b, _.value.data) : b;
    });
    function J(b) {
      const t = k.value, l = b.campaign.message ? { ...t.message, ...b.campaign.message } : t.message;
      B({
        ...b.campaign,
        message: l
      }), O.value = null, $.value = !1;
    }
    function fe(b) {
      const t = b.target.value;
      if (!t) return;
      const l = Rt.find((y) => y.id === t);
      l && (S.value ? (O.value = l, $.value = !0) : J(l), b.target.value = "");
    }
    function we(b) {
      B({ template_type: b });
    }
    function P(b) {
      B({
        name: b,
        tracking: { ...k.value.tracking ?? {}, campaign_name: b }
      });
    }
    const te = w(
      () => (k.value.message.body ?? "") || ""
    ), z = w(() => te.value.length), xe = w(() => /[^\x00-\x7f]/.test(te.value)), pe = w(() => xe.value ? 70 : 160), ve = w(() => xe.value ? 67 : 153), Re = w(() => z.value ? z.value <= pe.value ? 1 : Math.ceil(z.value / ve.value) : 0), Be = w(() => {
      const b = ie.value.trim();
      if (!b) return [];
      const t = Re.value <= 1 ? pe.value : ve.value, l = [];
      for (let y = 0; y < b.length; y += t)
        l.push(b.slice(y, y + t));
      return l;
    }), Ee = w(() => Be.value.slice(0, 3)), We = w(
      () => Math.max(0, Be.value.length - Ee.value.length)
    ), qe = w(() => xe.value ? "Unicode" : "GSM-7"), Me = w(() => L.value ? Re.value > 3 ? "Queued" : "Delivered" : "Draft"), He = w(() => {
      const b = p.costPerSegment ?? 0;
      return !b || Re.value === 0 ? null : (Re.value * b).toFixed(2);
    }), Ve = w(() => {
      const b = z.value, t = pe.value + ve.value;
      return b <= pe.value ? null : b <= t ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), V = w(
      () => k.value.message.sender_id ?? "YourBrand"
    );
    function c() {
      ee.value && h("save", k.value);
    }
    return (b, t) => {
      var l;
      return n(), s("div", Ec, [
        e("div", Pc, [
          Ne(ct, {
            "campaign-name": x(k).name,
            status: x(k).status,
            dirty: x(S),
            "last-saved-at": x(F),
            "can-undo": x(oe),
            "can-redo": x(de),
            "slugify-name": p.enforceSlugName,
            "onUpdate:campaignName": P,
            onUndo: x(q),
            onRedo: x(ae)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ye.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Qe).input}px`,
              padding: `${x(Ce)[12]}px ${x(Ce)[16]}px`,
              marginBottom: `${x(Ce)[16]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (n(!0), s(E, null, W(ye.value, (y) => (n(), s("li", {
                key: y.message
              }, u(y.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Bc, [
          e("aside", Lc, [
            o.disabledSections.includes("sms") ? g("", !0) : (n(), s("div", Oc, [
              e("div", Nc, [
                e("div", Mc, [
                  t[6] || (t[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", Vc, u(R.value), 1)
                ]),
                e("div", Dc, [
                  Ne(_t, {
                    "template-type": he.value,
                    onUpdate: we
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: fe
                  }, [
                    t[7] || (t[7] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(E, null, W(x(Rt), (y) => (n(), s("option", {
                      key: y.id,
                      value: y.id
                    }, u(y.label), 9, Wc))), 128))
                  ], 32)
                ]),
                e("div", jc, [
                  e("div", Hc, [
                    t[8] || (t[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", qc, u(f.value) + "%", 1)
                  ]),
                  e("div", Fc, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: Se({ width: `${f.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ne(Uc, {
                message: x(k).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: x(U),
                onReset: t[0] || (t[0] = (y) => x(M)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", zc, [
            !o.designOnly && x(k).audience.test_mode ? (n(), s("div", Yc, [...t[9] || (t[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Kc, [
              e("div", Gc, [
                e("label", Jc, [
                  t[11] || (t[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": t[1] || (t[1] = (y) => re.value = y),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    t[10] || (t[10] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(E, null, W(x(Ze), (y) => (n(), s("option", {
                      key: y.id,
                      value: y.id
                    }, u(y.label), 9, Qc))), 128))
                  ], 512), [
                    [Ye, re.value]
                  ])
                ]),
                e("div", Xc, [
                  t[12] || (t[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, u(Re.value || 0), 1)
                ])
              ]),
              e("div", {
                class: $e(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !L.value }])
              }, [
                e("div", Zc, [
                  e("div", ep, [
                    e("div", tp, [
                      t[15] || (t[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", ap, [
                        e("div", np, u(V.value.slice(0, 1).toUpperCase()), 1),
                        e("div", sp, [
                          e("div", lp, u(V.value), 1),
                          e("div", op, "Text message · " + u(Me.value), 1)
                        ])
                      ]),
                      e("div", ip, [
                        L.value ? (n(), s(E, { key: 1 }, [
                          (n(!0), s(E, null, W(Ee.value, (y, v) => (n(), s("div", {
                            key: `${v}-${y.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", up, u(y), 1),
                            e("span", dp, [
                              t[13] || (t[13] = G(" 09:21 ", -1)),
                              Ee.value.length > 1 ? (n(), s("span", cp, "Part " + u(v + 1), 1)) : g("", !0)
                            ])
                          ]))), 128)),
                          We.value > 0 ? (n(), s("div", pp, " +" + u(We.value) + " more segments ", 1)) : g("", !0),
                          e("div", mp, [
                            t[14] || (t[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            G(" " + u(Me.value), 1)
                          ])
                        ], 64)) : (n(), s("div", rp, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", vp, [
                      G(u(z.value) + " characters · ", 1),
                      Re.value === 0 ? (n(), s("span", bp, "0 segments")) : Re.value === 1 ? (n(), s("span", hp, "1 segment")) : (n(), s("span", yp, u(Re.value) + " segments", 1)),
                      G(" (" + u(pe.value) + " chars single, " + u(ve.value) + " multi-part · " + u(qe.value) + ") ", 1),
                      He.value !== null ? (n(), s("span", gp, " · Est. " + u(He.value), 1)) : g("", !0)
                    ]),
                    Ve.value ? (n(), s("p", fp, u(Ve.value), 1)) : g("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", kp, [
          _e.value.length > 0 ? (n(), s("div", _p, [
            t[16] || (t[16] = e("strong", null, "Warning:", -1)),
            G(" " + u((l = _e.value[0]) == null ? void 0 : l.message) + " ", 1),
            _e.value.length > 1 ? (n(), s("span", wp, " (+" + u(_e.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", $p, [
            o.showDuplicate ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: t[2] || (t[2] = (y) => h("duplicate", JSON.parse(JSON.stringify(x(k)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: c
            }, " Save ")) : g("", !0),
            o.showClose ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: t[3] || (t[3] = (y) => h("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        $.value ? (n(), s("div", xp, [
          e("div", Cp, [
            t[17] || (t[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            t[18] || (t[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Sp, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: t[4] || (t[4] = (y) => {
                  $.value = !1, O.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: t[5] || (t[5] = (y) => O.value && J(O.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Zt = /* @__PURE__ */ Le(Ip, [["__scopeId", "data-v-5e442b56"]]), Tp = 30, Ap = 60, Rp = 130;
function Up(o) {
  const d = (o ?? "").trim().length;
  return d < Tp ? "too_short" : d <= Ap ? "good" : "too_long";
}
function Ep(o) {
  const d = (o ?? "").trim().length;
  return d === 0 ? "too_short" : d <= Rp ? "good" : "too_long";
}
const Pp = [
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
function Vt(o) {
  if (!o || typeof o != "string") return [];
  const d = [];
  for (const p of Pp) {
    const h = o.match(p);
    h && d.push(h[0]);
  }
  return d;
}
function Bp(o) {
  switch (o) {
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
function Lp(o) {
  switch (o) {
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
const Op = { class: "em-section" }, Np = { class: "em-strip kb-section" }, Mp = { class: "em-strip-head" }, Vp = { class: "em-field kb-field" }, Dp = { class: "em-input-group em-input-group--overlay" }, Wp = ["value"], jp = { class: "em-var-picker-wrap" }, Hp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, qp = ["onClick"], Fp = { class: "em-field kb-field" }, zp = ["value"], Yp = { class: "em-field kb-field" }, Kp = ["value"], Gp = { class: "em-field kb-field" }, Jp = { class: "em-input-group em-input-group--overlay" }, Qp = ["value"], Xp = { class: "em-var-picker-wrap" }, Zp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, em = ["onClick"], tm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, am = ["onClick"], nm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, sm = { class: "em-field kb-field" }, lm = { class: "em-input-group" }, om = ["value"], im = { class: "em-var-picker-wrap" }, rm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, um = ["onClick"], dm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, cm = ["onClick"], pm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, mm = { class: "em-strip kb-section em-strip--library" }, vm = { class: "em-library-chips" }, bm = ["onClick"], hm = { class: "em-strip kb-section em-strip--blocks" }, ym = { class: "em-block-list" }, gm = ["data-type"], fm = { class: "em-block-bar" }, km = { class: "em-block-type" }, _m = { class: "em-block-actions" }, wm = ["disabled", "onClick"], $m = ["disabled", "onClick"], xm = ["onClick"], Cm = {
  key: 0,
  class: "em-block-fields"
}, Sm = ["value", "onChange"], Im = ["value", "onInput"], Tm = { class: "em-var-picker-wrap" }, Am = ["onClick"], Rm = ["onClick"], Um = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Em = ["onClick"], Pm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Bm = ["onClick"], Lm = {
  key: 1,
  class: "em-block-fields"
}, Om = ["value", "onInput"], Nm = { class: "em-var-picker-wrap" }, Mm = ["onClick"], Vm = ["onClick"], Dm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Wm = ["onClick"], jm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Hm = ["onClick"], qm = {
  key: 2,
  class: "em-block-fields"
}, Fm = ["value", "onInput"], zm = ["value", "onInput"], Ym = { class: "em-var-picker-wrap" }, Km = ["onClick"], Gm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Jm = ["onClick"], Qm = ["value", "onInput"], Xm = {
  key: 3,
  class: "em-block-fields"
}, Zm = ["value", "onInput"], ev = { class: "em-var-picker-wrap" }, tv = ["onClick"], av = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, nv = ["onClick"], sv = ["value", "onInput"], lv = { class: "em-block-fields--row" }, ov = ["value", "onInput"], iv = { class: "em-check-row" }, rv = ["checked", "onChange"], uv = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, dv = ["value", "onInput"], cv = {
  key: 5,
  class: "em-block-fields"
}, pv = ["value", "onInput"], mv = ["value", "onInput"], vv = ["value", "onInput"], bv = { class: "em-var-picker-wrap" }, hv = ["onClick"], yv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, gv = ["onClick"], fv = { class: "em-var-picker-wrap" }, kv = ["onClick"], _v = ["onClick"], wv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, $v = ["onClick"], xv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Cv = ["onClick"], Sv = {
  key: 6,
  class: "em-block-fields"
}, Iv = ["value", "onChange"], Tv = { class: "em-list-items" }, Av = ["value", "onInput", "placeholder"], Rv = { class: "em-var-picker-wrap" }, Uv = ["onClick"], Ev = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Pv = ["onClick"], Bv = ["onClick"], Lv = ["onClick"], Ov = {
  key: 7,
  class: "em-block-fields"
}, Nv = ["value", "onChange"], Mv = ["value", "onInput"], Vv = { class: "em-var-picker-wrap" }, Dv = ["onClick"], Wv = ["onClick"], jv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Hv = ["onClick"], qv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Fv = ["onClick"], zv = {
  key: 8,
  class: "em-block-fields"
}, Yv = { class: "em-social-links" }, Kv = ["value", "onChange"], Gv = ["value", "onInput"], Jv = ["onClick"], Qv = ["onClick"], Xv = {
  key: 9,
  class: "em-block-fields"
}, Zv = ["value", "onInput"], eb = ["value", "onInput"], tb = ["value", "onInput"], ab = { class: "em-var-picker-wrap" }, nb = ["onClick"], sb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, lb = ["onClick"], ob = {
  key: 10,
  class: "em-block-fields"
}, ib = ["value", "onInput"], rb = { class: "em-link-list-items" }, ub = ["value", "onInput"], db = { class: "em-var-picker-wrap" }, cb = ["onClick"], pb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, mb = ["onClick"], vb = ["value", "onInput"], bb = ["onClick"], hb = ["onClick"], yb = {
  key: 11,
  class: "em-block-fields"
}, gb = ["value", "onInput"], fb = { class: "em-var-picker-wrap" }, kb = ["onClick"], _b = ["onClick"], wb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, $b = ["onClick"], xb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Cb = ["onClick"], Sb = ["value", "onInput"], Ib = { class: "em-var-picker-wrap" }, Tb = ["onClick"], Ab = ["onClick"], Rb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ub = ["onClick"], Eb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Pb = ["onClick"], Bb = {
  key: 12,
  class: "em-block-fields"
}, Lb = { class: "em-block-fields--row" }, Ob = ["value", "onInput"], Nb = { class: "em-block-fields--row" }, Mb = ["value", "onInput"], Vb = ["value", "onChange"], Db = {
  key: 13,
  class: "em-block-fields"
}, Wb = ["value", "onChange"], jb = { class: "em-inline-label" }, Hb = ["value", "onInput"], qb = { class: "em-var-picker-wrap" }, Fb = ["onClick"], zb = ["onClick"], Yb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Kb = ["onClick"], Gb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Jb = ["onClick"], Qb = {
  key: 14,
  class: "em-block-fields"
}, Xb = ["value", "onInput"], Zb = { class: "em-link-list-items" }, eh = ["value", "onInput"], th = { class: "em-var-picker-wrap" }, ah = ["onClick"], nh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, sh = ["onClick"], lh = ["value", "onInput"], oh = ["onClick"], ih = ["onClick"], rh = {
  key: 15,
  class: "em-block-fields"
}, uh = ["value", "onInput"], dh = { class: "em-var-picker-wrap" }, ch = ["onClick"], ph = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, mh = ["onClick"], vh = ["value", "onInput"], bh = { class: "em-var-picker-wrap" }, hh = ["onClick"], yh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, gh = ["onClick"], fh = ["onClick"], kh = ["onClick"], _h = {
  key: 16,
  class: "em-block-fields"
}, wh = ["value", "onInput"], $h = ["value", "onInput"], xh = ["value", "onInput"], Ch = ["onClick"], Sh = ["onClick"], Ih = {
  key: 17,
  class: "em-block-fields"
}, Th = ["value", "onInput"], Ah = { class: "em-var-picker-wrap" }, Rh = ["onClick"], Uh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Eh = ["onClick"], Ph = ["value", "onInput"], Bh = {
  key: 18,
  class: "em-block-fields"
}, Lh = ["value", "onInput"], Oh = ["value", "onInput"], Nh = { class: "em-var-picker-wrap" }, Mh = ["onClick"], Vh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Dh = ["onClick"], Wh = ["value", "onInput"], jh = { class: "em-var-picker-wrap" }, Hh = ["onClick"], qh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Fh = ["onClick"], zh = ["value", "onInput"], Yh = { class: "em-var-picker-wrap" }, Kh = ["onClick"], Gh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Jh = ["onClick"], Qh = ["value", "onInput"], Xh = {
  key: 19,
  class: "em-block-fields"
}, Zh = ["value", "onInput"], ey = { class: "em-var-picker-wrap" }, ty = ["onClick"], ay = ["onClick"], ny = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, sy = ["onClick"], ly = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, oy = ["onClick"], iy = {
  key: 20,
  class: "em-block-fields"
}, ry = ["value", "onInput"], uy = { class: "em-var-picker-wrap" }, dy = ["onClick"], cy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, py = ["onClick"], my = ["value", "onInput"], vy = { class: "em-var-picker-wrap" }, by = ["onClick"], hy = ["onClick"], yy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, gy = ["onClick"], fy = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, ky = ["onClick"], _y = {
  key: 21,
  class: "em-block-fields"
}, wy = ["value", "onInput"], $y = { class: "em-block-fields--row" }, xy = ["value", "onInput"], Cy = {
  key: 22,
  class: "em-block-fields"
}, Sy = ["value", "onInput"], Iy = ["value", "onInput"], Ty = { class: "em-var-picker-wrap" }, Ay = ["onClick"], Ry = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Uy = ["onClick"], Ey = ["value", "onInput"], Py = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, By = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, Ly = ["onClick"], Oy = ["onClick"], Ny = ["onClick"], My = { class: "em-check-row" }, Vy = ["checked", "onChange"], Dy = { class: "em-add-bar kb-field kb-field--add-bar" }, Wy = { class: "em-add-bar-btns" }, jy = { class: "em-strip kb-section em-strip--personalize" }, Hy = { class: "em-field kb-field" }, qy = { class: "em-input-group" }, Fy = ["value"], zy = { class: "em-field kb-field" }, Yy = { class: "em-input-group" }, Fe = "{{ .var }}", Ky = /* @__PURE__ */ Pe({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: d }) {
    var Ue;
    function p() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const h = [
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
    function S(m) {
      switch (m) {
        case "heading":
          return { id: p(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: p(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: p(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: p(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: p(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: p(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: p(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: p(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: p(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: p(), type: "social", links: h.map((i) => ({ ...i })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: p(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: p(),
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
            id: p(),
            type: "columns",
            leftContent: "Left column text or {{ .variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: p(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: p(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: p(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: p(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: p(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: p(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: p(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: p(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ .order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: p(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: p(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: p(), type: "paragraph", content: "" };
      }
    }
    const A = o, I = d, B = [
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
    ], U = be(
      (Ue = A.variableOptions) != null && Ue.length ? [...A.variableOptions] : B
    ), q = be(U.value[0] ?? "first_name"), ae = be("");
    Oe(
      () => A.variableOptions,
      (m) => {
        m != null && m.length && (U.value = [...m], U.value.includes(q.value) || (q.value = U.value[0]));
      }
    );
    const oe = w(() => A.message.subject ?? ""), de = w(() => A.message.preview_text ?? ""), M = w(() => Up(oe.value)), ne = w(() => Ep(de.value)), F = w(() => Vt(oe.value)), ce = w(() => Vt(de.value)), D = w(() => {
      const m = A.message.blocks;
      return Array.isArray(m) && m.length > 0 ? m : [S("paragraph")];
    });
    Oe(
      () => A.message.blocks,
      (m) => {
        (!Array.isArray(m) || m.length === 0) && I("update", { blocks: [S("paragraph")] });
      },
      { immediate: !0 }
    );
    function Q(m) {
      I("update", { blocks: m });
    }
    function Z(m) {
      I("update", { subject: m.target.value });
    }
    function se(m) {
      const i = m.target.value;
      I("update", { preview_text: i || void 0 });
    }
    function ye(m) {
      I("update", { from_name: m.target.value || void 0 });
    }
    function _e(m) {
      I("update", { from_address: m.target.value || void 0 });
    }
    function ee(m) {
      I("update", { reply_to: m.target.value || void 0 });
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
    function R(m) {
      const i = m.blocks();
      Q([...D.value, ...i]);
    }
    function L(m) {
      const i = [...D.value, S(m)];
      Q(i);
    }
    function he(m) {
      Q(D.value.filter((i) => i.id !== m));
    }
    function re(m, i) {
      const a = D.value.findIndex((C) => C.id === m);
      if (a < 0) return;
      const Y = i === "up" ? a - 1 : a + 1;
      if (Y < 0 || Y >= D.value.length) return;
      const r = [...D.value];
      [r[a], r[Y]] = [r[Y], r[a]], Q(r);
    }
    function $(m, i) {
      const a = D.value.map((Y) => Y.id === m ? { ...Y, ...i } : Y);
      Q(a);
    }
    function O(m, i, a) {
      const Y = D.value.find((C) => C.id === m);
      if (!Y || Y.type !== "list") return;
      const r = [...Y.items || []];
      r[i] = a, $(m, { items: r });
    }
    function _(m) {
      const i = D.value.find((a) => a.id === m);
      !i || i.type !== "list" || $(m, { items: [...i.items || [], "New item"] });
    }
    function ie(m, i) {
      const a = D.value.find((r) => r.id === m);
      if (!a || a.type !== "list") return;
      const Y = (a.items || []).filter((r, C) => C !== i);
      $(m, { items: Y });
    }
    function J(m, i, a, Y) {
      const r = D.value.find((H) => H.id === m);
      if (!r || r.type !== "social") return;
      const C = (r.links || []).map((H, Te) => Te === i ? { ...H, [a]: Y } : H);
      $(m, { links: C });
    }
    function fe(m) {
      const i = D.value.find((a) => a.id === m);
      !i || i.type !== "social" || $(m, { links: [...i.links || [], { platform: "custom", url: "" }] });
    }
    function we(m, i) {
      const a = D.value.find((r) => r.id === m);
      if (!a || a.type !== "social") return;
      const Y = (a.links || []).filter((r, C) => C !== i);
      $(m, { links: Y });
    }
    function P(m, i, a, Y) {
      const r = D.value.find((H) => H.id === m);
      if (!r || r.type !== "link_list") return;
      const C = (r.links || []).map((H, Te) => Te === i ? { ...H, [a]: Y } : H);
      $(m, { links: C });
    }
    function te(m) {
      const i = D.value.find((a) => a.id === m);
      !i || i.type !== "link_list" || $(m, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function z(m, i) {
      const a = D.value.find((r) => r.id === m);
      if (!a || a.type !== "link_list") return;
      const Y = (a.links || []).filter((r, C) => C !== i);
      $(m, { links: Y });
    }
    function xe(m, i) {
      const a = D.value.find((Y) => Y.id === m);
      if (!(!a || a.type !== "row")) {
        if (i.columnCount !== void 0 && i.columnCount !== a.columnCount) {
          const Y = [...a.cells || []];
          for (; Y.length < i.columnCount; ) Y.push("Cell content");
          i.cells = Y.slice(0, i.columnCount);
        }
        $(m, i);
      }
    }
    function pe(m, i, a) {
      const Y = D.value.find((C) => C.id === m);
      if (!Y || Y.type !== "row") return;
      const r = [...Y.cells || []];
      r[i] = a, $(m, { cells: r });
    }
    function ve(m, i, a, Y) {
      const r = D.value.find((H) => H.id === m);
      if (!r || r.type !== "navbar") return;
      const C = (r.links || []).map((H, Te) => Te === i ? { ...H, [a]: Y } : H);
      $(m, { links: C });
    }
    function Re(m) {
      const i = D.value.find((a) => a.id === m);
      !i || i.type !== "navbar" || $(m, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function Be(m, i) {
      const a = D.value.find((Y) => Y.id === m);
      !a || a.type !== "navbar" || $(m, { links: (a.links || []).filter((Y, r) => r !== i) });
    }
    function Ee(m, i, a, Y) {
      const r = D.value.find((H) => H.id === m);
      if (!r || r.type !== "accordion") return;
      const C = (r.items || []).map((H, Te) => Te === i ? { ...H, [a]: Y } : H);
      $(m, { items: C });
    }
    function We(m) {
      const i = D.value.find((a) => a.id === m);
      !i || i.type !== "accordion" || $(m, { items: [...i.items || [], { title: "New section", content: "" }] });
    }
    function qe(m, i) {
      const a = D.value.find((Y) => Y.id === m);
      !a || a.type !== "accordion" || $(m, { items: (a.items || []).filter((Y, r) => r !== i) });
    }
    function Me(m, i, a, Y) {
      const r = D.value.find((H) => H.id === m);
      if (!r || r.type !== "carousel") return;
      const C = (r.slides || []).map((H, Te) => Te === i ? { ...H, [a]: Y } : H);
      $(m, { slides: C });
    }
    function He(m) {
      const i = D.value.find((a) => a.id === m);
      !i || i.type !== "carousel" || $(m, { slides: [...i.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Ve(m, i) {
      const a = D.value.find((Y) => Y.id === m);
      !a || a.type !== "carousel" || $(m, { slides: (a.slides || []).filter((Y, r) => r !== i) });
    }
    function V(m, i = q.value) {
      const a = ` {{ .${i} }}`, Y = A.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...Y, i]));
      m === "subject" ? I("update", {
        subject: (oe.value || "") + a,
        variables: r
      }) : I("update", {
        preview_text: (de.value || "") + a,
        variables: r
      });
    }
    function c(m, i = q.value) {
      const a = D.value.find((ze) => ze.id === m);
      if (!a || a.type !== "paragraph" && a.type !== "heading" && a.type !== "footer" && a.type !== "quote" && a.type !== "liquid" && a.type !== "code_block") return;
      const Y = ` {{ .${i} }}`, r = A.message.variables ?? [], C = Array.from(/* @__PURE__ */ new Set([...r, i])), H = (a.type === "footer", "content"), et = (a[H] ?? "") + Y, tt = D.value.map(
        (ze) => ze.id === m ? { ...ze, [H]: et } : ze
      );
      I("update", { blocks: tt, variables: C });
    }
    function b(m, i, a = q.value) {
      const Y = D.value.find((et) => et.id === m);
      if (!Y || Y.type !== "row") return;
      const r = ` {{ .${a} }}`, C = A.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...C, a])), Te = [...Y.cells || []];
      Te[i] = (Te[i] || "") + r, $(m, { cells: Te }), I("update", { variables: H });
    }
    function t(m, i, a = q.value) {
      const Y = D.value.find((ze) => ze.id === m);
      if (!Y || Y.type !== "columns") return;
      const r = ` {{ .${a} }}`, C = A.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...C, a])), Te = i === "left" ? "leftContent" : "rightContent", tt = (Y[Te] ?? "") + r;
      $(m, { [Te]: tt }), I("update", { variables: H });
    }
    const l = be(null), y = be(null), v = [
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
    function j(m) {
      l.value = l.value === m ? null : m;
    }
    function T(m, i) {
      if (i) {
        if (m === "subject") V("subject", i);
        else if (m === "preview") V("preview", i);
        else if (m.startsWith("block:")) c(m.slice(6), i);
        else if (m.startsWith("col-left:")) t(m.slice(9), "left", i);
        else if (m.startsWith("col-right:")) t(m.slice(10), "right", i);
        else if (m.startsWith("row:")) {
          const [, a, Y] = m.split(":");
          b(a, Number(Y), i);
        }
        l.value = null;
      }
    }
    function N(m) {
      y.value = y.value === m ? null : m;
    }
    function K(m, i) {
      return `${String(m ?? "")}${i}`;
    }
    function me(m, i) {
      var Y, r;
      if (!i) return;
      const a = D.value.find((C) => C.id === m);
      if (a) {
        switch (a.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            $(m, { content: `${String(a.content ?? "")}${i}` });
            break;
          case "button":
            $(m, { text: `${String(a.text ?? "")}${i}` });
            break;
          case "image":
            $(m, { alt: `${String(a.alt ?? "")}${i}` });
            break;
          case "video":
            $(m, { caption: `${String(a.caption ?? "")}${i}` });
            break;
          case "columns":
            $(m, { leftContent: `${String(a.leftContent ?? "")}${i}` });
            break;
          case "row": {
            const C = (Array.isArray(a.cells) ? [...a.cells] : []).map((H) => String(H ?? ""));
            C.length === 0 && C.push(""), C[0] = `${String(C[0] ?? "")}${i}`, $(m, { cells: C });
            break;
          }
          case "navbar":
          case "link_list": {
            const C = Array.isArray(a.links) ? [...a.links] : [];
            C.length || C.push({ text: "", url: "" }), C[0] = { ...C[0], text: `${String(((Y = C[0]) == null ? void 0 : Y.text) ?? "")}${i}` }, $(m, { links: C });
            break;
          }
          case "accordion": {
            const C = Array.isArray(a.items) ? [...a.items] : [];
            C.length || C.push({ title: "", content: "" }), C[0] = { ...C[0], title: `${String(((r = C[0]) == null ? void 0 : r.title) ?? "")}${i}` }, $(m, { items: C });
            break;
          }
          case "countdown":
            $(m, { label: `${String(a.label ?? "")}${i}` });
            break;
          case "product_card":
            $(m, { title: `${String(a.title ?? "")}${i}` });
            break;
          case "dynamic_image":
            $(m, { alt: `${String(a.alt ?? "")}${i}` });
            break;
        }
        y.value = null;
      }
    }
    function le(m, i) {
      var a, Y, r, C, H, Te, et, tt, ze;
      if (i) {
        if (m === "subject")
          I("update", { subject: K(oe.value, i) });
        else if (m === "preview")
          I("update", { preview_text: K(de.value, i) });
        else if (m === "from-name")
          I("update", { from_name: K(A.message.from_name, i) });
        else if (m.startsWith("block:")) {
          me(m.slice(6), i);
          return;
        } else if (m.startsWith("col-left:")) {
          const ue = m.slice(9), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "columns" && $(ue, { leftContent: K(X.leftContent, i) });
        } else if (m.startsWith("col-right:")) {
          const ue = m.slice(10), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "columns" && $(ue, { rightContent: K(X.rightContent, i) });
        } else if (m.startsWith("row:")) {
          const [, ue, X] = m.split(":"), ge = Number(X), Ie = D.value.find((De) => De.id === ue);
          if ((Ie == null ? void 0 : Ie.type) === "row" && Number.isFinite(ge)) {
            const De = [...Ie.cells || []].map((ta) => String(ta ?? ""));
            De[ge] = K(De[ge], i), $(ue, { cells: De });
          }
        } else if (m.startsWith("button-text:")) {
          const ue = m.slice(12), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "button" && $(ue, { text: K(X.text, i) });
        } else if (m.startsWith("image-alt:")) {
          const ue = m.slice(10), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "image" && $(ue, { alt: K(X.alt, i) });
        } else if (m.startsWith("video-caption:")) {
          const ue = m.slice(14), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "video" && $(ue, { caption: K(X.caption, i) });
        } else if (m.startsWith("dynamic-alt:")) {
          const ue = m.slice(12), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "dynamic_image" && $(ue, { alt: K(X.alt, i) });
        } else if (m.startsWith("countdown-label:")) {
          const ue = m.slice(16), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "countdown" && $(ue, { label: K(X.label, i) });
        } else if (m.startsWith("product-title:")) {
          const ue = m.slice(14), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "product_card" && $(ue, { title: K(X.title, i) });
        } else if (m.startsWith("product-price:")) {
          const ue = m.slice(14), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "product_card" && $(ue, { price: K(X.price, i) });
        } else if (m.startsWith("product-button:")) {
          const ue = m.slice(15), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "product_card" && $(ue, { buttonText: K(X.buttonText, i) });
        } else if (m.startsWith("footer-address:")) {
          const ue = m.slice(15), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "footer" && $(ue, { companyAddress: K(X.companyAddress, i) });
        } else if (m.startsWith("code-caption:")) {
          const ue = m.slice(13), X = D.value.find((ge) => ge.id === ue);
          (X == null ? void 0 : X.type) === "code_block" && $(ue, { caption: K(X.caption, i) });
        } else if (m.startsWith("list-item:")) {
          const [, ue, X] = m.split(":"), ge = Number(X), Ie = D.value.find((De) => De.id === ue);
          (Ie == null ? void 0 : Ie.type) === "list" && Number.isFinite(ge) && O(ue, ge, K((a = Ie.items) == null ? void 0 : a[ge], i));
        } else if (m.startsWith("link-list-item:")) {
          const [, ue, X] = m.split(":"), ge = Number(X), Ie = D.value.find((De) => De.id === ue);
          (Ie == null ? void 0 : Ie.type) === "link_list" && Number.isFinite(ge) && P(ue, ge, "text", K((r = (Y = Ie.links) == null ? void 0 : Y[ge]) == null ? void 0 : r.text, i));
        } else if (m.startsWith("navbar-item:")) {
          const [, ue, X] = m.split(":"), ge = Number(X), Ie = D.value.find((De) => De.id === ue);
          (Ie == null ? void 0 : Ie.type) === "navbar" && Number.isFinite(ge) && ve(ue, ge, "text", K((H = (C = Ie.links) == null ? void 0 : C[ge]) == null ? void 0 : H.text, i));
        } else if (m.startsWith("accordion-title:")) {
          const [, ue, X] = m.split(":"), ge = Number(X), Ie = D.value.find((De) => De.id === ue);
          (Ie == null ? void 0 : Ie.type) === "accordion" && Number.isFinite(ge) && Ee(ue, ge, "title", K((et = (Te = Ie.items) == null ? void 0 : Te[ge]) == null ? void 0 : et.title, i));
        } else if (m.startsWith("accordion-content:")) {
          const [, ue, X] = m.split(":"), ge = Number(X), Ie = D.value.find((De) => De.id === ue);
          (Ie == null ? void 0 : Ie.type) === "accordion" && Number.isFinite(ge) && Ee(ue, ge, "content", K((ze = (tt = Ie.items) == null ? void 0 : tt[ge]) == null ? void 0 : ze.content, i));
        }
        y.value = null;
      }
    }
    function ke() {
      const m = ae.value.trim();
      !m || U.value.includes(m) || (U.value = [...U.value, m], q.value = m, ae.value = "");
    }
    return (m, i) => (n(), s("section", Op, [
      e("div", Np, [
        e("div", Mp, [
          i[31] || (i[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          o.showReset ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: i[0] || (i[0] = (a) => m.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        i[38] || (i[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Vp, [
          i[32] || (i[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", Dp, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: o.message.from_name ?? "",
              onInput: ye
            }, null, 40, Wp),
            e("div", jp, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[1] || (i[1] = (a) => N("from-name")),
                title: "Insert emoji"
              }, "😊"),
              y.value === "from-name" ? (n(), s("div", Hp, [
                (n(), s(E, null, W(v, (a) => e("button", {
                  key: `emoji-from-name-${a}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => le("from-name", a)
                }, u(a), 9, qp)), 64))
              ])) : g("", !0)
            ])
          ])
        ]),
        e("div", Fp, [
          i[33] || (i[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: o.message.from_address ?? "",
            onInput: _e
          }, null, 40, zp)
        ]),
        e("div", Yp, [
          i[34] || (i[34] = e("label", { class: "em-label" }, [
            G("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: o.message.reply_to ?? "",
            onInput: ee
          }, null, 40, Kp)
        ]),
        e("div", Gp, [
          i[35] || (i[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Jp, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: oe.value,
              onInput: Z
            }, null, 40, Qp),
            e("div", Xp, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[2] || (i[2] = (a) => j("subject")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[3] || (i[3] = (a) => N("subject")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "subject" ? (n(), s("div", Zp, [
                (n(!0), s(E, null, W(U.value, (a) => (n(), s("button", {
                  key: `subject-var-${a}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (Y) => T("subject", a)
                }, u(a), 9, em))), 128))
              ])) : g("", !0),
              y.value === "subject" ? (n(), s("div", tm, [
                (n(), s(E, null, W(v, (a) => e("button", {
                  key: `emoji-subject-${a}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => le("subject", a)
                }, u(a), 9, am)), 64))
              ])) : g("", !0)
            ])
          ]),
          e("span", {
            class: $e(["em-analyzer", `em-analyzer--${M.value}`])
          }, u(x(Bp)(M.value)), 3),
          F.value.length ? (n(), s("span", nm, "Spammy: " + u(F.value.join(", ")), 1)) : g("", !0)
        ]),
        e("div", sm, [
          i[36] || (i[36] = e("label", { class: "em-label" }, [
            G("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", lm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: de.value,
              onInput: se
            }, null, 40, om),
            e("div", im, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[4] || (i[4] = (a) => j("preview")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[5] || (i[5] = (a) => N("preview")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "preview" ? (n(), s("div", rm, [
                (n(!0), s(E, null, W(U.value, (a) => (n(), s("button", {
                  key: `preview-var-${a}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (Y) => T("preview", a)
                }, u(a), 9, um))), 128))
              ])) : g("", !0),
              y.value === "preview" ? (n(), s("div", dm, [
                (n(), s(E, null, W(v, (a) => e("button", {
                  key: `emoji-preview-${a}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => le("preview", a)
                }, u(a), 9, cm)), 64))
              ])) : g("", !0)
            ])
          ]),
          i[37] || (i[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: $e(["em-analyzer", `em-analyzer--${ne.value}`])
          }, u(x(Lp)(ne.value)), 3),
          ce.value.length ? (n(), s("span", pm, "Spammy: " + u(ce.value.join(", ")), 1)) : g("", !0)
        ])
      ]),
      e("div", mm, [
        i[39] || (i[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        i[40] || (i[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", vm, [
          (n(), s(E, null, W(f, (a) => e("button", {
            key: a.id,
            type: "button",
            class: "em-library-chip",
            onClick: (Y) => R(a)
          }, u(a.label), 9, bm)), 64))
        ])
      ]),
      e("div", hm, [
        i[67] || (i[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        i[68] || (i[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", ym, [
          (n(!0), s(E, null, W(D.value, (a, Y) => (n(), s("div", {
            key: a.id,
            class: "em-block",
            "data-type": a.type
          }, [
            e("div", fm, [
              e("span", km, u(a.type), 1),
              e("div", _m, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: Y === 0,
                  onClick: (r) => re(a.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, wm),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: Y === D.value.length - 1,
                  onClick: (r) => re(a.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, $m),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => he(a.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, xm)
              ])
            ]),
            a.type === "heading" ? (n(), s("div", Cm, [
              e("select", {
                value: a.level,
                class: "em-select em-select--sm",
                onChange: (r) => $(a.id, { level: Number(r.target.value) })
              }, [...i[41] || (i[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Sm),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.content,
                onInput: (r) => $(a.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, Im),
              e("div", Tm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`block:${a.id}`)
                }, u(Fe), 8, Am),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:block:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Rm),
                l.value === `block:${a.id}` ? (n(), s("div", Um, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `block-var-heading-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`block:${a.id}`, r)
                  }, u(r), 9, Em))), 128))
                ])) : g("", !0),
                y.value === `emoji:block:${a.id}` ? (n(), s("div", Pm, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-heading-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`block:${a.id}`, r)
                  }, u(r), 9, Bm)), 64))
                ])) : g("", !0)
              ])
            ])) : a.type === "paragraph" ? (n(), s("div", Lm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => $(a.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Om),
              e("div", Nm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`block:${a.id}`)
                }, u(Fe), 8, Mm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:block:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Vm),
                l.value === `block:${a.id}` ? (n(), s("div", Dm, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `block-var-paragraph-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`block:${a.id}`, r)
                  }, u(r), 9, Wm))), 128))
                ])) : g("", !0),
                y.value === `emoji:block:${a.id}` ? (n(), s("div", jm, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-paragraph-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`block:${a.id}`, r)
                  }, u(r), 9, Hm)), 64))
                ])) : g("", !0)
              ])
            ])) : a.type === "image" ? (n(), s("div", qm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.src,
                onInput: (r) => $(a.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, Fm),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.alt,
                onInput: (r) => $(a.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, zm),
              e("div", Ym, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`image-alt:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Km),
                y.value === `image-alt:${a.id}` ? (n(), s("div", Gm, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-image-alt-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`image-alt:${a.id}`, r)
                  }, u(r), 9, Jm)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.linkUrl,
                onInput: (r) => $(a.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Qm)
            ])) : a.type === "button" ? (n(), s("div", Xm, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.text,
                onInput: (r) => $(a.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Zm),
              e("div", ev, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`button-text:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, tv),
                y.value === `button-text:${a.id}` ? (n(), s("div", av, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-button-text-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`button-text:${a.id}`, r)
                  }, u(r), 9, nv)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.url,
                onInput: (r) => $(a.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, sv),
              e("div", lv, [
                i[42] || (i[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: a.borderRadius ?? 8,
                  onInput: (r) => $(a.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, ov)
              ]),
              e("label", iv, [
                e("input", {
                  type: "checkbox",
                  checked: a.ghost,
                  onChange: (r) => $(a.id, { ghost: r.target.checked })
                }, null, 40, rv),
                i[43] || (i[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : a.type === "spacer" ? (n(), s("div", uv, [
              i[44] || (i[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: a.height,
                onInput: (r) => $(a.id, { height: Number(r.target.value) || 24 })
              }, null, 40, dv),
              i[45] || (i[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : a.type === "footer" ? (n(), s("div", cv, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => $(a.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, pv),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.unsubscribeUrl,
                onInput: (r) => $(a.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, mv),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.companyAddress,
                onInput: (r) => $(a.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, vv),
              e("div", bv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`footer-address:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, hv),
                y.value === `footer-address:${a.id}` ? (n(), s("div", yv, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-footer-address-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`footer-address:${a.id}`, r)
                  }, u(r), 9, gv)), 64))
                ])) : g("", !0)
              ]),
              e("div", fv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`block:${a.id}`)
                }, u(Fe), 8, kv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:block:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, _v),
                l.value === `block:${a.id}` ? (n(), s("div", wv, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `block-var-footer-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`block:${a.id}`, r)
                  }, u(r), 9, $v))), 128))
                ])) : g("", !0),
                y.value === `emoji:block:${a.id}` ? (n(), s("div", xv, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-footer-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`block:${a.id}`, r)
                  }, u(r), 9, Cv)), 64))
                ])) : g("", !0)
              ])
            ])) : a.type === "list" ? (n(), s("div", Sv, [
              e("select", {
                value: a.style,
                class: "em-select em-select--sm",
                onChange: (r) => $(a.id, { style: r.target.value })
              }, [...i[46] || (i[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Iv),
              e("div", Tv, [
                (n(!0), s(E, null, W(a.items || [], (r, C) => (n(), s("div", {
                  key: C,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (H) => O(a.id, C, H.target.value),
                    placeholder: `Item ${C + 1}`
                  }, null, 40, Av),
                  e("div", Rv, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => N(`list-item:${a.id}:${C}`),
                      title: "Insert emoji"
                    }, "😊", 8, Uv),
                    y.value === `list-item:${a.id}:${C}` ? (n(), s("div", Ev, [
                      (n(), s(E, null, W(v, (H) => e("button", {
                        key: `emoji-list-item-${a.id}-${C}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => le(`list-item:${a.id}:${C}`, H)
                      }, u(H), 9, Pv)), 64))
                    ])) : g("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => ie(a.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Bv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => _(a.id)
              }, "+ Add item", 8, Lv)
            ])) : a.type === "quote" ? (n(), s("div", Ov, [
              e("select", {
                value: a.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => $(a.id, { style: r.target.value })
              }, [...i[47] || (i[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Nv),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => $(a.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Mv),
              e("div", Vv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`block:${a.id}`)
                }, u(Fe), 8, Dv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:block:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Wv),
                l.value === `block:${a.id}` ? (n(), s("div", jv, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `block-var-quote-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`block:${a.id}`, r)
                  }, u(r), 9, Hv))), 128))
                ])) : g("", !0),
                y.value === `emoji:block:${a.id}` ? (n(), s("div", qv, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-quote-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`block:${a.id}`, r)
                  }, u(r), 9, Fv)), 64))
                ])) : g("", !0)
              ])
            ])) : a.type === "social" ? (n(), s("div", zv, [
              e("div", Yv, [
                (n(!0), s(E, null, W(a.links || [], (r, C) => (n(), s("div", {
                  key: C,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (H) => J(a.id, C, "platform", H.target.value)
                  }, [...i[48] || (i[48] = [
                    Ge('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, Kv),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (H) => J(a.id, C, "url", H.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Gv),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => we(a.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Jv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => fe(a.id)
              }, "+ Add link", 8, Qv)
            ])) : a.type === "video" ? (n(), s("div", Xv, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.thumbnailUrl,
                onInput: (r) => $(a.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Zv),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.videoUrl,
                onInput: (r) => $(a.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, eb),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.caption,
                onInput: (r) => $(a.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, tb),
              e("div", ab, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`video-caption:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, nb),
                y.value === `video-caption:${a.id}` ? (n(), s("div", sb, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-video-caption-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`video-caption:${a.id}`, r)
                  }, u(r), 9, lb)), 64))
                ])) : g("", !0)
              ])
            ])) : a.type === "link_list" ? (n(), s("div", ob, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: a.separator,
                onInput: (r) => $(a.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, ib),
              e("div", rb, [
                (n(!0), s(E, null, W(a.links || [], (r, C) => (n(), s("div", {
                  key: C,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (H) => P(a.id, C, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, ub),
                  e("div", db, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => N(`link-list-item:${a.id}:${C}`),
                      title: "Insert emoji"
                    }, "😊", 8, cb),
                    y.value === `link-list-item:${a.id}:${C}` ? (n(), s("div", pb, [
                      (n(), s(E, null, W(v, (H) => e("button", {
                        key: `emoji-link-list-item-${a.id}-${C}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => le(`link-list-item:${a.id}:${C}`, H)
                      }, u(H), 9, mb)), 64))
                    ])) : g("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (H) => P(a.id, C, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, vb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => z(a.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, bb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => te(a.id)
              }, "+ Add link", 8, hb)
            ])) : a.type === "columns" ? (n(), s("div", yb, [
              i[49] || (i[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.leftContent,
                onInput: (r) => $(a.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, gb),
              e("div", fb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`col-left:${a.id}`)
                }, u(Fe), 8, kb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:col-left:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, _b),
                l.value === `col-left:${a.id}` ? (n(), s("div", wb, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `col-left-var-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`col-left:${a.id}`, r)
                  }, u(r), 9, $b))), 128))
                ])) : g("", !0),
                y.value === `emoji:col-left:${a.id}` ? (n(), s("div", xb, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-col-left-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`col-left:${a.id}`, r)
                  }, u(r), 9, Cb)), 64))
                ])) : g("", !0)
              ]),
              i[50] || (i[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.rightContent,
                onInput: (r) => $(a.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Sb),
              e("div", Ib, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`col-right:${a.id}`)
                }, u(Fe), 8, Tb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:col-right:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ab),
                l.value === `col-right:${a.id}` ? (n(), s("div", Rb, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `col-right-var-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`col-right:${a.id}`, r)
                  }, u(r), 9, Ub))), 128))
                ])) : g("", !0),
                y.value === `emoji:col-right:${a.id}` ? (n(), s("div", Eb, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-col-right-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`col-right:${a.id}`, r)
                  }, u(r), 9, Pb)), 64))
                ])) : g("", !0)
              ])
            ])) : a.type === "divider" ? (n(), s("div", Bb, [
              e("div", Lb, [
                i[51] || (i[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: a.thickness ?? 1,
                  onInput: (r) => $(a.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, Ob),
                i[52] || (i[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Nb, [
                i[53] || (i[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: a.color ?? "#e2e8f0",
                  onInput: (r) => $(a.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Mb)
              ]),
              e("select", {
                value: a.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => $(a.id, { lineStyle: r.target.value })
              }, [...i[54] || (i[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Vb)
            ])) : a.type === "row" ? (n(), s("div", Db, [
              i[56] || (i[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: a.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => xe(a.id, { columnCount: Number(r.target.value) })
              }, [...i[55] || (i[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Wb),
              (n(!0), s(E, null, W(a.cells || [], (r, C) => (n(), s("div", {
                key: C,
                class: "em-row-cell"
              }, [
                e("label", jb, "Column " + u(C + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (H) => pe(a.id, C, H.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Hb),
                e("div", qb, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => j(`row:${a.id}:${C}`)
                  }, u(Fe), 8, Fb),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => N(`emoji:row:${a.id}:${C}`),
                    title: "Insert emoji"
                  }, "😊", 8, zb),
                  l.value === `row:${a.id}:${C}` ? (n(), s("div", Yb, [
                    (n(!0), s(E, null, W(U.value, (H) => (n(), s("button", {
                      key: `row-var-${a.id}-${C}-${H}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (Te) => T(`row:${a.id}:${C}`, H)
                    }, u(H), 9, Kb))), 128))
                  ])) : g("", !0),
                  y.value === `emoji:row:${a.id}:${C}` ? (n(), s("div", Gb, [
                    (n(), s(E, null, W(v, (H) => e("button", {
                      key: `emoji-row-${a.id}-${C}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => le(`row:${a.id}:${C}`, H)
                    }, u(H), 9, Jb)), 64))
                  ])) : g("", !0)
                ])
              ]))), 128))
            ])) : a.type === "navbar" ? (n(), s("div", Qb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: a.separator,
                onInput: (r) => $(a.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Xb),
              e("div", Zb, [
                (n(!0), s(E, null, W(a.links || [], (r, C) => (n(), s("div", {
                  key: C,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (H) => ve(a.id, C, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, eh),
                  e("div", th, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => N(`navbar-item:${a.id}:${C}`),
                      title: "Insert emoji"
                    }, "😊", 8, ah),
                    y.value === `navbar-item:${a.id}:${C}` ? (n(), s("div", nh, [
                      (n(), s(E, null, W(v, (H) => e("button", {
                        key: `emoji-navbar-item-${a.id}-${C}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => le(`navbar-item:${a.id}:${C}`, H)
                      }, u(H), 9, sh)), 64))
                    ])) : g("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (H) => ve(a.id, C, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, lh),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => Be(a.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, oh)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Re(a.id)
              }, "+ Add link", 8, ih)
            ])) : a.type === "accordion" ? (n(), s("div", rh, [
              (n(!0), s(E, null, W(a.items || [], (r, C) => (n(), s("div", {
                key: C,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (H) => Ee(a.id, C, "title", H.target.value),
                  placeholder: "Section title"
                }, null, 40, uh),
                e("div", dh, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => N(`accordion-title:${a.id}:${C}`),
                    title: "Insert emoji"
                  }, "😊", 8, ch),
                  y.value === `accordion-title:${a.id}:${C}` ? (n(), s("div", ph, [
                    (n(), s(E, null, W(v, (H) => e("button", {
                      key: `emoji-accordion-title-${a.id}-${C}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => le(`accordion-title:${a.id}:${C}`, H)
                    }, u(H), 9, mh)), 64))
                  ])) : g("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (H) => Ee(a.id, C, "content", H.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, vh),
                e("div", bh, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => N(`accordion-content:${a.id}:${C}`),
                    title: "Insert emoji"
                  }, "😊", 8, hh),
                  y.value === `accordion-content:${a.id}:${C}` ? (n(), s("div", yh, [
                    (n(), s(E, null, W(v, (H) => e("button", {
                      key: `emoji-accordion-content-${a.id}-${C}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => le(`accordion-content:${a.id}:${C}`, H)
                    }, u(H), 9, gh)), 64))
                  ])) : g("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => qe(a.id, C),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, fh)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => We(a.id)
              }, "+ Add section", 8, kh)
            ])) : a.type === "carousel" ? (n(), s("div", _h, [
              (n(!0), s(E, null, W(a.slides || [], (r, C) => (n(), s("div", {
                key: C,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (H) => Me(a.id, C, "imageUrl", H.target.value),
                  placeholder: "Image URL"
                }, null, 40, wh),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (H) => Me(a.id, C, "alt", H.target.value),
                  placeholder: "Alt text"
                }, null, 40, $h),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (H) => Me(a.id, C, "linkUrl", H.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, xh),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => Ve(a.id, C),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ch)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => He(a.id)
              }, "+ Add slide", 8, Sh)
            ])) : a.type === "countdown" ? (n(), s("div", Ih, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.label,
                onInput: (r) => $(a.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Th),
              e("div", Ah, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`countdown-label:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Rh),
                y.value === `countdown-label:${a.id}` ? (n(), s("div", Uh, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-countdown-label-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`countdown-label:${a.id}`, r)
                  }, u(r), 9, Eh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: a.endDateTime ? a.endDateTime.slice(0, 16) : "",
                onInput: (r) => $(a.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Ph),
              i[57] || (i[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : a.type === "product_card" ? (n(), s("div", Bh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.imageUrl,
                onInput: (r) => $(a.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Lh),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.title,
                onInput: (r) => $(a.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, Oh),
              e("div", Nh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`product-title:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Mh),
                y.value === `product-title:${a.id}` ? (n(), s("div", Vh, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-product-title-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`product-title:${a.id}`, r)
                  }, u(r), 9, Dh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.price,
                onInput: (r) => $(a.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Wh),
              e("div", jh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`product-price:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Hh),
                y.value === `product-price:${a.id}` ? (n(), s("div", qh, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-product-price-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`product-price:${a.id}`, r)
                  }, u(r), 9, Fh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.buttonText,
                onInput: (r) => $(a.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, zh),
              e("div", Yh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`product-button:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Kh),
                y.value === `product-button:${a.id}` ? (n(), s("div", Gh, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-product-button-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`product-button:${a.id}`, r)
                  }, u(r), 9, Jh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.buttonUrl,
                onInput: (r) => $(a.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Qh)
            ])) : a.type === "liquid" ? (n(), s("div", Xh, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => $(a.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Zh),
              e("div", ey, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`block:${a.id}`)
                }, u(Fe), 8, ty),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:block:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ay),
                l.value === `block:${a.id}` ? (n(), s("div", ny, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `block-var-liquid-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`block:${a.id}`, r)
                  }, u(r), 9, sy))), 128))
                ])) : g("", !0),
                y.value === `emoji:block:${a.id}` ? (n(), s("div", ly, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-liquid-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`block:${a.id}`, r)
                  }, u(r), 9, oy)), 64))
                ])) : g("", !0)
              ]),
              i[58] || (i[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : a.type === "code_block" ? (n(), s("div", iy, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.caption,
                onInput: (r) => $(a.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, ry),
              e("div", uy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`code-caption:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, dy),
                y.value === `code-caption:${a.id}` ? (n(), s("div", cy, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-code-caption-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`code-caption:${a.id}`, r)
                  }, u(r), 9, py)), 64))
                ])) : g("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => $(a.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, my),
              e("div", vy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => j(`block:${a.id}`)
                }, u(Fe), 8, by),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`emoji:block:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, hy),
                l.value === `block:${a.id}` ? (n(), s("div", yy, [
                  (n(!0), s(E, null, W(U.value, (r) => (n(), s("button", {
                    key: `block-var-code-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => T(`block:${a.id}`, r)
                  }, u(r), 9, gy))), 128))
                ])) : g("", !0),
                y.value === `emoji:block:${a.id}` ? (n(), s("div", fy, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-code-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`block:${a.id}`, r)
                  }, u(r), 9, ky)), 64))
                ])) : g("", !0)
              ]),
              i[59] || (i[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : a.type === "rss_feed" ? (n(), s("div", _y, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.feedUrl,
                onInput: (r) => $(a.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, wy),
              e("div", $y, [
                i[60] || (i[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: a.maxItems ?? 5,
                  onInput: (r) => $(a.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, xy)
              ]),
              i[61] || (i[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : a.type === "dynamic_image" ? (n(), s("div", Cy, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.imageUrl,
                onInput: (r) => $(a.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, Sy),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.alt,
                onInput: (r) => $(a.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, Iy),
              e("div", Ty, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`dynamic-alt:${a.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ay),
                y.value === `dynamic-alt:${a.id}` ? (n(), s("div", Ry, [
                  (n(), s(E, null, W(v, (r) => e("button", {
                    key: `emoji-dynamic-alt-${a.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => le(`dynamic-alt:${a.id}`, r)
                  }, u(r), 9, Uy)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.fallbackUrl,
                onInput: (r) => $(a.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Ey)
            ])) : g("", !0),
            k.includes(a.type) ? (n(), s("div", Py, [
              e("div", By, [
                e("button", {
                  type: "button",
                  class: $e(["em-align-btn", { "em-align-btn--active": (a.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (r) => $(a.id, { alignment: "left" })
                }, [...i[62] || (i[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Ly),
                e("button", {
                  type: "button",
                  class: $e(["em-align-btn", { "em-align-btn--active": (a.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (r) => $(a.id, { alignment: "center" })
                }, [...i[63] || (i[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Oy),
                e("button", {
                  type: "button",
                  class: $e(["em-align-btn", { "em-align-btn--active": (a.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (r) => $(a.id, { alignment: "right" })
                }, [...i[64] || (i[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Ny)
              ]),
              e("label", My, [
                e("input", {
                  type: "checkbox",
                  checked: a.fullWidth,
                  onChange: (r) => $(a.id, { fullWidth: r.target.checked })
                }, null, 40, Vy),
                i[65] || (i[65] = e("span", null, "Full width", -1))
              ])
            ])) : g("", !0)
          ], 8, gm))), 128))
        ]),
        e("div", Dy, [
          i[66] || (i[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Wy, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[6] || (i[6] = (a) => L("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[7] || (i[7] = (a) => L("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[8] || (i[8] = (a) => L("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[9] || (i[9] = (a) => L("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[10] || (i[10] = (a) => L("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[11] || (i[11] = (a) => L("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[12] || (i[12] = (a) => L("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[13] || (i[13] = (a) => L("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[14] || (i[14] = (a) => L("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[15] || (i[15] = (a) => L("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[16] || (i[16] = (a) => L("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[17] || (i[17] = (a) => L("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[18] || (i[18] = (a) => L("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[19] || (i[19] = (a) => L("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[20] || (i[20] = (a) => L("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[21] || (i[21] = (a) => L("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[22] || (i[22] = (a) => L("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[23] || (i[23] = (a) => L("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[24] || (i[24] = (a) => L("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[25] || (i[25] = (a) => L("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[26] || (i[26] = (a) => L("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[27] || (i[27] = (a) => L("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[28] || (i[28] = (a) => L("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", jy, [
        i[71] || (i[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        i[72] || (i[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Hy, [
          i[69] || (i[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", qy, [
            je(e("select", {
              "onUpdate:modelValue": i[29] || (i[29] = (a) => q.value = a),
              class: "em-select em-select--flex"
            }, [
              (n(!0), s(E, null, W(U.value, (a) => (n(), s("option", {
                key: a,
                value: a
              }, u(a), 9, Fy))), 128))
            ], 512), [
              [Ye, q.value]
            ])
          ])
        ]),
        e("div", zy, [
          i[70] || (i[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Yy, [
            je(e("input", {
              "onUpdate:modelValue": i[30] || (i[30] = (a) => ae.value = a),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [it, ae.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: ke
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Gy = /* @__PURE__ */ Le(Ky, [["__scopeId", "data-v-62cf50f4"]]), Jy = { class: "keos-email-builder" }, Qy = { class: "kb-builder-top" }, Xy = { class: "kb-email-layout" }, Zy = { class: "kb-email-sidebar" }, eg = {
  key: 0,
  class: "kb-email-form"
}, tg = { class: "kb-email-form-head" }, ag = { class: "kb-email-form-head-top" }, ng = { class: "kb-email-health-pill" }, sg = { class: "kb-wa-form-head-row" }, lg = ["value"], og = { class: "kb-email-health" }, ig = { class: "kb-email-health-row" }, rg = { class: "kb-email-health-value" }, ug = { class: "kb-email-health-bar" }, dg = { class: "kb-email-canvas" }, cg = {
  key: 0,
  class: "kb-email-test-banner"
}, pg = { class: "kb-email-preview-chrome" }, mg = { class: "kb-push-preview-controls" }, vg = { class: "kb-push-preview-as" }, bg = ["value"], hg = { class: "kb-preview-status" }, yg = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, gg = { class: "kb-email-inbox-strip" }, fg = { class: "kb-email-inbox-from" }, kg = { class: "kb-email-inbox-from-name" }, _g = { class: "kb-email-inbox-from-addr" }, wg = { class: "kb-email-inbox-subject" }, $g = ["title"], xg = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Cg = { class: "kb-email-body-canvas" }, Sg = ["innerHTML"], Ig = { class: "kb-email-actions" }, Tg = {
  key: 0,
  class: "kb-actions-note"
}, Ag = { key: 0 }, Rg = { class: "kb-email-actions-right" }, Ug = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Eg = { class: "kb-confirm-dialog" }, Pg = { class: "kb-confirm-actions" }, Bg = /* @__PURE__ */ Pe({
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
  setup(o, { emit: d }) {
    function p(t) {
      if (!Array.isArray(t) || t.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const l = (T) => String(T).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), y = [
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
      ], v = (T, N) => {
        if (!y.includes(N.type)) return T;
        const K = N.alignment || "left", me = !!N.fullWidth;
        return `<div style="text-align:${K};${me ? "width:100%;" : ""}">${T}</div>`;
      }, j = [];
      for (const T of t)
        switch (T.type) {
          case "heading": {
            const N = Math.min(3, Math.max(1, Number(T.level) || 1)), K = l(T.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              v(
                `<h${N} style="margin:0 0 12px;font-size:${N === 1 ? "22" : N === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${K || "Heading"}</h${N}>`,
                T
              )
            );
            break;
          }
          case "paragraph": {
            const N = l(T.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${N || "Paragraph"}</p>`,
                T
              )
            );
            break;
          }
          case "image": {
            const N = (T.src || "").trim(), K = l(T.alt || ""), me = (T.linkUrl || "").trim(), ke = !!T.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", Ue = N ? `<img src="${l(N)}" alt="${K}" style="${ke}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            j.push(
              v(
                `<div style="margin:0 0 12px;">${me ? `<a href="${l(me)}" style="color:#2563eb;">${Ue}</a>` : Ue}</div>`,
                T
              )
            );
            break;
          }
          case "button": {
            const N = l(T.text || "Button"), K = (T.url || "#").trim(), me = Math.min(24, Math.max(0, Number(T.borderRadius) ?? 8)), le = !!T.fullWidth, ke = !!T.ghost, Ue = ke ? "transparent" : "#0f172a", m = ke ? "#0f172a" : "#fff", i = ke ? "2px solid #0f172a" : "none", a = le ? "block" : "inline-block", Y = le ? "100%" : "auto";
            j.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${l(K)}" style="display:${a};width:${Y};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${Ue};color:${m};border:${i};text-decoration:none;font-size:14px;font-weight:600;border-radius:${me}px;overflow-wrap:anywhere;">${N}</a></p>`,
                T
              )
            );
            break;
          }
          case "divider": {
            const N = Math.min(8, Math.max(1, Number(T.thickness) || 1)), K = (T.color || "#e2e8f0").trim() || "#e2e8f0", me = T.lineStyle || "solid";
            j.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${N}px ${me} ${K};" />`,
                T
              )
            );
            break;
          }
          case "spacer": {
            const N = Math.min(120, Math.max(8, Number(T.height) || 24));
            j.push(v(`<div style="height:${N}px;"></div>`, T));
            break;
          }
          case "footer": {
            const N = l(T.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = (T.unsubscribeUrl || "").trim(), me = l(T.companyAddress || "");
            j.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${N || "Footer"}` + (K ? `<p style="margin:8px 0 0;"><a href="${l(K)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (me ? `<p style="margin:4px 0 0;">${me}</p>` : "") + "</div>",
                T
              )
            );
            break;
          }
          case "list": {
            const N = T.style === "numbered" ? "ol" : "ul", me = (Array.isArray(T.items) ? T.items : []).map(
              (le) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${l(String(le)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            j.push(
              v(
                `<${N} style="margin:0 0 12px;padding-left:24px;">${me || "<li>Item</li>"}</${N}>`,
                T
              )
            );
            break;
          }
          case "quote": {
            const N = l(T.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, me = K[T.style || "default"] || K.default;
            j.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${me}font-size:14px;line-height:1.6;">${N || "Quote"}</div>`,
                T
              )
            );
            break;
          }
          case "social": {
            const K = (Array.isArray(T.links) ? T.links : []).filter((me) => (me.url || "").trim());
            if (K.length === 0)
              j.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  T
                )
              );
            else {
              const me = (le) => `<a href="${l((le.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${l(le.platform || "Link")}</a>`;
              j.push(
                v(
                  `<div style="margin:0 0 12px;">${K.map(me).join("")}</div>`,
                  T
                )
              );
            }
            break;
          }
          case "video": {
            const N = (T.thumbnailUrl || "").trim(), K = (T.videoUrl || "#").trim(), me = l(T.caption || ""), ke = !!T.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", Ue = N ? `<img src="${l(N)}" alt="Video" style="${ke}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            j.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${l(K)}" style="display:block;color:inherit;">${Ue}</a>` + (me ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${me}</p>` : "") + "</div>",
                T
              )
            );
            break;
          }
          case "link_list": {
            const N = Array.isArray(T.links) ? T.links : [], K = l(T.separator || " | "), le = N.filter(
              (ke) => (ke.text || ke.url) && (ke.url || "").trim()
            ).map(
              (ke) => `<a href="${l((ke.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(ke.text || "Link")}</a>`
            );
            j.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${le.join(K)}</p>`,
                T
              )
            );
            break;
          }
          case "columns": {
            const N = l(T.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = l(T.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${N || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${K || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const N = Math.min(4, Math.max(1, Number(T.columnCount) || 2)), K = Array.isArray(T.cells) ? T.cells.slice(0, N) : [], me = 100 / N, le = Array.from({ length: N }, (ke, Ue) => {
              const m = K[Ue] ?? "", i = l(m).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${me}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${i || "—"}</td>`;
            }).join("");
            j.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${le}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const N = Array.isArray(T.links) ? T.links : [], K = l(T.separator || " | "), le = N.filter(
              (ke) => (ke.text || ke.url) && (ke.url || "").trim()
            ).map(
              (ke) => `<a href="${l((ke.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(ke.text || "Link")}</a>`
            );
            j.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${le.length ? le.join(K) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const K = (Array.isArray(T.items) ? T.items : []).map((me) => {
              const le = l(me.title || "Section"), ke = l(me.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${le}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${ke}</div></details>`;
            }).join("");
            j.push(
              K ? `<div style="margin:0 0 12px;">${K}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const K = (Array.isArray(T.slides) ? T.slides : []).filter(
              (me) => (me.imageUrl || "").trim()
            );
            if (K.length === 0)
              j.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const me = K[0], le = `<img src="${l(me.imageUrl)}" alt="${l(me.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, ke = (me.linkUrl || "").trim();
              j.push(
                `<div style="margin:0 0 12px;">${ke ? `<a href="${l(ke)}">${le}</a>` : le}` + (K.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${K.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const N = l(T.label || "Offer ends in"), K = T.endDateTime ? new Date(T.endDateTime).toLocaleString() : "—";
            j.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${N}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${K}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const N = (T.imageUrl || "").trim(), K = l(T.title || "Product"), me = l(T.price || ""), le = l(T.buttonText || "Buy now"), ke = (T.buttonUrl || "#").trim(), Ue = N ? `<img src="${l(N)}" alt="${l(T.alt || K)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            j.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Ue}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${K}</p>` + (me ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${me}</p>` : "") + `<a href="${l(ke)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${le}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const N = l((T.content || "").trim());
            j.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${N || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const N = (T.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), K = l((T.caption || "").trim());
            j.push(
              '<div style="margin:0 0 12px;">' + (K ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${K}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${N || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const N = (T.feedUrl || "").trim(), K = Math.min(20, Math.max(1, Number(T.maxItems) ?? 5));
            j.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (N ? `<p style="margin:0;font-size:12px;color:#64748b;">${l(N)} · max ${K} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const N = (T.imageUrl || "").trim(), K = (T.fallbackUrl || "").trim(), me = l(T.alt || "Dynamic image");
            N ? j.push(
              `<div style="margin:0 0 12px;"><img src="${l(N)}" alt="${me}" style="max-width:100%;height:auto;display:block;border:0;" />` + (K ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${l(K)}</p>` : "") + "</div>"
            ) : j.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return j.join("");
    }
    function h(t) {
      return /<\s*html[\s>]/i.test(t) || /<!doctype\s+html/i.test(t);
    }
    function k(t) {
      const l = t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return l ? l[1] : t;
    }
    function S(t, l, y) {
      const v = (l || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), j = (y || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
        `<tr><td style="padding:24px;">${t}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const A = o, I = d, {
      campaign: B,
      dirty: U,
      customValidatorErrors: q,
      getValidationWithWarnings: ae,
      update: oe,
      updateMessage: de,
      undo: M,
      redo: ne,
      canUndo: F,
      canRedo: ce,
      resetMessage: D,
      hooks: Q
    } = ut({
      initial: A.modelValue,
      hooks: {
        ...A.hooks,
        customValidators: async (t) => {
          var j, T, N;
          const l = [];
          (j = t.name) != null && j.trim() || l.push("Template name is required");
          const y = t.message;
          (T = y == null ? void 0 : y.subject) != null && T.trim() || l.push("Subject is required");
          const v = (N = A.hooks) != null && N.customValidators ? await A.hooks.customValidators(t) : [];
          return [...l, ...v];
        }
      },
      onDirty: () => I("change", B.value)
    }), { lastSavedAt: Z } = dt(B, { channel: "email" });
    function se(t) {
      (t.metaKey || t.ctrlKey) && t.key === "z" && (t.preventDefault(), t.shiftKey ? ne() : M());
    }
    st(() => {
      window.addEventListener("keydown", se);
    }), lt(() => {
      window.removeEventListener("keydown", se);
    }), Oe(
      B,
      (t) => I("update:modelValue", {
        ...t,
        message: {
          ...t.message,
          html: Me.value
        }
      }),
      { deep: !0 }
    );
    const ye = be(), _e = be(!0);
    async function ee() {
      if (Q.estimateReach)
        try {
          ye.value = await Q.estimateReach(B.value.audience);
        } catch {
          ye.value = void 0;
        }
      Q.canSend && (_e.value = await Promise.resolve(Q.canSend()));
    }
    ee(), Oe(() => B.value.audience, ee, { deep: !0 });
    const f = w(() => (q.value, ae(ye.value))), R = w(() => f.value.blockingErrors), L = w(() => f.value.warnings), he = w(() => f.value.valid), re = w(() => {
      var v, j, T;
      const t = B.value.message, l = [
        !!((v = B.value.name) != null && v.trim()),
        !!((j = t.subject) != null && j.trim()),
        !!((T = t.from_address) != null && T.trim()),
        !!(Array.isArray(t.blocks) ? t.blocks.length : (t.html ?? "").trim().length),
        !!B.value.template_type
      ], y = l.filter(Boolean).length;
      return Math.round(y / l.length * 100);
    }), $ = w(() => re.value >= 90 ? "Production ready" : re.value >= 70 ? "Strong draft" : re.value >= 40 ? "In progress" : "Needs setup"), O = w(
      () => B.value.template_type ?? "transactional"
    ), _ = be(""), ie = be(!1), J = be(null), fe = w(() => {
      const t = _.value;
      return t ? Ze.find((l) => l.id === t) ?? null : null;
    });
    function we(t) {
      const l = B.value, y = t.campaign.message ? { ...l.message, ...t.campaign.message } : l.message;
      oe({
        ...t.campaign,
        message: y
      }), J.value = null, ie.value = !1;
    }
    function P(t) {
      const l = t.target.value;
      if (!l) return;
      const y = Ut.find((v) => v.id === l);
      y && (U.value ? (J.value = y, ie.value = !0) : we(y), t.target.value = "");
    }
    function te(t) {
      oe({ template_type: t });
    }
    function z(t) {
      oe({
        name: t,
        tracking: { ...B.value.tracking ?? {}, campaign_name: t }
      });
    }
    const xe = w(
      () => B.value.message.subject ?? ""
    ), pe = w(
      () => B.value.message.preview_text ?? ""
    ), ve = w(
      () => B.value.message.html ?? ""
    ), Re = w(
      () => B.value.message.from_name ?? "Your App"
    ), Be = w(
      () => B.value.message.from_address ?? "notifications@example.com"
    ), Ee = w(
      () => B.value.message.blocks ?? []
    ), We = w(() => {
      const t = B.value.message, l = (t.html ?? "").trim(), v = (Array.isArray(t.blocks) ? t.blocks : []).some((j) => {
        if (!j || typeof j != "object") return !1;
        const T = (j.type ?? "").toString();
        if (T === "paragraph" || T === "heading" || T === "quote" || T === "footer") {
          const N = (j.content ?? "").toString().trim();
          return !(!N || N === "Heading" || N.startsWith("Your text here."));
        }
        return T === "image" || T === "video" || T === "dynamic_image" ? !!(j.src ?? j.imageUrl ?? j.thumbnailUrl ?? "").toString().trim() : T === "button" ? !!(j.text ?? "").toString().trim() : !0;
      });
      return !!((t.subject ?? "").toString().trim() || (t.preview_text ?? "").toString().trim() || l || v);
    }), qe = w(() => {
      const t = Ee.value;
      if (Array.isArray(t) && t.length > 0)
        return p(t);
      const l = ve.value;
      return l && l.trim() ? h(l) ? k(l) : l : p([]);
    }), Me = w(() => {
      const t = Ee.value;
      if (Array.isArray(t) && t.length > 0)
        return S(
          p(t),
          xe.value,
          pe.value
        );
      const l = ve.value;
      return l && l.trim() ? h(l) ? l : S(l, xe.value, pe.value) : S(
        p([]),
        xe.value,
        pe.value
      );
    }), He = w(() => {
      const t = xe.value;
      return fe.value ? Je(t, fe.value.data) : t;
    }), Ve = w(() => {
      const t = pe.value;
      return fe.value ? Je(t, fe.value.data) : t;
    }), V = w(() => {
      const t = qe.value;
      return fe.value ? Je(t, fe.value.data) : t;
    }), c = be("desktop");
    function b() {
      he.value && I("save", {
        ...B.value,
        message: {
          ...B.value.message,
          html: Me.value
        }
      });
    }
    return (t, l) => {
      var y;
      return n(), s("div", Jy, [
        e("div", Qy, [
          Ne(ct, {
            "campaign-name": x(B).name,
            status: x(B).status,
            dirty: x(U),
            "last-saved-at": x(Z),
            "can-undo": x(F),
            "can-redo": x(ce),
            "slugify-name": A.enforceSlugName,
            "onUpdate:campaignName": z,
            onUndo: x(M),
            onRedo: x(ne)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          R.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: Se({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Qe).input}px`,
              padding: `${x(Ce)[16]}px ${x(Ce)[24]}px`,
              marginBottom: `${x(Ce)[24]}px`
            })
          }, [
            e("ul", {
              style: Se({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (n(!0), s(E, null, W(R.value, (v) => (n(), s("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Xy, [
          e("aside", Zy, [
            o.disabledSections.includes("email") ? g("", !0) : (n(), s("div", eg, [
              e("div", tg, [
                e("div", ag, [
                  l[8] || (l[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", ng, u($.value), 1)
                ]),
                e("div", sg, [
                  Ne(_t, {
                    "template-type": O.value,
                    onUpdate: te
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: P
                  }, [
                    l[9] || (l[9] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(E, null, W(x(Ut), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, lg))), 128))
                  ], 32)
                ]),
                e("div", og, [
                  e("div", ig, [
                    l[10] || (l[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", rg, u(re.value) + "%", 1)
                  ]),
                  e("div", ug, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: Se({ width: `${re.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ne(Gy, {
                message: x(B).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: x(de),
                onReset: l[0] || (l[0] = (v) => x(D)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", dg, [
            !o.designOnly && x(B).audience.test_mode ? (n(), s("div", cg, [...l[11] || (l[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", pg, [
              e("div", mg, [
                e("label", vg, [
                  l[13] || (l[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (v) => _.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[12] || (l[12] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(E, null, W(x(Ze), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, bg))), 128))
                  ], 512), [
                    [Ye, _.value]
                  ])
                ]),
                e("div", hg, [
                  l[14] || (l[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, u(c.value), 1)
                ])
              ]),
              e("div", yg, [
                e("button", {
                  type: "button",
                  class: $e(["kb-email-device-btn", {
                    "kb-email-device-btn--active": c.value === "desktop"
                  }]),
                  onClick: l[2] || (l[2] = (v) => c.value = "desktop")
                }, [...l[15] || (l[15] = [
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
                  G(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: $e(["kb-email-device-btn", {
                    "kb-email-device-btn--active": c.value === "mobile"
                  }]),
                  onClick: l[3] || (l[3] = (v) => c.value = "mobile")
                }, [...l[16] || (l[16] = [
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
                  G(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: $e(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": c.value === "mobile",
                  "kb-email-preview-frame--empty": !We.value
                }])
              }, [
                e("div", gg, [
                  e("div", fg, [
                    e("span", kg, u(Re.value), 1),
                    e("span", _g, "<" + u(Be.value) + ">", 1)
                  ]),
                  e("div", wg, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: He.value || "No subject"
                    }, u(He.value || "No subject"), 9, $g),
                    Ve.value ? (n(), s("span", xg, " — " + u(Ve.value), 1)) : g("", !0)
                  ])
                ]),
                e("div", Cg, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: V.value
                  }, null, 8, Sg)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Ig, [
          L.value.length > 0 ? (n(), s("div", Tg, [
            l[17] || (l[17] = e("strong", null, "Warning:", -1)),
            G(" " + u((y = L.value[0]) == null ? void 0 : y.message) + " ", 1),
            L.value.length > 1 ? (n(), s("span", Ag, " (+" + u(L.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Rg, [
            o.showDuplicate ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: l[4] || (l[4] = (v) => I("duplicate", JSON.parse(JSON.stringify(x(B)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: b
            }, " Save ")) : g("", !0),
            o.showClose ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: l[5] || (l[5] = (v) => I("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        ie.value ? (n(), s("div", Ug, [
          e("div", Eg, [
            l[18] || (l[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[19] || (l[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Pg, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: l[6] || (l[6] = (v) => {
                  ie.value = !1, J.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: l[7] || (l[7] = (v) => J.value && we(J.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), ea = /* @__PURE__ */ Le(Bg, [["__scopeId", "data-v-f45fc2a3"]]), Lg = { class: "kb-shell" }, Og = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Ng = ["aria-selected", "onClick"], Mg = { class: "kb-shell__meta" }, Vg = ["href"], Dg = { class: "kb-shell__body" }, Wg = /* @__PURE__ */ Pe({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(o, { emit: d }) {
    const p = d, h = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (k, S) => (n(), s("div", Lg, [
      e("header", {
        class: "kb-shell__header",
        style: Se({ padding: `${x(Ce)[12]}px ${x(Ce)[24]}px`, borderBottom: `1px solid ${x(Ae).neutral.border}`, background: x(Ae).neutral.bg })
      }, [
        S[0] || (S[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Og, [
          (n(), s(E, null, W(h, (A) => e("button", {
            key: A.id,
            type: "button",
            class: $e(["kb-shell__channel", { "kb-shell__channel--active": o.channel === A.id }]),
            role: "tab",
            "aria-selected": o.channel === A.id,
            onClick: (I) => p("switch-channel", A.id)
          }, u(A.label), 11, Ng)), 64))
        ]),
        e("div", Mg, [
          o.environment ? (n(), s("span", {
            key: 0,
            class: "kb-shell__env",
            style: Se({ padding: "2px 8px", borderRadius: `${x(Qe).input}px`, fontSize: "0.75rem", background: x(Ae).neutral.bg, color: x(Ae).neutral.textMuted })
          }, u(o.environment), 5)) : g("", !0),
          o.helpUrl ? (n(), s("a", {
            key: 1,
            href: o.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: Se({ color: x(Ae).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Vg)) : g("", !0)
        ])
      ], 4),
      e("div", Dg, [
        Ke(k.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), jg = /* @__PURE__ */ Le(Wg, [["__scopeId", "data-v-0df30803"]]), Hg = {
  class: "kb-outline",
  "aria-label": "Sections"
}, qg = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Fg = ["onClick"], zg = /* @__PURE__ */ Pe({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(o) {
    var S;
    const d = o, p = be(((S = d.items[0]) == null ? void 0 : S.id) ?? "");
    let h = null;
    function k(A) {
      const I = document.getElementById(A);
      I && I.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return st(() => {
      const A = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      A && (h = new IntersectionObserver(
        (I) => {
          for (const B of I)
            if (B.isIntersecting) {
              const U = B.target.getAttribute("data-outline-id");
              U && (p.value = U);
            }
        },
        { root: A === document ? null : A, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((I) => {
        const B = document.getElementById(I.id);
        B && (h == null || h.observe(B));
      }));
    }), lt(() => {
      h == null || h.disconnect();
    }), Oe(
      () => d.items,
      (A) => {
        A.length && !p.value && (p.value = A[0].id);
      },
      { immediate: !0 }
    ), (A, I) => (n(), s("nav", Hg, [
      e("ul", qg, [
        (n(!0), s(E, null, W(o.items, (B) => (n(), s("li", {
          key: B.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: $e(["kb-outline__btn", { "kb-outline__btn--active": p.value === B.id }]),
            style: Se({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${x(Ce)[8]}px ${x(Ce)[12]}px`,
              border: "none",
              borderRadius: `${x(Qe).input}px`,
              background: p.value === B.id ? x(Ae).neutral.bg : "transparent",
              color: p.value === B.id ? "#0f172a" : x(Ae).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: p.value === B.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (U) => k(B.id)
          }, u(B.label), 15, Fg)
        ]))), 128))
      ])
    ]));
  }
}), Yg = /* @__PURE__ */ Le(zg, [["__scopeId", "data-v-25c37675"]]), Kg = ["id"], Gg = {
  key: 1,
  class: "kb-form-shell__head"
}, Jg = /* @__PURE__ */ Pe({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(o) {
    return (d, p) => (n(), s("div", {
      class: "kb-form-shell",
      id: o.sectionId ?? void 0,
      style: Se({
        padding: `${x(Ce)[24]}px ${x(Ce)[24]}px ${x(Ce)[32]}px`,
        marginBottom: 0
      })
    }, [
      o.label ? (n(), s("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: Se({ marginBottom: x(Ce)[24], paddingBottom: x(Ce)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: Se({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: x(Ce)[12] })
        }, u(o.label), 5),
        Ke(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (n(), s("div", Gg, [
        Ke(d.$slots, "head", {}, void 0, !0)
      ])),
      Ke(d.$slots, "default", {}, void 0, !0)
    ], 12, Kg));
  }
}), Qg = /* @__PURE__ */ Le(Jg, [["__scopeId", "data-v-6504df41"]]), Xg = /* @__PURE__ */ Pe({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(o) {
    return (d, p) => (n(), s("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: Se({
        display: "flex",
        justifyContent: o.align === "start" ? "flex-start" : o.align === "between" ? "space-between" : "flex-end",
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
      Ke(d.$slots, "default")
    ], 4));
  }
}), Zg = /* @__PURE__ */ Pe({
  __name: "BuilderTopShell",
  setup(o) {
    return (d, p) => (n(), s("div", {
      class: "kb-top-shell",
      style: Se({
        marginLeft: x(Ce)[24],
        marginRight: x(Ce)[24]
      })
    }, [
      Ke(d.$slots, "header"),
      Ke(d.$slots, "errors"),
      Ke(d.$slots, "warnings"),
      Ke(d.$slots, "default")
    ], 4));
  }
});
function ef(o) {
  o.component("KeosNotificationBuilder", Qt), o.component("KeosWhatsAppBuilder", Xt), o.component("KeosSmsBuilder", Zt), o.component("KeosEmailBuilder", ea), o.component("BuilderShell", jg), o.component("BuilderOutline", Yg), o.component("BuilderVersionHistoryModal", Jt), o.component("BuilderFormShell", Qg), o.component("BuilderActionsBar", Xg), o.component("BuilderTopShell", Zg);
}
const af = {
  install: ef,
  KeosNotificationBuilder: Qt,
  KeosWhatsAppBuilder: Xt,
  KeosSmsBuilder: Zt,
  KeosEmailBuilder: ea
};
export {
  Xg as BuilderActionsBar,
  Qg as BuilderFormShell,
  Yg as BuilderOutline,
  jg as BuilderShell,
  Zg as BuilderTopShell,
  Jt as BuilderVersionHistoryModal,
  Ze as DEFAULT_SAMPLE_PROFILES,
  ea as KeosEmailBuilder,
  Qt as KeosNotificationBuilder,
  Zt as KeosSmsBuilder,
  Xt as KeosWhatsAppBuilder,
  af as default,
  ef as install,
  Je as renderTemplatePreview,
  dt as useAutosave,
  ut as useCampaignState
};
//# sourceMappingURL=index.js.map
