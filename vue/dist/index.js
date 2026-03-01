import { ref as G, watch as he, computed as U, defineComponent as de, openBlock as a, createElementBlock as n, normalizeStyle as ne, unref as c, createElementVNode as e, Fragment as F, renderList as Y, toDisplayString as h, createTextVNode as X, createCommentVNode as $, normalizeClass as me, withDirectives as Ue, vModelSelect as Oe, vModelText as Je, vModelCheckbox as $t, createStaticVNode as Me, withKeys as wt, onMounted as Ne, onUnmounted as De, createVNode as ge, createBlock as xt, renderSlot as Be } from "vue";
const q = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Ce = {
  input: 6,
  card: 12,
  button: 6
}, te = {
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
te.neutral.textMuted, te.neutral.textMeta;
const He = {
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
}, Ct = ["android", "ios", "web"], rt = "normal", dt = ["low", "normal", "high"], ut = 86400, St = [3600, 7200, 86400, 172800], ct = "1.0", It = ["topic", "segment", "user_list"];
function Ge() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Ct],
    test_mode: !1
  };
}
function Qe() {
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
function Xe() {
  return {
    priority: rt,
    ttl: ut,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function Ze() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function Ut(t) {
  return {
    schema_version: ct,
    name: "",
    status: "draft",
    audience: Ge(),
    message: Qe(),
    delivery: Xe(),
    tracking: Ze(),
    ...t
  };
}
function pt(t) {
  const d = t;
  return d.schema_version || (d.schema_version = ct), d.audience || (d.audience = Ge()), d.message || (d.message = Qe()), d.delivery || (d.delivery = Xe()), d.tracking || (d.tracking = Ze()), dt.includes(d.delivery.priority) || (d.delivery.priority = rt), d.delivery.ttl === void 0 && (d.delivery.ttl = ut), It.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const Rt = 1e5;
function Lt(t, d) {
  var i, v, _;
  const l = [], r = d ?? t.audience.estimated_reach;
  return r !== void 0 && r >= Rt && l.push({
    message: `Estimated reach is very high (${r.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), t.tracking && !((i = t.tracking.campaign_name) != null && i.trim()) && !((v = t.name) != null && v.trim()) && l.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (_ = t.message.deep_link) != null && _.trim() || l.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), l;
}
function mt(t, d = "error") {
  return { message: t, severity: d };
}
function vt(t) {
  const d = [];
  return t.schema_version || d.push(mt("Missing schema_version")), {
    valid: d.length === 0,
    errors: d
  };
}
function At(t, d) {
  const l = vt(t), r = Lt(t, d);
  return {
    valid: l.valid,
    errors: [
      ...l.errors,
      ...r.map((i) => mt(i.message, i.severity))
    ]
  };
}
function Bt(t) {
  return t.errors.filter((d) => d.severity === "error");
}
function Tt(t) {
  return t.errors.filter((d) => d.severity !== "error");
}
function Pe(t, d) {
  return t.length <= d ? { text: t, truncated: !1 } : { text: t.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const ze = He.android;
function Pt(t) {
  const { title: d, body: l } = t, r = Pe(d || "", ze.title), i = Pe(l || "", ze.body);
  return {
    title: r.text,
    body: i.text,
    imageUrl: t.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: i.truncated,
    expanded: !1
  };
}
function Vt(t) {
  const { title: d, body: l } = t, r = Pe(d || "", ze.title), i = Pe(l || "", ze.body);
  return {
    title: r.text,
    body: i.text,
    imageUrl: t.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: i.truncated,
    expanded: !0
  };
}
function Et(t, d = {}) {
  const l = d.expanded ? Vt(t) : Pt(t);
  return d.darkMode !== void 0 && (l.darkMode = d.darkMode), l;
}
const et = He.ios;
function bt(t) {
  const { title: d, body: l } = t, r = Pe(d || "", et.title), i = Pe(l || "", et.body);
  return {
    title: r.text,
    body: i.text,
    imageUrl: t.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: i.truncated,
    expanded: !1
  };
}
function Ot(t) {
  return bt(t);
}
function Mt(t, d = {}) {
  const l = d.variant === "lockscreen" ? Ot(t) : bt(t);
  return d.darkMode !== void 0 && (l.darkMode = d.darkMode), l;
}
const tt = He.web;
function st(t) {
  const { title: d, body: l } = t, r = Pe(d || "", tt.title), i = Pe(l || "", tt.body);
  return {
    title: r.text,
    body: i.text,
    imageUrl: t.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: i.truncated
  };
}
function Nt(t) {
  return t.map((d) => ({ message: d, severity: "error" }));
}
function Ye(t) {
  return JSON.parse(JSON.stringify(t));
}
function We(t = {}) {
  const d = G(
    pt(t.initial ?? Ut())
  ), l = t.hooks ?? {}, r = G(!1), i = G([]);
  he(
    d,
    () => {
      if (!l.customValidators) {
        i.value = [];
        return;
      }
      l.customValidators(d.value).then((j) => {
        i.value = j;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const v = G([]), _ = G([]);
  function p() {
    const j = Ye(d.value);
    v.value = [...v.value.slice(-19), j], _.value = [];
  }
  const m = U(() => v.value.length > 0), I = U(() => _.value.length > 0);
  function O() {
    v.value.length !== 0 && (_.value = [Ye(d.value), ..._.value], d.value = v.value[v.value.length - 1], v.value = v.value.slice(0, -1));
  }
  function L() {
    _.value.length !== 0 && (v.value = [...v.value, Ye(d.value)], d.value = _.value[0], _.value = _.value.slice(1));
  }
  he(
    d,
    () => {
      var j;
      r.value = !0, (j = t.onDirty) == null || j.call(t);
    },
    { deep: !0 }
  );
  const y = U(() => vt(d.value));
  function A(j) {
    const se = At(d.value, j), x = Nt(i.value), le = [...Bt(se), ...x], ye = [...se.errors, ...x], fe = se.valid && x.length === 0;
    return {
      ...se,
      errors: ye,
      valid: fe,
      blockingErrors: le,
      warnings: Tt(se)
    };
  }
  function E(j) {
    p(), d.value = { ...d.value, ...j };
  }
  function z(j) {
    p(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...j }
    };
  }
  function R(j) {
    p(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...j }
    };
  }
  function w(j) {
    p(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...j }
    };
  }
  function ee(j) {
    p(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...j } : { campaign_name: "", tags: [], ab_test: !1, ...j }
    };
  }
  function ie(j) {
    p(), d.value = {
      ...d.value,
      message: { ...Qe(), ...j }
    };
  }
  function ce(j) {
    p(), d.value = {
      ...d.value,
      delivery: { ...Xe(), ...j }
    };
  }
  function ue(j) {
    p(), d.value = {
      ...d.value,
      tracking: { ...Ze(), ...j }
    };
  }
  function pe(j) {
    p(), d.value = {
      ...d.value,
      audience: { ...Ge(), ...j }
    };
  }
  const be = U(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function _e(j, se) {
    const x = be.value;
    let le;
    switch (j) {
      case "android":
        le = Et(x, { expanded: se == null ? void 0 : se.expanded });
        break;
      case "ios":
        le = Mt(x);
        break;
      case "web":
        le = st(x);
        break;
      default:
        le = st(x);
    }
    const ye = d.value.message.actions ?? [], fe = d.value.message.location;
    return { ...le, actions: ye, location: fe ?? void 0 };
  }
  const oe = He;
  async function Q() {
    return l.customValidators ? l.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: r,
    validation: y,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: i,
    getValidationWithWarnings: A,
    update: E,
    updateAudience: z,
    updateMessage: R,
    updateDelivery: w,
    updateTracking: ee,
    undo: O,
    redo: L,
    canUndo: m,
    canRedo: I,
    resetMessage: ie,
    resetDelivery: ce,
    resetTracking: ue,
    resetAudience: pe,
    getPreview: _e,
    previewInput: be,
    characterLimits: oe,
    runCustomValidators: Q,
    hooks: l
  };
}
const Dt = "keos-draft", zt = 2e3;
function Ht(t, d) {
  return `${Dt}-${t}-${d}`;
}
function Fe(t, d) {
  const l = d.channel, r = U(
    () => {
      var O, L;
      return Ht(
        l,
        d.key ?? ((O = t.value) == null ? void 0 : O.id) ?? ((L = t.value) == null ? void 0 : L.name) ?? "draft"
      );
    }
  ), i = G(null);
  let v = null;
  function _() {
    try {
      const O = JSON.stringify(t.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(r.value, O), i.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function p() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(r.value);
    } catch {
    }
  }
  function m() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const O = window.localStorage.getItem(r.value);
      if (!O) return null;
      const L = JSON.parse(O);
      return pt(L);
    } catch {
      return null;
    }
  }
  function I() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return he(
    t,
    () => {
      I() && (v && clearTimeout(v), v = setTimeout(() => {
        v = null, _();
      }, zt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: i,
    clearDraft: p,
    getDraft: m,
    persist: _
  };
}
const Wt = { class: "kb-header__row" }, Ft = ["value"], jt = { class: "kb-header__actions" }, qt = ["disabled"], Kt = ["disabled"], Yt = ["value"], Jt = ["value"], Gt = /* @__PURE__ */ de({
  __name: "BuilderHeader",
  props: {
    campaignName: {},
    status: {},
    dirty: { type: Boolean },
    saving: { type: Boolean },
    lastSavedAt: {},
    canUndo: { type: Boolean, default: !1 },
    canRedo: { type: Boolean, default: !1 },
    workflowStatus: {}
  },
  emits: ["update:campaignName", "update:workflowStatus", "undo", "redo"],
  setup(t, { emit: d }) {
    const l = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], r = d;
    function i(_) {
      return _.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function v(_) {
      const p = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return p[_] ?? p.draft;
    }
    return (_, p) => (a(), n("header", {
      class: "kb-header",
      style: ne({
        padding: `${c(q)[16]}px 0`,
        borderBottom: `1px solid ${c(te).neutral.border}`,
        marginBottom: `${c(q)[16]}px`
      })
    }, [
      e("div", Wt, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: t.campaignName,
          placeholder: "Name this campaign (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: p[0] || (p[0] = (m) => r("update:campaignName", m.target.value)),
          "aria-label": "Campaign name"
        }, null, 40, Ft),
        e("div", jt, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !t.canUndo,
            onClick: p[1] || (p[1] = (m) => r("undo"))
          }, " Undo ", 8, qt),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !t.canRedo,
            onClick: p[2] || (p[2] = (m) => r("redo"))
          }, " Redo ", 8, Kt)
        ]),
        t.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: t.workflowStatus,
          class: "kb-header__status-select",
          style: ne({
            padding: `${c(q)[4]}px ${c(q)[8]}px`,
            borderRadius: `${c(Ce).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...v(t.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: p[3] || (p[3] = (m) => r("update:workflowStatus", m.target.value))
        }, [
          (a(), n(F, null, Y(l, (m) => e("option", {
            key: m.value,
            value: m.value
          }, h(m.label), 9, Jt)), 64))
        ], 44, Yt)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: ne({
            padding: `${c(q)[4]}px ${c(q)[8]}px`,
            borderRadius: `${c(Ce).input}px`,
            background: c(te).neutral.bg,
            fontSize: "0.8125rem",
            color: c(te).neutral.textMuted
          })
        }, h(t.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ne({ fontSize: "0.8125rem", color: c(te).neutral.textMuted, marginTop: `${c(q)[4]}px` })
      }, [
        t.saving ? (a(), n(F, { key: 0 }, [
          X("Saving…")
        ], 64)) : t.dirty ? (a(), n(F, { key: 1 }, [
          X("Unsaved changes")
        ], 64)) : t.lastSavedAt ? (a(), n(F, { key: 2 }, [
          X("Last saved at " + h(i(t.lastSavedAt)), 1)
        ], 64)) : $("", !0)
      ], 4)
    ], 4));
  }
}), ve = (t, d) => {
  const l = t.__vccOpts || t;
  for (const [r, i] of d)
    l[r] = i;
  return l;
}, je = /* @__PURE__ */ ve(Gt, [["__scopeId", "data-v-bf624780"]]), Qt = { class: "kb-section" }, Xt = { class: "kb-section__head" }, Zt = { class: "kb-section__desc" }, es = { class: "kb-field" }, ts = { class: "kb-label" }, ss = { class: "kb-field-with-rail" }, as = ["value", "aria-invalid", "aria-describedby"], ns = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, os = { class: "kb-field" }, ls = { class: "kb-label" }, is = { class: "kb-field-with-rail" }, rs = ["value", "aria-invalid", "aria-describedby"], ds = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, us = { class: "kb-field" }, cs = ["value", "aria-invalid", "aria-describedby"], ps = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, ms = { class: "kb-field" }, vs = ["value", "aria-invalid", "aria-describedby"], bs = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, gs = { class: "kb-field" }, ys = { class: "kb-location-row" }, fs = ["value"], ks = ["value"], hs = ["value"], _s = ["value"], $s = { class: "kb-field" }, ws = { class: "kb-actions-list" }, xs = ["value", "onInput"], Cs = ["value", "onInput"], Ss = ["onClick"], Is = ["disabled"], Us = { class: "kb-action-chips" }, Rs = ["disabled", "onClick"], Ls = /* @__PURE__ */ de({
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
  setup(t) {
    const d = t;
    return (l, r) => {
      var i, v, _, p;
      return a(), n("section", Qt, [
        e("div", Xt, [
          r[10] || (r[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: r[0] || (r[0] = (m) => l.$emit("reset"))
          }, " Reset section ")) : $("", !0)
        ]),
        e("p", Zt, " Message body is required. Title is optional. Character limits depend on the selected platform (" + h(t.selectedPlatform) + "). ", 1),
        e("div", es, [
          e("label", ts, [
            r[11] || (r[11] = X(" Title ", -1)),
            e("span", {
              class: me(["kb-counter", { "kb-counter--warn": t.titleCount > t.titleLimit }])
            }, h(t.titleCount) + "/" + h(t.titleLimit), 3)
          ]),
          e("div", ss, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: t.message.title,
              "aria-invalid": !!t.titleError,
              "aria-describedby": t.titleError ? "title-error" : void 0,
              onInput: r[1] || (r[1] = (m) => l.$emit("update", { title: m.target.value }))
            }, null, 40, as),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ne({ "--pct": Math.min(100, t.titleCount / t.titleLimit * 100) + "%" })
            }, [...r[12] || (r[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          t.titleError ? (a(), n("p", ns, h(t.titleError), 1)) : $("", !0)
        ]),
        e("div", os, [
          e("label", ls, [
            r[13] || (r[13] = X(" Message ", -1)),
            e("span", {
              class: me(["kb-counter", { "kb-counter--warn": t.bodyCount > t.bodyLimit }])
            }, h(t.bodyCount) + "/" + h(t.bodyLimit), 3)
          ]),
          e("div", is, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: t.message.body,
              "aria-invalid": !!t.bodyError,
              "aria-describedby": t.bodyError ? "body-error" : void 0,
              onInput: r[2] || (r[2] = (m) => l.$emit("update", { body: m.target.value }))
            }, null, 40, rs),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ne({ "--pct": Math.min(100, t.bodyCount / t.bodyLimit * 100) + "%" })
            }, [...r[14] || (r[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          t.bodyError ? (a(), n("p", ds, h(t.bodyError), 1)) : $("", !0)
        ]),
        e("div", us, [
          r[15] || (r[15] = e("label", { class: "kb-label" }, [
            X(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: t.message.image_url,
            "aria-invalid": !!t.imageUrlError,
            "aria-describedby": t.imageUrlError ? "image-url-error" : void 0,
            onInput: r[3] || (r[3] = (m) => l.$emit("update", { image_url: m.target.value || void 0 }))
          }, null, 40, cs),
          t.imageUrlError ? (a(), n("p", ps, h(t.imageUrlError), 1)) : $("", !0)
        ]),
        e("div", ms, [
          r[16] || (r[16] = e("label", { class: "kb-label" }, [
            X(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: t.message.deep_link,
            "aria-invalid": !!t.deepLinkError,
            "aria-describedby": t.deepLinkError ? "deeplink-error" : void 0,
            onInput: r[4] || (r[4] = (m) => l.$emit("update", { deep_link: m.target.value || void 0 }))
          }, null, 40, vs),
          t.deepLinkError ? (a(), n("p", bs, h(t.deepLinkError), 1)) : $("", !0)
        ]),
        e("div", gs, [
          r[17] || (r[17] = e("label", { class: "kb-label" }, [
            X(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", ys, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((i = t.message.location) == null ? void 0 : i.lat) ?? "",
              onInput: r[5] || (r[5] = (m) => {
                const I = { ...t.message.location ?? {} }, O = m.target.value;
                I.lat = O === "" ? void 0 : Number(O), l.$emit("update", { location: I });
              })
            }, null, 40, fs),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((v = t.message.location) == null ? void 0 : v.lon) ?? "",
              onInput: r[6] || (r[6] = (m) => {
                const I = { ...t.message.location ?? {} }, O = m.target.value;
                I.lon = O === "" ? void 0 : Number(O), l.$emit("update", { location: I });
              })
            }, null, 40, ks)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((_ = t.message.location) == null ? void 0 : _.name) ?? "",
            onInput: r[7] || (r[7] = (m) => {
              const I = { ...t.message.location ?? {} };
              I.name = m.target.value || void 0, l.$emit("update", { location: I });
            })
          }, null, 40, hs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((p = t.message.location) == null ? void 0 : p.address) ?? "",
            onInput: r[8] || (r[8] = (m) => {
              const I = { ...t.message.location ?? {} };
              I.address = m.target.value || void 0, l.$emit("update", { location: I });
            })
          }, null, 40, _s)
        ]),
        e("div", $s, [
          r[19] || (r[19] = e("label", { class: "kb-label" }, [
            X(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", ws, [
            (a(!0), n(F, null, Y(d.message.actions ?? [], (m, I) => (a(), n("div", {
              key: m.id || I,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: m.label,
                onInput: (O) => {
                  var A;
                  const L = [...d.message.actions ?? []], y = Number(I);
                  L[y] = {
                    ...L[y],
                    id: ((A = L[y]) == null ? void 0 : A.id) || `action_${y + 1}`,
                    label: O.target.value
                  }, l.$emit("update", { actions: L });
                }
              }, null, 40, xs),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: m.url,
                onInput: (O) => {
                  var A;
                  const L = [...d.message.actions ?? []], y = Number(I);
                  L[y] = {
                    ...L[y],
                    id: ((A = L[y]) == null ? void 0 : A.id) || `action_${y + 1}`,
                    url: O.target.value || void 0
                  }, l.$emit("update", { actions: L });
                }
              }, null, 40, Cs),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const O = [...d.message.actions ?? []];
                  O.splice(Number(I), 1), l.$emit("update", { actions: O });
                }
              }, " Remove ", 8, Ss)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (d.message.actions ?? []).length >= 3,
              onClick: r[9] || (r[9] = () => {
                const m = [...d.message.actions ?? []];
                m.push({
                  id: `action_${m.length + 1}`,
                  label: "",
                  url: ""
                }), l.$emit("update", { actions: m });
              })
            }, " Add action ", 8, Is),
            e("div", Us, [
              r[18] || (r[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (a(), n(F, null, Y(["View order", "Track shipment", "Open app"], (m) => e("button", {
                key: m,
                type: "button",
                class: "kb-action-chip",
                disabled: (d.message.actions ?? []).length >= 3,
                onClick: () => {
                  const I = [...d.message.actions ?? []];
                  I.push({
                    id: `action_${Date.now()}`,
                    label: m,
                    url: ""
                  }), l.$emit("update", { actions: I });
                }
              }, h(m), 9, Rs)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), As = /* @__PURE__ */ ve(Ls, [["__scopeId", "data-v-7bc3a44c"]]), Bs = { class: "kb-section kb-section--inline-personalization" }, Ts = { class: "kb-field" }, Ps = { class: "kb-insert-row" }, Vs = ["value"], Es = { class: "kb-field" }, Os = { class: "kb-insert-row" }, Ms = { class: "kb-field" }, Ns = { class: "kb-variable-list" }, Ds = /* @__PURE__ */ de({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(t, { emit: d }) {
    const l = t, r = d, i = ["first_name", "last_name", "order_id", "city"], v = G(l.variableOptions ?? i), _ = G(v.value[0] ?? i[0]), p = G("");
    he(
      () => l.variableOptions,
      (L) => {
        L && L.length && (v.value = [...L], v.value.includes(_.value) || (_.value = v.value[0]));
      }
    );
    const m = U(() => v.value);
    function I(L) {
      r("insertVariable", { variable: _.value, field: L });
    }
    function O() {
      const L = p.value.trim();
      L && (v.value.includes(L) || (v.value = [...v.value, L]), _.value = L, p.value = "");
    }
    return (L, y) => (a(), n("section", Bs, [
      y[8] || (y[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      y[9] || (y[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ts, [
        y[4] || (y[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ps, [
          Ue(e("select", {
            "onUpdate:modelValue": y[0] || (y[0] = (A) => _.value = A),
            class: "kb-select"
          }, [
            (a(!0), n(F, null, Y(m.value, (A) => (a(), n("option", {
              key: A,
              value: A
            }, h(A), 9, Vs))), 128))
          ], 512), [
            [Oe, _.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: y[1] || (y[1] = (A) => I("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: y[2] || (y[2] = (A) => I("body"))
          }, "Into message")
        ])
      ]),
      e("div", Es, [
        y[5] || (y[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Os, [
          Ue(e("input", {
            "onUpdate:modelValue": y[3] || (y[3] = (A) => p.value = A),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [Je, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: O
          }, " Add ")
        ])
      ]),
      e("div", Ms, [
        y[6] || (y[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        y[7] || (y[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ns, [
          (a(!0), n(F, null, Y(m.value, (A) => (a(), n("li", { key: A }, [
            e("code", null, "{{ " + h(A) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), gt = /* @__PURE__ */ ve(Ds, [["__scopeId", "data-v-6d49f6dc"]]), zs = { class: "kb-section kb-section--template-type" }, Hs = { class: "kb-field" }, Ws = { class: "kb-radio-group" }, Fs = { class: "kb-radio" }, js = ["checked"], qs = { class: "kb-radio" }, Ks = ["checked"], Ys = /* @__PURE__ */ de({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(t, { emit: d }) {
    const l = d;
    return (r, i) => (a(), n("section", zs, [
      i[5] || (i[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      i[6] || (i[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Hs, [
        e("div", Ws, [
          e("label", Fs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: t.templateType === "transactional",
              onChange: i[0] || (i[0] = (v) => l("update", "transactional"))
            }, null, 40, js),
            i[2] || (i[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", qs, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: t.templateType === "marketing",
              onChange: i[1] || (i[1] = (v) => l("update", "marketing"))
            }, null, 40, Ks),
            i[3] || (i[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        i[4] || (i[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), qe = /* @__PURE__ */ ve(Ys, [["__scopeId", "data-v-991f74e5"]]), Js = { class: "kb-section" }, Gs = { class: "kb-section__head" }, Qs = { class: "kb-section__desc" }, Xs = { class: "kb-field" }, Zs = { class: "kb-radio-group" }, ea = { class: "kb-radio" }, ta = ["checked"], sa = { class: "kb-radio" }, aa = ["checked"], na = {
  key: 0,
  class: "kb-field kb-row"
}, oa = ["value"], la = ["value"], ia = { class: "kb-field" }, ra = ["value"], da = ["value"], ua = { class: "kb-field" }, ca = ["value"], pa = ["value"], ma = { class: "kb-field" }, va = { class: "kb-checkbox" }, ba = ["checked"], ga = /* @__PURE__ */ de({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t) {
    const d = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (l, r) => {
      var i;
      return a(), n("section", Js, [
        e("div", Gs, [
          r[8] || (r[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: r[0] || (r[0] = (v) => l.$emit("reset"))
          }, " Reset section ")) : $("", !0)
        ]),
        e("p", Qs, h(t.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Xs, [
          r[11] || (r[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Zs, [
            e("label", ea, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !t.delivery.scheduled_at,
                onChange: r[1] || (r[1] = (v) => l.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, ta),
              r[9] || (r[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", sa, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!t.delivery.scheduled_at,
                onChange: r[2] || (r[2] = (v) => l.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, aa),
              r[10] || (r[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        t.delivery.scheduled_at ? (a(), n("div", na, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (i = t.delivery.scheduled_at) == null ? void 0 : i.slice(0, 16),
            onInput: r[3] || (r[3] = (v) => l.$emit("update", { scheduled_at: v.target.value }))
          }, null, 40, oa),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: t.delivery.timezone,
            onInput: r[4] || (r[4] = (v) => l.$emit("update", { timezone: v.target.value }))
          }, null, 40, la)
        ])) : $("", !0),
        t.showPushOptions ? (a(), n(F, { key: 1 }, [
          e("div", ia, [
            r[12] || (r[12] = e("label", { class: "kb-label" }, [
              X(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: t.delivery.ttl,
              onChange: r[5] || (r[5] = (v) => l.$emit("update", { ttl: Number(v.target.value) }))
            }, [
              (a(!0), n(F, null, Y(c(St), (v) => (a(), n("option", {
                key: v,
                value: v
              }, h(d[v] ?? v + "s"), 9, da))), 128))
            ], 40, ra)
          ]),
          e("div", ua, [
            r[13] || (r[13] = e("label", { class: "kb-label" }, [
              X(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: t.delivery.priority,
              onChange: r[6] || (r[6] = (v) => l.$emit("update", { priority: v.target.value }))
            }, [
              (a(!0), n(F, null, Y(c(dt), (v) => (a(), n("option", {
                key: v,
                value: v
              }, h(v), 9, pa))), 128))
            ], 40, ca)
          ]),
          e("div", ma, [
            e("label", va, [
              e("input", {
                type: "checkbox",
                checked: t.delivery.quiet_hours,
                onChange: r[7] || (r[7] = (v) => l.$emit("update", { quiet_hours: !t.delivery.quiet_hours }))
              }, null, 40, ba),
              r[14] || (r[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : $("", !0)
      ]);
    };
  }
}), ya = /* @__PURE__ */ ve(ga, [["__scopeId", "data-v-a208b72f"]]), fa = { class: "kb-accordion" }, ka = { class: "kb-accordion__body" }, ha = { class: "kb-field" }, _a = ["value"], $a = { class: "kb-field" }, wa = { class: "kb-checkbox" }, xa = ["checked"], Ca = /* @__PURE__ */ de({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(t) {
    return (d, l) => (a(), n("details", fa, [
      l[4] || (l[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", ka, [
        e("div", ha, [
          l[2] || (l[2] = e("label", { class: "kb-label" }, [
            X(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: t.delivery.collapse_key,
            onInput: l[0] || (l[0] = (r) => d.$emit("update", { collapse_key: r.target.value || void 0 }))
          }, null, 40, _a)
        ]),
        e("div", $a, [
          e("label", wa, [
            e("input", {
              type: "checkbox",
              checked: t.delivery.silent_push,
              onChange: l[1] || (l[1] = (r) => d.$emit("update", { silent_push: !t.delivery.silent_push }))
            }, null, 40, xa),
            l[3] || (l[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Sa = /* @__PURE__ */ ve(Ca, [["__scopeId", "data-v-e0f5c559"]]);
function Te(t, d) {
  return !t || typeof t != "string" ? t : t.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (l, r) => {
    const i = r.trim();
    return i in d ? String(d[i]) : `{{ ${r} }}`;
  });
}
const Ve = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Ia = { class: "kb-preview" }, Ua = {
  key: 0,
  class: "kb-preview__toggle"
}, Ra = { class: "kb-checkbox" }, La = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, Aa = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, Ba = ["src"], Ta = { class: "kb-android-body-row" }, Pa = { class: "kb-android-body-content" }, Va = {
  key: 0,
  class: "kb-android-title"
}, Ea = {
  key: 1,
  class: "kb-android-text"
}, Oa = {
  key: 2,
  class: "kb-android-location-line"
}, Ma = {
  key: 0,
  class: "kb-android-thumb"
}, Na = ["src"], Da = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, za = ["src"], Ha = {
  key: 0,
  class: "kb-preview-map__caption"
}, Wa = {
  key: 2,
  class: "kb-android-actions"
}, Fa = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, ja = { class: "kb-ios-banner" }, qa = { class: "kb-ios-content" }, Ka = {
  key: 0,
  class: "kb-ios-title"
}, Ya = {
  key: 1,
  class: "kb-ios-text"
}, Ja = {
  key: 2,
  class: "kb-preview-map kb-preview-map--ios"
}, Ga = ["src"], Qa = {
  key: 0,
  class: "kb-preview-map__caption"
}, Xa = {
  key: 3,
  class: "kb-ios-actions"
}, Za = {
  key: 0,
  class: "kb-ios-thumb"
}, en = ["src"], tn = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, sn = { class: "kb-web-toast" }, an = { class: "kb-web-body" }, nn = {
  key: 0,
  class: "kb-web-title"
}, on = {
  key: 1,
  class: "kb-web-text"
}, ln = {
  key: 2,
  class: "kb-web-image"
}, rn = ["src"], dn = {
  key: 3,
  class: "kb-preview-map kb-preview-map--web"
}, un = ["src"], cn = {
  key: 0,
  class: "kb-preview-map__caption"
}, pn = {
  key: 0,
  class: "kb-web-actions"
}, mn = /* @__PURE__ */ de({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(t) {
    const d = t, l = G(!1), r = U(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? l.value : void 0
      })
    ), i = U(() => {
      const p = r.value;
      return d.previewProfile ? {
        ...p,
        title: Te((p == null ? void 0 : p.title) ?? "", d.previewProfile.data),
        body: Te((p == null ? void 0 : p.body) ?? "", d.previewProfile.data)
      } : p;
    }), v = U(() => {
      var y;
      const p = (y = i.value) == null ? void 0 : y.location;
      if (!p || p.lat == null && p.lon == null) return null;
      const m = Number(p.lat) || 0, I = Number(p.lon) || 0, O = 8e-3, L = [I - O, m - O, I + O, m + O].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(L)}&layer=mapnik&marker=${m},${I}`;
    }), _ = U(() => {
      var m;
      const p = (m = i.value) == null ? void 0 : m.location;
      return p && (p.lat != null || p.lon != null || p.name || p.address);
    });
    return (p, m) => {
      var I, O, L, y, A, E, z, R, w, ee, ie, ce, ue, pe, be, _e;
      return a(), n("div", Ia, [
        t.selectedPlatform === "android" ? (a(), n("div", Ua, [
          e("label", Ra, [
            Ue(e("input", {
              "onUpdate:modelValue": m[0] || (m[0] = (oe) => l.value = oe),
              type: "checkbox"
            }, null, 512), [
              [$t, l.value]
            ]),
            m[1] || (m[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : $("", !0),
        t.selectedPlatform === "android" ? (a(), n("div", La, [
          m[4] || (m[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: me(["kb-android-notification", { "kb-android-notification--expanded": l.value }])
          }, [
            m[3] || (m[3] = Me('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: me(["kb-android-body", { "kb-android-body--expanded": l.value }])
            }, [
              l.value && i.value.imageUrl ? (a(), n("div", Aa, [
                e("img", {
                  src: i.value.imageUrl,
                  alt: ""
                }, null, 8, Ba)
              ])) : $("", !0),
              e("div", Ta, [
                e("div", Pa, [
                  i.value.title ? (a(), n("div", Va, h(i.value.title), 1)) : $("", !0),
                  i.value.body ? (a(), n("div", Ea, h(i.value.body), 1)) : $("", !0),
                  _.value && !l.value && ((I = i.value.location) != null && I.name || (O = i.value.location) != null && O.address) ? (a(), n("div", Oa, [
                    m[2] || (m[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    X(" " + h(((L = i.value.location) == null ? void 0 : L.name) || ((y = i.value.location) == null ? void 0 : y.address)), 1)
                  ])) : $("", !0)
                ]),
                !l.value && i.value.imageUrl ? (a(), n("div", Ma, [
                  e("img", {
                    src: i.value.imageUrl,
                    alt: ""
                  }, null, 8, Na)
                ])) : $("", !0)
              ]),
              _.value && v.value && l.value ? (a(), n("div", Da, [
                e("iframe", {
                  src: v.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, za),
                (A = i.value.location) != null && A.name || (E = i.value.location) != null && E.address ? (a(), n("div", Ha, h(((z = i.value.location) == null ? void 0 : z.name) || ((R = i.value.location) == null ? void 0 : R.address)), 1)) : $("", !0)
              ])) : $("", !0),
              i.value.actions && i.value.actions.length ? (a(), n("div", Wa, [
                (a(!0), n(F, null, Y(i.value.actions, (oe) => (a(), n("button", {
                  key: oe.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, h(oe.label || "Action"), 1))), 128))
              ])) : $("", !0)
            ], 2)
          ], 2)
        ])) : t.selectedPlatform === "ios" ? (a(), n("div", Fa, [
          m[7] || (m[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", ja, [
            m[6] || (m[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", qa, [
              m[5] || (m[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              i.value.title ? (a(), n("div", Ka, h(i.value.title), 1)) : $("", !0),
              i.value.body ? (a(), n("div", Ya, h(i.value.body), 1)) : $("", !0),
              _.value && v.value ? (a(), n("div", Ja, [
                e("iframe", {
                  src: v.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Ga),
                (w = i.value.location) != null && w.name || (ee = i.value.location) != null && ee.address ? (a(), n("div", Qa, h(((ie = i.value.location) == null ? void 0 : ie.name) || ((ce = i.value.location) == null ? void 0 : ce.address)), 1)) : $("", !0)
              ])) : $("", !0),
              i.value.actions && i.value.actions.length ? (a(), n("div", Xa, [
                (a(!0), n(F, null, Y(i.value.actions, (oe) => (a(), n("button", {
                  key: oe.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, h(oe.label || "Action"), 1))), 128))
              ])) : $("", !0)
            ]),
            i.value.imageUrl ? (a(), n("div", Za, [
              e("img", {
                src: i.value.imageUrl,
                alt: ""
              }, null, 8, en)
            ])) : $("", !0)
          ])
        ])) : (a(), n("div", tn, [
          m[9] || (m[9] = Me('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", sn, [
            m[8] || (m[8] = Me('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", an, [
              i.value.title ? (a(), n("div", nn, h(i.value.title), 1)) : $("", !0),
              i.value.body ? (a(), n("div", on, h(i.value.body), 1)) : $("", !0),
              i.value.imageUrl ? (a(), n("div", ln, [
                e("img", {
                  src: i.value.imageUrl,
                  alt: ""
                }, null, 8, rn)
              ])) : $("", !0),
              _.value && v.value ? (a(), n("div", dn, [
                e("iframe", {
                  src: v.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, un),
                (ue = i.value.location) != null && ue.name || (pe = i.value.location) != null && pe.address ? (a(), n("div", cn, h(((be = i.value.location) == null ? void 0 : be.name) || ((_e = i.value.location) == null ? void 0 : _e.address)), 1)) : $("", !0)
              ])) : $("", !0)
            ]),
            i.value.actions && i.value.actions.length ? (a(), n("div", pn, [
              (a(!0), n(F, null, Y(i.value.actions, (oe, Q) => (a(), n("button", {
                key: oe.id || Q,
                type: "button",
                class: me(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(Q) > 0 }])
              }, h(oe.label || "Action"), 3))), 128))
            ])) : $("", !0)
          ])
        ]))
      ]);
    };
  }
}), vn = /* @__PURE__ */ ve(mn, [["__scopeId", "data-v-1d6293a0"]]), bn = { class: "kb-version-dialog" }, gn = {
  key: 0,
  class: "kb-version-empty"
}, yn = {
  key: 1,
  class: "kb-version-list"
}, fn = { class: "kb-version-item-label" }, kn = ["onClick"], hn = { class: "kb-version-actions" }, _n = /* @__PURE__ */ de({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(t, { emit: d }) {
    const l = d;
    function r(i) {
      try {
        return new Date(i).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return i;
      }
    }
    return (i, v) => t.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: v[1] || (v[1] = wt((_) => l("close"), ["escape"]))
    }, [
      e("div", bn, [
        v[2] || (v[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        v[3] || (v[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        t.versions.length === 0 ? (a(), n("div", gn, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", yn, [
          (a(!0), n(F, null, Y(t.versions, (_) => (a(), n("li", {
            key: _.id,
            class: "kb-version-item"
          }, [
            e("span", fn, h(_.label || r(_.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (p) => {
                l("restore", _.snapshot), l("close");
              }
            }, " Restore ", 8, kn)
          ]))), 128))
        ])),
        e("div", hn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: v[0] || (v[0] = (_) => l("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : $("", !0);
  }
}), yt = /* @__PURE__ */ ve(_n, [["__scopeId", "data-v-ce35a513"]]), at = [
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
], nt = [
  {
    id: "otp",
    label: "OTP",
    campaign: {
      message: {
        title: "",
        body: "Your code is {{ otp_code }}. Valid for 10 minutes.",
        variables: [],
        template_type: "text",
        template_name: "otp_verification"
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
        template_name: "auth_code",
        auth_code: "123 456"
      }
    }
  }
], ot = [
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
], lt = [
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
], $n = { class: "keos-notification-builder" }, wn = { class: "kb-builder-top" }, xn = { style: { margin: 0, paddingLeft: "1.25rem" } }, Cn = { class: "kb-push-layout" }, Sn = { class: "kb-push-sidebar" }, In = {
  key: 0,
  class: "kb-push-form"
}, Un = {
  key: 0,
  class: "kb-hint-card"
}, Rn = { class: "kb-push-form-head" }, Ln = { class: "kb-push-form-head-row" }, An = ["value"], Bn = {
  key: 1,
  class: "kb-push-form"
}, Tn = { class: "kb-push-canvas" }, Pn = {
  key: 0,
  class: "kb-push-test-banner"
}, Vn = { class: "kb-push-preview-chrome" }, En = { class: "kb-push-preview-controls" }, On = { class: "kb-push-preview-as" }, Mn = ["value"], Nn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Dn = ["aria-selected", "aria-controls", "onClick"], zn = { class: "kb-push-preview-frame" }, Hn = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Wn = { class: "kb-push-actions" }, Fn = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, jn = { class: "kb-confirm-dialog" }, qn = { class: "kb-confirm-actions" }, Kn = /* @__PURE__ */ de({
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
    designOnly: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate", "save-version"],
  setup(t, { emit: d }) {
    const l = t, r = d, i = G("android"), v = G(""), _ = G(!1), p = G(null), m = G(!1), I = U(() => E.value.workflow_status ?? "draft"), O = U(() => {
      const k = v.value;
      return k ? Ve.find((b) => b.id === k) ?? null : null;
    });
    function L(k) {
      const b = E.value, S = k.campaign.message ? { ...b.message, ...k.campaign.message } : b.message, Z = k.campaign.delivery ? { ...b.delivery, ...k.campaign.delivery } : b.delivery;
      ee({
        ...k.campaign,
        message: S,
        delivery: Z
      }), p.value = null, _.value = !1;
    }
    function y(k) {
      const b = k.target.value;
      if (!b) return;
      const S = at.find((Z) => Z.id === b);
      S && (z.value ? (p.value = S, _.value = !0) : L(S), k.target.value = "");
    }
    function A(k) {
      E.value = k, m.value = !1;
    }
    const {
      campaign: E,
      dirty: z,
      customValidatorErrors: R,
      getValidationWithWarnings: w,
      update: ee,
      updateMessage: ie,
      updateDelivery: ce,
      undo: ue,
      redo: pe,
      canUndo: be,
      canRedo: _e,
      resetMessage: oe,
      resetDelivery: Q,
      getPreview: j,
      characterLimits: se,
      hooks: x
    } = We({
      initial: l.modelValue,
      hooks: {
        ...l.hooks,
        customValidators: async (k) => {
          var Z, ae, g, o;
          const b = [];
          (Z = k.name) != null && Z.trim() || b.push("Template name is required"), (g = (ae = k.message) == null ? void 0 : ae.body) != null && g.trim() || b.push("Message body is required");
          const S = (o = l.hooks) != null && o.customValidators ? await l.hooks.customValidators(k) : [];
          return [...b, ...S];
        }
      },
      onDirty: () => r("change", E.value)
    }), { lastSavedAt: le } = Fe(E, { channel: "push" });
    function ye(k) {
      (k.metaKey || k.ctrlKey) && k.key === "z" && (k.preventDefault(), k.shiftKey ? pe() : ue());
    }
    Ne(() => {
      window.addEventListener("keydown", ye);
    }), De(() => {
      window.removeEventListener("keydown", ye);
    }), he(
      E,
      (k) => r("update:modelValue", k),
      { deep: !0 }
    );
    const fe = G(), Re = G(!0), Ae = G(!0);
    async function Se() {
      if (x.estimateReach)
        try {
          fe.value = await x.estimateReach(E.value.audience);
        } catch {
          fe.value = void 0;
        }
      x.canSend && (Re.value = await Promise.resolve(x.canSend())), x.canSchedule && (Ae.value = await Promise.resolve(x.canSchedule()));
    }
    Se(), he(() => E.value.audience, Se, { deep: !0 });
    const ke = U(() => (R.value, w(fe.value))), $e = U(() => ke.value.blockingErrors), Le = U(() => ke.value.warnings), B = U(() => ke.value.valid), N = U(() => se[i.value].title), K = U(() => se[i.value].body), re = U(() => E.value.message.title.length), D = U(() => E.value.message.body.length), H = U(() => {
      if (re.value > N.value) return `Title exceeds ${N.value} characters for ${i.value}.`;
    }), J = U(() => {
      const k = $e.value.find((b) => b.message === "Message body is required");
      if (k) return k.message;
      if (D.value > K.value) return `Body exceeds ${K} characters for ${i.value}.`;
    }), xe = U(() => E.value.template_type ?? "transactional");
    function W(k) {
      ee({ template_type: k });
    }
    function f(k) {
      ee({
        name: k,
        tracking: { ...E.value.tracking ?? {}, campaign_name: k }
      });
    }
    function T(k) {
      const b = ` {{ ${k.variable} }}`, S = E.value.message.variables ?? [], Z = Array.from(/* @__PURE__ */ new Set([...S, k.variable]));
      k.field === "title" ? ie({
        title: E.value.message.title + b,
        variables: Z
      }) : ie({
        body: E.value.message.body + b,
        variables: Z
      });
    }
    function C() {
      B.value && r("save", E.value);
    }
    return (k, b) => (a(), n("div", $n, [
      e("div", wn, [
        ge(je, {
          "campaign-name": c(E).name,
          status: c(E).status,
          dirty: c(z),
          "last-saved-at": c(le),
          "can-undo": c(be),
          "can-redo": c(_e),
          "workflow-status": I.value,
          "onUpdate:campaignName": f,
          "onUpdate:workflowStatus": b[0] || (b[0] = (S) => c(ee)({ workflow_status: S })),
          onUndo: c(ue),
          onRedo: c(pe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "onUndo", "onRedo"]),
        $e.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({ background: c(te).dangerBg, border: `1px solid ${c(te).dangerBorder}`, borderRadius: `${c(Ce).input}px`, padding: `${c(q)[12]}px ${c(q)[16]}px`, marginBottom: `${c(q)[16]}px` })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(F, null, Y($e.value, (S) => (a(), n("li", {
              key: S.message
            }, h(S.message), 1))), 128))
          ], 4)
        ], 4)) : $("", !0),
        Le.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({ background: c(te).neutral.bg, border: `1px solid ${c(te).neutral.border}`, borderRadius: `${c(Ce).input}px`, padding: `${c(q)[12]}px ${c(q)[16]}px`, marginBottom: `${c(q)[16]}px`, fontSize: "0.875rem", color: c(te).neutral.textMuted })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", xn, [
            (a(!0), n(F, null, Y(Le.value, (S) => (a(), n("li", {
              key: S.message
            }, h(S.message), 1))), 128))
          ])
        ], 4)) : $("", !0)
      ]),
      e("div", Cn, [
        e("aside", Sn, [
          t.disabledSections.includes("message") ? $("", !0) : (a(), n("div", In, [
            !c(E).message.title && !c(E).message.body ? (a(), n("div", Un, " Add a title and message below to get started. ")) : $("", !0),
            e("div", Rn, [
              b[13] || (b[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", Ln, [
                ge(qe, {
                  "template-type": xe.value,
                  onUpdate: W
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: y
                }, [
                  b[12] || (b[12] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(F, null, Y(c(at), (S) => (a(), n("option", {
                    key: S.id,
                    value: S.id
                  }, h(S.label), 9, An))), 128))
                ], 32)
              ])
            ]),
            ge(As, {
              message: c(E).message,
              "title-count": re.value,
              "body-count": D.value,
              "title-limit": N.value,
              "body-limit": K.value,
              "selected-platform": i.value,
              "show-reset": !0,
              "title-error": H.value,
              "body-error": J.value,
              onUpdate: c(ie),
              onReset: b[1] || (b[1] = (S) => c(oe)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            ge(gt, {
              message: c(E).message,
              "variable-options": t.variableOptions,
              onUpdate: c(ie),
              onInsertVariable: T
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !t.designOnly && !t.disabledSections.includes("delivery") ? (a(), n("div", Bn, [
            b[14] || (b[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            ge(ya, {
              delivery: c(E).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: c(ce),
              onReset: b[2] || (b[2] = (S) => c(Q)())
            }, null, 8, ["delivery", "onUpdate"]),
            ge(Sa, {
              delivery: c(E).delivery,
              onUpdate: c(ce)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : $("", !0)
        ]),
        e("main", Tn, [
          !t.designOnly && c(E).audience.test_mode ? (a(), n("div", Pn, [...b[15] || (b[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : $("", !0),
          e("div", Vn, [
            e("div", En, [
              e("label", On, [
                b[17] || (b[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": b[3] || (b[3] = (S) => v.value = S),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  b[16] || (b[16] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(F, null, Y(c(Ve), (S) => (a(), n("option", {
                    key: S.id,
                    value: S.id
                  }, h(S.label), 9, Mn))), 128))
                ], 512), [
                  [Oe, v.value]
                ])
              ])
            ]),
            e("div", Nn, [
              (a(), n(F, null, Y(["android", "ios", "web"], (S) => e("button", {
                key: S,
                type: "button",
                class: me(["kb-push-device-btn", { "kb-push-device-btn--active": i.value === S }]),
                role: "tab",
                "aria-selected": i.value === S,
                "aria-controls": `kb-preview-panel-${S}`,
                onClick: (Z) => i.value = S
              }, h(S.toUpperCase()), 11, Dn)), 64))
            ]),
            e("div", zn, [
              !c(E).message.title && !c(E).message.body ? (a(), n("div", Hn, [...b[18] || (b[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, "Start adding content to see a live preview here.", -1)
              ])])) : (a(), xt(vn, {
                key: 1,
                "get-preview": c(j),
                "selected-platform": i.value,
                "preview-profile": O.value,
                "onUpdate:selectedPlatform": b[4] || (b[4] = (S) => i.value = S)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", Wn, [
        !t.designOnly && t.showHistory ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: b[5] || (b[5] = (S) => m.value = !0)
        }, " Version history ")) : $("", !0),
        !t.designOnly && t.showSaveVersion ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: b[6] || (b[6] = (S) => r("save-version", JSON.parse(JSON.stringify(c(E)))))
        }, " Save as version ")) : $("", !0),
        t.showDuplicate ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: b[7] || (b[7] = (S) => r("duplicate", JSON.parse(JSON.stringify(c(E)))))
        }, " Duplicate ")) : $("", !0),
        t.showSave ? (a(), n("button", {
          key: 3,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: C
        }, " Save ")) : $("", !0),
        t.showClose ? (a(), n("button", {
          key: 4,
          type: "button",
          class: "kb-push-action kb-push-action--primary",
          onClick: b[8] || (b[8] = (S) => r("edit"))
        }, " Close ")) : $("", !0)
      ]),
      _.value ? (a(), n("div", Fn, [
        e("div", jn, [
          b[19] || (b[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          b[20] || (b[20] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", qn, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: b[9] || (b[9] = (S) => {
                _.value = !1, p.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: b[10] || (b[10] = (S) => p.value && L(p.value))
            }, "Replace")
          ])
        ])
      ])) : $("", !0),
      ge(yt, {
        open: m.value,
        versions: t.versions,
        onClose: b[11] || (b[11] = (S) => m.value = !1),
        onRestore: A
      }, null, 8, ["open", "versions"])
    ]));
  }
}), ft = /* @__PURE__ */ ve(Kn, [["__scopeId", "data-v-11b2a325"]]), Yn = { class: "kb-section" }, Jn = { class: "kb-section__head" }, Gn = { class: "kb-field" }, Qn = ["value"], Xn = { class: "kb-field" }, Zn = ["value"], eo = {
  key: 0,
  class: "kb-field"
}, to = ["value"], so = {
  key: 1,
  class: "kb-field"
}, ao = ["value"], no = {
  key: 2,
  class: "kb-field kb-field--inline"
}, oo = { class: "kb-location-row" }, lo = ["value"], io = ["value"], ro = ["value"], uo = ["value"], co = {
  key: 3,
  class: "kb-field"
}, po = ["value"], mo = {
  key: 4,
  class: "kb-field"
}, vo = ["value"], bo = {
  key: 5,
  class: "kb-field"
}, go = { class: "kb-wa-buttons" }, yo = ["value", "onInput"], fo = ["value", "onInput"], ko = ["onClick"], ho = {
  key: 6,
  class: "kb-field"
}, _o = ["value"], $o = ["value"], wo = { class: "kb-field" }, xo = ["value"], Co = { class: "kb-field" }, So = ["value"], Io = {
  key: 7,
  class: "kb-field kb-wa-template-fields"
}, Uo = { class: "kb-wa-fields-list" }, Ro = { class: "kb-wa-field-name" }, Lo = { class: "kb-wa-field-status" }, Ao = { class: "kb-field" }, Bo = ["value"], To = { class: "kb-field" }, Po = { class: "kb-wa-buttons" }, Vo = ["value", "onInput"], Eo = ["value", "onChange"], Oo = ["value", "onInput"], Mo = ["value", "onInput"], No = ["onClick"], Do = ["disabled"], zo = /* @__PURE__ */ de({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: d }) {
    const l = t, r = d;
    function i(_) {
      if (!_ || typeof _ != "string") return [];
      const p = /\{\{\s*([^}]+?)\s*\}\}/g, m = /* @__PURE__ */ new Set();
      let I;
      for (; (I = p.exec(_)) !== null; ) m.add(I[1].trim());
      return Array.from(m);
    }
    const v = U(() => {
      const _ = l.message.header ?? "", p = l.message.body ?? l.message.body ?? "", m = new Set(l.message.variables ?? []), I = [...i(_), ...i(p)];
      return Array.from(new Set(I)).map((L) => ({ name: L, configured: m.has(L) }));
    });
    return (_, p) => {
      var m, I, O, L;
      return a(), n("section", Yn, [
        e("div", Jn, [
          p[18] || (p[18] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (y) => _.$emit("reset"))
          }, " Reset section ")) : $("", !0)
        ]),
        p[37] || (p[37] = e("p", { class: "kb-section__desc" }, " Configure how this campaign will look when sent as a WhatsApp template message. ", -1)),
        e("div", Gn, [
          p[20] || (p[20] = e("label", { class: "kb-label" }, [
            X(" Template type "),
            e("span", { class: "kb-helper" }, "Match the content type approved in WhatsApp (text, media, coupon, offer, catalog, etc.).")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: l.message.template_type ?? "text",
            onChange: p[1] || (p[1] = (y) => r("update", {
              template_type: y.target.value
            }))
          }, [...p[19] || (p[19] = [
            Me('<option value="text" data-v-b3ddb55c>Text</option><option value="image" data-v-b3ddb55c>Image</option><option value="video" data-v-b3ddb55c>Video</option><option value="document" data-v-b3ddb55c>Document</option><option value="location" data-v-b3ddb55c>Location</option><option value="coupon" data-v-b3ddb55c>Coupon code</option><option value="lto" data-v-b3ddb55c>Limited time offer</option><option value="mpm" data-v-b3ddb55c>Multi product message</option><option value="catalog" data-v-b3ddb55c>Catalog</option><option value="auth" data-v-b3ddb55c>Authentication</option>', 10)
          ])], 40, Qn)
        ]),
        e("div", Xn, [
          p[21] || (p[21] = e("label", { class: "kb-label" }, [
            X(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: l.message.template_name ?? "",
            onInput: p[2] || (p[2] = (y) => r("update", {
              template_name: y.target.value || void 0
            }))
          }, null, 40, Zn)
        ]),
        ["image", "video", "document"].includes(l.message.template_type ?? "text") ? (a(), n("div", eo, [
          p[22] || (p[22] = e("label", { class: "kb-label" }, [
            X(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: l.message.media_url ?? "",
            onInput: p[3] || (p[3] = (y) => r("update", {
              media_url: y.target.value || void 0
            }))
          }, null, 40, to)
        ])) : $("", !0),
        ["image", "video", "document"].includes(l.message.template_type ?? "text") ? (a(), n("div", so, [
          p[23] || (p[23] = e("label", { class: "kb-label" }, [
            X(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: l.message.media_caption ?? "",
            onInput: p[4] || (p[4] = (y) => r("update", {
              media_caption: y.target.value || void 0
            }))
          }, null, 40, ao)
        ])) : $("", !0),
        l.message.template_type === "location" ? (a(), n("div", no, [
          p[24] || (p[24] = e("label", { class: "kb-label" }, [
            X(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", oo, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((m = l.message.location) == null ? void 0 : m.lat) ?? "",
              onInput: p[5] || (p[5] = (y) => {
                const A = { ...l.message.location ?? {} };
                A.lat = Number(y.target.value), r("update", { location: A });
              })
            }, null, 40, lo),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((I = l.message.location) == null ? void 0 : I.lon) ?? "",
              onInput: p[6] || (p[6] = (y) => {
                const A = { ...l.message.location ?? {} };
                A.lon = Number(y.target.value), r("update", { location: A });
              })
            }, null, 40, io)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((O = l.message.location) == null ? void 0 : O.name) ?? "",
            onInput: p[7] || (p[7] = (y) => {
              const A = { ...l.message.location ?? {} };
              A.name = y.target.value || void 0, r("update", { location: A });
            })
          }, null, 40, ro),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((L = l.message.location) == null ? void 0 : L.address) ?? "",
            onInput: p[8] || (p[8] = (y) => {
              const A = { ...l.message.location ?? {} };
              A.address = y.target.value || void 0, r("update", { location: A });
            })
          }, null, 40, uo)
        ])) : $("", !0),
        l.message.template_type === "coupon" ? (a(), n("div", co, [
          p[25] || (p[25] = e("label", { class: "kb-label" }, [
            X(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: l.message.coupon_code ?? "",
            onInput: p[9] || (p[9] = (y) => r("update", {
              coupon_code: y.target.value || void 0
            }))
          }, null, 40, po)
        ])) : $("", !0),
        l.message.template_type === "lto" ? (a(), n("div", mo, [
          p[26] || (p[26] = e("label", { class: "kb-label" }, [
            X(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: l.message.lto_expiry ?? "",
            onInput: p[10] || (p[10] = (y) => r("update", {
              lto_expiry: y.target.value || void 0
            }))
          }, null, 40, vo)
        ])) : $("", !0),
        ["mpm", "catalog"].includes(l.message.template_type) ? (a(), n("div", bo, [
          p[27] || (p[27] = e("label", { class: "kb-label" }, [
            X(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", go, [
            (a(!0), n(F, null, Y(l.message.products ?? [], (y, A) => (a(), n("div", {
              key: y.id || A,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: y.productId,
                onInput: (E) => {
                  var w;
                  const z = [...l.message.products ?? []], R = Number(A);
                  z[R] = {
                    ...z[R],
                    id: ((w = z[R]) == null ? void 0 : w.id) || `prod_${R + 1}`,
                    productId: E.target.value
                  }, r("update", { products: z });
                }
              }, null, 40, yo),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: y.sectionTitle,
                onInput: (E) => {
                  var w;
                  const z = [...l.message.products ?? []], R = Number(A);
                  z[R] = {
                    ...z[R],
                    id: ((w = z[R]) == null ? void 0 : w.id) || `prod_${R + 1}`,
                    sectionTitle: E.target.value || void 0
                  }, r("update", { products: z });
                }
              }, null, 40, fo),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const E = [...l.message.products ?? []];
                  E.splice(Number(A), 1), r("update", { products: E });
                }
              }, " Remove ", 8, ko)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: p[11] || (p[11] = () => {
                const A = [...l.message.products ?? []];
                A.push({
                  id: `prod_${A.length + 1}`,
                  productId: ""
                }), r("update", { products: A });
              })
            }, " Add product ")
          ])
        ])) : $("", !0),
        l.message.template_type === "auth" ? (a(), n("div", ho, [
          p[29] || (p[29] = e("label", { class: "kb-label" }, [
            X(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: l.message.auth_type ?? "otp",
            onChange: p[12] || (p[12] = (y) => r("update", {
              auth_type: y.target.value
            }))
          }, [...p[28] || (p[28] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, _o),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: l.message.auth_label ?? "",
            onInput: p[13] || (p[13] = (y) => r("update", {
              auth_label: y.target.value || void 0
            }))
          }, null, 40, $o)
        ])) : $("", !0),
        e("div", wo, [
          p[30] || (p[30] = e("label", { class: "kb-label" }, [
            X(" Header (optional) "),
            e("span", { class: "kb-helper" }, "Short text or variable used as the WhatsApp template header.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: l.message.header ?? "",
            onInput: p[14] || (p[14] = (y) => r("update", {
              header: y.target.value || void 0
            }))
          }, null, 40, xo)
        ]),
        e("div", Co, [
          p[31] || (p[31] = e("label", { class: "kb-label" }, [
            X(" Body "),
            e("span", { class: "kb-helper" }, " Use the exact template body including variables like " + h(1) + ", " + h(2) + " as approved in WhatsApp. ")
          ], -1)),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: l.message.body ?? "",
            onInput: p[15] || (p[15] = (y) => r("update", {
              body: y.target.value || void 0
            }))
          }, null, 40, So)
        ]),
        v.value.length > 0 ? (a(), n("div", Io, [
          p[32] || (p[32] = e("label", { class: "kb-label" }, "Template fields", -1)),
          p[33] || (p[33] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", Uo, [
            (a(!0), n(F, null, Y(v.value, (y) => (a(), n("li", {
              key: y.name,
              class: me(["kb-wa-field-item", { "kb-wa-field-item--ok": y.configured }])
            }, [
              e("span", Ro, h(y.name), 1),
              e("span", Lo, h(y.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : $("", !0),
        e("div", Ao, [
          p[34] || (p[34] = e("label", { class: "kb-label" }, [
            X(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: l.message.footer ?? "",
            onInput: p[16] || (p[16] = (y) => r("update", {
              footer: y.target.value || void 0
            }))
          }, null, 40, Bo)
        ]),
        e("div", To, [
          p[36] || (p[36] = e("label", { class: "kb-label" }, [
            X(" Buttons (optional) "),
            e("span", { class: "kb-helper" }, " Add quick replies or call-to-action buttons. Order should match your provider configuration. ")
          ], -1)),
          e("div", Po, [
            (a(!0), n(F, null, Y(l.message.buttons ?? [], (y, A) => (a(), n("div", {
              key: y.id || A,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: y.label,
                onInput: (E) => {
                  var w;
                  const z = [...l.message.buttons ?? []], R = Number(A);
                  z[R] = {
                    ...z[R],
                    id: ((w = z[R]) == null ? void 0 : w.id) || `btn_${R + 1}`,
                    label: E.target.value
                  }, r("update", { buttons: z });
                }
              }, null, 40, Vo),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: y.type ?? "quick_reply",
                onChange: (E) => {
                  var w;
                  const z = [...l.message.buttons ?? []], R = Number(A);
                  z[R] = {
                    ...z[R],
                    id: ((w = z[R]) == null ? void 0 : w.id) || `btn_${R + 1}`,
                    type: E.target.value
                  }, r("update", { buttons: z });
                }
              }, [...p[35] || (p[35] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1)
              ])], 40, Eo),
              y.type === "url" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: y.url,
                onInput: (E) => {
                  var w;
                  const z = [...l.message.buttons ?? []], R = Number(A);
                  z[R] = {
                    ...z[R],
                    id: ((w = z[R]) == null ? void 0 : w.id) || `btn_${R + 1}`,
                    url: E.target.value || void 0
                  }, r("update", { buttons: z });
                }
              }, null, 40, Oo)) : y.type === "call" ? (a(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: y.phone,
                onInput: (E) => {
                  var w;
                  const z = [...l.message.buttons ?? []], R = Number(A);
                  z[R] = {
                    ...z[R],
                    id: ((w = z[R]) == null ? void 0 : w.id) || `btn_${R + 1}`,
                    phone: E.target.value || void 0
                  }, r("update", { buttons: z });
                }
              }, null, 40, Mo)) : $("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const E = [...l.message.buttons ?? []];
                  E.splice(Number(A), 1), r("update", { buttons: E });
                }
              }, " Remove ", 8, No)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: (l.message.buttons ?? []).length >= 3,
              onClick: p[17] || (p[17] = () => {
                const A = [...l.message.buttons ?? []];
                A.push({
                  id: `btn_${A.length + 1}`,
                  label: "",
                  type: "quick_reply"
                }), r("update", { buttons: A });
              })
            }, " Add button ", 8, Do)
          ])
        ])
      ]);
    };
  }
}), Ho = /* @__PURE__ */ ve(zo, [["__scopeId", "data-v-b3ddb55c"]]), Wo = { class: "phone-theme-toggle" }, Fo = { class: "chat-area" }, jo = { class: "bubble" }, qo = {
  key: 0,
  class: "header"
}, Ko = {
  key: 0,
  class: "header-text"
}, Yo = ["src"], Jo = ["src"], Go = {
  key: 3,
  class: "document"
}, Qo = ["innerHTML"], Xo = {
  key: 1,
  class: "location-card"
}, Zo = ["src"], el = { class: "location-info" }, tl = {
  key: 2,
  class: "catalog-card"
}, sl = { class: "catalog-header" }, al = { class: "catalog-title" }, nl = {
  key: 3,
  class: "multi-products"
}, ol = ["src"], ll = { class: "product-info" }, il = { class: "title" }, rl = { class: "price" }, dl = {
  key: 4,
  class: "coupon"
}, ul = { class: "coupon-code" }, cl = {
  key: 5,
  class: "offer"
}, pl = {
  key: 6,
  class: "auth"
}, ml = { class: "auth-code" }, vl = {
  key: 7,
  class: "footer"
}, bl = {
  key: 8,
  class: "buttons"
}, gl = /* @__PURE__ */ de({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(t) {
    const d = t, l = G("light"), r = U(() => l.value === "dark");
    function i(p) {
      return String(p).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const v = U(() => {
      var I;
      const p = ((I = d.template) == null ? void 0 : I.body) ?? "";
      return i(p).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), _ = U(() => {
      const p = d.template.location;
      if (!p) return "";
      const { lat: m, lng: I } = p;
      return m == null || I == null ? "" : `https://maps.googleapis.com/maps/api/staticmap?center=${m},${I}&zoom=15&size=600x300&markers=${m},${I}`;
    });
    return (p, m) => {
      var I, O;
      return a(), n("div", {
        class: me(["wa-wrapper", { "wa-wrapper--dark": r.value }])
      }, [
        e("div", {
          class: me(["phone", { "phone--dark": r.value }])
        }, [
          e("div", Wo, [
            e("button", {
              type: "button",
              class: me(["phone-theme-btn", { "phone-theme-btn--active": !r.value }]),
              onClick: m[0] || (m[0] = (L) => l.value = "light")
            }, " Light ", 2),
            e("button", {
              type: "button",
              class: me(["phone-theme-btn", { "phone-theme-btn--active": r.value }]),
              onClick: m[1] || (m[1] = (L) => l.value = "dark")
            }, " Dark ", 2)
          ]),
          m[12] || (m[12] = e("div", { class: "phone-header" }, [
            e("div", { class: "phone-header-left" }, [
              e("div", { class: "avatar" }),
              e("div", { class: "meta" }, [
                e("div", { class: "name" }, "Customer"),
                e("div", { class: "status" }, "online")
              ])
            ]),
            e("div", {
              class: "phone-header-actions",
              "aria-hidden": "true"
            }, [
              e("button", {
                type: "button",
                class: "icon-btn"
              }, [
                e("svg", {
                  viewBox: "0 0 24 24",
                  class: "icon-svg",
                  focusable: "false"
                }, [
                  e("path", {
                    d: "M4 7.75A1.75 1.75 0 0 1 5.75 6h7.5A1.75 1.75 0 0 1 15 7.75v1.69l3.02-2.01A.75.75 0 0 1 19.25 8v8a.75.75 0 0 1-1.23.59L15 14.58v1.67A1.75 1.75 0 0 1 13.25 18h-7.5A1.75 1.75 0 0 1 4 16.25z",
                    fill: "currentColor"
                  })
                ])
              ]),
              e("button", {
                type: "button",
                class: "icon-btn"
              }, [
                e("svg", {
                  viewBox: "0 0 24 24",
                  class: "icon-svg",
                  focusable: "false"
                }, [
                  e("path", {
                    d: "M6.54 4.23 8.4 4.5a1.25 1.25 0 0 1 1.06.99l.42 2.11a1.25 1.25 0 0 1-.36 1.16l-1.03 1.02a8.46 8.46 0 0 0 4.23 4.23l1.02-1.03a1.25 1.25 0 0 1 1.16-.36l2.11.42a1.25 1.25 0 0 1 .99 1.06l.27 1.86a1.25 1.25 0 0 1-1.07 1.39C16.78 17.8 14 17 11.5 15.5S6.2 11.22 5.02 8.4A1.25 1.25 0 0 1 6.4 7.33l.14-.95a1.25 1.25 0 0 1 0-.28z",
                    fill: "currentColor"
                  })
                ])
              ]),
              e("button", {
                type: "button",
                class: "icon-btn"
              }, [
                e("span", { class: "dots" })
              ])
            ])
          ], -1)),
          e("div", Fo, [
            e("div", jo, [
              t.template.header ? (a(), n("div", qo, [
                t.template.header.type === "text" ? (a(), n("div", Ko, h(t.template.header.text), 1)) : t.template.header.type === "image" ? (a(), n("img", {
                  key: 1,
                  src: t.template.header.url,
                  class: "media",
                  alt: ""
                }, null, 8, Yo)) : t.template.header.type === "video" ? (a(), n("video", {
                  key: 2,
                  src: t.template.header.url,
                  controls: "",
                  class: "media"
                }, null, 8, Jo)) : t.template.header.type === "document" ? (a(), n("div", Go, " 📄 " + h(t.template.header.filename), 1)) : $("", !0)
              ])) : $("", !0),
              e("div", {
                class: "body",
                innerHTML: v.value
              }, null, 8, Qo),
              t.template.location ? (a(), n("div", Xo, [
                _.value ? (a(), n("img", {
                  key: 0,
                  src: _.value,
                  class: "map",
                  alt: ""
                }, null, 8, Zo)) : $("", !0),
                e("div", el, [
                  e("strong", null, h(t.template.location.name), 1),
                  e("div", null, h(t.template.location.address), 1)
                ])
              ])) : $("", !0),
              t.template.catalog ? (a(), n("div", tl, [
                e("div", sl, [
                  m[2] || (m[2] = X(" 🛍 ", -1)),
                  e("span", al, h(typeof t.template.catalog == "object" && t.template.catalog.label ? t.template.catalog.label : "Full catalog"), 1)
                ]),
                m[3] || (m[3] = e("div", { class: "catalog-sub" }, "Browse all items", -1)),
                m[4] || (m[4] = e("div", { class: "catalog-cta" }, "VIEW CATALOG", -1))
              ])) : $("", !0),
              (I = t.template.multiProduct) != null && I.length ? (a(), n("div", nl, [
                (a(!0), n(F, null, Y(t.template.multiProduct, (L, y) => (a(), n("div", {
                  key: y,
                  class: "product"
                }, [
                  L.image ? (a(), n("img", {
                    key: 0,
                    src: L.image,
                    alt: ""
                  }, null, 8, ol)) : $("", !0),
                  e("div", ll, [
                    e("div", il, h(L.name), 1),
                    e("div", rl, h(L.price), 1)
                  ])
                ]))), 128))
              ])) : $("", !0),
              t.template.coupon ? (a(), n("div", dl, [
                m[6] || (m[6] = e("div", { class: "coupon-discount" }, "Special offer", -1)),
                e("div", ul, [
                  m[5] || (m[5] = X(" Code: ", -1)),
                  e("span", null, h(t.template.coupon.code), 1)
                ]),
                m[7] || (m[7] = e("div", { class: "coupon-cta" }, "COPY CODE", -1))
              ])) : $("", !0),
              t.template.limitedOffer ? (a(), n("div", cl, " ⏳ Offer expires " + h(t.template.limitedOffer), 1)) : $("", !0),
              t.template.auth ? (a(), n("div", pl, [
                m[8] || (m[8] = e("div", { class: "auth-icon" }, "🔐", -1)),
                m[9] || (m[9] = e("div", { class: "auth-title" }, "Confirm your phone number", -1)),
                e("div", ml, h(t.template.auth.code), 1),
                m[10] || (m[10] = e("button", {
                  type: "button",
                  class: "auth-btn"
                }, "CONTINUE", -1))
              ])) : $("", !0),
              t.template.footer ? (a(), n("div", vl, h(t.template.footer), 1)) : $("", !0),
              (O = t.template.buttons) != null && O.length ? (a(), n("div", bl, [
                (a(!0), n(F, null, Y(t.template.buttons, (L, y) => (a(), n("button", {
                  key: y,
                  type: "button",
                  class: "button"
                }, h(L.text), 1))), 128))
              ])) : $("", !0),
              m[11] || (m[11] = e("div", { class: "time" }, " 12:45 ✓✓ ", -1))
            ])
          ])
        ], 2)
      ], 2);
    };
  }
}), yl = /* @__PURE__ */ ve(gl, [["__scopeId", "data-v-76cc6100"]]), fl = { class: "keos-whatsapp-builder" }, kl = { class: "kb-builder-top" }, hl = { style: { margin: 0, paddingLeft: "1.25rem" } }, _l = { class: "kb-wa-layout" }, $l = { class: "kb-wa-sidebar" }, wl = {
  key: 0,
  class: "kb-wa-form"
}, xl = { class: "kb-wa-form-head" }, Cl = { class: "kb-wa-form-head-row" }, Sl = ["value"], Il = { class: "kb-wa-canvas" }, Ul = {
  key: 0,
  class: "kb-wa-test-banner"
}, Rl = { class: "kb-wa-preview-chrome" }, Ll = { class: "kb-push-preview-controls" }, Al = { class: "kb-push-preview-as" }, Bl = ["value"], Tl = { class: "kb-wa-preview-frame" }, Pl = { class: "kb-wa-actions" }, Vl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, El = { class: "kb-confirm-dialog" }, Ol = { class: "kb-confirm-actions" }, Ml = /* @__PURE__ */ de({
  __name: "KeosWhatsAppBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    designOnly: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(t, { emit: d }) {
    const l = t, r = d, {
      campaign: i,
      dirty: v,
      customValidatorErrors: _,
      getValidationWithWarnings: p,
      update: m,
      updateMessage: I,
      undo: O,
      redo: L,
      canUndo: y,
      canRedo: A,
      resetMessage: E,
      hooks: z
    } = We({
      initial: l.modelValue,
      hooks: {
        ...l.hooks,
        customValidators: async (B) => {
          var re, D;
          const N = [];
          (re = B.name) != null && re.trim() || N.push("Template name is required");
          const K = (D = l.hooks) != null && D.customValidators ? await l.hooks.customValidators(B) : [];
          return [...N, ...K];
        }
      },
      onDirty: () => r("change", i.value)
    }), { lastSavedAt: R } = Fe(i, { channel: "whatsapp" });
    function w(B) {
      (B.metaKey || B.ctrlKey) && B.key === "z" && (B.preventDefault(), B.shiftKey ? L() : O());
    }
    Ne(() => {
      window.addEventListener("keydown", w);
    }), De(() => {
      window.removeEventListener("keydown", w);
    }), he(
      i,
      (B) => r("update:modelValue", B),
      { deep: !0 }
    );
    const ee = G(), ie = G(!0);
    async function ce() {
      if (z.estimateReach)
        try {
          ee.value = await z.estimateReach(i.value.audience);
        } catch {
          ee.value = void 0;
        }
      z.canSend && (ie.value = await Promise.resolve(z.canSend()));
    }
    ce(), he(() => i.value.audience, ce, { deep: !0 });
    const ue = U(() => (_.value, p(ee.value))), pe = U(() => ue.value.blockingErrors), be = U(() => ue.value.warnings), _e = U(() => ue.value.valid), oe = G(""), Q = G(!1), j = G(null), se = U(() => {
      const B = oe.value;
      return B ? Ve.find((N) => N.id === B) ?? null : null;
    }), x = U(() => {
      const B = i.value.message.body ?? "";
      return se.value ? Te(B, se.value.data) : B;
    }), le = U(() => {
      const B = i.value.message.header ?? "";
      return se.value ? Te(B, se.value.data) : B;
    }), ye = U(() => {
      const B = i.value.message, N = B.template_type ?? "text";
      let K, re, D, H, J, xe, W;
      N === "image" && B.media_url ? K = { type: "image", url: B.media_url } : N === "video" && B.media_url ? K = { type: "video", url: B.media_url } : N === "document" && B.document_filename ? K = { type: "document", filename: B.document_filename } : B.header && (K = { type: "text", text: le.value });
      const f = x.value || "Start adding content to see a live preview here.";
      if (N === "location" && B.location) {
        const C = B.location, k = C.lat ?? C.latitude, b = C.lng ?? C.lon ?? C.longitude;
        k != null && b != null && (re = {
          lat: k,
          lng: b,
          name: C.name ?? C.title,
          address: C.address ?? `${k}, ${b}`
        });
      }
      (N === "catalog" || N === "mpm") && Array.isArray(B.products) && B.products.length && (D = !0, H = B.products.map((C) => ({
        image: C.image ?? C.imageUrl,
        name: C.name ?? C.sectionTitle ?? C.title ?? "Product",
        price: C.price ?? C.productId ?? ""
      }))), N === "coupon" && B.coupon_code && (J = { code: B.coupon_code }), N === "lto" && B.lto_expiry && (xe = B.lto_expiry), N === "auth" && (W = { code: B.auth_code ?? B.otp_code ?? "123 456" });
      const T = B.buttons ?? [];
      return {
        header: K,
        body: f,
        footer: B.footer || void 0,
        buttons: T.map((C) => ({ text: C.label || "Button" })),
        location: re,
        catalog: D,
        multiProduct: H,
        coupon: J,
        limitedOffer: xe,
        auth: W
      };
    });
    function fe(B) {
      const N = i.value, K = B.campaign.message ? { ...N.message, ...B.campaign.message } : N.message;
      m({
        ...B.campaign,
        message: K
      }), j.value = null, Q.value = !1;
    }
    function Re(B) {
      const N = B.target.value;
      if (!N) return;
      const K = nt.find((re) => re.id === N);
      K && (v.value ? (j.value = K, Q.value = !0) : fe(K), B.target.value = "");
    }
    const Ae = U(() => i.value.template_type ?? "transactional");
    function Se(B) {
      m({ template_type: B });
    }
    function ke(B) {
      m({
        name: B,
        tracking: { ...i.value.tracking ?? {}, campaign_name: B }
      });
    }
    function $e(B) {
      const N = ` {{ ${B.variable} }}`, K = i.value.message.variables ?? [], re = Array.from(/* @__PURE__ */ new Set([...K, B.variable]));
      if (B.field === "title") {
        const D = i.value.message.header ?? "";
        I(
          {
            variables: re
          }
        ), i.value.message.header = D + N;
      } else {
        const D = i.value.message.body ?? "";
        I(
          {
            variables: re
          }
        ), i.value.message.body = D + N;
      }
    }
    function Le() {
      _e.value && r("save", i.value);
    }
    return (B, N) => (a(), n("div", fl, [
      e("div", kl, [
        ge(je, {
          "campaign-name": c(i).name,
          status: c(i).status,
          dirty: c(v),
          "last-saved-at": c(R),
          "can-undo": c(y),
          "can-redo": c(A),
          "onUpdate:campaignName": ke,
          onUndo: c(O),
          onRedo: c(L)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({ background: c(te).dangerBg, border: `1px solid ${c(te).dangerBorder}`, borderRadius: `${c(Ce).input}px`, padding: `${c(q)[12]}px ${c(q)[16]}px`, marginBottom: `${c(q)[16]}px` })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(F, null, Y(pe.value, (K) => (a(), n("li", {
              key: K.message
            }, h(K.message), 1))), 128))
          ], 4)
        ], 4)) : $("", !0),
        be.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({ background: c(te).neutral.bg, border: `1px solid ${c(te).neutral.border}`, borderRadius: `${c(Ce).input}px`, padding: `${c(q)[12]}px ${c(q)[16]}px`, marginBottom: `${c(q)[16]}px`, fontSize: "0.875rem", color: c(te).neutral.textMuted })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", hl, [
            (a(!0), n(F, null, Y(be.value, (K) => (a(), n("li", {
              key: K.message
            }, h(K.message), 1))), 128))
          ])
        ], 4)) : $("", !0)
      ]),
      e("div", _l, [
        e("aside", $l, [
          t.disabledSections.includes("whatsapp") ? $("", !0) : (a(), n("div", wl, [
            e("div", xl, [
              N[7] || (N[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", Cl, [
                ge(qe, {
                  "template-type": Ae.value,
                  onUpdate: Se
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Re
                }, [
                  N[6] || (N[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(F, null, Y(c(nt), (K) => (a(), n("option", {
                    key: K.id,
                    value: K.id
                  }, h(K.label), 9, Sl))), 128))
                ], 32)
              ])
            ]),
            ge(Ho, {
              message: c(i).message,
              "show-reset": !0,
              onUpdate: c(I),
              onReset: N[0] || (N[0] = (K) => c(E)())
            }, null, 8, ["message", "onUpdate"]),
            ge(gt, {
              message: c(i).message,
              "variable-options": t.variableOptions,
              onUpdate: c(I),
              onInsertVariable: $e
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Il, [
          !t.designOnly && c(i).audience.test_mode ? (a(), n("div", Ul, [...N[8] || (N[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : $("", !0),
          e("div", Rl, [
            e("div", Ll, [
              e("label", Al, [
                N[10] || (N[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": N[1] || (N[1] = (K) => oe.value = K),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  N[9] || (N[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(F, null, Y(c(Ve), (K) => (a(), n("option", {
                    key: K.id,
                    value: K.id
                  }, h(K.label), 9, Bl))), 128))
                ], 512), [
                  [Oe, oe.value]
                ])
              ])
            ]),
            e("div", Tl, [
              ge(yl, { template: ye.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", Pl, [
        t.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: N[2] || (N[2] = (K) => r("duplicate", JSON.parse(JSON.stringify(c(i)))))
        }, " Duplicate ")) : $("", !0),
        t.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: Le
        }, " Save ")) : $("", !0),
        t.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-wa-action kb-wa-action--primary",
          onClick: N[3] || (N[3] = (K) => r("edit"))
        }, " Close ")) : $("", !0)
      ]),
      Q.value ? (a(), n("div", Vl, [
        e("div", El, [
          N[11] || (N[11] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          N[12] || (N[12] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Ol, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: N[4] || (N[4] = (K) => {
                Q.value = !1, j.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: N[5] || (N[5] = (K) => j.value && fe(j.value))
            }, "Replace")
          ])
        ])
      ])) : $("", !0)
    ]));
  }
}), kt = /* @__PURE__ */ ve(Ml, [["__scopeId", "data-v-85513d7b"]]), Nl = { class: "kb-section" }, Dl = { class: "kb-section__head" }, zl = { class: "kb-field" }, Hl = ["value"], Wl = { class: "kb-field" }, Fl = { class: "kb-label" }, jl = { key: 0 }, ql = { key: 1 }, Kl = { key: 2 }, Yl = ["value"], Jl = {
  key: 0,
  class: "kb-truncation-hint"
}, Gl = { class: "kb-field" }, Ql = { class: "kb-insert-row" }, Xl = ["value"], Zl = { class: "kb-field" }, ei = { class: "kb-insert-row" }, ti = /* @__PURE__ */ de({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: d }) {
    const l = t, r = d, i = ["first_name", "last_name", "order_id", "city"], v = G(l.variableOptions && l.variableOptions.length ? [...l.variableOptions] : i), _ = G(v.value[0] ?? i[0]), p = G("");
    he(
      () => l.variableOptions,
      (R) => {
        R && R.length && (v.value = [...R], v.value.includes(_.value) || (_.value = v.value[0]));
      }
    );
    const m = U(() => l.message.body ?? ""), I = U(() => m.value.length), O = U(() => I.value ? I.value <= 160 ? 1 : Math.ceil(I.value / 153) : 0), L = U(() => {
      const R = I.value;
      return R <= 160 ? null : R <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function y(R) {
      const w = R.target.value;
      r("update", {
        sender_id: w || void 0
      });
    }
    function A(R) {
      const w = R.target.value;
      r("update", {
        body: w
      });
    }
    function E() {
      const R = _.value;
      if (!R) return;
      const w = ` {{ ${R} }}`, ee = m.value || "", ie = l.message.variables ?? [], ce = Array.from(/* @__PURE__ */ new Set([...ie, R]));
      r("update", {
        body: ee + w,
        variables: ce
      });
    }
    function z() {
      const R = p.value.trim();
      R && (v.value.includes(R) || (v.value = [...v.value, R]), _.value = R, p.value = "");
    }
    return (R, w) => (a(), n("section", Nl, [
      e("div", Dl, [
        w[3] || (w[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        t.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: w[0] || (w[0] = (ee) => R.$emit("reset"))
        }, " Reset section ")) : $("", !0)
      ]),
      w[10] || (w[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", zl, [
        w[4] || (w[4] = e("label", { class: "kb-label" }, [
          X(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: l.message.sender_id ?? "",
          onInput: y
        }, null, 40, Hl)
      ]),
      e("div", Wl, [
        e("label", Fl, [
          w[5] || (w[5] = X(" Message body ", -1)),
          e("span", {
            class: me(["kb-counter", { "kb-counter--warn": O.value > 3 }])
          }, [
            X(h(I.value) + " chars · ", 1),
            O.value === 0 ? (a(), n("span", jl, "0 segments")) : O.value === 1 ? (a(), n("span", ql, "1 segment")) : (a(), n("span", Kl, h(O.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: m.value,
          onInput: A
        }, null, 40, Yl),
        w[6] || (w[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        L.value ? (a(), n("p", Jl, h(L.value), 1)) : $("", !0)
      ]),
      e("div", Gl, [
        w[7] || (w[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Ql, [
          Ue(e("select", {
            "onUpdate:modelValue": w[1] || (w[1] = (ee) => _.value = ee),
            class: "kb-select"
          }, [
            (a(!0), n(F, null, Y(v.value, (ee) => (a(), n("option", {
              key: ee,
              value: ee
            }, h(ee), 9, Xl))), 128))
          ], 512), [
            [Oe, _.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: E
          }, " Insert into message ")
        ]),
        w[8] || (w[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", Zl, [
        w[9] || (w[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", ei, [
          Ue(e("input", {
            "onUpdate:modelValue": w[2] || (w[2] = (ee) => p.value = ee),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [Je, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: z
          }, " Add ")
        ])
      ])
    ]));
  }
}), si = /* @__PURE__ */ ve(ti, [["__scopeId", "data-v-5e9aa8e6"]]), ai = { class: "keos-sms-builder" }, ni = { class: "kb-builder-top" }, oi = { style: { margin: 0, paddingLeft: "1.25rem" } }, li = { class: "kb-sms-layout" }, ii = { class: "kb-sms-sidebar" }, ri = {
  key: 0,
  class: "kb-sms-form"
}, di = { class: "kb-sms-form-head" }, ui = { class: "kb-wa-form-head-row" }, ci = ["value"], pi = { class: "kb-sms-canvas" }, mi = {
  key: 0,
  class: "kb-sms-test-banner"
}, vi = { class: "kb-sms-preview-chrome" }, bi = { class: "kb-push-preview-controls" }, gi = { class: "kb-push-preview-as" }, yi = ["value"], fi = { class: "kb-sms-preview-frame" }, ki = { class: "kb-preview" }, hi = { class: "kb-sms-preview" }, _i = { class: "kb-sms-phone" }, $i = { class: "kb-sms-header" }, wi = { class: "kb-sms-sender" }, xi = { class: "kb-sms-thread" }, Ci = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, Si = { class: "kb-sms-text" }, Ii = { class: "kb-sms-counter" }, Ui = { key: 0 }, Ri = { key: 1 }, Li = { key: 2 }, Ai = {
  key: 3,
  class: "kb-sms-cost"
}, Bi = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Ti = { class: "kb-sms-actions" }, Pi = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Vi = { class: "kb-confirm-dialog" }, Ei = { class: "kb-confirm-actions" }, Oi = /* @__PURE__ */ de({
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
    designOnly: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(t, { emit: d }) {
    const l = t, r = d, {
      campaign: i,
      dirty: v,
      customValidatorErrors: _,
      getValidationWithWarnings: p,
      update: m,
      updateMessage: I,
      undo: O,
      redo: L,
      canUndo: y,
      canRedo: A,
      resetMessage: E,
      hooks: z
    } = We({
      initial: l.modelValue,
      hooks: {
        ...l.hooks,
        customValidators: async (D) => {
          var xe, W;
          const H = [];
          (xe = D.name) != null && xe.trim() || H.push("Template name is required");
          const J = (W = l.hooks) != null && W.customValidators ? await l.hooks.customValidators(D) : [];
          return [...H, ...J];
        }
      },
      onDirty: () => r("change", i.value)
    }), { lastSavedAt: R } = Fe(i, { channel: "sms" });
    function w(D) {
      (D.metaKey || D.ctrlKey) && D.key === "z" && (D.preventDefault(), D.shiftKey ? L() : O());
    }
    Ne(() => {
      window.addEventListener("keydown", w);
    }), De(() => {
      window.removeEventListener("keydown", w);
    }), he(
      i,
      (D) => r("update:modelValue", D),
      { deep: !0 }
    );
    const ee = G(), ie = G(!0);
    async function ce() {
      if (z.estimateReach)
        try {
          ee.value = await z.estimateReach(i.value.audience);
        } catch {
          ee.value = void 0;
        }
      z.canSend && (ie.value = await Promise.resolve(z.canSend()));
    }
    ce(), he(() => i.value.audience, ce, { deep: !0 });
    const ue = U(() => (_.value, p(ee.value))), pe = U(() => ue.value.blockingErrors), be = U(() => ue.value.warnings), _e = U(() => ue.value.valid), oe = U(() => i.value.template_type ?? "transactional"), Q = G(""), j = G(!1), se = G(null), x = U(() => {
      const D = Q.value;
      return D ? Ve.find((H) => H.id === D) ?? null : null;
    }), le = U(() => {
      const D = Se.value;
      return x.value ? Te(D, x.value.data) : D;
    });
    function ye(D) {
      const H = i.value, J = D.campaign.message ? { ...H.message, ...D.campaign.message } : H.message;
      m({
        ...D.campaign,
        message: J
      }), se.value = null, j.value = !1;
    }
    function fe(D) {
      const H = D.target.value;
      if (!H) return;
      const J = ot.find((xe) => xe.id === H);
      J && (v.value ? (se.value = J, j.value = !0) : ye(J), D.target.value = "");
    }
    function Re(D) {
      m({ template_type: D });
    }
    function Ae(D) {
      m({
        name: D,
        tracking: { ...i.value.tracking ?? {}, campaign_name: D }
      });
    }
    const Se = U(() => (i.value.message.body ?? "") || ""), ke = U(() => Se.value.length), $e = U(() => ke.value ? ke.value <= 160 ? 1 : Math.ceil(ke.value / 153) : 0), Le = U(() => {
      const D = le.value;
      return D.trim().length ? D : "Your SMS message preview will appear here.";
    }), B = U(() => {
      const D = l.costPerSegment ?? 0;
      return !D || $e.value === 0 ? null : ($e.value * D).toFixed(2);
    }), N = U(() => {
      const D = ke.value;
      return D <= 160 ? null : D <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), K = U(
      () => i.value.message.sender_id ?? "YourBrand"
    );
    function re() {
      _e.value && r("save", i.value);
    }
    return (D, H) => (a(), n("div", ai, [
      e("div", ni, [
        ge(je, {
          "campaign-name": c(i).name,
          status: c(i).status,
          dirty: c(v),
          "last-saved-at": c(R),
          "can-undo": c(y),
          "can-redo": c(A),
          "onUpdate:campaignName": Ae,
          onUndo: c(O),
          onRedo: c(L)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({
            background: c(te).dangerBg,
            border: `1px solid ${c(te).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[12]}px ${c(q)[16]}px`,
            marginBottom: `${c(q)[16]}px`
          })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(F, null, Y(pe.value, (J) => (a(), n("li", {
              key: J.message
            }, h(J.message), 1))), 128))
          ], 4)
        ], 4)) : $("", !0),
        be.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({
            background: c(te).neutral.bg,
            border: `1px solid ${c(te).neutral.border}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[12]}px ${c(q)[16]}px`,
            marginBottom: `${c(q)[16]}px`,
            fontSize: "0.875rem",
            color: c(te).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", oi, [
            (a(!0), n(F, null, Y(be.value, (J) => (a(), n("li", {
              key: J.message
            }, h(J.message), 1))), 128))
          ])
        ], 4)) : $("", !0)
      ]),
      e("div", li, [
        e("aside", ii, [
          t.disabledSections.includes("sms") ? $("", !0) : (a(), n("div", ri, [
            e("div", di, [
              H[7] || (H[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", ui, [
                ge(qe, {
                  "template-type": oe.value,
                  onUpdate: Re
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: fe
                }, [
                  H[6] || (H[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(F, null, Y(c(ot), (J) => (a(), n("option", {
                    key: J.id,
                    value: J.id
                  }, h(J.label), 9, ci))), 128))
                ], 32)
              ])
            ]),
            ge(si, {
              message: c(i).message,
              "variable-options": t.variableOptions,
              "show-reset": !0,
              onUpdate: c(I),
              onReset: H[0] || (H[0] = (J) => c(E)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", pi, [
          !t.designOnly && c(i).audience.test_mode ? (a(), n("div", mi, [...H[8] || (H[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : $("", !0),
          e("div", vi, [
            e("div", bi, [
              e("label", gi, [
                H[10] || (H[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": H[1] || (H[1] = (J) => Q.value = J),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  H[9] || (H[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(F, null, Y(c(Ve), (J) => (a(), n("option", {
                    key: J.id,
                    value: J.id
                  }, h(J.label), 9, yi))), 128))
                ], 512), [
                  [Oe, Q.value]
                ])
              ])
            ]),
            e("div", fi, [
              e("div", ki, [
                e("div", hi, [
                  e("div", _i, [
                    H[13] || (H[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", $i, [
                      e("div", wi, h(K.value), 1),
                      H[11] || (H[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", xi, [
                      e("div", Ci, [
                        e("span", Si, h(Le.value), 1),
                        H[12] || (H[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", Ii, [
                    X(h(ke.value) + " characters · ", 1),
                    $e.value === 0 ? (a(), n("span", Ui, "0 segments")) : $e.value === 1 ? (a(), n("span", Ri, "1 segment")) : (a(), n("span", Li, h($e.value) + " segments", 1)),
                    H[14] || (H[14] = X(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    B.value !== null ? (a(), n("span", Ai, " · Est. " + h(B.value), 1)) : $("", !0)
                  ]),
                  N.value ? (a(), n("p", Bi, h(N.value), 1)) : $("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", Ti, [
        t.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: H[2] || (H[2] = (J) => r("duplicate", JSON.parse(JSON.stringify(c(i)))))
        }, " Duplicate ")) : $("", !0),
        t.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: re
        }, " Save ")) : $("", !0),
        t.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-sms-action kb-sms-action--primary",
          onClick: H[3] || (H[3] = (J) => r("edit"))
        }, " Close ")) : $("", !0)
      ]),
      j.value ? (a(), n("div", Pi, [
        e("div", Vi, [
          H[15] || (H[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          H[16] || (H[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Ei, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: H[4] || (H[4] = (J) => {
                j.value = !1, se.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: H[5] || (H[5] = (J) => se.value && ye(se.value))
            }, "Replace")
          ])
        ])
      ])) : $("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ ve(Oi, [["__scopeId", "data-v-edeb9be3"]]), Mi = 30, Ni = 60, Di = 130;
function zi(t) {
  const d = (t ?? "").trim().length;
  return d < Mi ? "too_short" : d <= Ni ? "good" : "too_long";
}
function Hi(t) {
  const d = (t ?? "").trim().length;
  return d === 0 ? "too_short" : d <= Di ? "good" : "too_long";
}
const Wi = [
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
function it(t) {
  if (!t || typeof t != "string") return [];
  const d = [];
  for (const l of Wi) {
    const r = t.match(l);
    r && d.push(r[0]);
  }
  return d;
}
function Fi(t) {
  switch (t) {
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
function ji(t) {
  switch (t) {
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
const qi = { class: "em-section" }, Ki = { class: "em-strip" }, Yi = { class: "em-strip-head" }, Ji = { class: "em-field" }, Gi = ["value"], Qi = { class: "em-field" }, Xi = ["value"], Zi = { class: "em-field" }, er = ["value"], tr = { class: "em-field" }, sr = { class: "em-input-group" }, ar = ["value"], nr = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, or = { class: "em-field" }, lr = { class: "em-input-group" }, ir = ["value"], rr = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, dr = { class: "em-strip em-strip--library" }, ur = { class: "em-library-chips" }, cr = ["onClick"], pr = { class: "em-strip em-strip--blocks" }, mr = { class: "em-block-list" }, vr = ["data-type"], br = { class: "em-block-bar" }, gr = { class: "em-block-type" }, yr = { class: "em-block-actions" }, fr = ["disabled", "onClick"], kr = ["disabled", "onClick"], hr = ["onClick"], _r = {
  key: 0,
  class: "em-block-fields"
}, $r = ["value", "onChange"], wr = ["value", "onInput"], xr = ["onClick"], Cr = {
  key: 1,
  class: "em-block-fields"
}, Sr = ["value", "onInput"], Ir = ["onClick"], Ur = {
  key: 2,
  class: "em-block-fields"
}, Rr = ["value", "onInput"], Lr = ["value", "onInput"], Ar = ["value", "onInput"], Br = {
  key: 3,
  class: "em-block-fields"
}, Tr = ["value", "onInput"], Pr = ["value", "onInput"], Vr = { class: "em-block-fields--row" }, Er = ["value", "onInput"], Or = { class: "em-check-row" }, Mr = ["checked", "onChange"], Nr = { class: "em-check-row" }, Dr = ["checked", "onChange"], zr = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, Hr = ["value", "onInput"], Wr = {
  key: 5,
  class: "em-block-fields"
}, Fr = ["value", "onInput"], jr = ["value", "onInput"], qr = ["value", "onInput"], Kr = ["onClick"], Yr = {
  key: 6,
  class: "em-block-fields"
}, Jr = ["value", "onChange"], Gr = { class: "em-list-items" }, Qr = ["value", "onInput", "placeholder"], Xr = ["onClick"], Zr = ["onClick"], ed = {
  key: 7,
  class: "em-block-fields"
}, td = ["value", "onChange"], sd = ["value", "onInput"], ad = ["onClick"], nd = {
  key: 8,
  class: "em-block-fields"
}, od = { class: "em-social-links" }, ld = ["value", "onChange"], id = ["value", "onInput"], rd = ["onClick"], dd = ["onClick"], ud = {
  key: 9,
  class: "em-block-fields"
}, cd = ["value", "onInput"], pd = ["value", "onInput"], md = ["value", "onInput"], vd = {
  key: 10,
  class: "em-block-fields"
}, bd = ["value", "onInput"], gd = { class: "em-link-list-items" }, yd = ["value", "onInput"], fd = ["value", "onInput"], kd = ["onClick"], hd = ["onClick"], _d = {
  key: 11,
  class: "em-block-fields"
}, $d = ["value", "onInput"], wd = ["onClick"], xd = ["value", "onInput"], Cd = ["onClick"], Sd = {
  key: 12,
  class: "em-block-fields"
}, Id = { class: "em-block-fields--row" }, Ud = ["value", "onInput"], Rd = { class: "em-block-fields--row" }, Ld = ["value", "onInput"], Ad = ["value", "onChange"], Bd = {
  key: 13,
  class: "em-block-fields"
}, Td = ["value", "onChange"], Pd = { class: "em-inline-label" }, Vd = ["value", "onInput"], Ed = ["onClick"], Od = {
  key: 14,
  class: "em-block-fields"
}, Md = ["value", "onInput"], Nd = { class: "em-link-list-items" }, Dd = ["value", "onInput"], zd = ["value", "onInput"], Hd = ["onClick"], Wd = ["onClick"], Fd = {
  key: 15,
  class: "em-block-fields"
}, jd = ["value", "onInput"], qd = ["value", "onInput"], Kd = ["onClick"], Yd = ["onClick"], Jd = {
  key: 16,
  class: "em-block-fields"
}, Gd = ["value", "onInput"], Qd = ["value", "onInput"], Xd = ["value", "onInput"], Zd = ["onClick"], eu = ["onClick"], tu = {
  key: 17,
  class: "em-block-fields"
}, su = ["value", "onInput"], au = ["value", "onInput"], nu = {
  key: 18,
  class: "em-block-fields"
}, ou = ["value", "onInput"], lu = ["value", "onInput"], iu = ["value", "onInput"], ru = ["value", "onInput"], du = ["value", "onInput"], uu = {
  key: 19,
  class: "em-block-fields"
}, cu = ["value", "onInput"], pu = ["onClick"], mu = {
  key: 20,
  class: "em-block-fields"
}, vu = ["value", "onInput"], bu = ["value", "onInput"], gu = ["onClick"], yu = {
  key: 21,
  class: "em-block-fields"
}, fu = ["value", "onInput"], ku = { class: "em-block-fields--row" }, hu = ["value", "onInput"], _u = {
  key: 22,
  class: "em-block-fields"
}, $u = ["value", "onInput"], wu = ["value", "onInput"], xu = ["value", "onInput"], Cu = { class: "em-add-bar" }, Su = { class: "em-add-bar-btns" }, Iu = { class: "em-strip em-strip--personalize" }, Uu = { class: "em-field" }, Ru = { class: "em-input-group" }, Lu = ["value"], Au = { class: "em-field" }, Bu = { class: "em-input-group" }, Ie = "{{ var }}", Tu = /* @__PURE__ */ de({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: d }) {
    var ae;
    function l() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const r = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ];
    function i(g) {
      switch (g) {
        case "heading":
          return { id: l(), type: "heading", level: 1, content: "Heading" };
        case "paragraph":
          return { id: l(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization." };
        case "image":
          return { id: l(), type: "image", src: "", alt: "", linkUrl: "" };
        case "button":
          return { id: l(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1 };
        case "divider":
          return { id: l(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid" };
        case "spacer":
          return { id: l(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: l(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: ""
          };
        case "list":
          return { id: l(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"] };
        case "quote":
          return { id: l(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default" };
        case "social":
          return { id: l(), type: "social", links: r.map((o) => ({ ...o })) };
        case "video":
          return { id: l(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "" };
        case "link_list":
          return {
            id: l(),
            type: "link_list",
            links: [
              { text: "Unsubscribe", url: "" },
              { text: "Preferences", url: "" },
              { text: "View in browser", url: "" }
            ],
            separator: " | "
          };
        case "columns":
          return {
            id: l(),
            type: "columns",
            leftContent: "Left column text or {{ variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: l(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: l(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: l(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: l(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: l(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: l(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: l(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: l(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: l(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: l(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: l(), type: "paragraph", content: "" };
      }
    }
    const v = t, _ = d, p = ["first_name", "last_name", "order_id", "city", "email"], m = G(
      (ae = v.variableOptions) != null && ae.length ? [...v.variableOptions] : p
    ), I = G(m.value[0] ?? "first_name"), O = G("");
    he(
      () => v.variableOptions,
      (g) => {
        g != null && g.length && (m.value = [...g], m.value.includes(I.value) || (I.value = m.value[0]));
      }
    );
    const L = U(() => v.message.subject ?? ""), y = U(() => v.message.preview_text ?? ""), A = U(() => zi(L.value)), E = U(() => Hi(y.value)), z = U(() => it(L.value)), R = U(() => it(y.value)), w = U(() => {
      const g = v.message.blocks;
      return Array.isArray(g) && g.length > 0 ? g : [i("paragraph")];
    });
    he(
      () => v.message.blocks,
      (g) => {
        (!Array.isArray(g) || g.length === 0) && _("update", { blocks: [i("paragraph")] });
      },
      { immediate: !0 }
    );
    function ee(g) {
      _("update", { blocks: g });
    }
    function ie(g) {
      _("update", { subject: g.target.value });
    }
    function ce(g) {
      const o = g.target.value;
      _("update", { preview_text: o || void 0 });
    }
    function ue(g) {
      _("update", { from_name: g.target.value || void 0 });
    }
    function pe(g) {
      _("update", { from_address: g.target.value || void 0 });
    }
    function be(g) {
      _("update", { reply_to: g.target.value || void 0 });
    }
    const _e = [
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
    function oe(g) {
      const o = g.blocks();
      ee([...w.value, ...o]);
    }
    function Q(g) {
      const o = [...w.value, i(g)];
      ee(o);
    }
    function j(g) {
      ee(w.value.filter((o) => o.id !== g));
    }
    function se(g, o) {
      const s = w.value.findIndex((V) => V.id === g);
      if (s < 0) return;
      const M = o === "up" ? s - 1 : s + 1;
      if (M < 0 || M >= w.value.length) return;
      const u = [...w.value];
      [u[s], u[M]] = [u[M], u[s]], ee(u);
    }
    function x(g, o) {
      const s = w.value.map((M) => M.id === g ? { ...M, ...o } : M);
      ee(s);
    }
    function le(g, o, s) {
      const M = w.value.find((V) => V.id === g);
      if (!M || M.type !== "list") return;
      const u = [...M.items || []];
      u[o] = s, x(g, { items: u });
    }
    function ye(g) {
      const o = w.value.find((s) => s.id === g);
      !o || o.type !== "list" || x(g, { items: [...o.items || [], "New item"] });
    }
    function fe(g, o) {
      const s = w.value.find((u) => u.id === g);
      if (!s || s.type !== "list") return;
      const M = (s.items || []).filter((u, V) => V !== o);
      x(g, { items: M });
    }
    function Re(g, o, s, M) {
      const u = w.value.find((P) => P.id === g);
      if (!u || u.type !== "social") return;
      const V = (u.links || []).map((P, we) => we === o ? { ...P, [s]: M } : P);
      x(g, { links: V });
    }
    function Ae(g) {
      const o = w.value.find((s) => s.id === g);
      !o || o.type !== "social" || x(g, { links: [...o.links || [], { platform: "custom", url: "" }] });
    }
    function Se(g, o) {
      const s = w.value.find((u) => u.id === g);
      if (!s || s.type !== "social") return;
      const M = (s.links || []).filter((u, V) => V !== o);
      x(g, { links: M });
    }
    function ke(g, o, s, M) {
      const u = w.value.find((P) => P.id === g);
      if (!u || u.type !== "link_list") return;
      const V = (u.links || []).map((P, we) => we === o ? { ...P, [s]: M } : P);
      x(g, { links: V });
    }
    function $e(g) {
      const o = w.value.find((s) => s.id === g);
      !o || o.type !== "link_list" || x(g, { links: [...o.links || [], { text: "", url: "" }] });
    }
    function Le(g, o) {
      const s = w.value.find((u) => u.id === g);
      if (!s || s.type !== "link_list") return;
      const M = (s.links || []).filter((u, V) => V !== o);
      x(g, { links: M });
    }
    function B(g, o) {
      const s = w.value.find((Ee) => Ee.id === g);
      if (!s || s.type !== "columns") return;
      const M = ` {{ ${I.value} }}`, u = v.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...u, I.value])), P = o === "left" ? "leftContent" : "rightContent", Ke = (s[P] ?? "") + M;
      x(g, { [P]: Ke }), _("update", { variables: V });
    }
    function N(g, o) {
      const s = w.value.find((M) => M.id === g);
      if (!(!s || s.type !== "row")) {
        if (o.columnCount !== void 0 && o.columnCount !== s.columnCount) {
          const M = [...s.cells || []];
          for (; M.length < o.columnCount; ) M.push("Cell content");
          o.cells = M.slice(0, o.columnCount);
        }
        x(g, o);
      }
    }
    function K(g, o, s) {
      const M = w.value.find((V) => V.id === g);
      if (!M || M.type !== "row") return;
      const u = [...M.cells || []];
      u[o] = s, x(g, { cells: u });
    }
    function re(g, o, s, M) {
      const u = w.value.find((P) => P.id === g);
      if (!u || u.type !== "navbar") return;
      const V = (u.links || []).map((P, we) => we === o ? { ...P, [s]: M } : P);
      x(g, { links: V });
    }
    function D(g) {
      const o = w.value.find((s) => s.id === g);
      !o || o.type !== "navbar" || x(g, { links: [...o.links || [], { text: "", url: "" }] });
    }
    function H(g, o) {
      const s = w.value.find((M) => M.id === g);
      !s || s.type !== "navbar" || x(g, { links: (s.links || []).filter((M, u) => u !== o) });
    }
    function J(g, o, s, M) {
      const u = w.value.find((P) => P.id === g);
      if (!u || u.type !== "accordion") return;
      const V = (u.items || []).map((P, we) => we === o ? { ...P, [s]: M } : P);
      x(g, { items: V });
    }
    function xe(g) {
      const o = w.value.find((s) => s.id === g);
      !o || o.type !== "accordion" || x(g, { items: [...o.items || [], { title: "New section", content: "" }] });
    }
    function W(g, o) {
      const s = w.value.find((M) => M.id === g);
      !s || s.type !== "accordion" || x(g, { items: (s.items || []).filter((M, u) => u !== o) });
    }
    function f(g, o, s, M) {
      const u = w.value.find((P) => P.id === g);
      if (!u || u.type !== "carousel") return;
      const V = (u.slides || []).map((P, we) => we === o ? { ...P, [s]: M } : P);
      x(g, { slides: V });
    }
    function T(g) {
      const o = w.value.find((s) => s.id === g);
      !o || o.type !== "carousel" || x(g, { slides: [...o.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function C(g, o) {
      const s = w.value.find((M) => M.id === g);
      !s || s.type !== "carousel" || x(g, { slides: (s.slides || []).filter((M, u) => u !== o) });
    }
    function k(g) {
      const o = ` {{ ${I.value} }}`, s = v.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...s, I.value]));
      g === "subject" ? _("update", {
        subject: (L.value || "") + o,
        variables: M
      }) : _("update", {
        preview_text: (y.value || "") + o,
        variables: M
      });
    }
    function b(g) {
      const o = w.value.find((Ee) => Ee.id === g);
      if (!o || o.type !== "paragraph" && o.type !== "heading" && o.type !== "footer" && o.type !== "quote" && o.type !== "liquid" && o.type !== "code_block") return;
      const s = ` {{ ${I.value} }}`, M = v.message.variables ?? [], u = Array.from(/* @__PURE__ */ new Set([...M, I.value])), V = (o.type === "footer", "content"), we = (o[V] ?? "") + s, Ke = w.value.map(
        (Ee) => Ee.id === g ? { ...Ee, [V]: we } : Ee
      );
      _("update", { blocks: Ke, variables: u });
    }
    function S(g, o) {
      const s = w.value.find((we) => we.id === g);
      if (!s || s.type !== "row") return;
      const M = ` {{ ${I.value} }}`, u = v.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...u, I.value])), P = [...s.cells || []];
      P[o] = (P[o] || "") + M, x(g, { cells: P }), _("update", { variables: V });
    }
    function Z() {
      const g = O.value.trim();
      !g || m.value.includes(g) || (m.value = [...m.value, g], I.value = g, O.value = "");
    }
    return (g, o) => (a(), n("section", qi, [
      e("div", Ki, [
        e("div", Yi, [
          o[28] || (o[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: o[0] || (o[0] = (s) => g.$emit("reset"))
          }, " Reset section ")) : $("", !0)
        ]),
        o[35] || (o[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Ji, [
          o[29] || (o[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: t.message.from_name ?? "",
            onInput: ue
          }, null, 40, Gi)
        ]),
        e("div", Qi, [
          o[30] || (o[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: t.message.from_address ?? "",
            onInput: pe
          }, null, 40, Xi)
        ]),
        e("div", Zi, [
          o[31] || (o[31] = e("label", { class: "em-label" }, [
            X("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: t.message.reply_to ?? "",
            onInput: be
          }, null, 40, er)
        ]),
        e("div", tr, [
          o[32] || (o[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", sr, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: L.value,
              onInput: ie
            }, null, 40, ar),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: o[1] || (o[1] = (s) => k("subject")),
              title: "Insert variable"
            }, h(Ie))
          ]),
          e("span", {
            class: me(["em-analyzer", `em-analyzer--${A.value}`])
          }, h(c(Fi)(A.value)), 3),
          z.value.length ? (a(), n("span", nr, "Spammy: " + h(z.value.join(", ")), 1)) : $("", !0)
        ]),
        e("div", or, [
          o[33] || (o[33] = e("label", { class: "em-label" }, [
            X("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", lr, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: y.value,
              onInput: ce
            }, null, 40, ir),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: o[2] || (o[2] = (s) => k("preview")),
              title: "Insert variable"
            }, h(Ie))
          ]),
          o[34] || (o[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: me(["em-analyzer", `em-analyzer--${E.value}`])
          }, h(c(ji)(E.value)), 3),
          R.value.length ? (a(), n("span", rr, "Spammy: " + h(R.value.join(", ")), 1)) : $("", !0)
        ])
      ]),
      e("div", dr, [
        o[36] || (o[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        o[37] || (o[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", ur, [
          (a(), n(F, null, Y(_e, (s) => e("button", {
            key: s.id,
            type: "button",
            class: "em-library-chip",
            onClick: (M) => oe(s)
          }, h(s.label), 9, cr)), 64))
        ])
      ]),
      e("div", pr, [
        o[61] || (o[61] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        o[62] || (o[62] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", mr, [
          (a(!0), n(F, null, Y(w.value, (s, M) => (a(), n("div", {
            key: s.id,
            class: "em-block",
            "data-type": s.type
          }, [
            e("div", br, [
              e("span", gr, h(s.type), 1),
              e("div", yr, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: M === 0,
                  onClick: (u) => se(s.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, fr),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: M === w.value.length - 1,
                  onClick: (u) => se(s.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, kr),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => j(s.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, hr)
              ])
            ]),
            s.type === "heading" ? (a(), n("div", _r, [
              e("select", {
                value: s.level,
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { level: Number(u.target.value) })
              }, [...o[38] || (o[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, $r),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, wr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => b(s.id)
              }, h(Ie), 8, xr)
            ])) : s.type === "paragraph" ? (a(), n("div", Cr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Sr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => b(s.id)
              }, h(Ie), 8, Ir)
            ])) : s.type === "image" ? (a(), n("div", Ur, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.src,
                onInput: (u) => x(s.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, Rr),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.alt,
                onInput: (u) => x(s.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, Lr),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.linkUrl,
                onInput: (u) => x(s.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Ar)
            ])) : s.type === "button" ? (a(), n("div", Br, [
              e("input", {
                type: "text",
                class: "em-input",
                value: s.text,
                onInput: (u) => x(s.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, Tr),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.url,
                onInput: (u) => x(s.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, Pr),
              e("div", Vr, [
                o[39] || (o[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: s.borderRadius ?? 8,
                  onInput: (u) => x(s.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, Er)
              ]),
              e("label", Or, [
                e("input", {
                  type: "checkbox",
                  checked: s.fullWidth,
                  onChange: (u) => x(s.id, { fullWidth: u.target.checked })
                }, null, 40, Mr),
                o[40] || (o[40] = e("span", null, "Full width", -1))
              ]),
              e("label", Nr, [
                e("input", {
                  type: "checkbox",
                  checked: s.ghost,
                  onChange: (u) => x(s.id, { ghost: u.target.checked })
                }, null, 40, Dr),
                o[41] || (o[41] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : s.type === "spacer" ? (a(), n("div", zr, [
              o[42] || (o[42] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: s.height,
                onInput: (u) => x(s.id, { height: Number(u.target.value) || 24 })
              }, null, 40, Hr),
              o[43] || (o[43] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : s.type === "footer" ? (a(), n("div", Wr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Fr),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.unsubscribeUrl,
                onInput: (u) => x(s.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, jr),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.companyAddress,
                onInput: (u) => x(s.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, qr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => b(s.id)
              }, h(Ie), 8, Kr)
            ])) : s.type === "list" ? (a(), n("div", Yr, [
              e("select", {
                value: s.style,
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { style: u.target.value })
              }, [...o[44] || (o[44] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Jr),
              e("div", Gr, [
                (a(!0), n(F, null, Y(s.items || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (P) => le(s.id, V, P.target.value),
                    placeholder: `Item ${V + 1}`
                  }, null, 40, Qr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (P) => fe(s.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Xr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => ye(s.id)
              }, "+ Add item", 8, Zr)
            ])) : s.type === "quote" ? (a(), n("div", ed, [
              e("select", {
                value: s.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { style: u.target.value })
              }, [...o[45] || (o[45] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, td),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, sd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => b(s.id)
              }, h(Ie), 8, ad)
            ])) : s.type === "social" ? (a(), n("div", nd, [
              e("div", od, [
                (a(!0), n(F, null, Y(s.links || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (P) => Re(s.id, V, "platform", P.target.value)
                  }, [...o[46] || (o[46] = [
                    Me('<option value="facebook" data-v-3dd07e10>Facebook</option><option value="twitter" data-v-3dd07e10>Twitter / X</option><option value="instagram" data-v-3dd07e10>Instagram</option><option value="linkedin" data-v-3dd07e10>LinkedIn</option><option value="youtube" data-v-3dd07e10>YouTube</option><option value="tiktok" data-v-3dd07e10>TikTok</option><option value="custom" data-v-3dd07e10>Custom</option>', 7)
                  ])], 40, ld),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (P) => Re(s.id, V, "url", P.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, id),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (P) => Se(s.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, rd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Ae(s.id)
              }, "+ Add link", 8, dd)
            ])) : s.type === "video" ? (a(), n("div", ud, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.thumbnailUrl,
                onInput: (u) => x(s.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, cd),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.videoUrl,
                onInput: (u) => x(s.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, pd),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.caption,
                onInput: (u) => x(s.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, md)
            ])) : s.type === "link_list" ? (a(), n("div", vd, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: s.separator,
                onInput: (u) => x(s.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, bd),
              e("div", gd, [
                (a(!0), n(F, null, Y(s.links || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (P) => ke(s.id, V, "text", P.target.value),
                    placeholder: "Label"
                  }, null, 40, yd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (P) => ke(s.id, V, "url", P.target.value),
                    placeholder: "URL"
                  }, null, 40, fd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (P) => Le(s.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, kd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => $e(s.id)
              }, "+ Add link", 8, hd)
            ])) : s.type === "columns" ? (a(), n("div", _d, [
              o[47] || (o[47] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.leftContent,
                onInput: (u) => x(s.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, $d),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => B(s.id, "left")
              }, h(Ie), 8, wd),
              o[48] || (o[48] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.rightContent,
                onInput: (u) => x(s.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, xd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => B(s.id, "right")
              }, h(Ie), 8, Cd)
            ])) : s.type === "divider" ? (a(), n("div", Sd, [
              e("div", Id, [
                o[49] || (o[49] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: s.thickness ?? 1,
                  onInput: (u) => x(s.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, Ud),
                o[50] || (o[50] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Rd, [
                o[51] || (o[51] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: s.color ?? "#e2e8f0",
                  onInput: (u) => x(s.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Ld)
              ]),
              e("select", {
                value: s.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { lineStyle: u.target.value })
              }, [...o[52] || (o[52] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Ad)
            ])) : s.type === "row" ? (a(), n("div", Bd, [
              o[54] || (o[54] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: s.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => N(s.id, { columnCount: Number(u.target.value) })
              }, [...o[53] || (o[53] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Td),
              (a(!0), n(F, null, Y(s.cells || [], (u, V) => (a(), n("div", {
                key: V,
                class: "em-row-cell"
              }, [
                e("label", Pd, "Column " + h(V + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (P) => K(s.id, V, P.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Vd),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (P) => S(s.id, V)
                }, h(Ie), 8, Ed)
              ]))), 128))
            ])) : s.type === "navbar" ? (a(), n("div", Od, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: s.separator,
                onInput: (u) => x(s.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Md),
              e("div", Nd, [
                (a(!0), n(F, null, Y(s.links || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (P) => re(s.id, V, "text", P.target.value),
                    placeholder: "Label"
                  }, null, 40, Dd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (P) => re(s.id, V, "url", P.target.value),
                    placeholder: "URL"
                  }, null, 40, zd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (P) => H(s.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Hd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => D(s.id)
              }, "+ Add link", 8, Wd)
            ])) : s.type === "accordion" ? (a(), n("div", Fd, [
              (a(!0), n(F, null, Y(s.items || [], (u, V) => (a(), n("div", {
                key: V,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (P) => J(s.id, V, "title", P.target.value),
                  placeholder: "Section title"
                }, null, 40, jd),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (P) => J(s.id, V, "content", P.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, qd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (P) => W(s.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Kd)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => xe(s.id)
              }, "+ Add section", 8, Yd)
            ])) : s.type === "carousel" ? (a(), n("div", Jd, [
              (a(!0), n(F, null, Y(s.slides || [], (u, V) => (a(), n("div", {
                key: V,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (P) => f(s.id, V, "imageUrl", P.target.value),
                  placeholder: "Image URL"
                }, null, 40, Gd),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (P) => f(s.id, V, "alt", P.target.value),
                  placeholder: "Alt text"
                }, null, 40, Qd),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (P) => f(s.id, V, "linkUrl", P.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Xd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (P) => C(s.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Zd)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => T(s.id)
              }, "+ Add slide", 8, eu)
            ])) : s.type === "countdown" ? (a(), n("div", tu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: s.label,
                onInput: (u) => x(s.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, su),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: s.endDateTime ? s.endDateTime.slice(0, 16) : "",
                onInput: (u) => x(s.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, au),
              o[55] || (o[55] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : s.type === "product_card" ? (a(), n("div", nu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.imageUrl,
                onInput: (u) => x(s.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, ou),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.title,
                onInput: (u) => x(s.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, lu),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.price,
                onInput: (u) => x(s.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, iu),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.buttonText,
                onInput: (u) => x(s.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, ru),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.buttonUrl,
                onInput: (u) => x(s.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, du)
            ])) : s.type === "liquid" ? (a(), n("div", uu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, cu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => b(s.id)
              }, h(Ie), 8, pu),
              o[56] || (o[56] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : s.type === "code_block" ? (a(), n("div", mu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: s.caption,
                onInput: (u) => x(s.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, vu),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, bu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => b(s.id)
              }, h(Ie), 8, gu),
              o[57] || (o[57] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : s.type === "rss_feed" ? (a(), n("div", yu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.feedUrl,
                onInput: (u) => x(s.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, fu),
              e("div", ku, [
                o[58] || (o[58] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: s.maxItems ?? 5,
                  onInput: (u) => x(s.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, hu)
              ]),
              o[59] || (o[59] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : s.type === "dynamic_image" ? (a(), n("div", _u, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.imageUrl,
                onInput: (u) => x(s.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, $u),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.alt,
                onInput: (u) => x(s.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, wu),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.fallbackUrl,
                onInput: (u) => x(s.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, xu)
            ])) : $("", !0)
          ], 8, vr))), 128))
        ]),
        e("div", Cu, [
          o[60] || (o[60] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Su, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[3] || (o[3] = (s) => Q("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[4] || (o[4] = (s) => Q("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[5] || (o[5] = (s) => Q("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[6] || (o[6] = (s) => Q("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[7] || (o[7] = (s) => Q("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[8] || (o[8] = (s) => Q("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[9] || (o[9] = (s) => Q("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[10] || (o[10] = (s) => Q("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[11] || (o[11] = (s) => Q("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[12] || (o[12] = (s) => Q("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[13] || (o[13] = (s) => Q("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[14] || (o[14] = (s) => Q("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[15] || (o[15] = (s) => Q("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[16] || (o[16] = (s) => Q("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[17] || (o[17] = (s) => Q("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[18] || (o[18] = (s) => Q("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[19] || (o[19] = (s) => Q("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[20] || (o[20] = (s) => Q("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[21] || (o[21] = (s) => Q("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[22] || (o[22] = (s) => Q("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[23] || (o[23] = (s) => Q("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[24] || (o[24] = (s) => Q("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[25] || (o[25] = (s) => Q("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Iu, [
        o[65] || (o[65] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        o[66] || (o[66] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Uu, [
          o[63] || (o[63] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Ru, [
            Ue(e("select", {
              "onUpdate:modelValue": o[26] || (o[26] = (s) => I.value = s),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(F, null, Y(m.value, (s) => (a(), n("option", {
                key: s,
                value: s
              }, h(s), 9, Lu))), 128))
            ], 512), [
              [Oe, I.value]
            ])
          ])
        ]),
        e("div", Au, [
          o[64] || (o[64] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Bu, [
            Ue(e("input", {
              "onUpdate:modelValue": o[27] || (o[27] = (s) => O.value = s),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [Je, O.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: Z
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Pu = /* @__PURE__ */ ve(Tu, [["__scopeId", "data-v-3dd07e10"]]), Vu = { class: "keos-email-builder" }, Eu = { class: "kb-builder-top" }, Ou = { style: { margin: 0, paddingLeft: "1.25rem" } }, Mu = { class: "kb-email-layout" }, Nu = { class: "kb-email-sidebar" }, Du = {
  key: 0,
  class: "kb-email-form"
}, zu = { class: "kb-email-form-head" }, Hu = { class: "kb-wa-form-head-row" }, Wu = ["value"], Fu = { class: "kb-email-canvas" }, ju = {
  key: 0,
  class: "kb-email-test-banner"
}, qu = { class: "kb-email-preview-chrome" }, Ku = { class: "kb-push-preview-controls" }, Yu = { class: "kb-push-preview-as" }, Ju = ["value"], Gu = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Qu = { class: "kb-email-inbox-strip" }, Xu = { class: "kb-email-inbox-from" }, Zu = { class: "kb-email-inbox-from-name" }, ec = { class: "kb-email-inbox-from-addr" }, tc = { class: "kb-email-inbox-subject" }, sc = ["title"], ac = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, nc = { class: "kb-email-body-canvas" }, oc = ["innerHTML"], lc = { class: "kb-email-actions" }, ic = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, rc = { class: "kb-confirm-dialog" }, dc = { class: "kb-confirm-actions" }, uc = /* @__PURE__ */ de({
  __name: "KeosEmailBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    designOnly: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(t, { emit: d }) {
    function l(W) {
      if (!Array.isArray(W) || W.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const f = (C) => String(C).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), T = [];
      for (const C of W)
        switch (C.type) {
          case "heading": {
            const k = Math.min(3, Math.max(1, Number(C.level) || 1)), b = f(C.content || "").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            T.push(`<h${k} style="margin:0 0 12px;font-size:${k === 1 ? "22" : k === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${b || "Heading"}</h${k}>`);
            break;
          }
          case "paragraph": {
            const k = f(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            T.push(`<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${k || "Paragraph"}</p>`);
            break;
          }
          case "image": {
            const k = (C.src || "").trim(), b = f(C.alt || ""), S = (C.linkUrl || "").trim(), Z = k ? `<img src="${f(k)}" alt="${b}" style="max-width:100%;height:auto;display:block;border:0;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            T.push(
              `<div style="margin:0 0 12px;">${S ? `<a href="${f(S)}" style="color:#2563eb;">${Z}</a>` : Z}</div>`
            );
            break;
          }
          case "button": {
            const k = f(C.text || "Button"), b = (C.url || "#").trim(), S = Math.min(24, Math.max(0, Number(C.borderRadius) ?? 8)), Z = !!C.fullWidth, ae = !!C.ghost, g = ae ? "transparent" : "#0f172a", o = ae ? "#0f172a" : "#fff", s = ae ? "2px solid #0f172a" : "none", M = Z ? "block" : "inline-block", u = Z ? "100%" : "auto";
            T.push(
              `<p style="margin:0 0 12px;"><a href="${f(b)}" style="display:${M};width:${u};text-align:center;padding:12px 24px;background:${g};color:${o};border:${s};text-decoration:none;font-size:14px;font-weight:600;border-radius:${S}px;">${k}</a></p>`
            );
            break;
          }
          case "divider": {
            const k = Math.min(8, Math.max(1, Number(C.thickness) || 1)), b = (C.color || "#e2e8f0").trim() || "#e2e8f0", S = C.lineStyle || "solid";
            T.push(
              `<hr style="margin:16px 0;border:0;border-top:${k}px ${S} ${b};" />`
            );
            break;
          }
          case "spacer": {
            const k = Math.min(120, Math.max(8, Number(C.height) || 24));
            T.push(`<div style="height:${k}px;"></div>`);
            break;
          }
          case "footer": {
            const k = f(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), b = (C.unsubscribeUrl || "").trim(), S = f(C.companyAddress || "");
            T.push(
              `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${k || "Footer"}` + (b ? `<p style="margin:8px 0 0;"><a href="${f(b)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (S ? `<p style="margin:4px 0 0;">${S}</p>` : "") + "</div>"
            );
            break;
          }
          case "list": {
            const k = C.style === "numbered" ? "ol" : "ul", S = (Array.isArray(C.items) ? C.items : []).map(
              (Z) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${f(String(Z)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            T.push(`<${k} style="margin:0 0 12px;padding-left:24px;">${S || "<li>Item</li>"}</${k}>`);
            break;
          }
          case "quote": {
            const k = f(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), b = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, S = b[C.style || "default"] || b.default;
            T.push(
              `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${S}font-size:14px;line-height:1.6;">${k || "Quote"}</div>`
            );
            break;
          }
          case "social": {
            const b = (Array.isArray(C.links) ? C.links : []).filter((S) => (S.url || "").trim());
            if (b.length === 0)
              T.push(
                '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>'
              );
            else {
              const S = (Z) => `<a href="${f((Z.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${f(Z.platform || "Link")}</a>`;
              T.push(`<div style="margin:0 0 12px;text-align:center;">${b.map(S).join("")}</div>`);
            }
            break;
          }
          case "video": {
            const k = (C.thumbnailUrl || "").trim(), b = (C.videoUrl || "#").trim(), S = f(C.caption || ""), Z = k ? `<img src="${f(k)}" alt="Video" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            T.push(
              `<div style="margin:0 0 12px;"><a href="${f(b)}" style="display:block;color:inherit;">${Z}</a>` + (S ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${S}</p>` : "") + "</div>"
            );
            break;
          }
          case "link_list": {
            const k = Array.isArray(C.links) ? C.links : [], b = f(C.separator || " | "), Z = k.filter((ae) => (ae.text || ae.url) && (ae.url || "").trim()).map(
              (ae) => `<a href="${f((ae.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${f(ae.text || "Link")}</a>`
            );
            T.push(
              `<p style="margin:0 0 12px;font-size:12px;color:#64748b;text-align:center;">${Z.join(b)}</p>`
            );
            break;
          }
          case "columns": {
            const k = f(C.leftContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), b = f(C.rightContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            T.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${k || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${b || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const k = Math.min(4, Math.max(1, Number(C.columnCount) || 2)), b = Array.isArray(C.cells) ? C.cells.slice(0, k) : [], S = 100 / k, Z = Array.from({ length: k }, (ae, g) => {
              const o = b[g] ?? "", s = f(o).replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<td width="${S}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${s || "—"}</td>`;
            }).join("");
            T.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${Z}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const k = Array.isArray(C.links) ? C.links : [], b = f(C.separator || " | "), Z = k.filter((ae) => (ae.text || ae.url) && (ae.url || "").trim()).map(
              (ae) => `<a href="${f((ae.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${f(ae.text || "Link")}</a>`
            );
            T.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${Z.length ? Z.join(b) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const b = (Array.isArray(C.items) ? C.items : []).map((S) => {
              const Z = f(S.title || "Section"), ae = f(S.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${Z}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${ae}</div></details>`;
            }).join("");
            T.push(b ? `<div style="margin:0 0 12px;">${b}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>');
            break;
          }
          case "carousel": {
            const b = (Array.isArray(C.slides) ? C.slides : []).filter((S) => (S.imageUrl || "").trim());
            if (b.length === 0)
              T.push('<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>');
            else {
              const S = b[0], Z = `<img src="${f(S.imageUrl)}" alt="${f(S.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, ae = (S.linkUrl || "").trim();
              T.push(
                `<div style="margin:0 0 12px;">${ae ? `<a href="${f(ae)}">${Z}</a>` : Z}` + (b.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${b.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const k = f(C.label || "Offer ends in"), b = C.endDateTime ? new Date(C.endDateTime).toLocaleString() : "—";
            T.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${k}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${b}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const k = (C.imageUrl || "").trim(), b = f(C.title || "Product"), S = f(C.price || ""), Z = f(C.buttonText || "Buy now"), ae = (C.buttonUrl || "#").trim(), g = k ? `<img src="${f(k)}" alt="${f(C.alt || b)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            T.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${g}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${b}</p>` + (S ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${S}</p>` : "") + `<a href="${f(ae)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${Z}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const k = f((C.content || "").trim());
            T.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${k || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const k = (C.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), b = f((C.caption || "").trim());
            T.push(
              '<div style="margin:0 0 12px;">' + (b ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${b}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${k || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const k = (C.feedUrl || "").trim(), b = Math.min(20, Math.max(1, Number(C.maxItems) ?? 5));
            T.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (k ? `<p style="margin:0;font-size:12px;color:#64748b;">${f(k)} · max ${b} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const k = (C.imageUrl || "").trim(), b = (C.fallbackUrl || "").trim(), S = f(C.alt || "Dynamic image");
            k ? T.push(
              `<div style="margin:0 0 12px;"><img src="${f(k)}" alt="${S}" style="max-width:100%;height:auto;display:block;border:0;" />` + (b ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${f(b)}</p>` : "") + "</div>"
            ) : T.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return T.join("");
    }
    const r = t, i = d, {
      campaign: v,
      dirty: _,
      customValidatorErrors: p,
      getValidationWithWarnings: m,
      update: I,
      updateMessage: O,
      undo: L,
      redo: y,
      canUndo: A,
      canRedo: E,
      resetMessage: z,
      hooks: R
    } = We({
      initial: r.modelValue,
      hooks: {
        ...r.hooks,
        customValidators: async (W) => {
          var k, b, S;
          const f = [];
          (k = W.name) != null && k.trim() || f.push("Template name is required");
          const T = W.message;
          (b = T == null ? void 0 : T.subject) != null && b.trim() || f.push("Subject is required");
          const C = (S = r.hooks) != null && S.customValidators ? await r.hooks.customValidators(W) : [];
          return [...f, ...C];
        }
      },
      onDirty: () => i("change", v.value)
    }), { lastSavedAt: w } = Fe(v, { channel: "email" });
    function ee(W) {
      (W.metaKey || W.ctrlKey) && W.key === "z" && (W.preventDefault(), W.shiftKey ? y() : L());
    }
    Ne(() => {
      window.addEventListener("keydown", ee);
    }), De(() => {
      window.removeEventListener("keydown", ee);
    }), he(
      v,
      (W) => i("update:modelValue", W),
      { deep: !0 }
    );
    const ie = G(), ce = G(!0);
    async function ue() {
      if (R.estimateReach)
        try {
          ie.value = await R.estimateReach(v.value.audience);
        } catch {
          ie.value = void 0;
        }
      R.canSend && (ce.value = await Promise.resolve(R.canSend()));
    }
    ue(), he(() => v.value.audience, ue, { deep: !0 });
    const pe = U(() => (p.value, m(ie.value))), be = U(() => pe.value.blockingErrors), _e = U(() => pe.value.warnings), oe = U(() => pe.value.valid), Q = U(() => v.value.template_type ?? "transactional"), j = G(""), se = G(!1), x = G(null), le = U(() => {
      const W = j.value;
      return W ? Ve.find((f) => f.id === W) ?? null : null;
    });
    function ye(W) {
      const f = v.value, T = W.campaign.message ? { ...f.message, ...W.campaign.message } : f.message;
      I({
        ...W.campaign,
        message: T
      }), x.value = null, se.value = !1;
    }
    function fe(W) {
      const f = W.target.value;
      if (!f) return;
      const T = lt.find((C) => C.id === f);
      T && (_.value ? (x.value = T, se.value = !0) : ye(T), W.target.value = "");
    }
    function Re(W) {
      I({ template_type: W });
    }
    function Ae(W) {
      I({
        name: W,
        tracking: { ...v.value.tracking ?? {}, campaign_name: W }
      });
    }
    const Se = U(
      () => v.value.message.subject ?? ""
    ), ke = U(
      () => v.value.message.preview_text ?? ""
    ), $e = U(
      () => v.value.message.html ?? ""
    ), Le = U(
      () => v.value.message.from_name ?? "Your App"
    ), B = U(
      () => v.value.message.from_address ?? "notifications@example.com"
    ), N = U(() => v.value.message.blocks ?? []), K = U(() => {
      const W = N.value;
      if (Array.isArray(W) && W.length > 0) return l(W);
      const f = $e.value;
      return f && f.trim() ? f : l([]);
    }), re = U(() => {
      const W = Se.value;
      return le.value ? Te(W, le.value.data) : W;
    }), D = U(() => {
      const W = ke.value;
      return le.value ? Te(W, le.value.data) : W;
    }), H = U(() => {
      const W = K.value;
      return le.value ? Te(W, le.value.data) : W;
    }), J = G("desktop");
    function xe() {
      oe.value && i("save", v.value);
    }
    return (W, f) => (a(), n("div", Vu, [
      e("div", Eu, [
        ge(je, {
          "campaign-name": c(v).name,
          status: c(v).status,
          dirty: c(_),
          "last-saved-at": c(w),
          "can-undo": c(A),
          "can-redo": c(E),
          "onUpdate:campaignName": Ae,
          onUndo: c(L),
          onRedo: c(y)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        be.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({
            background: c(te).dangerBg,
            border: `1px solid ${c(te).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[16]}px ${c(q)[24]}px`,
            marginBottom: `${c(q)[24]}px`
          })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(F, null, Y(be.value, (T) => (a(), n("li", {
              key: T.message
            }, h(T.message), 1))), 128))
          ], 4)
        ], 4)) : $("", !0),
        _e.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({
            background: c(te).neutral.bg,
            border: `1px solid ${c(te).neutral.border}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[16]}px ${c(q)[24]}px`,
            marginBottom: `${c(q)[24]}px`,
            fontSize: "0.875rem",
            color: c(te).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Ou, [
            (a(!0), n(F, null, Y(_e.value, (T) => (a(), n("li", {
              key: T.message
            }, h(T.message), 1))), 128))
          ])
        ], 4)) : $("", !0)
      ]),
      e("div", Mu, [
        e("aside", Nu, [
          t.disabledSections.includes("email") ? $("", !0) : (a(), n("div", Du, [
            e("div", zu, [
              f[9] || (f[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", Hu, [
                ge(qe, {
                  "template-type": Q.value,
                  onUpdate: Re
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: fe
                }, [
                  f[8] || (f[8] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(F, null, Y(c(lt), (T) => (a(), n("option", {
                    key: T.id,
                    value: T.id
                  }, h(T.label), 9, Wu))), 128))
                ], 32)
              ])
            ]),
            ge(Pu, {
              message: c(v).message,
              "variable-options": t.variableOptions,
              "show-reset": !0,
              onUpdate: c(O),
              onReset: f[0] || (f[0] = (T) => c(z)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Fu, [
          !t.designOnly && c(v).audience.test_mode ? (a(), n("div", ju, [...f[10] || (f[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : $("", !0),
          e("div", qu, [
            e("div", Ku, [
              e("label", Yu, [
                f[12] || (f[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": f[1] || (f[1] = (T) => j.value = T),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  f[11] || (f[11] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(F, null, Y(c(Ve), (T) => (a(), n("option", {
                    key: T.id,
                    value: T.id
                  }, h(T.label), 9, Ju))), 128))
                ], 512), [
                  [Oe, j.value]
                ])
              ])
            ]),
            e("div", Gu, [
              e("button", {
                type: "button",
                class: me(["kb-email-device-btn", { "kb-email-device-btn--active": J.value === "desktop" }]),
                onClick: f[2] || (f[2] = (T) => J.value = "desktop")
              }, [...f[13] || (f[13] = [
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
                class: me(["kb-email-device-btn", { "kb-email-device-btn--active": J.value === "mobile" }]),
                onClick: f[3] || (f[3] = (T) => J.value = "mobile")
              }, [...f[14] || (f[14] = [
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
              class: me(["kb-email-preview-frame", { "kb-email-preview-frame--mobile": J.value === "mobile" }])
            }, [
              e("div", Qu, [
                e("div", Xu, [
                  e("span", Zu, h(Le.value), 1),
                  e("span", ec, "<" + h(B.value) + ">", 1)
                ]),
                e("div", tc, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: re.value || "No subject"
                  }, h(re.value || "No subject"), 9, sc),
                  D.value ? (a(), n("span", ac, " — " + h(D.value), 1)) : $("", !0)
                ])
              ]),
              e("div", nc, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: H.value
                }, null, 8, oc)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", lc, [
        t.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: f[4] || (f[4] = (T) => i("duplicate", JSON.parse(JSON.stringify(c(v)))))
        }, " Duplicate ")) : $("", !0),
        t.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: xe
        }, " Save ")) : $("", !0),
        t.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-email-action kb-email-action--primary",
          onClick: f[5] || (f[5] = (T) => i("edit"))
        }, " Close ")) : $("", !0)
      ]),
      se.value ? (a(), n("div", ic, [
        e("div", rc, [
          f[15] || (f[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          f[16] || (f[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", dc, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: f[6] || (f[6] = (T) => {
                se.value = !1, x.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: f[7] || (f[7] = (T) => x.value && ye(x.value))
            }, "Replace")
          ])
        ])
      ])) : $("", !0)
    ]));
  }
}), _t = /* @__PURE__ */ ve(uc, [["__scopeId", "data-v-69de022d"]]), cc = { class: "kb-shell" }, pc = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, mc = ["aria-selected", "onClick"], vc = { class: "kb-shell__meta" }, bc = ["href"], gc = { class: "kb-shell__body" }, yc = /* @__PURE__ */ de({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(t, { emit: d }) {
    const l = d, r = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (i, v) => (a(), n("div", cc, [
      e("header", {
        class: "kb-shell__header",
        style: ne({ padding: `${c(q)[12]}px ${c(q)[24]}px`, borderBottom: `1px solid ${c(te).neutral.border}`, background: c(te).neutral.bg })
      }, [
        v[0] || (v[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", pc, [
          (a(), n(F, null, Y(r, (_) => e("button", {
            key: _.id,
            type: "button",
            class: me(["kb-shell__channel", { "kb-shell__channel--active": t.channel === _.id }]),
            role: "tab",
            "aria-selected": t.channel === _.id,
            onClick: (p) => l("switch-channel", _.id)
          }, h(_.label), 11, mc)), 64))
        ]),
        e("div", vc, [
          t.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: ne({ padding: "2px 8px", borderRadius: `${c(Ce).input}px`, fontSize: "0.75rem", background: c(te).neutral.bg, color: c(te).neutral.textMuted })
          }, h(t.environment), 5)) : $("", !0),
          t.helpUrl ? (a(), n("a", {
            key: 1,
            href: t.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ne({ color: c(te).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, bc)) : $("", !0)
        ])
      ], 4),
      e("div", gc, [
        Be(i.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), fc = /* @__PURE__ */ ve(yc, [["__scopeId", "data-v-0df30803"]]), kc = {
  class: "kb-outline",
  "aria-label": "Sections"
}, hc = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, _c = ["onClick"], $c = /* @__PURE__ */ de({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(t) {
    var v;
    const d = t, l = G(((v = d.items[0]) == null ? void 0 : v.id) ?? "");
    let r = null;
    function i(_) {
      const p = document.getElementById(_);
      p && p.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return Ne(() => {
      const _ = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      _ && (r = new IntersectionObserver(
        (p) => {
          for (const m of p)
            if (m.isIntersecting) {
              const I = m.target.getAttribute("data-outline-id");
              I && (l.value = I);
            }
        },
        { root: _ === document ? null : _, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((p) => {
        const m = document.getElementById(p.id);
        m && (r == null || r.observe(m));
      }));
    }), De(() => {
      r == null || r.disconnect();
    }), he(
      () => d.items,
      (_) => {
        _.length && !l.value && (l.value = _[0].id);
      },
      { immediate: !0 }
    ), (_, p) => (a(), n("nav", kc, [
      e("ul", hc, [
        (a(!0), n(F, null, Y(t.items, (m) => (a(), n("li", {
          key: m.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: me(["kb-outline__btn", { "kb-outline__btn--active": l.value === m.id }]),
            style: ne({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${c(q)[8]}px ${c(q)[12]}px`,
              border: "none",
              borderRadius: `${c(Ce).input}px`,
              background: l.value === m.id ? c(te).neutral.bg : "transparent",
              color: l.value === m.id ? "#0f172a" : c(te).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: l.value === m.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (I) => i(m.id)
          }, h(m.label), 15, _c)
        ]))), 128))
      ])
    ]));
  }
}), wc = /* @__PURE__ */ ve($c, [["__scopeId", "data-v-25c37675"]]), xc = ["id"], Cc = {
  key: 1,
  class: "kb-form-shell__head"
}, Sc = /* @__PURE__ */ de({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(t) {
    return (d, l) => (a(), n("div", {
      class: "kb-form-shell",
      id: t.sectionId ?? void 0,
      style: ne({
        padding: `${c(q)[24]}px ${c(q)[24]}px ${c(q)[32]}px`,
        marginBottom: 0
      })
    }, [
      t.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ne({ marginBottom: c(q)[24], paddingBottom: c(q)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ne({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: c(q)[12] })
        }, h(t.label), 5),
        Be(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", Cc, [
        Be(d.$slots, "head", {}, void 0, !0)
      ])),
      Be(d.$slots, "default", {}, void 0, !0)
    ], 12, xc));
  }
}), Ic = /* @__PURE__ */ ve(Sc, [["__scopeId", "data-v-6504df41"]]), Uc = /* @__PURE__ */ de({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(t) {
    return (d, l) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ne({
        display: "flex",
        justifyContent: t.align === "start" ? "flex-start" : t.align === "between" ? "space-between" : "flex-end",
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
      Be(d.$slots, "default")
    ], 4));
  }
}), Rc = /* @__PURE__ */ de({
  __name: "BuilderTopShell",
  setup(t) {
    return (d, l) => (a(), n("div", {
      class: "kb-top-shell",
      style: ne({
        marginLeft: c(q)[24],
        marginRight: c(q)[24]
      })
    }, [
      Be(d.$slots, "header"),
      Be(d.$slots, "errors"),
      Be(d.$slots, "warnings"),
      Be(d.$slots, "default")
    ], 4));
  }
});
function Lc(t) {
  t.component("KeosNotificationBuilder", ft), t.component("KeosWhatsAppBuilder", kt), t.component("KeosSmsBuilder", ht), t.component("KeosEmailBuilder", _t), t.component("BuilderShell", fc), t.component("BuilderOutline", wc), t.component("BuilderVersionHistoryModal", yt), t.component("BuilderFormShell", Ic), t.component("BuilderActionsBar", Uc), t.component("BuilderTopShell", Rc);
}
const Bc = {
  install: Lc,
  KeosNotificationBuilder: ft,
  KeosWhatsAppBuilder: kt,
  KeosSmsBuilder: ht,
  KeosEmailBuilder: _t
};
export {
  Uc as BuilderActionsBar,
  Ic as BuilderFormShell,
  wc as BuilderOutline,
  fc as BuilderShell,
  Rc as BuilderTopShell,
  yt as BuilderVersionHistoryModal,
  Ve as DEFAULT_SAMPLE_PROFILES,
  _t as KeosEmailBuilder,
  ft as KeosNotificationBuilder,
  ht as KeosSmsBuilder,
  kt as KeosWhatsAppBuilder,
  Bc as default,
  Lc as install,
  Te as renderTemplatePreview,
  Fe as useAutosave,
  We as useCampaignState
};
//# sourceMappingURL=index.js.map
