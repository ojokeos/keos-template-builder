import { ref as de, watch as Le, computed as $, defineComponent as Ee, openBlock as a, createElementBlock as n, normalizeStyle as Ce, unref as x, createElementVNode as e, normalizeClass as ke, Fragment as P, renderList as W, toDisplayString as d, createTextVNode as K, createCommentVNode as g, withDirectives as He, vModelText as it, createStaticVNode as Je, vModelSelect as Ke, withKeys as na, onMounted as st, onUnmounted as lt, createVNode as Oe, createBlock as sa, withModifiers as Ye, renderSlot as Ge } from "vue";
const xe = {
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
}, la = ["android", "ios", "web"], Wt = "normal", Ht = ["low", "normal", "high"], jt = 86400, oa = [3600, 7200, 86400, 172800], Ft = "1.0", ia = ["topic", "segment", "user_list"];
function yt() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...la],
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
    priority: Wt,
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
function ra(o) {
  return {
    schema_version: Ft,
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
  const c = o;
  return c.schema_version || (c.schema_version = Ft), c.audience || (c.audience = yt()), c.message || (c.message = gt()), c.delivery || (c.delivery = ft()), c.tracking || (c.tracking = kt()), Ht.includes(c.delivery.priority) || (c.delivery.priority = Wt), c.delivery.ttl === void 0 && (c.delivery.ttl = jt), ia.includes(c.audience.type) || (c.audience.type = "topic"), c.audience.type === "topic" && !c.audience.topic_name && (c.audience.topic_name = "default"), c;
}
const ua = 1e5;
function da(o, c) {
  var w, S, A;
  const v = [], y = c ?? o.audience.estimated_reach;
  return y !== void 0 && y >= ua && v.push({
    message: `Estimated reach is very high (${y.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), o.tracking && !((w = o.tracking.campaign_name) != null && w.trim()) && !((S = o.name) != null && S.trim()) && v.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (A = o.message.deep_link) != null && A.trim() || v.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), v;
}
function zt(o, c = "error") {
  return { message: o, severity: c };
}
function Yt(o) {
  const c = [];
  return o.schema_version || c.push(zt("Missing schema_version")), {
    valid: c.length === 0,
    errors: c
  };
}
function ca(o, c) {
  const v = Yt(o), y = da(o, c);
  return {
    valid: v.valid,
    errors: [
      ...v.errors,
      ...y.map((w) => zt(w.message, w.severity))
    ]
  };
}
function pa(o) {
  return o.errors.filter((c) => c.severity === "error");
}
function ma(o) {
  return o.errors.filter((c) => c.severity !== "error");
}
function va(o) {
  const c = String(o ?? "").trim().toLowerCase();
  return c === "authentication" ? "AUTHENTICATION" : c === "utility" ? "UTILITY" : "MARKETING";
}
function ba(o, c = "template_message") {
  return (String(o ?? "").trim() || c).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || c;
}
function ha(o) {
  const c = String(o.header_type ?? "").trim().toLowerCase();
  if (c === "image")
    return "IMAGE";
  if (c === "video")
    return "VIDEO";
  if (c === "document")
    return "DOCUMENT";
  if (c === "text")
    return "TEXT";
  const v = String(o.template_type ?? "").trim().toLowerCase();
  return v === "image" ? "IMAGE" : v === "video" ? "VIDEO" : v === "document" ? "DOCUMENT" : null;
}
function nt(o, c = []) {
  if (!o)
    return { text: "", varOrder: [...c] };
  const v = [...c], y = /* @__PURE__ */ new Map();
  return v.forEach((S, A) => y.set(S, A + 1)), { text: o.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (S, A) => (y.has(A) || (y.set(A, v.length + 1), v.push(A)), `{{${y.get(A)}}}`)), varOrder: v };
}
function wt(o, c) {
  return o.map((v) => {
    const y = c == null ? void 0 : c[v];
    return typeof y == "string" && y.length > 0 ? y : `sample_${v}`;
  });
}
function ya(o, c, v) {
  if (!o || !c || v.length === 0)
    return {};
  try {
    const w = o.split(/\{\{\d+\}\}/).map((O) => O.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+?)"), S = new RegExp(`^${w}$`, "s"), A = c.match(S);
    if (!A)
      return {};
    const I = {};
    return v.forEach((O, B) => {
      const F = A[B + 1];
      F && (I[O] = F.trim());
    }), I;
  } catch {
    return {};
  }
}
function Kt(o, c) {
  const v = [];
  let y = [...c];
  return { buttons: o.slice(0, 10).map((S) => {
    const A = S, I = String(A.type ?? "quick_reply").trim().toLowerCase(), O = String(A.label ?? "").trim() || "Button";
    if (I === "url") {
      const B = nt(String(A.url ?? ""), y);
      y = B.varOrder;
      const F = String(A.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        text: O,
        url: B.text || void 0,
        ...F ? { example: [F] } : {}
      };
    }
    if (I === "call")
      return {
        type: "PHONE_NUMBER",
        text: O,
        phone_number: String(A.phone ?? "").trim() || void 0
      };
    if (I === "copy_code") {
      const B = String(A.example ?? "").trim() || void 0;
      return { type: "COPY_CODE", text: O, ...B ? { example: B } : {} };
    }
    if (I === "otp") {
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
    return I === "opt_out" ? { type: "QUICK_REPLY", text: O } : { type: "QUICK_REPLY", text: O };
  }).filter((S) => !!(S != null && S.text)), varOrder: y, warnings: v };
}
function ga(o) {
  return o.slice(0, 10).map((c) => {
    const v = c, y = String(v.type ?? "quick_reply").trim().toLowerCase(), w = String(v.label ?? "").trim() || "Button";
    if (y === "url") {
      const S = String(v.url ?? "").trim() || void 0, A = String(v.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        title: w,
        ...S ? { url: S } : {},
        ...A ? { example: [A] } : {}
      };
    }
    if (y === "call")
      return {
        type: "PHONE_NUMBER",
        title: w,
        ...String(v.phone ?? "").trim() ? { phoneNumber: String(v.phone).trim() } : {}
      };
    if (y === "opt_out")
      return { type: "OPT_OUT", title: w };
    if (y === "copy_code")
      return {
        type: "COPY_CODE",
        title: w,
        ...String(v.example ?? "").trim() ? { example: String(v.example).trim() } : {}
      };
    if (y === "otp") {
      const S = String(v.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        title: w,
        otp_type: S,
        ...String(v.autofill_text ?? "").trim() ? { autofill_text: String(v.autofill_text).trim() } : {},
        ...String(v.package_name ?? "").trim() ? { package_name: String(v.package_name).trim() } : {},
        ...String(v.signature_hash ?? "").trim() ? { signature_hash: String(v.signature_hash).trim() } : {}
      };
    }
    return { type: "QUICK_REPLY", title: w };
  }).filter((c) => !!c.title);
}
function $t(o) {
  const c = {}, v = [
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
  for (const y of v)
    o[y] !== void 0 && o[y] !== null && o[y] !== "" && (c[y] = o[y]);
  return Object.keys(c).length ? c : void 0;
}
function fa(o, c = {}) {
  const v = [], y = o.message, w = [], S = ba(y.template_name ?? o.name, o.name || "template_message"), A = va(y.template_category), I = String(y.template_language ?? "en_US").trim() || "en_US";
  let O = [];
  const B = String(y.body ?? "").trim(), F = nt(B, []), te = String(y.template_example ?? "").trim(), le = !c.exampleData && te ? ya(F.text, te, F.varOrder) : {}, pe = c.exampleData ?? (Object.keys(le).length ? le : void 0), V = ha(y), ne = String(y.header ?? "").trim();
  if (V === "TEXT" && ne) {
    const ge = nt(ne, O);
    O = ge.varOrder;
    const _e = wt(O, pe);
    w.push({
      type: "HEADER",
      format: "TEXT",
      text: ge.text,
      ..._e.length ? { example: { header_text: _e } } : {}
    });
  } else V && V !== "TEXT" && (w.push({ type: "HEADER", format: V }), y.media_url || v.push(`Header format ${V} selected but media_url is empty.`));
  const q = String(y.body ?? "").trim(), me = nt(q, O);
  O = me.varOrder;
  const D = wt(O, pe);
  w.push({
    type: "BODY",
    text: me.text,
    ...D.length ? { example: { body_text: [D] } } : {}
  });
  const J = String(y.footer ?? "").trim();
  if (J) {
    const ge = nt(J, O);
    O = ge.varOrder, w.push({
      type: "FOOTER",
      text: ge.text
    });
  }
  const Z = Array.isArray(y.buttons) ? y.buttons : [];
  if (Z.length) {
    const ge = Kt(Z, O);
    O = ge.varOrder, v.push(...ge.warnings), ge.buttons.length && w.push({ type: "BUTTONS", buttons: ge.buttons });
  }
  const se = String(y.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(se) && v.push(`template_type="${se}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: S,
      category: A,
      language: I,
      components: w
    },
    warnings: v
  };
}
function ka(o, c) {
  var w;
  const v = (w = c == null ? void 0 : c.example) == null ? void 0 : w.header_text, y = {
    header: {
      type: "TEXT",
      text: o,
      ...v != null && v.length ? { example: { header_text: v } } : {}
    }
  };
  return JSON.stringify(y);
}
function xt(o) {
  const c = /* @__PURE__ */ new Set(["URL", "PHONE_NUMBER", "COPY_CODE", "OPT_OUT", "OTP"]);
  return [
    ...o.filter((v) => c.has(v.type)),
    ...o.filter((v) => !c.has(v.type))
  ];
}
const Ct = {
  MARKETING: /* @__PURE__ */ new Set(["quick_reply", "url", "call", "copy_code", "opt_out"]),
  UTILITY: /* @__PURE__ */ new Set(["quick_reply", "url", "call"]),
  AUTHENTICATION: /* @__PURE__ */ new Set(["otp"])
};
function St(o, c = {}) {
  const v = fa(o, c), y = o.message, w = [...v.warnings], S = v.payload.category, A = S === "AUTHENTICATION", I = Ct[S] ?? Ct.MARKETING, B = (Array.isArray(y.buttons) ? y.buttons : []).filter((f) => {
    const ae = String(f.type ?? "quick_reply").trim().toLowerCase();
    return I.has(ae) ? !0 : (w.push(`Button type "${ae}" is not allowed for ${S}; removed from payload.`), !1);
  }), F = A ? 1 : 10;
  B.length > F && w.push(`${S} allows at most ${F} button(s); extra buttons removed.`);
  const te = B.slice(0, F), le = xt(ga(te)), pe = v.payload.components.filter((f) => !(A && f.type === "HEADER" || A && f.type === "FOOTER"));
  if (te.length) {
    const f = pe.findIndex((be) => be.type === "BUTTONS"), { buttons: ae } = Kt(te, []), ve = xt(ae), re = { type: "BUTTONS", buttons: ve };
    f >= 0 ? pe[f] = re : ve.length && pe.push(re);
  } else {
    const f = pe.findIndex((ae) => ae.type === "BUTTONS");
    f >= 0 && pe.splice(f, 1);
  }
  const V = { ...v.payload, components: pe }, ne = pe.find((f) => f.type === "HEADER"), q = pe.find((f) => f.type === "BODY"), me = pe.find((f) => f.type === "FOOTER"), D = String(y.body ?? "").trim(), J = String(y.header ?? "").trim(), Z = String(y.footer ?? "").trim(), se = (() => {
    const f = String(y.template_type ?? "").trim().toLowerCase();
    return f === "image" ? "IMAGE" : f === "video" ? "VIDEO" : f === "document" ? "DOCUMENT" : f === "carousel" ? "CAROUSEL" : "TEXT";
  })(), ge = String(y.vertical ?? "").trim() || void 0, _e = String(y.template_example ?? "").trim() || void 0, ee = String(y.media_handle ?? "").trim() || void 0, _ = typeof y.enable_sample == "boolean" ? y.enable_sample : void 0, E = !A && typeof y.allow_category_change == "boolean" ? y.allow_category_change : void 0, N = typeof y.add_security_recommendation == "boolean" ? y.add_security_recommendation : void 0, ye = typeof y.code_expiration_minutes == "number" ? y.code_expiration_minutes : void 0, oe = !A && (ne == null ? void 0 : ne.format) === "TEXT" && (J || ne.text) || "", R = oe ? ka(oe, ne) : void 0;
  return { payload: {
    elementName: V.name,
    languageCode: V.language,
    category: V.category,
    templateType: se,
    // AUTHENTICATION templates must NOT include content/example — Meta presets the body.
    ...A ? {} : { content: D || (q == null ? void 0 : q.text) || "" },
    ...ge ? { vertical: ge } : {},
    ...!A && _e ? { example: _e } : {},
    ...ee ? { exampleMedia: ee } : {},
    // TEXT headers go into containerMeta; media headers are expressed via templateType.
    ...R ? { containerMeta: R } : {},
    // Footer is forbidden for AUTHENTICATION templates.
    ...!A && (Z || me != null && me.text) ? { footer: Z || (me == null ? void 0 : me.text) } : {},
    ...le.length ? { buttons: le } : {},
    ..._ !== void 0 ? { enableSample: _ } : {},
    // allowTemplateCategoryChange is forbidden for AUTHENTICATION templates.
    ...E !== void 0 ? { allowTemplateCategoryChange: E } : {},
    ...N !== void 0 ? { addSecurityRecommendation: N } : {},
    ...ye !== void 0 ? { codeExpirationMinutes: ye } : {},
    metaTemplate: V,
    metaWhatsApp: V,
    ...$t(y) ? { advanced: $t(y) } : {}
  }, warnings: w };
}
function Ze(o, c) {
  return o.length <= c ? { text: o, truncated: !1 } : { text: o.slice(0, Math.max(0, c - 3)) + "...", truncated: !0 };
}
const ot = rt.android;
function _a(o) {
  const { title: c, body: v } = o, y = Ze(c || "", ot.title), w = Ze(v || "", ot.body);
  return {
    title: y.text,
    body: w.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: w.truncated,
    expanded: !1
  };
}
function wa(o) {
  const { title: c, body: v } = o, y = Ze(c || "", ot.title), w = Ze(v || "", ot.body);
  return {
    title: y.text,
    body: w.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: w.truncated,
    expanded: !0
  };
}
function $a(o, c = {}) {
  const v = c.expanded ? wa(o) : _a(o);
  return c.darkMode !== void 0 && (v.darkMode = c.darkMode), v;
}
const It = rt.ios;
function Gt(o) {
  const { title: c, body: v } = o, y = Ze(c || "", It.title), w = Ze(v || "", It.body);
  return {
    title: y.text,
    body: w.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: w.truncated,
    expanded: !1
  };
}
function xa(o) {
  return Gt(o);
}
function Ca(o, c = {}) {
  const v = c.variant === "lockscreen" ? xa(o) : Gt(o);
  return c.darkMode !== void 0 && (v.darkMode = c.darkMode), v;
}
const Tt = rt.web;
function At(o) {
  const { title: c, body: v } = o, y = Ze(c || "", Tt.title), w = Ze(v || "", Tt.body);
  return {
    title: y.text,
    body: w.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: w.truncated
  };
}
function Sa(o) {
  return o.map((c) => ({ message: c, severity: "error" }));
}
function pt(o) {
  return JSON.parse(JSON.stringify(o));
}
function ut(o = {}) {
  const c = de(
    qt(o.initial ?? ra())
  ), v = o.hooks ?? {}, y = de(!1), w = de([]);
  Le(
    c,
    () => {
      if (!v.customValidators) {
        w.value = [];
        return;
      }
      v.customValidators(c.value).then((N) => {
        w.value = N;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const S = de([]), A = de([]);
  function I() {
    const N = pt(c.value);
    S.value = [...S.value.slice(-19), N], A.value = [];
  }
  const O = $(() => S.value.length > 0), B = $(() => A.value.length > 0);
  function F() {
    S.value.length !== 0 && (A.value = [pt(c.value), ...A.value], c.value = S.value[S.value.length - 1], S.value = S.value.slice(0, -1));
  }
  function te() {
    A.value.length !== 0 && (S.value = [...S.value, pt(c.value)], c.value = A.value[0], A.value = A.value.slice(1));
  }
  Le(
    c,
    () => {
      var N;
      y.value = !0, (N = o.onDirty) == null || N.call(o);
    },
    { deep: !0 }
  );
  const le = $(() => Yt(c.value));
  function pe(N) {
    const ye = ca(c.value, N), oe = Sa(w.value), R = [...pa(ye), ...oe], j = [...ye.errors, ...oe], f = ye.valid && oe.length === 0;
    return {
      ...ye,
      errors: j,
      valid: f,
      blockingErrors: R,
      warnings: ma(ye)
    };
  }
  function V(N) {
    I(), c.value = { ...c.value, ...N };
  }
  function ne(N) {
    I(), c.value = {
      ...c.value,
      audience: { ...c.value.audience, ...N }
    };
  }
  function q(N) {
    I(), c.value = {
      ...c.value,
      message: { ...c.value.message, ...N }
    };
  }
  function me(N) {
    I(), c.value = {
      ...c.value,
      delivery: { ...c.value.delivery, ...N }
    };
  }
  function D(N) {
    I(), c.value = {
      ...c.value,
      tracking: c.value.tracking ? { ...c.value.tracking, ...N } : { campaign_name: "", tags: [], ab_test: !1, ...N }
    };
  }
  function J(N) {
    I(), c.value = {
      ...c.value,
      message: { ...gt(), ...N }
    };
  }
  function Z(N) {
    I(), c.value = {
      ...c.value,
      delivery: { ...ft(), ...N }
    };
  }
  function se(N) {
    I(), c.value = {
      ...c.value,
      tracking: { ...kt(), ...N }
    };
  }
  function ge(N) {
    I(), c.value = {
      ...c.value,
      audience: { ...yt(), ...N }
    };
  }
  const _e = $(() => ({
    title: c.value.message.title,
    body: c.value.message.body,
    imageUrl: c.value.message.image_url
  }));
  function ee(N, ye) {
    const oe = _e.value;
    let R;
    switch (N) {
      case "android":
        R = $a(oe, { expanded: ye == null ? void 0 : ye.expanded });
        break;
      case "ios":
        R = Ca(oe);
        break;
      case "web":
        R = At(oe);
        break;
      default:
        R = At(oe);
    }
    const j = c.value.message.actions ?? [], f = c.value.message.location;
    return { ...R, actions: j, location: f ?? void 0 };
  }
  const _ = rt;
  async function E() {
    return v.customValidators ? v.customValidators(c.value) : [];
  }
  return {
    campaign: c,
    dirty: y,
    validation: le,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: w,
    getValidationWithWarnings: pe,
    update: V,
    updateAudience: ne,
    updateMessage: q,
    updateDelivery: me,
    updateTracking: D,
    undo: F,
    redo: te,
    canUndo: O,
    canRedo: B,
    resetMessage: J,
    resetDelivery: Z,
    resetTracking: se,
    resetAudience: ge,
    getPreview: ee,
    previewInput: _e,
    characterLimits: _,
    runCustomValidators: E,
    hooks: v
  };
}
const Ia = "keos-draft", Ta = 2e3;
function Aa(o, c) {
  return `${Ia}-${o}-${c}`;
}
function dt(o, c) {
  const v = c.channel, y = $(
    () => {
      var F, te;
      return Aa(
        v,
        c.key ?? ((F = o.value) == null ? void 0 : F.id) ?? ((te = o.value) == null ? void 0 : te.name) ?? "draft"
      );
    }
  ), w = de(null);
  let S = null;
  function A() {
    try {
      const F = JSON.stringify(o.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(y.value, F), w.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function I() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(y.value);
    } catch {
    }
  }
  function O() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const F = window.localStorage.getItem(y.value);
      if (!F) return null;
      const te = JSON.parse(F);
      return qt(te);
    } catch {
      return null;
    }
  }
  function B() {
    return c.enabled === void 0 ? !0 : typeof c.enabled == "boolean" ? c.enabled : c.enabled.value;
  }
  return Le(
    o,
    () => {
      B() && (S && clearTimeout(S), S = setTimeout(() => {
        S = null, A();
      }, Ta));
    },
    { deep: !0 }
  ), {
    lastSavedAt: w,
    clearDraft: I,
    getDraft: O,
    persist: A
  };
}
const Ua = { class: "kb-header__row" }, Ra = ["value"], Ea = { class: "kb-header__actions" }, Pa = ["disabled"], Ba = ["disabled"], La = ["value"], Oa = ["value"], Na = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    const v = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], y = o, w = c, S = () => !!(y.campaignName || "").trim();
    function A(B) {
      return y.slugifyName ? B.trim().replace(/\s+/g, "-") : B;
    }
    function I(B) {
      return B.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function O(B) {
      const F = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return F[B] ?? F.draft;
    }
    return (B, F) => (a(), n("header", {
      class: "kb-header",
      style: Ce({
        padding: `${x(xe)[16]}px 0`,
        borderBottom: `1px solid ${x(Ae).neutral.border}`,
        marginBottom: `${x(xe)[16]}px`
      })
    }, [
      e("div", Ua, [
        e("div", {
          class: ke(["kb-header__name-section", { "kb-header__name-section--filled": S() }])
        }, [
          F[4] || (F[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: o.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: F[0] || (F[0] = (te) => w("update:campaignName", A(te.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Ra),
          F[5] || (F[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Ea, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !o.canUndo,
            onClick: F[1] || (F[1] = (te) => w("undo"))
          }, " Undo ", 8, Pa),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !o.canRedo,
            onClick: F[2] || (F[2] = (te) => w("redo"))
          }, " Redo ", 8, Ba)
        ]),
        o.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: o.workflowStatus,
          class: "kb-header__status-select",
          style: Ce({
            padding: `${x(xe)[4]}px ${x(xe)[8]}px`,
            borderRadius: `${x(Xe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...O(o.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: F[3] || (F[3] = (te) => w("update:workflowStatus", te.target.value))
        }, [
          (a(), n(P, null, W(v, (te) => e("option", {
            key: te.value,
            value: te.value
          }, d(te.label), 9, Oa)), 64))
        ], 44, La)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: Ce({
            padding: `${x(xe)[4]}px ${x(xe)[8]}px`,
            borderRadius: `${x(Xe).input}px`,
            background: x(Ae).neutral.bg,
            fontSize: "0.8125rem",
            color: x(Ae).neutral.textMuted
          })
        }, d(o.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: Ce({ fontSize: "0.8125rem", color: x(Ae).neutral.textMuted, marginTop: `${x(xe)[4]}px` })
      }, [
        o.saving ? (a(), n(P, { key: 0 }, [
          K("Saving…")
        ], 64)) : o.dirty ? (a(), n(P, { key: 1 }, [
          K("Unsaved changes")
        ], 64)) : o.lastSavedAt ? (a(), n(P, { key: 2 }, [
          K("Last saved at " + d(I(o.lastSavedAt)), 1)
        ], 64)) : g("", !0)
      ], 4)
    ], 4));
  }
}), Pe = (o, c) => {
  const v = o.__vccOpts || o;
  for (const [y, w] of c)
    v[y] = w;
  return v;
}, ct = /* @__PURE__ */ Pe(Na, [["__scopeId", "data-v-56efb3ec"]]), Ma = { class: "kb-section" }, Va = { class: "kb-section__head" }, Da = { class: "kb-field" }, Wa = { class: "kb-label" }, Ha = { class: "kb-field-with-rail" }, ja = ["value", "aria-invalid"], Fa = { class: "kb-var-picker-wrap" }, qa = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, za = ["onClick"], Ya = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, Ka = { class: "kb-field" }, Ga = { class: "kb-label" }, Ja = { class: "kb-field-with-rail" }, Qa = ["value", "aria-invalid"], Xa = { class: "kb-var-picker-wrap" }, Za = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, en = ["onClick"], tn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, an = {
  class: "kb-toggle-row",
  style: { "margin-top": "0.5rem" }
}, nn = ["checked"], sn = { class: "kb-field" }, ln = { class: "kb-tags-wrap" }, on = ["onClick"], rn = { class: "kb-tag-suggestions" }, un = ["onClick"], dn = { class: "kb-field" }, cn = ["value"], pn = { class: "kb-field" }, mn = ["value", "aria-invalid"], vn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, bn = ["value"], hn = { class: "kb-field" }, yn = ["value", "aria-invalid"], gn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, fn = { class: "kb-field" }, kn = { class: "kb-actions-list" }, _n = { class: "kb-action-card__head" }, wn = { class: "kb-action-card__num" }, $n = { class: "kb-action-card__type-row" }, xn = ["value", "onChange"], Cn = ["value"], Sn = { class: "kb-toggle-row kb-toggle-row--inline" }, In = ["checked", "onChange"], Tn = ["onClick"], An = ["value", "onInput"], Un = ["value", "onInput"], Rn = { class: "kb-action-http-row" }, En = ["value", "onChange"], Pn = ["value"], Bn = ["value", "onInput"], Ln = ["value", "onInput"], On = { class: "kb-kv-section" }, Nn = ["value", "onInput"], Mn = ["value", "onInput"], Vn = ["onClick"], Dn = ["onClick"], Wn = ["value", "onInput"], Hn = { class: "kb-kv-section" }, jn = ["value", "onInput"], Fn = ["value", "onInput"], qn = ["onClick"], zn = ["onClick"], Yn = ["value", "onInput"], Kn = { class: "kb-actions-footer" }, Gn = ["disabled"], Jn = { class: "kb-action-chips" }, Qn = ["disabled", "onClick"], Xn = { class: "kb-field" }, Zn = { class: "kb-location-row" }, es = ["value"], ts = ["value"], as = ["value"], ns = ["value"], ss = { class: "kb-field" }, ls = ["value"], os = { class: "kb-field" }, is = ["value"], rs = { class: "kb-field" }, us = { class: "kb-delay-row" }, ds = ["value"], cs = { class: "kb-delay-chips" }, ps = ["onClick"], ms = { class: "kb-advanced-toggles" }, vs = { class: "kb-advanced-toggles__body" }, bs = { class: "kb-toggle-row" }, hs = ["checked"], ys = { class: "kb-toggle-row" }, gs = ["checked"], fs = { class: "kb-toggle-row" }, ks = ["checked"], mt = 3, _s = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    const v = o, y = c, w = $(() => v.message), S = [
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
      const j = (w.value.variables ?? []).filter(Boolean);
      return j.length ? Array.from(new Set(j)) : S;
    }), I = de(null);
    function O(j) {
      I.value = I.value === j ? null : j;
    }
    function B(j, f) {
      const ae = ` {{ .${f} }}`, ve = (w.value.variables ?? []).filter(Boolean), re = Array.from(/* @__PURE__ */ new Set([...ve, f]));
      j === "title" ? y("update", { title: `${v.message.title || ""}${ae}`, variables: re }) : y("update", { body: `${v.message.body || ""}${ae}`, variables: re }), I.value = null;
    }
    const F = de(""), te = $(() => w.value.tags ?? []);
    function le() {
      const j = F.value.trim().toLowerCase().replace(/\s+/g, "_");
      if (!j) return;
      const f = Array.from(/* @__PURE__ */ new Set([...te.value, j]));
      y("update", { tags: f }), F.value = "";
    }
    function pe(j) {
      y("update", { tags: te.value.filter((f) => f !== j) });
    }
    function V(j) {
      (j.key === "Enter" || j.key === ",") && (j.preventDefault(), le());
    }
    const ne = ["warning", "white_check_mark", "rotating_light", "loudspeaker", "package", "truck", "calendar", "key", "bell", "fire"], q = $(() => w.value.actions ?? []), me = [
      { value: "view", label: "View", hint: "Open a URL in the browser or app." },
      { value: "http", label: "HTTP request", hint: "Send an HTTP request when tapped." },
      { value: "broadcast", label: "Broadcast", hint: "Android intent (automation apps)." },
      { value: "copy", label: "Copy to clipboard", hint: "Copy a value to the clipboard." }
    ], D = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    function J() {
      const j = [...q.value, { id: `action_${Date.now()}`, action: "view", label: "" }];
      y("update", { actions: j });
    }
    function Z(j) {
      const f = [...q.value];
      f.splice(j, 1), y("update", { actions: f });
    }
    function se(j, f) {
      const ae = [...q.value];
      ae[j] = { ...ae[j], ...f }, y("update", { actions: ae });
    }
    function ge(j, f) {
      var re, be;
      const ae = { id: (re = q.value[j]) == null ? void 0 : re.id, action: f, label: ((be = q.value[j]) == null ? void 0 : be.label) ?? "" }, ve = [...q.value];
      ve[j] = ae, y("update", { actions: ve });
    }
    function _e(j) {
      const f = j.headers ?? {};
      return Object.entries(f).map(([ae, ve]) => ({ key: ae, value: ve }));
    }
    function ee(j) {
      const f = { ...q.value[j].headers ?? {} };
      f[""] = "", se(j, { headers: f });
    }
    function _(j, f, ae, ve) {
      const re = {};
      for (const [be, L] of Object.entries(q.value[j].headers ?? {}))
        re[be === f ? ae : be] = be === f ? ve : L;
      se(j, { headers: re });
    }
    function E(j, f) {
      const ae = { ...q.value[j].headers ?? {} };
      delete ae[f], se(j, { headers: ae });
    }
    function N(j) {
      const f = j.extras ?? {};
      return Object.entries(f).map(([ae, ve]) => ({ key: ae, value: ve }));
    }
    function ye(j) {
      const f = { ...q.value[j].extras ?? {} };
      f[""] = "", se(j, { extras: f });
    }
    function oe(j, f, ae, ve) {
      const re = {};
      for (const [be, L] of Object.entries(q.value[j].extras ?? {}))
        re[be === f ? ae : be] = be === f ? ve : L;
      se(j, { extras: re });
    }
    function R(j, f) {
      const ae = { ...q.value[j].extras ?? {} };
      delete ae[f], se(j, { extras: ae });
    }
    return (j, f) => {
      var ae, ve, re, be;
      return a(), n("section", Ma, [
        e("div", Va, [
          f[21] || (f[21] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: f[0] || (f[0] = (L) => j.$emit("reset"))
          }, "Reset section")) : g("", !0)
        ]),
        f[45] || (f[45] = e("p", { class: "kb-section__desc" }, " Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required. ", -1)),
        e("div", Da, [
          e("label", Wa, [
            f[22] || (f[22] = K(" Title ", -1)),
            e("span", {
              class: ke(["kb-counter", { "kb-counter--warn": o.titleCount > o.titleLimit }])
            }, d(o.titleCount) + "/" + d(o.titleLimit), 3)
          ]),
          e("div", Ha, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: o.message.title,
              "aria-invalid": !!o.titleError,
              onInput: f[1] || (f[1] = (L) => j.$emit("update", { title: L.target.value }))
            }, null, 40, ja),
            e("div", Fa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: f[2] || (f[2] = (L) => O("title"))
              }, "{{ .var }}"),
              I.value === "title" ? (a(), n("div", qa, [
                (a(!0), n(P, null, W(A.value, (L) => (a(), n("button", {
                  key: `title-var-${L}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (X) => B("title", L)
                }, d(L), 9, za))), 128))
              ])) : g("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ce({ "--pct": Math.min(100, o.titleCount / o.titleLimit * 100) + "%" })
            }, [...f[23] || (f[23] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.titleError ? (a(), n("p", Ya, d(o.titleError), 1)) : g("", !0)
        ]),
        e("div", Ka, [
          e("label", Ga, [
            f[24] || (f[24] = K(" Message ", -1)),
            e("span", {
              class: ke(["kb-counter", { "kb-counter--warn": o.bodyCount > o.bodyLimit }])
            }, d(o.bodyCount) + "/" + d(o.bodyLimit), 3)
          ]),
          e("div", Ja, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: o.message.body,
              "aria-invalid": !!o.bodyError,
              onInput: f[3] || (f[3] = (L) => j.$emit("update", { body: L.target.value }))
            }, null, 40, Qa),
            e("div", Xa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: f[4] || (f[4] = (L) => O("body"))
              }, "{{ .var }}"),
              I.value === "body" ? (a(), n("div", Za, [
                (a(!0), n(P, null, W(A.value, (L) => (a(), n("button", {
                  key: `body-var-${L}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (X) => B("body", L)
                }, d(L), 9, en))), 128))
              ])) : g("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ce({ "--pct": Math.min(100, o.bodyCount / o.bodyLimit * 100) + "%" })
            }, [...f[25] || (f[25] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.bodyError ? (a(), n("p", tn, d(o.bodyError), 1)) : g("", !0),
          e("label", an, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!w.value.markdown,
              onChange: f[5] || (f[5] = (L) => j.$emit("update", { markdown: L.target.checked || void 0 }))
            }, null, 40, nn),
            f[26] || (f[26] = e("span", { class: "kb-toggle-label" }, "Enable Markdown formatting", -1))
          ])
        ]),
        e("div", sn, [
          f[28] || (f[28] = e("label", { class: "kb-label" }, [
            K(" Tags "),
            e("span", { class: "kb-helper" }, [
              K("Emoji shortcodes displayed with the notification (e.g. "),
              e("code", null, "warning"),
              K(", "),
              e("code", null, "white_check_mark"),
              K(", "),
              e("code", null, "rotating_light"),
              K(").")
            ])
          ], -1)),
          e("div", ln, [
            (a(!0), n(P, null, W(te.value, (L) => (a(), n("span", {
              key: L,
              class: "kb-tag"
            }, [
              K(d(L) + " ", 1),
              e("button", {
                type: "button",
                class: "kb-tag__remove",
                onClick: (X) => pe(L),
                "aria-label": "Remove tag"
              }, "×", 8, on)
            ]))), 128)),
            He(e("input", {
              type: "text",
              class: "kb-input kb-input--tag",
              placeholder: "Add tag, press Enter",
              "onUpdate:modelValue": f[6] || (f[6] = (L) => F.value = L),
              onKeydown: V,
              onBlur: le
            }, null, 544), [
              [it, F.value]
            ])
          ]),
          e("div", rn, [
            f[27] || (f[27] = e("span", {
              class: "kb-helper",
              style: { "margin-right": "0.4rem" }
            }, "Common:", -1)),
            (a(), n(P, null, W(ne, (L) => e("button", {
              key: L,
              type: "button",
              class: ke(["kb-tag-chip", { "kb-tag-chip--active": te.value.includes(L) }]),
              onClick: (X) => te.value.includes(L) ? pe(L) : (F.value = L, le())
            }, d(L), 11, un)), 64))
          ])
        ]),
        e("div", dn, [
          f[29] || (f[29] = e("label", { class: "kb-label" }, [
            K(" Icon URL "),
            e("span", { class: "kb-helper" }, "Custom notification icon (JPEG or PNG). Shown in the notification drawer.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://example.com/icon.png",
            value: w.value.icon ?? "",
            onInput: f[7] || (f[7] = (L) => j.$emit("update", { icon: L.target.value || void 0 }))
          }, null, 40, cn)
        ]),
        e("div", pn, [
          f[30] || (f[30] = e("label", { class: "kb-label" }, [
            K(" Image / Attachment URL "),
            e("span", { class: "kb-helper" }, [
              K("External file URL attached to the notification ("),
              e("code", null, "attach"),
              K("). Also used as hero image where supported.")
            ])
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: o.message.image_url ?? w.value.attach ?? "",
            "aria-invalid": !!o.imageUrlError,
            onInput: f[8] || (f[8] = (L) => j.$emit("update", { image_url: L.target.value || void 0, attach: L.target.value || void 0 }))
          }, null, 40, mn),
          o.imageUrlError ? (a(), n("p", vn, d(o.imageUrlError), 1)) : g("", !0),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Filename override (e.g. invoice.pdf) — optional",
            value: w.value.attachment_filename ?? "",
            onInput: f[9] || (f[9] = (L) => j.$emit("update", { attachment_filename: L.target.value || void 0 }))
          }, null, 40, bn)
        ]),
        e("div", hn, [
          f[31] || (f[31] = e("label", { class: "kb-label" }, [
            K(" Click URL ("),
            e("code", null, "click"),
            K(") "),
            e("span", { class: "kb-helper" }, "URL or deep link opened when the user taps the notification body.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: o.message.deep_link ?? "",
            "aria-invalid": !!o.deepLinkError,
            onInput: f[10] || (f[10] = (L) => j.$emit("update", { deep_link: L.target.value || void 0 }))
          }, null, 40, yn),
          o.deepLinkError ? (a(), n("p", gn, d(o.deepLinkError), 1)) : g("", !0)
        ]),
        e("div", fn, [
          e("label", { class: "kb-label" }, [
            f[32] || (f[32] = K(" Action buttons ", -1)),
            e("span", { class: "kb-helper" }, "Up to " + d(mt) + " interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.")
          ]),
          e("div", kn, [
            (a(!0), n(P, null, W(q.value, (L, X) => (a(), n("div", {
              key: L.id || X,
              class: "kb-action-card"
            }, [
              e("div", _n, [
                e("span", wn, "Button " + d(X + 1), 1),
                e("div", $n, [
                  e("select", {
                    class: "kb-select kb-select--action-type",
                    value: L.action,
                    onChange: (G) => ge(X, G.target.value)
                  }, [
                    (a(), n(P, null, W(me, (G) => e("option", {
                      key: G.value,
                      value: G.value
                    }, d(G.label), 9, Cn)), 64))
                  ], 40, xn),
                  e("label", Sn, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!L.clear,
                      onChange: (G) => se(X, { clear: G.target.checked || void 0 })
                    }, null, 40, In),
                    f[33] || (f[33] = e("span", { class: "kb-toggle-label" }, "Dismiss after tap", -1))
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "kb-btn-remove-action",
                  onClick: (G) => Z(X)
                }, "Remove", 8, Tn)
              ]),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label (e.g. View order)",
                value: L.label,
                onInput: (G) => se(X, { label: G.target.value })
              }, null, 40, An),
              L.action === "view" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input",
                placeholder: "URL to open (https:// or app://)",
                value: L.url ?? "",
                onInput: (G) => se(X, { url: G.target.value || void 0 })
              }, null, 40, Un)) : L.action === "http" ? (a(), n(P, { key: 1 }, [
                e("div", Rn, [
                  e("select", {
                    class: "kb-select kb-select--method",
                    value: L.method ?? "POST",
                    onChange: (G) => se(X, { method: G.target.value })
                  }, [
                    (a(), n(P, null, W(D, (G) => e("option", {
                      key: G,
                      value: G
                    }, d(G), 9, Pn)), 64))
                  ], 40, En),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "Endpoint URL",
                    value: L.url ?? "",
                    onInput: (G) => se(X, { url: G.target.value || void 0 })
                  }, null, 40, Bn)
                ]),
                e("textarea", {
                  class: "kb-textarea kb-textarea--sm",
                  rows: "2",
                  placeholder: 'Request body (e.g. {"status":"closed"})',
                  value: L.body ?? "",
                  onInput: (G) => se(X, { body: G.target.value || void 0 })
                }, null, 40, Ln),
                e("div", On, [
                  f[34] || (f[34] = e("span", { class: "kb-kv-label" }, "Headers", -1)),
                  (a(!0), n(P, null, W(_e(L), (G, $e) => (a(), n("div", {
                    key: $e,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Header name",
                      value: G.key,
                      onInput: (he) => _(X, G.key, he.target.value, G.value)
                    }, null, 40, Nn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: G.value,
                      onInput: (he) => _(X, G.key, G.key, he.target.value)
                    }, null, 40, Mn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (he) => E(X, G.key)
                    }, "×", 8, Vn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (G) => ee(X)
                  }, "+ Add header", 8, Dn)
                ])
              ], 64)) : L.action === "broadcast" ? (a(), n(P, { key: 2 }, [
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "Intent (default: io.heckel.ntfy.USER_ACTION)",
                  value: L.intent ?? "",
                  onInput: (G) => se(X, { intent: G.target.value || void 0 })
                }, null, 40, Wn),
                e("div", Hn, [
                  f[35] || (f[35] = e("span", { class: "kb-kv-label" }, "Extras", -1)),
                  (a(!0), n(P, null, W(N(L), (G, $e) => (a(), n("div", {
                    key: $e,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Key",
                      value: G.key,
                      onInput: (he) => oe(X, G.key, he.target.value, G.value)
                    }, null, 40, jn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: G.value,
                      onInput: (he) => oe(X, G.key, G.key, he.target.value)
                    }, null, 40, Fn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (he) => R(X, G.key)
                    }, "×", 8, qn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (G) => ye(X)
                  }, "+ Add extra", 8, zn)
                ])
              ], 64)) : L.action === "copy" ? (a(), n("input", {
                key: 3,
                type: "text",
                class: "kb-input",
                placeholder: "Value to copy to clipboard",
                value: L.value ?? "",
                onInput: (G) => se(X, { value: G.target.value || void 0 })
              }, null, 40, Yn)) : g("", !0)
            ]))), 128)),
            e("div", Kn, [
              e("button", {
                type: "button",
                class: "kb-btn-add-action",
                disabled: q.value.length >= mt,
                onClick: J
              }, " Add action ", 8, Gn),
              e("div", Jn, [
                f[36] || (f[36] = e("span", { class: "kb-action-chips-label" }, "Quick add:", -1)),
                (a(), n(P, null, W(["View order", "Track shipment", "Dismiss"], (L) => e("button", {
                  key: L,
                  type: "button",
                  class: "kb-action-chip",
                  disabled: q.value.length >= mt,
                  onClick: () => {
                    const X = [...q.value, { id: `action_${Date.now()}`, action: "view", label: L }];
                    j.$emit("update", { actions: X });
                  }
                }, d(L), 9, Qn)), 64))
              ])
            ])
          ])
        ]),
        e("div", Xn, [
          f[37] || (f[37] = e("label", { class: "kb-label" }, [
            K(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Attach coordinates for rich notifications or open-in-maps support.")
          ], -1)),
          e("div", Zn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((ae = w.value.location) == null ? void 0 : ae.lat) ?? "",
              onInput: f[11] || (f[11] = (L) => {
                const X = { ...w.value.location ?? {} }, G = L.target.value;
                X.lat = G === "" ? void 0 : Number(G), j.$emit("update", { location: X });
              })
            }, null, 40, es),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ve = w.value.location) == null ? void 0 : ve.lon) ?? "",
              onInput: f[12] || (f[12] = (L) => {
                const X = { ...w.value.location ?? {} }, G = L.target.value;
                X.lon = G === "" ? void 0 : Number(G), j.$emit("update", { location: X });
              })
            }, null, 40, ts)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. HQ, Store name)",
            value: ((re = w.value.location) == null ? void 0 : re.name) ?? "",
            onInput: f[13] || (f[13] = (L) => {
              const X = { ...w.value.location ?? {} };
              X.name = L.target.value || void 0, j.$emit("update", { location: X });
            })
          }, null, 40, as),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Address (optional)",
            value: ((be = w.value.location) == null ? void 0 : be.address) ?? "",
            onInput: f[14] || (f[14] = (L) => {
              const X = { ...w.value.location ?? {} };
              X.address = L.target.value || void 0, j.$emit("update", { location: X });
            })
          }, null, 40, ns)
        ]),
        e("div", ss, [
          f[38] || (f[38] = e("label", { class: "kb-label" }, [
            K(" Email forward ("),
            e("code", null, "email"),
            K(") "),
            e("span", { class: "kb-helper" }, "Forward this notification to an email address.")
          ], -1)),
          e("input", {
            type: "email",
            class: "kb-input",
            placeholder: "recipient@example.com",
            value: w.value.email_forward ?? "",
            onInput: f[15] || (f[15] = (L) => j.$emit("update", { email_forward: L.target.value || void 0 }))
          }, null, 40, ls)
        ]),
        e("div", os, [
          f[39] || (f[39] = e("label", { class: "kb-label" }, [
            K(" Phone call ("),
            e("code", null, "call"),
            K(") "),
            e("span", { class: "kb-helper" }, "Initiate a phone call to this number when the notification is received.")
          ], -1)),
          e("input", {
            type: "tel",
            class: "kb-input",
            placeholder: "+1 555 123 4567",
            value: w.value.call ?? "",
            onInput: f[16] || (f[16] = (L) => j.$emit("update", { call: L.target.value || void 0 }))
          }, null, 40, is)
        ]),
        e("div", rs, [
          f[40] || (f[40] = Je('<label class="kb-label" data-v-03f4fc73> Delivery delay (<code data-v-03f4fc73>delay</code>) <span class="kb-helper" data-v-03f4fc73>Schedule delivery for later. Accepts durations (<code data-v-03f4fc73>30min</code>, <code data-v-03f4fc73>2h</code>, <code data-v-03f4fc73>1day</code>), times (<code data-v-03f4fc73>9am</code>, <code data-v-03f4fc73>8:30pm</code>), natural language (<code data-v-03f4fc73>tomorrow, 3pm</code>), or Unix timestamps. Max 3 days.</span></label>', 1)),
          e("div", us, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. 30min, 2h, tomorrow 9am, 1693000000",
              value: w.value.delay ?? "",
              onInput: f[17] || (f[17] = (L) => j.$emit("update", { delay: L.target.value || void 0 }))
            }, null, 40, ds),
            e("div", cs, [
              (a(), n(P, null, W(["30min", "1h", "4h", "tomorrow"], (L) => e("button", {
                key: L,
                type: "button",
                class: ke(["kb-delay-chip", { "kb-delay-chip--active": w.value.delay === L }]),
                onClick: (X) => j.$emit("update", { delay: w.value.delay === L ? void 0 : L })
              }, d(L), 11, ps)), 64))
            ])
          ])
        ]),
        e("details", ms, [
          f[44] || (f[44] = e("summary", { class: "kb-advanced-toggles__summary" }, "Advanced options", -1)),
          e("div", vs, [
            e("label", bs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!w.value.cache,
                onChange: f[18] || (f[18] = (L) => j.$emit("update", { cache: L.target.checked || void 0 }))
              }, null, 40, hs),
              f[41] || (f[41] = e("span", { class: "kb-toggle-label" }, [
                K("Enable server-side caching ("),
                e("code", null, "cache"),
                K(")")
              ], -1))
            ]),
            e("label", ys, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!w.value.firebase,
                onChange: f[19] || (f[19] = (L) => j.$emit("update", { firebase: L.target.checked || void 0 }))
              }, null, 40, gs),
              f[42] || (f[42] = e("span", { class: "kb-toggle-label" }, [
                K("Deliver via Firebase Cloud Messaging ("),
                e("code", null, "firebase"),
                K(")")
              ], -1))
            ]),
            e("label", fs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!w.value.unified_push,
                onChange: f[20] || (f[20] = (L) => j.$emit("update", { unified_push: L.target.checked || void 0 }))
              }, null, 40, ks),
              f[43] || (f[43] = e("span", { class: "kb-toggle-label" }, [
                K("UnifiedPush delivery ("),
                e("code", null, "unified_push"),
                K(")")
              ], -1))
            ])
          ])
        ])
      ]);
    };
  }
}), ws = /* @__PURE__ */ Pe(_s, [["__scopeId", "data-v-03f4fc73"]]), $s = { class: "kb-section kb-section--inline-personalization" }, xs = { class: "kb-field" }, Cs = { class: "kb-insert-row" }, Ss = ["value"], Is = { class: "kb-field" }, Ts = { class: "kb-insert-row" }, As = { class: "kb-field" }, Us = { class: "kb-variable-list" }, Rs = /* @__PURE__ */ Ee({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(o, { emit: c }) {
    var V;
    const v = o, y = c, w = [
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
      () => (v.targets ?? []).includes("footer") ? S : w
    ), I = de(
      (V = v.variableOptions) != null && V.length ? [...v.variableOptions] : [...A.value]
    ), O = de(I.value[0] ?? A.value[0]), B = de("");
    Le(
      () => v.variableOptions,
      (ne) => {
        ne && ne.length ? (I.value = [...ne], I.value.includes(O.value) || (O.value = I.value[0])) : (I.value = [...A.value], I.value.includes(O.value) || (O.value = I.value[0]));
      }
    ), Le(
      A,
      (ne) => {
        var q;
        (q = v.variableOptions) != null && q.length || (I.value = [...ne], I.value.includes(O.value) || (O.value = I.value[0]));
      }
    );
    const F = $(() => I.value), te = $(() => {
      var q;
      return (q = v.targets) != null && q.length ? v.targets : ["title", "body"];
    });
    function le(ne) {
      y("insertVariable", { variable: O.value, field: ne });
    }
    function pe() {
      const ne = B.value.trim();
      ne && (I.value.includes(ne) || (I.value = [...I.value, ne]), O.value = ne, B.value = "");
    }
    return (ne, q) => (a(), n("section", $s, [
      q[9] || (q[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      q[10] || (q[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", xs, [
        q[5] || (q[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Cs, [
          He(e("select", {
            "onUpdate:modelValue": q[0] || (q[0] = (me) => O.value = me),
            class: "kb-select"
          }, [
            (a(!0), n(P, null, W(F.value, (me) => (a(), n("option", {
              key: me,
              value: me
            }, d(me), 9, Ss))), 128))
          ], 512), [
            [Ke, O.value]
          ]),
          te.value.includes("title") ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[1] || (q[1] = (me) => le("title"))
          }, " Into title ")) : g("", !0),
          te.value.includes("body") ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[2] || (q[2] = (me) => le("body"))
          }, " Into message ")) : g("", !0),
          te.value.includes("footer") ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[3] || (q[3] = (me) => le("footer"))
          }, " Into footer ")) : g("", !0)
        ])
      ]),
      e("div", Is, [
        q[6] || (q[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ts, [
          He(e("input", {
            "onUpdate:modelValue": q[4] || (q[4] = (me) => B.value = me),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [it, B.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: pe
          }, " Add ")
        ])
      ]),
      e("div", As, [
        q[7] || (q[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        q[8] || (q[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Us, [
          (a(!0), n(P, null, W(F.value, (me) => (a(), n("li", { key: me }, [
            e("code", null, "{{ ." + d(me) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Jt = /* @__PURE__ */ Pe(Rs, [["__scopeId", "data-v-ab96d6bb"]]), Es = { class: "kb-section kb-section--template-type" }, Ps = { class: "kb-field" }, Bs = { class: "kb-radio-group" }, Ls = { class: "kb-radio" }, Os = ["checked"], Ns = { class: "kb-radio" }, Ms = ["checked"], Vs = /* @__PURE__ */ Ee({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(o, { emit: c }) {
    const v = c;
    return (y, w) => (a(), n("section", Es, [
      w[5] || (w[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      w[6] || (w[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Ps, [
        e("div", Bs, [
          e("label", Ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: o.templateType === "transactional",
              onChange: w[0] || (w[0] = (S) => v("update", "transactional"))
            }, null, 40, Os),
            w[2] || (w[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ns, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: o.templateType === "marketing",
              onChange: w[1] || (w[1] = (S) => v("update", "marketing"))
            }, null, 40, Ms),
            w[3] || (w[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        w[4] || (w[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Pe(Vs, [["__scopeId", "data-v-ff2e1bd8"]]), Ds = { class: "kb-section" }, Ws = { class: "kb-section__head" }, Hs = { class: "kb-section__desc" }, js = { class: "kb-field" }, Fs = { class: "kb-radio-group" }, qs = { class: "kb-radio" }, zs = ["checked"], Ys = { class: "kb-radio" }, Ks = ["checked"], Gs = {
  key: 0,
  class: "kb-field kb-row"
}, Js = ["value"], Qs = ["value"], Xs = { class: "kb-field" }, Zs = ["value"], el = ["value"], tl = { class: "kb-field" }, al = ["value"], nl = ["value"], sl = { class: "kb-field" }, ll = { class: "kb-checkbox" }, ol = ["checked"], il = /* @__PURE__ */ Ee({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o) {
    const c = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (v, y) => {
      var w;
      return a(), n("section", Ds, [
        e("div", Ws, [
          y[8] || (y[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: y[0] || (y[0] = (S) => v.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        e("p", Hs, d(o.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", js, [
          y[11] || (y[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Fs, [
            e("label", qs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !o.delivery.scheduled_at,
                onChange: y[1] || (y[1] = (S) => v.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, zs),
              y[9] || (y[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Ys, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!o.delivery.scheduled_at,
                onChange: y[2] || (y[2] = (S) => v.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Ks),
              y[10] || (y[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        o.delivery.scheduled_at ? (a(), n("div", Gs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (w = o.delivery.scheduled_at) == null ? void 0 : w.slice(0, 16),
            onInput: y[3] || (y[3] = (S) => v.$emit("update", { scheduled_at: S.target.value }))
          }, null, 40, Js),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: o.delivery.timezone,
            onInput: y[4] || (y[4] = (S) => v.$emit("update", { timezone: S.target.value }))
          }, null, 40, Qs)
        ])) : g("", !0),
        o.showPushOptions ? (a(), n(P, { key: 1 }, [
          e("div", Xs, [
            y[12] || (y[12] = e("label", { class: "kb-label" }, [
              K(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.ttl,
              onChange: y[5] || (y[5] = (S) => v.$emit("update", { ttl: Number(S.target.value) }))
            }, [
              (a(!0), n(P, null, W(x(oa), (S) => (a(), n("option", {
                key: S,
                value: S
              }, d(c[S] ?? S + "s"), 9, el))), 128))
            ], 40, Zs)
          ]),
          e("div", tl, [
            y[13] || (y[13] = e("label", { class: "kb-label" }, [
              K(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.priority,
              onChange: y[6] || (y[6] = (S) => v.$emit("update", { priority: S.target.value }))
            }, [
              (a(!0), n(P, null, W(x(Ht), (S) => (a(), n("option", {
                key: S,
                value: S
              }, d(S), 9, nl))), 128))
            ], 40, al)
          ]),
          e("div", sl, [
            e("label", ll, [
              e("input", {
                type: "checkbox",
                checked: o.delivery.quiet_hours,
                onChange: y[7] || (y[7] = (S) => v.$emit("update", { quiet_hours: !o.delivery.quiet_hours }))
              }, null, 40, ol),
              y[14] || (y[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : g("", !0)
      ]);
    };
  }
}), rl = /* @__PURE__ */ Pe(il, [["__scopeId", "data-v-5707a2a7"]]), ul = { class: "kb-accordion" }, dl = { class: "kb-accordion__body" }, cl = { class: "kb-field" }, pl = ["value"], ml = { class: "kb-field" }, vl = { class: "kb-checkbox" }, bl = ["checked"], hl = /* @__PURE__ */ Ee({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(o) {
    return (c, v) => (a(), n("details", ul, [
      v[4] || (v[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", dl, [
        e("div", cl, [
          v[2] || (v[2] = e("label", { class: "kb-label" }, [
            K(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: o.delivery.collapse_key,
            onInput: v[0] || (v[0] = (y) => c.$emit("update", { collapse_key: y.target.value || void 0 }))
          }, null, 40, pl)
        ]),
        e("div", ml, [
          e("label", vl, [
            e("input", {
              type: "checkbox",
              checked: o.delivery.silent_push,
              onChange: v[1] || (v[1] = (y) => c.$emit("update", { silent_push: !o.delivery.silent_push }))
            }, null, 40, bl),
            v[3] || (v[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), yl = /* @__PURE__ */ Pe(hl, [["__scopeId", "data-v-699e4501"]]);
function Qe(o, c) {
  return !o || typeof o != "string" ? o : o.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (v, y) => {
    const S = String(y).trim().replace(/^\./, "");
    return S in c ? String(c[S]) : v;
  });
}
const et = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], gl = { class: "kb-preview" }, fl = { class: "kb-preview__toggle" }, kl = { class: "kb-preview__mode" }, _l = { class: "kb-preview__quality" }, wl = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, $l = ["src"], xl = { class: "kb-android-body-row" }, Cl = { class: "kb-android-body-content" }, Sl = {
  key: 0,
  class: "kb-android-title"
}, Il = {
  key: 1,
  class: "kb-android-text"
}, Tl = {
  key: 2,
  class: "kb-android-location-line"
}, Al = {
  key: 0,
  class: "kb-android-thumb"
}, Ul = ["src"], Rl = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, El = ["src"], Pl = {
  key: 0,
  class: "kb-preview-map__caption"
}, Bl = {
  key: 2,
  class: "kb-android-actions"
}, Ll = {
  key: 3,
  class: "kb-preview-warning"
}, Ol = { class: "kb-ios-banner" }, Nl = { class: "kb-ios-content" }, Ml = {
  key: 0,
  class: "kb-ios-title"
}, Vl = {
  key: 1,
  class: "kb-ios-text"
}, Dl = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, Wl = ["src"], Hl = {
  key: 0,
  class: "kb-preview-map__caption"
}, jl = {
  key: 4,
  class: "kb-ios-actions"
}, Fl = {
  key: 5,
  class: "kb-preview-warning"
}, ql = {
  key: 0,
  class: "kb-ios-thumb"
}, zl = ["src"], Yl = { class: "kb-web-toast" }, Kl = { class: "kb-web-body" }, Gl = {
  key: 0,
  class: "kb-web-title"
}, Jl = {
  key: 1,
  class: "kb-web-text"
}, Ql = {
  key: 3,
  class: "kb-web-image"
}, Xl = ["src"], Zl = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, eo = ["src"], to = {
  key: 0,
  class: "kb-preview-map__caption"
}, ao = {
  key: 0,
  class: "kb-web-actions"
}, no = {
  key: 1,
  class: "kb-preview-warning"
}, so = /* @__PURE__ */ Ee({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(o) {
    const c = o, v = de("shade"), y = de("banner"), w = de("toast"), S = $(() => v.value === "expanded"), A = $(
      () => c.getPreview(c.selectedPlatform, {
        expanded: c.selectedPlatform === "android" ? S.value : void 0
      })
    ), I = $(() => {
      const ee = A.value;
      return c.previewProfile ? {
        ...ee,
        title: Qe((ee == null ? void 0 : ee.title) ?? "", c.previewProfile.data),
        body: Qe((ee == null ? void 0 : ee.body) ?? "", c.previewProfile.data)
      } : ee;
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
    function B(ee, _) {
      const E = (ee ?? "").trim();
      return E ? E.length <= _ ? E : `${E.slice(0, Math.max(0, _ - 1)).trimEnd()}…` : "";
    }
    const F = $(() => c.selectedPlatform === "android" ? v.value : c.selectedPlatform === "ios" ? y.value : w.value), te = $(() => (O[c.selectedPlatform] ?? O.web)[F.value] ?? { title: 60, body: 160 }), le = $(
      () => {
        var ee;
        return B((ee = I.value) == null ? void 0 : ee.title, te.value.title);
      }
    ), pe = $(
      () => {
        var ee;
        return B((ee = I.value) == null ? void 0 : ee.body, te.value.body);
      }
    ), V = { android: 3, ios: 4, web: 2 }, ne = $(
      () => {
        var ee;
        return Array.isArray((ee = I.value) == null ? void 0 : ee.actions) ? I.value.actions : [];
      }
    ), q = $(
      () => ne.value.slice(0, V[c.selectedPlatform] ?? 2)
    ), me = $(
      () => Math.max(0, ne.value.length - q.value.length)
    ), D = $(() => {
      var ee;
      return (((ee = c.message) == null ? void 0 : ee.deep_link) ?? "").trim();
    }), J = $(() => D.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(D.value) : !1), Z = $(() => D.value ? D.value.length <= 40 ? D.value : `${D.value.slice(0, 37)}…` : ""), se = $(() => {
      var _, E, N;
      const ee = [];
      return (_ = c.delivery) != null && _.priority && ee.push(`Priority: ${c.delivery.priority}`), typeof ((E = c.delivery) == null ? void 0 : E.ttl) == "number" && ee.push(`TTL: ${c.delivery.ttl}s`), (N = c.delivery) != null && N.silent_push && ee.push("Silent push"), ee;
    }), ge = $(() => {
      var oe;
      const ee = (oe = I.value) == null ? void 0 : oe.location;
      if (!ee || ee.lat == null && ee.lon == null) return null;
      const _ = Number(ee.lat) || 0, E = Number(ee.lon) || 0, N = 8e-3, ye = [E - N, _ - N, E + N, _ + N].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(ye)}&layer=mapnik&marker=${_},${E}`;
    }), _e = $(() => {
      var _;
      const ee = (_ = I.value) == null ? void 0 : _.location;
      return ee && (ee.lat != null || ee.lon != null || ee.name || ee.address);
    });
    return (ee, _) => {
      var E, N, ye, oe, R, j, f, ae, ve, re, be, L, X, G, $e, he;
      return a(), n("div", gl, [
        e("div", fl, [
          e("label", kl, [
            _[6] || (_[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            o.selectedPlatform === "android" ? He((a(), n("select", {
              key: 0,
              "onUpdate:modelValue": _[0] || (_[0] = (z) => v.value = z),
              class: "kb-preview__mode-select"
            }, [..._[3] || (_[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ke, v.value]
            ]) : o.selectedPlatform === "ios" ? He((a(), n("select", {
              key: 1,
              "onUpdate:modelValue": _[1] || (_[1] = (z) => y.value = z),
              class: "kb-preview__mode-select"
            }, [..._[4] || (_[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ke, y.value]
            ]) : He((a(), n("select", {
              key: 2,
              "onUpdate:modelValue": _[2] || (_[2] = (z) => w.value = z),
              class: "kb-preview__mode-select"
            }, [..._[5] || (_[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ke, w.value]
            ])
          ]),
          e("div", _l, [
            (a(!0), n(P, null, W(se.value, (z) => (a(), n("span", {
              key: z,
              class: "kb-preview__badge"
            }, d(z), 1))), 128))
          ])
        ]),
        o.selectedPlatform === "android" ? (a(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: ke(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${v.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          _[9] || (_[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ke(["kb-android-notification", { "kb-android-notification--expanded": S.value }])
          }, [
            _[8] || (_[8] = Je('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: ke(["kb-android-body", { "kb-android-body--expanded": S.value }])
            }, [
              S.value && I.value.imageUrl ? (a(), n("div", wl, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, $l)
              ])) : g("", !0),
              e("div", xl, [
                e("div", Cl, [
                  le.value ? (a(), n("div", Sl, d(le.value), 1)) : g("", !0),
                  pe.value ? (a(), n("div", Il, d(pe.value), 1)) : g("", !0),
                  _e.value && !S.value && ((E = I.value.location) != null && E.name || (N = I.value.location) != null && N.address) ? (a(), n("div", Tl, [
                    _[7] || (_[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    K(" " + d(((ye = I.value.location) == null ? void 0 : ye.name) || ((oe = I.value.location) == null ? void 0 : oe.address)), 1)
                  ])) : g("", !0),
                  D.value ? (a(), n("div", {
                    key: 3,
                    class: ke(["kb-preview-link", { "kb-preview-link--invalid": !J.value }])
                  }, d(J.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0)
                ]),
                !S.value && I.value.imageUrl ? (a(), n("div", Al, [
                  e("img", {
                    src: I.value.imageUrl,
                    alt: ""
                  }, null, 8, Ul)
                ])) : g("", !0)
              ]),
              _e.value && ge.value && S.value ? (a(), n("div", Rl, [
                e("iframe", {
                  src: ge.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, El),
                (R = I.value.location) != null && R.name || (j = I.value.location) != null && j.address ? (a(), n("div", Pl, d(((f = I.value.location) == null ? void 0 : f.name) || ((ae = I.value.location) == null ? void 0 : ae.address)), 1)) : g("", !0)
              ])) : g("", !0),
              q.value.length ? (a(), n("div", Bl, [
                (a(!0), n(P, null, W(q.value, (z) => (a(), n("button", {
                  key: z.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, d(z.label || "Action"), 1))), 128))
              ])) : g("", !0),
              me.value > 0 ? (a(), n("p", Ll, " Showing " + d(q.value.length) + " of " + d(ne.value.length) + " actions on " + d(o.selectedPlatform) + ". ", 1)) : g("", !0)
            ], 2)
          ], 2)
        ], 2)) : o.selectedPlatform === "ios" ? (a(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: ke(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${y.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          _[12] || (_[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", Ol, [
            _[11] || (_[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Nl, [
              _[10] || (_[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              le.value ? (a(), n("div", Ml, d(le.value), 1)) : g("", !0),
              pe.value ? (a(), n("div", Vl, d(pe.value), 1)) : g("", !0),
              D.value ? (a(), n("div", {
                key: 2,
                class: ke(["kb-preview-link", { "kb-preview-link--invalid": !J.value }])
              }, d(J.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0),
              _e.value && ge.value ? (a(), n("div", Dl, [
                e("iframe", {
                  src: ge.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Wl),
                (ve = I.value.location) != null && ve.name || (re = I.value.location) != null && re.address ? (a(), n("div", Hl, d(((be = I.value.location) == null ? void 0 : be.name) || ((L = I.value.location) == null ? void 0 : L.address)), 1)) : g("", !0)
              ])) : g("", !0),
              q.value.length ? (a(), n("div", jl, [
                (a(!0), n(P, null, W(q.value, (z) => (a(), n("button", {
                  key: z.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, d(z.label || "Action"), 1))), 128))
              ])) : g("", !0),
              me.value > 0 ? (a(), n("p", Fl, " Showing " + d(q.value.length) + " of " + d(ne.value.length) + " actions on " + d(o.selectedPlatform) + ". ", 1)) : g("", !0)
            ]),
            I.value.imageUrl ? (a(), n("div", ql, [
              e("img", {
                src: I.value.imageUrl,
                alt: ""
              }, null, 8, zl)
            ])) : g("", !0)
          ])
        ], 2)) : (a(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: ke(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${w.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          _[14] || (_[14] = Je('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", Yl, [
            _[13] || (_[13] = Je('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", Kl, [
              le.value ? (a(), n("div", Gl, d(le.value), 1)) : g("", !0),
              pe.value ? (a(), n("div", Jl, d(pe.value), 1)) : g("", !0),
              D.value ? (a(), n("div", {
                key: 2,
                class: ke(["kb-preview-link", { "kb-preview-link--invalid": !J.value }])
              }, d(J.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0),
              I.value.imageUrl ? (a(), n("div", Ql, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, Xl)
              ])) : g("", !0),
              _e.value && ge.value ? (a(), n("div", Zl, [
                e("iframe", {
                  src: ge.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, eo),
                (X = I.value.location) != null && X.name || (G = I.value.location) != null && G.address ? (a(), n("div", to, d((($e = I.value.location) == null ? void 0 : $e.name) || ((he = I.value.location) == null ? void 0 : he.address)), 1)) : g("", !0)
              ])) : g("", !0)
            ]),
            q.value.length ? (a(), n("div", ao, [
              (a(!0), n(P, null, W(q.value, (z, Ie) => (a(), n("button", {
                key: z.id || Ie,
                type: "button",
                class: ke(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Ie) > 0 }])
              }, d(z.label || "Action"), 3))), 128))
            ])) : g("", !0),
            me.value > 0 ? (a(), n("p", no, " Showing " + d(q.value.length) + " of " + d(ne.value.length) + " actions on " + d(o.selectedPlatform) + ". ", 1)) : g("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), lo = /* @__PURE__ */ Pe(so, [["__scopeId", "data-v-4fc616d9"]]), oo = { class: "kb-version-dialog" }, io = {
  key: 0,
  class: "kb-version-empty"
}, ro = {
  key: 1,
  class: "kb-version-list"
}, uo = { class: "kb-version-item-label" }, co = ["onClick"], po = { class: "kb-version-actions" }, mo = /* @__PURE__ */ Ee({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(o, { emit: c }) {
    const v = c;
    function y(w) {
      try {
        return new Date(w).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return w;
      }
    }
    return (w, S) => o.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: S[1] || (S[1] = na((A) => v("close"), ["escape"]))
    }, [
      e("div", oo, [
        S[2] || (S[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        S[3] || (S[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        o.versions.length === 0 ? (a(), n("div", io, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", ro, [
          (a(!0), n(P, null, W(o.versions, (A) => (a(), n("li", {
            key: A.id,
            class: "kb-version-item"
          }, [
            e("span", uo, d(A.label || y(A.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (I) => {
                v("restore", A.snapshot), v("close");
              }
            }, " Restore ", 8, co)
          ]))), 128))
        ])),
        e("div", po, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: S[0] || (S[0] = (A) => v("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : g("", !0);
  }
}), Qt = /* @__PURE__ */ Pe(mo, [["__scopeId", "data-v-ce35a513"]]), Ut = [
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
], vo = [
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
], bo = { class: "keos-notification-builder" }, ho = { class: "kb-builder-top" }, yo = { class: "kb-push-layout" }, go = { class: "kb-push-sidebar" }, fo = {
  key: 0,
  class: "kb-push-form"
}, ko = {
  key: 0,
  class: "kb-hint-card"
}, _o = { class: "kb-push-form-head" }, wo = { class: "kb-push-form-head-top" }, $o = { class: "kb-push-health-pill" }, xo = { class: "kb-push-form-head-row" }, Co = ["value"], So = { class: "kb-push-health" }, Io = { class: "kb-push-health-row" }, To = { class: "kb-push-health-value" }, Ao = { class: "kb-push-health-bar" }, Uo = {
  key: 1,
  class: "kb-push-form"
}, Ro = { class: "kb-push-canvas" }, Eo = {
  key: 0,
  class: "kb-push-test-banner"
}, Po = { class: "kb-push-preview-chrome" }, Bo = { class: "kb-push-preview-controls" }, Lo = { class: "kb-push-preview-as" }, Oo = ["value"], No = { class: "kb-preview-status" }, Mo = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Vo = ["aria-selected", "aria-controls", "onClick"], Do = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Wo = { class: "kb-push-actions" }, Ho = {
  key: 0,
  class: "kb-actions-note"
}, jo = { key: 0 }, Fo = { class: "kb-push-actions-right" }, qo = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, zo = { class: "kb-confirm-dialog" }, Yo = { class: "kb-confirm-actions" }, Ko = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    const v = o, y = c, w = de("android"), S = de(""), A = de(!1), I = de(null), O = de(!1), B = $(
      () => V.value.workflow_status ?? "draft"
    ), F = $(() => {
      const s = S.value;
      return s ? et.find((l) => l.id === s) ?? null : null;
    });
    function te(s) {
      const l = V.value, k = s.campaign.message ? { ...l.message, ...s.campaign.message } : l.message, h = s.campaign.delivery ? { ...l.delivery, ...s.campaign.delivery } : l.delivery;
      D({
        ...s.campaign,
        message: k,
        delivery: h
      }), I.value = null, A.value = !1;
    }
    function le(s) {
      const l = s.target.value;
      if (!l) return;
      const k = Ut.find((h) => h.id === l);
      k && (ne.value ? (I.value = k, A.value = !0) : te(k), s.target.value = "");
    }
    function pe(s) {
      V.value = s, O.value = !1;
    }
    const {
      campaign: V,
      dirty: ne,
      customValidatorErrors: q,
      getValidationWithWarnings: me,
      update: D,
      updateMessage: J,
      updateDelivery: Z,
      undo: se,
      redo: ge,
      canUndo: _e,
      canRedo: ee,
      resetMessage: _,
      resetDelivery: E,
      getPreview: N,
      characterLimits: ye,
      hooks: oe
    } = ut({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (s) => {
          var h, M, m, i;
          const l = [];
          (h = s.name) != null && h.trim() || l.push("Template name is required"), (m = (M = s.message) == null ? void 0 : M.body) != null && m.trim() || l.push("Message body is required");
          const k = (i = v.hooks) != null && i.customValidators ? await v.hooks.customValidators(s) : [];
          return [...l, ...k];
        }
      },
      onDirty: () => y("change", V.value)
    }), { lastSavedAt: R } = dt(V, { channel: "push" });
    function j(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ge() : se());
    }
    st(() => {
      window.addEventListener("keydown", j);
    }), lt(() => {
      window.removeEventListener("keydown", j);
    }), Le(V, (s) => y("update:modelValue", s), { deep: !0 });
    const f = de(), ae = de(!0), ve = de(!0);
    async function re() {
      if (oe.estimateReach)
        try {
          f.value = await oe.estimateReach(V.value.audience);
        } catch {
          f.value = void 0;
        }
      oe.canSend && (ae.value = await Promise.resolve(oe.canSend())), oe.canSchedule && (ve.value = await Promise.resolve(oe.canSchedule()));
    }
    re(), Le(() => V.value.audience, re, { deep: !0 });
    const be = $(() => (q.value, me(f.value))), L = $(() => be.value.blockingErrors), X = $(() => be.value.warnings), G = $(() => be.value.valid), $e = $(() => {
      var h, M, m;
      const s = V.value.message, l = [
        !!((h = V.value.name) != null && h.trim()),
        !!((M = s.title) != null && M.trim()),
        !!((m = s.body) != null && m.trim()),
        !!(s.template_type ?? V.value.template_type),
        Array.isArray(s.actions) ? s.actions.length > 0 : !1
      ], k = l.filter(Boolean).length;
      return Math.round(k / l.length * 100);
    }), he = $(() => $e.value >= 90 ? "Production ready" : $e.value >= 70 ? "Strong draft" : $e.value >= 40 ? "In progress" : "Needs setup"), z = $(() => {
      const s = V.value.message;
      return !!((s.title ?? "").toString().trim() || (s.body ?? "").toString().trim() || Array.isArray(s.actions) && s.actions.length);
    }), Ie = $(
      () => ye[w.value].title
    ), Ue = $(() => ye[w.value].body), Be = $(() => V.value.message.title.length), De = $(() => V.value.message.body.length), Re = $(() => {
      if (Be.value > Ie.value)
        return `Title exceeds ${Ie.value} characters for ${w.value}.`;
    }), Ne = $(() => {
      const s = L.value.find(
        (l) => l.message === "Message body is required"
      );
      if (s) return s.message;
      if (De.value > Ue.value)
        return `Body exceeds ${Ue} characters for ${w.value}.`;
    }), je = $(
      () => V.value.template_type ?? "transactional"
    );
    function We(s) {
      D({ template_type: s });
    }
    function Fe(s) {
      D({
        name: s,
        tracking: { ...V.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Me(s) {
      const l = ` {{ .${s.variable} }}`, k = V.value.message.variables ?? [], h = Array.from(/* @__PURE__ */ new Set([...k, s.variable]));
      s.field === "title" ? J({
        title: V.value.message.title + l,
        variables: h
      }) : J({
        body: V.value.message.body + l,
        variables: h
      });
    }
    function ie() {
      G.value && y("save", V.value);
    }
    return (s, l) => {
      var k;
      return a(), n("div", bo, [
        e("div", ho, [
          Oe(ct, {
            "campaign-name": x(V).name,
            status: x(V).status,
            dirty: x(ne),
            "last-saved-at": x(R),
            "can-undo": x(_e),
            "can-redo": x(ee),
            "workflow-status": B.value,
            "slugify-name": v.enforceSlugName,
            "onUpdate:campaignName": Fe,
            "onUpdate:workflowStatus": l[0] || (l[0] = (h) => x(D)({ workflow_status: h })),
            onUndo: x(se),
            onRedo: x(ge)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          L.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Xe).input}px`,
              padding: `${x(xe)[12]}px ${x(xe)[16]}px`,
              marginBottom: `${x(xe)[16]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (a(!0), n(P, null, W(L.value, (h) => (a(), n("li", {
                key: h.message
              }, d(h.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", yo, [
          e("aside", go, [
            o.disabledSections.includes("message") ? g("", !0) : (a(), n("div", fo, [
              !x(V).message.title && !x(V).message.body ? (a(), n("div", ko, " Add a title and message below to get started. ")) : g("", !0),
              e("div", _o, [
                e("div", wo, [
                  l[12] || (l[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", $o, d(he.value), 1)
                ]),
                e("div", xo, [
                  Oe(_t, {
                    "template-type": je.value,
                    onUpdate: We
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: le
                  }, [
                    l[13] || (l[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, W(x(Ut), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, Co))), 128))
                  ], 32)
                ]),
                e("div", So, [
                  e("div", Io, [
                    l[14] || (l[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", To, d($e.value) + "%", 1)
                  ]),
                  e("div", Ao, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: Ce({ width: `${$e.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(ws, {
                message: x(V).message,
                "title-count": Be.value,
                "body-count": De.value,
                "title-limit": Ie.value,
                "body-limit": Ue.value,
                "selected-platform": w.value,
                "show-reset": !0,
                "title-error": Re.value,
                "body-error": Ne.value,
                onUpdate: x(J),
                onReset: l[1] || (l[1] = (h) => x(_)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Oe(Jt, {
                message: x(V).message,
                "variable-options": o.variableOptions,
                onUpdate: x(J),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !o.designOnly && !o.disabledSections.includes("delivery") ? (a(), n("div", Uo, [
              l[15] || (l[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Oe(rl, {
                delivery: x(V).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: x(Z),
                onReset: l[2] || (l[2] = (h) => x(E)())
              }, null, 8, ["delivery", "onUpdate"]),
              Oe(yl, {
                delivery: x(V).delivery,
                onUpdate: x(Z)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : g("", !0)
          ]),
          e("main", Ro, [
            !o.designOnly && x(V).audience.test_mode ? (a(), n("div", Eo, [...l[16] || (l[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Po, [
              e("div", Bo, [
                e("label", Lo, [
                  l[18] || (l[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  He(e("select", {
                    "onUpdate:modelValue": l[3] || (l[3] = (h) => S.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[17] || (l[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, W(x(et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, Oo))), 128))
                  ], 512), [
                    [Ke, S.value]
                  ])
                ]),
                e("div", No, [
                  l[19] || (l[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(w.value), 1)
                ])
              ]),
              e("div", Mo, [
                (a(), n(P, null, W(["android", "ios", "web"], (h) => e("button", {
                  key: h,
                  type: "button",
                  class: ke(["kb-push-device-btn", { "kb-push-device-btn--active": w.value === h }]),
                  role: "tab",
                  "aria-selected": w.value === h,
                  "aria-controls": `kb-preview-panel-${h}`,
                  onClick: (M) => w.value = h
                }, d(h.toUpperCase()), 11, Vo)), 64))
              ]),
              e("div", {
                class: ke(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !z.value }])
              }, [
                !x(V).message.title && !x(V).message.body ? (a(), n("div", Do, [...l[20] || (l[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), sa(lo, {
                  key: 1,
                  "get-preview": x(N),
                  "selected-platform": w.value,
                  "preview-profile": F.value,
                  message: x(V).message,
                  delivery: x(V).delivery,
                  "onUpdate:selectedPlatform": l[4] || (l[4] = (h) => w.value = h)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Wo, [
          X.value.length > 0 ? (a(), n("div", Ho, [
            l[21] || (l[21] = e("strong", null, "Warning:", -1)),
            K(" " + d((k = X.value[0]) == null ? void 0 : k.message) + " ", 1),
            X.value.length > 1 ? (a(), n("span", jo, " (+" + d(X.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Fo, [
            !o.designOnly && o.showHistory ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[5] || (l[5] = (h) => O.value = !0)
            }, " Version history ")) : g("", !0),
            !o.designOnly && o.showSaveVersion ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[6] || (l[6] = (h) => y("save-version", JSON.parse(JSON.stringify(x(V)))))
            }, " Save as version ")) : g("", !0),
            o.showDuplicate ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[7] || (l[7] = (h) => y("duplicate", JSON.parse(JSON.stringify(x(V)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: ie
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: l[8] || (l[8] = (h) => y("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        A.value ? (a(), n("div", qo, [
          e("div", zo, [
            l[22] || (l[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[23] || (l[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Yo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: l[9] || (l[9] = (h) => {
                  A.value = !1, I.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: l[10] || (l[10] = (h) => I.value && te(I.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0),
        Oe(Qt, {
          open: O.value,
          versions: o.versions,
          onClose: l[11] || (l[11] = (h) => O.value = !1),
          onRestore: pe
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Pe(Ko, [["__scopeId", "data-v-18771e1a"]]), Go = { class: "kb-section" }, Jo = { class: "kb-section__head" }, Qo = { class: "kb-summary-bar" }, Xo = { class: "kb-pill kb-pill--category" }, Zo = { class: "kb-pill kb-pill--format" }, ei = { class: "kb-pill kb-pill--status" }, ti = { class: "kb-field" }, ai = ["value"], ni = ["value", "disabled"], si = { class: "kb-field" }, li = { class: "kb-label" }, oi = { class: "kb-helper" }, ii = ["value"], ri = ["value"], ui = { class: "kb-field" }, di = ["value"], ci = { class: "kb-field kb-field--inline kb-field--language-limits" }, pi = { class: "kb-field-half" }, mi = ["value"], vi = { class: "kb-field" }, bi = ["value"], hi = { class: "kb-field kb-field--toggles" }, yi = { class: "kb-toggle-row" }, gi = ["checked"], fi = {
  key: 0,
  class: "kb-toggle-row"
}, ki = ["checked"], _i = {
  key: 0,
  class: "kb-field"
}, wi = ["value"], $i = {
  key: 1,
  class: "kb-field"
}, xi = { class: "kb-label" }, Ci = { class: "kb-input-with-var" }, Si = ["value"], Ii = { class: "kb-var-picker-wrap" }, Ti = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Ai = ["onClick"], Ui = {
  key: 2,
  class: "kb-field"
}, Ri = ["value"], Ei = {
  key: 3,
  class: "kb-field"
}, Pi = ["value"], Bi = { class: "kb-mu" }, Li = { class: "kb-mu__text kb-mu__text--file" }, Oi = { class: "kb-mu__size" }, Ni = { class: "kb-mu__text kb-mu__text--hint" }, Mi = { class: "kb-mu__right" }, Vi = ["disabled"], Di = {
  key: 0,
  class: "kb-mu__spinner",
  "aria-hidden": "true"
}, Wi = {
  key: 0,
  class: "kb-mu__error"
}, Hi = {
  key: 4,
  class: "kb-field"
}, ji = ["value"], Fi = {
  key: 5,
  class: "kb-field"
}, qi = ["value"], zi = {
  key: 6,
  class: "kb-field"
}, Yi = ["value"], Ki = {
  key: 7,
  class: "kb-field"
}, Gi = ["value"], Ji = ["value"], Qi = {
  key: 8,
  class: "kb-field"
}, Xi = { class: "kb-wa-buttons" }, Zi = { class: "kb-carousel-card__head" }, er = { class: "kb-carousel-card__num" }, tr = ["onClick"], ar = { class: "kb-field-inline-2" }, nr = ["value", "onChange"], sr = ["value", "onInput"], lr = ["value", "onInput"], or = ["value", "onInput"], ir = { class: "kb-carousel-card__btns" }, rr = ["value", "onInput"], ur = ["value", "onChange"], dr = ["value", "onInput"], cr = ["value", "onInput"], pr = ["onClick"], mr = ["disabled", "onClick"], vr = ["disabled"], br = {
  key: 9,
  class: "kb-field"
}, hr = { class: "kb-wa-buttons" }, yr = ["value", "onInput"], gr = ["value", "onInput"], fr = ["onClick"], kr = {
  key: 10,
  class: "kb-field"
}, _r = ["value"], wr = ["value"], $r = { class: "kb-auth-options" }, xr = { class: "kb-toggle-row" }, Cr = ["checked"], Sr = { class: "kb-auth-expiry" }, Ir = ["value"], Tr = { class: "kb-field" }, Ar = { class: "kb-label" }, Ur = { class: "kb-input-with-var" }, Rr = ["value"], Er = { class: "kb-var-picker-wrap" }, Pr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Br = ["onClick"], Lr = { class: "kb-field" }, Or = ["value"], Nr = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, Mr = { class: "kb-wa-fields-list" }, Vr = { class: "kb-wa-field-name" }, Dr = { class: "kb-wa-field-status" }, Wr = {
  key: 12,
  class: "kb-field"
}, Hr = { class: "kb-input-with-var" }, jr = ["value"], Fr = { class: "kb-var-picker-wrap" }, qr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, zr = ["onClick"], Yr = {
  key: 13,
  class: "kb-field"
}, Kr = { class: "kb-label" }, Gr = { class: "kb-helper" }, Jr = { class: "kb-wa-buttons" }, Qr = { class: "kb-input-with-var kb-input-with-var--btn" }, Xr = ["value", "onInput"], Zr = { class: "kb-var-picker-wrap" }, eu = ["onClick"], tu = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, au = ["onClick"], nu = ["value", "onChange"], su = ["value"], lu = ["value", "onInput"], ou = ["value", "onInput"], iu = ["value", "onInput"], ru = ["value", "onInput"], uu = ["value", "onChange"], du = ["value", "onInput"], cu = ["value", "onInput"], pu = ["value", "onInput"], mu = {
  key: 4,
  class: "kb-opt-out-note"
}, vu = ["onClick"], bu = ["disabled"], vt = 60, bt = 1024, ht = 60, Pt = 10, Bt = 10, hu = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    const v = o, y = c, w = [
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
    }, O = [
      { value: "quick_reply", label: "Quick reply" },
      { value: "url", label: "Visit URL" },
      { value: "call", label: "Call phone" },
      { value: "copy_code", label: "Copy coupon code" },
      { value: "otp", label: "OTP (authentication only)" },
      { value: "opt_out", label: "Marketing opt-out" }
    ], B = $(() => v.message), F = $(() => B.value.template_type ?? "text"), te = $(() => String(B.value.template_category ?? "marketing").trim()), le = $(() => B.value.header_type ?? "none"), pe = $(() => String(B.value.header ?? "")), V = $(() => String(B.value.body ?? "")), ne = $(() => String(B.value.footer ?? "")), q = $(() => B.value.buttons ?? []), me = $(() => B.value.products ?? []), D = $(() => B.value.cards ?? []), J = $(() => {
      const m = w.find((i) => i.value === F.value);
      return (m == null ? void 0 : m.hint) ?? "Choose the approved WhatsApp template format.";
    }), Z = $(() => {
      const m = String(B.value.template_category ?? "").trim();
      return m ? m.charAt(0).toUpperCase() + m.slice(1) : "Uncategorized";
    }), se = $(() => {
      const m = w.find((i) => i.value === F.value);
      return (m == null ? void 0 : m.label) ?? "Text";
    }), ge = $(() => B.value.template_name ? V.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), _e = $(() => new Set((v.disabledCategories ?? []).map((m) => String(m).trim()))), ee = $(() => new Set((v.disabledFormats ?? []).map((m) => String(m).trim()))), _ = $(() => {
      const m = new Set(A[te.value] ?? A.marketing);
      return w.filter((i) => m.has(i.value) && !ee.value.has(i.value));
    }), E = $(() => {
      const m = new Set(I[te.value] ?? I.marketing);
      return O.filter((i) => m.has(i.value));
    }), N = $(() => te.value === "authentication" ? 1 : Pt), ye = $(() => te.value === "authentication");
    function oe(m) {
      if (!m || typeof m != "string") return [];
      const i = /\{\{\s*([^}]+?)\s*\}\}/g, p = /* @__PURE__ */ new Set();
      let T;
      for (; (T = i.exec(m)) !== null; ) p.add(T[1].trim());
      return Array.from(p);
    }
    const R = $(() => {
      const m = v.message.header ?? "", i = v.message.body ?? v.message.body ?? "", p = new Set(v.message.variables ?? []), T = [...oe(m), ...oe(i)];
      return Array.from(new Set(T)).map((ue) => ({ name: ue, configured: p.has(ue) }));
    }), j = [
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
    ], f = $(() => {
      const m = (v.message.variables ?? []).filter(Boolean);
      return m.length ? Array.from(new Set(m)) : j;
    }), ae = de(null), ve = de(null), re = de(null), be = de("idle"), L = de(""), X = de(!1);
    function G(m) {
      var p;
      const i = m.target;
      re.value = ((p = i.files) == null ? void 0 : p[0]) ?? null, be.value = "idle", L.value = "";
    }
    function $e(m) {
      var p, T;
      X.value = !1;
      const i = ((T = (p = m.dataTransfer) == null ? void 0 : p.files) == null ? void 0 : T[0]) ?? null;
      i && (re.value = i, be.value = "idle", L.value = "");
    }
    async function he() {
      if (!(!re.value || !v.mediaUploadUrl)) {
        be.value = "uploading", L.value = "";
        try {
          const m = new FormData();
          m.append("file", re.value);
          const i = await fetch(v.mediaUploadUrl, {
            method: "POST",
            headers: v.mediaUploadHeaders ?? {},
            body: m
          });
          if (!i.ok) {
            const U = await i.text().catch(() => i.statusText);
            throw new Error(`${i.status}: ${U}`);
          }
          const p = await i.json(), T = p.mediaId ?? p.media_id ?? p.handle ?? p.id;
          if (!T) throw new Error(`No mediaId in response: ${JSON.stringify(p)}`);
          z({ media_handle: T }), be.value = "done", re.value = null, ve.value && (ve.value.value = "");
        } catch (m) {
          be.value = "error", L.value = m instanceof Error ? m.message : String(m);
        }
      }
    }
    function z(m) {
      y("update", m);
    }
    function Ie(m) {
      ae.value = ae.value === m ? null : m;
    }
    function Ue(m, i) {
      var ue;
      const p = ` {{ .${i} }}`, T = (v.message.variables ?? []).filter(Boolean), U = Array.from(/* @__PURE__ */ new Set([...T, i]));
      if (m === "header")
        z({ header: `${pe.value || ""}${p}`, variables: U });
      else if (m === "body")
        z({ body: `${V.value || ""}${p}`, variables: U });
      else if (m === "footer")
        z({ footer: `${ne.value || ""}${p}`, variables: U });
      else if (m.startsWith("btn-label:")) {
        const we = Number(m.split(":")[1]);
        Number.isFinite(we) && Re(we, { label: `${String(((ue = q.value[we]) == null ? void 0 : ue.label) ?? "")}${p}` }), z({ variables: U });
      }
      ae.value = null;
    }
    function Be(m) {
      const i = {
        template_category: m || void 0
      };
      new Set(A[m] ?? A.marketing).has(F.value) ? m === "authentication" && F.value !== "auth" && (i.template_type = "auth") : i.template_type = m === "authentication" ? "auth" : "text", m === "authentication" && (i.header_type = void 0, i.header = void 0, i.footer = void 0, i.allow_category_change = void 0, i.media_url = void 0, i.media_handle = void 0, i.media_caption = void 0, i.document_filename = void 0);
      const T = new Set(I[m] ?? I.marketing), U = q.value.filter((ue) => T.has(ue.type ?? "quick_reply"));
      U.length !== q.value.length && (i.buttons = U), z(i);
    }
    function De(m) {
      const i = { template_type: m };
      m === "auth" && (i.template_category = "authentication"), m === "image" || m === "video" || m === "document" ? i.header_type = m : (le.value === "image" || le.value === "video" || le.value === "document") && (i.header_type = "none"), z(i);
    }
    function Re(m, i) {
      var T;
      const p = [...q.value];
      p[m] = {
        ...p[m],
        id: ((T = p[m]) == null ? void 0 : T.id) || `btn_${m + 1}`,
        ...i
      }, z({ buttons: p });
    }
    function Ne(m) {
      const i = [...q.value];
      i.splice(m, 1), z({ buttons: i });
    }
    function je() {
      var p;
      if (q.value.length >= N.value) return;
      const m = ((p = E.value[0]) == null ? void 0 : p.value) ?? "quick_reply", i = [...q.value];
      i.push({ id: `btn_${i.length + 1}`, label: "", type: m }), z({ buttons: i });
    }
    function We(m, i) {
      var T;
      const p = [...me.value];
      p[m] = {
        ...p[m],
        id: ((T = p[m]) == null ? void 0 : T.id) || `prod_${m + 1}`,
        ...i
      }, z({ products: p });
    }
    function Fe(m) {
      const i = [...me.value];
      i.splice(m, 1), z({ products: i });
    }
    function Me() {
      const m = [...me.value];
      m.push({ id: `prod_${m.length + 1}`, productId: "" }), z({ products: m });
    }
    function ie(m, i) {
      var T;
      const p = [...D.value];
      p[m] = {
        ...p[m],
        id: ((T = p[m]) == null ? void 0 : T.id) || `card_${m + 1}`,
        ...i
      }, z({ cards: p });
    }
    function s(m) {
      const i = [...D.value];
      i.splice(m, 1), z({ cards: i });
    }
    function l() {
      const m = [...D.value];
      m.push({
        id: `card_${m.length + 1}`,
        headerType: "IMAGE",
        mediaId: "",
        body: "",
        sampleText: "",
        buttons: []
      }), z({ cards: m });
    }
    function k(m) {
      const i = [...D.value], p = { ...i[m] };
      p.buttons = [...p.buttons ?? [], { type: "QUICK_REPLY", label: "" }], i[m] = p, z({ cards: i });
    }
    function h(m, i) {
      const p = [...D.value], T = { ...p[m] };
      T.buttons = [...T.buttons ?? []], T.buttons.splice(i, 1), p[m] = T, z({ cards: p });
    }
    function M(m, i, p) {
      const T = [...D.value], U = { ...T[m] };
      U.buttons = [...U.buttons ?? []], U.buttons[i] = { ...U.buttons[i], ...p }, T[m] = U, z({ cards: T });
    }
    return (m, i) => (a(), n("section", Go, [
      e("div", Jo, [
        i[32] || (i[32] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        o.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: i[0] || (i[0] = (p) => m.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      i[78] || (i[78] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Qo, [
        e("span", Xo, d(Z.value), 1),
        e("span", Zo, d(se.value), 1),
        e("span", ei, d(ge.value), 1)
      ]),
      e("div", ti, [
        i[34] || (i[34] = e("label", { class: "kb-label" }, [
          K(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: B.value.template_category ?? "",
          onChange: i[1] || (i[1] = (p) => Be(p.target.value))
        }, [
          i[33] || (i[33] = e("option", { value: "" }, "Select category", -1)),
          (a(), n(P, null, W(S, (p) => e("option", {
            key: p.value,
            value: p.value,
            disabled: _e.value.has(p.value)
          }, d(p.label) + d(_e.value.has(p.value) ? " (Disabled)" : ""), 9, ni)), 64))
        ], 40, ai)
      ]),
      e("div", si, [
        e("label", li, [
          i[35] || (i[35] = K(" Functional format ", -1)),
          e("span", oi, d(J.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: F.value,
          onChange: i[2] || (i[2] = (p) => De(p.target.value))
        }, [
          (a(!0), n(P, null, W(_.value, (p) => (a(), n("option", {
            key: p.value,
            value: p.value
          }, d(p.label), 9, ri))), 128))
        ], 40, ii)
      ]),
      e("div", ui, [
        i[36] || (i[36] = e("label", { class: "kb-label" }, [
          K(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: B.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, di)
      ]),
      e("div", ci, [
        e("div", pi, [
          i[37] || (i[37] = e("label", { class: "kb-label" }, [
            K(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: B.value.template_language ?? "",
            onInput: i[3] || (i[3] = (p) => z({
              template_language: p.target.value || void 0
            }))
          }, null, 40, mi)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            i[38] || (i[38] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + d(vt) + " chars"),
              e("li", null, "Body: " + d(bt) + " chars"),
              e("li", null, "Footer: " + d(ht) + " chars"),
              e("li", null, "Buttons: up to " + d(Pt))
            ])
          ])
        ])
      ]),
      e("div", vi, [
        i[39] || (i[39] = e("label", { class: "kb-label" }, [
          K(" Vertical (use-case label) "),
          e("span", { class: "kb-helper" }, 'Describes the business use-case shown during Meta review. Required by Gupshup (e.g. "Order Updates", "Promotions", "Authentication").')
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order Updates",
          value: B.value.vertical ?? "",
          onInput: i[4] || (i[4] = (p) => z({
            vertical: p.target.value || void 0
          }))
        }, null, 40, bi)
      ]),
      e("div", hi, [
        i[42] || (i[42] = e("label", { class: "kb-label" }, "Submission options", -1)),
        e("label", yi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!B.value.enable_sample,
            onChange: i[5] || (i[5] = (p) => z({ enable_sample: p.target.checked || void 0 }))
          }, null, 40, gi),
          i[40] || (i[40] = e("span", { class: "kb-toggle-label" }, "Include sample data in Meta review", -1))
        ]),
        ye.value ? g("", !0) : (a(), n("label", fi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!B.value.allow_category_change,
            onChange: i[6] || (i[6] = (p) => z({ allow_category_change: p.target.checked || void 0 }))
          }, null, 40, ki),
          i[41] || (i[41] = e("span", { class: "kb-toggle-label" }, "Allow Meta to re-categorize this template", -1))
        ]))
      ]),
      ye.value ? g("", !0) : (a(), n("div", _i, [
        i[44] || (i[44] = e("label", { class: "kb-label" }, [
          K(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: le.value,
          onChange: i[7] || (i[7] = (p) => z({ header_type: p.target.value }))
        }, [...i[43] || (i[43] = [
          Je('<option value="none" data-v-b4100bee>No header</option><option value="text" data-v-b4100bee>Text header</option><option value="image" data-v-b4100bee>Image header</option><option value="video" data-v-b4100bee>Video header</option><option value="document" data-v-b4100bee>Document header</option>', 5)
        ])], 40, wi)
      ])),
      le.value === "text" ? (a(), n("div", $i, [
        e("label", xi, [
          i[45] || (i[45] = K(" Header text ", -1)),
          e("span", {
            class: ke(["kb-counter", { "kb-counter--warn": pe.value.length > vt }])
          }, d(pe.value.length) + "/" + d(vt), 3)
        ]),
        e("div", Ci, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: pe.value,
            onInput: i[8] || (i[8] = (p) => z({
              header: p.target.value || void 0
            }))
          }, null, 40, Si),
          e("div", Ii, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: i[9] || (i[9] = (p) => Ie("header"))
            }, "{{ .var }}"),
            ae.value === "header" ? (a(), n("div", Ti, [
              (a(!0), n(P, null, W(f.value, (p) => (a(), n("button", {
                key: `wa-header-var-${p}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (T) => Ue("header", p)
              }, d(p), 9, Ai))), 128))
            ])) : g("", !0)
          ])
        ])
      ])) : g("", !0),
      ["image", "video", "document"].includes(le.value) || ["image", "video", "document"].includes(F.value) ? (a(), n("div", Ui, [
        i[46] || (i[46] = e("label", { class: "kb-label" }, [
          K(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: B.value.media_url ?? "",
          onInput: i[10] || (i[10] = (p) => z({
            media_url: p.target.value || void 0
          }))
        }, null, 40, Ri)
      ])) : g("", !0),
      ["image", "video", "document"].includes(le.value) || ["image", "video", "document"].includes(F.value) ? (a(), n("div", Ei, [
        i[52] || (i[52] = e("label", { class: "kb-label" }, [
          K(" Media handle (exampleMedia) "),
          e("span", { class: "kb-helper" }, [
            K(" Upload Handle ID from Gupshup — required for template approval with rich media. "),
            e("strong", null, "Do not use a URL here."),
            K(" Use the uploader below to get the handle, or paste an existing one. ")
          ])
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. 6462811350485912",
          value: B.value.media_handle ?? "",
          onInput: i[11] || (i[11] = (p) => z({
            media_handle: p.target.value || void 0
          }))
        }, null, 40, Pi),
        e("div", Bi, [
          e("input", {
            ref_key: "mediaUploadFileRef",
            ref: ve,
            type: "file",
            class: "kb-mu__file-input",
            accept: "image/jpeg,image/png,video/mp4,application/pdf",
            onChange: G
          }, null, 544),
          e("div", {
            class: ke(["kb-mu__row", {
              "kb-mu__row--drag": X.value,
              "kb-mu__row--done": be.value === "done",
              "kb-mu__row--error": be.value === "error"
            }]),
            onDragover: i[16] || (i[16] = Ye((p) => X.value = !0, ["prevent"])),
            onDragleave: i[17] || (i[17] = Ye((p) => X.value = !1, ["prevent"])),
            onDrop: Ye($e, ["prevent"])
          }, [
            e("div", {
              class: "kb-mu__left",
              onClick: i[12] || (i[12] = (p) => {
                var T;
                return o.mediaUploadUrl ? (T = ve.value) == null ? void 0 : T.click() : void 0;
              })
            }, [
              be.value === "done" ? (a(), n(P, { key: 0 }, [
                i[47] || (i[47] = e("svg", {
                  class: "kb-mu__icon kb-mu__icon--ok",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  "aria-hidden": "true"
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
                i[48] || (i[48] = e("span", { class: "kb-mu__text kb-mu__text--ok" }, "Handle applied", -1))
              ], 64)) : re.value ? (a(), n(P, { key: 1 }, [
                i[49] || (i[49] = e("svg", {
                  class: "kb-mu__icon",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  "aria-hidden": "true"
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
                e("span", Li, d(re.value.name), 1),
                e("span", Oi, d((re.value.size / 1024).toFixed(0)) + " KB", 1)
              ], 64)) : (a(), n(P, { key: 2 }, [
                i[50] || (i[50] = e("svg", {
                  class: "kb-mu__icon kb-mu__icon--muted",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  "aria-hidden": "true"
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
                e("span", Ni, d(o.mediaUploadUrl ? X.value ? "Drop file" : "Click or drop · JPEG PNG MP4 PDF" : "Set mediaUploadUrl to enable uploads"), 1)
              ], 64))
            ]),
            e("div", Mi, [
              be.value === "done" ? (a(), n("button", {
                key: 0,
                type: "button",
                class: "kb-mu__btn kb-mu__btn--ghost",
                onClick: i[13] || (i[13] = (p) => {
                  be.value = "idle", re.value = null, ve.value && (ve.value.value = "");
                })
              }, " Upload another ")) : re.value ? (a(), n(P, { key: 1 }, [
                e("button", {
                  type: "button",
                  class: "kb-mu__btn kb-mu__btn--ghost",
                  onClick: i[14] || (i[14] = Ye((p) => {
                    re.value = null, be.value = "idle", L.value = "", ve.value && (ve.value.value = "");
                  }, ["stop"]))
                }, " Clear "),
                e("button", {
                  type: "button",
                  class: "kb-mu__btn kb-mu__btn--primary",
                  disabled: be.value === "uploading",
                  onClick: he
                }, [
                  be.value === "uploading" ? (a(), n("span", Di)) : g("", !0),
                  K(" " + d(be.value === "uploading" ? "Uploading…" : "Get handle"), 1)
                ], 8, Vi)
              ], 64)) : o.mediaUploadUrl ? (a(), n("button", {
                key: 2,
                type: "button",
                class: "kb-mu__btn kb-mu__btn--ghost",
                onClick: i[15] || (i[15] = (p) => {
                  var T;
                  return (T = ve.value) == null ? void 0 : T.click();
                })
              }, " Browse ")) : g("", !0)
            ])
          ], 34),
          be.value === "error" ? (a(), n("p", Wi, [
            i[51] || (i[51] = e("svg", {
              viewBox: "0 0 12 12",
              fill: "none",
              "aria-hidden": "true"
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
            K(" " + d(L.value), 1)
          ])) : g("", !0)
        ])
      ])) : g("", !0),
      le.value === "document" || F.value === "document" ? (a(), n("div", Hi, [
        i[53] || (i[53] = e("label", { class: "kb-label" }, [
          K(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: B.value.document_filename ?? "",
          onInput: i[18] || (i[18] = (p) => z({
            document_filename: p.target.value || void 0
          }))
        }, null, 40, ji)
      ])) : g("", !0),
      ["image", "video", "document"].includes(le.value) || ["image", "video", "document"].includes(F.value) ? (a(), n("div", Fi, [
        i[54] || (i[54] = e("label", { class: "kb-label" }, [
          K(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: B.value.media_caption ?? "",
          onInput: i[19] || (i[19] = (p) => z({
            media_caption: p.target.value || void 0
          }))
        }, null, 40, qi)
      ])) : g("", !0),
      F.value === "lto" ? (a(), n("div", zi, [
        i[55] || (i[55] = e("label", { class: "kb-label" }, [
          K(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: B.value.lto_expiry ?? "",
          onInput: i[20] || (i[20] = (p) => z({
            lto_expiry: p.target.value || void 0
          }))
        }, null, 40, Yi)
      ])) : g("", !0),
      F.value === "flow" ? (a(), n("div", Ki, [
        i[56] || (i[56] = e("label", { class: "kb-label" }, [
          K(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: B.value.flow_id ?? "",
          onInput: i[21] || (i[21] = (p) => z({
            flow_id: p.target.value || void 0
          }))
        }, null, 40, Gi),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: B.value.flow_cta_label ?? "",
          onInput: i[22] || (i[22] = (p) => z({
            flow_cta_label: p.target.value || void 0
          }))
        }, null, 40, Ji)
      ])) : g("", !0),
      F.value === "carousel" ? (a(), n("div", Qi, [
        e("label", { class: "kb-label" }, [
          i[57] || (i[57] = K(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "MARKETING only. Each card requires a media header (IMAGE or VIDEO), body text, and can have URL + quick-reply buttons. Max " + d(Bt) + " cards.")
        ]),
        e("div", Xi, [
          (a(!0), n(P, null, W(D.value, (p, T) => (a(), n("div", {
            key: p.id || T,
            class: "kb-carousel-card"
          }, [
            e("div", Zi, [
              e("span", er, "Card " + d(T + 1), 1),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (U) => s(Number(T))
              }, "Remove", 8, tr)
            ]),
            e("div", ar, [
              e("div", null, [
                i[59] || (i[59] = e("label", { class: "kb-label kb-label--sm" }, "Header type", -1)),
                e("select", {
                  class: "kb-select",
                  value: p.headerType ?? "IMAGE",
                  onChange: (U) => ie(Number(T), { headerType: U.target.value })
                }, [...i[58] || (i[58] = [
                  e("option", { value: "IMAGE" }, "Image", -1),
                  e("option", { value: "VIDEO" }, "Video", -1)
                ])], 40, nr)
              ]),
              e("div", null, [
                i[60] || (i[60] = e("label", { class: "kb-label kb-label--sm" }, "Media handle ID", -1)),
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "e.g. 6462811350485912",
                  value: p.mediaId ?? "",
                  onInput: (U) => ie(Number(T), { mediaId: U.target.value })
                }, null, 40, sr)
              ])
            ]),
            e("div", null, [
              i[61] || (i[61] = e("label", { class: "kb-label kb-label--sm" }, "Card body", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body text with {{1}} variables",
                value: p.body ?? "",
                onInput: (U) => ie(Number(T), { body: U.target.value })
              }, null, 40, lr)
            ]),
            e("div", null, [
              i[62] || (i[62] = e("label", { class: "kb-label kb-label--sm" }, "Sample text (body with real values for Meta approval)", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body with real values filled in",
                value: p.sampleText ?? "",
                onInput: (U) => ie(Number(T), { sampleText: U.target.value })
              }, null, 40, or)
            ]),
            e("div", ir, [
              i[64] || (i[64] = e("label", { class: "kb-label kb-label--sm" }, "Card buttons", -1)),
              (a(!0), n(P, null, W(p.buttons ?? [], (U, ue) => (a(), n("div", {
                key: ue,
                class: "kb-wa-button-row kb-wa-button-row--sm"
              }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-label",
                  placeholder: "Button label",
                  value: U.label ?? "",
                  onInput: (we) => M(Number(T), Number(ue), { label: we.target.value })
                }, null, 40, rr),
                e("select", {
                  class: "kb-select kb-select--btn-type",
                  value: U.type ?? "QUICK_REPLY",
                  onChange: (we) => M(Number(T), Number(ue), { type: we.target.value })
                }, [...i[63] || (i[63] = [
                  e("option", { value: "QUICK_REPLY" }, "Quick reply", -1),
                  e("option", { value: "URL" }, "Visit URL", -1)
                ])], 40, ur),
                U.type === "URL" ? (a(), n(P, { key: 0 }, [
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "https://example.com/shop?promo={{1}}",
                    value: U.url ?? "",
                    onInput: (we) => M(Number(T), Number(ue), { url: we.target.value })
                  }, null, 40, dr),
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "Example URL (e.g. https://example.com/shop?promo=SUMMER23)",
                    value: U.url_example ?? "",
                    onInput: (we) => M(Number(T), Number(ue), { url_example: we.target.value })
                  }, null, 40, cr)
                ], 64)) : g("", !0),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-remove",
                  onClick: (we) => h(Number(T), Number(ue))
                }, "Remove", 8, pr)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "kb-wa-btn-add",
                disabled: (p.buttons ?? []).length >= 2,
                onClick: (U) => k(Number(T))
              }, " Add button ", 8, mr)
            ])
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: D.value.length >= Bt,
            onClick: l
          }, " Add card ", 8, vr)
        ])
      ])) : g("", !0),
      ["mpm", "catalog"].includes(F.value) ? (a(), n("div", br, [
        i[65] || (i[65] = e("label", { class: "kb-label" }, [
          K(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", hr, [
          (a(!0), n(P, null, W(me.value, (p, T) => (a(), n("div", {
            key: p.id || T,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: p.productId,
              onInput: (U) => We(Number(T), { productId: U.target.value })
            }, null, 40, yr),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: p.sectionTitle,
              onInput: (U) => We(Number(T), { sectionTitle: U.target.value || void 0 })
            }, null, 40, gr),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (U) => Fe(Number(T))
            }, " Remove ", 8, fr)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: Me
          }, " Add product ")
        ])
      ])) : g("", !0),
      F.value === "auth" ? (a(), n("div", kr, [
        i[69] || (i[69] = e("label", { class: "kb-label" }, [
          K(" Authentication template "),
          e("span", { class: "kb-helper" }, "Category must be AUTHENTICATION. Only OTP buttons allowed; no media, URLs, or custom body text.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: B.value.auth_type ?? "otp",
          onChange: i[23] || (i[23] = (p) => z({
            auth_type: p.target.value
          }))
        }, [...i[66] || (i[66] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, _r),
        e("input", {
          type: "text",
          class: "kb-input",
          style: { "margin-top": "0.5rem" },
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: B.value.auth_label ?? "",
          onInput: i[24] || (i[24] = (p) => z({
            auth_label: p.target.value || void 0
          }))
        }, null, 40, wr),
        e("div", $r, [
          e("label", xr, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!B.value.add_security_recommendation,
              onChange: i[25] || (i[25] = (p) => z({ add_security_recommendation: p.target.checked || void 0 }))
            }, null, 40, Cr),
            i[67] || (i[67] = e("span", { class: "kb-toggle-label" }, "Add security recommendation (warns user not to share code)", -1))
          ]),
          e("div", Sr, [
            i[68] || (i[68] = e("label", { class: "kb-label kb-label--sm" }, "Code expiration (minutes)", -1)),
            e("input", {
              type: "number",
              class: "kb-input kb-input--sm",
              placeholder: "e.g. 10",
              min: "1",
              value: B.value.code_expiration_minutes ?? "",
              onInput: i[26] || (i[26] = (p) => {
                const T = parseInt(p.target.value, 10);
                z({ code_expiration_minutes: isNaN(T) ? void 0 : T });
              })
            }, null, 40, Ir)
          ])
        ])
      ])) : g("", !0),
      e("div", Tr, [
        e("label", Ar, [
          i[70] || (i[70] = K(" Body ", -1)),
          i[71] || (i[71] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: ke(["kb-counter", { "kb-counter--warn": V.value.length > bt }])
          }, d(V.value.length) + "/" + d(bt), 3)
        ]),
        e("div", Ur, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
            value: V.value,
            onInput: i[27] || (i[27] = (p) => z({
              body: p.target.value || void 0
            }))
          }, null, 40, Rr),
          e("div", Er, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: i[28] || (i[28] = (p) => Ie("body"))
            }, "{{ .var }}"),
            ae.value === "body" ? (a(), n("div", Pr, [
              (a(!0), n(P, null, W(f.value, (p) => (a(), n("button", {
                key: `wa-body-var-${p}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (T) => Ue("body", p)
              }, d(p), 9, Br))), 128))
            ])) : g("", !0)
          ])
        ])
      ]),
      e("div", Lr, [
        i[72] || (i[72] = e("label", { class: "kb-label" }, [
          K(" Body example (for Meta approval) "),
          e("span", { class: "kb-helper" }, "Paste the body text with placeholders replaced by real sample values. Required by Meta for template approval.")
        ], -1)),
        e("textarea", {
          class: "kb-textarea",
          rows: "3",
          placeholder: "Hi John, your order ORD-5531 has been shipped...",
          value: B.value.template_example ?? "",
          onInput: i[29] || (i[29] = (p) => z({
            template_example: p.target.value || void 0
          }))
        }, null, 40, Or)
      ]),
      R.value.length > 0 ? (a(), n("div", Nr, [
        i[73] || (i[73] = e("label", { class: "kb-label" }, "Template fields", -1)),
        i[74] || (i[74] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", Mr, [
          (a(!0), n(P, null, W(R.value, (p) => (a(), n("li", {
            key: p.name,
            class: ke(["kb-wa-field-item", { "kb-wa-field-item--ok": p.configured }])
          }, [
            e("span", Vr, d(p.name), 1),
            e("span", Dr, d(p.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : g("", !0),
      ye.value ? g("", !0) : (a(), n("div", Wr, [
        i[75] || (i[75] = e("label", { class: "kb-label" }, [
          K(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("div", Hr, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: ne.value,
            onInput: i[30] || (i[30] = (p) => z({
              footer: p.target.value || void 0
            }))
          }, null, 40, jr),
          e("div", Fr, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: i[31] || (i[31] = (p) => Ie("footer"))
            }, "{{ .var }}"),
            ae.value === "footer" ? (a(), n("div", qr, [
              (a(!0), n(P, null, W(f.value, (p) => (a(), n("button", {
                key: `wa-footer-var-${p}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (T) => Ue("footer", p)
              }, d(p), 9, zr))), 128))
            ])) : g("", !0)
          ])
        ]),
        e("div", {
          class: ke(["kb-counter kb-counter--inline", { "kb-counter--warn": ne.value.length > ht }])
        }, d(ne.value.length) + "/" + d(ht), 3)
      ])),
      V.value.trim().length > 0 ? (a(), n("div", Yr, [
        e("label", Kr, [
          i[76] || (i[76] = K(" Buttons (optional) ", -1)),
          e("span", Gr, " Available types depend on the selected category. Max " + d(N.value) + " button" + d(N.value === 1 ? "" : "s") + ". ", 1)
        ]),
        e("div", Jr, [
          (a(!0), n(P, null, W(q.value, (p, T) => (a(), n("div", {
            key: p.id || T,
            class: "kb-wa-button-row"
          }, [
            e("div", Qr, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: p.label,
                onInput: (U) => Re(Number(T), { label: U.target.value })
              }, null, 40, Xr),
              e("div", Zr, [
                e("button", {
                  type: "button",
                  class: "kb-btn-insert",
                  onClick: (U) => Ie(`btn-label:${T}`)
                }, "{{ .var }}", 8, eu),
                ae.value === `btn-label:${T}` ? (a(), n("div", tu, [
                  (a(!0), n(P, null, W(f.value, (U) => (a(), n("button", {
                    key: `wa-btn-label-var-${T}-${U}`,
                    type: "button",
                    class: "kb-var-menu-item",
                    onClick: (ue) => Ue(`btn-label:${T}`, U)
                  }, d(U), 9, au))), 128))
                ])) : g("", !0)
              ])
            ]),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: p.type ?? "quick_reply",
              onChange: (U) => Re(Number(T), { type: U.target.value })
            }, [
              (a(!0), n(P, null, W(E.value, (U) => (a(), n("option", {
                key: U.value,
                value: U.value
              }, d(U.label), 9, su))), 128))
            ], 40, nu),
            p.type === "url" ? (a(), n(P, { key: 0 }, [
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://example.com/path/{{1}}",
                value: p.url,
                onInput: (U) => Re(Number(T), { url: U.target.value || void 0 })
              }, null, 40, lu),
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "Example URL with real value (e.g. https://example.com/path/ORD-5531)",
                value: p.url_example,
                onInput: (U) => Re(Number(T), { url_example: U.target.value || void 0 })
              }, null, 40, ou)
            ], 64)) : p.type === "call" ? (a(), n("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: p.phone,
              onInput: (U) => Re(Number(T), { phone: U.target.value || void 0 })
            }, null, 40, iu)) : p.type === "copy_code" ? (a(), n("input", {
              key: 2,
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Example coupon code (e.g. SAVE30DEC)",
              value: p.example,
              onInput: (U) => Re(Number(T), { example: U.target.value || void 0 })
            }, null, 40, ru)) : p.type === "otp" ? (a(), n(P, { key: 3 }, [
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: p.otp_type ?? "COPY_CODE",
                onChange: (U) => Re(Number(T), { otp_type: U.target.value })
              }, [...i[77] || (i[77] = [
                e("option", { value: "COPY_CODE" }, "Copy code", -1),
                e("option", { value: "ONE_TAP" }, "One-tap autofill", -1)
              ])], 40, uu),
              p.otp_type === "ONE_TAP" ? (a(), n(P, { key: 0 }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Autofill button text (e.g. Tap to autofill)",
                  value: p.autofill_text,
                  onInput: (U) => Re(Number(T), { autofill_text: U.target.value || void 0 })
                }, null, 40, du),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Android package name (e.g. com.example.app)",
                  value: p.package_name,
                  onInput: (U) => Re(Number(T), { package_name: U.target.value || void 0 })
                }, null, 40, cu),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "App signature hash",
                  value: p.signature_hash,
                  onInput: (U) => Re(Number(T), { signature_hash: U.target.value || void 0 })
                }, null, 40, pu)
              ], 64)) : g("", !0)
            ], 64)) : p.type === "opt_out" ? (a(), n("span", mu, " Sends a built-in opt-out action. ")) : g("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (U) => Ne(Number(T))
            }, " Remove ", 8, vu)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: q.value.length >= N.value,
            onClick: je
          }, " Add button ", 8, bu)
        ])
      ])) : g("", !0)
    ]));
  }
}), yu = /* @__PURE__ */ Pe(hu, [["__scopeId", "data-v-b4100bee"]]), gu = { class: "wa-preview-root" }, fu = { class: "wa-device" }, ku = { class: "wa-screen" }, _u = { class: "wa-header" }, wu = { class: "wa-titleblock" }, $u = { class: "wa-title-row" }, xu = { class: "wa-title" }, Cu = { class: "wa-subtitle" }, Su = {
  key: 0,
  class: "wa-flow-shell"
}, Iu = { class: "wa-flow-header" }, Tu = { class: "wa-flow-title" }, Au = { class: "wa-flow-content" }, Uu = { class: "wa-flow-eyebrow" }, Ru = {
  key: 0,
  class: "wa-flow-products"
}, Eu = { class: "wa-flow-footer" }, Pu = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, Bu = { class: "wa-managed" }, Lu = {
  key: 1,
  class: "wa-thread"
}, Ou = { class: "wa-secure-banner" }, Nu = { class: "wa-msg wa-msg--in" }, Mu = { class: "wa-template-card" }, Vu = {
  key: 0,
  class: "wa-card-media"
}, Du = ["src"], Wu = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, Hu = ["src"], ju = { class: "wa-card-media-doc-icon" }, Fu = ["title"], qu = {
  key: 3,
  class: "wa-card-media-fallback"
}, zu = { class: "wa-card-media-tag" }, Yu = { class: "wa-card-media-sub" }, Ku = {
  key: 1,
  class: "wa-card-header-text"
}, Gu = ["innerHTML"], Ju = {
  key: 2,
  class: "wa-link-preview"
}, Qu = { class: "wa-link-preview-head" }, Xu = { class: "wa-link-preview-text" }, Zu = ["href"], ed = {
  key: 3,
  class: "wa-inline-note"
}, td = {
  key: 4,
  class: "wa-inline-note"
}, ad = {
  key: 5,
  class: "wa-inline-note"
}, nd = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, sd = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, ld = {
  key: 8,
  class: "wa-product-list"
}, od = { class: "wa-product-name" }, id = { class: "wa-product-price" }, rd = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, ud = {
  key: 10,
  class: "wa-template-actions"
}, dd = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, cd = { class: "wa-order-card" }, pd = { class: "wa-order-card-top" }, md = ["src"], vd = { type: "button" }, bd = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, hd = { class: "wa-document-card" }, yd = { class: "wa-document-file" }, gd = { class: "wa-document-icon" }, fd = ["title"], kd = { class: "wa-document-caption" }, _d = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, wd = { class: "wa-voice-card" }, $d = { class: "wa-voice-top" }, xd = { class: "wa-voice-profile" }, Cd = ["src"], Sd = { class: "wa-voice-duration" }, Id = { class: "wa-voice-transcript" }, Td = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, Ad = { class: "wa-contact-card" }, Ud = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, Rd = { class: "wa-location-card" }, Ed = { class: "wa-location-content" }, Pd = { type: "button" }, Bd = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Ld = { class: "wa-carousel-track" }, Od = { type: "button" }, Nd = { class: "wa-msg wa-msg--out" }, Md = { class: "wa-bubble wa-bubble--out" }, Vd = { class: "wa-bubble-author" }, Dd = {
  key: 0,
  class: "wa-reaction"
}, Wd = { class: "wa-msg wa-msg--in" }, Hd = { class: "wa-bubble wa-bubble--in" }, jd = /* @__PURE__ */ Ee({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(o) {
    const c = o;
    function v(_) {
      return String(_).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const y = $(() => {
      var N;
      const _ = ((N = c.template) == null ? void 0 : N.body) ?? "";
      return v(_).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), w = $(() => c.template.templateName || "Ecoshop"), S = $(() => "Business Account"), A = $(() => c.template.format === "flow" || !!c.template.flow), I = $(() => {
      var _;
      return (_ = c.template.buttons) == null ? void 0 : _[0];
    }), O = $(() => {
      var _, E;
      return ((_ = I.value) == null ? void 0 : _.text) || ((E = c.template.flow) == null ? void 0 : E.ctaLabel) || "";
    }), B = $(() => c.template.buttons ?? []), F = $(() => {
      var _;
      return (((_ = c.template.multiProduct) == null ? void 0 : _.length) ?? 0) > 0;
    }), te = $(() => (c.template.format || "text").toUpperCase()), le = $(() => {
      const _ = c.template.header;
      return !_ || _.type === "text" ? "" : _.type === "image" ? _.url || "Image" : _.type === "video" ? _.url || "Video" : _.filename || _.url || "Document";
    }), pe = $(() => {
      const _ = c.template.header;
      if (!(!_ || _.type !== "image" || !_.url))
        return { backgroundImage: `url(${_.url})` };
    });
    function V(_) {
      if (!_) return "";
      try {
        const E = _.split("?")[0].split("#")[0], N = E.substring(E.lastIndexOf("/") + 1);
        return decodeURIComponent(N || "");
      } catch {
        return "";
      }
    }
    const ne = $(() => {
      const _ = c.template.header;
      return !_ || _.type !== "document" ? "" : _.filename || V(_.url) || "document.pdf";
    }), q = $(() => {
      const _ = (c.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (_ == null ? void 0 : _[0]) || "";
    });
    function me(_) {
      try {
        return new URL(_).hostname;
      } catch {
        return "example.com";
      }
    }
    const D = $(() => {
      const _ = c.template.linkPreview;
      return !_ && !q.value ? null : {
        title: (_ == null ? void 0 : _.title) || "Link preview",
        description: (_ == null ? void 0 : _.description) || "Preview from your WhatsApp template link.",
        domain: (_ == null ? void 0 : _.domain) || (q.value ? me(q.value) : "example.com"),
        url: (_ == null ? void 0 : _.url) || q.value || "#",
        thumbnail: (_ == null ? void 0 : _.thumbnail) || ""
      };
    }), J = $(() => {
      var N, ye, oe;
      const E = (oe = (((N = c.template.documentCard) == null ? void 0 : N.filename) || ((ye = c.template.header) == null ? void 0 : ye.filename) || "").split(".").pop()) == null ? void 0 : oe.trim().toUpperCase();
      return E ? E.slice(0, 4) : "DOC";
    });
    function Z(_, E) {
      return _ === "phone_number" ? "wa-btn-icon--phone" : _ === "url" ? "wa-btn-icon--external" : _ === "copy_code" ? "wa-btn-icon--code" : _ === "opt_out" || (E || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (E || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const se = $(() => {
      var _;
      return c.template.location || c.template.locationRequest ? "wa-side-icon--info" : ((_ = c.template.header) == null ? void 0 : _.type) === "video" || c.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ge = $(() => {
      var E, N, ye;
      const _ = c.template;
      return _.format === "flow" ? "Thanks, we received your preferences." : (E = _.auth) != null && E.code ? "Use the verification code and let us know if it works." : (N = _.coupon) != null && N.code ? `Your coupon ${_.coupon.code} is active now.` : _.limitedOffer ? `Great choice. This offer is valid until ${_.limitedOffer}.` : (ye = c.template.multiProduct) != null && ye.length ? `Here are ${c.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), _e = $(() => {
      var E, N;
      const _ = c.template;
      return _.location ? _.location.name || _.location.address || `${_.location.lat}, ${_.location.lng}` : (E = _.auth) != null && E.code ? `Verification code: ${_.auth.code}` : (N = _.flow) != null && N.id ? `Flow ID: ${_.flow.id}` : _.templateLanguage ? `Template language: ${_.templateLanguage}` : `Category: ${_.templateCategory || "utility"} • Format: ${_.format || "text"}`;
    }), ee = $(() => {
      var N, ye;
      const _ = c.template;
      if ((N = _.multiProduct) != null && N.length) return _.multiProduct.slice(0, 5).map((oe) => oe.name || "Product");
      if ((ye = _.buttons) != null && ye.length) return _.buttons.slice(0, 5).map((oe) => oe.text || "Option");
      const E = (_.body || "").split(/\n|\.|,/).map((oe) => oe.trim()).filter(Boolean).slice(0, 5);
      return E.length ? E : ["Option A", "Option B", "Option C"];
    });
    return (_, E) => {
      var N, ye, oe, R, j, f, ae, ve, re, be, L, X, G, $e;
      return a(), n("div", gu, [
        e("div", fu, [
          e("div", ku, [
            E[30] || (E[30] = Je('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", _u, [
              E[7] || (E[7] = e("span", { class: "wa-back" }, "←", -1)),
              E[8] || (E[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", wu, [
                e("div", $u, [
                  e("span", xu, d(w.value), 1),
                  E[6] || (E[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Cu, d(S.value), 1)
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
            A.value ? (a(), n("div", Su, [
              E[14] || (E[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Iu, [
                E[10] || (E[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Tu, d(w.value), 1),
                E[11] || (E[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Au, [
                e("p", Uu, d(o.template.body || "Please choose an option below."), 1),
                (a(!0), n(P, null, W(ee.value, (he, z) => (a(), n("div", {
                  key: `flow-opt-${z}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, d(he), 1),
                  e("span", {
                    class: ke(["wa-radio", { "wa-radio--on": z === 0 }])
                  }, null, 2)
                ]))), 128)),
                (N = o.template.multiProduct) != null && N.length ? (a(), n("div", Ru, [
                  (a(!0), n(P, null, W(o.template.multiProduct.slice(0, 3), (he, z) => (a(), n("div", {
                    key: z,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, d(he.name || "Product"), 1),
                      e("p", null, d(he.price || "Price on request"), 1)
                    ]),
                    E[12] || (E[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : g("", !0)
              ]),
              e("div", Eu, [
                O.value ? (a(), n("button", Pu, d(O.value), 1)) : g("", !0),
                e("p", Bu, [
                  E[13] || (E[13] = K("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: E[0] || (E[0] = Ye(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), n("div", Lu, [
              E[29] || (E[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Ou, [
                E[15] || (E[15] = e("span", null, "●", -1)),
                E[16] || (E[16] = K(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: E[1] || (E[1] = Ye(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", Nu, [
                e("div", Mu, [
                  o.template.header && o.template.header.type !== "text" ? (a(), n("div", Vu, [
                    o.template.header.type === "image" && o.template.header.url ? (a(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: o.template.header.url,
                      alt: "Header media"
                    }, null, 8, Du)) : o.template.header.type === "video" && o.template.header.url ? (a(), n("div", Wu, [
                      e("video", {
                        src: o.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, Hu),
                      E[17] || (E[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : o.template.header.type === "document" ? (a(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: E[2] || (E[2] = Ye(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", ju, d(J.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ne.value
                      }, d(ne.value), 9, Fu)
                    ])) : (a(), n("div", qu, [
                      e("div", zu, d(te.value) + " TEMPLATE", 1),
                      e("div", Yu, d(le.value), 1),
                      pe.value ? (a(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: Ce(pe.value)
                      }, null, 4)) : g("", !0)
                    ]))
                  ])) : (ye = o.template.header) != null && ye.text ? (a(), n("div", Ku, d(o.template.header.text), 1)) : g("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: y.value
                  }, null, 8, Gu),
                  D.value ? (a(), n("div", Ju, [
                    e("div", Qu, [
                      D.value.thumbnail ? (a(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: Ce({ backgroundImage: `url(${D.value.thumbnail})` })
                      }, null, 4)) : g("", !0),
                      e("div", Xu, [
                        e("strong", null, d(D.value.title), 1),
                        e("p", null, d(D.value.description), 1),
                        e("span", null, d(D.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: D.value.url,
                      onClick: E[3] || (E[3] = Ye(() => {
                      }, ["prevent"]))
                    }, d(D.value.url), 9, Zu)
                  ])) : g("", !0),
                  o.template.location ? (a(), n("div", ed, " 📍 " + d(o.template.location.name || o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)) : g("", !0),
                  (oe = o.template.coupon) != null && oe.code ? (a(), n("div", td, [
                    E[18] || (E[18] = K(" Coupon: ", -1)),
                    e("strong", null, d(o.template.coupon.code), 1)
                  ])) : g("", !0),
                  (R = o.template.auth) != null && R.code ? (a(), n("div", ad, [
                    E[19] || (E[19] = K(" Verification code: ", -1)),
                    e("strong", null, d(o.template.auth.code), 1)
                  ])) : g("", !0),
                  o.template.limitedOffer ? (a(), n("div", nd, " Expires: " + d(o.template.limitedOffer), 1)) : g("", !0),
                  o.template.footer ? (a(), n("div", sd, d(o.template.footer), 1)) : g("", !0),
                  F.value ? (a(), n("div", ld, [
                    (a(!0), n(P, null, W((j = o.template.multiProduct) == null ? void 0 : j.slice(0, 4), (he, z) => (a(), n("div", {
                      key: `prod-${z}`,
                      class: "wa-product-row"
                    }, [
                      e("span", od, d(he.name || `Item ${z + 1}`), 1),
                      e("span", id, d(he.price || "-"), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  O.value ? (a(), n("button", rd, [
                    I.value ? (a(), n("span", {
                      key: 0,
                      class: ke(["wa-btn-icon", Z(I.value.type, I.value.value || I.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : g("", !0),
                    K(" " + d(O.value), 1)
                  ])) : g("", !0),
                  B.value.length > 1 ? (a(), n("div", ud, [
                    (a(!0), n(P, null, W(B.value.slice(1, 4), (he, z) => (a(), n("button", {
                      key: `action-${z}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ke(["wa-btn-icon", Z(he.type, he.value || he.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      K(" " + d(he.text), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  E[20] || (E[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ke(["wa-side-icon", se.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              o.template.orderCard ? (a(), n("div", dd, [
                e("div", cd, [
                  e("div", pd, [
                    o.template.orderCard.image ? (a(), n("img", {
                      key: 0,
                      src: o.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, md)) : g("", !0),
                    e("div", null, [
                      e("strong", null, d(o.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, d(o.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", vd, d(o.template.orderCard.buttonLabel || "View"), 1),
                  E[21] || (E[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : g("", !0),
              o.template.documentCard || ((f = o.template.header) == null ? void 0 : f.type) === "document" ? (a(), n("div", bd, [
                e("div", hd, [
                  e("div", yd, [
                    e("span", gd, d(J.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((ae = o.template.documentCard) == null ? void 0 : ae.filename) || ((ve = o.template.header) == null ? void 0 : ve.filename) || "document.pdf"
                      }, d(((re = o.template.documentCard) == null ? void 0 : re.filename) || ((be = o.template.header) == null ? void 0 : be.filename) || "document.pdf"), 9, fd),
                      e("p", null, d(((L = o.template.documentCard) == null ? void 0 : L.size) || "243 KB • html"), 1)
                    ]),
                    E[22] || (E[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", kd, d(((X = o.template.documentCard) == null ? void 0 : X.caption) || o.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : g("", !0),
              o.template.voiceNote ? (a(), n("div", _d, [
                e("div", wd, [
                  e("div", $d, [
                    E[24] || (E[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    E[25] || (E[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", xd, [
                      o.template.voiceNote.profileImage ? (a(), n("img", {
                        key: 0,
                        src: o.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Cd)) : g("", !0),
                      E[23] || (E[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Sd, d(o.template.voiceNote.duration || "0:10"), 1),
                  e("p", Id, d(o.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : g("", !0),
              o.template.contactCard ? (a(), n("div", Td, [
                e("div", Ad, [
                  e("strong", null, d(o.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, d(o.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, d(o.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, d(o.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, d(o.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : g("", !0),
              o.template.location && o.template.locationRequest ? (a(), n("div", Ud, [
                e("div", Rd, [
                  E[26] || (E[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Ed, [
                    e("strong", null, d(o.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: E[4] || (E[4] = Ye(() => {
                      }, ["prevent"]))
                    }, d(o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)
                  ]),
                  e("button", Pd, d(o.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : g("", !0),
              (G = o.template.carouselCards) != null && G.length ? (a(), n("div", Bd, [
                e("div", Ld, [
                  (a(!0), n(P, null, W(o.template.carouselCards.slice(0, 4), (he, z) => (a(), n("article", {
                    key: `c-${z}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: Ce(he.image ? { backgroundImage: `url(${he.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, d(he.title || `Card ${z + 1}`), 1),
                    e("p", null, d(he.description || "Card description"), 1),
                    e("button", Od, d(he.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : g("", !0),
              e("div", Nd, [
                e("div", Md, [
                  e("span", Vd, d(w.value), 1),
                  e("p", null, d(ge.value), 1),
                  E[27] || (E[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  o.template.reactionEmoji ? (a(), n("span", Dd, d(o.template.reactionEmoji), 1)) : g("", !0)
                ])
              ]),
              e("div", Wd, [
                e("div", Hd, [
                  e("p", null, d(_e.value), 1),
                  ($e = o.template.flow) != null && $e.id ? (a(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: E[5] || (E[5] = Ye(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + d(o.template.flow.id), 1)) : g("", !0),
                  E[28] || (E[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            E[31] || (E[31] = Je('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Fd = /* @__PURE__ */ Pe(jd, [["__scopeId", "data-v-244c945a"]]), qd = { class: "keos-whatsapp-builder" }, zd = { class: "kb-builder-top" }, Yd = { class: "kb-wa-layout" }, Kd = { class: "kb-wa-sidebar" }, Gd = {
  key: 0,
  class: "kb-wa-form"
}, Jd = { class: "kb-wa-form-head" }, Qd = { class: "kb-wa-form-head-top" }, Xd = { class: "kb-wa-health-pill" }, Zd = { class: "kb-wa-form-head-row" }, ec = ["value"], tc = { class: "kb-wa-health" }, ac = { class: "kb-wa-health-row" }, nc = { class: "kb-wa-health-value" }, sc = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, lc = { class: "kb-wa-canvas" }, oc = {
  key: 0,
  class: "kb-wa-test-banner"
}, ic = { class: "kb-wa-preview-chrome" }, rc = { class: "kb-push-preview-controls" }, uc = { class: "kb-push-preview-as" }, dc = ["value"], cc = { class: "kb-preview-status" }, pc = { class: "kb-wa-actions" }, mc = {
  key: 0,
  class: "kb-actions-note"
}, vc = { key: 0 }, bc = { class: "kb-wa-actions-right" }, hc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, yc = { class: "kb-confirm-dialog" }, gc = { class: "kb-confirm-actions" }, Lt = 60, Ot = 1024, Nt = 60, Mt = 10, Vt = 10, fc = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    const v = /* @__PURE__ */ new Set(["image", "video", "document"]), y = /* @__PURE__ */ new Set([
      "elementName",
      "languageCode",
      "category",
      "templateType",
      "content",
      "metaTemplate",
      "metaWhatsApp"
    ]);
    function w(s) {
      return s == null ? !1 : typeof s == "string" ? s.trim().length > 0 : Array.isArray(s) ? s.length > 0 : typeof s == "object" ? Object.keys(s).length > 0 : !0;
    }
    function S(s) {
      const l = {
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
        Object.entries(l).filter(([k, h]) => y.has(k) ? !0 : w(h))
      );
    }
    function A(s) {
      const l = { ...s }, k = String(l.template_type ?? "text").trim().toLowerCase(), h = String(l.header_type ?? "none").trim().toLowerCase();
      v.has(k) || v.has(h) || (l.media_url = void 0, l.media_caption = void 0, l.document_filename = void 0, l.document_size = void 0), k !== "carousel" && (l.cards = void 0), k !== "catalog" && k !== "mpm" && (l.products = void 0), k !== "flow" && (l.flow_id = void 0, l.flow_cta_label = void 0), k !== "lto" && (l.lto_expiry = void 0), k !== "auth" && (l.auth_type = void 0, l.auth_label = void 0, l.auth_code = void 0, l.otp_code = void 0), k !== "document" && h !== "document" && (l.document_filename = void 0, l.document_size = void 0), k !== "location" && (l.location = void 0);
      const m = Array.isArray(l.buttons) ? l.buttons : [];
      return l.buttons = m, l;
    }
    function I(s) {
      var we, b, r, t, Y;
      const l = [], k = s.message, h = (k.template_category ?? "").toString().trim(), M = (k.template_type ?? "text").toString(), m = (k.header_type ?? "none").toString(), i = (k.header ?? "").toString(), p = (k.body ?? "").toString(), T = (k.footer ?? "").toString(), U = Array.isArray(k.buttons) ? k.buttons : [], ue = Array.isArray(k.cards) ? k.cards : [];
      return (we = s.name) != null && we.trim() || l.push("Template name is required"), (b = k.template_name) != null && b.trim() || l.push("WhatsApp template name is required"), h || l.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), p.trim() || l.push("Body is required"), m === "text" && i.length > Lt && l.push(`Header text cannot exceed ${Lt} characters`), p.length > Ot && l.push(`Body cannot exceed ${Ot} characters`), T.length > Nt && l.push(`Footer cannot exceed ${Nt} characters`), U.length > Mt && l.push(`Buttons cannot exceed ${Mt}`), (M === "image" || M === "video" || M === "document" || m === "image" || m === "video" || m === "document") && !k.media_url && l.push("Media URL is required for rich media templates"), h === "authentication" && M !== "auth" && l.push("Authentication category must use Authentication format"), M === "auth" && !((r = k.auth_label) != null && r.trim()) && !p.includes("{{") && l.push("Authentication templates should include a code label or placeholder variable"), M === "lto" && !k.lto_expiry && l.push("Limited-time offer requires an expiry"), (M === "mpm" || M === "catalog") && !((t = k.products) != null && t.length) && l.push("Catalog and multi-product templates require at least one product"), M === "flow" && !((Y = k.flow_id) != null && Y.trim()) && l.push("WhatsApp Flow format requires a flow ID"), M === "carousel" && (ue.length ? ue.length > Vt && l.push(`Carousel supports up to ${Vt} cards`) : l.push("Carousel format requires at least one card")), l;
    }
    function O(s, l, k) {
      const h = s.message, M = String(h.template_category ?? "").trim(), m = String(h.template_type ?? "text").trim(), i = [];
      return M && l.includes(M) && i.push(`WhatsApp category "${M}" is disabled in this builder configuration`), m && k.includes(m) && i.push(`WhatsApp format "${m}" is disabled in this builder configuration`), i;
    }
    const B = o;
    function F(s) {
      if (!s) return {};
      const l = s.metaTemplate ?? s.metaWhatsApp, k = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((b) => (b == null ? void 0 : b.type) === "BODY") : void 0, h = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((b) => (b == null ? void 0 : b.type) === "FOOTER") : void 0, M = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((b) => (b == null ? void 0 : b.type) === "HEADER") : void 0, m = String(s.content ?? "").trim(), i = String(s.elementName ?? "").trim(), p = String(s.languageCode ?? "").trim(), T = String(s.category ?? "").trim().toLowerCase(), U = String(s.templateType ?? "").trim().toLowerCase(), ue = String(s.footer ?? "").trim(), we = String(s.header ?? "").trim();
      return {
        ...s,
        ...i && !s.template_name ? { template_name: i } : {},
        ...p && !s.template_language ? { template_language: p } : {},
        ...T && !s.template_category ? { template_category: T } : {},
        ...U && !s.template_type ? { template_type: U } : {},
        ...m && !s.body ? { body: m } : {},
        ...ue && !s.footer ? { footer: ue } : {},
        ...we && !s.header ? { header: we } : {},
        ...!s.body && (k != null && k.text) ? { body: String(k.text) } : {},
        ...!s.footer && (h != null && h.text) ? { footer: String(h.text) } : {},
        ...!s.header && (M != null && M.text) ? { header: String(M.text) } : {}
      };
    }
    function te(s) {
      if (!s) return s;
      const l = F(s.message);
      return { ...s, message: l };
    }
    const le = c;
    function pe(s) {
      var k;
      const l = St(s, {
        exampleData: (k = Ue.value) == null ? void 0 : k.data
      });
      return {
        ...s,
        message: S(l.payload)
      };
    }
    const {
      campaign: V,
      dirty: ne,
      customValidatorErrors: q,
      getValidationWithWarnings: me,
      update: D,
      updateMessage: J,
      undo: Z,
      redo: se,
      canUndo: ge,
      canRedo: _e,
      resetMessage: ee,
      hooks: _
    } = ut({
      initial: te(B.modelValue),
      hooks: {
        ...B.hooks,
        customValidators: async (s) => {
          var h;
          const l = [
            ...I(s),
            ...O(
              s,
              B.disabledTemplateCategories,
              B.disabledTemplateFormats
            )
          ], k = (h = B.hooks) != null && h.customValidators ? await B.hooks.customValidators(s) : [];
          return [...l, ...k];
        }
      },
      onDirty: () => le("change", pe(V.value))
    }), { lastSavedAt: E } = dt(V, { channel: "whatsapp" });
    function N(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? se() : Z());
    }
    st(() => {
      window.addEventListener("keydown", N);
    }), lt(() => {
      window.removeEventListener("keydown", N);
    }), Le(V, (s) => le("update:modelValue", pe(s)), {
      deep: !0
    });
    const ye = de(), oe = de(!0);
    async function R() {
      if (_.estimateReach)
        try {
          ye.value = await _.estimateReach(V.value.audience);
        } catch {
          ye.value = void 0;
        }
      _.canSend && (oe.value = await Promise.resolve(_.canSend()));
    }
    R(), Le(() => V.value.audience, R, { deep: !0 });
    const j = $(() => (q.value, me(ye.value))), f = $(() => j.value.blockingErrors), ae = $(() => j.value.warnings), ve = $(() => j.value.valid), re = $(() => {
      var h, M, m;
      const s = V.value.message, l = [
        !!((h = s.template_name) != null && h.trim()),
        !!((M = s.template_category) != null && M.trim()),
        !!(s.body ?? "").toString().trim(),
        !!((m = s.template_language) != null && m.trim()),
        Array.isArray(s.buttons) ? s.buttons.length > 0 : !1
      ], k = l.filter(Boolean).length;
      return Math.round(k / l.length * 100);
    }), be = $(() => re.value >= 90 ? "Production ready" : re.value >= 70 ? "Strong draft" : re.value >= 40 ? "In progress" : "Needs setup"), L = $(() => {
      const s = V.value.message;
      return !!((s.body ?? "").toString().trim() || (s.header ?? "").toString().trim() || s.media_url || s.flow_id || s.coupon_code || s.lto_expiry || s.voice_transcript || s.contact_name || s.link_title || s.order_title || Array.isArray(s.buttons) && s.buttons.length || Array.isArray(s.products) && s.products.length || Array.isArray(s.cards) && s.cards.length);
    }), X = de(""), G = de(!1), $e = de(null), he = $(
      () => new Set((B.disabledTemplateCategories ?? []).map((s) => String(s).trim().toLowerCase()))
    ), z = $(
      () => new Set((B.disabledTemplateFormats ?? []).map((s) => String(s).trim().toLowerCase()))
    ), Ie = $(
      () => vo.filter((s) => {
        var M;
        const l = ((M = s.campaign) == null ? void 0 : M.message) ?? {}, k = String(l.template_category ?? "").trim().toLowerCase(), h = String(l.template_type ?? "").trim().toLowerCase();
        return !(k && he.value.has(k) || h && z.value.has(h));
      })
    ), Ue = $(() => {
      const s = X.value;
      return s ? et.find((l) => l.id === s) ?? null : null;
    }), Be = $(() => {
      const s = V.value.message.body ?? "";
      return Ue.value ? Qe(s, Ue.value.data) : s;
    }), De = $(() => {
      const s = V.value.message.header ?? "";
      return Ue.value ? Qe(s, Ue.value.data) : s;
    }), Re = $(() => {
      var b;
      const s = V.value.message, l = s.template_type ?? "text", k = s.header_type ?? "none";
      let h, M, m, i, p, T, U;
      (l === "image" || k === "image") && s.media_url ? h = { type: "image", url: s.media_url } : (l === "video" || k === "video") && s.media_url ? h = { type: "video", url: s.media_url } : l === "document" || k === "document" ? h = {
        type: "document",
        url: s.media_url || void 0,
        filename: s.document_filename || s.media_url || "document.pdf"
      } : k === "text" && s.header ? h = { type: "text", text: De.value } : s.header && (h = { type: "text", text: De.value });
      const ue = Be.value || "Start adding content to see a live preview here.";
      if (l === "location" && s.location) {
        const r = s.location, t = r.lat ?? r.latitude, Y = r.lng ?? r.lon ?? r.longitude;
        t != null && Y != null && (M = {
          lat: t,
          lng: Y,
          name: r.name ?? r.title,
          address: r.address ?? `${t}, ${Y}`
        });
      }
      (l === "catalog" || l === "mpm") && Array.isArray(s.products) && s.products.length && (m = !0, i = s.products.map((r) => ({
        image: r.image ?? r.imageUrl,
        name: r.name ?? r.sectionTitle ?? r.title ?? "Product",
        price: r.price ?? r.productId ?? ""
      }))), l === "carousel" && Array.isArray(s.cards) && s.cards.length && (m = !0, i = s.cards.map((r) => ({
        image: r.image ?? r.media_url,
        name: r.title ?? "Card",
        price: r.button_label ?? ""
      }))), l === "coupon" && s.coupon_code && (p = { code: s.coupon_code }), l === "lto" && s.lto_expiry && (T = s.lto_expiry), l === "auth" && (U = { code: s.auth_code ?? s.otp_code ?? "123 456" });
      const we = s.buttons ?? [];
      return l === "flow" && ((b = s.flow_cta_label) != null && b.trim()) && we.push({
        label: s.flow_cta_label
      }), {
        format: l,
        templateName: s.template_name || void 0,
        templateLanguage: s.template_language || void 0,
        templateCategory: s.template_category || void 0,
        header: h,
        body: ue,
        mediaCaption: s.media_caption || void 0,
        footer: s.footer || void 0,
        buttons: we.map((r) => ({ text: r.label || "Button", type: r.type, value: r.value })),
        location: M,
        catalog: m,
        multiProduct: i,
        coupon: p,
        limitedOffer: T,
        auth: U,
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
        documentCard: s.document_filename || l === "document" || k === "document" ? {
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
        carouselCards: l === "carousel" && Array.isArray(s.cards) ? s.cards.map((r) => ({
          title: r.title || void 0,
          description: r.description || s.body || void 0,
          image: r.media_url || void 0,
          button: r.button_label || void 0
        })) : void 0,
        reactionEmoji: s.reaction_emoji || void 0,
        flow: l === "flow" ? {
          id: s.flow_id || void 0,
          ctaLabel: s.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Ne(s) {
      var h;
      const l = V.value, k = A({
        ...s.campaign.message ? s.campaign.message : l.message,
        template_name: ((h = s.campaign.message) == null ? void 0 : h.template_name) ?? s.campaign.name ?? l.name ?? void 0
      });
      D({
        ...s.campaign,
        message: k
      }), $e.value = null, G.value = !1;
    }
    function je(s) {
      const l = s.target.value;
      if (!l) return;
      const k = Ie.value.find((h) => h.id === l);
      k && (ne.value ? ($e.value = k, G.value = !0) : Ne(k), s.target.value = "");
    }
    function We(s) {
      D({
        name: s,
        message: { ...V.value.message, template_name: s || void 0 },
        tracking: { ...V.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Fe(s) {
      const l = V.value.message, k = A({
        ...l,
        ...s ?? {}
      });
      if (J(k), Object.prototype.hasOwnProperty.call(s ?? {}, "template_name")) {
        const h = String((s == null ? void 0 : s.template_name) ?? "");
        h !== V.value.name && D({
          name: h,
          tracking: {
            ...V.value.tracking ?? {},
            campaign_name: h
          }
        });
      }
    }
    Le(
      () => V.value.name,
      (s) => {
        const l = String(V.value.message.template_name ?? "");
        (s || "") !== l && J({ template_name: s || void 0 });
      },
      { immediate: !0 }
    );
    function Me(s) {
      const l = ` {{ .${s.variable} }}`, k = V.value.message.variables ?? [], h = Array.from(/* @__PURE__ */ new Set([...k, s.variable]));
      if (s.field === "title") {
        const M = V.value.message.header ?? "";
        J({
          variables: h,
          header: M + l
        });
      } else if (s.field === "footer") {
        const M = V.value.message.footer ?? "";
        J({
          variables: h,
          footer: M + l
        });
      } else {
        const M = V.value.message.body ?? "";
        J({
          variables: h,
          body: M + l
        });
      }
    }
    function ie() {
      var k;
      if (!ve.value) return;
      const s = St(V.value, {
        exampleData: (k = Ue.value) == null ? void 0 : k.data
      }), l = pe(V.value);
      le("save-gupshup-template", s.payload, s.warnings, l), le("save", l);
    }
    return (s, l) => {
      var k;
      return a(), n("div", qd, [
        e("div", zd, [
          Oe(ct, {
            "campaign-name": x(V).name,
            status: x(V).status,
            dirty: x(ne),
            "last-saved-at": x(E),
            "can-undo": x(ge),
            "can-redo": x(_e),
            "slugify-name": B.enforceSlugName,
            "onUpdate:campaignName": We,
            onUndo: x(Z),
            onRedo: x(se)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          f.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Xe).input}px`,
              padding: `${x(xe)[12]}px ${x(xe)[16]}px`,
              marginBottom: `${x(xe)[16]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (a(!0), n(P, null, W(f.value, (h) => (a(), n("li", {
                key: h.message
              }, d(h.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Yd, [
          e("aside", Kd, [
            o.disabledSections.includes("whatsapp") ? g("", !0) : (a(), n("div", Gd, [
              e("div", Jd, [
                e("div", Qd, [
                  l[6] || (l[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Xd, d(be.value), 1)
                ]),
                e("div", Zd, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: je
                  }, [
                    l[7] || (l[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, W(Ie.value, (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, ec))), 128))
                  ], 32)
                ]),
                e("div", tc, [
                  e("div", ac, [
                    l[8] || (l[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", nc, d(re.value) + "%", 1)
                  ]),
                  e("div", sc, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: Ce({ width: `${re.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(yu, {
                message: x(V).message,
                "show-reset": !0,
                "disabled-categories": o.disabledTemplateCategories,
                "disabled-formats": o.disabledTemplateFormats,
                "media-upload-url": o.mediaUploadUrl,
                "media-upload-headers": o.mediaUploadHeaders,
                onUpdate: Fe,
                onReset: l[0] || (l[0] = (h) => x(ee)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats", "media-upload-url", "media-upload-headers"]),
              Oe(Jt, {
                message: x(V).message,
                "variable-options": o.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: x(J),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", lc, [
            !o.designOnly && x(V).audience.test_mode ? (a(), n("div", oc, [...l[9] || (l[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", ic, [
              e("div", rc, [
                e("label", uc, [
                  l[11] || (l[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  He(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (h) => X.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[10] || (l[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, W(x(et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, dc))), 128))
                  ], 512), [
                    [Ke, X.value]
                  ])
                ]),
                e("div", cc, [
                  l[12] || (l[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(x(V).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: ke(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !L.value }])
              }, [
                Oe(Fd, { template: Re.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", pc, [
          ae.value.length > 0 ? (a(), n("div", mc, [
            l[13] || (l[13] = e("strong", null, "Warning:", -1)),
            K(" " + d((k = ae.value[0]) == null ? void 0 : k.message) + " ", 1),
            ae.value.length > 1 ? (a(), n("span", vc, " (+" + d(ae.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", bc, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: l[2] || (l[2] = (h) => le("duplicate", JSON.parse(JSON.stringify(x(V)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: ie
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: l[3] || (l[3] = (h) => le("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        G.value ? (a(), n("div", hc, [
          e("div", yc, [
            l[14] || (l[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[15] || (l[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", gc, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: l[4] || (l[4] = (h) => {
                  G.value = !1, $e.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: l[5] || (l[5] = (h) => $e.value && Ne($e.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Zt = /* @__PURE__ */ Pe(fc, [["__scopeId", "data-v-e830eabf"]]), kc = { class: "kb-section" }, _c = { class: "kb-section__head" }, wc = { class: "kb-field" }, $c = ["value"], xc = { class: "kb-field" }, Cc = { class: "kb-label" }, Sc = { key: 0 }, Ic = { key: 1 }, Tc = { key: 2 }, Ac = { class: "kb-field-with-var" }, Uc = ["value"], Rc = { class: "kb-var-picker-wrap" }, Ec = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Pc = ["onClick"], Bc = {
  key: 0,
  class: "kb-truncation-hint"
}, Lc = { class: "kb-field" }, Oc = { class: "kb-insert-row" }, Nc = ["value"], Mc = { class: "kb-field" }, Vc = { class: "kb-insert-row" }, Dc = /* @__PURE__ */ Ee({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: c }) {
    const v = o, y = c, w = [
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
    ], S = de(v.variableOptions && v.variableOptions.length ? [...v.variableOptions] : w), A = de(S.value[0] ?? w[0]), I = de("");
    Le(
      () => v.variableOptions,
      (J) => {
        J && J.length && (S.value = [...J], S.value.includes(A.value) || (A.value = S.value[0]));
      }
    );
    const O = $(() => v.message.body ?? ""), B = de(null), F = $(() => O.value.length), te = $(() => F.value ? F.value <= 160 ? 1 : Math.ceil(F.value / 153) : 0), le = $(() => {
      const J = F.value;
      return J <= 160 ? null : J <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function pe(J) {
      const Z = J.target.value;
      y("update", {
        sender_id: Z || void 0
      });
    }
    function V(J) {
      const Z = J.target.value;
      y("update", {
        body: Z
      });
    }
    function ne() {
      const J = A.value;
      if (!J) return;
      const Z = ` {{ .${J} }}`, se = O.value || "", ge = v.message.variables ?? [], _e = Array.from(/* @__PURE__ */ new Set([...ge, J]));
      y("update", {
        body: se + Z,
        variables: _e
      });
    }
    function q(J) {
      B.value = B.value === J ? null : J;
    }
    function me(J, Z) {
      const se = ` {{ .${Z} }}`, ge = O.value || "", _e = v.message.variables ?? [], ee = Array.from(/* @__PURE__ */ new Set([..._e, Z]));
      y("update", {
        body: ge + se,
        variables: ee
      }), B.value = null;
    }
    function D() {
      const J = I.value.trim();
      J && (S.value.includes(J) || (S.value = [...S.value, J]), A.value = J, I.value = "");
    }
    return (J, Z) => (a(), n("section", kc, [
      e("div", _c, [
        Z[4] || (Z[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        o.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: Z[0] || (Z[0] = (se) => J.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      Z[11] || (Z[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", wc, [
        Z[5] || (Z[5] = e("label", { class: "kb-label" }, [
          K(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: v.message.sender_id ?? "",
          onInput: pe
        }, null, 40, $c)
      ]),
      e("div", xc, [
        e("label", Cc, [
          Z[6] || (Z[6] = K(" Message body ", -1)),
          e("span", {
            class: ke(["kb-counter", { "kb-counter--warn": te.value > 3 }])
          }, [
            K(d(F.value) + " chars · ", 1),
            te.value === 0 ? (a(), n("span", Sc, "0 segments")) : te.value === 1 ? (a(), n("span", Ic, "1 segment")) : (a(), n("span", Tc, d(te.value) + " segments", 1))
          ], 2)
        ]),
        e("div", Ac, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: O.value,
            onInput: V
          }, null, 40, Uc),
          e("div", Rc, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: Z[1] || (Z[1] = (se) => q("body"))
            }, "{{ .var }}"),
            B.value === "body" ? (a(), n("div", Ec, [
              (a(!0), n(P, null, W(S.value, (se) => (a(), n("button", {
                key: `sms-body-var-${se}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (ge) => me("body", se)
              }, d(se), 9, Pc))), 128))
            ])) : g("", !0)
          ])
        ]),
        Z[7] || (Z[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        le.value ? (a(), n("p", Bc, d(le.value), 1)) : g("", !0)
      ]),
      e("div", Lc, [
        Z[8] || (Z[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Oc, [
          He(e("select", {
            "onUpdate:modelValue": Z[2] || (Z[2] = (se) => A.value = se),
            class: "kb-select"
          }, [
            (a(!0), n(P, null, W(S.value, (se) => (a(), n("option", {
              key: se,
              value: se
            }, d(se), 9, Nc))), 128))
          ], 512), [
            [Ke, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ne
          }, " Insert into message ")
        ]),
        Z[9] || (Z[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Mc, [
        Z[10] || (Z[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Vc, [
          He(e("input", {
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
}), Wc = /* @__PURE__ */ Pe(Dc, [["__scopeId", "data-v-68a73354"]]), Hc = { class: "keos-sms-builder" }, jc = { class: "kb-builder-top" }, Fc = { class: "kb-sms-layout" }, qc = { class: "kb-sms-sidebar" }, zc = {
  key: 0,
  class: "kb-sms-form"
}, Yc = { class: "kb-sms-form-head" }, Kc = { class: "kb-sms-form-head-top" }, Gc = { class: "kb-sms-health-pill" }, Jc = { class: "kb-wa-form-head-row" }, Qc = ["value"], Xc = { class: "kb-sms-health" }, Zc = { class: "kb-sms-health-row" }, ep = { class: "kb-sms-health-value" }, tp = { class: "kb-sms-health-bar" }, ap = { class: "kb-sms-canvas" }, np = {
  key: 0,
  class: "kb-sms-test-banner"
}, sp = { class: "kb-sms-preview-chrome" }, lp = { class: "kb-push-preview-controls" }, op = { class: "kb-push-preview-as" }, ip = ["value"], rp = { class: "kb-preview-status" }, up = { class: "kb-preview" }, dp = { class: "kb-sms-preview" }, cp = { class: "kb-sms-phone" }, pp = { class: "kb-sms-header" }, mp = { class: "kb-sms-sender-avatar" }, vp = { class: "kb-sms-header-copy" }, bp = { class: "kb-sms-sender" }, hp = { class: "kb-sms-meta" }, yp = { class: "kb-sms-thread" }, gp = {
  key: 0,
  class: "kb-sms-empty"
}, fp = { class: "kb-sms-text" }, kp = { class: "kb-sms-bubble-meta" }, _p = {
  key: 0,
  class: "kb-sms-segment-chip"
}, wp = {
  key: 0,
  class: "kb-sms-more-segments"
}, $p = { class: "kb-sms-delivery-line" }, xp = { class: "kb-sms-counter" }, Cp = { key: 0 }, Sp = { key: 1 }, Ip = { key: 2 }, Tp = {
  key: 3,
  class: "kb-sms-cost"
}, Ap = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Up = { class: "kb-sms-actions" }, Rp = {
  key: 0,
  class: "kb-actions-note"
}, Ep = { key: 0 }, Pp = { class: "kb-sms-actions-right" }, Bp = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Lp = { class: "kb-confirm-dialog" }, Op = { class: "kb-confirm-actions" }, Np = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    const v = o, y = c, {
      campaign: w,
      dirty: S,
      customValidatorErrors: A,
      getValidationWithWarnings: I,
      update: O,
      updateMessage: B,
      undo: F,
      redo: te,
      canUndo: le,
      canRedo: pe,
      resetMessage: V,
      hooks: ne
    } = ut({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (ie) => {
          var k, h;
          const s = [];
          (k = ie.name) != null && k.trim() || s.push("Template name is required");
          const l = (h = v.hooks) != null && h.customValidators ? await v.hooks.customValidators(ie) : [];
          return [...s, ...l];
        }
      },
      onDirty: () => y("change", w.value)
    }), { lastSavedAt: q } = dt(w, { channel: "sms" });
    function me(ie) {
      (ie.metaKey || ie.ctrlKey) && ie.key === "z" && (ie.preventDefault(), ie.shiftKey ? te() : F());
    }
    st(() => {
      window.addEventListener("keydown", me);
    }), lt(() => {
      window.removeEventListener("keydown", me);
    }), Le(w, (ie) => y("update:modelValue", ie), { deep: !0 });
    const D = de(), J = de(!0);
    async function Z() {
      if (ne.estimateReach)
        try {
          D.value = await ne.estimateReach(w.value.audience);
        } catch {
          D.value = void 0;
        }
      ne.canSend && (J.value = await Promise.resolve(ne.canSend()));
    }
    Z(), Le(() => w.value.audience, Z, { deep: !0 });
    const se = $(() => (A.value, I(D.value))), ge = $(() => se.value.blockingErrors), _e = $(() => se.value.warnings), ee = $(() => se.value.valid), _ = $(() => {
      var k, h, M;
      const ie = w.value.message, s = [
        !!((k = w.value.name) != null && k.trim()),
        !!((h = ie.body) != null && h.trim()),
        !!((M = ie.sender_id) != null && M.trim()),
        !!w.value.template_type,
        (ie.body ?? "").length > 20
      ], l = s.filter(Boolean).length;
      return Math.round(l / s.length * 100);
    }), E = $(() => _.value >= 90 ? "Production ready" : _.value >= 70 ? "Strong draft" : _.value >= 40 ? "In progress" : "Needs setup"), N = $(() => !!X.value.trim()), ye = $(
      () => w.value.template_type ?? "transactional"
    ), oe = de(""), R = de(!1), j = de(null), f = $(() => {
      const ie = oe.value;
      return ie ? et.find((s) => s.id === ie) ?? null : null;
    }), ae = $(() => {
      const ie = X.value;
      return f.value ? Qe(ie, f.value.data) : ie;
    });
    function ve(ie) {
      const s = w.value, l = ie.campaign.message ? { ...s.message, ...ie.campaign.message } : s.message;
      O({
        ...ie.campaign,
        message: l
      }), j.value = null, R.value = !1;
    }
    function re(ie) {
      const s = ie.target.value;
      if (!s) return;
      const l = Rt.find((k) => k.id === s);
      l && (S.value ? (j.value = l, R.value = !0) : ve(l), ie.target.value = "");
    }
    function be(ie) {
      O({ template_type: ie });
    }
    function L(ie) {
      O({
        name: ie,
        tracking: { ...w.value.tracking ?? {}, campaign_name: ie }
      });
    }
    const X = $(
      () => (w.value.message.body ?? "") || ""
    ), G = $(() => X.value.length), $e = $(() => /[^\x00-\x7f]/.test(X.value)), he = $(() => $e.value ? 70 : 160), z = $(() => $e.value ? 67 : 153), Ie = $(() => G.value ? G.value <= he.value ? 1 : Math.ceil(G.value / z.value) : 0), Ue = $(() => {
      const ie = ae.value.trim();
      if (!ie) return [];
      const s = Ie.value <= 1 ? he.value : z.value, l = [];
      for (let k = 0; k < ie.length; k += s)
        l.push(ie.slice(k, k + s));
      return l;
    }), Be = $(() => Ue.value.slice(0, 3)), De = $(
      () => Math.max(0, Ue.value.length - Be.value.length)
    ), Re = $(() => $e.value ? "Unicode" : "GSM-7"), Ne = $(() => N.value ? Ie.value > 3 ? "Queued" : "Delivered" : "Draft"), je = $(() => {
      const ie = v.costPerSegment ?? 0;
      return !ie || Ie.value === 0 ? null : (Ie.value * ie).toFixed(2);
    }), We = $(() => {
      const ie = G.value, s = he.value + z.value;
      return ie <= he.value ? null : ie <= s ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Fe = $(
      () => w.value.message.sender_id ?? "YourBrand"
    );
    function Me() {
      ee.value && y("save", w.value);
    }
    return (ie, s) => {
      var l;
      return a(), n("div", Hc, [
        e("div", jc, [
          Oe(ct, {
            "campaign-name": x(w).name,
            status: x(w).status,
            dirty: x(S),
            "last-saved-at": x(q),
            "can-undo": x(le),
            "can-redo": x(pe),
            "slugify-name": v.enforceSlugName,
            "onUpdate:campaignName": L,
            onUndo: x(F),
            onRedo: x(te)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ge.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Xe).input}px`,
              padding: `${x(xe)[12]}px ${x(xe)[16]}px`,
              marginBottom: `${x(xe)[16]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (a(!0), n(P, null, W(ge.value, (k) => (a(), n("li", {
                key: k.message
              }, d(k.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Fc, [
          e("aside", qc, [
            o.disabledSections.includes("sms") ? g("", !0) : (a(), n("div", zc, [
              e("div", Yc, [
                e("div", Kc, [
                  s[6] || (s[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", Gc, d(E.value), 1)
                ]),
                e("div", Jc, [
                  Oe(_t, {
                    "template-type": ye.value,
                    onUpdate: be
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: re
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, W(x(Rt), (k) => (a(), n("option", {
                      key: k.id,
                      value: k.id
                    }, d(k.label), 9, Qc))), 128))
                  ], 32)
                ]),
                e("div", Xc, [
                  e("div", Zc, [
                    s[8] || (s[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", ep, d(_.value) + "%", 1)
                  ]),
                  e("div", tp, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: Ce({ width: `${_.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(Wc, {
                message: x(w).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: x(B),
                onReset: s[0] || (s[0] = (k) => x(V)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", ap, [
            !o.designOnly && x(w).audience.test_mode ? (a(), n("div", np, [...s[9] || (s[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", sp, [
              e("div", lp, [
                e("label", op, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  He(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (k) => oe.value = k),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, W(x(et), (k) => (a(), n("option", {
                      key: k.id,
                      value: k.id
                    }, d(k.label), 9, ip))), 128))
                  ], 512), [
                    [Ke, oe.value]
                  ])
                ]),
                e("div", rp, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, d(Ie.value || 0), 1)
                ])
              ]),
              e("div", {
                class: ke(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !N.value }])
              }, [
                e("div", up, [
                  e("div", dp, [
                    e("div", cp, [
                      s[15] || (s[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", pp, [
                        e("div", mp, d(Fe.value.slice(0, 1).toUpperCase()), 1),
                        e("div", vp, [
                          e("div", bp, d(Fe.value), 1),
                          e("div", hp, "Text message · " + d(Ne.value), 1)
                        ])
                      ]),
                      e("div", yp, [
                        N.value ? (a(), n(P, { key: 1 }, [
                          (a(!0), n(P, null, W(Be.value, (k, h) => (a(), n("div", {
                            key: `${h}-${k.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", fp, d(k), 1),
                            e("span", kp, [
                              s[13] || (s[13] = K(" 09:21 ", -1)),
                              Be.value.length > 1 ? (a(), n("span", _p, "Part " + d(h + 1), 1)) : g("", !0)
                            ])
                          ]))), 128)),
                          De.value > 0 ? (a(), n("div", wp, " +" + d(De.value) + " more segments ", 1)) : g("", !0),
                          e("div", $p, [
                            s[14] || (s[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            K(" " + d(Ne.value), 1)
                          ])
                        ], 64)) : (a(), n("div", gp, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", xp, [
                      K(d(G.value) + " characters · ", 1),
                      Ie.value === 0 ? (a(), n("span", Cp, "0 segments")) : Ie.value === 1 ? (a(), n("span", Sp, "1 segment")) : (a(), n("span", Ip, d(Ie.value) + " segments", 1)),
                      K(" (" + d(he.value) + " chars single, " + d(z.value) + " multi-part · " + d(Re.value) + ") ", 1),
                      je.value !== null ? (a(), n("span", Tp, " · Est. " + d(je.value), 1)) : g("", !0)
                    ]),
                    We.value ? (a(), n("p", Ap, d(We.value), 1)) : g("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Up, [
          _e.value.length > 0 ? (a(), n("div", Rp, [
            s[16] || (s[16] = e("strong", null, "Warning:", -1)),
            K(" " + d((l = _e.value[0]) == null ? void 0 : l.message) + " ", 1),
            _e.value.length > 1 ? (a(), n("span", Ep, " (+" + d(_e.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Pp, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: s[2] || (s[2] = (k) => y("duplicate", JSON.parse(JSON.stringify(x(w)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Me
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: s[3] || (s[3] = (k) => y("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        R.value ? (a(), n("div", Bp, [
          e("div", Lp, [
            s[17] || (s[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[18] || (s[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Op, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: s[4] || (s[4] = (k) => {
                  R.value = !1, j.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: s[5] || (s[5] = (k) => j.value && ve(j.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), ea = /* @__PURE__ */ Pe(Np, [["__scopeId", "data-v-5e442b56"]]), Mp = 30, Vp = 60, Dp = 130;
function Wp(o) {
  const c = (o ?? "").trim().length;
  return c < Mp ? "too_short" : c <= Vp ? "good" : "too_long";
}
function Hp(o) {
  const c = (o ?? "").trim().length;
  return c === 0 ? "too_short" : c <= Dp ? "good" : "too_long";
}
const jp = [
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
function Dt(o) {
  if (!o || typeof o != "string") return [];
  const c = [];
  for (const v of jp) {
    const y = o.match(v);
    y && c.push(y[0]);
  }
  return c;
}
function Fp(o) {
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
function qp(o) {
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
const zp = { class: "em-section" }, Yp = { class: "em-strip kb-section" }, Kp = { class: "em-strip-head" }, Gp = { class: "em-field kb-field" }, Jp = { class: "em-input-group em-input-group--overlay" }, Qp = ["value"], Xp = { class: "em-var-picker-wrap" }, Zp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, em = ["onClick"], tm = { class: "em-field kb-field" }, am = ["value"], nm = { class: "em-field kb-field" }, sm = ["value"], lm = { class: "em-field kb-field" }, om = { class: "em-input-group em-input-group--overlay" }, im = ["value"], rm = { class: "em-var-picker-wrap" }, um = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, dm = ["onClick"], cm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, pm = ["onClick"], mm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, vm = { class: "em-field kb-field" }, bm = { class: "em-input-group" }, hm = ["value"], ym = { class: "em-var-picker-wrap" }, gm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, fm = ["onClick"], km = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, _m = ["onClick"], wm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, $m = { class: "em-strip kb-section em-strip--library" }, xm = { class: "em-library-chips" }, Cm = ["onClick"], Sm = { class: "em-strip kb-section em-strip--blocks" }, Im = { class: "em-block-list" }, Tm = ["data-type"], Am = { class: "em-block-bar" }, Um = { class: "em-block-type" }, Rm = { class: "em-block-actions" }, Em = ["disabled", "onClick"], Pm = ["disabled", "onClick"], Bm = ["onClick"], Lm = {
  key: 0,
  class: "em-block-fields"
}, Om = ["value", "onChange"], Nm = ["value", "onInput"], Mm = { class: "em-var-picker-wrap" }, Vm = ["onClick"], Dm = ["onClick"], Wm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Hm = ["onClick"], jm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Fm = ["onClick"], qm = {
  key: 1,
  class: "em-block-fields"
}, zm = ["value", "onInput"], Ym = { class: "em-var-picker-wrap" }, Km = ["onClick"], Gm = ["onClick"], Jm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Qm = ["onClick"], Xm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Zm = ["onClick"], ev = {
  key: 2,
  class: "em-block-fields"
}, tv = ["value", "onInput"], av = ["value", "onInput"], nv = { class: "em-var-picker-wrap" }, sv = ["onClick"], lv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ov = ["onClick"], iv = ["value", "onInput"], rv = {
  key: 3,
  class: "em-block-fields"
}, uv = ["value", "onInput"], dv = { class: "em-var-picker-wrap" }, cv = ["onClick"], pv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, mv = ["onClick"], vv = ["value", "onInput"], bv = { class: "em-block-fields--row" }, hv = ["value", "onInput"], yv = { class: "em-check-row" }, gv = ["checked", "onChange"], fv = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, kv = ["value", "onInput"], _v = {
  key: 5,
  class: "em-block-fields"
}, wv = ["value", "onInput"], $v = ["value", "onInput"], xv = ["value", "onInput"], Cv = { class: "em-var-picker-wrap" }, Sv = ["onClick"], Iv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Tv = ["onClick"], Av = { class: "em-var-picker-wrap" }, Uv = ["onClick"], Rv = ["onClick"], Ev = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Pv = ["onClick"], Bv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Lv = ["onClick"], Ov = {
  key: 6,
  class: "em-block-fields"
}, Nv = ["value", "onChange"], Mv = { class: "em-list-items" }, Vv = ["value", "onInput", "placeholder"], Dv = { class: "em-var-picker-wrap" }, Wv = ["onClick"], Hv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, jv = ["onClick"], Fv = ["onClick"], qv = ["onClick"], zv = {
  key: 7,
  class: "em-block-fields"
}, Yv = ["value", "onChange"], Kv = ["value", "onInput"], Gv = { class: "em-var-picker-wrap" }, Jv = ["onClick"], Qv = ["onClick"], Xv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Zv = ["onClick"], eb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, tb = ["onClick"], ab = {
  key: 8,
  class: "em-block-fields"
}, nb = { class: "em-social-links" }, sb = ["value", "onChange"], lb = ["value", "onInput"], ob = ["onClick"], ib = ["onClick"], rb = {
  key: 9,
  class: "em-block-fields"
}, ub = ["value", "onInput"], db = ["value", "onInput"], cb = ["value", "onInput"], pb = { class: "em-var-picker-wrap" }, mb = ["onClick"], vb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, bb = ["onClick"], hb = {
  key: 10,
  class: "em-block-fields"
}, yb = ["value", "onInput"], gb = { class: "em-link-list-items" }, fb = ["value", "onInput"], kb = { class: "em-var-picker-wrap" }, _b = ["onClick"], wb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, $b = ["onClick"], xb = ["value", "onInput"], Cb = ["onClick"], Sb = ["onClick"], Ib = {
  key: 11,
  class: "em-block-fields"
}, Tb = ["value", "onInput"], Ab = { class: "em-var-picker-wrap" }, Ub = ["onClick"], Rb = ["onClick"], Eb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Pb = ["onClick"], Bb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Lb = ["onClick"], Ob = ["value", "onInput"], Nb = { class: "em-var-picker-wrap" }, Mb = ["onClick"], Vb = ["onClick"], Db = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Wb = ["onClick"], Hb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, jb = ["onClick"], Fb = {
  key: 12,
  class: "em-block-fields"
}, qb = { class: "em-block-fields--row" }, zb = ["value", "onInput"], Yb = { class: "em-block-fields--row" }, Kb = ["value", "onInput"], Gb = ["value", "onChange"], Jb = {
  key: 13,
  class: "em-block-fields"
}, Qb = ["value", "onChange"], Xb = { class: "em-inline-label" }, Zb = ["value", "onInput"], eh = { class: "em-var-picker-wrap" }, th = ["onClick"], ah = ["onClick"], nh = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, sh = ["onClick"], lh = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, oh = ["onClick"], ih = {
  key: 14,
  class: "em-block-fields"
}, rh = ["value", "onInput"], uh = { class: "em-link-list-items" }, dh = ["value", "onInput"], ch = { class: "em-var-picker-wrap" }, ph = ["onClick"], mh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, vh = ["onClick"], bh = ["value", "onInput"], hh = ["onClick"], yh = ["onClick"], gh = {
  key: 15,
  class: "em-block-fields"
}, fh = ["value", "onInput"], kh = { class: "em-var-picker-wrap" }, _h = ["onClick"], wh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, $h = ["onClick"], xh = ["value", "onInput"], Ch = { class: "em-var-picker-wrap" }, Sh = ["onClick"], Ih = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Th = ["onClick"], Ah = ["onClick"], Uh = ["onClick"], Rh = {
  key: 16,
  class: "em-block-fields"
}, Eh = ["value", "onInput"], Ph = ["value", "onInput"], Bh = ["value", "onInput"], Lh = ["onClick"], Oh = ["onClick"], Nh = {
  key: 17,
  class: "em-block-fields"
}, Mh = ["value", "onInput"], Vh = { class: "em-var-picker-wrap" }, Dh = ["onClick"], Wh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Hh = ["onClick"], jh = ["value", "onInput"], Fh = {
  key: 18,
  class: "em-block-fields"
}, qh = ["value", "onInput"], zh = ["value", "onInput"], Yh = { class: "em-var-picker-wrap" }, Kh = ["onClick"], Gh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Jh = ["onClick"], Qh = ["value", "onInput"], Xh = { class: "em-var-picker-wrap" }, Zh = ["onClick"], ey = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ty = ["onClick"], ay = ["value", "onInput"], ny = { class: "em-var-picker-wrap" }, sy = ["onClick"], ly = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, oy = ["onClick"], iy = ["value", "onInput"], ry = {
  key: 19,
  class: "em-block-fields"
}, uy = ["value", "onInput"], dy = { class: "em-var-picker-wrap" }, cy = ["onClick"], py = ["onClick"], my = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, vy = ["onClick"], by = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, hy = ["onClick"], yy = {
  key: 20,
  class: "em-block-fields"
}, gy = ["value", "onInput"], fy = { class: "em-var-picker-wrap" }, ky = ["onClick"], _y = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, wy = ["onClick"], $y = ["value", "onInput"], xy = { class: "em-var-picker-wrap" }, Cy = ["onClick"], Sy = ["onClick"], Iy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ty = ["onClick"], Ay = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Uy = ["onClick"], Ry = {
  key: 21,
  class: "em-block-fields"
}, Ey = ["value", "onInput"], Py = { class: "em-block-fields--row" }, By = ["value", "onInput"], Ly = {
  key: 22,
  class: "em-block-fields"
}, Oy = ["value", "onInput"], Ny = ["value", "onInput"], My = { class: "em-var-picker-wrap" }, Vy = ["onClick"], Dy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Wy = ["onClick"], Hy = ["value", "onInput"], jy = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Fy = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, qy = ["onClick"], zy = ["onClick"], Yy = ["onClick"], Ky = { class: "em-check-row" }, Gy = ["checked", "onChange"], Jy = { class: "em-add-bar kb-field kb-field--add-bar" }, Qy = { class: "em-add-bar-btns" }, Xy = { class: "em-strip kb-section em-strip--personalize" }, Zy = { class: "em-field kb-field" }, eg = { class: "em-input-group" }, tg = ["value"], ag = { class: "em-field kb-field" }, ng = { class: "em-input-group" }, qe = "{{ .var }}", sg = /* @__PURE__ */ Ee({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: c }) {
    var we;
    function v() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const y = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], w = [
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
    function S(b) {
      switch (b) {
        case "heading":
          return { id: v(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: v(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: v(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: v(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: v(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: v(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: v(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: v(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: v(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: v(), type: "social", links: y.map((r) => ({ ...r })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: v(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: v(),
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
            id: v(),
            type: "columns",
            leftContent: "Left column text or {{ .variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: v(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: v(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: v(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: v(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: v(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: v(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: v(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: v(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ .order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: v(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: v(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: v(), type: "paragraph", content: "" };
      }
    }
    const A = o, I = c, O = [
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
    ], B = de(
      (we = A.variableOptions) != null && we.length ? [...A.variableOptions] : O
    ), F = de(B.value[0] ?? "first_name"), te = de("");
    Le(
      () => A.variableOptions,
      (b) => {
        b != null && b.length && (B.value = [...b], B.value.includes(F.value) || (F.value = B.value[0]));
      }
    );
    const le = $(() => A.message.subject ?? ""), pe = $(() => A.message.preview_text ?? ""), V = $(() => Wp(le.value)), ne = $(() => Hp(pe.value)), q = $(() => Dt(le.value)), me = $(() => Dt(pe.value)), D = $(() => {
      const b = A.message.blocks;
      return Array.isArray(b) && b.length > 0 ? b : [S("paragraph")];
    });
    Le(
      () => A.message.blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && I("update", { blocks: [S("paragraph")] });
      },
      { immediate: !0 }
    );
    function J(b) {
      I("update", { blocks: b });
    }
    function Z(b) {
      I("update", { subject: b.target.value });
    }
    function se(b) {
      const r = b.target.value;
      I("update", { preview_text: r || void 0 });
    }
    function ge(b) {
      I("update", { from_name: b.target.value || void 0 });
    }
    function _e(b) {
      I("update", { from_address: b.target.value || void 0 });
    }
    function ee(b) {
      I("update", { reply_to: b.target.value || void 0 });
    }
    const _ = [
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
    function E(b) {
      const r = b.blocks();
      J([...D.value, ...r]);
    }
    function N(b) {
      const r = [...D.value, S(b)];
      J(r);
    }
    function ye(b) {
      J(D.value.filter((r) => r.id !== b));
    }
    function oe(b, r) {
      const t = D.value.findIndex((C) => C.id === b);
      if (t < 0) return;
      const Y = r === "up" ? t - 1 : t + 1;
      if (Y < 0 || Y >= D.value.length) return;
      const u = [...D.value];
      [u[t], u[Y]] = [u[Y], u[t]], J(u);
    }
    function R(b, r) {
      const t = D.value.map((Y) => Y.id === b ? { ...Y, ...r } : Y);
      J(t);
    }
    function j(b, r, t) {
      const Y = D.value.find((C) => C.id === b);
      if (!Y || Y.type !== "list") return;
      const u = [...Y.items || []];
      u[r] = t, R(b, { items: u });
    }
    function f(b) {
      const r = D.value.find((t) => t.id === b);
      !r || r.type !== "list" || R(b, { items: [...r.items || [], "New item"] });
    }
    function ae(b, r) {
      const t = D.value.find((u) => u.id === b);
      if (!t || t.type !== "list") return;
      const Y = (t.items || []).filter((u, C) => C !== r);
      R(b, { items: Y });
    }
    function ve(b, r, t, Y) {
      const u = D.value.find((H) => H.id === b);
      if (!u || u.type !== "social") return;
      const C = (u.links || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      R(b, { links: C });
    }
    function re(b) {
      const r = D.value.find((t) => t.id === b);
      !r || r.type !== "social" || R(b, { links: [...r.links || [], { platform: "custom", url: "" }] });
    }
    function be(b, r) {
      const t = D.value.find((u) => u.id === b);
      if (!t || t.type !== "social") return;
      const Y = (t.links || []).filter((u, C) => C !== r);
      R(b, { links: Y });
    }
    function L(b, r, t, Y) {
      const u = D.value.find((H) => H.id === b);
      if (!u || u.type !== "link_list") return;
      const C = (u.links || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      R(b, { links: C });
    }
    function X(b) {
      const r = D.value.find((t) => t.id === b);
      !r || r.type !== "link_list" || R(b, { links: [...r.links || [], { text: "", url: "" }] });
    }
    function G(b, r) {
      const t = D.value.find((u) => u.id === b);
      if (!t || t.type !== "link_list") return;
      const Y = (t.links || []).filter((u, C) => C !== r);
      R(b, { links: Y });
    }
    function $e(b, r) {
      const t = D.value.find((Y) => Y.id === b);
      if (!(!t || t.type !== "row")) {
        if (r.columnCount !== void 0 && r.columnCount !== t.columnCount) {
          const Y = [...t.cells || []];
          for (; Y.length < r.columnCount; ) Y.push("Cell content");
          r.cells = Y.slice(0, r.columnCount);
        }
        R(b, r);
      }
    }
    function he(b, r, t) {
      const Y = D.value.find((C) => C.id === b);
      if (!Y || Y.type !== "row") return;
      const u = [...Y.cells || []];
      u[r] = t, R(b, { cells: u });
    }
    function z(b, r, t, Y) {
      const u = D.value.find((H) => H.id === b);
      if (!u || u.type !== "navbar") return;
      const C = (u.links || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      R(b, { links: C });
    }
    function Ie(b) {
      const r = D.value.find((t) => t.id === b);
      !r || r.type !== "navbar" || R(b, { links: [...r.links || [], { text: "", url: "" }] });
    }
    function Ue(b, r) {
      const t = D.value.find((Y) => Y.id === b);
      !t || t.type !== "navbar" || R(b, { links: (t.links || []).filter((Y, u) => u !== r) });
    }
    function Be(b, r, t, Y) {
      const u = D.value.find((H) => H.id === b);
      if (!u || u.type !== "accordion") return;
      const C = (u.items || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      R(b, { items: C });
    }
    function De(b) {
      const r = D.value.find((t) => t.id === b);
      !r || r.type !== "accordion" || R(b, { items: [...r.items || [], { title: "New section", content: "" }] });
    }
    function Re(b, r) {
      const t = D.value.find((Y) => Y.id === b);
      !t || t.type !== "accordion" || R(b, { items: (t.items || []).filter((Y, u) => u !== r) });
    }
    function Ne(b, r, t, Y) {
      const u = D.value.find((H) => H.id === b);
      if (!u || u.type !== "carousel") return;
      const C = (u.slides || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      R(b, { slides: C });
    }
    function je(b) {
      const r = D.value.find((t) => t.id === b);
      !r || r.type !== "carousel" || R(b, { slides: [...r.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function We(b, r) {
      const t = D.value.find((Y) => Y.id === b);
      !t || t.type !== "carousel" || R(b, { slides: (t.slides || []).filter((Y, u) => u !== r) });
    }
    function Fe(b, r = F.value) {
      const t = ` {{ .${r} }}`, Y = A.message.variables ?? [], u = Array.from(/* @__PURE__ */ new Set([...Y, r]));
      b === "subject" ? I("update", {
        subject: (le.value || "") + t,
        variables: u
      }) : I("update", {
        preview_text: (pe.value || "") + t,
        variables: u
      });
    }
    function Me(b, r = F.value) {
      const t = D.value.find((ze) => ze.id === b);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const Y = ` {{ .${r} }}`, u = A.message.variables ?? [], C = Array.from(/* @__PURE__ */ new Set([...u, r])), H = (t.type === "footer", "content"), tt = (t[H] ?? "") + Y, at = D.value.map(
        (ze) => ze.id === b ? { ...ze, [H]: tt } : ze
      );
      I("update", { blocks: at, variables: C });
    }
    function ie(b, r, t = F.value) {
      const Y = D.value.find((tt) => tt.id === b);
      if (!Y || Y.type !== "row") return;
      const u = ` {{ .${t} }}`, C = A.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...C, t])), Te = [...Y.cells || []];
      Te[r] = (Te[r] || "") + u, R(b, { cells: Te }), I("update", { variables: H });
    }
    function s(b, r, t = F.value) {
      const Y = D.value.find((ze) => ze.id === b);
      if (!Y || Y.type !== "columns") return;
      const u = ` {{ .${t} }}`, C = A.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...C, t])), Te = r === "left" ? "leftContent" : "rightContent", at = (Y[Te] ?? "") + u;
      R(b, { [Te]: at }), I("update", { variables: H });
    }
    const l = de(null), k = de(null), h = [
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
    function M(b) {
      l.value = l.value === b ? null : b;
    }
    function m(b, r) {
      if (r) {
        if (b === "subject") Fe("subject", r);
        else if (b === "preview") Fe("preview", r);
        else if (b.startsWith("block:")) Me(b.slice(6), r);
        else if (b.startsWith("col-left:")) s(b.slice(9), "left", r);
        else if (b.startsWith("col-right:")) s(b.slice(10), "right", r);
        else if (b.startsWith("row:")) {
          const [, t, Y] = b.split(":");
          ie(t, Number(Y), r);
        }
        l.value = null;
      }
    }
    function i(b) {
      k.value = k.value === b ? null : b;
    }
    function p(b, r) {
      return `${String(b ?? "")}${r}`;
    }
    function T(b, r) {
      var Y, u;
      if (!r) return;
      const t = D.value.find((C) => C.id === b);
      if (t) {
        switch (t.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            R(b, { content: `${String(t.content ?? "")}${r}` });
            break;
          case "button":
            R(b, { text: `${String(t.text ?? "")}${r}` });
            break;
          case "image":
            R(b, { alt: `${String(t.alt ?? "")}${r}` });
            break;
          case "video":
            R(b, { caption: `${String(t.caption ?? "")}${r}` });
            break;
          case "columns":
            R(b, { leftContent: `${String(t.leftContent ?? "")}${r}` });
            break;
          case "row": {
            const C = (Array.isArray(t.cells) ? [...t.cells] : []).map((H) => String(H ?? ""));
            C.length === 0 && C.push(""), C[0] = `${String(C[0] ?? "")}${r}`, R(b, { cells: C });
            break;
          }
          case "navbar":
          case "link_list": {
            const C = Array.isArray(t.links) ? [...t.links] : [];
            C.length || C.push({ text: "", url: "" }), C[0] = { ...C[0], text: `${String(((Y = C[0]) == null ? void 0 : Y.text) ?? "")}${r}` }, R(b, { links: C });
            break;
          }
          case "accordion": {
            const C = Array.isArray(t.items) ? [...t.items] : [];
            C.length || C.push({ title: "", content: "" }), C[0] = { ...C[0], title: `${String(((u = C[0]) == null ? void 0 : u.title) ?? "")}${r}` }, R(b, { items: C });
            break;
          }
          case "countdown":
            R(b, { label: `${String(t.label ?? "")}${r}` });
            break;
          case "product_card":
            R(b, { title: `${String(t.title ?? "")}${r}` });
            break;
          case "dynamic_image":
            R(b, { alt: `${String(t.alt ?? "")}${r}` });
            break;
        }
        k.value = null;
      }
    }
    function U(b, r) {
      var t, Y, u, C, H, Te, tt, at, ze;
      if (r) {
        if (b === "subject")
          I("update", { subject: p(le.value, r) });
        else if (b === "preview")
          I("update", { preview_text: p(pe.value, r) });
        else if (b === "from-name")
          I("update", { from_name: p(A.message.from_name, r) });
        else if (b.startsWith("block:")) {
          T(b.slice(6), r);
          return;
        } else if (b.startsWith("col-left:")) {
          const ce = b.slice(9), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "columns" && R(ce, { leftContent: p(Q.leftContent, r) });
        } else if (b.startsWith("col-right:")) {
          const ce = b.slice(10), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "columns" && R(ce, { rightContent: p(Q.rightContent, r) });
        } else if (b.startsWith("row:")) {
          const [, ce, Q] = b.split(":"), fe = Number(Q), Se = D.value.find((Ve) => Ve.id === ce);
          if ((Se == null ? void 0 : Se.type) === "row" && Number.isFinite(fe)) {
            const Ve = [...Se.cells || []].map((aa) => String(aa ?? ""));
            Ve[fe] = p(Ve[fe], r), R(ce, { cells: Ve });
          }
        } else if (b.startsWith("button-text:")) {
          const ce = b.slice(12), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "button" && R(ce, { text: p(Q.text, r) });
        } else if (b.startsWith("image-alt:")) {
          const ce = b.slice(10), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "image" && R(ce, { alt: p(Q.alt, r) });
        } else if (b.startsWith("video-caption:")) {
          const ce = b.slice(14), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "video" && R(ce, { caption: p(Q.caption, r) });
        } else if (b.startsWith("dynamic-alt:")) {
          const ce = b.slice(12), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "dynamic_image" && R(ce, { alt: p(Q.alt, r) });
        } else if (b.startsWith("countdown-label:")) {
          const ce = b.slice(16), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "countdown" && R(ce, { label: p(Q.label, r) });
        } else if (b.startsWith("product-title:")) {
          const ce = b.slice(14), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "product_card" && R(ce, { title: p(Q.title, r) });
        } else if (b.startsWith("product-price:")) {
          const ce = b.slice(14), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "product_card" && R(ce, { price: p(Q.price, r) });
        } else if (b.startsWith("product-button:")) {
          const ce = b.slice(15), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "product_card" && R(ce, { buttonText: p(Q.buttonText, r) });
        } else if (b.startsWith("footer-address:")) {
          const ce = b.slice(15), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "footer" && R(ce, { companyAddress: p(Q.companyAddress, r) });
        } else if (b.startsWith("code-caption:")) {
          const ce = b.slice(13), Q = D.value.find((fe) => fe.id === ce);
          (Q == null ? void 0 : Q.type) === "code_block" && R(ce, { caption: p(Q.caption, r) });
        } else if (b.startsWith("list-item:")) {
          const [, ce, Q] = b.split(":"), fe = Number(Q), Se = D.value.find((Ve) => Ve.id === ce);
          (Se == null ? void 0 : Se.type) === "list" && Number.isFinite(fe) && j(ce, fe, p((t = Se.items) == null ? void 0 : t[fe], r));
        } else if (b.startsWith("link-list-item:")) {
          const [, ce, Q] = b.split(":"), fe = Number(Q), Se = D.value.find((Ve) => Ve.id === ce);
          (Se == null ? void 0 : Se.type) === "link_list" && Number.isFinite(fe) && L(ce, fe, "text", p((u = (Y = Se.links) == null ? void 0 : Y[fe]) == null ? void 0 : u.text, r));
        } else if (b.startsWith("navbar-item:")) {
          const [, ce, Q] = b.split(":"), fe = Number(Q), Se = D.value.find((Ve) => Ve.id === ce);
          (Se == null ? void 0 : Se.type) === "navbar" && Number.isFinite(fe) && z(ce, fe, "text", p((H = (C = Se.links) == null ? void 0 : C[fe]) == null ? void 0 : H.text, r));
        } else if (b.startsWith("accordion-title:")) {
          const [, ce, Q] = b.split(":"), fe = Number(Q), Se = D.value.find((Ve) => Ve.id === ce);
          (Se == null ? void 0 : Se.type) === "accordion" && Number.isFinite(fe) && Be(ce, fe, "title", p((tt = (Te = Se.items) == null ? void 0 : Te[fe]) == null ? void 0 : tt.title, r));
        } else if (b.startsWith("accordion-content:")) {
          const [, ce, Q] = b.split(":"), fe = Number(Q), Se = D.value.find((Ve) => Ve.id === ce);
          (Se == null ? void 0 : Se.type) === "accordion" && Number.isFinite(fe) && Be(ce, fe, "content", p((ze = (at = Se.items) == null ? void 0 : at[fe]) == null ? void 0 : ze.content, r));
        }
        k.value = null;
      }
    }
    function ue() {
      const b = te.value.trim();
      !b || B.value.includes(b) || (B.value = [...B.value, b], F.value = b, te.value = "");
    }
    return (b, r) => (a(), n("section", zp, [
      e("div", Yp, [
        e("div", Kp, [
          r[31] || (r[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: r[0] || (r[0] = (t) => b.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        r[38] || (r[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Gp, [
          r[32] || (r[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", Jp, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: o.message.from_name ?? "",
              onInput: ge
            }, null, 40, Qp),
            e("div", Xp, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[1] || (r[1] = (t) => i("from-name")),
                title: "Insert emoji"
              }, "😊"),
              k.value === "from-name" ? (a(), n("div", Zp, [
                (a(), n(P, null, W(h, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => U("from-name", t)
                }, d(t), 9, em)), 64))
              ])) : g("", !0)
            ])
          ])
        ]),
        e("div", tm, [
          r[33] || (r[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: o.message.from_address ?? "",
            onInput: _e
          }, null, 40, am)
        ]),
        e("div", nm, [
          r[34] || (r[34] = e("label", { class: "em-label" }, [
            K("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: o.message.reply_to ?? "",
            onInput: ee
          }, null, 40, sm)
        ]),
        e("div", lm, [
          r[35] || (r[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", om, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: le.value,
              onInput: Z
            }, null, 40, im),
            e("div", rm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[2] || (r[2] = (t) => M("subject")),
                title: "Insert variable"
              }, d(qe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[3] || (r[3] = (t) => i("subject")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "subject" ? (a(), n("div", um, [
                (a(!0), n(P, null, W(B.value, (t) => (a(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (Y) => m("subject", t)
                }, d(t), 9, dm))), 128))
              ])) : g("", !0),
              k.value === "subject" ? (a(), n("div", cm, [
                (a(), n(P, null, W(h, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => U("subject", t)
                }, d(t), 9, pm)), 64))
              ])) : g("", !0)
            ])
          ]),
          e("span", {
            class: ke(["em-analyzer", `em-analyzer--${V.value}`])
          }, d(x(Fp)(V.value)), 3),
          q.value.length ? (a(), n("span", mm, "Spammy: " + d(q.value.join(", ")), 1)) : g("", !0)
        ]),
        e("div", vm, [
          r[36] || (r[36] = e("label", { class: "em-label" }, [
            K("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", bm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: pe.value,
              onInput: se
            }, null, 40, hm),
            e("div", ym, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[4] || (r[4] = (t) => M("preview")),
                title: "Insert variable"
              }, d(qe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[5] || (r[5] = (t) => i("preview")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "preview" ? (a(), n("div", gm, [
                (a(!0), n(P, null, W(B.value, (t) => (a(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (Y) => m("preview", t)
                }, d(t), 9, fm))), 128))
              ])) : g("", !0),
              k.value === "preview" ? (a(), n("div", km, [
                (a(), n(P, null, W(h, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => U("preview", t)
                }, d(t), 9, _m)), 64))
              ])) : g("", !0)
            ])
          ]),
          r[37] || (r[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ke(["em-analyzer", `em-analyzer--${ne.value}`])
          }, d(x(qp)(ne.value)), 3),
          me.value.length ? (a(), n("span", wm, "Spammy: " + d(me.value.join(", ")), 1)) : g("", !0)
        ])
      ]),
      e("div", $m, [
        r[39] || (r[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        r[40] || (r[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", xm, [
          (a(), n(P, null, W(_, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (Y) => E(t)
          }, d(t.label), 9, Cm)), 64))
        ])
      ]),
      e("div", Sm, [
        r[67] || (r[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        r[68] || (r[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Im, [
          (a(!0), n(P, null, W(D.value, (t, Y) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Am, [
              e("span", Um, d(t.type), 1),
              e("div", Rm, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: Y === 0,
                  onClick: (u) => oe(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Em),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: Y === D.value.length - 1,
                  onClick: (u) => oe(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Pm),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => ye(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Bm)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", Lm, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (u) => R(t.id, { level: Number(u.target.value) })
              }, [...r[41] || (r[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Om),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (u) => R(t.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, Nm),
              e("div", Mm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`block:${t.id}`)
                }, d(qe), 8, Vm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Dm),
                l.value === `block:${t.id}` ? (a(), n("div", Wm, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `block-var-heading-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`block:${t.id}`, u)
                  }, d(u), 9, Hm))), 128))
                ])) : g("", !0),
                k.value === `emoji:block:${t.id}` ? (a(), n("div", jm, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-heading-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`block:${t.id}`, u)
                  }, d(u), 9, Fm)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), n("div", qm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => R(t.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, zm),
              e("div", Ym, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`block:${t.id}`)
                }, d(qe), 8, Km),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Gm),
                l.value === `block:${t.id}` ? (a(), n("div", Jm, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `block-var-paragraph-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`block:${t.id}`, u)
                  }, d(u), 9, Qm))), 128))
                ])) : g("", !0),
                k.value === `emoji:block:${t.id}` ? (a(), n("div", Xm, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-paragraph-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`block:${t.id}`, u)
                  }, d(u), 9, Zm)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "image" ? (a(), n("div", ev, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (u) => R(t.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, tv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => R(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, av),
              e("div", nv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, sv),
                k.value === `image-alt:${t.id}` ? (a(), n("div", lv, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-image-alt-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`image-alt:${t.id}`, u)
                  }, d(u), 9, ov)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (u) => R(t.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, iv)
            ])) : t.type === "button" ? (a(), n("div", rv, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (u) => R(t.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, uv),
              e("div", dv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, cv),
                k.value === `button-text:${t.id}` ? (a(), n("div", pv, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-button-text-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`button-text:${t.id}`, u)
                  }, d(u), 9, mv)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (u) => R(t.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, vv),
              e("div", bv, [
                r[42] || (r[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (u) => R(t.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, hv)
              ]),
              e("label", yv, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (u) => R(t.id, { ghost: u.target.checked })
                }, null, 40, gv),
                r[43] || (r[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", fv, [
              r[44] || (r[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (u) => R(t.id, { height: Number(u.target.value) || 24 })
              }, null, 40, kv),
              r[45] || (r[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", _v, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => R(t.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, wv),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (u) => R(t.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, $v),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (u) => R(t.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, xv),
              e("div", Cv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Sv),
                k.value === `footer-address:${t.id}` ? (a(), n("div", Iv, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-footer-address-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`footer-address:${t.id}`, u)
                  }, d(u), 9, Tv)), 64))
                ])) : g("", !0)
              ]),
              e("div", Av, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`block:${t.id}`)
                }, d(qe), 8, Uv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Rv),
                l.value === `block:${t.id}` ? (a(), n("div", Ev, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `block-var-footer-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`block:${t.id}`, u)
                  }, d(u), 9, Pv))), 128))
                ])) : g("", !0),
                k.value === `emoji:block:${t.id}` ? (a(), n("div", Bv, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-footer-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`block:${t.id}`, u)
                  }, d(u), 9, Lv)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "list" ? (a(), n("div", Ov, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (u) => R(t.id, { style: u.target.value })
              }, [...r[46] || (r[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Nv),
              e("div", Mv, [
                (a(!0), n(P, null, W(t.items || [], (u, C) => (a(), n("div", {
                  key: C,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (H) => j(t.id, C, H.target.value),
                    placeholder: `Item ${C + 1}`
                  }, null, 40, Vv),
                  e("div", Dv, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => i(`list-item:${t.id}:${C}`),
                      title: "Insert emoji"
                    }, "😊", 8, Wv),
                    k.value === `list-item:${t.id}:${C}` ? (a(), n("div", Hv, [
                      (a(), n(P, null, W(h, (H) => e("button", {
                        key: `emoji-list-item-${t.id}-${C}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => U(`list-item:${t.id}:${C}`, H)
                      }, d(H), 9, jv)), 64))
                    ])) : g("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => ae(t.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Fv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => f(t.id)
              }, "+ Add item", 8, qv)
            ])) : t.type === "quote" ? (a(), n("div", zv, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => R(t.id, { style: u.target.value })
              }, [...r[47] || (r[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Yv),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => R(t.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Kv),
              e("div", Gv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`block:${t.id}`)
                }, d(qe), 8, Jv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Qv),
                l.value === `block:${t.id}` ? (a(), n("div", Xv, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `block-var-quote-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`block:${t.id}`, u)
                  }, d(u), 9, Zv))), 128))
                ])) : g("", !0),
                k.value === `emoji:block:${t.id}` ? (a(), n("div", eb, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-quote-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`block:${t.id}`, u)
                  }, d(u), 9, tb)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "social" ? (a(), n("div", ab, [
              e("div", nb, [
                (a(!0), n(P, null, W(t.links || [], (u, C) => (a(), n("div", {
                  key: C,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (H) => ve(t.id, C, "platform", H.target.value)
                  }, [...r[48] || (r[48] = [
                    Je('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, sb),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (H) => ve(t.id, C, "url", H.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, lb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => be(t.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, ob)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => re(t.id)
              }, "+ Add link", 8, ib)
            ])) : t.type === "video" ? (a(), n("div", rb, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (u) => R(t.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, ub),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (u) => R(t.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, db),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => R(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, cb),
              e("div", pb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, mb),
                k.value === `video-caption:${t.id}` ? (a(), n("div", vb, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-video-caption-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`video-caption:${t.id}`, u)
                  }, d(u), 9, bb)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "link_list" ? (a(), n("div", hb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => R(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, yb),
              e("div", gb, [
                (a(!0), n(P, null, W(t.links || [], (u, C) => (a(), n("div", {
                  key: C,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (H) => L(t.id, C, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, fb),
                  e("div", kb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => i(`link-list-item:${t.id}:${C}`),
                      title: "Insert emoji"
                    }, "😊", 8, _b),
                    k.value === `link-list-item:${t.id}:${C}` ? (a(), n("div", wb, [
                      (a(), n(P, null, W(h, (H) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${C}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => U(`link-list-item:${t.id}:${C}`, H)
                      }, d(H), 9, $b)), 64))
                    ])) : g("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (H) => L(t.id, C, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, xb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => G(t.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Cb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => X(t.id)
              }, "+ Add link", 8, Sb)
            ])) : t.type === "columns" ? (a(), n("div", Ib, [
              r[49] || (r[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (u) => R(t.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Tb),
              e("div", Ab, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`col-left:${t.id}`)
                }, d(qe), 8, Ub),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Rb),
                l.value === `col-left:${t.id}` ? (a(), n("div", Eb, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `col-left-var-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`col-left:${t.id}`, u)
                  }, d(u), 9, Pb))), 128))
                ])) : g("", !0),
                k.value === `emoji:col-left:${t.id}` ? (a(), n("div", Bb, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-col-left-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`col-left:${t.id}`, u)
                  }, d(u), 9, Lb)), 64))
                ])) : g("", !0)
              ]),
              r[50] || (r[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (u) => R(t.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Ob),
              e("div", Nb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`col-right:${t.id}`)
                }, d(qe), 8, Mb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Vb),
                l.value === `col-right:${t.id}` ? (a(), n("div", Db, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `col-right-var-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`col-right:${t.id}`, u)
                  }, d(u), 9, Wb))), 128))
                ])) : g("", !0),
                k.value === `emoji:col-right:${t.id}` ? (a(), n("div", Hb, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-col-right-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`col-right:${t.id}`, u)
                  }, d(u), 9, jb)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "divider" ? (a(), n("div", Fb, [
              e("div", qb, [
                r[51] || (r[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (u) => R(t.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, zb),
                r[52] || (r[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Yb, [
                r[53] || (r[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (u) => R(t.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Kb)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => R(t.id, { lineStyle: u.target.value })
              }, [...r[54] || (r[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Gb)
            ])) : t.type === "row" ? (a(), n("div", Jb, [
              r[56] || (r[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => $e(t.id, { columnCount: Number(u.target.value) })
              }, [...r[55] || (r[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Qb),
              (a(!0), n(P, null, W(t.cells || [], (u, C) => (a(), n("div", {
                key: C,
                class: "em-row-cell"
              }, [
                e("label", Xb, "Column " + d(C + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (H) => he(t.id, C, H.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Zb),
                e("div", eh, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => M(`row:${t.id}:${C}`)
                  }, d(qe), 8, th),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => i(`emoji:row:${t.id}:${C}`),
                    title: "Insert emoji"
                  }, "😊", 8, ah),
                  l.value === `row:${t.id}:${C}` ? (a(), n("div", nh, [
                    (a(!0), n(P, null, W(B.value, (H) => (a(), n("button", {
                      key: `row-var-${t.id}-${C}-${H}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (Te) => m(`row:${t.id}:${C}`, H)
                    }, d(H), 9, sh))), 128))
                  ])) : g("", !0),
                  k.value === `emoji:row:${t.id}:${C}` ? (a(), n("div", lh, [
                    (a(), n(P, null, W(h, (H) => e("button", {
                      key: `emoji-row-${t.id}-${C}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => U(`row:${t.id}:${C}`, H)
                    }, d(H), 9, oh)), 64))
                  ])) : g("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", ih, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => R(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, rh),
              e("div", uh, [
                (a(!0), n(P, null, W(t.links || [], (u, C) => (a(), n("div", {
                  key: C,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (H) => z(t.id, C, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, dh),
                  e("div", ch, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => i(`navbar-item:${t.id}:${C}`),
                      title: "Insert emoji"
                    }, "😊", 8, ph),
                    k.value === `navbar-item:${t.id}:${C}` ? (a(), n("div", mh, [
                      (a(), n(P, null, W(h, (H) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${C}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => U(`navbar-item:${t.id}:${C}`, H)
                      }, d(H), 9, vh)), 64))
                    ])) : g("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (H) => z(t.id, C, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, bh),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => Ue(t.id, C),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, hh)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Ie(t.id)
              }, "+ Add link", 8, yh)
            ])) : t.type === "accordion" ? (a(), n("div", gh, [
              (a(!0), n(P, null, W(t.items || [], (u, C) => (a(), n("div", {
                key: C,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (H) => Be(t.id, C, "title", H.target.value),
                  placeholder: "Section title"
                }, null, 40, fh),
                e("div", kh, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => i(`accordion-title:${t.id}:${C}`),
                    title: "Insert emoji"
                  }, "😊", 8, _h),
                  k.value === `accordion-title:${t.id}:${C}` ? (a(), n("div", wh, [
                    (a(), n(P, null, W(h, (H) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${C}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => U(`accordion-title:${t.id}:${C}`, H)
                    }, d(H), 9, $h)), 64))
                  ])) : g("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (H) => Be(t.id, C, "content", H.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, xh),
                e("div", Ch, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => i(`accordion-content:${t.id}:${C}`),
                    title: "Insert emoji"
                  }, "😊", 8, Sh),
                  k.value === `accordion-content:${t.id}:${C}` ? (a(), n("div", Ih, [
                    (a(), n(P, null, W(h, (H) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${C}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => U(`accordion-content:${t.id}:${C}`, H)
                    }, d(H), 9, Th)), 64))
                  ])) : g("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => Re(t.id, C),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ah)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => De(t.id)
              }, "+ Add section", 8, Uh)
            ])) : t.type === "carousel" ? (a(), n("div", Rh, [
              (a(!0), n(P, null, W(t.slides || [], (u, C) => (a(), n("div", {
                key: C,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (H) => Ne(t.id, C, "imageUrl", H.target.value),
                  placeholder: "Image URL"
                }, null, 40, Eh),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (H) => Ne(t.id, C, "alt", H.target.value),
                  placeholder: "Alt text"
                }, null, 40, Ph),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (H) => Ne(t.id, C, "linkUrl", H.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Bh),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => We(t.id, C),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Lh)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => je(t.id)
              }, "+ Add slide", 8, Oh)
            ])) : t.type === "countdown" ? (a(), n("div", Nh, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (u) => R(t.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Mh),
              e("div", Vh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Dh),
                k.value === `countdown-label:${t.id}` ? (a(), n("div", Wh, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`countdown-label:${t.id}`, u)
                  }, d(u), 9, Hh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (u) => R(t.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, jh),
              r[57] || (r[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", Fh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => R(t.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, qh),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (u) => R(t.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, zh),
              e("div", Yh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Kh),
                k.value === `product-title:${t.id}` ? (a(), n("div", Gh, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-product-title-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`product-title:${t.id}`, u)
                  }, d(u), 9, Jh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (u) => R(t.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Qh),
              e("div", Xh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Zh),
                k.value === `product-price:${t.id}` ? (a(), n("div", ey, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-product-price-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`product-price:${t.id}`, u)
                  }, d(u), 9, ty)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (u) => R(t.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, ay),
              e("div", ny, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, sy),
                k.value === `product-button:${t.id}` ? (a(), n("div", ly, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-product-button-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`product-button:${t.id}`, u)
                  }, d(u), 9, oy)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (u) => R(t.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, iy)
            ])) : t.type === "liquid" ? (a(), n("div", ry, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => R(t.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, uy),
              e("div", dy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`block:${t.id}`)
                }, d(qe), 8, cy),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, py),
                l.value === `block:${t.id}` ? (a(), n("div", my, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `block-var-liquid-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`block:${t.id}`, u)
                  }, d(u), 9, vy))), 128))
                ])) : g("", !0),
                k.value === `emoji:block:${t.id}` ? (a(), n("div", by, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-liquid-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`block:${t.id}`, u)
                  }, d(u), 9, hy)), 64))
                ])) : g("", !0)
              ]),
              r[58] || (r[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", yy, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => R(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, gy),
              e("div", fy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ky),
                k.value === `code-caption:${t.id}` ? (a(), n("div", _y, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-code-caption-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`code-caption:${t.id}`, u)
                  }, d(u), 9, wy)), 64))
                ])) : g("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => R(t.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, $y),
              e("div", xy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => M(`block:${t.id}`)
                }, d(qe), 8, Cy),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Sy),
                l.value === `block:${t.id}` ? (a(), n("div", Iy, [
                  (a(!0), n(P, null, W(B.value, (u) => (a(), n("button", {
                    key: `block-var-code-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (C) => m(`block:${t.id}`, u)
                  }, d(u), 9, Ty))), 128))
                ])) : g("", !0),
                k.value === `emoji:block:${t.id}` ? (a(), n("div", Ay, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-code-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`block:${t.id}`, u)
                  }, d(u), 9, Uy)), 64))
                ])) : g("", !0)
              ]),
              r[59] || (r[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", Ry, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (u) => R(t.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Ey),
              e("div", Py, [
                r[60] || (r[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (u) => R(t.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, By)
              ]),
              r[61] || (r[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", Ly, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => R(t.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, Oy),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => R(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, Ny),
              e("div", My, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Vy),
                k.value === `dynamic-alt:${t.id}` ? (a(), n("div", Dy, [
                  (a(), n(P, null, W(h, (u) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (C) => U(`dynamic-alt:${t.id}`, u)
                  }, d(u), 9, Wy)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (u) => R(t.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Hy)
            ])) : g("", !0),
            w.includes(t.type) ? (a(), n("div", jy, [
              e("div", Fy, [
                e("button", {
                  type: "button",
                  class: ke(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (u) => R(t.id, { alignment: "left" })
                }, [...r[62] || (r[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, qy),
                e("button", {
                  type: "button",
                  class: ke(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (u) => R(t.id, { alignment: "center" })
                }, [...r[63] || (r[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, zy),
                e("button", {
                  type: "button",
                  class: ke(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (u) => R(t.id, { alignment: "right" })
                }, [...r[64] || (r[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Yy)
              ]),
              e("label", Ky, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (u) => R(t.id, { fullWidth: u.target.checked })
                }, null, 40, Gy),
                r[65] || (r[65] = e("span", null, "Full width", -1))
              ])
            ])) : g("", !0)
          ], 8, Tm))), 128))
        ]),
        e("div", Jy, [
          r[66] || (r[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Qy, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[6] || (r[6] = (t) => N("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[7] || (r[7] = (t) => N("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[8] || (r[8] = (t) => N("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[9] || (r[9] = (t) => N("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[10] || (r[10] = (t) => N("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[11] || (r[11] = (t) => N("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[12] || (r[12] = (t) => N("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[13] || (r[13] = (t) => N("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[14] || (r[14] = (t) => N("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[15] || (r[15] = (t) => N("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[16] || (r[16] = (t) => N("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[17] || (r[17] = (t) => N("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[18] || (r[18] = (t) => N("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[19] || (r[19] = (t) => N("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[20] || (r[20] = (t) => N("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[21] || (r[21] = (t) => N("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[22] || (r[22] = (t) => N("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[23] || (r[23] = (t) => N("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[24] || (r[24] = (t) => N("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[25] || (r[25] = (t) => N("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[26] || (r[26] = (t) => N("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[27] || (r[27] = (t) => N("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: r[28] || (r[28] = (t) => N("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Xy, [
        r[71] || (r[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        r[72] || (r[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Zy, [
          r[69] || (r[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", eg, [
            He(e("select", {
              "onUpdate:modelValue": r[29] || (r[29] = (t) => F.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(P, null, W(B.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, d(t), 9, tg))), 128))
            ], 512), [
              [Ke, F.value]
            ])
          ])
        ]),
        e("div", ag, [
          r[70] || (r[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", ng, [
            He(e("input", {
              "onUpdate:modelValue": r[30] || (r[30] = (t) => te.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [it, te.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: ue
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), lg = /* @__PURE__ */ Pe(sg, [["__scopeId", "data-v-62cf50f4"]]), og = { class: "keos-email-builder" }, ig = { class: "kb-builder-top" }, rg = { class: "kb-email-layout" }, ug = { class: "kb-email-sidebar" }, dg = {
  key: 0,
  class: "kb-email-form"
}, cg = { class: "kb-email-form-head" }, pg = { class: "kb-email-form-head-top" }, mg = { class: "kb-email-health-pill" }, vg = { class: "kb-wa-form-head-row" }, bg = ["value"], hg = { class: "kb-email-health" }, yg = { class: "kb-email-health-row" }, gg = { class: "kb-email-health-value" }, fg = { class: "kb-email-health-bar" }, kg = { class: "kb-email-canvas" }, _g = {
  key: 0,
  class: "kb-email-test-banner"
}, wg = { class: "kb-email-preview-chrome" }, $g = { class: "kb-push-preview-controls" }, xg = { class: "kb-push-preview-as" }, Cg = ["value"], Sg = { class: "kb-preview-status" }, Ig = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Tg = { class: "kb-email-inbox-strip" }, Ag = { class: "kb-email-inbox-from" }, Ug = { class: "kb-email-inbox-from-name" }, Rg = { class: "kb-email-inbox-from-addr" }, Eg = { class: "kb-email-inbox-subject" }, Pg = ["title"], Bg = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Lg = { class: "kb-email-body-canvas" }, Og = ["innerHTML"], Ng = { class: "kb-email-actions" }, Mg = {
  key: 0,
  class: "kb-actions-note"
}, Vg = { key: 0 }, Dg = { class: "kb-email-actions-right" }, Wg = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Hg = { class: "kb-confirm-dialog" }, jg = { class: "kb-confirm-actions" }, Fg = /* @__PURE__ */ Ee({
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
  setup(o, { emit: c }) {
    function v(s) {
      if (!Array.isArray(s) || s.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const l = (m) => String(m).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), k = [
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
      ], h = (m, i) => {
        if (!k.includes(i.type)) return m;
        const p = i.alignment || "left", T = !!i.fullWidth;
        return `<div style="text-align:${p};${T ? "width:100%;" : ""}">${m}</div>`;
      }, M = [];
      for (const m of s)
        switch (m.type) {
          case "heading": {
            const i = Math.min(3, Math.max(1, Number(m.level) || 1)), p = l(m.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              h(
                `<h${i} style="margin:0 0 12px;font-size:${i === 1 ? "22" : i === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${p || "Heading"}</h${i}>`,
                m
              )
            );
            break;
          }
          case "paragraph": {
            const i = l(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              h(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${i || "Paragraph"}</p>`,
                m
              )
            );
            break;
          }
          case "image": {
            const i = (m.src || "").trim(), p = l(m.alt || ""), T = (m.linkUrl || "").trim(), ue = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", we = i ? `<img src="${l(i)}" alt="${p}" style="${ue}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            M.push(
              h(
                `<div style="margin:0 0 12px;">${T ? `<a href="${l(T)}" style="color:#2563eb;">${we}</a>` : we}</div>`,
                m
              )
            );
            break;
          }
          case "button": {
            const i = l(m.text || "Button"), p = (m.url || "#").trim(), T = Math.min(24, Math.max(0, Number(m.borderRadius) ?? 8)), U = !!m.fullWidth, ue = !!m.ghost, we = ue ? "transparent" : "#0f172a", b = ue ? "#0f172a" : "#fff", r = ue ? "2px solid #0f172a" : "none", t = U ? "block" : "inline-block", Y = U ? "100%" : "auto";
            M.push(
              h(
                `<p style="margin:0 0 12px;"><a href="${l(p)}" style="display:${t};width:${Y};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${we};color:${b};border:${r};text-decoration:none;font-size:14px;font-weight:600;border-radius:${T}px;overflow-wrap:anywhere;">${i}</a></p>`,
                m
              )
            );
            break;
          }
          case "divider": {
            const i = Math.min(8, Math.max(1, Number(m.thickness) || 1)), p = (m.color || "#e2e8f0").trim() || "#e2e8f0", T = m.lineStyle || "solid";
            M.push(
              h(
                `<hr style="margin:16px 0;border:0;border-top:${i}px ${T} ${p};" />`,
                m
              )
            );
            break;
          }
          case "spacer": {
            const i = Math.min(120, Math.max(8, Number(m.height) || 24));
            M.push(h(`<div style="height:${i}px;"></div>`, m));
            break;
          }
          case "footer": {
            const i = l(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), p = (m.unsubscribeUrl || "").trim(), T = l(m.companyAddress || "");
            M.push(
              h(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${i || "Footer"}` + (p ? `<p style="margin:8px 0 0;"><a href="${l(p)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (T ? `<p style="margin:4px 0 0;">${T}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "list": {
            const i = m.style === "numbered" ? "ol" : "ul", T = (Array.isArray(m.items) ? m.items : []).map(
              (U) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${l(String(U)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            M.push(
              h(
                `<${i} style="margin:0 0 12px;padding-left:24px;">${T || "<li>Item</li>"}</${i}>`,
                m
              )
            );
            break;
          }
          case "quote": {
            const i = l(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), p = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, T = p[m.style || "default"] || p.default;
            M.push(
              h(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${T}font-size:14px;line-height:1.6;">${i || "Quote"}</div>`,
                m
              )
            );
            break;
          }
          case "social": {
            const p = (Array.isArray(m.links) ? m.links : []).filter((T) => (T.url || "").trim());
            if (p.length === 0)
              M.push(
                h(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  m
                )
              );
            else {
              const T = (U) => `<a href="${l((U.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${l(U.platform || "Link")}</a>`;
              M.push(
                h(
                  `<div style="margin:0 0 12px;">${p.map(T).join("")}</div>`,
                  m
                )
              );
            }
            break;
          }
          case "video": {
            const i = (m.thumbnailUrl || "").trim(), p = (m.videoUrl || "#").trim(), T = l(m.caption || ""), ue = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", we = i ? `<img src="${l(i)}" alt="Video" style="${ue}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            M.push(
              h(
                `<div style="margin:0 0 12px;"><a href="${l(p)}" style="display:block;color:inherit;">${we}</a>` + (T ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${T}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "link_list": {
            const i = Array.isArray(m.links) ? m.links : [], p = l(m.separator || " | "), U = i.filter(
              (ue) => (ue.text || ue.url) && (ue.url || "").trim()
            ).map(
              (ue) => `<a href="${l((ue.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(ue.text || "Link")}</a>`
            );
            M.push(
              h(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${U.join(p)}</p>`,
                m
              )
            );
            break;
          }
          case "columns": {
            const i = l(m.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), p = l(m.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${i || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${p || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const i = Math.min(4, Math.max(1, Number(m.columnCount) || 2)), p = Array.isArray(m.cells) ? m.cells.slice(0, i) : [], T = 100 / i, U = Array.from({ length: i }, (ue, we) => {
              const b = p[we] ?? "", r = l(b).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${T}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${r || "—"}</td>`;
            }).join("");
            M.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${U}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const i = Array.isArray(m.links) ? m.links : [], p = l(m.separator || " | "), U = i.filter(
              (ue) => (ue.text || ue.url) && (ue.url || "").trim()
            ).map(
              (ue) => `<a href="${l((ue.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(ue.text || "Link")}</a>`
            );
            M.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${U.length ? U.join(p) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const p = (Array.isArray(m.items) ? m.items : []).map((T) => {
              const U = l(T.title || "Section"), ue = l(T.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${U}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${ue}</div></details>`;
            }).join("");
            M.push(
              p ? `<div style="margin:0 0 12px;">${p}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const p = (Array.isArray(m.slides) ? m.slides : []).filter(
              (T) => (T.imageUrl || "").trim()
            );
            if (p.length === 0)
              M.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const T = p[0], U = `<img src="${l(T.imageUrl)}" alt="${l(T.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, ue = (T.linkUrl || "").trim();
              M.push(
                `<div style="margin:0 0 12px;">${ue ? `<a href="${l(ue)}">${U}</a>` : U}` + (p.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${p.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const i = l(m.label || "Offer ends in"), p = m.endDateTime ? new Date(m.endDateTime).toLocaleString() : "—";
            M.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${i}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${p}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const i = (m.imageUrl || "").trim(), p = l(m.title || "Product"), T = l(m.price || ""), U = l(m.buttonText || "Buy now"), ue = (m.buttonUrl || "#").trim(), we = i ? `<img src="${l(i)}" alt="${l(m.alt || p)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            M.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${we}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${p}</p>` + (T ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${T}</p>` : "") + `<a href="${l(ue)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${U}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const i = l((m.content || "").trim());
            M.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${i || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const i = (m.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), p = l((m.caption || "").trim());
            M.push(
              '<div style="margin:0 0 12px;">' + (p ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${p}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${i || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const i = (m.feedUrl || "").trim(), p = Math.min(20, Math.max(1, Number(m.maxItems) ?? 5));
            M.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (i ? `<p style="margin:0;font-size:12px;color:#64748b;">${l(i)} · max ${p} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const i = (m.imageUrl || "").trim(), p = (m.fallbackUrl || "").trim(), T = l(m.alt || "Dynamic image");
            i ? M.push(
              `<div style="margin:0 0 12px;"><img src="${l(i)}" alt="${T}" style="max-width:100%;height:auto;display:block;border:0;" />` + (p ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${l(p)}</p>` : "") + "</div>"
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
    function w(s) {
      const l = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return l ? l[1] : s;
    }
    function S(s, l, k) {
      const h = (l || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), M = (k || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${h}</title>`,
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
    const A = o, I = c, {
      campaign: O,
      dirty: B,
      customValidatorErrors: F,
      getValidationWithWarnings: te,
      update: le,
      updateMessage: pe,
      undo: V,
      redo: ne,
      canUndo: q,
      canRedo: me,
      resetMessage: D,
      hooks: J
    } = ut({
      initial: A.modelValue,
      hooks: {
        ...A.hooks,
        customValidators: async (s) => {
          var M, m, i;
          const l = [];
          (M = s.name) != null && M.trim() || l.push("Template name is required");
          const k = s.message;
          (m = k == null ? void 0 : k.subject) != null && m.trim() || l.push("Subject is required");
          const h = (i = A.hooks) != null && i.customValidators ? await A.hooks.customValidators(s) : [];
          return [...l, ...h];
        }
      },
      onDirty: () => I("change", O.value)
    }), { lastSavedAt: Z } = dt(O, { channel: "email" });
    function se(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ne() : V());
    }
    st(() => {
      window.addEventListener("keydown", se);
    }), lt(() => {
      window.removeEventListener("keydown", se);
    }), Le(
      O,
      (s) => I("update:modelValue", {
        ...s,
        message: {
          ...s.message,
          html: Ne.value
        }
      }),
      { deep: !0 }
    );
    const ge = de(), _e = de(!0);
    async function ee() {
      if (J.estimateReach)
        try {
          ge.value = await J.estimateReach(O.value.audience);
        } catch {
          ge.value = void 0;
        }
      J.canSend && (_e.value = await Promise.resolve(J.canSend()));
    }
    ee(), Le(() => O.value.audience, ee, { deep: !0 });
    const _ = $(() => (F.value, te(ge.value))), E = $(() => _.value.blockingErrors), N = $(() => _.value.warnings), ye = $(() => _.value.valid), oe = $(() => {
      var h, M, m;
      const s = O.value.message, l = [
        !!((h = O.value.name) != null && h.trim()),
        !!((M = s.subject) != null && M.trim()),
        !!((m = s.from_address) != null && m.trim()),
        !!(Array.isArray(s.blocks) ? s.blocks.length : (s.html ?? "").trim().length),
        !!O.value.template_type
      ], k = l.filter(Boolean).length;
      return Math.round(k / l.length * 100);
    }), R = $(() => oe.value >= 90 ? "Production ready" : oe.value >= 70 ? "Strong draft" : oe.value >= 40 ? "In progress" : "Needs setup"), j = $(
      () => O.value.template_type ?? "transactional"
    ), f = de(""), ae = de(!1), ve = de(null), re = $(() => {
      const s = f.value;
      return s ? et.find((l) => l.id === s) ?? null : null;
    });
    function be(s) {
      const l = O.value, k = s.campaign.message ? { ...l.message, ...s.campaign.message } : l.message;
      le({
        ...s.campaign,
        message: k
      }), ve.value = null, ae.value = !1;
    }
    function L(s) {
      const l = s.target.value;
      if (!l) return;
      const k = Et.find((h) => h.id === l);
      k && (B.value ? (ve.value = k, ae.value = !0) : be(k), s.target.value = "");
    }
    function X(s) {
      le({ template_type: s });
    }
    function G(s) {
      le({
        name: s,
        tracking: { ...O.value.tracking ?? {}, campaign_name: s }
      });
    }
    const $e = $(
      () => O.value.message.subject ?? ""
    ), he = $(
      () => O.value.message.preview_text ?? ""
    ), z = $(
      () => O.value.message.html ?? ""
    ), Ie = $(
      () => O.value.message.from_name ?? "Your App"
    ), Ue = $(
      () => O.value.message.from_address ?? "notifications@example.com"
    ), Be = $(
      () => O.value.message.blocks ?? []
    ), De = $(() => {
      const s = O.value.message, l = (s.html ?? "").trim(), h = (Array.isArray(s.blocks) ? s.blocks : []).some((M) => {
        if (!M || typeof M != "object") return !1;
        const m = (M.type ?? "").toString();
        if (m === "paragraph" || m === "heading" || m === "quote" || m === "footer") {
          const i = (M.content ?? "").toString().trim();
          return !(!i || i === "Heading" || i.startsWith("Your text here."));
        }
        return m === "image" || m === "video" || m === "dynamic_image" ? !!(M.src ?? M.imageUrl ?? M.thumbnailUrl ?? "").toString().trim() : m === "button" ? !!(M.text ?? "").toString().trim() : !0;
      });
      return !!((s.subject ?? "").toString().trim() || (s.preview_text ?? "").toString().trim() || l || h);
    }), Re = $(() => {
      const s = Be.value;
      if (Array.isArray(s) && s.length > 0)
        return v(s);
      const l = z.value;
      return l && l.trim() ? y(l) ? w(l) : l : v([]);
    }), Ne = $(() => {
      const s = Be.value;
      if (Array.isArray(s) && s.length > 0)
        return S(
          v(s),
          $e.value,
          he.value
        );
      const l = z.value;
      return l && l.trim() ? y(l) ? l : S(l, $e.value, he.value) : S(
        v([]),
        $e.value,
        he.value
      );
    }), je = $(() => {
      const s = $e.value;
      return re.value ? Qe(s, re.value.data) : s;
    }), We = $(() => {
      const s = he.value;
      return re.value ? Qe(s, re.value.data) : s;
    }), Fe = $(() => {
      const s = Re.value;
      return re.value ? Qe(s, re.value.data) : s;
    }), Me = de("desktop");
    function ie() {
      ye.value && I("save", {
        ...O.value,
        message: {
          ...O.value.message,
          html: Ne.value
        }
      });
    }
    return (s, l) => {
      var k;
      return a(), n("div", og, [
        e("div", ig, [
          Oe(ct, {
            "campaign-name": x(O).name,
            status: x(O).status,
            dirty: x(B),
            "last-saved-at": x(Z),
            "can-undo": x(q),
            "can-redo": x(me),
            "slugify-name": A.enforceSlugName,
            "onUpdate:campaignName": G,
            onUndo: x(V),
            onRedo: x(ne)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          E.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: x(Ae).dangerBg,
              border: `1px solid ${x(Ae).dangerBorder}`,
              borderRadius: `${x(Xe).input}px`,
              padding: `${x(xe)[16]}px ${x(xe)[24]}px`,
              marginBottom: `${x(xe)[24]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: x(Ae).danger })
            }, [
              (a(!0), n(P, null, W(E.value, (h) => (a(), n("li", {
                key: h.message
              }, d(h.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", rg, [
          e("aside", ug, [
            o.disabledSections.includes("email") ? g("", !0) : (a(), n("div", dg, [
              e("div", cg, [
                e("div", pg, [
                  l[8] || (l[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", mg, d(R.value), 1)
                ]),
                e("div", vg, [
                  Oe(_t, {
                    "template-type": j.value,
                    onUpdate: X
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: L
                  }, [
                    l[9] || (l[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, W(x(Et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, bg))), 128))
                  ], 32)
                ]),
                e("div", hg, [
                  e("div", yg, [
                    l[10] || (l[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", gg, d(oe.value) + "%", 1)
                  ]),
                  e("div", fg, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: Ce({ width: `${oe.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(lg, {
                message: x(O).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: x(pe),
                onReset: l[0] || (l[0] = (h) => x(D)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", kg, [
            !o.designOnly && x(O).audience.test_mode ? (a(), n("div", _g, [...l[11] || (l[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", wg, [
              e("div", $g, [
                e("label", xg, [
                  l[13] || (l[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  He(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (h) => f.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[12] || (l[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, W(x(et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, Cg))), 128))
                  ], 512), [
                    [Ke, f.value]
                  ])
                ]),
                e("div", Sg, [
                  l[14] || (l[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, d(Me.value), 1)
                ])
              ]),
              e("div", Ig, [
                e("button", {
                  type: "button",
                  class: ke(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Me.value === "desktop"
                  }]),
                  onClick: l[2] || (l[2] = (h) => Me.value = "desktop")
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
                  K(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: ke(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Me.value === "mobile"
                  }]),
                  onClick: l[3] || (l[3] = (h) => Me.value = "mobile")
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
                  K(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: ke(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Me.value === "mobile",
                  "kb-email-preview-frame--empty": !De.value
                }])
              }, [
                e("div", Tg, [
                  e("div", Ag, [
                    e("span", Ug, d(Ie.value), 1),
                    e("span", Rg, "<" + d(Ue.value) + ">", 1)
                  ]),
                  e("div", Eg, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: je.value || "No subject"
                    }, d(je.value || "No subject"), 9, Pg),
                    We.value ? (a(), n("span", Bg, " — " + d(We.value), 1)) : g("", !0)
                  ])
                ]),
                e("div", Lg, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: Fe.value
                  }, null, 8, Og)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Ng, [
          N.value.length > 0 ? (a(), n("div", Mg, [
            l[17] || (l[17] = e("strong", null, "Warning:", -1)),
            K(" " + d((k = N.value[0]) == null ? void 0 : k.message) + " ", 1),
            N.value.length > 1 ? (a(), n("span", Vg, " (+" + d(N.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Dg, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: l[4] || (l[4] = (h) => I("duplicate", JSON.parse(JSON.stringify(x(O)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: ie
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: l[5] || (l[5] = (h) => I("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        ae.value ? (a(), n("div", Wg, [
          e("div", Hg, [
            l[18] || (l[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[19] || (l[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", jg, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: l[6] || (l[6] = (h) => {
                  ae.value = !1, ve.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: l[7] || (l[7] = (h) => ve.value && be(ve.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), ta = /* @__PURE__ */ Pe(Fg, [["__scopeId", "data-v-f45fc2a3"]]), qg = { class: "kb-shell" }, zg = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Yg = ["aria-selected", "onClick"], Kg = { class: "kb-shell__meta" }, Gg = ["href"], Jg = { class: "kb-shell__body" }, Qg = /* @__PURE__ */ Ee({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(o, { emit: c }) {
    const v = c, y = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (w, S) => (a(), n("div", qg, [
      e("header", {
        class: "kb-shell__header",
        style: Ce({ padding: `${x(xe)[12]}px ${x(xe)[24]}px`, borderBottom: `1px solid ${x(Ae).neutral.border}`, background: x(Ae).neutral.bg })
      }, [
        S[0] || (S[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", zg, [
          (a(), n(P, null, W(y, (A) => e("button", {
            key: A.id,
            type: "button",
            class: ke(["kb-shell__channel", { "kb-shell__channel--active": o.channel === A.id }]),
            role: "tab",
            "aria-selected": o.channel === A.id,
            onClick: (I) => v("switch-channel", A.id)
          }, d(A.label), 11, Yg)), 64))
        ]),
        e("div", Kg, [
          o.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: Ce({ padding: "2px 8px", borderRadius: `${x(Xe).input}px`, fontSize: "0.75rem", background: x(Ae).neutral.bg, color: x(Ae).neutral.textMuted })
          }, d(o.environment), 5)) : g("", !0),
          o.helpUrl ? (a(), n("a", {
            key: 1,
            href: o.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: Ce({ color: x(Ae).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Gg)) : g("", !0)
        ])
      ], 4),
      e("div", Jg, [
        Ge(w.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Xg = /* @__PURE__ */ Pe(Qg, [["__scopeId", "data-v-0df30803"]]), Zg = {
  class: "kb-outline",
  "aria-label": "Sections"
}, ef = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, tf = ["onClick"], af = /* @__PURE__ */ Ee({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(o) {
    var S;
    const c = o, v = de(((S = c.items[0]) == null ? void 0 : S.id) ?? "");
    let y = null;
    function w(A) {
      const I = document.getElementById(A);
      I && I.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return st(() => {
      const A = c.scrollContainerId ? document.getElementById(c.scrollContainerId) : document;
      A && (y = new IntersectionObserver(
        (I) => {
          for (const O of I)
            if (O.isIntersecting) {
              const B = O.target.getAttribute("data-outline-id");
              B && (v.value = B);
            }
        },
        { root: A === document ? null : A, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), c.items.forEach((I) => {
        const O = document.getElementById(I.id);
        O && (y == null || y.observe(O));
      }));
    }), lt(() => {
      y == null || y.disconnect();
    }), Le(
      () => c.items,
      (A) => {
        A.length && !v.value && (v.value = A[0].id);
      },
      { immediate: !0 }
    ), (A, I) => (a(), n("nav", Zg, [
      e("ul", ef, [
        (a(!0), n(P, null, W(o.items, (O) => (a(), n("li", {
          key: O.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ke(["kb-outline__btn", { "kb-outline__btn--active": v.value === O.id }]),
            style: Ce({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${x(xe)[8]}px ${x(xe)[12]}px`,
              border: "none",
              borderRadius: `${x(Xe).input}px`,
              background: v.value === O.id ? x(Ae).neutral.bg : "transparent",
              color: v.value === O.id ? "#0f172a" : x(Ae).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: v.value === O.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (B) => w(O.id)
          }, d(O.label), 15, tf)
        ]))), 128))
      ])
    ]));
  }
}), nf = /* @__PURE__ */ Pe(af, [["__scopeId", "data-v-25c37675"]]), sf = ["id"], lf = {
  key: 1,
  class: "kb-form-shell__head"
}, of = /* @__PURE__ */ Ee({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(o) {
    return (c, v) => (a(), n("div", {
      class: "kb-form-shell",
      id: o.sectionId ?? void 0,
      style: Ce({
        padding: `${x(xe)[24]}px ${x(xe)[24]}px ${x(xe)[32]}px`,
        marginBottom: 0
      })
    }, [
      o.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: Ce({ marginBottom: x(xe)[24], paddingBottom: x(xe)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: Ce({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: x(xe)[12] })
        }, d(o.label), 5),
        Ge(c.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", lf, [
        Ge(c.$slots, "head", {}, void 0, !0)
      ])),
      Ge(c.$slots, "default", {}, void 0, !0)
    ], 12, sf));
  }
}), rf = /* @__PURE__ */ Pe(of, [["__scopeId", "data-v-6504df41"]]), uf = /* @__PURE__ */ Ee({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(o) {
    return (c, v) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: Ce({
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
      Ge(c.$slots, "default")
    ], 4));
  }
}), df = /* @__PURE__ */ Ee({
  __name: "BuilderTopShell",
  setup(o) {
    return (c, v) => (a(), n("div", {
      class: "kb-top-shell",
      style: Ce({
        marginLeft: x(xe)[24],
        marginRight: x(xe)[24]
      })
    }, [
      Ge(c.$slots, "header"),
      Ge(c.$slots, "errors"),
      Ge(c.$slots, "warnings"),
      Ge(c.$slots, "default")
    ], 4));
  }
});
function cf(o) {
  o.component("KeosNotificationBuilder", Xt), o.component("KeosWhatsAppBuilder", Zt), o.component("KeosSmsBuilder", ea), o.component("KeosEmailBuilder", ta), o.component("BuilderShell", Xg), o.component("BuilderOutline", nf), o.component("BuilderVersionHistoryModal", Qt), o.component("BuilderFormShell", rf), o.component("BuilderActionsBar", uf), o.component("BuilderTopShell", df);
}
const mf = {
  install: cf,
  KeosNotificationBuilder: Xt,
  KeosWhatsAppBuilder: Zt,
  KeosSmsBuilder: ea,
  KeosEmailBuilder: ta
};
export {
  uf as BuilderActionsBar,
  rf as BuilderFormShell,
  nf as BuilderOutline,
  Xg as BuilderShell,
  df as BuilderTopShell,
  Qt as BuilderVersionHistoryModal,
  et as DEFAULT_SAMPLE_PROFILES,
  ta as KeosEmailBuilder,
  Xt as KeosNotificationBuilder,
  ea as KeosSmsBuilder,
  Zt as KeosWhatsAppBuilder,
  mf as default,
  cf as install,
  Qe as renderTemplatePreview,
  dt as useAutosave,
  ut as useCampaignState
};
//# sourceMappingURL=index.js.map
