import { ref as re, watch as Pe, computed as g, defineComponent as Re, openBlock as n, createElementBlock as s, normalizeStyle as fe, unref as f, createElementVNode as e, normalizeClass as ve, Fragment as V, renderList as W, toDisplayString as u, createTextVNode as Z, createCommentVNode as b, withDirectives as Ve, vModelSelect as ze, vModelText as ht, createStaticVNode as et, withKeys as Zt, onMounted as nt, onUnmounted as st, createVNode as Be, createBlock as ea, withModifiers as at, renderSlot as Ke } from "vue";
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
const lt = {
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
}, ta = ["android", "ios", "web"], Mt = "normal", Vt = ["low", "normal", "high"], Wt = 86400, aa = [3600, 7200, 86400, 172800], Dt = "1.0", na = ["topic", "segment", "user_list"];
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
    priority: Mt,
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
function sa(i) {
  return {
    schema_version: Dt,
    name: "",
    status: "draft",
    audience: yt(),
    message: ft(),
    delivery: gt(),
    tracking: kt(),
    ...i
  };
}
function jt(i) {
  const d = i;
  return d.schema_version || (d.schema_version = Dt), d.audience || (d.audience = yt()), d.message || (d.message = ft()), d.delivery || (d.delivery = gt()), d.tracking || (d.tracking = kt()), Vt.includes(d.delivery.priority) || (d.delivery.priority = Mt), d.delivery.ttl === void 0 && (d.delivery.ttl = Wt), na.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const oa = 1e5;
function ia(i, d) {
  var _, w, C;
  const c = [], m = d ?? i.audience.estimated_reach;
  return m !== void 0 && m >= oa && c.push({
    message: `Estimated reach is very high (${m.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), i.tracking && !((_ = i.tracking.campaign_name) != null && _.trim()) && !((w = i.name) != null && w.trim()) && c.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (C = i.message.deep_link) != null && C.trim() || c.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), c;
}
function Ht(i, d = "error") {
  return { message: i, severity: d };
}
function Ft(i) {
  const d = [];
  return i.schema_version || d.push(Ht("Missing schema_version")), {
    valid: d.length === 0,
    errors: d
  };
}
function la(i, d) {
  const c = Ft(i), m = ia(i, d);
  return {
    valid: c.valid,
    errors: [
      ...c.errors,
      ...m.map((_) => Ht(_.message, _.severity))
    ]
  };
}
function ra(i) {
  return i.errors.filter((d) => d.severity === "error");
}
function da(i) {
  return i.errors.filter((d) => d.severity !== "error");
}
function ua(i) {
  const d = String(i ?? "").trim().toLowerCase();
  return d === "authentication" ? "AUTHENTICATION" : d === "utility" ? "UTILITY" : "MARKETING";
}
function ca(i, d = "template_message") {
  return (String(i ?? "").trim() || d).toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 512) || d;
}
function pa(i) {
  const d = String(i.header_type ?? "").trim().toLowerCase();
  if (d === "image")
    return "IMAGE";
  if (d === "video")
    return "VIDEO";
  if (d === "document")
    return "DOCUMENT";
  if (d === "text")
    return "TEXT";
  const c = String(i.template_type ?? "").trim().toLowerCase();
  return c === "image" ? "IMAGE" : c === "video" ? "VIDEO" : c === "document" ? "DOCUMENT" : null;
}
function ot(i, d = []) {
  if (!i)
    return { text: "", varOrder: [...d] };
  const c = [...d], m = /* @__PURE__ */ new Map();
  return c.forEach((w, C) => m.set(w, C + 1)), { text: i.replace(/\{\{\s*\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (w, C) => (m.has(C) || (m.set(C, c.length + 1), c.push(C)), `{{${m.get(C)}}}`)), varOrder: c };
}
function wt(i, d) {
  return i.map((c) => {
    const m = d == null ? void 0 : d[c];
    return typeof m == "string" && m.length > 0 ? m : `sample_${c}`;
  });
}
function ma(i, d) {
  const c = [];
  let m = [...d];
  return { buttons: i.slice(0, 10).map((w) => {
    const C = w, I = String(C.type ?? "quick_reply").trim().toLowerCase(), S = String(C.label ?? "").trim() || "Button";
    if (I === "url") {
      const B = ot(String(C.url ?? ""), m);
      return m = B.varOrder, { type: "URL", text: S, url: B.text || void 0 };
    }
    return I === "call" ? {
      type: "PHONE_NUMBER",
      text: S,
      phone_number: String(C.phone ?? "").trim() || void 0
    } : I === "opt_out" ? (c.push("Opt-out button is provider-specific; mapped as QUICK_REPLY."), { type: "QUICK_REPLY", text: S }) : { type: "QUICK_REPLY", text: S };
  }).filter((w) => !!w.text), varOrder: m, warnings: c };
}
function va(i) {
  return i.slice(0, 10).map((d) => {
    const c = d, m = String(c.type ?? "quick_reply").trim().toLowerCase(), _ = String(c.label ?? "").trim() || "Button";
    return m === "url" ? {
      type: "URL",
      title: _,
      ...String(c.url ?? "").trim() ? { url: String(c.url).trim() } : {}
    } : m === "call" ? {
      type: "PHONE_NUMBER",
      title: _,
      ...String(c.phone ?? "").trim() ? { phoneNumber: String(c.phone).trim() } : {}
    } : m === "opt_out" ? { type: "OPT_OUT", title: _ } : { type: "QUICK_REPLY", title: _ };
  }).filter((d) => !!d.title);
}
function $t(i) {
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
  for (const m of c)
    i[m] !== void 0 && i[m] !== null && i[m] !== "" && (d[m] = i[m]);
  return Object.keys(d).length ? d : void 0;
}
function ba(i, d = {}) {
  const c = [], m = i.message, _ = [], w = ca(m.template_name ?? i.name, i.name || "template_message"), C = ua(m.template_category), I = String(m.template_language ?? "en_US").trim() || "en_US";
  let S = [];
  const B = pa(m), j = String(m.header ?? "").trim();
  if (B === "TEXT" && j) {
    const F = ot(j, S);
    S = F.varOrder;
    const P = wt(S, d.exampleData);
    _.push({
      type: "HEADER",
      format: "TEXT",
      text: F.text,
      ...P.length ? { example: { header_text: P } } : {}
    });
  } else B && B !== "TEXT" && (_.push({ type: "HEADER", format: B }), m.media_url || c.push(`Header format ${B} selected but media_url is empty.`));
  const K = String(m.body ?? "").trim(), Y = ot(K, S);
  S = Y.varOrder;
  const z = wt(S, d.exampleData);
  _.push({
    type: "BODY",
    text: Y.text,
    ...z.length ? { example: { body_text: [z] } } : {}
  });
  const R = String(m.footer ?? "").trim();
  if (R) {
    const F = ot(R, S);
    S = F.varOrder, _.push({
      type: "FOOTER",
      text: F.text
    });
  }
  const me = Array.isArray(m.buttons) ? m.buttons : [];
  if (me.length) {
    const F = ma(me, S);
    S = F.varOrder, c.push(...F.warnings), F.buttons.length && _.push({ type: "BUTTONS", buttons: F.buttons });
  }
  const J = String(m.template_type ?? "text").trim().toLowerCase();
  return ["catalog", "mpm", "carousel", "flow", "lto", "auth"].includes(J) && c.push(`template_type="${J}" has provider-specific requirements; verify advanced payload fields before submission.`), {
    payload: {
      name: w,
      category: C,
      language: I,
      components: _
    },
    warnings: c
  };
}
function xt(i, d = {}) {
  var R, me, J;
  const c = ba(i, d), m = i.message, _ = c.payload.components.find((F) => F.type === "HEADER"), w = c.payload.components.find((F) => F.type === "BODY"), C = c.payload.components.find((F) => F.type === "FOOTER"), I = String(m.body ?? "").trim(), S = String(m.header ?? "").trim(), B = String(m.footer ?? "").trim(), j = Array.isArray(m.buttons) ? m.buttons : [], K = va(j), Y = (() => {
    const F = String(m.template_type ?? "").trim().toLowerCase();
    return F === "image" ? "IMAGE" : F === "video" ? "VIDEO" : F === "document" ? "DOCUMENT" : "TEXT";
  })();
  return { payload: {
    elementName: c.payload.name,
    languageCode: c.payload.language,
    category: c.payload.category,
    templateType: Y,
    content: I || (w == null ? void 0 : w.text) || "",
    ...(_ == null ? void 0 : _.format) === "TEXT" && (S || _.text) ? { header: S || _.text } : {},
    ...B || C != null && C.text ? { footer: B || (C == null ? void 0 : C.text) } : {},
    ...K.length ? { buttons: K } : {},
    ...(J = (me = (R = w == null ? void 0 : w.example) == null ? void 0 : R.body_text) == null ? void 0 : me[0]) != null && J.length ? { example: w.example.body_text[0] } : {},
    metaTemplate: c.payload,
    metaWhatsApp: c.payload,
    ...$t(m) ? { advanced: $t(m) } : {}
  }, warnings: c.warnings };
}
function Xe(i, d) {
  return i.length <= d ? { text: i, truncated: !1 } : { text: i.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const it = lt.android;
function ha(i) {
  const { title: d, body: c } = i, m = Xe(d || "", it.title), _ = Xe(c || "", it.body);
  return {
    title: m.text,
    body: _.text,
    imageUrl: i.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function ya(i) {
  const { title: d, body: c } = i, m = Xe(d || "", it.title), _ = Xe(c || "", it.body);
  return {
    title: m.text,
    body: _.text,
    imageUrl: i.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: _.truncated,
    expanded: !0
  };
}
function fa(i, d = {}) {
  const c = d.expanded ? ya(i) : ha(i);
  return d.darkMode !== void 0 && (c.darkMode = d.darkMode), c;
}
const Ct = lt.ios;
function qt(i) {
  const { title: d, body: c } = i, m = Xe(d || "", Ct.title), _ = Xe(c || "", Ct.body);
  return {
    title: m.text,
    body: _.text,
    imageUrl: i.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function ga(i) {
  return qt(i);
}
function ka(i, d = {}) {
  const c = d.variant === "lockscreen" ? ga(i) : qt(i);
  return d.darkMode !== void 0 && (c.darkMode = d.darkMode), c;
}
const St = lt.web;
function It(i) {
  const { title: d, body: c } = i, m = Xe(d || "", St.title), _ = Xe(c || "", St.body);
  return {
    title: m.text,
    body: _.text,
    imageUrl: i.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: _.truncated
  };
}
function _a(i) {
  return i.map((d) => ({ message: d, severity: "error" }));
}
function ct(i) {
  return JSON.parse(JSON.stringify(i));
}
function rt(i = {}) {
  const d = re(
    jt(i.initial ?? sa())
  ), c = i.hooks ?? {}, m = re(!1), _ = re([]);
  Pe(
    d,
    () => {
      if (!c.customValidators) {
        _.value = [];
        return;
      }
      c.customValidators(d.value).then((N) => {
        _.value = N;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const w = re([]), C = re([]);
  function I() {
    const N = ct(d.value);
    w.value = [...w.value.slice(-19), N], C.value = [];
  }
  const S = g(() => w.value.length > 0), B = g(() => C.value.length > 0);
  function j() {
    w.value.length !== 0 && (C.value = [ct(d.value), ...C.value], d.value = w.value[w.value.length - 1], w.value = w.value.slice(0, -1));
  }
  function K() {
    C.value.length !== 0 && (w.value = [...w.value, ct(d.value)], d.value = C.value[0], C.value = C.value.slice(1));
  }
  Pe(
    d,
    () => {
      var N;
      m.value = !0, (N = i.onDirty) == null || N.call(i);
    },
    { deep: !0 }
  );
  const Y = g(() => Ft(d.value));
  function z(N) {
    const ue = la(d.value, N), te = _a(_.value), A = [...ra(ue), ...te], ge = [...ue.errors, ...te], ye = ue.valid && te.length === 0;
    return {
      ...ue,
      errors: ge,
      valid: ye,
      blockingErrors: A,
      warnings: da(ue)
    };
  }
  function R(N) {
    I(), d.value = { ...d.value, ...N };
  }
  function me(N) {
    I(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...N }
    };
  }
  function J(N) {
    I(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...N }
    };
  }
  function F(N) {
    I(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...N }
    };
  }
  function P(N) {
    I(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...N } : { campaign_name: "", tags: [], ab_test: !1, ...N }
    };
  }
  function de(N) {
    I(), d.value = {
      ...d.value,
      message: { ...ft(), ...N }
    };
  }
  function $e(N) {
    I(), d.value = {
      ...d.value,
      delivery: { ...gt(), ...N }
    };
  }
  function Ce(N) {
    I(), d.value = {
      ...d.value,
      tracking: { ...kt(), ...N }
    };
  }
  function _e(N) {
    I(), d.value = {
      ...d.value,
      audience: { ...yt(), ...N }
    };
  }
  const se = g(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function X(N, ue) {
    const te = se.value;
    let A;
    switch (N) {
      case "android":
        A = fa(te, { expanded: ue == null ? void 0 : ue.expanded });
        break;
      case "ios":
        A = ka(te);
        break;
      case "web":
        A = It(te);
        break;
      default:
        A = It(te);
    }
    const ge = d.value.message.actions ?? [], ye = d.value.message.location;
    return { ...A, actions: ge, location: ye ?? void 0 };
  }
  const y = lt;
  async function T() {
    return c.customValidators ? c.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: m,
    validation: Y,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: _,
    getValidationWithWarnings: z,
    update: R,
    updateAudience: me,
    updateMessage: J,
    updateDelivery: F,
    updateTracking: P,
    undo: j,
    redo: K,
    canUndo: S,
    canRedo: B,
    resetMessage: de,
    resetDelivery: $e,
    resetTracking: Ce,
    resetAudience: _e,
    getPreview: X,
    previewInput: se,
    characterLimits: y,
    runCustomValidators: T,
    hooks: c
  };
}
const wa = "keos-draft", $a = 2e3;
function xa(i, d) {
  return `${wa}-${i}-${d}`;
}
function dt(i, d) {
  const c = d.channel, m = g(
    () => {
      var j, K;
      return xa(
        c,
        d.key ?? ((j = i.value) == null ? void 0 : j.id) ?? ((K = i.value) == null ? void 0 : K.name) ?? "draft"
      );
    }
  ), _ = re(null);
  let w = null;
  function C() {
    try {
      const j = JSON.stringify(i.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(m.value, j), _.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function I() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(m.value);
    } catch {
    }
  }
  function S() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const j = window.localStorage.getItem(m.value);
      if (!j) return null;
      const K = JSON.parse(j);
      return jt(K);
    } catch {
      return null;
    }
  }
  function B() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return Pe(
    i,
    () => {
      B() && (w && clearTimeout(w), w = setTimeout(() => {
        w = null, C();
      }, $a));
    },
    { deep: !0 }
  ), {
    lastSavedAt: _,
    clearDraft: I,
    getDraft: S,
    persist: C
  };
}
const Ca = { class: "kb-header__row" }, Sa = ["value"], Ia = { class: "kb-header__actions" }, Aa = ["disabled"], Ta = ["disabled"], Ra = ["value"], Ua = ["value"], La = /* @__PURE__ */ Re({
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
  setup(i, { emit: d }) {
    const c = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], m = i, _ = d, w = () => !!(m.campaignName || "").trim();
    function C(B) {
      return m.slugifyName ? B.trim().replace(/\s+/g, "-") : B;
    }
    function I(B) {
      return B.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function S(B) {
      const j = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return j[B] ?? j.draft;
    }
    return (B, j) => (n(), s("header", {
      class: "kb-header",
      style: fe({
        padding: `${f(he)[16]}px 0`,
        borderBottom: `1px solid ${f(xe).neutral.border}`,
        marginBottom: `${f(he)[16]}px`
      })
    }, [
      e("div", Ca, [
        e("div", {
          class: ve(["kb-header__name-section", { "kb-header__name-section--filled": w() }])
        }, [
          j[4] || (j[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: i.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: j[0] || (j[0] = (K) => _("update:campaignName", C(K.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, Sa),
          j[5] || (j[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", Ia, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !i.canUndo,
            onClick: j[1] || (j[1] = (K) => _("undo"))
          }, " Undo ", 8, Aa),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !i.canRedo,
            onClick: j[2] || (j[2] = (K) => _("redo"))
          }, " Redo ", 8, Ta)
        ]),
        i.workflowStatus !== void 0 ? (n(), s("select", {
          key: 0,
          value: i.workflowStatus,
          class: "kb-header__status-select",
          style: fe({
            padding: `${f(he)[4]}px ${f(he)[8]}px`,
            borderRadius: `${f(Je).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...S(i.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: j[3] || (j[3] = (K) => _("update:workflowStatus", K.target.value))
        }, [
          (n(), s(V, null, W(c, (K) => e("option", {
            key: K.value,
            value: K.value
          }, u(K.label), 9, Ua)), 64))
        ], 44, Ra)) : (n(), s("span", {
          key: 1,
          class: "kb-header__status",
          style: fe({
            padding: `${f(he)[4]}px ${f(he)[8]}px`,
            borderRadius: `${f(Je).input}px`,
            background: f(xe).neutral.bg,
            fontSize: "0.8125rem",
            color: f(xe).neutral.textMuted
          })
        }, u(i.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: fe({ fontSize: "0.8125rem", color: f(xe).neutral.textMuted, marginTop: `${f(he)[4]}px` })
      }, [
        i.saving ? (n(), s(V, { key: 0 }, [
          Z("Saving…")
        ], 64)) : i.dirty ? (n(), s(V, { key: 1 }, [
          Z("Unsaved changes")
        ], 64)) : i.lastSavedAt ? (n(), s(V, { key: 2 }, [
          Z("Last saved at " + u(I(i.lastSavedAt)), 1)
        ], 64)) : b("", !0)
      ], 4)
    ], 4));
  }
}), Ue = (i, d) => {
  const c = i.__vccOpts || i;
  for (const [m, _] of d)
    c[m] = _;
  return c;
}, ut = /* @__PURE__ */ Ue(La, [["__scopeId", "data-v-56efb3ec"]]), Ba = { class: "kb-section" }, Pa = { class: "kb-section__head" }, Ea = { class: "kb-section__desc" }, Oa = { class: "kb-field" }, Na = { class: "kb-label" }, Ma = { class: "kb-field-with-rail" }, Va = ["value", "aria-invalid", "aria-describedby"], Wa = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, Da = { class: "kb-field" }, ja = { class: "kb-label" }, Ha = { class: "kb-field-with-rail" }, Fa = ["value", "aria-invalid", "aria-describedby"], qa = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, za = { class: "kb-field" }, Ya = ["value", "aria-invalid", "aria-describedby"], Ka = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Ga = { class: "kb-field" }, Ja = ["value", "aria-invalid", "aria-describedby"], Xa = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Qa = { class: "kb-field" }, Za = { class: "kb-location-row" }, en = ["value"], tn = ["value"], an = ["value"], nn = ["value"], sn = { class: "kb-field" }, on = { class: "kb-actions-list" }, ln = ["value", "onInput"], rn = ["value", "onInput"], dn = ["onClick"], un = ["disabled"], cn = { class: "kb-action-chips" }, pn = ["disabled", "onClick"], mn = /* @__PURE__ */ Re({
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
  setup(i) {
    const d = i;
    return (c, m) => {
      var _, w, C, I;
      return n(), s("section", Ba, [
        e("div", Pa, [
          m[10] || (m[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          i.showReset ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (S) => c.$emit("reset"))
          }, " Reset section ")) : b("", !0)
        ]),
        e("p", Ea, " Message body is required. Title is optional. Character limits depend on the selected platform (" + u(i.selectedPlatform) + "). ", 1),
        e("div", Oa, [
          e("label", Na, [
            m[11] || (m[11] = Z(" Title ", -1)),
            e("span", {
              class: ve(["kb-counter", { "kb-counter--warn": i.titleCount > i.titleLimit }])
            }, u(i.titleCount) + "/" + u(i.titleLimit), 3)
          ]),
          e("div", Ma, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: i.message.title,
              "aria-invalid": !!i.titleError,
              "aria-describedby": i.titleError ? "title-error" : void 0,
              onInput: m[1] || (m[1] = (S) => c.$emit("update", { title: S.target.value }))
            }, null, 40, Va),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: fe({ "--pct": Math.min(100, i.titleCount / i.titleLimit * 100) + "%" })
            }, [...m[12] || (m[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          i.titleError ? (n(), s("p", Wa, u(i.titleError), 1)) : b("", !0)
        ]),
        e("div", Da, [
          e("label", ja, [
            m[13] || (m[13] = Z(" Message ", -1)),
            e("span", {
              class: ve(["kb-counter", { "kb-counter--warn": i.bodyCount > i.bodyLimit }])
            }, u(i.bodyCount) + "/" + u(i.bodyLimit), 3)
          ]),
          e("div", Ha, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: i.message.body,
              "aria-invalid": !!i.bodyError,
              "aria-describedby": i.bodyError ? "body-error" : void 0,
              onInput: m[2] || (m[2] = (S) => c.$emit("update", { body: S.target.value }))
            }, null, 40, Fa),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: fe({ "--pct": Math.min(100, i.bodyCount / i.bodyLimit * 100) + "%" })
            }, [...m[14] || (m[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          i.bodyError ? (n(), s("p", qa, u(i.bodyError), 1)) : b("", !0)
        ]),
        e("div", za, [
          m[15] || (m[15] = e("label", { class: "kb-label" }, [
            Z(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.message.image_url,
            "aria-invalid": !!i.imageUrlError,
            "aria-describedby": i.imageUrlError ? "image-url-error" : void 0,
            onInput: m[3] || (m[3] = (S) => c.$emit("update", { image_url: S.target.value || void 0 }))
          }, null, 40, Ya),
          i.imageUrlError ? (n(), s("p", Ka, u(i.imageUrlError), 1)) : b("", !0)
        ]),
        e("div", Ga, [
          m[16] || (m[16] = e("label", { class: "kb-label" }, [
            Z(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: i.message.deep_link,
            "aria-invalid": !!i.deepLinkError,
            "aria-describedby": i.deepLinkError ? "deeplink-error" : void 0,
            onInput: m[4] || (m[4] = (S) => c.$emit("update", { deep_link: S.target.value || void 0 }))
          }, null, 40, Ja),
          i.deepLinkError ? (n(), s("p", Xa, u(i.deepLinkError), 1)) : b("", !0)
        ]),
        e("div", Qa, [
          m[17] || (m[17] = e("label", { class: "kb-label" }, [
            Z(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Za, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((_ = i.message.location) == null ? void 0 : _.lat) ?? "",
              onInput: m[5] || (m[5] = (S) => {
                const B = { ...i.message.location ?? {} }, j = S.target.value;
                B.lat = j === "" ? void 0 : Number(j), c.$emit("update", { location: B });
              })
            }, null, 40, en),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((w = i.message.location) == null ? void 0 : w.lon) ?? "",
              onInput: m[6] || (m[6] = (S) => {
                const B = { ...i.message.location ?? {} }, j = S.target.value;
                B.lon = j === "" ? void 0 : Number(j), c.$emit("update", { location: B });
              })
            }, null, 40, tn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((C = i.message.location) == null ? void 0 : C.name) ?? "",
            onInput: m[7] || (m[7] = (S) => {
              const B = { ...i.message.location ?? {} };
              B.name = S.target.value || void 0, c.$emit("update", { location: B });
            })
          }, null, 40, an),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((I = i.message.location) == null ? void 0 : I.address) ?? "",
            onInput: m[8] || (m[8] = (S) => {
              const B = { ...i.message.location ?? {} };
              B.address = S.target.value || void 0, c.$emit("update", { location: B });
            })
          }, null, 40, nn)
        ]),
        e("div", sn, [
          m[19] || (m[19] = e("label", { class: "kb-label" }, [
            Z(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", on, [
            (n(!0), s(V, null, W(d.message.actions ?? [], (S, B) => (n(), s("div", {
              key: S.id || B,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: S.label,
                onInput: (j) => {
                  var z;
                  const K = [...d.message.actions ?? []], Y = Number(B);
                  K[Y] = {
                    ...K[Y],
                    id: ((z = K[Y]) == null ? void 0 : z.id) || `action_${Y + 1}`,
                    label: j.target.value
                  }, c.$emit("update", { actions: K });
                }
              }, null, 40, ln),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: S.url,
                onInput: (j) => {
                  var z;
                  const K = [...d.message.actions ?? []], Y = Number(B);
                  K[Y] = {
                    ...K[Y],
                    id: ((z = K[Y]) == null ? void 0 : z.id) || `action_${Y + 1}`,
                    url: j.target.value || void 0
                  }, c.$emit("update", { actions: K });
                }
              }, null, 40, rn),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const j = [...d.message.actions ?? []];
                  j.splice(Number(B), 1), c.$emit("update", { actions: j });
                }
              }, " Remove ", 8, dn)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (d.message.actions ?? []).length >= 3,
              onClick: m[9] || (m[9] = () => {
                const S = [...d.message.actions ?? []];
                S.push({
                  id: `action_${S.length + 1}`,
                  label: "",
                  url: ""
                }), c.$emit("update", { actions: S });
              })
            }, " Add action ", 8, un),
            e("div", cn, [
              m[18] || (m[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (n(), s(V, null, W(["View order", "Track shipment", "Open app"], (S) => e("button", {
                key: S,
                type: "button",
                class: "kb-action-chip",
                disabled: (d.message.actions ?? []).length >= 3,
                onClick: () => {
                  const B = [...d.message.actions ?? []];
                  B.push({
                    id: `action_${Date.now()}`,
                    label: S,
                    url: ""
                  }), c.$emit("update", { actions: B });
                }
              }, u(S), 9, pn)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), vn = /* @__PURE__ */ Ue(mn, [["__scopeId", "data-v-88ad2281"]]), bn = { class: "kb-section kb-section--inline-personalization" }, hn = { class: "kb-field" }, yn = { class: "kb-insert-row" }, fn = ["value"], gn = { class: "kb-field" }, kn = { class: "kb-insert-row" }, _n = { class: "kb-field" }, wn = { class: "kb-variable-list" }, $n = /* @__PURE__ */ Re({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {},
    targets: {}
  },
  emits: ["update", "insertVariable"],
  setup(i, { emit: d }) {
    const c = i, m = d, _ = ["first_name", "last_name", "order_id", "city"], w = re(c.variableOptions ?? _), C = re(w.value[0] ?? _[0]), I = re("");
    Pe(
      () => c.variableOptions,
      (Y) => {
        Y && Y.length && (w.value = [...Y], w.value.includes(C.value) || (C.value = w.value[0]));
      }
    );
    const S = g(() => w.value), B = g(() => {
      var z;
      return (z = c.targets) != null && z.length ? c.targets : ["title", "body"];
    });
    function j(Y) {
      m("insertVariable", { variable: C.value, field: Y });
    }
    function K() {
      const Y = I.value.trim();
      Y && (w.value.includes(Y) || (w.value = [...w.value, Y]), C.value = Y, I.value = "");
    }
    return (Y, z) => (n(), s("section", bn, [
      z[9] || (z[9] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      z[10] || (z[10] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", hn, [
        z[5] || (z[5] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", yn, [
          Ve(e("select", {
            "onUpdate:modelValue": z[0] || (z[0] = (R) => C.value = R),
            class: "kb-select"
          }, [
            (n(!0), s(V, null, W(S.value, (R) => (n(), s("option", {
              key: R,
              value: R
            }, u(R), 9, fn))), 128))
          ], 512), [
            [ze, C.value]
          ]),
          B.value.includes("title") ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "kb-btn-insert",
            onClick: z[1] || (z[1] = (R) => j("title"))
          }, " Into title ")) : b("", !0),
          B.value.includes("body") ? (n(), s("button", {
            key: 1,
            type: "button",
            class: "kb-btn-insert",
            onClick: z[2] || (z[2] = (R) => j("body"))
          }, " Into message ")) : b("", !0),
          B.value.includes("footer") ? (n(), s("button", {
            key: 2,
            type: "button",
            class: "kb-btn-insert",
            onClick: z[3] || (z[3] = (R) => j("footer"))
          }, " Into footer ")) : b("", !0)
        ])
      ]),
      e("div", gn, [
        z[6] || (z[6] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", kn, [
          Ve(e("input", {
            "onUpdate:modelValue": z[4] || (z[4] = (R) => I.value = R),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [ht, I.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: K
          }, " Add ")
        ])
      ]),
      e("div", _n, [
        z[7] || (z[7] = e("label", { class: "kb-label" }, "Available variables", -1)),
        z[8] || (z[8] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", wn, [
          (n(!0), s(V, null, W(S.value, (R) => (n(), s("li", { key: R }, [
            e("code", null, "{{ ." + u(R) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), zt = /* @__PURE__ */ Ue($n, [["__scopeId", "data-v-2e8dd0d2"]]), xn = { class: "kb-section kb-section--template-type" }, Cn = { class: "kb-field" }, Sn = { class: "kb-radio-group" }, In = { class: "kb-radio" }, An = ["checked"], Tn = { class: "kb-radio" }, Rn = ["checked"], Un = /* @__PURE__ */ Re({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(i, { emit: d }) {
    const c = d;
    return (m, _) => (n(), s("section", xn, [
      _[5] || (_[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      _[6] || (_[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Cn, [
        e("div", Sn, [
          e("label", In, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: i.templateType === "transactional",
              onChange: _[0] || (_[0] = (w) => c("update", "transactional"))
            }, null, 40, An),
            _[2] || (_[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Tn, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: i.templateType === "marketing",
              onChange: _[1] || (_[1] = (w) => c("update", "marketing"))
            }, null, 40, Rn),
            _[3] || (_[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        _[4] || (_[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), _t = /* @__PURE__ */ Ue(Un, [["__scopeId", "data-v-ff2e1bd8"]]), Ln = { class: "kb-section" }, Bn = { class: "kb-section__head" }, Pn = { class: "kb-section__desc" }, En = { class: "kb-field" }, On = { class: "kb-radio-group" }, Nn = { class: "kb-radio" }, Mn = ["checked"], Vn = { class: "kb-radio" }, Wn = ["checked"], Dn = {
  key: 0,
  class: "kb-field kb-row"
}, jn = ["value"], Hn = ["value"], Fn = { class: "kb-field" }, qn = ["value"], zn = ["value"], Yn = { class: "kb-field" }, Kn = ["value"], Gn = ["value"], Jn = { class: "kb-field" }, Xn = { class: "kb-checkbox" }, Qn = ["checked"], Zn = /* @__PURE__ */ Re({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i) {
    const d = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (c, m) => {
      var _;
      return n(), s("section", Ln, [
        e("div", Bn, [
          m[8] || (m[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          i.showReset ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (w) => c.$emit("reset"))
          }, " Reset section ")) : b("", !0)
        ]),
        e("p", Pn, u(i.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", En, [
          m[11] || (m[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", On, [
            e("label", Nn, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !i.delivery.scheduled_at,
                onChange: m[1] || (m[1] = (w) => c.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Mn),
              m[9] || (m[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Vn, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!i.delivery.scheduled_at,
                onChange: m[2] || (m[2] = (w) => c.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Wn),
              m[10] || (m[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        i.delivery.scheduled_at ? (n(), s("div", Dn, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (_ = i.delivery.scheduled_at) == null ? void 0 : _.slice(0, 16),
            onInput: m[3] || (m[3] = (w) => c.$emit("update", { scheduled_at: w.target.value }))
          }, null, 40, jn),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: i.delivery.timezone,
            onInput: m[4] || (m[4] = (w) => c.$emit("update", { timezone: w.target.value }))
          }, null, 40, Hn)
        ])) : b("", !0),
        i.showPushOptions ? (n(), s(V, { key: 1 }, [
          e("div", Fn, [
            m[12] || (m[12] = e("label", { class: "kb-label" }, [
              Z(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: i.delivery.ttl,
              onChange: m[5] || (m[5] = (w) => c.$emit("update", { ttl: Number(w.target.value) }))
            }, [
              (n(!0), s(V, null, W(f(aa), (w) => (n(), s("option", {
                key: w,
                value: w
              }, u(d[w] ?? w + "s"), 9, zn))), 128))
            ], 40, qn)
          ]),
          e("div", Yn, [
            m[13] || (m[13] = e("label", { class: "kb-label" }, [
              Z(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: i.delivery.priority,
              onChange: m[6] || (m[6] = (w) => c.$emit("update", { priority: w.target.value }))
            }, [
              (n(!0), s(V, null, W(f(Vt), (w) => (n(), s("option", {
                key: w,
                value: w
              }, u(w), 9, Gn))), 128))
            ], 40, Kn)
          ]),
          e("div", Jn, [
            e("label", Xn, [
              e("input", {
                type: "checkbox",
                checked: i.delivery.quiet_hours,
                onChange: m[7] || (m[7] = (w) => c.$emit("update", { quiet_hours: !i.delivery.quiet_hours }))
              }, null, 40, Qn),
              m[14] || (m[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : b("", !0)
      ]);
    };
  }
}), es = /* @__PURE__ */ Ue(Zn, [["__scopeId", "data-v-5707a2a7"]]), ts = { class: "kb-accordion" }, as = { class: "kb-accordion__body" }, ns = { class: "kb-field" }, ss = ["value"], os = { class: "kb-field" }, is = { class: "kb-checkbox" }, ls = ["checked"], rs = /* @__PURE__ */ Re({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(i) {
    return (d, c) => (n(), s("details", ts, [
      c[4] || (c[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", as, [
        e("div", ns, [
          c[2] || (c[2] = e("label", { class: "kb-label" }, [
            Z(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: i.delivery.collapse_key,
            onInput: c[0] || (c[0] = (m) => d.$emit("update", { collapse_key: m.target.value || void 0 }))
          }, null, 40, ss)
        ]),
        e("div", os, [
          e("label", is, [
            e("input", {
              type: "checkbox",
              checked: i.delivery.silent_push,
              onChange: c[1] || (c[1] = (m) => d.$emit("update", { silent_push: !i.delivery.silent_push }))
            }, null, 40, ls),
            c[3] || (c[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), ds = /* @__PURE__ */ Ue(rs, [["__scopeId", "data-v-699e4501"]]);
function Ge(i, d) {
  return !i || typeof i != "string" ? i : i.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (c, m) => {
    const w = String(m).trim().replace(/^\./, "");
    return w in d ? String(d[w]) : c;
  });
}
const Qe = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], us = { class: "kb-preview" }, cs = { class: "kb-preview__toggle" }, ps = { class: "kb-preview__mode" }, ms = { class: "kb-preview__quality" }, vs = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, bs = ["src"], hs = { class: "kb-android-body-row" }, ys = { class: "kb-android-body-content" }, fs = {
  key: 0,
  class: "kb-android-title"
}, gs = {
  key: 1,
  class: "kb-android-text"
}, ks = {
  key: 2,
  class: "kb-android-location-line"
}, _s = {
  key: 0,
  class: "kb-android-thumb"
}, ws = ["src"], $s = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, xs = ["src"], Cs = {
  key: 0,
  class: "kb-preview-map__caption"
}, Ss = {
  key: 2,
  class: "kb-android-actions"
}, Is = {
  key: 3,
  class: "kb-preview-warning"
}, As = { class: "kb-ios-banner" }, Ts = { class: "kb-ios-content" }, Rs = {
  key: 0,
  class: "kb-ios-title"
}, Us = {
  key: 1,
  class: "kb-ios-text"
}, Ls = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, Bs = ["src"], Ps = {
  key: 0,
  class: "kb-preview-map__caption"
}, Es = {
  key: 4,
  class: "kb-ios-actions"
}, Os = {
  key: 5,
  class: "kb-preview-warning"
}, Ns = {
  key: 0,
  class: "kb-ios-thumb"
}, Ms = ["src"], Vs = { class: "kb-web-toast" }, Ws = { class: "kb-web-body" }, Ds = {
  key: 0,
  class: "kb-web-title"
}, js = {
  key: 1,
  class: "kb-web-text"
}, Hs = {
  key: 3,
  class: "kb-web-image"
}, Fs = ["src"], qs = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, zs = ["src"], Ys = {
  key: 0,
  class: "kb-preview-map__caption"
}, Ks = {
  key: 0,
  class: "kb-web-actions"
}, Gs = {
  key: 1,
  class: "kb-preview-warning"
}, Js = /* @__PURE__ */ Re({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(i) {
    const d = i, c = re("shade"), m = re("banner"), _ = re("toast"), w = g(() => c.value === "expanded"), C = g(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? w.value : void 0
      })
    ), I = g(() => {
      const X = C.value;
      return d.previewProfile ? {
        ...X,
        title: Ge((X == null ? void 0 : X.title) ?? "", d.previewProfile.data),
        body: Ge((X == null ? void 0 : X.body) ?? "", d.previewProfile.data)
      } : X;
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
    function B(X, y) {
      const T = (X ?? "").trim();
      return T ? T.length <= y ? T : `${T.slice(0, Math.max(0, y - 1)).trimEnd()}…` : "";
    }
    const j = g(() => d.selectedPlatform === "android" ? c.value : d.selectedPlatform === "ios" ? m.value : _.value), K = g(() => (S[d.selectedPlatform] ?? S.web)[j.value] ?? { title: 60, body: 160 }), Y = g(
      () => {
        var X;
        return B((X = I.value) == null ? void 0 : X.title, K.value.title);
      }
    ), z = g(
      () => {
        var X;
        return B((X = I.value) == null ? void 0 : X.body, K.value.body);
      }
    ), R = { android: 3, ios: 4, web: 2 }, me = g(
      () => {
        var X;
        return Array.isArray((X = I.value) == null ? void 0 : X.actions) ? I.value.actions : [];
      }
    ), J = g(
      () => me.value.slice(0, R[d.selectedPlatform] ?? 2)
    ), F = g(
      () => Math.max(0, me.value.length - J.value.length)
    ), P = g(() => {
      var X;
      return (((X = d.message) == null ? void 0 : X.deep_link) ?? "").trim();
    }), de = g(() => P.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(P.value) : !1), $e = g(() => P.value ? P.value.length <= 40 ? P.value : `${P.value.slice(0, 37)}…` : ""), Ce = g(() => {
      var y, T, N;
      const X = [];
      return (y = d.delivery) != null && y.priority && X.push(`Priority: ${d.delivery.priority}`), typeof ((T = d.delivery) == null ? void 0 : T.ttl) == "number" && X.push(`TTL: ${d.delivery.ttl}s`), (N = d.delivery) != null && N.silent_push && X.push("Silent push"), X;
    }), _e = g(() => {
      var te;
      const X = (te = I.value) == null ? void 0 : te.location;
      if (!X || X.lat == null && X.lon == null) return null;
      const y = Number(X.lat) || 0, T = Number(X.lon) || 0, N = 8e-3, ue = [T - N, y - N, T + N, y + N].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(ue)}&layer=mapnik&marker=${y},${T}`;
    }), se = g(() => {
      var y;
      const X = (y = I.value) == null ? void 0 : y.location;
      return X && (X.lat != null || X.lon != null || X.name || X.address);
    });
    return (X, y) => {
      var T, N, ue, te, A, ge, ye, Se, Ie, M, $, L, Q, ie, be, pe;
      return n(), s("div", us, [
        e("div", cs, [
          e("label", ps, [
            y[6] || (y[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            i.selectedPlatform === "android" ? Ve((n(), s("select", {
              key: 0,
              "onUpdate:modelValue": y[0] || (y[0] = (le) => c.value = le),
              class: "kb-preview__mode-select"
            }, [...y[3] || (y[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [ze, c.value]
            ]) : i.selectedPlatform === "ios" ? Ve((n(), s("select", {
              key: 1,
              "onUpdate:modelValue": y[1] || (y[1] = (le) => m.value = le),
              class: "kb-preview__mode-select"
            }, [...y[4] || (y[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [ze, m.value]
            ]) : Ve((n(), s("select", {
              key: 2,
              "onUpdate:modelValue": y[2] || (y[2] = (le) => _.value = le),
              class: "kb-preview__mode-select"
            }, [...y[5] || (y[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [ze, _.value]
            ])
          ]),
          e("div", ms, [
            (n(!0), s(V, null, W(Ce.value, (le) => (n(), s("span", {
              key: le,
              class: "kb-preview__badge"
            }, u(le), 1))), 128))
          ])
        ]),
        i.selectedPlatform === "android" ? (n(), s("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: ve(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${c.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          y[9] || (y[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ve(["kb-android-notification", { "kb-android-notification--expanded": w.value }])
          }, [
            y[8] || (y[8] = et('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: ve(["kb-android-body", { "kb-android-body--expanded": w.value }])
            }, [
              w.value && I.value.imageUrl ? (n(), s("div", vs, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, bs)
              ])) : b("", !0),
              e("div", hs, [
                e("div", ys, [
                  Y.value ? (n(), s("div", fs, u(Y.value), 1)) : b("", !0),
                  z.value ? (n(), s("div", gs, u(z.value), 1)) : b("", !0),
                  se.value && !w.value && ((T = I.value.location) != null && T.name || (N = I.value.location) != null && N.address) ? (n(), s("div", ks, [
                    y[7] || (y[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    Z(" " + u(((ue = I.value.location) == null ? void 0 : ue.name) || ((te = I.value.location) == null ? void 0 : te.address)), 1)
                  ])) : b("", !0),
                  P.value ? (n(), s("div", {
                    key: 3,
                    class: ve(["kb-preview-link", { "kb-preview-link--invalid": !de.value }])
                  }, u(de.value ? $e.value : "Invalid deep link format"), 3)) : b("", !0)
                ]),
                !w.value && I.value.imageUrl ? (n(), s("div", _s, [
                  e("img", {
                    src: I.value.imageUrl,
                    alt: ""
                  }, null, 8, ws)
                ])) : b("", !0)
              ]),
              se.value && _e.value && w.value ? (n(), s("div", $s, [
                e("iframe", {
                  src: _e.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, xs),
                (A = I.value.location) != null && A.name || (ge = I.value.location) != null && ge.address ? (n(), s("div", Cs, u(((ye = I.value.location) == null ? void 0 : ye.name) || ((Se = I.value.location) == null ? void 0 : Se.address)), 1)) : b("", !0)
              ])) : b("", !0),
              J.value.length ? (n(), s("div", Ss, [
                (n(!0), s(V, null, W(J.value, (le) => (n(), s("button", {
                  key: le.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, u(le.label || "Action"), 1))), 128))
              ])) : b("", !0),
              F.value > 0 ? (n(), s("p", Is, " Showing " + u(J.value.length) + " of " + u(me.value.length) + " actions on " + u(i.selectedPlatform) + ". ", 1)) : b("", !0)
            ], 2)
          ], 2)
        ], 2)) : i.selectedPlatform === "ios" ? (n(), s("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: ve(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${m.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          y[12] || (y[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", As, [
            y[11] || (y[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Ts, [
              y[10] || (y[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              Y.value ? (n(), s("div", Rs, u(Y.value), 1)) : b("", !0),
              z.value ? (n(), s("div", Us, u(z.value), 1)) : b("", !0),
              P.value ? (n(), s("div", {
                key: 2,
                class: ve(["kb-preview-link", { "kb-preview-link--invalid": !de.value }])
              }, u(de.value ? $e.value : "Invalid deep link format"), 3)) : b("", !0),
              se.value && _e.value ? (n(), s("div", Ls, [
                e("iframe", {
                  src: _e.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Bs),
                (Ie = I.value.location) != null && Ie.name || (M = I.value.location) != null && M.address ? (n(), s("div", Ps, u((($ = I.value.location) == null ? void 0 : $.name) || ((L = I.value.location) == null ? void 0 : L.address)), 1)) : b("", !0)
              ])) : b("", !0),
              J.value.length ? (n(), s("div", Es, [
                (n(!0), s(V, null, W(J.value, (le) => (n(), s("button", {
                  key: le.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, u(le.label || "Action"), 1))), 128))
              ])) : b("", !0),
              F.value > 0 ? (n(), s("p", Os, " Showing " + u(J.value.length) + " of " + u(me.value.length) + " actions on " + u(i.selectedPlatform) + ". ", 1)) : b("", !0)
            ]),
            I.value.imageUrl ? (n(), s("div", Ns, [
              e("img", {
                src: I.value.imageUrl,
                alt: ""
              }, null, 8, Ms)
            ])) : b("", !0)
          ])
        ], 2)) : (n(), s("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: ve(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${_.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          y[14] || (y[14] = et('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", Vs, [
            y[13] || (y[13] = et('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", Ws, [
              Y.value ? (n(), s("div", Ds, u(Y.value), 1)) : b("", !0),
              z.value ? (n(), s("div", js, u(z.value), 1)) : b("", !0),
              P.value ? (n(), s("div", {
                key: 2,
                class: ve(["kb-preview-link", { "kb-preview-link--invalid": !de.value }])
              }, u(de.value ? $e.value : "Invalid deep link format"), 3)) : b("", !0),
              I.value.imageUrl ? (n(), s("div", Hs, [
                e("img", {
                  src: I.value.imageUrl,
                  alt: ""
                }, null, 8, Fs)
              ])) : b("", !0),
              se.value && _e.value ? (n(), s("div", qs, [
                e("iframe", {
                  src: _e.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, zs),
                (Q = I.value.location) != null && Q.name || (ie = I.value.location) != null && ie.address ? (n(), s("div", Ys, u(((be = I.value.location) == null ? void 0 : be.name) || ((pe = I.value.location) == null ? void 0 : pe.address)), 1)) : b("", !0)
              ])) : b("", !0)
            ]),
            J.value.length ? (n(), s("div", Ks, [
              (n(!0), s(V, null, W(J.value, (le, Ae) => (n(), s("button", {
                key: le.id || Ae,
                type: "button",
                class: ve(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Ae) > 0 }])
              }, u(le.label || "Action"), 3))), 128))
            ])) : b("", !0),
            F.value > 0 ? (n(), s("p", Gs, " Showing " + u(J.value.length) + " of " + u(me.value.length) + " actions on " + u(i.selectedPlatform) + ". ", 1)) : b("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Xs = /* @__PURE__ */ Ue(Js, [["__scopeId", "data-v-4fc616d9"]]), Qs = { class: "kb-version-dialog" }, Zs = {
  key: 0,
  class: "kb-version-empty"
}, eo = {
  key: 1,
  class: "kb-version-list"
}, to = { class: "kb-version-item-label" }, ao = ["onClick"], no = { class: "kb-version-actions" }, so = /* @__PURE__ */ Re({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(i, { emit: d }) {
    const c = d;
    function m(_) {
      try {
        return new Date(_).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return _;
      }
    }
    return (_, w) => i.open ? (n(), s("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: w[1] || (w[1] = Zt((C) => c("close"), ["escape"]))
    }, [
      e("div", Qs, [
        w[2] || (w[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        w[3] || (w[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        i.versions.length === 0 ? (n(), s("div", Zs, ' No versions saved yet. Use "Save as version" to create one. ')) : (n(), s("ul", eo, [
          (n(!0), s(V, null, W(i.versions, (C) => (n(), s("li", {
            key: C.id,
            class: "kb-version-item"
          }, [
            e("span", to, u(C.label || m(C.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (I) => {
                c("restore", C.snapshot), c("close");
              }
            }, " Restore ", 8, ao)
          ]))), 128))
        ])),
        e("div", no, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: w[0] || (w[0] = (C) => c("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : b("", !0);
  }
}), Yt = /* @__PURE__ */ Ue(so, [["__scopeId", "data-v-ce35a513"]]), At = [
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
], oo = [
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
], io = { class: "keos-notification-builder" }, lo = { class: "kb-builder-top" }, ro = { class: "kb-push-layout" }, uo = { class: "kb-push-sidebar" }, co = {
  key: 0,
  class: "kb-push-form"
}, po = {
  key: 0,
  class: "kb-hint-card"
}, mo = { class: "kb-push-form-head" }, vo = { class: "kb-push-form-head-top" }, bo = { class: "kb-push-health-pill" }, ho = { class: "kb-push-form-head-row" }, yo = ["value"], fo = { class: "kb-push-health" }, go = { class: "kb-push-health-row" }, ko = { class: "kb-push-health-value" }, _o = { class: "kb-push-health-bar" }, wo = {
  key: 1,
  class: "kb-push-form"
}, $o = { class: "kb-push-canvas" }, xo = {
  key: 0,
  class: "kb-push-test-banner"
}, Co = { class: "kb-push-preview-chrome" }, So = { class: "kb-push-preview-controls" }, Io = { class: "kb-push-preview-as" }, Ao = ["value"], To = { class: "kb-preview-status" }, Ro = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Uo = ["aria-selected", "aria-controls", "onClick"], Lo = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Bo = { class: "kb-push-actions" }, Po = {
  key: 0,
  class: "kb-actions-note"
}, Eo = { key: 0 }, Oo = { class: "kb-push-actions-right" }, No = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Mo = { class: "kb-confirm-dialog" }, Vo = { class: "kb-confirm-actions" }, Wo = /* @__PURE__ */ Re({
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
  setup(i, { emit: d }) {
    const c = i, m = d, _ = re("android"), w = re(""), C = re(!1), I = re(null), S = re(!1), B = g(
      () => R.value.workflow_status ?? "draft"
    ), j = g(() => {
      const a = w.value;
      return a ? Qe.find((o) => o.id === a) ?? null : null;
    });
    function K(a) {
      const o = R.value, h = a.campaign.message ? { ...o.message, ...a.campaign.message } : o.message, v = a.campaign.delivery ? { ...o.delivery, ...a.campaign.delivery } : o.delivery;
      P({
        ...a.campaign,
        message: h,
        delivery: v
      }), I.value = null, C.value = !1;
    }
    function Y(a) {
      const o = a.target.value;
      if (!o) return;
      const h = At.find((v) => v.id === o);
      h && (me.value ? (I.value = h, C.value = !0) : K(h), a.target.value = "");
    }
    function z(a) {
      R.value = a, S.value = !1;
    }
    const {
      campaign: R,
      dirty: me,
      customValidatorErrors: J,
      getValidationWithWarnings: F,
      update: P,
      updateMessage: de,
      updateDelivery: $e,
      undo: Ce,
      redo: _e,
      canUndo: se,
      canRedo: X,
      resetMessage: y,
      resetDelivery: T,
      getPreview: N,
      characterLimits: ue,
      hooks: te
    } = rt({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (a) => {
          var v, E, x, U;
          const o = [];
          (v = a.name) != null && v.trim() || o.push("Template name is required"), (x = (E = a.message) == null ? void 0 : E.body) != null && x.trim() || o.push("Message body is required");
          const h = (U = c.hooks) != null && U.customValidators ? await c.hooks.customValidators(a) : [];
          return [...o, ...h];
        }
      },
      onDirty: () => m("change", R.value)
    }), { lastSavedAt: A } = dt(R, { channel: "push" });
    function ge(a) {
      (a.metaKey || a.ctrlKey) && a.key === "z" && (a.preventDefault(), a.shiftKey ? _e() : Ce());
    }
    nt(() => {
      window.addEventListener("keydown", ge);
    }), st(() => {
      window.removeEventListener("keydown", ge);
    }), Pe(R, (a) => m("update:modelValue", a), { deep: !0 });
    const ye = re(), Se = re(!0), Ie = re(!0);
    async function M() {
      if (te.estimateReach)
        try {
          ye.value = await te.estimateReach(R.value.audience);
        } catch {
          ye.value = void 0;
        }
      te.canSend && (Se.value = await Promise.resolve(te.canSend())), te.canSchedule && (Ie.value = await Promise.resolve(te.canSchedule()));
    }
    M(), Pe(() => R.value.audience, M, { deep: !0 });
    const $ = g(() => (J.value, F(ye.value))), L = g(() => $.value.blockingErrors), Q = g(() => $.value.warnings), ie = g(() => $.value.valid), be = g(() => {
      var v, E, x;
      const a = R.value.message, o = [
        !!((v = R.value.name) != null && v.trim()),
        !!((E = a.title) != null && E.trim()),
        !!((x = a.body) != null && x.trim()),
        !!(a.template_type ?? R.value.template_type),
        Array.isArray(a.actions) ? a.actions.length > 0 : !1
      ], h = o.filter(Boolean).length;
      return Math.round(h / o.length * 100);
    }), pe = g(() => be.value >= 90 ? "Production ready" : be.value >= 70 ? "Strong draft" : be.value >= 40 ? "In progress" : "Needs setup"), le = g(() => {
      const a = R.value.message;
      return !!((a.title ?? "").toString().trim() || (a.body ?? "").toString().trim() || Array.isArray(a.actions) && a.actions.length);
    }), Ae = g(
      () => ue[_.value].title
    ), Le = g(() => ue[_.value].body), Ee = g(() => R.value.message.title.length), We = g(() => R.value.message.body.length), Ye = g(() => {
      if (Ee.value > Ae.value)
        return `Title exceeds ${Ae.value} characters for ${_.value}.`;
    }), Ne = g(() => {
      const a = L.value.find(
        (o) => o.message === "Message body is required"
      );
      if (a) return a.message;
      if (We.value > Le.value)
        return `Body exceeds ${Le} characters for ${_.value}.`;
    }), De = g(
      () => R.value.template_type ?? "transactional"
    );
    function je(a) {
      P({ template_type: a });
    }
    function He(a) {
      P({
        name: a,
        tracking: { ...R.value.tracking ?? {}, campaign_name: a }
      });
    }
    function Me(a) {
      const o = ` {{ .${a.variable} }}`, h = R.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...h, a.variable]));
      a.field === "title" ? de({
        title: R.value.message.title + o,
        variables: v
      }) : de({
        body: R.value.message.body + o,
        variables: v
      });
    }
    function ae() {
      ie.value && m("save", R.value);
    }
    return (a, o) => {
      var h;
      return n(), s("div", io, [
        e("div", lo, [
          Be(ut, {
            "campaign-name": f(R).name,
            status: f(R).status,
            dirty: f(me),
            "last-saved-at": f(A),
            "can-undo": f(se),
            "can-redo": f(X),
            "workflow-status": B.value,
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": He,
            "onUpdate:workflowStatus": o[0] || (o[0] = (v) => f(P)({ workflow_status: v })),
            onUndo: f(Ce),
            onRedo: f(_e)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          L.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: fe({
              background: f(xe).dangerBg,
              border: `1px solid ${f(xe).dangerBorder}`,
              borderRadius: `${f(Je).input}px`,
              padding: `${f(he)[12]}px ${f(he)[16]}px`,
              marginBottom: `${f(he)[16]}px`
            })
          }, [
            e("ul", {
              style: fe({ margin: 0, paddingLeft: "1.25rem", color: f(xe).danger })
            }, [
              (n(!0), s(V, null, W(L.value, (v) => (n(), s("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", ro, [
          e("aside", uo, [
            i.disabledSections.includes("message") ? b("", !0) : (n(), s("div", co, [
              !f(R).message.title && !f(R).message.body ? (n(), s("div", po, " Add a title and message below to get started. ")) : b("", !0),
              e("div", mo, [
                e("div", vo, [
                  o[12] || (o[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", bo, u(pe.value), 1)
                ]),
                e("div", ho, [
                  Be(_t, {
                    "template-type": De.value,
                    onUpdate: je
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: Y
                  }, [
                    o[13] || (o[13] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(V, null, W(f(At), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, yo))), 128))
                  ], 32)
                ]),
                e("div", fo, [
                  e("div", go, [
                    o[14] || (o[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", ko, u(be.value) + "%", 1)
                  ]),
                  e("div", _o, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: fe({ width: `${be.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(vn, {
                message: f(R).message,
                "title-count": Ee.value,
                "body-count": We.value,
                "title-limit": Ae.value,
                "body-limit": Le.value,
                "selected-platform": _.value,
                "show-reset": !0,
                "title-error": Ye.value,
                "body-error": Ne.value,
                onUpdate: f(de),
                onReset: o[1] || (o[1] = (v) => f(y)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Be(zt, {
                message: f(R).message,
                "variable-options": i.variableOptions,
                onUpdate: f(de),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !i.designOnly && !i.disabledSections.includes("delivery") ? (n(), s("div", wo, [
              o[15] || (o[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Be(es, {
                delivery: f(R).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: f($e),
                onReset: o[2] || (o[2] = (v) => f(T)())
              }, null, 8, ["delivery", "onUpdate"]),
              Be(ds, {
                delivery: f(R).delivery,
                onUpdate: f($e)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : b("", !0)
          ]),
          e("main", $o, [
            !i.designOnly && f(R).audience.test_mode ? (n(), s("div", xo, [...o[16] || (o[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              Z(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Co, [
              e("div", So, [
                e("label", Io, [
                  o[18] || (o[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ve(e("select", {
                    "onUpdate:modelValue": o[3] || (o[3] = (v) => w.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[17] || (o[17] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(V, null, W(f(Qe), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Ao))), 128))
                  ], 512), [
                    [ze, w.value]
                  ])
                ]),
                e("div", To, [
                  o[19] || (o[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(_.value), 1)
                ])
              ]),
              e("div", Ro, [
                (n(), s(V, null, W(["android", "ios", "web"], (v) => e("button", {
                  key: v,
                  type: "button",
                  class: ve(["kb-push-device-btn", { "kb-push-device-btn--active": _.value === v }]),
                  role: "tab",
                  "aria-selected": _.value === v,
                  "aria-controls": `kb-preview-panel-${v}`,
                  onClick: (E) => _.value = v
                }, u(v.toUpperCase()), 11, Uo)), 64))
              ]),
              e("div", {
                class: ve(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !le.value }])
              }, [
                !f(R).message.title && !f(R).message.body ? (n(), s("div", Lo, [...o[20] || (o[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (n(), ea(Xs, {
                  key: 1,
                  "get-preview": f(N),
                  "selected-platform": _.value,
                  "preview-profile": j.value,
                  message: f(R).message,
                  delivery: f(R).delivery,
                  "onUpdate:selectedPlatform": o[4] || (o[4] = (v) => _.value = v)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", Bo, [
          Q.value.length > 0 ? (n(), s("div", Po, [
            o[21] || (o[21] = e("strong", null, "Warning:", -1)),
            Z(" " + u((h = Q.value[0]) == null ? void 0 : h.message) + " ", 1),
            Q.value.length > 1 ? (n(), s("span", Eo, " (+" + u(Q.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", Oo, [
            !i.designOnly && i.showHistory ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[5] || (o[5] = (v) => S.value = !0)
            }, " Version history ")) : b("", !0),
            !i.designOnly && i.showSaveVersion ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[6] || (o[6] = (v) => m("save-version", JSON.parse(JSON.stringify(f(R)))))
            }, " Save as version ")) : b("", !0),
            i.showDuplicate ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[7] || (o[7] = (v) => m("duplicate", JSON.parse(JSON.stringify(f(R)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (n(), s("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: ae
            }, " Save ")) : b("", !0),
            i.showClose ? (n(), s("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: o[8] || (o[8] = (v) => m("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        C.value ? (n(), s("div", No, [
          e("div", Mo, [
            o[22] || (o[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[23] || (o[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Vo, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: o[9] || (o[9] = (v) => {
                  C.value = !1, I.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: o[10] || (o[10] = (v) => I.value && K(I.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0),
        Be(Yt, {
          open: S.value,
          versions: i.versions,
          onClose: o[11] || (o[11] = (v) => S.value = !1),
          onRestore: z
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Kt = /* @__PURE__ */ Ue(Wo, [["__scopeId", "data-v-18771e1a"]]), Do = { class: "kb-section" }, jo = { class: "kb-section__head" }, Ho = { class: "kb-summary-bar" }, Fo = { class: "kb-pill kb-pill--category" }, qo = { class: "kb-pill kb-pill--format" }, zo = { class: "kb-pill kb-pill--status" }, Yo = { class: "kb-field" }, Ko = ["value"], Go = ["value", "disabled"], Jo = { class: "kb-field" }, Xo = { class: "kb-label" }, Qo = { class: "kb-helper" }, Zo = ["value"], ei = ["value", "disabled"], ti = { class: "kb-field" }, ai = ["value"], ni = { class: "kb-field kb-field--inline kb-field--language-limits" }, si = { class: "kb-field-half" }, oi = ["value"], ii = { class: "kb-field" }, li = ["value"], ri = {
  key: 0,
  class: "kb-field"
}, di = { class: "kb-label" }, ui = ["value"], ci = {
  key: 1,
  class: "kb-field"
}, pi = ["value"], mi = {
  key: 2,
  class: "kb-field"
}, vi = ["value"], bi = {
  key: 3,
  class: "kb-field"
}, hi = ["value"], yi = {
  key: 4,
  class: "kb-field"
}, fi = ["value"], gi = {
  key: 5,
  class: "kb-field"
}, ki = ["value"], _i = ["value"], wi = {
  key: 6,
  class: "kb-field"
}, $i = { class: "kb-wa-buttons" }, xi = ["value", "onInput"], Ci = ["value", "onInput"], Si = ["value", "onInput"], Ii = ["value", "onInput"], Ai = ["onClick"], Ti = ["disabled"], Ri = {
  key: 7,
  class: "kb-field"
}, Ui = { class: "kb-wa-buttons" }, Li = ["value", "onInput"], Bi = ["value", "onInput"], Pi = ["onClick"], Ei = {
  key: 8,
  class: "kb-field"
}, Oi = ["value"], Ni = ["value"], Mi = { class: "kb-field" }, Vi = { class: "kb-label" }, Wi = ["value"], Di = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, ji = { class: "kb-wa-fields-list" }, Hi = { class: "kb-wa-field-name" }, Fi = { class: "kb-wa-field-status" }, qi = { class: "kb-field" }, zi = ["value"], Yi = {
  key: 10,
  class: "kb-field"
}, Ki = { class: "kb-wa-buttons" }, Gi = ["value", "onInput"], Ji = ["value", "onChange"], Xi = ["value", "onInput"], Qi = ["value", "onInput"], Zi = {
  key: 2,
  class: "kb-opt-out-note"
}, el = ["onClick"], tl = ["disabled"], pt = 60, mt = 1024, vt = 60, bt = 10, Ut = 10, al = /* @__PURE__ */ Re({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(i, { emit: d }) {
    const c = i, m = d, _ = [
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
    ], w = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], C = g(() => c.message), I = g(() => C.value.template_type ?? "text"), S = g(() => C.value.header_type ?? "none"), B = g(() => String(C.value.header ?? "")), j = g(() => String(C.value.body ?? "")), K = g(() => String(C.value.footer ?? "")), Y = g(() => C.value.buttons ?? []), z = g(() => C.value.products ?? []), R = g(() => C.value.cards ?? []), me = g(() => {
      const M = _.find(($) => $.value === I.value);
      return (M == null ? void 0 : M.hint) ?? "Choose the approved WhatsApp template format.";
    }), J = g(() => {
      const M = String(C.value.template_category ?? "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "Uncategorized";
    }), F = g(() => {
      const M = _.find(($) => $.value === I.value);
      return (M == null ? void 0 : M.label) ?? "Text";
    }), P = g(() => C.value.template_name ? j.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), de = g(() => new Set((c.disabledCategories ?? []).map((M) => String(M).trim()))), $e = g(() => new Set((c.disabledFormats ?? []).map((M) => String(M).trim())));
    function Ce(M) {
      if (!M || typeof M != "string") return [];
      const $ = /\{\{\s*([^}]+?)\s*\}\}/g, L = /* @__PURE__ */ new Set();
      let Q;
      for (; (Q = $.exec(M)) !== null; ) L.add(Q[1].trim());
      return Array.from(L);
    }
    const _e = g(() => {
      const M = c.message.header ?? "", $ = c.message.body ?? c.message.body ?? "", L = new Set(c.message.variables ?? []), Q = [...Ce(M), ...Ce($)];
      return Array.from(new Set(Q)).map((be) => ({ name: be, configured: L.has(be) }));
    });
    function se(M) {
      m("update", M);
    }
    function X(M) {
      const $ = {
        template_category: M || void 0
      };
      M === "authentication" && I.value !== "auth" && ($.template_type = "auth"), se($);
    }
    function y(M) {
      const $ = { template_type: M };
      M === "auth" && ($.template_category = "authentication"), M === "image" || M === "video" || M === "document" ? $.header_type = M : (S.value === "image" || S.value === "video" || S.value === "document") && ($.header_type = "none"), se($);
    }
    function T(M, $) {
      var Q;
      const L = [...Y.value];
      L[M] = {
        ...L[M],
        id: ((Q = L[M]) == null ? void 0 : Q.id) || `btn_${M + 1}`,
        ...$
      }, se({ buttons: L });
    }
    function N(M) {
      const $ = [...Y.value];
      $.splice(M, 1), se({ buttons: $ });
    }
    function ue() {
      const M = [...Y.value];
      M.push({ id: `btn_${M.length + 1}`, label: "", type: "quick_reply" }), se({ buttons: M });
    }
    function te(M, $) {
      var Q;
      const L = [...z.value];
      L[M] = {
        ...L[M],
        id: ((Q = L[M]) == null ? void 0 : Q.id) || `prod_${M + 1}`,
        ...$
      }, se({ products: L });
    }
    function A(M) {
      const $ = [...z.value];
      $.splice(M, 1), se({ products: $ });
    }
    function ge() {
      const M = [...z.value];
      M.push({ id: `prod_${M.length + 1}`, productId: "" }), se({ products: M });
    }
    function ye(M, $) {
      var Q;
      const L = [...R.value];
      L[M] = {
        ...L[M],
        id: ((Q = L[M]) == null ? void 0 : Q.id) || `card_${M + 1}`,
        ...$
      }, se({ cards: L });
    }
    function Se(M) {
      const $ = [...R.value];
      $.splice(M, 1), se({ cards: $ });
    }
    function Ie() {
      const M = [...R.value];
      M.push({
        id: `card_${M.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), se({ cards: M });
    }
    return (M, $) => (n(), s("section", Do, [
      e("div", jo, [
        $[16] || ($[16] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        i.showReset ? (n(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: $[0] || ($[0] = (L) => M.$emit("reset"))
        }, " Reset section ")) : b("", !0)
      ]),
      $[42] || ($[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", Ho, [
        e("span", Fo, u(J.value), 1),
        e("span", qo, u(F.value), 1),
        e("span", zo, u(P.value), 1)
      ]),
      e("div", Yo, [
        $[18] || ($[18] = e("label", { class: "kb-label" }, [
          Z(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: C.value.template_category ?? "",
          onChange: $[1] || ($[1] = (L) => X(L.target.value))
        }, [
          $[17] || ($[17] = e("option", { value: "" }, "Select category", -1)),
          (n(), s(V, null, W(w, (L) => e("option", {
            key: L.value,
            value: L.value,
            disabled: de.value.has(L.value)
          }, u(L.label) + u(de.value.has(L.value) ? " (Disabled)" : ""), 9, Go)), 64))
        ], 40, Ko)
      ]),
      e("div", Jo, [
        e("label", Xo, [
          $[19] || ($[19] = Z(" Functional format ", -1)),
          e("span", Qo, u(me.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: I.value,
          onChange: $[2] || ($[2] = (L) => y(L.target.value))
        }, [
          (n(), s(V, null, W(_, (L) => e("option", {
            key: L.value,
            value: L.value,
            disabled: $e.value.has(L.value)
          }, u(L.label) + u($e.value.has(L.value) ? " (Disabled)" : ""), 9, ei)), 64))
        ], 40, Zo)
      ]),
      e("div", ti, [
        $[20] || ($[20] = e("label", { class: "kb-label" }, [
          Z(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: C.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, ai)
      ]),
      e("div", ni, [
        e("div", si, [
          $[21] || ($[21] = e("label", { class: "kb-label" }, [
            Z(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: C.value.template_language ?? "",
            onInput: $[3] || ($[3] = (L) => se({
              template_language: L.target.value || void 0
            }))
          }, null, 40, oi)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            $[22] || ($[22] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + u(pt) + " chars"),
              e("li", null, "Body: " + u(mt) + " chars"),
              e("li", null, "Footer: " + u(vt) + " chars"),
              e("li", null, "Buttons: up to " + u(bt))
            ])
          ])
        ])
      ]),
      e("div", ii, [
        $[24] || ($[24] = e("label", { class: "kb-label" }, [
          Z(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: S.value,
          onChange: $[4] || ($[4] = (L) => se({ header_type: L.target.value }))
        }, [...$[23] || ($[23] = [
          et('<option value="none" data-v-4f6d05a9>No header</option><option value="text" data-v-4f6d05a9>Text header</option><option value="image" data-v-4f6d05a9>Image header</option><option value="video" data-v-4f6d05a9>Video header</option><option value="document" data-v-4f6d05a9>Document header</option>', 5)
        ])], 40, li)
      ]),
      S.value === "text" ? (n(), s("div", ri, [
        e("label", di, [
          $[25] || ($[25] = Z(" Header text ", -1)),
          e("span", {
            class: ve(["kb-counter", { "kb-counter--warn": B.value.length > pt }])
          }, u(B.value.length) + "/" + u(pt), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: B.value,
          onInput: $[5] || ($[5] = (L) => se({
            header: L.target.value || void 0
          }))
        }, null, 40, ui)
      ])) : b("", !0),
      ["image", "video", "document"].includes(S.value) || ["image", "video", "document"].includes(I.value) ? (n(), s("div", ci, [
        $[26] || ($[26] = e("label", { class: "kb-label" }, [
          Z(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: C.value.media_url ?? "",
          onInput: $[6] || ($[6] = (L) => se({
            media_url: L.target.value || void 0
          }))
        }, null, 40, pi)
      ])) : b("", !0),
      S.value === "document" || I.value === "document" ? (n(), s("div", mi, [
        $[27] || ($[27] = e("label", { class: "kb-label" }, [
          Z(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: C.value.document_filename ?? "",
          onInput: $[7] || ($[7] = (L) => se({
            document_filename: L.target.value || void 0
          }))
        }, null, 40, vi)
      ])) : b("", !0),
      ["image", "video", "document"].includes(S.value) || ["image", "video", "document"].includes(I.value) ? (n(), s("div", bi, [
        $[28] || ($[28] = e("label", { class: "kb-label" }, [
          Z(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: C.value.media_caption ?? "",
          onInput: $[8] || ($[8] = (L) => se({
            media_caption: L.target.value || void 0
          }))
        }, null, 40, hi)
      ])) : b("", !0),
      I.value === "lto" ? (n(), s("div", yi, [
        $[29] || ($[29] = e("label", { class: "kb-label" }, [
          Z(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: C.value.lto_expiry ?? "",
          onInput: $[9] || ($[9] = (L) => se({
            lto_expiry: L.target.value || void 0
          }))
        }, null, 40, fi)
      ])) : b("", !0),
      I.value === "flow" ? (n(), s("div", gi, [
        $[30] || ($[30] = e("label", { class: "kb-label" }, [
          Z(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: C.value.flow_id ?? "",
          onInput: $[10] || ($[10] = (L) => se({
            flow_id: L.target.value || void 0
          }))
        }, null, 40, ki),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: C.value.flow_cta_label ?? "",
          onInput: $[11] || ($[11] = (L) => se({
            flow_cta_label: L.target.value || void 0
          }))
        }, null, 40, _i)
      ])) : b("", !0),
      I.value === "carousel" ? (n(), s("div", wi, [
        e("label", { class: "kb-label" }, [
          $[31] || ($[31] = Z(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + u(Ut) + " cards.")
        ]),
        e("div", $i, [
          (n(!0), s(V, null, W(R.value, (L, Q) => (n(), s("div", {
            key: L.id || Q,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: L.title ?? "",
              onInput: (ie) => ye(Number(Q), { title: ie.target.value })
            }, null, 40, xi),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: L.media_url ?? "",
              onInput: (ie) => ye(Number(Q), { media_url: ie.target.value })
            }, null, 40, Ci),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: L.button_label ?? "",
              onInput: (ie) => ye(Number(Q), { button_label: ie.target.value })
            }, null, 40, Si),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: L.button_url ?? "",
              onInput: (ie) => ye(Number(Q), { button_url: ie.target.value })
            }, null, 40, Ii),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ie) => Se(Number(Q))
            }, "Remove", 8, Ai)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: R.value.length >= Ut,
            onClick: Ie
          }, " Add card ", 8, Ti)
        ])
      ])) : b("", !0),
      ["mpm", "catalog"].includes(I.value) ? (n(), s("div", Ri, [
        $[32] || ($[32] = e("label", { class: "kb-label" }, [
          Z(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", Ui, [
          (n(!0), s(V, null, W(z.value, (L, Q) => (n(), s("div", {
            key: L.id || Q,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: L.productId,
              onInput: (ie) => te(Number(Q), { productId: ie.target.value })
            }, null, 40, Li),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: L.sectionTitle,
              onInput: (ie) => te(Number(Q), { sectionTitle: ie.target.value || void 0 })
            }, null, 40, Bi),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ie) => A(Number(Q))
            }, " Remove ", 8, Pi)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: ge
          }, " Add product ")
        ])
      ])) : b("", !0),
      I.value === "auth" ? (n(), s("div", Ei, [
        $[34] || ($[34] = e("label", { class: "kb-label" }, [
          Z(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: C.value.auth_type ?? "otp",
          onChange: $[12] || ($[12] = (L) => se({
            auth_type: L.target.value
          }))
        }, [...$[33] || ($[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, Oi),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: C.value.auth_label ?? "",
          onInput: $[13] || ($[13] = (L) => se({
            auth_label: L.target.value || void 0
          }))
        }, null, 40, Ni)
      ])) : b("", !0),
      e("div", Mi, [
        e("label", Vi, [
          $[35] || ($[35] = Z(" Body ", -1)),
          $[36] || ($[36] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: ve(["kb-counter", { "kb-counter--warn": j.value.length > mt }])
          }, u(j.value.length) + "/" + u(mt), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
          value: j.value,
          onInput: $[14] || ($[14] = (L) => se({
            body: L.target.value || void 0
          }))
        }, null, 40, Wi)
      ]),
      _e.value.length > 0 ? (n(), s("div", Di, [
        $[37] || ($[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        $[38] || ($[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", ji, [
          (n(!0), s(V, null, W(_e.value, (L) => (n(), s("li", {
            key: L.name,
            class: ve(["kb-wa-field-item", { "kb-wa-field-item--ok": L.configured }])
          }, [
            e("span", Hi, u(L.name), 1),
            e("span", Fi, u(L.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : b("", !0),
      e("div", qi, [
        $[39] || ($[39] = e("label", { class: "kb-label" }, [
          Z(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: K.value,
          onInput: $[15] || ($[15] = (L) => se({
            footer: L.target.value || void 0
          }))
        }, null, 40, zi),
        e("div", {
          class: ve(["kb-counter kb-counter--inline", { "kb-counter--warn": K.value.length > vt }])
        }, u(K.value.length) + "/" + u(vt), 3)
      ]),
      j.value.trim().length > 0 ? (n(), s("div", Yi, [
        e("label", { class: "kb-label" }, [
          $[40] || ($[40] = Z(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + u(bt) + " buttons. ")
        ]),
        e("div", Ki, [
          (n(!0), s(V, null, W(Y.value, (L, Q) => (n(), s("div", {
            key: L.id || Q,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: L.label,
              onInput: (ie) => T(Number(Q), { label: ie.target.value })
            }, null, 40, Gi),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: L.type ?? "quick_reply",
              onChange: (ie) => T(Number(Q), { type: ie.target.value })
            }, [...$[41] || ($[41] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, Ji),
            L.type === "url" ? (n(), s("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: L.url,
              onInput: (ie) => T(Number(Q), { url: ie.target.value || void 0 })
            }, null, 40, Xi)) : L.type === "call" ? (n(), s("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: L.phone,
              onInput: (ie) => T(Number(Q), { phone: ie.target.value || void 0 })
            }, null, 40, Qi)) : L.type === "opt_out" ? (n(), s("span", Zi, " Sends a built-in opt-out action. ")) : b("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ie) => N(Number(Q))
            }, " Remove ", 8, el)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: Y.value.length >= bt,
            onClick: ue
          }, " Add button ", 8, tl)
        ])
      ])) : b("", !0)
    ]));
  }
}), nl = /* @__PURE__ */ Ue(al, [["__scopeId", "data-v-4f6d05a9"]]), sl = { class: "wa-preview-root" }, ol = { class: "wa-device" }, il = { class: "wa-screen" }, ll = { class: "wa-header" }, rl = { class: "wa-titleblock" }, dl = { class: "wa-title-row" }, ul = { class: "wa-title" }, cl = { class: "wa-subtitle" }, pl = {
  key: 0,
  class: "wa-flow-shell"
}, ml = { class: "wa-flow-header" }, vl = { class: "wa-flow-title" }, bl = { class: "wa-flow-content" }, hl = { class: "wa-flow-eyebrow" }, yl = {
  key: 0,
  class: "wa-flow-products"
}, fl = { class: "wa-flow-footer" }, gl = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, kl = { class: "wa-managed" }, _l = {
  key: 1,
  class: "wa-thread"
}, wl = { class: "wa-secure-banner" }, $l = { class: "wa-msg wa-msg--in" }, xl = { class: "wa-template-card" }, Cl = {
  key: 0,
  class: "wa-card-media"
}, Sl = ["src"], Il = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, Al = ["src"], Tl = { class: "wa-card-media-doc-icon" }, Rl = ["title"], Ul = {
  key: 3,
  class: "wa-card-media-fallback"
}, Ll = { class: "wa-card-media-tag" }, Bl = { class: "wa-card-media-sub" }, Pl = {
  key: 1,
  class: "wa-card-header-text"
}, El = ["innerHTML"], Ol = {
  key: 2,
  class: "wa-link-preview"
}, Nl = { class: "wa-link-preview-head" }, Ml = { class: "wa-link-preview-text" }, Vl = ["href"], Wl = {
  key: 3,
  class: "wa-inline-note"
}, Dl = {
  key: 4,
  class: "wa-inline-note"
}, jl = {
  key: 5,
  class: "wa-inline-note"
}, Hl = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Fl = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, ql = {
  key: 8,
  class: "wa-product-list"
}, zl = { class: "wa-product-name" }, Yl = { class: "wa-product-price" }, Kl = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Gl = {
  key: 10,
  class: "wa-template-actions"
}, Jl = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Xl = { class: "wa-order-card" }, Ql = { class: "wa-order-card-top" }, Zl = ["src"], er = { type: "button" }, tr = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, ar = { class: "wa-document-card" }, nr = { class: "wa-document-file" }, sr = { class: "wa-document-icon" }, or = ["title"], ir = { class: "wa-document-caption" }, lr = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, rr = { class: "wa-voice-card" }, dr = { class: "wa-voice-top" }, ur = { class: "wa-voice-profile" }, cr = ["src"], pr = { class: "wa-voice-duration" }, mr = { class: "wa-voice-transcript" }, vr = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, br = { class: "wa-contact-card" }, hr = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, yr = { class: "wa-location-card" }, fr = { class: "wa-location-content" }, gr = { type: "button" }, kr = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, _r = { class: "wa-carousel-track" }, wr = { type: "button" }, $r = { class: "wa-msg wa-msg--out" }, xr = { class: "wa-bubble wa-bubble--out" }, Cr = { class: "wa-bubble-author" }, Sr = {
  key: 0,
  class: "wa-reaction"
}, Ir = { class: "wa-msg wa-msg--in" }, Ar = { class: "wa-bubble wa-bubble--in" }, Tr = /* @__PURE__ */ Re({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(i) {
    const d = i;
    function c(y) {
      return String(y).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = g(() => {
      var N;
      const y = ((N = d.template) == null ? void 0 : N.body) ?? "";
      return c(y).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), _ = g(() => d.template.templateName || "Ecoshop"), w = g(() => "Business Account"), C = g(() => d.template.format === "flow" || !!d.template.flow), I = g(() => {
      var y;
      return (y = d.template.buttons) == null ? void 0 : y[0];
    }), S = g(() => {
      var y, T;
      return ((y = I.value) == null ? void 0 : y.text) || ((T = d.template.flow) == null ? void 0 : T.ctaLabel) || "";
    }), B = g(() => d.template.buttons ?? []), j = g(() => {
      var y;
      return (((y = d.template.multiProduct) == null ? void 0 : y.length) ?? 0) > 0;
    }), K = g(() => (d.template.format || "text").toUpperCase()), Y = g(() => {
      const y = d.template.header;
      return !y || y.type === "text" ? "" : y.type === "image" ? y.url || "Image" : y.type === "video" ? y.url || "Video" : y.filename || y.url || "Document";
    }), z = g(() => {
      const y = d.template.header;
      if (!(!y || y.type !== "image" || !y.url))
        return { backgroundImage: `url(${y.url})` };
    });
    function R(y) {
      if (!y) return "";
      try {
        const T = y.split("?")[0].split("#")[0], N = T.substring(T.lastIndexOf("/") + 1);
        return decodeURIComponent(N || "");
      } catch {
        return "";
      }
    }
    const me = g(() => {
      const y = d.template.header;
      return !y || y.type !== "document" ? "" : y.filename || R(y.url) || "document.pdf";
    }), J = g(() => {
      const y = (d.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (y == null ? void 0 : y[0]) || "";
    });
    function F(y) {
      try {
        return new URL(y).hostname;
      } catch {
        return "example.com";
      }
    }
    const P = g(() => {
      const y = d.template.linkPreview;
      return !y && !J.value ? null : {
        title: (y == null ? void 0 : y.title) || "Link preview",
        description: (y == null ? void 0 : y.description) || "Preview from your WhatsApp template link.",
        domain: (y == null ? void 0 : y.domain) || (J.value ? F(J.value) : "example.com"),
        url: (y == null ? void 0 : y.url) || J.value || "#",
        thumbnail: (y == null ? void 0 : y.thumbnail) || ""
      };
    }), de = g(() => {
      var N, ue, te;
      const T = (te = (((N = d.template.documentCard) == null ? void 0 : N.filename) || ((ue = d.template.header) == null ? void 0 : ue.filename) || "").split(".").pop()) == null ? void 0 : te.trim().toUpperCase();
      return T ? T.slice(0, 4) : "DOC";
    });
    function $e(y, T) {
      return y === "phone_number" ? "wa-btn-icon--phone" : y === "url" ? "wa-btn-icon--external" : y === "copy_code" ? "wa-btn-icon--code" : y === "opt_out" || (T || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (T || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const Ce = g(() => {
      var y;
      return d.template.location || d.template.locationRequest ? "wa-side-icon--info" : ((y = d.template.header) == null ? void 0 : y.type) === "video" || d.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), _e = g(() => {
      var T, N, ue;
      const y = d.template;
      return y.format === "flow" ? "Thanks, we received your preferences." : (T = y.auth) != null && T.code ? "Use the verification code and let us know if it works." : (N = y.coupon) != null && N.code ? `Your coupon ${y.coupon.code} is active now.` : y.limitedOffer ? `Great choice. This offer is valid until ${y.limitedOffer}.` : (ue = d.template.multiProduct) != null && ue.length ? `Here are ${d.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), se = g(() => {
      var T, N;
      const y = d.template;
      return y.location ? y.location.name || y.location.address || `${y.location.lat}, ${y.location.lng}` : (T = y.auth) != null && T.code ? `Verification code: ${y.auth.code}` : (N = y.flow) != null && N.id ? `Flow ID: ${y.flow.id}` : y.templateLanguage ? `Template language: ${y.templateLanguage}` : `Category: ${y.templateCategory || "utility"} • Format: ${y.format || "text"}`;
    }), X = g(() => {
      var N, ue;
      const y = d.template;
      if ((N = y.multiProduct) != null && N.length) return y.multiProduct.slice(0, 5).map((te) => te.name || "Product");
      if ((ue = y.buttons) != null && ue.length) return y.buttons.slice(0, 5).map((te) => te.text || "Option");
      const T = (y.body || "").split(/\n|\.|,/).map((te) => te.trim()).filter(Boolean).slice(0, 5);
      return T.length ? T : ["Option A", "Option B", "Option C"];
    });
    return (y, T) => {
      var N, ue, te, A, ge, ye, Se, Ie, M, $, L, Q, ie, be;
      return n(), s("div", sl, [
        e("div", ol, [
          e("div", il, [
            T[30] || (T[30] = et('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", ll, [
              T[7] || (T[7] = e("span", { class: "wa-back" }, "←", -1)),
              T[8] || (T[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", rl, [
                e("div", dl, [
                  e("span", ul, u(_.value), 1),
                  T[6] || (T[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", cl, u(w.value), 1)
              ]),
              T[9] || (T[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            C.value ? (n(), s("div", pl, [
              T[14] || (T[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", ml, [
                T[10] || (T[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", vl, u(_.value), 1),
                T[11] || (T[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", bl, [
                e("p", hl, u(i.template.body || "Please choose an option below."), 1),
                (n(!0), s(V, null, W(X.value, (pe, le) => (n(), s("div", {
                  key: `flow-opt-${le}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, u(pe), 1),
                  e("span", {
                    class: ve(["wa-radio", { "wa-radio--on": le === 0 }])
                  }, null, 2)
                ]))), 128)),
                (N = i.template.multiProduct) != null && N.length ? (n(), s("div", yl, [
                  (n(!0), s(V, null, W(i.template.multiProduct.slice(0, 3), (pe, le) => (n(), s("div", {
                    key: le,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, u(pe.name || "Product"), 1),
                      e("p", null, u(pe.price || "Price on request"), 1)
                    ]),
                    T[12] || (T[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : b("", !0)
              ]),
              e("div", fl, [
                S.value ? (n(), s("button", gl, u(S.value), 1)) : b("", !0),
                e("p", kl, [
                  T[13] || (T[13] = Z("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: T[0] || (T[0] = at(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (n(), s("div", _l, [
              T[29] || (T[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", wl, [
                T[15] || (T[15] = e("span", null, "●", -1)),
                T[16] || (T[16] = Z(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: T[1] || (T[1] = at(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", $l, [
                e("div", xl, [
                  i.template.header && i.template.header.type !== "text" ? (n(), s("div", Cl, [
                    i.template.header.type === "image" && i.template.header.url ? (n(), s("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: i.template.header.url,
                      alt: "Header media"
                    }, null, 8, Sl)) : i.template.header.type === "video" && i.template.header.url ? (n(), s("div", Il, [
                      e("video", {
                        src: i.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, Al),
                      T[17] || (T[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : i.template.header.type === "document" ? (n(), s("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: T[2] || (T[2] = at(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", Tl, u(de.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: me.value
                      }, u(me.value), 9, Rl)
                    ])) : (n(), s("div", Ul, [
                      e("div", Ll, u(K.value) + " TEMPLATE", 1),
                      e("div", Bl, u(Y.value), 1),
                      z.value ? (n(), s("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: fe(z.value)
                      }, null, 4)) : b("", !0)
                    ]))
                  ])) : (ue = i.template.header) != null && ue.text ? (n(), s("div", Pl, u(i.template.header.text), 1)) : b("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: m.value
                  }, null, 8, El),
                  P.value ? (n(), s("div", Ol, [
                    e("div", Nl, [
                      P.value.thumbnail ? (n(), s("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: fe({ backgroundImage: `url(${P.value.thumbnail})` })
                      }, null, 4)) : b("", !0),
                      e("div", Ml, [
                        e("strong", null, u(P.value.title), 1),
                        e("p", null, u(P.value.description), 1),
                        e("span", null, u(P.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: P.value.url,
                      onClick: T[3] || (T[3] = at(() => {
                      }, ["prevent"]))
                    }, u(P.value.url), 9, Vl)
                  ])) : b("", !0),
                  i.template.location ? (n(), s("div", Wl, " 📍 " + u(i.template.location.name || i.template.location.address || `${i.template.location.lat}, ${i.template.location.lng}`), 1)) : b("", !0),
                  (te = i.template.coupon) != null && te.code ? (n(), s("div", Dl, [
                    T[18] || (T[18] = Z(" Coupon: ", -1)),
                    e("strong", null, u(i.template.coupon.code), 1)
                  ])) : b("", !0),
                  (A = i.template.auth) != null && A.code ? (n(), s("div", jl, [
                    T[19] || (T[19] = Z(" Verification code: ", -1)),
                    e("strong", null, u(i.template.auth.code), 1)
                  ])) : b("", !0),
                  i.template.limitedOffer ? (n(), s("div", Hl, " Expires: " + u(i.template.limitedOffer), 1)) : b("", !0),
                  i.template.footer ? (n(), s("div", Fl, u(i.template.footer), 1)) : b("", !0),
                  j.value ? (n(), s("div", ql, [
                    (n(!0), s(V, null, W((ge = i.template.multiProduct) == null ? void 0 : ge.slice(0, 4), (pe, le) => (n(), s("div", {
                      key: `prod-${le}`,
                      class: "wa-product-row"
                    }, [
                      e("span", zl, u(pe.name || `Item ${le + 1}`), 1),
                      e("span", Yl, u(pe.price || "-"), 1)
                    ]))), 128))
                  ])) : b("", !0),
                  S.value ? (n(), s("button", Kl, [
                    I.value ? (n(), s("span", {
                      key: 0,
                      class: ve(["wa-btn-icon", $e(I.value.type, I.value.value || I.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : b("", !0),
                    Z(" " + u(S.value), 1)
                  ])) : b("", !0),
                  B.value.length > 1 ? (n(), s("div", Gl, [
                    (n(!0), s(V, null, W(B.value.slice(1, 4), (pe, le) => (n(), s("button", {
                      key: `action-${le}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ve(["wa-btn-icon", $e(pe.type, pe.value || pe.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      Z(" " + u(pe.text), 1)
                    ]))), 128))
                  ])) : b("", !0),
                  T[20] || (T[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ve(["wa-side-icon", Ce.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              i.template.orderCard ? (n(), s("div", Jl, [
                e("div", Xl, [
                  e("div", Ql, [
                    i.template.orderCard.image ? (n(), s("img", {
                      key: 0,
                      src: i.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Zl)) : b("", !0),
                    e("div", null, [
                      e("strong", null, u(i.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, u(i.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", er, u(i.template.orderCard.buttonLabel || "View"), 1),
                  T[21] || (T[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : b("", !0),
              i.template.documentCard || ((ye = i.template.header) == null ? void 0 : ye.type) === "document" ? (n(), s("div", tr, [
                e("div", ar, [
                  e("div", nr, [
                    e("span", sr, u(de.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((Se = i.template.documentCard) == null ? void 0 : Se.filename) || ((Ie = i.template.header) == null ? void 0 : Ie.filename) || "document.pdf"
                      }, u(((M = i.template.documentCard) == null ? void 0 : M.filename) || (($ = i.template.header) == null ? void 0 : $.filename) || "document.pdf"), 9, or),
                      e("p", null, u(((L = i.template.documentCard) == null ? void 0 : L.size) || "243 KB • html"), 1)
                    ]),
                    T[22] || (T[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", ir, u(((Q = i.template.documentCard) == null ? void 0 : Q.caption) || i.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : b("", !0),
              i.template.voiceNote ? (n(), s("div", lr, [
                e("div", rr, [
                  e("div", dr, [
                    T[24] || (T[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    T[25] || (T[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", ur, [
                      i.template.voiceNote.profileImage ? (n(), s("img", {
                        key: 0,
                        src: i.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, cr)) : b("", !0),
                      T[23] || (T[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", pr, u(i.template.voiceNote.duration || "0:10"), 1),
                  e("p", mr, u(i.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : b("", !0),
              i.template.contactCard ? (n(), s("div", vr, [
                e("div", br, [
                  e("strong", null, u(i.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, u(i.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, u(i.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, u(i.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, u(i.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : b("", !0),
              i.template.location && i.template.locationRequest ? (n(), s("div", hr, [
                e("div", yr, [
                  T[26] || (T[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", fr, [
                    e("strong", null, u(i.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: T[4] || (T[4] = at(() => {
                      }, ["prevent"]))
                    }, u(i.template.location.address || `${i.template.location.lat}, ${i.template.location.lng}`), 1)
                  ]),
                  e("button", gr, u(i.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : b("", !0),
              (ie = i.template.carouselCards) != null && ie.length ? (n(), s("div", kr, [
                e("div", _r, [
                  (n(!0), s(V, null, W(i.template.carouselCards.slice(0, 4), (pe, le) => (n(), s("article", {
                    key: `c-${le}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: fe(pe.image ? { backgroundImage: `url(${pe.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, u(pe.title || `Card ${le + 1}`), 1),
                    e("p", null, u(pe.description || "Card description"), 1),
                    e("button", wr, u(pe.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : b("", !0),
              e("div", $r, [
                e("div", xr, [
                  e("span", Cr, u(_.value), 1),
                  e("p", null, u(_e.value), 1),
                  T[27] || (T[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  i.template.reactionEmoji ? (n(), s("span", Sr, u(i.template.reactionEmoji), 1)) : b("", !0)
                ])
              ]),
              e("div", Ir, [
                e("div", Ar, [
                  e("p", null, u(se.value), 1),
                  (be = i.template.flow) != null && be.id ? (n(), s("a", {
                    key: 0,
                    href: "#",
                    onClick: T[5] || (T[5] = at(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + u(i.template.flow.id), 1)) : b("", !0),
                  T[28] || (T[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            T[31] || (T[31] = et('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Rr = /* @__PURE__ */ Ue(Tr, [["__scopeId", "data-v-244c945a"]]), Ur = { class: "keos-whatsapp-builder" }, Lr = { class: "kb-builder-top" }, Br = { class: "kb-wa-layout" }, Pr = { class: "kb-wa-sidebar" }, Er = {
  key: 0,
  class: "kb-wa-form"
}, Or = { class: "kb-wa-form-head" }, Nr = { class: "kb-wa-form-head-top" }, Mr = { class: "kb-wa-health-pill" }, Vr = { class: "kb-wa-form-head-row" }, Wr = ["value"], Dr = { class: "kb-wa-health" }, jr = { class: "kb-wa-health-row" }, Hr = { class: "kb-wa-health-value" }, Fr = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, qr = { class: "kb-wa-canvas" }, zr = {
  key: 0,
  class: "kb-wa-test-banner"
}, Yr = { class: "kb-wa-preview-chrome" }, Kr = { class: "kb-push-preview-controls" }, Gr = { class: "kb-push-preview-as" }, Jr = ["value"], Xr = { class: "kb-preview-status" }, Qr = { class: "kb-wa-actions" }, Zr = {
  key: 0,
  class: "kb-actions-note"
}, ed = { key: 0 }, td = { class: "kb-wa-actions-right" }, ad = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, nd = { class: "kb-confirm-dialog" }, sd = { class: "kb-confirm-actions" }, Lt = 60, Bt = 1024, Pt = 60, Et = 10, Ot = 10, od = /* @__PURE__ */ Re({
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
  setup(i, { emit: d }) {
    const c = /* @__PURE__ */ new Set(["image", "video", "document"]), m = /* @__PURE__ */ new Set([
      "elementName",
      "languageCode",
      "category",
      "templateType",
      "content",
      "metaTemplate",
      "metaWhatsApp"
    ]);
    function _(a) {
      return a == null ? !1 : typeof a == "string" ? a.trim().length > 0 : Array.isArray(a) ? a.length > 0 : typeof a == "object" ? Object.keys(a).length > 0 : !0;
    }
    function w(a) {
      const o = {
        elementName: a.elementName,
        languageCode: a.languageCode,
        category: a.category,
        templateType: a.templateType,
        content: a.content,
        metaTemplate: a.metaTemplate,
        metaWhatsApp: a.metaWhatsApp ?? a.metaTemplate,
        header: a.header,
        footer: a.footer,
        buttons: a.buttons,
        example: a.example,
        advanced: a.advanced
      };
      return Object.fromEntries(
        Object.entries(o).filter(([h, v]) => m.has(h) ? !0 : _(v))
      );
    }
    function C(a) {
      const o = { ...a }, h = String(o.template_type ?? "text").trim().toLowerCase(), v = String(o.header_type ?? "none").trim().toLowerCase();
      c.has(h) || c.has(v) || (o.media_url = void 0, o.media_caption = void 0, o.document_filename = void 0, o.document_size = void 0), h !== "carousel" && (o.cards = void 0), h !== "catalog" && h !== "mpm" && (o.products = void 0), h !== "flow" && (o.flow_id = void 0, o.flow_cta_label = void 0), h !== "lto" && (o.lto_expiry = void 0), h !== "auth" && (o.auth_type = void 0, o.auth_label = void 0, o.auth_code = void 0, o.otp_code = void 0), h !== "document" && v !== "document" && (o.document_filename = void 0, o.document_size = void 0), h !== "location" && (o.location = void 0);
      const x = Array.isArray(o.buttons) ? o.buttons : [];
      return o.buttons = x, o;
    }
    function I(a) {
      var Te, p, l, t, D;
      const o = [], h = a.message, v = (h.template_category ?? "").toString().trim(), E = (h.template_type ?? "text").toString(), x = (h.header_type ?? "none").toString(), U = (h.header ?? "").toString(), H = (h.body ?? "").toString(), ne = (h.footer ?? "").toString(), G = Array.isArray(h.buttons) ? h.buttons : [], ce = Array.isArray(h.cards) ? h.cards : [];
      return (Te = a.name) != null && Te.trim() || o.push("Template name is required"), (p = h.template_name) != null && p.trim() || o.push("WhatsApp template name is required"), v || o.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), H.trim() || o.push("Body is required"), x === "text" && U.length > Lt && o.push(`Header text cannot exceed ${Lt} characters`), H.length > Bt && o.push(`Body cannot exceed ${Bt} characters`), ne.length > Pt && o.push(`Footer cannot exceed ${Pt} characters`), G.length > Et && o.push(`Buttons cannot exceed ${Et}`), (E === "image" || E === "video" || E === "document" || x === "image" || x === "video" || x === "document") && !h.media_url && o.push("Media URL is required for rich media templates"), v === "authentication" && E !== "auth" && o.push("Authentication category must use Authentication format"), E === "auth" && !((l = h.auth_label) != null && l.trim()) && !H.includes("{{") && o.push("Authentication templates should include a code label or placeholder variable"), E === "lto" && !h.lto_expiry && o.push("Limited-time offer requires an expiry"), (E === "mpm" || E === "catalog") && !((t = h.products) != null && t.length) && o.push("Catalog and multi-product templates require at least one product"), E === "flow" && !((D = h.flow_id) != null && D.trim()) && o.push("WhatsApp Flow format requires a flow ID"), E === "carousel" && (ce.length ? ce.length > Ot && o.push(`Carousel supports up to ${Ot} cards`) : o.push("Carousel format requires at least one card")), o;
    }
    function S(a, o, h) {
      const v = a.message, E = String(v.template_category ?? "").trim(), x = String(v.template_type ?? "text").trim(), U = [];
      return E && o.includes(E) && U.push(`WhatsApp category "${E}" is disabled in this builder configuration`), x && h.includes(x) && U.push(`WhatsApp format "${x}" is disabled in this builder configuration`), U;
    }
    const B = i;
    function j(a) {
      if (!a) return {};
      const o = a.metaTemplate ?? a.metaWhatsApp, h = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((p) => (p == null ? void 0 : p.type) === "BODY") : void 0, v = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((p) => (p == null ? void 0 : p.type) === "FOOTER") : void 0, E = Array.isArray(o == null ? void 0 : o.components) ? (o == null ? void 0 : o.components).find((p) => (p == null ? void 0 : p.type) === "HEADER") : void 0, x = String(a.content ?? "").trim(), U = String(a.elementName ?? "").trim(), H = String(a.languageCode ?? "").trim(), ne = String(a.category ?? "").trim().toLowerCase(), G = String(a.templateType ?? "").trim().toLowerCase(), ce = String(a.footer ?? "").trim(), Te = String(a.header ?? "").trim();
      return {
        ...a,
        ...U && !a.template_name ? { template_name: U } : {},
        ...H && !a.template_language ? { template_language: H } : {},
        ...ne && !a.template_category ? { template_category: ne } : {},
        ...G && !a.template_type ? { template_type: G } : {},
        ...x && !a.body ? { body: x } : {},
        ...ce && !a.footer ? { footer: ce } : {},
        ...Te && !a.header ? { header: Te } : {},
        ...!a.body && (h != null && h.text) ? { body: String(h.text) } : {},
        ...!a.footer && (v != null && v.text) ? { footer: String(v.text) } : {},
        ...!a.header && (E != null && E.text) ? { header: String(E.text) } : {}
      };
    }
    function K(a) {
      if (!a) return a;
      const o = j(a.message);
      return { ...a, message: o };
    }
    const Y = d;
    function z(a) {
      var h;
      const o = xt(a, {
        exampleData: (h = Le.value) == null ? void 0 : h.data
      });
      return {
        ...a,
        message: w(o.payload)
      };
    }
    const {
      campaign: R,
      dirty: me,
      customValidatorErrors: J,
      getValidationWithWarnings: F,
      update: P,
      updateMessage: de,
      undo: $e,
      redo: Ce,
      canUndo: _e,
      canRedo: se,
      resetMessage: X,
      hooks: y
    } = rt({
      initial: K(B.modelValue),
      hooks: {
        ...B.hooks,
        customValidators: async (a) => {
          var v;
          const o = [
            ...I(a),
            ...S(
              a,
              B.disabledTemplateCategories,
              B.disabledTemplateFormats
            )
          ], h = (v = B.hooks) != null && v.customValidators ? await B.hooks.customValidators(a) : [];
          return [...o, ...h];
        }
      },
      onDirty: () => Y("change", z(R.value))
    }), { lastSavedAt: T } = dt(R, { channel: "whatsapp" });
    function N(a) {
      (a.metaKey || a.ctrlKey) && a.key === "z" && (a.preventDefault(), a.shiftKey ? Ce() : $e());
    }
    nt(() => {
      window.addEventListener("keydown", N);
    }), st(() => {
      window.removeEventListener("keydown", N);
    }), Pe(R, (a) => Y("update:modelValue", z(a)), {
      deep: !0
    });
    const ue = re(), te = re(!0);
    async function A() {
      if (y.estimateReach)
        try {
          ue.value = await y.estimateReach(R.value.audience);
        } catch {
          ue.value = void 0;
        }
      y.canSend && (te.value = await Promise.resolve(y.canSend()));
    }
    A(), Pe(() => R.value.audience, A, { deep: !0 });
    const ge = g(() => (J.value, F(ue.value))), ye = g(() => ge.value.blockingErrors), Se = g(() => ge.value.warnings), Ie = g(() => ge.value.valid), M = g(() => {
      var v, E, x;
      const a = R.value.message, o = [
        !!((v = a.template_name) != null && v.trim()),
        !!((E = a.template_category) != null && E.trim()),
        !!(a.body ?? "").toString().trim(),
        !!((x = a.template_language) != null && x.trim()),
        Array.isArray(a.buttons) ? a.buttons.length > 0 : !1
      ], h = o.filter(Boolean).length;
      return Math.round(h / o.length * 100);
    }), $ = g(() => M.value >= 90 ? "Production ready" : M.value >= 70 ? "Strong draft" : M.value >= 40 ? "In progress" : "Needs setup"), L = g(() => {
      const a = R.value.message;
      return !!((a.body ?? "").toString().trim() || (a.header ?? "").toString().trim() || a.media_url || a.flow_id || a.coupon_code || a.lto_expiry || a.voice_transcript || a.contact_name || a.link_title || a.order_title || Array.isArray(a.buttons) && a.buttons.length || Array.isArray(a.products) && a.products.length || Array.isArray(a.cards) && a.cards.length);
    }), Q = re(""), ie = re(!1), be = re(null), pe = g(
      () => new Set((B.disabledTemplateCategories ?? []).map((a) => String(a).trim().toLowerCase()))
    ), le = g(
      () => new Set((B.disabledTemplateFormats ?? []).map((a) => String(a).trim().toLowerCase()))
    ), Ae = g(
      () => oo.filter((a) => {
        var E;
        const o = ((E = a.campaign) == null ? void 0 : E.message) ?? {}, h = String(o.template_category ?? "").trim().toLowerCase(), v = String(o.template_type ?? "").trim().toLowerCase();
        return !(h && pe.value.has(h) || v && le.value.has(v));
      })
    ), Le = g(() => {
      const a = Q.value;
      return a ? Qe.find((o) => o.id === a) ?? null : null;
    }), Ee = g(() => {
      const a = R.value.message.body ?? "";
      return Le.value ? Ge(a, Le.value.data) : a;
    }), We = g(() => {
      const a = R.value.message.header ?? "";
      return Le.value ? Ge(a, Le.value.data) : a;
    }), Ye = g(() => {
      var p;
      const a = R.value.message, o = a.template_type ?? "text", h = a.header_type ?? "none";
      let v, E, x, U, H, ne, G;
      (o === "image" || h === "image") && a.media_url ? v = { type: "image", url: a.media_url } : (o === "video" || h === "video") && a.media_url ? v = { type: "video", url: a.media_url } : o === "document" || h === "document" ? v = {
        type: "document",
        url: a.media_url || void 0,
        filename: a.document_filename || a.media_url || "document.pdf"
      } : h === "text" && a.header ? v = { type: "text", text: We.value } : a.header && (v = { type: "text", text: We.value });
      const ce = Ee.value || "Start adding content to see a live preview here.";
      if (o === "location" && a.location) {
        const l = a.location, t = l.lat ?? l.latitude, D = l.lng ?? l.lon ?? l.longitude;
        t != null && D != null && (E = {
          lat: t,
          lng: D,
          name: l.name ?? l.title,
          address: l.address ?? `${t}, ${D}`
        });
      }
      (o === "catalog" || o === "mpm") && Array.isArray(a.products) && a.products.length && (x = !0, U = a.products.map((l) => ({
        image: l.image ?? l.imageUrl,
        name: l.name ?? l.sectionTitle ?? l.title ?? "Product",
        price: l.price ?? l.productId ?? ""
      }))), o === "carousel" && Array.isArray(a.cards) && a.cards.length && (x = !0, U = a.cards.map((l) => ({
        image: l.image ?? l.media_url,
        name: l.title ?? "Card",
        price: l.button_label ?? ""
      }))), o === "coupon" && a.coupon_code && (H = { code: a.coupon_code }), o === "lto" && a.lto_expiry && (ne = a.lto_expiry), o === "auth" && (G = { code: a.auth_code ?? a.otp_code ?? "123 456" });
      const Te = a.buttons ?? [];
      return o === "flow" && ((p = a.flow_cta_label) != null && p.trim()) && Te.push({
        label: a.flow_cta_label
      }), {
        format: o,
        templateName: a.template_name || void 0,
        templateLanguage: a.template_language || void 0,
        templateCategory: a.template_category || void 0,
        header: v,
        body: ce,
        mediaCaption: a.media_caption || void 0,
        footer: a.footer || void 0,
        buttons: Te.map((l) => ({ text: l.label || "Button", type: l.type, value: l.value })),
        location: E,
        catalog: x,
        multiProduct: U,
        coupon: H,
        limitedOffer: ne,
        auth: G,
        linkPreview: a.link_title || a.link_description || a.link_url ? {
          title: a.link_title || void 0,
          description: a.link_description || void 0,
          domain: a.link_domain || void 0,
          url: a.link_url || void 0,
          thumbnail: a.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: a.voice_transcript || a.voice_duration || a.voice_profile_image ? {
          transcript: a.voice_transcript || void 0,
          duration: a.voice_duration || void 0,
          profileImage: a.voice_profile_image || void 0
        } : void 0,
        contactCard: a.contact_name || a.contact_phone || a.contact_email ? {
          name: a.contact_name || void 0,
          title: a.contact_title || void 0,
          phone: a.contact_phone || void 0,
          email: a.contact_email || void 0,
          address: a.contact_address || void 0
        } : void 0,
        documentCard: a.document_filename || o === "document" || h === "document" ? {
          filename: a.document_filename || a.media_url || "document.pdf",
          size: a.document_size || void 0,
          caption: a.media_caption || void 0
        } : void 0,
        locationRequest: a.location_request_label ? { label: a.location_request_label } : void 0,
        orderCard: a.order_title || a.order_items || a.order_image ? {
          title: a.order_title || void 0,
          items: a.order_items || void 0,
          image: a.order_image || void 0,
          buttonLabel: a.order_button_label || void 0
        } : void 0,
        carouselCards: o === "carousel" && Array.isArray(a.cards) ? a.cards.map((l) => ({
          title: l.title || void 0,
          description: l.description || a.body || void 0,
          image: l.media_url || void 0,
          button: l.button_label || void 0
        })) : void 0,
        reactionEmoji: a.reaction_emoji || void 0,
        flow: o === "flow" ? {
          id: a.flow_id || void 0,
          ctaLabel: a.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function Ne(a) {
      var v;
      const o = R.value, h = C({
        ...a.campaign.message ? a.campaign.message : o.message,
        template_name: ((v = a.campaign.message) == null ? void 0 : v.template_name) ?? a.campaign.name ?? o.name ?? void 0
      });
      P({
        ...a.campaign,
        message: h
      }), be.value = null, ie.value = !1;
    }
    function De(a) {
      const o = a.target.value;
      if (!o) return;
      const h = Ae.value.find((v) => v.id === o);
      h && (me.value ? (be.value = h, ie.value = !0) : Ne(h), a.target.value = "");
    }
    function je(a) {
      P({
        name: a,
        message: { ...R.value.message, template_name: a || void 0 },
        tracking: { ...R.value.tracking ?? {}, campaign_name: a }
      });
    }
    function He(a) {
      const o = R.value.message, h = C({
        ...o,
        ...a ?? {}
      });
      if (de(h), Object.prototype.hasOwnProperty.call(a ?? {}, "template_name")) {
        const v = String((a == null ? void 0 : a.template_name) ?? "");
        v !== R.value.name && P({
          name: v,
          tracking: {
            ...R.value.tracking ?? {},
            campaign_name: v
          }
        });
      }
    }
    Pe(
      () => R.value.name,
      (a) => {
        const o = String(R.value.message.template_name ?? "");
        (a || "") !== o && de({ template_name: a || void 0 });
      },
      { immediate: !0 }
    );
    function Me(a) {
      const o = ` {{ .${a.variable} }}`, h = R.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...h, a.variable]));
      if (a.field === "title") {
        const E = R.value.message.header ?? "";
        de({
          variables: v,
          header: E + o
        });
      } else if (a.field === "footer") {
        const E = R.value.message.footer ?? "";
        de({
          variables: v,
          footer: E + o
        });
      } else {
        const E = R.value.message.body ?? "";
        de({
          variables: v,
          body: E + o
        });
      }
    }
    function ae() {
      var h;
      if (!Ie.value) return;
      const a = xt(R.value, {
        exampleData: (h = Le.value) == null ? void 0 : h.data
      }), o = z(R.value);
      Y("save-gupshup-template", a.payload, a.warnings, o), Y("save", o);
    }
    return (a, o) => {
      var h;
      return n(), s("div", Ur, [
        e("div", Lr, [
          Be(ut, {
            "campaign-name": f(R).name,
            status: f(R).status,
            dirty: f(me),
            "last-saved-at": f(T),
            "can-undo": f(_e),
            "can-redo": f(se),
            "slugify-name": B.enforceSlugName,
            "onUpdate:campaignName": je,
            onUndo: f($e),
            onRedo: f(Ce)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ye.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: fe({
              background: f(xe).dangerBg,
              border: `1px solid ${f(xe).dangerBorder}`,
              borderRadius: `${f(Je).input}px`,
              padding: `${f(he)[12]}px ${f(he)[16]}px`,
              marginBottom: `${f(he)[16]}px`
            })
          }, [
            e("ul", {
              style: fe({ margin: 0, paddingLeft: "1.25rem", color: f(xe).danger })
            }, [
              (n(!0), s(V, null, W(ye.value, (v) => (n(), s("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", Br, [
          e("aside", Pr, [
            i.disabledSections.includes("whatsapp") ? b("", !0) : (n(), s("div", Er, [
              e("div", Or, [
                e("div", Nr, [
                  o[6] || (o[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", Mr, u($.value), 1)
                ]),
                e("div", Vr, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: De
                  }, [
                    o[7] || (o[7] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(V, null, W(Ae.value, (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Wr))), 128))
                  ], 32)
                ]),
                e("div", Dr, [
                  e("div", jr, [
                    o[8] || (o[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", Hr, u(M.value) + "%", 1)
                  ]),
                  e("div", Fr, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: fe({ width: `${M.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(nl, {
                message: f(R).message,
                "show-reset": !0,
                "disabled-categories": i.disabledTemplateCategories,
                "disabled-formats": i.disabledTemplateFormats,
                onUpdate: He,
                onReset: o[0] || (o[0] = (v) => f(X)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              Be(zt, {
                message: f(R).message,
                "variable-options": i.variableOptions,
                targets: ["title", "body", "footer"],
                onUpdate: f(de),
                onInsertVariable: Me
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", qr, [
            !i.designOnly && f(R).audience.test_mode ? (n(), s("div", zr, [...o[9] || (o[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              Z(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Yr, [
              e("div", Kr, [
                e("label", Gr, [
                  o[11] || (o[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ve(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (v) => Q.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[10] || (o[10] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(V, null, W(f(Qe), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Jr))), 128))
                  ], 512), [
                    [ze, Q.value]
                  ])
                ]),
                e("div", Xr, [
                  o[12] || (o[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, u(f(R).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: ve(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !L.value }])
              }, [
                Be(Rr, { template: Ye.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Qr, [
          Se.value.length > 0 ? (n(), s("div", Zr, [
            o[13] || (o[13] = e("strong", null, "Warning:", -1)),
            Z(" " + u((h = Se.value[0]) == null ? void 0 : h.message) + " ", 1),
            Se.value.length > 1 ? (n(), s("span", ed, " (+" + u(Se.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", td, [
            i.showDuplicate ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: o[2] || (o[2] = (v) => Y("duplicate", JSON.parse(JSON.stringify(f(R)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: ae
            }, " Save ")) : b("", !0),
            i.showClose ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: o[3] || (o[3] = (v) => Y("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        ie.value ? (n(), s("div", ad, [
          e("div", nd, [
            o[14] || (o[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[15] || (o[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", sd, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: o[4] || (o[4] = (v) => {
                  ie.value = !1, be.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: o[5] || (o[5] = (v) => be.value && Ne(be.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0)
      ]);
    };
  }
}), Gt = /* @__PURE__ */ Ue(od, [["__scopeId", "data-v-79c11b0a"]]), id = { class: "kb-section" }, ld = { class: "kb-section__head" }, rd = { class: "kb-field" }, dd = ["value"], ud = { class: "kb-field" }, cd = { class: "kb-label" }, pd = { key: 0 }, md = { key: 1 }, vd = { key: 2 }, bd = ["value"], hd = {
  key: 0,
  class: "kb-truncation-hint"
}, yd = { class: "kb-field" }, fd = { class: "kb-insert-row" }, gd = ["value"], kd = { class: "kb-field" }, _d = { class: "kb-insert-row" }, wd = /* @__PURE__ */ Re({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: d }) {
    const c = i, m = d, _ = ["first_name", "last_name", "order_id", "city"], w = re(c.variableOptions && c.variableOptions.length ? [...c.variableOptions] : _), C = re(w.value[0] ?? _[0]), I = re("");
    Pe(
      () => c.variableOptions,
      (J) => {
        J && J.length && (w.value = [...J], w.value.includes(C.value) || (C.value = w.value[0]));
      }
    );
    const S = g(() => c.message.body ?? ""), B = g(() => S.value.length), j = g(() => B.value ? B.value <= 160 ? 1 : Math.ceil(B.value / 153) : 0), K = g(() => {
      const J = B.value;
      return J <= 160 ? null : J <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function Y(J) {
      const F = J.target.value;
      m("update", {
        sender_id: F || void 0
      });
    }
    function z(J) {
      const F = J.target.value;
      m("update", {
        body: F
      });
    }
    function R() {
      const J = C.value;
      if (!J) return;
      const F = ` {{ .${J} }}`, P = S.value || "", de = c.message.variables ?? [], $e = Array.from(/* @__PURE__ */ new Set([...de, J]));
      m("update", {
        body: P + F,
        variables: $e
      });
    }
    function me() {
      const J = I.value.trim();
      J && (w.value.includes(J) || (w.value = [...w.value, J]), C.value = J, I.value = "");
    }
    return (J, F) => (n(), s("section", id, [
      e("div", ld, [
        F[3] || (F[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        i.showReset ? (n(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: F[0] || (F[0] = (P) => J.$emit("reset"))
        }, " Reset section ")) : b("", !0)
      ]),
      F[10] || (F[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", rd, [
        F[4] || (F[4] = e("label", { class: "kb-label" }, [
          Z(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: c.message.sender_id ?? "",
          onInput: Y
        }, null, 40, dd)
      ]),
      e("div", ud, [
        e("label", cd, [
          F[5] || (F[5] = Z(" Message body ", -1)),
          e("span", {
            class: ve(["kb-counter", { "kb-counter--warn": j.value > 3 }])
          }, [
            Z(u(B.value) + " chars · ", 1),
            j.value === 0 ? (n(), s("span", pd, "0 segments")) : j.value === 1 ? (n(), s("span", md, "1 segment")) : (n(), s("span", vd, u(j.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
          value: S.value,
          onInput: z
        }, null, 40, bd),
        F[6] || (F[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        K.value ? (n(), s("p", hd, u(K.value), 1)) : b("", !0)
      ]),
      e("div", yd, [
        F[7] || (F[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", fd, [
          Ve(e("select", {
            "onUpdate:modelValue": F[1] || (F[1] = (P) => C.value = P),
            class: "kb-select"
          }, [
            (n(!0), s(V, null, W(w.value, (P) => (n(), s("option", {
              key: P,
              value: P
            }, u(P), 9, gd))), 128))
          ], 512), [
            [ze, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: R
          }, " Insert into message ")
        ]),
        F[8] || (F[8] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", kd, [
        F[9] || (F[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", _d, [
          Ve(e("input", {
            "onUpdate:modelValue": F[2] || (F[2] = (P) => I.value = P),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [ht, I.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: me
          }, " Add ")
        ])
      ])
    ]));
  }
}), $d = /* @__PURE__ */ Ue(wd, [["__scopeId", "data-v-f44c4aab"]]), xd = { class: "keos-sms-builder" }, Cd = { class: "kb-builder-top" }, Sd = { class: "kb-sms-layout" }, Id = { class: "kb-sms-sidebar" }, Ad = {
  key: 0,
  class: "kb-sms-form"
}, Td = { class: "kb-sms-form-head" }, Rd = { class: "kb-sms-form-head-top" }, Ud = { class: "kb-sms-health-pill" }, Ld = { class: "kb-wa-form-head-row" }, Bd = ["value"], Pd = { class: "kb-sms-health" }, Ed = { class: "kb-sms-health-row" }, Od = { class: "kb-sms-health-value" }, Nd = { class: "kb-sms-health-bar" }, Md = { class: "kb-sms-canvas" }, Vd = {
  key: 0,
  class: "kb-sms-test-banner"
}, Wd = { class: "kb-sms-preview-chrome" }, Dd = { class: "kb-push-preview-controls" }, jd = { class: "kb-push-preview-as" }, Hd = ["value"], Fd = { class: "kb-preview-status" }, qd = { class: "kb-preview" }, zd = { class: "kb-sms-preview" }, Yd = { class: "kb-sms-phone" }, Kd = { class: "kb-sms-header" }, Gd = { class: "kb-sms-sender-avatar" }, Jd = { class: "kb-sms-header-copy" }, Xd = { class: "kb-sms-sender" }, Qd = { class: "kb-sms-meta" }, Zd = { class: "kb-sms-thread" }, eu = {
  key: 0,
  class: "kb-sms-empty"
}, tu = { class: "kb-sms-text" }, au = { class: "kb-sms-bubble-meta" }, nu = {
  key: 0,
  class: "kb-sms-segment-chip"
}, su = {
  key: 0,
  class: "kb-sms-more-segments"
}, ou = { class: "kb-sms-delivery-line" }, iu = { class: "kb-sms-counter" }, lu = { key: 0 }, ru = { key: 1 }, du = { key: 2 }, uu = {
  key: 3,
  class: "kb-sms-cost"
}, cu = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, pu = { class: "kb-sms-actions" }, mu = {
  key: 0,
  class: "kb-actions-note"
}, vu = { key: 0 }, bu = { class: "kb-sms-actions-right" }, hu = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, yu = { class: "kb-confirm-dialog" }, fu = { class: "kb-confirm-actions" }, gu = /* @__PURE__ */ Re({
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
  setup(i, { emit: d }) {
    const c = i, m = d, {
      campaign: _,
      dirty: w,
      customValidatorErrors: C,
      getValidationWithWarnings: I,
      update: S,
      updateMessage: B,
      undo: j,
      redo: K,
      canUndo: Y,
      canRedo: z,
      resetMessage: R,
      hooks: me
    } = rt({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (ae) => {
          var h, v;
          const a = [];
          (h = ae.name) != null && h.trim() || a.push("Template name is required");
          const o = (v = c.hooks) != null && v.customValidators ? await c.hooks.customValidators(ae) : [];
          return [...a, ...o];
        }
      },
      onDirty: () => m("change", _.value)
    }), { lastSavedAt: J } = dt(_, { channel: "sms" });
    function F(ae) {
      (ae.metaKey || ae.ctrlKey) && ae.key === "z" && (ae.preventDefault(), ae.shiftKey ? K() : j());
    }
    nt(() => {
      window.addEventListener("keydown", F);
    }), st(() => {
      window.removeEventListener("keydown", F);
    }), Pe(_, (ae) => m("update:modelValue", ae), { deep: !0 });
    const P = re(), de = re(!0);
    async function $e() {
      if (me.estimateReach)
        try {
          P.value = await me.estimateReach(_.value.audience);
        } catch {
          P.value = void 0;
        }
      me.canSend && (de.value = await Promise.resolve(me.canSend()));
    }
    $e(), Pe(() => _.value.audience, $e, { deep: !0 });
    const Ce = g(() => (C.value, I(P.value))), _e = g(() => Ce.value.blockingErrors), se = g(() => Ce.value.warnings), X = g(() => Ce.value.valid), y = g(() => {
      var h, v, E;
      const ae = _.value.message, a = [
        !!((h = _.value.name) != null && h.trim()),
        !!((v = ae.body) != null && v.trim()),
        !!((E = ae.sender_id) != null && E.trim()),
        !!_.value.template_type,
        (ae.body ?? "").length > 20
      ], o = a.filter(Boolean).length;
      return Math.round(o / a.length * 100);
    }), T = g(() => y.value >= 90 ? "Production ready" : y.value >= 70 ? "Strong draft" : y.value >= 40 ? "In progress" : "Needs setup"), N = g(() => !!Q.value.trim()), ue = g(
      () => _.value.template_type ?? "transactional"
    ), te = re(""), A = re(!1), ge = re(null), ye = g(() => {
      const ae = te.value;
      return ae ? Qe.find((a) => a.id === ae) ?? null : null;
    }), Se = g(() => {
      const ae = Q.value;
      return ye.value ? Ge(ae, ye.value.data) : ae;
    });
    function Ie(ae) {
      const a = _.value, o = ae.campaign.message ? { ...a.message, ...ae.campaign.message } : a.message;
      S({
        ...ae.campaign,
        message: o
      }), ge.value = null, A.value = !1;
    }
    function M(ae) {
      const a = ae.target.value;
      if (!a) return;
      const o = Tt.find((h) => h.id === a);
      o && (w.value ? (ge.value = o, A.value = !0) : Ie(o), ae.target.value = "");
    }
    function $(ae) {
      S({ template_type: ae });
    }
    function L(ae) {
      S({
        name: ae,
        tracking: { ..._.value.tracking ?? {}, campaign_name: ae }
      });
    }
    const Q = g(
      () => (_.value.message.body ?? "") || ""
    ), ie = g(() => Q.value.length), be = g(() => /[^\x00-\x7f]/.test(Q.value)), pe = g(() => be.value ? 70 : 160), le = g(() => be.value ? 67 : 153), Ae = g(() => ie.value ? ie.value <= pe.value ? 1 : Math.ceil(ie.value / le.value) : 0), Le = g(() => {
      const ae = Se.value.trim();
      if (!ae) return [];
      const a = Ae.value <= 1 ? pe.value : le.value, o = [];
      for (let h = 0; h < ae.length; h += a)
        o.push(ae.slice(h, h + a));
      return o;
    }), Ee = g(() => Le.value.slice(0, 3)), We = g(
      () => Math.max(0, Le.value.length - Ee.value.length)
    ), Ye = g(() => be.value ? "Unicode" : "GSM-7"), Ne = g(() => N.value ? Ae.value > 3 ? "Queued" : "Delivered" : "Draft"), De = g(() => {
      const ae = c.costPerSegment ?? 0;
      return !ae || Ae.value === 0 ? null : (Ae.value * ae).toFixed(2);
    }), je = g(() => {
      const ae = ie.value, a = pe.value + le.value;
      return ae <= pe.value ? null : ae <= a ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), He = g(
      () => _.value.message.sender_id ?? "YourBrand"
    );
    function Me() {
      X.value && m("save", _.value);
    }
    return (ae, a) => {
      var o;
      return n(), s("div", xd, [
        e("div", Cd, [
          Be(ut, {
            "campaign-name": f(_).name,
            status: f(_).status,
            dirty: f(w),
            "last-saved-at": f(J),
            "can-undo": f(Y),
            "can-redo": f(z),
            "slugify-name": c.enforceSlugName,
            "onUpdate:campaignName": L,
            onUndo: f(j),
            onRedo: f(K)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          _e.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: fe({
              background: f(xe).dangerBg,
              border: `1px solid ${f(xe).dangerBorder}`,
              borderRadius: `${f(Je).input}px`,
              padding: `${f(he)[12]}px ${f(he)[16]}px`,
              marginBottom: `${f(he)[16]}px`
            })
          }, [
            e("ul", {
              style: fe({ margin: 0, paddingLeft: "1.25rem", color: f(xe).danger })
            }, [
              (n(!0), s(V, null, W(_e.value, (h) => (n(), s("li", {
                key: h.message
              }, u(h.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", Sd, [
          e("aside", Id, [
            i.disabledSections.includes("sms") ? b("", !0) : (n(), s("div", Ad, [
              e("div", Td, [
                e("div", Rd, [
                  a[6] || (a[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", Ud, u(T.value), 1)
                ]),
                e("div", Ld, [
                  Be(_t, {
                    "template-type": ue.value,
                    onUpdate: $
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: M
                  }, [
                    a[7] || (a[7] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(V, null, W(f(Tt), (h) => (n(), s("option", {
                      key: h.id,
                      value: h.id
                    }, u(h.label), 9, Bd))), 128))
                  ], 32)
                ]),
                e("div", Pd, [
                  e("div", Ed, [
                    a[8] || (a[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", Od, u(y.value) + "%", 1)
                  ]),
                  e("div", Nd, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: fe({ width: `${y.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be($d, {
                message: f(_).message,
                "variable-options": i.variableOptions,
                "show-reset": !0,
                onUpdate: f(B),
                onReset: a[0] || (a[0] = (h) => f(R)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Md, [
            !i.designOnly && f(_).audience.test_mode ? (n(), s("div", Vd, [...a[9] || (a[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              Z(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", Wd, [
              e("div", Dd, [
                e("label", jd, [
                  a[11] || (a[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ve(e("select", {
                    "onUpdate:modelValue": a[1] || (a[1] = (h) => te.value = h),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    a[10] || (a[10] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(V, null, W(f(Qe), (h) => (n(), s("option", {
                      key: h.id,
                      value: h.id
                    }, u(h.label), 9, Hd))), 128))
                  ], 512), [
                    [ze, te.value]
                  ])
                ]),
                e("div", Fd, [
                  a[12] || (a[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, u(Ae.value || 0), 1)
                ])
              ]),
              e("div", {
                class: ve(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !N.value }])
              }, [
                e("div", qd, [
                  e("div", zd, [
                    e("div", Yd, [
                      a[15] || (a[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Kd, [
                        e("div", Gd, u(He.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Jd, [
                          e("div", Xd, u(He.value), 1),
                          e("div", Qd, "Text message · " + u(Ne.value), 1)
                        ])
                      ]),
                      e("div", Zd, [
                        N.value ? (n(), s(V, { key: 1 }, [
                          (n(!0), s(V, null, W(Ee.value, (h, v) => (n(), s("div", {
                            key: `${v}-${h.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", tu, u(h), 1),
                            e("span", au, [
                              a[13] || (a[13] = Z(" 09:21 ", -1)),
                              Ee.value.length > 1 ? (n(), s("span", nu, "Part " + u(v + 1), 1)) : b("", !0)
                            ])
                          ]))), 128)),
                          We.value > 0 ? (n(), s("div", su, " +" + u(We.value) + " more segments ", 1)) : b("", !0),
                          e("div", ou, [
                            a[14] || (a[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            Z(" " + u(Ne.value), 1)
                          ])
                        ], 64)) : (n(), s("div", eu, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", iu, [
                      Z(u(ie.value) + " characters · ", 1),
                      Ae.value === 0 ? (n(), s("span", lu, "0 segments")) : Ae.value === 1 ? (n(), s("span", ru, "1 segment")) : (n(), s("span", du, u(Ae.value) + " segments", 1)),
                      Z(" (" + u(pe.value) + " chars single, " + u(le.value) + " multi-part · " + u(Ye.value) + ") ", 1),
                      De.value !== null ? (n(), s("span", uu, " · Est. " + u(De.value), 1)) : b("", !0)
                    ]),
                    je.value ? (n(), s("p", cu, u(je.value), 1)) : b("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", pu, [
          se.value.length > 0 ? (n(), s("div", mu, [
            a[16] || (a[16] = e("strong", null, "Warning:", -1)),
            Z(" " + u((o = se.value[0]) == null ? void 0 : o.message) + " ", 1),
            se.value.length > 1 ? (n(), s("span", vu, " (+" + u(se.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", bu, [
            i.showDuplicate ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: a[2] || (a[2] = (h) => m("duplicate", JSON.parse(JSON.stringify(f(_)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Me
            }, " Save ")) : b("", !0),
            i.showClose ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: a[3] || (a[3] = (h) => m("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        A.value ? (n(), s("div", hu, [
          e("div", yu, [
            a[17] || (a[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            a[18] || (a[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", fu, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: a[4] || (a[4] = (h) => {
                  A.value = !1, ge.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: a[5] || (a[5] = (h) => ge.value && Ie(ge.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0)
      ]);
    };
  }
}), Jt = /* @__PURE__ */ Ue(gu, [["__scopeId", "data-v-5e442b56"]]), ku = 30, _u = 60, wu = 130;
function $u(i) {
  const d = (i ?? "").trim().length;
  return d < ku ? "too_short" : d <= _u ? "good" : "too_long";
}
function xu(i) {
  const d = (i ?? "").trim().length;
  return d === 0 ? "too_short" : d <= wu ? "good" : "too_long";
}
const Cu = [
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
function Nt(i) {
  if (!i || typeof i != "string") return [];
  const d = [];
  for (const c of Cu) {
    const m = i.match(c);
    m && d.push(m[0]);
  }
  return d;
}
function Su(i) {
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
function Iu(i) {
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
const Au = { class: "em-section" }, Tu = { class: "em-strip kb-section" }, Ru = { class: "em-strip-head" }, Uu = { class: "em-field kb-field" }, Lu = { class: "em-input-group" }, Bu = ["value"], Pu = { class: "em-var-picker-wrap" }, Eu = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Ou = ["onClick"], Nu = { class: "em-field kb-field" }, Mu = ["value"], Vu = { class: "em-field kb-field" }, Wu = ["value"], Du = { class: "em-field kb-field" }, ju = { class: "em-input-group" }, Hu = ["value"], Fu = { class: "em-var-picker-wrap" }, qu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, zu = ["onClick"], Yu = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Ku = ["onClick"], Gu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Ju = { class: "em-field kb-field" }, Xu = { class: "em-input-group" }, Qu = ["value"], Zu = { class: "em-var-picker-wrap" }, ec = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, tc = ["onClick"], ac = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, nc = ["onClick"], sc = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, oc = { class: "em-strip kb-section em-strip--library" }, ic = { class: "em-library-chips" }, lc = ["onClick"], rc = { class: "em-strip kb-section em-strip--blocks" }, dc = { class: "em-block-list" }, uc = ["data-type"], cc = { class: "em-block-bar" }, pc = { class: "em-block-type" }, mc = { class: "em-block-actions" }, vc = ["disabled", "onClick"], bc = ["disabled", "onClick"], hc = ["onClick"], yc = {
  key: 0,
  class: "em-block-fields"
}, fc = ["value", "onChange"], gc = ["value", "onInput"], kc = { class: "em-var-picker-wrap" }, _c = ["onClick"], wc = ["onClick"], $c = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, xc = ["onClick"], Cc = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Sc = ["onClick"], Ic = {
  key: 1,
  class: "em-block-fields"
}, Ac = ["value", "onInput"], Tc = { class: "em-var-picker-wrap" }, Rc = ["onClick"], Uc = ["onClick"], Lc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Bc = ["onClick"], Pc = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Ec = ["onClick"], Oc = {
  key: 2,
  class: "em-block-fields"
}, Nc = ["value", "onInput"], Mc = ["value", "onInput"], Vc = { class: "em-var-picker-wrap" }, Wc = ["onClick"], Dc = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, jc = ["onClick"], Hc = ["value", "onInput"], Fc = {
  key: 3,
  class: "em-block-fields"
}, qc = ["value", "onInput"], zc = { class: "em-var-picker-wrap" }, Yc = ["onClick"], Kc = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Gc = ["onClick"], Jc = ["value", "onInput"], Xc = { class: "em-block-fields--row" }, Qc = ["value", "onInput"], Zc = { class: "em-check-row" }, ep = ["checked", "onChange"], tp = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, ap = ["value", "onInput"], np = {
  key: 5,
  class: "em-block-fields"
}, sp = ["value", "onInput"], op = ["value", "onInput"], ip = ["value", "onInput"], lp = { class: "em-var-picker-wrap" }, rp = ["onClick"], dp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, up = ["onClick"], cp = { class: "em-var-picker-wrap" }, pp = ["onClick"], mp = ["onClick"], vp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, bp = ["onClick"], hp = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, yp = ["onClick"], fp = {
  key: 6,
  class: "em-block-fields"
}, gp = ["value", "onChange"], kp = { class: "em-list-items" }, _p = ["value", "onInput", "placeholder"], wp = { class: "em-var-picker-wrap" }, $p = ["onClick"], xp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Cp = ["onClick"], Sp = ["onClick"], Ip = ["onClick"], Ap = {
  key: 7,
  class: "em-block-fields"
}, Tp = ["value", "onChange"], Rp = ["value", "onInput"], Up = { class: "em-var-picker-wrap" }, Lp = ["onClick"], Bp = ["onClick"], Pp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ep = ["onClick"], Op = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Np = ["onClick"], Mp = {
  key: 8,
  class: "em-block-fields"
}, Vp = { class: "em-social-links" }, Wp = ["value", "onChange"], Dp = ["value", "onInput"], jp = ["onClick"], Hp = ["onClick"], Fp = {
  key: 9,
  class: "em-block-fields"
}, qp = ["value", "onInput"], zp = ["value", "onInput"], Yp = ["value", "onInput"], Kp = { class: "em-var-picker-wrap" }, Gp = ["onClick"], Jp = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Xp = ["onClick"], Qp = {
  key: 10,
  class: "em-block-fields"
}, Zp = ["value", "onInput"], em = { class: "em-link-list-items" }, tm = ["value", "onInput"], am = { class: "em-var-picker-wrap" }, nm = ["onClick"], sm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, om = ["onClick"], im = ["value", "onInput"], lm = ["onClick"], rm = ["onClick"], dm = {
  key: 11,
  class: "em-block-fields"
}, um = ["value", "onInput"], cm = { class: "em-var-picker-wrap" }, pm = ["onClick"], mm = ["onClick"], vm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, bm = ["onClick"], hm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, ym = ["onClick"], fm = ["value", "onInput"], gm = { class: "em-var-picker-wrap" }, km = ["onClick"], _m = ["onClick"], wm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, $m = ["onClick"], xm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Cm = ["onClick"], Sm = {
  key: 12,
  class: "em-block-fields"
}, Im = { class: "em-block-fields--row" }, Am = ["value", "onInput"], Tm = { class: "em-block-fields--row" }, Rm = ["value", "onInput"], Um = ["value", "onChange"], Lm = {
  key: 13,
  class: "em-block-fields"
}, Bm = ["value", "onChange"], Pm = { class: "em-inline-label" }, Em = ["value", "onInput"], Om = { class: "em-var-picker-wrap" }, Nm = ["onClick"], Mm = ["onClick"], Vm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Wm = ["onClick"], Dm = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, jm = ["onClick"], Hm = {
  key: 14,
  class: "em-block-fields"
}, Fm = ["value", "onInput"], qm = { class: "em-link-list-items" }, zm = ["value", "onInput"], Ym = { class: "em-var-picker-wrap" }, Km = ["onClick"], Gm = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Jm = ["onClick"], Xm = ["value", "onInput"], Qm = ["onClick"], Zm = ["onClick"], ev = {
  key: 15,
  class: "em-block-fields"
}, tv = ["value", "onInput"], av = { class: "em-var-picker-wrap" }, nv = ["onClick"], sv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, ov = ["onClick"], iv = ["value", "onInput"], lv = { class: "em-var-picker-wrap" }, rv = ["onClick"], dv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, uv = ["onClick"], cv = ["onClick"], pv = ["onClick"], mv = {
  key: 16,
  class: "em-block-fields"
}, vv = ["value", "onInput"], bv = ["value", "onInput"], hv = ["value", "onInput"], yv = ["onClick"], fv = ["onClick"], gv = {
  key: 17,
  class: "em-block-fields"
}, kv = ["value", "onInput"], _v = { class: "em-var-picker-wrap" }, wv = ["onClick"], $v = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, xv = ["onClick"], Cv = ["value", "onInput"], Sv = {
  key: 18,
  class: "em-block-fields"
}, Iv = ["value", "onInput"], Av = ["value", "onInput"], Tv = { class: "em-var-picker-wrap" }, Rv = ["onClick"], Uv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Lv = ["onClick"], Bv = ["value", "onInput"], Pv = { class: "em-var-picker-wrap" }, Ev = ["onClick"], Ov = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, Nv = ["onClick"], Mv = ["value", "onInput"], Vv = { class: "em-var-picker-wrap" }, Wv = ["onClick"], Dv = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, jv = ["onClick"], Hv = ["value", "onInput"], Fv = {
  key: 19,
  class: "em-block-fields"
}, qv = ["value", "onInput"], zv = { class: "em-var-picker-wrap" }, Yv = ["onClick"], Kv = ["onClick"], Gv = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Jv = ["onClick"], Xv = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, Qv = ["onClick"], Zv = {
  key: 20,
  class: "em-block-fields"
}, eb = ["value", "onInput"], tb = { class: "em-var-picker-wrap" }, ab = ["onClick"], nb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, sb = ["onClick"], ob = ["value", "onInput"], ib = { class: "em-var-picker-wrap" }, lb = ["onClick"], rb = ["onClick"], db = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ub = ["onClick"], cb = {
  key: 1,
  class: "em-emoji-menu",
  role: "menu"
}, pb = ["onClick"], mb = {
  key: 21,
  class: "em-block-fields"
}, vb = ["value", "onInput"], bb = { class: "em-block-fields--row" }, hb = ["value", "onInput"], yb = {
  key: 22,
  class: "em-block-fields"
}, fb = ["value", "onInput"], gb = ["value", "onInput"], kb = { class: "em-var-picker-wrap" }, _b = ["onClick"], wb = {
  key: 0,
  class: "em-emoji-menu",
  role: "menu"
}, $b = ["onClick"], xb = ["value", "onInput"], Cb = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Sb = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, Ib = ["onClick"], Ab = ["onClick"], Tb = ["onClick"], Rb = { class: "em-check-row" }, Ub = ["checked", "onChange"], Lb = { class: "em-add-bar kb-field kb-field--add-bar" }, Bb = { class: "em-add-bar-btns" }, Pb = { class: "em-strip kb-section em-strip--personalize" }, Eb = { class: "em-field kb-field" }, Ob = { class: "em-input-group" }, Nb = ["value"], Mb = { class: "em-field kb-field" }, Vb = { class: "em-input-group" }, Fe = "{{ .var }}", Wb = /* @__PURE__ */ Re({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(i, { emit: d }) {
    var Te;
    function c() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const m = [
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
    function w(p) {
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
          return { id: c(), type: "social", links: m.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
    const C = i, I = d, S = ["first_name", "last_name", "order_id", "city", "email"], B = re(
      (Te = C.variableOptions) != null && Te.length ? [...C.variableOptions] : S
    ), j = re(B.value[0] ?? "first_name"), K = re("");
    Pe(
      () => C.variableOptions,
      (p) => {
        p != null && p.length && (B.value = [...p], B.value.includes(j.value) || (j.value = B.value[0]));
      }
    );
    const Y = g(() => C.message.subject ?? ""), z = g(() => C.message.preview_text ?? ""), R = g(() => $u(Y.value)), me = g(() => xu(z.value)), J = g(() => Nt(Y.value)), F = g(() => Nt(z.value)), P = g(() => {
      const p = C.message.blocks;
      return Array.isArray(p) && p.length > 0 ? p : [w("paragraph")];
    });
    Pe(
      () => C.message.blocks,
      (p) => {
        (!Array.isArray(p) || p.length === 0) && I("update", { blocks: [w("paragraph")] });
      },
      { immediate: !0 }
    );
    function de(p) {
      I("update", { blocks: p });
    }
    function $e(p) {
      I("update", { subject: p.target.value });
    }
    function Ce(p) {
      const l = p.target.value;
      I("update", { preview_text: l || void 0 });
    }
    function _e(p) {
      I("update", { from_name: p.target.value || void 0 });
    }
    function se(p) {
      I("update", { from_address: p.target.value || void 0 });
    }
    function X(p) {
      I("update", { reply_to: p.target.value || void 0 });
    }
    const y = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [w("heading"), w("paragraph"), w("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [w("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [w("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [w("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [w("social"), w("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [w("footer"), w("link_list")]
      }
    ];
    function T(p) {
      const l = p.blocks();
      de([...P.value, ...l]);
    }
    function N(p) {
      const l = [...P.value, w(p)];
      de(l);
    }
    function ue(p) {
      de(P.value.filter((l) => l.id !== p));
    }
    function te(p, l) {
      const t = P.value.findIndex((k) => k.id === p);
      if (t < 0) return;
      const D = l === "up" ? t - 1 : t + 1;
      if (D < 0 || D >= P.value.length) return;
      const r = [...P.value];
      [r[t], r[D]] = [r[D], r[t]], de(r);
    }
    function A(p, l) {
      const t = P.value.map((D) => D.id === p ? { ...D, ...l } : D);
      de(t);
    }
    function ge(p, l, t) {
      const D = P.value.find((k) => k.id === p);
      if (!D || D.type !== "list") return;
      const r = [...D.items || []];
      r[l] = t, A(p, { items: r });
    }
    function ye(p) {
      const l = P.value.find((t) => t.id === p);
      !l || l.type !== "list" || A(p, { items: [...l.items || [], "New item"] });
    }
    function Se(p, l) {
      const t = P.value.find((r) => r.id === p);
      if (!t || t.type !== "list") return;
      const D = (t.items || []).filter((r, k) => k !== l);
      A(p, { items: D });
    }
    function Ie(p, l, t, D) {
      const r = P.value.find((O) => O.id === p);
      if (!r || r.type !== "social") return;
      const k = (r.links || []).map((O, we) => we === l ? { ...O, [t]: D } : O);
      A(p, { links: k });
    }
    function M(p) {
      const l = P.value.find((t) => t.id === p);
      !l || l.type !== "social" || A(p, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function $(p, l) {
      const t = P.value.find((r) => r.id === p);
      if (!t || t.type !== "social") return;
      const D = (t.links || []).filter((r, k) => k !== l);
      A(p, { links: D });
    }
    function L(p, l, t, D) {
      const r = P.value.find((O) => O.id === p);
      if (!r || r.type !== "link_list") return;
      const k = (r.links || []).map((O, we) => we === l ? { ...O, [t]: D } : O);
      A(p, { links: k });
    }
    function Q(p) {
      const l = P.value.find((t) => t.id === p);
      !l || l.type !== "link_list" || A(p, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function ie(p, l) {
      const t = P.value.find((r) => r.id === p);
      if (!t || t.type !== "link_list") return;
      const D = (t.links || []).filter((r, k) => k !== l);
      A(p, { links: D });
    }
    function be(p, l) {
      const t = P.value.find((D) => D.id === p);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const D = [...t.cells || []];
          for (; D.length < l.columnCount; ) D.push("Cell content");
          l.cells = D.slice(0, l.columnCount);
        }
        A(p, l);
      }
    }
    function pe(p, l, t) {
      const D = P.value.find((k) => k.id === p);
      if (!D || D.type !== "row") return;
      const r = [...D.cells || []];
      r[l] = t, A(p, { cells: r });
    }
    function le(p, l, t, D) {
      const r = P.value.find((O) => O.id === p);
      if (!r || r.type !== "navbar") return;
      const k = (r.links || []).map((O, we) => we === l ? { ...O, [t]: D } : O);
      A(p, { links: k });
    }
    function Ae(p) {
      const l = P.value.find((t) => t.id === p);
      !l || l.type !== "navbar" || A(p, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function Le(p, l) {
      const t = P.value.find((D) => D.id === p);
      !t || t.type !== "navbar" || A(p, { links: (t.links || []).filter((D, r) => r !== l) });
    }
    function Ee(p, l, t, D) {
      const r = P.value.find((O) => O.id === p);
      if (!r || r.type !== "accordion") return;
      const k = (r.items || []).map((O, we) => we === l ? { ...O, [t]: D } : O);
      A(p, { items: k });
    }
    function We(p) {
      const l = P.value.find((t) => t.id === p);
      !l || l.type !== "accordion" || A(p, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function Ye(p, l) {
      const t = P.value.find((D) => D.id === p);
      !t || t.type !== "accordion" || A(p, { items: (t.items || []).filter((D, r) => r !== l) });
    }
    function Ne(p, l, t, D) {
      const r = P.value.find((O) => O.id === p);
      if (!r || r.type !== "carousel") return;
      const k = (r.slides || []).map((O, we) => we === l ? { ...O, [t]: D } : O);
      A(p, { slides: k });
    }
    function De(p) {
      const l = P.value.find((t) => t.id === p);
      !l || l.type !== "carousel" || A(p, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function je(p, l) {
      const t = P.value.find((D) => D.id === p);
      !t || t.type !== "carousel" || A(p, { slides: (t.slides || []).filter((D, r) => r !== l) });
    }
    function He(p, l = j.value) {
      const t = ` {{ .${l} }}`, D = C.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...D, l]));
      p === "subject" ? I("update", {
        subject: (Y.value || "") + t,
        variables: r
      }) : I("update", {
        preview_text: (z.value || "") + t,
        variables: r
      });
    }
    function Me(p, l = j.value) {
      const t = P.value.find((qe) => qe.id === p);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const D = ` {{ .${l} }}`, r = C.message.variables ?? [], k = Array.from(/* @__PURE__ */ new Set([...r, l])), O = (t.type === "footer", "content"), Ze = (t[O] ?? "") + D, tt = P.value.map(
        (qe) => qe.id === p ? { ...qe, [O]: Ze } : qe
      );
      I("update", { blocks: tt, variables: k });
    }
    function ae(p, l, t = j.value) {
      const D = P.value.find((Ze) => Ze.id === p);
      if (!D || D.type !== "row") return;
      const r = ` {{ .${t} }}`, k = C.message.variables ?? [], O = Array.from(/* @__PURE__ */ new Set([...k, t])), we = [...D.cells || []];
      we[l] = (we[l] || "") + r, A(p, { cells: we }), I("update", { variables: O });
    }
    function a(p, l, t = j.value) {
      const D = P.value.find((qe) => qe.id === p);
      if (!D || D.type !== "columns") return;
      const r = ` {{ .${t} }}`, k = C.message.variables ?? [], O = Array.from(/* @__PURE__ */ new Set([...k, t])), we = l === "left" ? "leftContent" : "rightContent", tt = (D[we] ?? "") + r;
      A(p, { [we]: tt }), I("update", { variables: O });
    }
    const o = re(null), h = re(null), v = [
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
    function E(p) {
      o.value = o.value === p ? null : p;
    }
    function x(p, l) {
      if (l) {
        if (p === "subject") He("subject", l);
        else if (p === "preview") He("preview", l);
        else if (p.startsWith("block:")) Me(p.slice(6), l);
        else if (p.startsWith("col-left:")) a(p.slice(9), "left", l);
        else if (p.startsWith("col-right:")) a(p.slice(10), "right", l);
        else if (p.startsWith("row:")) {
          const [, t, D] = p.split(":");
          ae(t, Number(D), l);
        }
        o.value = null;
      }
    }
    function U(p) {
      h.value = h.value === p ? null : p;
    }
    function H(p, l) {
      return `${String(p ?? "")}${l}`;
    }
    function ne(p, l) {
      var D, r;
      if (!l) return;
      const t = P.value.find((k) => k.id === p);
      if (t) {
        switch (t.type) {
          case "heading":
          case "paragraph":
          case "footer":
          case "quote":
          case "liquid":
          case "code_block":
            A(p, { content: `${String(t.content ?? "")}${l}` });
            break;
          case "button":
            A(p, { text: `${String(t.text ?? "")}${l}` });
            break;
          case "image":
            A(p, { alt: `${String(t.alt ?? "")}${l}` });
            break;
          case "video":
            A(p, { caption: `${String(t.caption ?? "")}${l}` });
            break;
          case "columns":
            A(p, { leftContent: `${String(t.leftContent ?? "")}${l}` });
            break;
          case "row": {
            const k = (Array.isArray(t.cells) ? [...t.cells] : []).map((O) => String(O ?? ""));
            k.length === 0 && k.push(""), k[0] = `${String(k[0] ?? "")}${l}`, A(p, { cells: k });
            break;
          }
          case "navbar":
          case "link_list": {
            const k = Array.isArray(t.links) ? [...t.links] : [];
            k.length || k.push({ text: "", url: "" }), k[0] = { ...k[0], text: `${String(((D = k[0]) == null ? void 0 : D.text) ?? "")}${l}` }, A(p, { links: k });
            break;
          }
          case "accordion": {
            const k = Array.isArray(t.items) ? [...t.items] : [];
            k.length || k.push({ title: "", content: "" }), k[0] = { ...k[0], title: `${String(((r = k[0]) == null ? void 0 : r.title) ?? "")}${l}` }, A(p, { items: k });
            break;
          }
          case "countdown":
            A(p, { label: `${String(t.label ?? "")}${l}` });
            break;
          case "product_card":
            A(p, { title: `${String(t.title ?? "")}${l}` });
            break;
          case "dynamic_image":
            A(p, { alt: `${String(t.alt ?? "")}${l}` });
            break;
        }
        h.value = null;
      }
    }
    function G(p, l) {
      var t, D, r, k, O, we, Ze, tt, qe;
      if (l) {
        if (p === "subject")
          I("update", { subject: H(Y.value, l) });
        else if (p === "preview")
          I("update", { preview_text: H(z.value, l) });
        else if (p === "from-name")
          I("update", { from_name: H(C.message.from_name, l) });
        else if (p.startsWith("block:")) {
          ne(p.slice(6), l);
          return;
        } else if (p.startsWith("col-left:")) {
          const ee = p.slice(9), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "columns" && A(ee, { leftContent: H(q.leftContent, l) });
        } else if (p.startsWith("col-right:")) {
          const ee = p.slice(10), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "columns" && A(ee, { rightContent: H(q.rightContent, l) });
        } else if (p.startsWith("row:")) {
          const [, ee, q] = p.split(":"), oe = Number(q), ke = P.value.find((Oe) => Oe.id === ee);
          if ((ke == null ? void 0 : ke.type) === "row" && Number.isFinite(oe)) {
            const Oe = [...ke.cells || []].map((Qt) => String(Qt ?? ""));
            Oe[oe] = H(Oe[oe], l), A(ee, { cells: Oe });
          }
        } else if (p.startsWith("button-text:")) {
          const ee = p.slice(12), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "button" && A(ee, { text: H(q.text, l) });
        } else if (p.startsWith("image-alt:")) {
          const ee = p.slice(10), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "image" && A(ee, { alt: H(q.alt, l) });
        } else if (p.startsWith("video-caption:")) {
          const ee = p.slice(14), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "video" && A(ee, { caption: H(q.caption, l) });
        } else if (p.startsWith("dynamic-alt:")) {
          const ee = p.slice(12), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "dynamic_image" && A(ee, { alt: H(q.alt, l) });
        } else if (p.startsWith("countdown-label:")) {
          const ee = p.slice(16), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "countdown" && A(ee, { label: H(q.label, l) });
        } else if (p.startsWith("product-title:")) {
          const ee = p.slice(14), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "product_card" && A(ee, { title: H(q.title, l) });
        } else if (p.startsWith("product-price:")) {
          const ee = p.slice(14), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "product_card" && A(ee, { price: H(q.price, l) });
        } else if (p.startsWith("product-button:")) {
          const ee = p.slice(15), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "product_card" && A(ee, { buttonText: H(q.buttonText, l) });
        } else if (p.startsWith("footer-address:")) {
          const ee = p.slice(15), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "footer" && A(ee, { companyAddress: H(q.companyAddress, l) });
        } else if (p.startsWith("code-caption:")) {
          const ee = p.slice(13), q = P.value.find((oe) => oe.id === ee);
          (q == null ? void 0 : q.type) === "code_block" && A(ee, { caption: H(q.caption, l) });
        } else if (p.startsWith("list-item:")) {
          const [, ee, q] = p.split(":"), oe = Number(q), ke = P.value.find((Oe) => Oe.id === ee);
          (ke == null ? void 0 : ke.type) === "list" && Number.isFinite(oe) && ge(ee, oe, H((t = ke.items) == null ? void 0 : t[oe], l));
        } else if (p.startsWith("link-list-item:")) {
          const [, ee, q] = p.split(":"), oe = Number(q), ke = P.value.find((Oe) => Oe.id === ee);
          (ke == null ? void 0 : ke.type) === "link_list" && Number.isFinite(oe) && L(ee, oe, "text", H((r = (D = ke.links) == null ? void 0 : D[oe]) == null ? void 0 : r.text, l));
        } else if (p.startsWith("navbar-item:")) {
          const [, ee, q] = p.split(":"), oe = Number(q), ke = P.value.find((Oe) => Oe.id === ee);
          (ke == null ? void 0 : ke.type) === "navbar" && Number.isFinite(oe) && le(ee, oe, "text", H((O = (k = ke.links) == null ? void 0 : k[oe]) == null ? void 0 : O.text, l));
        } else if (p.startsWith("accordion-title:")) {
          const [, ee, q] = p.split(":"), oe = Number(q), ke = P.value.find((Oe) => Oe.id === ee);
          (ke == null ? void 0 : ke.type) === "accordion" && Number.isFinite(oe) && Ee(ee, oe, "title", H((Ze = (we = ke.items) == null ? void 0 : we[oe]) == null ? void 0 : Ze.title, l));
        } else if (p.startsWith("accordion-content:")) {
          const [, ee, q] = p.split(":"), oe = Number(q), ke = P.value.find((Oe) => Oe.id === ee);
          (ke == null ? void 0 : ke.type) === "accordion" && Number.isFinite(oe) && Ee(ee, oe, "content", H((qe = (tt = ke.items) == null ? void 0 : tt[oe]) == null ? void 0 : qe.content, l));
        }
        h.value = null;
      }
    }
    function ce() {
      const p = K.value.trim();
      !p || B.value.includes(p) || (B.value = [...B.value, p], j.value = p, K.value = "");
    }
    return (p, l) => (n(), s("section", Au, [
      e("div", Tu, [
        e("div", Ru, [
          l[31] || (l[31] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          i.showReset ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => p.$emit("reset"))
          }, " Reset section ")) : b("", !0)
        ]),
        l[38] || (l[38] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Uu, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "From name", -1)),
          e("div", Lu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your Brand",
              value: i.message.from_name ?? "",
              onInput: _e
            }, null, 40, Bu),
            e("div", Pu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[1] || (l[1] = (t) => U("from-name")),
                title: "Insert emoji"
              }, "😊"),
              h.value === "from-name" ? (n(), s("div", Eu, [
                (n(), s(V, null, W(v, (t) => e("button", {
                  key: `emoji-from-name-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (D) => G("from-name", t)
                }, u(t), 9, Ou)), 64))
              ])) : b("", !0)
            ])
          ])
        ]),
        e("div", Nu, [
          l[33] || (l[33] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: i.message.from_address ?? "",
            onInput: se
          }, null, 40, Mu)
        ]),
        e("div", Vu, [
          l[34] || (l[34] = e("label", { class: "em-label" }, [
            Z("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: i.message.reply_to ?? "",
            onInput: X
          }, null, 40, Wu)
        ]),
        e("div", Du, [
          l[35] || (l[35] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", ju, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: Y.value,
              onInput: $e
            }, null, 40, Hu),
            e("div", Fu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => E("subject")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[3] || (l[3] = (t) => U("subject")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "subject" ? (n(), s("div", qu, [
                (n(!0), s(V, null, W(B.value, (t) => (n(), s("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (D) => x("subject", t)
                }, u(t), 9, zu))), 128))
              ])) : b("", !0),
              h.value === "subject" ? (n(), s("div", Yu, [
                (n(), s(V, null, W(v, (t) => e("button", {
                  key: `emoji-subject-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (D) => G("subject", t)
                }, u(t), 9, Ku)), 64))
              ])) : b("", !0)
            ])
          ]),
          e("span", {
            class: ve(["em-analyzer", `em-analyzer--${R.value}`])
          }, u(f(Su)(R.value)), 3),
          J.value.length ? (n(), s("span", Gu, "Spammy: " + u(J.value.join(", ")), 1)) : b("", !0)
        ]),
        e("div", Ju, [
          l[36] || (l[36] = e("label", { class: "em-label" }, [
            Z("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Xu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: z.value,
              onInput: Ce
            }, null, 40, Qu),
            e("div", Zu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[4] || (l[4] = (t) => E("preview")),
                title: "Insert variable"
              }, u(Fe)),
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[5] || (l[5] = (t) => U("preview")),
                title: "Insert emoji"
              }, "😊"),
              o.value === "preview" ? (n(), s("div", ec, [
                (n(!0), s(V, null, W(B.value, (t) => (n(), s("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (D) => x("preview", t)
                }, u(t), 9, tc))), 128))
              ])) : b("", !0),
              h.value === "preview" ? (n(), s("div", ac, [
                (n(), s(V, null, W(v, (t) => e("button", {
                  key: `emoji-preview-${t}`,
                  type: "button",
                  class: "em-emoji-menu-item",
                  onClick: (D) => G("preview", t)
                }, u(t), 9, nc)), 64))
              ])) : b("", !0)
            ])
          ]),
          l[37] || (l[37] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ve(["em-analyzer", `em-analyzer--${me.value}`])
          }, u(f(Iu)(me.value)), 3),
          F.value.length ? (n(), s("span", sc, "Spammy: " + u(F.value.join(", ")), 1)) : b("", !0)
        ])
      ]),
      e("div", oc, [
        l[39] || (l[39] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[40] || (l[40] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", ic, [
          (n(), s(V, null, W(y, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (D) => T(t)
          }, u(t.label), 9, lc)), 64))
        ])
      ]),
      e("div", rc, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", dc, [
          (n(!0), s(V, null, W(P.value, (t, D) => (n(), s("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", cc, [
              e("span", pc, u(t.type), 1),
              e("div", mc, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: D === 0,
                  onClick: (r) => te(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, vc),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: D === P.value.length - 1,
                  onClick: (r) => te(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, bc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => ue(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, hc)
              ])
            ]),
            t.type === "heading" ? (n(), s("div", yc, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (r) => A(t.id, { level: Number(r.target.value) })
              }, [...l[41] || (l[41] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, fc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (r) => A(t.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, gc),
              e("div", kc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`block:${t.id}`)
                }, u(Fe), 8, _c),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, wc),
                o.value === `block:${t.id}` ? (n(), s("div", $c, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `block-var-heading-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`block:${t.id}`, r)
                  }, u(r), 9, xc))), 128))
                ])) : b("", !0),
                h.value === `emoji:block:${t.id}` ? (n(), s("div", Cc, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-heading-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`block:${t.id}`, r)
                  }, u(r), 9, Sc)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "paragraph" ? (n(), s("div", Ic, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => A(t.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Ac),
              e("div", Tc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`block:${t.id}`)
                }, u(Fe), 8, Rc),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Uc),
                o.value === `block:${t.id}` ? (n(), s("div", Lc, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `block-var-paragraph-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`block:${t.id}`, r)
                  }, u(r), 9, Bc))), 128))
                ])) : b("", !0),
                h.value === `emoji:block:${t.id}` ? (n(), s("div", Pc, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-paragraph-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`block:${t.id}`, r)
                  }, u(r), 9, Ec)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "image" ? (n(), s("div", Oc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (r) => A(t.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, Nc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => A(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, Mc),
              e("div", Vc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`image-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Wc),
                h.value === `image-alt:${t.id}` ? (n(), s("div", Dc, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-image-alt-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`image-alt:${t.id}`, r)
                  }, u(r), 9, jc)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (r) => A(t.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Hc)
            ])) : t.type === "button" ? (n(), s("div", Fc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (r) => A(t.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, qc),
              e("div", zc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`button-text:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Yc),
                h.value === `button-text:${t.id}` ? (n(), s("div", Kc, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-button-text-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`button-text:${t.id}`, r)
                  }, u(r), 9, Gc)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (r) => A(t.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Jc),
              e("div", Xc, [
                l[42] || (l[42] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (r) => A(t.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, Qc)
              ]),
              e("label", Zc, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (r) => A(t.id, { ghost: r.target.checked })
                }, null, 40, ep),
                l[43] || (l[43] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (n(), s("div", tp, [
              l[44] || (l[44] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (r) => A(t.id, { height: Number(r.target.value) || 24 })
              }, null, 40, ap),
              l[45] || (l[45] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (n(), s("div", np, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => A(t.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, sp),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (r) => A(t.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, op),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (r) => A(t.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, ip),
              e("div", lp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`footer-address:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, rp),
                h.value === `footer-address:${t.id}` ? (n(), s("div", dp, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-footer-address-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`footer-address:${t.id}`, r)
                  }, u(r), 9, up)), 64))
                ])) : b("", !0)
              ]),
              e("div", cp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`block:${t.id}`)
                }, u(Fe), 8, pp),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, mp),
                o.value === `block:${t.id}` ? (n(), s("div", vp, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `block-var-footer-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`block:${t.id}`, r)
                  }, u(r), 9, bp))), 128))
                ])) : b("", !0),
                h.value === `emoji:block:${t.id}` ? (n(), s("div", hp, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-footer-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`block:${t.id}`, r)
                  }, u(r), 9, yp)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "list" ? (n(), s("div", fp, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (r) => A(t.id, { style: r.target.value })
              }, [...l[46] || (l[46] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, gp),
              e("div", kp, [
                (n(!0), s(V, null, W(t.items || [], (r, k) => (n(), s("div", {
                  key: k,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (O) => ge(t.id, k, O.target.value),
                    placeholder: `Item ${k + 1}`
                  }, null, 40, _p),
                  e("div", wp, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (O) => U(`list-item:${t.id}:${k}`),
                      title: "Insert emoji"
                    }, "😊", 8, $p),
                    h.value === `list-item:${t.id}:${k}` ? (n(), s("div", xp, [
                      (n(), s(V, null, W(v, (O) => e("button", {
                        key: `emoji-list-item-${t.id}-${k}-${O}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (we) => G(`list-item:${t.id}:${k}`, O)
                      }, u(O), 9, Cp)), 64))
                    ])) : b("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => Se(t.id, k),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Sp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ye(t.id)
              }, "+ Add item", 8, Ip)
            ])) : t.type === "quote" ? (n(), s("div", Ap, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => A(t.id, { style: r.target.value })
              }, [...l[47] || (l[47] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Tp),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => A(t.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Rp),
              e("div", Up, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`block:${t.id}`)
                }, u(Fe), 8, Lp),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Bp),
                o.value === `block:${t.id}` ? (n(), s("div", Pp, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `block-var-quote-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`block:${t.id}`, r)
                  }, u(r), 9, Ep))), 128))
                ])) : b("", !0),
                h.value === `emoji:block:${t.id}` ? (n(), s("div", Op, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-quote-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`block:${t.id}`, r)
                  }, u(r), 9, Np)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "social" ? (n(), s("div", Mp, [
              e("div", Vp, [
                (n(!0), s(V, null, W(t.links || [], (r, k) => (n(), s("div", {
                  key: k,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (O) => Ie(t.id, k, "platform", O.target.value)
                  }, [...l[48] || (l[48] = [
                    et('<option value="facebook" data-v-45065743>Facebook</option><option value="twitter" data-v-45065743>Twitter / X</option><option value="instagram" data-v-45065743>Instagram</option><option value="linkedin" data-v-45065743>LinkedIn</option><option value="youtube" data-v-45065743>YouTube</option><option value="tiktok" data-v-45065743>TikTok</option><option value="custom" data-v-45065743>Custom</option>', 7)
                  ])], 40, Wp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (O) => Ie(t.id, k, "url", O.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Dp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => $(t.id, k),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, jp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => M(t.id)
              }, "+ Add link", 8, Hp)
            ])) : t.type === "video" ? (n(), s("div", Fp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (r) => A(t.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, qp),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (r) => A(t.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, zp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => A(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Yp),
              e("div", Kp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`video-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Gp),
                h.value === `video-caption:${t.id}` ? (n(), s("div", Jp, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-video-caption-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`video-caption:${t.id}`, r)
                  }, u(r), 9, Xp)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "link_list" ? (n(), s("div", Qp, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => A(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Zp),
              e("div", em, [
                (n(!0), s(V, null, W(t.links || [], (r, k) => (n(), s("div", {
                  key: k,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (O) => L(t.id, k, "text", O.target.value),
                    placeholder: "Label"
                  }, null, 40, tm),
                  e("div", am, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (O) => U(`link-list-item:${t.id}:${k}`),
                      title: "Insert emoji"
                    }, "😊", 8, nm),
                    h.value === `link-list-item:${t.id}:${k}` ? (n(), s("div", sm, [
                      (n(), s(V, null, W(v, (O) => e("button", {
                        key: `emoji-link-list-item-${t.id}-${k}-${O}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (we) => G(`link-list-item:${t.id}:${k}`, O)
                      }, u(O), 9, om)), 64))
                    ])) : b("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (O) => L(t.id, k, "url", O.target.value),
                    placeholder: "URL"
                  }, null, 40, im),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => ie(t.id, k),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, lm)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Q(t.id)
              }, "+ Add link", 8, rm)
            ])) : t.type === "columns" ? (n(), s("div", dm, [
              l[49] || (l[49] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (r) => A(t.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, um),
              e("div", cm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`col-left:${t.id}`)
                }, u(Fe), 8, pm),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:col-left:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, mm),
                o.value === `col-left:${t.id}` ? (n(), s("div", vm, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `col-left-var-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`col-left:${t.id}`, r)
                  }, u(r), 9, bm))), 128))
                ])) : b("", !0),
                h.value === `emoji:col-left:${t.id}` ? (n(), s("div", hm, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-col-left-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`col-left:${t.id}`, r)
                  }, u(r), 9, ym)), 64))
                ])) : b("", !0)
              ]),
              l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (r) => A(t.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, fm),
              e("div", gm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`col-right:${t.id}`)
                }, u(Fe), 8, km),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:col-right:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, _m),
                o.value === `col-right:${t.id}` ? (n(), s("div", wm, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `col-right-var-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`col-right:${t.id}`, r)
                  }, u(r), 9, $m))), 128))
                ])) : b("", !0),
                h.value === `emoji:col-right:${t.id}` ? (n(), s("div", xm, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-col-right-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`col-right:${t.id}`, r)
                  }, u(r), 9, Cm)), 64))
                ])) : b("", !0)
              ])
            ])) : t.type === "divider" ? (n(), s("div", Sm, [
              e("div", Im, [
                l[51] || (l[51] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (r) => A(t.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, Am),
                l[52] || (l[52] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Tm, [
                l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (r) => A(t.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Rm)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => A(t.id, { lineStyle: r.target.value })
              }, [...l[54] || (l[54] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Um)
            ])) : t.type === "row" ? (n(), s("div", Lm, [
              l[56] || (l[56] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => be(t.id, { columnCount: Number(r.target.value) })
              }, [...l[55] || (l[55] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Bm),
              (n(!0), s(V, null, W(t.cells || [], (r, k) => (n(), s("div", {
                key: k,
                class: "em-row-cell"
              }, [
                e("label", Pm, "Column " + u(k + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (O) => pe(t.id, k, O.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Em),
                e("div", Om, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (O) => E(`row:${t.id}:${k}`)
                  }, u(Fe), 8, Nm),
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (O) => U(`emoji:row:${t.id}:${k}`),
                    title: "Insert emoji"
                  }, "😊", 8, Mm),
                  o.value === `row:${t.id}:${k}` ? (n(), s("div", Vm, [
                    (n(!0), s(V, null, W(B.value, (O) => (n(), s("button", {
                      key: `row-var-${t.id}-${k}-${O}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (we) => x(`row:${t.id}:${k}`, O)
                    }, u(O), 9, Wm))), 128))
                  ])) : b("", !0),
                  h.value === `emoji:row:${t.id}:${k}` ? (n(), s("div", Dm, [
                    (n(), s(V, null, W(v, (O) => e("button", {
                      key: `emoji-row-${t.id}-${k}-${O}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (we) => G(`row:${t.id}:${k}`, O)
                    }, u(O), 9, jm)), 64))
                  ])) : b("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (n(), s("div", Hm, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => A(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Fm),
              e("div", qm, [
                (n(!0), s(V, null, W(t.links || [], (r, k) => (n(), s("div", {
                  key: k,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (O) => le(t.id, k, "text", O.target.value),
                    placeholder: "Label"
                  }, null, 40, zm),
                  e("div", Ym, [
                    e("button", {
                      type: "button",
                      class: "em-chip em-chip--sm",
                      onClick: (O) => U(`navbar-item:${t.id}:${k}`),
                      title: "Insert emoji"
                    }, "😊", 8, Km),
                    h.value === `navbar-item:${t.id}:${k}` ? (n(), s("div", Gm, [
                      (n(), s(V, null, W(v, (O) => e("button", {
                        key: `emoji-navbar-item-${t.id}-${k}-${O}`,
                        type: "button",
                        class: "em-emoji-menu-item",
                        onClick: (we) => G(`navbar-item:${t.id}:${k}`, O)
                      }, u(O), 9, Jm)), 64))
                    ])) : b("", !0)
                  ]),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (O) => le(t.id, k, "url", O.target.value),
                    placeholder: "URL"
                  }, null, 40, Xm),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => Le(t.id, k),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Qm)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Ae(t.id)
              }, "+ Add link", 8, Zm)
            ])) : t.type === "accordion" ? (n(), s("div", ev, [
              (n(!0), s(V, null, W(t.items || [], (r, k) => (n(), s("div", {
                key: k,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (O) => Ee(t.id, k, "title", O.target.value),
                  placeholder: "Section title"
                }, null, 40, tv),
                e("div", av, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (O) => U(`accordion-title:${t.id}:${k}`),
                    title: "Insert emoji"
                  }, "😊", 8, nv),
                  h.value === `accordion-title:${t.id}:${k}` ? (n(), s("div", sv, [
                    (n(), s(V, null, W(v, (O) => e("button", {
                      key: `emoji-accordion-title-${t.id}-${k}-${O}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (we) => G(`accordion-title:${t.id}:${k}`, O)
                    }, u(O), 9, ov)), 64))
                  ])) : b("", !0)
                ]),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (O) => Ee(t.id, k, "content", O.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, iv),
                e("div", lv, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (O) => U(`accordion-content:${t.id}:${k}`),
                    title: "Insert emoji"
                  }, "😊", 8, rv),
                  h.value === `accordion-content:${t.id}:${k}` ? (n(), s("div", dv, [
                    (n(), s(V, null, W(v, (O) => e("button", {
                      key: `emoji-accordion-content-${t.id}-${k}-${O}`,
                      type: "button",
                      class: "em-emoji-menu-item",
                      onClick: (we) => G(`accordion-content:${t.id}:${k}`, O)
                    }, u(O), 9, uv)), 64))
                  ])) : b("", !0)
                ]),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (O) => Ye(t.id, k),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, cv)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => We(t.id)
              }, "+ Add section", 8, pv)
            ])) : t.type === "carousel" ? (n(), s("div", mv, [
              (n(!0), s(V, null, W(t.slides || [], (r, k) => (n(), s("div", {
                key: k,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (O) => Ne(t.id, k, "imageUrl", O.target.value),
                  placeholder: "Image URL"
                }, null, 40, vv),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (O) => Ne(t.id, k, "alt", O.target.value),
                  placeholder: "Alt text"
                }, null, 40, bv),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (O) => Ne(t.id, k, "linkUrl", O.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, hv),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (O) => je(t.id, k),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, yv)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => De(t.id)
              }, "+ Add slide", 8, fv)
            ])) : t.type === "countdown" ? (n(), s("div", gv, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (r) => A(t.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, kv),
              e("div", _v, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`countdown-label:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, wv),
                h.value === `countdown-label:${t.id}` ? (n(), s("div", $v, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-countdown-label-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`countdown-label:${t.id}`, r)
                  }, u(r), 9, xv)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (r) => A(t.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Cv),
              l[57] || (l[57] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (n(), s("div", Sv, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => A(t.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Iv),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (r) => A(t.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, Av),
              e("div", Tv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`product-title:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Rv),
                h.value === `product-title:${t.id}` ? (n(), s("div", Uv, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-product-title-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`product-title:${t.id}`, r)
                  }, u(r), 9, Lv)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (r) => A(t.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Bv),
              e("div", Pv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`product-price:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Ev),
                h.value === `product-price:${t.id}` ? (n(), s("div", Ov, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-product-price-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`product-price:${t.id}`, r)
                  }, u(r), 9, Nv)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (r) => A(t.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Mv),
              e("div", Vv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`product-button:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Wv),
                h.value === `product-button:${t.id}` ? (n(), s("div", Dv, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-product-button-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`product-button:${t.id}`, r)
                  }, u(r), 9, jv)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (r) => A(t.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Hv)
            ])) : t.type === "liquid" ? (n(), s("div", Fv, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => A(t.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, qv),
              e("div", zv, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`block:${t.id}`)
                }, u(Fe), 8, Yv),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, Kv),
                o.value === `block:${t.id}` ? (n(), s("div", Gv, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `block-var-liquid-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`block:${t.id}`, r)
                  }, u(r), 9, Jv))), 128))
                ])) : b("", !0),
                h.value === `emoji:block:${t.id}` ? (n(), s("div", Xv, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-liquid-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`block:${t.id}`, r)
                  }, u(r), 9, Qv)), 64))
                ])) : b("", !0)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (n(), s("div", Zv, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => A(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, eb),
              e("div", tb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`code-caption:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, ab),
                h.value === `code-caption:${t.id}` ? (n(), s("div", nb, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-code-caption-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`code-caption:${t.id}`, r)
                  }, u(r), 9, sb)), 64))
                ])) : b("", !0)
              ]),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => A(t.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, ob),
              e("div", ib, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => E(`block:${t.id}`)
                }, u(Fe), 8, lb),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`emoji:block:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, rb),
                o.value === `block:${t.id}` ? (n(), s("div", db, [
                  (n(!0), s(V, null, W(B.value, (r) => (n(), s("button", {
                    key: `block-var-code-${t.id}-${r}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (k) => x(`block:${t.id}`, r)
                  }, u(r), 9, ub))), 128))
                ])) : b("", !0),
                h.value === `emoji:block:${t.id}` ? (n(), s("div", cb, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-code-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`block:${t.id}`, r)
                  }, u(r), 9, pb)), 64))
                ])) : b("", !0)
              ]),
              l[59] || (l[59] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (n(), s("div", mb, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (r) => A(t.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, vb),
              e("div", bb, [
                l[60] || (l[60] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (r) => A(t.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, hb)
              ]),
              l[61] || (l[61] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (n(), s("div", yb, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => A(t.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, fb),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => A(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, gb),
              e("div", kb, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (r) => U(`dynamic-alt:${t.id}`),
                  title: "Insert emoji"
                }, "😊", 8, _b),
                h.value === `dynamic-alt:${t.id}` ? (n(), s("div", wb, [
                  (n(), s(V, null, W(v, (r) => e("button", {
                    key: `emoji-dynamic-alt-${t.id}-${r}`,
                    type: "button",
                    class: "em-emoji-menu-item",
                    onClick: (k) => G(`dynamic-alt:${t.id}`, r)
                  }, u(r), 9, $b)), 64))
                ])) : b("", !0)
              ]),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (r) => A(t.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, xb)
            ])) : b("", !0),
            _.includes(t.type) ? (n(), s("div", Cb, [
              e("div", Sb, [
                e("button", {
                  type: "button",
                  class: ve(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (r) => A(t.id, { alignment: "left" })
                }, [...l[62] || (l[62] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, Ib),
                e("button", {
                  type: "button",
                  class: ve(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (r) => A(t.id, { alignment: "center" })
                }, [...l[63] || (l[63] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, Ab),
                e("button", {
                  type: "button",
                  class: ve(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (r) => A(t.id, { alignment: "right" })
                }, [...l[64] || (l[64] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, Tb)
              ]),
              e("label", Rb, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (r) => A(t.id, { fullWidth: r.target.checked })
                }, null, 40, Ub),
                l[65] || (l[65] = e("span", null, "Full width", -1))
              ])
            ])) : b("", !0)
          ], 8, uc))), 128))
        ]),
        e("div", Lb, [
          l[66] || (l[66] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Bb, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => N("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => N("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => N("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => N("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => N("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => N("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => N("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => N("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => N("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => N("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => N("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => N("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => N("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => N("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => N("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => N("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => N("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => N("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => N("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => N("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[26] || (l[26] = (t) => N("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[27] || (l[27] = (t) => N("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[28] || (l[28] = (t) => N("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Pb, [
        l[71] || (l[71] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[72] || (l[72] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Eb, [
          l[69] || (l[69] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Ob, [
            Ve(e("select", {
              "onUpdate:modelValue": l[29] || (l[29] = (t) => j.value = t),
              class: "em-select em-select--flex"
            }, [
              (n(!0), s(V, null, W(B.value, (t) => (n(), s("option", {
                key: t,
                value: t
              }, u(t), 9, Nb))), 128))
            ], 512), [
              [ze, j.value]
            ])
          ])
        ]),
        e("div", Mb, [
          l[70] || (l[70] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Vb, [
            Ve(e("input", {
              "onUpdate:modelValue": l[30] || (l[30] = (t) => K.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [ht, K.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: ce
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Db = /* @__PURE__ */ Ue(Wb, [["__scopeId", "data-v-45065743"]]), jb = { class: "keos-email-builder" }, Hb = { class: "kb-builder-top" }, Fb = { class: "kb-email-layout" }, qb = { class: "kb-email-sidebar" }, zb = {
  key: 0,
  class: "kb-email-form"
}, Yb = { class: "kb-email-form-head" }, Kb = { class: "kb-email-form-head-top" }, Gb = { class: "kb-email-health-pill" }, Jb = { class: "kb-wa-form-head-row" }, Xb = ["value"], Qb = { class: "kb-email-health" }, Zb = { class: "kb-email-health-row" }, eh = { class: "kb-email-health-value" }, th = { class: "kb-email-health-bar" }, ah = { class: "kb-email-canvas" }, nh = {
  key: 0,
  class: "kb-email-test-banner"
}, sh = { class: "kb-email-preview-chrome" }, oh = { class: "kb-push-preview-controls" }, ih = { class: "kb-push-preview-as" }, lh = ["value"], rh = { class: "kb-preview-status" }, dh = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, uh = { class: "kb-email-inbox-strip" }, ch = { class: "kb-email-inbox-from" }, ph = { class: "kb-email-inbox-from-name" }, mh = { class: "kb-email-inbox-from-addr" }, vh = { class: "kb-email-inbox-subject" }, bh = ["title"], hh = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, yh = { class: "kb-email-body-canvas" }, fh = ["innerHTML"], gh = { class: "kb-email-actions" }, kh = {
  key: 0,
  class: "kb-actions-note"
}, _h = { key: 0 }, wh = { class: "kb-email-actions-right" }, $h = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, xh = { class: "kb-confirm-dialog" }, Ch = { class: "kb-confirm-actions" }, Sh = /* @__PURE__ */ Re({
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
  setup(i, { emit: d }) {
    function c(a) {
      if (!Array.isArray(a) || a.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const o = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), h = [
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
      ], v = (x, U) => {
        if (!h.includes(U.type)) return x;
        const H = U.alignment || "left", ne = !!U.fullWidth;
        return `<div style="text-align:${H};${ne ? "width:100%;" : ""}">${x}</div>`;
      }, E = [];
      for (const x of a)
        switch (x.type) {
          case "heading": {
            const U = Math.min(3, Math.max(1, Number(x.level) || 1)), H = o(x.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            E.push(
              v(
                `<h${U} style="margin:0 0 12px;font-size:${U === 1 ? "22" : U === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${H || "Heading"}</h${U}>`,
                x
              )
            );
            break;
          }
          case "paragraph": {
            const U = o(x.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            E.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${U || "Paragraph"}</p>`,
                x
              )
            );
            break;
          }
          case "image": {
            const U = (x.src || "").trim(), H = o(x.alt || ""), ne = (x.linkUrl || "").trim(), ce = !!x.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", Te = U ? `<img src="${o(U)}" alt="${H}" style="${ce}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            E.push(
              v(
                `<div style="margin:0 0 12px;">${ne ? `<a href="${o(ne)}" style="color:#2563eb;">${Te}</a>` : Te}</div>`,
                x
              )
            );
            break;
          }
          case "button": {
            const U = o(x.text || "Button"), H = (x.url || "#").trim(), ne = Math.min(24, Math.max(0, Number(x.borderRadius) ?? 8)), G = !!x.fullWidth, ce = !!x.ghost, Te = ce ? "transparent" : "#0f172a", p = ce ? "#0f172a" : "#fff", l = ce ? "2px solid #0f172a" : "none", t = G ? "block" : "inline-block", D = G ? "100%" : "auto";
            E.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${o(H)}" style="display:${t};width:${D};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${Te};color:${p};border:${l};text-decoration:none;font-size:14px;font-weight:600;border-radius:${ne}px;overflow-wrap:anywhere;">${U}</a></p>`,
                x
              )
            );
            break;
          }
          case "divider": {
            const U = Math.min(8, Math.max(1, Number(x.thickness) || 1)), H = (x.color || "#e2e8f0").trim() || "#e2e8f0", ne = x.lineStyle || "solid";
            E.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${U}px ${ne} ${H};" />`,
                x
              )
            );
            break;
          }
          case "spacer": {
            const U = Math.min(120, Math.max(8, Number(x.height) || 24));
            E.push(v(`<div style="height:${U}px;"></div>`, x));
            break;
          }
          case "footer": {
            const U = o(x.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), H = (x.unsubscribeUrl || "").trim(), ne = o(x.companyAddress || "");
            E.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${U || "Footer"}` + (H ? `<p style="margin:8px 0 0;"><a href="${o(H)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (ne ? `<p style="margin:4px 0 0;">${ne}</p>` : "") + "</div>",
                x
              )
            );
            break;
          }
          case "list": {
            const U = x.style === "numbered" ? "ol" : "ul", ne = (Array.isArray(x.items) ? x.items : []).map(
              (G) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${o(String(G)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            E.push(
              v(
                `<${U} style="margin:0 0 12px;padding-left:24px;">${ne || "<li>Item</li>"}</${U}>`,
                x
              )
            );
            break;
          }
          case "quote": {
            const U = o(x.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), H = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, ne = H[x.style || "default"] || H.default;
            E.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${ne}font-size:14px;line-height:1.6;">${U || "Quote"}</div>`,
                x
              )
            );
            break;
          }
          case "social": {
            const H = (Array.isArray(x.links) ? x.links : []).filter((ne) => (ne.url || "").trim());
            if (H.length === 0)
              E.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  x
                )
              );
            else {
              const ne = (G) => `<a href="${o((G.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${o(G.platform || "Link")}</a>`;
              E.push(
                v(
                  `<div style="margin:0 0 12px;">${H.map(ne).join("")}</div>`,
                  x
                )
              );
            }
            break;
          }
          case "video": {
            const U = (x.thumbnailUrl || "").trim(), H = (x.videoUrl || "#").trim(), ne = o(x.caption || ""), ce = !!x.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", Te = U ? `<img src="${o(U)}" alt="Video" style="${ce}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            E.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${o(H)}" style="display:block;color:inherit;">${Te}</a>` + (ne ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${ne}</p>` : "") + "</div>",
                x
              )
            );
            break;
          }
          case "link_list": {
            const U = Array.isArray(x.links) ? x.links : [], H = o(x.separator || " | "), G = U.filter(
              (ce) => (ce.text || ce.url) && (ce.url || "").trim()
            ).map(
              (ce) => `<a href="${o((ce.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(ce.text || "Link")}</a>`
            );
            E.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${G.join(H)}</p>`,
                x
              )
            );
            break;
          }
          case "columns": {
            const U = o(x.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), H = o(x.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            E.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${U || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${H || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const U = Math.min(4, Math.max(1, Number(x.columnCount) || 2)), H = Array.isArray(x.cells) ? x.cells.slice(0, U) : [], ne = 100 / U, G = Array.from({ length: U }, (ce, Te) => {
              const p = H[Te] ?? "", l = o(p).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${ne}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "—"}</td>`;
            }).join("");
            E.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${G}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const U = Array.isArray(x.links) ? x.links : [], H = o(x.separator || " | "), G = U.filter(
              (ce) => (ce.text || ce.url) && (ce.url || "").trim()
            ).map(
              (ce) => `<a href="${o((ce.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(ce.text || "Link")}</a>`
            );
            E.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${G.length ? G.join(H) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const H = (Array.isArray(x.items) ? x.items : []).map((ne) => {
              const G = o(ne.title || "Section"), ce = o(ne.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${G}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${ce}</div></details>`;
            }).join("");
            E.push(
              H ? `<div style="margin:0 0 12px;">${H}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const H = (Array.isArray(x.slides) ? x.slides : []).filter(
              (ne) => (ne.imageUrl || "").trim()
            );
            if (H.length === 0)
              E.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const ne = H[0], G = `<img src="${o(ne.imageUrl)}" alt="${o(ne.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, ce = (ne.linkUrl || "").trim();
              E.push(
                `<div style="margin:0 0 12px;">${ce ? `<a href="${o(ce)}">${G}</a>` : G}` + (H.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${H.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const U = o(x.label || "Offer ends in"), H = x.endDateTime ? new Date(x.endDateTime).toLocaleString() : "—";
            E.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${U}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${H}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const U = (x.imageUrl || "").trim(), H = o(x.title || "Product"), ne = o(x.price || ""), G = o(x.buttonText || "Buy now"), ce = (x.buttonUrl || "#").trim(), Te = U ? `<img src="${o(U)}" alt="${o(x.alt || H)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            E.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Te}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${H}</p>` + (ne ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${ne}</p>` : "") + `<a href="${o(ce)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${G}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const U = o((x.content || "").trim());
            E.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${U || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const U = (x.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), H = o((x.caption || "").trim());
            E.push(
              '<div style="margin:0 0 12px;">' + (H ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${H}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${U || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const U = (x.feedUrl || "").trim(), H = Math.min(20, Math.max(1, Number(x.maxItems) ?? 5));
            E.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (U ? `<p style="margin:0;font-size:12px;color:#64748b;">${o(U)} · max ${H} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const U = (x.imageUrl || "").trim(), H = (x.fallbackUrl || "").trim(), ne = o(x.alt || "Dynamic image");
            U ? E.push(
              `<div style="margin:0 0 12px;"><img src="${o(U)}" alt="${ne}" style="max-width:100%;height:auto;display:block;border:0;" />` + (H ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${o(H)}</p>` : "") + "</div>"
            ) : E.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return E.join("");
    }
    function m(a) {
      return /<\s*html[\s>]/i.test(a) || /<!doctype\s+html/i.test(a);
    }
    function _(a) {
      const o = a.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return o ? o[1] : a;
    }
    function w(a, o, h) {
      const v = (o || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), E = (h || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${v}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        E ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${E}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${a}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const C = i, I = d, {
      campaign: S,
      dirty: B,
      customValidatorErrors: j,
      getValidationWithWarnings: K,
      update: Y,
      updateMessage: z,
      undo: R,
      redo: me,
      canUndo: J,
      canRedo: F,
      resetMessage: P,
      hooks: de
    } = rt({
      initial: C.modelValue,
      hooks: {
        ...C.hooks,
        customValidators: async (a) => {
          var E, x, U;
          const o = [];
          (E = a.name) != null && E.trim() || o.push("Template name is required");
          const h = a.message;
          (x = h == null ? void 0 : h.subject) != null && x.trim() || o.push("Subject is required");
          const v = (U = C.hooks) != null && U.customValidators ? await C.hooks.customValidators(a) : [];
          return [...o, ...v];
        }
      },
      onDirty: () => I("change", S.value)
    }), { lastSavedAt: $e } = dt(S, { channel: "email" });
    function Ce(a) {
      (a.metaKey || a.ctrlKey) && a.key === "z" && (a.preventDefault(), a.shiftKey ? me() : R());
    }
    nt(() => {
      window.addEventListener("keydown", Ce);
    }), st(() => {
      window.removeEventListener("keydown", Ce);
    }), Pe(
      S,
      (a) => I("update:modelValue", {
        ...a,
        message: {
          ...a.message,
          html: Ne.value
        }
      }),
      { deep: !0 }
    );
    const _e = re(), se = re(!0);
    async function X() {
      if (de.estimateReach)
        try {
          _e.value = await de.estimateReach(S.value.audience);
        } catch {
          _e.value = void 0;
        }
      de.canSend && (se.value = await Promise.resolve(de.canSend()));
    }
    X(), Pe(() => S.value.audience, X, { deep: !0 });
    const y = g(() => (j.value, K(_e.value))), T = g(() => y.value.blockingErrors), N = g(() => y.value.warnings), ue = g(() => y.value.valid), te = g(() => {
      var v, E, x;
      const a = S.value.message, o = [
        !!((v = S.value.name) != null && v.trim()),
        !!((E = a.subject) != null && E.trim()),
        !!((x = a.from_address) != null && x.trim()),
        !!(Array.isArray(a.blocks) ? a.blocks.length : (a.html ?? "").trim().length),
        !!S.value.template_type
      ], h = o.filter(Boolean).length;
      return Math.round(h / o.length * 100);
    }), A = g(() => te.value >= 90 ? "Production ready" : te.value >= 70 ? "Strong draft" : te.value >= 40 ? "In progress" : "Needs setup"), ge = g(
      () => S.value.template_type ?? "transactional"
    ), ye = re(""), Se = re(!1), Ie = re(null), M = g(() => {
      const a = ye.value;
      return a ? Qe.find((o) => o.id === a) ?? null : null;
    });
    function $(a) {
      const o = S.value, h = a.campaign.message ? { ...o.message, ...a.campaign.message } : o.message;
      Y({
        ...a.campaign,
        message: h
      }), Ie.value = null, Se.value = !1;
    }
    function L(a) {
      const o = a.target.value;
      if (!o) return;
      const h = Rt.find((v) => v.id === o);
      h && (B.value ? (Ie.value = h, Se.value = !0) : $(h), a.target.value = "");
    }
    function Q(a) {
      Y({ template_type: a });
    }
    function ie(a) {
      Y({
        name: a,
        tracking: { ...S.value.tracking ?? {}, campaign_name: a }
      });
    }
    const be = g(
      () => S.value.message.subject ?? ""
    ), pe = g(
      () => S.value.message.preview_text ?? ""
    ), le = g(
      () => S.value.message.html ?? ""
    ), Ae = g(
      () => S.value.message.from_name ?? "Your App"
    ), Le = g(
      () => S.value.message.from_address ?? "notifications@example.com"
    ), Ee = g(
      () => S.value.message.blocks ?? []
    ), We = g(() => {
      const a = S.value.message, o = (a.html ?? "").trim(), v = (Array.isArray(a.blocks) ? a.blocks : []).some((E) => {
        if (!E || typeof E != "object") return !1;
        const x = (E.type ?? "").toString();
        if (x === "paragraph" || x === "heading" || x === "quote" || x === "footer") {
          const U = (E.content ?? "").toString().trim();
          return !(!U || U === "Heading" || U.startsWith("Your text here."));
        }
        return x === "image" || x === "video" || x === "dynamic_image" ? !!(E.src ?? E.imageUrl ?? E.thumbnailUrl ?? "").toString().trim() : x === "button" ? !!(E.text ?? "").toString().trim() : !0;
      });
      return !!((a.subject ?? "").toString().trim() || (a.preview_text ?? "").toString().trim() || o || v);
    }), Ye = g(() => {
      const a = Ee.value;
      if (Array.isArray(a) && a.length > 0)
        return c(a);
      const o = le.value;
      return o && o.trim() ? m(o) ? _(o) : o : c([]);
    }), Ne = g(() => {
      const a = Ee.value;
      if (Array.isArray(a) && a.length > 0)
        return w(
          c(a),
          be.value,
          pe.value
        );
      const o = le.value;
      return o && o.trim() ? m(o) ? o : w(o, be.value, pe.value) : w(
        c([]),
        be.value,
        pe.value
      );
    }), De = g(() => {
      const a = be.value;
      return M.value ? Ge(a, M.value.data) : a;
    }), je = g(() => {
      const a = pe.value;
      return M.value ? Ge(a, M.value.data) : a;
    }), He = g(() => {
      const a = Ye.value;
      return M.value ? Ge(a, M.value.data) : a;
    }), Me = re("desktop");
    function ae() {
      ue.value && I("save", {
        ...S.value,
        message: {
          ...S.value.message,
          html: Ne.value
        }
      });
    }
    return (a, o) => {
      var h;
      return n(), s("div", jb, [
        e("div", Hb, [
          Be(ut, {
            "campaign-name": f(S).name,
            status: f(S).status,
            dirty: f(B),
            "last-saved-at": f($e),
            "can-undo": f(J),
            "can-redo": f(F),
            "slugify-name": C.enforceSlugName,
            "onUpdate:campaignName": ie,
            onUndo: f(R),
            onRedo: f(me)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          T.value.length > 0 ? (n(), s("div", {
            key: 0,
            class: "kb-errors",
            style: fe({
              background: f(xe).dangerBg,
              border: `1px solid ${f(xe).dangerBorder}`,
              borderRadius: `${f(Je).input}px`,
              padding: `${f(he)[16]}px ${f(he)[24]}px`,
              marginBottom: `${f(he)[24]}px`
            })
          }, [
            e("ul", {
              style: fe({ margin: 0, paddingLeft: "1.25rem", color: f(xe).danger })
            }, [
              (n(!0), s(V, null, W(T.value, (v) => (n(), s("li", {
                key: v.message
              }, u(v.message), 1))), 128))
            ], 4)
          ], 4)) : b("", !0)
        ]),
        e("div", Fb, [
          e("aside", qb, [
            i.disabledSections.includes("email") ? b("", !0) : (n(), s("div", zb, [
              e("div", Yb, [
                e("div", Kb, [
                  o[8] || (o[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Gb, u(A.value), 1)
                ]),
                e("div", Jb, [
                  Be(_t, {
                    "template-type": ge.value,
                    onUpdate: Q
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: L
                  }, [
                    o[9] || (o[9] = e("option", { value: "" }, "Presets…", -1)),
                    (n(!0), s(V, null, W(f(Rt), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, Xb))), 128))
                  ], 32)
                ]),
                e("div", Qb, [
                  e("div", Zb, [
                    o[10] || (o[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", eh, u(te.value) + "%", 1)
                  ]),
                  e("div", th, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: fe({ width: `${te.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(Db, {
                message: f(S).message,
                "variable-options": i.variableOptions,
                "show-reset": !0,
                onUpdate: f(z),
                onReset: o[0] || (o[0] = (v) => f(P)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", ah, [
            !i.designOnly && f(S).audience.test_mode ? (n(), s("div", nh, [...o[11] || (o[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              Z(" Test mode — only your test segment will receive this. ", -1)
            ])])) : b("", !0),
            e("div", sh, [
              e("div", oh, [
                e("label", ih, [
                  o[13] || (o[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Ve(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = (v) => ye.value = v),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[12] || (o[12] = e("option", { value: "" }, "No substitution", -1)),
                    (n(!0), s(V, null, W(f(Qe), (v) => (n(), s("option", {
                      key: v.id,
                      value: v.id
                    }, u(v.label), 9, lh))), 128))
                  ], 512), [
                    [ze, ye.value]
                  ])
                ]),
                e("div", rh, [
                  o[14] || (o[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, u(Me.value), 1)
                ])
              ]),
              e("div", dh, [
                e("button", {
                  type: "button",
                  class: ve(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Me.value === "desktop"
                  }]),
                  onClick: o[2] || (o[2] = (v) => Me.value = "desktop")
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
                  Z(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: ve(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Me.value === "mobile"
                  }]),
                  onClick: o[3] || (o[3] = (v) => Me.value = "mobile")
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
                  Z(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: ve(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Me.value === "mobile",
                  "kb-email-preview-frame--empty": !We.value
                }])
              }, [
                e("div", uh, [
                  e("div", ch, [
                    e("span", ph, u(Ae.value), 1),
                    e("span", mh, "<" + u(Le.value) + ">", 1)
                  ]),
                  e("div", vh, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: De.value || "No subject"
                    }, u(De.value || "No subject"), 9, bh),
                    je.value ? (n(), s("span", hh, " — " + u(je.value), 1)) : b("", !0)
                  ])
                ]),
                e("div", yh, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: He.value
                  }, null, 8, fh)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", gh, [
          N.value.length > 0 ? (n(), s("div", kh, [
            o[17] || (o[17] = e("strong", null, "Warning:", -1)),
            Z(" " + u((h = N.value[0]) == null ? void 0 : h.message) + " ", 1),
            N.value.length > 1 ? (n(), s("span", _h, " (+" + u(N.value.length - 1) + " more) ", 1)) : b("", !0)
          ])) : b("", !0),
          e("div", wh, [
            i.showDuplicate ? (n(), s("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: o[4] || (o[4] = (v) => I("duplicate", JSON.parse(JSON.stringify(f(S)))))
            }, " Duplicate ")) : b("", !0),
            i.showSave ? (n(), s("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: ae
            }, " Save ")) : b("", !0),
            i.showClose ? (n(), s("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: o[5] || (o[5] = (v) => I("edit"))
            }, " Close ")) : b("", !0)
          ])
        ]),
        Se.value ? (n(), s("div", $h, [
          e("div", xh, [
            o[18] || (o[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[19] || (o[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Ch, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: o[6] || (o[6] = (v) => {
                  Se.value = !1, Ie.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: o[7] || (o[7] = (v) => Ie.value && $(Ie.value))
              }, " Replace ")
            ])
          ])
        ])) : b("", !0)
      ]);
    };
  }
}), Xt = /* @__PURE__ */ Ue(Sh, [["__scopeId", "data-v-f45fc2a3"]]), Ih = { class: "kb-shell" }, Ah = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Th = ["aria-selected", "onClick"], Rh = { class: "kb-shell__meta" }, Uh = ["href"], Lh = { class: "kb-shell__body" }, Bh = /* @__PURE__ */ Re({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(i, { emit: d }) {
    const c = d, m = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (_, w) => (n(), s("div", Ih, [
      e("header", {
        class: "kb-shell__header",
        style: fe({ padding: `${f(he)[12]}px ${f(he)[24]}px`, borderBottom: `1px solid ${f(xe).neutral.border}`, background: f(xe).neutral.bg })
      }, [
        w[0] || (w[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Ah, [
          (n(), s(V, null, W(m, (C) => e("button", {
            key: C.id,
            type: "button",
            class: ve(["kb-shell__channel", { "kb-shell__channel--active": i.channel === C.id }]),
            role: "tab",
            "aria-selected": i.channel === C.id,
            onClick: (I) => c("switch-channel", C.id)
          }, u(C.label), 11, Th)), 64))
        ]),
        e("div", Rh, [
          i.environment ? (n(), s("span", {
            key: 0,
            class: "kb-shell__env",
            style: fe({ padding: "2px 8px", borderRadius: `${f(Je).input}px`, fontSize: "0.75rem", background: f(xe).neutral.bg, color: f(xe).neutral.textMuted })
          }, u(i.environment), 5)) : b("", !0),
          i.helpUrl ? (n(), s("a", {
            key: 1,
            href: i.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: fe({ color: f(xe).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Uh)) : b("", !0)
        ])
      ], 4),
      e("div", Lh, [
        Ke(_.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Ph = /* @__PURE__ */ Ue(Bh, [["__scopeId", "data-v-0df30803"]]), Eh = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Oh = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Nh = ["onClick"], Mh = /* @__PURE__ */ Re({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(i) {
    var w;
    const d = i, c = re(((w = d.items[0]) == null ? void 0 : w.id) ?? "");
    let m = null;
    function _(C) {
      const I = document.getElementById(C);
      I && I.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return nt(() => {
      const C = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      C && (m = new IntersectionObserver(
        (I) => {
          for (const S of I)
            if (S.isIntersecting) {
              const B = S.target.getAttribute("data-outline-id");
              B && (c.value = B);
            }
        },
        { root: C === document ? null : C, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((I) => {
        const S = document.getElementById(I.id);
        S && (m == null || m.observe(S));
      }));
    }), st(() => {
      m == null || m.disconnect();
    }), Pe(
      () => d.items,
      (C) => {
        C.length && !c.value && (c.value = C[0].id);
      },
      { immediate: !0 }
    ), (C, I) => (n(), s("nav", Eh, [
      e("ul", Oh, [
        (n(!0), s(V, null, W(i.items, (S) => (n(), s("li", {
          key: S.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ve(["kb-outline__btn", { "kb-outline__btn--active": c.value === S.id }]),
            style: fe({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${f(he)[8]}px ${f(he)[12]}px`,
              border: "none",
              borderRadius: `${f(Je).input}px`,
              background: c.value === S.id ? f(xe).neutral.bg : "transparent",
              color: c.value === S.id ? "#0f172a" : f(xe).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: c.value === S.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (B) => _(S.id)
          }, u(S.label), 15, Nh)
        ]))), 128))
      ])
    ]));
  }
}), Vh = /* @__PURE__ */ Ue(Mh, [["__scopeId", "data-v-25c37675"]]), Wh = ["id"], Dh = {
  key: 1,
  class: "kb-form-shell__head"
}, jh = /* @__PURE__ */ Re({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(i) {
    return (d, c) => (n(), s("div", {
      class: "kb-form-shell",
      id: i.sectionId ?? void 0,
      style: fe({
        padding: `${f(he)[24]}px ${f(he)[24]}px ${f(he)[32]}px`,
        marginBottom: 0
      })
    }, [
      i.label ? (n(), s("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: fe({ marginBottom: f(he)[24], paddingBottom: f(he)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: fe({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: f(he)[12] })
        }, u(i.label), 5),
        Ke(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (n(), s("div", Dh, [
        Ke(d.$slots, "head", {}, void 0, !0)
      ])),
      Ke(d.$slots, "default", {}, void 0, !0)
    ], 12, Wh));
  }
}), Hh = /* @__PURE__ */ Ue(jh, [["__scopeId", "data-v-6504df41"]]), Fh = /* @__PURE__ */ Re({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(i) {
    return (d, c) => (n(), s("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: fe({
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
      Ke(d.$slots, "default")
    ], 4));
  }
}), qh = /* @__PURE__ */ Re({
  __name: "BuilderTopShell",
  setup(i) {
    return (d, c) => (n(), s("div", {
      class: "kb-top-shell",
      style: fe({
        marginLeft: f(he)[24],
        marginRight: f(he)[24]
      })
    }, [
      Ke(d.$slots, "header"),
      Ke(d.$slots, "errors"),
      Ke(d.$slots, "warnings"),
      Ke(d.$slots, "default")
    ], 4));
  }
});
function zh(i) {
  i.component("KeosNotificationBuilder", Kt), i.component("KeosWhatsAppBuilder", Gt), i.component("KeosSmsBuilder", Jt), i.component("KeosEmailBuilder", Xt), i.component("BuilderShell", Ph), i.component("BuilderOutline", Vh), i.component("BuilderVersionHistoryModal", Yt), i.component("BuilderFormShell", Hh), i.component("BuilderActionsBar", Fh), i.component("BuilderTopShell", qh);
}
const Kh = {
  install: zh,
  KeosNotificationBuilder: Kt,
  KeosWhatsAppBuilder: Gt,
  KeosSmsBuilder: Jt,
  KeosEmailBuilder: Xt
};
export {
  Fh as BuilderActionsBar,
  Hh as BuilderFormShell,
  Vh as BuilderOutline,
  Ph as BuilderShell,
  qh as BuilderTopShell,
  Yt as BuilderVersionHistoryModal,
  Qe as DEFAULT_SAMPLE_PROFILES,
  Xt as KeosEmailBuilder,
  Kt as KeosNotificationBuilder,
  Jt as KeosSmsBuilder,
  Gt as KeosWhatsAppBuilder,
  Kh as default,
  zh as install,
  Ge as renderTemplatePreview,
  dt as useAutosave,
  rt as useCampaignState
};
//# sourceMappingURL=index.js.map
