import { ref as ne, watch as Be, computed as $, defineComponent as Ie, openBlock as s, createElementBlock as n, normalizeStyle as me, unref as f, createElementVNode as e, normalizeClass as ue, Fragment as F, renderList as j, toDisplayString as d, createTextVNode as ee, createCommentVNode as w, withDirectives as Le, vModelSelect as Ee, vModelText as lt, createStaticVNode as He, withKeys as Ht, onMounted as je, onUnmounted as Ke, createVNode as Te, createBlock as zt, withModifiers as Fe, renderSlot as Oe } from "vue";
const pe = {
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
}, we = {
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
we.neutral.textMuted, we.neutral.textMeta;
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
}, Ft = ["android", "ios", "web"], At = "normal", Tt = ["low", "normal", "high"], Bt = 86400, qt = [3600, 7200, 86400, 172800], Ut = "1.0", jt = ["topic", "segment", "user_list"];
function ot() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Ft],
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
    priority: At,
    ttl: Bt,
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
function Kt(a) {
  return {
    schema_version: Ut,
    name: "",
    status: "draft",
    audience: ot(),
    message: it(),
    delivery: rt(),
    tracking: dt(),
    ...a
  };
}
function Lt(a) {
  const o = a;
  return o.schema_version || (o.schema_version = Ut), o.audience || (o.audience = ot()), o.message || (o.message = it()), o.delivery || (o.delivery = rt()), o.tracking || (o.tracking = dt()), Tt.includes(o.delivery.priority) || (o.delivery.priority = At), o.delivery.ttl === void 0 && (o.delivery.ttl = Bt), jt.includes(o.audience.type) || (o.audience.type = "topic"), o.audience.type === "topic" && !o.audience.topic_name && (o.audience.topic_name = "default"), o;
}
const Yt = 1e5;
function Gt(a, o) {
  var g, k, C;
  const c = [], p = o ?? a.audience.estimated_reach;
  return p !== void 0 && p >= Yt && c.push({
    message: `Estimated reach is very high (${p.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), a.tracking && !((g = a.tracking.campaign_name) != null && g.trim()) && !((k = a.name) != null && k.trim()) && c.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (C = a.message.deep_link) != null && C.trim() || c.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), c;
}
function Rt(a, o = "error") {
  return { message: a, severity: o };
}
function Pt(a) {
  const o = [];
  return a.schema_version || o.push(Rt("Missing schema_version")), {
    valid: o.length === 0,
    errors: o
  };
}
function Jt(a, o) {
  const c = Pt(a), p = Gt(a, o);
  return {
    valid: c.valid,
    errors: [
      ...c.errors,
      ...p.map((g) => Rt(g.message, g.severity))
    ]
  };
}
function Xt(a) {
  return a.errors.filter((o) => o.severity === "error");
}
function Qt(a) {
  return a.errors.filter((o) => o.severity !== "error");
}
function Zt(a) {
  const o = String(a ?? "").trim().toLowerCase();
  return o === "authentication" ? "AUTHENTICATION" : o === "utility" ? "UTILITY" : "MARKETING";
}
function ea(a, o = "template_message") {
  return (String(a ?? "").trim() || o).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || o;
}
function ta(a) {
  const o = String(a.header_type ?? "").trim().toLowerCase();
  if (o === "image")
    return "IMAGE";
  if (o === "video")
    return "VIDEO";
  if (o === "document")
    return "DOCUMENT";
  if (o === "text")
    return "TEXT";
  const c = String(a.template_type ?? "").trim().toLowerCase();
  return c === "image" ? "IMAGE" : c === "video" ? "VIDEO" : c === "document" ? "DOCUMENT" : null;
}
function nt(a, o = []) {
  if (!a)
    return { text: "", varOrder: [...o] };
  const c = [...o], p = /* @__PURE__ */ new Map();
  return c.forEach((k, C) => p.set(k, C + 1)), { text: a.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (k, C) => (p.has(C) || (p.set(C, c.length + 1), c.push(C)), `{{${p.get(C)}}}`)), varOrder: c };
}
function ct(a, o) {
  return a.map((c) => {
    const p = o == null ? void 0 : o[c];
    return typeof p == "string" && p.length > 0 ? p : `sample_${c}`;
  });
}
function aa(a, o) {
  const c = [];
  let p = [...o];
  return { buttons: a.slice(0, 10).map((k) => {
    const C = k, x = String(C.type ?? "quick_reply").trim().toLowerCase(), S = String(C.label ?? "").trim() || "Button";
    if (x === "url") {
      const I = nt(String(C.url ?? ""), p);
      return p = I.varOrder, { type: "URL", text: S, url: I.text || void 0 };
    }
    return x === "call" ? {
      type: "PHONE_NUMBER",
      text: S,
      phone_number: String(C.phone ?? "").trim() || void 0
    } : x === "opt_out" ? (c.push("Opt-out button is provider-specific; mapped as QUICK_REPLY."), { type: "QUICK_REPLY", text: S }) : { type: "QUICK_REPLY", text: S };
  }).filter((k) => !!k.text), varOrder: p, warnings: c };
}
function pt(a) {
  const o = {}, c = [
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
  for (const p of c)
    a[p] !== void 0 && a[p] !== null && a[p] !== "" && (o[p] = a[p]);
  return Object.keys(o).length ? o : void 0;
}
function sa(a, o = {}) {
  const c = [], p = a.message, g = [], k = ea(p.template_name ?? a.name, a.name || "template_message"), C = Zt(p.template_category), x = String(p.template_language ?? "en_US").trim() || "en_US";
  let S = [];
  const I = ta(p), V = String(p.header ?? "").trim();
  if (I === "TEXT" && V) {
    const G = nt(V, S);
    S = G.varOrder;
    const M = ct(S, o.exampleData);
    g.push({
      type: "HEADER",
      format: "TEXT",
      text: G.text,
      ...M.length ? { example: { header_text: M } } : {}
    });
  } else I && I !== "TEXT" && (g.push({ type: "HEADER", format: I }), p.media_url || c.push(`Header format ${I} selected but media_url is empty.`));
  const H = String(p.body ?? "").trim(), z = nt(H, S);
  S = z.varOrder;
  const Y = ct(S, o.exampleData);
  g.push({
    type: "BODY",
    text: z.text,
    ...Y.length ? { example: { body_text: [Y] } } : {}
  });
  const O = String(p.footer ?? "").trim();
  O && g.push({
    type: "FOOTER",
    text: O
  });
  const ce = Array.isArray(p.buttons) ? p.buttons : [];
  if (ce.length) {
    const G = aa(ce, S);
    S = G.varOrder, c.push(...G.warnings), G.buttons.length && g.push({ type: "BUTTONS", buttons: G.buttons });
  }
  const X = String(p.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(X) && c.push(`template_type="${X}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: k,
      category: C,
      language: x,
      components: g
    },
    warnings: c
  };
}
function mt(a, o = {}) {
  var V, H, z, Y;
  const c = sa(a, o), p = a.message, g = c.payload.components.find((O) => O.type === "HEADER"), k = c.payload.components.find((O) => O.type === "BODY"), C = c.payload.components.find((O) => O.type === "FOOTER"), x = c.payload.components.find((O) => O.type === "BUTTONS"), S = (() => {
    const O = String(p.template_type ?? "").trim().toLowerCase();
    return O === "image" ? "IMAGE" : O === "video" ? "VIDEO" : O === "document" ? "DOCUMENT" : "TEXT";
  })();
  return { payload: {
    elementName: c.payload.name,
    languageCode: c.payload.language,
    category: c.payload.category,
    templateType: S,
    content: (k == null ? void 0 : k.text) ?? "",
    ...(g == null ? void 0 : g.format) === "TEXT" && g.text ? { header: g.text } : {},
    ...C != null && C.text ? { footer: C.text } : {},
    ...(V = x == null ? void 0 : x.buttons) != null && V.length ? {
      buttons: x.buttons.map((O) => ({
        type: O.type,
        title: O.text,
        ...O.url ? { url: O.url } : {},
        ...O.phone_number ? { phoneNumber: O.phone_number } : {}
      }))
    } : {},
    ...(Y = (z = (H = k == null ? void 0 : k.example) == null ? void 0 : H.body_text) == null ? void 0 : z[0]) != null && Y.length ? { example: k.example.body_text[0] } : {},
    metaTemplate: c.payload,
    ...pt(p) ? { advanced: pt(p) } : {}
  }, warnings: c.warnings };
}
function Me(a, o) {
  return a.length <= o ? { text: a, truncated: !1 } : { text: a.slice(0, Math.max(0, o - 3)) + "...", truncated: !0 };
}
const Ye = Ge.android;
function na(a) {
  const { title: o, body: c } = a, p = Me(o || "", Ye.title), g = Me(c || "", Ye.body);
  return {
    title: p.text,
    body: g.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: g.truncated,
    expanded: !1
  };
}
function la(a) {
  const { title: o, body: c } = a, p = Me(o || "", Ye.title), g = Me(c || "", Ye.body);
  return {
    title: p.text,
    body: g.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: g.truncated,
    expanded: !0
  };
}
function oa(a, o = {}) {
  const c = o.expanded ? la(a) : na(a);
  return o.darkMode !== void 0 && (c.darkMode = o.darkMode), c;
}
const vt = Ge.ios;
function Et(a) {
  const { title: o, body: c } = a, p = Me(o || "", vt.title), g = Me(c || "", vt.body);
  return {
    title: p.text,
    body: g.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: g.truncated,
    expanded: !1
  };
}
function ia(a) {
  return Et(a);
}
function ra(a, o = {}) {
  const c = o.variant === "lockscreen" ? ia(a) : Et(a);
  return o.darkMode !== void 0 && (c.darkMode = o.darkMode), c;
}
const bt = Ge.web;
function ft(a) {
  const { title: o, body: c } = a, p = Me(o || "", bt.title), g = Me(c || "", bt.body);
  return {
    title: p.text,
    body: g.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: g.truncated
  };
}
function da(a) {
  return a.map((o) => ({ message: o, severity: "error" }));
}
function Ze(a) {
  return JSON.parse(JSON.stringify(a));
}
function Je(a = {}) {
  const o = ne(
    Lt(a.initial ?? Kt())
  ), c = a.hooks ?? {}, p = ne(!1), g = ne([]);
  Be(
    o,
    () => {
      if (!c.customValidators) {
        g.value = [];
        return;
      }
      c.customValidators(o.value).then((U) => {
        g.value = U;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const k = ne([]), C = ne([]);
  function x() {
    const U = Ze(o.value);
    k.value = [...k.value.slice(-19), U], C.value = [];
  }
  const S = $(() => k.value.length > 0), I = $(() => C.value.length > 0);
  function V() {
    k.value.length !== 0 && (C.value = [Ze(o.value), ...C.value], o.value = k.value[k.value.length - 1], k.value = k.value.slice(0, -1));
  }
  function H() {
    C.value.length !== 0 && (k.value = [...k.value, Ze(o.value)], o.value = C.value[0], C.value = C.value.slice(1));
  }
  Be(
    o,
    () => {
      var U;
      p.value = !0, (U = a.onDirty) == null || U.call(a);
    },
    { deep: !0 }
  );
  const z = $(() => Pt(o.value));
  function Y(U) {
    const oe = Jt(o.value, U), te = da(g.value), L = [...Xt(oe), ...te], he = [...oe.errors, ...te], ve = oe.valid && te.length === 0;
    return {
      ...oe,
      errors: he,
      valid: ve,
      blockingErrors: L,
      warnings: Qt(oe)
    };
  }
  function O(U) {
    x(), o.value = { ...o.value, ...U };
  }
  function ce(U) {
    x(), o.value = {
      ...o.value,
      audience: { ...o.value.audience, ...U }
    };
  }
  function X(U) {
    x(), o.value = {
      ...o.value,
      message: { ...o.value.message, ...U }
    };
  }
  function G(U) {
    x(), o.value = {
      ...o.value,
      delivery: { ...o.value.delivery, ...U }
    };
  }
  function M(U) {
    x(), o.value = {
      ...o.value,
      tracking: o.value.tracking ? { ...o.value.tracking, ...U } : { campaign_name: "", tags: [], ab_test: !1, ...U }
    };
  }
  function de(U) {
    x(), o.value = {
      ...o.value,
      message: { ...it(), ...U }
    };
  }
  function be(U) {
    x(), o.value = {
      ...o.value,
      delivery: { ...rt(), ...U }
    };
  }
  function $e(U) {
    x(), o.value = {
      ...o.value,
      tracking: { ...dt(), ...U }
    };
  }
  function fe(U) {
    x(), o.value = {
      ...o.value,
      audience: { ...ot(), ...U }
    };
  }
  const ae = $(() => ({
    title: o.value.message.title,
    body: o.value.message.body,
    imageUrl: o.value.message.image_url
  }));
  function J(U, oe) {
    const te = ae.value;
    let L;
    switch (U) {
      case "android":
        L = oa(te, { expanded: oe == null ? void 0 : oe.expanded });
        break;
      case "ios":
        L = ra(te);
        break;
      case "web":
        L = ft(te);
        break;
      default:
        L = ft(te);
    }
    const he = o.value.message.actions ?? [], ve = o.value.message.location;
    return { ...L, actions: he, location: ve ?? void 0 };
  }
  const b = Ge;
  async function A() {
    return c.customValidators ? c.customValidators(o.value) : [];
  }
  return {
    campaign: o,
    dirty: p,
    validation: z,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: g,
    getValidationWithWarnings: Y,
    update: O,
    updateAudience: ce,
    updateMessage: X,
    updateDelivery: G,
    updateTracking: M,
    undo: V,
    redo: H,
    canUndo: S,
    canRedo: I,
    resetMessage: de,
    resetDelivery: be,
    resetTracking: $e,
    resetAudience: fe,
    getPreview: J,
    previewInput: ae,
    characterLimits: b,
    runCustomValidators: A,
    hooks: c
  };
}
const ua = "keos-draft", ca = 2e3;
function pa(a, o) {
  return `${ua}-${a}-${o}`;
}
function Xe(a, o) {
  const c = o.channel, p = $(
    () => {
      var V, H;
      return pa(
        c,
        o.key ?? ((V = a.value) == null ? void 0 : V.id) ?? ((H = a.value) == null ? void 0 : H.name) ?? "draft"
      );
    }
  ), g = ne(null);
  let k = null;
  function C() {
    try {
      const V = JSON.stringify(a.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(p.value, V), g.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function x() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(p.value);
    } catch {
    }
  }
  function S() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const V = window.localStorage.getItem(p.value);
      if (!V) return null;
      const H = JSON.parse(V);
      return Lt(H);
    } catch {
      return null;
    }
  }
  function I() {
    return o.enabled === void 0 ? !0 : typeof o.enabled == "boolean" ? o.enabled : o.enabled.value;
  }
  return Be(
    a,
    () => {
      I() && (k && clearTimeout(k), k = setTimeout(() => {
        k = null, C();
      }, ca));
    },
    { deep: !0 }
  ), {
    lastSavedAt: g,
    clearDraft: x,
    getDraft: S,
    persist: C
  };
}
const ma = { class: "kb-header__row" }, va = ["value"], ba = { class: "kb-header__actions" }, fa = ["disabled"], ga = ["disabled"], ya = ["value"], ha = ["value"], ka = /* @__PURE__ */ Ie({
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
  setup(a, { emit: o }) {
    const c = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], p = a, g = o, k = () => !!(p.campaignName || "").trim();
    function C(I) {
      return p.slugifyName ? I.trim().replace(/\s+/g, "-") : I;
    }
    function x(I) {
      return I.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function S(I) {
      const V = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return V[I] ?? V.draft;
    }
    return (I, V) => (s(), n("header", {
      class: "kb-header",
      style: me({
        padding: `${f(pe)[16]}px 0`,
        borderBottom: `1px solid ${f(we).neutral.border}`,
        marginBottom: `${f(pe)[16]}px`
      })
    }, [
      e("div", ma, [
        e("div", {
          class: ue(["kb-header__name-section", { "kb-header__name-section--filled": k() }])
        }, [
          V[4] || (V[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: a.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: V[0] || (V[0] = (H) => g("update:campaignName", C(H.target.value))),
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
            disabled: !a.canUndo,
            onClick: V[1] || (V[1] = (H) => g("undo"))
          }, " Undo ", 8, fa),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !a.canRedo,
            onClick: V[2] || (V[2] = (H) => g("redo"))
          }, " Redo ", 8, ga)
        ]),
        a.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: a.workflowStatus,
          class: "kb-header__status-select",
          style: me({
            padding: `${f(pe)[4]}px ${f(pe)[8]}px`,
            borderRadius: `${f(Ve).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...S(a.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: V[3] || (V[3] = (H) => g("update:workflowStatus", H.target.value))
        }, [
          (s(), n(F, null, j(c, (H) => e("option", {
            key: H.value,
            value: H.value
          }, d(H.label), 9, ha)), 64))
        ], 44, ya)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: me({
            padding: `${f(pe)[4]}px ${f(pe)[8]}px`,
            borderRadius: `${f(Ve).input}px`,
            background: f(we).neutral.bg,
            fontSize: "0.8125rem",
            color: f(we).neutral.textMuted
          })
        }, d(a.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: me({ fontSize: "0.8125rem", color: f(we).neutral.textMuted, marginTop: `${f(pe)[4]}px` })
      }, [
        a.saving ? (s(), n(F, { key: 0 }, [
          ee("Saving…")
        ], 64)) : a.dirty ? (s(), n(F, { key: 1 }, [
          ee("Unsaved changes")
        ], 64)) : a.lastSavedAt ? (s(), n(F, { key: 2 }, [
          ee("Last saved at " + d(x(a.lastSavedAt)), 1)
        ], 64)) : w("", !0)
      ], 4)
    ], 4));
  }
}), Ae = (a, o) => {
  const c = a.__vccOpts || a;
  for (const [p, g] of o)
    c[p] = g;
  return c;
}, Qe = /* @__PURE__ */ Ae(ka, [["__scopeId", "data-v-56efb3ec"]]), _a = { class: "kb-section" }, wa = { class: "kb-section__head" }, $a = { class: "kb-section__desc" }, xa = { class: "kb-field" }, Ca = { class: "kb-label" }, Sa = { class: "kb-field-with-rail" }, Ia = ["value", "aria-invalid", "aria-describedby"], Aa = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, Ta = { class: "kb-field" }, Ba = { class: "kb-label" }, Ua = { class: "kb-field-with-rail" }, La = ["value", "aria-invalid", "aria-describedby"], Ra = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, Pa = { class: "kb-field" }, Ea = ["value", "aria-invalid", "aria-describedby"], Oa = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Na = { class: "kb-field" }, Va = ["value", "aria-invalid", "aria-describedby"], Ma = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Da = { class: "kb-field" }, Wa = { class: "kb-location-row" }, Ha = ["value"], za = ["value"], Fa = ["value"], qa = ["value"], ja = { class: "kb-field" }, Ka = { class: "kb-actions-list" }, Ya = ["value", "onInput"], Ga = ["value", "onInput"], Ja = ["onClick"], Xa = ["disabled"], Qa = { class: "kb-action-chips" }, Za = ["disabled", "onClick"], es = /* @__PURE__ */ Ie({
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
    const o = a;
    return (c, p) => {
      var g, k, C, x;
      return s(), n("section", _a, [
        e("div", wa, [
          p[10] || (p[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (S) => c.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        e("p", $a, " Message body is required. Title is optional. Character limits depend on the selected platform (" + d(a.selectedPlatform) + "). ", 1),
        e("div", xa, [
          e("label", Ca, [
            p[11] || (p[11] = ee(" Title ", -1)),
            e("span", {
              class: ue(["kb-counter", { "kb-counter--warn": a.titleCount > a.titleLimit }])
            }, d(a.titleCount) + "/" + d(a.titleLimit), 3)
          ]),
          e("div", Sa, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: a.message.title,
              "aria-invalid": !!a.titleError,
              "aria-describedby": a.titleError ? "title-error" : void 0,
              onInput: p[1] || (p[1] = (S) => c.$emit("update", { title: S.target.value }))
            }, null, 40, Ia),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: me({ "--pct": Math.min(100, a.titleCount / a.titleLimit * 100) + "%" })
            }, [...p[12] || (p[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.titleError ? (s(), n("p", Aa, d(a.titleError), 1)) : w("", !0)
        ]),
        e("div", Ta, [
          e("label", Ba, [
            p[13] || (p[13] = ee(" Message ", -1)),
            e("span", {
              class: ue(["kb-counter", { "kb-counter--warn": a.bodyCount > a.bodyLimit }])
            }, d(a.bodyCount) + "/" + d(a.bodyLimit), 3)
          ]),
          e("div", Ua, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: a.message.body,
              "aria-invalid": !!a.bodyError,
              "aria-describedby": a.bodyError ? "body-error" : void 0,
              onInput: p[2] || (p[2] = (S) => c.$emit("update", { body: S.target.value }))
            }, null, 40, La),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: me({ "--pct": Math.min(100, a.bodyCount / a.bodyLimit * 100) + "%" })
            }, [...p[14] || (p[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.bodyError ? (s(), n("p", Ra, d(a.bodyError), 1)) : w("", !0)
        ]),
        e("div", Pa, [
          p[15] || (p[15] = e("label", { class: "kb-label" }, [
            ee(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: a.message.image_url,
            "aria-invalid": !!a.imageUrlError,
            "aria-describedby": a.imageUrlError ? "image-url-error" : void 0,
            onInput: p[3] || (p[3] = (S) => c.$emit("update", { image_url: S.target.value || void 0 }))
          }, null, 40, Ea),
          a.imageUrlError ? (s(), n("p", Oa, d(a.imageUrlError), 1)) : w("", !0)
        ]),
        e("div", Na, [
          p[16] || (p[16] = e("label", { class: "kb-label" }, [
            ee(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: a.message.deep_link,
            "aria-invalid": !!a.deepLinkError,
            "aria-describedby": a.deepLinkError ? "deeplink-error" : void 0,
            onInput: p[4] || (p[4] = (S) => c.$emit("update", { deep_link: S.target.value || void 0 }))
          }, null, 40, Va),
          a.deepLinkError ? (s(), n("p", Ma, d(a.deepLinkError), 1)) : w("", !0)
        ]),
        e("div", Da, [
          p[17] || (p[17] = e("label", { class: "kb-label" }, [
            ee(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Wa, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((g = a.message.location) == null ? void 0 : g.lat) ?? "",
              onInput: p[5] || (p[5] = (S) => {
                const I = { ...a.message.location ?? {} }, V = S.target.value;
                I.lat = V === "" ? void 0 : Number(V), c.$emit("update", { location: I });
              })
            }, null, 40, Ha),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((k = a.message.location) == null ? void 0 : k.lon) ?? "",
              onInput: p[6] || (p[6] = (S) => {
                const I = { ...a.message.location ?? {} }, V = S.target.value;
                I.lon = V === "" ? void 0 : Number(V), c.$emit("update", { location: I });
              })
            }, null, 40, za)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((C = a.message.location) == null ? void 0 : C.name) ?? "",
            onInput: p[7] || (p[7] = (S) => {
              const I = { ...a.message.location ?? {} };
              I.name = S.target.value || void 0, c.$emit("update", { location: I });
            })
          }, null, 40, Fa),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((x = a.message.location) == null ? void 0 : x.address) ?? "",
            onInput: p[8] || (p[8] = (S) => {
              const I = { ...a.message.location ?? {} };
              I.address = S.target.value || void 0, c.$emit("update", { location: I });
            })
          }, null, 40, qa)
        ]),
        e("div", ja, [
          p[19] || (p[19] = e("label", { class: "kb-label" }, [
            ee(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Ka, [
            (s(!0), n(F, null, j(o.message.actions ?? [], (S, I) => (s(), n("div", {
              key: S.id || I,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: S.label,
                onInput: (V) => {
                  var Y;
                  const H = [...o.message.actions ?? []], z = Number(I);
                  H[z] = {
                    ...H[z],
                    id: ((Y = H[z]) == null ? void 0 : Y.id) || `action_${z + 1}`,
                    label: V.target.value
                  }, c.$emit("update", { actions: H });
                }
              }, null, 40, Ya),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: S.url,
                onInput: (V) => {
                  var Y;
                  const H = [...o.message.actions ?? []], z = Number(I);
                  H[z] = {
                    ...H[z],
                    id: ((Y = H[z]) == null ? void 0 : Y.id) || `action_${z + 1}`,
                    url: V.target.value || void 0
                  }, c.$emit("update", { actions: H });
                }
              }, null, 40, Ga),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const V = [...o.message.actions ?? []];
                  V.splice(Number(I), 1), c.$emit("update", { actions: V });
                }
              }, " Remove ", 8, Ja)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (o.message.actions ?? []).length >= 3,
              onClick: p[9] || (p[9] = () => {
                const S = [...o.message.actions ?? []];
                S.push({
                  id: `action_${S.length + 1}`,
                  label: "",
                  url: ""
                }), c.$emit("update", { actions: S });
              })
            }, " Add action ", 8, Xa),
            e("div", Qa, [
              p[18] || (p[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (s(), n(F, null, j(["View order", "Track shipment", "Open app"], (S) => e("button", {
                key: S,
                type: "button",
                class: "kb-action-chip",
                disabled: (o.message.actions ?? []).length >= 3,
                onClick: () => {
                  const I = [...o.message.actions ?? []];
                  I.push({
                    id: `action_${Date.now()}`,
                    label: S,
                    url: ""
                  }), c.$emit("update", { actions: I });
                }
              }, d(S), 9, Za)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ts = /* @__PURE__ */ Ae(es, [["__scopeId", "data-v-88ad2281"]]), as = { class: "kb-section kb-section--inline-personalization" }, ss = { class: "kb-field" }, ns = { class: "kb-insert-row" }, ls = ["value"], os = { class: "kb-field" }, is = { class: "kb-insert-row" }, rs = { class: "kb-field" }, ds = { class: "kb-variable-list" }, us = /* @__PURE__ */ Ie({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(a, { emit: o }) {
    const c = a, p = o, g = ["first_name", "last_name", "order_id", "city"], k = ne(c.variableOptions ?? g), C = ne(k.value[0] ?? g[0]), x = ne("");
    Be(
      () => c.variableOptions,
      (H) => {
        H && H.length && (k.value = [...H], k.value.includes(C.value) || (C.value = k.value[0]));
      }
    );
    const S = $(() => k.value);
    function I(H) {
      p("insertVariable", { variable: C.value, field: H });
    }
    function V() {
      const H = x.value.trim();
      H && (k.value.includes(H) || (k.value = [...k.value, H]), C.value = H, x.value = "");
    }
    return (H, z) => (s(), n("section", as, [
      z[8] || (z[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      z[9] || (z[9] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", ss, [
        z[4] || (z[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", ns, [
          Le(e("select", {
            "onUpdate:modelValue": z[0] || (z[0] = (Y) => C.value = Y),
            class: "kb-select"
          }, [
            (s(!0), n(F, null, j(S.value, (Y) => (s(), n("option", {
              key: Y,
              value: Y
            }, d(Y), 9, ls))), 128))
          ], 512), [
            [Ee, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z[1] || (z[1] = (Y) => I("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z[2] || (z[2] = (Y) => I("body"))
          }, "Into message")
        ])
      ]),
      e("div", os, [
        z[5] || (z[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", is, [
          Le(e("input", {
            "onUpdate:modelValue": z[3] || (z[3] = (Y) => x.value = Y),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [lt, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: V
          }, " Add ")
        ])
      ]),
      e("div", rs, [
        z[6] || (z[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        z[7] || (z[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", ds, [
          (s(!0), n(F, null, j(S.value, (Y) => (s(), n("li", { key: Y }, [
            e("code", null, "{{ ." + d(Y) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Ot = /* @__PURE__ */ Ae(us, [["__scopeId", "data-v-9d88edb5"]]), cs = { class: "kb-section kb-section--template-type" }, ps = { class: "kb-field" }, ms = { class: "kb-radio-group" }, vs = { class: "kb-radio" }, bs = ["checked"], fs = { class: "kb-radio" }, gs = ["checked"], ys = /* @__PURE__ */ Ie({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(a, { emit: o }) {
    const c = o;
    return (p, g) => (s(), n("section", cs, [
      g[5] || (g[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      g[6] || (g[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", ps, [
        e("div", ms, [
          e("label", vs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: a.templateType === "transactional",
              onChange: g[0] || (g[0] = (k) => c("update", "transactional"))
            }, null, 40, bs),
            g[2] || (g[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", fs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: a.templateType === "marketing",
              onChange: g[1] || (g[1] = (k) => c("update", "marketing"))
            }, null, 40, gs),
            g[3] || (g[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        g[4] || (g[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), ut = /* @__PURE__ */ Ae(ys, [["__scopeId", "data-v-ff2e1bd8"]]), hs = { class: "kb-section" }, ks = { class: "kb-section__head" }, _s = { class: "kb-section__desc" }, ws = { class: "kb-field" }, $s = { class: "kb-radio-group" }, xs = { class: "kb-radio" }, Cs = ["checked"], Ss = { class: "kb-radio" }, Is = ["checked"], As = {
  key: 0,
  class: "kb-field kb-row"
}, Ts = ["value"], Bs = ["value"], Us = { class: "kb-field" }, Ls = ["value"], Rs = ["value"], Ps = { class: "kb-field" }, Es = ["value"], Os = ["value"], Ns = { class: "kb-field" }, Vs = { class: "kb-checkbox" }, Ms = ["checked"], Ds = /* @__PURE__ */ Ie({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a) {
    const o = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (c, p) => {
      var g;
      return s(), n("section", hs, [
        e("div", ks, [
          p[8] || (p[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (k) => c.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        e("p", _s, d(a.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ws, [
          p[11] || (p[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", $s, [
            e("label", xs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !a.delivery.scheduled_at,
                onChange: p[1] || (p[1] = (k) => c.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Cs),
              p[9] || (p[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Ss, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!a.delivery.scheduled_at,
                onChange: p[2] || (p[2] = (k) => c.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Is),
              p[10] || (p[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        a.delivery.scheduled_at ? (s(), n("div", As, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (g = a.delivery.scheduled_at) == null ? void 0 : g.slice(0, 16),
            onInput: p[3] || (p[3] = (k) => c.$emit("update", { scheduled_at: k.target.value }))
          }, null, 40, Ts),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: a.delivery.timezone,
            onInput: p[4] || (p[4] = (k) => c.$emit("update", { timezone: k.target.value }))
          }, null, 40, Bs)
        ])) : w("", !0),
        a.showPushOptions ? (s(), n(F, { key: 1 }, [
          e("div", Us, [
            p[12] || (p[12] = e("label", { class: "kb-label" }, [
              ee(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.ttl,
              onChange: p[5] || (p[5] = (k) => c.$emit("update", { ttl: Number(k.target.value) }))
            }, [
              (s(!0), n(F, null, j(f(qt), (k) => (s(), n("option", {
                key: k,
                value: k
              }, d(o[k] ?? k + "s"), 9, Rs))), 128))
            ], 40, Ls)
          ]),
          e("div", Ps, [
            p[13] || (p[13] = e("label", { class: "kb-label" }, [
              ee(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.priority,
              onChange: p[6] || (p[6] = (k) => c.$emit("update", { priority: k.target.value }))
            }, [
              (s(!0), n(F, null, j(f(Tt), (k) => (s(), n("option", {
                key: k,
                value: k
              }, d(k), 9, Os))), 128))
            ], 40, Es)
          ]),
          e("div", Ns, [
            e("label", Vs, [
              e("input", {
                type: "checkbox",
                checked: a.delivery.quiet_hours,
                onChange: p[7] || (p[7] = (k) => c.$emit("update", { quiet_hours: !a.delivery.quiet_hours }))
              }, null, 40, Ms),
              p[14] || (p[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : w("", !0)
      ]);
    };
  }
}), Ws = /* @__PURE__ */ Ae(Ds, [["__scopeId", "data-v-5707a2a7"]]), Hs = { class: "kb-accordion" }, zs = { class: "kb-accordion__body" }, Fs = { class: "kb-field" }, qs = ["value"], js = { class: "kb-field" }, Ks = { class: "kb-checkbox" }, Ys = ["checked"], Gs = /* @__PURE__ */ Ie({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(a) {
    return (o, c) => (s(), n("details", Hs, [
      c[4] || (c[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", zs, [
        e("div", Fs, [
          c[2] || (c[2] = e("label", { class: "kb-label" }, [
            ee(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: a.delivery.collapse_key,
            onInput: c[0] || (c[0] = (p) => o.$emit("update", { collapse_key: p.target.value || void 0 }))
          }, null, 40, qs)
        ]),
        e("div", js, [
          e("label", Ks, [
            e("input", {
              type: "checkbox",
              checked: a.delivery.silent_push,
              onChange: c[1] || (c[1] = (p) => o.$emit("update", { silent_push: !a.delivery.silent_push }))
            }, null, 40, Ys),
            c[3] || (c[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Js = /* @__PURE__ */ Ae(Gs, [["__scopeId", "data-v-699e4501"]]);
function Ne(a, o) {
  return !a || typeof a != "string" ? a : a.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (c, p) => {
    const k = String(p).trim().replace(/^\./, "");
    return k in o ? String(o[k]) : c;
  });
}
const De = [
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
}, fn = { class: "kb-ios-banner" }, gn = { class: "kb-ios-content" }, yn = {
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
}, Bn = {
  key: 1,
  class: "kb-web-text"
}, Un = {
  key: 3,
  class: "kb-web-image"
}, Ln = ["src"], Rn = {
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
}, Vn = /* @__PURE__ */ Ie({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(a) {
    const o = a, c = ne("shade"), p = ne("banner"), g = ne("toast"), k = $(() => c.value === "expanded"), C = $(
      () => o.getPreview(o.selectedPlatform, {
        expanded: o.selectedPlatform === "android" ? k.value : void 0
      })
    ), x = $(() => {
      const J = C.value;
      return o.previewProfile ? {
        ...J,
        title: Ne((J == null ? void 0 : J.title) ?? "", o.previewProfile.data),
        body: Ne((J == null ? void 0 : J.body) ?? "", o.previewProfile.data)
      } : J;
    }), S = {
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
    function I(J, b) {
      const A = (J ?? "").trim();
      return A ? A.length <= b ? A : `${A.slice(0, Math.max(0, b - 1)).trimEnd()}…` : "";
    }
    const V = $(() => o.selectedPlatform === "android" ? c.value : o.selectedPlatform === "ios" ? p.value : g.value), H = $(() => (S[o.selectedPlatform] ?? S.web)[V.value] ?? { title: 60, body: 160 }), z = $(
      () => {
        var J;
        return I((J = x.value) == null ? void 0 : J.title, H.value.title);
      }
    ), Y = $(
      () => {
        var J;
        return I((J = x.value) == null ? void 0 : J.body, H.value.body);
      }
    ), O = { android: 3, ios: 4, web: 2 }, ce = $(
      () => {
        var J;
        return Array.isArray((J = x.value) == null ? void 0 : J.actions) ? x.value.actions : [];
      }
    ), X = $(
      () => ce.value.slice(0, O[o.selectedPlatform] ?? 2)
    ), G = $(
      () => Math.max(0, ce.value.length - X.value.length)
    ), M = $(() => {
      var J;
      return (((J = o.message) == null ? void 0 : J.deep_link) ?? "").trim();
    }), de = $(() => M.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(M.value) : !1), be = $(() => M.value ? M.value.length <= 40 ? M.value : `${M.value.slice(0, 37)}…` : ""), $e = $(() => {
      var b, A, U;
      const J = [];
      return (b = o.delivery) != null && b.priority && J.push(`Priority: ${o.delivery.priority}`), typeof ((A = o.delivery) == null ? void 0 : A.ttl) == "number" && J.push(`TTL: ${o.delivery.ttl}s`), (U = o.delivery) != null && U.silent_push && J.push("Silent push"), J;
    }), fe = $(() => {
      var te;
      const J = (te = x.value) == null ? void 0 : te.location;
      if (!J || J.lat == null && J.lon == null) return null;
      const b = Number(J.lat) || 0, A = Number(J.lon) || 0, U = 8e-3, oe = [A - U, b - U, A + U, b + U].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(oe)}&layer=mapnik&marker=${b},${A}`;
    }), ae = $(() => {
      var b;
      const J = (b = x.value) == null ? void 0 : b.location;
      return J && (J.lat != null || J.lon != null || J.name || J.address);
    });
    return (J, b) => {
      var A, U, oe, te, L, he, ve, xe, ke, R, y, B, Z, le, ge, re;
      return s(), n("div", Xs, [
        e("div", Qs, [
          e("label", Zs, [
            b[6] || (b[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            a.selectedPlatform === "android" ? Le((s(), n("select", {
              key: 0,
              "onUpdate:modelValue": b[0] || (b[0] = (se) => c.value = se),
              class: "kb-preview__mode-select"
            }, [...b[3] || (b[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ee, c.value]
            ]) : a.selectedPlatform === "ios" ? Le((s(), n("select", {
              key: 1,
              "onUpdate:modelValue": b[1] || (b[1] = (se) => p.value = se),
              class: "kb-preview__mode-select"
            }, [...b[4] || (b[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ee, p.value]
            ]) : Le((s(), n("select", {
              key: 2,
              "onUpdate:modelValue": b[2] || (b[2] = (se) => g.value = se),
              class: "kb-preview__mode-select"
            }, [...b[5] || (b[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ee, g.value]
            ])
          ]),
          e("div", en, [
            (s(!0), n(F, null, j($e.value, (se) => (s(), n("span", {
              key: se,
              class: "kb-preview__badge"
            }, d(se), 1))), 128))
          ])
        ]),
        a.selectedPlatform === "android" ? (s(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: ue(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${c.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          b[9] || (b[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ue(["kb-android-notification", { "kb-android-notification--expanded": k.value }])
          }, [
            b[8] || (b[8] = He('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: ue(["kb-android-body", { "kb-android-body--expanded": k.value }])
            }, [
              k.value && x.value.imageUrl ? (s(), n("div", tn, [
                e("img", {
                  src: x.value.imageUrl,
                  alt: ""
                }, null, 8, an)
              ])) : w("", !0),
              e("div", sn, [
                e("div", nn, [
                  z.value ? (s(), n("div", ln, d(z.value), 1)) : w("", !0),
                  Y.value ? (s(), n("div", on, d(Y.value), 1)) : w("", !0),
                  ae.value && !k.value && ((A = x.value.location) != null && A.name || (U = x.value.location) != null && U.address) ? (s(), n("div", rn, [
                    b[7] || (b[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    ee(" " + d(((oe = x.value.location) == null ? void 0 : oe.name) || ((te = x.value.location) == null ? void 0 : te.address)), 1)
                  ])) : w("", !0),
                  M.value ? (s(), n("div", {
                    key: 3,
                    class: ue(["kb-preview-link", { "kb-preview-link--invalid": !de.value }])
                  }, d(de.value ? be.value : "Invalid deep link format"), 3)) : w("", !0)
                ]),
                !k.value && x.value.imageUrl ? (s(), n("div", dn, [
                  e("img", {
                    src: x.value.imageUrl,
                    alt: ""
                  }, null, 8, un)
                ])) : w("", !0)
              ]),
              ae.value && fe.value && k.value ? (s(), n("div", cn, [
                e("iframe", {
                  src: fe.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                (L = x.value.location) != null && L.name || (he = x.value.location) != null && he.address ? (s(), n("div", mn, d(((ve = x.value.location) == null ? void 0 : ve.name) || ((xe = x.value.location) == null ? void 0 : xe.address)), 1)) : w("", !0)
              ])) : w("", !0),
              X.value.length ? (s(), n("div", vn, [
                (s(!0), n(F, null, j(X.value, (se) => (s(), n("button", {
                  key: se.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, d(se.label || "Action"), 1))), 128))
              ])) : w("", !0),
              G.value > 0 ? (s(), n("p", bn, " Showing " + d(X.value.length) + " of " + d(ce.value.length) + " actions on " + d(a.selectedPlatform) + ". ", 1)) : w("", !0)
            ], 2)
          ], 2)
        ], 2)) : a.selectedPlatform === "ios" ? (s(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: ue(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${p.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          b[12] || (b[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", fn, [
            b[11] || (b[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", gn, [
              b[10] || (b[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              z.value ? (s(), n("div", yn, d(z.value), 1)) : w("", !0),
              Y.value ? (s(), n("div", hn, d(Y.value), 1)) : w("", !0),
              M.value ? (s(), n("div", {
                key: 2,
                class: ue(["kb-preview-link", { "kb-preview-link--invalid": !de.value }])
              }, d(de.value ? be.value : "Invalid deep link format"), 3)) : w("", !0),
              ae.value && fe.value ? (s(), n("div", kn, [
                e("iframe", {
                  src: fe.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, _n),
                (ke = x.value.location) != null && ke.name || (R = x.value.location) != null && R.address ? (s(), n("div", wn, d(((y = x.value.location) == null ? void 0 : y.name) || ((B = x.value.location) == null ? void 0 : B.address)), 1)) : w("", !0)
              ])) : w("", !0),
              X.value.length ? (s(), n("div", $n, [
                (s(!0), n(F, null, j(X.value, (se) => (s(), n("button", {
                  key: se.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, d(se.label || "Action"), 1))), 128))
              ])) : w("", !0),
              G.value > 0 ? (s(), n("p", xn, " Showing " + d(X.value.length) + " of " + d(ce.value.length) + " actions on " + d(a.selectedPlatform) + ". ", 1)) : w("", !0)
            ]),
            x.value.imageUrl ? (s(), n("div", Cn, [
              e("img", {
                src: x.value.imageUrl,
                alt: ""
              }, null, 8, Sn)
            ])) : w("", !0)
          ])
        ], 2)) : (s(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: ue(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${g.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          b[14] || (b[14] = He('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", In, [
            b[13] || (b[13] = He('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", An, [
              z.value ? (s(), n("div", Tn, d(z.value), 1)) : w("", !0),
              Y.value ? (s(), n("div", Bn, d(Y.value), 1)) : w("", !0),
              M.value ? (s(), n("div", {
                key: 2,
                class: ue(["kb-preview-link", { "kb-preview-link--invalid": !de.value }])
              }, d(de.value ? be.value : "Invalid deep link format"), 3)) : w("", !0),
              x.value.imageUrl ? (s(), n("div", Un, [
                e("img", {
                  src: x.value.imageUrl,
                  alt: ""
                }, null, 8, Ln)
              ])) : w("", !0),
              ae.value && fe.value ? (s(), n("div", Rn, [
                e("iframe", {
                  src: fe.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Pn),
                (Z = x.value.location) != null && Z.name || (le = x.value.location) != null && le.address ? (s(), n("div", En, d(((ge = x.value.location) == null ? void 0 : ge.name) || ((re = x.value.location) == null ? void 0 : re.address)), 1)) : w("", !0)
              ])) : w("", !0)
            ]),
            X.value.length ? (s(), n("div", On, [
              (s(!0), n(F, null, j(X.value, (se, Se) => (s(), n("button", {
                key: se.id || Se,
                type: "button",
                class: ue(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Se) > 0 }])
              }, d(se.label || "Action"), 3))), 128))
            ])) : w("", !0),
            G.value > 0 ? (s(), n("p", Nn, " Showing " + d(X.value.length) + " of " + d(ce.value.length) + " actions on " + d(a.selectedPlatform) + ". ", 1)) : w("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Mn = /* @__PURE__ */ Ae(Vn, [["__scopeId", "data-v-4fc616d9"]]), Dn = { class: "kb-version-dialog" }, Wn = {
  key: 0,
  class: "kb-version-empty"
}, Hn = {
  key: 1,
  class: "kb-version-list"
}, zn = { class: "kb-version-item-label" }, Fn = ["onClick"], qn = { class: "kb-version-actions" }, jn = /* @__PURE__ */ Ie({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(a, { emit: o }) {
    const c = o;
    function p(g) {
      try {
        return new Date(g).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return g;
      }
    }
    return (g, k) => a.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: k[1] || (k[1] = Ht((C) => c("close"), ["escape"]))
    }, [
      e("div", Dn, [
        k[2] || (k[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        k[3] || (k[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        a.versions.length === 0 ? (s(), n("div", Wn, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", Hn, [
          (s(!0), n(F, null, j(a.versions, (C) => (s(), n("li", {
            key: C.id,
            class: "kb-version-item"
          }, [
            e("span", zn, d(C.label || p(C.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (x) => {
                c("restore", C.snapshot), c("close");
              }
            }, " Restore ", 8, Fn)
          ]))), 128))
        ])),
        e("div", qn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: k[0] || (k[0] = (C) => c("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : w("", !0);
  }
}), Nt = /* @__PURE__ */ Ae(jn, [["__scopeId", "data-v-ce35a513"]]), gt = [
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
], yt = [
  {
    id: "otp",
    label: "OTP",
    campaign: {
      message: {
        title: "",
        body: "Your code is {{ .otp_code }}. Valid for 10 minutes.",
        variables: [],
        template_type: "auth",
        template_category: "authentication",
        template_name: "otp_verification",
        auth_type: "otp",
        auth_label: "Your verification code is {{ .otp_code }}"
      }
    }
  },
  {
    id: "order-status",
    label: "Order status",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your order {{ .order_id }} is on its way.",
        variables: ["first_name", "order_id"],
        template_type: "text",
        template_category: "utility",
        template_name: "order_update"
      }
    }
  },
  {
    id: "promo",
    label: "Promotion",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, we have a special offer for you.",
        variables: ["first_name"],
        template_type: "text",
        template_category: "marketing",
        template_name: "promo_alert"
      }
    }
  },
  {
    id: "support-reply",
    label: "Support reply",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, we have responded to your request.",
        variables: ["first_name"],
        template_type: "text",
        template_category: "utility",
        template_name: "support_reply"
      }
    }
  },
  {
    id: "image-promo",
    label: "Image promotion",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, tap to see the latest arrivals.",
        variables: ["first_name"],
        template_type: "image",
        template_category: "marketing",
        header_type: "image",
        template_name: "image_promo",
        header: "New collection just dropped",
        media_url: "https://via.placeholder.com/600x400.png?text=Promo"
      }
    }
  },
  {
    id: "video-launch",
    label: "Video launch",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, watch this short video to see what is new.",
        variables: ["first_name"],
        template_type: "video",
        template_category: "marketing",
        header_type: "video",
        template_name: "video_launch",
        header: "Watch our new product demo",
        media_url: "https://example.com/video.mp4"
      }
    }
  },
  {
    id: "document-receipt",
    label: "Document receipt",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, here is your receipt for order {{ .order_id }}.",
        variables: ["first_name", "order_id"],
        template_type: "document",
        template_category: "utility",
        header_type: "document",
        template_name: "order_receipt",
        document_filename: "receipt-{{ .order_id }}.pdf",
        media_url: "https://example.com/receipt.pdf"
      }
    }
  },
  {
    id: "limited-time-offer",
    label: "Limited time offer",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, this offer expires soon. Don’t miss out.",
        variables: ["first_name"],
        template_type: "lto",
        template_category: "marketing",
        template_name: "limited_time_offer",
        lto_expiry: "Today, 11:59 PM"
      }
    }
  },
  {
    id: "multi-product",
    label: "Multi product message",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, pick one of these products below.",
        variables: ["first_name"],
        template_type: "mpm",
        template_category: "marketing",
        template_name: "multi_product",
        products: [
          {
            image: "https://via.placeholder.com/80?text=P1",
            sectionTitle: "Sneakers",
            productId: "$79.99"
          },
          {
            image: "https://via.placeholder.com/80?text=P2",
            sectionTitle: "Backpack",
            productId: "$49.00"
          }
        ]
      }
    }
  },
  {
    id: "catalog-showcase",
    label: "Catalog showcase",
    campaign: {
      message: {
        title: "",
        body: "Browse our latest catalog items below.",
        variables: [],
        template_type: "catalog",
        template_category: "marketing",
        template_name: "catalog_showcase",
        products: [
          {
            image: "https://via.placeholder.com/80?text=C1",
            sectionTitle: "Jackets",
            productId: "$120.00"
          },
          {
            image: "https://via.placeholder.com/80?text=C2",
            sectionTitle: "Jeans",
            productId: "$89.00"
          }
        ]
      }
    }
  },
  {
    id: "auth-code",
    label: "Authentication code",
    campaign: {
      message: {
        title: "",
        body: "Use this code to securely sign in to your account.",
        variables: [],
        template_type: "auth",
        template_category: "authentication",
        template_name: "auth_code",
        auth_code: "123 456",
        auth_type: "otp",
        auth_label: "Your code is {{ .otp_code }}"
      }
    }
  },
  {
    id: "flow-booking",
    label: "Flow booking",
    campaign: {
      message: {
        title: "",
        body: "Tap below to choose your preferred date and time.",
        variables: [],
        template_type: "flow",
        template_category: "utility",
        template_name: "booking_flow",
        flow_id: "flow_booking_v1",
        flow_cta_label: "Start booking"
      }
    }
  },
  {
    id: "carousel-showcase",
    label: "Carousel showcase",
    campaign: {
      message: {
        title: "",
        body: "Swipe through our featured picks and tap to learn more.",
        variables: [],
        template_type: "carousel",
        template_category: "marketing",
        template_name: "carousel_showcase",
        cards: [
          {
            id: "card_1",
            title: "Trail Sneakers",
            media_url: "https://via.placeholder.com/600x400.png?text=Sneakers",
            button_label: "View sneakers",
            button_url: "https://example.com/sneakers"
          },
          {
            id: "card_2",
            title: "City Backpack",
            media_url: "https://via.placeholder.com/600x400.png?text=Backpack",
            button_label: "View backpack",
            button_url: "https://example.com/backpack"
          }
        ]
      }
    }
  }
], ht = [
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
], kt = [
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
}, xl = { class: "kb-confirm-dialog" }, Cl = { class: "kb-confirm-actions" }, Sl = /* @__PURE__ */ Ie({
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
  setup(a, { emit: o }) {
    const c = a, p = o, g = ne("android"), k = ne(""), C = ne(!1), x = ne(null), S = ne(!1), I = $(
      () => O.value.workflow_status ?? "draft"
    ), V = $(() => {
      const v = k.value;
      return v ? De.find((r) => r.id === v) ?? null : null;
    });
    function H(v) {
      const r = O.value, E = v.campaign.message ? { ...r.message, ...v.campaign.message } : r.message, T = v.campaign.delivery ? { ...r.delivery, ...v.campaign.delivery } : r.delivery;
      M({
        ...v.campaign,
        message: E,
        delivery: T
      }), x.value = null, C.value = !1;
    }
    function z(v) {
      const r = v.target.value;
      if (!r) return;
      const E = gt.find((T) => T.id === r);
      E && (ce.value ? (x.value = E, C.value = !0) : H(E), v.target.value = "");
    }
    function Y(v) {
      O.value = v, S.value = !1;
    }
    const {
      campaign: O,
      dirty: ce,
      customValidatorErrors: X,
      getValidationWithWarnings: G,
      update: M,
      updateMessage: de,
      updateDelivery: be,
      undo: $e,
      redo: fe,
      canUndo: ae,
      canRedo: J,
      resetMessage: b,
      resetDelivery: A,
      getPreview: U,
      characterLimits: oe,
      hooks: te
    } = Je({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (v) => {
          var T, D, h, u;
          const r = [];
          (T = v.name) != null && T.trim() || r.push("Template name is required"), (h = (D = v.message) == null ? void 0 : D.body) != null && h.trim() || r.push("Message body is required");
          const E = (u = c.hooks) != null && u.customValidators ? await c.hooks.customValidators(v) : [];
          return [...r, ...E];
        }
      },
      onDirty: () => p("change", O.value)
    }), { lastSavedAt: L } = Xe(O, { channel: "push" });
    function he(v) {
      (v.metaKey || v.ctrlKey) && v.key === "z" && (v.preventDefault(), v.shiftKey ? fe() : $e());
    }
    je(() => {
      window.addEventListener("keydown", he);
    }), Ke(() => {
      window.removeEventListener("keydown", he);
    }), Be(O, (v) => p("update:modelValue", v), { deep: !0 });
    const ve = ne(), xe = ne(!0), ke = ne(!0);
    async function R() {
      if (te.estimateReach)
        try {
          ve.value = await te.estimateReach(O.value.audience);
        } catch {
          ve.value = void 0;
        }
      te.canSend && (xe.value = await Promise.resolve(te.canSend())), te.canSchedule && (ke.value = await Promise.resolve(te.canSchedule()));
    }
    R(), Be(() => O.value.audience, R, { deep: !0 });
    const y = $(() => (X.value, G(ve.value))), B = $(() => y.value.blockingErrors), Z = $(() => y.value.warnings), le = $(() => y.value.valid), ge = $(() => {
      var T, D, h;
      const v = O.value.message, r = [
        !!((T = O.value.name) != null && T.trim()),
        !!((D = v.title) != null && D.trim()),
        !!((h = v.body) != null && h.trim()),
        !!(v.template_type ?? O.value.template_type),
        Array.isArray(v.actions) ? v.actions.length > 0 : !1
      ], E = r.filter(Boolean).length;
      return Math.round(E / r.length * 100);
    }), re = $(() => ge.value >= 90 ? "Production ready" : ge.value >= 70 ? "Strong draft" : ge.value >= 40 ? "In progress" : "Needs setup"), se = $(() => {
      const v = O.value.message;
      return !!((v.title ?? "").toString().trim() || (v.body ?? "").toString().trim() || Array.isArray(v.actions) && v.actions.length);
    }), Se = $(
      () => oe[g.value].title
    ), Re = $(() => oe[g.value].body), Ue = $(() => O.value.message.title.length), m = $(() => O.value.message.body.length), _ = $(() => {
      if (Ue.value > Se.value)
        return `Title exceeds ${Se.value} characters for ${g.value}.`;
    }), q = $(() => {
      const v = B.value.find(
        (r) => r.message === "Message body is required"
      );
      if (v) return v.message;
      if (m.value > Re.value)
        return `Body exceeds ${Re} characters for ${g.value}.`;
    }), Q = $(
      () => O.value.template_type ?? "transactional"
    );
    function ie(v) {
      M({ template_type: v });
    }
    function ye(v) {
      M({
        name: v,
        tracking: { ...O.value.tracking ?? {}, campaign_name: v }
      });
    }
    function _e(v) {
      const r = ` {{ .${v.variable} }}`, E = O.value.message.variables ?? [], T = Array.from(/* @__PURE__ */ new Set([...E, v.variable]));
      v.field === "title" ? de({
        title: O.value.message.title + r,
        variables: T
      }) : de({
        body: O.value.message.body + r,
        variables: T
      });
    }
    function K() {
      le.value && p("save", O.value);
    }
    return (v, r) => {
      var E;
      return s(), n("div", Kn, [
        e("div", Yn, [
          Te(Qe, {
            "campaign-name": f(O).name,
            status: f(O).status,
            dirty: f(ce),
            "last-saved-at": f(L),
            "can-undo": f(ae),
            "can-redo": f(J),
            "workflow-status": I.value,
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": ye,
            "onUpdate:workflowStatus": r[0] || (r[0] = (T) => f(M)({ workflow_status: T })),
            onUndo: f($e),
            onRedo: f(fe)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          B.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: f(we).dangerBg,
              border: `1px solid ${f(we).dangerBorder}`,
              borderRadius: `${f(Ve).input}px`,
              padding: `${f(pe)[12]}px ${f(pe)[16]}px`,
              marginBottom: `${f(pe)[16]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: f(we).danger })
            }, [
              (s(!0), n(F, null, j(B.value, (T) => (s(), n("li", {
                key: T.message
              }, d(T.message), 1))), 128))
            ], 4)
          ], 4)) : w("", !0)
        ]),
        e("div", Gn, [
          e("aside", Jn, [
            a.disabledSections.includes("message") ? w("", !0) : (s(), n("div", Xn, [
              !f(O).message.title && !f(O).message.body ? (s(), n("div", Qn, " Add a title and message below to get started. ")) : w("", !0),
              e("div", Zn, [
                e("div", el, [
                  r[12] || (r[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", tl, d(re.value), 1)
                ]),
                e("div", al, [
                  Te(ut, {
                    "template-type": Q.value,
                    onUpdate: ie
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: z
                  }, [
                    r[13] || (r[13] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(F, null, j(f(gt), (T) => (s(), n("option", {
                      key: T.id,
                      value: T.id
                    }, d(T.label), 9, sl))), 128))
                  ], 32)
                ]),
                e("div", nl, [
                  e("div", ll, [
                    r[14] || (r[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", ol, d(ge.value) + "%", 1)
                  ]),
                  e("div", il, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: me({ width: `${ge.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Te(ts, {
                message: f(O).message,
                "title-count": Ue.value,
                "body-count": m.value,
                "title-limit": Se.value,
                "body-limit": Re.value,
                "selected-platform": g.value,
                "show-reset": !0,
                "title-error": _.value,
                "body-error": q.value,
                onUpdate: f(de),
                onReset: r[1] || (r[1] = (T) => f(b)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Te(Ot, {
                message: f(O).message,
                "variable-options": a.variableOptions,
                onUpdate: f(de),
                onInsertVariable: _e
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !a.designOnly && !a.disabledSections.includes("delivery") ? (s(), n("div", rl, [
              r[15] || (r[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Te(Ws, {
                delivery: f(O).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: f(be),
                onReset: r[2] || (r[2] = (T) => f(A)())
              }, null, 8, ["delivery", "onUpdate"]),
              Te(Js, {
                delivery: f(O).delivery,
                onUpdate: f(be)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : w("", !0)
          ]),
          e("main", dl, [
            !a.designOnly && f(O).audience.test_mode ? (s(), n("div", ul, [...r[16] || (r[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              ee(" Test mode — only your test segment will receive this. ", -1)
            ])])) : w("", !0),
            e("div", cl, [
              e("div", pl, [
                e("label", ml, [
                  r[18] || (r[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Le(e("select", {
                    "onUpdate:modelValue": r[3] || (r[3] = (T) => k.value = T),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    r[17] || (r[17] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(F, null, j(f(De), (T) => (s(), n("option", {
                      key: T.id,
                      value: T.id
                    }, d(T.label), 9, vl))), 128))
                  ], 512), [
                    [Ee, k.value]
                  ])
                ]),
                e("div", bl, [
                  r[19] || (r[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(g.value), 1)
                ])
              ]),
              e("div", fl, [
                (s(), n(F, null, j(["android", "ios", "web"], (T) => e("button", {
                  key: T,
                  type: "button",
                  class: ue(["kb-push-device-btn", { "kb-push-device-btn--active": g.value === T }]),
                  role: "tab",
                  "aria-selected": g.value === T,
                  "aria-controls": `kb-preview-panel-${T}`,
                  onClick: (D) => g.value = T
                }, d(T.toUpperCase()), 11, gl)), 64))
              ]),
              e("div", {
                class: ue(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !se.value }])
              }, [
                !f(O).message.title && !f(O).message.body ? (s(), n("div", yl, [...r[20] || (r[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (s(), zt(Mn, {
                  key: 1,
                  "get-preview": f(U),
                  "selected-platform": g.value,
                  "preview-profile": V.value,
                  message: f(O).message,
                  delivery: f(O).delivery,
                  "onUpdate:selectedPlatform": r[4] || (r[4] = (T) => g.value = T)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", hl, [
          Z.value.length > 0 ? (s(), n("div", kl, [
            r[21] || (r[21] = e("strong", null, "Warning:", -1)),
            ee(" " + d((E = Z.value[0]) == null ? void 0 : E.message) + " ", 1),
            Z.value.length > 1 ? (s(), n("span", _l, " (+" + d(Z.value.length - 1) + " more) ", 1)) : w("", !0)
          ])) : w("", !0),
          e("div", wl, [
            !a.designOnly && a.showHistory ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: r[5] || (r[5] = (T) => S.value = !0)
            }, " Version history ")) : w("", !0),
            !a.designOnly && a.showSaveVersion ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: r[6] || (r[6] = (T) => p("save-version", JSON.parse(JSON.stringify(f(O)))))
            }, " Save as version ")) : w("", !0),
            a.showDuplicate ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: r[7] || (r[7] = (T) => p("duplicate", JSON.parse(JSON.stringify(f(O)))))
            }, " Duplicate ")) : w("", !0),
            a.showSave ? (s(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: K
            }, " Save ")) : w("", !0),
            a.showClose ? (s(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: r[8] || (r[8] = (T) => p("edit"))
            }, " Close ")) : w("", !0)
          ])
        ]),
        C.value ? (s(), n("div", $l, [
          e("div", xl, [
            r[22] || (r[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            r[23] || (r[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Cl, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: r[9] || (r[9] = (T) => {
                  C.value = !1, x.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: r[10] || (r[10] = (T) => x.value && H(x.value))
              }, " Replace ")
            ])
          ])
        ])) : w("", !0),
        Te(Nt, {
          open: S.value,
          versions: a.versions,
          onClose: r[11] || (r[11] = (T) => S.value = !1),
          onRestore: Y
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Vt = /* @__PURE__ */ Ae(Sl, [["__scopeId", "data-v-543f6763"]]), Il = { class: "kb-section" }, Al = { class: "kb-section__head" }, Tl = { class: "kb-summary-bar" }, Bl = { class: "kb-pill kb-pill--category" }, Ul = { class: "kb-pill kb-pill--format" }, Ll = { class: "kb-pill kb-pill--status" }, Rl = { class: "kb-field" }, Pl = ["value"], El = ["value", "disabled"], Ol = { class: "kb-field" }, Nl = { class: "kb-label" }, Vl = { class: "kb-helper" }, Ml = ["value"], Dl = ["value", "disabled"], Wl = { class: "kb-field" }, Hl = ["value"], zl = { class: "kb-field kb-field--inline kb-field--language-limits" }, Fl = { class: "kb-field-half" }, ql = ["value"], jl = { class: "kb-field" }, Kl = ["value"], Yl = {
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
}, To = { class: "kb-wa-fields-list" }, Bo = { class: "kb-wa-field-name" }, Uo = { class: "kb-wa-field-status" }, Lo = { class: "kb-field" }, Ro = ["value"], Po = {
  key: 10,
  class: "kb-field"
}, Eo = { class: "kb-wa-buttons" }, Oo = ["value", "onInput"], No = ["value", "onChange"], Vo = ["value", "onInput"], Mo = ["value", "onInput"], Do = {
  key: 2,
  class: "kb-opt-out-note"
}, Wo = ["onClick"], Ho = ["disabled"], et = 60, tt = 1024, at = 60, st = 10, _t = 10, zo = /* @__PURE__ */ Ie({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    const c = a, p = o, g = [
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
    ], k = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], C = $(() => c.message), x = $(() => C.value.template_type ?? "text"), S = $(() => C.value.header_type ?? "none"), I = $(() => String(C.value.header ?? "")), V = $(() => String(C.value.body ?? "")), H = $(() => String(C.value.footer ?? "")), z = $(() => C.value.buttons ?? []), Y = $(() => C.value.products ?? []), O = $(() => C.value.cards ?? []), ce = $(() => {
      const R = g.find((y) => y.value === x.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), X = $(() => {
      const R = String(C.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), G = $(() => {
      const R = g.find((y) => y.value === x.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), M = $(() => C.value.template_name ? V.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), de = $(() => new Set((c.disabledCategories ?? []).map((R) => String(R).trim()))), be = $(() => new Set((c.disabledFormats ?? []).map((R) => String(R).trim())));
    function $e(R) {
      if (!R || typeof R != "string") return [];
      const y = /\{\{\s*([^}]+?)\s*\}\}/g, B = /* @__PURE__ */ new Set();
      let Z;
      for (; (Z = y.exec(R)) !== null; ) B.add(Z[1].trim());
      return Array.from(B);
    }
    const fe = $(() => {
      const R = c.message.header ?? "", y = c.message.body ?? c.message.body ?? "", B = new Set(c.message.variables ?? []), Z = [...$e(R), ...$e(y)];
      return Array.from(new Set(Z)).map((ge) => ({ name: ge, configured: B.has(ge) }));
    });
    function ae(R) {
      p("update", R);
    }
    function J(R) {
      const y = {
        template_category: R || void 0
      };
      R === "authentication" && x.value !== "auth" && (y.template_type = "auth"), ae(y);
    }
    function b(R) {
      const y = { template_type: R };
      R === "auth" && (y.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (y.header_type = R), ae(y);
    }
    function A(R, y) {
      var Z;
      const B = [...z.value];
      B[R] = {
        ...B[R],
        id: ((Z = B[R]) == null ? void 0 : Z.id) || `btn_${R + 1}`,
        ...y
      }, ae({ buttons: B });
    }
    function U(R) {
      const y = [...z.value];
      y.splice(R, 1), ae({ buttons: y });
    }
    function oe() {
      const R = [...z.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), ae({ buttons: R });
    }
    function te(R, y) {
      var Z;
      const B = [...Y.value];
      B[R] = {
        ...B[R],
        id: ((Z = B[R]) == null ? void 0 : Z.id) || `prod_${R + 1}`,
        ...y
      }, ae({ products: B });
    }
    function L(R) {
      const y = [...Y.value];
      y.splice(R, 1), ae({ products: y });
    }
    function he() {
      const R = [...Y.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), ae({ products: R });
    }
    function ve(R, y) {
      var Z;
      const B = [...O.value];
      B[R] = {
        ...B[R],
        id: ((Z = B[R]) == null ? void 0 : Z.id) || `card_${R + 1}`,
        ...y
      }, ae({ cards: B });
    }
    function xe(R) {
      const y = [...O.value];
      y.splice(R, 1), ae({ cards: y });
    }
    function ke() {
      const R = [...O.value];
      R.push({
        id: `card_${R.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), ae({ cards: R });
    }
    return (R, y) => (s(), n("section", Il, [
      e("div", Al, [
        y[16] || (y[16] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: y[0] || (y[0] = (B) => R.$emit("reset"))
        }, " Reset section ")) : w("", !0)
      ]),
      y[42] || (y[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Tl, [
        e("span", Bl, d(X.value), 1),
        e("span", Ul, d(G.value), 1),
        e("span", Ll, d(M.value), 1)
      ]),
      e("div", Rl, [
        y[18] || (y[18] = e("label", { class: "kb-label" }, [
          ee(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: C.value.template_category ?? "",
          onChange: y[1] || (y[1] = (B) => J(B.target.value))
        }, [
          y[17] || (y[17] = e("option", { value: "" }, "Select category", -1)),
          (s(), n(F, null, j(k, (B) => e("option", {
            key: B.value,
            value: B.value,
            disabled: de.value.has(B.value)
          }, d(B.label) + d(de.value.has(B.value) ? " (Disabled)" : ""), 9, El)), 64))
        ], 40, Pl)
      ]),
      e("div", Ol, [
        e("label", Nl, [
          y[19] || (y[19] = ee(" Functional format ", -1)),
          e("span", Vl, d(ce.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: x.value,
          onChange: y[2] || (y[2] = (B) => b(B.target.value))
        }, [
          (s(), n(F, null, j(g, (B) => e("option", {
            key: B.value,
            value: B.value,
            disabled: be.value.has(B.value)
          }, d(B.label) + d(be.value.has(B.value) ? " (Disabled)" : ""), 9, Dl)), 64))
        ], 40, Ml)
      ]),
      e("div", Wl, [
        y[20] || (y[20] = e("label", { class: "kb-label" }, [
          ee(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: C.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, Hl)
      ]),
      e("div", zl, [
        e("div", Fl, [
          y[21] || (y[21] = e("label", { class: "kb-label" }, [
            ee(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: C.value.template_language ?? "",
            onInput: y[3] || (y[3] = (B) => ae({
              template_language: B.target.value || void 0
            }))
          }, null, 40, ql)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            y[22] || (y[22] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + d(et) + " chars"),
              e("li", null, "Body: " + d(tt) + " chars"),
              e("li", null, "Footer: " + d(at) + " chars"),
              e("li", null, "Buttons: up to " + d(st))
            ])
          ])
        ])
      ]),
      e("div", jl, [
        y[24] || (y[24] = e("label", { class: "kb-label" }, [
          ee(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: S.value,
          onChange: y[4] || (y[4] = (B) => ae({ header_type: B.target.value }))
        }, [...y[23] || (y[23] = [
          He('<option value="none" data-v-5d59e12f>No header</option><option value="text" data-v-5d59e12f>Text header</option><option value="image" data-v-5d59e12f>Image header</option><option value="video" data-v-5d59e12f>Video header</option><option value="document" data-v-5d59e12f>Document header</option>', 5)
        ])], 40, Kl)
      ]),
      S.value === "text" ? (s(), n("div", Yl, [
        e("label", Gl, [
          y[25] || (y[25] = ee(" Header text ", -1)),
          e("span", {
            class: ue(["kb-counter", { "kb-counter--warn": I.value.length > et }])
          }, d(I.value.length) + "/" + d(et), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: I.value,
          onInput: y[5] || (y[5] = (B) => ae({
            header: B.target.value || void 0
          }))
        }, null, 40, Jl)
      ])) : w("", !0),
      ["image", "video", "document"].includes(S.value) || ["image", "video", "document"].includes(x.value) ? (s(), n("div", Xl, [
        y[26] || (y[26] = e("label", { class: "kb-label" }, [
          ee(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: C.value.media_url ?? "",
          onInput: y[6] || (y[6] = (B) => ae({
            media_url: B.target.value || void 0
          }))
        }, null, 40, Ql)
      ])) : w("", !0),
      S.value === "document" || x.value === "document" ? (s(), n("div", Zl, [
        y[27] || (y[27] = e("label", { class: "kb-label" }, [
          ee(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: C.value.document_filename ?? "",
          onInput: y[7] || (y[7] = (B) => ae({
            document_filename: B.target.value || void 0
          }))
        }, null, 40, eo)
      ])) : w("", !0),
      ["image", "video", "document"].includes(S.value) || ["image", "video", "document"].includes(x.value) ? (s(), n("div", to, [
        y[28] || (y[28] = e("label", { class: "kb-label" }, [
          ee(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: C.value.media_caption ?? "",
          onInput: y[8] || (y[8] = (B) => ae({
            media_caption: B.target.value || void 0
          }))
        }, null, 40, ao)
      ])) : w("", !0),
      x.value === "lto" ? (s(), n("div", so, [
        y[29] || (y[29] = e("label", { class: "kb-label" }, [
          ee(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: C.value.lto_expiry ?? "",
          onInput: y[9] || (y[9] = (B) => ae({
            lto_expiry: B.target.value || void 0
          }))
        }, null, 40, no)
      ])) : w("", !0),
      x.value === "flow" ? (s(), n("div", lo, [
        y[30] || (y[30] = e("label", { class: "kb-label" }, [
          ee(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: C.value.flow_id ?? "",
          onInput: y[10] || (y[10] = (B) => ae({
            flow_id: B.target.value || void 0
          }))
        }, null, 40, oo),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: C.value.flow_cta_label ?? "",
          onInput: y[11] || (y[11] = (B) => ae({
            flow_cta_label: B.target.value || void 0
          }))
        }, null, 40, io)
      ])) : w("", !0),
      x.value === "carousel" ? (s(), n("div", ro, [
        e("label", { class: "kb-label" }, [
          y[31] || (y[31] = ee(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + d(_t) + " cards.")
        ]),
        e("div", uo, [
          (s(!0), n(F, null, j(O.value, (B, Z) => (s(), n("div", {
            key: B.id || Z,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: B.title ?? "",
              onInput: (le) => ve(Number(Z), { title: le.target.value })
            }, null, 40, co),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: B.media_url ?? "",
              onInput: (le) => ve(Number(Z), { media_url: le.target.value })
            }, null, 40, po),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: B.button_label ?? "",
              onInput: (le) => ve(Number(Z), { button_label: le.target.value })
            }, null, 40, mo),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: B.button_url ?? "",
              onInput: (le) => ve(Number(Z), { button_url: le.target.value })
            }, null, 40, vo),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (le) => xe(Number(Z))
            }, "Remove", 8, bo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: O.value.length >= _t,
            onClick: ke
          }, " Add card ", 8, fo)
        ])
      ])) : w("", !0),
      ["mpm", "catalog"].includes(x.value) ? (s(), n("div", go, [
        y[32] || (y[32] = e("label", { class: "kb-label" }, [
          ee(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", yo, [
          (s(!0), n(F, null, j(Y.value, (B, Z) => (s(), n("div", {
            key: B.id || Z,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: B.productId,
              onInput: (le) => te(Number(Z), { productId: le.target.value })
            }, null, 40, ho),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: B.sectionTitle,
              onInput: (le) => te(Number(Z), { sectionTitle: le.target.value || void 0 })
            }, null, 40, ko),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (le) => L(Number(Z))
            }, " Remove ", 8, _o)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: he
          }, " Add product ")
        ])
      ])) : w("", !0),
      x.value === "auth" ? (s(), n("div", wo, [
        y[34] || (y[34] = e("label", { class: "kb-label" }, [
          ee(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: C.value.auth_type ?? "otp",
          onChange: y[12] || (y[12] = (B) => ae({
            auth_type: B.target.value
          }))
        }, [...y[33] || (y[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, $o),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: C.value.auth_label ?? "",
          onInput: y[13] || (y[13] = (B) => ae({
            auth_label: B.target.value || void 0
          }))
        }, null, 40, xo)
      ])) : w("", !0),
      e("div", Co, [
        e("label", So, [
          y[35] || (y[35] = ee(" Body ", -1)),
          y[36] || (y[36] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: ue(["kb-counter", { "kb-counter--warn": V.value.length > tt }])
          }, d(V.value.length) + "/" + d(tt), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
          value: V.value,
          onInput: y[14] || (y[14] = (B) => ae({
            body: B.target.value || void 0
          }))
        }, null, 40, Io)
      ]),
      fe.value.length > 0 ? (s(), n("div", Ao, [
        y[37] || (y[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        y[38] || (y[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", To, [
          (s(!0), n(F, null, j(fe.value, (B) => (s(), n("li", {
            key: B.name,
            class: ue(["kb-wa-field-item", { "kb-wa-field-item--ok": B.configured }])
          }, [
            e("span", Bo, d(B.name), 1),
            e("span", Uo, d(B.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : w("", !0),
      e("div", Lo, [
        y[39] || (y[39] = e("label", { class: "kb-label" }, [
          ee(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: H.value,
          onInput: y[15] || (y[15] = (B) => ae({
            footer: B.target.value || void 0
          }))
        }, null, 40, Ro),
        e("div", {
          class: ue(["kb-counter kb-counter--inline", { "kb-counter--warn": H.value.length > at }])
        }, d(H.value.length) + "/" + d(at), 3)
      ]),
      V.value.trim().length > 0 ? (s(), n("div", Po, [
        e("label", { class: "kb-label" }, [
          y[40] || (y[40] = ee(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + d(st) + " buttons. ")
        ]),
        e("div", Eo, [
          (s(!0), n(F, null, j(z.value, (B, Z) => (s(), n("div", {
            key: B.id || Z,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: B.label,
              onInput: (le) => A(Number(Z), { label: le.target.value })
            }, null, 40, Oo),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: B.type ?? "quick_reply",
              onChange: (le) => A(Number(Z), { type: le.target.value })
            }, [...y[41] || (y[41] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, No),
            B.type === "url" ? (s(), n("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: B.url,
              onInput: (le) => A(Number(Z), { url: le.target.value || void 0 })
            }, null, 40, Vo)) : B.type === "call" ? (s(), n("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: B.phone,
              onInput: (le) => A(Number(Z), { phone: le.target.value || void 0 })
            }, null, 40, Mo)) : B.type === "opt_out" ? (s(), n("span", Do, " Sends a built-in opt-out action. ")) : w("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (le) => U(Number(Z))
            }, " Remove ", 8, Wo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: z.value.length >= st,
            onClick: oe
          }, " Add button ", 8, Ho)
        ])
      ])) : w("", !0)
    ]));
  }
}), Fo = /* @__PURE__ */ Ae(zo, [["__scopeId", "data-v-5d59e12f"]]), qo = { class: "wa-preview-root" }, jo = { class: "wa-device" }, Ko = { class: "wa-screen" }, Yo = { class: "wa-header" }, Go = { class: "wa-titleblock" }, Jo = { class: "wa-title-row" }, Xo = { class: "wa-title" }, Qo = { class: "wa-subtitle" }, Zo = {
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
}, Bi = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Ui = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, Li = {
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
}, vr = { class: "wa-msg wa-msg--in" }, br = { class: "wa-bubble wa-bubble--in" }, fr = /* @__PURE__ */ Ie({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(a) {
    const o = a;
    function c(b) {
      return String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const p = $(() => {
      var U;
      const b = ((U = o.template) == null ? void 0 : U.body) ?? "";
      return c(b).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), g = $(() => o.template.templateName || "Ecoshop"), k = $(() => "Business Account"), C = $(() => o.template.format === "flow" || !!o.template.flow), x = $(() => {
      var b;
      return (b = o.template.buttons) == null ? void 0 : b[0];
    }), S = $(() => {
      var b, A;
      return ((b = x.value) == null ? void 0 : b.text) || ((A = o.template.flow) == null ? void 0 : A.ctaLabel) || "";
    }), I = $(() => o.template.buttons ?? []), V = $(() => {
      var b;
      return (((b = o.template.multiProduct) == null ? void 0 : b.length) ?? 0) > 0;
    }), H = $(() => (o.template.format || "text").toUpperCase()), z = $(() => {
      const b = o.template.header;
      return !b || b.type === "text" ? "" : b.type === "image" ? b.url || "Image" : b.type === "video" ? b.url || "Video" : b.filename || b.url || "Document";
    }), Y = $(() => {
      const b = o.template.header;
      if (!(!b || b.type !== "image" || !b.url))
        return { backgroundImage: `url(${b.url})` };
    });
    function O(b) {
      if (!b) return "";
      try {
        const A = b.split("?")[0].split("#")[0], U = A.substring(A.lastIndexOf("/") + 1);
        return decodeURIComponent(U || "");
      } catch {
        return "";
      }
    }
    const ce = $(() => {
      const b = o.template.header;
      return !b || b.type !== "document" ? "" : b.filename || O(b.url) || "document.pdf";
    }), X = $(() => {
      const b = (o.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (b == null ? void 0 : b[0]) || "";
    });
    function G(b) {
      try {
        return new URL(b).hostname;
      } catch {
        return "example.com";
      }
    }
    const M = $(() => {
      const b = o.template.linkPreview;
      return !b && !X.value ? null : {
        title: (b == null ? void 0 : b.title) || "Link preview",
        description: (b == null ? void 0 : b.description) || "Preview from your WhatsApp template link.",
        domain: (b == null ? void 0 : b.domain) || (X.value ? G(X.value) : "example.com"),
        url: (b == null ? void 0 : b.url) || X.value || "#",
        thumbnail: (b == null ? void 0 : b.thumbnail) || ""
      };
    }), de = $(() => {
      var U, oe, te;
      const A = (te = (((U = o.template.documentCard) == null ? void 0 : U.filename) || ((oe = o.template.header) == null ? void 0 : oe.filename) || "").split(".").pop()) == null ? void 0 : te.trim().toUpperCase();
      return A ? A.slice(0, 4) : "DOC";
    });
    function be(b, A) {
      return b === "phone_number" ? "wa-btn-icon--phone" : b === "url" ? "wa-btn-icon--external" : b === "copy_code" ? "wa-btn-icon--code" : b === "opt_out" || (A || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (A || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const $e = $(() => {
      var b;
      return o.template.location || o.template.locationRequest ? "wa-side-icon--info" : ((b = o.template.header) == null ? void 0 : b.type) === "video" || o.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), fe = $(() => {
      var A, U, oe;
      const b = o.template;
      return b.format === "flow" ? "Thanks, we received your preferences." : (A = b.auth) != null && A.code ? "Use the verification code and let us know if it works." : (U = b.coupon) != null && U.code ? `Your coupon ${b.coupon.code} is active now.` : b.limitedOffer ? `Great choice. This offer is valid until ${b.limitedOffer}.` : (oe = o.template.multiProduct) != null && oe.length ? `Here are ${o.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), ae = $(() => {
      var A, U;
      const b = o.template;
      return b.location ? b.location.name || b.location.address || `${b.location.lat}, ${b.location.lng}` : (A = b.auth) != null && A.code ? `Verification code: ${b.auth.code}` : (U = b.flow) != null && U.id ? `Flow ID: ${b.flow.id}` : b.templateLanguage ? `Template language: ${b.templateLanguage}` : `Category: ${b.templateCategory || "utility"} • Format: ${b.format || "text"}`;
    }), J = $(() => {
      var U, oe;
      const b = o.template;
      if ((U = b.multiProduct) != null && U.length) return b.multiProduct.slice(0, 5).map((te) => te.name || "Product");
      if ((oe = b.buttons) != null && oe.length) return b.buttons.slice(0, 5).map((te) => te.text || "Option");
      const A = (b.body || "").split(/\n|\.|,/).map((te) => te.trim()).filter(Boolean).slice(0, 5);
      return A.length ? A : ["Option A", "Option B", "Option C"];
    });
    return (b, A) => {
      var U, oe, te, L, he, ve, xe, ke, R, y, B, Z, le, ge;
      return s(), n("div", qo, [
        e("div", jo, [
          e("div", Ko, [
            A[30] || (A[30] = He('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Yo, [
              A[7] || (A[7] = e("span", { class: "wa-back" }, "←", -1)),
              A[8] || (A[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Go, [
                e("div", Jo, [
                  e("span", Xo, d(g.value), 1),
                  A[6] || (A[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Qo, d(k.value), 1)
              ]),
              A[9] || (A[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            C.value ? (s(), n("div", Zo, [
              A[14] || (A[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", ei, [
                A[10] || (A[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", ti, d(g.value), 1),
                A[11] || (A[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", ai, [
                e("p", si, d(a.template.body || "Please choose an option below."), 1),
                (s(!0), n(F, null, j(J.value, (re, se) => (s(), n("div", {
                  key: `flow-opt-${se}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, d(re), 1),
                  e("span", {
                    class: ue(["wa-radio", { "wa-radio--on": se === 0 }])
                  }, null, 2)
                ]))), 128)),
                (U = a.template.multiProduct) != null && U.length ? (s(), n("div", ni, [
                  (s(!0), n(F, null, j(a.template.multiProduct.slice(0, 3), (re, se) => (s(), n("div", {
                    key: se,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, d(re.name || "Product"), 1),
                      e("p", null, d(re.price || "Price on request"), 1)
                    ]),
                    A[12] || (A[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : w("", !0)
              ]),
              e("div", li, [
                S.value ? (s(), n("button", oi, d(S.value), 1)) : w("", !0),
                e("p", ii, [
                  A[13] || (A[13] = ee("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: A[0] || (A[0] = Fe(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (s(), n("div", ri, [
              A[29] || (A[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", di, [
                A[15] || (A[15] = e("span", null, "●", -1)),
                A[16] || (A[16] = ee(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: A[1] || (A[1] = Fe(() => {
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
                      A[17] || (A[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : a.template.header.type === "document" ? (s(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: A[2] || (A[2] = Fe(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", fi, d(de.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ce.value
                      }, d(ce.value), 9, gi)
                    ])) : (s(), n("div", yi, [
                      e("div", hi, d(H.value) + " TEMPLATE", 1),
                      e("div", ki, d(z.value), 1),
                      Y.value ? (s(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: me(Y.value)
                      }, null, 4)) : w("", !0)
                    ]))
                  ])) : (oe = a.template.header) != null && oe.text ? (s(), n("div", _i, d(a.template.header.text), 1)) : w("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: p.value
                  }, null, 8, wi),
                  M.value ? (s(), n("div", $i, [
                    e("div", xi, [
                      M.value.thumbnail ? (s(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: me({ backgroundImage: `url(${M.value.thumbnail})` })
                      }, null, 4)) : w("", !0),
                      e("div", Ci, [
                        e("strong", null, d(M.value.title), 1),
                        e("p", null, d(M.value.description), 1),
                        e("span", null, d(M.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: M.value.url,
                      onClick: A[3] || (A[3] = Fe(() => {
                      }, ["prevent"]))
                    }, d(M.value.url), 9, Si)
                  ])) : w("", !0),
                  a.template.location ? (s(), n("div", Ii, " 📍 " + d(a.template.location.name || a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)) : w("", !0),
                  (te = a.template.coupon) != null && te.code ? (s(), n("div", Ai, [
                    A[18] || (A[18] = ee(" Coupon: ", -1)),
                    e("strong", null, d(a.template.coupon.code), 1)
                  ])) : w("", !0),
                  (L = a.template.auth) != null && L.code ? (s(), n("div", Ti, [
                    A[19] || (A[19] = ee(" Verification code: ", -1)),
                    e("strong", null, d(a.template.auth.code), 1)
                  ])) : w("", !0),
                  a.template.limitedOffer ? (s(), n("div", Bi, " Expires: " + d(a.template.limitedOffer), 1)) : w("", !0),
                  a.template.footer ? (s(), n("div", Ui, d(a.template.footer), 1)) : w("", !0),
                  V.value ? (s(), n("div", Li, [
                    (s(!0), n(F, null, j((he = a.template.multiProduct) == null ? void 0 : he.slice(0, 4), (re, se) => (s(), n("div", {
                      key: `prod-${se}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Ri, d(re.name || `Item ${se + 1}`), 1),
                      e("span", Pi, d(re.price || "-"), 1)
                    ]))), 128))
                  ])) : w("", !0),
                  S.value ? (s(), n("button", Ei, [
                    x.value ? (s(), n("span", {
                      key: 0,
                      class: ue(["wa-btn-icon", be(x.value.type, x.value.value || x.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : w("", !0),
                    ee(" " + d(S.value), 1)
                  ])) : w("", !0),
                  I.value.length > 1 ? (s(), n("div", Oi, [
                    (s(!0), n(F, null, j(I.value.slice(1, 4), (re, se) => (s(), n("button", {
                      key: `action-${se}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ue(["wa-btn-icon", be(re.type, re.value || re.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      ee(" " + d(re.text), 1)
                    ]))), 128))
                  ])) : w("", !0),
                  A[20] || (A[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ue(["wa-side-icon", $e.value]),
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
                    }, null, 8, Di)) : w("", !0),
                    e("div", null, [
                      e("strong", null, d(a.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, d(a.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Wi, d(a.template.orderCard.buttonLabel || "View"), 1),
                  A[21] || (A[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : w("", !0),
              a.template.documentCard || ((ve = a.template.header) == null ? void 0 : ve.type) === "document" ? (s(), n("div", Hi, [
                e("div", zi, [
                  e("div", Fi, [
                    e("span", qi, d(de.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((xe = a.template.documentCard) == null ? void 0 : xe.filename) || ((ke = a.template.header) == null ? void 0 : ke.filename) || "document.pdf"
                      }, d(((R = a.template.documentCard) == null ? void 0 : R.filename) || ((y = a.template.header) == null ? void 0 : y.filename) || "document.pdf"), 9, ji),
                      e("p", null, d(((B = a.template.documentCard) == null ? void 0 : B.size) || "243 KB • html"), 1)
                    ]),
                    A[22] || (A[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ki, d(((Z = a.template.documentCard) == null ? void 0 : Z.caption) || a.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : w("", !0),
              a.template.voiceNote ? (s(), n("div", Yi, [
                e("div", Gi, [
                  e("div", Ji, [
                    A[24] || (A[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    A[25] || (A[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Xi, [
                      a.template.voiceNote.profileImage ? (s(), n("img", {
                        key: 0,
                        src: a.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Qi)) : w("", !0),
                      A[23] || (A[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Zi, d(a.template.voiceNote.duration || "0:10"), 1),
                  e("p", er, d(a.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : w("", !0),
              a.template.contactCard ? (s(), n("div", tr, [
                e("div", ar, [
                  e("strong", null, d(a.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, d(a.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, d(a.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, d(a.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, d(a.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : w("", !0),
              a.template.location && a.template.locationRequest ? (s(), n("div", sr, [
                e("div", nr, [
                  A[26] || (A[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", lr, [
                    e("strong", null, d(a.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: A[4] || (A[4] = Fe(() => {
                      }, ["prevent"]))
                    }, d(a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)
                  ]),
                  e("button", or, d(a.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : w("", !0),
              (le = a.template.carouselCards) != null && le.length ? (s(), n("div", ir, [
                e("div", rr, [
                  (s(!0), n(F, null, j(a.template.carouselCards.slice(0, 4), (re, se) => (s(), n("article", {
                    key: `c-${se}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: me(re.image ? { backgroundImage: `url(${re.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, d(re.title || `Card ${se + 1}`), 1),
                    e("p", null, d(re.description || "Card description"), 1),
                    e("button", dr, d(re.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : w("", !0),
              e("div", ur, [
                e("div", cr, [
                  e("span", pr, d(g.value), 1),
                  e("p", null, d(fe.value), 1),
                  A[27] || (A[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  a.template.reactionEmoji ? (s(), n("span", mr, d(a.template.reactionEmoji), 1)) : w("", !0)
                ])
              ]),
              e("div", vr, [
                e("div", br, [
                  e("p", null, d(ae.value), 1),
                  (ge = a.template.flow) != null && ge.id ? (s(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: A[5] || (A[5] = Fe(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + d(a.template.flow.id), 1)) : w("", !0),
                  A[28] || (A[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            A[31] || (A[31] = He('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), gr = /* @__PURE__ */ Ae(fr, [["__scopeId", "data-v-244c945a"]]), yr = { class: "keos-whatsapp-builder" }, hr = { class: "kb-builder-top" }, kr = { class: "kb-wa-layout" }, _r = { class: "kb-wa-sidebar" }, wr = {
  key: 0,
  class: "kb-wa-form"
}, $r = { class: "kb-wa-form-head" }, xr = { class: "kb-wa-form-head-top" }, Cr = { class: "kb-wa-health-pill" }, Sr = { class: "kb-wa-form-head-row" }, Ir = ["value"], Ar = { class: "kb-wa-health" }, Tr = { class: "kb-wa-health-row" }, Br = { class: "kb-wa-health-value" }, Ur = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Lr = { class: "kb-wa-canvas" }, Rr = {
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
}, Fr = { class: "kb-confirm-dialog" }, qr = { class: "kb-confirm-actions" }, wt = 60, $t = 1024, xt = 60, Ct = 10, St = 10, jr = /* @__PURE__ */ Ie({
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
  setup(a, { emit: o }) {
    function c(m) {
      var T, D, h, u, l;
      const _ = [], q = m.message, Q = (q.template_category ?? "").toString().trim(), ie = (q.template_type ?? "text").toString(), ye = (q.header_type ?? "none").toString(), _e = (q.header ?? "").toString(), K = (q.body ?? "").toString(), v = (q.footer ?? "").toString(), r = Array.isArray(q.buttons) ? q.buttons : [], E = Array.isArray(q.cards) ? q.cards : [];
      return (T = m.name) != null && T.trim() || _.push("Template name is required"), (D = q.template_name) != null && D.trim() || _.push("WhatsApp template name is required"), Q || _.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), K.trim() || _.push("Body is required"), ye === "text" && _e.length > wt && _.push(`Header text cannot exceed ${wt} characters`), K.length > $t && _.push(`Body cannot exceed ${$t} characters`), v.length > xt && _.push(`Footer cannot exceed ${xt} characters`), r.length > Ct && _.push(`Buttons cannot exceed ${Ct}`), (ie === "image" || ie === "video" || ie === "document" || ye === "image" || ye === "video" || ye === "document") && !q.media_url && _.push("Media URL is required for rich media templates"), Q === "authentication" && ie !== "auth" && _.push("Authentication category must use Authentication format"), ie === "auth" && !((h = q.auth_label) != null && h.trim()) && !K.includes("{{") && _.push("Authentication templates should include a code label or placeholder variable"), ie === "lto" && !q.lto_expiry && _.push("Limited-time offer requires an expiry"), (ie === "mpm" || ie === "catalog") && !((u = q.products) != null && u.length) && _.push("Catalog and multi-product templates require at least one product"), ie === "flow" && !((l = q.flow_id) != null && l.trim()) && _.push("WhatsApp Flow format requires a flow ID"), ie === "carousel" && (E.length ? E.length > St && _.push(`Carousel supports up to ${St} cards`) : _.push("Carousel format requires at least one card")), _;
    }
    function p(m, _, q) {
      const Q = m.message, ie = String(Q.template_category ?? "").trim(), ye = String(Q.template_type ?? "text").trim(), _e = [];
      return ie && _.includes(ie) && _e.push(`WhatsApp category "${ie}" is disabled in this builder configuration`), ye && q.includes(ye) && _e.push(`WhatsApp format "${ye}" is disabled in this builder configuration`), _e;
    }
    const g = a;
    function k(m) {
      if (!m) return {};
      const _ = m.metaTemplate, q = Array.isArray(_ == null ? void 0 : _.components) ? (_ == null ? void 0 : _.components).find((D) => (D == null ? void 0 : D.type) === "BODY") : void 0, Q = Array.isArray(_ == null ? void 0 : _.components) ? (_ == null ? void 0 : _.components).find((D) => (D == null ? void 0 : D.type) === "FOOTER") : void 0, ie = Array.isArray(_ == null ? void 0 : _.components) ? (_ == null ? void 0 : _.components).find((D) => (D == null ? void 0 : D.type) === "HEADER") : void 0, ye = String(m.content ?? "").trim(), _e = String(m.elementName ?? "").trim(), K = String(m.languageCode ?? "").trim(), v = String(m.category ?? "").trim().toLowerCase(), r = String(m.templateType ?? "").trim().toLowerCase(), E = String(m.footer ?? "").trim(), T = String(m.header ?? "").trim();
      return {
        ...m,
        ..._e && !m.template_name ? { template_name: _e } : {},
        ...K && !m.template_language ? { template_language: K } : {},
        ...v && !m.template_category ? { template_category: v } : {},
        ...r && !m.template_type ? { template_type: r } : {},
        ...ye && !m.body ? { body: ye } : {},
        ...E && !m.footer ? { footer: E } : {},
        ...T && !m.header ? { header: T } : {},
        ...!m.body && (q != null && q.text) ? { body: String(q.text) } : {},
        ...!m.footer && (Q != null && Q.text) ? { footer: String(Q.text) } : {},
        ...!m.header && (ie != null && ie.text) ? { header: String(ie.text) } : {}
      };
    }
    function C(m) {
      if (!m) return m;
      const _ = k(m.message);
      return { ...m, message: _ };
    }
    const x = o;
    function S(m) {
      var q;
      const _ = mt(m, {
        exampleData: (q = y.value) == null ? void 0 : q.data
      });
      return {
        ...m,
        message: {
          ...m.message,
          elementName: _.payload.elementName,
          languageCode: _.payload.languageCode,
          category: _.payload.category,
          templateType: _.payload.templateType,
          content: _.payload.content,
          ..._.payload.header ? { header: _.payload.header } : {},
          ..._.payload.footer ? { footer: _.payload.footer } : {},
          ..._.payload.buttons ? { buttons: _.payload.buttons } : {},
          ..._.payload.example ? { example: _.payload.example } : {},
          metaTemplate: _.payload.metaTemplate,
          ..._.payload.advanced ? { advanced: _.payload.advanced } : {}
        }
      };
    }
    const {
      campaign: I,
      dirty: V,
      customValidatorErrors: H,
      getValidationWithWarnings: z,
      update: Y,
      updateMessage: O,
      undo: ce,
      redo: X,
      canUndo: G,
      canRedo: M,
      resetMessage: de,
      hooks: be
    } = Je({
      initial: C(g.modelValue),
      hooks: {
        ...g.hooks,
        customValidators: async (m) => {
          var Q;
          const _ = [
            ...c(m),
            ...p(
              m,
              g.disabledTemplateCategories,
              g.disabledTemplateFormats
            )
          ], q = (Q = g.hooks) != null && Q.customValidators ? await g.hooks.customValidators(m) : [];
          return [..._, ...q];
        }
      },
      onDirty: () => x("change", S(I.value))
    }), { lastSavedAt: $e } = Xe(I, { channel: "whatsapp" });
    function fe(m) {
      (m.metaKey || m.ctrlKey) && m.key === "z" && (m.preventDefault(), m.shiftKey ? X() : ce());
    }
    je(() => {
      window.addEventListener("keydown", fe);
    }), Ke(() => {
      window.removeEventListener("keydown", fe);
    }), Be(I, (m) => x("update:modelValue", S(m)), {
      deep: !0
    });
    const ae = ne(), J = ne(!0);
    async function b() {
      if (be.estimateReach)
        try {
          ae.value = await be.estimateReach(I.value.audience);
        } catch {
          ae.value = void 0;
        }
      be.canSend && (J.value = await Promise.resolve(be.canSend()));
    }
    b(), Be(() => I.value.audience, b, { deep: !0 });
    const A = $(() => (H.value, z(ae.value))), U = $(() => A.value.blockingErrors), oe = $(() => A.value.warnings), te = $(() => A.value.valid), L = $(() => {
      var Q, ie, ye;
      const m = I.value.message, _ = [
        !!((Q = m.template_name) != null && Q.trim()),
        !!((ie = m.template_category) != null && ie.trim()),
        !!(m.body ?? "").toString().trim(),
        !!((ye = m.template_language) != null && ye.trim()),
        Array.isArray(m.buttons) ? m.buttons.length > 0 : !1
      ], q = _.filter(Boolean).length;
      return Math.round(q / _.length * 100);
    }), he = $(() => L.value >= 90 ? "Production ready" : L.value >= 70 ? "Strong draft" : L.value >= 40 ? "In progress" : "Needs setup"), ve = $(() => {
      const m = I.value.message;
      return !!((m.body ?? "").toString().trim() || (m.header ?? "").toString().trim() || m.media_url || m.flow_id || m.coupon_code || m.lto_expiry || m.voice_transcript || m.contact_name || m.link_title || m.order_title || Array.isArray(m.buttons) && m.buttons.length || Array.isArray(m.products) && m.products.length || Array.isArray(m.cards) && m.cards.length);
    }), xe = ne(""), ke = ne(!1), R = ne(null), y = $(() => {
      const m = xe.value;
      return m ? De.find((_) => _.id === m) ?? null : null;
    }), B = $(() => {
      const m = I.value.message.body ?? "";
      return y.value ? Ne(m, y.value.data) : m;
    }), Z = $(() => {
      const m = I.value.message.header ?? "";
      return y.value ? Ne(m, y.value.data) : m;
    }), le = $(() => {
      var D;
      const m = I.value.message, _ = m.template_type ?? "text", q = m.header_type ?? "none";
      let Q, ie, ye, _e, K, v, r;
      (_ === "image" || q === "image") && m.media_url ? Q = { type: "image", url: m.media_url } : (_ === "video" || q === "video") && m.media_url ? Q = { type: "video", url: m.media_url } : _ === "document" || q === "document" ? Q = {
        type: "document",
        url: m.media_url || void 0,
        filename: m.document_filename || m.media_url || "document.pdf"
      } : q === "text" && m.header ? Q = { type: "text", text: Z.value } : m.header && (Q = { type: "text", text: Z.value });
      const E = B.value || "Start adding content to see a live preview here.";
      if (_ === "location" && m.location) {
        const h = m.location, u = h.lat ?? h.latitude, l = h.lng ?? h.lon ?? h.longitude;
        u != null && l != null && (ie = {
          lat: u,
          lng: l,
          name: h.name ?? h.title,
          address: h.address ?? `${u}, ${l}`
        });
      }
      (_ === "catalog" || _ === "mpm") && Array.isArray(m.products) && m.products.length && (ye = !0, _e = m.products.map((h) => ({
        image: h.image ?? h.imageUrl,
        name: h.name ?? h.sectionTitle ?? h.title ?? "Product",
        price: h.price ?? h.productId ?? ""
      }))), _ === "carousel" && Array.isArray(m.cards) && m.cards.length && (ye = !0, _e = m.cards.map((h) => ({
        image: h.image ?? h.media_url,
        name: h.title ?? "Card",
        price: h.button_label ?? ""
      }))), _ === "coupon" && m.coupon_code && (K = { code: m.coupon_code }), _ === "lto" && m.lto_expiry && (v = m.lto_expiry), _ === "auth" && (r = { code: m.auth_code ?? m.otp_code ?? "123 456" });
      const T = m.buttons ?? [];
      return _ === "flow" && ((D = m.flow_cta_label) != null && D.trim()) && T.push({
        label: m.flow_cta_label
      }), {
        format: _,
        templateName: m.template_name || void 0,
        templateLanguage: m.template_language || void 0,
        templateCategory: m.template_category || void 0,
        header: Q,
        body: E,
        mediaCaption: m.media_caption || void 0,
        footer: m.footer || void 0,
        buttons: T.map((h) => ({ text: h.label || "Button", type: h.type, value: h.value })),
        location: ie,
        catalog: ye,
        multiProduct: _e,
        coupon: K,
        limitedOffer: v,
        auth: r,
        linkPreview: m.link_title || m.link_description || m.link_url ? {
          title: m.link_title || void 0,
          description: m.link_description || void 0,
          domain: m.link_domain || void 0,
          url: m.link_url || void 0,
          thumbnail: m.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: m.voice_transcript || m.voice_duration || m.voice_profile_image ? {
          transcript: m.voice_transcript || void 0,
          duration: m.voice_duration || void 0,
          profileImage: m.voice_profile_image || void 0
        } : void 0,
        contactCard: m.contact_name || m.contact_phone || m.contact_email ? {
          name: m.contact_name || void 0,
          title: m.contact_title || void 0,
          phone: m.contact_phone || void 0,
          email: m.contact_email || void 0,
          address: m.contact_address || void 0
        } : void 0,
        documentCard: m.document_filename || _ === "document" || q === "document" ? {
          filename: m.document_filename || m.media_url || "document.pdf",
          size: m.document_size || void 0,
          caption: m.media_caption || void 0
        } : void 0,
        locationRequest: m.location_request_label ? { label: m.location_request_label } : void 0,
        orderCard: m.order_title || m.order_items || m.order_image ? {
          title: m.order_title || void 0,
          items: m.order_items || void 0,
          image: m.order_image || void 0,
          buttonLabel: m.order_button_label || void 0
        } : void 0,
        carouselCards: _ === "carousel" && Array.isArray(m.cards) ? m.cards.map((h) => ({
          title: h.title || void 0,
          description: h.description || m.body || void 0,
          image: h.media_url || void 0,
          button: h.button_label || void 0
        })) : void 0,
        reactionEmoji: m.reaction_emoji || void 0,
        flow: _ === "flow" ? {
          id: m.flow_id || void 0,
          ctaLabel: m.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function ge(m) {
      const _ = I.value, q = m.campaign.message ? { ..._.message, ...m.campaign.message } : _.message;
      Y({
        ...m.campaign,
        message: q
      }), R.value = null, ke.value = !1;
    }
    function re(m) {
      const _ = m.target.value;
      if (!_) return;
      const q = yt.find((Q) => Q.id === _);
      q && (V.value ? (R.value = q, ke.value = !0) : ge(q), m.target.value = "");
    }
    function se(m) {
      Y({
        name: m,
        message: { ...I.value.message, template_name: m || void 0 },
        tracking: { ...I.value.tracking ?? {}, campaign_name: m }
      });
    }
    function Se(m) {
      if (O(m), Object.prototype.hasOwnProperty.call(m ?? {}, "template_name")) {
        const _ = String((m == null ? void 0 : m.template_name) ?? "");
        _ !== I.value.name && Y({
          name: _,
          tracking: {
            ...I.value.tracking ?? {},
            campaign_name: _
          }
        });
      }
    }
    Be(
      () => I.value.name,
      (m) => {
        const _ = String(I.value.message.template_name ?? "");
        (m || "") !== _ && O({ template_name: m || void 0 });
      },
      { immediate: !0 }
    );
    function Re(m) {
      const _ = ` {{ .${m.variable} }}`, q = I.value.message.variables ?? [], Q = Array.from(/* @__PURE__ */ new Set([...q, m.variable]));
      if (m.field === "title") {
        const ie = I.value.message.header ?? "";
        O({
          variables: Q,
          header: ie + _
        });
      } else {
        const ie = I.value.message.body ?? "";
        O({
          variables: Q,
          body: ie + _
        });
      }
    }
    function Ue() {
      var q;
      if (!te.value) return;
      const m = mt(I.value, {
        exampleData: (q = y.value) == null ? void 0 : q.data
      }), _ = S(I.value);
      x("save-gupshup-template", m.payload, m.warnings, _), x("save", _);
    }
    return (m, _) => {
      var q;
      return s(), n("div", yr, [
        e("div", hr, [
          Te(Qe, {
            "campaign-name": f(I).name,
            status: f(I).status,
            dirty: f(V),
            "last-saved-at": f($e),
            "can-undo": f(G),
            "can-redo": f(M),
            "slugify-name": g.enforceSlugName,
            "onUpdate:campaignName": se,
            onUndo: f(ce),
            onRedo: f(X)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          U.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: f(we).dangerBg,
              border: `1px solid ${f(we).dangerBorder}`,
              borderRadius: `${f(Ve).input}px`,
              padding: `${f(pe)[12]}px ${f(pe)[16]}px`,
              marginBottom: `${f(pe)[16]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: f(we).danger })
            }, [
              (s(!0), n(F, null, j(U.value, (Q) => (s(), n("li", {
                key: Q.message
              }, d(Q.message), 1))), 128))
            ], 4)
          ], 4)) : w("", !0)
        ]),
        e("div", kr, [
          e("aside", _r, [
            a.disabledSections.includes("whatsapp") ? w("", !0) : (s(), n("div", wr, [
              e("div", $r, [
                e("div", xr, [
                  _[6] || (_[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Cr, d(he.value), 1)
                ]),
                e("div", Sr, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: re
                  }, [
                    _[7] || (_[7] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(F, null, j(f(yt), (Q) => (s(), n("option", {
                      key: Q.id,
                      value: Q.id
                    }, d(Q.label), 9, Ir))), 128))
                  ], 32)
                ]),
                e("div", Ar, [
                  e("div", Tr, [
                    _[8] || (_[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", Br, d(L.value) + "%", 1)
                  ]),
                  e("div", Ur, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: me({ width: `${L.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Te(Fo, {
                message: f(I).message,
                "show-reset": !0,
                "disabled-categories": a.disabledTemplateCategories,
                "disabled-formats": a.disabledTemplateFormats,
                onUpdate: Se,
                onReset: _[0] || (_[0] = (Q) => f(de)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              Te(Ot, {
                message: f(I).message,
                "variable-options": a.variableOptions,
                onUpdate: f(O),
                onInsertVariable: Re
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Lr, [
            !a.designOnly && f(I).audience.test_mode ? (s(), n("div", Rr, [..._[9] || (_[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              ee(" Test mode — only your test segment will receive this. ", -1)
            ])])) : w("", !0),
            e("div", Pr, [
              e("div", Er, [
                e("label", Or, [
                  _[11] || (_[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Le(e("select", {
                    "onUpdate:modelValue": _[1] || (_[1] = (Q) => xe.value = Q),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    _[10] || (_[10] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(F, null, j(f(De), (Q) => (s(), n("option", {
                      key: Q.id,
                      value: Q.id
                    }, d(Q.label), 9, Nr))), 128))
                  ], 512), [
                    [Ee, xe.value]
                  ])
                ]),
                e("div", Vr, [
                  _[12] || (_[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(f(I).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: ue(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !ve.value }])
              }, [
                Te(gr, { template: le.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Mr, [
          oe.value.length > 0 ? (s(), n("div", Dr, [
            _[13] || (_[13] = e("strong", null, "Warning:", -1)),
            ee(" " + d((q = oe.value[0]) == null ? void 0 : q.message) + " ", 1),
            oe.value.length > 1 ? (s(), n("span", Wr, " (+" + d(oe.value.length - 1) + " more) ", 1)) : w("", !0)
          ])) : w("", !0),
          e("div", Hr, [
            a.showDuplicate ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: _[2] || (_[2] = (Q) => x("duplicate", JSON.parse(JSON.stringify(f(I)))))
            }, " Duplicate ")) : w("", !0),
            a.showSave ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: Ue
            }, " Save ")) : w("", !0),
            a.showClose ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: _[3] || (_[3] = (Q) => x("edit"))
            }, " Close ")) : w("", !0)
          ])
        ]),
        ke.value ? (s(), n("div", zr, [
          e("div", Fr, [
            _[14] || (_[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            _[15] || (_[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", qr, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: _[4] || (_[4] = (Q) => {
                  ke.value = !1, R.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: _[5] || (_[5] = (Q) => R.value && ge(R.value))
              }, " Replace ")
            ])
          ])
        ])) : w("", !0)
      ]);
    };
  }
}), Mt = /* @__PURE__ */ Ae(jr, [["__scopeId", "data-v-5139c906"]]), Kr = { class: "kb-section" }, Yr = { class: "kb-section__head" }, Gr = { class: "kb-field" }, Jr = ["value"], Xr = { class: "kb-field" }, Qr = { class: "kb-label" }, Zr = { key: 0 }, ed = { key: 1 }, td = { key: 2 }, ad = ["value"], sd = {
  key: 0,
  class: "kb-truncation-hint"
}, nd = { class: "kb-field" }, ld = { class: "kb-insert-row" }, od = ["value"], id = { class: "kb-field" }, rd = { class: "kb-insert-row" }, dd = /* @__PURE__ */ Ie({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    const c = a, p = o, g = ["first_name", "last_name", "order_id", "city"], k = ne(c.variableOptions && c.variableOptions.length ? [...c.variableOptions] : g), C = ne(k.value[0] ?? g[0]), x = ne("");
    Be(
      () => c.variableOptions,
      (X) => {
        X && X.length && (k.value = [...X], k.value.includes(C.value) || (C.value = k.value[0]));
      }
    );
    const S = $(() => c.message.body ?? ""), I = $(() => S.value.length), V = $(() => I.value ? I.value <= 160 ? 1 : Math.ceil(I.value / 153) : 0), H = $(() => {
      const X = I.value;
      return X <= 160 ? null : X <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function z(X) {
      const G = X.target.value;
      p("update", {
        sender_id: G || void 0
      });
    }
    function Y(X) {
      const G = X.target.value;
      p("update", {
        body: G
      });
    }
    function O() {
      const X = C.value;
      if (!X) return;
      const G = ` {{ .${X} }}`, M = S.value || "", de = c.message.variables ?? [], be = Array.from(/* @__PURE__ */ new Set([...de, X]));
      p("update", {
        body: M + G,
        variables: be
      });
    }
    function ce() {
      const X = x.value.trim();
      X && (k.value.includes(X) || (k.value = [...k.value, X]), C.value = X, x.value = "");
    }
    return (X, G) => (s(), n("section", Kr, [
      e("div", Yr, [
        G[3] || (G[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: G[0] || (G[0] = (M) => X.$emit("reset"))
        }, " Reset section ")) : w("", !0)
      ]),
      G[10] || (G[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Gr, [
        G[4] || (G[4] = e("label", { class: "kb-label" }, [
          ee(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: c.message.sender_id ?? "",
          onInput: z
        }, null, 40, Jr)
      ]),
      e("div", Xr, [
        e("label", Qr, [
          G[5] || (G[5] = ee(" Message body ", -1)),
          e("span", {
            class: ue(["kb-counter", { "kb-counter--warn": V.value > 3 }])
          }, [
            ee(d(I.value) + " chars · ", 1),
            V.value === 0 ? (s(), n("span", Zr, "0 segments")) : V.value === 1 ? (s(), n("span", ed, "1 segment")) : (s(), n("span", td, d(V.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
          value: S.value,
          onInput: Y
        }, null, 40, ad),
        G[6] || (G[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        H.value ? (s(), n("p", sd, d(H.value), 1)) : w("", !0)
      ]),
      e("div", nd, [
        G[7] || (G[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", ld, [
          Le(e("select", {
            "onUpdate:modelValue": G[1] || (G[1] = (M) => C.value = M),
            class: "kb-select"
          }, [
            (s(!0), n(F, null, j(k.value, (M) => (s(), n("option", {
              key: M,
              value: M
            }, d(M), 9, od))), 128))
          ], 512), [
            [Ee, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: O
          }, " Insert into message ")
        ]),
        G[8] || (G[8] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", id, [
        G[9] || (G[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", rd, [
          Le(e("input", {
            "onUpdate:modelValue": G[2] || (G[2] = (M) => x.value = M),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [lt, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ce
          }, " Add ")
        ])
      ])
    ]));
  }
}), ud = /* @__PURE__ */ Ae(dd, [["__scopeId", "data-v-f44c4aab"]]), cd = { class: "keos-sms-builder" }, pd = { class: "kb-builder-top" }, md = { class: "kb-sms-layout" }, vd = { class: "kb-sms-sidebar" }, bd = {
  key: 0,
  class: "kb-sms-form"
}, fd = { class: "kb-sms-form-head" }, gd = { class: "kb-sms-form-head-top" }, yd = { class: "kb-sms-health-pill" }, hd = { class: "kb-wa-form-head-row" }, kd = ["value"], _d = { class: "kb-sms-health" }, wd = { class: "kb-sms-health-row" }, $d = { class: "kb-sms-health-value" }, xd = { class: "kb-sms-health-bar" }, Cd = { class: "kb-sms-canvas" }, Sd = {
  key: 0,
  class: "kb-sms-test-banner"
}, Id = { class: "kb-sms-preview-chrome" }, Ad = { class: "kb-push-preview-controls" }, Td = { class: "kb-push-preview-as" }, Bd = ["value"], Ud = { class: "kb-preview-status" }, Ld = { class: "kb-preview" }, Rd = { class: "kb-sms-preview" }, Pd = { class: "kb-sms-phone" }, Ed = { class: "kb-sms-header" }, Od = { class: "kb-sms-sender-avatar" }, Nd = { class: "kb-sms-header-copy" }, Vd = { class: "kb-sms-sender" }, Md = { class: "kb-sms-meta" }, Dd = { class: "kb-sms-thread" }, Wd = {
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
}, nu = { class: "kb-confirm-dialog" }, lu = { class: "kb-confirm-actions" }, ou = /* @__PURE__ */ Ie({
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
  setup(a, { emit: o }) {
    const c = a, p = o, {
      campaign: g,
      dirty: k,
      customValidatorErrors: C,
      getValidationWithWarnings: x,
      update: S,
      updateMessage: I,
      undo: V,
      redo: H,
      canUndo: z,
      canRedo: Y,
      resetMessage: O,
      hooks: ce
    } = Je({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (K) => {
          var E, T;
          const v = [];
          (E = K.name) != null && E.trim() || v.push("Template name is required");
          const r = (T = c.hooks) != null && T.customValidators ? await c.hooks.customValidators(K) : [];
          return [...v, ...r];
        }
      },
      onDirty: () => p("change", g.value)
    }), { lastSavedAt: X } = Xe(g, { channel: "sms" });
    function G(K) {
      (K.metaKey || K.ctrlKey) && K.key === "z" && (K.preventDefault(), K.shiftKey ? H() : V());
    }
    je(() => {
      window.addEventListener("keydown", G);
    }), Ke(() => {
      window.removeEventListener("keydown", G);
    }), Be(g, (K) => p("update:modelValue", K), { deep: !0 });
    const M = ne(), de = ne(!0);
    async function be() {
      if (ce.estimateReach)
        try {
          M.value = await ce.estimateReach(g.value.audience);
        } catch {
          M.value = void 0;
        }
      ce.canSend && (de.value = await Promise.resolve(ce.canSend()));
    }
    be(), Be(() => g.value.audience, be, { deep: !0 });
    const $e = $(() => (C.value, x(M.value))), fe = $(() => $e.value.blockingErrors), ae = $(() => $e.value.warnings), J = $(() => $e.value.valid), b = $(() => {
      var E, T, D;
      const K = g.value.message, v = [
        !!((E = g.value.name) != null && E.trim()),
        !!((T = K.body) != null && T.trim()),
        !!((D = K.sender_id) != null && D.trim()),
        !!g.value.template_type,
        (K.body ?? "").length > 20
      ], r = v.filter(Boolean).length;
      return Math.round(r / v.length * 100);
    }), A = $(() => b.value >= 90 ? "Production ready" : b.value >= 70 ? "Strong draft" : b.value >= 40 ? "In progress" : "Needs setup"), U = $(() => !!Z.value.trim()), oe = $(
      () => g.value.template_type ?? "transactional"
    ), te = ne(""), L = ne(!1), he = ne(null), ve = $(() => {
      const K = te.value;
      return K ? De.find((v) => v.id === K) ?? null : null;
    }), xe = $(() => {
      const K = Z.value;
      return ve.value ? Ne(K, ve.value.data) : K;
    });
    function ke(K) {
      const v = g.value, r = K.campaign.message ? { ...v.message, ...K.campaign.message } : v.message;
      S({
        ...K.campaign,
        message: r
      }), he.value = null, L.value = !1;
    }
    function R(K) {
      const v = K.target.value;
      if (!v) return;
      const r = ht.find((E) => E.id === v);
      r && (k.value ? (he.value = r, L.value = !0) : ke(r), K.target.value = "");
    }
    function y(K) {
      S({ template_type: K });
    }
    function B(K) {
      S({
        name: K,
        tracking: { ...g.value.tracking ?? {}, campaign_name: K }
      });
    }
    const Z = $(
      () => (g.value.message.body ?? "") || ""
    ), le = $(() => Z.value.length), ge = $(() => /[^\x00-\x7f]/.test(Z.value)), re = $(() => ge.value ? 70 : 160), se = $(() => ge.value ? 67 : 153), Se = $(() => le.value ? le.value <= re.value ? 1 : Math.ceil(le.value / se.value) : 0), Re = $(() => {
      const K = xe.value.trim();
      if (!K) return [];
      const v = Se.value <= 1 ? re.value : se.value, r = [];
      for (let E = 0; E < K.length; E += v)
        r.push(K.slice(E, E + v));
      return r;
    }), Ue = $(() => Re.value.slice(0, 3)), m = $(
      () => Math.max(0, Re.value.length - Ue.value.length)
    ), _ = $(() => ge.value ? "Unicode" : "GSM-7"), q = $(() => U.value ? Se.value > 3 ? "Queued" : "Delivered" : "Draft"), Q = $(() => {
      const K = c.costPerSegment ?? 0;
      return !K || Se.value === 0 ? null : (Se.value * K).toFixed(2);
    }), ie = $(() => {
      const K = le.value, v = re.value + se.value;
      return K <= re.value ? null : K <= v ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), ye = $(
      () => g.value.message.sender_id ?? "YourBrand"
    );
    function _e() {
      J.value && p("save", g.value);
    }
    return (K, v) => {
      var r;
      return s(), n("div", cd, [
        e("div", pd, [
          Te(Qe, {
            "campaign-name": f(g).name,
            status: f(g).status,
            dirty: f(k),
            "last-saved-at": f(X),
            "can-undo": f(z),
            "can-redo": f(Y),
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": B,
            onUndo: f(V),
            onRedo: f(H)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          fe.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: f(we).dangerBg,
              border: `1px solid ${f(we).dangerBorder}`,
              borderRadius: `${f(Ve).input}px`,
              padding: `${f(pe)[12]}px ${f(pe)[16]}px`,
              marginBottom: `${f(pe)[16]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: f(we).danger })
            }, [
              (s(!0), n(F, null, j(fe.value, (E) => (s(), n("li", {
                key: E.message
              }, d(E.message), 1))), 128))
            ], 4)
          ], 4)) : w("", !0)
        ]),
        e("div", md, [
          e("aside", vd, [
            a.disabledSections.includes("sms") ? w("", !0) : (s(), n("div", bd, [
              e("div", fd, [
                e("div", gd, [
                  v[6] || (v[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", yd, d(A.value), 1)
                ]),
                e("div", hd, [
                  Te(ut, {
                    "template-type": oe.value,
                    onUpdate: y
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: R
                  }, [
                    v[7] || (v[7] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(F, null, j(f(ht), (E) => (s(), n("option", {
                      key: E.id,
                      value: E.id
                    }, d(E.label), 9, kd))), 128))
                  ], 32)
                ]),
                e("div", _d, [
                  e("div", wd, [
                    v[8] || (v[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", $d, d(b.value) + "%", 1)
                  ]),
                  e("div", xd, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: me({ width: `${b.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Te(ud, {
                message: f(g).message,
                "variable-options": a.variableOptions,
                "show-reset": !0,
                onUpdate: f(I),
                onReset: v[0] || (v[0] = (E) => f(O)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Cd, [
            !a.designOnly && f(g).audience.test_mode ? (s(), n("div", Sd, [...v[9] || (v[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              ee(" Test mode — only your test segment will receive this. ", -1)
            ])])) : w("", !0),
            e("div", Id, [
              e("div", Ad, [
                e("label", Td, [
                  v[11] || (v[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Le(e("select", {
                    "onUpdate:modelValue": v[1] || (v[1] = (E) => te.value = E),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    v[10] || (v[10] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(F, null, j(f(De), (E) => (s(), n("option", {
                      key: E.id,
                      value: E.id
                    }, d(E.label), 9, Bd))), 128))
                  ], 512), [
                    [Ee, te.value]
                  ])
                ]),
                e("div", Ud, [
                  v[12] || (v[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, d(Se.value || 0), 1)
                ])
              ]),
              e("div", {
                class: ue(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !U.value }])
              }, [
                e("div", Ld, [
                  e("div", Rd, [
                    e("div", Pd, [
                      v[15] || (v[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Ed, [
                        e("div", Od, d(ye.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Nd, [
                          e("div", Vd, d(ye.value), 1),
                          e("div", Md, "Text message · " + d(q.value), 1)
                        ])
                      ]),
                      e("div", Dd, [
                        U.value ? (s(), n(F, { key: 1 }, [
                          (s(!0), n(F, null, j(Ue.value, (E, T) => (s(), n("div", {
                            key: `${T}-${E.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", Hd, d(E), 1),
                            e("span", zd, [
                              v[13] || (v[13] = ee(" 09:21 ", -1)),
                              Ue.value.length > 1 ? (s(), n("span", Fd, "Part " + d(T + 1), 1)) : w("", !0)
                            ])
                          ]))), 128)),
                          m.value > 0 ? (s(), n("div", qd, " +" + d(m.value) + " more segments ", 1)) : w("", !0),
                          e("div", jd, [
                            v[14] || (v[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            ee(" " + d(q.value), 1)
                          ])
                        ], 64)) : (s(), n("div", Wd, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Kd, [
                      ee(d(le.value) + " characters · ", 1),
                      Se.value === 0 ? (s(), n("span", Yd, "0 segments")) : Se.value === 1 ? (s(), n("span", Gd, "1 segment")) : (s(), n("span", Jd, d(Se.value) + " segments", 1)),
                      ee(" (" + d(re.value) + " chars single, " + d(se.value) + " multi-part · " + d(_.value) + ") ", 1),
                      Q.value !== null ? (s(), n("span", Xd, " · Est. " + d(Q.value), 1)) : w("", !0)
                    ]),
                    ie.value ? (s(), n("p", Qd, d(ie.value), 1)) : w("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Zd, [
          ae.value.length > 0 ? (s(), n("div", eu, [
            v[16] || (v[16] = e("strong", null, "Warning:", -1)),
            ee(" " + d((r = ae.value[0]) == null ? void 0 : r.message) + " ", 1),
            ae.value.length > 1 ? (s(), n("span", tu, " (+" + d(ae.value.length - 1) + " more) ", 1)) : w("", !0)
          ])) : w("", !0),
          e("div", au, [
            a.showDuplicate ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: v[2] || (v[2] = (E) => p("duplicate", JSON.parse(JSON.stringify(f(g)))))
            }, " Duplicate ")) : w("", !0),
            a.showSave ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: _e
            }, " Save ")) : w("", !0),
            a.showClose ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: v[3] || (v[3] = (E) => p("edit"))
            }, " Close ")) : w("", !0)
          ])
        ]),
        L.value ? (s(), n("div", su, [
          e("div", nu, [
            v[17] || (v[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            v[18] || (v[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", lu, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: v[4] || (v[4] = (E) => {
                  L.value = !1, he.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: v[5] || (v[5] = (E) => he.value && ke(he.value))
              }, " Replace ")
            ])
          ])
        ])) : w("", !0)
      ]);
    };
  }
}), Dt = /* @__PURE__ */ Ae(ou, [["__scopeId", "data-v-5e442b56"]]), iu = 30, ru = 60, du = 130;
function uu(a) {
  const o = (a ?? "").trim().length;
  return o < iu ? "too_short" : o <= ru ? "good" : "too_long";
}
function cu(a) {
  const o = (a ?? "").trim().length;
  return o === 0 ? "too_short" : o <= du ? "good" : "too_long";
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
function It(a) {
  if (!a || typeof a != "string") return [];
  const o = [];
  for (const c of pu) {
    const p = a.match(c);
    p && o.push(p[0]);
  }
  return o;
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
}, Tu = ["onClick"], Bu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Uu = { class: "em-field kb-field" }, Lu = { class: "em-input-group" }, Ru = ["value"], Pu = { class: "em-var-picker-wrap" }, Eu = {
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
}, Tc = ["onClick"], Bc = {
  key: 6,
  class: "em-block-fields"
}, Uc = ["value", "onChange"], Lc = { class: "em-list-items" }, Rc = ["value", "onInput", "placeholder"], Pc = ["onClick"], Ec = ["onClick"], Oc = {
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
}, Bp = ["onClick"], Up = {
  key: 14,
  class: "em-block-fields"
}, Lp = ["value", "onInput"], Rp = { class: "em-link-list-items" }, Pp = ["value", "onInput"], Ep = ["value", "onInput"], Op = ["onClick"], Np = ["onClick"], Vp = {
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
}, Im = ["onClick"], Am = ["onClick"], Tm = ["onClick"], Bm = { class: "em-check-row" }, Um = ["checked", "onChange"], Lm = { class: "em-add-bar kb-field kb-field--add-bar" }, Rm = { class: "em-add-bar-btns" }, Pm = { class: "em-strip kb-section em-strip--personalize" }, Em = { class: "em-field kb-field" }, Om = { class: "em-input-group" }, Nm = ["value"], Vm = { class: "em-field kb-field" }, Mm = { class: "em-input-group" }, Pe = "{{ .var }}", Dm = /* @__PURE__ */ Ie({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    var h;
    function c() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const p = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], g = [
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
    function k(u) {
      switch (u) {
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
          return { id: c(), type: "social", links: p.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
    const C = a, x = o, S = ["first_name", "last_name", "order_id", "city", "email"], I = ne(
      (h = C.variableOptions) != null && h.length ? [...C.variableOptions] : S
    ), V = ne(I.value[0] ?? "first_name"), H = ne("");
    Be(
      () => C.variableOptions,
      (u) => {
        u != null && u.length && (I.value = [...u], I.value.includes(V.value) || (V.value = I.value[0]));
      }
    );
    const z = $(() => C.message.subject ?? ""), Y = $(() => C.message.preview_text ?? ""), O = $(() => uu(z.value)), ce = $(() => cu(Y.value)), X = $(() => It(z.value)), G = $(() => It(Y.value)), M = $(() => {
      const u = C.message.blocks;
      return Array.isArray(u) && u.length > 0 ? u : [k("paragraph")];
    });
    Be(
      () => C.message.blocks,
      (u) => {
        (!Array.isArray(u) || u.length === 0) && x("update", { blocks: [k("paragraph")] });
      },
      { immediate: !0 }
    );
    function de(u) {
      x("update", { blocks: u });
    }
    function be(u) {
      x("update", { subject: u.target.value });
    }
    function $e(u) {
      const l = u.target.value;
      x("update", { preview_text: l || void 0 });
    }
    function fe(u) {
      x("update", { from_name: u.target.value || void 0 });
    }
    function ae(u) {
      x("update", { from_address: u.target.value || void 0 });
    }
    function J(u) {
      x("update", { reply_to: u.target.value || void 0 });
    }
    const b = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [k("heading"), k("paragraph"), k("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [k("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [k("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [k("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [k("social"), k("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [k("footer"), k("link_list")]
      }
    ];
    function A(u) {
      const l = u.blocks();
      de([...M.value, ...l]);
    }
    function U(u) {
      const l = [...M.value, k(u)];
      de(l);
    }
    function oe(u) {
      de(M.value.filter((l) => l.id !== u));
    }
    function te(u, l) {
      const t = M.value.findIndex((N) => N.id === u);
      if (t < 0) return;
      const P = l === "up" ? t - 1 : t + 1;
      if (P < 0 || P >= M.value.length) return;
      const i = [...M.value];
      [i[t], i[P]] = [i[P], i[t]], de(i);
    }
    function L(u, l) {
      const t = M.value.map((P) => P.id === u ? { ...P, ...l } : P);
      de(t);
    }
    function he(u, l, t) {
      const P = M.value.find((N) => N.id === u);
      if (!P || P.type !== "list") return;
      const i = [...P.items || []];
      i[l] = t, L(u, { items: i });
    }
    function ve(u) {
      const l = M.value.find((t) => t.id === u);
      !l || l.type !== "list" || L(u, { items: [...l.items || [], "New item"] });
    }
    function xe(u, l) {
      const t = M.value.find((i) => i.id === u);
      if (!t || t.type !== "list") return;
      const P = (t.items || []).filter((i, N) => N !== l);
      L(u, { items: P });
    }
    function ke(u, l, t, P) {
      const i = M.value.find((W) => W.id === u);
      if (!i || i.type !== "social") return;
      const N = (i.links || []).map((W, Ce) => Ce === l ? { ...W, [t]: P } : W);
      L(u, { links: N });
    }
    function R(u) {
      const l = M.value.find((t) => t.id === u);
      !l || l.type !== "social" || L(u, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function y(u, l) {
      const t = M.value.find((i) => i.id === u);
      if (!t || t.type !== "social") return;
      const P = (t.links || []).filter((i, N) => N !== l);
      L(u, { links: P });
    }
    function B(u, l, t, P) {
      const i = M.value.find((W) => W.id === u);
      if (!i || i.type !== "link_list") return;
      const N = (i.links || []).map((W, Ce) => Ce === l ? { ...W, [t]: P } : W);
      L(u, { links: N });
    }
    function Z(u) {
      const l = M.value.find((t) => t.id === u);
      !l || l.type !== "link_list" || L(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function le(u, l) {
      const t = M.value.find((i) => i.id === u);
      if (!t || t.type !== "link_list") return;
      const P = (t.links || []).filter((i, N) => N !== l);
      L(u, { links: P });
    }
    function ge(u, l) {
      const t = M.value.find((P) => P.id === u);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const P = [...t.cells || []];
          for (; P.length < l.columnCount; ) P.push("Cell content");
          l.cells = P.slice(0, l.columnCount);
        }
        L(u, l);
      }
    }
    function re(u, l, t) {
      const P = M.value.find((N) => N.id === u);
      if (!P || P.type !== "row") return;
      const i = [...P.cells || []];
      i[l] = t, L(u, { cells: i });
    }
    function se(u, l, t, P) {
      const i = M.value.find((W) => W.id === u);
      if (!i || i.type !== "navbar") return;
      const N = (i.links || []).map((W, Ce) => Ce === l ? { ...W, [t]: P } : W);
      L(u, { links: N });
    }
    function Se(u) {
      const l = M.value.find((t) => t.id === u);
      !l || l.type !== "navbar" || L(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function Re(u, l) {
      const t = M.value.find((P) => P.id === u);
      !t || t.type !== "navbar" || L(u, { links: (t.links || []).filter((P, i) => i !== l) });
    }
    function Ue(u, l, t, P) {
      const i = M.value.find((W) => W.id === u);
      if (!i || i.type !== "accordion") return;
      const N = (i.items || []).map((W, Ce) => Ce === l ? { ...W, [t]: P } : W);
      L(u, { items: N });
    }
    function m(u) {
      const l = M.value.find((t) => t.id === u);
      !l || l.type !== "accordion" || L(u, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function _(u, l) {
      const t = M.value.find((P) => P.id === u);
      !t || t.type !== "accordion" || L(u, { items: (t.items || []).filter((P, i) => i !== l) });
    }
    function q(u, l, t, P) {
      const i = M.value.find((W) => W.id === u);
      if (!i || i.type !== "carousel") return;
      const N = (i.slides || []).map((W, Ce) => Ce === l ? { ...W, [t]: P } : W);
      L(u, { slides: N });
    }
    function Q(u) {
      const l = M.value.find((t) => t.id === u);
      !l || l.type !== "carousel" || L(u, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function ie(u, l) {
      const t = M.value.find((P) => P.id === u);
      !t || t.type !== "carousel" || L(u, { slides: (t.slides || []).filter((P, i) => i !== l) });
    }
    function ye(u, l = V.value) {
      const t = ` {{ .${l} }}`, P = C.message.variables ?? [], i = Array.from(/* @__PURE__ */ new Set([...P, l]));
      u === "subject" ? x("update", {
        subject: (z.value || "") + t,
        variables: i
      }) : x("update", {
        preview_text: (Y.value || "") + t,
        variables: i
      });
    }
    function _e(u, l = V.value) {
      const t = M.value.find((We) => We.id === u);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const P = ` {{ .${l} }}`, i = C.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...i, l])), W = (t.type === "footer", "content"), ze = (t[W] ?? "") + P, qe = M.value.map(
        (We) => We.id === u ? { ...We, [W]: ze } : We
      );
      x("update", { blocks: qe, variables: N });
    }
    function K(u, l, t = V.value) {
      const P = M.value.find((ze) => ze.id === u);
      if (!P || P.type !== "row") return;
      const i = ` {{ .${t} }}`, N = C.message.variables ?? [], W = Array.from(/* @__PURE__ */ new Set([...N, t])), Ce = [...P.cells || []];
      Ce[l] = (Ce[l] || "") + i, L(u, { cells: Ce }), x("update", { variables: W });
    }
    function v(u, l, t = V.value) {
      const P = M.value.find((We) => We.id === u);
      if (!P || P.type !== "columns") return;
      const i = ` {{ .${t} }}`, N = C.message.variables ?? [], W = Array.from(/* @__PURE__ */ new Set([...N, t])), Ce = l === "left" ? "leftContent" : "rightContent", qe = (P[Ce] ?? "") + i;
      L(u, { [Ce]: qe }), x("update", { variables: W });
    }
    const r = ne(null);
    function E(u) {
      r.value = r.value === u ? null : u;
    }
    function T(u, l) {
      if (l) {
        if (u === "subject") ye("subject", l);
        else if (u === "preview") ye("preview", l);
        else if (u.startsWith("block:")) _e(u.slice(6), l);
        else if (u.startsWith("col-left:")) v(u.slice(9), "left", l);
        else if (u.startsWith("col-right:")) v(u.slice(10), "right", l);
        else if (u.startsWith("row:")) {
          const [, t, P] = u.split(":");
          K(t, Number(P), l);
        }
        r.value = null;
      }
    }
    function D() {
      const u = H.value.trim();
      !u || I.value.includes(u) || (I.value = [...I.value, u], V.value = u, H.value = "");
    }
    return (u, l) => (s(), n("section", bu, [
      e("div", fu, [
        e("div", gu, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => u.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", yu, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: a.message.from_name ?? "",
            onInput: fe
          }, null, 40, hu)
        ]),
        e("div", ku, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: a.message.from_address ?? "",
            onInput: ae
          }, null, 40, _u)
        ]),
        e("div", wu, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            ee("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: a.message.reply_to ?? "",
            onInput: J
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
                onClick: l[1] || (l[1] = (t) => E("subject")),
                title: "Insert variable"
              }, d(Pe)),
              r.value === "subject" ? (s(), n("div", Au, [
                (s(!0), n(F, null, j(I.value, (t) => (s(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (P) => T("subject", t)
                }, d(t), 9, Tu))), 128))
              ])) : w("", !0)
            ])
          ]),
          e("span", {
            class: ue(["em-analyzer", `em-analyzer--${O.value}`])
          }, d(f(mu)(O.value)), 3),
          X.value.length ? (s(), n("span", Bu, "Spammy: " + d(X.value.join(", ")), 1)) : w("", !0)
        ]),
        e("div", Uu, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            ee("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Lu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: Y.value,
              onInput: $e
            }, null, 40, Ru),
            e("div", Pu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => E("preview")),
                title: "Insert variable"
              }, d(Pe)),
              r.value === "preview" ? (s(), n("div", Eu, [
                (s(!0), n(F, null, j(I.value, (t) => (s(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (P) => T("preview", t)
                }, d(t), 9, Ou))), 128))
              ])) : w("", !0)
            ])
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ue(["em-analyzer", `em-analyzer--${ce.value}`])
          }, d(f(vu)(ce.value)), 3),
          G.value.length ? (s(), n("span", Nu, "Spammy: " + d(G.value.join(", ")), 1)) : w("", !0)
        ])
      ]),
      e("div", Vu, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Mu, [
          (s(), n(F, null, j(b, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (P) => A(t)
          }, d(t.label), 9, Du)), 64))
        ])
      ]),
      e("div", Wu, [
        l[64] || (l[64] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[65] || (l[65] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Hu, [
          (s(!0), n(F, null, j(M.value, (t, P) => (s(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Fu, [
              e("span", qu, d(t.type), 1),
              e("div", ju, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === 0,
                  onClick: (i) => te(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Ku),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === M.value.length - 1,
                  onClick: (i) => te(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Yu),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (i) => oe(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Gu)
              ])
            ]),
            t.type === "heading" ? (s(), n("div", Ju, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { level: Number(i.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Xu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Heading text"
              }, null, 40, Qu),
              e("div", Zu, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`block:${t.id}`)
                }, d(Pe), 8, ec),
                r.value === `block:${t.id}` ? (s(), n("div", tc, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `block-var-heading-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`block:${t.id}`, i)
                  }, d(i), 9, ac))), 128))
                ])) : w("", !0)
              ])
            ])) : t.type === "paragraph" ? (s(), n("div", sc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, nc),
              e("div", lc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`block:${t.id}`)
                }, d(Pe), 8, oc),
                r.value === `block:${t.id}` ? (s(), n("div", ic, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `block-var-paragraph-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`block:${t.id}`, i)
                  }, d(i), 9, rc))), 128))
                ])) : w("", !0)
              ])
            ])) : t.type === "image" ? (s(), n("div", dc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (i) => L(t.id, { src: i.target.value }),
                placeholder: "Image URL"
              }, null, 40, uc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (i) => L(t.id, { alt: i.target.value }),
                placeholder: "Alt text"
              }, null, 40, cc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (i) => L(t.id, { linkUrl: i.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, pc)
            ])) : t.type === "button" ? (s(), n("div", mc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (i) => L(t.id, { text: i.target.value }),
                placeholder: "Button text"
              }, null, 40, vc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (i) => L(t.id, { url: i.target.value }),
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
                  onInput: (i) => L(t.id, { borderRadius: Number(i.target.value) || 0 })
                }, null, 40, gc)
              ]),
              e("label", yc, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (i) => L(t.id, { ghost: i.target.checked })
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
                onInput: (i) => L(t.id, { height: Number(i.target.value) || 24 })
              }, null, 40, _c),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (s(), n("div", wc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, $c),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (i) => L(t.id, { unsubscribeUrl: i.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, xc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (i) => L(t.id, { companyAddress: i.target.value }),
                placeholder: "Company address"
              }, null, 40, Cc),
              e("div", Sc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`block:${t.id}`)
                }, d(Pe), 8, Ic),
                r.value === `block:${t.id}` ? (s(), n("div", Ac, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `block-var-footer-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`block:${t.id}`, i)
                  }, d(i), 9, Tc))), 128))
                ])) : w("", !0)
              ])
            ])) : t.type === "list" ? (s(), n("div", Bc, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { style: i.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Uc),
              e("div", Lc, [
                (s(!0), n(F, null, j(t.items || [], (i, N) => (s(), n("div", {
                  key: N,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i,
                    onInput: (W) => he(t.id, N, W.target.value),
                    placeholder: `Item ${N + 1}`
                  }, null, 40, Rc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (W) => xe(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Pc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => ve(t.id)
              }, "+ Add item", 8, Ec)
            ])) : t.type === "quote" ? (s(), n("div", Oc, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { style: i.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Nc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Vc),
              e("div", Mc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`block:${t.id}`)
                }, d(Pe), 8, Dc),
                r.value === `block:${t.id}` ? (s(), n("div", Wc, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `block-var-quote-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`block:${t.id}`, i)
                  }, d(i), 9, Hc))), 128))
                ])) : w("", !0)
              ])
            ])) : t.type === "social" ? (s(), n("div", zc, [
              e("div", Fc, [
                (s(!0), n(F, null, j(t.links || [], (i, N) => (s(), n("div", {
                  key: N,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: i.platform,
                    class: "em-select em-select--sm",
                    onChange: (W) => ke(t.id, N, "platform", W.target.value)
                  }, [...l[45] || (l[45] = [
                    He('<option value="facebook" data-v-64de8497>Facebook</option><option value="twitter" data-v-64de8497>Twitter / X</option><option value="instagram" data-v-64de8497>Instagram</option><option value="linkedin" data-v-64de8497>LinkedIn</option><option value="youtube" data-v-64de8497>YouTube</option><option value="tiktok" data-v-64de8497>TikTok</option><option value="custom" data-v-64de8497>Custom</option>', 7)
                  ])], 40, qc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (W) => ke(t.id, N, "url", W.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, jc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (W) => y(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Kc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => R(t.id)
              }, "+ Add link", 8, Yc)
            ])) : t.type === "video" ? (s(), n("div", Gc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (i) => L(t.id, { thumbnailUrl: i.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Jc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (i) => L(t.id, { videoUrl: i.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Xc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (i) => L(t.id, { caption: i.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Qc)
            ])) : t.type === "link_list" ? (s(), n("div", Zc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (i) => L(t.id, { separator: i.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, ep),
              e("div", tp, [
                (s(!0), n(F, null, j(t.links || [], (i, N) => (s(), n("div", {
                  key: N,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i.text,
                    onInput: (W) => B(t.id, N, "text", W.target.value),
                    placeholder: "Label"
                  }, null, 40, ap),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (W) => B(t.id, N, "url", W.target.value),
                    placeholder: "URL"
                  }, null, 40, sp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (W) => le(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, np)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => Z(t.id)
              }, "+ Add link", 8, lp)
            ])) : t.type === "columns" ? (s(), n("div", op, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (i) => L(t.id, { leftContent: i.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, ip),
              e("div", rp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`col-left:${t.id}`)
                }, d(Pe), 8, dp),
                r.value === `col-left:${t.id}` ? (s(), n("div", up, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `col-left-var-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`col-left:${t.id}`, i)
                  }, d(i), 9, cp))), 128))
                ])) : w("", !0)
              ]),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (i) => L(t.id, { rightContent: i.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, pp),
              e("div", mp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`col-right:${t.id}`)
                }, d(Pe), 8, vp),
                r.value === `col-right:${t.id}` ? (s(), n("div", bp, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `col-right-var-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`col-right:${t.id}`, i)
                  }, d(i), 9, fp))), 128))
                ])) : w("", !0)
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
                  onInput: (i) => L(t.id, { thickness: Number(i.target.value) || 1 })
                }, null, 40, hp),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", kp, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (i) => L(t.id, { color: i.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, _p)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { lineStyle: i.target.value })
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
                onChange: (i) => ge(t.id, { columnCount: Number(i.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, xp),
              (s(!0), n(F, null, j(t.cells || [], (i, N) => (s(), n("div", {
                key: N,
                class: "em-row-cell"
              }, [
                e("label", Cp, "Column " + d(N + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: i,
                  onInput: (W) => re(t.id, N, W.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Sp),
                e("div", Ip, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (W) => E(`row:${t.id}:${N}`)
                  }, d(Pe), 8, Ap),
                  r.value === `row:${t.id}:${N}` ? (s(), n("div", Tp, [
                    (s(!0), n(F, null, j(I.value, (W) => (s(), n("button", {
                      key: `row-var-${t.id}-${N}-${W}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (Ce) => T(`row:${t.id}:${N}`, W)
                    }, d(W), 9, Bp))), 128))
                  ])) : w("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (s(), n("div", Up, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (i) => L(t.id, { separator: i.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Lp),
              e("div", Rp, [
                (s(!0), n(F, null, j(t.links || [], (i, N) => (s(), n("div", {
                  key: N,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i.text,
                    onInput: (W) => se(t.id, N, "text", W.target.value),
                    placeholder: "Label"
                  }, null, 40, Pp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (W) => se(t.id, N, "url", W.target.value),
                    placeholder: "URL"
                  }, null, 40, Ep),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (W) => Re(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Op)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => Se(t.id)
              }, "+ Add link", 8, Np)
            ])) : t.type === "accordion" ? (s(), n("div", Vp, [
              (s(!0), n(F, null, j(t.items || [], (i, N) => (s(), n("div", {
                key: N,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: i.title,
                  onInput: (W) => Ue(t.id, N, "title", W.target.value),
                  placeholder: "Section title"
                }, null, 40, Mp),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: i.content,
                  onInput: (W) => Ue(t.id, N, "content", W.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Dp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (W) => _(t.id, N),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Wp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => m(t.id)
              }, "+ Add section", 8, Hp)
            ])) : t.type === "carousel" ? (s(), n("div", zp, [
              (s(!0), n(F, null, j(t.slides || [], (i, N) => (s(), n("div", {
                key: N,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: i.imageUrl,
                  onInput: (W) => q(t.id, N, "imageUrl", W.target.value),
                  placeholder: "Image URL"
                }, null, 40, Fp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: i.alt,
                  onInput: (W) => q(t.id, N, "alt", W.target.value),
                  placeholder: "Alt text"
                }, null, 40, qp),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: i.linkUrl,
                  onInput: (W) => q(t.id, N, "linkUrl", W.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, jp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (W) => ie(t.id, N),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Kp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => Q(t.id)
              }, "+ Add slide", 8, Yp)
            ])) : t.type === "countdown" ? (s(), n("div", Gp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (i) => L(t.id, { label: i.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Jp),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (i) => L(t.id, { endDateTime: i.target.value ? new Date(i.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Xp),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (s(), n("div", Qp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (i) => L(t.id, { imageUrl: i.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Zp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (i) => L(t.id, { title: i.target.value }),
                placeholder: "Product title"
              }, null, 40, em),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (i) => L(t.id, { price: i.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, tm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (i) => L(t.id, { buttonText: i.target.value }),
                placeholder: "Button text"
              }, null, 40, am),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (i) => L(t.id, { buttonUrl: i.target.value }),
                placeholder: "Button URL"
              }, null, 40, sm)
            ])) : t.type === "liquid" ? (s(), n("div", nm, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, lm),
              e("div", om, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`block:${t.id}`)
                }, d(Pe), 8, im),
                r.value === `block:${t.id}` ? (s(), n("div", rm, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `block-var-liquid-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`block:${t.id}`, i)
                  }, d(i), 9, dm))), 128))
                ])) : w("", !0)
              ]),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (s(), n("div", um, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (i) => L(t.id, { caption: i.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, cm),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, pm),
              e("div", mm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => E(`block:${t.id}`)
                }, d(Pe), 8, vm),
                r.value === `block:${t.id}` ? (s(), n("div", bm, [
                  (s(!0), n(F, null, j(I.value, (i) => (s(), n("button", {
                    key: `block-var-code-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (N) => T(`block:${t.id}`, i)
                  }, d(i), 9, fm))), 128))
                ])) : w("", !0)
              ]),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (s(), n("div", gm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (i) => L(t.id, { feedUrl: i.target.value }),
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
                  onInput: (i) => L(t.id, { maxItems: Number(i.target.value) || 5 })
                }, null, 40, km)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (s(), n("div", _m, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (i) => L(t.id, { imageUrl: i.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, wm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (i) => L(t.id, { alt: i.target.value }),
                placeholder: "Alt text"
              }, null, 40, $m),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (i) => L(t.id, { fallbackUrl: i.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, xm)
            ])) : w("", !0),
            g.includes(t.type) ? (s(), n("div", Cm, [
              e("div", Sm, [
                e("button", {
                  type: "button",
                  class: ue(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (i) => L(t.id, { alignment: "left" })
                }, [...l[59] || (l[59] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Im),
                e("button", {
                  type: "button",
                  class: ue(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (i) => L(t.id, { alignment: "center" })
                }, [...l[60] || (l[60] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Am),
                e("button", {
                  type: "button",
                  class: ue(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (i) => L(t.id, { alignment: "right" })
                }, [...l[61] || (l[61] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Tm)
              ]),
              e("label", Bm, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (i) => L(t.id, { fullWidth: i.target.checked })
                }, null, 40, Um),
                l[62] || (l[62] = e("span", null, "Full width", -1))
              ])
            ])) : w("", !0)
          ], 8, zu))), 128))
        ]),
        e("div", Lm, [
          l[63] || (l[63] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Rm, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (t) => U("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (t) => U("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (t) => U("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => U("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => U("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => U("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => U("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => U("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => U("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => U("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => U("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => U("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => U("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => U("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => U("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => U("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => U("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => U("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => U("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => U("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => U("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => U("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => U("footer")),
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
            Le(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => V.value = t),
              class: "em-select em-select--flex"
            }, [
              (s(!0), n(F, null, j(I.value, (t) => (s(), n("option", {
                key: t,
                value: t
              }, d(t), 9, Nm))), 128))
            ], 512), [
              [Ee, V.value]
            ])
          ])
        ]),
        e("div", Vm, [
          l[67] || (l[67] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Mm, [
            Le(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => H.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [lt, H.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: D
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Wm = /* @__PURE__ */ Ae(Dm, [["__scopeId", "data-v-64de8497"]]), Hm = { class: "keos-email-builder" }, zm = { class: "kb-builder-top" }, Fm = { class: "kb-email-layout" }, qm = { class: "kb-email-sidebar" }, jm = {
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
}, xv = { class: "kb-confirm-dialog" }, Cv = { class: "kb-confirm-actions" }, Sv = /* @__PURE__ */ Ie({
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
  setup(a, { emit: o }) {
    function c(v) {
      if (!Array.isArray(v) || v.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const r = (h) => String(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), E = [
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
      ], T = (h, u) => {
        if (!E.includes(u.type)) return h;
        const l = u.alignment || "left", t = !!u.fullWidth;
        return `<div style="text-align:${l};${t ? "width:100%;" : ""}">${h}</div>`;
      }, D = [];
      for (const h of v)
        switch (h.type) {
          case "heading": {
            const u = Math.min(3, Math.max(1, Number(h.level) || 1)), l = r(h.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            D.push(
              T(
                `<h${u} style="margin:0 0 12px;font-size:${u === 1 ? "22" : u === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${l || "Heading"}</h${u}>`,
                h
              )
            );
            break;
          }
          case "paragraph": {
            const u = r(h.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            D.push(
              T(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${u || "Paragraph"}</p>`,
                h
              )
            );
            break;
          }
          case "image": {
            const u = (h.src || "").trim(), l = r(h.alt || ""), t = (h.linkUrl || "").trim(), i = !!h.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", N = u ? `<img src="${r(u)}" alt="${l}" style="${i}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            D.push(
              T(
                `<div style="margin:0 0 12px;">${t ? `<a href="${r(t)}" style="color:#2563eb;">${N}</a>` : N}</div>`,
                h
              )
            );
            break;
          }
          case "button": {
            const u = r(h.text || "Button"), l = (h.url || "#").trim(), t = Math.min(24, Math.max(0, Number(h.borderRadius) ?? 8)), P = !!h.fullWidth, i = !!h.ghost, N = i ? "transparent" : "#0f172a", W = i ? "#0f172a" : "#fff", Ce = i ? "2px solid #0f172a" : "none", ze = P ? "block" : "inline-block", qe = P ? "100%" : "auto";
            D.push(
              T(
                `<p style="margin:0 0 12px;"><a href="${r(l)}" style="display:${ze};width:${qe};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${N};color:${W};border:${Ce};text-decoration:none;font-size:14px;font-weight:600;border-radius:${t}px;overflow-wrap:anywhere;">${u}</a></p>`,
                h
              )
            );
            break;
          }
          case "divider": {
            const u = Math.min(8, Math.max(1, Number(h.thickness) || 1)), l = (h.color || "#e2e8f0").trim() || "#e2e8f0", t = h.lineStyle || "solid";
            D.push(
              T(
                `<hr style="margin:16px 0;border:0;border-top:${u}px ${t} ${l};" />`,
                h
              )
            );
            break;
          }
          case "spacer": {
            const u = Math.min(120, Math.max(8, Number(h.height) || 24));
            D.push(T(`<div style="height:${u}px;"></div>`, h));
            break;
          }
          case "footer": {
            const u = r(h.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = (h.unsubscribeUrl || "").trim(), t = r(h.companyAddress || "");
            D.push(
              T(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${u || "Footer"}` + (l ? `<p style="margin:8px 0 0;"><a href="${r(l)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (t ? `<p style="margin:4px 0 0;">${t}</p>` : "") + "</div>",
                h
              )
            );
            break;
          }
          case "list": {
            const u = h.style === "numbered" ? "ol" : "ul", t = (Array.isArray(h.items) ? h.items : []).map(
              (P) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${r(String(P)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            D.push(
              T(
                `<${u} style="margin:0 0 12px;padding-left:24px;">${t || "<li>Item</li>"}</${u}>`,
                h
              )
            );
            break;
          }
          case "quote": {
            const u = r(h.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, t = l[h.style || "default"] || l.default;
            D.push(
              T(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${t}font-size:14px;line-height:1.6;">${u || "Quote"}</div>`,
                h
              )
            );
            break;
          }
          case "social": {
            const l = (Array.isArray(h.links) ? h.links : []).filter((t) => (t.url || "").trim());
            if (l.length === 0)
              D.push(
                T(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  h
                )
              );
            else {
              const t = (P) => `<a href="${r((P.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${r(P.platform || "Link")}</a>`;
              D.push(
                T(
                  `<div style="margin:0 0 12px;">${l.map(t).join("")}</div>`,
                  h
                )
              );
            }
            break;
          }
          case "video": {
            const u = (h.thumbnailUrl || "").trim(), l = (h.videoUrl || "#").trim(), t = r(h.caption || ""), i = !!h.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", N = u ? `<img src="${r(u)}" alt="Video" style="${i}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            D.push(
              T(
                `<div style="margin:0 0 12px;"><a href="${r(l)}" style="display:block;color:inherit;">${N}</a>` + (t ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${t}</p>` : "") + "</div>",
                h
              )
            );
            break;
          }
          case "link_list": {
            const u = Array.isArray(h.links) ? h.links : [], l = r(h.separator || " | "), P = u.filter(
              (i) => (i.text || i.url) && (i.url || "").trim()
            ).map(
              (i) => `<a href="${r((i.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${r(i.text || "Link")}</a>`
            );
            D.push(
              T(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${P.join(l)}</p>`,
                h
              )
            );
            break;
          }
          case "columns": {
            const u = r(h.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = r(h.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            D.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${u || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const u = Math.min(4, Math.max(1, Number(h.columnCount) || 2)), l = Array.isArray(h.cells) ? h.cells.slice(0, u) : [], t = 100 / u, P = Array.from({ length: u }, (i, N) => {
              const W = l[N] ?? "", Ce = r(W).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${t}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${Ce || "—"}</td>`;
            }).join("");
            D.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${P}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const u = Array.isArray(h.links) ? h.links : [], l = r(h.separator || " | "), P = u.filter(
              (i) => (i.text || i.url) && (i.url || "").trim()
            ).map(
              (i) => `<a href="${r((i.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${r(i.text || "Link")}</a>`
            );
            D.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${P.length ? P.join(l) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const l = (Array.isArray(h.items) ? h.items : []).map((t) => {
              const P = r(t.title || "Section"), i = r(t.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${P}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${i}</div></details>`;
            }).join("");
            D.push(
              l ? `<div style="margin:0 0 12px;">${l}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const l = (Array.isArray(h.slides) ? h.slides : []).filter(
              (t) => (t.imageUrl || "").trim()
            );
            if (l.length === 0)
              D.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const t = l[0], P = `<img src="${r(t.imageUrl)}" alt="${r(t.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, i = (t.linkUrl || "").trim();
              D.push(
                `<div style="margin:0 0 12px;">${i ? `<a href="${r(i)}">${P}</a>` : P}` + (l.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${l.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const u = r(h.label || "Offer ends in"), l = h.endDateTime ? new Date(h.endDateTime).toLocaleString() : "—";
            D.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${u}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${l}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const u = (h.imageUrl || "").trim(), l = r(h.title || "Product"), t = r(h.price || ""), P = r(h.buttonText || "Buy now"), i = (h.buttonUrl || "#").trim(), N = u ? `<img src="${r(u)}" alt="${r(h.alt || l)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            D.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${N}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${l}</p>` + (t ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${t}</p>` : "") + `<a href="${r(i)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${P}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const u = r((h.content || "").trim());
            D.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${u || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const u = (h.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = r((h.caption || "").trim());
            D.push(
              '<div style="margin:0 0 12px;">' + (l ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${l}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${u || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const u = (h.feedUrl || "").trim(), l = Math.min(20, Math.max(1, Number(h.maxItems) ?? 5));
            D.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (u ? `<p style="margin:0;font-size:12px;color:#64748b;">${r(u)} · max ${l} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const u = (h.imageUrl || "").trim(), l = (h.fallbackUrl || "").trim(), t = r(h.alt || "Dynamic image");
            u ? D.push(
              `<div style="margin:0 0 12px;"><img src="${r(u)}" alt="${t}" style="max-width:100%;height:auto;display:block;border:0;" />` + (l ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${r(l)}</p>` : "") + "</div>"
            ) : D.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return D.join("");
    }
    function p(v) {
      return /<\s*html[\s>]/i.test(v) || /<!doctype\s+html/i.test(v);
    }
    function g(v) {
      const r = v.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return r ? r[1] : v;
    }
    function k(v, r, E) {
      const T = (r || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), D = (E || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${T}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        D ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${D}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${v}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const C = a, x = o, {
      campaign: S,
      dirty: I,
      customValidatorErrors: V,
      getValidationWithWarnings: H,
      update: z,
      updateMessage: Y,
      undo: O,
      redo: ce,
      canUndo: X,
      canRedo: G,
      resetMessage: M,
      hooks: de
    } = Je({
      initial: C.modelValue,
      hooks: {
        ...C.hooks,
        customValidators: async (v) => {
          var D, h, u;
          const r = [];
          (D = v.name) != null && D.trim() || r.push("Template name is required");
          const E = v.message;
          (h = E == null ? void 0 : E.subject) != null && h.trim() || r.push("Subject is required");
          const T = (u = C.hooks) != null && u.customValidators ? await C.hooks.customValidators(v) : [];
          return [...r, ...T];
        }
      },
      onDirty: () => x("change", S.value)
    }), { lastSavedAt: be } = Xe(S, { channel: "email" });
    function $e(v) {
      (v.metaKey || v.ctrlKey) && v.key === "z" && (v.preventDefault(), v.shiftKey ? ce() : O());
    }
    je(() => {
      window.addEventListener("keydown", $e);
    }), Ke(() => {
      window.removeEventListener("keydown", $e);
    }), Be(
      S,
      (v) => x("update:modelValue", {
        ...v,
        message: {
          ...v.message,
          html: q.value
        }
      }),
      { deep: !0 }
    );
    const fe = ne(), ae = ne(!0);
    async function J() {
      if (de.estimateReach)
        try {
          fe.value = await de.estimateReach(S.value.audience);
        } catch {
          fe.value = void 0;
        }
      de.canSend && (ae.value = await Promise.resolve(de.canSend()));
    }
    J(), Be(() => S.value.audience, J, { deep: !0 });
    const b = $(() => (V.value, H(fe.value))), A = $(() => b.value.blockingErrors), U = $(() => b.value.warnings), oe = $(() => b.value.valid), te = $(() => {
      var T, D, h;
      const v = S.value.message, r = [
        !!((T = S.value.name) != null && T.trim()),
        !!((D = v.subject) != null && D.trim()),
        !!((h = v.from_address) != null && h.trim()),
        !!(Array.isArray(v.blocks) ? v.blocks.length : (v.html ?? "").trim().length),
        !!S.value.template_type
      ], E = r.filter(Boolean).length;
      return Math.round(E / r.length * 100);
    }), L = $(() => te.value >= 90 ? "Production ready" : te.value >= 70 ? "Strong draft" : te.value >= 40 ? "In progress" : "Needs setup"), he = $(
      () => S.value.template_type ?? "transactional"
    ), ve = ne(""), xe = ne(!1), ke = ne(null), R = $(() => {
      const v = ve.value;
      return v ? De.find((r) => r.id === v) ?? null : null;
    });
    function y(v) {
      const r = S.value, E = v.campaign.message ? { ...r.message, ...v.campaign.message } : r.message;
      z({
        ...v.campaign,
        message: E
      }), ke.value = null, xe.value = !1;
    }
    function B(v) {
      const r = v.target.value;
      if (!r) return;
      const E = kt.find((T) => T.id === r);
      E && (I.value ? (ke.value = E, xe.value = !0) : y(E), v.target.value = "");
    }
    function Z(v) {
      z({ template_type: v });
    }
    function le(v) {
      z({
        name: v,
        tracking: { ...S.value.tracking ?? {}, campaign_name: v }
      });
    }
    const ge = $(
      () => S.value.message.subject ?? ""
    ), re = $(
      () => S.value.message.preview_text ?? ""
    ), se = $(
      () => S.value.message.html ?? ""
    ), Se = $(
      () => S.value.message.from_name ?? "Your App"
    ), Re = $(
      () => S.value.message.from_address ?? "notifications@example.com"
    ), Ue = $(
      () => S.value.message.blocks ?? []
    ), m = $(() => {
      const v = S.value.message, r = (v.html ?? "").trim(), T = (Array.isArray(v.blocks) ? v.blocks : []).some((D) => {
        if (!D || typeof D != "object") return !1;
        const h = (D.type ?? "").toString();
        if (h === "paragraph" || h === "heading" || h === "quote" || h === "footer") {
          const u = (D.content ?? "").toString().trim();
          return !(!u || u === "Heading" || u.startsWith("Your text here."));
        }
        return h === "image" || h === "video" || h === "dynamic_image" ? !!(D.src ?? D.imageUrl ?? D.thumbnailUrl ?? "").toString().trim() : h === "button" ? !!(D.text ?? "").toString().trim() : !0;
      });
      return !!((v.subject ?? "").toString().trim() || (v.preview_text ?? "").toString().trim() || r || T);
    }), _ = $(() => {
      const v = Ue.value;
      if (Array.isArray(v) && v.length > 0)
        return c(v);
      const r = se.value;
      return r && r.trim() ? p(r) ? g(r) : r : c([]);
    }), q = $(() => {
      const v = Ue.value;
      if (Array.isArray(v) && v.length > 0)
        return k(
          c(v),
          ge.value,
          re.value
        );
      const r = se.value;
      return r && r.trim() ? p(r) ? r : k(r, ge.value, re.value) : k(
        c([]),
        ge.value,
        re.value
      );
    }), Q = $(() => {
      const v = ge.value;
      return R.value ? Ne(v, R.value.data) : v;
    }), ie = $(() => {
      const v = re.value;
      return R.value ? Ne(v, R.value.data) : v;
    }), ye = $(() => {
      const v = _.value;
      return R.value ? Ne(v, R.value.data) : v;
    }), _e = ne("desktop");
    function K() {
      oe.value && x("save", {
        ...S.value,
        message: {
          ...S.value.message,
          html: q.value
        }
      });
    }
    return (v, r) => {
      var E;
      return s(), n("div", Hm, [
        e("div", zm, [
          Te(Qe, {
            "campaign-name": f(S).name,
            status: f(S).status,
            dirty: f(I),
            "last-saved-at": f(be),
            "can-undo": f(X),
            "can-redo": f(G),
            "slugify-name": C.enforceSlugName,
            "onUpdate:campaignName": le,
            onUndo: f(O),
            onRedo: f(ce)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          A.value.length > 0 ? (s(), n("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: f(we).dangerBg,
              border: `1px solid ${f(we).dangerBorder}`,
              borderRadius: `${f(Ve).input}px`,
              padding: `${f(pe)[16]}px ${f(pe)[24]}px`,
              marginBottom: `${f(pe)[24]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: f(we).danger })
            }, [
              (s(!0), n(F, null, j(A.value, (T) => (s(), n("li", {
                key: T.message
              }, d(T.message), 1))), 128))
            ], 4)
          ], 4)) : w("", !0)
        ]),
        e("div", Fm, [
          e("aside", qm, [
            a.disabledSections.includes("email") ? w("", !0) : (s(), n("div", jm, [
              e("div", Km, [
                e("div", Ym, [
                  r[8] || (r[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Gm, d(L.value), 1)
                ]),
                e("div", Jm, [
                  Te(ut, {
                    "template-type": he.value,
                    onUpdate: Z
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: B
                  }, [
                    r[9] || (r[9] = e("option", { value: "" }, "Presets…", -1)),
                    (s(!0), n(F, null, j(f(kt), (T) => (s(), n("option", {
                      key: T.id,
                      value: T.id
                    }, d(T.label), 9, Xm))), 128))
                  ], 32)
                ]),
                e("div", Qm, [
                  e("div", Zm, [
                    r[10] || (r[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", ev, d(te.value) + "%", 1)
                  ]),
                  e("div", tv, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: me({ width: `${te.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Te(Wm, {
                message: f(S).message,
                "variable-options": a.variableOptions,
                "show-reset": !0,
                onUpdate: f(Y),
                onReset: r[0] || (r[0] = (T) => f(M)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", av, [
            !a.designOnly && f(S).audience.test_mode ? (s(), n("div", sv, [...r[11] || (r[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              ee(" Test mode — only your test segment will receive this. ", -1)
            ])])) : w("", !0),
            e("div", nv, [
              e("div", lv, [
                e("label", ov, [
                  r[13] || (r[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Le(e("select", {
                    "onUpdate:modelValue": r[1] || (r[1] = (T) => ve.value = T),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    r[12] || (r[12] = e("option", { value: "" }, "No substitution", -1)),
                    (s(!0), n(F, null, j(f(De), (T) => (s(), n("option", {
                      key: T.id,
                      value: T.id
                    }, d(T.label), 9, iv))), 128))
                  ], 512), [
                    [Ee, ve.value]
                  ])
                ]),
                e("div", rv, [
                  r[14] || (r[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, d(_e.value), 1)
                ])
              ]),
              e("div", dv, [
                e("button", {
                  type: "button",
                  class: ue(["kb-email-device-btn", {
                    "kb-email-device-btn--active": _e.value === "desktop"
                  }]),
                  onClick: r[2] || (r[2] = (T) => _e.value = "desktop")
                }, [...r[15] || (r[15] = [
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
                  ee(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: ue(["kb-email-device-btn", {
                    "kb-email-device-btn--active": _e.value === "mobile"
                  }]),
                  onClick: r[3] || (r[3] = (T) => _e.value = "mobile")
                }, [...r[16] || (r[16] = [
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
                  ee(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: ue(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": _e.value === "mobile",
                  "kb-email-preview-frame--empty": !m.value
                }])
              }, [
                e("div", uv, [
                  e("div", cv, [
                    e("span", pv, d(Se.value), 1),
                    e("span", mv, "<" + d(Re.value) + ">", 1)
                  ]),
                  e("div", vv, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: Q.value || "No subject"
                    }, d(Q.value || "No subject"), 9, bv),
                    ie.value ? (s(), n("span", fv, " — " + d(ie.value), 1)) : w("", !0)
                  ])
                ]),
                e("div", gv, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: ye.value
                  }, null, 8, yv)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", hv, [
          U.value.length > 0 ? (s(), n("div", kv, [
            r[17] || (r[17] = e("strong", null, "Warning:", -1)),
            ee(" " + d((E = U.value[0]) == null ? void 0 : E.message) + " ", 1),
            U.value.length > 1 ? (s(), n("span", _v, " (+" + d(U.value.length - 1) + " more) ", 1)) : w("", !0)
          ])) : w("", !0),
          e("div", wv, [
            a.showDuplicate ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: r[4] || (r[4] = (T) => x("duplicate", JSON.parse(JSON.stringify(f(S)))))
            }, " Duplicate ")) : w("", !0),
            a.showSave ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: K
            }, " Save ")) : w("", !0),
            a.showClose ? (s(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: r[5] || (r[5] = (T) => x("edit"))
            }, " Close ")) : w("", !0)
          ])
        ]),
        xe.value ? (s(), n("div", $v, [
          e("div", xv, [
            r[18] || (r[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            r[19] || (r[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Cv, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: r[6] || (r[6] = (T) => {
                  xe.value = !1, ke.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: r[7] || (r[7] = (T) => ke.value && y(ke.value))
              }, " Replace ")
            ])
          ])
        ])) : w("", !0)
      ]);
    };
  }
}), Wt = /* @__PURE__ */ Ae(Sv, [["__scopeId", "data-v-f45fc2a3"]]), Iv = { class: "kb-shell" }, Av = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Tv = ["aria-selected", "onClick"], Bv = { class: "kb-shell__meta" }, Uv = ["href"], Lv = { class: "kb-shell__body" }, Rv = /* @__PURE__ */ Ie({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(a, { emit: o }) {
    const c = o, p = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (g, k) => (s(), n("div", Iv, [
      e("header", {
        class: "kb-shell__header",
        style: me({ padding: `${f(pe)[12]}px ${f(pe)[24]}px`, borderBottom: `1px solid ${f(we).neutral.border}`, background: f(we).neutral.bg })
      }, [
        k[0] || (k[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Av, [
          (s(), n(F, null, j(p, (C) => e("button", {
            key: C.id,
            type: "button",
            class: ue(["kb-shell__channel", { "kb-shell__channel--active": a.channel === C.id }]),
            role: "tab",
            "aria-selected": a.channel === C.id,
            onClick: (x) => c("switch-channel", C.id)
          }, d(C.label), 11, Tv)), 64))
        ]),
        e("div", Bv, [
          a.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: me({ padding: "2px 8px", borderRadius: `${f(Ve).input}px`, fontSize: "0.75rem", background: f(we).neutral.bg, color: f(we).neutral.textMuted })
          }, d(a.environment), 5)) : w("", !0),
          a.helpUrl ? (s(), n("a", {
            key: 1,
            href: a.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: me({ color: f(we).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Uv)) : w("", !0)
        ])
      ], 4),
      e("div", Lv, [
        Oe(g.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Pv = /* @__PURE__ */ Ae(Rv, [["__scopeId", "data-v-0df30803"]]), Ev = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Ov = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Nv = ["onClick"], Vv = /* @__PURE__ */ Ie({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(a) {
    var k;
    const o = a, c = ne(((k = o.items[0]) == null ? void 0 : k.id) ?? "");
    let p = null;
    function g(C) {
      const x = document.getElementById(C);
      x && x.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return je(() => {
      const C = o.scrollContainerId ? document.getElementById(o.scrollContainerId) : document;
      C && (p = new IntersectionObserver(
        (x) => {
          for (const S of x)
            if (S.isIntersecting) {
              const I = S.target.getAttribute("data-outline-id");
              I && (c.value = I);
            }
        },
        { root: C === document ? null : C, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), o.items.forEach((x) => {
        const S = document.getElementById(x.id);
        S && (p == null || p.observe(S));
      }));
    }), Ke(() => {
      p == null || p.disconnect();
    }), Be(
      () => o.items,
      (C) => {
        C.length && !c.value && (c.value = C[0].id);
      },
      { immediate: !0 }
    ), (C, x) => (s(), n("nav", Ev, [
      e("ul", Ov, [
        (s(!0), n(F, null, j(a.items, (S) => (s(), n("li", {
          key: S.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ue(["kb-outline__btn", { "kb-outline__btn--active": c.value === S.id }]),
            style: me({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${f(pe)[8]}px ${f(pe)[12]}px`,
              border: "none",
              borderRadius: `${f(Ve).input}px`,
              background: c.value === S.id ? f(we).neutral.bg : "transparent",
              color: c.value === S.id ? "#0f172a" : f(we).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: c.value === S.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (I) => g(S.id)
          }, d(S.label), 15, Nv)
        ]))), 128))
      ])
    ]));
  }
}), Mv = /* @__PURE__ */ Ae(Vv, [["__scopeId", "data-v-25c37675"]]), Dv = ["id"], Wv = {
  key: 1,
  class: "kb-form-shell__head"
}, Hv = /* @__PURE__ */ Ie({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(a) {
    return (o, c) => (s(), n("div", {
      class: "kb-form-shell",
      id: a.sectionId ?? void 0,
      style: me({
        padding: `${f(pe)[24]}px ${f(pe)[24]}px ${f(pe)[32]}px`,
        marginBottom: 0
      })
    }, [
      a.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: me({ marginBottom: f(pe)[24], paddingBottom: f(pe)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: me({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: f(pe)[12] })
        }, d(a.label), 5),
        Oe(o.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", Wv, [
        Oe(o.$slots, "head", {}, void 0, !0)
      ])),
      Oe(o.$slots, "default", {}, void 0, !0)
    ], 12, Dv));
  }
}), zv = /* @__PURE__ */ Ae(Hv, [["__scopeId", "data-v-6504df41"]]), Fv = /* @__PURE__ */ Ie({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(a) {
    return (o, c) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: me({
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
      Oe(o.$slots, "default")
    ], 4));
  }
}), qv = /* @__PURE__ */ Ie({
  __name: "BuilderTopShell",
  setup(a) {
    return (o, c) => (s(), n("div", {
      class: "kb-top-shell",
      style: me({
        marginLeft: f(pe)[24],
        marginRight: f(pe)[24]
      })
    }, [
      Oe(o.$slots, "header"),
      Oe(o.$slots, "errors"),
      Oe(o.$slots, "warnings"),
      Oe(o.$slots, "default")
    ], 4));
  }
});
function jv(a) {
  a.component("KeosNotificationBuilder", Vt), a.component("KeosWhatsAppBuilder", Mt), a.component("KeosSmsBuilder", Dt), a.component("KeosEmailBuilder", Wt), a.component("BuilderShell", Pv), a.component("BuilderOutline", Mv), a.component("BuilderVersionHistoryModal", Nt), a.component("BuilderFormShell", zv), a.component("BuilderActionsBar", Fv), a.component("BuilderTopShell", qv);
}
const Yv = {
  install: jv,
  KeosNotificationBuilder: Vt,
  KeosWhatsAppBuilder: Mt,
  KeosSmsBuilder: Dt,
  KeosEmailBuilder: Wt
};
export {
  Fv as BuilderActionsBar,
  zv as BuilderFormShell,
  Mv as BuilderOutline,
  Pv as BuilderShell,
  qv as BuilderTopShell,
  Nt as BuilderVersionHistoryModal,
  De as DEFAULT_SAMPLE_PROFILES,
  Wt as KeosEmailBuilder,
  Vt as KeosNotificationBuilder,
  Dt as KeosSmsBuilder,
  Mt as KeosWhatsAppBuilder,
  Yv as default,
  jv as install,
  Ne as renderTemplatePreview,
  Xe as useAutosave,
  Je as useCampaignState
};
//# sourceMappingURL=index.js.map
