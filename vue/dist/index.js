import { ref as ie, watch as Pe, computed as k, defineComponent as Ue, openBlock as a, createElementBlock as n, normalizeStyle as ye, unref as w, createElementVNode as e, normalizeClass as me, Fragment as W, renderList as D, toDisplayString as u, createTextVNode as te, createCommentVNode as v, withDirectives as We, vModelSelect as ze, vModelText as ht, createStaticVNode as et, withKeys as Zt, onMounted as nt, onUnmounted as st, createVNode as Ee, createBlock as ea, withModifiers as at, renderSlot as Ke } from "vue";
const he = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Je = {
  input: 6,
  card: 12,
  button: 6
}, xe = {
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
xe.neutral.textMuted, xe.neutral.textMeta;
const it = {
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
}, ta = ["android", "ios", "web"], Vt = "normal", Mt = ["low", "normal", "high"], Wt = 86400, aa = [3600, 7200, 86400, 172800], Dt = "1.0", na = ["topic", "segment", "user_list"];
function yt() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...ta],
    test_mode: !1
  };
}
function ft() {
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
function gt() {
  return {
    priority: Vt,
    ttl: Wt,
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
function sa(l) {
  return {
    schema_version: Dt,
    name: "",
    status: "draft",
    audience: yt(),
    message: ft(),
    delivery: gt(),
    tracking: kt(),
    ...l
  };
}
function jt(l) {
  const d = l;
  return d.schema_version || (d.schema_version = Dt), d.audience || (d.audience = yt()), d.message || (d.message = ft()), d.delivery || (d.delivery = gt()), d.tracking || (d.tracking = kt()), Mt.includes(d.delivery.priority) || (d.delivery.priority = Vt), d.delivery.ttl === void 0 && (d.delivery.ttl = Wt), na.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const oa = 1e5;
function la(l, d) {
  var x, I, A;
  const c = [], y = d ?? l.audience.estimated_reach;
  return y !== void 0 && y >= oa && c.push({
    message: `Estimated reach is very high (${y.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), l.tracking && !((x = l.tracking.campaign_name) != null && x.trim()) && !((I = l.name) != null && I.trim()) && c.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (A = l.message.deep_link) != null && A.trim() || c.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), c;
}
function Ht(l, d = "error") {
  return { message: l, severity: d };
}
function Ft(l) {
  const d = [];
  return l.schema_version || d.push(Ht("Missing schema_version")), {
    valid: d.length === 0,
    errors: d
  };
}
function ia(l, d) {
  const c = Ft(l), y = la(l, d);
  return {
    valid: c.valid,
    errors: [
      ...c.errors,
      ...y.map((x) => Ht(x.message, x.severity))
    ]
  };
}
function ra(l) {
  return l.errors.filter((d) => d.severity === "error");
}
function da(l) {
  return l.errors.filter((d) => d.severity !== "error");
}
function ua(l) {
  const d = String(l ?? "").trim().toLowerCase();
  return d === "authentication" ? "AUTHENTICATION" : d === "utility" ? "UTILITY" : "MARKETING";
}
function ca(l, d = "template_message") {
  return (String(l ?? "").trim() || d).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || d;
}
function pa(l) {
  const d = String(l.header_type ?? "").trim().toLowerCase();
  if (d === "image")
    return "IMAGE";
  if (d === "video")
    return "VIDEO";
  if (d === "document")
    return "DOCUMENT";
  if (d === "text")
    return "TEXT";
  const c = String(l.template_type ?? "").trim().toLowerCase();
  return c === "image" ? "IMAGE" : c === "video" ? "VIDEO" : c === "document" ? "DOCUMENT" : null;
}
function ot(l, d = []) {
  if (!l)
    return { text: "", varOrder: [...d] };
  const c = [...d], y = /* @__PURE__ */ new Map();
  return c.forEach((I, A) => y.set(I, A + 1)), { text: l.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (I, A) => (y.has(A) || (y.set(A, c.length + 1), c.push(A)), `{{${y.get(A)}}}`)), varOrder: c };
}
function wt(l, d) {
  return l.map((c) => {
    const y = d == null ? void 0 : d[c];
    return typeof y == "string" && y.length > 0 ? y : `sample_${c}`;
  });
}
function ma(l, d) {
  const c = [];
  let y = [...d];
  return { buttons: l.slice(0, 10).map((I) => {
    const A = I, C = String(A.type ?? "quick_reply").trim().toLowerCase(), U = String(A.label ?? "").trim() || "Button";
    if (C === "url") {
      const L = ot(String(A.url ?? ""), y);
      return y = L.varOrder, { type: "URL", text: U, url: L.text || void 0 };
    }
    return C === "call" ? {
      type: "PHONE_NUMBER",
      text: U,
      phone_number: String(A.phone ?? "").trim() || void 0
    } : C === "opt_out" ? (c.push("Opt-out button is provider-specific; mapped as QUICK_REPLY."), { type: "QUICK_REPLY", text: U }) : { type: "QUICK_REPLY", text: U };
  }).filter((I) => !!I.text), varOrder: y, warnings: c };
}
function va(l) {
  return l.slice(0, 10).map((d) => {
    const c = d, y = String(c.type ?? "quick_reply").trim().toLowerCase(), x = String(c.label ?? "").trim() || "Button";
    return y === "url" ? {
      type: "URL",
      title: x,
      ...String(c.url ?? "").trim() ? { url: String(c.url).trim() } : {}
    } : y === "call" ? {
      type: "PHONE_NUMBER",
      title: x,
      ...String(c.phone ?? "").trim() ? { phoneNumber: String(c.phone).trim() } : {}
    } : y === "opt_out" ? { type: "OPT_OUT", title: x } : { type: "QUICK_REPLY", title: x };
  }).filter((d) => !!d.title);
}
function $t(l) {
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
    "media_url"
  ];
  for (const y of c)
    l[y] !== void 0 && l[y] !== null && l[y] !== "" && (d[y] = l[y]);
  return Object.keys(d).length ? d : void 0;
}
function ba(l, d = {}) {
  const c = [], y = l.message, x = [], I = ca(y.template_name ?? l.name, l.name || "template_message"), A = ua(y.template_category), C = String(y.template_language ?? "en_US").trim() || "en_US";
  let U = [];
  const L = pa(y), T = String(y.header ?? "").trim();
  if (L === "TEXT" && T) {
    const Y = ot(T, U);
    U = Y.varOrder;
    const E = wt(U, d.exampleData);
    x.push({
      type: "HEADER",
      format: "TEXT",
      text: Y.text,
      ...E.length ? { example: { header_text: E } } : {}
    });
  } else L && L !== "TEXT" && (x.push({ type: "HEADER", format: L }), y.media_url || c.push(`Header format ${L} selected but media_url is empty.`));
  const Q = String(y.body ?? "").trim(), ee = ot(Q, U);
  U = ee.varOrder;
  const de = wt(U, d.exampleData);
  x.push({
    type: "BODY",
    text: ee.text,
    ...de.length ? { example: { body_text: [de] } } : {}
  });
  const M = String(y.footer ?? "").trim();
  if (M) {
    const Y = ot(M, U);
    U = Y.varOrder, x.push({
      type: "FOOTER",
      text: Y.text
    });
  }
  const j = Array.isArray(y.buttons) ? y.buttons : [];
  if (j.length) {
    const Y = ma(j, U);
    U = Y.varOrder, c.push(...Y.warnings), Y.buttons.length && x.push({ type: "BUTTONS", buttons: Y.buttons });
  }
  const H = String(y.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(H) && c.push(`template_type="${H}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: I,
      category: A,
      language: C,
      components: x
    },
    warnings: c
  };
}
function xt(l, d = {}) {
  var M, j, H;
  const c = ba(l, d), y = l.message, x = c.payload.components.find((Y) => Y.type === "HEADER"), I = c.payload.components.find((Y) => Y.type === "BODY"), A = c.payload.components.find((Y) => Y.type === "FOOTER"), C = String(y.body ?? "").trim(), U = String(y.header ?? "").trim(), L = String(y.footer ?? "").trim(), T = Array.isArray(y.buttons) ? y.buttons : [], Q = va(T), ee = (() => {
    const Y = String(y.template_type ?? "").trim().toLowerCase();
    return Y === "image" ? "IMAGE" : Y === "video" ? "VIDEO" : Y === "document" ? "DOCUMENT" : "TEXT";
  })();
  return { payload: {
    elementName: c.payload.name,
    languageCode: c.payload.language,
    category: c.payload.category,
    templateType: ee,
    content: C || (I == null ? void 0 : I.text) || "",
    ...(x == null ? void 0 : x.format) === "TEXT" && (U || x.text) ? { header: U || x.text } : {},
    ...L || A != null && A.text ? { footer: L || (A == null ? void 0 : A.text) } : {},
    ...Q.length ? { buttons: Q } : {},
    ...(H = (j = (M = I == null ? void 0 : I.example) == null ? void 0 : M.body_text) == null ? void 0 : j[0]) != null && H.length ? { example: I.example.body_text[0] } : {},
    metaTemplate: c.payload,
    metaWhatsApp: c.payload,
    ...$t(y) ? { advanced: $t(y) } : {}
  }, warnings: c.warnings };
}
function Xe(l, d) {
  return l.length <= d ? { text: l, truncated: !1 } : { text: l.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const lt = it.android;
function ha(l) {
  const { title: d, body: c } = l, y = Xe(d || "", lt.title), x = Xe(c || "", lt.body);
  return {
    title: y.text,
    body: x.text,
    imageUrl: l.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: x.truncated,
    expanded: !1
  };
}
function ya(l) {
  const { title: d, body: c } = l, y = Xe(d || "", lt.title), x = Xe(c || "", lt.body);
  return {
    title: y.text,
    body: x.text,
    imageUrl: l.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: x.truncated,
    expanded: !0
  };
}
function fa(l, d = {}) {
  const c = d.expanded ? ya(l) : ha(l);
  return d.darkMode !== void 0 && (c.darkMode = d.darkMode), c;
}
const Ct = it.ios;
function qt(l) {
  const { title: d, body: c } = l, y = Xe(d || "", Ct.title), x = Xe(c || "", Ct.body);
  return {
    title: y.text,
    body: x.text,
    imageUrl: l.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: x.truncated,
    expanded: !1
  };
}
function ga(l) {
  return qt(l);
}
function ka(l, d = {}) {
  const c = d.variant === "lockscreen" ? ga(l) : qt(l);
  return d.darkMode !== void 0 && (c.darkMode = d.darkMode), c;
}
const St = it.web;
function It(l) {
  const { title: d, body: c } = l, y = Xe(d || "", St.title), x = Xe(c || "", St.body);
  return {
    title: y.text,
    body: x.text,
    imageUrl: l.imageUrl,
    titleTruncated: y.truncated,
    bodyTruncated: x.truncated
  };
}
function _a(l) {
  return l.map((d) => ({ message: d, severity: "error" }));
}
function ct(l) {
  return JSON.parse(JSON.stringify(l));
}
function rt(l = {}) {
  const d = ie(
    jt(l.initial ?? sa())
  ), c = l.hooks ?? {}, y = ie(!1), x = ie([]);
  Pe(
    d,
    () => {
      if (!c.customValidators) {
        x.value = [];
        return;
      }
      c.customValidators(d.value).then((O) => {
        x.value = O;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const I = ie([]), A = ie([]);
  function C() {
    const O = ct(d.value);
    I.value = [...I.value.slice(-19), O], A.value = [];
  }
  const U = k(() => I.value.length > 0), L = k(() => A.value.length > 0);
  function T() {
    I.value.length !== 0 && (A.value = [ct(d.value), ...A.value], d.value = I.value[I.value.length - 1], I.value = I.value.slice(0, -1));
  }
  function Q() {
    A.value.length !== 0 && (I.value = [...I.value, ct(d.value)], d.value = A.value[0], A.value = A.value.slice(1));
  }
  Pe(
    d,
    () => {
      var O;
      y.value = !0, (O = l.onDirty) == null || O.call(l);
    },
    { deep: !0 }
  );
  const ee = k(() => Ft(d.value));
  function de(O) {
    const ue = ia(d.value, O), oe = _a(x.value), R = [...ra(ue), ...oe], ve = [...ue.errors, ...oe], ke = ue.valid && oe.length === 0;
    return {
      ...ue,
      errors: ve,
      valid: ke,
      blockingErrors: R,
      warnings: da(ue)
    };
  }
  function M(O) {
    C(), d.value = { ...d.value, ...O };
  }
  function j(O) {
    C(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...O }
    };
  }
  function H(O) {
    C(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...O }
    };
  }
  function Y(O) {
    C(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...O }
    };
  }
  function E(O) {
    C(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...O } : { campaign_name: "", tags: [], ab_test: !1, ...O }
    };
  }
  function z(O) {
    C(), d.value = {
      ...d.value,
      message: { ...ft(), ...O }
    };
  }
  function G(O) {
    C(), d.value = {
      ...d.value,
      delivery: { ...gt(), ...O }
    };
  }
  function ce(O) {
    C(), d.value = {
      ...d.value,
      tracking: { ...kt(), ...O }
    };
  }
  function be(O) {
    C(), d.value = {
      ...d.value,
      audience: { ...yt(), ...O }
    };
  }
  const ge = k(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function X(O, ue) {
    const oe = ge.value;
    let R;
    switch (O) {
      case "android":
        R = fa(oe, { expanded: ue == null ? void 0 : ue.expanded });
        break;
      case "ios":
        R = ka(oe);
        break;
      case "web":
        R = It(oe);
        break;
      default:
        R = It(oe);
    }
    const ve = d.value.message.actions ?? [], ke = d.value.message.location;
    return { ...R, actions: ve, location: ke ?? void 0 };
  }
  const h = it;
  async function _() {
    return c.customValidators ? c.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: y,
    validation: ee,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: x,
    getValidationWithWarnings: de,
    update: M,
    updateAudience: j,
    updateMessage: H,
    updateDelivery: Y,
    updateTracking: E,
    undo: T,
    redo: Q,
    canUndo: U,
    canRedo: L,
    resetMessage: z,
    resetDelivery: G,
    resetTracking: ce,
    resetAudience: be,
    getPreview: X,
    previewInput: ge,
    characterLimits: h,
    runCustomValidators: _,
    hooks: c
  };
}
const wa = "keos-draft", $a = 2e3;
function xa(l, d) {
  return `${wa}-${l}-${d}`;
}
function dt(l, d) {
  const c = d.channel, y = k(
    () => {
      var T, Q;
      return xa(
        c,
        d.key ?? ((T = l.value) == null ? void 0 : T.id) ?? ((Q = l.value) == null ? void 0 : Q.name) ?? "draft"
      );
    }
  ), x = ie(null);
  let I = null;
  function A() {
    try {
      const T = JSON.stringify(l.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(y.value, T), x.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(y.value);
    } catch {
    }
  }
  function U() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const T = window.localStorage.getItem(y.value);
      if (!T) return null;
      const Q = JSON.parse(T);
      return jt(Q);
    } catch {
      return null;
    }
  }
  function L() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return Pe(
    l,
    () => {
      L() && (I && clearTimeout(I), I = setTimeout(() => {
        I = null, A();
      }, $a));
    },
    { deep: !0 }
  ), {
    lastSavedAt: x,
    clearDraft: C,
    getDraft: U,
    persist: A
  };
}
const Ca = { class: "kb-header__row" }, Sa = ["value"], Ia = { class: "kb-header__actions" }, Aa = ["disabled"], Ta = ["disabled"], Ra = ["value"], Ua = ["value"], Ba = /* @__PURE__ */ Ue({
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
  setup(l, { emit: d }) {
    const c = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], y = l, x = d, I = () => !!(y.campaignName || "").trim();
    function A(L) {
      return y.slugifyName ? L.trim().replace(/\s+/g, "-") : L;
    }
    function C(L) {
      return L.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function U(L) {
      const T = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return T[L] ?? T.draft;
    }
    return (L, T) => (a(), n("header", {
      class: "kb-header",
      style: ye({
        padding: `${w(he)[16]}px 0`,
        borderBottom: `1px solid ${w(xe).neutral.border}`,
        marginBottom: `${w(he)[16]}px`
      })
    }, [
      e("div", Ca, [
        e("div", {
          class: me(["kb-header__name-section", { "kb-header__name-section--filled": I() }])
        }, [
          T[4] || (T[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: l.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: T[0] || (T[0] = (Q) => x("update:campaignName", A(Q.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Sa),
          T[5] || (T[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Ia, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !l.canUndo,
            onClick: T[1] || (T[1] = (Q) => x("undo"))
          }, " Undo ", 8, Aa),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !l.canRedo,
            onClick: T[2] || (T[2] = (Q) => x("redo"))
          }, " Redo ", 8, Ta)
        ]),
        l.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: l.workflowStatus,
          class: "kb-header__status-select",
          style: ye({
            padding: `${w(he)[4]}px ${w(he)[8]}px`,
            borderRadius: `${w(Je).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...U(l.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: T[3] || (T[3] = (Q) => x("update:workflowStatus", Q.target.value))
        }, [
          (a(), n(W, null, D(c, (Q) => e("option", {
            key: Q.value,
            value: Q.value
          }, u(Q.label), 9, Ua)), 64))
        ], 44, Ra)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: ye({
            padding: `${w(he)[4]}px ${w(he)[8]}px`,
            borderRadius: `${w(Je).input}px`,
            background: w(xe).neutral.bg,
            fontSize: "0.8125rem",
            color: w(xe).neutral.textMuted
          })
        }, u(l.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ye({ fontSize: "0.8125rem", color: w(xe).neutral.textMuted, marginTop: `${w(he)[4]}px` })
      }, [
        l.saving ? (a(), n(W, { key: 0 }, [
          te("Saving…")
        ], 64)) : l.dirty ? (a(), n(W, { key: 1 }, [
          te("Unsaved changes")
        ], 64)) : l.lastSavedAt ? (a(), n(W, { key: 2 }, [
          te("Last saved at " + u(C(l.lastSavedAt)), 1)
        ], 64)) : v("", !0)
      ], 4)
    ], 4));
  }
}), Le = (l, d) => {
  const c = l.__vccOpts || l;
  for (const [y, x] of d)
    c[y] = x;
  return c;
}, ut = /* @__PURE__ */ Le(Ba, [["__scopeId", "data-v-56efb3ec"]]), La = { class: "kb-section" }, Pa = { class: "kb-section__head" }, Ea = { class: "kb-section__desc" }, Oa = { class: "kb-field" }, Na = { class: "kb-label" }, Va = { class: "kb-field-with-rail" }, Ma = ["value", "aria-invalid", "aria-describedby"], Wa = { class: "kb-var-picker-wrap" }, Da = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, ja = ["onClick"], Ha = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, Fa = { class: "kb-field" }, qa = { class: "kb-label" }, za = { class: "kb-field-with-rail" }, Ya = ["value", "aria-invalid", "aria-describedby"], Ka = { class: "kb-var-picker-wrap" }, Ga = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, Ja = ["onClick"], Xa = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, Qa = { class: "kb-field" }, Za = ["value", "aria-invalid", "aria-describedby"], en = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, tn = { class: "kb-field" }, an = ["value", "aria-invalid", "aria-describedby"], nn = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, sn = { class: "kb-field" }, on = { class: "kb-location-row" }, ln = ["value"], rn = ["value"], dn = ["value"], un = ["value"], cn = { class: "kb-field" }, pn = { class: "kb-actions-list" }, mn = ["value", "onInput"], vn = ["value", "onInput"], bn = ["onClick"], hn = ["disabled"], yn = { class: "kb-action-chips" }, fn = ["disabled", "onClick"], gn = /* @__PURE__ */ Ue({
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
  setup(l, { emit: d }) {
    const c = l, y = d, x = [
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
    ], I = k(() => {
      const L = (c.message.variables ?? []).filter(Boolean);
      return L.length ? Array.from(new Set(L)) : x;
    }), A = ie(null);
    function C(L) {
      A.value = A.value === L ? null : L;
    }
    function U(L, T) {
      const Q = ` {{ .${T} }}`, ee = (c.message.variables ?? []).filter(Boolean), de = Array.from(/* @__PURE__ */ new Set([...ee, T]));
      L === "title" ? y("update", { title: `${c.message.title || ""}${Q}`, variables: de }) : y("update", { body: `${c.message.body || ""}${Q}`, variables: de }), A.value = null;
    }
    return (L, T) => {
      var Q, ee, de, M;
      return a(), n("section", La, [
        e("div", Pa, [
          T[12] || (T[12] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          l.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: T[0] || (T[0] = (j) => L.$emit("reset"))
          }, " Reset section ")) : v("", !0)
        ]),
        e("p", Ea, " Message body is required. Title is optional. Character limits depend on the selected platform (" + u(l.selectedPlatform) + "). ", 1),
        e("div", Oa, [
          e("label", Na, [
            T[13] || (T[13] = te(" Title ", -1)),
            e("span", {
              class: me(["kb-counter", { "kb-counter--warn": l.titleCount > l.titleLimit }])
            }, u(l.titleCount) + "/" + u(l.titleLimit), 3)
          ]),
          e("div", Va, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: l.message.title,
              "aria-invalid": !!l.titleError,
              "aria-describedby": l.titleError ? "title-error" : void 0,
              onInput: T[1] || (T[1] = (j) => L.$emit("update", { title: j.target.value }))
            }, null, 40, Ma),
            e("div", Wa, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: T[2] || (T[2] = (j) => C("title"))
              }, "{{ .var }}"),
              A.value === "title" ? (a(), n("div", Da, [
                (a(!0), n(W, null, D(I.value, (j) => (a(), n("button", {
                  key: `push-title-var-${j}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (H) => U("title", j)
                }, u(j), 9, ja))), 128))
              ])) : v("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ye({ "--pct": Math.min(100, l.titleCount / l.titleLimit * 100) + "%" })
            }, [...T[14] || (T[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          l.titleError ? (a(), n("p", Ha, u(l.titleError), 1)) : v("", !0)
        ]),
        e("div", Fa, [
          e("label", qa, [
            T[15] || (T[15] = te(" Message ", -1)),
            e("span", {
              class: me(["kb-counter", { "kb-counter--warn": l.bodyCount > l.bodyLimit }])
            }, u(l.bodyCount) + "/" + u(l.bodyLimit), 3)
          ]),
          e("div", za, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: l.message.body,
              "aria-invalid": !!l.bodyError,
              "aria-describedby": l.bodyError ? "body-error" : void 0,
              onInput: T[3] || (T[3] = (j) => L.$emit("update", { body: j.target.value }))
            }, null, 40, Ya),
            e("div", Ka, [
              e("button", {
                type: "button",
                class: "kb-var-chip",
                onClick: T[4] || (T[4] = (j) => C("body"))
              }, "{{ .var }}"),
              A.value === "body" ? (a(), n("div", Ga, [
                (a(!0), n(W, null, D(I.value, (j) => (a(), n("button", {
                  key: `push-body-var-${j}`,
                  type: "button",
                  class: "kb-var-menu-item",
                  onClick: (H) => U("body", j)
                }, u(j), 9, Ja))), 128))
              ])) : v("", !0)
            ]),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ye({ "--pct": Math.min(100, l.bodyCount / l.bodyLimit * 100) + "%" })
            }, [...T[16] || (T[16] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          l.bodyError ? (a(), n("p", Xa, u(l.bodyError), 1)) : v("", !0)
        ]),
        e("div", Qa, [
          T[17] || (T[17] = e("label", { class: "kb-label" }, [
            te(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: l.message.image_url,
            "aria-invalid": !!l.imageUrlError,
            "aria-describedby": l.imageUrlError ? "image-url-error" : void 0,
            onInput: T[5] || (T[5] = (j) => L.$emit("update", { image_url: j.target.value || void 0 }))
          }, null, 40, Za),
          l.imageUrlError ? (a(), n("p", en, u(l.imageUrlError), 1)) : v("", !0)
        ]),
        e("div", tn, [
          T[18] || (T[18] = e("label", { class: "kb-label" }, [
            te(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: l.message.deep_link,
            "aria-invalid": !!l.deepLinkError,
            "aria-describedby": l.deepLinkError ? "deeplink-error" : void 0,
            onInput: T[6] || (T[6] = (j) => L.$emit("update", { deep_link: j.target.value || void 0 }))
          }, null, 40, an),
          l.deepLinkError ? (a(), n("p", nn, u(l.deepLinkError), 1)) : v("", !0)
        ]),
        e("div", sn, [
          T[19] || (T[19] = e("label", { class: "kb-label" }, [
            te(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", on, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((Q = l.message.location) == null ? void 0 : Q.lat) ?? "",
              onInput: T[7] || (T[7] = (j) => {
                const H = { ...l.message.location ?? {} }, Y = j.target.value;
                H.lat = Y === "" ? void 0 : Number(Y), L.$emit("update", { location: H });
              })
            }, null, 40, ln),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ee = l.message.location) == null ? void 0 : ee.lon) ?? "",
              onInput: T[8] || (T[8] = (j) => {
                const H = { ...l.message.location ?? {} }, Y = j.target.value;
                H.lon = Y === "" ? void 0 : Number(Y), L.$emit("update", { location: H });
              })
            }, null, 40, rn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((de = l.message.location) == null ? void 0 : de.name) ?? "",
            onInput: T[9] || (T[9] = (j) => {
              const H = { ...l.message.location ?? {} };
              H.name = j.target.value || void 0, L.$emit("update", { location: H });
            })
          }, null, 40, dn),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((M = l.message.location) == null ? void 0 : M.address) ?? "",
            onInput: T[10] || (T[10] = (j) => {
              const H = { ...l.message.location ?? {} };
              H.address = j.target.value || void 0, L.$emit("update", { location: H });
            })
          }, null, 40, un)
        ]),
        e("div", cn, [
          T[21] || (T[21] = e("label", { class: "kb-label" }, [
            te(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", pn, [
            (a(!0), n(W, null, D(c.message.actions ?? [], (j, H) => (a(), n("div", {
              key: j.id || H,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: j.label,
                onInput: (Y) => {
                  var G;
                  const E = [...c.message.actions ?? []], z = Number(H);
                  E[z] = {
                    ...E[z],
                    id: ((G = E[z]) == null ? void 0 : G.id) || `action_${z + 1}`,
                    label: Y.target.value
                  }, L.$emit("update", { actions: E });
                }
              }, null, 40, mn),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: j.url,
                onInput: (Y) => {
                  var G;
                  const E = [...c.message.actions ?? []], z = Number(H);
                  E[z] = {
                    ...E[z],
                    id: ((G = E[z]) == null ? void 0 : G.id) || `action_${z + 1}`,
                    url: Y.target.value || void 0
                  }, L.$emit("update", { actions: E });
                }
              }, null, 40, vn),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const Y = [...c.message.actions ?? []];
                  Y.splice(Number(H), 1), L.$emit("update", { actions: Y });
                }
              }, " Remove ", 8, bn)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (c.message.actions ?? []).length >= 3,
              onClick: T[11] || (T[11] = () => {
                const j = [...c.message.actions ?? []];
                j.push({
                  id: `action_${j.length + 1}`,
                  label: "",
                  url: ""
                }), L.$emit("update", { actions: j });
              })
            }, " Add action ", 8, hn),
            e("div", yn, [
              T[20] || (T[20] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (a(), n(W, null, D(["View order", "Track shipment", "Open app"], (j) => e("button", {
                key: j,
                type: "button",
                class: "kb-action-chip",
                disabled: (c.message.actions ?? []).length >= 3,
                onClick: () => {
                  const H = [...c.message.actions ?? []];
                  H.push({
                    id: `action_${Date.now()}`,
                    label: j,
                    url: ""
                  }), L.$emit("update", { actions: H });
                }
              }, u(j), 9, fn)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), kn = /* @__PURE__ */ Le(gn, [["__scopeId", "data-v-66dfb0a5"]]), _n = { class: "kb-section kb-section--inline-personalization" }, wn = { class: "kb-field" }, $n = { class: "kb-insert-row" }, xn = ["value"], Cn = { class: "kb-field" }, Sn = { class: "kb-insert-row" }, In = { class: "kb-field" }, An = { class: "kb-variable-list" }, Tn = /* @__PURE__ */ Ue({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(l, { emit: d }) {
    var M;
    const c = l, y = d, x = [
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
    ], A = k(
      () => (c.targets ?? []).includes("footer") ? I : x
    ), C = ie(
      (M = c.variableOptions) != null && M.length ? [...c.variableOptions] : [...A.value]
    ), U = ie(C.value[0] ?? A.value[0]), L = ie("");
    Pe(
      () => c.variableOptions,
      (j) => {
        j && j.length ? (C.value = [...j], C.value.includes(U.value) || (U.value = C.value[0])) : (C.value = [...A.value], C.value.includes(U.value) || (U.value = C.value[0]));
      }
    ), Pe(
      A,
      (j) => {
        var H;
        (H = c.variableOptions) != null && H.length || (C.value = [...j], C.value.includes(U.value) || (U.value = C.value[0]));
      }
    );
    const T = k(() => C.value), Q = k(() => {
      var H;
      return (H = c.targets) != null && H.length ? c.targets : ["title", "body"];
    });
    function ee(j) {
      y("insertVariable", { variable: U.value, field: j });
    }
    function de() {
      const j = L.value.trim();
      j && (C.value.includes(j) || (C.value = [...C.value, j]), U.value = j, L.value = "");
    }
    return (j, H) => (a(), n("section", _n, [
      H[9] || (H[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      H[10] || (H[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", wn, [
        H[5] || (H[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", $n, [
          We(e("select", {
            "onUpdate:modelValue": H[0] || (H[0] = (Y) => U.value = Y),
            class: "kb-select"
          }, [
            (a(!0), n(W, null, D(T.value, (Y) => (a(), n("option", {
              key: Y,
              value: Y
            }, u(Y), 9, xn))), 128))
          ], 512), [
            [ze, U.value]
          ]),
          Q.value.includes("title") ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: H[1] || (H[1] = (Y) => ee("title"))
          }, " Into title ")) : v("", !0),
          Q.value.includes("body") ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: H[2] || (H[2] = (Y) => ee("body"))
          }, " Into message ")) : v("", !0),
          Q.value.includes("footer") ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: H[3] || (H[3] = (Y) => ee("footer"))
          }, " Into footer ")) : v("", !0)
        ])
      ]),
      e("div", Cn, [
        H[6] || (H[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Sn, [
          We(e("input", {
            "onUpdate:modelValue": H[4] || (H[4] = (Y) => L.value = Y),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [ht, L.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: de
          }, " Add ")
        ])
      ]),
      e("div", In, [
        H[7] || (H[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        H[8] || (H[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", An, [
          (a(!0), n(W, null, D(T.value, (Y) => (a(), n("li", { key: Y }, [
            e("code", null, "{{ ." + u(Y) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), zt = /* @__PURE__ */ Le(Tn, [["__scopeId", "data-v-ab96d6bb"]]), Rn = { class: "kb-section kb-section--template-type" }, Un = { class: "kb-field" }, Bn = { class: "kb-radio-group" }, Ln = { class: "kb-radio" }, Pn = ["checked"], En = { class: "kb-radio" }, On = ["checked"], Nn = /* @__PURE__ */ Ue({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(l, { emit: d }) {
    const c = d;
    return (y, x) => (a(), n("section", Rn, [
      x[5] || (x[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      x[6] || (x[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Un, [
        e("div", Bn, [
          e("label", Ln, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: l.templateType === "transactional",
              onChange: x[0] || (x[0] = (I) => c("update", "transactional"))
            }, null, 40, Pn),
            x[2] || (x[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", En, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: l.templateType === "marketing",
              onChange: x[1] || (x[1] = (I) => c("update", "marketing"))
            }, null, 40, On),
            x[3] || (x[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        x[4] || (x[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Le(Nn, [["__scopeId", "data-v-ff2e1bd8"]]), Vn = { class: "kb-section" }, Mn = { class: "kb-section__head" }, Wn = { class: "kb-section__desc" }, Dn = { class: "kb-field" }, jn = { class: "kb-radio-group" }, Hn = { class: "kb-radio" }, Fn = ["checked"], qn = { class: "kb-radio" }, zn = ["checked"], Yn = {
  key: 0,
  class: "kb-field kb-row"
}, Kn = ["value"], Gn = ["value"], Jn = { class: "kb-field" }, Xn = ["value"], Qn = ["value"], Zn = { class: "kb-field" }, es = ["value"], ts = ["value"], as = { class: "kb-field" }, ns = { class: "kb-checkbox" }, ss = ["checked"], os = /* @__PURE__ */ Ue({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(l) {
    const d = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (c, y) => {
      var x;
      return a(), n("section", Vn, [
        e("div", Mn, [
          y[8] || (y[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          l.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: y[0] || (y[0] = (I) => c.$emit("reset"))
          }, " Reset section ")) : v("", !0)
        ]),
        e("p", Wn, u(l.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Dn, [
          y[11] || (y[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", jn, [
            e("label", Hn, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !l.delivery.scheduled_at,
                onChange: y[1] || (y[1] = (I) => c.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Fn),
              y[9] || (y[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", qn, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!l.delivery.scheduled_at,
                onChange: y[2] || (y[2] = (I) => c.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, zn),
              y[10] || (y[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        l.delivery.scheduled_at ? (a(), n("div", Yn, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (x = l.delivery.scheduled_at) == null ? void 0 : x.slice(0, 16),
            onInput: y[3] || (y[3] = (I) => c.$emit("update", { scheduled_at: I.target.value }))
          }, null, 40, Kn),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: l.delivery.timezone,
            onInput: y[4] || (y[4] = (I) => c.$emit("update", { timezone: I.target.value }))
          }, null, 40, Gn)
        ])) : v("", !0),
        l.showPushOptions ? (a(), n(W, { key: 1 }, [
          e("div", Jn, [
            y[12] || (y[12] = e("label", { class: "kb-label" }, [
              te(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: l.delivery.ttl,
              onChange: y[5] || (y[5] = (I) => c.$emit("update", { ttl: Number(I.target.value) }))
            }, [
              (a(!0), n(W, null, D(w(aa), (I) => (a(), n("option", {
                key: I,
                value: I
              }, u(d[I] ?? I + "s"), 9, Qn))), 128))
            ], 40, Xn)
          ]),
          e("div", Zn, [
            y[13] || (y[13] = e("label", { class: "kb-label" }, [
              te(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: l.delivery.priority,
              onChange: y[6] || (y[6] = (I) => c.$emit("update", { priority: I.target.value }))
            }, [
              (a(!0), n(W, null, D(w(Mt), (I) => (a(), n("option", {
                key: I,
                value: I
              }, u(I), 9, ts))), 128))
            ], 40, es)
          ]),
          e("div", as, [
            e("label", ns, [
              e("input", {
                type: "checkbox",
                checked: l.delivery.quiet_hours,
                onChange: y[7] || (y[7] = (I) => c.$emit("update", { quiet_hours: !l.delivery.quiet_hours }))
              }, null, 40, ss),
              y[14] || (y[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : v("", !0)
      ]);
    };
  }
}), ls = /* @__PURE__ */ Le(os, [["__scopeId", "data-v-5707a2a7"]]), is = { class: "kb-accordion" }, rs = { class: "kb-accordion__body" }, ds = { class: "kb-field" }, us = ["value"], cs = { class: "kb-field" }, ps = { class: "kb-checkbox" }, ms = ["checked"], vs = /* @__PURE__ */ Ue({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(l) {
    return (d, c) => (a(), n("details", is, [
      c[4] || (c[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", rs, [
        e("div", ds, [
          c[2] || (c[2] = e("label", { class: "kb-label" }, [
            te(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: l.delivery.collapse_key,
            onInput: c[0] || (c[0] = (y) => d.$emit("update", { collapse_key: y.target.value || void 0 }))
          }, null, 40, us)
        ]),
        e("div", cs, [
          e("label", ps, [
            e("input", {
              type: "checkbox",
              checked: l.delivery.silent_push,
              onChange: c[1] || (c[1] = (y) => d.$emit("update", { silent_push: !l.delivery.silent_push }))
            }, null, 40, ms),
            c[3] || (c[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), bs = /* @__PURE__ */ Le(vs, [["__scopeId", "data-v-699e4501"]]);
function Ge(l, d) {
  return !l || typeof l != "string" ? l : l.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (c, y) => {
    const I = String(y).trim().replace(/^\./, "");
    return I in d ? String(d[I]) : c;
  });
}
const Qe = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], hs = { class: "kb-preview" }, ys = { class: "kb-preview__toggle" }, fs = { class: "kb-preview__mode" }, gs = { class: "kb-preview__quality" }, ks = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, _s = ["src"], ws = { class: "kb-android-body-row" }, $s = { class: "kb-android-body-content" }, xs = {
  key: 0,
  class: "kb-android-title"
}, Cs = {
  key: 1,
  class: "kb-android-text"
}, Ss = {
  key: 2,
  class: "kb-android-location-line"
}, Is = {
  key: 0,
  class: "kb-android-thumb"
}, As = ["src"], Ts = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Rs = ["src"], Us = {
  key: 0,
  class: "kb-preview-map__caption"
}, Bs = {
  key: 2,
  class: "kb-android-actions"
}, Ls = {
  key: 3,
  class: "kb-preview-warning"
}, Ps = { class: "kb-ios-banner" }, Es = { class: "kb-ios-content" }, Os = {
  key: 0,
  class: "kb-ios-title"
}, Ns = {
  key: 1,
  class: "kb-ios-text"
}, Vs = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, Ms = ["src"], Ws = {
  key: 0,
  class: "kb-preview-map__caption"
}, Ds = {
  key: 4,
  class: "kb-ios-actions"
}, js = {
  key: 5,
  class: "kb-preview-warning"
}, Hs = {
  key: 0,
  class: "kb-ios-thumb"
}, Fs = ["src"], qs = { class: "kb-web-toast" }, zs = { class: "kb-web-body" }, Ys = {
  key: 0,
  class: "kb-web-title"
}, Ks = {
  key: 1,
  class: "kb-web-text"
}, Gs = {
  key: 3,
  class: "kb-web-image"
}, Js = ["src"], Xs = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Qs = ["src"], Zs = {
  key: 0,
  class: "kb-preview-map__caption"
}, eo = {
  key: 0,
  class: "kb-web-actions"
}, to = {
  key: 1,
  class: "kb-preview-warning"
}, ao = /* @__PURE__ */ Ue({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(l) {
    const d = l, c = ie("shade"), y = ie("banner"), x = ie("toast"), I = k(() => c.value === "expanded"), A = k(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? I.value : void 0
      })
    ), C = k(() => {
      const X = A.value;
      return d.previewProfile ? {
        ...X,
        title: Ge((X == null ? void 0 : X.title) ?? "", d.previewProfile.data),
        body: Ge((X == null ? void 0 : X.body) ?? "", d.previewProfile.data)
      } : X;
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
    function L(X, h) {
      const _ = (X ?? "").trim();
      return _ ? _.length <= h ? _ : `${_.slice(0, Math.max(0, h - 1)).trimEnd()}…` : "";
    }
    const T = k(() => d.selectedPlatform === "android" ? c.value : d.selectedPlatform === "ios" ? y.value : x.value), Q = k(() => (U[d.selectedPlatform] ?? U.web)[T.value] ?? { title: 60, body: 160 }), ee = k(
      () => {
        var X;
        return L((X = C.value) == null ? void 0 : X.title, Q.value.title);
      }
    ), de = k(
      () => {
        var X;
        return L((X = C.value) == null ? void 0 : X.body, Q.value.body);
      }
    ), M = { android: 3, ios: 4, web: 2 }, j = k(
      () => {
        var X;
        return Array.isArray((X = C.value) == null ? void 0 : X.actions) ? C.value.actions : [];
      }
    ), H = k(
      () => j.value.slice(0, M[d.selectedPlatform] ?? 2)
    ), Y = k(
      () => Math.max(0, j.value.length - H.value.length)
    ), E = k(() => {
      var X;
      return (((X = d.message) == null ? void 0 : X.deep_link) ?? "").trim();
    }), z = k(() => E.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(E.value) : !1), G = k(() => E.value ? E.value.length <= 40 ? E.value : `${E.value.slice(0, 37)}…` : ""), ce = k(() => {
      var h, _, O;
      const X = [];
      return (h = d.delivery) != null && h.priority && X.push(`Priority: ${d.delivery.priority}`), typeof ((_ = d.delivery) == null ? void 0 : _.ttl) == "number" && X.push(`TTL: ${d.delivery.ttl}s`), (O = d.delivery) != null && O.silent_push && X.push("Silent push"), X;
    }), be = k(() => {
      var oe;
      const X = (oe = C.value) == null ? void 0 : oe.location;
      if (!X || X.lat == null && X.lon == null) return null;
      const h = Number(X.lat) || 0, _ = Number(X.lon) || 0, O = 8e-3, ue = [_ - O, h - O, _ + O, h + O].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(ue)}&layer=mapnik&marker=${h},${_}`;
    }), ge = k(() => {
      var h;
      const X = (h = C.value) == null ? void 0 : h.location;
      return X && (X.lat != null || X.lon != null || X.name || X.address);
    });
    return (X, h) => {
      var _, O, ue, oe, R, ve, ke, Ae, Ce, _e, Be, Se, $e, Ie, B, f;
      return a(), n("div", hs, [
        e("div", ys, [
          e("label", fs, [
            h[6] || (h[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            l.selectedPlatform === "android" ? We((a(), n("select", {
              key: 0,
              "onUpdate:modelValue": h[0] || (h[0] = (g) => c.value = g),
              class: "kb-preview__mode-select"
            }, [...h[3] || (h[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [ze, c.value]
            ]) : l.selectedPlatform === "ios" ? We((a(), n("select", {
              key: 1,
              "onUpdate:modelValue": h[1] || (h[1] = (g) => y.value = g),
              class: "kb-preview__mode-select"
            }, [...h[4] || (h[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [ze, y.value]
            ]) : We((a(), n("select", {
              key: 2,
              "onUpdate:modelValue": h[2] || (h[2] = (g) => x.value = g),
              class: "kb-preview__mode-select"
            }, [...h[5] || (h[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [ze, x.value]
            ])
          ]),
          e("div", gs, [
            (a(!0), n(W, null, D(ce.value, (g) => (a(), n("span", {
              key: g,
              class: "kb-preview__badge"
            }, u(g), 1))), 128))
          ])
        ]),
        l.selectedPlatform === "android" ? (a(), n("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: me(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${c.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          h[9] || (h[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: me(["kb-android-notification", { "kb-android-notification--expanded": I.value }])
          }, [
            h[8] || (h[8] = et('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: me(["kb-android-body", { "kb-android-body--expanded": I.value }])
            }, [
              I.value && C.value.imageUrl ? (a(), n("div", ks, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, _s)
              ])) : v("", !0),
              e("div", ws, [
                e("div", $s, [
                  ee.value ? (a(), n("div", xs, u(ee.value), 1)) : v("", !0),
                  de.value ? (a(), n("div", Cs, u(de.value), 1)) : v("", !0),
                  ge.value && !I.value && ((_ = C.value.location) != null && _.name || (O = C.value.location) != null && O.address) ? (a(), n("div", Ss, [
                    h[7] || (h[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    te(" " + u(((ue = C.value.location) == null ? void 0 : ue.name) || ((oe = C.value.location) == null ? void 0 : oe.address)), 1)
                  ])) : v("", !0),
                  E.value ? (a(), n("div", {
                    key: 3,
                    class: me(["kb-preview-link", { "kb-preview-link--invalid": !z.value }])
                  }, u(z.value ? G.value : "Invalid deep link format"), 3)) : v("", !0)
                ]),
                !I.value && C.value.imageUrl ? (a(), n("div", Is, [
                  e("img", {
                    src: C.value.imageUrl,
                    alt: ""
                  }, null, 8, As)
                ])) : v("", !0)
              ]),
              ge.value && be.value && I.value ? (a(), n("div", Ts, [
                e("iframe", {
                  src: be.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Rs),
                (R = C.value.location) != null && R.name || (ve = C.value.location) != null && ve.address ? (a(), n("div", Us, u(((ke = C.value.location) == null ? void 0 : ke.name) || ((Ae = C.value.location) == null ? void 0 : Ae.address)), 1)) : v("", !0)
              ])) : v("", !0),
              H.value.length ? (a(), n("div", Bs, [
                (a(!0), n(W, null, D(H.value, (g) => (a(), n("button", {
                  key: g.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, u(g.label || "Action"), 1))), 128))
              ])) : v("", !0),
              Y.value > 0 ? (a(), n("p", Ls, " Showing " + u(H.value.length) + " of " + u(j.value.length) + " actions on " + u(l.selectedPlatform) + ". ", 1)) : v("", !0)
            ], 2)
          ], 2)
        ], 2)) : l.selectedPlatform === "ios" ? (a(), n("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: me(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${y.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          h[12] || (h[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", Ps, [
            h[11] || (h[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Es, [
              h[10] || (h[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              ee.value ? (a(), n("div", Os, u(ee.value), 1)) : v("", !0),
              de.value ? (a(), n("div", Ns, u(de.value), 1)) : v("", !0),
              E.value ? (a(), n("div", {
                key: 2,
                class: me(["kb-preview-link", { "kb-preview-link--invalid": !z.value }])
              }, u(z.value ? G.value : "Invalid deep link format"), 3)) : v("", !0),
              ge.value && be.value ? (a(), n("div", Vs, [
                e("iframe", {
                  src: be.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Ms),
                (Ce = C.value.location) != null && Ce.name || (_e = C.value.location) != null && _e.address ? (a(), n("div", Ws, u(((Be = C.value.location) == null ? void 0 : Be.name) || ((Se = C.value.location) == null ? void 0 : Se.address)), 1)) : v("", !0)
              ])) : v("", !0),
              H.value.length ? (a(), n("div", Ds, [
                (a(!0), n(W, null, D(H.value, (g) => (a(), n("button", {
                  key: g.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, u(g.label || "Action"), 1))), 128))
              ])) : v("", !0),
              Y.value > 0 ? (a(), n("p", js, " Showing " + u(H.value.length) + " of " + u(j.value.length) + " actions on " + u(l.selectedPlatform) + ". ", 1)) : v("", !0)
            ]),
            C.value.imageUrl ? (a(), n("div", Hs, [
              e("img", {
                src: C.value.imageUrl,
                alt: ""
              }, null, 8, Fs)
            ])) : v("", !0)
          ])
        ], 2)) : (a(), n("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: me(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${x.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          h[14] || (h[14] = et('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", qs, [
            h[13] || (h[13] = et('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", zs, [
              ee.value ? (a(), n("div", Ys, u(ee.value), 1)) : v("", !0),
              de.value ? (a(), n("div", Ks, u(de.value), 1)) : v("", !0),
              E.value ? (a(), n("div", {
                key: 2,
                class: me(["kb-preview-link", { "kb-preview-link--invalid": !z.value }])
              }, u(z.value ? G.value : "Invalid deep link format"), 3)) : v("", !0),
              C.value.imageUrl ? (a(), n("div", Gs, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, Js)
              ])) : v("", !0),
              ge.value && be.value ? (a(), n("div", Xs, [
                e("iframe", {
                  src: be.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Qs),
                ($e = C.value.location) != null && $e.name || (Ie = C.value.location) != null && Ie.address ? (a(), n("div", Zs, u(((B = C.value.location) == null ? void 0 : B.name) || ((f = C.value.location) == null ? void 0 : f.address)), 1)) : v("", !0)
              ])) : v("", !0)
            ]),
            H.value.length ? (a(), n("div", eo, [
              (a(!0), n(W, null, D(H.value, (g, J) => (a(), n("button", {
                key: g.id || J,
                type: "button",
                class: me(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(J) > 0 }])
              }, u(g.label || "Action"), 3))), 128))
            ])) : v("", !0),
            Y.value > 0 ? (a(), n("p", to, " Showing " + u(H.value.length) + " of " + u(j.value.length) + " actions on " + u(l.selectedPlatform) + ". ", 1)) : v("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), no = /* @__PURE__ */ Le(ao, [["__scopeId", "data-v-4fc616d9"]]), so = { class: "kb-version-dialog" }, oo = {
  key: 0,
  class: "kb-version-empty"
}, lo = {
  key: 1,
  class: "kb-version-list"
}, io = { class: "kb-version-item-label" }, ro = ["onClick"], uo = { class: "kb-version-actions" }, co = /* @__PURE__ */ Ue({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(l, { emit: d }) {
    const c = d;
    function y(x) {
      try {
        return new Date(x).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return x;
      }
    }
    return (x, I) => l.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: I[1] || (I[1] = Zt((A) => c("close"), ["escape"]))
    }, [
      e("div", so, [
        I[2] || (I[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        I[3] || (I[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        l.versions.length === 0 ? (a(), n("div", oo, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", lo, [
          (a(!0), n(W, null, D(l.versions, (A) => (a(), n("li", {
            key: A.id,
            class: "kb-version-item"
          }, [
            e("span", io, u(A.label || y(A.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                c("restore", A.snapshot), c("close");
              }
            }, " Restore ", 8, ro)
          ]))), 128))
        ])),
        e("div", uo, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: I[0] || (I[0] = (A) => c("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : v("", !0);
  }
}), Yt = /* @__PURE__ */ Le(co, [["__scopeId", "data-v-ce35a513"]]), At = [
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
], Tt = [
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
}, fo = {
  key: 0,
  class: "kb-hint-card"
}, go = { class: "kb-push-form-head" }, ko = { class: "kb-push-form-head-top" }, _o = { class: "kb-push-health-pill" }, wo = { class: "kb-push-form-head-row" }, $o = ["value"], xo = { class: "kb-push-health" }, Co = { class: "kb-push-health-row" }, So = { class: "kb-push-health-value" }, Io = { class: "kb-push-health-bar" }, Ao = {
  key: 1,
  class: "kb-push-form"
}, To = { class: "kb-push-canvas" }, Ro = {
  key: 0,
  class: "kb-push-test-banner"
}, Uo = { class: "kb-push-preview-chrome" }, Bo = { class: "kb-push-preview-controls" }, Lo = { class: "kb-push-preview-as" }, Po = ["value"], Eo = { class: "kb-preview-status" }, Oo = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, No = ["aria-selected", "aria-controls", "onClick"], Vo = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Mo = { class: "kb-push-actions" }, Wo = {
  key: 0,
  class: "kb-actions-note"
}, Do = { key: 0 }, jo = { class: "kb-push-actions-right" }, Ho = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Fo = { class: "kb-confirm-dialog" }, qo = { class: "kb-confirm-actions" }, zo = /* @__PURE__ */ Ue({
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
  setup(l, { emit: d }) {
    const c = l, y = d, x = ie("android"), I = ie(""), A = ie(!1), C = ie(null), U = ie(!1), L = k(
      () => M.value.workflow_status ?? "draft"
    ), T = k(() => {
      const s = I.value;
      return s ? Qe.find((o) => o.id === s) ?? null : null;
    });
    function Q(s) {
      const o = M.value, b = s.campaign.message ? { ...o.message, ...s.campaign.message } : o.message, m = s.campaign.delivery ? { ...o.delivery, ...s.campaign.delivery } : o.delivery;
      E({
        ...s.campaign,
        message: b,
        delivery: m
      }), C.value = null, A.value = !1;
    }
    function ee(s) {
      const o = s.target.value;
      if (!o) return;
      const b = At.find((m) => m.id === o);
      b && (j.value ? (C.value = b, A.value = !0) : Q(b), s.target.value = "");
    }
    function de(s) {
      M.value = s, U.value = !1;
    }
    const {
      campaign: M,
      dirty: j,
      customValidatorErrors: H,
      getValidationWithWarnings: Y,
      update: E,
      updateMessage: z,
      updateDelivery: G,
      undo: ce,
      redo: be,
      canUndo: ge,
      canRedo: X,
      resetMessage: h,
      resetDelivery: _,
      getPreview: O,
      characterLimits: ue,
      hooks: oe
    } = rt({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (s) => {
          var m, N, S, P;
          const o = [];
          (m = s.name) != null && m.trim() || o.push("Template name is required"), (S = (N = s.message) == null ? void 0 : N.body) != null && S.trim() || o.push("Message body is required");
          const b = (P = c.hooks) != null && P.customValidators ? await c.hooks.customValidators(s) : [];
          return [...o, ...b];
        }
      },
      onDirty: () => y("change", M.value)
    }), { lastSavedAt: R } = dt(M, { channel: "push" });
    function ve(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? be() : ce());
    }
    nt(() => {
      window.addEventListener("keydown", ve);
    }), st(() => {
      window.removeEventListener("keydown", ve);
    }), Pe(M, (s) => y("update:modelValue", s), { deep: !0 });
    const ke = ie(), Ae = ie(!0), Ce = ie(!0);
    async function _e() {
      if (oe.estimateReach)
        try {
          ke.value = await oe.estimateReach(M.value.audience);
        } catch {
          ke.value = void 0;
        }
      oe.canSend && (Ae.value = await Promise.resolve(oe.canSend())), oe.canSchedule && (Ce.value = await Promise.resolve(oe.canSchedule()));
    }
    _e(), Pe(() => M.value.audience, _e, { deep: !0 });
    const Be = k(() => (H.value, Y(ke.value))), Se = k(() => Be.value.blockingErrors), $e = k(() => Be.value.warnings), Ie = k(() => Be.value.valid), B = k(() => {
      var m, N, S;
      const s = M.value.message, o = [
        !!((m = M.value.name) != null && m.trim()),
        !!((N = s.title) != null && N.trim()),
        !!((S = s.body) != null && S.trim()),
        !!(s.template_type ?? M.value.template_type),
        Array.isArray(s.actions) ? s.actions.length > 0 : !1
      ], b = o.filter(Boolean).length;
      return Math.round(b / o.length * 100);
    }), f = k(() => B.value >= 90 ? "Production ready" : B.value >= 70 ? "Strong draft" : B.value >= 40 ? "In progress" : "Needs setup"), g = k(() => {
      const s = M.value.message;
      return !!((s.title ?? "").toString().trim() || (s.body ?? "").toString().trim() || Array.isArray(s.actions) && s.actions.length);
    }), J = k(
      () => ue[x.value].title
    ), ne = k(() => ue[x.value].body), Te = k(() => M.value.message.title.length), Oe = k(() => M.value.message.body.length), Ye = k(() => {
      if (Te.value > J.value)
        return `Title exceeds ${J.value} characters for ${x.value}.`;
    }), Ve = k(() => {
      const s = Se.value.find(
        (o) => o.message === "Message body is required"
      );
      if (s) return s.message;
      if (Oe.value > ne.value)
        return `Body exceeds ${ne} characters for ${x.value}.`;
    }), De = k(
      () => M.value.template_type ?? "transactional"
    );
    function je(s) {
      E({ template_type: s });
    }
    function He(s) {
      E({
        name: s,
        tracking: { ...M.value.tracking ?? {}, campaign_name: s }
      });
    }
    function Me(s) {
      const o = ` {{ .${s.variable} }}`, b = M.value.message.variables ?? [], m = Array.from(/* @__PURE__ */ new Set([...b, s.variable]));
      s.field === "title" ? z({
        title: M.value.message.title + o,
        variables: m
      }) : z({
        body: M.value.message.body + o,
        variables: m
      });
    }
    function se() {
      Ie.value && y("save", M.value);
    }
    return (s, o) => {
      var b;
      return a(), n("div", mo, [
        e("div", vo, [
          Ee(ut, {
            "campaign-name": w(M).name,
            status: w(M).status,
            dirty: w(j),
            "last-saved-at": w(R),
            "can-undo": w(ge),
            "can-redo": w(X),
            "workflow-status": L.value,
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": He,
            "onUpdate:workflowStatus": o[0] || (o[0] = (m) => w(E)({ workflow_status: m })),
            onUndo: w(ce),
            onRedo: w(be)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          Se.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: ye({
              background: w(xe).dangerBg,
              border: `1px solid ${w(xe).dangerBorder}`,
              borderRadius: `${w(Je).input}px`,
              padding: `${w(he)[12]}px ${w(he)[16]}px`,
              marginBottom: `${w(he)[16]}px`
            })
          }, [
            e("ul", {
              style: ye({ margin: 0, paddingLeft: "1.25rem", color: w(xe).danger })
            }, [
              (a(!0), n(W, null, D(Se.value, (m) => (a(), n("li", {
                key: m.message
              }, u(m.message), 1))), 128))
            ], 4)
          ], 4)) : v("", !0)
        ]),
        e("div", bo, [
          e("aside", ho, [
            l.disabledSections.includes("message") ? v("", !0) : (a(), n("div", yo, [
              !w(M).message.title && !w(M).message.body ? (a(), n("div", fo, " Add a title and message below to get started. ")) : v("", !0),
              e("div", go, [
                e("div", ko, [
                  o[12] || (o[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", _o, u(f.value), 1)
                ]),
                e("div", wo, [
                  Ee(_t, {
                    "template-type": De.value,
                    onUpdate: je
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: ee
                  }, [
                    o[13] || (o[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(W, null, D(w(At), (m) => (a(), n("option", {
                      key: m.id,
                      value: m.id
                    }, u(m.label), 9, $o))), 128))
                  ], 32)
                ]),
                e("div", xo, [
                  e("div", Co, [
                    o[14] || (o[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", So, u(B.value) + "%", 1)
                  ]),
                  e("div", Io, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: ye({ width: `${B.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ee(kn, {
                message: w(M).message,
                "title-count": Te.value,
                "body-count": Oe.value,
                "title-limit": J.value,
                "body-limit": ne.value,
                "selected-platform": x.value,
                "show-reset": !0,
                "title-error": Ye.value,
                "body-error": Ve.value,
                onUpdate: w(z),
                onReset: o[1] || (o[1] = (m) => w(h)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Ee(zt, {
                message: w(M).message,
                "variable-options": l.variableOptions,
                onUpdate: w(z),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !l.designOnly && !l.disabledSections.includes("delivery") ? (a(), n("div", Ao, [
              o[15] || (o[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Ee(ls, {
                delivery: w(M).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: w(G),
                onReset: o[2] || (o[2] = (m) => w(_)())
              }, null, 8, ["delivery", "onUpdate"]),
              Ee(bs, {
                delivery: w(M).delivery,
                onUpdate: w(G)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : v("", !0)
          ]),
          e("main", To, [
            !l.designOnly && w(M).audience.test_mode ? (a(), n("div", Ro, [...o[16] || (o[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              te(" Test mode — only your test segment will receive this. ", -1)
            ])])) : v("", !0),
            e("div", Uo, [
              e("div", Bo, [
                e("label", Lo, [
                  o[18] || (o[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  We(e("select", {
                    "onUpdate:modelValue": o[3] || (o[3] = (m) => I.value = m),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[17] || (o[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(W, null, D(w(Qe), (m) => (a(), n("option", {
                      key: m.id,
                      value: m.id
                    }, u(m.label), 9, Po))), 128))
                  ], 512), [
                    [ze, I.value]
                  ])
                ]),
                e("div", Eo, [
                  o[19] || (o[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(x.value), 1)
                ])
              ]),
              e("div", Oo, [
                (a(), n(W, null, D(["android", "ios", "web"], (m) => e("button", {
                  key: m,
                  type: "button",
                  class: me(["kb-push-device-btn", { "kb-push-device-btn--active": x.value === m }]),
                  role: "tab",
                  "aria-selected": x.value === m,
                  "aria-controls": `kb-preview-panel-${m}`,
                  onClick: (N) => x.value = m
                }, u(m.toUpperCase()), 11, No)), 64))
              ]),
              e("div", {
                class: me(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !g.value }])
              }, [
                !w(M).message.title && !w(M).message.body ? (a(), n("div", Vo, [...o[20] || (o[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), ea(no, {
                  key: 1,
                  "get-preview": w(O),
                  "selected-platform": x.value,
                  "preview-profile": T.value,
                  message: w(M).message,
                  delivery: w(M).delivery,
                  "onUpdate:selectedPlatform": o[4] || (o[4] = (m) => x.value = m)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Mo, [
          $e.value.length > 0 ? (a(), n("div", Wo, [
            o[21] || (o[21] = e("strong", null, "Warning:", -1)),
            te(" " + u((b = $e.value[0]) == null ? void 0 : b.message) + " ", 1),
            $e.value.length > 1 ? (a(), n("span", Do, " (+" + u($e.value.length - 1) + " more) ", 1)) : v("", !0)
          ])) : v("", !0),
          e("div", jo, [
            !l.designOnly && l.showHistory ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[5] || (o[5] = (m) => U.value = !0)
            }, " Version history ")) : v("", !0),
            !l.designOnly && l.showSaveVersion ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[6] || (o[6] = (m) => y("save-version", JSON.parse(JSON.stringify(w(M)))))
            }, " Save as version ")) : v("", !0),
            l.showDuplicate ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[7] || (o[7] = (m) => y("duplicate", JSON.parse(JSON.stringify(w(M)))))
            }, " Duplicate ")) : v("", !0),
            l.showSave ? (a(), n("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: se
            }, " Save ")) : v("", !0),
            l.showClose ? (a(), n("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: o[8] || (o[8] = (m) => y("edit"))
            }, " Close ")) : v("", !0)
          ])
        ]),
        A.value ? (a(), n("div", Ho, [
          e("div", Fo, [
            o[22] || (o[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[23] || (o[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", qo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: o[9] || (o[9] = (m) => {
                  A.value = !1, C.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: o[10] || (o[10] = (m) => C.value && Q(C.value))
              }, " Replace ")
            ])
          ])
        ])) : v("", !0),
        Ee(Yt, {
          open: U.value,
          versions: l.versions,
          onClose: o[11] || (o[11] = (m) => U.value = !1),
          onRestore: de
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Kt = /* @__PURE__ */ Le(zo, [["__scopeId", "data-v-18771e1a"]]), Yo = { class: "kb-section" }, Ko = { class: "kb-section__head" }, Go = { class: "kb-summary-bar" }, Jo = { class: "kb-pill kb-pill--category" }, Xo = { class: "kb-pill kb-pill--format" }, Qo = { class: "kb-pill kb-pill--status" }, Zo = { class: "kb-field" }, el = ["value"], tl = ["value", "disabled"], al = { class: "kb-field" }, nl = { class: "kb-label" }, sl = { class: "kb-helper" }, ol = ["value"], ll = ["value", "disabled"], il = { class: "kb-field" }, rl = ["value"], dl = { class: "kb-field kb-field--inline kb-field--language-limits" }, ul = { class: "kb-field-half" }, cl = ["value"], pl = { class: "kb-field" }, ml = ["value"], vl = {
  key: 0,
  class: "kb-field"
}, bl = { class: "kb-label" }, hl = { class: "kb-input-with-var" }, yl = ["value"], fl = { class: "kb-var-picker-wrap" }, gl = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, kl = ["onClick"], _l = {
  key: 1,
  class: "kb-field"
}, wl = ["value"], $l = {
  key: 2,
  class: "kb-field"
}, xl = ["value"], Cl = {
  key: 3,
  class: "kb-field"
}, Sl = ["value"], Il = {
  key: 4,
  class: "kb-field"
}, Al = ["value"], Tl = {
  key: 5,
  class: "kb-field"
}, Rl = ["value"], Ul = ["value"], Bl = {
  key: 6,
  class: "kb-field"
}, Ll = { class: "kb-wa-buttons" }, Pl = ["value", "onInput"], El = ["value", "onInput"], Ol = ["value", "onInput"], Nl = ["value", "onInput"], Vl = ["onClick"], Ml = ["disabled"], Wl = {
  key: 7,
  class: "kb-field"
}, Dl = { class: "kb-wa-buttons" }, jl = ["value", "onInput"], Hl = ["value", "onInput"], Fl = ["onClick"], ql = {
  key: 8,
  class: "kb-field"
}, zl = ["value"], Yl = ["value"], Kl = { class: "kb-field" }, Gl = { class: "kb-label" }, Jl = { class: "kb-input-with-var" }, Xl = ["value"], Ql = { class: "kb-var-picker-wrap" }, Zl = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, ei = ["onClick"], ti = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, ai = { class: "kb-wa-fields-list" }, ni = { class: "kb-wa-field-name" }, si = { class: "kb-wa-field-status" }, oi = { class: "kb-field" }, li = { class: "kb-input-with-var" }, ii = ["value"], ri = { class: "kb-var-picker-wrap" }, di = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, ui = ["onClick"], ci = {
  key: 10,
  class: "kb-field"
}, pi = { class: "kb-wa-buttons" }, mi = { class: "kb-input-with-var kb-input-with-var--btn" }, vi = ["value", "onInput"], bi = { class: "kb-var-picker-wrap" }, hi = ["onClick"], yi = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, fi = ["onClick"], gi = ["value", "onChange"], ki = ["value", "onInput"], _i = ["value", "onInput"], wi = {
  key: 2,
  class: "kb-opt-out-note"
}, $i = ["onClick"], xi = ["disabled"], pt = 60, mt = 1024, vt = 60, bt = 10, Ut = 10, Ci = /* @__PURE__ */ Ue({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(l, { emit: d }) {
    const c = l, y = d, x = [
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
    ], I = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], A = k(() => c.message), C = k(() => A.value.template_type ?? "text"), U = k(() => A.value.header_type ?? "none"), L = k(() => String(A.value.header ?? "")), T = k(() => String(A.value.body ?? "")), Q = k(() => String(A.value.footer ?? "")), ee = k(() => A.value.buttons ?? []), de = k(() => A.value.products ?? []), M = k(() => A.value.cards ?? []), j = k(() => {
      const B = x.find((f) => f.value === C.value);
      return (B == null ? void 0 : B.hint) ?? "Choose the approved WhatsApp template format.";
    }), H = k(() => {
      const B = String(A.value.template_category ?? "").trim();
      return B ? B.charAt(0).toUpperCase() + B.slice(1) : "Uncategorized";
    }), Y = k(() => {
      const B = x.find((f) => f.value === C.value);
      return (B == null ? void 0 : B.label) ?? "Text";
    }), E = k(() => A.value.template_name ? T.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), z = k(() => new Set((c.disabledCategories ?? []).map((B) => String(B).trim()))), G = k(() => new Set((c.disabledFormats ?? []).map((B) => String(B).trim())));
    function ce(B) {
      if (!B || typeof B != "string") return [];
      const f = /\{\{\s*([^}]+?)\s*\}\}/g, g = /* @__PURE__ */ new Set();
      let J;
      for (; (J = f.exec(B)) !== null; ) g.add(J[1].trim());
      return Array.from(g);
    }
    const be = k(() => {
      const B = c.message.header ?? "", f = c.message.body ?? c.message.body ?? "", g = new Set(c.message.variables ?? []), J = [...ce(B), ...ce(f)];
      return Array.from(new Set(J)).map((Te) => ({ name: Te, configured: g.has(Te) }));
    }), ge = [
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
    ], X = k(() => {
      const B = (c.message.variables ?? []).filter(Boolean);
      return B.length ? Array.from(new Set(B)) : ge;
    }), h = ie(null);
    function _(B) {
      y("update", B);
    }
    function O(B) {
      h.value = h.value === B ? null : B;
    }
    function ue(B, f) {
      var Te;
      const g = ` {{ .${f} }}`, J = (c.message.variables ?? []).filter(Boolean), ne = Array.from(/* @__PURE__ */ new Set([...J, f]));
      if (B === "header")
        _({ header: `${L.value || ""}${g}`, variables: ne });
      else if (B === "body")
        _({ body: `${T.value || ""}${g}`, variables: ne });
      else if (B === "footer")
        _({ footer: `${Q.value || ""}${g}`, variables: ne });
      else if (B.startsWith("btn-label:")) {
        const Oe = Number(B.split(":")[1]);
        Number.isFinite(Oe) && ve(Oe, { label: `${String(((Te = ee.value[Oe]) == null ? void 0 : Te.label) ?? "")}${g}` }), _({ variables: ne });
      }
      h.value = null;
    }
    function oe(B) {
      const f = {
        template_category: B || void 0
      };
      B === "authentication" && C.value !== "auth" && (f.template_type = "auth"), _(f);
    }
    function R(B) {
      const f = { template_type: B };
      B === "auth" && (f.template_category = "authentication"), B === "image" || B === "video" || B === "document" ? f.header_type = B : (U.value === "image" || U.value === "video" || U.value === "document") && (f.header_type = "none"), _(f);
    }
    function ve(B, f) {
      var J;
      const g = [...ee.value];
      g[B] = {
        ...g[B],
        id: ((J = g[B]) == null ? void 0 : J.id) || `btn_${B + 1}`,
        ...f
      }, _({ buttons: g });
    }
    function ke(B) {
      const f = [...ee.value];
      f.splice(B, 1), _({ buttons: f });
    }
    function Ae() {
      const B = [...ee.value];
      B.push({ id: `btn_${B.length + 1}`, label: "", type: "quick_reply" }), _({ buttons: B });
    }
    function Ce(B, f) {
      var J;
      const g = [...de.value];
      g[B] = {
        ...g[B],
        id: ((J = g[B]) == null ? void 0 : J.id) || `prod_${B + 1}`,
        ...f
      }, _({ products: g });
    }
    function _e(B) {
      const f = [...de.value];
      f.splice(B, 1), _({ products: f });
    }
    function Be() {
      const B = [...de.value];
      B.push({ id: `prod_${B.length + 1}`, productId: "" }), _({ products: B });
    }
    function Se(B, f) {
      var J;
      const g = [...M.value];
      g[B] = {
        ...g[B],
        id: ((J = g[B]) == null ? void 0 : J.id) || `card_${B + 1}`,
        ...f
      }, _({ cards: g });
    }
    function $e(B) {
      const f = [...M.value];
      f.splice(B, 1), _({ cards: f });
    }
    function Ie() {
      const B = [...M.value];
      B.push({
        id: `card_${B.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), _({ cards: B });
    }
    return (B, f) => (a(), n("section", Yo, [
      e("div", Ko, [
        f[19] || (f[19] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        l.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: f[0] || (f[0] = (g) => B.$emit("reset"))
        }, " Reset section ")) : v("", !0)
      ]),
      f[45] || (f[45] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Go, [
        e("span", Jo, u(H.value), 1),
        e("span", Xo, u(Y.value), 1),
        e("span", Qo, u(E.value), 1)
      ]),
      e("div", Zo, [
        f[21] || (f[21] = e("label", { class: "kb-label" }, [
          te(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: A.value.template_category ?? "",
          onChange: f[1] || (f[1] = (g) => oe(g.target.value))
        }, [
          f[20] || (f[20] = e("option", { value: "" }, "Select category", -1)),
          (a(), n(W, null, D(I, (g) => e("option", {
            key: g.value,
            value: g.value,
            disabled: z.value.has(g.value)
          }, u(g.label) + u(z.value.has(g.value) ? " (Disabled)" : ""), 9, tl)), 64))
        ], 40, el)
      ]),
      e("div", al, [
        e("label", nl, [
          f[22] || (f[22] = te(" Functional format ", -1)),
          e("span", sl, u(j.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: C.value,
          onChange: f[2] || (f[2] = (g) => R(g.target.value))
        }, [
          (a(), n(W, null, D(x, (g) => e("option", {
            key: g.value,
            value: g.value,
            disabled: G.value.has(g.value)
          }, u(g.label) + u(G.value.has(g.value) ? " (Disabled)" : ""), 9, ll)), 64))
        ], 40, ol)
      ]),
      e("div", il, [
        f[23] || (f[23] = e("label", { class: "kb-label" }, [
          te(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: A.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, rl)
      ]),
      e("div", dl, [
        e("div", ul, [
          f[24] || (f[24] = e("label", { class: "kb-label" }, [
            te(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: A.value.template_language ?? "",
            onInput: f[3] || (f[3] = (g) => _({
              template_language: g.target.value || void 0
            }))
          }, null, 40, cl)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            f[25] || (f[25] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + u(pt) + " chars"),
              e("li", null, "Body: " + u(mt) + " chars"),
              e("li", null, "Footer: " + u(vt) + " chars"),
              e("li", null, "Buttons: up to " + u(bt))
            ])
          ])
        ])
      ]),
      e("div", pl, [
        f[27] || (f[27] = e("label", { class: "kb-label" }, [
          te(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: U.value,
          onChange: f[4] || (f[4] = (g) => _({ header_type: g.target.value }))
        }, [...f[26] || (f[26] = [
          et('<option value="none" data-v-446fe315>No header</option><option value="text" data-v-446fe315>Text header</option><option value="image" data-v-446fe315>Image header</option><option value="video" data-v-446fe315>Video header</option><option value="document" data-v-446fe315>Document header</option>', 5)
        ])], 40, ml)
      ]),
      U.value === "text" ? (a(), n("div", vl, [
        e("label", bl, [
          f[28] || (f[28] = te(" Header text ", -1)),
          e("span", {
            class: me(["kb-counter", { "kb-counter--warn": L.value.length > pt }])
          }, u(L.value.length) + "/" + u(pt), 3)
        ]),
        e("div", hl, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: L.value,
            onInput: f[5] || (f[5] = (g) => _({
              header: g.target.value || void 0
            }))
          }, null, 40, yl),
          e("div", fl, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: f[6] || (f[6] = (g) => O("header"))
            }, "{{ .var }}"),
            h.value === "header" ? (a(), n("div", gl, [
              (a(!0), n(W, null, D(X.value, (g) => (a(), n("button", {
                key: `wa-header-var-${g}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (J) => ue("header", g)
              }, u(g), 9, kl))), 128))
            ])) : v("", !0)
          ])
        ])
      ])) : v("", !0),
      ["image", "video", "document"].includes(U.value) || ["image", "video", "document"].includes(C.value) ? (a(), n("div", _l, [
        f[29] || (f[29] = e("label", { class: "kb-label" }, [
          te(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: A.value.media_url ?? "",
          onInput: f[7] || (f[7] = (g) => _({
            media_url: g.target.value || void 0
          }))
        }, null, 40, wl)
      ])) : v("", !0),
      U.value === "document" || C.value === "document" ? (a(), n("div", $l, [
        f[30] || (f[30] = e("label", { class: "kb-label" }, [
          te(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: A.value.document_filename ?? "",
          onInput: f[8] || (f[8] = (g) => _({
            document_filename: g.target.value || void 0
          }))
        }, null, 40, xl)
      ])) : v("", !0),
      ["image", "video", "document"].includes(U.value) || ["image", "video", "document"].includes(C.value) ? (a(), n("div", Cl, [
        f[31] || (f[31] = e("label", { class: "kb-label" }, [
          te(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: A.value.media_caption ?? "",
          onInput: f[9] || (f[9] = (g) => _({
            media_caption: g.target.value || void 0
          }))
        }, null, 40, Sl)
      ])) : v("", !0),
      C.value === "lto" ? (a(), n("div", Il, [
        f[32] || (f[32] = e("label", { class: "kb-label" }, [
          te(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: A.value.lto_expiry ?? "",
          onInput: f[10] || (f[10] = (g) => _({
            lto_expiry: g.target.value || void 0
          }))
        }, null, 40, Al)
      ])) : v("", !0),
      C.value === "flow" ? (a(), n("div", Tl, [
        f[33] || (f[33] = e("label", { class: "kb-label" }, [
          te(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: A.value.flow_id ?? "",
          onInput: f[11] || (f[11] = (g) => _({
            flow_id: g.target.value || void 0
          }))
        }, null, 40, Rl),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: A.value.flow_cta_label ?? "",
          onInput: f[12] || (f[12] = (g) => _({
            flow_cta_label: g.target.value || void 0
          }))
        }, null, 40, Ul)
      ])) : v("", !0),
      C.value === "carousel" ? (a(), n("div", Bl, [
        e("label", { class: "kb-label" }, [
          f[34] || (f[34] = te(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + u(Ut) + " cards.")
        ]),
        e("div", Ll, [
          (a(!0), n(W, null, D(M.value, (g, J) => (a(), n("div", {
            key: g.id || J,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: g.title ?? "",
              onInput: (ne) => Se(Number(J), { title: ne.target.value })
            }, null, 40, Pl),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: g.media_url ?? "",
              onInput: (ne) => Se(Number(J), { media_url: ne.target.value })
            }, null, 40, El),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: g.button_label ?? "",
              onInput: (ne) => Se(Number(J), { button_label: ne.target.value })
            }, null, 40, Ol),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: g.button_url ?? "",
              onInput: (ne) => Se(Number(J), { button_url: ne.target.value })
            }, null, 40, Nl),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => $e(Number(J))
            }, "Remove", 8, Vl)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: M.value.length >= Ut,
            onClick: Ie
          }, " Add card ", 8, Ml)
        ])
      ])) : v("", !0),
      ["mpm", "catalog"].includes(C.value) ? (a(), n("div", Wl, [
        f[35] || (f[35] = e("label", { class: "kb-label" }, [
          te(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", Dl, [
          (a(!0), n(W, null, D(de.value, (g, J) => (a(), n("div", {
            key: g.id || J,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: g.productId,
              onInput: (ne) => Ce(Number(J), { productId: ne.target.value })
            }, null, 40, jl),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: g.sectionTitle,
              onInput: (ne) => Ce(Number(J), { sectionTitle: ne.target.value || void 0 })
            }, null, 40, Hl),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => _e(Number(J))
            }, " Remove ", 8, Fl)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: Be
          }, " Add product ")
        ])
      ])) : v("", !0),
      C.value === "auth" ? (a(), n("div", ql, [
        f[37] || (f[37] = e("label", { class: "kb-label" }, [
          te(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: A.value.auth_type ?? "otp",
          onChange: f[13] || (f[13] = (g) => _({
            auth_type: g.target.value
          }))
        }, [...f[36] || (f[36] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, zl),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: A.value.auth_label ?? "",
          onInput: f[14] || (f[14] = (g) => _({
            auth_label: g.target.value || void 0
          }))
        }, null, 40, Yl)
      ])) : v("", !0),
      e("div", Kl, [
        e("label", Gl, [
          f[38] || (f[38] = te(" Body ", -1)),
          f[39] || (f[39] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: me(["kb-counter", { "kb-counter--warn": T.value.length > mt }])
          }, u(T.value.length) + "/" + u(mt), 3)
        ]),
        e("div", Jl, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
            value: T.value,
            onInput: f[15] || (f[15] = (g) => _({
              body: g.target.value || void 0
            }))
          }, null, 40, Xl),
          e("div", Ql, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: f[16] || (f[16] = (g) => O("body"))
            }, "{{ .var }}"),
            h.value === "body" ? (a(), n("div", Zl, [
              (a(!0), n(W, null, D(X.value, (g) => (a(), n("button", {
                key: `wa-body-var-${g}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (J) => ue("body", g)
              }, u(g), 9, ei))), 128))
            ])) : v("", !0)
          ])
        ])
      ]),
      be.value.length > 0 ? (a(), n("div", ti, [
        f[40] || (f[40] = e("label", { class: "kb-label" }, "Template fields", -1)),
        f[41] || (f[41] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", ai, [
          (a(!0), n(W, null, D(be.value, (g) => (a(), n("li", {
            key: g.name,
            class: me(["kb-wa-field-item", { "kb-wa-field-item--ok": g.configured }])
          }, [
            e("span", ni, u(g.name), 1),
            e("span", si, u(g.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : v("", !0),
      e("div", oi, [
        f[42] || (f[42] = e("label", { class: "kb-label" }, [
          te(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("div", li, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: Q.value,
            onInput: f[17] || (f[17] = (g) => _({
              footer: g.target.value || void 0
            }))
          }, null, 40, ii),
          e("div", ri, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: f[18] || (f[18] = (g) => O("footer"))
            }, "{{ .var }}"),
            h.value === "footer" ? (a(), n("div", di, [
              (a(!0), n(W, null, D(X.value, (g) => (a(), n("button", {
                key: `wa-footer-var-${g}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (J) => ue("footer", g)
              }, u(g), 9, ui))), 128))
            ])) : v("", !0)
          ])
        ]),
        e("div", {
          class: me(["kb-counter kb-counter--inline", { "kb-counter--warn": Q.value.length > vt }])
        }, u(Q.value.length) + "/" + u(vt), 3)
      ]),
      T.value.trim().length > 0 ? (a(), n("div", ci, [
        e("label", { class: "kb-label" }, [
          f[43] || (f[43] = te(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + u(bt) + " buttons. ")
        ]),
        e("div", pi, [
          (a(!0), n(W, null, D(ee.value, (g, J) => (a(), n("div", {
            key: g.id || J,
            class: "kb-wa-button-row"
          }, [
            e("div", mi, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: g.label,
                onInput: (ne) => ve(Number(J), { label: ne.target.value })
              }, null, 40, vi),
              e("div", bi, [
                e("button", {
                  type: "button",
                  class: "kb-btn-insert",
                  onClick: (ne) => O(`btn-label:${J}`)
                }, "{{ .var }}", 8, hi),
                h.value === `btn-label:${J}` ? (a(), n("div", yi, [
                  (a(!0), n(W, null, D(X.value, (ne) => (a(), n("button", {
                    key: `wa-btn-label-var-${J}-${ne}`,
                    type: "button",
                    class: "kb-var-menu-item",
                    onClick: (Te) => ue(`btn-label:${J}`, ne)
                  }, u(ne), 9, fi))), 128))
                ])) : v("", !0)
              ])
            ]),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: g.type ?? "quick_reply",
              onChange: (ne) => ve(Number(J), { type: ne.target.value })
            }, [...f[44] || (f[44] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, gi),
            g.type === "url" ? (a(), n("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: g.url,
              onInput: (ne) => ve(Number(J), { url: ne.target.value || void 0 })
            }, null, 40, ki)) : g.type === "call" ? (a(), n("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: g.phone,
              onInput: (ne) => ve(Number(J), { phone: ne.target.value || void 0 })
            }, null, 40, _i)) : g.type === "opt_out" ? (a(), n("span", wi, " Sends a built-in opt-out action. ")) : v("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => ke(Number(J))
            }, " Remove ", 8, $i)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: ee.value.length >= bt,
            onClick: Ae
          }, " Add button ", 8, xi)
        ])
      ])) : v("", !0)
    ]));
  }
}), Si = /* @__PURE__ */ Le(Ci, [["__scopeId", "data-v-446fe315"]]), Ii = { class: "wa-preview-root" }, Ai = { class: "wa-device" }, Ti = { class: "wa-screen" }, Ri = { class: "wa-header" }, Ui = { class: "wa-titleblock" }, Bi = { class: "wa-title-row" }, Li = { class: "wa-title" }, Pi = { class: "wa-subtitle" }, Ei = {
  key: 0,
  class: "wa-flow-shell"
}, Oi = { class: "wa-flow-header" }, Ni = { class: "wa-flow-title" }, Vi = { class: "wa-flow-content" }, Mi = { class: "wa-flow-eyebrow" }, Wi = {
  key: 0,
  class: "wa-flow-products"
}, Di = { class: "wa-flow-footer" }, ji = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, Hi = { class: "wa-managed" }, Fi = {
  key: 1,
  class: "wa-thread"
}, qi = { class: "wa-secure-banner" }, zi = { class: "wa-msg wa-msg--in" }, Yi = { class: "wa-template-card" }, Ki = {
  key: 0,
  class: "wa-card-media"
}, Gi = ["src"], Ji = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, Xi = ["src"], Qi = { class: "wa-card-media-doc-icon" }, Zi = ["title"], er = {
  key: 3,
  class: "wa-card-media-fallback"
}, tr = { class: "wa-card-media-tag" }, ar = { class: "wa-card-media-sub" }, nr = {
  key: 1,
  class: "wa-card-header-text"
}, sr = ["innerHTML"], or = {
  key: 2,
  class: "wa-link-preview"
}, lr = { class: "wa-link-preview-head" }, ir = { class: "wa-link-preview-text" }, rr = ["href"], dr = {
  key: 3,
  class: "wa-inline-note"
}, ur = {
  key: 4,
  class: "wa-inline-note"
}, cr = {
  key: 5,
  class: "wa-inline-note"
}, pr = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, mr = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, vr = {
  key: 8,
  class: "wa-product-list"
}, br = { class: "wa-product-name" }, hr = { class: "wa-product-price" }, yr = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, fr = {
  key: 10,
  class: "wa-template-actions"
}, gr = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, kr = { class: "wa-order-card" }, _r = { class: "wa-order-card-top" }, wr = ["src"], $r = { type: "button" }, xr = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Cr = { class: "wa-document-card" }, Sr = { class: "wa-document-file" }, Ir = { class: "wa-document-icon" }, Ar = ["title"], Tr = { class: "wa-document-caption" }, Rr = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Ur = { class: "wa-voice-card" }, Br = { class: "wa-voice-top" }, Lr = { class: "wa-voice-profile" }, Pr = ["src"], Er = { class: "wa-voice-duration" }, Or = { class: "wa-voice-transcript" }, Nr = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, Vr = { class: "wa-contact-card" }, Mr = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, Wr = { class: "wa-location-card" }, Dr = { class: "wa-location-content" }, jr = { type: "button" }, Hr = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Fr = { class: "wa-carousel-track" }, qr = { type: "button" }, zr = { class: "wa-msg wa-msg--out" }, Yr = { class: "wa-bubble wa-bubble--out" }, Kr = { class: "wa-bubble-author" }, Gr = {
  key: 0,
  class: "wa-reaction"
}, Jr = { class: "wa-msg wa-msg--in" }, Xr = { class: "wa-bubble wa-bubble--in" }, Qr = /* @__PURE__ */ Ue({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(l) {
    const d = l;
    function c(h) {
      return String(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const y = k(() => {
      var O;
      const h = ((O = d.template) == null ? void 0 : O.body) ?? "";
      return c(h).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), x = k(() => d.template.templateName || "Ecoshop"), I = k(() => "Business Account"), A = k(() => d.template.format === "flow" || !!d.template.flow), C = k(() => {
      var h;
      return (h = d.template.buttons) == null ? void 0 : h[0];
    }), U = k(() => {
      var h, _;
      return ((h = C.value) == null ? void 0 : h.text) || ((_ = d.template.flow) == null ? void 0 : _.ctaLabel) || "";
    }), L = k(() => d.template.buttons ?? []), T = k(() => {
      var h;
      return (((h = d.template.multiProduct) == null ? void 0 : h.length) ?? 0) > 0;
    }), Q = k(() => (d.template.format || "text").toUpperCase()), ee = k(() => {
      const h = d.template.header;
      return !h || h.type === "text" ? "" : h.type === "image" ? h.url || "Image" : h.type === "video" ? h.url || "Video" : h.filename || h.url || "Document";
    }), de = k(() => {
      const h = d.template.header;
      if (!(!h || h.type !== "image" || !h.url))
        return { backgroundImage: `url(${h.url})` };
    });
    function M(h) {
      if (!h) return "";
      try {
        const _ = h.split("?")[0].split("#")[0], O = _.substring(_.lastIndexOf("/") + 1);
        return decodeURIComponent(O || "");
      } catch {
        return "";
      }
    }
    const j = k(() => {
      const h = d.template.header;
      return !h || h.type !== "document" ? "" : h.filename || M(h.url) || "document.pdf";
    }), H = k(() => {
      const h = (d.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (h == null ? void 0 : h[0]) || "";
    });
    function Y(h) {
      try {
        return new URL(h).hostname;
      } catch {
        return "example.com";
      }
    }
    const E = k(() => {
      const h = d.template.linkPreview;
      return !h && !H.value ? null : {
        title: (h == null ? void 0 : h.title) || "Link preview",
        description: (h == null ? void 0 : h.description) || "Preview from your WhatsApp template link.",
        domain: (h == null ? void 0 : h.domain) || (H.value ? Y(H.value) : "example.com"),
        url: (h == null ? void 0 : h.url) || H.value || "#",
        thumbnail: (h == null ? void 0 : h.thumbnail) || ""
      };
    }), z = k(() => {
      var O, ue, oe;
      const _ = (oe = (((O = d.template.documentCard) == null ? void 0 : O.filename) || ((ue = d.template.header) == null ? void 0 : ue.filename) || "").split(".").pop()) == null ? void 0 : oe.trim().toUpperCase();
      return _ ? _.slice(0, 4) : "DOC";
    });
    function G(h, _) {
      return h === "phone_number" ? "wa-btn-icon--phone" : h === "url" ? "wa-btn-icon--external" : h === "copy_code" ? "wa-btn-icon--code" : h === "opt_out" || (_ || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (_ || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ce = k(() => {
      var h;
      return d.template.location || d.template.locationRequest ? "wa-side-icon--info" : ((h = d.template.header) == null ? void 0 : h.type) === "video" || d.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), be = k(() => {
      var _, O, ue;
      const h = d.template;
      return h.format === "flow" ? "Thanks, we received your preferences." : (_ = h.auth) != null && _.code ? "Use the verification code and let us know if it works." : (O = h.coupon) != null && O.code ? `Your coupon ${h.coupon.code} is active now.` : h.limitedOffer ? `Great choice. This offer is valid until ${h.limitedOffer}.` : (ue = d.template.multiProduct) != null && ue.length ? `Here are ${d.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), ge = k(() => {
      var _, O;
      const h = d.template;
      return h.location ? h.location.name || h.location.address || `${h.location.lat}, ${h.location.lng}` : (_ = h.auth) != null && _.code ? `Verification code: ${h.auth.code}` : (O = h.flow) != null && O.id ? `Flow ID: ${h.flow.id}` : h.templateLanguage ? `Template language: ${h.templateLanguage}` : `Category: ${h.templateCategory || "utility"} • Format: ${h.format || "text"}`;
    }), X = k(() => {
      var O, ue;
      const h = d.template;
      if ((O = h.multiProduct) != null && O.length) return h.multiProduct.slice(0, 5).map((oe) => oe.name || "Product");
      if ((ue = h.buttons) != null && ue.length) return h.buttons.slice(0, 5).map((oe) => oe.text || "Option");
      const _ = (h.body || "").split(/\n|\.|,/).map((oe) => oe.trim()).filter(Boolean).slice(0, 5);
      return _.length ? _ : ["Option A", "Option B", "Option C"];
    });
    return (h, _) => {
      var O, ue, oe, R, ve, ke, Ae, Ce, _e, Be, Se, $e, Ie, B;
      return a(), n("div", Ii, [
        e("div", Ai, [
          e("div", Ti, [
            _[30] || (_[30] = et('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Ri, [
              _[7] || (_[7] = e("span", { class: "wa-back" }, "←", -1)),
              _[8] || (_[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Ui, [
                e("div", Bi, [
                  e("span", Li, u(x.value), 1),
                  _[6] || (_[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Pi, u(I.value), 1)
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
            A.value ? (a(), n("div", Ei, [
              _[14] || (_[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Oi, [
                _[10] || (_[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Ni, u(x.value), 1),
                _[11] || (_[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Vi, [
                e("p", Mi, u(l.template.body || "Please choose an option below."), 1),
                (a(!0), n(W, null, D(X.value, (f, g) => (a(), n("div", {
                  key: `flow-opt-${g}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, u(f), 1),
                  e("span", {
                    class: me(["wa-radio", { "wa-radio--on": g === 0 }])
                  }, null, 2)
                ]))), 128)),
                (O = l.template.multiProduct) != null && O.length ? (a(), n("div", Wi, [
                  (a(!0), n(W, null, D(l.template.multiProduct.slice(0, 3), (f, g) => (a(), n("div", {
                    key: g,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, u(f.name || "Product"), 1),
                      e("p", null, u(f.price || "Price on request"), 1)
                    ]),
                    _[12] || (_[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : v("", !0)
              ]),
              e("div", Di, [
                U.value ? (a(), n("button", ji, u(U.value), 1)) : v("", !0),
                e("p", Hi, [
                  _[13] || (_[13] = te("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: _[0] || (_[0] = at(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), n("div", Fi, [
              _[29] || (_[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", qi, [
                _[15] || (_[15] = e("span", null, "●", -1)),
                _[16] || (_[16] = te(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: _[1] || (_[1] = at(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", zi, [
                e("div", Yi, [
                  l.template.header && l.template.header.type !== "text" ? (a(), n("div", Ki, [
                    l.template.header.type === "image" && l.template.header.url ? (a(), n("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: l.template.header.url,
                      alt: "Header media"
                    }, null, 8, Gi)) : l.template.header.type === "video" && l.template.header.url ? (a(), n("div", Ji, [
                      e("video", {
                        src: l.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, Xi),
                      _[17] || (_[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : l.template.header.type === "document" ? (a(), n("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: _[2] || (_[2] = at(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", Qi, u(z.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: j.value
                      }, u(j.value), 9, Zi)
                    ])) : (a(), n("div", er, [
                      e("div", tr, u(Q.value) + " TEMPLATE", 1),
                      e("div", ar, u(ee.value), 1),
                      de.value ? (a(), n("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: ye(de.value)
                      }, null, 4)) : v("", !0)
                    ]))
                  ])) : (ue = l.template.header) != null && ue.text ? (a(), n("div", nr, u(l.template.header.text), 1)) : v("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: y.value
                  }, null, 8, sr),
                  E.value ? (a(), n("div", or, [
                    e("div", lr, [
                      E.value.thumbnail ? (a(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: ye({ backgroundImage: `url(${E.value.thumbnail})` })
                      }, null, 4)) : v("", !0),
                      e("div", ir, [
                        e("strong", null, u(E.value.title), 1),
                        e("p", null, u(E.value.description), 1),
                        e("span", null, u(E.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: E.value.url,
                      onClick: _[3] || (_[3] = at(() => {
                      }, ["prevent"]))
                    }, u(E.value.url), 9, rr)
                  ])) : v("", !0),
                  l.template.location ? (a(), n("div", dr, " 📍 " + u(l.template.location.name || l.template.location.address || `${l.template.location.lat}, ${l.template.location.lng}`), 1)) : v("", !0),
                  (oe = l.template.coupon) != null && oe.code ? (a(), n("div", ur, [
                    _[18] || (_[18] = te(" Coupon: ", -1)),
                    e("strong", null, u(l.template.coupon.code), 1)
                  ])) : v("", !0),
                  (R = l.template.auth) != null && R.code ? (a(), n("div", cr, [
                    _[19] || (_[19] = te(" Verification code: ", -1)),
                    e("strong", null, u(l.template.auth.code), 1)
                  ])) : v("", !0),
                  l.template.limitedOffer ? (a(), n("div", pr, " Expires: " + u(l.template.limitedOffer), 1)) : v("", !0),
                  l.template.footer ? (a(), n("div", mr, u(l.template.footer), 1)) : v("", !0),
                  T.value ? (a(), n("div", vr, [
                    (a(!0), n(W, null, D((ve = l.template.multiProduct) == null ? void 0 : ve.slice(0, 4), (f, g) => (a(), n("div", {
                      key: `prod-${g}`,
                      class: "wa-product-row"
                    }, [
                      e("span", br, u(f.name || `Item ${g + 1}`), 1),
                      e("span", hr, u(f.price || "-"), 1)
                    ]))), 128))
                  ])) : v("", !0),
                  U.value ? (a(), n("button", yr, [
                    C.value ? (a(), n("span", {
                      key: 0,
                      class: me(["wa-btn-icon", G(C.value.type, C.value.value || C.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : v("", !0),
                    te(" " + u(U.value), 1)
                  ])) : v("", !0),
                  L.value.length > 1 ? (a(), n("div", fr, [
                    (a(!0), n(W, null, D(L.value.slice(1, 4), (f, g) => (a(), n("button", {
                      key: `action-${g}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: me(["wa-btn-icon", G(f.type, f.value || f.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      te(" " + u(f.text), 1)
                    ]))), 128))
                  ])) : v("", !0),
                  _[20] || (_[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: me(["wa-side-icon", ce.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              l.template.orderCard ? (a(), n("div", gr, [
                e("div", kr, [
                  e("div", _r, [
                    l.template.orderCard.image ? (a(), n("img", {
                      key: 0,
                      src: l.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, wr)) : v("", !0),
                    e("div", null, [
                      e("strong", null, u(l.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, u(l.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", $r, u(l.template.orderCard.buttonLabel || "View"), 1),
                  _[21] || (_[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : v("", !0),
              l.template.documentCard || ((ke = l.template.header) == null ? void 0 : ke.type) === "document" ? (a(), n("div", xr, [
                e("div", Cr, [
                  e("div", Sr, [
                    e("span", Ir, u(z.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((Ae = l.template.documentCard) == null ? void 0 : Ae.filename) || ((Ce = l.template.header) == null ? void 0 : Ce.filename) || "document.pdf"
                      }, u(((_e = l.template.documentCard) == null ? void 0 : _e.filename) || ((Be = l.template.header) == null ? void 0 : Be.filename) || "document.pdf"), 9, Ar),
                      e("p", null, u(((Se = l.template.documentCard) == null ? void 0 : Se.size) || "243 KB • html"), 1)
                    ]),
                    _[22] || (_[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Tr, u((($e = l.template.documentCard) == null ? void 0 : $e.caption) || l.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : v("", !0),
              l.template.voiceNote ? (a(), n("div", Rr, [
                e("div", Ur, [
                  e("div", Br, [
                    _[24] || (_[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    _[25] || (_[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Lr, [
                      l.template.voiceNote.profileImage ? (a(), n("img", {
                        key: 0,
                        src: l.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Pr)) : v("", !0),
                      _[23] || (_[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Er, u(l.template.voiceNote.duration || "0:10"), 1),
                  e("p", Or, u(l.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : v("", !0),
              l.template.contactCard ? (a(), n("div", Nr, [
                e("div", Vr, [
                  e("strong", null, u(l.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, u(l.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, u(l.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, u(l.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, u(l.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : v("", !0),
              l.template.location && l.template.locationRequest ? (a(), n("div", Mr, [
                e("div", Wr, [
                  _[26] || (_[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Dr, [
                    e("strong", null, u(l.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: _[4] || (_[4] = at(() => {
                      }, ["prevent"]))
                    }, u(l.template.location.address || `${l.template.location.lat}, ${l.template.location.lng}`), 1)
                  ]),
                  e("button", jr, u(l.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : v("", !0),
              (Ie = l.template.carouselCards) != null && Ie.length ? (a(), n("div", Hr, [
                e("div", Fr, [
                  (a(!0), n(W, null, D(l.template.carouselCards.slice(0, 4), (f, g) => (a(), n("article", {
                    key: `c-${g}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: ye(f.image ? { backgroundImage: `url(${f.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, u(f.title || `Card ${g + 1}`), 1),
                    e("p", null, u(f.description || "Card description"), 1),
                    e("button", qr, u(f.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : v("", !0),
              e("div", zr, [
                e("div", Yr, [
                  e("span", Kr, u(x.value), 1),
                  e("p", null, u(be.value), 1),
                  _[27] || (_[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  l.template.reactionEmoji ? (a(), n("span", Gr, u(l.template.reactionEmoji), 1)) : v("", !0)
                ])
              ]),
              e("div", Jr, [
                e("div", Xr, [
                  e("p", null, u(ge.value), 1),
                  (B = l.template.flow) != null && B.id ? (a(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: _[5] || (_[5] = at(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + u(l.template.flow.id), 1)) : v("", !0),
                  _[28] || (_[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            _[31] || (_[31] = et('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Zr = /* @__PURE__ */ Le(Qr, [["__scopeId", "data-v-244c945a"]]), ed = { class: "keos-whatsapp-builder" }, td = { class: "kb-builder-top" }, ad = { class: "kb-wa-layout" }, nd = { class: "kb-wa-sidebar" }, sd = {
  key: 0,
  class: "kb-wa-form"
}, od = { class: "kb-wa-form-head" }, ld = { class: "kb-wa-form-head-top" }, id = { class: "kb-wa-health-pill" }, rd = { class: "kb-wa-form-head-row" }, dd = ["value"], ud = { class: "kb-wa-health" }, cd = { class: "kb-wa-health-row" }, pd = { class: "kb-wa-health-value" }, md = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, vd = { class: "kb-wa-canvas" }, bd = {
  key: 0,
  class: "kb-wa-test-banner"
}, hd = { class: "kb-wa-preview-chrome" }, yd = { class: "kb-push-preview-controls" }, fd = { class: "kb-push-preview-as" }, gd = ["value"], kd = { class: "kb-preview-status" }, _d = { class: "kb-wa-actions" }, wd = {
  key: 0,
  class: "kb-actions-note"
}, $d = { key: 0 }, xd = { class: "kb-wa-actions-right" }, Cd = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Sd = { class: "kb-confirm-dialog" }, Id = { class: "kb-confirm-actions" }, Bt = 60, Lt = 1024, Pt = 60, Et = 10, Ot = 10, Ad = /* @__PURE__ */ Ue({
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
  setup(l, { emit: d }) {
    const c = /* @__PURE__ */ new Set(["image", "video", "document"]), y = /* @__PURE__ */ new Set([
      "elementName",
      "languageCode",
      "category",
      "templateType",
      "content",
      "metaTemplate",
      "metaWhatsApp"
    ]);
    function x(s) {
      return s == null ? !1 : typeof s == "string" ? s.trim().length > 0 : Array.isArray(s) ? s.length > 0 : typeof s == "object" ? Object.keys(s).length > 0 : !0;
    }
    function I(s) {
      const o = {
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
        Object.entries(o).filter(([b, m]) => y.has(b) ? !0 : x(m))
      );
    }
    function A(s) {
      const o = { ...s }, b = String(o.template_type ?? "text").trim().toLowerCase(), m = String(o.header_type ?? "none").trim().toLowerCase();
      c.has(b) || c.has(m) || (o.media_url = void 0, o.media_caption = void 0, o.document_filename = void 0, o.document_size = void 0), b !== "carousel" && (o.cards = void 0), b !== "catalog" && b !== "mpm" && (o.products = void 0), b !== "flow" && (o.flow_id = void 0, o.flow_cta_label = void 0), b !== "lto" && (o.lto_expiry = void 0), b !== "auth" && (o.auth_type = void 0, o.auth_label = void 0, o.auth_code = void 0, o.otp_code = void 0), b !== "document" && m !== "document" && (o.document_filename = void 0, o.document_size = void 0), b !== "location" && (o.location = void 0);
      const S = Array.isArray(o.buttons) ? o.buttons : [];
      return o.buttons = S, o;
    }
    function C(s) {
      var Re, p, i, t, F;
      const o = [], b = s.message, m = (b.template_category ?? "").toString().trim(), N = (b.template_type ?? "text").toString(), S = (b.header_type ?? "none").toString(), P = (b.header ?? "").toString(), q = (b.body ?? "").toString(), le = (b.footer ?? "").toString(), Z = Array.isArray(b.buttons) ? b.buttons : [], pe = Array.isArray(b.cards) ? b.cards : [];
      return (Re = s.name) != null && Re.trim() || o.push("Template name is required"), (p = b.template_name) != null && p.trim() || o.push("WhatsApp template name is required"), m || o.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), q.trim() || o.push("Body is required"), S === "text" && P.length > Bt && o.push(`Header text cannot exceed ${Bt} characters`), q.length > Lt && o.push(`Body cannot exceed ${Lt} characters`), le.length > Pt && o.push(`Footer cannot exceed ${Pt} characters`), Z.length > Et && o.push(`Buttons cannot exceed ${Et}`), (N === "image" || N === "video" || N === "document" || S === "image" || S === "video" || S === "document") && !b.media_url && o.push("Media URL is required for rich media templates"), m === "authentication" && N !== "auth" && o.push("Authentication category must use Authentication format"), N === "auth" && !((i = b.auth_label) != null && i.trim()) && !q.includes("{{") && o.push("Authentication templates should include a code label or placeholder variable"), N === "lto" && !b.lto_expiry && o.push("Limited-time offer requires an expiry"), (N === "mpm" || N === "catalog") && !((t = b.products) != null && t.length) && o.push("Catalog and multi-product templates require at least one product"), N === "flow" && !((F = b.flow_id) != null && F.trim()) && o.push("WhatsApp Flow format requires a flow ID"), N === "carousel" && (pe.length ? pe.length > Ot && o.push(`Carousel supports up to ${Ot} cards`) : o.push("Carousel format requires at least one card")), o;
    }
    function U(s, o, b) {
      const m = s.message, N = String(m.template_category ?? "").trim(), S = String(m.template_type ?? "text").trim(), P = [];
      return N && o.includes(N) && P.push(`WhatsApp category "${N}" is disabled in this builder configuration`), S && b.includes(S) && P.push(`WhatsApp format "${S}" is disabled in this builder configuration`), P;
    }
    const L = l;
    function T(s) {
      if (!s) return {};
      const o = s.metaTemplate ?? s.metaWhatsApp, b = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((p) => (p == null ? void 0 : p.type) === "BODY") : void 0, m = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((p) => (p == null ? void 0 : p.type) === "FOOTER") : void 0, N = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((p) => (p == null ? void 0 : p.type) === "HEADER") : void 0, S = String(s.content ?? "").trim(), P = String(s.elementName ?? "").trim(), q = String(s.languageCode ?? "").trim(), le = String(s.category ?? "").trim().toLowerCase(), Z = String(s.templateType ?? "").trim().toLowerCase(), pe = String(s.footer ?? "").trim(), Re = String(s.header ?? "").trim();
      return {
        ...s,
        ...P && !s.template_name ? { template_name: P } : {},
        ...q && !s.template_language ? { template_language: q } : {},
        ...le && !s.template_category ? { template_category: le } : {},
        ...Z && !s.template_type ? { template_type: Z } : {},
        ...S && !s.body ? { body: S } : {},
        ...pe && !s.footer ? { footer: pe } : {},
        ...Re && !s.header ? { header: Re } : {},
        ...!s.body && (b != null && b.text) ? { body: String(b.text) } : {},
        ...!s.footer && (m != null && m.text) ? { footer: String(m.text) } : {},
        ...!s.header && (N != null && N.text) ? { header: String(N.text) } : {}
      };
    }
    function Q(s) {
      if (!s) return s;
      const o = T(s.message);
      return { ...s, message: o };
    }
    const ee = d;
    function de(s) {
      var b;
      const o = xt(s, {
        exampleData: (b = ne.value) == null ? void 0 : b.data
      });
      return {
        ...s,
        message: I(o.payload)
      };
    }
    const {
      campaign: M,
      dirty: j,
      customValidatorErrors: H,
      getValidationWithWarnings: Y,
      update: E,
      updateMessage: z,
      undo: G,
      redo: ce,
      canUndo: be,
      canRedo: ge,
      resetMessage: X,
      hooks: h
    } = rt({
      initial: Q(L.modelValue),
      hooks: {
        ...L.hooks,
        customValidators: async (s) => {
          var m;
          const o = [
            ...C(s),
            ...U(
              s,
              L.disabledTemplateCategories,
              L.disabledTemplateFormats
            )
          ], b = (m = L.hooks) != null && m.customValidators ? await L.hooks.customValidators(s) : [];
          return [...o, ...b];
        }
      },
      onDirty: () => ee("change", de(M.value))
    }), { lastSavedAt: _ } = dt(M, { channel: "whatsapp" });
    function O(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? ce() : G());
    }
    nt(() => {
      window.addEventListener("keydown", O);
    }), st(() => {
      window.removeEventListener("keydown", O);
    }), Pe(M, (s) => ee("update:modelValue", de(s)), {
      deep: !0
    });
    const ue = ie(), oe = ie(!0);
    async function R() {
      if (h.estimateReach)
        try {
          ue.value = await h.estimateReach(M.value.audience);
        } catch {
          ue.value = void 0;
        }
      h.canSend && (oe.value = await Promise.resolve(h.canSend()));
    }
    R(), Pe(() => M.value.audience, R, { deep: !0 });
    const ve = k(() => (H.value, Y(ue.value))), ke = k(() => ve.value.blockingErrors), Ae = k(() => ve.value.warnings), Ce = k(() => ve.value.valid), _e = k(() => {
      var m, N, S;
      const s = M.value.message, o = [
        !!((m = s.template_name) != null && m.trim()),
        !!((N = s.template_category) != null && N.trim()),
        !!(s.body ?? "").toString().trim(),
        !!((S = s.template_language) != null && S.trim()),
        Array.isArray(s.buttons) ? s.buttons.length > 0 : !1
      ], b = o.filter(Boolean).length;
      return Math.round(b / o.length * 100);
    }), Be = k(() => _e.value >= 90 ? "Production ready" : _e.value >= 70 ? "Strong draft" : _e.value >= 40 ? "In progress" : "Needs setup"), Se = k(() => {
      const s = M.value.message;
      return !!((s.body ?? "").toString().trim() || (s.header ?? "").toString().trim() || s.media_url || s.flow_id || s.coupon_code || s.lto_expiry || s.voice_transcript || s.contact_name || s.link_title || s.order_title || Array.isArray(s.buttons) && s.buttons.length || Array.isArray(s.products) && s.products.length || Array.isArray(s.cards) && s.cards.length);
    }), $e = ie(""), Ie = ie(!1), B = ie(null), f = k(
      () => new Set((L.disabledTemplateCategories ?? []).map((s) => String(s).trim().toLowerCase()))
    ), g = k(
      () => new Set((L.disabledTemplateFormats ?? []).map((s) => String(s).trim().toLowerCase()))
    ), J = k(
      () => po.filter((s) => {
        var N;
        const o = ((N = s.campaign) == null ? void 0 : N.message) ?? {}, b = String(o.template_category ?? "").trim().toLowerCase(), m = String(o.template_type ?? "").trim().toLowerCase();
        return !(b && f.value.has(b) || m && g.value.has(m));
      })
    ), ne = k(() => {
      const s = $e.value;
      return s ? Qe.find((o) => o.id === s) ?? null : null;
    }), Te = k(() => {
      const s = M.value.message.body ?? "";
      return ne.value ? Ge(s, ne.value.data) : s;
    }), Oe = k(() => {
      const s = M.value.message.header ?? "";
      return ne.value ? Ge(s, ne.value.data) : s;
    }), Ye = k(() => {
      var p;
      const s = M.value.message, o = s.template_type ?? "text", b = s.header_type ?? "none";
      let m, N, S, P, q, le, Z;
      (o === "image" || b === "image") && s.media_url ? m = { type: "image", url: s.media_url } : (o === "video" || b === "video") && s.media_url ? m = { type: "video", url: s.media_url } : o === "document" || b === "document" ? m = {
        type: "document",
        url: s.media_url || void 0,
        filename: s.document_filename || s.media_url || "document.pdf"
      } : b === "text" && s.header ? m = { type: "text", text: Oe.value } : s.header && (m = { type: "text", text: Oe.value });
      const pe = Te.value || "Start adding content to see a live preview here.";
      if (o === "location" && s.location) {
        const i = s.location, t = i.lat ?? i.latitude, F = i.lng ?? i.lon ?? i.longitude;
        t != null && F != null && (N = {
          lat: t,
          lng: F,
          name: i.name ?? i.title,
          address: i.address ?? `${t}, ${F}`
        });
      }
      (o === "catalog" || o === "mpm") && Array.isArray(s.products) && s.products.length && (S = !0, P = s.products.map((i) => ({
        image: i.image ?? i.imageUrl,
        name: i.name ?? i.sectionTitle ?? i.title ?? "Product",
        price: i.price ?? i.productId ?? ""
      }))), o === "carousel" && Array.isArray(s.cards) && s.cards.length && (S = !0, P = s.cards.map((i) => ({
        image: i.image ?? i.media_url,
        name: i.title ?? "Card",
        price: i.button_label ?? ""
      }))), o === "coupon" && s.coupon_code && (q = { code: s.coupon_code }), o === "lto" && s.lto_expiry && (le = s.lto_expiry), o === "auth" && (Z = { code: s.auth_code ?? s.otp_code ?? "123 456" });
      const Re = s.buttons ?? [];
      return o === "flow" && ((p = s.flow_cta_label) != null && p.trim()) && Re.push({
        label: s.flow_cta_label
      }), {
        format: o,
        templateName: s.template_name || void 0,
        templateLanguage: s.template_language || void 0,
        templateCategory: s.template_category || void 0,
        header: m,
        body: pe,
        mediaCaption: s.media_caption || void 0,
        footer: s.footer || void 0,
        buttons: Re.map((i) => ({ text: i.label || "Button", type: i.type, value: i.value })),
        location: N,
        catalog: S,
        multiProduct: P,
        coupon: q,
        limitedOffer: le,
        auth: Z,
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
        documentCard: s.document_filename || o === "document" || b === "document" ? {
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
        carouselCards: o === "carousel" && Array.isArray(s.cards) ? s.cards.map((i) => ({
          title: i.title || void 0,
          description: i.description || s.body || void 0,
          image: i.media_url || void 0,
          button: i.button_label || void 0
        })) : void 0,
        reactionEmoji: s.reaction_emoji || void 0,
        flow: o === "flow" ? {
          id: s.flow_id || void 0,
          ctaLabel: s.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Ve(s) {
      var m;
      const o = M.value, b = A({
        ...s.campaign.message ? s.campaign.message : o.message,
        template_name: ((m = s.campaign.message) == null ? void 0 : m.template_name) ?? s.campaign.name ?? o.name ?? void 0
      });
      E({
        ...s.campaign,
        message: b
      }), B.value = null, Ie.value = !1;
    }
    function De(s) {
      const o = s.target.value;
      if (!o) return;
      const b = J.value.find((m) => m.id === o);
      b && (j.value ? (B.value = b, Ie.value = !0) : Ve(b), s.target.value = "");
    }
    function je(s) {
      E({
        name: s,
        message: { ...M.value.message, template_name: s || void 0 },
        tracking: { ...M.value.tracking ?? {}, campaign_name: s }
      });
    }
    function He(s) {
      const o = M.value.message, b = A({
        ...o,
        ...s ?? {}
      });
      if (z(b), Object.prototype.hasOwnProperty.call(s ?? {}, "template_name")) {
        const m = String((s == null ? void 0 : s.template_name) ?? "");
        m !== M.value.name && E({
          name: m,
          tracking: {
            ...M.value.tracking ?? {},
            campaign_name: m
          }
        });
      }
    }
    Pe(
      () => M.value.name,
      (s) => {
        const o = String(M.value.message.template_name ?? "");
        (s || "") !== o && z({ template_name: s || void 0 });
      },
      { immediate: !0 }
    );
    function Me(s) {
      const o = ` {{ .${s.variable} }}`, b = M.value.message.variables ?? [], m = Array.from(/* @__PURE__ */ new Set([...b, s.variable]));
      if (s.field === "title") {
        const N = M.value.message.header ?? "";
        z({
          variables: m,
          header: N + o
        });
      } else if (s.field === "footer") {
        const N = M.value.message.footer ?? "";
        z({
          variables: m,
          footer: N + o
        });
      } else {
        const N = M.value.message.body ?? "";
        z({
          variables: m,
          body: N + o
        });
      }
    }
    function se() {
      var b;
      if (!Ce.value) return;
      const s = xt(M.value, {
        exampleData: (b = ne.value) == null ? void 0 : b.data
      }), o = de(M.value);
      ee("save-gupshup-template", s.payload, s.warnings, o), ee("save", o);
    }
    return (s, o) => {
      var b;
      return a(), n("div", ed, [
        e("div", td, [
          Ee(ut, {
            "campaign-name": w(M).name,
            status: w(M).status,
            dirty: w(j),
            "last-saved-at": w(_),
            "can-undo": w(be),
            "can-redo": w(ge),
            "slugify-name": L.enforceSlugName,
            "onUpdate:campaignName": je,
            onUndo: w(G),
            onRedo: w(ce)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ke.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: ye({
              background: w(xe).dangerBg,
              border: `1px solid ${w(xe).dangerBorder}`,
              borderRadius: `${w(Je).input}px`,
              padding: `${w(he)[12]}px ${w(he)[16]}px`,
              marginBottom: `${w(he)[16]}px`
            })
          }, [
            e("ul", {
              style: ye({ margin: 0, paddingLeft: "1.25rem", color: w(xe).danger })
            }, [
              (a(!0), n(W, null, D(ke.value, (m) => (a(), n("li", {
                key: m.message
              }, u(m.message), 1))), 128))
            ], 4)
          ], 4)) : v("", !0)
        ]),
        e("div", ad, [
          e("aside", nd, [
            l.disabledSections.includes("whatsapp") ? v("", !0) : (a(), n("div", sd, [
              e("div", od, [
                e("div", ld, [
                  o[6] || (o[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", id, u(Be.value), 1)
                ]),
                e("div", rd, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: De
                  }, [
                    o[7] || (o[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(W, null, D(J.value, (m) => (a(), n("option", {
                      key: m.id,
                      value: m.id
                    }, u(m.label), 9, dd))), 128))
                  ], 32)
                ]),
                e("div", ud, [
                  e("div", cd, [
                    o[8] || (o[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", pd, u(_e.value) + "%", 1)
                  ]),
                  e("div", md, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: ye({ width: `${_e.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ee(Si, {
                message: w(M).message,
                "show-reset": !0,
                "disabled-categories": l.disabledTemplateCategories,
                "disabled-formats": l.disabledTemplateFormats,
                onUpdate: He,
                onReset: o[0] || (o[0] = (m) => w(X)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              Ee(zt, {
                message: w(M).message,
                "variable-options": l.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: w(z),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", vd, [
            !l.designOnly && w(M).audience.test_mode ? (a(), n("div", bd, [...o[9] || (o[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              te(" Test mode — only your test segment will receive this. ", -1)
            ])])) : v("", !0),
            e("div", hd, [
              e("div", yd, [
                e("label", fd, [
                  o[11] || (o[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  We(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (m) => $e.value = m),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[10] || (o[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(W, null, D(w(Qe), (m) => (a(), n("option", {
                      key: m.id,
                      value: m.id
                    }, u(m.label), 9, gd))), 128))
                  ], 512), [
                    [ze, $e.value]
                  ])
                ]),
                e("div", kd, [
                  o[12] || (o[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(w(M).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: me(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !Se.value }])
              }, [
                Ee(Zr, { template: Ye.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", _d, [
          Ae.value.length > 0 ? (a(), n("div", wd, [
            o[13] || (o[13] = e("strong", null, "Warning:", -1)),
            te(" " + u((b = Ae.value[0]) == null ? void 0 : b.message) + " ", 1),
            Ae.value.length > 1 ? (a(), n("span", $d, " (+" + u(Ae.value.length - 1) + " more) ", 1)) : v("", !0)
          ])) : v("", !0),
          e("div", xd, [
            l.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: o[2] || (o[2] = (m) => ee("duplicate", JSON.parse(JSON.stringify(w(M)))))
            }, " Duplicate ")) : v("", !0),
            l.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: se
            }, " Save ")) : v("", !0),
            l.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: o[3] || (o[3] = (m) => ee("edit"))
            }, " Close ")) : v("", !0)
          ])
        ]),
        Ie.value ? (a(), n("div", Cd, [
          e("div", Sd, [
            o[14] || (o[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[15] || (o[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Id, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: o[4] || (o[4] = (m) => {
                  Ie.value = !1, B.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: o[5] || (o[5] = (m) => B.value && Ve(B.value))
              }, " Replace ")
            ])
          ])
        ])) : v("", !0)
      ]);
    };
  }
}), Gt = /* @__PURE__ */ Le(Ad, [["__scopeId", "data-v-79c11b0a"]]), Td = { class: "kb-section" }, Rd = { class: "kb-section__head" }, Ud = { class: "kb-field" }, Bd = ["value"], Ld = { class: "kb-field" }, Pd = { class: "kb-label" }, Ed = { key: 0 }, Od = { key: 1 }, Nd = { key: 2 }, Vd = { class: "kb-field-with-var" }, Md = ["value"], Wd = { class: "kb-var-picker-wrap" }, Dd = {
  key: 0,
  class: "kb-var-menu",
  role: "menu"
}, jd = ["onClick"], Hd = {
  key: 0,
  class: "kb-truncation-hint"
}, Fd = { class: "kb-field" }, qd = { class: "kb-insert-row" }, zd = ["value"], Yd = { class: "kb-field" }, Kd = { class: "kb-insert-row" }, Gd = /* @__PURE__ */ Ue({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(l, { emit: d }) {
    const c = l, y = d, x = [
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
    ], I = ie(c.variableOptions && c.variableOptions.length ? [...c.variableOptions] : x), A = ie(I.value[0] ?? x[0]), C = ie("");
    Pe(
      () => c.variableOptions,
      (z) => {
        z && z.length && (I.value = [...z], I.value.includes(A.value) || (A.value = I.value[0]));
      }
    );
    const U = k(() => c.message.body ?? ""), L = ie(null), T = k(() => U.value.length), Q = k(() => T.value ? T.value <= 160 ? 1 : Math.ceil(T.value / 153) : 0), ee = k(() => {
      const z = T.value;
      return z <= 160 ? null : z <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function de(z) {
      const G = z.target.value;
      y("update", {
        sender_id: G || void 0
      });
    }
    function M(z) {
      const G = z.target.value;
      y("update", {
        body: G
      });
    }
    function j() {
      const z = A.value;
      if (!z) return;
      const G = ` {{ .${z} }}`, ce = U.value || "", be = c.message.variables ?? [], ge = Array.from(/* @__PURE__ */ new Set([...be, z]));
      y("update", {
        body: ce + G,
        variables: ge
      });
    }
    function H(z) {
      L.value = L.value === z ? null : z;
    }
    function Y(z, G) {
      const ce = ` {{ .${G} }}`, be = U.value || "", ge = c.message.variables ?? [], X = Array.from(/* @__PURE__ */ new Set([...ge, G]));
      y("update", {
        body: be + ce,
        variables: X
      }), L.value = null;
    }
    function E() {
      const z = C.value.trim();
      z && (I.value.includes(z) || (I.value = [...I.value, z]), A.value = z, C.value = "");
    }
    return (z, G) => (a(), n("section", Td, [
      e("div", Rd, [
        G[4] || (G[4] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        l.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: G[0] || (G[0] = (ce) => z.$emit("reset"))
        }, " Reset section ")) : v("", !0)
      ]),
      G[11] || (G[11] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Ud, [
        G[5] || (G[5] = e("label", { class: "kb-label" }, [
          te(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: c.message.sender_id ?? "",
          onInput: de
        }, null, 40, Bd)
      ]),
      e("div", Ld, [
        e("label", Pd, [
          G[6] || (G[6] = te(" Message body ", -1)),
          e("span", {
            class: me(["kb-counter", { "kb-counter--warn": Q.value > 3 }])
          }, [
            te(u(T.value) + " chars · ", 1),
            Q.value === 0 ? (a(), n("span", Ed, "0 segments")) : Q.value === 1 ? (a(), n("span", Od, "1 segment")) : (a(), n("span", Nd, u(Q.value) + " segments", 1))
          ], 2)
        ]),
        e("div", Vd, [
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
            value: U.value,
            onInput: M
          }, null, 40, Md),
          e("div", Wd, [
            e("button", {
              type: "button",
              class: "kb-btn-insert",
              onClick: G[1] || (G[1] = (ce) => H("body"))
            }, "{{ .var }}"),
            L.value === "body" ? (a(), n("div", Dd, [
              (a(!0), n(W, null, D(I.value, (ce) => (a(), n("button", {
                key: `sms-body-var-${ce}`,
                type: "button",
                class: "kb-var-menu-item",
                onClick: (be) => Y("body", ce)
              }, u(ce), 9, jd))), 128))
            ])) : v("", !0)
          ])
        ]),
        G[7] || (G[7] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        ee.value ? (a(), n("p", Hd, u(ee.value), 1)) : v("", !0)
      ]),
      e("div", Fd, [
        G[8] || (G[8] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", qd, [
          We(e("select", {
            "onUpdate:modelValue": G[2] || (G[2] = (ce) => A.value = ce),
            class: "kb-select"
          }, [
            (a(!0), n(W, null, D(I.value, (ce) => (a(), n("option", {
              key: ce,
              value: ce
            }, u(ce), 9, zd))), 128))
          ], 512), [
            [ze, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: j
          }, " Insert into message ")
        ]),
        G[9] || (G[9] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Yd, [
        G[10] || (G[10] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Kd, [
          We(e("input", {
            "onUpdate:modelValue": G[3] || (G[3] = (ce) => C.value = ce),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [ht, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: E
          }, " Add ")
        ])
      ])
    ]));
  }
}), Jd = /* @__PURE__ */ Le(Gd, [["__scopeId", "data-v-68a73354"]]), Xd = { class: "keos-sms-builder" }, Qd = { class: "kb-builder-top" }, Zd = { class: "kb-sms-layout" }, eu = { class: "kb-sms-sidebar" }, tu = {
  key: 0,
  class: "kb-sms-form"
}, au = { class: "kb-sms-form-head" }, nu = { class: "kb-sms-form-head-top" }, su = { class: "kb-sms-health-pill" }, ou = { class: "kb-wa-form-head-row" }, lu = ["value"], iu = { class: "kb-sms-health" }, ru = { class: "kb-sms-health-row" }, du = { class: "kb-sms-health-value" }, uu = { class: "kb-sms-health-bar" }, cu = { class: "kb-sms-canvas" }, pu = {
  key: 0,
  class: "kb-sms-test-banner"
}, mu = { class: "kb-sms-preview-chrome" }, vu = { class: "kb-push-preview-controls" }, bu = { class: "kb-push-preview-as" }, hu = ["value"], yu = { class: "kb-preview-status" }, fu = { class: "kb-preview" }, gu = { class: "kb-sms-preview" }, ku = { class: "kb-sms-phone" }, _u = { class: "kb-sms-header" }, wu = { class: "kb-sms-sender-avatar" }, $u = { class: "kb-sms-header-copy" }, xu = { class: "kb-sms-sender" }, Cu = { class: "kb-sms-meta" }, Su = { class: "kb-sms-thread" }, Iu = {
  key: 0,
  class: "kb-sms-empty"
}, Au = { class: "kb-sms-text" }, Tu = { class: "kb-sms-bubble-meta" }, Ru = {
  key: 0,
  class: "kb-sms-segment-chip"
}, Uu = {
  key: 0,
  class: "kb-sms-more-segments"
}, Bu = { class: "kb-sms-delivery-line" }, Lu = { class: "kb-sms-counter" }, Pu = { key: 0 }, Eu = { key: 1 }, Ou = { key: 2 }, Nu = {
  key: 3,
  class: "kb-sms-cost"
}, Vu = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Mu = { class: "kb-sms-actions" }, Wu = {
  key: 0,
  class: "kb-actions-note"
}, Du = { key: 0 }, ju = { class: "kb-sms-actions-right" }, Hu = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Fu = { class: "kb-confirm-dialog" }, qu = { class: "kb-confirm-actions" }, zu = /* @__PURE__ */ Ue({
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
  setup(l, { emit: d }) {
    const c = l, y = d, {
      campaign: x,
      dirty: I,
      customValidatorErrors: A,
      getValidationWithWarnings: C,
      update: U,
      updateMessage: L,
      undo: T,
      redo: Q,
      canUndo: ee,
      canRedo: de,
      resetMessage: M,
      hooks: j
    } = rt({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (se) => {
          var b, m;
          const s = [];
          (b = se.name) != null && b.trim() || s.push("Template name is required");
          const o = (m = c.hooks) != null && m.customValidators ? await c.hooks.customValidators(se) : [];
          return [...s, ...o];
        }
      },
      onDirty: () => y("change", x.value)
    }), { lastSavedAt: H } = dt(x, { channel: "sms" });
    function Y(se) {
      (se.metaKey || se.ctrlKey) && se.key === "z" && (se.preventDefault(), se.shiftKey ? Q() : T());
    }
    nt(() => {
      window.addEventListener("keydown", Y);
    }), st(() => {
      window.removeEventListener("keydown", Y);
    }), Pe(x, (se) => y("update:modelValue", se), { deep: !0 });
    const E = ie(), z = ie(!0);
    async function G() {
      if (j.estimateReach)
        try {
          E.value = await j.estimateReach(x.value.audience);
        } catch {
          E.value = void 0;
        }
      j.canSend && (z.value = await Promise.resolve(j.canSend()));
    }
    G(), Pe(() => x.value.audience, G, { deep: !0 });
    const ce = k(() => (A.value, C(E.value))), be = k(() => ce.value.blockingErrors), ge = k(() => ce.value.warnings), X = k(() => ce.value.valid), h = k(() => {
      var b, m, N;
      const se = x.value.message, s = [
        !!((b = x.value.name) != null && b.trim()),
        !!((m = se.body) != null && m.trim()),
        !!((N = se.sender_id) != null && N.trim()),
        !!x.value.template_type,
        (se.body ?? "").length > 20
      ], o = s.filter(Boolean).length;
      return Math.round(o / s.length * 100);
    }), _ = k(() => h.value >= 90 ? "Production ready" : h.value >= 70 ? "Strong draft" : h.value >= 40 ? "In progress" : "Needs setup"), O = k(() => !!$e.value.trim()), ue = k(
      () => x.value.template_type ?? "transactional"
    ), oe = ie(""), R = ie(!1), ve = ie(null), ke = k(() => {
      const se = oe.value;
      return se ? Qe.find((s) => s.id === se) ?? null : null;
    }), Ae = k(() => {
      const se = $e.value;
      return ke.value ? Ge(se, ke.value.data) : se;
    });
    function Ce(se) {
      const s = x.value, o = se.campaign.message ? { ...s.message, ...se.campaign.message } : s.message;
      U({
        ...se.campaign,
        message: o
      }), ve.value = null, R.value = !1;
    }
    function _e(se) {
      const s = se.target.value;
      if (!s) return;
      const o = Tt.find((b) => b.id === s);
      o && (I.value ? (ve.value = o, R.value = !0) : Ce(o), se.target.value = "");
    }
    function Be(se) {
      U({ template_type: se });
    }
    function Se(se) {
      U({
        name: se,
        tracking: { ...x.value.tracking ?? {}, campaign_name: se }
      });
    }
    const $e = k(
      () => (x.value.message.body ?? "") || ""
    ), Ie = k(() => $e.value.length), B = k(() => /[^\x00-\x7f]/.test($e.value)), f = k(() => B.value ? 70 : 160), g = k(() => B.value ? 67 : 153), J = k(() => Ie.value ? Ie.value <= f.value ? 1 : Math.ceil(Ie.value / g.value) : 0), ne = k(() => {
      const se = Ae.value.trim();
      if (!se) return [];
      const s = J.value <= 1 ? f.value : g.value, o = [];
      for (let b = 0; b < se.length; b += s)
        o.push(se.slice(b, b + s));
      return o;
    }), Te = k(() => ne.value.slice(0, 3)), Oe = k(
      () => Math.max(0, ne.value.length - Te.value.length)
    ), Ye = k(() => B.value ? "Unicode" : "GSM-7"), Ve = k(() => O.value ? J.value > 3 ? "Queued" : "Delivered" : "Draft"), De = k(() => {
      const se = c.costPerSegment ?? 0;
      return !se || J.value === 0 ? null : (J.value * se).toFixed(2);
    }), je = k(() => {
      const se = Ie.value, s = f.value + g.value;
      return se <= f.value ? null : se <= s ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), He = k(
      () => x.value.message.sender_id ?? "YourBrand"
    );
    function Me() {
      X.value && y("save", x.value);
    }
    return (se, s) => {
      var o;
      return a(), n("div", Xd, [
        e("div", Qd, [
          Ee(ut, {
            "campaign-name": w(x).name,
            status: w(x).status,
            dirty: w(I),
            "last-saved-at": w(H),
            "can-undo": w(ee),
            "can-redo": w(de),
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": Se,
            onUndo: w(T),
            onRedo: w(Q)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          be.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: ye({
              background: w(xe).dangerBg,
              border: `1px solid ${w(xe).dangerBorder}`,
              borderRadius: `${w(Je).input}px`,
              padding: `${w(he)[12]}px ${w(he)[16]}px`,
              marginBottom: `${w(he)[16]}px`
            })
          }, [
            e("ul", {
              style: ye({ margin: 0, paddingLeft: "1.25rem", color: w(xe).danger })
            }, [
              (a(!0), n(W, null, D(be.value, (b) => (a(), n("li", {
                key: b.message
              }, u(b.message), 1))), 128))
            ], 4)
          ], 4)) : v("", !0)
        ]),
        e("div", Zd, [
          e("aside", eu, [
            l.disabledSections.includes("sms") ? v("", !0) : (a(), n("div", tu, [
              e("div", au, [
                e("div", nu, [
                  s[6] || (s[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", su, u(_.value), 1)
                ]),
                e("div", ou, [
                  Ee(_t, {
                    "template-type": ue.value,
                    onUpdate: Be
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: _e
                  }, [
                    s[7] || (s[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(W, null, D(w(Tt), (b) => (a(), n("option", {
                      key: b.id,
                      value: b.id
                    }, u(b.label), 9, lu))), 128))
                  ], 32)
                ]),
                e("div", iu, [
                  e("div", ru, [
                    s[8] || (s[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", du, u(h.value) + "%", 1)
                  ]),
                  e("div", uu, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: ye({ width: `${h.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ee(Jd, {
                message: w(x).message,
                "variable-options": l.variableOptions,
                "show-reset": !0,
                onUpdate: w(L),
                onReset: s[0] || (s[0] = (b) => w(M)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", cu, [
            !l.designOnly && w(x).audience.test_mode ? (a(), n("div", pu, [...s[9] || (s[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              te(" Test mode — only your test segment will receive this. ", -1)
            ])])) : v("", !0),
            e("div", mu, [
              e("div", vu, [
                e("label", bu, [
                  s[11] || (s[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  We(e("select", {
                    "onUpdate:modelValue": s[1] || (s[1] = (b) => oe.value = b),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    s[10] || (s[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(W, null, D(w(Qe), (b) => (a(), n("option", {
                      key: b.id,
                      value: b.id
                    }, u(b.label), 9, hu))), 128))
                  ], 512), [
                    [ze, oe.value]
                  ])
                ]),
                e("div", yu, [
                  s[12] || (s[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, u(J.value || 0), 1)
                ])
              ]),
              e("div", {
                class: me(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !O.value }])
              }, [
                e("div", fu, [
                  e("div", gu, [
                    e("div", ku, [
                      s[15] || (s[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", _u, [
                        e("div", wu, u(He.value.slice(0, 1).toUpperCase()), 1),
                        e("div", $u, [
                          e("div", xu, u(He.value), 1),
                          e("div", Cu, "Text message · " + u(Ve.value), 1)
                        ])
                      ]),
                      e("div", Su, [
                        O.value ? (a(), n(W, { key: 1 }, [
                          (a(!0), n(W, null, D(Te.value, (b, m) => (a(), n("div", {
                            key: `${m}-${b.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", Au, u(b), 1),
                            e("span", Tu, [
                              s[13] || (s[13] = te(" 09:21 ", -1)),
                              Te.value.length > 1 ? (a(), n("span", Ru, "Part " + u(m + 1), 1)) : v("", !0)
                            ])
                          ]))), 128)),
                          Oe.value > 0 ? (a(), n("div", Uu, " +" + u(Oe.value) + " more segments ", 1)) : v("", !0),
                          e("div", Bu, [
                            s[14] || (s[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            te(" " + u(Ve.value), 1)
                          ])
                        ], 64)) : (a(), n("div", Iu, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Lu, [
                      te(u(Ie.value) + " characters · ", 1),
                      J.value === 0 ? (a(), n("span", Pu, "0 segments")) : J.value === 1 ? (a(), n("span", Eu, "1 segment")) : (a(), n("span", Ou, u(J.value) + " segments", 1)),
                      te(" (" + u(f.value) + " chars single, " + u(g.value) + " multi-part · " + u(Ye.value) + ") ", 1),
                      De.value !== null ? (a(), n("span", Nu, " · Est. " + u(De.value), 1)) : v("", !0)
                    ]),
                    je.value ? (a(), n("p", Vu, u(je.value), 1)) : v("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Mu, [
          ge.value.length > 0 ? (a(), n("div", Wu, [
            s[16] || (s[16] = e("strong", null, "Warning:", -1)),
            te(" " + u((o = ge.value[0]) == null ? void 0 : o.message) + " ", 1),
            ge.value.length > 1 ? (a(), n("span", Du, " (+" + u(ge.value.length - 1) + " more) ", 1)) : v("", !0)
          ])) : v("", !0),
          e("div", ju, [
            l.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: s[2] || (s[2] = (b) => y("duplicate", JSON.parse(JSON.stringify(w(x)))))
            }, " Duplicate ")) : v("", !0),
            l.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Me
            }, " Save ")) : v("", !0),
            l.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: s[3] || (s[3] = (b) => y("edit"))
            }, " Close ")) : v("", !0)
          ])
        ]),
        R.value ? (a(), n("div", Hu, [
          e("div", Fu, [
            s[17] || (s[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            s[18] || (s[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", qu, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: s[4] || (s[4] = (b) => {
                  R.value = !1, ve.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: s[5] || (s[5] = (b) => ve.value && Ce(ve.value))
              }, " Replace ")
            ])
          ])
        ])) : v("", !0)
      ]);
    };
  }
}), Jt = /* @__PURE__ */ Le(zu, [["__scopeId", "data-v-5e442b56"]]), Yu = 30, Ku = 60, Gu = 130;
function Ju(l) {
  const d = (l ?? "").trim().length;
  return d < Yu ? "too_short" : d <= Ku ? "good" : "too_long";
}
function Xu(l) {
  const d = (l ?? "").trim().length;
  return d === 0 ? "too_short" : d <= Gu ? "good" : "too_long";
}
const Qu = [
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
function Nt(l) {
  if (!l || typeof l != "string") return [];
  const d = [];
  for (const c of Qu) {
    const y = l.match(c);
    y && d.push(y[0]);
  }
  return d;
}
function Zu(l) {
  switch (l) {
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
function ec(l) {
  switch (l) {
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
const tc = { class: "em-section" }, ac = { class: "em-strip kb-section" }, nc = { class: "em-strip-head" }, sc = { class: "em-field kb-field" }, oc = { class: "em-input-group em-input-group--overlay" }, lc = ["value"], ic = { class: "em-var-picker-wrap" }, rc = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, dc = ["onClick"], uc = { class: "em-field kb-field" }, cc = ["value"], pc = { class: "em-field kb-field" }, mc = ["value"], vc = { class: "em-field kb-field" }, bc = { class: "em-input-group em-input-group--overlay" }, hc = ["value"], yc = { class: "em-var-picker-wrap" }, fc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, gc = ["onClick"], kc = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, _c = ["onClick"], wc = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, $c = { class: "em-field kb-field" }, xc = { class: "em-input-group" }, Cc = ["value"], Sc = { class: "em-var-picker-wrap" }, Ic = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ac = ["onClick"], Tc = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Rc = ["onClick"], Uc = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Bc = { class: "em-strip kb-section em-strip--library" }, Lc = { class: "em-library-chips" }, Pc = ["onClick"], Ec = { class: "em-strip kb-section em-strip--blocks" }, Oc = { class: "em-block-list" }, Nc = ["data-type"], Vc = { class: "em-block-bar" }, Mc = { class: "em-block-type" }, Wc = { class: "em-block-actions" }, Dc = ["disabled", "onClick"], jc = ["disabled", "onClick"], Hc = ["onClick"], Fc = {
  key: 0,
  class: "em-block-fields"
}, qc = ["value", "onChange"], zc = ["value", "onInput"], Yc = { class: "em-var-picker-wrap" }, Kc = ["onClick"], Gc = ["onClick"], Jc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Xc = ["onClick"], Qc = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Zc = ["onClick"], ep = {
  key: 1,
  class: "em-block-fields"
}, tp = ["value", "onInput"], ap = { class: "em-var-picker-wrap" }, np = ["onClick"], sp = ["onClick"], op = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, lp = ["onClick"], ip = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, rp = ["onClick"], dp = {
  key: 2,
  class: "em-block-fields"
}, up = ["value", "onInput"], cp = ["value", "onInput"], pp = { class: "em-var-picker-wrap" }, mp = ["onClick"], vp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, bp = ["onClick"], hp = ["value", "onInput"], yp = {
  key: 3,
  class: "em-block-fields"
}, fp = ["value", "onInput"], gp = { class: "em-var-picker-wrap" }, kp = ["onClick"], _p = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, wp = ["onClick"], $p = ["value", "onInput"], xp = { class: "em-block-fields--row" }, Cp = ["value", "onInput"], Sp = { class: "em-check-row" }, Ip = ["checked", "onChange"], Ap = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, Tp = ["value", "onInput"], Rp = {
  key: 5,
  class: "em-block-fields"
}, Up = ["value", "onInput"], Bp = ["value", "onInput"], Lp = ["value", "onInput"], Pp = { class: "em-var-picker-wrap" }, Ep = ["onClick"], Op = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Np = ["onClick"], Vp = { class: "em-var-picker-wrap" }, Mp = ["onClick"], Wp = ["onClick"], Dp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, jp = ["onClick"], Hp = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Fp = ["onClick"], qp = {
  key: 6,
  class: "em-block-fields"
}, zp = ["value", "onChange"], Yp = { class: "em-list-items" }, Kp = ["value", "onInput", "placeholder"], Gp = { class: "em-var-picker-wrap" }, Jp = ["onClick"], Xp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Qp = ["onClick"], Zp = ["onClick"], em = ["onClick"], tm = {
  key: 7,
  class: "em-block-fields"
}, am = ["value", "onChange"], nm = ["value", "onInput"], sm = { class: "em-var-picker-wrap" }, om = ["onClick"], lm = ["onClick"], im = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, rm = ["onClick"], dm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, um = ["onClick"], cm = {
  key: 8,
  class: "em-block-fields"
}, pm = { class: "em-social-links" }, mm = ["value", "onChange"], vm = ["value", "onInput"], bm = ["onClick"], hm = ["onClick"], ym = {
  key: 9,
  class: "em-block-fields"
}, fm = ["value", "onInput"], gm = ["value", "onInput"], km = ["value", "onInput"], _m = { class: "em-var-picker-wrap" }, wm = ["onClick"], $m = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, xm = ["onClick"], Cm = {
  key: 10,
  class: "em-block-fields"
}, Sm = ["value", "onInput"], Im = { class: "em-link-list-items" }, Am = ["value", "onInput"], Tm = { class: "em-var-picker-wrap" }, Rm = ["onClick"], Um = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Bm = ["onClick"], Lm = ["value", "onInput"], Pm = ["onClick"], Em = ["onClick"], Om = {
  key: 11,
  class: "em-block-fields"
}, Nm = ["value", "onInput"], Vm = { class: "em-var-picker-wrap" }, Mm = ["onClick"], Wm = ["onClick"], Dm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, jm = ["onClick"], Hm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Fm = ["onClick"], qm = ["value", "onInput"], zm = { class: "em-var-picker-wrap" }, Ym = ["onClick"], Km = ["onClick"], Gm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Jm = ["onClick"], Xm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Qm = ["onClick"], Zm = {
  key: 12,
  class: "em-block-fields"
}, ev = { class: "em-block-fields--row" }, tv = ["value", "onInput"], av = { class: "em-block-fields--row" }, nv = ["value", "onInput"], sv = ["value", "onChange"], ov = {
  key: 13,
  class: "em-block-fields"
}, lv = ["value", "onChange"], iv = { class: "em-inline-label" }, rv = ["value", "onInput"], dv = { class: "em-var-picker-wrap" }, uv = ["onClick"], cv = ["onClick"], pv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, mv = ["onClick"], vv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, bv = ["onClick"], hv = {
  key: 14,
  class: "em-block-fields"
}, yv = ["value", "onInput"], fv = { class: "em-link-list-items" }, gv = ["value", "onInput"], kv = { class: "em-var-picker-wrap" }, _v = ["onClick"], wv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, $v = ["onClick"], xv = ["value", "onInput"], Cv = ["onClick"], Sv = ["onClick"], Iv = {
  key: 15,
  class: "em-block-fields"
}, Av = ["value", "onInput"], Tv = { class: "em-var-picker-wrap" }, Rv = ["onClick"], Uv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Bv = ["onClick"], Lv = ["value", "onInput"], Pv = { class: "em-var-picker-wrap" }, Ev = ["onClick"], Ov = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Nv = ["onClick"], Vv = ["onClick"], Mv = ["onClick"], Wv = {
  key: 16,
  class: "em-block-fields"
}, Dv = ["value", "onInput"], jv = ["value", "onInput"], Hv = ["value", "onInput"], Fv = ["onClick"], qv = ["onClick"], zv = {
  key: 17,
  class: "em-block-fields"
}, Yv = ["value", "onInput"], Kv = { class: "em-var-picker-wrap" }, Gv = ["onClick"], Jv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Xv = ["onClick"], Qv = ["value", "onInput"], Zv = {
  key: 18,
  class: "em-block-fields"
}, eb = ["value", "onInput"], tb = ["value", "onInput"], ab = { class: "em-var-picker-wrap" }, nb = ["onClick"], sb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ob = ["onClick"], lb = ["value", "onInput"], ib = { class: "em-var-picker-wrap" }, rb = ["onClick"], db = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ub = ["onClick"], cb = ["value", "onInput"], pb = { class: "em-var-picker-wrap" }, mb = ["onClick"], vb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, bb = ["onClick"], hb = ["value", "onInput"], yb = {
  key: 19,
  class: "em-block-fields"
}, fb = ["value", "onInput"], gb = { class: "em-var-picker-wrap" }, kb = ["onClick"], _b = ["onClick"], wb = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, $b = ["onClick"], xb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Cb = ["onClick"], Sb = {
  key: 20,
  class: "em-block-fields"
}, Ib = ["value", "onInput"], Ab = { class: "em-var-picker-wrap" }, Tb = ["onClick"], Rb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ub = ["onClick"], Bb = ["value", "onInput"], Lb = { class: "em-var-picker-wrap" }, Pb = ["onClick"], Eb = ["onClick"], Ob = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Nb = ["onClick"], Vb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Mb = ["onClick"], Wb = {
  key: 21,
  class: "em-block-fields"
}, Db = ["value", "onInput"], jb = { class: "em-block-fields--row" }, Hb = ["value", "onInput"], Fb = {
  key: 22,
  class: "em-block-fields"
}, qb = ["value", "onInput"], zb = ["value", "onInput"], Yb = { class: "em-var-picker-wrap" }, Kb = ["onClick"], Gb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Jb = ["onClick"], Xb = ["value", "onInput"], Qb = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Zb = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, eh = ["onClick"], th = ["onClick"], ah = ["onClick"], nh = { class: "em-check-row" }, sh = ["checked", "onChange"], oh = { class: "em-add-bar kb-field kb-field--add-bar" }, lh = { class: "em-add-bar-btns" }, ih = { class: "em-strip kb-section em-strip--personalize" }, rh = { class: "em-field kb-field" }, dh = { class: "em-input-group" }, uh = ["value"], ch = { class: "em-field kb-field" }, ph = { class: "em-input-group" }, Fe = "{{ .var }}", mh = /* @__PURE__ */ Ue({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(l, { emit: d }) {
    var Re;
    function c() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const y = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], x = [
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
    function I(p) {
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
          return { id: c(), type: "social", links: y.map((i) => ({ ...i })), alignment: "center", fullWidth: !1 };
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
    const A = l, C = d, U = [
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
    ], L = ie(
      (Re = A.variableOptions) != null && Re.length ? [...A.variableOptions] : U
    ), T = ie(L.value[0] ?? "first_name"), Q = ie("");
    Pe(
      () => A.variableOptions,
      (p) => {
        p != null && p.length && (L.value = [...p], L.value.includes(T.value) || (T.value = L.value[0]));
      }
    );
    const ee = k(() => A.message.subject ?? ""), de = k(() => A.message.preview_text ?? ""), M = k(() => Ju(ee.value)), j = k(() => Xu(de.value)), H = k(() => Nt(ee.value)), Y = k(() => Nt(de.value)), E = k(() => {
      const p = A.message.blocks;
      return Array.isArray(p) && p.length > 0 ? p : [I("paragraph")];
    });
    Pe(
      () => A.message.blocks,
      (p) => {
        (!Array.isArray(p) || p.length === 0) && C("update", { blocks: [I("paragraph")] });
      },
      { immediate: !0 }
    );
    function z(p) {
      C("update", { blocks: p });
    }
    function G(p) {
      C("update", { subject: p.target.value });
    }
    function ce(p) {
      const i = p.target.value;
      C("update", { preview_text: i || void 0 });
    }
    function be(p) {
      C("update", { from_name: p.target.value || void 0 });
    }
    function ge(p) {
      C("update", { from_address: p.target.value || void 0 });
    }
    function X(p) {
      C("update", { reply_to: p.target.value || void 0 });
    }
    const h = [
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
    function _(p) {
      const i = p.blocks();
      z([...E.value, ...i]);
    }
    function O(p) {
      const i = [...E.value, I(p)];
      z(i);
    }
    function ue(p) {
      z(E.value.filter((i) => i.id !== p));
    }
    function oe(p, i) {
      const t = E.value.findIndex(($) => $.id === p);
      if (t < 0) return;
      const F = i === "up" ? t - 1 : t + 1;
      if (F < 0 || F >= E.value.length) return;
      const r = [...E.value];
      [r[t], r[F]] = [r[F], r[t]], z(r);
    }
    function R(p, i) {
      const t = E.value.map((F) => F.id === p ? { ...F, ...i } : F);
      z(t);
    }
    function ve(p, i, t) {
      const F = E.value.find(($) => $.id === p);
      if (!F || F.type !== "list") return;
      const r = [...F.items || []];
      r[i] = t, R(p, { items: r });
    }
    function ke(p) {
      const i = E.value.find((t) => t.id === p);
      !i || i.type !== "list" || R(p, { items: [...i.items || [], "New item"] });
    }
    function Ae(p, i) {
      const t = E.value.find((r) => r.id === p);
      if (!t || t.type !== "list") return;
      const F = (t.items || []).filter((r, $) => $ !== i);
      R(p, { items: F });
    }
    function Ce(p, i, t, F) {
      const r = E.value.find((V) => V.id === p);
      if (!r || r.type !== "social") return;
      const $ = (r.links || []).map((V, we) => we === i ? { ...V, [t]: F } : V);
      R(p, { links: $ });
    }
    function _e(p) {
      const i = E.value.find((t) => t.id === p);
      !i || i.type !== "social" || R(p, { links: [...i.links || [], { platform: "custom", url: "" }] });
    }
    function Be(p, i) {
      const t = E.value.find((r) => r.id === p);
      if (!t || t.type !== "social") return;
      const F = (t.links || []).filter((r, $) => $ !== i);
      R(p, { links: F });
    }
    function Se(p, i, t, F) {
      const r = E.value.find((V) => V.id === p);
      if (!r || r.type !== "link_list") return;
      const $ = (r.links || []).map((V, we) => we === i ? { ...V, [t]: F } : V);
      R(p, { links: $ });
    }
    function $e(p) {
      const i = E.value.find((t) => t.id === p);
      !i || i.type !== "link_list" || R(p, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function Ie(p, i) {
      const t = E.value.find((r) => r.id === p);
      if (!t || t.type !== "link_list") return;
      const F = (t.links || []).filter((r, $) => $ !== i);
      R(p, { links: F });
    }
    function B(p, i) {
      const t = E.value.find((F) => F.id === p);
      if (!(!t || t.type !== "row")) {
        if (i.columnCount !== void 0 && i.columnCount !== t.columnCount) {
          const F = [...t.cells || []];
          for (; F.length < i.columnCount; ) F.push("Cell content");
          i.cells = F.slice(0, i.columnCount);
        }
        R(p, i);
      }
    }
    function f(p, i, t) {
      const F = E.value.find(($) => $.id === p);
      if (!F || F.type !== "row") return;
      const r = [...F.cells || []];
      r[i] = t, R(p, { cells: r });
    }
    function g(p, i, t, F) {
      const r = E.value.find((V) => V.id === p);
      if (!r || r.type !== "navbar") return;
      const $ = (r.links || []).map((V, we) => we === i ? { ...V, [t]: F } : V);
      R(p, { links: $ });
    }
    function J(p) {
      const i = E.value.find((t) => t.id === p);
      !i || i.type !== "navbar" || R(p, { links: [...i.links || [], { text: "", url: "" }] });
    }
    function ne(p, i) {
      const t = E.value.find((F) => F.id === p);
      !t || t.type !== "navbar" || R(p, { links: (t.links || []).filter((F, r) => r !== i) });
    }
    function Te(p, i, t, F) {
      const r = E.value.find((V) => V.id === p);
      if (!r || r.type !== "accordion") return;
      const $ = (r.items || []).map((V, we) => we === i ? { ...V, [t]: F } : V);
      R(p, { items: $ });
    }
    function Oe(p) {
      const i = E.value.find((t) => t.id === p);
      !i || i.type !== "accordion" || R(p, { items: [...i.items || [], { title: "New section", content: "" }] });
    }
    function Ye(p, i) {
      const t = E.value.find((F) => F.id === p);
      !t || t.type !== "accordion" || R(p, { items: (t.items || []).filter((F, r) => r !== i) });
    }
    function Ve(p, i, t, F) {
      const r = E.value.find((V) => V.id === p);
      if (!r || r.type !== "carousel") return;
      const $ = (r.slides || []).map((V, we) => we === i ? { ...V, [t]: F } : V);
      R(p, { slides: $ });
    }
    function De(p) {
      const i = E.value.find((t) => t.id === p);
      !i || i.type !== "carousel" || R(p, { slides: [...i.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function je(p, i) {
      const t = E.value.find((F) => F.id === p);
      !t || t.type !== "carousel" || R(p, { slides: (t.slides || []).filter((F, r) => r !== i) });
    }
    function He(p, i = T.value) {
      const t = ` {{ .${i} }}`, F = A.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...F, i]));
      p === "subject" ? C("update", {
        subject: (ee.value || "") + t,
        variables: r
      }) : C("update", {
        preview_text: (de.value || "") + t,
        variables: r
      });
    }
    function Me(p, i = T.value) {
      const t = E.value.find((qe) => qe.id === p);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const F = ` {{ .${i} }}`, r = A.message.variables ?? [], $ = Array.from(/* @__PURE__ */ new Set([...r, i])), V = (t.type === "footer", "content"), Ze = (t[V] ?? "") + F, tt = E.value.map(
        (qe) => qe.id === p ? { ...qe, [V]: Ze } : qe
      );
      C("update", { blocks: tt, variables: $ });
    }
    function se(p, i, t = T.value) {
      const F = E.value.find((Ze) => Ze.id === p);
      if (!F || F.type !== "row") return;
      const r = ` {{ .${t} }}`, $ = A.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...$, t])), we = [...F.cells || []];
      we[i] = (we[i] || "") + r, R(p, { cells: we }), C("update", { variables: V });
    }
    function s(p, i, t = T.value) {
      const F = E.value.find((qe) => qe.id === p);
      if (!F || F.type !== "columns") return;
      const r = ` {{ .${t} }}`, $ = A.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...$, t])), we = i === "left" ? "leftContent" : "rightContent", tt = (F[we] ?? "") + r;
      R(p, { [we]: tt }), C("update", { variables: V });
    }
    const o = ie(null), b = ie(null), m = [
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
    function N(p) {
      o.value = o.value === p ? null : p;
    }
    function S(p, i) {
      if (i) {
        if (p === "subject") He("subject", i);
        else if (p === "preview") He("preview", i);
        else if (p.startsWith("block:")) Me(p.slice(6), i);
        else if (p.startsWith("col-left:")) s(p.slice(9), "left", i);
        else if (p.startsWith("col-right:")) s(p.slice(10), "right", i);
        else if (p.startsWith("row:")) {
          const [, t, F] = p.split(":");
          se(t, Number(F), i);
        }
        o.value = null;
      }
    }
    function P(p) {
      b.value = b.value === p ? null : p;
    }
    function q(p, i) {
      return `${String(p ?? "")}${i}`;
    }
    function le(p, i) {
      var F, r;
      if (!i) return;
      const t = E.value.find(($) => $.id === p);
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
            const $ = (Array.isArray(t.cells) ? [...t.cells] : []).map((V) => String(V ?? ""));
            $.length === 0 && $.push(""), $[0] = `${String($[0] ?? "")}${i}`, R(p, { cells: $ });
            break;
          }
          case "navbar":
          case "link_list": {
            const $ = Array.isArray(t.links) ? [...t.links] : [];
            $.length || $.push({ text: "", url: "" }), $[0] = { ...$[0], text: `${String(((F = $[0]) == null ? void 0 : F.text) ?? "")}${i}` }, R(p, { links: $ });
            break;
          }
          case "accordion": {
            const $ = Array.isArray(t.items) ? [...t.items] : [];
            $.length || $.push({ title: "", content: "" }), $[0] = { ...$[0], title: `${String(((r = $[0]) == null ? void 0 : r.title) ?? "")}${i}` }, R(p, { items: $ });
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
        b.value = null;
      }
    }
    function Z(p, i) {
      var t, F, r, $, V, we, Ze, tt, qe;
      if (i) {
        if (p === "subject")
          C("update", { subject: q(ee.value, i) });
        else if (p === "preview")
          C("update", { preview_text: q(de.value, i) });
        else if (p === "from-name")
          C("update", { from_name: q(A.message.from_name, i) });
        else if (p.startsWith("block:")) {
          le(p.slice(6), i);
          return;
        } else if (p.startsWith("col-left:")) {
          const ae = p.slice(9), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "columns" && R(ae, { leftContent: q(K.leftContent, i) });
        } else if (p.startsWith("col-right:")) {
          const ae = p.slice(10), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "columns" && R(ae, { rightContent: q(K.rightContent, i) });
        } else if (p.startsWith("row:")) {
          const [, ae, K] = p.split(":"), re = Number(K), fe = E.value.find((Ne) => Ne.id === ae);
          if ((fe == null ? void 0 : fe.type) === "row" && Number.isFinite(re)) {
            const Ne = [...fe.cells || []].map((Qt) => String(Qt ?? ""));
            Ne[re] = q(Ne[re], i), R(ae, { cells: Ne });
          }
        } else if (p.startsWith("button-text:")) {
          const ae = p.slice(12), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "button" && R(ae, { text: q(K.text, i) });
        } else if (p.startsWith("image-alt:")) {
          const ae = p.slice(10), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "image" && R(ae, { alt: q(K.alt, i) });
        } else if (p.startsWith("video-caption:")) {
          const ae = p.slice(14), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "video" && R(ae, { caption: q(K.caption, i) });
        } else if (p.startsWith("dynamic-alt:")) {
          const ae = p.slice(12), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "dynamic_image" && R(ae, { alt: q(K.alt, i) });
        } else if (p.startsWith("countdown-label:")) {
          const ae = p.slice(16), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "countdown" && R(ae, { label: q(K.label, i) });
        } else if (p.startsWith("product-title:")) {
          const ae = p.slice(14), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "product_card" && R(ae, { title: q(K.title, i) });
        } else if (p.startsWith("product-price:")) {
          const ae = p.slice(14), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "product_card" && R(ae, { price: q(K.price, i) });
        } else if (p.startsWith("product-button:")) {
          const ae = p.slice(15), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "product_card" && R(ae, { buttonText: q(K.buttonText, i) });
        } else if (p.startsWith("footer-address:")) {
          const ae = p.slice(15), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "footer" && R(ae, { companyAddress: q(K.companyAddress, i) });
        } else if (p.startsWith("code-caption:")) {
          const ae = p.slice(13), K = E.value.find((re) => re.id === ae);
          (K == null ? void 0 : K.type) === "code_block" && R(ae, { caption: q(K.caption, i) });
        } else if (p.startsWith("list-item:")) {
          const [, ae, K] = p.split(":"), re = Number(K), fe = E.value.find((Ne) => Ne.id === ae);
          (fe == null ? void 0 : fe.type) === "list" && Number.isFinite(re) && ve(ae, re, q((t = fe.items) == null ? void 0 : t[re], i));
        } else if (p.startsWith("link-list-item:")) {
          const [, ae, K] = p.split(":"), re = Number(K), fe = E.value.find((Ne) => Ne.id === ae);
          (fe == null ? void 0 : fe.type) === "link_list" && Number.isFinite(re) && Se(ae, re, "text", q((r = (F = fe.links) == null ? void 0 : F[re]) == null ? void 0 : r.text, i));
        } else if (p.startsWith("navbar-item:")) {
          const [, ae, K] = p.split(":"), re = Number(K), fe = E.value.find((Ne) => Ne.id === ae);
          (fe == null ? void 0 : fe.type) === "navbar" && Number.isFinite(re) && g(ae, re, "text", q((V = ($ = fe.links) == null ? void 0 : $[re]) == null ? void 0 : V.text, i));
        } else if (p.startsWith("accordion-title:")) {
          const [, ae, K] = p.split(":"), re = Number(K), fe = E.value.find((Ne) => Ne.id === ae);
          (fe == null ? void 0 : fe.type) === "accordion" && Number.isFinite(re) && Te(ae, re, "title", q((Ze = (we = fe.items) == null ? void 0 : we[re]) == null ? void 0 : Ze.title, i));
        } else if (p.startsWith("accordion-content:")) {
          const [, ae, K] = p.split(":"), re = Number(K), fe = E.value.find((Ne) => Ne.id === ae);
          (fe == null ? void 0 : fe.type) === "accordion" && Number.isFinite(re) && Te(ae, re, "content", q((qe = (tt = fe.items) == null ? void 0 : tt[re]) == null ? void 0 : qe.content, i));
        }
        b.value = null;
      }
    }
    function pe() {
      const p = Q.value.trim();
      !p || L.value.includes(p) || (L.value = [...L.value, p], T.value = p, Q.value = "");
    }
    return (p, i) => (a(), n("section", tc, [
      e("div", ac, [
        e("div", nc, [
          i[31] || (i[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          l.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: i[0] || (i[0] = (t) => p.$emit("reset"))
          }, " Reset section ")) : v("", !0)
        ]),
        i[38] || (i[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", sc, [
          i[32] || (i[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", oc, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: l.message.from_name ?? "",
              onInput: be
            }, null, 40, lc),
            e("div", ic, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[1] || (i[1] = (t) => P("from-name")),
                title: "Insert emoji"
              }, "😊"),
              b.value === "from-name" ? (a(), n("div", rc, [
                (a(), n(W, null, D(m, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (F) => Z("from-name", t)
                }, u(t), 9, dc)), 64))
              ])) : v("", !0)
            ])
          ])
        ]),
        e("div", uc, [
          i[33] || (i[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: l.message.from_address ?? "",
            onInput: ge
          }, null, 40, cc)
        ]),
        e("div", pc, [
          i[34] || (i[34] = e("label", { class: "em-label" }, [
            te("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: l.message.reply_to ?? "",
            onInput: X
          }, null, 40, mc)
        ]),
        e("div", vc, [
          i[35] || (i[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", bc, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: ee.value,
              onInput: G
            }, null, 40, hc),
            e("div", yc, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[2] || (i[2] = (t) => N("subject")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[3] || (i[3] = (t) => P("subject")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "subject" ? (a(), n("div", fc, [
                (a(!0), n(W, null, D(L.value, (t) => (a(), n("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (F) => S("subject", t)
                }, u(t), 9, gc))), 128))
              ])) : v("", !0),
              b.value === "subject" ? (a(), n("div", kc, [
                (a(), n(W, null, D(m, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (F) => Z("subject", t)
                }, u(t), 9, _c)), 64))
              ])) : v("", !0)
            ])
          ]),
          e("span", {
            class: me(["em-analyzer", `em-analyzer--${M.value}`])
          }, u(w(Zu)(M.value)), 3),
          H.value.length ? (a(), n("span", wc, "Spammy: " + u(H.value.join(", ")), 1)) : v("", !0)
        ]),
        e("div", $c, [
          i[36] || (i[36] = e("label", { class: "em-label" }, [
            te("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", xc, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: de.value,
              onInput: ce
            }, null, 40, Cc),
            e("div", Sc, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[4] || (i[4] = (t) => N("preview")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: i[5] || (i[5] = (t) => P("preview")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "preview" ? (a(), n("div", Ic, [
                (a(!0), n(W, null, D(L.value, (t) => (a(), n("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (F) => S("preview", t)
                }, u(t), 9, Ac))), 128))
              ])) : v("", !0),
              b.value === "preview" ? (a(), n("div", Tc, [
                (a(), n(W, null, D(m, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (F) => Z("preview", t)
                }, u(t), 9, Rc)), 64))
              ])) : v("", !0)
            ])
          ]),
          i[37] || (i[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: me(["em-analyzer", `em-analyzer--${j.value}`])
          }, u(w(ec)(j.value)), 3),
          Y.value.length ? (a(), n("span", Uc, "Spammy: " + u(Y.value.join(", ")), 1)) : v("", !0)
        ])
      ]),
      e("div", Bc, [
        i[39] || (i[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        i[40] || (i[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Lc, [
          (a(), n(W, null, D(h, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (F) => _(t)
          }, u(t.label), 9, Pc)), 64))
        ])
      ]),
      e("div", Ec, [
        i[67] || (i[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        i[68] || (i[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Oc, [
          (a(!0), n(W, null, D(E.value, (t, F) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Vc, [
              e("span", Mc, u(t.type), 1),
              e("div", Wc, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: F === 0,
                  onClick: (r) => oe(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Dc),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: F === E.value.length - 1,
                  onClick: (r) => oe(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, jc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => ue(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Hc)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", Fc, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { level: Number(r.target.value) })
              }, [...i[41] || (i[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, qc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, zc),
              e("div", Yc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`block:${t.id}`)
                }, u(Fe), 8, Kc),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Gc),
                o.value === `block:${t.id}` ? (a(), n("div", Jc, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `block-var-heading-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`block:${t.id}`, r)
                  }, u(r), 9, Xc))), 128))
                ])) : v("", !0),
                b.value === `emoji:block:${t.id}` ? (a(), n("div", Qc, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-heading-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`block:${t.id}`, r)
                  }, u(r), 9, Zc)), 64))
                ])) : v("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), n("div", ep, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, tp),
              e("div", ap, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`block:${t.id}`)
                }, u(Fe), 8, np),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, sp),
                o.value === `block:${t.id}` ? (a(), n("div", op, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `block-var-paragraph-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`block:${t.id}`, r)
                  }, u(r), 9, lp))), 128))
                ])) : v("", !0),
                b.value === `emoji:block:${t.id}` ? (a(), n("div", ip, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-paragraph-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`block:${t.id}`, r)
                  }, u(r), 9, rp)), 64))
                ])) : v("", !0)
              ])
            ])) : t.type === "image" ? (a(), n("div", dp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (r) => R(t.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, up),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => R(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, cp),
              e("div", pp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, mp),
                b.value === `image-alt:${t.id}` ? (a(), n("div", vp, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-image-alt-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`image-alt:${t.id}`, r)
                  }, u(r), 9, bp)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (r) => R(t.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, hp)
            ])) : t.type === "button" ? (a(), n("div", yp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (r) => R(t.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, fp),
              e("div", gp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, kp),
                b.value === `button-text:${t.id}` ? (a(), n("div", _p, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-button-text-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`button-text:${t.id}`, r)
                  }, u(r), 9, wp)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (r) => R(t.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, $p),
              e("div", xp, [
                i[42] || (i[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (r) => R(t.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, Cp)
              ]),
              e("label", Sp, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (r) => R(t.id, { ghost: r.target.checked })
                }, null, 40, Ip),
                i[43] || (i[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", Ap, [
              i[44] || (i[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (r) => R(t.id, { height: Number(r.target.value) || 24 })
              }, null, 40, Tp),
              i[45] || (i[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", Rp, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Up),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (r) => R(t.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Bp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (r) => R(t.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, Lp),
              e("div", Pp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ep),
                b.value === `footer-address:${t.id}` ? (a(), n("div", Op, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-footer-address-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`footer-address:${t.id}`, r)
                  }, u(r), 9, Np)), 64))
                ])) : v("", !0)
              ]),
              e("div", Vp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`block:${t.id}`)
                }, u(Fe), 8, Mp),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Wp),
                o.value === `block:${t.id}` ? (a(), n("div", Dp, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `block-var-footer-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`block:${t.id}`, r)
                  }, u(r), 9, jp))), 128))
                ])) : v("", !0),
                b.value === `emoji:block:${t.id}` ? (a(), n("div", Hp, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-footer-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`block:${t.id}`, r)
                  }, u(r), 9, Fp)), 64))
                ])) : v("", !0)
              ])
            ])) : t.type === "list" ? (a(), n("div", qp, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { style: r.target.value })
              }, [...i[46] || (i[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, zp),
              e("div", Yp, [
                (a(!0), n(W, null, D(t.items || [], (r, $) => (a(), n("div", {
                  key: $,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (V) => ve(t.id, $, V.target.value),
                    placeholder: `Item ${$ + 1}`
                  }, null, 40, Kp),
                  e("div", Gp, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (V) => P(`list-item:${t.id}:${$}`),
                      title: "Insert emoji"
                    }, "😊", 8, Jp),
                    b.value === `list-item:${t.id}:${$}` ? (a(), n("div", Xp, [
                      (a(), n(W, null, D(m, (V) => e("button", {
                        key: `emoji-list-item-${t.id}-${$}-${V}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (we) => Z(`list-item:${t.id}:${$}`, V)
                      }, u(V), 9, Qp)), 64))
                    ])) : v("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => Ae(t.id, $),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Zp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ke(t.id)
              }, "+ Add item", 8, em)
            ])) : t.type === "quote" ? (a(), n("div", tm, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { style: r.target.value })
              }, [...i[47] || (i[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, am),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, nm),
              e("div", sm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`block:${t.id}`)
                }, u(Fe), 8, om),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, lm),
                o.value === `block:${t.id}` ? (a(), n("div", im, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `block-var-quote-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`block:${t.id}`, r)
                  }, u(r), 9, rm))), 128))
                ])) : v("", !0),
                b.value === `emoji:block:${t.id}` ? (a(), n("div", dm, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-quote-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`block:${t.id}`, r)
                  }, u(r), 9, um)), 64))
                ])) : v("", !0)
              ])
            ])) : t.type === "social" ? (a(), n("div", cm, [
              e("div", pm, [
                (a(!0), n(W, null, D(t.links || [], (r, $) => (a(), n("div", {
                  key: $,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (V) => Ce(t.id, $, "platform", V.target.value)
                  }, [...i[48] || (i[48] = [
                    et('<option value="facebook" data-v-62cf50f4>Facebook</option><option value="twitter" data-v-62cf50f4>Twitter / X</option><option value="instagram" data-v-62cf50f4>Instagram</option><option value="linkedin" data-v-62cf50f4>LinkedIn</option><option value="youtube" data-v-62cf50f4>YouTube</option><option value="tiktok" data-v-62cf50f4>TikTok</option><option value="custom" data-v-62cf50f4>Custom</option>', 7)
                  ])], 40, mm),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (V) => Ce(t.id, $, "url", V.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, vm),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => Be(t.id, $),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, bm)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => _e(t.id)
              }, "+ Add link", 8, hm)
            ])) : t.type === "video" ? (a(), n("div", ym, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (r) => R(t.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, fm),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (r) => R(t.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, gm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => R(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, km),
              e("div", _m, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, wm),
                b.value === `video-caption:${t.id}` ? (a(), n("div", $m, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-video-caption-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`video-caption:${t.id}`, r)
                  }, u(r), 9, xm)), 64))
                ])) : v("", !0)
              ])
            ])) : t.type === "link_list" ? (a(), n("div", Cm, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => R(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Sm),
              e("div", Im, [
                (a(!0), n(W, null, D(t.links || [], (r, $) => (a(), n("div", {
                  key: $,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (V) => Se(t.id, $, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, Am),
                  e("div", Tm, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (V) => P(`link-list-item:${t.id}:${$}`),
                      title: "Insert emoji"
                    }, "😊", 8, Rm),
                    b.value === `link-list-item:${t.id}:${$}` ? (a(), n("div", Um, [
                      (a(), n(W, null, D(m, (V) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${$}-${V}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (we) => Z(`link-list-item:${t.id}:${$}`, V)
                      }, u(V), 9, Bm)), 64))
                    ])) : v("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (V) => Se(t.id, $, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, Lm),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => Ie(t.id, $),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Pm)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => $e(t.id)
              }, "+ Add link", 8, Em)
            ])) : t.type === "columns" ? (a(), n("div", Om, [
              i[49] || (i[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (r) => R(t.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Nm),
              e("div", Vm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`col-left:${t.id}`)
                }, u(Fe), 8, Mm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Wm),
                o.value === `col-left:${t.id}` ? (a(), n("div", Dm, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `col-left-var-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`col-left:${t.id}`, r)
                  }, u(r), 9, jm))), 128))
                ])) : v("", !0),
                b.value === `emoji:col-left:${t.id}` ? (a(), n("div", Hm, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-col-left-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`col-left:${t.id}`, r)
                  }, u(r), 9, Fm)), 64))
                ])) : v("", !0)
              ]),
              i[50] || (i[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (r) => R(t.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, qm),
              e("div", zm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`col-right:${t.id}`)
                }, u(Fe), 8, Ym),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Km),
                o.value === `col-right:${t.id}` ? (a(), n("div", Gm, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `col-right-var-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`col-right:${t.id}`, r)
                  }, u(r), 9, Jm))), 128))
                ])) : v("", !0),
                b.value === `emoji:col-right:${t.id}` ? (a(), n("div", Xm, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-col-right-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`col-right:${t.id}`, r)
                  }, u(r), 9, Qm)), 64))
                ])) : v("", !0)
              ])
            ])) : t.type === "divider" ? (a(), n("div", Zm, [
              e("div", ev, [
                i[51] || (i[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (r) => R(t.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, tv),
                i[52] || (i[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", av, [
                i[53] || (i[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (r) => R(t.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, nv)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => R(t.id, { lineStyle: r.target.value })
              }, [...i[54] || (i[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, sv)
            ])) : t.type === "row" ? (a(), n("div", ov, [
              i[56] || (i[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => B(t.id, { columnCount: Number(r.target.value) })
              }, [...i[55] || (i[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, lv),
              (a(!0), n(W, null, D(t.cells || [], (r, $) => (a(), n("div", {
                key: $,
                class: "em-row-cell"
              }, [
                e("label", iv, "Column " + u($ + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (V) => f(t.id, $, V.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, rv),
                e("div", dv, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (V) => N(`row:${t.id}:${$}`)
                  }, u(Fe), 8, uv),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (V) => P(`emoji:row:${t.id}:${$}`),
                    title: "Insert emoji"
                  }, "😊", 8, cv),
                  o.value === `row:${t.id}:${$}` ? (a(), n("div", pv, [
                    (a(!0), n(W, null, D(L.value, (V) => (a(), n("button", {
                      key: `row-var-${t.id}-${$}-${V}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (we) => S(`row:${t.id}:${$}`, V)
                    }, u(V), 9, mv))), 128))
                  ])) : v("", !0),
                  b.value === `emoji:row:${t.id}:${$}` ? (a(), n("div", vv, [
                    (a(), n(W, null, D(m, (V) => e("button", {
                      key: `emoji-row-${t.id}-${$}-${V}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (we) => Z(`row:${t.id}:${$}`, V)
                    }, u(V), 9, bv)), 64))
                  ])) : v("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", hv, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => R(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, yv),
              e("div", fv, [
                (a(!0), n(W, null, D(t.links || [], (r, $) => (a(), n("div", {
                  key: $,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (V) => g(t.id, $, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, gv),
                  e("div", kv, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (V) => P(`navbar-item:${t.id}:${$}`),
                      title: "Insert emoji"
                    }, "😊", 8, _v),
                    b.value === `navbar-item:${t.id}:${$}` ? (a(), n("div", wv, [
                      (a(), n(W, null, D(m, (V) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${$}-${V}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (we) => Z(`navbar-item:${t.id}:${$}`, V)
                      }, u(V), 9, $v)), 64))
                    ])) : v("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (V) => g(t.id, $, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, xv),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => ne(t.id, $),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Cv)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => J(t.id)
              }, "+ Add link", 8, Sv)
            ])) : t.type === "accordion" ? (a(), n("div", Iv, [
              (a(!0), n(W, null, D(t.items || [], (r, $) => (a(), n("div", {
                key: $,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (V) => Te(t.id, $, "title", V.target.value),
                  placeholder: "Section title"
                }, null, 40, Av),
                e("div", Tv, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (V) => P(`accordion-title:${t.id}:${$}`),
                    title: "Insert emoji"
                  }, "😊", 8, Rv),
                  b.value === `accordion-title:${t.id}:${$}` ? (a(), n("div", Uv, [
                    (a(), n(W, null, D(m, (V) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${$}-${V}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (we) => Z(`accordion-title:${t.id}:${$}`, V)
                    }, u(V), 9, Bv)), 64))
                  ])) : v("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (V) => Te(t.id, $, "content", V.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Lv),
                e("div", Pv, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (V) => P(`accordion-content:${t.id}:${$}`),
                    title: "Insert emoji"
                  }, "😊", 8, Ev),
                  b.value === `accordion-content:${t.id}:${$}` ? (a(), n("div", Ov, [
                    (a(), n(W, null, D(m, (V) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${$}-${V}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (we) => Z(`accordion-content:${t.id}:${$}`, V)
                    }, u(V), 9, Nv)), 64))
                  ])) : v("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => Ye(t.id, $),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Vv)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Oe(t.id)
              }, "+ Add section", 8, Mv)
            ])) : t.type === "carousel" ? (a(), n("div", Wv, [
              (a(!0), n(W, null, D(t.slides || [], (r, $) => (a(), n("div", {
                key: $,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (V) => Ve(t.id, $, "imageUrl", V.target.value),
                  placeholder: "Image URL"
                }, null, 40, Dv),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (V) => Ve(t.id, $, "alt", V.target.value),
                  placeholder: "Alt text"
                }, null, 40, jv),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (V) => Ve(t.id, $, "linkUrl", V.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Hv),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => je(t.id, $),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Fv)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => De(t.id)
              }, "+ Add slide", 8, qv)
            ])) : t.type === "countdown" ? (a(), n("div", zv, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (r) => R(t.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Yv),
              e("div", Kv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Gv),
                b.value === `countdown-label:${t.id}` ? (a(), n("div", Jv, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`countdown-label:${t.id}`, r)
                  }, u(r), 9, Xv)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (r) => R(t.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Qv),
              i[57] || (i[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", Zv, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => R(t.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, eb),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (r) => R(t.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, tb),
              e("div", ab, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, nb),
                b.value === `product-title:${t.id}` ? (a(), n("div", sb, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-product-title-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`product-title:${t.id}`, r)
                  }, u(r), 9, ob)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (r) => R(t.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, lb),
              e("div", ib, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, rb),
                b.value === `product-price:${t.id}` ? (a(), n("div", db, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-product-price-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`product-price:${t.id}`, r)
                  }, u(r), 9, ub)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (r) => R(t.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, cb),
              e("div", pb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, mb),
                b.value === `product-button:${t.id}` ? (a(), n("div", vb, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-product-button-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`product-button:${t.id}`, r)
                  }, u(r), 9, bb)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (r) => R(t.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, hb)
            ])) : t.type === "liquid" ? (a(), n("div", yb, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, fb),
              e("div", gb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`block:${t.id}`)
                }, u(Fe), 8, kb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, _b),
                o.value === `block:${t.id}` ? (a(), n("div", wb, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `block-var-liquid-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`block:${t.id}`, r)
                  }, u(r), 9, $b))), 128))
                ])) : v("", !0),
                b.value === `emoji:block:${t.id}` ? (a(), n("div", xb, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-liquid-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`block:${t.id}`, r)
                  }, u(r), 9, Cb)), 64))
                ])) : v("", !0)
              ]),
              i[58] || (i[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", Sb, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => R(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Ib),
              e("div", Ab, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Tb),
                b.value === `code-caption:${t.id}` ? (a(), n("div", Rb, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-code-caption-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`code-caption:${t.id}`, r)
                  }, u(r), 9, Ub)), 64))
                ])) : v("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => R(t.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Bb),
              e("div", Lb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => N(`block:${t.id}`)
                }, u(Fe), 8, Pb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Eb),
                o.value === `block:${t.id}` ? (a(), n("div", Ob, [
                  (a(!0), n(W, null, D(L.value, (r) => (a(), n("button", {
                    key: `block-var-code-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: ($) => S(`block:${t.id}`, r)
                  }, u(r), 9, Nb))), 128))
                ])) : v("", !0),
                b.value === `emoji:block:${t.id}` ? (a(), n("div", Vb, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-code-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`block:${t.id}`, r)
                  }, u(r), 9, Mb)), 64))
                ])) : v("", !0)
              ]),
              i[59] || (i[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", Wb, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (r) => R(t.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Db),
              e("div", jb, [
                i[60] || (i[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (r) => R(t.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, Hb)
              ]),
              i[61] || (i[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", Fb, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => R(t.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, qb),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => R(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, zb),
              e("div", Yb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => P(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Kb),
                b.value === `dynamic-alt:${t.id}` ? (a(), n("div", Gb, [
                  (a(), n(W, null, D(m, (r) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: ($) => Z(`dynamic-alt:${t.id}`, r)
                  }, u(r), 9, Jb)), 64))
                ])) : v("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (r) => R(t.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Xb)
            ])) : v("", !0),
            x.includes(t.type) ? (a(), n("div", Qb, [
              e("div", Zb, [
                e("button", {
                  type: "button",
                  class: me(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (r) => R(t.id, { alignment: "left" })
                }, [...i[62] || (i[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, eh),
                e("button", {
                  type: "button",
                  class: me(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (r) => R(t.id, { alignment: "center" })
                }, [...i[63] || (i[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, th),
                e("button", {
                  type: "button",
                  class: me(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (r) => R(t.id, { alignment: "right" })
                }, [...i[64] || (i[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, ah)
              ]),
              e("label", nh, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (r) => R(t.id, { fullWidth: r.target.checked })
                }, null, 40, sh),
                i[65] || (i[65] = e("span", null, "Full width", -1))
              ])
            ])) : v("", !0)
          ], 8, Nc))), 128))
        ]),
        e("div", oh, [
          i[66] || (i[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", lh, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[6] || (i[6] = (t) => O("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[7] || (i[7] = (t) => O("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[8] || (i[8] = (t) => O("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[9] || (i[9] = (t) => O("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[10] || (i[10] = (t) => O("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[11] || (i[11] = (t) => O("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[12] || (i[12] = (t) => O("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[13] || (i[13] = (t) => O("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[14] || (i[14] = (t) => O("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[15] || (i[15] = (t) => O("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[16] || (i[16] = (t) => O("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[17] || (i[17] = (t) => O("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[18] || (i[18] = (t) => O("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[19] || (i[19] = (t) => O("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[20] || (i[20] = (t) => O("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[21] || (i[21] = (t) => O("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[22] || (i[22] = (t) => O("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[23] || (i[23] = (t) => O("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[24] || (i[24] = (t) => O("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[25] || (i[25] = (t) => O("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[26] || (i[26] = (t) => O("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[27] || (i[27] = (t) => O("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: i[28] || (i[28] = (t) => O("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", ih, [
        i[71] || (i[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        i[72] || (i[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", rh, [
          i[69] || (i[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", dh, [
            We(e("select", {
              "onUpdate:modelValue": i[29] || (i[29] = (t) => T.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(W, null, D(L.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, u(t), 9, uh))), 128))
            ], 512), [
              [ze, T.value]
            ])
          ])
        ]),
        e("div", ch, [
          i[70] || (i[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", ph, [
            We(e("input", {
              "onUpdate:modelValue": i[30] || (i[30] = (t) => Q.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [ht, Q.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: pe
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), vh = /* @__PURE__ */ Le(mh, [["__scopeId", "data-v-62cf50f4"]]), bh = { class: "keos-email-builder" }, hh = { class: "kb-builder-top" }, yh = { class: "kb-email-layout" }, fh = { class: "kb-email-sidebar" }, gh = {
  key: 0,
  class: "kb-email-form"
}, kh = { class: "kb-email-form-head" }, _h = { class: "kb-email-form-head-top" }, wh = { class: "kb-email-health-pill" }, $h = { class: "kb-wa-form-head-row" }, xh = ["value"], Ch = { class: "kb-email-health" }, Sh = { class: "kb-email-health-row" }, Ih = { class: "kb-email-health-value" }, Ah = { class: "kb-email-health-bar" }, Th = { class: "kb-email-canvas" }, Rh = {
  key: 0,
  class: "kb-email-test-banner"
}, Uh = { class: "kb-email-preview-chrome" }, Bh = { class: "kb-push-preview-controls" }, Lh = { class: "kb-push-preview-as" }, Ph = ["value"], Eh = { class: "kb-preview-status" }, Oh = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Nh = { class: "kb-email-inbox-strip" }, Vh = { class: "kb-email-inbox-from" }, Mh = { class: "kb-email-inbox-from-name" }, Wh = { class: "kb-email-inbox-from-addr" }, Dh = { class: "kb-email-inbox-subject" }, jh = ["title"], Hh = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Fh = { class: "kb-email-body-canvas" }, qh = ["innerHTML"], zh = { class: "kb-email-actions" }, Yh = {
  key: 0,
  class: "kb-actions-note"
}, Kh = { key: 0 }, Gh = { class: "kb-email-actions-right" }, Jh = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Xh = { class: "kb-confirm-dialog" }, Qh = { class: "kb-confirm-actions" }, Zh = /* @__PURE__ */ Ue({
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
  setup(l, { emit: d }) {
    function c(s) {
      if (!Array.isArray(s) || s.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const o = (S) => String(S).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), b = [
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
      ], m = (S, P) => {
        if (!b.includes(P.type)) return S;
        const q = P.alignment || "left", le = !!P.fullWidth;
        return `<div style="text-align:${q};${le ? "width:100%;" : ""}">${S}</div>`;
      }, N = [];
      for (const S of s)
        switch (S.type) {
          case "heading": {
            const P = Math.min(3, Math.max(1, Number(S.level) || 1)), q = o(S.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            N.push(
              m(
                `<h${P} style="margin:0 0 12px;font-size:${P === 1 ? "22" : P === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${q || "Heading"}</h${P}>`,
                S
              )
            );
            break;
          }
          case "paragraph": {
            const P = o(S.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            N.push(
              m(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${P || "Paragraph"}</p>`,
                S
              )
            );
            break;
          }
          case "image": {
            const P = (S.src || "").trim(), q = o(S.alt || ""), le = (S.linkUrl || "").trim(), pe = !!S.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", Re = P ? `<img src="${o(P)}" alt="${q}" style="${pe}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            N.push(
              m(
                `<div style="margin:0 0 12px;">${le ? `<a href="${o(le)}" style="color:#2563eb;">${Re}</a>` : Re}</div>`,
                S
              )
            );
            break;
          }
          case "button": {
            const P = o(S.text || "Button"), q = (S.url || "#").trim(), le = Math.min(24, Math.max(0, Number(S.borderRadius) ?? 8)), Z = !!S.fullWidth, pe = !!S.ghost, Re = pe ? "transparent" : "#0f172a", p = pe ? "#0f172a" : "#fff", i = pe ? "2px solid #0f172a" : "none", t = Z ? "block" : "inline-block", F = Z ? "100%" : "auto";
            N.push(
              m(
                `<p style="margin:0 0 12px;"><a href="${o(q)}" style="display:${t};width:${F};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${Re};color:${p};border:${i};text-decoration:none;font-size:14px;font-weight:600;border-radius:${le}px;overflow-wrap:anywhere;">${P}</a></p>`,
                S
              )
            );
            break;
          }
          case "divider": {
            const P = Math.min(8, Math.max(1, Number(S.thickness) || 1)), q = (S.color || "#e2e8f0").trim() || "#e2e8f0", le = S.lineStyle || "solid";
            N.push(
              m(
                `<hr style="margin:16px 0;border:0;border-top:${P}px ${le} ${q};" />`,
                S
              )
            );
            break;
          }
          case "spacer": {
            const P = Math.min(120, Math.max(8, Number(S.height) || 24));
            N.push(m(`<div style="height:${P}px;"></div>`, S));
            break;
          }
          case "footer": {
            const P = o(S.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), q = (S.unsubscribeUrl || "").trim(), le = o(S.companyAddress || "");
            N.push(
              m(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${P || "Footer"}` + (q ? `<p style="margin:8px 0 0;"><a href="${o(q)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (le ? `<p style="margin:4px 0 0;">${le}</p>` : "") + "</div>",
                S
              )
            );
            break;
          }
          case "list": {
            const P = S.style === "numbered" ? "ol" : "ul", le = (Array.isArray(S.items) ? S.items : []).map(
              (Z) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${o(String(Z)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            N.push(
              m(
                `<${P} style="margin:0 0 12px;padding-left:24px;">${le || "<li>Item</li>"}</${P}>`,
                S
              )
            );
            break;
          }
          case "quote": {
            const P = o(S.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), q = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, le = q[S.style || "default"] || q.default;
            N.push(
              m(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${le}font-size:14px;line-height:1.6;">${P || "Quote"}</div>`,
                S
              )
            );
            break;
          }
          case "social": {
            const q = (Array.isArray(S.links) ? S.links : []).filter((le) => (le.url || "").trim());
            if (q.length === 0)
              N.push(
                m(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  S
                )
              );
            else {
              const le = (Z) => `<a href="${o((Z.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${o(Z.platform || "Link")}</a>`;
              N.push(
                m(
                  `<div style="margin:0 0 12px;">${q.map(le).join("")}</div>`,
                  S
                )
              );
            }
            break;
          }
          case "video": {
            const P = (S.thumbnailUrl || "").trim(), q = (S.videoUrl || "#").trim(), le = o(S.caption || ""), pe = !!S.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", Re = P ? `<img src="${o(P)}" alt="Video" style="${pe}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            N.push(
              m(
                `<div style="margin:0 0 12px;"><a href="${o(q)}" style="display:block;color:inherit;">${Re}</a>` + (le ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${le}</p>` : "") + "</div>",
                S
              )
            );
            break;
          }
          case "link_list": {
            const P = Array.isArray(S.links) ? S.links : [], q = o(S.separator || " | "), Z = P.filter(
              (pe) => (pe.text || pe.url) && (pe.url || "").trim()
            ).map(
              (pe) => `<a href="${o((pe.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(pe.text || "Link")}</a>`
            );
            N.push(
              m(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${Z.join(q)}</p>`,
                S
              )
            );
            break;
          }
          case "columns": {
            const P = o(S.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), q = o(S.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            N.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${P || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${q || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const P = Math.min(4, Math.max(1, Number(S.columnCount) || 2)), q = Array.isArray(S.cells) ? S.cells.slice(0, P) : [], le = 100 / P, Z = Array.from({ length: P }, (pe, Re) => {
              const p = q[Re] ?? "", i = o(p).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${le}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${i || "—"}</td>`;
            }).join("");
            N.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${Z}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const P = Array.isArray(S.links) ? S.links : [], q = o(S.separator || " | "), Z = P.filter(
              (pe) => (pe.text || pe.url) && (pe.url || "").trim()
            ).map(
              (pe) => `<a href="${o((pe.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(pe.text || "Link")}</a>`
            );
            N.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${Z.length ? Z.join(q) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const q = (Array.isArray(S.items) ? S.items : []).map((le) => {
              const Z = o(le.title || "Section"), pe = o(le.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${Z}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${pe}</div></details>`;
            }).join("");
            N.push(
              q ? `<div style="margin:0 0 12px;">${q}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const q = (Array.isArray(S.slides) ? S.slides : []).filter(
              (le) => (le.imageUrl || "").trim()
            );
            if (q.length === 0)
              N.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const le = q[0], Z = `<img src="${o(le.imageUrl)}" alt="${o(le.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, pe = (le.linkUrl || "").trim();
              N.push(
                `<div style="margin:0 0 12px;">${pe ? `<a href="${o(pe)}">${Z}</a>` : Z}` + (q.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${q.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const P = o(S.label || "Offer ends in"), q = S.endDateTime ? new Date(S.endDateTime).toLocaleString() : "—";
            N.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${P}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${q}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const P = (S.imageUrl || "").trim(), q = o(S.title || "Product"), le = o(S.price || ""), Z = o(S.buttonText || "Buy now"), pe = (S.buttonUrl || "#").trim(), Re = P ? `<img src="${o(P)}" alt="${o(S.alt || q)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            N.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Re}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${q}</p>` + (le ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${le}</p>` : "") + `<a href="${o(pe)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${Z}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const P = o((S.content || "").trim());
            N.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${P || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const P = (S.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), q = o((S.caption || "").trim());
            N.push(
              '<div style="margin:0 0 12px;">' + (q ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${q}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${P || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const P = (S.feedUrl || "").trim(), q = Math.min(20, Math.max(1, Number(S.maxItems) ?? 5));
            N.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (P ? `<p style="margin:0;font-size:12px;color:#64748b;">${o(P)} · max ${q} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const P = (S.imageUrl || "").trim(), q = (S.fallbackUrl || "").trim(), le = o(S.alt || "Dynamic image");
            P ? N.push(
              `<div style="margin:0 0 12px;"><img src="${o(P)}" alt="${le}" style="max-width:100%;height:auto;display:block;border:0;" />` + (q ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${o(q)}</p>` : "") + "</div>"
            ) : N.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return N.join("");
    }
    function y(s) {
      return /<\s*html[\s>]/i.test(s) || /<!doctype\s+html/i.test(s);
    }
    function x(s) {
      const o = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return o ? o[1] : s;
    }
    function I(s, o, b) {
      const m = (o || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), N = (b || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${m}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        N ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${N}</div>` : "",
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
    const A = l, C = d, {
      campaign: U,
      dirty: L,
      customValidatorErrors: T,
      getValidationWithWarnings: Q,
      update: ee,
      updateMessage: de,
      undo: M,
      redo: j,
      canUndo: H,
      canRedo: Y,
      resetMessage: E,
      hooks: z
    } = rt({
      initial: A.modelValue,
      hooks: {
        ...A.hooks,
        customValidators: async (s) => {
          var N, S, P;
          const o = [];
          (N = s.name) != null && N.trim() || o.push("Template name is required");
          const b = s.message;
          (S = b == null ? void 0 : b.subject) != null && S.trim() || o.push("Subject is required");
          const m = (P = A.hooks) != null && P.customValidators ? await A.hooks.customValidators(s) : [];
          return [...o, ...m];
        }
      },
      onDirty: () => C("change", U.value)
    }), { lastSavedAt: G } = dt(U, { channel: "email" });
    function ce(s) {
      (s.metaKey || s.ctrlKey) && s.key === "z" && (s.preventDefault(), s.shiftKey ? j() : M());
    }
    nt(() => {
      window.addEventListener("keydown", ce);
    }), st(() => {
      window.removeEventListener("keydown", ce);
    }), Pe(
      U,
      (s) => C("update:modelValue", {
        ...s,
        message: {
          ...s.message,
          html: Ve.value
        }
      }),
      { deep: !0 }
    );
    const be = ie(), ge = ie(!0);
    async function X() {
      if (z.estimateReach)
        try {
          be.value = await z.estimateReach(U.value.audience);
        } catch {
          be.value = void 0;
        }
      z.canSend && (ge.value = await Promise.resolve(z.canSend()));
    }
    X(), Pe(() => U.value.audience, X, { deep: !0 });
    const h = k(() => (T.value, Q(be.value))), _ = k(() => h.value.blockingErrors), O = k(() => h.value.warnings), ue = k(() => h.value.valid), oe = k(() => {
      var m, N, S;
      const s = U.value.message, o = [
        !!((m = U.value.name) != null && m.trim()),
        !!((N = s.subject) != null && N.trim()),
        !!((S = s.from_address) != null && S.trim()),
        !!(Array.isArray(s.blocks) ? s.blocks.length : (s.html ?? "").trim().length),
        !!U.value.template_type
      ], b = o.filter(Boolean).length;
      return Math.round(b / o.length * 100);
    }), R = k(() => oe.value >= 90 ? "Production ready" : oe.value >= 70 ? "Strong draft" : oe.value >= 40 ? "In progress" : "Needs setup"), ve = k(
      () => U.value.template_type ?? "transactional"
    ), ke = ie(""), Ae = ie(!1), Ce = ie(null), _e = k(() => {
      const s = ke.value;
      return s ? Qe.find((o) => o.id === s) ?? null : null;
    });
    function Be(s) {
      const o = U.value, b = s.campaign.message ? { ...o.message, ...s.campaign.message } : o.message;
      ee({
        ...s.campaign,
        message: b
      }), Ce.value = null, Ae.value = !1;
    }
    function Se(s) {
      const o = s.target.value;
      if (!o) return;
      const b = Rt.find((m) => m.id === o);
      b && (L.value ? (Ce.value = b, Ae.value = !0) : Be(b), s.target.value = "");
    }
    function $e(s) {
      ee({ template_type: s });
    }
    function Ie(s) {
      ee({
        name: s,
        tracking: { ...U.value.tracking ?? {}, campaign_name: s }
      });
    }
    const B = k(
      () => U.value.message.subject ?? ""
    ), f = k(
      () => U.value.message.preview_text ?? ""
    ), g = k(
      () => U.value.message.html ?? ""
    ), J = k(
      () => U.value.message.from_name ?? "Your App"
    ), ne = k(
      () => U.value.message.from_address ?? "notifications@example.com"
    ), Te = k(
      () => U.value.message.blocks ?? []
    ), Oe = k(() => {
      const s = U.value.message, o = (s.html ?? "").trim(), m = (Array.isArray(s.blocks) ? s.blocks : []).some((N) => {
        if (!N || typeof N != "object") return !1;
        const S = (N.type ?? "").toString();
        if (S === "paragraph" || S === "heading" || S === "quote" || S === "footer") {
          const P = (N.content ?? "").toString().trim();
          return !(!P || P === "Heading" || P.startsWith("Your text here."));
        }
        return S === "image" || S === "video" || S === "dynamic_image" ? !!(N.src ?? N.imageUrl ?? N.thumbnailUrl ?? "").toString().trim() : S === "button" ? !!(N.text ?? "").toString().trim() : !0;
      });
      return !!((s.subject ?? "").toString().trim() || (s.preview_text ?? "").toString().trim() || o || m);
    }), Ye = k(() => {
      const s = Te.value;
      if (Array.isArray(s) && s.length > 0)
        return c(s);
      const o = g.value;
      return o && o.trim() ? y(o) ? x(o) : o : c([]);
    }), Ve = k(() => {
      const s = Te.value;
      if (Array.isArray(s) && s.length > 0)
        return I(
          c(s),
          B.value,
          f.value
        );
      const o = g.value;
      return o && o.trim() ? y(o) ? o : I(o, B.value, f.value) : I(
        c([]),
        B.value,
        f.value
      );
    }), De = k(() => {
      const s = B.value;
      return _e.value ? Ge(s, _e.value.data) : s;
    }), je = k(() => {
      const s = f.value;
      return _e.value ? Ge(s, _e.value.data) : s;
    }), He = k(() => {
      const s = Ye.value;
      return _e.value ? Ge(s, _e.value.data) : s;
    }), Me = ie("desktop");
    function se() {
      ue.value && C("save", {
        ...U.value,
        message: {
          ...U.value.message,
          html: Ve.value
        }
      });
    }
    return (s, o) => {
      var b;
      return a(), n("div", bh, [
        e("div", hh, [
          Ee(ut, {
            "campaign-name": w(U).name,
            status: w(U).status,
            dirty: w(L),
            "last-saved-at": w(G),
            "can-undo": w(H),
            "can-redo": w(Y),
            "slugify-name": A.enforceSlugName,
            "onUpdate:campaignName": Ie,
            onUndo: w(M),
            onRedo: w(j)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          _.value.length > 0 ? (a(), n("div", {
            key: 0,
            class: "kb-errors",
            style: ye({
              background: w(xe).dangerBg,
              border: `1px solid ${w(xe).dangerBorder}`,
              borderRadius: `${w(Je).input}px`,
              padding: `${w(he)[16]}px ${w(he)[24]}px`,
              marginBottom: `${w(he)[24]}px`
            })
          }, [
            e("ul", {
              style: ye({ margin: 0, paddingLeft: "1.25rem", color: w(xe).danger })
            }, [
              (a(!0), n(W, null, D(_.value, (m) => (a(), n("li", {
                key: m.message
              }, u(m.message), 1))), 128))
            ], 4)
          ], 4)) : v("", !0)
        ]),
        e("div", yh, [
          e("aside", fh, [
            l.disabledSections.includes("email") ? v("", !0) : (a(), n("div", gh, [
              e("div", kh, [
                e("div", _h, [
                  o[8] || (o[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", wh, u(R.value), 1)
                ]),
                e("div", $h, [
                  Ee(_t, {
                    "template-type": ve.value,
                    onUpdate: $e
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: Se
                  }, [
                    o[9] || (o[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), n(W, null, D(w(Rt), (m) => (a(), n("option", {
                      key: m.id,
                      value: m.id
                    }, u(m.label), 9, xh))), 128))
                  ], 32)
                ]),
                e("div", Ch, [
                  e("div", Sh, [
                    o[10] || (o[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", Ih, u(oe.value) + "%", 1)
                  ]),
                  e("div", Ah, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: ye({ width: `${oe.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ee(vh, {
                message: w(U).message,
                "variable-options": l.variableOptions,
                "show-reset": !0,
                onUpdate: w(de),
                onReset: o[0] || (o[0] = (m) => w(E)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Th, [
            !l.designOnly && w(U).audience.test_mode ? (a(), n("div", Rh, [...o[11] || (o[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              te(" Test mode — only your test segment will receive this. ", -1)
            ])])) : v("", !0),
            e("div", Uh, [
              e("div", Bh, [
                e("label", Lh, [
                  o[13] || (o[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  We(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (m) => ke.value = m),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[12] || (o[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), n(W, null, D(w(Qe), (m) => (a(), n("option", {
                      key: m.id,
                      value: m.id
                    }, u(m.label), 9, Ph))), 128))
                  ], 512), [
                    [ze, ke.value]
                  ])
                ]),
                e("div", Eh, [
                  o[14] || (o[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, u(Me.value), 1)
                ])
              ]),
              e("div", Oh, [
                e("button", {
                  type: "button",
                  class: me(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Me.value === "desktop"
                  }]),
                  onClick: o[2] || (o[2] = (m) => Me.value = "desktop")
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
                  te(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: me(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Me.value === "mobile"
                  }]),
                  onClick: o[3] || (o[3] = (m) => Me.value = "mobile")
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
                  te(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: me(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Me.value === "mobile",
                  "kb-email-preview-frame--empty": !Oe.value
                }])
              }, [
                e("div", Nh, [
                  e("div", Vh, [
                    e("span", Mh, u(J.value), 1),
                    e("span", Wh, "<" + u(ne.value) + ">", 1)
                  ]),
                  e("div", Dh, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: De.value || "No subject"
                    }, u(De.value || "No subject"), 9, jh),
                    je.value ? (a(), n("span", Hh, " — " + u(je.value), 1)) : v("", !0)
                  ])
                ]),
                e("div", Fh, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: He.value
                  }, null, 8, qh)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", zh, [
          O.value.length > 0 ? (a(), n("div", Yh, [
            o[17] || (o[17] = e("strong", null, "Warning:", -1)),
            te(" " + u((b = O.value[0]) == null ? void 0 : b.message) + " ", 1),
            O.value.length > 1 ? (a(), n("span", Kh, " (+" + u(O.value.length - 1) + " more) ", 1)) : v("", !0)
          ])) : v("", !0),
          e("div", Gh, [
            l.showDuplicate ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: o[4] || (o[4] = (m) => C("duplicate", JSON.parse(JSON.stringify(w(U)))))
            }, " Duplicate ")) : v("", !0),
            l.showSave ? (a(), n("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: se
            }, " Save ")) : v("", !0),
            l.showClose ? (a(), n("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: o[5] || (o[5] = (m) => C("edit"))
            }, " Close ")) : v("", !0)
          ])
        ]),
        Ae.value ? (a(), n("div", Jh, [
          e("div", Xh, [
            o[18] || (o[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[19] || (o[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Qh, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: o[6] || (o[6] = (m) => {
                  Ae.value = !1, Ce.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: o[7] || (o[7] = (m) => Ce.value && Be(Ce.value))
              }, " Replace ")
            ])
          ])
        ])) : v("", !0)
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Le(Zh, [["__scopeId", "data-v-f45fc2a3"]]), ey = { class: "kb-shell" }, ty = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, ay = ["aria-selected", "onClick"], ny = { class: "kb-shell__meta" }, sy = ["href"], oy = { class: "kb-shell__body" }, ly = /* @__PURE__ */ Ue({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(l, { emit: d }) {
    const c = d, y = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (x, I) => (a(), n("div", ey, [
      e("header", {
        class: "kb-shell__header",
        style: ye({ padding: `${w(he)[12]}px ${w(he)[24]}px`, borderBottom: `1px solid ${w(xe).neutral.border}`, background: w(xe).neutral.bg })
      }, [
        I[0] || (I[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", ty, [
          (a(), n(W, null, D(y, (A) => e("button", {
            key: A.id,
            type: "button",
            class: me(["kb-shell__channel", { "kb-shell__channel--active": l.channel === A.id }]),
            role: "tab",
            "aria-selected": l.channel === A.id,
            onClick: (C) => c("switch-channel", A.id)
          }, u(A.label), 11, ay)), 64))
        ]),
        e("div", ny, [
          l.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: ye({ padding: "2px 8px", borderRadius: `${w(Je).input}px`, fontSize: "0.75rem", background: w(xe).neutral.bg, color: w(xe).neutral.textMuted })
          }, u(l.environment), 5)) : v("", !0),
          l.helpUrl ? (a(), n("a", {
            key: 1,
            href: l.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ye({ color: w(xe).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, sy)) : v("", !0)
        ])
      ], 4),
      e("div", oy, [
        Ke(x.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), iy = /* @__PURE__ */ Le(ly, [["__scopeId", "data-v-0df30803"]]), ry = {
  class: "kb-outline",
  "aria-label": "Sections"
}, dy = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, uy = ["onClick"], cy = /* @__PURE__ */ Ue({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(l) {
    var I;
    const d = l, c = ie(((I = d.items[0]) == null ? void 0 : I.id) ?? "");
    let y = null;
    function x(A) {
      const C = document.getElementById(A);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return nt(() => {
      const A = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      A && (y = new IntersectionObserver(
        (C) => {
          for (const U of C)
            if (U.isIntersecting) {
              const L = U.target.getAttribute("data-outline-id");
              L && (c.value = L);
            }
        },
        { root: A === document ? null : A, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((C) => {
        const U = document.getElementById(C.id);
        U && (y == null || y.observe(U));
      }));
    }), st(() => {
      y == null || y.disconnect();
    }), Pe(
      () => d.items,
      (A) => {
        A.length && !c.value && (c.value = A[0].id);
      },
      { immediate: !0 }
    ), (A, C) => (a(), n("nav", ry, [
      e("ul", dy, [
        (a(!0), n(W, null, D(l.items, (U) => (a(), n("li", {
          key: U.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: me(["kb-outline__btn", { "kb-outline__btn--active": c.value === U.id }]),
            style: ye({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${w(he)[8]}px ${w(he)[12]}px`,
              border: "none",
              borderRadius: `${w(Je).input}px`,
              background: c.value === U.id ? w(xe).neutral.bg : "transparent",
              color: c.value === U.id ? "#0f172a" : w(xe).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: c.value === U.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (L) => x(U.id)
          }, u(U.label), 15, uy)
        ]))), 128))
      ])
    ]));
  }
}), py = /* @__PURE__ */ Le(cy, [["__scopeId", "data-v-25c37675"]]), my = ["id"], vy = {
  key: 1,
  class: "kb-form-shell__head"
}, by = /* @__PURE__ */ Ue({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(l) {
    return (d, c) => (a(), n("div", {
      class: "kb-form-shell",
      id: l.sectionId ?? void 0,
      style: ye({
        padding: `${w(he)[24]}px ${w(he)[24]}px ${w(he)[32]}px`,
        marginBottom: 0
      })
    }, [
      l.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ye({ marginBottom: w(he)[24], paddingBottom: w(he)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ye({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: w(he)[12] })
        }, u(l.label), 5),
        Ke(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", vy, [
        Ke(d.$slots, "head", {}, void 0, !0)
      ])),
      Ke(d.$slots, "default", {}, void 0, !0)
    ], 12, my));
  }
}), hy = /* @__PURE__ */ Le(by, [["__scopeId", "data-v-6504df41"]]), yy = /* @__PURE__ */ Ue({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(l) {
    return (d, c) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ye({
        display: "flex",
        justifyContent: l.align === "start" ? "flex-start" : l.align === "between" ? "space-between" : "flex-end",
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
}), fy = /* @__PURE__ */ Ue({
  __name: "BuilderTopShell",
  setup(l) {
    return (d, c) => (a(), n("div", {
      class: "kb-top-shell",
      style: ye({
        marginLeft: w(he)[24],
        marginRight: w(he)[24]
      })
    }, [
      Ke(d.$slots, "header"),
      Ke(d.$slots, "errors"),
      Ke(d.$slots, "warnings"),
      Ke(d.$slots, "default")
    ], 4));
  }
});
function gy(l) {
  l.component("KeosNotificationBuilder", Kt), l.component("KeosWhatsAppBuilder", Gt), l.component("KeosSmsBuilder", Jt), l.component("KeosEmailBuilder", Xt), l.component("BuilderShell", iy), l.component("BuilderOutline", py), l.component("BuilderVersionHistoryModal", Yt), l.component("BuilderFormShell", hy), l.component("BuilderActionsBar", yy), l.component("BuilderTopShell", fy);
}
const _y = {
  install: gy,
  KeosNotificationBuilder: Kt,
  KeosWhatsAppBuilder: Gt,
  KeosSmsBuilder: Jt,
  KeosEmailBuilder: Xt
};
export {
  yy as BuilderActionsBar,
  hy as BuilderFormShell,
  py as BuilderOutline,
  iy as BuilderShell,
  fy as BuilderTopShell,
  Yt as BuilderVersionHistoryModal,
  Qe as DEFAULT_SAMPLE_PROFILES,
  Xt as KeosEmailBuilder,
  Kt as KeosNotificationBuilder,
  Jt as KeosSmsBuilder,
  Gt as KeosWhatsAppBuilder,
  _y as default,
  gy as install,
  Ge as renderTemplatePreview,
  dt as useAutosave,
  rt as useCampaignState
};
//# sourceMappingURL=index.js.map
