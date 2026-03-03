import { ref as le, watch as Be, computed as $, defineComponent as we, openBlock as s, createElementBlock as n, normalizeStyle as ie, unref as c, createElementVNode as e, Fragment as F, renderList as Y, toDisplayString as p, createTextVNode as j, createCommentVNode as w, normalizeClass as ye, withDirectives as Pe, vModelSelect as De, vModelText as tt, vModelCheckbox as Nt, createStaticVNode as Me, withKeys as Ot, onMounted as He, onUnmounted as ze, createVNode as Ie, createBlock as Mt, withModifiers as We, renderSlot as Ve } from "vue";
const Q = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Ue = {
  input: 6,
  card: 12,
  button: 6
}, de = {
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
de.neutral.textMuted, de.neutral.textMeta;
const Fe = {
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
}, Dt = ["android", "ios", "web"], _t = "normal", wt = ["low", "normal", "high"], $t = 86400, Wt = [3600, 7200, 86400, 172800], xt = "1.0", Ht = ["topic", "segment", "user_list"];
function at() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Dt],
    test_mode: !1
  };
}
function st() {
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
function nt() {
  return {
    priority: _t,
    ttl: $t,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function lt() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function zt(a) {
  return {
    schema_version: xt,
    name: "",
    status: "draft",
    audience: at(),
    message: st(),
    delivery: nt(),
    tracking: lt(),
    ...a
  };
}
function Ct(a) {
  const i = a;
  return i.schema_version || (i.schema_version = xt), i.audience || (i.audience = at()), i.message || (i.message = st()), i.delivery || (i.delivery = nt()), i.tracking || (i.tracking = lt()), wt.includes(i.delivery.priority) || (i.delivery.priority = _t), i.delivery.ttl === void 0 && (i.delivery.ttl = $t), Ht.includes(i.audience.type) || (i.audience.type = "topic"), i.audience.type === "topic" && !i.audience.topic_name && (i.audience.topic_name = "default"), i;
}
const qt = 1e5;
function Ft(a, i) {
  var v, d, C;
  const m = [], b = i ?? a.audience.estimated_reach;
  return b !== void 0 && b >= qt && m.push({
    message: `Estimated reach is very high (${b.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), a.tracking && !((v = a.tracking.campaign_name) != null && v.trim()) && !((d = a.name) != null && d.trim()) && m.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (C = a.message.deep_link) != null && C.trim() || m.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), m;
}
function St(a, i = "error") {
  return { message: a, severity: i };
}
function It(a) {
  const i = [];
  return a.schema_version || i.push(St("Missing schema_version")), {
    valid: i.length === 0,
    errors: i
  };
}
function jt(a, i) {
  const m = It(a), b = Ft(a, i);
  return {
    valid: m.valid,
    errors: [
      ...m.errors,
      ...b.map((v) => St(v.message, v.severity))
    ]
  };
}
function Kt(a) {
  return a.errors.filter((i) => i.severity === "error");
}
function Yt(a) {
  return a.errors.filter((i) => i.severity !== "error");
}
function Ne(a, i) {
  return a.length <= i ? { text: a, truncated: !1 } : { text: a.slice(0, Math.max(0, i - 3)) + "...", truncated: !0 };
}
const qe = Fe.android;
function Jt(a) {
  const { title: i, body: m } = a, b = Ne(i || "", qe.title), v = Ne(m || "", qe.body);
  return {
    title: b.text,
    body: v.text,
    imageUrl: a.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: v.truncated,
    expanded: !1
  };
}
function Gt(a) {
  const { title: i, body: m } = a, b = Ne(i || "", qe.title), v = Ne(m || "", qe.body);
  return {
    title: b.text,
    body: v.text,
    imageUrl: a.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: v.truncated,
    expanded: !0
  };
}
function Xt(a, i = {}) {
  const m = i.expanded ? Gt(a) : Jt(a);
  return i.darkMode !== void 0 && (m.darkMode = i.darkMode), m;
}
const it = Fe.ios;
function Bt(a) {
  const { title: i, body: m } = a, b = Ne(i || "", it.title), v = Ne(m || "", it.body);
  return {
    title: b.text,
    body: v.text,
    imageUrl: a.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: v.truncated,
    expanded: !1
  };
}
function Qt(a) {
  return Bt(a);
}
function Zt(a, i = {}) {
  const m = i.variant === "lockscreen" ? Qt(a) : Bt(a);
  return i.darkMode !== void 0 && (m.darkMode = i.darkMode), m;
}
const rt = Fe.web;
function dt(a) {
  const { title: i, body: m } = a, b = Ne(i || "", rt.title), v = Ne(m || "", rt.body);
  return {
    title: b.text,
    body: v.text,
    imageUrl: a.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: v.truncated
  };
}
function ea(a) {
  return a.map((i) => ({ message: i, severity: "error" }));
}
function Ge(a) {
  return JSON.parse(JSON.stringify(a));
}
function je(a = {}) {
  const i = le(
    Ct(a.initial ?? zt())
  ), m = a.hooks ?? {}, b = le(!1), v = le([]);
  Be(
    i,
    () => {
      if (!m.customValidators) {
        v.value = [];
        return;
      }
      m.customValidators(i.value).then((E) => {
        v.value = E;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const d = le([]), C = le([]);
  function I() {
    const E = Ge(i.value);
    d.value = [...d.value.slice(-19), E], C.value = [];
  }
  const y = $(() => d.value.length > 0), P = $(() => C.value.length > 0);
  function V() {
    d.value.length !== 0 && (C.value = [Ge(i.value), ...C.value], i.value = d.value[d.value.length - 1], d.value = d.value.slice(0, -1));
  }
  function z() {
    C.value.length !== 0 && (d.value = [...d.value, Ge(i.value)], i.value = C.value[0], C.value = C.value.slice(1));
  }
  Be(
    i,
    () => {
      var E;
      b.value = !0, (E = a.onDirty) == null || E.call(a);
    },
    { deep: !0 }
  );
  const W = $(() => It(i.value));
  function X(E) {
    const fe = jt(i.value, E), oe = ea(v.value), A = [...Kt(fe), ...oe], be = [...fe.errors, ...oe], R = fe.valid && oe.length === 0;
    return {
      ...fe,
      errors: be,
      valid: R,
      blockingErrors: A,
      warnings: Yt(fe)
    };
  }
  function q(E) {
    I(), i.value = { ...i.value, ...E };
  }
  function ge(E) {
    I(), i.value = {
      ...i.value,
      audience: { ...i.value.audience, ...E }
    };
  }
  function K(E) {
    I(), i.value = {
      ...i.value,
      message: { ...i.value.message, ...E }
    };
  }
  function J(E) {
    I(), i.value = {
      ...i.value,
      delivery: { ...i.value.delivery, ...E }
    };
  }
  function N(E) {
    I(), i.value = {
      ...i.value,
      tracking: i.value.tracking ? { ...i.value.tracking, ...E } : { campaign_name: "", tags: [], ab_test: !1, ...E }
    };
  }
  function pe(E) {
    I(), i.value = {
      ...i.value,
      message: { ...st(), ...E }
    };
  }
  function O(E) {
    I(), i.value = {
      ...i.value,
      delivery: { ...nt(), ...E }
    };
  }
  function ke(E) {
    I(), i.value = {
      ...i.value,
      tracking: { ...lt(), ...E }
    };
  }
  function he(E) {
    I(), i.value = {
      ...i.value,
      audience: { ...at(), ...E }
    };
  }
  const x = $(() => ({
    title: i.value.message.title,
    body: i.value.message.body,
    imageUrl: i.value.message.image_url
  }));
  function B(E, fe) {
    const oe = x.value;
    let A;
    switch (E) {
      case "android":
        A = Xt(oe, { expanded: fe == null ? void 0 : fe.expanded });
        break;
      case "ios":
        A = Zt(oe);
        break;
      case "web":
        A = dt(oe);
        break;
      default:
        A = dt(oe);
    }
    const be = i.value.message.actions ?? [], R = i.value.message.location;
    return { ...A, actions: be, location: R ?? void 0 };
  }
  const G = Fe;
  async function ce() {
    return m.customValidators ? m.customValidators(i.value) : [];
  }
  return {
    campaign: i,
    dirty: b,
    validation: W,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: v,
    getValidationWithWarnings: X,
    update: q,
    updateAudience: ge,
    updateMessage: K,
    updateDelivery: J,
    updateTracking: N,
    undo: V,
    redo: z,
    canUndo: y,
    canRedo: P,
    resetMessage: pe,
    resetDelivery: O,
    resetTracking: ke,
    resetAudience: he,
    getPreview: B,
    previewInput: x,
    characterLimits: G,
    runCustomValidators: ce,
    hooks: m
  };
}
const ta = "keos-draft", aa = 2e3;
function sa(a, i) {
  return `${ta}-${a}-${i}`;
}
function Ke(a, i) {
  const m = i.channel, b = $(
    () => {
      var V, z;
      return sa(
        m,
        i.key ?? ((V = a.value) == null ? void 0 : V.id) ?? ((z = a.value) == null ? void 0 : z.name) ?? "draft"
      );
    }
  ), v = le(null);
  let d = null;
  function C() {
    try {
      const V = JSON.stringify(a.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(b.value, V), v.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function I() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(b.value);
    } catch {
    }
  }
  function y() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const V = window.localStorage.getItem(b.value);
      if (!V) return null;
      const z = JSON.parse(V);
      return Ct(z);
    } catch {
      return null;
    }
  }
  function P() {
    return i.enabled === void 0 ? !0 : typeof i.enabled == "boolean" ? i.enabled : i.enabled.value;
  }
  return Be(
    a,
    () => {
      P() && (d && clearTimeout(d), d = setTimeout(() => {
        d = null, C();
      }, aa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: v,
    clearDraft: I,
    getDraft: y,
    persist: C
  };
}
const na = { class: "kb-header__row" }, la = ["value"], oa = { class: "kb-header__actions" }, ia = ["disabled"], ra = ["disabled"], da = ["value"], ua = ["value"], ca = /* @__PURE__ */ we({
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
  setup(a, { emit: i }) {
    const m = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], b = a, v = i;
    function d(y) {
      return b.slugifyName ? y.trim().replace(/\s+/g, "-") : y;
    }
    function C(y) {
      return y.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function I(y) {
      const P = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return P[y] ?? P.draft;
    }
    return (y, P) => (s(), n("header", {
      class: "kb-header",
      style: ie({
        padding: `${c(Q)[16]}px 0`,
        borderBottom: `1px solid ${c(de).neutral.border}`,
        marginBottom: `${c(Q)[16]}px`
      })
    }, [
      e("div", na, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: a.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: P[0] || (P[0] = (V) => v("update:campaignName", d(V.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, la),
        e("div", oa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !a.canUndo,
            onClick: P[1] || (P[1] = (V) => v("undo"))
          }, " Undo ", 8, ia),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !a.canRedo,
            onClick: P[2] || (P[2] = (V) => v("redo"))
          }, " Redo ", 8, ra)
        ]),
        a.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: a.workflowStatus,
          class: "kb-header__status-select",
          style: ie({
            padding: `${c(Q)[4]}px ${c(Q)[8]}px`,
            borderRadius: `${c(Ue).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...I(a.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: P[3] || (P[3] = (V) => v("update:workflowStatus", V.target.value))
        }, [
          (s(), n(F, null, Y(m, (V) => e("option", {
            key: V.value,
            value: V.value
          }, p(V.label), 9, ua)), 64))
        ], 44, da)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: ie({
            padding: `${c(Q)[4]}px ${c(Q)[8]}px`,
            borderRadius: `${c(Ue).input}px`,
            background: c(de).neutral.bg,
            fontSize: "0.8125rem",
            color: c(de).neutral.textMuted
          })
        }, p(a.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ie({ fontSize: "0.8125rem", color: c(de).neutral.textMuted, marginTop: `${c(Q)[4]}px` })
      }, [
        a.saving ? (s(), n(F, { key: 0 }, [
          j("Saving…")
        ], 64)) : a.dirty ? (s(), n(F, { key: 1 }, [
          j("Unsaved changes")
        ], 64)) : a.lastSavedAt ? (s(), n(F, { key: 2 }, [
          j("Last saved at " + p(C(a.lastSavedAt)), 1)
        ], 64)) : w("", !0)
      ], 4)
    ], 4));
  }
}), xe = (a, i) => {
  const m = a.__vccOpts || a;
  for (const [b, v] of i)
    m[b] = v;
  return m;
}, Ye = /* @__PURE__ */ xe(ca, [["__scopeId", "data-v-ef058bcb"]]), pa = { class: "kb-section" }, ma = { class: "kb-section__head" }, va = { class: "kb-section__desc" }, ba = { class: "kb-field" }, ga = { class: "kb-label" }, fa = { class: "kb-field-with-rail" }, ya = ["value", "aria-invalid", "aria-describedby"], ha = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, ka = { class: "kb-field" }, _a = { class: "kb-label" }, wa = { class: "kb-field-with-rail" }, $a = ["value", "aria-invalid", "aria-describedby"], xa = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, Ca = { class: "kb-field" }, Sa = ["value", "aria-invalid", "aria-describedby"], Ia = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Ba = { class: "kb-field" }, Aa = ["value", "aria-invalid", "aria-describedby"], La = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Ua = { class: "kb-field" }, Ra = { class: "kb-location-row" }, Ta = ["value"], Pa = ["value"], Va = ["value"], Ea = ["value"], Na = { class: "kb-field" }, Oa = { class: "kb-actions-list" }, Ma = ["value", "onInput"], Da = ["value", "onInput"], Wa = ["onClick"], Ha = ["disabled"], za = { class: "kb-action-chips" }, qa = ["disabled", "onClick"], Fa = /* @__PURE__ */ we({
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
    const i = a;
    return (m, b) => {
      var v, d, C, I;
      return s(), n("section", pa, [
        e("div", ma, [
          b[10] || (b[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (y) => m.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        e("p", va, " Message body is required. Title is optional. Character limits depend on the selected platform (" + p(a.selectedPlatform) + "). ", 1),
        e("div", ba, [
          e("label", ga, [
            b[11] || (b[11] = j(" Title ", -1)),
            e("span", {
              class: ye(["kb-counter", { "kb-counter--warn": a.titleCount > a.titleLimit }])
            }, p(a.titleCount) + "/" + p(a.titleLimit), 3)
          ]),
          e("div", fa, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: a.message.title,
              "aria-invalid": !!a.titleError,
              "aria-describedby": a.titleError ? "title-error" : void 0,
              onInput: b[1] || (b[1] = (y) => m.$emit("update", { title: y.target.value }))
            }, null, 40, ya),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ie({ "--pct": Math.min(100, a.titleCount / a.titleLimit * 100) + "%" })
            }, [...b[12] || (b[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.titleError ? (s(), n("p", ha, p(a.titleError), 1)) : w("", !0)
        ]),
        e("div", ka, [
          e("label", _a, [
            b[13] || (b[13] = j(" Message ", -1)),
            e("span", {
              class: ye(["kb-counter", { "kb-counter--warn": a.bodyCount > a.bodyLimit }])
            }, p(a.bodyCount) + "/" + p(a.bodyLimit), 3)
          ]),
          e("div", wa, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: a.message.body,
              "aria-invalid": !!a.bodyError,
              "aria-describedby": a.bodyError ? "body-error" : void 0,
              onInput: b[2] || (b[2] = (y) => m.$emit("update", { body: y.target.value }))
            }, null, 40, $a),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ie({ "--pct": Math.min(100, a.bodyCount / a.bodyLimit * 100) + "%" })
            }, [...b[14] || (b[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          a.bodyError ? (s(), n("p", xa, p(a.bodyError), 1)) : w("", !0)
        ]),
        e("div", Ca, [
          b[15] || (b[15] = e("label", { class: "kb-label" }, [
            j(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: a.message.image_url,
            "aria-invalid": !!a.imageUrlError,
            "aria-describedby": a.imageUrlError ? "image-url-error" : void 0,
            onInput: b[3] || (b[3] = (y) => m.$emit("update", { image_url: y.target.value || void 0 }))
          }, null, 40, Sa),
          a.imageUrlError ? (s(), n("p", Ia, p(a.imageUrlError), 1)) : w("", !0)
        ]),
        e("div", Ba, [
          b[16] || (b[16] = e("label", { class: "kb-label" }, [
            j(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: a.message.deep_link,
            "aria-invalid": !!a.deepLinkError,
            "aria-describedby": a.deepLinkError ? "deeplink-error" : void 0,
            onInput: b[4] || (b[4] = (y) => m.$emit("update", { deep_link: y.target.value || void 0 }))
          }, null, 40, Aa),
          a.deepLinkError ? (s(), n("p", La, p(a.deepLinkError), 1)) : w("", !0)
        ]),
        e("div", Ua, [
          b[17] || (b[17] = e("label", { class: "kb-label" }, [
            j(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Ra, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((v = a.message.location) == null ? void 0 : v.lat) ?? "",
              onInput: b[5] || (b[5] = (y) => {
                const P = { ...a.message.location ?? {} }, V = y.target.value;
                P.lat = V === "" ? void 0 : Number(V), m.$emit("update", { location: P });
              })
            }, null, 40, Ta),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((d = a.message.location) == null ? void 0 : d.lon) ?? "",
              onInput: b[6] || (b[6] = (y) => {
                const P = { ...a.message.location ?? {} }, V = y.target.value;
                P.lon = V === "" ? void 0 : Number(V), m.$emit("update", { location: P });
              })
            }, null, 40, Pa)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((C = a.message.location) == null ? void 0 : C.name) ?? "",
            onInput: b[7] || (b[7] = (y) => {
              const P = { ...a.message.location ?? {} };
              P.name = y.target.value || void 0, m.$emit("update", { location: P });
            })
          }, null, 40, Va),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((I = a.message.location) == null ? void 0 : I.address) ?? "",
            onInput: b[8] || (b[8] = (y) => {
              const P = { ...a.message.location ?? {} };
              P.address = y.target.value || void 0, m.$emit("update", { location: P });
            })
          }, null, 40, Ea)
        ]),
        e("div", Na, [
          b[19] || (b[19] = e("label", { class: "kb-label" }, [
            j(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Oa, [
            (s(!0), n(F, null, Y(i.message.actions ?? [], (y, P) => (s(), n("div", {
              key: y.id || P,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: y.label,
                onInput: (V) => {
                  var X;
                  const z = [...i.message.actions ?? []], W = Number(P);
                  z[W] = {
                    ...z[W],
                    id: ((X = z[W]) == null ? void 0 : X.id) || `action_${W + 1}`,
                    label: V.target.value
                  }, m.$emit("update", { actions: z });
                }
              }, null, 40, Ma),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: y.url,
                onInput: (V) => {
                  var X;
                  const z = [...i.message.actions ?? []], W = Number(P);
                  z[W] = {
                    ...z[W],
                    id: ((X = z[W]) == null ? void 0 : X.id) || `action_${W + 1}`,
                    url: V.target.value || void 0
                  }, m.$emit("update", { actions: z });
                }
              }, null, 40, Da),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const V = [...i.message.actions ?? []];
                  V.splice(Number(P), 1), m.$emit("update", { actions: V });
                }
              }, " Remove ", 8, Wa)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (i.message.actions ?? []).length >= 3,
              onClick: b[9] || (b[9] = () => {
                const y = [...i.message.actions ?? []];
                y.push({
                  id: `action_${y.length + 1}`,
                  label: "",
                  url: ""
                }), m.$emit("update", { actions: y });
              })
            }, " Add action ", 8, Ha),
            e("div", za, [
              b[18] || (b[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (s(), n(F, null, Y(["View order", "Track shipment", "Open app"], (y) => e("button", {
                key: y,
                type: "button",
                class: "kb-action-chip",
                disabled: (i.message.actions ?? []).length >= 3,
                onClick: () => {
                  const P = [...i.message.actions ?? []];
                  P.push({
                    id: `action_${Date.now()}`,
                    label: y,
                    url: ""
                  }), m.$emit("update", { actions: P });
                }
              }, p(y), 9, qa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ja = /* @__PURE__ */ xe(Fa, [["__scopeId", "data-v-7bc3a44c"]]), Ka = { class: "kb-section kb-section--inline-personalization" }, Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = ["value"], Xa = { class: "kb-field" }, Qa = { class: "kb-insert-row" }, Za = { class: "kb-field" }, es = { class: "kb-variable-list" }, ts = /* @__PURE__ */ we({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(a, { emit: i }) {
    const m = a, b = i, v = ["first_name", "last_name", "order_id", "city"], d = le(m.variableOptions ?? v), C = le(d.value[0] ?? v[0]), I = le("");
    Be(
      () => m.variableOptions,
      (z) => {
        z && z.length && (d.value = [...z], d.value.includes(C.value) || (C.value = d.value[0]));
      }
    );
    const y = $(() => d.value);
    function P(z) {
      b("insertVariable", { variable: C.value, field: z });
    }
    function V() {
      const z = I.value.trim();
      z && (d.value.includes(z) || (d.value = [...d.value, z]), C.value = z, I.value = "");
    }
    return (z, W) => (s(), n("section", Ka, [
      W[8] || (W[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      W[9] || (W[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ya, [
        W[4] || (W[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ja, [
          Pe(e("select", {
            "onUpdate:modelValue": W[0] || (W[0] = (X) => C.value = X),
            class: "kb-select"
          }, [
            (s(!0), n(F, null, Y(y.value, (X) => (s(), n("option", {
              key: X,
              value: X
            }, p(X), 9, Ga))), 128))
          ], 512), [
            [De, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W[1] || (W[1] = (X) => P("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W[2] || (W[2] = (X) => P("body"))
          }, "Into message")
        ])
      ]),
      e("div", Xa, [
        W[5] || (W[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qa, [
          Pe(e("input", {
            "onUpdate:modelValue": W[3] || (W[3] = (X) => I.value = X),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [tt, I.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: V
          }, " Add ")
        ])
      ]),
      e("div", Za, [
        W[6] || (W[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        W[7] || (W[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", es, [
          (s(!0), n(F, null, Y(y.value, (X) => (s(), n("li", { key: X }, [
            e("code", null, "{{ " + p(X) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), At = /* @__PURE__ */ xe(ts, [["__scopeId", "data-v-6d49f6dc"]]), as = { class: "kb-section kb-section--template-type" }, ss = { class: "kb-field" }, ns = { class: "kb-radio-group" }, ls = { class: "kb-radio" }, os = ["checked"], is = { class: "kb-radio" }, rs = ["checked"], ds = /* @__PURE__ */ we({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(a, { emit: i }) {
    const m = i;
    return (b, v) => (s(), n("section", as, [
      v[5] || (v[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      v[6] || (v[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", ss, [
        e("div", ns, [
          e("label", ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: a.templateType === "transactional",
              onChange: v[0] || (v[0] = (d) => m("update", "transactional"))
            }, null, 40, os),
            v[2] || (v[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", is, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: a.templateType === "marketing",
              onChange: v[1] || (v[1] = (d) => m("update", "marketing"))
            }, null, 40, rs),
            v[3] || (v[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        v[4] || (v[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), ot = /* @__PURE__ */ xe(ds, [["__scopeId", "data-v-991f74e5"]]), us = { class: "kb-section" }, cs = { class: "kb-section__head" }, ps = { class: "kb-section__desc" }, ms = { class: "kb-field" }, vs = { class: "kb-radio-group" }, bs = { class: "kb-radio" }, gs = ["checked"], fs = { class: "kb-radio" }, ys = ["checked"], hs = {
  key: 0,
  class: "kb-field kb-row"
}, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Cs = { class: "kb-field" }, Ss = ["value"], Is = ["value"], Bs = { class: "kb-field" }, As = { class: "kb-checkbox" }, Ls = ["checked"], Us = /* @__PURE__ */ we({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a) {
    const i = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (m, b) => {
      var v;
      return s(), n("section", us, [
        e("div", cs, [
          b[8] || (b[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (d) => m.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        e("p", ps, p(a.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ms, [
          b[11] || (b[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", vs, [
            e("label", bs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !a.delivery.scheduled_at,
                onChange: b[1] || (b[1] = (d) => m.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, gs),
              b[9] || (b[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", fs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!a.delivery.scheduled_at,
                onChange: b[2] || (b[2] = (d) => m.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, ys),
              b[10] || (b[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        a.delivery.scheduled_at ? (s(), n("div", hs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (v = a.delivery.scheduled_at) == null ? void 0 : v.slice(0, 16),
            onInput: b[3] || (b[3] = (d) => m.$emit("update", { scheduled_at: d.target.value }))
          }, null, 40, ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: a.delivery.timezone,
            onInput: b[4] || (b[4] = (d) => m.$emit("update", { timezone: d.target.value }))
          }, null, 40, _s)
        ])) : w("", !0),
        a.showPushOptions ? (s(), n(F, { key: 1 }, [
          e("div", ws, [
            b[12] || (b[12] = e("label", { class: "kb-label" }, [
              j(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.ttl,
              onChange: b[5] || (b[5] = (d) => m.$emit("update", { ttl: Number(d.target.value) }))
            }, [
              (s(!0), n(F, null, Y(c(Wt), (d) => (s(), n("option", {
                key: d,
                value: d
              }, p(i[d] ?? d + "s"), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Cs, [
            b[13] || (b[13] = e("label", { class: "kb-label" }, [
              j(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.priority,
              onChange: b[6] || (b[6] = (d) => m.$emit("update", { priority: d.target.value }))
            }, [
              (s(!0), n(F, null, Y(c(wt), (d) => (s(), n("option", {
                key: d,
                value: d
              }, p(d), 9, Is))), 128))
            ], 40, Ss)
          ]),
          e("div", Bs, [
            e("label", As, [
              e("input", {
                type: "checkbox",
                checked: a.delivery.quiet_hours,
                onChange: b[7] || (b[7] = (d) => m.$emit("update", { quiet_hours: !a.delivery.quiet_hours }))
              }, null, 40, Ls),
              b[14] || (b[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : w("", !0)
      ]);
    };
  }
}), Rs = /* @__PURE__ */ xe(Us, [["__scopeId", "data-v-a208b72f"]]), Ts = { class: "kb-accordion" }, Ps = { class: "kb-accordion__body" }, Vs = { class: "kb-field" }, Es = ["value"], Ns = { class: "kb-field" }, Os = { class: "kb-checkbox" }, Ms = ["checked"], Ds = /* @__PURE__ */ we({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(a) {
    return (i, m) => (s(), n("details", Ts, [
      m[4] || (m[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Ps, [
        e("div", Vs, [
          m[2] || (m[2] = e("label", { class: "kb-label" }, [
            j(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: a.delivery.collapse_key,
            onInput: m[0] || (m[0] = (b) => i.$emit("update", { collapse_key: b.target.value || void 0 }))
          }, null, 40, Es)
        ]),
        e("div", Ns, [
          e("label", Os, [
            e("input", {
              type: "checkbox",
              checked: a.delivery.silent_push,
              onChange: m[1] || (m[1] = (b) => i.$emit("update", { silent_push: !a.delivery.silent_push }))
            }, null, 40, Ms),
            m[3] || (m[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ws = /* @__PURE__ */ xe(Ds, [["__scopeId", "data-v-e0f5c559"]]);
function Ee(a, i) {
  return !a || typeof a != "string" ? a : a.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, b) => {
    const v = b.trim();
    return v in i ? String(i[v]) : `{{ ${b} }}`;
  });
}
const Oe = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Hs = { class: "kb-preview" }, zs = {
  key: 0,
  class: "kb-preview__toggle"
}, qs = { class: "kb-checkbox" }, Fs = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, js = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, Ks = ["src"], Ys = { class: "kb-android-body-row" }, Js = { class: "kb-android-body-content" }, Gs = {
  key: 0,
  class: "kb-android-title"
}, Xs = {
  key: 1,
  class: "kb-android-text"
}, Qs = {
  key: 2,
  class: "kb-android-location-line"
}, Zs = {
  key: 0,
  class: "kb-android-thumb"
}, en = ["src"], tn = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, an = ["src"], sn = {
  key: 0,
  class: "kb-preview-map__caption"
}, nn = {
  key: 2,
  class: "kb-android-actions"
}, ln = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, on = { class: "kb-ios-banner" }, rn = { class: "kb-ios-content" }, dn = {
  key: 0,
  class: "kb-ios-title"
}, un = {
  key: 1,
  class: "kb-ios-text"
}, cn = {
  key: 2,
  class: "kb-preview-map kb-preview-map--ios"
}, pn = ["src"], mn = {
  key: 0,
  class: "kb-preview-map__caption"
}, vn = {
  key: 3,
  class: "kb-ios-actions"
}, bn = {
  key: 0,
  class: "kb-ios-thumb"
}, gn = ["src"], fn = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, yn = { class: "kb-web-toast" }, hn = { class: "kb-web-body" }, kn = {
  key: 0,
  class: "kb-web-title"
}, _n = {
  key: 1,
  class: "kb-web-text"
}, wn = {
  key: 2,
  class: "kb-web-image"
}, $n = ["src"], xn = {
  key: 3,
  class: "kb-preview-map kb-preview-map--web"
}, Cn = ["src"], Sn = {
  key: 0,
  class: "kb-preview-map__caption"
}, In = {
  key: 0,
  class: "kb-web-actions"
}, Bn = /* @__PURE__ */ we({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(a) {
    const i = a, m = le(!1), b = $(
      () => i.getPreview(i.selectedPlatform, {
        expanded: i.selectedPlatform === "android" ? m.value : void 0
      })
    ), v = $(() => {
      const I = b.value;
      return i.previewProfile ? {
        ...I,
        title: Ee((I == null ? void 0 : I.title) ?? "", i.previewProfile.data),
        body: Ee((I == null ? void 0 : I.body) ?? "", i.previewProfile.data)
      } : I;
    }), d = $(() => {
      var W;
      const I = (W = v.value) == null ? void 0 : W.location;
      if (!I || I.lat == null && I.lon == null) return null;
      const y = Number(I.lat) || 0, P = Number(I.lon) || 0, V = 8e-3, z = [P - V, y - V, P + V, y + V].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(z)}&layer=mapnik&marker=${y},${P}`;
    }), C = $(() => {
      var y;
      const I = (y = v.value) == null ? void 0 : y.location;
      return I && (I.lat != null || I.lon != null || I.name || I.address);
    });
    return (I, y) => {
      var P, V, z, W, X, q, ge, K, J, N, pe, O, ke, he, x, B;
      return s(), n("div", Hs, [
        a.selectedPlatform === "android" ? (s(), n("div", zs, [
          e("label", qs, [
            Pe(e("input", {
              "onUpdate:modelValue": y[0] || (y[0] = (G) => m.value = G),
              type: "checkbox"
            }, null, 512), [
              [Nt, m.value]
            ]),
            y[1] || (y[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : w("", !0),
        a.selectedPlatform === "android" ? (s(), n("div", Fs, [
          y[4] || (y[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ye(["kb-android-notification", { "kb-android-notification--expanded": m.value }])
          }, [
            y[3] || (y[3] = Me('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: ye(["kb-android-body", { "kb-android-body--expanded": m.value }])
            }, [
              m.value && v.value.imageUrl ? (s(), n("div", js, [
                e("img", {
                  src: v.value.imageUrl,
                  alt: ""
                }, null, 8, Ks)
              ])) : w("", !0),
              e("div", Ys, [
                e("div", Js, [
                  v.value.title ? (s(), n("div", Gs, p(v.value.title), 1)) : w("", !0),
                  v.value.body ? (s(), n("div", Xs, p(v.value.body), 1)) : w("", !0),
                  C.value && !m.value && ((P = v.value.location) != null && P.name || (V = v.value.location) != null && V.address) ? (s(), n("div", Qs, [
                    y[2] || (y[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    j(" " + p(((z = v.value.location) == null ? void 0 : z.name) || ((W = v.value.location) == null ? void 0 : W.address)), 1)
                  ])) : w("", !0)
                ]),
                !m.value && v.value.imageUrl ? (s(), n("div", Zs, [
                  e("img", {
                    src: v.value.imageUrl,
                    alt: ""
                  }, null, 8, en)
                ])) : w("", !0)
              ]),
              C.value && d.value && m.value ? (s(), n("div", tn, [
                e("iframe", {
                  src: d.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, an),
                (X = v.value.location) != null && X.name || (q = v.value.location) != null && q.address ? (s(), n("div", sn, p(((ge = v.value.location) == null ? void 0 : ge.name) || ((K = v.value.location) == null ? void 0 : K.address)), 1)) : w("", !0)
              ])) : w("", !0),
              v.value.actions && v.value.actions.length ? (s(), n("div", nn, [
                (s(!0), n(F, null, Y(v.value.actions, (G) => (s(), n("button", {
                  key: G.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, p(G.label || "Action"), 1))), 128))
              ])) : w("", !0)
            ], 2)
          ], 2)
        ])) : a.selectedPlatform === "ios" ? (s(), n("div", ln, [
          y[7] || (y[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", on, [
            y[6] || (y[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", rn, [
              y[5] || (y[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              v.value.title ? (s(), n("div", dn, p(v.value.title), 1)) : w("", !0),
              v.value.body ? (s(), n("div", un, p(v.value.body), 1)) : w("", !0),
              C.value && d.value ? (s(), n("div", cn, [
                e("iframe", {
                  src: d.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                (J = v.value.location) != null && J.name || (N = v.value.location) != null && N.address ? (s(), n("div", mn, p(((pe = v.value.location) == null ? void 0 : pe.name) || ((O = v.value.location) == null ? void 0 : O.address)), 1)) : w("", !0)
              ])) : w("", !0),
              v.value.actions && v.value.actions.length ? (s(), n("div", vn, [
                (s(!0), n(F, null, Y(v.value.actions, (G) => (s(), n("button", {
                  key: G.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, p(G.label || "Action"), 1))), 128))
              ])) : w("", !0)
            ]),
            v.value.imageUrl ? (s(), n("div", bn, [
              e("img", {
                src: v.value.imageUrl,
                alt: ""
              }, null, 8, gn)
            ])) : w("", !0)
          ])
        ])) : (s(), n("div", fn, [
          y[9] || (y[9] = Me('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", yn, [
            y[8] || (y[8] = Me('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", hn, [
              v.value.title ? (s(), n("div", kn, p(v.value.title), 1)) : w("", !0),
              v.value.body ? (s(), n("div", _n, p(v.value.body), 1)) : w("", !0),
              v.value.imageUrl ? (s(), n("div", wn, [
                e("img", {
                  src: v.value.imageUrl,
                  alt: ""
                }, null, 8, $n)
              ])) : w("", !0),
              C.value && d.value ? (s(), n("div", xn, [
                e("iframe", {
                  src: d.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Cn),
                (ke = v.value.location) != null && ke.name || (he = v.value.location) != null && he.address ? (s(), n("div", Sn, p(((x = v.value.location) == null ? void 0 : x.name) || ((B = v.value.location) == null ? void 0 : B.address)), 1)) : w("", !0)
              ])) : w("", !0)
            ]),
            v.value.actions && v.value.actions.length ? (s(), n("div", In, [
              (s(!0), n(F, null, Y(v.value.actions, (G, ce) => (s(), n("button", {
                key: G.id || ce,
                type: "button",
                class: ye(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(ce) > 0 }])
              }, p(G.label || "Action"), 3))), 128))
            ])) : w("", !0)
          ])
        ]))
      ]);
    };
  }
}), An = /* @__PURE__ */ xe(Bn, [["__scopeId", "data-v-1d6293a0"]]), Ln = { class: "kb-version-dialog" }, Un = {
  key: 0,
  class: "kb-version-empty"
}, Rn = {
  key: 1,
  class: "kb-version-list"
}, Tn = { class: "kb-version-item-label" }, Pn = ["onClick"], Vn = { class: "kb-version-actions" }, En = /* @__PURE__ */ we({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(a, { emit: i }) {
    const m = i;
    function b(v) {
      try {
        return new Date(v).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return v;
      }
    }
    return (v, d) => a.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: d[1] || (d[1] = Ot((C) => m("close"), ["escape"]))
    }, [
      e("div", Ln, [
        d[2] || (d[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        d[3] || (d[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        a.versions.length === 0 ? (s(), n("div", Un, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", Rn, [
          (s(!0), n(F, null, Y(a.versions, (C) => (s(), n("li", {
            key: C.id,
            class: "kb-version-item"
          }, [
            e("span", Tn, p(C.label || b(C.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (I) => {
                m("restore", C.snapshot), m("close");
              }
            }, " Restore ", 8, Pn)
          ]))), 128))
        ])),
        e("div", Vn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: d[0] || (d[0] = (C) => m("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : w("", !0);
  }
}), Lt = /* @__PURE__ */ xe(En, [["__scopeId", "data-v-ce35a513"]]), ut = [
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
], ct = [
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
], pt = [
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
], mt = [
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
], Nn = { class: "keos-notification-builder" }, On = { class: "kb-builder-top" }, Mn = { style: { margin: 0, paddingLeft: "1.25rem" } }, Dn = { class: "kb-push-layout" }, Wn = { class: "kb-push-sidebar" }, Hn = {
  key: 0,
  class: "kb-push-form"
}, zn = {
  key: 0,
  class: "kb-hint-card"
}, qn = { class: "kb-push-form-head" }, Fn = { class: "kb-push-form-head-top" }, jn = { class: "kb-push-health-pill" }, Kn = { class: "kb-push-form-head-row" }, Yn = ["value"], Jn = { class: "kb-push-health" }, Gn = { class: "kb-push-health-row" }, Xn = { class: "kb-push-health-value" }, Qn = { class: "kb-push-health-bar" }, Zn = {
  key: 1,
  class: "kb-push-form"
}, el = { class: "kb-push-canvas" }, tl = {
  key: 0,
  class: "kb-push-test-banner"
}, al = { class: "kb-push-preview-chrome" }, sl = { class: "kb-push-preview-controls" }, nl = { class: "kb-push-preview-as" }, ll = ["value"], ol = { class: "kb-preview-status" }, il = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, rl = ["aria-selected", "aria-controls", "onClick"], dl = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, ul = { class: "kb-push-actions" }, cl = {
  key: 0,
  class: "kb-actions-note"
}, pl = { class: "kb-push-actions-right" }, ml = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, vl = { class: "kb-confirm-dialog" }, bl = { class: "kb-confirm-actions" }, gl = /* @__PURE__ */ we({
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
  setup(a, { emit: i }) {
    const m = a, b = i, v = le("android"), d = le(""), C = le(!1), I = le(null), y = le(!1), P = $(
      () => q.value.workflow_status ?? "draft"
    ), V = $(() => {
      const k = d.value;
      return k ? Oe.find((r) => r.id === k) ?? null : null;
    });
    function z(k) {
      const r = q.value, L = k.campaign.message ? { ...r.message, ...k.campaign.message } : r.message, g = k.campaign.delivery ? { ...r.delivery, ...k.campaign.delivery } : r.delivery;
      N({
        ...k.campaign,
        message: L,
        delivery: g
      }), I.value = null, C.value = !1;
    }
    function W(k) {
      const r = k.target.value;
      if (!r) return;
      const L = ut.find((g) => g.id === r);
      L && (ge.value ? (I.value = L, C.value = !0) : z(L), k.target.value = "");
    }
    function X(k) {
      q.value = k, y.value = !1;
    }
    const {
      campaign: q,
      dirty: ge,
      customValidatorErrors: K,
      getValidationWithWarnings: J,
      update: N,
      updateMessage: pe,
      updateDelivery: O,
      undo: ke,
      redo: he,
      canUndo: x,
      canRedo: B,
      resetMessage: G,
      resetDelivery: ce,
      getPreview: E,
      characterLimits: fe,
      hooks: oe
    } = je({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (k) => {
          var g, l, t, _;
          const r = [];
          (g = k.name) != null && g.trim() || r.push("Template name is required"), (t = (l = k.message) == null ? void 0 : l.body) != null && t.trim() || r.push("Message body is required");
          const L = (_ = m.hooks) != null && _.customValidators ? await m.hooks.customValidators(k) : [];
          return [...r, ...L];
        }
      },
      onDirty: () => b("change", q.value)
    }), { lastSavedAt: A } = Ke(q, { channel: "push" });
    function be(k) {
      (k.metaKey || k.ctrlKey) && k.key === "z" && (k.preventDefault(), k.shiftKey ? he() : ke());
    }
    He(() => {
      window.addEventListener("keydown", be);
    }), ze(() => {
      window.removeEventListener("keydown", be);
    }), Be(q, (k) => b("update:modelValue", k), { deep: !0 });
    const R = le(), u = le(!0), ne = le(!0);
    async function ue() {
      if (oe.estimateReach)
        try {
          R.value = await oe.estimateReach(q.value.audience);
        } catch {
          R.value = void 0;
        }
      oe.canSend && (u.value = await Promise.resolve(oe.canSend())), oe.canSchedule && (ne.value = await Promise.resolve(oe.canSchedule()));
    }
    ue(), Be(() => q.value.audience, ue, { deep: !0 });
    const $e = $(() => (K.value, J(R.value))), re = $(() => $e.value.blockingErrors), h = $(() => $e.value.warnings), te = $(() => $e.value.valid), Z = $(() => {
      var g, l, t;
      const k = q.value.message, r = [
        !!((g = q.value.name) != null && g.trim()),
        !!((l = k.title) != null && l.trim()),
        !!((t = k.body) != null && t.trim()),
        !!(k.template_type ?? q.value.template_type),
        Array.isArray(k.actions) ? k.actions.length > 0 : !1
      ], L = r.filter(Boolean).length;
      return Math.round(L / r.length * 100);
    }), f = $(() => Z.value >= 90 ? "Production ready" : Z.value >= 70 ? "Strong draft" : Z.value >= 40 ? "In progress" : "Needs setup"), U = $(() => {
      const k = q.value.message;
      return !!((k.title ?? "").toString().trim() || (k.body ?? "").toString().trim() || Array.isArray(k.actions) && k.actions.length);
    }), M = $(
      () => fe[v.value].title
    ), me = $(() => fe[v.value].body), ve = $(() => q.value.message.title.length), H = $(() => q.value.message.body.length), D = $(() => {
      if (ve.value > M.value)
        return `Title exceeds ${M.value} characters for ${v.value}.`;
    }), ae = $(() => {
      const k = re.value.find(
        (r) => r.message === "Message body is required"
      );
      if (k) return k.message;
      if (H.value > me.value)
        return `Body exceeds ${me} characters for ${v.value}.`;
    }), _e = $(
      () => q.value.template_type ?? "transactional"
    );
    function Ce(k) {
      N({ template_type: k });
    }
    function Le(k) {
      N({
        name: k,
        tracking: { ...q.value.tracking ?? {}, campaign_name: k }
      });
    }
    function Se(k) {
      const r = ` {{ ${k.variable} }}`, L = q.value.message.variables ?? [], g = Array.from(/* @__PURE__ */ new Set([...L, k.variable]));
      k.field === "title" ? pe({
        title: q.value.message.title + r,
        variables: g
      }) : pe({
        body: q.value.message.body + r,
        variables: g
      });
    }
    function ee() {
      te.value && b("save", q.value);
    }
    return (k, r) => (s(), n("div", Nn, [
      e("div", On, [
        Ie(Ye, {
          "campaign-name": c(q).name,
          status: c(q).status,
          dirty: c(ge),
          "last-saved-at": c(A),
          "can-undo": c(x),
          "can-redo": c(B),
          "workflow-status": P.value,
          "slugify-name": m.enforceSlugName,
          "onUpdate:campaignName": Le,
          "onUpdate:workflowStatus": r[0] || (r[0] = (L) => c(N)({ workflow_status: L })),
          onUndo: c(ke),
          onRedo: c(he)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        re.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: c(de).dangerBg,
            border: `1px solid ${c(de).dangerBorder}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[12]}px ${c(Q)[16]}px`,
            marginBottom: `${c(Q)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: c(de).danger })
          }, [
            (s(!0), n(F, null, Y(re.value, (L) => (s(), n("li", {
              key: L.message
            }, p(L.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        h.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: c(de).neutral.bg,
            border: `1px solid ${c(de).neutral.border}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[12]}px ${c(Q)[16]}px`,
            marginBottom: `${c(Q)[16]}px`,
            fontSize: "0.875rem",
            color: c(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${c(Q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Mn, [
            (s(!0), n(F, null, Y(h.value, (L) => (s(), n("li", {
              key: L.message
            }, p(L.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", Dn, [
        e("aside", Wn, [
          a.disabledSections.includes("message") ? w("", !0) : (s(), n("div", Hn, [
            !c(q).message.title && !c(q).message.body ? (s(), n("div", zn, " Add a title and message below to get started. ")) : w("", !0),
            e("div", qn, [
              e("div", Fn, [
                r[12] || (r[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                e("span", jn, p(f.value), 1)
              ]),
              e("div", Kn, [
                Ie(ot, {
                  "template-type": _e.value,
                  onUpdate: Ce
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: W
                }, [
                  r[13] || (r[13] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(F, null, Y(c(ut), (L) => (s(), n("option", {
                    key: L.id,
                    value: L.id
                  }, p(L.label), 9, Yn))), 128))
                ], 32)
              ]),
              e("div", Jn, [
                e("div", Gn, [
                  r[14] || (r[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                  e("span", Xn, p(Z.value) + "%", 1)
                ]),
                e("div", Qn, [
                  e("span", {
                    class: "kb-push-health-fill",
                    style: ie({ width: `${Z.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(ja, {
              message: c(q).message,
              "title-count": ve.value,
              "body-count": H.value,
              "title-limit": M.value,
              "body-limit": me.value,
              "selected-platform": v.value,
              "show-reset": !0,
              "title-error": D.value,
              "body-error": ae.value,
              onUpdate: c(pe),
              onReset: r[1] || (r[1] = (L) => c(G)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            Ie(At, {
              message: c(q).message,
              "variable-options": a.variableOptions,
              onUpdate: c(pe),
              onInsertVariable: Se
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !a.designOnly && !a.disabledSections.includes("delivery") ? (s(), n("div", Zn, [
            r[15] || (r[15] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            Ie(Rs, {
              delivery: c(q).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: c(O),
              onReset: r[2] || (r[2] = (L) => c(ce)())
            }, null, 8, ["delivery", "onUpdate"]),
            Ie(Ws, {
              delivery: c(q).delivery,
              onUpdate: c(O)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : w("", !0)
        ]),
        e("main", el, [
          !a.designOnly && c(q).audience.test_mode ? (s(), n("div", tl, [...r[16] || (r[16] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            j(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", al, [
            e("div", sl, [
              e("label", nl, [
                r[18] || (r[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": r[3] || (r[3] = (L) => d.value = L),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  r[17] || (r[17] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(F, null, Y(c(Oe), (L) => (s(), n("option", {
                    key: L.id,
                    value: L.id
                  }, p(L.label), 9, ll))), 128))
                ], 512), [
                  [De, d.value]
                ])
              ]),
              e("div", ol, [
                r[19] || (r[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, p(v.value), 1)
              ])
            ]),
            e("div", il, [
              (s(), n(F, null, Y(["android", "ios", "web"], (L) => e("button", {
                key: L,
                type: "button",
                class: ye(["kb-push-device-btn", { "kb-push-device-btn--active": v.value === L }]),
                role: "tab",
                "aria-selected": v.value === L,
                "aria-controls": `kb-preview-panel-${L}`,
                onClick: (g) => v.value = L
              }, p(L.toUpperCase()), 11, rl)), 64))
            ]),
            e("div", {
              class: ye(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !U.value }])
            }, [
              !c(q).message.title && !c(q).message.body ? (s(), n("div", dl, [...r[20] || (r[20] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (s(), Mt(An, {
                key: 1,
                "get-preview": c(E),
                "selected-platform": v.value,
                "preview-profile": V.value,
                "onUpdate:selectedPlatform": r[4] || (r[4] = (L) => v.value = L)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ], 2)
          ])
        ])
      ]),
      e("footer", ul, [
        m.actionsNote ? (s(), n("div", cl, p(m.actionsNote), 1)) : w("", !0),
        e("div", pl, [
          !a.designOnly && a.showHistory ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: r[5] || (r[5] = (L) => y.value = !0)
          }, " Version history ")) : w("", !0),
          !a.designOnly && a.showSaveVersion ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: r[6] || (r[6] = (L) => b("save-version", JSON.parse(JSON.stringify(c(q)))))
          }, " Save as version ")) : w("", !0),
          a.showDuplicate ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: r[7] || (r[7] = (L) => b("duplicate", JSON.parse(JSON.stringify(c(q)))))
          }, " Duplicate ")) : w("", !0),
          a.showSave ? (s(), n("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: ee
          }, " Save ")) : w("", !0),
          a.showClose ? (s(), n("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: r[8] || (r[8] = (L) => b("edit"))
          }, " Close ")) : w("", !0)
        ])
      ]),
      C.value ? (s(), n("div", ml, [
        e("div", vl, [
          r[21] || (r[21] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          r[22] || (r[22] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", bl, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: r[9] || (r[9] = (L) => {
                C.value = !1, I.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: r[10] || (r[10] = (L) => I.value && z(I.value))
            }, " Replace ")
          ])
        ])
      ])) : w("", !0),
      Ie(Lt, {
        open: y.value,
        versions: a.versions,
        onClose: r[11] || (r[11] = (L) => y.value = !1),
        onRestore: X
      }, null, 8, ["open", "versions"])
    ]));
  }
}), Ut = /* @__PURE__ */ xe(gl, [["__scopeId", "data-v-3e789936"]]), fl = { class: "kb-section" }, yl = { class: "kb-section__head" }, hl = { class: "kb-summary-bar" }, kl = { class: "kb-pill kb-pill--category" }, _l = { class: "kb-pill kb-pill--format" }, wl = { class: "kb-pill kb-pill--status" }, $l = { class: "kb-field" }, xl = ["value"], Cl = { class: "kb-field" }, Sl = { class: "kb-label" }, Il = { class: "kb-helper" }, Bl = ["value"], Al = ["value"], Ll = { class: "kb-field" }, Ul = ["value"], Rl = { class: "kb-field kb-field--inline" }, Tl = { class: "kb-field-half" }, Pl = ["value"], Vl = { class: "kb-field" }, El = ["value"], Nl = {
  key: 0,
  class: "kb-field"
}, Ol = { class: "kb-label" }, Ml = ["value"], Dl = {
  key: 1,
  class: "kb-field"
}, Wl = ["value"], Hl = {
  key: 2,
  class: "kb-field"
}, zl = ["value"], ql = {
  key: 3,
  class: "kb-field"
}, Fl = ["value"], jl = { class: "kb-field" }, Kl = ["value"], Yl = ["value"], Jl = { class: "kb-location-row" }, Gl = ["value"], Xl = ["value"], Ql = ["value"], Zl = { class: "kb-location-row" }, eo = ["value"], to = ["value"], ao = { class: "kb-location-row" }, so = ["value"], no = ["value"], lo = { class: "kb-location-row" }, oo = ["value"], io = ["value"], ro = ["value"], uo = { class: "kb-location-row" }, co = ["value"], po = ["value"], mo = { class: "kb-location-row" }, vo = ["value"], bo = ["value"], go = { class: "kb-location-row" }, fo = ["value"], yo = ["value"], ho = {
  key: 4,
  class: "kb-field kb-field--inline"
}, ko = { class: "kb-location-row" }, _o = ["value"], wo = ["value"], $o = ["value"], xo = ["value"], Co = {
  key: 5,
  class: "kb-field"
}, So = ["value"], Io = {
  key: 6,
  class: "kb-field"
}, Bo = ["value"], Ao = {
  key: 7,
  class: "kb-field"
}, Lo = ["value"], Uo = ["value"], Ro = {
  key: 8,
  class: "kb-field"
}, To = { class: "kb-wa-buttons" }, Po = ["value", "onInput"], Vo = ["value", "onInput"], Eo = ["value", "onInput"], No = ["value", "onInput"], Oo = ["onClick"], Mo = ["disabled"], Do = {
  key: 9,
  class: "kb-field"
}, Wo = { class: "kb-wa-buttons" }, Ho = ["value", "onInput"], zo = ["value", "onInput"], qo = ["onClick"], Fo = {
  key: 10,
  class: "kb-field"
}, jo = ["value"], Ko = ["value"], Yo = { class: "kb-field" }, Jo = { class: "kb-label" }, Go = ["value"], Xo = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, Qo = { class: "kb-wa-fields-list" }, Zo = { class: "kb-wa-field-name" }, ei = { class: "kb-wa-field-status" }, ti = { class: "kb-field" }, ai = ["value"], si = { class: "kb-field" }, ni = { class: "kb-wa-buttons" }, li = ["value", "onInput"], oi = ["value", "onChange"], ii = ["value", "onInput"], ri = ["value", "onInput"], di = {
  key: 2,
  class: "kb-opt-out-note"
}, ui = ["onClick"], ci = ["disabled"], Xe = 60, Qe = 1024, Ze = 60, et = 10, vt = 10, pi = /* @__PURE__ */ we({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: i }) {
    const m = a, b = i, v = [
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
    ], d = $(() => m.message), C = $(() => d.value.template_type ?? "text"), I = $(() => d.value.header_type ?? "none"), y = $(() => String(d.value.header ?? "")), P = $(() => String(d.value.body ?? "")), V = $(() => String(d.value.footer ?? "")), z = $(() => d.value.buttons ?? []), W = $(() => d.value.products ?? []), X = $(() => d.value.cards ?? []), q = $(() => {
      const R = v.find((u) => u.value === C.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), ge = $(() => {
      const R = String(d.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), K = $(() => {
      const R = v.find((u) => u.value === C.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), J = $(() => d.value.template_name ? P.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function N(R) {
      if (!R || typeof R != "string") return [];
      const u = /\{\{\s*([^}]+?)\s*\}\}/g, ne = /* @__PURE__ */ new Set();
      let ue;
      for (; (ue = u.exec(R)) !== null; ) ne.add(ue[1].trim());
      return Array.from(ne);
    }
    const pe = $(() => {
      const R = m.message.header ?? "", u = m.message.body ?? m.message.body ?? "", ne = new Set(m.message.variables ?? []), ue = [...N(R), ...N(u)];
      return Array.from(new Set(ue)).map((re) => ({ name: re, configured: ne.has(re) }));
    });
    function O(R) {
      b("update", R);
    }
    function ke(R) {
      const u = {
        template_category: R || void 0
      };
      R === "authentication" && C.value !== "auth" && (u.template_type = "auth"), O(u);
    }
    function he(R) {
      const u = { template_type: R };
      R === "auth" && (u.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (u.header_type = R), O(u);
    }
    function x(R, u) {
      var ue;
      const ne = [...z.value];
      ne[R] = {
        ...ne[R],
        id: ((ue = ne[R]) == null ? void 0 : ue.id) || `btn_${R + 1}`,
        ...u
      }, O({ buttons: ne });
    }
    function B(R) {
      const u = [...z.value];
      u.splice(R, 1), O({ buttons: u });
    }
    function G() {
      const R = [...z.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), O({ buttons: R });
    }
    function ce(R, u) {
      var ue;
      const ne = [...W.value];
      ne[R] = {
        ...ne[R],
        id: ((ue = ne[R]) == null ? void 0 : ue.id) || `prod_${R + 1}`,
        ...u
      }, O({ products: ne });
    }
    function E(R) {
      const u = [...W.value];
      u.splice(R, 1), O({ products: u });
    }
    function fe() {
      const R = [...W.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), O({ products: R });
    }
    function oe(R, u) {
      var ue;
      const ne = [...X.value];
      ne[R] = {
        ...ne[R],
        id: ((ue = ne[R]) == null ? void 0 : ue.id) || `card_${R + 1}`,
        ...u
      }, O({ cards: ne });
    }
    function A(R) {
      const u = [...X.value];
      u.splice(R, 1), O({ cards: u });
    }
    function be() {
      const R = [...X.value];
      R.push({
        id: `card_${R.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), O({ cards: R });
    }
    return (R, u) => {
      var ne, ue, $e, re;
      return s(), n("section", fl, [
        e("div", yl, [
          u[40] || (u[40] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: u[0] || (u[0] = (h) => R.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        u[69] || (u[69] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
        e("div", hl, [
          e("span", kl, p(ge.value), 1),
          e("span", _l, p(K.value), 1),
          e("span", wl, p(J.value), 1)
        ]),
        e("div", $l, [
          u[42] || (u[42] = e("label", { class: "kb-label" }, [
            j(" Category (purpose) "),
            e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: d.value.template_category ?? "",
            onChange: u[1] || (u[1] = (h) => ke(h.target.value))
          }, [...u[41] || (u[41] = [
            e("option", { value: "" }, "Select category", -1),
            e("option", { value: "marketing" }, "Marketing", -1),
            e("option", { value: "utility" }, "Utility", -1),
            e("option", { value: "authentication" }, "Authentication", -1)
          ])], 40, xl)
        ]),
        e("div", Cl, [
          e("label", Sl, [
            u[43] || (u[43] = j(" Functional format ", -1)),
            e("span", Il, p(q.value), 1)
          ]),
          e("select", {
            class: "kb-select",
            value: C.value,
            onChange: u[2] || (u[2] = (h) => he(h.target.value))
          }, [
            (s(), n(F, null, Y(v, (h) => e("option", {
              key: h.value,
              value: h.value
            }, p(h.label), 9, Al)), 64))
          ], 40, Bl)
        ]),
        e("div", Ll, [
          u[44] || (u[44] = e("label", { class: "kb-label" }, [
            j(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: d.value.template_name ?? "",
            onInput: u[3] || (u[3] = (h) => O({
              template_name: h.target.value || void 0
            }))
          }, null, 40, Ul)
        ]),
        e("div", Rl, [
          e("div", Tl, [
            u[45] || (u[45] = e("label", { class: "kb-label" }, [
              j(" Template language "),
              e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. en_US",
              value: d.value.template_language ?? "",
              onInput: u[4] || (u[4] = (h) => O({
                template_language: h.target.value || void 0
              }))
            }, null, 40, Pl)
          ]),
          e("div", { class: "kb-field-half" }, [
            e("div", { class: "kb-meta-card" }, [
              u[46] || (u[46] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
              e("ul", { class: "kb-meta-list" }, [
                e("li", null, "Header text: " + p(Xe) + " chars"),
                e("li", null, "Body: " + p(Qe) + " chars"),
                e("li", null, "Footer: " + p(Ze) + " chars"),
                e("li", null, "Buttons: up to " + p(et))
              ])
            ])
          ])
        ]),
        e("div", Vl, [
          u[48] || (u[48] = e("label", { class: "kb-label" }, [
            j(" Header component (optional) "),
            e("span", { class: "kb-helper" }, "Header can be text or rich media.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: I.value,
            onChange: u[5] || (u[5] = (h) => O({ header_type: h.target.value }))
          }, [...u[47] || (u[47] = [
            Me('<option value="none" data-v-3f9963bf>No header</option><option value="text" data-v-3f9963bf>Text header</option><option value="image" data-v-3f9963bf>Image header</option><option value="video" data-v-3f9963bf>Video header</option><option value="document" data-v-3f9963bf>Document header</option>', 5)
          ])], 40, El)
        ]),
        I.value === "text" ? (s(), n("div", Nl, [
          e("label", Ol, [
            u[49] || (u[49] = j(" Header text ", -1)),
            e("span", {
              class: ye(["kb-counter", { "kb-counter--warn": y.value.length > Xe }])
            }, p(y.value.length) + "/" + p(Xe), 3)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: y.value,
            onInput: u[6] || (u[6] = (h) => O({
              header: h.target.value || void 0
            }))
          }, null, 40, Ml)
        ])) : w("", !0),
        ["image", "video", "document"].includes(I.value) || ["image", "video", "document"].includes(C.value) ? (s(), n("div", Dl, [
          u[50] || (u[50] = e("label", { class: "kb-label" }, [
            j(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: d.value.media_url ?? "",
            onInput: u[7] || (u[7] = (h) => O({
              media_url: h.target.value || void 0
            }))
          }, null, 40, Wl)
        ])) : w("", !0),
        I.value === "document" || C.value === "document" ? (s(), n("div", Hl, [
          u[51] || (u[51] = e("label", { class: "kb-label" }, [
            j(" Document filename "),
            e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. invoice.pdf",
            value: d.value.document_filename ?? "",
            onInput: u[8] || (u[8] = (h) => O({
              document_filename: h.target.value || void 0
            }))
          }, null, 40, zl)
        ])) : w("", !0),
        ["image", "video", "document"].includes(I.value) || ["image", "video", "document"].includes(C.value) ? (s(), n("div", ql, [
          u[52] || (u[52] = e("label", { class: "kb-label" }, [
            j(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: d.value.media_caption ?? "",
            onInput: u[9] || (u[9] = (h) => O({
              media_caption: h.target.value || void 0
            }))
          }, null, 40, Fl)
        ])) : w("", !0),
        e("div", jl, [
          u[53] || (u[53] = e("label", { class: "kb-label" }, [
            j(" Advanced preview details (optional) "),
            e("span", { class: "kb-helper" }, "Use these to preview WhatsApp-native cards like links, voice notes, contacts, orders, and reactions.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Link title",
            value: d.value.link_title ?? "",
            onInput: u[10] || (u[10] = (h) => O({ link_title: h.target.value || void 0 }))
          }, null, 40, Kl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Link description",
            value: d.value.link_description ?? "",
            onInput: u[11] || (u[11] = (h) => O({ link_description: h.target.value || void 0 }))
          }, null, 40, Yl),
          e("div", Jl, [
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Link URL",
              value: d.value.link_url ?? "",
              onInput: u[12] || (u[12] = (h) => O({ link_url: h.target.value || void 0 }))
            }, null, 40, Gl),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Link domain",
              value: d.value.link_domain ?? "",
              onInput: u[13] || (u[13] = (h) => O({ link_domain: h.target.value || void 0 }))
            }, null, 40, Xl)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Voice transcript",
            value: d.value.voice_transcript ?? "",
            onInput: u[14] || (u[14] = (h) => O({ voice_transcript: h.target.value || void 0 }))
          }, null, 40, Ql),
          e("div", Zl, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Voice duration (e.g. 0:10)",
              value: d.value.voice_duration ?? "",
              onInput: u[15] || (u[15] = (h) => O({ voice_duration: h.target.value || void 0 }))
            }, null, 40, eo),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Voice profile image URL",
              value: d.value.voice_profile_image ?? "",
              onInput: u[16] || (u[16] = (h) => O({ voice_profile_image: h.target.value || void 0 }))
            }, null, 40, to)
          ]),
          e("div", ao, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Contact name",
              value: d.value.contact_name ?? "",
              onInput: u[17] || (u[17] = (h) => O({ contact_name: h.target.value || void 0 }))
            }, null, 40, so),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Contact title",
              value: d.value.contact_title ?? "",
              onInput: u[18] || (u[18] = (h) => O({ contact_title: h.target.value || void 0 }))
            }, null, 40, no)
          ]),
          e("div", lo, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Contact phone",
              value: d.value.contact_phone ?? "",
              onInput: u[19] || (u[19] = (h) => O({ contact_phone: h.target.value || void 0 }))
            }, null, 40, oo),
            e("input", {
              type: "email",
              class: "kb-input",
              placeholder: "Contact email",
              value: d.value.contact_email ?? "",
              onInput: u[20] || (u[20] = (h) => O({ contact_email: h.target.value || void 0 }))
            }, null, 40, io)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Contact address",
            value: d.value.contact_address ?? "",
            onInput: u[21] || (u[21] = (h) => O({ contact_address: h.target.value || void 0 }))
          }, null, 40, ro),
          e("div", uo, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Order title",
              value: d.value.order_title ?? "",
              onInput: u[22] || (u[22] = (h) => O({ order_title: h.target.value || void 0 }))
            }, null, 40, co),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Order items text",
              value: d.value.order_items ?? "",
              onInput: u[23] || (u[23] = (h) => O({ order_items: h.target.value || void 0 }))
            }, null, 40, po)
          ]),
          e("div", mo, [
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Order image URL",
              value: d.value.order_image ?? "",
              onInput: u[24] || (u[24] = (h) => O({ order_image: h.target.value || void 0 }))
            }, null, 40, vo),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Order button label",
              value: d.value.order_button_label ?? "",
              onInput: u[25] || (u[25] = (h) => O({ order_button_label: h.target.value || void 0 }))
            }, null, 40, bo)
          ]),
          e("div", go, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Location request button label",
              value: d.value.location_request_label ?? "",
              onInput: u[26] || (u[26] = (h) => O({ location_request_label: h.target.value || void 0 }))
            }, null, 40, fo),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Reaction emoji (e.g. 😀)",
              value: d.value.reaction_emoji ?? "",
              onInput: u[27] || (u[27] = (h) => O({ reaction_emoji: h.target.value || void 0 }))
            }, null, 40, yo)
          ])
        ]),
        C.value === "location" ? (s(), n("div", ho, [
          u[54] || (u[54] = e("label", { class: "kb-label" }, [
            j(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", ko, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((ne = d.value.location) == null ? void 0 : ne.lat) ?? "",
              onInput: u[28] || (u[28] = (h) => {
                const te = { ...d.value.location ?? {} };
                te.lat = Number(h.target.value), O({ location: te });
              })
            }, null, 40, _o),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ue = d.value.location) == null ? void 0 : ue.lon) ?? "",
              onInput: u[29] || (u[29] = (h) => {
                const te = { ...d.value.location ?? {} };
                te.lon = Number(h.target.value), O({ location: te });
              })
            }, null, 40, wo)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: (($e = d.value.location) == null ? void 0 : $e.name) ?? "",
            onInput: u[30] || (u[30] = (h) => {
              const te = { ...d.value.location ?? {} };
              te.name = h.target.value || void 0, O({ location: te });
            })
          }, null, 40, $o),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((re = d.value.location) == null ? void 0 : re.address) ?? "",
            onInput: u[31] || (u[31] = (h) => {
              const te = { ...d.value.location ?? {} };
              te.address = h.target.value || void 0, O({ location: te });
            })
          }, null, 40, xo)
        ])) : w("", !0),
        C.value === "coupon" ? (s(), n("div", Co, [
          u[55] || (u[55] = e("label", { class: "kb-label" }, [
            j(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: d.value.coupon_code ?? "",
            onInput: u[32] || (u[32] = (h) => O({
              coupon_code: h.target.value || void 0
            }))
          }, null, 40, So)
        ])) : w("", !0),
        C.value === "lto" ? (s(), n("div", Io, [
          u[56] || (u[56] = e("label", { class: "kb-label" }, [
            j(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: d.value.lto_expiry ?? "",
            onInput: u[33] || (u[33] = (h) => O({
              lto_expiry: h.target.value || void 0
            }))
          }, null, 40, Bo)
        ])) : w("", !0),
        C.value === "flow" ? (s(), n("div", Ao, [
          u[57] || (u[57] = e("label", { class: "kb-label" }, [
            j(" Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: d.value.flow_id ?? "",
            onInput: u[34] || (u[34] = (h) => O({
              flow_id: h.target.value || void 0
            }))
          }, null, 40, Lo),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: d.value.flow_cta_label ?? "",
            onInput: u[35] || (u[35] = (h) => O({
              flow_cta_label: h.target.value || void 0
            }))
          }, null, 40, Uo)
        ])) : w("", !0),
        C.value === "carousel" ? (s(), n("div", Ro, [
          e("label", { class: "kb-label" }, [
            u[58] || (u[58] = j(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + p(vt) + " cards.")
          ]),
          e("div", To, [
            (s(!0), n(F, null, Y(X.value, (h, te) => (s(), n("div", {
              key: h.id || te,
              class: "kb-card-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Card title",
                value: h.title ?? "",
                onInput: (Z) => oe(Number(te), { title: Z.target.value })
              }, null, 40, Po),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Card media URL",
                value: h.media_url ?? "",
                onInput: (Z) => oe(Number(te), { media_url: Z.target.value })
              }, null, 40, Vo),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label",
                value: h.button_label ?? "",
                onInput: (Z) => oe(Number(te), { button_label: Z.target.value })
              }, null, 40, Eo),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Button URL",
                value: h.button_url ?? "",
                onInput: (Z) => oe(Number(te), { button_url: Z.target.value })
              }, null, 40, No),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (Z) => A(Number(te))
              }, "Remove", 8, Oo)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: X.value.length >= vt,
              onClick: be
            }, " Add card ", 8, Mo)
          ])
        ])) : w("", !0),
        ["mpm", "catalog"].includes(C.value) ? (s(), n("div", Do, [
          u[59] || (u[59] = e("label", { class: "kb-label" }, [
            j(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", Wo, [
            (s(!0), n(F, null, Y(W.value, (h, te) => (s(), n("div", {
              key: h.id || te,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: h.productId,
                onInput: (Z) => ce(Number(te), { productId: Z.target.value })
              }, null, 40, Ho),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: h.sectionTitle,
                onInput: (Z) => ce(Number(te), { sectionTitle: Z.target.value || void 0 })
              }, null, 40, zo),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (Z) => E(Number(te))
              }, " Remove ", 8, qo)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: fe
            }, " Add product ")
          ])
        ])) : w("", !0),
        C.value === "auth" ? (s(), n("div", Fo, [
          u[61] || (u[61] = e("label", { class: "kb-label" }, [
            j(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: d.value.auth_type ?? "otp",
            onChange: u[36] || (u[36] = (h) => O({
              auth_type: h.target.value
            }))
          }, [...u[60] || (u[60] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, jo),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: d.value.auth_label ?? "",
            onInput: u[37] || (u[37] = (h) => O({
              auth_label: h.target.value || void 0
            }))
          }, null, 40, Ko)
        ])) : w("", !0),
        e("div", Yo, [
          e("label", Jo, [
            u[62] || (u[62] = j(" Body ", -1)),
            u[63] || (u[63] = e("span", { class: "kb-helper" }, " Body is required. Use the exact approved text with variables like " + p(1) + ", " + p(2) + ". ", -1)),
            e("span", {
              class: ye(["kb-counter", { "kb-counter--warn": P.value.length > Qe }])
            }, p(P.value.length) + "/" + p(Qe), 3)
          ]),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: P.value,
            onInput: u[38] || (u[38] = (h) => O({
              body: h.target.value || void 0
            }))
          }, null, 40, Go)
        ]),
        pe.value.length > 0 ? (s(), n("div", Xo, [
          u[64] || (u[64] = e("label", { class: "kb-label" }, "Template fields", -1)),
          u[65] || (u[65] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", Qo, [
            (s(!0), n(F, null, Y(pe.value, (h) => (s(), n("li", {
              key: h.name,
              class: ye(["kb-wa-field-item", { "kb-wa-field-item--ok": h.configured }])
            }, [
              e("span", Zo, p(h.name), 1),
              e("span", ei, p(h.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : w("", !0),
        e("div", ti, [
          u[66] || (u[66] = e("label", { class: "kb-label" }, [
            j(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: V.value,
            onInput: u[39] || (u[39] = (h) => O({
              footer: h.target.value || void 0
            }))
          }, null, 40, ai),
          e("div", {
            class: ye(["kb-counter kb-counter--inline", { "kb-counter--warn": V.value.length > Ze }])
          }, p(V.value.length) + "/" + p(Ze), 3)
        ]),
        e("div", si, [
          e("label", { class: "kb-label" }, [
            u[67] || (u[67] = j(" Buttons (optional) ", -1)),
            e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + p(et) + " buttons. ")
          ]),
          e("div", ni, [
            (s(!0), n(F, null, Y(z.value, (h, te) => (s(), n("div", {
              key: h.id || te,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: h.label,
                onInput: (Z) => x(Number(te), { label: Z.target.value })
              }, null, 40, li),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: h.type ?? "quick_reply",
                onChange: (Z) => x(Number(te), { type: Z.target.value })
              }, [...u[68] || (u[68] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1),
                e("option", { value: "opt_out" }, "Marketing opt-out", -1)
              ])], 40, oi),
              h.type === "url" ? (s(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: h.url,
                onInput: (Z) => x(Number(te), { url: Z.target.value || void 0 })
              }, null, 40, ii)) : h.type === "call" ? (s(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: h.phone,
                onInput: (Z) => x(Number(te), { phone: Z.target.value || void 0 })
              }, null, 40, ri)) : h.type === "opt_out" ? (s(), n("span", di, " Sends a built-in opt-out action. ")) : w("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (Z) => B(Number(te))
              }, " Remove ", 8, ui)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: z.value.length >= et,
              onClick: G
            }, " Add button ", 8, ci)
          ])
        ])
      ]);
    };
  }
}), mi = /* @__PURE__ */ xe(pi, [["__scopeId", "data-v-3f9963bf"]]), vi = { class: "wa-preview-root" }, bi = { class: "wa-device" }, gi = { class: "wa-screen" }, fi = { class: "wa-header" }, yi = { class: "wa-titleblock" }, hi = { class: "wa-title-row" }, ki = { class: "wa-title" }, _i = { class: "wa-subtitle" }, wi = {
  key: 0,
  class: "wa-flow-shell"
}, $i = { class: "wa-flow-header" }, xi = { class: "wa-flow-title" }, Ci = { class: "wa-flow-content" }, Si = { class: "wa-flow-eyebrow" }, Ii = {
  key: 0,
  class: "wa-flow-products"
}, Bi = { class: "wa-flow-footer" }, Ai = {
  type: "button",
  class: "wa-flow-cta"
}, Li = { class: "wa-managed" }, Ui = {
  key: 1,
  class: "wa-thread"
}, Ri = { class: "wa-secure-banner" }, Ti = { class: "wa-msg wa-msg--in" }, Pi = { class: "wa-template-card" }, Vi = {
  key: 0,
  class: "wa-card-media"
}, Ei = { class: "wa-card-media-tag" }, Ni = { class: "wa-card-media-sub" }, Oi = {
  key: 1,
  class: "wa-card-header-text"
}, Mi = ["innerHTML"], Di = {
  key: 2,
  class: "wa-link-preview"
}, Wi = { class: "wa-link-preview-head" }, Hi = { class: "wa-link-preview-text" }, zi = ["href"], qi = {
  key: 3,
  class: "wa-inline-note"
}, Fi = {
  key: 4,
  class: "wa-inline-note"
}, ji = {
  key: 5,
  class: "wa-inline-note"
}, Ki = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, Yi = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, Ji = {
  key: 8,
  class: "wa-product-list"
}, Gi = { class: "wa-product-name" }, Xi = { class: "wa-product-price" }, Qi = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Zi = {
  key: 10,
  class: "wa-template-actions"
}, er = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, tr = { class: "wa-order-card" }, ar = { class: "wa-order-card-top" }, sr = ["src"], nr = { type: "button" }, lr = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, or = { class: "wa-document-card" }, ir = { class: "wa-document-file" }, rr = { class: "wa-document-icon" }, dr = { class: "wa-document-caption" }, ur = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, cr = { class: "wa-voice-card" }, pr = { class: "wa-voice-top" }, mr = { class: "wa-voice-profile" }, vr = ["src"], br = { class: "wa-voice-duration" }, gr = { class: "wa-voice-transcript" }, fr = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, yr = { class: "wa-contact-card" }, hr = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, kr = { class: "wa-location-card" }, _r = { class: "wa-location-content" }, wr = { type: "button" }, $r = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, xr = { class: "wa-carousel-track" }, Cr = { type: "button" }, Sr = { class: "wa-msg wa-msg--out" }, Ir = { class: "wa-bubble wa-bubble--out" }, Br = { class: "wa-bubble-author" }, Ar = {
  key: 0,
  class: "wa-reaction"
}, Lr = { class: "wa-msg wa-msg--in" }, Ur = { class: "wa-bubble wa-bubble--in" }, Rr = /* @__PURE__ */ we({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(a) {
    const i = a;
    function m(x) {
      return String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const b = $(() => {
      var G;
      const x = ((G = i.template) == null ? void 0 : G.body) ?? "";
      return m(x).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), v = $(() => i.template.templateName || "Ecoshop"), d = $(() => "Business Account"), C = $(() => i.template.format === "flow" || !!i.template.flow), I = $(() => {
      var x;
      return (x = i.template.buttons) == null ? void 0 : x[0];
    }), y = $(() => {
      var x, B;
      return ((x = I.value) == null ? void 0 : x.text) || ((B = i.template.flow) == null ? void 0 : B.ctaLabel) || "Continue";
    }), P = $(() => i.template.buttons ?? []), V = $(() => {
      var x;
      return (((x = i.template.multiProduct) == null ? void 0 : x.length) ?? 0) > 0;
    }), z = $(() => (i.template.format || "text").toUpperCase()), W = $(() => {
      const x = i.template.header;
      return !x || x.type === "text" ? "" : x.type === "image" ? x.url || "Image" : x.type === "video" ? x.url || "Video" : x.filename || x.url || "Document";
    }), X = $(() => {
      const x = i.template.header;
      if (!(!x || x.type !== "image" || !x.url))
        return { backgroundImage: `url(${x.url})` };
    }), q = $(() => {
      const x = (i.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (x == null ? void 0 : x[0]) || "";
    });
    function ge(x) {
      try {
        return new URL(x).hostname;
      } catch {
        return "example.com";
      }
    }
    const K = $(() => {
      const x = i.template.linkPreview;
      return !x && !q.value ? null : {
        title: (x == null ? void 0 : x.title) || "Link preview",
        description: (x == null ? void 0 : x.description) || "Preview from your WhatsApp template link.",
        domain: (x == null ? void 0 : x.domain) || (q.value ? ge(q.value) : "example.com"),
        url: (x == null ? void 0 : x.url) || q.value || "#",
        thumbnail: (x == null ? void 0 : x.thumbnail) || ""
      };
    }), J = $(() => {
      var G, ce, E;
      const B = (E = (((G = i.template.documentCard) == null ? void 0 : G.filename) || ((ce = i.template.header) == null ? void 0 : ce.filename) || "").split(".").pop()) == null ? void 0 : E.trim().toUpperCase();
      return B ? B.slice(0, 4) : "DOC";
    });
    function N(x, B) {
      return x === "phone_number" ? "wa-btn-icon--phone" : x === "url" ? "wa-btn-icon--external" : x === "copy_code" ? "wa-btn-icon--code" : x === "opt_out" || (B || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (B || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const pe = $(() => {
      var x;
      return i.template.location || i.template.locationRequest ? "wa-side-icon--info" : ((x = i.template.header) == null ? void 0 : x.type) === "video" || i.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), O = $(() => {
      var B, G, ce;
      const x = i.template;
      return x.format === "flow" ? "Thanks, we received your preferences." : (B = x.auth) != null && B.code ? "Use the verification code and let us know if it works." : (G = x.coupon) != null && G.code ? `Your coupon ${x.coupon.code} is active now.` : x.limitedOffer ? `Great choice. This offer is valid until ${x.limitedOffer}.` : (ce = i.template.multiProduct) != null && ce.length ? `Here are ${i.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), ke = $(() => {
      var B, G;
      const x = i.template;
      return x.location ? x.location.name || x.location.address || `${x.location.lat}, ${x.location.lng}` : (B = x.auth) != null && B.code ? `Verification code: ${x.auth.code}` : (G = x.flow) != null && G.id ? `Flow ID: ${x.flow.id}` : x.templateLanguage ? `Template language: ${x.templateLanguage}` : `Category: ${x.templateCategory || "utility"} • Format: ${x.format || "text"}`;
    }), he = $(() => {
      var G, ce;
      const x = i.template;
      if ((G = x.multiProduct) != null && G.length) return x.multiProduct.slice(0, 5).map((E) => E.name || "Product");
      if ((ce = x.buttons) != null && ce.length) return x.buttons.slice(0, 5).map((E) => E.text || "Option");
      const B = (x.body || "").split(/\n|\.|,/).map((E) => E.trim()).filter(Boolean).slice(0, 5);
      return B.length ? B : ["Option A", "Option B", "Option C"];
    });
    return (x, B) => {
      var G, ce, E, fe, oe, A, be, R, u, ne, ue, $e;
      return s(), n("div", vi, [
        e("div", bi, [
          e("div", gi, [
            B[28] || (B[28] = Me('<div class="wa-statusbar" data-v-a0c1e275><span class="wa-time" data-v-a0c1e275>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-a0c1e275><span class="wa-signal" data-v-a0c1e275></span><span class="wa-wifi" data-v-a0c1e275></span><span class="wa-battery" data-v-a0c1e275></span></div></div>', 1)),
            e("div", fi, [
              B[6] || (B[6] = e("span", { class: "wa-back" }, "←", -1)),
              B[7] || (B[7] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", yi, [
                e("div", hi, [
                  e("span", ki, p(v.value), 1),
                  B[5] || (B[5] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", _i, p(d.value), 1)
              ]),
              B[8] || (B[8] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            C.value ? (s(), n("div", wi, [
              B[13] || (B[13] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", $i, [
                B[9] || (B[9] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", xi, p(v.value), 1),
                B[10] || (B[10] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Ci, [
                e("p", Si, p(a.template.body || "Please choose an option below."), 1),
                (s(!0), n(F, null, Y(he.value, (re, h) => (s(), n("div", {
                  key: `flow-opt-${h}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, p(re), 1),
                  e("span", {
                    class: ye(["wa-radio", { "wa-radio--on": h === 0 }])
                  }, null, 2)
                ]))), 128)),
                (G = a.template.multiProduct) != null && G.length ? (s(), n("div", Ii, [
                  (s(!0), n(F, null, Y(a.template.multiProduct.slice(0, 3), (re, h) => (s(), n("div", {
                    key: h,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, p(re.name || "Product"), 1),
                      e("p", null, p(re.price || "Price on request"), 1)
                    ]),
                    B[11] || (B[11] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : w("", !0)
              ]),
              e("div", Bi, [
                e("button", Ai, p(y.value), 1),
                e("p", Li, [
                  B[12] || (B[12] = j("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: B[0] || (B[0] = We(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (s(), n("div", Ui, [
              B[27] || (B[27] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Ri, [
                B[14] || (B[14] = e("span", null, "●", -1)),
                B[15] || (B[15] = j(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: B[1] || (B[1] = We(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", Ti, [
                e("div", Pi, [
                  a.template.header && a.template.header.type !== "text" ? (s(), n("div", Vi, [
                    e("div", Ei, p(z.value) + " TEMPLATE", 1),
                    e("div", Ni, p(W.value), 1),
                    X.value ? (s(), n("div", {
                      key: 0,
                      class: "wa-card-media-image",
                      style: ie(X.value)
                    }, null, 4)) : w("", !0)
                  ])) : (ce = a.template.header) != null && ce.text ? (s(), n("div", Oi, p(a.template.header.text), 1)) : w("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: b.value
                  }, null, 8, Mi),
                  K.value ? (s(), n("div", Di, [
                    e("div", Wi, [
                      K.value.thumbnail ? (s(), n("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: ie({ backgroundImage: `url(${K.value.thumbnail})` })
                      }, null, 4)) : w("", !0),
                      e("div", Hi, [
                        e("strong", null, p(K.value.title), 1),
                        e("p", null, p(K.value.description), 1),
                        e("span", null, p(K.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: K.value.url,
                      onClick: B[2] || (B[2] = We(() => {
                      }, ["prevent"]))
                    }, p(K.value.url), 9, zi)
                  ])) : w("", !0),
                  a.template.location ? (s(), n("div", qi, " 📍 " + p(a.template.location.name || a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)) : w("", !0),
                  (E = a.template.coupon) != null && E.code ? (s(), n("div", Fi, [
                    B[16] || (B[16] = j(" Coupon: ", -1)),
                    e("strong", null, p(a.template.coupon.code), 1)
                  ])) : w("", !0),
                  (fe = a.template.auth) != null && fe.code ? (s(), n("div", ji, [
                    B[17] || (B[17] = j(" Verification code: ", -1)),
                    e("strong", null, p(a.template.auth.code), 1)
                  ])) : w("", !0),
                  a.template.limitedOffer ? (s(), n("div", Ki, " Expires: " + p(a.template.limitedOffer), 1)) : w("", !0),
                  a.template.footer ? (s(), n("div", Yi, p(a.template.footer), 1)) : w("", !0),
                  V.value ? (s(), n("div", Ji, [
                    (s(!0), n(F, null, Y((oe = a.template.multiProduct) == null ? void 0 : oe.slice(0, 4), (re, h) => (s(), n("div", {
                      key: `prod-${h}`,
                      class: "wa-product-row"
                    }, [
                      e("span", Gi, p(re.name || `Item ${h + 1}`), 1),
                      e("span", Xi, p(re.price || "-"), 1)
                    ]))), 128))
                  ])) : w("", !0),
                  y.value ? (s(), n("button", Qi, [
                    I.value ? (s(), n("span", {
                      key: 0,
                      class: ye(["wa-btn-icon", N(I.value.type, I.value.value || I.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : w("", !0),
                    j(" " + p(y.value), 1)
                  ])) : w("", !0),
                  P.value.length > 1 ? (s(), n("div", Zi, [
                    (s(!0), n(F, null, Y(P.value.slice(1, 4), (re, h) => (s(), n("button", {
                      key: `action-${h}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ye(["wa-btn-icon", N(re.type, re.value || re.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      j(" " + p(re.text), 1)
                    ]))), 128))
                  ])) : w("", !0),
                  B[18] || (B[18] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ye(["wa-side-icon", pe.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              a.template.orderCard ? (s(), n("div", er, [
                e("div", tr, [
                  e("div", ar, [
                    a.template.orderCard.image ? (s(), n("img", {
                      key: 0,
                      src: a.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, sr)) : w("", !0),
                    e("div", null, [
                      e("strong", null, p(a.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, p(a.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", nr, p(a.template.orderCard.buttonLabel || "View"), 1),
                  B[19] || (B[19] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : w("", !0),
              a.template.documentCard || ((A = a.template.header) == null ? void 0 : A.type) === "document" ? (s(), n("div", lr, [
                e("div", or, [
                  e("div", ir, [
                    e("span", rr, p(J.value), 1),
                    e("div", null, [
                      e("strong", null, p(((be = a.template.documentCard) == null ? void 0 : be.filename) || ((R = a.template.header) == null ? void 0 : R.filename) || "document.pdf"), 1),
                      e("p", null, p(((u = a.template.documentCard) == null ? void 0 : u.size) || "243 KB • html"), 1)
                    ]),
                    B[20] || (B[20] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", dr, p(((ne = a.template.documentCard) == null ? void 0 : ne.caption) || a.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : w("", !0),
              a.template.voiceNote ? (s(), n("div", ur, [
                e("div", cr, [
                  e("div", pr, [
                    B[22] || (B[22] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    B[23] || (B[23] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", mr, [
                      a.template.voiceNote.profileImage ? (s(), n("img", {
                        key: 0,
                        src: a.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, vr)) : w("", !0),
                      B[21] || (B[21] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", br, p(a.template.voiceNote.duration || "0:10"), 1),
                  e("p", gr, p(a.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : w("", !0),
              a.template.contactCard ? (s(), n("div", fr, [
                e("div", yr, [
                  e("strong", null, p(a.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, p(a.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, p(a.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, p(a.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, p(a.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : w("", !0),
              a.template.location && a.template.locationRequest ? (s(), n("div", hr, [
                e("div", kr, [
                  B[24] || (B[24] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", _r, [
                    e("strong", null, p(a.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: B[3] || (B[3] = We(() => {
                      }, ["prevent"]))
                    }, p(a.template.location.address || `${a.template.location.lat}, ${a.template.location.lng}`), 1)
                  ]),
                  e("button", wr, p(a.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : w("", !0),
              (ue = a.template.carouselCards) != null && ue.length ? (s(), n("div", $r, [
                e("div", xr, [
                  (s(!0), n(F, null, Y(a.template.carouselCards.slice(0, 4), (re, h) => (s(), n("article", {
                    key: `c-${h}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: ie(re.image ? { backgroundImage: `url(${re.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, p(re.title || `Card ${h + 1}`), 1),
                    e("p", null, p(re.description || "Card description"), 1),
                    e("button", Cr, p(re.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : w("", !0),
              e("div", Sr, [
                e("div", Ir, [
                  e("span", Br, p(v.value), 1),
                  e("p", null, p(O.value), 1),
                  B[25] || (B[25] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  a.template.reactionEmoji ? (s(), n("span", Ar, p(a.template.reactionEmoji), 1)) : w("", !0)
                ])
              ]),
              e("div", Lr, [
                e("div", Ur, [
                  e("p", null, p(ke.value), 1),
                  ($e = a.template.flow) != null && $e.id ? (s(), n("a", {
                    key: 0,
                    href: "#",
                    onClick: B[4] || (B[4] = We(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + p(a.template.flow.id), 1)) : w("", !0),
                  B[26] || (B[26] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            B[29] || (B[29] = Me('<div class="wa-inputbar" data-v-a0c1e275><span class="wa-input-icon wa-input-icon--emoji" data-v-a0c1e275></span><span class="wa-input-placeholder" data-v-a0c1e275>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-a0c1e275></span><span class="wa-input-icon wa-input-icon--camera" data-v-a0c1e275></span><button type="button" class="wa-mic" data-v-a0c1e275><span class="wa-input-icon wa-input-icon--mic" data-v-a0c1e275></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Tr = /* @__PURE__ */ xe(Rr, [["__scopeId", "data-v-a0c1e275"]]), Pr = { class: "keos-whatsapp-builder" }, Vr = { class: "kb-builder-top" }, Er = { style: { margin: 0, paddingLeft: "1.25rem" } }, Nr = { class: "kb-wa-layout" }, Or = { class: "kb-wa-sidebar" }, Mr = {
  key: 0,
  class: "kb-wa-form"
}, Dr = { class: "kb-wa-form-head" }, Wr = { class: "kb-wa-form-head-top" }, Hr = { class: "kb-wa-health-pill" }, zr = { class: "kb-wa-form-head-row" }, qr = ["value"], Fr = { class: "kb-wa-health" }, jr = { class: "kb-wa-health-row" }, Kr = { class: "kb-wa-health-value" }, Yr = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, Jr = { class: "kb-wa-canvas" }, Gr = {
  key: 0,
  class: "kb-wa-test-banner"
}, Xr = { class: "kb-wa-preview-chrome" }, Qr = { class: "kb-push-preview-controls" }, Zr = { class: "kb-push-preview-as" }, ed = ["value"], td = { class: "kb-preview-status" }, ad = { class: "kb-wa-actions" }, sd = {
  key: 0,
  class: "kb-actions-note"
}, nd = { class: "kb-wa-actions-right" }, ld = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, od = { class: "kb-confirm-dialog" }, id = { class: "kb-confirm-actions" }, bt = 60, gt = 1024, ft = 60, yt = 10, ht = 10, rd = /* @__PURE__ */ we({
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
  setup(a, { emit: i }) {
    function m(f) {
      var Se, ee, k, r, L;
      const U = [], M = f.message, me = (M.template_category ?? "").toString().trim(), ve = (M.template_type ?? "text").toString(), H = (M.header_type ?? "none").toString(), D = (M.header ?? "").toString(), ae = (M.body ?? "").toString(), _e = (M.footer ?? "").toString(), Ce = Array.isArray(M.buttons) ? M.buttons : [], Le = Array.isArray(M.cards) ? M.cards : [];
      return (Se = f.name) != null && Se.trim() || U.push("Template name is required"), (ee = M.template_name) != null && ee.trim() || U.push("WhatsApp template name is required"), me || U.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), ae.trim() || U.push("Body is required"), H === "text" && D.length > bt && U.push(`Header text cannot exceed ${bt} characters`), ae.length > gt && U.push(`Body cannot exceed ${gt} characters`), _e.length > ft && U.push(`Footer cannot exceed ${ft} characters`), Ce.length > yt && U.push(`Buttons cannot exceed ${yt}`), (ve === "image" || ve === "video" || ve === "document" || H === "image" || H === "video" || H === "document") && !M.media_url && U.push("Media URL is required for rich media templates"), me === "authentication" && ve !== "auth" && U.push("Authentication category must use Authentication format"), ve === "auth" && !((k = M.auth_label) != null && k.trim()) && !ae.includes("{{") && U.push("Authentication templates should include a code label or placeholder variable"), ve === "lto" && !M.lto_expiry && U.push("Limited-time offer requires an expiry"), (ve === "mpm" || ve === "catalog") && !((r = M.products) != null && r.length) && U.push("Catalog and multi-product templates require at least one product"), ve === "flow" && !((L = M.flow_id) != null && L.trim()) && U.push("WhatsApp Flow format requires a flow ID"), ve === "carousel" && (Le.length ? Le.length > ht && U.push(`Carousel supports up to ${ht} cards`) : U.push("Carousel format requires at least one card")), U;
    }
    const b = a, v = i, {
      campaign: d,
      dirty: C,
      customValidatorErrors: I,
      getValidationWithWarnings: y,
      update: P,
      updateMessage: V,
      undo: z,
      redo: W,
      canUndo: X,
      canRedo: q,
      resetMessage: ge,
      hooks: K
    } = je({
      initial: b.modelValue,
      hooks: {
        ...b.hooks,
        customValidators: async (f) => {
          var me;
          const U = m(f), M = (me = b.hooks) != null && me.customValidators ? await b.hooks.customValidators(f) : [];
          return [...U, ...M];
        }
      },
      onDirty: () => v("change", d.value)
    }), { lastSavedAt: J } = Ke(d, { channel: "whatsapp" });
    function N(f) {
      (f.metaKey || f.ctrlKey) && f.key === "z" && (f.preventDefault(), f.shiftKey ? W() : z());
    }
    He(() => {
      window.addEventListener("keydown", N);
    }), ze(() => {
      window.removeEventListener("keydown", N);
    }), Be(d, (f) => v("update:modelValue", f), { deep: !0 });
    const pe = le(), O = le(!0);
    async function ke() {
      if (K.estimateReach)
        try {
          pe.value = await K.estimateReach(d.value.audience);
        } catch {
          pe.value = void 0;
        }
      K.canSend && (O.value = await Promise.resolve(K.canSend()));
    }
    ke(), Be(() => d.value.audience, ke, { deep: !0 });
    const he = $(() => (I.value, y(pe.value))), x = $(() => he.value.blockingErrors), B = $(() => he.value.warnings), G = $(() => he.value.valid), ce = $(() => {
      var me, ve, H;
      const f = d.value.message, U = [
        !!((me = f.template_name) != null && me.trim()),
        !!((ve = f.template_category) != null && ve.trim()),
        !!(f.body ?? "").toString().trim(),
        !!((H = f.template_language) != null && H.trim()),
        Array.isArray(f.buttons) ? f.buttons.length > 0 : !1
      ], M = U.filter(Boolean).length;
      return Math.round(M / U.length * 100);
    }), E = $(() => ce.value >= 90 ? "Production ready" : ce.value >= 70 ? "Strong draft" : ce.value >= 40 ? "In progress" : "Needs setup"), fe = $(() => {
      const f = d.value.message;
      return !!((f.body ?? "").toString().trim() || (f.header ?? "").toString().trim() || f.media_url || f.flow_id || f.coupon_code || f.lto_expiry || f.voice_transcript || f.contact_name || f.link_title || f.order_title || Array.isArray(f.buttons) && f.buttons.length || Array.isArray(f.products) && f.products.length || Array.isArray(f.cards) && f.cards.length);
    }), oe = le(""), A = le(!1), be = le(null), R = $(() => {
      const f = oe.value;
      return f ? Oe.find((U) => U.id === f) ?? null : null;
    }), u = $(() => {
      const f = d.value.message.body ?? "";
      return R.value ? Ee(f, R.value.data) : f;
    }), ne = $(() => {
      const f = d.value.message.header ?? "";
      return R.value ? Ee(f, R.value.data) : f;
    }), ue = $(() => {
      const f = d.value.message, U = f.template_type ?? "text", M = f.header_type ?? "none";
      let me, ve, H, D, ae, _e, Ce;
      (U === "image" || M === "image") && f.media_url ? me = { type: "image", url: f.media_url } : (U === "video" || M === "video") && f.media_url ? me = { type: "video", url: f.media_url } : U === "document" || M === "document" ? me = {
        type: "document",
        filename: f.document_filename || f.media_url || "document.pdf"
      } : M === "text" && f.header ? me = { type: "text", text: ne.value } : f.header && (me = { type: "text", text: ne.value });
      const Le = u.value || "Start adding content to see a live preview here.";
      if (U === "location" && f.location) {
        const ee = f.location, k = ee.lat ?? ee.latitude, r = ee.lng ?? ee.lon ?? ee.longitude;
        k != null && r != null && (ve = {
          lat: k,
          lng: r,
          name: ee.name ?? ee.title,
          address: ee.address ?? `${k}, ${r}`
        });
      }
      (U === "catalog" || U === "mpm") && Array.isArray(f.products) && f.products.length && (H = !0, D = f.products.map((ee) => ({
        image: ee.image ?? ee.imageUrl,
        name: ee.name ?? ee.sectionTitle ?? ee.title ?? "Product",
        price: ee.price ?? ee.productId ?? ""
      }))), U === "carousel" && Array.isArray(f.cards) && f.cards.length && (H = !0, D = f.cards.map((ee) => ({
        image: ee.image ?? ee.media_url,
        name: ee.title ?? "Card",
        price: ee.button_label ?? ""
      }))), U === "coupon" && f.coupon_code && (ae = { code: f.coupon_code }), U === "lto" && f.lto_expiry && (_e = f.lto_expiry), U === "auth" && (Ce = { code: f.auth_code ?? f.otp_code ?? "123 456" });
      const Se = f.buttons ?? [];
      return U === "flow" && Se.push({
        label: f.flow_cta_label ?? "Open flow"
      }), {
        format: U,
        templateName: f.template_name || void 0,
        templateLanguage: f.template_language || void 0,
        templateCategory: f.template_category || void 0,
        header: me,
        body: Le,
        mediaCaption: f.media_caption || void 0,
        footer: f.footer || void 0,
        buttons: Se.map((ee) => ({ text: ee.label || "Button", type: ee.type, value: ee.value })),
        location: ve,
        catalog: H,
        multiProduct: D,
        coupon: ae,
        limitedOffer: _e,
        auth: Ce,
        linkPreview: f.link_title || f.link_description || f.link_url ? {
          title: f.link_title || void 0,
          description: f.link_description || void 0,
          domain: f.link_domain || void 0,
          url: f.link_url || void 0,
          thumbnail: f.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: f.voice_transcript || f.voice_duration || f.voice_profile_image ? {
          transcript: f.voice_transcript || void 0,
          duration: f.voice_duration || void 0,
          profileImage: f.voice_profile_image || void 0
        } : void 0,
        contactCard: f.contact_name || f.contact_phone || f.contact_email ? {
          name: f.contact_name || void 0,
          title: f.contact_title || void 0,
          phone: f.contact_phone || void 0,
          email: f.contact_email || void 0,
          address: f.contact_address || void 0
        } : void 0,
        documentCard: f.document_filename || U === "document" || M === "document" ? {
          filename: f.document_filename || f.media_url || "document.pdf",
          size: f.document_size || void 0,
          caption: f.media_caption || void 0
        } : void 0,
        locationRequest: f.location_request_label ? { label: f.location_request_label } : void 0,
        orderCard: f.order_title || f.order_items || f.order_image ? {
          title: f.order_title || void 0,
          items: f.order_items || void 0,
          image: f.order_image || void 0,
          buttonLabel: f.order_button_label || void 0
        } : void 0,
        carouselCards: U === "carousel" && Array.isArray(f.cards) ? f.cards.map((ee) => ({
          title: ee.title || void 0,
          description: ee.description || f.body || void 0,
          image: ee.media_url || void 0,
          button: ee.button_label || void 0
        })) : void 0,
        reactionEmoji: f.reaction_emoji || void 0,
        flow: U === "flow" ? {
          id: f.flow_id || void 0,
          ctaLabel: f.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function $e(f) {
      const U = d.value, M = f.campaign.message ? { ...U.message, ...f.campaign.message } : U.message;
      P({
        ...f.campaign,
        message: M
      }), be.value = null, A.value = !1;
    }
    function re(f) {
      const U = f.target.value;
      if (!U) return;
      const M = ct.find((me) => me.id === U);
      M && (C.value ? (be.value = M, A.value = !0) : $e(M), f.target.value = "");
    }
    function h(f) {
      P({
        name: f,
        tracking: { ...d.value.tracking ?? {}, campaign_name: f }
      });
    }
    function te(f) {
      const U = ` {{ ${f.variable} }}`, M = d.value.message.variables ?? [], me = Array.from(/* @__PURE__ */ new Set([...M, f.variable]));
      if (f.field === "title") {
        const ve = d.value.message.header ?? "";
        V({
          variables: me,
          header: ve + U
        });
      } else {
        const ve = d.value.message.body ?? "";
        V({
          variables: me,
          body: ve + U
        });
      }
    }
    function Z() {
      G.value && v("save", d.value);
    }
    return (f, U) => (s(), n("div", Pr, [
      e("div", Vr, [
        Ie(Ye, {
          "campaign-name": c(d).name,
          status: c(d).status,
          dirty: c(C),
          "last-saved-at": c(J),
          "can-undo": c(X),
          "can-redo": c(q),
          "slugify-name": b.enforceSlugName,
          "onUpdate:campaignName": h,
          onUndo: c(z),
          onRedo: c(W)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        x.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: c(de).dangerBg,
            border: `1px solid ${c(de).dangerBorder}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[12]}px ${c(Q)[16]}px`,
            marginBottom: `${c(Q)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: c(de).danger })
          }, [
            (s(!0), n(F, null, Y(x.value, (M) => (s(), n("li", {
              key: M.message
            }, p(M.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        B.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: c(de).neutral.bg,
            border: `1px solid ${c(de).neutral.border}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[12]}px ${c(Q)[16]}px`,
            marginBottom: `${c(Q)[16]}px`,
            fontSize: "0.875rem",
            color: c(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${c(Q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Er, [
            (s(!0), n(F, null, Y(B.value, (M) => (s(), n("li", {
              key: M.message
            }, p(M.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", Nr, [
        e("aside", Or, [
          a.disabledSections.includes("whatsapp") ? w("", !0) : (s(), n("div", Mr, [
            e("div", Dr, [
              e("div", Wr, [
                U[6] || (U[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                e("span", Hr, p(E.value), 1)
              ]),
              e("div", zr, [
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: re
                }, [
                  U[7] || (U[7] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(F, null, Y(c(ct), (M) => (s(), n("option", {
                    key: M.id,
                    value: M.id
                  }, p(M.label), 9, qr))), 128))
                ], 32)
              ]),
              e("div", Fr, [
                e("div", jr, [
                  U[8] || (U[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                  e("span", Kr, p(ce.value) + "%", 1)
                ]),
                e("div", Yr, [
                  e("span", {
                    class: "kb-wa-health-fill",
                    style: ie({ width: `${ce.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(mi, {
              message: c(d).message,
              "show-reset": !0,
              onUpdate: c(V),
              onReset: U[0] || (U[0] = (M) => c(ge)())
            }, null, 8, ["message", "onUpdate"]),
            Ie(At, {
              message: c(d).message,
              "variable-options": a.variableOptions,
              onUpdate: c(V),
              onInsertVariable: te
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Jr, [
          !a.designOnly && c(d).audience.test_mode ? (s(), n("div", Gr, [...U[9] || (U[9] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            j(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", Xr, [
            e("div", Qr, [
              e("label", Zr, [
                U[11] || (U[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": U[1] || (U[1] = (M) => oe.value = M),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  U[10] || (U[10] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(F, null, Y(c(Oe), (M) => (s(), n("option", {
                    key: M.id,
                    value: M.id
                  }, p(M.label), 9, ed))), 128))
                ], 512), [
                  [De, oe.value]
                ])
              ]),
              e("div", td, [
                U[12] || (U[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, p(c(d).message.template_type || "text"), 1)
              ])
            ]),
            e("div", {
              class: ye(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !fe.value }])
            }, [
              Ie(Tr, { template: ue.value }, null, 8, ["template"])
            ], 2)
          ])
        ])
      ]),
      e("footer", ad, [
        b.actionsNote ? (s(), n("div", sd, p(b.actionsNote), 1)) : w("", !0),
        e("div", nd, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: U[2] || (U[2] = (M) => v("duplicate", JSON.parse(JSON.stringify(c(d)))))
          }, " Duplicate ")) : w("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: Z
          }, " Save ")) : w("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: U[3] || (U[3] = (M) => v("edit"))
          }, " Close ")) : w("", !0)
        ])
      ]),
      A.value ? (s(), n("div", ld, [
        e("div", od, [
          U[13] || (U[13] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          U[14] || (U[14] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", id, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: U[4] || (U[4] = (M) => {
                A.value = !1, be.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: U[5] || (U[5] = (M) => be.value && $e(be.value))
            }, " Replace ")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), Rt = /* @__PURE__ */ xe(rd, [["__scopeId", "data-v-1e0caea5"]]), dd = { class: "kb-section" }, ud = { class: "kb-section__head" }, cd = { class: "kb-field" }, pd = ["value"], md = { class: "kb-field" }, vd = { class: "kb-label" }, bd = { key: 0 }, gd = { key: 1 }, fd = { key: 2 }, yd = ["value"], hd = {
  key: 0,
  class: "kb-truncation-hint"
}, kd = { class: "kb-field" }, _d = { class: "kb-insert-row" }, wd = ["value"], $d = { class: "kb-field" }, xd = { class: "kb-insert-row" }, Cd = /* @__PURE__ */ we({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: i }) {
    const m = a, b = i, v = ["first_name", "last_name", "order_id", "city"], d = le(m.variableOptions && m.variableOptions.length ? [...m.variableOptions] : v), C = le(d.value[0] ?? v[0]), I = le("");
    Be(
      () => m.variableOptions,
      (K) => {
        K && K.length && (d.value = [...K], d.value.includes(C.value) || (C.value = d.value[0]));
      }
    );
    const y = $(() => m.message.body ?? ""), P = $(() => y.value.length), V = $(() => P.value ? P.value <= 160 ? 1 : Math.ceil(P.value / 153) : 0), z = $(() => {
      const K = P.value;
      return K <= 160 ? null : K <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function W(K) {
      const J = K.target.value;
      b("update", {
        sender_id: J || void 0
      });
    }
    function X(K) {
      const J = K.target.value;
      b("update", {
        body: J
      });
    }
    function q() {
      const K = C.value;
      if (!K) return;
      const J = ` {{ ${K} }}`, N = y.value || "", pe = m.message.variables ?? [], O = Array.from(/* @__PURE__ */ new Set([...pe, K]));
      b("update", {
        body: N + J,
        variables: O
      });
    }
    function ge() {
      const K = I.value.trim();
      K && (d.value.includes(K) || (d.value = [...d.value, K]), C.value = K, I.value = "");
    }
    return (K, J) => (s(), n("section", dd, [
      e("div", ud, [
        J[3] || (J[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: J[0] || (J[0] = (N) => K.$emit("reset"))
        }, " Reset section ")) : w("", !0)
      ]),
      J[10] || (J[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", cd, [
        J[4] || (J[4] = e("label", { class: "kb-label" }, [
          j(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: m.message.sender_id ?? "",
          onInput: W
        }, null, 40, pd)
      ]),
      e("div", md, [
        e("label", vd, [
          J[5] || (J[5] = j(" Message body ", -1)),
          e("span", {
            class: ye(["kb-counter", { "kb-counter--warn": V.value > 3 }])
          }, [
            j(p(P.value) + " chars · ", 1),
            V.value === 0 ? (s(), n("span", bd, "0 segments")) : V.value === 1 ? (s(), n("span", gd, "1 segment")) : (s(), n("span", fd, p(V.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: y.value,
          onInput: X
        }, null, 40, yd),
        J[6] || (J[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        z.value ? (s(), n("p", hd, p(z.value), 1)) : w("", !0)
      ]),
      e("div", kd, [
        J[7] || (J[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", _d, [
          Pe(e("select", {
            "onUpdate:modelValue": J[1] || (J[1] = (N) => C.value = N),
            class: "kb-select"
          }, [
            (s(!0), n(F, null, Y(d.value, (N) => (s(), n("option", {
              key: N,
              value: N
            }, p(N), 9, wd))), 128))
          ], 512), [
            [De, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: q
          }, " Insert into message ")
        ]),
        J[8] || (J[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", $d, [
        J[9] || (J[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", xd, [
          Pe(e("input", {
            "onUpdate:modelValue": J[2] || (J[2] = (N) => I.value = N),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [tt, I.value]
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
}), Sd = /* @__PURE__ */ xe(Cd, [["__scopeId", "data-v-5e9aa8e6"]]), Id = { class: "keos-sms-builder" }, Bd = { class: "kb-builder-top" }, Ad = { style: { margin: 0, paddingLeft: "1.25rem" } }, Ld = { class: "kb-sms-layout" }, Ud = { class: "kb-sms-sidebar" }, Rd = {
  key: 0,
  class: "kb-sms-form"
}, Td = { class: "kb-sms-form-head" }, Pd = { class: "kb-sms-form-head-top" }, Vd = { class: "kb-sms-health-pill" }, Ed = { class: "kb-wa-form-head-row" }, Nd = ["value"], Od = { class: "kb-sms-health" }, Md = { class: "kb-sms-health-row" }, Dd = { class: "kb-sms-health-value" }, Wd = { class: "kb-sms-health-bar" }, Hd = { class: "kb-sms-canvas" }, zd = {
  key: 0,
  class: "kb-sms-test-banner"
}, qd = { class: "kb-sms-preview-chrome" }, Fd = { class: "kb-push-preview-controls" }, jd = { class: "kb-push-preview-as" }, Kd = ["value"], Yd = { class: "kb-preview-status" }, Jd = { class: "kb-preview" }, Gd = { class: "kb-sms-preview" }, Xd = { class: "kb-sms-phone" }, Qd = { class: "kb-sms-header" }, Zd = { class: "kb-sms-sender" }, eu = { class: "kb-sms-thread" }, tu = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, au = { class: "kb-sms-text" }, su = { class: "kb-sms-counter" }, nu = { key: 0 }, lu = { key: 1 }, ou = { key: 2 }, iu = {
  key: 3,
  class: "kb-sms-cost"
}, ru = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, du = { class: "kb-sms-actions" }, uu = {
  key: 0,
  class: "kb-actions-note"
}, cu = { class: "kb-sms-actions-right" }, pu = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, mu = { class: "kb-confirm-dialog" }, vu = { class: "kb-confirm-actions" }, bu = /* @__PURE__ */ we({
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
  setup(a, { emit: i }) {
    const m = a, b = i, {
      campaign: v,
      dirty: d,
      customValidatorErrors: C,
      getValidationWithWarnings: I,
      update: y,
      updateMessage: P,
      undo: V,
      redo: z,
      canUndo: W,
      canRedo: X,
      resetMessage: q,
      hooks: ge
    } = je({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (H) => {
          var _e, Ce;
          const D = [];
          (_e = H.name) != null && _e.trim() || D.push("Template name is required");
          const ae = (Ce = m.hooks) != null && Ce.customValidators ? await m.hooks.customValidators(H) : [];
          return [...D, ...ae];
        }
      },
      onDirty: () => b("change", v.value)
    }), { lastSavedAt: K } = Ke(v, { channel: "sms" });
    function J(H) {
      (H.metaKey || H.ctrlKey) && H.key === "z" && (H.preventDefault(), H.shiftKey ? z() : V());
    }
    He(() => {
      window.addEventListener("keydown", J);
    }), ze(() => {
      window.removeEventListener("keydown", J);
    }), Be(v, (H) => b("update:modelValue", H), { deep: !0 });
    const N = le(), pe = le(!0);
    async function O() {
      if (ge.estimateReach)
        try {
          N.value = await ge.estimateReach(v.value.audience);
        } catch {
          N.value = void 0;
        }
      ge.canSend && (pe.value = await Promise.resolve(ge.canSend()));
    }
    O(), Be(() => v.value.audience, O, { deep: !0 });
    const ke = $(() => (C.value, I(N.value))), he = $(() => ke.value.blockingErrors), x = $(() => ke.value.warnings), B = $(() => ke.value.valid), G = $(() => {
      var _e, Ce, Le;
      const H = v.value.message, D = [
        !!((_e = v.value.name) != null && _e.trim()),
        !!((Ce = H.body) != null && Ce.trim()),
        !!((Le = H.sender_id) != null && Le.trim()),
        !!v.value.template_type,
        (H.body ?? "").length > 20
      ], ae = D.filter(Boolean).length;
      return Math.round(ae / D.length * 100);
    }), ce = $(() => G.value >= 90 ? "Production ready" : G.value >= 70 ? "Strong draft" : G.value >= 40 ? "In progress" : "Needs setup"), E = $(() => !!h.value.trim()), fe = $(
      () => v.value.template_type ?? "transactional"
    ), oe = le(""), A = le(!1), be = le(null), R = $(() => {
      const H = oe.value;
      return H ? Oe.find((D) => D.id === H) ?? null : null;
    }), u = $(() => {
      const H = h.value;
      return R.value ? Ee(H, R.value.data) : H;
    });
    function ne(H) {
      const D = v.value, ae = H.campaign.message ? { ...D.message, ...H.campaign.message } : D.message;
      y({
        ...H.campaign,
        message: ae
      }), be.value = null, A.value = !1;
    }
    function ue(H) {
      const D = H.target.value;
      if (!D) return;
      const ae = pt.find((_e) => _e.id === D);
      ae && (d.value ? (be.value = ae, A.value = !0) : ne(ae), H.target.value = "");
    }
    function $e(H) {
      y({ template_type: H });
    }
    function re(H) {
      y({
        name: H,
        tracking: { ...v.value.tracking ?? {}, campaign_name: H }
      });
    }
    const h = $(
      () => (v.value.message.body ?? "") || ""
    ), te = $(() => h.value.length), Z = $(() => te.value ? te.value <= 160 ? 1 : Math.ceil(te.value / 153) : 0), f = $(() => {
      const H = u.value;
      return H.trim().length ? H : "Your SMS message preview will appear here.";
    }), U = $(() => {
      const H = m.costPerSegment ?? 0;
      return !H || Z.value === 0 ? null : (Z.value * H).toFixed(2);
    }), M = $(() => {
      const H = te.value;
      return H <= 160 ? null : H <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), me = $(
      () => v.value.message.sender_id ?? "YourBrand"
    );
    function ve() {
      B.value && b("save", v.value);
    }
    return (H, D) => (s(), n("div", Id, [
      e("div", Bd, [
        Ie(Ye, {
          "campaign-name": c(v).name,
          status: c(v).status,
          dirty: c(d),
          "last-saved-at": c(K),
          "can-undo": c(W),
          "can-redo": c(X),
          "slugify-name": m.enforceSlugName,
          "onUpdate:campaignName": re,
          onUndo: c(V),
          onRedo: c(z)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        he.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: c(de).dangerBg,
            border: `1px solid ${c(de).dangerBorder}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[12]}px ${c(Q)[16]}px`,
            marginBottom: `${c(Q)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: c(de).danger })
          }, [
            (s(!0), n(F, null, Y(he.value, (ae) => (s(), n("li", {
              key: ae.message
            }, p(ae.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        x.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: c(de).neutral.bg,
            border: `1px solid ${c(de).neutral.border}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[12]}px ${c(Q)[16]}px`,
            marginBottom: `${c(Q)[16]}px`,
            fontSize: "0.875rem",
            color: c(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${c(Q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Ad, [
            (s(!0), n(F, null, Y(x.value, (ae) => (s(), n("li", {
              key: ae.message
            }, p(ae.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", Ld, [
        e("aside", Ud, [
          a.disabledSections.includes("sms") ? w("", !0) : (s(), n("div", Rd, [
            e("div", Td, [
              e("div", Pd, [
                D[6] || (D[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                e("span", Vd, p(ce.value), 1)
              ]),
              e("div", Ed, [
                Ie(ot, {
                  "template-type": fe.value,
                  onUpdate: $e
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ue
                }, [
                  D[7] || (D[7] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(F, null, Y(c(pt), (ae) => (s(), n("option", {
                    key: ae.id,
                    value: ae.id
                  }, p(ae.label), 9, Nd))), 128))
                ], 32)
              ]),
              e("div", Od, [
                e("div", Md, [
                  D[8] || (D[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                  e("span", Dd, p(G.value) + "%", 1)
                ]),
                e("div", Wd, [
                  e("span", {
                    class: "kb-sms-health-fill",
                    style: ie({ width: `${G.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(Sd, {
              message: c(v).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: c(P),
              onReset: D[0] || (D[0] = (ae) => c(q)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Hd, [
          !a.designOnly && c(v).audience.test_mode ? (s(), n("div", zd, [...D[9] || (D[9] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            j(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", qd, [
            e("div", Fd, [
              e("label", jd, [
                D[11] || (D[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": D[1] || (D[1] = (ae) => oe.value = ae),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  D[10] || (D[10] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(F, null, Y(c(Oe), (ae) => (s(), n("option", {
                    key: ae.id,
                    value: ae.id
                  }, p(ae.label), 9, Kd))), 128))
                ], 512), [
                  [De, oe.value]
                ])
              ]),
              e("div", Yd, [
                D[12] || (D[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                e("strong", null, p(Z.value || 0), 1)
              ])
            ]),
            e("div", {
              class: ye(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !E.value }])
            }, [
              e("div", Jd, [
                e("div", Gd, [
                  e("div", Xd, [
                    D[15] || (D[15] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", Qd, [
                      e("div", Zd, p(me.value), 1),
                      D[13] || (D[13] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", eu, [
                      e("div", tu, [
                        e("span", au, p(f.value), 1),
                        D[14] || (D[14] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", su, [
                    j(p(te.value) + " characters · ", 1),
                    Z.value === 0 ? (s(), n("span", nu, "0 segments")) : Z.value === 1 ? (s(), n("span", lu, "1 segment")) : (s(), n("span", ou, p(Z.value) + " segments", 1)),
                    D[16] || (D[16] = j(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    U.value !== null ? (s(), n("span", iu, " · Est. " + p(U.value), 1)) : w("", !0)
                  ]),
                  M.value ? (s(), n("p", ru, p(M.value), 1)) : w("", !0)
                ])
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", du, [
        m.actionsNote ? (s(), n("div", uu, p(m.actionsNote), 1)) : w("", !0),
        e("div", cu, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: D[2] || (D[2] = (ae) => b("duplicate", JSON.parse(JSON.stringify(c(v)))))
          }, " Duplicate ")) : w("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: ve
          }, " Save ")) : w("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: D[3] || (D[3] = (ae) => b("edit"))
          }, " Close ")) : w("", !0)
        ])
      ]),
      A.value ? (s(), n("div", pu, [
        e("div", mu, [
          D[17] || (D[17] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          D[18] || (D[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", vu, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: D[4] || (D[4] = (ae) => {
                A.value = !1, be.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: D[5] || (D[5] = (ae) => be.value && ne(be.value))
            }, " Replace ")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), Tt = /* @__PURE__ */ xe(bu, [["__scopeId", "data-v-ed3c416d"]]), gu = 30, fu = 60, yu = 130;
function hu(a) {
  const i = (a ?? "").trim().length;
  return i < gu ? "too_short" : i <= fu ? "good" : "too_long";
}
function ku(a) {
  const i = (a ?? "").trim().length;
  return i === 0 ? "too_short" : i <= yu ? "good" : "too_long";
}
const _u = [
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
function kt(a) {
  if (!a || typeof a != "string") return [];
  const i = [];
  for (const m of _u) {
    const b = a.match(m);
    b && i.push(b[0]);
  }
  return i;
}
function wu(a) {
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
function $u(a) {
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
const xu = { class: "em-section" }, Cu = { class: "em-strip" }, Su = { class: "em-strip-head" }, Iu = { class: "em-field" }, Bu = ["value"], Au = { class: "em-field" }, Lu = ["value"], Uu = { class: "em-field" }, Ru = ["value"], Tu = { class: "em-field" }, Pu = { class: "em-input-group" }, Vu = ["value"], Eu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Nu = { class: "em-field" }, Ou = { class: "em-input-group" }, Mu = ["value"], Du = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Wu = { class: "em-strip em-strip--library" }, Hu = { class: "em-library-chips" }, zu = ["onClick"], qu = { class: "em-strip em-strip--blocks" }, Fu = { class: "em-block-list" }, ju = ["data-type"], Ku = { class: "em-block-bar" }, Yu = { class: "em-block-type" }, Ju = { class: "em-block-actions" }, Gu = ["disabled", "onClick"], Xu = ["disabled", "onClick"], Qu = ["onClick"], Zu = {
  key: 0,
  class: "em-block-fields"
}, ec = ["value", "onChange"], tc = ["value", "onInput"], ac = ["onClick"], sc = {
  key: 1,
  class: "em-block-fields"
}, nc = ["value", "onInput"], lc = ["onClick"], oc = {
  key: 2,
  class: "em-block-fields"
}, ic = ["value", "onInput"], rc = ["value", "onInput"], dc = ["value", "onInput"], uc = {
  key: 3,
  class: "em-block-fields"
}, cc = ["value", "onInput"], pc = ["value", "onInput"], mc = { class: "em-block-fields--row" }, vc = ["value", "onInput"], bc = { class: "em-check-row" }, gc = ["checked", "onChange"], fc = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, yc = ["value", "onInput"], hc = {
  key: 5,
  class: "em-block-fields"
}, kc = ["value", "onInput"], _c = ["value", "onInput"], wc = ["value", "onInput"], $c = ["onClick"], xc = {
  key: 6,
  class: "em-block-fields"
}, Cc = ["value", "onChange"], Sc = { class: "em-list-items" }, Ic = ["value", "onInput", "placeholder"], Bc = ["onClick"], Ac = ["onClick"], Lc = {
  key: 7,
  class: "em-block-fields"
}, Uc = ["value", "onChange"], Rc = ["value", "onInput"], Tc = ["onClick"], Pc = {
  key: 8,
  class: "em-block-fields"
}, Vc = { class: "em-social-links" }, Ec = ["value", "onChange"], Nc = ["value", "onInput"], Oc = ["onClick"], Mc = ["onClick"], Dc = {
  key: 9,
  class: "em-block-fields"
}, Wc = ["value", "onInput"], Hc = ["value", "onInput"], zc = ["value", "onInput"], qc = {
  key: 10,
  class: "em-block-fields"
}, Fc = ["value", "onInput"], jc = { class: "em-link-list-items" }, Kc = ["value", "onInput"], Yc = ["value", "onInput"], Jc = ["onClick"], Gc = ["onClick"], Xc = {
  key: 11,
  class: "em-block-fields"
}, Qc = ["value", "onInput"], Zc = ["onClick"], ep = ["value", "onInput"], tp = ["onClick"], ap = {
  key: 12,
  class: "em-block-fields"
}, sp = { class: "em-block-fields--row" }, np = ["value", "onInput"], lp = { class: "em-block-fields--row" }, op = ["value", "onInput"], ip = ["value", "onChange"], rp = {
  key: 13,
  class: "em-block-fields"
}, dp = ["value", "onChange"], up = { class: "em-inline-label" }, cp = ["value", "onInput"], pp = ["onClick"], mp = {
  key: 14,
  class: "em-block-fields"
}, vp = ["value", "onInput"], bp = { class: "em-link-list-items" }, gp = ["value", "onInput"], fp = ["value", "onInput"], yp = ["onClick"], hp = ["onClick"], kp = {
  key: 15,
  class: "em-block-fields"
}, _p = ["value", "onInput"], wp = ["value", "onInput"], $p = ["onClick"], xp = ["onClick"], Cp = {
  key: 16,
  class: "em-block-fields"
}, Sp = ["value", "onInput"], Ip = ["value", "onInput"], Bp = ["value", "onInput"], Ap = ["onClick"], Lp = ["onClick"], Up = {
  key: 17,
  class: "em-block-fields"
}, Rp = ["value", "onInput"], Tp = ["value", "onInput"], Pp = {
  key: 18,
  class: "em-block-fields"
}, Vp = ["value", "onInput"], Ep = ["value", "onInput"], Np = ["value", "onInput"], Op = ["value", "onInput"], Mp = ["value", "onInput"], Dp = {
  key: 19,
  class: "em-block-fields"
}, Wp = ["value", "onInput"], Hp = ["onClick"], zp = {
  key: 20,
  class: "em-block-fields"
}, qp = ["value", "onInput"], Fp = ["value", "onInput"], jp = ["onClick"], Kp = {
  key: 21,
  class: "em-block-fields"
}, Yp = ["value", "onInput"], Jp = { class: "em-block-fields--row" }, Gp = ["value", "onInput"], Xp = {
  key: 22,
  class: "em-block-fields"
}, Qp = ["value", "onInput"], Zp = ["value", "onInput"], em = ["value", "onInput"], tm = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, am = ["value", "onChange"], sm = { class: "em-check-row" }, nm = ["checked", "onChange"], lm = { class: "em-add-bar" }, om = { class: "em-add-bar-btns" }, im = { class: "em-strip em-strip--personalize" }, rm = { class: "em-field" }, dm = { class: "em-input-group" }, um = ["value"], cm = { class: "em-field" }, pm = { class: "em-input-group" }, Te = "{{ var }}", mm = /* @__PURE__ */ we({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: i }) {
    var L;
    function m() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const b = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], v = [
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
    function d(g) {
      switch (g) {
        case "heading":
          return { id: m(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: m(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization.", alignment: "left", fullWidth: !1 };
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
          return { id: m(), type: "social", links: b.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
            leftContent: "Left column text or {{ variable }}.",
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
const example = {{ order_id }};`,
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
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: m(), type: "paragraph", content: "" };
      }
    }
    const C = a, I = i, y = ["first_name", "last_name", "order_id", "city", "email"], P = le(
      (L = C.variableOptions) != null && L.length ? [...C.variableOptions] : y
    ), V = le(P.value[0] ?? "first_name"), z = le("");
    Be(
      () => C.variableOptions,
      (g) => {
        g != null && g.length && (P.value = [...g], P.value.includes(V.value) || (V.value = P.value[0]));
      }
    );
    const W = $(() => C.message.subject ?? ""), X = $(() => C.message.preview_text ?? ""), q = $(() => hu(W.value)), ge = $(() => ku(X.value)), K = $(() => kt(W.value)), J = $(() => kt(X.value)), N = $(() => {
      const g = C.message.blocks;
      return Array.isArray(g) && g.length > 0 ? g : [d("paragraph")];
    });
    Be(
      () => C.message.blocks,
      (g) => {
        (!Array.isArray(g) || g.length === 0) && I("update", { blocks: [d("paragraph")] });
      },
      { immediate: !0 }
    );
    function pe(g) {
      I("update", { blocks: g });
    }
    function O(g) {
      I("update", { subject: g.target.value });
    }
    function ke(g) {
      const l = g.target.value;
      I("update", { preview_text: l || void 0 });
    }
    function he(g) {
      I("update", { from_name: g.target.value || void 0 });
    }
    function x(g) {
      I("update", { from_address: g.target.value || void 0 });
    }
    function B(g) {
      I("update", { reply_to: g.target.value || void 0 });
    }
    const G = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [d("heading"), d("paragraph"), d("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [d("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [d("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [d("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [d("social"), d("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [d("footer"), d("link_list")]
      }
    ];
    function ce(g) {
      const l = g.blocks();
      pe([...N.value, ...l]);
    }
    function E(g) {
      const l = [...N.value, d(g)];
      pe(l);
    }
    function fe(g) {
      pe(N.value.filter((l) => l.id !== g));
    }
    function oe(g, l) {
      const t = N.value.findIndex((S) => S.id === g);
      if (t < 0) return;
      const _ = l === "up" ? t - 1 : t + 1;
      if (_ < 0 || _ >= N.value.length) return;
      const o = [...N.value];
      [o[t], o[_]] = [o[_], o[t]], pe(o);
    }
    function A(g, l) {
      const t = N.value.map((_) => _.id === g ? { ..._, ...l } : _);
      pe(t);
    }
    function be(g, l, t) {
      const _ = N.value.find((S) => S.id === g);
      if (!_ || _.type !== "list") return;
      const o = [..._.items || []];
      o[l] = t, A(g, { items: o });
    }
    function R(g) {
      const l = N.value.find((t) => t.id === g);
      !l || l.type !== "list" || A(g, { items: [...l.items || [], "New item"] });
    }
    function u(g, l) {
      const t = N.value.find((o) => o.id === g);
      if (!t || t.type !== "list") return;
      const _ = (t.items || []).filter((o, S) => S !== l);
      A(g, { items: _ });
    }
    function ne(g, l, t, _) {
      const o = N.value.find((T) => T.id === g);
      if (!o || o.type !== "social") return;
      const S = (o.links || []).map((T, se) => se === l ? { ...T, [t]: _ } : T);
      A(g, { links: S });
    }
    function ue(g) {
      const l = N.value.find((t) => t.id === g);
      !l || l.type !== "social" || A(g, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function $e(g, l) {
      const t = N.value.find((o) => o.id === g);
      if (!t || t.type !== "social") return;
      const _ = (t.links || []).filter((o, S) => S !== l);
      A(g, { links: _ });
    }
    function re(g, l, t, _) {
      const o = N.value.find((T) => T.id === g);
      if (!o || o.type !== "link_list") return;
      const S = (o.links || []).map((T, se) => se === l ? { ...T, [t]: _ } : T);
      A(g, { links: S });
    }
    function h(g) {
      const l = N.value.find((t) => t.id === g);
      !l || l.type !== "link_list" || A(g, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function te(g, l) {
      const t = N.value.find((o) => o.id === g);
      if (!t || t.type !== "link_list") return;
      const _ = (t.links || []).filter((o, S) => S !== l);
      A(g, { links: _ });
    }
    function Z(g, l) {
      const t = N.value.find((Re) => Re.id === g);
      if (!t || t.type !== "columns") return;
      const _ = ` {{ ${V.value} }}`, o = C.message.variables ?? [], S = Array.from(/* @__PURE__ */ new Set([...o, V.value])), T = l === "left" ? "leftContent" : "rightContent", Ae = (t[T] ?? "") + _;
      A(g, { [T]: Ae }), I("update", { variables: S });
    }
    function f(g, l) {
      const t = N.value.find((_) => _.id === g);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const _ = [...t.cells || []];
          for (; _.length < l.columnCount; ) _.push("Cell content");
          l.cells = _.slice(0, l.columnCount);
        }
        A(g, l);
      }
    }
    function U(g, l, t) {
      const _ = N.value.find((S) => S.id === g);
      if (!_ || _.type !== "row") return;
      const o = [..._.cells || []];
      o[l] = t, A(g, { cells: o });
    }
    function M(g, l, t, _) {
      const o = N.value.find((T) => T.id === g);
      if (!o || o.type !== "navbar") return;
      const S = (o.links || []).map((T, se) => se === l ? { ...T, [t]: _ } : T);
      A(g, { links: S });
    }
    function me(g) {
      const l = N.value.find((t) => t.id === g);
      !l || l.type !== "navbar" || A(g, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function ve(g, l) {
      const t = N.value.find((_) => _.id === g);
      !t || t.type !== "navbar" || A(g, { links: (t.links || []).filter((_, o) => o !== l) });
    }
    function H(g, l, t, _) {
      const o = N.value.find((T) => T.id === g);
      if (!o || o.type !== "accordion") return;
      const S = (o.items || []).map((T, se) => se === l ? { ...T, [t]: _ } : T);
      A(g, { items: S });
    }
    function D(g) {
      const l = N.value.find((t) => t.id === g);
      !l || l.type !== "accordion" || A(g, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function ae(g, l) {
      const t = N.value.find((_) => _.id === g);
      !t || t.type !== "accordion" || A(g, { items: (t.items || []).filter((_, o) => o !== l) });
    }
    function _e(g, l, t, _) {
      const o = N.value.find((T) => T.id === g);
      if (!o || o.type !== "carousel") return;
      const S = (o.slides || []).map((T, se) => se === l ? { ...T, [t]: _ } : T);
      A(g, { slides: S });
    }
    function Ce(g) {
      const l = N.value.find((t) => t.id === g);
      !l || l.type !== "carousel" || A(g, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Le(g, l) {
      const t = N.value.find((_) => _.id === g);
      !t || t.type !== "carousel" || A(g, { slides: (t.slides || []).filter((_, o) => o !== l) });
    }
    function Se(g) {
      const l = ` {{ ${V.value} }}`, t = C.message.variables ?? [], _ = Array.from(/* @__PURE__ */ new Set([...t, V.value]));
      g === "subject" ? I("update", {
        subject: (W.value || "") + l,
        variables: _
      }) : I("update", {
        preview_text: (X.value || "") + l,
        variables: _
      });
    }
    function ee(g) {
      const l = N.value.find((Re) => Re.id === g);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const t = ` {{ ${V.value} }}`, _ = C.message.variables ?? [], o = Array.from(/* @__PURE__ */ new Set([..._, V.value])), S = (l.type === "footer", "content"), se = (l[S] ?? "") + t, Ae = N.value.map(
        (Re) => Re.id === g ? { ...Re, [S]: se } : Re
      );
      I("update", { blocks: Ae, variables: o });
    }
    function k(g, l) {
      const t = N.value.find((se) => se.id === g);
      if (!t || t.type !== "row") return;
      const _ = ` {{ ${V.value} }}`, o = C.message.variables ?? [], S = Array.from(/* @__PURE__ */ new Set([...o, V.value])), T = [...t.cells || []];
      T[l] = (T[l] || "") + _, A(g, { cells: T }), I("update", { variables: S });
    }
    function r() {
      const g = z.value.trim();
      !g || P.value.includes(g) || (P.value = [...P.value, g], V.value = g, z.value = "");
    }
    return (g, l) => (s(), n("section", xu, [
      e("div", Cu, [
        e("div", Su, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => g.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Iu, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: a.message.from_name ?? "",
            onInput: he
          }, null, 40, Bu)
        ]),
        e("div", Au, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: a.message.from_address ?? "",
            onInput: x
          }, null, 40, Lu)
        ]),
        e("div", Uu, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            j("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: a.message.reply_to ?? "",
            onInput: B
          }, null, 40, Ru)
        ]),
        e("div", Tu, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Pu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: W.value,
              onInput: O
            }, null, 40, Vu),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (t) => Se("subject")),
              title: "Insert variable"
            }, p(Te))
          ]),
          e("span", {
            class: ye(["em-analyzer", `em-analyzer--${q.value}`])
          }, p(c(wu)(q.value)), 3),
          K.value.length ? (s(), n("span", Eu, "Spammy: " + p(K.value.join(", ")), 1)) : w("", !0)
        ]),
        e("div", Nu, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            j("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Ou, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: X.value,
              onInput: ke
            }, null, 40, Mu),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (t) => Se("preview")),
              title: "Insert variable"
            }, p(Te))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ye(["em-analyzer", `em-analyzer--${ge.value}`])
          }, p(c($u)(ge.value)), 3),
          J.value.length ? (s(), n("span", Du, "Spammy: " + p(J.value.join(", ")), 1)) : w("", !0)
        ])
      ]),
      e("div", Wu, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Hu, [
          (s(), n(F, null, Y(G, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (_) => ce(t)
          }, p(t.label), 9, zu)), 64))
        ])
      ]),
      e("div", qu, [
        l[63] || (l[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[64] || (l[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Fu, [
          (s(!0), n(F, null, Y(N.value, (t, _) => (s(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Ku, [
              e("span", Yu, p(t.type), 1),
              e("div", Ju, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: _ === 0,
                  onClick: (o) => oe(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Gu),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: _ === N.value.length - 1,
                  onClick: (o) => oe(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Xu),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (o) => fe(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Qu)
              ])
            ]),
            t.type === "heading" ? (s(), n("div", Zu, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { level: Number(o.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, ec),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Heading text"
              }, null, 40, tc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ee(t.id)
              }, p(Te), 8, ac)
            ])) : t.type === "paragraph" ? (s(), n("div", sc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, nc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ee(t.id)
              }, p(Te), 8, lc)
            ])) : t.type === "image" ? (s(), n("div", oc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (o) => A(t.id, { src: o.target.value }),
                placeholder: "Image URL"
              }, null, 40, ic),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => A(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, rc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (o) => A(t.id, { linkUrl: o.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, dc)
            ])) : t.type === "button" ? (s(), n("div", uc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (o) => A(t.id, { text: o.target.value }),
                placeholder: "Button text"
              }, null, 40, cc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (o) => A(t.id, { url: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, pc),
              e("div", mc, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (o) => A(t.id, { borderRadius: Number(o.target.value) || 0 })
                }, null, 40, vc)
              ]),
              e("label", bc, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (o) => A(t.id, { ghost: o.target.checked })
                }, null, 40, gc),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (s(), n("div", fc, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (o) => A(t.id, { height: Number(o.target.value) || 24 })
              }, null, 40, yc),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (s(), n("div", hc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, kc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (o) => A(t.id, { unsubscribeUrl: o.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, _c),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (o) => A(t.id, { companyAddress: o.target.value }),
                placeholder: "Company address"
              }, null, 40, wc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ee(t.id)
              }, p(Te), 8, $c)
            ])) : t.type === "list" ? (s(), n("div", xc, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { style: o.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Cc),
              e("div", Sc, [
                (s(!0), n(F, null, Y(t.items || [], (o, S) => (s(), n("div", {
                  key: S,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o,
                    onInput: (T) => be(t.id, S, T.target.value),
                    placeholder: `Item ${S + 1}`
                  }, null, 40, Ic),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (T) => u(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Bc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => R(t.id)
              }, "+ Add item", 8, Ac)
            ])) : t.type === "quote" ? (s(), n("div", Lc, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { style: o.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Uc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Rc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ee(t.id)
              }, p(Te), 8, Tc)
            ])) : t.type === "social" ? (s(), n("div", Pc, [
              e("div", Vc, [
                (s(!0), n(F, null, Y(t.links || [], (o, S) => (s(), n("div", {
                  key: S,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: o.platform,
                    class: "em-select em-select--sm",
                    onChange: (T) => ne(t.id, S, "platform", T.target.value)
                  }, [...l[45] || (l[45] = [
                    Me('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, Ec),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (T) => ne(t.id, S, "url", T.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Nc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (T) => $e(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Oc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => ue(t.id)
              }, "+ Add link", 8, Mc)
            ])) : t.type === "video" ? (s(), n("div", Dc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (o) => A(t.id, { thumbnailUrl: o.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Wc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (o) => A(t.id, { videoUrl: o.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Hc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => A(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, zc)
            ])) : t.type === "link_list" ? (s(), n("div", qc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => A(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Fc),
              e("div", jc, [
                (s(!0), n(F, null, Y(t.links || [], (o, S) => (s(), n("div", {
                  key: S,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (T) => re(t.id, S, "text", T.target.value),
                    placeholder: "Label"
                  }, null, 40, Kc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (T) => re(t.id, S, "url", T.target.value),
                    placeholder: "URL"
                  }, null, 40, Yc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (T) => te(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Jc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => h(t.id)
              }, "+ Add link", 8, Gc)
            ])) : t.type === "columns" ? (s(), n("div", Xc, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (o) => A(t.id, { leftContent: o.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Qc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => Z(t.id, "left")
              }, p(Te), 8, Zc),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (o) => A(t.id, { rightContent: o.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, ep),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => Z(t.id, "right")
              }, p(Te), 8, tp)
            ])) : t.type === "divider" ? (s(), n("div", ap, [
              e("div", sp, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (o) => A(t.id, { thickness: Number(o.target.value) || 1 })
                }, null, 40, np),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", lp, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (o) => A(t.id, { color: o.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, op)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { lineStyle: o.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, ip)
            ])) : t.type === "row" ? (s(), n("div", rp, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (o) => f(t.id, { columnCount: Number(o.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, dp),
              (s(!0), n(F, null, Y(t.cells || [], (o, S) => (s(), n("div", {
                key: S,
                class: "em-row-cell"
              }, [
                e("label", up, "Column " + p(S + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o,
                  onInput: (T) => U(t.id, S, T.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, cp),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (T) => k(t.id, S)
                }, p(Te), 8, pp)
              ]))), 128))
            ])) : t.type === "navbar" ? (s(), n("div", mp, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => A(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, vp),
              e("div", bp, [
                (s(!0), n(F, null, Y(t.links || [], (o, S) => (s(), n("div", {
                  key: S,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (T) => M(t.id, S, "text", T.target.value),
                    placeholder: "Label"
                  }, null, 40, gp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (T) => M(t.id, S, "url", T.target.value),
                    placeholder: "URL"
                  }, null, 40, fp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (T) => ve(t.id, S),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, yp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => me(t.id)
              }, "+ Add link", 8, hp)
            ])) : t.type === "accordion" ? (s(), n("div", kp, [
              (s(!0), n(F, null, Y(t.items || [], (o, S) => (s(), n("div", {
                key: S,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.title,
                  onInput: (T) => H(t.id, S, "title", T.target.value),
                  placeholder: "Section title"
                }, null, 40, _p),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o.content,
                  onInput: (T) => H(t.id, S, "content", T.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, wp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (T) => ae(t.id, S),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, $p)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => D(t.id)
              }, "+ Add section", 8, xp)
            ])) : t.type === "carousel" ? (s(), n("div", Cp, [
              (s(!0), n(F, null, Y(t.slides || [], (o, S) => (s(), n("div", {
                key: S,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.imageUrl,
                  onInput: (T) => _e(t.id, S, "imageUrl", T.target.value),
                  placeholder: "Image URL"
                }, null, 40, Sp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.alt,
                  onInput: (T) => _e(t.id, S, "alt", T.target.value),
                  placeholder: "Alt text"
                }, null, 40, Ip),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.linkUrl,
                  onInput: (T) => _e(t.id, S, "linkUrl", T.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Bp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (T) => Le(t.id, S),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ap)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Ce(t.id)
              }, "+ Add slide", 8, Lp)
            ])) : t.type === "countdown" ? (s(), n("div", Up, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (o) => A(t.id, { label: o.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Rp),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (o) => A(t.id, { endDateTime: o.target.value ? new Date(o.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Tp),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (s(), n("div", Pp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => A(t.id, { imageUrl: o.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Vp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (o) => A(t.id, { title: o.target.value }),
                placeholder: "Product title"
              }, null, 40, Ep),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (o) => A(t.id, { price: o.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Np),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (o) => A(t.id, { buttonText: o.target.value }),
                placeholder: "Button text"
              }, null, 40, Op),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (o) => A(t.id, { buttonUrl: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, Mp)
            ])) : t.type === "liquid" ? (s(), n("div", Dp, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Wp),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ee(t.id)
              }, p(Te), 8, Hp),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (s(), n("div", zp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => A(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, qp),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Fp),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ee(t.id)
              }, p(Te), 8, jp),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (s(), n("div", Kp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (o) => A(t.id, { feedUrl: o.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Yp),
              e("div", Jp, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (o) => A(t.id, { maxItems: Number(o.target.value) || 5 })
                }, null, 40, Gp)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (s(), n("div", Xp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => A(t.id, { imageUrl: o.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, Qp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => A(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, Zp),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (o) => A(t.id, { fallbackUrl: o.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, em)
            ])) : w("", !0),
            v.includes(t.type) ? (s(), n("div", tm, [
              l[61] || (l[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: t.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { alignment: o.target.value })
              }, [...l[59] || (l[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, am),
              e("label", sm, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (o) => A(t.id, { fullWidth: o.target.checked })
                }, null, 40, nm),
                l[60] || (l[60] = e("span", null, "Full width", -1))
              ])
            ])) : w("", !0)
          ], 8, ju))), 128))
        ]),
        e("div", lm, [
          l[62] || (l[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", om, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (t) => E("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (t) => E("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (t) => E("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => E("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => E("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => E("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => E("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => E("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => E("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => E("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => E("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => E("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => E("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => E("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => E("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => E("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => E("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => E("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => E("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => E("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => E("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => E("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => E("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", im, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", rm, [
          l[65] || (l[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", dm, [
            Pe(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => V.value = t),
              class: "em-select em-select--flex"
            }, [
              (s(!0), n(F, null, Y(P.value, (t) => (s(), n("option", {
                key: t,
                value: t
              }, p(t), 9, um))), 128))
            ], 512), [
              [De, V.value]
            ])
          ])
        ]),
        e("div", cm, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", pm, [
            Pe(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => z.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [tt, z.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: r
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), vm = /* @__PURE__ */ xe(mm, [["__scopeId", "data-v-c4398c5d"]]), bm = { class: "keos-email-builder" }, gm = { class: "kb-builder-top" }, fm = { style: { margin: 0, paddingLeft: "1.25rem" } }, ym = { class: "kb-email-layout" }, hm = { class: "kb-email-sidebar" }, km = {
  key: 0,
  class: "kb-email-form"
}, _m = { class: "kb-email-form-head" }, wm = { class: "kb-email-form-head-top" }, $m = { class: "kb-email-health-pill" }, xm = { class: "kb-wa-form-head-row" }, Cm = ["value"], Sm = { class: "kb-email-health" }, Im = { class: "kb-email-health-row" }, Bm = { class: "kb-email-health-value" }, Am = { class: "kb-email-health-bar" }, Lm = { class: "kb-email-canvas" }, Um = {
  key: 0,
  class: "kb-email-test-banner"
}, Rm = { class: "kb-email-preview-chrome" }, Tm = { class: "kb-push-preview-controls" }, Pm = { class: "kb-push-preview-as" }, Vm = ["value"], Em = { class: "kb-preview-status" }, Nm = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Om = { class: "kb-email-inbox-strip" }, Mm = { class: "kb-email-inbox-from" }, Dm = { class: "kb-email-inbox-from-name" }, Wm = { class: "kb-email-inbox-from-addr" }, Hm = { class: "kb-email-inbox-subject" }, zm = ["title"], qm = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Fm = { class: "kb-email-body-canvas" }, jm = ["innerHTML"], Km = { class: "kb-email-actions" }, Ym = {
  key: 0,
  class: "kb-actions-note"
}, Jm = { class: "kb-email-actions-right" }, Gm = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Xm = { class: "kb-confirm-dialog" }, Qm = { class: "kb-confirm-actions" }, Zm = /* @__PURE__ */ we({
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
  setup(a, { emit: i }) {
    function m(k) {
      if (!Array.isArray(k) || k.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const r = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), L = [
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
      ], g = (t, _) => {
        if (!L.includes(_.type)) return t;
        const o = _.alignment || "left", S = !!_.fullWidth;
        return `<div style="text-align:${o};${S ? "width:100%;" : ""}">${t}</div>`;
      }, l = [];
      for (const t of k)
        switch (t.type) {
          case "heading": {
            const _ = Math.min(3, Math.max(1, Number(t.level) || 1)), o = r(t.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            l.push(
              g(
                `<h${_} style="margin:0 0 12px;font-size:${_ === 1 ? "22" : _ === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${o || "Heading"}</h${_}>`,
                t
              )
            );
            break;
          }
          case "paragraph": {
            const _ = r(t.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            l.push(
              g(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${_ || "Paragraph"}</p>`,
                t
              )
            );
            break;
          }
          case "image": {
            const _ = (t.src || "").trim(), o = r(t.alt || ""), S = (t.linkUrl || "").trim(), se = !!t.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", Ae = _ ? `<img src="${r(_)}" alt="${o}" style="${se}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            l.push(
              g(
                `<div style="margin:0 0 12px;">${S ? `<a href="${r(S)}" style="color:#2563eb;">${Ae}</a>` : Ae}</div>`,
                t
              )
            );
            break;
          }
          case "button": {
            const _ = r(t.text || "Button"), o = (t.url || "#").trim(), S = Math.min(24, Math.max(0, Number(t.borderRadius) ?? 8)), T = !!t.fullWidth, se = !!t.ghost, Ae = se ? "transparent" : "#0f172a", Re = se ? "#0f172a" : "#fff", Je = se ? "2px solid #0f172a" : "none", Vt = T ? "block" : "inline-block", Et = T ? "100%" : "auto";
            l.push(
              g(
                `<p style="margin:0 0 12px;"><a href="${r(o)}" style="display:${Vt};width:${Et};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${Ae};color:${Re};border:${Je};text-decoration:none;font-size:14px;font-weight:600;border-radius:${S}px;overflow-wrap:anywhere;">${_}</a></p>`,
                t
              )
            );
            break;
          }
          case "divider": {
            const _ = Math.min(8, Math.max(1, Number(t.thickness) || 1)), o = (t.color || "#e2e8f0").trim() || "#e2e8f0", S = t.lineStyle || "solid";
            l.push(
              g(
                `<hr style="margin:16px 0;border:0;border-top:${_}px ${S} ${o};" />`,
                t
              )
            );
            break;
          }
          case "spacer": {
            const _ = Math.min(120, Math.max(8, Number(t.height) || 24));
            l.push(g(`<div style="height:${_}px;"></div>`, t));
            break;
          }
          case "footer": {
            const _ = r(t.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = (t.unsubscribeUrl || "").trim(), S = r(t.companyAddress || "");
            l.push(
              g(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${_ || "Footer"}` + (o ? `<p style="margin:8px 0 0;"><a href="${r(o)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (S ? `<p style="margin:4px 0 0;">${S}</p>` : "") + "</div>",
                t
              )
            );
            break;
          }
          case "list": {
            const _ = t.style === "numbered" ? "ol" : "ul", S = (Array.isArray(t.items) ? t.items : []).map(
              (T) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${r(String(T)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            l.push(
              g(
                `<${_} style="margin:0 0 12px;padding-left:24px;">${S || "<li>Item</li>"}</${_}>`,
                t
              )
            );
            break;
          }
          case "quote": {
            const _ = r(t.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, S = o[t.style || "default"] || o.default;
            l.push(
              g(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${S}font-size:14px;line-height:1.6;">${_ || "Quote"}</div>`,
                t
              )
            );
            break;
          }
          case "social": {
            const o = (Array.isArray(t.links) ? t.links : []).filter((S) => (S.url || "").trim());
            if (o.length === 0)
              l.push(
                g(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  t
                )
              );
            else {
              const S = (T) => `<a href="${r((T.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${r(T.platform || "Link")}</a>`;
              l.push(
                g(
                  `<div style="margin:0 0 12px;">${o.map(S).join("")}</div>`,
                  t
                )
              );
            }
            break;
          }
          case "video": {
            const _ = (t.thumbnailUrl || "").trim(), o = (t.videoUrl || "#").trim(), S = r(t.caption || ""), se = !!t.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", Ae = _ ? `<img src="${r(_)}" alt="Video" style="${se}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            l.push(
              g(
                `<div style="margin:0 0 12px;"><a href="${r(o)}" style="display:block;color:inherit;">${Ae}</a>` + (S ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${S}</p>` : "") + "</div>",
                t
              )
            );
            break;
          }
          case "link_list": {
            const _ = Array.isArray(t.links) ? t.links : [], o = r(t.separator || " | "), T = _.filter(
              (se) => (se.text || se.url) && (se.url || "").trim()
            ).map(
              (se) => `<a href="${r((se.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${r(se.text || "Link")}</a>`
            );
            l.push(
              g(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${T.join(o)}</p>`,
                t
              )
            );
            break;
          }
          case "columns": {
            const _ = r(t.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = r(t.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            l.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${_ || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${o || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const _ = Math.min(4, Math.max(1, Number(t.columnCount) || 2)), o = Array.isArray(t.cells) ? t.cells.slice(0, _) : [], S = 100 / _, T = Array.from({ length: _ }, (se, Ae) => {
              const Re = o[Ae] ?? "", Je = r(Re).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${S}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${Je || "—"}</td>`;
            }).join("");
            l.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${T}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const _ = Array.isArray(t.links) ? t.links : [], o = r(t.separator || " | "), T = _.filter(
              (se) => (se.text || se.url) && (se.url || "").trim()
            ).map(
              (se) => `<a href="${r((se.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${r(se.text || "Link")}</a>`
            );
            l.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${T.length ? T.join(o) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const o = (Array.isArray(t.items) ? t.items : []).map((S) => {
              const T = r(S.title || "Section"), se = r(S.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${T}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${se}</div></details>`;
            }).join("");
            l.push(
              o ? `<div style="margin:0 0 12px;">${o}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const o = (Array.isArray(t.slides) ? t.slides : []).filter(
              (S) => (S.imageUrl || "").trim()
            );
            if (o.length === 0)
              l.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const S = o[0], T = `<img src="${r(S.imageUrl)}" alt="${r(S.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, se = (S.linkUrl || "").trim();
              l.push(
                `<div style="margin:0 0 12px;">${se ? `<a href="${r(se)}">${T}</a>` : T}` + (o.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${o.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const _ = r(t.label || "Offer ends in"), o = t.endDateTime ? new Date(t.endDateTime).toLocaleString() : "—";
            l.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${_}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${o}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const _ = (t.imageUrl || "").trim(), o = r(t.title || "Product"), S = r(t.price || ""), T = r(t.buttonText || "Buy now"), se = (t.buttonUrl || "#").trim(), Ae = _ ? `<img src="${r(_)}" alt="${r(t.alt || o)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            l.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Ae}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${o}</p>` + (S ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${S}</p>` : "") + `<a href="${r(se)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${T}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const _ = r((t.content || "").trim());
            l.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${_ || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const _ = (t.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = r((t.caption || "").trim());
            l.push(
              '<div style="margin:0 0 12px;">' + (o ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${o}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${_ || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const _ = (t.feedUrl || "").trim(), o = Math.min(20, Math.max(1, Number(t.maxItems) ?? 5));
            l.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (_ ? `<p style="margin:0;font-size:12px;color:#64748b;">${r(_)} · max ${o} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const _ = (t.imageUrl || "").trim(), o = (t.fallbackUrl || "").trim(), S = r(t.alt || "Dynamic image");
            _ ? l.push(
              `<div style="margin:0 0 12px;"><img src="${r(_)}" alt="${S}" style="max-width:100%;height:auto;display:block;border:0;" />` + (o ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${r(o)}</p>` : "") + "</div>"
            ) : l.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return l.join("");
    }
    function b(k) {
      return /<\s*html[\s>]/i.test(k) || /<!doctype\s+html/i.test(k);
    }
    function v(k) {
      const r = k.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return r ? r[1] : k;
    }
    function d(k, r, L) {
      const g = (r || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), l = (L || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${g}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        l ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${l}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${k}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const C = a, I = i, {
      campaign: y,
      dirty: P,
      customValidatorErrors: V,
      getValidationWithWarnings: z,
      update: W,
      updateMessage: X,
      undo: q,
      redo: ge,
      canUndo: K,
      canRedo: J,
      resetMessage: N,
      hooks: pe
    } = je({
      initial: C.modelValue,
      hooks: {
        ...C.hooks,
        customValidators: async (k) => {
          var l, t, _;
          const r = [];
          (l = k.name) != null && l.trim() || r.push("Template name is required");
          const L = k.message;
          (t = L == null ? void 0 : L.subject) != null && t.trim() || r.push("Subject is required");
          const g = (_ = C.hooks) != null && _.customValidators ? await C.hooks.customValidators(k) : [];
          return [...r, ...g];
        }
      },
      onDirty: () => I("change", y.value)
    }), { lastSavedAt: O } = Ke(y, { channel: "email" });
    function ke(k) {
      (k.metaKey || k.ctrlKey) && k.key === "z" && (k.preventDefault(), k.shiftKey ? ge() : q());
    }
    He(() => {
      window.addEventListener("keydown", ke);
    }), ze(() => {
      window.removeEventListener("keydown", ke);
    }), Be(
      y,
      (k) => I("update:modelValue", {
        ...k,
        message: {
          ...k.message,
          html: ae.value
        }
      }),
      { deep: !0 }
    );
    const he = le(), x = le(!0);
    async function B() {
      if (pe.estimateReach)
        try {
          he.value = await pe.estimateReach(y.value.audience);
        } catch {
          he.value = void 0;
        }
      pe.canSend && (x.value = await Promise.resolve(pe.canSend()));
    }
    B(), Be(() => y.value.audience, B, { deep: !0 });
    const G = $(() => (V.value, z(he.value))), ce = $(() => G.value.blockingErrors), E = $(() => G.value.warnings), fe = $(() => G.value.valid), oe = $(() => {
      var g, l, t;
      const k = y.value.message, r = [
        !!((g = y.value.name) != null && g.trim()),
        !!((l = k.subject) != null && l.trim()),
        !!((t = k.from_address) != null && t.trim()),
        !!(Array.isArray(k.blocks) ? k.blocks.length : (k.html ?? "").trim().length),
        !!y.value.template_type
      ], L = r.filter(Boolean).length;
      return Math.round(L / r.length * 100);
    }), A = $(() => oe.value >= 90 ? "Production ready" : oe.value >= 70 ? "Strong draft" : oe.value >= 40 ? "In progress" : "Needs setup"), be = $(
      () => y.value.template_type ?? "transactional"
    ), R = le(""), u = le(!1), ne = le(null), ue = $(() => {
      const k = R.value;
      return k ? Oe.find((r) => r.id === k) ?? null : null;
    });
    function $e(k) {
      const r = y.value, L = k.campaign.message ? { ...r.message, ...k.campaign.message } : r.message;
      W({
        ...k.campaign,
        message: L
      }), ne.value = null, u.value = !1;
    }
    function re(k) {
      const r = k.target.value;
      if (!r) return;
      const L = mt.find((g) => g.id === r);
      L && (P.value ? (ne.value = L, u.value = !0) : $e(L), k.target.value = "");
    }
    function h(k) {
      W({ template_type: k });
    }
    function te(k) {
      W({
        name: k,
        tracking: { ...y.value.tracking ?? {}, campaign_name: k }
      });
    }
    const Z = $(
      () => y.value.message.subject ?? ""
    ), f = $(
      () => y.value.message.preview_text ?? ""
    ), U = $(
      () => y.value.message.html ?? ""
    ), M = $(
      () => y.value.message.from_name ?? "Your App"
    ), me = $(
      () => y.value.message.from_address ?? "notifications@example.com"
    ), ve = $(
      () => y.value.message.blocks ?? []
    ), H = $(() => {
      const k = y.value.message, r = (k.html ?? "").trim(), g = (Array.isArray(k.blocks) ? k.blocks : []).some((l) => {
        if (!l || typeof l != "object") return !1;
        const t = (l.type ?? "").toString();
        if (t === "paragraph" || t === "heading" || t === "quote" || t === "footer") {
          const _ = (l.content ?? "").toString().trim();
          return !(!_ || _ === "Heading" || _.startsWith("Your text here."));
        }
        return t === "image" || t === "video" || t === "dynamic_image" ? !!(l.src ?? l.imageUrl ?? l.thumbnailUrl ?? "").toString().trim() : t === "button" ? !!(l.text ?? "").toString().trim() : !0;
      });
      return !!((k.subject ?? "").toString().trim() || (k.preview_text ?? "").toString().trim() || r || g);
    }), D = $(() => {
      const k = ve.value;
      if (Array.isArray(k) && k.length > 0)
        return m(k);
      const r = U.value;
      return r && r.trim() ? b(r) ? v(r) : r : m([]);
    }), ae = $(() => {
      const k = ve.value;
      if (Array.isArray(k) && k.length > 0)
        return d(
          m(k),
          Z.value,
          f.value
        );
      const r = U.value;
      return r && r.trim() ? b(r) ? r : d(r, Z.value, f.value) : d(
        m([]),
        Z.value,
        f.value
      );
    }), _e = $(() => {
      const k = Z.value;
      return ue.value ? Ee(k, ue.value.data) : k;
    }), Ce = $(() => {
      const k = f.value;
      return ue.value ? Ee(k, ue.value.data) : k;
    }), Le = $(() => {
      const k = D.value;
      return ue.value ? Ee(k, ue.value.data) : k;
    }), Se = le("desktop");
    function ee() {
      fe.value && I("save", {
        ...y.value,
        message: {
          ...y.value.message,
          html: ae.value
        }
      });
    }
    return (k, r) => (s(), n("div", bm, [
      e("div", gm, [
        Ie(Ye, {
          "campaign-name": c(y).name,
          status: c(y).status,
          dirty: c(P),
          "last-saved-at": c(O),
          "can-undo": c(K),
          "can-redo": c(J),
          "slugify-name": C.enforceSlugName,
          "onUpdate:campaignName": te,
          onUndo: c(q),
          onRedo: c(ge)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ce.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: c(de).dangerBg,
            border: `1px solid ${c(de).dangerBorder}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[16]}px ${c(Q)[24]}px`,
            marginBottom: `${c(Q)[24]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: c(de).danger })
          }, [
            (s(!0), n(F, null, Y(ce.value, (L) => (s(), n("li", {
              key: L.message
            }, p(L.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        E.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: c(de).neutral.bg,
            border: `1px solid ${c(de).neutral.border}`,
            borderRadius: `${c(Ue).input}px`,
            padding: `${c(Q)[16]}px ${c(Q)[24]}px`,
            marginBottom: `${c(Q)[24]}px`,
            fontSize: "0.875rem",
            color: c(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${c(Q)[4]}px` })
          }, "Warnings", 4),
          e("ul", fm, [
            (s(!0), n(F, null, Y(E.value, (L) => (s(), n("li", {
              key: L.message
            }, p(L.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", ym, [
        e("aside", hm, [
          a.disabledSections.includes("email") ? w("", !0) : (s(), n("div", km, [
            e("div", _m, [
              e("div", wm, [
                r[8] || (r[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                e("span", $m, p(A.value), 1)
              ]),
              e("div", xm, [
                Ie(ot, {
                  "template-type": be.value,
                  onUpdate: h
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: re
                }, [
                  r[9] || (r[9] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(F, null, Y(c(mt), (L) => (s(), n("option", {
                    key: L.id,
                    value: L.id
                  }, p(L.label), 9, Cm))), 128))
                ], 32)
              ]),
              e("div", Sm, [
                e("div", Im, [
                  r[10] || (r[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                  e("span", Bm, p(oe.value) + "%", 1)
                ]),
                e("div", Am, [
                  e("span", {
                    class: "kb-email-health-fill",
                    style: ie({ width: `${oe.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(vm, {
              message: c(y).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: c(X),
              onReset: r[0] || (r[0] = (L) => c(N)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Lm, [
          !a.designOnly && c(y).audience.test_mode ? (s(), n("div", Um, [...r[11] || (r[11] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            j(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", Rm, [
            e("div", Tm, [
              e("label", Pm, [
                r[13] || (r[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": r[1] || (r[1] = (L) => R.value = L),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  r[12] || (r[12] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(F, null, Y(c(Oe), (L) => (s(), n("option", {
                    key: L.id,
                    value: L.id
                  }, p(L.label), 9, Vm))), 128))
                ], 512), [
                  [De, R.value]
                ])
              ]),
              e("div", Em, [
                r[14] || (r[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                e("strong", null, p(Se.value), 1)
              ])
            ]),
            e("div", Nm, [
              e("button", {
                type: "button",
                class: ye(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Se.value === "desktop"
                }]),
                onClick: r[2] || (r[2] = (L) => Se.value = "desktop")
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
                j(" Desktop ", -1)
              ])], 2),
              e("button", {
                type: "button",
                class: ye(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Se.value === "mobile"
                }]),
                onClick: r[3] || (r[3] = (L) => Se.value = "mobile")
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
                j(" Mobile ", -1)
              ])], 2)
            ]),
            e("div", {
              class: ye(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": Se.value === "mobile",
                "kb-email-preview-frame--empty": !H.value
              }])
            }, [
              e("div", Om, [
                e("div", Mm, [
                  e("span", Dm, p(M.value), 1),
                  e("span", Wm, "<" + p(me.value) + ">", 1)
                ]),
                e("div", Hm, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: _e.value || "No subject"
                  }, p(_e.value || "No subject"), 9, zm),
                  Ce.value ? (s(), n("span", qm, " — " + p(Ce.value), 1)) : w("", !0)
                ])
              ]),
              e("div", Fm, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: Le.value
                }, null, 8, jm)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", Km, [
        C.actionsNote ? (s(), n("div", Ym, p(C.actionsNote), 1)) : w("", !0),
        e("div", Jm, [
          a.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: r[4] || (r[4] = (L) => I("duplicate", JSON.parse(JSON.stringify(c(y)))))
          }, " Duplicate ")) : w("", !0),
          a.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: ee
          }, " Save ")) : w("", !0),
          a.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: r[5] || (r[5] = (L) => I("edit"))
          }, " Close ")) : w("", !0)
        ])
      ]),
      u.value ? (s(), n("div", Gm, [
        e("div", Xm, [
          r[17] || (r[17] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          r[18] || (r[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Qm, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: r[6] || (r[6] = (L) => {
                u.value = !1, ne.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: r[7] || (r[7] = (L) => ne.value && $e(ne.value))
            }, " Replace ")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), Pt = /* @__PURE__ */ xe(Zm, [["__scopeId", "data-v-d92eac86"]]), ev = { class: "kb-shell" }, tv = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, av = ["aria-selected", "onClick"], sv = { class: "kb-shell__meta" }, nv = ["href"], lv = { class: "kb-shell__body" }, ov = /* @__PURE__ */ we({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(a, { emit: i }) {
    const m = i, b = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (v, d) => (s(), n("div", ev, [
      e("header", {
        class: "kb-shell__header",
        style: ie({ padding: `${c(Q)[12]}px ${c(Q)[24]}px`, borderBottom: `1px solid ${c(de).neutral.border}`, background: c(de).neutral.bg })
      }, [
        d[0] || (d[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", tv, [
          (s(), n(F, null, Y(b, (C) => e("button", {
            key: C.id,
            type: "button",
            class: ye(["kb-shell__channel", { "kb-shell__channel--active": a.channel === C.id }]),
            role: "tab",
            "aria-selected": a.channel === C.id,
            onClick: (I) => m("switch-channel", C.id)
          }, p(C.label), 11, av)), 64))
        ]),
        e("div", sv, [
          a.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: ie({ padding: "2px 8px", borderRadius: `${c(Ue).input}px`, fontSize: "0.75rem", background: c(de).neutral.bg, color: c(de).neutral.textMuted })
          }, p(a.environment), 5)) : w("", !0),
          a.helpUrl ? (s(), n("a", {
            key: 1,
            href: a.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ie({ color: c(de).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, nv)) : w("", !0)
        ])
      ], 4),
      e("div", lv, [
        Ve(v.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), iv = /* @__PURE__ */ xe(ov, [["__scopeId", "data-v-0df30803"]]), rv = {
  class: "kb-outline",
  "aria-label": "Sections"
}, dv = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, uv = ["onClick"], cv = /* @__PURE__ */ we({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(a) {
    var d;
    const i = a, m = le(((d = i.items[0]) == null ? void 0 : d.id) ?? "");
    let b = null;
    function v(C) {
      const I = document.getElementById(C);
      I && I.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return He(() => {
      const C = i.scrollContainerId ? document.getElementById(i.scrollContainerId) : document;
      C && (b = new IntersectionObserver(
        (I) => {
          for (const y of I)
            if (y.isIntersecting) {
              const P = y.target.getAttribute("data-outline-id");
              P && (m.value = P);
            }
        },
        { root: C === document ? null : C, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), i.items.forEach((I) => {
        const y = document.getElementById(I.id);
        y && (b == null || b.observe(y));
      }));
    }), ze(() => {
      b == null || b.disconnect();
    }), Be(
      () => i.items,
      (C) => {
        C.length && !m.value && (m.value = C[0].id);
      },
      { immediate: !0 }
    ), (C, I) => (s(), n("nav", rv, [
      e("ul", dv, [
        (s(!0), n(F, null, Y(a.items, (y) => (s(), n("li", {
          key: y.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ye(["kb-outline__btn", { "kb-outline__btn--active": m.value === y.id }]),
            style: ie({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${c(Q)[8]}px ${c(Q)[12]}px`,
              border: "none",
              borderRadius: `${c(Ue).input}px`,
              background: m.value === y.id ? c(de).neutral.bg : "transparent",
              color: m.value === y.id ? "#0f172a" : c(de).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: m.value === y.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (P) => v(y.id)
          }, p(y.label), 15, uv)
        ]))), 128))
      ])
    ]));
  }
}), pv = /* @__PURE__ */ xe(cv, [["__scopeId", "data-v-25c37675"]]), mv = ["id"], vv = {
  key: 1,
  class: "kb-form-shell__head"
}, bv = /* @__PURE__ */ we({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(a) {
    return (i, m) => (s(), n("div", {
      class: "kb-form-shell",
      id: a.sectionId ?? void 0,
      style: ie({
        padding: `${c(Q)[24]}px ${c(Q)[24]}px ${c(Q)[32]}px`,
        marginBottom: 0
      })
    }, [
      a.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ie({ marginBottom: c(Q)[24], paddingBottom: c(Q)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ie({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: c(Q)[12] })
        }, p(a.label), 5),
        Ve(i.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", vv, [
        Ve(i.$slots, "head", {}, void 0, !0)
      ])),
      Ve(i.$slots, "default", {}, void 0, !0)
    ], 12, mv));
  }
}), gv = /* @__PURE__ */ xe(bv, [["__scopeId", "data-v-6504df41"]]), fv = /* @__PURE__ */ we({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(a) {
    return (i, m) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ie({
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
      Ve(i.$slots, "default")
    ], 4));
  }
}), yv = /* @__PURE__ */ we({
  __name: "BuilderTopShell",
  setup(a) {
    return (i, m) => (s(), n("div", {
      class: "kb-top-shell",
      style: ie({
        marginLeft: c(Q)[24],
        marginRight: c(Q)[24]
      })
    }, [
      Ve(i.$slots, "header"),
      Ve(i.$slots, "errors"),
      Ve(i.$slots, "warnings"),
      Ve(i.$slots, "default")
    ], 4));
  }
});
function hv(a) {
  a.component("KeosNotificationBuilder", Ut), a.component("KeosWhatsAppBuilder", Rt), a.component("KeosSmsBuilder", Tt), a.component("KeosEmailBuilder", Pt), a.component("BuilderShell", iv), a.component("BuilderOutline", pv), a.component("BuilderVersionHistoryModal", Lt), a.component("BuilderFormShell", gv), a.component("BuilderActionsBar", fv), a.component("BuilderTopShell", yv);
}
const _v = {
  install: hv,
  KeosNotificationBuilder: Ut,
  KeosWhatsAppBuilder: Rt,
  KeosSmsBuilder: Tt,
  KeosEmailBuilder: Pt
};
export {
  fv as BuilderActionsBar,
  gv as BuilderFormShell,
  pv as BuilderOutline,
  iv as BuilderShell,
  yv as BuilderTopShell,
  Lt as BuilderVersionHistoryModal,
  Oe as DEFAULT_SAMPLE_PROFILES,
  Pt as KeosEmailBuilder,
  Ut as KeosNotificationBuilder,
  Tt as KeosSmsBuilder,
  Rt as KeosWhatsAppBuilder,
  _v as default,
  hv as install,
  Ee as renderTemplatePreview,
  Ke as useAutosave,
  je as useCampaignState
};
//# sourceMappingURL=index.js.map
