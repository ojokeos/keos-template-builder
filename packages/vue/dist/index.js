import { ref as se, watch as Ae, computed as x, defineComponent as we, openBlock as s, createElementBlock as n, normalizeStyle as de, unref as u, createElementVNode as e, Fragment as K, renderList as J, toDisplayString as g, createTextVNode as X, createCommentVNode as k, normalizeClass as xe, withDirectives as Re, vModelSelect as Ne, vModelText as et, vModelCheckbox as Pt, createStaticVNode as Me, withKeys as Vt, onMounted as De, onUnmounted as We, createVNode as Ie, createBlock as Et, withModifiers as Ye, renderSlot as Te } from "vue";
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
}, oe = {
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
oe.neutral.textMuted, oe.neutral.textMeta;
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
}, Ot = ["android", "ios", "web"], kt = "normal", _t = ["low", "normal", "high"], wt = 86400, Mt = [3600, 7200, 86400, 172800], $t = "1.0", Nt = ["topic", "segment", "user_list"];
function tt() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Ot],
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
  return o.schema_version || (o.schema_version = $t), o.audience || (o.audience = tt()), o.message || (o.message = at()), o.delivery || (o.delivery = st()), o.tracking || (o.tracking = nt()), _t.includes(o.delivery.priority) || (o.delivery.priority = kt), o.delivery.ttl === void 0 && (o.delivery.ttl = wt), Nt.includes(o.audience.type) || (o.audience.type = "topic"), o.audience.type === "topic" && !o.audience.topic_name && (o.audience.topic_name = "default"), o;
}
const Wt = 1e5;
function Ht(a, o) {
  var p, i, $;
  const c = [], m = o ?? a.audience.estimated_reach;
  return m !== void 0 && m >= Wt && c.push({
    message: `Estimated reach is very high (${m.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), a.tracking && !((p = a.tracking.campaign_name) != null && p.trim()) && !((i = a.name) != null && i.trim()) && c.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), ($ = a.message.deep_link) != null && $.trim() || c.push({
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
  const c = Ct(a), m = Ht(a, o);
  return {
    valid: c.valid,
    errors: [
      ...c.errors,
      ...m.map((p) => St(p.message, p.severity))
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
  const { title: o, body: c } = a, m = Ve(o || "", He.title), p = Ve(c || "", He.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: a.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated,
    expanded: !1
  };
}
function Kt(a) {
  const { title: o, body: c } = a, m = Ve(o || "", He.title), p = Ve(c || "", He.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: a.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated,
    expanded: !0
  };
}
function Yt(a, o = {}) {
  const c = o.expanded ? Kt(a) : jt(a);
  return o.darkMode !== void 0 && (c.darkMode = o.darkMode), c;
}
const ot = ze.ios;
function It(a) {
  const { title: o, body: c } = a, m = Ve(o || "", ot.title), p = Ve(c || "", ot.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: a.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated,
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
  const { title: o, body: c } = a, m = Ve(o || "", it.title), p = Ve(c || "", it.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: a.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated
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
  ), c = a.hooks ?? {}, m = se(!1), p = se([]);
  Ae(
    o,
    () => {
      if (!c.customValidators) {
        p.value = [];
        return;
      }
      c.customValidators(o.value).then((O) => {
        p.value = O;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const i = se([]), $ = se([]);
  function C() {
    const O = Je(o.value);
    i.value = [...i.value.slice(-19), O], $.value = [];
  }
  const h = x(() => i.value.length > 0), L = x(() => $.value.length > 0);
  function B() {
    i.value.length !== 0 && ($.value = [Je(o.value), ...$.value], o.value = i.value[i.value.length - 1], i.value = i.value.slice(0, -1));
  }
  function F() {
    $.value.length !== 0 && (i.value = [...i.value, Je(o.value)], o.value = $.value[0], $.value = $.value.slice(1));
  }
  Ae(
    o,
    () => {
      var O;
      m.value = !0, (O = a.onDirty) == null || O.call(a);
    },
    { deep: !0 }
  );
  const z = x(() => Ct(o.value));
  function ee(O) {
    const ue = zt(o.value, O), le = Xt(p.value), I = [...Ft(ue), ...le], _e = [...ue.errors, ...le], T = ue.valid && le.length === 0;
    return {
      ...ue,
      errors: _e,
      valid: T,
      blockingErrors: I,
      warnings: qt(ue)
    };
  }
  function G(O) {
    C(), o.value = { ...o.value, ...O };
  }
  function ge(O) {
    C(), o.value = {
      ...o.value,
      audience: { ...o.value.audience, ...O }
    };
  }
  function S(O) {
    C(), o.value = {
      ...o.value,
      message: { ...o.value.message, ...O }
    };
  }
  function _(O) {
    C(), o.value = {
      ...o.value,
      delivery: { ...o.value.delivery, ...O }
    };
  }
  function U(O) {
    C(), o.value = {
      ...o.value,
      tracking: o.value.tracking ? { ...o.value.tracking, ...O } : { campaign_name: "", tags: [], ab_test: !1, ...O }
    };
  }
  function ne(O) {
    C(), o.value = {
      ...o.value,
      message: { ...at(), ...O }
    };
  }
  function q(O) {
    C(), o.value = {
      ...o.value,
      delivery: { ...st(), ...O }
    };
  }
  function ye(O) {
    C(), o.value = {
      ...o.value,
      tracking: { ...nt(), ...O }
    };
  }
  function fe(O) {
    C(), o.value = {
      ...o.value,
      audience: { ...tt(), ...O }
    };
  }
  const ve = x(() => ({
    title: o.value.message.title,
    body: o.value.message.body,
    imageUrl: o.value.message.image_url
  }));
  function me(O, ue) {
    const le = ve.value;
    let I;
    switch (O) {
      case "android":
        I = Yt(le, { expanded: ue == null ? void 0 : ue.expanded });
        break;
      case "ios":
        I = Gt(le);
        break;
      case "web":
        I = rt(le);
        break;
      default:
        I = rt(le);
    }
    const _e = o.value.message.actions ?? [], T = o.value.message.location;
    return { ...I, actions: _e, location: T ?? void 0 };
  }
  const ie = ze;
  async function he() {
    return c.customValidators ? c.customValidators(o.value) : [];
  }
  return {
    campaign: o,
    dirty: m,
    validation: z,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: p,
    getValidationWithWarnings: ee,
    update: G,
    updateAudience: ge,
    updateMessage: S,
    updateDelivery: _,
    updateTracking: U,
    undo: B,
    redo: F,
    canUndo: h,
    canRedo: L,
    resetMessage: ne,
    resetDelivery: q,
    resetTracking: ye,
    resetAudience: fe,
    getPreview: me,
    previewInput: ve,
    characterLimits: ie,
    runCustomValidators: he,
    hooks: c
  };
}
const Qt = "keos-draft", Zt = 2e3;
function ea(a, o) {
  return `${Qt}-${a}-${o}`;
}
function qe(a, o) {
  const c = o.channel, m = x(
    () => {
      var B, F;
      return ea(
        c,
        o.key ?? ((B = a.value) == null ? void 0 : B.id) ?? ((F = a.value) == null ? void 0 : F.name) ?? "draft"
      );
    }
  ), p = se(null);
  let i = null;
  function $() {
    try {
      const B = JSON.stringify(a.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(m.value, B), p.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(m.value);
    } catch {
    }
  }
  function h() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const B = window.localStorage.getItem(m.value);
      if (!B) return null;
      const F = JSON.parse(B);
      return xt(F);
    } catch {
      return null;
    }
  }
  function L() {
    return o.enabled === void 0 ? !0 : typeof o.enabled == "boolean" ? o.enabled : o.enabled.value;
  }
  return Ae(
    a,
    () => {
      L() && (i && clearTimeout(i), i = setTimeout(() => {
        i = null, $();
      }, Zt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: p,
    clearDraft: C,
    getDraft: h,
    persist: $
  };
}
const ta = { class: "kb-header__row" }, aa = ["value"], sa = { class: "kb-header__actions" }, na = ["disabled"], la = ["disabled"], oa = ["value"], ia = ["value"], ra = /* @__PURE__ */ we({
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
    ], m = a, p = o;
    function i(h) {
      return m.slugifyName ? h.trim().replace(/\s+/g, "-") : h;
    }
    function $(h) {
      return h.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function C(h) {
      const L = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return L[h] ?? L.draft;
    }
    return (h, L) => (s(), n("header", {
      class: "kb-header",
      style: de({
        padding: `${u(Z)[16]}px 0`,
        borderBottom: `1px solid ${u(oe).neutral.border}`,
        marginBottom: `${u(Z)[16]}px`
      })
    }, [
      e("div", ta, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: a.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: L[0] || (L[0] = (B) => p("update:campaignName", i(B.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, aa),
        e("div", sa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !a.canUndo,
            onClick: L[1] || (L[1] = (B) => p("undo"))
          }, " Undo ", 8, na),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !a.canRedo,
            onClick: L[2] || (L[2] = (B) => p("redo"))
          }, " Redo ", 8, la)
        ]),
        a.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: a.workflowStatus,
          class: "kb-header__status-select",
          style: de({
            padding: `${u(Z)[4]}px ${u(Z)[8]}px`,
            borderRadius: `${u(Le).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...C(a.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: L[3] || (L[3] = (B) => p("update:workflowStatus", B.target.value))
        }, [
          (s(), n(K, null, J(c, (B) => e("option", {
            key: B.value,
            value: B.value
          }, g(B.label), 9, ia)), 64))
        ], 44, oa)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: de({
            padding: `${u(Z)[4]}px ${u(Z)[8]}px`,
            borderRadius: `${u(Le).input}px`,
            background: u(oe).neutral.bg,
            fontSize: "0.8125rem",
            color: u(oe).neutral.textMuted
          })
        }, g(a.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: de({ fontSize: "0.8125rem", color: u(oe).neutral.textMuted, marginTop: `${u(Z)[4]}px` })
      }, [
        a.saving ? (s(), n(K, { key: 0 }, [
          X("Saving…")
        ], 64)) : a.dirty ? (s(), n(K, { key: 1 }, [
          X("Unsaved changes")
        ], 64)) : a.lastSavedAt ? (s(), n(K, { key: 2 }, [
          X("Last saved at " + g($(a.lastSavedAt)), 1)
        ], 64)) : k("", !0)
      ], 4)
    ], 4));
  }
}), Se = (a, o) => {
  const c = a.__vccOpts || a;
  for (const [m, p] of o)
    c[m] = p;
  return c;
}, je = /* @__PURE__ */ Se(ra, [["__scopeId", "data-v-ef058bcb"]]), da = { class: "kb-section" }, ua = { class: "kb-section__head" }, ca = { class: "kb-section__desc" }, pa = { class: "kb-field" }, ma = { class: "kb-label" }, va = { class: "kb-field-with-rail" }, ba = ["value", "aria-invalid", "aria-describedby"], ga = {
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
}, Aa = { class: "kb-field" }, Ua = { class: "kb-location-row" }, La = ["value"], Ba = ["value"], Ra = ["value"], Ta = ["value"], Pa = { class: "kb-field" }, Va = { class: "kb-actions-list" }, Ea = ["value", "onInput"], Oa = ["value", "onInput"], Ma = ["onClick"], Na = ["disabled"], Da = { class: "kb-action-chips" }, Wa = ["disabled", "onClick"], Ha = /* @__PURE__ */ we({
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
    return (c, m) => {
      var p, i, $, C;
      return s(), n("section", da, [
        e("div", ua, [
          m[10] || (m[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (h) => c.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        e("p", ca, " Message body is required. Title is optional. Character limits depend on the selected platform (" + g(a.selectedPlatform) + "). ", 1),
        e("div", pa, [
          e("label", ma, [
            m[11] || (m[11] = X(" Title ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": a.titleCount > a.titleLimit }])
            }, g(a.titleCount) + "/" + g(a.titleLimit), 3)
          ]),
          e("div", va, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: a.message.title,
              "aria-invalid": !!a.titleError,
              "aria-describedby": a.titleError ? "title-error" : void 0,
              onInput: m[1] || (m[1] = (h) => c.$emit("update", { title: h.target.value }))
            }, null, 40, ba),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: de({ "--pct": Math.min(100, a.titleCount / a.titleLimit * 100) + "%" })
            }, [...m[12] || (m[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.titleError ? (s(), n("p", ga, g(a.titleError), 1)) : k("", !0)
        ]),
        e("div", fa, [
          e("label", ya, [
            m[13] || (m[13] = X(" Message ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": a.bodyCount > a.bodyLimit }])
            }, g(a.bodyCount) + "/" + g(a.bodyLimit), 3)
          ]),
          e("div", ha, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: a.message.body,
              "aria-invalid": !!a.bodyError,
              "aria-describedby": a.bodyError ? "body-error" : void 0,
              onInput: m[2] || (m[2] = (h) => c.$emit("update", { body: h.target.value }))
            }, null, 40, ka),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: de({ "--pct": Math.min(100, a.bodyCount / a.bodyLimit * 100) + "%" })
            }, [...m[14] || (m[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.bodyError ? (s(), n("p", _a, g(a.bodyError), 1)) : k("", !0)
        ]),
        e("div", wa, [
          m[15] || (m[15] = e("label", { class: "kb-label" }, [
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
            onInput: m[3] || (m[3] = (h) => c.$emit("update", { image_url: h.target.value || void 0 }))
          }, null, 40, $a),
          a.imageUrlError ? (s(), n("p", xa, g(a.imageUrlError), 1)) : k("", !0)
        ]),
        e("div", Sa, [
          m[16] || (m[16] = e("label", { class: "kb-label" }, [
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
            onInput: m[4] || (m[4] = (h) => c.$emit("update", { deep_link: h.target.value || void 0 }))
          }, null, 40, Ca),
          a.deepLinkError ? (s(), n("p", Ia, g(a.deepLinkError), 1)) : k("", !0)
        ]),
        e("div", Aa, [
          m[17] || (m[17] = e("label", { class: "kb-label" }, [
            X(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Ua, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((p = a.message.location) == null ? void 0 : p.lat) ?? "",
              onInput: m[5] || (m[5] = (h) => {
                const L = { ...a.message.location ?? {} }, B = h.target.value;
                L.lat = B === "" ? void 0 : Number(B), c.$emit("update", { location: L });
              })
            }, null, 40, La),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((i = a.message.location) == null ? void 0 : i.lon) ?? "",
              onInput: m[6] || (m[6] = (h) => {
                const L = { ...a.message.location ?? {} }, B = h.target.value;
                L.lon = B === "" ? void 0 : Number(B), c.$emit("update", { location: L });
              })
            }, null, 40, Ba)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: (($ = a.message.location) == null ? void 0 : $.name) ?? "",
            onInput: m[7] || (m[7] = (h) => {
              const L = { ...a.message.location ?? {} };
              L.name = h.target.value || void 0, c.$emit("update", { location: L });
            })
          }, null, 40, Ra),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((C = a.message.location) == null ? void 0 : C.address) ?? "",
            onInput: m[8] || (m[8] = (h) => {
              const L = { ...a.message.location ?? {} };
              L.address = h.target.value || void 0, c.$emit("update", { location: L });
            })
          }, null, 40, Ta)
        ]),
        e("div", Pa, [
          m[19] || (m[19] = e("label", { class: "kb-label" }, [
            X(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Va, [
            (s(!0), n(K, null, J(o.message.actions ?? [], (h, L) => (s(), n("div", {
              key: h.id || L,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: h.label,
                onInput: (B) => {
                  var ee;
                  const F = [...o.message.actions ?? []], z = Number(L);
                  F[z] = {
                    ...F[z],
                    id: ((ee = F[z]) == null ? void 0 : ee.id) || `action_${z + 1}`,
                    label: B.target.value
                  }, c.$emit("update", { actions: F });
                }
              }, null, 40, Ea),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: h.url,
                onInput: (B) => {
                  var ee;
                  const F = [...o.message.actions ?? []], z = Number(L);
                  F[z] = {
                    ...F[z],
                    id: ((ee = F[z]) == null ? void 0 : ee.id) || `action_${z + 1}`,
                    url: B.target.value || void 0
                  }, c.$emit("update", { actions: F });
                }
              }, null, 40, Oa),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const B = [...o.message.actions ?? []];
                  B.splice(Number(L), 1), c.$emit("update", { actions: B });
                }
              }, " Remove ", 8, Ma)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (o.message.actions ?? []).length >= 3,
              onClick: m[9] || (m[9] = () => {
                const h = [...o.message.actions ?? []];
                h.push({
                  id: `action_${h.length + 1}`,
                  label: "",
                  url: ""
                }), c.$emit("update", { actions: h });
              })
            }, " Add action ", 8, Na),
            e("div", Da, [
              m[18] || (m[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (s(), n(K, null, J(["View order", "Track shipment", "Open app"], (h) => e("button", {
                key: h,
                type: "button",
                class: "kb-action-chip",
                disabled: (o.message.actions ?? []).length >= 3,
                onClick: () => {
                  const L = [...o.message.actions ?? []];
                  L.push({
                    id: `action_${Date.now()}`,
                    label: h,
                    url: ""
                  }), c.$emit("update", { actions: L });
                }
              }, g(h), 9, Wa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), za = /* @__PURE__ */ Se(Ha, [["__scopeId", "data-v-7bc3a44c"]]), Fa = { class: "kb-section kb-section--inline-personalization" }, qa = { class: "kb-field" }, ja = { class: "kb-insert-row" }, Ka = ["value"], Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = { class: "kb-field" }, Xa = { class: "kb-variable-list" }, Qa = /* @__PURE__ */ we({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(a, { emit: o }) {
    const c = a, m = o, p = ["first_name", "last_name", "order_id", "city"], i = se(c.variableOptions ?? p), $ = se(i.value[0] ?? p[0]), C = se("");
    Ae(
      () => c.variableOptions,
      (F) => {
        F && F.length && (i.value = [...F], i.value.includes($.value) || ($.value = i.value[0]));
      }
    );
    const h = x(() => i.value);
    function L(F) {
      m("insertVariable", { variable: $.value, field: F });
    }
    function B() {
      const F = C.value.trim();
      F && (i.value.includes(F) || (i.value = [...i.value, F]), $.value = F, C.value = "");
    }
    return (F, z) => (s(), n("section", Fa, [
      z[8] || (z[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      z[9] || (z[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", qa, [
        z[4] || (z[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", ja, [
          Re(e("select", {
            "onUpdate:modelValue": z[0] || (z[0] = (ee) => $.value = ee),
            class: "kb-select"
          }, [
            (s(!0), n(K, null, J(h.value, (ee) => (s(), n("option", {
              key: ee,
              value: ee
            }, g(ee), 9, Ka))), 128))
          ], 512), [
            [Ne, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z[1] || (z[1] = (ee) => L("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z[2] || (z[2] = (ee) => L("body"))
          }, "Into message")
        ])
      ]),
      e("div", Ya, [
        z[5] || (z[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ja, [
          Re(e("input", {
            "onUpdate:modelValue": z[3] || (z[3] = (ee) => C.value = ee),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [et, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: B
          }, " Add ")
        ])
      ]),
      e("div", Ga, [
        z[6] || (z[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        z[7] || (z[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Xa, [
          (s(!0), n(K, null, J(h.value, (ee) => (s(), n("li", { key: ee }, [
            e("code", null, "{{ " + g(ee) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), At = /* @__PURE__ */ Se(Qa, [["__scopeId", "data-v-6d49f6dc"]]), Za = { class: "kb-section kb-section--template-type" }, es = { class: "kb-field" }, ts = { class: "kb-radio-group" }, as = { class: "kb-radio" }, ss = ["checked"], ns = { class: "kb-radio" }, ls = ["checked"], os = /* @__PURE__ */ we({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(a, { emit: o }) {
    const c = o;
    return (m, p) => (s(), n("section", Za, [
      p[5] || (p[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      p[6] || (p[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", es, [
        e("div", ts, [
          e("label", as, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: a.templateType === "transactional",
              onChange: p[0] || (p[0] = (i) => c("update", "transactional"))
            }, null, 40, ss),
            p[2] || (p[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", ns, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: a.templateType === "marketing",
              onChange: p[1] || (p[1] = (i) => c("update", "marketing"))
            }, null, 40, ls),
            p[3] || (p[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        p[4] || (p[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), lt = /* @__PURE__ */ Se(os, [["__scopeId", "data-v-991f74e5"]]), is = { class: "kb-section" }, rs = { class: "kb-section__head" }, ds = { class: "kb-section__desc" }, us = { class: "kb-field" }, cs = { class: "kb-radio-group" }, ps = { class: "kb-radio" }, ms = ["checked"], vs = { class: "kb-radio" }, bs = ["checked"], gs = {
  key: 0,
  class: "kb-field kb-row"
}, fs = ["value"], ys = ["value"], hs = { class: "kb-field" }, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Ss = { class: "kb-field" }, Cs = { class: "kb-checkbox" }, Is = ["checked"], As = /* @__PURE__ */ we({
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
    return (c, m) => {
      var p;
      return s(), n("section", is, [
        e("div", rs, [
          m[8] || (m[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (i) => c.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        e("p", ds, g(a.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", us, [
          m[11] || (m[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", cs, [
            e("label", ps, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !a.delivery.scheduled_at,
                onChange: m[1] || (m[1] = (i) => c.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, ms),
              m[9] || (m[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", vs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!a.delivery.scheduled_at,
                onChange: m[2] || (m[2] = (i) => c.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, bs),
              m[10] || (m[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        a.delivery.scheduled_at ? (s(), n("div", gs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (p = a.delivery.scheduled_at) == null ? void 0 : p.slice(0, 16),
            onInput: m[3] || (m[3] = (i) => c.$emit("update", { scheduled_at: i.target.value }))
          }, null, 40, fs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: a.delivery.timezone,
            onInput: m[4] || (m[4] = (i) => c.$emit("update", { timezone: i.target.value }))
          }, null, 40, ys)
        ])) : k("", !0),
        a.showPushOptions ? (s(), n(K, { key: 1 }, [
          e("div", hs, [
            m[12] || (m[12] = e("label", { class: "kb-label" }, [
              X(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.ttl,
              onChange: m[5] || (m[5] = (i) => c.$emit("update", { ttl: Number(i.target.value) }))
            }, [
              (s(!0), n(K, null, J(u(Mt), (i) => (s(), n("option", {
                key: i,
                value: i
              }, g(o[i] ?? i + "s"), 9, _s))), 128))
            ], 40, ks)
          ]),
          e("div", ws, [
            m[13] || (m[13] = e("label", { class: "kb-label" }, [
              X(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.priority,
              onChange: m[6] || (m[6] = (i) => c.$emit("update", { priority: i.target.value }))
            }, [
              (s(!0), n(K, null, J(u(_t), (i) => (s(), n("option", {
                key: i,
                value: i
              }, g(i), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Ss, [
            e("label", Cs, [
              e("input", {
                type: "checkbox",
                checked: a.delivery.quiet_hours,
                onChange: m[7] || (m[7] = (i) => c.$emit("update", { quiet_hours: !a.delivery.quiet_hours }))
              }, null, 40, Is),
              m[14] || (m[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : k("", !0)
      ]);
    };
  }
}), Us = /* @__PURE__ */ Se(As, [["__scopeId", "data-v-a208b72f"]]), Ls = { class: "kb-accordion" }, Bs = { class: "kb-accordion__body" }, Rs = { class: "kb-field" }, Ts = ["value"], Ps = { class: "kb-field" }, Vs = { class: "kb-checkbox" }, Es = ["checked"], Os = /* @__PURE__ */ we({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(a) {
    return (o, c) => (s(), n("details", Ls, [
      c[4] || (c[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Bs, [
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
            onInput: c[0] || (c[0] = (m) => o.$emit("update", { collapse_key: m.target.value || void 0 }))
          }, null, 40, Ts)
        ]),
        e("div", Ps, [
          e("label", Vs, [
            e("input", {
              type: "checkbox",
              checked: a.delivery.silent_push,
              onChange: c[1] || (c[1] = (m) => o.$emit("update", { silent_push: !a.delivery.silent_push }))
            }, null, 40, Es),
            c[3] || (c[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ms = /* @__PURE__ */ Se(Os, [["__scopeId", "data-v-e0f5c559"]]);
function Pe(a, o) {
  return !a || typeof a != "string" ? a : a.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (c, m) => {
    const p = m.trim();
    return p in o ? String(o[p]) : `{{ ${m} }}`;
  });
}
const Ee = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Ns = { class: "kb-preview" }, Ds = {
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
}, Sn = /* @__PURE__ */ we({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(a) {
    const o = a, c = se(!1), m = x(
      () => o.getPreview(o.selectedPlatform, {
        expanded: o.selectedPlatform === "android" ? c.value : void 0
      })
    ), p = x(() => {
      const C = m.value;
      return o.previewProfile ? {
        ...C,
        title: Pe((C == null ? void 0 : C.title) ?? "", o.previewProfile.data),
        body: Pe((C == null ? void 0 : C.body) ?? "", o.previewProfile.data)
      } : C;
    }), i = x(() => {
      var z;
      const C = (z = p.value) == null ? void 0 : z.location;
      if (!C || C.lat == null && C.lon == null) return null;
      const h = Number(C.lat) || 0, L = Number(C.lon) || 0, B = 8e-3, F = [L - B, h - B, L + B, h + B].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(F)}&layer=mapnik&marker=${h},${L}`;
    }), $ = x(() => {
      var h;
      const C = (h = p.value) == null ? void 0 : h.location;
      return C && (C.lat != null || C.lon != null || C.name || C.address);
    });
    return (C, h) => {
      var L, B, F, z, ee, G, ge, S, _, U, ne, q, ye, fe, ve, me;
      return s(), n("div", Ns, [
        a.selectedPlatform === "android" ? (s(), n("div", Ds, [
          e("label", Ws, [
            Re(e("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (ie) => c.value = ie),
              type: "checkbox"
            }, null, 512), [
              [Pt, c.value]
            ]),
            h[1] || (h[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : k("", !0),
        a.selectedPlatform === "android" ? (s(), n("div", Hs, [
          h[4] || (h[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: xe(["kb-android-notification", { "kb-android-notification--expanded": c.value }])
          }, [
            h[3] || (h[3] = Me('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: xe(["kb-android-body", { "kb-android-body--expanded": c.value }])
            }, [
              c.value && p.value.imageUrl ? (s(), n("div", zs, [
                e("img", {
                  src: p.value.imageUrl,
                  alt: ""
                }, null, 8, Fs)
              ])) : k("", !0),
              e("div", qs, [
                e("div", js, [
                  p.value.title ? (s(), n("div", Ks, g(p.value.title), 1)) : k("", !0),
                  p.value.body ? (s(), n("div", Ys, g(p.value.body), 1)) : k("", !0),
                  $.value && !c.value && ((L = p.value.location) != null && L.name || (B = p.value.location) != null && B.address) ? (s(), n("div", Js, [
                    h[2] || (h[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    X(" " + g(((F = p.value.location) == null ? void 0 : F.name) || ((z = p.value.location) == null ? void 0 : z.address)), 1)
                  ])) : k("", !0)
                ]),
                !c.value && p.value.imageUrl ? (s(), n("div", Gs, [
                  e("img", {
                    src: p.value.imageUrl,
                    alt: ""
                  }, null, 8, Xs)
                ])) : k("", !0)
              ]),
              $.value && i.value && c.value ? (s(), n("div", Qs, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Zs),
                (ee = p.value.location) != null && ee.name || (G = p.value.location) != null && G.address ? (s(), n("div", en, g(((ge = p.value.location) == null ? void 0 : ge.name) || ((S = p.value.location) == null ? void 0 : S.address)), 1)) : k("", !0)
              ])) : k("", !0),
              p.value.actions && p.value.actions.length ? (s(), n("div", tn, [
                (s(!0), n(K, null, J(p.value.actions, (ie) => (s(), n("button", {
                  key: ie.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, g(ie.label || "Action"), 1))), 128))
              ])) : k("", !0)
            ], 2)
          ], 2)
        ])) : a.selectedPlatform === "ios" ? (s(), n("div", an, [
          h[7] || (h[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", sn, [
            h[6] || (h[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", nn, [
              h[5] || (h[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              p.value.title ? (s(), n("div", ln, g(p.value.title), 1)) : k("", !0),
              p.value.body ? (s(), n("div", on, g(p.value.body), 1)) : k("", !0),
              $.value && i.value ? (s(), n("div", rn, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, dn),
                (_ = p.value.location) != null && _.name || (U = p.value.location) != null && U.address ? (s(), n("div", un, g(((ne = p.value.location) == null ? void 0 : ne.name) || ((q = p.value.location) == null ? void 0 : q.address)), 1)) : k("", !0)
              ])) : k("", !0),
              p.value.actions && p.value.actions.length ? (s(), n("div", cn, [
                (s(!0), n(K, null, J(p.value.actions, (ie) => (s(), n("button", {
                  key: ie.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, g(ie.label || "Action"), 1))), 128))
              ])) : k("", !0)
            ]),
            p.value.imageUrl ? (s(), n("div", pn, [
              e("img", {
                src: p.value.imageUrl,
                alt: ""
              }, null, 8, mn)
            ])) : k("", !0)
          ])
        ])) : (s(), n("div", vn, [
          h[9] || (h[9] = Me('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", bn, [
            h[8] || (h[8] = Me('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", gn, [
              p.value.title ? (s(), n("div", fn, g(p.value.title), 1)) : k("", !0),
              p.value.body ? (s(), n("div", yn, g(p.value.body), 1)) : k("", !0),
              p.value.imageUrl ? (s(), n("div", hn, [
                e("img", {
                  src: p.value.imageUrl,
                  alt: ""
                }, null, 8, kn)
              ])) : k("", !0),
              $.value && i.value ? (s(), n("div", _n, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, wn),
                (ye = p.value.location) != null && ye.name || (fe = p.value.location) != null && fe.address ? (s(), n("div", $n, g(((ve = p.value.location) == null ? void 0 : ve.name) || ((me = p.value.location) == null ? void 0 : me.address)), 1)) : k("", !0)
              ])) : k("", !0)
            ]),
            p.value.actions && p.value.actions.length ? (s(), n("div", xn, [
              (s(!0), n(K, null, J(p.value.actions, (ie, he) => (s(), n("button", {
                key: ie.id || he,
                type: "button",
                class: xe(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(he) > 0 }])
              }, g(ie.label || "Action"), 3))), 128))
            ])) : k("", !0)
          ])
        ]))
      ]);
    };
  }
}), Cn = /* @__PURE__ */ Se(Sn, [["__scopeId", "data-v-1d6293a0"]]), In = { class: "kb-version-dialog" }, An = {
  key: 0,
  class: "kb-version-empty"
}, Un = {
  key: 1,
  class: "kb-version-list"
}, Ln = { class: "kb-version-item-label" }, Bn = ["onClick"], Rn = { class: "kb-version-actions" }, Tn = /* @__PURE__ */ we({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(a, { emit: o }) {
    const c = o;
    function m(p) {
      try {
        return new Date(p).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return p;
      }
    }
    return (p, i) => a.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: i[1] || (i[1] = Vt(($) => c("close"), ["escape"]))
    }, [
      e("div", In, [
        i[2] || (i[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        i[3] || (i[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        a.versions.length === 0 ? (s(), n("div", An, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", Un, [
          (s(!0), n(K, null, J(a.versions, ($) => (s(), n("li", {
            key: $.id,
            class: "kb-version-item"
          }, [
            e("span", Ln, g($.label || m($.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                c("restore", $.snapshot), c("close");
              }
            }, " Restore ", 8, Bn)
          ]))), 128))
        ])),
        e("div", Rn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: i[0] || (i[0] = ($) => c("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : k("", !0);
  }
}), Ut = /* @__PURE__ */ Se(Tn, [["__scopeId", "data-v-ce35a513"]]), dt = [
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
], Pn = { class: "keos-notification-builder" }, Vn = { class: "kb-builder-top" }, En = { style: { margin: 0, paddingLeft: "1.25rem" } }, On = { class: "kb-push-layout" }, Mn = { class: "kb-push-sidebar" }, Nn = {
  key: 0,
  class: "kb-push-form"
}, Dn = {
  key: 0,
  class: "kb-hint-card"
}, Wn = { class: "kb-push-form-head" }, Hn = { class: "kb-push-form-head-row" }, zn = ["value"], Fn = {
  key: 1,
  class: "kb-push-form"
}, qn = { class: "kb-push-canvas" }, jn = {
  key: 0,
  class: "kb-push-test-banner"
}, Kn = { class: "kb-push-preview-chrome" }, Yn = { class: "kb-push-preview-controls" }, Jn = { class: "kb-push-preview-as" }, Gn = ["value"], Xn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Qn = ["aria-selected", "aria-controls", "onClick"], Zn = { class: "kb-push-preview-frame" }, el = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, tl = { class: "kb-push-actions" }, al = {
  key: 0,
  class: "kb-actions-note"
}, sl = { class: "kb-push-actions-right" }, nl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, ll = { class: "kb-confirm-dialog" }, ol = { class: "kb-confirm-actions" }, il = /* @__PURE__ */ we({
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
    const c = a, m = o, p = se("android"), i = se(""), $ = se(!1), C = se(null), h = se(!1), L = x(
      () => G.value.workflow_status ?? "draft"
    ), B = x(() => {
      const P = i.value;
      return P ? Ee.find((d) => d.id === P) ?? null : null;
    });
    function F(P) {
      const d = G.value, f = P.campaign.message ? { ...d.message, ...P.campaign.message } : d.message, E = P.campaign.delivery ? { ...d.delivery, ...P.campaign.delivery } : d.delivery;
      U({
        ...P.campaign,
        message: f,
        delivery: E
      }), C.value = null, $.value = !1;
    }
    function z(P) {
      const d = P.target.value;
      if (!d) return;
      const f = dt.find((E) => E.id === d);
      f && (ge.value ? (C.value = f, $.value = !0) : F(f), P.target.value = "");
    }
    function ee(P) {
      G.value = P, h.value = !1;
    }
    const {
      campaign: G,
      dirty: ge,
      customValidatorErrors: S,
      getValidationWithWarnings: _,
      update: U,
      updateMessage: ne,
      updateDelivery: q,
      undo: ye,
      redo: fe,
      canUndo: ve,
      canRedo: me,
      resetMessage: ie,
      resetDelivery: he,
      getPreview: O,
      characterLimits: ue,
      hooks: le
    } = Fe({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (P) => {
          var E, Q, pe, v;
          const d = [];
          (E = P.name) != null && E.trim() || d.push("Template name is required"), (pe = (Q = P.message) == null ? void 0 : Q.body) != null && pe.trim() || d.push("Message body is required");
          const f = (v = c.hooks) != null && v.customValidators ? await c.hooks.customValidators(P) : [];
          return [...d, ...f];
        }
      },
      onDirty: () => m("change", G.value)
    }), { lastSavedAt: I } = qe(G, { channel: "push" });
    function _e(P) {
      (P.metaKey || P.ctrlKey) && P.key === "z" && (P.preventDefault(), P.shiftKey ? fe() : ye());
    }
    De(() => {
      window.addEventListener("keydown", _e);
    }), We(() => {
      window.removeEventListener("keydown", _e);
    }), Ae(G, (P) => m("update:modelValue", P), { deep: !0 });
    const T = se(), b = se(!0), re = se(!0);
    async function ce() {
      if (le.estimateReach)
        try {
          T.value = await le.estimateReach(G.value.audience);
        } catch {
          T.value = void 0;
        }
      le.canSend && (b.value = await Promise.resolve(le.canSend())), le.canSchedule && (re.value = await Promise.resolve(le.canSchedule()));
    }
    ce(), Ae(() => G.value.audience, ce, { deep: !0 });
    const $e = x(() => (S.value, _(T.value))), ke = x(() => $e.value.blockingErrors), R = x(() => $e.value.warnings), ae = x(() => $e.value.valid), y = x(
      () => ue[p.value].title
    ), A = x(() => ue[p.value].body), W = x(() => G.value.message.title.length), M = x(() => G.value.message.body.length), V = x(() => {
      if (W.value > y.value)
        return `Title exceeds ${y.value} characters for ${p.value}.`;
    }), Y = x(() => {
      const P = ke.value.find(
        (d) => d.message === "Message body is required"
      );
      if (P) return P.message;
      if (M.value > A.value)
        return `Body exceeds ${A} characters for ${p.value}.`;
    }), Ce = x(
      () => G.value.template_type ?? "transactional"
    );
    function j(P) {
      U({ template_type: P });
    }
    function w(P) {
      U({
        name: P,
        tracking: { ...G.value.tracking ?? {}, campaign_name: P }
      });
    }
    function te(P) {
      const d = ` {{ ${P.variable} }}`, f = G.value.message.variables ?? [], E = Array.from(/* @__PURE__ */ new Set([...f, P.variable]));
      P.field === "title" ? ne({
        title: G.value.message.title + d,
        variables: E
      }) : ne({
        body: G.value.message.body + d,
        variables: E
      });
    }
    function be() {
      ae.value && m("save", G.value);
    }
    return (P, d) => (s(), n("div", Pn, [
      e("div", Vn, [
        Ie(je, {
          "campaign-name": u(G).name,
          status: u(G).status,
          dirty: u(ge),
          "last-saved-at": u(I),
          "can-undo": u(ve),
          "can-redo": u(me),
          "workflow-status": L.value,
          "slugify-name": c.enforceSlugName,
          "onUpdate:campaignName": w,
          "onUpdate:workflowStatus": d[0] || (d[0] = (f) => u(U)({ workflow_status: f })),
          onUndo: u(ye),
          onRedo: u(fe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        ke.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: de({
            background: u(oe).dangerBg,
            border: `1px solid ${u(oe).dangerBorder}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[12]}px ${u(Z)[16]}px`,
            marginBottom: `${u(Z)[16]}px`
          })
        }, [
          e("ul", {
            style: de({ margin: 0, paddingLeft: "1.25rem", color: u(oe).danger })
          }, [
            (s(!0), n(K, null, J(ke.value, (f) => (s(), n("li", {
              key: f.message
            }, g(f.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        R.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: de({
            background: u(oe).neutral.bg,
            border: `1px solid ${u(oe).neutral.border}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[12]}px ${u(Z)[16]}px`,
            marginBottom: `${u(Z)[16]}px`,
            fontSize: "0.875rem",
            color: u(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: de({ display: "block", marginBottom: `${u(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", En, [
            (s(!0), n(K, null, J(R.value, (f) => (s(), n("li", {
              key: f.message
            }, g(f.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", On, [
        e("aside", Mn, [
          a.disabledSections.includes("message") ? k("", !0) : (s(), n("div", Nn, [
            !u(G).message.title && !u(G).message.body ? (s(), n("div", Dn, " Add a title and message below to get started. ")) : k("", !0),
            e("div", Wn, [
              d[13] || (d[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", Hn, [
                Ie(lt, {
                  "template-type": Ce.value,
                  onUpdate: j
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: z
                }, [
                  d[12] || (d[12] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, J(u(dt), (f) => (s(), n("option", {
                    key: f.id,
                    value: f.id
                  }, g(f.label), 9, zn))), 128))
                ], 32)
              ])
            ]),
            Ie(za, {
              message: u(G).message,
              "title-count": W.value,
              "body-count": M.value,
              "title-limit": y.value,
              "body-limit": A.value,
              "selected-platform": p.value,
              "show-reset": !0,
              "title-error": V.value,
              "body-error": Y.value,
              onUpdate: u(ne),
              onReset: d[1] || (d[1] = (f) => u(ie)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            Ie(At, {
              message: u(G).message,
              "variable-options": a.variableOptions,
              onUpdate: u(ne),
              onInsertVariable: te
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !a.designOnly && !a.disabledSections.includes("delivery") ? (s(), n("div", Fn, [
            d[14] || (d[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            Ie(Us, {
              delivery: u(G).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: u(q),
              onReset: d[2] || (d[2] = (f) => u(he)())
            }, null, 8, ["delivery", "onUpdate"]),
            Ie(Ms, {
              delivery: u(G).delivery,
              onUpdate: u(q)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : k("", !0)
        ]),
        e("main", qn, [
          !a.designOnly && u(G).audience.test_mode ? (s(), n("div", jn, [...d[15] || (d[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", Kn, [
            e("div", Yn, [
              e("label", Jn, [
                d[17] || (d[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": d[3] || (d[3] = (f) => i.value = f),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  d[16] || (d[16] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, J(u(Ee), (f) => (s(), n("option", {
                    key: f.id,
                    value: f.id
                  }, g(f.label), 9, Gn))), 128))
                ], 512), [
                  [Ne, i.value]
                ])
              ])
            ]),
            e("div", Xn, [
              (s(), n(K, null, J(["android", "ios", "web"], (f) => e("button", {
                key: f,
                type: "button",
                class: xe(["kb-push-device-btn", { "kb-push-device-btn--active": p.value === f }]),
                role: "tab",
                "aria-selected": p.value === f,
                "aria-controls": `kb-preview-panel-${f}`,
                onClick: (E) => p.value = f
              }, g(f.toUpperCase()), 11, Qn)), 64))
            ]),
            e("div", Zn, [
              !u(G).message.title && !u(G).message.body ? (s(), n("div", el, [...d[18] || (d[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (s(), Et(Cn, {
                key: 1,
                "get-preview": u(O),
                "selected-platform": p.value,
                "preview-profile": B.value,
                "onUpdate:selectedPlatform": d[4] || (d[4] = (f) => p.value = f)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", tl, [
        c.actionsNote ? (s(), n("div", al, g(c.actionsNote), 1)) : k("", !0),
        e("div", sl, [
          !a.designOnly && a.showHistory ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: d[5] || (d[5] = (f) => h.value = !0)
          }, " Version history ")) : k("", !0),
          !a.designOnly && a.showSaveVersion ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: d[6] || (d[6] = (f) => m("save-version", JSON.parse(JSON.stringify(u(G)))))
          }, " Save as version ")) : k("", !0),
          a.showDuplicate ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: d[7] || (d[7] = (f) => m("duplicate", JSON.parse(JSON.stringify(u(G)))))
          }, " Duplicate ")) : k("", !0),
          a.showSave ? (s(), n("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: be
          }, " Save ")) : k("", !0),
          a.showClose ? (s(), n("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: d[8] || (d[8] = (f) => m("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      $.value ? (s(), n("div", nl, [
        e("div", ll, [
          d[19] || (d[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          d[20] || (d[20] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", ol, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: d[9] || (d[9] = (f) => {
                $.value = !1, C.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: d[10] || (d[10] = (f) => C.value && F(C.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0),
      Ie(Ut, {
        open: h.value,
        versions: a.versions,
        onClose: d[11] || (d[11] = (f) => h.value = !1),
        onRestore: ee
      }, null, 8, ["open", "versions"])
    ]));
  }
}), Lt = /* @__PURE__ */ Se(il, [["__scopeId", "data-v-64f25140"]]), rl = { class: "kb-section" }, dl = { class: "kb-section__head" }, ul = { class: "kb-summary-bar" }, cl = { class: "kb-pill kb-pill--category" }, pl = { class: "kb-pill kb-pill--format" }, ml = { class: "kb-pill kb-pill--status" }, vl = { class: "kb-field" }, bl = ["value"], gl = { class: "kb-field" }, fl = { class: "kb-label" }, yl = { class: "kb-helper" }, hl = ["value"], kl = ["value"], _l = { class: "kb-field" }, wl = ["value"], $l = { class: "kb-field kb-field--inline" }, xl = { class: "kb-field-half" }, Sl = ["value"], Cl = { class: "kb-field" }, Il = ["value"], Al = {
  key: 0,
  class: "kb-field"
}, Ul = { class: "kb-label" }, Ll = ["value"], Bl = {
  key: 1,
  class: "kb-field"
}, Rl = ["value"], Tl = {
  key: 2,
  class: "kb-field"
}, Pl = ["value"], Vl = {
  key: 3,
  class: "kb-field"
}, El = ["value"], Ol = {
  key: 4,
  class: "kb-field kb-field--inline"
}, Ml = { class: "kb-location-row" }, Nl = ["value"], Dl = ["value"], Wl = ["value"], Hl = ["value"], zl = {
  key: 5,
  class: "kb-field"
}, Fl = ["value"], ql = {
  key: 6,
  class: "kb-field"
}, jl = ["value"], Kl = {
  key: 7,
  class: "kb-field"
}, Yl = ["value"], Jl = ["value"], Gl = {
  key: 8,
  class: "kb-field"
}, Xl = { class: "kb-wa-buttons" }, Ql = ["value", "onInput"], Zl = ["value", "onInput"], eo = ["value", "onInput"], to = ["value", "onInput"], ao = ["onClick"], so = ["disabled"], no = {
  key: 9,
  class: "kb-field"
}, lo = { class: "kb-wa-buttons" }, oo = ["value", "onInput"], io = ["value", "onInput"], ro = ["onClick"], uo = {
  key: 10,
  class: "kb-field"
}, co = ["value"], po = ["value"], mo = { class: "kb-field" }, vo = { class: "kb-label" }, bo = ["value"], go = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, fo = { class: "kb-wa-fields-list" }, yo = { class: "kb-wa-field-name" }, ho = { class: "kb-wa-field-status" }, ko = { class: "kb-field" }, _o = ["value"], wo = { class: "kb-field" }, $o = { class: "kb-wa-buttons" }, xo = ["value", "onInput"], So = ["value", "onChange"], Co = ["value", "onInput"], Io = ["value", "onInput"], Ao = {
  key: 2,
  class: "kb-opt-out-note"
}, Uo = ["onClick"], Lo = ["disabled"], Ge = 60, Xe = 1024, Qe = 60, Ze = 10, mt = 10, Bo = /* @__PURE__ */ we({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    const c = a, m = o, p = [
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
    ], i = x(() => c.message), $ = x(() => i.value.template_type ?? "text"), C = x(() => i.value.header_type ?? "none"), h = x(() => String(i.value.header ?? "")), L = x(() => String(i.value.body ?? "")), B = x(() => String(i.value.footer ?? "")), F = x(() => i.value.buttons ?? []), z = x(() => i.value.products ?? []), ee = x(() => i.value.cards ?? []), G = x(() => {
      const T = p.find((b) => b.value === $.value);
      return (T == null ? void 0 : T.hint) ?? "Choose the approved WhatsApp template format.";
    }), ge = x(() => {
      const T = String(i.value.template_category ?? "").trim();
      return T ? T.charAt(0).toUpperCase() + T.slice(1) : "Uncategorized";
    }), S = x(() => {
      const T = p.find((b) => b.value === $.value);
      return (T == null ? void 0 : T.label) ?? "Text";
    }), _ = x(() => i.value.template_name ? L.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function U(T) {
      if (!T || typeof T != "string") return [];
      const b = /\{\{\s*([^}]+?)\s*\}\}/g, re = /* @__PURE__ */ new Set();
      let ce;
      for (; (ce = b.exec(T)) !== null; ) re.add(ce[1].trim());
      return Array.from(re);
    }
    const ne = x(() => {
      const T = c.message.header ?? "", b = c.message.body ?? c.message.body ?? "", re = new Set(c.message.variables ?? []), ce = [...U(T), ...U(b)];
      return Array.from(new Set(ce)).map((ke) => ({ name: ke, configured: re.has(ke) }));
    });
    function q(T) {
      m("update", T);
    }
    function ye(T) {
      const b = {
        template_category: T || void 0
      };
      T === "authentication" && $.value !== "auth" && (b.template_type = "auth"), q(b);
    }
    function fe(T) {
      const b = { template_type: T };
      T === "auth" && (b.template_category = "authentication"), (T === "image" || T === "video" || T === "document") && (b.header_type = T), q(b);
    }
    function ve(T, b) {
      var ce;
      const re = [...F.value];
      re[T] = {
        ...re[T],
        id: ((ce = re[T]) == null ? void 0 : ce.id) || `btn_${T + 1}`,
        ...b
      }, q({ buttons: re });
    }
    function me(T) {
      const b = [...F.value];
      b.splice(T, 1), q({ buttons: b });
    }
    function ie() {
      const T = [...F.value];
      T.push({ id: `btn_${T.length + 1}`, label: "", type: "quick_reply" }), q({ buttons: T });
    }
    function he(T, b) {
      var ce;
      const re = [...z.value];
      re[T] = {
        ...re[T],
        id: ((ce = re[T]) == null ? void 0 : ce.id) || `prod_${T + 1}`,
        ...b
      }, q({ products: re });
    }
    function O(T) {
      const b = [...z.value];
      b.splice(T, 1), q({ products: b });
    }
    function ue() {
      const T = [...z.value];
      T.push({ id: `prod_${T.length + 1}`, productId: "" }), q({ products: T });
    }
    function le(T, b) {
      var ce;
      const re = [...ee.value];
      re[T] = {
        ...re[T],
        id: ((ce = re[T]) == null ? void 0 : ce.id) || `card_${T + 1}`,
        ...b
      }, q({ cards: re });
    }
    function I(T) {
      const b = [...ee.value];
      b.splice(T, 1), q({ cards: b });
    }
    function _e() {
      const T = [...ee.value];
      T.push({
        id: `card_${T.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), q({ cards: T });
    }
    return (T, b) => {
      var re, ce, $e, ke;
      return s(), n("section", rl, [
        e("div", dl, [
          b[22] || (b[22] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (R) => T.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        b[50] || (b[50] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
        e("div", ul, [
          e("span", cl, g(ge.value), 1),
          e("span", pl, g(S.value), 1),
          e("span", ml, g(_.value), 1)
        ]),
        e("div", vl, [
          b[24] || (b[24] = e("label", { class: "kb-label" }, [
            X(" Category (purpose) "),
            e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.value.template_category ?? "",
            onChange: b[1] || (b[1] = (R) => ye(R.target.value))
          }, [...b[23] || (b[23] = [
            e("option", { value: "" }, "Select category", -1),
            e("option", { value: "marketing" }, "Marketing", -1),
            e("option", { value: "utility" }, "Utility", -1),
            e("option", { value: "authentication" }, "Authentication", -1)
          ])], 40, bl)
        ]),
        e("div", gl, [
          e("label", fl, [
            b[25] || (b[25] = X(" Functional format ", -1)),
            e("span", yl, g(G.value), 1)
          ]),
          e("select", {
            class: "kb-select",
            value: $.value,
            onChange: b[2] || (b[2] = (R) => fe(R.target.value))
          }, [
            (s(), n(K, null, J(p, (R) => e("option", {
              key: R.value,
              value: R.value
            }, g(R.label), 9, kl)), 64))
          ], 40, hl)
        ]),
        e("div", _l, [
          b[26] || (b[26] = e("label", { class: "kb-label" }, [
            X(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: i.value.template_name ?? "",
            onInput: b[3] || (b[3] = (R) => q({
              template_name: R.target.value || void 0
            }))
          }, null, 40, wl)
        ]),
        e("div", $l, [
          e("div", xl, [
            b[27] || (b[27] = e("label", { class: "kb-label" }, [
              X(" Template language "),
              e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. en_US",
              value: i.value.template_language ?? "",
              onInput: b[4] || (b[4] = (R) => q({
                template_language: R.target.value || void 0
              }))
            }, null, 40, Sl)
          ]),
          e("div", { class: "kb-field-half" }, [
            e("div", { class: "kb-meta-card" }, [
              b[28] || (b[28] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
              e("ul", { class: "kb-meta-list" }, [
                e("li", null, "Header text: " + g(Ge) + " chars"),
                e("li", null, "Body: " + g(Xe) + " chars"),
                e("li", null, "Footer: " + g(Qe) + " chars"),
                e("li", null, "Buttons: up to " + g(Ze))
              ])
            ])
          ])
        ]),
        e("div", Cl, [
          b[30] || (b[30] = e("label", { class: "kb-label" }, [
            X(" Header component (optional) "),
            e("span", { class: "kb-helper" }, "Header can be text or rich media.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: C.value,
            onChange: b[5] || (b[5] = (R) => q({ header_type: R.target.value }))
          }, [...b[29] || (b[29] = [
            Me('<option value="none" data-v-3e4d670b>No header</option><option value="text" data-v-3e4d670b>Text header</option><option value="image" data-v-3e4d670b>Image header</option><option value="video" data-v-3e4d670b>Video header</option><option value="document" data-v-3e4d670b>Document header</option>', 5)
          ])], 40, Il)
        ]),
        C.value === "text" ? (s(), n("div", Al, [
          e("label", Ul, [
            b[31] || (b[31] = X(" Header text ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": h.value.length > Ge }])
            }, g(h.value.length) + "/" + g(Ge), 3)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: h.value,
            onInput: b[6] || (b[6] = (R) => q({
              header: R.target.value || void 0
            }))
          }, null, 40, Ll)
        ])) : k("", !0),
        ["image", "video", "document"].includes(C.value) || ["image", "video", "document"].includes($.value) ? (s(), n("div", Bl, [
          b[32] || (b[32] = e("label", { class: "kb-label" }, [
            X(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.value.media_url ?? "",
            onInput: b[7] || (b[7] = (R) => q({
              media_url: R.target.value || void 0
            }))
          }, null, 40, Rl)
        ])) : k("", !0),
        C.value === "document" || $.value === "document" ? (s(), n("div", Tl, [
          b[33] || (b[33] = e("label", { class: "kb-label" }, [
            X(" Document filename "),
            e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. invoice.pdf",
            value: i.value.document_filename ?? "",
            onInput: b[8] || (b[8] = (R) => q({
              document_filename: R.target.value || void 0
            }))
          }, null, 40, Pl)
        ])) : k("", !0),
        ["image", "video", "document"].includes(C.value) || ["image", "video", "document"].includes($.value) ? (s(), n("div", Vl, [
          b[34] || (b[34] = e("label", { class: "kb-label" }, [
            X(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: i.value.media_caption ?? "",
            onInput: b[9] || (b[9] = (R) => q({
              media_caption: R.target.value || void 0
            }))
          }, null, 40, El)
        ])) : k("", !0),
        $.value === "location" ? (s(), n("div", Ol, [
          b[35] || (b[35] = e("label", { class: "kb-label" }, [
            X(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", Ml, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((re = i.value.location) == null ? void 0 : re.lat) ?? "",
              onInput: b[10] || (b[10] = (R) => {
                const ae = { ...i.value.location ?? {} };
                ae.lat = Number(R.target.value), q({ location: ae });
              })
            }, null, 40, Nl),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ce = i.value.location) == null ? void 0 : ce.lon) ?? "",
              onInput: b[11] || (b[11] = (R) => {
                const ae = { ...i.value.location ?? {} };
                ae.lon = Number(R.target.value), q({ location: ae });
              })
            }, null, 40, Dl)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: (($e = i.value.location) == null ? void 0 : $e.name) ?? "",
            onInput: b[12] || (b[12] = (R) => {
              const ae = { ...i.value.location ?? {} };
              ae.name = R.target.value || void 0, q({ location: ae });
            })
          }, null, 40, Wl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((ke = i.value.location) == null ? void 0 : ke.address) ?? "",
            onInput: b[13] || (b[13] = (R) => {
              const ae = { ...i.value.location ?? {} };
              ae.address = R.target.value || void 0, q({ location: ae });
            })
          }, null, 40, Hl)
        ])) : k("", !0),
        $.value === "coupon" ? (s(), n("div", zl, [
          b[36] || (b[36] = e("label", { class: "kb-label" }, [
            X(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: i.value.coupon_code ?? "",
            onInput: b[14] || (b[14] = (R) => q({
              coupon_code: R.target.value || void 0
            }))
          }, null, 40, Fl)
        ])) : k("", !0),
        $.value === "lto" ? (s(), n("div", ql, [
          b[37] || (b[37] = e("label", { class: "kb-label" }, [
            X(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: i.value.lto_expiry ?? "",
            onInput: b[15] || (b[15] = (R) => q({
              lto_expiry: R.target.value || void 0
            }))
          }, null, 40, jl)
        ])) : k("", !0),
        $.value === "flow" ? (s(), n("div", Kl, [
          b[38] || (b[38] = e("label", { class: "kb-label" }, [
            X(" Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: i.value.flow_id ?? "",
            onInput: b[16] || (b[16] = (R) => q({
              flow_id: R.target.value || void 0
            }))
          }, null, 40, Yl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: i.value.flow_cta_label ?? "",
            onInput: b[17] || (b[17] = (R) => q({
              flow_cta_label: R.target.value || void 0
            }))
          }, null, 40, Jl)
        ])) : k("", !0),
        $.value === "carousel" ? (s(), n("div", Gl, [
          e("label", { class: "kb-label" }, [
            b[39] || (b[39] = X(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + g(mt) + " cards.")
          ]),
          e("div", Xl, [
            (s(!0), n(K, null, J(ee.value, (R, ae) => (s(), n("div", {
              key: R.id || ae,
              class: "kb-card-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Card title",
                value: R.title ?? "",
                onInput: (y) => le(Number(ae), { title: y.target.value })
              }, null, 40, Ql),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Card media URL",
                value: R.media_url ?? "",
                onInput: (y) => le(Number(ae), { media_url: y.target.value })
              }, null, 40, Zl),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label",
                value: R.button_label ?? "",
                onInput: (y) => le(Number(ae), { button_label: y.target.value })
              }, null, 40, eo),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Button URL",
                value: R.button_url ?? "",
                onInput: (y) => le(Number(ae), { button_url: y.target.value })
              }, null, 40, to),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (y) => I(Number(ae))
              }, "Remove", 8, ao)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: ee.value.length >= mt,
              onClick: _e
            }, " Add card ", 8, so)
          ])
        ])) : k("", !0),
        ["mpm", "catalog"].includes($.value) ? (s(), n("div", no, [
          b[40] || (b[40] = e("label", { class: "kb-label" }, [
            X(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", lo, [
            (s(!0), n(K, null, J(z.value, (R, ae) => (s(), n("div", {
              key: R.id || ae,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: R.productId,
                onInput: (y) => he(Number(ae), { productId: y.target.value })
              }, null, 40, oo),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: R.sectionTitle,
                onInput: (y) => he(Number(ae), { sectionTitle: y.target.value || void 0 })
              }, null, 40, io),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (y) => O(Number(ae))
              }, " Remove ", 8, ro)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: ue
            }, " Add product ")
          ])
        ])) : k("", !0),
        $.value === "auth" ? (s(), n("div", uo, [
          b[42] || (b[42] = e("label", { class: "kb-label" }, [
            X(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.value.auth_type ?? "otp",
            onChange: b[18] || (b[18] = (R) => q({
              auth_type: R.target.value
            }))
          }, [...b[41] || (b[41] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, co),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: i.value.auth_label ?? "",
            onInput: b[19] || (b[19] = (R) => q({
              auth_label: R.target.value || void 0
            }))
          }, null, 40, po)
        ])) : k("", !0),
        e("div", mo, [
          e("label", vo, [
            b[43] || (b[43] = X(" Body ", -1)),
            b[44] || (b[44] = e("span", { class: "kb-helper" }, " Body is required. Use the exact approved text with variables like " + g(1) + ", " + g(2) + ". ", -1)),
            e("span", {
              class: xe(["kb-counter", { "kb-counter--warn": L.value.length > Xe }])
            }, g(L.value.length) + "/" + g(Xe), 3)
          ]),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: L.value,
            onInput: b[20] || (b[20] = (R) => q({
              body: R.target.value || void 0
            }))
          }, null, 40, bo)
        ]),
        ne.value.length > 0 ? (s(), n("div", go, [
          b[45] || (b[45] = e("label", { class: "kb-label" }, "Template fields", -1)),
          b[46] || (b[46] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", fo, [
            (s(!0), n(K, null, J(ne.value, (R) => (s(), n("li", {
              key: R.name,
              class: xe(["kb-wa-field-item", { "kb-wa-field-item--ok": R.configured }])
            }, [
              e("span", yo, g(R.name), 1),
              e("span", ho, g(R.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : k("", !0),
        e("div", ko, [
          b[47] || (b[47] = e("label", { class: "kb-label" }, [
            X(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: B.value,
            onInput: b[21] || (b[21] = (R) => q({
              footer: R.target.value || void 0
            }))
          }, null, 40, _o),
          e("div", {
            class: xe(["kb-counter kb-counter--inline", { "kb-counter--warn": B.value.length > Qe }])
          }, g(B.value.length) + "/" + g(Qe), 3)
        ]),
        e("div", wo, [
          e("label", { class: "kb-label" }, [
            b[48] || (b[48] = X(" Buttons (optional) ", -1)),
            e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + g(Ze) + " buttons. ")
          ]),
          e("div", $o, [
            (s(!0), n(K, null, J(F.value, (R, ae) => (s(), n("div", {
              key: R.id || ae,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: R.label,
                onInput: (y) => ve(Number(ae), { label: y.target.value })
              }, null, 40, xo),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: R.type ?? "quick_reply",
                onChange: (y) => ve(Number(ae), { type: y.target.value })
              }, [...b[49] || (b[49] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1),
                e("option", { value: "opt_out" }, "Marketing opt-out", -1)
              ])], 40, So),
              R.type === "url" ? (s(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: R.url,
                onInput: (y) => ve(Number(ae), { url: y.target.value || void 0 })
              }, null, 40, Co)) : R.type === "call" ? (s(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: R.phone,
                onInput: (y) => ve(Number(ae), { phone: y.target.value || void 0 })
              }, null, 40, Io)) : R.type === "opt_out" ? (s(), n("span", Ao, " Sends a built-in opt-out action. ")) : k("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (y) => me(Number(ae))
              }, " Remove ", 8, Uo)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: F.value.length >= Ze,
              onClick: ie
            }, " Add button ", 8, Lo)
          ])
        ])
      ]);
    };
  }
}), Ro = /* @__PURE__ */ Se(Bo, [["__scopeId", "data-v-3e4d670b"]]), To = { class: "wa-preview-root" }, Po = { class: "wa-device" }, Vo = { class: "wa-screen" }, Eo = { class: "wa-header" }, Oo = { class: "wa-titleblock" }, Mo = { class: "wa-title-row" }, No = { class: "wa-title" }, Do = { class: "wa-subtitle" }, Wo = {
  key: 0,
  class: "wa-flow-shell"
}, Ho = { class: "wa-flow-header" }, zo = { class: "wa-flow-title" }, Fo = { class: "wa-flow-content" }, qo = { class: "wa-flow-eyebrow" }, jo = {
  key: 0,
  class: "wa-flow-products"
}, Ko = { class: "wa-flow-footer" }, Yo = {
  type: "button",
  class: "wa-flow-cta"
}, Jo = { class: "wa-managed" }, Go = {
  key: 1,
  class: "wa-thread"
}, Xo = { class: "wa-secure-banner" }, Qo = { class: "wa-msg wa-msg--in" }, Zo = { class: "wa-template-card" }, ei = {
  key: 0,
  class: "wa-card-media"
}, ti = { class: "wa-card-media-tag" }, ai = { class: "wa-card-media-sub" }, si = {
  key: 1,
  class: "wa-card-header-text"
}, ni = ["innerHTML"], li = {
  key: 2,
  class: "wa-inline-note"
}, oi = {
  key: 3,
  class: "wa-inline-note"
}, ii = {
  key: 4,
  class: "wa-inline-note"
}, ri = {
  key: 5,
  class: "wa-inline-note wa-inline-note--warn"
}, di = {
  key: 6,
  class: "wa-inline-note wa-inline-note--muted"
}, ui = {
  key: 7,
  class: "wa-product-list"
}, ci = { class: "wa-product-name" }, pi = { class: "wa-product-price" }, mi = {
  key: 8,
  type: "button",
  class: "wa-template-cta"
}, vi = {
  key: 9,
  class: "wa-template-actions"
}, bi = { class: "wa-msg wa-msg--out" }, gi = { class: "wa-bubble wa-bubble--out" }, fi = { class: "wa-bubble-author" }, yi = { class: "wa-msg wa-msg--in" }, hi = { class: "wa-bubble wa-bubble--in" }, ki = /* @__PURE__ */ we({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(a) {
    const o = a;
    function c(S) {
      return String(S).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = x(() => {
      var U;
      const S = ((U = o.template) == null ? void 0 : U.body) ?? "";
      return c(S).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), p = x(() => o.template.templateName || "Ecoshop"), i = x(() => "Business Account"), $ = x(() => o.template.format === "flow" || !!o.template.flow), C = x(() => {
      var S, _, U;
      return ((_ = (S = o.template.buttons) == null ? void 0 : S[0]) == null ? void 0 : _.text) || ((U = o.template.flow) == null ? void 0 : U.ctaLabel) || "Continue";
    }), h = x(() => o.template.buttons ?? []), L = x(() => {
      var S;
      return (((S = o.template.multiProduct) == null ? void 0 : S.length) ?? 0) > 0;
    }), B = x(() => (o.template.format || "text").toUpperCase()), F = x(() => {
      const S = o.template.header;
      return !S || S.type === "text" ? "" : S.type === "image" ? S.url || "Image" : S.type === "video" ? S.url || "Video" : S.filename || S.url || "Document";
    }), z = x(() => {
      const S = o.template.header;
      if (!(!S || S.type !== "image" || !S.url))
        return { backgroundImage: `url(${S.url})` };
    }), ee = x(() => {
      var _, U, ne;
      const S = o.template;
      return S.format === "flow" ? "Thanks, we received your preferences." : (_ = S.auth) != null && _.code ? "Use the verification code and let us know if it works." : (U = S.coupon) != null && U.code ? `Your coupon ${S.coupon.code} is active now.` : S.limitedOffer ? `Great choice. This offer is valid until ${S.limitedOffer}.` : (ne = o.template.multiProduct) != null && ne.length ? `Here are ${o.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), G = x(() => {
      var _, U;
      const S = o.template;
      return S.location ? S.location.name || S.location.address || `${S.location.lat}, ${S.location.lng}` : (_ = S.auth) != null && _.code ? `Verification code: ${S.auth.code}` : (U = S.flow) != null && U.id ? `Flow ID: ${S.flow.id}` : S.templateLanguage ? `Template language: ${S.templateLanguage}` : `Category: ${S.templateCategory || "utility"} • Format: ${S.format || "text"}`;
    }), ge = x(() => {
      var U, ne;
      const S = o.template;
      if ((U = S.multiProduct) != null && U.length) return S.multiProduct.slice(0, 5).map((q) => q.name || "Product");
      if ((ne = S.buttons) != null && ne.length) return S.buttons.slice(0, 5).map((q) => q.text || "Option");
      const _ = (S.body || "").split(/\n|\.|,/).map((q) => q.trim()).filter(Boolean).slice(0, 5);
      return _.length ? _ : ["Option A", "Option B", "Option C"];
    });
    return (S, _) => {
      var U, ne, q, ye, fe, ve;
      return s(), n("div", To, [
        e("div", Po, [
          e("div", Vo, [
            _[20] || (_[20] = Me('<div class="wa-statusbar" data-v-d96ea1d0><span class="wa-time" data-v-d96ea1d0>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-d96ea1d0><span class="wa-signal" data-v-d96ea1d0></span><span class="wa-wifi" data-v-d96ea1d0></span><span class="wa-battery" data-v-d96ea1d0></span></div></div>', 1)),
            e("div", Eo, [
              _[4] || (_[4] = e("span", { class: "wa-back" }, "←", -1)),
              _[5] || (_[5] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Oo, [
                e("div", Mo, [
                  e("span", No, g(p.value), 1),
                  _[3] || (_[3] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Do, g(i.value), 1)
              ]),
              _[6] || (_[6] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            $.value ? (s(), n("div", Wo, [
              _[11] || (_[11] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Ho, [
                _[7] || (_[7] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", zo, g(p.value), 1),
                _[8] || (_[8] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Fo, [
                e("p", qo, g(a.template.body || "Please choose an option below."), 1),
                (s(!0), n(K, null, J(ge.value, (me, ie) => (s(), n("div", {
                  key: `flow-opt-${ie}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, g(me), 1),
                  e("span", {
                    class: xe(["wa-radio", { "wa-radio--on": ie === 0 }])
                  }, null, 2)
                ]))), 128)),
                (U = a.template.multiProduct) != null && U.length ? (s(), n("div", jo, [
                  (s(!0), n(K, null, J(a.template.multiProduct.slice(0, 3), (me, ie) => (s(), n("div", {
                    key: ie,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, g(me.name || "Product"), 1),
                      e("p", null, g(me.price || "Price on request"), 1)
                    ]),
                    _[9] || (_[9] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : k("", !0)
              ]),
              e("div", Ko, [
                e("button", Yo, g(C.value), 1),
                e("p", Jo, [
                  _[10] || (_[10] = X("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: _[0] || (_[0] = Ye(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (s(), n("div", Go, [
              _[19] || (_[19] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Xo, [
                _[12] || (_[12] = e("span", null, "●", -1)),
                _[13] || (_[13] = X(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: _[1] || (_[1] = Ye(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", Qo, [
                e("div", Zo, [
                  a.template.header && a.template.header.type !== "text" ? (s(), n("div", ei, [
                    e("div", ti, g(B.value) + " TEMPLATE", 1),
                    e("div", ai, g(F.value), 1),
                    z.value ? (s(), n("div", {
                      key: 0,
                      class: "wa-card-media-image",
                      style: de(z.value)
                    }, null, 4)) : k("", !0)
                  ])) : (ne = a.template.header) != null && ne.text ? (s(), n("div", si, g(a.template.header.text), 1)) : k("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: m.value
                  }, null, 8, ni),
                  a.template.location ? (s(), n("div", li, " 📍 " + g(a.template.location.name || a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)) : k("", !0),
                  (q = a.template.coupon) != null && q.code ? (s(), n("div", oi, [
                    _[14] || (_[14] = X(" Coupon: ", -1)),
                    e("strong", null, g(a.template.coupon.code), 1)
                  ])) : k("", !0),
                  (ye = a.template.auth) != null && ye.code ? (s(), n("div", ii, [
                    _[15] || (_[15] = X(" Verification code: ", -1)),
                    e("strong", null, g(a.template.auth.code), 1)
                  ])) : k("", !0),
                  a.template.limitedOffer ? (s(), n("div", ri, " Expires: " + g(a.template.limitedOffer), 1)) : k("", !0),
                  a.template.footer ? (s(), n("div", di, g(a.template.footer), 1)) : k("", !0),
                  L.value ? (s(), n("div", ui, [
                    (s(!0), n(K, null, J((fe = a.template.multiProduct) == null ? void 0 : fe.slice(0, 4), (me, ie) => (s(), n("div", {
                      key: `prod-${ie}`,
                      class: "wa-product-row"
                    }, [
                      e("span", ci, g(me.name || `Item ${ie + 1}`), 1),
                      e("span", pi, g(me.price || "-"), 1)
                    ]))), 128))
                  ])) : k("", !0),
                  C.value ? (s(), n("button", mi, g(C.value), 1)) : k("", !0),
                  h.value.length > 1 ? (s(), n("div", vi, [
                    (s(!0), n(K, null, J(h.value.slice(1, 4), (me, ie) => (s(), n("button", {
                      key: `action-${ie}`,
                      type: "button",
                      class: "wa-template-action"
                    }, g(me.text), 1))), 128))
                  ])) : k("", !0),
                  _[16] || (_[16] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ]),
              e("div", bi, [
                e("div", gi, [
                  e("span", fi, g(p.value), 1),
                  e("p", null, g(ee.value), 1),
                  _[17] || (_[17] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ]),
              e("div", yi, [
                e("div", hi, [
                  e("p", null, g(G.value), 1),
                  (ve = a.template.flow) != null && ve.id ? (s(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: _[2] || (_[2] = Ye(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + g(a.template.flow.id), 1)) : k("", !0),
                  _[18] || (_[18] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            _[21] || (_[21] = Me('<div class="wa-inputbar" data-v-d96ea1d0><span class="wa-input-icon wa-input-icon--emoji" data-v-d96ea1d0></span><span class="wa-input-placeholder" data-v-d96ea1d0>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-d96ea1d0></span><span class="wa-input-icon wa-input-icon--camera" data-v-d96ea1d0></span><button type="button" class="wa-mic" data-v-d96ea1d0><span class="wa-input-icon wa-input-icon--mic" data-v-d96ea1d0></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), _i = /* @__PURE__ */ Se(ki, [["__scopeId", "data-v-d96ea1d0"]]), wi = { class: "keos-whatsapp-builder" }, $i = { class: "kb-builder-top" }, xi = { style: { margin: 0, paddingLeft: "1.25rem" } }, Si = { class: "kb-wa-layout" }, Ci = { class: "kb-wa-sidebar" }, Ii = {
  key: 0,
  class: "kb-wa-form"
}, Ai = { class: "kb-wa-form-head" }, Ui = { class: "kb-wa-form-head-top" }, Li = { class: "kb-wa-health-pill" }, Bi = { class: "kb-wa-form-head-row" }, Ri = ["value"], Ti = { class: "kb-wa-health" }, Pi = { class: "kb-wa-health-row" }, Vi = { class: "kb-wa-health-value" }, Ei = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Oi = { class: "kb-wa-canvas" }, Mi = {
  key: 0,
  class: "kb-wa-test-banner"
}, Ni = { class: "kb-wa-preview-chrome" }, Di = { class: "kb-push-preview-controls" }, Wi = { class: "kb-push-preview-as" }, Hi = ["value"], zi = { class: "kb-preview-status" }, Fi = { class: "kb-wa-preview-frame" }, qi = { class: "kb-wa-actions" }, ji = {
  key: 0,
  class: "kb-actions-note"
}, Ki = { class: "kb-wa-actions-right" }, Yi = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Ji = { class: "kb-confirm-dialog" }, Gi = { class: "kb-confirm-actions" }, vt = 60, bt = 1024, gt = 60, ft = 10, yt = 10, Xi = /* @__PURE__ */ we({
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
    function c(y) {
      var P, d, f, E, Q;
      const A = [], W = y.message, M = (W.template_category ?? "").toString().trim(), V = (W.template_type ?? "text").toString(), Y = (W.header_type ?? "none").toString(), Ce = (W.header ?? "").toString(), j = (W.body ?? "").toString(), w = (W.footer ?? "").toString(), te = Array.isArray(W.buttons) ? W.buttons : [], be = Array.isArray(W.cards) ? W.cards : [];
      return (P = y.name) != null && P.trim() || A.push("Template name is required"), (d = W.template_name) != null && d.trim() || A.push("WhatsApp template name is required"), M || A.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), j.trim() || A.push("Body is required"), Y === "text" && Ce.length > vt && A.push(`Header text cannot exceed ${vt} characters`), j.length > bt && A.push(`Body cannot exceed ${bt} characters`), w.length > gt && A.push(`Footer cannot exceed ${gt} characters`), te.length > ft && A.push(`Buttons cannot exceed ${ft}`), (V === "image" || V === "video" || V === "document" || Y === "image" || Y === "video" || Y === "document") && !W.media_url && A.push("Media URL is required for rich media templates"), M === "authentication" && V !== "auth" && A.push("Authentication category must use Authentication format"), V === "auth" && !((f = W.auth_label) != null && f.trim()) && !j.includes("{{") && A.push("Authentication templates should include a code label or placeholder variable"), V === "lto" && !W.lto_expiry && A.push("Limited-time offer requires an expiry"), (V === "mpm" || V === "catalog") && !((E = W.products) != null && E.length) && A.push("Catalog and multi-product templates require at least one product"), V === "flow" && !((Q = W.flow_id) != null && Q.trim()) && A.push("WhatsApp Flow format requires a flow ID"), V === "carousel" && (be.length ? be.length > yt && A.push(`Carousel supports up to ${yt} cards`) : A.push("Carousel format requires at least one card")), A;
    }
    const m = a, p = o, {
      campaign: i,
      dirty: $,
      customValidatorErrors: C,
      getValidationWithWarnings: h,
      update: L,
      updateMessage: B,
      undo: F,
      redo: z,
      canUndo: ee,
      canRedo: G,
      resetMessage: ge,
      hooks: S
    } = Fe({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (y) => {
          var M;
          const A = c(y), W = (M = m.hooks) != null && M.customValidators ? await m.hooks.customValidators(y) : [];
          return [...A, ...W];
        }
      },
      onDirty: () => p("change", i.value)
    }), { lastSavedAt: _ } = qe(i, { channel: "whatsapp" });
    function U(y) {
      (y.metaKey || y.ctrlKey) && y.key === "z" && (y.preventDefault(), y.shiftKey ? z() : F());
    }
    De(() => {
      window.addEventListener("keydown", U);
    }), We(() => {
      window.removeEventListener("keydown", U);
    }), Ae(i, (y) => p("update:modelValue", y), { deep: !0 });
    const ne = se(), q = se(!0);
    async function ye() {
      if (S.estimateReach)
        try {
          ne.value = await S.estimateReach(i.value.audience);
        } catch {
          ne.value = void 0;
        }
      S.canSend && (q.value = await Promise.resolve(S.canSend()));
    }
    ye(), Ae(() => i.value.audience, ye, { deep: !0 });
    const fe = x(() => (C.value, h(ne.value))), ve = x(() => fe.value.blockingErrors), me = x(() => fe.value.warnings), ie = x(() => fe.value.valid), he = x(() => {
      var M, V, Y;
      const y = i.value.message, A = [
        !!((M = y.template_name) != null && M.trim()),
        !!((V = y.template_category) != null && V.trim()),
        !!(y.body ?? "").toString().trim(),
        !!((Y = y.template_language) != null && Y.trim()),
        Array.isArray(y.buttons) ? y.buttons.length > 0 : !1
      ], W = A.filter(Boolean).length;
      return Math.round(W / A.length * 100);
    }), O = x(() => he.value >= 90 ? "Production ready" : he.value >= 70 ? "Strong draft" : he.value >= 40 ? "In progress" : "Needs setup"), ue = se(""), le = se(!1), I = se(null), _e = x(() => {
      const y = ue.value;
      return y ? Ee.find((A) => A.id === y) ?? null : null;
    }), T = x(() => {
      const y = i.value.message.body ?? "";
      return _e.value ? Pe(y, _e.value.data) : y;
    }), b = x(() => {
      const y = i.value.message.header ?? "";
      return _e.value ? Pe(y, _e.value.data) : y;
    }), re = x(() => {
      const y = i.value.message, A = y.template_type ?? "text", W = y.header_type ?? "none";
      let M, V, Y, Ce, j, w, te;
      (A === "image" || W === "image") && y.media_url ? M = { type: "image", url: y.media_url } : (A === "video" || W === "video") && y.media_url ? M = { type: "video", url: y.media_url } : A === "document" || W === "document" ? M = {
        type: "document",
        filename: y.document_filename || y.media_url || "document.pdf"
      } : W === "text" && y.header ? M = { type: "text", text: b.value } : y.header && (M = { type: "text", text: b.value });
      const be = T.value || "Start adding content to see a live preview here.";
      if (A === "location" && y.location) {
        const d = y.location, f = d.lat ?? d.latitude, E = d.lng ?? d.lon ?? d.longitude;
        f != null && E != null && (V = {
          lat: f,
          lng: E,
          name: d.name ?? d.title,
          address: d.address ?? `${f}, ${E}`
        });
      }
      (A === "catalog" || A === "mpm") && Array.isArray(y.products) && y.products.length && (Y = !0, Ce = y.products.map((d) => ({
        image: d.image ?? d.imageUrl,
        name: d.name ?? d.sectionTitle ?? d.title ?? "Product",
        price: d.price ?? d.productId ?? ""
      }))), A === "carousel" && Array.isArray(y.cards) && y.cards.length && (Y = !0, Ce = y.cards.map((d) => ({
        image: d.image ?? d.media_url,
        name: d.title ?? "Card",
        price: d.button_label ?? ""
      }))), A === "coupon" && y.coupon_code && (j = { code: y.coupon_code }), A === "lto" && y.lto_expiry && (w = y.lto_expiry), A === "auth" && (te = { code: y.auth_code ?? y.otp_code ?? "123 456" });
      const P = y.buttons ?? [];
      return A === "flow" && P.push({
        label: y.flow_cta_label ?? "Open flow"
      }), {
        format: A,
        templateName: y.template_name || void 0,
        templateLanguage: y.template_language || void 0,
        templateCategory: y.template_category || void 0,
        header: M,
        body: be,
        mediaCaption: y.media_caption || void 0,
        footer: y.footer || void 0,
        buttons: P.map((d) => ({ text: d.label || "Button" })),
        location: V,
        catalog: Y,
        multiProduct: Ce,
        coupon: j,
        limitedOffer: w,
        auth: te,
        flow: A === "flow" ? {
          id: y.flow_id || void 0,
          ctaLabel: y.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function ce(y) {
      const A = i.value, W = y.campaign.message ? { ...A.message, ...y.campaign.message } : A.message;
      L({
        ...y.campaign,
        message: W
      }), I.value = null, le.value = !1;
    }
    function $e(y) {
      const A = y.target.value;
      if (!A) return;
      const W = ut.find((M) => M.id === A);
      W && ($.value ? (I.value = W, le.value = !0) : ce(W), y.target.value = "");
    }
    function ke(y) {
      L({
        name: y,
        tracking: { ...i.value.tracking ?? {}, campaign_name: y }
      });
    }
    function R(y) {
      const A = ` {{ ${y.variable} }}`, W = i.value.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...W, y.variable]));
      if (y.field === "title") {
        const V = i.value.message.header ?? "";
        B({
          variables: M,
          header: V + A
        });
      } else {
        const V = i.value.message.body ?? "";
        B({
          variables: M,
          body: V + A
        });
      }
    }
    function ae() {
      ie.value && p("save", i.value);
    }
    return (y, A) => (s(), n("div", wi, [
      e("div", $i, [
        Ie(je, {
          "campaign-name": u(i).name,
          status: u(i).status,
          dirty: u($),
          "last-saved-at": u(_),
          "can-undo": u(ee),
          "can-redo": u(G),
          "slugify-name": m.enforceSlugName,
          "onUpdate:campaignName": ke,
          onUndo: u(F),
          onRedo: u(z)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: de({
            background: u(oe).dangerBg,
            border: `1px solid ${u(oe).dangerBorder}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[12]}px ${u(Z)[16]}px`,
            marginBottom: `${u(Z)[16]}px`
          })
        }, [
          e("ul", {
            style: de({ margin: 0, paddingLeft: "1.25rem", color: u(oe).danger })
          }, [
            (s(!0), n(K, null, J(ve.value, (W) => (s(), n("li", {
              key: W.message
            }, g(W.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        me.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: de({
            background: u(oe).neutral.bg,
            border: `1px solid ${u(oe).neutral.border}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[12]}px ${u(Z)[16]}px`,
            marginBottom: `${u(Z)[16]}px`,
            fontSize: "0.875rem",
            color: u(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: de({ display: "block", marginBottom: `${u(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", xi, [
            (s(!0), n(K, null, J(me.value, (W) => (s(), n("li", {
              key: W.message
            }, g(W.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", Si, [
        e("aside", Ci, [
          a.disabledSections.includes("whatsapp") ? k("", !0) : (s(), n("div", Ii, [
            e("div", Ai, [
              e("div", Ui, [
                A[6] || (A[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                e("span", Li, g(O.value), 1)
              ]),
              e("div", Bi, [
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: $e
                }, [
                  A[7] || (A[7] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, J(u(ut), (W) => (s(), n("option", {
                    key: W.id,
                    value: W.id
                  }, g(W.label), 9, Ri))), 128))
                ], 32)
              ]),
              e("div", Ti, [
                e("div", Pi, [
                  A[8] || (A[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                  e("span", Vi, g(he.value) + "%", 1)
                ]),
                e("div", Ei, [
                  e("span", {
                    class: "kb-wa-health-fill",
                    style: de({ width: `${he.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(Ro, {
              message: u(i).message,
              "show-reset": !0,
              onUpdate: u(B),
              onReset: A[0] || (A[0] = (W) => u(ge)())
            }, null, 8, ["message", "onUpdate"]),
            Ie(At, {
              message: u(i).message,
              "variable-options": a.variableOptions,
              onUpdate: u(B),
              onInsertVariable: R
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Oi, [
          !a.designOnly && u(i).audience.test_mode ? (s(), n("div", Mi, [...A[9] || (A[9] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", Ni, [
            e("div", Di, [
              e("label", Wi, [
                A[11] || (A[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": A[1] || (A[1] = (W) => ue.value = W),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  A[10] || (A[10] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, J(u(Ee), (W) => (s(), n("option", {
                    key: W.id,
                    value: W.id
                  }, g(W.label), 9, Hi))), 128))
                ], 512), [
                  [Ne, ue.value]
                ])
              ]),
              e("div", zi, [
                A[12] || (A[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, g(u(i).message.template_type || "text"), 1)
              ])
            ]),
            e("div", Fi, [
              Ie(_i, { template: re.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", qi, [
        m.actionsNote ? (s(), n("div", ji, g(m.actionsNote), 1)) : k("", !0),
        e("div", Ki, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: A[2] || (A[2] = (W) => p("duplicate", JSON.parse(JSON.stringify(u(i)))))
          }, " Duplicate ")) : k("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: ae
          }, " Save ")) : k("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: A[3] || (A[3] = (W) => p("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      le.value ? (s(), n("div", Yi, [
        e("div", Ji, [
          A[13] || (A[13] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          A[14] || (A[14] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Gi, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: A[4] || (A[4] = (W) => {
                le.value = !1, I.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: A[5] || (A[5] = (W) => I.value && ce(I.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0)
    ]));
  }
}), Bt = /* @__PURE__ */ Se(Xi, [["__scopeId", "data-v-3b493355"]]), Qi = { class: "kb-section" }, Zi = { class: "kb-section__head" }, er = { class: "kb-field" }, tr = ["value"], ar = { class: "kb-field" }, sr = { class: "kb-label" }, nr = { key: 0 }, lr = { key: 1 }, or = { key: 2 }, ir = ["value"], rr = {
  key: 0,
  class: "kb-truncation-hint"
}, dr = { class: "kb-field" }, ur = { class: "kb-insert-row" }, cr = ["value"], pr = { class: "kb-field" }, mr = { class: "kb-insert-row" }, vr = /* @__PURE__ */ we({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    const c = a, m = o, p = ["first_name", "last_name", "order_id", "city"], i = se(c.variableOptions && c.variableOptions.length ? [...c.variableOptions] : p), $ = se(i.value[0] ?? p[0]), C = se("");
    Ae(
      () => c.variableOptions,
      (S) => {
        S && S.length && (i.value = [...S], i.value.includes($.value) || ($.value = i.value[0]));
      }
    );
    const h = x(() => c.message.body ?? ""), L = x(() => h.value.length), B = x(() => L.value ? L.value <= 160 ? 1 : Math.ceil(L.value / 153) : 0), F = x(() => {
      const S = L.value;
      return S <= 160 ? null : S <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function z(S) {
      const _ = S.target.value;
      m("update", {
        sender_id: _ || void 0
      });
    }
    function ee(S) {
      const _ = S.target.value;
      m("update", {
        body: _
      });
    }
    function G() {
      const S = $.value;
      if (!S) return;
      const _ = ` {{ ${S} }}`, U = h.value || "", ne = c.message.variables ?? [], q = Array.from(/* @__PURE__ */ new Set([...ne, S]));
      m("update", {
        body: U + _,
        variables: q
      });
    }
    function ge() {
      const S = C.value.trim();
      S && (i.value.includes(S) || (i.value = [...i.value, S]), $.value = S, C.value = "");
    }
    return (S, _) => (s(), n("section", Qi, [
      e("div", Zi, [
        _[3] || (_[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: _[0] || (_[0] = (U) => S.$emit("reset"))
        }, " Reset section ")) : k("", !0)
      ]),
      _[10] || (_[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", er, [
        _[4] || (_[4] = e("label", { class: "kb-label" }, [
          X(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: c.message.sender_id ?? "",
          onInput: z
        }, null, 40, tr)
      ]),
      e("div", ar, [
        e("label", sr, [
          _[5] || (_[5] = X(" Message body ", -1)),
          e("span", {
            class: xe(["kb-counter", { "kb-counter--warn": B.value > 3 }])
          }, [
            X(g(L.value) + " chars · ", 1),
            B.value === 0 ? (s(), n("span", nr, "0 segments")) : B.value === 1 ? (s(), n("span", lr, "1 segment")) : (s(), n("span", or, g(B.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: h.value,
          onInput: ee
        }, null, 40, ir),
        _[6] || (_[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        F.value ? (s(), n("p", rr, g(F.value), 1)) : k("", !0)
      ]),
      e("div", dr, [
        _[7] || (_[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", ur, [
          Re(e("select", {
            "onUpdate:modelValue": _[1] || (_[1] = (U) => $.value = U),
            class: "kb-select"
          }, [
            (s(!0), n(K, null, J(i.value, (U) => (s(), n("option", {
              key: U,
              value: U
            }, g(U), 9, cr))), 128))
          ], 512), [
            [Ne, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: G
          }, " Insert into message ")
        ]),
        _[8] || (_[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", pr, [
        _[9] || (_[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", mr, [
          Re(e("input", {
            "onUpdate:modelValue": _[2] || (_[2] = (U) => C.value = U),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [et, C.value]
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
}), br = /* @__PURE__ */ Se(vr, [["__scopeId", "data-v-5e9aa8e6"]]), gr = { class: "keos-sms-builder" }, fr = { class: "kb-builder-top" }, yr = { style: { margin: 0, paddingLeft: "1.25rem" } }, hr = { class: "kb-sms-layout" }, kr = { class: "kb-sms-sidebar" }, _r = {
  key: 0,
  class: "kb-sms-form"
}, wr = { class: "kb-sms-form-head" }, $r = { class: "kb-wa-form-head-row" }, xr = ["value"], Sr = { class: "kb-sms-canvas" }, Cr = {
  key: 0,
  class: "kb-sms-test-banner"
}, Ir = { class: "kb-sms-preview-chrome" }, Ar = { class: "kb-push-preview-controls" }, Ur = { class: "kb-push-preview-as" }, Lr = ["value"], Br = { class: "kb-sms-preview-frame" }, Rr = { class: "kb-preview" }, Tr = { class: "kb-sms-preview" }, Pr = { class: "kb-sms-phone" }, Vr = { class: "kb-sms-header" }, Er = { class: "kb-sms-sender" }, Or = { class: "kb-sms-thread" }, Mr = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, Nr = { class: "kb-sms-text" }, Dr = { class: "kb-sms-counter" }, Wr = { key: 0 }, Hr = { key: 1 }, zr = { key: 2 }, Fr = {
  key: 3,
  class: "kb-sms-cost"
}, qr = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, jr = { class: "kb-sms-actions" }, Kr = {
  key: 0,
  class: "kb-actions-note"
}, Yr = { class: "kb-sms-actions-right" }, Jr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Gr = { class: "kb-confirm-dialog" }, Xr = { class: "kb-confirm-actions" }, Qr = /* @__PURE__ */ we({
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
    const c = a, m = o, {
      campaign: p,
      dirty: i,
      customValidatorErrors: $,
      getValidationWithWarnings: C,
      update: h,
      updateMessage: L,
      undo: B,
      redo: F,
      canUndo: z,
      canRedo: ee,
      resetMessage: G,
      hooks: ge
    } = Fe({
      initial: c.modelValue,
      hooks: {
        ...c.hooks,
        customValidators: async (M) => {
          var Ce, j;
          const V = [];
          (Ce = M.name) != null && Ce.trim() || V.push("Template name is required");
          const Y = (j = c.hooks) != null && j.customValidators ? await c.hooks.customValidators(M) : [];
          return [...V, ...Y];
        }
      },
      onDirty: () => m("change", p.value)
    }), { lastSavedAt: S } = qe(p, { channel: "sms" });
    function _(M) {
      (M.metaKey || M.ctrlKey) && M.key === "z" && (M.preventDefault(), M.shiftKey ? F() : B());
    }
    De(() => {
      window.addEventListener("keydown", _);
    }), We(() => {
      window.removeEventListener("keydown", _);
    }), Ae(p, (M) => m("update:modelValue", M), { deep: !0 });
    const U = se(), ne = se(!0);
    async function q() {
      if (ge.estimateReach)
        try {
          U.value = await ge.estimateReach(p.value.audience);
        } catch {
          U.value = void 0;
        }
      ge.canSend && (ne.value = await Promise.resolve(ge.canSend()));
    }
    q(), Ae(() => p.value.audience, q, { deep: !0 });
    const ye = x(() => ($.value, C(U.value))), fe = x(() => ye.value.blockingErrors), ve = x(() => ye.value.warnings), me = x(() => ye.value.valid), ie = x(
      () => p.value.template_type ?? "transactional"
    ), he = se(""), O = se(!1), ue = se(null), le = x(() => {
      const M = he.value;
      return M ? Ee.find((V) => V.id === M) ?? null : null;
    }), I = x(() => {
      const M = ce.value;
      return le.value ? Pe(M, le.value.data) : M;
    });
    function _e(M) {
      const V = p.value, Y = M.campaign.message ? { ...V.message, ...M.campaign.message } : V.message;
      h({
        ...M.campaign,
        message: Y
      }), ue.value = null, O.value = !1;
    }
    function T(M) {
      const V = M.target.value;
      if (!V) return;
      const Y = ct.find((Ce) => Ce.id === V);
      Y && (i.value ? (ue.value = Y, O.value = !0) : _e(Y), M.target.value = "");
    }
    function b(M) {
      h({ template_type: M });
    }
    function re(M) {
      h({
        name: M,
        tracking: { ...p.value.tracking ?? {}, campaign_name: M }
      });
    }
    const ce = x(
      () => (p.value.message.body ?? "") || ""
    ), $e = x(() => ce.value.length), ke = x(() => $e.value ? $e.value <= 160 ? 1 : Math.ceil($e.value / 153) : 0), R = x(() => {
      const M = I.value;
      return M.trim().length ? M : "Your SMS message preview will appear here.";
    }), ae = x(() => {
      const M = c.costPerSegment ?? 0;
      return !M || ke.value === 0 ? null : (ke.value * M).toFixed(2);
    }), y = x(() => {
      const M = $e.value;
      return M <= 160 ? null : M <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), A = x(
      () => p.value.message.sender_id ?? "YourBrand"
    );
    function W() {
      me.value && m("save", p.value);
    }
    return (M, V) => (s(), n("div", gr, [
      e("div", fr, [
        Ie(je, {
          "campaign-name": u(p).name,
          status: u(p).status,
          dirty: u(i),
          "last-saved-at": u(S),
          "can-undo": u(z),
          "can-redo": u(ee),
          "slugify-name": c.enforceSlugName,
          "onUpdate:campaignName": re,
          onUndo: u(B),
          onRedo: u(F)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        fe.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: de({
            background: u(oe).dangerBg,
            border: `1px solid ${u(oe).dangerBorder}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[12]}px ${u(Z)[16]}px`,
            marginBottom: `${u(Z)[16]}px`
          })
        }, [
          e("ul", {
            style: de({ margin: 0, paddingLeft: "1.25rem", color: u(oe).danger })
          }, [
            (s(!0), n(K, null, J(fe.value, (Y) => (s(), n("li", {
              key: Y.message
            }, g(Y.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        ve.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: de({
            background: u(oe).neutral.bg,
            border: `1px solid ${u(oe).neutral.border}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[12]}px ${u(Z)[16]}px`,
            marginBottom: `${u(Z)[16]}px`,
            fontSize: "0.875rem",
            color: u(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: de({ display: "block", marginBottom: `${u(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", yr, [
            (s(!0), n(K, null, J(ve.value, (Y) => (s(), n("li", {
              key: Y.message
            }, g(Y.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", hr, [
        e("aside", kr, [
          a.disabledSections.includes("sms") ? k("", !0) : (s(), n("div", _r, [
            e("div", wr, [
              V[7] || (V[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", $r, [
                Ie(lt, {
                  "template-type": ie.value,
                  onUpdate: b
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: T
                }, [
                  V[6] || (V[6] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, J(u(ct), (Y) => (s(), n("option", {
                    key: Y.id,
                    value: Y.id
                  }, g(Y.label), 9, xr))), 128))
                ], 32)
              ])
            ]),
            Ie(br, {
              message: u(p).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: u(L),
              onReset: V[0] || (V[0] = (Y) => u(G)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Sr, [
          !a.designOnly && u(p).audience.test_mode ? (s(), n("div", Cr, [...V[8] || (V[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", Ir, [
            e("div", Ar, [
              e("label", Ur, [
                V[10] || (V[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": V[1] || (V[1] = (Y) => he.value = Y),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  V[9] || (V[9] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, J(u(Ee), (Y) => (s(), n("option", {
                    key: Y.id,
                    value: Y.id
                  }, g(Y.label), 9, Lr))), 128))
                ], 512), [
                  [Ne, he.value]
                ])
              ])
            ]),
            e("div", Br, [
              e("div", Rr, [
                e("div", Tr, [
                  e("div", Pr, [
                    V[13] || (V[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", Vr, [
                      e("div", Er, g(A.value), 1),
                      V[11] || (V[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", Or, [
                      e("div", Mr, [
                        e("span", Nr, g(R.value), 1),
                        V[12] || (V[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", Dr, [
                    X(g($e.value) + " characters · ", 1),
                    ke.value === 0 ? (s(), n("span", Wr, "0 segments")) : ke.value === 1 ? (s(), n("span", Hr, "1 segment")) : (s(), n("span", zr, g(ke.value) + " segments", 1)),
                    V[14] || (V[14] = X(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    ae.value !== null ? (s(), n("span", Fr, " · Est. " + g(ae.value), 1)) : k("", !0)
                  ]),
                  y.value ? (s(), n("p", qr, g(y.value), 1)) : k("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", jr, [
        c.actionsNote ? (s(), n("div", Kr, g(c.actionsNote), 1)) : k("", !0),
        e("div", Yr, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: V[2] || (V[2] = (Y) => m("duplicate", JSON.parse(JSON.stringify(u(p)))))
          }, " Duplicate ")) : k("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: W
          }, " Save ")) : k("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: V[3] || (V[3] = (Y) => m("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      O.value ? (s(), n("div", Jr, [
        e("div", Gr, [
          V[15] || (V[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          V[16] || (V[16] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Xr, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: V[4] || (V[4] = (Y) => {
                O.value = !1, ue.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: V[5] || (V[5] = (Y) => ue.value && _e(ue.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0)
    ]));
  }
}), Rt = /* @__PURE__ */ Se(Qr, [["__scopeId", "data-v-8cc0cf01"]]), Zr = 30, ed = 60, td = 130;
function ad(a) {
  const o = (a ?? "").trim().length;
  return o < Zr ? "too_short" : o <= ed ? "good" : "too_long";
}
function sd(a) {
  const o = (a ?? "").trim().length;
  return o === 0 ? "too_short" : o <= td ? "good" : "too_long";
}
const nd = [
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
  for (const c of nd) {
    const m = a.match(c);
    m && o.push(m[0]);
  }
  return o;
}
function ld(a) {
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
function od(a) {
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
const id = { class: "em-section" }, rd = { class: "em-strip" }, dd = { class: "em-strip-head" }, ud = { class: "em-field" }, cd = ["value"], pd = { class: "em-field" }, md = ["value"], vd = { class: "em-field" }, bd = ["value"], gd = { class: "em-field" }, fd = { class: "em-input-group" }, yd = ["value"], hd = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, kd = { class: "em-field" }, _d = { class: "em-input-group" }, wd = ["value"], $d = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, xd = { class: "em-strip em-strip--library" }, Sd = { class: "em-library-chips" }, Cd = ["onClick"], Id = { class: "em-strip em-strip--blocks" }, Ad = { class: "em-block-list" }, Ud = ["data-type"], Ld = { class: "em-block-bar" }, Bd = { class: "em-block-type" }, Rd = { class: "em-block-actions" }, Td = ["disabled", "onClick"], Pd = ["disabled", "onClick"], Vd = ["onClick"], Ed = {
  key: 0,
  class: "em-block-fields"
}, Od = ["value", "onChange"], Md = ["value", "onInput"], Nd = ["onClick"], Dd = {
  key: 1,
  class: "em-block-fields"
}, Wd = ["value", "onInput"], Hd = ["onClick"], zd = {
  key: 2,
  class: "em-block-fields"
}, Fd = ["value", "onInput"], qd = ["value", "onInput"], jd = ["value", "onInput"], Kd = {
  key: 3,
  class: "em-block-fields"
}, Yd = ["value", "onInput"], Jd = ["value", "onInput"], Gd = { class: "em-block-fields--row" }, Xd = ["value", "onInput"], Qd = { class: "em-check-row" }, Zd = ["checked", "onChange"], eu = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, tu = ["value", "onInput"], au = {
  key: 5,
  class: "em-block-fields"
}, su = ["value", "onInput"], nu = ["value", "onInput"], lu = ["value", "onInput"], ou = ["onClick"], iu = {
  key: 6,
  class: "em-block-fields"
}, ru = ["value", "onChange"], du = { class: "em-list-items" }, uu = ["value", "onInput", "placeholder"], cu = ["onClick"], pu = ["onClick"], mu = {
  key: 7,
  class: "em-block-fields"
}, vu = ["value", "onChange"], bu = ["value", "onInput"], gu = ["onClick"], fu = {
  key: 8,
  class: "em-block-fields"
}, yu = { class: "em-social-links" }, hu = ["value", "onChange"], ku = ["value", "onInput"], _u = ["onClick"], wu = ["onClick"], $u = {
  key: 9,
  class: "em-block-fields"
}, xu = ["value", "onInput"], Su = ["value", "onInput"], Cu = ["value", "onInput"], Iu = {
  key: 10,
  class: "em-block-fields"
}, Au = ["value", "onInput"], Uu = { class: "em-link-list-items" }, Lu = ["value", "onInput"], Bu = ["value", "onInput"], Ru = ["onClick"], Tu = ["onClick"], Pu = {
  key: 11,
  class: "em-block-fields"
}, Vu = ["value", "onInput"], Eu = ["onClick"], Ou = ["value", "onInput"], Mu = ["onClick"], Nu = {
  key: 12,
  class: "em-block-fields"
}, Du = { class: "em-block-fields--row" }, Wu = ["value", "onInput"], Hu = { class: "em-block-fields--row" }, zu = ["value", "onInput"], Fu = ["value", "onChange"], qu = {
  key: 13,
  class: "em-block-fields"
}, ju = ["value", "onChange"], Ku = { class: "em-inline-label" }, Yu = ["value", "onInput"], Ju = ["onClick"], Gu = {
  key: 14,
  class: "em-block-fields"
}, Xu = ["value", "onInput"], Qu = { class: "em-link-list-items" }, Zu = ["value", "onInput"], ec = ["value", "onInput"], tc = ["onClick"], ac = ["onClick"], sc = {
  key: 15,
  class: "em-block-fields"
}, nc = ["value", "onInput"], lc = ["value", "onInput"], oc = ["onClick"], ic = ["onClick"], rc = {
  key: 16,
  class: "em-block-fields"
}, dc = ["value", "onInput"], uc = ["value", "onInput"], cc = ["value", "onInput"], pc = ["onClick"], mc = ["onClick"], vc = {
  key: 17,
  class: "em-block-fields"
}, bc = ["value", "onInput"], gc = ["value", "onInput"], fc = {
  key: 18,
  class: "em-block-fields"
}, yc = ["value", "onInput"], hc = ["value", "onInput"], kc = ["value", "onInput"], _c = ["value", "onInput"], wc = ["value", "onInput"], $c = {
  key: 19,
  class: "em-block-fields"
}, xc = ["value", "onInput"], Sc = ["onClick"], Cc = {
  key: 20,
  class: "em-block-fields"
}, Ic = ["value", "onInput"], Ac = ["value", "onInput"], Uc = ["onClick"], Lc = {
  key: 21,
  class: "em-block-fields"
}, Bc = ["value", "onInput"], Rc = { class: "em-block-fields--row" }, Tc = ["value", "onInput"], Pc = {
  key: 22,
  class: "em-block-fields"
}, Vc = ["value", "onInput"], Ec = ["value", "onInput"], Oc = ["value", "onInput"], Mc = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Nc = ["value", "onChange"], Dc = { class: "em-check-row" }, Wc = ["checked", "onChange"], Hc = { class: "em-add-bar" }, zc = { class: "em-add-bar-btns" }, Fc = { class: "em-strip em-strip--personalize" }, qc = { class: "em-field" }, jc = { class: "em-input-group" }, Kc = ["value"], Yc = { class: "em-field" }, Jc = { class: "em-input-group" }, Be = "{{ var }}", Gc = /* @__PURE__ */ we({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: o }) {
    var pe;
    function c() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const m = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], p = [
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
    const $ = a, C = o, h = ["first_name", "last_name", "order_id", "city", "email"], L = se(
      (pe = $.variableOptions) != null && pe.length ? [...$.variableOptions] : h
    ), B = se(L.value[0] ?? "first_name"), F = se("");
    Ae(
      () => $.variableOptions,
      (v) => {
        v != null && v.length && (L.value = [...v], L.value.includes(B.value) || (B.value = L.value[0]));
      }
    );
    const z = x(() => $.message.subject ?? ""), ee = x(() => $.message.preview_text ?? ""), G = x(() => ad(z.value)), ge = x(() => sd(ee.value)), S = x(() => ht(z.value)), _ = x(() => ht(ee.value)), U = x(() => {
      const v = $.message.blocks;
      return Array.isArray(v) && v.length > 0 ? v : [i("paragraph")];
    });
    Ae(
      () => $.message.blocks,
      (v) => {
        (!Array.isArray(v) || v.length === 0) && C("update", { blocks: [i("paragraph")] });
      },
      { immediate: !0 }
    );
    function ne(v) {
      C("update", { blocks: v });
    }
    function q(v) {
      C("update", { subject: v.target.value });
    }
    function ye(v) {
      const l = v.target.value;
      C("update", { preview_text: l || void 0 });
    }
    function fe(v) {
      C("update", { from_name: v.target.value || void 0 });
    }
    function ve(v) {
      C("update", { from_address: v.target.value || void 0 });
    }
    function me(v) {
      C("update", { reply_to: v.target.value || void 0 });
    }
    const ie = [
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
    function he(v) {
      const l = v.blocks();
      ne([...U.value, ...l]);
    }
    function O(v) {
      const l = [...U.value, i(v)];
      ne(l);
    }
    function ue(v) {
      ne(U.value.filter((l) => l.id !== v));
    }
    function le(v, l) {
      const t = U.value.findIndex((N) => N.id === v);
      if (t < 0) return;
      const H = l === "up" ? t - 1 : t + 1;
      if (H < 0 || H >= U.value.length) return;
      const r = [...U.value];
      [r[t], r[H]] = [r[H], r[t]], ne(r);
    }
    function I(v, l) {
      const t = U.value.map((H) => H.id === v ? { ...H, ...l } : H);
      ne(t);
    }
    function _e(v, l, t) {
      const H = U.value.find((N) => N.id === v);
      if (!H || H.type !== "list") return;
      const r = [...H.items || []];
      r[l] = t, I(v, { items: r });
    }
    function T(v) {
      const l = U.value.find((t) => t.id === v);
      !l || l.type !== "list" || I(v, { items: [...l.items || [], "New item"] });
    }
    function b(v, l) {
      const t = U.value.find((r) => r.id === v);
      if (!t || t.type !== "list") return;
      const H = (t.items || []).filter((r, N) => N !== l);
      I(v, { items: H });
    }
    function re(v, l, t, H) {
      const r = U.value.find((D) => D.id === v);
      if (!r || r.type !== "social") return;
      const N = (r.links || []).map((D, Ue) => Ue === l ? { ...D, [t]: H } : D);
      I(v, { links: N });
    }
    function ce(v) {
      const l = U.value.find((t) => t.id === v);
      !l || l.type !== "social" || I(v, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function $e(v, l) {
      const t = U.value.find((r) => r.id === v);
      if (!t || t.type !== "social") return;
      const H = (t.links || []).filter((r, N) => N !== l);
      I(v, { links: H });
    }
    function ke(v, l, t, H) {
      const r = U.value.find((D) => D.id === v);
      if (!r || r.type !== "link_list") return;
      const N = (r.links || []).map((D, Ue) => Ue === l ? { ...D, [t]: H } : D);
      I(v, { links: N });
    }
    function R(v) {
      const l = U.value.find((t) => t.id === v);
      !l || l.type !== "link_list" || I(v, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function ae(v, l) {
      const t = U.value.find((r) => r.id === v);
      if (!t || t.type !== "link_list") return;
      const H = (t.links || []).filter((r, N) => N !== l);
      I(v, { links: H });
    }
    function y(v, l) {
      const t = U.value.find((Oe) => Oe.id === v);
      if (!t || t.type !== "columns") return;
      const H = ` {{ ${B.value} }}`, r = $.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...r, B.value])), D = l === "left" ? "leftContent" : "rightContent", Ke = (t[D] ?? "") + H;
      I(v, { [D]: Ke }), C("update", { variables: N });
    }
    function A(v, l) {
      const t = U.value.find((H) => H.id === v);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const H = [...t.cells || []];
          for (; H.length < l.columnCount; ) H.push("Cell content");
          l.cells = H.slice(0, l.columnCount);
        }
        I(v, l);
      }
    }
    function W(v, l, t) {
      const H = U.value.find((N) => N.id === v);
      if (!H || H.type !== "row") return;
      const r = [...H.cells || []];
      r[l] = t, I(v, { cells: r });
    }
    function M(v, l, t, H) {
      const r = U.value.find((D) => D.id === v);
      if (!r || r.type !== "navbar") return;
      const N = (r.links || []).map((D, Ue) => Ue === l ? { ...D, [t]: H } : D);
      I(v, { links: N });
    }
    function V(v) {
      const l = U.value.find((t) => t.id === v);
      !l || l.type !== "navbar" || I(v, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function Y(v, l) {
      const t = U.value.find((H) => H.id === v);
      !t || t.type !== "navbar" || I(v, { links: (t.links || []).filter((H, r) => r !== l) });
    }
    function Ce(v, l, t, H) {
      const r = U.value.find((D) => D.id === v);
      if (!r || r.type !== "accordion") return;
      const N = (r.items || []).map((D, Ue) => Ue === l ? { ...D, [t]: H } : D);
      I(v, { items: N });
    }
    function j(v) {
      const l = U.value.find((t) => t.id === v);
      !l || l.type !== "accordion" || I(v, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function w(v, l) {
      const t = U.value.find((H) => H.id === v);
      !t || t.type !== "accordion" || I(v, { items: (t.items || []).filter((H, r) => r !== l) });
    }
    function te(v, l, t, H) {
      const r = U.value.find((D) => D.id === v);
      if (!r || r.type !== "carousel") return;
      const N = (r.slides || []).map((D, Ue) => Ue === l ? { ...D, [t]: H } : D);
      I(v, { slides: N });
    }
    function be(v) {
      const l = U.value.find((t) => t.id === v);
      !l || l.type !== "carousel" || I(v, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function P(v, l) {
      const t = U.value.find((H) => H.id === v);
      !t || t.type !== "carousel" || I(v, { slides: (t.slides || []).filter((H, r) => r !== l) });
    }
    function d(v) {
      const l = ` {{ ${B.value} }}`, t = $.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...t, B.value]));
      v === "subject" ? C("update", {
        subject: (z.value || "") + l,
        variables: H
      }) : C("update", {
        preview_text: (ee.value || "") + l,
        variables: H
      });
    }
    function f(v) {
      const l = U.value.find((Oe) => Oe.id === v);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const t = ` {{ ${B.value} }}`, H = $.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...H, B.value])), N = (l.type === "footer", "content"), Ue = (l[N] ?? "") + t, Ke = U.value.map(
        (Oe) => Oe.id === v ? { ...Oe, [N]: Ue } : Oe
      );
      C("update", { blocks: Ke, variables: r });
    }
    function E(v, l) {
      const t = U.value.find((Ue) => Ue.id === v);
      if (!t || t.type !== "row") return;
      const H = ` {{ ${B.value} }}`, r = $.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...r, B.value])), D = [...t.cells || []];
      D[l] = (D[l] || "") + H, I(v, { cells: D }), C("update", { variables: N });
    }
    function Q() {
      const v = F.value.trim();
      !v || L.value.includes(v) || (L.value = [...L.value, v], B.value = v, F.value = "");
    }
    return (v, l) => (s(), n("section", id, [
      e("div", rd, [
        e("div", dd, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => v.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", ud, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: a.message.from_name ?? "",
            onInput: fe
          }, null, 40, cd)
        ]),
        e("div", pd, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: a.message.from_address ?? "",
            onInput: ve
          }, null, 40, md)
        ]),
        e("div", vd, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            X("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: a.message.reply_to ?? "",
            onInput: me
          }, null, 40, bd)
        ]),
        e("div", gd, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", fd, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: z.value,
              onInput: q
            }, null, 40, yd),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (t) => d("subject")),
              title: "Insert variable"
            }, g(Be))
          ]),
          e("span", {
            class: xe(["em-analyzer", `em-analyzer--${G.value}`])
          }, g(u(ld)(G.value)), 3),
          S.value.length ? (s(), n("span", hd, "Spammy: " + g(S.value.join(", ")), 1)) : k("", !0)
        ]),
        e("div", kd, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            X("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", _d, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: ee.value,
              onInput: ye
            }, null, 40, wd),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (t) => d("preview")),
              title: "Insert variable"
            }, g(Be))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: xe(["em-analyzer", `em-analyzer--${ge.value}`])
          }, g(u(od)(ge.value)), 3),
          _.value.length ? (s(), n("span", $d, "Spammy: " + g(_.value.join(", ")), 1)) : k("", !0)
        ])
      ]),
      e("div", xd, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Sd, [
          (s(), n(K, null, J(ie, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (H) => he(t)
          }, g(t.label), 9, Cd)), 64))
        ])
      ]),
      e("div", Id, [
        l[63] || (l[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[64] || (l[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Ad, [
          (s(!0), n(K, null, J(U.value, (t, H) => (s(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Ld, [
              e("span", Bd, g(t.type), 1),
              e("div", Rd, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: H === 0,
                  onClick: (r) => le(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Td),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: H === U.value.length - 1,
                  onClick: (r) => le(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Pd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => ue(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Vd)
              ])
            ]),
            t.type === "heading" ? (s(), n("div", Ed, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (r) => I(t.id, { level: Number(r.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Od),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (r) => I(t.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, Md),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id)
              }, g(Be), 8, Nd)
            ])) : t.type === "paragraph" ? (s(), n("div", Dd, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => I(t.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Wd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id)
              }, g(Be), 8, Hd)
            ])) : t.type === "image" ? (s(), n("div", zd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (r) => I(t.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, Fd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => I(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, qd),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (r) => I(t.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, jd)
            ])) : t.type === "button" ? (s(), n("div", Kd, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (r) => I(t.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Yd),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (r) => I(t.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Jd),
              e("div", Gd, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (r) => I(t.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, Xd)
              ]),
              e("label", Qd, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (r) => I(t.id, { ghost: r.target.checked })
                }, null, 40, Zd),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (s(), n("div", eu, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (r) => I(t.id, { height: Number(r.target.value) || 24 })
              }, null, 40, tu),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (s(), n("div", au, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => I(t.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, su),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (r) => I(t.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, nu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (r) => I(t.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, lu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id)
              }, g(Be), 8, ou)
            ])) : t.type === "list" ? (s(), n("div", iu, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (r) => I(t.id, { style: r.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, ru),
              e("div", du, [
                (s(!0), n(K, null, J(t.items || [], (r, N) => (s(), n("div", {
                  key: N,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (D) => _e(t.id, N, D.target.value),
                    placeholder: `Item ${N + 1}`
                  }, null, 40, uu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => b(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, cu)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => T(t.id)
              }, "+ Add item", 8, pu)
            ])) : t.type === "quote" ? (s(), n("div", mu, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => I(t.id, { style: r.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, vu),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => I(t.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, bu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id)
              }, g(Be), 8, gu)
            ])) : t.type === "social" ? (s(), n("div", fu, [
              e("div", yu, [
                (s(!0), n(K, null, J(t.links || [], (r, N) => (s(), n("div", {
                  key: N,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (D) => re(t.id, N, "platform", D.target.value)
                  }, [...l[45] || (l[45] = [
                    Me('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, hu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (D) => re(t.id, N, "url", D.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, ku),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => $e(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, _u)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ce(t.id)
              }, "+ Add link", 8, wu)
            ])) : t.type === "video" ? (s(), n("div", $u, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (r) => I(t.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, xu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (r) => I(t.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Su),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => I(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Cu)
            ])) : t.type === "link_list" ? (s(), n("div", Iu, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => I(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Au),
              e("div", Uu, [
                (s(!0), n(K, null, J(t.links || [], (r, N) => (s(), n("div", {
                  key: N,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (D) => ke(t.id, N, "text", D.target.value),
                    placeholder: "Label"
                  }, null, 40, Lu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (D) => ke(t.id, N, "url", D.target.value),
                    placeholder: "URL"
                  }, null, 40, Bu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => ae(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Ru)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => R(t.id)
              }, "+ Add link", 8, Tu)
            ])) : t.type === "columns" ? (s(), n("div", Pu, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (r) => I(t.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Vu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => y(t.id, "left")
              }, g(Be), 8, Eu),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (r) => I(t.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Ou),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => y(t.id, "right")
              }, g(Be), 8, Mu)
            ])) : t.type === "divider" ? (s(), n("div", Nu, [
              e("div", Du, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (r) => I(t.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, Wu),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Hu, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (r) => I(t.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, zu)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => I(t.id, { lineStyle: r.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Fu)
            ])) : t.type === "row" ? (s(), n("div", qu, [
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
              ])], 40, ju),
              (s(!0), n(K, null, J(t.cells || [], (r, N) => (s(), n("div", {
                key: N,
                class: "em-row-cell"
              }, [
                e("label", Ku, "Column " + g(N + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (D) => W(t.id, N, D.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Yu),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (D) => E(t.id, N)
                }, g(Be), 8, Ju)
              ]))), 128))
            ])) : t.type === "navbar" ? (s(), n("div", Gu, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (r) => I(t.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Xu),
              e("div", Qu, [
                (s(!0), n(K, null, J(t.links || [], (r, N) => (s(), n("div", {
                  key: N,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (D) => M(t.id, N, "text", D.target.value),
                    placeholder: "Label"
                  }, null, 40, Zu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (D) => M(t.id, N, "url", D.target.value),
                    placeholder: "URL"
                  }, null, 40, ec),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (D) => Y(t.id, N),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, tc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => V(t.id)
              }, "+ Add link", 8, ac)
            ])) : t.type === "accordion" ? (s(), n("div", sc, [
              (s(!0), n(K, null, J(t.items || [], (r, N) => (s(), n("div", {
                key: N,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (D) => Ce(t.id, N, "title", D.target.value),
                  placeholder: "Section title"
                }, null, 40, nc),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (D) => Ce(t.id, N, "content", D.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, lc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (D) => w(t.id, N),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, oc)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => j(t.id)
              }, "+ Add section", 8, ic)
            ])) : t.type === "carousel" ? (s(), n("div", rc, [
              (s(!0), n(K, null, J(t.slides || [], (r, N) => (s(), n("div", {
                key: N,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (D) => te(t.id, N, "imageUrl", D.target.value),
                  placeholder: "Image URL"
                }, null, 40, dc),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (D) => te(t.id, N, "alt", D.target.value),
                  placeholder: "Alt text"
                }, null, 40, uc),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (D) => te(t.id, N, "linkUrl", D.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, cc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (D) => P(t.id, N),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, pc)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => be(t.id)
              }, "+ Add slide", 8, mc)
            ])) : t.type === "countdown" ? (s(), n("div", vc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (r) => I(t.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, bc),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (r) => I(t.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, gc),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (s(), n("div", fc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => I(t.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, yc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (r) => I(t.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, hc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (r) => I(t.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, kc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (r) => I(t.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, _c),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (r) => I(t.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, wc)
            ])) : t.type === "liquid" ? (s(), n("div", $c, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => I(t.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, xc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id)
              }, g(Be), 8, Sc),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (s(), n("div", Cc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (r) => I(t.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Ic),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (r) => I(t.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Ac),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => f(t.id)
              }, g(Be), 8, Uc),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (s(), n("div", Lc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (r) => I(t.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Bc),
              e("div", Rc, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (r) => I(t.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, Tc)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (s(), n("div", Pc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (r) => I(t.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, Vc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (r) => I(t.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, Ec),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (r) => I(t.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Oc)
            ])) : k("", !0),
            p.includes(t.type) ? (s(), n("div", Mc, [
              l[61] || (l[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: t.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (r) => I(t.id, { alignment: r.target.value })
              }, [...l[59] || (l[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, Nc),
              e("label", Dc, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (r) => I(t.id, { fullWidth: r.target.checked })
                }, null, 40, Wc),
                l[60] || (l[60] = e("span", null, "Full width", -1))
              ])
            ])) : k("", !0)
          ], 8, Ud))), 128))
        ]),
        e("div", Hc, [
          l[62] || (l[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", zc, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (t) => O("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (t) => O("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (t) => O("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => O("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => O("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => O("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => O("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => O("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => O("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => O("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => O("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => O("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => O("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => O("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => O("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => O("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => O("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => O("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => O("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => O("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => O("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => O("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => O("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Fc, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", qc, [
          l[65] || (l[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", jc, [
            Re(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => B.value = t),
              class: "em-select em-select--flex"
            }, [
              (s(!0), n(K, null, J(L.value, (t) => (s(), n("option", {
                key: t,
                value: t
              }, g(t), 9, Kc))), 128))
            ], 512), [
              [Ne, B.value]
            ])
          ])
        ]),
        e("div", Yc, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Jc, [
            Re(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => F.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [et, F.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: Q
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Xc = /* @__PURE__ */ Se(Gc, [["__scopeId", "data-v-c4398c5d"]]), Qc = { class: "keos-email-builder" }, Zc = { class: "kb-builder-top" }, ep = { style: { margin: 0, paddingLeft: "1.25rem" } }, tp = { class: "kb-email-layout" }, ap = { class: "kb-email-sidebar" }, sp = {
  key: 0,
  class: "kb-email-form"
}, np = { class: "kb-email-form-head" }, lp = { class: "kb-wa-form-head-row" }, op = ["value"], ip = { class: "kb-email-canvas" }, rp = {
  key: 0,
  class: "kb-email-test-banner"
}, dp = { class: "kb-email-preview-chrome" }, up = { class: "kb-push-preview-controls" }, cp = { class: "kb-push-preview-as" }, pp = ["value"], mp = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, vp = { class: "kb-email-inbox-strip" }, bp = { class: "kb-email-inbox-from" }, gp = { class: "kb-email-inbox-from-name" }, fp = { class: "kb-email-inbox-from-addr" }, yp = { class: "kb-email-inbox-subject" }, hp = ["title"], kp = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, _p = { class: "kb-email-body-canvas" }, wp = ["innerHTML"], $p = { class: "kb-email-actions" }, xp = {
  key: 0,
  class: "kb-actions-note"
}, Sp = { class: "kb-email-actions-right" }, Cp = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Ip = { class: "kb-confirm-dialog" }, Ap = { class: "kb-confirm-actions" }, Up = /* @__PURE__ */ we({
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
    function c(j) {
      if (!Array.isArray(j) || j.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const w = (d) => String(d).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), te = [
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
      ], be = (d, f) => {
        if (!te.includes(f.type)) return d;
        const E = f.alignment || "left", Q = !!f.fullWidth;
        return `<div style="text-align:${E};${Q ? "width:100%;" : ""}">${d}</div>`;
      }, P = [];
      for (const d of j)
        switch (d.type) {
          case "heading": {
            const f = Math.min(3, Math.max(1, Number(d.level) || 1)), E = w(d.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            P.push(
              be(
                `<h${f} style="margin:0 0 12px;font-size:${f === 1 ? "22" : f === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${E || "Heading"}</h${f}>`,
                d
              )
            );
            break;
          }
          case "paragraph": {
            const f = w(d.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            P.push(
              be(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${f || "Paragraph"}</p>`,
                d
              )
            );
            break;
          }
          case "image": {
            const f = (d.src || "").trim(), E = w(d.alt || ""), Q = (d.linkUrl || "").trim(), v = !!d.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", l = f ? `<img src="${w(f)}" alt="${E}" style="${v}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            P.push(
              be(
                `<div style="margin:0 0 12px;">${Q ? `<a href="${w(Q)}" style="color:#2563eb;">${l}</a>` : l}</div>`,
                d
              )
            );
            break;
          }
          case "button": {
            const f = w(d.text || "Button"), E = (d.url || "#").trim(), Q = Math.min(24, Math.max(0, Number(d.borderRadius) ?? 8)), pe = !!d.fullWidth, v = !!d.ghost, l = v ? "transparent" : "#0f172a", t = v ? "#0f172a" : "#fff", H = v ? "2px solid #0f172a" : "none", r = pe ? "block" : "inline-block", N = pe ? "100%" : "auto";
            P.push(
              be(
                `<p style="margin:0 0 12px;"><a href="${w(E)}" style="display:${r};width:${N};text-align:center;padding:12px 24px;background:${l};color:${t};border:${H};text-decoration:none;font-size:14px;font-weight:600;border-radius:${Q}px;">${f}</a></p>`,
                d
              )
            );
            break;
          }
          case "divider": {
            const f = Math.min(8, Math.max(1, Number(d.thickness) || 1)), E = (d.color || "#e2e8f0").trim() || "#e2e8f0", Q = d.lineStyle || "solid";
            P.push(
              be(
                `<hr style="margin:16px 0;border:0;border-top:${f}px ${Q} ${E};" />`,
                d
              )
            );
            break;
          }
          case "spacer": {
            const f = Math.min(120, Math.max(8, Number(d.height) || 24));
            P.push(be(`<div style="height:${f}px;"></div>`, d));
            break;
          }
          case "footer": {
            const f = w(d.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), E = (d.unsubscribeUrl || "").trim(), Q = w(d.companyAddress || "");
            P.push(
              be(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${f || "Footer"}` + (E ? `<p style="margin:8px 0 0;"><a href="${w(E)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (Q ? `<p style="margin:4px 0 0;">${Q}</p>` : "") + "</div>",
                d
              )
            );
            break;
          }
          case "list": {
            const f = d.style === "numbered" ? "ol" : "ul", Q = (Array.isArray(d.items) ? d.items : []).map(
              (pe) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${w(String(pe)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            P.push(
              be(
                `<${f} style="margin:0 0 12px;padding-left:24px;">${Q || "<li>Item</li>"}</${f}>`,
                d
              )
            );
            break;
          }
          case "quote": {
            const f = w(d.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), E = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, Q = E[d.style || "default"] || E.default;
            P.push(
              be(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${Q}font-size:14px;line-height:1.6;">${f || "Quote"}</div>`,
                d
              )
            );
            break;
          }
          case "social": {
            const E = (Array.isArray(d.links) ? d.links : []).filter((Q) => (Q.url || "").trim());
            if (E.length === 0)
              P.push(
                be(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  d
                )
              );
            else {
              const Q = (pe) => `<a href="${w((pe.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${w(pe.platform || "Link")}</a>`;
              P.push(
                be(
                  `<div style="margin:0 0 12px;">${E.map(Q).join("")}</div>`,
                  d
                )
              );
            }
            break;
          }
          case "video": {
            const f = (d.thumbnailUrl || "").trim(), E = (d.videoUrl || "#").trim(), Q = w(d.caption || ""), v = !!d.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", l = f ? `<img src="${w(f)}" alt="Video" style="${v}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            P.push(
              be(
                `<div style="margin:0 0 12px;"><a href="${w(E)}" style="display:block;color:inherit;">${l}</a>` + (Q ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${Q}</p>` : "") + "</div>",
                d
              )
            );
            break;
          }
          case "link_list": {
            const f = Array.isArray(d.links) ? d.links : [], E = w(d.separator || " | "), pe = f.filter(
              (v) => (v.text || v.url) && (v.url || "").trim()
            ).map(
              (v) => `<a href="${w((v.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${w(v.text || "Link")}</a>`
            );
            P.push(
              be(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${pe.join(E)}</p>`,
                d
              )
            );
            break;
          }
          case "columns": {
            const f = w(d.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), E = w(d.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            P.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${f || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${E || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const f = Math.min(4, Math.max(1, Number(d.columnCount) || 2)), E = Array.isArray(d.cells) ? d.cells.slice(0, f) : [], Q = 100 / f, pe = Array.from({ length: f }, (v, l) => {
              const t = E[l] ?? "", H = w(t).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${Q}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${H || "—"}</td>`;
            }).join("");
            P.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${pe}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const f = Array.isArray(d.links) ? d.links : [], E = w(d.separator || " | "), pe = f.filter(
              (v) => (v.text || v.url) && (v.url || "").trim()
            ).map(
              (v) => `<a href="${w((v.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${w(v.text || "Link")}</a>`
            );
            P.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${pe.length ? pe.join(E) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const E = (Array.isArray(d.items) ? d.items : []).map((Q) => {
              const pe = w(Q.title || "Section"), v = w(Q.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${pe}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${v}</div></details>`;
            }).join("");
            P.push(
              E ? `<div style="margin:0 0 12px;">${E}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const E = (Array.isArray(d.slides) ? d.slides : []).filter(
              (Q) => (Q.imageUrl || "").trim()
            );
            if (E.length === 0)
              P.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const Q = E[0], pe = `<img src="${w(Q.imageUrl)}" alt="${w(Q.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, v = (Q.linkUrl || "").trim();
              P.push(
                `<div style="margin:0 0 12px;">${v ? `<a href="${w(v)}">${pe}</a>` : pe}` + (E.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${E.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const f = w(d.label || "Offer ends in"), E = d.endDateTime ? new Date(d.endDateTime).toLocaleString() : "—";
            P.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${f}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${E}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const f = (d.imageUrl || "").trim(), E = w(d.title || "Product"), Q = w(d.price || ""), pe = w(d.buttonText || "Buy now"), v = (d.buttonUrl || "#").trim(), l = f ? `<img src="${w(f)}" alt="${w(d.alt || E)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            P.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${l}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${E}</p>` + (Q ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${Q}</p>` : "") + `<a href="${w(v)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${pe}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const f = w((d.content || "").trim());
            P.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${f || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const f = (d.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), E = w((d.caption || "").trim());
            P.push(
              '<div style="margin:0 0 12px;">' + (E ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${E}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${f || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const f = (d.feedUrl || "").trim(), E = Math.min(20, Math.max(1, Number(d.maxItems) ?? 5));
            P.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (f ? `<p style="margin:0;font-size:12px;color:#64748b;">${w(f)} · max ${E} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const f = (d.imageUrl || "").trim(), E = (d.fallbackUrl || "").trim(), Q = w(d.alt || "Dynamic image");
            f ? P.push(
              `<div style="margin:0 0 12px;"><img src="${w(f)}" alt="${Q}" style="max-width:100%;height:auto;display:block;border:0;" />` + (E ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${w(E)}</p>` : "") + "</div>"
            ) : P.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return P.join("");
    }
    const m = a, p = o, {
      campaign: i,
      dirty: $,
      customValidatorErrors: C,
      getValidationWithWarnings: h,
      update: L,
      updateMessage: B,
      undo: F,
      redo: z,
      canUndo: ee,
      canRedo: G,
      resetMessage: ge,
      hooks: S
    } = Fe({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (j) => {
          var P, d, f;
          const w = [];
          (P = j.name) != null && P.trim() || w.push("Template name is required");
          const te = j.message;
          (d = te == null ? void 0 : te.subject) != null && d.trim() || w.push("Subject is required");
          const be = (f = m.hooks) != null && f.customValidators ? await m.hooks.customValidators(j) : [];
          return [...w, ...be];
        }
      },
      onDirty: () => p("change", i.value)
    }), { lastSavedAt: _ } = qe(i, { channel: "email" });
    function U(j) {
      (j.metaKey || j.ctrlKey) && j.key === "z" && (j.preventDefault(), j.shiftKey ? z() : F());
    }
    De(() => {
      window.addEventListener("keydown", U);
    }), We(() => {
      window.removeEventListener("keydown", U);
    }), Ae(i, (j) => p("update:modelValue", j), { deep: !0 });
    const ne = se(), q = se(!0);
    async function ye() {
      if (S.estimateReach)
        try {
          ne.value = await S.estimateReach(i.value.audience);
        } catch {
          ne.value = void 0;
        }
      S.canSend && (q.value = await Promise.resolve(S.canSend()));
    }
    ye(), Ae(() => i.value.audience, ye, { deep: !0 });
    const fe = x(() => (C.value, h(ne.value))), ve = x(() => fe.value.blockingErrors), me = x(() => fe.value.warnings), ie = x(() => fe.value.valid), he = x(
      () => i.value.template_type ?? "transactional"
    ), O = se(""), ue = se(!1), le = se(null), I = x(() => {
      const j = O.value;
      return j ? Ee.find((w) => w.id === j) ?? null : null;
    });
    function _e(j) {
      const w = i.value, te = j.campaign.message ? { ...w.message, ...j.campaign.message } : w.message;
      L({
        ...j.campaign,
        message: te
      }), le.value = null, ue.value = !1;
    }
    function T(j) {
      const w = j.target.value;
      if (!w) return;
      const te = pt.find((be) => be.id === w);
      te && ($.value ? (le.value = te, ue.value = !0) : _e(te), j.target.value = "");
    }
    function b(j) {
      L({ template_type: j });
    }
    function re(j) {
      L({
        name: j,
        tracking: { ...i.value.tracking ?? {}, campaign_name: j }
      });
    }
    const ce = x(
      () => i.value.message.subject ?? ""
    ), $e = x(
      () => i.value.message.preview_text ?? ""
    ), ke = x(
      () => i.value.message.html ?? ""
    ), R = x(
      () => i.value.message.from_name ?? "Your App"
    ), ae = x(
      () => i.value.message.from_address ?? "notifications@example.com"
    ), y = x(
      () => i.value.message.blocks ?? []
    ), A = x(() => {
      const j = y.value;
      if (Array.isArray(j) && j.length > 0)
        return c(j);
      const w = ke.value;
      return w && w.trim() ? w : c([]);
    }), W = x(() => {
      const j = ce.value;
      return I.value ? Pe(j, I.value.data) : j;
    }), M = x(() => {
      const j = $e.value;
      return I.value ? Pe(j, I.value.data) : j;
    }), V = x(() => {
      const j = A.value;
      return I.value ? Pe(j, I.value.data) : j;
    }), Y = se("desktop");
    function Ce() {
      ie.value && p("save", i.value);
    }
    return (j, w) => (s(), n("div", Qc, [
      e("div", Zc, [
        Ie(je, {
          "campaign-name": u(i).name,
          status: u(i).status,
          dirty: u($),
          "last-saved-at": u(_),
          "can-undo": u(ee),
          "can-redo": u(G),
          "slugify-name": m.enforceSlugName,
          "onUpdate:campaignName": re,
          onUndo: u(F),
          onRedo: u(z)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: de({
            background: u(oe).dangerBg,
            border: `1px solid ${u(oe).dangerBorder}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[16]}px ${u(Z)[24]}px`,
            marginBottom: `${u(Z)[24]}px`
          })
        }, [
          e("ul", {
            style: de({ margin: 0, paddingLeft: "1.25rem", color: u(oe).danger })
          }, [
            (s(!0), n(K, null, J(ve.value, (te) => (s(), n("li", {
              key: te.message
            }, g(te.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        me.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: de({
            background: u(oe).neutral.bg,
            border: `1px solid ${u(oe).neutral.border}`,
            borderRadius: `${u(Le).input}px`,
            padding: `${u(Z)[16]}px ${u(Z)[24]}px`,
            marginBottom: `${u(Z)[24]}px`,
            fontSize: "0.875rem",
            color: u(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: de({ display: "block", marginBottom: `${u(Z)[4]}px` })
          }, "Warnings", 4),
          e("ul", ep, [
            (s(!0), n(K, null, J(me.value, (te) => (s(), n("li", {
              key: te.message
            }, g(te.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", tp, [
        e("aside", ap, [
          a.disabledSections.includes("email") ? k("", !0) : (s(), n("div", sp, [
            e("div", np, [
              w[9] || (w[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", lp, [
                Ie(lt, {
                  "template-type": he.value,
                  onUpdate: b
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: T
                }, [
                  w[8] || (w[8] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(K, null, J(u(pt), (te) => (s(), n("option", {
                    key: te.id,
                    value: te.id
                  }, g(te.label), 9, op))), 128))
                ], 32)
              ])
            ]),
            Ie(Xc, {
              message: u(i).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: u(B),
              onReset: w[0] || (w[0] = (te) => u(ge)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", ip, [
          !a.designOnly && u(i).audience.test_mode ? (s(), n("div", rp, [...w[10] || (w[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", dp, [
            e("div", up, [
              e("label", cp, [
                w[12] || (w[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": w[1] || (w[1] = (te) => O.value = te),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  w[11] || (w[11] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(K, null, J(u(Ee), (te) => (s(), n("option", {
                    key: te.id,
                    value: te.id
                  }, g(te.label), 9, pp))), 128))
                ], 512), [
                  [Ne, O.value]
                ])
              ])
            ]),
            e("div", mp, [
              e("button", {
                type: "button",
                class: xe(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Y.value === "desktop"
                }]),
                onClick: w[2] || (w[2] = (te) => Y.value = "desktop")
              }, [...w[13] || (w[13] = [
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
                class: xe(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Y.value === "mobile"
                }]),
                onClick: w[3] || (w[3] = (te) => Y.value = "mobile")
              }, [...w[14] || (w[14] = [
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
              class: xe(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": Y.value === "mobile"
              }])
            }, [
              e("div", vp, [
                e("div", bp, [
                  e("span", gp, g(R.value), 1),
                  e("span", fp, "<" + g(ae.value) + ">", 1)
                ]),
                e("div", yp, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: W.value || "No subject"
                  }, g(W.value || "No subject"), 9, hp),
                  M.value ? (s(), n("span", kp, " — " + g(M.value), 1)) : k("", !0)
                ])
              ]),
              e("div", _p, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: V.value
                }, null, 8, wp)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", $p, [
        m.actionsNote ? (s(), n("div", xp, g(m.actionsNote), 1)) : k("", !0),
        e("div", Sp, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: w[4] || (w[4] = (te) => p("duplicate", JSON.parse(JSON.stringify(u(i)))))
          }, " Duplicate ")) : k("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: Ce
          }, " Save ")) : k("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: w[5] || (w[5] = (te) => p("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      ue.value ? (s(), n("div", Cp, [
        e("div", Ip, [
          w[15] || (w[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          w[16] || (w[16] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Ap, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: w[6] || (w[6] = (te) => {
                ue.value = !1, le.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: w[7] || (w[7] = (te) => le.value && _e(le.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0)
    ]));
  }
}), Tt = /* @__PURE__ */ Se(Up, [["__scopeId", "data-v-9b188271"]]), Lp = { class: "kb-shell" }, Bp = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Rp = ["aria-selected", "onClick"], Tp = { class: "kb-shell__meta" }, Pp = ["href"], Vp = { class: "kb-shell__body" }, Ep = /* @__PURE__ */ we({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(a, { emit: o }) {
    const c = o, m = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (p, i) => (s(), n("div", Lp, [
      e("header", {
        class: "kb-shell__header",
        style: de({ padding: `${u(Z)[12]}px ${u(Z)[24]}px`, borderBottom: `1px solid ${u(oe).neutral.border}`, background: u(oe).neutral.bg })
      }, [
        i[0] || (i[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Bp, [
          (s(), n(K, null, J(m, ($) => e("button", {
            key: $.id,
            type: "button",
            class: xe(["kb-shell__channel", { "kb-shell__channel--active": a.channel === $.id }]),
            role: "tab",
            "aria-selected": a.channel === $.id,
            onClick: (C) => c("switch-channel", $.id)
          }, g($.label), 11, Rp)), 64))
        ]),
        e("div", Tp, [
          a.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: de({ padding: "2px 8px", borderRadius: `${u(Le).input}px`, fontSize: "0.75rem", background: u(oe).neutral.bg, color: u(oe).neutral.textMuted })
          }, g(a.environment), 5)) : k("", !0),
          a.helpUrl ? (s(), n("a", {
            key: 1,
            href: a.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: de({ color: u(oe).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Pp)) : k("", !0)
        ])
      ], 4),
      e("div", Vp, [
        Te(p.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Op = /* @__PURE__ */ Se(Ep, [["__scopeId", "data-v-0df30803"]]), Mp = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Np = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Dp = ["onClick"], Wp = /* @__PURE__ */ we({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(a) {
    var i;
    const o = a, c = se(((i = o.items[0]) == null ? void 0 : i.id) ?? "");
    let m = null;
    function p($) {
      const C = document.getElementById($);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return De(() => {
      const $ = o.scrollContainerId ? document.getElementById(o.scrollContainerId) : document;
      $ && (m = new IntersectionObserver(
        (C) => {
          for (const h of C)
            if (h.isIntersecting) {
              const L = h.target.getAttribute("data-outline-id");
              L && (c.value = L);
            }
        },
        { root: $ === document ? null : $, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), o.items.forEach((C) => {
        const h = document.getElementById(C.id);
        h && (m == null || m.observe(h));
      }));
    }), We(() => {
      m == null || m.disconnect();
    }), Ae(
      () => o.items,
      ($) => {
        $.length && !c.value && (c.value = $[0].id);
      },
      { immediate: !0 }
    ), ($, C) => (s(), n("nav", Mp, [
      e("ul", Np, [
        (s(!0), n(K, null, J(a.items, (h) => (s(), n("li", {
          key: h.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: xe(["kb-outline__btn", { "kb-outline__btn--active": c.value === h.id }]),
            style: de({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${u(Z)[8]}px ${u(Z)[12]}px`,
              border: "none",
              borderRadius: `${u(Le).input}px`,
              background: c.value === h.id ? u(oe).neutral.bg : "transparent",
              color: c.value === h.id ? "#0f172a" : u(oe).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: c.value === h.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (L) => p(h.id)
          }, g(h.label), 15, Dp)
        ]))), 128))
      ])
    ]));
  }
}), Hp = /* @__PURE__ */ Se(Wp, [["__scopeId", "data-v-25c37675"]]), zp = ["id"], Fp = {
  key: 1,
  class: "kb-form-shell__head"
}, qp = /* @__PURE__ */ we({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(a) {
    return (o, c) => (s(), n("div", {
      class: "kb-form-shell",
      id: a.sectionId ?? void 0,
      style: de({
        padding: `${u(Z)[24]}px ${u(Z)[24]}px ${u(Z)[32]}px`,
        marginBottom: 0
      })
    }, [
      a.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: de({ marginBottom: u(Z)[24], paddingBottom: u(Z)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: de({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: u(Z)[12] })
        }, g(a.label), 5),
        Te(o.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", Fp, [
        Te(o.$slots, "head", {}, void 0, !0)
      ])),
      Te(o.$slots, "default", {}, void 0, !0)
    ], 12, zp));
  }
}), jp = /* @__PURE__ */ Se(qp, [["__scopeId", "data-v-6504df41"]]), Kp = /* @__PURE__ */ we({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(a) {
    return (o, c) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: de({
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
}), Yp = /* @__PURE__ */ we({
  __name: "BuilderTopShell",
  setup(a) {
    return (o, c) => (s(), n("div", {
      class: "kb-top-shell",
      style: de({
        marginLeft: u(Z)[24],
        marginRight: u(Z)[24]
      })
    }, [
      Te(o.$slots, "header"),
      Te(o.$slots, "errors"),
      Te(o.$slots, "warnings"),
      Te(o.$slots, "default")
    ], 4));
  }
});
function Jp(a) {
  a.component("KeosNotificationBuilder", Lt), a.component("KeosWhatsAppBuilder", Bt), a.component("KeosSmsBuilder", Rt), a.component("KeosEmailBuilder", Tt), a.component("BuilderShell", Op), a.component("BuilderOutline", Hp), a.component("BuilderVersionHistoryModal", Ut), a.component("BuilderFormShell", jp), a.component("BuilderActionsBar", Kp), a.component("BuilderTopShell", Yp);
}
const Xp = {
  install: Jp,
  KeosNotificationBuilder: Lt,
  KeosWhatsAppBuilder: Bt,
  KeosSmsBuilder: Rt,
  KeosEmailBuilder: Tt
};
export {
  Kp as BuilderActionsBar,
  jp as BuilderFormShell,
  Hp as BuilderOutline,
  Op as BuilderShell,
  Yp as BuilderTopShell,
  Ut as BuilderVersionHistoryModal,
  Ee as DEFAULT_SAMPLE_PROFILES,
  Tt as KeosEmailBuilder,
  Lt as KeosNotificationBuilder,
  Rt as KeosSmsBuilder,
  Bt as KeosWhatsAppBuilder,
  Xp as default,
  Jp as install,
  Pe as renderTemplatePreview,
  qe as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
