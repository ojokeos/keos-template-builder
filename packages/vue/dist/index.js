import { ref as J, watch as ye, computed as I, defineComponent as ie, openBlock as a, createElementBlock as n, normalizeStyle as ne, unref as c, createElementVNode as e, Fragment as W, renderList as K, toDisplayString as k, createTextVNode as X, createCommentVNode as x, normalizeClass as ce, withDirectives as Ue, vModelSelect as Oe, vModelText as Je, vModelCheckbox as _t, createStaticVNode as Me, withKeys as wt, onMounted as Ne, onUnmounted as De, createVNode as ue, createBlock as $t, renderSlot as Le } from "vue";
const j = {
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
}, ee = {
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
ee.neutral.textMuted, ee.neutral.textMeta;
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
}, xt = ["android", "ios", "web"], rt = "normal", dt = ["low", "normal", "high"], Ct = 86400, St = [3600, 7200, 86400, 172800], ut = "1.0", It = ["topic", "segment", "user_list"];
function Ge() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...xt],
    test_mode: !1
  };
}
function Qe() {
  return {
    title: "",
    body: "",
    variables_used: [],
    // No actions by default; UI can add up to provider-supported count.
    // When omitted, mappers simply won't include actions.
    // @ts-expect-error actions is optional on CampaignMessage but we initialize as empty.
    actions: []
  };
}
function Xe() {
  return {
    priority: rt,
    ttl_seconds: Ct,
    quiet_hours_respected: !1,
    send_local_time: !1,
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
function Ut(s) {
  return {
    schema_version: ut,
    name: "",
    status: "draft",
    audience: Ge(),
    message: Qe(),
    delivery: Xe(),
    tracking: Ze(),
    ...s
  };
}
function ct(s) {
  const r = s;
  return r.schema_version || (r.schema_version = ut), r.audience || (r.audience = Ge()), r.message || (r.message = Qe()), r.delivery || (r.delivery = Xe()), r.tracking || (r.tracking = Ze()), dt.includes(r.delivery.priority) || (r.delivery.priority = rt), It.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const Rt = 1e5;
function At(s, r) {
  var i, m, g;
  const l = [], d = r ?? s.audience.estimated_reach;
  return d !== void 0 && d >= Rt && l.push({
    message: `Estimated reach is very high (${d.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), s.tracking && !((i = s.tracking.campaign_name) != null && i.trim()) && !((m = s.name) != null && m.trim()) && l.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (g = s.message.deep_link) != null && g.trim() || l.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), l;
}
function pt(s, r = "error") {
  return { message: s, severity: r };
}
function mt(s) {
  const r = [];
  return s.schema_version || r.push(pt("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function Bt(s, r) {
  const l = mt(s), d = At(s, r);
  return {
    valid: l.valid,
    errors: [
      ...l.errors,
      ...d.map((i) => pt(i.message, i.severity))
    ]
  };
}
function Lt(s) {
  return s.errors.filter((r) => r.severity === "error");
}
function Tt(s) {
  return s.errors.filter((r) => r.severity !== "error");
}
function Pe(s, r) {
  return s.length <= r ? { text: s, truncated: !1 } : { text: s.slice(0, Math.max(0, r - 3)) + "...", truncated: !0 };
}
const ze = He.android;
function Pt(s) {
  const { title: r, body: l } = s, d = Pe(r || "", ze.title), i = Pe(l || "", ze.body);
  return {
    title: d.text,
    body: i.text,
    imageUrl: s.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: i.truncated,
    expanded: !1
  };
}
function Vt(s) {
  const { title: r, body: l } = s, d = Pe(r || "", ze.title), i = Pe(l || "", ze.body);
  return {
    title: d.text,
    body: i.text,
    imageUrl: s.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: i.truncated,
    expanded: !0
  };
}
function Et(s, r = {}) {
  const l = r.expanded ? Vt(s) : Pt(s);
  return r.darkMode !== void 0 && (l.darkMode = r.darkMode), l;
}
const et = He.ios;
function vt(s) {
  const { title: r, body: l } = s, d = Pe(r || "", et.title), i = Pe(l || "", et.body);
  return {
    title: d.text,
    body: i.text,
    imageUrl: s.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: i.truncated,
    expanded: !1
  };
}
function Ot(s) {
  return vt(s);
}
function Mt(s, r = {}) {
  const l = r.variant === "lockscreen" ? Ot(s) : vt(s);
  return r.darkMode !== void 0 && (l.darkMode = r.darkMode), l;
}
const tt = He.web;
function st(s) {
  const { title: r, body: l } = s, d = Pe(r || "", tt.title), i = Pe(l || "", tt.body);
  return {
    title: d.text,
    body: i.text,
    imageUrl: s.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: i.truncated
  };
}
function Nt(s) {
  return s.map((r) => ({ message: r, severity: "error" }));
}
function Ye(s) {
  return JSON.parse(JSON.stringify(s));
}
function We(s = {}) {
  const r = J(
    ct(s.initial ?? Ut())
  ), l = s.hooks ?? {}, d = J(!1), i = J([]);
  ye(
    r,
    () => {
      if (!l.customValidators) {
        i.value = [];
        return;
      }
      l.customValidators(r.value).then((F) => {
        i.value = F;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const m = J([]), g = J([]);
  function p() {
    const F = Ye(r.value);
    m.value = [...m.value.slice(-19), F], g.value = [];
  }
  const y = I(() => m.value.length > 0), R = I(() => g.value.length > 0);
  function G() {
    m.value.length !== 0 && (g.value = [Ye(r.value), ...g.value], r.value = m.value[m.value.length - 1], m.value = m.value.slice(0, -1));
  }
  function z() {
    g.value.length !== 0 && (m.value = [...m.value, Ye(r.value)], r.value = g.value[0], g.value = g.value.slice(1));
  }
  ye(
    r,
    () => {
      var F;
      d.value = !0, (F = s.onDirty) == null || F.call(s);
    },
    { deep: !0 }
  );
  const _ = I(() => mt(r.value));
  function O(F) {
    const se = Bt(r.value, F), $ = Nt(i.value), oe = [...Lt(se), ...$], be = [...se.errors, ...$], ke = se.valid && $.length === 0;
    return {
      ...se,
      errors: be,
      valid: ke,
      blockingErrors: oe,
      warnings: Tt(se)
    };
  }
  function E(F) {
    p(), r.value = { ...r.value, ...F };
  }
  function H(F) {
    p(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...F }
    };
  }
  function A(F) {
    p(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...F }
    };
  }
  function w(F) {
    p(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...F }
    };
  }
  function te(F) {
    p(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...F } : { campaign_name: "", tags: [], ab_test: !1, ...F }
    };
  }
  function de(F) {
    p(), r.value = {
      ...r.value,
      message: { ...Qe(), ...F }
    };
  }
  function me(F) {
    p(), r.value = {
      ...r.value,
      delivery: { ...Xe(), ...F }
    };
  }
  function pe(F) {
    p(), r.value = {
      ...r.value,
      tracking: { ...Ze(), ...F }
    };
  }
  function ve(F) {
    p(), r.value = {
      ...r.value,
      audience: { ...Ge(), ...F }
    };
  }
  const fe = I(() => ({
    title: r.value.message.title,
    body: r.value.message.body,
    imageUrl: r.value.message.image_url
  }));
  function xe(F, se) {
    const $ = fe.value;
    let oe;
    switch (F) {
      case "android":
        oe = Et($, { expanded: se == null ? void 0 : se.expanded });
        break;
      case "ios":
        oe = Mt($);
        break;
      case "web":
        oe = st($);
        break;
      default:
        oe = st($);
    }
    const be = r.value.message.actions ?? [];
    return { ...oe, actions: be };
  }
  const we = He;
  async function Z() {
    return l.customValidators ? l.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: d,
    validation: _,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: i,
    getValidationWithWarnings: O,
    update: E,
    updateAudience: H,
    updateMessage: A,
    updateDelivery: w,
    updateTracking: te,
    undo: G,
    redo: z,
    canUndo: y,
    canRedo: R,
    resetMessage: de,
    resetDelivery: me,
    resetTracking: pe,
    resetAudience: ve,
    getPreview: xe,
    previewInput: fe,
    characterLimits: we,
    runCustomValidators: Z,
    hooks: l
  };
}
const Dt = "keos-draft", zt = 2e3;
function Ht(s, r) {
  return `${Dt}-${s}-${r}`;
}
function Fe(s, r) {
  const l = r.channel, d = I(
    () => {
      var G, z;
      return Ht(
        l,
        r.key ?? ((G = s.value) == null ? void 0 : G.id) ?? ((z = s.value) == null ? void 0 : z.name) ?? "draft"
      );
    }
  ), i = J(null);
  let m = null;
  function g() {
    try {
      const G = JSON.stringify(s.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(d.value, G), i.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function p() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(d.value);
    } catch {
    }
  }
  function y() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const G = window.localStorage.getItem(d.value);
      if (!G) return null;
      const z = JSON.parse(G);
      return ct(z);
    } catch {
      return null;
    }
  }
  function R() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return ye(
    s,
    () => {
      R() && (m && clearTimeout(m), m = setTimeout(() => {
        m = null, g();
      }, zt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: i,
    clearDraft: p,
    getDraft: y,
    persist: g
  };
}
const Wt = { class: "kb-header__row" }, Ft = ["value"], jt = { class: "kb-header__actions" }, qt = ["disabled"], Kt = ["disabled"], Yt = ["value"], Jt = ["value"], Gt = /* @__PURE__ */ ie({
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
  setup(s, { emit: r }) {
    const l = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], d = r;
    function i(g) {
      return g.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function m(g) {
      const p = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return p[g] ?? p.draft;
    }
    return (g, p) => (a(), n("header", {
      class: "kb-header",
      style: ne({
        padding: `${c(j)[16]}px 0`,
        borderBottom: `1px solid ${c(ee).neutral.border}`,
        marginBottom: `${c(j)[16]}px`
      })
    }, [
      e("div", Wt, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: s.campaignName,
          placeholder: "Name this campaign (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: p[0] || (p[0] = (y) => d("update:campaignName", y.target.value)),
          "aria-label": "Campaign name"
        }, null, 40, Ft),
        e("div", jt, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !s.canUndo,
            onClick: p[1] || (p[1] = (y) => d("undo"))
          }, " Undo ", 8, qt),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !s.canRedo,
            onClick: p[2] || (p[2] = (y) => d("redo"))
          }, " Redo ", 8, Kt)
        ]),
        s.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: s.workflowStatus,
          class: "kb-header__status-select",
          style: ne({
            padding: `${c(j)[4]}px ${c(j)[8]}px`,
            borderRadius: `${c(Ce).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...m(s.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: p[3] || (p[3] = (y) => d("update:workflowStatus", y.target.value))
        }, [
          (a(), n(W, null, K(l, (y) => e("option", {
            key: y.value,
            value: y.value
          }, k(y.label), 9, Jt)), 64))
        ], 44, Yt)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: ne({
            padding: `${c(j)[4]}px ${c(j)[8]}px`,
            borderRadius: `${c(Ce).input}px`,
            background: c(ee).neutral.bg,
            fontSize: "0.8125rem",
            color: c(ee).neutral.textMuted
          })
        }, k(s.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ne({ fontSize: "0.8125rem", color: c(ee).neutral.textMuted, marginTop: `${c(j)[4]}px` })
      }, [
        s.saving ? (a(), n(W, { key: 0 }, [
          X("Saving…")
        ], 64)) : s.dirty ? (a(), n(W, { key: 1 }, [
          X("Unsaved changes")
        ], 64)) : s.lastSavedAt ? (a(), n(W, { key: 2 }, [
          X("Last saved at " + k(i(s.lastSavedAt)), 1)
        ], 64)) : x("", !0)
      ], 4)
    ], 4));
  }
}), re = (s, r) => {
  const l = s.__vccOpts || s;
  for (const [d, i] of r)
    l[d] = i;
  return l;
}, je = /* @__PURE__ */ re(Gt, [["__scopeId", "data-v-bf624780"]]), Qt = { class: "kb-section" }, Xt = { class: "kb-section__head" }, Zt = { class: "kb-section__desc" }, es = { class: "kb-field" }, ts = { class: "kb-label" }, ss = { class: "kb-field-with-rail" }, as = ["value", "aria-invalid", "aria-describedby"], ns = {
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
}, gs = { class: "kb-field" }, ys = { class: "kb-actions-list" }, fs = ["value", "onInput"], hs = ["value", "onInput"], ks = ["onClick"], _s = ["disabled"], ws = { class: "kb-action-chips" }, $s = ["disabled", "onClick"], xs = /* @__PURE__ */ ie({
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
    const r = s;
    return (l, d) => (a(), n("section", Qt, [
      e("div", Xt, [
        d[6] || (d[6] = e("h3", { class: "kb-section__title" }, "Message", -1)),
        s.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: d[0] || (d[0] = (i) => l.$emit("reset"))
        }, " Reset section ")) : x("", !0)
      ]),
      e("p", Zt, " Message body is required. Title is optional. Character limits depend on the selected platform (" + k(s.selectedPlatform) + "). ", 1),
      e("div", es, [
        e("label", ts, [
          d[7] || (d[7] = X(" Title ", -1)),
          e("span", {
            class: ce(["kb-counter", { "kb-counter--warn": s.titleCount > s.titleLimit }])
          }, k(s.titleCount) + "/" + k(s.titleLimit), 3)
        ]),
        e("div", ss, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Notification title",
            value: s.message.title,
            "aria-invalid": !!s.titleError,
            "aria-describedby": s.titleError ? "title-error" : void 0,
            onInput: d[1] || (d[1] = (i) => l.$emit("update", { title: i.target.value }))
          }, null, 40, as),
          e("div", {
            class: "kb-char-rail",
            role: "presentation",
            style: ne({ "--pct": Math.min(100, s.titleCount / s.titleLimit * 100) + "%" })
          }, [...d[8] || (d[8] = [
            e("div", { class: "kb-char-rail__fill" }, null, -1)
          ])], 4)
        ]),
        s.titleError ? (a(), n("p", ns, k(s.titleError), 1)) : x("", !0)
      ]),
      e("div", os, [
        e("label", ls, [
          d[9] || (d[9] = X(" Message ", -1)),
          e("span", {
            class: ce(["kb-counter", { "kb-counter--warn": s.bodyCount > s.bodyLimit }])
          }, k(s.bodyCount) + "/" + k(s.bodyLimit), 3)
        ]),
        e("div", is, [
          e("textarea", {
            class: "kb-textarea",
            rows: "3",
            placeholder: "Notification body",
            value: s.message.body,
            "aria-invalid": !!s.bodyError,
            "aria-describedby": s.bodyError ? "body-error" : void 0,
            onInput: d[2] || (d[2] = (i) => l.$emit("update", { body: i.target.value }))
          }, null, 40, rs),
          e("div", {
            class: "kb-char-rail",
            role: "presentation",
            style: ne({ "--pct": Math.min(100, s.bodyCount / s.bodyLimit * 100) + "%" })
          }, [...d[10] || (d[10] = [
            e("div", { class: "kb-char-rail__fill" }, null, -1)
          ])], 4)
        ]),
        s.bodyError ? (a(), n("p", ds, k(s.bodyError), 1)) : x("", !0)
      ]),
      e("div", us, [
        d[11] || (d[11] = e("label", { class: "kb-label" }, [
          X(" Media (image URL) "),
          e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: s.message.image_url,
          "aria-invalid": !!s.imageUrlError,
          "aria-describedby": s.imageUrlError ? "image-url-error" : void 0,
          onInput: d[3] || (d[3] = (i) => l.$emit("update", { image_url: i.target.value || void 0 }))
        }, null, 40, cs),
        s.imageUrlError ? (a(), n("p", ps, k(s.imageUrlError), 1)) : x("", !0)
      ]),
      e("div", ms, [
        d[12] || (d[12] = e("label", { class: "kb-label" }, [
          X(" Deep link / Action URL "),
          e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https:// or app://...",
          value: s.message.deep_link,
          "aria-invalid": !!s.deepLinkError,
          "aria-describedby": s.deepLinkError ? "deeplink-error" : void 0,
          onInput: d[4] || (d[4] = (i) => l.$emit("update", { deep_link: i.target.value || void 0 }))
        }, null, 40, vs),
        s.deepLinkError ? (a(), n("p", bs, k(s.deepLinkError), 1)) : x("", !0)
      ]),
      e("div", gs, [
        d[14] || (d[14] = e("label", { class: "kb-label" }, [
          X(" Actions (optional) "),
          e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
        ], -1)),
        e("div", ys, [
          (a(!0), n(W, null, K(r.message.actions ?? [], (i, m) => (a(), n("div", {
            key: i.id || m,
            class: "kb-action-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--action-label",
              placeholder: "Button label (e.g. View, Dismiss)",
              value: i.label,
              onInput: (g) => {
                var R;
                const p = [...r.message.actions ?? []], y = Number(m);
                p[y] = {
                  ...p[y],
                  id: ((R = p[y]) == null ? void 0 : R.id) || `action_${y + 1}`,
                  label: g.target.value
                }, l.$emit("update", { actions: p });
              }
            }, null, 40, fs),
            e("input", {
              type: "url",
              class: "kb-input kb-input--action-url",
              placeholder: "Optional deep link (https:// or app://)",
              value: i.url,
              onInput: (g) => {
                var R;
                const p = [...r.message.actions ?? []], y = Number(m);
                p[y] = {
                  ...p[y],
                  id: ((R = p[y]) == null ? void 0 : R.id) || `action_${y + 1}`,
                  url: g.target.value || void 0
                }, l.$emit("update", { actions: p });
              }
            }, null, 40, hs),
            e("button", {
              type: "button",
              class: "kb-btn-remove-action",
              onClick: () => {
                const g = [...r.message.actions ?? []];
                g.splice(Number(m), 1), l.$emit("update", { actions: g });
              }
            }, " Remove ", 8, ks)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-btn-add-action",
            disabled: (r.message.actions ?? []).length >= 3,
            onClick: d[5] || (d[5] = () => {
              const i = [...r.message.actions ?? []];
              i.push({
                id: `action_${i.length + 1}`,
                label: "",
                url: ""
              }), l.$emit("update", { actions: i });
            })
          }, " Add action ", 8, _s),
          e("div", ws, [
            d[13] || (d[13] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
            (a(), n(W, null, K(["View order", "Track shipment", "Open app"], (i) => e("button", {
              key: i,
              type: "button",
              class: "kb-action-chip",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: () => {
                const m = [...r.message.actions ?? []];
                m.push({
                  id: `action_${Date.now()}`,
                  label: i,
                  url: ""
                }), l.$emit("update", { actions: m });
              }
            }, k(i), 9, $s)), 64))
          ])
        ])
      ])
    ]));
  }
}), Cs = /* @__PURE__ */ re(xs, [["__scopeId", "data-v-761043cd"]]), Ss = { class: "kb-section kb-section--inline-personalization" }, Is = { class: "kb-field" }, Us = { class: "kb-insert-row" }, Rs = ["value"], As = { class: "kb-field" }, Bs = { class: "kb-insert-row" }, Ls = { class: "kb-field" }, Ts = { class: "kb-variable-list" }, Ps = /* @__PURE__ */ ie({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(s, { emit: r }) {
    const l = s, d = r, i = ["first_name", "last_name", "order_id", "city"], m = J(l.variableOptions ?? i), g = J(m.value[0] ?? i[0]), p = J("");
    ye(
      () => l.variableOptions,
      (z) => {
        z && z.length && (m.value = [...z], m.value.includes(g.value) || (g.value = m.value[0]));
      }
    );
    const y = I(() => m.value);
    function R(z) {
      d("insertVariable", { variable: g.value, field: z });
    }
    function G() {
      const z = p.value.trim();
      z && (m.value.includes(z) || (m.value = [...m.value, z]), g.value = z, p.value = "");
    }
    return (z, _) => (a(), n("section", Ss, [
      _[8] || (_[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      _[9] || (_[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Is, [
        _[4] || (_[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Us, [
          Ue(e("select", {
            "onUpdate:modelValue": _[0] || (_[0] = (O) => g.value = O),
            class: "kb-select"
          }, [
            (a(!0), n(W, null, K(y.value, (O) => (a(), n("option", {
              key: O,
              value: O
            }, k(O), 9, Rs))), 128))
          ], 512), [
            [Oe, g.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: _[1] || (_[1] = (O) => R("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: _[2] || (_[2] = (O) => R("body"))
          }, "Into message")
        ])
      ]),
      e("div", As, [
        _[5] || (_[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Bs, [
          Ue(e("input", {
            "onUpdate:modelValue": _[3] || (_[3] = (O) => p.value = O),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [Je, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: G
          }, " Add ")
        ])
      ]),
      e("div", Ls, [
        _[6] || (_[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        _[7] || (_[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ts, [
          (a(!0), n(W, null, K(y.value, (O) => (a(), n("li", { key: O }, [
            e("code", null, "{{ " + k(O) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), bt = /* @__PURE__ */ re(Ps, [["__scopeId", "data-v-6d49f6dc"]]), Vs = { class: "kb-section kb-section--template-type" }, Es = { class: "kb-field" }, Os = { class: "kb-radio-group" }, Ms = { class: "kb-radio" }, Ns = ["checked"], Ds = { class: "kb-radio" }, zs = ["checked"], Hs = /* @__PURE__ */ ie({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(s, { emit: r }) {
    const l = r;
    return (d, i) => (a(), n("section", Vs, [
      i[5] || (i[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      i[6] || (i[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Es, [
        e("div", Os, [
          e("label", Ms, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: s.templateType === "transactional",
              onChange: i[0] || (i[0] = (m) => l("update", "transactional"))
            }, null, 40, Ns),
            i[2] || (i[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ds, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: s.templateType === "marketing",
              onChange: i[1] || (i[1] = (m) => l("update", "marketing"))
            }, null, 40, zs),
            i[3] || (i[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        i[4] || (i[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), qe = /* @__PURE__ */ re(Hs, [["__scopeId", "data-v-991f74e5"]]), Ws = { class: "kb-section" }, Fs = { class: "kb-section__head" }, js = { class: "kb-section__desc" }, qs = { class: "kb-field" }, Ks = { class: "kb-radio-group" }, Ys = { class: "kb-radio" }, Js = ["checked"], Gs = { class: "kb-radio" }, Qs = ["checked"], Xs = {
  key: 0,
  class: "kb-field kb-row"
}, Zs = ["value"], ea = ["value"], ta = { class: "kb-field" }, sa = ["value"], aa = ["value"], na = { class: "kb-field" }, oa = ["value"], la = ["value"], ia = { class: "kb-field" }, ra = { class: "kb-checkbox" }, da = ["checked"], ua = /* @__PURE__ */ ie({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s) {
    const r = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (l, d) => {
      var i;
      return a(), n("section", Ws, [
        e("div", Fs, [
          d[8] || (d[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: d[0] || (d[0] = (m) => l.$emit("reset"))
          }, " Reset section ")) : x("", !0)
        ]),
        e("p", js, k(s.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", qs, [
          d[11] || (d[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Ks, [
            e("label", Ys, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !s.delivery.scheduled_at,
                onChange: d[1] || (d[1] = (m) => l.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Js),
              d[9] || (d[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Gs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!s.delivery.scheduled_at,
                onChange: d[2] || (d[2] = (m) => l.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Qs),
              d[10] || (d[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        s.delivery.scheduled_at ? (a(), n("div", Xs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (i = s.delivery.scheduled_at) == null ? void 0 : i.slice(0, 16),
            onInput: d[3] || (d[3] = (m) => l.$emit("update", { scheduled_at: m.target.value }))
          }, null, 40, Zs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: s.delivery.timezone,
            onInput: d[4] || (d[4] = (m) => l.$emit("update", { timezone: m.target.value }))
          }, null, 40, ea)
        ])) : x("", !0),
        s.showPushOptions ? (a(), n(W, { key: 1 }, [
          e("div", ta, [
            d[12] || (d[12] = e("label", { class: "kb-label" }, [
              X(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.ttl_seconds,
              onChange: d[5] || (d[5] = (m) => l.$emit("update", { ttl_seconds: Number(m.target.value) }))
            }, [
              (a(!0), n(W, null, K(c(St), (m) => (a(), n("option", {
                key: m,
                value: m
              }, k(r[m] ?? m + "s"), 9, aa))), 128))
            ], 40, sa)
          ]),
          e("div", na, [
            d[13] || (d[13] = e("label", { class: "kb-label" }, [
              X(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.priority,
              onChange: d[6] || (d[6] = (m) => l.$emit("update", { priority: m.target.value }))
            }, [
              (a(!0), n(W, null, K(c(dt), (m) => (a(), n("option", {
                key: m,
                value: m
              }, k(m), 9, la))), 128))
            ], 40, oa)
          ]),
          e("div", ia, [
            e("label", ra, [
              e("input", {
                type: "checkbox",
                checked: s.delivery.quiet_hours_respected,
                onChange: d[7] || (d[7] = (m) => l.$emit("update", { quiet_hours_respected: !s.delivery.quiet_hours_respected }))
              }, null, 40, da),
              d[14] || (d[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : x("", !0)
      ]);
    };
  }
}), ca = /* @__PURE__ */ re(ua, [["__scopeId", "data-v-aacf1acb"]]), pa = { class: "kb-accordion" }, ma = { class: "kb-accordion__body" }, va = { class: "kb-field" }, ba = ["value"], ga = { class: "kb-field" }, ya = { class: "kb-checkbox" }, fa = ["checked"], ha = /* @__PURE__ */ ie({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(s) {
    return (r, l) => (a(), n("details", pa, [
      l[4] || (l[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", ma, [
        e("div", va, [
          l[2] || (l[2] = e("label", { class: "kb-label" }, [
            X(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: s.delivery.collapse_key,
            onInput: l[0] || (l[0] = (d) => r.$emit("update", { collapse_key: d.target.value || void 0 }))
          }, null, 40, ba)
        ]),
        e("div", ga, [
          e("label", ya, [
            e("input", {
              type: "checkbox",
              checked: s.delivery.silent_push,
              onChange: l[1] || (l[1] = (d) => r.$emit("update", { silent_push: !s.delivery.silent_push }))
            }, null, 40, fa),
            l[3] || (l[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), ka = /* @__PURE__ */ re(ha, [["__scopeId", "data-v-e0f5c559"]]);
function Te(s, r) {
  return !s || typeof s != "string" ? s : s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (l, d) => {
    const i = d.trim();
    return i in r ? String(r[i]) : `{{ ${d} }}`;
  });
}
const Ve = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], _a = { class: "kb-preview" }, wa = {
  key: 0,
  class: "kb-preview__toggle"
}, $a = { class: "kb-checkbox" }, xa = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, Ca = { class: "kb-android-body" }, Sa = {
  key: 0,
  class: "kb-android-title"
}, Ia = {
  key: 1,
  class: "kb-android-text"
}, Ua = {
  key: 2,
  class: "kb-android-image"
}, Ra = ["src"], Aa = {
  key: 3,
  class: "kb-android-actions"
}, Ba = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, La = { class: "kb-ios-banner" }, Ta = { class: "kb-ios-content" }, Pa = {
  key: 0,
  class: "kb-ios-title"
}, Va = {
  key: 1,
  class: "kb-ios-text"
}, Ea = {
  key: 2,
  class: "kb-ios-actions"
}, Oa = {
  key: 0,
  class: "kb-ios-thumb"
}, Ma = ["src"], Na = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, Da = { class: "kb-web-toast" }, za = { class: "kb-web-body" }, Ha = {
  key: 0,
  class: "kb-web-title"
}, Wa = {
  key: 1,
  class: "kb-web-text"
}, Fa = {
  key: 2,
  class: "kb-web-image"
}, ja = ["src"], qa = {
  key: 0,
  class: "kb-web-actions"
}, Ka = /* @__PURE__ */ ie({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(s) {
    const r = s, l = J(!1), d = I(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? l.value : void 0
      })
    ), i = I(() => {
      const m = d.value;
      return r.previewProfile ? {
        ...m,
        title: Te((m == null ? void 0 : m.title) ?? "", r.previewProfile.data),
        body: Te((m == null ? void 0 : m.body) ?? "", r.previewProfile.data)
      } : m;
    });
    return (m, g) => (a(), n("div", _a, [
      s.selectedPlatform === "android" ? (a(), n("div", wa, [
        e("label", $a, [
          Ue(e("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (p) => l.value = p),
            type: "checkbox"
          }, null, 512), [
            [_t, l.value]
          ]),
          g[1] || (g[1] = e("span", null, "Expanded notification", -1))
        ])
      ])) : x("", !0),
      s.selectedPlatform === "android" ? (a(), n("div", xa, [
        g[3] || (g[3] = e("div", { class: "kb-android-status-bar" }, [
          e("span", { class: "kb-android-time" }, "12:30"),
          e("span", { class: "kb-android-icons" }, "  ")
        ], -1)),
        e("div", {
          class: ce(["kb-android-notification", { "kb-android-notification--expanded": l.value }])
        }, [
          g[2] || (g[2] = Me('<div class="kb-android-header" data-v-539e2af6><div class="kb-android-app-icon" data-v-539e2af6>A</div><div class="kb-android-app-meta" data-v-539e2af6><div class="kb-android-app-name" data-v-539e2af6>Your App</div><div class="kb-android-app-channel" data-v-539e2af6>Promotions · now</div></div><div class="kb-android-more" data-v-539e2af6>⋮</div></div>', 1)),
          e("div", Ca, [
            i.value.title ? (a(), n("div", Sa, k(i.value.title), 1)) : x("", !0),
            i.value.body ? (a(), n("div", Ia, k(i.value.body), 1)) : x("", !0),
            i.value.imageUrl ? (a(), n("div", Ua, [
              e("img", {
                src: i.value.imageUrl,
                alt: ""
              }, null, 8, Ra)
            ])) : x("", !0),
            i.value.actions && i.value.actions.length ? (a(), n("div", Aa, [
              (a(!0), n(W, null, K(i.value.actions, (p) => (a(), n("button", {
                key: p.id,
                type: "button",
                class: "kb-android-action-btn"
              }, k(p.label || "Action"), 1))), 128))
            ])) : x("", !0)
          ])
        ], 2)
      ])) : s.selectedPlatform === "ios" ? (a(), n("div", Ba, [
        g[6] || (g[6] = e("div", { class: "kb-ios-status-bar" }, [
          e("span", { class: "kb-ios-time" }, "9:41"),
          e("span", { class: "kb-ios-indicators" }, "•••")
        ], -1)),
        e("div", La, [
          g[5] || (g[5] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
          e("div", Ta, [
            g[4] || (g[4] = e("div", { class: "kb-ios-meta" }, [
              e("span", { class: "kb-ios-app-name" }, "Your App"),
              e("span", { class: "kb-ios-time-label" }, "now")
            ], -1)),
            i.value.title ? (a(), n("div", Pa, k(i.value.title), 1)) : x("", !0),
            i.value.body ? (a(), n("div", Va, k(i.value.body), 1)) : x("", !0),
            i.value.actions && i.value.actions.length ? (a(), n("div", Ea, [
              (a(!0), n(W, null, K(i.value.actions, (p) => (a(), n("button", {
                key: p.id,
                type: "button",
                class: "kb-ios-action-btn"
              }, k(p.label || "Action"), 1))), 128))
            ])) : x("", !0)
          ]),
          i.value.imageUrl ? (a(), n("div", Oa, [
            e("img", {
              src: i.value.imageUrl,
              alt: ""
            }, null, 8, Ma)
          ])) : x("", !0)
        ])
      ])) : (a(), n("div", Na, [
        g[8] || (g[8] = Me('<div class="kb-web-browser-chrome" data-v-539e2af6><span class="kb-web-dots" data-v-539e2af6><span data-v-539e2af6></span><span data-v-539e2af6></span><span data-v-539e2af6></span></span><div class="kb-web-url-bar" data-v-539e2af6><span class="kb-web-lock" data-v-539e2af6>🔒</span><span class="kb-web-origin" data-v-539e2af6>yourapp.com</span></div></div>', 1)),
        e("div", Da, [
          g[7] || (g[7] = Me('<div class="kb-web-header" data-v-539e2af6><div class="kb-web-site-icon" data-v-539e2af6>Y</div><div class="kb-web-site-meta" data-v-539e2af6><div class="kb-web-site-name" data-v-539e2af6>yourapp.com</div><div class="kb-web-site-time" data-v-539e2af6>now</div></div></div>', 1)),
          e("div", za, [
            i.value.title ? (a(), n("div", Ha, k(i.value.title), 1)) : x("", !0),
            i.value.body ? (a(), n("div", Wa, k(i.value.body), 1)) : x("", !0),
            i.value.imageUrl ? (a(), n("div", Fa, [
              e("img", {
                src: i.value.imageUrl,
                alt: ""
              }, null, 8, ja)
            ])) : x("", !0)
          ]),
          i.value.actions && i.value.actions.length ? (a(), n("div", qa, [
            (a(!0), n(W, null, K(i.value.actions, (p, y) => (a(), n("button", {
              key: p.id || y,
              type: "button",
              class: ce(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(y) > 0 }])
            }, k(p.label || "Action"), 3))), 128))
          ])) : x("", !0)
        ])
      ]))
    ]));
  }
}), Ya = /* @__PURE__ */ re(Ka, [["__scopeId", "data-v-539e2af6"]]), Ja = { class: "kb-version-dialog" }, Ga = {
  key: 0,
  class: "kb-version-empty"
}, Qa = {
  key: 1,
  class: "kb-version-list"
}, Xa = { class: "kb-version-item-label" }, Za = ["onClick"], en = { class: "kb-version-actions" }, tn = /* @__PURE__ */ ie({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(s, { emit: r }) {
    const l = r;
    function d(i) {
      try {
        return new Date(i).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return i;
      }
    }
    return (i, m) => s.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: m[1] || (m[1] = wt((g) => l("close"), ["escape"]))
    }, [
      e("div", Ja, [
        m[2] || (m[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        m[3] || (m[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        s.versions.length === 0 ? (a(), n("div", Ga, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", Qa, [
          (a(!0), n(W, null, K(s.versions, (g) => (a(), n("li", {
            key: g.id,
            class: "kb-version-item"
          }, [
            e("span", Xa, k(g.label || d(g.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (p) => {
                l("restore", g.snapshot), l("close");
              }
            }, " Restore ", 8, Za)
          ]))), 128))
        ])),
        e("div", en, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: m[0] || (m[0] = (g) => l("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : x("", !0);
  }
}), gt = /* @__PURE__ */ re(tn, [["__scopeId", "data-v-ce35a513"]]), at = [
  {
    id: "simple-alert",
    label: "Simple alert",
    campaign: {
      message: {
        title: "Heads up",
        body: "Your update is ready.",
        variables_used: []
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
        variables_used: []
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
        variables_used: ["first_name", "order_id"]
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
        body: "",
        variables_used: [],
        whatsapp_template_type: "text",
        whatsapp_template_name: "otp_verification",
        whatsapp_body: "Your code is {{ otp_code }}. Valid for 10 minutes."
      }
    }
  },
  {
    id: "order-status",
    label: "Order status",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name", "order_id"],
        whatsapp_template_type: "text",
        whatsapp_template_name: "order_update",
        whatsapp_body: "Hi {{ first_name }}, your order {{ order_id }} is on its way."
      }
    }
  },
  {
    id: "promo",
    label: "Promotion",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "text",
        whatsapp_template_name: "promo_alert",
        whatsapp_body: "Hi {{ first_name }}, we have a special offer for you."
      }
    }
  },
  {
    id: "support-reply",
    label: "Support reply",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "text",
        whatsapp_template_name: "support_reply",
        whatsapp_body: "Hi {{ first_name }}, we have responded to your request."
      }
    }
  },
  {
    id: "image-promo",
    label: "Image promotion",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "image",
        whatsapp_template_name: "image_promo",
        whatsapp_header: "New collection just dropped",
        whatsapp_media_url: "https://via.placeholder.com/600x400.png?text=Promo",
        whatsapp_body: "Hi {{ first_name }}, tap to see the latest arrivals."
      }
    }
  },
  {
    id: "video-launch",
    label: "Video launch",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "video",
        whatsapp_template_name: "video_launch",
        whatsapp_header: "Watch our new product demo",
        whatsapp_media_url: "https://example.com/video.mp4",
        whatsapp_body: "Hi {{ first_name }}, watch this short video to see what is new."
      }
    }
  },
  {
    id: "document-receipt",
    label: "Document receipt",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name", "order_id"],
        whatsapp_template_type: "document",
        whatsapp_template_name: "order_receipt",
        whatsapp_document_filename: "receipt-{{ order_id }}.pdf",
        whatsapp_media_url: "https://example.com/receipt.pdf",
        whatsapp_body: "Hi {{ first_name }}, here is your receipt for order {{ order_id }}."
      }
    }
  },
  {
    id: "location-store",
    label: "Store location",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "location",
        whatsapp_template_name: "store_location",
        whatsapp_body: "Hi {{ first_name }}, here is the location of our nearest store.",
        whatsapp_location: {
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
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "coupon",
        whatsapp_template_name: "coupon_offer",
        whatsapp_body: "Hi {{ first_name }}, use this code at checkout for a discount.",
        whatsapp_coupon_code: "SAVE20"
      }
    }
  },
  {
    id: "limited-time-offer",
    label: "Limited time offer",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "lto",
        whatsapp_template_name: "limited_time_offer",
        whatsapp_body: "Hi {{ first_name }}, this offer expires soon. Don’t miss out.",
        whatsapp_lto_expiry: "Today, 11:59 PM"
      }
    }
  },
  {
    id: "multi-product",
    label: "Multi product message",
    campaign: {
      message: {
        title: "",
        body: "",
        variables_used: ["first_name"],
        whatsapp_template_type: "mpm",
        whatsapp_template_name: "multi_product",
        whatsapp_body: "Hi {{ first_name }}, pick one of these products below.",
        whatsapp_products: [
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
        body: "",
        variables_used: [],
        whatsapp_template_type: "catalog",
        whatsapp_template_name: "catalog_showcase",
        whatsapp_body: "Browse our latest catalog items below.",
        whatsapp_products: [
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
        body: "",
        variables_used: [],
        whatsapp_template_type: "auth",
        whatsapp_template_name: "auth_code",
        whatsapp_body: "Use this code to securely sign in to your account.",
        whatsapp_auth_code: "123 456"
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
        variables_used: [],
        sms_sender_id: "YourBrand",
        sms_body: "Your appointment is confirmed for tomorrow at 10am."
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
        variables_used: ["otp_code"],
        sms_sender_id: "YourBrand",
        sms_body: "Your code: {{ otp_code }}"
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
        variables_used: ["first_name", "order_id"],
        sms_sender_id: "YourBrand",
        sms_body: "Hi {{ first_name }}, your order {{ order_id }} has shipped."
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
        variables_used: ["link"],
        sms_sender_id: "YourBrand",
        sms_body: "Flash sale today! Use SAVE20 at checkout. {{ link }}"
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
        variables_used: [],
        email_subject: "Important update",
        email_preview_text: "We have news for you.",
        email_from_name: "Your Brand",
        email_from_address: "hello@example.com",
        email_blocks: [
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
        variables_used: ["first_name"],
        email_subject: "Your weekly digest",
        email_preview_text: "Top stories and updates",
        email_from_name: "Your Brand",
        email_from_address: "news@example.com",
        email_blocks: [
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
        variables_used: ["first_name"],
        email_subject: "Special offer for you, {{ first_name }}",
        email_preview_text: "Limited time only",
        email_from_name: "Your Brand",
        email_from_address: "offers@example.com",
        email_blocks: [
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
        variables_used: ["first_name", "order_id"],
        email_subject: "Receipt for order {{ order_id }}",
        email_preview_text: "Thank you for your order",
        email_from_name: "Your Brand",
        email_from_address: "orders@example.com",
        email_blocks: [
          { id: "h1", type: "heading", level: 1, content: "Thank you for your order" },
          { id: "p1", type: "paragraph", content: "Hi {{ first_name }}, we received your order {{ order_id }}." }
        ]
      }
    }
  }
], sn = { class: "keos-notification-builder" }, an = { class: "kb-builder-top" }, nn = { style: { margin: 0, paddingLeft: "1.25rem" } }, on = { class: "kb-push-layout" }, ln = { class: "kb-push-sidebar" }, rn = {
  key: 0,
  class: "kb-push-form"
}, dn = {
  key: 0,
  class: "kb-hint-card"
}, un = { class: "kb-push-form-head" }, cn = { class: "kb-push-form-head-row" }, pn = ["value"], mn = {
  key: 1,
  class: "kb-push-form"
}, vn = { class: "kb-push-canvas" }, bn = {
  key: 0,
  class: "kb-push-test-banner"
}, gn = { class: "kb-push-preview-chrome" }, yn = { class: "kb-push-preview-controls" }, fn = { class: "kb-push-preview-as" }, hn = ["value"], kn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, _n = ["aria-selected", "aria-controls", "onClick"], wn = { class: "kb-push-preview-frame" }, $n = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, xn = { class: "kb-push-actions" }, Cn = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Sn = { class: "kb-confirm-dialog" }, In = { class: "kb-confirm-actions" }, Un = /* @__PURE__ */ ie({
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
  setup(s, { emit: r }) {
    const l = s, d = r, i = J("android"), m = J(""), g = J(!1), p = J(null), y = J(!1), R = I(() => E.value.workflow_status ?? "draft"), G = I(() => {
      const h = m.value;
      return h ? Ve.find((v) => v.id === h) ?? null : null;
    });
    function z(h) {
      const v = E.value, S = h.campaign.message ? { ...v.message, ...h.campaign.message } : v.message, Q = h.campaign.delivery ? { ...v.delivery, ...h.campaign.delivery } : v.delivery;
      te({
        ...h.campaign,
        message: S,
        delivery: Q
      }), p.value = null, g.value = !1;
    }
    function _(h) {
      const v = h.target.value;
      if (!v) return;
      const S = at.find((Q) => Q.id === v);
      S && (H.value ? (p.value = S, g.value = !0) : z(S), h.target.value = "");
    }
    function O(h) {
      E.value = h, y.value = !1;
    }
    const {
      campaign: E,
      dirty: H,
      customValidatorErrors: A,
      getValidationWithWarnings: w,
      update: te,
      updateMessage: de,
      updateDelivery: me,
      undo: pe,
      redo: ve,
      canUndo: fe,
      canRedo: xe,
      resetMessage: we,
      resetDelivery: Z,
      getPreview: F,
      characterLimits: se,
      hooks: $
    } = We({
      initial: l.modelValue,
      hooks: {
        ...l.hooks,
        customValidators: async (h) => {
          var Q, ae, b, o;
          const v = [];
          (Q = h.name) != null && Q.trim() || v.push("Template name is required"), (b = (ae = h.message) == null ? void 0 : ae.body) != null && b.trim() || v.push("Message body is required");
          const S = (o = l.hooks) != null && o.customValidators ? await l.hooks.customValidators(h) : [];
          return [...v, ...S];
        }
      },
      onDirty: () => d("change", E.value)
    }), { lastSavedAt: oe } = Fe(E, { channel: "push" });
    function be(h) {
      (h.metaKey || h.ctrlKey) && h.key === "z" && (h.preventDefault(), h.shiftKey ? ve() : pe());
    }
    Ne(() => {
      window.addEventListener("keydown", be);
    }), De(() => {
      window.removeEventListener("keydown", be);
    }), ye(
      E,
      (h) => d("update:modelValue", h),
      { deep: !0 }
    );
    const ke = J(), Re = J(!0), Be = J(!0);
    async function Se() {
      if ($.estimateReach)
        try {
          ke.value = await $.estimateReach(E.value.audience);
        } catch {
          ke.value = void 0;
        }
      $.canSend && (Re.value = await Promise.resolve($.canSend())), $.canSchedule && (Be.value = await Promise.resolve($.canSchedule()));
    }
    Se(), ye(() => E.value.audience, Se, { deep: !0 });
    const ge = I(() => (A.value, w(ke.value))), he = I(() => ge.value.blockingErrors), Ae = I(() => ge.value.warnings), U = I(() => ge.value.valid), V = I(() => se[i.value].title), q = I(() => se[i.value].body), le = I(() => E.value.message.title.length), M = I(() => E.value.message.body.length), N = I(() => {
      if (le.value > V.value) return `Title exceeds ${V.value} characters for ${i.value}.`;
    }), Y = I(() => {
      const h = he.value.find((v) => v.message === "Message body is required");
      if (h) return h.message;
      if (M.value > q.value) return `Body exceeds ${q} characters for ${i.value}.`;
    }), $e = I(() => E.value.template_type ?? "transactional");
    function D(h) {
      te({ template_type: h });
    }
    function f(h) {
      te({
        name: h,
        tracking: { ...E.value.tracking ?? {}, campaign_name: h }
      });
    }
    function B(h) {
      const v = ` {{ ${h.variable} }}`, S = E.value.message.variables_used ?? [], Q = Array.from(/* @__PURE__ */ new Set([...S, h.variable]));
      h.field === "title" ? de({
        title: E.value.message.title + v,
        variables_used: Q
      }) : de({
        body: E.value.message.body + v,
        variables_used: Q
      });
    }
    function C() {
      U.value && d("save", E.value);
    }
    return (h, v) => (a(), n("div", sn, [
      e("div", an, [
        ue(je, {
          "campaign-name": c(E).name,
          status: c(E).status,
          dirty: c(H),
          "last-saved-at": c(oe),
          "can-undo": c(fe),
          "can-redo": c(xe),
          "workflow-status": R.value,
          "onUpdate:campaignName": f,
          "onUpdate:workflowStatus": v[0] || (v[0] = (S) => c(te)({ workflow_status: S })),
          onUndo: c(pe),
          onRedo: c(ve)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "onUndo", "onRedo"]),
        he.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({ background: c(ee).dangerBg, border: `1px solid ${c(ee).dangerBorder}`, borderRadius: `${c(Ce).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px` })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(ee).danger })
          }, [
            (a(!0), n(W, null, K(he.value, (S) => (a(), n("li", {
              key: S.message
            }, k(S.message), 1))), 128))
          ], 4)
        ], 4)) : x("", !0),
        Ae.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({ background: c(ee).neutral.bg, border: `1px solid ${c(ee).neutral.border}`, borderRadius: `${c(Ce).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px`, fontSize: "0.875rem", color: c(ee).neutral.textMuted })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", nn, [
            (a(!0), n(W, null, K(Ae.value, (S) => (a(), n("li", {
              key: S.message
            }, k(S.message), 1))), 128))
          ])
        ], 4)) : x("", !0)
      ]),
      e("div", on, [
        e("aside", ln, [
          s.disabledSections.includes("message") ? x("", !0) : (a(), n("div", rn, [
            !c(E).message.title && !c(E).message.body ? (a(), n("div", dn, " Add a title and message below to get started. ")) : x("", !0),
            e("div", un, [
              v[13] || (v[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", cn, [
                ue(qe, {
                  "template-type": $e.value,
                  onUpdate: D
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: _
                }, [
                  v[12] || (v[12] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(W, null, K(c(at), (S) => (a(), n("option", {
                    key: S.id,
                    value: S.id
                  }, k(S.label), 9, pn))), 128))
                ], 32)
              ])
            ]),
            ue(Cs, {
              message: c(E).message,
              "title-count": le.value,
              "body-count": M.value,
              "title-limit": V.value,
              "body-limit": q.value,
              "selected-platform": i.value,
              "show-reset": !0,
              "title-error": N.value,
              "body-error": Y.value,
              onUpdate: c(de),
              onReset: v[1] || (v[1] = (S) => c(we)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            ue(bt, {
              message: c(E).message,
              "variable-options": s.variableOptions,
              onUpdate: c(de),
              onInsertVariable: B
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !s.designOnly && !s.disabledSections.includes("delivery") ? (a(), n("div", mn, [
            v[14] || (v[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            ue(ca, {
              delivery: c(E).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: c(me),
              onReset: v[2] || (v[2] = (S) => c(Z)())
            }, null, 8, ["delivery", "onUpdate"]),
            ue(ka, {
              delivery: c(E).delivery,
              onUpdate: c(me)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : x("", !0)
        ]),
        e("main", vn, [
          !s.designOnly && c(E).audience.test_mode ? (a(), n("div", bn, [...v[15] || (v[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : x("", !0),
          e("div", gn, [
            e("div", yn, [
              e("label", fn, [
                v[17] || (v[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": v[3] || (v[3] = (S) => m.value = S),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  v[16] || (v[16] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(W, null, K(c(Ve), (S) => (a(), n("option", {
                    key: S.id,
                    value: S.id
                  }, k(S.label), 9, hn))), 128))
                ], 512), [
                  [Oe, m.value]
                ])
              ])
            ]),
            e("div", kn, [
              (a(), n(W, null, K(["android", "ios", "web"], (S) => e("button", {
                key: S,
                type: "button",
                class: ce(["kb-push-device-btn", { "kb-push-device-btn--active": i.value === S }]),
                role: "tab",
                "aria-selected": i.value === S,
                "aria-controls": `kb-preview-panel-${S}`,
                onClick: (Q) => i.value = S
              }, k(S.toUpperCase()), 11, _n)), 64))
            ]),
            e("div", wn, [
              !c(E).message.title && !c(E).message.body ? (a(), n("div", $n, [...v[18] || (v[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, "Start adding content to see a live preview here.", -1)
              ])])) : (a(), $t(Ya, {
                key: 1,
                "get-preview": c(F),
                "selected-platform": i.value,
                "preview-profile": G.value,
                "onUpdate:selectedPlatform": v[4] || (v[4] = (S) => i.value = S)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", xn, [
        !s.designOnly && s.showHistory ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: v[5] || (v[5] = (S) => y.value = !0)
        }, " Version history ")) : x("", !0),
        !s.designOnly && s.showSaveVersion ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: v[6] || (v[6] = (S) => d("save-version", JSON.parse(JSON.stringify(c(E)))))
        }, " Save as version ")) : x("", !0),
        s.showDuplicate ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: v[7] || (v[7] = (S) => d("duplicate", JSON.parse(JSON.stringify(c(E)))))
        }, " Duplicate ")) : x("", !0),
        s.showSave ? (a(), n("button", {
          key: 3,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: C
        }, " Save ")) : x("", !0),
        s.showClose ? (a(), n("button", {
          key: 4,
          type: "button",
          class: "kb-push-action kb-push-action--primary",
          onClick: v[8] || (v[8] = (S) => d("edit"))
        }, " Close ")) : x("", !0)
      ]),
      g.value ? (a(), n("div", Cn, [
        e("div", Sn, [
          v[19] || (v[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          v[20] || (v[20] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", In, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: v[9] || (v[9] = (S) => {
                g.value = !1, p.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: v[10] || (v[10] = (S) => p.value && z(p.value))
            }, "Replace")
          ])
        ])
      ])) : x("", !0),
      ue(gt, {
        open: y.value,
        versions: s.versions,
        onClose: v[11] || (v[11] = (S) => y.value = !1),
        onRestore: O
      }, null, 8, ["open", "versions"])
    ]));
  }
}), yt = /* @__PURE__ */ re(Un, [["__scopeId", "data-v-23164be6"]]), Rn = { class: "kb-section" }, An = { class: "kb-section__head" }, Bn = { class: "kb-field" }, Ln = ["value"], Tn = { class: "kb-field" }, Pn = ["value"], Vn = {
  key: 0,
  class: "kb-field"
}, En = ["value"], On = {
  key: 1,
  class: "kb-field"
}, Mn = ["value"], Nn = {
  key: 2,
  class: "kb-field kb-field--inline"
}, Dn = { class: "kb-location-row" }, zn = ["value"], Hn = ["value"], Wn = ["value"], Fn = ["value"], jn = {
  key: 3,
  class: "kb-field"
}, qn = ["value"], Kn = {
  key: 4,
  class: "kb-field"
}, Yn = ["value"], Jn = {
  key: 5,
  class: "kb-field"
}, Gn = { class: "kb-wa-buttons" }, Qn = ["value", "onInput"], Xn = ["value", "onInput"], Zn = ["onClick"], eo = {
  key: 6,
  class: "kb-field"
}, to = ["value"], so = ["value"], ao = { class: "kb-field" }, no = ["value"], oo = { class: "kb-field" }, lo = ["value"], io = {
  key: 7,
  class: "kb-field kb-wa-template-fields"
}, ro = { class: "kb-wa-fields-list" }, uo = { class: "kb-wa-field-name" }, co = { class: "kb-wa-field-status" }, po = { class: "kb-field" }, mo = ["value"], vo = { class: "kb-field" }, bo = { class: "kb-wa-buttons" }, go = ["value", "onInput"], yo = ["value", "onChange"], fo = ["value", "onInput"], ho = ["value", "onInput"], ko = ["onClick"], _o = ["disabled"], wo = /* @__PURE__ */ ie({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: r }) {
    const l = s, d = r;
    function i(g) {
      if (!g || typeof g != "string") return [];
      const p = /\{\{\s*([^}]+?)\s*\}\}/g, y = /* @__PURE__ */ new Set();
      let R;
      for (; (R = p.exec(g)) !== null; ) y.add(R[1].trim());
      return Array.from(y);
    }
    const m = I(() => {
      const g = l.message.whatsapp_header ?? "", p = l.message.whatsapp_body ?? l.message.body ?? "", y = new Set(l.message.variables_used ?? []), R = [...i(g), ...i(p)];
      return Array.from(new Set(R)).map((z) => ({ name: z, configured: y.has(z) }));
    });
    return (g, p) => {
      var y, R, G, z;
      return a(), n("section", Rn, [
        e("div", An, [
          p[18] || (p[18] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (_) => g.$emit("reset"))
          }, " Reset section ")) : x("", !0)
        ]),
        p[37] || (p[37] = e("p", { class: "kb-section__desc" }, " Configure how this campaign will look when sent as a WhatsApp template message. ", -1)),
        e("div", Bn, [
          p[20] || (p[20] = e("label", { class: "kb-label" }, [
            X(" Template type "),
            e("span", { class: "kb-helper" }, "Match the content type approved in WhatsApp (text, media, coupon, offer, catalog, etc.).")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: l.message.whatsapp_template_type ?? "text",
            onChange: p[1] || (p[1] = (_) => d("update", {
              whatsapp_template_type: _.target.value
            }))
          }, [...p[19] || (p[19] = [
            Me('<option value="text" data-v-03de154f>Text</option><option value="image" data-v-03de154f>Image</option><option value="video" data-v-03de154f>Video</option><option value="document" data-v-03de154f>Document</option><option value="location" data-v-03de154f>Location</option><option value="coupon" data-v-03de154f>Coupon code</option><option value="lto" data-v-03de154f>Limited time offer</option><option value="mpm" data-v-03de154f>Multi product message</option><option value="catalog" data-v-03de154f>Catalog</option><option value="auth" data-v-03de154f>Authentication</option>', 10)
          ])], 40, Ln)
        ]),
        e("div", Tn, [
          p[21] || (p[21] = e("label", { class: "kb-label" }, [
            X(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: l.message.whatsapp_template_name ?? "",
            onInput: p[2] || (p[2] = (_) => d("update", {
              whatsapp_template_name: _.target.value || void 0
            }))
          }, null, 40, Pn)
        ]),
        ["image", "video", "document"].includes(l.message.whatsapp_template_type ?? "text") ? (a(), n("div", Vn, [
          p[22] || (p[22] = e("label", { class: "kb-label" }, [
            X(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: l.message.whatsapp_media_url ?? "",
            onInput: p[3] || (p[3] = (_) => d("update", {
              whatsapp_media_url: _.target.value || void 0
            }))
          }, null, 40, En)
        ])) : x("", !0),
        ["image", "video", "document"].includes(l.message.whatsapp_template_type ?? "text") ? (a(), n("div", On, [
          p[23] || (p[23] = e("label", { class: "kb-label" }, [
            X(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: l.message.whatsapp_media_caption ?? "",
            onInput: p[4] || (p[4] = (_) => d("update", {
              whatsapp_media_caption: _.target.value || void 0
            }))
          }, null, 40, Mn)
        ])) : x("", !0),
        l.message.whatsapp_template_type === "location" ? (a(), n("div", Nn, [
          p[24] || (p[24] = e("label", { class: "kb-label" }, [
            X(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", Dn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((y = l.message.whatsapp_location) == null ? void 0 : y.lat) ?? "",
              onInput: p[5] || (p[5] = (_) => {
                const O = { ...l.message.whatsapp_location ?? {} };
                O.lat = Number(_.target.value), d("update", { whatsapp_location: O });
              })
            }, null, 40, zn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((R = l.message.whatsapp_location) == null ? void 0 : R.lon) ?? "",
              onInput: p[6] || (p[6] = (_) => {
                const O = { ...l.message.whatsapp_location ?? {} };
                O.lon = Number(_.target.value), d("update", { whatsapp_location: O });
              })
            }, null, 40, Hn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((G = l.message.whatsapp_location) == null ? void 0 : G.name) ?? "",
            onInput: p[7] || (p[7] = (_) => {
              const O = { ...l.message.whatsapp_location ?? {} };
              O.name = _.target.value || void 0, d("update", { whatsapp_location: O });
            })
          }, null, 40, Wn),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((z = l.message.whatsapp_location) == null ? void 0 : z.address) ?? "",
            onInput: p[8] || (p[8] = (_) => {
              const O = { ...l.message.whatsapp_location ?? {} };
              O.address = _.target.value || void 0, d("update", { whatsapp_location: O });
            })
          }, null, 40, Fn)
        ])) : x("", !0),
        l.message.whatsapp_template_type === "coupon" ? (a(), n("div", jn, [
          p[25] || (p[25] = e("label", { class: "kb-label" }, [
            X(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: l.message.whatsapp_coupon_code ?? "",
            onInput: p[9] || (p[9] = (_) => d("update", {
              whatsapp_coupon_code: _.target.value || void 0
            }))
          }, null, 40, qn)
        ])) : x("", !0),
        l.message.whatsapp_template_type === "lto" ? (a(), n("div", Kn, [
          p[26] || (p[26] = e("label", { class: "kb-label" }, [
            X(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: l.message.whatsapp_lto_expiry ?? "",
            onInput: p[10] || (p[10] = (_) => d("update", {
              whatsapp_lto_expiry: _.target.value || void 0
            }))
          }, null, 40, Yn)
        ])) : x("", !0),
        ["mpm", "catalog"].includes(l.message.whatsapp_template_type) ? (a(), n("div", Jn, [
          p[27] || (p[27] = e("label", { class: "kb-label" }, [
            X(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", Gn, [
            (a(!0), n(W, null, K(l.message.whatsapp_products ?? [], (_, O) => (a(), n("div", {
              key: _.id || O,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: _.productId,
                onInput: (E) => {
                  var w;
                  const H = [...l.message.whatsapp_products ?? []], A = Number(O);
                  H[A] = {
                    ...H[A],
                    id: ((w = H[A]) == null ? void 0 : w.id) || `prod_${A + 1}`,
                    productId: E.target.value
                  }, d("update", { whatsapp_products: H });
                }
              }, null, 40, Qn),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: _.sectionTitle,
                onInput: (E) => {
                  var w;
                  const H = [...l.message.whatsapp_products ?? []], A = Number(O);
                  H[A] = {
                    ...H[A],
                    id: ((w = H[A]) == null ? void 0 : w.id) || `prod_${A + 1}`,
                    sectionTitle: E.target.value || void 0
                  }, d("update", { whatsapp_products: H });
                }
              }, null, 40, Xn),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const E = [...l.message.whatsapp_products ?? []];
                  E.splice(Number(O), 1), d("update", { whatsapp_products: E });
                }
              }, " Remove ", 8, Zn)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: p[11] || (p[11] = () => {
                const O = [...l.message.whatsapp_products ?? []];
                O.push({
                  id: `prod_${O.length + 1}`,
                  productId: ""
                }), d("update", { whatsapp_products: O });
              })
            }, " Add product ")
          ])
        ])) : x("", !0),
        l.message.whatsapp_template_type === "auth" ? (a(), n("div", eo, [
          p[29] || (p[29] = e("label", { class: "kb-label" }, [
            X(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: l.message.whatsapp_auth_type ?? "otp",
            onChange: p[12] || (p[12] = (_) => d("update", {
              whatsapp_auth_type: _.target.value
            }))
          }, [...p[28] || (p[28] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, to),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: l.message.whatsapp_auth_label ?? "",
            onInput: p[13] || (p[13] = (_) => d("update", {
              whatsapp_auth_label: _.target.value || void 0
            }))
          }, null, 40, so)
        ])) : x("", !0),
        e("div", ao, [
          p[30] || (p[30] = e("label", { class: "kb-label" }, [
            X(" Header (optional) "),
            e("span", { class: "kb-helper" }, "Short text or variable used as the WhatsApp template header.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: l.message.whatsapp_header ?? "",
            onInput: p[14] || (p[14] = (_) => d("update", {
              whatsapp_header: _.target.value || void 0
            }))
          }, null, 40, no)
        ]),
        e("div", oo, [
          p[31] || (p[31] = e("label", { class: "kb-label" }, [
            X(" Body "),
            e("span", { class: "kb-helper" }, " Use the exact template body including variables like " + k(1) + ", " + k(2) + " as approved in WhatsApp. ")
          ], -1)),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: l.message.whatsapp_body ?? "",
            onInput: p[15] || (p[15] = (_) => d("update", {
              whatsapp_body: _.target.value || void 0
            }))
          }, null, 40, lo)
        ]),
        m.value.length > 0 ? (a(), n("div", io, [
          p[32] || (p[32] = e("label", { class: "kb-label" }, "Template fields", -1)),
          p[33] || (p[33] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", ro, [
            (a(!0), n(W, null, K(m.value, (_) => (a(), n("li", {
              key: _.name,
              class: ce(["kb-wa-field-item", { "kb-wa-field-item--ok": _.configured }])
            }, [
              e("span", uo, k(_.name), 1),
              e("span", co, k(_.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : x("", !0),
        e("div", po, [
          p[34] || (p[34] = e("label", { class: "kb-label" }, [
            X(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: l.message.whatsapp_footer ?? "",
            onInput: p[16] || (p[16] = (_) => d("update", {
              whatsapp_footer: _.target.value || void 0
            }))
          }, null, 40, mo)
        ]),
        e("div", vo, [
          p[36] || (p[36] = e("label", { class: "kb-label" }, [
            X(" Buttons (optional) "),
            e("span", { class: "kb-helper" }, " Add quick replies or call-to-action buttons. Order should match your provider configuration. ")
          ], -1)),
          e("div", bo, [
            (a(!0), n(W, null, K(l.message.whatsapp_buttons ?? [], (_, O) => (a(), n("div", {
              key: _.id || O,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: _.label,
                onInput: (E) => {
                  var w;
                  const H = [...l.message.whatsapp_buttons ?? []], A = Number(O);
                  H[A] = {
                    ...H[A],
                    id: ((w = H[A]) == null ? void 0 : w.id) || `btn_${A + 1}`,
                    label: E.target.value
                  }, d("update", { whatsapp_buttons: H });
                }
              }, null, 40, go),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: _.type ?? "quick_reply",
                onChange: (E) => {
                  var w;
                  const H = [...l.message.whatsapp_buttons ?? []], A = Number(O);
                  H[A] = {
                    ...H[A],
                    id: ((w = H[A]) == null ? void 0 : w.id) || `btn_${A + 1}`,
                    type: E.target.value
                  }, d("update", { whatsapp_buttons: H });
                }
              }, [...p[35] || (p[35] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1)
              ])], 40, yo),
              _.type === "url" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: _.url,
                onInput: (E) => {
                  var w;
                  const H = [...l.message.whatsapp_buttons ?? []], A = Number(O);
                  H[A] = {
                    ...H[A],
                    id: ((w = H[A]) == null ? void 0 : w.id) || `btn_${A + 1}`,
                    url: E.target.value || void 0
                  }, d("update", { whatsapp_buttons: H });
                }
              }, null, 40, fo)) : _.type === "call" ? (a(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: _.phone,
                onInput: (E) => {
                  var w;
                  const H = [...l.message.whatsapp_buttons ?? []], A = Number(O);
                  H[A] = {
                    ...H[A],
                    id: ((w = H[A]) == null ? void 0 : w.id) || `btn_${A + 1}`,
                    phone: E.target.value || void 0
                  }, d("update", { whatsapp_buttons: H });
                }
              }, null, 40, ho)) : x("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const E = [...l.message.whatsapp_buttons ?? []];
                  E.splice(Number(O), 1), d("update", { whatsapp_buttons: E });
                }
              }, " Remove ", 8, ko)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: (l.message.whatsapp_buttons ?? []).length >= 3,
              onClick: p[17] || (p[17] = () => {
                const O = [...l.message.whatsapp_buttons ?? []];
                O.push({
                  id: `btn_${O.length + 1}`,
                  label: "",
                  type: "quick_reply"
                }), d("update", { whatsapp_buttons: O });
              })
            }, " Add button ", 8, _o)
          ])
        ])
      ]);
    };
  }
}), $o = /* @__PURE__ */ re(wo, [["__scopeId", "data-v-03de154f"]]), xo = { class: "phone-theme-toggle" }, Co = { class: "chat-area" }, So = { class: "bubble" }, Io = {
  key: 0,
  class: "header"
}, Uo = {
  key: 0,
  class: "header-text"
}, Ro = ["src"], Ao = ["src"], Bo = {
  key: 3,
  class: "document"
}, Lo = ["innerHTML"], To = {
  key: 1,
  class: "location-card"
}, Po = ["src"], Vo = { class: "location-info" }, Eo = {
  key: 2,
  class: "catalog-card"
}, Oo = { class: "catalog-header" }, Mo = { class: "catalog-title" }, No = {
  key: 3,
  class: "multi-products"
}, Do = ["src"], zo = { class: "product-info" }, Ho = { class: "title" }, Wo = { class: "price" }, Fo = {
  key: 4,
  class: "coupon"
}, jo = { class: "coupon-code" }, qo = {
  key: 5,
  class: "offer"
}, Ko = {
  key: 6,
  class: "auth"
}, Yo = { class: "auth-code" }, Jo = {
  key: 7,
  class: "footer"
}, Go = {
  key: 8,
  class: "buttons"
}, Qo = /* @__PURE__ */ ie({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(s) {
    const r = s, l = J("light"), d = I(() => l.value === "dark");
    function i(p) {
      return String(p).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = I(() => {
      var R;
      const p = ((R = r.template) == null ? void 0 : R.body) ?? "";
      return i(p).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), g = I(() => {
      const p = r.template.location;
      if (!p) return "";
      const { lat: y, lng: R } = p;
      return y == null || R == null ? "" : `https://maps.googleapis.com/maps/api/staticmap?center=${y},${R}&zoom=15&size=600x300&markers=${y},${R}`;
    });
    return (p, y) => {
      var R, G;
      return a(), n("div", {
        class: ce(["wa-wrapper", { "wa-wrapper--dark": d.value }])
      }, [
        e("div", {
          class: ce(["phone", { "phone--dark": d.value }])
        }, [
          e("div", xo, [
            e("button", {
              type: "button",
              class: ce(["phone-theme-btn", { "phone-theme-btn--active": !d.value }]),
              onClick: y[0] || (y[0] = (z) => l.value = "light")
            }, " Light ", 2),
            e("button", {
              type: "button",
              class: ce(["phone-theme-btn", { "phone-theme-btn--active": d.value }]),
              onClick: y[1] || (y[1] = (z) => l.value = "dark")
            }, " Dark ", 2)
          ]),
          y[12] || (y[12] = e("div", { class: "phone-header" }, [
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
          e("div", Co, [
            e("div", So, [
              s.template.header ? (a(), n("div", Io, [
                s.template.header.type === "text" ? (a(), n("div", Uo, k(s.template.header.text), 1)) : s.template.header.type === "image" ? (a(), n("img", {
                  key: 1,
                  src: s.template.header.url,
                  class: "media",
                  alt: ""
                }, null, 8, Ro)) : s.template.header.type === "video" ? (a(), n("video", {
                  key: 2,
                  src: s.template.header.url,
                  controls: "",
                  class: "media"
                }, null, 8, Ao)) : s.template.header.type === "document" ? (a(), n("div", Bo, " 📄 " + k(s.template.header.filename), 1)) : x("", !0)
              ])) : x("", !0),
              e("div", {
                class: "body",
                innerHTML: m.value
              }, null, 8, Lo),
              s.template.location ? (a(), n("div", To, [
                g.value ? (a(), n("img", {
                  key: 0,
                  src: g.value,
                  class: "map",
                  alt: ""
                }, null, 8, Po)) : x("", !0),
                e("div", Vo, [
                  e("strong", null, k(s.template.location.name), 1),
                  e("div", null, k(s.template.location.address), 1)
                ])
              ])) : x("", !0),
              s.template.catalog ? (a(), n("div", Eo, [
                e("div", Oo, [
                  y[2] || (y[2] = X(" 🛍 ", -1)),
                  e("span", Mo, k(typeof s.template.catalog == "object" && s.template.catalog.label ? s.template.catalog.label : "Full catalog"), 1)
                ]),
                y[3] || (y[3] = e("div", { class: "catalog-sub" }, "Browse all items", -1)),
                y[4] || (y[4] = e("div", { class: "catalog-cta" }, "VIEW CATALOG", -1))
              ])) : x("", !0),
              (R = s.template.multiProduct) != null && R.length ? (a(), n("div", No, [
                (a(!0), n(W, null, K(s.template.multiProduct, (z, _) => (a(), n("div", {
                  key: _,
                  class: "product"
                }, [
                  z.image ? (a(), n("img", {
                    key: 0,
                    src: z.image,
                    alt: ""
                  }, null, 8, Do)) : x("", !0),
                  e("div", zo, [
                    e("div", Ho, k(z.name), 1),
                    e("div", Wo, k(z.price), 1)
                  ])
                ]))), 128))
              ])) : x("", !0),
              s.template.coupon ? (a(), n("div", Fo, [
                y[6] || (y[6] = e("div", { class: "coupon-discount" }, "Special offer", -1)),
                e("div", jo, [
                  y[5] || (y[5] = X(" Code: ", -1)),
                  e("span", null, k(s.template.coupon.code), 1)
                ]),
                y[7] || (y[7] = e("div", { class: "coupon-cta" }, "COPY CODE", -1))
              ])) : x("", !0),
              s.template.limitedOffer ? (a(), n("div", qo, " ⏳ Offer expires " + k(s.template.limitedOffer), 1)) : x("", !0),
              s.template.auth ? (a(), n("div", Ko, [
                y[8] || (y[8] = e("div", { class: "auth-icon" }, "🔐", -1)),
                y[9] || (y[9] = e("div", { class: "auth-title" }, "Confirm your phone number", -1)),
                e("div", Yo, k(s.template.auth.code), 1),
                y[10] || (y[10] = e("button", {
                  type: "button",
                  class: "auth-btn"
                }, "CONTINUE", -1))
              ])) : x("", !0),
              s.template.footer ? (a(), n("div", Jo, k(s.template.footer), 1)) : x("", !0),
              (G = s.template.buttons) != null && G.length ? (a(), n("div", Go, [
                (a(!0), n(W, null, K(s.template.buttons, (z, _) => (a(), n("button", {
                  key: _,
                  type: "button",
                  class: "button"
                }, k(z.text), 1))), 128))
              ])) : x("", !0),
              y[11] || (y[11] = e("div", { class: "time" }, " 12:45 ✓✓ ", -1))
            ])
          ])
        ], 2)
      ], 2);
    };
  }
}), Xo = /* @__PURE__ */ re(Qo, [["__scopeId", "data-v-76cc6100"]]), Zo = { class: "keos-whatsapp-builder" }, el = { class: "kb-builder-top" }, tl = { style: { margin: 0, paddingLeft: "1.25rem" } }, sl = { class: "kb-wa-layout" }, al = { class: "kb-wa-sidebar" }, nl = {
  key: 0,
  class: "kb-wa-form"
}, ol = { class: "kb-wa-form-head" }, ll = { class: "kb-wa-form-head-row" }, il = ["value"], rl = { class: "kb-wa-canvas" }, dl = {
  key: 0,
  class: "kb-wa-test-banner"
}, ul = { class: "kb-wa-preview-chrome" }, cl = { class: "kb-push-preview-controls" }, pl = { class: "kb-push-preview-as" }, ml = ["value"], vl = { class: "kb-wa-preview-frame" }, bl = { class: "kb-wa-actions" }, gl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, yl = { class: "kb-confirm-dialog" }, fl = { class: "kb-confirm-actions" }, hl = /* @__PURE__ */ ie({
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
  setup(s, { emit: r }) {
    const l = s, d = r, {
      campaign: i,
      dirty: m,
      customValidatorErrors: g,
      getValidationWithWarnings: p,
      update: y,
      updateMessage: R,
      undo: G,
      redo: z,
      canUndo: _,
      canRedo: O,
      resetMessage: E,
      hooks: H
    } = We({
      initial: l.modelValue,
      hooks: {
        ...l.hooks,
        customValidators: async (U) => {
          var le, M;
          const V = [];
          (le = U.name) != null && le.trim() || V.push("Template name is required");
          const q = (M = l.hooks) != null && M.customValidators ? await l.hooks.customValidators(U) : [];
          return [...V, ...q];
        }
      },
      onDirty: () => d("change", i.value)
    }), { lastSavedAt: A } = Fe(i, { channel: "whatsapp" });
    function w(U) {
      (U.metaKey || U.ctrlKey) && U.key === "z" && (U.preventDefault(), U.shiftKey ? z() : G());
    }
    Ne(() => {
      window.addEventListener("keydown", w);
    }), De(() => {
      window.removeEventListener("keydown", w);
    }), ye(
      i,
      (U) => d("update:modelValue", U),
      { deep: !0 }
    );
    const te = J(), de = J(!0);
    async function me() {
      if (H.estimateReach)
        try {
          te.value = await H.estimateReach(i.value.audience);
        } catch {
          te.value = void 0;
        }
      H.canSend && (de.value = await Promise.resolve(H.canSend()));
    }
    me(), ye(() => i.value.audience, me, { deep: !0 });
    const pe = I(() => (g.value, p(te.value))), ve = I(() => pe.value.blockingErrors), fe = I(() => pe.value.warnings), xe = I(() => pe.value.valid), we = J(""), Z = J(!1), F = J(null), se = I(() => {
      const U = we.value;
      return U ? Ve.find((V) => V.id === U) ?? null : null;
    }), $ = I(() => {
      const U = i.value.message.whatsapp_body ?? i.value.message.body ?? "";
      return se.value ? Te(U, se.value.data) : U;
    }), oe = I(() => {
      const U = i.value.message.whatsapp_header ?? "";
      return se.value ? Te(U, se.value.data) : U;
    }), be = I(() => {
      const U = i.value.message, V = U.whatsapp_template_type ?? "text";
      let q, le, M, N, Y, $e, D;
      V === "image" && U.whatsapp_media_url ? q = { type: "image", url: U.whatsapp_media_url } : V === "video" && U.whatsapp_media_url ? q = { type: "video", url: U.whatsapp_media_url } : V === "document" && U.whatsapp_document_filename ? q = { type: "document", filename: U.whatsapp_document_filename } : U.whatsapp_header && (q = { type: "text", text: oe.value });
      const f = $.value || "Start adding content to see a live preview here.";
      if (V === "location" && U.whatsapp_location) {
        const C = U.whatsapp_location, h = C.lat ?? C.latitude, v = C.lng ?? C.lon ?? C.longitude;
        h != null && v != null && (le = {
          lat: h,
          lng: v,
          name: C.name ?? C.title,
          address: C.address ?? `${h}, ${v}`
        });
      }
      (V === "catalog" || V === "mpm") && Array.isArray(U.whatsapp_products) && U.whatsapp_products.length && (M = !0, N = U.whatsapp_products.map((C) => ({
        image: C.image ?? C.imageUrl,
        name: C.name ?? C.sectionTitle ?? C.title ?? "Product",
        price: C.price ?? C.productId ?? ""
      }))), V === "coupon" && U.whatsapp_coupon_code && (Y = { code: U.whatsapp_coupon_code }), V === "lto" && U.whatsapp_lto_expiry && ($e = U.whatsapp_lto_expiry), V === "auth" && (D = { code: U.whatsapp_auth_code ?? U.whatsapp_otp_code ?? "123 456" });
      const B = U.whatsapp_buttons ?? [];
      return {
        header: q,
        body: f,
        footer: U.whatsapp_footer || void 0,
        buttons: B.map((C) => ({ text: C.label || "Button" })),
        location: le,
        catalog: M,
        multiProduct: N,
        coupon: Y,
        limitedOffer: $e,
        auth: D
      };
    });
    function ke(U) {
      const V = i.value, q = U.campaign.message ? { ...V.message, ...U.campaign.message } : V.message;
      y({
        ...U.campaign,
        message: q
      }), F.value = null, Z.value = !1;
    }
    function Re(U) {
      const V = U.target.value;
      if (!V) return;
      const q = nt.find((le) => le.id === V);
      q && (m.value ? (F.value = q, Z.value = !0) : ke(q), U.target.value = "");
    }
    const Be = I(() => i.value.template_type ?? "transactional");
    function Se(U) {
      y({ template_type: U });
    }
    function ge(U) {
      y({
        name: U,
        tracking: { ...i.value.tracking ?? {}, campaign_name: U }
      });
    }
    function he(U) {
      const V = ` {{ ${U.variable} }}`, q = i.value.message.variables_used ?? [], le = Array.from(/* @__PURE__ */ new Set([...q, U.variable]));
      if (U.field === "title") {
        const M = i.value.message.whatsapp_header ?? "";
        R(
          {
            variables_used: le
          }
        ), i.value.message.whatsapp_header = M + V;
      } else {
        const M = i.value.message.whatsapp_body ?? "";
        R(
          {
            variables_used: le
          }
        ), i.value.message.whatsapp_body = M + V;
      }
    }
    function Ae() {
      xe.value && d("save", i.value);
    }
    return (U, V) => (a(), n("div", Zo, [
      e("div", el, [
        ue(je, {
          "campaign-name": c(i).name,
          status: c(i).status,
          dirty: c(m),
          "last-saved-at": c(A),
          "can-undo": c(_),
          "can-redo": c(O),
          "onUpdate:campaignName": ge,
          onUndo: c(G),
          onRedo: c(z)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({ background: c(ee).dangerBg, border: `1px solid ${c(ee).dangerBorder}`, borderRadius: `${c(Ce).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px` })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(ee).danger })
          }, [
            (a(!0), n(W, null, K(ve.value, (q) => (a(), n("li", {
              key: q.message
            }, k(q.message), 1))), 128))
          ], 4)
        ], 4)) : x("", !0),
        fe.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({ background: c(ee).neutral.bg, border: `1px solid ${c(ee).neutral.border}`, borderRadius: `${c(Ce).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px`, fontSize: "0.875rem", color: c(ee).neutral.textMuted })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", tl, [
            (a(!0), n(W, null, K(fe.value, (q) => (a(), n("li", {
              key: q.message
            }, k(q.message), 1))), 128))
          ])
        ], 4)) : x("", !0)
      ]),
      e("div", sl, [
        e("aside", al, [
          s.disabledSections.includes("whatsapp") ? x("", !0) : (a(), n("div", nl, [
            e("div", ol, [
              V[7] || (V[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", ll, [
                ue(qe, {
                  "template-type": Be.value,
                  onUpdate: Se
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Re
                }, [
                  V[6] || (V[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(W, null, K(c(nt), (q) => (a(), n("option", {
                    key: q.id,
                    value: q.id
                  }, k(q.label), 9, il))), 128))
                ], 32)
              ])
            ]),
            ue($o, {
              message: c(i).message,
              "show-reset": !0,
              onUpdate: c(R),
              onReset: V[0] || (V[0] = (q) => c(E)())
            }, null, 8, ["message", "onUpdate"]),
            ue(bt, {
              message: c(i).message,
              "variable-options": s.variableOptions,
              onUpdate: c(R),
              onInsertVariable: he
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", rl, [
          !s.designOnly && c(i).audience.test_mode ? (a(), n("div", dl, [...V[8] || (V[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : x("", !0),
          e("div", ul, [
            e("div", cl, [
              e("label", pl, [
                V[10] || (V[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": V[1] || (V[1] = (q) => we.value = q),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  V[9] || (V[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(W, null, K(c(Ve), (q) => (a(), n("option", {
                    key: q.id,
                    value: q.id
                  }, k(q.label), 9, ml))), 128))
                ], 512), [
                  [Oe, we.value]
                ])
              ])
            ]),
            e("div", vl, [
              ue(Xo, { template: be.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", bl, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: V[2] || (V[2] = (q) => d("duplicate", JSON.parse(JSON.stringify(c(i)))))
        }, " Duplicate ")) : x("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: Ae
        }, " Save ")) : x("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-wa-action kb-wa-action--primary",
          onClick: V[3] || (V[3] = (q) => d("edit"))
        }, " Close ")) : x("", !0)
      ]),
      Z.value ? (a(), n("div", gl, [
        e("div", yl, [
          V[11] || (V[11] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          V[12] || (V[12] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", fl, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: V[4] || (V[4] = (q) => {
                Z.value = !1, F.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: V[5] || (V[5] = (q) => F.value && ke(F.value))
            }, "Replace")
          ])
        ])
      ])) : x("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ re(hl, [["__scopeId", "data-v-cadbf5c8"]]), kl = { class: "kb-section" }, _l = { class: "kb-section__head" }, wl = { class: "kb-field" }, $l = ["value"], xl = { class: "kb-field" }, Cl = { class: "kb-label" }, Sl = { key: 0 }, Il = { key: 1 }, Ul = { key: 2 }, Rl = ["value"], Al = {
  key: 0,
  class: "kb-truncation-hint"
}, Bl = { class: "kb-field" }, Ll = { class: "kb-insert-row" }, Tl = ["value"], Pl = { class: "kb-field" }, Vl = { class: "kb-insert-row" }, El = /* @__PURE__ */ ie({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: r }) {
    const l = s, d = r, i = ["first_name", "last_name", "order_id", "city"], m = J(l.variableOptions && l.variableOptions.length ? [...l.variableOptions] : i), g = J(m.value[0] ?? i[0]), p = J("");
    ye(
      () => l.variableOptions,
      (A) => {
        A && A.length && (m.value = [...A], m.value.includes(g.value) || (g.value = m.value[0]));
      }
    );
    const y = I(() => l.message.sms_body ?? ""), R = I(() => y.value.length), G = I(() => R.value ? R.value <= 160 ? 1 : Math.ceil(R.value / 153) : 0), z = I(() => {
      const A = R.value;
      return A <= 160 ? null : A <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function _(A) {
      const w = A.target.value;
      d("update", {
        sms_sender_id: w || void 0
      });
    }
    function O(A) {
      const w = A.target.value;
      d("update", {
        sms_body: w
      });
    }
    function E() {
      const A = g.value;
      if (!A) return;
      const w = ` {{ ${A} }}`, te = y.value || "", de = l.message.variables_used ?? [], me = Array.from(/* @__PURE__ */ new Set([...de, A]));
      d("update", {
        sms_body: te + w,
        variables_used: me
      });
    }
    function H() {
      const A = p.value.trim();
      A && (m.value.includes(A) || (m.value = [...m.value, A]), g.value = A, p.value = "");
    }
    return (A, w) => (a(), n("section", kl, [
      e("div", _l, [
        w[3] || (w[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        s.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: w[0] || (w[0] = (te) => A.$emit("reset"))
        }, " Reset section ")) : x("", !0)
      ]),
      w[10] || (w[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", wl, [
        w[4] || (w[4] = e("label", { class: "kb-label" }, [
          X(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: l.message.sms_sender_id ?? "",
          onInput: _
        }, null, 40, $l)
      ]),
      e("div", xl, [
        e("label", Cl, [
          w[5] || (w[5] = X(" Message body ", -1)),
          e("span", {
            class: ce(["kb-counter", { "kb-counter--warn": G.value > 3 }])
          }, [
            X(k(R.value) + " chars · ", 1),
            G.value === 0 ? (a(), n("span", Sl, "0 segments")) : G.value === 1 ? (a(), n("span", Il, "1 segment")) : (a(), n("span", Ul, k(G.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: y.value,
          onInput: O
        }, null, 40, Rl),
        w[6] || (w[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        z.value ? (a(), n("p", Al, k(z.value), 1)) : x("", !0)
      ]),
      e("div", Bl, [
        w[7] || (w[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Ll, [
          Ue(e("select", {
            "onUpdate:modelValue": w[1] || (w[1] = (te) => g.value = te),
            class: "kb-select"
          }, [
            (a(!0), n(W, null, K(m.value, (te) => (a(), n("option", {
              key: te,
              value: te
            }, k(te), 9, Tl))), 128))
          ], 512), [
            [Oe, g.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: E
          }, " Insert into message ")
        ]),
        w[8] || (w[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", Pl, [
        w[9] || (w[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Vl, [
          Ue(e("input", {
            "onUpdate:modelValue": w[2] || (w[2] = (te) => p.value = te),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [Je, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H
          }, " Add ")
        ])
      ])
    ]));
  }
}), Ol = /* @__PURE__ */ re(El, [["__scopeId", "data-v-1be89c79"]]), Ml = { class: "keos-sms-builder" }, Nl = { class: "kb-builder-top" }, Dl = { style: { margin: 0, paddingLeft: "1.25rem" } }, zl = { class: "kb-sms-layout" }, Hl = { class: "kb-sms-sidebar" }, Wl = {
  key: 0,
  class: "kb-sms-form"
}, Fl = { class: "kb-sms-form-head" }, jl = { class: "kb-wa-form-head-row" }, ql = ["value"], Kl = { class: "kb-sms-canvas" }, Yl = {
  key: 0,
  class: "kb-sms-test-banner"
}, Jl = { class: "kb-sms-preview-chrome" }, Gl = { class: "kb-push-preview-controls" }, Ql = { class: "kb-push-preview-as" }, Xl = ["value"], Zl = { class: "kb-sms-preview-frame" }, ei = { class: "kb-preview" }, ti = { class: "kb-sms-preview" }, si = { class: "kb-sms-phone" }, ai = { class: "kb-sms-header" }, ni = { class: "kb-sms-sender" }, oi = { class: "kb-sms-thread" }, li = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, ii = { class: "kb-sms-text" }, ri = { class: "kb-sms-counter" }, di = { key: 0 }, ui = { key: 1 }, ci = { key: 2 }, pi = {
  key: 3,
  class: "kb-sms-cost"
}, mi = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, vi = { class: "kb-sms-actions" }, bi = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, gi = { class: "kb-confirm-dialog" }, yi = { class: "kb-confirm-actions" }, fi = /* @__PURE__ */ ie({
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
  setup(s, { emit: r }) {
    const l = s, d = r, {
      campaign: i,
      dirty: m,
      customValidatorErrors: g,
      getValidationWithWarnings: p,
      update: y,
      updateMessage: R,
      undo: G,
      redo: z,
      canUndo: _,
      canRedo: O,
      resetMessage: E,
      hooks: H
    } = We({
      initial: l.modelValue,
      hooks: {
        ...l.hooks,
        customValidators: async (M) => {
          var $e, D;
          const N = [];
          ($e = M.name) != null && $e.trim() || N.push("Template name is required");
          const Y = (D = l.hooks) != null && D.customValidators ? await l.hooks.customValidators(M) : [];
          return [...N, ...Y];
        }
      },
      onDirty: () => d("change", i.value)
    }), { lastSavedAt: A } = Fe(i, { channel: "sms" });
    function w(M) {
      (M.metaKey || M.ctrlKey) && M.key === "z" && (M.preventDefault(), M.shiftKey ? z() : G());
    }
    Ne(() => {
      window.addEventListener("keydown", w);
    }), De(() => {
      window.removeEventListener("keydown", w);
    }), ye(
      i,
      (M) => d("update:modelValue", M),
      { deep: !0 }
    );
    const te = J(), de = J(!0);
    async function me() {
      if (H.estimateReach)
        try {
          te.value = await H.estimateReach(i.value.audience);
        } catch {
          te.value = void 0;
        }
      H.canSend && (de.value = await Promise.resolve(H.canSend()));
    }
    me(), ye(() => i.value.audience, me, { deep: !0 });
    const pe = I(() => (g.value, p(te.value))), ve = I(() => pe.value.blockingErrors), fe = I(() => pe.value.warnings), xe = I(() => pe.value.valid), we = I(() => i.value.template_type ?? "transactional"), Z = J(""), F = J(!1), se = J(null), $ = I(() => {
      const M = Z.value;
      return M ? Ve.find((N) => N.id === M) ?? null : null;
    }), oe = I(() => {
      const M = Se.value;
      return $.value ? Te(M, $.value.data) : M;
    });
    function be(M) {
      const N = i.value, Y = M.campaign.message ? { ...N.message, ...M.campaign.message } : N.message;
      y({
        ...M.campaign,
        message: Y
      }), se.value = null, F.value = !1;
    }
    function ke(M) {
      const N = M.target.value;
      if (!N) return;
      const Y = ot.find(($e) => $e.id === N);
      Y && (m.value ? (se.value = Y, F.value = !0) : be(Y), M.target.value = "");
    }
    function Re(M) {
      y({ template_type: M });
    }
    function Be(M) {
      y({
        name: M,
        tracking: { ...i.value.tracking ?? {}, campaign_name: M }
      });
    }
    const Se = I(() => (i.value.message.sms_body ?? "") || ""), ge = I(() => Se.value.length), he = I(() => ge.value ? ge.value <= 160 ? 1 : Math.ceil(ge.value / 153) : 0), Ae = I(() => {
      const M = oe.value;
      return M.trim().length ? M : "Your SMS message preview will appear here.";
    }), U = I(() => {
      const M = l.costPerSegment ?? 0;
      return !M || he.value === 0 ? null : (he.value * M).toFixed(2);
    }), V = I(() => {
      const M = ge.value;
      return M <= 160 ? null : M <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), q = I(
      () => i.value.message.sms_sender_id ?? "YourBrand"
    );
    function le() {
      xe.value && d("save", i.value);
    }
    return (M, N) => (a(), n("div", Ml, [
      e("div", Nl, [
        ue(je, {
          "campaign-name": c(i).name,
          status: c(i).status,
          dirty: c(m),
          "last-saved-at": c(A),
          "can-undo": c(_),
          "can-redo": c(O),
          "onUpdate:campaignName": Be,
          onUndo: c(G),
          onRedo: c(z)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({
            background: c(ee).dangerBg,
            border: `1px solid ${c(ee).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(j)[12]}px ${c(j)[16]}px`,
            marginBottom: `${c(j)[16]}px`
          })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(ee).danger })
          }, [
            (a(!0), n(W, null, K(ve.value, (Y) => (a(), n("li", {
              key: Y.message
            }, k(Y.message), 1))), 128))
          ], 4)
        ], 4)) : x("", !0),
        fe.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({
            background: c(ee).neutral.bg,
            border: `1px solid ${c(ee).neutral.border}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(j)[12]}px ${c(j)[16]}px`,
            marginBottom: `${c(j)[16]}px`,
            fontSize: "0.875rem",
            color: c(ee).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", Dl, [
            (a(!0), n(W, null, K(fe.value, (Y) => (a(), n("li", {
              key: Y.message
            }, k(Y.message), 1))), 128))
          ])
        ], 4)) : x("", !0)
      ]),
      e("div", zl, [
        e("aside", Hl, [
          s.disabledSections.includes("sms") ? x("", !0) : (a(), n("div", Wl, [
            e("div", Fl, [
              N[7] || (N[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", jl, [
                ue(qe, {
                  "template-type": we.value,
                  onUpdate: Re
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  N[6] || (N[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(W, null, K(c(ot), (Y) => (a(), n("option", {
                    key: Y.id,
                    value: Y.id
                  }, k(Y.label), 9, ql))), 128))
                ], 32)
              ])
            ]),
            ue(Ol, {
              message: c(i).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: c(R),
              onReset: N[0] || (N[0] = (Y) => c(E)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Kl, [
          !s.designOnly && c(i).audience.test_mode ? (a(), n("div", Yl, [...N[8] || (N[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : x("", !0),
          e("div", Jl, [
            e("div", Gl, [
              e("label", Ql, [
                N[10] || (N[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": N[1] || (N[1] = (Y) => Z.value = Y),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  N[9] || (N[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(W, null, K(c(Ve), (Y) => (a(), n("option", {
                    key: Y.id,
                    value: Y.id
                  }, k(Y.label), 9, Xl))), 128))
                ], 512), [
                  [Oe, Z.value]
                ])
              ])
            ]),
            e("div", Zl, [
              e("div", ei, [
                e("div", ti, [
                  e("div", si, [
                    N[13] || (N[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", ai, [
                      e("div", ni, k(q.value), 1),
                      N[11] || (N[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", oi, [
                      e("div", li, [
                        e("span", ii, k(Ae.value), 1),
                        N[12] || (N[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", ri, [
                    X(k(ge.value) + " characters · ", 1),
                    he.value === 0 ? (a(), n("span", di, "0 segments")) : he.value === 1 ? (a(), n("span", ui, "1 segment")) : (a(), n("span", ci, k(he.value) + " segments", 1)),
                    N[14] || (N[14] = X(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    U.value !== null ? (a(), n("span", pi, " · Est. " + k(U.value), 1)) : x("", !0)
                  ]),
                  V.value ? (a(), n("p", mi, k(V.value), 1)) : x("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", vi, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: N[2] || (N[2] = (Y) => d("duplicate", JSON.parse(JSON.stringify(c(i)))))
        }, " Duplicate ")) : x("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: le
        }, " Save ")) : x("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-sms-action kb-sms-action--primary",
          onClick: N[3] || (N[3] = (Y) => d("edit"))
        }, " Close ")) : x("", !0)
      ]),
      F.value ? (a(), n("div", bi, [
        e("div", gi, [
          N[15] || (N[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          N[16] || (N[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", yi, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: N[4] || (N[4] = (Y) => {
                F.value = !1, se.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: N[5] || (N[5] = (Y) => se.value && be(se.value))
            }, "Replace")
          ])
        ])
      ])) : x("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ re(fi, [["__scopeId", "data-v-32c53abf"]]), hi = 30, ki = 60, _i = 130;
function wi(s) {
  const r = (s ?? "").trim().length;
  return r < hi ? "too_short" : r <= ki ? "good" : "too_long";
}
function $i(s) {
  const r = (s ?? "").trim().length;
  return r === 0 ? "too_short" : r <= _i ? "good" : "too_long";
}
const xi = [
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
function it(s) {
  if (!s || typeof s != "string") return [];
  const r = [];
  for (const l of xi) {
    const d = s.match(l);
    d && r.push(d[0]);
  }
  return r;
}
function Ci(s) {
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
function Si(s) {
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
const Ii = { class: "em-section" }, Ui = { class: "em-strip" }, Ri = { class: "em-strip-head" }, Ai = { class: "em-field" }, Bi = ["value"], Li = { class: "em-field" }, Ti = ["value"], Pi = { class: "em-field" }, Vi = ["value"], Ei = { class: "em-field" }, Oi = { class: "em-input-group" }, Mi = ["value"], Ni = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Di = { class: "em-field" }, zi = { class: "em-input-group" }, Hi = ["value"], Wi = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Fi = { class: "em-strip em-strip--library" }, ji = { class: "em-library-chips" }, qi = ["onClick"], Ki = { class: "em-strip em-strip--blocks" }, Yi = { class: "em-block-list" }, Ji = ["data-type"], Gi = { class: "em-block-bar" }, Qi = { class: "em-block-type" }, Xi = { class: "em-block-actions" }, Zi = ["disabled", "onClick"], er = ["disabled", "onClick"], tr = ["onClick"], sr = {
  key: 0,
  class: "em-block-fields"
}, ar = ["value", "onChange"], nr = ["value", "onInput"], or = ["onClick"], lr = {
  key: 1,
  class: "em-block-fields"
}, ir = ["value", "onInput"], rr = ["onClick"], dr = {
  key: 2,
  class: "em-block-fields"
}, ur = ["value", "onInput"], cr = ["value", "onInput"], pr = ["value", "onInput"], mr = {
  key: 3,
  class: "em-block-fields"
}, vr = ["value", "onInput"], br = ["value", "onInput"], gr = { class: "em-block-fields--row" }, yr = ["value", "onInput"], fr = { class: "em-check-row" }, hr = ["checked", "onChange"], kr = { class: "em-check-row" }, _r = ["checked", "onChange"], wr = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, $r = ["value", "onInput"], xr = {
  key: 5,
  class: "em-block-fields"
}, Cr = ["value", "onInput"], Sr = ["value", "onInput"], Ir = ["value", "onInput"], Ur = ["onClick"], Rr = {
  key: 6,
  class: "em-block-fields"
}, Ar = ["value", "onChange"], Br = { class: "em-list-items" }, Lr = ["value", "onInput", "placeholder"], Tr = ["onClick"], Pr = ["onClick"], Vr = {
  key: 7,
  class: "em-block-fields"
}, Er = ["value", "onChange"], Or = ["value", "onInput"], Mr = ["onClick"], Nr = {
  key: 8,
  class: "em-block-fields"
}, Dr = { class: "em-social-links" }, zr = ["value", "onChange"], Hr = ["value", "onInput"], Wr = ["onClick"], Fr = ["onClick"], jr = {
  key: 9,
  class: "em-block-fields"
}, qr = ["value", "onInput"], Kr = ["value", "onInput"], Yr = ["value", "onInput"], Jr = {
  key: 10,
  class: "em-block-fields"
}, Gr = ["value", "onInput"], Qr = { class: "em-link-list-items" }, Xr = ["value", "onInput"], Zr = ["value", "onInput"], ed = ["onClick"], td = ["onClick"], sd = {
  key: 11,
  class: "em-block-fields"
}, ad = ["value", "onInput"], nd = ["onClick"], od = ["value", "onInput"], ld = ["onClick"], id = {
  key: 12,
  class: "em-block-fields"
}, rd = { class: "em-block-fields--row" }, dd = ["value", "onInput"], ud = { class: "em-block-fields--row" }, cd = ["value", "onInput"], pd = ["value", "onChange"], md = {
  key: 13,
  class: "em-block-fields"
}, vd = ["value", "onChange"], bd = { class: "em-inline-label" }, gd = ["value", "onInput"], yd = ["onClick"], fd = {
  key: 14,
  class: "em-block-fields"
}, hd = ["value", "onInput"], kd = { class: "em-link-list-items" }, _d = ["value", "onInput"], wd = ["value", "onInput"], $d = ["onClick"], xd = ["onClick"], Cd = {
  key: 15,
  class: "em-block-fields"
}, Sd = ["value", "onInput"], Id = ["value", "onInput"], Ud = ["onClick"], Rd = ["onClick"], Ad = {
  key: 16,
  class: "em-block-fields"
}, Bd = ["value", "onInput"], Ld = ["value", "onInput"], Td = ["value", "onInput"], Pd = ["onClick"], Vd = ["onClick"], Ed = {
  key: 17,
  class: "em-block-fields"
}, Od = ["value", "onInput"], Md = ["value", "onInput"], Nd = {
  key: 18,
  class: "em-block-fields"
}, Dd = ["value", "onInput"], zd = ["value", "onInput"], Hd = ["value", "onInput"], Wd = ["value", "onInput"], Fd = ["value", "onInput"], jd = {
  key: 19,
  class: "em-block-fields"
}, qd = ["value", "onInput"], Kd = ["onClick"], Yd = {
  key: 20,
  class: "em-block-fields"
}, Jd = ["value", "onInput"], Gd = ["value", "onInput"], Qd = ["onClick"], Xd = {
  key: 21,
  class: "em-block-fields"
}, Zd = ["value", "onInput"], eu = { class: "em-block-fields--row" }, tu = ["value", "onInput"], su = {
  key: 22,
  class: "em-block-fields"
}, au = ["value", "onInput"], nu = ["value", "onInput"], ou = ["value", "onInput"], lu = { class: "em-add-bar" }, iu = { class: "em-add-bar-btns" }, ru = { class: "em-strip em-strip--personalize" }, du = { class: "em-field" }, uu = { class: "em-input-group" }, cu = ["value"], pu = { class: "em-field" }, mu = { class: "em-input-group" }, Ie = "{{ var }}", vu = /* @__PURE__ */ ie({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: r }) {
    var ae;
    function l() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const d = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ];
    function i(b) {
      switch (b) {
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
          return { id: l(), type: "social", links: d.map((o) => ({ ...o })) };
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
    const m = s, g = r, p = ["first_name", "last_name", "order_id", "city", "email"], y = J(
      (ae = m.variableOptions) != null && ae.length ? [...m.variableOptions] : p
    ), R = J(y.value[0] ?? "first_name"), G = J("");
    ye(
      () => m.variableOptions,
      (b) => {
        b != null && b.length && (y.value = [...b], y.value.includes(R.value) || (R.value = y.value[0]));
      }
    );
    const z = I(() => m.message.email_subject ?? ""), _ = I(() => m.message.email_preview_text ?? ""), O = I(() => wi(z.value)), E = I(() => $i(_.value)), H = I(() => it(z.value)), A = I(() => it(_.value)), w = I(() => {
      const b = m.message.email_blocks;
      return Array.isArray(b) && b.length > 0 ? b : [i("paragraph")];
    });
    ye(
      () => m.message.email_blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && g("update", { email_blocks: [i("paragraph")] });
      },
      { immediate: !0 }
    );
    function te(b) {
      g("update", { email_blocks: b });
    }
    function de(b) {
      g("update", { email_subject: b.target.value });
    }
    function me(b) {
      const o = b.target.value;
      g("update", { email_preview_text: o || void 0 });
    }
    function pe(b) {
      g("update", { email_from_name: b.target.value || void 0 });
    }
    function ve(b) {
      g("update", { email_from_address: b.target.value || void 0 });
    }
    function fe(b) {
      g("update", { email_reply_to: b.target.value || void 0 });
    }
    const xe = [
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
    function we(b) {
      const o = b.blocks();
      te([...w.value, ...o]);
    }
    function Z(b) {
      const o = [...w.value, i(b)];
      te(o);
    }
    function F(b) {
      te(w.value.filter((o) => o.id !== b));
    }
    function se(b, o) {
      const t = w.value.findIndex((T) => T.id === b);
      if (t < 0) return;
      const P = o === "up" ? t - 1 : t + 1;
      if (P < 0 || P >= w.value.length) return;
      const u = [...w.value];
      [u[t], u[P]] = [u[P], u[t]], te(u);
    }
    function $(b, o) {
      const t = w.value.map((P) => P.id === b ? { ...P, ...o } : P);
      te(t);
    }
    function oe(b, o, t) {
      const P = w.value.find((T) => T.id === b);
      if (!P || P.type !== "list") return;
      const u = [...P.items || []];
      u[o] = t, $(b, { items: u });
    }
    function be(b) {
      const o = w.value.find((t) => t.id === b);
      !o || o.type !== "list" || $(b, { items: [...o.items || [], "New item"] });
    }
    function ke(b, o) {
      const t = w.value.find((u) => u.id === b);
      if (!t || t.type !== "list") return;
      const P = (t.items || []).filter((u, T) => T !== o);
      $(b, { items: P });
    }
    function Re(b, o, t, P) {
      const u = w.value.find((L) => L.id === b);
      if (!u || u.type !== "social") return;
      const T = (u.links || []).map((L, _e) => _e === o ? { ...L, [t]: P } : L);
      $(b, { links: T });
    }
    function Be(b) {
      const o = w.value.find((t) => t.id === b);
      !o || o.type !== "social" || $(b, { links: [...o.links || [], { platform: "custom", url: "" }] });
    }
    function Se(b, o) {
      const t = w.value.find((u) => u.id === b);
      if (!t || t.type !== "social") return;
      const P = (t.links || []).filter((u, T) => T !== o);
      $(b, { links: P });
    }
    function ge(b, o, t, P) {
      const u = w.value.find((L) => L.id === b);
      if (!u || u.type !== "link_list") return;
      const T = (u.links || []).map((L, _e) => _e === o ? { ...L, [t]: P } : L);
      $(b, { links: T });
    }
    function he(b) {
      const o = w.value.find((t) => t.id === b);
      !o || o.type !== "link_list" || $(b, { links: [...o.links || [], { text: "", url: "" }] });
    }
    function Ae(b, o) {
      const t = w.value.find((u) => u.id === b);
      if (!t || t.type !== "link_list") return;
      const P = (t.links || []).filter((u, T) => T !== o);
      $(b, { links: P });
    }
    function U(b, o) {
      const t = w.value.find((Ee) => Ee.id === b);
      if (!t || t.type !== "columns") return;
      const P = ` {{ ${R.value} }}`, u = m.message.variables_used ?? [], T = Array.from(/* @__PURE__ */ new Set([...u, R.value])), L = o === "left" ? "leftContent" : "rightContent", Ke = (t[L] ?? "") + P;
      $(b, { [L]: Ke }), g("update", { variables_used: T });
    }
    function V(b, o) {
      const t = w.value.find((P) => P.id === b);
      if (!(!t || t.type !== "row")) {
        if (o.columnCount !== void 0 && o.columnCount !== t.columnCount) {
          const P = [...t.cells || []];
          for (; P.length < o.columnCount; ) P.push("Cell content");
          o.cells = P.slice(0, o.columnCount);
        }
        $(b, o);
      }
    }
    function q(b, o, t) {
      const P = w.value.find((T) => T.id === b);
      if (!P || P.type !== "row") return;
      const u = [...P.cells || []];
      u[o] = t, $(b, { cells: u });
    }
    function le(b, o, t, P) {
      const u = w.value.find((L) => L.id === b);
      if (!u || u.type !== "navbar") return;
      const T = (u.links || []).map((L, _e) => _e === o ? { ...L, [t]: P } : L);
      $(b, { links: T });
    }
    function M(b) {
      const o = w.value.find((t) => t.id === b);
      !o || o.type !== "navbar" || $(b, { links: [...o.links || [], { text: "", url: "" }] });
    }
    function N(b, o) {
      const t = w.value.find((P) => P.id === b);
      !t || t.type !== "navbar" || $(b, { links: (t.links || []).filter((P, u) => u !== o) });
    }
    function Y(b, o, t, P) {
      const u = w.value.find((L) => L.id === b);
      if (!u || u.type !== "accordion") return;
      const T = (u.items || []).map((L, _e) => _e === o ? { ...L, [t]: P } : L);
      $(b, { items: T });
    }
    function $e(b) {
      const o = w.value.find((t) => t.id === b);
      !o || o.type !== "accordion" || $(b, { items: [...o.items || [], { title: "New section", content: "" }] });
    }
    function D(b, o) {
      const t = w.value.find((P) => P.id === b);
      !t || t.type !== "accordion" || $(b, { items: (t.items || []).filter((P, u) => u !== o) });
    }
    function f(b, o, t, P) {
      const u = w.value.find((L) => L.id === b);
      if (!u || u.type !== "carousel") return;
      const T = (u.slides || []).map((L, _e) => _e === o ? { ...L, [t]: P } : L);
      $(b, { slides: T });
    }
    function B(b) {
      const o = w.value.find((t) => t.id === b);
      !o || o.type !== "carousel" || $(b, { slides: [...o.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function C(b, o) {
      const t = w.value.find((P) => P.id === b);
      !t || t.type !== "carousel" || $(b, { slides: (t.slides || []).filter((P, u) => u !== o) });
    }
    function h(b) {
      const o = ` {{ ${R.value} }}`, t = m.message.variables_used ?? [], P = Array.from(/* @__PURE__ */ new Set([...t, R.value]));
      b === "subject" ? g("update", {
        email_subject: (z.value || "") + o,
        variables_used: P
      }) : g("update", {
        email_preview_text: (_.value || "") + o,
        variables_used: P
      });
    }
    function v(b) {
      const o = w.value.find((Ee) => Ee.id === b);
      if (!o || o.type !== "paragraph" && o.type !== "heading" && o.type !== "footer" && o.type !== "quote" && o.type !== "liquid" && o.type !== "code_block") return;
      const t = ` {{ ${R.value} }}`, P = m.message.variables_used ?? [], u = Array.from(/* @__PURE__ */ new Set([...P, R.value])), T = (o.type === "footer", "content"), _e = (o[T] ?? "") + t, Ke = w.value.map(
        (Ee) => Ee.id === b ? { ...Ee, [T]: _e } : Ee
      );
      g("update", { email_blocks: Ke, variables_used: u });
    }
    function S(b, o) {
      const t = w.value.find((_e) => _e.id === b);
      if (!t || t.type !== "row") return;
      const P = ` {{ ${R.value} }}`, u = m.message.variables_used ?? [], T = Array.from(/* @__PURE__ */ new Set([...u, R.value])), L = [...t.cells || []];
      L[o] = (L[o] || "") + P, $(b, { cells: L }), g("update", { variables_used: T });
    }
    function Q() {
      const b = G.value.trim();
      !b || y.value.includes(b) || (y.value = [...y.value, b], R.value = b, G.value = "");
    }
    return (b, o) => (a(), n("section", Ii, [
      e("div", Ui, [
        e("div", Ri, [
          o[28] || (o[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: o[0] || (o[0] = (t) => b.$emit("reset"))
          }, " Reset section ")) : x("", !0)
        ]),
        o[35] || (o[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Ai, [
          o[29] || (o[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: s.message.email_from_name ?? "",
            onInput: pe
          }, null, 40, Bi)
        ]),
        e("div", Li, [
          o[30] || (o[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: s.message.email_from_address ?? "",
            onInput: ve
          }, null, 40, Ti)
        ]),
        e("div", Pi, [
          o[31] || (o[31] = e("label", { class: "em-label" }, [
            X("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: s.message.email_reply_to ?? "",
            onInput: fe
          }, null, 40, Vi)
        ]),
        e("div", Ei, [
          o[32] || (o[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Oi, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: z.value,
              onInput: de
            }, null, 40, Mi),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: o[1] || (o[1] = (t) => h("subject")),
              title: "Insert variable"
            }, k(Ie))
          ]),
          e("span", {
            class: ce(["em-analyzer", `em-analyzer--${O.value}`])
          }, k(c(Ci)(O.value)), 3),
          H.value.length ? (a(), n("span", Ni, "Spammy: " + k(H.value.join(", ")), 1)) : x("", !0)
        ]),
        e("div", Di, [
          o[33] || (o[33] = e("label", { class: "em-label" }, [
            X("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", zi, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: _.value,
              onInput: me
            }, null, 40, Hi),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: o[2] || (o[2] = (t) => h("preview")),
              title: "Insert variable"
            }, k(Ie))
          ]),
          o[34] || (o[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ce(["em-analyzer", `em-analyzer--${E.value}`])
          }, k(c(Si)(E.value)), 3),
          A.value.length ? (a(), n("span", Wi, "Spammy: " + k(A.value.join(", ")), 1)) : x("", !0)
        ])
      ]),
      e("div", Fi, [
        o[36] || (o[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        o[37] || (o[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", ji, [
          (a(), n(W, null, K(xe, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (P) => we(t)
          }, k(t.label), 9, qi)), 64))
        ])
      ]),
      e("div", Ki, [
        o[61] || (o[61] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        o[62] || (o[62] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Yi, [
          (a(!0), n(W, null, K(w.value, (t, P) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Gi, [
              e("span", Qi, k(t.type), 1),
              e("div", Xi, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === 0,
                  onClick: (u) => se(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Zi),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === w.value.length - 1,
                  onClick: (u) => se(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, er),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => F(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, tr)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", sr, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (u) => $(t.id, { level: Number(u.target.value) })
              }, [...o[38] || (o[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, ar),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (u) => $(t.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, nr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => v(t.id)
              }, k(Ie), 8, or)
            ])) : t.type === "paragraph" ? (a(), n("div", lr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => $(t.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, ir),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => v(t.id)
              }, k(Ie), 8, rr)
            ])) : t.type === "image" ? (a(), n("div", dr, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (u) => $(t.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, ur),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => $(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, cr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (u) => $(t.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, pr)
            ])) : t.type === "button" ? (a(), n("div", mr, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (u) => $(t.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, vr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (u) => $(t.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, br),
              e("div", gr, [
                o[39] || (o[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (u) => $(t.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, yr)
              ]),
              e("label", fr, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (u) => $(t.id, { fullWidth: u.target.checked })
                }, null, 40, hr),
                o[40] || (o[40] = e("span", null, "Full width", -1))
              ]),
              e("label", kr, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (u) => $(t.id, { ghost: u.target.checked })
                }, null, 40, _r),
                o[41] || (o[41] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", wr, [
              o[42] || (o[42] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (u) => $(t.id, { height: Number(u.target.value) || 24 })
              }, null, 40, $r),
              o[43] || (o[43] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", xr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => $(t.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Cr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (u) => $(t.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Sr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (u) => $(t.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, Ir),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => v(t.id)
              }, k(Ie), 8, Ur)
            ])) : t.type === "list" ? (a(), n("div", Rr, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (u) => $(t.id, { style: u.target.value })
              }, [...o[44] || (o[44] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Ar),
              e("div", Br, [
                (a(!0), n(W, null, K(t.items || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (L) => oe(t.id, T, L.target.value),
                    placeholder: `Item ${T + 1}`
                  }, null, 40, Lr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => ke(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Tr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => be(t.id)
              }, "+ Add item", 8, Pr)
            ])) : t.type === "quote" ? (a(), n("div", Vr, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => $(t.id, { style: u.target.value })
              }, [...o[45] || (o[45] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Er),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => $(t.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Or),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => v(t.id)
              }, k(Ie), 8, Mr)
            ])) : t.type === "social" ? (a(), n("div", Nr, [
              e("div", Dr, [
                (a(!0), n(W, null, K(t.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (L) => Re(t.id, T, "platform", L.target.value)
                  }, [...o[46] || (o[46] = [
                    Me('<option value="facebook" data-v-5a131abf>Facebook</option><option value="twitter" data-v-5a131abf>Twitter / X</option><option value="instagram" data-v-5a131abf>Instagram</option><option value="linkedin" data-v-5a131abf>LinkedIn</option><option value="youtube" data-v-5a131abf>YouTube</option><option value="tiktok" data-v-5a131abf>TikTok</option><option value="custom" data-v-5a131abf>Custom</option>', 7)
                  ])], 40, zr),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (L) => Re(t.id, T, "url", L.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Hr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => Se(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Wr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Be(t.id)
              }, "+ Add link", 8, Fr)
            ])) : t.type === "video" ? (a(), n("div", jr, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (u) => $(t.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, qr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (u) => $(t.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Kr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => $(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Yr)
            ])) : t.type === "link_list" ? (a(), n("div", Jr, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => $(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Gr),
              e("div", Qr, [
                (a(!0), n(W, null, K(t.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (L) => ge(t.id, T, "text", L.target.value),
                    placeholder: "Label"
                  }, null, 40, Xr),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (L) => ge(t.id, T, "url", L.target.value),
                    placeholder: "URL"
                  }, null, 40, Zr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => Ae(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, ed)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => he(t.id)
              }, "+ Add link", 8, td)
            ])) : t.type === "columns" ? (a(), n("div", sd, [
              o[47] || (o[47] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (u) => $(t.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, ad),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => U(t.id, "left")
              }, k(Ie), 8, nd),
              o[48] || (o[48] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (u) => $(t.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, od),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => U(t.id, "right")
              }, k(Ie), 8, ld)
            ])) : t.type === "divider" ? (a(), n("div", id, [
              e("div", rd, [
                o[49] || (o[49] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (u) => $(t.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, dd),
                o[50] || (o[50] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", ud, [
                o[51] || (o[51] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (u) => $(t.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, cd)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => $(t.id, { lineStyle: u.target.value })
              }, [...o[52] || (o[52] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, pd)
            ])) : t.type === "row" ? (a(), n("div", md, [
              o[54] || (o[54] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => V(t.id, { columnCount: Number(u.target.value) })
              }, [...o[53] || (o[53] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, vd),
              (a(!0), n(W, null, K(t.cells || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-row-cell"
              }, [
                e("label", bd, "Column " + k(T + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (L) => q(t.id, T, L.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, gd),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (L) => S(t.id, T)
                }, k(Ie), 8, yd)
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", fd, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => $(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, hd),
              e("div", kd, [
                (a(!0), n(W, null, K(t.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (L) => le(t.id, T, "text", L.target.value),
                    placeholder: "Label"
                  }, null, 40, _d),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (L) => le(t.id, T, "url", L.target.value),
                    placeholder: "URL"
                  }, null, 40, wd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (L) => N(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, $d)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => M(t.id)
              }, "+ Add link", 8, xd)
            ])) : t.type === "accordion" ? (a(), n("div", Cd, [
              (a(!0), n(W, null, K(t.items || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (L) => Y(t.id, T, "title", L.target.value),
                  placeholder: "Section title"
                }, null, 40, Sd),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (L) => Y(t.id, T, "content", L.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Id),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (L) => D(t.id, T),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ud)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => $e(t.id)
              }, "+ Add section", 8, Rd)
            ])) : t.type === "carousel" ? (a(), n("div", Ad, [
              (a(!0), n(W, null, K(t.slides || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (L) => f(t.id, T, "imageUrl", L.target.value),
                  placeholder: "Image URL"
                }, null, 40, Bd),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (L) => f(t.id, T, "alt", L.target.value),
                  placeholder: "Alt text"
                }, null, 40, Ld),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (L) => f(t.id, T, "linkUrl", L.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Td),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (L) => C(t.id, T),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Pd)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => B(t.id)
              }, "+ Add slide", 8, Vd)
            ])) : t.type === "countdown" ? (a(), n("div", Ed, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (u) => $(t.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Od),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (u) => $(t.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Md),
              o[55] || (o[55] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", Nd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => $(t.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Dd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (u) => $(t.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, zd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (u) => $(t.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Hd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (u) => $(t.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, Wd),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (u) => $(t.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, Fd)
            ])) : t.type === "liquid" ? (a(), n("div", jd, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => $(t.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, qd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => v(t.id)
              }, k(Ie), 8, Kd),
              o[56] || (o[56] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", Yd, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => $(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Jd),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => $(t.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Gd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => v(t.id)
              }, k(Ie), 8, Qd),
              o[57] || (o[57] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", Xd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (u) => $(t.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Zd),
              e("div", eu, [
                o[58] || (o[58] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (u) => $(t.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, tu)
              ]),
              o[59] || (o[59] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", su, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => $(t.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, au),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => $(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, nu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (u) => $(t.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, ou)
            ])) : x("", !0)
          ], 8, Ji))), 128))
        ]),
        e("div", lu, [
          o[60] || (o[60] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", iu, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[3] || (o[3] = (t) => Z("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[4] || (o[4] = (t) => Z("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[5] || (o[5] = (t) => Z("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[6] || (o[6] = (t) => Z("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[7] || (o[7] = (t) => Z("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[8] || (o[8] = (t) => Z("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[9] || (o[9] = (t) => Z("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[10] || (o[10] = (t) => Z("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[11] || (o[11] = (t) => Z("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[12] || (o[12] = (t) => Z("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[13] || (o[13] = (t) => Z("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[14] || (o[14] = (t) => Z("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[15] || (o[15] = (t) => Z("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[16] || (o[16] = (t) => Z("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[17] || (o[17] = (t) => Z("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[18] || (o[18] = (t) => Z("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[19] || (o[19] = (t) => Z("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[20] || (o[20] = (t) => Z("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[21] || (o[21] = (t) => Z("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[22] || (o[22] = (t) => Z("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[23] || (o[23] = (t) => Z("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[24] || (o[24] = (t) => Z("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: o[25] || (o[25] = (t) => Z("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", ru, [
        o[65] || (o[65] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        o[66] || (o[66] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", du, [
          o[63] || (o[63] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", uu, [
            Ue(e("select", {
              "onUpdate:modelValue": o[26] || (o[26] = (t) => R.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(W, null, K(y.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, k(t), 9, cu))), 128))
            ], 512), [
              [Oe, R.value]
            ])
          ])
        ]),
        e("div", pu, [
          o[64] || (o[64] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", mu, [
            Ue(e("input", {
              "onUpdate:modelValue": o[27] || (o[27] = (t) => G.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [Je, G.value]
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
}), bu = /* @__PURE__ */ re(vu, [["__scopeId", "data-v-5a131abf"]]), gu = { class: "keos-email-builder" }, yu = { class: "kb-builder-top" }, fu = { style: { margin: 0, paddingLeft: "1.25rem" } }, hu = { class: "kb-email-layout" }, ku = { class: "kb-email-sidebar" }, _u = {
  key: 0,
  class: "kb-email-form"
}, wu = { class: "kb-email-form-head" }, $u = { class: "kb-wa-form-head-row" }, xu = ["value"], Cu = { class: "kb-email-canvas" }, Su = {
  key: 0,
  class: "kb-email-test-banner"
}, Iu = { class: "kb-email-preview-chrome" }, Uu = { class: "kb-push-preview-controls" }, Ru = { class: "kb-push-preview-as" }, Au = ["value"], Bu = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Lu = { class: "kb-email-inbox-strip" }, Tu = { class: "kb-email-inbox-from" }, Pu = { class: "kb-email-inbox-from-name" }, Vu = { class: "kb-email-inbox-from-addr" }, Eu = { class: "kb-email-inbox-subject" }, Ou = ["title"], Mu = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Nu = { class: "kb-email-body-canvas" }, Du = ["innerHTML"], zu = { class: "kb-email-actions" }, Hu = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Wu = { class: "kb-confirm-dialog" }, Fu = { class: "kb-confirm-actions" }, ju = /* @__PURE__ */ ie({
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
  setup(s, { emit: r }) {
    function l(D) {
      if (!Array.isArray(D) || D.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const f = (C) => String(C).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), B = [];
      for (const C of D)
        switch (C.type) {
          case "heading": {
            const h = Math.min(3, Math.max(1, Number(C.level) || 1)), v = f(C.content || "").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            B.push(`<h${h} style="margin:0 0 12px;font-size:${h === 1 ? "22" : h === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${v || "Heading"}</h${h}>`);
            break;
          }
          case "paragraph": {
            const h = f(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            B.push(`<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${h || "Paragraph"}</p>`);
            break;
          }
          case "image": {
            const h = (C.src || "").trim(), v = f(C.alt || ""), S = (C.linkUrl || "").trim(), Q = h ? `<img src="${f(h)}" alt="${v}" style="max-width:100%;height:auto;display:block;border:0;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            B.push(
              `<div style="margin:0 0 12px;">${S ? `<a href="${f(S)}" style="color:#2563eb;">${Q}</a>` : Q}</div>`
            );
            break;
          }
          case "button": {
            const h = f(C.text || "Button"), v = (C.url || "#").trim(), S = Math.min(24, Math.max(0, Number(C.borderRadius) ?? 8)), Q = !!C.fullWidth, ae = !!C.ghost, b = ae ? "transparent" : "#0f172a", o = ae ? "#0f172a" : "#fff", t = ae ? "2px solid #0f172a" : "none", P = Q ? "block" : "inline-block", u = Q ? "100%" : "auto";
            B.push(
              `<p style="margin:0 0 12px;"><a href="${f(v)}" style="display:${P};width:${u};text-align:center;padding:12px 24px;background:${b};color:${o};border:${t};text-decoration:none;font-size:14px;font-weight:600;border-radius:${S}px;">${h}</a></p>`
            );
            break;
          }
          case "divider": {
            const h = Math.min(8, Math.max(1, Number(C.thickness) || 1)), v = (C.color || "#e2e8f0").trim() || "#e2e8f0", S = C.lineStyle || "solid";
            B.push(
              `<hr style="margin:16px 0;border:0;border-top:${h}px ${S} ${v};" />`
            );
            break;
          }
          case "spacer": {
            const h = Math.min(120, Math.max(8, Number(C.height) || 24));
            B.push(`<div style="height:${h}px;"></div>`);
            break;
          }
          case "footer": {
            const h = f(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), v = (C.unsubscribeUrl || "").trim(), S = f(C.companyAddress || "");
            B.push(
              `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${h || "Footer"}` + (v ? `<p style="margin:8px 0 0;"><a href="${f(v)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (S ? `<p style="margin:4px 0 0;">${S}</p>` : "") + "</div>"
            );
            break;
          }
          case "list": {
            const h = C.style === "numbered" ? "ol" : "ul", S = (Array.isArray(C.items) ? C.items : []).map(
              (Q) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${f(String(Q)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            B.push(`<${h} style="margin:0 0 12px;padding-left:24px;">${S || "<li>Item</li>"}</${h}>`);
            break;
          }
          case "quote": {
            const h = f(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), v = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, S = v[C.style || "default"] || v.default;
            B.push(
              `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${S}font-size:14px;line-height:1.6;">${h || "Quote"}</div>`
            );
            break;
          }
          case "social": {
            const v = (Array.isArray(C.links) ? C.links : []).filter((S) => (S.url || "").trim());
            if (v.length === 0)
              B.push(
                '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>'
              );
            else {
              const S = (Q) => `<a href="${f((Q.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${f(Q.platform || "Link")}</a>`;
              B.push(`<div style="margin:0 0 12px;text-align:center;">${v.map(S).join("")}</div>`);
            }
            break;
          }
          case "video": {
            const h = (C.thumbnailUrl || "").trim(), v = (C.videoUrl || "#").trim(), S = f(C.caption || ""), Q = h ? `<img src="${f(h)}" alt="Video" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            B.push(
              `<div style="margin:0 0 12px;"><a href="${f(v)}" style="display:block;color:inherit;">${Q}</a>` + (S ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${S}</p>` : "") + "</div>"
            );
            break;
          }
          case "link_list": {
            const h = Array.isArray(C.links) ? C.links : [], v = f(C.separator || " | "), Q = h.filter((ae) => (ae.text || ae.url) && (ae.url || "").trim()).map(
              (ae) => `<a href="${f((ae.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${f(ae.text || "Link")}</a>`
            );
            B.push(
              `<p style="margin:0 0 12px;font-size:12px;color:#64748b;text-align:center;">${Q.join(v)}</p>`
            );
            break;
          }
          case "columns": {
            const h = f(C.leftContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), v = f(C.rightContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            B.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${h || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${v || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const h = Math.min(4, Math.max(1, Number(C.columnCount) || 2)), v = Array.isArray(C.cells) ? C.cells.slice(0, h) : [], S = 100 / h, Q = Array.from({ length: h }, (ae, b) => {
              const o = v[b] ?? "", t = f(o).replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<td width="${S}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${t || "—"}</td>`;
            }).join("");
            B.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${Q}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const h = Array.isArray(C.links) ? C.links : [], v = f(C.separator || " | "), Q = h.filter((ae) => (ae.text || ae.url) && (ae.url || "").trim()).map(
              (ae) => `<a href="${f((ae.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${f(ae.text || "Link")}</a>`
            );
            B.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${Q.length ? Q.join(v) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const v = (Array.isArray(C.items) ? C.items : []).map((S) => {
              const Q = f(S.title || "Section"), ae = f(S.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${Q}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${ae}</div></details>`;
            }).join("");
            B.push(v ? `<div style="margin:0 0 12px;">${v}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>');
            break;
          }
          case "carousel": {
            const v = (Array.isArray(C.slides) ? C.slides : []).filter((S) => (S.imageUrl || "").trim());
            if (v.length === 0)
              B.push('<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>');
            else {
              const S = v[0], Q = `<img src="${f(S.imageUrl)}" alt="${f(S.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, ae = (S.linkUrl || "").trim();
              B.push(
                `<div style="margin:0 0 12px;">${ae ? `<a href="${f(ae)}">${Q}</a>` : Q}` + (v.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${v.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const h = f(C.label || "Offer ends in"), v = C.endDateTime ? new Date(C.endDateTime).toLocaleString() : "—";
            B.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${h}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${v}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const h = (C.imageUrl || "").trim(), v = f(C.title || "Product"), S = f(C.price || ""), Q = f(C.buttonText || "Buy now"), ae = (C.buttonUrl || "#").trim(), b = h ? `<img src="${f(h)}" alt="${f(C.alt || v)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            B.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${b}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${v}</p>` + (S ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${S}</p>` : "") + `<a href="${f(ae)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${Q}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const h = f((C.content || "").trim());
            B.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${h || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const h = (C.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), v = f((C.caption || "").trim());
            B.push(
              '<div style="margin:0 0 12px;">' + (v ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${v}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${h || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const h = (C.feedUrl || "").trim(), v = Math.min(20, Math.max(1, Number(C.maxItems) ?? 5));
            B.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (h ? `<p style="margin:0;font-size:12px;color:#64748b;">${f(h)} · max ${v} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const h = (C.imageUrl || "").trim(), v = (C.fallbackUrl || "").trim(), S = f(C.alt || "Dynamic image");
            h ? B.push(
              `<div style="margin:0 0 12px;"><img src="${f(h)}" alt="${S}" style="max-width:100%;height:auto;display:block;border:0;" />` + (v ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${f(v)}</p>` : "") + "</div>"
            ) : B.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return B.join("");
    }
    const d = s, i = r, {
      campaign: m,
      dirty: g,
      customValidatorErrors: p,
      getValidationWithWarnings: y,
      update: R,
      updateMessage: G,
      undo: z,
      redo: _,
      canUndo: O,
      canRedo: E,
      resetMessage: H,
      hooks: A
    } = We({
      initial: d.modelValue,
      hooks: {
        ...d.hooks,
        customValidators: async (D) => {
          var h, v, S;
          const f = [];
          (h = D.name) != null && h.trim() || f.push("Template name is required");
          const B = D.message;
          (v = B == null ? void 0 : B.email_subject) != null && v.trim() || f.push("Subject is required");
          const C = (S = d.hooks) != null && S.customValidators ? await d.hooks.customValidators(D) : [];
          return [...f, ...C];
        }
      },
      onDirty: () => i("change", m.value)
    }), { lastSavedAt: w } = Fe(m, { channel: "email" });
    function te(D) {
      (D.metaKey || D.ctrlKey) && D.key === "z" && (D.preventDefault(), D.shiftKey ? _() : z());
    }
    Ne(() => {
      window.addEventListener("keydown", te);
    }), De(() => {
      window.removeEventListener("keydown", te);
    }), ye(
      m,
      (D) => i("update:modelValue", D),
      { deep: !0 }
    );
    const de = J(), me = J(!0);
    async function pe() {
      if (A.estimateReach)
        try {
          de.value = await A.estimateReach(m.value.audience);
        } catch {
          de.value = void 0;
        }
      A.canSend && (me.value = await Promise.resolve(A.canSend()));
    }
    pe(), ye(() => m.value.audience, pe, { deep: !0 });
    const ve = I(() => (p.value, y(de.value))), fe = I(() => ve.value.blockingErrors), xe = I(() => ve.value.warnings), we = I(() => ve.value.valid), Z = I(() => m.value.template_type ?? "transactional"), F = J(""), se = J(!1), $ = J(null), oe = I(() => {
      const D = F.value;
      return D ? Ve.find((f) => f.id === D) ?? null : null;
    });
    function be(D) {
      const f = m.value, B = D.campaign.message ? { ...f.message, ...D.campaign.message } : f.message;
      R({
        ...D.campaign,
        message: B
      }), $.value = null, se.value = !1;
    }
    function ke(D) {
      const f = D.target.value;
      if (!f) return;
      const B = lt.find((C) => C.id === f);
      B && (g.value ? ($.value = B, se.value = !0) : be(B), D.target.value = "");
    }
    function Re(D) {
      R({ template_type: D });
    }
    function Be(D) {
      R({
        name: D,
        tracking: { ...m.value.tracking ?? {}, campaign_name: D }
      });
    }
    const Se = I(
      () => m.value.message.email_subject ?? ""
    ), ge = I(
      () => m.value.message.email_preview_text ?? ""
    ), he = I(
      () => m.value.message.email_html ?? ""
    ), Ae = I(
      () => m.value.message.email_from_name ?? "Your App"
    ), U = I(
      () => m.value.message.email_from_address ?? "notifications@example.com"
    ), V = I(() => m.value.message.email_blocks ?? []), q = I(() => {
      const D = V.value;
      if (Array.isArray(D) && D.length > 0) return l(D);
      const f = he.value;
      return f && f.trim() ? f : l([]);
    }), le = I(() => {
      const D = Se.value;
      return oe.value ? Te(D, oe.value.data) : D;
    }), M = I(() => {
      const D = ge.value;
      return oe.value ? Te(D, oe.value.data) : D;
    }), N = I(() => {
      const D = q.value;
      return oe.value ? Te(D, oe.value.data) : D;
    }), Y = J("desktop");
    function $e() {
      we.value && i("save", m.value);
    }
    return (D, f) => (a(), n("div", gu, [
      e("div", yu, [
        ue(je, {
          "campaign-name": c(m).name,
          status: c(m).status,
          dirty: c(g),
          "last-saved-at": c(w),
          "can-undo": c(O),
          "can-redo": c(E),
          "onUpdate:campaignName": Be,
          onUndo: c(z),
          onRedo: c(_)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        fe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ne({
            background: c(ee).dangerBg,
            border: `1px solid ${c(ee).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(j)[16]}px ${c(j)[24]}px`,
            marginBottom: `${c(j)[24]}px`
          })
        }, [
          e("ul", {
            style: ne({ margin: 0, paddingLeft: "1.25rem", color: c(ee).danger })
          }, [
            (a(!0), n(W, null, K(fe.value, (B) => (a(), n("li", {
              key: B.message
            }, k(B.message), 1))), 128))
          ], 4)
        ], 4)) : x("", !0),
        xe.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ne({
            background: c(ee).neutral.bg,
            border: `1px solid ${c(ee).neutral.border}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(j)[16]}px ${c(j)[24]}px`,
            marginBottom: `${c(j)[24]}px`,
            fontSize: "0.875rem",
            color: c(ee).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ne({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", fu, [
            (a(!0), n(W, null, K(xe.value, (B) => (a(), n("li", {
              key: B.message
            }, k(B.message), 1))), 128))
          ])
        ], 4)) : x("", !0)
      ]),
      e("div", hu, [
        e("aside", ku, [
          s.disabledSections.includes("email") ? x("", !0) : (a(), n("div", _u, [
            e("div", wu, [
              f[9] || (f[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", $u, [
                ue(qe, {
                  "template-type": Z.value,
                  onUpdate: Re
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  f[8] || (f[8] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(W, null, K(c(lt), (B) => (a(), n("option", {
                    key: B.id,
                    value: B.id
                  }, k(B.label), 9, xu))), 128))
                ], 32)
              ])
            ]),
            ue(bu, {
              message: c(m).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: c(G),
              onReset: f[0] || (f[0] = (B) => c(H)({ email_blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Cu, [
          !s.designOnly && c(m).audience.test_mode ? (a(), n("div", Su, [...f[10] || (f[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            X(" Test mode — only your test segment will receive this. ", -1)
          ])])) : x("", !0),
          e("div", Iu, [
            e("div", Uu, [
              e("label", Ru, [
                f[12] || (f[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ue(e("select", {
                  "onUpdate:modelValue": f[1] || (f[1] = (B) => F.value = B),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  f[11] || (f[11] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(W, null, K(c(Ve), (B) => (a(), n("option", {
                    key: B.id,
                    value: B.id
                  }, k(B.label), 9, Au))), 128))
                ], 512), [
                  [Oe, F.value]
                ])
              ])
            ]),
            e("div", Bu, [
              e("button", {
                type: "button",
                class: ce(["kb-email-device-btn", { "kb-email-device-btn--active": Y.value === "desktop" }]),
                onClick: f[2] || (f[2] = (B) => Y.value = "desktop")
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
                class: ce(["kb-email-device-btn", { "kb-email-device-btn--active": Y.value === "mobile" }]),
                onClick: f[3] || (f[3] = (B) => Y.value = "mobile")
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
              class: ce(["kb-email-preview-frame", { "kb-email-preview-frame--mobile": Y.value === "mobile" }])
            }, [
              e("div", Lu, [
                e("div", Tu, [
                  e("span", Pu, k(Ae.value), 1),
                  e("span", Vu, "<" + k(U.value) + ">", 1)
                ]),
                e("div", Eu, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: le.value || "No subject"
                  }, k(le.value || "No subject"), 9, Ou),
                  M.value ? (a(), n("span", Mu, " — " + k(M.value), 1)) : x("", !0)
                ])
              ]),
              e("div", Nu, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: N.value
                }, null, 8, Du)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", zu, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: f[4] || (f[4] = (B) => i("duplicate", JSON.parse(JSON.stringify(c(m)))))
        }, " Duplicate ")) : x("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: $e
        }, " Save ")) : x("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-email-action kb-email-action--primary",
          onClick: f[5] || (f[5] = (B) => i("edit"))
        }, " Close ")) : x("", !0)
      ]),
      se.value ? (a(), n("div", Hu, [
        e("div", Wu, [
          f[15] || (f[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          f[16] || (f[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Fu, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: f[6] || (f[6] = (B) => {
                se.value = !1, $.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: f[7] || (f[7] = (B) => $.value && be($.value))
            }, "Replace")
          ])
        ])
      ])) : x("", !0)
    ]));
  }
}), kt = /* @__PURE__ */ re(ju, [["__scopeId", "data-v-564f7f14"]]), qu = { class: "kb-shell" }, Ku = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Yu = ["aria-selected", "onClick"], Ju = { class: "kb-shell__meta" }, Gu = ["href"], Qu = { class: "kb-shell__body" }, Xu = /* @__PURE__ */ ie({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(s, { emit: r }) {
    const l = r, d = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (i, m) => (a(), n("div", qu, [
      e("header", {
        class: "kb-shell__header",
        style: ne({ padding: `${c(j)[12]}px ${c(j)[24]}px`, borderBottom: `1px solid ${c(ee).neutral.border}`, background: c(ee).neutral.bg })
      }, [
        m[0] || (m[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Ku, [
          (a(), n(W, null, K(d, (g) => e("button", {
            key: g.id,
            type: "button",
            class: ce(["kb-shell__channel", { "kb-shell__channel--active": s.channel === g.id }]),
            role: "tab",
            "aria-selected": s.channel === g.id,
            onClick: (p) => l("switch-channel", g.id)
          }, k(g.label), 11, Yu)), 64))
        ]),
        e("div", Ju, [
          s.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: ne({ padding: "2px 8px", borderRadius: `${c(Ce).input}px`, fontSize: "0.75rem", background: c(ee).neutral.bg, color: c(ee).neutral.textMuted })
          }, k(s.environment), 5)) : x("", !0),
          s.helpUrl ? (a(), n("a", {
            key: 1,
            href: s.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ne({ color: c(ee).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Gu)) : x("", !0)
        ])
      ], 4),
      e("div", Qu, [
        Le(i.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Zu = /* @__PURE__ */ re(Xu, [["__scopeId", "data-v-0df30803"]]), ec = {
  class: "kb-outline",
  "aria-label": "Sections"
}, tc = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, sc = ["onClick"], ac = /* @__PURE__ */ ie({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(s) {
    var m;
    const r = s, l = J(((m = r.items[0]) == null ? void 0 : m.id) ?? "");
    let d = null;
    function i(g) {
      const p = document.getElementById(g);
      p && p.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return Ne(() => {
      const g = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      g && (d = new IntersectionObserver(
        (p) => {
          for (const y of p)
            if (y.isIntersecting) {
              const R = y.target.getAttribute("data-outline-id");
              R && (l.value = R);
            }
        },
        { root: g === document ? null : g, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((p) => {
        const y = document.getElementById(p.id);
        y && (d == null || d.observe(y));
      }));
    }), De(() => {
      d == null || d.disconnect();
    }), ye(
      () => r.items,
      (g) => {
        g.length && !l.value && (l.value = g[0].id);
      },
      { immediate: !0 }
    ), (g, p) => (a(), n("nav", ec, [
      e("ul", tc, [
        (a(!0), n(W, null, K(s.items, (y) => (a(), n("li", {
          key: y.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ce(["kb-outline__btn", { "kb-outline__btn--active": l.value === y.id }]),
            style: ne({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${c(j)[8]}px ${c(j)[12]}px`,
              border: "none",
              borderRadius: `${c(Ce).input}px`,
              background: l.value === y.id ? c(ee).neutral.bg : "transparent",
              color: l.value === y.id ? "#0f172a" : c(ee).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: l.value === y.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (R) => i(y.id)
          }, k(y.label), 15, sc)
        ]))), 128))
      ])
    ]));
  }
}), nc = /* @__PURE__ */ re(ac, [["__scopeId", "data-v-25c37675"]]), oc = ["id"], lc = {
  key: 1,
  class: "kb-form-shell__head"
}, ic = /* @__PURE__ */ ie({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(s) {
    return (r, l) => (a(), n("div", {
      class: "kb-form-shell",
      id: s.sectionId ?? void 0,
      style: ne({
        padding: `${c(j)[24]}px ${c(j)[24]}px ${c(j)[32]}px`,
        marginBottom: 0
      })
    }, [
      s.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ne({ marginBottom: c(j)[24], paddingBottom: c(j)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ne({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: c(j)[12] })
        }, k(s.label), 5),
        Le(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", lc, [
        Le(r.$slots, "head", {}, void 0, !0)
      ])),
      Le(r.$slots, "default", {}, void 0, !0)
    ], 12, oc));
  }
}), rc = /* @__PURE__ */ re(ic, [["__scopeId", "data-v-6504df41"]]), dc = /* @__PURE__ */ ie({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(s) {
    return (r, l) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ne({
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
      Le(r.$slots, "default")
    ], 4));
  }
}), uc = /* @__PURE__ */ ie({
  __name: "BuilderTopShell",
  setup(s) {
    return (r, l) => (a(), n("div", {
      class: "kb-top-shell",
      style: ne({
        marginLeft: c(j)[24],
        marginRight: c(j)[24]
      })
    }, [
      Le(r.$slots, "header"),
      Le(r.$slots, "errors"),
      Le(r.$slots, "warnings"),
      Le(r.$slots, "default")
    ], 4));
  }
});
function cc(s) {
  s.component("KeosNotificationBuilder", yt), s.component("KeosWhatsAppBuilder", ft), s.component("KeosSmsBuilder", ht), s.component("KeosEmailBuilder", kt), s.component("BuilderShell", Zu), s.component("BuilderOutline", nc), s.component("BuilderVersionHistoryModal", gt), s.component("BuilderFormShell", rc), s.component("BuilderActionsBar", dc), s.component("BuilderTopShell", uc);
}
const mc = {
  install: cc,
  KeosNotificationBuilder: yt,
  KeosWhatsAppBuilder: ft,
  KeosSmsBuilder: ht,
  KeosEmailBuilder: kt
};
export {
  dc as BuilderActionsBar,
  rc as BuilderFormShell,
  nc as BuilderOutline,
  Zu as BuilderShell,
  uc as BuilderTopShell,
  gt as BuilderVersionHistoryModal,
  Ve as DEFAULT_SAMPLE_PROFILES,
  kt as KeosEmailBuilder,
  yt as KeosNotificationBuilder,
  ht as KeosSmsBuilder,
  ft as KeosWhatsAppBuilder,
  mc as default,
  cc as install,
  Te as renderTemplatePreview,
  Fe as useAutosave,
  We as useCampaignState
};
//# sourceMappingURL=index.js.map
