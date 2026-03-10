import { ref as ue, watch as Le, computed as $, defineComponent as Ee, openBlock as a, createElementBlock as n, normalizeStyle as Ce, unref as C, createElementVNode as e, normalizeClass as ke, Fragment as P, renderList as j, toDisplayString as d, createTextVNode as K, createCommentVNode as g, withDirectives as je, vModelText as it, createStaticVNode as Je, vModelSelect as Ke, withKeys as aa, onMounted as st, onUnmounted as lt, createVNode as Oe, createBlock as na, withModifiers as Ye, renderSlot as Ge } from "vue";
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
function Ft(o) {
  const c = o;
  return c.schema_version || (c.schema_version = Ht), c.audience || (c.audience = yt()), c.message || (c.message = gt()), c.delivery || (c.delivery = ft()), c.tracking || (c.tracking = kt()), Wt.includes(c.delivery.priority) || (c.delivery.priority = Dt), c.delivery.ttl === void 0 && (c.delivery.ttl = jt), oa.includes(c.audience.type) || (c.audience.type = "topic"), c.audience.type === "topic" && !c.audience.topic_name && (c.audience.topic_name = "default"), c;
}
const ra = 1e5;
function ua(o, c) {
  var _, I, U;
  const v = [], y = c ?? o.audience.estimated_reach;
  return y !== void 0 && y >= ra && v.push({
    message: `Estimated reach is very high (${y.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), o.tracking && !((_ = o.tracking.campaign_name) != null && _.trim()) && !((I = o.name) != null && I.trim()) && v.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (U = o.message.deep_link) != null && U.trim() || v.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), v;
}
function qt(o, c = "error") {
  return { message: o, severity: c };
}
function zt(o) {
  const c = [];
  return o.schema_version || c.push(qt("Missing schema_version")), {
    valid: c.length === 0,
    errors: c
  };
}
function da(o, c) {
  const v = zt(o), y = ua(o, c);
  return {
    valid: v.valid,
    errors: [
      ...v.errors,
      ...y.map((_) => qt(_.message, _.severity))
    ]
  };
}
function ca(o) {
  return o.errors.filter((c) => c.severity === "error");
}
function pa(o) {
  return o.errors.filter((c) => c.severity !== "error");
}
function ma(o) {
  const c = String(o ?? "").trim().toLowerCase();
  return c === "authentication" ? "AUTHENTICATION" : c === "utility" ? "UTILITY" : "MARKETING";
}
function va(o, c = "template_message") {
  return (String(o ?? "").trim() || c).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || c;
}
function ba(o) {
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
  return v.forEach((I, U) => y.set(I, U + 1)), { text: o.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (I, U) => (y.has(U) || (y.set(U, v.length + 1), v.push(U)), `{{${y.get(U)}}}`)), varOrder: v };
}
function wt(o, c) {
  return o.map((v) => {
    const y = c == null ? void 0 : c[v];
    return typeof y == "string" && y.length > 0 ? y : `sample_${v}`;
  });
}
function ha(o, c, v) {
  if (!o || !c || v.length === 0)
    return {};
  try {
    const _ = o.split(/\{\{\d+\}\}/).map((O) => O.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+?)"), I = new RegExp(`^${_}$`, "s"), U = c.match(I);
    if (!U)
      return {};
    const T = {};
    return v.forEach((O, B) => {
      const F = U[B + 1];
      F && (T[O] = F.trim());
    }), T;
  } catch {
    return {};
  }
}
function Yt(o, c) {
  const v = [];
  let y = [...c];
  return { buttons: o.slice(0, 10).map((I) => {
    const U = I, T = String(U.type ?? "quick_reply").trim().toLowerCase(), O = String(U.label ?? "").trim() || "Button";
    if (T === "url") {
      const B = nt(String(U.url ?? ""), y);
      y = B.varOrder;
      const F = String(U.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        text: O,
        url: B.text || void 0,
        ...F ? { example: [F] } : {}
      };
    }
    if (T === "call")
      return {
        type: "PHONE_NUMBER",
        text: O,
        phone_number: String(U.phone ?? "").trim() || void 0
      };
    if (T === "copy_code") {
      const B = String(U.example ?? "").trim() || void 0;
      return { type: "COPY_CODE", text: O, ...B ? { example: B } : {} };
    }
    if (T === "otp") {
      const B = String(U.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        text: O,
        otp_type: B,
        ...String(U.autofill_text ?? "").trim() ? { autofill_text: String(U.autofill_text).trim() } : {},
        ...String(U.package_name ?? "").trim() ? { package_name: String(U.package_name).trim() } : {},
        ...String(U.signature_hash ?? "").trim() ? { signature_hash: String(U.signature_hash).trim() } : {}
      };
    }
    return T === "opt_out" ? { type: "QUICK_REPLY", text: O } : { type: "QUICK_REPLY", text: O };
  }).filter((I) => !!(I != null && I.text)), varOrder: y, warnings: v };
}
function ya(o) {
  return o.slice(0, 10).map((c) => {
    const v = c, y = String(v.type ?? "quick_reply").trim().toLowerCase(), _ = String(v.label ?? "").trim() || "Button";
    if (y === "url") {
      const I = String(v.url ?? "").trim() || void 0, U = String(v.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        title: _,
        ...I ? { url: I } : {},
        ...U ? { example: [U] } : {}
      };
    }
    if (y === "call")
      return {
        type: "PHONE_NUMBER",
        title: _,
        ...String(v.phone ?? "").trim() ? { phoneNumber: String(v.phone).trim() } : {}
      };
    if (y === "opt_out")
      return { type: "OPT_OUT", title: _ };
    if (y === "copy_code")
      return {
        type: "COPY_CODE",
        title: _,
        ...String(v.example ?? "").trim() ? { example: String(v.example).trim() } : {}
      };
    if (y === "otp") {
      const I = String(v.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        title: _,
        otp_type: I,
        ...String(v.autofill_text ?? "").trim() ? { autofill_text: String(v.autofill_text).trim() } : {},
        ...String(v.package_name ?? "").trim() ? { package_name: String(v.package_name).trim() } : {},
        ...String(v.signature_hash ?? "").trim() ? { signature_hash: String(v.signature_hash).trim() } : {}
      };
    }
    return { type: "QUICK_REPLY", title: _ };
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
function ga(o, c = {}) {
  const v = [], y = o.message, _ = [], I = va(y.template_name ?? o.name, o.name || "template_message"), U = ma(y.template_category), T = String(y.template_language ?? "en_US").trim() || "en_US";
  let O = [];
  const B = String(y.body ?? "").trim(), F = nt(B, []), te = String(y.template_example ?? "").trim(), se = !c.exampleData && te ? ha(F.text, te, F.varOrder) : {}, ce = c.exampleData ?? (Object.keys(se).length ? se : void 0), D = ba(y), ae = String(y.header ?? "").trim();
  if (D === "TEXT" && ae) {
    const ye = nt(ae, O);
    O = ye.varOrder;
    const _e = wt(O, ce);
    _.push({
      type: "HEADER",
      format: "TEXT",
      text: ye.text,
      ..._e.length ? { example: { header_text: _e } } : {}
    });
  } else D && D !== "TEXT" && (_.push({ type: "HEADER", format: D }), y.media_url || v.push(`Header format ${D} selected but media_url is empty.`));
  const q = String(y.body ?? "").trim(), pe = nt(q, O);
  O = pe.varOrder;
  const W = wt(O, ce);
  _.push({
    type: "BODY",
    text: pe.text,
    ...W.length ? { example: { body_text: [W] } } : {}
  });
  const J = String(y.footer ?? "").trim();
  if (J) {
    const ye = nt(J, O);
    O = ye.varOrder, _.push({
      type: "FOOTER",
      text: ye.text
    });
  }
  const Z = Array.isArray(y.buttons) ? y.buttons : [];
  if (Z.length) {
    const ye = Yt(Z, O);
    O = ye.varOrder, v.push(...ye.warnings), ye.buttons.length && _.push({ type: "BUTTONS", buttons: ye.buttons });
  }
  const ne = String(y.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(ne) && v.push(`template_type="${ne}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: I,
      category: U,
      language: T,
      components: _
    },
    warnings: v
  };
}
const xt = {
  MARKETING: /* @__PURE__ */ new Set(["quick_reply", "url", "call", "copy_code", "opt_out"]),
  UTILITY: /* @__PURE__ */ new Set(["quick_reply", "url", "call"]),
  AUTHENTICATION: /* @__PURE__ */ new Set(["otp"])
};
function Ct(o, c = {}) {
  const v = ga(o, c), y = o.message, _ = [...v.warnings], I = v.payload.category, U = I === "AUTHENTICATION", T = xt[I] ?? xt.MARKETING, B = (Array.isArray(y.buttons) ? y.buttons : []).filter((x) => {
    const M = String(x.type ?? "quick_reply").trim().toLowerCase();
    return T.has(M) ? !0 : (_.push(`Button type "${M}" is not allowed for ${I}; removed from payload.`), !1);
  }), F = U ? 1 : 10;
  B.length > F && _.push(`${I} allows at most ${F} button(s); extra buttons removed.`);
  const te = B.slice(0, F), se = ya(te), ce = v.payload.components.filter((x) => !(U && x.type === "HEADER" || U && x.type === "FOOTER"));
  if (te.length) {
    const x = ce.findIndex((le) => le.type === "BUTTONS"), { buttons: M } = Yt(te, []), w = { type: "BUTTONS", buttons: M };
    x >= 0 ? ce[x] = w : M.length && ce.push(w);
  } else {
    const x = ce.findIndex((M) => M.type === "BUTTONS");
    x >= 0 && ce.splice(x, 1);
  }
  const D = { ...v.payload, components: ce }, ae = ce.find((x) => x.type === "HEADER"), q = ce.find((x) => x.type === "BODY"), pe = ce.find((x) => x.type === "FOOTER"), W = String(y.body ?? "").trim(), J = String(y.header ?? "").trim(), Z = String(y.footer ?? "").trim(), ne = (() => {
    const x = String(y.template_type ?? "").trim().toLowerCase();
    return x === "image" ? "IMAGE" : x === "video" ? "VIDEO" : x === "document" ? "DOCUMENT" : x === "carousel" ? "CAROUSEL" : "TEXT";
  })(), ye = String(y.vertical ?? "").trim() || void 0, _e = String(y.template_example ?? "").trim() || void 0, ee = String(y.media_handle ?? "").trim() || void 0, k = typeof y.enable_sample == "boolean" ? y.enable_sample : void 0, E = !U && typeof y.allow_category_change == "boolean" ? y.allow_category_change : void 0, N = typeof y.add_security_recommendation == "boolean" ? y.add_security_recommendation : void 0, be = typeof y.code_expiration_minutes == "number" ? y.code_expiration_minutes : void 0;
  return { payload: {
    elementName: D.name,
    languageCode: D.language,
    category: D.category,
    templateType: ne,
    content: W || (q == null ? void 0 : q.text) || "",
    ...ye ? { vertical: ye } : {},
    ..._e ? { example: _e } : {},
    ...ee ? { exampleMedia: ee } : {},
    // Header and footer are forbidden for AUTHENTICATION templates.
    ...!U && (ae == null ? void 0 : ae.format) === "TEXT" && (J || ae.text) ? { header: J || ae.text } : {},
    ...!U && (Z || pe != null && pe.text) ? { footer: Z || (pe == null ? void 0 : pe.text) } : {},
    ...se.length ? { buttons: se } : {},
    ...k !== void 0 ? { enableSample: k } : {},
    // allowTemplateCategoryChange is forbidden for AUTHENTICATION templates.
    ...E !== void 0 ? { allowTemplateCategoryChange: E } : {},
    ...N !== void 0 ? { addSecurityRecommendation: N } : {},
    ...be !== void 0 ? { codeExpirationMinutes: be } : {},
    metaTemplate: D,
    metaWhatsApp: D,
    ...$t(y) ? { advanced: $t(y) } : {}
  }, warnings: _ };
}
function Ze(o, c) {
  return o.length <= c ? { text: o, truncated: !1 } : { text: o.slice(0, Math.max(0, c - 3)) + "...", truncated: !0 };
}
const ot = rt.android;
function fa(o) {
  const { title: c, body: v } = o, y = Ze(c || "", ot.title), _ = Ze(v || "", ot.body);
  return {
    title: y.text,
    body: _.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function ka(o) {
  const { title: c, body: v } = o, y = Ze(c || "", ot.title), _ = Ze(v || "", ot.body);
  return {
    title: y.text,
    body: _.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: _.truncated,
    expanded: !0
  };
}
function _a(o, c = {}) {
  const v = c.expanded ? ka(o) : fa(o);
  return c.darkMode !== void 0 && (v.darkMode = c.darkMode), v;
}
const St = rt.ios;
function Kt(o) {
  const { title: c, body: v } = o, y = Ze(c || "", St.title), _ = Ze(v || "", St.body);
  return {
    title: y.text,
    body: _.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function wa(o) {
  return Kt(o);
}
function $a(o, c = {}) {
  const v = c.variant === "lockscreen" ? wa(o) : Kt(o);
  return c.darkMode !== void 0 && (v.darkMode = c.darkMode), v;
}
const It = rt.web;
function Tt(o) {
  const { title: c, body: v } = o, y = Ze(c || "", It.title), _ = Ze(v || "", It.body);
  return {
    title: y.text,
    body: _.text,
    imageUrl: o.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: _.truncated
  };
}
function xa(o) {
  return o.map((c) => ({ message: c, severity: "error" }));
}
function pt(o) {
  return JSON.parse(JSON.stringify(o));
}
function ut(o = {}) {
  const c = ue(
    Ft(o.initial ?? ia())
  ), v = o.hooks ?? {}, y = ue(!1), _ = ue([]);
  Le(
    c,
    () => {
      if (!v.customValidators) {
        _.value = [];
        return;
      }
      v.customValidators(c.value).then((N) => {
        _.value = N;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const I = ue([]), U = ue([]);
  function T() {
    const N = pt(c.value);
    I.value = [...I.value.slice(-19), N], U.value = [];
  }
  const O = $(() => I.value.length > 0), B = $(() => U.value.length > 0);
  function F() {
    I.value.length !== 0 && (U.value = [pt(c.value), ...U.value], c.value = I.value[I.value.length - 1], I.value = I.value.slice(0, -1));
  }
  function te() {
    U.value.length !== 0 && (I.value = [...I.value, pt(c.value)], c.value = U.value[0], U.value = U.value.slice(1));
  }
  Le(
    c,
    () => {
      var N;
      y.value = !0, (N = o.onDirty) == null || N.call(o);
    },
    { deep: !0 }
  );
  const se = $(() => zt(c.value));
  function ce(N) {
    const be = da(c.value, N), ie = xa(_.value), x = [...ca(be), ...ie], M = [...be.errors, ...ie], w = be.valid && ie.length === 0;
    return {
      ...be,
      errors: M,
      valid: w,
      blockingErrors: x,
      warnings: pa(be)
    };
  }
  function D(N) {
    T(), c.value = { ...c.value, ...N };
  }
  function ae(N) {
    T(), c.value = {
      ...c.value,
      audience: { ...c.value.audience, ...N }
    };
  }
  function q(N) {
    T(), c.value = {
      ...c.value,
      message: { ...c.value.message, ...N }
    };
  }
  function pe(N) {
    T(), c.value = {
      ...c.value,
      delivery: { ...c.value.delivery, ...N }
    };
  }
  function W(N) {
    T(), c.value = {
      ...c.value,
      tracking: c.value.tracking ? { ...c.value.tracking, ...N } : { campaign_name: "", tags: [], ab_test: !1, ...N }
    };
  }
  function J(N) {
    T(), c.value = {
      ...c.value,
      message: { ...gt(), ...N }
    };
  }
  function Z(N) {
    T(), c.value = {
      ...c.value,
      delivery: { ...ft(), ...N }
    };
  }
  function ne(N) {
    T(), c.value = {
      ...c.value,
      tracking: { ...kt(), ...N }
    };
  }
  function ye(N) {
    T(), c.value = {
      ...c.value,
      audience: { ...yt(), ...N }
    };
  }
  const _e = $(() => ({
    title: c.value.message.title,
    body: c.value.message.body,
    imageUrl: c.value.message.image_url
  }));
  function ee(N, be) {
    const ie = _e.value;
    let x;
    switch (N) {
      case "android":
        x = _a(ie, { expanded: be == null ? void 0 : be.expanded });
        break;
      case "ios":
        x = $a(ie);
        break;
      case "web":
        x = Tt(ie);
        break;
      default:
        x = Tt(ie);
    }
    const M = c.value.message.actions ?? [], w = c.value.message.location;
    return { ...x, actions: M, location: w ?? void 0 };
  }
  const k = rt;
  async function E() {
    return v.customValidators ? v.customValidators(c.value) : [];
  }
  return {
    campaign: c,
    dirty: y,
    validation: se,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: _,
    getValidationWithWarnings: ce,
    update: D,
    updateAudience: ae,
    updateMessage: q,
    updateDelivery: pe,
    updateTracking: W,
    undo: F,
    redo: te,
    canUndo: O,
    canRedo: B,
    resetMessage: J,
    resetDelivery: Z,
    resetTracking: ne,
    resetAudience: ye,
    getPreview: ee,
    previewInput: _e,
    characterLimits: k,
    runCustomValidators: E,
    hooks: v
  };
}
const Ca = "keos-draft", Sa = 2e3;
function Ia(o, c) {
  return `${Ca}-${o}-${c}`;
}
function dt(o, c) {
  const v = c.channel, y = $(
    () => {
      var F, te;
      return Ia(
        v,
        c.key ?? ((F = o.value) == null ? void 0 : F.id) ?? ((te = o.value) == null ? void 0 : te.name) ?? "draft"
      );
    }
  ), _ = ue(null);
  let I = null;
  function U() {
    try {
      const F = JSON.stringify(o.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(y.value, F), _.value = /* @__PURE__ */ new Date());
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
      const F = window.localStorage.getItem(y.value);
      if (!F) return null;
      const te = JSON.parse(F);
      return Ft(te);
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
      B() && (I && clearTimeout(I), I = setTimeout(() => {
        I = null, U();
      }, Sa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: _,
    clearDraft: T,
    getDraft: O,
    persist: U
  };
}
const Ta = { class: "kb-header__row" }, Aa = ["value"], Ua = { class: "kb-header__actions" }, Ra = ["disabled"], Ea = ["disabled"], Pa = ["value"], Ba = ["value"], La = /* @__PURE__ */ Ee({
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
    ], y = o, _ = c, I = () => !!(y.campaignName || "").trim();
    function U(B) {
      return y.slugifyName ? B.trim().replace(/\s+/g, "-") : B;
    }
    function T(B) {
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
        padding: `${C(xe)[16]}px 0`,
        borderBottom: `1px solid ${C(Ae).neutral.border}`,
        marginBottom: `${C(xe)[16]}px`
      })
    }, [
      e("div", Ta, [
        e("div", {
          class: ke(["kb-header__name-section", { "kb-header__name-section--filled": I() }])
        }, [
          F[4] || (F[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: o.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: F[0] || (F[0] = (te) => _("update:campaignName", U(te.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Aa),
          F[5] || (F[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Ua, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !o.canUndo,
            onClick: F[1] || (F[1] = (te) => _("undo"))
          }, " Undo ", 8, Ra),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !o.canRedo,
            onClick: F[2] || (F[2] = (te) => _("redo"))
          }, " Redo ", 8, Ea)
        ]),
        o.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: o.workflowStatus,
          class: "kb-header__status-select",
          style: Ce({
            padding: `${C(xe)[4]}px ${C(xe)[8]}px`,
            borderRadius: `${C(Xe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...O(o.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: F[3] || (F[3] = (te) => _("update:workflowStatus", te.target.value))
        }, [
          (a(), n(P, null, j(v, (te) => e("option", {
            key: te.value,
            value: te.value
          }, d(te.label), 9, Ba)), 64))
        ], 44, Pa)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: Ce({
            padding: `${C(xe)[4]}px ${C(xe)[8]}px`,
            borderRadius: `${C(Xe).input}px`,
            background: C(Ae).neutral.bg,
            fontSize: "0.8125rem",
            color: C(Ae).neutral.textMuted
          })
        }, d(o.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: Ce({ fontSize: "0.8125rem", color: C(Ae).neutral.textMuted, marginTop: `${C(xe)[4]}px` })
      }, [
        o.saving ? (a(), n(P, { key: 0 }, [
          K("Saving…")
        ], 64)) : o.dirty ? (a(), n(P, { key: 1 }, [
          K("Unsaved changes")
        ], 64)) : o.lastSavedAt ? (a(), n(P, { key: 2 }, [
          K("Last saved at " + d(T(o.lastSavedAt)), 1)
        ], 64)) : g("", !0)
      ], 4)
    ], 4));
  }
}), Pe = (o, c) => {
  const v = o.__vccOpts || o;
  for (const [y, _] of c)
    v[y] = _;
  return v;
}, ct = /* @__PURE__ */ Pe(La, [["__scopeId", "data-v-56efb3ec"]]), Oa = { class: "kb-section" }, Na = { class: "kb-section__head" }, Ma = { class: "kb-field" }, Va = { class: "kb-label" }, Da = { class: "kb-field-with-rail" }, Wa = ["value", "aria-invalid"], ja = { class: "kb-var-picker-wrap" }, Ha = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Fa = ["onClick"], qa = {
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
}, yn = { class: "kb-field" }, gn = { class: "kb-actions-list" }, fn = { class: "kb-action-card__head" }, kn = { class: "kb-action-card__num" }, _n = { class: "kb-action-card__type-row" }, wn = ["value", "onChange"], $n = ["value"], xn = { class: "kb-toggle-row kb-toggle-row--inline" }, Cn = ["checked", "onChange"], Sn = ["onClick"], In = ["value", "onInput"], Tn = ["value", "onInput"], An = { class: "kb-action-http-row" }, Un = ["value", "onChange"], Rn = ["value"], En = ["value", "onInput"], Pn = ["value", "onInput"], Bn = { class: "kb-kv-section" }, Ln = ["value", "onInput"], On = ["value", "onInput"], Nn = ["onClick"], Mn = ["onClick"], Vn = ["value", "onInput"], Dn = { class: "kb-kv-section" }, Wn = ["value", "onInput"], jn = ["value", "onInput"], Hn = ["onClick"], Fn = ["onClick"], qn = ["value", "onInput"], zn = { class: "kb-actions-footer" }, Yn = ["disabled"], Kn = { class: "kb-action-chips" }, Gn = ["disabled", "onClick"], Jn = { class: "kb-field" }, Qn = { class: "kb-location-row" }, Xn = ["value"], Zn = ["value"], es = ["value"], ts = ["value"], as = { class: "kb-field" }, ns = ["value"], ss = { class: "kb-field" }, ls = ["value"], os = { class: "kb-field" }, is = { class: "kb-delay-row" }, rs = ["value"], us = { class: "kb-delay-chips" }, ds = ["onClick"], cs = { class: "kb-advanced-toggles" }, ps = { class: "kb-advanced-toggles__body" }, ms = { class: "kb-toggle-row" }, vs = ["checked"], bs = { class: "kb-toggle-row" }, hs = ["checked"], ys = { class: "kb-toggle-row" }, gs = ["checked"], mt = 3, fs = /* @__PURE__ */ Ee({
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
    const v = o, y = c, _ = $(() => v.message), I = [
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
    ], U = $(() => {
      const M = (_.value.variables ?? []).filter(Boolean);
      return M.length ? Array.from(new Set(M)) : I;
    }), T = ue(null);
    function O(M) {
      T.value = T.value === M ? null : M;
    }
    function B(M, w) {
      const le = ` {{ .${w} }}`, ge = (_.value.variables ?? []).filter(Boolean), me = Array.from(/* @__PURE__ */ new Set([...ge, w]));
      M === "title" ? y("update", { title: `${v.message.title || ""}${le}`, variables: me }) : y("update", { body: `${v.message.body || ""}${le}`, variables: me }), T.value = null;
    }
    const F = ue(""), te = $(() => _.value.tags ?? []);
    function se() {
      const M = F.value.trim().toLowerCase().replace(/\s+/g, "_");
      if (!M) return;
      const w = Array.from(/* @__PURE__ */ new Set([...te.value, M]));
      y("update", { tags: w }), F.value = "";
    }
    function ce(M) {
      y("update", { tags: te.value.filter((w) => w !== M) });
    }
    function D(M) {
      (M.key === "Enter" || M.key === ",") && (M.preventDefault(), se());
    }
    const ae = ["warning", "white_check_mark", "rotating_light", "loudspeaker", "package", "truck", "calendar", "key", "bell", "fire"], q = $(() => _.value.actions ?? []), pe = [
      { value: "view", label: "View", hint: "Open a URL in the browser or app." },
      { value: "http", label: "HTTP request", hint: "Send an HTTP request when tapped." },
      { value: "broadcast", label: "Broadcast", hint: "Android intent (automation apps)." },
      { value: "copy", label: "Copy to clipboard", hint: "Copy a value to the clipboard." }
    ], W = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    function J() {
      const M = [...q.value, { id: `action_${Date.now()}`, action: "view", label: "" }];
      y("update", { actions: M });
    }
    function Z(M) {
      const w = [...q.value];
      w.splice(M, 1), y("update", { actions: w });
    }
    function ne(M, w) {
      const le = [...q.value];
      le[M] = { ...le[M], ...w }, y("update", { actions: le });
    }
    function ye(M, w) {
      var me, he;
      const le = { id: (me = q.value[M]) == null ? void 0 : me.id, action: w, label: ((he = q.value[M]) == null ? void 0 : he.label) ?? "" }, ge = [...q.value];
      ge[M] = le, y("update", { actions: ge });
    }
    function _e(M) {
      const w = M.headers ?? {};
      return Object.entries(w).map(([le, ge]) => ({ key: le, value: ge }));
    }
    function ee(M) {
      const w = { ...q.value[M].headers ?? {} };
      w[""] = "", ne(M, { headers: w });
    }
    function k(M, w, le, ge) {
      const me = {};
      for (const [he, L] of Object.entries(q.value[M].headers ?? {}))
        me[he === w ? le : he] = he === w ? ge : L;
      ne(M, { headers: me });
    }
    function E(M, w) {
      const le = { ...q.value[M].headers ?? {} };
      delete le[w], ne(M, { headers: le });
    }
    function N(M) {
      const w = M.extras ?? {};
      return Object.entries(w).map(([le, ge]) => ({ key: le, value: ge }));
    }
    function be(M) {
      const w = { ...q.value[M].extras ?? {} };
      w[""] = "", ne(M, { extras: w });
    }
    function ie(M, w, le, ge) {
      const me = {};
      for (const [he, L] of Object.entries(q.value[M].extras ?? {}))
        me[he === w ? le : he] = he === w ? ge : L;
      ne(M, { extras: me });
    }
    function x(M, w) {
      const le = { ...q.value[M].extras ?? {} };
      delete le[w], ne(M, { extras: le });
    }
    return (M, w) => {
      var le, ge, me, he;
      return a(), n("section", Oa, [
        e("div", Na, [
          w[21] || (w[21] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: w[0] || (w[0] = (L) => M.$emit("reset"))
          }, "Reset section")) : g("", !0)
        ]),
        w[45] || (w[45] = e("p", { class: "kb-section__desc" }, " Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required. ", -1)),
        e("div", Ma, [
          e("label", Va, [
            w[22] || (w[22] = K(" Title ", -1)),
            e("span", {
              class: ke(["kb-counter", { "kb-counter--warn": o.titleCount > o.titleLimit }])
            }, d(o.titleCount) + "/" + d(o.titleLimit), 3)
          ]),
          e("div", Da, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: o.message.title,
              "aria-invalid": !!o.titleError,
              onInput: w[1] || (w[1] = (L) => M.$emit("update", { title: L.target.value }))
            }, null, 40, Wa),
            e("div", ja, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: w[2] || (w[2] = (L) => O("title"))
              }, "{{ .var }}"),
              T.value === "title" ? (a(), n("div", Ha, [
                (a(!0), n(P, null, j(U.value, (L) => (a(), n("button", {
                  key: `title-var-${L}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (X) => B("title", L)
                }, d(L), 9, Fa))), 128))
              ])) : g("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ce({ "--pct": Math.min(100, o.titleCount / o.titleLimit * 100) + "%" })
            }, [...w[23] || (w[23] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.titleError ? (a(), n("p", qa, d(o.titleError), 1)) : g("", !0)
        ]),
        e("div", za, [
          e("label", Ya, [
            w[24] || (w[24] = K(" Message ", -1)),
            e("span", {
              class: ke(["kb-counter", { "kb-counter--warn": o.bodyCount > o.bodyLimit }])
            }, d(o.bodyCount) + "/" + d(o.bodyLimit), 3)
          ]),
          e("div", Ka, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: o.message.body,
              "aria-invalid": !!o.bodyError,
              onInput: w[3] || (w[3] = (L) => M.$emit("update", { body: L.target.value }))
            }, null, 40, Ga),
            e("div", Ja, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: w[4] || (w[4] = (L) => O("body"))
              }, "{{ .var }}"),
              T.value === "body" ? (a(), n("div", Qa, [
                (a(!0), n(P, null, j(U.value, (L) => (a(), n("button", {
                  key: `body-var-${L}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (X) => B("body", L)
                }, d(L), 9, Xa))), 128))
              ])) : g("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ce({ "--pct": Math.min(100, o.bodyCount / o.bodyLimit * 100) + "%" })
            }, [...w[25] || (w[25] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.bodyError ? (a(), n("p", Za, d(o.bodyError), 1)) : g("", !0),
          e("label", en, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!_.value.markdown,
              onChange: w[5] || (w[5] = (L) => M.$emit("update", { markdown: L.target.checked || void 0 }))
            }, null, 40, tn),
            w[26] || (w[26] = e("span", { class: "kb-toggle-label" }, "Enable Markdown formatting", -1))
          ])
        ]),
        e("div", an, [
          w[28] || (w[28] = e("label", { class: "kb-label" }, [
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
          e("div", nn, [
            (a(!0), n(P, null, j(te.value, (L) => (a(), n("span", {
              key: L,
              class: "kb-tag"
            }, [
              K(d(L) + " ", 1),
              e("button", {
                type: "button",
                class: "kb-tag__remove",
                onClick: (X) => ce(L),
                "aria-label": "Remove tag"
              }, "×", 8, sn)
            ]))), 128)),
            je(e("input", {
              type: "text",
              class: "kb-input kb-input--tag",
              placeholder: "Add tag, press Enter",
              "onUpdate:modelValue": w[6] || (w[6] = (L) => F.value = L),
              onKeydown: D,
              onBlur: se
            }, null, 544), [
              [it, F.value]
            ])
          ]),
          e("div", ln, [
            w[27] || (w[27] = e("span", {
              class: "kb-helper",
              style: { "margin-right": "0.4rem" }
            }, "Common:", -1)),
            (a(), n(P, null, j(ae, (L) => e("button", {
              key: L,
              type: "button",
              class: ke(["kb-tag-chip", { "kb-tag-chip--active": te.value.includes(L) }]),
              onClick: (X) => te.value.includes(L) ? ce(L) : (F.value = L, se())
            }, d(L), 11, on)), 64))
          ])
        ]),
        e("div", rn, [
          w[29] || (w[29] = e("label", { class: "kb-label" }, [
            K(" Icon URL "),
            e("span", { class: "kb-helper" }, "Custom notification icon (JPEG or PNG). Shown in the notification drawer.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://example.com/icon.png",
            value: _.value.icon ?? "",
            onInput: w[7] || (w[7] = (L) => M.$emit("update", { icon: L.target.value || void 0 }))
          }, null, 40, un)
        ]),
        e("div", dn, [
          w[30] || (w[30] = e("label", { class: "kb-label" }, [
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
            value: o.message.image_url ?? _.value.attach ?? "",
            "aria-invalid": !!o.imageUrlError,
            onInput: w[8] || (w[8] = (L) => M.$emit("update", { image_url: L.target.value || void 0, attach: L.target.value || void 0 }))
          }, null, 40, cn),
          o.imageUrlError ? (a(), n("p", pn, d(o.imageUrlError), 1)) : g("", !0),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Filename override (e.g. invoice.pdf) — optional",
            value: _.value.attachment_filename ?? "",
            onInput: w[9] || (w[9] = (L) => M.$emit("update", { attachment_filename: L.target.value || void 0 }))
          }, null, 40, mn)
        ]),
        e("div", vn, [
          w[31] || (w[31] = e("label", { class: "kb-label" }, [
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
            onInput: w[10] || (w[10] = (L) => M.$emit("update", { deep_link: L.target.value || void 0 }))
          }, null, 40, bn),
          o.deepLinkError ? (a(), n("p", hn, d(o.deepLinkError), 1)) : g("", !0)
        ]),
        e("div", yn, [
          e("label", { class: "kb-label" }, [
            w[32] || (w[32] = K(" Action buttons ", -1)),
            e("span", { class: "kb-helper" }, "Up to " + d(mt) + " interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.")
          ]),
          e("div", gn, [
            (a(!0), n(P, null, j(q.value, (L, X) => (a(), n("div", {
              key: L.id || X,
              class: "kb-action-card"
            }, [
              e("div", fn, [
                e("span", kn, "Button " + d(X + 1), 1),
                e("div", _n, [
                  e("select", {
                    class: "kb-select kb-select--action-type",
                    value: L.action,
                    onChange: (G) => ye(X, G.target.value)
                  }, [
                    (a(), n(P, null, j(pe, (G) => e("option", {
                      key: G.value,
                      value: G.value
                    }, d(G.label), 9, $n)), 64))
                  ], 40, wn),
                  e("label", xn, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!L.clear,
                      onChange: (G) => ne(X, { clear: G.target.checked || void 0 })
                    }, null, 40, Cn),
                    w[33] || (w[33] = e("span", { class: "kb-toggle-label" }, "Dismiss after tap", -1))
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "kb-btn-remove-action",
                  onClick: (G) => Z(X)
                }, "Remove", 8, Sn)
              ]),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label (e.g. View order)",
                value: L.label,
                onInput: (G) => ne(X, { label: G.target.value })
              }, null, 40, In),
              L.action === "view" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input",
                placeholder: "URL to open (https:// or app://)",
                value: L.url ?? "",
                onInput: (G) => ne(X, { url: G.target.value || void 0 })
              }, null, 40, Tn)) : L.action === "http" ? (a(), n(P, { key: 1 }, [
                e("div", An, [
                  e("select", {
                    class: "kb-select kb-select--method",
                    value: L.method ?? "POST",
                    onChange: (G) => ne(X, { method: G.target.value })
                  }, [
                    (a(), n(P, null, j(W, (G) => e("option", {
                      key: G,
                      value: G
                    }, d(G), 9, Rn)), 64))
                  ], 40, Un),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "Endpoint URL",
                    value: L.url ?? "",
                    onInput: (G) => ne(X, { url: G.target.value || void 0 })
                  }, null, 40, En)
                ]),
                e("textarea", {
                  class: "kb-textarea kb-textarea--sm",
                  rows: "2",
                  placeholder: 'Request body (e.g. {"status":"closed"})',
                  value: L.body ?? "",
                  onInput: (G) => ne(X, { body: G.target.value || void 0 })
                }, null, 40, Pn),
                e("div", Bn, [
                  w[34] || (w[34] = e("span", { class: "kb-kv-label" }, "Headers", -1)),
                  (a(!0), n(P, null, j(_e(L), (G, $e) => (a(), n("div", {
                    key: $e,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Header name",
                      value: G.key,
                      onInput: (ve) => k(X, G.key, ve.target.value, G.value)
                    }, null, 40, Ln),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: G.value,
                      onInput: (ve) => k(X, G.key, G.key, ve.target.value)
                    }, null, 40, On),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (ve) => E(X, G.key)
                    }, "×", 8, Nn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (G) => ee(X)
                  }, "+ Add header", 8, Mn)
                ])
              ], 64)) : L.action === "broadcast" ? (a(), n(P, { key: 2 }, [
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "Intent (default: io.heckel.ntfy.USER_ACTION)",
                  value: L.intent ?? "",
                  onInput: (G) => ne(X, { intent: G.target.value || void 0 })
                }, null, 40, Vn),
                e("div", Dn, [
                  w[35] || (w[35] = e("span", { class: "kb-kv-label" }, "Extras", -1)),
                  (a(!0), n(P, null, j(N(L), (G, $e) => (a(), n("div", {
                    key: $e,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Key",
                      value: G.key,
                      onInput: (ve) => ie(X, G.key, ve.target.value, G.value)
                    }, null, 40, Wn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: G.value,
                      onInput: (ve) => ie(X, G.key, G.key, ve.target.value)
                    }, null, 40, jn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (ve) => x(X, G.key)
                    }, "×", 8, Hn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (G) => be(X)
                  }, "+ Add extra", 8, Fn)
                ])
              ], 64)) : L.action === "copy" ? (a(), n("input", {
                key: 3,
                type: "text",
                class: "kb-input",
                placeholder: "Value to copy to clipboard",
                value: L.value ?? "",
                onInput: (G) => ne(X, { value: G.target.value || void 0 })
              }, null, 40, qn)) : g("", !0)
            ]))), 128)),
            e("div", zn, [
              e("button", {
                type: "button",
                class: "kb-btn-add-action",
                disabled: q.value.length >= mt,
                onClick: J
              }, " Add action ", 8, Yn),
              e("div", Kn, [
                w[36] || (w[36] = e("span", { class: "kb-action-chips-label" }, "Quick add:", -1)),
                (a(), n(P, null, j(["View order", "Track shipment", "Dismiss"], (L) => e("button", {
                  key: L,
                  type: "button",
                  class: "kb-action-chip",
                  disabled: q.value.length >= mt,
                  onClick: () => {
                    const X = [...q.value, { id: `action_${Date.now()}`, action: "view", label: L }];
                    M.$emit("update", { actions: X });
                  }
                }, d(L), 9, Gn)), 64))
              ])
            ])
          ])
        ]),
        e("div", Jn, [
          w[37] || (w[37] = e("label", { class: "kb-label" }, [
            K(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Attach coordinates for rich notifications or open-in-maps support.")
          ], -1)),
          e("div", Qn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((le = _.value.location) == null ? void 0 : le.lat) ?? "",
              onInput: w[11] || (w[11] = (L) => {
                const X = { ..._.value.location ?? {} }, G = L.target.value;
                X.lat = G === "" ? void 0 : Number(G), M.$emit("update", { location: X });
              })
            }, null, 40, Xn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ge = _.value.location) == null ? void 0 : ge.lon) ?? "",
              onInput: w[12] || (w[12] = (L) => {
                const X = { ..._.value.location ?? {} }, G = L.target.value;
                X.lon = G === "" ? void 0 : Number(G), M.$emit("update", { location: X });
              })
            }, null, 40, Zn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. HQ, Store name)",
            value: ((me = _.value.location) == null ? void 0 : me.name) ?? "",
            onInput: w[13] || (w[13] = (L) => {
              const X = { ..._.value.location ?? {} };
              X.name = L.target.value || void 0, M.$emit("update", { location: X });
            })
          }, null, 40, es),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Address (optional)",
            value: ((he = _.value.location) == null ? void 0 : he.address) ?? "",
            onInput: w[14] || (w[14] = (L) => {
              const X = { ..._.value.location ?? {} };
              X.address = L.target.value || void 0, M.$emit("update", { location: X });
            })
          }, null, 40, ts)
        ]),
        e("div", as, [
          w[38] || (w[38] = e("label", { class: "kb-label" }, [
            K(" Email forward ("),
            e("code", null, "email"),
            K(") "),
            e("span", { class: "kb-helper" }, "Forward this notification to an email address.")
          ], -1)),
          e("input", {
            type: "email",
            class: "kb-input",
            placeholder: "recipient@example.com",
            value: _.value.email_forward ?? "",
            onInput: w[15] || (w[15] = (L) => M.$emit("update", { email_forward: L.target.value || void 0 }))
          }, null, 40, ns)
        ]),
        e("div", ss, [
          w[39] || (w[39] = e("label", { class: "kb-label" }, [
            K(" Phone call ("),
            e("code", null, "call"),
            K(") "),
            e("span", { class: "kb-helper" }, "Initiate a phone call to this number when the notification is received.")
          ], -1)),
          e("input", {
            type: "tel",
            class: "kb-input",
            placeholder: "+1 555 123 4567",
            value: _.value.call ?? "",
            onInput: w[16] || (w[16] = (L) => M.$emit("update", { call: L.target.value || void 0 }))
          }, null, 40, ls)
        ]),
        e("div", os, [
          w[40] || (w[40] = Je('<label class="kb-label" data-v-03f4fc73> Delivery delay (<code data-v-03f4fc73>delay</code>) <span class="kb-helper" data-v-03f4fc73>Schedule delivery for later. Accepts durations (<code data-v-03f4fc73>30min</code>, <code data-v-03f4fc73>2h</code>, <code data-v-03f4fc73>1day</code>), times (<code data-v-03f4fc73>9am</code>, <code data-v-03f4fc73>8:30pm</code>), natural language (<code data-v-03f4fc73>tomorrow, 3pm</code>), or Unix timestamps. Max 3 days.</span></label>', 1)),
          e("div", is, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. 30min, 2h, tomorrow 9am, 1693000000",
              value: _.value.delay ?? "",
              onInput: w[17] || (w[17] = (L) => M.$emit("update", { delay: L.target.value || void 0 }))
            }, null, 40, rs),
            e("div", us, [
              (a(), n(P, null, j(["30min", "1h", "4h", "tomorrow"], (L) => e("button", {
                key: L,
                type: "button",
                class: ke(["kb-delay-chip", { "kb-delay-chip--active": _.value.delay === L }]),
                onClick: (X) => M.$emit("update", { delay: _.value.delay === L ? void 0 : L })
              }, d(L), 11, ds)), 64))
            ])
          ])
        ]),
        e("details", cs, [
          w[44] || (w[44] = e("summary", { class: "kb-advanced-toggles__summary" }, "Advanced options", -1)),
          e("div", ps, [
            e("label", ms, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!_.value.cache,
                onChange: w[18] || (w[18] = (L) => M.$emit("update", { cache: L.target.checked || void 0 }))
              }, null, 40, vs),
              w[41] || (w[41] = e("span", { class: "kb-toggle-label" }, [
                K("Enable server-side caching ("),
                e("code", null, "cache"),
                K(")")
              ], -1))
            ]),
            e("label", bs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!_.value.firebase,
                onChange: w[19] || (w[19] = (L) => M.$emit("update", { firebase: L.target.checked || void 0 }))
              }, null, 40, hs),
              w[42] || (w[42] = e("span", { class: "kb-toggle-label" }, [
                K("Deliver via Firebase Cloud Messaging ("),
                e("code", null, "firebase"),
                K(")")
              ], -1))
            ]),
            e("label", ys, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!_.value.unified_push,
                onChange: w[20] || (w[20] = (L) => M.$emit("update", { unified_push: L.target.checked || void 0 }))
              }, null, 40, gs),
              w[43] || (w[43] = e("span", { class: "kb-toggle-label" }, [
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
}), ks = /* @__PURE__ */ Pe(fs, [["__scopeId", "data-v-03f4fc73"]]), _s = { class: "kb-section kb-section--inline-personalization" }, ws = { class: "kb-field" }, $s = { class: "kb-insert-row" }, xs = ["value"], Cs = { class: "kb-field" }, Ss = { class: "kb-insert-row" }, Is = { class: "kb-field" }, Ts = { class: "kb-variable-list" }, As = /* @__PURE__ */ Ee({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(o, { emit: c }) {
    var D;
    const v = o, y = c, _ = [
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
    ], I = [
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
    ], U = $(
      () => (v.targets ?? []).includes("footer") ? I : _
    ), T = ue(
      (D = v.variableOptions) != null && D.length ? [...v.variableOptions] : [...U.value]
    ), O = ue(T.value[0] ?? U.value[0]), B = ue("");
    Le(
      () => v.variableOptions,
      (ae) => {
        ae && ae.length ? (T.value = [...ae], T.value.includes(O.value) || (O.value = T.value[0])) : (T.value = [...U.value], T.value.includes(O.value) || (O.value = T.value[0]));
      }
    ), Le(
      U,
      (ae) => {
        var q;
        (q = v.variableOptions) != null && q.length || (T.value = [...ae], T.value.includes(O.value) || (O.value = T.value[0]));
      }
    );
    const F = $(() => T.value), te = $(() => {
      var q;
      return (q = v.targets) != null && q.length ? v.targets : ["title", "body"];
    });
    function se(ae) {
      y("insertVariable", { variable: O.value, field: ae });
    }
    function ce() {
      const ae = B.value.trim();
      ae && (T.value.includes(ae) || (T.value = [...T.value, ae]), O.value = ae, B.value = "");
    }
    return (ae, q) => (a(), n("section", _s, [
      q[9] || (q[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      q[10] || (q[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", ws, [
        q[5] || (q[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", $s, [
          je(e("select", {
            "onUpdate:modelValue": q[0] || (q[0] = (pe) => O.value = pe),
            class: "kb-select"
          }, [
            (a(!0), n(P, null, j(F.value, (pe) => (a(), n("option", {
              key: pe,
              value: pe
            }, d(pe), 9, xs))), 128))
          ], 512), [
            [Ke, O.value]
          ]),
          te.value.includes("title") ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[1] || (q[1] = (pe) => se("title"))
          }, " Into title ")) : g("", !0),
          te.value.includes("body") ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[2] || (q[2] = (pe) => se("body"))
          }, " Into message ")) : g("", !0),
          te.value.includes("footer") ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: q[3] || (q[3] = (pe) => se("footer"))
          }, " Into footer ")) : g("", !0)
        ])
      ]),
      e("div", Cs, [
        q[6] || (q[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ss, [
          je(e("input", {
            "onUpdate:modelValue": q[4] || (q[4] = (pe) => B.value = pe),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [it, B.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ce
          }, " Add ")
        ])
      ]),
      e("div", Is, [
        q[7] || (q[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        q[8] || (q[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ts, [
          (a(!0), n(P, null, j(F.value, (pe) => (a(), n("li", { key: pe }, [
            e("code", null, "{{ ." + d(pe) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ Pe(As, [["__scopeId", "data-v-ab96d6bb"]]), Us = { class: "kb-section kb-section--template-type" }, Rs = { class: "kb-field" }, Es = { class: "kb-radio-group" }, Ps = { class: "kb-radio" }, Bs = ["checked"], Ls = { class: "kb-radio" }, Os = ["checked"], Ns = /* @__PURE__ */ Ee({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(o, { emit: c }) {
    const v = c;
    return (y, _) => (a(), n("section", Us, [
      _[5] || (_[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      _[6] || (_[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Rs, [
        e("div", Es, [
          e("label", Ps, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: o.templateType === "transactional",
              onChange: _[0] || (_[0] = (I) => v("update", "transactional"))
            }, null, 40, Bs),
            _[2] || (_[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: o.templateType === "marketing",
              onChange: _[1] || (_[1] = (I) => v("update", "marketing"))
            }, null, 40, Os),
            _[3] || (_[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        _[4] || (_[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Pe(Ns, [["__scopeId", "data-v-ff2e1bd8"]]), Ms = { class: "kb-section" }, Vs = { class: "kb-section__head" }, Ds = { class: "kb-section__desc" }, Ws = { class: "kb-field" }, js = { class: "kb-radio-group" }, Hs = { class: "kb-radio" }, Fs = ["checked"], qs = { class: "kb-radio" }, zs = ["checked"], Ys = {
  key: 0,
  class: "kb-field kb-row"
}, Ks = ["value"], Gs = ["value"], Js = { class: "kb-field" }, Qs = ["value"], Xs = ["value"], Zs = { class: "kb-field" }, el = ["value"], tl = ["value"], al = { class: "kb-field" }, nl = { class: "kb-checkbox" }, sl = ["checked"], ll = /* @__PURE__ */ Ee({
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
      var _;
      return a(), n("section", Ms, [
        e("div", Vs, [
          y[8] || (y[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: y[0] || (y[0] = (I) => v.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        e("p", Ds, d(o.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Ws, [
          y[11] || (y[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", js, [
            e("label", Hs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !o.delivery.scheduled_at,
                onChange: y[1] || (y[1] = (I) => v.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Fs),
              y[9] || (y[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", qs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!o.delivery.scheduled_at,
                onChange: y[2] || (y[2] = (I) => v.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, zs),
              y[10] || (y[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        o.delivery.scheduled_at ? (a(), n("div", Ys, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (_ = o.delivery.scheduled_at) == null ? void 0 : _.slice(0, 16),
            onInput: y[3] || (y[3] = (I) => v.$emit("update", { scheduled_at: I.target.value }))
          }, null, 40, Ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: o.delivery.timezone,
            onInput: y[4] || (y[4] = (I) => v.$emit("update", { timezone: I.target.value }))
          }, null, 40, Gs)
        ])) : g("", !0),
        o.showPushOptions ? (a(), n(P, { key: 1 }, [
          e("div", Js, [
            y[12] || (y[12] = e("label", { class: "kb-label" }, [
              K(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.ttl,
              onChange: y[5] || (y[5] = (I) => v.$emit("update", { ttl: Number(I.target.value) }))
            }, [
              (a(!0), n(P, null, j(C(la), (I) => (a(), n("option", {
                key: I,
                value: I
              }, d(c[I] ?? I + "s"), 9, Xs))), 128))
            ], 40, Qs)
          ]),
          e("div", Zs, [
            y[13] || (y[13] = e("label", { class: "kb-label" }, [
              K(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.priority,
              onChange: y[6] || (y[6] = (I) => v.$emit("update", { priority: I.target.value }))
            }, [
              (a(!0), n(P, null, j(C(Wt), (I) => (a(), n("option", {
                key: I,
                value: I
              }, d(I), 9, tl))), 128))
            ], 40, el)
          ]),
          e("div", al, [
            e("label", nl, [
              e("input", {
                type: "checkbox",
                checked: o.delivery.quiet_hours,
                onChange: y[7] || (y[7] = (I) => v.$emit("update", { quiet_hours: !o.delivery.quiet_hours }))
              }, null, 40, sl),
              y[14] || (y[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : g("", !0)
      ]);
    };
  }
}), ol = /* @__PURE__ */ Pe(ll, [["__scopeId", "data-v-5707a2a7"]]), il = { class: "kb-accordion" }, rl = { class: "kb-accordion__body" }, ul = { class: "kb-field" }, dl = ["value"], cl = { class: "kb-field" }, pl = { class: "kb-checkbox" }, ml = ["checked"], vl = /* @__PURE__ */ Ee({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(o) {
    return (c, v) => (a(), n("details", il, [
      v[4] || (v[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", rl, [
        e("div", ul, [
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
          }, null, 40, dl)
        ]),
        e("div", cl, [
          e("label", pl, [
            e("input", {
              type: "checkbox",
              checked: o.delivery.silent_push,
              onChange: v[1] || (v[1] = (y) => c.$emit("update", { silent_push: !o.delivery.silent_push }))
            }, null, 40, ml),
            v[3] || (v[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), bl = /* @__PURE__ */ Pe(vl, [["__scopeId", "data-v-699e4501"]]);
function Qe(o, c) {
  return !o || typeof o != "string" ? o : o.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (v, y) => {
    const I = String(y).trim().replace(/^\./, "");
    return I in c ? String(c[I]) : v;
  });
}
const et = [
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
}, Ul = ["src"], Rl = {
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
}, Fl = ["src"], ql = { class: "kb-web-toast" }, zl = { class: "kb-web-body" }, Yl = {
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
}, ao = /* @__PURE__ */ Ee({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(o) {
    const c = o, v = ue("shade"), y = ue("banner"), _ = ue("toast"), I = $(() => v.value === "expanded"), U = $(
      () => c.getPreview(c.selectedPlatform, {
        expanded: c.selectedPlatform === "android" ? I.value : void 0
      })
    ), T = $(() => {
      const ee = U.value;
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
    function B(ee, k) {
      const E = (ee ?? "").trim();
      return E ? E.length <= k ? E : `${E.slice(0, Math.max(0, k - 1)).trimEnd()}…` : "";
    }
    const F = $(() => c.selectedPlatform === "android" ? v.value : c.selectedPlatform === "ios" ? y.value : _.value), te = $(() => (O[c.selectedPlatform] ?? O.web)[F.value] ?? { title: 60, body: 160 }), se = $(
      () => {
        var ee;
        return B((ee = T.value) == null ? void 0 : ee.title, te.value.title);
      }
    ), ce = $(
      () => {
        var ee;
        return B((ee = T.value) == null ? void 0 : ee.body, te.value.body);
      }
    ), D = { android: 3, ios: 4, web: 2 }, ae = $(
      () => {
        var ee;
        return Array.isArray((ee = T.value) == null ? void 0 : ee.actions) ? T.value.actions : [];
      }
    ), q = $(
      () => ae.value.slice(0, D[c.selectedPlatform] ?? 2)
    ), pe = $(
      () => Math.max(0, ae.value.length - q.value.length)
    ), W = $(() => {
      var ee;
      return (((ee = c.message) == null ? void 0 : ee.deep_link) ?? "").trim();
    }), J = $(() => W.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(W.value) : !1), Z = $(() => W.value ? W.value.length <= 40 ? W.value : `${W.value.slice(0, 37)}…` : ""), ne = $(() => {
      var k, E, N;
      const ee = [];
      return (k = c.delivery) != null && k.priority && ee.push(`Priority: ${c.delivery.priority}`), typeof ((E = c.delivery) == null ? void 0 : E.ttl) == "number" && ee.push(`TTL: ${c.delivery.ttl}s`), (N = c.delivery) != null && N.silent_push && ee.push("Silent push"), ee;
    }), ye = $(() => {
      var ie;
      const ee = (ie = T.value) == null ? void 0 : ie.location;
      if (!ee || ee.lat == null && ee.lon == null) return null;
      const k = Number(ee.lat) || 0, E = Number(ee.lon) || 0, N = 8e-3, be = [E - N, k - N, E + N, k + N].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(be)}&layer=mapnik&marker=${k},${E}`;
    }), _e = $(() => {
      var k;
      const ee = (k = T.value) == null ? void 0 : k.location;
      return ee && (ee.lat != null || ee.lon != null || ee.name || ee.address);
    });
    return (ee, k) => {
      var E, N, be, ie, x, M, w, le, ge, me, he, L, X, G, $e, ve;
      return a(), n("div", hl, [
        e("div", yl, [
          e("label", gl, [
            k[6] || (k[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            o.selectedPlatform === "android" ? je((a(), n("select", {
              key: 0,
              "onUpdate:modelValue": k[0] || (k[0] = (z) => v.value = z),
              class: "kb-preview__mode-select"
            }, [...k[3] || (k[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ke, v.value]
            ]) : o.selectedPlatform === "ios" ? je((a(), n("select", {
              key: 1,
              "onUpdate:modelValue": k[1] || (k[1] = (z) => y.value = z),
              class: "kb-preview__mode-select"
            }, [...k[4] || (k[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ke, y.value]
            ]) : je((a(), n("select", {
              key: 2,
              "onUpdate:modelValue": k[2] || (k[2] = (z) => _.value = z),
              class: "kb-preview__mode-select"
            }, [...k[5] || (k[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ke, _.value]
            ])
          ]),
          e("div", fl, [
            (a(!0), n(P, null, j(ne.value, (z) => (a(), n("span", {
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
          k[9] || (k[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ke(["kb-android-notification", { "kb-android-notification--expanded": I.value }])
          }, [
            k[8] || (k[8] = Je('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: ke(["kb-android-body", { "kb-android-body--expanded": I.value }])
            }, [
              I.value && T.value.imageUrl ? (a(), n("div", kl, [
                e("img", {
                  src: T.value.imageUrl,
                  alt: ""
                }, null, 8, _l)
              ])) : g("", !0),
              e("div", wl, [
                e("div", $l, [
                  se.value ? (a(), n("div", xl, d(se.value), 1)) : g("", !0),
                  ce.value ? (a(), n("div", Cl, d(ce.value), 1)) : g("", !0),
                  _e.value && !I.value && ((E = T.value.location) != null && E.name || (N = T.value.location) != null && N.address) ? (a(), n("div", Sl, [
                    k[7] || (k[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    K(" " + d(((be = T.value.location) == null ? void 0 : be.name) || ((ie = T.value.location) == null ? void 0 : ie.address)), 1)
                  ])) : g("", !0),
                  W.value ? (a(), n("div", {
                    key: 3,
                    class: ke(["kb-preview-link", { "kb-preview-link--invalid": !J.value }])
                  }, d(J.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0)
                ]),
                !I.value && T.value.imageUrl ? (a(), n("div", Il, [
                  e("img", {
                    src: T.value.imageUrl,
                    alt: ""
                  }, null, 8, Tl)
                ])) : g("", !0)
              ]),
              _e.value && ye.value && I.value ? (a(), n("div", Al, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Ul),
                (x = T.value.location) != null && x.name || (M = T.value.location) != null && M.address ? (a(), n("div", Rl, d(((w = T.value.location) == null ? void 0 : w.name) || ((le = T.value.location) == null ? void 0 : le.address)), 1)) : g("", !0)
              ])) : g("", !0),
              q.value.length ? (a(), n("div", El, [
                (a(!0), n(P, null, j(q.value, (z) => (a(), n("button", {
                  key: z.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, d(z.label || "Action"), 1))), 128))
              ])) : g("", !0),
              pe.value > 0 ? (a(), n("p", Pl, " Showing " + d(q.value.length) + " of " + d(ae.value.length) + " actions on " + d(o.selectedPlatform) + ". ", 1)) : g("", !0)
            ], 2)
          ], 2)
        ], 2)) : o.selectedPlatform === "ios" ? (a(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: ke(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${y.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          k[12] || (k[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", Bl, [
            k[11] || (k[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Ll, [
              k[10] || (k[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              se.value ? (a(), n("div", Ol, d(se.value), 1)) : g("", !0),
              ce.value ? (a(), n("div", Nl, d(ce.value), 1)) : g("", !0),
              W.value ? (a(), n("div", {
                key: 2,
                class: ke(["kb-preview-link", { "kb-preview-link--invalid": !J.value }])
              }, d(J.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0),
              _e.value && ye.value ? (a(), n("div", Ml, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Vl),
                (ge = T.value.location) != null && ge.name || (me = T.value.location) != null && me.address ? (a(), n("div", Dl, d(((he = T.value.location) == null ? void 0 : he.name) || ((L = T.value.location) == null ? void 0 : L.address)), 1)) : g("", !0)
              ])) : g("", !0),
              q.value.length ? (a(), n("div", Wl, [
                (a(!0), n(P, null, j(q.value, (z) => (a(), n("button", {
                  key: z.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, d(z.label || "Action"), 1))), 128))
              ])) : g("", !0),
              pe.value > 0 ? (a(), n("p", jl, " Showing " + d(q.value.length) + " of " + d(ae.value.length) + " actions on " + d(o.selectedPlatform) + ". ", 1)) : g("", !0)
            ]),
            T.value.imageUrl ? (a(), n("div", Hl, [
              e("img", {
                src: T.value.imageUrl,
                alt: ""
              }, null, 8, Fl)
            ])) : g("", !0)
          ])
        ], 2)) : (a(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: ke(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${_.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          k[14] || (k[14] = Je('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", ql, [
            k[13] || (k[13] = Je('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", zl, [
              se.value ? (a(), n("div", Yl, d(se.value), 1)) : g("", !0),
              ce.value ? (a(), n("div", Kl, d(ce.value), 1)) : g("", !0),
              W.value ? (a(), n("div", {
                key: 2,
                class: ke(["kb-preview-link", { "kb-preview-link--invalid": !J.value }])
              }, d(J.value ? Z.value : "Invalid deep link format"), 3)) : g("", !0),
              T.value.imageUrl ? (a(), n("div", Gl, [
                e("img", {
                  src: T.value.imageUrl,
                  alt: ""
                }, null, 8, Jl)
              ])) : g("", !0),
              _e.value && ye.value ? (a(), n("div", Ql, [
                e("iframe", {
                  src: ye.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Xl),
                (X = T.value.location) != null && X.name || (G = T.value.location) != null && G.address ? (a(), n("div", Zl, d((($e = T.value.location) == null ? void 0 : $e.name) || ((ve = T.value.location) == null ? void 0 : ve.address)), 1)) : g("", !0)
              ])) : g("", !0)
            ]),
            q.value.length ? (a(), n("div", eo, [
              (a(!0), n(P, null, j(q.value, (z, Ie) => (a(), n("button", {
                key: z.id || Ie,
                type: "button",
                class: ke(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Ie) > 0 }])
              }, d(z.label || "Action"), 3))), 128))
            ])) : g("", !0),
            pe.value > 0 ? (a(), n("p", to, " Showing " + d(q.value.length) + " of " + d(ae.value.length) + " actions on " + d(o.selectedPlatform) + ". ", 1)) : g("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), no = /* @__PURE__ */ Pe(ao, [["__scopeId", "data-v-4fc616d9"]]), so = { class: "kb-version-dialog" }, lo = {
  key: 0,
  class: "kb-version-empty"
}, oo = {
  key: 1,
  class: "kb-version-list"
}, io = { class: "kb-version-item-label" }, ro = ["onClick"], uo = { class: "kb-version-actions" }, co = /* @__PURE__ */ Ee({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(o, { emit: c }) {
    const v = c;
    function y(_) {
      try {
        return new Date(_).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return _;
      }
    }
    return (_, I) => o.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: I[1] || (I[1] = aa((U) => v("close"), ["escape"]))
    }, [
      e("div", so, [
        I[2] || (I[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        I[3] || (I[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        o.versions.length === 0 ? (a(), n("div", lo, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", oo, [
          (a(!0), n(P, null, j(o.versions, (U) => (a(), n("li", {
            key: U.id,
            class: "kb-version-item"
          }, [
            e("span", io, d(U.label || y(U.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (T) => {
                v("restore", U.snapshot), v("close");
              }
            }, " Restore ", 8, ro)
          ]))), 128))
        ])),
        e("div", uo, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: I[0] || (I[0] = (U) => v("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : g("", !0);
  }
}), Jt = /* @__PURE__ */ Pe(co, [["__scopeId", "data-v-ce35a513"]]), At = [
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
], Ut = [
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
], Rt = [
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
}, Ao = { class: "kb-push-canvas" }, Uo = {
  key: 0,
  class: "kb-push-test-banner"
}, Ro = { class: "kb-push-preview-chrome" }, Eo = { class: "kb-push-preview-controls" }, Po = { class: "kb-push-preview-as" }, Bo = ["value"], Lo = { class: "kb-preview-status" }, Oo = {
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
}, Fo = { class: "kb-confirm-dialog" }, qo = { class: "kb-confirm-actions" }, zo = /* @__PURE__ */ Ee({
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
    const v = o, y = c, _ = ue("android"), I = ue(""), U = ue(!1), T = ue(null), O = ue(!1), B = $(
      () => D.value.workflow_status ?? "draft"
    ), F = $(() => {
      const s = I.value;
      return s ? et.find((l) => l.id === s) ?? null : null;
    });
    function te(s) {
      const l = D.value, f = s.campaign.message ? { ...l.message, ...s.campaign.message } : l.message, h = s.campaign.delivery ? { ...l.delivery, ...s.campaign.delivery } : l.delivery;
      W({
        ...s.campaign,
        message: f,
        delivery: h
      }), T.value = null, U.value = !1;
    }
    function se(s) {
      const l = s.target.value;
      if (!l) return;
      const f = At.find((h) => h.id === l);
      f && (ae.value ? (T.value = f, U.value = !0) : te(f), s.target.value = "");
    }
    function ce(s) {
      D.value = s, O.value = !1;
    }
    const {
      campaign: D,
      dirty: ae,
      customValidatorErrors: q,
      getValidationWithWarnings: pe,
      update: W,
      updateMessage: J,
      updateDelivery: Z,
      undo: ne,
      redo: ye,
      canUndo: _e,
      canRedo: ee,
      resetMessage: k,
      resetDelivery: E,
      getPreview: N,
      characterLimits: be,
      hooks: ie
    } = ut({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (s) => {
          var h, V, m, i;
          const l = [];
          (h = s.name) != null && h.trim() || l.push("Template name is required"), (m = (V = s.message) == null ? void 0 : V.body) != null && m.trim() || l.push("Message body is required");
          const f = (i = v.hooks) != null && i.customValidators ? await v.hooks.customValidators(s) : [];
          return [...l, ...f];
        }
      },
      onDirty: () => y("change", D.value)
    }), { lastSavedAt: x } = dt(D, { channel: "push" });
    function M(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ye() : ne());
    }
    st(() => {
      window.addEventListener("keydown", M);
    }), lt(() => {
      window.removeEventListener("keydown", M);
    }), Le(D, (s) => y("update:modelValue", s), { deep: !0 });
    const w = ue(), le = ue(!0), ge = ue(!0);
    async function me() {
      if (ie.estimateReach)
        try {
          w.value = await ie.estimateReach(D.value.audience);
        } catch {
          w.value = void 0;
        }
      ie.canSend && (le.value = await Promise.resolve(ie.canSend())), ie.canSchedule && (ge.value = await Promise.resolve(ie.canSchedule()));
    }
    me(), Le(() => D.value.audience, me, { deep: !0 });
    const he = $(() => (q.value, pe(w.value))), L = $(() => he.value.blockingErrors), X = $(() => he.value.warnings), G = $(() => he.value.valid), $e = $(() => {
      var h, V, m;
      const s = D.value.message, l = [
        !!((h = D.value.name) != null && h.trim()),
        !!((V = s.title) != null && V.trim()),
        !!((m = s.body) != null && m.trim()),
        !!(s.template_type ?? D.value.template_type),
        Array.isArray(s.actions) ? s.actions.length > 0 : !1
      ], f = l.filter(Boolean).length;
      return Math.round(f / l.length * 100);
    }), ve = $(() => $e.value >= 90 ? "Production ready" : $e.value >= 70 ? "Strong draft" : $e.value >= 40 ? "In progress" : "Needs setup"), z = $(() => {
      const s = D.value.message;
      return !!((s.title ?? "").toString().trim() || (s.body ?? "").toString().trim() || Array.isArray(s.actions) && s.actions.length);
    }), Ie = $(
      () => be[_.value].title
    ), Ue = $(() => be[_.value].body), Be = $(() => D.value.message.title.length), De = $(() => D.value.message.body.length), Re = $(() => {
      if (Be.value > Ie.value)
        return `Title exceeds ${Ie.value} characters for ${_.value}.`;
    }), Ne = $(() => {
      const s = L.value.find(
        (l) => l.message === "Message body is required"
      );
      if (s) return s.message;
      if (De.value > Ue.value)
        return `Body exceeds ${Ue} characters for ${_.value}.`;
    }), He = $(
      () => D.value.template_type ?? "transactional"
    );
    function We(s) {
      W({ template_type: s });
    }
    function Fe(s) {
      W({
        name: s,
        tracking: { ...D.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Me(s) {
      const l = ` {{ .${s.variable} }}`, f = D.value.message.variables ?? [], h = Array.from(/* @__PURE__ */ new Set([...f, s.variable]));
      s.field === "title" ? J({
        title: D.value.message.title + l,
        variables: h
      }) : J({
        body: D.value.message.body + l,
        variables: h
      });
    }
    function oe() {
      G.value && y("save", D.value);
    }
    return (s, l) => {
      var f;
      return a(), n("div", mo, [
        e("div", vo, [
          Oe(ct, {
            "campaign-name": C(D).name,
            status: C(D).status,
            dirty: C(ae),
            "last-saved-at": C(x),
            "can-undo": C(_e),
            "can-redo": C(ee),
            "workflow-status": B.value,
            "slugify-name": v.enforceSlugName,
            "onUpdate:campaignName": Fe,
            "onUpdate:workflowStatus": l[0] || (l[0] = (h) => C(W)({ workflow_status: h })),
            onUndo: C(ne),
            onRedo: C(ye)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          L.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: C(Ae).dangerBg,
              border: `1px solid ${C(Ae).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(xe)[12]}px ${C(xe)[16]}px`,
              marginBottom: `${C(xe)[16]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: C(Ae).danger })
            }, [
              (a(!0), n(P, null, j(L.value, (h) => (a(), n("li", {
                key: h.message
              }, d(h.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", bo, [
          e("aside", ho, [
            o.disabledSections.includes("message") ? g("", !0) : (a(), n("div", yo, [
              !C(D).message.title && !C(D).message.body ? (a(), n("div", go, " Add a title and message below to get started. ")) : g("", !0),
              e("div", fo, [
                e("div", ko, [
                  l[12] || (l[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", _o, d(ve.value), 1)
                ]),
                e("div", wo, [
                  Oe(_t, {
                    "template-type": He.value,
                    onUpdate: We
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: se
                  }, [
                    l[13] || (l[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, j(C(At), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, $o))), 128))
                  ], 32)
                ]),
                e("div", xo, [
                  e("div", Co, [
                    l[14] || (l[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", So, d($e.value) + "%", 1)
                  ]),
                  e("div", Io, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: Ce({ width: `${$e.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(ks, {
                message: C(D).message,
                "title-count": Be.value,
                "body-count": De.value,
                "title-limit": Ie.value,
                "body-limit": Ue.value,
                "selected-platform": _.value,
                "show-reset": !0,
                "title-error": Re.value,
                "body-error": Ne.value,
                onUpdate: C(J),
                onReset: l[1] || (l[1] = (h) => C(k)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Oe(Gt, {
                message: C(D).message,
                "variable-options": o.variableOptions,
                onUpdate: C(J),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !o.designOnly && !o.disabledSections.includes("delivery") ? (a(), n("div", To, [
              l[15] || (l[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Oe(ol, {
                delivery: C(D).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: C(Z),
                onReset: l[2] || (l[2] = (h) => C(E)())
              }, null, 8, ["delivery", "onUpdate"]),
              Oe(bl, {
                delivery: C(D).delivery,
                onUpdate: C(Z)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : g("", !0)
          ]),
          e("main", Ao, [
            !o.designOnly && C(D).audience.test_mode ? (a(), n("div", Uo, [...l[16] || (l[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Ro, [
              e("div", Eo, [
                e("label", Po, [
                  l[18] || (l[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[3] || (l[3] = (h) => I.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[17] || (l[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, j(C(et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, Bo))), 128))
                  ], 512), [
                    [Ke, I.value]
                  ])
                ]),
                e("div", Lo, [
                  l[19] || (l[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(_.value), 1)
                ])
              ]),
              e("div", Oo, [
                (a(), n(P, null, j(["android", "ios", "web"], (h) => e("button", {
                  key: h,
                  type: "button",
                  class: ke(["kb-push-device-btn", { "kb-push-device-btn--active": _.value === h }]),
                  role: "tab",
                  "aria-selected": _.value === h,
                  "aria-controls": `kb-preview-panel-${h}`,
                  onClick: (V) => _.value = h
                }, d(h.toUpperCase()), 11, No)), 64))
              ]),
              e("div", {
                class: ke(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !z.value }])
              }, [
                !C(D).message.title && !C(D).message.body ? (a(), n("div", Mo, [...l[20] || (l[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), na(no, {
                  key: 1,
                  "get-preview": C(N),
                  "selected-platform": _.value,
                  "preview-profile": F.value,
                  message: C(D).message,
                  delivery: C(D).delivery,
                  "onUpdate:selectedPlatform": l[4] || (l[4] = (h) => _.value = h)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Vo, [
          X.value.length > 0 ? (a(), n("div", Do, [
            l[21] || (l[21] = e("strong", null, "Warning:", -1)),
            K(" " + d((f = X.value[0]) == null ? void 0 : f.message) + " ", 1),
            X.value.length > 1 ? (a(), n("span", Wo, " (+" + d(X.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", jo, [
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
              onClick: l[6] || (l[6] = (h) => y("save-version", JSON.parse(JSON.stringify(C(D)))))
            }, " Save as version ")) : g("", !0),
            o.showDuplicate ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[7] || (l[7] = (h) => y("duplicate", JSON.parse(JSON.stringify(C(D)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: oe
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: l[8] || (l[8] = (h) => y("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        U.value ? (a(), n("div", Ho, [
          e("div", Fo, [
            l[22] || (l[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[23] || (l[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", qo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: l[9] || (l[9] = (h) => {
                  U.value = !1, T.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: l[10] || (l[10] = (h) => T.value && te(T.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0),
        Oe(Jt, {
          open: O.value,
          versions: o.versions,
          onClose: l[11] || (l[11] = (h) => O.value = !1),
          onRestore: ce
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Qt = /* @__PURE__ */ Pe(zo, [["__scopeId", "data-v-18771e1a"]]), Yo = { class: "kb-section" }, Ko = { class: "kb-section__head" }, Go = { class: "kb-summary-bar" }, Jo = { class: "kb-pill kb-pill--category" }, Qo = { class: "kb-pill kb-pill--format" }, Xo = { class: "kb-pill kb-pill--status" }, Zo = { class: "kb-field" }, ei = ["value"], ti = ["value", "disabled"], ai = { class: "kb-field" }, ni = { class: "kb-label" }, si = { class: "kb-helper" }, li = ["value"], oi = ["value"], ii = { class: "kb-field" }, ri = ["value"], ui = { class: "kb-field kb-field--inline kb-field--language-limits" }, di = { class: "kb-field-half" }, ci = ["value"], pi = { class: "kb-field" }, mi = ["value"], vi = { class: "kb-field kb-field--toggles" }, bi = { class: "kb-toggle-row" }, hi = ["checked"], yi = {
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
}, Ai = ["value"], Ui = {
  key: 3,
  class: "kb-field"
}, Ri = ["value"], Ei = { class: "kb-mu" }, Pi = { class: "kb-mu__text kb-mu__text--file" }, Bi = { class: "kb-mu__size" }, Li = { class: "kb-mu__text kb-mu__text--hint" }, Oi = { class: "kb-mu__right" }, Ni = ["disabled"], Mi = {
  key: 0,
  class: "kb-mu__spinner",
  "aria-hidden": "true"
}, Vi = {
  key: 0,
  class: "kb-mu__error"
}, Di = {
  key: 4,
  class: "kb-field"
}, Wi = ["value"], ji = {
  key: 5,
  class: "kb-field"
}, Hi = ["value"], Fi = {
  key: 6,
  class: "kb-field"
}, qi = ["value"], zi = {
  key: 7,
  class: "kb-field"
}, Yi = ["value"], Ki = ["value"], Gi = {
  key: 8,
  class: "kb-field"
}, Ji = { class: "kb-wa-buttons" }, Qi = { class: "kb-carousel-card__head" }, Xi = { class: "kb-carousel-card__num" }, Zi = ["onClick"], er = { class: "kb-field-inline-2" }, tr = ["value", "onChange"], ar = ["value", "onInput"], nr = ["value", "onInput"], sr = ["value", "onInput"], lr = { class: "kb-carousel-card__btns" }, or = ["value", "onInput"], ir = ["value", "onChange"], rr = ["value", "onInput"], ur = ["value", "onInput"], dr = ["onClick"], cr = ["disabled", "onClick"], pr = ["disabled"], mr = {
  key: 9,
  class: "kb-field"
}, vr = { class: "kb-wa-buttons" }, br = ["value", "onInput"], hr = ["value", "onInput"], yr = ["onClick"], gr = {
  key: 10,
  class: "kb-field"
}, fr = ["value"], kr = ["value"], _r = { class: "kb-auth-options" }, wr = { class: "kb-toggle-row" }, $r = ["checked"], xr = { class: "kb-auth-expiry" }, Cr = ["value"], Sr = { class: "kb-field" }, Ir = { class: "kb-label" }, Tr = { class: "kb-input-with-var" }, Ar = ["value"], Ur = { class: "kb-var-picker-wrap" }, Rr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Er = ["onClick"], Pr = { class: "kb-field" }, Br = ["value"], Lr = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, Or = { class: "kb-wa-fields-list" }, Nr = { class: "kb-wa-field-name" }, Mr = { class: "kb-wa-field-status" }, Vr = {
  key: 12,
  class: "kb-field"
}, Dr = { class: "kb-input-with-var" }, Wr = ["value"], jr = { class: "kb-var-picker-wrap" }, Hr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Fr = ["onClick"], qr = {
  key: 13,
  class: "kb-field"
}, zr = { class: "kb-label" }, Yr = { class: "kb-helper" }, Kr = { class: "kb-wa-buttons" }, Gr = { class: "kb-input-with-var kb-input-with-var--btn" }, Jr = ["value", "onInput"], Qr = { class: "kb-var-picker-wrap" }, Xr = ["onClick"], Zr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, eu = ["onClick"], tu = ["value", "onChange"], au = ["value"], nu = ["value", "onInput"], su = ["value", "onInput"], lu = ["value", "onInput"], ou = ["value", "onInput"], iu = ["value", "onChange"], ru = ["value", "onInput"], uu = ["value", "onInput"], du = ["value", "onInput"], cu = {
  key: 4,
  class: "kb-opt-out-note"
}, pu = ["onClick"], mu = ["disabled"], vt = 60, bt = 1024, ht = 60, Et = 10, Pt = 10, vu = /* @__PURE__ */ Ee({
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
    const v = o, y = c, _ = [
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
    ], I = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], U = {
      marketing: ["text", "image", "video", "document", "carousel", "flow", "lto", "catalog", "mpm"],
      utility: ["text", "image", "video", "document", "flow"],
      authentication: ["auth"]
    }, T = {
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
    ], B = $(() => v.message), F = $(() => B.value.template_type ?? "text"), te = $(() => String(B.value.template_category ?? "marketing").trim()), se = $(() => B.value.header_type ?? "none"), ce = $(() => String(B.value.header ?? "")), D = $(() => String(B.value.body ?? "")), ae = $(() => String(B.value.footer ?? "")), q = $(() => B.value.buttons ?? []), pe = $(() => B.value.products ?? []), W = $(() => B.value.cards ?? []), J = $(() => {
      const m = _.find((i) => i.value === F.value);
      return (m == null ? void 0 : m.hint) ?? "Choose the approved WhatsApp template format.";
    }), Z = $(() => {
      const m = String(B.value.template_category ?? "").trim();
      return m ? m.charAt(0).toUpperCase() + m.slice(1) : "Uncategorized";
    }), ne = $(() => {
      const m = _.find((i) => i.value === F.value);
      return (m == null ? void 0 : m.label) ?? "Text";
    }), ye = $(() => B.value.template_name ? D.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), _e = $(() => new Set((v.disabledCategories ?? []).map((m) => String(m).trim()))), ee = $(() => new Set((v.disabledFormats ?? []).map((m) => String(m).trim()))), k = $(() => {
      const m = new Set(U[te.value] ?? U.marketing);
      return _.filter((i) => m.has(i.value) && !ee.value.has(i.value));
    }), E = $(() => {
      const m = new Set(T[te.value] ?? T.marketing);
      return O.filter((i) => m.has(i.value));
    }), N = $(() => te.value === "authentication" ? 1 : Et), be = $(() => te.value === "authentication");
    function ie(m) {
      if (!m || typeof m != "string") return [];
      const i = /\{\{\s*([^}]+?)\s*\}\}/g, p = /* @__PURE__ */ new Set();
      let A;
      for (; (A = i.exec(m)) !== null; ) p.add(A[1].trim());
      return Array.from(p);
    }
    const x = $(() => {
      const m = v.message.header ?? "", i = v.message.body ?? v.message.body ?? "", p = new Set(v.message.variables ?? []), A = [...ie(m), ...ie(i)];
      return Array.from(new Set(A)).map((re) => ({ name: re, configured: p.has(re) }));
    }), M = [
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
    ], w = $(() => {
      const m = (v.message.variables ?? []).filter(Boolean);
      return m.length ? Array.from(new Set(m)) : M;
    }), le = ue(null), ge = ue(null), me = ue(null), he = ue("idle"), L = ue(""), X = ue(!1);
    function G(m) {
      var p;
      const i = m.target;
      me.value = ((p = i.files) == null ? void 0 : p[0]) ?? null, he.value = "idle", L.value = "";
    }
    function $e(m) {
      var p, A;
      X.value = !1;
      const i = ((A = (p = m.dataTransfer) == null ? void 0 : p.files) == null ? void 0 : A[0]) ?? null;
      i && (me.value = i, he.value = "idle", L.value = "");
    }
    async function ve() {
      if (!(!me.value || !v.mediaUploadUrl)) {
        he.value = "uploading", L.value = "";
        try {
          const m = new FormData();
          m.append("file", me.value);
          const i = await fetch(v.mediaUploadUrl, {
            method: "POST",
            headers: v.mediaUploadHeaders ?? {},
            body: m
          });
          if (!i.ok) {
            const R = await i.text().catch(() => i.statusText);
            throw new Error(`${i.status}: ${R}`);
          }
          const p = await i.json(), A = p.mediaId ?? p.media_id ?? p.handle ?? p.id;
          if (!A) throw new Error(`No mediaId in response: ${JSON.stringify(p)}`);
          z({ media_handle: A }), he.value = "done", me.value = null, ge.value && (ge.value.value = "");
        } catch (m) {
          he.value = "error", L.value = m instanceof Error ? m.message : String(m);
        }
      }
    }
    function z(m) {
      y("update", m);
    }
    function Ie(m) {
      le.value = le.value === m ? null : m;
    }
    function Ue(m, i) {
      var re;
      const p = ` {{ .${i} }}`, A = (v.message.variables ?? []).filter(Boolean), R = Array.from(/* @__PURE__ */ new Set([...A, i]));
      if (m === "header")
        z({ header: `${ce.value || ""}${p}`, variables: R });
      else if (m === "body")
        z({ body: `${D.value || ""}${p}`, variables: R });
      else if (m === "footer")
        z({ footer: `${ae.value || ""}${p}`, variables: R });
      else if (m.startsWith("btn-label:")) {
        const we = Number(m.split(":")[1]);
        Number.isFinite(we) && Re(we, { label: `${String(((re = q.value[we]) == null ? void 0 : re.label) ?? "")}${p}` }), z({ variables: R });
      }
      le.value = null;
    }
    function Be(m) {
      const i = {
        template_category: m || void 0
      };
      new Set(U[m] ?? U.marketing).has(F.value) ? m === "authentication" && F.value !== "auth" && (i.template_type = "auth") : i.template_type = m === "authentication" ? "auth" : "text", m === "authentication" && (i.header_type = void 0, i.header = void 0, i.footer = void 0, i.allow_category_change = void 0, i.media_url = void 0, i.media_handle = void 0, i.media_caption = void 0, i.document_filename = void 0);
      const A = new Set(T[m] ?? T.marketing), R = q.value.filter((re) => A.has(re.type ?? "quick_reply"));
      R.length !== q.value.length && (i.buttons = R), z(i);
    }
    function De(m) {
      const i = { template_type: m };
      m === "auth" && (i.template_category = "authentication"), m === "image" || m === "video" || m === "document" ? i.header_type = m : (se.value === "image" || se.value === "video" || se.value === "document") && (i.header_type = "none"), z(i);
    }
    function Re(m, i) {
      var A;
      const p = [...q.value];
      p[m] = {
        ...p[m],
        id: ((A = p[m]) == null ? void 0 : A.id) || `btn_${m + 1}`,
        ...i
      }, z({ buttons: p });
    }
    function Ne(m) {
      const i = [...q.value];
      i.splice(m, 1), z({ buttons: i });
    }
    function He() {
      var p;
      if (q.value.length >= N.value) return;
      const m = ((p = E.value[0]) == null ? void 0 : p.value) ?? "quick_reply", i = [...q.value];
      i.push({ id: `btn_${i.length + 1}`, label: "", type: m }), z({ buttons: i });
    }
    function We(m, i) {
      var A;
      const p = [...pe.value];
      p[m] = {
        ...p[m],
        id: ((A = p[m]) == null ? void 0 : A.id) || `prod_${m + 1}`,
        ...i
      }, z({ products: p });
    }
    function Fe(m) {
      const i = [...pe.value];
      i.splice(m, 1), z({ products: i });
    }
    function Me() {
      const m = [...pe.value];
      m.push({ id: `prod_${m.length + 1}`, productId: "" }), z({ products: m });
    }
    function oe(m, i) {
      var A;
      const p = [...W.value];
      p[m] = {
        ...p[m],
        id: ((A = p[m]) == null ? void 0 : A.id) || `card_${m + 1}`,
        ...i
      }, z({ cards: p });
    }
    function s(m) {
      const i = [...W.value];
      i.splice(m, 1), z({ cards: i });
    }
    function l() {
      const m = [...W.value];
      m.push({
        id: `card_${m.length + 1}`,
        headerType: "IMAGE",
        mediaId: "",
        body: "",
        sampleText: "",
        buttons: []
      }), z({ cards: m });
    }
    function f(m) {
      const i = [...W.value], p = { ...i[m] };
      p.buttons = [...p.buttons ?? [], { type: "QUICK_REPLY", label: "" }], i[m] = p, z({ cards: i });
    }
    function h(m, i) {
      const p = [...W.value], A = { ...p[m] };
      A.buttons = [...A.buttons ?? []], A.buttons.splice(i, 1), p[m] = A, z({ cards: p });
    }
    function V(m, i, p) {
      const A = [...W.value], R = { ...A[m] };
      R.buttons = [...R.buttons ?? []], R.buttons[i] = { ...R.buttons[i], ...p }, A[m] = R, z({ cards: A });
    }
    return (m, i) => (a(), n("section", Yo, [
      e("div", Ko, [
        i[32] || (i[32] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        o.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: i[0] || (i[0] = (p) => m.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      i[78] || (i[78] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Go, [
        e("span", Jo, d(Z.value), 1),
        e("span", Qo, d(ne.value), 1),
        e("span", Xo, d(ye.value), 1)
      ]),
      e("div", Zo, [
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
          (a(), n(P, null, j(I, (p) => e("option", {
            key: p.value,
            value: p.value,
            disabled: _e.value.has(p.value)
          }, d(p.label) + d(_e.value.has(p.value) ? " (Disabled)" : ""), 9, ti)), 64))
        ], 40, ei)
      ]),
      e("div", ai, [
        e("label", ni, [
          i[35] || (i[35] = K(" Functional format ", -1)),
          e("span", si, d(J.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: F.value,
          onChange: i[2] || (i[2] = (p) => De(p.target.value))
        }, [
          (a(!0), n(P, null, j(k.value, (p) => (a(), n("option", {
            key: p.value,
            value: p.value
          }, d(p.label), 9, oi))), 128))
        ], 40, li)
      ]),
      e("div", ii, [
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
        }, null, 8, ri)
      ]),
      e("div", ui, [
        e("div", di, [
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
          }, null, 40, ci)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            i[38] || (i[38] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + d(vt) + " chars"),
              e("li", null, "Body: " + d(bt) + " chars"),
              e("li", null, "Footer: " + d(ht) + " chars"),
              e("li", null, "Buttons: up to " + d(Et))
            ])
          ])
        ])
      ]),
      e("div", pi, [
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
        }, null, 40, mi)
      ]),
      e("div", vi, [
        i[42] || (i[42] = e("label", { class: "kb-label" }, "Submission options", -1)),
        e("label", bi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!B.value.enable_sample,
            onChange: i[5] || (i[5] = (p) => z({ enable_sample: p.target.checked || void 0 }))
          }, null, 40, hi),
          i[40] || (i[40] = e("span", { class: "kb-toggle-label" }, "Include sample data in Meta review", -1))
        ]),
        be.value ? g("", !0) : (a(), n("label", yi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!B.value.allow_category_change,
            onChange: i[6] || (i[6] = (p) => z({ allow_category_change: p.target.checked || void 0 }))
          }, null, 40, gi),
          i[41] || (i[41] = e("span", { class: "kb-toggle-label" }, "Allow Meta to re-categorize this template", -1))
        ]))
      ]),
      be.value ? g("", !0) : (a(), n("div", fi, [
        i[44] || (i[44] = e("label", { class: "kb-label" }, [
          K(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: se.value,
          onChange: i[7] || (i[7] = (p) => z({ header_type: p.target.value }))
        }, [...i[43] || (i[43] = [
          Je('<option value="none" data-v-b4100bee>No header</option><option value="text" data-v-b4100bee>Text header</option><option value="image" data-v-b4100bee>Image header</option><option value="video" data-v-b4100bee>Video header</option><option value="document" data-v-b4100bee>Document header</option>', 5)
        ])], 40, ki)
      ])),
      se.value === "text" ? (a(), n("div", _i, [
        e("label", wi, [
          i[45] || (i[45] = K(" Header text ", -1)),
          e("span", {
            class: ke(["kb-counter", { "kb-counter--warn": ce.value.length > vt }])
          }, d(ce.value.length) + "/" + d(vt), 3)
        ]),
        e("div", $i, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: ce.value,
            onInput: i[8] || (i[8] = (p) => z({
              header: p.target.value || void 0
            }))
          }, null, 40, xi),
          e("div", Ci, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: i[9] || (i[9] = (p) => Ie("header"))
            }, "{{ .var }}"),
            le.value === "header" ? (a(), n("div", Si, [
              (a(!0), n(P, null, j(w.value, (p) => (a(), n("button", {
                key: `wa-header-var-${p}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (A) => Ue("header", p)
              }, d(p), 9, Ii))), 128))
            ])) : g("", !0)
          ])
        ])
      ])) : g("", !0),
      ["image", "video", "document"].includes(se.value) || ["image", "video", "document"].includes(F.value) ? (a(), n("div", Ti, [
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
        }, null, 40, Ai)
      ])) : g("", !0),
      ["image", "video", "document"].includes(se.value) || ["image", "video", "document"].includes(F.value) ? (a(), n("div", Ui, [
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
        }, null, 40, Ri),
        e("div", Ei, [
          e("input", {
            ref_key: "mediaUploadFileRef",
            ref: ge,
            type: "file",
            class: "kb-mu__file-input",
            accept: "image/jpeg,image/png,video/mp4,application/pdf",
            onChange: G
          }, null, 544),
          e("div", {
            class: ke(["kb-mu__row", {
              "kb-mu__row--drag": X.value,
              "kb-mu__row--done": he.value === "done",
              "kb-mu__row--error": he.value === "error"
            }]),
            onDragover: i[16] || (i[16] = Ye((p) => X.value = !0, ["prevent"])),
            onDragleave: i[17] || (i[17] = Ye((p) => X.value = !1, ["prevent"])),
            onDrop: Ye($e, ["prevent"])
          }, [
            e("div", {
              class: "kb-mu__left",
              onClick: i[12] || (i[12] = (p) => {
                var A;
                return o.mediaUploadUrl ? (A = ge.value) == null ? void 0 : A.click() : void 0;
              })
            }, [
              he.value === "done" ? (a(), n(P, { key: 0 }, [
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
              ], 64)) : me.value ? (a(), n(P, { key: 1 }, [
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
                e("span", Pi, d(me.value.name), 1),
                e("span", Bi, d((me.value.size / 1024).toFixed(0)) + " KB", 1)
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
                e("span", Li, d(o.mediaUploadUrl ? X.value ? "Drop file" : "Click or drop · JPEG PNG MP4 PDF" : "Set mediaUploadUrl to enable uploads"), 1)
              ], 64))
            ]),
            e("div", Oi, [
              he.value === "done" ? (a(), n("button", {
                key: 0,
                type: "button",
                class: "kb-mu__btn kb-mu__btn--ghost",
                onClick: i[13] || (i[13] = (p) => {
                  he.value = "idle", me.value = null, ge.value && (ge.value.value = "");
                })
              }, " Upload another ")) : me.value ? (a(), n(P, { key: 1 }, [
                e("button", {
                  type: "button",
                  class: "kb-mu__btn kb-mu__btn--ghost",
                  onClick: i[14] || (i[14] = Ye((p) => {
                    me.value = null, he.value = "idle", L.value = "", ge.value && (ge.value.value = "");
                  }, ["stop"]))
                }, " Clear "),
                e("button", {
                  type: "button",
                  class: "kb-mu__btn kb-mu__btn--primary",
                  disabled: he.value === "uploading",
                  onClick: ve
                }, [
                  he.value === "uploading" ? (a(), n("span", Mi)) : g("", !0),
                  K(" " + d(he.value === "uploading" ? "Uploading…" : "Get handle"), 1)
                ], 8, Ni)
              ], 64)) : o.mediaUploadUrl ? (a(), n("button", {
                key: 2,
                type: "button",
                class: "kb-mu__btn kb-mu__btn--ghost",
                onClick: i[15] || (i[15] = (p) => {
                  var A;
                  return (A = ge.value) == null ? void 0 : A.click();
                })
              }, " Browse ")) : g("", !0)
            ])
          ], 34),
          he.value === "error" ? (a(), n("p", Vi, [
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
      se.value === "document" || F.value === "document" ? (a(), n("div", Di, [
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
        }, null, 40, Wi)
      ])) : g("", !0),
      ["image", "video", "document"].includes(se.value) || ["image", "video", "document"].includes(F.value) ? (a(), n("div", ji, [
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
        }, null, 40, Hi)
      ])) : g("", !0),
      F.value === "lto" ? (a(), n("div", Fi, [
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
        }, null, 40, qi)
      ])) : g("", !0),
      F.value === "flow" ? (a(), n("div", zi, [
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
        }, null, 40, Yi),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: B.value.flow_cta_label ?? "",
          onInput: i[22] || (i[22] = (p) => z({
            flow_cta_label: p.target.value || void 0
          }))
        }, null, 40, Ki)
      ])) : g("", !0),
      F.value === "carousel" ? (a(), n("div", Gi, [
        e("label", { class: "kb-label" }, [
          i[57] || (i[57] = K(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "MARKETING only. Each card requires a media header (IMAGE or VIDEO), body text, and can have URL + quick-reply buttons. Max " + d(Pt) + " cards.")
        ]),
        e("div", Ji, [
          (a(!0), n(P, null, j(W.value, (p, A) => (a(), n("div", {
            key: p.id || A,
            class: "kb-carousel-card"
          }, [
            e("div", Qi, [
              e("span", Xi, "Card " + d(A + 1), 1),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (R) => s(Number(A))
              }, "Remove", 8, Zi)
            ]),
            e("div", er, [
              e("div", null, [
                i[59] || (i[59] = e("label", { class: "kb-label kb-label--sm" }, "Header type", -1)),
                e("select", {
                  class: "kb-select",
                  value: p.headerType ?? "IMAGE",
                  onChange: (R) => oe(Number(A), { headerType: R.target.value })
                }, [...i[58] || (i[58] = [
                  e("option", { value: "IMAGE" }, "Image", -1),
                  e("option", { value: "VIDEO" }, "Video", -1)
                ])], 40, tr)
              ]),
              e("div", null, [
                i[60] || (i[60] = e("label", { class: "kb-label kb-label--sm" }, "Media handle ID", -1)),
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "e.g. 6462811350485912",
                  value: p.mediaId ?? "",
                  onInput: (R) => oe(Number(A), { mediaId: R.target.value })
                }, null, 40, ar)
              ])
            ]),
            e("div", null, [
              i[61] || (i[61] = e("label", { class: "kb-label kb-label--sm" }, "Card body", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body text with {{1}} variables",
                value: p.body ?? "",
                onInput: (R) => oe(Number(A), { body: R.target.value })
              }, null, 40, nr)
            ]),
            e("div", null, [
              i[62] || (i[62] = e("label", { class: "kb-label kb-label--sm" }, "Sample text (body with real values for Meta approval)", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body with real values filled in",
                value: p.sampleText ?? "",
                onInput: (R) => oe(Number(A), { sampleText: R.target.value })
              }, null, 40, sr)
            ]),
            e("div", lr, [
              i[64] || (i[64] = e("label", { class: "kb-label kb-label--sm" }, "Card buttons", -1)),
              (a(!0), n(P, null, j(p.buttons ?? [], (R, re) => (a(), n("div", {
                key: re,
                class: "kb-wa-button-row kb-wa-button-row--sm"
              }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-label",
                  placeholder: "Button label",
                  value: R.label ?? "",
                  onInput: (we) => V(Number(A), Number(re), { label: we.target.value })
                }, null, 40, or),
                e("select", {
                  class: "kb-select kb-select--btn-type",
                  value: R.type ?? "QUICK_REPLY",
                  onChange: (we) => V(Number(A), Number(re), { type: we.target.value })
                }, [...i[63] || (i[63] = [
                  e("option", { value: "QUICK_REPLY" }, "Quick reply", -1),
                  e("option", { value: "URL" }, "Visit URL", -1)
                ])], 40, ir),
                R.type === "URL" ? (a(), n(P, { key: 0 }, [
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "https://example.com/shop?promo={{1}}",
                    value: R.url ?? "",
                    onInput: (we) => V(Number(A), Number(re), { url: we.target.value })
                  }, null, 40, rr),
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "Example URL (e.g. https://example.com/shop?promo=SUMMER23)",
                    value: R.url_example ?? "",
                    onInput: (we) => V(Number(A), Number(re), { url_example: we.target.value })
                  }, null, 40, ur)
                ], 64)) : g("", !0),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-remove",
                  onClick: (we) => h(Number(A), Number(re))
                }, "Remove", 8, dr)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "kb-wa-btn-add",
                disabled: (p.buttons ?? []).length >= 2,
                onClick: (R) => f(Number(A))
              }, " Add button ", 8, cr)
            ])
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: W.value.length >= Pt,
            onClick: l
          }, " Add card ", 8, pr)
        ])
      ])) : g("", !0),
      ["mpm", "catalog"].includes(F.value) ? (a(), n("div", mr, [
        i[65] || (i[65] = e("label", { class: "kb-label" }, [
          K(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", vr, [
          (a(!0), n(P, null, j(pe.value, (p, A) => (a(), n("div", {
            key: p.id || A,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: p.productId,
              onInput: (R) => We(Number(A), { productId: R.target.value })
            }, null, 40, br),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: p.sectionTitle,
              onInput: (R) => We(Number(A), { sectionTitle: R.target.value || void 0 })
            }, null, 40, hr),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (R) => Fe(Number(A))
            }, " Remove ", 8, yr)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: Me
          }, " Add product ")
        ])
      ])) : g("", !0),
      F.value === "auth" ? (a(), n("div", gr, [
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
        ])], 40, fr),
        e("input", {
          type: "text",
          class: "kb-input",
          style: { "margin-top": "0.5rem" },
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: B.value.auth_label ?? "",
          onInput: i[24] || (i[24] = (p) => z({
            auth_label: p.target.value || void 0
          }))
        }, null, 40, kr),
        e("div", _r, [
          e("label", wr, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!B.value.add_security_recommendation,
              onChange: i[25] || (i[25] = (p) => z({ add_security_recommendation: p.target.checked || void 0 }))
            }, null, 40, $r),
            i[67] || (i[67] = e("span", { class: "kb-toggle-label" }, "Add security recommendation (warns user not to share code)", -1))
          ]),
          e("div", xr, [
            i[68] || (i[68] = e("label", { class: "kb-label kb-label--sm" }, "Code expiration (minutes)", -1)),
            e("input", {
              type: "number",
              class: "kb-input kb-input--sm",
              placeholder: "e.g. 10",
              min: "1",
              value: B.value.code_expiration_minutes ?? "",
              onInput: i[26] || (i[26] = (p) => {
                const A = parseInt(p.target.value, 10);
                z({ code_expiration_minutes: isNaN(A) ? void 0 : A });
              })
            }, null, 40, Cr)
          ])
        ])
      ])) : g("", !0),
      e("div", Sr, [
        e("label", Ir, [
          i[70] || (i[70] = K(" Body ", -1)),
          i[71] || (i[71] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: ke(["kb-counter", { "kb-counter--warn": D.value.length > bt }])
          }, d(D.value.length) + "/" + d(bt), 3)
        ]),
        e("div", Tr, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
            value: D.value,
            onInput: i[27] || (i[27] = (p) => z({
              body: p.target.value || void 0
            }))
          }, null, 40, Ar),
          e("div", Ur, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: i[28] || (i[28] = (p) => Ie("body"))
            }, "{{ .var }}"),
            le.value === "body" ? (a(), n("div", Rr, [
              (a(!0), n(P, null, j(w.value, (p) => (a(), n("button", {
                key: `wa-body-var-${p}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (A) => Ue("body", p)
              }, d(p), 9, Er))), 128))
            ])) : g("", !0)
          ])
        ])
      ]),
      e("div", Pr, [
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
        }, null, 40, Br)
      ]),
      x.value.length > 0 ? (a(), n("div", Lr, [
        i[73] || (i[73] = e("label", { class: "kb-label" }, "Template fields", -1)),
        i[74] || (i[74] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", Or, [
          (a(!0), n(P, null, j(x.value, (p) => (a(), n("li", {
            key: p.name,
            class: ke(["kb-wa-field-item", { "kb-wa-field-item--ok": p.configured }])
          }, [
            e("span", Nr, d(p.name), 1),
            e("span", Mr, d(p.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : g("", !0),
      be.value ? g("", !0) : (a(), n("div", Vr, [
        i[75] || (i[75] = e("label", { class: "kb-label" }, [
          K(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("div", Dr, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: ae.value,
            onInput: i[30] || (i[30] = (p) => z({
              footer: p.target.value || void 0
            }))
          }, null, 40, Wr),
          e("div", jr, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: i[31] || (i[31] = (p) => Ie("footer"))
            }, "{{ .var }}"),
            le.value === "footer" ? (a(), n("div", Hr, [
              (a(!0), n(P, null, j(w.value, (p) => (a(), n("button", {
                key: `wa-footer-var-${p}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (A) => Ue("footer", p)
              }, d(p), 9, Fr))), 128))
            ])) : g("", !0)
          ])
        ]),
        e("div", {
          class: ke(["kb-counter kb-counter--inline", { "kb-counter--warn": ae.value.length > ht }])
        }, d(ae.value.length) + "/" + d(ht), 3)
      ])),
      D.value.trim().length > 0 ? (a(), n("div", qr, [
        e("label", zr, [
          i[76] || (i[76] = K(" Buttons (optional) ", -1)),
          e("span", Yr, " Available types depend on the selected category. Max " + d(N.value) + " button" + d(N.value === 1 ? "" : "s") + ". ", 1)
        ]),
        e("div", Kr, [
          (a(!0), n(P, null, j(q.value, (p, A) => (a(), n("div", {
            key: p.id || A,
            class: "kb-wa-button-row"
          }, [
            e("div", Gr, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: p.label,
                onInput: (R) => Re(Number(A), { label: R.target.value })
              }, null, 40, Jr),
              e("div", Qr, [
                e("button", {
                  type: "button",
                  class: "kb-btn-insert",
                  onClick: (R) => Ie(`btn-label:${A}`)
                }, "{{ .var }}", 8, Xr),
                le.value === `btn-label:${A}` ? (a(), n("div", Zr, [
                  (a(!0), n(P, null, j(w.value, (R) => (a(), n("button", {
                    key: `wa-btn-label-var-${A}-${R}`,
                    type: "button",
                    class: "kb-var-menu-item",
                    onClick: (re) => Ue(`btn-label:${A}`, R)
                  }, d(R), 9, eu))), 128))
                ])) : g("", !0)
              ])
            ]),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: p.type ?? "quick_reply",
              onChange: (R) => Re(Number(A), { type: R.target.value })
            }, [
              (a(!0), n(P, null, j(E.value, (R) => (a(), n("option", {
                key: R.value,
                value: R.value
              }, d(R.label), 9, au))), 128))
            ], 40, tu),
            p.type === "url" ? (a(), n(P, { key: 0 }, [
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://example.com/path/{{1}}",
                value: p.url,
                onInput: (R) => Re(Number(A), { url: R.target.value || void 0 })
              }, null, 40, nu),
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "Example URL with real value (e.g. https://example.com/path/ORD-5531)",
                value: p.url_example,
                onInput: (R) => Re(Number(A), { url_example: R.target.value || void 0 })
              }, null, 40, su)
            ], 64)) : p.type === "call" ? (a(), n("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: p.phone,
              onInput: (R) => Re(Number(A), { phone: R.target.value || void 0 })
            }, null, 40, lu)) : p.type === "copy_code" ? (a(), n("input", {
              key: 2,
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Example coupon code (e.g. SAVE30DEC)",
              value: p.example,
              onInput: (R) => Re(Number(A), { example: R.target.value || void 0 })
            }, null, 40, ou)) : p.type === "otp" ? (a(), n(P, { key: 3 }, [
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: p.otp_type ?? "COPY_CODE",
                onChange: (R) => Re(Number(A), { otp_type: R.target.value })
              }, [...i[77] || (i[77] = [
                e("option", { value: "COPY_CODE" }, "Copy code", -1),
                e("option", { value: "ONE_TAP" }, "One-tap autofill", -1)
              ])], 40, iu),
              p.otp_type === "ONE_TAP" ? (a(), n(P, { key: 0 }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Autofill button text (e.g. Tap to autofill)",
                  value: p.autofill_text,
                  onInput: (R) => Re(Number(A), { autofill_text: R.target.value || void 0 })
                }, null, 40, ru),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Android package name (e.g. com.example.app)",
                  value: p.package_name,
                  onInput: (R) => Re(Number(A), { package_name: R.target.value || void 0 })
                }, null, 40, uu),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "App signature hash",
                  value: p.signature_hash,
                  onInput: (R) => Re(Number(A), { signature_hash: R.target.value || void 0 })
                }, null, 40, du)
              ], 64)) : g("", !0)
            ], 64)) : p.type === "opt_out" ? (a(), n("span", cu, " Sends a built-in opt-out action. ")) : g("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (R) => Ne(Number(A))
            }, " Remove ", 8, pu)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: q.value.length >= N.value,
            onClick: He
          }, " Add button ", 8, mu)
        ])
      ])) : g("", !0)
    ]));
  }
}), bu = /* @__PURE__ */ Pe(vu, [["__scopeId", "data-v-b4100bee"]]), hu = { class: "wa-preview-root" }, yu = { class: "wa-device" }, gu = { class: "wa-screen" }, fu = { class: "wa-header" }, ku = { class: "wa-titleblock" }, _u = { class: "wa-title-row" }, wu = { class: "wa-title" }, $u = { class: "wa-subtitle" }, xu = {
  key: 0,
  class: "wa-flow-shell"
}, Cu = { class: "wa-flow-header" }, Su = { class: "wa-flow-title" }, Iu = { class: "wa-flow-content" }, Tu = { class: "wa-flow-eyebrow" }, Au = {
  key: 0,
  class: "wa-flow-products"
}, Uu = { class: "wa-flow-footer" }, Ru = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, Eu = { class: "wa-managed" }, Pu = {
  key: 1,
  class: "wa-thread"
}, Bu = { class: "wa-secure-banner" }, Lu = { class: "wa-msg wa-msg--in" }, Ou = { class: "wa-template-card" }, Nu = {
  key: 0,
  class: "wa-card-media"
}, Mu = ["src"], Vu = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, Du = ["src"], Wu = { class: "wa-card-media-doc-icon" }, ju = ["title"], Hu = {
  key: 3,
  class: "wa-card-media-fallback"
}, Fu = { class: "wa-card-media-tag" }, qu = { class: "wa-card-media-sub" }, zu = {
  key: 1,
  class: "wa-card-header-text"
}, Yu = ["innerHTML"], Ku = {
  key: 2,
  class: "wa-link-preview"
}, Gu = { class: "wa-link-preview-head" }, Ju = { class: "wa-link-preview-text" }, Qu = ["href"], Xu = {
  key: 3,
  class: "wa-inline-note"
}, Zu = {
  key: 4,
  class: "wa-inline-note"
}, ed = {
  key: 5,
  class: "wa-inline-note"
}, td = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, ad = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, nd = {
  key: 8,
  class: "wa-product-list"
}, sd = { class: "wa-product-name" }, ld = { class: "wa-product-price" }, od = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, id = {
  key: 10,
  class: "wa-template-actions"
}, rd = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, ud = { class: "wa-order-card" }, dd = { class: "wa-order-card-top" }, cd = ["src"], pd = { type: "button" }, md = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, vd = { class: "wa-document-card" }, bd = { class: "wa-document-file" }, hd = { class: "wa-document-icon" }, yd = ["title"], gd = { class: "wa-document-caption" }, fd = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, kd = { class: "wa-voice-card" }, _d = { class: "wa-voice-top" }, wd = { class: "wa-voice-profile" }, $d = ["src"], xd = { class: "wa-voice-duration" }, Cd = { class: "wa-voice-transcript" }, Sd = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, Id = { class: "wa-contact-card" }, Td = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, Ad = { class: "wa-location-card" }, Ud = { class: "wa-location-content" }, Rd = { type: "button" }, Ed = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Pd = { class: "wa-carousel-track" }, Bd = { type: "button" }, Ld = { class: "wa-msg wa-msg--out" }, Od = { class: "wa-bubble wa-bubble--out" }, Nd = { class: "wa-bubble-author" }, Md = {
  key: 0,
  class: "wa-reaction"
}, Vd = { class: "wa-msg wa-msg--in" }, Dd = { class: "wa-bubble wa-bubble--in" }, Wd = /* @__PURE__ */ Ee({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(o) {
    const c = o;
    function v(k) {
      return String(k).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const y = $(() => {
      var N;
      const k = ((N = c.template) == null ? void 0 : N.body) ?? "";
      return v(k).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), _ = $(() => c.template.templateName || "Ecoshop"), I = $(() => "Business Account"), U = $(() => c.template.format === "flow" || !!c.template.flow), T = $(() => {
      var k;
      return (k = c.template.buttons) == null ? void 0 : k[0];
    }), O = $(() => {
      var k, E;
      return ((k = T.value) == null ? void 0 : k.text) || ((E = c.template.flow) == null ? void 0 : E.ctaLabel) || "";
    }), B = $(() => c.template.buttons ?? []), F = $(() => {
      var k;
      return (((k = c.template.multiProduct) == null ? void 0 : k.length) ?? 0) > 0;
    }), te = $(() => (c.template.format || "text").toUpperCase()), se = $(() => {
      const k = c.template.header;
      return !k || k.type === "text" ? "" : k.type === "image" ? k.url || "Image" : k.type === "video" ? k.url || "Video" : k.filename || k.url || "Document";
    }), ce = $(() => {
      const k = c.template.header;
      if (!(!k || k.type !== "image" || !k.url))
        return { backgroundImage: `url(${k.url})` };
    });
    function D(k) {
      if (!k) return "";
      try {
        const E = k.split("?")[0].split("#")[0], N = E.substring(E.lastIndexOf("/") + 1);
        return decodeURIComponent(N || "");
      } catch {
        return "";
      }
    }
    const ae = $(() => {
      const k = c.template.header;
      return !k || k.type !== "document" ? "" : k.filename || D(k.url) || "document.pdf";
    }), q = $(() => {
      const k = (c.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (k == null ? void 0 : k[0]) || "";
    });
    function pe(k) {
      try {
        return new URL(k).hostname;
      } catch {
        return "example.com";
      }
    }
    const W = $(() => {
      const k = c.template.linkPreview;
      return !k && !q.value ? null : {
        title: (k == null ? void 0 : k.title) || "Link preview",
        description: (k == null ? void 0 : k.description) || "Preview from your WhatsApp template link.",
        domain: (k == null ? void 0 : k.domain) || (q.value ? pe(q.value) : "example.com"),
        url: (k == null ? void 0 : k.url) || q.value || "#",
        thumbnail: (k == null ? void 0 : k.thumbnail) || ""
      };
    }), J = $(() => {
      var N, be, ie;
      const E = (ie = (((N = c.template.documentCard) == null ? void 0 : N.filename) || ((be = c.template.header) == null ? void 0 : be.filename) || "").split(".").pop()) == null ? void 0 : ie.trim().toUpperCase();
      return E ? E.slice(0, 4) : "DOC";
    });
    function Z(k, E) {
      return k === "phone_number" ? "wa-btn-icon--phone" : k === "url" ? "wa-btn-icon--external" : k === "copy_code" ? "wa-btn-icon--code" : k === "opt_out" || (E || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (E || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ne = $(() => {
      var k;
      return c.template.location || c.template.locationRequest ? "wa-side-icon--info" : ((k = c.template.header) == null ? void 0 : k.type) === "video" || c.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ye = $(() => {
      var E, N, be;
      const k = c.template;
      return k.format === "flow" ? "Thanks, we received your preferences." : (E = k.auth) != null && E.code ? "Use the verification code and let us know if it works." : (N = k.coupon) != null && N.code ? `Your coupon ${k.coupon.code} is active now.` : k.limitedOffer ? `Great choice. This offer is valid until ${k.limitedOffer}.` : (be = c.template.multiProduct) != null && be.length ? `Here are ${c.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), _e = $(() => {
      var E, N;
      const k = c.template;
      return k.location ? k.location.name || k.location.address || `${k.location.lat}, ${k.location.lng}` : (E = k.auth) != null && E.code ? `Verification code: ${k.auth.code}` : (N = k.flow) != null && N.id ? `Flow ID: ${k.flow.id}` : k.templateLanguage ? `Template language: ${k.templateLanguage}` : `Category: ${k.templateCategory || "utility"} • Format: ${k.format || "text"}`;
    }), ee = $(() => {
      var N, be;
      const k = c.template;
      if ((N = k.multiProduct) != null && N.length) return k.multiProduct.slice(0, 5).map((ie) => ie.name || "Product");
      if ((be = k.buttons) != null && be.length) return k.buttons.slice(0, 5).map((ie) => ie.text || "Option");
      const E = (k.body || "").split(/\n|\.|,/).map((ie) => ie.trim()).filter(Boolean).slice(0, 5);
      return E.length ? E : ["Option A", "Option B", "Option C"];
    });
    return (k, E) => {
      var N, be, ie, x, M, w, le, ge, me, he, L, X, G, $e;
      return a(), n("div", hu, [
        e("div", yu, [
          e("div", gu, [
            E[30] || (E[30] = Je('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", fu, [
              E[7] || (E[7] = e("span", { class: "wa-back" }, "←", -1)),
              E[8] || (E[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", ku, [
                e("div", _u, [
                  e("span", wu, d(_.value), 1),
                  E[6] || (E[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", $u, d(I.value), 1)
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
            U.value ? (a(), n("div", xu, [
              E[14] || (E[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Cu, [
                E[10] || (E[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Su, d(_.value), 1),
                E[11] || (E[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Iu, [
                e("p", Tu, d(o.template.body || "Please choose an option below."), 1),
                (a(!0), n(P, null, j(ee.value, (ve, z) => (a(), n("div", {
                  key: `flow-opt-${z}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, d(ve), 1),
                  e("span", {
                    class: ke(["wa-radio", { "wa-radio--on": z === 0 }])
                  }, null, 2)
                ]))), 128)),
                (N = o.template.multiProduct) != null && N.length ? (a(), n("div", Au, [
                  (a(!0), n(P, null, j(o.template.multiProduct.slice(0, 3), (ve, z) => (a(), n("div", {
                    key: z,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, d(ve.name || "Product"), 1),
                      e("p", null, d(ve.price || "Price on request"), 1)
                    ]),
                    E[12] || (E[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : g("", !0)
              ]),
              e("div", Uu, [
                O.value ? (a(), n("button", Ru, d(O.value), 1)) : g("", !0),
                e("p", Eu, [
                  E[13] || (E[13] = K("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: E[0] || (E[0] = Ye(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), n("div", Pu, [
              E[29] || (E[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Bu, [
                E[15] || (E[15] = e("span", null, "●", -1)),
                E[16] || (E[16] = K(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: E[1] || (E[1] = Ye(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", Lu, [
                e("div", Ou, [
                  o.template.header && o.template.header.type !== "text" ? (a(), n("div", Nu, [
                    o.template.header.type === "image" && o.template.header.url ? (a(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: o.template.header.url,
                      alt: "Header media"
                    }, null, 8, Mu)) : o.template.header.type === "video" && o.template.header.url ? (a(), n("div", Vu, [
                      e("video", {
                        src: o.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, Du),
                      E[17] || (E[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : o.template.header.type === "document" ? (a(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: E[2] || (E[2] = Ye(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", Wu, d(J.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ae.value
                      }, d(ae.value), 9, ju)
                    ])) : (a(), n("div", Hu, [
                      e("div", Fu, d(te.value) + " TEMPLATE", 1),
                      e("div", qu, d(se.value), 1),
                      ce.value ? (a(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: Ce(ce.value)
                      }, null, 4)) : g("", !0)
                    ]))
                  ])) : (be = o.template.header) != null && be.text ? (a(), n("div", zu, d(o.template.header.text), 1)) : g("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: y.value
                  }, null, 8, Yu),
                  W.value ? (a(), n("div", Ku, [
                    e("div", Gu, [
                      W.value.thumbnail ? (a(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: Ce({ backgroundImage: `url(${W.value.thumbnail})` })
                      }, null, 4)) : g("", !0),
                      e("div", Ju, [
                        e("strong", null, d(W.value.title), 1),
                        e("p", null, d(W.value.description), 1),
                        e("span", null, d(W.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: W.value.url,
                      onClick: E[3] || (E[3] = Ye(() => {
                      }, ["prevent"]))
                    }, d(W.value.url), 9, Qu)
                  ])) : g("", !0),
                  o.template.location ? (a(), n("div", Xu, " 📍 " + d(o.template.location.name || o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)) : g("", !0),
                  (ie = o.template.coupon) != null && ie.code ? (a(), n("div", Zu, [
                    E[18] || (E[18] = K(" Coupon: ", -1)),
                    e("strong", null, d(o.template.coupon.code), 1)
                  ])) : g("", !0),
                  (x = o.template.auth) != null && x.code ? (a(), n("div", ed, [
                    E[19] || (E[19] = K(" Verification code: ", -1)),
                    e("strong", null, d(o.template.auth.code), 1)
                  ])) : g("", !0),
                  o.template.limitedOffer ? (a(), n("div", td, " Expires: " + d(o.template.limitedOffer), 1)) : g("", !0),
                  o.template.footer ? (a(), n("div", ad, d(o.template.footer), 1)) : g("", !0),
                  F.value ? (a(), n("div", nd, [
                    (a(!0), n(P, null, j((M = o.template.multiProduct) == null ? void 0 : M.slice(0, 4), (ve, z) => (a(), n("div", {
                      key: `prod-${z}`,
                      class: "wa-product-row"
                    }, [
                      e("span", sd, d(ve.name || `Item ${z + 1}`), 1),
                      e("span", ld, d(ve.price || "-"), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  O.value ? (a(), n("button", od, [
                    T.value ? (a(), n("span", {
                      key: 0,
                      class: ke(["wa-btn-icon", Z(T.value.type, T.value.value || T.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : g("", !0),
                    K(" " + d(O.value), 1)
                  ])) : g("", !0),
                  B.value.length > 1 ? (a(), n("div", id, [
                    (a(!0), n(P, null, j(B.value.slice(1, 4), (ve, z) => (a(), n("button", {
                      key: `action-${z}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ke(["wa-btn-icon", Z(ve.type, ve.value || ve.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      K(" " + d(ve.text), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  E[20] || (E[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ke(["wa-side-icon", ne.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              o.template.orderCard ? (a(), n("div", rd, [
                e("div", ud, [
                  e("div", dd, [
                    o.template.orderCard.image ? (a(), n("img", {
                      key: 0,
                      src: o.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, cd)) : g("", !0),
                    e("div", null, [
                      e("strong", null, d(o.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, d(o.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", pd, d(o.template.orderCard.buttonLabel || "View"), 1),
                  E[21] || (E[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : g("", !0),
              o.template.documentCard || ((w = o.template.header) == null ? void 0 : w.type) === "document" ? (a(), n("div", md, [
                e("div", vd, [
                  e("div", bd, [
                    e("span", hd, d(J.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((le = o.template.documentCard) == null ? void 0 : le.filename) || ((ge = o.template.header) == null ? void 0 : ge.filename) || "document.pdf"
                      }, d(((me = o.template.documentCard) == null ? void 0 : me.filename) || ((he = o.template.header) == null ? void 0 : he.filename) || "document.pdf"), 9, yd),
                      e("p", null, d(((L = o.template.documentCard) == null ? void 0 : L.size) || "243 KB • html"), 1)
                    ]),
                    E[22] || (E[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", gd, d(((X = o.template.documentCard) == null ? void 0 : X.caption) || o.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : g("", !0),
              o.template.voiceNote ? (a(), n("div", fd, [
                e("div", kd, [
                  e("div", _d, [
                    E[24] || (E[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    E[25] || (E[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", wd, [
                      o.template.voiceNote.profileImage ? (a(), n("img", {
                        key: 0,
                        src: o.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, $d)) : g("", !0),
                      E[23] || (E[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", xd, d(o.template.voiceNote.duration || "0:10"), 1),
                  e("p", Cd, d(o.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : g("", !0),
              o.template.contactCard ? (a(), n("div", Sd, [
                e("div", Id, [
                  e("strong", null, d(o.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, d(o.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, d(o.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, d(o.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, d(o.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : g("", !0),
              o.template.location && o.template.locationRequest ? (a(), n("div", Td, [
                e("div", Ad, [
                  E[26] || (E[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Ud, [
                    e("strong", null, d(o.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: E[4] || (E[4] = Ye(() => {
                      }, ["prevent"]))
                    }, d(o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)
                  ]),
                  e("button", Rd, d(o.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : g("", !0),
              (G = o.template.carouselCards) != null && G.length ? (a(), n("div", Ed, [
                e("div", Pd, [
                  (a(!0), n(P, null, j(o.template.carouselCards.slice(0, 4), (ve, z) => (a(), n("article", {
                    key: `c-${z}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: Ce(ve.image ? { backgroundImage: `url(${ve.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, d(ve.title || `Card ${z + 1}`), 1),
                    e("p", null, d(ve.description || "Card description"), 1),
                    e("button", Bd, d(ve.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : g("", !0),
              e("div", Ld, [
                e("div", Od, [
                  e("span", Nd, d(_.value), 1),
                  e("p", null, d(ye.value), 1),
                  E[27] || (E[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  o.template.reactionEmoji ? (a(), n("span", Md, d(o.template.reactionEmoji), 1)) : g("", !0)
                ])
              ]),
              e("div", Vd, [
                e("div", Dd, [
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
}), jd = /* @__PURE__ */ Pe(Wd, [["__scopeId", "data-v-244c945a"]]), Hd = { class: "keos-whatsapp-builder" }, Fd = { class: "kb-builder-top" }, qd = { class: "kb-wa-layout" }, zd = { class: "kb-wa-sidebar" }, Yd = {
  key: 0,
  class: "kb-wa-form"
}, Kd = { class: "kb-wa-form-head" }, Gd = { class: "kb-wa-form-head-top" }, Jd = { class: "kb-wa-health-pill" }, Qd = { class: "kb-wa-form-head-row" }, Xd = ["value"], Zd = { class: "kb-wa-health" }, ec = { class: "kb-wa-health-row" }, tc = { class: "kb-wa-health-value" }, ac = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, nc = { class: "kb-wa-canvas" }, sc = {
  key: 0,
  class: "kb-wa-test-banner"
}, lc = { class: "kb-wa-preview-chrome" }, oc = { class: "kb-push-preview-controls" }, ic = { class: "kb-push-preview-as" }, rc = ["value"], uc = { class: "kb-preview-status" }, dc = { class: "kb-wa-actions" }, cc = {
  key: 0,
  class: "kb-actions-note"
}, pc = { key: 0 }, mc = { class: "kb-wa-actions-right" }, vc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, bc = { class: "kb-confirm-dialog" }, hc = { class: "kb-confirm-actions" }, Bt = 60, Lt = 1024, Ot = 60, Nt = 10, Mt = 10, yc = /* @__PURE__ */ Ee({
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
    function _(s) {
      return s == null ? !1 : typeof s == "string" ? s.trim().length > 0 : Array.isArray(s) ? s.length > 0 : typeof s == "object" ? Object.keys(s).length > 0 : !0;
    }
    function I(s) {
      const l = {
        elementName: s.elementName,
        languageCode: s.languageCode,
        category: s.category,
        templateType: s.templateType,
        content: s.content,
        metaTemplate: s.metaTemplate,
        metaWhatsApp: s.metaWhatsApp ?? s.metaTemplate,
        header: s.header,
        footer: s.footer,
        buttons: s.buttons,
        example: s.example,
        advanced: s.advanced
      };
      return Object.fromEntries(
        Object.entries(l).filter(([f, h]) => y.has(f) ? !0 : _(h))
      );
    }
    function U(s) {
      const l = { ...s }, f = String(l.template_type ?? "text").trim().toLowerCase(), h = String(l.header_type ?? "none").trim().toLowerCase();
      v.has(f) || v.has(h) || (l.media_url = void 0, l.media_caption = void 0, l.document_filename = void 0, l.document_size = void 0), f !== "carousel" && (l.cards = void 0), f !== "catalog" && f !== "mpm" && (l.products = void 0), f !== "flow" && (l.flow_id = void 0, l.flow_cta_label = void 0), f !== "lto" && (l.lto_expiry = void 0), f !== "auth" && (l.auth_type = void 0, l.auth_label = void 0, l.auth_code = void 0, l.otp_code = void 0), f !== "document" && h !== "document" && (l.document_filename = void 0, l.document_size = void 0), f !== "location" && (l.location = void 0);
      const m = Array.isArray(l.buttons) ? l.buttons : [];
      return l.buttons = m, l;
    }
    function T(s) {
      var we, b, r, t, Y;
      const l = [], f = s.message, h = (f.template_category ?? "").toString().trim(), V = (f.template_type ?? "text").toString(), m = (f.header_type ?? "none").toString(), i = (f.header ?? "").toString(), p = (f.body ?? "").toString(), A = (f.footer ?? "").toString(), R = Array.isArray(f.buttons) ? f.buttons : [], re = Array.isArray(f.cards) ? f.cards : [];
      return (we = s.name) != null && we.trim() || l.push("Template name is required"), (b = f.template_name) != null && b.trim() || l.push("WhatsApp template name is required"), h || l.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), p.trim() || l.push("Body is required"), m === "text" && i.length > Bt && l.push(`Header text cannot exceed ${Bt} characters`), p.length > Lt && l.push(`Body cannot exceed ${Lt} characters`), A.length > Ot && l.push(`Footer cannot exceed ${Ot} characters`), R.length > Nt && l.push(`Buttons cannot exceed ${Nt}`), (V === "image" || V === "video" || V === "document" || m === "image" || m === "video" || m === "document") && !f.media_url && l.push("Media URL is required for rich media templates"), h === "authentication" && V !== "auth" && l.push("Authentication category must use Authentication format"), V === "auth" && !((r = f.auth_label) != null && r.trim()) && !p.includes("{{") && l.push("Authentication templates should include a code label or placeholder variable"), V === "lto" && !f.lto_expiry && l.push("Limited-time offer requires an expiry"), (V === "mpm" || V === "catalog") && !((t = f.products) != null && t.length) && l.push("Catalog and multi-product templates require at least one product"), V === "flow" && !((Y = f.flow_id) != null && Y.trim()) && l.push("WhatsApp Flow format requires a flow ID"), V === "carousel" && (re.length ? re.length > Mt && l.push(`Carousel supports up to ${Mt} cards`) : l.push("Carousel format requires at least one card")), l;
    }
    function O(s, l, f) {
      const h = s.message, V = String(h.template_category ?? "").trim(), m = String(h.template_type ?? "text").trim(), i = [];
      return V && l.includes(V) && i.push(`WhatsApp category "${V}" is disabled in this builder configuration`), m && f.includes(m) && i.push(`WhatsApp format "${m}" is disabled in this builder configuration`), i;
    }
    const B = o;
    function F(s) {
      if (!s) return {};
      const l = s.metaTemplate ?? s.metaWhatsApp, f = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((b) => (b == null ? void 0 : b.type) === "BODY") : void 0, h = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((b) => (b == null ? void 0 : b.type) === "FOOTER") : void 0, V = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((b) => (b == null ? void 0 : b.type) === "HEADER") : void 0, m = String(s.content ?? "").trim(), i = String(s.elementName ?? "").trim(), p = String(s.languageCode ?? "").trim(), A = String(s.category ?? "").trim().toLowerCase(), R = String(s.templateType ?? "").trim().toLowerCase(), re = String(s.footer ?? "").trim(), we = String(s.header ?? "").trim();
      return {
        ...s,
        ...i && !s.template_name ? { template_name: i } : {},
        ...p && !s.template_language ? { template_language: p } : {},
        ...A && !s.template_category ? { template_category: A } : {},
        ...R && !s.template_type ? { template_type: R } : {},
        ...m && !s.body ? { body: m } : {},
        ...re && !s.footer ? { footer: re } : {},
        ...we && !s.header ? { header: we } : {},
        ...!s.body && (f != null && f.text) ? { body: String(f.text) } : {},
        ...!s.footer && (h != null && h.text) ? { footer: String(h.text) } : {},
        ...!s.header && (V != null && V.text) ? { header: String(V.text) } : {}
      };
    }
    function te(s) {
      if (!s) return s;
      const l = F(s.message);
      return { ...s, message: l };
    }
    const se = c;
    function ce(s) {
      var f;
      const l = Ct(s, {
        exampleData: (f = Ue.value) == null ? void 0 : f.data
      });
      return {
        ...s,
        message: I(l.payload)
      };
    }
    const {
      campaign: D,
      dirty: ae,
      customValidatorErrors: q,
      getValidationWithWarnings: pe,
      update: W,
      updateMessage: J,
      undo: Z,
      redo: ne,
      canUndo: ye,
      canRedo: _e,
      resetMessage: ee,
      hooks: k
    } = ut({
      initial: te(B.modelValue),
      hooks: {
        ...B.hooks,
        customValidators: async (s) => {
          var h;
          const l = [
            ...T(s),
            ...O(
              s,
              B.disabledTemplateCategories,
              B.disabledTemplateFormats
            )
          ], f = (h = B.hooks) != null && h.customValidators ? await B.hooks.customValidators(s) : [];
          return [...l, ...f];
        }
      },
      onDirty: () => se("change", ce(D.value))
    }), { lastSavedAt: E } = dt(D, { channel: "whatsapp" });
    function N(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ne() : Z());
    }
    st(() => {
      window.addEventListener("keydown", N);
    }), lt(() => {
      window.removeEventListener("keydown", N);
    }), Le(D, (s) => se("update:modelValue", ce(s)), {
      deep: !0
    });
    const be = ue(), ie = ue(!0);
    async function x() {
      if (k.estimateReach)
        try {
          be.value = await k.estimateReach(D.value.audience);
        } catch {
          be.value = void 0;
        }
      k.canSend && (ie.value = await Promise.resolve(k.canSend()));
    }
    x(), Le(() => D.value.audience, x, { deep: !0 });
    const M = $(() => (q.value, pe(be.value))), w = $(() => M.value.blockingErrors), le = $(() => M.value.warnings), ge = $(() => M.value.valid), me = $(() => {
      var h, V, m;
      const s = D.value.message, l = [
        !!((h = s.template_name) != null && h.trim()),
        !!((V = s.template_category) != null && V.trim()),
        !!(s.body ?? "").toString().trim(),
        !!((m = s.template_language) != null && m.trim()),
        Array.isArray(s.buttons) ? s.buttons.length > 0 : !1
      ], f = l.filter(Boolean).length;
      return Math.round(f / l.length * 100);
    }), he = $(() => me.value >= 90 ? "Production ready" : me.value >= 70 ? "Strong draft" : me.value >= 40 ? "In progress" : "Needs setup"), L = $(() => {
      const s = D.value.message;
      return !!((s.body ?? "").toString().trim() || (s.header ?? "").toString().trim() || s.media_url || s.flow_id || s.coupon_code || s.lto_expiry || s.voice_transcript || s.contact_name || s.link_title || s.order_title || Array.isArray(s.buttons) && s.buttons.length || Array.isArray(s.products) && s.products.length || Array.isArray(s.cards) && s.cards.length);
    }), X = ue(""), G = ue(!1), $e = ue(null), ve = $(
      () => new Set((B.disabledTemplateCategories ?? []).map((s) => String(s).trim().toLowerCase()))
    ), z = $(
      () => new Set((B.disabledTemplateFormats ?? []).map((s) => String(s).trim().toLowerCase()))
    ), Ie = $(
      () => po.filter((s) => {
        var V;
        const l = ((V = s.campaign) == null ? void 0 : V.message) ?? {}, f = String(l.template_category ?? "").trim().toLowerCase(), h = String(l.template_type ?? "").trim().toLowerCase();
        return !(f && ve.value.has(f) || h && z.value.has(h));
      })
    ), Ue = $(() => {
      const s = X.value;
      return s ? et.find((l) => l.id === s) ?? null : null;
    }), Be = $(() => {
      const s = D.value.message.body ?? "";
      return Ue.value ? Qe(s, Ue.value.data) : s;
    }), De = $(() => {
      const s = D.value.message.header ?? "";
      return Ue.value ? Qe(s, Ue.value.data) : s;
    }), Re = $(() => {
      var b;
      const s = D.value.message, l = s.template_type ?? "text", f = s.header_type ?? "none";
      let h, V, m, i, p, A, R;
      (l === "image" || f === "image") && s.media_url ? h = { type: "image", url: s.media_url } : (l === "video" || f === "video") && s.media_url ? h = { type: "video", url: s.media_url } : l === "document" || f === "document" ? h = {
        type: "document",
        url: s.media_url || void 0,
        filename: s.document_filename || s.media_url || "document.pdf"
      } : f === "text" && s.header ? h = { type: "text", text: De.value } : s.header && (h = { type: "text", text: De.value });
      const re = Be.value || "Start adding content to see a live preview here.";
      if (l === "location" && s.location) {
        const r = s.location, t = r.lat ?? r.latitude, Y = r.lng ?? r.lon ?? r.longitude;
        t != null && Y != null && (V = {
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
      }))), l === "coupon" && s.coupon_code && (p = { code: s.coupon_code }), l === "lto" && s.lto_expiry && (A = s.lto_expiry), l === "auth" && (R = { code: s.auth_code ?? s.otp_code ?? "123 456" });
      const we = s.buttons ?? [];
      return l === "flow" && ((b = s.flow_cta_label) != null && b.trim()) && we.push({
        label: s.flow_cta_label
      }), {
        format: l,
        templateName: s.template_name || void 0,
        templateLanguage: s.template_language || void 0,
        templateCategory: s.template_category || void 0,
        header: h,
        body: re,
        mediaCaption: s.media_caption || void 0,
        footer: s.footer || void 0,
        buttons: we.map((r) => ({ text: r.label || "Button", type: r.type, value: r.value })),
        location: V,
        catalog: m,
        multiProduct: i,
        coupon: p,
        limitedOffer: A,
        auth: R,
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
        documentCard: s.document_filename || l === "document" || f === "document" ? {
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
      const l = D.value, f = U({
        ...s.campaign.message ? s.campaign.message : l.message,
        template_name: ((h = s.campaign.message) == null ? void 0 : h.template_name) ?? s.campaign.name ?? l.name ?? void 0
      });
      W({
        ...s.campaign,
        message: f
      }), $e.value = null, G.value = !1;
    }
    function He(s) {
      const l = s.target.value;
      if (!l) return;
      const f = Ie.value.find((h) => h.id === l);
      f && (ae.value ? ($e.value = f, G.value = !0) : Ne(f), s.target.value = "");
    }
    function We(s) {
      W({
        name: s,
        message: { ...D.value.message, template_name: s || void 0 },
        tracking: { ...D.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Fe(s) {
      const l = D.value.message, f = U({
        ...l,
        ...s ?? {}
      });
      if (J(f), Object.prototype.hasOwnProperty.call(s ?? {}, "template_name")) {
        const h = String((s == null ? void 0 : s.template_name) ?? "");
        h !== D.value.name && W({
          name: h,
          tracking: {
            ...D.value.tracking ?? {},
            campaign_name: h
          }
        });
      }
    }
    Le(
      () => D.value.name,
      (s) => {
        const l = String(D.value.message.template_name ?? "");
        (s || "") !== l && J({ template_name: s || void 0 });
      },
      { immediate: !0 }
    );
    function Me(s) {
      const l = ` {{ .${s.variable} }}`, f = D.value.message.variables ?? [], h = Array.from(/* @__PURE__ */ new Set([...f, s.variable]));
      if (s.field === "title") {
        const V = D.value.message.header ?? "";
        J({
          variables: h,
          header: V + l
        });
      } else if (s.field === "footer") {
        const V = D.value.message.footer ?? "";
        J({
          variables: h,
          footer: V + l
        });
      } else {
        const V = D.value.message.body ?? "";
        J({
          variables: h,
          body: V + l
        });
      }
    }
    function oe() {
      var f;
      if (!ge.value) return;
      const s = Ct(D.value, {
        exampleData: (f = Ue.value) == null ? void 0 : f.data
      }), l = ce(D.value);
      se("save-gupshup-template", s.payload, s.warnings, l), se("save", l);
    }
    return (s, l) => {
      var f;
      return a(), n("div", Hd, [
        e("div", Fd, [
          Oe(ct, {
            "campaign-name": C(D).name,
            status: C(D).status,
            dirty: C(ae),
            "last-saved-at": C(E),
            "can-undo": C(ye),
            "can-redo": C(_e),
            "slugify-name": B.enforceSlugName,
            "onUpdate:campaignName": We,
            onUndo: C(Z),
            onRedo: C(ne)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          w.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: C(Ae).dangerBg,
              border: `1px solid ${C(Ae).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(xe)[12]}px ${C(xe)[16]}px`,
              marginBottom: `${C(xe)[16]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: C(Ae).danger })
            }, [
              (a(!0), n(P, null, j(w.value, (h) => (a(), n("li", {
                key: h.message
              }, d(h.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", qd, [
          e("aside", zd, [
            o.disabledSections.includes("whatsapp") ? g("", !0) : (a(), n("div", Yd, [
              e("div", Kd, [
                e("div", Gd, [
                  l[6] || (l[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Jd, d(he.value), 1)
                ]),
                e("div", Qd, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: He
                  }, [
                    l[7] || (l[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, j(Ie.value, (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, Xd))), 128))
                  ], 32)
                ]),
                e("div", Zd, [
                  e("div", ec, [
                    l[8] || (l[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", tc, d(me.value) + "%", 1)
                  ]),
                  e("div", ac, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: Ce({ width: `${me.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(bu, {
                message: C(D).message,
                "show-reset": !0,
                "disabled-categories": o.disabledTemplateCategories,
                "disabled-formats": o.disabledTemplateFormats,
                "media-upload-url": o.mediaUploadUrl,
                "media-upload-headers": o.mediaUploadHeaders,
                onUpdate: Fe,
                onReset: l[0] || (l[0] = (h) => C(ee)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats", "media-upload-url", "media-upload-headers"]),
              Oe(Gt, {
                message: C(D).message,
                "variable-options": o.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: C(J),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", nc, [
            !o.designOnly && C(D).audience.test_mode ? (a(), n("div", sc, [...l[9] || (l[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", lc, [
              e("div", oc, [
                e("label", ic, [
                  l[11] || (l[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (h) => X.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[10] || (l[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, j(C(et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, rc))), 128))
                  ], 512), [
                    [Ke, X.value]
                  ])
                ]),
                e("div", uc, [
                  l[12] || (l[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(C(D).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: ke(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !L.value }])
              }, [
                Oe(jd, { template: Re.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", dc, [
          le.value.length > 0 ? (a(), n("div", cc, [
            l[13] || (l[13] = e("strong", null, "Warning:", -1)),
            K(" " + d((f = le.value[0]) == null ? void 0 : f.message) + " ", 1),
            le.value.length > 1 ? (a(), n("span", pc, " (+" + d(le.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", mc, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: l[2] || (l[2] = (h) => se("duplicate", JSON.parse(JSON.stringify(C(D)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: oe
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: l[3] || (l[3] = (h) => se("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        G.value ? (a(), n("div", vc, [
          e("div", bc, [
            l[14] || (l[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[15] || (l[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", hc, [
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
}), Xt = /* @__PURE__ */ Pe(yc, [["__scopeId", "data-v-4dc3333c"]]), gc = { class: "kb-section" }, fc = { class: "kb-section__head" }, kc = { class: "kb-field" }, _c = ["value"], wc = { class: "kb-field" }, $c = { class: "kb-label" }, xc = { key: 0 }, Cc = { key: 1 }, Sc = { key: 2 }, Ic = { class: "kb-field-with-var" }, Tc = ["value"], Ac = { class: "kb-var-picker-wrap" }, Uc = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Rc = ["onClick"], Ec = {
  key: 0,
  class: "kb-truncation-hint"
}, Pc = { class: "kb-field" }, Bc = { class: "kb-insert-row" }, Lc = ["value"], Oc = { class: "kb-field" }, Nc = { class: "kb-insert-row" }, Mc = /* @__PURE__ */ Ee({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: c }) {
    const v = o, y = c, _ = [
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
    ], I = ue(v.variableOptions && v.variableOptions.length ? [...v.variableOptions] : _), U = ue(I.value[0] ?? _[0]), T = ue("");
    Le(
      () => v.variableOptions,
      (J) => {
        J && J.length && (I.value = [...J], I.value.includes(U.value) || (U.value = I.value[0]));
      }
    );
    const O = $(() => v.message.body ?? ""), B = ue(null), F = $(() => O.value.length), te = $(() => F.value ? F.value <= 160 ? 1 : Math.ceil(F.value / 153) : 0), se = $(() => {
      const J = F.value;
      return J <= 160 ? null : J <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function ce(J) {
      const Z = J.target.value;
      y("update", {
        sender_id: Z || void 0
      });
    }
    function D(J) {
      const Z = J.target.value;
      y("update", {
        body: Z
      });
    }
    function ae() {
      const J = U.value;
      if (!J) return;
      const Z = ` {{ .${J} }}`, ne = O.value || "", ye = v.message.variables ?? [], _e = Array.from(/* @__PURE__ */ new Set([...ye, J]));
      y("update", {
        body: ne + Z,
        variables: _e
      });
    }
    function q(J) {
      B.value = B.value === J ? null : J;
    }
    function pe(J, Z) {
      const ne = ` {{ .${Z} }}`, ye = O.value || "", _e = v.message.variables ?? [], ee = Array.from(/* @__PURE__ */ new Set([..._e, Z]));
      y("update", {
        body: ye + ne,
        variables: ee
      }), B.value = null;
    }
    function W() {
      const J = T.value.trim();
      J && (I.value.includes(J) || (I.value = [...I.value, J]), U.value = J, T.value = "");
    }
    return (J, Z) => (a(), n("section", gc, [
      e("div", fc, [
        Z[4] || (Z[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        o.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: Z[0] || (Z[0] = (ne) => J.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      Z[11] || (Z[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", kc, [
        Z[5] || (Z[5] = e("label", { class: "kb-label" }, [
          K(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: v.message.sender_id ?? "",
          onInput: ce
        }, null, 40, _c)
      ]),
      e("div", wc, [
        e("label", $c, [
          Z[6] || (Z[6] = K(" Message body ", -1)),
          e("span", {
            class: ke(["kb-counter", { "kb-counter--warn": te.value > 3 }])
          }, [
            K(d(F.value) + " chars · ", 1),
            te.value === 0 ? (a(), n("span", xc, "0 segments")) : te.value === 1 ? (a(), n("span", Cc, "1 segment")) : (a(), n("span", Sc, d(te.value) + " segments", 1))
          ], 2)
        ]),
        e("div", Ic, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: O.value,
            onInput: D
          }, null, 40, Tc),
          e("div", Ac, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: Z[1] || (Z[1] = (ne) => q("body"))
            }, "{{ .var }}"),
            B.value === "body" ? (a(), n("div", Uc, [
              (a(!0), n(P, null, j(I.value, (ne) => (a(), n("button", {
                key: `sms-body-var-${ne}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (ye) => pe("body", ne)
              }, d(ne), 9, Rc))), 128))
            ])) : g("", !0)
          ])
        ]),
        Z[7] || (Z[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        se.value ? (a(), n("p", Ec, d(se.value), 1)) : g("", !0)
      ]),
      e("div", Pc, [
        Z[8] || (Z[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Bc, [
          je(e("select", {
            "onUpdate:modelValue": Z[2] || (Z[2] = (ne) => U.value = ne),
            class: "kb-select"
          }, [
            (a(!0), n(P, null, j(I.value, (ne) => (a(), n("option", {
              key: ne,
              value: ne
            }, d(ne), 9, Lc))), 128))
          ], 512), [
            [Ke, U.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ae
          }, " Insert into message ")
        ]),
        Z[9] || (Z[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Oc, [
        Z[10] || (Z[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Nc, [
          je(e("input", {
            "onUpdate:modelValue": Z[3] || (Z[3] = (ne) => T.value = ne),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [it, T.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W
          }, " Add ")
        ])
      ])
    ]));
  }
}), Vc = /* @__PURE__ */ Pe(Mc, [["__scopeId", "data-v-68a73354"]]), Dc = { class: "keos-sms-builder" }, Wc = { class: "kb-builder-top" }, jc = { class: "kb-sms-layout" }, Hc = { class: "kb-sms-sidebar" }, Fc = {
  key: 0,
  class: "kb-sms-form"
}, qc = { class: "kb-sms-form-head" }, zc = { class: "kb-sms-form-head-top" }, Yc = { class: "kb-sms-health-pill" }, Kc = { class: "kb-wa-form-head-row" }, Gc = ["value"], Jc = { class: "kb-sms-health" }, Qc = { class: "kb-sms-health-row" }, Xc = { class: "kb-sms-health-value" }, Zc = { class: "kb-sms-health-bar" }, ep = { class: "kb-sms-canvas" }, tp = {
  key: 0,
  class: "kb-sms-test-banner"
}, ap = { class: "kb-sms-preview-chrome" }, np = { class: "kb-push-preview-controls" }, sp = { class: "kb-push-preview-as" }, lp = ["value"], op = { class: "kb-preview-status" }, ip = { class: "kb-preview" }, rp = { class: "kb-sms-preview" }, up = { class: "kb-sms-phone" }, dp = { class: "kb-sms-header" }, cp = { class: "kb-sms-sender-avatar" }, pp = { class: "kb-sms-header-copy" }, mp = { class: "kb-sms-sender" }, vp = { class: "kb-sms-meta" }, bp = { class: "kb-sms-thread" }, hp = {
  key: 0,
  class: "kb-sms-empty"
}, yp = { class: "kb-sms-text" }, gp = { class: "kb-sms-bubble-meta" }, fp = {
  key: 0,
  class: "kb-sms-segment-chip"
}, kp = {
  key: 0,
  class: "kb-sms-more-segments"
}, _p = { class: "kb-sms-delivery-line" }, wp = { class: "kb-sms-counter" }, $p = { key: 0 }, xp = { key: 1 }, Cp = { key: 2 }, Sp = {
  key: 3,
  class: "kb-sms-cost"
}, Ip = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Tp = { class: "kb-sms-actions" }, Ap = {
  key: 0,
  class: "kb-actions-note"
}, Up = { key: 0 }, Rp = { class: "kb-sms-actions-right" }, Ep = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Pp = { class: "kb-confirm-dialog" }, Bp = { class: "kb-confirm-actions" }, Lp = /* @__PURE__ */ Ee({
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
      campaign: _,
      dirty: I,
      customValidatorErrors: U,
      getValidationWithWarnings: T,
      update: O,
      updateMessage: B,
      undo: F,
      redo: te,
      canUndo: se,
      canRedo: ce,
      resetMessage: D,
      hooks: ae
    } = ut({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (oe) => {
          var f, h;
          const s = [];
          (f = oe.name) != null && f.trim() || s.push("Template name is required");
          const l = (h = v.hooks) != null && h.customValidators ? await v.hooks.customValidators(oe) : [];
          return [...s, ...l];
        }
      },
      onDirty: () => y("change", _.value)
    }), { lastSavedAt: q } = dt(_, { channel: "sms" });
    function pe(oe) {
      (oe.metaKey || oe.ctrlKey) && oe.key === "z" && (oe.preventDefault(), oe.shiftKey ? te() : F());
    }
    st(() => {
      window.addEventListener("keydown", pe);
    }), lt(() => {
      window.removeEventListener("keydown", pe);
    }), Le(_, (oe) => y("update:modelValue", oe), { deep: !0 });
    const W = ue(), J = ue(!0);
    async function Z() {
      if (ae.estimateReach)
        try {
          W.value = await ae.estimateReach(_.value.audience);
        } catch {
          W.value = void 0;
        }
      ae.canSend && (J.value = await Promise.resolve(ae.canSend()));
    }
    Z(), Le(() => _.value.audience, Z, { deep: !0 });
    const ne = $(() => (U.value, T(W.value))), ye = $(() => ne.value.blockingErrors), _e = $(() => ne.value.warnings), ee = $(() => ne.value.valid), k = $(() => {
      var f, h, V;
      const oe = _.value.message, s = [
        !!((f = _.value.name) != null && f.trim()),
        !!((h = oe.body) != null && h.trim()),
        !!((V = oe.sender_id) != null && V.trim()),
        !!_.value.template_type,
        (oe.body ?? "").length > 20
      ], l = s.filter(Boolean).length;
      return Math.round(l / s.length * 100);
    }), E = $(() => k.value >= 90 ? "Production ready" : k.value >= 70 ? "Strong draft" : k.value >= 40 ? "In progress" : "Needs setup"), N = $(() => !!X.value.trim()), be = $(
      () => _.value.template_type ?? "transactional"
    ), ie = ue(""), x = ue(!1), M = ue(null), w = $(() => {
      const oe = ie.value;
      return oe ? et.find((s) => s.id === oe) ?? null : null;
    }), le = $(() => {
      const oe = X.value;
      return w.value ? Qe(oe, w.value.data) : oe;
    });
    function ge(oe) {
      const s = _.value, l = oe.campaign.message ? { ...s.message, ...oe.campaign.message } : s.message;
      O({
        ...oe.campaign,
        message: l
      }), M.value = null, x.value = !1;
    }
    function me(oe) {
      const s = oe.target.value;
      if (!s) return;
      const l = Ut.find((f) => f.id === s);
      l && (I.value ? (M.value = l, x.value = !0) : ge(l), oe.target.value = "");
    }
    function he(oe) {
      O({ template_type: oe });
    }
    function L(oe) {
      O({
        name: oe,
        tracking: { ..._.value.tracking ?? {}, campaign_name: oe }
      });
    }
    const X = $(
      () => (_.value.message.body ?? "") || ""
    ), G = $(() => X.value.length), $e = $(() => /[^\x00-\x7f]/.test(X.value)), ve = $(() => $e.value ? 70 : 160), z = $(() => $e.value ? 67 : 153), Ie = $(() => G.value ? G.value <= ve.value ? 1 : Math.ceil(G.value / z.value) : 0), Ue = $(() => {
      const oe = le.value.trim();
      if (!oe) return [];
      const s = Ie.value <= 1 ? ve.value : z.value, l = [];
      for (let f = 0; f < oe.length; f += s)
        l.push(oe.slice(f, f + s));
      return l;
    }), Be = $(() => Ue.value.slice(0, 3)), De = $(
      () => Math.max(0, Ue.value.length - Be.value.length)
    ), Re = $(() => $e.value ? "Unicode" : "GSM-7"), Ne = $(() => N.value ? Ie.value > 3 ? "Queued" : "Delivered" : "Draft"), He = $(() => {
      const oe = v.costPerSegment ?? 0;
      return !oe || Ie.value === 0 ? null : (Ie.value * oe).toFixed(2);
    }), We = $(() => {
      const oe = G.value, s = ve.value + z.value;
      return oe <= ve.value ? null : oe <= s ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Fe = $(
      () => _.value.message.sender_id ?? "YourBrand"
    );
    function Me() {
      ee.value && y("save", _.value);
    }
    return (oe, s) => {
      var l;
      return a(), n("div", Dc, [
        e("div", Wc, [
          Oe(ct, {
            "campaign-name": C(_).name,
            status: C(_).status,
            dirty: C(I),
            "last-saved-at": C(q),
            "can-undo": C(se),
            "can-redo": C(ce),
            "slugify-name": v.enforceSlugName,
            "onUpdate:campaignName": L,
            onUndo: C(F),
            onRedo: C(te)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ye.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: C(Ae).dangerBg,
              border: `1px solid ${C(Ae).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(xe)[12]}px ${C(xe)[16]}px`,
              marginBottom: `${C(xe)[16]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: C(Ae).danger })
            }, [
              (a(!0), n(P, null, j(ye.value, (f) => (a(), n("li", {
                key: f.message
              }, d(f.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", jc, [
          e("aside", Hc, [
            o.disabledSections.includes("sms") ? g("", !0) : (a(), n("div", Fc, [
              e("div", qc, [
                e("div", zc, [
                  s[6] || (s[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", Yc, d(E.value), 1)
                ]),
                e("div", Kc, [
                  Oe(_t, {
                    "template-type": be.value,
                    onUpdate: he
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: me
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, j(C(Ut), (f) => (a(), n("option", {
                      key: f.id,
                      value: f.id
                    }, d(f.label), 9, Gc))), 128))
                  ], 32)
                ]),
                e("div", Jc, [
                  e("div", Qc, [
                    s[8] || (s[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", Xc, d(k.value) + "%", 1)
                  ]),
                  e("div", Zc, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: Ce({ width: `${k.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(Vc, {
                message: C(_).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: C(B),
                onReset: s[0] || (s[0] = (f) => C(D)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", ep, [
            !o.designOnly && C(_).audience.test_mode ? (a(), n("div", tp, [...s[9] || (s[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", ap, [
              e("div", np, [
                e("label", sp, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (f) => ie.value = f),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, j(C(et), (f) => (a(), n("option", {
                      key: f.id,
                      value: f.id
                    }, d(f.label), 9, lp))), 128))
                  ], 512), [
                    [Ke, ie.value]
                  ])
                ]),
                e("div", op, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, d(Ie.value || 0), 1)
                ])
              ]),
              e("div", {
                class: ke(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !N.value }])
              }, [
                e("div", ip, [
                  e("div", rp, [
                    e("div", up, [
                      s[15] || (s[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", dp, [
                        e("div", cp, d(Fe.value.slice(0, 1).toUpperCase()), 1),
                        e("div", pp, [
                          e("div", mp, d(Fe.value), 1),
                          e("div", vp, "Text message · " + d(Ne.value), 1)
                        ])
                      ]),
                      e("div", bp, [
                        N.value ? (a(), n(P, { key: 1 }, [
                          (a(!0), n(P, null, j(Be.value, (f, h) => (a(), n("div", {
                            key: `${h}-${f.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", yp, d(f), 1),
                            e("span", gp, [
                              s[13] || (s[13] = K(" 09:21 ", -1)),
                              Be.value.length > 1 ? (a(), n("span", fp, "Part " + d(h + 1), 1)) : g("", !0)
                            ])
                          ]))), 128)),
                          De.value > 0 ? (a(), n("div", kp, " +" + d(De.value) + " more segments ", 1)) : g("", !0),
                          e("div", _p, [
                            s[14] || (s[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            K(" " + d(Ne.value), 1)
                          ])
                        ], 64)) : (a(), n("div", hp, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", wp, [
                      K(d(G.value) + " characters · ", 1),
                      Ie.value === 0 ? (a(), n("span", $p, "0 segments")) : Ie.value === 1 ? (a(), n("span", xp, "1 segment")) : (a(), n("span", Cp, d(Ie.value) + " segments", 1)),
                      K(" (" + d(ve.value) + " chars single, " + d(z.value) + " multi-part · " + d(Re.value) + ") ", 1),
                      He.value !== null ? (a(), n("span", Sp, " · Est. " + d(He.value), 1)) : g("", !0)
                    ]),
                    We.value ? (a(), n("p", Ip, d(We.value), 1)) : g("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Tp, [
          _e.value.length > 0 ? (a(), n("div", Ap, [
            s[16] || (s[16] = e("strong", null, "Warning:", -1)),
            K(" " + d((l = _e.value[0]) == null ? void 0 : l.message) + " ", 1),
            _e.value.length > 1 ? (a(), n("span", Up, " (+" + d(_e.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Rp, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: s[2] || (s[2] = (f) => y("duplicate", JSON.parse(JSON.stringify(C(_)))))
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
              onClick: s[3] || (s[3] = (f) => y("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        x.value ? (a(), n("div", Ep, [
          e("div", Pp, [
            s[17] || (s[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[18] || (s[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Bp, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: s[4] || (s[4] = (f) => {
                  x.value = !1, M.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: s[5] || (s[5] = (f) => M.value && ge(M.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Zt = /* @__PURE__ */ Pe(Lp, [["__scopeId", "data-v-5e442b56"]]), Op = 30, Np = 60, Mp = 130;
function Vp(o) {
  const c = (o ?? "").trim().length;
  return c < Op ? "too_short" : c <= Np ? "good" : "too_long";
}
function Dp(o) {
  const c = (o ?? "").trim().length;
  return c === 0 ? "too_short" : c <= Mp ? "good" : "too_long";
}
const Wp = [
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
  const c = [];
  for (const v of Wp) {
    const y = o.match(v);
    y && c.push(y[0]);
  }
  return c;
}
function jp(o) {
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
function Hp(o) {
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
const Fp = { class: "em-section" }, qp = { class: "em-strip kb-section" }, zp = { class: "em-strip-head" }, Yp = { class: "em-field kb-field" }, Kp = { class: "em-input-group em-input-group--overlay" }, Gp = ["value"], Jp = { class: "em-var-picker-wrap" }, Qp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Xp = ["onClick"], Zp = { class: "em-field kb-field" }, em = ["value"], tm = { class: "em-field kb-field" }, am = ["value"], nm = { class: "em-field kb-field" }, sm = { class: "em-input-group em-input-group--overlay" }, lm = ["value"], om = { class: "em-var-picker-wrap" }, im = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, rm = ["onClick"], um = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, dm = ["onClick"], cm = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, pm = { class: "em-field kb-field" }, mm = { class: "em-input-group" }, vm = ["value"], bm = { class: "em-var-picker-wrap" }, hm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ym = ["onClick"], gm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, fm = ["onClick"], km = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, _m = { class: "em-strip kb-section em-strip--library" }, wm = { class: "em-library-chips" }, $m = ["onClick"], xm = { class: "em-strip kb-section em-strip--blocks" }, Cm = { class: "em-block-list" }, Sm = ["data-type"], Im = { class: "em-block-bar" }, Tm = { class: "em-block-type" }, Am = { class: "em-block-actions" }, Um = ["disabled", "onClick"], Rm = ["disabled", "onClick"], Em = ["onClick"], Pm = {
  key: 0,
  class: "em-block-fields"
}, Bm = ["value", "onChange"], Lm = ["value", "onInput"], Om = { class: "em-var-picker-wrap" }, Nm = ["onClick"], Mm = ["onClick"], Vm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Dm = ["onClick"], Wm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, jm = ["onClick"], Hm = {
  key: 1,
  class: "em-block-fields"
}, Fm = ["value", "onInput"], qm = { class: "em-var-picker-wrap" }, zm = ["onClick"], Ym = ["onClick"], Km = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Gm = ["onClick"], Jm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Qm = ["onClick"], Xm = {
  key: 2,
  class: "em-block-fields"
}, Zm = ["value", "onInput"], ev = ["value", "onInput"], tv = { class: "em-var-picker-wrap" }, av = ["onClick"], nv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, sv = ["onClick"], lv = ["value", "onInput"], ov = {
  key: 3,
  class: "em-block-fields"
}, iv = ["value", "onInput"], rv = { class: "em-var-picker-wrap" }, uv = ["onClick"], dv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, cv = ["onClick"], pv = ["value", "onInput"], mv = { class: "em-block-fields--row" }, vv = ["value", "onInput"], bv = { class: "em-check-row" }, hv = ["checked", "onChange"], yv = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, gv = ["value", "onInput"], fv = {
  key: 5,
  class: "em-block-fields"
}, kv = ["value", "onInput"], _v = ["value", "onInput"], wv = ["value", "onInput"], $v = { class: "em-var-picker-wrap" }, xv = ["onClick"], Cv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Sv = ["onClick"], Iv = { class: "em-var-picker-wrap" }, Tv = ["onClick"], Av = ["onClick"], Uv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Rv = ["onClick"], Ev = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Pv = ["onClick"], Bv = {
  key: 6,
  class: "em-block-fields"
}, Lv = ["value", "onChange"], Ov = { class: "em-list-items" }, Nv = ["value", "onInput", "placeholder"], Mv = { class: "em-var-picker-wrap" }, Vv = ["onClick"], Dv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Wv = ["onClick"], jv = ["onClick"], Hv = ["onClick"], Fv = {
  key: 7,
  class: "em-block-fields"
}, qv = ["value", "onChange"], zv = ["value", "onInput"], Yv = { class: "em-var-picker-wrap" }, Kv = ["onClick"], Gv = ["onClick"], Jv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Qv = ["onClick"], Xv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Zv = ["onClick"], eb = {
  key: 8,
  class: "em-block-fields"
}, tb = { class: "em-social-links" }, ab = ["value", "onChange"], nb = ["value", "onInput"], sb = ["onClick"], lb = ["onClick"], ob = {
  key: 9,
  class: "em-block-fields"
}, ib = ["value", "onInput"], rb = ["value", "onInput"], ub = ["value", "onInput"], db = { class: "em-var-picker-wrap" }, cb = ["onClick"], pb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, mb = ["onClick"], vb = {
  key: 10,
  class: "em-block-fields"
}, bb = ["value", "onInput"], hb = { class: "em-link-list-items" }, yb = ["value", "onInput"], gb = { class: "em-var-picker-wrap" }, fb = ["onClick"], kb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, _b = ["onClick"], wb = ["value", "onInput"], $b = ["onClick"], xb = ["onClick"], Cb = {
  key: 11,
  class: "em-block-fields"
}, Sb = ["value", "onInput"], Ib = { class: "em-var-picker-wrap" }, Tb = ["onClick"], Ab = ["onClick"], Ub = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Rb = ["onClick"], Eb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Pb = ["onClick"], Bb = ["value", "onInput"], Lb = { class: "em-var-picker-wrap" }, Ob = ["onClick"], Nb = ["onClick"], Mb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Vb = ["onClick"], Db = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Wb = ["onClick"], jb = {
  key: 12,
  class: "em-block-fields"
}, Hb = { class: "em-block-fields--row" }, Fb = ["value", "onInput"], qb = { class: "em-block-fields--row" }, zb = ["value", "onInput"], Yb = ["value", "onChange"], Kb = {
  key: 13,
  class: "em-block-fields"
}, Gb = ["value", "onChange"], Jb = { class: "em-inline-label" }, Qb = ["value", "onInput"], Xb = { class: "em-var-picker-wrap" }, Zb = ["onClick"], eh = ["onClick"], th = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ah = ["onClick"], nh = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, sh = ["onClick"], lh = {
  key: 14,
  class: "em-block-fields"
}, oh = ["value", "onInput"], ih = { class: "em-link-list-items" }, rh = ["value", "onInput"], uh = { class: "em-var-picker-wrap" }, dh = ["onClick"], ch = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ph = ["onClick"], mh = ["value", "onInput"], vh = ["onClick"], bh = ["onClick"], hh = {
  key: 15,
  class: "em-block-fields"
}, yh = ["value", "onInput"], gh = { class: "em-var-picker-wrap" }, fh = ["onClick"], kh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, _h = ["onClick"], wh = ["value", "onInput"], $h = { class: "em-var-picker-wrap" }, xh = ["onClick"], Ch = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Sh = ["onClick"], Ih = ["onClick"], Th = ["onClick"], Ah = {
  key: 16,
  class: "em-block-fields"
}, Uh = ["value", "onInput"], Rh = ["value", "onInput"], Eh = ["value", "onInput"], Ph = ["onClick"], Bh = ["onClick"], Lh = {
  key: 17,
  class: "em-block-fields"
}, Oh = ["value", "onInput"], Nh = { class: "em-var-picker-wrap" }, Mh = ["onClick"], Vh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Dh = ["onClick"], Wh = ["value", "onInput"], jh = {
  key: 18,
  class: "em-block-fields"
}, Hh = ["value", "onInput"], Fh = ["value", "onInput"], qh = { class: "em-var-picker-wrap" }, zh = ["onClick"], Yh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Kh = ["onClick"], Gh = ["value", "onInput"], Jh = { class: "em-var-picker-wrap" }, Qh = ["onClick"], Xh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Zh = ["onClick"], ey = ["value", "onInput"], ty = { class: "em-var-picker-wrap" }, ay = ["onClick"], ny = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, sy = ["onClick"], ly = ["value", "onInput"], oy = {
  key: 19,
  class: "em-block-fields"
}, iy = ["value", "onInput"], ry = { class: "em-var-picker-wrap" }, uy = ["onClick"], dy = ["onClick"], cy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, py = ["onClick"], my = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, vy = ["onClick"], by = {
  key: 20,
  class: "em-block-fields"
}, hy = ["value", "onInput"], yy = { class: "em-var-picker-wrap" }, gy = ["onClick"], fy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ky = ["onClick"], _y = ["value", "onInput"], wy = { class: "em-var-picker-wrap" }, $y = ["onClick"], xy = ["onClick"], Cy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Sy = ["onClick"], Iy = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Ty = ["onClick"], Ay = {
  key: 21,
  class: "em-block-fields"
}, Uy = ["value", "onInput"], Ry = { class: "em-block-fields--row" }, Ey = ["value", "onInput"], Py = {
  key: 22,
  class: "em-block-fields"
}, By = ["value", "onInput"], Ly = ["value", "onInput"], Oy = { class: "em-var-picker-wrap" }, Ny = ["onClick"], My = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Vy = ["onClick"], Dy = ["value", "onInput"], Wy = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, jy = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, Hy = ["onClick"], Fy = ["onClick"], qy = ["onClick"], zy = { class: "em-check-row" }, Yy = ["checked", "onChange"], Ky = { class: "em-add-bar kb-field kb-field--add-bar" }, Gy = { class: "em-add-bar-btns" }, Jy = { class: "em-strip kb-section em-strip--personalize" }, Qy = { class: "em-field kb-field" }, Xy = { class: "em-input-group" }, Zy = ["value"], eg = { class: "em-field kb-field" }, tg = { class: "em-input-group" }, qe = "{{ .var }}", ag = /* @__PURE__ */ Ee({
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
    ], _ = [
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
    function I(b) {
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
    const U = o, T = c, O = [
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
    ], B = ue(
      (we = U.variableOptions) != null && we.length ? [...U.variableOptions] : O
    ), F = ue(B.value[0] ?? "first_name"), te = ue("");
    Le(
      () => U.variableOptions,
      (b) => {
        b != null && b.length && (B.value = [...b], B.value.includes(F.value) || (F.value = B.value[0]));
      }
    );
    const se = $(() => U.message.subject ?? ""), ce = $(() => U.message.preview_text ?? ""), D = $(() => Vp(se.value)), ae = $(() => Dp(ce.value)), q = $(() => Vt(se.value)), pe = $(() => Vt(ce.value)), W = $(() => {
      const b = U.message.blocks;
      return Array.isArray(b) && b.length > 0 ? b : [I("paragraph")];
    });
    Le(
      () => U.message.blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && T("update", { blocks: [I("paragraph")] });
      },
      { immediate: !0 }
    );
    function J(b) {
      T("update", { blocks: b });
    }
    function Z(b) {
      T("update", { subject: b.target.value });
    }
    function ne(b) {
      const r = b.target.value;
      T("update", { preview_text: r || void 0 });
    }
    function ye(b) {
      T("update", { from_name: b.target.value || void 0 });
    }
    function _e(b) {
      T("update", { from_address: b.target.value || void 0 });
    }
    function ee(b) {
      T("update", { reply_to: b.target.value || void 0 });
    }
    const k = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [I("heading"), I("paragraph"), I("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [I("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [I("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [I("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [I("social"), I("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [I("footer"), I("link_list")]
      }
    ];
    function E(b) {
      const r = b.blocks();
      J([...W.value, ...r]);
    }
    function N(b) {
      const r = [...W.value, I(b)];
      J(r);
    }
    function be(b) {
      J(W.value.filter((r) => r.id !== b));
    }
    function ie(b, r) {
      const t = W.value.findIndex((S) => S.id === b);
      if (t < 0) return;
      const Y = r === "up" ? t - 1 : t + 1;
      if (Y < 0 || Y >= W.value.length) return;
      const u = [...W.value];
      [u[t], u[Y]] = [u[Y], u[t]], J(u);
    }
    function x(b, r) {
      const t = W.value.map((Y) => Y.id === b ? { ...Y, ...r } : Y);
      J(t);
    }
    function M(b, r, t) {
      const Y = W.value.find((S) => S.id === b);
      if (!Y || Y.type !== "list") return;
      const u = [...Y.items || []];
      u[r] = t, x(b, { items: u });
    }
    function w(b) {
      const r = W.value.find((t) => t.id === b);
      !r || r.type !== "list" || x(b, { items: [...r.items || [], "New item"] });
    }
    function le(b, r) {
      const t = W.value.find((u) => u.id === b);
      if (!t || t.type !== "list") return;
      const Y = (t.items || []).filter((u, S) => S !== r);
      x(b, { items: Y });
    }
    function ge(b, r, t, Y) {
      const u = W.value.find((H) => H.id === b);
      if (!u || u.type !== "social") return;
      const S = (u.links || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      x(b, { links: S });
    }
    function me(b) {
      const r = W.value.find((t) => t.id === b);
      !r || r.type !== "social" || x(b, { links: [...r.links || [], { platform: "custom", url: "" }] });
    }
    function he(b, r) {
      const t = W.value.find((u) => u.id === b);
      if (!t || t.type !== "social") return;
      const Y = (t.links || []).filter((u, S) => S !== r);
      x(b, { links: Y });
    }
    function L(b, r, t, Y) {
      const u = W.value.find((H) => H.id === b);
      if (!u || u.type !== "link_list") return;
      const S = (u.links || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      x(b, { links: S });
    }
    function X(b) {
      const r = W.value.find((t) => t.id === b);
      !r || r.type !== "link_list" || x(b, { links: [...r.links || [], { text: "", url: "" }] });
    }
    function G(b, r) {
      const t = W.value.find((u) => u.id === b);
      if (!t || t.type !== "link_list") return;
      const Y = (t.links || []).filter((u, S) => S !== r);
      x(b, { links: Y });
    }
    function $e(b, r) {
      const t = W.value.find((Y) => Y.id === b);
      if (!(!t || t.type !== "row")) {
        if (r.columnCount !== void 0 && r.columnCount !== t.columnCount) {
          const Y = [...t.cells || []];
          for (; Y.length < r.columnCount; ) Y.push("Cell content");
          r.cells = Y.slice(0, r.columnCount);
        }
        x(b, r);
      }
    }
    function ve(b, r, t) {
      const Y = W.value.find((S) => S.id === b);
      if (!Y || Y.type !== "row") return;
      const u = [...Y.cells || []];
      u[r] = t, x(b, { cells: u });
    }
    function z(b, r, t, Y) {
      const u = W.value.find((H) => H.id === b);
      if (!u || u.type !== "navbar") return;
      const S = (u.links || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      x(b, { links: S });
    }
    function Ie(b) {
      const r = W.value.find((t) => t.id === b);
      !r || r.type !== "navbar" || x(b, { links: [...r.links || [], { text: "", url: "" }] });
    }
    function Ue(b, r) {
      const t = W.value.find((Y) => Y.id === b);
      !t || t.type !== "navbar" || x(b, { links: (t.links || []).filter((Y, u) => u !== r) });
    }
    function Be(b, r, t, Y) {
      const u = W.value.find((H) => H.id === b);
      if (!u || u.type !== "accordion") return;
      const S = (u.items || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      x(b, { items: S });
    }
    function De(b) {
      const r = W.value.find((t) => t.id === b);
      !r || r.type !== "accordion" || x(b, { items: [...r.items || [], { title: "New section", content: "" }] });
    }
    function Re(b, r) {
      const t = W.value.find((Y) => Y.id === b);
      !t || t.type !== "accordion" || x(b, { items: (t.items || []).filter((Y, u) => u !== r) });
    }
    function Ne(b, r, t, Y) {
      const u = W.value.find((H) => H.id === b);
      if (!u || u.type !== "carousel") return;
      const S = (u.slides || []).map((H, Te) => Te === r ? { ...H, [t]: Y } : H);
      x(b, { slides: S });
    }
    function He(b) {
      const r = W.value.find((t) => t.id === b);
      !r || r.type !== "carousel" || x(b, { slides: [...r.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function We(b, r) {
      const t = W.value.find((Y) => Y.id === b);
      !t || t.type !== "carousel" || x(b, { slides: (t.slides || []).filter((Y, u) => u !== r) });
    }
    function Fe(b, r = F.value) {
      const t = ` {{ .${r} }}`, Y = U.message.variables ?? [], u = Array.from(/* @__PURE__ */ new Set([...Y, r]));
      b === "subject" ? T("update", {
        subject: (se.value || "") + t,
        variables: u
      }) : T("update", {
        preview_text: (ce.value || "") + t,
        variables: u
      });
    }
    function Me(b, r = F.value) {
      const t = W.value.find((ze) => ze.id === b);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const Y = ` {{ .${r} }}`, u = U.message.variables ?? [], S = Array.from(/* @__PURE__ */ new Set([...u, r])), H = (t.type === "footer", "content"), tt = (t[H] ?? "") + Y, at = W.value.map(
        (ze) => ze.id === b ? { ...ze, [H]: tt } : ze
      );
      T("update", { blocks: at, variables: S });
    }
    function oe(b, r, t = F.value) {
      const Y = W.value.find((tt) => tt.id === b);
      if (!Y || Y.type !== "row") return;
      const u = ` {{ .${t} }}`, S = U.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...S, t])), Te = [...Y.cells || []];
      Te[r] = (Te[r] || "") + u, x(b, { cells: Te }), T("update", { variables: H });
    }
    function s(b, r, t = F.value) {
      const Y = W.value.find((ze) => ze.id === b);
      if (!Y || Y.type !== "columns") return;
      const u = ` {{ .${t} }}`, S = U.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...S, t])), Te = r === "left" ? "leftContent" : "rightContent", at = (Y[Te] ?? "") + u;
      x(b, { [Te]: at }), T("update", { variables: H });
    }
    const l = ue(null), f = ue(null), h = [
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
    function V(b) {
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
          oe(t, Number(Y), r);
        }
        l.value = null;
      }
    }
    function i(b) {
      f.value = f.value === b ? null : b;
    }
    function p(b, r) {
      return `${String(b ?? "")}${r}`;
    }
    function A(b, r) {
      var Y, u;
      if (!r) return;
      const t = W.value.find((S) => S.id === b);
      if (t) {
        switch (t.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            x(b, { content: `${String(t.content ?? "")}${r}` });
            break;
          case "button":
            x(b, { text: `${String(t.text ?? "")}${r}` });
            break;
          case "image":
            x(b, { alt: `${String(t.alt ?? "")}${r}` });
            break;
          case "video":
            x(b, { caption: `${String(t.caption ?? "")}${r}` });
            break;
          case "columns":
            x(b, { leftContent: `${String(t.leftContent ?? "")}${r}` });
            break;
          case "row": {
            const S = (Array.isArray(t.cells) ? [...t.cells] : []).map((H) => String(H ?? ""));
            S.length === 0 && S.push(""), S[0] = `${String(S[0] ?? "")}${r}`, x(b, { cells: S });
            break;
          }
          case "navbar":
          case "link_list": {
            const S = Array.isArray(t.links) ? [...t.links] : [];
            S.length || S.push({ text: "", url: "" }), S[0] = { ...S[0], text: `${String(((Y = S[0]) == null ? void 0 : Y.text) ?? "")}${r}` }, x(b, { links: S });
            break;
          }
          case "accordion": {
            const S = Array.isArray(t.items) ? [...t.items] : [];
            S.length || S.push({ title: "", content: "" }), S[0] = { ...S[0], title: `${String(((u = S[0]) == null ? void 0 : u.title) ?? "")}${r}` }, x(b, { items: S });
            break;
          }
          case "countdown":
            x(b, { label: `${String(t.label ?? "")}${r}` });
            break;
          case "product_card":
            x(b, { title: `${String(t.title ?? "")}${r}` });
            break;
          case "dynamic_image":
            x(b, { alt: `${String(t.alt ?? "")}${r}` });
            break;
        }
        f.value = null;
      }
    }
    function R(b, r) {
      var t, Y, u, S, H, Te, tt, at, ze;
      if (r) {
        if (b === "subject")
          T("update", { subject: p(se.value, r) });
        else if (b === "preview")
          T("update", { preview_text: p(ce.value, r) });
        else if (b === "from-name")
          T("update", { from_name: p(U.message.from_name, r) });
        else if (b.startsWith("block:")) {
          A(b.slice(6), r);
          return;
        } else if (b.startsWith("col-left:")) {
          const de = b.slice(9), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "columns" && x(de, { leftContent: p(Q.leftContent, r) });
        } else if (b.startsWith("col-right:")) {
          const de = b.slice(10), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "columns" && x(de, { rightContent: p(Q.rightContent, r) });
        } else if (b.startsWith("row:")) {
          const [, de, Q] = b.split(":"), fe = Number(Q), Se = W.value.find((Ve) => Ve.id === de);
          if ((Se == null ? void 0 : Se.type) === "row" && Number.isFinite(fe)) {
            const Ve = [...Se.cells || []].map((ta) => String(ta ?? ""));
            Ve[fe] = p(Ve[fe], r), x(de, { cells: Ve });
          }
        } else if (b.startsWith("button-text:")) {
          const de = b.slice(12), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "button" && x(de, { text: p(Q.text, r) });
        } else if (b.startsWith("image-alt:")) {
          const de = b.slice(10), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "image" && x(de, { alt: p(Q.alt, r) });
        } else if (b.startsWith("video-caption:")) {
          const de = b.slice(14), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "video" && x(de, { caption: p(Q.caption, r) });
        } else if (b.startsWith("dynamic-alt:")) {
          const de = b.slice(12), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "dynamic_image" && x(de, { alt: p(Q.alt, r) });
        } else if (b.startsWith("countdown-label:")) {
          const de = b.slice(16), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "countdown" && x(de, { label: p(Q.label, r) });
        } else if (b.startsWith("product-title:")) {
          const de = b.slice(14), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "product_card" && x(de, { title: p(Q.title, r) });
        } else if (b.startsWith("product-price:")) {
          const de = b.slice(14), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "product_card" && x(de, { price: p(Q.price, r) });
        } else if (b.startsWith("product-button:")) {
          const de = b.slice(15), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "product_card" && x(de, { buttonText: p(Q.buttonText, r) });
        } else if (b.startsWith("footer-address:")) {
          const de = b.slice(15), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "footer" && x(de, { companyAddress: p(Q.companyAddress, r) });
        } else if (b.startsWith("code-caption:")) {
          const de = b.slice(13), Q = W.value.find((fe) => fe.id === de);
          (Q == null ? void 0 : Q.type) === "code_block" && x(de, { caption: p(Q.caption, r) });
        } else if (b.startsWith("list-item:")) {
          const [, de, Q] = b.split(":"), fe = Number(Q), Se = W.value.find((Ve) => Ve.id === de);
          (Se == null ? void 0 : Se.type) === "list" && Number.isFinite(fe) && M(de, fe, p((t = Se.items) == null ? void 0 : t[fe], r));
        } else if (b.startsWith("link-list-item:")) {
          const [, de, Q] = b.split(":"), fe = Number(Q), Se = W.value.find((Ve) => Ve.id === de);
          (Se == null ? void 0 : Se.type) === "link_list" && Number.isFinite(fe) && L(de, fe, "text", p((u = (Y = Se.links) == null ? void 0 : Y[fe]) == null ? void 0 : u.text, r));
        } else if (b.startsWith("navbar-item:")) {
          const [, de, Q] = b.split(":"), fe = Number(Q), Se = W.value.find((Ve) => Ve.id === de);
          (Se == null ? void 0 : Se.type) === "navbar" && Number.isFinite(fe) && z(de, fe, "text", p((H = (S = Se.links) == null ? void 0 : S[fe]) == null ? void 0 : H.text, r));
        } else if (b.startsWith("accordion-title:")) {
          const [, de, Q] = b.split(":"), fe = Number(Q), Se = W.value.find((Ve) => Ve.id === de);
          (Se == null ? void 0 : Se.type) === "accordion" && Number.isFinite(fe) && Be(de, fe, "title", p((tt = (Te = Se.items) == null ? void 0 : Te[fe]) == null ? void 0 : tt.title, r));
        } else if (b.startsWith("accordion-content:")) {
          const [, de, Q] = b.split(":"), fe = Number(Q), Se = W.value.find((Ve) => Ve.id === de);
          (Se == null ? void 0 : Se.type) === "accordion" && Number.isFinite(fe) && Be(de, fe, "content", p((ze = (at = Se.items) == null ? void 0 : at[fe]) == null ? void 0 : ze.content, r));
        }
        f.value = null;
      }
    }
    function re() {
      const b = te.value.trim();
      !b || B.value.includes(b) || (B.value = [...B.value, b], F.value = b, te.value = "");
    }
    return (b, r) => (a(), n("section", Fp, [
      e("div", qp, [
        e("div", zp, [
          r[31] || (r[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: r[0] || (r[0] = (t) => b.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        r[38] || (r[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Yp, [
          r[32] || (r[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", Kp, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: o.message.from_name ?? "",
              onInput: ye
            }, null, 40, Gp),
            e("div", Jp, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[1] || (r[1] = (t) => i("from-name")),
                title: "Insert emoji"
              }, "😊"),
              f.value === "from-name" ? (a(), n("div", Qp, [
                (a(), n(P, null, j(h, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => R("from-name", t)
                }, d(t), 9, Xp)), 64))
              ])) : g("", !0)
            ])
          ])
        ]),
        e("div", Zp, [
          r[33] || (r[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: o.message.from_address ?? "",
            onInput: _e
          }, null, 40, em)
        ]),
        e("div", tm, [
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
          }, null, 40, am)
        ]),
        e("div", nm, [
          r[35] || (r[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", sm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: se.value,
              onInput: Z
            }, null, 40, lm),
            e("div", om, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[2] || (r[2] = (t) => V("subject")),
                title: "Insert variable"
              }, d(qe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[3] || (r[3] = (t) => i("subject")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "subject" ? (a(), n("div", im, [
                (a(!0), n(P, null, j(B.value, (t) => (a(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (Y) => m("subject", t)
                }, d(t), 9, rm))), 128))
              ])) : g("", !0),
              f.value === "subject" ? (a(), n("div", um, [
                (a(), n(P, null, j(h, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => R("subject", t)
                }, d(t), 9, dm)), 64))
              ])) : g("", !0)
            ])
          ]),
          e("span", {
            class: ke(["em-analyzer", `em-analyzer--${D.value}`])
          }, d(C(jp)(D.value)), 3),
          q.value.length ? (a(), n("span", cm, "Spammy: " + d(q.value.join(", ")), 1)) : g("", !0)
        ]),
        e("div", pm, [
          r[36] || (r[36] = e("label", { class: "em-label" }, [
            K("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", mm, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: ce.value,
              onInput: ne
            }, null, 40, vm),
            e("div", bm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[4] || (r[4] = (t) => V("preview")),
                title: "Insert variable"
              }, d(qe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: r[5] || (r[5] = (t) => i("preview")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "preview" ? (a(), n("div", hm, [
                (a(!0), n(P, null, j(B.value, (t) => (a(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (Y) => m("preview", t)
                }, d(t), 9, ym))), 128))
              ])) : g("", !0),
              f.value === "preview" ? (a(), n("div", gm, [
                (a(), n(P, null, j(h, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (Y) => R("preview", t)
                }, d(t), 9, fm)), 64))
              ])) : g("", !0)
            ])
          ]),
          r[37] || (r[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ke(["em-analyzer", `em-analyzer--${ae.value}`])
          }, d(C(Hp)(ae.value)), 3),
          pe.value.length ? (a(), n("span", km, "Spammy: " + d(pe.value.join(", ")), 1)) : g("", !0)
        ])
      ]),
      e("div", _m, [
        r[39] || (r[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        r[40] || (r[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", wm, [
          (a(), n(P, null, j(k, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (Y) => E(t)
          }, d(t.label), 9, $m)), 64))
        ])
      ]),
      e("div", xm, [
        r[67] || (r[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        r[68] || (r[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Cm, [
          (a(!0), n(P, null, j(W.value, (t, Y) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Im, [
              e("span", Tm, d(t.type), 1),
              e("div", Am, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: Y === 0,
                  onClick: (u) => ie(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Um),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: Y === W.value.length - 1,
                  onClick: (u) => ie(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Rm),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => be(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Em)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", Pm, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (u) => x(t.id, { level: Number(u.target.value) })
              }, [...r[41] || (r[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Bm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (u) => x(t.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, Lm),
              e("div", Om, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`block:${t.id}`)
                }, d(qe), 8, Nm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Mm),
                l.value === `block:${t.id}` ? (a(), n("div", Vm, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `block-var-heading-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`block:${t.id}`, u)
                  }, d(u), 9, Dm))), 128))
                ])) : g("", !0),
                f.value === `emoji:block:${t.id}` ? (a(), n("div", Wm, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-heading-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`block:${t.id}`, u)
                  }, d(u), 9, jm)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), n("div", Hm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => x(t.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Fm),
              e("div", qm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`block:${t.id}`)
                }, d(qe), 8, zm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ym),
                l.value === `block:${t.id}` ? (a(), n("div", Km, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `block-var-paragraph-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`block:${t.id}`, u)
                  }, d(u), 9, Gm))), 128))
                ])) : g("", !0),
                f.value === `emoji:block:${t.id}` ? (a(), n("div", Jm, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-paragraph-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`block:${t.id}`, u)
                  }, d(u), 9, Qm)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "image" ? (a(), n("div", Xm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (u) => x(t.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, Zm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => x(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, ev),
              e("div", tv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, av),
                f.value === `image-alt:${t.id}` ? (a(), n("div", nv, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-image-alt-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`image-alt:${t.id}`, u)
                  }, d(u), 9, sv)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (u) => x(t.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, lv)
            ])) : t.type === "button" ? (a(), n("div", ov, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (u) => x(t.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, iv),
              e("div", rv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, uv),
                f.value === `button-text:${t.id}` ? (a(), n("div", dv, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-button-text-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`button-text:${t.id}`, u)
                  }, d(u), 9, cv)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (u) => x(t.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, pv),
              e("div", mv, [
                r[42] || (r[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (u) => x(t.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, vv)
              ]),
              e("label", bv, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (u) => x(t.id, { ghost: u.target.checked })
                }, null, 40, hv),
                r[43] || (r[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", yv, [
              r[44] || (r[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (u) => x(t.id, { height: Number(u.target.value) || 24 })
              }, null, 40, gv),
              r[45] || (r[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", fv, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => x(t.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, kv),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (u) => x(t.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, _v),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (u) => x(t.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, wv),
              e("div", $v, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, xv),
                f.value === `footer-address:${t.id}` ? (a(), n("div", Cv, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-footer-address-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`footer-address:${t.id}`, u)
                  }, d(u), 9, Sv)), 64))
                ])) : g("", !0)
              ]),
              e("div", Iv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`block:${t.id}`)
                }, d(qe), 8, Tv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Av),
                l.value === `block:${t.id}` ? (a(), n("div", Uv, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `block-var-footer-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`block:${t.id}`, u)
                  }, d(u), 9, Rv))), 128))
                ])) : g("", !0),
                f.value === `emoji:block:${t.id}` ? (a(), n("div", Ev, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-footer-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`block:${t.id}`, u)
                  }, d(u), 9, Pv)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "list" ? (a(), n("div", Bv, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (u) => x(t.id, { style: u.target.value })
              }, [...r[46] || (r[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Lv),
              e("div", Ov, [
                (a(!0), n(P, null, j(t.items || [], (u, S) => (a(), n("div", {
                  key: S,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (H) => M(t.id, S, H.target.value),
                    placeholder: `Item ${S + 1}`
                  }, null, 40, Nv),
                  e("div", Mv, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => i(`list-item:${t.id}:${S}`),
                      title: "Insert emoji"
                    }, "😊", 8, Vv),
                    f.value === `list-item:${t.id}:${S}` ? (a(), n("div", Dv, [
                      (a(), n(P, null, j(h, (H) => e("button", {
                        key: `emoji-list-item-${t.id}-${S}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => R(`list-item:${t.id}:${S}`, H)
                      }, d(H), 9, Wv)), 64))
                    ])) : g("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => le(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, jv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => w(t.id)
              }, "+ Add item", 8, Hv)
            ])) : t.type === "quote" ? (a(), n("div", Fv, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => x(t.id, { style: u.target.value })
              }, [...r[47] || (r[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, qv),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => x(t.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, zv),
              e("div", Yv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`block:${t.id}`)
                }, d(qe), 8, Kv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Gv),
                l.value === `block:${t.id}` ? (a(), n("div", Jv, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `block-var-quote-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`block:${t.id}`, u)
                  }, d(u), 9, Qv))), 128))
                ])) : g("", !0),
                f.value === `emoji:block:${t.id}` ? (a(), n("div", Xv, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-quote-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`block:${t.id}`, u)
                  }, d(u), 9, Zv)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "social" ? (a(), n("div", eb, [
              e("div", tb, [
                (a(!0), n(P, null, j(t.links || [], (u, S) => (a(), n("div", {
                  key: S,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (H) => ge(t.id, S, "platform", H.target.value)
                  }, [...r[48] || (r[48] = [
                    Je('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, ab),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (H) => ge(t.id, S, "url", H.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, nb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => he(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, sb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => me(t.id)
              }, "+ Add link", 8, lb)
            ])) : t.type === "video" ? (a(), n("div", ob, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (u) => x(t.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, ib),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (u) => x(t.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, rb),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => x(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, ub),
              e("div", db, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, cb),
                f.value === `video-caption:${t.id}` ? (a(), n("div", pb, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-video-caption-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`video-caption:${t.id}`, u)
                  }, d(u), 9, mb)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "link_list" ? (a(), n("div", vb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => x(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, bb),
              e("div", hb, [
                (a(!0), n(P, null, j(t.links || [], (u, S) => (a(), n("div", {
                  key: S,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (H) => L(t.id, S, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, yb),
                  e("div", gb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => i(`link-list-item:${t.id}:${S}`),
                      title: "Insert emoji"
                    }, "😊", 8, fb),
                    f.value === `link-list-item:${t.id}:${S}` ? (a(), n("div", kb, [
                      (a(), n(P, null, j(h, (H) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${S}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => R(`link-list-item:${t.id}:${S}`, H)
                      }, d(H), 9, _b)), 64))
                    ])) : g("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (H) => L(t.id, S, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, wb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => G(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, $b)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => X(t.id)
              }, "+ Add link", 8, xb)
            ])) : t.type === "columns" ? (a(), n("div", Cb, [
              r[49] || (r[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (u) => x(t.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Sb),
              e("div", Ib, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`col-left:${t.id}`)
                }, d(qe), 8, Tb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ab),
                l.value === `col-left:${t.id}` ? (a(), n("div", Ub, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `col-left-var-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`col-left:${t.id}`, u)
                  }, d(u), 9, Rb))), 128))
                ])) : g("", !0),
                f.value === `emoji:col-left:${t.id}` ? (a(), n("div", Eb, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-col-left-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`col-left:${t.id}`, u)
                  }, d(u), 9, Pb)), 64))
                ])) : g("", !0)
              ]),
              r[50] || (r[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (u) => x(t.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Bb),
              e("div", Lb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`col-right:${t.id}`)
                }, d(qe), 8, Ob),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Nb),
                l.value === `col-right:${t.id}` ? (a(), n("div", Mb, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `col-right-var-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`col-right:${t.id}`, u)
                  }, d(u), 9, Vb))), 128))
                ])) : g("", !0),
                f.value === `emoji:col-right:${t.id}` ? (a(), n("div", Db, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-col-right-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`col-right:${t.id}`, u)
                  }, d(u), 9, Wb)), 64))
                ])) : g("", !0)
              ])
            ])) : t.type === "divider" ? (a(), n("div", jb, [
              e("div", Hb, [
                r[51] || (r[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (u) => x(t.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, Fb),
                r[52] || (r[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", qb, [
                r[53] || (r[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (u) => x(t.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, zb)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => x(t.id, { lineStyle: u.target.value })
              }, [...r[54] || (r[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Yb)
            ])) : t.type === "row" ? (a(), n("div", Kb, [
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
              ])], 40, Gb),
              (a(!0), n(P, null, j(t.cells || [], (u, S) => (a(), n("div", {
                key: S,
                class: "em-row-cell"
              }, [
                e("label", Jb, "Column " + d(S + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (H) => ve(t.id, S, H.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Qb),
                e("div", Xb, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => V(`row:${t.id}:${S}`)
                  }, d(qe), 8, Zb),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => i(`emoji:row:${t.id}:${S}`),
                    title: "Insert emoji"
                  }, "😊", 8, eh),
                  l.value === `row:${t.id}:${S}` ? (a(), n("div", th, [
                    (a(!0), n(P, null, j(B.value, (H) => (a(), n("button", {
                      key: `row-var-${t.id}-${S}-${H}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (Te) => m(`row:${t.id}:${S}`, H)
                    }, d(H), 9, ah))), 128))
                  ])) : g("", !0),
                  f.value === `emoji:row:${t.id}:${S}` ? (a(), n("div", nh, [
                    (a(), n(P, null, j(h, (H) => e("button", {
                      key: `emoji-row-${t.id}-${S}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => R(`row:${t.id}:${S}`, H)
                    }, d(H), 9, sh)), 64))
                  ])) : g("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", lh, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => x(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, oh),
              e("div", ih, [
                (a(!0), n(P, null, j(t.links || [], (u, S) => (a(), n("div", {
                  key: S,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (H) => z(t.id, S, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, rh),
                  e("div", uh, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (H) => i(`navbar-item:${t.id}:${S}`),
                      title: "Insert emoji"
                    }, "😊", 8, dh),
                    f.value === `navbar-item:${t.id}:${S}` ? (a(), n("div", ch, [
                      (a(), n(P, null, j(h, (H) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${S}-${H}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Te) => R(`navbar-item:${t.id}:${S}`, H)
                      }, d(H), 9, ph)), 64))
                    ])) : g("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (H) => z(t.id, S, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, mh),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => Ue(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, vh)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Ie(t.id)
              }, "+ Add link", 8, bh)
            ])) : t.type === "accordion" ? (a(), n("div", hh, [
              (a(!0), n(P, null, j(t.items || [], (u, S) => (a(), n("div", {
                key: S,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (H) => Be(t.id, S, "title", H.target.value),
                  placeholder: "Section title"
                }, null, 40, yh),
                e("div", gh, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => i(`accordion-title:${t.id}:${S}`),
                    title: "Insert emoji"
                  }, "😊", 8, fh),
                  f.value === `accordion-title:${t.id}:${S}` ? (a(), n("div", kh, [
                    (a(), n(P, null, j(h, (H) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${S}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => R(`accordion-title:${t.id}:${S}`, H)
                    }, d(H), 9, _h)), 64))
                  ])) : g("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (H) => Be(t.id, S, "content", H.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, wh),
                e("div", $h, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => i(`accordion-content:${t.id}:${S}`),
                    title: "Insert emoji"
                  }, "😊", 8, xh),
                  f.value === `accordion-content:${t.id}:${S}` ? (a(), n("div", Ch, [
                    (a(), n(P, null, j(h, (H) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${S}-${H}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Te) => R(`accordion-content:${t.id}:${S}`, H)
                    }, d(H), 9, Sh)), 64))
                  ])) : g("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => Re(t.id, S),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ih)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => De(t.id)
              }, "+ Add section", 8, Th)
            ])) : t.type === "carousel" ? (a(), n("div", Ah, [
              (a(!0), n(P, null, j(t.slides || [], (u, S) => (a(), n("div", {
                key: S,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (H) => Ne(t.id, S, "imageUrl", H.target.value),
                  placeholder: "Image URL"
                }, null, 40, Uh),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (H) => Ne(t.id, S, "alt", H.target.value),
                  placeholder: "Alt text"
                }, null, 40, Rh),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (H) => Ne(t.id, S, "linkUrl", H.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Eh),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => We(t.id, S),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ph)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => He(t.id)
              }, "+ Add slide", 8, Bh)
            ])) : t.type === "countdown" ? (a(), n("div", Lh, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (u) => x(t.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Oh),
              e("div", Nh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Mh),
                f.value === `countdown-label:${t.id}` ? (a(), n("div", Vh, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`countdown-label:${t.id}`, u)
                  }, d(u), 9, Dh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (u) => x(t.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Wh),
              r[57] || (r[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", jh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => x(t.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Hh),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (u) => x(t.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, Fh),
              e("div", qh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, zh),
                f.value === `product-title:${t.id}` ? (a(), n("div", Yh, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-product-title-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`product-title:${t.id}`, u)
                  }, d(u), 9, Kh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (u) => x(t.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Gh),
              e("div", Jh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Qh),
                f.value === `product-price:${t.id}` ? (a(), n("div", Xh, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-product-price-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`product-price:${t.id}`, u)
                  }, d(u), 9, Zh)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (u) => x(t.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, ey),
              e("div", ty, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ay),
                f.value === `product-button:${t.id}` ? (a(), n("div", ny, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-product-button-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`product-button:${t.id}`, u)
                  }, d(u), 9, sy)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (u) => x(t.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, ly)
            ])) : t.type === "liquid" ? (a(), n("div", oy, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => x(t.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, iy),
              e("div", ry, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`block:${t.id}`)
                }, d(qe), 8, uy),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, dy),
                l.value === `block:${t.id}` ? (a(), n("div", cy, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `block-var-liquid-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`block:${t.id}`, u)
                  }, d(u), 9, py))), 128))
                ])) : g("", !0),
                f.value === `emoji:block:${t.id}` ? (a(), n("div", my, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-liquid-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`block:${t.id}`, u)
                  }, d(u), 9, vy)), 64))
                ])) : g("", !0)
              ]),
              r[58] || (r[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", by, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => x(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, hy),
              e("div", yy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, gy),
                f.value === `code-caption:${t.id}` ? (a(), n("div", fy, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-code-caption-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`code-caption:${t.id}`, u)
                  }, d(u), 9, ky)), 64))
                ])) : g("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => x(t.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, _y),
              e("div", wy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => V(`block:${t.id}`)
                }, d(qe), 8, $y),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, xy),
                l.value === `block:${t.id}` ? (a(), n("div", Cy, [
                  (a(!0), n(P, null, j(B.value, (u) => (a(), n("button", {
                    key: `block-var-code-${t.id}-${u}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (S) => m(`block:${t.id}`, u)
                  }, d(u), 9, Sy))), 128))
                ])) : g("", !0),
                f.value === `emoji:block:${t.id}` ? (a(), n("div", Iy, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-code-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`block:${t.id}`, u)
                  }, d(u), 9, Ty)), 64))
                ])) : g("", !0)
              ]),
              r[59] || (r[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", Ay, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (u) => x(t.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Uy),
              e("div", Ry, [
                r[60] || (r[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (u) => x(t.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, Ey)
              ]),
              r[61] || (r[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", Py, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => x(t.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, By),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => x(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, Ly),
              e("div", Oy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (u) => i(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ny),
                f.value === `dynamic-alt:${t.id}` ? (a(), n("div", My, [
                  (a(), n(P, null, j(h, (u) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${u}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (S) => R(`dynamic-alt:${t.id}`, u)
                  }, d(u), 9, Vy)), 64))
                ])) : g("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (u) => x(t.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Dy)
            ])) : g("", !0),
            _.includes(t.type) ? (a(), n("div", Wy, [
              e("div", jy, [
                e("button", {
                  type: "button",
                  class: ke(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (u) => x(t.id, { alignment: "left" })
                }, [...r[62] || (r[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Hy),
                e("button", {
                  type: "button",
                  class: ke(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (u) => x(t.id, { alignment: "center" })
                }, [...r[63] || (r[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Fy),
                e("button", {
                  type: "button",
                  class: ke(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (u) => x(t.id, { alignment: "right" })
                }, [...r[64] || (r[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, qy)
              ]),
              e("label", zy, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (u) => x(t.id, { fullWidth: u.target.checked })
                }, null, 40, Yy),
                r[65] || (r[65] = e("span", null, "Full width", -1))
              ])
            ])) : g("", !0)
          ], 8, Sm))), 128))
        ]),
        e("div", Ky, [
          r[66] || (r[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Gy, [
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
      e("div", Jy, [
        r[71] || (r[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        r[72] || (r[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Qy, [
          r[69] || (r[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Xy, [
            je(e("select", {
              "onUpdate:modelValue": r[29] || (r[29] = (t) => F.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(P, null, j(B.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, d(t), 9, Zy))), 128))
            ], 512), [
              [Ke, F.value]
            ])
          ])
        ]),
        e("div", eg, [
          r[70] || (r[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", tg, [
            je(e("input", {
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
              onClick: re
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), ng = /* @__PURE__ */ Pe(ag, [["__scopeId", "data-v-62cf50f4"]]), sg = { class: "keos-email-builder" }, lg = { class: "kb-builder-top" }, og = { class: "kb-email-layout" }, ig = { class: "kb-email-sidebar" }, rg = {
  key: 0,
  class: "kb-email-form"
}, ug = { class: "kb-email-form-head" }, dg = { class: "kb-email-form-head-top" }, cg = { class: "kb-email-health-pill" }, pg = { class: "kb-wa-form-head-row" }, mg = ["value"], vg = { class: "kb-email-health" }, bg = { class: "kb-email-health-row" }, hg = { class: "kb-email-health-value" }, yg = { class: "kb-email-health-bar" }, gg = { class: "kb-email-canvas" }, fg = {
  key: 0,
  class: "kb-email-test-banner"
}, kg = { class: "kb-email-preview-chrome" }, _g = { class: "kb-push-preview-controls" }, wg = { class: "kb-push-preview-as" }, $g = ["value"], xg = { class: "kb-preview-status" }, Cg = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Sg = { class: "kb-email-inbox-strip" }, Ig = { class: "kb-email-inbox-from" }, Tg = { class: "kb-email-inbox-from-name" }, Ag = { class: "kb-email-inbox-from-addr" }, Ug = { class: "kb-email-inbox-subject" }, Rg = ["title"], Eg = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Pg = { class: "kb-email-body-canvas" }, Bg = ["innerHTML"], Lg = { class: "kb-email-actions" }, Og = {
  key: 0,
  class: "kb-actions-note"
}, Ng = { key: 0 }, Mg = { class: "kb-email-actions-right" }, Vg = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Dg = { class: "kb-confirm-dialog" }, Wg = { class: "kb-confirm-actions" }, jg = /* @__PURE__ */ Ee({
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
      const l = (m) => String(m).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), f = [
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
        if (!f.includes(i.type)) return m;
        const p = i.alignment || "left", A = !!i.fullWidth;
        return `<div style="text-align:${p};${A ? "width:100%;" : ""}">${m}</div>`;
      }, V = [];
      for (const m of s)
        switch (m.type) {
          case "heading": {
            const i = Math.min(3, Math.max(1, Number(m.level) || 1)), p = l(m.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            V.push(
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
            V.push(
              h(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${i || "Paragraph"}</p>`,
                m
              )
            );
            break;
          }
          case "image": {
            const i = (m.src || "").trim(), p = l(m.alt || ""), A = (m.linkUrl || "").trim(), re = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", we = i ? `<img src="${l(i)}" alt="${p}" style="${re}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            V.push(
              h(
                `<div style="margin:0 0 12px;">${A ? `<a href="${l(A)}" style="color:#2563eb;">${we}</a>` : we}</div>`,
                m
              )
            );
            break;
          }
          case "button": {
            const i = l(m.text || "Button"), p = (m.url || "#").trim(), A = Math.min(24, Math.max(0, Number(m.borderRadius) ?? 8)), R = !!m.fullWidth, re = !!m.ghost, we = re ? "transparent" : "#0f172a", b = re ? "#0f172a" : "#fff", r = re ? "2px solid #0f172a" : "none", t = R ? "block" : "inline-block", Y = R ? "100%" : "auto";
            V.push(
              h(
                `<p style="margin:0 0 12px;"><a href="${l(p)}" style="display:${t};width:${Y};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${we};color:${b};border:${r};text-decoration:none;font-size:14px;font-weight:600;border-radius:${A}px;overflow-wrap:anywhere;">${i}</a></p>`,
                m
              )
            );
            break;
          }
          case "divider": {
            const i = Math.min(8, Math.max(1, Number(m.thickness) || 1)), p = (m.color || "#e2e8f0").trim() || "#e2e8f0", A = m.lineStyle || "solid";
            V.push(
              h(
                `<hr style="margin:16px 0;border:0;border-top:${i}px ${A} ${p};" />`,
                m
              )
            );
            break;
          }
          case "spacer": {
            const i = Math.min(120, Math.max(8, Number(m.height) || 24));
            V.push(h(`<div style="height:${i}px;"></div>`, m));
            break;
          }
          case "footer": {
            const i = l(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), p = (m.unsubscribeUrl || "").trim(), A = l(m.companyAddress || "");
            V.push(
              h(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${i || "Footer"}` + (p ? `<p style="margin:8px 0 0;"><a href="${l(p)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (A ? `<p style="margin:4px 0 0;">${A}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "list": {
            const i = m.style === "numbered" ? "ol" : "ul", A = (Array.isArray(m.items) ? m.items : []).map(
              (R) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${l(String(R)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            V.push(
              h(
                `<${i} style="margin:0 0 12px;padding-left:24px;">${A || "<li>Item</li>"}</${i}>`,
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
            }, A = p[m.style || "default"] || p.default;
            V.push(
              h(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${A}font-size:14px;line-height:1.6;">${i || "Quote"}</div>`,
                m
              )
            );
            break;
          }
          case "social": {
            const p = (Array.isArray(m.links) ? m.links : []).filter((A) => (A.url || "").trim());
            if (p.length === 0)
              V.push(
                h(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  m
                )
              );
            else {
              const A = (R) => `<a href="${l((R.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${l(R.platform || "Link")}</a>`;
              V.push(
                h(
                  `<div style="margin:0 0 12px;">${p.map(A).join("")}</div>`,
                  m
                )
              );
            }
            break;
          }
          case "video": {
            const i = (m.thumbnailUrl || "").trim(), p = (m.videoUrl || "#").trim(), A = l(m.caption || ""), re = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", we = i ? `<img src="${l(i)}" alt="Video" style="${re}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            V.push(
              h(
                `<div style="margin:0 0 12px;"><a href="${l(p)}" style="display:block;color:inherit;">${we}</a>` + (A ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${A}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "link_list": {
            const i = Array.isArray(m.links) ? m.links : [], p = l(m.separator || " | "), R = i.filter(
              (re) => (re.text || re.url) && (re.url || "").trim()
            ).map(
              (re) => `<a href="${l((re.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(re.text || "Link")}</a>`
            );
            V.push(
              h(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${R.join(p)}</p>`,
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
            V.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${i || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${p || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const i = Math.min(4, Math.max(1, Number(m.columnCount) || 2)), p = Array.isArray(m.cells) ? m.cells.slice(0, i) : [], A = 100 / i, R = Array.from({ length: i }, (re, we) => {
              const b = p[we] ?? "", r = l(b).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${A}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${r || "—"}</td>`;
            }).join("");
            V.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${R}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const i = Array.isArray(m.links) ? m.links : [], p = l(m.separator || " | "), R = i.filter(
              (re) => (re.text || re.url) && (re.url || "").trim()
            ).map(
              (re) => `<a href="${l((re.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(re.text || "Link")}</a>`
            );
            V.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${R.length ? R.join(p) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const p = (Array.isArray(m.items) ? m.items : []).map((A) => {
              const R = l(A.title || "Section"), re = l(A.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${R}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${re}</div></details>`;
            }).join("");
            V.push(
              p ? `<div style="margin:0 0 12px;">${p}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const p = (Array.isArray(m.slides) ? m.slides : []).filter(
              (A) => (A.imageUrl || "").trim()
            );
            if (p.length === 0)
              V.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const A = p[0], R = `<img src="${l(A.imageUrl)}" alt="${l(A.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, re = (A.linkUrl || "").trim();
              V.push(
                `<div style="margin:0 0 12px;">${re ? `<a href="${l(re)}">${R}</a>` : R}` + (p.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${p.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const i = l(m.label || "Offer ends in"), p = m.endDateTime ? new Date(m.endDateTime).toLocaleString() : "—";
            V.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${i}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${p}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const i = (m.imageUrl || "").trim(), p = l(m.title || "Product"), A = l(m.price || ""), R = l(m.buttonText || "Buy now"), re = (m.buttonUrl || "#").trim(), we = i ? `<img src="${l(i)}" alt="${l(m.alt || p)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            V.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${we}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${p}</p>` + (A ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${A}</p>` : "") + `<a href="${l(re)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${R}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const i = l((m.content || "").trim());
            V.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${i || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const i = (m.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), p = l((m.caption || "").trim());
            V.push(
              '<div style="margin:0 0 12px;">' + (p ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${p}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${i || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const i = (m.feedUrl || "").trim(), p = Math.min(20, Math.max(1, Number(m.maxItems) ?? 5));
            V.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (i ? `<p style="margin:0;font-size:12px;color:#64748b;">${l(i)} · max ${p} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const i = (m.imageUrl || "").trim(), p = (m.fallbackUrl || "").trim(), A = l(m.alt || "Dynamic image");
            i ? V.push(
              `<div style="margin:0 0 12px;"><img src="${l(i)}" alt="${A}" style="max-width:100%;height:auto;display:block;border:0;" />` + (p ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${l(p)}</p>` : "") + "</div>"
            ) : V.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return V.join("");
    }
    function y(s) {
      return /<\s*html[\s>]/i.test(s) || /<!doctype\s+html/i.test(s);
    }
    function _(s) {
      const l = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return l ? l[1] : s;
    }
    function I(s, l, f) {
      const h = (l || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), V = (f || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${h}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        V ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${V}</div>` : "",
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
    const U = o, T = c, {
      campaign: O,
      dirty: B,
      customValidatorErrors: F,
      getValidationWithWarnings: te,
      update: se,
      updateMessage: ce,
      undo: D,
      redo: ae,
      canUndo: q,
      canRedo: pe,
      resetMessage: W,
      hooks: J
    } = ut({
      initial: U.modelValue,
      hooks: {
        ...U.hooks,
        customValidators: async (s) => {
          var V, m, i;
          const l = [];
          (V = s.name) != null && V.trim() || l.push("Template name is required");
          const f = s.message;
          (m = f == null ? void 0 : f.subject) != null && m.trim() || l.push("Subject is required");
          const h = (i = U.hooks) != null && i.customValidators ? await U.hooks.customValidators(s) : [];
          return [...l, ...h];
        }
      },
      onDirty: () => T("change", O.value)
    }), { lastSavedAt: Z } = dt(O, { channel: "email" });
    function ne(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ae() : D());
    }
    st(() => {
      window.addEventListener("keydown", ne);
    }), lt(() => {
      window.removeEventListener("keydown", ne);
    }), Le(
      O,
      (s) => T("update:modelValue", {
        ...s,
        message: {
          ...s.message,
          html: Ne.value
        }
      }),
      { deep: !0 }
    );
    const ye = ue(), _e = ue(!0);
    async function ee() {
      if (J.estimateReach)
        try {
          ye.value = await J.estimateReach(O.value.audience);
        } catch {
          ye.value = void 0;
        }
      J.canSend && (_e.value = await Promise.resolve(J.canSend()));
    }
    ee(), Le(() => O.value.audience, ee, { deep: !0 });
    const k = $(() => (F.value, te(ye.value))), E = $(() => k.value.blockingErrors), N = $(() => k.value.warnings), be = $(() => k.value.valid), ie = $(() => {
      var h, V, m;
      const s = O.value.message, l = [
        !!((h = O.value.name) != null && h.trim()),
        !!((V = s.subject) != null && V.trim()),
        !!((m = s.from_address) != null && m.trim()),
        !!(Array.isArray(s.blocks) ? s.blocks.length : (s.html ?? "").trim().length),
        !!O.value.template_type
      ], f = l.filter(Boolean).length;
      return Math.round(f / l.length * 100);
    }), x = $(() => ie.value >= 90 ? "Production ready" : ie.value >= 70 ? "Strong draft" : ie.value >= 40 ? "In progress" : "Needs setup"), M = $(
      () => O.value.template_type ?? "transactional"
    ), w = ue(""), le = ue(!1), ge = ue(null), me = $(() => {
      const s = w.value;
      return s ? et.find((l) => l.id === s) ?? null : null;
    });
    function he(s) {
      const l = O.value, f = s.campaign.message ? { ...l.message, ...s.campaign.message } : l.message;
      se({
        ...s.campaign,
        message: f
      }), ge.value = null, le.value = !1;
    }
    function L(s) {
      const l = s.target.value;
      if (!l) return;
      const f = Rt.find((h) => h.id === l);
      f && (B.value ? (ge.value = f, le.value = !0) : he(f), s.target.value = "");
    }
    function X(s) {
      se({ template_type: s });
    }
    function G(s) {
      se({
        name: s,
        tracking: { ...O.value.tracking ?? {}, campaign_name: s }
      });
    }
    const $e = $(
      () => O.value.message.subject ?? ""
    ), ve = $(
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
      const s = O.value.message, l = (s.html ?? "").trim(), h = (Array.isArray(s.blocks) ? s.blocks : []).some((V) => {
        if (!V || typeof V != "object") return !1;
        const m = (V.type ?? "").toString();
        if (m === "paragraph" || m === "heading" || m === "quote" || m === "footer") {
          const i = (V.content ?? "").toString().trim();
          return !(!i || i === "Heading" || i.startsWith("Your text here."));
        }
        return m === "image" || m === "video" || m === "dynamic_image" ? !!(V.src ?? V.imageUrl ?? V.thumbnailUrl ?? "").toString().trim() : m === "button" ? !!(V.text ?? "").toString().trim() : !0;
      });
      return !!((s.subject ?? "").toString().trim() || (s.preview_text ?? "").toString().trim() || l || h);
    }), Re = $(() => {
      const s = Be.value;
      if (Array.isArray(s) && s.length > 0)
        return v(s);
      const l = z.value;
      return l && l.trim() ? y(l) ? _(l) : l : v([]);
    }), Ne = $(() => {
      const s = Be.value;
      if (Array.isArray(s) && s.length > 0)
        return I(
          v(s),
          $e.value,
          ve.value
        );
      const l = z.value;
      return l && l.trim() ? y(l) ? l : I(l, $e.value, ve.value) : I(
        v([]),
        $e.value,
        ve.value
      );
    }), He = $(() => {
      const s = $e.value;
      return me.value ? Qe(s, me.value.data) : s;
    }), We = $(() => {
      const s = ve.value;
      return me.value ? Qe(s, me.value.data) : s;
    }), Fe = $(() => {
      const s = Re.value;
      return me.value ? Qe(s, me.value.data) : s;
    }), Me = ue("desktop");
    function oe() {
      be.value && T("save", {
        ...O.value,
        message: {
          ...O.value.message,
          html: Ne.value
        }
      });
    }
    return (s, l) => {
      var f;
      return a(), n("div", sg, [
        e("div", lg, [
          Oe(ct, {
            "campaign-name": C(O).name,
            status: C(O).status,
            dirty: C(B),
            "last-saved-at": C(Z),
            "can-undo": C(q),
            "can-redo": C(pe),
            "slugify-name": U.enforceSlugName,
            "onUpdate:campaignName": G,
            onUndo: C(D),
            onRedo: C(ae)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          E.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ce({
              background: C(Ae).dangerBg,
              border: `1px solid ${C(Ae).dangerBorder}`,
              borderRadius: `${C(Xe).input}px`,
              padding: `${C(xe)[16]}px ${C(xe)[24]}px`,
              marginBottom: `${C(xe)[24]}px`
            })
          }, [
            e("ul", {
              style: Ce({ margin: 0, paddingLeft: "1.25rem", color: C(Ae).danger })
            }, [
              (a(!0), n(P, null, j(E.value, (h) => (a(), n("li", {
                key: h.message
              }, d(h.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", og, [
          e("aside", ig, [
            o.disabledSections.includes("email") ? g("", !0) : (a(), n("div", rg, [
              e("div", ug, [
                e("div", dg, [
                  l[8] || (l[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", cg, d(x.value), 1)
                ]),
                e("div", pg, [
                  Oe(_t, {
                    "template-type": M.value,
                    onUpdate: X
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: L
                  }, [
                    l[9] || (l[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(P, null, j(C(Rt), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, mg))), 128))
                  ], 32)
                ]),
                e("div", vg, [
                  e("div", bg, [
                    l[10] || (l[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", hg, d(ie.value) + "%", 1)
                  ]),
                  e("div", yg, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: Ce({ width: `${ie.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Oe(ng, {
                message: C(O).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: C(ce),
                onReset: l[0] || (l[0] = (h) => C(W)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", gg, [
            !o.designOnly && C(O).audience.test_mode ? (a(), n("div", fg, [...l[11] || (l[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", kg, [
              e("div", _g, [
                e("label", wg, [
                  l[13] || (l[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (h) => w.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[12] || (l[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(P, null, j(C(et), (h) => (a(), n("option", {
                      key: h.id,
                      value: h.id
                    }, d(h.label), 9, $g))), 128))
                  ], 512), [
                    [Ke, w.value]
                  ])
                ]),
                e("div", xg, [
                  l[14] || (l[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, d(Me.value), 1)
                ])
              ]),
              e("div", Cg, [
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
                e("div", Sg, [
                  e("div", Ig, [
                    e("span", Tg, d(Ie.value), 1),
                    e("span", Ag, "<" + d(Ue.value) + ">", 1)
                  ]),
                  e("div", Ug, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: He.value || "No subject"
                    }, d(He.value || "No subject"), 9, Rg),
                    We.value ? (a(), n("span", Eg, " — " + d(We.value), 1)) : g("", !0)
                  ])
                ]),
                e("div", Pg, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: Fe.value
                  }, null, 8, Bg)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Lg, [
          N.value.length > 0 ? (a(), n("div", Og, [
            l[17] || (l[17] = e("strong", null, "Warning:", -1)),
            K(" " + d((f = N.value[0]) == null ? void 0 : f.message) + " ", 1),
            N.value.length > 1 ? (a(), n("span", Ng, " (+" + d(N.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Mg, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: l[4] || (l[4] = (h) => T("duplicate", JSON.parse(JSON.stringify(C(O)))))
            }, " Duplicate ")) : g("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: oe
            }, " Save ")) : g("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: l[5] || (l[5] = (h) => T("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        le.value ? (a(), n("div", Vg, [
          e("div", Dg, [
            l[18] || (l[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[19] || (l[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Wg, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: l[6] || (l[6] = (h) => {
                  le.value = !1, ge.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: l[7] || (l[7] = (h) => ge.value && he(ge.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), ea = /* @__PURE__ */ Pe(jg, [["__scopeId", "data-v-f45fc2a3"]]), Hg = { class: "kb-shell" }, Fg = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, qg = ["aria-selected", "onClick"], zg = { class: "kb-shell__meta" }, Yg = ["href"], Kg = { class: "kb-shell__body" }, Gg = /* @__PURE__ */ Ee({
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
    return (_, I) => (a(), n("div", Hg, [
      e("header", {
        class: "kb-shell__header",
        style: Ce({ padding: `${C(xe)[12]}px ${C(xe)[24]}px`, borderBottom: `1px solid ${C(Ae).neutral.border}`, background: C(Ae).neutral.bg })
      }, [
        I[0] || (I[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Fg, [
          (a(), n(P, null, j(y, (U) => e("button", {
            key: U.id,
            type: "button",
            class: ke(["kb-shell__channel", { "kb-shell__channel--active": o.channel === U.id }]),
            role: "tab",
            "aria-selected": o.channel === U.id,
            onClick: (T) => v("switch-channel", U.id)
          }, d(U.label), 11, qg)), 64))
        ]),
        e("div", zg, [
          o.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: Ce({ padding: "2px 8px", borderRadius: `${C(Xe).input}px`, fontSize: "0.75rem", background: C(Ae).neutral.bg, color: C(Ae).neutral.textMuted })
          }, d(o.environment), 5)) : g("", !0),
          o.helpUrl ? (a(), n("a", {
            key: 1,
            href: o.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: Ce({ color: C(Ae).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Yg)) : g("", !0)
        ])
      ], 4),
      e("div", Kg, [
        Ge(_.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Jg = /* @__PURE__ */ Pe(Gg, [["__scopeId", "data-v-0df30803"]]), Qg = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Xg = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Zg = ["onClick"], ef = /* @__PURE__ */ Ee({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(o) {
    var I;
    const c = o, v = ue(((I = c.items[0]) == null ? void 0 : I.id) ?? "");
    let y = null;
    function _(U) {
      const T = document.getElementById(U);
      T && T.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return st(() => {
      const U = c.scrollContainerId ? document.getElementById(c.scrollContainerId) : document;
      U && (y = new IntersectionObserver(
        (T) => {
          for (const O of T)
            if (O.isIntersecting) {
              const B = O.target.getAttribute("data-outline-id");
              B && (v.value = B);
            }
        },
        { root: U === document ? null : U, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), c.items.forEach((T) => {
        const O = document.getElementById(T.id);
        O && (y == null || y.observe(O));
      }));
    }), lt(() => {
      y == null || y.disconnect();
    }), Le(
      () => c.items,
      (U) => {
        U.length && !v.value && (v.value = U[0].id);
      },
      { immediate: !0 }
    ), (U, T) => (a(), n("nav", Qg, [
      e("ul", Xg, [
        (a(!0), n(P, null, j(o.items, (O) => (a(), n("li", {
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
              padding: `${C(xe)[8]}px ${C(xe)[12]}px`,
              border: "none",
              borderRadius: `${C(Xe).input}px`,
              background: v.value === O.id ? C(Ae).neutral.bg : "transparent",
              color: v.value === O.id ? "#0f172a" : C(Ae).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: v.value === O.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (B) => _(O.id)
          }, d(O.label), 15, Zg)
        ]))), 128))
      ])
    ]));
  }
}), tf = /* @__PURE__ */ Pe(ef, [["__scopeId", "data-v-25c37675"]]), af = ["id"], nf = {
  key: 1,
  class: "kb-form-shell__head"
}, sf = /* @__PURE__ */ Ee({
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
        padding: `${C(xe)[24]}px ${C(xe)[24]}px ${C(xe)[32]}px`,
        marginBottom: 0
      })
    }, [
      o.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: Ce({ marginBottom: C(xe)[24], paddingBottom: C(xe)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: Ce({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: C(xe)[12] })
        }, d(o.label), 5),
        Ge(c.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", nf, [
        Ge(c.$slots, "head", {}, void 0, !0)
      ])),
      Ge(c.$slots, "default", {}, void 0, !0)
    ], 12, af));
  }
}), lf = /* @__PURE__ */ Pe(sf, [["__scopeId", "data-v-6504df41"]]), of = /* @__PURE__ */ Ee({
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
}), rf = /* @__PURE__ */ Ee({
  __name: "BuilderTopShell",
  setup(o) {
    return (c, v) => (a(), n("div", {
      class: "kb-top-shell",
      style: Ce({
        marginLeft: C(xe)[24],
        marginRight: C(xe)[24]
      })
    }, [
      Ge(c.$slots, "header"),
      Ge(c.$slots, "errors"),
      Ge(c.$slots, "warnings"),
      Ge(c.$slots, "default")
    ], 4));
  }
});
function uf(o) {
  o.component("KeosNotificationBuilder", Qt), o.component("KeosWhatsAppBuilder", Xt), o.component("KeosSmsBuilder", Zt), o.component("KeosEmailBuilder", ea), o.component("BuilderShell", Jg), o.component("BuilderOutline", tf), o.component("BuilderVersionHistoryModal", Jt), o.component("BuilderFormShell", lf), o.component("BuilderActionsBar", of), o.component("BuilderTopShell", rf);
}
const cf = {
  install: uf,
  KeosNotificationBuilder: Qt,
  KeosWhatsAppBuilder: Xt,
  KeosSmsBuilder: Zt,
  KeosEmailBuilder: ea
};
export {
  of as BuilderActionsBar,
  lf as BuilderFormShell,
  tf as BuilderOutline,
  Jg as BuilderShell,
  rf as BuilderTopShell,
  Jt as BuilderVersionHistoryModal,
  et as DEFAULT_SAMPLE_PROFILES,
  ea as KeosEmailBuilder,
  Qt as KeosNotificationBuilder,
  Zt as KeosSmsBuilder,
  Xt as KeosWhatsAppBuilder,
  cf as default,
  uf as install,
  Qe as renderTemplatePreview,
  dt as useAutosave,
  ut as useCampaignState
};
//# sourceMappingURL=index.js.map
