import { ref as ae, watch as xe, computed as y, defineComponent as ke, openBlock as l, createElementBlock as o, normalizeStyle as ce, unref as f, createElementVNode as e, normalizeClass as ie, Fragment as z, renderList as F, toDisplayString as p, createTextVNode as J, createCommentVNode as h, withDirectives as Te, vModelSelect as Oe, vModelText as lt, createStaticVNode as Fe, withKeys as Wt, onMounted as je, onUnmounted as Ye, createVNode as $e, createBlock as Ht, withModifiers as qe, renderSlot as Me } from "vue";
const de = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, De = {
  input: 6,
  card: 12,
  button: 6
}, be = {
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
be.neutral.textMuted, be.neutral.textMeta;
const Je = {
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
}, zt = ["android", "ios", "web"], It = "normal", At = ["low", "normal", "high"], Tt = 86400, Ft = [3600, 7200, 86400, 172800], Ut = "1.0", qt = ["topic", "segment", "user_list"];
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
function jt(n) {
  return {
    schema_version: Ut,
    name: "",
    status: "draft",
    audience: ot(),
    message: it(),
    delivery: rt(),
    tracking: dt(),
    ...n
  };
}
function Rt(n) {
  const d = n;
  return d.schema_version || (d.schema_version = Ut), d.audience || (d.audience = ot()), d.message || (d.message = it()), d.delivery || (d.delivery = rt()), d.tracking || (d.tracking = dt()), At.includes(d.delivery.priority) || (d.delivery.priority = It), d.delivery.ttl === void 0 && (d.delivery.ttl = Tt), qt.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const Yt = 1e5;
function Kt(n, d) {
  var k, _, $;
  const u = [], m = d ?? n.audience.estimated_reach;
  return m !== void 0 && m >= Yt && u.push({
    message: `Estimated reach is very high (${m.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), n.tracking && !((k = n.tracking.campaign_name) != null && k.trim()) && !((_ = n.name) != null && _.trim()) && u.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), ($ = n.message.deep_link) != null && $.trim() || u.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), u;
}
function Lt(n, d = "error") {
  return { message: n, severity: d };
}
function Bt(n) {
  const d = [];
  return n.schema_version || d.push(Lt("Missing schema_version")), {
    valid: d.length === 0,
    errors: d
  };
}
function Gt(n, d) {
  const u = Bt(n), m = Kt(n, d);
  return {
    valid: u.valid,
    errors: [
      ...u.errors,
      ...m.map((k) => Lt(k.message, k.severity))
    ]
  };
}
function Jt(n) {
  return n.errors.filter((d) => d.severity === "error");
}
function Xt(n) {
  return n.errors.filter((d) => d.severity !== "error");
}
function Qt(n) {
  const d = String(n ?? "").trim().toLowerCase();
  return d === "authentication" ? "AUTHENTICATION" : d === "utility" ? "UTILITY" : "MARKETING";
}
function Zt(n, d = "template_message") {
  return (String(n ?? "").trim() || d).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || d;
}
function ea(n) {
  const d = String(n.header_type ?? "").trim().toLowerCase();
  if (d === "image")
    return "IMAGE";
  if (d === "video")
    return "VIDEO";
  if (d === "document")
    return "DOCUMENT";
  if (d === "text")
    return "TEXT";
  const u = String(n.template_type ?? "").trim().toLowerCase();
  return u === "image" ? "IMAGE" : u === "video" ? "VIDEO" : u === "document" ? "DOCUMENT" : null;
}
function Ke(n, d = []) {
  if (!n)
    return { text: "", varOrder: [...d] };
  const u = [...d], m = /* @__PURE__ */ new Map();
  return u.forEach((_, $) => m.set(_, $ + 1)), { text: n.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (_, $) => (m.has($) || (m.set($, u.length + 1), u.push($)), `{{${m.get($)}}}`)), varOrder: u };
}
function ct(n, d) {
  return n.map((u) => {
    const m = d == null ? void 0 : d[u];
    return typeof m == "string" && m.length > 0 ? m : `sample_${u}`;
  });
}
function ta(n, d) {
  const u = [];
  let m = [...d];
  return { buttons: n.slice(0, 10).map((_) => {
    const $ = _, S = String($.type ?? "quick_reply").trim().toLowerCase(), x = String($.label ?? "").trim() || "Button";
    if (S === "url") {
      const U = Ke(String($.url ?? ""), m);
      return m = U.varOrder, { type: "URL", text: x, url: U.text || void 0 };
    }
    return S === "call" ? {
      type: "PHONE_NUMBER",
      text: x,
      phone_number: String($.phone ?? "").trim() || void 0
    } : S === "opt_out" ? (u.push("Opt-out button is provider-specific; mapped as QUICK_REPLY."), { type: "QUICK_REPLY", text: x }) : { type: "QUICK_REPLY", text: x };
  }).filter((_) => !!_.text), varOrder: m, warnings: u };
}
function aa(n) {
  return n.slice(0, 10).map((d) => {
    const u = d, m = String(u.type ?? "quick_reply").trim().toLowerCase(), k = String(u.label ?? "").trim() || "Button";
    return m === "url" ? {
      type: "URL",
      title: k,
      ...String(u.url ?? "").trim() ? { url: String(u.url).trim() } : {}
    } : m === "call" ? {
      type: "PHONE_NUMBER",
      title: k,
      ...String(u.phone ?? "").trim() ? { phoneNumber: String(u.phone).trim() } : {}
    } : m === "opt_out" ? { type: "OPT_OUT", title: k } : { type: "QUICK_REPLY", title: k };
  }).filter((d) => !!d.title);
}
function pt(n) {
  const d = {}, u = [
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
  for (const m of u)
    n[m] !== void 0 && n[m] !== null && n[m] !== "" && (d[m] = n[m]);
  return Object.keys(d).length ? d : void 0;
}
function sa(n, d = {}) {
  const u = [], m = n.message, k = [], _ = Zt(m.template_name ?? n.name, n.name || "template_message"), $ = Qt(m.template_category), S = String(m.template_language ?? "en_US").trim() || "en_US";
  let x = [];
  const U = ea(m), V = String(m.header ?? "").trim();
  if (U === "TEXT" && V) {
    const D = Ke(V, x);
    x = D.varOrder;
    const M = ct(x, d.exampleData);
    k.push({
      type: "HEADER",
      format: "TEXT",
      text: D.text,
      ...M.length ? { example: { header_text: M } } : {}
    });
  } else U && U !== "TEXT" && (k.push({ type: "HEADER", format: U }), m.media_url || u.push(`Header format ${U} selected but media_url is empty.`));
  const q = String(m.body ?? "").trim(), H = Ke(q, x);
  x = H.varOrder;
  const W = ct(x, d.exampleData);
  k.push({
    type: "BODY",
    text: H.text,
    ...W.length ? { example: { body_text: [W] } } : {}
  });
  const A = String(m.footer ?? "").trim();
  if (A) {
    const D = Ke(A, x);
    x = D.varOrder, k.push({
      type: "FOOTER",
      text: D.text
    });
  }
  const oe = Array.isArray(m.buttons) ? m.buttons : [];
  if (oe.length) {
    const D = ta(oe, x);
    x = D.varOrder, u.push(...D.warnings), D.buttons.length && k.push({ type: "BUTTONS", buttons: D.buttons });
  }
  const j = String(m.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(j) && u.push(`template_type="${j}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: _,
      category: $,
      language: S,
      components: k
    },
    warnings: u
  };
}
function mt(n, d = {}) {
  var A, oe, j;
  const u = sa(n, d), m = n.message, k = u.payload.components.find((D) => D.type === "HEADER"), _ = u.payload.components.find((D) => D.type === "BODY"), $ = u.payload.components.find((D) => D.type === "FOOTER"), S = String(m.body ?? "").trim(), x = String(m.header ?? "").trim(), U = String(m.footer ?? "").trim(), V = Array.isArray(m.buttons) ? m.buttons : [], q = aa(V), H = (() => {
    const D = String(m.template_type ?? "").trim().toLowerCase();
    return D === "image" ? "IMAGE" : D === "video" ? "VIDEO" : D === "document" ? "DOCUMENT" : "TEXT";
  })();
  return { payload: {
    elementName: u.payload.name,
    languageCode: u.payload.language,
    category: u.payload.category,
    templateType: H,
    content: S || (_ == null ? void 0 : _.text) || "",
    ...(k == null ? void 0 : k.format) === "TEXT" && (x || k.text) ? { header: x || k.text } : {},
    ...U || $ != null && $.text ? { footer: U || ($ == null ? void 0 : $.text) } : {},
    ...q.length ? { buttons: q } : {},
    ...(j = (oe = (A = _ == null ? void 0 : _.example) == null ? void 0 : A.body_text) == null ? void 0 : oe[0]) != null && j.length ? { example: _.example.body_text[0] } : {},
    metaTemplate: u.payload,
    metaWhatsApp: u.payload,
    ...pt(m) ? { advanced: pt(m) } : {}
  }, warnings: u.warnings };
}
function We(n, d) {
  return n.length <= d ? { text: n, truncated: !1 } : { text: n.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const Ge = Je.android;
function na(n) {
  const { title: d, body: u } = n, m = We(d || "", Ge.title), k = We(u || "", Ge.body);
  return {
    title: m.text,
    body: k.text,
    imageUrl: n.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function la(n) {
  const { title: d, body: u } = n, m = We(d || "", Ge.title), k = We(u || "", Ge.body);
  return {
    title: m.text,
    body: k.text,
    imageUrl: n.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: k.truncated,
    expanded: !0
  };
}
function oa(n, d = {}) {
  const u = d.expanded ? la(n) : na(n);
  return d.darkMode !== void 0 && (u.darkMode = d.darkMode), u;
}
const vt = Je.ios;
function Pt(n) {
  const { title: d, body: u } = n, m = We(d || "", vt.title), k = We(u || "", vt.body);
  return {
    title: m.text,
    body: k.text,
    imageUrl: n.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: k.truncated,
    expanded: !1
  };
}
function ia(n) {
  return Pt(n);
}
function ra(n, d = {}) {
  const u = d.variant === "lockscreen" ? ia(n) : Pt(n);
  return d.darkMode !== void 0 && (u.darkMode = d.darkMode), u;
}
const bt = Je.web;
function gt(n) {
  const { title: d, body: u } = n, m = We(d || "", bt.title), k = We(u || "", bt.body);
  return {
    title: m.text,
    body: k.text,
    imageUrl: n.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: k.truncated
  };
}
function da(n) {
  return n.map((d) => ({ message: d, severity: "error" }));
}
function et(n) {
  return JSON.parse(JSON.stringify(n));
}
function Xe(n = {}) {
  const d = ae(
    Rt(n.initial ?? jt())
  ), u = n.hooks ?? {}, m = ae(!1), k = ae([]);
  xe(
    d,
    () => {
      if (!u.customValidators) {
        k.value = [];
        return;
      }
      u.customValidators(d.value).then((R) => {
        k.value = R;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const _ = ae([]), $ = ae([]);
  function S() {
    const R = et(d.value);
    _.value = [..._.value.slice(-19), R], $.value = [];
  }
  const x = y(() => _.value.length > 0), U = y(() => $.value.length > 0);
  function V() {
    _.value.length !== 0 && ($.value = [et(d.value), ...$.value], d.value = _.value[_.value.length - 1], _.value = _.value.slice(0, -1));
  }
  function q() {
    $.value.length !== 0 && (_.value = [..._.value, et(d.value)], d.value = $.value[0], $.value = $.value.slice(1));
  }
  xe(
    d,
    () => {
      var R;
      m.value = !0, (R = n.onDirty) == null || R.call(n);
    },
    { deep: !0 }
  );
  const H = y(() => Bt(d.value));
  function W(R) {
    const ne = Gt(d.value, R), X = da(k.value), B = [...Jt(ne), ...X], pe = [...ne.errors, ...X], ue = ne.valid && X.length === 0;
    return {
      ...ne,
      errors: pe,
      valid: ue,
      blockingErrors: B,
      warnings: Xt(ne)
    };
  }
  function A(R) {
    S(), d.value = { ...d.value, ...R };
  }
  function oe(R) {
    S(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...R }
    };
  }
  function j(R) {
    S(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...R }
    };
  }
  function D(R) {
    S(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...R }
    };
  }
  function M(R) {
    S(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...R } : { campaign_name: "", tags: [], ab_test: !1, ...R }
    };
  }
  function se(R) {
    S(), d.value = {
      ...d.value,
      message: { ...it(), ...R }
    };
  }
  function ve(R) {
    S(), d.value = {
      ...d.value,
      delivery: { ...rt(), ...R }
    };
  }
  function ge(R) {
    S(), d.value = {
      ...d.value,
      tracking: { ...dt(), ...R }
    };
  }
  function me(R) {
    S(), d.value = {
      ...d.value,
      audience: { ...ot(), ...R }
    };
  }
  const Z = y(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function Y(R, ne) {
    const X = Z.value;
    let B;
    switch (R) {
      case "android":
        B = oa(X, { expanded: ne == null ? void 0 : ne.expanded });
        break;
      case "ios":
        B = ra(X);
        break;
      case "web":
        B = gt(X);
        break;
      default:
        B = gt(X);
    }
    const pe = d.value.message.actions ?? [], ue = d.value.message.location;
    return { ...B, actions: pe, location: ue ?? void 0 };
  }
  const b = Je;
  async function I() {
    return u.customValidators ? u.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: m,
    validation: H,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: k,
    getValidationWithWarnings: W,
    update: A,
    updateAudience: oe,
    updateMessage: j,
    updateDelivery: D,
    updateTracking: M,
    undo: V,
    redo: q,
    canUndo: x,
    canRedo: U,
    resetMessage: se,
    resetDelivery: ve,
    resetTracking: ge,
    resetAudience: me,
    getPreview: Y,
    previewInput: Z,
    characterLimits: b,
    runCustomValidators: I,
    hooks: u
  };
}
const ua = "keos-draft", ca = 2e3;
function pa(n, d) {
  return `${ua}-${n}-${d}`;
}
function Qe(n, d) {
  const u = d.channel, m = y(
    () => {
      var V, q;
      return pa(
        u,
        d.key ?? ((V = n.value) == null ? void 0 : V.id) ?? ((q = n.value) == null ? void 0 : q.name) ?? "draft"
      );
    }
  ), k = ae(null);
  let _ = null;
  function $() {
    try {
      const V = JSON.stringify(n.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(m.value, V), k.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function S() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(m.value);
    } catch {
    }
  }
  function x() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const V = window.localStorage.getItem(m.value);
      if (!V) return null;
      const q = JSON.parse(V);
      return Rt(q);
    } catch {
      return null;
    }
  }
  function U() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return xe(
    n,
    () => {
      U() && (_ && clearTimeout(_), _ = setTimeout(() => {
        _ = null, $();
      }, ca));
    },
    { deep: !0 }
  ), {
    lastSavedAt: k,
    clearDraft: S,
    getDraft: x,
    persist: $
  };
}
const ma = { class: "kb-header__row" }, va = ["value"], ba = { class: "kb-header__actions" }, ga = ["disabled"], fa = ["disabled"], ya = ["value"], ha = ["value"], ka = /* @__PURE__ */ ke({
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
  setup(n, { emit: d }) {
    const u = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], m = n, k = d, _ = () => !!(m.campaignName || "").trim();
    function $(U) {
      return m.slugifyName ? U.trim().replace(/\s+/g, "-") : U;
    }
    function S(U) {
      return U.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function x(U) {
      const V = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return V[U] ?? V.draft;
    }
    return (U, V) => (l(), o("header", {
      class: "kb-header",
      style: ce({
        padding: `${f(de)[16]}px 0`,
        borderBottom: `1px solid ${f(be).neutral.border}`,
        marginBottom: `${f(de)[16]}px`
      })
    }, [
      e("div", ma, [
        e("div", {
          class: ie(["kb-header__name-section", { "kb-header__name-section--filled": _() }])
        }, [
          V[4] || (V[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: n.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: V[0] || (V[0] = (q) => k("update:campaignName", $(q.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, va),
          V[5] || (V[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", ba, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !n.canUndo,
            onClick: V[1] || (V[1] = (q) => k("undo"))
          }, " Undo ", 8, ga),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !n.canRedo,
            onClick: V[2] || (V[2] = (q) => k("redo"))
          }, " Redo ", 8, fa)
        ]),
        n.workflowStatus !== void 0 ? (l(), o("select", {
          key: 0,
          value: n.workflowStatus,
          class: "kb-header__status-select",
          style: ce({
            padding: `${f(de)[4]}px ${f(de)[8]}px`,
            borderRadius: `${f(De).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...x(n.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: V[3] || (V[3] = (q) => k("update:workflowStatus", q.target.value))
        }, [
          (l(), o(z, null, F(u, (q) => e("option", {
            key: q.value,
            value: q.value
          }, p(q.label), 9, ha)), 64))
        ], 44, ya)) : (l(), o("span", {
          key: 1,
          class: "kb-header__status",
          style: ce({
            padding: `${f(de)[4]}px ${f(de)[8]}px`,
            borderRadius: `${f(De).input}px`,
            background: f(be).neutral.bg,
            fontSize: "0.8125rem",
            color: f(be).neutral.textMuted
          })
        }, p(n.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ce({ fontSize: "0.8125rem", color: f(be).neutral.textMuted, marginTop: `${f(de)[4]}px` })
      }, [
        n.saving ? (l(), o(z, { key: 0 }, [
          J("Saving…")
        ], 64)) : n.dirty ? (l(), o(z, { key: 1 }, [
          J("Unsaved changes")
        ], 64)) : n.lastSavedAt ? (l(), o(z, { key: 2 }, [
          J("Last saved at " + p(S(n.lastSavedAt)), 1)
        ], 64)) : h("", !0)
      ], 4)
    ], 4));
  }
}), _e = (n, d) => {
  const u = n.__vccOpts || n;
  for (const [m, k] of d)
    u[m] = k;
  return u;
}, Ze = /* @__PURE__ */ _e(ka, [["__scopeId", "data-v-56efb3ec"]]), _a = { class: "kb-section" }, wa = { class: "kb-section__head" }, $a = { class: "kb-section__desc" }, xa = { class: "kb-field" }, Ca = { class: "kb-label" }, Sa = { class: "kb-field-with-rail" }, Ia = ["value", "aria-invalid", "aria-describedby"], Aa = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, Ta = { class: "kb-field" }, Ua = { class: "kb-label" }, Ra = { class: "kb-field-with-rail" }, La = ["value", "aria-invalid", "aria-describedby"], Ba = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, Pa = { class: "kb-field" }, Ea = ["value", "aria-invalid", "aria-describedby"], Oa = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Na = { class: "kb-field" }, Ma = ["value", "aria-invalid", "aria-describedby"], Va = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Da = { class: "kb-field" }, Wa = { class: "kb-location-row" }, Ha = ["value"], za = ["value"], Fa = ["value"], qa = ["value"], ja = { class: "kb-field" }, Ya = { class: "kb-actions-list" }, Ka = ["value", "onInput"], Ga = ["value", "onInput"], Ja = ["onClick"], Xa = ["disabled"], Qa = { class: "kb-action-chips" }, Za = ["disabled", "onClick"], es = /* @__PURE__ */ ke({
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
  setup(n) {
    const d = n;
    return (u, m) => {
      var k, _, $, S;
      return l(), o("section", _a, [
        e("div", wa, [
          m[10] || (m[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          n.showReset ? (l(), o("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (x) => u.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        e("p", $a, " Message body is required. Title is optional. Character limits depend on the selected platform (" + p(n.selectedPlatform) + "). ", 1),
        e("div", xa, [
          e("label", Ca, [
            m[11] || (m[11] = J(" Title ", -1)),
            e("span", {
              class: ie(["kb-counter", { "kb-counter--warn": n.titleCount > n.titleLimit }])
            }, p(n.titleCount) + "/" + p(n.titleLimit), 3)
          ]),
          e("div", Sa, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: n.message.title,
              "aria-invalid": !!n.titleError,
              "aria-describedby": n.titleError ? "title-error" : void 0,
              onInput: m[1] || (m[1] = (x) => u.$emit("update", { title: x.target.value }))
            }, null, 40, Ia),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ce({ "--pct": Math.min(100, n.titleCount / n.titleLimit * 100) + "%" })
            }, [...m[12] || (m[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.titleError ? (l(), o("p", Aa, p(n.titleError), 1)) : h("", !0)
        ]),
        e("div", Ta, [
          e("label", Ua, [
            m[13] || (m[13] = J(" Message ", -1)),
            e("span", {
              class: ie(["kb-counter", { "kb-counter--warn": n.bodyCount > n.bodyLimit }])
            }, p(n.bodyCount) + "/" + p(n.bodyLimit), 3)
          ]),
          e("div", Ra, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: n.message.body,
              "aria-invalid": !!n.bodyError,
              "aria-describedby": n.bodyError ? "body-error" : void 0,
              onInput: m[2] || (m[2] = (x) => u.$emit("update", { body: x.target.value }))
            }, null, 40, La),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ce({ "--pct": Math.min(100, n.bodyCount / n.bodyLimit * 100) + "%" })
            }, [...m[14] || (m[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.bodyError ? (l(), o("p", Ba, p(n.bodyError), 1)) : h("", !0)
        ]),
        e("div", Pa, [
          m[15] || (m[15] = e("label", { class: "kb-label" }, [
            J(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: n.message.image_url,
            "aria-invalid": !!n.imageUrlError,
            "aria-describedby": n.imageUrlError ? "image-url-error" : void 0,
            onInput: m[3] || (m[3] = (x) => u.$emit("update", { image_url: x.target.value || void 0 }))
          }, null, 40, Ea),
          n.imageUrlError ? (l(), o("p", Oa, p(n.imageUrlError), 1)) : h("", !0)
        ]),
        e("div", Na, [
          m[16] || (m[16] = e("label", { class: "kb-label" }, [
            J(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: n.message.deep_link,
            "aria-invalid": !!n.deepLinkError,
            "aria-describedby": n.deepLinkError ? "deeplink-error" : void 0,
            onInput: m[4] || (m[4] = (x) => u.$emit("update", { deep_link: x.target.value || void 0 }))
          }, null, 40, Ma),
          n.deepLinkError ? (l(), o("p", Va, p(n.deepLinkError), 1)) : h("", !0)
        ]),
        e("div", Da, [
          m[17] || (m[17] = e("label", { class: "kb-label" }, [
            J(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Wa, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((k = n.message.location) == null ? void 0 : k.lat) ?? "",
              onInput: m[5] || (m[5] = (x) => {
                const U = { ...n.message.location ?? {} }, V = x.target.value;
                U.lat = V === "" ? void 0 : Number(V), u.$emit("update", { location: U });
              })
            }, null, 40, Ha),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((_ = n.message.location) == null ? void 0 : _.lon) ?? "",
              onInput: m[6] || (m[6] = (x) => {
                const U = { ...n.message.location ?? {} }, V = x.target.value;
                U.lon = V === "" ? void 0 : Number(V), u.$emit("update", { location: U });
              })
            }, null, 40, za)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: (($ = n.message.location) == null ? void 0 : $.name) ?? "",
            onInput: m[7] || (m[7] = (x) => {
              const U = { ...n.message.location ?? {} };
              U.name = x.target.value || void 0, u.$emit("update", { location: U });
            })
          }, null, 40, Fa),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((S = n.message.location) == null ? void 0 : S.address) ?? "",
            onInput: m[8] || (m[8] = (x) => {
              const U = { ...n.message.location ?? {} };
              U.address = x.target.value || void 0, u.$emit("update", { location: U });
            })
          }, null, 40, qa)
        ]),
        e("div", ja, [
          m[19] || (m[19] = e("label", { class: "kb-label" }, [
            J(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Ya, [
            (l(!0), o(z, null, F(d.message.actions ?? [], (x, U) => (l(), o("div", {
              key: x.id || U,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: x.label,
                onInput: (V) => {
                  var W;
                  const q = [...d.message.actions ?? []], H = Number(U);
                  q[H] = {
                    ...q[H],
                    id: ((W = q[H]) == null ? void 0 : W.id) || `action_${H + 1}`,
                    label: V.target.value
                  }, u.$emit("update", { actions: q });
                }
              }, null, 40, Ka),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: x.url,
                onInput: (V) => {
                  var W;
                  const q = [...d.message.actions ?? []], H = Number(U);
                  q[H] = {
                    ...q[H],
                    id: ((W = q[H]) == null ? void 0 : W.id) || `action_${H + 1}`,
                    url: V.target.value || void 0
                  }, u.$emit("update", { actions: q });
                }
              }, null, 40, Ga),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const V = [...d.message.actions ?? []];
                  V.splice(Number(U), 1), u.$emit("update", { actions: V });
                }
              }, " Remove ", 8, Ja)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (d.message.actions ?? []).length >= 3,
              onClick: m[9] || (m[9] = () => {
                const x = [...d.message.actions ?? []];
                x.push({
                  id: `action_${x.length + 1}`,
                  label: "",
                  url: ""
                }), u.$emit("update", { actions: x });
              })
            }, " Add action ", 8, Xa),
            e("div", Qa, [
              m[18] || (m[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (l(), o(z, null, F(["View order", "Track shipment", "Open app"], (x) => e("button", {
                key: x,
                type: "button",
                class: "kb-action-chip",
                disabled: (d.message.actions ?? []).length >= 3,
                onClick: () => {
                  const U = [...d.message.actions ?? []];
                  U.push({
                    id: `action_${Date.now()}`,
                    label: x,
                    url: ""
                  }), u.$emit("update", { actions: U });
                }
              }, p(x), 9, Za)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ts = /* @__PURE__ */ _e(es, [["__scopeId", "data-v-88ad2281"]]), as = { class: "kb-section kb-section--inline-personalization" }, ss = { class: "kb-field" }, ns = { class: "kb-insert-row" }, ls = ["value"], os = { class: "kb-field" }, is = { class: "kb-insert-row" }, rs = { class: "kb-field" }, ds = { class: "kb-variable-list" }, us = /* @__PURE__ */ ke({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(n, { emit: d }) {
    const u = n, m = d, k = ["first_name", "last_name", "order_id", "city"], _ = ae(u.variableOptions ?? k), $ = ae(_.value[0] ?? k[0]), S = ae("");
    xe(
      () => u.variableOptions,
      (H) => {
        H && H.length && (_.value = [...H], _.value.includes($.value) || ($.value = _.value[0]));
      }
    );
    const x = y(() => _.value), U = y(() => {
      var W;
      return (W = u.targets) != null && W.length ? u.targets : ["title", "body"];
    });
    function V(H) {
      m("insertVariable", { variable: $.value, field: H });
    }
    function q() {
      const H = S.value.trim();
      H && (_.value.includes(H) || (_.value = [..._.value, H]), $.value = H, S.value = "");
    }
    return (H, W) => (l(), o("section", as, [
      W[9] || (W[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      W[10] || (W[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", ss, [
        W[5] || (W[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", ns, [
          Te(e("select", {
            "onUpdate:modelValue": W[0] || (W[0] = (A) => $.value = A),
            class: "kb-select"
          }, [
            (l(!0), o(z, null, F(x.value, (A) => (l(), o("option", {
              key: A,
              value: A
            }, p(A), 9, ls))), 128))
          ], 512), [
            [Oe, $.value]
          ]),
          U.value.includes("title") ? (l(), o("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: W[1] || (W[1] = (A) => V("title"))
          }, " Into title ")) : h("", !0),
          U.value.includes("body") ? (l(), o("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: W[2] || (W[2] = (A) => V("body"))
          }, " Into message ")) : h("", !0),
          U.value.includes("footer") ? (l(), o("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: W[3] || (W[3] = (A) => V("footer"))
          }, " Into footer ")) : h("", !0)
        ])
      ]),
      e("div", os, [
        W[6] || (W[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", is, [
          Te(e("input", {
            "onUpdate:modelValue": W[4] || (W[4] = (A) => S.value = A),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [lt, S.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: q
          }, " Add ")
        ])
      ]),
      e("div", rs, [
        W[7] || (W[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        W[8] || (W[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", ds, [
          (l(!0), o(z, null, F(x.value, (A) => (l(), o("li", { key: A }, [
            e("code", null, "{{ ." + p(A) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Et = /* @__PURE__ */ _e(us, [["__scopeId", "data-v-2e8dd0d2"]]), cs = { class: "kb-section kb-section--template-type" }, ps = { class: "kb-field" }, ms = { class: "kb-radio-group" }, vs = { class: "kb-radio" }, bs = ["checked"], gs = { class: "kb-radio" }, fs = ["checked"], ys = /* @__PURE__ */ ke({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(n, { emit: d }) {
    const u = d;
    return (m, k) => (l(), o("section", cs, [
      k[5] || (k[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      k[6] || (k[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", ps, [
        e("div", ms, [
          e("label", vs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: n.templateType === "transactional",
              onChange: k[0] || (k[0] = (_) => u("update", "transactional"))
            }, null, 40, bs),
            k[2] || (k[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", gs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: n.templateType === "marketing",
              onChange: k[1] || (k[1] = (_) => u("update", "marketing"))
            }, null, 40, fs),
            k[3] || (k[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        k[4] || (k[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), ut = /* @__PURE__ */ _e(ys, [["__scopeId", "data-v-ff2e1bd8"]]), hs = { class: "kb-section" }, ks = { class: "kb-section__head" }, _s = { class: "kb-section__desc" }, ws = { class: "kb-field" }, $s = { class: "kb-radio-group" }, xs = { class: "kb-radio" }, Cs = ["checked"], Ss = { class: "kb-radio" }, Is = ["checked"], As = {
  key: 0,
  class: "kb-field kb-row"
}, Ts = ["value"], Us = ["value"], Rs = { class: "kb-field" }, Ls = ["value"], Bs = ["value"], Ps = { class: "kb-field" }, Es = ["value"], Os = ["value"], Ns = { class: "kb-field" }, Ms = { class: "kb-checkbox" }, Vs = ["checked"], Ds = /* @__PURE__ */ ke({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n) {
    const d = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (u, m) => {
      var k;
      return l(), o("section", hs, [
        e("div", ks, [
          m[8] || (m[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          n.showReset ? (l(), o("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (_) => u.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        e("p", _s, p(n.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ws, [
          m[11] || (m[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", $s, [
            e("label", xs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !n.delivery.scheduled_at,
                onChange: m[1] || (m[1] = (_) => u.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Cs),
              m[9] || (m[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Ss, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!n.delivery.scheduled_at,
                onChange: m[2] || (m[2] = (_) => u.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Is),
              m[10] || (m[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        n.delivery.scheduled_at ? (l(), o("div", As, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (k = n.delivery.scheduled_at) == null ? void 0 : k.slice(0, 16),
            onInput: m[3] || (m[3] = (_) => u.$emit("update", { scheduled_at: _.target.value }))
          }, null, 40, Ts),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: n.delivery.timezone,
            onInput: m[4] || (m[4] = (_) => u.$emit("update", { timezone: _.target.value }))
          }, null, 40, Us)
        ])) : h("", !0),
        n.showPushOptions ? (l(), o(z, { key: 1 }, [
          e("div", Rs, [
            m[12] || (m[12] = e("label", { class: "kb-label" }, [
              J(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.ttl,
              onChange: m[5] || (m[5] = (_) => u.$emit("update", { ttl: Number(_.target.value) }))
            }, [
              (l(!0), o(z, null, F(f(Ft), (_) => (l(), o("option", {
                key: _,
                value: _
              }, p(d[_] ?? _ + "s"), 9, Bs))), 128))
            ], 40, Ls)
          ]),
          e("div", Ps, [
            m[13] || (m[13] = e("label", { class: "kb-label" }, [
              J(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.priority,
              onChange: m[6] || (m[6] = (_) => u.$emit("update", { priority: _.target.value }))
            }, [
              (l(!0), o(z, null, F(f(At), (_) => (l(), o("option", {
                key: _,
                value: _
              }, p(_), 9, Os))), 128))
            ], 40, Es)
          ]),
          e("div", Ns, [
            e("label", Ms, [
              e("input", {
                type: "checkbox",
                checked: n.delivery.quiet_hours,
                onChange: m[7] || (m[7] = (_) => u.$emit("update", { quiet_hours: !n.delivery.quiet_hours }))
              }, null, 40, Vs),
              m[14] || (m[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : h("", !0)
      ]);
    };
  }
}), Ws = /* @__PURE__ */ _e(Ds, [["__scopeId", "data-v-5707a2a7"]]), Hs = { class: "kb-accordion" }, zs = { class: "kb-accordion__body" }, Fs = { class: "kb-field" }, qs = ["value"], js = { class: "kb-field" }, Ys = { class: "kb-checkbox" }, Ks = ["checked"], Gs = /* @__PURE__ */ ke({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(n) {
    return (d, u) => (l(), o("details", Hs, [
      u[4] || (u[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", zs, [
        e("div", Fs, [
          u[2] || (u[2] = e("label", { class: "kb-label" }, [
            J(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: n.delivery.collapse_key,
            onInput: u[0] || (u[0] = (m) => d.$emit("update", { collapse_key: m.target.value || void 0 }))
          }, null, 40, qs)
        ]),
        e("div", js, [
          e("label", Ys, [
            e("input", {
              type: "checkbox",
              checked: n.delivery.silent_push,
              onChange: u[1] || (u[1] = (m) => d.$emit("update", { silent_push: !n.delivery.silent_push }))
            }, null, 40, Ks),
            u[3] || (u[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Js = /* @__PURE__ */ _e(Gs, [["__scopeId", "data-v-699e4501"]]);
function Ve(n, d) {
  return !n || typeof n != "string" ? n : n.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (u, m) => {
    const _ = String(m).trim().replace(/^\./, "");
    return _ in d ? String(d[_]) : u;
  });
}
const He = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Xs = { class: "kb-preview" }, Qs = { class: "kb-preview__toggle" }, Zs = { class: "kb-preview__mode" }, en = { class: "kb-preview__quality" }, tn = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, an = ["src"], sn = { class: "kb-android-body-row" }, nn = { class: "kb-android-body-content" }, ln = {
  key: 0,
  class: "kb-android-title"
}, on = {
  key: 1,
  class: "kb-android-text"
}, rn = {
  key: 2,
  class: "kb-android-location-line"
}, dn = {
  key: 0,
  class: "kb-android-thumb"
}, un = ["src"], cn = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, pn = ["src"], mn = {
  key: 0,
  class: "kb-preview-map__caption"
}, vn = {
  key: 2,
  class: "kb-android-actions"
}, bn = {
  key: 3,
  class: "kb-preview-warning"
}, gn = { class: "kb-ios-banner" }, fn = { class: "kb-ios-content" }, yn = {
  key: 0,
  class: "kb-ios-title"
}, hn = {
  key: 1,
  class: "kb-ios-text"
}, kn = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, _n = ["src"], wn = {
  key: 0,
  class: "kb-preview-map__caption"
}, $n = {
  key: 4,
  class: "kb-ios-actions"
}, xn = {
  key: 5,
  class: "kb-preview-warning"
}, Cn = {
  key: 0,
  class: "kb-ios-thumb"
}, Sn = ["src"], In = { class: "kb-web-toast" }, An = { class: "kb-web-body" }, Tn = {
  key: 0,
  class: "kb-web-title"
}, Un = {
  key: 1,
  class: "kb-web-text"
}, Rn = {
  key: 3,
  class: "kb-web-image"
}, Ln = ["src"], Bn = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Pn = ["src"], En = {
  key: 0,
  class: "kb-preview-map__caption"
}, On = {
  key: 0,
  class: "kb-web-actions"
}, Nn = {
  key: 1,
  class: "kb-preview-warning"
}, Mn = /* @__PURE__ */ ke({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(n) {
    const d = n, u = ae("shade"), m = ae("banner"), k = ae("toast"), _ = y(() => u.value === "expanded"), $ = y(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? _.value : void 0
      })
    ), S = y(() => {
      const Y = $.value;
      return d.previewProfile ? {
        ...Y,
        title: Ve((Y == null ? void 0 : Y.title) ?? "", d.previewProfile.data),
        body: Ve((Y == null ? void 0 : Y.body) ?? "", d.previewProfile.data)
      } : Y;
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
    function U(Y, b) {
      const I = (Y ?? "").trim();
      return I ? I.length <= b ? I : `${I.slice(0, Math.max(0, b - 1)).trimEnd()}…` : "";
    }
    const V = y(() => d.selectedPlatform === "android" ? u.value : d.selectedPlatform === "ios" ? m.value : k.value), q = y(() => (x[d.selectedPlatform] ?? x.web)[V.value] ?? { title: 60, body: 160 }), H = y(
      () => {
        var Y;
        return U((Y = S.value) == null ? void 0 : Y.title, q.value.title);
      }
    ), W = y(
      () => {
        var Y;
        return U((Y = S.value) == null ? void 0 : Y.body, q.value.body);
      }
    ), A = { android: 3, ios: 4, web: 2 }, oe = y(
      () => {
        var Y;
        return Array.isArray((Y = S.value) == null ? void 0 : Y.actions) ? S.value.actions : [];
      }
    ), j = y(
      () => oe.value.slice(0, A[d.selectedPlatform] ?? 2)
    ), D = y(
      () => Math.max(0, oe.value.length - j.value.length)
    ), M = y(() => {
      var Y;
      return (((Y = d.message) == null ? void 0 : Y.deep_link) ?? "").trim();
    }), se = y(() => M.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(M.value) : !1), ve = y(() => M.value ? M.value.length <= 40 ? M.value : `${M.value.slice(0, 37)}…` : ""), ge = y(() => {
      var b, I, R;
      const Y = [];
      return (b = d.delivery) != null && b.priority && Y.push(`Priority: ${d.delivery.priority}`), typeof ((I = d.delivery) == null ? void 0 : I.ttl) == "number" && Y.push(`TTL: ${d.delivery.ttl}s`), (R = d.delivery) != null && R.silent_push && Y.push("Silent push"), Y;
    }), me = y(() => {
      var X;
      const Y = (X = S.value) == null ? void 0 : X.location;
      if (!Y || Y.lat == null && Y.lon == null) return null;
      const b = Number(Y.lat) || 0, I = Number(Y.lon) || 0, R = 8e-3, ne = [I - R, b - R, I + R, b + R].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(ne)}&layer=mapnik&marker=${b},${I}`;
    }), Z = y(() => {
      var b;
      const Y = (b = S.value) == null ? void 0 : b.location;
      return Y && (Y.lat != null || Y.lon != null || Y.name || Y.address);
    });
    return (Y, b) => {
      var I, R, ne, X, B, pe, ue, fe, ye, P, w, T, G, ee, re, le;
      return l(), o("div", Xs, [
        e("div", Qs, [
          e("label", Zs, [
            b[6] || (b[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            n.selectedPlatform === "android" ? Te((l(), o("select", {
              key: 0,
              "onUpdate:modelValue": b[0] || (b[0] = (te) => u.value = te),
              class: "kb-preview__mode-select"
            }, [...b[3] || (b[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Oe, u.value]
            ]) : n.selectedPlatform === "ios" ? Te((l(), o("select", {
              key: 1,
              "onUpdate:modelValue": b[1] || (b[1] = (te) => m.value = te),
              class: "kb-preview__mode-select"
            }, [...b[4] || (b[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Oe, m.value]
            ]) : Te((l(), o("select", {
              key: 2,
              "onUpdate:modelValue": b[2] || (b[2] = (te) => k.value = te),
              class: "kb-preview__mode-select"
            }, [...b[5] || (b[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Oe, k.value]
            ])
          ]),
          e("div", en, [
            (l(!0), o(z, null, F(ge.value, (te) => (l(), o("span", {
              key: te,
              class: "kb-preview__badge"
            }, p(te), 1))), 128))
          ])
        ]),
        n.selectedPlatform === "android" ? (l(), o("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: ie(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${u.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          b[9] || (b[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ie(["kb-android-notification", { "kb-android-notification--expanded": _.value }])
          }, [
            b[8] || (b[8] = Fe('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: ie(["kb-android-body", { "kb-android-body--expanded": _.value }])
            }, [
              _.value && S.value.imageUrl ? (l(), o("div", tn, [
                e("img", {
                  src: S.value.imageUrl,
                  alt: ""
                }, null, 8, an)
              ])) : h("", !0),
              e("div", sn, [
                e("div", nn, [
                  H.value ? (l(), o("div", ln, p(H.value), 1)) : h("", !0),
                  W.value ? (l(), o("div", on, p(W.value), 1)) : h("", !0),
                  Z.value && !_.value && ((I = S.value.location) != null && I.name || (R = S.value.location) != null && R.address) ? (l(), o("div", rn, [
                    b[7] || (b[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    J(" " + p(((ne = S.value.location) == null ? void 0 : ne.name) || ((X = S.value.location) == null ? void 0 : X.address)), 1)
                  ])) : h("", !0),
                  M.value ? (l(), o("div", {
                    key: 3,
                    class: ie(["kb-preview-link", { "kb-preview-link--invalid": !se.value }])
                  }, p(se.value ? ve.value : "Invalid deep link format"), 3)) : h("", !0)
                ]),
                !_.value && S.value.imageUrl ? (l(), o("div", dn, [
                  e("img", {
                    src: S.value.imageUrl,
                    alt: ""
                  }, null, 8, un)
                ])) : h("", !0)
              ]),
              Z.value && me.value && _.value ? (l(), o("div", cn, [
                e("iframe", {
                  src: me.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                (B = S.value.location) != null && B.name || (pe = S.value.location) != null && pe.address ? (l(), o("div", mn, p(((ue = S.value.location) == null ? void 0 : ue.name) || ((fe = S.value.location) == null ? void 0 : fe.address)), 1)) : h("", !0)
              ])) : h("", !0),
              j.value.length ? (l(), o("div", vn, [
                (l(!0), o(z, null, F(j.value, (te) => (l(), o("button", {
                  key: te.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, p(te.label || "Action"), 1))), 128))
              ])) : h("", !0),
              D.value > 0 ? (l(), o("p", bn, " Showing " + p(j.value.length) + " of " + p(oe.value.length) + " actions on " + p(n.selectedPlatform) + ". ", 1)) : h("", !0)
            ], 2)
          ], 2)
        ], 2)) : n.selectedPlatform === "ios" ? (l(), o("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: ie(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${m.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          b[12] || (b[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", gn, [
            b[11] || (b[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", fn, [
              b[10] || (b[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              H.value ? (l(), o("div", yn, p(H.value), 1)) : h("", !0),
              W.value ? (l(), o("div", hn, p(W.value), 1)) : h("", !0),
              M.value ? (l(), o("div", {
                key: 2,
                class: ie(["kb-preview-link", { "kb-preview-link--invalid": !se.value }])
              }, p(se.value ? ve.value : "Invalid deep link format"), 3)) : h("", !0),
              Z.value && me.value ? (l(), o("div", kn, [
                e("iframe", {
                  src: me.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, _n),
                (ye = S.value.location) != null && ye.name || (P = S.value.location) != null && P.address ? (l(), o("div", wn, p(((w = S.value.location) == null ? void 0 : w.name) || ((T = S.value.location) == null ? void 0 : T.address)), 1)) : h("", !0)
              ])) : h("", !0),
              j.value.length ? (l(), o("div", $n, [
                (l(!0), o(z, null, F(j.value, (te) => (l(), o("button", {
                  key: te.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, p(te.label || "Action"), 1))), 128))
              ])) : h("", !0),
              D.value > 0 ? (l(), o("p", xn, " Showing " + p(j.value.length) + " of " + p(oe.value.length) + " actions on " + p(n.selectedPlatform) + ". ", 1)) : h("", !0)
            ]),
            S.value.imageUrl ? (l(), o("div", Cn, [
              e("img", {
                src: S.value.imageUrl,
                alt: ""
              }, null, 8, Sn)
            ])) : h("", !0)
          ])
        ], 2)) : (l(), o("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: ie(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${k.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          b[14] || (b[14] = Fe('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", In, [
            b[13] || (b[13] = Fe('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", An, [
              H.value ? (l(), o("div", Tn, p(H.value), 1)) : h("", !0),
              W.value ? (l(), o("div", Un, p(W.value), 1)) : h("", !0),
              M.value ? (l(), o("div", {
                key: 2,
                class: ie(["kb-preview-link", { "kb-preview-link--invalid": !se.value }])
              }, p(se.value ? ve.value : "Invalid deep link format"), 3)) : h("", !0),
              S.value.imageUrl ? (l(), o("div", Rn, [
                e("img", {
                  src: S.value.imageUrl,
                  alt: ""
                }, null, 8, Ln)
              ])) : h("", !0),
              Z.value && me.value ? (l(), o("div", Bn, [
                e("iframe", {
                  src: me.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Pn),
                (G = S.value.location) != null && G.name || (ee = S.value.location) != null && ee.address ? (l(), o("div", En, p(((re = S.value.location) == null ? void 0 : re.name) || ((le = S.value.location) == null ? void 0 : le.address)), 1)) : h("", !0)
              ])) : h("", !0)
            ]),
            j.value.length ? (l(), o("div", On, [
              (l(!0), o(z, null, F(j.value, (te, he) => (l(), o("button", {
                key: te.id || he,
                type: "button",
                class: ie(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(he) > 0 }])
              }, p(te.label || "Action"), 3))), 128))
            ])) : h("", !0),
            D.value > 0 ? (l(), o("p", Nn, " Showing " + p(j.value.length) + " of " + p(oe.value.length) + " actions on " + p(n.selectedPlatform) + ". ", 1)) : h("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Vn = /* @__PURE__ */ _e(Mn, [["__scopeId", "data-v-4fc616d9"]]), Dn = { class: "kb-version-dialog" }, Wn = {
  key: 0,
  class: "kb-version-empty"
}, Hn = {
  key: 1,
  class: "kb-version-list"
}, zn = { class: "kb-version-item-label" }, Fn = ["onClick"], qn = { class: "kb-version-actions" }, jn = /* @__PURE__ */ ke({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(n, { emit: d }) {
    const u = d;
    function m(k) {
      try {
        return new Date(k).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return k;
      }
    }
    return (k, _) => n.open ? (l(), o("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: _[1] || (_[1] = Wt(($) => u("close"), ["escape"]))
    }, [
      e("div", Dn, [
        _[2] || (_[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        _[3] || (_[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        n.versions.length === 0 ? (l(), o("div", Wn, ' No versions saved yet. Use "Save as version" to create one. ')) : (l(), o("ul", Hn, [
          (l(!0), o(z, null, F(n.versions, ($) => (l(), o("li", {
            key: $.id,
            class: "kb-version-item"
          }, [
            e("span", zn, p($.label || m($.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (S) => {
                u("restore", $.snapshot), u("close");
              }
            }, " Restore ", 8, Fn)
          ]))), 128))
        ])),
        e("div", qn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: _[0] || (_[0] = ($) => u("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : h("", !0);
  }
}), Ot = /* @__PURE__ */ _e(jn, [["__scopeId", "data-v-ce35a513"]]), ft = [
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
], Yn = [
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
], Kn = { class: "keos-notification-builder" }, Gn = { class: "kb-builder-top" }, Jn = { class: "kb-push-layout" }, Xn = { class: "kb-push-sidebar" }, Qn = {
  key: 0,
  class: "kb-push-form"
}, Zn = {
  key: 0,
  class: "kb-hint-card"
}, el = { class: "kb-push-form-head" }, tl = { class: "kb-push-form-head-top" }, al = { class: "kb-push-health-pill" }, sl = { class: "kb-push-form-head-row" }, nl = ["value"], ll = { class: "kb-push-health" }, ol = { class: "kb-push-health-row" }, il = { class: "kb-push-health-value" }, rl = { class: "kb-push-health-bar" }, dl = {
  key: 1,
  class: "kb-push-form"
}, ul = { class: "kb-push-canvas" }, cl = {
  key: 0,
  class: "kb-push-test-banner"
}, pl = { class: "kb-push-preview-chrome" }, ml = { class: "kb-push-preview-controls" }, vl = { class: "kb-push-preview-as" }, bl = ["value"], gl = { class: "kb-preview-status" }, fl = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, yl = ["aria-selected", "aria-controls", "onClick"], hl = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, kl = { class: "kb-push-actions" }, _l = {
  key: 0,
  class: "kb-actions-note"
}, wl = { key: 0 }, $l = { class: "kb-push-actions-right" }, xl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Cl = { class: "kb-confirm-dialog" }, Sl = { class: "kb-confirm-actions" }, Il = /* @__PURE__ */ ke({
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
  setup(n, { emit: d }) {
    const u = n, m = d, k = ae("android"), _ = ae(""), $ = ae(!1), S = ae(null), x = ae(!1), U = y(
      () => A.value.workflow_status ?? "draft"
    ), V = y(() => {
      const t = _.value;
      return t ? He.find((s) => s.id === t) ?? null : null;
    });
    function q(t) {
      const s = A.value, g = t.campaign.message ? { ...s.message, ...t.campaign.message } : s.message, v = t.campaign.delivery ? { ...s.delivery, ...t.campaign.delivery } : s.delivery;
      M({
        ...t.campaign,
        message: g,
        delivery: v
      }), S.value = null, $.value = !1;
    }
    function H(t) {
      const s = t.target.value;
      if (!s) return;
      const g = ft.find((v) => v.id === s);
      g && (oe.value ? (S.value = g, $.value = !0) : q(g), t.target.value = "");
    }
    function W(t) {
      A.value = t, x.value = !1;
    }
    const {
      campaign: A,
      dirty: oe,
      customValidatorErrors: j,
      getValidationWithWarnings: D,
      update: M,
      updateMessage: se,
      updateDelivery: ve,
      undo: ge,
      redo: me,
      canUndo: Z,
      canRedo: Y,
      resetMessage: b,
      resetDelivery: I,
      getPreview: R,
      characterLimits: ne,
      hooks: X
    } = Xe({
      initial: u.modelValue,
      hooks: {
        ...u.hooks,
        customValidators: async (t) => {
          var v, O, C, c;
          const s = [];
          (v = t.name) != null && v.trim() || s.push("Template name is required"), (C = (O = t.message) == null ? void 0 : O.body) != null && C.trim() || s.push("Message body is required");
          const g = (c = u.hooks) != null && c.customValidators ? await u.hooks.customValidators(t) : [];
          return [...s, ...g];
        }
      },
      onDirty: () => m("change", A.value)
    }), { lastSavedAt: B } = Qe(A, { channel: "push" });
    function pe(t) {
      (t.metaKey || t.ctrlKey) && t.key === "z" && (t.preventDefault(), t.shiftKey ? me() : ge());
    }
    je(() => {
      window.addEventListener("keydown", pe);
    }), Ye(() => {
      window.removeEventListener("keydown", pe);
    }), xe(A, (t) => m("update:modelValue", t), { deep: !0 });
    const ue = ae(), fe = ae(!0), ye = ae(!0);
    async function P() {
      if (X.estimateReach)
        try {
          ue.value = await X.estimateReach(A.value.audience);
        } catch {
          ue.value = void 0;
        }
      X.canSend && (fe.value = await Promise.resolve(X.canSend())), X.canSchedule && (ye.value = await Promise.resolve(X.canSchedule()));
    }
    P(), xe(() => A.value.audience, P, { deep: !0 });
    const w = y(() => (j.value, D(ue.value))), T = y(() => w.value.blockingErrors), G = y(() => w.value.warnings), ee = y(() => w.value.valid), re = y(() => {
      var v, O, C;
      const t = A.value.message, s = [
        !!((v = A.value.name) != null && v.trim()),
        !!((O = t.title) != null && O.trim()),
        !!((C = t.body) != null && C.trim()),
        !!(t.template_type ?? A.value.template_type),
        Array.isArray(t.actions) ? t.actions.length > 0 : !1
      ], g = s.filter(Boolean).length;
      return Math.round(g / s.length * 100);
    }), le = y(() => re.value >= 90 ? "Production ready" : re.value >= 70 ? "Strong draft" : re.value >= 40 ? "In progress" : "Needs setup"), te = y(() => {
      const t = A.value.message;
      return !!((t.title ?? "").toString().trim() || (t.body ?? "").toString().trim() || Array.isArray(t.actions) && t.actions.length);
    }), he = y(
      () => ne[k.value].title
    ), we = y(() => ne[k.value].body), Ce = y(() => A.value.message.title.length), Ue = y(() => A.value.message.body.length), Ne = y(() => {
      if (Ce.value > he.value)
        return `Title exceeds ${he.value} characters for ${k.value}.`;
    }), Se = y(() => {
      const t = T.value.find(
        (s) => s.message === "Message body is required"
      );
      if (t) return t.message;
      if (Ue.value > we.value)
        return `Body exceeds ${we} characters for ${k.value}.`;
    }), Le = y(
      () => A.value.template_type ?? "transactional"
    );
    function Be(t) {
      M({ template_type: t });
    }
    function Pe(t) {
      M({
        name: t,
        tracking: { ...A.value.tracking ?? {}, campaign_name: t }
      });
    }
    function Ie(t) {
      const s = ` {{ .${t.variable} }}`, g = A.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, t.variable]));
      t.field === "title" ? se({
        title: A.value.message.title + s,
        variables: v
      }) : se({
        body: A.value.message.body + s,
        variables: v
      });
    }
    function Q() {
      ee.value && m("save", A.value);
    }
    return (t, s) => {
      var g;
      return l(), o("div", Kn, [
        e("div", Gn, [
          $e(Ze, {
            "campaign-name": f(A).name,
            status: f(A).status,
            dirty: f(oe),
            "last-saved-at": f(B),
            "can-undo": f(Z),
            "can-redo": f(Y),
            "workflow-status": U.value,
            "slugify-name": u.enforceSlugName,
            "onUpdate:campaignName": Pe,
            "onUpdate:workflowStatus": s[0] || (s[0] = (v) => f(M)({ workflow_status: v })),
            onUndo: f(ge),
            onRedo: f(me)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          T.value.length > 0 ? (l(), o("div", {
            key: 0,
            class: "kb-errors",
            style: ce({
              background: f(be).dangerBg,
              border: `1px solid ${f(be).dangerBorder}`,
              borderRadius: `${f(De).input}px`,
              padding: `${f(de)[12]}px ${f(de)[16]}px`,
              marginBottom: `${f(de)[16]}px`
            })
          }, [
            e("ul", {
              style: ce({ margin: 0, paddingLeft: "1.25rem", color: f(be).danger })
            }, [
              (l(!0), o(z, null, F(T.value, (v) => (l(), o("li", {
                key: v.message
              }, p(v.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", Jn, [
          e("aside", Xn, [
            n.disabledSections.includes("message") ? h("", !0) : (l(), o("div", Qn, [
              !f(A).message.title && !f(A).message.body ? (l(), o("div", Zn, " Add a title and message below to get started. ")) : h("", !0),
              e("div", el, [
                e("div", tl, [
                  s[12] || (s[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", al, p(le.value), 1)
                ]),
                e("div", sl, [
                  $e(ut, {
                    "template-type": Le.value,
                    onUpdate: Be
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: H
                  }, [
                    s[13] || (s[13] = e("option", { value: "" }, "Presets…", -1)),
                    (l(!0), o(z, null, F(f(ft), (v) => (l(), o("option", {
                      key: v.id,
                      value: v.id
                    }, p(v.label), 9, nl))), 128))
                  ], 32)
                ]),
                e("div", ll, [
                  e("div", ol, [
                    s[14] || (s[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", il, p(re.value) + "%", 1)
                  ]),
                  e("div", rl, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: ce({ width: `${re.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              $e(ts, {
                message: f(A).message,
                "title-count": Ce.value,
                "body-count": Ue.value,
                "title-limit": he.value,
                "body-limit": we.value,
                "selected-platform": k.value,
                "show-reset": !0,
                "title-error": Ne.value,
                "body-error": Se.value,
                onUpdate: f(se),
                onReset: s[1] || (s[1] = (v) => f(b)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              $e(Et, {
                message: f(A).message,
                "variable-options": n.variableOptions,
                onUpdate: f(se),
                onInsertVariable: Ie
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !n.designOnly && !n.disabledSections.includes("delivery") ? (l(), o("div", dl, [
              s[15] || (s[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              $e(Ws, {
                delivery: f(A).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: f(ve),
                onReset: s[2] || (s[2] = (v) => f(I)())
              }, null, 8, ["delivery", "onUpdate"]),
              $e(Js, {
                delivery: f(A).delivery,
                onUpdate: f(ve)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : h("", !0)
          ]),
          e("main", ul, [
            !n.designOnly && f(A).audience.test_mode ? (l(), o("div", cl, [...s[16] || (s[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              J(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", pl, [
              e("div", ml, [
                e("label", vl, [
                  s[18] || (s[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": s[3] || (s[3] = (v) => _.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[17] || (s[17] = e("option", { value: "" }, "No substitution", -1)),
                    (l(!0), o(z, null, F(f(He), (v) => (l(), o("option", {
                      key: v.id,
                      value: v.id
                    }, p(v.label), 9, bl))), 128))
                  ], 512), [
                    [Oe, _.value]
                  ])
                ]),
                e("div", gl, [
                  s[19] || (s[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, p(k.value), 1)
                ])
              ]),
              e("div", fl, [
                (l(), o(z, null, F(["android", "ios", "web"], (v) => e("button", {
                  key: v,
                  type: "button",
                  class: ie(["kb-push-device-btn", { "kb-push-device-btn--active": k.value === v }]),
                  role: "tab",
                  "aria-selected": k.value === v,
                  "aria-controls": `kb-preview-panel-${v}`,
                  onClick: (O) => k.value = v
                }, p(v.toUpperCase()), 11, yl)), 64))
              ]),
              e("div", {
                class: ie(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !te.value }])
              }, [
                !f(A).message.title && !f(A).message.body ? (l(), o("div", hl, [...s[20] || (s[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (l(), Ht(Vn, {
                  key: 1,
                  "get-preview": f(R),
                  "selected-platform": k.value,
                  "preview-profile": V.value,
                  message: f(A).message,
                  delivery: f(A).delivery,
                  "onUpdate:selectedPlatform": s[4] || (s[4] = (v) => k.value = v)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", kl, [
          G.value.length > 0 ? (l(), o("div", _l, [
            s[21] || (s[21] = e("strong", null, "Warning:", -1)),
            J(" " + p((g = G.value[0]) == null ? void 0 : g.message) + " ", 1),
            G.value.length > 1 ? (l(), o("span", wl, " (+" + p(G.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", $l, [
            !n.designOnly && n.showHistory ? (l(), o("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: s[5] || (s[5] = (v) => x.value = !0)
            }, " Version history ")) : h("", !0),
            !n.designOnly && n.showSaveVersion ? (l(), o("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: s[6] || (s[6] = (v) => m("save-version", JSON.parse(JSON.stringify(f(A)))))
            }, " Save as version ")) : h("", !0),
            n.showDuplicate ? (l(), o("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: s[7] || (s[7] = (v) => m("duplicate", JSON.parse(JSON.stringify(f(A)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (l(), o("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: Q
            }, " Save ")) : h("", !0),
            n.showClose ? (l(), o("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: s[8] || (s[8] = (v) => m("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        $.value ? (l(), o("div", xl, [
          e("div", Cl, [
            s[22] || (s[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[23] || (s[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Sl, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: s[9] || (s[9] = (v) => {
                  $.value = !1, S.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: s[10] || (s[10] = (v) => S.value && q(S.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0),
        $e(Ot, {
          open: x.value,
          versions: n.versions,
          onClose: s[11] || (s[11] = (v) => x.value = !1),
          onRestore: W
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Nt = /* @__PURE__ */ _e(Il, [["__scopeId", "data-v-18771e1a"]]), Al = { class: "kb-section" }, Tl = { class: "kb-section__head" }, Ul = { class: "kb-summary-bar" }, Rl = { class: "kb-pill kb-pill--category" }, Ll = { class: "kb-pill kb-pill--format" }, Bl = { class: "kb-pill kb-pill--status" }, Pl = { class: "kb-field" }, El = ["value"], Ol = ["value", "disabled"], Nl = { class: "kb-field" }, Ml = { class: "kb-label" }, Vl = { class: "kb-helper" }, Dl = ["value"], Wl = ["value", "disabled"], Hl = { class: "kb-field" }, zl = ["value"], Fl = { class: "kb-field kb-field--inline kb-field--language-limits" }, ql = { class: "kb-field-half" }, jl = ["value"], Yl = { class: "kb-field" }, Kl = ["value"], Gl = {
  key: 0,
  class: "kb-field"
}, Jl = { class: "kb-label" }, Xl = ["value"], Ql = {
  key: 1,
  class: "kb-field"
}, Zl = ["value"], eo = {
  key: 2,
  class: "kb-field"
}, to = ["value"], ao = {
  key: 3,
  class: "kb-field"
}, so = ["value"], no = {
  key: 4,
  class: "kb-field"
}, lo = ["value"], oo = {
  key: 5,
  class: "kb-field"
}, io = ["value"], ro = ["value"], uo = {
  key: 6,
  class: "kb-field"
}, co = { class: "kb-wa-buttons" }, po = ["value", "onInput"], mo = ["value", "onInput"], vo = ["value", "onInput"], bo = ["value", "onInput"], go = ["onClick"], fo = ["disabled"], yo = {
  key: 7,
  class: "kb-field"
}, ho = { class: "kb-wa-buttons" }, ko = ["value", "onInput"], _o = ["value", "onInput"], wo = ["onClick"], $o = {
  key: 8,
  class: "kb-field"
}, xo = ["value"], Co = ["value"], So = { class: "kb-field" }, Io = { class: "kb-label" }, Ao = ["value"], To = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, Uo = { class: "kb-wa-fields-list" }, Ro = { class: "kb-wa-field-name" }, Lo = { class: "kb-wa-field-status" }, Bo = { class: "kb-field" }, Po = ["value"], Eo = {
  key: 10,
  class: "kb-field"
}, Oo = { class: "kb-wa-buttons" }, No = ["value", "onInput"], Mo = ["value", "onChange"], Vo = ["value", "onInput"], Do = ["value", "onInput"], Wo = {
  key: 2,
  class: "kb-opt-out-note"
}, Ho = ["onClick"], zo = ["disabled"], tt = 60, at = 1024, st = 60, nt = 10, kt = 10, Fo = /* @__PURE__ */ ke({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(n, { emit: d }) {
    const u = n, m = d, k = [
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
    ], _ = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], $ = y(() => u.message), S = y(() => $.value.template_type ?? "text"), x = y(() => $.value.header_type ?? "none"), U = y(() => String($.value.header ?? "")), V = y(() => String($.value.body ?? "")), q = y(() => String($.value.footer ?? "")), H = y(() => $.value.buttons ?? []), W = y(() => $.value.products ?? []), A = y(() => $.value.cards ?? []), oe = y(() => {
      const P = k.find((w) => w.value === S.value);
      return (P == null ? void 0 : P.hint) ?? "Choose the approved WhatsApp template format.";
    }), j = y(() => {
      const P = String($.value.template_category ?? "").trim();
      return P ? P.charAt(0).toUpperCase() + P.slice(1) : "Uncategorized";
    }), D = y(() => {
      const P = k.find((w) => w.value === S.value);
      return (P == null ? void 0 : P.label) ?? "Text";
    }), M = y(() => $.value.template_name ? V.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), se = y(() => new Set((u.disabledCategories ?? []).map((P) => String(P).trim()))), ve = y(() => new Set((u.disabledFormats ?? []).map((P) => String(P).trim())));
    function ge(P) {
      if (!P || typeof P != "string") return [];
      const w = /\{\{\s*([^}]+?)\s*\}\}/g, T = /* @__PURE__ */ new Set();
      let G;
      for (; (G = w.exec(P)) !== null; ) T.add(G[1].trim());
      return Array.from(T);
    }
    const me = y(() => {
      const P = u.message.header ?? "", w = u.message.body ?? u.message.body ?? "", T = new Set(u.message.variables ?? []), G = [...ge(P), ...ge(w)];
      return Array.from(new Set(G)).map((re) => ({ name: re, configured: T.has(re) }));
    });
    function Z(P) {
      m("update", P);
    }
    function Y(P) {
      const w = {
        template_category: P || void 0
      };
      P === "authentication" && S.value !== "auth" && (w.template_type = "auth"), Z(w);
    }
    function b(P) {
      const w = { template_type: P };
      P === "auth" && (w.template_category = "authentication"), P === "image" || P === "video" || P === "document" ? w.header_type = P : (x.value === "image" || x.value === "video" || x.value === "document") && (w.header_type = "none"), Z(w);
    }
    function I(P, w) {
      var G;
      const T = [...H.value];
      T[P] = {
        ...T[P],
        id: ((G = T[P]) == null ? void 0 : G.id) || `btn_${P + 1}`,
        ...w
      }, Z({ buttons: T });
    }
    function R(P) {
      const w = [...H.value];
      w.splice(P, 1), Z({ buttons: w });
    }
    function ne() {
      const P = [...H.value];
      P.push({ id: `btn_${P.length + 1}`, label: "", type: "quick_reply" }), Z({ buttons: P });
    }
    function X(P, w) {
      var G;
      const T = [...W.value];
      T[P] = {
        ...T[P],
        id: ((G = T[P]) == null ? void 0 : G.id) || `prod_${P + 1}`,
        ...w
      }, Z({ products: T });
    }
    function B(P) {
      const w = [...W.value];
      w.splice(P, 1), Z({ products: w });
    }
    function pe() {
      const P = [...W.value];
      P.push({ id: `prod_${P.length + 1}`, productId: "" }), Z({ products: P });
    }
    function ue(P, w) {
      var G;
      const T = [...A.value];
      T[P] = {
        ...T[P],
        id: ((G = T[P]) == null ? void 0 : G.id) || `card_${P + 1}`,
        ...w
      }, Z({ cards: T });
    }
    function fe(P) {
      const w = [...A.value];
      w.splice(P, 1), Z({ cards: w });
    }
    function ye() {
      const P = [...A.value];
      P.push({
        id: `card_${P.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), Z({ cards: P });
    }
    return (P, w) => (l(), o("section", Al, [
      e("div", Tl, [
        w[16] || (w[16] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        n.showReset ? (l(), o("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: w[0] || (w[0] = (T) => P.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      w[42] || (w[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Ul, [
        e("span", Rl, p(j.value), 1),
        e("span", Ll, p(D.value), 1),
        e("span", Bl, p(M.value), 1)
      ]),
      e("div", Pl, [
        w[18] || (w[18] = e("label", { class: "kb-label" }, [
          J(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: $.value.template_category ?? "",
          onChange: w[1] || (w[1] = (T) => Y(T.target.value))
        }, [
          w[17] || (w[17] = e("option", { value: "" }, "Select category", -1)),
          (l(), o(z, null, F(_, (T) => e("option", {
            key: T.value,
            value: T.value,
            disabled: se.value.has(T.value)
          }, p(T.label) + p(se.value.has(T.value) ? " (Disabled)" : ""), 9, Ol)), 64))
        ], 40, El)
      ]),
      e("div", Nl, [
        e("label", Ml, [
          w[19] || (w[19] = J(" Functional format ", -1)),
          e("span", Vl, p(oe.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: S.value,
          onChange: w[2] || (w[2] = (T) => b(T.target.value))
        }, [
          (l(), o(z, null, F(k, (T) => e("option", {
            key: T.value,
            value: T.value,
            disabled: ve.value.has(T.value)
          }, p(T.label) + p(ve.value.has(T.value) ? " (Disabled)" : ""), 9, Wl)), 64))
        ], 40, Dl)
      ]),
      e("div", Hl, [
        w[20] || (w[20] = e("label", { class: "kb-label" }, [
          J(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: $.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, zl)
      ]),
      e("div", Fl, [
        e("div", ql, [
          w[21] || (w[21] = e("label", { class: "kb-label" }, [
            J(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: $.value.template_language ?? "",
            onInput: w[3] || (w[3] = (T) => Z({
              template_language: T.target.value || void 0
            }))
          }, null, 40, jl)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            w[22] || (w[22] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + p(tt) + " chars"),
              e("li", null, "Body: " + p(at) + " chars"),
              e("li", null, "Footer: " + p(st) + " chars"),
              e("li", null, "Buttons: up to " + p(nt))
            ])
          ])
        ])
      ]),
      e("div", Yl, [
        w[24] || (w[24] = e("label", { class: "kb-label" }, [
          J(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: x.value,
          onChange: w[4] || (w[4] = (T) => Z({ header_type: T.target.value }))
        }, [...w[23] || (w[23] = [
          Fe('<option value="none" data-v-4f6d05a9>No header</option><option value="text" data-v-4f6d05a9>Text header</option><option value="image" data-v-4f6d05a9>Image header</option><option value="video" data-v-4f6d05a9>Video header</option><option value="document" data-v-4f6d05a9>Document header</option>', 5)
        ])], 40, Kl)
      ]),
      x.value === "text" ? (l(), o("div", Gl, [
        e("label", Jl, [
          w[25] || (w[25] = J(" Header text ", -1)),
          e("span", {
            class: ie(["kb-counter", { "kb-counter--warn": U.value.length > tt }])
          }, p(U.value.length) + "/" + p(tt), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: U.value,
          onInput: w[5] || (w[5] = (T) => Z({
            header: T.target.value || void 0
          }))
        }, null, 40, Xl)
      ])) : h("", !0),
      ["image", "video", "document"].includes(x.value) || ["image", "video", "document"].includes(S.value) ? (l(), o("div", Ql, [
        w[26] || (w[26] = e("label", { class: "kb-label" }, [
          J(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: $.value.media_url ?? "",
          onInput: w[6] || (w[6] = (T) => Z({
            media_url: T.target.value || void 0
          }))
        }, null, 40, Zl)
      ])) : h("", !0),
      x.value === "document" || S.value === "document" ? (l(), o("div", eo, [
        w[27] || (w[27] = e("label", { class: "kb-label" }, [
          J(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: $.value.document_filename ?? "",
          onInput: w[7] || (w[7] = (T) => Z({
            document_filename: T.target.value || void 0
          }))
        }, null, 40, to)
      ])) : h("", !0),
      ["image", "video", "document"].includes(x.value) || ["image", "video", "document"].includes(S.value) ? (l(), o("div", ao, [
        w[28] || (w[28] = e("label", { class: "kb-label" }, [
          J(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: $.value.media_caption ?? "",
          onInput: w[8] || (w[8] = (T) => Z({
            media_caption: T.target.value || void 0
          }))
        }, null, 40, so)
      ])) : h("", !0),
      S.value === "lto" ? (l(), o("div", no, [
        w[29] || (w[29] = e("label", { class: "kb-label" }, [
          J(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: $.value.lto_expiry ?? "",
          onInput: w[9] || (w[9] = (T) => Z({
            lto_expiry: T.target.value || void 0
          }))
        }, null, 40, lo)
      ])) : h("", !0),
      S.value === "flow" ? (l(), o("div", oo, [
        w[30] || (w[30] = e("label", { class: "kb-label" }, [
          J(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: $.value.flow_id ?? "",
          onInput: w[10] || (w[10] = (T) => Z({
            flow_id: T.target.value || void 0
          }))
        }, null, 40, io),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: $.value.flow_cta_label ?? "",
          onInput: w[11] || (w[11] = (T) => Z({
            flow_cta_label: T.target.value || void 0
          }))
        }, null, 40, ro)
      ])) : h("", !0),
      S.value === "carousel" ? (l(), o("div", uo, [
        e("label", { class: "kb-label" }, [
          w[31] || (w[31] = J(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + p(kt) + " cards.")
        ]),
        e("div", co, [
          (l(!0), o(z, null, F(A.value, (T, G) => (l(), o("div", {
            key: T.id || G,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: T.title ?? "",
              onInput: (ee) => ue(Number(G), { title: ee.target.value })
            }, null, 40, po),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: T.media_url ?? "",
              onInput: (ee) => ue(Number(G), { media_url: ee.target.value })
            }, null, 40, mo),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: T.button_label ?? "",
              onInput: (ee) => ue(Number(G), { button_label: ee.target.value })
            }, null, 40, vo),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: T.button_url ?? "",
              onInput: (ee) => ue(Number(G), { button_url: ee.target.value })
            }, null, 40, bo),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ee) => fe(Number(G))
            }, "Remove", 8, go)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: A.value.length >= kt,
            onClick: ye
          }, " Add card ", 8, fo)
        ])
      ])) : h("", !0),
      ["mpm", "catalog"].includes(S.value) ? (l(), o("div", yo, [
        w[32] || (w[32] = e("label", { class: "kb-label" }, [
          J(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", ho, [
          (l(!0), o(z, null, F(W.value, (T, G) => (l(), o("div", {
            key: T.id || G,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: T.productId,
              onInput: (ee) => X(Number(G), { productId: ee.target.value })
            }, null, 40, ko),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: T.sectionTitle,
              onInput: (ee) => X(Number(G), { sectionTitle: ee.target.value || void 0 })
            }, null, 40, _o),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ee) => B(Number(G))
            }, " Remove ", 8, wo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: pe
          }, " Add product ")
        ])
      ])) : h("", !0),
      S.value === "auth" ? (l(), o("div", $o, [
        w[34] || (w[34] = e("label", { class: "kb-label" }, [
          J(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: $.value.auth_type ?? "otp",
          onChange: w[12] || (w[12] = (T) => Z({
            auth_type: T.target.value
          }))
        }, [...w[33] || (w[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, xo),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: $.value.auth_label ?? "",
          onInput: w[13] || (w[13] = (T) => Z({
            auth_label: T.target.value || void 0
          }))
        }, null, 40, Co)
      ])) : h("", !0),
      e("div", So, [
        e("label", Io, [
          w[35] || (w[35] = J(" Body ", -1)),
          w[36] || (w[36] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: ie(["kb-counter", { "kb-counter--warn": V.value.length > at }])
          }, p(V.value.length) + "/" + p(at), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
          value: V.value,
          onInput: w[14] || (w[14] = (T) => Z({
            body: T.target.value || void 0
          }))
        }, null, 40, Ao)
      ]),
      me.value.length > 0 ? (l(), o("div", To, [
        w[37] || (w[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        w[38] || (w[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", Uo, [
          (l(!0), o(z, null, F(me.value, (T) => (l(), o("li", {
            key: T.name,
            class: ie(["kb-wa-field-item", { "kb-wa-field-item--ok": T.configured }])
          }, [
            e("span", Ro, p(T.name), 1),
            e("span", Lo, p(T.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : h("", !0),
      e("div", Bo, [
        w[39] || (w[39] = e("label", { class: "kb-label" }, [
          J(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: q.value,
          onInput: w[15] || (w[15] = (T) => Z({
            footer: T.target.value || void 0
          }))
        }, null, 40, Po),
        e("div", {
          class: ie(["kb-counter kb-counter--inline", { "kb-counter--warn": q.value.length > st }])
        }, p(q.value.length) + "/" + p(st), 3)
      ]),
      V.value.trim().length > 0 ? (l(), o("div", Eo, [
        e("label", { class: "kb-label" }, [
          w[40] || (w[40] = J(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + p(nt) + " buttons. ")
        ]),
        e("div", Oo, [
          (l(!0), o(z, null, F(H.value, (T, G) => (l(), o("div", {
            key: T.id || G,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: T.label,
              onInput: (ee) => I(Number(G), { label: ee.target.value })
            }, null, 40, No),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: T.type ?? "quick_reply",
              onChange: (ee) => I(Number(G), { type: ee.target.value })
            }, [...w[41] || (w[41] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, Mo),
            T.type === "url" ? (l(), o("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: T.url,
              onInput: (ee) => I(Number(G), { url: ee.target.value || void 0 })
            }, null, 40, Vo)) : T.type === "call" ? (l(), o("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: T.phone,
              onInput: (ee) => I(Number(G), { phone: ee.target.value || void 0 })
            }, null, 40, Do)) : T.type === "opt_out" ? (l(), o("span", Wo, " Sends a built-in opt-out action. ")) : h("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ee) => R(Number(G))
            }, " Remove ", 8, Ho)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: H.value.length >= nt,
            onClick: ne
          }, " Add button ", 8, zo)
        ])
      ])) : h("", !0)
    ]));
  }
}), qo = /* @__PURE__ */ _e(Fo, [["__scopeId", "data-v-4f6d05a9"]]), jo = { class: "wa-preview-root" }, Yo = { class: "wa-device" }, Ko = { class: "wa-screen" }, Go = { class: "wa-header" }, Jo = { class: "wa-titleblock" }, Xo = { class: "wa-title-row" }, Qo = { class: "wa-title" }, Zo = { class: "wa-subtitle" }, ei = {
  key: 0,
  class: "wa-flow-shell"
}, ti = { class: "wa-flow-header" }, ai = { class: "wa-flow-title" }, si = { class: "wa-flow-content" }, ni = { class: "wa-flow-eyebrow" }, li = {
  key: 0,
  class: "wa-flow-products"
}, oi = { class: "wa-flow-footer" }, ii = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, ri = { class: "wa-managed" }, di = {
  key: 1,
  class: "wa-thread"
}, ui = { class: "wa-secure-banner" }, ci = { class: "wa-msg wa-msg--in" }, pi = { class: "wa-template-card" }, mi = {
  key: 0,
  class: "wa-card-media"
}, vi = ["src"], bi = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, gi = ["src"], fi = { class: "wa-card-media-doc-icon" }, yi = ["title"], hi = {
  key: 3,
  class: "wa-card-media-fallback"
}, ki = { class: "wa-card-media-tag" }, _i = { class: "wa-card-media-sub" }, wi = {
  key: 1,
  class: "wa-card-header-text"
}, $i = ["innerHTML"], xi = {
  key: 2,
  class: "wa-link-preview"
}, Ci = { class: "wa-link-preview-head" }, Si = { class: "wa-link-preview-text" }, Ii = ["href"], Ai = {
  key: 3,
  class: "wa-inline-note"
}, Ti = {
  key: 4,
  class: "wa-inline-note"
}, Ui = {
  key: 5,
  class: "wa-inline-note"
}, Ri = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Li = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, Bi = {
  key: 8,
  class: "wa-product-list"
}, Pi = { class: "wa-product-name" }, Ei = { class: "wa-product-price" }, Oi = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Ni = {
  key: 10,
  class: "wa-template-actions"
}, Mi = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Vi = { class: "wa-order-card" }, Di = { class: "wa-order-card-top" }, Wi = ["src"], Hi = { type: "button" }, zi = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Fi = { class: "wa-document-card" }, qi = { class: "wa-document-file" }, ji = { class: "wa-document-icon" }, Yi = ["title"], Ki = { class: "wa-document-caption" }, Gi = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Ji = { class: "wa-voice-card" }, Xi = { class: "wa-voice-top" }, Qi = { class: "wa-voice-profile" }, Zi = ["src"], er = { class: "wa-voice-duration" }, tr = { class: "wa-voice-transcript" }, ar = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, sr = { class: "wa-contact-card" }, nr = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, lr = { class: "wa-location-card" }, or = { class: "wa-location-content" }, ir = { type: "button" }, rr = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, dr = { class: "wa-carousel-track" }, ur = { type: "button" }, cr = { class: "wa-msg wa-msg--out" }, pr = { class: "wa-bubble wa-bubble--out" }, mr = { class: "wa-bubble-author" }, vr = {
  key: 0,
  class: "wa-reaction"
}, br = { class: "wa-msg wa-msg--in" }, gr = { class: "wa-bubble wa-bubble--in" }, fr = /* @__PURE__ */ ke({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(n) {
    const d = n;
    function u(b) {
      return String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = y(() => {
      var R;
      const b = ((R = d.template) == null ? void 0 : R.body) ?? "";
      return u(b).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), k = y(() => d.template.templateName || "Ecoshop"), _ = y(() => "Business Account"), $ = y(() => d.template.format === "flow" || !!d.template.flow), S = y(() => {
      var b;
      return (b = d.template.buttons) == null ? void 0 : b[0];
    }), x = y(() => {
      var b, I;
      return ((b = S.value) == null ? void 0 : b.text) || ((I = d.template.flow) == null ? void 0 : I.ctaLabel) || "";
    }), U = y(() => d.template.buttons ?? []), V = y(() => {
      var b;
      return (((b = d.template.multiProduct) == null ? void 0 : b.length) ?? 0) > 0;
    }), q = y(() => (d.template.format || "text").toUpperCase()), H = y(() => {
      const b = d.template.header;
      return !b || b.type === "text" ? "" : b.type === "image" ? b.url || "Image" : b.type === "video" ? b.url || "Video" : b.filename || b.url || "Document";
    }), W = y(() => {
      const b = d.template.header;
      if (!(!b || b.type !== "image" || !b.url))
        return { backgroundImage: `url(${b.url})` };
    });
    function A(b) {
      if (!b) return "";
      try {
        const I = b.split("?")[0].split("#")[0], R = I.substring(I.lastIndexOf("/") + 1);
        return decodeURIComponent(R || "");
      } catch {
        return "";
      }
    }
    const oe = y(() => {
      const b = d.template.header;
      return !b || b.type !== "document" ? "" : b.filename || A(b.url) || "document.pdf";
    }), j = y(() => {
      const b = (d.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (b == null ? void 0 : b[0]) || "";
    });
    function D(b) {
      try {
        return new URL(b).hostname;
      } catch {
        return "example.com";
      }
    }
    const M = y(() => {
      const b = d.template.linkPreview;
      return !b && !j.value ? null : {
        title: (b == null ? void 0 : b.title) || "Link preview",
        description: (b == null ? void 0 : b.description) || "Preview from your WhatsApp template link.",
        domain: (b == null ? void 0 : b.domain) || (j.value ? D(j.value) : "example.com"),
        url: (b == null ? void 0 : b.url) || j.value || "#",
        thumbnail: (b == null ? void 0 : b.thumbnail) || ""
      };
    }), se = y(() => {
      var R, ne, X;
      const I = (X = (((R = d.template.documentCard) == null ? void 0 : R.filename) || ((ne = d.template.header) == null ? void 0 : ne.filename) || "").split(".").pop()) == null ? void 0 : X.trim().toUpperCase();
      return I ? I.slice(0, 4) : "DOC";
    });
    function ve(b, I) {
      return b === "phone_number" ? "wa-btn-icon--phone" : b === "url" ? "wa-btn-icon--external" : b === "copy_code" ? "wa-btn-icon--code" : b === "opt_out" || (I || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (I || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ge = y(() => {
      var b;
      return d.template.location || d.template.locationRequest ? "wa-side-icon--info" : ((b = d.template.header) == null ? void 0 : b.type) === "video" || d.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), me = y(() => {
      var I, R, ne;
      const b = d.template;
      return b.format === "flow" ? "Thanks, we received your preferences." : (I = b.auth) != null && I.code ? "Use the verification code and let us know if it works." : (R = b.coupon) != null && R.code ? `Your coupon ${b.coupon.code} is active now.` : b.limitedOffer ? `Great choice. This offer is valid until ${b.limitedOffer}.` : (ne = d.template.multiProduct) != null && ne.length ? `Here are ${d.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), Z = y(() => {
      var I, R;
      const b = d.template;
      return b.location ? b.location.name || b.location.address || `${b.location.lat}, ${b.location.lng}` : (I = b.auth) != null && I.code ? `Verification code: ${b.auth.code}` : (R = b.flow) != null && R.id ? `Flow ID: ${b.flow.id}` : b.templateLanguage ? `Template language: ${b.templateLanguage}` : `Category: ${b.templateCategory || "utility"} • Format: ${b.format || "text"}`;
    }), Y = y(() => {
      var R, ne;
      const b = d.template;
      if ((R = b.multiProduct) != null && R.length) return b.multiProduct.slice(0, 5).map((X) => X.name || "Product");
      if ((ne = b.buttons) != null && ne.length) return b.buttons.slice(0, 5).map((X) => X.text || "Option");
      const I = (b.body || "").split(/\n|\.|,/).map((X) => X.trim()).filter(Boolean).slice(0, 5);
      return I.length ? I : ["Option A", "Option B", "Option C"];
    });
    return (b, I) => {
      var R, ne, X, B, pe, ue, fe, ye, P, w, T, G, ee, re;
      return l(), o("div", jo, [
        e("div", Yo, [
          e("div", Ko, [
            I[30] || (I[30] = Fe('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Go, [
              I[7] || (I[7] = e("span", { class: "wa-back" }, "←", -1)),
              I[8] || (I[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Jo, [
                e("div", Xo, [
                  e("span", Qo, p(k.value), 1),
                  I[6] || (I[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Zo, p(_.value), 1)
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
            $.value ? (l(), o("div", ei, [
              I[14] || (I[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", ti, [
                I[10] || (I[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", ai, p(k.value), 1),
                I[11] || (I[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", si, [
                e("p", ni, p(n.template.body || "Please choose an option below."), 1),
                (l(!0), o(z, null, F(Y.value, (le, te) => (l(), o("div", {
                  key: `flow-opt-${te}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, p(le), 1),
                  e("span", {
                    class: ie(["wa-radio", { "wa-radio--on": te === 0 }])
                  }, null, 2)
                ]))), 128)),
                (R = n.template.multiProduct) != null && R.length ? (l(), o("div", li, [
                  (l(!0), o(z, null, F(n.template.multiProduct.slice(0, 3), (le, te) => (l(), o("div", {
                    key: te,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, p(le.name || "Product"), 1),
                      e("p", null, p(le.price || "Price on request"), 1)
                    ]),
                    I[12] || (I[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : h("", !0)
              ]),
              e("div", oi, [
                x.value ? (l(), o("button", ii, p(x.value), 1)) : h("", !0),
                e("p", ri, [
                  I[13] || (I[13] = J("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: I[0] || (I[0] = qe(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (l(), o("div", di, [
              I[29] || (I[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", ui, [
                I[15] || (I[15] = e("span", null, "●", -1)),
                I[16] || (I[16] = J(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: I[1] || (I[1] = qe(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", ci, [
                e("div", pi, [
                  n.template.header && n.template.header.type !== "text" ? (l(), o("div", mi, [
                    n.template.header.type === "image" && n.template.header.url ? (l(), o("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: n.template.header.url,
                      alt: "Header media"
                    }, null, 8, vi)) : n.template.header.type === "video" && n.template.header.url ? (l(), o("div", bi, [
                      e("video", {
                        src: n.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, gi),
                      I[17] || (I[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : n.template.header.type === "document" ? (l(), o("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: I[2] || (I[2] = qe(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", fi, p(se.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: oe.value
                      }, p(oe.value), 9, yi)
                    ])) : (l(), o("div", hi, [
                      e("div", ki, p(q.value) + " TEMPLATE", 1),
                      e("div", _i, p(H.value), 1),
                      W.value ? (l(), o("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: ce(W.value)
                      }, null, 4)) : h("", !0)
                    ]))
                  ])) : (ne = n.template.header) != null && ne.text ? (l(), o("div", wi, p(n.template.header.text), 1)) : h("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: m.value
                  }, null, 8, $i),
                  M.value ? (l(), o("div", xi, [
                    e("div", Ci, [
                      M.value.thumbnail ? (l(), o("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: ce({ backgroundImage: `url(${M.value.thumbnail})` })
                      }, null, 4)) : h("", !0),
                      e("div", Si, [
                        e("strong", null, p(M.value.title), 1),
                        e("p", null, p(M.value.description), 1),
                        e("span", null, p(M.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: M.value.url,
                      onClick: I[3] || (I[3] = qe(() => {
                      }, ["prevent"]))
                    }, p(M.value.url), 9, Ii)
                  ])) : h("", !0),
                  n.template.location ? (l(), o("div", Ai, " 📍 " + p(n.template.location.name || n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)) : h("", !0),
                  (X = n.template.coupon) != null && X.code ? (l(), o("div", Ti, [
                    I[18] || (I[18] = J(" Coupon: ", -1)),
                    e("strong", null, p(n.template.coupon.code), 1)
                  ])) : h("", !0),
                  (B = n.template.auth) != null && B.code ? (l(), o("div", Ui, [
                    I[19] || (I[19] = J(" Verification code: ", -1)),
                    e("strong", null, p(n.template.auth.code), 1)
                  ])) : h("", !0),
                  n.template.limitedOffer ? (l(), o("div", Ri, " Expires: " + p(n.template.limitedOffer), 1)) : h("", !0),
                  n.template.footer ? (l(), o("div", Li, p(n.template.footer), 1)) : h("", !0),
                  V.value ? (l(), o("div", Bi, [
                    (l(!0), o(z, null, F((pe = n.template.multiProduct) == null ? void 0 : pe.slice(0, 4), (le, te) => (l(), o("div", {
                      key: `prod-${te}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Pi, p(le.name || `Item ${te + 1}`), 1),
                      e("span", Ei, p(le.price || "-"), 1)
                    ]))), 128))
                  ])) : h("", !0),
                  x.value ? (l(), o("button", Oi, [
                    S.value ? (l(), o("span", {
                      key: 0,
                      class: ie(["wa-btn-icon", ve(S.value.type, S.value.value || S.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : h("", !0),
                    J(" " + p(x.value), 1)
                  ])) : h("", !0),
                  U.value.length > 1 ? (l(), o("div", Ni, [
                    (l(!0), o(z, null, F(U.value.slice(1, 4), (le, te) => (l(), o("button", {
                      key: `action-${te}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ie(["wa-btn-icon", ve(le.type, le.value || le.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      J(" " + p(le.text), 1)
                    ]))), 128))
                  ])) : h("", !0),
                  I[20] || (I[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ie(["wa-side-icon", ge.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              n.template.orderCard ? (l(), o("div", Mi, [
                e("div", Vi, [
                  e("div", Di, [
                    n.template.orderCard.image ? (l(), o("img", {
                      key: 0,
                      src: n.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Wi)) : h("", !0),
                    e("div", null, [
                      e("strong", null, p(n.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, p(n.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Hi, p(n.template.orderCard.buttonLabel || "View"), 1),
                  I[21] || (I[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : h("", !0),
              n.template.documentCard || ((ue = n.template.header) == null ? void 0 : ue.type) === "document" ? (l(), o("div", zi, [
                e("div", Fi, [
                  e("div", qi, [
                    e("span", ji, p(se.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((fe = n.template.documentCard) == null ? void 0 : fe.filename) || ((ye = n.template.header) == null ? void 0 : ye.filename) || "document.pdf"
                      }, p(((P = n.template.documentCard) == null ? void 0 : P.filename) || ((w = n.template.header) == null ? void 0 : w.filename) || "document.pdf"), 9, Yi),
                      e("p", null, p(((T = n.template.documentCard) == null ? void 0 : T.size) || "243 KB • html"), 1)
                    ]),
                    I[22] || (I[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ki, p(((G = n.template.documentCard) == null ? void 0 : G.caption) || n.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : h("", !0),
              n.template.voiceNote ? (l(), o("div", Gi, [
                e("div", Ji, [
                  e("div", Xi, [
                    I[24] || (I[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    I[25] || (I[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Qi, [
                      n.template.voiceNote.profileImage ? (l(), o("img", {
                        key: 0,
                        src: n.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Zi)) : h("", !0),
                      I[23] || (I[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", er, p(n.template.voiceNote.duration || "0:10"), 1),
                  e("p", tr, p(n.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : h("", !0),
              n.template.contactCard ? (l(), o("div", ar, [
                e("div", sr, [
                  e("strong", null, p(n.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, p(n.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, p(n.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, p(n.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, p(n.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : h("", !0),
              n.template.location && n.template.locationRequest ? (l(), o("div", nr, [
                e("div", lr, [
                  I[26] || (I[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", or, [
                    e("strong", null, p(n.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: I[4] || (I[4] = qe(() => {
                      }, ["prevent"]))
                    }, p(n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)
                  ]),
                  e("button", ir, p(n.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : h("", !0),
              (ee = n.template.carouselCards) != null && ee.length ? (l(), o("div", rr, [
                e("div", dr, [
                  (l(!0), o(z, null, F(n.template.carouselCards.slice(0, 4), (le, te) => (l(), o("article", {
                    key: `c-${te}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: ce(le.image ? { backgroundImage: `url(${le.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, p(le.title || `Card ${te + 1}`), 1),
                    e("p", null, p(le.description || "Card description"), 1),
                    e("button", ur, p(le.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              e("div", cr, [
                e("div", pr, [
                  e("span", mr, p(k.value), 1),
                  e("p", null, p(me.value), 1),
                  I[27] || (I[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  n.template.reactionEmoji ? (l(), o("span", vr, p(n.template.reactionEmoji), 1)) : h("", !0)
                ])
              ]),
              e("div", br, [
                e("div", gr, [
                  e("p", null, p(Z.value), 1),
                  (re = n.template.flow) != null && re.id ? (l(), o("a", {
                    key: 0,
                    href: "#",
                    onClick: I[5] || (I[5] = qe(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + p(n.template.flow.id), 1)) : h("", !0),
                  I[28] || (I[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            I[31] || (I[31] = Fe('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), yr = /* @__PURE__ */ _e(fr, [["__scopeId", "data-v-244c945a"]]), hr = { class: "keos-whatsapp-builder" }, kr = { class: "kb-builder-top" }, _r = { class: "kb-wa-layout" }, wr = { class: "kb-wa-sidebar" }, $r = {
  key: 0,
  class: "kb-wa-form"
}, xr = { class: "kb-wa-form-head" }, Cr = { class: "kb-wa-form-head-top" }, Sr = { class: "kb-wa-health-pill" }, Ir = { class: "kb-wa-form-head-row" }, Ar = ["value"], Tr = { class: "kb-wa-health" }, Ur = { class: "kb-wa-health-row" }, Rr = { class: "kb-wa-health-value" }, Lr = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Br = { class: "kb-wa-canvas" }, Pr = {
  key: 0,
  class: "kb-wa-test-banner"
}, Er = { class: "kb-wa-preview-chrome" }, Or = { class: "kb-push-preview-controls" }, Nr = { class: "kb-push-preview-as" }, Mr = ["value"], Vr = { class: "kb-preview-status" }, Dr = { class: "kb-wa-actions" }, Wr = {
  key: 0,
  class: "kb-actions-note"
}, Hr = { key: 0 }, zr = { class: "kb-wa-actions-right" }, Fr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, qr = { class: "kb-confirm-dialog" }, jr = { class: "kb-confirm-actions" }, _t = 60, wt = 1024, $t = 60, xt = 10, Ct = 10, Yr = /* @__PURE__ */ ke({
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
  setup(n, { emit: d }) {
    const u = /* @__PURE__ */ new Set(["image", "video", "document"]), m = /* @__PURE__ */ new Set([
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
    function _(t) {
      const s = {
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
        Object.entries(s).filter(([g, v]) => m.has(g) ? !0 : k(v))
      );
    }
    function $(t) {
      const s = { ...t }, g = String(s.template_type ?? "text").trim().toLowerCase(), v = String(s.header_type ?? "none").trim().toLowerCase();
      u.has(g) || u.has(v) || (s.media_url = void 0, s.media_caption = void 0, s.document_filename = void 0, s.document_size = void 0), g !== "carousel" && (s.cards = void 0), g !== "catalog" && g !== "mpm" && (s.products = void 0), g !== "flow" && (s.flow_id = void 0, s.flow_cta_label = void 0), g !== "lto" && (s.lto_expiry = void 0), g !== "auth" && (s.auth_type = void 0, s.auth_label = void 0, s.auth_code = void 0, s.otp_code = void 0), g !== "document" && v !== "document" && (s.document_filename = void 0, s.document_size = void 0), g !== "location" && (s.location = void 0);
      const C = Array.isArray(s.buttons) ? s.buttons : [];
      return s.buttons = C, s;
    }
    function S(t) {
      var E, N, K, Ae, Re;
      const s = [], g = t.message, v = (g.template_category ?? "").toString().trim(), O = (g.template_type ?? "text").toString(), C = (g.header_type ?? "none").toString(), c = (g.header ?? "").toString(), i = (g.body ?? "").toString(), a = (g.footer ?? "").toString(), L = Array.isArray(g.buttons) ? g.buttons : [], r = Array.isArray(g.cards) ? g.cards : [];
      return (E = t.name) != null && E.trim() || s.push("Template name is required"), (N = g.template_name) != null && N.trim() || s.push("WhatsApp template name is required"), v || s.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), i.trim() || s.push("Body is required"), C === "text" && c.length > _t && s.push(`Header text cannot exceed ${_t} characters`), i.length > wt && s.push(`Body cannot exceed ${wt} characters`), a.length > $t && s.push(`Footer cannot exceed ${$t} characters`), L.length > xt && s.push(`Buttons cannot exceed ${xt}`), (O === "image" || O === "video" || O === "document" || C === "image" || C === "video" || C === "document") && !g.media_url && s.push("Media URL is required for rich media templates"), v === "authentication" && O !== "auth" && s.push("Authentication category must use Authentication format"), O === "auth" && !((K = g.auth_label) != null && K.trim()) && !i.includes("{{") && s.push("Authentication templates should include a code label or placeholder variable"), O === "lto" && !g.lto_expiry && s.push("Limited-time offer requires an expiry"), (O === "mpm" || O === "catalog") && !((Ae = g.products) != null && Ae.length) && s.push("Catalog and multi-product templates require at least one product"), O === "flow" && !((Re = g.flow_id) != null && Re.trim()) && s.push("WhatsApp Flow format requires a flow ID"), O === "carousel" && (r.length ? r.length > Ct && s.push(`Carousel supports up to ${Ct} cards`) : s.push("Carousel format requires at least one card")), s;
    }
    function x(t, s, g) {
      const v = t.message, O = String(v.template_category ?? "").trim(), C = String(v.template_type ?? "text").trim(), c = [];
      return O && s.includes(O) && c.push(`WhatsApp category "${O}" is disabled in this builder configuration`), C && g.includes(C) && c.push(`WhatsApp format "${C}" is disabled in this builder configuration`), c;
    }
    const U = n;
    function V(t) {
      if (!t) return {};
      const s = t.metaTemplate ?? t.metaWhatsApp, g = Array.isArray(s == null ? void 0 : s.components) ? (s == null ? void 0 : s.components).find((N) => (N == null ? void 0 : N.type) === "BODY") : void 0, v = Array.isArray(s == null ? void 0 : s.components) ? (s == null ? void 0 : s.components).find((N) => (N == null ? void 0 : N.type) === "FOOTER") : void 0, O = Array.isArray(s == null ? void 0 : s.components) ? (s == null ? void 0 : s.components).find((N) => (N == null ? void 0 : N.type) === "HEADER") : void 0, C = String(t.content ?? "").trim(), c = String(t.elementName ?? "").trim(), i = String(t.languageCode ?? "").trim(), a = String(t.category ?? "").trim().toLowerCase(), L = String(t.templateType ?? "").trim().toLowerCase(), r = String(t.footer ?? "").trim(), E = String(t.header ?? "").trim();
      return {
        ...t,
        ...c && !t.template_name ? { template_name: c } : {},
        ...i && !t.template_language ? { template_language: i } : {},
        ...a && !t.template_category ? { template_category: a } : {},
        ...L && !t.template_type ? { template_type: L } : {},
        ...C && !t.body ? { body: C } : {},
        ...r && !t.footer ? { footer: r } : {},
        ...E && !t.header ? { header: E } : {},
        ...!t.body && (g != null && g.text) ? { body: String(g.text) } : {},
        ...!t.footer && (v != null && v.text) ? { footer: String(v.text) } : {},
        ...!t.header && (O != null && O.text) ? { header: String(O.text) } : {}
      };
    }
    function q(t) {
      if (!t) return t;
      const s = V(t.message);
      return { ...t, message: s };
    }
    const H = d;
    function W(t) {
      var g;
      const s = mt(t, {
        exampleData: (g = we.value) == null ? void 0 : g.data
      });
      return {
        ...t,
        message: _(s.payload)
      };
    }
    const {
      campaign: A,
      dirty: oe,
      customValidatorErrors: j,
      getValidationWithWarnings: D,
      update: M,
      updateMessage: se,
      undo: ve,
      redo: ge,
      canUndo: me,
      canRedo: Z,
      resetMessage: Y,
      hooks: b
    } = Xe({
      initial: q(U.modelValue),
      hooks: {
        ...U.hooks,
        customValidators: async (t) => {
          var v;
          const s = [
            ...S(t),
            ...x(
              t,
              U.disabledTemplateCategories,
              U.disabledTemplateFormats
            )
          ], g = (v = U.hooks) != null && v.customValidators ? await U.hooks.customValidators(t) : [];
          return [...s, ...g];
        }
      },
      onDirty: () => H("change", W(A.value))
    }), { lastSavedAt: I } = Qe(A, { channel: "whatsapp" });
    function R(t) {
      (t.metaKey || t.ctrlKey) && t.key === "z" && (t.preventDefault(), t.shiftKey ? ge() : ve());
    }
    je(() => {
      window.addEventListener("keydown", R);
    }), Ye(() => {
      window.removeEventListener("keydown", R);
    }), xe(A, (t) => H("update:modelValue", W(t)), {
      deep: !0
    });
    const ne = ae(), X = ae(!0);
    async function B() {
      if (b.estimateReach)
        try {
          ne.value = await b.estimateReach(A.value.audience);
        } catch {
          ne.value = void 0;
        }
      b.canSend && (X.value = await Promise.resolve(b.canSend()));
    }
    B(), xe(() => A.value.audience, B, { deep: !0 });
    const pe = y(() => (j.value, D(ne.value))), ue = y(() => pe.value.blockingErrors), fe = y(() => pe.value.warnings), ye = y(() => pe.value.valid), P = y(() => {
      var v, O, C;
      const t = A.value.message, s = [
        !!((v = t.template_name) != null && v.trim()),
        !!((O = t.template_category) != null && O.trim()),
        !!(t.body ?? "").toString().trim(),
        !!((C = t.template_language) != null && C.trim()),
        Array.isArray(t.buttons) ? t.buttons.length > 0 : !1
      ], g = s.filter(Boolean).length;
      return Math.round(g / s.length * 100);
    }), w = y(() => P.value >= 90 ? "Production ready" : P.value >= 70 ? "Strong draft" : P.value >= 40 ? "In progress" : "Needs setup"), T = y(() => {
      const t = A.value.message;
      return !!((t.body ?? "").toString().trim() || (t.header ?? "").toString().trim() || t.media_url || t.flow_id || t.coupon_code || t.lto_expiry || t.voice_transcript || t.contact_name || t.link_title || t.order_title || Array.isArray(t.buttons) && t.buttons.length || Array.isArray(t.products) && t.products.length || Array.isArray(t.cards) && t.cards.length);
    }), G = ae(""), ee = ae(!1), re = ae(null), le = y(
      () => new Set((U.disabledTemplateCategories ?? []).map((t) => String(t).trim().toLowerCase()))
    ), te = y(
      () => new Set((U.disabledTemplateFormats ?? []).map((t) => String(t).trim().toLowerCase()))
    ), he = y(
      () => Yn.filter((t) => {
        var O;
        const s = ((O = t.campaign) == null ? void 0 : O.message) ?? {}, g = String(s.template_category ?? "").trim().toLowerCase(), v = String(s.template_type ?? "").trim().toLowerCase();
        return !(g && le.value.has(g) || v && te.value.has(v));
      })
    ), we = y(() => {
      const t = G.value;
      return t ? He.find((s) => s.id === t) ?? null : null;
    }), Ce = y(() => {
      const t = A.value.message.body ?? "";
      return we.value ? Ve(t, we.value.data) : t;
    }), Ue = y(() => {
      const t = A.value.message.header ?? "";
      return we.value ? Ve(t, we.value.data) : t;
    }), Ne = y(() => {
      var N;
      const t = A.value.message, s = t.template_type ?? "text", g = t.header_type ?? "none";
      let v, O, C, c, i, a, L;
      (s === "image" || g === "image") && t.media_url ? v = { type: "image", url: t.media_url } : (s === "video" || g === "video") && t.media_url ? v = { type: "video", url: t.media_url } : s === "document" || g === "document" ? v = {
        type: "document",
        url: t.media_url || void 0,
        filename: t.document_filename || t.media_url || "document.pdf"
      } : g === "text" && t.header ? v = { type: "text", text: Ue.value } : t.header && (v = { type: "text", text: Ue.value });
      const r = Ce.value || "Start adding content to see a live preview here.";
      if (s === "location" && t.location) {
        const K = t.location, Ae = K.lat ?? K.latitude, Re = K.lng ?? K.lon ?? K.longitude;
        Ae != null && Re != null && (O = {
          lat: Ae,
          lng: Re,
          name: K.name ?? K.title,
          address: K.address ?? `${Ae}, ${Re}`
        });
      }
      (s === "catalog" || s === "mpm") && Array.isArray(t.products) && t.products.length && (C = !0, c = t.products.map((K) => ({
        image: K.image ?? K.imageUrl,
        name: K.name ?? K.sectionTitle ?? K.title ?? "Product",
        price: K.price ?? K.productId ?? ""
      }))), s === "carousel" && Array.isArray(t.cards) && t.cards.length && (C = !0, c = t.cards.map((K) => ({
        image: K.image ?? K.media_url,
        name: K.title ?? "Card",
        price: K.button_label ?? ""
      }))), s === "coupon" && t.coupon_code && (i = { code: t.coupon_code }), s === "lto" && t.lto_expiry && (a = t.lto_expiry), s === "auth" && (L = { code: t.auth_code ?? t.otp_code ?? "123 456" });
      const E = t.buttons ?? [];
      return s === "flow" && ((N = t.flow_cta_label) != null && N.trim()) && E.push({
        label: t.flow_cta_label
      }), {
        format: s,
        templateName: t.template_name || void 0,
        templateLanguage: t.template_language || void 0,
        templateCategory: t.template_category || void 0,
        header: v,
        body: r,
        mediaCaption: t.media_caption || void 0,
        footer: t.footer || void 0,
        buttons: E.map((K) => ({ text: K.label || "Button", type: K.type, value: K.value })),
        location: O,
        catalog: C,
        multiProduct: c,
        coupon: i,
        limitedOffer: a,
        auth: L,
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
        documentCard: t.document_filename || s === "document" || g === "document" ? {
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
        carouselCards: s === "carousel" && Array.isArray(t.cards) ? t.cards.map((K) => ({
          title: K.title || void 0,
          description: K.description || t.body || void 0,
          image: K.media_url || void 0,
          button: K.button_label || void 0
        })) : void 0,
        reactionEmoji: t.reaction_emoji || void 0,
        flow: s === "flow" ? {
          id: t.flow_id || void 0,
          ctaLabel: t.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Se(t) {
      var v;
      const s = A.value, g = $({
        ...t.campaign.message ? t.campaign.message : s.message,
        template_name: ((v = t.campaign.message) == null ? void 0 : v.template_name) ?? t.campaign.name ?? s.name ?? void 0
      });
      M({
        ...t.campaign,
        message: g
      }), re.value = null, ee.value = !1;
    }
    function Le(t) {
      const s = t.target.value;
      if (!s) return;
      const g = he.value.find((v) => v.id === s);
      g && (oe.value ? (re.value = g, ee.value = !0) : Se(g), t.target.value = "");
    }
    function Be(t) {
      M({
        name: t,
        message: { ...A.value.message, template_name: t || void 0 },
        tracking: { ...A.value.tracking ?? {}, campaign_name: t }
      });
    }
    function Pe(t) {
      const s = A.value.message, g = $({
        ...s,
        ...t ?? {}
      });
      if (se(g), Object.prototype.hasOwnProperty.call(t ?? {}, "template_name")) {
        const v = String((t == null ? void 0 : t.template_name) ?? "");
        v !== A.value.name && M({
          name: v,
          tracking: {
            ...A.value.tracking ?? {},
            campaign_name: v
          }
        });
      }
    }
    xe(
      () => A.value.name,
      (t) => {
        const s = String(A.value.message.template_name ?? "");
        (t || "") !== s && se({ template_name: t || void 0 });
      },
      { immediate: !0 }
    );
    function Ie(t) {
      const s = ` {{ .${t.variable} }}`, g = A.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...g, t.variable]));
      if (t.field === "title") {
        const O = A.value.message.header ?? "";
        se({
          variables: v,
          header: O + s
        });
      } else if (t.field === "footer") {
        const O = A.value.message.footer ?? "";
        se({
          variables: v,
          footer: O + s
        });
      } else {
        const O = A.value.message.body ?? "";
        se({
          variables: v,
          body: O + s
        });
      }
    }
    function Q() {
      var g;
      if (!ye.value) return;
      const t = mt(A.value, {
        exampleData: (g = we.value) == null ? void 0 : g.data
      }), s = W(A.value);
      H("save-gupshup-template", t.payload, t.warnings, s), H("save", s);
    }
    return (t, s) => {
      var g;
      return l(), o("div", hr, [
        e("div", kr, [
          $e(Ze, {
            "campaign-name": f(A).name,
            status: f(A).status,
            dirty: f(oe),
            "last-saved-at": f(I),
            "can-undo": f(me),
            "can-redo": f(Z),
            "slugify-name": U.enforceSlugName,
            "onUpdate:campaignName": Be,
            onUndo: f(ve),
            onRedo: f(ge)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ue.value.length > 0 ? (l(), o("div", {
            key: 0,
            class: "kb-errors",
            style: ce({
              background: f(be).dangerBg,
              border: `1px solid ${f(be).dangerBorder}`,
              borderRadius: `${f(De).input}px`,
              padding: `${f(de)[12]}px ${f(de)[16]}px`,
              marginBottom: `${f(de)[16]}px`
            })
          }, [
            e("ul", {
              style: ce({ margin: 0, paddingLeft: "1.25rem", color: f(be).danger })
            }, [
              (l(!0), o(z, null, F(ue.value, (v) => (l(), o("li", {
                key: v.message
              }, p(v.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", _r, [
          e("aside", wr, [
            n.disabledSections.includes("whatsapp") ? h("", !0) : (l(), o("div", $r, [
              e("div", xr, [
                e("div", Cr, [
                  s[6] || (s[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Sr, p(w.value), 1)
                ]),
                e("div", Ir, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: Le
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (l(!0), o(z, null, F(he.value, (v) => (l(), o("option", {
                      key: v.id,
                      value: v.id
                    }, p(v.label), 9, Ar))), 128))
                  ], 32)
                ]),
                e("div", Tr, [
                  e("div", Ur, [
                    s[8] || (s[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", Rr, p(P.value) + "%", 1)
                  ]),
                  e("div", Lr, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: ce({ width: `${P.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              $e(qo, {
                message: f(A).message,
                "show-reset": !0,
                "disabled-categories": n.disabledTemplateCategories,
                "disabled-formats": n.disabledTemplateFormats,
                onUpdate: Pe,
                onReset: s[0] || (s[0] = (v) => f(Y)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              $e(Et, {
                message: f(A).message,
                "variable-options": n.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: f(se),
                onInsertVariable: Ie
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Br, [
            !n.designOnly && f(A).audience.test_mode ? (l(), o("div", Pr, [...s[9] || (s[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              J(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", Er, [
              e("div", Or, [
                e("label", Nr, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (v) => G.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (l(!0), o(z, null, F(f(He), (v) => (l(), o("option", {
                      key: v.id,
                      value: v.id
                    }, p(v.label), 9, Mr))), 128))
                  ], 512), [
                    [Oe, G.value]
                  ])
                ]),
                e("div", Vr, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, p(f(A).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: ie(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !T.value }])
              }, [
                $e(yr, { template: Ne.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Dr, [
          fe.value.length > 0 ? (l(), o("div", Wr, [
            s[13] || (s[13] = e("strong", null, "Warning:", -1)),
            J(" " + p((g = fe.value[0]) == null ? void 0 : g.message) + " ", 1),
            fe.value.length > 1 ? (l(), o("span", Hr, " (+" + p(fe.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", zr, [
            n.showDuplicate ? (l(), o("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: s[2] || (s[2] = (v) => H("duplicate", JSON.parse(JSON.stringify(f(A)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (l(), o("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: Q
            }, " Save ")) : h("", !0),
            n.showClose ? (l(), o("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: s[3] || (s[3] = (v) => H("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        ee.value ? (l(), o("div", Fr, [
          e("div", qr, [
            s[14] || (s[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[15] || (s[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", jr, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: s[4] || (s[4] = (v) => {
                  ee.value = !1, re.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: s[5] || (s[5] = (v) => re.value && Se(re.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Mt = /* @__PURE__ */ _e(Yr, [["__scopeId", "data-v-79c11b0a"]]), Kr = { class: "kb-section" }, Gr = { class: "kb-section__head" }, Jr = { class: "kb-field" }, Xr = ["value"], Qr = { class: "kb-field" }, Zr = { class: "kb-label" }, ed = { key: 0 }, td = { key: 1 }, ad = { key: 2 }, sd = ["value"], nd = {
  key: 0,
  class: "kb-truncation-hint"
}, ld = { class: "kb-field" }, od = { class: "kb-insert-row" }, id = ["value"], rd = { class: "kb-field" }, dd = { class: "kb-insert-row" }, ud = /* @__PURE__ */ ke({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: d }) {
    const u = n, m = d, k = ["first_name", "last_name", "order_id", "city"], _ = ae(u.variableOptions && u.variableOptions.length ? [...u.variableOptions] : k), $ = ae(_.value[0] ?? k[0]), S = ae("");
    xe(
      () => u.variableOptions,
      (j) => {
        j && j.length && (_.value = [...j], _.value.includes($.value) || ($.value = _.value[0]));
      }
    );
    const x = y(() => u.message.body ?? ""), U = y(() => x.value.length), V = y(() => U.value ? U.value <= 160 ? 1 : Math.ceil(U.value / 153) : 0), q = y(() => {
      const j = U.value;
      return j <= 160 ? null : j <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function H(j) {
      const D = j.target.value;
      m("update", {
        sender_id: D || void 0
      });
    }
    function W(j) {
      const D = j.target.value;
      m("update", {
        body: D
      });
    }
    function A() {
      const j = $.value;
      if (!j) return;
      const D = ` {{ .${j} }}`, M = x.value || "", se = u.message.variables ?? [], ve = Array.from(/* @__PURE__ */ new Set([...se, j]));
      m("update", {
        body: M + D,
        variables: ve
      });
    }
    function oe() {
      const j = S.value.trim();
      j && (_.value.includes(j) || (_.value = [..._.value, j]), $.value = j, S.value = "");
    }
    return (j, D) => (l(), o("section", Kr, [
      e("div", Gr, [
        D[3] || (D[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        n.showReset ? (l(), o("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: D[0] || (D[0] = (M) => j.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      D[10] || (D[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Jr, [
        D[4] || (D[4] = e("label", { class: "kb-label" }, [
          J(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: u.message.sender_id ?? "",
          onInput: H
        }, null, 40, Xr)
      ]),
      e("div", Qr, [
        e("label", Zr, [
          D[5] || (D[5] = J(" Message body ", -1)),
          e("span", {
            class: ie(["kb-counter", { "kb-counter--warn": V.value > 3 }])
          }, [
            J(p(U.value) + " chars · ", 1),
            V.value === 0 ? (l(), o("span", ed, "0 segments")) : V.value === 1 ? (l(), o("span", td, "1 segment")) : (l(), o("span", ad, p(V.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
          value: x.value,
          onInput: W
        }, null, 40, sd),
        D[6] || (D[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        q.value ? (l(), o("p", nd, p(q.value), 1)) : h("", !0)
      ]),
      e("div", ld, [
        D[7] || (D[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", od, [
          Te(e("select", {
            "onUpdate:modelValue": D[1] || (D[1] = (M) => $.value = M),
            class: "kb-select"
          }, [
            (l(!0), o(z, null, F(_.value, (M) => (l(), o("option", {
              key: M,
              value: M
            }, p(M), 9, id))), 128))
          ], 512), [
            [Oe, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: A
          }, " Insert into message ")
        ]),
        D[8] || (D[8] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", rd, [
        D[9] || (D[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", dd, [
          Te(e("input", {
            "onUpdate:modelValue": D[2] || (D[2] = (M) => S.value = M),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [lt, S.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: oe
          }, " Add ")
        ])
      ])
    ]));
  }
}), cd = /* @__PURE__ */ _e(ud, [["__scopeId", "data-v-f44c4aab"]]), pd = { class: "keos-sms-builder" }, md = { class: "kb-builder-top" }, vd = { class: "kb-sms-layout" }, bd = { class: "kb-sms-sidebar" }, gd = {
  key: 0,
  class: "kb-sms-form"
}, fd = { class: "kb-sms-form-head" }, yd = { class: "kb-sms-form-head-top" }, hd = { class: "kb-sms-health-pill" }, kd = { class: "kb-wa-form-head-row" }, _d = ["value"], wd = { class: "kb-sms-health" }, $d = { class: "kb-sms-health-row" }, xd = { class: "kb-sms-health-value" }, Cd = { class: "kb-sms-health-bar" }, Sd = { class: "kb-sms-canvas" }, Id = {
  key: 0,
  class: "kb-sms-test-banner"
}, Ad = { class: "kb-sms-preview-chrome" }, Td = { class: "kb-push-preview-controls" }, Ud = { class: "kb-push-preview-as" }, Rd = ["value"], Ld = { class: "kb-preview-status" }, Bd = { class: "kb-preview" }, Pd = { class: "kb-sms-preview" }, Ed = { class: "kb-sms-phone" }, Od = { class: "kb-sms-header" }, Nd = { class: "kb-sms-sender-avatar" }, Md = { class: "kb-sms-header-copy" }, Vd = { class: "kb-sms-sender" }, Dd = { class: "kb-sms-meta" }, Wd = { class: "kb-sms-thread" }, Hd = {
  key: 0,
  class: "kb-sms-empty"
}, zd = { class: "kb-sms-text" }, Fd = { class: "kb-sms-bubble-meta" }, qd = {
  key: 0,
  class: "kb-sms-segment-chip"
}, jd = {
  key: 0,
  class: "kb-sms-more-segments"
}, Yd = { class: "kb-sms-delivery-line" }, Kd = { class: "kb-sms-counter" }, Gd = { key: 0 }, Jd = { key: 1 }, Xd = { key: 2 }, Qd = {
  key: 3,
  class: "kb-sms-cost"
}, Zd = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, eu = { class: "kb-sms-actions" }, tu = {
  key: 0,
  class: "kb-actions-note"
}, au = { key: 0 }, su = { class: "kb-sms-actions-right" }, nu = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, lu = { class: "kb-confirm-dialog" }, ou = { class: "kb-confirm-actions" }, iu = /* @__PURE__ */ ke({
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
  setup(n, { emit: d }) {
    const u = n, m = d, {
      campaign: k,
      dirty: _,
      customValidatorErrors: $,
      getValidationWithWarnings: S,
      update: x,
      updateMessage: U,
      undo: V,
      redo: q,
      canUndo: H,
      canRedo: W,
      resetMessage: A,
      hooks: oe
    } = Xe({
      initial: u.modelValue,
      hooks: {
        ...u.hooks,
        customValidators: async (Q) => {
          var g, v;
          const t = [];
          (g = Q.name) != null && g.trim() || t.push("Template name is required");
          const s = (v = u.hooks) != null && v.customValidators ? await u.hooks.customValidators(Q) : [];
          return [...t, ...s];
        }
      },
      onDirty: () => m("change", k.value)
    }), { lastSavedAt: j } = Qe(k, { channel: "sms" });
    function D(Q) {
      (Q.metaKey || Q.ctrlKey) && Q.key === "z" && (Q.preventDefault(), Q.shiftKey ? q() : V());
    }
    je(() => {
      window.addEventListener("keydown", D);
    }), Ye(() => {
      window.removeEventListener("keydown", D);
    }), xe(k, (Q) => m("update:modelValue", Q), { deep: !0 });
    const M = ae(), se = ae(!0);
    async function ve() {
      if (oe.estimateReach)
        try {
          M.value = await oe.estimateReach(k.value.audience);
        } catch {
          M.value = void 0;
        }
      oe.canSend && (se.value = await Promise.resolve(oe.canSend()));
    }
    ve(), xe(() => k.value.audience, ve, { deep: !0 });
    const ge = y(() => ($.value, S(M.value))), me = y(() => ge.value.blockingErrors), Z = y(() => ge.value.warnings), Y = y(() => ge.value.valid), b = y(() => {
      var g, v, O;
      const Q = k.value.message, t = [
        !!((g = k.value.name) != null && g.trim()),
        !!((v = Q.body) != null && v.trim()),
        !!((O = Q.sender_id) != null && O.trim()),
        !!k.value.template_type,
        (Q.body ?? "").length > 20
      ], s = t.filter(Boolean).length;
      return Math.round(s / t.length * 100);
    }), I = y(() => b.value >= 90 ? "Production ready" : b.value >= 70 ? "Strong draft" : b.value >= 40 ? "In progress" : "Needs setup"), R = y(() => !!G.value.trim()), ne = y(
      () => k.value.template_type ?? "transactional"
    ), X = ae(""), B = ae(!1), pe = ae(null), ue = y(() => {
      const Q = X.value;
      return Q ? He.find((t) => t.id === Q) ?? null : null;
    }), fe = y(() => {
      const Q = G.value;
      return ue.value ? Ve(Q, ue.value.data) : Q;
    });
    function ye(Q) {
      const t = k.value, s = Q.campaign.message ? { ...t.message, ...Q.campaign.message } : t.message;
      x({
        ...Q.campaign,
        message: s
      }), pe.value = null, B.value = !1;
    }
    function P(Q) {
      const t = Q.target.value;
      if (!t) return;
      const s = yt.find((g) => g.id === t);
      s && (_.value ? (pe.value = s, B.value = !0) : ye(s), Q.target.value = "");
    }
    function w(Q) {
      x({ template_type: Q });
    }
    function T(Q) {
      x({
        name: Q,
        tracking: { ...k.value.tracking ?? {}, campaign_name: Q }
      });
    }
    const G = y(
      () => (k.value.message.body ?? "") || ""
    ), ee = y(() => G.value.length), re = y(() => /[^\x00-\x7f]/.test(G.value)), le = y(() => re.value ? 70 : 160), te = y(() => re.value ? 67 : 153), he = y(() => ee.value ? ee.value <= le.value ? 1 : Math.ceil(ee.value / te.value) : 0), we = y(() => {
      const Q = fe.value.trim();
      if (!Q) return [];
      const t = he.value <= 1 ? le.value : te.value, s = [];
      for (let g = 0; g < Q.length; g += t)
        s.push(Q.slice(g, g + t));
      return s;
    }), Ce = y(() => we.value.slice(0, 3)), Ue = y(
      () => Math.max(0, we.value.length - Ce.value.length)
    ), Ne = y(() => re.value ? "Unicode" : "GSM-7"), Se = y(() => R.value ? he.value > 3 ? "Queued" : "Delivered" : "Draft"), Le = y(() => {
      const Q = u.costPerSegment ?? 0;
      return !Q || he.value === 0 ? null : (he.value * Q).toFixed(2);
    }), Be = y(() => {
      const Q = ee.value, t = le.value + te.value;
      return Q <= le.value ? null : Q <= t ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Pe = y(
      () => k.value.message.sender_id ?? "YourBrand"
    );
    function Ie() {
      Y.value && m("save", k.value);
    }
    return (Q, t) => {
      var s;
      return l(), o("div", pd, [
        e("div", md, [
          $e(Ze, {
            "campaign-name": f(k).name,
            status: f(k).status,
            dirty: f(_),
            "last-saved-at": f(j),
            "can-undo": f(H),
            "can-redo": f(W),
            "slugify-name": u.enforceSlugName,
            "onUpdate:campaignName": T,
            onUndo: f(V),
            onRedo: f(q)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          me.value.length > 0 ? (l(), o("div", {
            key: 0,
            class: "kb-errors",
            style: ce({
              background: f(be).dangerBg,
              border: `1px solid ${f(be).dangerBorder}`,
              borderRadius: `${f(De).input}px`,
              padding: `${f(de)[12]}px ${f(de)[16]}px`,
              marginBottom: `${f(de)[16]}px`
            })
          }, [
            e("ul", {
              style: ce({ margin: 0, paddingLeft: "1.25rem", color: f(be).danger })
            }, [
              (l(!0), o(z, null, F(me.value, (g) => (l(), o("li", {
                key: g.message
              }, p(g.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", vd, [
          e("aside", bd, [
            n.disabledSections.includes("sms") ? h("", !0) : (l(), o("div", gd, [
              e("div", fd, [
                e("div", yd, [
                  t[6] || (t[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", hd, p(I.value), 1)
                ]),
                e("div", kd, [
                  $e(ut, {
                    "template-type": ne.value,
                    onUpdate: w
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: P
                  }, [
                    t[7] || (t[7] = e("option", { value: "" }, "Presets…", -1)),
                    (l(!0), o(z, null, F(f(yt), (g) => (l(), o("option", {
                      key: g.id,
                      value: g.id
                    }, p(g.label), 9, _d))), 128))
                  ], 32)
                ]),
                e("div", wd, [
                  e("div", $d, [
                    t[8] || (t[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", xd, p(b.value) + "%", 1)
                  ]),
                  e("div", Cd, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: ce({ width: `${b.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              $e(cd, {
                message: f(k).message,
                "variable-options": n.variableOptions,
                "show-reset": !0,
                onUpdate: f(U),
                onReset: t[0] || (t[0] = (g) => f(A)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Sd, [
            !n.designOnly && f(k).audience.test_mode ? (l(), o("div", Id, [...t[9] || (t[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              J(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", Ad, [
              e("div", Td, [
                e("label", Ud, [
                  t[11] || (t[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": t[1] || (t[1] = (g) => X.value = g),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    t[10] || (t[10] = e("option", { value: "" }, "No substitution", -1)),
                    (l(!0), o(z, null, F(f(He), (g) => (l(), o("option", {
                      key: g.id,
                      value: g.id
                    }, p(g.label), 9, Rd))), 128))
                  ], 512), [
                    [Oe, X.value]
                  ])
                ]),
                e("div", Ld, [
                  t[12] || (t[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, p(he.value || 0), 1)
                ])
              ]),
              e("div", {
                class: ie(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !R.value }])
              }, [
                e("div", Bd, [
                  e("div", Pd, [
                    e("div", Ed, [
                      t[15] || (t[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Od, [
                        e("div", Nd, p(Pe.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Md, [
                          e("div", Vd, p(Pe.value), 1),
                          e("div", Dd, "Text message · " + p(Se.value), 1)
                        ])
                      ]),
                      e("div", Wd, [
                        R.value ? (l(), o(z, { key: 1 }, [
                          (l(!0), o(z, null, F(Ce.value, (g, v) => (l(), o("div", {
                            key: `${v}-${g.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", zd, p(g), 1),
                            e("span", Fd, [
                              t[13] || (t[13] = J(" 09:21 ", -1)),
                              Ce.value.length > 1 ? (l(), o("span", qd, "Part " + p(v + 1), 1)) : h("", !0)
                            ])
                          ]))), 128)),
                          Ue.value > 0 ? (l(), o("div", jd, " +" + p(Ue.value) + " more segments ", 1)) : h("", !0),
                          e("div", Yd, [
                            t[14] || (t[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            J(" " + p(Se.value), 1)
                          ])
                        ], 64)) : (l(), o("div", Hd, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Kd, [
                      J(p(ee.value) + " characters · ", 1),
                      he.value === 0 ? (l(), o("span", Gd, "0 segments")) : he.value === 1 ? (l(), o("span", Jd, "1 segment")) : (l(), o("span", Xd, p(he.value) + " segments", 1)),
                      J(" (" + p(le.value) + " chars single, " + p(te.value) + " multi-part · " + p(Ne.value) + ") ", 1),
                      Le.value !== null ? (l(), o("span", Qd, " · Est. " + p(Le.value), 1)) : h("", !0)
                    ]),
                    Be.value ? (l(), o("p", Zd, p(Be.value), 1)) : h("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", eu, [
          Z.value.length > 0 ? (l(), o("div", tu, [
            t[16] || (t[16] = e("strong", null, "Warning:", -1)),
            J(" " + p((s = Z.value[0]) == null ? void 0 : s.message) + " ", 1),
            Z.value.length > 1 ? (l(), o("span", au, " (+" + p(Z.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", su, [
            n.showDuplicate ? (l(), o("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: t[2] || (t[2] = (g) => m("duplicate", JSON.parse(JSON.stringify(f(k)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (l(), o("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Ie
            }, " Save ")) : h("", !0),
            n.showClose ? (l(), o("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: t[3] || (t[3] = (g) => m("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        B.value ? (l(), o("div", nu, [
          e("div", lu, [
            t[17] || (t[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            t[18] || (t[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", ou, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: t[4] || (t[4] = (g) => {
                  B.value = !1, pe.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: t[5] || (t[5] = (g) => pe.value && ye(pe.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Vt = /* @__PURE__ */ _e(iu, [["__scopeId", "data-v-5e442b56"]]), ru = 30, du = 60, uu = 130;
function cu(n) {
  const d = (n ?? "").trim().length;
  return d < ru ? "too_short" : d <= du ? "good" : "too_long";
}
function pu(n) {
  const d = (n ?? "").trim().length;
  return d === 0 ? "too_short" : d <= uu ? "good" : "too_long";
}
const mu = [
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
function St(n) {
  if (!n || typeof n != "string") return [];
  const d = [];
  for (const u of mu) {
    const m = n.match(u);
    m && d.push(m[0]);
  }
  return d;
}
function vu(n) {
  switch (n) {
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
function bu(n) {
  switch (n) {
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
const gu = { class: "em-section" }, fu = { class: "em-strip kb-section" }, yu = { class: "em-strip-head" }, hu = { class: "em-field kb-field" }, ku = ["value"], _u = { class: "em-field kb-field" }, wu = ["value"], $u = { class: "em-field kb-field" }, xu = ["value"], Cu = { class: "em-field kb-field" }, Su = { class: "em-input-group" }, Iu = ["value"], Au = { class: "em-var-picker-wrap" }, Tu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Uu = ["onClick"], Ru = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Lu = { class: "em-field kb-field" }, Bu = { class: "em-input-group" }, Pu = ["value"], Eu = { class: "em-var-picker-wrap" }, Ou = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Nu = ["onClick"], Mu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Vu = { class: "em-strip kb-section em-strip--library" }, Du = { class: "em-library-chips" }, Wu = ["onClick"], Hu = { class: "em-strip kb-section em-strip--blocks" }, zu = { class: "em-block-list" }, Fu = ["data-type"], qu = { class: "em-block-bar" }, ju = { class: "em-block-type" }, Yu = { class: "em-block-actions" }, Ku = ["disabled", "onClick"], Gu = ["disabled", "onClick"], Ju = ["onClick"], Xu = {
  key: 0,
  class: "em-block-fields"
}, Qu = ["value", "onChange"], Zu = ["value", "onInput"], ec = { class: "em-var-picker-wrap" }, tc = ["onClick"], ac = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, sc = ["onClick"], nc = {
  key: 1,
  class: "em-block-fields"
}, lc = ["value", "onInput"], oc = { class: "em-var-picker-wrap" }, ic = ["onClick"], rc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, dc = ["onClick"], uc = {
  key: 2,
  class: "em-block-fields"
}, cc = ["value", "onInput"], pc = ["value", "onInput"], mc = ["value", "onInput"], vc = {
  key: 3,
  class: "em-block-fields"
}, bc = ["value", "onInput"], gc = ["value", "onInput"], fc = { class: "em-block-fields--row" }, yc = ["value", "onInput"], hc = { class: "em-check-row" }, kc = ["checked", "onChange"], _c = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, wc = ["value", "onInput"], $c = {
  key: 5,
  class: "em-block-fields"
}, xc = ["value", "onInput"], Cc = ["value", "onInput"], Sc = ["value", "onInput"], Ic = { class: "em-var-picker-wrap" }, Ac = ["onClick"], Tc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Uc = ["onClick"], Rc = {
  key: 6,
  class: "em-block-fields"
}, Lc = ["value", "onChange"], Bc = { class: "em-list-items" }, Pc = ["value", "onInput", "placeholder"], Ec = ["onClick"], Oc = ["onClick"], Nc = {
  key: 7,
  class: "em-block-fields"
}, Mc = ["value", "onChange"], Vc = ["value", "onInput"], Dc = { class: "em-var-picker-wrap" }, Wc = ["onClick"], Hc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, zc = ["onClick"], Fc = {
  key: 8,
  class: "em-block-fields"
}, qc = { class: "em-social-links" }, jc = ["value", "onChange"], Yc = ["value", "onInput"], Kc = ["onClick"], Gc = ["onClick"], Jc = {
  key: 9,
  class: "em-block-fields"
}, Xc = ["value", "onInput"], Qc = ["value", "onInput"], Zc = ["value", "onInput"], ep = {
  key: 10,
  class: "em-block-fields"
}, tp = ["value", "onInput"], ap = { class: "em-link-list-items" }, sp = ["value", "onInput"], np = ["value", "onInput"], lp = ["onClick"], op = ["onClick"], ip = {
  key: 11,
  class: "em-block-fields"
}, rp = ["value", "onInput"], dp = { class: "em-var-picker-wrap" }, up = ["onClick"], cp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, pp = ["onClick"], mp = ["value", "onInput"], vp = { class: "em-var-picker-wrap" }, bp = ["onClick"], gp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, fp = ["onClick"], yp = {
  key: 12,
  class: "em-block-fields"
}, hp = { class: "em-block-fields--row" }, kp = ["value", "onInput"], _p = { class: "em-block-fields--row" }, wp = ["value", "onInput"], $p = ["value", "onChange"], xp = {
  key: 13,
  class: "em-block-fields"
}, Cp = ["value", "onChange"], Sp = { class: "em-inline-label" }, Ip = ["value", "onInput"], Ap = { class: "em-var-picker-wrap" }, Tp = ["onClick"], Up = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Rp = ["onClick"], Lp = {
  key: 14,
  class: "em-block-fields"
}, Bp = ["value", "onInput"], Pp = { class: "em-link-list-items" }, Ep = ["value", "onInput"], Op = ["value", "onInput"], Np = ["onClick"], Mp = ["onClick"], Vp = {
  key: 15,
  class: "em-block-fields"
}, Dp = ["value", "onInput"], Wp = ["value", "onInput"], Hp = ["onClick"], zp = ["onClick"], Fp = {
  key: 16,
  class: "em-block-fields"
}, qp = ["value", "onInput"], jp = ["value", "onInput"], Yp = ["value", "onInput"], Kp = ["onClick"], Gp = ["onClick"], Jp = {
  key: 17,
  class: "em-block-fields"
}, Xp = ["value", "onInput"], Qp = ["value", "onInput"], Zp = {
  key: 18,
  class: "em-block-fields"
}, em = ["value", "onInput"], tm = ["value", "onInput"], am = ["value", "onInput"], sm = ["value", "onInput"], nm = ["value", "onInput"], lm = {
  key: 19,
  class: "em-block-fields"
}, om = ["value", "onInput"], im = { class: "em-var-picker-wrap" }, rm = ["onClick"], dm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, um = ["onClick"], cm = {
  key: 20,
  class: "em-block-fields"
}, pm = ["value", "onInput"], mm = ["value", "onInput"], vm = { class: "em-var-picker-wrap" }, bm = ["onClick"], gm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, fm = ["onClick"], ym = {
  key: 21,
  class: "em-block-fields"
}, hm = ["value", "onInput"], km = { class: "em-block-fields--row" }, _m = ["value", "onInput"], wm = {
  key: 22,
  class: "em-block-fields"
}, $m = ["value", "onInput"], xm = ["value", "onInput"], Cm = ["value", "onInput"], Sm = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Im = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, Am = ["onClick"], Tm = ["onClick"], Um = ["onClick"], Rm = { class: "em-check-row" }, Lm = ["checked", "onChange"], Bm = { class: "em-add-bar kb-field kb-field--add-bar" }, Pm = { class: "em-add-bar-btns" }, Em = { class: "em-strip kb-section em-strip--personalize" }, Om = { class: "em-field kb-field" }, Nm = { class: "em-input-group" }, Mm = ["value"], Vm = { class: "em-field kb-field" }, Dm = { class: "em-input-group" }, Ee = "{{ .var }}", Wm = /* @__PURE__ */ ke({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: d }) {
    var C;
    function u() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const m = [
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
    function _(c) {
      switch (c) {
        case "heading":
          return { id: u(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: u(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: u(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: u(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: u(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: u(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: u(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: u(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: u(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: u(), type: "social", links: m.map((i) => ({ ...i })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: u(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: u(),
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
            id: u(),
            type: "columns",
            leftContent: "Left column text or {{ .variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: u(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: u(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: u(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: u(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: u(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: u(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: u(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: u(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ .order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: u(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: u(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: u(), type: "paragraph", content: "" };
      }
    }
    const $ = n, S = d, x = ["first_name", "last_name", "order_id", "city", "email"], U = ae(
      (C = $.variableOptions) != null && C.length ? [...$.variableOptions] : x
    ), V = ae(U.value[0] ?? "first_name"), q = ae("");
    xe(
      () => $.variableOptions,
      (c) => {
        c != null && c.length && (U.value = [...c], U.value.includes(V.value) || (V.value = U.value[0]));
      }
    );
    const H = y(() => $.message.subject ?? ""), W = y(() => $.message.preview_text ?? ""), A = y(() => cu(H.value)), oe = y(() => pu(W.value)), j = y(() => St(H.value)), D = y(() => St(W.value)), M = y(() => {
      const c = $.message.blocks;
      return Array.isArray(c) && c.length > 0 ? c : [_("paragraph")];
    });
    xe(
      () => $.message.blocks,
      (c) => {
        (!Array.isArray(c) || c.length === 0) && S("update", { blocks: [_("paragraph")] });
      },
      { immediate: !0 }
    );
    function se(c) {
      S("update", { blocks: c });
    }
    function ve(c) {
      S("update", { subject: c.target.value });
    }
    function ge(c) {
      const i = c.target.value;
      S("update", { preview_text: i || void 0 });
    }
    function me(c) {
      S("update", { from_name: c.target.value || void 0 });
    }
    function Z(c) {
      S("update", { from_address: c.target.value || void 0 });
    }
    function Y(c) {
      S("update", { reply_to: c.target.value || void 0 });
    }
    const b = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [_("heading"), _("paragraph"), _("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [_("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [_("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [_("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [_("social"), _("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [_("footer"), _("link_list")]
      }
    ];
    function I(c) {
      const i = c.blocks();
      se([...M.value, ...i]);
    }
    function R(c) {
      const i = [...M.value, _(c)];
      se(i);
    }
    function ne(c) {
      se(M.value.filter((i) => i.id !== c));
    }
    function X(c, i) {
      const a = M.value.findIndex((E) => E.id === c);
      if (a < 0) return;
      const L = i === "up" ? a - 1 : a + 1;
      if (L < 0 || L >= M.value.length) return;
      const r = [...M.value];
      [r[a], r[L]] = [r[L], r[a]], se(r);
    }
    function B(c, i) {
      const a = M.value.map((L) => L.id === c ? { ...L, ...i } : L);
      se(a);
    }
    function pe(c, i, a) {
      const L = M.value.find((E) => E.id === c);
      if (!L || L.type !== "list") return;
      const r = [...L.items || []];
      r[i] = a, B(c, { items: r });
    }
    function ue(c) {
      const i = M.value.find((a) => a.id === c);
      !i || i.type !== "list" || B(c, { items: [...i.items || [], "New item"] });
    }
    function fe(c, i) {
      const a = M.value.find((r) => r.id === c);
      if (!a || a.type !== "list") return;
      const L = (a.items || []).filter((r, E) => E !== i);
      B(c, { items: L });
    }
    function ye(c, i, a, L) {
      const r = M.value.find((N) => N.id === c);
      if (!r || r.type !== "social") return;
      const E = (r.links || []).map((N, K) => K === i ? { ...N, [a]: L } : N);
      B(c, { links: E });
    }
    function P(c) {
      const i = M.value.find((a) => a.id === c);
      !i || i.type !== "social" || B(c, { links: [...i.links || [], { platform: "custom", url: "" }] });
    }
    function w(c, i) {
      const a = M.value.find((r) => r.id === c);
      if (!a || a.type !== "social") return;
      const L = (a.links || []).filter((r, E) => E !== i);
      B(c, { links: L });
    }
    function T(c, i, a, L) {
      const r = M.value.find((N) => N.id === c);
      if (!r || r.type !== "link_list") return;
      const E = (r.links || []).map((N, K) => K === i ? { ...N, [a]: L } : N);
      B(c, { links: E });
    }
    function G(c) {
      const i = M.value.find((a) => a.id === c);
      !i || i.type !== "link_list" || B(c, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function ee(c, i) {
      const a = M.value.find((r) => r.id === c);
      if (!a || a.type !== "link_list") return;
      const L = (a.links || []).filter((r, E) => E !== i);
      B(c, { links: L });
    }
    function re(c, i) {
      const a = M.value.find((L) => L.id === c);
      if (!(!a || a.type !== "row")) {
        if (i.columnCount !== void 0 && i.columnCount !== a.columnCount) {
          const L = [...a.cells || []];
          for (; L.length < i.columnCount; ) L.push("Cell content");
          i.cells = L.slice(0, i.columnCount);
        }
        B(c, i);
      }
    }
    function le(c, i, a) {
      const L = M.value.find((E) => E.id === c);
      if (!L || L.type !== "row") return;
      const r = [...L.cells || []];
      r[i] = a, B(c, { cells: r });
    }
    function te(c, i, a, L) {
      const r = M.value.find((N) => N.id === c);
      if (!r || r.type !== "navbar") return;
      const E = (r.links || []).map((N, K) => K === i ? { ...N, [a]: L } : N);
      B(c, { links: E });
    }
    function he(c) {
      const i = M.value.find((a) => a.id === c);
      !i || i.type !== "navbar" || B(c, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function we(c, i) {
      const a = M.value.find((L) => L.id === c);
      !a || a.type !== "navbar" || B(c, { links: (a.links || []).filter((L, r) => r !== i) });
    }
    function Ce(c, i, a, L) {
      const r = M.value.find((N) => N.id === c);
      if (!r || r.type !== "accordion") return;
      const E = (r.items || []).map((N, K) => K === i ? { ...N, [a]: L } : N);
      B(c, { items: E });
    }
    function Ue(c) {
      const i = M.value.find((a) => a.id === c);
      !i || i.type !== "accordion" || B(c, { items: [...i.items || [], { title: "New section", content: "" }] });
    }
    function Ne(c, i) {
      const a = M.value.find((L) => L.id === c);
      !a || a.type !== "accordion" || B(c, { items: (a.items || []).filter((L, r) => r !== i) });
    }
    function Se(c, i, a, L) {
      const r = M.value.find((N) => N.id === c);
      if (!r || r.type !== "carousel") return;
      const E = (r.slides || []).map((N, K) => K === i ? { ...N, [a]: L } : N);
      B(c, { slides: E });
    }
    function Le(c) {
      const i = M.value.find((a) => a.id === c);
      !i || i.type !== "carousel" || B(c, { slides: [...i.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Be(c, i) {
      const a = M.value.find((L) => L.id === c);
      !a || a.type !== "carousel" || B(c, { slides: (a.slides || []).filter((L, r) => r !== i) });
    }
    function Pe(c, i = V.value) {
      const a = ` {{ .${i} }}`, L = $.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...L, i]));
      c === "subject" ? S("update", {
        subject: (H.value || "") + a,
        variables: r
      }) : S("update", {
        preview_text: (W.value || "") + a,
        variables: r
      });
    }
    function Ie(c, i = V.value) {
      const a = M.value.find((ze) => ze.id === c);
      if (!a || a.type !== "paragraph" && a.type !== "heading" && a.type !== "footer" && a.type !== "quote" && a.type !== "liquid" && a.type !== "code_block") return;
      const L = ` {{ .${i} }}`, r = $.message.variables ?? [], E = Array.from(/* @__PURE__ */ new Set([...r, i])), N = (a.type === "footer", "content"), Ae = (a[N] ?? "") + L, Re = M.value.map(
        (ze) => ze.id === c ? { ...ze, [N]: Ae } : ze
      );
      S("update", { blocks: Re, variables: E });
    }
    function Q(c, i, a = V.value) {
      const L = M.value.find((Ae) => Ae.id === c);
      if (!L || L.type !== "row") return;
      const r = ` {{ .${a} }}`, E = $.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...E, a])), K = [...L.cells || []];
      K[i] = (K[i] || "") + r, B(c, { cells: K }), S("update", { variables: N });
    }
    function t(c, i, a = V.value) {
      const L = M.value.find((ze) => ze.id === c);
      if (!L || L.type !== "columns") return;
      const r = ` {{ .${a} }}`, E = $.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...E, a])), K = i === "left" ? "leftContent" : "rightContent", Re = (L[K] ?? "") + r;
      B(c, { [K]: Re }), S("update", { variables: N });
    }
    const s = ae(null);
    function g(c) {
      s.value = s.value === c ? null : c;
    }
    function v(c, i) {
      if (i) {
        if (c === "subject") Pe("subject", i);
        else if (c === "preview") Pe("preview", i);
        else if (c.startsWith("block:")) Ie(c.slice(6), i);
        else if (c.startsWith("col-left:")) t(c.slice(9), "left", i);
        else if (c.startsWith("col-right:")) t(c.slice(10), "right", i);
        else if (c.startsWith("row:")) {
          const [, a, L] = c.split(":");
          Q(a, Number(L), i);
        }
        s.value = null;
      }
    }
    function O() {
      const c = q.value.trim();
      !c || U.value.includes(c) || (U.value = [...U.value, c], V.value = c, q.value = "");
    }
    return (c, i) => (l(), o("section", gu, [
      e("div", fu, [
        e("div", yu, [
          i[28] || (i[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          n.showReset ? (l(), o("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: i[0] || (i[0] = (a) => c.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        i[35] || (i[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", hu, [
          i[29] || (i[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: n.message.from_name ?? "",
            onInput: me
          }, null, 40, ku)
        ]),
        e("div", _u, [
          i[30] || (i[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: n.message.from_address ?? "",
            onInput: Z
          }, null, 40, wu)
        ]),
        e("div", $u, [
          i[31] || (i[31] = e("label", { class: "em-label" }, [
            J("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: n.message.reply_to ?? "",
            onInput: Y
          }, null, 40, xu)
        ]),
        e("div", Cu, [
          i[32] || (i[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Su, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: H.value,
              onInput: ve
            }, null, 40, Iu),
            e("div", Au, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[1] || (i[1] = (a) => g("subject")),
                title: "Insert variable"
              }, p(Ee)),
              s.value === "subject" ? (l(), o("div", Tu, [
                (l(!0), o(z, null, F(U.value, (a) => (l(), o("button", {
                  key: `subject-var-${a}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (L) => v("subject", a)
                }, p(a), 9, Uu))), 128))
              ])) : h("", !0)
            ])
          ]),
          e("span", {
            class: ie(["em-analyzer", `em-analyzer--${A.value}`])
          }, p(f(vu)(A.value)), 3),
          j.value.length ? (l(), o("span", Ru, "Spammy: " + p(j.value.join(", ")), 1)) : h("", !0)
        ]),
        e("div", Lu, [
          i[33] || (i[33] = e("label", { class: "em-label" }, [
            J("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Bu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: W.value,
              onInput: ge
            }, null, 40, Pu),
            e("div", Eu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[2] || (i[2] = (a) => g("preview")),
                title: "Insert variable"
              }, p(Ee)),
              s.value === "preview" ? (l(), o("div", Ou, [
                (l(!0), o(z, null, F(U.value, (a) => (l(), o("button", {
                  key: `preview-var-${a}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (L) => v("preview", a)
                }, p(a), 9, Nu))), 128))
              ])) : h("", !0)
            ])
          ]),
          i[34] || (i[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ie(["em-analyzer", `em-analyzer--${oe.value}`])
          }, p(f(bu)(oe.value)), 3),
          D.value.length ? (l(), o("span", Mu, "Spammy: " + p(D.value.join(", ")), 1)) : h("", !0)
        ])
      ]),
      e("div", Vu, [
        i[36] || (i[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        i[37] || (i[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Du, [
          (l(), o(z, null, F(b, (a) => e("button", {
            key: a.id,
            type: "button",
            class: "em-library-chip",
            onClick: (L) => I(a)
          }, p(a.label), 9, Wu)), 64))
        ])
      ]),
      e("div", Hu, [
        i[64] || (i[64] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        i[65] || (i[65] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", zu, [
          (l(!0), o(z, null, F(M.value, (a, L) => (l(), o("div", {
            key: a.id,
            class: "em-block",
            "data-type": a.type
          }, [
            e("div", qu, [
              e("span", ju, p(a.type), 1),
              e("div", Yu, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: L === 0,
                  onClick: (r) => X(a.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Ku),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: L === M.value.length - 1,
                  onClick: (r) => X(a.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Gu),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => ne(a.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ju)
              ])
            ]),
            a.type === "heading" ? (l(), o("div", Xu, [
              e("select", {
                value: a.level,
                class: "em-select em-select--sm",
                onChange: (r) => B(a.id, { level: Number(r.target.value) })
              }, [...i[38] || (i[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Qu),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.content,
                onInput: (r) => B(a.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, Zu),
              e("div", ec, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`block:${a.id}`)
                }, p(Ee), 8, tc),
                s.value === `block:${a.id}` ? (l(), o("div", ac, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `block-var-heading-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`block:${a.id}`, r)
                  }, p(r), 9, sc))), 128))
                ])) : h("", !0)
              ])
            ])) : a.type === "paragraph" ? (l(), o("div", nc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => B(a.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, lc),
              e("div", oc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`block:${a.id}`)
                }, p(Ee), 8, ic),
                s.value === `block:${a.id}` ? (l(), o("div", rc, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `block-var-paragraph-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`block:${a.id}`, r)
                  }, p(r), 9, dc))), 128))
                ])) : h("", !0)
              ])
            ])) : a.type === "image" ? (l(), o("div", uc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.src,
                onInput: (r) => B(a.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, cc),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.alt,
                onInput: (r) => B(a.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, pc),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.linkUrl,
                onInput: (r) => B(a.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, mc)
            ])) : a.type === "button" ? (l(), o("div", vc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.text,
                onInput: (r) => B(a.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, bc),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.url,
                onInput: (r) => B(a.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, gc),
              e("div", fc, [
                i[39] || (i[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: a.borderRadius ?? 8,
                  onInput: (r) => B(a.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, yc)
              ]),
              e("label", hc, [
                e("input", {
                  type: "checkbox",
                  checked: a.ghost,
                  onChange: (r) => B(a.id, { ghost: r.target.checked })
                }, null, 40, kc),
                i[40] || (i[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : a.type === "spacer" ? (l(), o("div", _c, [
              i[41] || (i[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: a.height,
                onInput: (r) => B(a.id, { height: Number(r.target.value) || 24 })
              }, null, 40, wc),
              i[42] || (i[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : a.type === "footer" ? (l(), o("div", $c, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => B(a.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, xc),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.unsubscribeUrl,
                onInput: (r) => B(a.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Cc),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.companyAddress,
                onInput: (r) => B(a.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, Sc),
              e("div", Ic, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`block:${a.id}`)
                }, p(Ee), 8, Ac),
                s.value === `block:${a.id}` ? (l(), o("div", Tc, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `block-var-footer-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`block:${a.id}`, r)
                  }, p(r), 9, Uc))), 128))
                ])) : h("", !0)
              ])
            ])) : a.type === "list" ? (l(), o("div", Rc, [
              e("select", {
                value: a.style,
                class: "em-select em-select--sm",
                onChange: (r) => B(a.id, { style: r.target.value })
              }, [...i[43] || (i[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Lc),
              e("div", Bc, [
                (l(!0), o(z, null, F(a.items || [], (r, E) => (l(), o("div", {
                  key: E,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (N) => pe(a.id, E, N.target.value),
                    placeholder: `Item ${E + 1}`
                  }, null, 40, Pc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (N) => fe(a.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Ec)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ue(a.id)
              }, "+ Add item", 8, Oc)
            ])) : a.type === "quote" ? (l(), o("div", Nc, [
              e("select", {
                value: a.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => B(a.id, { style: r.target.value })
              }, [...i[44] || (i[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Mc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => B(a.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Vc),
              e("div", Dc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`block:${a.id}`)
                }, p(Ee), 8, Wc),
                s.value === `block:${a.id}` ? (l(), o("div", Hc, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `block-var-quote-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`block:${a.id}`, r)
                  }, p(r), 9, zc))), 128))
                ])) : h("", !0)
              ])
            ])) : a.type === "social" ? (l(), o("div", Fc, [
              e("div", qc, [
                (l(!0), o(z, null, F(a.links || [], (r, E) => (l(), o("div", {
                  key: E,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (N) => ye(a.id, E, "platform", N.target.value)
                  }, [...i[45] || (i[45] = [
                    Fe('<option value="facebook" data-v-64de8497>Facebook</option><option value="twitter" data-v-64de8497>Twitter / X</option><option value="instagram" data-v-64de8497>Instagram</option><option value="linkedin" data-v-64de8497>LinkedIn</option><option value="youtube" data-v-64de8497>YouTube</option><option value="tiktok" data-v-64de8497>TikTok</option><option value="custom" data-v-64de8497>Custom</option>', 7)
                  ])], 40, jc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (N) => ye(a.id, E, "url", N.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Yc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (N) => w(a.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Kc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => P(a.id)
              }, "+ Add link", 8, Gc)
            ])) : a.type === "video" ? (l(), o("div", Jc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.thumbnailUrl,
                onInput: (r) => B(a.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Xc),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.videoUrl,
                onInput: (r) => B(a.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Qc),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.caption,
                onInput: (r) => B(a.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Zc)
            ])) : a.type === "link_list" ? (l(), o("div", ep, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: a.separator,
                onInput: (r) => B(a.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, tp),
              e("div", ap, [
                (l(!0), o(z, null, F(a.links || [], (r, E) => (l(), o("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (N) => T(a.id, E, "text", N.target.value),
                    placeholder: "Label"
                  }, null, 40, sp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (N) => T(a.id, E, "url", N.target.value),
                    placeholder: "URL"
                  }, null, 40, np),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (N) => ee(a.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, lp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => G(a.id)
              }, "+ Add link", 8, op)
            ])) : a.type === "columns" ? (l(), o("div", ip, [
              i[46] || (i[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.leftContent,
                onInput: (r) => B(a.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, rp),
              e("div", dp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`col-left:${a.id}`)
                }, p(Ee), 8, up),
                s.value === `col-left:${a.id}` ? (l(), o("div", cp, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `col-left-var-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`col-left:${a.id}`, r)
                  }, p(r), 9, pp))), 128))
                ])) : h("", !0)
              ]),
              i[47] || (i[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.rightContent,
                onInput: (r) => B(a.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, mp),
              e("div", vp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`col-right:${a.id}`)
                }, p(Ee), 8, bp),
                s.value === `col-right:${a.id}` ? (l(), o("div", gp, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `col-right-var-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`col-right:${a.id}`, r)
                  }, p(r), 9, fp))), 128))
                ])) : h("", !0)
              ])
            ])) : a.type === "divider" ? (l(), o("div", yp, [
              e("div", hp, [
                i[48] || (i[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: a.thickness ?? 1,
                  onInput: (r) => B(a.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, kp),
                i[49] || (i[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", _p, [
                i[50] || (i[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: a.color ?? "#e2e8f0",
                  onInput: (r) => B(a.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, wp)
              ]),
              e("select", {
                value: a.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => B(a.id, { lineStyle: r.target.value })
              }, [...i[51] || (i[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, $p)
            ])) : a.type === "row" ? (l(), o("div", xp, [
              i[53] || (i[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: a.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => re(a.id, { columnCount: Number(r.target.value) })
              }, [...i[52] || (i[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Cp),
              (l(!0), o(z, null, F(a.cells || [], (r, E) => (l(), o("div", {
                key: E,
                class: "em-row-cell"
              }, [
                e("label", Sp, "Column " + p(E + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (N) => le(a.id, E, N.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Ip),
                e("div", Ap, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (N) => g(`row:${a.id}:${E}`)
                  }, p(Ee), 8, Tp),
                  s.value === `row:${a.id}:${E}` ? (l(), o("div", Up, [
                    (l(!0), o(z, null, F(U.value, (N) => (l(), o("button", {
                      key: `row-var-${a.id}-${E}-${N}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (K) => v(`row:${a.id}:${E}`, N)
                    }, p(N), 9, Rp))), 128))
                  ])) : h("", !0)
                ])
              ]))), 128))
            ])) : a.type === "navbar" ? (l(), o("div", Lp, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: a.separator,
                onInput: (r) => B(a.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Bp),
              e("div", Pp, [
                (l(!0), o(z, null, F(a.links || [], (r, E) => (l(), o("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (N) => te(a.id, E, "text", N.target.value),
                    placeholder: "Label"
                  }, null, 40, Ep),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (N) => te(a.id, E, "url", N.target.value),
                    placeholder: "URL"
                  }, null, 40, Op),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (N) => we(a.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Np)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => he(a.id)
              }, "+ Add link", 8, Mp)
            ])) : a.type === "accordion" ? (l(), o("div", Vp, [
              (l(!0), o(z, null, F(a.items || [], (r, E) => (l(), o("div", {
                key: E,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (N) => Ce(a.id, E, "title", N.target.value),
                  placeholder: "Section title"
                }, null, 40, Dp),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (N) => Ce(a.id, E, "content", N.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Wp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (N) => Ne(a.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Hp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Ue(a.id)
              }, "+ Add section", 8, zp)
            ])) : a.type === "carousel" ? (l(), o("div", Fp, [
              (l(!0), o(z, null, F(a.slides || [], (r, E) => (l(), o("div", {
                key: E,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (N) => Se(a.id, E, "imageUrl", N.target.value),
                  placeholder: "Image URL"
                }, null, 40, qp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (N) => Se(a.id, E, "alt", N.target.value),
                  placeholder: "Alt text"
                }, null, 40, jp),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (N) => Se(a.id, E, "linkUrl", N.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Yp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (N) => Be(a.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Kp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Le(a.id)
              }, "+ Add slide", 8, Gp)
            ])) : a.type === "countdown" ? (l(), o("div", Jp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.label,
                onInput: (r) => B(a.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Xp),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: a.endDateTime ? a.endDateTime.slice(0, 16) : "",
                onInput: (r) => B(a.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Qp),
              i[54] || (i[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : a.type === "product_card" ? (l(), o("div", Zp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.imageUrl,
                onInput: (r) => B(a.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, em),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.title,
                onInput: (r) => B(a.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, tm),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.price,
                onInput: (r) => B(a.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, am),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.buttonText,
                onInput: (r) => B(a.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, sm),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.buttonUrl,
                onInput: (r) => B(a.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, nm)
            ])) : a.type === "liquid" ? (l(), o("div", lm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => B(a.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, om),
              e("div", im, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`block:${a.id}`)
                }, p(Ee), 8, rm),
                s.value === `block:${a.id}` ? (l(), o("div", dm, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `block-var-liquid-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`block:${a.id}`, r)
                  }, p(r), 9, um))), 128))
                ])) : h("", !0)
              ]),
              i[55] || (i[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : a.type === "code_block" ? (l(), o("div", cm, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.caption,
                onInput: (r) => B(a.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, pm),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => B(a.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, mm),
              e("div", vm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => g(`block:${a.id}`)
                }, p(Ee), 8, bm),
                s.value === `block:${a.id}` ? (l(), o("div", gm, [
                  (l(!0), o(z, null, F(U.value, (r) => (l(), o("button", {
                    key: `block-var-code-${a.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => v(`block:${a.id}`, r)
                  }, p(r), 9, fm))), 128))
                ])) : h("", !0)
              ]),
              i[56] || (i[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : a.type === "rss_feed" ? (l(), o("div", ym, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.feedUrl,
                onInput: (r) => B(a.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, hm),
              e("div", km, [
                i[57] || (i[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: a.maxItems ?? 5,
                  onInput: (r) => B(a.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, _m)
              ]),
              i[58] || (i[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : a.type === "dynamic_image" ? (l(), o("div", wm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.imageUrl,
                onInput: (r) => B(a.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, $m),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.alt,
                onInput: (r) => B(a.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, xm),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.fallbackUrl,
                onInput: (r) => B(a.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Cm)
            ])) : h("", !0),
            k.includes(a.type) ? (l(), o("div", Sm, [
              e("div", Im, [
                e("button", {
                  type: "button",
                  class: ie(["em-align-btn", { "em-align-btn--active": (a.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (r) => B(a.id, { alignment: "left" })
                }, [...i[59] || (i[59] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Am),
                e("button", {
                  type: "button",
                  class: ie(["em-align-btn", { "em-align-btn--active": (a.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (r) => B(a.id, { alignment: "center" })
                }, [...i[60] || (i[60] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Tm),
                e("button", {
                  type: "button",
                  class: ie(["em-align-btn", { "em-align-btn--active": (a.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (r) => B(a.id, { alignment: "right" })
                }, [...i[61] || (i[61] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Um)
              ]),
              e("label", Rm, [
                e("input", {
                  type: "checkbox",
                  checked: a.fullWidth,
                  onChange: (r) => B(a.id, { fullWidth: r.target.checked })
                }, null, 40, Lm),
                i[62] || (i[62] = e("span", null, "Full width", -1))
              ])
            ])) : h("", !0)
          ], 8, Fu))), 128))
        ]),
        e("div", Bm, [
          i[63] || (i[63] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Pm, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[3] || (i[3] = (a) => R("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[4] || (i[4] = (a) => R("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[5] || (i[5] = (a) => R("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[6] || (i[6] = (a) => R("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[7] || (i[7] = (a) => R("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[8] || (i[8] = (a) => R("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[9] || (i[9] = (a) => R("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[10] || (i[10] = (a) => R("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[11] || (i[11] = (a) => R("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[12] || (i[12] = (a) => R("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[13] || (i[13] = (a) => R("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[14] || (i[14] = (a) => R("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[15] || (i[15] = (a) => R("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[16] || (i[16] = (a) => R("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[17] || (i[17] = (a) => R("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[18] || (i[18] = (a) => R("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[19] || (i[19] = (a) => R("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[20] || (i[20] = (a) => R("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[21] || (i[21] = (a) => R("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[22] || (i[22] = (a) => R("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[23] || (i[23] = (a) => R("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[24] || (i[24] = (a) => R("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[25] || (i[25] = (a) => R("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Em, [
        i[68] || (i[68] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        i[69] || (i[69] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Om, [
          i[66] || (i[66] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Nm, [
            Te(e("select", {
              "onUpdate:modelValue": i[26] || (i[26] = (a) => V.value = a),
              class: "em-select em-select--flex"
            }, [
              (l(!0), o(z, null, F(U.value, (a) => (l(), o("option", {
                key: a,
                value: a
              }, p(a), 9, Mm))), 128))
            ], 512), [
              [Oe, V.value]
            ])
          ])
        ]),
        e("div", Vm, [
          i[67] || (i[67] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Dm, [
            Te(e("input", {
              "onUpdate:modelValue": i[27] || (i[27] = (a) => q.value = a),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [lt, q.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: O
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Hm = /* @__PURE__ */ _e(Wm, [["__scopeId", "data-v-64de8497"]]), zm = { class: "keos-email-builder" }, Fm = { class: "kb-builder-top" }, qm = { class: "kb-email-layout" }, jm = { class: "kb-email-sidebar" }, Ym = {
  key: 0,
  class: "kb-email-form"
}, Km = { class: "kb-email-form-head" }, Gm = { class: "kb-email-form-head-top" }, Jm = { class: "kb-email-health-pill" }, Xm = { class: "kb-wa-form-head-row" }, Qm = ["value"], Zm = { class: "kb-email-health" }, ev = { class: "kb-email-health-row" }, tv = { class: "kb-email-health-value" }, av = { class: "kb-email-health-bar" }, sv = { class: "kb-email-canvas" }, nv = {
  key: 0,
  class: "kb-email-test-banner"
}, lv = { class: "kb-email-preview-chrome" }, ov = { class: "kb-push-preview-controls" }, iv = { class: "kb-push-preview-as" }, rv = ["value"], dv = { class: "kb-preview-status" }, uv = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, cv = { class: "kb-email-inbox-strip" }, pv = { class: "kb-email-inbox-from" }, mv = { class: "kb-email-inbox-from-name" }, vv = { class: "kb-email-inbox-from-addr" }, bv = { class: "kb-email-inbox-subject" }, gv = ["title"], fv = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, yv = { class: "kb-email-body-canvas" }, hv = ["innerHTML"], kv = { class: "kb-email-actions" }, _v = {
  key: 0,
  class: "kb-actions-note"
}, wv = { key: 0 }, $v = { class: "kb-email-actions-right" }, xv = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Cv = { class: "kb-confirm-dialog" }, Sv = { class: "kb-confirm-actions" }, Iv = /* @__PURE__ */ ke({
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
  setup(n, { emit: d }) {
    function u(t) {
      if (!Array.isArray(t) || t.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const s = (C) => String(C).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), g = [
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
      ], v = (C, c) => {
        if (!g.includes(c.type)) return C;
        const i = c.alignment || "left", a = !!c.fullWidth;
        return `<div style="text-align:${i};${a ? "width:100%;" : ""}">${C}</div>`;
      }, O = [];
      for (const C of t)
        switch (C.type) {
          case "heading": {
            const c = Math.min(3, Math.max(1, Number(C.level) || 1)), i = s(C.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            O.push(
              v(
                `<h${c} style="margin:0 0 12px;font-size:${c === 1 ? "22" : c === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${i || "Heading"}</h${c}>`,
                C
              )
            );
            break;
          }
          case "paragraph": {
            const c = s(C.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            O.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${c || "Paragraph"}</p>`,
                C
              )
            );
            break;
          }
          case "image": {
            const c = (C.src || "").trim(), i = s(C.alt || ""), a = (C.linkUrl || "").trim(), r = !!C.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", E = c ? `<img src="${s(c)}" alt="${i}" style="${r}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            O.push(
              v(
                `<div style="margin:0 0 12px;">${a ? `<a href="${s(a)}" style="color:#2563eb;">${E}</a>` : E}</div>`,
                C
              )
            );
            break;
          }
          case "button": {
            const c = s(C.text || "Button"), i = (C.url || "#").trim(), a = Math.min(24, Math.max(0, Number(C.borderRadius) ?? 8)), L = !!C.fullWidth, r = !!C.ghost, E = r ? "transparent" : "#0f172a", N = r ? "#0f172a" : "#fff", K = r ? "2px solid #0f172a" : "none", Ae = L ? "block" : "inline-block", Re = L ? "100%" : "auto";
            O.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${s(i)}" style="display:${Ae};width:${Re};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${E};color:${N};border:${K};text-decoration:none;font-size:14px;font-weight:600;border-radius:${a}px;overflow-wrap:anywhere;">${c}</a></p>`,
                C
              )
            );
            break;
          }
          case "divider": {
            const c = Math.min(8, Math.max(1, Number(C.thickness) || 1)), i = (C.color || "#e2e8f0").trim() || "#e2e8f0", a = C.lineStyle || "solid";
            O.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${c}px ${a} ${i};" />`,
                C
              )
            );
            break;
          }
          case "spacer": {
            const c = Math.min(120, Math.max(8, Number(C.height) || 24));
            O.push(v(`<div style="height:${c}px;"></div>`, C));
            break;
          }
          case "footer": {
            const c = s(C.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), i = (C.unsubscribeUrl || "").trim(), a = s(C.companyAddress || "");
            O.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${c || "Footer"}` + (i ? `<p style="margin:8px 0 0;"><a href="${s(i)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (a ? `<p style="margin:4px 0 0;">${a}</p>` : "") + "</div>",
                C
              )
            );
            break;
          }
          case "list": {
            const c = C.style === "numbered" ? "ol" : "ul", a = (Array.isArray(C.items) ? C.items : []).map(
              (L) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${s(String(L)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            O.push(
              v(
                `<${c} style="margin:0 0 12px;padding-left:24px;">${a || "<li>Item</li>"}</${c}>`,
                C
              )
            );
            break;
          }
          case "quote": {
            const c = s(C.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), i = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, a = i[C.style || "default"] || i.default;
            O.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${a}font-size:14px;line-height:1.6;">${c || "Quote"}</div>`,
                C
              )
            );
            break;
          }
          case "social": {
            const i = (Array.isArray(C.links) ? C.links : []).filter((a) => (a.url || "").trim());
            if (i.length === 0)
              O.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  C
                )
              );
            else {
              const a = (L) => `<a href="${s((L.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${s(L.platform || "Link")}</a>`;
              O.push(
                v(
                  `<div style="margin:0 0 12px;">${i.map(a).join("")}</div>`,
                  C
                )
              );
            }
            break;
          }
          case "video": {
            const c = (C.thumbnailUrl || "").trim(), i = (C.videoUrl || "#").trim(), a = s(C.caption || ""), r = !!C.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", E = c ? `<img src="${s(c)}" alt="Video" style="${r}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            O.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${s(i)}" style="display:block;color:inherit;">${E}</a>` + (a ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${a}</p>` : "") + "</div>",
                C
              )
            );
            break;
          }
          case "link_list": {
            const c = Array.isArray(C.links) ? C.links : [], i = s(C.separator || " | "), L = c.filter(
              (r) => (r.text || r.url) && (r.url || "").trim()
            ).map(
              (r) => `<a href="${s((r.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${s(r.text || "Link")}</a>`
            );
            O.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${L.join(i)}</p>`,
                C
              )
            );
            break;
          }
          case "columns": {
            const c = s(C.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), i = s(C.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            O.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${c || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${i || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const c = Math.min(4, Math.max(1, Number(C.columnCount) || 2)), i = Array.isArray(C.cells) ? C.cells.slice(0, c) : [], a = 100 / c, L = Array.from({ length: c }, (r, E) => {
              const N = i[E] ?? "", K = s(N).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${a}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${K || "—"}</td>`;
            }).join("");
            O.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${L}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const c = Array.isArray(C.links) ? C.links : [], i = s(C.separator || " | "), L = c.filter(
              (r) => (r.text || r.url) && (r.url || "").trim()
            ).map(
              (r) => `<a href="${s((r.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${s(r.text || "Link")}</a>`
            );
            O.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${L.length ? L.join(i) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const i = (Array.isArray(C.items) ? C.items : []).map((a) => {
              const L = s(a.title || "Section"), r = s(a.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${L}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${r}</div></details>`;
            }).join("");
            O.push(
              i ? `<div style="margin:0 0 12px;">${i}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const i = (Array.isArray(C.slides) ? C.slides : []).filter(
              (a) => (a.imageUrl || "").trim()
            );
            if (i.length === 0)
              O.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const a = i[0], L = `<img src="${s(a.imageUrl)}" alt="${s(a.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, r = (a.linkUrl || "").trim();
              O.push(
                `<div style="margin:0 0 12px;">${r ? `<a href="${s(r)}">${L}</a>` : L}` + (i.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${i.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const c = s(C.label || "Offer ends in"), i = C.endDateTime ? new Date(C.endDateTime).toLocaleString() : "—";
            O.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${c}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${i}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const c = (C.imageUrl || "").trim(), i = s(C.title || "Product"), a = s(C.price || ""), L = s(C.buttonText || "Buy now"), r = (C.buttonUrl || "#").trim(), E = c ? `<img src="${s(c)}" alt="${s(C.alt || i)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            O.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${E}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${i}</p>` + (a ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${a}</p>` : "") + `<a href="${s(r)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${L}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const c = s((C.content || "").trim());
            O.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${c || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const c = (C.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), i = s((C.caption || "").trim());
            O.push(
              '<div style="margin:0 0 12px;">' + (i ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${i}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${c || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const c = (C.feedUrl || "").trim(), i = Math.min(20, Math.max(1, Number(C.maxItems) ?? 5));
            O.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (c ? `<p style="margin:0;font-size:12px;color:#64748b;">${s(c)} · max ${i} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const c = (C.imageUrl || "").trim(), i = (C.fallbackUrl || "").trim(), a = s(C.alt || "Dynamic image");
            c ? O.push(
              `<div style="margin:0 0 12px;"><img src="${s(c)}" alt="${a}" style="max-width:100%;height:auto;display:block;border:0;" />` + (i ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${s(i)}</p>` : "") + "</div>"
            ) : O.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return O.join("");
    }
    function m(t) {
      return /<\s*html[\s>]/i.test(t) || /<!doctype\s+html/i.test(t);
    }
    function k(t) {
      const s = t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return s ? s[1] : t;
    }
    function _(t, s, g) {
      const v = (s || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), O = (g || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${v}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        O ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${O}</div>` : "",
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
    const $ = n, S = d, {
      campaign: x,
      dirty: U,
      customValidatorErrors: V,
      getValidationWithWarnings: q,
      update: H,
      updateMessage: W,
      undo: A,
      redo: oe,
      canUndo: j,
      canRedo: D,
      resetMessage: M,
      hooks: se
    } = Xe({
      initial: $.modelValue,
      hooks: {
        ...$.hooks,
        customValidators: async (t) => {
          var O, C, c;
          const s = [];
          (O = t.name) != null && O.trim() || s.push("Template name is required");
          const g = t.message;
          (C = g == null ? void 0 : g.subject) != null && C.trim() || s.push("Subject is required");
          const v = (c = $.hooks) != null && c.customValidators ? await $.hooks.customValidators(t) : [];
          return [...s, ...v];
        }
      },
      onDirty: () => S("change", x.value)
    }), { lastSavedAt: ve } = Qe(x, { channel: "email" });
    function ge(t) {
      (t.metaKey || t.ctrlKey) && t.key === "z" && (t.preventDefault(), t.shiftKey ? oe() : A());
    }
    je(() => {
      window.addEventListener("keydown", ge);
    }), Ye(() => {
      window.removeEventListener("keydown", ge);
    }), xe(
      x,
      (t) => S("update:modelValue", {
        ...t,
        message: {
          ...t.message,
          html: Se.value
        }
      }),
      { deep: !0 }
    );
    const me = ae(), Z = ae(!0);
    async function Y() {
      if (se.estimateReach)
        try {
          me.value = await se.estimateReach(x.value.audience);
        } catch {
          me.value = void 0;
        }
      se.canSend && (Z.value = await Promise.resolve(se.canSend()));
    }
    Y(), xe(() => x.value.audience, Y, { deep: !0 });
    const b = y(() => (V.value, q(me.value))), I = y(() => b.value.blockingErrors), R = y(() => b.value.warnings), ne = y(() => b.value.valid), X = y(() => {
      var v, O, C;
      const t = x.value.message, s = [
        !!((v = x.value.name) != null && v.trim()),
        !!((O = t.subject) != null && O.trim()),
        !!((C = t.from_address) != null && C.trim()),
        !!(Array.isArray(t.blocks) ? t.blocks.length : (t.html ?? "").trim().length),
        !!x.value.template_type
      ], g = s.filter(Boolean).length;
      return Math.round(g / s.length * 100);
    }), B = y(() => X.value >= 90 ? "Production ready" : X.value >= 70 ? "Strong draft" : X.value >= 40 ? "In progress" : "Needs setup"), pe = y(
      () => x.value.template_type ?? "transactional"
    ), ue = ae(""), fe = ae(!1), ye = ae(null), P = y(() => {
      const t = ue.value;
      return t ? He.find((s) => s.id === t) ?? null : null;
    });
    function w(t) {
      const s = x.value, g = t.campaign.message ? { ...s.message, ...t.campaign.message } : s.message;
      H({
        ...t.campaign,
        message: g
      }), ye.value = null, fe.value = !1;
    }
    function T(t) {
      const s = t.target.value;
      if (!s) return;
      const g = ht.find((v) => v.id === s);
      g && (U.value ? (ye.value = g, fe.value = !0) : w(g), t.target.value = "");
    }
    function G(t) {
      H({ template_type: t });
    }
    function ee(t) {
      H({
        name: t,
        tracking: { ...x.value.tracking ?? {}, campaign_name: t }
      });
    }
    const re = y(
      () => x.value.message.subject ?? ""
    ), le = y(
      () => x.value.message.preview_text ?? ""
    ), te = y(
      () => x.value.message.html ?? ""
    ), he = y(
      () => x.value.message.from_name ?? "Your App"
    ), we = y(
      () => x.value.message.from_address ?? "notifications@example.com"
    ), Ce = y(
      () => x.value.message.blocks ?? []
    ), Ue = y(() => {
      const t = x.value.message, s = (t.html ?? "").trim(), v = (Array.isArray(t.blocks) ? t.blocks : []).some((O) => {
        if (!O || typeof O != "object") return !1;
        const C = (O.type ?? "").toString();
        if (C === "paragraph" || C === "heading" || C === "quote" || C === "footer") {
          const c = (O.content ?? "").toString().trim();
          return !(!c || c === "Heading" || c.startsWith("Your text here."));
        }
        return C === "image" || C === "video" || C === "dynamic_image" ? !!(O.src ?? O.imageUrl ?? O.thumbnailUrl ?? "").toString().trim() : C === "button" ? !!(O.text ?? "").toString().trim() : !0;
      });
      return !!((t.subject ?? "").toString().trim() || (t.preview_text ?? "").toString().trim() || s || v);
    }), Ne = y(() => {
      const t = Ce.value;
      if (Array.isArray(t) && t.length > 0)
        return u(t);
      const s = te.value;
      return s && s.trim() ? m(s) ? k(s) : s : u([]);
    }), Se = y(() => {
      const t = Ce.value;
      if (Array.isArray(t) && t.length > 0)
        return _(
          u(t),
          re.value,
          le.value
        );
      const s = te.value;
      return s && s.trim() ? m(s) ? s : _(s, re.value, le.value) : _(
        u([]),
        re.value,
        le.value
      );
    }), Le = y(() => {
      const t = re.value;
      return P.value ? Ve(t, P.value.data) : t;
    }), Be = y(() => {
      const t = le.value;
      return P.value ? Ve(t, P.value.data) : t;
    }), Pe = y(() => {
      const t = Ne.value;
      return P.value ? Ve(t, P.value.data) : t;
    }), Ie = ae("desktop");
    function Q() {
      ne.value && S("save", {
        ...x.value,
        message: {
          ...x.value.message,
          html: Se.value
        }
      });
    }
    return (t, s) => {
      var g;
      return l(), o("div", zm, [
        e("div", Fm, [
          $e(Ze, {
            "campaign-name": f(x).name,
            status: f(x).status,
            dirty: f(U),
            "last-saved-at": f(ve),
            "can-undo": f(j),
            "can-redo": f(D),
            "slugify-name": $.enforceSlugName,
            "onUpdate:campaignName": ee,
            onUndo: f(A),
            onRedo: f(oe)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          I.value.length > 0 ? (l(), o("div", {
            key: 0,
            class: "kb-errors",
            style: ce({
              background: f(be).dangerBg,
              border: `1px solid ${f(be).dangerBorder}`,
              borderRadius: `${f(De).input}px`,
              padding: `${f(de)[16]}px ${f(de)[24]}px`,
              marginBottom: `${f(de)[24]}px`
            })
          }, [
            e("ul", {
              style: ce({ margin: 0, paddingLeft: "1.25rem", color: f(be).danger })
            }, [
              (l(!0), o(z, null, F(I.value, (v) => (l(), o("li", {
                key: v.message
              }, p(v.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", qm, [
          e("aside", jm, [
            n.disabledSections.includes("email") ? h("", !0) : (l(), o("div", Ym, [
              e("div", Km, [
                e("div", Gm, [
                  s[8] || (s[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Jm, p(B.value), 1)
                ]),
                e("div", Xm, [
                  $e(ut, {
                    "template-type": pe.value,
                    onUpdate: G
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: T
                  }, [
                    s[9] || (s[9] = e("option", { value: "" }, "Presets…", -1)),
                    (l(!0), o(z, null, F(f(ht), (v) => (l(), o("option", {
                      key: v.id,
                      value: v.id
                    }, p(v.label), 9, Qm))), 128))
                  ], 32)
                ]),
                e("div", Zm, [
                  e("div", ev, [
                    s[10] || (s[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", tv, p(X.value) + "%", 1)
                  ]),
                  e("div", av, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: ce({ width: `${X.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              $e(Hm, {
                message: f(x).message,
                "variable-options": n.variableOptions,
                "show-reset": !0,
                onUpdate: f(W),
                onReset: s[0] || (s[0] = (v) => f(M)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", sv, [
            !n.designOnly && f(x).audience.test_mode ? (l(), o("div", nv, [...s[11] || (s[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              J(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", lv, [
              e("div", ov, [
                e("label", iv, [
                  s[13] || (s[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (v) => ue.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[12] || (s[12] = e("option", { value: "" }, "No substitution", -1)),
                    (l(!0), o(z, null, F(f(He), (v) => (l(), o("option", {
                      key: v.id,
                      value: v.id
                    }, p(v.label), 9, rv))), 128))
                  ], 512), [
                    [Oe, ue.value]
                  ])
                ]),
                e("div", dv, [
                  s[14] || (s[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, p(Ie.value), 1)
                ])
              ]),
              e("div", uv, [
                e("button", {
                  type: "button",
                  class: ie(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ie.value === "desktop"
                  }]),
                  onClick: s[2] || (s[2] = (v) => Ie.value = "desktop")
                }, [...s[15] || (s[15] = [
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
                  J(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: ie(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ie.value === "mobile"
                  }]),
                  onClick: s[3] || (s[3] = (v) => Ie.value = "mobile")
                }, [...s[16] || (s[16] = [
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
                  J(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: ie(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Ie.value === "mobile",
                  "kb-email-preview-frame--empty": !Ue.value
                }])
              }, [
                e("div", cv, [
                  e("div", pv, [
                    e("span", mv, p(he.value), 1),
                    e("span", vv, "<" + p(we.value) + ">", 1)
                  ]),
                  e("div", bv, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: Le.value || "No subject"
                    }, p(Le.value || "No subject"), 9, gv),
                    Be.value ? (l(), o("span", fv, " — " + p(Be.value), 1)) : h("", !0)
                  ])
                ]),
                e("div", yv, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: Pe.value
                  }, null, 8, hv)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", kv, [
          R.value.length > 0 ? (l(), o("div", _v, [
            s[17] || (s[17] = e("strong", null, "Warning:", -1)),
            J(" " + p((g = R.value[0]) == null ? void 0 : g.message) + " ", 1),
            R.value.length > 1 ? (l(), o("span", wv, " (+" + p(R.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", $v, [
            n.showDuplicate ? (l(), o("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: s[4] || (s[4] = (v) => S("duplicate", JSON.parse(JSON.stringify(f(x)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (l(), o("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: Q
            }, " Save ")) : h("", !0),
            n.showClose ? (l(), o("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: s[5] || (s[5] = (v) => S("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        fe.value ? (l(), o("div", xv, [
          e("div", Cv, [
            s[18] || (s[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[19] || (s[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Sv, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: s[6] || (s[6] = (v) => {
                  fe.value = !1, ye.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: s[7] || (s[7] = (v) => ye.value && w(ye.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Dt = /* @__PURE__ */ _e(Iv, [["__scopeId", "data-v-f45fc2a3"]]), Av = { class: "kb-shell" }, Tv = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Uv = ["aria-selected", "onClick"], Rv = { class: "kb-shell__meta" }, Lv = ["href"], Bv = { class: "kb-shell__body" }, Pv = /* @__PURE__ */ ke({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(n, { emit: d }) {
    const u = d, m = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (k, _) => (l(), o("div", Av, [
      e("header", {
        class: "kb-shell__header",
        style: ce({ padding: `${f(de)[12]}px ${f(de)[24]}px`, borderBottom: `1px solid ${f(be).neutral.border}`, background: f(be).neutral.bg })
      }, [
        _[0] || (_[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Tv, [
          (l(), o(z, null, F(m, ($) => e("button", {
            key: $.id,
            type: "button",
            class: ie(["kb-shell__channel", { "kb-shell__channel--active": n.channel === $.id }]),
            role: "tab",
            "aria-selected": n.channel === $.id,
            onClick: (S) => u("switch-channel", $.id)
          }, p($.label), 11, Uv)), 64))
        ]),
        e("div", Rv, [
          n.environment ? (l(), o("span", {
            key: 0,
            class: "kb-shell__env",
            style: ce({ padding: "2px 8px", borderRadius: `${f(De).input}px`, fontSize: "0.75rem", background: f(be).neutral.bg, color: f(be).neutral.textMuted })
          }, p(n.environment), 5)) : h("", !0),
          n.helpUrl ? (l(), o("a", {
            key: 1,
            href: n.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ce({ color: f(be).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Lv)) : h("", !0)
        ])
      ], 4),
      e("div", Bv, [
        Me(k.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Ev = /* @__PURE__ */ _e(Pv, [["__scopeId", "data-v-0df30803"]]), Ov = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Nv = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Mv = ["onClick"], Vv = /* @__PURE__ */ ke({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(n) {
    var _;
    const d = n, u = ae(((_ = d.items[0]) == null ? void 0 : _.id) ?? "");
    let m = null;
    function k($) {
      const S = document.getElementById($);
      S && S.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return je(() => {
      const $ = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      $ && (m = new IntersectionObserver(
        (S) => {
          for (const x of S)
            if (x.isIntersecting) {
              const U = x.target.getAttribute("data-outline-id");
              U && (u.value = U);
            }
        },
        { root: $ === document ? null : $, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((S) => {
        const x = document.getElementById(S.id);
        x && (m == null || m.observe(x));
      }));
    }), Ye(() => {
      m == null || m.disconnect();
    }), xe(
      () => d.items,
      ($) => {
        $.length && !u.value && (u.value = $[0].id);
      },
      { immediate: !0 }
    ), ($, S) => (l(), o("nav", Ov, [
      e("ul", Nv, [
        (l(!0), o(z, null, F(n.items, (x) => (l(), o("li", {
          key: x.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ie(["kb-outline__btn", { "kb-outline__btn--active": u.value === x.id }]),
            style: ce({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${f(de)[8]}px ${f(de)[12]}px`,
              border: "none",
              borderRadius: `${f(De).input}px`,
              background: u.value === x.id ? f(be).neutral.bg : "transparent",
              color: u.value === x.id ? "#0f172a" : f(be).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: u.value === x.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (U) => k(x.id)
          }, p(x.label), 15, Mv)
        ]))), 128))
      ])
    ]));
  }
}), Dv = /* @__PURE__ */ _e(Vv, [["__scopeId", "data-v-25c37675"]]), Wv = ["id"], Hv = {
  key: 1,
  class: "kb-form-shell__head"
}, zv = /* @__PURE__ */ ke({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(n) {
    return (d, u) => (l(), o("div", {
      class: "kb-form-shell",
      id: n.sectionId ?? void 0,
      style: ce({
        padding: `${f(de)[24]}px ${f(de)[24]}px ${f(de)[32]}px`,
        marginBottom: 0
      })
    }, [
      n.label ? (l(), o("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ce({ marginBottom: f(de)[24], paddingBottom: f(de)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ce({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: f(de)[12] })
        }, p(n.label), 5),
        Me(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (l(), o("div", Hv, [
        Me(d.$slots, "head", {}, void 0, !0)
      ])),
      Me(d.$slots, "default", {}, void 0, !0)
    ], 12, Wv));
  }
}), Fv = /* @__PURE__ */ _e(zv, [["__scopeId", "data-v-6504df41"]]), qv = /* @__PURE__ */ ke({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(n) {
    return (d, u) => (l(), o("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ce({
        display: "flex",
        justifyContent: n.align === "start" ? "flex-start" : n.align === "between" ? "space-between" : "flex-end",
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
      Me(d.$slots, "default")
    ], 4));
  }
}), jv = /* @__PURE__ */ ke({
  __name: "BuilderTopShell",
  setup(n) {
    return (d, u) => (l(), o("div", {
      class: "kb-top-shell",
      style: ce({
        marginLeft: f(de)[24],
        marginRight: f(de)[24]
      })
    }, [
      Me(d.$slots, "header"),
      Me(d.$slots, "errors"),
      Me(d.$slots, "warnings"),
      Me(d.$slots, "default")
    ], 4));
  }
});
function Yv(n) {
  n.component("KeosNotificationBuilder", Nt), n.component("KeosWhatsAppBuilder", Mt), n.component("KeosSmsBuilder", Vt), n.component("KeosEmailBuilder", Dt), n.component("BuilderShell", Ev), n.component("BuilderOutline", Dv), n.component("BuilderVersionHistoryModal", Ot), n.component("BuilderFormShell", Fv), n.component("BuilderActionsBar", qv), n.component("BuilderTopShell", jv);
}
const Gv = {
  install: Yv,
  KeosNotificationBuilder: Nt,
  KeosWhatsAppBuilder: Mt,
  KeosSmsBuilder: Vt,
  KeosEmailBuilder: Dt
};
export {
  qv as BuilderActionsBar,
  Fv as BuilderFormShell,
  Dv as BuilderOutline,
  Ev as BuilderShell,
  jv as BuilderTopShell,
  Ot as BuilderVersionHistoryModal,
  He as DEFAULT_SAMPLE_PROFILES,
  Dt as KeosEmailBuilder,
  Nt as KeosNotificationBuilder,
  Vt as KeosSmsBuilder,
  Mt as KeosWhatsAppBuilder,
  Gv as default,
  Yv as install,
  Ve as renderTemplatePreview,
  Qe as useAutosave,
  Xe as useCampaignState
};
//# sourceMappingURL=index.js.map
