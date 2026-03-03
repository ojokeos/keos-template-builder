import { ref as ee, watch as Be, computed as k, defineComponent as _e, openBlock as n, createElementBlock as l, normalizeStyle as ie, unref as d, createElementVNode as e, Fragment as q, renderList as j, toDisplayString as b, createTextVNode as K, createCommentVNode as _, normalizeClass as he, withDirectives as Pe, vModelSelect as De, vModelText as tt, vModelCheckbox as Mt, createStaticVNode as Oe, withKeys as Nt, onMounted as We, onUnmounted as He, createVNode as Ie, createBlock as Ot, withModifiers as Je, renderSlot as Ve } from "vue";
const Y = {
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
function zt(s) {
  return {
    schema_version: xt,
    name: "",
    status: "draft",
    audience: at(),
    message: st(),
    delivery: nt(),
    tracking: lt(),
    ...s
  };
}
function St(s) {
  const i = s;
  return i.schema_version || (i.schema_version = xt), i.audience || (i.audience = at()), i.message || (i.message = st()), i.delivery || (i.delivery = nt()), i.tracking || (i.tracking = lt()), wt.includes(i.delivery.priority) || (i.delivery.priority = _t), i.delivery.ttl === void 0 && (i.delivery.ttl = $t), Ht.includes(i.audience.type) || (i.audience.type = "topic"), i.audience.type === "topic" && !i.audience.topic_name && (i.audience.topic_name = "default"), i;
}
const Ft = 1e5;
function qt(s, i) {
  var p, c, w;
  const u = [], m = i ?? s.audience.estimated_reach;
  return m !== void 0 && m >= Ft && u.push({
    message: `Estimated reach is very high (${m.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), s.tracking && !((p = s.tracking.campaign_name) != null && p.trim()) && !((c = s.name) != null && c.trim()) && u.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (w = s.message.deep_link) != null && w.trim() || u.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), u;
}
function Ct(s, i = "error") {
  return { message: s, severity: i };
}
function It(s) {
  const i = [];
  return s.schema_version || i.push(Ct("Missing schema_version")), {
    valid: i.length === 0,
    errors: i
  };
}
function jt(s, i) {
  const u = It(s), m = qt(s, i);
  return {
    valid: u.valid,
    errors: [
      ...u.errors,
      ...m.map((p) => Ct(p.message, p.severity))
    ]
  };
}
function Kt(s) {
  return s.errors.filter((i) => i.severity === "error");
}
function Yt(s) {
  return s.errors.filter((i) => i.severity !== "error");
}
function Me(s, i) {
  return s.length <= i ? { text: s, truncated: !1 } : { text: s.slice(0, Math.max(0, i - 3)) + "...", truncated: !0 };
}
const ze = Fe.android;
function Jt(s) {
  const { title: i, body: u } = s, m = Me(i || "", ze.title), p = Me(u || "", ze.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: s.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated,
    expanded: !1
  };
}
function Gt(s) {
  const { title: i, body: u } = s, m = Me(i || "", ze.title), p = Me(u || "", ze.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: s.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated,
    expanded: !0
  };
}
function Xt(s, i = {}) {
  const u = i.expanded ? Gt(s) : Jt(s);
  return i.darkMode !== void 0 && (u.darkMode = i.darkMode), u;
}
const it = Fe.ios;
function Bt(s) {
  const { title: i, body: u } = s, m = Me(i || "", it.title), p = Me(u || "", it.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: s.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated,
    expanded: !1
  };
}
function Qt(s) {
  return Bt(s);
}
function Zt(s, i = {}) {
  const u = i.variant === "lockscreen" ? Qt(s) : Bt(s);
  return i.darkMode !== void 0 && (u.darkMode = i.darkMode), u;
}
const rt = Fe.web;
function dt(s) {
  const { title: i, body: u } = s, m = Me(i || "", rt.title), p = Me(u || "", rt.body);
  return {
    title: m.text,
    body: p.text,
    imageUrl: s.imageUrl,
    titleTruncated: m.truncated,
    bodyTruncated: p.truncated
  };
}
function ea(s) {
  return s.map((i) => ({ message: i, severity: "error" }));
}
function Ge(s) {
  return JSON.parse(JSON.stringify(s));
}
function qe(s = {}) {
  const i = ee(
    St(s.initial ?? zt())
  ), u = s.hooks ?? {}, m = ee(!1), p = ee([]);
  Be(
    i,
    () => {
      if (!u.customValidators) {
        p.value = [];
        return;
      }
      u.customValidators(i.value).then((O) => {
        p.value = O;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const c = ee([]), w = ee([]);
  function C() {
    const O = Ge(i.value);
    c.value = [...c.value.slice(-19), O], w.value = [];
  }
  const f = k(() => c.value.length > 0), E = k(() => w.value.length > 0);
  function V() {
    c.value.length !== 0 && (w.value = [Ge(i.value), ...w.value], i.value = c.value[c.value.length - 1], c.value = c.value.slice(0, -1));
  }
  function H() {
    w.value.length !== 0 && (c.value = [...c.value, Ge(i.value)], i.value = w.value[0], w.value = w.value.slice(1));
  }
  Be(
    i,
    () => {
      var O;
      m.value = !0, (O = s.onDirty) == null || O.call(s);
    },
    { deep: !0 }
  );
  const N = k(() => It(i.value));
  function J(O) {
    const ye = jt(i.value, O), le = ea(p.value), A = [...Kt(ye), ...le], ge = [...ye.errors, ...le], R = ye.valid && le.length === 0;
    return {
      ...ye,
      errors: ge,
      valid: R,
      blockingErrors: A,
      warnings: Yt(ye)
    };
  }
  function F(O) {
    C(), i.value = { ...i.value, ...O };
  }
  function pe(O) {
    C(), i.value = {
      ...i.value,
      audience: { ...i.value.audience, ...O }
    };
  }
  function I(O) {
    C(), i.value = {
      ...i.value,
      message: { ...i.value.message, ...O }
    };
  }
  function $(O) {
    C(), i.value = {
      ...i.value,
      delivery: { ...i.value.delivery, ...O }
    };
  }
  function T(O) {
    C(), i.value = {
      ...i.value,
      tracking: i.value.tracking ? { ...i.value.tracking, ...O } : { campaign_name: "", tags: [], ab_test: !1, ...O }
    };
  }
  function te(O) {
    C(), i.value = {
      ...i.value,
      message: { ...st(), ...O }
    };
  }
  function z(O) {
    C(), i.value = {
      ...i.value,
      delivery: { ...nt(), ...O }
    };
  }
  function be(O) {
    C(), i.value = {
      ...i.value,
      tracking: { ...lt(), ...O }
    };
  }
  function me(O) {
    C(), i.value = {
      ...i.value,
      audience: { ...at(), ...O }
    };
  }
  const ve = k(() => ({
    title: i.value.message.title,
    body: i.value.message.body,
    imageUrl: i.value.message.image_url
  }));
  function ce(O, ye) {
    const le = ve.value;
    let A;
    switch (O) {
      case "android":
        A = Xt(le, { expanded: ye == null ? void 0 : ye.expanded });
        break;
      case "ios":
        A = Zt(le);
        break;
      case "web":
        A = dt(le);
        break;
      default:
        A = dt(le);
    }
    const ge = i.value.message.actions ?? [], R = i.value.message.location;
    return { ...A, actions: ge, location: R ?? void 0 };
  }
  const ae = Fe;
  async function fe() {
    return u.customValidators ? u.customValidators(i.value) : [];
  }
  return {
    campaign: i,
    dirty: m,
    validation: N,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: p,
    getValidationWithWarnings: J,
    update: F,
    updateAudience: pe,
    updateMessage: I,
    updateDelivery: $,
    updateTracking: T,
    undo: V,
    redo: H,
    canUndo: f,
    canRedo: E,
    resetMessage: te,
    resetDelivery: z,
    resetTracking: be,
    resetAudience: me,
    getPreview: ce,
    previewInput: ve,
    characterLimits: ae,
    runCustomValidators: fe,
    hooks: u
  };
}
const ta = "keos-draft", aa = 2e3;
function sa(s, i) {
  return `${ta}-${s}-${i}`;
}
function je(s, i) {
  const u = i.channel, m = k(
    () => {
      var V, H;
      return sa(
        u,
        i.key ?? ((V = s.value) == null ? void 0 : V.id) ?? ((H = s.value) == null ? void 0 : H.name) ?? "draft"
      );
    }
  ), p = ee(null);
  let c = null;
  function w() {
    try {
      const V = JSON.stringify(s.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(m.value, V), p.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(m.value);
    } catch {
    }
  }
  function f() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const V = window.localStorage.getItem(m.value);
      if (!V) return null;
      const H = JSON.parse(V);
      return St(H);
    } catch {
      return null;
    }
  }
  function E() {
    return i.enabled === void 0 ? !0 : typeof i.enabled == "boolean" ? i.enabled : i.enabled.value;
  }
  return Be(
    s,
    () => {
      E() && (c && clearTimeout(c), c = setTimeout(() => {
        c = null, w();
      }, aa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: p,
    clearDraft: C,
    getDraft: f,
    persist: w
  };
}
const na = { class: "kb-header__row" }, la = ["value"], oa = { class: "kb-header__actions" }, ia = ["disabled"], ra = ["disabled"], da = ["value"], ua = ["value"], ca = /* @__PURE__ */ _e({
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
  setup(s, { emit: i }) {
    const u = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], m = s, p = i;
    function c(f) {
      return m.slugifyName ? f.trim().replace(/\s+/g, "-") : f;
    }
    function w(f) {
      return f.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function C(f) {
      const E = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return E[f] ?? E.draft;
    }
    return (f, E) => (n(), l("header", {
      class: "kb-header",
      style: ie({
        padding: `${d(Y)[16]}px 0`,
        borderBottom: `1px solid ${d(oe).neutral.border}`,
        marginBottom: `${d(Y)[16]}px`
      })
    }, [
      e("div", na, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: s.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: E[0] || (E[0] = (V) => p("update:campaignName", c(V.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, la),
        e("div", oa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !s.canUndo,
            onClick: E[1] || (E[1] = (V) => p("undo"))
          }, " Undo ", 8, ia),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !s.canRedo,
            onClick: E[2] || (E[2] = (V) => p("redo"))
          }, " Redo ", 8, ra)
        ]),
        s.workflowStatus !== void 0 ? (n(), l("select", {
          key: 0,
          value: s.workflowStatus,
          class: "kb-header__status-select",
          style: ie({
            padding: `${d(Y)[4]}px ${d(Y)[8]}px`,
            borderRadius: `${d(Le).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...C(s.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: E[3] || (E[3] = (V) => p("update:workflowStatus", V.target.value))
        }, [
          (n(), l(q, null, j(u, (V) => e("option", {
            key: V.value,
            value: V.value
          }, b(V.label), 9, ua)), 64))
        ], 44, da)) : (n(), l("span", {
          key: 1,
          class: "kb-header__status",
          style: ie({
            padding: `${d(Y)[4]}px ${d(Y)[8]}px`,
            borderRadius: `${d(Le).input}px`,
            background: d(oe).neutral.bg,
            fontSize: "0.8125rem",
            color: d(oe).neutral.textMuted
          })
        }, b(s.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ie({ fontSize: "0.8125rem", color: d(oe).neutral.textMuted, marginTop: `${d(Y)[4]}px` })
      }, [
        s.saving ? (n(), l(q, { key: 0 }, [
          K("Saving…")
        ], 64)) : s.dirty ? (n(), l(q, { key: 1 }, [
          K("Unsaved changes")
        ], 64)) : s.lastSavedAt ? (n(), l(q, { key: 2 }, [
          K("Last saved at " + b(w(s.lastSavedAt)), 1)
        ], 64)) : _("", !0)
      ], 4)
    ], 4));
  }
}), we = (s, i) => {
  const u = s.__vccOpts || s;
  for (const [m, p] of i)
    u[m] = p;
  return u;
}, Ke = /* @__PURE__ */ we(ca, [["__scopeId", "data-v-ef058bcb"]]), pa = { class: "kb-section" }, ma = { class: "kb-section__head" }, va = { class: "kb-section__desc" }, ba = { class: "kb-field" }, ga = { class: "kb-label" }, fa = { class: "kb-field-with-rail" }, ya = ["value", "aria-invalid", "aria-describedby"], ha = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, ka = { class: "kb-field" }, _a = { class: "kb-label" }, wa = { class: "kb-field-with-rail" }, $a = ["value", "aria-invalid", "aria-describedby"], xa = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, Sa = { class: "kb-field" }, Ca = ["value", "aria-invalid", "aria-describedby"], Ia = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, Ba = { class: "kb-field" }, Aa = ["value", "aria-invalid", "aria-describedby"], Ua = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, La = { class: "kb-field" }, Ra = { class: "kb-location-row" }, Ta = ["value"], Pa = ["value"], Va = ["value"], Ea = ["value"], Ma = { class: "kb-field" }, Na = { class: "kb-actions-list" }, Oa = ["value", "onInput"], Da = ["value", "onInput"], Wa = ["onClick"], Ha = ["disabled"], za = { class: "kb-action-chips" }, Fa = ["disabled", "onClick"], qa = /* @__PURE__ */ _e({
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
  setup(s) {
    const i = s;
    return (u, m) => {
      var p, c, w, C;
      return n(), l("section", pa, [
        e("div", ma, [
          m[10] || (m[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          s.showReset ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (f) => u.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", va, " Message body is required. Title is optional. Character limits depend on the selected platform (" + b(s.selectedPlatform) + "). ", 1),
        e("div", ba, [
          e("label", ga, [
            m[11] || (m[11] = K(" Title ", -1)),
            e("span", {
              class: he(["kb-counter", { "kb-counter--warn": s.titleCount > s.titleLimit }])
            }, b(s.titleCount) + "/" + b(s.titleLimit), 3)
          ]),
          e("div", fa, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: s.message.title,
              "aria-invalid": !!s.titleError,
              "aria-describedby": s.titleError ? "title-error" : void 0,
              onInput: m[1] || (m[1] = (f) => u.$emit("update", { title: f.target.value }))
            }, null, 40, ya),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ie({ "--pct": Math.min(100, s.titleCount / s.titleLimit * 100) + "%" })
            }, [...m[12] || (m[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          s.titleError ? (n(), l("p", ha, b(s.titleError), 1)) : _("", !0)
        ]),
        e("div", ka, [
          e("label", _a, [
            m[13] || (m[13] = K(" Message ", -1)),
            e("span", {
              class: he(["kb-counter", { "kb-counter--warn": s.bodyCount > s.bodyLimit }])
            }, b(s.bodyCount) + "/" + b(s.bodyLimit), 3)
          ]),
          e("div", wa, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: s.message.body,
              "aria-invalid": !!s.bodyError,
              "aria-describedby": s.bodyError ? "body-error" : void 0,
              onInput: m[2] || (m[2] = (f) => u.$emit("update", { body: f.target.value }))
            }, null, 40, $a),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ie({ "--pct": Math.min(100, s.bodyCount / s.bodyLimit * 100) + "%" })
            }, [...m[14] || (m[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          s.bodyError ? (n(), l("p", xa, b(s.bodyError), 1)) : _("", !0)
        ]),
        e("div", Sa, [
          m[15] || (m[15] = e("label", { class: "kb-label" }, [
            K(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: s.message.image_url,
            "aria-invalid": !!s.imageUrlError,
            "aria-describedby": s.imageUrlError ? "image-url-error" : void 0,
            onInput: m[3] || (m[3] = (f) => u.$emit("update", { image_url: f.target.value || void 0 }))
          }, null, 40, Ca),
          s.imageUrlError ? (n(), l("p", Ia, b(s.imageUrlError), 1)) : _("", !0)
        ]),
        e("div", Ba, [
          m[16] || (m[16] = e("label", { class: "kb-label" }, [
            K(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: s.message.deep_link,
            "aria-invalid": !!s.deepLinkError,
            "aria-describedby": s.deepLinkError ? "deeplink-error" : void 0,
            onInput: m[4] || (m[4] = (f) => u.$emit("update", { deep_link: f.target.value || void 0 }))
          }, null, 40, Aa),
          s.deepLinkError ? (n(), l("p", Ua, b(s.deepLinkError), 1)) : _("", !0)
        ]),
        e("div", La, [
          m[17] || (m[17] = e("label", { class: "kb-label" }, [
            K(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Ra, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((p = s.message.location) == null ? void 0 : p.lat) ?? "",
              onInput: m[5] || (m[5] = (f) => {
                const E = { ...s.message.location ?? {} }, V = f.target.value;
                E.lat = V === "" ? void 0 : Number(V), u.$emit("update", { location: E });
              })
            }, null, 40, Ta),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((c = s.message.location) == null ? void 0 : c.lon) ?? "",
              onInput: m[6] || (m[6] = (f) => {
                const E = { ...s.message.location ?? {} }, V = f.target.value;
                E.lon = V === "" ? void 0 : Number(V), u.$emit("update", { location: E });
              })
            }, null, 40, Pa)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((w = s.message.location) == null ? void 0 : w.name) ?? "",
            onInput: m[7] || (m[7] = (f) => {
              const E = { ...s.message.location ?? {} };
              E.name = f.target.value || void 0, u.$emit("update", { location: E });
            })
          }, null, 40, Va),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((C = s.message.location) == null ? void 0 : C.address) ?? "",
            onInput: m[8] || (m[8] = (f) => {
              const E = { ...s.message.location ?? {} };
              E.address = f.target.value || void 0, u.$emit("update", { location: E });
            })
          }, null, 40, Ea)
        ]),
        e("div", Ma, [
          m[19] || (m[19] = e("label", { class: "kb-label" }, [
            K(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Na, [
            (n(!0), l(q, null, j(i.message.actions ?? [], (f, E) => (n(), l("div", {
              key: f.id || E,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: f.label,
                onInput: (V) => {
                  var J;
                  const H = [...i.message.actions ?? []], N = Number(E);
                  H[N] = {
                    ...H[N],
                    id: ((J = H[N]) == null ? void 0 : J.id) || `action_${N + 1}`,
                    label: V.target.value
                  }, u.$emit("update", { actions: H });
                }
              }, null, 40, Oa),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: f.url,
                onInput: (V) => {
                  var J;
                  const H = [...i.message.actions ?? []], N = Number(E);
                  H[N] = {
                    ...H[N],
                    id: ((J = H[N]) == null ? void 0 : J.id) || `action_${N + 1}`,
                    url: V.target.value || void 0
                  }, u.$emit("update", { actions: H });
                }
              }, null, 40, Da),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const V = [...i.message.actions ?? []];
                  V.splice(Number(E), 1), u.$emit("update", { actions: V });
                }
              }, " Remove ", 8, Wa)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (i.message.actions ?? []).length >= 3,
              onClick: m[9] || (m[9] = () => {
                const f = [...i.message.actions ?? []];
                f.push({
                  id: `action_${f.length + 1}`,
                  label: "",
                  url: ""
                }), u.$emit("update", { actions: f });
              })
            }, " Add action ", 8, Ha),
            e("div", za, [
              m[18] || (m[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (n(), l(q, null, j(["View order", "Track shipment", "Open app"], (f) => e("button", {
                key: f,
                type: "button",
                class: "kb-action-chip",
                disabled: (i.message.actions ?? []).length >= 3,
                onClick: () => {
                  const E = [...i.message.actions ?? []];
                  E.push({
                    id: `action_${Date.now()}`,
                    label: f,
                    url: ""
                  }), u.$emit("update", { actions: E });
                }
              }, b(f), 9, Fa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ja = /* @__PURE__ */ we(qa, [["__scopeId", "data-v-7bc3a44c"]]), Ka = { class: "kb-section kb-section--inline-personalization" }, Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = ["value"], Xa = { class: "kb-field" }, Qa = { class: "kb-insert-row" }, Za = { class: "kb-field" }, es = { class: "kb-variable-list" }, ts = /* @__PURE__ */ _e({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(s, { emit: i }) {
    const u = s, m = i, p = ["first_name", "last_name", "order_id", "city"], c = ee(u.variableOptions ?? p), w = ee(c.value[0] ?? p[0]), C = ee("");
    Be(
      () => u.variableOptions,
      (H) => {
        H && H.length && (c.value = [...H], c.value.includes(w.value) || (w.value = c.value[0]));
      }
    );
    const f = k(() => c.value);
    function E(H) {
      m("insertVariable", { variable: w.value, field: H });
    }
    function V() {
      const H = C.value.trim();
      H && (c.value.includes(H) || (c.value = [...c.value, H]), w.value = H, C.value = "");
    }
    return (H, N) => (n(), l("section", Ka, [
      N[8] || (N[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      N[9] || (N[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ya, [
        N[4] || (N[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ja, [
          Pe(e("select", {
            "onUpdate:modelValue": N[0] || (N[0] = (J) => w.value = J),
            class: "kb-select"
          }, [
            (n(!0), l(q, null, j(f.value, (J) => (n(), l("option", {
              key: J,
              value: J
            }, b(J), 9, Ga))), 128))
          ], 512), [
            [De, w.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: N[1] || (N[1] = (J) => E("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: N[2] || (N[2] = (J) => E("body"))
          }, "Into message")
        ])
      ]),
      e("div", Xa, [
        N[5] || (N[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qa, [
          Pe(e("input", {
            "onUpdate:modelValue": N[3] || (N[3] = (J) => C.value = J),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [tt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: V
          }, " Add ")
        ])
      ]),
      e("div", Za, [
        N[6] || (N[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        N[7] || (N[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", es, [
          (n(!0), l(q, null, j(f.value, (J) => (n(), l("li", { key: J }, [
            e("code", null, "{{ " + b(J) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), At = /* @__PURE__ */ we(ts, [["__scopeId", "data-v-6d49f6dc"]]), as = { class: "kb-section kb-section--template-type" }, ss = { class: "kb-field" }, ns = { class: "kb-radio-group" }, ls = { class: "kb-radio" }, os = ["checked"], is = { class: "kb-radio" }, rs = ["checked"], ds = /* @__PURE__ */ _e({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(s, { emit: i }) {
    const u = i;
    return (m, p) => (n(), l("section", as, [
      p[5] || (p[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      p[6] || (p[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", ss, [
        e("div", ns, [
          e("label", ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: s.templateType === "transactional",
              onChange: p[0] || (p[0] = (c) => u("update", "transactional"))
            }, null, 40, os),
            p[2] || (p[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", is, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: s.templateType === "marketing",
              onChange: p[1] || (p[1] = (c) => u("update", "marketing"))
            }, null, 40, rs),
            p[3] || (p[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        p[4] || (p[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), ot = /* @__PURE__ */ we(ds, [["__scopeId", "data-v-991f74e5"]]), us = { class: "kb-section" }, cs = { class: "kb-section__head" }, ps = { class: "kb-section__desc" }, ms = { class: "kb-field" }, vs = { class: "kb-radio-group" }, bs = { class: "kb-radio" }, gs = ["checked"], fs = { class: "kb-radio" }, ys = ["checked"], hs = {
  key: 0,
  class: "kb-field kb-row"
}, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Ss = { class: "kb-field" }, Cs = ["value"], Is = ["value"], Bs = { class: "kb-field" }, As = { class: "kb-checkbox" }, Us = ["checked"], Ls = /* @__PURE__ */ _e({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s) {
    const i = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (u, m) => {
      var p;
      return n(), l("section", us, [
        e("div", cs, [
          m[8] || (m[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          s.showReset ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: m[0] || (m[0] = (c) => u.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", ps, b(s.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ms, [
          m[11] || (m[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", vs, [
            e("label", bs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !s.delivery.scheduled_at,
                onChange: m[1] || (m[1] = (c) => u.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, gs),
              m[9] || (m[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", fs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!s.delivery.scheduled_at,
                onChange: m[2] || (m[2] = (c) => u.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, ys),
              m[10] || (m[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        s.delivery.scheduled_at ? (n(), l("div", hs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (p = s.delivery.scheduled_at) == null ? void 0 : p.slice(0, 16),
            onInput: m[3] || (m[3] = (c) => u.$emit("update", { scheduled_at: c.target.value }))
          }, null, 40, ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: s.delivery.timezone,
            onInput: m[4] || (m[4] = (c) => u.$emit("update", { timezone: c.target.value }))
          }, null, 40, _s)
        ])) : _("", !0),
        s.showPushOptions ? (n(), l(q, { key: 1 }, [
          e("div", ws, [
            m[12] || (m[12] = e("label", { class: "kb-label" }, [
              K(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.ttl,
              onChange: m[5] || (m[5] = (c) => u.$emit("update", { ttl: Number(c.target.value) }))
            }, [
              (n(!0), l(q, null, j(d(Wt), (c) => (n(), l("option", {
                key: c,
                value: c
              }, b(i[c] ?? c + "s"), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Ss, [
            m[13] || (m[13] = e("label", { class: "kb-label" }, [
              K(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.priority,
              onChange: m[6] || (m[6] = (c) => u.$emit("update", { priority: c.target.value }))
            }, [
              (n(!0), l(q, null, j(d(wt), (c) => (n(), l("option", {
                key: c,
                value: c
              }, b(c), 9, Is))), 128))
            ], 40, Cs)
          ]),
          e("div", Bs, [
            e("label", As, [
              e("input", {
                type: "checkbox",
                checked: s.delivery.quiet_hours,
                onChange: m[7] || (m[7] = (c) => u.$emit("update", { quiet_hours: !s.delivery.quiet_hours }))
              }, null, 40, Us),
              m[14] || (m[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : _("", !0)
      ]);
    };
  }
}), Rs = /* @__PURE__ */ we(Ls, [["__scopeId", "data-v-a208b72f"]]), Ts = { class: "kb-accordion" }, Ps = { class: "kb-accordion__body" }, Vs = { class: "kb-field" }, Es = ["value"], Ms = { class: "kb-field" }, Ns = { class: "kb-checkbox" }, Os = ["checked"], Ds = /* @__PURE__ */ _e({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(s) {
    return (i, u) => (n(), l("details", Ts, [
      u[4] || (u[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Ps, [
        e("div", Vs, [
          u[2] || (u[2] = e("label", { class: "kb-label" }, [
            K(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: s.delivery.collapse_key,
            onInput: u[0] || (u[0] = (m) => i.$emit("update", { collapse_key: m.target.value || void 0 }))
          }, null, 40, Es)
        ]),
        e("div", Ms, [
          e("label", Ns, [
            e("input", {
              type: "checkbox",
              checked: s.delivery.silent_push,
              onChange: u[1] || (u[1] = (m) => i.$emit("update", { silent_push: !s.delivery.silent_push }))
            }, null, 40, Os),
            u[3] || (u[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ws = /* @__PURE__ */ we(Ds, [["__scopeId", "data-v-e0f5c559"]]);
function Ee(s, i) {
  return !s || typeof s != "string" ? s : s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (u, m) => {
    const p = m.trim();
    return p in i ? String(i[p]) : `{{ ${m} }}`;
  });
}
const Ne = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Hs = { class: "kb-preview" }, zs = {
  key: 0,
  class: "kb-preview__toggle"
}, Fs = { class: "kb-checkbox" }, qs = {
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
}, Sn = ["src"], Cn = {
  key: 0,
  class: "kb-preview-map__caption"
}, In = {
  key: 0,
  class: "kb-web-actions"
}, Bn = /* @__PURE__ */ _e({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(s) {
    const i = s, u = ee(!1), m = k(
      () => i.getPreview(i.selectedPlatform, {
        expanded: i.selectedPlatform === "android" ? u.value : void 0
      })
    ), p = k(() => {
      const C = m.value;
      return i.previewProfile ? {
        ...C,
        title: Ee((C == null ? void 0 : C.title) ?? "", i.previewProfile.data),
        body: Ee((C == null ? void 0 : C.body) ?? "", i.previewProfile.data)
      } : C;
    }), c = k(() => {
      var N;
      const C = (N = p.value) == null ? void 0 : N.location;
      if (!C || C.lat == null && C.lon == null) return null;
      const f = Number(C.lat) || 0, E = Number(C.lon) || 0, V = 8e-3, H = [E - V, f - V, E + V, f + V].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(H)}&layer=mapnik&marker=${f},${E}`;
    }), w = k(() => {
      var f;
      const C = (f = p.value) == null ? void 0 : f.location;
      return C && (C.lat != null || C.lon != null || C.name || C.address);
    });
    return (C, f) => {
      var E, V, H, N, J, F, pe, I, $, T, te, z, be, me, ve, ce;
      return n(), l("div", Hs, [
        s.selectedPlatform === "android" ? (n(), l("div", zs, [
          e("label", Fs, [
            Pe(e("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (ae) => u.value = ae),
              type: "checkbox"
            }, null, 512), [
              [Mt, u.value]
            ]),
            f[1] || (f[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : _("", !0),
        s.selectedPlatform === "android" ? (n(), l("div", qs, [
          f[4] || (f[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: he(["kb-android-notification", { "kb-android-notification--expanded": u.value }])
          }, [
            f[3] || (f[3] = Oe('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: he(["kb-android-body", { "kb-android-body--expanded": u.value }])
            }, [
              u.value && p.value.imageUrl ? (n(), l("div", js, [
                e("img", {
                  src: p.value.imageUrl,
                  alt: ""
                }, null, 8, Ks)
              ])) : _("", !0),
              e("div", Ys, [
                e("div", Js, [
                  p.value.title ? (n(), l("div", Gs, b(p.value.title), 1)) : _("", !0),
                  p.value.body ? (n(), l("div", Xs, b(p.value.body), 1)) : _("", !0),
                  w.value && !u.value && ((E = p.value.location) != null && E.name || (V = p.value.location) != null && V.address) ? (n(), l("div", Qs, [
                    f[2] || (f[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    K(" " + b(((H = p.value.location) == null ? void 0 : H.name) || ((N = p.value.location) == null ? void 0 : N.address)), 1)
                  ])) : _("", !0)
                ]),
                !u.value && p.value.imageUrl ? (n(), l("div", Zs, [
                  e("img", {
                    src: p.value.imageUrl,
                    alt: ""
                  }, null, 8, en)
                ])) : _("", !0)
              ]),
              w.value && c.value && u.value ? (n(), l("div", tn, [
                e("iframe", {
                  src: c.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, an),
                (J = p.value.location) != null && J.name || (F = p.value.location) != null && F.address ? (n(), l("div", sn, b(((pe = p.value.location) == null ? void 0 : pe.name) || ((I = p.value.location) == null ? void 0 : I.address)), 1)) : _("", !0)
              ])) : _("", !0),
              p.value.actions && p.value.actions.length ? (n(), l("div", nn, [
                (n(!0), l(q, null, j(p.value.actions, (ae) => (n(), l("button", {
                  key: ae.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, b(ae.label || "Action"), 1))), 128))
              ])) : _("", !0)
            ], 2)
          ], 2)
        ])) : s.selectedPlatform === "ios" ? (n(), l("div", ln, [
          f[7] || (f[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", on, [
            f[6] || (f[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", rn, [
              f[5] || (f[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              p.value.title ? (n(), l("div", dn, b(p.value.title), 1)) : _("", !0),
              p.value.body ? (n(), l("div", un, b(p.value.body), 1)) : _("", !0),
              w.value && c.value ? (n(), l("div", cn, [
                e("iframe", {
                  src: c.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                ($ = p.value.location) != null && $.name || (T = p.value.location) != null && T.address ? (n(), l("div", mn, b(((te = p.value.location) == null ? void 0 : te.name) || ((z = p.value.location) == null ? void 0 : z.address)), 1)) : _("", !0)
              ])) : _("", !0),
              p.value.actions && p.value.actions.length ? (n(), l("div", vn, [
                (n(!0), l(q, null, j(p.value.actions, (ae) => (n(), l("button", {
                  key: ae.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, b(ae.label || "Action"), 1))), 128))
              ])) : _("", !0)
            ]),
            p.value.imageUrl ? (n(), l("div", bn, [
              e("img", {
                src: p.value.imageUrl,
                alt: ""
              }, null, 8, gn)
            ])) : _("", !0)
          ])
        ])) : (n(), l("div", fn, [
          f[9] || (f[9] = Oe('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", yn, [
            f[8] || (f[8] = Oe('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", hn, [
              p.value.title ? (n(), l("div", kn, b(p.value.title), 1)) : _("", !0),
              p.value.body ? (n(), l("div", _n, b(p.value.body), 1)) : _("", !0),
              p.value.imageUrl ? (n(), l("div", wn, [
                e("img", {
                  src: p.value.imageUrl,
                  alt: ""
                }, null, 8, $n)
              ])) : _("", !0),
              w.value && c.value ? (n(), l("div", xn, [
                e("iframe", {
                  src: c.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Sn),
                (be = p.value.location) != null && be.name || (me = p.value.location) != null && me.address ? (n(), l("div", Cn, b(((ve = p.value.location) == null ? void 0 : ve.name) || ((ce = p.value.location) == null ? void 0 : ce.address)), 1)) : _("", !0)
              ])) : _("", !0)
            ]),
            p.value.actions && p.value.actions.length ? (n(), l("div", In, [
              (n(!0), l(q, null, j(p.value.actions, (ae, fe) => (n(), l("button", {
                key: ae.id || fe,
                type: "button",
                class: he(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(fe) > 0 }])
              }, b(ae.label || "Action"), 3))), 128))
            ])) : _("", !0)
          ])
        ]))
      ]);
    };
  }
}), An = /* @__PURE__ */ we(Bn, [["__scopeId", "data-v-1d6293a0"]]), Un = { class: "kb-version-dialog" }, Ln = {
  key: 0,
  class: "kb-version-empty"
}, Rn = {
  key: 1,
  class: "kb-version-list"
}, Tn = { class: "kb-version-item-label" }, Pn = ["onClick"], Vn = { class: "kb-version-actions" }, En = /* @__PURE__ */ _e({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(s, { emit: i }) {
    const u = i;
    function m(p) {
      try {
        return new Date(p).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return p;
      }
    }
    return (p, c) => s.open ? (n(), l("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: c[1] || (c[1] = Nt((w) => u("close"), ["escape"]))
    }, [
      e("div", Un, [
        c[2] || (c[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        c[3] || (c[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        s.versions.length === 0 ? (n(), l("div", Ln, ' No versions saved yet. Use "Save as version" to create one. ')) : (n(), l("ul", Rn, [
          (n(!0), l(q, null, j(s.versions, (w) => (n(), l("li", {
            key: w.id,
            class: "kb-version-item"
          }, [
            e("span", Tn, b(w.label || m(w.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                u("restore", w.snapshot), u("close");
              }
            }, " Restore ", 8, Pn)
          ]))), 128))
        ])),
        e("div", Vn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: c[0] || (c[0] = (w) => u("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : _("", !0);
  }
}), Ut = /* @__PURE__ */ we(En, [["__scopeId", "data-v-ce35a513"]]), ut = [
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
], Mn = { class: "keos-notification-builder" }, Nn = { class: "kb-builder-top" }, On = { style: { margin: 0, paddingLeft: "1.25rem" } }, Dn = { class: "kb-push-layout" }, Wn = { class: "kb-push-sidebar" }, Hn = {
  key: 0,
  class: "kb-push-form"
}, zn = {
  key: 0,
  class: "kb-hint-card"
}, Fn = { class: "kb-push-form-head" }, qn = { class: "kb-push-form-head-top" }, jn = { class: "kb-push-health-pill" }, Kn = { class: "kb-push-form-head-row" }, Yn = ["value"], Jn = { class: "kb-push-health" }, Gn = { class: "kb-push-health-row" }, Xn = { class: "kb-push-health-value" }, Qn = { class: "kb-push-health-bar" }, Zn = {
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
}, vl = { class: "kb-confirm-dialog" }, bl = { class: "kb-confirm-actions" }, gl = /* @__PURE__ */ _e({
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
  setup(s, { emit: i }) {
    const u = s, m = i, p = ee("android"), c = ee(""), w = ee(!1), C = ee(null), f = ee(!1), E = k(
      () => F.value.workflow_status ?? "draft"
    ), V = k(() => {
      const y = c.value;
      return y ? Ne.find((r) => r.id === y) ?? null : null;
    });
    function H(y) {
      const r = F.value, B = y.campaign.message ? { ...r.message, ...y.campaign.message } : r.message, v = y.campaign.delivery ? { ...r.delivery, ...y.campaign.delivery } : r.delivery;
      T({
        ...y.campaign,
        message: B,
        delivery: v
      }), C.value = null, w.value = !1;
    }
    function N(y) {
      const r = y.target.value;
      if (!r) return;
      const B = ut.find((v) => v.id === r);
      B && (pe.value ? (C.value = B, w.value = !0) : H(B), y.target.value = "");
    }
    function J(y) {
      F.value = y, f.value = !1;
    }
    const {
      campaign: F,
      dirty: pe,
      customValidatorErrors: I,
      getValidationWithWarnings: $,
      update: T,
      updateMessage: te,
      updateDelivery: z,
      undo: be,
      redo: me,
      canUndo: ve,
      canRedo: ce,
      resetMessage: ae,
      resetDelivery: fe,
      getPreview: O,
      characterLimits: ye,
      hooks: le
    } = qe({
      initial: u.modelValue,
      hooks: {
        ...u.hooks,
        customValidators: async (y) => {
          var v, a, t, h;
          const r = [];
          (v = y.name) != null && v.trim() || r.push("Template name is required"), (t = (a = y.message) == null ? void 0 : a.body) != null && t.trim() || r.push("Message body is required");
          const B = (h = u.hooks) != null && h.customValidators ? await u.hooks.customValidators(y) : [];
          return [...r, ...B];
        }
      },
      onDirty: () => m("change", F.value)
    }), { lastSavedAt: A } = je(F, { channel: "push" });
    function ge(y) {
      (y.metaKey || y.ctrlKey) && y.key === "z" && (y.preventDefault(), y.shiftKey ? me() : be());
    }
    We(() => {
      window.addEventListener("keydown", ge);
    }), He(() => {
      window.removeEventListener("keydown", ge);
    }), Be(F, (y) => m("update:modelValue", y), { deep: !0 });
    const R = ee(), g = ee(!0), se = ee(!0);
    async function re() {
      if (le.estimateReach)
        try {
          R.value = await le.estimateReach(F.value.audience);
        } catch {
          R.value = void 0;
        }
      le.canSend && (g.value = await Promise.resolve(le.canSend())), le.canSchedule && (se.value = await Promise.resolve(le.canSchedule()));
    }
    re(), Be(() => F.value.audience, re, { deep: !0 });
    const xe = k(() => (I.value, $(R.value))), $e = k(() => xe.value.blockingErrors), P = k(() => xe.value.warnings), X = k(() => xe.value.valid), G = k(() => {
      var v, a, t;
      const y = F.value.message, r = [
        !!((v = F.value.name) != null && v.trim()),
        !!((a = y.title) != null && a.trim()),
        !!((t = y.body) != null && t.trim()),
        !!(y.template_type ?? F.value.template_type),
        Array.isArray(y.actions) ? y.actions.length > 0 : !1
      ], B = r.filter(Boolean).length;
      return Math.round(B / r.length * 100);
    }), S = k(() => G.value >= 90 ? "Production ready" : G.value >= 70 ? "Strong draft" : G.value >= 40 ? "In progress" : "Needs setup"), L = k(() => {
      const y = F.value.message;
      return !!((y.title ?? "").toString().trim() || (y.body ?? "").toString().trim() || Array.isArray(y.actions) && y.actions.length);
    }), M = k(
      () => ye[p.value].title
    ), de = k(() => ye[p.value].body), ue = k(() => F.value.message.title.length), W = k(() => F.value.message.body.length), D = k(() => {
      if (ue.value > M.value)
        return `Title exceeds ${M.value} characters for ${p.value}.`;
    }), Q = k(() => {
      const y = $e.value.find(
        (r) => r.message === "Message body is required"
      );
      if (y) return y.message;
      if (W.value > de.value)
        return `Body exceeds ${de} characters for ${p.value}.`;
    }), ke = k(
      () => F.value.template_type ?? "transactional"
    );
    function Se(y) {
      T({ template_type: y });
    }
    function Ue(y) {
      T({
        name: y,
        tracking: { ...F.value.tracking ?? {}, campaign_name: y }
      });
    }
    function Ce(y) {
      const r = ` {{ ${y.variable} }}`, B = F.value.message.variables ?? [], v = Array.from(/* @__PURE__ */ new Set([...B, y.variable]));
      y.field === "title" ? te({
        title: F.value.message.title + r,
        variables: v
      }) : te({
        body: F.value.message.body + r,
        variables: v
      });
    }
    function ne() {
      X.value && m("save", F.value);
    }
    return (y, r) => (n(), l("div", Mn, [
      e("div", Nn, [
        Ie(Ke, {
          "campaign-name": d(F).name,
          status: d(F).status,
          dirty: d(pe),
          "last-saved-at": d(A),
          "can-undo": d(ve),
          "can-redo": d(ce),
          "workflow-status": E.value,
          "slugify-name": u.enforceSlugName,
          "onUpdate:campaignName": Ue,
          "onUpdate:workflowStatus": r[0] || (r[0] = (B) => d(T)({ workflow_status: B })),
          onUndo: d(be),
          onRedo: d(me)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        $e.value.length > 0 ? (n(), l("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(oe).dangerBg,
            border: `1px solid ${d(oe).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[12]}px ${d(Y)[16]}px`,
            marginBottom: `${d(Y)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(oe).danger })
          }, [
            (n(!0), l(q, null, j($e.value, (B) => (n(), l("li", {
              key: B.message
            }, b(B.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        P.value.length > 0 ? (n(), l("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(oe).neutral.bg,
            border: `1px solid ${d(oe).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[12]}px ${d(Y)[16]}px`,
            marginBottom: `${d(Y)[16]}px`,
            fontSize: "0.875rem",
            color: d(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(Y)[4]}px` })
          }, "Warnings", 4),
          e("ul", On, [
            (n(!0), l(q, null, j(P.value, (B) => (n(), l("li", {
              key: B.message
            }, b(B.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Dn, [
        e("aside", Wn, [
          s.disabledSections.includes("message") ? _("", !0) : (n(), l("div", Hn, [
            !d(F).message.title && !d(F).message.body ? (n(), l("div", zn, " Add a title and message below to get started. ")) : _("", !0),
            e("div", Fn, [
              e("div", qn, [
                r[12] || (r[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                e("span", jn, b(S.value), 1)
              ]),
              e("div", Kn, [
                Ie(ot, {
                  "template-type": ke.value,
                  onUpdate: Se
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: N
                }, [
                  r[13] || (r[13] = e("option", { value: "" }, "Presets…", -1)),
                  (n(!0), l(q, null, j(d(ut), (B) => (n(), l("option", {
                    key: B.id,
                    value: B.id
                  }, b(B.label), 9, Yn))), 128))
                ], 32)
              ]),
              e("div", Jn, [
                e("div", Gn, [
                  r[14] || (r[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                  e("span", Xn, b(G.value) + "%", 1)
                ]),
                e("div", Qn, [
                  e("span", {
                    class: "kb-push-health-fill",
                    style: ie({ width: `${G.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(ja, {
              message: d(F).message,
              "title-count": ue.value,
              "body-count": W.value,
              "title-limit": M.value,
              "body-limit": de.value,
              "selected-platform": p.value,
              "show-reset": !0,
              "title-error": D.value,
              "body-error": Q.value,
              onUpdate: d(te),
              onReset: r[1] || (r[1] = (B) => d(ae)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            Ie(At, {
              message: d(F).message,
              "variable-options": s.variableOptions,
              onUpdate: d(te),
              onInsertVariable: Ce
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !s.designOnly && !s.disabledSections.includes("delivery") ? (n(), l("div", Zn, [
            r[15] || (r[15] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            Ie(Rs, {
              delivery: d(F).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: d(z),
              onReset: r[2] || (r[2] = (B) => d(fe)())
            }, null, 8, ["delivery", "onUpdate"]),
            Ie(Ws, {
              delivery: d(F).delivery,
              onUpdate: d(z)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : _("", !0)
        ]),
        e("main", el, [
          !s.designOnly && d(F).audience.test_mode ? (n(), l("div", tl, [...r[16] || (r[16] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            K(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", al, [
            e("div", sl, [
              e("label", nl, [
                r[18] || (r[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": r[3] || (r[3] = (B) => c.value = B),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  r[17] || (r[17] = e("option", { value: "" }, "No substitution", -1)),
                  (n(!0), l(q, null, j(d(Ne), (B) => (n(), l("option", {
                    key: B.id,
                    value: B.id
                  }, b(B.label), 9, ll))), 128))
                ], 512), [
                  [De, c.value]
                ])
              ]),
              e("div", ol, [
                r[19] || (r[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, b(p.value), 1)
              ])
            ]),
            e("div", il, [
              (n(), l(q, null, j(["android", "ios", "web"], (B) => e("button", {
                key: B,
                type: "button",
                class: he(["kb-push-device-btn", { "kb-push-device-btn--active": p.value === B }]),
                role: "tab",
                "aria-selected": p.value === B,
                "aria-controls": `kb-preview-panel-${B}`,
                onClick: (v) => p.value = B
              }, b(B.toUpperCase()), 11, rl)), 64))
            ]),
            e("div", {
              class: he(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !L.value }])
            }, [
              !d(F).message.title && !d(F).message.body ? (n(), l("div", dl, [...r[20] || (r[20] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (n(), Ot(An, {
                key: 1,
                "get-preview": d(O),
                "selected-platform": p.value,
                "preview-profile": V.value,
                "onUpdate:selectedPlatform": r[4] || (r[4] = (B) => p.value = B)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ], 2)
          ])
        ])
      ]),
      e("footer", ul, [
        u.actionsNote ? (n(), l("div", cl, b(u.actionsNote), 1)) : _("", !0),
        e("div", pl, [
          !s.designOnly && s.showHistory ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: r[5] || (r[5] = (B) => f.value = !0)
          }, " Version history ")) : _("", !0),
          !s.designOnly && s.showSaveVersion ? (n(), l("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: r[6] || (r[6] = (B) => m("save-version", JSON.parse(JSON.stringify(d(F)))))
          }, " Save as version ")) : _("", !0),
          s.showDuplicate ? (n(), l("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: r[7] || (r[7] = (B) => m("duplicate", JSON.parse(JSON.stringify(d(F)))))
          }, " Duplicate ")) : _("", !0),
          s.showSave ? (n(), l("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: ne
          }, " Save ")) : _("", !0),
          s.showClose ? (n(), l("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: r[8] || (r[8] = (B) => m("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      w.value ? (n(), l("div", ml, [
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
              onClick: r[9] || (r[9] = (B) => {
                w.value = !1, C.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: r[10] || (r[10] = (B) => C.value && H(C.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0),
      Ie(Ut, {
        open: f.value,
        versions: s.versions,
        onClose: r[11] || (r[11] = (B) => f.value = !1),
        onRestore: J
      }, null, 8, ["open", "versions"])
    ]));
  }
}), Lt = /* @__PURE__ */ we(gl, [["__scopeId", "data-v-e4f07604"]]), fl = { class: "kb-section" }, yl = { class: "kb-section__head" }, hl = { class: "kb-summary-bar" }, kl = { class: "kb-pill kb-pill--category" }, _l = { class: "kb-pill kb-pill--format" }, wl = { class: "kb-pill kb-pill--status" }, $l = { class: "kb-field" }, xl = ["value"], Sl = { class: "kb-field" }, Cl = { class: "kb-label" }, Il = { class: "kb-helper" }, Bl = ["value"], Al = ["value"], Ul = { class: "kb-field" }, Ll = ["value"], Rl = { class: "kb-field kb-field--inline" }, Tl = { class: "kb-field-half" }, Pl = ["value"], Vl = { class: "kb-field" }, El = ["value"], Ml = {
  key: 0,
  class: "kb-field"
}, Nl = { class: "kb-label" }, Ol = ["value"], Dl = {
  key: 1,
  class: "kb-field"
}, Wl = ["value"], Hl = {
  key: 2,
  class: "kb-field"
}, zl = ["value"], Fl = {
  key: 3,
  class: "kb-field"
}, ql = ["value"], jl = {
  key: 4,
  class: "kb-field kb-field--inline"
}, Kl = { class: "kb-location-row" }, Yl = ["value"], Jl = ["value"], Gl = ["value"], Xl = ["value"], Ql = {
  key: 5,
  class: "kb-field"
}, Zl = ["value"], eo = {
  key: 6,
  class: "kb-field"
}, to = ["value"], ao = {
  key: 7,
  class: "kb-field"
}, so = ["value"], no = ["value"], lo = {
  key: 8,
  class: "kb-field"
}, oo = { class: "kb-wa-buttons" }, io = ["value", "onInput"], ro = ["value", "onInput"], uo = ["value", "onInput"], co = ["value", "onInput"], po = ["onClick"], mo = ["disabled"], vo = {
  key: 9,
  class: "kb-field"
}, bo = { class: "kb-wa-buttons" }, go = ["value", "onInput"], fo = ["value", "onInput"], yo = ["onClick"], ho = {
  key: 10,
  class: "kb-field"
}, ko = ["value"], _o = ["value"], wo = { class: "kb-field" }, $o = { class: "kb-label" }, xo = ["value"], So = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, Co = { class: "kb-wa-fields-list" }, Io = { class: "kb-wa-field-name" }, Bo = { class: "kb-wa-field-status" }, Ao = { class: "kb-field" }, Uo = ["value"], Lo = { class: "kb-field" }, Ro = { class: "kb-wa-buttons" }, To = ["value", "onInput"], Po = ["value", "onChange"], Vo = ["value", "onInput"], Eo = ["value", "onInput"], Mo = {
  key: 2,
  class: "kb-opt-out-note"
}, No = ["onClick"], Oo = ["disabled"], Xe = 60, Qe = 1024, Ze = 60, et = 10, vt = 10, Do = /* @__PURE__ */ _e({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: i }) {
    const u = s, m = i, p = [
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
    ], c = k(() => u.message), w = k(() => c.value.template_type ?? "text"), C = k(() => c.value.header_type ?? "none"), f = k(() => String(c.value.header ?? "")), E = k(() => String(c.value.body ?? "")), V = k(() => String(c.value.footer ?? "")), H = k(() => c.value.buttons ?? []), N = k(() => c.value.products ?? []), J = k(() => c.value.cards ?? []), F = k(() => {
      const R = p.find((g) => g.value === w.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), pe = k(() => {
      const R = String(c.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), I = k(() => {
      const R = p.find((g) => g.value === w.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), $ = k(() => c.value.template_name ? E.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function T(R) {
      if (!R || typeof R != "string") return [];
      const g = /\{\{\s*([^}]+?)\s*\}\}/g, se = /* @__PURE__ */ new Set();
      let re;
      for (; (re = g.exec(R)) !== null; ) se.add(re[1].trim());
      return Array.from(se);
    }
    const te = k(() => {
      const R = u.message.header ?? "", g = u.message.body ?? u.message.body ?? "", se = new Set(u.message.variables ?? []), re = [...T(R), ...T(g)];
      return Array.from(new Set(re)).map(($e) => ({ name: $e, configured: se.has($e) }));
    });
    function z(R) {
      m("update", R);
    }
    function be(R) {
      const g = {
        template_category: R || void 0
      };
      R === "authentication" && w.value !== "auth" && (g.template_type = "auth"), z(g);
    }
    function me(R) {
      const g = { template_type: R };
      R === "auth" && (g.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (g.header_type = R), z(g);
    }
    function ve(R, g) {
      var re;
      const se = [...H.value];
      se[R] = {
        ...se[R],
        id: ((re = se[R]) == null ? void 0 : re.id) || `btn_${R + 1}`,
        ...g
      }, z({ buttons: se });
    }
    function ce(R) {
      const g = [...H.value];
      g.splice(R, 1), z({ buttons: g });
    }
    function ae() {
      const R = [...H.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), z({ buttons: R });
    }
    function fe(R, g) {
      var re;
      const se = [...N.value];
      se[R] = {
        ...se[R],
        id: ((re = se[R]) == null ? void 0 : re.id) || `prod_${R + 1}`,
        ...g
      }, z({ products: se });
    }
    function O(R) {
      const g = [...N.value];
      g.splice(R, 1), z({ products: g });
    }
    function ye() {
      const R = [...N.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), z({ products: R });
    }
    function le(R, g) {
      var re;
      const se = [...J.value];
      se[R] = {
        ...se[R],
        id: ((re = se[R]) == null ? void 0 : re.id) || `card_${R + 1}`,
        ...g
      }, z({ cards: se });
    }
    function A(R) {
      const g = [...J.value];
      g.splice(R, 1), z({ cards: g });
    }
    function ge() {
      const R = [...J.value];
      R.push({
        id: `card_${R.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), z({ cards: R });
    }
    return (R, g) => {
      var se, re, xe, $e;
      return n(), l("section", fl, [
        e("div", yl, [
          g[22] || (g[22] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          s.showReset ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: g[0] || (g[0] = (P) => R.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        g[50] || (g[50] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
        e("div", hl, [
          e("span", kl, b(pe.value), 1),
          e("span", _l, b(I.value), 1),
          e("span", wl, b($.value), 1)
        ]),
        e("div", $l, [
          g[24] || (g[24] = e("label", { class: "kb-label" }, [
            K(" Category (purpose) "),
            e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: c.value.template_category ?? "",
            onChange: g[1] || (g[1] = (P) => be(P.target.value))
          }, [...g[23] || (g[23] = [
            e("option", { value: "" }, "Select category", -1),
            e("option", { value: "marketing" }, "Marketing", -1),
            e("option", { value: "utility" }, "Utility", -1),
            e("option", { value: "authentication" }, "Authentication", -1)
          ])], 40, xl)
        ]),
        e("div", Sl, [
          e("label", Cl, [
            g[25] || (g[25] = K(" Functional format ", -1)),
            e("span", Il, b(F.value), 1)
          ]),
          e("select", {
            class: "kb-select",
            value: w.value,
            onChange: g[2] || (g[2] = (P) => me(P.target.value))
          }, [
            (n(), l(q, null, j(p, (P) => e("option", {
              key: P.value,
              value: P.value
            }, b(P.label), 9, Al)), 64))
          ], 40, Bl)
        ]),
        e("div", Ul, [
          g[26] || (g[26] = e("label", { class: "kb-label" }, [
            K(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: c.value.template_name ?? "",
            onInput: g[3] || (g[3] = (P) => z({
              template_name: P.target.value || void 0
            }))
          }, null, 40, Ll)
        ]),
        e("div", Rl, [
          e("div", Tl, [
            g[27] || (g[27] = e("label", { class: "kb-label" }, [
              K(" Template language "),
              e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. en_US",
              value: c.value.template_language ?? "",
              onInput: g[4] || (g[4] = (P) => z({
                template_language: P.target.value || void 0
              }))
            }, null, 40, Pl)
          ]),
          e("div", { class: "kb-field-half" }, [
            e("div", { class: "kb-meta-card" }, [
              g[28] || (g[28] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
              e("ul", { class: "kb-meta-list" }, [
                e("li", null, "Header text: " + b(Xe) + " chars"),
                e("li", null, "Body: " + b(Qe) + " chars"),
                e("li", null, "Footer: " + b(Ze) + " chars"),
                e("li", null, "Buttons: up to " + b(et))
              ])
            ])
          ])
        ]),
        e("div", Vl, [
          g[30] || (g[30] = e("label", { class: "kb-label" }, [
            K(" Header component (optional) "),
            e("span", { class: "kb-helper" }, "Header can be text or rich media.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: C.value,
            onChange: g[5] || (g[5] = (P) => z({ header_type: P.target.value }))
          }, [...g[29] || (g[29] = [
            Oe('<option value="none" data-v-3e4d670b>No header</option><option value="text" data-v-3e4d670b>Text header</option><option value="image" data-v-3e4d670b>Image header</option><option value="video" data-v-3e4d670b>Video header</option><option value="document" data-v-3e4d670b>Document header</option>', 5)
          ])], 40, El)
        ]),
        C.value === "text" ? (n(), l("div", Ml, [
          e("label", Nl, [
            g[31] || (g[31] = K(" Header text ", -1)),
            e("span", {
              class: he(["kb-counter", { "kb-counter--warn": f.value.length > Xe }])
            }, b(f.value.length) + "/" + b(Xe), 3)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: f.value,
            onInput: g[6] || (g[6] = (P) => z({
              header: P.target.value || void 0
            }))
          }, null, 40, Ol)
        ])) : _("", !0),
        ["image", "video", "document"].includes(C.value) || ["image", "video", "document"].includes(w.value) ? (n(), l("div", Dl, [
          g[32] || (g[32] = e("label", { class: "kb-label" }, [
            K(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: c.value.media_url ?? "",
            onInput: g[7] || (g[7] = (P) => z({
              media_url: P.target.value || void 0
            }))
          }, null, 40, Wl)
        ])) : _("", !0),
        C.value === "document" || w.value === "document" ? (n(), l("div", Hl, [
          g[33] || (g[33] = e("label", { class: "kb-label" }, [
            K(" Document filename "),
            e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. invoice.pdf",
            value: c.value.document_filename ?? "",
            onInput: g[8] || (g[8] = (P) => z({
              document_filename: P.target.value || void 0
            }))
          }, null, 40, zl)
        ])) : _("", !0),
        ["image", "video", "document"].includes(C.value) || ["image", "video", "document"].includes(w.value) ? (n(), l("div", Fl, [
          g[34] || (g[34] = e("label", { class: "kb-label" }, [
            K(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: c.value.media_caption ?? "",
            onInput: g[9] || (g[9] = (P) => z({
              media_caption: P.target.value || void 0
            }))
          }, null, 40, ql)
        ])) : _("", !0),
        w.value === "location" ? (n(), l("div", jl, [
          g[35] || (g[35] = e("label", { class: "kb-label" }, [
            K(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", Kl, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((se = c.value.location) == null ? void 0 : se.lat) ?? "",
              onInput: g[10] || (g[10] = (P) => {
                const X = { ...c.value.location ?? {} };
                X.lat = Number(P.target.value), z({ location: X });
              })
            }, null, 40, Yl),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((re = c.value.location) == null ? void 0 : re.lon) ?? "",
              onInput: g[11] || (g[11] = (P) => {
                const X = { ...c.value.location ?? {} };
                X.lon = Number(P.target.value), z({ location: X });
              })
            }, null, 40, Jl)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((xe = c.value.location) == null ? void 0 : xe.name) ?? "",
            onInput: g[12] || (g[12] = (P) => {
              const X = { ...c.value.location ?? {} };
              X.name = P.target.value || void 0, z({ location: X });
            })
          }, null, 40, Gl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: (($e = c.value.location) == null ? void 0 : $e.address) ?? "",
            onInput: g[13] || (g[13] = (P) => {
              const X = { ...c.value.location ?? {} };
              X.address = P.target.value || void 0, z({ location: X });
            })
          }, null, 40, Xl)
        ])) : _("", !0),
        w.value === "coupon" ? (n(), l("div", Ql, [
          g[36] || (g[36] = e("label", { class: "kb-label" }, [
            K(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: c.value.coupon_code ?? "",
            onInput: g[14] || (g[14] = (P) => z({
              coupon_code: P.target.value || void 0
            }))
          }, null, 40, Zl)
        ])) : _("", !0),
        w.value === "lto" ? (n(), l("div", eo, [
          g[37] || (g[37] = e("label", { class: "kb-label" }, [
            K(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: c.value.lto_expiry ?? "",
            onInput: g[15] || (g[15] = (P) => z({
              lto_expiry: P.target.value || void 0
            }))
          }, null, 40, to)
        ])) : _("", !0),
        w.value === "flow" ? (n(), l("div", ao, [
          g[38] || (g[38] = e("label", { class: "kb-label" }, [
            K(" Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: c.value.flow_id ?? "",
            onInput: g[16] || (g[16] = (P) => z({
              flow_id: P.target.value || void 0
            }))
          }, null, 40, so),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: c.value.flow_cta_label ?? "",
            onInput: g[17] || (g[17] = (P) => z({
              flow_cta_label: P.target.value || void 0
            }))
          }, null, 40, no)
        ])) : _("", !0),
        w.value === "carousel" ? (n(), l("div", lo, [
          e("label", { class: "kb-label" }, [
            g[39] || (g[39] = K(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + b(vt) + " cards.")
          ]),
          e("div", oo, [
            (n(!0), l(q, null, j(J.value, (P, X) => (n(), l("div", {
              key: P.id || X,
              class: "kb-card-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Card title",
                value: P.title ?? "",
                onInput: (G) => le(Number(X), { title: G.target.value })
              }, null, 40, io),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Card media URL",
                value: P.media_url ?? "",
                onInput: (G) => le(Number(X), { media_url: G.target.value })
              }, null, 40, ro),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label",
                value: P.button_label ?? "",
                onInput: (G) => le(Number(X), { button_label: G.target.value })
              }, null, 40, uo),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Button URL",
                value: P.button_url ?? "",
                onInput: (G) => le(Number(X), { button_url: G.target.value })
              }, null, 40, co),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (G) => A(Number(X))
              }, "Remove", 8, po)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: J.value.length >= vt,
              onClick: ge
            }, " Add card ", 8, mo)
          ])
        ])) : _("", !0),
        ["mpm", "catalog"].includes(w.value) ? (n(), l("div", vo, [
          g[40] || (g[40] = e("label", { class: "kb-label" }, [
            K(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", bo, [
            (n(!0), l(q, null, j(N.value, (P, X) => (n(), l("div", {
              key: P.id || X,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: P.productId,
                onInput: (G) => fe(Number(X), { productId: G.target.value })
              }, null, 40, go),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: P.sectionTitle,
                onInput: (G) => fe(Number(X), { sectionTitle: G.target.value || void 0 })
              }, null, 40, fo),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (G) => O(Number(X))
              }, " Remove ", 8, yo)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: ye
            }, " Add product ")
          ])
        ])) : _("", !0),
        w.value === "auth" ? (n(), l("div", ho, [
          g[42] || (g[42] = e("label", { class: "kb-label" }, [
            K(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: c.value.auth_type ?? "otp",
            onChange: g[18] || (g[18] = (P) => z({
              auth_type: P.target.value
            }))
          }, [...g[41] || (g[41] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, ko),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: c.value.auth_label ?? "",
            onInput: g[19] || (g[19] = (P) => z({
              auth_label: P.target.value || void 0
            }))
          }, null, 40, _o)
        ])) : _("", !0),
        e("div", wo, [
          e("label", $o, [
            g[43] || (g[43] = K(" Body ", -1)),
            g[44] || (g[44] = e("span", { class: "kb-helper" }, " Body is required. Use the exact approved text with variables like " + b(1) + ", " + b(2) + ". ", -1)),
            e("span", {
              class: he(["kb-counter", { "kb-counter--warn": E.value.length > Qe }])
            }, b(E.value.length) + "/" + b(Qe), 3)
          ]),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: E.value,
            onInput: g[20] || (g[20] = (P) => z({
              body: P.target.value || void 0
            }))
          }, null, 40, xo)
        ]),
        te.value.length > 0 ? (n(), l("div", So, [
          g[45] || (g[45] = e("label", { class: "kb-label" }, "Template fields", -1)),
          g[46] || (g[46] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", Co, [
            (n(!0), l(q, null, j(te.value, (P) => (n(), l("li", {
              key: P.name,
              class: he(["kb-wa-field-item", { "kb-wa-field-item--ok": P.configured }])
            }, [
              e("span", Io, b(P.name), 1),
              e("span", Bo, b(P.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : _("", !0),
        e("div", Ao, [
          g[47] || (g[47] = e("label", { class: "kb-label" }, [
            K(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: V.value,
            onInput: g[21] || (g[21] = (P) => z({
              footer: P.target.value || void 0
            }))
          }, null, 40, Uo),
          e("div", {
            class: he(["kb-counter kb-counter--inline", { "kb-counter--warn": V.value.length > Ze }])
          }, b(V.value.length) + "/" + b(Ze), 3)
        ]),
        e("div", Lo, [
          e("label", { class: "kb-label" }, [
            g[48] || (g[48] = K(" Buttons (optional) ", -1)),
            e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + b(et) + " buttons. ")
          ]),
          e("div", Ro, [
            (n(!0), l(q, null, j(H.value, (P, X) => (n(), l("div", {
              key: P.id || X,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: P.label,
                onInput: (G) => ve(Number(X), { label: G.target.value })
              }, null, 40, To),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: P.type ?? "quick_reply",
                onChange: (G) => ve(Number(X), { type: G.target.value })
              }, [...g[49] || (g[49] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1),
                e("option", { value: "opt_out" }, "Marketing opt-out", -1)
              ])], 40, Po),
              P.type === "url" ? (n(), l("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: P.url,
                onInput: (G) => ve(Number(X), { url: G.target.value || void 0 })
              }, null, 40, Vo)) : P.type === "call" ? (n(), l("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: P.phone,
                onInput: (G) => ve(Number(X), { phone: G.target.value || void 0 })
              }, null, 40, Eo)) : P.type === "opt_out" ? (n(), l("span", Mo, " Sends a built-in opt-out action. ")) : _("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (G) => ce(Number(X))
              }, " Remove ", 8, No)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: H.value.length >= et,
              onClick: ae
            }, " Add button ", 8, Oo)
          ])
        ])
      ]);
    };
  }
}), Wo = /* @__PURE__ */ we(Do, [["__scopeId", "data-v-3e4d670b"]]), Ho = { class: "wa-preview-root" }, zo = { class: "wa-device" }, Fo = { class: "wa-screen" }, qo = { class: "wa-header" }, jo = { class: "wa-titleblock" }, Ko = { class: "wa-title-row" }, Yo = { class: "wa-title" }, Jo = { class: "wa-subtitle" }, Go = {
  key: 0,
  class: "wa-flow-shell"
}, Xo = { class: "wa-flow-header" }, Qo = { class: "wa-flow-title" }, Zo = { class: "wa-flow-content" }, ei = { class: "wa-flow-eyebrow" }, ti = {
  key: 0,
  class: "wa-flow-products"
}, ai = { class: "wa-flow-footer" }, si = {
  type: "button",
  class: "wa-flow-cta"
}, ni = { class: "wa-managed" }, li = {
  key: 1,
  class: "wa-thread"
}, oi = { class: "wa-secure-banner" }, ii = { class: "wa-msg wa-msg--in" }, ri = { class: "wa-template-card" }, di = {
  key: 0,
  class: "wa-card-media"
}, ui = { class: "wa-card-media-tag" }, ci = { class: "wa-card-media-sub" }, pi = {
  key: 1,
  class: "wa-card-header-text"
}, mi = ["innerHTML"], vi = {
  key: 2,
  class: "wa-inline-note"
}, bi = {
  key: 3,
  class: "wa-inline-note"
}, gi = {
  key: 4,
  class: "wa-inline-note"
}, fi = {
  key: 5,
  class: "wa-inline-note wa-inline-note--warn"
}, yi = {
  key: 6,
  class: "wa-inline-note wa-inline-note--muted"
}, hi = {
  key: 7,
  class: "wa-product-list"
}, ki = { class: "wa-product-name" }, _i = { class: "wa-product-price" }, wi = {
  key: 8,
  type: "button",
  class: "wa-template-cta"
}, $i = {
  key: 9,
  class: "wa-template-actions"
}, xi = { class: "wa-msg wa-msg--out" }, Si = { class: "wa-bubble wa-bubble--out" }, Ci = { class: "wa-bubble-author" }, Ii = { class: "wa-msg wa-msg--in" }, Bi = { class: "wa-bubble wa-bubble--in" }, Ai = /* @__PURE__ */ _e({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(s) {
    const i = s;
    function u(I) {
      return String(I).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = k(() => {
      var T;
      const I = ((T = i.template) == null ? void 0 : T.body) ?? "";
      return u(I).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), p = k(() => i.template.templateName || "Ecoshop"), c = k(() => "Business Account"), w = k(() => i.template.format === "flow" || !!i.template.flow), C = k(() => {
      var I, $, T;
      return (($ = (I = i.template.buttons) == null ? void 0 : I[0]) == null ? void 0 : $.text) || ((T = i.template.flow) == null ? void 0 : T.ctaLabel) || "Continue";
    }), f = k(() => i.template.buttons ?? []), E = k(() => {
      var I;
      return (((I = i.template.multiProduct) == null ? void 0 : I.length) ?? 0) > 0;
    }), V = k(() => (i.template.format || "text").toUpperCase()), H = k(() => {
      const I = i.template.header;
      return !I || I.type === "text" ? "" : I.type === "image" ? I.url || "Image" : I.type === "video" ? I.url || "Video" : I.filename || I.url || "Document";
    }), N = k(() => {
      const I = i.template.header;
      if (!(!I || I.type !== "image" || !I.url))
        return { backgroundImage: `url(${I.url})` };
    }), J = k(() => {
      var $, T, te;
      const I = i.template;
      return I.format === "flow" ? "Thanks, we received your preferences." : ($ = I.auth) != null && $.code ? "Use the verification code and let us know if it works." : (T = I.coupon) != null && T.code ? `Your coupon ${I.coupon.code} is active now.` : I.limitedOffer ? `Great choice. This offer is valid until ${I.limitedOffer}.` : (te = i.template.multiProduct) != null && te.length ? `Here are ${i.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), F = k(() => {
      var $, T;
      const I = i.template;
      return I.location ? I.location.name || I.location.address || `${I.location.lat}, ${I.location.lng}` : ($ = I.auth) != null && $.code ? `Verification code: ${I.auth.code}` : (T = I.flow) != null && T.id ? `Flow ID: ${I.flow.id}` : I.templateLanguage ? `Template language: ${I.templateLanguage}` : `Category: ${I.templateCategory || "utility"} • Format: ${I.format || "text"}`;
    }), pe = k(() => {
      var T, te;
      const I = i.template;
      if ((T = I.multiProduct) != null && T.length) return I.multiProduct.slice(0, 5).map((z) => z.name || "Product");
      if ((te = I.buttons) != null && te.length) return I.buttons.slice(0, 5).map((z) => z.text || "Option");
      const $ = (I.body || "").split(/\n|\.|,/).map((z) => z.trim()).filter(Boolean).slice(0, 5);
      return $.length ? $ : ["Option A", "Option B", "Option C"];
    });
    return (I, $) => {
      var T, te, z, be, me, ve;
      return n(), l("div", Ho, [
        e("div", zo, [
          e("div", Fo, [
            $[20] || ($[20] = Oe('<div class="wa-statusbar" data-v-d96ea1d0><span class="wa-time" data-v-d96ea1d0>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-d96ea1d0><span class="wa-signal" data-v-d96ea1d0></span><span class="wa-wifi" data-v-d96ea1d0></span><span class="wa-battery" data-v-d96ea1d0></span></div></div>', 1)),
            e("div", qo, [
              $[4] || ($[4] = e("span", { class: "wa-back" }, "←", -1)),
              $[5] || ($[5] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", jo, [
                e("div", Ko, [
                  e("span", Yo, b(p.value), 1),
                  $[3] || ($[3] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Jo, b(c.value), 1)
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
            w.value ? (n(), l("div", Go, [
              $[11] || ($[11] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", Xo, [
                $[7] || ($[7] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Qo, b(p.value), 1),
                $[8] || ($[8] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Zo, [
                e("p", ei, b(s.template.body || "Please choose an option below."), 1),
                (n(!0), l(q, null, j(pe.value, (ce, ae) => (n(), l("div", {
                  key: `flow-opt-${ae}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, b(ce), 1),
                  e("span", {
                    class: he(["wa-radio", { "wa-radio--on": ae === 0 }])
                  }, null, 2)
                ]))), 128)),
                (T = s.template.multiProduct) != null && T.length ? (n(), l("div", ti, [
                  (n(!0), l(q, null, j(s.template.multiProduct.slice(0, 3), (ce, ae) => (n(), l("div", {
                    key: ae,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, b(ce.name || "Product"), 1),
                      e("p", null, b(ce.price || "Price on request"), 1)
                    ]),
                    $[9] || ($[9] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : _("", !0)
              ]),
              e("div", ai, [
                e("button", si, b(C.value), 1),
                e("p", ni, [
                  $[10] || ($[10] = K("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: $[0] || ($[0] = Je(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (n(), l("div", li, [
              $[19] || ($[19] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", oi, [
                $[12] || ($[12] = e("span", null, "●", -1)),
                $[13] || ($[13] = K(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: $[1] || ($[1] = Je(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", ii, [
                e("div", ri, [
                  s.template.header && s.template.header.type !== "text" ? (n(), l("div", di, [
                    e("div", ui, b(V.value) + " TEMPLATE", 1),
                    e("div", ci, b(H.value), 1),
                    N.value ? (n(), l("div", {
                      key: 0,
                      class: "wa-card-media-image",
                      style: ie(N.value)
                    }, null, 4)) : _("", !0)
                  ])) : (te = s.template.header) != null && te.text ? (n(), l("div", pi, b(s.template.header.text), 1)) : _("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: m.value
                  }, null, 8, mi),
                  s.template.location ? (n(), l("div", vi, " 📍 " + b(s.template.location.name || s.template.location.address || `${s.template.location.lat}, ${s.template.location.lng}`), 1)) : _("", !0),
                  (z = s.template.coupon) != null && z.code ? (n(), l("div", bi, [
                    $[14] || ($[14] = K(" Coupon: ", -1)),
                    e("strong", null, b(s.template.coupon.code), 1)
                  ])) : _("", !0),
                  (be = s.template.auth) != null && be.code ? (n(), l("div", gi, [
                    $[15] || ($[15] = K(" Verification code: ", -1)),
                    e("strong", null, b(s.template.auth.code), 1)
                  ])) : _("", !0),
                  s.template.limitedOffer ? (n(), l("div", fi, " Expires: " + b(s.template.limitedOffer), 1)) : _("", !0),
                  s.template.footer ? (n(), l("div", yi, b(s.template.footer), 1)) : _("", !0),
                  E.value ? (n(), l("div", hi, [
                    (n(!0), l(q, null, j((me = s.template.multiProduct) == null ? void 0 : me.slice(0, 4), (ce, ae) => (n(), l("div", {
                      key: `prod-${ae}`,
                      class: "wa-product-row"
                    }, [
                      e("span", ki, b(ce.name || `Item ${ae + 1}`), 1),
                      e("span", _i, b(ce.price || "-"), 1)
                    ]))), 128))
                  ])) : _("", !0),
                  C.value ? (n(), l("button", wi, b(C.value), 1)) : _("", !0),
                  f.value.length > 1 ? (n(), l("div", $i, [
                    (n(!0), l(q, null, j(f.value.slice(1, 4), (ce, ae) => (n(), l("button", {
                      key: `action-${ae}`,
                      type: "button",
                      class: "wa-template-action"
                    }, b(ce.text), 1))), 128))
                  ])) : _("", !0),
                  $[16] || ($[16] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ]),
              e("div", xi, [
                e("div", Si, [
                  e("span", Ci, b(p.value), 1),
                  e("p", null, b(J.value), 1),
                  $[17] || ($[17] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ]),
              e("div", Ii, [
                e("div", Bi, [
                  e("p", null, b(F.value), 1),
                  (ve = s.template.flow) != null && ve.id ? (n(), l("a", {
                    key: 0,
                    href: "#",
                    onClick: $[2] || ($[2] = Je(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + b(s.template.flow.id), 1)) : _("", !0),
                  $[18] || ($[18] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            $[21] || ($[21] = Oe('<div class="wa-inputbar" data-v-d96ea1d0><span class="wa-input-icon wa-input-icon--emoji" data-v-d96ea1d0></span><span class="wa-input-placeholder" data-v-d96ea1d0>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-d96ea1d0></span><span class="wa-input-icon wa-input-icon--camera" data-v-d96ea1d0></span><button type="button" class="wa-mic" data-v-d96ea1d0><span class="wa-input-icon wa-input-icon--mic" data-v-d96ea1d0></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), Ui = /* @__PURE__ */ we(Ai, [["__scopeId", "data-v-d96ea1d0"]]), Li = { class: "keos-whatsapp-builder" }, Ri = { class: "kb-builder-top" }, Ti = { style: { margin: 0, paddingLeft: "1.25rem" } }, Pi = { class: "kb-wa-layout" }, Vi = { class: "kb-wa-sidebar" }, Ei = {
  key: 0,
  class: "kb-wa-form"
}, Mi = { class: "kb-wa-form-head" }, Ni = { class: "kb-wa-form-head-top" }, Oi = { class: "kb-wa-health-pill" }, Di = { class: "kb-wa-form-head-row" }, Wi = ["value"], Hi = { class: "kb-wa-health" }, zi = { class: "kb-wa-health-row" }, Fi = { class: "kb-wa-health-value" }, qi = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, ji = { class: "kb-wa-canvas" }, Ki = {
  key: 0,
  class: "kb-wa-test-banner"
}, Yi = { class: "kb-wa-preview-chrome" }, Ji = { class: "kb-push-preview-controls" }, Gi = { class: "kb-push-preview-as" }, Xi = ["value"], Qi = { class: "kb-preview-status" }, Zi = { class: "kb-wa-actions" }, er = {
  key: 0,
  class: "kb-actions-note"
}, tr = { class: "kb-wa-actions-right" }, ar = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, sr = { class: "kb-confirm-dialog" }, nr = { class: "kb-confirm-actions" }, bt = 60, gt = 1024, ft = 60, yt = 10, ht = 10, lr = /* @__PURE__ */ _e({
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
  setup(s, { emit: i }) {
    function u(S) {
      var Ce, ne, y, r, B;
      const L = [], M = S.message, de = (M.template_category ?? "").toString().trim(), ue = (M.template_type ?? "text").toString(), W = (M.header_type ?? "none").toString(), D = (M.header ?? "").toString(), Q = (M.body ?? "").toString(), ke = (M.footer ?? "").toString(), Se = Array.isArray(M.buttons) ? M.buttons : [], Ue = Array.isArray(M.cards) ? M.cards : [];
      return (Ce = S.name) != null && Ce.trim() || L.push("Template name is required"), (ne = M.template_name) != null && ne.trim() || L.push("WhatsApp template name is required"), de || L.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), Q.trim() || L.push("Body is required"), W === "text" && D.length > bt && L.push(`Header text cannot exceed ${bt} characters`), Q.length > gt && L.push(`Body cannot exceed ${gt} characters`), ke.length > ft && L.push(`Footer cannot exceed ${ft} characters`), Se.length > yt && L.push(`Buttons cannot exceed ${yt}`), (ue === "image" || ue === "video" || ue === "document" || W === "image" || W === "video" || W === "document") && !M.media_url && L.push("Media URL is required for rich media templates"), de === "authentication" && ue !== "auth" && L.push("Authentication category must use Authentication format"), ue === "auth" && !((y = M.auth_label) != null && y.trim()) && !Q.includes("{{") && L.push("Authentication templates should include a code label or placeholder variable"), ue === "lto" && !M.lto_expiry && L.push("Limited-time offer requires an expiry"), (ue === "mpm" || ue === "catalog") && !((r = M.products) != null && r.length) && L.push("Catalog and multi-product templates require at least one product"), ue === "flow" && !((B = M.flow_id) != null && B.trim()) && L.push("WhatsApp Flow format requires a flow ID"), ue === "carousel" && (Ue.length ? Ue.length > ht && L.push(`Carousel supports up to ${ht} cards`) : L.push("Carousel format requires at least one card")), L;
    }
    const m = s, p = i, {
      campaign: c,
      dirty: w,
      customValidatorErrors: C,
      getValidationWithWarnings: f,
      update: E,
      updateMessage: V,
      undo: H,
      redo: N,
      canUndo: J,
      canRedo: F,
      resetMessage: pe,
      hooks: I
    } = qe({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (S) => {
          var de;
          const L = u(S), M = (de = m.hooks) != null && de.customValidators ? await m.hooks.customValidators(S) : [];
          return [...L, ...M];
        }
      },
      onDirty: () => p("change", c.value)
    }), { lastSavedAt: $ } = je(c, { channel: "whatsapp" });
    function T(S) {
      (S.metaKey || S.ctrlKey) && S.key === "z" && (S.preventDefault(), S.shiftKey ? N() : H());
    }
    We(() => {
      window.addEventListener("keydown", T);
    }), He(() => {
      window.removeEventListener("keydown", T);
    }), Be(c, (S) => p("update:modelValue", S), { deep: !0 });
    const te = ee(), z = ee(!0);
    async function be() {
      if (I.estimateReach)
        try {
          te.value = await I.estimateReach(c.value.audience);
        } catch {
          te.value = void 0;
        }
      I.canSend && (z.value = await Promise.resolve(I.canSend()));
    }
    be(), Be(() => c.value.audience, be, { deep: !0 });
    const me = k(() => (C.value, f(te.value))), ve = k(() => me.value.blockingErrors), ce = k(() => me.value.warnings), ae = k(() => me.value.valid), fe = k(() => {
      var de, ue, W;
      const S = c.value.message, L = [
        !!((de = S.template_name) != null && de.trim()),
        !!((ue = S.template_category) != null && ue.trim()),
        !!(S.body ?? "").toString().trim(),
        !!((W = S.template_language) != null && W.trim()),
        Array.isArray(S.buttons) ? S.buttons.length > 0 : !1
      ], M = L.filter(Boolean).length;
      return Math.round(M / L.length * 100);
    }), O = k(() => fe.value >= 90 ? "Production ready" : fe.value >= 70 ? "Strong draft" : fe.value >= 40 ? "In progress" : "Needs setup"), ye = k(() => {
      const S = c.value.message;
      return !!((S.body ?? "").toString().trim() || (S.header ?? "").toString().trim() || S.media_url || S.flow_id || S.coupon_code || S.lto_expiry || Array.isArray(S.buttons) && S.buttons.length || Array.isArray(S.products) && S.products.length || Array.isArray(S.cards) && S.cards.length);
    }), le = ee(""), A = ee(!1), ge = ee(null), R = k(() => {
      const S = le.value;
      return S ? Ne.find((L) => L.id === S) ?? null : null;
    }), g = k(() => {
      const S = c.value.message.body ?? "";
      return R.value ? Ee(S, R.value.data) : S;
    }), se = k(() => {
      const S = c.value.message.header ?? "";
      return R.value ? Ee(S, R.value.data) : S;
    }), re = k(() => {
      const S = c.value.message, L = S.template_type ?? "text", M = S.header_type ?? "none";
      let de, ue, W, D, Q, ke, Se;
      (L === "image" || M === "image") && S.media_url ? de = { type: "image", url: S.media_url } : (L === "video" || M === "video") && S.media_url ? de = { type: "video", url: S.media_url } : L === "document" || M === "document" ? de = {
        type: "document",
        filename: S.document_filename || S.media_url || "document.pdf"
      } : M === "text" && S.header ? de = { type: "text", text: se.value } : S.header && (de = { type: "text", text: se.value });
      const Ue = g.value || "Start adding content to see a live preview here.";
      if (L === "location" && S.location) {
        const ne = S.location, y = ne.lat ?? ne.latitude, r = ne.lng ?? ne.lon ?? ne.longitude;
        y != null && r != null && (ue = {
          lat: y,
          lng: r,
          name: ne.name ?? ne.title,
          address: ne.address ?? `${y}, ${r}`
        });
      }
      (L === "catalog" || L === "mpm") && Array.isArray(S.products) && S.products.length && (W = !0, D = S.products.map((ne) => ({
        image: ne.image ?? ne.imageUrl,
        name: ne.name ?? ne.sectionTitle ?? ne.title ?? "Product",
        price: ne.price ?? ne.productId ?? ""
      }))), L === "carousel" && Array.isArray(S.cards) && S.cards.length && (W = !0, D = S.cards.map((ne) => ({
        image: ne.image ?? ne.media_url,
        name: ne.title ?? "Card",
        price: ne.button_label ?? ""
      }))), L === "coupon" && S.coupon_code && (Q = { code: S.coupon_code }), L === "lto" && S.lto_expiry && (ke = S.lto_expiry), L === "auth" && (Se = { code: S.auth_code ?? S.otp_code ?? "123 456" });
      const Ce = S.buttons ?? [];
      return L === "flow" && Ce.push({
        label: S.flow_cta_label ?? "Open flow"
      }), {
        format: L,
        templateName: S.template_name || void 0,
        templateLanguage: S.template_language || void 0,
        templateCategory: S.template_category || void 0,
        header: de,
        body: Ue,
        mediaCaption: S.media_caption || void 0,
        footer: S.footer || void 0,
        buttons: Ce.map((ne) => ({ text: ne.label || "Button" })),
        location: ue,
        catalog: W,
        multiProduct: D,
        coupon: Q,
        limitedOffer: ke,
        auth: Se,
        flow: L === "flow" ? {
          id: S.flow_id || void 0,
          ctaLabel: S.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function xe(S) {
      const L = c.value, M = S.campaign.message ? { ...L.message, ...S.campaign.message } : L.message;
      E({
        ...S.campaign,
        message: M
      }), ge.value = null, A.value = !1;
    }
    function $e(S) {
      const L = S.target.value;
      if (!L) return;
      const M = ct.find((de) => de.id === L);
      M && (w.value ? (ge.value = M, A.value = !0) : xe(M), S.target.value = "");
    }
    function P(S) {
      E({
        name: S,
        tracking: { ...c.value.tracking ?? {}, campaign_name: S }
      });
    }
    function X(S) {
      const L = ` {{ ${S.variable} }}`, M = c.value.message.variables ?? [], de = Array.from(/* @__PURE__ */ new Set([...M, S.variable]));
      if (S.field === "title") {
        const ue = c.value.message.header ?? "";
        V({
          variables: de,
          header: ue + L
        });
      } else {
        const ue = c.value.message.body ?? "";
        V({
          variables: de,
          body: ue + L
        });
      }
    }
    function G() {
      ae.value && p("save", c.value);
    }
    return (S, L) => (n(), l("div", Li, [
      e("div", Ri, [
        Ie(Ke, {
          "campaign-name": d(c).name,
          status: d(c).status,
          dirty: d(w),
          "last-saved-at": d($),
          "can-undo": d(J),
          "can-redo": d(F),
          "slugify-name": m.enforceSlugName,
          "onUpdate:campaignName": P,
          onUndo: d(H),
          onRedo: d(N)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (n(), l("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(oe).dangerBg,
            border: `1px solid ${d(oe).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[12]}px ${d(Y)[16]}px`,
            marginBottom: `${d(Y)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(oe).danger })
          }, [
            (n(!0), l(q, null, j(ve.value, (M) => (n(), l("li", {
              key: M.message
            }, b(M.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        ce.value.length > 0 ? (n(), l("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(oe).neutral.bg,
            border: `1px solid ${d(oe).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[12]}px ${d(Y)[16]}px`,
            marginBottom: `${d(Y)[16]}px`,
            fontSize: "0.875rem",
            color: d(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(Y)[4]}px` })
          }, "Warnings", 4),
          e("ul", Ti, [
            (n(!0), l(q, null, j(ce.value, (M) => (n(), l("li", {
              key: M.message
            }, b(M.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Pi, [
        e("aside", Vi, [
          s.disabledSections.includes("whatsapp") ? _("", !0) : (n(), l("div", Ei, [
            e("div", Mi, [
              e("div", Ni, [
                L[6] || (L[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                e("span", Oi, b(O.value), 1)
              ]),
              e("div", Di, [
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: $e
                }, [
                  L[7] || (L[7] = e("option", { value: "" }, "Presets…", -1)),
                  (n(!0), l(q, null, j(d(ct), (M) => (n(), l("option", {
                    key: M.id,
                    value: M.id
                  }, b(M.label), 9, Wi))), 128))
                ], 32)
              ]),
              e("div", Hi, [
                e("div", zi, [
                  L[8] || (L[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                  e("span", Fi, b(fe.value) + "%", 1)
                ]),
                e("div", qi, [
                  e("span", {
                    class: "kb-wa-health-fill",
                    style: ie({ width: `${fe.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(Wo, {
              message: d(c).message,
              "show-reset": !0,
              onUpdate: d(V),
              onReset: L[0] || (L[0] = (M) => d(pe)())
            }, null, 8, ["message", "onUpdate"]),
            Ie(At, {
              message: d(c).message,
              "variable-options": s.variableOptions,
              onUpdate: d(V),
              onInsertVariable: X
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", ji, [
          !s.designOnly && d(c).audience.test_mode ? (n(), l("div", Ki, [...L[9] || (L[9] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            K(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Yi, [
            e("div", Ji, [
              e("label", Gi, [
                L[11] || (L[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": L[1] || (L[1] = (M) => le.value = M),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  L[10] || (L[10] = e("option", { value: "" }, "No substitution", -1)),
                  (n(!0), l(q, null, j(d(Ne), (M) => (n(), l("option", {
                    key: M.id,
                    value: M.id
                  }, b(M.label), 9, Xi))), 128))
                ], 512), [
                  [De, le.value]
                ])
              ]),
              e("div", Qi, [
                L[12] || (L[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, b(d(c).message.template_type || "text"), 1)
              ])
            ]),
            e("div", {
              class: he(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !ye.value }])
            }, [
              Ie(Ui, { template: re.value }, null, 8, ["template"])
            ], 2)
          ])
        ])
      ]),
      e("footer", Zi, [
        m.actionsNote ? (n(), l("div", er, b(m.actionsNote), 1)) : _("", !0),
        e("div", tr, [
          s.showDuplicate ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: L[2] || (L[2] = (M) => p("duplicate", JSON.parse(JSON.stringify(d(c)))))
          }, " Duplicate ")) : _("", !0),
          s.showSave ? (n(), l("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: G
          }, " Save ")) : _("", !0),
          s.showClose ? (n(), l("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: L[3] || (L[3] = (M) => p("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      A.value ? (n(), l("div", ar, [
        e("div", sr, [
          L[13] || (L[13] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          L[14] || (L[14] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", nr, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: L[4] || (L[4] = (M) => {
                A.value = !1, ge.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: L[5] || (L[5] = (M) => ge.value && xe(ge.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), Rt = /* @__PURE__ */ we(lr, [["__scopeId", "data-v-c14a61fc"]]), or = { class: "kb-section" }, ir = { class: "kb-section__head" }, rr = { class: "kb-field" }, dr = ["value"], ur = { class: "kb-field" }, cr = { class: "kb-label" }, pr = { key: 0 }, mr = { key: 1 }, vr = { key: 2 }, br = ["value"], gr = {
  key: 0,
  class: "kb-truncation-hint"
}, fr = { class: "kb-field" }, yr = { class: "kb-insert-row" }, hr = ["value"], kr = { class: "kb-field" }, _r = { class: "kb-insert-row" }, wr = /* @__PURE__ */ _e({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: i }) {
    const u = s, m = i, p = ["first_name", "last_name", "order_id", "city"], c = ee(u.variableOptions && u.variableOptions.length ? [...u.variableOptions] : p), w = ee(c.value[0] ?? p[0]), C = ee("");
    Be(
      () => u.variableOptions,
      (I) => {
        I && I.length && (c.value = [...I], c.value.includes(w.value) || (w.value = c.value[0]));
      }
    );
    const f = k(() => u.message.body ?? ""), E = k(() => f.value.length), V = k(() => E.value ? E.value <= 160 ? 1 : Math.ceil(E.value / 153) : 0), H = k(() => {
      const I = E.value;
      return I <= 160 ? null : I <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function N(I) {
      const $ = I.target.value;
      m("update", {
        sender_id: $ || void 0
      });
    }
    function J(I) {
      const $ = I.target.value;
      m("update", {
        body: $
      });
    }
    function F() {
      const I = w.value;
      if (!I) return;
      const $ = ` {{ ${I} }}`, T = f.value || "", te = u.message.variables ?? [], z = Array.from(/* @__PURE__ */ new Set([...te, I]));
      m("update", {
        body: T + $,
        variables: z
      });
    }
    function pe() {
      const I = C.value.trim();
      I && (c.value.includes(I) || (c.value = [...c.value, I]), w.value = I, C.value = "");
    }
    return (I, $) => (n(), l("section", or, [
      e("div", ir, [
        $[3] || ($[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        s.showReset ? (n(), l("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: $[0] || ($[0] = (T) => I.$emit("reset"))
        }, " Reset section ")) : _("", !0)
      ]),
      $[10] || ($[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", rr, [
        $[4] || ($[4] = e("label", { class: "kb-label" }, [
          K(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: u.message.sender_id ?? "",
          onInput: N
        }, null, 40, dr)
      ]),
      e("div", ur, [
        e("label", cr, [
          $[5] || ($[5] = K(" Message body ", -1)),
          e("span", {
            class: he(["kb-counter", { "kb-counter--warn": V.value > 3 }])
          }, [
            K(b(E.value) + " chars · ", 1),
            V.value === 0 ? (n(), l("span", pr, "0 segments")) : V.value === 1 ? (n(), l("span", mr, "1 segment")) : (n(), l("span", vr, b(V.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: f.value,
          onInput: J
        }, null, 40, br),
        $[6] || ($[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        H.value ? (n(), l("p", gr, b(H.value), 1)) : _("", !0)
      ]),
      e("div", fr, [
        $[7] || ($[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", yr, [
          Pe(e("select", {
            "onUpdate:modelValue": $[1] || ($[1] = (T) => w.value = T),
            class: "kb-select"
          }, [
            (n(!0), l(q, null, j(c.value, (T) => (n(), l("option", {
              key: T,
              value: T
            }, b(T), 9, hr))), 128))
          ], 512), [
            [De, w.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: F
          }, " Insert into message ")
        ]),
        $[8] || ($[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", kr, [
        $[9] || ($[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", _r, [
          Pe(e("input", {
            "onUpdate:modelValue": $[2] || ($[2] = (T) => C.value = T),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [tt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: pe
          }, " Add ")
        ])
      ])
    ]));
  }
}), $r = /* @__PURE__ */ we(wr, [["__scopeId", "data-v-5e9aa8e6"]]), xr = { class: "keos-sms-builder" }, Sr = { class: "kb-builder-top" }, Cr = { style: { margin: 0, paddingLeft: "1.25rem" } }, Ir = { class: "kb-sms-layout" }, Br = { class: "kb-sms-sidebar" }, Ar = {
  key: 0,
  class: "kb-sms-form"
}, Ur = { class: "kb-sms-form-head" }, Lr = { class: "kb-sms-form-head-top" }, Rr = { class: "kb-sms-health-pill" }, Tr = { class: "kb-wa-form-head-row" }, Pr = ["value"], Vr = { class: "kb-sms-health" }, Er = { class: "kb-sms-health-row" }, Mr = { class: "kb-sms-health-value" }, Nr = { class: "kb-sms-health-bar" }, Or = { class: "kb-sms-canvas" }, Dr = {
  key: 0,
  class: "kb-sms-test-banner"
}, Wr = { class: "kb-sms-preview-chrome" }, Hr = { class: "kb-push-preview-controls" }, zr = { class: "kb-push-preview-as" }, Fr = ["value"], qr = { class: "kb-preview-status" }, jr = { class: "kb-preview" }, Kr = { class: "kb-sms-preview" }, Yr = { class: "kb-sms-phone" }, Jr = { class: "kb-sms-header" }, Gr = { class: "kb-sms-sender" }, Xr = { class: "kb-sms-thread" }, Qr = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, Zr = { class: "kb-sms-text" }, ed = { class: "kb-sms-counter" }, td = { key: 0 }, ad = { key: 1 }, sd = { key: 2 }, nd = {
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
  setup(s, { emit: i }) {
    const u = s, m = i, {
      campaign: p,
      dirty: c,
      customValidatorErrors: w,
      getValidationWithWarnings: C,
      update: f,
      updateMessage: E,
      undo: V,
      redo: H,
      canUndo: N,
      canRedo: J,
      resetMessage: F,
      hooks: pe
    } = qe({
      initial: u.modelValue,
      hooks: {
        ...u.hooks,
        customValidators: async (W) => {
          var ke, Se;
          const D = [];
          (ke = W.name) != null && ke.trim() || D.push("Template name is required");
          const Q = (Se = u.hooks) != null && Se.customValidators ? await u.hooks.customValidators(W) : [];
          return [...D, ...Q];
        }
      },
      onDirty: () => m("change", p.value)
    }), { lastSavedAt: I } = je(p, { channel: "sms" });
    function $(W) {
      (W.metaKey || W.ctrlKey) && W.key === "z" && (W.preventDefault(), W.shiftKey ? H() : V());
    }
    We(() => {
      window.addEventListener("keydown", $);
    }), He(() => {
      window.removeEventListener("keydown", $);
    }), Be(p, (W) => m("update:modelValue", W), { deep: !0 });
    const T = ee(), te = ee(!0);
    async function z() {
      if (pe.estimateReach)
        try {
          T.value = await pe.estimateReach(p.value.audience);
        } catch {
          T.value = void 0;
        }
      pe.canSend && (te.value = await Promise.resolve(pe.canSend()));
    }
    z(), Be(() => p.value.audience, z, { deep: !0 });
    const be = k(() => (w.value, C(T.value))), me = k(() => be.value.blockingErrors), ve = k(() => be.value.warnings), ce = k(() => be.value.valid), ae = k(() => {
      var ke, Se, Ue;
      const W = p.value.message, D = [
        !!((ke = p.value.name) != null && ke.trim()),
        !!((Se = W.body) != null && Se.trim()),
        !!((Ue = W.sender_id) != null && Ue.trim()),
        !!p.value.template_type,
        (W.body ?? "").length > 20
      ], Q = D.filter(Boolean).length;
      return Math.round(Q / D.length * 100);
    }), fe = k(() => ae.value >= 90 ? "Production ready" : ae.value >= 70 ? "Strong draft" : ae.value >= 40 ? "In progress" : "Needs setup"), O = k(() => !!P.value.trim()), ye = k(
      () => p.value.template_type ?? "transactional"
    ), le = ee(""), A = ee(!1), ge = ee(null), R = k(() => {
      const W = le.value;
      return W ? Ne.find((D) => D.id === W) ?? null : null;
    }), g = k(() => {
      const W = P.value;
      return R.value ? Ee(W, R.value.data) : W;
    });
    function se(W) {
      const D = p.value, Q = W.campaign.message ? { ...D.message, ...W.campaign.message } : D.message;
      f({
        ...W.campaign,
        message: Q
      }), ge.value = null, A.value = !1;
    }
    function re(W) {
      const D = W.target.value;
      if (!D) return;
      const Q = pt.find((ke) => ke.id === D);
      Q && (c.value ? (ge.value = Q, A.value = !0) : se(Q), W.target.value = "");
    }
    function xe(W) {
      f({ template_type: W });
    }
    function $e(W) {
      f({
        name: W,
        tracking: { ...p.value.tracking ?? {}, campaign_name: W }
      });
    }
    const P = k(
      () => (p.value.message.body ?? "") || ""
    ), X = k(() => P.value.length), G = k(() => X.value ? X.value <= 160 ? 1 : Math.ceil(X.value / 153) : 0), S = k(() => {
      const W = g.value;
      return W.trim().length ? W : "Your SMS message preview will appear here.";
    }), L = k(() => {
      const W = u.costPerSegment ?? 0;
      return !W || G.value === 0 ? null : (G.value * W).toFixed(2);
    }), M = k(() => {
      const W = X.value;
      return W <= 160 ? null : W <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), de = k(
      () => p.value.message.sender_id ?? "YourBrand"
    );
    function ue() {
      ce.value && m("save", p.value);
    }
    return (W, D) => (n(), l("div", xr, [
      e("div", Sr, [
        Ie(Ke, {
          "campaign-name": d(p).name,
          status: d(p).status,
          dirty: d(c),
          "last-saved-at": d(I),
          "can-undo": d(N),
          "can-redo": d(J),
          "slugify-name": u.enforceSlugName,
          "onUpdate:campaignName": $e,
          onUndo: d(V),
          onRedo: d(H)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        me.value.length > 0 ? (n(), l("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(oe).dangerBg,
            border: `1px solid ${d(oe).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[12]}px ${d(Y)[16]}px`,
            marginBottom: `${d(Y)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(oe).danger })
          }, [
            (n(!0), l(q, null, j(me.value, (Q) => (n(), l("li", {
              key: Q.message
            }, b(Q.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        ve.value.length > 0 ? (n(), l("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(oe).neutral.bg,
            border: `1px solid ${d(oe).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[12]}px ${d(Y)[16]}px`,
            marginBottom: `${d(Y)[16]}px`,
            fontSize: "0.875rem",
            color: d(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(Y)[4]}px` })
          }, "Warnings", 4),
          e("ul", Cr, [
            (n(!0), l(q, null, j(ve.value, (Q) => (n(), l("li", {
              key: Q.message
            }, b(Q.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Ir, [
        e("aside", Br, [
          s.disabledSections.includes("sms") ? _("", !0) : (n(), l("div", Ar, [
            e("div", Ur, [
              e("div", Lr, [
                D[6] || (D[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                e("span", Rr, b(fe.value), 1)
              ]),
              e("div", Tr, [
                Ie(ot, {
                  "template-type": ye.value,
                  onUpdate: xe
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: re
                }, [
                  D[7] || (D[7] = e("option", { value: "" }, "Presets…", -1)),
                  (n(!0), l(q, null, j(d(pt), (Q) => (n(), l("option", {
                    key: Q.id,
                    value: Q.id
                  }, b(Q.label), 9, Pr))), 128))
                ], 32)
              ]),
              e("div", Vr, [
                e("div", Er, [
                  D[8] || (D[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                  e("span", Mr, b(ae.value) + "%", 1)
                ]),
                e("div", Nr, [
                  e("span", {
                    class: "kb-sms-health-fill",
                    style: ie({ width: `${ae.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie($r, {
              message: d(p).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: d(E),
              onReset: D[0] || (D[0] = (Q) => d(F)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Or, [
          !s.designOnly && d(p).audience.test_mode ? (n(), l("div", Dr, [...D[9] || (D[9] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            K(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Wr, [
            e("div", Hr, [
              e("label", zr, [
                D[11] || (D[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": D[1] || (D[1] = (Q) => le.value = Q),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  D[10] || (D[10] = e("option", { value: "" }, "No substitution", -1)),
                  (n(!0), l(q, null, j(d(Ne), (Q) => (n(), l("option", {
                    key: Q.id,
                    value: Q.id
                  }, b(Q.label), 9, Fr))), 128))
                ], 512), [
                  [De, le.value]
                ])
              ]),
              e("div", qr, [
                D[12] || (D[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                e("strong", null, b(G.value || 0), 1)
              ])
            ]),
            e("div", {
              class: he(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !O.value }])
            }, [
              e("div", jr, [
                e("div", Kr, [
                  e("div", Yr, [
                    D[15] || (D[15] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", Jr, [
                      e("div", Gr, b(de.value), 1),
                      D[13] || (D[13] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", Xr, [
                      e("div", Qr, [
                        e("span", Zr, b(S.value), 1),
                        D[14] || (D[14] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", ed, [
                    K(b(X.value) + " characters · ", 1),
                    G.value === 0 ? (n(), l("span", td, "0 segments")) : G.value === 1 ? (n(), l("span", ad, "1 segment")) : (n(), l("span", sd, b(G.value) + " segments", 1)),
                    D[16] || (D[16] = K(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    L.value !== null ? (n(), l("span", nd, " · Est. " + b(L.value), 1)) : _("", !0)
                  ]),
                  M.value ? (n(), l("p", ld, b(M.value), 1)) : _("", !0)
                ])
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", od, [
        u.actionsNote ? (n(), l("div", id, b(u.actionsNote), 1)) : _("", !0),
        e("div", rd, [
          s.showDuplicate ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: D[2] || (D[2] = (Q) => m("duplicate", JSON.parse(JSON.stringify(d(p)))))
          }, " Duplicate ")) : _("", !0),
          s.showSave ? (n(), l("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: ue
          }, " Save ")) : _("", !0),
          s.showClose ? (n(), l("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: D[3] || (D[3] = (Q) => m("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      A.value ? (n(), l("div", dd, [
        e("div", ud, [
          D[17] || (D[17] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          D[18] || (D[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", cd, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: D[4] || (D[4] = (Q) => {
                A.value = !1, ge.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: D[5] || (D[5] = (Q) => ge.value && se(ge.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), Tt = /* @__PURE__ */ we(pd, [["__scopeId", "data-v-5bee28f3"]]), md = 30, vd = 60, bd = 130;
function gd(s) {
  const i = (s ?? "").trim().length;
  return i < md ? "too_short" : i <= vd ? "good" : "too_long";
}
function fd(s) {
  const i = (s ?? "").trim().length;
  return i === 0 ? "too_short" : i <= bd ? "good" : "too_long";
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
function kt(s) {
  if (!s || typeof s != "string") return [];
  const i = [];
  for (const u of yd) {
    const m = s.match(u);
    m && i.push(m[0]);
  }
  return i;
}
function hd(s) {
  switch (s) {
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
function kd(s) {
  switch (s) {
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
const _d = { class: "em-section" }, wd = { class: "em-strip" }, $d = { class: "em-strip-head" }, xd = { class: "em-field" }, Sd = ["value"], Cd = { class: "em-field" }, Id = ["value"], Bd = { class: "em-field" }, Ad = ["value"], Ud = { class: "em-field" }, Ld = { class: "em-input-group" }, Rd = ["value"], Td = {
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
}, Bu = ["value", "onChange"], Au = ["value", "onInput"], Uu = ["onClick"], Lu = {
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
}, Ac = ["value", "onInput"], Uc = ["value", "onInput"], Lc = {
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
}, Zc = ["value", "onChange"], ep = { class: "em-check-row" }, tp = ["checked", "onChange"], ap = { class: "em-add-bar" }, sp = { class: "em-add-bar-btns" }, np = { class: "em-strip em-strip--personalize" }, lp = { class: "em-field" }, op = { class: "em-input-group" }, ip = ["value"], rp = { class: "em-field" }, dp = { class: "em-input-group" }, Te = "{{ var }}", up = /* @__PURE__ */ _e({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: i }) {
    var B;
    function u() {
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
    function c(v) {
      switch (v) {
        case "heading":
          return { id: u(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: u(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization.", alignment: "left", fullWidth: !1 };
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
          return { id: u(), type: "social", links: m.map((a) => ({ ...a })), alignment: "center", fullWidth: !1 };
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
            leftContent: "Left column text or {{ variable }}.",
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
const example = {{ order_id }};`,
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
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: u(), type: "paragraph", content: "" };
      }
    }
    const w = s, C = i, f = ["first_name", "last_name", "order_id", "city", "email"], E = ee(
      (B = w.variableOptions) != null && B.length ? [...w.variableOptions] : f
    ), V = ee(E.value[0] ?? "first_name"), H = ee("");
    Be(
      () => w.variableOptions,
      (v) => {
        v != null && v.length && (E.value = [...v], E.value.includes(V.value) || (V.value = E.value[0]));
      }
    );
    const N = k(() => w.message.subject ?? ""), J = k(() => w.message.preview_text ?? ""), F = k(() => gd(N.value)), pe = k(() => fd(J.value)), I = k(() => kt(N.value)), $ = k(() => kt(J.value)), T = k(() => {
      const v = w.message.blocks;
      return Array.isArray(v) && v.length > 0 ? v : [c("paragraph")];
    });
    Be(
      () => w.message.blocks,
      (v) => {
        (!Array.isArray(v) || v.length === 0) && C("update", { blocks: [c("paragraph")] });
      },
      { immediate: !0 }
    );
    function te(v) {
      C("update", { blocks: v });
    }
    function z(v) {
      C("update", { subject: v.target.value });
    }
    function be(v) {
      const a = v.target.value;
      C("update", { preview_text: a || void 0 });
    }
    function me(v) {
      C("update", { from_name: v.target.value || void 0 });
    }
    function ve(v) {
      C("update", { from_address: v.target.value || void 0 });
    }
    function ce(v) {
      C("update", { reply_to: v.target.value || void 0 });
    }
    const ae = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [c("heading"), c("paragraph"), c("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [c("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [c("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [c("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [c("social"), c("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [c("footer"), c("link_list")]
      }
    ];
    function fe(v) {
      const a = v.blocks();
      te([...T.value, ...a]);
    }
    function O(v) {
      const a = [...T.value, c(v)];
      te(a);
    }
    function ye(v) {
      te(T.value.filter((a) => a.id !== v));
    }
    function le(v, a) {
      const t = T.value.findIndex((x) => x.id === v);
      if (t < 0) return;
      const h = a === "up" ? t - 1 : t + 1;
      if (h < 0 || h >= T.value.length) return;
      const o = [...T.value];
      [o[t], o[h]] = [o[h], o[t]], te(o);
    }
    function A(v, a) {
      const t = T.value.map((h) => h.id === v ? { ...h, ...a } : h);
      te(t);
    }
    function ge(v, a, t) {
      const h = T.value.find((x) => x.id === v);
      if (!h || h.type !== "list") return;
      const o = [...h.items || []];
      o[a] = t, A(v, { items: o });
    }
    function R(v) {
      const a = T.value.find((t) => t.id === v);
      !a || a.type !== "list" || A(v, { items: [...a.items || [], "New item"] });
    }
    function g(v, a) {
      const t = T.value.find((o) => o.id === v);
      if (!t || t.type !== "list") return;
      const h = (t.items || []).filter((o, x) => x !== a);
      A(v, { items: h });
    }
    function se(v, a, t, h) {
      const o = T.value.find((U) => U.id === v);
      if (!o || o.type !== "social") return;
      const x = (o.links || []).map((U, Z) => Z === a ? { ...U, [t]: h } : U);
      A(v, { links: x });
    }
    function re(v) {
      const a = T.value.find((t) => t.id === v);
      !a || a.type !== "social" || A(v, { links: [...a.links || [], { platform: "custom", url: "" }] });
    }
    function xe(v, a) {
      const t = T.value.find((o) => o.id === v);
      if (!t || t.type !== "social") return;
      const h = (t.links || []).filter((o, x) => x !== a);
      A(v, { links: h });
    }
    function $e(v, a, t, h) {
      const o = T.value.find((U) => U.id === v);
      if (!o || o.type !== "link_list") return;
      const x = (o.links || []).map((U, Z) => Z === a ? { ...U, [t]: h } : U);
      A(v, { links: x });
    }
    function P(v) {
      const a = T.value.find((t) => t.id === v);
      !a || a.type !== "link_list" || A(v, { links: [...a.links || [], { text: "", url: "" }] });
    }
    function X(v, a) {
      const t = T.value.find((o) => o.id === v);
      if (!t || t.type !== "link_list") return;
      const h = (t.links || []).filter((o, x) => x !== a);
      A(v, { links: h });
    }
    function G(v, a) {
      const t = T.value.find((Re) => Re.id === v);
      if (!t || t.type !== "columns") return;
      const h = ` {{ ${V.value} }}`, o = w.message.variables ?? [], x = Array.from(/* @__PURE__ */ new Set([...o, V.value])), U = a === "left" ? "leftContent" : "rightContent", Ae = (t[U] ?? "") + h;
      A(v, { [U]: Ae }), C("update", { variables: x });
    }
    function S(v, a) {
      const t = T.value.find((h) => h.id === v);
      if (!(!t || t.type !== "row")) {
        if (a.columnCount !== void 0 && a.columnCount !== t.columnCount) {
          const h = [...t.cells || []];
          for (; h.length < a.columnCount; ) h.push("Cell content");
          a.cells = h.slice(0, a.columnCount);
        }
        A(v, a);
      }
    }
    function L(v, a, t) {
      const h = T.value.find((x) => x.id === v);
      if (!h || h.type !== "row") return;
      const o = [...h.cells || []];
      o[a] = t, A(v, { cells: o });
    }
    function M(v, a, t, h) {
      const o = T.value.find((U) => U.id === v);
      if (!o || o.type !== "navbar") return;
      const x = (o.links || []).map((U, Z) => Z === a ? { ...U, [t]: h } : U);
      A(v, { links: x });
    }
    function de(v) {
      const a = T.value.find((t) => t.id === v);
      !a || a.type !== "navbar" || A(v, { links: [...a.links || [], { text: "", url: "" }] });
    }
    function ue(v, a) {
      const t = T.value.find((h) => h.id === v);
      !t || t.type !== "navbar" || A(v, { links: (t.links || []).filter((h, o) => o !== a) });
    }
    function W(v, a, t, h) {
      const o = T.value.find((U) => U.id === v);
      if (!o || o.type !== "accordion") return;
      const x = (o.items || []).map((U, Z) => Z === a ? { ...U, [t]: h } : U);
      A(v, { items: x });
    }
    function D(v) {
      const a = T.value.find((t) => t.id === v);
      !a || a.type !== "accordion" || A(v, { items: [...a.items || [], { title: "New section", content: "" }] });
    }
    function Q(v, a) {
      const t = T.value.find((h) => h.id === v);
      !t || t.type !== "accordion" || A(v, { items: (t.items || []).filter((h, o) => o !== a) });
    }
    function ke(v, a, t, h) {
      const o = T.value.find((U) => U.id === v);
      if (!o || o.type !== "carousel") return;
      const x = (o.slides || []).map((U, Z) => Z === a ? { ...U, [t]: h } : U);
      A(v, { slides: x });
    }
    function Se(v) {
      const a = T.value.find((t) => t.id === v);
      !a || a.type !== "carousel" || A(v, { slides: [...a.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Ue(v, a) {
      const t = T.value.find((h) => h.id === v);
      !t || t.type !== "carousel" || A(v, { slides: (t.slides || []).filter((h, o) => o !== a) });
    }
    function Ce(v) {
      const a = ` {{ ${V.value} }}`, t = w.message.variables ?? [], h = Array.from(/* @__PURE__ */ new Set([...t, V.value]));
      v === "subject" ? C("update", {
        subject: (N.value || "") + a,
        variables: h
      }) : C("update", {
        preview_text: (J.value || "") + a,
        variables: h
      });
    }
    function ne(v) {
      const a = T.value.find((Re) => Re.id === v);
      if (!a || a.type !== "paragraph" && a.type !== "heading" && a.type !== "footer" && a.type !== "quote" && a.type !== "liquid" && a.type !== "code_block") return;
      const t = ` {{ ${V.value} }}`, h = w.message.variables ?? [], o = Array.from(/* @__PURE__ */ new Set([...h, V.value])), x = (a.type === "footer", "content"), Z = (a[x] ?? "") + t, Ae = T.value.map(
        (Re) => Re.id === v ? { ...Re, [x]: Z } : Re
      );
      C("update", { blocks: Ae, variables: o });
    }
    function y(v, a) {
      const t = T.value.find((Z) => Z.id === v);
      if (!t || t.type !== "row") return;
      const h = ` {{ ${V.value} }}`, o = w.message.variables ?? [], x = Array.from(/* @__PURE__ */ new Set([...o, V.value])), U = [...t.cells || []];
      U[a] = (U[a] || "") + h, A(v, { cells: U }), C("update", { variables: x });
    }
    function r() {
      const v = H.value.trim();
      !v || E.value.includes(v) || (E.value = [...E.value, v], V.value = v, H.value = "");
    }
    return (v, a) => (n(), l("section", _d, [
      e("div", wd, [
        e("div", $d, [
          a[28] || (a[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          s.showReset ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: a[0] || (a[0] = (t) => v.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        a[35] || (a[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", xd, [
          a[29] || (a[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: s.message.from_name ?? "",
            onInput: me
          }, null, 40, Sd)
        ]),
        e("div", Cd, [
          a[30] || (a[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: s.message.from_address ?? "",
            onInput: ve
          }, null, 40, Id)
        ]),
        e("div", Bd, [
          a[31] || (a[31] = e("label", { class: "em-label" }, [
            K("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: s.message.reply_to ?? "",
            onInput: ce
          }, null, 40, Ad)
        ]),
        e("div", Ud, [
          a[32] || (a[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Ld, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: N.value,
              onInput: z
            }, null, 40, Rd),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: a[1] || (a[1] = (t) => Ce("subject")),
              title: "Insert variable"
            }, b(Te))
          ]),
          e("span", {
            class: he(["em-analyzer", `em-analyzer--${F.value}`])
          }, b(d(hd)(F.value)), 3),
          I.value.length ? (n(), l("span", Td, "Spammy: " + b(I.value.join(", ")), 1)) : _("", !0)
        ]),
        e("div", Pd, [
          a[33] || (a[33] = e("label", { class: "em-label" }, [
            K("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Vd, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: J.value,
              onInput: be
            }, null, 40, Ed),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: a[2] || (a[2] = (t) => Ce("preview")),
              title: "Insert variable"
            }, b(Te))
          ]),
          a[34] || (a[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: he(["em-analyzer", `em-analyzer--${pe.value}`])
          }, b(d(kd)(pe.value)), 3),
          $.value.length ? (n(), l("span", Md, "Spammy: " + b($.value.join(", ")), 1)) : _("", !0)
        ])
      ]),
      e("div", Nd, [
        a[36] || (a[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        a[37] || (a[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Od, [
          (n(), l(q, null, j(ae, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (h) => fe(t)
          }, b(t.label), 9, Dd)), 64))
        ])
      ]),
      e("div", Wd, [
        a[63] || (a[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        a[64] || (a[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Hd, [
          (n(!0), l(q, null, j(T.value, (t, h) => (n(), l("div", {
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
                  disabled: h === 0,
                  onClick: (o) => le(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Kd),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: h === T.value.length - 1,
                  onClick: (o) => le(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Yd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (o) => ye(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Jd)
              ])
            ]),
            t.type === "heading" ? (n(), l("div", Gd, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { level: Number(o.target.value) })
              }, [...a[38] || (a[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Xd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Heading text"
              }, null, 40, Qd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ne(t.id)
              }, b(Te), 8, Zd)
            ])) : t.type === "paragraph" ? (n(), l("div", eu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, tu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ne(t.id)
              }, b(Te), 8, au)
            ])) : t.type === "image" ? (n(), l("div", su, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (o) => A(t.id, { src: o.target.value }),
                placeholder: "Image URL"
              }, null, 40, nu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => A(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, lu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (o) => A(t.id, { linkUrl: o.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, ou)
            ])) : t.type === "button" ? (n(), l("div", iu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (o) => A(t.id, { text: o.target.value }),
                placeholder: "Button text"
              }, null, 40, ru),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (o) => A(t.id, { url: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, du),
              e("div", uu, [
                a[39] || (a[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (o) => A(t.id, { borderRadius: Number(o.target.value) || 0 })
                }, null, 40, cu)
              ]),
              e("label", pu, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (o) => A(t.id, { ghost: o.target.checked })
                }, null, 40, mu),
                a[40] || (a[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (n(), l("div", vu, [
              a[41] || (a[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (o) => A(t.id, { height: Number(o.target.value) || 24 })
              }, null, 40, bu),
              a[42] || (a[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (n(), l("div", gu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, fu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (o) => A(t.id, { unsubscribeUrl: o.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, yu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (o) => A(t.id, { companyAddress: o.target.value }),
                placeholder: "Company address"
              }, null, 40, hu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ne(t.id)
              }, b(Te), 8, ku)
            ])) : t.type === "list" ? (n(), l("div", _u, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { style: o.target.value })
              }, [...a[43] || (a[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, wu),
              e("div", $u, [
                (n(!0), l(q, null, j(t.items || [], (o, x) => (n(), l("div", {
                  key: x,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o,
                    onInput: (U) => ge(t.id, x, U.target.value),
                    placeholder: `Item ${x + 1}`
                  }, null, 40, xu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (U) => g(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Su)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => R(t.id)
              }, "+ Add item", 8, Cu)
            ])) : t.type === "quote" ? (n(), l("div", Iu, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { style: o.target.value })
              }, [...a[44] || (a[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Bu),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Au),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ne(t.id)
              }, b(Te), 8, Uu)
            ])) : t.type === "social" ? (n(), l("div", Lu, [
              e("div", Ru, [
                (n(!0), l(q, null, j(t.links || [], (o, x) => (n(), l("div", {
                  key: x,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: o.platform,
                    class: "em-select em-select--sm",
                    onChange: (U) => se(t.id, x, "platform", U.target.value)
                  }, [...a[45] || (a[45] = [
                    Oe('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, Tu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (U) => se(t.id, x, "url", U.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Pu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (U) => xe(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Vu)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => re(t.id)
              }, "+ Add link", 8, Eu)
            ])) : t.type === "video" ? (n(), l("div", Mu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (o) => A(t.id, { thumbnailUrl: o.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Nu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (o) => A(t.id, { videoUrl: o.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Ou),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => A(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Du)
            ])) : t.type === "link_list" ? (n(), l("div", Wu, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => A(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Hu),
              e("div", zu, [
                (n(!0), l(q, null, j(t.links || [], (o, x) => (n(), l("div", {
                  key: x,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (U) => $e(t.id, x, "text", U.target.value),
                    placeholder: "Label"
                  }, null, 40, Fu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (U) => $e(t.id, x, "url", U.target.value),
                    placeholder: "URL"
                  }, null, 40, qu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (U) => X(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, ju)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => P(t.id)
              }, "+ Add link", 8, Ku)
            ])) : t.type === "columns" ? (n(), l("div", Yu, [
              a[46] || (a[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (o) => A(t.id, { leftContent: o.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Ju),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => G(t.id, "left")
              }, b(Te), 8, Gu),
              a[47] || (a[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (o) => A(t.id, { rightContent: o.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Xu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => G(t.id, "right")
              }, b(Te), 8, Qu)
            ])) : t.type === "divider" ? (n(), l("div", Zu, [
              e("div", ec, [
                a[48] || (a[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (o) => A(t.id, { thickness: Number(o.target.value) || 1 })
                }, null, 40, tc),
                a[49] || (a[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", ac, [
                a[50] || (a[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (o) => A(t.id, { color: o.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, sc)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { lineStyle: o.target.value })
              }, [...a[51] || (a[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, nc)
            ])) : t.type === "row" ? (n(), l("div", lc, [
              a[53] || (a[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (o) => S(t.id, { columnCount: Number(o.target.value) })
              }, [...a[52] || (a[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, oc),
              (n(!0), l(q, null, j(t.cells || [], (o, x) => (n(), l("div", {
                key: x,
                class: "em-row-cell"
              }, [
                e("label", ic, "Column " + b(x + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o,
                  onInput: (U) => L(t.id, x, U.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, rc),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (U) => y(t.id, x)
                }, b(Te), 8, dc)
              ]))), 128))
            ])) : t.type === "navbar" ? (n(), l("div", uc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => A(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, cc),
              e("div", pc, [
                (n(!0), l(q, null, j(t.links || [], (o, x) => (n(), l("div", {
                  key: x,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (U) => M(t.id, x, "text", U.target.value),
                    placeholder: "Label"
                  }, null, 40, mc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (U) => M(t.id, x, "url", U.target.value),
                    placeholder: "URL"
                  }, null, 40, vc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (U) => ue(t.id, x),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, bc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => de(t.id)
              }, "+ Add link", 8, gc)
            ])) : t.type === "accordion" ? (n(), l("div", fc, [
              (n(!0), l(q, null, j(t.items || [], (o, x) => (n(), l("div", {
                key: x,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.title,
                  onInput: (U) => W(t.id, x, "title", U.target.value),
                  placeholder: "Section title"
                }, null, 40, yc),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o.content,
                  onInput: (U) => W(t.id, x, "content", U.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, hc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (U) => Q(t.id, x),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, kc)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => D(t.id)
              }, "+ Add section", 8, _c)
            ])) : t.type === "carousel" ? (n(), l("div", wc, [
              (n(!0), l(q, null, j(t.slides || [], (o, x) => (n(), l("div", {
                key: x,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.imageUrl,
                  onInput: (U) => ke(t.id, x, "imageUrl", U.target.value),
                  placeholder: "Image URL"
                }, null, 40, $c),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.alt,
                  onInput: (U) => ke(t.id, x, "alt", U.target.value),
                  placeholder: "Alt text"
                }, null, 40, xc),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.linkUrl,
                  onInput: (U) => ke(t.id, x, "linkUrl", U.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Sc),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (U) => Ue(t.id, x),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Cc)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Se(t.id)
              }, "+ Add slide", 8, Ic)
            ])) : t.type === "countdown" ? (n(), l("div", Bc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (o) => A(t.id, { label: o.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Ac),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (o) => A(t.id, { endDateTime: o.target.value ? new Date(o.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Uc),
              a[54] || (a[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (n(), l("div", Lc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => A(t.id, { imageUrl: o.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Rc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (o) => A(t.id, { title: o.target.value }),
                placeholder: "Product title"
              }, null, 40, Tc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (o) => A(t.id, { price: o.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Pc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (o) => A(t.id, { buttonText: o.target.value }),
                placeholder: "Button text"
              }, null, 40, Vc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (o) => A(t.id, { buttonUrl: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, Ec)
            ])) : t.type === "liquid" ? (n(), l("div", Mc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Nc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ne(t.id)
              }, b(Te), 8, Oc),
              a[55] || (a[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (n(), l("div", Dc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => A(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Wc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => A(t.id, { content: o.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Hc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (o) => ne(t.id)
              }, b(Te), 8, zc),
              a[56] || (a[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (n(), l("div", Fc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (o) => A(t.id, { feedUrl: o.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, qc),
              e("div", jc, [
                a[57] || (a[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (o) => A(t.id, { maxItems: Number(o.target.value) || 5 })
                }, null, 40, Kc)
              ]),
              a[58] || (a[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (n(), l("div", Yc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => A(t.id, { imageUrl: o.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, Jc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => A(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, Gc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (o) => A(t.id, { fallbackUrl: o.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Xc)
            ])) : _("", !0),
            p.includes(t.type) ? (n(), l("div", Qc, [
              a[61] || (a[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: t.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (o) => A(t.id, { alignment: o.target.value })
              }, [...a[59] || (a[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, Zc),
              e("label", ep, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (o) => A(t.id, { fullWidth: o.target.checked })
                }, null, 40, tp),
                a[60] || (a[60] = e("span", null, "Full width", -1))
              ])
            ])) : _("", !0)
          ], 8, zd))), 128))
        ]),
        e("div", ap, [
          a[62] || (a[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", sp, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[3] || (a[3] = (t) => O("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[4] || (a[4] = (t) => O("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[5] || (a[5] = (t) => O("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[6] || (a[6] = (t) => O("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[7] || (a[7] = (t) => O("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[8] || (a[8] = (t) => O("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[9] || (a[9] = (t) => O("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[10] || (a[10] = (t) => O("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[11] || (a[11] = (t) => O("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[12] || (a[12] = (t) => O("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[13] || (a[13] = (t) => O("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[14] || (a[14] = (t) => O("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[15] || (a[15] = (t) => O("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[16] || (a[16] = (t) => O("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[17] || (a[17] = (t) => O("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[18] || (a[18] = (t) => O("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[19] || (a[19] = (t) => O("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[20] || (a[20] = (t) => O("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[21] || (a[21] = (t) => O("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[22] || (a[22] = (t) => O("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[23] || (a[23] = (t) => O("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[24] || (a[24] = (t) => O("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: a[25] || (a[25] = (t) => O("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", np, [
        a[67] || (a[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        a[68] || (a[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", lp, [
          a[65] || (a[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", op, [
            Pe(e("select", {
              "onUpdate:modelValue": a[26] || (a[26] = (t) => V.value = t),
              class: "em-select em-select--flex"
            }, [
              (n(!0), l(q, null, j(E.value, (t) => (n(), l("option", {
                key: t,
                value: t
              }, b(t), 9, ip))), 128))
            ], 512), [
              [De, V.value]
            ])
          ])
        ]),
        e("div", rp, [
          a[66] || (a[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", dp, [
            Pe(e("input", {
              "onUpdate:modelValue": a[27] || (a[27] = (t) => H.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [tt, H.value]
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
}), cp = /* @__PURE__ */ we(up, [["__scopeId", "data-v-c4398c5d"]]), pp = { class: "keos-email-builder" }, mp = { class: "kb-builder-top" }, vp = { style: { margin: 0, paddingLeft: "1.25rem" } }, bp = { class: "kb-email-layout" }, gp = { class: "kb-email-sidebar" }, fp = {
  key: 0,
  class: "kb-email-form"
}, yp = { class: "kb-email-form-head" }, hp = { class: "kb-email-form-head-top" }, kp = { class: "kb-email-health-pill" }, _p = { class: "kb-wa-form-head-row" }, wp = ["value"], $p = { class: "kb-email-health" }, xp = { class: "kb-email-health-row" }, Sp = { class: "kb-email-health-value" }, Cp = { class: "kb-email-health-bar" }, Ip = { class: "kb-email-canvas" }, Bp = {
  key: 0,
  class: "kb-email-test-banner"
}, Ap = { class: "kb-email-preview-chrome" }, Up = { class: "kb-push-preview-controls" }, Lp = { class: "kb-push-preview-as" }, Rp = ["value"], Tp = { class: "kb-preview-status" }, Pp = {
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
  setup(s, { emit: i }) {
    function u(y) {
      if (!Array.isArray(y) || y.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const r = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), B = [
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
      ], v = (t, h) => {
        if (!B.includes(h.type)) return t;
        const o = h.alignment || "left", x = !!h.fullWidth;
        return `<div style="text-align:${o};${x ? "width:100%;" : ""}">${t}</div>`;
      }, a = [];
      for (const t of y)
        switch (t.type) {
          case "heading": {
            const h = Math.min(3, Math.max(1, Number(t.level) || 1)), o = r(t.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            a.push(
              v(
                `<h${h} style="margin:0 0 12px;font-size:${h === 1 ? "22" : h === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${o || "Heading"}</h${h}>`,
                t
              )
            );
            break;
          }
          case "paragraph": {
            const h = r(t.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            a.push(
              v(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${h || "Paragraph"}</p>`,
                t
              )
            );
            break;
          }
          case "image": {
            const h = (t.src || "").trim(), o = r(t.alt || ""), x = (t.linkUrl || "").trim(), Z = !!t.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", Ae = h ? `<img src="${r(h)}" alt="${o}" style="${Z}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            a.push(
              v(
                `<div style="margin:0 0 12px;">${x ? `<a href="${r(x)}" style="color:#2563eb;">${Ae}</a>` : Ae}</div>`,
                t
              )
            );
            break;
          }
          case "button": {
            const h = r(t.text || "Button"), o = (t.url || "#").trim(), x = Math.min(24, Math.max(0, Number(t.borderRadius) ?? 8)), U = !!t.fullWidth, Z = !!t.ghost, Ae = Z ? "transparent" : "#0f172a", Re = Z ? "#0f172a" : "#fff", Ye = Z ? "2px solid #0f172a" : "none", Vt = U ? "block" : "inline-block", Et = U ? "100%" : "auto";
            a.push(
              v(
                `<p style="margin:0 0 12px;"><a href="${r(o)}" style="display:${Vt};width:${Et};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${Ae};color:${Re};border:${Ye};text-decoration:none;font-size:14px;font-weight:600;border-radius:${x}px;overflow-wrap:anywhere;">${h}</a></p>`,
                t
              )
            );
            break;
          }
          case "divider": {
            const h = Math.min(8, Math.max(1, Number(t.thickness) || 1)), o = (t.color || "#e2e8f0").trim() || "#e2e8f0", x = t.lineStyle || "solid";
            a.push(
              v(
                `<hr style="margin:16px 0;border:0;border-top:${h}px ${x} ${o};" />`,
                t
              )
            );
            break;
          }
          case "spacer": {
            const h = Math.min(120, Math.max(8, Number(t.height) || 24));
            a.push(v(`<div style="height:${h}px;"></div>`, t));
            break;
          }
          case "footer": {
            const h = r(t.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = (t.unsubscribeUrl || "").trim(), x = r(t.companyAddress || "");
            a.push(
              v(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${h || "Footer"}` + (o ? `<p style="margin:8px 0 0;"><a href="${r(o)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (x ? `<p style="margin:4px 0 0;">${x}</p>` : "") + "</div>",
                t
              )
            );
            break;
          }
          case "list": {
            const h = t.style === "numbered" ? "ol" : "ul", x = (Array.isArray(t.items) ? t.items : []).map(
              (U) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${r(String(U)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            a.push(
              v(
                `<${h} style="margin:0 0 12px;padding-left:24px;">${x || "<li>Item</li>"}</${h}>`,
                t
              )
            );
            break;
          }
          case "quote": {
            const h = r(t.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, x = o[t.style || "default"] || o.default;
            a.push(
              v(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${x}font-size:14px;line-height:1.6;">${h || "Quote"}</div>`,
                t
              )
            );
            break;
          }
          case "social": {
            const o = (Array.isArray(t.links) ? t.links : []).filter((x) => (x.url || "").trim());
            if (o.length === 0)
              a.push(
                v(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  t
                )
              );
            else {
              const x = (U) => `<a href="${r((U.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${r(U.platform || "Link")}</a>`;
              a.push(
                v(
                  `<div style="margin:0 0 12px;">${o.map(x).join("")}</div>`,
                  t
                )
              );
            }
            break;
          }
          case "video": {
            const h = (t.thumbnailUrl || "").trim(), o = (t.videoUrl || "#").trim(), x = r(t.caption || ""), Z = !!t.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", Ae = h ? `<img src="${r(h)}" alt="Video" style="${Z}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            a.push(
              v(
                `<div style="margin:0 0 12px;"><a href="${r(o)}" style="display:block;color:inherit;">${Ae}</a>` + (x ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${x}</p>` : "") + "</div>",
                t
              )
            );
            break;
          }
          case "link_list": {
            const h = Array.isArray(t.links) ? t.links : [], o = r(t.separator || " | "), U = h.filter(
              (Z) => (Z.text || Z.url) && (Z.url || "").trim()
            ).map(
              (Z) => `<a href="${r((Z.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${r(Z.text || "Link")}</a>`
            );
            a.push(
              v(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${U.join(o)}</p>`,
                t
              )
            );
            break;
          }
          case "columns": {
            const h = r(t.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = r(t.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            a.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${h || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${o || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const h = Math.min(4, Math.max(1, Number(t.columnCount) || 2)), o = Array.isArray(t.cells) ? t.cells.slice(0, h) : [], x = 100 / h, U = Array.from({ length: h }, (Z, Ae) => {
              const Re = o[Ae] ?? "", Ye = r(Re).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${x}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${Ye || "—"}</td>`;
            }).join("");
            a.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${U}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const h = Array.isArray(t.links) ? t.links : [], o = r(t.separator || " | "), U = h.filter(
              (Z) => (Z.text || Z.url) && (Z.url || "").trim()
            ).map(
              (Z) => `<a href="${r((Z.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${r(Z.text || "Link")}</a>`
            );
            a.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${U.length ? U.join(o) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const o = (Array.isArray(t.items) ? t.items : []).map((x) => {
              const U = r(x.title || "Section"), Z = r(x.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${U}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${Z}</div></details>`;
            }).join("");
            a.push(
              o ? `<div style="margin:0 0 12px;">${o}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const o = (Array.isArray(t.slides) ? t.slides : []).filter(
              (x) => (x.imageUrl || "").trim()
            );
            if (o.length === 0)
              a.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const x = o[0], U = `<img src="${r(x.imageUrl)}" alt="${r(x.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, Z = (x.linkUrl || "").trim();
              a.push(
                `<div style="margin:0 0 12px;">${Z ? `<a href="${r(Z)}">${U}</a>` : U}` + (o.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${o.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const h = r(t.label || "Offer ends in"), o = t.endDateTime ? new Date(t.endDateTime).toLocaleString() : "—";
            a.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${h}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${o}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const h = (t.imageUrl || "").trim(), o = r(t.title || "Product"), x = r(t.price || ""), U = r(t.buttonText || "Buy now"), Z = (t.buttonUrl || "#").trim(), Ae = h ? `<img src="${r(h)}" alt="${r(t.alt || o)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            a.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Ae}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${o}</p>` + (x ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${x}</p>` : "") + `<a href="${r(Z)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${U}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const h = r((t.content || "").trim());
            a.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${h || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const h = (t.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), o = r((t.caption || "").trim());
            a.push(
              '<div style="margin:0 0 12px;">' + (o ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${o}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${h || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const h = (t.feedUrl || "").trim(), o = Math.min(20, Math.max(1, Number(t.maxItems) ?? 5));
            a.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (h ? `<p style="margin:0;font-size:12px;color:#64748b;">${r(h)} · max ${o} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const h = (t.imageUrl || "").trim(), o = (t.fallbackUrl || "").trim(), x = r(t.alt || "Dynamic image");
            h ? a.push(
              `<div style="margin:0 0 12px;"><img src="${r(h)}" alt="${x}" style="max-width:100%;height:auto;display:block;border:0;" />` + (o ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${r(o)}</p>` : "") + "</div>"
            ) : a.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return a.join("");
    }
    function m(y) {
      return /<\s*html[\s>]/i.test(y) || /<!doctype\s+html/i.test(y);
    }
    function p(y) {
      const r = y.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return r ? r[1] : y;
    }
    function c(y, r, B) {
      const v = (r || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), a = (B || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${v}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        a ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${a}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${y}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const w = s, C = i, {
      campaign: f,
      dirty: E,
      customValidatorErrors: V,
      getValidationWithWarnings: H,
      update: N,
      updateMessage: J,
      undo: F,
      redo: pe,
      canUndo: I,
      canRedo: $,
      resetMessage: T,
      hooks: te
    } = qe({
      initial: w.modelValue,
      hooks: {
        ...w.hooks,
        customValidators: async (y) => {
          var a, t, h;
          const r = [];
          (a = y.name) != null && a.trim() || r.push("Template name is required");
          const B = y.message;
          (t = B == null ? void 0 : B.subject) != null && t.trim() || r.push("Subject is required");
          const v = (h = w.hooks) != null && h.customValidators ? await w.hooks.customValidators(y) : [];
          return [...r, ...v];
        }
      },
      onDirty: () => C("change", f.value)
    }), { lastSavedAt: z } = je(f, { channel: "email" });
    function be(y) {
      (y.metaKey || y.ctrlKey) && y.key === "z" && (y.preventDefault(), y.shiftKey ? pe() : F());
    }
    We(() => {
      window.addEventListener("keydown", be);
    }), He(() => {
      window.removeEventListener("keydown", be);
    }), Be(
      f,
      (y) => C("update:modelValue", {
        ...y,
        message: {
          ...y.message,
          html: Q.value
        }
      }),
      { deep: !0 }
    );
    const me = ee(), ve = ee(!0);
    async function ce() {
      if (te.estimateReach)
        try {
          me.value = await te.estimateReach(f.value.audience);
        } catch {
          me.value = void 0;
        }
      te.canSend && (ve.value = await Promise.resolve(te.canSend()));
    }
    ce(), Be(() => f.value.audience, ce, { deep: !0 });
    const ae = k(() => (V.value, H(me.value))), fe = k(() => ae.value.blockingErrors), O = k(() => ae.value.warnings), ye = k(() => ae.value.valid), le = k(() => {
      var v, a, t;
      const y = f.value.message, r = [
        !!((v = f.value.name) != null && v.trim()),
        !!((a = y.subject) != null && a.trim()),
        !!((t = y.from_address) != null && t.trim()),
        !!(Array.isArray(y.blocks) ? y.blocks.length : (y.html ?? "").trim().length),
        !!f.value.template_type
      ], B = r.filter(Boolean).length;
      return Math.round(B / r.length * 100);
    }), A = k(() => le.value >= 90 ? "Production ready" : le.value >= 70 ? "Strong draft" : le.value >= 40 ? "In progress" : "Needs setup"), ge = k(
      () => f.value.template_type ?? "transactional"
    ), R = ee(""), g = ee(!1), se = ee(null), re = k(() => {
      const y = R.value;
      return y ? Ne.find((r) => r.id === y) ?? null : null;
    });
    function xe(y) {
      const r = f.value, B = y.campaign.message ? { ...r.message, ...y.campaign.message } : r.message;
      N({
        ...y.campaign,
        message: B
      }), se.value = null, g.value = !1;
    }
    function $e(y) {
      const r = y.target.value;
      if (!r) return;
      const B = mt.find((v) => v.id === r);
      B && (E.value ? (se.value = B, g.value = !0) : xe(B), y.target.value = "");
    }
    function P(y) {
      N({ template_type: y });
    }
    function X(y) {
      N({
        name: y,
        tracking: { ...f.value.tracking ?? {}, campaign_name: y }
      });
    }
    const G = k(
      () => f.value.message.subject ?? ""
    ), S = k(
      () => f.value.message.preview_text ?? ""
    ), L = k(
      () => f.value.message.html ?? ""
    ), M = k(
      () => f.value.message.from_name ?? "Your App"
    ), de = k(
      () => f.value.message.from_address ?? "notifications@example.com"
    ), ue = k(
      () => f.value.message.blocks ?? []
    ), W = k(() => {
      const y = f.value.message, r = (y.html ?? "").trim(), v = (Array.isArray(y.blocks) ? y.blocks : []).some((a) => {
        if (!a || typeof a != "object") return !1;
        const t = (a.type ?? "").toString();
        if (t === "paragraph" || t === "heading" || t === "quote" || t === "footer") {
          const h = (a.content ?? "").toString().trim();
          return !(!h || h === "Heading" || h.startsWith("Your text here."));
        }
        return t === "image" || t === "video" || t === "dynamic_image" ? !!(a.src ?? a.imageUrl ?? a.thumbnailUrl ?? "").toString().trim() : t === "button" ? !!(a.text ?? "").toString().trim() : !0;
      });
      return !!((y.subject ?? "").toString().trim() || (y.preview_text ?? "").toString().trim() || r || v);
    }), D = k(() => {
      const y = ue.value;
      if (Array.isArray(y) && y.length > 0)
        return u(y);
      const r = L.value;
      return r && r.trim() ? m(r) ? p(r) : r : u([]);
    }), Q = k(() => {
      const y = ue.value;
      if (Array.isArray(y) && y.length > 0)
        return c(
          u(y),
          G.value,
          S.value
        );
      const r = L.value;
      return r && r.trim() ? m(r) ? r : c(r, G.value, S.value) : c(
        u([]),
        G.value,
        S.value
      );
    }), ke = k(() => {
      const y = G.value;
      return re.value ? Ee(y, re.value.data) : y;
    }), Se = k(() => {
      const y = S.value;
      return re.value ? Ee(y, re.value.data) : y;
    }), Ue = k(() => {
      const y = D.value;
      return re.value ? Ee(y, re.value.data) : y;
    }), Ce = ee("desktop");
    function ne() {
      ye.value && C("save", {
        ...f.value,
        message: {
          ...f.value.message,
          html: Q.value
        }
      });
    }
    return (y, r) => (n(), l("div", pp, [
      e("div", mp, [
        Ie(Ke, {
          "campaign-name": d(f).name,
          status: d(f).status,
          dirty: d(E),
          "last-saved-at": d(z),
          "can-undo": d(I),
          "can-redo": d($),
          "slugify-name": w.enforceSlugName,
          "onUpdate:campaignName": X,
          onUndo: d(F),
          onRedo: d(pe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        fe.value.length > 0 ? (n(), l("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(oe).dangerBg,
            border: `1px solid ${d(oe).dangerBorder}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[16]}px ${d(Y)[24]}px`,
            marginBottom: `${d(Y)[24]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(oe).danger })
          }, [
            (n(!0), l(q, null, j(fe.value, (B) => (n(), l("li", {
              key: B.message
            }, b(B.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        O.value.length > 0 ? (n(), l("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(oe).neutral.bg,
            border: `1px solid ${d(oe).neutral.border}`,
            borderRadius: `${d(Le).input}px`,
            padding: `${d(Y)[16]}px ${d(Y)[24]}px`,
            marginBottom: `${d(Y)[24]}px`,
            fontSize: "0.875rem",
            color: d(oe).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(Y)[4]}px` })
          }, "Warnings", 4),
          e("ul", vp, [
            (n(!0), l(q, null, j(O.value, (B) => (n(), l("li", {
              key: B.message
            }, b(B.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", bp, [
        e("aside", gp, [
          s.disabledSections.includes("email") ? _("", !0) : (n(), l("div", fp, [
            e("div", yp, [
              e("div", hp, [
                r[8] || (r[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                e("span", kp, b(A.value), 1)
              ]),
              e("div", _p, [
                Ie(ot, {
                  "template-type": ge.value,
                  onUpdate: P
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: $e
                }, [
                  r[9] || (r[9] = e("option", { value: "" }, "Presets…", -1)),
                  (n(!0), l(q, null, j(d(mt), (B) => (n(), l("option", {
                    key: B.id,
                    value: B.id
                  }, b(B.label), 9, wp))), 128))
                ], 32)
              ]),
              e("div", $p, [
                e("div", xp, [
                  r[10] || (r[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                  e("span", Sp, b(le.value) + "%", 1)
                ]),
                e("div", Cp, [
                  e("span", {
                    class: "kb-email-health-fill",
                    style: ie({ width: `${le.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ie(cp, {
              message: d(f).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: d(J),
              onReset: r[0] || (r[0] = (B) => d(T)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Ip, [
          !s.designOnly && d(f).audience.test_mode ? (n(), l("div", Bp, [...r[11] || (r[11] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            K(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Ap, [
            e("div", Up, [
              e("label", Lp, [
                r[13] || (r[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Pe(e("select", {
                  "onUpdate:modelValue": r[1] || (r[1] = (B) => R.value = B),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  r[12] || (r[12] = e("option", { value: "" }, "No substitution", -1)),
                  (n(!0), l(q, null, j(d(Ne), (B) => (n(), l("option", {
                    key: B.id,
                    value: B.id
                  }, b(B.label), 9, Rp))), 128))
                ], 512), [
                  [De, R.value]
                ])
              ]),
              e("div", Tp, [
                r[14] || (r[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                e("strong", null, b(Ce.value), 1)
              ])
            ]),
            e("div", Pp, [
              e("button", {
                type: "button",
                class: he(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Ce.value === "desktop"
                }]),
                onClick: r[2] || (r[2] = (B) => Ce.value = "desktop")
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
                K(" Desktop ", -1)
              ])], 2),
              e("button", {
                type: "button",
                class: he(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Ce.value === "mobile"
                }]),
                onClick: r[3] || (r[3] = (B) => Ce.value = "mobile")
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
                K(" Mobile ", -1)
              ])], 2)
            ]),
            e("div", {
              class: he(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": Ce.value === "mobile",
                "kb-email-preview-frame--empty": !W.value
              }])
            }, [
              e("div", Vp, [
                e("div", Ep, [
                  e("span", Mp, b(M.value), 1),
                  e("span", Np, "<" + b(de.value) + ">", 1)
                ]),
                e("div", Op, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: ke.value || "No subject"
                  }, b(ke.value || "No subject"), 9, Dp),
                  Se.value ? (n(), l("span", Wp, " — " + b(Se.value), 1)) : _("", !0)
                ])
              ]),
              e("div", Hp, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: Ue.value
                }, null, 8, zp)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", Fp, [
        w.actionsNote ? (n(), l("div", qp, b(w.actionsNote), 1)) : _("", !0),
        e("div", jp, [
          s.showDuplicate ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: r[4] || (r[4] = (B) => C("duplicate", JSON.parse(JSON.stringify(d(f)))))
          }, " Duplicate ")) : _("", !0),
          s.showSave ? (n(), l("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: ne
          }, " Save ")) : _("", !0),
          s.showClose ? (n(), l("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: r[5] || (r[5] = (B) => C("edit"))
          }, " Close ")) : _("", !0)
        ])
      ]),
      g.value ? (n(), l("div", Kp, [
        e("div", Yp, [
          r[17] || (r[17] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          r[18] || (r[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Jp, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: r[6] || (r[6] = (B) => {
                g.value = !1, se.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: r[7] || (r[7] = (B) => se.value && xe(se.value))
            }, " Replace ")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), Pt = /* @__PURE__ */ we(Gp, [["__scopeId", "data-v-1f4e41ad"]]), Xp = { class: "kb-shell" }, Qp = {
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
  setup(s, { emit: i }) {
    const u = i, m = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (p, c) => (n(), l("div", Xp, [
      e("header", {
        class: "kb-shell__header",
        style: ie({ padding: `${d(Y)[12]}px ${d(Y)[24]}px`, borderBottom: `1px solid ${d(oe).neutral.border}`, background: d(oe).neutral.bg })
      }, [
        c[0] || (c[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Qp, [
          (n(), l(q, null, j(m, (w) => e("button", {
            key: w.id,
            type: "button",
            class: he(["kb-shell__channel", { "kb-shell__channel--active": s.channel === w.id }]),
            role: "tab",
            "aria-selected": s.channel === w.id,
            onClick: (C) => u("switch-channel", w.id)
          }, b(w.label), 11, Zp)), 64))
        ]),
        e("div", em, [
          s.environment ? (n(), l("span", {
            key: 0,
            class: "kb-shell__env",
            style: ie({ padding: "2px 8px", borderRadius: `${d(Le).input}px`, fontSize: "0.75rem", background: d(oe).neutral.bg, color: d(oe).neutral.textMuted })
          }, b(s.environment), 5)) : _("", !0),
          s.helpUrl ? (n(), l("a", {
            key: 1,
            href: s.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ie({ color: d(oe).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, tm)) : _("", !0)
        ])
      ], 4),
      e("div", am, [
        Ve(p.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), nm = /* @__PURE__ */ we(sm, [["__scopeId", "data-v-0df30803"]]), lm = {
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
  setup(s) {
    var c;
    const i = s, u = ee(((c = i.items[0]) == null ? void 0 : c.id) ?? "");
    let m = null;
    function p(w) {
      const C = document.getElementById(w);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return We(() => {
      const w = i.scrollContainerId ? document.getElementById(i.scrollContainerId) : document;
      w && (m = new IntersectionObserver(
        (C) => {
          for (const f of C)
            if (f.isIntersecting) {
              const E = f.target.getAttribute("data-outline-id");
              E && (u.value = E);
            }
        },
        { root: w === document ? null : w, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), i.items.forEach((C) => {
        const f = document.getElementById(C.id);
        f && (m == null || m.observe(f));
      }));
    }), He(() => {
      m == null || m.disconnect();
    }), Be(
      () => i.items,
      (w) => {
        w.length && !u.value && (u.value = w[0].id);
      },
      { immediate: !0 }
    ), (w, C) => (n(), l("nav", lm, [
      e("ul", om, [
        (n(!0), l(q, null, j(s.items, (f) => (n(), l("li", {
          key: f.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: he(["kb-outline__btn", { "kb-outline__btn--active": u.value === f.id }]),
            style: ie({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${d(Y)[8]}px ${d(Y)[12]}px`,
              border: "none",
              borderRadius: `${d(Le).input}px`,
              background: u.value === f.id ? d(oe).neutral.bg : "transparent",
              color: u.value === f.id ? "#0f172a" : d(oe).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: u.value === f.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (E) => p(f.id)
          }, b(f.label), 15, im)
        ]))), 128))
      ])
    ]));
  }
}), dm = /* @__PURE__ */ we(rm, [["__scopeId", "data-v-25c37675"]]), um = ["id"], cm = {
  key: 1,
  class: "kb-form-shell__head"
}, pm = /* @__PURE__ */ _e({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(s) {
    return (i, u) => (n(), l("div", {
      class: "kb-form-shell",
      id: s.sectionId ?? void 0,
      style: ie({
        padding: `${d(Y)[24]}px ${d(Y)[24]}px ${d(Y)[32]}px`,
        marginBottom: 0
      })
    }, [
      s.label ? (n(), l("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ie({ marginBottom: d(Y)[24], paddingBottom: d(Y)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ie({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: d(Y)[12] })
        }, b(s.label), 5),
        Ve(i.$slots, "head", {}, void 0, !0)
      ], 4)) : (n(), l("div", cm, [
        Ve(i.$slots, "head", {}, void 0, !0)
      ])),
      Ve(i.$slots, "default", {}, void 0, !0)
    ], 12, um));
  }
}), mm = /* @__PURE__ */ we(pm, [["__scopeId", "data-v-6504df41"]]), vm = /* @__PURE__ */ _e({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(s) {
    return (i, u) => (n(), l("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ie({
        display: "flex",
        justifyContent: s.align === "start" ? "flex-start" : s.align === "between" ? "space-between" : "flex-end",
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
}), bm = /* @__PURE__ */ _e({
  __name: "BuilderTopShell",
  setup(s) {
    return (i, u) => (n(), l("div", {
      class: "kb-top-shell",
      style: ie({
        marginLeft: d(Y)[24],
        marginRight: d(Y)[24]
      })
    }, [
      Ve(i.$slots, "header"),
      Ve(i.$slots, "errors"),
      Ve(i.$slots, "warnings"),
      Ve(i.$slots, "default")
    ], 4));
  }
});
function gm(s) {
  s.component("KeosNotificationBuilder", Lt), s.component("KeosWhatsAppBuilder", Rt), s.component("KeosSmsBuilder", Tt), s.component("KeosEmailBuilder", Pt), s.component("BuilderShell", nm), s.component("BuilderOutline", dm), s.component("BuilderVersionHistoryModal", Ut), s.component("BuilderFormShell", mm), s.component("BuilderActionsBar", vm), s.component("BuilderTopShell", bm);
}
const ym = {
  install: gm,
  KeosNotificationBuilder: Lt,
  KeosWhatsAppBuilder: Rt,
  KeosSmsBuilder: Tt,
  KeosEmailBuilder: Pt
};
export {
  vm as BuilderActionsBar,
  mm as BuilderFormShell,
  dm as BuilderOutline,
  nm as BuilderShell,
  bm as BuilderTopShell,
  Ut as BuilderVersionHistoryModal,
  Ne as DEFAULT_SAMPLE_PROFILES,
  Pt as KeosEmailBuilder,
  Lt as KeosNotificationBuilder,
  Tt as KeosSmsBuilder,
  Rt as KeosWhatsAppBuilder,
  ym as default,
  gm as install,
  Ee as renderTemplatePreview,
  je as useAutosave,
  qe as useCampaignState
};
//# sourceMappingURL=index.js.map
