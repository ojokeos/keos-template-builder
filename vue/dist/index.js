import { ref as J, computed as I, watch as ye, defineComponent as le, openBlock as s, createElementBlock as n, normalizeStyle as te, unref as c, createElementVNode as e, Fragment as H, renderList as q, toDisplayString as h, createTextVNode as Q, createCommentVNode as w, normalizeClass as de, withDirectives as Ie, vModelSelect as Oe, vModelText as Ge, vModelCheckbox as _t, createStaticVNode as Ne, withKeys as wt, onMounted as De, onUnmounted as ze, createVNode as re, createBlock as $t, renderSlot as Le } from "vue";
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
    title_template: "",
    body_template: "",
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
function Ut(a) {
  return {
    schema_version: ct,
    name: "",
    status: "draft",
    audience: Qe(),
    message: Xe(),
    delivery: Ze(),
    tracking: et(),
    ...a
  };
}
function pt(a) {
  const r = a;
  return r.schema_version || (r.schema_version = ct), r.audience || (r.audience = Qe()), r.message || (r.message = Xe()), r.delivery || (r.delivery = Ze()), r.tracking || (r.tracking = et()), ut.includes(r.delivery.priority) || (r.delivery.priority = dt), It.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const Rt = 1e5;
function At(a, r) {
  var o, m, v;
  const i = [], d = r ?? a.audience.estimated_reach;
  return d !== void 0 && d >= Rt && i.push({
    message: `Estimated reach is very high (${d.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), a.tracking && !((o = a.tracking.campaign_name) != null && o.trim()) && !((m = a.name) != null && m.trim()) && i.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (v = a.message.deep_link) != null && v.trim() || i.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), i;
}
function Be(a, r = "error") {
  return { message: a, severity: r };
}
function mt(a) {
  var i, d, o, m, v, p;
  const r = [];
  return a.schema_version || r.push(Be("Missing schema_version")), (i = a.name) != null && i.trim() || r.push(Be("Template name is required")), (d = a.message.title_template) != null && d.trim() || r.push(Be("Title is required")), (o = a.message.body_template) != null && o.trim() || r.push(Be("Message body is required")), a.audience.type === "topic" && !((m = a.audience.topic_name) != null && m.trim()) && r.push(Be("Topic name is required when targeting by topic")), a.audience.platforms.length === 0 && r.push(Be("At least one platform (iOS, Android, Web) must be selected")), a.tracking && !((v = a.tracking.campaign_name) != null && v.trim()) && !((p = a.name) != null && p.trim()) && r.push(Be("Campaign name is required for tracking")), a.delivery.ttl_seconds <= 0 && r.push(Be("TTL must be greater than 0")), {
    valid: r.length === 0,
    errors: r
  };
}
function Bt(a, r) {
  const i = mt(a), d = At(a, r);
  return {
    valid: i.valid,
    errors: [
      ...i.errors,
      ...d.map((o) => Be(o.message, o.severity))
    ]
  };
}
function Lt(a) {
  return a.errors.filter((r) => r.severity === "error");
}
function Tt(a) {
  return a.errors.filter((r) => r.severity !== "error");
}
function Ee(a, r) {
  return a.length <= r ? { text: a, truncated: !1 } : { text: a.slice(0, Math.max(0, r - 3)) + "...", truncated: !0 };
}
const He = We.android;
function Pt(a) {
  const { title: r, body: i } = a, d = Ee(r || "", He.title), o = Ee(i || "", He.body);
  return {
    title: d.text,
    body: o.text,
    imageUrl: a.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: o.truncated,
    expanded: !1
  };
}
function Et(a) {
  const { title: r, body: i } = a, d = Ee(r || "", He.title), o = Ee(i || "", He.body);
  return {
    title: d.text,
    body: o.text,
    imageUrl: a.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: o.truncated,
    expanded: !0
  };
}
function Vt(a, r = {}) {
  const i = r.expanded ? Et(a) : Pt(a);
  return r.darkMode !== void 0 && (i.darkMode = r.darkMode), i;
}
const tt = We.ios;
function vt(a) {
  const { title: r, body: i } = a, d = Ee(r || "", tt.title), o = Ee(i || "", tt.body);
  return {
    title: d.text,
    body: o.text,
    imageUrl: a.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: o.truncated,
    expanded: !1
  };
}
function Mt(a) {
  return vt(a);
}
function Ot(a, r = {}) {
  const i = r.variant === "lockscreen" ? Mt(a) : vt(a);
  return r.darkMode !== void 0 && (i.darkMode = r.darkMode), i;
}
const at = We.web;
function st(a) {
  const { title: r, body: i } = a, d = Ee(r || "", at.title), o = Ee(i || "", at.body);
  return {
    title: d.text,
    body: o.text,
    imageUrl: a.imageUrl,
    titleTruncated: d.truncated,
    bodyTruncated: o.truncated
  };
}
function Je(a) {
  return JSON.parse(JSON.stringify(a));
}
function Fe(a = {}) {
  const r = J(
    pt(a.initial ?? Ut())
  ), i = a.hooks ?? {}, d = J(!1), o = J([]), m = J([]);
  function v() {
    const U = Je(r.value);
    o.value = [...o.value.slice(-19), U], m.value = [];
  }
  const p = I(() => o.value.length > 0), y = I(() => m.value.length > 0);
  function L() {
    o.value.length !== 0 && (m.value = [Je(r.value), ...m.value], r.value = o.value[o.value.length - 1], o.value = o.value.slice(0, -1));
  }
  function Y() {
    m.value.length !== 0 && (o.value = [...o.value, Je(r.value)], r.value = m.value[0], m.value = m.value.slice(1));
  }
  ye(
    r,
    () => {
      var U;
      d.value = !0, (U = a.onDirty) == null || U.call(a);
    },
    { deep: !0 }
  );
  const N = I(() => mt(r.value));
  function $(U) {
    const ae = Bt(r.value, U);
    return {
      ...ae,
      blockingErrors: Lt(ae),
      warnings: Tt(ae),
      valid: ae.valid
    };
  }
  function M(U) {
    v(), r.value = { ...r.value, ...U };
  }
  function R(U) {
    v(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...U }
    };
  }
  function W(U) {
    v(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...U }
    };
  }
  function A(U) {
    v(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...U }
    };
  }
  function f(U) {
    v(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...U } : { campaign_name: "", tags: [], ab_test: !1, ...U }
    };
  }
  function ee(U) {
    v(), r.value = {
      ...r.value,
      message: { ...Xe(), ...U }
    };
  }
  function pe(U) {
    v(), r.value = {
      ...r.value,
      delivery: { ...Ze(), ...U }
    };
  }
  function oe(U) {
    v(), r.value = {
      ...r.value,
      tracking: { ...et(), ...U }
    };
  }
  function me(U) {
    v(), r.value = {
      ...r.value,
      audience: { ...Qe(), ...U }
    };
  }
  const be = I(() => ({
    title: r.value.message.title_template,
    body: r.value.message.body_template,
    imageUrl: r.value.message.image_url
  }));
  function _e(U, ae) {
    const ne = be.value;
    let S;
    switch (U) {
      case "android":
        S = Vt(ne, { expanded: ae == null ? void 0 : ae.expanded });
        break;
      case "ios":
        S = Ot(ne);
        break;
      case "web":
        S = st(ne);
        break;
      default:
        S = st(ne);
    }
    const fe = r.value.message.actions ?? [];
    return { ...S, actions: fe };
  }
  const ke = We;
  async function ve() {
    return i.customValidators ? i.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: d,
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
    resetDelivery: pe,
    resetTracking: oe,
    resetAudience: me,
    getPreview: _e,
    previewInput: be,
    characterLimits: ke,
    runCustomValidators: ve,
    hooks: i
  };
}
const Nt = "keos-draft", Dt = 2e3;
function zt(a, r) {
  return `${Nt}-${a}-${r}`;
}
function je(a, r) {
  const i = r.channel, d = I(
    () => {
      var Y, N;
      return zt(
        i,
        r.key ?? ((Y = a.value) == null ? void 0 : Y.id) ?? ((N = a.value) == null ? void 0 : N.name) ?? "draft"
      );
    }
  ), o = J(null);
  let m = null;
  function v() {
    try {
      const Y = JSON.stringify(a.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(d.value, Y), o.value = /* @__PURE__ */ new Date());
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
      const Y = window.localStorage.getItem(d.value);
      if (!Y) return null;
      const N = JSON.parse(Y);
      return pt(N);
    } catch {
      return null;
    }
  }
  function L() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return ye(
    a,
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
const Ht = { class: "kb-header__row" }, Wt = ["value"], Ft = { class: "kb-header__actions" }, jt = ["disabled"], qt = ["disabled"], Kt = ["value"], Yt = ["value"], Jt = /* @__PURE__ */ le({
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
  setup(a, { emit: r }) {
    const i = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], d = r;
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
    return (v, p) => (s(), n("header", {
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
          value: a.campaignName,
          placeholder: "Name this campaign (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: p[0] || (p[0] = (y) => d("update:campaignName", y.target.value)),
          "aria-label": "Campaign name"
        }, null, 40, Wt),
        e("div", Ft, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !a.canUndo,
            onClick: p[1] || (p[1] = (y) => d("undo"))
          }, " Undo ", 8, jt),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !a.canRedo,
            onClick: p[2] || (p[2] = (y) => d("redo"))
          }, " Redo ", 8, qt)
        ]),
        a.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: a.workflowStatus,
          class: "kb-header__status-select",
          style: te({
            padding: `${c(j)[4]}px ${c(j)[8]}px`,
            borderRadius: `${c($e).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...m(a.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: p[3] || (p[3] = (y) => d("update:workflowStatus", y.target.value))
        }, [
          (s(), n(H, null, q(i, (y) => e("option", {
            key: y.value,
            value: y.value
          }, h(y.label), 9, Yt)), 64))
        ], 44, Kt)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: te({
            padding: `${c(j)[4]}px ${c(j)[8]}px`,
            borderRadius: `${c($e).input}px`,
            background: c(X).neutral.bg,
            fontSize: "0.8125rem",
            color: c(X).neutral.textMuted
          })
        }, h(a.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: te({ fontSize: "0.8125rem", color: c(X).neutral.textMuted, marginTop: `${c(j)[4]}px` })
      }, [
        a.saving ? (s(), n(H, { key: 0 }, [
          Q("Saving…")
        ], 64)) : a.dirty ? (s(), n(H, { key: 1 }, [
          Q("Unsaved changes")
        ], 64)) : a.lastSavedAt ? (s(), n(H, { key: 2 }, [
          Q("Last saved at " + h(o(a.lastSavedAt)), 1)
        ], 64)) : w("", !0)
      ], 4)
    ], 4));
  }
}), ie = (a, r) => {
  const i = a.__vccOpts || a;
  for (const [d, o] of r)
    i[d] = o;
  return i;
}, qe = /* @__PURE__ */ ie(Jt, [["__scopeId", "data-v-bf624780"]]), Gt = { class: "kb-section" }, Qt = { class: "kb-section__head" }, Xt = { class: "kb-section__desc" }, Zt = { class: "kb-field" }, ea = { class: "kb-label" }, ta = { class: "kb-field-with-rail" }, aa = ["value", "aria-invalid", "aria-describedby"], sa = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, na = { class: "kb-field" }, la = { class: "kb-label" }, oa = { class: "kb-field-with-rail" }, ia = ["value", "aria-invalid", "aria-describedby"], ra = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, da = { class: "kb-field" }, ua = ["value", "aria-invalid", "aria-describedby"], ca = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, pa = { class: "kb-field" }, ma = ["value", "aria-invalid", "aria-describedby"], va = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, ba = { class: "kb-field" }, ga = { class: "kb-actions-list" }, ya = ["value", "onInput"], fa = ["value", "onInput"], ha = ["onClick"], ka = ["disabled"], _a = { class: "kb-action-chips" }, wa = ["disabled", "onClick"], $a = /* @__PURE__ */ le({
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
    const r = a;
    return (i, d) => (s(), n("section", Gt, [
      e("div", Qt, [
        d[6] || (d[6] = e("h3", { class: "kb-section__title" }, "Message", -1)),
        a.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: d[0] || (d[0] = (o) => i.$emit("reset"))
        }, " Reset section ")) : w("", !0)
      ]),
      e("p", Xt, " Title and body are required. Character limits depend on the selected platform (" + h(a.selectedPlatform) + "). ", 1),
      e("div", Zt, [
        e("label", ea, [
          d[7] || (d[7] = Q(" Title ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": a.titleCount > a.titleLimit }])
          }, h(a.titleCount) + "/" + h(a.titleLimit), 3)
        ]),
        e("div", ta, [
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Notification title",
            value: a.message.title_template,
            "aria-invalid": !!a.titleError,
            "aria-describedby": a.titleError ? "title-error" : void 0,
            onInput: d[1] || (d[1] = (o) => i.$emit("update", { title_template: o.target.value }))
          }, null, 40, aa),
          e("div", {
            class: "kb-char-rail",
            role: "presentation",
            style: te({ "--pct": Math.min(100, a.titleCount / a.titleLimit * 100) + "%" })
          }, [...d[8] || (d[8] = [
            e("div", { class: "kb-char-rail__fill" }, null, -1)
          ])], 4)
        ]),
        a.titleError ? (s(), n("p", sa, h(a.titleError), 1)) : w("", !0)
      ]),
      e("div", na, [
        e("label", la, [
          d[9] || (d[9] = Q(" Message ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": a.bodyCount > a.bodyLimit }])
          }, h(a.bodyCount) + "/" + h(a.bodyLimit), 3)
        ]),
        e("div", oa, [
          e("textarea", {
            class: "kb-textarea",
            rows: "3",
            placeholder: "Notification body",
            value: a.message.body_template,
            "aria-invalid": !!a.bodyError,
            "aria-describedby": a.bodyError ? "body-error" : void 0,
            onInput: d[2] || (d[2] = (o) => i.$emit("update", { body_template: o.target.value }))
          }, null, 40, ia),
          e("div", {
            class: "kb-char-rail",
            role: "presentation",
            style: te({ "--pct": Math.min(100, a.bodyCount / a.bodyLimit * 100) + "%" })
          }, [...d[10] || (d[10] = [
            e("div", { class: "kb-char-rail__fill" }, null, -1)
          ])], 4)
        ]),
        a.bodyError ? (s(), n("p", ra, h(a.bodyError), 1)) : w("", !0)
      ]),
      e("div", da, [
        d[11] || (d[11] = e("label", { class: "kb-label" }, [
          Q(" Media (image URL) "),
          e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: a.message.image_url,
          "aria-invalid": !!a.imageUrlError,
          "aria-describedby": a.imageUrlError ? "image-url-error" : void 0,
          onInput: d[3] || (d[3] = (o) => i.$emit("update", { image_url: o.target.value || void 0 }))
        }, null, 40, ua),
        a.imageUrlError ? (s(), n("p", ca, h(a.imageUrlError), 1)) : w("", !0)
      ]),
      e("div", pa, [
        d[12] || (d[12] = e("label", { class: "kb-label" }, [
          Q(" Deep link / Action URL "),
          e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https:// or app://...",
          value: a.message.deep_link,
          "aria-invalid": !!a.deepLinkError,
          "aria-describedby": a.deepLinkError ? "deeplink-error" : void 0,
          onInput: d[4] || (d[4] = (o) => i.$emit("update", { deep_link: o.target.value || void 0 }))
        }, null, 40, ma),
        a.deepLinkError ? (s(), n("p", va, h(a.deepLinkError), 1)) : w("", !0)
      ]),
      e("div", ba, [
        d[14] || (d[14] = e("label", { class: "kb-label" }, [
          Q(" Actions (optional) "),
          e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
        ], -1)),
        e("div", ga, [
          (s(!0), n(H, null, q(r.message.actions ?? [], (o, m) => (s(), n("div", {
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
                const p = [...r.message.actions ?? []], y = Number(m);
                p[y] = {
                  ...p[y],
                  id: ((L = p[y]) == null ? void 0 : L.id) || `action_${y + 1}`,
                  label: v.target.value
                }, i.$emit("update", { actions: p });
              }
            }, null, 40, ya),
            e("input", {
              type: "url",
              class: "kb-input kb-input--action-url",
              placeholder: "Optional deep link (https:// or app://)",
              value: o.url,
              onInput: (v) => {
                var L;
                const p = [...r.message.actions ?? []], y = Number(m);
                p[y] = {
                  ...p[y],
                  id: ((L = p[y]) == null ? void 0 : L.id) || `action_${y + 1}`,
                  url: v.target.value || void 0
                }, i.$emit("update", { actions: p });
              }
            }, null, 40, fa),
            e("button", {
              type: "button",
              class: "kb-btn-remove-action",
              onClick: () => {
                const v = [...r.message.actions ?? []];
                v.splice(Number(m), 1), i.$emit("update", { actions: v });
              }
            }, " Remove ", 8, ha)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-btn-add-action",
            disabled: (r.message.actions ?? []).length >= 3,
            onClick: d[5] || (d[5] = () => {
              const o = [...r.message.actions ?? []];
              o.push({
                id: `action_${o.length + 1}`,
                label: "",
                url: ""
              }), i.$emit("update", { actions: o });
            })
          }, " Add action ", 8, ka),
          e("div", _a, [
            d[13] || (d[13] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
            (s(), n(H, null, q(["View order", "Track shipment", "Open app"], (o) => e("button", {
              key: o,
              type: "button",
              class: "kb-action-chip",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: () => {
                const m = [...r.message.actions ?? []];
                m.push({
                  id: `action_${Date.now()}`,
                  label: o,
                  url: ""
                }), i.$emit("update", { actions: m });
              }
            }, h(o), 9, wa)), 64))
          ])
        ])
      ])
    ]));
  }
}), xa = /* @__PURE__ */ ie($a, [["__scopeId", "data-v-59cdf63d"]]), Ca = { class: "kb-section kb-section--inline-personalization" }, Sa = { class: "kb-field" }, Ia = { class: "kb-insert-row" }, Ua = ["value"], Ra = { class: "kb-field" }, Aa = { class: "kb-insert-row" }, Ba = { class: "kb-field" }, La = { class: "kb-variable-list" }, Ta = /* @__PURE__ */ le({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(a, { emit: r }) {
    const i = a, d = r, o = ["first_name", "last_name", "order_id", "city"], m = J(i.variableOptions ?? o), v = J(m.value[0] ?? o[0]), p = J("");
    ye(
      () => i.variableOptions,
      (N) => {
        N && N.length && (m.value = [...N], m.value.includes(v.value) || (v.value = m.value[0]));
      }
    );
    const y = I(() => m.value);
    function L(N) {
      d("insertVariable", { variable: v.value, field: N });
    }
    function Y() {
      const N = p.value.trim();
      N && (m.value.includes(N) || (m.value = [...m.value, N]), v.value = N, p.value = "");
    }
    return (N, $) => (s(), n("section", Ca, [
      $[8] || ($[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      $[9] || ($[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Sa, [
        $[4] || ($[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ia, [
          Ie(e("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (M) => v.value = M),
            class: "kb-select"
          }, [
            (s(!0), n(H, null, q(y.value, (M) => (s(), n("option", {
              key: M,
              value: M
            }, h(M), 9, Ua))), 128))
          ], 512), [
            [Oe, v.value]
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
      e("div", Ra, [
        $[5] || ($[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Aa, [
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
      e("div", Ba, [
        $[6] || ($[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        $[7] || ($[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", La, [
          (s(!0), n(H, null, q(y.value, (M) => (s(), n("li", { key: M }, [
            e("code", null, "{{ " + h(M) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), bt = /* @__PURE__ */ ie(Ta, [["__scopeId", "data-v-6d49f6dc"]]), Pa = { class: "kb-section kb-section--template-type" }, Ea = { class: "kb-field" }, Va = { class: "kb-radio-group" }, Ma = { class: "kb-radio" }, Oa = ["checked"], Na = { class: "kb-radio" }, Da = ["checked"], za = /* @__PURE__ */ le({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(a, { emit: r }) {
    const i = r;
    return (d, o) => (s(), n("section", Pa, [
      o[5] || (o[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      o[6] || (o[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Ea, [
        e("div", Va, [
          e("label", Ma, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: a.templateType === "transactional",
              onChange: o[0] || (o[0] = (m) => i("update", "transactional"))
            }, null, 40, Oa),
            o[2] || (o[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Na, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: a.templateType === "marketing",
              onChange: o[1] || (o[1] = (m) => i("update", "marketing"))
            }, null, 40, Da),
            o[3] || (o[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        o[4] || (o[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), Ke = /* @__PURE__ */ ie(za, [["__scopeId", "data-v-991f74e5"]]), Ha = { class: "kb-section" }, Wa = { class: "kb-section__head" }, Fa = { class: "kb-section__desc" }, ja = { class: "kb-field" }, qa = { class: "kb-radio-group" }, Ka = { class: "kb-radio" }, Ya = ["checked"], Ja = { class: "kb-radio" }, Ga = ["checked"], Qa = {
  key: 0,
  class: "kb-field kb-row"
}, Xa = ["value"], Za = ["value"], es = { class: "kb-field" }, ts = ["value"], as = ["value"], ss = { class: "kb-field" }, ns = ["value"], ls = ["value"], os = { class: "kb-field" }, is = { class: "kb-checkbox" }, rs = ["checked"], ds = /* @__PURE__ */ le({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a) {
    const r = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (i, d) => {
      var o;
      return s(), n("section", Ha, [
        e("div", Wa, [
          d[8] || (d[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          a.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: d[0] || (d[0] = (m) => i.$emit("reset"))
          }, " Reset section ")) : w("", !0)
        ]),
        e("p", Fa, h(a.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ja, [
          d[11] || (d[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", qa, [
            e("label", Ka, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !a.delivery.scheduled_at,
                onChange: d[1] || (d[1] = (m) => i.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, Ya),
              d[9] || (d[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", Ja, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!a.delivery.scheduled_at,
                onChange: d[2] || (d[2] = (m) => i.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, Ga),
              d[10] || (d[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        a.delivery.scheduled_at ? (s(), n("div", Qa, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (o = a.delivery.scheduled_at) == null ? void 0 : o.slice(0, 16),
            onInput: d[3] || (d[3] = (m) => i.$emit("update", { scheduled_at: m.target.value }))
          }, null, 40, Xa),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: a.delivery.timezone,
            onInput: d[4] || (d[4] = (m) => i.$emit("update", { timezone: m.target.value }))
          }, null, 40, Za)
        ])) : w("", !0),
        a.showPushOptions ? (s(), n(H, { key: 1 }, [
          e("div", es, [
            d[12] || (d[12] = e("label", { class: "kb-label" }, [
              Q(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.ttl_seconds,
              onChange: d[5] || (d[5] = (m) => i.$emit("update", { ttl_seconds: Number(m.target.value) }))
            }, [
              (s(!0), n(H, null, q(c(St), (m) => (s(), n("option", {
                key: m,
                value: m
              }, h(r[m] ?? m + "s"), 9, as))), 128))
            ], 40, ts)
          ]),
          e("div", ss, [
            d[13] || (d[13] = e("label", { class: "kb-label" }, [
              Q(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: a.delivery.priority,
              onChange: d[6] || (d[6] = (m) => i.$emit("update", { priority: m.target.value }))
            }, [
              (s(!0), n(H, null, q(c(ut), (m) => (s(), n("option", {
                key: m,
                value: m
              }, h(m), 9, ls))), 128))
            ], 40, ns)
          ]),
          e("div", os, [
            e("label", is, [
              e("input", {
                type: "checkbox",
                checked: a.delivery.quiet_hours_respected,
                onChange: d[7] || (d[7] = (m) => i.$emit("update", { quiet_hours_respected: !a.delivery.quiet_hours_respected }))
              }, null, 40, rs),
              d[14] || (d[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : w("", !0)
      ]);
    };
  }
}), us = /* @__PURE__ */ ie(ds, [["__scopeId", "data-v-aacf1acb"]]), cs = { class: "kb-accordion" }, ps = { class: "kb-accordion__body" }, ms = { class: "kb-field" }, vs = ["value"], bs = { class: "kb-field" }, gs = { class: "kb-checkbox" }, ys = ["checked"], fs = /* @__PURE__ */ le({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(a) {
    return (r, i) => (s(), n("details", cs, [
      i[4] || (i[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", ps, [
        e("div", ms, [
          i[2] || (i[2] = e("label", { class: "kb-label" }, [
            Q(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: a.delivery.collapse_key,
            onInput: i[0] || (i[0] = (d) => r.$emit("update", { collapse_key: d.target.value || void 0 }))
          }, null, 40, vs)
        ]),
        e("div", bs, [
          e("label", gs, [
            e("input", {
              type: "checkbox",
              checked: a.delivery.silent_push,
              onChange: i[1] || (i[1] = (d) => r.$emit("update", { silent_push: !a.delivery.silent_push }))
            }, null, 40, ys),
            i[3] || (i[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), hs = /* @__PURE__ */ ie(fs, [["__scopeId", "data-v-e0f5c559"]]);
function Pe(a, r) {
  return !a || typeof a != "string" ? a : a.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (i, d) => {
    const o = d.trim();
    return o in r ? String(r[o]) : `{{ ${d} }}`;
  });
}
const Ve = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], ks = { class: "kb-preview" }, _s = {
  key: 0,
  class: "kb-preview__toggle"
}, ws = { class: "kb-checkbox" }, $s = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, xs = { class: "kb-android-body" }, Cs = {
  key: 0,
  class: "kb-android-title"
}, Ss = {
  key: 1,
  class: "kb-android-text"
}, Is = {
  key: 2,
  class: "kb-android-image"
}, Us = ["src"], Rs = {
  key: 3,
  class: "kb-android-actions"
}, As = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, Bs = { class: "kb-ios-banner" }, Ls = { class: "kb-ios-content" }, Ts = {
  key: 0,
  class: "kb-ios-title"
}, Ps = {
  key: 1,
  class: "kb-ios-text"
}, Es = {
  key: 2,
  class: "kb-ios-actions"
}, Vs = {
  key: 0,
  class: "kb-ios-thumb"
}, Ms = ["src"], Os = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, Ns = { class: "kb-web-toast" }, Ds = { class: "kb-web-body" }, zs = {
  key: 0,
  class: "kb-web-title"
}, Hs = {
  key: 1,
  class: "kb-web-text"
}, Ws = {
  key: 2,
  class: "kb-web-image"
}, Fs = ["src"], js = {
  key: 0,
  class: "kb-web-actions"
}, qs = /* @__PURE__ */ le({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(a) {
    const r = a, i = J(!1), d = I(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? i.value : void 0
      })
    ), o = I(() => {
      const m = d.value;
      return r.previewProfile ? {
        ...m,
        title: Pe((m == null ? void 0 : m.title) ?? "", r.previewProfile.data),
        body: Pe((m == null ? void 0 : m.body) ?? "", r.previewProfile.data)
      } : m;
    });
    return (m, v) => (s(), n("div", ks, [
      a.selectedPlatform === "android" ? (s(), n("div", _s, [
        e("label", ws, [
          Ie(e("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (p) => i.value = p),
            type: "checkbox"
          }, null, 512), [
            [_t, i.value]
          ]),
          v[1] || (v[1] = e("span", null, "Expanded notification", -1))
        ])
      ])) : w("", !0),
      a.selectedPlatform === "android" ? (s(), n("div", $s, [
        v[3] || (v[3] = e("div", { class: "kb-android-status-bar" }, [
          e("span", { class: "kb-android-time" }, "12:30"),
          e("span", { class: "kb-android-icons" }, "  ")
        ], -1)),
        e("div", {
          class: de(["kb-android-notification", { "kb-android-notification--expanded": i.value }])
        }, [
          v[2] || (v[2] = Ne('<div class="kb-android-header" data-v-539e2af6><div class="kb-android-app-icon" data-v-539e2af6>A</div><div class="kb-android-app-meta" data-v-539e2af6><div class="kb-android-app-name" data-v-539e2af6>Your App</div><div class="kb-android-app-channel" data-v-539e2af6>Promotions · now</div></div><div class="kb-android-more" data-v-539e2af6>⋮</div></div>', 1)),
          e("div", xs, [
            o.value.title ? (s(), n("div", Cs, h(o.value.title), 1)) : w("", !0),
            o.value.body ? (s(), n("div", Ss, h(o.value.body), 1)) : w("", !0),
            o.value.imageUrl ? (s(), n("div", Is, [
              e("img", {
                src: o.value.imageUrl,
                alt: ""
              }, null, 8, Us)
            ])) : w("", !0),
            o.value.actions && o.value.actions.length ? (s(), n("div", Rs, [
              (s(!0), n(H, null, q(o.value.actions, (p) => (s(), n("button", {
                key: p.id,
                type: "button",
                class: "kb-android-action-btn"
              }, h(p.label || "Action"), 1))), 128))
            ])) : w("", !0)
          ])
        ], 2)
      ])) : a.selectedPlatform === "ios" ? (s(), n("div", As, [
        v[6] || (v[6] = e("div", { class: "kb-ios-status-bar" }, [
          e("span", { class: "kb-ios-time" }, "9:41"),
          e("span", { class: "kb-ios-indicators" }, "•••")
        ], -1)),
        e("div", Bs, [
          v[5] || (v[5] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
          e("div", Ls, [
            v[4] || (v[4] = e("div", { class: "kb-ios-meta" }, [
              e("span", { class: "kb-ios-app-name" }, "Your App"),
              e("span", { class: "kb-ios-time-label" }, "now")
            ], -1)),
            o.value.title ? (s(), n("div", Ts, h(o.value.title), 1)) : w("", !0),
            o.value.body ? (s(), n("div", Ps, h(o.value.body), 1)) : w("", !0),
            o.value.actions && o.value.actions.length ? (s(), n("div", Es, [
              (s(!0), n(H, null, q(o.value.actions, (p) => (s(), n("button", {
                key: p.id,
                type: "button",
                class: "kb-ios-action-btn"
              }, h(p.label || "Action"), 1))), 128))
            ])) : w("", !0)
          ]),
          o.value.imageUrl ? (s(), n("div", Vs, [
            e("img", {
              src: o.value.imageUrl,
              alt: ""
            }, null, 8, Ms)
          ])) : w("", !0)
        ])
      ])) : (s(), n("div", Os, [
        v[8] || (v[8] = Ne('<div class="kb-web-browser-chrome" data-v-539e2af6><span class="kb-web-dots" data-v-539e2af6><span data-v-539e2af6></span><span data-v-539e2af6></span><span data-v-539e2af6></span></span><div class="kb-web-url-bar" data-v-539e2af6><span class="kb-web-lock" data-v-539e2af6>🔒</span><span class="kb-web-origin" data-v-539e2af6>yourapp.com</span></div></div>', 1)),
        e("div", Ns, [
          v[7] || (v[7] = Ne('<div class="kb-web-header" data-v-539e2af6><div class="kb-web-site-icon" data-v-539e2af6>Y</div><div class="kb-web-site-meta" data-v-539e2af6><div class="kb-web-site-name" data-v-539e2af6>yourapp.com</div><div class="kb-web-site-time" data-v-539e2af6>now</div></div></div>', 1)),
          e("div", Ds, [
            o.value.title ? (s(), n("div", zs, h(o.value.title), 1)) : w("", !0),
            o.value.body ? (s(), n("div", Hs, h(o.value.body), 1)) : w("", !0),
            o.value.imageUrl ? (s(), n("div", Ws, [
              e("img", {
                src: o.value.imageUrl,
                alt: ""
              }, null, 8, Fs)
            ])) : w("", !0)
          ]),
          o.value.actions && o.value.actions.length ? (s(), n("div", js, [
            (s(!0), n(H, null, q(o.value.actions, (p, y) => (s(), n("button", {
              key: p.id || y,
              type: "button",
              class: de(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(y) > 0 }])
            }, h(p.label || "Action"), 3))), 128))
          ])) : w("", !0)
        ])
      ]))
    ]));
  }
}), Ks = /* @__PURE__ */ ie(qs, [["__scopeId", "data-v-539e2af6"]]), Ys = { class: "kb-version-dialog" }, Js = {
  key: 0,
  class: "kb-version-empty"
}, Gs = {
  key: 1,
  class: "kb-version-list"
}, Qs = { class: "kb-version-item-label" }, Xs = ["onClick"], Zs = { class: "kb-version-actions" }, en = /* @__PURE__ */ le({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(a, { emit: r }) {
    const i = r;
    function d(o) {
      try {
        return new Date(o).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return o;
      }
    }
    return (o, m) => a.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: m[1] || (m[1] = wt((v) => i("close"), ["escape"]))
    }, [
      e("div", Ys, [
        m[2] || (m[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        m[3] || (m[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        a.versions.length === 0 ? (s(), n("div", Js, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", Gs, [
          (s(!0), n(H, null, q(a.versions, (v) => (s(), n("li", {
            key: v.id,
            class: "kb-version-item"
          }, [
            e("span", Qs, h(v.label || d(v.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (p) => {
                i("restore", v.snapshot), i("close");
              }
            }, " Restore ", 8, Xs)
          ]))), 128))
        ])),
        e("div", Zs, [
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
        title_template: "Heads up",
        body_template: "Your update is ready.",
        variables_used: []
      }
    }
  },
  {
    id: "promo-image",
    label: "Promotion with image",
    campaign: {
      message: {
        title_template: "Special offer inside",
        body_template: "Tap to see your exclusive deal.",
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
        title_template: "Order {{ order_id }} update",
        body_template: "Hi {{ first_name }}, your order has shipped.",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "Your appointment is confirmed for tomorrow at 10am.",
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
        title_template: "",
        body_template: "Your code: {{ otp_code }}",
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
        title_template: "",
        body_template: "Hi {{ first_name }}, your order {{ order_id }} has shipped.",
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
        title_template: "",
        body_template: "Flash sale today! Use SAVE20 at checkout. {{ link }}",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
        title_template: "",
        body_template: "",
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
], tn = { class: "keos-notification-builder" }, an = { class: "kb-builder-top" }, sn = { style: { margin: 0, paddingLeft: "1.25rem" } }, nn = { class: "kb-push-layout" }, ln = { class: "kb-push-sidebar" }, on = {
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
  setup(a, { emit: r }) {
    const i = a, d = r, o = J("android"), m = J(""), v = J(!1), p = J(null), y = J(!1), L = I(() => R.value.workflow_status ?? "draft"), Y = I(() => {
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
      updateDelivery: pe,
      undo: oe,
      redo: me,
      canUndo: be,
      canRedo: _e,
      resetMessage: ke,
      resetDelivery: ve,
      getPreview: U,
      characterLimits: ae,
      hooks: ne
    } = Fe({
      initial: i.modelValue,
      hooks: i.hooks,
      onDirty: () => d("change", R.value)
    }), { lastSavedAt: S } = je(R, { channel: "push" });
    function fe(_) {
      (_.metaKey || _.ctrlKey) && _.key === "z" && (_.preventDefault(), _.shiftKey ? me() : oe());
    }
    De(() => {
      window.addEventListener("keydown", fe);
    }), ze(() => {
      window.removeEventListener("keydown", fe);
    }), ye(
      R,
      (_) => d("update:modelValue", _),
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
    const ge = I(() => A(we.value)), ue = I(() => ge.value.blockingErrors), Re = I(() => ge.value.warnings), T = I(() => ge.value.valid), O = I(() => ae[o.value].title), K = I(() => ae[o.value].body), ce = I(() => R.value.message.title_template.length), D = I(() => R.value.message.body_template.length), z = I(() => {
      const _ = ue.value.find((g) => g.message === "Title is required");
      if (_) return _.message;
      if (ce.value > O.value) return `Title exceeds ${O} characters for ${o.value}.`;
    }), G = I(() => {
      const _ = ue.value.find((g) => g.message === "Message body is required");
      if (_) return _.message;
      if (D.value > K.value) return `Body exceeds ${K} characters for ${o.value}.`;
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
        title_template: R.value.message.title_template + g,
        variables_used: Z
      }) : ee({
        body_template: R.value.message.body_template + g,
        variables_used: Z
      });
    }
    function x() {
      T.value && d("save", R.value);
    }
    return (_, g) => (s(), n("div", tn, [
      e("div", an, [
        re(qe, {
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
          onRedo: c(me)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "onUndo", "onRedo"]),
        ue.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: te({ background: c(X).dangerBg, border: `1px solid ${c(X).dangerBorder}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px` })
        }, [
          e("ul", {
            style: te({ margin: 0, paddingLeft: "1.25rem", color: c(X).danger })
          }, [
            (s(!0), n(H, null, q(ue.value, (C) => (s(), n("li", {
              key: C.message
            }, h(C.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        Re.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: te({ background: c(X).neutral.bg, border: `1px solid ${c(X).neutral.border}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px`, fontSize: "0.875rem", color: c(X).neutral.textMuted })
        }, [
          e("strong", {
            style: te({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", sn, [
            (s(!0), n(H, null, q(Re.value, (C) => (s(), n("li", {
              key: C.message
            }, h(C.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", nn, [
        e("aside", ln, [
          a.disabledSections.includes("message") ? w("", !0) : (s(), n("div", on, [
            !c(R).message.title_template && !c(R).message.body_template ? (s(), n("div", rn, " Add a title and message below to get started. ")) : w("", !0),
            e("div", dn, [
              g[13] || (g[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", un, [
                re(Ke, {
                  "template-type": Ce.value,
                  onUpdate: F
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: $
                }, [
                  g[12] || (g[12] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(H, null, q(c(nt), (C) => (s(), n("option", {
                    key: C.id,
                    value: C.id
                  }, h(C.label), 9, cn))), 128))
                ], 32)
              ])
            ]),
            re(xa, {
              message: c(R).message,
              "title-count": ce.value,
              "body-count": D.value,
              "title-limit": O.value,
              "body-limit": K.value,
              "selected-platform": o.value,
              "show-reset": !0,
              "title-error": z.value,
              "body-error": G.value,
              onUpdate: c(ee),
              onReset: g[1] || (g[1] = (C) => c(ke)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            re(bt, {
              message: c(R).message,
              "variable-options": a.variableOptions,
              onUpdate: c(ee),
              onInsertVariable: P
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          a.disabledSections.includes("delivery") ? w("", !0) : (s(), n("div", pn, [
            g[14] || (g[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            re(us, {
              delivery: c(R).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: c(pe),
              onReset: g[2] || (g[2] = (C) => c(ve)())
            }, null, 8, ["delivery", "onUpdate"]),
            re(hs, {
              delivery: c(R).delivery,
              onUpdate: c(pe)
            }, null, 8, ["delivery", "onUpdate"])
          ]))
        ]),
        e("main", mn, [
          c(R).audience.test_mode ? (s(), n("div", vn, [...g[15] || (g[15] = [
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
                  (s(!0), n(H, null, q(c(Ve), (C) => (s(), n("option", {
                    key: C.id,
                    value: C.id
                  }, h(C.label), 9, fn))), 128))
                ], 512), [
                  [Oe, m.value]
                ])
              ])
            ]),
            e("div", hn, [
              (s(), n(H, null, q(["android", "ios", "web"], (C) => e("button", {
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
              !c(R).message.title_template && !c(R).message.body_template ? (s(), n("div", wn, [...g[18] || (g[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, "Start adding content to see a live preview here.", -1)
              ])])) : (s(), $t(Ks, {
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
        a.showHistory ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: g[5] || (g[5] = (C) => y.value = !0)
        }, " Version history ")) : w("", !0),
        a.showSaveVersion ? (s(), n("button", {
          key: 1,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: g[6] || (g[6] = (C) => d("save-version", JSON.parse(JSON.stringify(c(R)))))
        }, " Save as version ")) : w("", !0),
        a.showDuplicate ? (s(), n("button", {
          key: 2,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: g[7] || (g[7] = (C) => d("duplicate", JSON.parse(JSON.stringify(c(R)))))
        }, " Duplicate ")) : w("", !0),
        a.showSave ? (s(), n("button", {
          key: 3,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: x
        }, " Save ")) : w("", !0),
        a.showClose ? (s(), n("button", {
          key: 4,
          type: "button",
          class: "kb-push-action kb-push-action--primary",
          onClick: g[8] || (g[8] = (C) => d("edit"))
        }, " Close ")) : w("", !0)
      ]),
      v.value ? (s(), n("div", xn, [
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
        versions: a.versions,
        onClose: g[11] || (g[11] = (C) => y.value = !1),
        onRestore: M
      }, null, 8, ["open", "versions"])
    ]));
  }
}), yt = /* @__PURE__ */ ie(In, [["__scopeId", "data-v-b4bcd972"]]), Un = { class: "kb-section" }, Rn = { class: "kb-section__head" }, An = { class: "kb-field" }, Bn = ["value"], Ln = { class: "kb-field" }, Tn = ["value"], Pn = {
  key: 0,
  class: "kb-field"
}, En = ["value"], Vn = {
  key: 1,
  class: "kb-field"
}, Mn = ["value"], On = {
  key: 2,
  class: "kb-field kb-field--inline"
}, Nn = { class: "kb-location-row" }, Dn = ["value"], zn = ["value"], Hn = ["value"], Wn = ["value"], Fn = {
  key: 3,
  class: "kb-field"
}, jn = ["value"], qn = {
  key: 4,
  class: "kb-field"
}, Kn = ["value"], Yn = {
  key: 5,
  class: "kb-field"
}, Jn = { class: "kb-wa-buttons" }, Gn = ["value", "onInput"], Qn = ["value", "onInput"], Xn = ["onClick"], Zn = {
  key: 6,
  class: "kb-field"
}, el = ["value"], tl = ["value"], al = { class: "kb-field" }, sl = ["value"], nl = { class: "kb-field" }, ll = ["value"], ol = {
  key: 7,
  class: "kb-field kb-wa-template-fields"
}, il = { class: "kb-wa-fields-list" }, rl = { class: "kb-wa-field-name" }, dl = { class: "kb-wa-field-status" }, ul = { class: "kb-field" }, cl = ["value"], pl = { class: "kb-field" }, ml = { class: "kb-wa-buttons" }, vl = ["value", "onInput"], bl = ["value", "onChange"], gl = ["value", "onInput"], yl = ["value", "onInput"], fl = ["onClick"], hl = ["disabled"], kl = /* @__PURE__ */ le({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: r }) {
    const i = a, d = r;
    function o(v) {
      if (!v || typeof v != "string") return [];
      const p = /\{\{\s*([^}]+?)\s*\}\}/g, y = /* @__PURE__ */ new Set();
      let L;
      for (; (L = p.exec(v)) !== null; ) y.add(L[1].trim());
      return Array.from(y);
    }
    const m = I(() => {
      const v = i.message.whatsapp_header ?? "", p = i.message.whatsapp_body ?? i.message.body_template ?? "", y = new Set(i.message.variables_used ?? []), L = [...o(v), ...o(p)];
      return Array.from(new Set(L)).map((N) => ({ name: N, configured: y.has(N) }));
    });
    return (v, p) => {
      var y, L, Y, N;
      return s(), n("section", Un, [
        e("div", Rn, [
          p[18] || (p[18] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          a.showReset ? (s(), n("button", {
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
            onChange: p[1] || (p[1] = ($) => d("update", {
              whatsapp_template_type: $.target.value
            }))
          }, [...p[19] || (p[19] = [
            Ne('<option value="text" data-v-dfdd5cd5>Text</option><option value="image" data-v-dfdd5cd5>Image</option><option value="video" data-v-dfdd5cd5>Video</option><option value="document" data-v-dfdd5cd5>Document</option><option value="location" data-v-dfdd5cd5>Location</option><option value="coupon" data-v-dfdd5cd5>Coupon code</option><option value="lto" data-v-dfdd5cd5>Limited time offer</option><option value="mpm" data-v-dfdd5cd5>Multi product message</option><option value="catalog" data-v-dfdd5cd5>Catalog</option><option value="auth" data-v-dfdd5cd5>Authentication</option>', 10)
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
            onInput: p[2] || (p[2] = ($) => d("update", {
              whatsapp_template_name: $.target.value || void 0
            }))
          }, null, 40, Tn)
        ]),
        ["image", "video", "document"].includes(i.message.whatsapp_template_type ?? "text") ? (s(), n("div", Pn, [
          p[22] || (p[22] = e("label", { class: "kb-label" }, [
            Q(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.message.whatsapp_media_url ?? "",
            onInput: p[3] || (p[3] = ($) => d("update", {
              whatsapp_media_url: $.target.value || void 0
            }))
          }, null, 40, En)
        ])) : w("", !0),
        ["image", "video", "document"].includes(i.message.whatsapp_template_type ?? "text") ? (s(), n("div", Vn, [
          p[23] || (p[23] = e("label", { class: "kb-label" }, [
            Q(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: i.message.whatsapp_media_caption ?? "",
            onInput: p[4] || (p[4] = ($) => d("update", {
              whatsapp_media_caption: $.target.value || void 0
            }))
          }, null, 40, Mn)
        ])) : w("", !0),
        i.message.whatsapp_template_type === "location" ? (s(), n("div", On, [
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
                M.lat = Number($.target.value), d("update", { whatsapp_location: M });
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
                M.lon = Number($.target.value), d("update", { whatsapp_location: M });
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
              M.name = $.target.value || void 0, d("update", { whatsapp_location: M });
            })
          }, null, 40, Hn),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((N = i.message.whatsapp_location) == null ? void 0 : N.address) ?? "",
            onInput: p[8] || (p[8] = ($) => {
              const M = { ...i.message.whatsapp_location ?? {} };
              M.address = $.target.value || void 0, d("update", { whatsapp_location: M });
            })
          }, null, 40, Wn)
        ])) : w("", !0),
        i.message.whatsapp_template_type === "coupon" ? (s(), n("div", Fn, [
          p[25] || (p[25] = e("label", { class: "kb-label" }, [
            Q(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: i.message.whatsapp_coupon_code ?? "",
            onInput: p[9] || (p[9] = ($) => d("update", {
              whatsapp_coupon_code: $.target.value || void 0
            }))
          }, null, 40, jn)
        ])) : w("", !0),
        i.message.whatsapp_template_type === "lto" ? (s(), n("div", qn, [
          p[26] || (p[26] = e("label", { class: "kb-label" }, [
            Q(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: i.message.whatsapp_lto_expiry ?? "",
            onInput: p[10] || (p[10] = ($) => d("update", {
              whatsapp_lto_expiry: $.target.value || void 0
            }))
          }, null, 40, Kn)
        ])) : w("", !0),
        ["mpm", "catalog"].includes(i.message.whatsapp_template_type) ? (s(), n("div", Yn, [
          p[27] || (p[27] = e("label", { class: "kb-label" }, [
            Q(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", Jn, [
            (s(!0), n(H, null, q(i.message.whatsapp_products ?? [], ($, M) => (s(), n("div", {
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
                  }, d("update", { whatsapp_products: W });
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
                  }, d("update", { whatsapp_products: W });
                }
              }, null, 40, Qn),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const R = [...i.message.whatsapp_products ?? []];
                  R.splice(Number(M), 1), d("update", { whatsapp_products: R });
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
                }), d("update", { whatsapp_products: M });
              })
            }, " Add product ")
          ])
        ])) : w("", !0),
        i.message.whatsapp_template_type === "auth" ? (s(), n("div", Zn, [
          p[29] || (p[29] = e("label", { class: "kb-label" }, [
            Q(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.message.whatsapp_auth_type ?? "otp",
            onChange: p[12] || (p[12] = ($) => d("update", {
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
            onInput: p[13] || (p[13] = ($) => d("update", {
              whatsapp_auth_label: $.target.value || void 0
            }))
          }, null, 40, tl)
        ])) : w("", !0),
        e("div", al, [
          p[30] || (p[30] = e("label", { class: "kb-label" }, [
            Q(" Header (optional) "),
            e("span", { class: "kb-helper" }, "Short text or variable used as the WhatsApp template header.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: i.message.whatsapp_header ?? "",
            onInput: p[14] || (p[14] = ($) => d("update", {
              whatsapp_header: $.target.value || void 0
            }))
          }, null, 40, sl)
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
            onInput: p[15] || (p[15] = ($) => d("update", {
              whatsapp_body: $.target.value || void 0
            }))
          }, null, 40, ll)
        ]),
        m.value.length > 0 ? (s(), n("div", ol, [
          p[32] || (p[32] = e("label", { class: "kb-label" }, "Template fields", -1)),
          p[33] || (p[33] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", il, [
            (s(!0), n(H, null, q(m.value, ($) => (s(), n("li", {
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
            onInput: p[16] || (p[16] = ($) => d("update", {
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
            (s(!0), n(H, null, q(i.message.whatsapp_buttons ?? [], ($, M) => (s(), n("div", {
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
                  }, d("update", { whatsapp_buttons: W });
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
                  }, d("update", { whatsapp_buttons: W });
                }
              }, [...p[35] || (p[35] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1)
              ])], 40, bl),
              $.type === "url" ? (s(), n("input", {
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
                  }, d("update", { whatsapp_buttons: W });
                }
              }, null, 40, gl)) : $.type === "call" ? (s(), n("input", {
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
                  }, d("update", { whatsapp_buttons: W });
                }
              }, null, 40, yl)) : w("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const R = [...i.message.whatsapp_buttons ?? []];
                  R.splice(Number(M), 1), d("update", { whatsapp_buttons: R });
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
                }), d("update", { whatsapp_buttons: M });
              })
            }, " Add button ", 8, hl)
          ])
        ])
      ]);
    };
  }
}), _l = /* @__PURE__ */ ie(kl, [["__scopeId", "data-v-dfdd5cd5"]]), wl = { class: "phone-theme-toggle" }, $l = { class: "chat-area" }, xl = { class: "bubble" }, Cl = {
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
}, El = { class: "catalog-header" }, Vl = { class: "catalog-title" }, Ml = {
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
}, ql = { class: "auth-code" }, Kl = {
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
  setup(a) {
    const r = a, i = J("light"), d = I(() => i.value === "dark");
    function o(p) {
      return String(p).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const m = I(() => {
      var L;
      const p = ((L = r.template) == null ? void 0 : L.body) ?? "";
      return o(p).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), v = I(() => {
      const p = r.template.location;
      if (!p) return "";
      const { lat: y, lng: L } = p;
      return y == null || L == null ? "" : `https://maps.googleapis.com/maps/api/staticmap?center=${y},${L}&zoom=15&size=600x300&markers=${y},${L}`;
    });
    return (p, y) => {
      var L, Y;
      return s(), n("div", {
        class: de(["wa-wrapper", { "wa-wrapper--dark": d.value }])
      }, [
        e("div", {
          class: de(["phone", { "phone--dark": d.value }])
        }, [
          e("div", wl, [
            e("button", {
              type: "button",
              class: de(["phone-theme-btn", { "phone-theme-btn--active": !d.value }]),
              onClick: y[0] || (y[0] = (N) => i.value = "light")
            }, " Light ", 2),
            e("button", {
              type: "button",
              class: de(["phone-theme-btn", { "phone-theme-btn--active": d.value }]),
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
              a.template.header ? (s(), n("div", Cl, [
                a.template.header.type === "text" ? (s(), n("div", Sl, h(a.template.header.text), 1)) : a.template.header.type === "image" ? (s(), n("img", {
                  key: 1,
                  src: a.template.header.url,
                  class: "media",
                  alt: ""
                }, null, 8, Il)) : a.template.header.type === "video" ? (s(), n("video", {
                  key: 2,
                  src: a.template.header.url,
                  controls: "",
                  class: "media"
                }, null, 8, Ul)) : a.template.header.type === "document" ? (s(), n("div", Rl, " 📄 " + h(a.template.header.filename), 1)) : w("", !0)
              ])) : w("", !0),
              e("div", {
                class: "body",
                innerHTML: m.value
              }, null, 8, Al),
              a.template.location ? (s(), n("div", Bl, [
                v.value ? (s(), n("img", {
                  key: 0,
                  src: v.value,
                  class: "map",
                  alt: ""
                }, null, 8, Ll)) : w("", !0),
                e("div", Tl, [
                  e("strong", null, h(a.template.location.name), 1),
                  e("div", null, h(a.template.location.address), 1)
                ])
              ])) : w("", !0),
              a.template.catalog ? (s(), n("div", Pl, [
                e("div", El, [
                  y[2] || (y[2] = Q(" 🛍 ", -1)),
                  e("span", Vl, h(typeof a.template.catalog == "object" && a.template.catalog.label ? a.template.catalog.label : "Full catalog"), 1)
                ]),
                y[3] || (y[3] = e("div", { class: "catalog-sub" }, "Browse all items", -1)),
                y[4] || (y[4] = e("div", { class: "catalog-cta" }, "VIEW CATALOG", -1))
              ])) : w("", !0),
              (L = a.template.multiProduct) != null && L.length ? (s(), n("div", Ml, [
                (s(!0), n(H, null, q(a.template.multiProduct, (N, $) => (s(), n("div", {
                  key: $,
                  class: "product"
                }, [
                  N.image ? (s(), n("img", {
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
              a.template.coupon ? (s(), n("div", Hl, [
                y[6] || (y[6] = e("div", { class: "coupon-discount" }, "Special offer", -1)),
                e("div", Wl, [
                  y[5] || (y[5] = Q(" Code: ", -1)),
                  e("span", null, h(a.template.coupon.code), 1)
                ]),
                y[7] || (y[7] = e("div", { class: "coupon-cta" }, "COPY CODE", -1))
              ])) : w("", !0),
              a.template.limitedOffer ? (s(), n("div", Fl, " ⏳ Offer expires " + h(a.template.limitedOffer), 1)) : w("", !0),
              a.template.auth ? (s(), n("div", jl, [
                y[8] || (y[8] = e("div", { class: "auth-icon" }, "🔐", -1)),
                y[9] || (y[9] = e("div", { class: "auth-title" }, "Confirm your phone number", -1)),
                e("div", ql, h(a.template.auth.code), 1),
                y[10] || (y[10] = e("button", {
                  type: "button",
                  class: "auth-btn"
                }, "CONTINUE", -1))
              ])) : w("", !0),
              a.template.footer ? (s(), n("div", Kl, h(a.template.footer), 1)) : w("", !0),
              (Y = a.template.buttons) != null && Y.length ? (s(), n("div", Yl, [
                (s(!0), n(H, null, q(a.template.buttons, (N, $) => (s(), n("button", {
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
}), Gl = /* @__PURE__ */ ie(Jl, [["__scopeId", "data-v-76cc6100"]]), Ql = { class: "keos-whatsapp-builder" }, Xl = { class: "kb-builder-top" }, Zl = { style: { margin: 0, paddingLeft: "1.25rem" } }, eo = { class: "kb-wa-layout" }, to = { class: "kb-wa-sidebar" }, ao = {
  key: 0,
  class: "kb-wa-form"
}, so = { class: "kb-wa-form-head" }, no = { class: "kb-wa-form-head-row" }, lo = ["value"], oo = { class: "kb-wa-canvas" }, io = {
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
  setup(a, { emit: r }) {
    const i = a, d = r, {
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
      onDirty: () => d("change", o.value)
    }), { lastSavedAt: W } = je(o, { channel: "whatsapp" });
    function A(T) {
      (T.metaKey || T.ctrlKey) && T.key === "z" && (T.preventDefault(), T.shiftKey ? Y() : L());
    }
    De(() => {
      window.addEventListener("keydown", A);
    }), ze(() => {
      window.removeEventListener("keydown", A);
    }), ye(
      o,
      (T) => d("update:modelValue", T),
      { deep: !0 }
    );
    const f = J(), ee = J(!0);
    async function pe() {
      if (R.estimateReach)
        try {
          f.value = await R.estimateReach(o.value.audience);
        } catch {
          f.value = void 0;
        }
      R.canSend && (ee.value = await Promise.resolve(R.canSend()));
    }
    pe(), ye(() => o.value.audience, pe, { deep: !0 });
    const oe = I(() => v(f.value)), me = I(() => oe.value.blockingErrors), be = I(() => oe.value.warnings), _e = I(() => oe.value.valid), ke = J(""), ve = J(!1), U = J(null), ae = I(() => {
      const T = ke.value;
      return T ? Ve.find((O) => O.id === T) ?? null : null;
    }), ne = I(() => {
      const T = o.value.message.whatsapp_body ?? o.value.message.body_template ?? "";
      return ae.value ? Pe(T, ae.value.data) : T;
    }), S = I(() => {
      const T = o.value.message.whatsapp_header ?? "";
      return ae.value ? Pe(T, ae.value.data) : T;
    }), fe = I(() => {
      const T = o.value.message, O = T.whatsapp_template_type ?? "text";
      let K, ce, D, z, G, Ce, F;
      O === "image" && T.whatsapp_media_url ? K = { type: "image", url: T.whatsapp_media_url } : O === "video" && T.whatsapp_media_url ? K = { type: "video", url: T.whatsapp_media_url } : O === "document" && T.whatsapp_document_filename ? K = { type: "document", filename: T.whatsapp_document_filename } : T.whatsapp_header && (K = { type: "text", text: S.value });
      const k = ne.value || "Start adding content to see a live preview here.";
      if (O === "location" && T.whatsapp_location) {
        const x = T.whatsapp_location, _ = x.lat ?? x.latitude, g = x.lng ?? x.lon ?? x.longitude;
        _ != null && g != null && (ce = {
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
        header: K,
        body: k,
        footer: T.whatsapp_footer || void 0,
        buttons: P.map((x) => ({ text: x.label || "Button" })),
        location: ce,
        catalog: D,
        multiProduct: z,
        coupon: G,
        limitedOffer: Ce,
        auth: F
      };
    });
    function we(T) {
      const O = o.value, K = T.campaign.message ? { ...O.message, ...T.campaign.message } : O.message;
      p({
        ...T.campaign,
        message: K
      }), U.value = null, ve.value = !1;
    }
    function Ae(T) {
      const O = T.target.value;
      if (!O) return;
      const K = lt.find((ce) => ce.id === O);
      K && (m.value ? (U.value = K, ve.value = !0) : we(K), T.target.value = "");
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
    function ue(T) {
      const O = ` {{ ${T.variable} }}`, K = o.value.message.variables_used ?? [], ce = Array.from(/* @__PURE__ */ new Set([...K, T.variable]));
      if (T.field === "title") {
        const D = o.value.message.whatsapp_header ?? "";
        y(
          {
            variables_used: ce
          }
        ), o.value.message.whatsapp_header = D + O;
      } else {
        const D = o.value.message.whatsapp_body ?? "";
        y(
          {
            variables_used: ce
          }
        ), o.value.message.whatsapp_body = D + O;
      }
    }
    function Re() {
      _e.value && d("save", o.value);
    }
    return (T, O) => (s(), n("div", Ql, [
      e("div", Xl, [
        re(qe, {
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
        me.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: te({ background: c(X).dangerBg, border: `1px solid ${c(X).dangerBorder}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px` })
        }, [
          e("ul", {
            style: te({ margin: 0, paddingLeft: "1.25rem", color: c(X).danger })
          }, [
            (s(!0), n(H, null, q(me.value, (K) => (s(), n("li", {
              key: K.message
            }, h(K.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        be.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: te({ background: c(X).neutral.bg, border: `1px solid ${c(X).neutral.border}`, borderRadius: `${c($e).input}px`, padding: `${c(j)[12]}px ${c(j)[16]}px`, marginBottom: `${c(j)[16]}px`, fontSize: "0.875rem", color: c(X).neutral.textMuted })
        }, [
          e("strong", {
            style: te({ display: "block", marginBottom: `${c(j)[4]}px` })
          }, "Warnings", 4),
          e("ul", Zl, [
            (s(!0), n(H, null, q(be.value, (K) => (s(), n("li", {
              key: K.message
            }, h(K.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", eo, [
        e("aside", to, [
          a.disabledSections.includes("whatsapp") ? w("", !0) : (s(), n("div", ao, [
            e("div", so, [
              O[7] || (O[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", no, [
                re(Ke, {
                  "template-type": Ue.value,
                  onUpdate: xe
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Ae
                }, [
                  O[6] || (O[6] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(H, null, q(c(lt), (K) => (s(), n("option", {
                    key: K.id,
                    value: K.id
                  }, h(K.label), 9, lo))), 128))
                ], 32)
              ])
            ]),
            re(_l, {
              message: c(o).message,
              "show-reset": !0,
              onUpdate: c(y),
              onReset: O[0] || (O[0] = (K) => c(M)())
            }, null, 8, ["message", "onUpdate"]),
            re(bt, {
              message: c(o).message,
              "variable-options": a.variableOptions,
              onUpdate: c(y),
              onInsertVariable: ue
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", oo, [
          c(o).audience.test_mode ? (s(), n("div", io, [...O[8] || (O[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            Q(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", ro, [
            e("div", uo, [
              e("label", co, [
                O[10] || (O[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ie(e("select", {
                  "onUpdate:modelValue": O[1] || (O[1] = (K) => ke.value = K),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  O[9] || (O[9] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(H, null, q(c(Ve), (K) => (s(), n("option", {
                    key: K.id,
                    value: K.id
                  }, h(K.label), 9, po))), 128))
                ], 512), [
                  [Oe, ke.value]
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
        a.showDuplicate ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: O[2] || (O[2] = (K) => d("duplicate", JSON.parse(JSON.stringify(c(o)))))
        }, " Duplicate ")) : w("", !0),
        a.showSave ? (s(), n("button", {
          key: 1,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: Re
        }, " Save ")) : w("", !0),
        a.showClose ? (s(), n("button", {
          key: 2,
          type: "button",
          class: "kb-wa-action kb-wa-action--primary",
          onClick: O[3] || (O[3] = (K) => d("edit"))
        }, " Close ")) : w("", !0)
      ]),
      ve.value ? (s(), n("div", bo, [
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
              onClick: O[4] || (O[4] = (K) => {
                ve.value = !1, U.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: O[5] || (O[5] = (K) => U.value && we(U.value))
            }, "Replace")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ ie(fo, [["__scopeId", "data-v-5106241f"]]), ho = { class: "kb-section" }, ko = { class: "kb-section__head" }, _o = { class: "kb-field" }, wo = ["value"], $o = { class: "kb-field" }, xo = { class: "kb-label" }, Co = { key: 0 }, So = { key: 1 }, Io = { key: 2 }, Uo = ["value"], Ro = {
  key: 0,
  class: "kb-truncation-hint"
}, Ao = { class: "kb-field" }, Bo = { class: "kb-insert-row" }, Lo = ["value"], To = { class: "kb-field" }, Po = { class: "kb-insert-row" }, Eo = /* @__PURE__ */ le({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: r }) {
    const i = a, d = r, o = ["first_name", "last_name", "order_id", "city"], m = J(i.variableOptions && i.variableOptions.length ? [...i.variableOptions] : o), v = J(m.value[0] ?? o[0]), p = J("");
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
      d("update", {
        sms_sender_id: f || void 0
      });
    }
    function M(A) {
      const f = A.target.value;
      d("update", {
        sms_body: f
      });
    }
    function R() {
      const A = v.value;
      if (!A) return;
      const f = ` {{ ${A} }}`, ee = y.value || "", pe = i.message.variables_used ?? [], oe = Array.from(/* @__PURE__ */ new Set([...pe, A]));
      d("update", {
        sms_body: ee + f,
        variables_used: oe
      });
    }
    function W() {
      const A = p.value.trim();
      A && (m.value.includes(A) || (m.value = [...m.value, A]), v.value = A, p.value = "");
    }
    return (A, f) => (s(), n("section", ho, [
      e("div", ko, [
        f[3] || (f[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        a.showReset ? (s(), n("button", {
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
            Y.value === 0 ? (s(), n("span", Co, "0 segments")) : Y.value === 1 ? (s(), n("span", So, "1 segment")) : (s(), n("span", Io, h(Y.value) + " segments", 1))
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
        N.value ? (s(), n("p", Ro, h(N.value), 1)) : w("", !0)
      ]),
      e("div", Ao, [
        f[7] || (f[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Bo, [
          Ie(e("select", {
            "onUpdate:modelValue": f[1] || (f[1] = (ee) => v.value = ee),
            class: "kb-select"
          }, [
            (s(!0), n(H, null, q(m.value, (ee) => (s(), n("option", {
              key: ee,
              value: ee
            }, h(ee), 9, Lo))), 128))
          ], 512), [
            [Oe, v.value]
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
}), Vo = /* @__PURE__ */ ie(Eo, [["__scopeId", "data-v-1be89c79"]]), Mo = { class: "keos-sms-builder" }, Oo = { class: "kb-builder-top" }, No = { style: { margin: 0, paddingLeft: "1.25rem" } }, Do = { class: "kb-sms-layout" }, zo = { class: "kb-sms-sidebar" }, Ho = {
  key: 0,
  class: "kb-sms-form"
}, Wo = { class: "kb-sms-form-head" }, Fo = { class: "kb-wa-form-head-row" }, jo = ["value"], qo = { class: "kb-sms-canvas" }, Ko = {
  key: 0,
  class: "kb-sms-test-banner"
}, Yo = { class: "kb-sms-preview-chrome" }, Jo = { class: "kb-push-preview-controls" }, Go = { class: "kb-push-preview-as" }, Qo = ["value"], Xo = { class: "kb-sms-preview-frame" }, Zo = { class: "kb-preview" }, ei = { class: "kb-sms-preview" }, ti = { class: "kb-sms-phone" }, ai = { class: "kb-sms-header" }, si = { class: "kb-sms-sender" }, ni = { class: "kb-sms-thread" }, li = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, oi = { class: "kb-sms-text" }, ii = { class: "kb-sms-counter" }, ri = { key: 0 }, di = { key: 1 }, ui = { key: 2 }, ci = {
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
  setup(a, { emit: r }) {
    const i = a, d = r, {
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
      onDirty: () => d("change", o.value)
    }), { lastSavedAt: W } = je(o, { channel: "sms" });
    function A(D) {
      (D.metaKey || D.ctrlKey) && D.key === "z" && (D.preventDefault(), D.shiftKey ? Y() : L());
    }
    De(() => {
      window.addEventListener("keydown", A);
    }), ze(() => {
      window.removeEventListener("keydown", A);
    }), ye(
      o,
      (D) => d("update:modelValue", D),
      { deep: !0 }
    );
    const f = J(), ee = J(!0);
    async function pe() {
      if (R.estimateReach)
        try {
          f.value = await R.estimateReach(o.value.audience);
        } catch {
          f.value = void 0;
        }
      R.canSend && (ee.value = await Promise.resolve(R.canSend()));
    }
    pe(), ye(() => o.value.audience, pe, { deep: !0 });
    const oe = I(() => v(f.value)), me = I(() => oe.value.blockingErrors), be = I(() => oe.value.warnings), _e = I(() => oe.value.valid), ke = I(() => o.value.template_type ?? "transactional"), ve = J(""), U = J(!1), ae = J(null), ne = I(() => {
      const D = ve.value;
      return D ? Ve.find((z) => z.id === D) ?? null : null;
    }), S = I(() => {
      const D = xe.value;
      return ne.value ? Pe(D, ne.value.data) : D;
    });
    function fe(D) {
      const z = o.value, G = D.campaign.message ? { ...z.message, ...D.campaign.message } : z.message;
      p({
        ...D.campaign,
        message: G
      }), ae.value = null, U.value = !1;
    }
    function we(D) {
      const z = D.target.value;
      if (!z) return;
      const G = ot.find((Ce) => Ce.id === z);
      G && (m.value ? (ae.value = G, U.value = !0) : fe(G), D.target.value = "");
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
    const xe = I(() => (o.value.message.sms_body ?? "") || ""), ge = I(() => xe.value.length), ue = I(() => ge.value ? ge.value <= 160 ? 1 : Math.ceil(ge.value / 153) : 0), Re = I(() => {
      const D = S.value;
      return D.trim().length ? D : "Your SMS message preview will appear here.";
    }), T = I(() => {
      const D = i.costPerSegment ?? 0;
      return !D || ue.value === 0 ? null : (ue.value * D).toFixed(2);
    }), O = I(() => {
      const D = ge.value;
      return D <= 160 ? null : D <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), K = I(
      () => o.value.message.sms_sender_id ?? "YourBrand"
    );
    function ce() {
      _e.value && d("save", o.value);
    }
    return (D, z) => (s(), n("div", Mo, [
      e("div", Oo, [
        re(qe, {
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
        me.value.length > 0 ? (s(), n("div", {
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
            (s(!0), n(H, null, q(me.value, (G) => (s(), n("li", {
              key: G.message
            }, h(G.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        be.value.length > 0 ? (s(), n("div", {
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
            (s(!0), n(H, null, q(be.value, (G) => (s(), n("li", {
              key: G.message
            }, h(G.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", Do, [
        e("aside", zo, [
          a.disabledSections.includes("sms") ? w("", !0) : (s(), n("div", Ho, [
            e("div", Wo, [
              z[7] || (z[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", Fo, [
                re(Ke, {
                  "template-type": ke.value,
                  onUpdate: Ae
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: we
                }, [
                  z[6] || (z[6] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(H, null, q(c(ot), (G) => (s(), n("option", {
                    key: G.id,
                    value: G.id
                  }, h(G.label), 9, jo))), 128))
                ], 32)
              ])
            ]),
            re(Vo, {
              message: c(o).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: c(y),
              onReset: z[0] || (z[0] = (G) => c(M)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", qo, [
          c(o).audience.test_mode ? (s(), n("div", Ko, [...z[8] || (z[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            Q(" Test mode — only your test segment will receive this. ", -1)
          ])])) : w("", !0),
          e("div", Yo, [
            e("div", Jo, [
              e("label", Go, [
                z[10] || (z[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Ie(e("select", {
                  "onUpdate:modelValue": z[1] || (z[1] = (G) => ve.value = G),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  z[9] || (z[9] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(H, null, q(c(Ve), (G) => (s(), n("option", {
                    key: G.id,
                    value: G.id
                  }, h(G.label), 9, Qo))), 128))
                ], 512), [
                  [Oe, ve.value]
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
                    e("div", ai, [
                      e("div", si, h(K.value), 1),
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
                    ue.value === 0 ? (s(), n("span", ri, "0 segments")) : ue.value === 1 ? (s(), n("span", di, "1 segment")) : (s(), n("span", ui, h(ue.value) + " segments", 1)),
                    z[14] || (z[14] = Q(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    T.value !== null ? (s(), n("span", ci, " · Est. " + h(T.value), 1)) : w("", !0)
                  ]),
                  O.value ? (s(), n("p", pi, h(O.value), 1)) : w("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", mi, [
        a.showDuplicate ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: z[2] || (z[2] = (G) => d("duplicate", JSON.parse(JSON.stringify(c(o)))))
        }, " Duplicate ")) : w("", !0),
        a.showSave ? (s(), n("button", {
          key: 1,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: ce
        }, " Save ")) : w("", !0),
        a.showClose ? (s(), n("button", {
          key: 2,
          type: "button",
          class: "kb-sms-action kb-sms-action--primary",
          onClick: z[3] || (z[3] = (G) => d("edit"))
        }, " Close ")) : w("", !0)
      ]),
      U.value ? (s(), n("div", vi, [
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
                U.value = !1, ae.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: z[5] || (z[5] = (G) => ae.value && fe(ae.value))
            }, "Replace")
          ])
        ])
      ])) : w("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ ie(yi, [["__scopeId", "data-v-8b5fccda"]]), fi = 30, hi = 60, ki = 130;
function _i(a) {
  const r = (a ?? "").trim().length;
  return r < fi ? "too_short" : r <= hi ? "good" : "too_long";
}
function wi(a) {
  const r = (a ?? "").trim().length;
  return r === 0 ? "too_short" : r <= ki ? "good" : "too_long";
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
function rt(a) {
  if (!a || typeof a != "string") return [];
  const r = [];
  for (const i of $i) {
    const d = a.match(i);
    d && r.push(d[0]);
  }
  return r;
}
function xi(a) {
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
function Ci(a) {
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
const Si = { class: "em-section" }, Ii = { class: "em-strip" }, Ui = { class: "em-strip-head" }, Ri = { class: "em-field" }, Ai = ["value"], Bi = { class: "em-field" }, Li = ["value"], Ti = { class: "em-field" }, Pi = ["value"], Ei = { class: "em-field" }, Vi = { class: "em-input-group" }, Mi = ["value"], Oi = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Ni = { class: "em-field" }, Di = { class: "em-input-group" }, zi = ["value"], Hi = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Wi = { class: "em-strip em-strip--library" }, Fi = { class: "em-library-chips" }, ji = ["onClick"], qi = { class: "em-strip em-strip--blocks" }, Ki = { class: "em-block-list" }, Yi = ["data-type"], Ji = { class: "em-block-bar" }, Gi = { class: "em-block-type" }, Qi = { class: "em-block-actions" }, Xi = ["disabled", "onClick"], Zi = ["disabled", "onClick"], er = ["onClick"], tr = {
  key: 0,
  class: "em-block-fields"
}, ar = ["value", "onChange"], sr = ["value", "onInput"], nr = ["onClick"], lr = {
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
}, Er = ["value", "onChange"], Vr = ["value", "onInput"], Mr = ["onClick"], Or = {
  key: 8,
  class: "em-block-fields"
}, Nr = { class: "em-social-links" }, Dr = ["value", "onChange"], zr = ["value", "onInput"], Hr = ["onClick"], Wr = ["onClick"], Fr = {
  key: 9,
  class: "em-block-fields"
}, jr = ["value", "onInput"], qr = ["value", "onInput"], Kr = ["value", "onInput"], Yr = {
  key: 10,
  class: "em-block-fields"
}, Jr = ["value", "onInput"], Gr = { class: "em-link-list-items" }, Qr = ["value", "onInput"], Xr = ["value", "onInput"], Zr = ["onClick"], ed = ["onClick"], td = {
  key: 11,
  class: "em-block-fields"
}, ad = ["value", "onInput"], sd = ["onClick"], nd = ["value", "onInput"], ld = ["onClick"], od = {
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
}, Ad = ["value", "onInput"], Bd = ["value", "onInput"], Ld = ["value", "onInput"], Td = ["onClick"], Pd = ["onClick"], Ed = {
  key: 17,
  class: "em-block-fields"
}, Vd = ["value", "onInput"], Md = ["value", "onInput"], Od = {
  key: 18,
  class: "em-block-fields"
}, Nd = ["value", "onInput"], Dd = ["value", "onInput"], zd = ["value", "onInput"], Hd = ["value", "onInput"], Wd = ["value", "onInput"], Fd = {
  key: 19,
  class: "em-block-fields"
}, jd = ["value", "onInput"], qd = ["onClick"], Kd = {
  key: 20,
  class: "em-block-fields"
}, Yd = ["value", "onInput"], Jd = ["value", "onInput"], Gd = ["onClick"], Qd = {
  key: 21,
  class: "em-block-fields"
}, Xd = ["value", "onInput"], Zd = { class: "em-block-fields--row" }, eu = ["value", "onInput"], tu = {
  key: 22,
  class: "em-block-fields"
}, au = ["value", "onInput"], su = ["value", "onInput"], nu = ["value", "onInput"], lu = { class: "em-add-bar" }, ou = { class: "em-add-bar-btns" }, iu = { class: "em-strip em-strip--personalize" }, ru = { class: "em-field" }, du = { class: "em-input-group" }, uu = ["value"], cu = { class: "em-field" }, pu = { class: "em-input-group" }, Se = "{{ var }}", mu = /* @__PURE__ */ le({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(a, { emit: r }) {
    var Te;
    function i() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const d = [
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
          return { id: i(), type: "social", links: d.map((l) => ({ ...l })) };
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
    const m = a, v = r, p = ["first_name", "last_name", "order_id", "city", "email"], y = J(
      (Te = m.variableOptions) != null && Te.length ? [...m.variableOptions] : p
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
    function pe(b) {
      v("update", { email_subject: b.target.value });
    }
    function oe(b) {
      const l = b.target.value;
      v("update", { email_preview_text: l || void 0 });
    }
    function me(b) {
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
    function ve(b) {
      const l = b.blocks();
      ee([...f.value, ...l]);
    }
    function U(b) {
      const l = [...f.value, o(b)];
      ee(l);
    }
    function ae(b) {
      ee(f.value.filter((l) => l.id !== b));
    }
    function ne(b, l) {
      const t = f.value.findIndex((E) => E.id === b);
      if (t < 0) return;
      const V = l === "up" ? t - 1 : t + 1;
      if (V < 0 || V >= f.value.length) return;
      const u = [...f.value];
      [u[t], u[V]] = [u[V], u[t]], ee(u);
    }
    function S(b, l) {
      const t = f.value.map((V) => V.id === b ? { ...V, ...l } : V);
      ee(t);
    }
    function fe(b, l, t) {
      const V = f.value.find((E) => E.id === b);
      if (!V || V.type !== "list") return;
      const u = [...V.items || []];
      u[l] = t, S(b, { items: u });
    }
    function we(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "list" || S(b, { items: [...l.items || [], "New item"] });
    }
    function Ae(b, l) {
      const t = f.value.find((u) => u.id === b);
      if (!t || t.type !== "list") return;
      const V = (t.items || []).filter((u, E) => E !== l);
      S(b, { items: V });
    }
    function Ue(b, l, t, V) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "social") return;
      const E = (u.links || []).map((B, he) => he === l ? { ...B, [t]: V } : B);
      S(b, { links: E });
    }
    function xe(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "social" || S(b, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function ge(b, l) {
      const t = f.value.find((u) => u.id === b);
      if (!t || t.type !== "social") return;
      const V = (t.links || []).filter((u, E) => E !== l);
      S(b, { links: V });
    }
    function ue(b, l, t, V) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "link_list") return;
      const E = (u.links || []).map((B, he) => he === l ? { ...B, [t]: V } : B);
      S(b, { links: E });
    }
    function Re(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "link_list" || S(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function T(b, l) {
      const t = f.value.find((u) => u.id === b);
      if (!t || t.type !== "link_list") return;
      const V = (t.links || []).filter((u, E) => E !== l);
      S(b, { links: V });
    }
    function O(b, l) {
      const t = f.value.find((Me) => Me.id === b);
      if (!t || t.type !== "columns") return;
      const V = ` {{ ${L.value} }}`, u = m.message.variables_used ?? [], E = Array.from(/* @__PURE__ */ new Set([...u, L.value])), B = l === "left" ? "leftContent" : "rightContent", Ye = (t[B] ?? "") + V;
      S(b, { [B]: Ye }), v("update", { variables_used: E });
    }
    function K(b, l) {
      const t = f.value.find((V) => V.id === b);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const V = [...t.cells || []];
          for (; V.length < l.columnCount; ) V.push("Cell content");
          l.cells = V.slice(0, l.columnCount);
        }
        S(b, l);
      }
    }
    function ce(b, l, t) {
      const V = f.value.find((E) => E.id === b);
      if (!V || V.type !== "row") return;
      const u = [...V.cells || []];
      u[l] = t, S(b, { cells: u });
    }
    function D(b, l, t, V) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "navbar") return;
      const E = (u.links || []).map((B, he) => he === l ? { ...B, [t]: V } : B);
      S(b, { links: E });
    }
    function z(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "navbar" || S(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function G(b, l) {
      const t = f.value.find((V) => V.id === b);
      !t || t.type !== "navbar" || S(b, { links: (t.links || []).filter((V, u) => u !== l) });
    }
    function Ce(b, l, t, V) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "accordion") return;
      const E = (u.items || []).map((B, he) => he === l ? { ...B, [t]: V } : B);
      S(b, { items: E });
    }
    function F(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "accordion" || S(b, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function k(b, l) {
      const t = f.value.find((V) => V.id === b);
      !t || t.type !== "accordion" || S(b, { items: (t.items || []).filter((V, u) => u !== l) });
    }
    function P(b, l, t, V) {
      const u = f.value.find((B) => B.id === b);
      if (!u || u.type !== "carousel") return;
      const E = (u.slides || []).map((B, he) => he === l ? { ...B, [t]: V } : B);
      S(b, { slides: E });
    }
    function x(b) {
      const l = f.value.find((t) => t.id === b);
      !l || l.type !== "carousel" || S(b, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function _(b, l) {
      const t = f.value.find((V) => V.id === b);
      !t || t.type !== "carousel" || S(b, { slides: (t.slides || []).filter((V, u) => u !== l) });
    }
    function g(b) {
      const l = ` {{ ${L.value} }}`, t = m.message.variables_used ?? [], V = Array.from(/* @__PURE__ */ new Set([...t, L.value]));
      b === "subject" ? v("update", {
        email_subject: (N.value || "") + l,
        variables_used: V
      }) : v("update", {
        email_preview_text: ($.value || "") + l,
        variables_used: V
      });
    }
    function C(b) {
      const l = f.value.find((Me) => Me.id === b);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const t = ` {{ ${L.value} }}`, V = m.message.variables_used ?? [], u = Array.from(/* @__PURE__ */ new Set([...V, L.value])), E = (l.type === "footer", "content"), he = (l[E] ?? "") + t, Ye = f.value.map(
        (Me) => Me.id === b ? { ...Me, [E]: he } : Me
      );
      v("update", { email_blocks: Ye, variables_used: u });
    }
    function Z(b, l) {
      const t = f.value.find((he) => he.id === b);
      if (!t || t.type !== "row") return;
      const V = ` {{ ${L.value} }}`, u = m.message.variables_used ?? [], E = Array.from(/* @__PURE__ */ new Set([...u, L.value])), B = [...t.cells || []];
      B[l] = (B[l] || "") + V, S(b, { cells: B }), v("update", { variables_used: E });
    }
    function se() {
      const b = Y.value.trim();
      !b || y.value.includes(b) || (y.value = [...y.value, b], L.value = b, Y.value = "");
    }
    return (b, l) => (s(), n("section", Si, [
      e("div", Ii, [
        e("div", Ui, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          a.showReset ? (s(), n("button", {
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
            value: a.message.email_from_name ?? "",
            onInput: me
          }, null, 40, Ai)
        ]),
        e("div", Bi, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: a.message.email_from_address ?? "",
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
            value: a.message.email_reply_to ?? "",
            onInput: _e
          }, null, 40, Pi)
        ]),
        e("div", Ei, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Vi, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: N.value,
              onInput: pe
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
          W.value.length ? (s(), n("span", Oi, "Spammy: " + h(W.value.join(", ")), 1)) : w("", !0)
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
          A.value.length ? (s(), n("span", Hi, "Spammy: " + h(A.value.join(", ")), 1)) : w("", !0)
        ])
      ]),
      e("div", Wi, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Fi, [
          (s(), n(H, null, q(ke, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (V) => ve(t)
          }, h(t.label), 9, ji)), 64))
        ])
      ]),
      e("div", qi, [
        l[61] || (l[61] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[62] || (l[62] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Ki, [
          (s(!0), n(H, null, q(f.value, (t, V) => (s(), n("div", {
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
                  disabled: V === 0,
                  onClick: (u) => ne(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Xi),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: V === f.value.length - 1,
                  onClick: (u) => ne(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Zi),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => ae(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, er)
              ])
            ]),
            t.type === "heading" ? (s(), n("div", tr, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { level: Number(u.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, ar),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, sr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, nr)
            ])) : t.type === "paragraph" ? (s(), n("div", lr, [
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
            ])) : t.type === "image" ? (s(), n("div", rr, [
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
            ])) : t.type === "button" ? (s(), n("div", pr, [
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
            ])) : t.type === "spacer" ? (s(), n("div", _r, [
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
            ])) : t.type === "footer" ? (s(), n("div", $r, [
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
            ])) : t.type === "list" ? (s(), n("div", Ur, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { style: u.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Rr),
              e("div", Ar, [
                (s(!0), n(H, null, q(t.items || [], (u, E) => (s(), n("div", {
                  key: E,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (B) => fe(t.id, E, B.target.value),
                    placeholder: `Item ${E + 1}`
                  }, null, 40, Br),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => Ae(t.id, E),
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
            ])) : t.type === "quote" ? (s(), n("div", Pr, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => S(t.id, { style: u.target.value })
              }, [...l[45] || (l[45] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Er),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => S(t.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Vr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => C(t.id)
              }, h(Se), 8, Mr)
            ])) : t.type === "social" ? (s(), n("div", Or, [
              e("div", Nr, [
                (s(!0), n(H, null, q(t.links || [], (u, E) => (s(), n("div", {
                  key: E,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (B) => Ue(t.id, E, "platform", B.target.value)
                  }, [...l[46] || (l[46] = [
                    Ne('<option value="facebook" data-v-5a131abf>Facebook</option><option value="twitter" data-v-5a131abf>Twitter / X</option><option value="instagram" data-v-5a131abf>Instagram</option><option value="linkedin" data-v-5a131abf>LinkedIn</option><option value="youtube" data-v-5a131abf>YouTube</option><option value="tiktok" data-v-5a131abf>TikTok</option><option value="custom" data-v-5a131abf>Custom</option>', 7)
                  ])], 40, Dr),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (B) => Ue(t.id, E, "url", B.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, zr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => ge(t.id, E),
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
            ])) : t.type === "video" ? (s(), n("div", Fr, [
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
              }, null, 40, qr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => S(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, Kr)
            ])) : t.type === "link_list" ? (s(), n("div", Yr, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => S(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Jr),
              e("div", Gr, [
                (s(!0), n(H, null, q(t.links || [], (u, E) => (s(), n("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (B) => ue(t.id, E, "text", B.target.value),
                    placeholder: "Label"
                  }, null, 40, Qr),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (B) => ue(t.id, E, "url", B.target.value),
                    placeholder: "URL"
                  }, null, 40, Xr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => T(t.id, E),
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
            ])) : t.type === "columns" ? (s(), n("div", td, [
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (u) => S(t.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, ad),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => O(t.id, "left")
              }, h(Se), 8, sd),
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
            ])) : t.type === "divider" ? (s(), n("div", od, [
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
            ])) : t.type === "row" ? (s(), n("div", pd, [
              l[54] || (l[54] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => K(t.id, { columnCount: Number(u.target.value) })
              }, [...l[53] || (l[53] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, md),
              (s(!0), n(H, null, q(t.cells || [], (u, E) => (s(), n("div", {
                key: E,
                class: "em-row-cell"
              }, [
                e("label", vd, "Column " + h(E + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (B) => ce(t.id, E, B.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, bd),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (B) => Z(t.id, E)
                }, h(Se), 8, gd)
              ]))), 128))
            ])) : t.type === "navbar" ? (s(), n("div", yd, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => S(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, fd),
              e("div", hd, [
                (s(!0), n(H, null, q(t.links || [], (u, E) => (s(), n("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (B) => D(t.id, E, "text", B.target.value),
                    placeholder: "Label"
                  }, null, 40, kd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (B) => D(t.id, E, "url", B.target.value),
                    placeholder: "URL"
                  }, null, 40, _d),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (B) => G(t.id, E),
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
            ])) : t.type === "accordion" ? (s(), n("div", xd, [
              (s(!0), n(H, null, q(t.items || [], (u, E) => (s(), n("div", {
                key: E,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (B) => Ce(t.id, E, "title", B.target.value),
                  placeholder: "Section title"
                }, null, 40, Cd),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (B) => Ce(t.id, E, "content", B.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Sd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (B) => k(t.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Id)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => F(t.id)
              }, "+ Add section", 8, Ud)
            ])) : t.type === "carousel" ? (s(), n("div", Rd, [
              (s(!0), n(H, null, q(t.slides || [], (u, E) => (s(), n("div", {
                key: E,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (B) => P(t.id, E, "imageUrl", B.target.value),
                  placeholder: "Image URL"
                }, null, 40, Ad),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (B) => P(t.id, E, "alt", B.target.value),
                  placeholder: "Alt text"
                }, null, 40, Bd),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (B) => P(t.id, E, "linkUrl", B.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Ld),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (B) => _(t.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Td)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => x(t.id)
              }, "+ Add slide", 8, Pd)
            ])) : t.type === "countdown" ? (s(), n("div", Ed, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (u) => S(t.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Vd),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (u) => S(t.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Md),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (s(), n("div", Od, [
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
            ])) : t.type === "liquid" ? (s(), n("div", Fd, [
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
              }, h(Se), 8, qd),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (s(), n("div", Kd, [
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
            ])) : t.type === "rss_feed" ? (s(), n("div", Qd, [
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
            ])) : t.type === "dynamic_image" ? (s(), n("div", tu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => S(t.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, au),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => S(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, su),
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
              (s(!0), n(H, null, q(y.value, (t) => (s(), n("option", {
                key: t,
                value: t
              }, h(t), 9, uu))), 128))
            ], 512), [
              [Oe, L.value]
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
              onClick: se
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
}, Bu = { class: "kb-email-inbox-strip" }, Lu = { class: "kb-email-inbox-from" }, Tu = { class: "kb-email-inbox-from-name" }, Pu = { class: "kb-email-inbox-from-addr" }, Eu = { class: "kb-email-inbox-subject" }, Vu = ["title"], Mu = {
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
  setup(a, { emit: r }) {
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
            const _ = k(x.text || "Button"), g = (x.url || "#").trim(), C = Math.min(24, Math.max(0, Number(x.borderRadius) ?? 8)), Z = !!x.fullWidth, se = !!x.ghost, Te = se ? "transparent" : "#0f172a", b = se ? "#0f172a" : "#fff", l = se ? "2px solid #0f172a" : "none", t = Z ? "block" : "inline-block", V = Z ? "100%" : "auto";
            P.push(
              `<p style="margin:0 0 12px;"><a href="${k(g)}" style="display:${t};width:${V};text-align:center;padding:12px 24px;background:${Te};color:${b};border:${l};text-decoration:none;font-size:14px;font-weight:600;border-radius:${C}px;">${_}</a></p>`
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
            const _ = Array.isArray(x.links) ? x.links : [], g = k(x.separator || " | "), Z = _.filter((se) => (se.text || se.url) && (se.url || "").trim()).map(
              (se) => `<a href="${k((se.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${k(se.text || "Link")}</a>`
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
            const _ = Math.min(4, Math.max(1, Number(x.columnCount) || 2)), g = Array.isArray(x.cells) ? x.cells.slice(0, _) : [], C = 100 / _, Z = Array.from({ length: _ }, (se, Te) => {
              const b = g[Te] ?? "", l = k(b).replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<td width="${C}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "—"}</td>`;
            }).join("");
            P.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${Z}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const _ = Array.isArray(x.links) ? x.links : [], g = k(x.separator || " | "), Z = _.filter((se) => (se.text || se.url) && (se.url || "").trim()).map(
              (se) => `<a href="${k((se.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${k(se.text || "Link")}</a>`
            );
            P.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${Z.length ? Z.join(g) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const g = (Array.isArray(x.items) ? x.items : []).map((C) => {
              const Z = k(C.title || "Section"), se = k(C.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${Z}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${se}</div></details>`;
            }).join("");
            P.push(g ? `<div style="margin:0 0 12px;">${g}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>');
            break;
          }
          case "carousel": {
            const g = (Array.isArray(x.slides) ? x.slides : []).filter((C) => (C.imageUrl || "").trim());
            if (g.length === 0)
              P.push('<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>');
            else {
              const C = g[0], Z = `<img src="${k(C.imageUrl)}" alt="${k(C.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, se = (C.linkUrl || "").trim();
              P.push(
                `<div style="margin:0 0 12px;">${se ? `<a href="${k(se)}">${Z}</a>` : Z}` + (g.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${g.length - 1} more slide(s)</p>` : "") + "</div>"
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
            const _ = (x.imageUrl || "").trim(), g = k(x.title || "Product"), C = k(x.price || ""), Z = k(x.buttonText || "Buy now"), se = (x.buttonUrl || "#").trim(), Te = _ ? `<img src="${k(_)}" alt="${k(x.alt || g)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            P.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${Te}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${g}</p>` + (C ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${C}</p>` : "") + `<a href="${k(se)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${Z}</a></div></div>`
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
    const d = a, o = r, {
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
      initial: d.modelValue,
      hooks: d.hooks,
      onDirty: () => o("change", m.value)
    }), { lastSavedAt: A } = je(m, { channel: "email" });
    function f(F) {
      (F.metaKey || F.ctrlKey) && F.key === "z" && (F.preventDefault(), F.shiftKey ? N() : Y());
    }
    De(() => {
      window.addEventListener("keydown", f);
    }), ze(() => {
      window.removeEventListener("keydown", f);
    }), ye(
      m,
      (F) => o("update:modelValue", F),
      { deep: !0 }
    );
    const ee = J(), pe = J(!0);
    async function oe() {
      if (W.estimateReach)
        try {
          ee.value = await W.estimateReach(m.value.audience);
        } catch {
          ee.value = void 0;
        }
      W.canSend && (pe.value = await Promise.resolve(W.canSend()));
    }
    oe(), ye(() => m.value.audience, oe, { deep: !0 });
    const me = I(() => p(ee.value)), be = I(() => me.value.blockingErrors), _e = I(() => me.value.warnings), ke = I(() => me.value.valid), ve = I(() => m.value.template_type ?? "transactional"), U = J(""), ae = J(!1), ne = J(null), S = I(() => {
      const F = U.value;
      return F ? Ve.find((k) => k.id === F) ?? null : null;
    });
    function fe(F) {
      const k = m.value, P = F.campaign.message ? { ...k.message, ...F.campaign.message } : k.message;
      y({
        ...F.campaign,
        message: P
      }), ne.value = null, ae.value = !1;
    }
    function we(F) {
      const k = F.target.value;
      if (!k) return;
      const P = it.find((x) => x.id === k);
      P && (v.value ? (ne.value = P, ae.value = !0) : fe(P), F.target.value = "");
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
    ), ue = I(
      () => m.value.message.email_html ?? ""
    ), Re = I(
      () => m.value.message.email_from_name ?? "Your App"
    ), T = I(
      () => m.value.message.email_from_address ?? "notifications@example.com"
    ), O = I(() => m.value.message.email_blocks ?? []), K = I(() => {
      const F = O.value;
      if (Array.isArray(F) && F.length > 0) return i(F);
      const k = ue.value;
      return k && k.trim() ? k : i([]);
    }), ce = I(() => {
      const F = xe.value;
      return S.value ? Pe(F, S.value.data) : F;
    }), D = I(() => {
      const F = ge.value;
      return S.value ? Pe(F, S.value.data) : F;
    }), z = I(() => {
      const F = K.value;
      return S.value ? Pe(F, S.value.data) : F;
    }), G = J("desktop");
    function Ce() {
      ke.value && o("save", m.value);
    }
    return (F, k) => (s(), n("div", bu, [
      e("div", gu, [
        re(qe, {
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
        be.value.length > 0 ? (s(), n("div", {
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
            (s(!0), n(H, null, q(be.value, (P) => (s(), n("li", {
              key: P.message
            }, h(P.message), 1))), 128))
          ], 4)
        ], 4)) : w("", !0),
        _e.value.length > 0 ? (s(), n("div", {
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
            (s(!0), n(H, null, q(_e.value, (P) => (s(), n("li", {
              key: P.message
            }, h(P.message), 1))), 128))
          ])
        ], 4)) : w("", !0)
      ]),
      e("div", fu, [
        e("aside", hu, [
          a.disabledSections.includes("email") ? w("", !0) : (s(), n("div", ku, [
            e("div", _u, [
              k[9] || (k[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", wu, [
                re(Ke, {
                  "template-type": ve.value,
                  onUpdate: Ae
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: we
                }, [
                  k[8] || (k[8] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(H, null, q(c(it), (P) => (s(), n("option", {
                    key: P.id,
                    value: P.id
                  }, h(P.label), 9, $u))), 128))
                ], 32)
              ])
            ]),
            re(vu, {
              message: c(m).message,
              "variable-options": a.variableOptions,
              "show-reset": !0,
              onUpdate: c(L),
              onReset: k[0] || (k[0] = (P) => c(R)({ email_blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", xu, [
          c(m).audience.test_mode ? (s(), n("div", Cu, [...k[10] || (k[10] = [
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
                  (s(!0), n(H, null, q(c(Ve), (P) => (s(), n("option", {
                    key: P.id,
                    value: P.id
                  }, h(P.label), 9, Ru))), 128))
                ], 512), [
                  [Oe, U.value]
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
                e("div", Eu, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: ce.value || "No subject"
                  }, h(ce.value || "No subject"), 9, Vu),
                  D.value ? (s(), n("span", Mu, " — " + h(D.value), 1)) : w("", !0)
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
        a.showDuplicate ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: k[4] || (k[4] = (P) => o("duplicate", JSON.parse(JSON.stringify(c(m)))))
        }, " Duplicate ")) : w("", !0),
        a.showSave ? (s(), n("button", {
          key: 1,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: Ce
        }, " Save ")) : w("", !0),
        a.showClose ? (s(), n("button", {
          key: 2,
          type: "button",
          class: "kb-email-action kb-email-action--primary",
          onClick: k[5] || (k[5] = (P) => o("edit"))
        }, " Close ")) : w("", !0)
      ]),
      ae.value ? (s(), n("div", zu, [
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
                ae.value = !1, ne.value = null;
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
}), kt = /* @__PURE__ */ ie(Fu, [["__scopeId", "data-v-a429d223"]]), ju = { class: "kb-shell" }, qu = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, Ku = ["aria-selected", "onClick"], Yu = { class: "kb-shell__meta" }, Ju = ["href"], Gu = { class: "kb-shell__body" }, Qu = /* @__PURE__ */ le({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(a, { emit: r }) {
    const i = r, d = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (o, m) => (s(), n("div", ju, [
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
        e("nav", qu, [
          (s(), n(H, null, q(d, (v) => e("button", {
            key: v.id,
            type: "button",
            class: de(["kb-shell__channel", { "kb-shell__channel--active": a.channel === v.id }]),
            role: "tab",
            "aria-selected": a.channel === v.id,
            onClick: (p) => i("switch-channel", v.id)
          }, h(v.label), 11, Ku)), 64))
        ]),
        e("div", Yu, [
          a.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: te({ padding: "2px 8px", borderRadius: `${c($e).input}px`, fontSize: "0.75rem", background: c(X).neutral.bg, color: c(X).neutral.textMuted })
          }, h(a.environment), 5)) : w("", !0),
          a.helpUrl ? (s(), n("a", {
            key: 1,
            href: a.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: te({ color: c(X).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Ju)) : w("", !0)
        ])
      ], 4),
      e("div", Gu, [
        Le(o.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Xu = /* @__PURE__ */ ie(Qu, [["__scopeId", "data-v-0df30803"]]), Zu = {
  class: "kb-outline",
  "aria-label": "Sections"
}, ec = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, tc = ["onClick"], ac = /* @__PURE__ */ le({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(a) {
    var m;
    const r = a, i = J(((m = r.items[0]) == null ? void 0 : m.id) ?? "");
    let d = null;
    function o(v) {
      const p = document.getElementById(v);
      p && p.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return De(() => {
      const v = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      v && (d = new IntersectionObserver(
        (p) => {
          for (const y of p)
            if (y.isIntersecting) {
              const L = y.target.getAttribute("data-outline-id");
              L && (i.value = L);
            }
        },
        { root: v === document ? null : v, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((p) => {
        const y = document.getElementById(p.id);
        y && (d == null || d.observe(y));
      }));
    }), ze(() => {
      d == null || d.disconnect();
    }), ye(
      () => r.items,
      (v) => {
        v.length && !i.value && (i.value = v[0].id);
      },
      { immediate: !0 }
    ), (v, p) => (s(), n("nav", Zu, [
      e("ul", ec, [
        (s(!0), n(H, null, q(a.items, (y) => (s(), n("li", {
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
}), sc = /* @__PURE__ */ ie(ac, [["__scopeId", "data-v-25c37675"]]), nc = ["id"], lc = {
  key: 1,
  class: "kb-form-shell__head"
}, oc = /* @__PURE__ */ le({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(a) {
    return (r, i) => (s(), n("div", {
      class: "kb-form-shell",
      id: a.sectionId ?? void 0,
      style: te({
        padding: `${c(j)[24]}px ${c(j)[24]}px ${c(j)[32]}px`,
        marginBottom: 0
      })
    }, [
      a.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: te({ marginBottom: c(j)[24], paddingBottom: c(j)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: te({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: c(j)[12] })
        }, h(a.label), 5),
        Le(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", lc, [
        Le(r.$slots, "head", {}, void 0, !0)
      ])),
      Le(r.$slots, "default", {}, void 0, !0)
    ], 12, nc));
  }
}), ic = /* @__PURE__ */ ie(oc, [["__scopeId", "data-v-6504df41"]]), rc = /* @__PURE__ */ le({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(a) {
    return (r, i) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: te({
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
      Le(r.$slots, "default")
    ], 4));
  }
}), dc = /* @__PURE__ */ le({
  __name: "BuilderTopShell",
  setup(a) {
    return (r, i) => (s(), n("div", {
      class: "kb-top-shell",
      style: te({
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
function uc(a) {
  a.component("KeosNotificationBuilder", yt), a.component("KeosWhatsAppBuilder", ft), a.component("KeosSmsBuilder", ht), a.component("KeosEmailBuilder", kt), a.component("BuilderShell", Xu), a.component("BuilderOutline", sc), a.component("BuilderVersionHistoryModal", gt), a.component("BuilderFormShell", ic), a.component("BuilderActionsBar", rc), a.component("BuilderTopShell", dc);
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
  sc as BuilderOutline,
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
  Pe as renderTemplatePreview,
  je as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
