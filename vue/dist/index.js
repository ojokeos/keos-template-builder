import { ref as J, computed as I, watch as ye, defineComponent as le, openBlock as a, createElementBlock as n, normalizeStyle as te, unref as c, createElementVNode as e, Fragment as H, renderList as K, toDisplayString as h, createTextVNode as Q, createCommentVNode as w, normalizeClass as de, withDirectives as Ie, vModelSelect as Me, vModelText as Ge, vModelCheckbox as _t, createStaticVNode as Oe, withKeys as wt, onMounted as Ne, onUnmounted as De, createVNode as re, createBlock as $t, renderSlot as Be } from "vue";
const j = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, $e = {
  input: 6,
  card: 12,
  button: 6
}, X = {
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
X.neutral.textMuted, X.neutral.textMeta;
const We = {
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
}, xt = ["android", "ios", "web"], dt = "normal", ut = ["low", "normal", "high"], Ct = 86400, St = [3600, 7200, 86400, 172800], ct = "1.0", It = ["topic", "segment", "user_list"];
function Qe() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...xt],
    test_mode: !1
  };
}
function Xe() {
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
function Ze() {
  return {
    priority: dt,
    ttl_seconds: Ct,
    quiet_hours_respected: !1,
    send_local_time: !1,
    silent_push: !1
  };
}
function et() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function Ut(s) {
  return {
    schema_version: ct,
    name: "",
    status: "draft",
    audience: Qe(),
    message: Xe(),
    delivery: Ze(),
    tracking: et(),
    ...s
  };
}
function pt(s) {
  const d = s;
  return d.schema_version || (d.schema_version = ct), d.audience || (d.audience = Qe()), d.message || (d.message = Xe()), d.delivery || (d.delivery = Ze()), d.tracking || (d.tracking = et()), ut.includes(d.delivery.priority) || (d.delivery.priority = dt), It.includes(d.audience.type) || (d.audience.type = "topic"), d.audience.type === "topic" && !d.audience.topic_name && (d.audience.topic_name = "default"), d;
}
const Rt = 1e5;
function At(s, d) {
  var o, m, v;
  const i = [], r = d ?? s.audience.estimated_reach;
  return r !== void 0 && r >= Rt && i.push({
    message: `Estimated reach is very high (${r.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), s.tracking && !((o = s.tracking.campaign_name) != null && o.trim()) && !((m = s.name) != null && m.trim()) && i.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (v = s.message.deep_link) != null && v.trim() || i.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), i;
}
function ze(s, d = "error") {
  return { message: s, severity: d };
}
function mt(s) {
  var i, r;
  console.log("Validating campaign", s);
  const d = [];
  return s.schema_version || d.push(ze("Missing schema_version")), (i = s.name) != null && i.trim() || d.push(ze("Template name is required")), (r = s.message.body) != null && r.trim() || d.push(ze("Message body is required")), {
    valid: d.length === 0,
    errors: d
  };
}
function Bt(s, d) {
  const i = mt(s), r = At(s, d);
  return {
    valid: i.valid,
    errors: [
      ...i.errors,
      ...r.map((o) => ze(o.message, o.severity))
    ]
  };
}
function Lt(s) {
  return s.errors.filter((d) => d.severity === "error");
}
function Tt(s) {
  return s.errors.filter((d) => d.severity !== "error");
}
function Pe(s, d) {
  return s.length <= d ? { text: s, truncated: !1 } : { text: s.slice(0, Math.max(0, d - 3)) + "...", truncated: !0 };
}
const He = We.android;
function Pt(s) {
  const { title: d, body: i } = s, r = Pe(d || "", He.title), o = Pe(i || "", He.body);
  return {
    title: r.text,
    body: o.text,
    imageUrl: s.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: o.truncated,
    expanded: !1
  };
}
function Vt(s) {
  const { title: d, body: i } = s, r = Pe(d || "", He.title), o = Pe(i || "", He.body);
  return {
    title: r.text,
    body: o.text,
    imageUrl: s.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: o.truncated,
    expanded: !0
  };
}
function Et(s, d = {}) {
  const i = d.expanded ? Vt(s) : Pt(s);
  return d.darkMode !== void 0 && (i.darkMode = d.darkMode), i;
}
const tt = We.ios;
function vt(s) {
  const { title: d, body: i } = s, r = Pe(d || "", tt.title), o = Pe(i || "", tt.body);
  return {
    title: r.text,
    body: o.text,
    imageUrl: s.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: o.truncated,
    expanded: !1
  };
}
function Mt(s) {
  return vt(s);
}
function Ot(s, d = {}) {
  const i = d.variant === "lockscreen" ? Mt(s) : vt(s);
  return d.darkMode !== void 0 && (i.darkMode = d.darkMode), i;
}
const st = We.web;
function at(s) {
  const { title: d, body: i } = s, r = Pe(d || "", st.title), o = Pe(i || "", st.body);
  return {
    title: r.text,
    body: o.text,
    imageUrl: s.imageUrl,
    titleTruncated: r.truncated,
    bodyTruncated: o.truncated
  };
}
function Je(s) {
  return JSON.parse(JSON.stringify(s));
}
function Fe(s = {}) {
  const d = J(
    pt(s.initial ?? Ut())
  ), i = s.hooks ?? {}, r = J(!1), o = J([]), m = J([]);
  function v() {
    const U = Je(d.value);
    o.value = [...o.value.slice(-19), U], m.value = [];
  }
  const p = I(() => o.value.length > 0), y = I(() => m.value.length > 0);
  function L() {
    o.value.length !== 0 && (m.value = [Je(d.value), ...m.value], d.value = o.value[o.value.length - 1], o.value = o.value.slice(0, -1));
  }
  function Y() {
    m.value.length !== 0 && (o.value = [...o.value, Je(d.value)], d.value = m.value[0], m.value = m.value.slice(1));
  }
  ye(
    d,
    () => {
      var U;
      r.value = !0, (U = s.onDirty) == null || U.call(s);
    },
    { deep: !0 }
  );
  const N = I(() => mt(d.value));
  function $(U) {
    const se = Bt(d.value, U);
    return {
      ...se,
      blockingErrors: Lt(se),
      warnings: Tt(se),
      valid: se.valid
    };
  }
  function M(U) {
    v(), d.value = { ...d.value, ...U };
  }
  function R(U) {
    v(), d.value = {
      ...d.value,
      audience: { ...d.value.audience, ...U }
    };
  }
  function W(U) {
    v(), d.value = {
      ...d.value,
      message: { ...d.value.message, ...U }
    };
  }
  function A(U) {
    v(), d.value = {
      ...d.value,
      delivery: { ...d.value.delivery, ...U }
    };
  }
  function f(U) {
    v(), d.value = {
      ...d.value,
      tracking: d.value.tracking ? { ...d.value.tracking, ...U } : { campaign_name: "", tags: [], ab_test: !1, ...U }
    };
  }
  function ee(U) {
    v(), d.value = {
      ...d.value,
      message: { ...Xe(), ...U }
    };
  }
  function ce(U) {
    v(), d.value = {
      ...d.value,
      delivery: { ...Ze(), ...U }
    };
  }
  function oe(U) {
    v(), d.value = {
      ...d.value,
      tracking: { ...et(), ...U }
    };
  }
  function pe(U) {
    v(), d.value = {
      ...d.value,
      audience: { ...Qe(), ...U }
    };
  }
  const be = I(() => ({
    title: d.value.message.title,
    body: d.value.message.body,
    imageUrl: d.value.message.image_url
  }));
  function _e(U, se) {
    const ne = be.value;
    let S;
    switch (U) {
      case "android":
        S = Et(ne, { expanded: se == null ? void 0 : se.expanded });
        break;
      case "ios":
        S = Ot(ne);
        break;
      case "web":
        S = at(ne);
        break;
      default:
        S = at(ne);
    }
    const fe = d.value.message.actions ?? [];
    return { ...S, actions: fe };
  }
  const ke = We;
  async function me() {
    return i.customValidators ? i.customValidators(d.value) : [];
  }
  return {
    campaign: d,
    dirty: r,
    validation: N,
    getValidationWithWarnings: $,
    update: M,
    updateAudience: R,
    updateMessage: W,
    updateDelivery: A,
    updateTracking: f,
    undo: L,
    redo: Y,
    canUndo: p,
    canRedo: y,
    resetMessage: ee,
    resetDelivery: ce,
    resetTracking: oe,
    resetAudience: pe,
    getPreview: _e,
    previewInput: be,
    characterLimits: ke,
    runCustomValidators: me,
    hooks: i
  };
}
const Nt = "keos-draft", Dt = 2e3;
function zt(s, d) {
  return `${Nt}-${s}-${d}`;
}
function je(s, d) {
  const i = d.channel, r = I(
    () => {
      var Y, N;
      return zt(
        i,
        d.key ?? ((Y = s.value) == null ? void 0 : Y.id) ?? ((N = s.value) == null ? void 0 : N.name) ?? "draft"
      );
    }
  ), o = J(null);
  let m = null;
  function v() {
    try {
      const Y = JSON.stringify(s.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(r.value, Y), o.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function p() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(r.value);
    } catch {
    }
  }
  function y() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const Y = window.localStorage.getItem(r.value);
      if (!Y) return null;
      const N = JSON.parse(Y);
      return pt(N);
    } catch {
      return null;
    }
  }
  function L() {
    return d.enabled === void 0 ? !0 : typeof d.enabled == "boolean" ? d.enabled : d.enabled.value;
  }
  return ye(
    s,
    () => {
      L() && (m && clearTimeout(m), m = setTimeout(() => {
        m = null, v();
      }, Dt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: o,
    clearDraft: p,
    getDraft: y,
    persist: v
  };
}
const Ht = { class: "kb-header__row" }, Wt = ["value"], Ft = { class: "kb-header__actions" }, jt = ["disabled"], Kt = ["disabled"], qt = ["value"], Yt = ["value"], Jt = /* @__PURE__ */ le({
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
  setup(s, { emit: d }) {
    const i = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], r = d;
    function o(v) {
      return v.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function m(v) {
      const p = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return p[v] ?? p.draft;
    }
    return (v, p) => (a(), n("header", {
      class: "kb-header",
      style: te({
        padding: `${c(j)[16]}px 0`,
        borderBottom: `1px solid ${c(X).neutral.border}`,
        marginBottom: `${c(j)[16]}px`
      })
    }, [
      e("div", Ht, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: s.campaignName,
          placeholder: "Name this campaign (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: p[0] || (p[0] = (y) => r("update:campaignName", y.target.value)),
          "aria-label": "Campaign name"
        }, null, 40, Wt),
        e("div", Ft, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !s.canUndo,
            onClick: p[1] || (p[1] = (y) => r("undo"))
          }, " Undo ", 8, jt),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !s.canRedo,
            onClick: p[2] || (p[2] = (y) => r("redo"))
          }, " Redo ", 8, Kt)
        ]),
        s.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: s.workflowStatus,
          class: "kb-header__status-select",
          style: te({
            padding: `${c(j)[4]}px ${c(j)[8]}px`,
            borderRadius: `${c($e).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...m(s.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: p[3] || (p[3] = (y) => r("update:workflowStatus", y.target.value))
        }, [
          (a(), n(H, null, K(i, (y) => e("option", {
            key: y.value,
            value: y.value
          }, h(y.label), 9, Yt)), 64))
        ], 44, qt)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: te({
            padding: `${c(j)[4]}px ${c(j)[8]}px`,
            borderRadius: `${c($e).input}px`,
            background: c(X).neutral.bg,
            fontSize: "0.8125rem",
            color: c(X).neutral.textMuted
          })
        }, h(s.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: te({ fontSize: "0.8125rem", color: c(X).neutral.textMuted, marginTop: `${c(j)[4]}px` })
      }, [
        s.saving ? (a(), n(H, { key: 0 }, [
          Q("Saving…")
        ], 64)) : s.dirty ? (a(), n(H, { key: 1 }, [
          Q("Unsaved changes")
        ], 64)) : s.lastSavedAt ? (a(), n(H, { key: 2 }, [
          Q("Last saved at " + h(o(s.lastSavedAt)), 1)
        ], 64)) : w("", !0)
      ], 4)
    ], 4));
  }
}), ie = (s, d) => {
  const i = s.__vccOpts || s;
  for (const [r, o] of d)
    i[r] = o;
  return i;
}, Ke = /* @__PURE__ */ ie(Jt, [["__scopeId", "data-v-bf624780"]]), Gt = { class: "kb-section" }, Qt = { class: "kb-section__head" }, Xt = { class: "kb-section__desc" }, Zt = { class: "kb-field" }, es = { class: "kb-label" }, ts = { class: "kb-field-with-rail" }, ss = ["value", "aria-invalid", "aria-describedby"], as = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, ns = { class: "kb-field" }, ls = { class: "kb-label" }, os = { class: "kb-field-with-rail" }, is = ["value", "aria-invalid", "aria-describedby"], rs = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, ds = { class: "kb-field" }, us = ["value", "aria-invalid", "aria-describedby"], cs = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, ps = { class: "kb-field" }, ms = ["value", "aria-invalid", "aria-describedby"], vs = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, bs = { class: "kb-field" }, gs = { class: "kb-actions-list" }, ys = ["value", "onInput"], fs = ["value", "onInput"], hs = ["onClick"], ks = ["disabled"], _s = { class: "kb-action-chips" }, ws = ["disabled", "onClick"], $s = /* @__PURE__ */ le({
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
    const d = s;
    return (i, r) => (a(), n("section", Gt, [
      e("div", Qt, [
        r[6] || (r[6] = e("h3", { class: "kb-section__title" }, "Message", -1)),
        s.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: r[0] || (r[0] = (o) => i.$emit("reset"))
        }, " Reset section ")) : w("", !0)
      ]),
      e("p", Xt, " Message body is required. Title is optional. Character limits depend on the selected platform (" + h(s.selectedPlatform) + "). ", 1),
      e("div", Zt, [
        e("label", es, [
          r[7] || (r[7] = Q(" Title ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": s.titleCount > s.titleLimit }])
          }, h(s.titleCount) + "/" + h(s.titleLimit), 3)
        ]),
        e("div", ts, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Notification title",
            value: s.message.title,
            "aria-invalid": !!s.titleError,
            "aria-describedby": s.titleError ? "title-error" : void 0,
            onInput: r[1] || (r[1] = (o) => i.$emit("update", { title: o.target.value }))
          }, null, 40, ss),
          e("div", {
            class: "kb-char-rail",
            role: "presentation",
            style: te({ "--pct": Math.min(100, s.titleCount / s.titleLimit * 100) + "%" })
          }, [...r[8] || (r[8] = [
            e("div", { class: "kb-char-rail__fill" }, null, -1)
          ])], 4)
        ]),
        s.titleError ? (a(), n("p", as, h(s.titleError), 1)) : w("", !0)
      ]),
      e("div", ns, [
        e("label", ls, [
          r[9] || (r[9] = Q(" Message ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": s.bodyCount > s.bodyLimit }])
          }, h(s.bodyCount) + "/" + h(s.bodyLimit), 3)
        ]),
        e("div", os, [
          e("textarea", {
            class: "kb-textarea",
            rows: "3",
            placeholder: "Notification body",
            value: s.message.body,
            "aria-invalid": !!s.bodyError,
            "aria-describedby": s.bodyError ? "body-error" : void 0,
            onInput: r[2] || (r[2] = (o) => i.$emit("update", { body: o.target.value }))
          }, null, 40, is),
          e("div", {
            class: "kb-char-rail",
            role: "presentation",
            style: te({ "--pct": Math.min(100, s.bodyCount / s.bodyLimit * 100) + "%" })
          }, [...r[10] || (r[10] = [
            e("div", { class: "kb-char-rail__fill" }, null, -1)
          ])], 4)
        ]),
        s.bodyError ? (a(), n("p", rs, h(s.bodyError), 1)) : w("", !0)
      ]),
      e("div", ds, [
        r[11] || (r[11] = e("label", { class: "kb-label" }, [
          Q(" Media (image URL) "),
          e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: s.message.image_url,
          "aria-invalid": !!s.imageUrlError,
          "aria-describedby": s.imageUrlError ? "image-url-error" : void 0,
          onInput: r[3] || (r[3] = (o) => i.$emit("update", { image_url: o.target.value || void 0 }))
        }, null, 40, us),
        s.imageUrlError ? (a(), n("p", cs, h(s.imageUrlError), 1)) : w("", !0)
      ]),
      e("div", ps, [
        r[12] || (r[12] = e("label", { class: "kb-label" }, [
          Q(" Deep link / Action URL "),
          e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https:// or app://...",
          value: s.message.deep_link,
          "aria-invalid": !!s.deepLinkError,
          "aria-describedby": s.deepLinkError ? "deeplink-error" : void 0,
          onInput: r[4] || (r[4] = (o) => i.$emit("update", { deep_link: o.target.value || void 0 }))
        }, null, 40, ms),
        s.deepLinkError ? (a(), n("p", vs, h(s.deepLinkError), 1)) : w("", !0)
      ]),
      e("div", bs, [
        r[14] || (r[14] = e("label", { class: "kb-label" }, [
          Q(" Actions (optional) "),
          e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
        ], -1)),
        e("div", gs, [
          (a(!0), n(H, null, K(d.message.actions ?? [], (o, m) => (a(), n("div", {
            key: o.id || m,
            class: "kb-action-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--action-label",
              placeholder: "Button label (e.g. View, Dismiss)",
              value: o.label,
              onInput: (v) => {
                var L;
                const p = [...d.message.actions ?? []], y = Number(m);
                p[y] = {
                  ...p[y],
                  id: ((L = p[y]) == null ? void 0 : L.id) || `action_${y + 1}`,
                  label: v.target.value
                }, i.$emit("update", { actions: p });
              }
            }, null, 40, ys),
            e("input", {
              type: "url",
              class: "kb-input kb-input--action-url",
              placeholder: "Optional deep link (https:// or app://)",
              value: o.url,
              onInput: (v) => {
                var L;
                const p = [...d.message.actions ?? []], y = Number(m);
                p[y] = {
                  ...p[y],
                  id: ((L = p[y]) == null ? void 0 : L.id) || `action_${y + 1}`,
                  url: v.target.value || void 0
                }, i.$emit("update", { actions: p });
              }
            }, null, 40, fs),
            e("button", {
              type: "button",
              class: "kb-btn-remove-action",
              onClick: () => {
                const v = [...d.message.actions ?? []];
                v.splice(Number(m), 1), i.$emit("update", { actions: v });
              }
            }, " Remove ", 8, hs)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-btn-add-action",
            disabled: (d.message.actions ?? []).length >= 3,
            onClick: r[5] || (r[5] = () => {
              const o = [...d.message.actions ?? []];
              o.push({
                id: `action_${o.length + 1}`,
                label: "",
                url: ""
              }), i.$emit("update", { actions: o });
            })
          }, " Add action ", 8, ks),
          e("div", _s, [
            r[13] || (r[13] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
            (a(), n(H, null, K(["View order", "Track shipment", "Open app"], (o) => e("button", {
              key: o,
              type: "button",
              class: "kb-action-chip",
              disabled: (d.message.actions ?? []).length >= 3,
              onClick: () => {
                const m = [...d.message.actions ?? []];
                m.push({
                  id: `action_${Date.now()}`,
                  label: o,
                  url: ""
                }), i.$emit("update", { actions: m });
              }
            }, h(o), 9, ws)), 64))
          ])
        ])
      ])
    ]));
  }
}), xs = /* @__PURE__ */ ie($s, [["__scopeId", "data-v-761043cd"]]), Cs = { class: "kb-section kb-section--inline-personalization" }, Ss = { class: "kb-field" }, Is = { class: "kb-insert-row" }, Us = ["value"], Rs = { class: "kb-field" }, As = { class: "kb-insert-row" }, Bs = { class: "kb-field" }, Ls = { class: "kb-variable-list" }, Ts = /* @__PURE__ */ le({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(s, { emit: d }) {
    const i = s, r = d, o = ["first_name", "last_name", "order_id", "city"], m = J(i.variableOptions ?? o), v = J(m.value[0] ?? o[0]), p = J("");
    ye(
      () => i.variableOptions,
      (N) => {
        N && N.length && (m.value = [...N], m.value.includes(v.value) || (v.value = m.value[0]));
      }
    );
    const y = I(() => m.value);
    function L(N) {
      r("insertVariable", { variable: v.value, field: N });
    }
    function Y() {
      const N = p.value.trim();
      N && (m.value.includes(N) || (m.value = [...m.value, N]), v.value = N, p.value = "");
    }
    return (N, $) => (a(), n("section", Cs, [
      $[8] || ($[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      $[9] || ($[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ss, [
        $[4] || ($[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Is, [
          Ie(e("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (M) => v.value = M),
            class: "kb-select"
          }, [
            (a(!0), n(H, null, K(y.value, (M) => (a(), n("option", {
              key: M,
              value: M
            }, h(M), 9, Us))), 128))
          ], 512), [
            [Me, v.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: $[1] || ($[1] = (M) => L("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: $[2] || ($[2] = (M) => L("body"))
          }, "Into message")
        ])
      ]),
      e("div", Rs, [
        $[5] || ($[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", As, [
          Ie(e("input", {
            "onUpdate:modelValue": $[3] || ($[3] = (M) => p.value = M),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [Ge, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: Y
          }, " Add ")
        ])
      ]),
      e("div", Bs, [
        $[6] || ($[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        $[7] || ($[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ls, [
          (a(!0), n(H, null, K(y.value, (M) => (a(), n("li", { key: M }, [
            e("code", null, "{{ " + h(M) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), bt = /* @__PURE__ */ ie(Ts, [["__scopeId", "data-v-6d49f6dc"]]), Ps = { class: "kb-section kb-section--template-type" }, Vs = { class: "kb-field" }, Es = { class: "kb-radio-group" }, Ms = { class: "kb-radio" }, Os = ["checked"], Ns = { class: "kb-radio" }, Ds = ["checked"], zs = /* @__PURE__ */ le({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(s, { emit: d }) {
    const i = d;
    return (r, o) => (a(), n("section", Ps, [
      o[5] || (o[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      o[6] || (o[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Vs, [
        e("div", Es, [
          e("label", Ms, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: s.templateType === "transactional",
              onChange: o[0] || (o[0] = (m) => i("update", "transactional"))
            }, null, 40, Os),
            o[2] || (o[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ns, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: s.templateType === "marketing",
              onChange: o[1] || (o[1] = (m) => i("update", "marketing"))
            }, null, 40, Ds),
            o[3] || (o[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        o[4] || (o[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), qe = /* @__PURE__ */ ie(zs, [["__scopeId", "data-v-991f74e5"]]), Hs = { class: "kb-section" }, Ws = { class: "kb-section__head" }, Fs = { class: "kb-section__desc" }, js = { class: "kb-field" }, Ks = { class: "kb-radio-group" }, qs = { class: "kb-radio" }, Ys = ["checked"], Js = { class: "kb-radio" }, Gs = ["checked"], Qs = {
  key: 0,
  class: "kb-field kb-row"
}, Xs = ["value"], Zs = ["value"], ea = { class: "kb-field" }, ta = ["value"], sa = ["value"], aa = { class: "kb-field" }, na = ["value"], la = ["value"], oa = { class: "kb-field" }, ia = { class: "kb-checkbox" }, ra = ["checked"], da = /* @__PURE__ */ le({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s) {
    const d = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (i, r) => {
      var o;
      return a(), n("section", Hs, [
        e("div", Ws, [
          r[8] || (r[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: r[0] || (r[0] = (m) => i.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        e("p", Fs, h(s.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", js, [
          r[11] || (r[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", Ks, [
            e("label", qs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !s.delivery.scheduled_at,
                onChange: r[1] || (r[1] = (m) => i.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Ys),
              r[9] || (r[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Js, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!s.delivery.scheduled_at,
                onChange: r[2] || (r[2] = (m) => i.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Gs),
              r[10] || (r[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        s.delivery.scheduled_at ? (a(), n("div", Qs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (o = s.delivery.scheduled_at) == null ? void 0 : o.slice(0, 16),
            onInput: r[3] || (r[3] = (m) => i.$emit("update", { scheduled_at: m.target.value }))
          }, null, 40, Xs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: s.delivery.timezone,
            onInput: r[4] || (r[4] = (m) => i.$emit("update", { timezone: m.target.value }))
          }, null, 40, Zs)
        ])) : w("", !0),
        s.showPushOptions ? (a(), n(H, { key: 1 }, [
          e("div", ea, [
            r[12] || (r[12] = e("label", { class: "kb-label" }, [
              Q(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.ttl_seconds,
              onChange: r[5] || (r[5] = (m) => i.$emit("update", { ttl_seconds: Number(m.target.value) }))
            }, [
              (a(!0), n(H, null, K(c(St), (m) => (a(), n("option", {
                key: m,
                value: m
              }, h(d[m] ?? m + "s"), 9, sa))), 128))
            ], 40, ta)
          ]),
          e("div", aa, [
            r[13] || (r[13] = e("label", { class: "kb-label" }, [
              Q(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.priority,
              onChange: r[6] || (r[6] = (m) => i.$emit("update", { priority: m.target.value }))
            }, [
              (a(!0), n(H, null, K(c(ut), (m) => (a(), n("option", {
                key: m,
                value: m
              }, h(m), 9, la))), 128))
            ], 40, na)
          ]),
          e("div", oa, [
            e("label", ia, [
              e("input", {
                type: "checkbox",
                checked: s.delivery.quiet_hours_respected,
                onChange: r[7] || (r[7] = (m) => i.$emit("update", { quiet_hours_respected: !s.delivery.quiet_hours_respected }))
              }, null, 40, ra),
              r[14] || (r[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : w("", !0)
      ]);
    };
  }
}), ua = /* @__PURE__ */ ie(da, [["__scopeId", "data-v-aacf1acb"]]), ca = { class: "kb-accordion" }, pa = { class: "kb-accordion__body" }, ma = { class: "kb-field" }, va = ["value"], ba = { class: "kb-field" }, ga = { class: "kb-checkbox" }, ya = ["checked"], fa = /* @__PURE__ */ le({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(s) {
    return (d, i) => (a(), n("details", ca, [
      i[4] || (i[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", pa, [
        e("div", ma, [
          i[2] || (i[2] = e("label", { class: "kb-label" }, [
            Q(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: s.delivery.collapse_key,
            onInput: i[0] || (i[0] = (r) => d.$emit("update", { collapse_key: r.target.value || void 0 }))
          }, null, 40, va)
        ]),
        e("div", ba, [
          e("label", ga, [
            e("input", {
              type: "checkbox",
              checked: s.delivery.silent_push,
              onChange: i[1] || (i[1] = (r) => d.$emit("update", { silent_push: !s.delivery.silent_push }))
            }, null, 40, ya),
            i[3] || (i[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), ha = /* @__PURE__ */ ie(fa, [["__scopeId", "data-v-e0f5c559"]]);
function Te(s, d) {
  return !s || typeof s != "string" ? s : s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (i, r) => {
    const o = r.trim();
    return o in d ? String(d[o]) : `{{ ${r} }}`;
  });
}
const Ve = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], ka = { class: "kb-preview" }, _a = {
  key: 0,
  class: "kb-preview__toggle"
}, wa = { class: "kb-checkbox" }, $a = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, xa = { class: "kb-android-body" }, Ca = {
  key: 0,
  class: "kb-android-title"
}, Sa = {
  key: 1,
  class: "kb-android-text"
}, Ia = {
  key: 2,
  class: "kb-android-image"
}, Ua = ["src"], Ra = {
  key: 3,
  class: "kb-android-actions"
}, Aa = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, Ba = { class: "kb-ios-banner" }, La = { class: "kb-ios-content" }, Ta = {
  key: 0,
  class: "kb-ios-title"
}, Pa = {
  key: 1,
  class: "kb-ios-text"
}, Va = {
  key: 2,
  class: "kb-ios-actions"
}, Ea = {
  key: 0,
  class: "kb-ios-thumb"
}, Ma = ["src"], Oa = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, Na = { class: "kb-web-toast" }, Da = { class: "kb-web-body" }, za = {
  key: 0,
  class: "kb-web-title"
}, Ha = {
  key: 1,
  class: "kb-web-text"
}, Wa = {
  key: 2,
  class: "kb-web-image"
}, Fa = ["src"], ja = {
  key: 0,
  class: "kb-web-actions"
}, Ka = /* @__PURE__ */ le({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(s) {
    const d = s, i = J(!1), r = I(
      () => d.getPreview(d.selectedPlatform, {
        expanded: d.selectedPlatform === "android" ? i.value : void 0
      })
    ), o = I(() => {
      const m = r.value;
      return d.previewProfile ? {
        ...m,
        title: Te((m == null ? void 0 : m.title) ?? "", d.previewProfile.data),
        body: Te((m == null ? void 0 : m.body) ?? "", d.previewProfile.data)
      } : m;
    });
    return (m, v) => (a(), n("div", ka, [
      s.selectedPlatform === "android" ? (a(), n("div", _a, [
        e("label", wa, [
          Ie(e("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (p) => i.value = p),
            type: "checkbox"
          }, null, 512), [
            [_t, i.value]
          ]),
          v[1] || (v[1] = e("span", null, "Expanded notification", -1))
        ])
      ])) : w("", !0),
      s.selectedPlatform === "android" ? (a(), n("div", $a, [
        v[3] || (v[3] = e("div", { class: "kb-android-status-bar" }, [
          e("span", { class: "kb-android-time" }, "12:30"),
          e("span", { class: "kb-android-icons" }, "  ")
        ], -1)),
        e("div", {
          class: de(["kb-android-notification", { "kb-android-notification--expanded": i.value }])
        }, [
          v[2] || (v[2] = Oe('<div class="kb-android-header" data-v-539e2af6><div class="kb-android-app-icon" data-v-539e2af6>A</div><div class="kb-android-app-meta" data-v-539e2af6><div class="kb-android-app-name" data-v-539e2af6>Your App</div><div class="kb-android-app-channel" data-v-539e2af6>Promotions · now</div></div><div class="kb-android-more" data-v-539e2af6>⋮</div></div>', 1)),
          e("div", xa, [
            o.value.title ? (a(), n("div", Ca, h(o.value.title), 1)) : w("", !0),
            o.value.body ? (a(), n("div", Sa, h(o.value.body), 1)) : w("", !0),
            o.value.imageUrl ? (a(), n("div", Ia, [
              e("img", {
                src: o.value.imageUrl,
                alt: ""
              }, null, 8, Ua)
            ])) : w("", !0),
            o.value.actions && o.value.actions.length ? (a(), n("div", Ra, [
              (a(!0), n(H, null, K(o.value.actions, (p) => (a(), n("button", {
                key: p.id,
                type: "button",
                class: "kb-android-action-btn"
              }, h(p.label || "Action"), 1))), 128))
            ])) : w("", !0)
          ])
        ], 2)
      ])) : s.selectedPlatform === "ios" ? (a(), n("div", Aa, [
        v[6] || (v[6] = e("div", { class: "kb-ios-status-bar" }, [
          e("span", { class: "kb-ios-time" }, "9:41"),
          e("span", { class: "kb-ios-indicators" }, "•••")
        ], -1)),
        e("div", Ba, [
          v[5] || (v[5] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
          e("div", La, [
            v[4] || (v[4] = e("div", { class: "kb-ios-meta" }, [
              e("span", { class: "kb-ios-app-name" }, "Your App"),
              e("span", { class: "kb-ios-time-label" }, "now")
            ], -1)),
            o.value.title ? (a(), n("div", Ta, h(o.value.title), 1)) : w("", !0),
            o.value.body ? (a(), n("div", Pa, h(o.value.body), 1)) : w("", !0),
            o.value.actions && o.value.actions.length ? (a(), n("div", Va, [
              (a(!0), n(H, null, K(o.value.actions, (p) => (a(), n("button", {
                key: p.id,
                type: "button",
                class: "kb-ios-action-btn"
              }, h(p.label || "Action"), 1))), 128))
            ])) : w("", !0)
          ]),
          o.value.imageUrl ? (a(), n("div", Ea, [
            e("img", {
              src: o.value.imageUrl,
              alt: ""
            }, null, 8, Ma)
          ])) : w("", !0)
        ])
      ])) : (a(), n("div", Oa, [
        v[8] || (v[8] = Oe('<div class="kb-web-browser-chrome" data-v-539e2af6><span class="kb-web-dots" data-v-539e2af6><span data-v-539e2af6></span><span data-v-539e2af6></span><span data-v-539e2af6></span></span><div class="kb-web-url-bar" data-v-539e2af6><span class="kb-web-lock" data-v-539e2af6>🔒</span><span class="kb-web-origin" data-v-539e2af6>yourapp.com</span></div></div>', 1)),
        e("div", Na, [
          v[7] || (v[7] = Oe('<div class="kb-web-header" data-v-539e2af6><div class="kb-web-site-icon" data-v-539e2af6>Y</div><div class="kb-web-site-meta" data-v-539e2af6><div class="kb-web-site-name" data-v-539e2af6>yourapp.com</div><div class="kb-web-site-time" data-v-539e2af6>now</div></div></div>', 1)),
          e("div", Da, [
            o.value.title ? (a(), n("div", za, h(o.value.title), 1)) : w("", !0),
            o.value.body ? (a(), n("div", Ha, h(o.value.body), 1)) : w("", !0),
            o.value.imageUrl ? (a(), n("div", Wa, [
              e("img", {
                src: o.value.imageUrl,
                alt: ""
              }, null, 8, Fa)
            ])) : w("", !0)
          ]),
          o.value.actions && o.value.actions.length ? (a(), n("div", ja, [
            (a(!0), n(H, null, K(o.value.actions, (p, y) => (a(), n("button", {
              key: p.id || y,
              type: "button",
              class: de(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(y) > 0 }])
            }, h(p.label || "Action"), 3))), 128))
          ])) : w("", !0)
        ])
      ]))
    ]));
  }
}), qa = /* @__PURE__ */ ie(Ka, [["__scopeId", "data-v-539e2af6"]]), Ya = { class: "kb-version-dialog" }, Ja = {
  key: 0,
  class: "kb-version-empty"
}, Ga = {
  key: 1,
  class: "kb-version-list"
}, Qa = { class: "kb-version-item-label" }, Xa = ["onClick"], Za = { class: "kb-version-actions" }, en = /* @__PURE__ */ le({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(s, { emit: d }) {
    const i = d;
    function r(o) {
      try {
        return new Date(o).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return o;
      }
    }
    return (o, m) => s.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: m[1] || (m[1] = wt((v) => i("close"), ["escape"]))
    }, [
      e("div", Ya, [
        m[2] || (m[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        m[3] || (m[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        s.versions.length === 0 ? (a(), n("div", Ja, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", Ga, [
          (a(!0), n(H, null, K(s.versions, (v) => (a(), n("li", {
            key: v.id,
            class: "kb-version-item"
          }, [
            e("span", Qa, h(v.label || r(v.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (p) => {
                i("restore", v.snapshot), i("close");
              }
            }, " Restore ", 8, Xa)
          ]))), 128))
        ])),
        e("div", Za, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: m[0] || (m[0] = (v) => i("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : w("", !0);
  }
}), gt = /* @__PURE__ */ ie(en, [["__scopeId", "data-v-ce35a513"]]), nt = [
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
], lt = [
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
], it = [
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
], tn = { class: "keos-notification-builder" }, sn = { class: "kb-builder-top" }, an = { style: { margin: 0, paddingLeft: "1.25rem" } }, nn = { class: "kb-push-layout" }, ln = { class: "kb-push-sidebar" }, on = {
  key: 0,
  class: "kb-push-form"
}, rn = {
  key: 0,
  class: "kb-hint-card"
}, dn = { class: "kb-push-form-head" }, un = { class: "kb-push-form-head-row" }, cn = ["value"], pn = {
  key: 1,
  class: "kb-push-form"
}, mn = { class: "kb-push-canvas" }, vn = {
  key: 0,
  class: "kb-push-test-banner"
}, bn = { class: "kb-push-preview-chrome" }, gn = { class: "kb-push-preview-controls" }, yn = { class: "kb-push-preview-as" }, fn = ["value"], hn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, kn = ["aria-selected", "aria-controls", "onClick"], _n = { class: "kb-push-preview-frame" }, wn = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, $n = { class: "kb-push-actions" }, xn = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Cn = { class: "kb-confirm-dialog" }, Sn = { class: "kb-confirm-actions" }, In = /* @__PURE__ */ le({
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
    showDuplicate: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate", "save-version"],
  setup(s, { emit: d }) {
    const i = s, r = d, o = J("android"), m = J(""), v = J(!1), p = J(null), y = J(!1), L = I(() => R.value.workflow_status ?? "draft"), Y = I(() => {
      const _ = m.value;
      return _ ? Ve.find((g) => g.id === _) ?? null : null;
    });
    function N(_) {
      const g = R.value, C = _.campaign.message ? { ...g.message, ..._.campaign.message } : g.message, Z = _.campaign.delivery ? { ...g.delivery, ..._.campaign.delivery } : g.delivery;
      f({
        ..._.campaign,
        message: C,
        delivery: Z
      }), p.value = null, v.value = !1;
    }
    function $(_) {
      const g = _.target.value;
      if (!g) return;
      const C = nt.find((Z) => Z.id === g);
      C && (W.value ? (p.value = C, v.value = !0) : N(C), _.target.value = "");
    }
    function M(_) {
      R.value = _, y.value = !1;
    }
    const {
      campaign: R,
      dirty: W,
      getValidationWithWarnings: A,
      update: f,
      updateMessage: ee,
      updateDelivery: ce,
      undo: oe,
      redo: pe,
      canUndo: be,
      canRedo: _e,
      resetMessage: ke,
      resetDelivery: me,
      getPreview: U,
      characterLimits: se,
      hooks: ne
    } = Fe({
      initial: i.modelValue,
      hooks: i.hooks,
      onDirty: () => r("change", R.value)
    }), { lastSavedAt: S } = je(R, { channel: "push" });
    function fe(_) {
      (_.metaKey || _.ctrlKey) && _.key === "z" && (_.preventDefault(), _.shiftKey ? pe() : oe());
    }
    Ne(() => {
      window.addEventListener("keydown", fe);
    }), De(() => {
      window.removeEventListener("keydown", fe);
    }), ye(
      R,
      (_) => r("update:modelValue", _),
      { deep: !0 }
    );
    const we = J(), Ae = J(!0), Ue = J(!0);
    async function xe() {
      if (ne.estimateReach)
        try {
          we.value = await ne.estimateReach(R.value.audience);
        } catch {
          we.value = void 0;
        }
      ne.canSend && (Ae.value = await Promise.resolve(ne.canSend())), ne.canSchedule && (Ue.value = await Promise.resolve(ne.canSchedule()));
    }
    xe(), ye(() => R.value.audience, xe, { deep: !0 });
    const ge = I(() => A(we.value)), ve = I(() => ge.value.blockingErrors), Re = I(() => ge.value.warnings), T = I(() => ge.value.valid), O = I(() => se[o.value].title), q = I(() => se[o.value].body), ue = I(() => R.value.message.title.length), D = I(() => R.value.message.body.length), z = I(() => {
      if (ue.value > O.value) return `Title exceeds ${O.value} characters for ${o.value}.`;
    }), G = I(() => {
      const _ = ve.value.find((g) => g.message === "Message body is required");
      if (_) return _.message;
      if (D.value > q.value) return `Body exceeds ${q} characters for ${o.value}.`;
    }), Ce = I(() => R.value.template_type ?? "transactional");
    function F(_) {
      f({ template_type: _ });
    }
    function k(_) {
      f({
        name: _,
        tracking: { ...R.value.tracking ?? {}, campaign_name: _ }
      });
    }
    function P(_) {
      const g = ` {{ ${_.variable} }}`, C = R.value.message.variables_used ?? [], Z = Array.from(/* @__PURE__ */ new Set([...C, _.variable]));
      _.field === "title" ? ee({
        title: R.value.message.title + g,
        variables_used: Z
      }) : ee({
        body: R.value.message.body + g,
        variables_used: Z
      });
    }
    function x() {
      T.value && r("save", R.value);
    }
    return (_, g) => (a(), n("div", tn, [
      e("div", sn, [
        re(Ke, {
          "campaign-name": c(R).name,
          status: c(R).status,
          dirty: c(W),
          "last-saved-at": c(S),
          "can-undo": c(be),
          "can-redo": c(_e),
          "workflow-status": L.value,
          "onUpdate:campaignName": k,
          "onUpdate:workflowStatus": g[0] || (g[0] = (C) => c(f)({ workflow_status: C })),
          onUndo: c(oe),
          onRedo: c(pe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "onUndo", "onRedo"]),
        ve.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: te({ background: c(X).dangerBg, border: `1px solid ${c(X).dangerBorder}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px` })
        }, [
          e("ul", {
            style: te({ margin: 0, paddingLeft: "1.25rem", color: c(X).danger })
          }, [
            (a(!0), n(H, null, K(ve.value, (C) => (a(), n("li", {
              key: C.message
            }, h(C.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        Re.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: te({ background: c(X).neutral.bg, border: `1px solid ${c(X).neutral.border}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px`, fontSize: "0.875rem", color: c(X).neutral.textMuted })
        }, [
          e("strong", {
            style: te({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", an, [
            (a(!0), n(H, null, K(Re.value, (C) => (a(), n("li", {
              key: C.message
            }, h(C.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", nn, [
        e("aside", ln, [
          s.disabledSections.includes("message") ? w("", !0) : (a(), n("div", on, [
            !c(R).message.title && !c(R).message.body ? (a(), n("div", rn, " Add a title and message below to get started. ")) : w("", !0),
            e("div", dn, [
              g[13] || (g[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", un, [
                re(qe, {
                  "template-type": Ce.value,
                  onUpdate: F
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: $
                }, [
                  g[12] || (g[12] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(H, null, K(c(nt), (C) => (a(), n("option", {
                    key: C.id,
                    value: C.id
                  }, h(C.label), 9, cn))), 128))
                ], 32)
              ])
            ]),
            re(xs, {
              message: c(R).message,
              "title-count": ue.value,
              "body-count": D.value,
              "title-limit": O.value,
              "body-limit": q.value,
              "selected-platform": o.value,
              "show-reset": !0,
              "title-error": z.value,
              "body-error": G.value,
              onUpdate: c(ee),
              onReset: g[1] || (g[1] = (C) => c(ke)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            re(bt, {
              message: c(R).message,
              "variable-options": s.variableOptions,
              onUpdate: c(ee),
              onInsertVariable: P
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          s.disabledSections.includes("delivery") ? w("", !0) : (a(), n("div", pn, [
            g[14] || (g[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            re(ua, {
              delivery: c(R).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: c(ce),
              onReset: g[2] || (g[2] = (C) => c(me)())
            }, null, 8, ["delivery", "onUpdate"]),
            re(ha, {
              delivery: c(R).delivery,
              onUpdate: c(ce)
            }, null, 8, ["delivery", "onUpdate"])
          ]))
        ]),
        e("main", mn, [
          c(R).audience.test_mode ? (a(), n("div", vn, [...g[15] || (g[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            Q(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", bn, [
            e("div", gn, [
              e("label", yn, [
                g[17] || (g[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ie(e("select", {
                  "onUpdate:modelValue": g[3] || (g[3] = (C) => m.value = C),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  g[16] || (g[16] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(H, null, K(c(Ve), (C) => (a(), n("option", {
                    key: C.id,
                    value: C.id
                  }, h(C.label), 9, fn))), 128))
                ], 512), [
                  [Me, m.value]
                ])
              ])
            ]),
            e("div", hn, [
              (a(), n(H, null, K(["android", "ios", "web"], (C) => e("button", {
                key: C,
                type: "button",
                class: de(["kb-push-device-btn", { "kb-push-device-btn--active": o.value === C }]),
                role: "tab",
                "aria-selected": o.value === C,
                "aria-controls": `kb-preview-panel-${C}`,
                onClick: (Z) => o.value = C
              }, h(C.toUpperCase()), 11, kn)), 64))
            ]),
            e("div", _n, [
              !c(R).message.title && !c(R).message.body ? (a(), n("div", wn, [...g[18] || (g[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, "Start adding content to see a live preview here.", -1)
              ])])) : (a(), $t(qa, {
                key: 1,
                "get-preview": c(U),
                "selected-platform": o.value,
                "preview-profile": Y.value,
                "onUpdate:selectedPlatform": g[4] || (g[4] = (C) => o.value = C)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", $n, [
        s.showHistory ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: g[5] || (g[5] = (C) => y.value = !0)
        }, " Version history ")) : w("", !0),
        s.showSaveVersion ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: g[6] || (g[6] = (C) => r("save-version", JSON.parse(JSON.stringify(c(R)))))
        }, " Save as version ")) : w("", !0),
        s.showDuplicate ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: g[7] || (g[7] = (C) => r("duplicate", JSON.parse(JSON.stringify(c(R)))))
        }, " Duplicate ")) : w("", !0),
        s.showSave ? (a(), n("button", {
          key: 3,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: x
        }, " Save ")) : w("", !0),
        s.showClose ? (a(), n("button", {
          key: 4,
          type: "button",
          class: "kb-push-action kb-push-action--primary",
          onClick: g[8] || (g[8] = (C) => r("edit"))
        }, " Close ")) : w("", !0)
      ]),
      v.value ? (a(), n("div", xn, [
        e("div", Cn, [
          g[19] || (g[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          g[20] || (g[20] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Sn, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: g[9] || (g[9] = (C) => {
                v.value = !1, p.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: g[10] || (g[10] = (C) => p.value && N(p.value))
            }, "Replace")
          ])
        ])
      ])) : w("", !0),
      re(gt, {
        open: y.value,
        versions: s.versions,
        onClose: g[11] || (g[11] = (C) => y.value = !1),
        onRestore: M
      }, null, 8, ["open", "versions"])
    ]));
  }
}), yt = /* @__PURE__ */ ie(In, [["__scopeId", "data-v-6bf350ed"]]), Un = { class: "kb-section" }, Rn = { class: "kb-section__head" }, An = { class: "kb-field" }, Bn = ["value"], Ln = { class: "kb-field" }, Tn = ["value"], Pn = {
  key: 0,
  class: "kb-field"
}, Vn = ["value"], En = {
  key: 1,
  class: "kb-field"
}, Mn = ["value"], On = {
  key: 2,
  class: "kb-field kb-field--inline"
}, Nn = { class: "kb-location-row" }, Dn = ["value"], zn = ["value"], Hn = ["value"], Wn = ["value"], Fn = {
  key: 3,
  class: "kb-field"
}, jn = ["value"], Kn = {
  key: 4,
  class: "kb-field"
}, qn = ["value"], Yn = {
  key: 5,
  class: "kb-field"
}, Jn = { class: "kb-wa-buttons" }, Gn = ["value", "onInput"], Qn = ["value", "onInput"], Xn = ["onClick"], Zn = {
  key: 6,
  class: "kb-field"
}, el = ["value"], tl = ["value"], sl = { class: "kb-field" }, al = ["value"], nl = { class: "kb-field" }, ll = ["value"], ol = {
  key: 7,
  class: "kb-field kb-wa-template-fields"
}, il = { class: "kb-wa-fields-list" }, rl = { class: "kb-wa-field-name" }, dl = { class: "kb-wa-field-status" }, ul = { class: "kb-field" }, cl = ["value"], pl = { class: "kb-field" }, ml = { class: "kb-wa-buttons" }, vl = ["value", "onInput"], bl = ["value", "onChange"], gl = ["value", "onInput"], yl = ["value", "onInput"], fl = ["onClick"], hl = ["disabled"], kl = /* @__PURE__ */ le({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: d }) {
    const i = s, r = d;
    function o(v) {
      if (!v || typeof v != "string") return [];
      const p = /\{\{\s*([^}]+?)\s*\}\}/g, y = /* @__PURE__ */ new Set();
      let L;
      for (; (L = p.exec(v)) !== null; ) y.add(L[1].trim());
      return Array.from(y);
    }
    const m = I(() => {
      const v = i.message.whatsapp_header ?? "", p = i.message.whatsapp_body ?? i.message.body ?? "", y = new Set(i.message.variables_used ?? []), L = [...o(v), ...o(p)];
      return Array.from(new Set(L)).map((N) => ({ name: N, configured: y.has(N) }));
    });
    return (v, p) => {
      var y, L, Y, N;
      return a(), n("section", Un, [
        e("div", Rn, [
          p[18] || (p[18] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = ($) => v.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        p[37] || (p[37] = e("p", { class: "kb-section__desc" }, " Configure how this campaign will look when sent as a WhatsApp template message. ", -1)),
        e("div", An, [
          p[20] || (p[20] = e("label", { class: "kb-label" }, [
            Q(" Template type "),
            e("span", { class: "kb-helper" }, "Match the content type approved in WhatsApp (text, media, coupon, offer, catalog, etc.).")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.message.whatsapp_template_type ?? "text",
            onChange: p[1] || (p[1] = ($) => r("update", {
              whatsapp_template_type: $.target.value
            }))
          }, [...p[19] || (p[19] = [
            Oe('<option value="text" data-v-03de154f>Text</option><option value="image" data-v-03de154f>Image</option><option value="video" data-v-03de154f>Video</option><option value="document" data-v-03de154f>Document</option><option value="location" data-v-03de154f>Location</option><option value="coupon" data-v-03de154f>Coupon code</option><option value="lto" data-v-03de154f>Limited time offer</option><option value="mpm" data-v-03de154f>Multi product message</option><option value="catalog" data-v-03de154f>Catalog</option><option value="auth" data-v-03de154f>Authentication</option>', 10)
          ])], 40, Bn)
        ]),
        e("div", Ln, [
          p[21] || (p[21] = e("label", { class: "kb-label" }, [
            Q(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: i.message.whatsapp_template_name ?? "",
            onInput: p[2] || (p[2] = ($) => r("update", {
              whatsapp_template_name: $.target.value || void 0
            }))
          }, null, 40, Tn)
        ]),
        ["image", "video", "document"].includes(i.message.whatsapp_template_type ?? "text") ? (a(), n("div", Pn, [
          p[22] || (p[22] = e("label", { class: "kb-label" }, [
            Q(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.message.whatsapp_media_url ?? "",
            onInput: p[3] || (p[3] = ($) => r("update", {
              whatsapp_media_url: $.target.value || void 0
            }))
          }, null, 40, Vn)
        ])) : w("", !0),
        ["image", "video", "document"].includes(i.message.whatsapp_template_type ?? "text") ? (a(), n("div", En, [
          p[23] || (p[23] = e("label", { class: "kb-label" }, [
            Q(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: i.message.whatsapp_media_caption ?? "",
            onInput: p[4] || (p[4] = ($) => r("update", {
              whatsapp_media_caption: $.target.value || void 0
            }))
          }, null, 40, Mn)
        ])) : w("", !0),
        i.message.whatsapp_template_type === "location" ? (a(), n("div", On, [
          p[24] || (p[24] = e("label", { class: "kb-label" }, [
            Q(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", Nn, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((y = i.message.whatsapp_location) == null ? void 0 : y.lat) ?? "",
              onInput: p[5] || (p[5] = ($) => {
                const M = { ...i.message.whatsapp_location ?? {} };
                M.lat = Number($.target.value), r("update", { whatsapp_location: M });
              })
            }, null, 40, Dn),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((L = i.message.whatsapp_location) == null ? void 0 : L.lon) ?? "",
              onInput: p[6] || (p[6] = ($) => {
                const M = { ...i.message.whatsapp_location ?? {} };
                M.lon = Number($.target.value), r("update", { whatsapp_location: M });
              })
            }, null, 40, zn)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((Y = i.message.whatsapp_location) == null ? void 0 : Y.name) ?? "",
            onInput: p[7] || (p[7] = ($) => {
              const M = { ...i.message.whatsapp_location ?? {} };
              M.name = $.target.value || void 0, r("update", { whatsapp_location: M });
            })
          }, null, 40, Hn),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((N = i.message.whatsapp_location) == null ? void 0 : N.address) ?? "",
            onInput: p[8] || (p[8] = ($) => {
              const M = { ...i.message.whatsapp_location ?? {} };
              M.address = $.target.value || void 0, r("update", { whatsapp_location: M });
            })
          }, null, 40, Wn)
        ])) : w("", !0),
        i.message.whatsapp_template_type === "coupon" ? (a(), n("div", Fn, [
          p[25] || (p[25] = e("label", { class: "kb-label" }, [
            Q(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: i.message.whatsapp_coupon_code ?? "",
            onInput: p[9] || (p[9] = ($) => r("update", {
              whatsapp_coupon_code: $.target.value || void 0
            }))
          }, null, 40, jn)
        ])) : w("", !0),
        i.message.whatsapp_template_type === "lto" ? (a(), n("div", Kn, [
          p[26] || (p[26] = e("label", { class: "kb-label" }, [
            Q(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: i.message.whatsapp_lto_expiry ?? "",
            onInput: p[10] || (p[10] = ($) => r("update", {
              whatsapp_lto_expiry: $.target.value || void 0
            }))
          }, null, 40, qn)
        ])) : w("", !0),
        ["mpm", "catalog"].includes(i.message.whatsapp_template_type) ? (a(), n("div", Yn, [
          p[27] || (p[27] = e("label", { class: "kb-label" }, [
            Q(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", Jn, [
            (a(!0), n(H, null, K(i.message.whatsapp_products ?? [], ($, M) => (a(), n("div", {
              key: $.id || M,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: $.productId,
                onInput: (R) => {
                  var f;
                  const W = [...i.message.whatsapp_products ?? []], A = Number(M);
                  W[A] = {
                    ...W[A],
                    id: ((f = W[A]) == null ? void 0 : f.id) || `prod_${A + 1}`,
                    productId: R.target.value
                  }, r("update", { whatsapp_products: W });
                }
              }, null, 40, Gn),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: $.sectionTitle,
                onInput: (R) => {
                  var f;
                  const W = [...i.message.whatsapp_products ?? []], A = Number(M);
                  W[A] = {
                    ...W[A],
                    id: ((f = W[A]) == null ? void 0 : f.id) || `prod_${A + 1}`,
                    sectionTitle: R.target.value || void 0
                  }, r("update", { whatsapp_products: W });
                }
              }, null, 40, Qn),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const R = [...i.message.whatsapp_products ?? []];
                  R.splice(Number(M), 1), r("update", { whatsapp_products: R });
                }
              }, " Remove ", 8, Xn)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: p[11] || (p[11] = () => {
                const M = [...i.message.whatsapp_products ?? []];
                M.push({
                  id: `prod_${M.length + 1}`,
                  productId: ""
                }), r("update", { whatsapp_products: M });
              })
            }, " Add product ")
          ])
        ])) : w("", !0),
        i.message.whatsapp_template_type === "auth" ? (a(), n("div", Zn, [
          p[29] || (p[29] = e("label", { class: "kb-label" }, [
            Q(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.message.whatsapp_auth_type ?? "otp",
            onChange: p[12] || (p[12] = ($) => r("update", {
              whatsapp_auth_type: $.target.value
            }))
          }, [...p[28] || (p[28] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, el),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: i.message.whatsapp_auth_label ?? "",
            onInput: p[13] || (p[13] = ($) => r("update", {
              whatsapp_auth_label: $.target.value || void 0
            }))
          }, null, 40, tl)
        ])) : w("", !0),
        e("div", sl, [
          p[30] || (p[30] = e("label", { class: "kb-label" }, [
            Q(" Header (optional) "),
            e("span", { class: "kb-helper" }, "Short text or variable used as the WhatsApp template header.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: i.message.whatsapp_header ?? "",
            onInput: p[14] || (p[14] = ($) => r("update", {
              whatsapp_header: $.target.value || void 0
            }))
          }, null, 40, al)
        ]),
        e("div", nl, [
          p[31] || (p[31] = e("label", { class: "kb-label" }, [
            Q(" Body "),
            e("span", { class: "kb-helper" }, " Use the exact template body including variables like " + h(1) + ", " + h(2) + " as approved in WhatsApp. ")
          ], -1)),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: i.message.whatsapp_body ?? "",
            onInput: p[15] || (p[15] = ($) => r("update", {
              whatsapp_body: $.target.value || void 0
            }))
          }, null, 40, ll)
        ]),
        m.value.length > 0 ? (a(), n("div", ol, [
          p[32] || (p[32] = e("label", { class: "kb-label" }, "Template fields", -1)),
          p[33] || (p[33] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", il, [
            (a(!0), n(H, null, K(m.value, ($) => (a(), n("li", {
              key: $.name,
              class: de(["kb-wa-field-item", { "kb-wa-field-item--ok": $.configured }])
            }, [
              e("span", rl, h($.name), 1),
              e("span", dl, h($.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : w("", !0),
        e("div", ul, [
          p[34] || (p[34] = e("label", { class: "kb-label" }, [
            Q(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: i.message.whatsapp_footer ?? "",
            onInput: p[16] || (p[16] = ($) => r("update", {
              whatsapp_footer: $.target.value || void 0
            }))
          }, null, 40, cl)
        ]),
        e("div", pl, [
          p[36] || (p[36] = e("label", { class: "kb-label" }, [
            Q(" Buttons (optional) "),
            e("span", { class: "kb-helper" }, " Add quick replies or call-to-action buttons. Order should match your provider configuration. ")
          ], -1)),
          e("div", ml, [
            (a(!0), n(H, null, K(i.message.whatsapp_buttons ?? [], ($, M) => (a(), n("div", {
              key: $.id || M,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: $.label,
                onInput: (R) => {
                  var f;
                  const W = [...i.message.whatsapp_buttons ?? []], A = Number(M);
                  W[A] = {
                    ...W[A],
                    id: ((f = W[A]) == null ? void 0 : f.id) || `btn_${A + 1}`,
                    label: R.target.value
                  }, r("update", { whatsapp_buttons: W });
                }
              }, null, 40, vl),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: $.type ?? "quick_reply",
                onChange: (R) => {
                  var f;
                  const W = [...i.message.whatsapp_buttons ?? []], A = Number(M);
                  W[A] = {
                    ...W[A],
                    id: ((f = W[A]) == null ? void 0 : f.id) || `btn_${A + 1}`,
                    type: R.target.value
                  }, r("update", { whatsapp_buttons: W });
                }
              }, [...p[35] || (p[35] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1)
              ])], 40, bl),
              $.type === "url" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: $.url,
                onInput: (R) => {
                  var f;
                  const W = [...i.message.whatsapp_buttons ?? []], A = Number(M);
                  W[A] = {
                    ...W[A],
                    id: ((f = W[A]) == null ? void 0 : f.id) || `btn_${A + 1}`,
                    url: R.target.value || void 0
                  }, r("update", { whatsapp_buttons: W });
                }
              }, null, 40, gl)) : $.type === "call" ? (a(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: $.phone,
                onInput: (R) => {
                  var f;
                  const W = [...i.message.whatsapp_buttons ?? []], A = Number(M);
                  W[A] = {
                    ...W[A],
                    id: ((f = W[A]) == null ? void 0 : f.id) || `btn_${A + 1}`,
                    phone: R.target.value || void 0
                  }, r("update", { whatsapp_buttons: W });
                }
              }, null, 40, yl)) : w("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const R = [...i.message.whatsapp_buttons ?? []];
                  R.splice(Number(M), 1), r("update", { whatsapp_buttons: R });
                }
              }, " Remove ", 8, fl)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: (i.message.whatsapp_buttons ?? []).length >= 3,
              onClick: p[17] || (p[17] = () => {
                const M = [...i.message.whatsapp_buttons ?? []];
                M.push({
                  id: `btn_${M.length + 1}`,
                  label: "",
                  type: "quick_reply"
                }), r("update", { whatsapp_buttons: M });
              })
            }, " Add button ", 8, hl)
          ])
        ])
      ]);
    };
  }
}), _l = /* @__PURE__ */ ie(kl, [["__scopeId", "data-v-03de154f"]]), wl = { class: "phone-theme-toggle" }, $l = { class: "chat-area" }, xl = { class: "bubble" }, Cl = {
  key: 0,
  class: "header"
}, Sl = {
  key: 0,
  class: "header-text"
}, Il = ["src"], Ul = ["src"], Rl = {
  key: 3,
  class: "document"
}, Al = ["innerHTML"], Bl = {
  key: 1,
  class: "location-card"
}, Ll = ["src"], Tl = { class: "location-info" }, Pl = {
  key: 2,
  class: "catalog-card"
}, Vl = { class: "catalog-header" }, El = { class: "catalog-title" }, Ml = {
  key: 3,
  class: "multi-products"
}, Ol = ["src"], Nl = { class: "product-info" }, Dl = { class: "title" }, zl = { class: "price" }, Hl = {
  key: 4,
  class: "coupon"
}, Wl = { class: "coupon-code" }, Fl = {
  key: 5,
  class: "offer"
}, jl = {
  key: 6,
  class: "auth"
}, Kl = { class: "auth-code" }, ql = {
  key: 7,
  class: "footer"
}, Yl = {
  key: 8,
  class: "buttons"
}, Jl = /* @__PURE__ */ le({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(s) {
    const d = s, i = J("light"), r = I(() => i.value === "dark");
    function o(p) {
      return String(p).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = I(() => {
      var L;
      const p = ((L = d.template) == null ? void 0 : L.body) ?? "";
      return o(p).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), v = I(() => {
      const p = d.template.location;
      if (!p) return "";
      const { lat: y, lng: L } = p;
      return y == null || L == null ? "" : `https://maps.googleapis.com/maps/api/staticmap?center=${y},${L}&zoom=15&size=600x300&markers=${y},${L}`;
    });
    return (p, y) => {
      var L, Y;
      return a(), n("div", {
        class: de(["wa-wrapper", { "wa-wrapper--dark": r.value }])
      }, [
        e("div", {
          class: de(["phone", { "phone--dark": r.value }])
        }, [
          e("div", wl, [
            e("button", {
              type: "button",
              class: de(["phone-theme-btn", { "phone-theme-btn--active": !r.value }]),
              onClick: y[0] || (y[0] = (N) => i.value = "light")
            }, " Light ", 2),
            e("button", {
              type: "button",
              class: de(["phone-theme-btn", { "phone-theme-btn--active": r.value }]),
              onClick: y[1] || (y[1] = (N) => i.value = "dark")
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
          e("div", $l, [
            e("div", xl, [
              s.template.header ? (a(), n("div", Cl, [
                s.template.header.type === "text" ? (a(), n("div", Sl, h(s.template.header.text), 1)) : s.template.header.type === "image" ? (a(), n("img", {
                  key: 1,
                  src: s.template.header.url,
                  class: "media",
                  alt: ""
                }, null, 8, Il)) : s.template.header.type === "video" ? (a(), n("video", {
                  key: 2,
                  src: s.template.header.url,
                  controls: "",
                  class: "media"
                }, null, 8, Ul)) : s.template.header.type === "document" ? (a(), n("div", Rl, " 📄 " + h(s.template.header.filename), 1)) : w("", !0)
              ])) : w("", !0),
              e("div", {
                class: "body",
                innerHTML: m.value
              }, null, 8, Al),
              s.template.location ? (a(), n("div", Bl, [
                v.value ? (a(), n("img", {
                  key: 0,
                  src: v.value,
                  class: "map",
                  alt: ""
                }, null, 8, Ll)) : w("", !0),
                e("div", Tl, [
                  e("strong", null, h(s.template.location.name), 1),
                  e("div", null, h(s.template.location.address), 1)
                ])
              ])) : w("", !0),
              s.template.catalog ? (a(), n("div", Pl, [
                e("div", Vl, [
                  y[2] || (y[2] = Q(" 🛍 ", -1)),
                  e("span", El, h(typeof s.template.catalog == "object" && s.template.catalog.label ? s.template.catalog.label : "Full catalog"), 1)
                ]),
                y[3] || (y[3] = e("div", { class: "catalog-sub" }, "Browse all items", -1)),
                y[4] || (y[4] = e("div", { class: "catalog-cta" }, "VIEW CATALOG", -1))
              ])) : w("", !0),
              (L = s.template.multiProduct) != null && L.length ? (a(), n("div", Ml, [
                (a(!0), n(H, null, K(s.template.multiProduct, (N, $) => (a(), n("div", {
                  key: $,
                  class: "product"
                }, [
                  N.image ? (a(), n("img", {
                    key: 0,
                    src: N.image,
                    alt: ""
                  }, null, 8, Ol)) : w("", !0),
                  e("div", Nl, [
                    e("div", Dl, h(N.name), 1),
                    e("div", zl, h(N.price), 1)
                  ])
                ]))), 128))
              ])) : w("", !0),
              s.template.coupon ? (a(), n("div", Hl, [
                y[6] || (y[6] = e("div", { class: "coupon-discount" }, "Special offer", -1)),
                e("div", Wl, [
                  y[5] || (y[5] = Q(" Code: ", -1)),
                  e("span", null, h(s.template.coupon.code), 1)
                ]),
                y[7] || (y[7] = e("div", { class: "coupon-cta" }, "COPY CODE", -1))
              ])) : w("", !0),
              s.template.limitedOffer ? (a(), n("div", Fl, " ⏳ Offer expires " + h(s.template.limitedOffer), 1)) : w("", !0),
              s.template.auth ? (a(), n("div", jl, [
                y[8] || (y[8] = e("div", { class: "auth-icon" }, "🔐", -1)),
                y[9] || (y[9] = e("div", { class: "auth-title" }, "Confirm your phone number", -1)),
                e("div", Kl, h(s.template.auth.code), 1),
                y[10] || (y[10] = e("button", {
                  type: "button",
                  class: "auth-btn"
                }, "CONTINUE", -1))
              ])) : w("", !0),
              s.template.footer ? (a(), n("div", ql, h(s.template.footer), 1)) : w("", !0),
              (Y = s.template.buttons) != null && Y.length ? (a(), n("div", Yl, [
                (a(!0), n(H, null, K(s.template.buttons, (N, $) => (a(), n("button", {
                  key: $,
                  type: "button",
                  class: "button"
                }, h(N.text), 1))), 128))
              ])) : w("", !0),
              y[11] || (y[11] = e("div", { class: "time" }, " 12:45 ✓✓ ", -1))
            ])
          ])
        ], 2)
      ], 2);
    };
  }
}), Gl = /* @__PURE__ */ ie(Jl, [["__scopeId", "data-v-76cc6100"]]), Ql = { class: "keos-whatsapp-builder" }, Xl = { class: "kb-builder-top" }, Zl = { style: { margin: 0, paddingLeft: "1.25rem" } }, eo = { class: "kb-wa-layout" }, to = { class: "kb-wa-sidebar" }, so = {
  key: 0,
  class: "kb-wa-form"
}, ao = { class: "kb-wa-form-head" }, no = { class: "kb-wa-form-head-row" }, lo = ["value"], oo = { class: "kb-wa-canvas" }, io = {
  key: 0,
  class: "kb-wa-test-banner"
}, ro = { class: "kb-wa-preview-chrome" }, uo = { class: "kb-push-preview-controls" }, co = { class: "kb-push-preview-as" }, po = ["value"], mo = { class: "kb-wa-preview-frame" }, vo = { class: "kb-wa-actions" }, bo = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, go = { class: "kb-confirm-dialog" }, yo = { class: "kb-confirm-actions" }, fo = /* @__PURE__ */ le({
  __name: "KeosWhatsAppBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(s, { emit: d }) {
    const i = s, r = d, {
      campaign: o,
      dirty: m,
      getValidationWithWarnings: v,
      update: p,
      updateMessage: y,
      undo: L,
      redo: Y,
      canUndo: N,
      canRedo: $,
      resetMessage: M,
      hooks: R
    } = Fe({
      initial: i.modelValue,
      hooks: i.hooks,
      onDirty: () => r("change", o.value)
    }), { lastSavedAt: W } = je(o, { channel: "whatsapp" });
    function A(T) {
      (T.metaKey || T.ctrlKey) && T.key === "z" && (T.preventDefault(), T.shiftKey ? Y() : L());
    }
    Ne(() => {
      window.addEventListener("keydown", A);
    }), De(() => {
      window.removeEventListener("keydown", A);
    }), ye(
      o,
      (T) => r("update:modelValue", T),
      { deep: !0 }
    );
    const f = J(), ee = J(!0);
    async function ce() {
      if (R.estimateReach)
        try {
          f.value = await R.estimateReach(o.value.audience);
        } catch {
          f.value = void 0;
        }
      R.canSend && (ee.value = await Promise.resolve(R.canSend()));
    }
    ce(), ye(() => o.value.audience, ce, { deep: !0 });
    const oe = I(() => v(f.value)), pe = I(() => oe.value.blockingErrors), be = I(() => oe.value.warnings), _e = I(() => oe.value.valid), ke = J(""), me = J(!1), U = J(null), se = I(() => {
      const T = ke.value;
      return T ? Ve.find((O) => O.id === T) ?? null : null;
    }), ne = I(() => {
      const T = o.value.message.whatsapp_body ?? o.value.message.body ?? "";
      return se.value ? Te(T, se.value.data) : T;
    }), S = I(() => {
      const T = o.value.message.whatsapp_header ?? "";
      return se.value ? Te(T, se.value.data) : T;
    }), fe = I(() => {
      const T = o.value.message, O = T.whatsapp_template_type ?? "text";
      let q, ue, D, z, G, Ce, F;
      O === "image" && T.whatsapp_media_url ? q = { type: "image", url: T.whatsapp_media_url } : O === "video" && T.whatsapp_media_url ? q = { type: "video", url: T.whatsapp_media_url } : O === "document" && T.whatsapp_document_filename ? q = { type: "document", filename: T.whatsapp_document_filename } : T.whatsapp_header && (q = { type: "text", text: S.value });
      const k = ne.value || "Start adding content to see a live preview here.";
      if (O === "location" && T.whatsapp_location) {
        const x = T.whatsapp_location, _ = x.lat ?? x.latitude, g = x.lng ?? x.lon ?? x.longitude;
        _ != null && g != null && (ue = {
          lat: _,
          lng: g,
          name: x.name ?? x.title,
          address: x.address ?? `${_}, ${g}`
        });
      }
      (O === "catalog" || O === "mpm") && Array.isArray(T.whatsapp_products) && T.whatsapp_products.length && (D = !0, z = T.whatsapp_products.map((x) => ({
        image: x.image ?? x.imageUrl,
        name: x.name ?? x.sectionTitle ?? x.title ?? "Product",
        price: x.price ?? x.productId ?? ""
      }))), O === "coupon" && T.whatsapp_coupon_code && (G = { code: T.whatsapp_coupon_code }), O === "lto" && T.whatsapp_lto_expiry && (Ce = T.whatsapp_lto_expiry), O === "auth" && (F = { code: T.whatsapp_auth_code ?? T.whatsapp_otp_code ?? "123 456" });
      const P = T.whatsapp_buttons ?? [];
      return {
        header: q,
        body: k,
        footer: T.whatsapp_footer || void 0,
        buttons: P.map((x) => ({ text: x.label || "Button" })),
        location: ue,
        catalog: D,
        multiProduct: z,
        coupon: G,
        limitedOffer: Ce,
        auth: F
      };
    });
    function we(T) {
      const O = o.value, q = T.campaign.message ? { ...O.message, ...T.campaign.message } : O.message;
      p({
        ...T.campaign,
        message: q
      }), U.value = null, me.value = !1;
    }
    function Ae(T) {
      const O = T.target.value;
      if (!O) return;
      const q = lt.find((ue) => ue.id === O);
      q && (m.value ? (U.value = q, me.value = !0) : we(q), T.target.value = "");
    }
    const Ue = I(() => o.value.template_type ?? "transactional");
    function xe(T) {
      p({ template_type: T });
    }
    function ge(T) {
      p({
        name: T,
        tracking: { ...o.value.tracking ?? {}, campaign_name: T }
      });
    }
    function ve(T) {
      const O = ` {{ ${T.variable} }}`, q = o.value.message.variables_used ?? [], ue = Array.from(/* @__PURE__ */ new Set([...q, T.variable]));
      if (T.field === "title") {
        const D = o.value.message.whatsapp_header ?? "";
        y(
          {
            variables_used: ue
          }
        ), o.value.message.whatsapp_header = D + O;
      } else {
        const D = o.value.message.whatsapp_body ?? "";
        y(
          {
            variables_used: ue
          }
        ), o.value.message.whatsapp_body = D + O;
      }
    }
    function Re() {
      _e.value && r("save", o.value);
    }
    return (T, O) => (a(), n("div", Ql, [
      e("div", Xl, [
        re(Ke, {
          "campaign-name": c(o).name,
          status: c(o).status,
          dirty: c(m),
          "last-saved-at": c(W),
          "can-undo": c(N),
          "can-redo": c($),
          "onUpdate:campaignName": ge,
          onUndo: c(L),
          onRedo: c(Y)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: te({ background: c(X).dangerBg, border: `1px solid ${c(X).dangerBorder}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px` })
        }, [
          e("ul", {
            style: te({ margin: 0, paddingLeft: "1.25rem", color: c(X).danger })
          }, [
            (a(!0), n(H, null, K(pe.value, (q) => (a(), n("li", {
              key: q.message
            }, h(q.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        be.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: te({ background: c(X).neutral.bg, border: `1px solid ${c(X).neutral.border}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px`, fontSize: "0.875rem", color: c(X).neutral.textMuted })
        }, [
          e("strong", {
            style: te({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", Zl, [
            (a(!0), n(H, null, K(be.value, (q) => (a(), n("li", {
              key: q.message
            }, h(q.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", eo, [
        e("aside", to, [
          s.disabledSections.includes("whatsapp") ? w("", !0) : (a(), n("div", so, [
            e("div", ao, [
              O[7] || (O[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", no, [
                re(qe, {
                  "template-type": Ue.value,
                  onUpdate: xe
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Ae
                }, [
                  O[6] || (O[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(H, null, K(c(lt), (q) => (a(), n("option", {
                    key: q.id,
                    value: q.id
                  }, h(q.label), 9, lo))), 128))
                ], 32)
              ])
            ]),
            re(_l, {
              message: c(o).message,
              "show-reset": !0,
              onUpdate: c(y),
              onReset: O[0] || (O[0] = (q) => c(M)())
            }, null, 8, ["message", "onUpdate"]),
            re(bt, {
              message: c(o).message,
              "variable-options": s.variableOptions,
              onUpdate: c(y),
              onInsertVariable: ve
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", oo, [
          c(o).audience.test_mode ? (a(), n("div", io, [...O[8] || (O[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            Q(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", ro, [
            e("div", uo, [
              e("label", co, [
                O[10] || (O[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ie(e("select", {
                  "onUpdate:modelValue": O[1] || (O[1] = (q) => ke.value = q),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  O[9] || (O[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(H, null, K(c(Ve), (q) => (a(), n("option", {
                    key: q.id,
                    value: q.id
                  }, h(q.label), 9, po))), 128))
                ], 512), [
                  [Me, ke.value]
                ])
              ])
            ]),
            e("div", mo, [
              re(Gl, { template: fe.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", vo, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: O[2] || (O[2] = (q) => r("duplicate", JSON.parse(JSON.stringify(c(o)))))
        }, " Duplicate ")) : w("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: Re
        }, " Save ")) : w("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-wa-action kb-wa-action--primary",
          onClick: O[3] || (O[3] = (q) => r("edit"))
        }, " Close ")) : w("", !0)
      ]),
      me.value ? (a(), n("div", bo, [
        e("div", go, [
          O[11] || (O[11] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          O[12] || (O[12] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", yo, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: O[4] || (O[4] = (q) => {
                me.value = !1, U.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: O[5] || (O[5] = (q) => U.value && we(U.value))
            }, "Replace")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ ie(fo, [["__scopeId", "data-v-e9335c88"]]), ho = { class: "kb-section" }, ko = { class: "kb-section__head" }, _o = { class: "kb-field" }, wo = ["value"], $o = { class: "kb-field" }, xo = { class: "kb-label" }, Co = { key: 0 }, So = { key: 1 }, Io = { key: 2 }, Uo = ["value"], Ro = {
  key: 0,
  class: "kb-truncation-hint"
}, Ao = { class: "kb-field" }, Bo = { class: "kb-insert-row" }, Lo = ["value"], To = { class: "kb-field" }, Po = { class: "kb-insert-row" }, Vo = /* @__PURE__ */ le({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: d }) {
    const i = s, r = d, o = ["first_name", "last_name", "order_id", "city"], m = J(i.variableOptions && i.variableOptions.length ? [...i.variableOptions] : o), v = J(m.value[0] ?? o[0]), p = J("");
    ye(
      () => i.variableOptions,
      (A) => {
        A && A.length && (m.value = [...A], m.value.includes(v.value) || (v.value = m.value[0]));
      }
    );
    const y = I(() => i.message.sms_body ?? ""), L = I(() => y.value.length), Y = I(() => L.value ? L.value <= 160 ? 1 : Math.ceil(L.value / 153) : 0), N = I(() => {
      const A = L.value;
      return A <= 160 ? null : A <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function $(A) {
      const f = A.target.value;
      r("update", {
        sms_sender_id: f || void 0
      });
    }
    function M(A) {
      const f = A.target.value;
      r("update", {
        sms_body: f
      });
    }
    function R() {
      const A = v.value;
      if (!A) return;
      const f = ` {{ ${A} }}`, ee = y.value || "", ce = i.message.variables_used ?? [], oe = Array.from(/* @__PURE__ */ new Set([...ce, A]));
      r("update", {
        sms_body: ee + f,
        variables_used: oe
      });
    }
    function W() {
      const A = p.value.trim();
      A && (m.value.includes(A) || (m.value = [...m.value, A]), v.value = A, p.value = "");
    }
    return (A, f) => (a(), n("section", ho, [
      e("div", ko, [
        f[3] || (f[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        s.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: f[0] || (f[0] = (ee) => A.$emit("reset"))
        }, " Reset section ")) : w("", !0)
      ]),
      f[10] || (f[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", _o, [
        f[4] || (f[4] = e("label", { class: "kb-label" }, [
          Q(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: i.message.sms_sender_id ?? "",
          onInput: $
        }, null, 40, wo)
      ]),
      e("div", $o, [
        e("label", xo, [
          f[5] || (f[5] = Q(" Message body ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": Y.value > 3 }])
          }, [
            Q(h(L.value) + " chars · ", 1),
            Y.value === 0 ? (a(), n("span", Co, "0 segments")) : Y.value === 1 ? (a(), n("span", So, "1 segment")) : (a(), n("span", Io, h(Y.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: y.value,
          onInput: M
        }, null, 40, Uo),
        f[6] || (f[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        N.value ? (a(), n("p", Ro, h(N.value), 1)) : w("", !0)
      ]),
      e("div", Ao, [
        f[7] || (f[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Bo, [
          Ie(e("select", {
            "onUpdate:modelValue": f[1] || (f[1] = (ee) => v.value = ee),
            class: "kb-select"
          }, [
            (a(!0), n(H, null, K(m.value, (ee) => (a(), n("option", {
              key: ee,
              value: ee
            }, h(ee), 9, Lo))), 128))
          ], 512), [
            [Me, v.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: R
          }, " Insert into message ")
        ]),
        f[8] || (f[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", To, [
        f[9] || (f[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Po, [
          Ie(e("input", {
            "onUpdate:modelValue": f[2] || (f[2] = (ee) => p.value = ee),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [Ge, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W
          }, " Add ")
        ])
      ])
    ]));
  }
}), Eo = /* @__PURE__ */ ie(Vo, [["__scopeId", "data-v-1be89c79"]]), Mo = { class: "keos-sms-builder" }, Oo = { class: "kb-builder-top" }, No = { style: { margin: 0, paddingLeft: "1.25rem" } }, Do = { class: "kb-sms-layout" }, zo = { class: "kb-sms-sidebar" }, Ho = {
  key: 0,
  class: "kb-sms-form"
}, Wo = { class: "kb-sms-form-head" }, Fo = { class: "kb-wa-form-head-row" }, jo = ["value"], Ko = { class: "kb-sms-canvas" }, qo = {
  key: 0,
  class: "kb-sms-test-banner"
}, Yo = { class: "kb-sms-preview-chrome" }, Jo = { class: "kb-push-preview-controls" }, Go = { class: "kb-push-preview-as" }, Qo = ["value"], Xo = { class: "kb-sms-preview-frame" }, Zo = { class: "kb-preview" }, ei = { class: "kb-sms-preview" }, ti = { class: "kb-sms-phone" }, si = { class: "kb-sms-header" }, ai = { class: "kb-sms-sender" }, ni = { class: "kb-sms-thread" }, li = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, oi = { class: "kb-sms-text" }, ii = { class: "kb-sms-counter" }, ri = { key: 0 }, di = { key: 1 }, ui = { key: 2 }, ci = {
  key: 3,
  class: "kb-sms-cost"
}, pi = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, mi = { class: "kb-sms-actions" }, vi = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, bi = { class: "kb-confirm-dialog" }, gi = { class: "kb-confirm-actions" }, yi = /* @__PURE__ */ le({
  __name: "KeosSmsBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    costPerSegment: { default: 0 },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(s, { emit: d }) {
    const i = s, r = d, {
      campaign: o,
      dirty: m,
      getValidationWithWarnings: v,
      update: p,
      updateMessage: y,
      undo: L,
      redo: Y,
      canUndo: N,
      canRedo: $,
      resetMessage: M,
      hooks: R
    } = Fe({
      initial: i.modelValue,
      hooks: i.hooks,
      onDirty: () => r("change", o.value)
    }), { lastSavedAt: W } = je(o, { channel: "sms" });
    function A(D) {
      (D.metaKey || D.ctrlKey) && D.key === "z" && (D.preventDefault(), D.shiftKey ? Y() : L());
    }
    Ne(() => {
      window.addEventListener("keydown", A);
    }), De(() => {
      window.removeEventListener("keydown", A);
    }), ye(
      o,
      (D) => r("update:modelValue", D),
      { deep: !0 }
    );
    const f = J(), ee = J(!0);
    async function ce() {
      if (R.estimateReach)
        try {
          f.value = await R.estimateReach(o.value.audience);
        } catch {
          f.value = void 0;
        }
      R.canSend && (ee.value = await Promise.resolve(R.canSend()));
    }
    ce(), ye(() => o.value.audience, ce, { deep: !0 });
    const oe = I(() => v(f.value)), pe = I(() => oe.value.blockingErrors), be = I(() => oe.value.warnings), _e = I(() => oe.value.valid), ke = I(() => o.value.template_type ?? "transactional"), me = J(""), U = J(!1), se = J(null), ne = I(() => {
      const D = me.value;
      return D ? Ve.find((z) => z.id === D) ?? null : null;
    }), S = I(() => {
      const D = xe.value;
      return ne.value ? Te(D, ne.value.data) : D;
    });
    function fe(D) {
      const z = o.value, G = D.campaign.message ? { ...z.message, ...D.campaign.message } : z.message;
      p({
        ...D.campaign,
        message: G
      }), se.value = null, U.value = !1;
    }
    function we(D) {
      const z = D.target.value;
      if (!z) return;
      const G = ot.find((Ce) => Ce.id === z);
      G && (m.value ? (se.value = G, U.value = !0) : fe(G), D.target.value = "");
    }
    function Ae(D) {
      p({ template_type: D });
    }
    function Ue(D) {
      p({
        name: D,
        tracking: { ...o.value.tracking ?? {}, campaign_name: D }
      });
    }
    const xe = I(() => (o.value.message.sms_body ?? "") || ""), ge = I(() => xe.value.length), ve = I(() => ge.value ? ge.value <= 160 ? 1 : Math.ceil(ge.value / 153) : 0), Re = I(() => {
      const D = S.value;
      return D.trim().length ? D : "Your SMS message preview will appear here.";
    }), T = I(() => {
      const D = i.costPerSegment ?? 0;
      return !D || ve.value === 0 ? null : (ve.value * D).toFixed(2);
    }), O = I(() => {
      const D = ge.value;
      return D <= 160 ? null : D <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), q = I(
      () => o.value.message.sms_sender_id ?? "YourBrand"
    );
    function ue() {
      _e.value && r("save", o.value);
    }
    return (D, z) => (a(), n("div", Mo, [
      e("div", Oo, [
        re(Ke, {
          "campaign-name": c(o).name,
          status: c(o).status,
          dirty: c(m),
          "last-saved-at": c(W),
          "can-undo": c(N),
          "can-redo": c($),
          "onUpdate:campaignName": Ue,
          onUndo: c(L),
          onRedo: c(Y)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: te({
            background: c(X).dangerBg,
            border: `1px solid ${c(X).dangerBorder}`,
            borderRadius: `${c($e).input}px`,
            padding: `${c(j)[12]}px ${c(j)[16]}px`,
            marginBottom: `${c(j)[16]}px`
          })
        }, [
          e("ul", {
            style: te({ margin: 0, paddingLeft: "1.25rem", color: c(X).danger })
          }, [
            (a(!0), n(H, null, K(pe.value, (G) => (a(), n("li", {
              key: G.message
            }, h(G.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        be.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: te({
            background: c(X).neutral.bg,
            border: `1px solid ${c(X).neutral.border}`,
            borderRadius: `${c($e).input}px`,
            padding: `${c(j)[12]}px ${c(j)[16]}px`,
            marginBottom: `${c(j)[16]}px`,
            fontSize: "0.875rem",
            color: c(X).neutral.textMuted
          })
        }, [
          e("strong", {
            style: te({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", No, [
            (a(!0), n(H, null, K(be.value, (G) => (a(), n("li", {
              key: G.message
            }, h(G.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", Do, [
        e("aside", zo, [
          s.disabledSections.includes("sms") ? w("", !0) : (a(), n("div", Ho, [
            e("div", Wo, [
              z[7] || (z[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", Fo, [
                re(qe, {
                  "template-type": ke.value,
                  onUpdate: Ae
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: we
                }, [
                  z[6] || (z[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(H, null, K(c(ot), (G) => (a(), n("option", {
                    key: G.id,
                    value: G.id
                  }, h(G.label), 9, jo))), 128))
                ], 32)
              ])
            ]),
            re(Eo, {
              message: c(o).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: c(y),
              onReset: z[0] || (z[0] = (G) => c(M)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Ko, [
          c(o).audience.test_mode ? (a(), n("div", qo, [...z[8] || (z[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            Q(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", Yo, [
            e("div", Jo, [
              e("label", Go, [
                z[10] || (z[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ie(e("select", {
                  "onUpdate:modelValue": z[1] || (z[1] = (G) => me.value = G),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  z[9] || (z[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(H, null, K(c(Ve), (G) => (a(), n("option", {
                    key: G.id,
                    value: G.id
                  }, h(G.label), 9, Qo))), 128))
                ], 512), [
                  [Me, me.value]
                ])
              ])
            ]),
            e("div", Xo, [
              e("div", Zo, [
                e("div", ei, [
                  e("div", ti, [
                    z[13] || (z[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", si, [
                      e("div", ai, h(q.value), 1),
                      z[11] || (z[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", ni, [
                      e("div", li, [
                        e("span", oi, h(Re.value), 1),
                        z[12] || (z[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", ii, [
                    Q(h(ge.value) + " characters · ", 1),
                    ve.value === 0 ? (a(), n("span", ri, "0 segments")) : ve.value === 1 ? (a(), n("span", di, "1 segment")) : (a(), n("span", ui, h(ve.value) + " segments", 1)),
                    z[14] || (z[14] = Q(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    T.value !== null ? (a(), n("span", ci, " · Est. " + h(T.value), 1)) : w("", !0)
                  ]),
                  O.value ? (a(), n("p", pi, h(O.value), 1)) : w("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", mi, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: z[2] || (z[2] = (G) => r("duplicate", JSON.parse(JSON.stringify(c(o)))))
        }, " Duplicate ")) : w("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: ue
        }, " Save ")) : w("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-sms-action kb-sms-action--primary",
          onClick: z[3] || (z[3] = (G) => r("edit"))
        }, " Close ")) : w("", !0)
      ]),
      U.value ? (a(), n("div", vi, [
        e("div", bi, [
          z[15] || (z[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          z[16] || (z[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", gi, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: z[4] || (z[4] = (G) => {
                U.value = !1, se.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: z[5] || (z[5] = (G) => se.value && fe(se.value))
            }, "Replace")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ ie(yi, [["__scopeId", "data-v-8b5fccda"]]), fi = 30, hi = 60, ki = 130;
function _i(s) {
  const d = (s ?? "").trim().length;
  return d < fi ? "too_short" : d <= hi ? "good" : "too_long";
}
function wi(s) {
  const d = (s ?? "").trim().length;
  return d === 0 ? "too_short" : d <= ki ? "good" : "too_long";
}
const $i = [
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
function rt(s) {
  if (!s || typeof s != "string") return [];
  const d = [];
  for (const i of $i) {
    const r = s.match(i);
    r && d.push(r[0]);
  }
  return d;
}
function xi(s) {
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
function Ci(s) {
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
const Si = { class: "em-section" }, Ii = { class: "em-strip" }, Ui = { class: "em-strip-head" }, Ri = { class: "em-field" }, Ai = ["value"], Bi = { class: "em-field" }, Li = ["value"], Ti = { class: "em-field" }, Pi = ["value"], Vi = { class: "em-field" }, Ei = { class: "em-input-group" }, Mi = ["value"], Oi = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Ni = { class: "em-field" }, Di = { class: "em-input-group" }, zi = ["value"], Hi = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Wi = { class: "em-strip em-strip--library" }, Fi = { class: "em-library-chips" }, ji = ["onClick"], Ki = { class: "em-strip em-strip--blocks" }, qi = { class: "em-block-list" }, Yi = ["data-type"], Ji = { class: "em-block-bar" }, Gi = { class: "em-block-type" }, Qi = { class: "em-block-actions" }, Xi = ["disabled", "onClick"], Zi = ["disabled", "onClick"], er = ["onClick"], tr = {
  key: 0,
  class: "em-block-fields"
}, sr = ["value", "onChange"], ar = ["value", "onInput"], nr = ["onClick"], lr = {
  key: 1,
  class: "em-block-fields"
}, or = ["value", "onInput"], ir = ["onClick"], rr = {
  key: 2,
  class: "em-block-fields"
}, dr = ["value", "onInput"], ur = ["value", "onInput"], cr = ["value", "onInput"], pr = {
  key: 3,
  class: "em-block-fields"
}, mr = ["value", "onInput"], vr = ["value", "onInput"], br = { class: "em-block-fields--row" }, gr = ["value", "onInput"], yr = { class: "em-check-row" }, fr = ["checked", "onChange"], hr = { class: "em-check-row" }, kr = ["checked", "onChange"], _r = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, wr = ["value", "onInput"], $r = {
  key: 5,
  class: "em-block-fields"
}, xr = ["value", "onInput"], Cr = ["value", "onInput"], Sr = ["value", "onInput"], Ir = ["onClick"], Ur = {
  key: 6,
  class: "em-block-fields"
}, Rr = ["value", "onChange"], Ar = { class: "em-list-items" }, Br = ["value", "onInput", "placeholder"], Lr = ["onClick"], Tr = ["onClick"], Pr = {
  key: 7,
  class: "em-block-fields"
}, Vr = ["value", "onChange"], Er = ["value", "onInput"], Mr = ["onClick"], Or = {
  key: 8,
  class: "em-block-fields"
}, Nr = { class: "em-social-links" }, Dr = ["value", "onChange"], zr = ["value", "onInput"], Hr = ["onClick"], Wr = ["onClick"], Fr = {
  key: 9,
  class: "em-block-fields"
}, jr = ["value", "onInput"], Kr = ["value", "onInput"], qr = ["value", "onInput"], Yr = {
  key: 10,
  class: "em-block-fields"
}, Jr = ["value", "onInput"], Gr = { class: "em-link-list-items" }, Qr = ["value", "onInput"], Xr = ["value", "onInput"], Zr = ["onClick"], ed = ["onClick"], td = {
  key: 11,
  class: "em-block-fields"
}, sd = ["value", "onInput"], ad = ["onClick"], nd = ["value", "onInput"], ld = ["onClick"], od = {
  key: 12,
  class: "em-block-fields"
}, id = { class: "em-block-fields--row" }, rd = ["value", "onInput"], dd = { class: "em-block-fields--row" }, ud = ["value", "onInput"], cd = ["value", "onChange"], pd = {
  key: 13,
  class: "em-block-fields"
}, md = ["value", "onChange"], vd = { class: "em-inline-label" }, bd = ["value", "onInput"], gd = ["onClick"], yd = {
  key: 14,
  class: "em-block-fields"
}, fd = ["value", "onInput"], hd = { class: "em-link-list-items" }, kd = ["value", "onInput"], _d = ["value", "onInput"], wd = ["onClick"], $d = ["onClick"], xd = {
  key: 15,
  class: "em-block-fields"
}, Cd = ["value", "onInput"], Sd = ["value", "onInput"], Id = ["onClick"], Ud = ["onClick"], Rd = {
  key: 16,
  class: "em-block-fields"
}, Ad = ["value", "onInput"], Bd = ["value", "onInput"], Ld = ["value", "onInput"], Td = ["onClick"], Pd = ["onClick"], Vd = {
  key: 17,
  class: "em-block-fields"
}, Ed = ["value", "onInput"], Md = ["value", "onInput"], Od = {
  key: 18,
  class: "em-block-fields"
}, Nd = ["value", "onInput"], Dd = ["value", "onInput"], zd = ["value", "onInput"], Hd = ["value", "onInput"], Wd = ["value", "onInput"], Fd = {
  key: 19,
  class: "em-block-fields"
}, jd = ["value", "onInput"], Kd = ["onClick"], qd = {
  key: 20,
  class: "em-block-fields"
}, Yd = ["value", "onInput"], Jd = ["value", "onInput"], Gd = ["onClick"], Qd = {
  key: 21,
  class: "em-block-fields"
}, Xd = ["value", "onInput"], Zd = { class: "em-block-fields--row" }, eu = ["value", "onInput"], tu = {
  key: 22,
  class: "em-block-fields"
}, su = ["value", "onInput"], au = ["value", "onInput"], nu = ["value", "onInput"], lu = { class: "em-add-bar" }, ou = { class: "em-add-bar-btns" }, iu = { class: "em-strip em-strip--personalize" }, ru = { class: "em-field" }, du = { class: "em-input-group" }, uu = ["value"], cu = { class: "em-field" }, pu = { class: "em-input-group" }, Se = "{{ var }}", mu = /* @__PURE__ */ le({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: d }) {
    var Le;
    function i() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const r = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ];
    function o(b) {
      switch (b) {
        case "heading":
          return { id: i(), type: "heading", level: 1, content: "Heading" };
        case "paragraph":
          return { id: i(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization." };
        case "image":
          return { id: i(), type: "image", src: "", alt: "", linkUrl: "" };
        case "button":
          return { id: i(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1 };
        case "divider":
          return { id: i(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid" };
        case "spacer":
          return { id: i(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: i(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: ""
          };
        case "list":
          return { id: i(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"] };
        case "quote":
          return { id: i(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default" };
        case "social":
          return { id: i(), type: "social", links: r.map((l) => ({ ...l })) };
        case "video":
          return { id: i(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "" };
        case "link_list":
          return {
            id: i(),
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
            id: i(),
            type: "columns",
            leftContent: "Left column text or {{ variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: i(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: i(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: i(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: i(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: i(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: i(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: i(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: i(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: i(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: i(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: i(), type: "paragraph", content: "" };
      }
    }
    const m = s, v = d, p = ["first_name", "last_name", "order_id", "city", "email"], y = J(
      (Le = m.variableOptions) != null && Le.length ? [...m.variableOptions] : p
    ), L = J(y.value[0] ?? "first_name"), Y = J("");
    ye(
      () => m.variableOptions,
      (b) => {
        b != null && b.length && (y.value = [...b], y.value.includes(L.value) || (L.value = y.value[0]));
      }
    );
    const N = I(() => m.message.email_subject ?? ""), $ = I(() => m.message.email_preview_text ?? ""), M = I(() => _i(N.value)), R = I(() => wi($.value)), W = I(() => rt(N.value)), A = I(() => rt($.value)), f = I(() => {
      const b = m.message.email_blocks;
      return Array.isArray(b) && b.length > 0 ? b : [o("paragraph")];
    });
    ye(
      () => m.message.email_blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && v("update", { email_blocks: [o("paragraph")] });
      },
      { immediate: !0 }
    );
    function ee(b) {
      v("update", { email_blocks: b });
    }
    function ce(b) {
      v("update", { email_subject: b.target.value });
    }
    function oe(b) {
      const l = b.target.value;
      v("update", { email_preview_text: l || void 0 });
    }
    function pe(b) {
      v("update", { email_from_name: b.target.value || void 0 });
    }
    function be(b) {
      v("update", { email_from_address: b.target.value || void 0 });
    }
    function _e(b) {
      v("update", { email_reply_to: b.target.value || void 0 });
    }
    const ke = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [o("heading"), o("paragraph"), o("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [o("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [o("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [o("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [o("social"), o("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [o("footer"), o("link_list")]
      }
    ];
    function me(b) {
      const l = b.blocks();
      ee([...f.value, ...l]);
    }
    function U(b) {
      const l = [...f.value, o(b)];
      ee(l);
    }
    function se(b) {
      ee(f.value.filter((l) => l.id !== b));
    }
    function ne(b, l) {
      const t = f.value.findIndex((V) => V.id === b);
      if (t < 0) return;
      const E = l === "up" ? t - 1 : t + 1;
      if (E < 0 || E >= f.value.length) return;
      const u = [...f.value];
      [u[t], u[E]] = [u[E], u[t]], ee(u);
    }
    function S(b, l) {
      const t = f.value.map((E) => E.id === b ? { ...E, ...l } : E);
      ee(t);
    }
    function fe(b, l, t) {
      const E = f.value.find((V) => V.id === b);
      if (!E || E.type !== "list") return;
      const u = [...E.items || []];
      u[l] = t, S(b, { items: u });
    }
    function we(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "list" || S(b, { items: [...l.items || [], "New item"] });
    }
    function Ae(b, l) {
      const t = f.value.find((u) => u.id === b);
      if (!t || t.type !== "list") return;
      const E = (t.items || []).filter((u, V) => V !== l);
      S(b, { items: E });
    }
    function Ue(b, l, t, E) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "social") return;
      const V = (u.links || []).map((B, he) => he === l ? { ...B, [t]: E } : B);
      S(b, { links: V });
    }
    function xe(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "social" || S(b, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function ge(b, l) {
      const t = f.value.find((u) => u.id === b);
      if (!t || t.type !== "social") return;
      const E = (t.links || []).filter((u, V) => V !== l);
      S(b, { links: E });
    }
    function ve(b, l, t, E) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "link_list") return;
      const V = (u.links || []).map((B, he) => he === l ? { ...B, [t]: E } : B);
      S(b, { links: V });
    }
    function Re(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "link_list" || S(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function T(b, l) {
      const t = f.value.find((u) => u.id === b);
      if (!t || t.type !== "link_list") return;
      const E = (t.links || []).filter((u, V) => V !== l);
      S(b, { links: E });
    }
    function O(b, l) {
      const t = f.value.find((Ee) => Ee.id === b);
      if (!t || t.type !== "columns") return;
      const E = ` {{ ${L.value} }}`, u = m.message.variables_used ?? [], V = Array.from(/* @__PURE__ */ new Set([...u, L.value])), B = l === "left" ? "leftContent" : "rightContent", Ye = (t[B] ?? "") + E;
      S(b, { [B]: Ye }), v("update", { variables_used: V });
    }
    function q(b, l) {
      const t = f.value.find((E) => E.id === b);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const E = [...t.cells || []];
          for (; E.length < l.columnCount; ) E.push("Cell content");
          l.cells = E.slice(0, l.columnCount);
        }
        S(b, l);
      }
    }
    function ue(b, l, t) {
      const E = f.value.find((V) => V.id === b);
      if (!E || E.type !== "row") return;
      const u = [...E.cells || []];
      u[l] = t, S(b, { cells: u });
    }
    function D(b, l, t, E) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "navbar") return;
      const V = (u.links || []).map((B, he) => he === l ? { ...B, [t]: E } : B);
      S(b, { links: V });
    }
    function z(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "navbar" || S(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function G(b, l) {
      const t = f.value.find((E) => E.id === b);
      !t || t.type !== "navbar" || S(b, { links: (t.links || []).filter((E, u) => u !== l) });
    }
    function Ce(b, l, t, E) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "accordion") return;
      const V = (u.items || []).map((B, he) => he === l ? { ...B, [t]: E } : B);
      S(b, { items: V });
    }
    function F(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "accordion" || S(b, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function k(b, l) {
      const t = f.value.find((E) => E.id === b);
      !t || t.type !== "accordion" || S(b, { items: (t.items || []).filter((E, u) => u !== l) });
    }
    function P(b, l, t, E) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "carousel") return;
      const V = (u.slides || []).map((B, he) => he === l ? { ...B, [t]: E } : B);
      S(b, { slides: V });
    }
    function x(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "carousel" || S(b, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function _(b, l) {
      const t = f.value.find((E) => E.id === b);
      !t || t.type !== "carousel" || S(b, { slides: (t.slides || []).filter((E, u) => u !== l) });
    }
    function g(b) {
      const l = ` {{ ${L.value} }}`, t = m.message.variables_used ?? [], E = Array.from(/* @__PURE__ */ new Set([...t, L.value]));
      b === "subject" ? v("update", {
        email_subject: (N.value || "") + l,
        variables_used: E
      }) : v("update", {
        email_preview_text: ($.value || "") + l,
        variables_used: E
      });
    }
    function C(b) {
      const l = f.value.find((Ee) => Ee.id === b);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const t = ` {{ ${L.value} }}`, E = m.message.variables_used ?? [], u = Array.from(/* @__PURE__ */ new Set([...E, L.value])), V = (l.type === "footer", "content"), he = (l[V] ?? "") + t, Ye = f.value.map(
        (Ee) => Ee.id === b ? { ...Ee, [V]: he } : Ee
      );
      v("update", { email_blocks: Ye, variables_used: u });
    }
    function Z(b, l) {
      const t = f.value.find((he) => he.id === b);
      if (!t || t.type !== "row") return;
      const E = ` {{ ${L.value} }}`, u = m.message.variables_used ?? [], V = Array.from(/* @__PURE__ */ new Set([...u, L.value])), B = [...t.cells || []];
      B[l] = (B[l] || "") + E, S(b, { cells: B }), v("update", { variables_used: V });
    }
    function ae() {
      const b = Y.value.trim();
      !b || y.value.includes(b) || (y.value = [...y.value, b], L.value = b, Y.value = "");
    }
    return (b, l) => (a(), n("section", Si, [
      e("div", Ii, [
        e("div", Ui, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => b.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Ri, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: s.message.email_from_name ?? "",
            onInput: pe
          }, null, 40, Ai)
        ]),
        e("div", Bi, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: s.message.email_from_address ?? "",
            onInput: be
          }, null, 40, Li)
        ]),
        e("div", Ti, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            Q("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: s.message.email_reply_to ?? "",
            onInput: _e
          }, null, 40, Pi)
        ]),
        e("div", Vi, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Ei, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: N.value,
              onInput: ce
            }, null, 40, Mi),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (t) => g("subject")),
              title: "Insert variable"
            }, h(Se))
          ]),
          e("span", {
            class: de(["em-analyzer", `em-analyzer--${M.value}`])
          }, h(c(xi)(M.value)), 3),
          W.value.length ? (a(), n("span", Oi, "Spammy: " + h(W.value.join(", ")), 1)) : w("", !0)
        ]),
        e("div", Ni, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            Q("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", Di, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: $.value,
              onInput: oe
            }, null, 40, zi),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (t) => g("preview")),
              title: "Insert variable"
            }, h(Se))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: de(["em-analyzer", `em-analyzer--${R.value}`])
          }, h(c(Ci)(R.value)), 3),
          A.value.length ? (a(), n("span", Hi, "Spammy: " + h(A.value.join(", ")), 1)) : w("", !0)
        ])
      ]),
      e("div", Wi, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Fi, [
          (a(), n(H, null, K(ke, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (E) => me(t)
          }, h(t.label), 9, ji)), 64))
        ])
      ]),
      e("div", Ki, [
        l[61] || (l[61] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[62] || (l[62] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", qi, [
          (a(!0), n(H, null, K(f.value, (t, E) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Ji, [
              e("span", Gi, h(t.type), 1),
              e("div", Qi, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: E === 0,
                  onClick: (u) => ne(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Xi),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: E === f.value.length - 1,
                  onClick: (u) => ne(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Zi),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => se(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, er)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", tr, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { level: Number(u.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, sr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, ar),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, nr)
            ])) : t.type === "paragraph" ? (a(), n("div", lr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, or),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, ir)
            ])) : t.type === "image" ? (a(), n("div", rr, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (u) => S(t.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, dr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => S(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, ur),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (u) => S(t.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, cr)
            ])) : t.type === "button" ? (a(), n("div", pr, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (u) => S(t.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, mr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (u) => S(t.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, vr),
              e("div", br, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (u) => S(t.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, gr)
              ]),
              e("label", yr, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (u) => S(t.id, { fullWidth: u.target.checked })
                }, null, 40, fr),
                l[40] || (l[40] = e("span", null, "Full width", -1))
              ]),
              e("label", hr, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (u) => S(t.id, { ghost: u.target.checked })
                }, null, 40, kr),
                l[41] || (l[41] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", _r, [
              l[42] || (l[42] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (u) => S(t.id, { height: Number(u.target.value) || 24 })
              }, null, 40, wr),
              l[43] || (l[43] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", $r, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, xr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (u) => S(t.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Cr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (u) => S(t.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, Sr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, Ir)
            ])) : t.type === "list" ? (a(), n("div", Ur, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { style: u.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Rr),
              e("div", Ar, [
                (a(!0), n(H, null, K(t.items || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (B) => fe(t.id, V, B.target.value),
                    placeholder: `Item ${V + 1}`
                  }, null, 40, Br),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => Ae(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Lr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => we(t.id)
              }, "+ Add item", 8, Tr)
            ])) : t.type === "quote" ? (a(), n("div", Pr, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { style: u.target.value })
              }, [...l[45] || (l[45] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Vr),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Er),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, Mr)
            ])) : t.type === "social" ? (a(), n("div", Or, [
              e("div", Nr, [
                (a(!0), n(H, null, K(t.links || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (B) => Ue(t.id, V, "platform", B.target.value)
                  }, [...l[46] || (l[46] = [
                    Oe('<option value="facebook" data-v-5a131abf>Facebook</option><option value="twitter" data-v-5a131abf>Twitter / X</option><option value="instagram" data-v-5a131abf>Instagram</option><option value="linkedin" data-v-5a131abf>LinkedIn</option><option value="youtube" data-v-5a131abf>YouTube</option><option value="tiktok" data-v-5a131abf>TikTok</option><option value="custom" data-v-5a131abf>Custom</option>', 7)
                  ])], 40, Dr),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (B) => Ue(t.id, V, "url", B.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, zr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => ge(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Hr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => xe(t.id)
              }, "+ Add link", 8, Wr)
            ])) : t.type === "video" ? (a(), n("div", Fr, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (u) => S(t.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, jr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (u) => S(t.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Kr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => S(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, qr)
            ])) : t.type === "link_list" ? (a(), n("div", Yr, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => S(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Jr),
              e("div", Gr, [
                (a(!0), n(H, null, K(t.links || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (B) => ve(t.id, V, "text", B.target.value),
                    placeholder: "Label"
                  }, null, 40, Qr),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (B) => ve(t.id, V, "url", B.target.value),
                    placeholder: "URL"
                  }, null, 40, Xr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => T(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Zr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Re(t.id)
              }, "+ Add link", 8, ed)
            ])) : t.type === "columns" ? (a(), n("div", td, [
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (u) => S(t.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, sd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => O(t.id, "left")
              }, h(Se), 8, ad),
              l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (u) => S(t.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, nd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => O(t.id, "right")
              }, h(Se), 8, ld)
            ])) : t.type === "divider" ? (a(), n("div", od, [
              e("div", id, [
                l[49] || (l[49] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (u) => S(t.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, rd),
                l[50] || (l[50] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", dd, [
                l[51] || (l[51] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (u) => S(t.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, ud)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { lineStyle: u.target.value })
              }, [...l[52] || (l[52] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, cd)
            ])) : t.type === "row" ? (a(), n("div", pd, [
              l[54] || (l[54] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => q(t.id, { columnCount: Number(u.target.value) })
              }, [...l[53] || (l[53] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, md),
              (a(!0), n(H, null, K(t.cells || [], (u, V) => (a(), n("div", {
                key: V,
                class: "em-row-cell"
              }, [
                e("label", vd, "Column " + h(V + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (B) => ue(t.id, V, B.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, bd),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (B) => Z(t.id, V)
                }, h(Se), 8, gd)
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", yd, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => S(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, fd),
              e("div", hd, [
                (a(!0), n(H, null, K(t.links || [], (u, V) => (a(), n("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (B) => D(t.id, V, "text", B.target.value),
                    placeholder: "Label"
                  }, null, 40, kd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (B) => D(t.id, V, "url", B.target.value),
                    placeholder: "URL"
                  }, null, 40, _d),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => G(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, wd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => z(t.id)
              }, "+ Add link", 8, $d)
            ])) : t.type === "accordion" ? (a(), n("div", xd, [
              (a(!0), n(H, null, K(t.items || [], (u, V) => (a(), n("div", {
                key: V,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (B) => Ce(t.id, V, "title", B.target.value),
                  placeholder: "Section title"
                }, null, 40, Cd),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (B) => Ce(t.id, V, "content", B.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Sd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (B) => k(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Id)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => F(t.id)
              }, "+ Add section", 8, Ud)
            ])) : t.type === "carousel" ? (a(), n("div", Rd, [
              (a(!0), n(H, null, K(t.slides || [], (u, V) => (a(), n("div", {
                key: V,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (B) => P(t.id, V, "imageUrl", B.target.value),
                  placeholder: "Image URL"
                }, null, 40, Ad),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (B) => P(t.id, V, "alt", B.target.value),
                  placeholder: "Alt text"
                }, null, 40, Bd),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (B) => P(t.id, V, "linkUrl", B.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Ld),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (B) => _(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Td)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => x(t.id)
              }, "+ Add slide", 8, Pd)
            ])) : t.type === "countdown" ? (a(), n("div", Vd, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (u) => S(t.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Ed),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (u) => S(t.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Md),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", Od, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => S(t.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Nd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (u) => S(t.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, Dd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (u) => S(t.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, zd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (u) => S(t.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, Hd),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (u) => S(t.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, Wd)
            ])) : t.type === "liquid" ? (a(), n("div", Fd, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, jd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, Kd),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", qd, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => S(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Yd),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, Jd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, Gd),
              l[57] || (l[57] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", Qd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (u) => S(t.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, Xd),
              e("div", Zd, [
                l[58] || (l[58] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (u) => S(t.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, eu)
              ]),
              l[59] || (l[59] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", tu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => S(t.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, su),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => S(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, au),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (u) => S(t.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, nu)
            ])) : w("", !0)
          ], 8, Yi))), 128))
        ]),
        e("div", lu, [
          l[60] || (l[60] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", ou, [
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
      e("div", iu, [
        l[65] || (l[65] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[66] || (l[66] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", ru, [
          l[63] || (l[63] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", du, [
            Ie(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => L.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(H, null, K(y.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, h(t), 9, uu))), 128))
            ], 512), [
              [Me, L.value]
            ])
          ])
        ]),
        e("div", cu, [
          l[64] || (l[64] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", pu, [
            Ie(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => Y.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [Ge, Y.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: ae
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), vu = /* @__PURE__ */ ie(mu, [["__scopeId", "data-v-5a131abf"]]), bu = { class: "keos-email-builder" }, gu = { class: "kb-builder-top" }, yu = { style: { margin: 0, paddingLeft: "1.25rem" } }, fu = { class: "kb-email-layout" }, hu = { class: "kb-email-sidebar" }, ku = {
  key: 0,
  class: "kb-email-form"
}, _u = { class: "kb-email-form-head" }, wu = { class: "kb-wa-form-head-row" }, $u = ["value"], xu = { class: "kb-email-canvas" }, Cu = {
  key: 0,
  class: "kb-email-test-banner"
}, Su = { class: "kb-email-preview-chrome" }, Iu = { class: "kb-push-preview-controls" }, Uu = { class: "kb-push-preview-as" }, Ru = ["value"], Au = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Bu = { class: "kb-email-inbox-strip" }, Lu = { class: "kb-email-inbox-from" }, Tu = { class: "kb-email-inbox-from-name" }, Pu = { class: "kb-email-inbox-from-addr" }, Vu = { class: "kb-email-inbox-subject" }, Eu = ["title"], Mu = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, Ou = { class: "kb-email-body-canvas" }, Nu = ["innerHTML"], Du = { class: "kb-email-actions" }, zu = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, Hu = { class: "kb-confirm-dialog" }, Wu = { class: "kb-confirm-actions" }, Fu = /* @__PURE__ */ le({
  __name: "KeosEmailBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(s, { emit: d }) {
    function i(F) {
      if (!Array.isArray(F) || F.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const k = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), P = [];
      for (const x of F)
        switch (x.type) {
          case "heading": {
            const _ = Math.min(3, Math.max(1, Number(x.level) || 1)), g = k(x.content || "").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            P.push(`<h${_} style="margin:0 0 12px;font-size:${_ === 1 ? "22" : _ === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${g || "Heading"}</h${_}>`);
            break;
          }
          case "paragraph": {
            const _ = k(x.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            P.push(`<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${_ || "Paragraph"}</p>`);
            break;
          }
          case "image": {
            const _ = (x.src || "").trim(), g = k(x.alt || ""), C = (x.linkUrl || "").trim(), Z = _ ? `<img src="${k(_)}" alt="${g}" style="max-width:100%;height:auto;display:block;border:0;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            P.push(
              `<div style="margin:0 0 12px;">${C ? `<a href="${k(C)}" style="color:#2563eb;">${Z}</a>` : Z}</div>`
            );
            break;
          }
          case "button": {
            const _ = k(x.text || "Button"), g = (x.url || "#").trim(), C = Math.min(24, Math.max(0, Number(x.borderRadius) ?? 8)), Z = !!x.fullWidth, ae = !!x.ghost, Le = ae ? "transparent" : "#0f172a", b = ae ? "#0f172a" : "#fff", l = ae ? "2px solid #0f172a" : "none", t = Z ? "block" : "inline-block", E = Z ? "100%" : "auto";
            P.push(
              `<p style="margin:0 0 12px;"><a href="${k(g)}" style="display:${t};width:${E};text-align:center;padding:12px 24px;background:${Le};color:${b};border:${l};text-decoration:none;font-size:14px;font-weight:600;border-radius:${C}px;">${_}</a></p>`
            );
            break;
          }
          case "divider": {
            const _ = Math.min(8, Math.max(1, Number(x.thickness) || 1)), g = (x.color || "#e2e8f0").trim() || "#e2e8f0", C = x.lineStyle || "solid";
            P.push(
              `<hr style="margin:16px 0;border:0;border-top:${_}px ${C} ${g};" />`
            );
            break;
          }
          case "spacer": {
            const _ = Math.min(120, Math.max(8, Number(x.height) || 24));
            P.push(`<div style="height:${_}px;"></div>`);
            break;
          }
          case "footer": {
            const _ = k(x.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), g = (x.unsubscribeUrl || "").trim(), C = k(x.companyAddress || "");
            P.push(
              `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${_ || "Footer"}` + (g ? `<p style="margin:8px 0 0;"><a href="${k(g)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (C ? `<p style="margin:4px 0 0;">${C}</p>` : "") + "</div>"
            );
            break;
          }
          case "list": {
            const _ = x.style === "numbered" ? "ol" : "ul", C = (Array.isArray(x.items) ? x.items : []).map(
              (Z) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${k(String(Z)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            P.push(`<${_} style="margin:0 0 12px;padding-left:24px;">${C || "<li>Item</li>"}</${_}>`);
            break;
          }
          case "quote": {
            const _ = k(x.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), g = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, C = g[x.style || "default"] || g.default;
            P.push(
              `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${C}font-size:14px;line-height:1.6;">${_ || "Quote"}</div>`
            );
            break;
          }
          case "social": {
            const g = (Array.isArray(x.links) ? x.links : []).filter((C) => (C.url || "").trim());
            if (g.length === 0)
              P.push(
                '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>'
              );
            else {
              const C = (Z) => `<a href="${k((Z.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${k(Z.platform || "Link")}</a>`;
              P.push(`<div style="margin:0 0 12px;text-align:center;">${g.map(C).join("")}</div>`);
            }
            break;
          }
          case "video": {
            const _ = (x.thumbnailUrl || "").trim(), g = (x.videoUrl || "#").trim(), C = k(x.caption || ""), Z = _ ? `<img src="${k(_)}" alt="Video" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            P.push(
              `<div style="margin:0 0 12px;"><a href="${k(g)}" style="display:block;color:inherit;">${Z}</a>` + (C ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${C}</p>` : "") + "</div>"
            );
            break;
          }
          case "link_list": {
            const _ = Array.isArray(x.links) ? x.links : [], g = k(x.separator || " | "), Z = _.filter((ae) => (ae.text || ae.url) && (ae.url || "").trim()).map(
              (ae) => `<a href="${k((ae.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${k(ae.text || "Link")}</a>`
            );
            P.push(
              `<p style="margin:0 0 12px;font-size:12px;color:#64748b;text-align:center;">${Z.join(g)}</p>`
            );
            break;
          }
          case "columns": {
            const _ = k(x.leftContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), g = k(x.rightContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            P.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${_ || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${g || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const _ = Math.min(4, Math.max(1, Number(x.columnCount) || 2)), g = Array.isArray(x.cells) ? x.cells.slice(0, _) : [], C = 100 / _, Z = Array.from({ length: _ }, (ae, Le) => {
              const b = g[Le] ?? "", l = k(b).replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<td width="${C}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "—"}</td>`;
            }).join("");
            P.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${Z}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const _ = Array.isArray(x.links) ? x.links : [], g = k(x.separator || " | "), Z = _.filter((ae) => (ae.text || ae.url) && (ae.url || "").trim()).map(
              (ae) => `<a href="${k((ae.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${k(ae.text || "Link")}</a>`
            );
            P.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${Z.length ? Z.join(g) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const g = (Array.isArray(x.items) ? x.items : []).map((C) => {
              const Z = k(C.title || "Section"), ae = k(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${Z}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${ae}</div></details>`;
            }).join("");
            P.push(g ? `<div style="margin:0 0 12px;">${g}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>');
            break;
          }
          case "carousel": {
            const g = (Array.isArray(x.slides) ? x.slides : []).filter((C) => (C.imageUrl || "").trim());
            if (g.length === 0)
              P.push('<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>');
            else {
              const C = g[0], Z = `<img src="${k(C.imageUrl)}" alt="${k(C.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, ae = (C.linkUrl || "").trim();
              P.push(
                `<div style="margin:0 0 12px;">${ae ? `<a href="${k(ae)}">${Z}</a>` : Z}` + (g.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${g.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const _ = k(x.label || "Offer ends in"), g = x.endDateTime ? new Date(x.endDateTime).toLocaleString() : "—";
            P.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${_}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${g}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const _ = (x.imageUrl || "").trim(), g = k(x.title || "Product"), C = k(x.price || ""), Z = k(x.buttonText || "Buy now"), ae = (x.buttonUrl || "#").trim(), Le = _ ? `<img src="${k(_)}" alt="${k(x.alt || g)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            P.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Le}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${g}</p>` + (C ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${C}</p>` : "") + `<a href="${k(ae)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${Z}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const _ = k((x.content || "").trim());
            P.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${_ || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const _ = (x.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), g = k((x.caption || "").trim());
            P.push(
              '<div style="margin:0 0 12px;">' + (g ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${g}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${_ || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const _ = (x.feedUrl || "").trim(), g = Math.min(20, Math.max(1, Number(x.maxItems) ?? 5));
            P.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (_ ? `<p style="margin:0;font-size:12px;color:#64748b;">${k(_)} · max ${g} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const _ = (x.imageUrl || "").trim(), g = (x.fallbackUrl || "").trim(), C = k(x.alt || "Dynamic image");
            _ ? P.push(
              `<div style="margin:0 0 12px;"><img src="${k(_)}" alt="${C}" style="max-width:100%;height:auto;display:block;border:0;" />` + (g ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${k(g)}</p>` : "") + "</div>"
            ) : P.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return P.join("");
    }
    const r = s, o = d, {
      campaign: m,
      dirty: v,
      getValidationWithWarnings: p,
      update: y,
      updateMessage: L,
      undo: Y,
      redo: N,
      canUndo: $,
      canRedo: M,
      resetMessage: R,
      hooks: W
    } = Fe({
      initial: r.modelValue,
      hooks: r.hooks,
      onDirty: () => o("change", m.value)
    }), { lastSavedAt: A } = je(m, { channel: "email" });
    function f(F) {
      (F.metaKey || F.ctrlKey) && F.key === "z" && (F.preventDefault(), F.shiftKey ? N() : Y());
    }
    Ne(() => {
      window.addEventListener("keydown", f);
    }), De(() => {
      window.removeEventListener("keydown", f);
    }), ye(
      m,
      (F) => o("update:modelValue", F),
      { deep: !0 }
    );
    const ee = J(), ce = J(!0);
    async function oe() {
      if (W.estimateReach)
        try {
          ee.value = await W.estimateReach(m.value.audience);
        } catch {
          ee.value = void 0;
        }
      W.canSend && (ce.value = await Promise.resolve(W.canSend()));
    }
    oe(), ye(() => m.value.audience, oe, { deep: !0 });
    const pe = I(() => p(ee.value)), be = I(() => pe.value.blockingErrors), _e = I(() => pe.value.warnings), ke = I(() => pe.value.valid), me = I(() => m.value.template_type ?? "transactional"), U = J(""), se = J(!1), ne = J(null), S = I(() => {
      const F = U.value;
      return F ? Ve.find((k) => k.id === F) ?? null : null;
    });
    function fe(F) {
      const k = m.value, P = F.campaign.message ? { ...k.message, ...F.campaign.message } : k.message;
      y({
        ...F.campaign,
        message: P
      }), ne.value = null, se.value = !1;
    }
    function we(F) {
      const k = F.target.value;
      if (!k) return;
      const P = it.find((x) => x.id === k);
      P && (v.value ? (ne.value = P, se.value = !0) : fe(P), F.target.value = "");
    }
    function Ae(F) {
      y({ template_type: F });
    }
    function Ue(F) {
      y({
        name: F,
        tracking: { ...m.value.tracking ?? {}, campaign_name: F }
      });
    }
    const xe = I(
      () => m.value.message.email_subject ?? ""
    ), ge = I(
      () => m.value.message.email_preview_text ?? ""
    ), ve = I(
      () => m.value.message.email_html ?? ""
    ), Re = I(
      () => m.value.message.email_from_name ?? "Your App"
    ), T = I(
      () => m.value.message.email_from_address ?? "notifications@example.com"
    ), O = I(() => m.value.message.email_blocks ?? []), q = I(() => {
      const F = O.value;
      if (Array.isArray(F) && F.length > 0) return i(F);
      const k = ve.value;
      return k && k.trim() ? k : i([]);
    }), ue = I(() => {
      const F = xe.value;
      return S.value ? Te(F, S.value.data) : F;
    }), D = I(() => {
      const F = ge.value;
      return S.value ? Te(F, S.value.data) : F;
    }), z = I(() => {
      const F = q.value;
      return S.value ? Te(F, S.value.data) : F;
    }), G = J("desktop");
    function Ce() {
      ke.value && o("save", m.value);
    }
    return (F, k) => (a(), n("div", bu, [
      e("div", gu, [
        re(Ke, {
          "campaign-name": c(m).name,
          status: c(m).status,
          dirty: c(v),
          "last-saved-at": c(A),
          "can-undo": c($),
          "can-redo": c(M),
          "onUpdate:campaignName": Ue,
          onUndo: c(Y),
          onRedo: c(N)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        be.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: te({
            background: c(X).dangerBg,
            border: `1px solid ${c(X).dangerBorder}`,
            borderRadius: `${c($e).input}px`,
            padding: `${c(j)[16]}px ${c(j)[24]}px`,
            marginBottom: `${c(j)[24]}px`
          })
        }, [
          e("ul", {
            style: te({ margin: 0, paddingLeft: "1.25rem", color: c(X).danger })
          }, [
            (a(!0), n(H, null, K(be.value, (P) => (a(), n("li", {
              key: P.message
            }, h(P.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        _e.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: te({
            background: c(X).neutral.bg,
            border: `1px solid ${c(X).neutral.border}`,
            borderRadius: `${c($e).input}px`,
            padding: `${c(j)[16]}px ${c(j)[24]}px`,
            marginBottom: `${c(j)[24]}px`,
            fontSize: "0.875rem",
            color: c(X).neutral.textMuted
          })
        }, [
          e("strong", {
            style: te({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", yu, [
            (a(!0), n(H, null, K(_e.value, (P) => (a(), n("li", {
              key: P.message
            }, h(P.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", fu, [
        e("aside", hu, [
          s.disabledSections.includes("email") ? w("", !0) : (a(), n("div", ku, [
            e("div", _u, [
              k[9] || (k[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", wu, [
                re(qe, {
                  "template-type": me.value,
                  onUpdate: Ae
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: we
                }, [
                  k[8] || (k[8] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(H, null, K(c(it), (P) => (a(), n("option", {
                    key: P.id,
                    value: P.id
                  }, h(P.label), 9, $u))), 128))
                ], 32)
              ])
            ]),
            re(vu, {
              message: c(m).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: c(L),
              onReset: k[0] || (k[0] = (P) => c(R)({ email_blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", xu, [
          c(m).audience.test_mode ? (a(), n("div", Cu, [...k[10] || (k[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            Q(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", Su, [
            e("div", Iu, [
              e("label", Uu, [
                k[12] || (k[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ie(e("select", {
                  "onUpdate:modelValue": k[1] || (k[1] = (P) => U.value = P),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  k[11] || (k[11] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(H, null, K(c(Ve), (P) => (a(), n("option", {
                    key: P.id,
                    value: P.id
                  }, h(P.label), 9, Ru))), 128))
                ], 512), [
                  [Me, U.value]
                ])
              ])
            ]),
            e("div", Au, [
              e("button", {
                type: "button",
                class: de(["kb-email-device-btn", { "kb-email-device-btn--active": G.value === "desktop" }]),
                onClick: k[2] || (k[2] = (P) => G.value = "desktop")
              }, [...k[13] || (k[13] = [
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
                Q(" Desktop ", -1)
              ])], 2),
              e("button", {
                type: "button",
                class: de(["kb-email-device-btn", { "kb-email-device-btn--active": G.value === "mobile" }]),
                onClick: k[3] || (k[3] = (P) => G.value = "mobile")
              }, [...k[14] || (k[14] = [
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
                Q(" Mobile ", -1)
              ])], 2)
            ]),
            e("div", {
              class: de(["kb-email-preview-frame", { "kb-email-preview-frame--mobile": G.value === "mobile" }])
            }, [
              e("div", Bu, [
                e("div", Lu, [
                  e("span", Tu, h(Re.value), 1),
                  e("span", Pu, "<" + h(T.value) + ">", 1)
                ]),
                e("div", Vu, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: ue.value || "No subject"
                  }, h(ue.value || "No subject"), 9, Eu),
                  D.value ? (a(), n("span", Mu, " — " + h(D.value), 1)) : w("", !0)
                ])
              ]),
              e("div", Ou, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: z.value
                }, null, 8, Nu)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", Du, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: k[4] || (k[4] = (P) => o("duplicate", JSON.parse(JSON.stringify(c(m)))))
        }, " Duplicate ")) : w("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: Ce
        }, " Save ")) : w("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-email-action kb-email-action--primary",
          onClick: k[5] || (k[5] = (P) => o("edit"))
        }, " Close ")) : w("", !0)
      ]),
      se.value ? (a(), n("div", zu, [
        e("div", Hu, [
          k[15] || (k[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          k[16] || (k[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Wu, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: k[6] || (k[6] = (P) => {
                se.value = !1, ne.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: k[7] || (k[7] = (P) => ne.value && fe(ne.value))
            }, "Replace")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), kt = /* @__PURE__ */ ie(Fu, [["__scopeId", "data-v-a429d223"]]), ju = { class: "kb-shell" }, Ku = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, qu = ["aria-selected", "onClick"], Yu = { class: "kb-shell__meta" }, Ju = ["href"], Gu = { class: "kb-shell__body" }, Qu = /* @__PURE__ */ le({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(s, { emit: d }) {
    const i = d, r = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (o, m) => (a(), n("div", ju, [
      e("header", {
        class: "kb-shell__header",
        style: te({ padding: `${c(j)[12]}px ${c(j)[24]}px`, borderBottom: `1px solid ${c(X).neutral.border}`, background: c(X).neutral.bg })
      }, [
        m[0] || (m[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", Ku, [
          (a(), n(H, null, K(r, (v) => e("button", {
            key: v.id,
            type: "button",
            class: de(["kb-shell__channel", { "kb-shell__channel--active": s.channel === v.id }]),
            role: "tab",
            "aria-selected": s.channel === v.id,
            onClick: (p) => i("switch-channel", v.id)
          }, h(v.label), 11, qu)), 64))
        ]),
        e("div", Yu, [
          s.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: te({ padding: "2px 8px", borderRadius: `${c($e).input}px`, fontSize: "0.75rem", background: c(X).neutral.bg, color: c(X).neutral.textMuted })
          }, h(s.environment), 5)) : w("", !0),
          s.helpUrl ? (a(), n("a", {
            key: 1,
            href: s.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: te({ color: c(X).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Ju)) : w("", !0)
        ])
      ], 4),
      e("div", Gu, [
        Be(o.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Xu = /* @__PURE__ */ ie(Qu, [["__scopeId", "data-v-0df30803"]]), Zu = {
  class: "kb-outline",
  "aria-label": "Sections"
}, ec = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, tc = ["onClick"], sc = /* @__PURE__ */ le({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(s) {
    var m;
    const d = s, i = J(((m = d.items[0]) == null ? void 0 : m.id) ?? "");
    let r = null;
    function o(v) {
      const p = document.getElementById(v);
      p && p.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return Ne(() => {
      const v = d.scrollContainerId ? document.getElementById(d.scrollContainerId) : document;
      v && (r = new IntersectionObserver(
        (p) => {
          for (const y of p)
            if (y.isIntersecting) {
              const L = y.target.getAttribute("data-outline-id");
              L && (i.value = L);
            }
        },
        { root: v === document ? null : v, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), d.items.forEach((p) => {
        const y = document.getElementById(p.id);
        y && (r == null || r.observe(y));
      }));
    }), De(() => {
      r == null || r.disconnect();
    }), ye(
      () => d.items,
      (v) => {
        v.length && !i.value && (i.value = v[0].id);
      },
      { immediate: !0 }
    ), (v, p) => (a(), n("nav", Zu, [
      e("ul", ec, [
        (a(!0), n(H, null, K(s.items, (y) => (a(), n("li", {
          key: y.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: de(["kb-outline__btn", { "kb-outline__btn--active": i.value === y.id }]),
            style: te({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${c(j)[8]}px ${c(j)[12]}px`,
              border: "none",
              borderRadius: `${c($e).input}px`,
              background: i.value === y.id ? c(X).neutral.bg : "transparent",
              color: i.value === y.id ? "#0f172a" : c(X).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: i.value === y.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (L) => o(y.id)
          }, h(y.label), 15, tc)
        ]))), 128))
      ])
    ]));
  }
}), ac = /* @__PURE__ */ ie(sc, [["__scopeId", "data-v-25c37675"]]), nc = ["id"], lc = {
  key: 1,
  class: "kb-form-shell__head"
}, oc = /* @__PURE__ */ le({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(s) {
    return (d, i) => (a(), n("div", {
      class: "kb-form-shell",
      id: s.sectionId ?? void 0,
      style: te({
        padding: `${c(j)[24]}px ${c(j)[24]}px ${c(j)[32]}px`,
        marginBottom: 0
      })
    }, [
      s.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: te({ marginBottom: c(j)[24], paddingBottom: c(j)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: te({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: c(j)[12] })
        }, h(s.label), 5),
        Be(d.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", lc, [
        Be(d.$slots, "head", {}, void 0, !0)
      ])),
      Be(d.$slots, "default", {}, void 0, !0)
    ], 12, nc));
  }
}), ic = /* @__PURE__ */ ie(oc, [["__scopeId", "data-v-6504df41"]]), rc = /* @__PURE__ */ le({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(s) {
    return (d, i) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: te({
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
      Be(d.$slots, "default")
    ], 4));
  }
}), dc = /* @__PURE__ */ le({
  __name: "BuilderTopShell",
  setup(s) {
    return (d, i) => (a(), n("div", {
      class: "kb-top-shell",
      style: te({
        marginLeft: c(j)[24],
        marginRight: c(j)[24]
      })
    }, [
      Be(d.$slots, "header"),
      Be(d.$slots, "errors"),
      Be(d.$slots, "warnings"),
      Be(d.$slots, "default")
    ], 4));
  }
});
function uc(s) {
  s.component("KeosNotificationBuilder", yt), s.component("KeosWhatsAppBuilder", ft), s.component("KeosSmsBuilder", ht), s.component("KeosEmailBuilder", kt), s.component("BuilderShell", Xu), s.component("BuilderOutline", ac), s.component("BuilderVersionHistoryModal", gt), s.component("BuilderFormShell", ic), s.component("BuilderActionsBar", rc), s.component("BuilderTopShell", dc);
}
const pc = {
  install: uc,
  KeosNotificationBuilder: yt,
  KeosWhatsAppBuilder: ft,
  KeosSmsBuilder: ht,
  KeosEmailBuilder: kt
};
export {
  rc as BuilderActionsBar,
  ic as BuilderFormShell,
  ac as BuilderOutline,
  Xu as BuilderShell,
  dc as BuilderTopShell,
  gt as BuilderVersionHistoryModal,
  Ve as DEFAULT_SAMPLE_PROFILES,
  kt as KeosEmailBuilder,
  yt as KeosNotificationBuilder,
  ht as KeosSmsBuilder,
  ft as KeosWhatsAppBuilder,
  pc as default,
  uc as install,
  Te as renderTemplatePreview,
  je as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
