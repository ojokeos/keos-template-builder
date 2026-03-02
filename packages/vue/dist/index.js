import { ref as se, watch as Be, computed as w, defineComponent as _e, openBlock as s, createElementBlock as n, normalizeStyle as re, unref as d, createElementVNode as e, Fragment as K, renderList as G, toDisplayString as b, createTextVNode as X, createCommentVNode as _, normalizeClass as $e, withDirectives as Re, vModelSelect as Oe, vModelText as et, vModelCheckbox as Pt, createStaticVNode as Ne, withKeys as Vt, onMounted as De, onUnmounted as We, createVNode as Ce, createBlock as Et, withModifiers as Ye, renderSlot as Te } from "vue";
const Z = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Le = {
  input: 6,
  card: 12,
  button: 6
}, ie = {
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
ie.neutral.textMuted, ie.neutral.textMeta;
const ze = {
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
}, Mt = ["android", "ios", "web"], kt = "normal", _t = ["low", "normal", "high"], wt = 86400, Nt = [3600, 7200, 86400, 172800], $t = "1.0", Ot = ["topic", "segment", "user_list"];
function tt() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Mt],
    test_mode: !1
  };
}
function at() {
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
function st() {
  return {
    priority: kt,
    ttl: wt,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function nt() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function Dt(a) {
  return {
    schema_version: $t,
    name: "",
    status: "draft",
    audience: tt(),
    message: at(),
    delivery: st(),
    tracking: nt(),
    ...a
  };
}
function xt(a) {
  const o = a;
  return o.schema_version || (o.schema_version = $t), o.audience || (o.audience = tt()), o.message || (o.message = at()), o.delivery || (o.delivery = st()), o.tracking || (o.tracking = nt()), _t.includes(o.delivery.priority) || (o.delivery.priority = kt), o.delivery.ttl === void 0 && (o.delivery.ttl = wt), Ot.includes(o.audience.type) || (o.audience.type = "topic"), o.audience.type === "topic" && !o.audience.topic_name && (o.audience.topic_name = "default"), o;
}
const Wt = 1e5;
function Ht(a, o) {
  var u, i, x;
  const c = [], p = o ?? a.audience.estimated_reach;
  return p !== void 0 && p >= Wt && c.push({
    message: `Estimated reach is very high (${p.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), a.tracking && !((u = a.tracking.campaign_name) != null && u.trim()) && !((i = a.name) != null && i.trim()) && c.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (x = a.message.deep_link) != null && x.trim() || c.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), c;
}
function St(a, o = "error") {
  return { message: a, severity: o };
}
function Ct(a) {
  const o = [];
  return a.schema_version || o.push(St("Missing schema_version")), {
    valid: o.length === 0,
    errors: o
  };
}
function zt(a, o) {
  const c = Ct(a), p = Ht(a, o);
  return {
    valid: c.valid,
    errors: [
      ...c.errors,
      ...p.map((u) => St(u.message, u.severity))
    ]
  };
}
function Ft(a) {
  return a.errors.filter((o) => o.severity === "error");
}
function qt(a) {
  return a.errors.filter((o) => o.severity !== "error");
}
function Ve(a, o) {
  return a.length <= o ? { text: a, truncated: !1 } : { text: a.slice(0, Math.max(0, o - 3)) + "...", truncated: !0 };
}
const He = ze.android;
function jt(a) {
  const { title: o, body: c } = a, p = Ve(o || "", He.title), u = Ve(c || "", He.body);
  return {
    title: p.text,
    body: u.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: u.truncated,
    expanded: !1
  };
}
function Kt(a) {
  const { title: o, body: c } = a, p = Ve(o || "", He.title), u = Ve(c || "", He.body);
  return {
    title: p.text,
    body: u.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: u.truncated,
    expanded: !0
  };
}
function Yt(a, o = {}) {
  const c = o.expanded ? Kt(a) : jt(a);
  return o.darkMode !== void 0 && (c.darkMode = o.darkMode), c;
}
const ot = ze.ios;
function It(a) {
  const { title: o, body: c } = a, p = Ve(o || "", ot.title), u = Ve(c || "", ot.body);
  return {
    title: p.text,
    body: u.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: u.truncated,
    expanded: !1
  };
}
function Jt(a) {
  return It(a);
}
function Gt(a, o = {}) {
  const c = o.variant === "lockscreen" ? Jt(a) : It(a);
  return o.darkMode !== void 0 && (c.darkMode = o.darkMode), c;
}
const it = ze.web;
function rt(a) {
  const { title: o, body: c } = a, p = Ve(o || "", it.title), u = Ve(c || "", it.body);
  return {
    title: p.text,
    body: u.text,
    imageUrl: a.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: u.truncated
  };
}
function Xt(a) {
  return a.map((o) => ({ message: o, severity: "error" }));
}
function Je(a) {
  return JSON.parse(JSON.stringify(a));
}
function Fe(a = {}) {
  const o = se(
    xt(a.initial ?? Dt())
  ), c = a.hooks ?? {}, p = se(!1), u = se([]);
  Be(
    o,
    () => {
      if (!c.customValidators) {
        u.value = [];
        return;
      }
      c.customValidators(o.value).then((z) => {
        u.value = z;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const i = se([]), x = se([]);
  function I() {
    const z = Je(o.value);
    i.value = [...i.value.slice(-19), z], x.value = [];
  }
  const k = w(() => i.value.length > 0), T = w(() => x.value.length > 0);
  function P() {
    i.value.length !== 0 && (x.value = [Je(o.value), ...x.value], o.value = i.value[i.value.length - 1], i.value = i.value.slice(0, -1));
  }
  function q() {
    x.value.length !== 0 && (i.value = [...i.value, Je(o.value)], o.value = x.value[0], x.value = x.value.slice(1));
  }
  Be(
    o,
    () => {
      var z;
      p.value = !0, (z = a.onDirty) == null || z.call(a);
    },
    { deep: !0 }
  );
  const H = w(() => Ct(o.value));
  function ee(z) {
    const be = zt(o.value, z), oe = Xt(u.value), C = [...Ft(be), ...oe], ke = [...be.errors, ...oe], U = be.valid && oe.length === 0;
    return {
      ...be,
      errors: ke,
      valid: U,
      blockingErrors: C,
      warnings: qt(be)
    };
  }
  function J(z) {
    I(), o.value = { ...o.value, ...z };
  }
  function ge(z) {
    I(), o.value = {
      ...o.value,
      audience: { ...o.value.audience, ...z }
    };
  }
  function S(z) {
    I(), o.value = {
      ...o.value,
      message: { ...o.value.message, ...z }
    };
  }
  function $(z) {
    I(), o.value = {
      ...o.value,
      delivery: { ...o.value.delivery, ...z }
    };
  }
  function L(z) {
    I(), o.value = {
      ...o.value,
      tracking: o.value.tracking ? { ...o.value.tracking, ...z } : { campaign_name: "", tags: [], ab_test: !1, ...z }
    };
  }
  function ne(z) {
    I(), o.value = {
      ...o.value,
      message: { ...at(), ...z }
    };
  }
  function j(z) {
    I(), o.value = {
      ...o.value,
      delivery: { ...st(), ...z }
    };
  }
  function he(z) {
    I(), o.value = {
      ...o.value,
      tracking: { ...nt(), ...z }
    };
  }
  function fe(z) {
    I(), o.value = {
      ...o.value,
      audience: { ...tt(), ...z }
    };
  }
  const ve = w(() => ({
    title: o.value.message.title,
    body: o.value.message.body,
    imageUrl: o.value.message.image_url
  }));
  function pe(z, be) {
    const oe = ve.value;
    let C;
    switch (z) {
      case "android":
        C = Yt(oe, { expanded: be == null ? void 0 : be.expanded });
        break;
      case "ios":
        C = Gt(oe);
        break;
      case "web":
        C = rt(oe);
        break;
      default:
        C = rt(oe);
    }
    const ke = o.value.message.actions ?? [], U = o.value.message.location;
    return { ...C, actions: ke, location: U ?? void 0 };
  }
  const le = ze;
  async function ye() {
    return c.customValidators ? c.customValidators(o.value) : [];
  }
  return {
    campaign: o,
    dirty: p,
    validation: H,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: u,
    getValidationWithWarnings: ee,
    update: J,
    updateAudience: ge,
    updateMessage: S,
    updateDelivery: $,
    updateTracking: L,
    undo: P,
    redo: q,
    canUndo: k,
    canRedo: T,
    resetMessage: ne,
    resetDelivery: j,
    resetTracking: he,
    resetAudience: fe,
    getPreview: pe,
    previewInput: ve,
    characterLimits: le,
    runCustomValidators: ye,
    hooks: c
  };
}
const Qt = "keos-draft", Zt = 2e3;
function ea(a, o) {
  return `${Qt}-${a}-${o}`;
}
function qe(a, o) {
  const c = o.channel, p = w(
    () => {
      var P, q;
      return ea(
        c,
        o.key ?? ((P = a.value) == null ? void 0 : P.id) ?? ((q = a.value) == null ? void 0 : q.name) ?? "draft"
      );
    }
  ), u = se(null);
  let i = null;
  function x() {
    try {
      const P = JSON.stringify(a.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(p.value, P), u.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function I() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(p.value);
    } catch {
    }
  }
  function k() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const P = window.localStorage.getItem(p.value);
      if (!P) return null;
      const q = JSON.parse(P);
      return xt(q);
    } catch {
      return null;
    }
  }
  function T() {
    return o.enabled === void 0 ? !0 : typeof o.enabled == "boolean" ? o.enabled : o.enabled.value;
  }
  return Be(
    a,
    () => {
      T() && (i && clearTimeout(i), i = setTimeout(() => {
        i = null, x();
      }, Zt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: u,
    clearDraft: I,
    getDraft: k,
    persist: x
  };
}
const ta = { class: "kb-header__row" }, aa = ["value"], sa = { class: "kb-header__actions" }, na = ["disabled"], la = ["disabled"], oa = ["value"], ia = ["value"], ra = /* @__PURE__ */ _e({
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
    ], p = a, u = o;
    function i(k) {
      return p.slugifyName ? k.trim().replace(/\s+/g, "-") : k;
    }
    function x(k) {
      return k.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function I(k) {
      const T = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return T[k] ?? T.draft;
    }
    return (k, T) => (s(), n("header", {
      class: "kb-header",
      style: re({
        padding: `${d(Z)[16]}px 0`,
        borderBottom: `1px solid ${d(ie).neutral.border}`,
        marginBottom: `${d(Z)[16]}px`
      })
    }, [
      e("div", ta, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: a.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: T[0] || (T[0] = (P) => u("update:campaignName", i(P.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, aa),
        e("div", sa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !a.canUndo,
            onClick: T[1] || (T[1] = (P) => u("undo"))
          }, " Undo ", 8, na),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !a.canRedo,
            onClick: T[2] || (T[2] = (P) => u("redo"))
          }, " Redo ", 8, la)
        ]),
        a.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: a.workflowStatus,
          class: "kb-header__status-select",
          style: re({
            padding: `${d(Z)[4]}px ${d(Z)[8]}px`,
            borderRadius: `${d(Le).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...I(a.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: T[3] || (T[3] = (P) => u("update:workflowStatus", P.target.value))
        }, [
          (s(), n(K, null, G(c, (P) => e("option", {
            key: P.value,
            value: P.value
          }, b(P.label), 9, ia)), 64))
        ], 44, oa)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: re({
            padding: `${d(Z)[4]}px ${d(Z)[8]}px`,
            borderRadius: `${d(Le).input}px`,
            background: d(ie).neutral.bg,
            fontSize: "0.8125rem",
            color: d(ie).neutral.textMuted
          })
        }, b(a.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: re({ fontSize: "0.8125rem", color: d(ie).neutral.textMuted, marginTop: `${d(Z)[4]}px` })
      }, [
        a.saving ? (s(), n(K, { key: 0 }, [
          X("Saving…")
        ], 64)) : a.dirty ? (s(), n(K, { key: 1 }, [
          X("Unsaved changes")
        ], 64)) : a.lastSavedAt ? (s(), n(K, { key: 2 }, [
          X("Last saved at " + b(x(a.lastSavedAt)), 1)
        ], 64)) : _("", !0)
      ], 4)
    ], 4));
  }
}), xe = (a, o) => {
  const c = a.__vccOpts || a;
  for (const [p, u] of o)
    c[p] = u;
  return c;
}, je = /* @__PURE__ */ xe(ra, [["__scopeId", "data-v-ef058bcb"]]), da = { class: "kb-section" }, ua = { class: "kb-section__head" }, ca = { class: "kb-section__desc" }, pa = { class: "kb-field" }, ma = { class: "kb-label" }, va = { class: "kb-field-with-rail" }, ba = ["value", "aria-invalid", "aria-describedby"], ga = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, fa = { class: "kb-field" }, ya = { class: "kb-label" }, ha = { class: "kb-field-with-rail" }, ka = ["value", "aria-invalid", "aria-describedby"], _a = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, wa = { class: "kb-field" }, $a = ["value", "aria-invalid", "aria-describedby"], xa = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Sa = { class: "kb-field" }, Ca = ["value", "aria-invalid", "aria-describedby"], Ia = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Ba = { class: "kb-field" }, Aa = { class: "kb-location-row" }, La = ["value"], Ua = ["value"], Ra = ["value"], Ta = ["value"], Pa = { class: "kb-field" }, Va = { class: "kb-actions-list" }, Ea = ["value", "onInput"], Ma = ["value", "onInput"], Na = ["onClick"], Oa = ["disabled"], Da = { class: "kb-action-chips" }, Wa = ["disabled", "onClick"], Ha = /* @__PURE__ */ _e({
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
      var u, i, x, I;
      return s(), n("section", da, [
        e("div", ua, [
          p[10] || (p[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (k) => c.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", ca, " Message body is required. Title is optional. Character limits depend on the selected platform (" + b(a.selectedPlatform) + "). ", 1),
        e("div", pa, [
          e("label", ma, [
            p[11] || (p[11] = X(" Title ", -1)),
            e("span", {
              class: $e(["kb-counter", { "kb-counter--warn": a.titleCount > a.titleLimit }])
            }, b(a.titleCount) + "/" + b(a.titleLimit), 3)
          ]),
          e("div", va, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: a.message.title,
              "aria-invalid": !!a.titleError,
              "aria-describedby": a.titleError ? "title-error" : void 0,
              onInput: p[1] || (p[1] = (k) => c.$emit("update", { title: k.target.value }))
            }, null, 40, ba),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: re({ "--pct": Math.min(100, a.titleCount / a.titleLimit * 100) + "%" })
            }, [...p[12] || (p[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.titleError ? (s(), n("p", ga, b(a.titleError), 1)) : _("", !0)
        ]),
        e("div", fa, [
          e("label", ya, [
            p[13] || (p[13] = X(" Message ", -1)),
            e("span", {
              class: $e(["kb-counter", { "kb-counter--warn": a.bodyCount > a.bodyLimit }])
            }, b(a.bodyCount) + "/" + b(a.bodyLimit), 3)
          ]),
          e("div", ha, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: a.message.body,
              "aria-invalid": !!a.bodyError,
              "aria-describedby": a.bodyError ? "body-error" : void 0,
              onInput: p[2] || (p[2] = (k) => c.$emit("update", { body: k.target.value }))
            }, null, 40, ka),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: re({ "--pct": Math.min(100, a.bodyCount / a.bodyLimit * 100) + "%" })
            }, [...p[14] || (p[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.bodyError ? (s(), n("p", _a, b(a.bodyError), 1)) : _("", !0)
        ]),
        e("div", wa, [
          p[15] || (p[15] = e("label", { class: "kb-label" }, [
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
            onInput: p[3] || (p[3] = (k) => c.$emit("update", { image_url: k.target.value || void 0 }))
          }, null, 40, $a),
          a.imageUrlError ? (s(), n("p", xa, b(a.imageUrlError), 1)) : _("", !0)
        ]),
        e("div", Sa, [
          p[16] || (p[16] = e("label", { class: "kb-label" }, [
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
            onInput: p[4] || (p[4] = (k) => c.$emit("update", { deep_link: k.target.value || void 0 }))
          }, null, 40, Ca),
          a.deepLinkError ? (s(), n("p", Ia, b(a.deepLinkError), 1)) : _("", !0)
        ]),
        e("div", Ba, [
          p[17] || (p[17] = e("label", { class: "kb-label" }, [
            X(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Aa, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((u = a.message.location) == null ? void 0 : u.lat) ?? "",
              onInput: p[5] || (p[5] = (k) => {
                const T = { ...a.message.location ?? {} }, P = k.target.value;
                T.lat = P === "" ? void 0 : Number(P), c.$emit("update", { location: T });
              })
            }, null, 40, La),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((i = a.message.location) == null ? void 0 : i.lon) ?? "",
              onInput: p[6] || (p[6] = (k) => {
                const T = { ...a.message.location ?? {} }, P = k.target.value;
                T.lon = P === "" ? void 0 : Number(P), c.$emit("update", { location: T });
              })
            }, null, 40, Ua)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((x = a.message.location) == null ? void 0 : x.name) ?? "",
            onInput: p[7] || (p[7] = (k) => {
              const T = { ...a.message.location ?? {} };
              T.name = k.target.value || void 0, c.$emit("update", { location: T });
            })
          }, null, 40, Ra),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((I = a.message.location) == null ? void 0 : I.address) ?? "",
            onInput: p[8] || (p[8] = (k) => {
              const T = { ...a.message.location ?? {} };
              T.address = k.target.value || void 0, c.$emit("update", { location: T });
            })
          }, null, 40, Ta)
        ]),
        e("div", Pa, [
          p[19] || (p[19] = e("label", { class: "kb-label" }, [
            X(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Va, [
            (s(!0), n(K, null, G(o.message.actions ?? [], (k, T) => (s(), n("div", {
              key: k.id || T,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: k.label,
                onInput: (P) => {
                  var ee;
                  const q = [...o.message.actions ?? []], H = Number(T);
                  q[H] = {
                    ...q[H],
                    id: ((ee = q[H]) == null ? void 0 : ee.id) || `action_${H + 1}`,
                    label: P.target.value
                  }, c.$emit("update", { actions: q });
                }
              }, null, 40, Ea),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: k.url,
                onInput: (P) => {
                  var ee;
                  const q = [...o.message.actions ?? []], H = Number(T);
                  q[H] = {
                    ...q[H],
                    id: ((ee = q[H]) == null ? void 0 : ee.id) || `action_${H + 1}`,
                    url: P.target.value || void 0
                  }, c.$emit("update", { actions: q });
                }
              }, null, 40, Ma),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const P = [...o.message.actions ?? []];
                  P.splice(Number(T), 1), c.$emit("update", { actions: P });
                }
              }, " Remove ", 8, Na)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (o.message.actions ?? []).length >= 3,
              onClick: p[9] || (p[9] = () => {
                const k = [...o.message.actions ?? []];
                k.push({
                  id: `action_${k.length + 1}`,
                  label: "",
                  url: ""
                }), c.$emit("update", { actions: k });
              })
            }, " Add action ", 8, Oa),
            e("div", Da, [
              p[18] || (p[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (s(), n(K, null, G(["View order", "Track shipment", "Open app"], (k) => e("button", {
                key: k,
                type: "button",
                class: "kb-action-chip",
                disabled: (o.message.actions ?? []).length >= 3,
                onClick: () => {
                  const T = [...o.message.actions ?? []];
                  T.push({
                    id: `action_${Date.now()}`,
                    label: k,
                    url: ""
                  }), c.$emit("update", { actions: T });
                }
              }, b(k), 9, Wa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), za = /* @__PURE__ */ xe(Ha, [["__scopeId", "data-v-7bc3a44c"]]), Fa = { class: "kb-section kb-section--inline-personalization" }, qa = { class: "kb-field" }, ja = { class: "kb-insert-row" }, Ka = ["value"], Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = { class: "kb-field" }, Xa = { class: "kb-variable-list" }, Qa = /* @__PURE__ */ _e({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(a, { emit: o }) {
    const c = a, p = o, u = ["first_name", "last_name", "order_id", "city"], i = se(c.variableOptions ?? u), x = se(i.value[0] ?? u[0]), I = se("");
    Be(
      () => c.variableOptions,
      (q) => {
        q && q.length && (i.value = [...q], i.value.includes(x.value) || (x.value = i.value[0]));
      }
    );
    const k = w(() => i.value);
    function T(q) {
      p("insertVariable", { variable: x.value, field: q });
    }
    function P() {
      const q = I.value.trim();
      q && (i.value.includes(q) || (i.value = [...i.value, q]), x.value = q, I.value = "");
    }
    return (q, H) => (s(), n("section", Fa, [
      H[8] || (H[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      H[9] || (H[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", qa, [
        H[4] || (H[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", ja, [
          Re(e("select", {
            "onUpdate:modelValue": H[0] || (H[0] = (ee) => x.value = ee),
            class: "kb-select"
          }, [
            (s(!0), n(K, null, G(k.value, (ee) => (s(), n("option", {
              key: ee,
              value: ee
            }, b(ee), 9, Ka))), 128))
          ], 512), [
            [Oe, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H[1] || (H[1] = (ee) => T("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H[2] || (H[2] = (ee) => T("body"))
          }, "Into message")
        ])
      ]),
      e("div", Ya, [
        H[5] || (H[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ja, [
          Re(e("input", {
            "onUpdate:modelValue": H[3] || (H[3] = (ee) => I.value = ee),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [et, I.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: P
          }, " Add ")
        ])
      ]),
      e("div", Ga, [
        H[6] || (H[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        H[7] || (H[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Xa, [
          (s(!0), n(K, null, G(k.value, (ee) => (s(), n("li", { key: ee }, [
            e("code", null, "{{ " + b(ee) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Bt = /* @__PURE__ */ xe(Qa, [["__scopeId", "data-v-6d49f6dc"]]), Za = { class: "kb-section kb-section--template-type" }, es = { class: "kb-field" }, ts = { class: "kb-radio-group" }, as = { class: "kb-radio" }, ss = ["checked"], ns = { class: "kb-radio" }, ls = ["checked"], os = /* @__PURE__ */ _e({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(a, { emit: o }) {
    const c = o;
    return (p, u) => (s(), n("section", Za, [
      u[5] || (u[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      u[6] || (u[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", es, [
        e("div", ts, [
          e("label", as, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: a.templateType === "transactional",
              onChange: u[0] || (u[0] = (i) => c("update", "transactional"))
            }, null, 40, ss),
            u[2] || (u[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", ns, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: a.templateType === "marketing",
              onChange: u[1] || (u[1] = (i) => c("update", "marketing"))
            }, null, 40, ls),
            u[3] || (u[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        u[4] || (u[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), lt = /* @__PURE__ */ xe(os, [["__scopeId", "data-v-991f74e5"]]), is = { class: "kb-section" }, rs = { class: "kb-section__head" }, ds = { class: "kb-section__desc" }, us = { class: "kb-field" }, cs = { class: "kb-radio-group" }, ps = { class: "kb-radio" }, ms = ["checked"], vs = { class: "kb-radio" }, bs = ["checked"], gs = {
  key: 0,
  class: "kb-field kb-row"
}, fs = ["value"], ys = ["value"], hs = { class: "kb-field" }, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Ss = { class: "kb-field" }, Cs = { class: "kb-checkbox" }, Is = ["checked"], Bs = /* @__PURE__ */ _e({
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
      var u;
      return s(), n("section", is, [
        e("div", rs, [
          p[8] || (p[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (i) => c.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", ds, b(a.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", us, [
          p[11] || (p[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", cs, [
            e("label", ps, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !a.delivery.scheduled_at,
                onChange: p[1] || (p[1] = (i) => c.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, ms),
              p[9] || (p[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", vs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!a.delivery.scheduled_at,
                onChange: p[2] || (p[2] = (i) => c.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, bs),
              p[10] || (p[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        a.delivery.scheduled_at ? (s(), n("div", gs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (u = a.delivery.scheduled_at) == null ? void 0 : u.slice(0, 16),
            onInput: p[3] || (p[3] = (i) => c.$emit("update", { scheduled_at: i.target.value }))
          }, null, 40, fs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: a.delivery.timezone,
            onInput: p[4] || (p[4] = (i) => c.$emit("update", { timezone: i.target.value }))
          }, null, 40, ys)
        ])) : _("", !0),
        a.showPushOptions ? (s(), n(K, { key: 1 }, [
          e("div", hs, [
            p[12] || (p[12] = e("label", { class: "kb-label" }, [
              X(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.ttl,
              onChange: p[5] || (p[5] = (i) => c.$emit("update", { ttl: Number(i.target.value) }))
            }, [
              (s(!0), n(K, null, G(d(Nt), (i) => (s(), n("option", {
                key: i,
                value: i
              }, b(o[i] ?? i + "s"), 9, _s))), 128))
            ], 40, ks)
          ]),
          e("div", ws, [
            p[13] || (p[13] = e("label", { class: "kb-label" }, [
              X(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.priority,
              onChange: p[6] || (p[6] = (i) => c.$emit("update", { priority: i.target.value }))
            }, [
              (s(!0), n(K, null, G(d(_t), (i) => (s(), n("option", {
                key: i,
                value: i
              }, b(i), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Ss, [
            e("label", Cs, [
              e("input", {
                type: "checkbox",
                checked: a.delivery.quiet_hours,
                onChange: p[7] || (p[7] = (i) => c.$emit("update", { quiet_hours: !a.delivery.quiet_hours }))
              }, null, 40, Is),
              p[14] || (p[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : _("", !0)
      ]);
    };
  }
}), As = /* @__PURE__ */ xe(Bs, [["__scopeId", "data-v-a208b72f"]]), Ls = { class: "kb-accordion" }, Us = { class: "kb-accordion__body" }, Rs = { class: "kb-field" }, Ts = ["value"], Ps = { class: "kb-field" }, Vs = { class: "kb-checkbox" }, Es = ["checked"], Ms = /* @__PURE__ */ _e({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(a) {
    return (o, c) => (s(), n("details", Ls, [
      c[4] || (c[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Us, [
        e("div", Rs, [
          c[2] || (c[2] = e("label", { class: "kb-label" }, [
            X(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: a.delivery.collapse_key,
            onInput: c[0] || (c[0] = (p) => o.$emit("update", { collapse_key: p.target.value || void 0 }))
          }, null, 40, Ts)
        ]),
        e("div", Ps, [
          e("label", Vs, [
            e("input", {
              type: "checkbox",
              checked: a.delivery.silent_push,
              onChange: c[1] || (c[1] = (p) => o.$emit("update", { silent_push: !a.delivery.silent_push }))
            }, null, 40, Es),
            c[3] || (c[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ns = /* @__PURE__ */ xe(Ms, [["__scopeId", "data-v-e0f5c559"]]);
function Pe(a, o) {
  return !a || typeof a != "string" ? a : a.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (c, p) => {
    const u = p.trim();
    return u in o ? String(o[u]) : `{{ ${p} }}`;
  });
}
const Ee = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Os = { class: "kb-preview" }, Ds = {
  key: 0,
  class: "kb-preview__toggle"
}, Ws = { class: "kb-checkbox" }, Hs = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, zs = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, Fs = ["src"], qs = { class: "kb-android-body-row" }, js = { class: "kb-android-body-content" }, Ks = {
  key: 0,
  class: "kb-android-title"
}, Ys = {
  key: 1,
  class: "kb-android-text"
}, Js = {
  key: 2,
  class: "kb-android-location-line"
}, Gs = {
  key: 0,
  class: "kb-android-thumb"
}, Xs = ["src"], Qs = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Zs = ["src"], en = {
  key: 0,
  class: "kb-preview-map__caption"
}, tn = {
  key: 2,
  class: "kb-android-actions"
}, an = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, sn = { class: "kb-ios-banner" }, nn = { class: "kb-ios-content" }, ln = {
  key: 0,
  class: "kb-ios-title"
}, on = {
  key: 1,
  class: "kb-ios-text"
}, rn = {
  key: 2,
  class: "kb-preview-map kb-preview-map--ios"
}, dn = ["src"], un = {
  key: 0,
  class: "kb-preview-map__caption"
}, cn = {
  key: 3,
  class: "kb-ios-actions"
}, pn = {
  key: 0,
  class: "kb-ios-thumb"
}, mn = ["src"], vn = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, bn = { class: "kb-web-toast" }, gn = { class: "kb-web-body" }, fn = {
  key: 0,
  class: "kb-web-title"
}, yn = {
  key: 1,
  class: "kb-web-text"
}, hn = {
  key: 2,
  class: "kb-web-image"
}, kn = ["src"], _n = {
  key: 3,
  class: "kb-preview-map kb-preview-map--web"
}, wn = ["src"], $n = {
  key: 0,
  class: "kb-preview-map__caption"
}, xn = {
  key: 0,
  class: "kb-web-actions"
}, Sn = /* @__PURE__ */ _e({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(a) {
    const o = a, c = se(!1), p = w(
      () => o.getPreview(o.selectedPlatform, {
        expanded: o.selectedPlatform === "android" ? c.value : void 0
      })
    ), u = w(() => {
      const I = p.value;
      return o.previewProfile ? {
        ...I,
        title: Pe((I == null ? void 0 : I.title) ?? "", o.previewProfile.data),
        body: Pe((I == null ? void 0 : I.body) ?? "", o.previewProfile.data)
      } : I;
    }), i = w(() => {
      var H;
      const I = (H = u.value) == null ? void 0 : H.location;
      if (!I || I.lat == null && I.lon == null) return null;
      const k = Number(I.lat) || 0, T = Number(I.lon) || 0, P = 8e-3, q = [T - P, k - P, T + P, k + P].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(q)}&layer=mapnik&marker=${k},${T}`;
    }), x = w(() => {
      var k;
      const I = (k = u.value) == null ? void 0 : k.location;
      return I && (I.lat != null || I.lon != null || I.name || I.address);
    });
    return (I, k) => {
      var T, P, q, H, ee, J, ge, S, $, L, ne, j, he, fe, ve, pe;
      return s(), n("div", Os, [
        a.selectedPlatform === "android" ? (s(), n("div", Ds, [
          e("label", Ws, [
            Re(e("input", {
              "onUpdate:modelValue": k[0] || (k[0] = (le) => c.value = le),
              type: "checkbox"
            }, null, 512), [
              [Pt, c.value]
            ]),
            k[1] || (k[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : _("", !0),
        a.selectedPlatform === "android" ? (s(), n("div", Hs, [
          k[4] || (k[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: $e(["kb-android-notification", { "kb-android-notification--expanded": c.value }])
          }, [
            k[3] || (k[3] = Ne('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: $e(["kb-android-body", { "kb-android-body--expanded": c.value }])
            }, [
              c.value && u.value.imageUrl ? (s(), n("div", zs, [
                e("img", {
                  src: u.value.imageUrl,
                  alt: ""
                }, null, 8, Fs)
              ])) : _("", !0),
              e("div", qs, [
                e("div", js, [
                  u.value.title ? (s(), n("div", Ks, b(u.value.title), 1)) : _("", !0),
                  u.value.body ? (s(), n("div", Ys, b(u.value.body), 1)) : _("", !0),
                  x.value && !c.value && ((T = u.value.location) != null && T.name || (P = u.value.location) != null && P.address) ? (s(), n("div", Js, [
                    k[2] || (k[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    X(" " + b(((q = u.value.location) == null ? void 0 : q.name) || ((H = u.value.location) == null ? void 0 : H.address)), 1)
                  ])) : _("", !0)
                ]),
                !c.value && u.value.imageUrl ? (s(), n("div", Gs, [
                  e("img", {
                    src: u.value.imageUrl,
                    alt: ""
                  }, null, 8, Xs)
                ])) : _("", !0)
              ]),
              x.value && i.value && c.value ? (s(), n("div", Qs, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Zs),
                (ee = u.value.location) != null && ee.name || (J = u.value.location) != null && J.address ? (s(), n("div", en, b(((ge = u.value.location) == null ? void 0 : ge.name) || ((S = u.value.location) == null ? void 0 : S.address)), 1)) : _("", !0)
              ])) : _("", !0),
              u.value.actions && u.value.actions.length ? (s(), n("div", tn, [
                (s(!0), n(K, null, G(u.value.actions, (le) => (s(), n("button", {
                  key: le.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, b(le.label || "Action"), 1))), 128))
              ])) : _("", !0)
            ], 2)
          ], 2)
        ])) : a.selectedPlatform === "ios" ? (s(), n("div", an, [
          k[7] || (k[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", sn, [
            k[6] || (k[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", nn, [
              k[5] || (k[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              u.value.title ? (s(), n("div", ln, b(u.value.title), 1)) : _("", !0),
              u.value.body ? (s(), n("div", on, b(u.value.body), 1)) : _("", !0),
              x.value && i.value ? (s(), n("div", rn, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, dn),
                ($ = u.value.location) != null && $.name || (L = u.value.location) != null && L.address ? (s(), n("div", un, b(((ne = u.value.location) == null ? void 0 : ne.name) || ((j = u.value.location) == null ? void 0 : j.address)), 1)) : _("", !0)
              ])) : _("", !0),
              u.value.actions && u.value.actions.length ? (s(), n("div", cn, [
                (s(!0), n(K, null, G(u.value.actions, (le) => (s(), n("button", {
                  key: le.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, b(le.label || "Action"), 1))), 128))
              ])) : _("", !0)
            ]),
            u.value.imageUrl ? (s(), n("div", pn, [
              e("img", {
                src: u.value.imageUrl,
                alt: ""
              }, null, 8, mn)
            ])) : _("", !0)
          ])
        ])) : (s(), n("div", vn, [
          k[9] || (k[9] = Ne('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", bn, [
            k[8] || (k[8] = Ne('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", gn, [
              u.value.title ? (s(), n("div", fn, b(u.value.title), 1)) : _("", !0),
              u.value.body ? (s(), n("div", yn, b(u.value.body), 1)) : _("", !0),
              u.value.imageUrl ? (s(), n("div", hn, [
                e("img", {
                  src: u.value.imageUrl,
                  alt: ""
                }, null, 8, kn)
              ])) : _("", !0),
              x.value && i.value ? (s(), n("div", _n, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, wn),
                (he = u.value.location) != null && he.name || (fe = u.value.location) != null && fe.address ? (s(), n("div", $n, b(((ve = u.value.location) == null ? void 0 : ve.name) || ((pe = u.value.location) == null ? void 0 : pe.address)), 1)) : _("", !0)
              ])) : _("", !0)
            ]),
            u.value.actions && u.value.actions.length ? (s(), n("div", xn, [
              (s(!0), n(K, null, G(u.value.actions, (le, ye) => (s(), n("button", {
                key: le.id || ye,
                type: "button",
                class: $e(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(ye) > 0 }])
              }, b(le.label || "Action"), 3))), 128))
            ])) : _("", !0)
          ])
        ]))
      ]);
    };
  }
}), Cn = /* @__PURE__ */ xe(Sn, [["__scopeId", "data-v-1d6293a0"]]), In = { class: "kb-version-dialog" }, Bn = {
  key: 0,
  class: "kb-version-empty"
}, An = {
  key: 1,
  class: "kb-version-list"
}, Ln = { class: "kb-version-item-label" }, Un = ["onClick"], Rn = { class: "kb-version-actions" }, Tn = /* @__PURE__ */ _e({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(a, { emit: o }) {
    const c = o;
    function p(u) {
      try {
        return new Date(u).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return u;
      }
    }
    return (u, i) => a.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: i[1] || (i[1] = Vt((x) => c("close"), ["escape"]))
    }, [
      e("div", In, [
        i[2] || (i[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        i[3] || (i[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        a.versions.length === 0 ? (s(), n("div", Bn, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", An, [
          (s(!0), n(K, null, G(a.versions, (x) => (s(), n("li", {
            key: x.id,
            class: "kb-version-item"
          }, [
            e("span", Ln, b(x.label || p(x.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (I) => {
                c("restore", x.snapshot), c("close");
              }
            }, " Restore ", 8, Un)
          ]))), 128))
        ])),
        e("div", Rn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: i[0] || (i[0] = (x) => c("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : _("", !0);
  }
}), At = /* @__PURE__ */ xe(Tn, [["__scopeId", "data-v-ce35a513"]]), dt = [
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
        title: "Order {{ order_id }} update",
        body: "Hi {{ first_name }}, your order has shipped.",
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
], ut = [
  {
    id: "otp",
    label: "OTP",
    campaign: {
      message: {
        title: "",
        body: "Your code is {{ otp_code }}. Valid for 10 minutes.",
        variables: [],
        template_type: "auth",
        template_category: "authentication",
        template_name: "otp_verification",
        auth_type: "otp",
        auth_label: "Your verification code is {{ otp_code }}"
      }
    }
  },
  {
    id: "order-status",
    label: "Order status",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ first_name }}, your order {{ order_id }} is on its way.",
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
        body: "Hi {{ first_name }}, we have a special offer for you.",
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
        body: "Hi {{ first_name }}, we have responded to your request.",
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
        body: "Hi {{ first_name }}, tap to see the latest arrivals.",
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
        body: "Hi {{ first_name }}, watch this short video to see what is new.",
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
        body: "Hi {{ first_name }}, here is your receipt for order {{ order_id }}.",
        variables: ["first_name", "order_id"],
        template_type: "document",
        template_category: "utility",
        header_type: "document",
        template_name: "order_receipt",
        document_filename: "receipt-{{ order_id }}.pdf",
        media_url: "https://example.com/receipt.pdf"
      }
    }
  },
  {
    id: "location-store",
    label: "Store location",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ first_name }}, here is the location of our nearest store.",
        variables: ["first_name"],
        template_type: "location",
        template_category: "utility",
        template_name: "store_location",
        location: {
          lat: 6.5244,
          lon: 3.3792,
          name: "Lagos Flagship Store",
          address: "12 Marina Rd, Lagos"
        }
      }
    }
  },
  {
    id: "coupon-offer",
    label: "Coupon offer",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ first_name }}, use this code at checkout for a discount.",
        variables: ["first_name"],
        template_type: "coupon",
        template_category: "marketing",
        template_name: "coupon_offer",
        coupon_code: "SAVE20"
      }
    }
  },
  {
    id: "limited-time-offer",
    label: "Limited time offer",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ first_name }}, this offer expires soon. Don’t miss out.",
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
        body: "Hi {{ first_name }}, pick one of these products below.",
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
        auth_label: "Your code is {{1}}"
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
], ct = [
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
        body: "Your code: {{ otp_code }}",
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
        body: "Hi {{ first_name }}, your order {{ order_id }} has shipped.",
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
        body: "Flash sale today! Use SAVE20 at checkout. {{ link }}",
        variables: ["link"],
        sender_id: "YourBrand"
      }
    }
  }
], pt = [
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
          { id: "p1", type: "paragraph", content: "Hi {{ first_name }}, here is what's new." }
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
          { id: "p1", type: "paragraph", content: "Hi {{ first_name }}, here are this week's highlights." },
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
        subject: "Special offer for you, {{ first_name }}",
        preview_text: "Limited time only",
        from_name: "Your Brand",
        from_address: "offers@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Exclusive offer" },
          { id: "p1", type: "paragraph", content: "Hi {{ first_name }}, enjoy 20% off your next order." },
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
        subject: "Receipt for order {{ order_id }}",
        preview_text: "Thank you for your order",
        from_name: "Your Brand",
        from_address: "orders@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Thank you for your order" },
          { id: "p1", type: "paragraph", content: "Hi {{ first_name }}, we received your order {{ order_id }}." }
        ]
      }
    }
  }
], Pn = { class: "keos-notification-builder" }, Vn = { class: "kb-builder-top" }, En = { style: { margin: 0, paddingLeft: "1.25rem" } }, Mn = { class: "kb-push-layout" }, Nn = { class: "kb-push-sidebar" }, On = {
  key: 0,
  class: "kb-push-form"
}, Dn = {
  key: 0,
  class: "kb-hint-card"
}, Wn = { class: "kb-push-form-head" }, Hn = { class: "kb-push-form-head-top" }, zn = { class: "kb-push-health-pill" }, Fn = { class: "kb-push-form-head-row" }, qn = ["value"], jn = { class: "kb-push-health" }, Kn = { class: "kb-push-health-row" }, Yn = { class: "kb-push-health-value" }, Jn = { class: "kb-push-health-bar" }, Gn = {
  key: 1,
  class: "kb-push-form"
}, Xn = { class: "kb-push-canvas" }, Qn = {
  key: 0,
  class: "kb-push-test-banner"
}, Zn = { class: "kb-push-preview-chrome" }, el = { class: "kb-push-preview-controls" }, tl = { class: "kb-push-preview-as" }, al = ["value"], sl = { class: "kb-preview-status" }, nl = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, ll = ["aria-selected", "aria-controls", "onClick"], ol = { class: "kb-push-preview-frame" }, il = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, rl = { class: "kb-push-actions" }, dl = {
  key: 0,
  class: "kb-actions-note"
}, ul = { class: "kb-push-actions-right" }, cl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, pl = { class: "kb-confirm-dialog" }, ml = { class: "kb-confirm-actions" }, vl = /* @__PURE__ */ _e({
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
    const c = a, p = o, u = se("android"), i = se(""), x = se(!1), I = se(null), k = se(!1), T = w(
      () => J.value.workflow_status ?? "draft"
    ), P = w(() => {
      const B = i.value;
      return B ? Ee.find((m) => m.id === B) ?? null : null;
    });
    function q(B) {
      const m = J.value, h = B.campaign.message ? { ...m.message, ...B.campaign.message } : m.message, N = B.campaign.delivery ? { ...m.delivery, ...B.campaign.delivery } : m.delivery;
      L({
        ...B.campaign,
        message: h,
        delivery: N
      }), I.value = null, x.value = !1;
    }
    function H(B) {
      const m = B.target.value;
      if (!m) return;
      const h = dt.find((N) => N.id === m);
      h && (ge.value ? (I.value = h, x.value = !0) : q(h), B.target.value = "");
    }
    function ee(B) {
      J.value = B, k.value = !1;
    }
    const {
      campaign: J,
      dirty: ge,
      customValidatorErrors: S,
      getValidationWithWarnings: $,
      update: L,
      updateMessage: ne,
      updateDelivery: j,
      undo: he,
      redo: fe,
      canUndo: ve,
      canRedo: pe,
      resetMessage: le,
      resetDelivery: ye,
      getPreview: z,
      characterLimits: be,
      hooks: oe
    } = Fe({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (B) => {
          var N, v, l, t;
          const m = [];
          (N = B.name) != null && N.trim() || m.push("Template name is required"), (l = (v = B.message) == null ? void 0 : v.body) != null && l.trim() || m.push("Message body is required");
          const h = (t = c.hooks) != null && t.customValidators ? await c.hooks.customValidators(B) : [];
          return [...m, ...h];
        }
      },
      onDirty: () => p("change", J.value)
    }), { lastSavedAt: C } = qe(J, { channel: "push" });
    function ke(B) {
      (B.metaKey || B.ctrlKey) && B.key === "z" && (B.preventDefault(), B.shiftKey ? fe() : he());
    }
    De(() => {
      window.addEventListener("keydown", ke);
    }), We(() => {
      window.removeEventListener("keydown", ke);
    }), Be(J, (B) => p("update:modelValue", B), { deep: !0 });
    const U = se(), g = se(!0), de = se(!0);
    async function me() {
      if (oe.estimateReach)
        try {
          U.value = await oe.estimateReach(J.value.audience);
        } catch {
          U.value = void 0;
        }
      oe.canSend && (g.value = await Promise.resolve(oe.canSend())), oe.canSchedule && (de.value = await Promise.resolve(oe.canSchedule()));
    }
    me(), Be(() => J.value.audience, me, { deep: !0 });
    const Ae = w(() => (S.value, $(U.value))), we = w(() => Ae.value.blockingErrors), R = w(() => Ae.value.warnings), ae = w(() => Ae.value.valid), f = w(() => {
      var N, v, l;
      const B = J.value.message, m = [
        !!((N = J.value.name) != null && N.trim()),
        !!((v = B.title) != null && v.trim()),
        !!((l = B.body) != null && l.trim()),
        !!(B.template_type ?? J.value.template_type),
        Array.isArray(B.actions) ? B.actions.length > 0 : !1
      ], h = m.filter(Boolean).length;
      return Math.round(h / m.length * 100);
    }), A = w(() => f.value >= 90 ? "Production ready" : f.value >= 70 ? "Strong draft" : f.value >= 40 ? "In progress" : "Needs setup"), D = w(
      () => be[u.value].title
    ), ue = w(() => be[u.value].body), ce = w(() => J.value.message.title.length), F = w(() => J.value.message.body.length), W = w(() => {
      if (ce.value > D.value)
        return `Title exceeds ${D.value} characters for ${u.value}.`;
    }), Q = w(() => {
      const B = we.value.find(
        (m) => m.message === "Message body is required"
      );
      if (B) return B.message;
      if (F.value > ue.value)
        return `Body exceeds ${ue} characters for ${u.value}.`;
    }), Se = w(
      () => J.value.template_type ?? "transactional"
    );
    function M(B) {
      L({ template_type: B });
    }
    function y(B) {
      L({
        name: B,
        tracking: { ...J.value.tracking ?? {}, campaign_name: B }
      });
    }
    function te(B) {
      const m = ` {{ ${B.variable} }}`, h = J.value.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...h, B.variable]));
      B.field === "title" ? ne({
        title: J.value.message.title + m,
        variables: N
      }) : ne({
        body: J.value.message.body + m,
        variables: N
      });
    }
    function Y() {
      ae.value && p("save", J.value);
    }
    return (B, m) => (s(), n("div", Pn, [
      e("div", Vn, [
        Ce(je, {
          "campaign-name": d(J).name,
          status: d(J).status,
          dirty: d(ge),
          "last-saved-at": d(C),
          "can-undo": d(ve),
          "can-redo": d(pe),
          "workflow-status": T.value,
          "slugify-name": c.enforceSlugName,
          "onUpdate:campaignName": y,
          "onUpdate:workflowStatus": m[0] || (m[0] = (h) => d(L)({ workflow_status: h })),
          onUndo: d(he),
          onRedo: d(fe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        we.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: d(ie).dangerBg,
            border: `1px solid ${d(ie).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[12]}px ${d(Z)[16]}px`,
            marginBottom: `${d(Z)[16]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: d(ie).danger })
          }, [
            (s(!0), n(K, null, G(we.value, (h) => (s(), n("li", {
              key: h.message
            }, b(h.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        R.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: d(ie).neutral.bg,
            border: `1px solid ${d(ie).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[12]}px ${d(Z)[16]}px`,
            marginBottom: `${d(Z)[16]}px`,
            fontSize: "0.875rem",
            color: d(ie).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${d(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", En, [
            (s(!0), n(K, null, G(R.value, (h) => (s(), n("li", {
              key: h.message
            }, b(h.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Mn, [
        e("aside", Nn, [
          a.disabledSections.includes("message") ? _("", !0) : (s(), n("div", On, [
            !d(J).message.title && !d(J).message.body ? (s(), n("div", Dn, " Add a title and message below to get started. ")) : _("", !0),
            e("div", Wn, [
              e("div", Hn, [
                m[12] || (m[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                e("span", zn, b(A.value), 1)
              ]),
              e("div", Fn, [
                Ce(lt, {
                  "template-type": Se.value,
                  onUpdate: M
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: H
                }, [
                  m[13] || (m[13] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, G(d(dt), (h) => (s(), n("option", {
                    key: h.id,
                    value: h.id
                  }, b(h.label), 9, qn))), 128))
                ], 32)
              ]),
              e("div", jn, [
                e("div", Kn, [
                  m[14] || (m[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                  e("span", Yn, b(f.value) + "%", 1)
                ]),
                e("div", Jn, [
                  e("span", {
                    class: "kb-push-health-fill",
                    style: re({ width: `${f.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ce(za, {
              message: d(J).message,
              "title-count": ce.value,
              "body-count": F.value,
              "title-limit": D.value,
              "body-limit": ue.value,
              "selected-platform": u.value,
              "show-reset": !0,
              "title-error": W.value,
              "body-error": Q.value,
              onUpdate: d(ne),
              onReset: m[1] || (m[1] = (h) => d(le)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            Ce(Bt, {
              message: d(J).message,
              "variable-options": a.variableOptions,
              onUpdate: d(ne),
              onInsertVariable: te
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !a.designOnly && !a.disabledSections.includes("delivery") ? (s(), n("div", Gn, [
            m[15] || (m[15] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            Ce(As, {
              delivery: d(J).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: d(j),
              onReset: m[2] || (m[2] = (h) => d(ye)())
            }, null, 8, ["delivery", "onUpdate"]),
            Ce(Ns, {
              delivery: d(J).delivery,
              onUpdate: d(j)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : _("", !0)
        ]),
        e("main", Xn, [
          !a.designOnly && d(J).audience.test_mode ? (s(), n("div", Qn, [...m[16] || (m[16] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Zn, [
            e("div", el, [
              e("label", tl, [
                m[18] || (m[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": m[3] || (m[3] = (h) => i.value = h),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  m[17] || (m[17] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, G(d(Ee), (h) => (s(), n("option", {
                    key: h.id,
                    value: h.id
                  }, b(h.label), 9, al))), 128))
                ], 512), [
                  [Oe, i.value]
                ])
              ]),
              e("div", sl, [
                m[19] || (m[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, b(u.value), 1)
              ])
            ]),
            e("div", nl, [
              (s(), n(K, null, G(["android", "ios", "web"], (h) => e("button", {
                key: h,
                type: "button",
                class: $e(["kb-push-device-btn", { "kb-push-device-btn--active": u.value === h }]),
                role: "tab",
                "aria-selected": u.value === h,
                "aria-controls": `kb-preview-panel-${h}`,
                onClick: (N) => u.value = h
              }, b(h.toUpperCase()), 11, ll)), 64))
            ]),
            e("div", ol, [
              !d(J).message.title && !d(J).message.body ? (s(), n("div", il, [...m[20] || (m[20] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (s(), Et(Cn, {
                key: 1,
                "get-preview": d(z),
                "selected-platform": u.value,
                "preview-profile": P.value,
                "onUpdate:selectedPlatform": m[4] || (m[4] = (h) => u.value = h)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", rl, [
        c.actionsNote ? (s(), n("div", dl, b(c.actionsNote), 1)) : _("", !0),
        e("div", ul, [
          !a.designOnly && a.showHistory ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[5] || (m[5] = (h) => k.value = !0)
          }, " Version history ")) : _("", !0),
          !a.designOnly && a.showSaveVersion ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[6] || (m[6] = (h) => p("save-version", JSON.parse(JSON.stringify(d(J)))))
          }, " Save as version ")) : _("", !0),
          a.showDuplicate ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[7] || (m[7] = (h) => p("duplicate", JSON.parse(JSON.stringify(d(J)))))
          }, " Duplicate ")) : _("", !0),
          a.showSave ? (s(), n("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: Y
          }, " Save ")) : _("", !0),
          a.showClose ? (s(), n("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: m[8] || (m[8] = (h) => p("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      x.value ? (s(), n("div", cl, [
        e("div", pl, [
          m[21] || (m[21] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          m[22] || (m[22] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", ml, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: m[9] || (m[9] = (h) => {
                x.value = !1, I.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: m[10] || (m[10] = (h) => I.value && q(I.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0),
      Ce(At, {
        open: k.value,
        versions: a.versions,
        onClose: m[11] || (m[11] = (h) => k.value = !1),
        onRestore: ee
      }, null, 8, ["open", "versions"])
    ]));
  }
}), Lt = /* @__PURE__ */ xe(vl, [["__scopeId", "data-v-f816eda9"]]), bl = { class: "kb-section" }, gl = { class: "kb-section__head" }, fl = { class: "kb-summary-bar" }, yl = { class: "kb-pill kb-pill--category" }, hl = { class: "kb-pill kb-pill--format" }, kl = { class: "kb-pill kb-pill--status" }, _l = { class: "kb-field" }, wl = ["value"], $l = { class: "kb-field" }, xl = { class: "kb-label" }, Sl = { class: "kb-helper" }, Cl = ["value"], Il = ["value"], Bl = { class: "kb-field" }, Al = ["value"], Ll = { class: "kb-field kb-field--inline" }, Ul = { class: "kb-field-half" }, Rl = ["value"], Tl = { class: "kb-field" }, Pl = ["value"], Vl = {
  key: 0,
  class: "kb-field"
}, El = { class: "kb-label" }, Ml = ["value"], Nl = {
  key: 1,
  class: "kb-field"
}, Ol = ["value"], Dl = {
  key: 2,
  class: "kb-field"
}, Wl = ["value"], Hl = {
  key: 3,
  class: "kb-field"
}, zl = ["value"], Fl = {
  key: 4,
  class: "kb-field kb-field--inline"
}, ql = { class: "kb-location-row" }, jl = ["value"], Kl = ["value"], Yl = ["value"], Jl = ["value"], Gl = {
  key: 5,
  class: "kb-field"
}, Xl = ["value"], Ql = {
  key: 6,
  class: "kb-field"
}, Zl = ["value"], eo = {
  key: 7,
  class: "kb-field"
}, to = ["value"], ao = ["value"], so = {
  key: 8,
  class: "kb-field"
}, no = { class: "kb-wa-buttons" }, lo = ["value", "onInput"], oo = ["value", "onInput"], io = ["value", "onInput"], ro = ["value", "onInput"], uo = ["onClick"], co = ["disabled"], po = {
  key: 9,
  class: "kb-field"
}, mo = { class: "kb-wa-buttons" }, vo = ["value", "onInput"], bo = ["value", "onInput"], go = ["onClick"], fo = {
  key: 10,
  class: "kb-field"
}, yo = ["value"], ho = ["value"], ko = { class: "kb-field" }, _o = { class: "kb-label" }, wo = ["value"], $o = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, xo = { class: "kb-wa-fields-list" }, So = { class: "kb-wa-field-name" }, Co = { class: "kb-wa-field-status" }, Io = { class: "kb-field" }, Bo = ["value"], Ao = { class: "kb-field" }, Lo = { class: "kb-wa-buttons" }, Uo = ["value", "onInput"], Ro = ["value", "onChange"], To = ["value", "onInput"], Po = ["value", "onInput"], Vo = {
  key: 2,
  class: "kb-opt-out-note"
}, Eo = ["onClick"], Mo = ["disabled"], Ge = 60, Xe = 1024, Qe = 60, Ze = 10, mt = 10, No = /* @__PURE__ */ _e({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    const c = a, p = o, u = [
      { value: "text", label: "Text", hint: "Standard text template." },
      { value: "image", label: "Rich media (image header)", hint: "Body with image in header." },
      { value: "video", label: "Rich media (video header)", hint: "Body with video in header." },
      { value: "document", label: "Rich media (document header)", hint: "Body with PDF/document in header." },
      { value: "carousel", label: "Carousel", hint: "Up to 10 cards with media + buttons." },
      { value: "flow", label: "WhatsApp Flow", hint: "Launch a multi-step in-chat flow." },
      { value: "lto", label: "Limited-time offer", hint: "Adds expiry urgency to the offer." },
      { value: "catalog", label: "Catalog", hint: "Open WhatsApp catalog or product list." },
      { value: "mpm", label: "Multi-product", hint: "Show multiple products in one template." },
      { value: "auth", label: "Authentication", hint: "OTP/login verification template." },
      { value: "location", label: "Location", hint: "Share a pinned location." },
      { value: "coupon", label: "Coupon", hint: "Send a coupon code." }
    ], i = w(() => c.message), x = w(() => i.value.template_type ?? "text"), I = w(() => i.value.header_type ?? "none"), k = w(() => String(i.value.header ?? "")), T = w(() => String(i.value.body ?? "")), P = w(() => String(i.value.footer ?? "")), q = w(() => i.value.buttons ?? []), H = w(() => i.value.products ?? []), ee = w(() => i.value.cards ?? []), J = w(() => {
      const U = u.find((g) => g.value === x.value);
      return (U == null ? void 0 : U.hint) ?? "Choose the approved WhatsApp template format.";
    }), ge = w(() => {
      const U = String(i.value.template_category ?? "").trim();
      return U ? U.charAt(0).toUpperCase() + U.slice(1) : "Uncategorized";
    }), S = w(() => {
      const U = u.find((g) => g.value === x.value);
      return (U == null ? void 0 : U.label) ?? "Text";
    }), $ = w(() => i.value.template_name ? T.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function L(U) {
      if (!U || typeof U != "string") return [];
      const g = /\{\{\s*([^}]+?)\s*\}\}/g, de = /* @__PURE__ */ new Set();
      let me;
      for (; (me = g.exec(U)) !== null; ) de.add(me[1].trim());
      return Array.from(de);
    }
    const ne = w(() => {
      const U = c.message.header ?? "", g = c.message.body ?? c.message.body ?? "", de = new Set(c.message.variables ?? []), me = [...L(U), ...L(g)];
      return Array.from(new Set(me)).map((we) => ({ name: we, configured: de.has(we) }));
    });
    function j(U) {
      p("update", U);
    }
    function he(U) {
      const g = {
        template_category: U || void 0
      };
      U === "authentication" && x.value !== "auth" && (g.template_type = "auth"), j(g);
    }
    function fe(U) {
      const g = { template_type: U };
      U === "auth" && (g.template_category = "authentication"), (U === "image" || U === "video" || U === "document") && (g.header_type = U), j(g);
    }
    function ve(U, g) {
      var me;
      const de = [...q.value];
      de[U] = {
        ...de[U],
        id: ((me = de[U]) == null ? void 0 : me.id) || `btn_${U + 1}`,
        ...g
      }, j({ buttons: de });
    }
    function pe(U) {
      const g = [...q.value];
      g.splice(U, 1), j({ buttons: g });
    }
    function le() {
      const U = [...q.value];
      U.push({ id: `btn_${U.length + 1}`, label: "", type: "quick_reply" }), j({ buttons: U });
    }
    function ye(U, g) {
      var me;
      const de = [...H.value];
      de[U] = {
        ...de[U],
        id: ((me = de[U]) == null ? void 0 : me.id) || `prod_${U + 1}`,
        ...g
      }, j({ products: de });
    }
    function z(U) {
      const g = [...H.value];
      g.splice(U, 1), j({ products: g });
    }
    function be() {
      const U = [...H.value];
      U.push({ id: `prod_${U.length + 1}`, productId: "" }), j({ products: U });
    }
    function oe(U, g) {
      var me;
      const de = [...ee.value];
      de[U] = {
        ...de[U],
        id: ((me = de[U]) == null ? void 0 : me.id) || `card_${U + 1}`,
        ...g
      }, j({ cards: de });
    }
    function C(U) {
      const g = [...ee.value];
      g.splice(U, 1), j({ cards: g });
    }
    function ke() {
      const U = [...ee.value];
      U.push({
        id: `card_${U.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), j({ cards: U });
    }
    return (U, g) => {
      var de, me, Ae, we;
      return s(), n("section", bl, [
        e("div", gl, [
          g[22] || (g[22] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: g[0] || (g[0] = (R) => U.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        g[50] || (g[50] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
        e("div", fl, [
          e("span", yl, b(ge.value), 1),
          e("span", hl, b(S.value), 1),
          e("span", kl, b($.value), 1)
        ]),
        e("div", _l, [
          g[24] || (g[24] = e("label", { class: "kb-label" }, [
            X(" Category (purpose) "),
            e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.value.template_category ?? "",
            onChange: g[1] || (g[1] = (R) => he(R.target.value))
          }, [...g[23] || (g[23] = [
            e("option", { value: "" }, "Select category", -1),
            e("option", { value: "marketing" }, "Marketing", -1),
            e("option", { value: "utility" }, "Utility", -1),
            e("option", { value: "authentication" }, "Authentication", -1)
          ])], 40, wl)
        ]),
        e("div", $l, [
          e("label", xl, [
            g[25] || (g[25] = X(" Functional format ", -1)),
            e("span", Sl, b(J.value), 1)
          ]),
          e("select", {
            class: "kb-select",
            value: x.value,
            onChange: g[2] || (g[2] = (R) => fe(R.target.value))
          }, [
            (s(), n(K, null, G(u, (R) => e("option", {
              key: R.value,
              value: R.value
            }, b(R.label), 9, Il)), 64))
          ], 40, Cl)
        ]),
        e("div", Bl, [
          g[26] || (g[26] = e("label", { class: "kb-label" }, [
            X(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: i.value.template_name ?? "",
            onInput: g[3] || (g[3] = (R) => j({
              template_name: R.target.value || void 0
            }))
          }, null, 40, Al)
        ]),
        e("div", Ll, [
          e("div", Ul, [
            g[27] || (g[27] = e("label", { class: "kb-label" }, [
              X(" Template language "),
              e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. en_US",
              value: i.value.template_language ?? "",
              onInput: g[4] || (g[4] = (R) => j({
                template_language: R.target.value || void 0
              }))
            }, null, 40, Rl)
          ]),
          e("div", { class: "kb-field-half" }, [
            e("div", { class: "kb-meta-card" }, [
              g[28] || (g[28] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
              e("ul", { class: "kb-meta-list" }, [
                e("li", null, "Header text: " + b(Ge) + " chars"),
                e("li", null, "Body: " + b(Xe) + " chars"),
                e("li", null, "Footer: " + b(Qe) + " chars"),
                e("li", null, "Buttons: up to " + b(Ze))
              ])
            ])
          ])
        ]),
        e("div", Tl, [
          g[30] || (g[30] = e("label", { class: "kb-label" }, [
            X(" Header component (optional) "),
            e("span", { class: "kb-helper" }, "Header can be text or rich media.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: I.value,
            onChange: g[5] || (g[5] = (R) => j({ header_type: R.target.value }))
          }, [...g[29] || (g[29] = [
            Ne('<option value="none" data-v-3e4d670b>No header</option><option value="text" data-v-3e4d670b>Text header</option><option value="image" data-v-3e4d670b>Image header</option><option value="video" data-v-3e4d670b>Video header</option><option value="document" data-v-3e4d670b>Document header</option>', 5)
          ])], 40, Pl)
        ]),
        I.value === "text" ? (s(), n("div", Vl, [
          e("label", El, [
            g[31] || (g[31] = X(" Header text ", -1)),
            e("span", {
              class: $e(["kb-counter", { "kb-counter--warn": k.value.length > Ge }])
            }, b(k.value.length) + "/" + b(Ge), 3)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: k.value,
            onInput: g[6] || (g[6] = (R) => j({
              header: R.target.value || void 0
            }))
          }, null, 40, Ml)
        ])) : _("", !0),
        ["image", "video", "document"].includes(I.value) || ["image", "video", "document"].includes(x.value) ? (s(), n("div", Nl, [
          g[32] || (g[32] = e("label", { class: "kb-label" }, [
            X(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.value.media_url ?? "",
            onInput: g[7] || (g[7] = (R) => j({
              media_url: R.target.value || void 0
            }))
          }, null, 40, Ol)
        ])) : _("", !0),
        I.value === "document" || x.value === "document" ? (s(), n("div", Dl, [
          g[33] || (g[33] = e("label", { class: "kb-label" }, [
            X(" Document filename "),
            e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. invoice.pdf",
            value: i.value.document_filename ?? "",
            onInput: g[8] || (g[8] = (R) => j({
              document_filename: R.target.value || void 0
            }))
          }, null, 40, Wl)
        ])) : _("", !0),
        ["image", "video", "document"].includes(I.value) || ["image", "video", "document"].includes(x.value) ? (s(), n("div", Hl, [
          g[34] || (g[34] = e("label", { class: "kb-label" }, [
            X(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: i.value.media_caption ?? "",
            onInput: g[9] || (g[9] = (R) => j({
              media_caption: R.target.value || void 0
            }))
          }, null, 40, zl)
        ])) : _("", !0),
        x.value === "location" ? (s(), n("div", Fl, [
          g[35] || (g[35] = e("label", { class: "kb-label" }, [
            X(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", ql, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((de = i.value.location) == null ? void 0 : de.lat) ?? "",
              onInput: g[10] || (g[10] = (R) => {
                const ae = { ...i.value.location ?? {} };
                ae.lat = Number(R.target.value), j({ location: ae });
              })
            }, null, 40, jl),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((me = i.value.location) == null ? void 0 : me.lon) ?? "",
              onInput: g[11] || (g[11] = (R) => {
                const ae = { ...i.value.location ?? {} };
                ae.lon = Number(R.target.value), j({ location: ae });
              })
            }, null, 40, Kl)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((Ae = i.value.location) == null ? void 0 : Ae.name) ?? "",
            onInput: g[12] || (g[12] = (R) => {
              const ae = { ...i.value.location ?? {} };
              ae.name = R.target.value || void 0, j({ location: ae });
            })
          }, null, 40, Yl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((we = i.value.location) == null ? void 0 : we.address) ?? "",
            onInput: g[13] || (g[13] = (R) => {
              const ae = { ...i.value.location ?? {} };
              ae.address = R.target.value || void 0, j({ location: ae });
            })
          }, null, 40, Jl)
        ])) : _("", !0),
        x.value === "coupon" ? (s(), n("div", Gl, [
          g[36] || (g[36] = e("label", { class: "kb-label" }, [
            X(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: i.value.coupon_code ?? "",
            onInput: g[14] || (g[14] = (R) => j({
              coupon_code: R.target.value || void 0
            }))
          }, null, 40, Xl)
        ])) : _("", !0),
        x.value === "lto" ? (s(), n("div", Ql, [
          g[37] || (g[37] = e("label", { class: "kb-label" }, [
            X(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: i.value.lto_expiry ?? "",
            onInput: g[15] || (g[15] = (R) => j({
              lto_expiry: R.target.value || void 0
            }))
          }, null, 40, Zl)
        ])) : _("", !0),
        x.value === "flow" ? (s(), n("div", eo, [
          g[38] || (g[38] = e("label", { class: "kb-label" }, [
            X(" Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: i.value.flow_id ?? "",
            onInput: g[16] || (g[16] = (R) => j({
              flow_id: R.target.value || void 0
            }))
          }, null, 40, to),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: i.value.flow_cta_label ?? "",
            onInput: g[17] || (g[17] = (R) => j({
              flow_cta_label: R.target.value || void 0
            }))
          }, null, 40, ao)
        ])) : _("", !0),
        x.value === "carousel" ? (s(), n("div", so, [
          e("label", { class: "kb-label" }, [
            g[39] || (g[39] = X(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + b(mt) + " cards.")
          ]),
          e("div", no, [
            (s(!0), n(K, null, G(ee.value, (R, ae) => (s(), n("div", {
              key: R.id || ae,
              class: "kb-card-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Card title",
                value: R.title ?? "",
                onInput: (f) => oe(Number(ae), { title: f.target.value })
              }, null, 40, lo),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Card media URL",
                value: R.media_url ?? "",
                onInput: (f) => oe(Number(ae), { media_url: f.target.value })
              }, null, 40, oo),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label",
                value: R.button_label ?? "",
                onInput: (f) => oe(Number(ae), { button_label: f.target.value })
              }, null, 40, io),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Button URL",
                value: R.button_url ?? "",
                onInput: (f) => oe(Number(ae), { button_url: f.target.value })
              }, null, 40, ro),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (f) => C(Number(ae))
              }, "Remove", 8, uo)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: ee.value.length >= mt,
              onClick: ke
            }, " Add card ", 8, co)
          ])
        ])) : _("", !0),
        ["mpm", "catalog"].includes(x.value) ? (s(), n("div", po, [
          g[40] || (g[40] = e("label", { class: "kb-label" }, [
            X(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", mo, [
            (s(!0), n(K, null, G(H.value, (R, ae) => (s(), n("div", {
              key: R.id || ae,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: R.productId,
                onInput: (f) => ye(Number(ae), { productId: f.target.value })
              }, null, 40, vo),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: R.sectionTitle,
                onInput: (f) => ye(Number(ae), { sectionTitle: f.target.value || void 0 })
              }, null, 40, bo),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (f) => z(Number(ae))
              }, " Remove ", 8, go)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: be
            }, " Add product ")
          ])
        ])) : _("", !0),
        x.value === "auth" ? (s(), n("div", fo, [
          g[42] || (g[42] = e("label", { class: "kb-label" }, [
            X(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.value.auth_type ?? "otp",
            onChange: g[18] || (g[18] = (R) => j({
              auth_type: R.target.value
            }))
          }, [...g[41] || (g[41] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, yo),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: i.value.auth_label ?? "",
            onInput: g[19] || (g[19] = (R) => j({
              auth_label: R.target.value || void 0
            }))
          }, null, 40, ho)
        ])) : _("", !0),
        e("div", ko, [
          e("label", _o, [
            g[43] || (g[43] = X(" Body ", -1)),
            g[44] || (g[44] = e("span", { class: "kb-helper" }, " Body is required. Use the exact approved text with variables like " + b(1) + ", " + b(2) + ". ", -1)),
            e("span", {
              class: $e(["kb-counter", { "kb-counter--warn": T.value.length > Xe }])
            }, b(T.value.length) + "/" + b(Xe), 3)
          ]),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: T.value,
            onInput: g[20] || (g[20] = (R) => j({
              body: R.target.value || void 0
            }))
          }, null, 40, wo)
        ]),
        ne.value.length > 0 ? (s(), n("div", $o, [
          g[45] || (g[45] = e("label", { class: "kb-label" }, "Template fields", -1)),
          g[46] || (g[46] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", xo, [
            (s(!0), n(K, null, G(ne.value, (R) => (s(), n("li", {
              key: R.name,
              class: $e(["kb-wa-field-item", { "kb-wa-field-item--ok": R.configured }])
            }, [
              e("span", So, b(R.name), 1),
              e("span", Co, b(R.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : _("", !0),
        e("div", Io, [
          g[47] || (g[47] = e("label", { class: "kb-label" }, [
            X(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: P.value,
            onInput: g[21] || (g[21] = (R) => j({
              footer: R.target.value || void 0
            }))
          }, null, 40, Bo),
          e("div", {
            class: $e(["kb-counter kb-counter--inline", { "kb-counter--warn": P.value.length > Qe }])
          }, b(P.value.length) + "/" + b(Qe), 3)
        ]),
        e("div", Ao, [
          e("label", { class: "kb-label" }, [
            g[48] || (g[48] = X(" Buttons (optional) ", -1)),
            e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + b(Ze) + " buttons. ")
          ]),
          e("div", Lo, [
            (s(!0), n(K, null, G(q.value, (R, ae) => (s(), n("div", {
              key: R.id || ae,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: R.label,
                onInput: (f) => ve(Number(ae), { label: f.target.value })
              }, null, 40, Uo),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: R.type ?? "quick_reply",
                onChange: (f) => ve(Number(ae), { type: f.target.value })
              }, [...g[49] || (g[49] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1),
                e("option", { value: "opt_out" }, "Marketing opt-out", -1)
              ])], 40, Ro),
              R.type === "url" ? (s(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: R.url,
                onInput: (f) => ve(Number(ae), { url: f.target.value || void 0 })
              }, null, 40, To)) : R.type === "call" ? (s(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: R.phone,
                onInput: (f) => ve(Number(ae), { phone: f.target.value || void 0 })
              }, null, 40, Po)) : R.type === "opt_out" ? (s(), n("span", Vo, " Sends a built-in opt-out action. ")) : _("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (f) => pe(Number(ae))
              }, " Remove ", 8, Eo)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: q.value.length >= Ze,
              onClick: le
            }, " Add button ", 8, Mo)
          ])
        ])
      ]);
    };
  }
}), Oo = /* @__PURE__ */ xe(No, [["__scopeId", "data-v-3e4d670b"]]), Do = { class: "wa-preview-root" }, Wo = { class: "wa-device" }, Ho = { class: "wa-screen" }, zo = { class: "wa-header" }, Fo = { class: "wa-titleblock" }, qo = { class: "wa-title-row" }, jo = { class: "wa-title" }, Ko = { class: "wa-subtitle" }, Yo = {
  key: 0,
  class: "wa-flow-shell"
}, Jo = { class: "wa-flow-header" }, Go = { class: "wa-flow-title" }, Xo = { class: "wa-flow-content" }, Qo = { class: "wa-flow-eyebrow" }, Zo = {
  key: 0,
  class: "wa-flow-products"
}, ei = { class: "wa-flow-footer" }, ti = {
  type: "button",
  class: "wa-flow-cta"
}, ai = { class: "wa-managed" }, si = {
  key: 1,
  class: "wa-thread"
}, ni = { class: "wa-secure-banner" }, li = { class: "wa-msg wa-msg--in" }, oi = { class: "wa-template-card" }, ii = {
  key: 0,
  class: "wa-card-media"
}, ri = { class: "wa-card-media-tag" }, di = { class: "wa-card-media-sub" }, ui = {
  key: 1,
  class: "wa-card-header-text"
}, ci = ["innerHTML"], pi = {
  key: 2,
  class: "wa-inline-note"
}, mi = {
  key: 3,
  class: "wa-inline-note"
}, vi = {
  key: 4,
  class: "wa-inline-note"
}, bi = {
  key: 5,
  class: "wa-inline-note wa-inline-note--warn"
}, gi = {
  key: 6,
  class: "wa-inline-note wa-inline-note--muted"
}, fi = {
  key: 7,
  class: "wa-product-list"
}, yi = { class: "wa-product-name" }, hi = { class: "wa-product-price" }, ki = {
  key: 8,
  type: "button",
  class: "wa-template-cta"
}, _i = {
  key: 9,
  class: "wa-template-actions"
}, wi = { class: "wa-msg wa-msg--out" }, $i = { class: "wa-bubble wa-bubble--out" }, xi = { class: "wa-bubble-author" }, Si = { class: "wa-msg wa-msg--in" }, Ci = { class: "wa-bubble wa-bubble--in" }, Ii = /* @__PURE__ */ _e({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(a) {
    const o = a;
    function c(S) {
      return String(S).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const p = w(() => {
      var L;
      const S = ((L = o.template) == null ? void 0 : L.body) ?? "";
      return c(S).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), u = w(() => o.template.templateName || "Ecoshop"), i = w(() => "Business Account"), x = w(() => o.template.format === "flow" || !!o.template.flow), I = w(() => {
      var S, $, L;
      return (($ = (S = o.template.buttons) == null ? void 0 : S[0]) == null ? void 0 : $.text) || ((L = o.template.flow) == null ? void 0 : L.ctaLabel) || "Continue";
    }), k = w(() => o.template.buttons ?? []), T = w(() => {
      var S;
      return (((S = o.template.multiProduct) == null ? void 0 : S.length) ?? 0) > 0;
    }), P = w(() => (o.template.format || "text").toUpperCase()), q = w(() => {
      const S = o.template.header;
      return !S || S.type === "text" ? "" : S.type === "image" ? S.url || "Image" : S.type === "video" ? S.url || "Video" : S.filename || S.url || "Document";
    }), H = w(() => {
      const S = o.template.header;
      if (!(!S || S.type !== "image" || !S.url))
        return { backgroundImage: `url(${S.url})` };
    }), ee = w(() => {
      var $, L, ne;
      const S = o.template;
      return S.format === "flow" ? "Thanks, we received your preferences." : ($ = S.auth) != null && $.code ? "Use the verification code and let us know if it works." : (L = S.coupon) != null && L.code ? `Your coupon ${S.coupon.code} is active now.` : S.limitedOffer ? `Great choice. This offer is valid until ${S.limitedOffer}.` : (ne = o.template.multiProduct) != null && ne.length ? `Here are ${o.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), J = w(() => {
      var $, L;
      const S = o.template;
      return S.location ? S.location.name || S.location.address || `${S.location.lat}, ${S.location.lng}` : ($ = S.auth) != null && $.code ? `Verification code: ${S.auth.code}` : (L = S.flow) != null && L.id ? `Flow ID: ${S.flow.id}` : S.templateLanguage ? `Template language: ${S.templateLanguage}` : `Category: ${S.templateCategory || "utility"} • Format: ${S.format || "text"}`;
    }), ge = w(() => {
      var L, ne;
      const S = o.template;
      if ((L = S.multiProduct) != null && L.length) return S.multiProduct.slice(0, 5).map((j) => j.name || "Product");
      if ((ne = S.buttons) != null && ne.length) return S.buttons.slice(0, 5).map((j) => j.text || "Option");
      const $ = (S.body || "").split(/\n|\.|,/).map((j) => j.trim()).filter(Boolean).slice(0, 5);
      return $.length ? $ : ["Option A", "Option B", "Option C"];
    });
    return (S, $) => {
      var L, ne, j, he, fe, ve;
      return s(), n("div", Do, [
        e("div", Wo, [
          e("div", Ho, [
            $[20] || ($[20] = Ne('<div class="wa-statusbar" data-v-d96ea1d0><span class="wa-time" data-v-d96ea1d0>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-d96ea1d0><span class="wa-signal" data-v-d96ea1d0></span><span class="wa-wifi" data-v-d96ea1d0></span><span class="wa-battery" data-v-d96ea1d0></span></div></div>', 1)),
            e("div", zo, [
              $[4] || ($[4] = e("span", { class: "wa-back" }, "←", -1)),
              $[5] || ($[5] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Fo, [
                e("div", qo, [
                  e("span", jo, b(u.value), 1),
                  $[3] || ($[3] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Ko, b(i.value), 1)
              ]),
              $[6] || ($[6] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            x.value ? (s(), n("div", Yo, [
              $[11] || ($[11] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Jo, [
                $[7] || ($[7] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Go, b(u.value), 1),
                $[8] || ($[8] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Xo, [
                e("p", Qo, b(a.template.body || "Please choose an option below."), 1),
                (s(!0), n(K, null, G(ge.value, (pe, le) => (s(), n("div", {
                  key: `flow-opt-${le}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, b(pe), 1),
                  e("span", {
                    class: $e(["wa-radio", { "wa-radio--on": le === 0 }])
                  }, null, 2)
                ]))), 128)),
                (L = a.template.multiProduct) != null && L.length ? (s(), n("div", Zo, [
                  (s(!0), n(K, null, G(a.template.multiProduct.slice(0, 3), (pe, le) => (s(), n("div", {
                    key: le,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, b(pe.name || "Product"), 1),
                      e("p", null, b(pe.price || "Price on request"), 1)
                    ]),
                    $[9] || ($[9] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : _("", !0)
              ]),
              e("div", ei, [
                e("button", ti, b(I.value), 1),
                e("p", ai, [
                  $[10] || ($[10] = X("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: $[0] || ($[0] = Ye(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (s(), n("div", si, [
              $[19] || ($[19] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", ni, [
                $[12] || ($[12] = e("span", null, "●", -1)),
                $[13] || ($[13] = X(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: $[1] || ($[1] = Ye(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", li, [
                e("div", oi, [
                  a.template.header && a.template.header.type !== "text" ? (s(), n("div", ii, [
                    e("div", ri, b(P.value) + " TEMPLATE", 1),
                    e("div", di, b(q.value), 1),
                    H.value ? (s(), n("div", {
                      key: 0,
                      class: "wa-card-media-image",
                      style: re(H.value)
                    }, null, 4)) : _("", !0)
                  ])) : (ne = a.template.header) != null && ne.text ? (s(), n("div", ui, b(a.template.header.text), 1)) : _("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: p.value
                  }, null, 8, ci),
                  a.template.location ? (s(), n("div", pi, " 📍 " + b(a.template.location.name || a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)) : _("", !0),
                  (j = a.template.coupon) != null && j.code ? (s(), n("div", mi, [
                    $[14] || ($[14] = X(" Coupon: ", -1)),
                    e("strong", null, b(a.template.coupon.code), 1)
                  ])) : _("", !0),
                  (he = a.template.auth) != null && he.code ? (s(), n("div", vi, [
                    $[15] || ($[15] = X(" Verification code: ", -1)),
                    e("strong", null, b(a.template.auth.code), 1)
                  ])) : _("", !0),
                  a.template.limitedOffer ? (s(), n("div", bi, " Expires: " + b(a.template.limitedOffer), 1)) : _("", !0),
                  a.template.footer ? (s(), n("div", gi, b(a.template.footer), 1)) : _("", !0),
                  T.value ? (s(), n("div", fi, [
                    (s(!0), n(K, null, G((fe = a.template.multiProduct) == null ? void 0 : fe.slice(0, 4), (pe, le) => (s(), n("div", {
                      key: `prod-${le}`,
                      class: "wa-product-row"
                    }, [
                      e("span", yi, b(pe.name || `Item ${le + 1}`), 1),
                      e("span", hi, b(pe.price || "-"), 1)
                    ]))), 128))
                  ])) : _("", !0),
                  I.value ? (s(), n("button", ki, b(I.value), 1)) : _("", !0),
                  k.value.length > 1 ? (s(), n("div", _i, [
                    (s(!0), n(K, null, G(k.value.slice(1, 4), (pe, le) => (s(), n("button", {
                      key: `action-${le}`,
                      type: "button",
                      class: "wa-template-action"
                    }, b(pe.text), 1))), 128))
                  ])) : _("", !0),
                  $[16] || ($[16] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ]),
              e("div", wi, [
                e("div", $i, [
                  e("span", xi, b(u.value), 1),
                  e("p", null, b(ee.value), 1),
                  $[17] || ($[17] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ]),
              e("div", Si, [
                e("div", Ci, [
                  e("p", null, b(J.value), 1),
                  (ve = a.template.flow) != null && ve.id ? (s(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: $[2] || ($[2] = Ye(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + b(a.template.flow.id), 1)) : _("", !0),
                  $[18] || ($[18] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            $[21] || ($[21] = Ne('<div class="wa-inputbar" data-v-d96ea1d0><span class="wa-input-icon wa-input-icon--emoji" data-v-d96ea1d0></span><span class="wa-input-placeholder" data-v-d96ea1d0>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-d96ea1d0></span><span class="wa-input-icon wa-input-icon--camera" data-v-d96ea1d0></span><button type="button" class="wa-mic" data-v-d96ea1d0><span class="wa-input-icon wa-input-icon--mic" data-v-d96ea1d0></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Bi = /* @__PURE__ */ xe(Ii, [["__scopeId", "data-v-d96ea1d0"]]), Ai = { class: "keos-whatsapp-builder" }, Li = { class: "kb-builder-top" }, Ui = { style: { margin: 0, paddingLeft: "1.25rem" } }, Ri = { class: "kb-wa-layout" }, Ti = { class: "kb-wa-sidebar" }, Pi = {
  key: 0,
  class: "kb-wa-form"
}, Vi = { class: "kb-wa-form-head" }, Ei = { class: "kb-wa-form-head-top" }, Mi = { class: "kb-wa-health-pill" }, Ni = { class: "kb-wa-form-head-row" }, Oi = ["value"], Di = { class: "kb-wa-health" }, Wi = { class: "kb-wa-health-row" }, Hi = { class: "kb-wa-health-value" }, zi = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Fi = { class: "kb-wa-canvas" }, qi = {
  key: 0,
  class: "kb-wa-test-banner"
}, ji = { class: "kb-wa-preview-chrome" }, Ki = { class: "kb-push-preview-controls" }, Yi = { class: "kb-push-preview-as" }, Ji = ["value"], Gi = { class: "kb-preview-status" }, Xi = { class: "kb-wa-preview-frame" }, Qi = { class: "kb-wa-actions" }, Zi = {
  key: 0,
  class: "kb-actions-note"
}, er = { class: "kb-wa-actions-right" }, tr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, ar = { class: "kb-confirm-dialog" }, sr = { class: "kb-confirm-actions" }, vt = 60, bt = 1024, gt = 60, ft = 10, yt = 10, nr = /* @__PURE__ */ _e({
  __name: "KeosWhatsAppBuilder",
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
    function c(f) {
      var te, Y, B, m, h;
      const A = [], D = f.message, ue = (D.template_category ?? "").toString().trim(), ce = (D.template_type ?? "text").toString(), F = (D.header_type ?? "none").toString(), W = (D.header ?? "").toString(), Q = (D.body ?? "").toString(), Se = (D.footer ?? "").toString(), M = Array.isArray(D.buttons) ? D.buttons : [], y = Array.isArray(D.cards) ? D.cards : [];
      return (te = f.name) != null && te.trim() || A.push("Template name is required"), (Y = D.template_name) != null && Y.trim() || A.push("WhatsApp template name is required"), ue || A.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), Q.trim() || A.push("Body is required"), F === "text" && W.length > vt && A.push(`Header text cannot exceed ${vt} characters`), Q.length > bt && A.push(`Body cannot exceed ${bt} characters`), Se.length > gt && A.push(`Footer cannot exceed ${gt} characters`), M.length > ft && A.push(`Buttons cannot exceed ${ft}`), (ce === "image" || ce === "video" || ce === "document" || F === "image" || F === "video" || F === "document") && !D.media_url && A.push("Media URL is required for rich media templates"), ue === "authentication" && ce !== "auth" && A.push("Authentication category must use Authentication format"), ce === "auth" && !((B = D.auth_label) != null && B.trim()) && !Q.includes("{{") && A.push("Authentication templates should include a code label or placeholder variable"), ce === "lto" && !D.lto_expiry && A.push("Limited-time offer requires an expiry"), (ce === "mpm" || ce === "catalog") && !((m = D.products) != null && m.length) && A.push("Catalog and multi-product templates require at least one product"), ce === "flow" && !((h = D.flow_id) != null && h.trim()) && A.push("WhatsApp Flow format requires a flow ID"), ce === "carousel" && (y.length ? y.length > yt && A.push(`Carousel supports up to ${yt} cards`) : A.push("Carousel format requires at least one card")), A;
    }
    const p = a, u = o, {
      campaign: i,
      dirty: x,
      customValidatorErrors: I,
      getValidationWithWarnings: k,
      update: T,
      updateMessage: P,
      undo: q,
      redo: H,
      canUndo: ee,
      canRedo: J,
      resetMessage: ge,
      hooks: S
    } = Fe({
      initial: p.modelValue,
      hooks: {
        ...p.hooks,
        customValidators: async (f) => {
          var ue;
          const A = c(f), D = (ue = p.hooks) != null && ue.customValidators ? await p.hooks.customValidators(f) : [];
          return [...A, ...D];
        }
      },
      onDirty: () => u("change", i.value)
    }), { lastSavedAt: $ } = qe(i, { channel: "whatsapp" });
    function L(f) {
      (f.metaKey || f.ctrlKey) && f.key === "z" && (f.preventDefault(), f.shiftKey ? H() : q());
    }
    De(() => {
      window.addEventListener("keydown", L);
    }), We(() => {
      window.removeEventListener("keydown", L);
    }), Be(i, (f) => u("update:modelValue", f), { deep: !0 });
    const ne = se(), j = se(!0);
    async function he() {
      if (S.estimateReach)
        try {
          ne.value = await S.estimateReach(i.value.audience);
        } catch {
          ne.value = void 0;
        }
      S.canSend && (j.value = await Promise.resolve(S.canSend()));
    }
    he(), Be(() => i.value.audience, he, { deep: !0 });
    const fe = w(() => (I.value, k(ne.value))), ve = w(() => fe.value.blockingErrors), pe = w(() => fe.value.warnings), le = w(() => fe.value.valid), ye = w(() => {
      var ue, ce, F;
      const f = i.value.message, A = [
        !!((ue = f.template_name) != null && ue.trim()),
        !!((ce = f.template_category) != null && ce.trim()),
        !!(f.body ?? "").toString().trim(),
        !!((F = f.template_language) != null && F.trim()),
        Array.isArray(f.buttons) ? f.buttons.length > 0 : !1
      ], D = A.filter(Boolean).length;
      return Math.round(D / A.length * 100);
    }), z = w(() => ye.value >= 90 ? "Production ready" : ye.value >= 70 ? "Strong draft" : ye.value >= 40 ? "In progress" : "Needs setup"), be = se(""), oe = se(!1), C = se(null), ke = w(() => {
      const f = be.value;
      return f ? Ee.find((A) => A.id === f) ?? null : null;
    }), U = w(() => {
      const f = i.value.message.body ?? "";
      return ke.value ? Pe(f, ke.value.data) : f;
    }), g = w(() => {
      const f = i.value.message.header ?? "";
      return ke.value ? Pe(f, ke.value.data) : f;
    }), de = w(() => {
      const f = i.value.message, A = f.template_type ?? "text", D = f.header_type ?? "none";
      let ue, ce, F, W, Q, Se, M;
      (A === "image" || D === "image") && f.media_url ? ue = { type: "image", url: f.media_url } : (A === "video" || D === "video") && f.media_url ? ue = { type: "video", url: f.media_url } : A === "document" || D === "document" ? ue = {
        type: "document",
        filename: f.document_filename || f.media_url || "document.pdf"
      } : D === "text" && f.header ? ue = { type: "text", text: g.value } : f.header && (ue = { type: "text", text: g.value });
      const y = U.value || "Start adding content to see a live preview here.";
      if (A === "location" && f.location) {
        const Y = f.location, B = Y.lat ?? Y.latitude, m = Y.lng ?? Y.lon ?? Y.longitude;
        B != null && m != null && (ce = {
          lat: B,
          lng: m,
          name: Y.name ?? Y.title,
          address: Y.address ?? `${B}, ${m}`
        });
      }
      (A === "catalog" || A === "mpm") && Array.isArray(f.products) && f.products.length && (F = !0, W = f.products.map((Y) => ({
        image: Y.image ?? Y.imageUrl,
        name: Y.name ?? Y.sectionTitle ?? Y.title ?? "Product",
        price: Y.price ?? Y.productId ?? ""
      }))), A === "carousel" && Array.isArray(f.cards) && f.cards.length && (F = !0, W = f.cards.map((Y) => ({
        image: Y.image ?? Y.media_url,
        name: Y.title ?? "Card",
        price: Y.button_label ?? ""
      }))), A === "coupon" && f.coupon_code && (Q = { code: f.coupon_code }), A === "lto" && f.lto_expiry && (Se = f.lto_expiry), A === "auth" && (M = { code: f.auth_code ?? f.otp_code ?? "123 456" });
      const te = f.buttons ?? [];
      return A === "flow" && te.push({
        label: f.flow_cta_label ?? "Open flow"
      }), {
        format: A,
        templateName: f.template_name || void 0,
        templateLanguage: f.template_language || void 0,
        templateCategory: f.template_category || void 0,
        header: ue,
        body: y,
        mediaCaption: f.media_caption || void 0,
        footer: f.footer || void 0,
        buttons: te.map((Y) => ({ text: Y.label || "Button" })),
        location: ce,
        catalog: F,
        multiProduct: W,
        coupon: Q,
        limitedOffer: Se,
        auth: M,
        flow: A === "flow" ? {
          id: f.flow_id || void 0,
          ctaLabel: f.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function me(f) {
      const A = i.value, D = f.campaign.message ? { ...A.message, ...f.campaign.message } : A.message;
      T({
        ...f.campaign,
        message: D
      }), C.value = null, oe.value = !1;
    }
    function Ae(f) {
      const A = f.target.value;
      if (!A) return;
      const D = ut.find((ue) => ue.id === A);
      D && (x.value ? (C.value = D, oe.value = !0) : me(D), f.target.value = "");
    }
    function we(f) {
      T({
        name: f,
        tracking: { ...i.value.tracking ?? {}, campaign_name: f }
      });
    }
    function R(f) {
      const A = ` {{ ${f.variable} }}`, D = i.value.message.variables ?? [], ue = Array.from(/* @__PURE__ */ new Set([...D, f.variable]));
      if (f.field === "title") {
        const ce = i.value.message.header ?? "";
        P({
          variables: ue,
          header: ce + A
        });
      } else {
        const ce = i.value.message.body ?? "";
        P({
          variables: ue,
          body: ce + A
        });
      }
    }
    function ae() {
      le.value && u("save", i.value);
    }
    return (f, A) => (s(), n("div", Ai, [
      e("div", Li, [
        Ce(je, {
          "campaign-name": d(i).name,
          status: d(i).status,
          dirty: d(x),
          "last-saved-at": d($),
          "can-undo": d(ee),
          "can-redo": d(J),
          "slugify-name": p.enforceSlugName,
          "onUpdate:campaignName": we,
          onUndo: d(q),
          onRedo: d(H)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: d(ie).dangerBg,
            border: `1px solid ${d(ie).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[12]}px ${d(Z)[16]}px`,
            marginBottom: `${d(Z)[16]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: d(ie).danger })
          }, [
            (s(!0), n(K, null, G(ve.value, (D) => (s(), n("li", {
              key: D.message
            }, b(D.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        pe.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: d(ie).neutral.bg,
            border: `1px solid ${d(ie).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[12]}px ${d(Z)[16]}px`,
            marginBottom: `${d(Z)[16]}px`,
            fontSize: "0.875rem",
            color: d(ie).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${d(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", Ui, [
            (s(!0), n(K, null, G(pe.value, (D) => (s(), n("li", {
              key: D.message
            }, b(D.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Ri, [
        e("aside", Ti, [
          a.disabledSections.includes("whatsapp") ? _("", !0) : (s(), n("div", Pi, [
            e("div", Vi, [
              e("div", Ei, [
                A[6] || (A[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                e("span", Mi, b(z.value), 1)
              ]),
              e("div", Ni, [
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Ae
                }, [
                  A[7] || (A[7] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, G(d(ut), (D) => (s(), n("option", {
                    key: D.id,
                    value: D.id
                  }, b(D.label), 9, Oi))), 128))
                ], 32)
              ]),
              e("div", Di, [
                e("div", Wi, [
                  A[8] || (A[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                  e("span", Hi, b(ye.value) + "%", 1)
                ]),
                e("div", zi, [
                  e("span", {
                    class: "kb-wa-health-fill",
                    style: re({ width: `${ye.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ce(Oo, {
              message: d(i).message,
              "show-reset": !0,
              onUpdate: d(P),
              onReset: A[0] || (A[0] = (D) => d(ge)())
            }, null, 8, ["message", "onUpdate"]),
            Ce(Bt, {
              message: d(i).message,
              "variable-options": a.variableOptions,
              onUpdate: d(P),
              onInsertVariable: R
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Fi, [
          !a.designOnly && d(i).audience.test_mode ? (s(), n("div", qi, [...A[9] || (A[9] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", ji, [
            e("div", Ki, [
              e("label", Yi, [
                A[11] || (A[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": A[1] || (A[1] = (D) => be.value = D),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  A[10] || (A[10] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, G(d(Ee), (D) => (s(), n("option", {
                    key: D.id,
                    value: D.id
                  }, b(D.label), 9, Ji))), 128))
                ], 512), [
                  [Oe, be.value]
                ])
              ]),
              e("div", Gi, [
                A[12] || (A[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, b(d(i).message.template_type || "text"), 1)
              ])
            ]),
            e("div", Xi, [
              Ce(Bi, { template: de.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", Qi, [
        p.actionsNote ? (s(), n("div", Zi, b(p.actionsNote), 1)) : _("", !0),
        e("div", er, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: A[2] || (A[2] = (D) => u("duplicate", JSON.parse(JSON.stringify(d(i)))))
          }, " Duplicate ")) : _("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: ae
          }, " Save ")) : _("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: A[3] || (A[3] = (D) => u("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      oe.value ? (s(), n("div", tr, [
        e("div", ar, [
          A[13] || (A[13] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          A[14] || (A[14] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", sr, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: A[4] || (A[4] = (D) => {
                oe.value = !1, C.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: A[5] || (A[5] = (D) => C.value && me(C.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), Ut = /* @__PURE__ */ xe(nr, [["__scopeId", "data-v-3d7526a8"]]), lr = { class: "kb-section" }, or = { class: "kb-section__head" }, ir = { class: "kb-field" }, rr = ["value"], dr = { class: "kb-field" }, ur = { class: "kb-label" }, cr = { key: 0 }, pr = { key: 1 }, mr = { key: 2 }, vr = ["value"], br = {
  key: 0,
  class: "kb-truncation-hint"
}, gr = { class: "kb-field" }, fr = { class: "kb-insert-row" }, yr = ["value"], hr = { class: "kb-field" }, kr = { class: "kb-insert-row" }, _r = /* @__PURE__ */ _e({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    const c = a, p = o, u = ["first_name", "last_name", "order_id", "city"], i = se(c.variableOptions && c.variableOptions.length ? [...c.variableOptions] : u), x = se(i.value[0] ?? u[0]), I = se("");
    Be(
      () => c.variableOptions,
      (S) => {
        S && S.length && (i.value = [...S], i.value.includes(x.value) || (x.value = i.value[0]));
      }
    );
    const k = w(() => c.message.body ?? ""), T = w(() => k.value.length), P = w(() => T.value ? T.value <= 160 ? 1 : Math.ceil(T.value / 153) : 0), q = w(() => {
      const S = T.value;
      return S <= 160 ? null : S <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function H(S) {
      const $ = S.target.value;
      p("update", {
        sender_id: $ || void 0
      });
    }
    function ee(S) {
      const $ = S.target.value;
      p("update", {
        body: $
      });
    }
    function J() {
      const S = x.value;
      if (!S) return;
      const $ = ` {{ ${S} }}`, L = k.value || "", ne = c.message.variables ?? [], j = Array.from(/* @__PURE__ */ new Set([...ne, S]));
      p("update", {
        body: L + $,
        variables: j
      });
    }
    function ge() {
      const S = I.value.trim();
      S && (i.value.includes(S) || (i.value = [...i.value, S]), x.value = S, I.value = "");
    }
    return (S, $) => (s(), n("section", lr, [
      e("div", or, [
        $[3] || ($[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: $[0] || ($[0] = (L) => S.$emit("reset"))
        }, " Reset section ")) : _("", !0)
      ]),
      $[10] || ($[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", ir, [
        $[4] || ($[4] = e("label", { class: "kb-label" }, [
          X(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: c.message.sender_id ?? "",
          onInput: H
        }, null, 40, rr)
      ]),
      e("div", dr, [
        e("label", ur, [
          $[5] || ($[5] = X(" Message body ", -1)),
          e("span", {
            class: $e(["kb-counter", { "kb-counter--warn": P.value > 3 }])
          }, [
            X(b(T.value) + " chars · ", 1),
            P.value === 0 ? (s(), n("span", cr, "0 segments")) : P.value === 1 ? (s(), n("span", pr, "1 segment")) : (s(), n("span", mr, b(P.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: k.value,
          onInput: ee
        }, null, 40, vr),
        $[6] || ($[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        q.value ? (s(), n("p", br, b(q.value), 1)) : _("", !0)
      ]),
      e("div", gr, [
        $[7] || ($[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", fr, [
          Re(e("select", {
            "onUpdate:modelValue": $[1] || ($[1] = (L) => x.value = L),
            class: "kb-select"
          }, [
            (s(!0), n(K, null, G(i.value, (L) => (s(), n("option", {
              key: L,
              value: L
            }, b(L), 9, yr))), 128))
          ], 512), [
            [Oe, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: J
          }, " Insert into message ")
        ]),
        $[8] || ($[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", hr, [
        $[9] || ($[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", kr, [
          Re(e("input", {
            "onUpdate:modelValue": $[2] || ($[2] = (L) => I.value = L),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [et, I.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ge
          }, " Add ")
        ])
      ])
    ]));
  }
}), wr = /* @__PURE__ */ xe(_r, [["__scopeId", "data-v-5e9aa8e6"]]), $r = { class: "keos-sms-builder" }, xr = { class: "kb-builder-top" }, Sr = { style: { margin: 0, paddingLeft: "1.25rem" } }, Cr = { class: "kb-sms-layout" }, Ir = { class: "kb-sms-sidebar" }, Br = {
  key: 0,
  class: "kb-sms-form"
}, Ar = { class: "kb-sms-form-head" }, Lr = { class: "kb-sms-form-head-top" }, Ur = { class: "kb-sms-health-pill" }, Rr = { class: "kb-wa-form-head-row" }, Tr = ["value"], Pr = { class: "kb-sms-health" }, Vr = { class: "kb-sms-health-row" }, Er = { class: "kb-sms-health-value" }, Mr = { class: "kb-sms-health-bar" }, Nr = { class: "kb-sms-canvas" }, Or = {
  key: 0,
  class: "kb-sms-test-banner"
}, Dr = { class: "kb-sms-preview-chrome" }, Wr = { class: "kb-push-preview-controls" }, Hr = { class: "kb-push-preview-as" }, zr = ["value"], Fr = { class: "kb-preview-status" }, qr = { class: "kb-sms-preview-frame" }, jr = { class: "kb-preview" }, Kr = { class: "kb-sms-preview" }, Yr = { class: "kb-sms-phone" }, Jr = { class: "kb-sms-header" }, Gr = { class: "kb-sms-sender" }, Xr = { class: "kb-sms-thread" }, Qr = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, Zr = { class: "kb-sms-text" }, ed = { class: "kb-sms-counter" }, td = { key: 0 }, ad = { key: 1 }, sd = { key: 2 }, nd = {
  key: 3,
  class: "kb-sms-cost"
}, ld = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, od = { class: "kb-sms-actions" }, id = {
  key: 0,
  class: "kb-actions-note"
}, rd = { class: "kb-sms-actions-right" }, dd = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, ud = { class: "kb-confirm-dialog" }, cd = { class: "kb-confirm-actions" }, pd = /* @__PURE__ */ _e({
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
      campaign: u,
      dirty: i,
      customValidatorErrors: x,
      getValidationWithWarnings: I,
      update: k,
      updateMessage: T,
      undo: P,
      redo: q,
      canUndo: H,
      canRedo: ee,
      resetMessage: J,
      hooks: ge
    } = Fe({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (F) => {
          var Se, M;
          const W = [];
          (Se = F.name) != null && Se.trim() || W.push("Template name is required");
          const Q = (M = c.hooks) != null && M.customValidators ? await c.hooks.customValidators(F) : [];
          return [...W, ...Q];
        }
      },
      onDirty: () => p("change", u.value)
    }), { lastSavedAt: S } = qe(u, { channel: "sms" });
    function $(F) {
      (F.metaKey || F.ctrlKey) && F.key === "z" && (F.preventDefault(), F.shiftKey ? q() : P());
    }
    De(() => {
      window.addEventListener("keydown", $);
    }), We(() => {
      window.removeEventListener("keydown", $);
    }), Be(u, (F) => p("update:modelValue", F), { deep: !0 });
    const L = se(), ne = se(!0);
    async function j() {
      if (ge.estimateReach)
        try {
          L.value = await ge.estimateReach(u.value.audience);
        } catch {
          L.value = void 0;
        }
      ge.canSend && (ne.value = await Promise.resolve(ge.canSend()));
    }
    j(), Be(() => u.value.audience, j, { deep: !0 });
    const he = w(() => (x.value, I(L.value))), fe = w(() => he.value.blockingErrors), ve = w(() => he.value.warnings), pe = w(() => he.value.valid), le = w(() => {
      var Se, M, y;
      const F = u.value.message, W = [
        !!((Se = u.value.name) != null && Se.trim()),
        !!((M = F.body) != null && M.trim()),
        !!((y = F.sender_id) != null && y.trim()),
        !!u.value.template_type,
        (F.body ?? "").length > 20
      ], Q = W.filter(Boolean).length;
      return Math.round(Q / W.length * 100);
    }), ye = w(() => le.value >= 90 ? "Production ready" : le.value >= 70 ? "Strong draft" : le.value >= 40 ? "In progress" : "Needs setup"), z = w(
      () => u.value.template_type ?? "transactional"
    ), be = se(""), oe = se(!1), C = se(null), ke = w(() => {
      const F = be.value;
      return F ? Ee.find((W) => W.id === F) ?? null : null;
    }), U = w(() => {
      const F = we.value;
      return ke.value ? Pe(F, ke.value.data) : F;
    });
    function g(F) {
      const W = u.value, Q = F.campaign.message ? { ...W.message, ...F.campaign.message } : W.message;
      k({
        ...F.campaign,
        message: Q
      }), C.value = null, oe.value = !1;
    }
    function de(F) {
      const W = F.target.value;
      if (!W) return;
      const Q = ct.find((Se) => Se.id === W);
      Q && (i.value ? (C.value = Q, oe.value = !0) : g(Q), F.target.value = "");
    }
    function me(F) {
      k({ template_type: F });
    }
    function Ae(F) {
      k({
        name: F,
        tracking: { ...u.value.tracking ?? {}, campaign_name: F }
      });
    }
    const we = w(
      () => (u.value.message.body ?? "") || ""
    ), R = w(() => we.value.length), ae = w(() => R.value ? R.value <= 160 ? 1 : Math.ceil(R.value / 153) : 0), f = w(() => {
      const F = U.value;
      return F.trim().length ? F : "Your SMS message preview will appear here.";
    }), A = w(() => {
      const F = c.costPerSegment ?? 0;
      return !F || ae.value === 0 ? null : (ae.value * F).toFixed(2);
    }), D = w(() => {
      const F = R.value;
      return F <= 160 ? null : F <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), ue = w(
      () => u.value.message.sender_id ?? "YourBrand"
    );
    function ce() {
      pe.value && p("save", u.value);
    }
    return (F, W) => (s(), n("div", $r, [
      e("div", xr, [
        Ce(je, {
          "campaign-name": d(u).name,
          status: d(u).status,
          dirty: d(i),
          "last-saved-at": d(S),
          "can-undo": d(H),
          "can-redo": d(ee),
          "slugify-name": c.enforceSlugName,
          "onUpdate:campaignName": Ae,
          onUndo: d(P),
          onRedo: d(q)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        fe.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: d(ie).dangerBg,
            border: `1px solid ${d(ie).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[12]}px ${d(Z)[16]}px`,
            marginBottom: `${d(Z)[16]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: d(ie).danger })
          }, [
            (s(!0), n(K, null, G(fe.value, (Q) => (s(), n("li", {
              key: Q.message
            }, b(Q.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        ve.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: d(ie).neutral.bg,
            border: `1px solid ${d(ie).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[12]}px ${d(Z)[16]}px`,
            marginBottom: `${d(Z)[16]}px`,
            fontSize: "0.875rem",
            color: d(ie).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${d(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", Sr, [
            (s(!0), n(K, null, G(ve.value, (Q) => (s(), n("li", {
              key: Q.message
            }, b(Q.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Cr, [
        e("aside", Ir, [
          a.disabledSections.includes("sms") ? _("", !0) : (s(), n("div", Br, [
            e("div", Ar, [
              e("div", Lr, [
                W[6] || (W[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                e("span", Ur, b(ye.value), 1)
              ]),
              e("div", Rr, [
                Ce(lt, {
                  "template-type": z.value,
                  onUpdate: me
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: de
                }, [
                  W[7] || (W[7] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, G(d(ct), (Q) => (s(), n("option", {
                    key: Q.id,
                    value: Q.id
                  }, b(Q.label), 9, Tr))), 128))
                ], 32)
              ]),
              e("div", Pr, [
                e("div", Vr, [
                  W[8] || (W[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                  e("span", Er, b(le.value) + "%", 1)
                ]),
                e("div", Mr, [
                  e("span", {
                    class: "kb-sms-health-fill",
                    style: re({ width: `${le.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ce(wr, {
              message: d(u).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: d(T),
              onReset: W[0] || (W[0] = (Q) => d(J)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Nr, [
          !a.designOnly && d(u).audience.test_mode ? (s(), n("div", Or, [...W[9] || (W[9] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Dr, [
            e("div", Wr, [
              e("label", Hr, [
                W[11] || (W[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": W[1] || (W[1] = (Q) => be.value = Q),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  W[10] || (W[10] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, G(d(Ee), (Q) => (s(), n("option", {
                    key: Q.id,
                    value: Q.id
                  }, b(Q.label), 9, zr))), 128))
                ], 512), [
                  [Oe, be.value]
                ])
              ]),
              e("div", Fr, [
                W[12] || (W[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                e("strong", null, b(ae.value || 0), 1)
              ])
            ]),
            e("div", qr, [
              e("div", jr, [
                e("div", Kr, [
                  e("div", Yr, [
                    W[15] || (W[15] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", Jr, [
                      e("div", Gr, b(ue.value), 1),
                      W[13] || (W[13] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", Xr, [
                      e("div", Qr, [
                        e("span", Zr, b(f.value), 1),
                        W[14] || (W[14] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", ed, [
                    X(b(R.value) + " characters · ", 1),
                    ae.value === 0 ? (s(), n("span", td, "0 segments")) : ae.value === 1 ? (s(), n("span", ad, "1 segment")) : (s(), n("span", sd, b(ae.value) + " segments", 1)),
                    W[16] || (W[16] = X(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    A.value !== null ? (s(), n("span", nd, " · Est. " + b(A.value), 1)) : _("", !0)
                  ]),
                  D.value ? (s(), n("p", ld, b(D.value), 1)) : _("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", od, [
        c.actionsNote ? (s(), n("div", id, b(c.actionsNote), 1)) : _("", !0),
        e("div", rd, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: W[2] || (W[2] = (Q) => p("duplicate", JSON.parse(JSON.stringify(d(u)))))
          }, " Duplicate ")) : _("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: ce
          }, " Save ")) : _("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: W[3] || (W[3] = (Q) => p("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      oe.value ? (s(), n("div", dd, [
        e("div", ud, [
          W[17] || (W[17] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          W[18] || (W[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", cd, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: W[4] || (W[4] = (Q) => {
                oe.value = !1, C.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: W[5] || (W[5] = (Q) => C.value && g(C.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), Rt = /* @__PURE__ */ xe(pd, [["__scopeId", "data-v-f626934e"]]), md = 30, vd = 60, bd = 130;
function gd(a) {
  const o = (a ?? "").trim().length;
  return o < md ? "too_short" : o <= vd ? "good" : "too_long";
}
function fd(a) {
  const o = (a ?? "").trim().length;
  return o === 0 ? "too_short" : o <= bd ? "good" : "too_long";
}
const yd = [
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
function ht(a) {
  if (!a || typeof a != "string") return [];
  const o = [];
  for (const c of yd) {
    const p = a.match(c);
    p && o.push(p[0]);
  }
  return o;
}
function hd(a) {
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
function kd(a) {
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
const _d = { class: "em-section" }, wd = { class: "em-strip" }, $d = { class: "em-strip-head" }, xd = { class: "em-field" }, Sd = ["value"], Cd = { class: "em-field" }, Id = ["value"], Bd = { class: "em-field" }, Ad = ["value"], Ld = { class: "em-field" }, Ud = { class: "em-input-group" }, Rd = ["value"], Td = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Pd = { class: "em-field" }, Vd = { class: "em-input-group" }, Ed = ["value"], Md = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Nd = { class: "em-strip em-strip--library" }, Od = { class: "em-library-chips" }, Dd = ["onClick"], Wd = { class: "em-strip em-strip--blocks" }, Hd = { class: "em-block-list" }, zd = ["data-type"], Fd = { class: "em-block-bar" }, qd = { class: "em-block-type" }, jd = { class: "em-block-actions" }, Kd = ["disabled", "onClick"], Yd = ["disabled", "onClick"], Jd = ["onClick"], Gd = {
  key: 0,
  class: "em-block-fields"
}, Xd = ["value", "onChange"], Qd = ["value", "onInput"], Zd = ["onClick"], eu = {
  key: 1,
  class: "em-block-fields"
}, tu = ["value", "onInput"], au = ["onClick"], su = {
  key: 2,
  class: "em-block-fields"
}, nu = ["value", "onInput"], lu = ["value", "onInput"], ou = ["value", "onInput"], iu = {
  key: 3,
  class: "em-block-fields"
}, ru = ["value", "onInput"], du = ["value", "onInput"], uu = { class: "em-block-fields--row" }, cu = ["value", "onInput"], pu = { class: "em-check-row" }, mu = ["checked", "onChange"], vu = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, bu = ["value", "onInput"], gu = {
  key: 5,
  class: "em-block-fields"
}, fu = ["value", "onInput"], yu = ["value", "onInput"], hu = ["value", "onInput"], ku = ["onClick"], _u = {
  key: 6,
  class: "em-block-fields"
}, wu = ["value", "onChange"], $u = { class: "em-list-items" }, xu = ["value", "onInput", "placeholder"], Su = ["onClick"], Cu = ["onClick"], Iu = {
  key: 7,
  class: "em-block-fields"
}, Bu = ["value", "onChange"], Au = ["value", "onInput"], Lu = ["onClick"], Uu = {
  key: 8,
  class: "em-block-fields"
}, Ru = { class: "em-social-links" }, Tu = ["value", "onChange"], Pu = ["value", "onInput"], Vu = ["onClick"], Eu = ["onClick"], Mu = {
  key: 9,
  class: "em-block-fields"
}, Nu = ["value", "onInput"], Ou = ["value", "onInput"], Du = ["value", "onInput"], Wu = {
  key: 10,
  class: "em-block-fields"
}, Hu = ["value", "onInput"], zu = { class: "em-link-list-items" }, Fu = ["value", "onInput"], qu = ["value", "onInput"], ju = ["onClick"], Ku = ["onClick"], Yu = {
  key: 11,
  class: "em-block-fields"
}, Ju = ["value", "onInput"], Gu = ["onClick"], Xu = ["value", "onInput"], Qu = ["onClick"], Zu = {
  key: 12,
  class: "em-block-fields"
}, ec = { class: "em-block-fields--row" }, tc = ["value", "onInput"], ac = { class: "em-block-fields--row" }, sc = ["value", "onInput"], nc = ["value", "onChange"], lc = {
  key: 13,
  class: "em-block-fields"
}, oc = ["value", "onChange"], ic = { class: "em-inline-label" }, rc = ["value", "onInput"], dc = ["onClick"], uc = {
  key: 14,
  class: "em-block-fields"
}, cc = ["value", "onInput"], pc = { class: "em-link-list-items" }, mc = ["value", "onInput"], vc = ["value", "onInput"], bc = ["onClick"], gc = ["onClick"], fc = {
  key: 15,
  class: "em-block-fields"
}, yc = ["value", "onInput"], hc = ["value", "onInput"], kc = ["onClick"], _c = ["onClick"], wc = {
  key: 16,
  class: "em-block-fields"
}, $c = ["value", "onInput"], xc = ["value", "onInput"], Sc = ["value", "onInput"], Cc = ["onClick"], Ic = ["onClick"], Bc = {
  key: 17,
  class: "em-block-fields"
}, Ac = ["value", "onInput"], Lc = ["value", "onInput"], Uc = {
  key: 18,
  class: "em-block-fields"
}, Rc = ["value", "onInput"], Tc = ["value", "onInput"], Pc = ["value", "onInput"], Vc = ["value", "onInput"], Ec = ["value", "onInput"], Mc = {
  key: 19,
  class: "em-block-fields"
}, Nc = ["value", "onInput"], Oc = ["onClick"], Dc = {
  key: 20,
  class: "em-block-fields"
}, Wc = ["value", "onInput"], Hc = ["value", "onInput"], zc = ["onClick"], Fc = {
  key: 21,
  class: "em-block-fields"
}, qc = ["value", "onInput"], jc = { class: "em-block-fields--row" }, Kc = ["value", "onInput"], Yc = {
  key: 22,
  class: "em-block-fields"
}, Jc = ["value", "onInput"], Gc = ["value", "onInput"], Xc = ["value", "onInput"], Qc = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Zc = ["value", "onChange"], ep = { class: "em-check-row" }, tp = ["checked", "onChange"], ap = { class: "em-add-bar" }, sp = { class: "em-add-bar-btns" }, np = { class: "em-strip em-strip--personalize" }, lp = { class: "em-field" }, op = { class: "em-input-group" }, ip = ["value"], rp = { class: "em-field" }, dp = { class: "em-input-group" }, Ue = "{{ var }}", up = /* @__PURE__ */ _e({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    var N;
    function c() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const p = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], u = [
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
    function i(v) {
      switch (v) {
        case "heading":
          return { id: c(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: c(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization.", alignment: "left", fullWidth: !1 };
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
            leftContent: "Left column text or {{ variable }}.",
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
const example = {{ order_id }};`,
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
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: c(), type: "paragraph", content: "" };
      }
    }
    const x = a, I = o, k = ["first_name", "last_name", "order_id", "city", "email"], T = se(
      (N = x.variableOptions) != null && N.length ? [...x.variableOptions] : k
    ), P = se(T.value[0] ?? "first_name"), q = se("");
    Be(
      () => x.variableOptions,
      (v) => {
        v != null && v.length && (T.value = [...v], T.value.includes(P.value) || (P.value = T.value[0]));
      }
    );
    const H = w(() => x.message.subject ?? ""), ee = w(() => x.message.preview_text ?? ""), J = w(() => gd(H.value)), ge = w(() => fd(ee.value)), S = w(() => ht(H.value)), $ = w(() => ht(ee.value)), L = w(() => {
      const v = x.message.blocks;
      return Array.isArray(v) && v.length > 0 ? v : [i("paragraph")];
    });
    Be(
      () => x.message.blocks,
      (v) => {
        (!Array.isArray(v) || v.length === 0) && I("update", { blocks: [i("paragraph")] });
      },
      { immediate: !0 }
    );
    function ne(v) {
      I("update", { blocks: v });
    }
    function j(v) {
      I("update", { subject: v.target.value });
    }
    function he(v) {
      const l = v.target.value;
      I("update", { preview_text: l || void 0 });
    }
    function fe(v) {
      I("update", { from_name: v.target.value || void 0 });
    }
    function ve(v) {
      I("update", { from_address: v.target.value || void 0 });
    }
    function pe(v) {
      I("update", { reply_to: v.target.value || void 0 });
    }
    const le = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [i("heading"), i("paragraph"), i("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [i("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [i("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [i("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [i("social"), i("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [i("footer"), i("link_list")]
      }
    ];
    function ye(v) {
      const l = v.blocks();
      ne([...L.value, ...l]);
    }
    function z(v) {
      const l = [...L.value, i(v)];
      ne(l);
    }
    function be(v) {
      ne(L.value.filter((l) => l.id !== v));
    }
    function oe(v, l) {
      const t = L.value.findIndex((E) => E.id === v);
      if (t < 0) return;
      const V = l === "up" ? t - 1 : t + 1;
      if (V < 0 || V >= L.value.length) return;
      const r = [...L.value];
      [r[t], r[V]] = [r[V], r[t]], ne(r);
    }
    function C(v, l) {
      const t = L.value.map((V) => V.id === v ? { ...V, ...l } : V);
      ne(t);
    }
    function ke(v, l, t) {
      const V = L.value.find((E) => E.id === v);
      if (!V || V.type !== "list") return;
      const r = [...V.items || []];
      r[l] = t, C(v, { items: r });
    }
    function U(v) {
      const l = L.value.find((t) => t.id === v);
      !l || l.type !== "list" || C(v, { items: [...l.items || [], "New item"] });
    }
    function g(v, l) {
      const t = L.value.find((r) => r.id === v);
      if (!t || t.type !== "list") return;
      const V = (t.items || []).filter((r, E) => E !== l);
      C(v, { items: V });
    }
    function de(v, l, t, V) {
      const r = L.value.find((O) => O.id === v);
      if (!r || r.type !== "social") return;
      const E = (r.links || []).map((O, Ie) => Ie === l ? { ...O, [t]: V } : O);
      C(v, { links: E });
    }
    function me(v) {
      const l = L.value.find((t) => t.id === v);
      !l || l.type !== "social" || C(v, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function Ae(v, l) {
      const t = L.value.find((r) => r.id === v);
      if (!t || t.type !== "social") return;
      const V = (t.links || []).filter((r, E) => E !== l);
      C(v, { links: V });
    }
    function we(v, l, t, V) {
      const r = L.value.find((O) => O.id === v);
      if (!r || r.type !== "link_list") return;
      const E = (r.links || []).map((O, Ie) => Ie === l ? { ...O, [t]: V } : O);
      C(v, { links: E });
    }
    function R(v) {
      const l = L.value.find((t) => t.id === v);
      !l || l.type !== "link_list" || C(v, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function ae(v, l) {
      const t = L.value.find((r) => r.id === v);
      if (!t || t.type !== "link_list") return;
      const V = (t.links || []).filter((r, E) => E !== l);
      C(v, { links: V });
    }
    function f(v, l) {
      const t = L.value.find((Me) => Me.id === v);
      if (!t || t.type !== "columns") return;
      const V = ` {{ ${P.value} }}`, r = x.message.variables ?? [], E = Array.from(/* @__PURE__ */ new Set([...r, P.value])), O = l === "left" ? "leftContent" : "rightContent", Ke = (t[O] ?? "") + V;
      C(v, { [O]: Ke }), I("update", { variables: E });
    }
    function A(v, l) {
      const t = L.value.find((V) => V.id === v);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const V = [...t.cells || []];
          for (; V.length < l.columnCount; ) V.push("Cell content");
          l.cells = V.slice(0, l.columnCount);
        }
        C(v, l);
      }
    }
    function D(v, l, t) {
      const V = L.value.find((E) => E.id === v);
      if (!V || V.type !== "row") return;
      const r = [...V.cells || []];
      r[l] = t, C(v, { cells: r });
    }
    function ue(v, l, t, V) {
      const r = L.value.find((O) => O.id === v);
      if (!r || r.type !== "navbar") return;
      const E = (r.links || []).map((O, Ie) => Ie === l ? { ...O, [t]: V } : O);
      C(v, { links: E });
    }
    function ce(v) {
      const l = L.value.find((t) => t.id === v);
      !l || l.type !== "navbar" || C(v, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function F(v, l) {
      const t = L.value.find((V) => V.id === v);
      !t || t.type !== "navbar" || C(v, { links: (t.links || []).filter((V, r) => r !== l) });
    }
    function W(v, l, t, V) {
      const r = L.value.find((O) => O.id === v);
      if (!r || r.type !== "accordion") return;
      const E = (r.items || []).map((O, Ie) => Ie === l ? { ...O, [t]: V } : O);
      C(v, { items: E });
    }
    function Q(v) {
      const l = L.value.find((t) => t.id === v);
      !l || l.type !== "accordion" || C(v, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function Se(v, l) {
      const t = L.value.find((V) => V.id === v);
      !t || t.type !== "accordion" || C(v, { items: (t.items || []).filter((V, r) => r !== l) });
    }
    function M(v, l, t, V) {
      const r = L.value.find((O) => O.id === v);
      if (!r || r.type !== "carousel") return;
      const E = (r.slides || []).map((O, Ie) => Ie === l ? { ...O, [t]: V } : O);
      C(v, { slides: E });
    }
    function y(v) {
      const l = L.value.find((t) => t.id === v);
      !l || l.type !== "carousel" || C(v, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function te(v, l) {
      const t = L.value.find((V) => V.id === v);
      !t || t.type !== "carousel" || C(v, { slides: (t.slides || []).filter((V, r) => r !== l) });
    }
    function Y(v) {
      const l = ` {{ ${P.value} }}`, t = x.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...t, P.value]));
      v === "subject" ? I("update", {
        subject: (H.value || "") + l,
        variables: V
      }) : I("update", {
        preview_text: (ee.value || "") + l,
        variables: V
      });
    }
    function B(v) {
      const l = L.value.find((Me) => Me.id === v);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const t = ` {{ ${P.value} }}`, V = x.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...V, P.value])), E = (l.type === "footer", "content"), Ie = (l[E] ?? "") + t, Ke = L.value.map(
        (Me) => Me.id === v ? { ...Me, [E]: Ie } : Me
      );
      I("update", { blocks: Ke, variables: r });
    }
    function m(v, l) {
      const t = L.value.find((Ie) => Ie.id === v);
      if (!t || t.type !== "row") return;
      const V = ` {{ ${P.value} }}`, r = x.message.variables ?? [], E = Array.from(/* @__PURE__ */ new Set([...r, P.value])), O = [...t.cells || []];
      O[l] = (O[l] || "") + V, C(v, { cells: O }), I("update", { variables: E });
    }
    function h() {
      const v = q.value.trim();
      !v || T.value.includes(v) || (T.value = [...T.value, v], P.value = v, q.value = "");
    }
    return (v, l) => (s(), n("section", _d, [
      e("div", wd, [
        e("div", $d, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => v.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", xd, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: a.message.from_name ?? "",
            onInput: fe
          }, null, 40, Sd)
        ]),
        e("div", Cd, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: a.message.from_address ?? "",
            onInput: ve
          }, null, 40, Id)
        ]),
        e("div", Bd, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            X("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: a.message.reply_to ?? "",
            onInput: pe
          }, null, 40, Ad)
        ]),
        e("div", Ld, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Ud, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: H.value,
              onInput: j
            }, null, 40, Rd),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (t) => Y("subject")),
              title: "Insert variable"
            }, b(Ue))
          ]),
          e("span", {
            class: $e(["em-analyzer", `em-analyzer--${J.value}`])
          }, b(d(hd)(J.value)), 3),
          S.value.length ? (s(), n("span", Td, "Spammy: " + b(S.value.join(", ")), 1)) : _("", !0)
        ]),
        e("div", Pd, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            X("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Vd, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: ee.value,
              onInput: he
            }, null, 40, Ed),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (t) => Y("preview")),
              title: "Insert variable"
            }, b(Ue))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: $e(["em-analyzer", `em-analyzer--${ge.value}`])
          }, b(d(kd)(ge.value)), 3),
          $.value.length ? (s(), n("span", Md, "Spammy: " + b($.value.join(", ")), 1)) : _("", !0)
        ])
      ]),
      e("div", Nd, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Od, [
          (s(), n(K, null, G(le, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (V) => ye(t)
          }, b(t.label), 9, Dd)), 64))
        ])
      ]),
      e("div", Wd, [
        l[63] || (l[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[64] || (l[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Hd, [
          (s(!0), n(K, null, G(L.value, (t, V) => (s(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Fd, [
              e("span", qd, b(t.type), 1),
              e("div", jd, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: V === 0,
                  onClick: (r) => oe(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Kd),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: V === L.value.length - 1,
                  onClick: (r) => oe(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Yd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => be(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Jd)
              ])
            ]),
            t.type === "heading" ? (s(), n("div", Gd, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (r) => C(t.id, { level: Number(r.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Xd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (r) => C(t.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, Qd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => B(t.id)
              }, b(Ue), 8, Zd)
            ])) : t.type === "paragraph" ? (s(), n("div", eu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => C(t.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, tu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => B(t.id)
              }, b(Ue), 8, au)
            ])) : t.type === "image" ? (s(), n("div", su, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (r) => C(t.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, nu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => C(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, lu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (r) => C(t.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, ou)
            ])) : t.type === "button" ? (s(), n("div", iu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (r) => C(t.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, ru),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (r) => C(t.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, du),
              e("div", uu, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (r) => C(t.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, cu)
              ]),
              e("label", pu, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (r) => C(t.id, { ghost: r.target.checked })
                }, null, 40, mu),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (s(), n("div", vu, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (r) => C(t.id, { height: Number(r.target.value) || 24 })
              }, null, 40, bu),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (s(), n("div", gu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => C(t.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, fu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (r) => C(t.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, yu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (r) => C(t.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, hu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => B(t.id)
              }, b(Ue), 8, ku)
            ])) : t.type === "list" ? (s(), n("div", _u, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (r) => C(t.id, { style: r.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, wu),
              e("div", $u, [
                (s(!0), n(K, null, G(t.items || [], (r, E) => (s(), n("div", {
                  key: E,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (O) => ke(t.id, E, O.target.value),
                    placeholder: `Item ${E + 1}`
                  }, null, 40, xu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => g(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Su)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => U(t.id)
              }, "+ Add item", 8, Cu)
            ])) : t.type === "quote" ? (s(), n("div", Iu, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => C(t.id, { style: r.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Bu),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => C(t.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Au),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => B(t.id)
              }, b(Ue), 8, Lu)
            ])) : t.type === "social" ? (s(), n("div", Uu, [
              e("div", Ru, [
                (s(!0), n(K, null, G(t.links || [], (r, E) => (s(), n("div", {
                  key: E,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (O) => de(t.id, E, "platform", O.target.value)
                  }, [...l[45] || (l[45] = [
                    Ne('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, Tu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (O) => de(t.id, E, "url", O.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Pu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => Ae(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Vu)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => me(t.id)
              }, "+ Add link", 8, Eu)
            ])) : t.type === "video" ? (s(), n("div", Mu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (r) => C(t.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Nu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (r) => C(t.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Ou),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => C(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Du)
            ])) : t.type === "link_list" ? (s(), n("div", Wu, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => C(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Hu),
              e("div", zu, [
                (s(!0), n(K, null, G(t.links || [], (r, E) => (s(), n("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (O) => we(t.id, E, "text", O.target.value),
                    placeholder: "Label"
                  }, null, 40, Fu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (O) => we(t.id, E, "url", O.target.value),
                    placeholder: "URL"
                  }, null, 40, qu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => ae(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, ju)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => R(t.id)
              }, "+ Add link", 8, Ku)
            ])) : t.type === "columns" ? (s(), n("div", Yu, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (r) => C(t.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Ju),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id, "left")
              }, b(Ue), 8, Gu),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (r) => C(t.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Xu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id, "right")
              }, b(Ue), 8, Qu)
            ])) : t.type === "divider" ? (s(), n("div", Zu, [
              e("div", ec, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (r) => C(t.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, tc),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", ac, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (r) => C(t.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, sc)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => C(t.id, { lineStyle: r.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, nc)
            ])) : t.type === "row" ? (s(), n("div", lc, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => A(t.id, { columnCount: Number(r.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, oc),
              (s(!0), n(K, null, G(t.cells || [], (r, E) => (s(), n("div", {
                key: E,
                class: "em-row-cell"
              }, [
                e("label", ic, "Column " + b(E + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (O) => D(t.id, E, O.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, rc),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (O) => m(t.id, E)
                }, b(Ue), 8, dc)
              ]))), 128))
            ])) : t.type === "navbar" ? (s(), n("div", uc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => C(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, cc),
              e("div", pc, [
                (s(!0), n(K, null, G(t.links || [], (r, E) => (s(), n("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (O) => ue(t.id, E, "text", O.target.value),
                    placeholder: "Label"
                  }, null, 40, mc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (O) => ue(t.id, E, "url", O.target.value),
                    placeholder: "URL"
                  }, null, 40, vc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => F(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, bc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ce(t.id)
              }, "+ Add link", 8, gc)
            ])) : t.type === "accordion" ? (s(), n("div", fc, [
              (s(!0), n(K, null, G(t.items || [], (r, E) => (s(), n("div", {
                key: E,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (O) => W(t.id, E, "title", O.target.value),
                  placeholder: "Section title"
                }, null, 40, yc),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (O) => W(t.id, E, "content", O.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, hc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (O) => Se(t.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, kc)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => Q(t.id)
              }, "+ Add section", 8, _c)
            ])) : t.type === "carousel" ? (s(), n("div", wc, [
              (s(!0), n(K, null, G(t.slides || [], (r, E) => (s(), n("div", {
                key: E,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (O) => M(t.id, E, "imageUrl", O.target.value),
                  placeholder: "Image URL"
                }, null, 40, $c),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (O) => M(t.id, E, "alt", O.target.value),
                  placeholder: "Alt text"
                }, null, 40, xc),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (O) => M(t.id, E, "linkUrl", O.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Sc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (O) => te(t.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Cc)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => y(t.id)
              }, "+ Add slide", 8, Ic)
            ])) : t.type === "countdown" ? (s(), n("div", Bc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (r) => C(t.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Ac),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (r) => C(t.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Lc),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (s(), n("div", Uc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => C(t.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Rc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (r) => C(t.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, Tc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (r) => C(t.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Pc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (r) => C(t.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Vc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (r) => C(t.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Ec)
            ])) : t.type === "liquid" ? (s(), n("div", Mc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => C(t.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Nc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => B(t.id)
              }, b(Ue), 8, Oc),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (s(), n("div", Dc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => C(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Wc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => C(t.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Hc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => B(t.id)
              }, b(Ue), 8, zc),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (s(), n("div", Fc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (r) => C(t.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, qc),
              e("div", jc, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (r) => C(t.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, Kc)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (s(), n("div", Yc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => C(t.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, Jc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => C(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, Gc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (r) => C(t.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Xc)
            ])) : _("", !0),
            u.includes(t.type) ? (s(), n("div", Qc, [
              l[61] || (l[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: t.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (r) => C(t.id, { alignment: r.target.value })
              }, [...l[59] || (l[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, Zc),
              e("label", ep, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (r) => C(t.id, { fullWidth: r.target.checked })
                }, null, 40, tp),
                l[60] || (l[60] = e("span", null, "Full width", -1))
              ])
            ])) : _("", !0)
          ], 8, zd))), 128))
        ]),
        e("div", ap, [
          l[62] || (l[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", sp, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (t) => z("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (t) => z("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (t) => z("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => z("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => z("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => z("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => z("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => z("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => z("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => z("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => z("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => z("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => z("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => z("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => z("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => z("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => z("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => z("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => z("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => z("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => z("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => z("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => z("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", np, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", lp, [
          l[65] || (l[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", op, [
            Re(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => P.value = t),
              class: "em-select em-select--flex"
            }, [
              (s(!0), n(K, null, G(T.value, (t) => (s(), n("option", {
                key: t,
                value: t
              }, b(t), 9, ip))), 128))
            ], 512), [
              [Oe, P.value]
            ])
          ])
        ]),
        e("div", rp, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", dp, [
            Re(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => q.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [et, q.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: h
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), cp = /* @__PURE__ */ xe(up, [["__scopeId", "data-v-c4398c5d"]]), pp = { class: "keos-email-builder" }, mp = { class: "kb-builder-top" }, vp = { style: { margin: 0, paddingLeft: "1.25rem" } }, bp = { class: "kb-email-layout" }, gp = { class: "kb-email-sidebar" }, fp = {
  key: 0,
  class: "kb-email-form"
}, yp = { class: "kb-email-form-head" }, hp = { class: "kb-email-form-head-top" }, kp = { class: "kb-email-health-pill" }, _p = { class: "kb-wa-form-head-row" }, wp = ["value"], $p = { class: "kb-email-health" }, xp = { class: "kb-email-health-row" }, Sp = { class: "kb-email-health-value" }, Cp = { class: "kb-email-health-bar" }, Ip = { class: "kb-email-canvas" }, Bp = {
  key: 0,
  class: "kb-email-test-banner"
}, Ap = { class: "kb-email-preview-chrome" }, Lp = { class: "kb-push-preview-controls" }, Up = { class: "kb-push-preview-as" }, Rp = ["value"], Tp = { class: "kb-preview-status" }, Pp = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Vp = { class: "kb-email-inbox-strip" }, Ep = { class: "kb-email-inbox-from" }, Mp = { class: "kb-email-inbox-from-name" }, Np = { class: "kb-email-inbox-from-addr" }, Op = { class: "kb-email-inbox-subject" }, Dp = ["title"], Wp = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Hp = { class: "kb-email-body-canvas" }, zp = ["innerHTML"], Fp = { class: "kb-email-actions" }, qp = {
  key: 0,
  class: "kb-actions-note"
}, jp = { class: "kb-email-actions-right" }, Kp = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Yp = { class: "kb-confirm-dialog" }, Jp = { class: "kb-confirm-actions" }, Gp = /* @__PURE__ */ _e({
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
    function c(M) {
      if (!Array.isArray(M) || M.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const y = (m) => String(m).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), te = [
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
      ], Y = (m, h) => {
        if (!te.includes(h.type)) return m;
        const N = h.alignment || "left", v = !!h.fullWidth;
        return `<div style="text-align:${N};${v ? "width:100%;" : ""}">${m}</div>`;
      }, B = [];
      for (const m of M)
        switch (m.type) {
          case "heading": {
            const h = Math.min(3, Math.max(1, Number(m.level) || 1)), N = y(m.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            B.push(
              Y(
                `<h${h} style="margin:0 0 12px;font-size:${h === 1 ? "22" : h === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${N || "Heading"}</h${h}>`,
                m
              )
            );
            break;
          }
          case "paragraph": {
            const h = y(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            B.push(
              Y(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${h || "Paragraph"}</p>`,
                m
              )
            );
            break;
          }
          case "image": {
            const h = (m.src || "").trim(), N = y(m.alt || ""), v = (m.linkUrl || "").trim(), t = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", V = h ? `<img src="${y(h)}" alt="${N}" style="${t}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            B.push(
              Y(
                `<div style="margin:0 0 12px;">${v ? `<a href="${y(v)}" style="color:#2563eb;">${V}</a>` : V}</div>`,
                m
              )
            );
            break;
          }
          case "button": {
            const h = y(m.text || "Button"), N = (m.url || "#").trim(), v = Math.min(24, Math.max(0, Number(m.borderRadius) ?? 8)), l = !!m.fullWidth, t = !!m.ghost, V = t ? "transparent" : "#0f172a", r = t ? "#0f172a" : "#fff", E = t ? "2px solid #0f172a" : "none", O = l ? "block" : "inline-block", Ie = l ? "100%" : "auto";
            B.push(
              Y(
                `<p style="margin:0 0 12px;"><a href="${y(N)}" style="display:${O};width:${Ie};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${V};color:${r};border:${E};text-decoration:none;font-size:14px;font-weight:600;border-radius:${v}px;overflow-wrap:anywhere;">${h}</a></p>`,
                m
              )
            );
            break;
          }
          case "divider": {
            const h = Math.min(8, Math.max(1, Number(m.thickness) || 1)), N = (m.color || "#e2e8f0").trim() || "#e2e8f0", v = m.lineStyle || "solid";
            B.push(
              Y(
                `<hr style="margin:16px 0;border:0;border-top:${h}px ${v} ${N};" />`,
                m
              )
            );
            break;
          }
          case "spacer": {
            const h = Math.min(120, Math.max(8, Number(m.height) || 24));
            B.push(Y(`<div style="height:${h}px;"></div>`, m));
            break;
          }
          case "footer": {
            const h = y(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), N = (m.unsubscribeUrl || "").trim(), v = y(m.companyAddress || "");
            B.push(
              Y(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${h || "Footer"}` + (N ? `<p style="margin:8px 0 0;"><a href="${y(N)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (v ? `<p style="margin:4px 0 0;">${v}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "list": {
            const h = m.style === "numbered" ? "ol" : "ul", v = (Array.isArray(m.items) ? m.items : []).map(
              (l) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${y(String(l)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            B.push(
              Y(
                `<${h} style="margin:0 0 12px;padding-left:24px;">${v || "<li>Item</li>"}</${h}>`,
                m
              )
            );
            break;
          }
          case "quote": {
            const h = y(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), N = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, v = N[m.style || "default"] || N.default;
            B.push(
              Y(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${v}font-size:14px;line-height:1.6;">${h || "Quote"}</div>`,
                m
              )
            );
            break;
          }
          case "social": {
            const N = (Array.isArray(m.links) ? m.links : []).filter((v) => (v.url || "").trim());
            if (N.length === 0)
              B.push(
                Y(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  m
                )
              );
            else {
              const v = (l) => `<a href="${y((l.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${y(l.platform || "Link")}</a>`;
              B.push(
                Y(
                  `<div style="margin:0 0 12px;">${N.map(v).join("")}</div>`,
                  m
                )
              );
            }
            break;
          }
          case "video": {
            const h = (m.thumbnailUrl || "").trim(), N = (m.videoUrl || "#").trim(), v = y(m.caption || ""), t = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", V = h ? `<img src="${y(h)}" alt="Video" style="${t}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            B.push(
              Y(
                `<div style="margin:0 0 12px;"><a href="${y(N)}" style="display:block;color:inherit;">${V}</a>` + (v ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${v}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "link_list": {
            const h = Array.isArray(m.links) ? m.links : [], N = y(m.separator || " | "), l = h.filter(
              (t) => (t.text || t.url) && (t.url || "").trim()
            ).map(
              (t) => `<a href="${y((t.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${y(t.text || "Link")}</a>`
            );
            B.push(
              Y(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${l.join(N)}</p>`,
                m
              )
            );
            break;
          }
          case "columns": {
            const h = y(m.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), N = y(m.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            B.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${h || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${N || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const h = Math.min(4, Math.max(1, Number(m.columnCount) || 2)), N = Array.isArray(m.cells) ? m.cells.slice(0, h) : [], v = 100 / h, l = Array.from({ length: h }, (t, V) => {
              const r = N[V] ?? "", E = y(r).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${v}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${E || "—"}</td>`;
            }).join("");
            B.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${l}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const h = Array.isArray(m.links) ? m.links : [], N = y(m.separator || " | "), l = h.filter(
              (t) => (t.text || t.url) && (t.url || "").trim()
            ).map(
              (t) => `<a href="${y((t.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${y(t.text || "Link")}</a>`
            );
            B.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${l.length ? l.join(N) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const N = (Array.isArray(m.items) ? m.items : []).map((v) => {
              const l = y(v.title || "Section"), t = y(v.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${l}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${t}</div></details>`;
            }).join("");
            B.push(
              N ? `<div style="margin:0 0 12px;">${N}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const N = (Array.isArray(m.slides) ? m.slides : []).filter(
              (v) => (v.imageUrl || "").trim()
            );
            if (N.length === 0)
              B.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const v = N[0], l = `<img src="${y(v.imageUrl)}" alt="${y(v.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, t = (v.linkUrl || "").trim();
              B.push(
                `<div style="margin:0 0 12px;">${t ? `<a href="${y(t)}">${l}</a>` : l}` + (N.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${N.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const h = y(m.label || "Offer ends in"), N = m.endDateTime ? new Date(m.endDateTime).toLocaleString() : "—";
            B.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${h}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${N}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const h = (m.imageUrl || "").trim(), N = y(m.title || "Product"), v = y(m.price || ""), l = y(m.buttonText || "Buy now"), t = (m.buttonUrl || "#").trim(), V = h ? `<img src="${y(h)}" alt="${y(m.alt || N)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            B.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${V}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${N}</p>` + (v ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${v}</p>` : "") + `<a href="${y(t)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${l}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const h = y((m.content || "").trim());
            B.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${h || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const h = (m.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), N = y((m.caption || "").trim());
            B.push(
              '<div style="margin:0 0 12px;">' + (N ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${N}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${h || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const h = (m.feedUrl || "").trim(), N = Math.min(20, Math.max(1, Number(m.maxItems) ?? 5));
            B.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (h ? `<p style="margin:0;font-size:12px;color:#64748b;">${y(h)} · max ${N} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const h = (m.imageUrl || "").trim(), N = (m.fallbackUrl || "").trim(), v = y(m.alt || "Dynamic image");
            h ? B.push(
              `<div style="margin:0 0 12px;"><img src="${y(h)}" alt="${v}" style="max-width:100%;height:auto;display:block;border:0;" />` + (N ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${y(N)}</p>` : "") + "</div>"
            ) : B.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return B.join("");
    }
    const p = a, u = o, {
      campaign: i,
      dirty: x,
      customValidatorErrors: I,
      getValidationWithWarnings: k,
      update: T,
      updateMessage: P,
      undo: q,
      redo: H,
      canUndo: ee,
      canRedo: J,
      resetMessage: ge,
      hooks: S
    } = Fe({
      initial: p.modelValue,
      hooks: {
        ...p.hooks,
        customValidators: async (M) => {
          var B, m, h;
          const y = [];
          (B = M.name) != null && B.trim() || y.push("Template name is required");
          const te = M.message;
          (m = te == null ? void 0 : te.subject) != null && m.trim() || y.push("Subject is required");
          const Y = (h = p.hooks) != null && h.customValidators ? await p.hooks.customValidators(M) : [];
          return [...y, ...Y];
        }
      },
      onDirty: () => u("change", i.value)
    }), { lastSavedAt: $ } = qe(i, { channel: "email" });
    function L(M) {
      (M.metaKey || M.ctrlKey) && M.key === "z" && (M.preventDefault(), M.shiftKey ? H() : q());
    }
    De(() => {
      window.addEventListener("keydown", L);
    }), We(() => {
      window.removeEventListener("keydown", L);
    }), Be(i, (M) => u("update:modelValue", M), { deep: !0 });
    const ne = se(), j = se(!0);
    async function he() {
      if (S.estimateReach)
        try {
          ne.value = await S.estimateReach(i.value.audience);
        } catch {
          ne.value = void 0;
        }
      S.canSend && (j.value = await Promise.resolve(S.canSend()));
    }
    he(), Be(() => i.value.audience, he, { deep: !0 });
    const fe = w(() => (I.value, k(ne.value))), ve = w(() => fe.value.blockingErrors), pe = w(() => fe.value.warnings), le = w(() => fe.value.valid), ye = w(() => {
      var Y, B, m;
      const M = i.value.message, y = [
        !!((Y = i.value.name) != null && Y.trim()),
        !!((B = M.subject) != null && B.trim()),
        !!((m = M.from_address) != null && m.trim()),
        !!(Array.isArray(M.blocks) ? M.blocks.length : (M.html ?? "").trim().length),
        !!i.value.template_type
      ], te = y.filter(Boolean).length;
      return Math.round(te / y.length * 100);
    }), z = w(() => ye.value >= 90 ? "Production ready" : ye.value >= 70 ? "Strong draft" : ye.value >= 40 ? "In progress" : "Needs setup"), be = w(
      () => i.value.template_type ?? "transactional"
    ), oe = se(""), C = se(!1), ke = se(null), U = w(() => {
      const M = oe.value;
      return M ? Ee.find((y) => y.id === M) ?? null : null;
    });
    function g(M) {
      const y = i.value, te = M.campaign.message ? { ...y.message, ...M.campaign.message } : y.message;
      T({
        ...M.campaign,
        message: te
      }), ke.value = null, C.value = !1;
    }
    function de(M) {
      const y = M.target.value;
      if (!y) return;
      const te = pt.find((Y) => Y.id === y);
      te && (x.value ? (ke.value = te, C.value = !0) : g(te), M.target.value = "");
    }
    function me(M) {
      T({ template_type: M });
    }
    function Ae(M) {
      T({
        name: M,
        tracking: { ...i.value.tracking ?? {}, campaign_name: M }
      });
    }
    const we = w(
      () => i.value.message.subject ?? ""
    ), R = w(
      () => i.value.message.preview_text ?? ""
    ), ae = w(
      () => i.value.message.html ?? ""
    ), f = w(
      () => i.value.message.from_name ?? "Your App"
    ), A = w(
      () => i.value.message.from_address ?? "notifications@example.com"
    ), D = w(
      () => i.value.message.blocks ?? []
    ), ue = w(() => {
      const M = D.value;
      if (Array.isArray(M) && M.length > 0)
        return c(M);
      const y = ae.value;
      return y && y.trim() ? y : c([]);
    }), ce = w(() => {
      const M = we.value;
      return U.value ? Pe(M, U.value.data) : M;
    }), F = w(() => {
      const M = R.value;
      return U.value ? Pe(M, U.value.data) : M;
    }), W = w(() => {
      const M = ue.value;
      return U.value ? Pe(M, U.value.data) : M;
    }), Q = se("desktop");
    function Se() {
      le.value && u("save", i.value);
    }
    return (M, y) => (s(), n("div", pp, [
      e("div", mp, [
        Ce(je, {
          "campaign-name": d(i).name,
          status: d(i).status,
          dirty: d(x),
          "last-saved-at": d($),
          "can-undo": d(ee),
          "can-redo": d(J),
          "slugify-name": p.enforceSlugName,
          "onUpdate:campaignName": Ae,
          onUndo: d(q),
          onRedo: d(H)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: d(ie).dangerBg,
            border: `1px solid ${d(ie).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[16]}px ${d(Z)[24]}px`,
            marginBottom: `${d(Z)[24]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: d(ie).danger })
          }, [
            (s(!0), n(K, null, G(ve.value, (te) => (s(), n("li", {
              key: te.message
            }, b(te.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        pe.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: d(ie).neutral.bg,
            border: `1px solid ${d(ie).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Z)[16]}px ${d(Z)[24]}px`,
            marginBottom: `${d(Z)[24]}px`,
            fontSize: "0.875rem",
            color: d(ie).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${d(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", vp, [
            (s(!0), n(K, null, G(pe.value, (te) => (s(), n("li", {
              key: te.message
            }, b(te.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", bp, [
        e("aside", gp, [
          a.disabledSections.includes("email") ? _("", !0) : (s(), n("div", fp, [
            e("div", yp, [
              e("div", hp, [
                y[8] || (y[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                e("span", kp, b(z.value), 1)
              ]),
              e("div", _p, [
                Ce(lt, {
                  "template-type": be.value,
                  onUpdate: me
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: de
                }, [
                  y[9] || (y[9] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, G(d(pt), (te) => (s(), n("option", {
                    key: te.id,
                    value: te.id
                  }, b(te.label), 9, wp))), 128))
                ], 32)
              ]),
              e("div", $p, [
                e("div", xp, [
                  y[10] || (y[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                  e("span", Sp, b(ye.value) + "%", 1)
                ]),
                e("div", Cp, [
                  e("span", {
                    class: "kb-email-health-fill",
                    style: re({ width: `${ye.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ce(cp, {
              message: d(i).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: d(P),
              onReset: y[0] || (y[0] = (te) => d(ge)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Ip, [
          !a.designOnly && d(i).audience.test_mode ? (s(), n("div", Bp, [...y[11] || (y[11] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Ap, [
            e("div", Lp, [
              e("label", Up, [
                y[13] || (y[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": y[1] || (y[1] = (te) => oe.value = te),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  y[12] || (y[12] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, G(d(Ee), (te) => (s(), n("option", {
                    key: te.id,
                    value: te.id
                  }, b(te.label), 9, Rp))), 128))
                ], 512), [
                  [Oe, oe.value]
                ])
              ]),
              e("div", Tp, [
                y[14] || (y[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                e("strong", null, b(Q.value), 1)
              ])
            ]),
            e("div", Pp, [
              e("button", {
                type: "button",
                class: $e(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Q.value === "desktop"
                }]),
                onClick: y[2] || (y[2] = (te) => Q.value = "desktop")
              }, [...y[15] || (y[15] = [
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
                class: $e(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Q.value === "mobile"
                }]),
                onClick: y[3] || (y[3] = (te) => Q.value = "mobile")
              }, [...y[16] || (y[16] = [
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
              class: $e(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": Q.value === "mobile"
              }])
            }, [
              e("div", Vp, [
                e("div", Ep, [
                  e("span", Mp, b(f.value), 1),
                  e("span", Np, "<" + b(A.value) + ">", 1)
                ]),
                e("div", Op, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: ce.value || "No subject"
                  }, b(ce.value || "No subject"), 9, Dp),
                  F.value ? (s(), n("span", Wp, " — " + b(F.value), 1)) : _("", !0)
                ])
              ]),
              e("div", Hp, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: W.value
                }, null, 8, zp)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", Fp, [
        p.actionsNote ? (s(), n("div", qp, b(p.actionsNote), 1)) : _("", !0),
        e("div", jp, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: y[4] || (y[4] = (te) => u("duplicate", JSON.parse(JSON.stringify(d(i)))))
          }, " Duplicate ")) : _("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: Se
          }, " Save ")) : _("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: y[5] || (y[5] = (te) => u("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      C.value ? (s(), n("div", Kp, [
        e("div", Yp, [
          y[17] || (y[17] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          y[18] || (y[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Jp, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: y[6] || (y[6] = (te) => {
                C.value = !1, ke.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: y[7] || (y[7] = (te) => ke.value && g(ke.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), Tt = /* @__PURE__ */ xe(Gp, [["__scopeId", "data-v-843c9792"]]), Xp = { class: "kb-shell" }, Qp = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Zp = ["aria-selected", "onClick"], em = { class: "kb-shell__meta" }, tm = ["href"], am = { class: "kb-shell__body" }, sm = /* @__PURE__ */ _e({
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
    return (u, i) => (s(), n("div", Xp, [
      e("header", {
        class: "kb-shell__header",
        style: re({ padding: `${d(Z)[12]}px ${d(Z)[24]}px`, borderBottom: `1px solid ${d(ie).neutral.border}`, background: d(ie).neutral.bg })
      }, [
        i[0] || (i[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Qp, [
          (s(), n(K, null, G(p, (x) => e("button", {
            key: x.id,
            type: "button",
            class: $e(["kb-shell__channel", { "kb-shell__channel--active": a.channel === x.id }]),
            role: "tab",
            "aria-selected": a.channel === x.id,
            onClick: (I) => c("switch-channel", x.id)
          }, b(x.label), 11, Zp)), 64))
        ]),
        e("div", em, [
          a.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: re({ padding: "2px 8px", borderRadius: `${d(Le).input}px`, fontSize: "0.75rem", background: d(ie).neutral.bg, color: d(ie).neutral.textMuted })
          }, b(a.environment), 5)) : _("", !0),
          a.helpUrl ? (s(), n("a", {
            key: 1,
            href: a.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: re({ color: d(ie).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, tm)) : _("", !0)
        ])
      ], 4),
      e("div", am, [
        Te(u.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), nm = /* @__PURE__ */ xe(sm, [["__scopeId", "data-v-0df30803"]]), lm = {
  class: "kb-outline",
  "aria-label": "Sections"
}, om = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, im = ["onClick"], rm = /* @__PURE__ */ _e({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(a) {
    var i;
    const o = a, c = se(((i = o.items[0]) == null ? void 0 : i.id) ?? "");
    let p = null;
    function u(x) {
      const I = document.getElementById(x);
      I && I.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return De(() => {
      const x = o.scrollContainerId ? document.getElementById(o.scrollContainerId) : document;
      x && (p = new IntersectionObserver(
        (I) => {
          for (const k of I)
            if (k.isIntersecting) {
              const T = k.target.getAttribute("data-outline-id");
              T && (c.value = T);
            }
        },
        { root: x === document ? null : x, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), o.items.forEach((I) => {
        const k = document.getElementById(I.id);
        k && (p == null || p.observe(k));
      }));
    }), We(() => {
      p == null || p.disconnect();
    }), Be(
      () => o.items,
      (x) => {
        x.length && !c.value && (c.value = x[0].id);
      },
      { immediate: !0 }
    ), (x, I) => (s(), n("nav", lm, [
      e("ul", om, [
        (s(!0), n(K, null, G(a.items, (k) => (s(), n("li", {
          key: k.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: $e(["kb-outline__btn", { "kb-outline__btn--active": c.value === k.id }]),
            style: re({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${d(Z)[8]}px ${d(Z)[12]}px`,
              border: "none",
              borderRadius: `${d(Le).input}px`,
              background: c.value === k.id ? d(ie).neutral.bg : "transparent",
              color: c.value === k.id ? "#0f172a" : d(ie).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: c.value === k.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (T) => u(k.id)
          }, b(k.label), 15, im)
        ]))), 128))
      ])
    ]));
  }
}), dm = /* @__PURE__ */ xe(rm, [["__scopeId", "data-v-25c37675"]]), um = ["id"], cm = {
  key: 1,
  class: "kb-form-shell__head"
}, pm = /* @__PURE__ */ _e({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(a) {
    return (o, c) => (s(), n("div", {
      class: "kb-form-shell",
      id: a.sectionId ?? void 0,
      style: re({
        padding: `${d(Z)[24]}px ${d(Z)[24]}px ${d(Z)[32]}px`,
        marginBottom: 0
      })
    }, [
      a.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: re({ marginBottom: d(Z)[24], paddingBottom: d(Z)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: re({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: d(Z)[12] })
        }, b(a.label), 5),
        Te(o.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", cm, [
        Te(o.$slots, "head", {}, void 0, !0)
      ])),
      Te(o.$slots, "default", {}, void 0, !0)
    ], 12, um));
  }
}), mm = /* @__PURE__ */ xe(pm, [["__scopeId", "data-v-6504df41"]]), vm = /* @__PURE__ */ _e({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(a) {
    return (o, c) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: re({
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
      Te(o.$slots, "default")
    ], 4));
  }
}), bm = /* @__PURE__ */ _e({
  __name: "BuilderTopShell",
  setup(a) {
    return (o, c) => (s(), n("div", {
      class: "kb-top-shell",
      style: re({
        marginLeft: d(Z)[24],
        marginRight: d(Z)[24]
      })
    }, [
      Te(o.$slots, "header"),
      Te(o.$slots, "errors"),
      Te(o.$slots, "warnings"),
      Te(o.$slots, "default")
    ], 4));
  }
});
function gm(a) {
  a.component("KeosNotificationBuilder", Lt), a.component("KeosWhatsAppBuilder", Ut), a.component("KeosSmsBuilder", Rt), a.component("KeosEmailBuilder", Tt), a.component("BuilderShell", nm), a.component("BuilderOutline", dm), a.component("BuilderVersionHistoryModal", At), a.component("BuilderFormShell", mm), a.component("BuilderActionsBar", vm), a.component("BuilderTopShell", bm);
}
const ym = {
  install: gm,
  KeosNotificationBuilder: Lt,
  KeosWhatsAppBuilder: Ut,
  KeosSmsBuilder: Rt,
  KeosEmailBuilder: Tt
};
export {
  vm as BuilderActionsBar,
  mm as BuilderFormShell,
  dm as BuilderOutline,
  nm as BuilderShell,
  bm as BuilderTopShell,
  At as BuilderVersionHistoryModal,
  Ee as DEFAULT_SAMPLE_PROFILES,
  Tt as KeosEmailBuilder,
  Lt as KeosNotificationBuilder,
  Rt as KeosSmsBuilder,
  Ut as KeosWhatsAppBuilder,
  ym as default,
  gm as install,
  Pe as renderTemplatePreview,
  qe as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
