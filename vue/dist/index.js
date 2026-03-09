import { ref as be, watch as Ve, computed as w, defineComponent as Oe, openBlock as a, createElementBlock as n, normalizeStyle as Ae, unref as S, createElementVNode as e, normalizeClass as xe, Fragment as L, renderList as W, toDisplayString as u, createTextVNode as G, createCommentVNode as h, withDirectives as je, vModelText as it, createStaticVNode as Ge, vModelSelect as Ye, withKeys as ea, onMounted as st, onUnmounted as lt, createVNode as Me, createBlock as ta, withModifiers as at, renderSlot as Ke } from "vue";
const Te = {
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
}, Le = {
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
Le.neutral.textMuted, Le.neutral.textMeta;
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
}, aa = ["android", "ios", "web"], Mt = "normal", Dt = ["low", "normal", "high"], Wt = 86400, na = [3600, 7200, 86400, 172800], jt = "1.0", sa = ["topic", "segment", "user_list"];
function gt() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...aa],
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
function kt() {
  return {
    priority: Mt,
    ttl: Wt,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function _t() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function la(o) {
  return {
    schema_version: jt,
    name: "",
    status: "draft",
    audience: gt(),
    message: ft(),
    delivery: kt(),
    tracking: _t(),
    ...o
  };
}
function Ht(o) {
  const d = o;
  return d.schema_version || (d.schema_version = jt), d.audience || (d.audience = gt()), d.message || (d.message = ft()), d.delivery || (d.delivery = kt()), d.tracking || (d.tracking = _t()), Dt.includes(d.delivery.priority) || (d.delivery.priority = Mt), d.delivery.ttl === void 0 && (d.delivery.ttl = Wt), sa.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const oa = 1e5;
function ia(o, d) {
  var f, T, x;
  const c = [], b = d ?? o.audience.estimated_reach;
  return b !== void 0 && b >= oa && c.push({
    message: `Estimated reach is very high (${b.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), o.tracking && !((f = o.tracking.campaign_name) != null && f.trim()) && !((T = o.name) != null && T.trim()) && c.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (x = o.message.deep_link) != null && x.trim() || c.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), c;
}
function qt(o, d = "error") {
  return { message: o, severity: d };
}
function Ft(o) {
  const d = [];
  return o.schema_version || d.push(qt("Missing schema_version")), {
    valid: d.length === 0,
    errors: d
  };
}
function ra(o, d) {
  const c = Ft(o), b = ia(o, d);
  return {
    valid: c.valid,
    errors: [
      ...c.errors,
      ...b.map((f) => qt(f.message, f.severity))
    ]
  };
}
function ua(o) {
  return o.errors.filter((d) => d.severity === "error");
}
function da(o) {
  return o.errors.filter((d) => d.severity !== "error");
}
function ca(o) {
  const d = String(o ?? "").trim().toLowerCase();
  return d === "authentication" ? "AUTHENTICATION" : d === "utility" ? "UTILITY" : "MARKETING";
}
function pa(o, d = "template_message") {
  return (String(o ?? "").trim() || d).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || d;
}
function ma(o) {
  const d = String(o.header_type ?? "").trim().toLowerCase();
  if (d === "image")
    return "IMAGE";
  if (d === "video")
    return "VIDEO";
  if (d === "document")
    return "DOCUMENT";
  if (d === "text")
    return "TEXT";
  const c = String(o.template_type ?? "").trim().toLowerCase();
  return c === "image" ? "IMAGE" : c === "video" ? "VIDEO" : c === "document" ? "DOCUMENT" : null;
}
function nt(o, d = []) {
  if (!o)
    return { text: "", varOrder: [...d] };
  const c = [...d], b = /* @__PURE__ */ new Map();
  return c.forEach((T, x) => b.set(T, x + 1)), { text: o.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (T, x) => (b.has(x) || (b.set(x, c.length + 1), c.push(x)), `{{${b.get(x)}}}`)), varOrder: c };
}
function wt(o, d) {
  return o.map((c) => {
    const b = d == null ? void 0 : d[c];
    return typeof b == "string" && b.length > 0 ? b : `sample_${c}`;
  });
}
function va(o, d, c) {
  if (!o || !d || c.length === 0)
    return {};
  try {
    const f = o.split(/\{\{\d+\}\}/).map((U) => U.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+?)"), T = new RegExp(`^${f}$`, "s"), x = d.match(T);
    if (!x)
      return {};
    const C = {};
    return c.forEach((U, H) => {
      const Y = x[H + 1];
      Y && (C[U] = Y.trim());
    }), C;
  } catch {
    return {};
  }
}
function ba(o, d) {
  const c = [];
  let b = [...d];
  return { buttons: o.slice(0, 10).map((T) => {
    const x = T, C = String(x.type ?? "quick_reply").trim().toLowerCase(), U = String(x.label ?? "").trim() || "Button";
    if (C === "url") {
      const H = nt(String(x.url ?? ""), b);
      return b = H.varOrder, { type: "URL", text: U, url: H.text || void 0 };
    }
    return C === "call" ? {
      type: "PHONE_NUMBER",
      text: U,
      phone_number: String(x.phone ?? "").trim() || void 0
    } : C === "opt_out" ? (c.push("Opt-out button is provider-specific; mapped as QUICK_REPLY."), { type: "QUICK_REPLY", text: U }) : { type: "QUICK_REPLY", text: U };
  }).filter((T) => !!T.text), varOrder: b, warnings: c };
}
function ha(o) {
  return o.slice(0, 10).map((d) => {
    const c = d, b = String(c.type ?? "quick_reply").trim().toLowerCase(), f = String(c.label ?? "").trim() || "Button";
    if (b === "url") {
      const T = String(c.url ?? "").trim() || void 0, x = String(c.url_example ?? "").trim() || void 0;
      return {
        type: "URL",
        title: f,
        ...T ? { url: T } : {},
        ...x ? { example: [x] } : {}
      };
    }
    if (b === "call")
      return {
        type: "PHONE_NUMBER",
        title: f,
        ...String(c.phone ?? "").trim() ? { phoneNumber: String(c.phone).trim() } : {}
      };
    if (b === "opt_out")
      return { type: "OPT_OUT", title: f };
    if (b === "copy_code")
      return {
        type: "COPY_CODE",
        title: f,
        ...String(c.example ?? "").trim() ? { example: String(c.example).trim() } : {}
      };
    if (b === "otp") {
      const T = String(c.otp_type ?? "COPY_CODE").toUpperCase();
      return {
        type: "OTP",
        title: f,
        otp_type: T,
        ...String(c.autofill_text ?? "").trim() ? { autofill_text: String(c.autofill_text).trim() } : {},
        ...String(c.package_name ?? "").trim() ? { package_name: String(c.package_name).trim() } : {},
        ...String(c.signature_hash ?? "").trim() ? { signature_hash: String(c.signature_hash).trim() } : {}
      };
    }
    return { type: "QUICK_REPLY", title: f };
  }).filter((d) => !!d.title);
}
function xt(o) {
  const d = {}, c = [
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
  for (const b of c)
    o[b] !== void 0 && o[b] !== null && o[b] !== "" && (d[b] = o[b]);
  return Object.keys(d).length ? d : void 0;
}
function ya(o, d = {}) {
  const c = [], b = o.message, f = [], T = pa(b.template_name ?? o.name, o.name || "template_message"), x = ca(b.template_category), C = String(b.template_language ?? "en_US").trim() || "en_US";
  let U = [];
  const H = String(b.body ?? "").trim(), Y = nt(H, []), se = String(b.template_example ?? "").trim(), oe = !d.exampleData && se ? va(Y.text, se, Y.varOrder) : {}, ge = d.exampleData ?? (Object.keys(oe).length ? oe : void 0), N = ma(b), ie = String(b.header ?? "").trim();
  if (N === "TEXT" && ie) {
    const ke = nt(ie, U);
    U = ke.varOrder;
    const Ie = wt(U, ge);
    f.push({
      type: "HEADER",
      format: "TEXT",
      text: ke.text,
      ...Ie.length ? { example: { header_text: Ie } } : {}
    });
  } else N && N !== "TEXT" && (f.push({ type: "HEADER", format: N }), b.media_url || c.push(`Header format ${N} selected but media_url is empty.`));
  const F = String(b.body ?? "").trim(), fe = nt(F, U);
  U = fe.varOrder;
  const j = wt(U, ge);
  f.push({
    type: "BODY",
    text: fe.text,
    ...j.length ? { example: { body_text: [j] } } : {}
  });
  const Q = String(b.footer ?? "").trim();
  if (Q) {
    const ke = nt(Q, U);
    U = ke.varOrder, f.push({
      type: "FOOTER",
      text: ke.text
    });
  }
  const ne = Array.isArray(b.buttons) ? b.buttons : [];
  if (ne.length) {
    const ke = ba(ne, U);
    U = ke.varOrder, c.push(...ke.warnings), ke.buttons.length && f.push({ type: "BUTTONS", buttons: ke.buttons });
  }
  const Z = String(b.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(Z) && c.push(`template_type="${Z}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: T,
      category: x,
      language: C,
      components: f
    },
    warnings: c
  };
}
function Ct(o, d = {}) {
  const c = ya(o, d), b = o.message, f = c.payload.components.find((Z) => Z.type === "HEADER"), T = c.payload.components.find((Z) => Z.type === "BODY"), x = c.payload.components.find((Z) => Z.type === "FOOTER"), C = String(b.body ?? "").trim(), U = String(b.header ?? "").trim(), H = String(b.footer ?? "").trim(), Y = Array.isArray(b.buttons) ? b.buttons : [], se = ha(Y), oe = (() => {
    const Z = String(b.template_type ?? "").trim().toLowerCase();
    return Z === "image" ? "IMAGE" : Z === "video" ? "VIDEO" : Z === "document" ? "DOCUMENT" : Z === "carousel" ? "CAROUSEL" : "TEXT";
  })(), ge = String(b.vertical ?? "").trim() || void 0, N = String(b.template_example ?? "").trim() || void 0, ie = String(b.media_handle ?? "").trim() || void 0, F = typeof b.enable_sample == "boolean" ? b.enable_sample : void 0, fe = typeof b.allow_category_change == "boolean" ? b.allow_category_change : void 0, j = typeof b.add_security_recommendation == "boolean" ? b.add_security_recommendation : void 0, Q = typeof b.code_expiration_minutes == "number" ? b.code_expiration_minutes : void 0;
  return { payload: {
    elementName: c.payload.name,
    languageCode: c.payload.language,
    category: c.payload.category,
    templateType: oe,
    content: C || (T == null ? void 0 : T.text) || "",
    ...ge ? { vertical: ge } : {},
    ...N ? { example: N } : {},
    ...ie ? { exampleMedia: ie } : {},
    ...(f == null ? void 0 : f.format) === "TEXT" && (U || f.text) ? { header: U || f.text } : {},
    ...H || x != null && x.text ? { footer: H || (x == null ? void 0 : x.text) } : {},
    ...se.length ? { buttons: se } : {},
    ...F !== void 0 ? { enableSample: F } : {},
    ...fe !== void 0 ? { allowTemplateCategoryChange: fe } : {},
    ...j !== void 0 ? { addSecurityRecommendation: j } : {},
    ...Q !== void 0 ? { codeExpirationMinutes: Q } : {},
    metaTemplate: c.payload,
    metaWhatsApp: c.payload,
    ...xt(b) ? { advanced: xt(b) } : {}
  }, warnings: c.warnings };
}
function Xe(o, d) {
  return o.length <= d ? { text: o, truncated: !1 } : { text: o.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const ot = rt.android;
function ga(o) {
  const { title: d, body: c } = o, b = Xe(d || "", ot.title), f = Xe(c || "", ot.body);
  return {
    title: b.text,
    body: f.text,
    imageUrl: o.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: f.truncated,
    expanded: !1
  };
}
function fa(o) {
  const { title: d, body: c } = o, b = Xe(d || "", ot.title), f = Xe(c || "", ot.body);
  return {
    title: b.text,
    body: f.text,
    imageUrl: o.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: f.truncated,
    expanded: !0
  };
}
function ka(o, d = {}) {
  const c = d.expanded ? fa(o) : ga(o);
  return d.darkMode !== void 0 && (c.darkMode = d.darkMode), c;
}
const St = rt.ios;
function zt(o) {
  const { title: d, body: c } = o, b = Xe(d || "", St.title), f = Xe(c || "", St.body);
  return {
    title: b.text,
    body: f.text,
    imageUrl: o.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: f.truncated,
    expanded: !1
  };
}
function _a(o) {
  return zt(o);
}
function $a(o, d = {}) {
  const c = d.variant === "lockscreen" ? _a(o) : zt(o);
  return d.darkMode !== void 0 && (c.darkMode = d.darkMode), c;
}
const It = rt.web;
function Tt(o) {
  const { title: d, body: c } = o, b = Xe(d || "", It.title), f = Xe(c || "", It.body);
  return {
    title: b.text,
    body: f.text,
    imageUrl: o.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: f.truncated
  };
}
function wa(o) {
  return o.map((d) => ({ message: d, severity: "error" }));
}
function pt(o) {
  return JSON.parse(JSON.stringify(o));
}
function ut(o = {}) {
  const d = be(
    Ht(o.initial ?? la())
  ), c = o.hooks ?? {}, b = be(!1), f = be([]);
  Ve(
    d,
    () => {
      if (!c.customValidators) {
        f.value = [];
        return;
      }
      c.customValidators(d.value).then((V) => {
        f.value = V;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const T = be([]), x = be([]);
  function C() {
    const V = pt(d.value);
    T.value = [...T.value.slice(-19), V], x.value = [];
  }
  const U = w(() => T.value.length > 0), H = w(() => x.value.length > 0);
  function Y() {
    T.value.length !== 0 && (x.value = [pt(d.value), ...x.value], d.value = T.value[T.value.length - 1], T.value = T.value.slice(0, -1));
  }
  function se() {
    x.value.length !== 0 && (T.value = [...T.value, pt(d.value)], d.value = x.value[0], x.value = x.value.slice(1));
  }
  Ve(
    d,
    () => {
      var V;
      b.value = !0, (V = o.onDirty) == null || V.call(o);
    },
    { deep: !0 }
  );
  const oe = w(() => Ft(d.value));
  function ge(V) {
    const ye = ra(d.value, V), re = wa(f.value), R = [...ua(ye), ...re], B = [...ye.errors, ...re], $ = ye.valid && re.length === 0;
    return {
      ...ye,
      errors: B,
      valid: $,
      blockingErrors: R,
      warnings: da(ye)
    };
  }
  function N(V) {
    C(), d.value = { ...d.value, ...V };
  }
  function ie(V) {
    C(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...V }
    };
  }
  function F(V) {
    C(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...V }
    };
  }
  function fe(V) {
    C(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...V }
    };
  }
  function j(V) {
    C(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...V } : { campaign_name: "", tags: [], ab_test: !1, ...V }
    };
  }
  function Q(V) {
    C(), d.value = {
      ...d.value,
      message: { ...ft(), ...V }
    };
  }
  function ne(V) {
    C(), d.value = {
      ...d.value,
      delivery: { ...kt(), ...V }
    };
  }
  function Z(V) {
    C(), d.value = {
      ...d.value,
      tracking: { ..._t(), ...V }
    };
  }
  function ke(V) {
    C(), d.value = {
      ...d.value,
      audience: { ...gt(), ...V }
    };
  }
  const Ie = w(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function te(V, ye) {
    const re = Ie.value;
    let R;
    switch (V) {
      case "android":
        R = ka(re, { expanded: ye == null ? void 0 : ye.expanded });
        break;
      case "ios":
        R = $a(re);
        break;
      case "web":
        R = Tt(re);
        break;
      default:
        R = Tt(re);
    }
    const B = d.value.message.actions ?? [], $ = d.value.message.location;
    return { ...R, actions: B, location: $ ?? void 0 };
  }
  const y = rt;
  async function _() {
    return c.customValidators ? c.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: b,
    validation: oe,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: f,
    getValidationWithWarnings: ge,
    update: N,
    updateAudience: ie,
    updateMessage: F,
    updateDelivery: fe,
    updateTracking: j,
    undo: Y,
    redo: se,
    canUndo: U,
    canRedo: H,
    resetMessage: Q,
    resetDelivery: ne,
    resetTracking: Z,
    resetAudience: ke,
    getPreview: te,
    previewInput: Ie,
    characterLimits: y,
    runCustomValidators: _,
    hooks: c
  };
}
const xa = "keos-draft", Ca = 2e3;
function Sa(o, d) {
  return `${xa}-${o}-${d}`;
}
function dt(o, d) {
  const c = d.channel, b = w(
    () => {
      var Y, se;
      return Sa(
        c,
        d.key ?? ((Y = o.value) == null ? void 0 : Y.id) ?? ((se = o.value) == null ? void 0 : se.name) ?? "draft"
      );
    }
  ), f = be(null);
  let T = null;
  function x() {
    try {
      const Y = JSON.stringify(o.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(b.value, Y), f.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(b.value);
    } catch {
    }
  }
  function U() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const Y = window.localStorage.getItem(b.value);
      if (!Y) return null;
      const se = JSON.parse(Y);
      return Ht(se);
    } catch {
      return null;
    }
  }
  function H() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return Ve(
    o,
    () => {
      H() && (T && clearTimeout(T), T = setTimeout(() => {
        T = null, x();
      }, Ca));
    },
    { deep: !0 }
  ), {
    lastSavedAt: f,
    clearDraft: C,
    getDraft: U,
    persist: x
  };
}
const Ia = { class: "kb-header__row" }, Ta = ["value"], Aa = { class: "kb-header__actions" }, Ra = ["disabled"], Ua = ["disabled"], Pa = ["value"], La = ["value"], Ea = /* @__PURE__ */ Oe({
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
    const c = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], b = o, f = d, T = () => !!(b.campaignName || "").trim();
    function x(H) {
      return b.slugifyName ? H.trim().replace(/\s+/g, "-") : H;
    }
    function C(H) {
      return H.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function U(H) {
      const Y = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return Y[H] ?? Y.draft;
    }
    return (H, Y) => (a(), n("header", {
      class: "kb-header",
      style: Ae({
        padding: `${S(Te)[16]}px 0`,
        borderBottom: `1px solid ${S(Le).neutral.border}`,
        marginBottom: `${S(Te)[16]}px`
      })
    }, [
      e("div", Ia, [
        e("div", {
          class: xe(["kb-header__name-section", { "kb-header__name-section--filled": T() }])
        }, [
          Y[4] || (Y[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: o.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: Y[0] || (Y[0] = (se) => f("update:campaignName", x(se.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Ta),
          Y[5] || (Y[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Aa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !o.canUndo,
            onClick: Y[1] || (Y[1] = (se) => f("undo"))
          }, " Undo ", 8, Ra),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !o.canRedo,
            onClick: Y[2] || (Y[2] = (se) => f("redo"))
          }, " Redo ", 8, Ua)
        ]),
        o.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: o.workflowStatus,
          class: "kb-header__status-select",
          style: Ae({
            padding: `${S(Te)[4]}px ${S(Te)[8]}px`,
            borderRadius: `${S(Qe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...U(o.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: Y[3] || (Y[3] = (se) => f("update:workflowStatus", se.target.value))
        }, [
          (a(), n(L, null, W(c, (se) => e("option", {
            key: se.value,
            value: se.value
          }, u(se.label), 9, La)), 64))
        ], 44, Pa)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: Ae({
            padding: `${S(Te)[4]}px ${S(Te)[8]}px`,
            borderRadius: `${S(Qe).input}px`,
            background: S(Le).neutral.bg,
            fontSize: "0.8125rem",
            color: S(Le).neutral.textMuted
          })
        }, u(o.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: Ae({ fontSize: "0.8125rem", color: S(Le).neutral.textMuted, marginTop: `${S(Te)[4]}px` })
      }, [
        o.saving ? (a(), n(L, { key: 0 }, [
          G("Saving…")
        ], 64)) : o.dirty ? (a(), n(L, { key: 1 }, [
          G("Unsaved changes")
        ], 64)) : o.lastSavedAt ? (a(), n(L, { key: 2 }, [
          G("Last saved at " + u(C(o.lastSavedAt)), 1)
        ], 64)) : h("", !0)
      ], 4)
    ], 4));
  }
}), Ne = (o, d) => {
  const c = o.__vccOpts || o;
  for (const [b, f] of d)
    c[b] = f;
  return c;
}, ct = /* @__PURE__ */ Ne(Ea, [["__scopeId", "data-v-56efb3ec"]]), Ba = { class: "kb-section" }, Oa = { class: "kb-section__head" }, Na = { class: "kb-field" }, Va = { class: "kb-label" }, Ma = { class: "kb-field-with-rail" }, Da = ["value", "aria-invalid"], Wa = { class: "kb-var-picker-wrap" }, ja = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Ha = ["onClick"], qa = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, Fa = { class: "kb-field" }, za = { class: "kb-label" }, Ya = { class: "kb-field-with-rail" }, Ka = ["value", "aria-invalid"], Ga = { class: "kb-var-picker-wrap" }, Ja = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Qa = ["onClick"], Xa = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, Za = {
  class: "kb-toggle-row",
  style: { "margin-top": "0.5rem" }
}, en = ["checked"], tn = { class: "kb-field" }, an = { class: "kb-tags-wrap" }, nn = ["onClick"], sn = { class: "kb-tag-suggestions" }, ln = ["onClick"], on = { class: "kb-field" }, rn = ["value"], un = { class: "kb-field" }, dn = ["value", "aria-invalid"], cn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, pn = ["value"], mn = { class: "kb-field" }, vn = ["value", "aria-invalid"], bn = {
  key: 0,
  class: "kb-inline-error",
  role: "alert"
}, hn = { class: "kb-field" }, yn = { class: "kb-actions-list" }, gn = { class: "kb-action-card__head" }, fn = { class: "kb-action-card__num" }, kn = { class: "kb-action-card__type-row" }, _n = ["value", "onChange"], $n = ["value"], wn = { class: "kb-toggle-row kb-toggle-row--inline" }, xn = ["checked", "onChange"], Cn = ["onClick"], Sn = ["value", "onInput"], In = ["value", "onInput"], Tn = { class: "kb-action-http-row" }, An = ["value", "onChange"], Rn = ["value"], Un = ["value", "onInput"], Pn = ["value", "onInput"], Ln = { class: "kb-kv-section" }, En = ["value", "onInput"], Bn = ["value", "onInput"], On = ["onClick"], Nn = ["onClick"], Vn = ["value", "onInput"], Mn = { class: "kb-kv-section" }, Dn = ["value", "onInput"], Wn = ["value", "onInput"], jn = ["onClick"], Hn = ["onClick"], qn = ["value", "onInput"], Fn = { class: "kb-actions-footer" }, zn = ["disabled"], Yn = { class: "kb-action-chips" }, Kn = ["disabled", "onClick"], Gn = { class: "kb-field" }, Jn = { class: "kb-location-row" }, Qn = ["value"], Xn = ["value"], Zn = ["value"], es = ["value"], ts = { class: "kb-field" }, as = ["value"], ns = { class: "kb-field" }, ss = ["value"], ls = { class: "kb-field" }, os = { class: "kb-delay-row" }, is = ["value"], rs = { class: "kb-delay-chips" }, us = ["onClick"], ds = { class: "kb-advanced-toggles" }, cs = { class: "kb-advanced-toggles__body" }, ps = { class: "kb-toggle-row" }, ms = ["checked"], vs = { class: "kb-toggle-row" }, bs = ["checked"], hs = { class: "kb-toggle-row" }, ys = ["checked"], mt = 3, gs = /* @__PURE__ */ Oe({
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
    const c = o, b = d, f = w(() => c.message), T = [
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
    ], x = w(() => {
      const B = (f.value.variables ?? []).filter(Boolean);
      return B.length ? Array.from(new Set(B)) : T;
    }), C = be(null);
    function U(B) {
      C.value = C.value === B ? null : B;
    }
    function H(B, $) {
      const ve = ` {{ .${$} }}`, $e = (f.value.variables ?? []).filter(Boolean), _e = Array.from(/* @__PURE__ */ new Set([...$e, $]));
      B === "title" ? b("update", { title: `${c.message.title || ""}${ve}`, variables: _e }) : b("update", { body: `${c.message.body || ""}${ve}`, variables: _e }), C.value = null;
    }
    const Y = be(""), se = w(() => f.value.tags ?? []);
    function oe() {
      const B = Y.value.trim().toLowerCase().replace(/\s+/g, "_");
      if (!B) return;
      const $ = Array.from(/* @__PURE__ */ new Set([...se.value, B]));
      b("update", { tags: $ }), Y.value = "";
    }
    function ge(B) {
      b("update", { tags: se.value.filter(($) => $ !== B) });
    }
    function N(B) {
      (B.key === "Enter" || B.key === ",") && (B.preventDefault(), oe());
    }
    const ie = ["warning", "white_check_mark", "rotating_light", "loudspeaker", "package", "truck", "calendar", "key", "bell", "fire"], F = w(() => f.value.actions ?? []), fe = [
      { value: "view", label: "View", hint: "Open a URL in the browser or app." },
      { value: "http", label: "HTTP request", hint: "Send an HTTP request when tapped." },
      { value: "broadcast", label: "Broadcast", hint: "Android intent (automation apps)." },
      { value: "copy", label: "Copy to clipboard", hint: "Copy a value to the clipboard." }
    ], j = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    function Q() {
      const B = [...F.value, { id: `action_${Date.now()}`, action: "view", label: "" }];
      b("update", { actions: B });
    }
    function ne(B) {
      const $ = [...F.value];
      $.splice(B, 1), b("update", { actions: $ });
    }
    function Z(B, $) {
      const ve = [...F.value];
      ve[B] = { ...ve[B], ...$ }, b("update", { actions: ve });
    }
    function ke(B, $) {
      var _e, Ce;
      const ve = { id: (_e = F.value[B]) == null ? void 0 : _e.id, action: $, label: ((Ce = F.value[B]) == null ? void 0 : Ce.label) ?? "" }, $e = [...F.value];
      $e[B] = ve, b("update", { actions: $e });
    }
    function Ie(B) {
      const $ = B.headers ?? {};
      return Object.entries($).map(([ve, $e]) => ({ key: ve, value: $e }));
    }
    function te(B) {
      const $ = { ...F.value[B].headers ?? {} };
      $[""] = "", Z(B, { headers: $ });
    }
    function y(B, $, ve, $e) {
      const _e = {};
      for (const [Ce, P] of Object.entries(F.value[B].headers ?? {}))
        _e[Ce === $ ? ve : Ce] = Ce === $ ? $e : P;
      Z(B, { headers: _e });
    }
    function _(B, $) {
      const ve = { ...F.value[B].headers ?? {} };
      delete ve[$], Z(B, { headers: ve });
    }
    function V(B) {
      const $ = B.extras ?? {};
      return Object.entries($).map(([ve, $e]) => ({ key: ve, value: $e }));
    }
    function ye(B) {
      const $ = { ...F.value[B].extras ?? {} };
      $[""] = "", Z(B, { extras: $ });
    }
    function re(B, $, ve, $e) {
      const _e = {};
      for (const [Ce, P] of Object.entries(F.value[B].extras ?? {}))
        _e[Ce === $ ? ve : Ce] = Ce === $ ? $e : P;
      Z(B, { extras: _e });
    }
    function R(B, $) {
      const ve = { ...F.value[B].extras ?? {} };
      delete ve[$], Z(B, { extras: ve });
    }
    return (B, $) => {
      var ve, $e, _e, Ce;
      return a(), n("section", Ba, [
        e("div", Oa, [
          $[21] || ($[21] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: $[0] || ($[0] = (P) => B.$emit("reset"))
          }, "Reset section")) : h("", !0)
        ]),
        $[45] || ($[45] = e("p", { class: "kb-section__desc" }, " Compose notification content following the ntfy.sh JSON spec. Title is optional; message body is required. ", -1)),
        e("div", Na, [
          e("label", Va, [
            $[22] || ($[22] = G(" Title ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": o.titleCount > o.titleLimit }])
            }, u(o.titleCount) + "/" + u(o.titleLimit), 3)
          ]),
          e("div", Ma, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: o.message.title,
              "aria-invalid": !!o.titleError,
              onInput: $[1] || ($[1] = (P) => B.$emit("update", { title: P.target.value }))
            }, null, 40, Da),
            e("div", Wa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: $[2] || ($[2] = (P) => U("title"))
              }, "{{ .var }}"),
              C.value === "title" ? (a(), n("div", ja, [
                (a(!0), n(L, null, W(x.value, (P) => (a(), n("button", {
                  key: `title-var-${P}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (ae) => H("title", P)
                }, u(P), 9, Ha))), 128))
              ])) : h("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ae({ "--pct": Math.min(100, o.titleCount / o.titleLimit * 100) + "%" })
            }, [...$[23] || ($[23] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.titleError ? (a(), n("p", qa, u(o.titleError), 1)) : h("", !0)
        ]),
        e("div", Fa, [
          e("label", za, [
            $[24] || ($[24] = G(" Message ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": o.bodyCount > o.bodyLimit }])
            }, u(o.bodyCount) + "/" + u(o.bodyLimit), 3)
          ]),
          e("div", Ya, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: o.message.body,
              "aria-invalid": !!o.bodyError,
              onInput: $[3] || ($[3] = (P) => B.$emit("update", { body: P.target.value }))
            }, null, 40, Ka),
            e("div", Ga, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: $[4] || ($[4] = (P) => U("body"))
              }, "{{ .var }}"),
              C.value === "body" ? (a(), n("div", Ja, [
                (a(!0), n(L, null, W(x.value, (P) => (a(), n("button", {
                  key: `body-var-${P}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (ae) => H("body", P)
                }, u(P), 9, Qa))), 128))
              ])) : h("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              style: Ae({ "--pct": Math.min(100, o.bodyCount / o.bodyLimit * 100) + "%" })
            }, [...$[25] || ($[25] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          o.bodyError ? (a(), n("p", Xa, u(o.bodyError), 1)) : h("", !0),
          e("label", Za, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!f.value.markdown,
              onChange: $[5] || ($[5] = (P) => B.$emit("update", { markdown: P.target.checked || void 0 }))
            }, null, 40, en),
            $[26] || ($[26] = e("span", { class: "kb-toggle-label" }, "Enable Markdown formatting", -1))
          ])
        ]),
        e("div", tn, [
          $[28] || ($[28] = e("label", { class: "kb-label" }, [
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
          e("div", an, [
            (a(!0), n(L, null, W(se.value, (P) => (a(), n("span", {
              key: P,
              class: "kb-tag"
            }, [
              G(u(P) + " ", 1),
              e("button", {
                type: "button",
                class: "kb-tag__remove",
                onClick: (ae) => ge(P),
                "aria-label": "Remove tag"
              }, "×", 8, nn)
            ]))), 128)),
            je(e("input", {
              type: "text",
              class: "kb-input kb-input--tag",
              placeholder: "Add tag, press Enter",
              "onUpdate:modelValue": $[6] || ($[6] = (P) => Y.value = P),
              onKeydown: N,
              onBlur: oe
            }, null, 544), [
              [it, Y.value]
            ])
          ]),
          e("div", sn, [
            $[27] || ($[27] = e("span", {
              class: "kb-helper",
              style: { "margin-right": "0.4rem" }
            }, "Common:", -1)),
            (a(), n(L, null, W(ie, (P) => e("button", {
              key: P,
              type: "button",
              class: xe(["kb-tag-chip", { "kb-tag-chip--active": se.value.includes(P) }]),
              onClick: (ae) => se.value.includes(P) ? ge(P) : (Y.value = P, oe())
            }, u(P), 11, ln)), 64))
          ])
        ]),
        e("div", on, [
          $[29] || ($[29] = e("label", { class: "kb-label" }, [
            G(" Icon URL "),
            e("span", { class: "kb-helper" }, "Custom notification icon (JPEG or PNG). Shown in the notification drawer.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://example.com/icon.png",
            value: f.value.icon ?? "",
            onInput: $[7] || ($[7] = (P) => B.$emit("update", { icon: P.target.value || void 0 }))
          }, null, 40, rn)
        ]),
        e("div", un, [
          $[30] || ($[30] = e("label", { class: "kb-label" }, [
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
            value: o.message.image_url ?? f.value.attach ?? "",
            "aria-invalid": !!o.imageUrlError,
            onInput: $[8] || ($[8] = (P) => B.$emit("update", { image_url: P.target.value || void 0, attach: P.target.value || void 0 }))
          }, null, 40, dn),
          o.imageUrlError ? (a(), n("p", cn, u(o.imageUrlError), 1)) : h("", !0),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Filename override (e.g. invoice.pdf) — optional",
            value: f.value.attachment_filename ?? "",
            onInput: $[9] || ($[9] = (P) => B.$emit("update", { attachment_filename: P.target.value || void 0 }))
          }, null, 40, pn)
        ]),
        e("div", mn, [
          $[31] || ($[31] = e("label", { class: "kb-label" }, [
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
            onInput: $[10] || ($[10] = (P) => B.$emit("update", { deep_link: P.target.value || void 0 }))
          }, null, 40, vn),
          o.deepLinkError ? (a(), n("p", bn, u(o.deepLinkError), 1)) : h("", !0)
        ]),
        e("div", hn, [
          e("label", { class: "kb-label" }, [
            $[32] || ($[32] = G(" Action buttons ", -1)),
            e("span", { class: "kb-helper" }, "Up to " + u(mt) + " interactive buttons on the notification. Supports view, HTTP request, Android broadcast, and copy-to-clipboard.")
          ]),
          e("div", yn, [
            (a(!0), n(L, null, W(F.value, (P, ae) => (a(), n("div", {
              key: P.id || ae,
              class: "kb-action-card"
            }, [
              e("div", gn, [
                e("span", fn, "Button " + u(ae + 1), 1),
                e("div", kn, [
                  e("select", {
                    class: "kb-select kb-select--action-type",
                    value: P.action,
                    onChange: (J) => ke(ae, J.target.value)
                  }, [
                    (a(), n(L, null, W(fe, (J) => e("option", {
                      key: J.value,
                      value: J.value
                    }, u(J.label), 9, $n)), 64))
                  ], 40, _n),
                  e("label", wn, [
                    e("input", {
                      type: "checkbox",
                      class: "kb-toggle",
                      checked: !!P.clear,
                      onChange: (J) => Z(ae, { clear: J.target.checked || void 0 })
                    }, null, 40, xn),
                    $[33] || ($[33] = e("span", { class: "kb-toggle-label" }, "Dismiss after tap", -1))
                  ])
                ]),
                e("button", {
                  type: "button",
                  class: "kb-btn-remove-action",
                  onClick: (J) => ne(ae)
                }, "Remove", 8, Cn)
              ]),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label (e.g. View order)",
                value: P.label,
                onInput: (J) => Z(ae, { label: J.target.value })
              }, null, 40, Sn),
              P.action === "view" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input",
                placeholder: "URL to open (https:// or app://)",
                value: P.url ?? "",
                onInput: (J) => Z(ae, { url: J.target.value || void 0 })
              }, null, 40, In)) : P.action === "http" ? (a(), n(L, { key: 1 }, [
                e("div", Tn, [
                  e("select", {
                    class: "kb-select kb-select--method",
                    value: P.method ?? "POST",
                    onChange: (J) => Z(ae, { method: J.target.value })
                  }, [
                    (a(), n(L, null, W(j, (J) => e("option", {
                      key: J,
                      value: J
                    }, u(J), 9, Rn)), 64))
                  ], 40, An),
                  e("input", {
                    type: "url",
                    class: "kb-input",
                    placeholder: "Endpoint URL",
                    value: P.url ?? "",
                    onInput: (J) => Z(ae, { url: J.target.value || void 0 })
                  }, null, 40, Un)
                ]),
                e("textarea", {
                  class: "kb-textarea kb-textarea--sm",
                  rows: "2",
                  placeholder: 'Request body (e.g. {"status":"closed"})',
                  value: P.body ?? "",
                  onInput: (J) => Z(ae, { body: J.target.value || void 0 })
                }, null, 40, Pn),
                e("div", Ln, [
                  $[34] || ($[34] = e("span", { class: "kb-kv-label" }, "Headers", -1)),
                  (a(!0), n(L, null, W(Ie(P), (J, Se) => (a(), n("div", {
                    key: Se,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Header name",
                      value: J.key,
                      onInput: (pe) => y(ae, J.key, pe.target.value, J.value)
                    }, null, 40, En),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: J.value,
                      onInput: (pe) => y(ae, J.key, J.key, pe.target.value)
                    }, null, 40, Bn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (pe) => _(ae, J.key)
                    }, "×", 8, On)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (J) => te(ae)
                  }, "+ Add header", 8, Nn)
                ])
              ], 64)) : P.action === "broadcast" ? (a(), n(L, { key: 2 }, [
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "Intent (default: io.heckel.ntfy.USER_ACTION)",
                  value: P.intent ?? "",
                  onInput: (J) => Z(ae, { intent: J.target.value || void 0 })
                }, null, 40, Vn),
                e("div", Mn, [
                  $[35] || ($[35] = e("span", { class: "kb-kv-label" }, "Extras", -1)),
                  (a(!0), n(L, null, W(V(P), (J, Se) => (a(), n("div", {
                    key: Se,
                    class: "kb-kv-row"
                  }, [
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Key",
                      value: J.key,
                      onInput: (pe) => re(ae, J.key, pe.target.value, J.value)
                    }, null, 40, Dn),
                    e("input", {
                      type: "text",
                      class: "kb-input kb-input--kv",
                      placeholder: "Value",
                      value: J.value,
                      onInput: (pe) => re(ae, J.key, J.key, pe.target.value)
                    }, null, 40, Wn),
                    e("button", {
                      type: "button",
                      class: "kb-btn-kv-remove",
                      onClick: (pe) => R(ae, J.key)
                    }, "×", 8, jn)
                  ]))), 128)),
                  e("button", {
                    type: "button",
                    class: "kb-btn-kv-add",
                    onClick: (J) => ye(ae)
                  }, "+ Add extra", 8, Hn)
                ])
              ], 64)) : P.action === "copy" ? (a(), n("input", {
                key: 3,
                type: "text",
                class: "kb-input",
                placeholder: "Value to copy to clipboard",
                value: P.value ?? "",
                onInput: (J) => Z(ae, { value: J.target.value || void 0 })
              }, null, 40, qn)) : h("", !0)
            ]))), 128)),
            e("div", Fn, [
              e("button", {
                type: "button",
                class: "kb-btn-add-action",
                disabled: F.value.length >= mt,
                onClick: Q
              }, " Add action ", 8, zn),
              e("div", Yn, [
                $[36] || ($[36] = e("span", { class: "kb-action-chips-label" }, "Quick add:", -1)),
                (a(), n(L, null, W(["View order", "Track shipment", "Dismiss"], (P) => e("button", {
                  key: P,
                  type: "button",
                  class: "kb-action-chip",
                  disabled: F.value.length >= mt,
                  onClick: () => {
                    const ae = [...F.value, { id: `action_${Date.now()}`, action: "view", label: P }];
                    B.$emit("update", { actions: ae });
                  }
                }, u(P), 9, Kn)), 64))
              ])
            ])
          ])
        ]),
        e("div", Gn, [
          $[37] || ($[37] = e("label", { class: "kb-label" }, [
            G(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Attach coordinates for rich notifications or open-in-maps support.")
          ], -1)),
          e("div", Jn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((ve = f.value.location) == null ? void 0 : ve.lat) ?? "",
              onInput: $[11] || ($[11] = (P) => {
                const ae = { ...f.value.location ?? {} }, J = P.target.value;
                ae.lat = J === "" ? void 0 : Number(J), B.$emit("update", { location: ae });
              })
            }, null, 40, Qn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: (($e = f.value.location) == null ? void 0 : $e.lon) ?? "",
              onInput: $[12] || ($[12] = (P) => {
                const ae = { ...f.value.location ?? {} }, J = P.target.value;
                ae.lon = J === "" ? void 0 : Number(J), B.$emit("update", { location: ae });
              })
            }, null, 40, Xn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. HQ, Store name)",
            value: ((_e = f.value.location) == null ? void 0 : _e.name) ?? "",
            onInput: $[13] || ($[13] = (P) => {
              const ae = { ...f.value.location ?? {} };
              ae.name = P.target.value || void 0, B.$emit("update", { location: ae });
            })
          }, null, 40, Zn),
          e("input", {
            type: "text",
            class: "kb-input",
            style: { "margin-top": "0.5rem" },
            placeholder: "Address (optional)",
            value: ((Ce = f.value.location) == null ? void 0 : Ce.address) ?? "",
            onInput: $[14] || ($[14] = (P) => {
              const ae = { ...f.value.location ?? {} };
              ae.address = P.target.value || void 0, B.$emit("update", { location: ae });
            })
          }, null, 40, es)
        ]),
        e("div", ts, [
          $[38] || ($[38] = e("label", { class: "kb-label" }, [
            G(" Email forward ("),
            e("code", null, "email"),
            G(") "),
            e("span", { class: "kb-helper" }, "Forward this notification to an email address.")
          ], -1)),
          e("input", {
            type: "email",
            class: "kb-input",
            placeholder: "recipient@example.com",
            value: f.value.email_forward ?? "",
            onInput: $[15] || ($[15] = (P) => B.$emit("update", { email_forward: P.target.value || void 0 }))
          }, null, 40, as)
        ]),
        e("div", ns, [
          $[39] || ($[39] = e("label", { class: "kb-label" }, [
            G(" Phone call ("),
            e("code", null, "call"),
            G(") "),
            e("span", { class: "kb-helper" }, "Initiate a phone call to this number when the notification is received.")
          ], -1)),
          e("input", {
            type: "tel",
            class: "kb-input",
            placeholder: "+1 555 123 4567",
            value: f.value.call ?? "",
            onInput: $[16] || ($[16] = (P) => B.$emit("update", { call: P.target.value || void 0 }))
          }, null, 40, ss)
        ]),
        e("div", ls, [
          $[40] || ($[40] = Ge('<label class="kb-label" data-v-03f4fc73> Delivery delay (<code data-v-03f4fc73>delay</code>) <span class="kb-helper" data-v-03f4fc73>Schedule delivery for later. Accepts durations (<code data-v-03f4fc73>30min</code>, <code data-v-03f4fc73>2h</code>, <code data-v-03f4fc73>1day</code>), times (<code data-v-03f4fc73>9am</code>, <code data-v-03f4fc73>8:30pm</code>), natural language (<code data-v-03f4fc73>tomorrow, 3pm</code>), or Unix timestamps. Max 3 days.</span></label>', 1)),
          e("div", os, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. 30min, 2h, tomorrow 9am, 1693000000",
              value: f.value.delay ?? "",
              onInput: $[17] || ($[17] = (P) => B.$emit("update", { delay: P.target.value || void 0 }))
            }, null, 40, is),
            e("div", rs, [
              (a(), n(L, null, W(["30min", "1h", "4h", "tomorrow"], (P) => e("button", {
                key: P,
                type: "button",
                class: xe(["kb-delay-chip", { "kb-delay-chip--active": f.value.delay === P }]),
                onClick: (ae) => B.$emit("update", { delay: f.value.delay === P ? void 0 : P })
              }, u(P), 11, us)), 64))
            ])
          ])
        ]),
        e("details", ds, [
          $[44] || ($[44] = e("summary", { class: "kb-advanced-toggles__summary" }, "Advanced options", -1)),
          e("div", cs, [
            e("label", ps, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!f.value.cache,
                onChange: $[18] || ($[18] = (P) => B.$emit("update", { cache: P.target.checked || void 0 }))
              }, null, 40, ms),
              $[41] || ($[41] = e("span", { class: "kb-toggle-label" }, [
                G("Enable server-side caching ("),
                e("code", null, "cache"),
                G(")")
              ], -1))
            ]),
            e("label", vs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!f.value.firebase,
                onChange: $[19] || ($[19] = (P) => B.$emit("update", { firebase: P.target.checked || void 0 }))
              }, null, 40, bs),
              $[42] || ($[42] = e("span", { class: "kb-toggle-label" }, [
                G("Deliver via Firebase Cloud Messaging ("),
                e("code", null, "firebase"),
                G(")")
              ], -1))
            ]),
            e("label", hs, [
              e("input", {
                type: "checkbox",
                class: "kb-toggle",
                checked: !!f.value.unified_push,
                onChange: $[20] || ($[20] = (P) => B.$emit("update", { unified_push: P.target.checked || void 0 }))
              }, null, 40, ys),
              $[43] || ($[43] = e("span", { class: "kb-toggle-label" }, [
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
}), fs = /* @__PURE__ */ Ne(gs, [["__scopeId", "data-v-03f4fc73"]]), ks = { class: "kb-section kb-section--inline-personalization" }, _s = { class: "kb-field" }, $s = { class: "kb-insert-row" }, ws = ["value"], xs = { class: "kb-field" }, Cs = { class: "kb-insert-row" }, Ss = { class: "kb-field" }, Is = { class: "kb-variable-list" }, Ts = /* @__PURE__ */ Oe({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(o, { emit: d }) {
    var N;
    const c = o, b = d, f = [
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
    ], T = [
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
    ], x = w(
      () => (c.targets ?? []).includes("footer") ? T : f
    ), C = be(
      (N = c.variableOptions) != null && N.length ? [...c.variableOptions] : [...x.value]
    ), U = be(C.value[0] ?? x.value[0]), H = be("");
    Ve(
      () => c.variableOptions,
      (ie) => {
        ie && ie.length ? (C.value = [...ie], C.value.includes(U.value) || (U.value = C.value[0])) : (C.value = [...x.value], C.value.includes(U.value) || (U.value = C.value[0]));
      }
    ), Ve(
      x,
      (ie) => {
        var F;
        (F = c.variableOptions) != null && F.length || (C.value = [...ie], C.value.includes(U.value) || (U.value = C.value[0]));
      }
    );
    const Y = w(() => C.value), se = w(() => {
      var F;
      return (F = c.targets) != null && F.length ? c.targets : ["title", "body"];
    });
    function oe(ie) {
      b("insertVariable", { variable: U.value, field: ie });
    }
    function ge() {
      const ie = H.value.trim();
      ie && (C.value.includes(ie) || (C.value = [...C.value, ie]), U.value = ie, H.value = "");
    }
    return (ie, F) => (a(), n("section", ks, [
      F[9] || (F[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      F[10] || (F[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", _s, [
        F[5] || (F[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", $s, [
          je(e("select", {
            "onUpdate:modelValue": F[0] || (F[0] = (fe) => U.value = fe),
            class: "kb-select"
          }, [
            (a(!0), n(L, null, W(Y.value, (fe) => (a(), n("option", {
              key: fe,
              value: fe
            }, u(fe), 9, ws))), 128))
          ], 512), [
            [Ye, U.value]
          ]),
          se.value.includes("title") ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: F[1] || (F[1] = (fe) => oe("title"))
          }, " Into title ")) : h("", !0),
          se.value.includes("body") ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: F[2] || (F[2] = (fe) => oe("body"))
          }, " Into message ")) : h("", !0),
          se.value.includes("footer") ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: F[3] || (F[3] = (fe) => oe("footer"))
          }, " Into footer ")) : h("", !0)
        ])
      ]),
      e("div", xs, [
        F[6] || (F[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Cs, [
          je(e("input", {
            "onUpdate:modelValue": F[4] || (F[4] = (fe) => H.value = fe),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [it, H.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ge
          }, " Add ")
        ])
      ]),
      e("div", Ss, [
        F[7] || (F[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        F[8] || (F[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Is, [
          (a(!0), n(L, null, W(Y.value, (fe) => (a(), n("li", { key: fe }, [
            e("code", null, "{{ ." + u(fe) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Yt = /* @__PURE__ */ Ne(Ts, [["__scopeId", "data-v-ab96d6bb"]]), As = { class: "kb-section kb-section--template-type" }, Rs = { class: "kb-field" }, Us = { class: "kb-radio-group" }, Ps = { class: "kb-radio" }, Ls = ["checked"], Es = { class: "kb-radio" }, Bs = ["checked"], Os = /* @__PURE__ */ Oe({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(o, { emit: d }) {
    const c = d;
    return (b, f) => (a(), n("section", As, [
      f[5] || (f[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      f[6] || (f[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Rs, [
        e("div", Us, [
          e("label", Ps, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: o.templateType === "transactional",
              onChange: f[0] || (f[0] = (T) => c("update", "transactional"))
            }, null, 40, Ls),
            f[2] || (f[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Es, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: o.templateType === "marketing",
              onChange: f[1] || (f[1] = (T) => c("update", "marketing"))
            }, null, 40, Bs),
            f[3] || (f[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        f[4] || (f[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), $t = /* @__PURE__ */ Ne(Os, [["__scopeId", "data-v-ff2e1bd8"]]), Ns = { class: "kb-section" }, Vs = { class: "kb-section__head" }, Ms = { class: "kb-section__desc" }, Ds = { class: "kb-field" }, Ws = { class: "kb-radio-group" }, js = { class: "kb-radio" }, Hs = ["checked"], qs = { class: "kb-radio" }, Fs = ["checked"], zs = {
  key: 0,
  class: "kb-field kb-row"
}, Ys = ["value"], Ks = ["value"], Gs = { class: "kb-field" }, Js = ["value"], Qs = ["value"], Xs = { class: "kb-field" }, Zs = ["value"], el = ["value"], tl = { class: "kb-field" }, al = { class: "kb-checkbox" }, nl = ["checked"], sl = /* @__PURE__ */ Oe({
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
    return (c, b) => {
      var f;
      return a(), n("section", Ns, [
        e("div", Vs, [
          b[8] || (b[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (T) => c.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        e("p", Ms, u(o.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Ds, [
          b[11] || (b[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Ws, [
            e("label", js, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !o.delivery.scheduled_at,
                onChange: b[1] || (b[1] = (T) => c.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Hs),
              b[9] || (b[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", qs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!o.delivery.scheduled_at,
                onChange: b[2] || (b[2] = (T) => c.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Fs),
              b[10] || (b[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        o.delivery.scheduled_at ? (a(), n("div", zs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (f = o.delivery.scheduled_at) == null ? void 0 : f.slice(0, 16),
            onInput: b[3] || (b[3] = (T) => c.$emit("update", { scheduled_at: T.target.value }))
          }, null, 40, Ys),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: o.delivery.timezone,
            onInput: b[4] || (b[4] = (T) => c.$emit("update", { timezone: T.target.value }))
          }, null, 40, Ks)
        ])) : h("", !0),
        o.showPushOptions ? (a(), n(L, { key: 1 }, [
          e("div", Gs, [
            b[12] || (b[12] = e("label", { class: "kb-label" }, [
              G(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.ttl,
              onChange: b[5] || (b[5] = (T) => c.$emit("update", { ttl: Number(T.target.value) }))
            }, [
              (a(!0), n(L, null, W(S(na), (T) => (a(), n("option", {
                key: T,
                value: T
              }, u(d[T] ?? T + "s"), 9, Qs))), 128))
            ], 40, Js)
          ]),
          e("div", Xs, [
            b[13] || (b[13] = e("label", { class: "kb-label" }, [
              G(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: o.delivery.priority,
              onChange: b[6] || (b[6] = (T) => c.$emit("update", { priority: T.target.value }))
            }, [
              (a(!0), n(L, null, W(S(Dt), (T) => (a(), n("option", {
                key: T,
                value: T
              }, u(T), 9, el))), 128))
            ], 40, Zs)
          ]),
          e("div", tl, [
            e("label", al, [
              e("input", {
                type: "checkbox",
                checked: o.delivery.quiet_hours,
                onChange: b[7] || (b[7] = (T) => c.$emit("update", { quiet_hours: !o.delivery.quiet_hours }))
              }, null, 40, nl),
              b[14] || (b[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : h("", !0)
      ]);
    };
  }
}), ll = /* @__PURE__ */ Ne(sl, [["__scopeId", "data-v-5707a2a7"]]), ol = { class: "kb-accordion" }, il = { class: "kb-accordion__body" }, rl = { class: "kb-field" }, ul = ["value"], dl = { class: "kb-field" }, cl = { class: "kb-checkbox" }, pl = ["checked"], ml = /* @__PURE__ */ Oe({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(o) {
    return (d, c) => (a(), n("details", ol, [
      c[4] || (c[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", il, [
        e("div", rl, [
          c[2] || (c[2] = e("label", { class: "kb-label" }, [
            G(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: o.delivery.collapse_key,
            onInput: c[0] || (c[0] = (b) => d.$emit("update", { collapse_key: b.target.value || void 0 }))
          }, null, 40, ul)
        ]),
        e("div", dl, [
          e("label", cl, [
            e("input", {
              type: "checkbox",
              checked: o.delivery.silent_push,
              onChange: c[1] || (c[1] = (b) => d.$emit("update", { silent_push: !o.delivery.silent_push }))
            }, null, 40, pl),
            c[3] || (c[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), vl = /* @__PURE__ */ Ne(ml, [["__scopeId", "data-v-699e4501"]]);
function Je(o, d) {
  return !o || typeof o != "string" ? o : o.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (c, b) => {
    const T = String(b).trim().replace(/^\./, "");
    return T in d ? String(d[T]) : c;
  });
}
const Ze = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], bl = { class: "kb-preview" }, hl = { class: "kb-preview__toggle" }, yl = { class: "kb-preview__mode" }, gl = { class: "kb-preview__quality" }, fl = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, kl = ["src"], _l = { class: "kb-android-body-row" }, $l = { class: "kb-android-body-content" }, wl = {
  key: 0,
  class: "kb-android-title"
}, xl = {
  key: 1,
  class: "kb-android-text"
}, Cl = {
  key: 2,
  class: "kb-android-location-line"
}, Sl = {
  key: 0,
  class: "kb-android-thumb"
}, Il = ["src"], Tl = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Al = ["src"], Rl = {
  key: 0,
  class: "kb-preview-map__caption"
}, Ul = {
  key: 2,
  class: "kb-android-actions"
}, Pl = {
  key: 3,
  class: "kb-preview-warning"
}, Ll = { class: "kb-ios-banner" }, El = { class: "kb-ios-content" }, Bl = {
  key: 0,
  class: "kb-ios-title"
}, Ol = {
  key: 1,
  class: "kb-ios-text"
}, Nl = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, Vl = ["src"], Ml = {
  key: 0,
  class: "kb-preview-map__caption"
}, Dl = {
  key: 4,
  class: "kb-ios-actions"
}, Wl = {
  key: 5,
  class: "kb-preview-warning"
}, jl = {
  key: 0,
  class: "kb-ios-thumb"
}, Hl = ["src"], ql = { class: "kb-web-toast" }, Fl = { class: "kb-web-body" }, zl = {
  key: 0,
  class: "kb-web-title"
}, Yl = {
  key: 1,
  class: "kb-web-text"
}, Kl = {
  key: 3,
  class: "kb-web-image"
}, Gl = ["src"], Jl = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Ql = ["src"], Xl = {
  key: 0,
  class: "kb-preview-map__caption"
}, Zl = {
  key: 0,
  class: "kb-web-actions"
}, eo = {
  key: 1,
  class: "kb-preview-warning"
}, to = /* @__PURE__ */ Oe({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(o) {
    const d = o, c = be("shade"), b = be("banner"), f = be("toast"), T = w(() => c.value === "expanded"), x = w(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? T.value : void 0
      })
    ), C = w(() => {
      const te = x.value;
      return d.previewProfile ? {
        ...te,
        title: Je((te == null ? void 0 : te.title) ?? "", d.previewProfile.data),
        body: Je((te == null ? void 0 : te.body) ?? "", d.previewProfile.data)
      } : te;
    }), U = {
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
    function H(te, y) {
      const _ = (te ?? "").trim();
      return _ ? _.length <= y ? _ : `${_.slice(0, Math.max(0, y - 1)).trimEnd()}…` : "";
    }
    const Y = w(() => d.selectedPlatform === "android" ? c.value : d.selectedPlatform === "ios" ? b.value : f.value), se = w(() => (U[d.selectedPlatform] ?? U.web)[Y.value] ?? { title: 60, body: 160 }), oe = w(
      () => {
        var te;
        return H((te = C.value) == null ? void 0 : te.title, se.value.title);
      }
    ), ge = w(
      () => {
        var te;
        return H((te = C.value) == null ? void 0 : te.body, se.value.body);
      }
    ), N = { android: 3, ios: 4, web: 2 }, ie = w(
      () => {
        var te;
        return Array.isArray((te = C.value) == null ? void 0 : te.actions) ? C.value.actions : [];
      }
    ), F = w(
      () => ie.value.slice(0, N[d.selectedPlatform] ?? 2)
    ), fe = w(
      () => Math.max(0, ie.value.length - F.value.length)
    ), j = w(() => {
      var te;
      return (((te = d.message) == null ? void 0 : te.deep_link) ?? "").trim();
    }), Q = w(() => j.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(j.value) : !1), ne = w(() => j.value ? j.value.length <= 40 ? j.value : `${j.value.slice(0, 37)}…` : ""), Z = w(() => {
      var y, _, V;
      const te = [];
      return (y = d.delivery) != null && y.priority && te.push(`Priority: ${d.delivery.priority}`), typeof ((_ = d.delivery) == null ? void 0 : _.ttl) == "number" && te.push(`TTL: ${d.delivery.ttl}s`), (V = d.delivery) != null && V.silent_push && te.push("Silent push"), te;
    }), ke = w(() => {
      var re;
      const te = (re = C.value) == null ? void 0 : re.location;
      if (!te || te.lat == null && te.lon == null) return null;
      const y = Number(te.lat) || 0, _ = Number(te.lon) || 0, V = 8e-3, ye = [_ - V, y - V, _ + V, y + V].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(ye)}&layer=mapnik&marker=${y},${_}`;
    }), Ie = w(() => {
      var y;
      const te = (y = C.value) == null ? void 0 : y.location;
      return te && (te.lat != null || te.lon != null || te.name || te.address);
    });
    return (te, y) => {
      var _, V, ye, re, R, B, $, ve, $e, _e, Ce, P, ae, J, Se, pe;
      return a(), n("div", bl, [
        e("div", hl, [
          e("label", yl, [
            y[6] || (y[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            o.selectedPlatform === "android" ? je((a(), n("select", {
              key: 0,
              "onUpdate:modelValue": y[0] || (y[0] = (de) => c.value = de),
              class: "kb-preview__mode-select"
            }, [...y[3] || (y[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ye, c.value]
            ]) : o.selectedPlatform === "ios" ? je((a(), n("select", {
              key: 1,
              "onUpdate:modelValue": y[1] || (y[1] = (de) => b.value = de),
              class: "kb-preview__mode-select"
            }, [...y[4] || (y[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ye, b.value]
            ]) : je((a(), n("select", {
              key: 2,
              "onUpdate:modelValue": y[2] || (y[2] = (de) => f.value = de),
              class: "kb-preview__mode-select"
            }, [...y[5] || (y[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ye, f.value]
            ])
          ]),
          e("div", gl, [
            (a(!0), n(L, null, W(Z.value, (de) => (a(), n("span", {
              key: de,
              class: "kb-preview__badge"
            }, u(de), 1))), 128))
          ])
        ]),
        o.selectedPlatform === "android" ? (a(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: xe(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${c.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          y[9] || (y[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: xe(["kb-android-notification", { "kb-android-notification--expanded": T.value }])
          }, [
            y[8] || (y[8] = Ge('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: xe(["kb-android-body", { "kb-android-body--expanded": T.value }])
            }, [
              T.value && C.value.imageUrl ? (a(), n("div", fl, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, kl)
              ])) : h("", !0),
              e("div", _l, [
                e("div", $l, [
                  oe.value ? (a(), n("div", wl, u(oe.value), 1)) : h("", !0),
                  ge.value ? (a(), n("div", xl, u(ge.value), 1)) : h("", !0),
                  Ie.value && !T.value && ((_ = C.value.location) != null && _.name || (V = C.value.location) != null && V.address) ? (a(), n("div", Cl, [
                    y[7] || (y[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    G(" " + u(((ye = C.value.location) == null ? void 0 : ye.name) || ((re = C.value.location) == null ? void 0 : re.address)), 1)
                  ])) : h("", !0),
                  j.value ? (a(), n("div", {
                    key: 3,
                    class: xe(["kb-preview-link", { "kb-preview-link--invalid": !Q.value }])
                  }, u(Q.value ? ne.value : "Invalid deep link format"), 3)) : h("", !0)
                ]),
                !T.value && C.value.imageUrl ? (a(), n("div", Sl, [
                  e("img", {
                    src: C.value.imageUrl,
                    alt: ""
                  }, null, 8, Il)
                ])) : h("", !0)
              ]),
              Ie.value && ke.value && T.value ? (a(), n("div", Tl, [
                e("iframe", {
                  src: ke.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Al),
                (R = C.value.location) != null && R.name || (B = C.value.location) != null && B.address ? (a(), n("div", Rl, u((($ = C.value.location) == null ? void 0 : $.name) || ((ve = C.value.location) == null ? void 0 : ve.address)), 1)) : h("", !0)
              ])) : h("", !0),
              F.value.length ? (a(), n("div", Ul, [
                (a(!0), n(L, null, W(F.value, (de) => (a(), n("button", {
                  key: de.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, u(de.label || "Action"), 1))), 128))
              ])) : h("", !0),
              fe.value > 0 ? (a(), n("p", Pl, " Showing " + u(F.value.length) + " of " + u(ie.value.length) + " actions on " + u(o.selectedPlatform) + ". ", 1)) : h("", !0)
            ], 2)
          ], 2)
        ], 2)) : o.selectedPlatform === "ios" ? (a(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: xe(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${b.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          y[12] || (y[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", Ll, [
            y[11] || (y[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", El, [
              y[10] || (y[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              oe.value ? (a(), n("div", Bl, u(oe.value), 1)) : h("", !0),
              ge.value ? (a(), n("div", Ol, u(ge.value), 1)) : h("", !0),
              j.value ? (a(), n("div", {
                key: 2,
                class: xe(["kb-preview-link", { "kb-preview-link--invalid": !Q.value }])
              }, u(Q.value ? ne.value : "Invalid deep link format"), 3)) : h("", !0),
              Ie.value && ke.value ? (a(), n("div", Nl, [
                e("iframe", {
                  src: ke.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Vl),
                ($e = C.value.location) != null && $e.name || (_e = C.value.location) != null && _e.address ? (a(), n("div", Ml, u(((Ce = C.value.location) == null ? void 0 : Ce.name) || ((P = C.value.location) == null ? void 0 : P.address)), 1)) : h("", !0)
              ])) : h("", !0),
              F.value.length ? (a(), n("div", Dl, [
                (a(!0), n(L, null, W(F.value, (de) => (a(), n("button", {
                  key: de.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, u(de.label || "Action"), 1))), 128))
              ])) : h("", !0),
              fe.value > 0 ? (a(), n("p", Wl, " Showing " + u(F.value.length) + " of " + u(ie.value.length) + " actions on " + u(o.selectedPlatform) + ". ", 1)) : h("", !0)
            ]),
            C.value.imageUrl ? (a(), n("div", jl, [
              e("img", {
                src: C.value.imageUrl,
                alt: ""
              }, null, 8, Hl)
            ])) : h("", !0)
          ])
        ], 2)) : (a(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: xe(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${f.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          y[14] || (y[14] = Ge('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", ql, [
            y[13] || (y[13] = Ge('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", Fl, [
              oe.value ? (a(), n("div", zl, u(oe.value), 1)) : h("", !0),
              ge.value ? (a(), n("div", Yl, u(ge.value), 1)) : h("", !0),
              j.value ? (a(), n("div", {
                key: 2,
                class: xe(["kb-preview-link", { "kb-preview-link--invalid": !Q.value }])
              }, u(Q.value ? ne.value : "Invalid deep link format"), 3)) : h("", !0),
              C.value.imageUrl ? (a(), n("div", Kl, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, Gl)
              ])) : h("", !0),
              Ie.value && ke.value ? (a(), n("div", Jl, [
                e("iframe", {
                  src: ke.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Ql),
                (ae = C.value.location) != null && ae.name || (J = C.value.location) != null && J.address ? (a(), n("div", Xl, u(((Se = C.value.location) == null ? void 0 : Se.name) || ((pe = C.value.location) == null ? void 0 : pe.address)), 1)) : h("", !0)
              ])) : h("", !0)
            ]),
            F.value.length ? (a(), n("div", Zl, [
              (a(!0), n(L, null, W(F.value, (de, E) => (a(), n("button", {
                key: de.id || E,
                type: "button",
                class: xe(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(E) > 0 }])
              }, u(de.label || "Action"), 3))), 128))
            ])) : h("", !0),
            fe.value > 0 ? (a(), n("p", eo, " Showing " + u(F.value.length) + " of " + u(ie.value.length) + " actions on " + u(o.selectedPlatform) + ". ", 1)) : h("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), ao = /* @__PURE__ */ Ne(to, [["__scopeId", "data-v-4fc616d9"]]), no = { class: "kb-version-dialog" }, so = {
  key: 0,
  class: "kb-version-empty"
}, lo = {
  key: 1,
  class: "kb-version-list"
}, oo = { class: "kb-version-item-label" }, io = ["onClick"], ro = { class: "kb-version-actions" }, uo = /* @__PURE__ */ Oe({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(o, { emit: d }) {
    const c = d;
    function b(f) {
      try {
        return new Date(f).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return f;
      }
    }
    return (f, T) => o.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: T[1] || (T[1] = ea((x) => c("close"), ["escape"]))
    }, [
      e("div", no, [
        T[2] || (T[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        T[3] || (T[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        o.versions.length === 0 ? (a(), n("div", so, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", lo, [
          (a(!0), n(L, null, W(o.versions, (x) => (a(), n("li", {
            key: x.id,
            class: "kb-version-item"
          }, [
            e("span", oo, u(x.label || b(x.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                c("restore", x.snapshot), c("close");
              }
            }, " Restore ", 8, io)
          ]))), 128))
        ])),
        e("div", ro, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: T[0] || (T[0] = (x) => c("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : h("", !0);
  }
}), Kt = /* @__PURE__ */ Ne(uo, [["__scopeId", "data-v-ce35a513"]]), At = [
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
], co = [
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
        footer: "Do not share this code",
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
], po = { class: "keos-notification-builder" }, mo = { class: "kb-builder-top" }, vo = { class: "kb-push-layout" }, bo = { class: "kb-push-sidebar" }, ho = {
  key: 0,
  class: "kb-push-form"
}, yo = {
  key: 0,
  class: "kb-hint-card"
}, go = { class: "kb-push-form-head" }, fo = { class: "kb-push-form-head-top" }, ko = { class: "kb-push-health-pill" }, _o = { class: "kb-push-form-head-row" }, $o = ["value"], wo = { class: "kb-push-health" }, xo = { class: "kb-push-health-row" }, Co = { class: "kb-push-health-value" }, So = { class: "kb-push-health-bar" }, Io = {
  key: 1,
  class: "kb-push-form"
}, To = { class: "kb-push-canvas" }, Ao = {
  key: 0,
  class: "kb-push-test-banner"
}, Ro = { class: "kb-push-preview-chrome" }, Uo = { class: "kb-push-preview-controls" }, Po = { class: "kb-push-preview-as" }, Lo = ["value"], Eo = { class: "kb-preview-status" }, Bo = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Oo = ["aria-selected", "aria-controls", "onClick"], No = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Vo = { class: "kb-push-actions" }, Mo = {
  key: 0,
  class: "kb-actions-note"
}, Do = { key: 0 }, Wo = { class: "kb-push-actions-right" }, jo = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Ho = { class: "kb-confirm-dialog" }, qo = { class: "kb-confirm-actions" }, Fo = /* @__PURE__ */ Oe({
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
    const c = o, b = d, f = be("android"), T = be(""), x = be(!1), C = be(null), U = be(!1), H = w(
      () => N.value.workflow_status ?? "draft"
    ), Y = w(() => {
      const s = T.value;
      return s ? Ze.find((l) => l.id === s) ?? null : null;
    });
    function se(s) {
      const l = N.value, g = s.campaign.message ? { ...l.message, ...s.campaign.message } : l.message, v = s.campaign.delivery ? { ...l.delivery, ...s.campaign.delivery } : l.delivery;
      j({
        ...s.campaign,
        message: g,
        delivery: v
      }), C.value = null, x.value = !1;
    }
    function oe(s) {
      const l = s.target.value;
      if (!l) return;
      const g = At.find((v) => v.id === l);
      g && (ie.value ? (C.value = g, x.value = !0) : se(g), s.target.value = "");
    }
    function ge(s) {
      N.value = s, U.value = !1;
    }
    const {
      campaign: N,
      dirty: ie,
      customValidatorErrors: F,
      getValidationWithWarnings: fe,
      update: j,
      updateMessage: Q,
      updateDelivery: ne,
      undo: Z,
      redo: ke,
      canUndo: Ie,
      canRedo: te,
      resetMessage: y,
      resetDelivery: _,
      getPreview: V,
      characterLimits: ye,
      hooks: re
    } = ut({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (s) => {
          var v, M, A, O;
          const l = [];
          (v = s.name) != null && v.trim() || l.push("Template name is required"), (A = (M = s.message) == null ? void 0 : M.body) != null && A.trim() || l.push("Message body is required");
          const g = (O = c.hooks) != null && O.customValidators ? await c.hooks.customValidators(s) : [];
          return [...l, ...g];
        }
      },
      onDirty: () => b("change", N.value)
    }), { lastSavedAt: R } = dt(N, { channel: "push" });
    function B(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ke() : Z());
    }
    st(() => {
      window.addEventListener("keydown", B);
    }), lt(() => {
      window.removeEventListener("keydown", B);
    }), Ve(N, (s) => b("update:modelValue", s), { deep: !0 });
    const $ = be(), ve = be(!0), $e = be(!0);
    async function _e() {
      if (re.estimateReach)
        try {
          $.value = await re.estimateReach(N.value.audience);
        } catch {
          $.value = void 0;
        }
      re.canSend && (ve.value = await Promise.resolve(re.canSend())), re.canSchedule && ($e.value = await Promise.resolve(re.canSchedule()));
    }
    _e(), Ve(() => N.value.audience, _e, { deep: !0 });
    const Ce = w(() => (F.value, fe($.value))), P = w(() => Ce.value.blockingErrors), ae = w(() => Ce.value.warnings), J = w(() => Ce.value.valid), Se = w(() => {
      var v, M, A;
      const s = N.value.message, l = [
        !!((v = N.value.name) != null && v.trim()),
        !!((M = s.title) != null && M.trim()),
        !!((A = s.body) != null && A.trim()),
        !!(s.template_type ?? N.value.template_type),
        Array.isArray(s.actions) ? s.actions.length > 0 : !1
      ], g = l.filter(Boolean).length;
      return Math.round(g / l.length * 100);
    }), pe = w(() => Se.value >= 90 ? "Production ready" : Se.value >= 70 ? "Strong draft" : Se.value >= 40 ? "In progress" : "Needs setup"), de = w(() => {
      const s = N.value.message;
      return !!((s.title ?? "").toString().trim() || (s.body ?? "").toString().trim() || Array.isArray(s.actions) && s.actions.length);
    }), E = w(
      () => ye[f.value].title
    ), m = w(() => ye[f.value].body), k = w(() => N.value.message.title.length), K = w(() => N.value.message.body.length), ee = w(() => {
      if (k.value > E.value)
        return `Title exceeds ${E.value} characters for ${f.value}.`;
    }), Ue = w(() => {
      const s = P.value.find(
        (l) => l.message === "Message body is required"
      );
      if (s) return s.message;
      if (K.value > m.value)
        return `Body exceeds ${m} characters for ${f.value}.`;
    }), Ee = w(
      () => N.value.template_type ?? "transactional"
    );
    function He(s) {
      j({ template_type: s });
    }
    function qe(s) {
      j({
        name: s,
        tracking: { ...N.value.tracking ?? {}, campaign_name: s }
      });
    }
    function We(s) {
      const l = ` {{ .${s.variable} }}`, g = N.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, s.variable]));
      s.field === "title" ? Q({
        title: N.value.message.title + l,
        variables: v
      }) : Q({
        body: N.value.message.body + l,
        variables: v
      });
    }
    function ce() {
      J.value && b("save", N.value);
    }
    return (s, l) => {
      var g;
      return a(), n("div", po, [
        e("div", mo, [
          Me(ct, {
            "campaign-name": S(N).name,
            status: S(N).status,
            dirty: S(ie),
            "last-saved-at": S(R),
            "can-undo": S(Ie),
            "can-redo": S(te),
            "workflow-status": H.value,
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": qe,
            "onUpdate:workflowStatus": l[0] || (l[0] = (v) => S(j)({ workflow_status: v })),
            onUndo: S(Z),
            onRedo: S(ke)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          P.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ae({
              background: S(Le).dangerBg,
              border: `1px solid ${S(Le).dangerBorder}`,
              borderRadius: `${S(Qe).input}px`,
              padding: `${S(Te)[12]}px ${S(Te)[16]}px`,
              marginBottom: `${S(Te)[16]}px`
            })
          }, [
            e("ul", {
              style: Ae({ margin: 0, paddingLeft: "1.25rem", color: S(Le).danger })
            }, [
              (a(!0), n(L, null, W(P.value, (v) => (a(), n("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", vo, [
          e("aside", bo, [
            o.disabledSections.includes("message") ? h("", !0) : (a(), n("div", ho, [
              !S(N).message.title && !S(N).message.body ? (a(), n("div", yo, " Add a title and message below to get started. ")) : h("", !0),
              e("div", go, [
                e("div", fo, [
                  l[12] || (l[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", ko, u(pe.value), 1)
                ]),
                e("div", _o, [
                  Me($t, {
                    "template-type": Ee.value,
                    onUpdate: He
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: oe
                  }, [
                    l[13] || (l[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(L, null, W(S(At), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, $o))), 128))
                  ], 32)
                ]),
                e("div", wo, [
                  e("div", xo, [
                    l[14] || (l[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", Co, u(Se.value) + "%", 1)
                  ]),
                  e("div", So, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: Ae({ width: `${Se.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(fs, {
                message: S(N).message,
                "title-count": k.value,
                "body-count": K.value,
                "title-limit": E.value,
                "body-limit": m.value,
                "selected-platform": f.value,
                "show-reset": !0,
                "title-error": ee.value,
                "body-error": Ue.value,
                onUpdate: S(Q),
                onReset: l[1] || (l[1] = (v) => S(y)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Me(Yt, {
                message: S(N).message,
                "variable-options": o.variableOptions,
                onUpdate: S(Q),
                onInsertVariable: We
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !o.designOnly && !o.disabledSections.includes("delivery") ? (a(), n("div", Io, [
              l[15] || (l[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Me(ll, {
                delivery: S(N).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: S(ne),
                onReset: l[2] || (l[2] = (v) => S(_)())
              }, null, 8, ["delivery", "onUpdate"]),
              Me(vl, {
                delivery: S(N).delivery,
                onUpdate: S(ne)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : h("", !0)
          ]),
          e("main", To, [
            !o.designOnly && S(N).audience.test_mode ? (a(), n("div", Ao, [...l[16] || (l[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", Ro, [
              e("div", Uo, [
                e("label", Po, [
                  l[18] || (l[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[3] || (l[3] = (v) => T.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[17] || (l[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(L, null, W(S(Ze), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Lo))), 128))
                  ], 512), [
                    [Ye, T.value]
                  ])
                ]),
                e("div", Eo, [
                  l[19] || (l[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(f.value), 1)
                ])
              ]),
              e("div", Bo, [
                (a(), n(L, null, W(["android", "ios", "web"], (v) => e("button", {
                  key: v,
                  type: "button",
                  class: xe(["kb-push-device-btn", { "kb-push-device-btn--active": f.value === v }]),
                  role: "tab",
                  "aria-selected": f.value === v,
                  "aria-controls": `kb-preview-panel-${v}`,
                  onClick: (M) => f.value = v
                }, u(v.toUpperCase()), 11, Oo)), 64))
              ]),
              e("div", {
                class: xe(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !de.value }])
              }, [
                !S(N).message.title && !S(N).message.body ? (a(), n("div", No, [...l[20] || (l[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), ta(ao, {
                  key: 1,
                  "get-preview": S(V),
                  "selected-platform": f.value,
                  "preview-profile": Y.value,
                  message: S(N).message,
                  delivery: S(N).delivery,
                  "onUpdate:selectedPlatform": l[4] || (l[4] = (v) => f.value = v)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Vo, [
          ae.value.length > 0 ? (a(), n("div", Mo, [
            l[21] || (l[21] = e("strong", null, "Warning:", -1)),
            G(" " + u((g = ae.value[0]) == null ? void 0 : g.message) + " ", 1),
            ae.value.length > 1 ? (a(), n("span", Do, " (+" + u(ae.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", Wo, [
            !o.designOnly && o.showHistory ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[5] || (l[5] = (v) => U.value = !0)
            }, " Version history ")) : h("", !0),
            !o.designOnly && o.showSaveVersion ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[6] || (l[6] = (v) => b("save-version", JSON.parse(JSON.stringify(S(N)))))
            }, " Save as version ")) : h("", !0),
            o.showDuplicate ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: l[7] || (l[7] = (v) => b("duplicate", JSON.parse(JSON.stringify(S(N)))))
            }, " Duplicate ")) : h("", !0),
            o.showSave ? (a(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: ce
            }, " Save ")) : h("", !0),
            o.showClose ? (a(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: l[8] || (l[8] = (v) => b("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        x.value ? (a(), n("div", jo, [
          e("div", Ho, [
            l[22] || (l[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[23] || (l[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", qo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: l[9] || (l[9] = (v) => {
                  x.value = !1, C.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: l[10] || (l[10] = (v) => C.value && se(C.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0),
        Me(Kt, {
          open: U.value,
          versions: o.versions,
          onClose: l[11] || (l[11] = (v) => U.value = !1),
          onRestore: ge
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Gt = /* @__PURE__ */ Ne(Fo, [["__scopeId", "data-v-18771e1a"]]), zo = { class: "kb-section" }, Yo = { class: "kb-section__head" }, Ko = { class: "kb-summary-bar" }, Go = { class: "kb-pill kb-pill--category" }, Jo = { class: "kb-pill kb-pill--format" }, Qo = { class: "kb-pill kb-pill--status" }, Xo = { class: "kb-field" }, Zo = ["value"], ei = ["value", "disabled"], ti = { class: "kb-field" }, ai = { class: "kb-label" }, ni = { class: "kb-helper" }, si = ["value"], li = ["value", "disabled"], oi = { class: "kb-field" }, ii = ["value"], ri = { class: "kb-field kb-field--inline kb-field--language-limits" }, ui = { class: "kb-field-half" }, di = ["value"], ci = { class: "kb-field" }, pi = ["value"], mi = { class: "kb-field kb-field--toggles" }, vi = { class: "kb-toggle-row" }, bi = ["checked"], hi = { class: "kb-toggle-row" }, yi = ["checked"], gi = { class: "kb-field" }, fi = ["value"], ki = {
  key: 0,
  class: "kb-field"
}, _i = { class: "kb-label" }, $i = { class: "kb-input-with-var" }, wi = ["value"], xi = { class: "kb-var-picker-wrap" }, Ci = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Si = ["onClick"], Ii = {
  key: 1,
  class: "kb-field"
}, Ti = ["value"], Ai = {
  key: 2,
  class: "kb-field"
}, Ri = ["value"], Ui = {
  key: 3,
  class: "kb-field"
}, Pi = ["value"], Li = {
  key: 4,
  class: "kb-field"
}, Ei = ["value"], Bi = {
  key: 5,
  class: "kb-field"
}, Oi = ["value"], Ni = {
  key: 6,
  class: "kb-field"
}, Vi = ["value"], Mi = ["value"], Di = {
  key: 7,
  class: "kb-field"
}, Wi = { class: "kb-wa-buttons" }, ji = { class: "kb-carousel-card__head" }, Hi = { class: "kb-carousel-card__num" }, qi = ["onClick"], Fi = { class: "kb-field-inline-2" }, zi = ["value", "onChange"], Yi = ["value", "onInput"], Ki = ["value", "onInput"], Gi = ["value", "onInput"], Ji = { class: "kb-carousel-card__btns" }, Qi = ["value", "onInput"], Xi = ["value", "onChange"], Zi = ["value", "onInput"], er = ["value", "onInput"], tr = ["onClick"], ar = ["disabled", "onClick"], nr = ["disabled"], sr = {
  key: 8,
  class: "kb-field"
}, lr = { class: "kb-wa-buttons" }, or = ["value", "onInput"], ir = ["value", "onInput"], rr = ["onClick"], ur = {
  key: 9,
  class: "kb-field"
}, dr = ["value"], cr = ["value"], pr = { class: "kb-auth-options" }, mr = { class: "kb-toggle-row" }, vr = ["checked"], br = { class: "kb-auth-expiry" }, hr = ["value"], yr = { class: "kb-field" }, gr = { class: "kb-label" }, fr = { class: "kb-input-with-var" }, kr = ["value"], _r = { class: "kb-var-picker-wrap" }, $r = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, wr = ["onClick"], xr = { class: "kb-field" }, Cr = ["value"], Sr = {
  key: 10,
  class: "kb-field kb-wa-template-fields"
}, Ir = { class: "kb-wa-fields-list" }, Tr = { class: "kb-wa-field-name" }, Ar = { class: "kb-wa-field-status" }, Rr = { class: "kb-field" }, Ur = { class: "kb-input-with-var" }, Pr = ["value"], Lr = { class: "kb-var-picker-wrap" }, Er = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Br = ["onClick"], Or = {
  key: 11,
  class: "kb-field"
}, Nr = { class: "kb-wa-buttons" }, Vr = { class: "kb-input-with-var kb-input-with-var--btn" }, Mr = ["value", "onInput"], Dr = { class: "kb-var-picker-wrap" }, Wr = ["onClick"], jr = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Hr = ["onClick"], qr = ["value", "onChange"], Fr = ["disabled"], zr = ["value", "onInput"], Yr = ["value", "onInput"], Kr = ["value", "onInput"], Gr = ["value", "onInput"], Jr = ["value", "onChange"], Qr = ["value", "onInput"], Xr = ["value", "onInput"], Zr = ["value", "onInput"], eu = {
  key: 4,
  class: "kb-opt-out-note"
}, tu = ["onClick"], au = ["disabled"], vt = 60, bt = 1024, ht = 60, yt = 10, Pt = 10, nu = /* @__PURE__ */ Oe({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(o, { emit: d }) {
    const c = o, b = d, f = [
      { value: "text", label: "Text", hint: "Standard text template." },
      { value: "image", label: "Rich media (image header)", hint: "Body with image in header." },
      { value: "video", label: "Rich media (video header)", hint: "Body with video in header." },
      { value: "document", label: "Rich media (document header)", hint: "Body with PDF/document in header." },
      { value: "carousel", label: "Carousel", hint: "Up to 10 cards with media + buttons." },
      { value: "flow", label: "WhatsApp Flow", hint: "Launch a multi-step in-chat flow." },
      { value: "lto", label: "Limited-time offer", hint: "Adds expiry urgency to the offer." },
      { value: "catalog", label: "Catalog", hint: "Open WhatsApp catalog or product list." },
      { value: "mpm", label: "Multi-product", hint: "Show multiple products in one template." },
      { value: "auth", label: "Authentication", hint: "OTP/login verification template." }
    ], T = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], x = w(() => c.message), C = w(() => x.value.template_type ?? "text"), U = w(() => x.value.header_type ?? "none"), H = w(() => String(x.value.header ?? "")), Y = w(() => String(x.value.body ?? "")), se = w(() => String(x.value.footer ?? "")), oe = w(() => x.value.buttons ?? []), ge = w(() => x.value.products ?? []), N = w(() => x.value.cards ?? []), ie = w(() => {
      const E = f.find((m) => m.value === C.value);
      return (E == null ? void 0 : E.hint) ?? "Choose the approved WhatsApp template format.";
    }), F = w(() => {
      const E = String(x.value.template_category ?? "").trim();
      return E ? E.charAt(0).toUpperCase() + E.slice(1) : "Uncategorized";
    }), fe = w(() => {
      const E = f.find((m) => m.value === C.value);
      return (E == null ? void 0 : E.label) ?? "Text";
    }), j = w(() => x.value.template_name ? Y.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), Q = w(() => new Set((c.disabledCategories ?? []).map((E) => String(E).trim()))), ne = w(() => new Set((c.disabledFormats ?? []).map((E) => String(E).trim())));
    function Z(E) {
      if (!E || typeof E != "string") return [];
      const m = /\{\{\s*([^}]+?)\s*\}\}/g, k = /* @__PURE__ */ new Set();
      let K;
      for (; (K = m.exec(E)) !== null; ) k.add(K[1].trim());
      return Array.from(k);
    }
    const ke = w(() => {
      const E = c.message.header ?? "", m = c.message.body ?? c.message.body ?? "", k = new Set(c.message.variables ?? []), K = [...Z(E), ...Z(m)];
      return Array.from(new Set(K)).map((Ue) => ({ name: Ue, configured: k.has(Ue) }));
    }), Ie = [
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
    ], te = w(() => {
      const E = (c.message.variables ?? []).filter(Boolean);
      return E.length ? Array.from(new Set(E)) : Ie;
    }), y = be(null);
    function _(E) {
      b("update", E);
    }
    function V(E) {
      y.value = y.value === E ? null : E;
    }
    function ye(E, m) {
      var Ue;
      const k = ` {{ .${m} }}`, K = (c.message.variables ?? []).filter(Boolean), ee = Array.from(/* @__PURE__ */ new Set([...K, m]));
      if (E === "header")
        _({ header: `${H.value || ""}${k}`, variables: ee });
      else if (E === "body")
        _({ body: `${Y.value || ""}${k}`, variables: ee });
      else if (E === "footer")
        _({ footer: `${se.value || ""}${k}`, variables: ee });
      else if (E.startsWith("btn-label:")) {
        const Ee = Number(E.split(":")[1]);
        Number.isFinite(Ee) && B(Ee, { label: `${String(((Ue = oe.value[Ee]) == null ? void 0 : Ue.label) ?? "")}${k}` }), _({ variables: ee });
      }
      y.value = null;
    }
    function re(E) {
      const m = {
        template_category: E || void 0
      };
      E === "authentication" && C.value !== "auth" && (m.template_type = "auth"), _(m);
    }
    function R(E) {
      const m = { template_type: E };
      E === "auth" && (m.template_category = "authentication"), E === "image" || E === "video" || E === "document" ? m.header_type = E : (U.value === "image" || U.value === "video" || U.value === "document") && (m.header_type = "none"), _(m);
    }
    function B(E, m) {
      var K;
      const k = [...oe.value];
      k[E] = {
        ...k[E],
        id: ((K = k[E]) == null ? void 0 : K.id) || `btn_${E + 1}`,
        ...m
      }, _({ buttons: k });
    }
    function $(E) {
      const m = [...oe.value];
      m.splice(E, 1), _({ buttons: m });
    }
    function ve() {
      const E = [...oe.value];
      E.push({ id: `btn_${E.length + 1}`, label: "", type: "quick_reply" }), _({ buttons: E });
    }
    function $e(E, m) {
      var K;
      const k = [...ge.value];
      k[E] = {
        ...k[E],
        id: ((K = k[E]) == null ? void 0 : K.id) || `prod_${E + 1}`,
        ...m
      }, _({ products: k });
    }
    function _e(E) {
      const m = [...ge.value];
      m.splice(E, 1), _({ products: m });
    }
    function Ce() {
      const E = [...ge.value];
      E.push({ id: `prod_${E.length + 1}`, productId: "" }), _({ products: E });
    }
    function P(E, m) {
      var K;
      const k = [...N.value];
      k[E] = {
        ...k[E],
        id: ((K = k[E]) == null ? void 0 : K.id) || `card_${E + 1}`,
        ...m
      }, _({ cards: k });
    }
    function ae(E) {
      const m = [...N.value];
      m.splice(E, 1), _({ cards: m });
    }
    function J() {
      const E = [...N.value];
      E.push({
        id: `card_${E.length + 1}`,
        headerType: "IMAGE",
        mediaId: "",
        body: "",
        sampleText: "",
        buttons: []
      }), _({ cards: E });
    }
    function Se(E) {
      const m = [...N.value], k = { ...m[E] };
      k.buttons = [...k.buttons ?? [], { type: "QUICK_REPLY", label: "" }], m[E] = k, _({ cards: m });
    }
    function pe(E, m) {
      const k = [...N.value], K = { ...k[E] };
      K.buttons = [...K.buttons ?? []], K.buttons.splice(m, 1), k[E] = K, _({ cards: k });
    }
    function de(E, m, k) {
      const K = [...N.value], ee = { ...K[E] };
      ee.buttons = [...ee.buttons ?? []], ee.buttons[m] = { ...ee.buttons[m], ...k }, K[E] = ee, _({ cards: K });
    }
    return (E, m) => (a(), n("section", zo, [
      e("div", Yo, [
        m[26] || (m[26] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        o.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: m[0] || (m[0] = (k) => E.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      m[72] || (m[72] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Ko, [
        e("span", Go, u(F.value), 1),
        e("span", Jo, u(fe.value), 1),
        e("span", Qo, u(j.value), 1)
      ]),
      e("div", Xo, [
        m[28] || (m[28] = e("label", { class: "kb-label" }, [
          G(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: x.value.template_category ?? "",
          onChange: m[1] || (m[1] = (k) => re(k.target.value))
        }, [
          m[27] || (m[27] = e("option", { value: "" }, "Select category", -1)),
          (a(), n(L, null, W(T, (k) => e("option", {
            key: k.value,
            value: k.value,
            disabled: Q.value.has(k.value)
          }, u(k.label) + u(Q.value.has(k.value) ? " (Disabled)" : ""), 9, ei)), 64))
        ], 40, Zo)
      ]),
      e("div", ti, [
        e("label", ai, [
          m[29] || (m[29] = G(" Functional format ", -1)),
          e("span", ni, u(ie.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: C.value,
          onChange: m[2] || (m[2] = (k) => R(k.target.value))
        }, [
          (a(), n(L, null, W(f, (k) => e("option", {
            key: k.value,
            value: k.value,
            disabled: ne.value.has(k.value)
          }, u(k.label) + u(ne.value.has(k.value) ? " (Disabled)" : ""), 9, li)), 64))
        ], 40, si)
      ]),
      e("div", oi, [
        m[30] || (m[30] = e("label", { class: "kb-label" }, [
          G(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: x.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, ii)
      ]),
      e("div", ri, [
        e("div", ui, [
          m[31] || (m[31] = e("label", { class: "kb-label" }, [
            G(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: x.value.template_language ?? "",
            onInput: m[3] || (m[3] = (k) => _({
              template_language: k.target.value || void 0
            }))
          }, null, 40, di)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            m[32] || (m[32] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + u(vt) + " chars"),
              e("li", null, "Body: " + u(bt) + " chars"),
              e("li", null, "Footer: " + u(ht) + " chars"),
              e("li", null, "Buttons: up to " + u(yt))
            ])
          ])
        ])
      ]),
      e("div", ci, [
        m[33] || (m[33] = e("label", { class: "kb-label" }, [
          G(" Vertical (use-case label) "),
          e("span", { class: "kb-helper" }, 'Describes the business use-case shown during Meta review. Required by Gupshup (e.g. "Order Updates", "Promotions", "Authentication").')
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order Updates",
          value: x.value.vertical ?? "",
          onInput: m[4] || (m[4] = (k) => _({
            vertical: k.target.value || void 0
          }))
        }, null, 40, pi)
      ]),
      e("div", mi, [
        m[36] || (m[36] = e("label", { class: "kb-label" }, "Submission options", -1)),
        e("label", vi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!x.value.enable_sample,
            onChange: m[5] || (m[5] = (k) => _({ enable_sample: k.target.checked || void 0 }))
          }, null, 40, bi),
          m[34] || (m[34] = e("span", { class: "kb-toggle-label" }, "Include sample data in Meta review", -1))
        ]),
        e("label", hi, [
          e("input", {
            type: "checkbox",
            class: "kb-toggle",
            checked: !!x.value.allow_category_change,
            onChange: m[6] || (m[6] = (k) => _({ allow_category_change: k.target.checked || void 0 }))
          }, null, 40, yi),
          m[35] || (m[35] = e("span", { class: "kb-toggle-label" }, "Allow Meta to re-categorize this template", -1))
        ])
      ]),
      e("div", gi, [
        m[38] || (m[38] = e("label", { class: "kb-label" }, [
          G(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: U.value,
          onChange: m[7] || (m[7] = (k) => _({ header_type: k.target.value }))
        }, [...m[37] || (m[37] = [
          Ge('<option value="none" data-v-6e01dfe2>No header</option><option value="text" data-v-6e01dfe2>Text header</option><option value="image" data-v-6e01dfe2>Image header</option><option value="video" data-v-6e01dfe2>Video header</option><option value="document" data-v-6e01dfe2>Document header</option>', 5)
        ])], 40, fi)
      ]),
      U.value === "text" ? (a(), n("div", ki, [
        e("label", _i, [
          m[39] || (m[39] = G(" Header text ", -1)),
          e("span", {
            class: xe(["kb-counter", { "kb-counter--warn": H.value.length > vt }])
          }, u(H.value.length) + "/" + u(vt), 3)
        ]),
        e("div", $i, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: H.value,
            onInput: m[8] || (m[8] = (k) => _({
              header: k.target.value || void 0
            }))
          }, null, 40, wi),
          e("div", xi, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: m[9] || (m[9] = (k) => V("header"))
            }, "{{ .var }}"),
            y.value === "header" ? (a(), n("div", Ci, [
              (a(!0), n(L, null, W(te.value, (k) => (a(), n("button", {
                key: `wa-header-var-${k}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (K) => ye("header", k)
              }, u(k), 9, Si))), 128))
            ])) : h("", !0)
          ])
        ])
      ])) : h("", !0),
      ["image", "video", "document"].includes(U.value) || ["image", "video", "document"].includes(C.value) ? (a(), n("div", Ii, [
        m[40] || (m[40] = e("label", { class: "kb-label" }, [
          G(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: x.value.media_url ?? "",
          onInput: m[10] || (m[10] = (k) => _({
            media_url: k.target.value || void 0
          }))
        }, null, 40, Ti)
      ])) : h("", !0),
      ["image", "video", "document"].includes(U.value) || ["image", "video", "document"].includes(C.value) ? (a(), n("div", Ai, [
        m[41] || (m[41] = e("label", { class: "kb-label" }, [
          G(" Media handle (exampleMedia) "),
          e("span", { class: "kb-helper" }, "Gupshup media handle ID obtained after uploading via the media upload API. Required for template approval with rich media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. 6462811350485912",
          value: x.value.media_handle ?? "",
          onInput: m[11] || (m[11] = (k) => _({
            media_handle: k.target.value || void 0
          }))
        }, null, 40, Ri)
      ])) : h("", !0),
      U.value === "document" || C.value === "document" ? (a(), n("div", Ui, [
        m[42] || (m[42] = e("label", { class: "kb-label" }, [
          G(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: x.value.document_filename ?? "",
          onInput: m[12] || (m[12] = (k) => _({
            document_filename: k.target.value || void 0
          }))
        }, null, 40, Pi)
      ])) : h("", !0),
      ["image", "video", "document"].includes(U.value) || ["image", "video", "document"].includes(C.value) ? (a(), n("div", Li, [
        m[43] || (m[43] = e("label", { class: "kb-label" }, [
          G(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: x.value.media_caption ?? "",
          onInput: m[13] || (m[13] = (k) => _({
            media_caption: k.target.value || void 0
          }))
        }, null, 40, Ei)
      ])) : h("", !0),
      C.value === "lto" ? (a(), n("div", Bi, [
        m[44] || (m[44] = e("label", { class: "kb-label" }, [
          G(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: x.value.lto_expiry ?? "",
          onInput: m[14] || (m[14] = (k) => _({
            lto_expiry: k.target.value || void 0
          }))
        }, null, 40, Oi)
      ])) : h("", !0),
      C.value === "flow" ? (a(), n("div", Ni, [
        m[45] || (m[45] = e("label", { class: "kb-label" }, [
          G(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: x.value.flow_id ?? "",
          onInput: m[15] || (m[15] = (k) => _({
            flow_id: k.target.value || void 0
          }))
        }, null, 40, Vi),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: x.value.flow_cta_label ?? "",
          onInput: m[16] || (m[16] = (k) => _({
            flow_cta_label: k.target.value || void 0
          }))
        }, null, 40, Mi)
      ])) : h("", !0),
      C.value === "carousel" ? (a(), n("div", Di, [
        e("label", { class: "kb-label" }, [
          m[46] || (m[46] = G(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "MARKETING only. Each card requires a media header (IMAGE or VIDEO), body text, and can have URL + quick-reply buttons. Max " + u(Pt) + " cards.")
        ]),
        e("div", Wi, [
          (a(!0), n(L, null, W(N.value, (k, K) => (a(), n("div", {
            key: k.id || K,
            class: "kb-carousel-card"
          }, [
            e("div", ji, [
              e("span", Hi, "Card " + u(K + 1), 1),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (ee) => ae(Number(K))
              }, "Remove", 8, qi)
            ]),
            e("div", Fi, [
              e("div", null, [
                m[48] || (m[48] = e("label", { class: "kb-label kb-label--sm" }, "Header type", -1)),
                e("select", {
                  class: "kb-select",
                  value: k.headerType ?? "IMAGE",
                  onChange: (ee) => P(Number(K), { headerType: ee.target.value })
                }, [...m[47] || (m[47] = [
                  e("option", { value: "IMAGE" }, "Image", -1),
                  e("option", { value: "VIDEO" }, "Video", -1)
                ])], 40, zi)
              ]),
              e("div", null, [
                m[49] || (m[49] = e("label", { class: "kb-label kb-label--sm" }, "Media handle ID", -1)),
                e("input", {
                  type: "text",
                  class: "kb-input",
                  placeholder: "e.g. 6462811350485912",
                  value: k.mediaId ?? "",
                  onInput: (ee) => P(Number(K), { mediaId: ee.target.value })
                }, null, 40, Yi)
              ])
            ]),
            e("div", null, [
              m[50] || (m[50] = e("label", { class: "kb-label kb-label--sm" }, "Card body", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body text with {{1}} variables",
                value: k.body ?? "",
                onInput: (ee) => P(Number(K), { body: ee.target.value })
              }, null, 40, Ki)
            ]),
            e("div", null, [
              m[51] || (m[51] = e("label", { class: "kb-label kb-label--sm" }, "Sample text (body with real values for Meta approval)", -1)),
              e("textarea", {
                class: "kb-textarea",
                rows: "2",
                placeholder: "Card body with real values filled in",
                value: k.sampleText ?? "",
                onInput: (ee) => P(Number(K), { sampleText: ee.target.value })
              }, null, 40, Gi)
            ]),
            e("div", Ji, [
              m[53] || (m[53] = e("label", { class: "kb-label kb-label--sm" }, "Card buttons", -1)),
              (a(!0), n(L, null, W(k.buttons ?? [], (ee, Ue) => (a(), n("div", {
                key: Ue,
                class: "kb-wa-button-row kb-wa-button-row--sm"
              }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-label",
                  placeholder: "Button label",
                  value: ee.label ?? "",
                  onInput: (Ee) => de(Number(K), Number(Ue), { label: Ee.target.value })
                }, null, 40, Qi),
                e("select", {
                  class: "kb-select kb-select--btn-type",
                  value: ee.type ?? "QUICK_REPLY",
                  onChange: (Ee) => de(Number(K), Number(Ue), { type: Ee.target.value })
                }, [...m[52] || (m[52] = [
                  e("option", { value: "QUICK_REPLY" }, "Quick reply", -1),
                  e("option", { value: "URL" }, "Visit URL", -1)
                ])], 40, Xi),
                ee.type === "URL" ? (a(), n(L, { key: 0 }, [
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "https://example.com/shop?promo={{1}}",
                    value: ee.url ?? "",
                    onInput: (Ee) => de(Number(K), Number(Ue), { url: Ee.target.value })
                  }, null, 40, Zi),
                  e("input", {
                    type: "url",
                    class: "kb-input kb-input--btn-target",
                    placeholder: "Example URL (e.g. https://example.com/shop?promo=SUMMER23)",
                    value: ee.url_example ?? "",
                    onInput: (Ee) => de(Number(K), Number(Ue), { url_example: Ee.target.value })
                  }, null, 40, er)
                ], 64)) : h("", !0),
                e("button", {
                  type: "button",
                  class: "kb-wa-btn-remove",
                  onClick: (Ee) => pe(Number(K), Number(Ue))
                }, "Remove", 8, tr)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "kb-wa-btn-add",
                disabled: (k.buttons ?? []).length >= 2,
                onClick: (ee) => Se(Number(K))
              }, " Add button ", 8, ar)
            ])
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: N.value.length >= Pt,
            onClick: J
          }, " Add card ", 8, nr)
        ])
      ])) : h("", !0),
      ["mpm", "catalog"].includes(C.value) ? (a(), n("div", sr, [
        m[54] || (m[54] = e("label", { class: "kb-label" }, [
          G(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", lr, [
          (a(!0), n(L, null, W(ge.value, (k, K) => (a(), n("div", {
            key: k.id || K,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: k.productId,
              onInput: (ee) => $e(Number(K), { productId: ee.target.value })
            }, null, 40, or),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: k.sectionTitle,
              onInput: (ee) => $e(Number(K), { sectionTitle: ee.target.value || void 0 })
            }, null, 40, ir),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ee) => _e(Number(K))
            }, " Remove ", 8, rr)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: Ce
          }, " Add product ")
        ])
      ])) : h("", !0),
      C.value === "auth" ? (a(), n("div", ur, [
        m[58] || (m[58] = e("label", { class: "kb-label" }, [
          G(" Authentication template "),
          e("span", { class: "kb-helper" }, "Category must be AUTHENTICATION. Only OTP buttons allowed; no media, URLs, or custom body text.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: x.value.auth_type ?? "otp",
          onChange: m[17] || (m[17] = (k) => _({
            auth_type: k.target.value
          }))
        }, [...m[55] || (m[55] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, dr),
        e("input", {
          type: "text",
          class: "kb-input",
          style: { "margin-top": "0.5rem" },
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: x.value.auth_label ?? "",
          onInput: m[18] || (m[18] = (k) => _({
            auth_label: k.target.value || void 0
          }))
        }, null, 40, cr),
        e("div", pr, [
          e("label", mr, [
            e("input", {
              type: "checkbox",
              class: "kb-toggle",
              checked: !!x.value.add_security_recommendation,
              onChange: m[19] || (m[19] = (k) => _({ add_security_recommendation: k.target.checked || void 0 }))
            }, null, 40, vr),
            m[56] || (m[56] = e("span", { class: "kb-toggle-label" }, "Add security recommendation (warns user not to share code)", -1))
          ]),
          e("div", br, [
            m[57] || (m[57] = e("label", { class: "kb-label kb-label--sm" }, "Code expiration (minutes)", -1)),
            e("input", {
              type: "number",
              class: "kb-input kb-input--sm",
              placeholder: "e.g. 10",
              min: "1",
              value: x.value.code_expiration_minutes ?? "",
              onInput: m[20] || (m[20] = (k) => {
                const K = parseInt(k.target.value, 10);
                _({ code_expiration_minutes: isNaN(K) ? void 0 : K });
              })
            }, null, 40, hr)
          ])
        ])
      ])) : h("", !0),
      e("div", yr, [
        e("label", gr, [
          m[59] || (m[59] = G(" Body ", -1)),
          m[60] || (m[60] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: xe(["kb-counter", { "kb-counter--warn": Y.value.length > bt }])
          }, u(Y.value.length) + "/" + u(bt), 3)
        ]),
        e("div", fr, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
            value: Y.value,
            onInput: m[21] || (m[21] = (k) => _({
              body: k.target.value || void 0
            }))
          }, null, 40, kr),
          e("div", _r, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: m[22] || (m[22] = (k) => V("body"))
            }, "{{ .var }}"),
            y.value === "body" ? (a(), n("div", $r, [
              (a(!0), n(L, null, W(te.value, (k) => (a(), n("button", {
                key: `wa-body-var-${k}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (K) => ye("body", k)
              }, u(k), 9, wr))), 128))
            ])) : h("", !0)
          ])
        ])
      ]),
      e("div", xr, [
        m[61] || (m[61] = e("label", { class: "kb-label" }, [
          G(" Body example (for Meta approval) "),
          e("span", { class: "kb-helper" }, "Paste the body text with placeholders replaced by real sample values. Required by Meta for template approval.")
        ], -1)),
        e("textarea", {
          class: "kb-textarea",
          rows: "3",
          placeholder: "Hi John, your order ORD-5531 has been shipped...",
          value: x.value.template_example ?? "",
          onInput: m[23] || (m[23] = (k) => _({
            template_example: k.target.value || void 0
          }))
        }, null, 40, Cr)
      ]),
      ke.value.length > 0 ? (a(), n("div", Sr, [
        m[62] || (m[62] = e("label", { class: "kb-label" }, "Template fields", -1)),
        m[63] || (m[63] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", Ir, [
          (a(!0), n(L, null, W(ke.value, (k) => (a(), n("li", {
            key: k.name,
            class: xe(["kb-wa-field-item", { "kb-wa-field-item--ok": k.configured }])
          }, [
            e("span", Tr, u(k.name), 1),
            e("span", Ar, u(k.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : h("", !0),
      e("div", Rr, [
        m[64] || (m[64] = e("label", { class: "kb-label" }, [
          G(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("div", Ur, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: se.value,
            onInput: m[24] || (m[24] = (k) => _({
              footer: k.target.value || void 0
            }))
          }, null, 40, Pr),
          e("div", Lr, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: m[25] || (m[25] = (k) => V("footer"))
            }, "{{ .var }}"),
            y.value === "footer" ? (a(), n("div", Er, [
              (a(!0), n(L, null, W(te.value, (k) => (a(), n("button", {
                key: `wa-footer-var-${k}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (K) => ye("footer", k)
              }, u(k), 9, Br))), 128))
            ])) : h("", !0)
          ])
        ]),
        e("div", {
          class: xe(["kb-counter kb-counter--inline", { "kb-counter--warn": se.value.length > ht }])
        }, u(se.value.length) + "/" + u(ht), 3)
      ]),
      Y.value.trim().length > 0 ? (a(), n("div", Or, [
        e("label", { class: "kb-label" }, [
          m[65] || (m[65] = G(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + u(yt) + " buttons. ")
        ]),
        e("div", Nr, [
          (a(!0), n(L, null, W(oe.value, (k, K) => (a(), n("div", {
            key: k.id || K,
            class: "kb-wa-button-row"
          }, [
            e("div", Vr, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: k.label,
                onInput: (ee) => B(Number(K), { label: ee.target.value })
              }, null, 40, Mr),
              e("div", Dr, [
                e("button", {
                  type: "button",
                  class: "kb-btn-insert",
                  onClick: (ee) => V(`btn-label:${K}`)
                }, "{{ .var }}", 8, Wr),
                y.value === `btn-label:${K}` ? (a(), n("div", jr, [
                  (a(!0), n(L, null, W(te.value, (ee) => (a(), n("button", {
                    key: `wa-btn-label-var-${K}-${ee}`,
                    type: "button",
                    class: "kb-var-menu-item",
                    onClick: (Ue) => ye(`btn-label:${K}`, ee)
                  }, u(ee), 9, Hr))), 128))
                ])) : h("", !0)
              ])
            ]),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: k.type ?? "quick_reply",
              onChange: (ee) => B(Number(K), { type: ee.target.value })
            }, [
              m[66] || (m[66] = e("option", { value: "quick_reply" }, "Quick reply", -1)),
              m[67] || (m[67] = e("option", { value: "url" }, "Visit URL", -1)),
              m[68] || (m[68] = e("option", { value: "call" }, "Call phone", -1)),
              m[69] || (m[69] = e("option", { value: "copy_code" }, "Copy coupon code", -1)),
              e("option", {
                value: "otp",
                disabled: x.value.template_category !== "authentication"
              }, "OTP (authentication only)", 8, Fr),
              m[70] || (m[70] = e("option", { value: "opt_out" }, "Marketing opt-out", -1))
            ], 40, qr),
            k.type === "url" ? (a(), n(L, { key: 0 }, [
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://example.com/path/{{1}}",
                value: k.url,
                onInput: (ee) => B(Number(K), { url: ee.target.value || void 0 })
              }, null, 40, zr),
              e("input", {
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "Example URL with real value (e.g. https://example.com/path/ORD-5531)",
                value: k.url_example,
                onInput: (ee) => B(Number(K), { url_example: ee.target.value || void 0 })
              }, null, 40, Yr)
            ], 64)) : k.type === "call" ? (a(), n("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: k.phone,
              onInput: (ee) => B(Number(K), { phone: ee.target.value || void 0 })
            }, null, 40, Kr)) : k.type === "copy_code" ? (a(), n("input", {
              key: 2,
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Example coupon code (e.g. SAVE30DEC)",
              value: k.example,
              onInput: (ee) => B(Number(K), { example: ee.target.value || void 0 })
            }, null, 40, Gr)) : k.type === "otp" ? (a(), n(L, { key: 3 }, [
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: k.otp_type ?? "COPY_CODE",
                onChange: (ee) => B(Number(K), { otp_type: ee.target.value })
              }, [...m[71] || (m[71] = [
                e("option", { value: "COPY_CODE" }, "Copy code", -1),
                e("option", { value: "ONE_TAP" }, "One-tap autofill", -1)
              ])], 40, Jr),
              k.otp_type === "ONE_TAP" ? (a(), n(L, { key: 0 }, [
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Autofill button text (e.g. Tap to autofill)",
                  value: k.autofill_text,
                  onInput: (ee) => B(Number(K), { autofill_text: ee.target.value || void 0 })
                }, null, 40, Qr),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "Android package name (e.g. com.example.app)",
                  value: k.package_name,
                  onInput: (ee) => B(Number(K), { package_name: ee.target.value || void 0 })
                }, null, 40, Xr),
                e("input", {
                  type: "text",
                  class: "kb-input kb-input--btn-target",
                  placeholder: "App signature hash",
                  value: k.signature_hash,
                  onInput: (ee) => B(Number(K), { signature_hash: ee.target.value || void 0 })
                }, null, 40, Zr)
              ], 64)) : h("", !0)
            ], 64)) : k.type === "opt_out" ? (a(), n("span", eu, " Sends a built-in opt-out action. ")) : h("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ee) => $(Number(K))
            }, " Remove ", 8, tu)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: oe.value.length >= yt,
            onClick: ve
          }, " Add button ", 8, au)
        ])
      ])) : h("", !0)
    ]));
  }
}), su = /* @__PURE__ */ Ne(nu, [["__scopeId", "data-v-6e01dfe2"]]), lu = { class: "wa-preview-root" }, ou = { class: "wa-device" }, iu = { class: "wa-screen" }, ru = { class: "wa-header" }, uu = { class: "wa-titleblock" }, du = { class: "wa-title-row" }, cu = { class: "wa-title" }, pu = { class: "wa-subtitle" }, mu = {
  key: 0,
  class: "wa-flow-shell"
}, vu = { class: "wa-flow-header" }, bu = { class: "wa-flow-title" }, hu = { class: "wa-flow-content" }, yu = { class: "wa-flow-eyebrow" }, gu = {
  key: 0,
  class: "wa-flow-products"
}, fu = { class: "wa-flow-footer" }, ku = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, _u = { class: "wa-managed" }, $u = {
  key: 1,
  class: "wa-thread"
}, wu = { class: "wa-secure-banner" }, xu = { class: "wa-msg wa-msg--in" }, Cu = { class: "wa-template-card" }, Su = {
  key: 0,
  class: "wa-card-media"
}, Iu = ["src"], Tu = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, Au = ["src"], Ru = { class: "wa-card-media-doc-icon" }, Uu = ["title"], Pu = {
  key: 3,
  class: "wa-card-media-fallback"
}, Lu = { class: "wa-card-media-tag" }, Eu = { class: "wa-card-media-sub" }, Bu = {
  key: 1,
  class: "wa-card-header-text"
}, Ou = ["innerHTML"], Nu = {
  key: 2,
  class: "wa-link-preview"
}, Vu = { class: "wa-link-preview-head" }, Mu = { class: "wa-link-preview-text" }, Du = ["href"], Wu = {
  key: 3,
  class: "wa-inline-note"
}, ju = {
  key: 4,
  class: "wa-inline-note"
}, Hu = {
  key: 5,
  class: "wa-inline-note"
}, qu = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Fu = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, zu = {
  key: 8,
  class: "wa-product-list"
}, Yu = { class: "wa-product-name" }, Ku = { class: "wa-product-price" }, Gu = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Ju = {
  key: 10,
  class: "wa-template-actions"
}, Qu = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Xu = { class: "wa-order-card" }, Zu = { class: "wa-order-card-top" }, ed = ["src"], td = { type: "button" }, ad = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, nd = { class: "wa-document-card" }, sd = { class: "wa-document-file" }, ld = { class: "wa-document-icon" }, od = ["title"], id = { class: "wa-document-caption" }, rd = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, ud = { class: "wa-voice-card" }, dd = { class: "wa-voice-top" }, cd = { class: "wa-voice-profile" }, pd = ["src"], md = { class: "wa-voice-duration" }, vd = { class: "wa-voice-transcript" }, bd = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, hd = { class: "wa-contact-card" }, yd = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, gd = { class: "wa-location-card" }, fd = { class: "wa-location-content" }, kd = { type: "button" }, _d = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, $d = { class: "wa-carousel-track" }, wd = { type: "button" }, xd = { class: "wa-msg wa-msg--out" }, Cd = { class: "wa-bubble wa-bubble--out" }, Sd = { class: "wa-bubble-author" }, Id = {
  key: 0,
  class: "wa-reaction"
}, Td = { class: "wa-msg wa-msg--in" }, Ad = { class: "wa-bubble wa-bubble--in" }, Rd = /* @__PURE__ */ Oe({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(o) {
    const d = o;
    function c(y) {
      return String(y).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const b = w(() => {
      var V;
      const y = ((V = d.template) == null ? void 0 : V.body) ?? "";
      return c(y).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), f = w(() => d.template.templateName || "Ecoshop"), T = w(() => "Business Account"), x = w(() => d.template.format === "flow" || !!d.template.flow), C = w(() => {
      var y;
      return (y = d.template.buttons) == null ? void 0 : y[0];
    }), U = w(() => {
      var y, _;
      return ((y = C.value) == null ? void 0 : y.text) || ((_ = d.template.flow) == null ? void 0 : _.ctaLabel) || "";
    }), H = w(() => d.template.buttons ?? []), Y = w(() => {
      var y;
      return (((y = d.template.multiProduct) == null ? void 0 : y.length) ?? 0) > 0;
    }), se = w(() => (d.template.format || "text").toUpperCase()), oe = w(() => {
      const y = d.template.header;
      return !y || y.type === "text" ? "" : y.type === "image" ? y.url || "Image" : y.type === "video" ? y.url || "Video" : y.filename || y.url || "Document";
    }), ge = w(() => {
      const y = d.template.header;
      if (!(!y || y.type !== "image" || !y.url))
        return { backgroundImage: `url(${y.url})` };
    });
    function N(y) {
      if (!y) return "";
      try {
        const _ = y.split("?")[0].split("#")[0], V = _.substring(_.lastIndexOf("/") + 1);
        return decodeURIComponent(V || "");
      } catch {
        return "";
      }
    }
    const ie = w(() => {
      const y = d.template.header;
      return !y || y.type !== "document" ? "" : y.filename || N(y.url) || "document.pdf";
    }), F = w(() => {
      const y = (d.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (y == null ? void 0 : y[0]) || "";
    });
    function fe(y) {
      try {
        return new URL(y).hostname;
      } catch {
        return "example.com";
      }
    }
    const j = w(() => {
      const y = d.template.linkPreview;
      return !y && !F.value ? null : {
        title: (y == null ? void 0 : y.title) || "Link preview",
        description: (y == null ? void 0 : y.description) || "Preview from your WhatsApp template link.",
        domain: (y == null ? void 0 : y.domain) || (F.value ? fe(F.value) : "example.com"),
        url: (y == null ? void 0 : y.url) || F.value || "#",
        thumbnail: (y == null ? void 0 : y.thumbnail) || ""
      };
    }), Q = w(() => {
      var V, ye, re;
      const _ = (re = (((V = d.template.documentCard) == null ? void 0 : V.filename) || ((ye = d.template.header) == null ? void 0 : ye.filename) || "").split(".").pop()) == null ? void 0 : re.trim().toUpperCase();
      return _ ? _.slice(0, 4) : "DOC";
    });
    function ne(y, _) {
      return y === "phone_number" ? "wa-btn-icon--phone" : y === "url" ? "wa-btn-icon--external" : y === "copy_code" ? "wa-btn-icon--code" : y === "opt_out" || (_ || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (_ || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const Z = w(() => {
      var y;
      return d.template.location || d.template.locationRequest ? "wa-side-icon--info" : ((y = d.template.header) == null ? void 0 : y.type) === "video" || d.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ke = w(() => {
      var _, V, ye;
      const y = d.template;
      return y.format === "flow" ? "Thanks, we received your preferences." : (_ = y.auth) != null && _.code ? "Use the verification code and let us know if it works." : (V = y.coupon) != null && V.code ? `Your coupon ${y.coupon.code} is active now.` : y.limitedOffer ? `Great choice. This offer is valid until ${y.limitedOffer}.` : (ye = d.template.multiProduct) != null && ye.length ? `Here are ${d.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), Ie = w(() => {
      var _, V;
      const y = d.template;
      return y.location ? y.location.name || y.location.address || `${y.location.lat}, ${y.location.lng}` : (_ = y.auth) != null && _.code ? `Verification code: ${y.auth.code}` : (V = y.flow) != null && V.id ? `Flow ID: ${y.flow.id}` : y.templateLanguage ? `Template language: ${y.templateLanguage}` : `Category: ${y.templateCategory || "utility"} • Format: ${y.format || "text"}`;
    }), te = w(() => {
      var V, ye;
      const y = d.template;
      if ((V = y.multiProduct) != null && V.length) return y.multiProduct.slice(0, 5).map((re) => re.name || "Product");
      if ((ye = y.buttons) != null && ye.length) return y.buttons.slice(0, 5).map((re) => re.text || "Option");
      const _ = (y.body || "").split(/\n|\.|,/).map((re) => re.trim()).filter(Boolean).slice(0, 5);
      return _.length ? _ : ["Option A", "Option B", "Option C"];
    });
    return (y, _) => {
      var V, ye, re, R, B, $, ve, $e, _e, Ce, P, ae, J, Se;
      return a(), n("div", lu, [
        e("div", ou, [
          e("div", iu, [
            _[30] || (_[30] = Ge('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", ru, [
              _[7] || (_[7] = e("span", { class: "wa-back" }, "←", -1)),
              _[8] || (_[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", uu, [
                e("div", du, [
                  e("span", cu, u(f.value), 1),
                  _[6] || (_[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", pu, u(T.value), 1)
              ]),
              _[9] || (_[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            x.value ? (a(), n("div", mu, [
              _[14] || (_[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", vu, [
                _[10] || (_[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", bu, u(f.value), 1),
                _[11] || (_[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", hu, [
                e("p", yu, u(o.template.body || "Please choose an option below."), 1),
                (a(!0), n(L, null, W(te.value, (pe, de) => (a(), n("div", {
                  key: `flow-opt-${de}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, u(pe), 1),
                  e("span", {
                    class: xe(["wa-radio", { "wa-radio--on": de === 0 }])
                  }, null, 2)
                ]))), 128)),
                (V = o.template.multiProduct) != null && V.length ? (a(), n("div", gu, [
                  (a(!0), n(L, null, W(o.template.multiProduct.slice(0, 3), (pe, de) => (a(), n("div", {
                    key: de,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, u(pe.name || "Product"), 1),
                      e("p", null, u(pe.price || "Price on request"), 1)
                    ]),
                    _[12] || (_[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : h("", !0)
              ]),
              e("div", fu, [
                U.value ? (a(), n("button", ku, u(U.value), 1)) : h("", !0),
                e("p", _u, [
                  _[13] || (_[13] = G("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: _[0] || (_[0] = at(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), n("div", $u, [
              _[29] || (_[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", wu, [
                _[15] || (_[15] = e("span", null, "●", -1)),
                _[16] || (_[16] = G(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: _[1] || (_[1] = at(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", xu, [
                e("div", Cu, [
                  o.template.header && o.template.header.type !== "text" ? (a(), n("div", Su, [
                    o.template.header.type === "image" && o.template.header.url ? (a(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: o.template.header.url,
                      alt: "Header media"
                    }, null, 8, Iu)) : o.template.header.type === "video" && o.template.header.url ? (a(), n("div", Tu, [
                      e("video", {
                        src: o.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, Au),
                      _[17] || (_[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : o.template.header.type === "document" ? (a(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: _[2] || (_[2] = at(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", Ru, u(Q.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ie.value
                      }, u(ie.value), 9, Uu)
                    ])) : (a(), n("div", Pu, [
                      e("div", Lu, u(se.value) + " TEMPLATE", 1),
                      e("div", Eu, u(oe.value), 1),
                      ge.value ? (a(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: Ae(ge.value)
                      }, null, 4)) : h("", !0)
                    ]))
                  ])) : (ye = o.template.header) != null && ye.text ? (a(), n("div", Bu, u(o.template.header.text), 1)) : h("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: b.value
                  }, null, 8, Ou),
                  j.value ? (a(), n("div", Nu, [
                    e("div", Vu, [
                      j.value.thumbnail ? (a(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: Ae({ backgroundImage: `url(${j.value.thumbnail})` })
                      }, null, 4)) : h("", !0),
                      e("div", Mu, [
                        e("strong", null, u(j.value.title), 1),
                        e("p", null, u(j.value.description), 1),
                        e("span", null, u(j.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: j.value.url,
                      onClick: _[3] || (_[3] = at(() => {
                      }, ["prevent"]))
                    }, u(j.value.url), 9, Du)
                  ])) : h("", !0),
                  o.template.location ? (a(), n("div", Wu, " 📍 " + u(o.template.location.name || o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)) : h("", !0),
                  (re = o.template.coupon) != null && re.code ? (a(), n("div", ju, [
                    _[18] || (_[18] = G(" Coupon: ", -1)),
                    e("strong", null, u(o.template.coupon.code), 1)
                  ])) : h("", !0),
                  (R = o.template.auth) != null && R.code ? (a(), n("div", Hu, [
                    _[19] || (_[19] = G(" Verification code: ", -1)),
                    e("strong", null, u(o.template.auth.code), 1)
                  ])) : h("", !0),
                  o.template.limitedOffer ? (a(), n("div", qu, " Expires: " + u(o.template.limitedOffer), 1)) : h("", !0),
                  o.template.footer ? (a(), n("div", Fu, u(o.template.footer), 1)) : h("", !0),
                  Y.value ? (a(), n("div", zu, [
                    (a(!0), n(L, null, W((B = o.template.multiProduct) == null ? void 0 : B.slice(0, 4), (pe, de) => (a(), n("div", {
                      key: `prod-${de}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Yu, u(pe.name || `Item ${de + 1}`), 1),
                      e("span", Ku, u(pe.price || "-"), 1)
                    ]))), 128))
                  ])) : h("", !0),
                  U.value ? (a(), n("button", Gu, [
                    C.value ? (a(), n("span", {
                      key: 0,
                      class: xe(["wa-btn-icon", ne(C.value.type, C.value.value || C.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : h("", !0),
                    G(" " + u(U.value), 1)
                  ])) : h("", !0),
                  H.value.length > 1 ? (a(), n("div", Ju, [
                    (a(!0), n(L, null, W(H.value.slice(1, 4), (pe, de) => (a(), n("button", {
                      key: `action-${de}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: xe(["wa-btn-icon", ne(pe.type, pe.value || pe.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      G(" " + u(pe.text), 1)
                    ]))), 128))
                  ])) : h("", !0),
                  _[20] || (_[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: xe(["wa-side-icon", Z.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              o.template.orderCard ? (a(), n("div", Qu, [
                e("div", Xu, [
                  e("div", Zu, [
                    o.template.orderCard.image ? (a(), n("img", {
                      key: 0,
                      src: o.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, ed)) : h("", !0),
                    e("div", null, [
                      e("strong", null, u(o.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, u(o.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", td, u(o.template.orderCard.buttonLabel || "View"), 1),
                  _[21] || (_[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : h("", !0),
              o.template.documentCard || (($ = o.template.header) == null ? void 0 : $.type) === "document" ? (a(), n("div", ad, [
                e("div", nd, [
                  e("div", sd, [
                    e("span", ld, u(Q.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((ve = o.template.documentCard) == null ? void 0 : ve.filename) || (($e = o.template.header) == null ? void 0 : $e.filename) || "document.pdf"
                      }, u(((_e = o.template.documentCard) == null ? void 0 : _e.filename) || ((Ce = o.template.header) == null ? void 0 : Ce.filename) || "document.pdf"), 9, od),
                      e("p", null, u(((P = o.template.documentCard) == null ? void 0 : P.size) || "243 KB • html"), 1)
                    ]),
                    _[22] || (_[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", id, u(((ae = o.template.documentCard) == null ? void 0 : ae.caption) || o.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : h("", !0),
              o.template.voiceNote ? (a(), n("div", rd, [
                e("div", ud, [
                  e("div", dd, [
                    _[24] || (_[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    _[25] || (_[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", cd, [
                      o.template.voiceNote.profileImage ? (a(), n("img", {
                        key: 0,
                        src: o.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, pd)) : h("", !0),
                      _[23] || (_[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", md, u(o.template.voiceNote.duration || "0:10"), 1),
                  e("p", vd, u(o.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : h("", !0),
              o.template.contactCard ? (a(), n("div", bd, [
                e("div", hd, [
                  e("strong", null, u(o.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, u(o.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, u(o.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, u(o.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, u(o.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : h("", !0),
              o.template.location && o.template.locationRequest ? (a(), n("div", yd, [
                e("div", gd, [
                  _[26] || (_[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", fd, [
                    e("strong", null, u(o.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: _[4] || (_[4] = at(() => {
                      }, ["prevent"]))
                    }, u(o.template.location.address || `${o.template.location.lat}, ${o.template.location.lng}`), 1)
                  ]),
                  e("button", kd, u(o.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : h("", !0),
              (J = o.template.carouselCards) != null && J.length ? (a(), n("div", _d, [
                e("div", $d, [
                  (a(!0), n(L, null, W(o.template.carouselCards.slice(0, 4), (pe, de) => (a(), n("article", {
                    key: `c-${de}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: Ae(pe.image ? { backgroundImage: `url(${pe.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, u(pe.title || `Card ${de + 1}`), 1),
                    e("p", null, u(pe.description || "Card description"), 1),
                    e("button", wd, u(pe.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              e("div", xd, [
                e("div", Cd, [
                  e("span", Sd, u(f.value), 1),
                  e("p", null, u(ke.value), 1),
                  _[27] || (_[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  o.template.reactionEmoji ? (a(), n("span", Id, u(o.template.reactionEmoji), 1)) : h("", !0)
                ])
              ]),
              e("div", Td, [
                e("div", Ad, [
                  e("p", null, u(Ie.value), 1),
                  (Se = o.template.flow) != null && Se.id ? (a(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: _[5] || (_[5] = at(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + u(o.template.flow.id), 1)) : h("", !0),
                  _[28] || (_[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            _[31] || (_[31] = Ge('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Ud = /* @__PURE__ */ Ne(Rd, [["__scopeId", "data-v-244c945a"]]), Pd = { class: "keos-whatsapp-builder" }, Ld = { class: "kb-builder-top" }, Ed = { class: "kb-wa-layout" }, Bd = { class: "kb-wa-sidebar" }, Od = {
  key: 0,
  class: "kb-wa-form"
}, Nd = { class: "kb-wa-form-head" }, Vd = { class: "kb-wa-form-head-top" }, Md = { class: "kb-wa-health-pill" }, Dd = { class: "kb-wa-form-head-row" }, Wd = ["value"], jd = { class: "kb-wa-health" }, Hd = { class: "kb-wa-health-row" }, qd = { class: "kb-wa-health-value" }, Fd = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, zd = { class: "kb-wa-canvas" }, Yd = {
  key: 0,
  class: "kb-wa-test-banner"
}, Kd = { class: "kb-wa-preview-chrome" }, Gd = { class: "kb-push-preview-controls" }, Jd = { class: "kb-push-preview-as" }, Qd = ["value"], Xd = { class: "kb-preview-status" }, Zd = { class: "kb-wa-actions" }, ec = {
  key: 0,
  class: "kb-actions-note"
}, tc = { key: 0 }, ac = { class: "kb-wa-actions-right" }, nc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, sc = { class: "kb-confirm-dialog" }, lc = { class: "kb-confirm-actions" }, Lt = 60, Et = 1024, Bt = 60, Ot = 10, Nt = 10, oc = /* @__PURE__ */ Oe({
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
    const c = /* @__PURE__ */ new Set(["image", "video", "document"]), b = /* @__PURE__ */ new Set([
      "elementName",
      "languageCode",
      "category",
      "templateType",
      "content",
      "metaTemplate",
      "metaWhatsApp"
    ]);
    function f(s) {
      return s == null ? !1 : typeof s == "string" ? s.trim().length > 0 : Array.isArray(s) ? s.length > 0 : typeof s == "object" ? Object.keys(s).length > 0 : !0;
    }
    function T(s) {
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
        Object.entries(l).filter(([g, v]) => b.has(g) ? !0 : f(v))
      );
    }
    function x(s) {
      const l = { ...s }, g = String(l.template_type ?? "text").trim().toLowerCase(), v = String(l.header_type ?? "none").trim().toLowerCase();
      c.has(g) || c.has(v) || (l.media_url = void 0, l.media_caption = void 0, l.document_filename = void 0, l.document_size = void 0), g !== "carousel" && (l.cards = void 0), g !== "catalog" && g !== "mpm" && (l.products = void 0), g !== "flow" && (l.flow_id = void 0, l.flow_cta_label = void 0), g !== "lto" && (l.lto_expiry = void 0), g !== "auth" && (l.auth_type = void 0, l.auth_label = void 0, l.auth_code = void 0, l.otp_code = void 0), g !== "document" && v !== "document" && (l.document_filename = void 0, l.document_size = void 0), g !== "location" && (l.location = void 0);
      const A = Array.isArray(l.buttons) ? l.buttons : [];
      return l.buttons = A, l;
    }
    function C(s) {
      var Be, p, i, t, q;
      const l = [], g = s.message, v = (g.template_category ?? "").toString().trim(), M = (g.template_type ?? "text").toString(), A = (g.header_type ?? "none").toString(), O = (g.header ?? "").toString(), z = (g.body ?? "").toString(), me = (g.footer ?? "").toString(), le = Array.isArray(g.buttons) ? g.buttons : [], we = Array.isArray(g.cards) ? g.cards : [];
      return (Be = s.name) != null && Be.trim() || l.push("Template name is required"), (p = g.template_name) != null && p.trim() || l.push("WhatsApp template name is required"), v || l.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), z.trim() || l.push("Body is required"), A === "text" && O.length > Lt && l.push(`Header text cannot exceed ${Lt} characters`), z.length > Et && l.push(`Body cannot exceed ${Et} characters`), me.length > Bt && l.push(`Footer cannot exceed ${Bt} characters`), le.length > Ot && l.push(`Buttons cannot exceed ${Ot}`), (M === "image" || M === "video" || M === "document" || A === "image" || A === "video" || A === "document") && !g.media_url && l.push("Media URL is required for rich media templates"), v === "authentication" && M !== "auth" && l.push("Authentication category must use Authentication format"), M === "auth" && !((i = g.auth_label) != null && i.trim()) && !z.includes("{{") && l.push("Authentication templates should include a code label or placeholder variable"), M === "lto" && !g.lto_expiry && l.push("Limited-time offer requires an expiry"), (M === "mpm" || M === "catalog") && !((t = g.products) != null && t.length) && l.push("Catalog and multi-product templates require at least one product"), M === "flow" && !((q = g.flow_id) != null && q.trim()) && l.push("WhatsApp Flow format requires a flow ID"), M === "carousel" && (we.length ? we.length > Nt && l.push(`Carousel supports up to ${Nt} cards`) : l.push("Carousel format requires at least one card")), l;
    }
    function U(s, l, g) {
      const v = s.message, M = String(v.template_category ?? "").trim(), A = String(v.template_type ?? "text").trim(), O = [];
      return M && l.includes(M) && O.push(`WhatsApp category "${M}" is disabled in this builder configuration`), A && g.includes(A) && O.push(`WhatsApp format "${A}" is disabled in this builder configuration`), O;
    }
    const H = o;
    function Y(s) {
      if (!s) return {};
      const l = s.metaTemplate ?? s.metaWhatsApp, g = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((p) => (p == null ? void 0 : p.type) === "BODY") : void 0, v = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((p) => (p == null ? void 0 : p.type) === "FOOTER") : void 0, M = Array.isArray(l == null ? void 0 : l.components) ? (l == null ? void 0 : l.components).find((p) => (p == null ? void 0 : p.type) === "HEADER") : void 0, A = String(s.content ?? "").trim(), O = String(s.elementName ?? "").trim(), z = String(s.languageCode ?? "").trim(), me = String(s.category ?? "").trim().toLowerCase(), le = String(s.templateType ?? "").trim().toLowerCase(), we = String(s.footer ?? "").trim(), Be = String(s.header ?? "").trim();
      return {
        ...s,
        ...O && !s.template_name ? { template_name: O } : {},
        ...z && !s.template_language ? { template_language: z } : {},
        ...me && !s.template_category ? { template_category: me } : {},
        ...le && !s.template_type ? { template_type: le } : {},
        ...A && !s.body ? { body: A } : {},
        ...we && !s.footer ? { footer: we } : {},
        ...Be && !s.header ? { header: Be } : {},
        ...!s.body && (g != null && g.text) ? { body: String(g.text) } : {},
        ...!s.footer && (v != null && v.text) ? { footer: String(v.text) } : {},
        ...!s.header && (M != null && M.text) ? { header: String(M.text) } : {}
      };
    }
    function se(s) {
      if (!s) return s;
      const l = Y(s.message);
      return { ...s, message: l };
    }
    const oe = d;
    function ge(s) {
      var g;
      const l = Ct(s, {
        exampleData: (g = m.value) == null ? void 0 : g.data
      });
      return {
        ...s,
        message: T(l.payload)
      };
    }
    const {
      campaign: N,
      dirty: ie,
      customValidatorErrors: F,
      getValidationWithWarnings: fe,
      update: j,
      updateMessage: Q,
      undo: ne,
      redo: Z,
      canUndo: ke,
      canRedo: Ie,
      resetMessage: te,
      hooks: y
    } = ut({
      initial: se(H.modelValue),
      hooks: {
        ...H.hooks,
        customValidators: async (s) => {
          var v;
          const l = [
            ...C(s),
            ...U(
              s,
              H.disabledTemplateCategories,
              H.disabledTemplateFormats
            )
          ], g = (v = H.hooks) != null && v.customValidators ? await H.hooks.customValidators(s) : [];
          return [...l, ...g];
        }
      },
      onDirty: () => oe("change", ge(N.value))
    }), { lastSavedAt: _ } = dt(N, { channel: "whatsapp" });
    function V(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? Z() : ne());
    }
    st(() => {
      window.addEventListener("keydown", V);
    }), lt(() => {
      window.removeEventListener("keydown", V);
    }), Ve(N, (s) => oe("update:modelValue", ge(s)), {
      deep: !0
    });
    const ye = be(), re = be(!0);
    async function R() {
      if (y.estimateReach)
        try {
          ye.value = await y.estimateReach(N.value.audience);
        } catch {
          ye.value = void 0;
        }
      y.canSend && (re.value = await Promise.resolve(y.canSend()));
    }
    R(), Ve(() => N.value.audience, R, { deep: !0 });
    const B = w(() => (F.value, fe(ye.value))), $ = w(() => B.value.blockingErrors), ve = w(() => B.value.warnings), $e = w(() => B.value.valid), _e = w(() => {
      var v, M, A;
      const s = N.value.message, l = [
        !!((v = s.template_name) != null && v.trim()),
        !!((M = s.template_category) != null && M.trim()),
        !!(s.body ?? "").toString().trim(),
        !!((A = s.template_language) != null && A.trim()),
        Array.isArray(s.buttons) ? s.buttons.length > 0 : !1
      ], g = l.filter(Boolean).length;
      return Math.round(g / l.length * 100);
    }), Ce = w(() => _e.value >= 90 ? "Production ready" : _e.value >= 70 ? "Strong draft" : _e.value >= 40 ? "In progress" : "Needs setup"), P = w(() => {
      const s = N.value.message;
      return !!((s.body ?? "").toString().trim() || (s.header ?? "").toString().trim() || s.media_url || s.flow_id || s.coupon_code || s.lto_expiry || s.voice_transcript || s.contact_name || s.link_title || s.order_title || Array.isArray(s.buttons) && s.buttons.length || Array.isArray(s.products) && s.products.length || Array.isArray(s.cards) && s.cards.length);
    }), ae = be(""), J = be(!1), Se = be(null), pe = w(
      () => new Set((H.disabledTemplateCategories ?? []).map((s) => String(s).trim().toLowerCase()))
    ), de = w(
      () => new Set((H.disabledTemplateFormats ?? []).map((s) => String(s).trim().toLowerCase()))
    ), E = w(
      () => co.filter((s) => {
        var M;
        const l = ((M = s.campaign) == null ? void 0 : M.message) ?? {}, g = String(l.template_category ?? "").trim().toLowerCase(), v = String(l.template_type ?? "").trim().toLowerCase();
        return !(g && pe.value.has(g) || v && de.value.has(v));
      })
    ), m = w(() => {
      const s = ae.value;
      return s ? Ze.find((l) => l.id === s) ?? null : null;
    }), k = w(() => {
      const s = N.value.message.body ?? "";
      return m.value ? Je(s, m.value.data) : s;
    }), K = w(() => {
      const s = N.value.message.header ?? "";
      return m.value ? Je(s, m.value.data) : s;
    }), ee = w(() => {
      var p;
      const s = N.value.message, l = s.template_type ?? "text", g = s.header_type ?? "none";
      let v, M, A, O, z, me, le;
      (l === "image" || g === "image") && s.media_url ? v = { type: "image", url: s.media_url } : (l === "video" || g === "video") && s.media_url ? v = { type: "video", url: s.media_url } : l === "document" || g === "document" ? v = {
        type: "document",
        url: s.media_url || void 0,
        filename: s.document_filename || s.media_url || "document.pdf"
      } : g === "text" && s.header ? v = { type: "text", text: K.value } : s.header && (v = { type: "text", text: K.value });
      const we = k.value || "Start adding content to see a live preview here.";
      if (l === "location" && s.location) {
        const i = s.location, t = i.lat ?? i.latitude, q = i.lng ?? i.lon ?? i.longitude;
        t != null && q != null && (M = {
          lat: t,
          lng: q,
          name: i.name ?? i.title,
          address: i.address ?? `${t}, ${q}`
        });
      }
      (l === "catalog" || l === "mpm") && Array.isArray(s.products) && s.products.length && (A = !0, O = s.products.map((i) => ({
        image: i.image ?? i.imageUrl,
        name: i.name ?? i.sectionTitle ?? i.title ?? "Product",
        price: i.price ?? i.productId ?? ""
      }))), l === "carousel" && Array.isArray(s.cards) && s.cards.length && (A = !0, O = s.cards.map((i) => ({
        image: i.image ?? i.media_url,
        name: i.title ?? "Card",
        price: i.button_label ?? ""
      }))), l === "coupon" && s.coupon_code && (z = { code: s.coupon_code }), l === "lto" && s.lto_expiry && (me = s.lto_expiry), l === "auth" && (le = { code: s.auth_code ?? s.otp_code ?? "123 456" });
      const Be = s.buttons ?? [];
      return l === "flow" && ((p = s.flow_cta_label) != null && p.trim()) && Be.push({
        label: s.flow_cta_label
      }), {
        format: l,
        templateName: s.template_name || void 0,
        templateLanguage: s.template_language || void 0,
        templateCategory: s.template_category || void 0,
        header: v,
        body: we,
        mediaCaption: s.media_caption || void 0,
        footer: s.footer || void 0,
        buttons: Be.map((i) => ({ text: i.label || "Button", type: i.type, value: i.value })),
        location: M,
        catalog: A,
        multiProduct: O,
        coupon: z,
        limitedOffer: me,
        auth: le,
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
        documentCard: s.document_filename || l === "document" || g === "document" ? {
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
        carouselCards: l === "carousel" && Array.isArray(s.cards) ? s.cards.map((i) => ({
          title: i.title || void 0,
          description: i.description || s.body || void 0,
          image: i.media_url || void 0,
          button: i.button_label || void 0
        })) : void 0,
        reactionEmoji: s.reaction_emoji || void 0,
        flow: l === "flow" ? {
          id: s.flow_id || void 0,
          ctaLabel: s.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Ue(s) {
      var v;
      const l = N.value, g = x({
        ...s.campaign.message ? s.campaign.message : l.message,
        template_name: ((v = s.campaign.message) == null ? void 0 : v.template_name) ?? s.campaign.name ?? l.name ?? void 0
      });
      j({
        ...s.campaign,
        message: g
      }), Se.value = null, J.value = !1;
    }
    function Ee(s) {
      const l = s.target.value;
      if (!l) return;
      const g = E.value.find((v) => v.id === l);
      g && (ie.value ? (Se.value = g, J.value = !0) : Ue(g), s.target.value = "");
    }
    function He(s) {
      j({
        name: s,
        message: { ...N.value.message, template_name: s || void 0 },
        tracking: { ...N.value.tracking ?? {}, campaign_name: s }
      });
    }
    function qe(s) {
      const l = N.value.message, g = x({
        ...l,
        ...s ?? {}
      });
      if (Q(g), Object.prototype.hasOwnProperty.call(s ?? {}, "template_name")) {
        const v = String((s == null ? void 0 : s.template_name) ?? "");
        v !== N.value.name && j({
          name: v,
          tracking: {
            ...N.value.tracking ?? {},
            campaign_name: v
          }
        });
      }
    }
    Ve(
      () => N.value.name,
      (s) => {
        const l = String(N.value.message.template_name ?? "");
        (s || "") !== l && Q({ template_name: s || void 0 });
      },
      { immediate: !0 }
    );
    function We(s) {
      const l = ` {{ .${s.variable} }}`, g = N.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, s.variable]));
      if (s.field === "title") {
        const M = N.value.message.header ?? "";
        Q({
          variables: v,
          header: M + l
        });
      } else if (s.field === "footer") {
        const M = N.value.message.footer ?? "";
        Q({
          variables: v,
          footer: M + l
        });
      } else {
        const M = N.value.message.body ?? "";
        Q({
          variables: v,
          body: M + l
        });
      }
    }
    function ce() {
      var g;
      if (!$e.value) return;
      const s = Ct(N.value, {
        exampleData: (g = m.value) == null ? void 0 : g.data
      }), l = ge(N.value);
      oe("save-gupshup-template", s.payload, s.warnings, l), oe("save", l);
    }
    return (s, l) => {
      var g;
      return a(), n("div", Pd, [
        e("div", Ld, [
          Me(ct, {
            "campaign-name": S(N).name,
            status: S(N).status,
            dirty: S(ie),
            "last-saved-at": S(_),
            "can-undo": S(ke),
            "can-redo": S(Ie),
            "slugify-name": H.enforceSlugName,
            "onUpdate:campaignName": He,
            onUndo: S(ne),
            onRedo: S(Z)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          $.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ae({
              background: S(Le).dangerBg,
              border: `1px solid ${S(Le).dangerBorder}`,
              borderRadius: `${S(Qe).input}px`,
              padding: `${S(Te)[12]}px ${S(Te)[16]}px`,
              marginBottom: `${S(Te)[16]}px`
            })
          }, [
            e("ul", {
              style: Ae({ margin: 0, paddingLeft: "1.25rem", color: S(Le).danger })
            }, [
              (a(!0), n(L, null, W($.value, (v) => (a(), n("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", Ed, [
          e("aside", Bd, [
            o.disabledSections.includes("whatsapp") ? h("", !0) : (a(), n("div", Od, [
              e("div", Nd, [
                e("div", Vd, [
                  l[6] || (l[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Md, u(Ce.value), 1)
                ]),
                e("div", Dd, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: Ee
                  }, [
                    l[7] || (l[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(L, null, W(E.value, (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Wd))), 128))
                  ], 32)
                ]),
                e("div", jd, [
                  e("div", Hd, [
                    l[8] || (l[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", qd, u(_e.value) + "%", 1)
                  ]),
                  e("div", Fd, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: Ae({ width: `${_e.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(su, {
                message: S(N).message,
                "show-reset": !0,
                "disabled-categories": o.disabledTemplateCategories,
                "disabled-formats": o.disabledTemplateFormats,
                onUpdate: qe,
                onReset: l[0] || (l[0] = (v) => S(te)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              Me(Yt, {
                message: S(N).message,
                "variable-options": o.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: S(Q),
                onInsertVariable: We
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", zd, [
            !o.designOnly && S(N).audience.test_mode ? (a(), n("div", Yd, [...l[9] || (l[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", Kd, [
              e("div", Gd, [
                e("label", Jd, [
                  l[11] || (l[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (v) => ae.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[10] || (l[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(L, null, W(S(Ze), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Qd))), 128))
                  ], 512), [
                    [Ye, ae.value]
                  ])
                ]),
                e("div", Xd, [
                  l[12] || (l[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(S(N).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: xe(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !P.value }])
              }, [
                Me(Ud, { template: ee.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Zd, [
          ve.value.length > 0 ? (a(), n("div", ec, [
            l[13] || (l[13] = e("strong", null, "Warning:", -1)),
            G(" " + u((g = ve.value[0]) == null ? void 0 : g.message) + " ", 1),
            ve.value.length > 1 ? (a(), n("span", tc, " (+" + u(ve.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", ac, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: l[2] || (l[2] = (v) => oe("duplicate", JSON.parse(JSON.stringify(S(N)))))
            }, " Duplicate ")) : h("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: ce
            }, " Save ")) : h("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: l[3] || (l[3] = (v) => oe("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        J.value ? (a(), n("div", nc, [
          e("div", sc, [
            l[14] || (l[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[15] || (l[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", lc, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: l[4] || (l[4] = (v) => {
                  J.value = !1, Se.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: l[5] || (l[5] = (v) => Se.value && Ue(Se.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Jt = /* @__PURE__ */ Ne(oc, [["__scopeId", "data-v-79c11b0a"]]), ic = { class: "kb-section" }, rc = { class: "kb-section__head" }, uc = { class: "kb-field" }, dc = ["value"], cc = { class: "kb-field" }, pc = { class: "kb-label" }, mc = { key: 0 }, vc = { key: 1 }, bc = { key: 2 }, hc = { class: "kb-field-with-var" }, yc = ["value"], gc = { class: "kb-var-picker-wrap" }, fc = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, kc = ["onClick"], _c = {
  key: 0,
  class: "kb-truncation-hint"
}, $c = { class: "kb-field" }, wc = { class: "kb-insert-row" }, xc = ["value"], Cc = { class: "kb-field" }, Sc = { class: "kb-insert-row" }, Ic = /* @__PURE__ */ Oe({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: d }) {
    const c = o, b = d, f = [
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
    ], T = be(c.variableOptions && c.variableOptions.length ? [...c.variableOptions] : f), x = be(T.value[0] ?? f[0]), C = be("");
    Ve(
      () => c.variableOptions,
      (Q) => {
        Q && Q.length && (T.value = [...Q], T.value.includes(x.value) || (x.value = T.value[0]));
      }
    );
    const U = w(() => c.message.body ?? ""), H = be(null), Y = w(() => U.value.length), se = w(() => Y.value ? Y.value <= 160 ? 1 : Math.ceil(Y.value / 153) : 0), oe = w(() => {
      const Q = Y.value;
      return Q <= 160 ? null : Q <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function ge(Q) {
      const ne = Q.target.value;
      b("update", {
        sender_id: ne || void 0
      });
    }
    function N(Q) {
      const ne = Q.target.value;
      b("update", {
        body: ne
      });
    }
    function ie() {
      const Q = x.value;
      if (!Q) return;
      const ne = ` {{ .${Q} }}`, Z = U.value || "", ke = c.message.variables ?? [], Ie = Array.from(/* @__PURE__ */ new Set([...ke, Q]));
      b("update", {
        body: Z + ne,
        variables: Ie
      });
    }
    function F(Q) {
      H.value = H.value === Q ? null : Q;
    }
    function fe(Q, ne) {
      const Z = ` {{ .${ne} }}`, ke = U.value || "", Ie = c.message.variables ?? [], te = Array.from(/* @__PURE__ */ new Set([...Ie, ne]));
      b("update", {
        body: ke + Z,
        variables: te
      }), H.value = null;
    }
    function j() {
      const Q = C.value.trim();
      Q && (T.value.includes(Q) || (T.value = [...T.value, Q]), x.value = Q, C.value = "");
    }
    return (Q, ne) => (a(), n("section", ic, [
      e("div", rc, [
        ne[4] || (ne[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        o.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: ne[0] || (ne[0] = (Z) => Q.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      ne[11] || (ne[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", uc, [
        ne[5] || (ne[5] = e("label", { class: "kb-label" }, [
          G(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: c.message.sender_id ?? "",
          onInput: ge
        }, null, 40, dc)
      ]),
      e("div", cc, [
        e("label", pc, [
          ne[6] || (ne[6] = G(" Message body ", -1)),
          e("span", {
            class: xe(["kb-counter", { "kb-counter--warn": se.value > 3 }])
          }, [
            G(u(Y.value) + " chars · ", 1),
            se.value === 0 ? (a(), n("span", mc, "0 segments")) : se.value === 1 ? (a(), n("span", vc, "1 segment")) : (a(), n("span", bc, u(se.value) + " segments", 1))
          ], 2)
        ]),
        e("div", hc, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: U.value,
            onInput: N
          }, null, 40, yc),
          e("div", gc, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: ne[1] || (ne[1] = (Z) => F("body"))
            }, "{{ .var }}"),
            H.value === "body" ? (a(), n("div", fc, [
              (a(!0), n(L, null, W(T.value, (Z) => (a(), n("button", {
                key: `sms-body-var-${Z}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (ke) => fe("body", Z)
              }, u(Z), 9, kc))), 128))
            ])) : h("", !0)
          ])
        ]),
        ne[7] || (ne[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        oe.value ? (a(), n("p", _c, u(oe.value), 1)) : h("", !0)
      ]),
      e("div", $c, [
        ne[8] || (ne[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", wc, [
          je(e("select", {
            "onUpdate:modelValue": ne[2] || (ne[2] = (Z) => x.value = Z),
            class: "kb-select"
          }, [
            (a(!0), n(L, null, W(T.value, (Z) => (a(), n("option", {
              key: Z,
              value: Z
            }, u(Z), 9, xc))), 128))
          ], 512), [
            [Ye, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ie
          }, " Insert into message ")
        ]),
        ne[9] || (ne[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Cc, [
        ne[10] || (ne[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Sc, [
          je(e("input", {
            "onUpdate:modelValue": ne[3] || (ne[3] = (Z) => C.value = Z),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [it, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: j
          }, " Add ")
        ])
      ])
    ]));
  }
}), Tc = /* @__PURE__ */ Ne(Ic, [["__scopeId", "data-v-68a73354"]]), Ac = { class: "keos-sms-builder" }, Rc = { class: "kb-builder-top" }, Uc = { class: "kb-sms-layout" }, Pc = { class: "kb-sms-sidebar" }, Lc = {
  key: 0,
  class: "kb-sms-form"
}, Ec = { class: "kb-sms-form-head" }, Bc = { class: "kb-sms-form-head-top" }, Oc = { class: "kb-sms-health-pill" }, Nc = { class: "kb-wa-form-head-row" }, Vc = ["value"], Mc = { class: "kb-sms-health" }, Dc = { class: "kb-sms-health-row" }, Wc = { class: "kb-sms-health-value" }, jc = { class: "kb-sms-health-bar" }, Hc = { class: "kb-sms-canvas" }, qc = {
  key: 0,
  class: "kb-sms-test-banner"
}, Fc = { class: "kb-sms-preview-chrome" }, zc = { class: "kb-push-preview-controls" }, Yc = { class: "kb-push-preview-as" }, Kc = ["value"], Gc = { class: "kb-preview-status" }, Jc = { class: "kb-preview" }, Qc = { class: "kb-sms-preview" }, Xc = { class: "kb-sms-phone" }, Zc = { class: "kb-sms-header" }, ep = { class: "kb-sms-sender-avatar" }, tp = { class: "kb-sms-header-copy" }, ap = { class: "kb-sms-sender" }, np = { class: "kb-sms-meta" }, sp = { class: "kb-sms-thread" }, lp = {
  key: 0,
  class: "kb-sms-empty"
}, op = { class: "kb-sms-text" }, ip = { class: "kb-sms-bubble-meta" }, rp = {
  key: 0,
  class: "kb-sms-segment-chip"
}, up = {
  key: 0,
  class: "kb-sms-more-segments"
}, dp = { class: "kb-sms-delivery-line" }, cp = { class: "kb-sms-counter" }, pp = { key: 0 }, mp = { key: 1 }, vp = { key: 2 }, bp = {
  key: 3,
  class: "kb-sms-cost"
}, hp = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, yp = { class: "kb-sms-actions" }, gp = {
  key: 0,
  class: "kb-actions-note"
}, fp = { key: 0 }, kp = { class: "kb-sms-actions-right" }, _p = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, $p = { class: "kb-confirm-dialog" }, wp = { class: "kb-confirm-actions" }, xp = /* @__PURE__ */ Oe({
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
    const c = o, b = d, {
      campaign: f,
      dirty: T,
      customValidatorErrors: x,
      getValidationWithWarnings: C,
      update: U,
      updateMessage: H,
      undo: Y,
      redo: se,
      canUndo: oe,
      canRedo: ge,
      resetMessage: N,
      hooks: ie
    } = ut({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (ce) => {
          var g, v;
          const s = [];
          (g = ce.name) != null && g.trim() || s.push("Template name is required");
          const l = (v = c.hooks) != null && v.customValidators ? await c.hooks.customValidators(ce) : [];
          return [...s, ...l];
        }
      },
      onDirty: () => b("change", f.value)
    }), { lastSavedAt: F } = dt(f, { channel: "sms" });
    function fe(ce) {
      (ce.metaKey || ce.ctrlKey) && ce.key === "z" && (ce.preventDefault(), ce.shiftKey ? se() : Y());
    }
    st(() => {
      window.addEventListener("keydown", fe);
    }), lt(() => {
      window.removeEventListener("keydown", fe);
    }), Ve(f, (ce) => b("update:modelValue", ce), { deep: !0 });
    const j = be(), Q = be(!0);
    async function ne() {
      if (ie.estimateReach)
        try {
          j.value = await ie.estimateReach(f.value.audience);
        } catch {
          j.value = void 0;
        }
      ie.canSend && (Q.value = await Promise.resolve(ie.canSend()));
    }
    ne(), Ve(() => f.value.audience, ne, { deep: !0 });
    const Z = w(() => (x.value, C(j.value))), ke = w(() => Z.value.blockingErrors), Ie = w(() => Z.value.warnings), te = w(() => Z.value.valid), y = w(() => {
      var g, v, M;
      const ce = f.value.message, s = [
        !!((g = f.value.name) != null && g.trim()),
        !!((v = ce.body) != null && v.trim()),
        !!((M = ce.sender_id) != null && M.trim()),
        !!f.value.template_type,
        (ce.body ?? "").length > 20
      ], l = s.filter(Boolean).length;
      return Math.round(l / s.length * 100);
    }), _ = w(() => y.value >= 90 ? "Production ready" : y.value >= 70 ? "Strong draft" : y.value >= 40 ? "In progress" : "Needs setup"), V = w(() => !!ae.value.trim()), ye = w(
      () => f.value.template_type ?? "transactional"
    ), re = be(""), R = be(!1), B = be(null), $ = w(() => {
      const ce = re.value;
      return ce ? Ze.find((s) => s.id === ce) ?? null : null;
    }), ve = w(() => {
      const ce = ae.value;
      return $.value ? Je(ce, $.value.data) : ce;
    });
    function $e(ce) {
      const s = f.value, l = ce.campaign.message ? { ...s.message, ...ce.campaign.message } : s.message;
      U({
        ...ce.campaign,
        message: l
      }), B.value = null, R.value = !1;
    }
    function _e(ce) {
      const s = ce.target.value;
      if (!s) return;
      const l = Rt.find((g) => g.id === s);
      l && (T.value ? (B.value = l, R.value = !0) : $e(l), ce.target.value = "");
    }
    function Ce(ce) {
      U({ template_type: ce });
    }
    function P(ce) {
      U({
        name: ce,
        tracking: { ...f.value.tracking ?? {}, campaign_name: ce }
      });
    }
    const ae = w(
      () => (f.value.message.body ?? "") || ""
    ), J = w(() => ae.value.length), Se = w(() => /[^\x00-\x7f]/.test(ae.value)), pe = w(() => Se.value ? 70 : 160), de = w(() => Se.value ? 67 : 153), E = w(() => J.value ? J.value <= pe.value ? 1 : Math.ceil(J.value / de.value) : 0), m = w(() => {
      const ce = ve.value.trim();
      if (!ce) return [];
      const s = E.value <= 1 ? pe.value : de.value, l = [];
      for (let g = 0; g < ce.length; g += s)
        l.push(ce.slice(g, g + s));
      return l;
    }), k = w(() => m.value.slice(0, 3)), K = w(
      () => Math.max(0, m.value.length - k.value.length)
    ), ee = w(() => Se.value ? "Unicode" : "GSM-7"), Ue = w(() => V.value ? E.value > 3 ? "Queued" : "Delivered" : "Draft"), Ee = w(() => {
      const ce = c.costPerSegment ?? 0;
      return !ce || E.value === 0 ? null : (E.value * ce).toFixed(2);
    }), He = w(() => {
      const ce = J.value, s = pe.value + de.value;
      return ce <= pe.value ? null : ce <= s ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), qe = w(
      () => f.value.message.sender_id ?? "YourBrand"
    );
    function We() {
      te.value && b("save", f.value);
    }
    return (ce, s) => {
      var l;
      return a(), n("div", Ac, [
        e("div", Rc, [
          Me(ct, {
            "campaign-name": S(f).name,
            status: S(f).status,
            dirty: S(T),
            "last-saved-at": S(F),
            "can-undo": S(oe),
            "can-redo": S(ge),
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": P,
            onUndo: S(Y),
            onRedo: S(se)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ke.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ae({
              background: S(Le).dangerBg,
              border: `1px solid ${S(Le).dangerBorder}`,
              borderRadius: `${S(Qe).input}px`,
              padding: `${S(Te)[12]}px ${S(Te)[16]}px`,
              marginBottom: `${S(Te)[16]}px`
            })
          }, [
            e("ul", {
              style: Ae({ margin: 0, paddingLeft: "1.25rem", color: S(Le).danger })
            }, [
              (a(!0), n(L, null, W(ke.value, (g) => (a(), n("li", {
                key: g.message
              }, u(g.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", Uc, [
          e("aside", Pc, [
            o.disabledSections.includes("sms") ? h("", !0) : (a(), n("div", Lc, [
              e("div", Ec, [
                e("div", Bc, [
                  s[6] || (s[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", Oc, u(_.value), 1)
                ]),
                e("div", Nc, [
                  Me($t, {
                    "template-type": ye.value,
                    onUpdate: Ce
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: _e
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(L, null, W(S(Rt), (g) => (a(), n("option", {
                      key: g.id,
                      value: g.id
                    }, u(g.label), 9, Vc))), 128))
                  ], 32)
                ]),
                e("div", Mc, [
                  e("div", Dc, [
                    s[8] || (s[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", Wc, u(y.value) + "%", 1)
                  ]),
                  e("div", jc, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: Ae({ width: `${y.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(Tc, {
                message: S(f).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: S(H),
                onReset: s[0] || (s[0] = (g) => S(N)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Hc, [
            !o.designOnly && S(f).audience.test_mode ? (a(), n("div", qc, [...s[9] || (s[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", Fc, [
              e("div", zc, [
                e("label", Yc, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (g) => re.value = g),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(L, null, W(S(Ze), (g) => (a(), n("option", {
                      key: g.id,
                      value: g.id
                    }, u(g.label), 9, Kc))), 128))
                  ], 512), [
                    [Ye, re.value]
                  ])
                ]),
                e("div", Gc, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, u(E.value || 0), 1)
                ])
              ]),
              e("div", {
                class: xe(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !V.value }])
              }, [
                e("div", Jc, [
                  e("div", Qc, [
                    e("div", Xc, [
                      s[15] || (s[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Zc, [
                        e("div", ep, u(qe.value.slice(0, 1).toUpperCase()), 1),
                        e("div", tp, [
                          e("div", ap, u(qe.value), 1),
                          e("div", np, "Text message · " + u(Ue.value), 1)
                        ])
                      ]),
                      e("div", sp, [
                        V.value ? (a(), n(L, { key: 1 }, [
                          (a(!0), n(L, null, W(k.value, (g, v) => (a(), n("div", {
                            key: `${v}-${g.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", op, u(g), 1),
                            e("span", ip, [
                              s[13] || (s[13] = G(" 09:21 ", -1)),
                              k.value.length > 1 ? (a(), n("span", rp, "Part " + u(v + 1), 1)) : h("", !0)
                            ])
                          ]))), 128)),
                          K.value > 0 ? (a(), n("div", up, " +" + u(K.value) + " more segments ", 1)) : h("", !0),
                          e("div", dp, [
                            s[14] || (s[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            G(" " + u(Ue.value), 1)
                          ])
                        ], 64)) : (a(), n("div", lp, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", cp, [
                      G(u(J.value) + " characters · ", 1),
                      E.value === 0 ? (a(), n("span", pp, "0 segments")) : E.value === 1 ? (a(), n("span", mp, "1 segment")) : (a(), n("span", vp, u(E.value) + " segments", 1)),
                      G(" (" + u(pe.value) + " chars single, " + u(de.value) + " multi-part · " + u(ee.value) + ") ", 1),
                      Ee.value !== null ? (a(), n("span", bp, " · Est. " + u(Ee.value), 1)) : h("", !0)
                    ]),
                    He.value ? (a(), n("p", hp, u(He.value), 1)) : h("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", yp, [
          Ie.value.length > 0 ? (a(), n("div", gp, [
            s[16] || (s[16] = e("strong", null, "Warning:", -1)),
            G(" " + u((l = Ie.value[0]) == null ? void 0 : l.message) + " ", 1),
            Ie.value.length > 1 ? (a(), n("span", fp, " (+" + u(Ie.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", kp, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: s[2] || (s[2] = (g) => b("duplicate", JSON.parse(JSON.stringify(S(f)))))
            }, " Duplicate ")) : h("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: We
            }, " Save ")) : h("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: s[3] || (s[3] = (g) => b("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        R.value ? (a(), n("div", _p, [
          e("div", $p, [
            s[17] || (s[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[18] || (s[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", wp, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: s[4] || (s[4] = (g) => {
                  R.value = !1, B.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: s[5] || (s[5] = (g) => B.value && $e(B.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Qt = /* @__PURE__ */ Ne(xp, [["__scopeId", "data-v-5e442b56"]]), Cp = 30, Sp = 60, Ip = 130;
function Tp(o) {
  const d = (o ?? "").trim().length;
  return d < Cp ? "too_short" : d <= Sp ? "good" : "too_long";
}
function Ap(o) {
  const d = (o ?? "").trim().length;
  return d === 0 ? "too_short" : d <= Ip ? "good" : "too_long";
}
const Rp = [
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
  for (const c of Rp) {
    const b = o.match(c);
    b && d.push(b[0]);
  }
  return d;
}
function Up(o) {
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
function Pp(o) {
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
const Lp = { class: "em-section" }, Ep = { class: "em-strip kb-section" }, Bp = { class: "em-strip-head" }, Op = { class: "em-field kb-field" }, Np = { class: "em-input-group em-input-group--overlay" }, Vp = ["value"], Mp = { class: "em-var-picker-wrap" }, Dp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Wp = ["onClick"], jp = { class: "em-field kb-field" }, Hp = ["value"], qp = { class: "em-field kb-field" }, Fp = ["value"], zp = { class: "em-field kb-field" }, Yp = { class: "em-input-group em-input-group--overlay" }, Kp = ["value"], Gp = { class: "em-var-picker-wrap" }, Jp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Qp = ["onClick"], Xp = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Zp = ["onClick"], em = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, tm = { class: "em-field kb-field" }, am = { class: "em-input-group" }, nm = ["value"], sm = { class: "em-var-picker-wrap" }, lm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, om = ["onClick"], im = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, rm = ["onClick"], um = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, dm = { class: "em-strip kb-section em-strip--library" }, cm = { class: "em-library-chips" }, pm = ["onClick"], mm = { class: "em-strip kb-section em-strip--blocks" }, vm = { class: "em-block-list" }, bm = ["data-type"], hm = { class: "em-block-bar" }, ym = { class: "em-block-type" }, gm = { class: "em-block-actions" }, fm = ["disabled", "onClick"], km = ["disabled", "onClick"], _m = ["onClick"], $m = {
  key: 0,
  class: "em-block-fields"
}, wm = ["value", "onChange"], xm = ["value", "onInput"], Cm = { class: "em-var-picker-wrap" }, Sm = ["onClick"], Im = ["onClick"], Tm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Am = ["onClick"], Rm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Um = ["onClick"], Pm = {
  key: 1,
  class: "em-block-fields"
}, Lm = ["value", "onInput"], Em = { class: "em-var-picker-wrap" }, Bm = ["onClick"], Om = ["onClick"], Nm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Vm = ["onClick"], Mm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Dm = ["onClick"], Wm = {
  key: 2,
  class: "em-block-fields"
}, jm = ["value", "onInput"], Hm = ["value", "onInput"], qm = { class: "em-var-picker-wrap" }, Fm = ["onClick"], zm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ym = ["onClick"], Km = ["value", "onInput"], Gm = {
  key: 3,
  class: "em-block-fields"
}, Jm = ["value", "onInput"], Qm = { class: "em-var-picker-wrap" }, Xm = ["onClick"], Zm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ev = ["onClick"], tv = ["value", "onInput"], av = { class: "em-block-fields--row" }, nv = ["value", "onInput"], sv = { class: "em-check-row" }, lv = ["checked", "onChange"], ov = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, iv = ["value", "onInput"], rv = {
  key: 5,
  class: "em-block-fields"
}, uv = ["value", "onInput"], dv = ["value", "onInput"], cv = ["value", "onInput"], pv = { class: "em-var-picker-wrap" }, mv = ["onClick"], vv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, bv = ["onClick"], hv = { class: "em-var-picker-wrap" }, yv = ["onClick"], gv = ["onClick"], fv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, kv = ["onClick"], _v = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, $v = ["onClick"], wv = {
  key: 6,
  class: "em-block-fields"
}, xv = ["value", "onChange"], Cv = { class: "em-list-items" }, Sv = ["value", "onInput", "placeholder"], Iv = { class: "em-var-picker-wrap" }, Tv = ["onClick"], Av = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Rv = ["onClick"], Uv = ["onClick"], Pv = ["onClick"], Lv = {
  key: 7,
  class: "em-block-fields"
}, Ev = ["value", "onChange"], Bv = ["value", "onInput"], Ov = { class: "em-var-picker-wrap" }, Nv = ["onClick"], Vv = ["onClick"], Mv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Dv = ["onClick"], Wv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, jv = ["onClick"], Hv = {
  key: 8,
  class: "em-block-fields"
}, qv = { class: "em-social-links" }, Fv = ["value", "onChange"], zv = ["value", "onInput"], Yv = ["onClick"], Kv = ["onClick"], Gv = {
  key: 9,
  class: "em-block-fields"
}, Jv = ["value", "onInput"], Qv = ["value", "onInput"], Xv = ["value", "onInput"], Zv = { class: "em-var-picker-wrap" }, eb = ["onClick"], tb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ab = ["onClick"], nb = {
  key: 10,
  class: "em-block-fields"
}, sb = ["value", "onInput"], lb = { class: "em-link-list-items" }, ob = ["value", "onInput"], ib = { class: "em-var-picker-wrap" }, rb = ["onClick"], ub = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, db = ["onClick"], cb = ["value", "onInput"], pb = ["onClick"], mb = ["onClick"], vb = {
  key: 11,
  class: "em-block-fields"
}, bb = ["value", "onInput"], hb = { class: "em-var-picker-wrap" }, yb = ["onClick"], gb = ["onClick"], fb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, kb = ["onClick"], _b = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, $b = ["onClick"], wb = ["value", "onInput"], xb = { class: "em-var-picker-wrap" }, Cb = ["onClick"], Sb = ["onClick"], Ib = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Tb = ["onClick"], Ab = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Rb = ["onClick"], Ub = {
  key: 12,
  class: "em-block-fields"
}, Pb = { class: "em-block-fields--row" }, Lb = ["value", "onInput"], Eb = { class: "em-block-fields--row" }, Bb = ["value", "onInput"], Ob = ["value", "onChange"], Nb = {
  key: 13,
  class: "em-block-fields"
}, Vb = ["value", "onChange"], Mb = { class: "em-inline-label" }, Db = ["value", "onInput"], Wb = { class: "em-var-picker-wrap" }, jb = ["onClick"], Hb = ["onClick"], qb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Fb = ["onClick"], zb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Yb = ["onClick"], Kb = {
  key: 14,
  class: "em-block-fields"
}, Gb = ["value", "onInput"], Jb = { class: "em-link-list-items" }, Qb = ["value", "onInput"], Xb = { class: "em-var-picker-wrap" }, Zb = ["onClick"], eh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, th = ["onClick"], ah = ["value", "onInput"], nh = ["onClick"], sh = ["onClick"], lh = {
  key: 15,
  class: "em-block-fields"
}, oh = ["value", "onInput"], ih = { class: "em-var-picker-wrap" }, rh = ["onClick"], uh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, dh = ["onClick"], ch = ["value", "onInput"], ph = { class: "em-var-picker-wrap" }, mh = ["onClick"], vh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, bh = ["onClick"], hh = ["onClick"], yh = ["onClick"], gh = {
  key: 16,
  class: "em-block-fields"
}, fh = ["value", "onInput"], kh = ["value", "onInput"], _h = ["value", "onInput"], $h = ["onClick"], wh = ["onClick"], xh = {
  key: 17,
  class: "em-block-fields"
}, Ch = ["value", "onInput"], Sh = { class: "em-var-picker-wrap" }, Ih = ["onClick"], Th = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ah = ["onClick"], Rh = ["value", "onInput"], Uh = {
  key: 18,
  class: "em-block-fields"
}, Ph = ["value", "onInput"], Lh = ["value", "onInput"], Eh = { class: "em-var-picker-wrap" }, Bh = ["onClick"], Oh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Nh = ["onClick"], Vh = ["value", "onInput"], Mh = { class: "em-var-picker-wrap" }, Dh = ["onClick"], Wh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, jh = ["onClick"], Hh = ["value", "onInput"], qh = { class: "em-var-picker-wrap" }, Fh = ["onClick"], zh = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Yh = ["onClick"], Kh = ["value", "onInput"], Gh = {
  key: 19,
  class: "em-block-fields"
}, Jh = ["value", "onInput"], Qh = { class: "em-var-picker-wrap" }, Xh = ["onClick"], Zh = ["onClick"], ey = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ty = ["onClick"], ay = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, ny = ["onClick"], sy = {
  key: 20,
  class: "em-block-fields"
}, ly = ["value", "onInput"], oy = { class: "em-var-picker-wrap" }, iy = ["onClick"], ry = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, uy = ["onClick"], dy = ["value", "onInput"], cy = { class: "em-var-picker-wrap" }, py = ["onClick"], my = ["onClick"], vy = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, by = ["onClick"], hy = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, yy = ["onClick"], gy = {
  key: 21,
  class: "em-block-fields"
}, fy = ["value", "onInput"], ky = { class: "em-block-fields--row" }, _y = ["value", "onInput"], $y = {
  key: 22,
  class: "em-block-fields"
}, wy = ["value", "onInput"], xy = ["value", "onInput"], Cy = { class: "em-var-picker-wrap" }, Sy = ["onClick"], Iy = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ty = ["onClick"], Ay = ["value", "onInput"], Ry = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Uy = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, Py = ["onClick"], Ly = ["onClick"], Ey = ["onClick"], By = { class: "em-check-row" }, Oy = ["checked", "onChange"], Ny = { class: "em-add-bar kb-field kb-field--add-bar" }, Vy = { class: "em-add-bar-btns" }, My = { class: "em-strip kb-section em-strip--personalize" }, Dy = { class: "em-field kb-field" }, Wy = { class: "em-input-group" }, jy = ["value"], Hy = { class: "em-field kb-field" }, qy = { class: "em-input-group" }, Fe = "{{ .var }}", Fy = /* @__PURE__ */ Oe({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(o, { emit: d }) {
    var Be;
    function c() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const b = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], f = [
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
    function T(p) {
      switch (p) {
        case "heading":
          return { id: c(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: c(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: c(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: c(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: c(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: c(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: c(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: c(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: c(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: c(), type: "social", links: b.map((i) => ({ ...i })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: c(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: c(),
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
            id: c(),
            type: "columns",
            leftContent: "Left column text or {{ .variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: c(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: c(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: c(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: c(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: c(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: c(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: c(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: c(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ .order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: c(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: c(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: c(), type: "paragraph", content: "" };
      }
    }
    const x = o, C = d, U = [
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
    ], H = be(
      (Be = x.variableOptions) != null && Be.length ? [...x.variableOptions] : U
    ), Y = be(H.value[0] ?? "first_name"), se = be("");
    Ve(
      () => x.variableOptions,
      (p) => {
        p != null && p.length && (H.value = [...p], H.value.includes(Y.value) || (Y.value = H.value[0]));
      }
    );
    const oe = w(() => x.message.subject ?? ""), ge = w(() => x.message.preview_text ?? ""), N = w(() => Tp(oe.value)), ie = w(() => Ap(ge.value)), F = w(() => Vt(oe.value)), fe = w(() => Vt(ge.value)), j = w(() => {
      const p = x.message.blocks;
      return Array.isArray(p) && p.length > 0 ? p : [T("paragraph")];
    });
    Ve(
      () => x.message.blocks,
      (p) => {
        (!Array.isArray(p) || p.length === 0) && C("update", { blocks: [T("paragraph")] });
      },
      { immediate: !0 }
    );
    function Q(p) {
      C("update", { blocks: p });
    }
    function ne(p) {
      C("update", { subject: p.target.value });
    }
    function Z(p) {
      const i = p.target.value;
      C("update", { preview_text: i || void 0 });
    }
    function ke(p) {
      C("update", { from_name: p.target.value || void 0 });
    }
    function Ie(p) {
      C("update", { from_address: p.target.value || void 0 });
    }
    function te(p) {
      C("update", { reply_to: p.target.value || void 0 });
    }
    const y = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [T("heading"), T("paragraph"), T("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [T("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [T("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [T("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [T("social"), T("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [T("footer"), T("link_list")]
      }
    ];
    function _(p) {
      const i = p.blocks();
      Q([...j.value, ...i]);
    }
    function V(p) {
      const i = [...j.value, T(p)];
      Q(i);
    }
    function ye(p) {
      Q(j.value.filter((i) => i.id !== p));
    }
    function re(p, i) {
      const t = j.value.findIndex((I) => I.id === p);
      if (t < 0) return;
      const q = i === "up" ? t - 1 : t + 1;
      if (q < 0 || q >= j.value.length) return;
      const r = [...j.value];
      [r[t], r[q]] = [r[q], r[t]], Q(r);
    }
    function R(p, i) {
      const t = j.value.map((q) => q.id === p ? { ...q, ...i } : q);
      Q(t);
    }
    function B(p, i, t) {
      const q = j.value.find((I) => I.id === p);
      if (!q || q.type !== "list") return;
      const r = [...q.items || []];
      r[i] = t, R(p, { items: r });
    }
    function $(p) {
      const i = j.value.find((t) => t.id === p);
      !i || i.type !== "list" || R(p, { items: [...i.items || [], "New item"] });
    }
    function ve(p, i) {
      const t = j.value.find((r) => r.id === p);
      if (!t || t.type !== "list") return;
      const q = (t.items || []).filter((r, I) => I !== i);
      R(p, { items: q });
    }
    function $e(p, i, t, q) {
      const r = j.value.find((D) => D.id === p);
      if (!r || r.type !== "social") return;
      const I = (r.links || []).map((D, Pe) => Pe === i ? { ...D, [t]: q } : D);
      R(p, { links: I });
    }
    function _e(p) {
      const i = j.value.find((t) => t.id === p);
      !i || i.type !== "social" || R(p, { links: [...i.links || [], { platform: "custom", url: "" }] });
    }
    function Ce(p, i) {
      const t = j.value.find((r) => r.id === p);
      if (!t || t.type !== "social") return;
      const q = (t.links || []).filter((r, I) => I !== i);
      R(p, { links: q });
    }
    function P(p, i, t, q) {
      const r = j.value.find((D) => D.id === p);
      if (!r || r.type !== "link_list") return;
      const I = (r.links || []).map((D, Pe) => Pe === i ? { ...D, [t]: q } : D);
      R(p, { links: I });
    }
    function ae(p) {
      const i = j.value.find((t) => t.id === p);
      !i || i.type !== "link_list" || R(p, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function J(p, i) {
      const t = j.value.find((r) => r.id === p);
      if (!t || t.type !== "link_list") return;
      const q = (t.links || []).filter((r, I) => I !== i);
      R(p, { links: q });
    }
    function Se(p, i) {
      const t = j.value.find((q) => q.id === p);
      if (!(!t || t.type !== "row")) {
        if (i.columnCount !== void 0 && i.columnCount !== t.columnCount) {
          const q = [...t.cells || []];
          for (; q.length < i.columnCount; ) q.push("Cell content");
          i.cells = q.slice(0, i.columnCount);
        }
        R(p, i);
      }
    }
    function pe(p, i, t) {
      const q = j.value.find((I) => I.id === p);
      if (!q || q.type !== "row") return;
      const r = [...q.cells || []];
      r[i] = t, R(p, { cells: r });
    }
    function de(p, i, t, q) {
      const r = j.value.find((D) => D.id === p);
      if (!r || r.type !== "navbar") return;
      const I = (r.links || []).map((D, Pe) => Pe === i ? { ...D, [t]: q } : D);
      R(p, { links: I });
    }
    function E(p) {
      const i = j.value.find((t) => t.id === p);
      !i || i.type !== "navbar" || R(p, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function m(p, i) {
      const t = j.value.find((q) => q.id === p);
      !t || t.type !== "navbar" || R(p, { links: (t.links || []).filter((q, r) => r !== i) });
    }
    function k(p, i, t, q) {
      const r = j.value.find((D) => D.id === p);
      if (!r || r.type !== "accordion") return;
      const I = (r.items || []).map((D, Pe) => Pe === i ? { ...D, [t]: q } : D);
      R(p, { items: I });
    }
    function K(p) {
      const i = j.value.find((t) => t.id === p);
      !i || i.type !== "accordion" || R(p, { items: [...i.items || [], { title: "New section", content: "" }] });
    }
    function ee(p, i) {
      const t = j.value.find((q) => q.id === p);
      !t || t.type !== "accordion" || R(p, { items: (t.items || []).filter((q, r) => r !== i) });
    }
    function Ue(p, i, t, q) {
      const r = j.value.find((D) => D.id === p);
      if (!r || r.type !== "carousel") return;
      const I = (r.slides || []).map((D, Pe) => Pe === i ? { ...D, [t]: q } : D);
      R(p, { slides: I });
    }
    function Ee(p) {
      const i = j.value.find((t) => t.id === p);
      !i || i.type !== "carousel" || R(p, { slides: [...i.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function He(p, i) {
      const t = j.value.find((q) => q.id === p);
      !t || t.type !== "carousel" || R(p, { slides: (t.slides || []).filter((q, r) => r !== i) });
    }
    function qe(p, i = Y.value) {
      const t = ` {{ .${i} }}`, q = x.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...q, i]));
      p === "subject" ? C("update", {
        subject: (oe.value || "") + t,
        variables: r
      }) : C("update", {
        preview_text: (ge.value || "") + t,
        variables: r
      });
    }
    function We(p, i = Y.value) {
      const t = j.value.find((ze) => ze.id === p);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const q = ` {{ .${i} }}`, r = x.message.variables ?? [], I = Array.from(/* @__PURE__ */ new Set([...r, i])), D = (t.type === "footer", "content"), et = (t[D] ?? "") + q, tt = j.value.map(
        (ze) => ze.id === p ? { ...ze, [D]: et } : ze
      );
      C("update", { blocks: tt, variables: I });
    }
    function ce(p, i, t = Y.value) {
      const q = j.value.find((et) => et.id === p);
      if (!q || q.type !== "row") return;
      const r = ` {{ .${t} }}`, I = x.message.variables ?? [], D = Array.from(/* @__PURE__ */ new Set([...I, t])), Pe = [...q.cells || []];
      Pe[i] = (Pe[i] || "") + r, R(p, { cells: Pe }), C("update", { variables: D });
    }
    function s(p, i, t = Y.value) {
      const q = j.value.find((ze) => ze.id === p);
      if (!q || q.type !== "columns") return;
      const r = ` {{ .${t} }}`, I = x.message.variables ?? [], D = Array.from(/* @__PURE__ */ new Set([...I, t])), Pe = i === "left" ? "leftContent" : "rightContent", tt = (q[Pe] ?? "") + r;
      R(p, { [Pe]: tt }), C("update", { variables: D });
    }
    const l = be(null), g = be(null), v = [
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
    function M(p) {
      l.value = l.value === p ? null : p;
    }
    function A(p, i) {
      if (i) {
        if (p === "subject") qe("subject", i);
        else if (p === "preview") qe("preview", i);
        else if (p.startsWith("block:")) We(p.slice(6), i);
        else if (p.startsWith("col-left:")) s(p.slice(9), "left", i);
        else if (p.startsWith("col-right:")) s(p.slice(10), "right", i);
        else if (p.startsWith("row:")) {
          const [, t, q] = p.split(":");
          ce(t, Number(q), i);
        }
        l.value = null;
      }
    }
    function O(p) {
      g.value = g.value === p ? null : p;
    }
    function z(p, i) {
      return `${String(p ?? "")}${i}`;
    }
    function me(p, i) {
      var q, r;
      if (!i) return;
      const t = j.value.find((I) => I.id === p);
      if (t) {
        switch (t.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            R(p, { content: `${String(t.content ?? "")}${i}` });
            break;
          case "button":
            R(p, { text: `${String(t.text ?? "")}${i}` });
            break;
          case "image":
            R(p, { alt: `${String(t.alt ?? "")}${i}` });
            break;
          case "video":
            R(p, { caption: `${String(t.caption ?? "")}${i}` });
            break;
          case "columns":
            R(p, { leftContent: `${String(t.leftContent ?? "")}${i}` });
            break;
          case "row": {
            const I = (Array.isArray(t.cells) ? [...t.cells] : []).map((D) => String(D ?? ""));
            I.length === 0 && I.push(""), I[0] = `${String(I[0] ?? "")}${i}`, R(p, { cells: I });
            break;
          }
          case "navbar":
          case "link_list": {
            const I = Array.isArray(t.links) ? [...t.links] : [];
            I.length || I.push({ text: "", url: "" }), I[0] = { ...I[0], text: `${String(((q = I[0]) == null ? void 0 : q.text) ?? "")}${i}` }, R(p, { links: I });
            break;
          }
          case "accordion": {
            const I = Array.isArray(t.items) ? [...t.items] : [];
            I.length || I.push({ title: "", content: "" }), I[0] = { ...I[0], title: `${String(((r = I[0]) == null ? void 0 : r.title) ?? "")}${i}` }, R(p, { items: I });
            break;
          }
          case "countdown":
            R(p, { label: `${String(t.label ?? "")}${i}` });
            break;
          case "product_card":
            R(p, { title: `${String(t.title ?? "")}${i}` });
            break;
          case "dynamic_image":
            R(p, { alt: `${String(t.alt ?? "")}${i}` });
            break;
        }
        g.value = null;
      }
    }
    function le(p, i) {
      var t, q, r, I, D, Pe, et, tt, ze;
      if (i) {
        if (p === "subject")
          C("update", { subject: z(oe.value, i) });
        else if (p === "preview")
          C("update", { preview_text: z(ge.value, i) });
        else if (p === "from-name")
          C("update", { from_name: z(x.message.from_name, i) });
        else if (p.startsWith("block:")) {
          me(p.slice(6), i);
          return;
        } else if (p.startsWith("col-left:")) {
          const ue = p.slice(9), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "columns" && R(ue, { leftContent: z(X.leftContent, i) });
        } else if (p.startsWith("col-right:")) {
          const ue = p.slice(10), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "columns" && R(ue, { rightContent: z(X.rightContent, i) });
        } else if (p.startsWith("row:")) {
          const [, ue, X] = p.split(":"), he = Number(X), Re = j.value.find((De) => De.id === ue);
          if ((Re == null ? void 0 : Re.type) === "row" && Number.isFinite(he)) {
            const De = [...Re.cells || []].map((Zt) => String(Zt ?? ""));
            De[he] = z(De[he], i), R(ue, { cells: De });
          }
        } else if (p.startsWith("button-text:")) {
          const ue = p.slice(12), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "button" && R(ue, { text: z(X.text, i) });
        } else if (p.startsWith("image-alt:")) {
          const ue = p.slice(10), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "image" && R(ue, { alt: z(X.alt, i) });
        } else if (p.startsWith("video-caption:")) {
          const ue = p.slice(14), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "video" && R(ue, { caption: z(X.caption, i) });
        } else if (p.startsWith("dynamic-alt:")) {
          const ue = p.slice(12), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "dynamic_image" && R(ue, { alt: z(X.alt, i) });
        } else if (p.startsWith("countdown-label:")) {
          const ue = p.slice(16), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "countdown" && R(ue, { label: z(X.label, i) });
        } else if (p.startsWith("product-title:")) {
          const ue = p.slice(14), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "product_card" && R(ue, { title: z(X.title, i) });
        } else if (p.startsWith("product-price:")) {
          const ue = p.slice(14), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "product_card" && R(ue, { price: z(X.price, i) });
        } else if (p.startsWith("product-button:")) {
          const ue = p.slice(15), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "product_card" && R(ue, { buttonText: z(X.buttonText, i) });
        } else if (p.startsWith("footer-address:")) {
          const ue = p.slice(15), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "footer" && R(ue, { companyAddress: z(X.companyAddress, i) });
        } else if (p.startsWith("code-caption:")) {
          const ue = p.slice(13), X = j.value.find((he) => he.id === ue);
          (X == null ? void 0 : X.type) === "code_block" && R(ue, { caption: z(X.caption, i) });
        } else if (p.startsWith("list-item:")) {
          const [, ue, X] = p.split(":"), he = Number(X), Re = j.value.find((De) => De.id === ue);
          (Re == null ? void 0 : Re.type) === "list" && Number.isFinite(he) && B(ue, he, z((t = Re.items) == null ? void 0 : t[he], i));
        } else if (p.startsWith("link-list-item:")) {
          const [, ue, X] = p.split(":"), he = Number(X), Re = j.value.find((De) => De.id === ue);
          (Re == null ? void 0 : Re.type) === "link_list" && Number.isFinite(he) && P(ue, he, "text", z((r = (q = Re.links) == null ? void 0 : q[he]) == null ? void 0 : r.text, i));
        } else if (p.startsWith("navbar-item:")) {
          const [, ue, X] = p.split(":"), he = Number(X), Re = j.value.find((De) => De.id === ue);
          (Re == null ? void 0 : Re.type) === "navbar" && Number.isFinite(he) && de(ue, he, "text", z((D = (I = Re.links) == null ? void 0 : I[he]) == null ? void 0 : D.text, i));
        } else if (p.startsWith("accordion-title:")) {
          const [, ue, X] = p.split(":"), he = Number(X), Re = j.value.find((De) => De.id === ue);
          (Re == null ? void 0 : Re.type) === "accordion" && Number.isFinite(he) && k(ue, he, "title", z((et = (Pe = Re.items) == null ? void 0 : Pe[he]) == null ? void 0 : et.title, i));
        } else if (p.startsWith("accordion-content:")) {
          const [, ue, X] = p.split(":"), he = Number(X), Re = j.value.find((De) => De.id === ue);
          (Re == null ? void 0 : Re.type) === "accordion" && Number.isFinite(he) && k(ue, he, "content", z((ze = (tt = Re.items) == null ? void 0 : tt[he]) == null ? void 0 : ze.content, i));
        }
        g.value = null;
      }
    }
    function we() {
      const p = se.value.trim();
      !p || H.value.includes(p) || (H.value = [...H.value, p], Y.value = p, se.value = "");
    }
    return (p, i) => (a(), n("section", Lp, [
      e("div", Ep, [
        e("div", Bp, [
          i[31] || (i[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          o.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: i[0] || (i[0] = (t) => p.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        i[38] || (i[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Op, [
          i[32] || (i[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", Np, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: o.message.from_name ?? "",
              onInput: ke
            }, null, 40, Vp),
            e("div", Mp, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[1] || (i[1] = (t) => O("from-name")),
                title: "Insert emoji"
              }, "😊"),
              g.value === "from-name" ? (a(), n("div", Dp, [
                (a(), n(L, null, W(v, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (q) => le("from-name", t)
                }, u(t), 9, Wp)), 64))
              ])) : h("", !0)
            ])
          ])
        ]),
        e("div", jp, [
          i[33] || (i[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: o.message.from_address ?? "",
            onInput: Ie
          }, null, 40, Hp)
        ]),
        e("div", qp, [
          i[34] || (i[34] = e("label", { class: "em-label" }, [
            G("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: o.message.reply_to ?? "",
            onInput: te
          }, null, 40, Fp)
        ]),
        e("div", zp, [
          i[35] || (i[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Yp, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: oe.value,
              onInput: ne
            }, null, 40, Kp),
            e("div", Gp, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[2] || (i[2] = (t) => M("subject")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[3] || (i[3] = (t) => O("subject")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "subject" ? (a(), n("div", Jp, [
                (a(!0), n(L, null, W(H.value, (t) => (a(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (q) => A("subject", t)
                }, u(t), 9, Qp))), 128))
              ])) : h("", !0),
              g.value === "subject" ? (a(), n("div", Xp, [
                (a(), n(L, null, W(v, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (q) => le("subject", t)
                }, u(t), 9, Zp)), 64))
              ])) : h("", !0)
            ])
          ]),
          e("span", {
            class: xe(["em-analyzer", `em-analyzer--${N.value}`])
          }, u(S(Up)(N.value)), 3),
          F.value.length ? (a(), n("span", em, "Spammy: " + u(F.value.join(", ")), 1)) : h("", !0)
        ]),
        e("div", tm, [
          i[36] || (i[36] = e("label", { class: "em-label" }, [
            G("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", am, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: ge.value,
              onInput: Z
            }, null, 40, nm),
            e("div", sm, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[4] || (i[4] = (t) => M("preview")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[5] || (i[5] = (t) => O("preview")),
                title: "Insert emoji"
              }, "😊"),
              l.value === "preview" ? (a(), n("div", lm, [
                (a(!0), n(L, null, W(H.value, (t) => (a(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (q) => A("preview", t)
                }, u(t), 9, om))), 128))
              ])) : h("", !0),
              g.value === "preview" ? (a(), n("div", im, [
                (a(), n(L, null, W(v, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (q) => le("preview", t)
                }, u(t), 9, rm)), 64))
              ])) : h("", !0)
            ])
          ]),
          i[37] || (i[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: xe(["em-analyzer", `em-analyzer--${ie.value}`])
          }, u(S(Pp)(ie.value)), 3),
          fe.value.length ? (a(), n("span", um, "Spammy: " + u(fe.value.join(", ")), 1)) : h("", !0)
        ])
      ]),
      e("div", dm, [
        i[39] || (i[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        i[40] || (i[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", cm, [
          (a(), n(L, null, W(y, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (q) => _(t)
          }, u(t.label), 9, pm)), 64))
        ])
      ]),
      e("div", mm, [
        i[67] || (i[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        i[68] || (i[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", vm, [
          (a(!0), n(L, null, W(j.value, (t, q) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", hm, [
              e("span", ym, u(t.type), 1),
              e("div", gm, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: q === 0,
                  onClick: (r) => re(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, fm),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: q === j.value.length - 1,
                  onClick: (r) => re(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, km),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => ye(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, _m)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", $m, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { level: Number(r.target.value) })
              }, [...i[41] || (i[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, wm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, xm),
              e("div", Cm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`block:${t.id}`)
                }, u(Fe), 8, Sm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Im),
                l.value === `block:${t.id}` ? (a(), n("div", Tm, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `block-var-heading-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`block:${t.id}`, r)
                  }, u(r), 9, Am))), 128))
                ])) : h("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Rm, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-heading-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`block:${t.id}`, r)
                  }, u(r), 9, Um)), 64))
                ])) : h("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), n("div", Pm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Lm),
              e("div", Em, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`block:${t.id}`)
                }, u(Fe), 8, Bm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Om),
                l.value === `block:${t.id}` ? (a(), n("div", Nm, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `block-var-paragraph-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`block:${t.id}`, r)
                  }, u(r), 9, Vm))), 128))
                ])) : h("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Mm, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-paragraph-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`block:${t.id}`, r)
                  }, u(r), 9, Dm)), 64))
                ])) : h("", !0)
              ])
            ])) : t.type === "image" ? (a(), n("div", Wm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (r) => R(t.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, jm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => R(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, Hm),
              e("div", qm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Fm),
                g.value === `image-alt:${t.id}` ? (a(), n("div", zm, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-image-alt-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`image-alt:${t.id}`, r)
                  }, u(r), 9, Ym)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (r) => R(t.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Km)
            ])) : t.type === "button" ? (a(), n("div", Gm, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (r) => R(t.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Jm),
              e("div", Qm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Xm),
                g.value === `button-text:${t.id}` ? (a(), n("div", Zm, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-button-text-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`button-text:${t.id}`, r)
                  }, u(r), 9, ev)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (r) => R(t.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, tv),
              e("div", av, [
                i[42] || (i[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (r) => R(t.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, nv)
              ]),
              e("label", sv, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (r) => R(t.id, { ghost: r.target.checked })
                }, null, 40, lv),
                i[43] || (i[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", ov, [
              i[44] || (i[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (r) => R(t.id, { height: Number(r.target.value) || 24 })
              }, null, 40, iv),
              i[45] || (i[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", rv, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, uv),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (r) => R(t.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, dv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (r) => R(t.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, cv),
              e("div", pv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, mv),
                g.value === `footer-address:${t.id}` ? (a(), n("div", vv, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-footer-address-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`footer-address:${t.id}`, r)
                  }, u(r), 9, bv)), 64))
                ])) : h("", !0)
              ]),
              e("div", hv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`block:${t.id}`)
                }, u(Fe), 8, yv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, gv),
                l.value === `block:${t.id}` ? (a(), n("div", fv, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `block-var-footer-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`block:${t.id}`, r)
                  }, u(r), 9, kv))), 128))
                ])) : h("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", _v, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-footer-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`block:${t.id}`, r)
                  }, u(r), 9, $v)), 64))
                ])) : h("", !0)
              ])
            ])) : t.type === "list" ? (a(), n("div", wv, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { style: r.target.value })
              }, [...i[46] || (i[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, xv),
              e("div", Cv, [
                (a(!0), n(L, null, W(t.items || [], (r, I) => (a(), n("div", {
                  key: I,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (D) => B(t.id, I, D.target.value),
                    placeholder: `Item ${I + 1}`
                  }, null, 40, Sv),
                  e("div", Iv, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (D) => O(`list-item:${t.id}:${I}`),
                      title: "Insert emoji"
                    }, "😊", 8, Tv),
                    g.value === `list-item:${t.id}:${I}` ? (a(), n("div", Av, [
                      (a(), n(L, null, W(v, (D) => e("button", {
                        key: `emoji-list-item-${t.id}-${I}-${D}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Pe) => le(`list-item:${t.id}:${I}`, D)
                      }, u(D), 9, Rv)), 64))
                    ])) : h("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => ve(t.id, I),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Uv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => $(t.id)
              }, "+ Add item", 8, Pv)
            ])) : t.type === "quote" ? (a(), n("div", Lv, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { style: r.target.value })
              }, [...i[47] || (i[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Ev),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Bv),
              e("div", Ov, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`block:${t.id}`)
                }, u(Fe), 8, Nv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Vv),
                l.value === `block:${t.id}` ? (a(), n("div", Mv, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `block-var-quote-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`block:${t.id}`, r)
                  }, u(r), 9, Dv))), 128))
                ])) : h("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", Wv, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-quote-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`block:${t.id}`, r)
                  }, u(r), 9, jv)), 64))
                ])) : h("", !0)
              ])
            ])) : t.type === "social" ? (a(), n("div", Hv, [
              e("div", qv, [
                (a(!0), n(L, null, W(t.links || [], (r, I) => (a(), n("div", {
                  key: I,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (D) => $e(t.id, I, "platform", D.target.value)
                  }, [...i[48] || (i[48] = [
                    Ge('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, Fv),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (D) => $e(t.id, I, "url", D.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, zv),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => Ce(t.id, I),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Yv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => _e(t.id)
              }, "+ Add link", 8, Kv)
            ])) : t.type === "video" ? (a(), n("div", Gv, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (r) => R(t.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Jv),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (r) => R(t.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Qv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => R(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Xv),
              e("div", Zv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, eb),
                g.value === `video-caption:${t.id}` ? (a(), n("div", tb, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-video-caption-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`video-caption:${t.id}`, r)
                  }, u(r), 9, ab)), 64))
                ])) : h("", !0)
              ])
            ])) : t.type === "link_list" ? (a(), n("div", nb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => R(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, sb),
              e("div", lb, [
                (a(!0), n(L, null, W(t.links || [], (r, I) => (a(), n("div", {
                  key: I,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (D) => P(t.id, I, "text", D.target.value),
                    placeholder: "Label"
                  }, null, 40, ob),
                  e("div", ib, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (D) => O(`link-list-item:${t.id}:${I}`),
                      title: "Insert emoji"
                    }, "😊", 8, rb),
                    g.value === `link-list-item:${t.id}:${I}` ? (a(), n("div", ub, [
                      (a(), n(L, null, W(v, (D) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${I}-${D}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Pe) => le(`link-list-item:${t.id}:${I}`, D)
                      }, u(D), 9, db)), 64))
                    ])) : h("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (D) => P(t.id, I, "url", D.target.value),
                    placeholder: "URL"
                  }, null, 40, cb),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => J(t.id, I),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, pb)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ae(t.id)
              }, "+ Add link", 8, mb)
            ])) : t.type === "columns" ? (a(), n("div", vb, [
              i[49] || (i[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (r) => R(t.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, bb),
              e("div", hb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`col-left:${t.id}`)
                }, u(Fe), 8, yb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, gb),
                l.value === `col-left:${t.id}` ? (a(), n("div", fb, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `col-left-var-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`col-left:${t.id}`, r)
                  }, u(r), 9, kb))), 128))
                ])) : h("", !0),
                g.value === `emoji:col-left:${t.id}` ? (a(), n("div", _b, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-col-left-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`col-left:${t.id}`, r)
                  }, u(r), 9, $b)), 64))
                ])) : h("", !0)
              ]),
              i[50] || (i[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (r) => R(t.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, wb),
              e("div", xb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`col-right:${t.id}`)
                }, u(Fe), 8, Cb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Sb),
                l.value === `col-right:${t.id}` ? (a(), n("div", Ib, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `col-right-var-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`col-right:${t.id}`, r)
                  }, u(r), 9, Tb))), 128))
                ])) : h("", !0),
                g.value === `emoji:col-right:${t.id}` ? (a(), n("div", Ab, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-col-right-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`col-right:${t.id}`, r)
                  }, u(r), 9, Rb)), 64))
                ])) : h("", !0)
              ])
            ])) : t.type === "divider" ? (a(), n("div", Ub, [
              e("div", Pb, [
                i[51] || (i[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (r) => R(t.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, Lb),
                i[52] || (i[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Eb, [
                i[53] || (i[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (r) => R(t.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Bb)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { lineStyle: r.target.value })
              }, [...i[54] || (i[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Ob)
            ])) : t.type === "row" ? (a(), n("div", Nb, [
              i[56] || (i[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => Se(t.id, { columnCount: Number(r.target.value) })
              }, [...i[55] || (i[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Vb),
              (a(!0), n(L, null, W(t.cells || [], (r, I) => (a(), n("div", {
                key: I,
                class: "em-row-cell"
              }, [
                e("label", Mb, "Column " + u(I + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (D) => pe(t.id, I, D.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Db),
                e("div", Wb, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (D) => M(`row:${t.id}:${I}`)
                  }, u(Fe), 8, jb),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (D) => O(`emoji:row:${t.id}:${I}`),
                    title: "Insert emoji"
                  }, "😊", 8, Hb),
                  l.value === `row:${t.id}:${I}` ? (a(), n("div", qb, [
                    (a(!0), n(L, null, W(H.value, (D) => (a(), n("button", {
                      key: `row-var-${t.id}-${I}-${D}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (Pe) => A(`row:${t.id}:${I}`, D)
                    }, u(D), 9, Fb))), 128))
                  ])) : h("", !0),
                  g.value === `emoji:row:${t.id}:${I}` ? (a(), n("div", zb, [
                    (a(), n(L, null, W(v, (D) => e("button", {
                      key: `emoji-row-${t.id}-${I}-${D}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Pe) => le(`row:${t.id}:${I}`, D)
                    }, u(D), 9, Yb)), 64))
                  ])) : h("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", Kb, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => R(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Gb),
              e("div", Jb, [
                (a(!0), n(L, null, W(t.links || [], (r, I) => (a(), n("div", {
                  key: I,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (D) => de(t.id, I, "text", D.target.value),
                    placeholder: "Label"
                  }, null, 40, Qb),
                  e("div", Xb, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (D) => O(`navbar-item:${t.id}:${I}`),
                      title: "Insert emoji"
                    }, "😊", 8, Zb),
                    g.value === `navbar-item:${t.id}:${I}` ? (a(), n("div", eh, [
                      (a(), n(L, null, W(v, (D) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${I}-${D}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (Pe) => le(`navbar-item:${t.id}:${I}`, D)
                      }, u(D), 9, th)), 64))
                    ])) : h("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (D) => de(t.id, I, "url", D.target.value),
                    placeholder: "URL"
                  }, null, 40, ah),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => m(t.id, I),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, nh)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => E(t.id)
              }, "+ Add link", 8, sh)
            ])) : t.type === "accordion" ? (a(), n("div", lh, [
              (a(!0), n(L, null, W(t.items || [], (r, I) => (a(), n("div", {
                key: I,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (D) => k(t.id, I, "title", D.target.value),
                  placeholder: "Section title"
                }, null, 40, oh),
                e("div", ih, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (D) => O(`accordion-title:${t.id}:${I}`),
                    title: "Insert emoji"
                  }, "😊", 8, rh),
                  g.value === `accordion-title:${t.id}:${I}` ? (a(), n("div", uh, [
                    (a(), n(L, null, W(v, (D) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${I}-${D}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Pe) => le(`accordion-title:${t.id}:${I}`, D)
                    }, u(D), 9, dh)), 64))
                  ])) : h("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (D) => k(t.id, I, "content", D.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, ch),
                e("div", ph, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (D) => O(`accordion-content:${t.id}:${I}`),
                    title: "Insert emoji"
                  }, "😊", 8, mh),
                  g.value === `accordion-content:${t.id}:${I}` ? (a(), n("div", vh, [
                    (a(), n(L, null, W(v, (D) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${I}-${D}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (Pe) => le(`accordion-content:${t.id}:${I}`, D)
                    }, u(D), 9, bh)), 64))
                  ])) : h("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (D) => ee(t.id, I),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, hh)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => K(t.id)
              }, "+ Add section", 8, yh)
            ])) : t.type === "carousel" ? (a(), n("div", gh, [
              (a(!0), n(L, null, W(t.slides || [], (r, I) => (a(), n("div", {
                key: I,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (D) => Ue(t.id, I, "imageUrl", D.target.value),
                  placeholder: "Image URL"
                }, null, 40, fh),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (D) => Ue(t.id, I, "alt", D.target.value),
                  placeholder: "Alt text"
                }, null, 40, kh),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (D) => Ue(t.id, I, "linkUrl", D.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, _h),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (D) => He(t.id, I),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, $h)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Ee(t.id)
              }, "+ Add slide", 8, wh)
            ])) : t.type === "countdown" ? (a(), n("div", xh, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (r) => R(t.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Ch),
              e("div", Sh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ih),
                g.value === `countdown-label:${t.id}` ? (a(), n("div", Th, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`countdown-label:${t.id}`, r)
                  }, u(r), 9, Ah)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (r) => R(t.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Rh),
              i[57] || (i[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", Uh, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => R(t.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Ph),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (r) => R(t.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, Lh),
              e("div", Eh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Bh),
                g.value === `product-title:${t.id}` ? (a(), n("div", Oh, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-product-title-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`product-title:${t.id}`, r)
                  }, u(r), 9, Nh)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (r) => R(t.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Vh),
              e("div", Mh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Dh),
                g.value === `product-price:${t.id}` ? (a(), n("div", Wh, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-product-price-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`product-price:${t.id}`, r)
                  }, u(r), 9, jh)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (r) => R(t.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Hh),
              e("div", qh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Fh),
                g.value === `product-button:${t.id}` ? (a(), n("div", zh, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-product-button-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`product-button:${t.id}`, r)
                  }, u(r), 9, Yh)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (r) => R(t.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Kh)
            ])) : t.type === "liquid" ? (a(), n("div", Gh, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Jh),
              e("div", Qh, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`block:${t.id}`)
                }, u(Fe), 8, Xh),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Zh),
                l.value === `block:${t.id}` ? (a(), n("div", ey, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `block-var-liquid-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`block:${t.id}`, r)
                  }, u(r), 9, ty))), 128))
                ])) : h("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", ay, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-liquid-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`block:${t.id}`, r)
                  }, u(r), 9, ny)), 64))
                ])) : h("", !0)
              ]),
              i[58] || (i[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", sy, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => R(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, ly),
              e("div", oy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, iy),
                g.value === `code-caption:${t.id}` ? (a(), n("div", ry, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-code-caption-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`code-caption:${t.id}`, r)
                  }, u(r), 9, uy)), 64))
                ])) : h("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, dy),
              e("div", cy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => M(`block:${t.id}`)
                }, u(Fe), 8, py),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, my),
                l.value === `block:${t.id}` ? (a(), n("div", vy, [
                  (a(!0), n(L, null, W(H.value, (r) => (a(), n("button", {
                    key: `block-var-code-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (I) => A(`block:${t.id}`, r)
                  }, u(r), 9, by))), 128))
                ])) : h("", !0),
                g.value === `emoji:block:${t.id}` ? (a(), n("div", hy, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-code-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`block:${t.id}`, r)
                  }, u(r), 9, yy)), 64))
                ])) : h("", !0)
              ]),
              i[59] || (i[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", gy, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (r) => R(t.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, fy),
              e("div", ky, [
                i[60] || (i[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (r) => R(t.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, _y)
              ]),
              i[61] || (i[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", $y, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => R(t.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, wy),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => R(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, xy),
              e("div", Cy, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => O(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Sy),
                g.value === `dynamic-alt:${t.id}` ? (a(), n("div", Iy, [
                  (a(), n(L, null, W(v, (r) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (I) => le(`dynamic-alt:${t.id}`, r)
                  }, u(r), 9, Ty)), 64))
                ])) : h("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (r) => R(t.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Ay)
            ])) : h("", !0),
            f.includes(t.type) ? (a(), n("div", Ry, [
              e("div", Uy, [
                e("button", {
                  type: "button",
                  class: xe(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (r) => R(t.id, { alignment: "left" })
                }, [...i[62] || (i[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Py),
                e("button", {
                  type: "button",
                  class: xe(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (r) => R(t.id, { alignment: "center" })
                }, [...i[63] || (i[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Ly),
                e("button", {
                  type: "button",
                  class: xe(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (r) => R(t.id, { alignment: "right" })
                }, [...i[64] || (i[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Ey)
              ]),
              e("label", By, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (r) => R(t.id, { fullWidth: r.target.checked })
                }, null, 40, Oy),
                i[65] || (i[65] = e("span", null, "Full width", -1))
              ])
            ])) : h("", !0)
          ], 8, bm))), 128))
        ]),
        e("div", Ny, [
          i[66] || (i[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Vy, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[6] || (i[6] = (t) => V("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[7] || (i[7] = (t) => V("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[8] || (i[8] = (t) => V("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[9] || (i[9] = (t) => V("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[10] || (i[10] = (t) => V("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[11] || (i[11] = (t) => V("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[12] || (i[12] = (t) => V("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[13] || (i[13] = (t) => V("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[14] || (i[14] = (t) => V("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[15] || (i[15] = (t) => V("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[16] || (i[16] = (t) => V("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[17] || (i[17] = (t) => V("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[18] || (i[18] = (t) => V("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[19] || (i[19] = (t) => V("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[20] || (i[20] = (t) => V("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[21] || (i[21] = (t) => V("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[22] || (i[22] = (t) => V("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[23] || (i[23] = (t) => V("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[24] || (i[24] = (t) => V("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[25] || (i[25] = (t) => V("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[26] || (i[26] = (t) => V("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[27] || (i[27] = (t) => V("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[28] || (i[28] = (t) => V("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", My, [
        i[71] || (i[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        i[72] || (i[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Dy, [
          i[69] || (i[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Wy, [
            je(e("select", {
              "onUpdate:modelValue": i[29] || (i[29] = (t) => Y.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(L, null, W(H.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, u(t), 9, jy))), 128))
            ], 512), [
              [Ye, Y.value]
            ])
          ])
        ]),
        e("div", Hy, [
          i[70] || (i[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", qy, [
            je(e("input", {
              "onUpdate:modelValue": i[30] || (i[30] = (t) => se.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [it, se.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: we
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), zy = /* @__PURE__ */ Ne(Fy, [["__scopeId", "data-v-62cf50f4"]]), Yy = { class: "keos-email-builder" }, Ky = { class: "kb-builder-top" }, Gy = { class: "kb-email-layout" }, Jy = { class: "kb-email-sidebar" }, Qy = {
  key: 0,
  class: "kb-email-form"
}, Xy = { class: "kb-email-form-head" }, Zy = { class: "kb-email-form-head-top" }, eg = { class: "kb-email-health-pill" }, tg = { class: "kb-wa-form-head-row" }, ag = ["value"], ng = { class: "kb-email-health" }, sg = { class: "kb-email-health-row" }, lg = { class: "kb-email-health-value" }, og = { class: "kb-email-health-bar" }, ig = { class: "kb-email-canvas" }, rg = {
  key: 0,
  class: "kb-email-test-banner"
}, ug = { class: "kb-email-preview-chrome" }, dg = { class: "kb-push-preview-controls" }, cg = { class: "kb-push-preview-as" }, pg = ["value"], mg = { class: "kb-preview-status" }, vg = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, bg = { class: "kb-email-inbox-strip" }, hg = { class: "kb-email-inbox-from" }, yg = { class: "kb-email-inbox-from-name" }, gg = { class: "kb-email-inbox-from-addr" }, fg = { class: "kb-email-inbox-subject" }, kg = ["title"], _g = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, $g = { class: "kb-email-body-canvas" }, wg = ["innerHTML"], xg = { class: "kb-email-actions" }, Cg = {
  key: 0,
  class: "kb-actions-note"
}, Sg = { key: 0 }, Ig = { class: "kb-email-actions-right" }, Tg = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Ag = { class: "kb-confirm-dialog" }, Rg = { class: "kb-confirm-actions" }, Ug = /* @__PURE__ */ Oe({
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
    function c(s) {
      if (!Array.isArray(s) || s.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const l = (A) => String(A).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), g = [
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
      ], v = (A, O) => {
        if (!g.includes(O.type)) return A;
        const z = O.alignment || "left", me = !!O.fullWidth;
        return `<div style="text-align:${z};${me ? "width:100%;" : ""}">${A}</div>`;
      }, M = [];
      for (const A of s)
        switch (A.type) {
          case "heading": {
            const O = Math.min(3, Math.max(1, Number(A.level) || 1)), z = l(A.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              v(
                `<h${O} style="margin:0 0 12px;font-size:${O === 1 ? "22" : O === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${z || "Heading"}</h${O}>`,
                A
              )
            );
            break;
          }
          case "paragraph": {
            const O = l(A.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${O || "Paragraph"}</p>`,
                A
              )
            );
            break;
          }
          case "image": {
            const O = (A.src || "").trim(), z = l(A.alt || ""), me = (A.linkUrl || "").trim(), we = !!A.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", Be = O ? `<img src="${l(O)}" alt="${z}" style="${we}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            M.push(
              v(
                `<div style="margin:0 0 12px;">${me ? `<a href="${l(me)}" style="color:#2563eb;">${Be}</a>` : Be}</div>`,
                A
              )
            );
            break;
          }
          case "button": {
            const O = l(A.text || "Button"), z = (A.url || "#").trim(), me = Math.min(24, Math.max(0, Number(A.borderRadius) ?? 8)), le = !!A.fullWidth, we = !!A.ghost, Be = we ? "transparent" : "#0f172a", p = we ? "#0f172a" : "#fff", i = we ? "2px solid #0f172a" : "none", t = le ? "block" : "inline-block", q = le ? "100%" : "auto";
            M.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${l(z)}" style="display:${t};width:${q};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${Be};color:${p};border:${i};text-decoration:none;font-size:14px;font-weight:600;border-radius:${me}px;overflow-wrap:anywhere;">${O}</a></p>`,
                A
              )
            );
            break;
          }
          case "divider": {
            const O = Math.min(8, Math.max(1, Number(A.thickness) || 1)), z = (A.color || "#e2e8f0").trim() || "#e2e8f0", me = A.lineStyle || "solid";
            M.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${O}px ${me} ${z};" />`,
                A
              )
            );
            break;
          }
          case "spacer": {
            const O = Math.min(120, Math.max(8, Number(A.height) || 24));
            M.push(v(`<div style="height:${O}px;"></div>`, A));
            break;
          }
          case "footer": {
            const O = l(A.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), z = (A.unsubscribeUrl || "").trim(), me = l(A.companyAddress || "");
            M.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${O || "Footer"}` + (z ? `<p style="margin:8px 0 0;"><a href="${l(z)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (me ? `<p style="margin:4px 0 0;">${me}</p>` : "") + "</div>",
                A
              )
            );
            break;
          }
          case "list": {
            const O = A.style === "numbered" ? "ol" : "ul", me = (Array.isArray(A.items) ? A.items : []).map(
              (le) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${l(String(le)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            M.push(
              v(
                `<${O} style="margin:0 0 12px;padding-left:24px;">${me || "<li>Item</li>"}</${O}>`,
                A
              )
            );
            break;
          }
          case "quote": {
            const O = l(A.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), z = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, me = z[A.style || "default"] || z.default;
            M.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${me}font-size:14px;line-height:1.6;">${O || "Quote"}</div>`,
                A
              )
            );
            break;
          }
          case "social": {
            const z = (Array.isArray(A.links) ? A.links : []).filter((me) => (me.url || "").trim());
            if (z.length === 0)
              M.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  A
                )
              );
            else {
              const me = (le) => `<a href="${l((le.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${l(le.platform || "Link")}</a>`;
              M.push(
                v(
                  `<div style="margin:0 0 12px;">${z.map(me).join("")}</div>`,
                  A
                )
              );
            }
            break;
          }
          case "video": {
            const O = (A.thumbnailUrl || "").trim(), z = (A.videoUrl || "#").trim(), me = l(A.caption || ""), we = !!A.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", Be = O ? `<img src="${l(O)}" alt="Video" style="${we}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            M.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${l(z)}" style="display:block;color:inherit;">${Be}</a>` + (me ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${me}</p>` : "") + "</div>",
                A
              )
            );
            break;
          }
          case "link_list": {
            const O = Array.isArray(A.links) ? A.links : [], z = l(A.separator || " | "), le = O.filter(
              (we) => (we.text || we.url) && (we.url || "").trim()
            ).map(
              (we) => `<a href="${l((we.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(we.text || "Link")}</a>`
            );
            M.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${le.join(z)}</p>`,
                A
              )
            );
            break;
          }
          case "columns": {
            const O = l(A.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), z = l(A.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            M.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${O || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${z || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const O = Math.min(4, Math.max(1, Number(A.columnCount) || 2)), z = Array.isArray(A.cells) ? A.cells.slice(0, O) : [], me = 100 / O, le = Array.from({ length: O }, (we, Be) => {
              const p = z[Be] ?? "", i = l(p).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${me}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${i || "—"}</td>`;
            }).join("");
            M.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${le}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const O = Array.isArray(A.links) ? A.links : [], z = l(A.separator || " | "), le = O.filter(
              (we) => (we.text || we.url) && (we.url || "").trim()
            ).map(
              (we) => `<a href="${l((we.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${l(we.text || "Link")}</a>`
            );
            M.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${le.length ? le.join(z) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const z = (Array.isArray(A.items) ? A.items : []).map((me) => {
              const le = l(me.title || "Section"), we = l(me.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${le}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${we}</div></details>`;
            }).join("");
            M.push(
              z ? `<div style="margin:0 0 12px;">${z}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const z = (Array.isArray(A.slides) ? A.slides : []).filter(
              (me) => (me.imageUrl || "").trim()
            );
            if (z.length === 0)
              M.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const me = z[0], le = `<img src="${l(me.imageUrl)}" alt="${l(me.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, we = (me.linkUrl || "").trim();
              M.push(
                `<div style="margin:0 0 12px;">${we ? `<a href="${l(we)}">${le}</a>` : le}` + (z.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${z.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const O = l(A.label || "Offer ends in"), z = A.endDateTime ? new Date(A.endDateTime).toLocaleString() : "—";
            M.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${O}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${z}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const O = (A.imageUrl || "").trim(), z = l(A.title || "Product"), me = l(A.price || ""), le = l(A.buttonText || "Buy now"), we = (A.buttonUrl || "#").trim(), Be = O ? `<img src="${l(O)}" alt="${l(A.alt || z)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            M.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Be}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${z}</p>` + (me ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${me}</p>` : "") + `<a href="${l(we)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${le}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const O = l((A.content || "").trim());
            M.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${O || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const O = (A.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), z = l((A.caption || "").trim());
            M.push(
              '<div style="margin:0 0 12px;">' + (z ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${z}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${O || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const O = (A.feedUrl || "").trim(), z = Math.min(20, Math.max(1, Number(A.maxItems) ?? 5));
            M.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (O ? `<p style="margin:0;font-size:12px;color:#64748b;">${l(O)} · max ${z} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const O = (A.imageUrl || "").trim(), z = (A.fallbackUrl || "").trim(), me = l(A.alt || "Dynamic image");
            O ? M.push(
              `<div style="margin:0 0 12px;"><img src="${l(O)}" alt="${me}" style="max-width:100%;height:auto;display:block;border:0;" />` + (z ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${l(z)}</p>` : "") + "</div>"
            ) : M.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return M.join("");
    }
    function b(s) {
      return /<\s*html[\s>]/i.test(s) || /<!doctype\s+html/i.test(s);
    }
    function f(s) {
      const l = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return l ? l[1] : s;
    }
    function T(s, l, g) {
      const v = (l || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), M = (g || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
    const x = o, C = d, {
      campaign: U,
      dirty: H,
      customValidatorErrors: Y,
      getValidationWithWarnings: se,
      update: oe,
      updateMessage: ge,
      undo: N,
      redo: ie,
      canUndo: F,
      canRedo: fe,
      resetMessage: j,
      hooks: Q
    } = ut({
      initial: x.modelValue,
      hooks: {
        ...x.hooks,
        customValidators: async (s) => {
          var M, A, O;
          const l = [];
          (M = s.name) != null && M.trim() || l.push("Template name is required");
          const g = s.message;
          (A = g == null ? void 0 : g.subject) != null && A.trim() || l.push("Subject is required");
          const v = (O = x.hooks) != null && O.customValidators ? await x.hooks.customValidators(s) : [];
          return [...l, ...v];
        }
      },
      onDirty: () => C("change", U.value)
    }), { lastSavedAt: ne } = dt(U, { channel: "email" });
    function Z(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ie() : N());
    }
    st(() => {
      window.addEventListener("keydown", Z);
    }), lt(() => {
      window.removeEventListener("keydown", Z);
    }), Ve(
      U,
      (s) => C("update:modelValue", {
        ...s,
        message: {
          ...s.message,
          html: Ue.value
        }
      }),
      { deep: !0 }
    );
    const ke = be(), Ie = be(!0);
    async function te() {
      if (Q.estimateReach)
        try {
          ke.value = await Q.estimateReach(U.value.audience);
        } catch {
          ke.value = void 0;
        }
      Q.canSend && (Ie.value = await Promise.resolve(Q.canSend()));
    }
    te(), Ve(() => U.value.audience, te, { deep: !0 });
    const y = w(() => (Y.value, se(ke.value))), _ = w(() => y.value.blockingErrors), V = w(() => y.value.warnings), ye = w(() => y.value.valid), re = w(() => {
      var v, M, A;
      const s = U.value.message, l = [
        !!((v = U.value.name) != null && v.trim()),
        !!((M = s.subject) != null && M.trim()),
        !!((A = s.from_address) != null && A.trim()),
        !!(Array.isArray(s.blocks) ? s.blocks.length : (s.html ?? "").trim().length),
        !!U.value.template_type
      ], g = l.filter(Boolean).length;
      return Math.round(g / l.length * 100);
    }), R = w(() => re.value >= 90 ? "Production ready" : re.value >= 70 ? "Strong draft" : re.value >= 40 ? "In progress" : "Needs setup"), B = w(
      () => U.value.template_type ?? "transactional"
    ), $ = be(""), ve = be(!1), $e = be(null), _e = w(() => {
      const s = $.value;
      return s ? Ze.find((l) => l.id === s) ?? null : null;
    });
    function Ce(s) {
      const l = U.value, g = s.campaign.message ? { ...l.message, ...s.campaign.message } : l.message;
      oe({
        ...s.campaign,
        message: g
      }), $e.value = null, ve.value = !1;
    }
    function P(s) {
      const l = s.target.value;
      if (!l) return;
      const g = Ut.find((v) => v.id === l);
      g && (H.value ? ($e.value = g, ve.value = !0) : Ce(g), s.target.value = "");
    }
    function ae(s) {
      oe({ template_type: s });
    }
    function J(s) {
      oe({
        name: s,
        tracking: { ...U.value.tracking ?? {}, campaign_name: s }
      });
    }
    const Se = w(
      () => U.value.message.subject ?? ""
    ), pe = w(
      () => U.value.message.preview_text ?? ""
    ), de = w(
      () => U.value.message.html ?? ""
    ), E = w(
      () => U.value.message.from_name ?? "Your App"
    ), m = w(
      () => U.value.message.from_address ?? "notifications@example.com"
    ), k = w(
      () => U.value.message.blocks ?? []
    ), K = w(() => {
      const s = U.value.message, l = (s.html ?? "").trim(), v = (Array.isArray(s.blocks) ? s.blocks : []).some((M) => {
        if (!M || typeof M != "object") return !1;
        const A = (M.type ?? "").toString();
        if (A === "paragraph" || A === "heading" || A === "quote" || A === "footer") {
          const O = (M.content ?? "").toString().trim();
          return !(!O || O === "Heading" || O.startsWith("Your text here."));
        }
        return A === "image" || A === "video" || A === "dynamic_image" ? !!(M.src ?? M.imageUrl ?? M.thumbnailUrl ?? "").toString().trim() : A === "button" ? !!(M.text ?? "").toString().trim() : !0;
      });
      return !!((s.subject ?? "").toString().trim() || (s.preview_text ?? "").toString().trim() || l || v);
    }), ee = w(() => {
      const s = k.value;
      if (Array.isArray(s) && s.length > 0)
        return c(s);
      const l = de.value;
      return l && l.trim() ? b(l) ? f(l) : l : c([]);
    }), Ue = w(() => {
      const s = k.value;
      if (Array.isArray(s) && s.length > 0)
        return T(
          c(s),
          Se.value,
          pe.value
        );
      const l = de.value;
      return l && l.trim() ? b(l) ? l : T(l, Se.value, pe.value) : T(
        c([]),
        Se.value,
        pe.value
      );
    }), Ee = w(() => {
      const s = Se.value;
      return _e.value ? Je(s, _e.value.data) : s;
    }), He = w(() => {
      const s = pe.value;
      return _e.value ? Je(s, _e.value.data) : s;
    }), qe = w(() => {
      const s = ee.value;
      return _e.value ? Je(s, _e.value.data) : s;
    }), We = be("desktop");
    function ce() {
      ye.value && C("save", {
        ...U.value,
        message: {
          ...U.value.message,
          html: Ue.value
        }
      });
    }
    return (s, l) => {
      var g;
      return a(), n("div", Yy, [
        e("div", Ky, [
          Me(ct, {
            "campaign-name": S(U).name,
            status: S(U).status,
            dirty: S(H),
            "last-saved-at": S(ne),
            "can-undo": S(F),
            "can-redo": S(fe),
            "slugify-name": x.enforceSlugName,
            "onUpdate:campaignName": J,
            onUndo: S(N),
            onRedo: S(ie)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          _.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: Ae({
              background: S(Le).dangerBg,
              border: `1px solid ${S(Le).dangerBorder}`,
              borderRadius: `${S(Qe).input}px`,
              padding: `${S(Te)[16]}px ${S(Te)[24]}px`,
              marginBottom: `${S(Te)[24]}px`
            })
          }, [
            e("ul", {
              style: Ae({ margin: 0, paddingLeft: "1.25rem", color: S(Le).danger })
            }, [
              (a(!0), n(L, null, W(_.value, (v) => (a(), n("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", Gy, [
          e("aside", Jy, [
            o.disabledSections.includes("email") ? h("", !0) : (a(), n("div", Qy, [
              e("div", Xy, [
                e("div", Zy, [
                  l[8] || (l[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", eg, u(R.value), 1)
                ]),
                e("div", tg, [
                  Me($t, {
                    "template-type": B.value,
                    onUpdate: ae
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: P
                  }, [
                    l[9] || (l[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(L, null, W(S(Ut), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, ag))), 128))
                  ], 32)
                ]),
                e("div", ng, [
                  e("div", sg, [
                    l[10] || (l[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", lg, u(re.value) + "%", 1)
                  ]),
                  e("div", og, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: Ae({ width: `${re.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Me(zy, {
                message: S(U).message,
                "variable-options": o.variableOptions,
                "show-reset": !0,
                onUpdate: S(ge),
                onReset: l[0] || (l[0] = (v) => S(j)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", ig, [
            !o.designOnly && S(U).audience.test_mode ? (a(), n("div", rg, [...l[11] || (l[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", ug, [
              e("div", dg, [
                e("label", cg, [
                  l[13] || (l[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  je(e("select", {
                    "onUpdate:modelValue": l[1] || (l[1] = (v) => $.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    l[12] || (l[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(L, null, W(S(Ze), (v) => (a(), n("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, pg))), 128))
                  ], 512), [
                    [Ye, $.value]
                  ])
                ]),
                e("div", mg, [
                  l[14] || (l[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, u(We.value), 1)
                ])
              ]),
              e("div", vg, [
                e("button", {
                  type: "button",
                  class: xe(["kb-email-device-btn", {
                    "kb-email-device-btn--active": We.value === "desktop"
                  }]),
                  onClick: l[2] || (l[2] = (v) => We.value = "desktop")
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
                  class: xe(["kb-email-device-btn", {
                    "kb-email-device-btn--active": We.value === "mobile"
                  }]),
                  onClick: l[3] || (l[3] = (v) => We.value = "mobile")
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
                class: xe(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": We.value === "mobile",
                  "kb-email-preview-frame--empty": !K.value
                }])
              }, [
                e("div", bg, [
                  e("div", hg, [
                    e("span", yg, u(E.value), 1),
                    e("span", gg, "<" + u(m.value) + ">", 1)
                  ]),
                  e("div", fg, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: Ee.value || "No subject"
                    }, u(Ee.value || "No subject"), 9, kg),
                    He.value ? (a(), n("span", _g, " — " + u(He.value), 1)) : h("", !0)
                  ])
                ]),
                e("div", $g, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: qe.value
                  }, null, 8, wg)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", xg, [
          V.value.length > 0 ? (a(), n("div", Cg, [
            l[17] || (l[17] = e("strong", null, "Warning:", -1)),
            G(" " + u((g = V.value[0]) == null ? void 0 : g.message) + " ", 1),
            V.value.length > 1 ? (a(), n("span", Sg, " (+" + u(V.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", Ig, [
            o.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: l[4] || (l[4] = (v) => C("duplicate", JSON.parse(JSON.stringify(S(U)))))
            }, " Duplicate ")) : h("", !0),
            o.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: ce
            }, " Save ")) : h("", !0),
            o.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: l[5] || (l[5] = (v) => C("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        ve.value ? (a(), n("div", Tg, [
          e("div", Ag, [
            l[18] || (l[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            l[19] || (l[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Rg, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: l[6] || (l[6] = (v) => {
                  ve.value = !1, $e.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: l[7] || (l[7] = (v) => $e.value && Ce($e.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Ne(Ug, [["__scopeId", "data-v-f45fc2a3"]]), Pg = { class: "kb-shell" }, Lg = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Eg = ["aria-selected", "onClick"], Bg = { class: "kb-shell__meta" }, Og = ["href"], Ng = { class: "kb-shell__body" }, Vg = /* @__PURE__ */ Oe({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(o, { emit: d }) {
    const c = d, b = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (f, T) => (a(), n("div", Pg, [
      e("header", {
        class: "kb-shell__header",
        style: Ae({ padding: `${S(Te)[12]}px ${S(Te)[24]}px`, borderBottom: `1px solid ${S(Le).neutral.border}`, background: S(Le).neutral.bg })
      }, [
        T[0] || (T[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Lg, [
          (a(), n(L, null, W(b, (x) => e("button", {
            key: x.id,
            type: "button",
            class: xe(["kb-shell__channel", { "kb-shell__channel--active": o.channel === x.id }]),
            role: "tab",
            "aria-selected": o.channel === x.id,
            onClick: (C) => c("switch-channel", x.id)
          }, u(x.label), 11, Eg)), 64))
        ]),
        e("div", Bg, [
          o.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: Ae({ padding: "2px 8px", borderRadius: `${S(Qe).input}px`, fontSize: "0.75rem", background: S(Le).neutral.bg, color: S(Le).neutral.textMuted })
          }, u(o.environment), 5)) : h("", !0),
          o.helpUrl ? (a(), n("a", {
            key: 1,
            href: o.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: Ae({ color: S(Le).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Og)) : h("", !0)
        ])
      ], 4),
      e("div", Ng, [
        Ke(f.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Mg = /* @__PURE__ */ Ne(Vg, [["__scopeId", "data-v-0df30803"]]), Dg = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Wg = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, jg = ["onClick"], Hg = /* @__PURE__ */ Oe({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(o) {
    var T;
    const d = o, c = be(((T = d.items[0]) == null ? void 0 : T.id) ?? "");
    let b = null;
    function f(x) {
      const C = document.getElementById(x);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return st(() => {
      const x = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      x && (b = new IntersectionObserver(
        (C) => {
          for (const U of C)
            if (U.isIntersecting) {
              const H = U.target.getAttribute("data-outline-id");
              H && (c.value = H);
            }
        },
        { root: x === document ? null : x, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((C) => {
        const U = document.getElementById(C.id);
        U && (b == null || b.observe(U));
      }));
    }), lt(() => {
      b == null || b.disconnect();
    }), Ve(
      () => d.items,
      (x) => {
        x.length && !c.value && (c.value = x[0].id);
      },
      { immediate: !0 }
    ), (x, C) => (a(), n("nav", Dg, [
      e("ul", Wg, [
        (a(!0), n(L, null, W(o.items, (U) => (a(), n("li", {
          key: U.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: xe(["kb-outline__btn", { "kb-outline__btn--active": c.value === U.id }]),
            style: Ae({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${S(Te)[8]}px ${S(Te)[12]}px`,
              border: "none",
              borderRadius: `${S(Qe).input}px`,
              background: c.value === U.id ? S(Le).neutral.bg : "transparent",
              color: c.value === U.id ? "#0f172a" : S(Le).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: c.value === U.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (H) => f(U.id)
          }, u(U.label), 15, jg)
        ]))), 128))
      ])
    ]));
  }
}), qg = /* @__PURE__ */ Ne(Hg, [["__scopeId", "data-v-25c37675"]]), Fg = ["id"], zg = {
  key: 1,
  class: "kb-form-shell__head"
}, Yg = /* @__PURE__ */ Oe({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(o) {
    return (d, c) => (a(), n("div", {
      class: "kb-form-shell",
      id: o.sectionId ?? void 0,
      style: Ae({
        padding: `${S(Te)[24]}px ${S(Te)[24]}px ${S(Te)[32]}px`,
        marginBottom: 0
      })
    }, [
      o.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: Ae({ marginBottom: S(Te)[24], paddingBottom: S(Te)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: Ae({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: S(Te)[12] })
        }, u(o.label), 5),
        Ke(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", zg, [
        Ke(d.$slots, "head", {}, void 0, !0)
      ])),
      Ke(d.$slots, "default", {}, void 0, !0)
    ], 12, Fg));
  }
}), Kg = /* @__PURE__ */ Ne(Yg, [["__scopeId", "data-v-6504df41"]]), Gg = /* @__PURE__ */ Oe({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(o) {
    return (d, c) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: Ae({
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
}), Jg = /* @__PURE__ */ Oe({
  __name: "BuilderTopShell",
  setup(o) {
    return (d, c) => (a(), n("div", {
      class: "kb-top-shell",
      style: Ae({
        marginLeft: S(Te)[24],
        marginRight: S(Te)[24]
      })
    }, [
      Ke(d.$slots, "header"),
      Ke(d.$slots, "errors"),
      Ke(d.$slots, "warnings"),
      Ke(d.$slots, "default")
    ], 4));
  }
});
function Qg(o) {
  o.component("KeosNotificationBuilder", Gt), o.component("KeosWhatsAppBuilder", Jt), o.component("KeosSmsBuilder", Qt), o.component("KeosEmailBuilder", Xt), o.component("BuilderShell", Mg), o.component("BuilderOutline", qg), o.component("BuilderVersionHistoryModal", Kt), o.component("BuilderFormShell", Kg), o.component("BuilderActionsBar", Gg), o.component("BuilderTopShell", Jg);
}
const Zg = {
  install: Qg,
  KeosNotificationBuilder: Gt,
  KeosWhatsAppBuilder: Jt,
  KeosSmsBuilder: Qt,
  KeosEmailBuilder: Xt
};
export {
  Gg as BuilderActionsBar,
  Kg as BuilderFormShell,
  qg as BuilderOutline,
  Mg as BuilderShell,
  Jg as BuilderTopShell,
  Kt as BuilderVersionHistoryModal,
  Ze as DEFAULT_SAMPLE_PROFILES,
  Xt as KeosEmailBuilder,
  Gt as KeosNotificationBuilder,
  Qt as KeosSmsBuilder,
  Jt as KeosWhatsAppBuilder,
  Zg as default,
  Qg as install,
  Je as renderTemplatePreview,
  dt as useAutosave,
  ut as useCampaignState
};
//# sourceMappingURL=index.js.map
