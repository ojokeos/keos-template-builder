import { ref as ae, watch as Ce, computed as y, defineComponent as _e, openBlock as s, createElementBlock as n, normalizeStyle as pe, unref as g, createElementVNode as e, normalizeClass as re, Fragment as q, renderList as j, toDisplayString as u, createTextVNode as X, createCommentVNode as _, withDirectives as Ae, vModelSelect as Pe, vModelText as lt, createStaticVNode as He, withKeys as Wt, onMounted as je, onUnmounted as Ke, createVNode as xe, createBlock as Ht, withModifiers as Fe, renderSlot as Oe } from "vue";
const ue = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Ve = {
  input: 6,
  card: 12,
  button: 6
}, fe = {
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
fe.neutral.textMuted, fe.neutral.textMeta;
const Ge = {
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
}, zt = ["android", "ios", "web"], It = "normal", At = ["low", "normal", "high"], Tt = 86400, Ft = [3600, 7200, 86400, 172800], Lt = "1.0", qt = ["topic", "segment", "user_list"];
function ot() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...zt],
    test_mode: !1
  };
}
function it() {
  return {
    title: "",
    body: "",
    variables: [],
    // No actions by default; UI can add up to provider-supported count.
    // When omitted, mappers simply won't include actions.
    // @ts-expect-error actions is optional on CampaignMessage but we initialize as empty.
    actions: []
  };
}
function rt() {
  return {
    priority: It,
    ttl: Tt,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function dt() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function jt(a) {
  return {
    schema_version: Lt,
    name: "",
    status: "draft",
    audience: ot(),
    message: it(),
    delivery: rt(),
    tracking: dt(),
    ...a
  };
}
function Bt(a) {
  const r = a;
  return r.schema_version || (r.schema_version = Lt), r.audience || (r.audience = ot()), r.message || (r.message = it()), r.delivery || (r.delivery = rt()), r.tracking || (r.tracking = dt()), At.includes(r.delivery.priority) || (r.delivery.priority = It), r.delivery.ttl === void 0 && (r.delivery.ttl = Tt), qt.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const Kt = 1e5;
function Yt(a, r) {
  var $, h, w;
  const m = [], v = r ?? a.audience.estimated_reach;
  return v !== void 0 && v >= Kt && m.push({
    message: `Estimated reach is very high (${v.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), a.tracking && !(($ = a.tracking.campaign_name) != null && $.trim()) && !((h = a.name) != null && h.trim()) && m.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (w = a.message.deep_link) != null && w.trim() || m.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), m;
}
function Ut(a, r = "error") {
  return { message: a, severity: r };
}
function Rt(a) {
  const r = [];
  return a.schema_version || r.push(Ut("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function Gt(a, r) {
  const m = Rt(a), v = Yt(a, r);
  return {
    valid: m.valid,
    errors: [
      ...m.errors,
      ...v.map(($) => Ut($.message, $.severity))
    ]
  };
}
function Jt(a) {
  return a.errors.filter((r) => r.severity === "error");
}
function Xt(a) {
  return a.errors.filter((r) => r.severity !== "error");
}
function Qt(a) {
  const r = String(a ?? "").trim().toLowerCase();
  return r === "authentication" ? "AUTHENTICATION" : r === "utility" ? "UTILITY" : "MARKETING";
}
function Zt(a, r = "template_message") {
  return (String(a ?? "").trim() || r).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || r;
}
function ea(a) {
  const r = String(a.header_type ?? "").trim().toLowerCase();
  if (r === "image")
    return "IMAGE";
  if (r === "video")
    return "VIDEO";
  if (r === "document")
    return "DOCUMENT";
  if (r === "text")
    return "TEXT";
  const m = String(a.template_type ?? "").trim().toLowerCase();
  return m === "image" ? "IMAGE" : m === "video" ? "VIDEO" : m === "document" ? "DOCUMENT" : null;
}
function nt(a, r = []) {
  if (!a)
    return { text: "", varOrder: [...r] };
  const m = [...r], v = /* @__PURE__ */ new Map();
  return m.forEach((h, w) => v.set(h, w + 1)), { text: a.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (h, w) => (v.has(w) || (v.set(w, m.length + 1), m.push(w)), `{{${v.get(w)}}}`)), varOrder: m };
}
function ct(a, r) {
  return a.map((m) => {
    const v = r == null ? void 0 : r[m];
    return typeof v == "string" && v.length > 0 ? v : `sample_${m}`;
  });
}
function ta(a, r) {
  const m = [];
  let v = [...r];
  return { buttons: a.slice(0, 10).map((h) => {
    const w = h, C = String(w.type ?? "quick_reply").trim().toLowerCase(), x = String(w.label ?? "").trim() || "Button";
    if (C === "url") {
      const E = nt(String(w.url ?? ""), v);
      return v = E.varOrder, { type: "URL", text: x, url: E.text || void 0 };
    }
    return C === "call" ? {
      type: "PHONE_NUMBER",
      text: x,
      phone_number: String(w.phone ?? "").trim() || void 0
    } : C === "opt_out" ? (m.push("Opt-out button is provider-specific; mapped as QUICK_REPLY."), { type: "QUICK_REPLY", text: x }) : { type: "QUICK_REPLY", text: x };
  }).filter((h) => !!h.text), varOrder: v, warnings: m };
}
function pt(a) {
  const r = {}, m = [
    "flow_id",
    "flow_cta_label",
    "lto_expiry",
    "products",
    "cards",
    "auth_type",
    "auth_label",
    "auth_code",
    "document_filename",
    "media_url"
  ];
  for (const v of m)
    a[v] !== void 0 && a[v] !== null && a[v] !== "" && (r[v] = a[v]);
  return Object.keys(r).length ? r : void 0;
}
function aa(a, r = {}) {
  const m = [], v = a.message, $ = [], h = Zt(v.template_name ?? a.name, a.name || "template_message"), w = Qt(v.template_category), C = String(v.template_language ?? "en_US").trim() || "en_US";
  let x = [];
  const E = ea(v), M = String(v.header ?? "").trim();
  if (E === "TEXT" && M) {
    const Y = nt(M, x);
    x = Y.varOrder;
    const D = ct(x, r.exampleData);
    $.push({
      type: "HEADER",
      format: "TEXT",
      text: Y.text,
      ...D.length ? { example: { header_text: D } } : {}
    });
  } else E && E !== "TEXT" && ($.push({ type: "HEADER", format: E }), v.media_url || m.push(`Header format ${E} selected but media_url is empty.`));
  const P = String(v.body ?? "").trim(), z = nt(P, x);
  x = z.varOrder;
  const J = ct(x, r.exampleData);
  $.push({
    type: "BODY",
    text: z.text,
    ...J.length ? { example: { body_text: [J] } } : {}
  });
  const W = String(v.footer ?? "").trim();
  W && $.push({
    type: "FOOTER",
    text: W
  });
  const ie = Array.isArray(v.buttons) ? v.buttons : [];
  if (ie.length) {
    const Y = ta(ie, x);
    x = Y.varOrder, m.push(...Y.warnings), Y.buttons.length && $.push({ type: "BUTTONS", buttons: Y.buttons });
  }
  const K = String(v.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(K) && m.push(`template_type="${K}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: h,
      category: w,
      language: C,
      components: $
    },
    warnings: m
  };
}
function mt(a, r = {}) {
  var M, P, z, J;
  const m = aa(a, r), v = a.message, $ = m.payload.components.find((W) => W.type === "HEADER"), h = m.payload.components.find((W) => W.type === "BODY"), w = m.payload.components.find((W) => W.type === "FOOTER"), C = m.payload.components.find((W) => W.type === "BUTTONS"), x = (() => {
    const W = String(v.template_type ?? "").trim().toLowerCase();
    return W === "image" ? "IMAGE" : W === "video" ? "VIDEO" : W === "document" ? "DOCUMENT" : "TEXT";
  })();
  return { payload: {
    elementName: m.payload.name,
    languageCode: m.payload.language,
    category: m.payload.category,
    templateType: x,
    content: (h == null ? void 0 : h.text) ?? "",
    ...($ == null ? void 0 : $.format) === "TEXT" && $.text ? { header: $.text } : {},
    ...w != null && w.text ? { footer: w.text } : {},
    ...(M = C == null ? void 0 : C.buttons) != null && M.length ? {
      buttons: C.buttons.map((W) => ({
        type: W.type,
        title: W.text,
        ...W.url ? { url: W.url } : {},
        ...W.phone_number ? { phoneNumber: W.phone_number } : {}
      }))
    } : {},
    ...(J = (z = (P = h == null ? void 0 : h.example) == null ? void 0 : P.body_text) == null ? void 0 : z[0]) != null && J.length ? { example: h.example.body_text[0] } : {},
    metaTemplate: m.payload,
    ...pt(v) ? { advanced: pt(v) } : {}
  }, warnings: m.warnings };
}
function Me(a, r) {
  return a.length <= r ? { text: a, truncated: !1 } : { text: a.slice(0, Math.max(0, r - 3)) + "...", truncated: !0 };
}
const Ye = Ge.android;
function sa(a) {
  const { title: r, body: m } = a, v = Me(r || "", Ye.title), $ = Me(m || "", Ye.body);
  return {
    title: v.text,
    body: $.text,
    imageUrl: a.imageUrl,
    titleTruncated: v.truncated,
    bodyTruncated: $.truncated,
    expanded: !1
  };
}
function na(a) {
  const { title: r, body: m } = a, v = Me(r || "", Ye.title), $ = Me(m || "", Ye.body);
  return {
    title: v.text,
    body: $.text,
    imageUrl: a.imageUrl,
    titleTruncated: v.truncated,
    bodyTruncated: $.truncated,
    expanded: !0
  };
}
function la(a, r = {}) {
  const m = r.expanded ? na(a) : sa(a);
  return r.darkMode !== void 0 && (m.darkMode = r.darkMode), m;
}
const vt = Ge.ios;
function Pt(a) {
  const { title: r, body: m } = a, v = Me(r || "", vt.title), $ = Me(m || "", vt.body);
  return {
    title: v.text,
    body: $.text,
    imageUrl: a.imageUrl,
    titleTruncated: v.truncated,
    bodyTruncated: $.truncated,
    expanded: !1
  };
}
function oa(a) {
  return Pt(a);
}
function ia(a, r = {}) {
  const m = r.variant === "lockscreen" ? oa(a) : Pt(a);
  return r.darkMode !== void 0 && (m.darkMode = r.darkMode), m;
}
const bt = Ge.web;
function ft(a) {
  const { title: r, body: m } = a, v = Me(r || "", bt.title), $ = Me(m || "", bt.body);
  return {
    title: v.text,
    body: $.text,
    imageUrl: a.imageUrl,
    titleTruncated: v.truncated,
    bodyTruncated: $.truncated
  };
}
function ra(a) {
  return a.map((r) => ({ message: r, severity: "error" }));
}
function Ze(a) {
  return JSON.parse(JSON.stringify(a));
}
function Je(a = {}) {
  const r = ae(
    Bt(a.initial ?? jt())
  ), m = a.hooks ?? {}, v = ae(!1), $ = ae([]);
  Ce(
    r,
    () => {
      if (!m.customValidators) {
        $.value = [];
        return;
      }
      m.customValidators(r.value).then((R) => {
        $.value = R;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const h = ae([]), w = ae([]);
  function C() {
    const R = Ze(r.value);
    h.value = [...h.value.slice(-19), R], w.value = [];
  }
  const x = y(() => h.value.length > 0), E = y(() => w.value.length > 0);
  function M() {
    h.value.length !== 0 && (w.value = [Ze(r.value), ...w.value], r.value = h.value[h.value.length - 1], h.value = h.value.slice(0, -1));
  }
  function P() {
    w.value.length !== 0 && (h.value = [...h.value, Ze(r.value)], r.value = w.value[0], w.value = w.value.slice(1));
  }
  Ce(
    r,
    () => {
      var R;
      v.value = !0, (R = a.onDirty) == null || R.call(a);
    },
    { deep: !0 }
  );
  const z = y(() => Rt(r.value));
  function J(R) {
    const le = Gt(r.value, R), Z = ra($.value), O = [...Jt(le), ...Z], ve = [...le.errors, ...Z], de = le.valid && Z.length === 0;
    return {
      ...le,
      errors: ve,
      valid: de,
      blockingErrors: O,
      warnings: Xt(le)
    };
  }
  function W(R) {
    C(), r.value = { ...r.value, ...R };
  }
  function ie(R) {
    C(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...R }
    };
  }
  function K(R) {
    C(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...R }
    };
  }
  function Y(R) {
    C(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...R }
    };
  }
  function D(R) {
    C(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...R } : { campaign_name: "", tags: [], ab_test: !1, ...R }
    };
  }
  function oe(R) {
    C(), r.value = {
      ...r.value,
      message: { ...it(), ...R }
    };
  }
  function be(R) {
    C(), r.value = {
      ...r.value,
      delivery: { ...rt(), ...R }
    };
  }
  function ye(R) {
    C(), r.value = {
      ...r.value,
      tracking: { ...dt(), ...R }
    };
  }
  function ce(R) {
    C(), r.value = {
      ...r.value,
      audience: { ...ot(), ...R }
    };
  }
  const ee = y(() => ({
    title: r.value.message.title,
    body: r.value.message.body,
    imageUrl: r.value.message.image_url
  }));
  function G(R, le) {
    const Z = ee.value;
    let O;
    switch (R) {
      case "android":
        O = la(Z, { expanded: le == null ? void 0 : le.expanded });
        break;
      case "ios":
        O = ia(Z);
        break;
      case "web":
        O = ft(Z);
        break;
      default:
        O = ft(Z);
    }
    const ve = r.value.message.actions ?? [], de = r.value.message.location;
    return { ...O, actions: ve, location: de ?? void 0 };
  }
  const f = Ge;
  async function I() {
    return m.customValidators ? m.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: v,
    validation: z,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: $,
    getValidationWithWarnings: J,
    update: W,
    updateAudience: ie,
    updateMessage: K,
    updateDelivery: Y,
    updateTracking: D,
    undo: M,
    redo: P,
    canUndo: x,
    canRedo: E,
    resetMessage: oe,
    resetDelivery: be,
    resetTracking: ye,
    resetAudience: ce,
    getPreview: G,
    previewInput: ee,
    characterLimits: f,
    runCustomValidators: I,
    hooks: m
  };
}
const da = "keos-draft", ua = 2e3;
function ca(a, r) {
  return `${da}-${a}-${r}`;
}
function Xe(a, r) {
  const m = r.channel, v = y(
    () => {
      var M, P;
      return ca(
        m,
        r.key ?? ((M = a.value) == null ? void 0 : M.id) ?? ((P = a.value) == null ? void 0 : P.name) ?? "draft"
      );
    }
  ), $ = ae(null);
  let h = null;
  function w() {
    try {
      const M = JSON.stringify(a.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(v.value, M), $.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(v.value);
    } catch {
    }
  }
  function x() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const M = window.localStorage.getItem(v.value);
      if (!M) return null;
      const P = JSON.parse(M);
      return Bt(P);
    } catch {
      return null;
    }
  }
  function E() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return Ce(
    a,
    () => {
      E() && (h && clearTimeout(h), h = setTimeout(() => {
        h = null, w();
      }, ua));
    },
    { deep: !0 }
  ), {
    lastSavedAt: $,
    clearDraft: C,
    getDraft: x,
    persist: w
  };
}
const pa = { class: "kb-header__row" }, ma = ["value"], va = { class: "kb-header__actions" }, ba = ["disabled"], fa = ["disabled"], ga = ["value"], ya = ["value"], ha = /* @__PURE__ */ _e({
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
  setup(a, { emit: r }) {
    const m = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], v = a, $ = r, h = () => !!(v.campaignName || "").trim();
    function w(E) {
      return v.slugifyName ? E.trim().replace(/\s+/g, "-") : E;
    }
    function C(E) {
      return E.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function x(E) {
      const M = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return M[E] ?? M.draft;
    }
    return (E, M) => (s(), n("header", {
      class: "kb-header",
      style: pe({
        padding: `${g(ue)[16]}px 0`,
        borderBottom: `1px solid ${g(fe).neutral.border}`,
        marginBottom: `${g(ue)[16]}px`
      })
    }, [
      e("div", pa, [
        e("div", {
          class: re(["kb-header__name-section", { "kb-header__name-section--filled": h() }])
        }, [
          M[4] || (M[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: a.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: M[0] || (M[0] = (P) => $("update:campaignName", w(P.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, ma),
          M[5] || (M[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", va, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !a.canUndo,
            onClick: M[1] || (M[1] = (P) => $("undo"))
          }, " Undo ", 8, ba),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !a.canRedo,
            onClick: M[2] || (M[2] = (P) => $("redo"))
          }, " Redo ", 8, fa)
        ]),
        a.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: a.workflowStatus,
          class: "kb-header__status-select",
          style: pe({
            padding: `${g(ue)[4]}px ${g(ue)[8]}px`,
            borderRadius: `${g(Ve).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...x(a.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: M[3] || (M[3] = (P) => $("update:workflowStatus", P.target.value))
        }, [
          (s(), n(q, null, j(m, (P) => e("option", {
            key: P.value,
            value: P.value
          }, u(P.label), 9, ya)), 64))
        ], 44, ga)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: pe({
            padding: `${g(ue)[4]}px ${g(ue)[8]}px`,
            borderRadius: `${g(Ve).input}px`,
            background: g(fe).neutral.bg,
            fontSize: "0.8125rem",
            color: g(fe).neutral.textMuted
          })
        }, u(a.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: pe({ fontSize: "0.8125rem", color: g(fe).neutral.textMuted, marginTop: `${g(ue)[4]}px` })
      }, [
        a.saving ? (s(), n(q, { key: 0 }, [
          X("Saving…")
        ], 64)) : a.dirty ? (s(), n(q, { key: 1 }, [
          X("Unsaved changes")
        ], 64)) : a.lastSavedAt ? (s(), n(q, { key: 2 }, [
          X("Last saved at " + u(C(a.lastSavedAt)), 1)
        ], 64)) : _("", !0)
      ], 4)
    ], 4));
  }
}), $e = (a, r) => {
  const m = a.__vccOpts || a;
  for (const [v, $] of r)
    m[v] = $;
  return m;
}, Qe = /* @__PURE__ */ $e(ha, [["__scopeId", "data-v-56efb3ec"]]), ka = { class: "kb-section" }, _a = { class: "kb-section__head" }, wa = { class: "kb-section__desc" }, $a = { class: "kb-field" }, xa = { class: "kb-label" }, Ca = { class: "kb-field-with-rail" }, Sa = ["value", "aria-invalid", "aria-describedby"], Ia = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, Aa = { class: "kb-field" }, Ta = { class: "kb-label" }, La = { class: "kb-field-with-rail" }, Ba = ["value", "aria-invalid", "aria-describedby"], Ua = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, Ra = { class: "kb-field" }, Pa = ["value", "aria-invalid", "aria-describedby"], Ea = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Oa = { class: "kb-field" }, Na = ["value", "aria-invalid", "aria-describedby"], Va = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Ma = { class: "kb-field" }, Da = { class: "kb-location-row" }, Wa = ["value"], Ha = ["value"], za = ["value"], Fa = ["value"], qa = { class: "kb-field" }, ja = { class: "kb-actions-list" }, Ka = ["value", "onInput"], Ya = ["value", "onInput"], Ga = ["onClick"], Ja = ["disabled"], Xa = { class: "kb-action-chips" }, Qa = ["disabled", "onClick"], Za = /* @__PURE__ */ _e({
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
  setup(a) {
    const r = a;
    return (m, v) => {
      var $, h, w, C;
      return s(), n("section", ka, [
        e("div", _a, [
          v[10] || (v[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: v[0] || (v[0] = (x) => m.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", wa, " Message body is required. Title is optional. Character limits depend on the selected platform (" + u(a.selectedPlatform) + "). ", 1),
        e("div", $a, [
          e("label", xa, [
            v[11] || (v[11] = X(" Title ", -1)),
            e("span", {
              class: re(["kb-counter", { "kb-counter--warn": a.titleCount > a.titleLimit }])
            }, u(a.titleCount) + "/" + u(a.titleLimit), 3)
          ]),
          e("div", Ca, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: a.message.title,
              "aria-invalid": !!a.titleError,
              "aria-describedby": a.titleError ? "title-error" : void 0,
              onInput: v[1] || (v[1] = (x) => m.$emit("update", { title: x.target.value }))
            }, null, 40, Sa),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: pe({ "--pct": Math.min(100, a.titleCount / a.titleLimit * 100) + "%" })
            }, [...v[12] || (v[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.titleError ? (s(), n("p", Ia, u(a.titleError), 1)) : _("", !0)
        ]),
        e("div", Aa, [
          e("label", Ta, [
            v[13] || (v[13] = X(" Message ", -1)),
            e("span", {
              class: re(["kb-counter", { "kb-counter--warn": a.bodyCount > a.bodyLimit }])
            }, u(a.bodyCount) + "/" + u(a.bodyLimit), 3)
          ]),
          e("div", La, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: a.message.body,
              "aria-invalid": !!a.bodyError,
              "aria-describedby": a.bodyError ? "body-error" : void 0,
              onInput: v[2] || (v[2] = (x) => m.$emit("update", { body: x.target.value }))
            }, null, 40, Ba),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: pe({ "--pct": Math.min(100, a.bodyCount / a.bodyLimit * 100) + "%" })
            }, [...v[14] || (v[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.bodyError ? (s(), n("p", Ua, u(a.bodyError), 1)) : _("", !0)
        ]),
        e("div", Ra, [
          v[15] || (v[15] = e("label", { class: "kb-label" }, [
            X(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: a.message.image_url,
            "aria-invalid": !!a.imageUrlError,
            "aria-describedby": a.imageUrlError ? "image-url-error" : void 0,
            onInput: v[3] || (v[3] = (x) => m.$emit("update", { image_url: x.target.value || void 0 }))
          }, null, 40, Pa),
          a.imageUrlError ? (s(), n("p", Ea, u(a.imageUrlError), 1)) : _("", !0)
        ]),
        e("div", Oa, [
          v[16] || (v[16] = e("label", { class: "kb-label" }, [
            X(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: a.message.deep_link,
            "aria-invalid": !!a.deepLinkError,
            "aria-describedby": a.deepLinkError ? "deeplink-error" : void 0,
            onInput: v[4] || (v[4] = (x) => m.$emit("update", { deep_link: x.target.value || void 0 }))
          }, null, 40, Na),
          a.deepLinkError ? (s(), n("p", Va, u(a.deepLinkError), 1)) : _("", !0)
        ]),
        e("div", Ma, [
          v[17] || (v[17] = e("label", { class: "kb-label" }, [
            X(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Da, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: (($ = a.message.location) == null ? void 0 : $.lat) ?? "",
              onInput: v[5] || (v[5] = (x) => {
                const E = { ...a.message.location ?? {} }, M = x.target.value;
                E.lat = M === "" ? void 0 : Number(M), m.$emit("update", { location: E });
              })
            }, null, 40, Wa),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((h = a.message.location) == null ? void 0 : h.lon) ?? "",
              onInput: v[6] || (v[6] = (x) => {
                const E = { ...a.message.location ?? {} }, M = x.target.value;
                E.lon = M === "" ? void 0 : Number(M), m.$emit("update", { location: E });
              })
            }, null, 40, Ha)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((w = a.message.location) == null ? void 0 : w.name) ?? "",
            onInput: v[7] || (v[7] = (x) => {
              const E = { ...a.message.location ?? {} };
              E.name = x.target.value || void 0, m.$emit("update", { location: E });
            })
          }, null, 40, za),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((C = a.message.location) == null ? void 0 : C.address) ?? "",
            onInput: v[8] || (v[8] = (x) => {
              const E = { ...a.message.location ?? {} };
              E.address = x.target.value || void 0, m.$emit("update", { location: E });
            })
          }, null, 40, Fa)
        ]),
        e("div", qa, [
          v[19] || (v[19] = e("label", { class: "kb-label" }, [
            X(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", ja, [
            (s(!0), n(q, null, j(r.message.actions ?? [], (x, E) => (s(), n("div", {
              key: x.id || E,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: x.label,
                onInput: (M) => {
                  var J;
                  const P = [...r.message.actions ?? []], z = Number(E);
                  P[z] = {
                    ...P[z],
                    id: ((J = P[z]) == null ? void 0 : J.id) || `action_${z + 1}`,
                    label: M.target.value
                  }, m.$emit("update", { actions: P });
                }
              }, null, 40, Ka),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: x.url,
                onInput: (M) => {
                  var J;
                  const P = [...r.message.actions ?? []], z = Number(E);
                  P[z] = {
                    ...P[z],
                    id: ((J = P[z]) == null ? void 0 : J.id) || `action_${z + 1}`,
                    url: M.target.value || void 0
                  }, m.$emit("update", { actions: P });
                }
              }, null, 40, Ya),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const M = [...r.message.actions ?? []];
                  M.splice(Number(E), 1), m.$emit("update", { actions: M });
                }
              }, " Remove ", 8, Ga)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: v[9] || (v[9] = () => {
                const x = [...r.message.actions ?? []];
                x.push({
                  id: `action_${x.length + 1}`,
                  label: "",
                  url: ""
                }), m.$emit("update", { actions: x });
              })
            }, " Add action ", 8, Ja),
            e("div", Xa, [
              v[18] || (v[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (s(), n(q, null, j(["View order", "Track shipment", "Open app"], (x) => e("button", {
                key: x,
                type: "button",
                class: "kb-action-chip",
                disabled: (r.message.actions ?? []).length >= 3,
                onClick: () => {
                  const E = [...r.message.actions ?? []];
                  E.push({
                    id: `action_${Date.now()}`,
                    label: x,
                    url: ""
                  }), m.$emit("update", { actions: E });
                }
              }, u(x), 9, Qa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), es = /* @__PURE__ */ $e(Za, [["__scopeId", "data-v-88ad2281"]]), ts = { class: "kb-section kb-section--inline-personalization" }, as = { class: "kb-field" }, ss = { class: "kb-insert-row" }, ns = ["value"], ls = { class: "kb-field" }, os = { class: "kb-insert-row" }, is = { class: "kb-field" }, rs = { class: "kb-variable-list" }, ds = /* @__PURE__ */ _e({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(a, { emit: r }) {
    const m = a, v = r, $ = ["first_name", "last_name", "order_id", "city"], h = ae(m.variableOptions ?? $), w = ae(h.value[0] ?? $[0]), C = ae("");
    Ce(
      () => m.variableOptions,
      (P) => {
        P && P.length && (h.value = [...P], h.value.includes(w.value) || (w.value = h.value[0]));
      }
    );
    const x = y(() => h.value);
    function E(P) {
      v("insertVariable", { variable: w.value, field: P });
    }
    function M() {
      const P = C.value.trim();
      P && (h.value.includes(P) || (h.value = [...h.value, P]), w.value = P, C.value = "");
    }
    return (P, z) => (s(), n("section", ts, [
      z[8] || (z[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      z[9] || (z[9] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", as, [
        z[4] || (z[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", ss, [
          Ae(e("select", {
            "onUpdate:modelValue": z[0] || (z[0] = (J) => w.value = J),
            class: "kb-select"
          }, [
            (s(!0), n(q, null, j(x.value, (J) => (s(), n("option", {
              key: J,
              value: J
            }, u(J), 9, ns))), 128))
          ], 512), [
            [Pe, w.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z[1] || (z[1] = (J) => E("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z[2] || (z[2] = (J) => E("body"))
          }, "Into message")
        ])
      ]),
      e("div", ls, [
        z[5] || (z[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", os, [
          Ae(e("input", {
            "onUpdate:modelValue": z[3] || (z[3] = (J) => C.value = J),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [lt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: M
          }, " Add ")
        ])
      ]),
      e("div", is, [
        z[6] || (z[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        z[7] || (z[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", rs, [
          (s(!0), n(q, null, j(x.value, (J) => (s(), n("li", { key: J }, [
            e("code", null, "{{ ." + u(J) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Et = /* @__PURE__ */ $e(ds, [["__scopeId", "data-v-9d88edb5"]]), us = { class: "kb-section kb-section--template-type" }, cs = { class: "kb-field" }, ps = { class: "kb-radio-group" }, ms = { class: "kb-radio" }, vs = ["checked"], bs = { class: "kb-radio" }, fs = ["checked"], gs = /* @__PURE__ */ _e({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(a, { emit: r }) {
    const m = r;
    return (v, $) => (s(), n("section", us, [
      $[5] || ($[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      $[6] || ($[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", cs, [
        e("div", ps, [
          e("label", ms, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: a.templateType === "transactional",
              onChange: $[0] || ($[0] = (h) => m("update", "transactional"))
            }, null, 40, vs),
            $[2] || ($[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", bs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: a.templateType === "marketing",
              onChange: $[1] || ($[1] = (h) => m("update", "marketing"))
            }, null, 40, fs),
            $[3] || ($[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        $[4] || ($[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), ut = /* @__PURE__ */ $e(gs, [["__scopeId", "data-v-ff2e1bd8"]]), ys = { class: "kb-section" }, hs = { class: "kb-section__head" }, ks = { class: "kb-section__desc" }, _s = { class: "kb-field" }, ws = { class: "kb-radio-group" }, $s = { class: "kb-radio" }, xs = ["checked"], Cs = { class: "kb-radio" }, Ss = ["checked"], Is = {
  key: 0,
  class: "kb-field kb-row"
}, As = ["value"], Ts = ["value"], Ls = { class: "kb-field" }, Bs = ["value"], Us = ["value"], Rs = { class: "kb-field" }, Ps = ["value"], Es = ["value"], Os = { class: "kb-field" }, Ns = { class: "kb-checkbox" }, Vs = ["checked"], Ms = /* @__PURE__ */ _e({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a) {
    const r = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (m, v) => {
      var $;
      return s(), n("section", ys, [
        e("div", hs, [
          v[8] || (v[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: v[0] || (v[0] = (h) => m.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", ks, u(a.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", _s, [
          v[11] || (v[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", ws, [
            e("label", $s, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !a.delivery.scheduled_at,
                onChange: v[1] || (v[1] = (h) => m.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, xs),
              v[9] || (v[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Cs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!a.delivery.scheduled_at,
                onChange: v[2] || (v[2] = (h) => m.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Ss),
              v[10] || (v[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        a.delivery.scheduled_at ? (s(), n("div", Is, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: ($ = a.delivery.scheduled_at) == null ? void 0 : $.slice(0, 16),
            onInput: v[3] || (v[3] = (h) => m.$emit("update", { scheduled_at: h.target.value }))
          }, null, 40, As),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: a.delivery.timezone,
            onInput: v[4] || (v[4] = (h) => m.$emit("update", { timezone: h.target.value }))
          }, null, 40, Ts)
        ])) : _("", !0),
        a.showPushOptions ? (s(), n(q, { key: 1 }, [
          e("div", Ls, [
            v[12] || (v[12] = e("label", { class: "kb-label" }, [
              X(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.ttl,
              onChange: v[5] || (v[5] = (h) => m.$emit("update", { ttl: Number(h.target.value) }))
            }, [
              (s(!0), n(q, null, j(g(Ft), (h) => (s(), n("option", {
                key: h,
                value: h
              }, u(r[h] ?? h + "s"), 9, Us))), 128))
            ], 40, Bs)
          ]),
          e("div", Rs, [
            v[13] || (v[13] = e("label", { class: "kb-label" }, [
              X(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.priority,
              onChange: v[6] || (v[6] = (h) => m.$emit("update", { priority: h.target.value }))
            }, [
              (s(!0), n(q, null, j(g(At), (h) => (s(), n("option", {
                key: h,
                value: h
              }, u(h), 9, Es))), 128))
            ], 40, Ps)
          ]),
          e("div", Os, [
            e("label", Ns, [
              e("input", {
                type: "checkbox",
                checked: a.delivery.quiet_hours,
                onChange: v[7] || (v[7] = (h) => m.$emit("update", { quiet_hours: !a.delivery.quiet_hours }))
              }, null, 40, Vs),
              v[14] || (v[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : _("", !0)
      ]);
    };
  }
}), Ds = /* @__PURE__ */ $e(Ms, [["__scopeId", "data-v-5707a2a7"]]), Ws = { class: "kb-accordion" }, Hs = { class: "kb-accordion__body" }, zs = { class: "kb-field" }, Fs = ["value"], qs = { class: "kb-field" }, js = { class: "kb-checkbox" }, Ks = ["checked"], Ys = /* @__PURE__ */ _e({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(a) {
    return (r, m) => (s(), n("details", Ws, [
      m[4] || (m[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Hs, [
        e("div", zs, [
          m[2] || (m[2] = e("label", { class: "kb-label" }, [
            X(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: a.delivery.collapse_key,
            onInput: m[0] || (m[0] = (v) => r.$emit("update", { collapse_key: v.target.value || void 0 }))
          }, null, 40, Fs)
        ]),
        e("div", qs, [
          e("label", js, [
            e("input", {
              type: "checkbox",
              checked: a.delivery.silent_push,
              onChange: m[1] || (m[1] = (v) => r.$emit("update", { silent_push: !a.delivery.silent_push }))
            }, null, 40, Ks),
            m[3] || (m[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Gs = /* @__PURE__ */ $e(Ys, [["__scopeId", "data-v-699e4501"]]);
function Ne(a, r) {
  return !a || typeof a != "string" ? a : a.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, v) => {
    const h = String(v).trim().replace(/^\./, "");
    return h in r ? String(r[h]) : m;
  });
}
const De = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Js = { class: "kb-preview" }, Xs = { class: "kb-preview__toggle" }, Qs = { class: "kb-preview__mode" }, Zs = { class: "kb-preview__quality" }, en = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, tn = ["src"], an = { class: "kb-android-body-row" }, sn = { class: "kb-android-body-content" }, nn = {
  key: 0,
  class: "kb-android-title"
}, ln = {
  key: 1,
  class: "kb-android-text"
}, on = {
  key: 2,
  class: "kb-android-location-line"
}, rn = {
  key: 0,
  class: "kb-android-thumb"
}, dn = ["src"], un = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, cn = ["src"], pn = {
  key: 0,
  class: "kb-preview-map__caption"
}, mn = {
  key: 2,
  class: "kb-android-actions"
}, vn = {
  key: 3,
  class: "kb-preview-warning"
}, bn = { class: "kb-ios-banner" }, fn = { class: "kb-ios-content" }, gn = {
  key: 0,
  class: "kb-ios-title"
}, yn = {
  key: 1,
  class: "kb-ios-text"
}, hn = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, kn = ["src"], _n = {
  key: 0,
  class: "kb-preview-map__caption"
}, wn = {
  key: 4,
  class: "kb-ios-actions"
}, $n = {
  key: 5,
  class: "kb-preview-warning"
}, xn = {
  key: 0,
  class: "kb-ios-thumb"
}, Cn = ["src"], Sn = { class: "kb-web-toast" }, In = { class: "kb-web-body" }, An = {
  key: 0,
  class: "kb-web-title"
}, Tn = {
  key: 1,
  class: "kb-web-text"
}, Ln = {
  key: 3,
  class: "kb-web-image"
}, Bn = ["src"], Un = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Rn = ["src"], Pn = {
  key: 0,
  class: "kb-preview-map__caption"
}, En = {
  key: 0,
  class: "kb-web-actions"
}, On = {
  key: 1,
  class: "kb-preview-warning"
}, Nn = /* @__PURE__ */ _e({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(a) {
    const r = a, m = ae("shade"), v = ae("banner"), $ = ae("toast"), h = y(() => m.value === "expanded"), w = y(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? h.value : void 0
      })
    ), C = y(() => {
      const G = w.value;
      return r.previewProfile ? {
        ...G,
        title: Ne((G == null ? void 0 : G.title) ?? "", r.previewProfile.data),
        body: Ne((G == null ? void 0 : G.body) ?? "", r.previewProfile.data)
      } : G;
    }), x = {
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
    function E(G, f) {
      const I = (G ?? "").trim();
      return I ? I.length <= f ? I : `${I.slice(0, Math.max(0, f - 1)).trimEnd()}…` : "";
    }
    const M = y(() => r.selectedPlatform === "android" ? m.value : r.selectedPlatform === "ios" ? v.value : $.value), P = y(() => (x[r.selectedPlatform] ?? x.web)[M.value] ?? { title: 60, body: 160 }), z = y(
      () => {
        var G;
        return E((G = C.value) == null ? void 0 : G.title, P.value.title);
      }
    ), J = y(
      () => {
        var G;
        return E((G = C.value) == null ? void 0 : G.body, P.value.body);
      }
    ), W = { android: 3, ios: 4, web: 2 }, ie = y(
      () => {
        var G;
        return Array.isArray((G = C.value) == null ? void 0 : G.actions) ? C.value.actions : [];
      }
    ), K = y(
      () => ie.value.slice(0, W[r.selectedPlatform] ?? 2)
    ), Y = y(
      () => Math.max(0, ie.value.length - K.value.length)
    ), D = y(() => {
      var G;
      return (((G = r.message) == null ? void 0 : G.deep_link) ?? "").trim();
    }), oe = y(() => D.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(D.value) : !1), be = y(() => D.value ? D.value.length <= 40 ? D.value : `${D.value.slice(0, 37)}…` : ""), ye = y(() => {
      var f, I, R;
      const G = [];
      return (f = r.delivery) != null && f.priority && G.push(`Priority: ${r.delivery.priority}`), typeof ((I = r.delivery) == null ? void 0 : I.ttl) == "number" && G.push(`TTL: ${r.delivery.ttl}s`), (R = r.delivery) != null && R.silent_push && G.push("Silent push"), G;
    }), ce = y(() => {
      var Z;
      const G = (Z = C.value) == null ? void 0 : Z.location;
      if (!G || G.lat == null && G.lon == null) return null;
      const f = Number(G.lat) || 0, I = Number(G.lon) || 0, R = 8e-3, le = [I - R, f - R, I + R, f + R].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(le)}&layer=mapnik&marker=${f},${I}`;
    }), ee = y(() => {
      var f;
      const G = (f = C.value) == null ? void 0 : f.location;
      return G && (G.lat != null || G.lon != null || G.name || G.address);
    });
    return (G, f) => {
      var I, R, le, Z, O, ve, de, we, ge, N, k, L, Q, se, me, ne;
      return s(), n("div", Js, [
        e("div", Xs, [
          e("label", Qs, [
            f[6] || (f[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            a.selectedPlatform === "android" ? Ae((s(), n("select", {
              key: 0,
              "onUpdate:modelValue": f[0] || (f[0] = (te) => m.value = te),
              class: "kb-preview__mode-select"
            }, [...f[3] || (f[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Pe, m.value]
            ]) : a.selectedPlatform === "ios" ? Ae((s(), n("select", {
              key: 1,
              "onUpdate:modelValue": f[1] || (f[1] = (te) => v.value = te),
              class: "kb-preview__mode-select"
            }, [...f[4] || (f[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Pe, v.value]
            ]) : Ae((s(), n("select", {
              key: 2,
              "onUpdate:modelValue": f[2] || (f[2] = (te) => $.value = te),
              class: "kb-preview__mode-select"
            }, [...f[5] || (f[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Pe, $.value]
            ])
          ]),
          e("div", Zs, [
            (s(!0), n(q, null, j(ye.value, (te) => (s(), n("span", {
              key: te,
              class: "kb-preview__badge"
            }, u(te), 1))), 128))
          ])
        ]),
        a.selectedPlatform === "android" ? (s(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: re(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${m.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          f[9] || (f[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: re(["kb-android-notification", { "kb-android-notification--expanded": h.value }])
          }, [
            f[8] || (f[8] = He('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: re(["kb-android-body", { "kb-android-body--expanded": h.value }])
            }, [
              h.value && C.value.imageUrl ? (s(), n("div", en, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, tn)
              ])) : _("", !0),
              e("div", an, [
                e("div", sn, [
                  z.value ? (s(), n("div", nn, u(z.value), 1)) : _("", !0),
                  J.value ? (s(), n("div", ln, u(J.value), 1)) : _("", !0),
                  ee.value && !h.value && ((I = C.value.location) != null && I.name || (R = C.value.location) != null && R.address) ? (s(), n("div", on, [
                    f[7] || (f[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    X(" " + u(((le = C.value.location) == null ? void 0 : le.name) || ((Z = C.value.location) == null ? void 0 : Z.address)), 1)
                  ])) : _("", !0),
                  D.value ? (s(), n("div", {
                    key: 3,
                    class: re(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
                  }, u(oe.value ? be.value : "Invalid deep link format"), 3)) : _("", !0)
                ]),
                !h.value && C.value.imageUrl ? (s(), n("div", rn, [
                  e("img", {
                    src: C.value.imageUrl,
                    alt: ""
                  }, null, 8, dn)
                ])) : _("", !0)
              ]),
              ee.value && ce.value && h.value ? (s(), n("div", un, [
                e("iframe", {
                  src: ce.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, cn),
                (O = C.value.location) != null && O.name || (ve = C.value.location) != null && ve.address ? (s(), n("div", pn, u(((de = C.value.location) == null ? void 0 : de.name) || ((we = C.value.location) == null ? void 0 : we.address)), 1)) : _("", !0)
              ])) : _("", !0),
              K.value.length ? (s(), n("div", mn, [
                (s(!0), n(q, null, j(K.value, (te) => (s(), n("button", {
                  key: te.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, u(te.label || "Action"), 1))), 128))
              ])) : _("", !0),
              Y.value > 0 ? (s(), n("p", vn, " Showing " + u(K.value.length) + " of " + u(ie.value.length) + " actions on " + u(a.selectedPlatform) + ". ", 1)) : _("", !0)
            ], 2)
          ], 2)
        ], 2)) : a.selectedPlatform === "ios" ? (s(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: re(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${v.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          f[12] || (f[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", bn, [
            f[11] || (f[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", fn, [
              f[10] || (f[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              z.value ? (s(), n("div", gn, u(z.value), 1)) : _("", !0),
              J.value ? (s(), n("div", yn, u(J.value), 1)) : _("", !0),
              D.value ? (s(), n("div", {
                key: 2,
                class: re(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
              }, u(oe.value ? be.value : "Invalid deep link format"), 3)) : _("", !0),
              ee.value && ce.value ? (s(), n("div", hn, [
                e("iframe", {
                  src: ce.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, kn),
                (ge = C.value.location) != null && ge.name || (N = C.value.location) != null && N.address ? (s(), n("div", _n, u(((k = C.value.location) == null ? void 0 : k.name) || ((L = C.value.location) == null ? void 0 : L.address)), 1)) : _("", !0)
              ])) : _("", !0),
              K.value.length ? (s(), n("div", wn, [
                (s(!0), n(q, null, j(K.value, (te) => (s(), n("button", {
                  key: te.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, u(te.label || "Action"), 1))), 128))
              ])) : _("", !0),
              Y.value > 0 ? (s(), n("p", $n, " Showing " + u(K.value.length) + " of " + u(ie.value.length) + " actions on " + u(a.selectedPlatform) + ". ", 1)) : _("", !0)
            ]),
            C.value.imageUrl ? (s(), n("div", xn, [
              e("img", {
                src: C.value.imageUrl,
                alt: ""
              }, null, 8, Cn)
            ])) : _("", !0)
          ])
        ], 2)) : (s(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: re(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${$.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          f[14] || (f[14] = He('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", Sn, [
            f[13] || (f[13] = He('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", In, [
              z.value ? (s(), n("div", An, u(z.value), 1)) : _("", !0),
              J.value ? (s(), n("div", Tn, u(J.value), 1)) : _("", !0),
              D.value ? (s(), n("div", {
                key: 2,
                class: re(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
              }, u(oe.value ? be.value : "Invalid deep link format"), 3)) : _("", !0),
              C.value.imageUrl ? (s(), n("div", Ln, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, Bn)
              ])) : _("", !0),
              ee.value && ce.value ? (s(), n("div", Un, [
                e("iframe", {
                  src: ce.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Rn),
                (Q = C.value.location) != null && Q.name || (se = C.value.location) != null && se.address ? (s(), n("div", Pn, u(((me = C.value.location) == null ? void 0 : me.name) || ((ne = C.value.location) == null ? void 0 : ne.address)), 1)) : _("", !0)
              ])) : _("", !0)
            ]),
            K.value.length ? (s(), n("div", En, [
              (s(!0), n(q, null, j(K.value, (te, he) => (s(), n("button", {
                key: te.id || he,
                type: "button",
                class: re(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(he) > 0 }])
              }, u(te.label || "Action"), 3))), 128))
            ])) : _("", !0),
            Y.value > 0 ? (s(), n("p", On, " Showing " + u(K.value.length) + " of " + u(ie.value.length) + " actions on " + u(a.selectedPlatform) + ". ", 1)) : _("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Vn = /* @__PURE__ */ $e(Nn, [["__scopeId", "data-v-4fc616d9"]]), Mn = { class: "kb-version-dialog" }, Dn = {
  key: 0,
  class: "kb-version-empty"
}, Wn = {
  key: 1,
  class: "kb-version-list"
}, Hn = { class: "kb-version-item-label" }, zn = ["onClick"], Fn = { class: "kb-version-actions" }, qn = /* @__PURE__ */ _e({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(a, { emit: r }) {
    const m = r;
    function v($) {
      try {
        return new Date($).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return $;
      }
    }
    return ($, h) => a.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: h[1] || (h[1] = Wt((w) => m("close"), ["escape"]))
    }, [
      e("div", Mn, [
        h[2] || (h[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        h[3] || (h[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        a.versions.length === 0 ? (s(), n("div", Dn, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", Wn, [
          (s(!0), n(q, null, j(a.versions, (w) => (s(), n("li", {
            key: w.id,
            class: "kb-version-item"
          }, [
            e("span", Hn, u(w.label || v(w.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                m("restore", w.snapshot), m("close");
              }
            }, " Restore ", 8, zn)
          ]))), 128))
        ])),
        e("div", Fn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: h[0] || (h[0] = (w) => m("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : _("", !0);
  }
}), Ot = /* @__PURE__ */ $e(qn, [["__scopeId", "data-v-ce35a513"]]), gt = [
  {
    id: "simple-alert",
    label: "Simple alert",
    campaign: {
      message: {
        title: "Heads up",
        body: "Your update is ready.",
        variables: []
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
        variables: ["first_name", "order_id"]
      }
    }
  },
  {
    id: "location-alert",
    label: "Location / Store nearby",
    campaign: {
      message: {
        title: "We're nearby",
        body: "Visit our store - tap to open in maps.",
        variables: [],
        location: {
          lat: 6.5244,
          lon: 3.3792,
          name: "Flagship Store",
          address: "12 Marina Rd, Lagos"
        }
      }
    }
  }
], jn = [
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
        template_name: "wa_text_simple"
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
        template_name: "wa_text_complex",
        header_type: "text",
        header: "Order update",
        footer: "Reply STOP to unsubscribe",
        buttons: [
          { id: "btn_1", label: "Track order", type: "url", url: "https://example.com/orders/{{ .order_id }}" },
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
        template_name: "wa_image_simple",
        header_type: "image",
        media_url: "https://via.placeholder.com/600x400.png?text=New+Collection"
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
        template_name: "wa_image_complex",
        header_type: "image",
        header: "Weekend flash sale",
        media_url: "https://via.placeholder.com/600x400.png?text=Flash+Sale",
        footer: "Offer valid while stock lasts",
        buttons: [
          { id: "btn_1", label: "View deals", type: "url", url: "https://example.com/deals" },
          { id: "btn_2", label: "Not interested", type: "opt_out" }
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
        header_type: "video",
        template_name: "wa_video_simple",
        media_url: "https://example.com/product-teaser.mp4"
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
        header_type: "video",
        template_name: "wa_video_complex",
        header: "Live product walkthrough",
        media_url: "https://example.com/live-walkthrough.mp4",
        footer: "Spots are limited",
        buttons: [
          { id: "btn_1", label: "Book slot", type: "url", url: "https://example.com/book-demo" },
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
        header_type: "document",
        template_name: "wa_document_simple",
        document_filename: "invoice.pdf",
        media_url: "https://example.com/invoice.pdf"
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
        header_type: "document",
        template_name: "wa_document_complex",
        document_filename: "receipt-{{ .order_id }}.pdf",
        media_url: "https://example.com/receipt.pdf",
        footer: "For questions, reply to this message",
        buttons: [
          { id: "btn_1", label: "Download again", type: "url", url: "https://example.com/receipt/{{ .order_id }}" },
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
        template_name: "wa_carousel_simple",
        cards: [
          {
            id: "card_1",
            title: "Starter Bundle",
            media_url: "https://via.placeholder.com/600x400.png?text=Starter",
            button_label: "View",
            button_url: "https://example.com/starter"
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
        template_name: "wa_carousel_complex",
        cards: [
          {
            id: "card_1",
            title: "Trail Sneakers",
            media_url: "https://via.placeholder.com/600x400.png?text=Sneakers",
            button_label: "Shop sneakers",
            button_url: "https://example.com/sneakers"
          },
          {
            id: "card_2",
            title: "City Backpack",
            media_url: "https://via.placeholder.com/600x400.png?text=Backpack",
            button_label: "Shop backpack",
            button_url: "https://example.com/backpack"
          },
          {
            id: "card_3",
            title: "Fitness Watch",
            media_url: "https://via.placeholder.com/600x400.png?text=Watch",
            button_label: "Shop watch",
            button_url: "https://example.com/watch"
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
        template_name: "wa_flow_simple",
        flow_id: "flow_support_v1",
        flow_cta_label: "Open flow"
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
        template_name: "wa_flow_complex",
        flow_id: "flow_booking_v2",
        flow_cta_label: "Start booking",
        footer: "Estimated completion time: 1 minute",
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
        template_name: "wa_lto_simple",
        lto_expiry: "Today, 11:59 PM"
      }
    }
  },
  {
    id: "wa-lto-complex",
    label: "Limited-time offer - Complex",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your exclusive deal expires soon. Don’t miss it.",
        variables: ["first_name"],
        template_type: "lto",
        template_category: "marketing",
        template_name: "wa_lto_complex",
        lto_expiry: "Today, 11:59 PM",
        header_type: "text",
        header: "Last chance offer",
        footer: "Terms apply",
        buttons: [{ id: "btn_1", label: "Claim now", type: "url", url: "https://example.com/claim" }]
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
        template_name: "wa_catalog_simple",
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
        template_name: "wa_catalog_complex",
        footer: "Updated daily",
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
        template_name: "wa_mpm_simple",
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
        template_name: "wa_mpm_complex",
        footer: "Prices subject to change",
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
    label: "Authentication - Simple",
    campaign: {
      message: {
        title: "",
        body: "Your code is {{ .otp_code }}. Valid for 10 minutes.",
        variables: ["otp_code"],
        template_type: "auth",
        template_category: "authentication",
        template_name: "wa_auth_simple",
        auth_type: "otp",
        auth_label: "Your verification code",
        auth_code: "123456"
      }
    }
  },
  {
    id: "wa-auth-complex",
    label: "Authentication - Complex",
    campaign: {
      message: {
        title: "",
        body: "Use {{ .otp_code }} to sign in. If this was not you, ignore this message.",
        variables: ["otp_code"],
        template_type: "auth",
        template_category: "authentication",
        template_name: "wa_auth_complex",
        auth_type: "login",
        auth_label: "Secure sign-in code",
        auth_code: "123456",
        footer: "Do not share this code"
      }
    }
  }
], yt = [
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
], ht = [
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
  }
], Kn = { class: "keos-notification-builder" }, Yn = { class: "kb-builder-top" }, Gn = { class: "kb-push-layout" }, Jn = { class: "kb-push-sidebar" }, Xn = {
  key: 0,
  class: "kb-push-form"
}, Qn = {
  key: 0,
  class: "kb-hint-card"
}, Zn = { class: "kb-push-form-head" }, el = { class: "kb-push-form-head-top" }, tl = { class: "kb-push-health-pill" }, al = { class: "kb-push-form-head-row" }, sl = ["value"], nl = { class: "kb-push-health" }, ll = { class: "kb-push-health-row" }, ol = { class: "kb-push-health-value" }, il = { class: "kb-push-health-bar" }, rl = {
  key: 1,
  class: "kb-push-form"
}, dl = { class: "kb-push-canvas" }, ul = {
  key: 0,
  class: "kb-push-test-banner"
}, cl = { class: "kb-push-preview-chrome" }, pl = { class: "kb-push-preview-controls" }, ml = { class: "kb-push-preview-as" }, vl = ["value"], bl = { class: "kb-preview-status" }, fl = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, gl = ["aria-selected", "aria-controls", "onClick"], yl = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, hl = { class: "kb-push-actions" }, kl = {
  key: 0,
  class: "kb-actions-note"
}, _l = { key: 0 }, wl = { class: "kb-push-actions-right" }, $l = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, xl = { class: "kb-confirm-dialog" }, Cl = { class: "kb-confirm-actions" }, Sl = /* @__PURE__ */ _e({
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
  setup(a, { emit: r }) {
    const m = a, v = r, $ = ae("android"), h = ae(""), w = ae(!1), C = ae(null), x = ae(!1), E = y(
      () => W.value.workflow_status ?? "draft"
    ), M = y(() => {
      const d = h.value;
      return d ? De.find((i) => i.id === d) ?? null : null;
    });
    function P(d) {
      const i = W.value, U = d.campaign.message ? { ...i.message, ...d.campaign.message } : i.message, S = d.campaign.delivery ? { ...i.delivery, ...d.campaign.delivery } : i.delivery;
      D({
        ...d.campaign,
        message: U,
        delivery: S
      }), C.value = null, w.value = !1;
    }
    function z(d) {
      const i = d.target.value;
      if (!i) return;
      const U = gt.find((S) => S.id === i);
      U && (ie.value ? (C.value = U, w.value = !0) : P(U), d.target.value = "");
    }
    function J(d) {
      W.value = d, x.value = !1;
    }
    const {
      campaign: W,
      dirty: ie,
      customValidatorErrors: K,
      getValidationWithWarnings: Y,
      update: D,
      updateMessage: oe,
      updateDelivery: be,
      undo: ye,
      redo: ce,
      canUndo: ee,
      canRedo: G,
      resetMessage: f,
      resetDelivery: I,
      getPreview: R,
      characterLimits: le,
      hooks: Z
    } = Je({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (d) => {
          var S, F, T, p;
          const i = [];
          (S = d.name) != null && S.trim() || i.push("Template name is required"), (T = (F = d.message) == null ? void 0 : F.body) != null && T.trim() || i.push("Message body is required");
          const U = (p = m.hooks) != null && p.customValidators ? await m.hooks.customValidators(d) : [];
          return [...i, ...U];
        }
      },
      onDirty: () => v("change", W.value)
    }), { lastSavedAt: O } = Xe(W, { channel: "push" });
    function ve(d) {
      (d.metaKey || d.ctrlKey) && d.key === "z" && (d.preventDefault(), d.shiftKey ? ce() : ye());
    }
    je(() => {
      window.addEventListener("keydown", ve);
    }), Ke(() => {
      window.removeEventListener("keydown", ve);
    }), Ce(W, (d) => v("update:modelValue", d), { deep: !0 });
    const de = ae(), we = ae(!0), ge = ae(!0);
    async function N() {
      if (Z.estimateReach)
        try {
          de.value = await Z.estimateReach(W.value.audience);
        } catch {
          de.value = void 0;
        }
      Z.canSend && (we.value = await Promise.resolve(Z.canSend())), Z.canSchedule && (ge.value = await Promise.resolve(Z.canSchedule()));
    }
    N(), Ce(() => W.value.audience, N, { deep: !0 });
    const k = y(() => (K.value, Y(de.value))), L = y(() => k.value.blockingErrors), Q = y(() => k.value.warnings), se = y(() => k.value.valid), me = y(() => {
      var S, F, T;
      const d = W.value.message, i = [
        !!((S = W.value.name) != null && S.trim()),
        !!((F = d.title) != null && F.trim()),
        !!((T = d.body) != null && T.trim()),
        !!(d.template_type ?? W.value.template_type),
        Array.isArray(d.actions) ? d.actions.length > 0 : !1
      ], U = i.filter(Boolean).length;
      return Math.round(U / i.length * 100);
    }), ne = y(() => me.value >= 90 ? "Production ready" : me.value >= 70 ? "Strong draft" : me.value >= 40 ? "In progress" : "Needs setup"), te = y(() => {
      const d = W.value.message;
      return !!((d.title ?? "").toString().trim() || (d.body ?? "").toString().trim() || Array.isArray(d.actions) && d.actions.length);
    }), he = y(
      () => le[$.value].title
    ), Te = y(() => le[$.value].body), Se = y(() => W.value.message.title.length), Le = y(() => W.value.message.body.length), Ee = y(() => {
      if (Se.value > he.value)
        return `Title exceeds ${he.value} characters for ${$.value}.`;
    }), Ie = y(() => {
      const d = L.value.find(
        (i) => i.message === "Message body is required"
      );
      if (d) return d.message;
      if (Le.value > Te.value)
        return `Body exceeds ${Te} characters for ${$.value}.`;
    }), Be = y(
      () => W.value.template_type ?? "transactional"
    );
    function Ue(d) {
      D({ template_type: d });
    }
    function c(d) {
      D({
        name: d,
        tracking: { ...W.value.tracking ?? {}, campaign_name: d }
      });
    }
    function b(d) {
      const i = ` {{ .${d.variable} }}`, U = W.value.message.variables ?? [], S = Array.from(/* @__PURE__ */ new Set([...U, d.variable]));
      d.field === "title" ? oe({
        title: W.value.message.title + i,
        variables: S
      }) : oe({
        body: W.value.message.body + i,
        variables: S
      });
    }
    function A() {
      se.value && v("save", W.value);
    }
    return (d, i) => {
      var U;
      return s(), n("div", Kn, [
        e("div", Yn, [
          xe(Qe, {
            "campaign-name": g(W).name,
            status: g(W).status,
            dirty: g(ie),
            "last-saved-at": g(O),
            "can-undo": g(ee),
            "can-redo": g(G),
            "workflow-status": E.value,
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": c,
            "onUpdate:workflowStatus": i[0] || (i[0] = (S) => g(D)({ workflow_status: S })),
            onUndo: g(ye),
            onRedo: g(ce)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          L.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: pe({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Ve).input}px`,
              padding: `${g(ue)[12]}px ${g(ue)[16]}px`,
              marginBottom: `${g(ue)[16]}px`
            })
          }, [
            e("ul", {
              style: pe({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (s(!0), n(q, null, j(L.value, (S) => (s(), n("li", {
                key: S.message
              }, u(S.message), 1))), 128))
            ], 4)
          ], 4)) : _("", !0)
        ]),
        e("div", Gn, [
          e("aside", Jn, [
            a.disabledSections.includes("message") ? _("", !0) : (s(), n("div", Xn, [
              !g(W).message.title && !g(W).message.body ? (s(), n("div", Qn, " Add a title and message below to get started. ")) : _("", !0),
              e("div", Zn, [
                e("div", el, [
                  i[12] || (i[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", tl, u(ne.value), 1)
                ]),
                e("div", al, [
                  xe(ut, {
                    "template-type": Be.value,
                    onUpdate: Ue
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: z
                  }, [
                    i[13] || (i[13] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(q, null, j(g(gt), (S) => (s(), n("option", {
                      key: S.id,
                      value: S.id
                    }, u(S.label), 9, sl))), 128))
                  ], 32)
                ]),
                e("div", nl, [
                  e("div", ll, [
                    i[14] || (i[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", ol, u(me.value) + "%", 1)
                  ]),
                  e("div", il, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: pe({ width: `${me.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              xe(es, {
                message: g(W).message,
                "title-count": Se.value,
                "body-count": Le.value,
                "title-limit": he.value,
                "body-limit": Te.value,
                "selected-platform": $.value,
                "show-reset": !0,
                "title-error": Ee.value,
                "body-error": Ie.value,
                onUpdate: g(oe),
                onReset: i[1] || (i[1] = (S) => g(f)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              xe(Et, {
                message: g(W).message,
                "variable-options": a.variableOptions,
                onUpdate: g(oe),
                onInsertVariable: b
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !a.designOnly && !a.disabledSections.includes("delivery") ? (s(), n("div", rl, [
              i[15] || (i[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              xe(Ds, {
                delivery: g(W).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: g(be),
                onReset: i[2] || (i[2] = (S) => g(I)())
              }, null, 8, ["delivery", "onUpdate"]),
              xe(Gs, {
                delivery: g(W).delivery,
                onUpdate: g(be)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : _("", !0)
          ]),
          e("main", dl, [
            !a.designOnly && g(W).audience.test_mode ? (s(), n("div", ul, [...i[16] || (i[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              X(" Test mode — only your test segment will receive this. ", -1)
            ])])) : _("", !0),
            e("div", cl, [
              e("div", pl, [
                e("label", ml, [
                  i[18] || (i[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ae(e("select", {
                    "onUpdate:modelValue": i[3] || (i[3] = (S) => h.value = S),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    i[17] || (i[17] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(q, null, j(g(De), (S) => (s(), n("option", {
                      key: S.id,
                      value: S.id
                    }, u(S.label), 9, vl))), 128))
                  ], 512), [
                    [Pe, h.value]
                  ])
                ]),
                e("div", bl, [
                  i[19] || (i[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u($.value), 1)
                ])
              ]),
              e("div", fl, [
                (s(), n(q, null, j(["android", "ios", "web"], (S) => e("button", {
                  key: S,
                  type: "button",
                  class: re(["kb-push-device-btn", { "kb-push-device-btn--active": $.value === S }]),
                  role: "tab",
                  "aria-selected": $.value === S,
                  "aria-controls": `kb-preview-panel-${S}`,
                  onClick: (F) => $.value = S
                }, u(S.toUpperCase()), 11, gl)), 64))
              ]),
              e("div", {
                class: re(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !te.value }])
              }, [
                !g(W).message.title && !g(W).message.body ? (s(), n("div", yl, [...i[20] || (i[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (s(), Ht(Vn, {
                  key: 1,
                  "get-preview": g(R),
                  "selected-platform": $.value,
                  "preview-profile": M.value,
                  message: g(W).message,
                  delivery: g(W).delivery,
                  "onUpdate:selectedPlatform": i[4] || (i[4] = (S) => $.value = S)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", hl, [
          Q.value.length > 0 ? (s(), n("div", kl, [
            i[21] || (i[21] = e("strong", null, "Warning:", -1)),
            X(" " + u((U = Q.value[0]) == null ? void 0 : U.message) + " ", 1),
            Q.value.length > 1 ? (s(), n("span", _l, " (+" + u(Q.value.length - 1) + " more) ", 1)) : _("", !0)
          ])) : _("", !0),
          e("div", wl, [
            !a.designOnly && a.showHistory ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: i[5] || (i[5] = (S) => x.value = !0)
            }, " Version history ")) : _("", !0),
            !a.designOnly && a.showSaveVersion ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: i[6] || (i[6] = (S) => v("save-version", JSON.parse(JSON.stringify(g(W)))))
            }, " Save as version ")) : _("", !0),
            a.showDuplicate ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: i[7] || (i[7] = (S) => v("duplicate", JSON.parse(JSON.stringify(g(W)))))
            }, " Duplicate ")) : _("", !0),
            a.showSave ? (s(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: A
            }, " Save ")) : _("", !0),
            a.showClose ? (s(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: i[8] || (i[8] = (S) => v("edit"))
            }, " Close ")) : _("", !0)
          ])
        ]),
        w.value ? (s(), n("div", $l, [
          e("div", xl, [
            i[22] || (i[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            i[23] || (i[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Cl, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: i[9] || (i[9] = (S) => {
                  w.value = !1, C.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: i[10] || (i[10] = (S) => C.value && P(C.value))
              }, " Replace ")
            ])
          ])
        ])) : _("", !0),
        xe(Ot, {
          open: x.value,
          versions: a.versions,
          onClose: i[11] || (i[11] = (S) => x.value = !1),
          onRestore: J
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Nt = /* @__PURE__ */ $e(Sl, [["__scopeId", "data-v-543f6763"]]), Il = { class: "kb-section" }, Al = { class: "kb-section__head" }, Tl = { class: "kb-summary-bar" }, Ll = { class: "kb-pill kb-pill--category" }, Bl = { class: "kb-pill kb-pill--format" }, Ul = { class: "kb-pill kb-pill--status" }, Rl = { class: "kb-field" }, Pl = ["value"], El = ["value", "disabled"], Ol = { class: "kb-field" }, Nl = { class: "kb-label" }, Vl = { class: "kb-helper" }, Ml = ["value"], Dl = ["value", "disabled"], Wl = { class: "kb-field" }, Hl = ["value"], zl = { class: "kb-field kb-field--inline kb-field--language-limits" }, Fl = { class: "kb-field-half" }, ql = ["value"], jl = { class: "kb-field" }, Kl = ["value"], Yl = {
  key: 0,
  class: "kb-field"
}, Gl = { class: "kb-label" }, Jl = ["value"], Xl = {
  key: 1,
  class: "kb-field"
}, Ql = ["value"], Zl = {
  key: 2,
  class: "kb-field"
}, eo = ["value"], to = {
  key: 3,
  class: "kb-field"
}, ao = ["value"], so = {
  key: 4,
  class: "kb-field"
}, no = ["value"], lo = {
  key: 5,
  class: "kb-field"
}, oo = ["value"], io = ["value"], ro = {
  key: 6,
  class: "kb-field"
}, uo = { class: "kb-wa-buttons" }, co = ["value", "onInput"], po = ["value", "onInput"], mo = ["value", "onInput"], vo = ["value", "onInput"], bo = ["onClick"], fo = ["disabled"], go = {
  key: 7,
  class: "kb-field"
}, yo = { class: "kb-wa-buttons" }, ho = ["value", "onInput"], ko = ["value", "onInput"], _o = ["onClick"], wo = {
  key: 8,
  class: "kb-field"
}, $o = ["value"], xo = ["value"], Co = { class: "kb-field" }, So = { class: "kb-label" }, Io = ["value"], Ao = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, To = { class: "kb-wa-fields-list" }, Lo = { class: "kb-wa-field-name" }, Bo = { class: "kb-wa-field-status" }, Uo = { class: "kb-field" }, Ro = ["value"], Po = {
  key: 10,
  class: "kb-field"
}, Eo = { class: "kb-wa-buttons" }, Oo = ["value", "onInput"], No = ["value", "onChange"], Vo = ["value", "onInput"], Mo = ["value", "onInput"], Do = {
  key: 2,
  class: "kb-opt-out-note"
}, Wo = ["onClick"], Ho = ["disabled"], et = 60, tt = 1024, at = 60, st = 10, kt = 10, zo = /* @__PURE__ */ _e({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(a, { emit: r }) {
    const m = a, v = r, $ = [
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
    ], h = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], w = y(() => m.message), C = y(() => w.value.template_type ?? "text"), x = y(() => w.value.header_type ?? "none"), E = y(() => String(w.value.header ?? "")), M = y(() => String(w.value.body ?? "")), P = y(() => String(w.value.footer ?? "")), z = y(() => w.value.buttons ?? []), J = y(() => w.value.products ?? []), W = y(() => w.value.cards ?? []), ie = y(() => {
      const N = $.find((k) => k.value === C.value);
      return (N == null ? void 0 : N.hint) ?? "Choose the approved WhatsApp template format.";
    }), K = y(() => {
      const N = String(w.value.template_category ?? "").trim();
      return N ? N.charAt(0).toUpperCase() + N.slice(1) : "Uncategorized";
    }), Y = y(() => {
      const N = $.find((k) => k.value === C.value);
      return (N == null ? void 0 : N.label) ?? "Text";
    }), D = y(() => w.value.template_name ? M.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), oe = y(() => new Set((m.disabledCategories ?? []).map((N) => String(N).trim()))), be = y(() => new Set((m.disabledFormats ?? []).map((N) => String(N).trim())));
    function ye(N) {
      if (!N || typeof N != "string") return [];
      const k = /\{\{\s*([^}]+?)\s*\}\}/g, L = /* @__PURE__ */ new Set();
      let Q;
      for (; (Q = k.exec(N)) !== null; ) L.add(Q[1].trim());
      return Array.from(L);
    }
    const ce = y(() => {
      const N = m.message.header ?? "", k = m.message.body ?? m.message.body ?? "", L = new Set(m.message.variables ?? []), Q = [...ye(N), ...ye(k)];
      return Array.from(new Set(Q)).map((me) => ({ name: me, configured: L.has(me) }));
    });
    function ee(N) {
      v("update", N);
    }
    function G(N) {
      const k = {
        template_category: N || void 0
      };
      N === "authentication" && C.value !== "auth" && (k.template_type = "auth"), ee(k);
    }
    function f(N) {
      const k = { template_type: N };
      N === "auth" && (k.template_category = "authentication"), N === "image" || N === "video" || N === "document" ? k.header_type = N : (x.value === "image" || x.value === "video" || x.value === "document") && (k.header_type = "none"), ee(k);
    }
    function I(N, k) {
      var Q;
      const L = [...z.value];
      L[N] = {
        ...L[N],
        id: ((Q = L[N]) == null ? void 0 : Q.id) || `btn_${N + 1}`,
        ...k
      }, ee({ buttons: L });
    }
    function R(N) {
      const k = [...z.value];
      k.splice(N, 1), ee({ buttons: k });
    }
    function le() {
      const N = [...z.value];
      N.push({ id: `btn_${N.length + 1}`, label: "", type: "quick_reply" }), ee({ buttons: N });
    }
    function Z(N, k) {
      var Q;
      const L = [...J.value];
      L[N] = {
        ...L[N],
        id: ((Q = L[N]) == null ? void 0 : Q.id) || `prod_${N + 1}`,
        ...k
      }, ee({ products: L });
    }
    function O(N) {
      const k = [...J.value];
      k.splice(N, 1), ee({ products: k });
    }
    function ve() {
      const N = [...J.value];
      N.push({ id: `prod_${N.length + 1}`, productId: "" }), ee({ products: N });
    }
    function de(N, k) {
      var Q;
      const L = [...W.value];
      L[N] = {
        ...L[N],
        id: ((Q = L[N]) == null ? void 0 : Q.id) || `card_${N + 1}`,
        ...k
      }, ee({ cards: L });
    }
    function we(N) {
      const k = [...W.value];
      k.splice(N, 1), ee({ cards: k });
    }
    function ge() {
      const N = [...W.value];
      N.push({
        id: `card_${N.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), ee({ cards: N });
    }
    return (N, k) => (s(), n("section", Il, [
      e("div", Al, [
        k[16] || (k[16] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: k[0] || (k[0] = (L) => N.$emit("reset"))
        }, " Reset section ")) : _("", !0)
      ]),
      k[42] || (k[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Tl, [
        e("span", Ll, u(K.value), 1),
        e("span", Bl, u(Y.value), 1),
        e("span", Ul, u(D.value), 1)
      ]),
      e("div", Rl, [
        k[18] || (k[18] = e("label", { class: "kb-label" }, [
          X(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: w.value.template_category ?? "",
          onChange: k[1] || (k[1] = (L) => G(L.target.value))
        }, [
          k[17] || (k[17] = e("option", { value: "" }, "Select category", -1)),
          (s(), n(q, null, j(h, (L) => e("option", {
            key: L.value,
            value: L.value,
            disabled: oe.value.has(L.value)
          }, u(L.label) + u(oe.value.has(L.value) ? " (Disabled)" : ""), 9, El)), 64))
        ], 40, Pl)
      ]),
      e("div", Ol, [
        e("label", Nl, [
          k[19] || (k[19] = X(" Functional format ", -1)),
          e("span", Vl, u(ie.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: C.value,
          onChange: k[2] || (k[2] = (L) => f(L.target.value))
        }, [
          (s(), n(q, null, j($, (L) => e("option", {
            key: L.value,
            value: L.value,
            disabled: be.value.has(L.value)
          }, u(L.label) + u(be.value.has(L.value) ? " (Disabled)" : ""), 9, Dl)), 64))
        ], 40, Ml)
      ]),
      e("div", Wl, [
        k[20] || (k[20] = e("label", { class: "kb-label" }, [
          X(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: w.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, Hl)
      ]),
      e("div", zl, [
        e("div", Fl, [
          k[21] || (k[21] = e("label", { class: "kb-label" }, [
            X(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: w.value.template_language ?? "",
            onInput: k[3] || (k[3] = (L) => ee({
              template_language: L.target.value || void 0
            }))
          }, null, 40, ql)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            k[22] || (k[22] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + u(et) + " chars"),
              e("li", null, "Body: " + u(tt) + " chars"),
              e("li", null, "Footer: " + u(at) + " chars"),
              e("li", null, "Buttons: up to " + u(st))
            ])
          ])
        ])
      ]),
      e("div", jl, [
        k[24] || (k[24] = e("label", { class: "kb-label" }, [
          X(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: x.value,
          onChange: k[4] || (k[4] = (L) => ee({ header_type: L.target.value }))
        }, [...k[23] || (k[23] = [
          He('<option value="none" data-v-4f6d05a9>No header</option><option value="text" data-v-4f6d05a9>Text header</option><option value="image" data-v-4f6d05a9>Image header</option><option value="video" data-v-4f6d05a9>Video header</option><option value="document" data-v-4f6d05a9>Document header</option>', 5)
        ])], 40, Kl)
      ]),
      x.value === "text" ? (s(), n("div", Yl, [
        e("label", Gl, [
          k[25] || (k[25] = X(" Header text ", -1)),
          e("span", {
            class: re(["kb-counter", { "kb-counter--warn": E.value.length > et }])
          }, u(E.value.length) + "/" + u(et), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: E.value,
          onInput: k[5] || (k[5] = (L) => ee({
            header: L.target.value || void 0
          }))
        }, null, 40, Jl)
      ])) : _("", !0),
      ["image", "video", "document"].includes(x.value) || ["image", "video", "document"].includes(C.value) ? (s(), n("div", Xl, [
        k[26] || (k[26] = e("label", { class: "kb-label" }, [
          X(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: w.value.media_url ?? "",
          onInput: k[6] || (k[6] = (L) => ee({
            media_url: L.target.value || void 0
          }))
        }, null, 40, Ql)
      ])) : _("", !0),
      x.value === "document" || C.value === "document" ? (s(), n("div", Zl, [
        k[27] || (k[27] = e("label", { class: "kb-label" }, [
          X(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: w.value.document_filename ?? "",
          onInput: k[7] || (k[7] = (L) => ee({
            document_filename: L.target.value || void 0
          }))
        }, null, 40, eo)
      ])) : _("", !0),
      ["image", "video", "document"].includes(x.value) || ["image", "video", "document"].includes(C.value) ? (s(), n("div", to, [
        k[28] || (k[28] = e("label", { class: "kb-label" }, [
          X(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: w.value.media_caption ?? "",
          onInput: k[8] || (k[8] = (L) => ee({
            media_caption: L.target.value || void 0
          }))
        }, null, 40, ao)
      ])) : _("", !0),
      C.value === "lto" ? (s(), n("div", so, [
        k[29] || (k[29] = e("label", { class: "kb-label" }, [
          X(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: w.value.lto_expiry ?? "",
          onInput: k[9] || (k[9] = (L) => ee({
            lto_expiry: L.target.value || void 0
          }))
        }, null, 40, no)
      ])) : _("", !0),
      C.value === "flow" ? (s(), n("div", lo, [
        k[30] || (k[30] = e("label", { class: "kb-label" }, [
          X(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: w.value.flow_id ?? "",
          onInput: k[10] || (k[10] = (L) => ee({
            flow_id: L.target.value || void 0
          }))
        }, null, 40, oo),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: w.value.flow_cta_label ?? "",
          onInput: k[11] || (k[11] = (L) => ee({
            flow_cta_label: L.target.value || void 0
          }))
        }, null, 40, io)
      ])) : _("", !0),
      C.value === "carousel" ? (s(), n("div", ro, [
        e("label", { class: "kb-label" }, [
          k[31] || (k[31] = X(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + u(kt) + " cards.")
        ]),
        e("div", uo, [
          (s(!0), n(q, null, j(W.value, (L, Q) => (s(), n("div", {
            key: L.id || Q,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: L.title ?? "",
              onInput: (se) => de(Number(Q), { title: se.target.value })
            }, null, 40, co),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: L.media_url ?? "",
              onInput: (se) => de(Number(Q), { media_url: se.target.value })
            }, null, 40, po),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: L.button_label ?? "",
              onInput: (se) => de(Number(Q), { button_label: se.target.value })
            }, null, 40, mo),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: L.button_url ?? "",
              onInput: (se) => de(Number(Q), { button_url: se.target.value })
            }, null, 40, vo),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (se) => we(Number(Q))
            }, "Remove", 8, bo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: W.value.length >= kt,
            onClick: ge
          }, " Add card ", 8, fo)
        ])
      ])) : _("", !0),
      ["mpm", "catalog"].includes(C.value) ? (s(), n("div", go, [
        k[32] || (k[32] = e("label", { class: "kb-label" }, [
          X(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", yo, [
          (s(!0), n(q, null, j(J.value, (L, Q) => (s(), n("div", {
            key: L.id || Q,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: L.productId,
              onInput: (se) => Z(Number(Q), { productId: se.target.value })
            }, null, 40, ho),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: L.sectionTitle,
              onInput: (se) => Z(Number(Q), { sectionTitle: se.target.value || void 0 })
            }, null, 40, ko),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (se) => O(Number(Q))
            }, " Remove ", 8, _o)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: ve
          }, " Add product ")
        ])
      ])) : _("", !0),
      C.value === "auth" ? (s(), n("div", wo, [
        k[34] || (k[34] = e("label", { class: "kb-label" }, [
          X(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: w.value.auth_type ?? "otp",
          onChange: k[12] || (k[12] = (L) => ee({
            auth_type: L.target.value
          }))
        }, [...k[33] || (k[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, $o),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: w.value.auth_label ?? "",
          onInput: k[13] || (k[13] = (L) => ee({
            auth_label: L.target.value || void 0
          }))
        }, null, 40, xo)
      ])) : _("", !0),
      e("div", Co, [
        e("label", So, [
          k[35] || (k[35] = X(" Body ", -1)),
          k[36] || (k[36] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: re(["kb-counter", { "kb-counter--warn": M.value.length > tt }])
          }, u(M.value.length) + "/" + u(tt), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
          value: M.value,
          onInput: k[14] || (k[14] = (L) => ee({
            body: L.target.value || void 0
          }))
        }, null, 40, Io)
      ]),
      ce.value.length > 0 ? (s(), n("div", Ao, [
        k[37] || (k[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        k[38] || (k[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", To, [
          (s(!0), n(q, null, j(ce.value, (L) => (s(), n("li", {
            key: L.name,
            class: re(["kb-wa-field-item", { "kb-wa-field-item--ok": L.configured }])
          }, [
            e("span", Lo, u(L.name), 1),
            e("span", Bo, u(L.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : _("", !0),
      e("div", Uo, [
        k[39] || (k[39] = e("label", { class: "kb-label" }, [
          X(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: P.value,
          onInput: k[15] || (k[15] = (L) => ee({
            footer: L.target.value || void 0
          }))
        }, null, 40, Ro),
        e("div", {
          class: re(["kb-counter kb-counter--inline", { "kb-counter--warn": P.value.length > at }])
        }, u(P.value.length) + "/" + u(at), 3)
      ]),
      M.value.trim().length > 0 ? (s(), n("div", Po, [
        e("label", { class: "kb-label" }, [
          k[40] || (k[40] = X(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + u(st) + " buttons. ")
        ]),
        e("div", Eo, [
          (s(!0), n(q, null, j(z.value, (L, Q) => (s(), n("div", {
            key: L.id || Q,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: L.label,
              onInput: (se) => I(Number(Q), { label: se.target.value })
            }, null, 40, Oo),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: L.type ?? "quick_reply",
              onChange: (se) => I(Number(Q), { type: se.target.value })
            }, [...k[41] || (k[41] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, No),
            L.type === "url" ? (s(), n("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: L.url,
              onInput: (se) => I(Number(Q), { url: se.target.value || void 0 })
            }, null, 40, Vo)) : L.type === "call" ? (s(), n("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: L.phone,
              onInput: (se) => I(Number(Q), { phone: se.target.value || void 0 })
            }, null, 40, Mo)) : L.type === "opt_out" ? (s(), n("span", Do, " Sends a built-in opt-out action. ")) : _("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (se) => R(Number(Q))
            }, " Remove ", 8, Wo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: z.value.length >= st,
            onClick: le
          }, " Add button ", 8, Ho)
        ])
      ])) : _("", !0)
    ]));
  }
}), Fo = /* @__PURE__ */ $e(zo, [["__scopeId", "data-v-4f6d05a9"]]), qo = { class: "wa-preview-root" }, jo = { class: "wa-device" }, Ko = { class: "wa-screen" }, Yo = { class: "wa-header" }, Go = { class: "wa-titleblock" }, Jo = { class: "wa-title-row" }, Xo = { class: "wa-title" }, Qo = { class: "wa-subtitle" }, Zo = {
  key: 0,
  class: "wa-flow-shell"
}, ei = { class: "wa-flow-header" }, ti = { class: "wa-flow-title" }, ai = { class: "wa-flow-content" }, si = { class: "wa-flow-eyebrow" }, ni = {
  key: 0,
  class: "wa-flow-products"
}, li = { class: "wa-flow-footer" }, oi = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, ii = { class: "wa-managed" }, ri = {
  key: 1,
  class: "wa-thread"
}, di = { class: "wa-secure-banner" }, ui = { class: "wa-msg wa-msg--in" }, ci = { class: "wa-template-card" }, pi = {
  key: 0,
  class: "wa-card-media"
}, mi = ["src"], vi = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, bi = ["src"], fi = { class: "wa-card-media-doc-icon" }, gi = ["title"], yi = {
  key: 3,
  class: "wa-card-media-fallback"
}, hi = { class: "wa-card-media-tag" }, ki = { class: "wa-card-media-sub" }, _i = {
  key: 1,
  class: "wa-card-header-text"
}, wi = ["innerHTML"], $i = {
  key: 2,
  class: "wa-link-preview"
}, xi = { class: "wa-link-preview-head" }, Ci = { class: "wa-link-preview-text" }, Si = ["href"], Ii = {
  key: 3,
  class: "wa-inline-note"
}, Ai = {
  key: 4,
  class: "wa-inline-note"
}, Ti = {
  key: 5,
  class: "wa-inline-note"
}, Li = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Bi = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, Ui = {
  key: 8,
  class: "wa-product-list"
}, Ri = { class: "wa-product-name" }, Pi = { class: "wa-product-price" }, Ei = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Oi = {
  key: 10,
  class: "wa-template-actions"
}, Ni = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Vi = { class: "wa-order-card" }, Mi = { class: "wa-order-card-top" }, Di = ["src"], Wi = { type: "button" }, Hi = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, zi = { class: "wa-document-card" }, Fi = { class: "wa-document-file" }, qi = { class: "wa-document-icon" }, ji = ["title"], Ki = { class: "wa-document-caption" }, Yi = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Gi = { class: "wa-voice-card" }, Ji = { class: "wa-voice-top" }, Xi = { class: "wa-voice-profile" }, Qi = ["src"], Zi = { class: "wa-voice-duration" }, er = { class: "wa-voice-transcript" }, tr = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, ar = { class: "wa-contact-card" }, sr = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, nr = { class: "wa-location-card" }, lr = { class: "wa-location-content" }, or = { type: "button" }, ir = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, rr = { class: "wa-carousel-track" }, dr = { type: "button" }, ur = { class: "wa-msg wa-msg--out" }, cr = { class: "wa-bubble wa-bubble--out" }, pr = { class: "wa-bubble-author" }, mr = {
  key: 0,
  class: "wa-reaction"
}, vr = { class: "wa-msg wa-msg--in" }, br = { class: "wa-bubble wa-bubble--in" }, fr = /* @__PURE__ */ _e({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(a) {
    const r = a;
    function m(f) {
      return String(f).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const v = y(() => {
      var R;
      const f = ((R = r.template) == null ? void 0 : R.body) ?? "";
      return m(f).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), $ = y(() => r.template.templateName || "Ecoshop"), h = y(() => "Business Account"), w = y(() => r.template.format === "flow" || !!r.template.flow), C = y(() => {
      var f;
      return (f = r.template.buttons) == null ? void 0 : f[0];
    }), x = y(() => {
      var f, I;
      return ((f = C.value) == null ? void 0 : f.text) || ((I = r.template.flow) == null ? void 0 : I.ctaLabel) || "";
    }), E = y(() => r.template.buttons ?? []), M = y(() => {
      var f;
      return (((f = r.template.multiProduct) == null ? void 0 : f.length) ?? 0) > 0;
    }), P = y(() => (r.template.format || "text").toUpperCase()), z = y(() => {
      const f = r.template.header;
      return !f || f.type === "text" ? "" : f.type === "image" ? f.url || "Image" : f.type === "video" ? f.url || "Video" : f.filename || f.url || "Document";
    }), J = y(() => {
      const f = r.template.header;
      if (!(!f || f.type !== "image" || !f.url))
        return { backgroundImage: `url(${f.url})` };
    });
    function W(f) {
      if (!f) return "";
      try {
        const I = f.split("?")[0].split("#")[0], R = I.substring(I.lastIndexOf("/") + 1);
        return decodeURIComponent(R || "");
      } catch {
        return "";
      }
    }
    const ie = y(() => {
      const f = r.template.header;
      return !f || f.type !== "document" ? "" : f.filename || W(f.url) || "document.pdf";
    }), K = y(() => {
      const f = (r.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (f == null ? void 0 : f[0]) || "";
    });
    function Y(f) {
      try {
        return new URL(f).hostname;
      } catch {
        return "example.com";
      }
    }
    const D = y(() => {
      const f = r.template.linkPreview;
      return !f && !K.value ? null : {
        title: (f == null ? void 0 : f.title) || "Link preview",
        description: (f == null ? void 0 : f.description) || "Preview from your WhatsApp template link.",
        domain: (f == null ? void 0 : f.domain) || (K.value ? Y(K.value) : "example.com"),
        url: (f == null ? void 0 : f.url) || K.value || "#",
        thumbnail: (f == null ? void 0 : f.thumbnail) || ""
      };
    }), oe = y(() => {
      var R, le, Z;
      const I = (Z = (((R = r.template.documentCard) == null ? void 0 : R.filename) || ((le = r.template.header) == null ? void 0 : le.filename) || "").split(".").pop()) == null ? void 0 : Z.trim().toUpperCase();
      return I ? I.slice(0, 4) : "DOC";
    });
    function be(f, I) {
      return f === "phone_number" ? "wa-btn-icon--phone" : f === "url" ? "wa-btn-icon--external" : f === "copy_code" ? "wa-btn-icon--code" : f === "opt_out" || (I || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (I || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ye = y(() => {
      var f;
      return r.template.location || r.template.locationRequest ? "wa-side-icon--info" : ((f = r.template.header) == null ? void 0 : f.type) === "video" || r.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ce = y(() => {
      var I, R, le;
      const f = r.template;
      return f.format === "flow" ? "Thanks, we received your preferences." : (I = f.auth) != null && I.code ? "Use the verification code and let us know if it works." : (R = f.coupon) != null && R.code ? `Your coupon ${f.coupon.code} is active now.` : f.limitedOffer ? `Great choice. This offer is valid until ${f.limitedOffer}.` : (le = r.template.multiProduct) != null && le.length ? `Here are ${r.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), ee = y(() => {
      var I, R;
      const f = r.template;
      return f.location ? f.location.name || f.location.address || `${f.location.lat}, ${f.location.lng}` : (I = f.auth) != null && I.code ? `Verification code: ${f.auth.code}` : (R = f.flow) != null && R.id ? `Flow ID: ${f.flow.id}` : f.templateLanguage ? `Template language: ${f.templateLanguage}` : `Category: ${f.templateCategory || "utility"} • Format: ${f.format || "text"}`;
    }), G = y(() => {
      var R, le;
      const f = r.template;
      if ((R = f.multiProduct) != null && R.length) return f.multiProduct.slice(0, 5).map((Z) => Z.name || "Product");
      if ((le = f.buttons) != null && le.length) return f.buttons.slice(0, 5).map((Z) => Z.text || "Option");
      const I = (f.body || "").split(/\n|\.|,/).map((Z) => Z.trim()).filter(Boolean).slice(0, 5);
      return I.length ? I : ["Option A", "Option B", "Option C"];
    });
    return (f, I) => {
      var R, le, Z, O, ve, de, we, ge, N, k, L, Q, se, me;
      return s(), n("div", qo, [
        e("div", jo, [
          e("div", Ko, [
            I[30] || (I[30] = He('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Yo, [
              I[7] || (I[7] = e("span", { class: "wa-back" }, "←", -1)),
              I[8] || (I[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Go, [
                e("div", Jo, [
                  e("span", Xo, u($.value), 1),
                  I[6] || (I[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Qo, u(h.value), 1)
              ]),
              I[9] || (I[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            w.value ? (s(), n("div", Zo, [
              I[14] || (I[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", ei, [
                I[10] || (I[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", ti, u($.value), 1),
                I[11] || (I[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", ai, [
                e("p", si, u(a.template.body || "Please choose an option below."), 1),
                (s(!0), n(q, null, j(G.value, (ne, te) => (s(), n("div", {
                  key: `flow-opt-${te}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, u(ne), 1),
                  e("span", {
                    class: re(["wa-radio", { "wa-radio--on": te === 0 }])
                  }, null, 2)
                ]))), 128)),
                (R = a.template.multiProduct) != null && R.length ? (s(), n("div", ni, [
                  (s(!0), n(q, null, j(a.template.multiProduct.slice(0, 3), (ne, te) => (s(), n("div", {
                    key: te,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, u(ne.name || "Product"), 1),
                      e("p", null, u(ne.price || "Price on request"), 1)
                    ]),
                    I[12] || (I[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : _("", !0)
              ]),
              e("div", li, [
                x.value ? (s(), n("button", oi, u(x.value), 1)) : _("", !0),
                e("p", ii, [
                  I[13] || (I[13] = X("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: I[0] || (I[0] = Fe(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (s(), n("div", ri, [
              I[29] || (I[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", di, [
                I[15] || (I[15] = e("span", null, "●", -1)),
                I[16] || (I[16] = X(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: I[1] || (I[1] = Fe(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", ui, [
                e("div", ci, [
                  a.template.header && a.template.header.type !== "text" ? (s(), n("div", pi, [
                    a.template.header.type === "image" && a.template.header.url ? (s(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: a.template.header.url,
                      alt: "Header media"
                    }, null, 8, mi)) : a.template.header.type === "video" && a.template.header.url ? (s(), n("div", vi, [
                      e("video", {
                        src: a.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, bi),
                      I[17] || (I[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : a.template.header.type === "document" ? (s(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: I[2] || (I[2] = Fe(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", fi, u(oe.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ie.value
                      }, u(ie.value), 9, gi)
                    ])) : (s(), n("div", yi, [
                      e("div", hi, u(P.value) + " TEMPLATE", 1),
                      e("div", ki, u(z.value), 1),
                      J.value ? (s(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: pe(J.value)
                      }, null, 4)) : _("", !0)
                    ]))
                  ])) : (le = a.template.header) != null && le.text ? (s(), n("div", _i, u(a.template.header.text), 1)) : _("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: v.value
                  }, null, 8, wi),
                  D.value ? (s(), n("div", $i, [
                    e("div", xi, [
                      D.value.thumbnail ? (s(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: pe({ backgroundImage: `url(${D.value.thumbnail})` })
                      }, null, 4)) : _("", !0),
                      e("div", Ci, [
                        e("strong", null, u(D.value.title), 1),
                        e("p", null, u(D.value.description), 1),
                        e("span", null, u(D.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: D.value.url,
                      onClick: I[3] || (I[3] = Fe(() => {
                      }, ["prevent"]))
                    }, u(D.value.url), 9, Si)
                  ])) : _("", !0),
                  a.template.location ? (s(), n("div", Ii, " 📍 " + u(a.template.location.name || a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)) : _("", !0),
                  (Z = a.template.coupon) != null && Z.code ? (s(), n("div", Ai, [
                    I[18] || (I[18] = X(" Coupon: ", -1)),
                    e("strong", null, u(a.template.coupon.code), 1)
                  ])) : _("", !0),
                  (O = a.template.auth) != null && O.code ? (s(), n("div", Ti, [
                    I[19] || (I[19] = X(" Verification code: ", -1)),
                    e("strong", null, u(a.template.auth.code), 1)
                  ])) : _("", !0),
                  a.template.limitedOffer ? (s(), n("div", Li, " Expires: " + u(a.template.limitedOffer), 1)) : _("", !0),
                  a.template.footer ? (s(), n("div", Bi, u(a.template.footer), 1)) : _("", !0),
                  M.value ? (s(), n("div", Ui, [
                    (s(!0), n(q, null, j((ve = a.template.multiProduct) == null ? void 0 : ve.slice(0, 4), (ne, te) => (s(), n("div", {
                      key: `prod-${te}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Ri, u(ne.name || `Item ${te + 1}`), 1),
                      e("span", Pi, u(ne.price || "-"), 1)
                    ]))), 128))
                  ])) : _("", !0),
                  x.value ? (s(), n("button", Ei, [
                    C.value ? (s(), n("span", {
                      key: 0,
                      class: re(["wa-btn-icon", be(C.value.type, C.value.value || C.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : _("", !0),
                    X(" " + u(x.value), 1)
                  ])) : _("", !0),
                  E.value.length > 1 ? (s(), n("div", Oi, [
                    (s(!0), n(q, null, j(E.value.slice(1, 4), (ne, te) => (s(), n("button", {
                      key: `action-${te}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: re(["wa-btn-icon", be(ne.type, ne.value || ne.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      X(" " + u(ne.text), 1)
                    ]))), 128))
                  ])) : _("", !0),
                  I[20] || (I[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: re(["wa-side-icon", ye.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              a.template.orderCard ? (s(), n("div", Ni, [
                e("div", Vi, [
                  e("div", Mi, [
                    a.template.orderCard.image ? (s(), n("img", {
                      key: 0,
                      src: a.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Di)) : _("", !0),
                    e("div", null, [
                      e("strong", null, u(a.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, u(a.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Wi, u(a.template.orderCard.buttonLabel || "View"), 1),
                  I[21] || (I[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : _("", !0),
              a.template.documentCard || ((de = a.template.header) == null ? void 0 : de.type) === "document" ? (s(), n("div", Hi, [
                e("div", zi, [
                  e("div", Fi, [
                    e("span", qi, u(oe.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((we = a.template.documentCard) == null ? void 0 : we.filename) || ((ge = a.template.header) == null ? void 0 : ge.filename) || "document.pdf"
                      }, u(((N = a.template.documentCard) == null ? void 0 : N.filename) || ((k = a.template.header) == null ? void 0 : k.filename) || "document.pdf"), 9, ji),
                      e("p", null, u(((L = a.template.documentCard) == null ? void 0 : L.size) || "243 KB • html"), 1)
                    ]),
                    I[22] || (I[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ki, u(((Q = a.template.documentCard) == null ? void 0 : Q.caption) || a.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : _("", !0),
              a.template.voiceNote ? (s(), n("div", Yi, [
                e("div", Gi, [
                  e("div", Ji, [
                    I[24] || (I[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    I[25] || (I[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Xi, [
                      a.template.voiceNote.profileImage ? (s(), n("img", {
                        key: 0,
                        src: a.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Qi)) : _("", !0),
                      I[23] || (I[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Zi, u(a.template.voiceNote.duration || "0:10"), 1),
                  e("p", er, u(a.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : _("", !0),
              a.template.contactCard ? (s(), n("div", tr, [
                e("div", ar, [
                  e("strong", null, u(a.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, u(a.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, u(a.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, u(a.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, u(a.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : _("", !0),
              a.template.location && a.template.locationRequest ? (s(), n("div", sr, [
                e("div", nr, [
                  I[26] || (I[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", lr, [
                    e("strong", null, u(a.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: I[4] || (I[4] = Fe(() => {
                      }, ["prevent"]))
                    }, u(a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)
                  ]),
                  e("button", or, u(a.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : _("", !0),
              (se = a.template.carouselCards) != null && se.length ? (s(), n("div", ir, [
                e("div", rr, [
                  (s(!0), n(q, null, j(a.template.carouselCards.slice(0, 4), (ne, te) => (s(), n("article", {
                    key: `c-${te}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: pe(ne.image ? { backgroundImage: `url(${ne.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, u(ne.title || `Card ${te + 1}`), 1),
                    e("p", null, u(ne.description || "Card description"), 1),
                    e("button", dr, u(ne.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : _("", !0),
              e("div", ur, [
                e("div", cr, [
                  e("span", pr, u($.value), 1),
                  e("p", null, u(ce.value), 1),
                  I[27] || (I[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  a.template.reactionEmoji ? (s(), n("span", mr, u(a.template.reactionEmoji), 1)) : _("", !0)
                ])
              ]),
              e("div", vr, [
                e("div", br, [
                  e("p", null, u(ee.value), 1),
                  (me = a.template.flow) != null && me.id ? (s(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: I[5] || (I[5] = Fe(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + u(a.template.flow.id), 1)) : _("", !0),
                  I[28] || (I[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            I[31] || (I[31] = He('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), gr = /* @__PURE__ */ $e(fr, [["__scopeId", "data-v-244c945a"]]), yr = { class: "keos-whatsapp-builder" }, hr = { class: "kb-builder-top" }, kr = { class: "kb-wa-layout" }, _r = { class: "kb-wa-sidebar" }, wr = {
  key: 0,
  class: "kb-wa-form"
}, $r = { class: "kb-wa-form-head" }, xr = { class: "kb-wa-form-head-top" }, Cr = { class: "kb-wa-health-pill" }, Sr = { class: "kb-wa-form-head-row" }, Ir = ["value"], Ar = { class: "kb-wa-health" }, Tr = { class: "kb-wa-health-row" }, Lr = { class: "kb-wa-health-value" }, Br = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Ur = { class: "kb-wa-canvas" }, Rr = {
  key: 0,
  class: "kb-wa-test-banner"
}, Pr = { class: "kb-wa-preview-chrome" }, Er = { class: "kb-push-preview-controls" }, Or = { class: "kb-push-preview-as" }, Nr = ["value"], Vr = { class: "kb-preview-status" }, Mr = { class: "kb-wa-actions" }, Dr = {
  key: 0,
  class: "kb-actions-note"
}, Wr = { key: 0 }, Hr = { class: "kb-wa-actions-right" }, zr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Fr = { class: "kb-confirm-dialog" }, qr = { class: "kb-confirm-actions" }, _t = 60, wt = 1024, $t = 60, xt = 10, Ct = 10, jr = /* @__PURE__ */ _e({
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
  setup(a, { emit: r }) {
    const m = /* @__PURE__ */ new Set(["image", "video", "document"]);
    function v(c) {
      const b = { ...c }, A = String(b.template_type ?? "text").trim().toLowerCase(), d = String(b.header_type ?? "none").trim().toLowerCase();
      m.has(A) || m.has(d) || (b.media_url = void 0, b.media_caption = void 0, b.document_filename = void 0, b.document_size = void 0), A !== "carousel" && (b.cards = void 0), A !== "catalog" && A !== "mpm" && (b.products = void 0), A !== "flow" && (b.flow_id = void 0, b.flow_cta_label = void 0), A !== "lto" && (b.lto_expiry = void 0), A !== "auth" && (b.auth_type = void 0, b.auth_label = void 0, b.auth_code = void 0, b.otp_code = void 0), A !== "document" && d !== "document" && (b.document_filename = void 0, b.document_size = void 0), A !== "location" && (b.location = void 0);
      const U = Array.isArray(b.buttons) ? b.buttons : [];
      return b.buttons = U, b;
    }
    function $(c) {
      var t, B, o, V, H;
      const b = [], A = c.message, d = (A.template_category ?? "").toString().trim(), i = (A.template_type ?? "text").toString(), U = (A.header_type ?? "none").toString(), S = (A.header ?? "").toString(), F = (A.body ?? "").toString(), T = (A.footer ?? "").toString(), p = Array.isArray(A.buttons) ? A.buttons : [], l = Array.isArray(A.cards) ? A.cards : [];
      return (t = c.name) != null && t.trim() || b.push("Template name is required"), (B = A.template_name) != null && B.trim() || b.push("WhatsApp template name is required"), d || b.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), F.trim() || b.push("Body is required"), U === "text" && S.length > _t && b.push(`Header text cannot exceed ${_t} characters`), F.length > wt && b.push(`Body cannot exceed ${wt} characters`), T.length > $t && b.push(`Footer cannot exceed ${$t} characters`), p.length > xt && b.push(`Buttons cannot exceed ${xt}`), (i === "image" || i === "video" || i === "document" || U === "image" || U === "video" || U === "document") && !A.media_url && b.push("Media URL is required for rich media templates"), d === "authentication" && i !== "auth" && b.push("Authentication category must use Authentication format"), i === "auth" && !((o = A.auth_label) != null && o.trim()) && !F.includes("{{") && b.push("Authentication templates should include a code label or placeholder variable"), i === "lto" && !A.lto_expiry && b.push("Limited-time offer requires an expiry"), (i === "mpm" || i === "catalog") && !((V = A.products) != null && V.length) && b.push("Catalog and multi-product templates require at least one product"), i === "flow" && !((H = A.flow_id) != null && H.trim()) && b.push("WhatsApp Flow format requires a flow ID"), i === "carousel" && (l.length ? l.length > Ct && b.push(`Carousel supports up to ${Ct} cards`) : b.push("Carousel format requires at least one card")), b;
    }
    function h(c, b, A) {
      const d = c.message, i = String(d.template_category ?? "").trim(), U = String(d.template_type ?? "text").trim(), S = [];
      return i && b.includes(i) && S.push(`WhatsApp category "${i}" is disabled in this builder configuration`), U && A.includes(U) && S.push(`WhatsApp format "${U}" is disabled in this builder configuration`), S;
    }
    const w = a;
    function C(c) {
      if (!c) return {};
      const b = c.metaTemplate, A = Array.isArray(b == null ? void 0 : b.components) ? (b == null ? void 0 : b.components).find((B) => (B == null ? void 0 : B.type) === "BODY") : void 0, d = Array.isArray(b == null ? void 0 : b.components) ? (b == null ? void 0 : b.components).find((B) => (B == null ? void 0 : B.type) === "FOOTER") : void 0, i = Array.isArray(b == null ? void 0 : b.components) ? (b == null ? void 0 : b.components).find((B) => (B == null ? void 0 : B.type) === "HEADER") : void 0, U = String(c.content ?? "").trim(), S = String(c.elementName ?? "").trim(), F = String(c.languageCode ?? "").trim(), T = String(c.category ?? "").trim().toLowerCase(), p = String(c.templateType ?? "").trim().toLowerCase(), l = String(c.footer ?? "").trim(), t = String(c.header ?? "").trim();
      return {
        ...c,
        ...S && !c.template_name ? { template_name: S } : {},
        ...F && !c.template_language ? { template_language: F } : {},
        ...T && !c.template_category ? { template_category: T } : {},
        ...p && !c.template_type ? { template_type: p } : {},
        ...U && !c.body ? { body: U } : {},
        ...l && !c.footer ? { footer: l } : {},
        ...t && !c.header ? { header: t } : {},
        ...!c.body && (A != null && A.text) ? { body: String(A.text) } : {},
        ...!c.footer && (d != null && d.text) ? { footer: String(d.text) } : {},
        ...!c.header && (i != null && i.text) ? { header: String(i.text) } : {}
      };
    }
    function x(c) {
      if (!c) return c;
      const b = C(c.message);
      return { ...c, message: b };
    }
    const E = r;
    function M(c) {
      var A;
      const b = mt(c, {
        exampleData: (A = ne.value) == null ? void 0 : A.data
      });
      return {
        ...c,
        message: {
          ...c.message,
          elementName: b.payload.elementName,
          languageCode: b.payload.languageCode,
          category: b.payload.category,
          templateType: b.payload.templateType,
          content: b.payload.content,
          ...b.payload.header ? { header: b.payload.header } : {},
          ...b.payload.footer ? { footer: b.payload.footer } : {},
          ...b.payload.buttons ? { buttons: b.payload.buttons } : {},
          ...b.payload.example ? { example: b.payload.example } : {},
          metaTemplate: b.payload.metaTemplate,
          ...b.payload.advanced ? { advanced: b.payload.advanced } : {}
        }
      };
    }
    const {
      campaign: P,
      dirty: z,
      customValidatorErrors: J,
      getValidationWithWarnings: W,
      update: ie,
      updateMessage: K,
      undo: Y,
      redo: D,
      canUndo: oe,
      canRedo: be,
      resetMessage: ye,
      hooks: ce
    } = Je({
      initial: x(w.modelValue),
      hooks: {
        ...w.hooks,
        customValidators: async (c) => {
          var d;
          const b = [
            ...$(c),
            ...h(
              c,
              w.disabledTemplateCategories,
              w.disabledTemplateFormats
            )
          ], A = (d = w.hooks) != null && d.customValidators ? await w.hooks.customValidators(c) : [];
          return [...b, ...A];
        }
      },
      onDirty: () => E("change", M(P.value))
    }), { lastSavedAt: ee } = Xe(P, { channel: "whatsapp" });
    function G(c) {
      (c.metaKey || c.ctrlKey) && c.key === "z" && (c.preventDefault(), c.shiftKey ? D() : Y());
    }
    je(() => {
      window.addEventListener("keydown", G);
    }), Ke(() => {
      window.removeEventListener("keydown", G);
    }), Ce(P, (c) => E("update:modelValue", M(c)), {
      deep: !0
    });
    const f = ae(), I = ae(!0);
    async function R() {
      if (ce.estimateReach)
        try {
          f.value = await ce.estimateReach(P.value.audience);
        } catch {
          f.value = void 0;
        }
      ce.canSend && (I.value = await Promise.resolve(ce.canSend()));
    }
    R(), Ce(() => P.value.audience, R, { deep: !0 });
    const le = y(() => (J.value, W(f.value))), Z = y(() => le.value.blockingErrors), O = y(() => le.value.warnings), ve = y(() => le.value.valid), de = y(() => {
      var d, i, U;
      const c = P.value.message, b = [
        !!((d = c.template_name) != null && d.trim()),
        !!((i = c.template_category) != null && i.trim()),
        !!(c.body ?? "").toString().trim(),
        !!((U = c.template_language) != null && U.trim()),
        Array.isArray(c.buttons) ? c.buttons.length > 0 : !1
      ], A = b.filter(Boolean).length;
      return Math.round(A / b.length * 100);
    }), we = y(() => de.value >= 90 ? "Production ready" : de.value >= 70 ? "Strong draft" : de.value >= 40 ? "In progress" : "Needs setup"), ge = y(() => {
      const c = P.value.message;
      return !!((c.body ?? "").toString().trim() || (c.header ?? "").toString().trim() || c.media_url || c.flow_id || c.coupon_code || c.lto_expiry || c.voice_transcript || c.contact_name || c.link_title || c.order_title || Array.isArray(c.buttons) && c.buttons.length || Array.isArray(c.products) && c.products.length || Array.isArray(c.cards) && c.cards.length);
    }), N = ae(""), k = ae(!1), L = ae(null), Q = y(
      () => new Set((w.disabledTemplateCategories ?? []).map((c) => String(c).trim().toLowerCase()))
    ), se = y(
      () => new Set((w.disabledTemplateFormats ?? []).map((c) => String(c).trim().toLowerCase()))
    ), me = y(
      () => jn.filter((c) => {
        var i;
        const b = ((i = c.campaign) == null ? void 0 : i.message) ?? {}, A = String(b.template_category ?? "").trim().toLowerCase(), d = String(b.template_type ?? "").trim().toLowerCase();
        return !(A && Q.value.has(A) || d && se.value.has(d));
      })
    ), ne = y(() => {
      const c = N.value;
      return c ? De.find((b) => b.id === c) ?? null : null;
    }), te = y(() => {
      const c = P.value.message.body ?? "";
      return ne.value ? Ne(c, ne.value.data) : c;
    }), he = y(() => {
      const c = P.value.message.header ?? "";
      return ne.value ? Ne(c, ne.value.data) : c;
    }), Te = y(() => {
      var B;
      const c = P.value.message, b = c.template_type ?? "text", A = c.header_type ?? "none";
      let d, i, U, S, F, T, p;
      (b === "image" || A === "image") && c.media_url ? d = { type: "image", url: c.media_url } : (b === "video" || A === "video") && c.media_url ? d = { type: "video", url: c.media_url } : b === "document" || A === "document" ? d = {
        type: "document",
        url: c.media_url || void 0,
        filename: c.document_filename || c.media_url || "document.pdf"
      } : A === "text" && c.header ? d = { type: "text", text: he.value } : c.header && (d = { type: "text", text: he.value });
      const l = te.value || "Start adding content to see a live preview here.";
      if (b === "location" && c.location) {
        const o = c.location, V = o.lat ?? o.latitude, H = o.lng ?? o.lon ?? o.longitude;
        V != null && H != null && (i = {
          lat: V,
          lng: H,
          name: o.name ?? o.title,
          address: o.address ?? `${V}, ${H}`
        });
      }
      (b === "catalog" || b === "mpm") && Array.isArray(c.products) && c.products.length && (U = !0, S = c.products.map((o) => ({
        image: o.image ?? o.imageUrl,
        name: o.name ?? o.sectionTitle ?? o.title ?? "Product",
        price: o.price ?? o.productId ?? ""
      }))), b === "carousel" && Array.isArray(c.cards) && c.cards.length && (U = !0, S = c.cards.map((o) => ({
        image: o.image ?? o.media_url,
        name: o.title ?? "Card",
        price: o.button_label ?? ""
      }))), b === "coupon" && c.coupon_code && (F = { code: c.coupon_code }), b === "lto" && c.lto_expiry && (T = c.lto_expiry), b === "auth" && (p = { code: c.auth_code ?? c.otp_code ?? "123 456" });
      const t = c.buttons ?? [];
      return b === "flow" && ((B = c.flow_cta_label) != null && B.trim()) && t.push({
        label: c.flow_cta_label
      }), {
        format: b,
        templateName: c.template_name || void 0,
        templateLanguage: c.template_language || void 0,
        templateCategory: c.template_category || void 0,
        header: d,
        body: l,
        mediaCaption: c.media_caption || void 0,
        footer: c.footer || void 0,
        buttons: t.map((o) => ({ text: o.label || "Button", type: o.type, value: o.value })),
        location: i,
        catalog: U,
        multiProduct: S,
        coupon: F,
        limitedOffer: T,
        auth: p,
        linkPreview: c.link_title || c.link_description || c.link_url ? {
          title: c.link_title || void 0,
          description: c.link_description || void 0,
          domain: c.link_domain || void 0,
          url: c.link_url || void 0,
          thumbnail: c.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: c.voice_transcript || c.voice_duration || c.voice_profile_image ? {
          transcript: c.voice_transcript || void 0,
          duration: c.voice_duration || void 0,
          profileImage: c.voice_profile_image || void 0
        } : void 0,
        contactCard: c.contact_name || c.contact_phone || c.contact_email ? {
          name: c.contact_name || void 0,
          title: c.contact_title || void 0,
          phone: c.contact_phone || void 0,
          email: c.contact_email || void 0,
          address: c.contact_address || void 0
        } : void 0,
        documentCard: c.document_filename || b === "document" || A === "document" ? {
          filename: c.document_filename || c.media_url || "document.pdf",
          size: c.document_size || void 0,
          caption: c.media_caption || void 0
        } : void 0,
        locationRequest: c.location_request_label ? { label: c.location_request_label } : void 0,
        orderCard: c.order_title || c.order_items || c.order_image ? {
          title: c.order_title || void 0,
          items: c.order_items || void 0,
          image: c.order_image || void 0,
          buttonLabel: c.order_button_label || void 0
        } : void 0,
        carouselCards: b === "carousel" && Array.isArray(c.cards) ? c.cards.map((o) => ({
          title: o.title || void 0,
          description: o.description || c.body || void 0,
          image: o.media_url || void 0,
          button: o.button_label || void 0
        })) : void 0,
        reactionEmoji: c.reaction_emoji || void 0,
        flow: b === "flow" ? {
          id: c.flow_id || void 0,
          ctaLabel: c.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Se(c) {
      var d;
      const b = P.value, A = v({
        ...c.campaign.message ? c.campaign.message : b.message,
        template_name: ((d = c.campaign.message) == null ? void 0 : d.template_name) ?? c.campaign.name ?? b.name ?? void 0
      });
      ie({
        ...c.campaign,
        message: A
      }), L.value = null, k.value = !1;
    }
    function Le(c) {
      const b = c.target.value;
      if (!b) return;
      const A = me.value.find((d) => d.id === b);
      A && (z.value ? (L.value = A, k.value = !0) : Se(A), c.target.value = "");
    }
    function Ee(c) {
      ie({
        name: c,
        message: { ...P.value.message, template_name: c || void 0 },
        tracking: { ...P.value.tracking ?? {}, campaign_name: c }
      });
    }
    function Ie(c) {
      const b = P.value.message, A = v({
        ...b,
        ...c ?? {}
      });
      if (K(A), Object.prototype.hasOwnProperty.call(c ?? {}, "template_name")) {
        const d = String((c == null ? void 0 : c.template_name) ?? "");
        d !== P.value.name && ie({
          name: d,
          tracking: {
            ...P.value.tracking ?? {},
            campaign_name: d
          }
        });
      }
    }
    Ce(
      () => P.value.name,
      (c) => {
        const b = String(P.value.message.template_name ?? "");
        (c || "") !== b && K({ template_name: c || void 0 });
      },
      { immediate: !0 }
    );
    function Be(c) {
      const b = ` {{ .${c.variable} }}`, A = P.value.message.variables ?? [], d = Array.from(/* @__PURE__ */ new Set([...A, c.variable]));
      if (c.field === "title") {
        const i = P.value.message.header ?? "";
        K({
          variables: d,
          header: i + b
        });
      } else {
        const i = P.value.message.body ?? "";
        K({
          variables: d,
          body: i + b
        });
      }
    }
    function Ue() {
      var A;
      if (!ve.value) return;
      const c = mt(P.value, {
        exampleData: (A = ne.value) == null ? void 0 : A.data
      }), b = M(P.value);
      E("save-gupshup-template", c.payload, c.warnings, b), E("save", b);
    }
    return (c, b) => {
      var A;
      return s(), n("div", yr, [
        e("div", hr, [
          xe(Qe, {
            "campaign-name": g(P).name,
            status: g(P).status,
            dirty: g(z),
            "last-saved-at": g(ee),
            "can-undo": g(oe),
            "can-redo": g(be),
            "slugify-name": w.enforceSlugName,
            "onUpdate:campaignName": Ee,
            onUndo: g(Y),
            onRedo: g(D)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          Z.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: pe({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Ve).input}px`,
              padding: `${g(ue)[12]}px ${g(ue)[16]}px`,
              marginBottom: `${g(ue)[16]}px`
            })
          }, [
            e("ul", {
              style: pe({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (s(!0), n(q, null, j(Z.value, (d) => (s(), n("li", {
                key: d.message
              }, u(d.message), 1))), 128))
            ], 4)
          ], 4)) : _("", !0)
        ]),
        e("div", kr, [
          e("aside", _r, [
            a.disabledSections.includes("whatsapp") ? _("", !0) : (s(), n("div", wr, [
              e("div", $r, [
                e("div", xr, [
                  b[6] || (b[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Cr, u(we.value), 1)
                ]),
                e("div", Sr, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: Le
                  }, [
                    b[7] || (b[7] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(q, null, j(me.value, (d) => (s(), n("option", {
                      key: d.id,
                      value: d.id
                    }, u(d.label), 9, Ir))), 128))
                  ], 32)
                ]),
                e("div", Ar, [
                  e("div", Tr, [
                    b[8] || (b[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", Lr, u(de.value) + "%", 1)
                  ]),
                  e("div", Br, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: pe({ width: `${de.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              xe(Fo, {
                message: g(P).message,
                "show-reset": !0,
                "disabled-categories": a.disabledTemplateCategories,
                "disabled-formats": a.disabledTemplateFormats,
                onUpdate: Ie,
                onReset: b[0] || (b[0] = (d) => g(ye)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              xe(Et, {
                message: g(P).message,
                "variable-options": a.variableOptions,
                onUpdate: g(K),
                onInsertVariable: Be
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Ur, [
            !a.designOnly && g(P).audience.test_mode ? (s(), n("div", Rr, [...b[9] || (b[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              X(" Test mode — only your test segment will receive this. ", -1)
            ])])) : _("", !0),
            e("div", Pr, [
              e("div", Er, [
                e("label", Or, [
                  b[11] || (b[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ae(e("select", {
                    "onUpdate:modelValue": b[1] || (b[1] = (d) => N.value = d),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    b[10] || (b[10] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(q, null, j(g(De), (d) => (s(), n("option", {
                      key: d.id,
                      value: d.id
                    }, u(d.label), 9, Nr))), 128))
                  ], 512), [
                    [Pe, N.value]
                  ])
                ]),
                e("div", Vr, [
                  b[12] || (b[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(g(P).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: re(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !ge.value }])
              }, [
                xe(gr, { template: Te.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Mr, [
          O.value.length > 0 ? (s(), n("div", Dr, [
            b[13] || (b[13] = e("strong", null, "Warning:", -1)),
            X(" " + u((A = O.value[0]) == null ? void 0 : A.message) + " ", 1),
            O.value.length > 1 ? (s(), n("span", Wr, " (+" + u(O.value.length - 1) + " more) ", 1)) : _("", !0)
          ])) : _("", !0),
          e("div", Hr, [
            a.showDuplicate ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: b[2] || (b[2] = (d) => E("duplicate", JSON.parse(JSON.stringify(g(P)))))
            }, " Duplicate ")) : _("", !0),
            a.showSave ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: Ue
            }, " Save ")) : _("", !0),
            a.showClose ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: b[3] || (b[3] = (d) => E("edit"))
            }, " Close ")) : _("", !0)
          ])
        ]),
        k.value ? (s(), n("div", zr, [
          e("div", Fr, [
            b[14] || (b[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            b[15] || (b[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", qr, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: b[4] || (b[4] = (d) => {
                  k.value = !1, L.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: b[5] || (b[5] = (d) => L.value && Se(L.value))
              }, " Replace ")
            ])
          ])
        ])) : _("", !0)
      ]);
    };
  }
}), Vt = /* @__PURE__ */ $e(jr, [["__scopeId", "data-v-76a74459"]]), Kr = { class: "kb-section" }, Yr = { class: "kb-section__head" }, Gr = { class: "kb-field" }, Jr = ["value"], Xr = { class: "kb-field" }, Qr = { class: "kb-label" }, Zr = { key: 0 }, ed = { key: 1 }, td = { key: 2 }, ad = ["value"], sd = {
  key: 0,
  class: "kb-truncation-hint"
}, nd = { class: "kb-field" }, ld = { class: "kb-insert-row" }, od = ["value"], id = { class: "kb-field" }, rd = { class: "kb-insert-row" }, dd = /* @__PURE__ */ _e({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: r }) {
    const m = a, v = r, $ = ["first_name", "last_name", "order_id", "city"], h = ae(m.variableOptions && m.variableOptions.length ? [...m.variableOptions] : $), w = ae(h.value[0] ?? $[0]), C = ae("");
    Ce(
      () => m.variableOptions,
      (K) => {
        K && K.length && (h.value = [...K], h.value.includes(w.value) || (w.value = h.value[0]));
      }
    );
    const x = y(() => m.message.body ?? ""), E = y(() => x.value.length), M = y(() => E.value ? E.value <= 160 ? 1 : Math.ceil(E.value / 153) : 0), P = y(() => {
      const K = E.value;
      return K <= 160 ? null : K <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function z(K) {
      const Y = K.target.value;
      v("update", {
        sender_id: Y || void 0
      });
    }
    function J(K) {
      const Y = K.target.value;
      v("update", {
        body: Y
      });
    }
    function W() {
      const K = w.value;
      if (!K) return;
      const Y = ` {{ .${K} }}`, D = x.value || "", oe = m.message.variables ?? [], be = Array.from(/* @__PURE__ */ new Set([...oe, K]));
      v("update", {
        body: D + Y,
        variables: be
      });
    }
    function ie() {
      const K = C.value.trim();
      K && (h.value.includes(K) || (h.value = [...h.value, K]), w.value = K, C.value = "");
    }
    return (K, Y) => (s(), n("section", Kr, [
      e("div", Yr, [
        Y[3] || (Y[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: Y[0] || (Y[0] = (D) => K.$emit("reset"))
        }, " Reset section ")) : _("", !0)
      ]),
      Y[10] || (Y[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Gr, [
        Y[4] || (Y[4] = e("label", { class: "kb-label" }, [
          X(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: m.message.sender_id ?? "",
          onInput: z
        }, null, 40, Jr)
      ]),
      e("div", Xr, [
        e("label", Qr, [
          Y[5] || (Y[5] = X(" Message body ", -1)),
          e("span", {
            class: re(["kb-counter", { "kb-counter--warn": M.value > 3 }])
          }, [
            X(u(E.value) + " chars · ", 1),
            M.value === 0 ? (s(), n("span", Zr, "0 segments")) : M.value === 1 ? (s(), n("span", ed, "1 segment")) : (s(), n("span", td, u(M.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
          value: x.value,
          onInput: J
        }, null, 40, ad),
        Y[6] || (Y[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        P.value ? (s(), n("p", sd, u(P.value), 1)) : _("", !0)
      ]),
      e("div", nd, [
        Y[7] || (Y[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", ld, [
          Ae(e("select", {
            "onUpdate:modelValue": Y[1] || (Y[1] = (D) => w.value = D),
            class: "kb-select"
          }, [
            (s(!0), n(q, null, j(h.value, (D) => (s(), n("option", {
              key: D,
              value: D
            }, u(D), 9, od))), 128))
          ], 512), [
            [Pe, w.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W
          }, " Insert into message ")
        ]),
        Y[8] || (Y[8] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", id, [
        Y[9] || (Y[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", rd, [
          Ae(e("input", {
            "onUpdate:modelValue": Y[2] || (Y[2] = (D) => C.value = D),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [lt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ie
          }, " Add ")
        ])
      ])
    ]));
  }
}), ud = /* @__PURE__ */ $e(dd, [["__scopeId", "data-v-f44c4aab"]]), cd = { class: "keos-sms-builder" }, pd = { class: "kb-builder-top" }, md = { class: "kb-sms-layout" }, vd = { class: "kb-sms-sidebar" }, bd = {
  key: 0,
  class: "kb-sms-form"
}, fd = { class: "kb-sms-form-head" }, gd = { class: "kb-sms-form-head-top" }, yd = { class: "kb-sms-health-pill" }, hd = { class: "kb-wa-form-head-row" }, kd = ["value"], _d = { class: "kb-sms-health" }, wd = { class: "kb-sms-health-row" }, $d = { class: "kb-sms-health-value" }, xd = { class: "kb-sms-health-bar" }, Cd = { class: "kb-sms-canvas" }, Sd = {
  key: 0,
  class: "kb-sms-test-banner"
}, Id = { class: "kb-sms-preview-chrome" }, Ad = { class: "kb-push-preview-controls" }, Td = { class: "kb-push-preview-as" }, Ld = ["value"], Bd = { class: "kb-preview-status" }, Ud = { class: "kb-preview" }, Rd = { class: "kb-sms-preview" }, Pd = { class: "kb-sms-phone" }, Ed = { class: "kb-sms-header" }, Od = { class: "kb-sms-sender-avatar" }, Nd = { class: "kb-sms-header-copy" }, Vd = { class: "kb-sms-sender" }, Md = { class: "kb-sms-meta" }, Dd = { class: "kb-sms-thread" }, Wd = {
  key: 0,
  class: "kb-sms-empty"
}, Hd = { class: "kb-sms-text" }, zd = { class: "kb-sms-bubble-meta" }, Fd = {
  key: 0,
  class: "kb-sms-segment-chip"
}, qd = {
  key: 0,
  class: "kb-sms-more-segments"
}, jd = { class: "kb-sms-delivery-line" }, Kd = { class: "kb-sms-counter" }, Yd = { key: 0 }, Gd = { key: 1 }, Jd = { key: 2 }, Xd = {
  key: 3,
  class: "kb-sms-cost"
}, Qd = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Zd = { class: "kb-sms-actions" }, eu = {
  key: 0,
  class: "kb-actions-note"
}, tu = { key: 0 }, au = { class: "kb-sms-actions-right" }, su = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, nu = { class: "kb-confirm-dialog" }, lu = { class: "kb-confirm-actions" }, ou = /* @__PURE__ */ _e({
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
  setup(a, { emit: r }) {
    const m = a, v = r, {
      campaign: $,
      dirty: h,
      customValidatorErrors: w,
      getValidationWithWarnings: C,
      update: x,
      updateMessage: E,
      undo: M,
      redo: P,
      canUndo: z,
      canRedo: J,
      resetMessage: W,
      hooks: ie
    } = Je({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (A) => {
          var U, S;
          const d = [];
          (U = A.name) != null && U.trim() || d.push("Template name is required");
          const i = (S = m.hooks) != null && S.customValidators ? await m.hooks.customValidators(A) : [];
          return [...d, ...i];
        }
      },
      onDirty: () => v("change", $.value)
    }), { lastSavedAt: K } = Xe($, { channel: "sms" });
    function Y(A) {
      (A.metaKey || A.ctrlKey) && A.key === "z" && (A.preventDefault(), A.shiftKey ? P() : M());
    }
    je(() => {
      window.addEventListener("keydown", Y);
    }), Ke(() => {
      window.removeEventListener("keydown", Y);
    }), Ce($, (A) => v("update:modelValue", A), { deep: !0 });
    const D = ae(), oe = ae(!0);
    async function be() {
      if (ie.estimateReach)
        try {
          D.value = await ie.estimateReach($.value.audience);
        } catch {
          D.value = void 0;
        }
      ie.canSend && (oe.value = await Promise.resolve(ie.canSend()));
    }
    be(), Ce(() => $.value.audience, be, { deep: !0 });
    const ye = y(() => (w.value, C(D.value))), ce = y(() => ye.value.blockingErrors), ee = y(() => ye.value.warnings), G = y(() => ye.value.valid), f = y(() => {
      var U, S, F;
      const A = $.value.message, d = [
        !!((U = $.value.name) != null && U.trim()),
        !!((S = A.body) != null && S.trim()),
        !!((F = A.sender_id) != null && F.trim()),
        !!$.value.template_type,
        (A.body ?? "").length > 20
      ], i = d.filter(Boolean).length;
      return Math.round(i / d.length * 100);
    }), I = y(() => f.value >= 90 ? "Production ready" : f.value >= 70 ? "Strong draft" : f.value >= 40 ? "In progress" : "Needs setup"), R = y(() => !!Q.value.trim()), le = y(
      () => $.value.template_type ?? "transactional"
    ), Z = ae(""), O = ae(!1), ve = ae(null), de = y(() => {
      const A = Z.value;
      return A ? De.find((d) => d.id === A) ?? null : null;
    }), we = y(() => {
      const A = Q.value;
      return de.value ? Ne(A, de.value.data) : A;
    });
    function ge(A) {
      const d = $.value, i = A.campaign.message ? { ...d.message, ...A.campaign.message } : d.message;
      x({
        ...A.campaign,
        message: i
      }), ve.value = null, O.value = !1;
    }
    function N(A) {
      const d = A.target.value;
      if (!d) return;
      const i = yt.find((U) => U.id === d);
      i && (h.value ? (ve.value = i, O.value = !0) : ge(i), A.target.value = "");
    }
    function k(A) {
      x({ template_type: A });
    }
    function L(A) {
      x({
        name: A,
        tracking: { ...$.value.tracking ?? {}, campaign_name: A }
      });
    }
    const Q = y(
      () => ($.value.message.body ?? "") || ""
    ), se = y(() => Q.value.length), me = y(() => /[^\x00-\x7f]/.test(Q.value)), ne = y(() => me.value ? 70 : 160), te = y(() => me.value ? 67 : 153), he = y(() => se.value ? se.value <= ne.value ? 1 : Math.ceil(se.value / te.value) : 0), Te = y(() => {
      const A = we.value.trim();
      if (!A) return [];
      const d = he.value <= 1 ? ne.value : te.value, i = [];
      for (let U = 0; U < A.length; U += d)
        i.push(A.slice(U, U + d));
      return i;
    }), Se = y(() => Te.value.slice(0, 3)), Le = y(
      () => Math.max(0, Te.value.length - Se.value.length)
    ), Ee = y(() => me.value ? "Unicode" : "GSM-7"), Ie = y(() => R.value ? he.value > 3 ? "Queued" : "Delivered" : "Draft"), Be = y(() => {
      const A = m.costPerSegment ?? 0;
      return !A || he.value === 0 ? null : (he.value * A).toFixed(2);
    }), Ue = y(() => {
      const A = se.value, d = ne.value + te.value;
      return A <= ne.value ? null : A <= d ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), c = y(
      () => $.value.message.sender_id ?? "YourBrand"
    );
    function b() {
      G.value && v("save", $.value);
    }
    return (A, d) => {
      var i;
      return s(), n("div", cd, [
        e("div", pd, [
          xe(Qe, {
            "campaign-name": g($).name,
            status: g($).status,
            dirty: g(h),
            "last-saved-at": g(K),
            "can-undo": g(z),
            "can-redo": g(J),
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": L,
            onUndo: g(M),
            onRedo: g(P)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ce.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: pe({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Ve).input}px`,
              padding: `${g(ue)[12]}px ${g(ue)[16]}px`,
              marginBottom: `${g(ue)[16]}px`
            })
          }, [
            e("ul", {
              style: pe({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (s(!0), n(q, null, j(ce.value, (U) => (s(), n("li", {
                key: U.message
              }, u(U.message), 1))), 128))
            ], 4)
          ], 4)) : _("", !0)
        ]),
        e("div", md, [
          e("aside", vd, [
            a.disabledSections.includes("sms") ? _("", !0) : (s(), n("div", bd, [
              e("div", fd, [
                e("div", gd, [
                  d[6] || (d[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", yd, u(I.value), 1)
                ]),
                e("div", hd, [
                  xe(ut, {
                    "template-type": le.value,
                    onUpdate: k
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: N
                  }, [
                    d[7] || (d[7] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(q, null, j(g(yt), (U) => (s(), n("option", {
                      key: U.id,
                      value: U.id
                    }, u(U.label), 9, kd))), 128))
                  ], 32)
                ]),
                e("div", _d, [
                  e("div", wd, [
                    d[8] || (d[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", $d, u(f.value) + "%", 1)
                  ]),
                  e("div", xd, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: pe({ width: `${f.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              xe(ud, {
                message: g($).message,
                "variable-options": a.variableOptions,
                "show-reset": !0,
                onUpdate: g(E),
                onReset: d[0] || (d[0] = (U) => g(W)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Cd, [
            !a.designOnly && g($).audience.test_mode ? (s(), n("div", Sd, [...d[9] || (d[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              X(" Test mode — only your test segment will receive this. ", -1)
            ])])) : _("", !0),
            e("div", Id, [
              e("div", Ad, [
                e("label", Td, [
                  d[11] || (d[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ae(e("select", {
                    "onUpdate:modelValue": d[1] || (d[1] = (U) => Z.value = U),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    d[10] || (d[10] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(q, null, j(g(De), (U) => (s(), n("option", {
                      key: U.id,
                      value: U.id
                    }, u(U.label), 9, Ld))), 128))
                  ], 512), [
                    [Pe, Z.value]
                  ])
                ]),
                e("div", Bd, [
                  d[12] || (d[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, u(he.value || 0), 1)
                ])
              ]),
              e("div", {
                class: re(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !R.value }])
              }, [
                e("div", Ud, [
                  e("div", Rd, [
                    e("div", Pd, [
                      d[15] || (d[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Ed, [
                        e("div", Od, u(c.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Nd, [
                          e("div", Vd, u(c.value), 1),
                          e("div", Md, "Text message · " + u(Ie.value), 1)
                        ])
                      ]),
                      e("div", Dd, [
                        R.value ? (s(), n(q, { key: 1 }, [
                          (s(!0), n(q, null, j(Se.value, (U, S) => (s(), n("div", {
                            key: `${S}-${U.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", Hd, u(U), 1),
                            e("span", zd, [
                              d[13] || (d[13] = X(" 09:21 ", -1)),
                              Se.value.length > 1 ? (s(), n("span", Fd, "Part " + u(S + 1), 1)) : _("", !0)
                            ])
                          ]))), 128)),
                          Le.value > 0 ? (s(), n("div", qd, " +" + u(Le.value) + " more segments ", 1)) : _("", !0),
                          e("div", jd, [
                            d[14] || (d[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            X(" " + u(Ie.value), 1)
                          ])
                        ], 64)) : (s(), n("div", Wd, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Kd, [
                      X(u(se.value) + " characters · ", 1),
                      he.value === 0 ? (s(), n("span", Yd, "0 segments")) : he.value === 1 ? (s(), n("span", Gd, "1 segment")) : (s(), n("span", Jd, u(he.value) + " segments", 1)),
                      X(" (" + u(ne.value) + " chars single, " + u(te.value) + " multi-part · " + u(Ee.value) + ") ", 1),
                      Be.value !== null ? (s(), n("span", Xd, " · Est. " + u(Be.value), 1)) : _("", !0)
                    ]),
                    Ue.value ? (s(), n("p", Qd, u(Ue.value), 1)) : _("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Zd, [
          ee.value.length > 0 ? (s(), n("div", eu, [
            d[16] || (d[16] = e("strong", null, "Warning:", -1)),
            X(" " + u((i = ee.value[0]) == null ? void 0 : i.message) + " ", 1),
            ee.value.length > 1 ? (s(), n("span", tu, " (+" + u(ee.value.length - 1) + " more) ", 1)) : _("", !0)
          ])) : _("", !0),
          e("div", au, [
            a.showDuplicate ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: d[2] || (d[2] = (U) => v("duplicate", JSON.parse(JSON.stringify(g($)))))
            }, " Duplicate ")) : _("", !0),
            a.showSave ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: b
            }, " Save ")) : _("", !0),
            a.showClose ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: d[3] || (d[3] = (U) => v("edit"))
            }, " Close ")) : _("", !0)
          ])
        ]),
        O.value ? (s(), n("div", su, [
          e("div", nu, [
            d[17] || (d[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            d[18] || (d[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", lu, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: d[4] || (d[4] = (U) => {
                  O.value = !1, ve.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: d[5] || (d[5] = (U) => ve.value && ge(ve.value))
              }, " Replace ")
            ])
          ])
        ])) : _("", !0)
      ]);
    };
  }
}), Mt = /* @__PURE__ */ $e(ou, [["__scopeId", "data-v-5e442b56"]]), iu = 30, ru = 60, du = 130;
function uu(a) {
  const r = (a ?? "").trim().length;
  return r < iu ? "too_short" : r <= ru ? "good" : "too_long";
}
function cu(a) {
  const r = (a ?? "").trim().length;
  return r === 0 ? "too_short" : r <= du ? "good" : "too_long";
}
const pu = [
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
function St(a) {
  if (!a || typeof a != "string") return [];
  const r = [];
  for (const m of pu) {
    const v = a.match(m);
    v && r.push(v[0]);
  }
  return r;
}
function mu(a) {
  switch (a) {
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
function vu(a) {
  switch (a) {
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
const bu = { class: "em-section" }, fu = { class: "em-strip kb-section" }, gu = { class: "em-strip-head" }, yu = { class: "em-field kb-field" }, hu = ["value"], ku = { class: "em-field kb-field" }, _u = ["value"], wu = { class: "em-field kb-field" }, $u = ["value"], xu = { class: "em-field kb-field" }, Cu = { class: "em-input-group" }, Su = ["value"], Iu = { class: "em-var-picker-wrap" }, Au = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Tu = ["onClick"], Lu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Bu = { class: "em-field kb-field" }, Uu = { class: "em-input-group" }, Ru = ["value"], Pu = { class: "em-var-picker-wrap" }, Eu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ou = ["onClick"], Nu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Vu = { class: "em-strip kb-section em-strip--library" }, Mu = { class: "em-library-chips" }, Du = ["onClick"], Wu = { class: "em-strip kb-section em-strip--blocks" }, Hu = { class: "em-block-list" }, zu = ["data-type"], Fu = { class: "em-block-bar" }, qu = { class: "em-block-type" }, ju = { class: "em-block-actions" }, Ku = ["disabled", "onClick"], Yu = ["disabled", "onClick"], Gu = ["onClick"], Ju = {
  key: 0,
  class: "em-block-fields"
}, Xu = ["value", "onChange"], Qu = ["value", "onInput"], Zu = { class: "em-var-picker-wrap" }, ec = ["onClick"], tc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ac = ["onClick"], sc = {
  key: 1,
  class: "em-block-fields"
}, nc = ["value", "onInput"], lc = { class: "em-var-picker-wrap" }, oc = ["onClick"], ic = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, rc = ["onClick"], dc = {
  key: 2,
  class: "em-block-fields"
}, uc = ["value", "onInput"], cc = ["value", "onInput"], pc = ["value", "onInput"], mc = {
  key: 3,
  class: "em-block-fields"
}, vc = ["value", "onInput"], bc = ["value", "onInput"], fc = { class: "em-block-fields--row" }, gc = ["value", "onInput"], yc = { class: "em-check-row" }, hc = ["checked", "onChange"], kc = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, _c = ["value", "onInput"], wc = {
  key: 5,
  class: "em-block-fields"
}, $c = ["value", "onInput"], xc = ["value", "onInput"], Cc = ["value", "onInput"], Sc = { class: "em-var-picker-wrap" }, Ic = ["onClick"], Ac = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Tc = ["onClick"], Lc = {
  key: 6,
  class: "em-block-fields"
}, Bc = ["value", "onChange"], Uc = { class: "em-list-items" }, Rc = ["value", "onInput", "placeholder"], Pc = ["onClick"], Ec = ["onClick"], Oc = {
  key: 7,
  class: "em-block-fields"
}, Nc = ["value", "onChange"], Vc = ["value", "onInput"], Mc = { class: "em-var-picker-wrap" }, Dc = ["onClick"], Wc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Hc = ["onClick"], zc = {
  key: 8,
  class: "em-block-fields"
}, Fc = { class: "em-social-links" }, qc = ["value", "onChange"], jc = ["value", "onInput"], Kc = ["onClick"], Yc = ["onClick"], Gc = {
  key: 9,
  class: "em-block-fields"
}, Jc = ["value", "onInput"], Xc = ["value", "onInput"], Qc = ["value", "onInput"], Zc = {
  key: 10,
  class: "em-block-fields"
}, ep = ["value", "onInput"], tp = { class: "em-link-list-items" }, ap = ["value", "onInput"], sp = ["value", "onInput"], np = ["onClick"], lp = ["onClick"], op = {
  key: 11,
  class: "em-block-fields"
}, ip = ["value", "onInput"], rp = { class: "em-var-picker-wrap" }, dp = ["onClick"], up = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, cp = ["onClick"], pp = ["value", "onInput"], mp = { class: "em-var-picker-wrap" }, vp = ["onClick"], bp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, fp = ["onClick"], gp = {
  key: 12,
  class: "em-block-fields"
}, yp = { class: "em-block-fields--row" }, hp = ["value", "onInput"], kp = { class: "em-block-fields--row" }, _p = ["value", "onInput"], wp = ["value", "onChange"], $p = {
  key: 13,
  class: "em-block-fields"
}, xp = ["value", "onChange"], Cp = { class: "em-inline-label" }, Sp = ["value", "onInput"], Ip = { class: "em-var-picker-wrap" }, Ap = ["onClick"], Tp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Lp = ["onClick"], Bp = {
  key: 14,
  class: "em-block-fields"
}, Up = ["value", "onInput"], Rp = { class: "em-link-list-items" }, Pp = ["value", "onInput"], Ep = ["value", "onInput"], Op = ["onClick"], Np = ["onClick"], Vp = {
  key: 15,
  class: "em-block-fields"
}, Mp = ["value", "onInput"], Dp = ["value", "onInput"], Wp = ["onClick"], Hp = ["onClick"], zp = {
  key: 16,
  class: "em-block-fields"
}, Fp = ["value", "onInput"], qp = ["value", "onInput"], jp = ["value", "onInput"], Kp = ["onClick"], Yp = ["onClick"], Gp = {
  key: 17,
  class: "em-block-fields"
}, Jp = ["value", "onInput"], Xp = ["value", "onInput"], Qp = {
  key: 18,
  class: "em-block-fields"
}, Zp = ["value", "onInput"], em = ["value", "onInput"], tm = ["value", "onInput"], am = ["value", "onInput"], sm = ["value", "onInput"], nm = {
  key: 19,
  class: "em-block-fields"
}, lm = ["value", "onInput"], om = { class: "em-var-picker-wrap" }, im = ["onClick"], rm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, dm = ["onClick"], um = {
  key: 20,
  class: "em-block-fields"
}, cm = ["value", "onInput"], pm = ["value", "onInput"], mm = { class: "em-var-picker-wrap" }, vm = ["onClick"], bm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, fm = ["onClick"], gm = {
  key: 21,
  class: "em-block-fields"
}, ym = ["value", "onInput"], hm = { class: "em-block-fields--row" }, km = ["value", "onInput"], _m = {
  key: 22,
  class: "em-block-fields"
}, wm = ["value", "onInput"], $m = ["value", "onInput"], xm = ["value", "onInput"], Cm = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Sm = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, Im = ["onClick"], Am = ["onClick"], Tm = ["onClick"], Lm = { class: "em-check-row" }, Bm = ["checked", "onChange"], Um = { class: "em-add-bar kb-field kb-field--add-bar" }, Rm = { class: "em-add-bar-btns" }, Pm = { class: "em-strip kb-section em-strip--personalize" }, Em = { class: "em-field kb-field" }, Om = { class: "em-input-group" }, Nm = ["value"], Vm = { class: "em-field kb-field" }, Mm = { class: "em-input-group" }, Re = "{{ .var }}", Dm = /* @__PURE__ */ _e({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: r }) {
    var T;
    function m() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const v = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], $ = [
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
    function h(p) {
      switch (p) {
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
          return { id: m(), type: "social", links: v.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
    const w = a, C = r, x = ["first_name", "last_name", "order_id", "city", "email"], E = ae(
      (T = w.variableOptions) != null && T.length ? [...w.variableOptions] : x
    ), M = ae(E.value[0] ?? "first_name"), P = ae("");
    Ce(
      () => w.variableOptions,
      (p) => {
        p != null && p.length && (E.value = [...p], E.value.includes(M.value) || (M.value = E.value[0]));
      }
    );
    const z = y(() => w.message.subject ?? ""), J = y(() => w.message.preview_text ?? ""), W = y(() => uu(z.value)), ie = y(() => cu(J.value)), K = y(() => St(z.value)), Y = y(() => St(J.value)), D = y(() => {
      const p = w.message.blocks;
      return Array.isArray(p) && p.length > 0 ? p : [h("paragraph")];
    });
    Ce(
      () => w.message.blocks,
      (p) => {
        (!Array.isArray(p) || p.length === 0) && C("update", { blocks: [h("paragraph")] });
      },
      { immediate: !0 }
    );
    function oe(p) {
      C("update", { blocks: p });
    }
    function be(p) {
      C("update", { subject: p.target.value });
    }
    function ye(p) {
      const l = p.target.value;
      C("update", { preview_text: l || void 0 });
    }
    function ce(p) {
      C("update", { from_name: p.target.value || void 0 });
    }
    function ee(p) {
      C("update", { from_address: p.target.value || void 0 });
    }
    function G(p) {
      C("update", { reply_to: p.target.value || void 0 });
    }
    const f = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [h("heading"), h("paragraph"), h("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [h("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [h("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [h("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [h("social"), h("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [h("footer"), h("link_list")]
      }
    ];
    function I(p) {
      const l = p.blocks();
      oe([...D.value, ...l]);
    }
    function R(p) {
      const l = [...D.value, h(p)];
      oe(l);
    }
    function le(p) {
      oe(D.value.filter((l) => l.id !== p));
    }
    function Z(p, l) {
      const t = D.value.findIndex((V) => V.id === p);
      if (t < 0) return;
      const B = l === "up" ? t - 1 : t + 1;
      if (B < 0 || B >= D.value.length) return;
      const o = [...D.value];
      [o[t], o[B]] = [o[B], o[t]], oe(o);
    }
    function O(p, l) {
      const t = D.value.map((B) => B.id === p ? { ...B, ...l } : B);
      oe(t);
    }
    function ve(p, l, t) {
      const B = D.value.find((V) => V.id === p);
      if (!B || B.type !== "list") return;
      const o = [...B.items || []];
      o[l] = t, O(p, { items: o });
    }
    function de(p) {
      const l = D.value.find((t) => t.id === p);
      !l || l.type !== "list" || O(p, { items: [...l.items || [], "New item"] });
    }
    function we(p, l) {
      const t = D.value.find((o) => o.id === p);
      if (!t || t.type !== "list") return;
      const B = (t.items || []).filter((o, V) => V !== l);
      O(p, { items: B });
    }
    function ge(p, l, t, B) {
      const o = D.value.find((H) => H.id === p);
      if (!o || o.type !== "social") return;
      const V = (o.links || []).map((H, ke) => ke === l ? { ...H, [t]: B } : H);
      O(p, { links: V });
    }
    function N(p) {
      const l = D.value.find((t) => t.id === p);
      !l || l.type !== "social" || O(p, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function k(p, l) {
      const t = D.value.find((o) => o.id === p);
      if (!t || t.type !== "social") return;
      const B = (t.links || []).filter((o, V) => V !== l);
      O(p, { links: B });
    }
    function L(p, l, t, B) {
      const o = D.value.find((H) => H.id === p);
      if (!o || o.type !== "link_list") return;
      const V = (o.links || []).map((H, ke) => ke === l ? { ...H, [t]: B } : H);
      O(p, { links: V });
    }
    function Q(p) {
      const l = D.value.find((t) => t.id === p);
      !l || l.type !== "link_list" || O(p, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function se(p, l) {
      const t = D.value.find((o) => o.id === p);
      if (!t || t.type !== "link_list") return;
      const B = (t.links || []).filter((o, V) => V !== l);
      O(p, { links: B });
    }
    function me(p, l) {
      const t = D.value.find((B) => B.id === p);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const B = [...t.cells || []];
          for (; B.length < l.columnCount; ) B.push("Cell content");
          l.cells = B.slice(0, l.columnCount);
        }
        O(p, l);
      }
    }
    function ne(p, l, t) {
      const B = D.value.find((V) => V.id === p);
      if (!B || B.type !== "row") return;
      const o = [...B.cells || []];
      o[l] = t, O(p, { cells: o });
    }
    function te(p, l, t, B) {
      const o = D.value.find((H) => H.id === p);
      if (!o || o.type !== "navbar") return;
      const V = (o.links || []).map((H, ke) => ke === l ? { ...H, [t]: B } : H);
      O(p, { links: V });
    }
    function he(p) {
      const l = D.value.find((t) => t.id === p);
      !l || l.type !== "navbar" || O(p, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function Te(p, l) {
      const t = D.value.find((B) => B.id === p);
      !t || t.type !== "navbar" || O(p, { links: (t.links || []).filter((B, o) => o !== l) });
    }
    function Se(p, l, t, B) {
      const o = D.value.find((H) => H.id === p);
      if (!o || o.type !== "accordion") return;
      const V = (o.items || []).map((H, ke) => ke === l ? { ...H, [t]: B } : H);
      O(p, { items: V });
    }
    function Le(p) {
      const l = D.value.find((t) => t.id === p);
      !l || l.type !== "accordion" || O(p, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function Ee(p, l) {
      const t = D.value.find((B) => B.id === p);
      !t || t.type !== "accordion" || O(p, { items: (t.items || []).filter((B, o) => o !== l) });
    }
    function Ie(p, l, t, B) {
      const o = D.value.find((H) => H.id === p);
      if (!o || o.type !== "carousel") return;
      const V = (o.slides || []).map((H, ke) => ke === l ? { ...H, [t]: B } : H);
      O(p, { slides: V });
    }
    function Be(p) {
      const l = D.value.find((t) => t.id === p);
      !l || l.type !== "carousel" || O(p, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Ue(p, l) {
      const t = D.value.find((B) => B.id === p);
      !t || t.type !== "carousel" || O(p, { slides: (t.slides || []).filter((B, o) => o !== l) });
    }
    function c(p, l = M.value) {
      const t = ` {{ .${l} }}`, B = w.message.variables ?? [], o = Array.from(/* @__PURE__ */ new Set([...B, l]));
      p === "subject" ? C("update", {
        subject: (z.value || "") + t,
        variables: o
      }) : C("update", {
        preview_text: (J.value || "") + t,
        variables: o
      });
    }
    function b(p, l = M.value) {
      const t = D.value.find((We) => We.id === p);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const B = ` {{ .${l} }}`, o = w.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...o, l])), H = (t.type === "footer", "content"), ze = (t[H] ?? "") + B, qe = D.value.map(
        (We) => We.id === p ? { ...We, [H]: ze } : We
      );
      C("update", { blocks: qe, variables: V });
    }
    function A(p, l, t = M.value) {
      const B = D.value.find((ze) => ze.id === p);
      if (!B || B.type !== "row") return;
      const o = ` {{ .${t} }}`, V = w.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...V, t])), ke = [...B.cells || []];
      ke[l] = (ke[l] || "") + o, O(p, { cells: ke }), C("update", { variables: H });
    }
    function d(p, l, t = M.value) {
      const B = D.value.find((We) => We.id === p);
      if (!B || B.type !== "columns") return;
      const o = ` {{ .${t} }}`, V = w.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...V, t])), ke = l === "left" ? "leftContent" : "rightContent", qe = (B[ke] ?? "") + o;
      O(p, { [ke]: qe }), C("update", { variables: H });
    }
    const i = ae(null);
    function U(p) {
      i.value = i.value === p ? null : p;
    }
    function S(p, l) {
      if (l) {
        if (p === "subject") c("subject", l);
        else if (p === "preview") c("preview", l);
        else if (p.startsWith("block:")) b(p.slice(6), l);
        else if (p.startsWith("col-left:")) d(p.slice(9), "left", l);
        else if (p.startsWith("col-right:")) d(p.slice(10), "right", l);
        else if (p.startsWith("row:")) {
          const [, t, B] = p.split(":");
          A(t, Number(B), l);
        }
        i.value = null;
      }
    }
    function F() {
      const p = P.value.trim();
      !p || E.value.includes(p) || (E.value = [...E.value, p], M.value = p, P.value = "");
    }
    return (p, l) => (s(), n("section", bu, [
      e("div", fu, [
        e("div", gu, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => p.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", yu, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: a.message.from_name ?? "",
            onInput: ce
          }, null, 40, hu)
        ]),
        e("div", ku, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: a.message.from_address ?? "",
            onInput: ee
          }, null, 40, _u)
        ]),
        e("div", wu, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            X("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: a.message.reply_to ?? "",
            onInput: G
          }, null, 40, $u)
        ]),
        e("div", xu, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Cu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: z.value,
              onInput: be
            }, null, 40, Su),
            e("div", Iu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[1] || (l[1] = (t) => U("subject")),
                title: "Insert variable"
              }, u(Re)),
              i.value === "subject" ? (s(), n("div", Au, [
                (s(!0), n(q, null, j(E.value, (t) => (s(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (B) => S("subject", t)
                }, u(t), 9, Tu))), 128))
              ])) : _("", !0)
            ])
          ]),
          e("span", {
            class: re(["em-analyzer", `em-analyzer--${W.value}`])
          }, u(g(mu)(W.value)), 3),
          K.value.length ? (s(), n("span", Lu, "Spammy: " + u(K.value.join(", ")), 1)) : _("", !0)
        ]),
        e("div", Bu, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            X("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Uu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: J.value,
              onInput: ye
            }, null, 40, Ru),
            e("div", Pu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => U("preview")),
                title: "Insert variable"
              }, u(Re)),
              i.value === "preview" ? (s(), n("div", Eu, [
                (s(!0), n(q, null, j(E.value, (t) => (s(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (B) => S("preview", t)
                }, u(t), 9, Ou))), 128))
              ])) : _("", !0)
            ])
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: re(["em-analyzer", `em-analyzer--${ie.value}`])
          }, u(g(vu)(ie.value)), 3),
          Y.value.length ? (s(), n("span", Nu, "Spammy: " + u(Y.value.join(", ")), 1)) : _("", !0)
        ])
      ]),
      e("div", Vu, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Mu, [
          (s(), n(q, null, j(f, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (B) => I(t)
          }, u(t.label), 9, Du)), 64))
        ])
      ]),
      e("div", Wu, [
        l[64] || (l[64] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[65] || (l[65] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Hu, [
          (s(!0), n(q, null, j(D.value, (t, B) => (s(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Fu, [
              e("span", qu, u(t.type), 1),
              e("div", ju, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: B === 0,
                  onClick: (o) => Z(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Ku),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: B === D.value.length - 1,
                  onClick: (o) => Z(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Yu),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (o) => le(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Gu)
              ])
            ]),
            t.type === "heading" ? (s(), n("div", Ju, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (o) => O(t.id, { level: Number(o.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Xu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (o) => O(t.id, { content: o.target.value }),
                placeholder: "Heading text"
              }, null, 40, Qu),
              e("div", Zu, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`block:${t.id}`)
                }, u(Re), 8, ec),
                i.value === `block:${t.id}` ? (s(), n("div", tc, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `block-var-heading-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`block:${t.id}`, o)
                  }, u(o), 9, ac))), 128))
                ])) : _("", !0)
              ])
            ])) : t.type === "paragraph" ? (s(), n("div", sc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => O(t.id, { content: o.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, nc),
              e("div", lc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`block:${t.id}`)
                }, u(Re), 8, oc),
                i.value === `block:${t.id}` ? (s(), n("div", ic, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `block-var-paragraph-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`block:${t.id}`, o)
                  }, u(o), 9, rc))), 128))
                ])) : _("", !0)
              ])
            ])) : t.type === "image" ? (s(), n("div", dc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (o) => O(t.id, { src: o.target.value }),
                placeholder: "Image URL"
              }, null, 40, uc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => O(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, cc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (o) => O(t.id, { linkUrl: o.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, pc)
            ])) : t.type === "button" ? (s(), n("div", mc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (o) => O(t.id, { text: o.target.value }),
                placeholder: "Button text"
              }, null, 40, vc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (o) => O(t.id, { url: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, bc),
              e("div", fc, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (o) => O(t.id, { borderRadius: Number(o.target.value) || 0 })
                }, null, 40, gc)
              ]),
              e("label", yc, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (o) => O(t.id, { ghost: o.target.checked })
                }, null, 40, hc),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (s(), n("div", kc, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (o) => O(t.id, { height: Number(o.target.value) || 24 })
              }, null, 40, _c),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (s(), n("div", wc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => O(t.id, { content: o.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, $c),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (o) => O(t.id, { unsubscribeUrl: o.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, xc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (o) => O(t.id, { companyAddress: o.target.value }),
                placeholder: "Company address"
              }, null, 40, Cc),
              e("div", Sc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`block:${t.id}`)
                }, u(Re), 8, Ic),
                i.value === `block:${t.id}` ? (s(), n("div", Ac, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `block-var-footer-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`block:${t.id}`, o)
                  }, u(o), 9, Tc))), 128))
                ])) : _("", !0)
              ])
            ])) : t.type === "list" ? (s(), n("div", Lc, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (o) => O(t.id, { style: o.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Bc),
              e("div", Uc, [
                (s(!0), n(q, null, j(t.items || [], (o, V) => (s(), n("div", {
                  key: V,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o,
                    onInput: (H) => ve(t.id, V, H.target.value),
                    placeholder: `Item ${V + 1}`
                  }, null, 40, Rc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => we(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Pc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => de(t.id)
              }, "+ Add item", 8, Ec)
            ])) : t.type === "quote" ? (s(), n("div", Oc, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (o) => O(t.id, { style: o.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Nc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => O(t.id, { content: o.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Vc),
              e("div", Mc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`block:${t.id}`)
                }, u(Re), 8, Dc),
                i.value === `block:${t.id}` ? (s(), n("div", Wc, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `block-var-quote-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`block:${t.id}`, o)
                  }, u(o), 9, Hc))), 128))
                ])) : _("", !0)
              ])
            ])) : t.type === "social" ? (s(), n("div", zc, [
              e("div", Fc, [
                (s(!0), n(q, null, j(t.links || [], (o, V) => (s(), n("div", {
                  key: V,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: o.platform,
                    class: "em-select em-select--sm",
                    onChange: (H) => ge(t.id, V, "platform", H.target.value)
                  }, [...l[45] || (l[45] = [
                    He('<option value="facebook" data-v-64de8497>Facebook</option><option value="twitter" data-v-64de8497>Twitter / X</option><option value="instagram" data-v-64de8497>Instagram</option><option value="linkedin" data-v-64de8497>LinkedIn</option><option value="youtube" data-v-64de8497>YouTube</option><option value="tiktok" data-v-64de8497>TikTok</option><option value="custom" data-v-64de8497>Custom</option>', 7)
                  ])], 40, qc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (H) => ge(t.id, V, "url", H.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, jc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => k(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Kc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => N(t.id)
              }, "+ Add link", 8, Yc)
            ])) : t.type === "video" ? (s(), n("div", Gc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (o) => O(t.id, { thumbnailUrl: o.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Jc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (o) => O(t.id, { videoUrl: o.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Xc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => O(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Qc)
            ])) : t.type === "link_list" ? (s(), n("div", Zc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => O(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, ep),
              e("div", tp, [
                (s(!0), n(q, null, j(t.links || [], (o, V) => (s(), n("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (H) => L(t.id, V, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, ap),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (H) => L(t.id, V, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, sp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => se(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, np)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Q(t.id)
              }, "+ Add link", 8, lp)
            ])) : t.type === "columns" ? (s(), n("div", op, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (o) => O(t.id, { leftContent: o.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, ip),
              e("div", rp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`col-left:${t.id}`)
                }, u(Re), 8, dp),
                i.value === `col-left:${t.id}` ? (s(), n("div", up, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `col-left-var-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`col-left:${t.id}`, o)
                  }, u(o), 9, cp))), 128))
                ])) : _("", !0)
              ]),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (o) => O(t.id, { rightContent: o.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, pp),
              e("div", mp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`col-right:${t.id}`)
                }, u(Re), 8, vp),
                i.value === `col-right:${t.id}` ? (s(), n("div", bp, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `col-right-var-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`col-right:${t.id}`, o)
                  }, u(o), 9, fp))), 128))
                ])) : _("", !0)
              ])
            ])) : t.type === "divider" ? (s(), n("div", gp, [
              e("div", yp, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (o) => O(t.id, { thickness: Number(o.target.value) || 1 })
                }, null, 40, hp),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", kp, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (o) => O(t.id, { color: o.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, _p)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (o) => O(t.id, { lineStyle: o.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, wp)
            ])) : t.type === "row" ? (s(), n("div", $p, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (o) => me(t.id, { columnCount: Number(o.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, xp),
              (s(!0), n(q, null, j(t.cells || [], (o, V) => (s(), n("div", {
                key: V,
                class: "em-row-cell"
              }, [
                e("label", Cp, "Column " + u(V + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o,
                  onInput: (H) => ne(t.id, V, H.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Sp),
                e("div", Ip, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (H) => U(`row:${t.id}:${V}`)
                  }, u(Re), 8, Ap),
                  i.value === `row:${t.id}:${V}` ? (s(), n("div", Tp, [
                    (s(!0), n(q, null, j(E.value, (H) => (s(), n("button", {
                      key: `row-var-${t.id}-${V}-${H}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (ke) => S(`row:${t.id}:${V}`, H)
                    }, u(H), 9, Lp))), 128))
                  ])) : _("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (s(), n("div", Bp, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => O(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Up),
              e("div", Rp, [
                (s(!0), n(q, null, j(t.links || [], (o, V) => (s(), n("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (H) => te(t.id, V, "text", H.target.value),
                    placeholder: "Label"
                  }, null, 40, Pp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (H) => te(t.id, V, "url", H.target.value),
                    placeholder: "URL"
                  }, null, 40, Ep),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (H) => Te(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Op)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => he(t.id)
              }, "+ Add link", 8, Np)
            ])) : t.type === "accordion" ? (s(), n("div", Vp, [
              (s(!0), n(q, null, j(t.items || [], (o, V) => (s(), n("div", {
                key: V,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.title,
                  onInput: (H) => Se(t.id, V, "title", H.target.value),
                  placeholder: "Section title"
                }, null, 40, Mp),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o.content,
                  onInput: (H) => Se(t.id, V, "content", H.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Dp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => Ee(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Wp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Le(t.id)
              }, "+ Add section", 8, Hp)
            ])) : t.type === "carousel" ? (s(), n("div", zp, [
              (s(!0), n(q, null, j(t.slides || [], (o, V) => (s(), n("div", {
                key: V,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.imageUrl,
                  onInput: (H) => Ie(t.id, V, "imageUrl", H.target.value),
                  placeholder: "Image URL"
                }, null, 40, Fp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.alt,
                  onInput: (H) => Ie(t.id, V, "alt", H.target.value),
                  placeholder: "Alt text"
                }, null, 40, qp),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.linkUrl,
                  onInput: (H) => Ie(t.id, V, "linkUrl", H.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, jp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (H) => Ue(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Kp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Be(t.id)
              }, "+ Add slide", 8, Yp)
            ])) : t.type === "countdown" ? (s(), n("div", Gp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (o) => O(t.id, { label: o.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Jp),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (o) => O(t.id, { endDateTime: o.target.value ? new Date(o.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Xp),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (s(), n("div", Qp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => O(t.id, { imageUrl: o.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Zp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (o) => O(t.id, { title: o.target.value }),
                placeholder: "Product title"
              }, null, 40, em),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (o) => O(t.id, { price: o.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, tm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (o) => O(t.id, { buttonText: o.target.value }),
                placeholder: "Button text"
              }, null, 40, am),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (o) => O(t.id, { buttonUrl: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, sm)
            ])) : t.type === "liquid" ? (s(), n("div", nm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => O(t.id, { content: o.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, lm),
              e("div", om, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`block:${t.id}`)
                }, u(Re), 8, im),
                i.value === `block:${t.id}` ? (s(), n("div", rm, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `block-var-liquid-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`block:${t.id}`, o)
                  }, u(o), 9, dm))), 128))
                ])) : _("", !0)
              ]),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (s(), n("div", um, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => O(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, cm),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => O(t.id, { content: o.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, pm),
              e("div", mm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => U(`block:${t.id}`)
                }, u(Re), 8, vm),
                i.value === `block:${t.id}` ? (s(), n("div", bm, [
                  (s(!0), n(q, null, j(E.value, (o) => (s(), n("button", {
                    key: `block-var-code-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => S(`block:${t.id}`, o)
                  }, u(o), 9, fm))), 128))
                ])) : _("", !0)
              ]),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (s(), n("div", gm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (o) => O(t.id, { feedUrl: o.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, ym),
              e("div", hm, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (o) => O(t.id, { maxItems: Number(o.target.value) || 5 })
                }, null, 40, km)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (s(), n("div", _m, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => O(t.id, { imageUrl: o.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, wm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => O(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, $m),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (o) => O(t.id, { fallbackUrl: o.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, xm)
            ])) : _("", !0),
            $.includes(t.type) ? (s(), n("div", Cm, [
              e("div", Sm, [
                e("button", {
                  type: "button",
                  class: re(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (o) => O(t.id, { alignment: "left" })
                }, [...l[59] || (l[59] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Im),
                e("button", {
                  type: "button",
                  class: re(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (o) => O(t.id, { alignment: "center" })
                }, [...l[60] || (l[60] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Am),
                e("button", {
                  type: "button",
                  class: re(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (o) => O(t.id, { alignment: "right" })
                }, [...l[61] || (l[61] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Tm)
              ]),
              e("label", Lm, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (o) => O(t.id, { fullWidth: o.target.checked })
                }, null, 40, Bm),
                l[62] || (l[62] = e("span", null, "Full width", -1))
              ])
            ])) : _("", !0)
          ], 8, zu))), 128))
        ]),
        e("div", Um, [
          l[63] || (l[63] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Rm, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (t) => R("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (t) => R("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (t) => R("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => R("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => R("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => R("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => R("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => R("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => R("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => R("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => R("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => R("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => R("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => R("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => R("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => R("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => R("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => R("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => R("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => R("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => R("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => R("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => R("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Pm, [
        l[68] || (l[68] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[69] || (l[69] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Em, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Om, [
            Ae(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => M.value = t),
              class: "em-select em-select--flex"
            }, [
              (s(!0), n(q, null, j(E.value, (t) => (s(), n("option", {
                key: t,
                value: t
              }, u(t), 9, Nm))), 128))
            ], 512), [
              [Pe, M.value]
            ])
          ])
        ]),
        e("div", Vm, [
          l[67] || (l[67] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Mm, [
            Ae(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => P.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [lt, P.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: F
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Wm = /* @__PURE__ */ $e(Dm, [["__scopeId", "data-v-64de8497"]]), Hm = { class: "keos-email-builder" }, zm = { class: "kb-builder-top" }, Fm = { class: "kb-email-layout" }, qm = { class: "kb-email-sidebar" }, jm = {
  key: 0,
  class: "kb-email-form"
}, Km = { class: "kb-email-form-head" }, Ym = { class: "kb-email-form-head-top" }, Gm = { class: "kb-email-health-pill" }, Jm = { class: "kb-wa-form-head-row" }, Xm = ["value"], Qm = { class: "kb-email-health" }, Zm = { class: "kb-email-health-row" }, ev = { class: "kb-email-health-value" }, tv = { class: "kb-email-health-bar" }, av = { class: "kb-email-canvas" }, sv = {
  key: 0,
  class: "kb-email-test-banner"
}, nv = { class: "kb-email-preview-chrome" }, lv = { class: "kb-push-preview-controls" }, ov = { class: "kb-push-preview-as" }, iv = ["value"], rv = { class: "kb-preview-status" }, dv = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, uv = { class: "kb-email-inbox-strip" }, cv = { class: "kb-email-inbox-from" }, pv = { class: "kb-email-inbox-from-name" }, mv = { class: "kb-email-inbox-from-addr" }, vv = { class: "kb-email-inbox-subject" }, bv = ["title"], fv = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, gv = { class: "kb-email-body-canvas" }, yv = ["innerHTML"], hv = { class: "kb-email-actions" }, kv = {
  key: 0,
  class: "kb-actions-note"
}, _v = { key: 0 }, wv = { class: "kb-email-actions-right" }, $v = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, xv = { class: "kb-confirm-dialog" }, Cv = { class: "kb-confirm-actions" }, Sv = /* @__PURE__ */ _e({
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
  setup(a, { emit: r }) {
    function m(d) {
      if (!Array.isArray(d) || d.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const i = (T) => String(T).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), U = [
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
      ], S = (T, p) => {
        if (!U.includes(p.type)) return T;
        const l = p.alignment || "left", t = !!p.fullWidth;
        return `<div style="text-align:${l};${t ? "width:100%;" : ""}">${T}</div>`;
      }, F = [];
      for (const T of d)
        switch (T.type) {
          case "heading": {
            const p = Math.min(3, Math.max(1, Number(T.level) || 1)), l = i(T.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            F.push(
              S(
                `<h${p} style="margin:0 0 12px;font-size:${p === 1 ? "22" : p === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${l || "Heading"}</h${p}>`,
                T
              )
            );
            break;
          }
          case "paragraph": {
            const p = i(T.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            F.push(
              S(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${p || "Paragraph"}</p>`,
                T
              )
            );
            break;
          }
          case "image": {
            const p = (T.src || "").trim(), l = i(T.alt || ""), t = (T.linkUrl || "").trim(), o = !!T.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", V = p ? `<img src="${i(p)}" alt="${l}" style="${o}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            F.push(
              S(
                `<div style="margin:0 0 12px;">${t ? `<a href="${i(t)}" style="color:#2563eb;">${V}</a>` : V}</div>`,
                T
              )
            );
            break;
          }
          case "button": {
            const p = i(T.text || "Button"), l = (T.url || "#").trim(), t = Math.min(24, Math.max(0, Number(T.borderRadius) ?? 8)), B = !!T.fullWidth, o = !!T.ghost, V = o ? "transparent" : "#0f172a", H = o ? "#0f172a" : "#fff", ke = o ? "2px solid #0f172a" : "none", ze = B ? "block" : "inline-block", qe = B ? "100%" : "auto";
            F.push(
              S(
                `<p style="margin:0 0 12px;"><a href="${i(l)}" style="display:${ze};width:${qe};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${V};color:${H};border:${ke};text-decoration:none;font-size:14px;font-weight:600;border-radius:${t}px;overflow-wrap:anywhere;">${p}</a></p>`,
                T
              )
            );
            break;
          }
          case "divider": {
            const p = Math.min(8, Math.max(1, Number(T.thickness) || 1)), l = (T.color || "#e2e8f0").trim() || "#e2e8f0", t = T.lineStyle || "solid";
            F.push(
              S(
                `<hr style="margin:16px 0;border:0;border-top:${p}px ${t} ${l};" />`,
                T
              )
            );
            break;
          }
          case "spacer": {
            const p = Math.min(120, Math.max(8, Number(T.height) || 24));
            F.push(S(`<div style="height:${p}px;"></div>`, T));
            break;
          }
          case "footer": {
            const p = i(T.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = (T.unsubscribeUrl || "").trim(), t = i(T.companyAddress || "");
            F.push(
              S(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${p || "Footer"}` + (l ? `<p style="margin:8px 0 0;"><a href="${i(l)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (t ? `<p style="margin:4px 0 0;">${t}</p>` : "") + "</div>",
                T
              )
            );
            break;
          }
          case "list": {
            const p = T.style === "numbered" ? "ol" : "ul", t = (Array.isArray(T.items) ? T.items : []).map(
              (B) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${i(String(B)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            F.push(
              S(
                `<${p} style="margin:0 0 12px;padding-left:24px;">${t || "<li>Item</li>"}</${p}>`,
                T
              )
            );
            break;
          }
          case "quote": {
            const p = i(T.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, t = l[T.style || "default"] || l.default;
            F.push(
              S(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${t}font-size:14px;line-height:1.6;">${p || "Quote"}</div>`,
                T
              )
            );
            break;
          }
          case "social": {
            const l = (Array.isArray(T.links) ? T.links : []).filter((t) => (t.url || "").trim());
            if (l.length === 0)
              F.push(
                S(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  T
                )
              );
            else {
              const t = (B) => `<a href="${i((B.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${i(B.platform || "Link")}</a>`;
              F.push(
                S(
                  `<div style="margin:0 0 12px;">${l.map(t).join("")}</div>`,
                  T
                )
              );
            }
            break;
          }
          case "video": {
            const p = (T.thumbnailUrl || "").trim(), l = (T.videoUrl || "#").trim(), t = i(T.caption || ""), o = !!T.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", V = p ? `<img src="${i(p)}" alt="Video" style="${o}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            F.push(
              S(
                `<div style="margin:0 0 12px;"><a href="${i(l)}" style="display:block;color:inherit;">${V}</a>` + (t ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${t}</p>` : "") + "</div>",
                T
              )
            );
            break;
          }
          case "link_list": {
            const p = Array.isArray(T.links) ? T.links : [], l = i(T.separator || " | "), B = p.filter(
              (o) => (o.text || o.url) && (o.url || "").trim()
            ).map(
              (o) => `<a href="${i((o.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${i(o.text || "Link")}</a>`
            );
            F.push(
              S(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${B.join(l)}</p>`,
                T
              )
            );
            break;
          }
          case "columns": {
            const p = i(T.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = i(T.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            F.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${p || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const p = Math.min(4, Math.max(1, Number(T.columnCount) || 2)), l = Array.isArray(T.cells) ? T.cells.slice(0, p) : [], t = 100 / p, B = Array.from({ length: p }, (o, V) => {
              const H = l[V] ?? "", ke = i(H).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${t}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${ke || "—"}</td>`;
            }).join("");
            F.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${B}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const p = Array.isArray(T.links) ? T.links : [], l = i(T.separator || " | "), B = p.filter(
              (o) => (o.text || o.url) && (o.url || "").trim()
            ).map(
              (o) => `<a href="${i((o.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${i(o.text || "Link")}</a>`
            );
            F.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${B.length ? B.join(l) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const l = (Array.isArray(T.items) ? T.items : []).map((t) => {
              const B = i(t.title || "Section"), o = i(t.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${B}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${o}</div></details>`;
            }).join("");
            F.push(
              l ? `<div style="margin:0 0 12px;">${l}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const l = (Array.isArray(T.slides) ? T.slides : []).filter(
              (t) => (t.imageUrl || "").trim()
            );
            if (l.length === 0)
              F.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const t = l[0], B = `<img src="${i(t.imageUrl)}" alt="${i(t.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, o = (t.linkUrl || "").trim();
              F.push(
                `<div style="margin:0 0 12px;">${o ? `<a href="${i(o)}">${B}</a>` : B}` + (l.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${l.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const p = i(T.label || "Offer ends in"), l = T.endDateTime ? new Date(T.endDateTime).toLocaleString() : "—";
            F.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${p}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${l}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const p = (T.imageUrl || "").trim(), l = i(T.title || "Product"), t = i(T.price || ""), B = i(T.buttonText || "Buy now"), o = (T.buttonUrl || "#").trim(), V = p ? `<img src="${i(p)}" alt="${i(T.alt || l)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            F.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${V}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${l}</p>` + (t ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${t}</p>` : "") + `<a href="${i(o)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${B}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const p = i((T.content || "").trim());
            F.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${p || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const p = (T.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = i((T.caption || "").trim());
            F.push(
              '<div style="margin:0 0 12px;">' + (l ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${l}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${p || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const p = (T.feedUrl || "").trim(), l = Math.min(20, Math.max(1, Number(T.maxItems) ?? 5));
            F.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (p ? `<p style="margin:0;font-size:12px;color:#64748b;">${i(p)} · max ${l} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const p = (T.imageUrl || "").trim(), l = (T.fallbackUrl || "").trim(), t = i(T.alt || "Dynamic image");
            p ? F.push(
              `<div style="margin:0 0 12px;"><img src="${i(p)}" alt="${t}" style="max-width:100%;height:auto;display:block;border:0;" />` + (l ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${i(l)}</p>` : "") + "</div>"
            ) : F.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return F.join("");
    }
    function v(d) {
      return /<\s*html[\s>]/i.test(d) || /<!doctype\s+html/i.test(d);
    }
    function $(d) {
      const i = d.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return i ? i[1] : d;
    }
    function h(d, i, U) {
      const S = (i || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), F = (U || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${S}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        F ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${F}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${d}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const w = a, C = r, {
      campaign: x,
      dirty: E,
      customValidatorErrors: M,
      getValidationWithWarnings: P,
      update: z,
      updateMessage: J,
      undo: W,
      redo: ie,
      canUndo: K,
      canRedo: Y,
      resetMessage: D,
      hooks: oe
    } = Je({
      initial: w.modelValue,
      hooks: {
        ...w.hooks,
        customValidators: async (d) => {
          var F, T, p;
          const i = [];
          (F = d.name) != null && F.trim() || i.push("Template name is required");
          const U = d.message;
          (T = U == null ? void 0 : U.subject) != null && T.trim() || i.push("Subject is required");
          const S = (p = w.hooks) != null && p.customValidators ? await w.hooks.customValidators(d) : [];
          return [...i, ...S];
        }
      },
      onDirty: () => C("change", x.value)
    }), { lastSavedAt: be } = Xe(x, { channel: "email" });
    function ye(d) {
      (d.metaKey || d.ctrlKey) && d.key === "z" && (d.preventDefault(), d.shiftKey ? ie() : W());
    }
    je(() => {
      window.addEventListener("keydown", ye);
    }), Ke(() => {
      window.removeEventListener("keydown", ye);
    }), Ce(
      x,
      (d) => C("update:modelValue", {
        ...d,
        message: {
          ...d.message,
          html: Ie.value
        }
      }),
      { deep: !0 }
    );
    const ce = ae(), ee = ae(!0);
    async function G() {
      if (oe.estimateReach)
        try {
          ce.value = await oe.estimateReach(x.value.audience);
        } catch {
          ce.value = void 0;
        }
      oe.canSend && (ee.value = await Promise.resolve(oe.canSend()));
    }
    G(), Ce(() => x.value.audience, G, { deep: !0 });
    const f = y(() => (M.value, P(ce.value))), I = y(() => f.value.blockingErrors), R = y(() => f.value.warnings), le = y(() => f.value.valid), Z = y(() => {
      var S, F, T;
      const d = x.value.message, i = [
        !!((S = x.value.name) != null && S.trim()),
        !!((F = d.subject) != null && F.trim()),
        !!((T = d.from_address) != null && T.trim()),
        !!(Array.isArray(d.blocks) ? d.blocks.length : (d.html ?? "").trim().length),
        !!x.value.template_type
      ], U = i.filter(Boolean).length;
      return Math.round(U / i.length * 100);
    }), O = y(() => Z.value >= 90 ? "Production ready" : Z.value >= 70 ? "Strong draft" : Z.value >= 40 ? "In progress" : "Needs setup"), ve = y(
      () => x.value.template_type ?? "transactional"
    ), de = ae(""), we = ae(!1), ge = ae(null), N = y(() => {
      const d = de.value;
      return d ? De.find((i) => i.id === d) ?? null : null;
    });
    function k(d) {
      const i = x.value, U = d.campaign.message ? { ...i.message, ...d.campaign.message } : i.message;
      z({
        ...d.campaign,
        message: U
      }), ge.value = null, we.value = !1;
    }
    function L(d) {
      const i = d.target.value;
      if (!i) return;
      const U = ht.find((S) => S.id === i);
      U && (E.value ? (ge.value = U, we.value = !0) : k(U), d.target.value = "");
    }
    function Q(d) {
      z({ template_type: d });
    }
    function se(d) {
      z({
        name: d,
        tracking: { ...x.value.tracking ?? {}, campaign_name: d }
      });
    }
    const me = y(
      () => x.value.message.subject ?? ""
    ), ne = y(
      () => x.value.message.preview_text ?? ""
    ), te = y(
      () => x.value.message.html ?? ""
    ), he = y(
      () => x.value.message.from_name ?? "Your App"
    ), Te = y(
      () => x.value.message.from_address ?? "notifications@example.com"
    ), Se = y(
      () => x.value.message.blocks ?? []
    ), Le = y(() => {
      const d = x.value.message, i = (d.html ?? "").trim(), S = (Array.isArray(d.blocks) ? d.blocks : []).some((F) => {
        if (!F || typeof F != "object") return !1;
        const T = (F.type ?? "").toString();
        if (T === "paragraph" || T === "heading" || T === "quote" || T === "footer") {
          const p = (F.content ?? "").toString().trim();
          return !(!p || p === "Heading" || p.startsWith("Your text here."));
        }
        return T === "image" || T === "video" || T === "dynamic_image" ? !!(F.src ?? F.imageUrl ?? F.thumbnailUrl ?? "").toString().trim() : T === "button" ? !!(F.text ?? "").toString().trim() : !0;
      });
      return !!((d.subject ?? "").toString().trim() || (d.preview_text ?? "").toString().trim() || i || S);
    }), Ee = y(() => {
      const d = Se.value;
      if (Array.isArray(d) && d.length > 0)
        return m(d);
      const i = te.value;
      return i && i.trim() ? v(i) ? $(i) : i : m([]);
    }), Ie = y(() => {
      const d = Se.value;
      if (Array.isArray(d) && d.length > 0)
        return h(
          m(d),
          me.value,
          ne.value
        );
      const i = te.value;
      return i && i.trim() ? v(i) ? i : h(i, me.value, ne.value) : h(
        m([]),
        me.value,
        ne.value
      );
    }), Be = y(() => {
      const d = me.value;
      return N.value ? Ne(d, N.value.data) : d;
    }), Ue = y(() => {
      const d = ne.value;
      return N.value ? Ne(d, N.value.data) : d;
    }), c = y(() => {
      const d = Ee.value;
      return N.value ? Ne(d, N.value.data) : d;
    }), b = ae("desktop");
    function A() {
      le.value && C("save", {
        ...x.value,
        message: {
          ...x.value.message,
          html: Ie.value
        }
      });
    }
    return (d, i) => {
      var U;
      return s(), n("div", Hm, [
        e("div", zm, [
          xe(Qe, {
            "campaign-name": g(x).name,
            status: g(x).status,
            dirty: g(E),
            "last-saved-at": g(be),
            "can-undo": g(K),
            "can-redo": g(Y),
            "slugify-name": w.enforceSlugName,
            "onUpdate:campaignName": se,
            onUndo: g(W),
            onRedo: g(ie)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          I.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: pe({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Ve).input}px`,
              padding: `${g(ue)[16]}px ${g(ue)[24]}px`,
              marginBottom: `${g(ue)[24]}px`
            })
          }, [
            e("ul", {
              style: pe({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (s(!0), n(q, null, j(I.value, (S) => (s(), n("li", {
                key: S.message
              }, u(S.message), 1))), 128))
            ], 4)
          ], 4)) : _("", !0)
        ]),
        e("div", Fm, [
          e("aside", qm, [
            a.disabledSections.includes("email") ? _("", !0) : (s(), n("div", jm, [
              e("div", Km, [
                e("div", Ym, [
                  i[8] || (i[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Gm, u(O.value), 1)
                ]),
                e("div", Jm, [
                  xe(ut, {
                    "template-type": ve.value,
                    onUpdate: Q
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: L
                  }, [
                    i[9] || (i[9] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(q, null, j(g(ht), (S) => (s(), n("option", {
                      key: S.id,
                      value: S.id
                    }, u(S.label), 9, Xm))), 128))
                  ], 32)
                ]),
                e("div", Qm, [
                  e("div", Zm, [
                    i[10] || (i[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", ev, u(Z.value) + "%", 1)
                  ]),
                  e("div", tv, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: pe({ width: `${Z.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              xe(Wm, {
                message: g(x).message,
                "variable-options": a.variableOptions,
                "show-reset": !0,
                onUpdate: g(J),
                onReset: i[0] || (i[0] = (S) => g(D)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", av, [
            !a.designOnly && g(x).audience.test_mode ? (s(), n("div", sv, [...i[11] || (i[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              X(" Test mode — only your test segment will receive this. ", -1)
            ])])) : _("", !0),
            e("div", nv, [
              e("div", lv, [
                e("label", ov, [
                  i[13] || (i[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ae(e("select", {
                    "onUpdate:modelValue": i[1] || (i[1] = (S) => de.value = S),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    i[12] || (i[12] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(q, null, j(g(De), (S) => (s(), n("option", {
                      key: S.id,
                      value: S.id
                    }, u(S.label), 9, iv))), 128))
                  ], 512), [
                    [Pe, de.value]
                  ])
                ]),
                e("div", rv, [
                  i[14] || (i[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, u(b.value), 1)
                ])
              ]),
              e("div", dv, [
                e("button", {
                  type: "button",
                  class: re(["kb-email-device-btn", {
                    "kb-email-device-btn--active": b.value === "desktop"
                  }]),
                  onClick: i[2] || (i[2] = (S) => b.value = "desktop")
                }, [...i[15] || (i[15] = [
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
                  X(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: re(["kb-email-device-btn", {
                    "kb-email-device-btn--active": b.value === "mobile"
                  }]),
                  onClick: i[3] || (i[3] = (S) => b.value = "mobile")
                }, [...i[16] || (i[16] = [
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
                  X(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: re(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": b.value === "mobile",
                  "kb-email-preview-frame--empty": !Le.value
                }])
              }, [
                e("div", uv, [
                  e("div", cv, [
                    e("span", pv, u(he.value), 1),
                    e("span", mv, "<" + u(Te.value) + ">", 1)
                  ]),
                  e("div", vv, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: Be.value || "No subject"
                    }, u(Be.value || "No subject"), 9, bv),
                    Ue.value ? (s(), n("span", fv, " — " + u(Ue.value), 1)) : _("", !0)
                  ])
                ]),
                e("div", gv, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: c.value
                  }, null, 8, yv)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", hv, [
          R.value.length > 0 ? (s(), n("div", kv, [
            i[17] || (i[17] = e("strong", null, "Warning:", -1)),
            X(" " + u((U = R.value[0]) == null ? void 0 : U.message) + " ", 1),
            R.value.length > 1 ? (s(), n("span", _v, " (+" + u(R.value.length - 1) + " more) ", 1)) : _("", !0)
          ])) : _("", !0),
          e("div", wv, [
            a.showDuplicate ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: i[4] || (i[4] = (S) => C("duplicate", JSON.parse(JSON.stringify(g(x)))))
            }, " Duplicate ")) : _("", !0),
            a.showSave ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: A
            }, " Save ")) : _("", !0),
            a.showClose ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: i[5] || (i[5] = (S) => C("edit"))
            }, " Close ")) : _("", !0)
          ])
        ]),
        we.value ? (s(), n("div", $v, [
          e("div", xv, [
            i[18] || (i[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            i[19] || (i[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Cv, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: i[6] || (i[6] = (S) => {
                  we.value = !1, ge.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: i[7] || (i[7] = (S) => ge.value && k(ge.value))
              }, " Replace ")
            ])
          ])
        ])) : _("", !0)
      ]);
    };
  }
}), Dt = /* @__PURE__ */ $e(Sv, [["__scopeId", "data-v-f45fc2a3"]]), Iv = { class: "kb-shell" }, Av = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Tv = ["aria-selected", "onClick"], Lv = { class: "kb-shell__meta" }, Bv = ["href"], Uv = { class: "kb-shell__body" }, Rv = /* @__PURE__ */ _e({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(a, { emit: r }) {
    const m = r, v = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return ($, h) => (s(), n("div", Iv, [
      e("header", {
        class: "kb-shell__header",
        style: pe({ padding: `${g(ue)[12]}px ${g(ue)[24]}px`, borderBottom: `1px solid ${g(fe).neutral.border}`, background: g(fe).neutral.bg })
      }, [
        h[0] || (h[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Av, [
          (s(), n(q, null, j(v, (w) => e("button", {
            key: w.id,
            type: "button",
            class: re(["kb-shell__channel", { "kb-shell__channel--active": a.channel === w.id }]),
            role: "tab",
            "aria-selected": a.channel === w.id,
            onClick: (C) => m("switch-channel", w.id)
          }, u(w.label), 11, Tv)), 64))
        ]),
        e("div", Lv, [
          a.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: pe({ padding: "2px 8px", borderRadius: `${g(Ve).input}px`, fontSize: "0.75rem", background: g(fe).neutral.bg, color: g(fe).neutral.textMuted })
          }, u(a.environment), 5)) : _("", !0),
          a.helpUrl ? (s(), n("a", {
            key: 1,
            href: a.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: pe({ color: g(fe).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Bv)) : _("", !0)
        ])
      ], 4),
      e("div", Uv, [
        Oe($.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Pv = /* @__PURE__ */ $e(Rv, [["__scopeId", "data-v-0df30803"]]), Ev = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Ov = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Nv = ["onClick"], Vv = /* @__PURE__ */ _e({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(a) {
    var h;
    const r = a, m = ae(((h = r.items[0]) == null ? void 0 : h.id) ?? "");
    let v = null;
    function $(w) {
      const C = document.getElementById(w);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return je(() => {
      const w = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      w && (v = new IntersectionObserver(
        (C) => {
          for (const x of C)
            if (x.isIntersecting) {
              const E = x.target.getAttribute("data-outline-id");
              E && (m.value = E);
            }
        },
        { root: w === document ? null : w, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((C) => {
        const x = document.getElementById(C.id);
        x && (v == null || v.observe(x));
      }));
    }), Ke(() => {
      v == null || v.disconnect();
    }), Ce(
      () => r.items,
      (w) => {
        w.length && !m.value && (m.value = w[0].id);
      },
      { immediate: !0 }
    ), (w, C) => (s(), n("nav", Ev, [
      e("ul", Ov, [
        (s(!0), n(q, null, j(a.items, (x) => (s(), n("li", {
          key: x.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: re(["kb-outline__btn", { "kb-outline__btn--active": m.value === x.id }]),
            style: pe({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${g(ue)[8]}px ${g(ue)[12]}px`,
              border: "none",
              borderRadius: `${g(Ve).input}px`,
              background: m.value === x.id ? g(fe).neutral.bg : "transparent",
              color: m.value === x.id ? "#0f172a" : g(fe).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: m.value === x.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (E) => $(x.id)
          }, u(x.label), 15, Nv)
        ]))), 128))
      ])
    ]));
  }
}), Mv = /* @__PURE__ */ $e(Vv, [["__scopeId", "data-v-25c37675"]]), Dv = ["id"], Wv = {
  key: 1,
  class: "kb-form-shell__head"
}, Hv = /* @__PURE__ */ _e({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(a) {
    return (r, m) => (s(), n("div", {
      class: "kb-form-shell",
      id: a.sectionId ?? void 0,
      style: pe({
        padding: `${g(ue)[24]}px ${g(ue)[24]}px ${g(ue)[32]}px`,
        marginBottom: 0
      })
    }, [
      a.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: pe({ marginBottom: g(ue)[24], paddingBottom: g(ue)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: pe({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: g(ue)[12] })
        }, u(a.label), 5),
        Oe(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", Wv, [
        Oe(r.$slots, "head", {}, void 0, !0)
      ])),
      Oe(r.$slots, "default", {}, void 0, !0)
    ], 12, Dv));
  }
}), zv = /* @__PURE__ */ $e(Hv, [["__scopeId", "data-v-6504df41"]]), Fv = /* @__PURE__ */ _e({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(a) {
    return (r, m) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: pe({
        display: "flex",
        justifyContent: a.align === "start" ? "flex-start" : a.align === "between" ? "space-between" : "flex-end",
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
      Oe(r.$slots, "default")
    ], 4));
  }
}), qv = /* @__PURE__ */ _e({
  __name: "BuilderTopShell",
  setup(a) {
    return (r, m) => (s(), n("div", {
      class: "kb-top-shell",
      style: pe({
        marginLeft: g(ue)[24],
        marginRight: g(ue)[24]
      })
    }, [
      Oe(r.$slots, "header"),
      Oe(r.$slots, "errors"),
      Oe(r.$slots, "warnings"),
      Oe(r.$slots, "default")
    ], 4));
  }
});
function jv(a) {
  a.component("KeosNotificationBuilder", Nt), a.component("KeosWhatsAppBuilder", Vt), a.component("KeosSmsBuilder", Mt), a.component("KeosEmailBuilder", Dt), a.component("BuilderShell", Pv), a.component("BuilderOutline", Mv), a.component("BuilderVersionHistoryModal", Ot), a.component("BuilderFormShell", zv), a.component("BuilderActionsBar", Fv), a.component("BuilderTopShell", qv);
}
const Yv = {
  install: jv,
  KeosNotificationBuilder: Nt,
  KeosWhatsAppBuilder: Vt,
  KeosSmsBuilder: Mt,
  KeosEmailBuilder: Dt
};
export {
  Fv as BuilderActionsBar,
  zv as BuilderFormShell,
  Mv as BuilderOutline,
  Pv as BuilderShell,
  qv as BuilderTopShell,
  Ot as BuilderVersionHistoryModal,
  De as DEFAULT_SAMPLE_PROFILES,
  Dt as KeosEmailBuilder,
  Nt as KeosNotificationBuilder,
  Mt as KeosSmsBuilder,
  Vt as KeosWhatsAppBuilder,
  Yv as default,
  jv as install,
  Ne as renderTemplatePreview,
  Xe as useAutosave,
  Je as useCampaignState
};
//# sourceMappingURL=index.js.map
