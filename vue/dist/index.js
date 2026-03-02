import { ref as Q, watch as _e, computed as C, defineComponent as re, openBlock as a, createElementBlock as n, normalizeStyle as se, unref as c, createElementVNode as e, Fragment as j, renderList as Y, toDisplayString as k, createTextVNode as ee, createCommentVNode as h, normalizeClass as ve, withDirectives as Re, vModelSelect as Oe, vModelText as Ge, vModelCheckbox as wt, createStaticVNode as Me, withKeys as xt, onMounted as De, onUnmounted as ze, createVNode as ye, createBlock as St, renderSlot as Te } from "vue";
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
}, Ct = ["android", "ios", "web"], dt = "normal", ut = ["low", "normal", "high"], ct = 86400, It = [3600, 7200, 86400, 172800], pt = "1.0", Ut = ["topic", "segment", "user_list"];
function Qe() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Ct],
    test_mode: !1
  };
}
function Xe() {
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
function Ze() {
  return {
    priority: dt,
    ttl: ct,
    quiet_hours: !1,
    local_time: !1,
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
function Rt(t) {
  return {
    schema_version: pt,
    name: "",
    status: "draft",
    audience: Qe(),
    message: Xe(),
    delivery: Ze(),
    tracking: et(),
    ...t
  };
}
function mt(t) {
  const r = t;
  return r.schema_version || (r.schema_version = pt), r.audience || (r.audience = Qe()), r.message || (r.message = Xe()), r.delivery || (r.delivery = Ze()), r.tracking || (r.tracking = et()), ut.includes(r.delivery.priority) || (r.delivery.priority = dt), r.delivery.ttl === void 0 && (r.delivery.ttl = ct), Ut.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const Lt = 1e5;
function Bt(t, r) {
  var d, g, $;
  const o = [], i = r ?? t.audience.estimated_reach;
  return i !== void 0 && i >= Lt && o.push({
    message: `Estimated reach is very high (${i.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), t.tracking && !((d = t.tracking.campaign_name) != null && d.trim()) && !((g = t.name) != null && g.trim()) && o.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), ($ = t.message.deep_link) != null && $.trim() || o.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), o;
}
function vt(t, r = "error") {
  return { message: t, severity: r };
}
function bt(t) {
  const r = [];
  return t.schema_version || r.push(vt("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function At(t, r) {
  const o = bt(t), i = Bt(t, r);
  return {
    valid: o.valid,
    errors: [
      ...o.errors,
      ...i.map((d) => vt(d.message, d.severity))
    ]
  };
}
function Tt(t) {
  return t.errors.filter((r) => r.severity === "error");
}
function Pt(t) {
  return t.errors.filter((r) => r.severity !== "error");
}
function Ve(t, r) {
  return t.length <= r ? { text: t, truncated: !1 } : { text: t.slice(0, Math.max(0, r - 3)) + "...", truncated: !0 };
}
const We = He.android;
function Vt(t) {
  const { title: r, body: o } = t, i = Ve(r || "", We.title), d = Ve(o || "", We.body);
  return {
    title: i.text,
    body: d.text,
    imageUrl: t.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: d.truncated,
    expanded: !1
  };
}
function Et(t) {
  const { title: r, body: o } = t, i = Ve(r || "", We.title), d = Ve(o || "", We.body);
  return {
    title: i.text,
    body: d.text,
    imageUrl: t.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: d.truncated,
    expanded: !0
  };
}
function Nt(t, r = {}) {
  const o = r.expanded ? Et(t) : Vt(t);
  return r.darkMode !== void 0 && (o.darkMode = r.darkMode), o;
}
const tt = He.ios;
function gt(t) {
  const { title: r, body: o } = t, i = Ve(r || "", tt.title), d = Ve(o || "", tt.body);
  return {
    title: i.text,
    body: d.text,
    imageUrl: t.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: d.truncated,
    expanded: !1
  };
}
function Ot(t) {
  return gt(t);
}
function Mt(t, r = {}) {
  const o = r.variant === "lockscreen" ? Ot(t) : gt(t);
  return r.darkMode !== void 0 && (o.darkMode = r.darkMode), o;
}
const st = He.web;
function at(t) {
  const { title: r, body: o } = t, i = Ve(r || "", st.title), d = Ve(o || "", st.body);
  return {
    title: i.text,
    body: d.text,
    imageUrl: t.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: d.truncated
  };
}
function Dt(t) {
  return t.map((r) => ({ message: r, severity: "error" }));
}
function Je(t) {
  return JSON.parse(JSON.stringify(t));
}
function Fe(t = {}) {
  const r = Q(
    mt(t.initial ?? Rt())
  ), o = t.hooks ?? {}, i = Q(!1), d = Q([]);
  _e(
    r,
    () => {
      if (!o.customValidators) {
        d.value = [];
        return;
      }
      o.customValidators(r.value).then((L) => {
        d.value = L;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const g = Q([]), $ = Q([]);
  function p() {
    const L = Je(r.value);
    g.value = [...g.value.slice(-19), L], $.value = [];
  }
  const v = C(() => g.value.length > 0), w = C(() => $.value.length > 0);
  function S() {
    g.value.length !== 0 && ($.value = [Je(r.value), ...$.value], r.value = g.value[g.value.length - 1], g.value = g.value.slice(0, -1));
  }
  function B() {
    $.value.length !== 0 && (g.value = [...g.value, Je(r.value)], r.value = $.value[0], $.value = $.value.slice(1));
  }
  _e(
    r,
    () => {
      var L;
      i.value = !0, (L = t.onDirty) == null || L.call(t);
    },
    { deep: !0 }
  );
  const f = C(() => bt(r.value));
  function U(L) {
    const ae = At(r.value, L), ne = Dt(d.value), x = [...Tt(ae), ...ne], fe = [...ae.errors, ...ne], ke = ae.valid && ne.length === 0;
    return {
      ...ae,
      errors: fe,
      valid: ke,
      blockingErrors: x,
      warnings: Pt(ae)
    };
  }
  function O(L) {
    p(), r.value = { ...r.value, ...L };
  }
  function W(L) {
    p(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...L }
    };
  }
  function R(L) {
    p(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...L }
    };
  }
  function E(L) {
    p(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...L }
    };
  }
  function P(L) {
    p(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...L } : { campaign_name: "", tags: [], ab_test: !1, ...L }
    };
  }
  function oe(L) {
    p(), r.value = {
      ...r.value,
      message: { ...Xe(), ...L }
    };
  }
  function ce(L) {
    p(), r.value = {
      ...r.value,
      delivery: { ...Ze(), ...L }
    };
  }
  function de(L) {
    p(), r.value = {
      ...r.value,
      tracking: { ...et(), ...L }
    };
  }
  function pe(L) {
    p(), r.value = {
      ...r.value,
      audience: { ...Qe(), ...L }
    };
  }
  const ge = C(() => ({
    title: r.value.message.title,
    body: r.value.message.body,
    imageUrl: r.value.message.image_url
  }));
  function $e(L, ae) {
    const ne = ge.value;
    let x;
    switch (L) {
      case "android":
        x = Nt(ne, { expanded: ae == null ? void 0 : ae.expanded });
        break;
      case "ios":
        x = Mt(ne);
        break;
      case "web":
        x = at(ne);
        break;
      default:
        x = at(ne);
    }
    const fe = r.value.message.actions ?? [], ke = r.value.message.location;
    return { ...x, actions: fe, location: ke ?? void 0 };
  }
  const ie = He;
  async function me() {
    return o.customValidators ? o.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: i,
    validation: f,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: d,
    getValidationWithWarnings: U,
    update: O,
    updateAudience: W,
    updateMessage: R,
    updateDelivery: E,
    updateTracking: P,
    undo: S,
    redo: B,
    canUndo: v,
    canRedo: w,
    resetMessage: oe,
    resetDelivery: ce,
    resetTracking: de,
    resetAudience: pe,
    getPreview: $e,
    previewInput: ge,
    characterLimits: ie,
    runCustomValidators: me,
    hooks: o
  };
}
const zt = "keos-draft", Wt = 2e3;
function Ht(t, r) {
  return `${zt}-${t}-${r}`;
}
function je(t, r) {
  const o = r.channel, i = C(
    () => {
      var S, B;
      return Ht(
        o,
        r.key ?? ((S = t.value) == null ? void 0 : S.id) ?? ((B = t.value) == null ? void 0 : B.name) ?? "draft"
      );
    }
  ), d = Q(null);
  let g = null;
  function $() {
    try {
      const S = JSON.stringify(t.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(i.value, S), d.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function p() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(i.value);
    } catch {
    }
  }
  function v() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const S = window.localStorage.getItem(i.value);
      if (!S) return null;
      const B = JSON.parse(S);
      return mt(B);
    } catch {
      return null;
    }
  }
  function w() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return _e(
    t,
    () => {
      w() && (g && clearTimeout(g), g = setTimeout(() => {
        g = null, $();
      }, Wt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: d,
    clearDraft: p,
    getDraft: v,
    persist: $
  };
}
const Ft = { class: "kb-header__row" }, jt = ["value"], qt = { class: "kb-header__actions" }, Kt = ["disabled"], Yt = ["disabled"], Jt = ["value"], Gt = ["value"], Qt = /* @__PURE__ */ re({
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
  setup(t, { emit: r }) {
    const o = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], i = t, d = r;
    function g(v) {
      return i.slugifyName ? v.trim().replace(/\s+/g, "-") : v;
    }
    function $(v) {
      return v.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function p(v) {
      const w = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return w[v] ?? w.draft;
    }
    return (v, w) => (a(), n("header", {
      class: "kb-header",
      style: se({
        padding: `${c(q)[16]}px 0`,
        borderBottom: `1px solid ${c(te).neutral.border}`,
        marginBottom: `${c(q)[16]}px`
      })
    }, [
      e("div", Ft, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: t.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: w[0] || (w[0] = (S) => d("update:campaignName", g(S.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, jt),
        e("div", qt, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !t.canUndo,
            onClick: w[1] || (w[1] = (S) => d("undo"))
          }, " Undo ", 8, Kt),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !t.canRedo,
            onClick: w[2] || (w[2] = (S) => d("redo"))
          }, " Redo ", 8, Yt)
        ]),
        t.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: t.workflowStatus,
          class: "kb-header__status-select",
          style: se({
            padding: `${c(q)[4]}px ${c(q)[8]}px`,
            borderRadius: `${c(Ce).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...p(t.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: w[3] || (w[3] = (S) => d("update:workflowStatus", S.target.value))
        }, [
          (a(), n(j, null, Y(o, (S) => e("option", {
            key: S.value,
            value: S.value
          }, k(S.label), 9, Gt)), 64))
        ], 44, Jt)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: se({
            padding: `${c(q)[4]}px ${c(q)[8]}px`,
            borderRadius: `${c(Ce).input}px`,
            background: c(te).neutral.bg,
            fontSize: "0.8125rem",
            color: c(te).neutral.textMuted
          })
        }, k(t.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: se({ fontSize: "0.8125rem", color: c(te).neutral.textMuted, marginTop: `${c(q)[4]}px` })
      }, [
        t.saving ? (a(), n(j, { key: 0 }, [
          ee("Saving…")
        ], 64)) : t.dirty ? (a(), n(j, { key: 1 }, [
          ee("Unsaved changes")
        ], 64)) : t.lastSavedAt ? (a(), n(j, { key: 2 }, [
          ee("Last saved at " + k($(t.lastSavedAt)), 1)
        ], 64)) : h("", !0)
      ], 4)
    ], 4));
  }
}), be = (t, r) => {
  const o = t.__vccOpts || t;
  for (const [i, d] of r)
    o[i] = d;
  return o;
}, qe = /* @__PURE__ */ be(Qt, [["__scopeId", "data-v-ef058bcb"]]), Xt = { class: "kb-section" }, Zt = { class: "kb-section__head" }, es = { class: "kb-section__desc" }, ts = { class: "kb-field" }, ss = { class: "kb-label" }, as = { class: "kb-field-with-rail" }, ns = ["value", "aria-invalid", "aria-describedby"], ls = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, os = { class: "kb-field" }, is = { class: "kb-label" }, rs = { class: "kb-field-with-rail" }, ds = ["value", "aria-invalid", "aria-describedby"], us = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, cs = { class: "kb-field" }, ps = ["value", "aria-invalid", "aria-describedby"], ms = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, vs = { class: "kb-field" }, bs = ["value", "aria-invalid", "aria-describedby"], gs = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, ys = { class: "kb-field" }, fs = { class: "kb-location-row" }, ks = ["value"], hs = ["value"], _s = ["value"], $s = ["value"], ws = { class: "kb-field" }, xs = { class: "kb-actions-list" }, Ss = ["value", "onInput"], Cs = ["value", "onInput"], Is = ["onClick"], Us = ["disabled"], Rs = { class: "kb-action-chips" }, Ls = ["disabled", "onClick"], Bs = /* @__PURE__ */ re({
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
    const r = t;
    return (o, i) => {
      var d, g, $, p;
      return a(), n("section", Xt, [
        e("div", Zt, [
          i[10] || (i[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: i[0] || (i[0] = (v) => o.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        e("p", es, " Message body is required. Title is optional. Character limits depend on the selected platform (" + k(t.selectedPlatform) + "). ", 1),
        e("div", ts, [
          e("label", ss, [
            i[11] || (i[11] = ee(" Title ", -1)),
            e("span", {
              class: ve(["kb-counter", { "kb-counter--warn": t.titleCount > t.titleLimit }])
            }, k(t.titleCount) + "/" + k(t.titleLimit), 3)
          ]),
          e("div", as, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: t.message.title,
              "aria-invalid": !!t.titleError,
              "aria-describedby": t.titleError ? "title-error" : void 0,
              onInput: i[1] || (i[1] = (v) => o.$emit("update", { title: v.target.value }))
            }, null, 40, ns),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: se({ "--pct": Math.min(100, t.titleCount / t.titleLimit * 100) + "%" })
            }, [...i[12] || (i[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          t.titleError ? (a(), n("p", ls, k(t.titleError), 1)) : h("", !0)
        ]),
        e("div", os, [
          e("label", is, [
            i[13] || (i[13] = ee(" Message ", -1)),
            e("span", {
              class: ve(["kb-counter", { "kb-counter--warn": t.bodyCount > t.bodyLimit }])
            }, k(t.bodyCount) + "/" + k(t.bodyLimit), 3)
          ]),
          e("div", rs, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: t.message.body,
              "aria-invalid": !!t.bodyError,
              "aria-describedby": t.bodyError ? "body-error" : void 0,
              onInput: i[2] || (i[2] = (v) => o.$emit("update", { body: v.target.value }))
            }, null, 40, ds),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: se({ "--pct": Math.min(100, t.bodyCount / t.bodyLimit * 100) + "%" })
            }, [...i[14] || (i[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          t.bodyError ? (a(), n("p", us, k(t.bodyError), 1)) : h("", !0)
        ]),
        e("div", cs, [
          i[15] || (i[15] = e("label", { class: "kb-label" }, [
            ee(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: t.message.image_url,
            "aria-invalid": !!t.imageUrlError,
            "aria-describedby": t.imageUrlError ? "image-url-error" : void 0,
            onInput: i[3] || (i[3] = (v) => o.$emit("update", { image_url: v.target.value || void 0 }))
          }, null, 40, ps),
          t.imageUrlError ? (a(), n("p", ms, k(t.imageUrlError), 1)) : h("", !0)
        ]),
        e("div", vs, [
          i[16] || (i[16] = e("label", { class: "kb-label" }, [
            ee(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: t.message.deep_link,
            "aria-invalid": !!t.deepLinkError,
            "aria-describedby": t.deepLinkError ? "deeplink-error" : void 0,
            onInput: i[4] || (i[4] = (v) => o.$emit("update", { deep_link: v.target.value || void 0 }))
          }, null, 40, bs),
          t.deepLinkError ? (a(), n("p", gs, k(t.deepLinkError), 1)) : h("", !0)
        ]),
        e("div", ys, [
          i[17] || (i[17] = e("label", { class: "kb-label" }, [
            ee(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", fs, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((d = t.message.location) == null ? void 0 : d.lat) ?? "",
              onInput: i[5] || (i[5] = (v) => {
                const w = { ...t.message.location ?? {} }, S = v.target.value;
                w.lat = S === "" ? void 0 : Number(S), o.$emit("update", { location: w });
              })
            }, null, 40, ks),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((g = t.message.location) == null ? void 0 : g.lon) ?? "",
              onInput: i[6] || (i[6] = (v) => {
                const w = { ...t.message.location ?? {} }, S = v.target.value;
                w.lon = S === "" ? void 0 : Number(S), o.$emit("update", { location: w });
              })
            }, null, 40, hs)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: (($ = t.message.location) == null ? void 0 : $.name) ?? "",
            onInput: i[7] || (i[7] = (v) => {
              const w = { ...t.message.location ?? {} };
              w.name = v.target.value || void 0, o.$emit("update", { location: w });
            })
          }, null, 40, _s),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((p = t.message.location) == null ? void 0 : p.address) ?? "",
            onInput: i[8] || (i[8] = (v) => {
              const w = { ...t.message.location ?? {} };
              w.address = v.target.value || void 0, o.$emit("update", { location: w });
            })
          }, null, 40, $s)
        ]),
        e("div", ws, [
          i[19] || (i[19] = e("label", { class: "kb-label" }, [
            ee(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", xs, [
            (a(!0), n(j, null, Y(r.message.actions ?? [], (v, w) => (a(), n("div", {
              key: v.id || w,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: v.label,
                onInput: (S) => {
                  var U;
                  const B = [...r.message.actions ?? []], f = Number(w);
                  B[f] = {
                    ...B[f],
                    id: ((U = B[f]) == null ? void 0 : U.id) || `action_${f + 1}`,
                    label: S.target.value
                  }, o.$emit("update", { actions: B });
                }
              }, null, 40, Ss),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: v.url,
                onInput: (S) => {
                  var U;
                  const B = [...r.message.actions ?? []], f = Number(w);
                  B[f] = {
                    ...B[f],
                    id: ((U = B[f]) == null ? void 0 : U.id) || `action_${f + 1}`,
                    url: S.target.value || void 0
                  }, o.$emit("update", { actions: B });
                }
              }, null, 40, Cs),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const S = [...r.message.actions ?? []];
                  S.splice(Number(w), 1), o.$emit("update", { actions: S });
                }
              }, " Remove ", 8, Is)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: i[9] || (i[9] = () => {
                const v = [...r.message.actions ?? []];
                v.push({
                  id: `action_${v.length + 1}`,
                  label: "",
                  url: ""
                }), o.$emit("update", { actions: v });
              })
            }, " Add action ", 8, Us),
            e("div", Rs, [
              i[18] || (i[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (a(), n(j, null, Y(["View order", "Track shipment", "Open app"], (v) => e("button", {
                key: v,
                type: "button",
                class: "kb-action-chip",
                disabled: (r.message.actions ?? []).length >= 3,
                onClick: () => {
                  const w = [...r.message.actions ?? []];
                  w.push({
                    id: `action_${Date.now()}`,
                    label: v,
                    url: ""
                  }), o.$emit("update", { actions: w });
                }
              }, k(v), 9, Ls)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), As = /* @__PURE__ */ be(Bs, [["__scopeId", "data-v-7bc3a44c"]]), Ts = { class: "kb-section kb-section--inline-personalization" }, Ps = { class: "kb-field" }, Vs = { class: "kb-insert-row" }, Es = ["value"], Ns = { class: "kb-field" }, Os = { class: "kb-insert-row" }, Ms = { class: "kb-field" }, Ds = { class: "kb-variable-list" }, zs = /* @__PURE__ */ re({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(t, { emit: r }) {
    const o = t, i = r, d = ["first_name", "last_name", "order_id", "city"], g = Q(o.variableOptions ?? d), $ = Q(g.value[0] ?? d[0]), p = Q("");
    _e(
      () => o.variableOptions,
      (B) => {
        B && B.length && (g.value = [...B], g.value.includes($.value) || ($.value = g.value[0]));
      }
    );
    const v = C(() => g.value);
    function w(B) {
      i("insertVariable", { variable: $.value, field: B });
    }
    function S() {
      const B = p.value.trim();
      B && (g.value.includes(B) || (g.value = [...g.value, B]), $.value = B, p.value = "");
    }
    return (B, f) => (a(), n("section", Ts, [
      f[8] || (f[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      f[9] || (f[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ps, [
        f[4] || (f[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Vs, [
          Re(e("select", {
            "onUpdate:modelValue": f[0] || (f[0] = (U) => $.value = U),
            class: "kb-select"
          }, [
            (a(!0), n(j, null, Y(v.value, (U) => (a(), n("option", {
              key: U,
              value: U
            }, k(U), 9, Es))), 128))
          ], 512), [
            [Oe, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: f[1] || (f[1] = (U) => w("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: f[2] || (f[2] = (U) => w("body"))
          }, "Into message")
        ])
      ]),
      e("div", Ns, [
        f[5] || (f[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Os, [
          Re(e("input", {
            "onUpdate:modelValue": f[3] || (f[3] = (U) => p.value = U),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [Ge, p.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: S
          }, " Add ")
        ])
      ]),
      e("div", Ms, [
        f[6] || (f[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        f[7] || (f[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ds, [
          (a(!0), n(j, null, Y(v.value, (U) => (a(), n("li", { key: U }, [
            e("code", null, "{{ " + k(U) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), yt = /* @__PURE__ */ be(zs, [["__scopeId", "data-v-6d49f6dc"]]), Ws = { class: "kb-section kb-section--template-type" }, Hs = { class: "kb-field" }, Fs = { class: "kb-radio-group" }, js = { class: "kb-radio" }, qs = ["checked"], Ks = { class: "kb-radio" }, Ys = ["checked"], Js = /* @__PURE__ */ re({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(t, { emit: r }) {
    const o = r;
    return (i, d) => (a(), n("section", Ws, [
      d[5] || (d[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      d[6] || (d[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Hs, [
        e("div", Fs, [
          e("label", js, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: t.templateType === "transactional",
              onChange: d[0] || (d[0] = (g) => o("update", "transactional"))
            }, null, 40, qs),
            d[2] || (d[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ks, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: t.templateType === "marketing",
              onChange: d[1] || (d[1] = (g) => o("update", "marketing"))
            }, null, 40, Ys),
            d[3] || (d[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        d[4] || (d[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), Ke = /* @__PURE__ */ be(Js, [["__scopeId", "data-v-991f74e5"]]), Gs = { class: "kb-section" }, Qs = { class: "kb-section__head" }, Xs = { class: "kb-section__desc" }, Zs = { class: "kb-field" }, ea = { class: "kb-radio-group" }, ta = { class: "kb-radio" }, sa = ["checked"], aa = { class: "kb-radio" }, na = ["checked"], la = {
  key: 0,
  class: "kb-field kb-row"
}, oa = ["value"], ia = ["value"], ra = { class: "kb-field" }, da = ["value"], ua = ["value"], ca = { class: "kb-field" }, pa = ["value"], ma = ["value"], va = { class: "kb-field" }, ba = { class: "kb-checkbox" }, ga = ["checked"], ya = /* @__PURE__ */ re({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t) {
    const r = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (o, i) => {
      var d;
      return a(), n("section", Gs, [
        e("div", Qs, [
          i[8] || (i[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: i[0] || (i[0] = (g) => o.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        e("p", Xs, k(t.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Zs, [
          i[11] || (i[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", ea, [
            e("label", ta, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !t.delivery.scheduled_at,
                onChange: i[1] || (i[1] = (g) => o.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, sa),
              i[9] || (i[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", aa, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!t.delivery.scheduled_at,
                onChange: i[2] || (i[2] = (g) => o.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, na),
              i[10] || (i[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        t.delivery.scheduled_at ? (a(), n("div", la, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (d = t.delivery.scheduled_at) == null ? void 0 : d.slice(0, 16),
            onInput: i[3] || (i[3] = (g) => o.$emit("update", { scheduled_at: g.target.value }))
          }, null, 40, oa),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: t.delivery.timezone,
            onInput: i[4] || (i[4] = (g) => o.$emit("update", { timezone: g.target.value }))
          }, null, 40, ia)
        ])) : h("", !0),
        t.showPushOptions ? (a(), n(j, { key: 1 }, [
          e("div", ra, [
            i[12] || (i[12] = e("label", { class: "kb-label" }, [
              ee(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: t.delivery.ttl,
              onChange: i[5] || (i[5] = (g) => o.$emit("update", { ttl: Number(g.target.value) }))
            }, [
              (a(!0), n(j, null, Y(c(It), (g) => (a(), n("option", {
                key: g,
                value: g
              }, k(r[g] ?? g + "s"), 9, ua))), 128))
            ], 40, da)
          ]),
          e("div", ca, [
            i[13] || (i[13] = e("label", { class: "kb-label" }, [
              ee(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: t.delivery.priority,
              onChange: i[6] || (i[6] = (g) => o.$emit("update", { priority: g.target.value }))
            }, [
              (a(!0), n(j, null, Y(c(ut), (g) => (a(), n("option", {
                key: g,
                value: g
              }, k(g), 9, ma))), 128))
            ], 40, pa)
          ]),
          e("div", va, [
            e("label", ba, [
              e("input", {
                type: "checkbox",
                checked: t.delivery.quiet_hours,
                onChange: i[7] || (i[7] = (g) => o.$emit("update", { quiet_hours: !t.delivery.quiet_hours }))
              }, null, 40, ga),
              i[14] || (i[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : h("", !0)
      ]);
    };
  }
}), fa = /* @__PURE__ */ be(ya, [["__scopeId", "data-v-a208b72f"]]), ka = { class: "kb-accordion" }, ha = { class: "kb-accordion__body" }, _a = { class: "kb-field" }, $a = ["value"], wa = { class: "kb-field" }, xa = { class: "kb-checkbox" }, Sa = ["checked"], Ca = /* @__PURE__ */ re({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(t) {
    return (r, o) => (a(), n("details", ka, [
      o[4] || (o[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", ha, [
        e("div", _a, [
          o[2] || (o[2] = e("label", { class: "kb-label" }, [
            ee(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: t.delivery.collapse_key,
            onInput: o[0] || (o[0] = (i) => r.$emit("update", { collapse_key: i.target.value || void 0 }))
          }, null, 40, $a)
        ]),
        e("div", wa, [
          e("label", xa, [
            e("input", {
              type: "checkbox",
              checked: t.delivery.silent_push,
              onChange: o[1] || (o[1] = (i) => r.$emit("update", { silent_push: !t.delivery.silent_push }))
            }, null, 40, Sa),
            o[3] || (o[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ia = /* @__PURE__ */ be(Ca, [["__scopeId", "data-v-e0f5c559"]]);
function Pe(t, r) {
  return !t || typeof t != "string" ? t : t.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (o, i) => {
    const d = i.trim();
    return d in r ? String(r[d]) : `{{ ${i} }}`;
  });
}
const Ee = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Ua = { class: "kb-preview" }, Ra = {
  key: 0,
  class: "kb-preview__toggle"
}, La = { class: "kb-checkbox" }, Ba = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, Aa = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, Ta = ["src"], Pa = { class: "kb-android-body-row" }, Va = { class: "kb-android-body-content" }, Ea = {
  key: 0,
  class: "kb-android-title"
}, Na = {
  key: 1,
  class: "kb-android-text"
}, Oa = {
  key: 2,
  class: "kb-android-location-line"
}, Ma = {
  key: 0,
  class: "kb-android-thumb"
}, Da = ["src"], za = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Wa = ["src"], Ha = {
  key: 0,
  class: "kb-preview-map__caption"
}, Fa = {
  key: 2,
  class: "kb-android-actions"
}, ja = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, qa = { class: "kb-ios-banner" }, Ka = { class: "kb-ios-content" }, Ya = {
  key: 0,
  class: "kb-ios-title"
}, Ja = {
  key: 1,
  class: "kb-ios-text"
}, Ga = {
  key: 2,
  class: "kb-preview-map kb-preview-map--ios"
}, Qa = ["src"], Xa = {
  key: 0,
  class: "kb-preview-map__caption"
}, Za = {
  key: 3,
  class: "kb-ios-actions"
}, en = {
  key: 0,
  class: "kb-ios-thumb"
}, tn = ["src"], sn = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, an = { class: "kb-web-toast" }, nn = { class: "kb-web-body" }, ln = {
  key: 0,
  class: "kb-web-title"
}, on = {
  key: 1,
  class: "kb-web-text"
}, rn = {
  key: 2,
  class: "kb-web-image"
}, dn = ["src"], un = {
  key: 3,
  class: "kb-preview-map kb-preview-map--web"
}, cn = ["src"], pn = {
  key: 0,
  class: "kb-preview-map__caption"
}, mn = {
  key: 0,
  class: "kb-web-actions"
}, vn = /* @__PURE__ */ re({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(t) {
    const r = t, o = Q(!1), i = C(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? o.value : void 0
      })
    ), d = C(() => {
      const p = i.value;
      return r.previewProfile ? {
        ...p,
        title: Pe((p == null ? void 0 : p.title) ?? "", r.previewProfile.data),
        body: Pe((p == null ? void 0 : p.body) ?? "", r.previewProfile.data)
      } : p;
    }), g = C(() => {
      var f;
      const p = (f = d.value) == null ? void 0 : f.location;
      if (!p || p.lat == null && p.lon == null) return null;
      const v = Number(p.lat) || 0, w = Number(p.lon) || 0, S = 8e-3, B = [w - S, v - S, w + S, v + S].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(B)}&layer=mapnik&marker=${v},${w}`;
    }), $ = C(() => {
      var v;
      const p = (v = d.value) == null ? void 0 : v.location;
      return p && (p.lat != null || p.lon != null || p.name || p.address);
    });
    return (p, v) => {
      var w, S, B, f, U, O, W, R, E, P, oe, ce, de, pe, ge, $e;
      return a(), n("div", Ua, [
        t.selectedPlatform === "android" ? (a(), n("div", Ra, [
          e("label", La, [
            Re(e("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (ie) => o.value = ie),
              type: "checkbox"
            }, null, 512), [
              [wt, o.value]
            ]),
            v[1] || (v[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : h("", !0),
        t.selectedPlatform === "android" ? (a(), n("div", Ba, [
          v[4] || (v[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ve(["kb-android-notification", { "kb-android-notification--expanded": o.value }])
          }, [
            v[3] || (v[3] = Me('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: ve(["kb-android-body", { "kb-android-body--expanded": o.value }])
            }, [
              o.value && d.value.imageUrl ? (a(), n("div", Aa, [
                e("img", {
                  src: d.value.imageUrl,
                  alt: ""
                }, null, 8, Ta)
              ])) : h("", !0),
              e("div", Pa, [
                e("div", Va, [
                  d.value.title ? (a(), n("div", Ea, k(d.value.title), 1)) : h("", !0),
                  d.value.body ? (a(), n("div", Na, k(d.value.body), 1)) : h("", !0),
                  $.value && !o.value && ((w = d.value.location) != null && w.name || (S = d.value.location) != null && S.address) ? (a(), n("div", Oa, [
                    v[2] || (v[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    ee(" " + k(((B = d.value.location) == null ? void 0 : B.name) || ((f = d.value.location) == null ? void 0 : f.address)), 1)
                  ])) : h("", !0)
                ]),
                !o.value && d.value.imageUrl ? (a(), n("div", Ma, [
                  e("img", {
                    src: d.value.imageUrl,
                    alt: ""
                  }, null, 8, Da)
                ])) : h("", !0)
              ]),
              $.value && g.value && o.value ? (a(), n("div", za, [
                e("iframe", {
                  src: g.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Wa),
                (U = d.value.location) != null && U.name || (O = d.value.location) != null && O.address ? (a(), n("div", Ha, k(((W = d.value.location) == null ? void 0 : W.name) || ((R = d.value.location) == null ? void 0 : R.address)), 1)) : h("", !0)
              ])) : h("", !0),
              d.value.actions && d.value.actions.length ? (a(), n("div", Fa, [
                (a(!0), n(j, null, Y(d.value.actions, (ie) => (a(), n("button", {
                  key: ie.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, k(ie.label || "Action"), 1))), 128))
              ])) : h("", !0)
            ], 2)
          ], 2)
        ])) : t.selectedPlatform === "ios" ? (a(), n("div", ja, [
          v[7] || (v[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", qa, [
            v[6] || (v[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", Ka, [
              v[5] || (v[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              d.value.title ? (a(), n("div", Ya, k(d.value.title), 1)) : h("", !0),
              d.value.body ? (a(), n("div", Ja, k(d.value.body), 1)) : h("", !0),
              $.value && g.value ? (a(), n("div", Ga, [
                e("iframe", {
                  src: g.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Qa),
                (E = d.value.location) != null && E.name || (P = d.value.location) != null && P.address ? (a(), n("div", Xa, k(((oe = d.value.location) == null ? void 0 : oe.name) || ((ce = d.value.location) == null ? void 0 : ce.address)), 1)) : h("", !0)
              ])) : h("", !0),
              d.value.actions && d.value.actions.length ? (a(), n("div", Za, [
                (a(!0), n(j, null, Y(d.value.actions, (ie) => (a(), n("button", {
                  key: ie.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, k(ie.label || "Action"), 1))), 128))
              ])) : h("", !0)
            ]),
            d.value.imageUrl ? (a(), n("div", en, [
              e("img", {
                src: d.value.imageUrl,
                alt: ""
              }, null, 8, tn)
            ])) : h("", !0)
          ])
        ])) : (a(), n("div", sn, [
          v[9] || (v[9] = Me('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", an, [
            v[8] || (v[8] = Me('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", nn, [
              d.value.title ? (a(), n("div", ln, k(d.value.title), 1)) : h("", !0),
              d.value.body ? (a(), n("div", on, k(d.value.body), 1)) : h("", !0),
              d.value.imageUrl ? (a(), n("div", rn, [
                e("img", {
                  src: d.value.imageUrl,
                  alt: ""
                }, null, 8, dn)
              ])) : h("", !0),
              $.value && g.value ? (a(), n("div", un, [
                e("iframe", {
                  src: g.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, cn),
                (de = d.value.location) != null && de.name || (pe = d.value.location) != null && pe.address ? (a(), n("div", pn, k(((ge = d.value.location) == null ? void 0 : ge.name) || (($e = d.value.location) == null ? void 0 : $e.address)), 1)) : h("", !0)
              ])) : h("", !0)
            ]),
            d.value.actions && d.value.actions.length ? (a(), n("div", mn, [
              (a(!0), n(j, null, Y(d.value.actions, (ie, me) => (a(), n("button", {
                key: ie.id || me,
                type: "button",
                class: ve(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(me) > 0 }])
              }, k(ie.label || "Action"), 3))), 128))
            ])) : h("", !0)
          ])
        ]))
      ]);
    };
  }
}), bn = /* @__PURE__ */ be(vn, [["__scopeId", "data-v-1d6293a0"]]), gn = { class: "kb-version-dialog" }, yn = {
  key: 0,
  class: "kb-version-empty"
}, fn = {
  key: 1,
  class: "kb-version-list"
}, kn = { class: "kb-version-item-label" }, hn = ["onClick"], _n = { class: "kb-version-actions" }, $n = /* @__PURE__ */ re({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(t, { emit: r }) {
    const o = r;
    function i(d) {
      try {
        return new Date(d).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return d;
      }
    }
    return (d, g) => t.open ? (a(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: g[1] || (g[1] = xt(($) => o("close"), ["escape"]))
    }, [
      e("div", gn, [
        g[2] || (g[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        g[3] || (g[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        t.versions.length === 0 ? (a(), n("div", yn, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", fn, [
          (a(!0), n(j, null, Y(t.versions, ($) => (a(), n("li", {
            key: $.id,
            class: "kb-version-item"
          }, [
            e("span", kn, k($.label || i($.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (p) => {
                o("restore", $.snapshot), o("close");
              }
            }, " Restore ", 8, hn)
          ]))), 128))
        ])),
        e("div", _n, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: g[0] || (g[0] = ($) => o("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : h("", !0);
  }
}), ft = /* @__PURE__ */ be($n, [["__scopeId", "data-v-ce35a513"]]), nt = [
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
], lt = [
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
], it = [
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
], wn = { class: "keos-notification-builder" }, xn = { class: "kb-builder-top" }, Sn = { style: { margin: 0, paddingLeft: "1.25rem" } }, Cn = { class: "kb-push-layout" }, In = { class: "kb-push-sidebar" }, Un = {
  key: 0,
  class: "kb-push-form"
}, Rn = {
  key: 0,
  class: "kb-hint-card"
}, Ln = { class: "kb-push-form-head" }, Bn = { class: "kb-push-form-head-row" }, An = ["value"], Tn = {
  key: 1,
  class: "kb-push-form"
}, Pn = { class: "kb-push-canvas" }, Vn = {
  key: 0,
  class: "kb-push-test-banner"
}, En = { class: "kb-push-preview-chrome" }, Nn = { class: "kb-push-preview-controls" }, On = { class: "kb-push-preview-as" }, Mn = ["value"], Dn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, zn = ["aria-selected", "aria-controls", "onClick"], Wn = { class: "kb-push-preview-frame" }, Hn = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Fn = { class: "kb-push-actions" }, jn = {
  key: 0,
  class: "kb-actions-note"
}, qn = { class: "kb-push-actions-right" }, Kn = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, Yn = { class: "kb-confirm-dialog" }, Jn = { class: "kb-confirm-actions" }, Gn = /* @__PURE__ */ re({
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
  setup(t, { emit: r }) {
    const o = t, i = r, d = Q("android"), g = Q(""), $ = Q(!1), p = Q(null), v = Q(!1), w = C(
      () => O.value.workflow_status ?? "draft"
    ), S = C(() => {
      const I = g.value;
      return I ? Ee.find((m) => m.id === I) ?? null : null;
    });
    function B(I) {
      const m = O.value, y = I.campaign.message ? { ...m.message, ...I.campaign.message } : m.message, M = I.campaign.delivery ? { ...m.delivery, ...I.campaign.delivery } : m.delivery;
      P({
        ...I.campaign,
        message: y,
        delivery: M
      }), p.value = null, $.value = !1;
    }
    function f(I) {
      const m = I.target.value;
      if (!m) return;
      const y = nt.find((M) => M.id === m);
      y && (W.value ? (p.value = y, $.value = !0) : B(y), I.target.value = "");
    }
    function U(I) {
      O.value = I, v.value = !1;
    }
    const {
      campaign: O,
      dirty: W,
      customValidatorErrors: R,
      getValidationWithWarnings: E,
      update: P,
      updateMessage: oe,
      updateDelivery: ce,
      undo: de,
      redo: pe,
      canUndo: ge,
      canRedo: $e,
      resetMessage: ie,
      resetDelivery: me,
      getPreview: L,
      characterLimits: ae,
      hooks: ne
    } = Fe({
      initial: o.modelValue,
      hooks: {
        ...o.hooks,
        customValidators: async (I) => {
          var M, J, le, b;
          const m = [];
          (M = I.name) != null && M.trim() || m.push("Template name is required"), (le = (J = I.message) == null ? void 0 : J.body) != null && le.trim() || m.push("Message body is required");
          const y = (b = o.hooks) != null && b.customValidators ? await o.hooks.customValidators(I) : [];
          return [...m, ...y];
        }
      },
      onDirty: () => i("change", O.value)
    }), { lastSavedAt: x } = je(O, { channel: "push" });
    function fe(I) {
      (I.metaKey || I.ctrlKey) && I.key === "z" && (I.preventDefault(), I.shiftKey ? pe() : de());
    }
    De(() => {
      window.addEventListener("keydown", fe);
    }), ze(() => {
      window.removeEventListener("keydown", fe);
    }), _e(O, (I) => i("update:modelValue", I), { deep: !0 });
    const ke = Q(), Ae = Q(!0), Le = Q(!0);
    async function Ie() {
      if (ne.estimateReach)
        try {
          ke.value = await ne.estimateReach(O.value.audience);
        } catch {
          ke.value = void 0;
        }
      ne.canSend && (Ae.value = await Promise.resolve(ne.canSend())), ne.canSchedule && (Le.value = await Promise.resolve(ne.canSchedule()));
    }
    Ie(), _e(() => O.value.audience, Ie, { deep: !0 });
    const we = C(() => (R.value, E(ke.value))), he = C(() => we.value.blockingErrors), Be = C(() => we.value.warnings), A = C(() => we.value.valid), D = C(
      () => ae[d.value].title
    ), K = C(() => ae[d.value].body), ue = C(() => O.value.message.title.length), z = C(() => O.value.message.body.length), H = C(() => {
      if (ue.value > D.value)
        return `Title exceeds ${D.value} characters for ${d.value}.`;
    }), X = C(() => {
      const I = he.value.find(
        (m) => m.message === "Message body is required"
      );
      if (I) return I.message;
      if (z.value > K.value)
        return `Body exceeds ${K} characters for ${d.value}.`;
    }), xe = C(
      () => O.value.template_type ?? "transactional"
    );
    function F(I) {
      P({ template_type: I });
    }
    function _(I) {
      P({
        name: I,
        tracking: { ...O.value.tracking ?? {}, campaign_name: I }
      });
    }
    function G(I) {
      const m = ` {{ ${I.variable} }}`, y = O.value.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...y, I.variable]));
      I.field === "title" ? oe({
        title: O.value.message.title + m,
        variables: M
      }) : oe({
        body: O.value.message.body + m,
        variables: M
      });
    }
    function Z() {
      A.value && i("save", O.value);
    }
    return (I, m) => (a(), n("div", wn, [
      e("div", xn, [
        ye(qe, {
          "campaign-name": c(O).name,
          status: c(O).status,
          dirty: c(W),
          "last-saved-at": c(x),
          "can-undo": c(ge),
          "can-redo": c($e),
          "workflow-status": w.value,
          "slugify-name": o.enforceSlugName,
          "onUpdate:campaignName": _,
          "onUpdate:workflowStatus": m[0] || (m[0] = (y) => c(P)({ workflow_status: y })),
          onUndo: c(de),
          onRedo: c(pe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        he.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({
            background: c(te).dangerBg,
            border: `1px solid ${c(te).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[12]}px ${c(q)[16]}px`,
            marginBottom: `${c(q)[16]}px`
          })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(j, null, Y(he.value, (y) => (a(), n("li", {
              key: y.message
            }, k(y.message), 1))), 128))
          ], 4)
        ], 4)) : h("", !0),
        Be.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({
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
            style: se({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Sn, [
            (a(!0), n(j, null, Y(Be.value, (y) => (a(), n("li", {
              key: y.message
            }, k(y.message), 1))), 128))
          ])
        ], 4)) : h("", !0)
      ]),
      e("div", Cn, [
        e("aside", In, [
          t.disabledSections.includes("message") ? h("", !0) : (a(), n("div", Un, [
            !c(O).message.title && !c(O).message.body ? (a(), n("div", Rn, " Add a title and message below to get started. ")) : h("", !0),
            e("div", Ln, [
              m[13] || (m[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", Bn, [
                ye(Ke, {
                  "template-type": xe.value,
                  onUpdate: F
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: f
                }, [
                  m[12] || (m[12] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(c(nt), (y) => (a(), n("option", {
                    key: y.id,
                    value: y.id
                  }, k(y.label), 9, An))), 128))
                ], 32)
              ])
            ]),
            ye(As, {
              message: c(O).message,
              "title-count": ue.value,
              "body-count": z.value,
              "title-limit": D.value,
              "body-limit": K.value,
              "selected-platform": d.value,
              "show-reset": !0,
              "title-error": H.value,
              "body-error": X.value,
              onUpdate: c(oe),
              onReset: m[1] || (m[1] = (y) => c(ie)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            ye(yt, {
              message: c(O).message,
              "variable-options": t.variableOptions,
              onUpdate: c(oe),
              onInsertVariable: G
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !t.designOnly && !t.disabledSections.includes("delivery") ? (a(), n("div", Tn, [
            m[14] || (m[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            ye(fa, {
              delivery: c(O).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: c(ce),
              onReset: m[2] || (m[2] = (y) => c(me)())
            }, null, 8, ["delivery", "onUpdate"]),
            ye(Ia, {
              delivery: c(O).delivery,
              onUpdate: c(ce)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : h("", !0)
        ]),
        e("main", Pn, [
          !t.designOnly && c(O).audience.test_mode ? (a(), n("div", Vn, [...m[15] || (m[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : h("", !0),
          e("div", En, [
            e("div", Nn, [
              e("label", On, [
                m[17] || (m[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": m[3] || (m[3] = (y) => g.value = y),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  m[16] || (m[16] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(c(Ee), (y) => (a(), n("option", {
                    key: y.id,
                    value: y.id
                  }, k(y.label), 9, Mn))), 128))
                ], 512), [
                  [Oe, g.value]
                ])
              ])
            ]),
            e("div", Dn, [
              (a(), n(j, null, Y(["android", "ios", "web"], (y) => e("button", {
                key: y,
                type: "button",
                class: ve(["kb-push-device-btn", { "kb-push-device-btn--active": d.value === y }]),
                role: "tab",
                "aria-selected": d.value === y,
                "aria-controls": `kb-preview-panel-${y}`,
                onClick: (M) => d.value = y
              }, k(y.toUpperCase()), 11, zn)), 64))
            ]),
            e("div", Wn, [
              !c(O).message.title && !c(O).message.body ? (a(), n("div", Hn, [...m[18] || (m[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (a(), St(bn, {
                key: 1,
                "get-preview": c(L),
                "selected-platform": d.value,
                "preview-profile": S.value,
                "onUpdate:selectedPlatform": m[4] || (m[4] = (y) => d.value = y)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", Fn, [
        o.actionsNote ? (a(), n("div", jn, k(o.actionsNote), 1)) : h("", !0),
        e("div", qn, [
          !t.designOnly && t.showHistory ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[5] || (m[5] = (y) => v.value = !0)
          }, " Version history ")) : h("", !0),
          !t.designOnly && t.showSaveVersion ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[6] || (m[6] = (y) => i("save-version", JSON.parse(JSON.stringify(c(O)))))
          }, " Save as version ")) : h("", !0),
          t.showDuplicate ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[7] || (m[7] = (y) => i("duplicate", JSON.parse(JSON.stringify(c(O)))))
          }, " Duplicate ")) : h("", !0),
          t.showSave ? (a(), n("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: Z
          }, " Save ")) : h("", !0),
          t.showClose ? (a(), n("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: m[8] || (m[8] = (y) => i("edit"))
          }, " Close ")) : h("", !0)
        ])
      ]),
      $.value ? (a(), n("div", Kn, [
        e("div", Yn, [
          m[19] || (m[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          m[20] || (m[20] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Jn, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: m[9] || (m[9] = (y) => {
                $.value = !1, p.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: m[10] || (m[10] = (y) => p.value && B(p.value))
            }, " Replace ")
          ])
        ])
      ])) : h("", !0),
      ye(ft, {
        open: v.value,
        versions: t.versions,
        onClose: m[11] || (m[11] = (y) => v.value = !1),
        onRestore: U
      }, null, 8, ["open", "versions"])
    ]));
  }
}), kt = /* @__PURE__ */ be(Gn, [["__scopeId", "data-v-64f25140"]]), Qn = { class: "kb-section" }, Xn = { class: "kb-section__head" }, Zn = { class: "kb-field" }, el = ["value"], tl = { class: "kb-field" }, sl = ["value"], al = {
  key: 0,
  class: "kb-field"
}, nl = ["value"], ll = {
  key: 1,
  class: "kb-field"
}, ol = ["value"], il = {
  key: 2,
  class: "kb-field kb-field--inline"
}, rl = { class: "kb-location-row" }, dl = ["value"], ul = ["value"], cl = ["value"], pl = ["value"], ml = {
  key: 3,
  class: "kb-field"
}, vl = ["value"], bl = {
  key: 4,
  class: "kb-field"
}, gl = ["value"], yl = {
  key: 5,
  class: "kb-field"
}, fl = { class: "kb-wa-buttons" }, kl = ["value", "onInput"], hl = ["value", "onInput"], _l = ["onClick"], $l = {
  key: 6,
  class: "kb-field"
}, wl = ["value"], xl = ["value"], Sl = { class: "kb-field" }, Cl = ["value"], Il = { class: "kb-field" }, Ul = ["value"], Rl = {
  key: 7,
  class: "kb-field kb-wa-template-fields"
}, Ll = { class: "kb-wa-fields-list" }, Bl = { class: "kb-wa-field-name" }, Al = { class: "kb-wa-field-status" }, Tl = { class: "kb-field" }, Pl = ["value"], Vl = { class: "kb-field" }, El = { class: "kb-wa-buttons" }, Nl = ["value", "onInput"], Ol = ["value", "onChange"], Ml = ["value", "onInput"], Dl = ["value", "onInput"], zl = ["onClick"], Wl = ["disabled"], Hl = /* @__PURE__ */ re({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: r }) {
    const o = t, i = r;
    function d($) {
      if (!$ || typeof $ != "string") return [];
      const p = /\{\{\s*([^}]+?)\s*\}\}/g, v = /* @__PURE__ */ new Set();
      let w;
      for (; (w = p.exec($)) !== null; ) v.add(w[1].trim());
      return Array.from(v);
    }
    const g = C(() => {
      const $ = o.message.header ?? "", p = o.message.body ?? o.message.body ?? "", v = new Set(o.message.variables ?? []), w = [...d($), ...d(p)];
      return Array.from(new Set(w)).map((B) => ({ name: B, configured: v.has(B) }));
    });
    return ($, p) => {
      var v, w, S, B;
      return a(), n("section", Qn, [
        e("div", Xn, [
          p[18] || (p[18] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (f) => $.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        p[37] || (p[37] = e("p", { class: "kb-section__desc" }, " Configure how this campaign will look when sent as a WhatsApp template message. ", -1)),
        e("div", Zn, [
          p[20] || (p[20] = e("label", { class: "kb-label" }, [
            ee(" Template type "),
            e("span", { class: "kb-helper" }, "Match the content type approved in WhatsApp (text, media, coupon, offer, catalog, etc.).")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: o.message.template_type ?? "text",
            onChange: p[1] || (p[1] = (f) => i("update", {
              template_type: f.target.value
            }))
          }, [...p[19] || (p[19] = [
            Me('<option value="text" data-v-b3ddb55c>Text</option><option value="image" data-v-b3ddb55c>Image</option><option value="video" data-v-b3ddb55c>Video</option><option value="document" data-v-b3ddb55c>Document</option><option value="location" data-v-b3ddb55c>Location</option><option value="coupon" data-v-b3ddb55c>Coupon code</option><option value="lto" data-v-b3ddb55c>Limited time offer</option><option value="mpm" data-v-b3ddb55c>Multi product message</option><option value="catalog" data-v-b3ddb55c>Catalog</option><option value="auth" data-v-b3ddb55c>Authentication</option>', 10)
          ])], 40, el)
        ]),
        e("div", tl, [
          p[21] || (p[21] = e("label", { class: "kb-label" }, [
            ee(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: o.message.template_name ?? "",
            onInput: p[2] || (p[2] = (f) => i("update", {
              template_name: f.target.value || void 0
            }))
          }, null, 40, sl)
        ]),
        ["image", "video", "document"].includes(o.message.template_type ?? "text") ? (a(), n("div", al, [
          p[22] || (p[22] = e("label", { class: "kb-label" }, [
            ee(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: o.message.media_url ?? "",
            onInput: p[3] || (p[3] = (f) => i("update", {
              media_url: f.target.value || void 0
            }))
          }, null, 40, nl)
        ])) : h("", !0),
        ["image", "video", "document"].includes(o.message.template_type ?? "text") ? (a(), n("div", ll, [
          p[23] || (p[23] = e("label", { class: "kb-label" }, [
            ee(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: o.message.media_caption ?? "",
            onInput: p[4] || (p[4] = (f) => i("update", {
              media_caption: f.target.value || void 0
            }))
          }, null, 40, ol)
        ])) : h("", !0),
        o.message.template_type === "location" ? (a(), n("div", il, [
          p[24] || (p[24] = e("label", { class: "kb-label" }, [
            ee(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", rl, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((v = o.message.location) == null ? void 0 : v.lat) ?? "",
              onInput: p[5] || (p[5] = (f) => {
                const U = { ...o.message.location ?? {} };
                U.lat = Number(f.target.value), i("update", { location: U });
              })
            }, null, 40, dl),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((w = o.message.location) == null ? void 0 : w.lon) ?? "",
              onInput: p[6] || (p[6] = (f) => {
                const U = { ...o.message.location ?? {} };
                U.lon = Number(f.target.value), i("update", { location: U });
              })
            }, null, 40, ul)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((S = o.message.location) == null ? void 0 : S.name) ?? "",
            onInput: p[7] || (p[7] = (f) => {
              const U = { ...o.message.location ?? {} };
              U.name = f.target.value || void 0, i("update", { location: U });
            })
          }, null, 40, cl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((B = o.message.location) == null ? void 0 : B.address) ?? "",
            onInput: p[8] || (p[8] = (f) => {
              const U = { ...o.message.location ?? {} };
              U.address = f.target.value || void 0, i("update", { location: U });
            })
          }, null, 40, pl)
        ])) : h("", !0),
        o.message.template_type === "coupon" ? (a(), n("div", ml, [
          p[25] || (p[25] = e("label", { class: "kb-label" }, [
            ee(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: o.message.coupon_code ?? "",
            onInput: p[9] || (p[9] = (f) => i("update", {
              coupon_code: f.target.value || void 0
            }))
          }, null, 40, vl)
        ])) : h("", !0),
        o.message.template_type === "lto" ? (a(), n("div", bl, [
          p[26] || (p[26] = e("label", { class: "kb-label" }, [
            ee(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: o.message.lto_expiry ?? "",
            onInput: p[10] || (p[10] = (f) => i("update", {
              lto_expiry: f.target.value || void 0
            }))
          }, null, 40, gl)
        ])) : h("", !0),
        ["mpm", "catalog"].includes(o.message.template_type) ? (a(), n("div", yl, [
          p[27] || (p[27] = e("label", { class: "kb-label" }, [
            ee(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", fl, [
            (a(!0), n(j, null, Y(o.message.products ?? [], (f, U) => (a(), n("div", {
              key: f.id || U,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: f.productId,
                onInput: (O) => {
                  var E;
                  const W = [...o.message.products ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `prod_${R + 1}`,
                    productId: O.target.value
                  }, i("update", { products: W });
                }
              }, null, 40, kl),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: f.sectionTitle,
                onInput: (O) => {
                  var E;
                  const W = [...o.message.products ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `prod_${R + 1}`,
                    sectionTitle: O.target.value || void 0
                  }, i("update", { products: W });
                }
              }, null, 40, hl),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const O = [...o.message.products ?? []];
                  O.splice(Number(U), 1), i("update", { products: O });
                }
              }, " Remove ", 8, _l)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: p[11] || (p[11] = () => {
                const U = [...o.message.products ?? []];
                U.push({
                  id: `prod_${U.length + 1}`,
                  productId: ""
                }), i("update", { products: U });
              })
            }, " Add product ")
          ])
        ])) : h("", !0),
        o.message.template_type === "auth" ? (a(), n("div", $l, [
          p[29] || (p[29] = e("label", { class: "kb-label" }, [
            ee(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: o.message.auth_type ?? "otp",
            onChange: p[12] || (p[12] = (f) => i("update", {
              auth_type: f.target.value
            }))
          }, [...p[28] || (p[28] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, wl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: o.message.auth_label ?? "",
            onInput: p[13] || (p[13] = (f) => i("update", {
              auth_label: f.target.value || void 0
            }))
          }, null, 40, xl)
        ])) : h("", !0),
        e("div", Sl, [
          p[30] || (p[30] = e("label", { class: "kb-label" }, [
            ee(" Header (optional) "),
            e("span", { class: "kb-helper" }, "Short text or variable used as the WhatsApp template header.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: o.message.header ?? "",
            onInput: p[14] || (p[14] = (f) => i("update", {
              header: f.target.value || void 0
            }))
          }, null, 40, Cl)
        ]),
        e("div", Il, [
          p[31] || (p[31] = e("label", { class: "kb-label" }, [
            ee(" Body "),
            e("span", { class: "kb-helper" }, " Use the exact template body including variables like " + k(1) + ", " + k(2) + " as approved in WhatsApp. ")
          ], -1)),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: o.message.body ?? "",
            onInput: p[15] || (p[15] = (f) => i("update", {
              body: f.target.value || void 0
            }))
          }, null, 40, Ul)
        ]),
        g.value.length > 0 ? (a(), n("div", Rl, [
          p[32] || (p[32] = e("label", { class: "kb-label" }, "Template fields", -1)),
          p[33] || (p[33] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", Ll, [
            (a(!0), n(j, null, Y(g.value, (f) => (a(), n("li", {
              key: f.name,
              class: ve(["kb-wa-field-item", { "kb-wa-field-item--ok": f.configured }])
            }, [
              e("span", Bl, k(f.name), 1),
              e("span", Al, k(f.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : h("", !0),
        e("div", Tl, [
          p[34] || (p[34] = e("label", { class: "kb-label" }, [
            ee(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: o.message.footer ?? "",
            onInput: p[16] || (p[16] = (f) => i("update", {
              footer: f.target.value || void 0
            }))
          }, null, 40, Pl)
        ]),
        e("div", Vl, [
          p[36] || (p[36] = e("label", { class: "kb-label" }, [
            ee(" Buttons (optional) "),
            e("span", { class: "kb-helper" }, " Add quick replies or call-to-action buttons. Order should match your provider configuration. ")
          ], -1)),
          e("div", El, [
            (a(!0), n(j, null, Y(o.message.buttons ?? [], (f, U) => (a(), n("div", {
              key: f.id || U,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: f.label,
                onInput: (O) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    label: O.target.value
                  }, i("update", { buttons: W });
                }
              }, null, 40, Nl),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: f.type ?? "quick_reply",
                onChange: (O) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    type: O.target.value
                  }, i("update", { buttons: W });
                }
              }, [...p[35] || (p[35] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1)
              ])], 40, Ol),
              f.type === "url" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: f.url,
                onInput: (O) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    url: O.target.value || void 0
                  }, i("update", { buttons: W });
                }
              }, null, 40, Ml)) : f.type === "call" ? (a(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: f.phone,
                onInput: (O) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    phone: O.target.value || void 0
                  }, i("update", { buttons: W });
                }
              }, null, 40, Dl)) : h("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const O = [...o.message.buttons ?? []];
                  O.splice(Number(U), 1), i("update", { buttons: O });
                }
              }, " Remove ", 8, zl)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: (o.message.buttons ?? []).length >= 3,
              onClick: p[17] || (p[17] = () => {
                const U = [...o.message.buttons ?? []];
                U.push({
                  id: `btn_${U.length + 1}`,
                  label: "",
                  type: "quick_reply"
                }), i("update", { buttons: U });
              })
            }, " Add button ", 8, Wl)
          ])
        ])
      ]);
    };
  }
}), Fl = /* @__PURE__ */ be(Hl, [["__scopeId", "data-v-b3ddb55c"]]), jl = { class: "phone-theme-toggle" }, ql = { class: "chat-area" }, Kl = { class: "bubble" }, Yl = {
  key: 0,
  class: "header"
}, Jl = {
  key: 0,
  class: "header-text"
}, Gl = ["src"], Ql = ["src"], Xl = {
  key: 3,
  class: "document"
}, Zl = ["innerHTML"], eo = {
  key: 1,
  class: "location-card"
}, to = ["src"], so = { class: "location-info" }, ao = {
  key: 2,
  class: "catalog-card"
}, no = { class: "catalog-header" }, lo = { class: "catalog-title" }, oo = {
  key: 3,
  class: "multi-products"
}, io = ["src"], ro = { class: "product-info" }, uo = { class: "title" }, co = { class: "price" }, po = {
  key: 4,
  class: "coupon"
}, mo = { class: "coupon-code" }, vo = {
  key: 5,
  class: "offer"
}, bo = {
  key: 6,
  class: "auth"
}, go = { class: "auth-code" }, yo = {
  key: 7,
  class: "footer"
}, fo = {
  key: 8,
  class: "buttons"
}, ko = /* @__PURE__ */ re({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(t) {
    const r = t, o = Q("light"), i = C(() => o.value === "dark");
    function d(p) {
      return String(p).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const g = C(() => {
      var w;
      const p = ((w = r.template) == null ? void 0 : w.body) ?? "";
      return d(p).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), $ = C(() => {
      const p = r.template.location;
      if (!p) return "";
      const { lat: v, lng: w } = p;
      return v == null || w == null ? "" : `https://maps.googleapis.com/maps/api/staticmap?center=${v},${w}&zoom=15&size=600x300&markers=${v},${w}`;
    });
    return (p, v) => {
      var w, S;
      return a(), n("div", {
        class: ve(["wa-wrapper", { "wa-wrapper--dark": i.value }])
      }, [
        e("div", {
          class: ve(["phone", { "phone--dark": i.value }])
        }, [
          e("div", jl, [
            e("button", {
              type: "button",
              class: ve(["phone-theme-btn", { "phone-theme-btn--active": !i.value }]),
              onClick: v[0] || (v[0] = (B) => o.value = "light")
            }, " Light ", 2),
            e("button", {
              type: "button",
              class: ve(["phone-theme-btn", { "phone-theme-btn--active": i.value }]),
              onClick: v[1] || (v[1] = (B) => o.value = "dark")
            }, " Dark ", 2)
          ]),
          v[12] || (v[12] = e("div", { class: "phone-header" }, [
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
          e("div", ql, [
            e("div", Kl, [
              t.template.header ? (a(), n("div", Yl, [
                t.template.header.type === "text" ? (a(), n("div", Jl, k(t.template.header.text), 1)) : t.template.header.type === "image" ? (a(), n("img", {
                  key: 1,
                  src: t.template.header.url,
                  class: "media",
                  alt: ""
                }, null, 8, Gl)) : t.template.header.type === "video" ? (a(), n("video", {
                  key: 2,
                  src: t.template.header.url,
                  controls: "",
                  class: "media"
                }, null, 8, Ql)) : t.template.header.type === "document" ? (a(), n("div", Xl, " 📄 " + k(t.template.header.filename), 1)) : h("", !0)
              ])) : h("", !0),
              e("div", {
                class: "body",
                innerHTML: g.value
              }, null, 8, Zl),
              t.template.location ? (a(), n("div", eo, [
                $.value ? (a(), n("img", {
                  key: 0,
                  src: $.value,
                  class: "map",
                  alt: ""
                }, null, 8, to)) : h("", !0),
                e("div", so, [
                  e("strong", null, k(t.template.location.name), 1),
                  e("div", null, k(t.template.location.address), 1)
                ])
              ])) : h("", !0),
              t.template.catalog ? (a(), n("div", ao, [
                e("div", no, [
                  v[2] || (v[2] = ee(" 🛍 ", -1)),
                  e("span", lo, k(typeof t.template.catalog == "object" && t.template.catalog.label ? t.template.catalog.label : "Full catalog"), 1)
                ]),
                v[3] || (v[3] = e("div", { class: "catalog-sub" }, "Browse all items", -1)),
                v[4] || (v[4] = e("div", { class: "catalog-cta" }, "VIEW CATALOG", -1))
              ])) : h("", !0),
              (w = t.template.multiProduct) != null && w.length ? (a(), n("div", oo, [
                (a(!0), n(j, null, Y(t.template.multiProduct, (B, f) => (a(), n("div", {
                  key: f,
                  class: "product"
                }, [
                  B.image ? (a(), n("img", {
                    key: 0,
                    src: B.image,
                    alt: ""
                  }, null, 8, io)) : h("", !0),
                  e("div", ro, [
                    e("div", uo, k(B.name), 1),
                    e("div", co, k(B.price), 1)
                  ])
                ]))), 128))
              ])) : h("", !0),
              t.template.coupon ? (a(), n("div", po, [
                v[6] || (v[6] = e("div", { class: "coupon-discount" }, "Special offer", -1)),
                e("div", mo, [
                  v[5] || (v[5] = ee(" Code: ", -1)),
                  e("span", null, k(t.template.coupon.code), 1)
                ]),
                v[7] || (v[7] = e("div", { class: "coupon-cta" }, "COPY CODE", -1))
              ])) : h("", !0),
              t.template.limitedOffer ? (a(), n("div", vo, " ⏳ Offer expires " + k(t.template.limitedOffer), 1)) : h("", !0),
              t.template.auth ? (a(), n("div", bo, [
                v[8] || (v[8] = e("div", { class: "auth-icon" }, "🔐", -1)),
                v[9] || (v[9] = e("div", { class: "auth-title" }, "Confirm your phone number", -1)),
                e("div", go, k(t.template.auth.code), 1),
                v[10] || (v[10] = e("button", {
                  type: "button",
                  class: "auth-btn"
                }, "CONTINUE", -1))
              ])) : h("", !0),
              t.template.footer ? (a(), n("div", yo, k(t.template.footer), 1)) : h("", !0),
              (S = t.template.buttons) != null && S.length ? (a(), n("div", fo, [
                (a(!0), n(j, null, Y(t.template.buttons, (B, f) => (a(), n("button", {
                  key: f,
                  type: "button",
                  class: "button"
                }, k(B.text), 1))), 128))
              ])) : h("", !0),
              v[11] || (v[11] = e("div", { class: "time" }, " 12:45 ✓✓ ", -1))
            ])
          ])
        ], 2)
      ], 2);
    };
  }
}), ho = /* @__PURE__ */ be(ko, [["__scopeId", "data-v-76cc6100"]]), _o = { class: "keos-whatsapp-builder" }, $o = { class: "kb-builder-top" }, wo = { style: { margin: 0, paddingLeft: "1.25rem" } }, xo = { class: "kb-wa-layout" }, So = { class: "kb-wa-sidebar" }, Co = {
  key: 0,
  class: "kb-wa-form"
}, Io = { class: "kb-wa-form-head" }, Uo = { class: "kb-wa-form-head-row" }, Ro = ["value"], Lo = { class: "kb-wa-canvas" }, Bo = {
  key: 0,
  class: "kb-wa-test-banner"
}, Ao = { class: "kb-wa-preview-chrome" }, To = { class: "kb-push-preview-controls" }, Po = { class: "kb-push-preview-as" }, Vo = ["value"], Eo = { class: "kb-wa-preview-frame" }, No = { class: "kb-wa-actions" }, Oo = {
  key: 0,
  class: "kb-actions-note"
}, Mo = { class: "kb-wa-actions-right" }, Do = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, zo = { class: "kb-confirm-dialog" }, Wo = { class: "kb-confirm-actions" }, Ho = /* @__PURE__ */ re({
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
  setup(t, { emit: r }) {
    const o = t, i = r, {
      campaign: d,
      dirty: g,
      customValidatorErrors: $,
      getValidationWithWarnings: p,
      update: v,
      updateMessage: w,
      undo: S,
      redo: B,
      canUndo: f,
      canRedo: U,
      resetMessage: O,
      hooks: W
    } = Fe({
      initial: o.modelValue,
      hooks: {
        ...o.hooks,
        customValidators: async (A) => {
          var ue, z;
          const D = [];
          (ue = A.name) != null && ue.trim() || D.push("Template name is required");
          const K = (z = o.hooks) != null && z.customValidators ? await o.hooks.customValidators(A) : [];
          return [...D, ...K];
        }
      },
      onDirty: () => i("change", d.value)
    }), { lastSavedAt: R } = je(d, { channel: "whatsapp" });
    function E(A) {
      (A.metaKey || A.ctrlKey) && A.key === "z" && (A.preventDefault(), A.shiftKey ? B() : S());
    }
    De(() => {
      window.addEventListener("keydown", E);
    }), ze(() => {
      window.removeEventListener("keydown", E);
    }), _e(d, (A) => i("update:modelValue", A), { deep: !0 });
    const P = Q(), oe = Q(!0);
    async function ce() {
      if (W.estimateReach)
        try {
          P.value = await W.estimateReach(d.value.audience);
        } catch {
          P.value = void 0;
        }
      W.canSend && (oe.value = await Promise.resolve(W.canSend()));
    }
    ce(), _e(() => d.value.audience, ce, { deep: !0 });
    const de = C(() => ($.value, p(P.value))), pe = C(() => de.value.blockingErrors), ge = C(() => de.value.warnings), $e = C(() => de.value.valid), ie = Q(""), me = Q(!1), L = Q(null), ae = C(() => {
      const A = ie.value;
      return A ? Ee.find((D) => D.id === A) ?? null : null;
    }), ne = C(() => {
      const A = d.value.message.body ?? "";
      return ae.value ? Pe(A, ae.value.data) : A;
    }), x = C(() => {
      const A = d.value.message.header ?? "";
      return ae.value ? Pe(A, ae.value.data) : A;
    }), fe = C(() => {
      const A = d.value.message, D = A.template_type ?? "text";
      let K, ue, z, H, X, xe, F;
      D === "image" && A.media_url ? K = { type: "image", url: A.media_url } : D === "video" && A.media_url ? K = { type: "video", url: A.media_url } : D === "document" && A.document_filename ? K = { type: "document", filename: A.document_filename } : A.header && (K = { type: "text", text: x.value });
      const _ = ne.value || "Start adding content to see a live preview here.";
      if (D === "location" && A.location) {
        const Z = A.location, I = Z.lat ?? Z.latitude, m = Z.lng ?? Z.lon ?? Z.longitude;
        I != null && m != null && (ue = {
          lat: I,
          lng: m,
          name: Z.name ?? Z.title,
          address: Z.address ?? `${I}, ${m}`
        });
      }
      (D === "catalog" || D === "mpm") && Array.isArray(A.products) && A.products.length && (z = !0, H = A.products.map((Z) => ({
        image: Z.image ?? Z.imageUrl,
        name: Z.name ?? Z.sectionTitle ?? Z.title ?? "Product",
        price: Z.price ?? Z.productId ?? ""
      }))), D === "coupon" && A.coupon_code && (X = { code: A.coupon_code }), D === "lto" && A.lto_expiry && (xe = A.lto_expiry), D === "auth" && (F = { code: A.auth_code ?? A.otp_code ?? "123 456" });
      const G = A.buttons ?? [];
      return {
        header: K,
        body: _,
        footer: A.footer || void 0,
        buttons: G.map((Z) => ({ text: Z.label || "Button" })),
        location: ue,
        catalog: z,
        multiProduct: H,
        coupon: X,
        limitedOffer: xe,
        auth: F
      };
    });
    function ke(A) {
      const D = d.value, K = A.campaign.message ? { ...D.message, ...A.campaign.message } : D.message;
      v({
        ...A.campaign,
        message: K
      }), L.value = null, me.value = !1;
    }
    function Ae(A) {
      const D = A.target.value;
      if (!D) return;
      const K = lt.find((ue) => ue.id === D);
      K && (g.value ? (L.value = K, me.value = !0) : ke(K), A.target.value = "");
    }
    const Le = C(
      () => d.value.template_type ?? "transactional"
    );
    function Ie(A) {
      v({ template_type: A });
    }
    function we(A) {
      v({
        name: A,
        tracking: { ...d.value.tracking ?? {}, campaign_name: A }
      });
    }
    function he(A) {
      const D = ` {{ ${A.variable} }}`, K = d.value.message.variables ?? [], ue = Array.from(/* @__PURE__ */ new Set([...K, A.variable]));
      if (A.field === "title") {
        const z = d.value.message.header ?? "";
        w({
          variables: ue
        }), d.value.message.header = z + D;
      } else {
        const z = d.value.message.body ?? "";
        w({
          variables: ue
        }), d.value.message.body = z + D;
      }
    }
    function Be() {
      $e.value && i("save", d.value);
    }
    return (A, D) => (a(), n("div", _o, [
      e("div", $o, [
        ye(qe, {
          "campaign-name": c(d).name,
          status: c(d).status,
          dirty: c(g),
          "last-saved-at": c(R),
          "can-undo": c(f),
          "can-redo": c(U),
          "slugify-name": o.enforceSlugName,
          "onUpdate:campaignName": we,
          onUndo: c(S),
          onRedo: c(B)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({
            background: c(te).dangerBg,
            border: `1px solid ${c(te).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[12]}px ${c(q)[16]}px`,
            marginBottom: `${c(q)[16]}px`
          })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(j, null, Y(pe.value, (K) => (a(), n("li", {
              key: K.message
            }, k(K.message), 1))), 128))
          ], 4)
        ], 4)) : h("", !0),
        ge.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({
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
            style: se({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", wo, [
            (a(!0), n(j, null, Y(ge.value, (K) => (a(), n("li", {
              key: K.message
            }, k(K.message), 1))), 128))
          ])
        ], 4)) : h("", !0)
      ]),
      e("div", xo, [
        e("aside", So, [
          t.disabledSections.includes("whatsapp") ? h("", !0) : (a(), n("div", Co, [
            e("div", Io, [
              D[7] || (D[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", Uo, [
                ye(Ke, {
                  "template-type": Le.value,
                  onUpdate: Ie
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Ae
                }, [
                  D[6] || (D[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(c(lt), (K) => (a(), n("option", {
                    key: K.id,
                    value: K.id
                  }, k(K.label), 9, Ro))), 128))
                ], 32)
              ])
            ]),
            ye(Fl, {
              message: c(d).message,
              "show-reset": !0,
              onUpdate: c(w),
              onReset: D[0] || (D[0] = (K) => c(O)())
            }, null, 8, ["message", "onUpdate"]),
            ye(yt, {
              message: c(d).message,
              "variable-options": t.variableOptions,
              onUpdate: c(w),
              onInsertVariable: he
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Lo, [
          !t.designOnly && c(d).audience.test_mode ? (a(), n("div", Bo, [...D[8] || (D[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : h("", !0),
          e("div", Ao, [
            e("div", To, [
              e("label", Po, [
                D[10] || (D[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": D[1] || (D[1] = (K) => ie.value = K),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  D[9] || (D[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(c(Ee), (K) => (a(), n("option", {
                    key: K.id,
                    value: K.id
                  }, k(K.label), 9, Vo))), 128))
                ], 512), [
                  [Oe, ie.value]
                ])
              ])
            ]),
            e("div", Eo, [
              ye(ho, { template: fe.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", No, [
        o.actionsNote ? (a(), n("div", Oo, k(o.actionsNote), 1)) : h("", !0),
        e("div", Mo, [
          t.showDuplicate ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: D[2] || (D[2] = (K) => i("duplicate", JSON.parse(JSON.stringify(c(d)))))
          }, " Duplicate ")) : h("", !0),
          t.showSave ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: Be
          }, " Save ")) : h("", !0),
          t.showClose ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: D[3] || (D[3] = (K) => i("edit"))
          }, " Close ")) : h("", !0)
        ])
      ]),
      me.value ? (a(), n("div", Do, [
        e("div", zo, [
          D[11] || (D[11] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          D[12] || (D[12] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Wo, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: D[4] || (D[4] = (K) => {
                me.value = !1, L.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: D[5] || (D[5] = (K) => L.value && ke(L.value))
            }, " Replace ")
          ])
        ])
      ])) : h("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ be(Ho, [["__scopeId", "data-v-2389ca7c"]]), Fo = { class: "kb-section" }, jo = { class: "kb-section__head" }, qo = { class: "kb-field" }, Ko = ["value"], Yo = { class: "kb-field" }, Jo = { class: "kb-label" }, Go = { key: 0 }, Qo = { key: 1 }, Xo = { key: 2 }, Zo = ["value"], ei = {
  key: 0,
  class: "kb-truncation-hint"
}, ti = { class: "kb-field" }, si = { class: "kb-insert-row" }, ai = ["value"], ni = { class: "kb-field" }, li = { class: "kb-insert-row" }, oi = /* @__PURE__ */ re({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: r }) {
    const o = t, i = r, d = ["first_name", "last_name", "order_id", "city"], g = Q(o.variableOptions && o.variableOptions.length ? [...o.variableOptions] : d), $ = Q(g.value[0] ?? d[0]), p = Q("");
    _e(
      () => o.variableOptions,
      (R) => {
        R && R.length && (g.value = [...R], g.value.includes($.value) || ($.value = g.value[0]));
      }
    );
    const v = C(() => o.message.body ?? ""), w = C(() => v.value.length), S = C(() => w.value ? w.value <= 160 ? 1 : Math.ceil(w.value / 153) : 0), B = C(() => {
      const R = w.value;
      return R <= 160 ? null : R <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function f(R) {
      const E = R.target.value;
      i("update", {
        sender_id: E || void 0
      });
    }
    function U(R) {
      const E = R.target.value;
      i("update", {
        body: E
      });
    }
    function O() {
      const R = $.value;
      if (!R) return;
      const E = ` {{ ${R} }}`, P = v.value || "", oe = o.message.variables ?? [], ce = Array.from(/* @__PURE__ */ new Set([...oe, R]));
      i("update", {
        body: P + E,
        variables: ce
      });
    }
    function W() {
      const R = p.value.trim();
      R && (g.value.includes(R) || (g.value = [...g.value, R]), $.value = R, p.value = "");
    }
    return (R, E) => (a(), n("section", Fo, [
      e("div", jo, [
        E[3] || (E[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        t.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: E[0] || (E[0] = (P) => R.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      E[10] || (E[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", qo, [
        E[4] || (E[4] = e("label", { class: "kb-label" }, [
          ee(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: o.message.sender_id ?? "",
          onInput: f
        }, null, 40, Ko)
      ]),
      e("div", Yo, [
        e("label", Jo, [
          E[5] || (E[5] = ee(" Message body ", -1)),
          e("span", {
            class: ve(["kb-counter", { "kb-counter--warn": S.value > 3 }])
          }, [
            ee(k(w.value) + " chars · ", 1),
            S.value === 0 ? (a(), n("span", Go, "0 segments")) : S.value === 1 ? (a(), n("span", Qo, "1 segment")) : (a(), n("span", Xo, k(S.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: v.value,
          onInput: U
        }, null, 40, Zo),
        E[6] || (E[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        B.value ? (a(), n("p", ei, k(B.value), 1)) : h("", !0)
      ]),
      e("div", ti, [
        E[7] || (E[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", si, [
          Re(e("select", {
            "onUpdate:modelValue": E[1] || (E[1] = (P) => $.value = P),
            class: "kb-select"
          }, [
            (a(!0), n(j, null, Y(g.value, (P) => (a(), n("option", {
              key: P,
              value: P
            }, k(P), 9, ai))), 128))
          ], 512), [
            [Oe, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: O
          }, " Insert into message ")
        ]),
        E[8] || (E[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", ni, [
        E[9] || (E[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", li, [
          Re(e("input", {
            "onUpdate:modelValue": E[2] || (E[2] = (P) => p.value = P),
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
}), ii = /* @__PURE__ */ be(oi, [["__scopeId", "data-v-5e9aa8e6"]]), ri = { class: "keos-sms-builder" }, di = { class: "kb-builder-top" }, ui = { style: { margin: 0, paddingLeft: "1.25rem" } }, ci = { class: "kb-sms-layout" }, pi = { class: "kb-sms-sidebar" }, mi = {
  key: 0,
  class: "kb-sms-form"
}, vi = { class: "kb-sms-form-head" }, bi = { class: "kb-wa-form-head-row" }, gi = ["value"], yi = { class: "kb-sms-canvas" }, fi = {
  key: 0,
  class: "kb-sms-test-banner"
}, ki = { class: "kb-sms-preview-chrome" }, hi = { class: "kb-push-preview-controls" }, _i = { class: "kb-push-preview-as" }, $i = ["value"], wi = { class: "kb-sms-preview-frame" }, xi = { class: "kb-preview" }, Si = { class: "kb-sms-preview" }, Ci = { class: "kb-sms-phone" }, Ii = { class: "kb-sms-header" }, Ui = { class: "kb-sms-sender" }, Ri = { class: "kb-sms-thread" }, Li = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, Bi = { class: "kb-sms-text" }, Ai = { class: "kb-sms-counter" }, Ti = { key: 0 }, Pi = { key: 1 }, Vi = { key: 2 }, Ei = {
  key: 3,
  class: "kb-sms-cost"
}, Ni = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Oi = { class: "kb-sms-actions" }, Mi = {
  key: 0,
  class: "kb-actions-note"
}, Di = { class: "kb-sms-actions-right" }, zi = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Wi = { class: "kb-confirm-dialog" }, Hi = { class: "kb-confirm-actions" }, Fi = /* @__PURE__ */ re({
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
  setup(t, { emit: r }) {
    const o = t, i = r, {
      campaign: d,
      dirty: g,
      customValidatorErrors: $,
      getValidationWithWarnings: p,
      update: v,
      updateMessage: w,
      undo: S,
      redo: B,
      canUndo: f,
      canRedo: U,
      resetMessage: O,
      hooks: W
    } = Fe({
      initial: o.modelValue,
      hooks: {
        ...o.hooks,
        customValidators: async (z) => {
          var xe, F;
          const H = [];
          (xe = z.name) != null && xe.trim() || H.push("Template name is required");
          const X = (F = o.hooks) != null && F.customValidators ? await o.hooks.customValidators(z) : [];
          return [...H, ...X];
        }
      },
      onDirty: () => i("change", d.value)
    }), { lastSavedAt: R } = je(d, { channel: "sms" });
    function E(z) {
      (z.metaKey || z.ctrlKey) && z.key === "z" && (z.preventDefault(), z.shiftKey ? B() : S());
    }
    De(() => {
      window.addEventListener("keydown", E);
    }), ze(() => {
      window.removeEventListener("keydown", E);
    }), _e(d, (z) => i("update:modelValue", z), { deep: !0 });
    const P = Q(), oe = Q(!0);
    async function ce() {
      if (W.estimateReach)
        try {
          P.value = await W.estimateReach(d.value.audience);
        } catch {
          P.value = void 0;
        }
      W.canSend && (oe.value = await Promise.resolve(W.canSend()));
    }
    ce(), _e(() => d.value.audience, ce, { deep: !0 });
    const de = C(() => ($.value, p(P.value))), pe = C(() => de.value.blockingErrors), ge = C(() => de.value.warnings), $e = C(() => de.value.valid), ie = C(
      () => d.value.template_type ?? "transactional"
    ), me = Q(""), L = Q(!1), ae = Q(null), ne = C(() => {
      const z = me.value;
      return z ? Ee.find((H) => H.id === z) ?? null : null;
    }), x = C(() => {
      const z = Ie.value;
      return ne.value ? Pe(z, ne.value.data) : z;
    });
    function fe(z) {
      const H = d.value, X = z.campaign.message ? { ...H.message, ...z.campaign.message } : H.message;
      v({
        ...z.campaign,
        message: X
      }), ae.value = null, L.value = !1;
    }
    function ke(z) {
      const H = z.target.value;
      if (!H) return;
      const X = ot.find((xe) => xe.id === H);
      X && (g.value ? (ae.value = X, L.value = !0) : fe(X), z.target.value = "");
    }
    function Ae(z) {
      v({ template_type: z });
    }
    function Le(z) {
      v({
        name: z,
        tracking: { ...d.value.tracking ?? {}, campaign_name: z }
      });
    }
    const Ie = C(
      () => (d.value.message.body ?? "") || ""
    ), we = C(() => Ie.value.length), he = C(() => we.value ? we.value <= 160 ? 1 : Math.ceil(we.value / 153) : 0), Be = C(() => {
      const z = x.value;
      return z.trim().length ? z : "Your SMS message preview will appear here.";
    }), A = C(() => {
      const z = o.costPerSegment ?? 0;
      return !z || he.value === 0 ? null : (he.value * z).toFixed(2);
    }), D = C(() => {
      const z = we.value;
      return z <= 160 ? null : z <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), K = C(
      () => d.value.message.sender_id ?? "YourBrand"
    );
    function ue() {
      $e.value && i("save", d.value);
    }
    return (z, H) => (a(), n("div", ri, [
      e("div", di, [
        ye(qe, {
          "campaign-name": c(d).name,
          status: c(d).status,
          dirty: c(g),
          "last-saved-at": c(R),
          "can-undo": c(f),
          "can-redo": c(U),
          "slugify-name": o.enforceSlugName,
          "onUpdate:campaignName": Le,
          onUndo: c(S),
          onRedo: c(B)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({
            background: c(te).dangerBg,
            border: `1px solid ${c(te).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[12]}px ${c(q)[16]}px`,
            marginBottom: `${c(q)[16]}px`
          })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(j, null, Y(pe.value, (X) => (a(), n("li", {
              key: X.message
            }, k(X.message), 1))), 128))
          ], 4)
        ], 4)) : h("", !0),
        ge.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({
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
            style: se({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", ui, [
            (a(!0), n(j, null, Y(ge.value, (X) => (a(), n("li", {
              key: X.message
            }, k(X.message), 1))), 128))
          ])
        ], 4)) : h("", !0)
      ]),
      e("div", ci, [
        e("aside", pi, [
          t.disabledSections.includes("sms") ? h("", !0) : (a(), n("div", mi, [
            e("div", vi, [
              H[7] || (H[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", bi, [
                ye(Ke, {
                  "template-type": ie.value,
                  onUpdate: Ae
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  H[6] || (H[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(c(ot), (X) => (a(), n("option", {
                    key: X.id,
                    value: X.id
                  }, k(X.label), 9, gi))), 128))
                ], 32)
              ])
            ]),
            ye(ii, {
              message: c(d).message,
              "variable-options": t.variableOptions,
              "show-reset": !0,
              onUpdate: c(w),
              onReset: H[0] || (H[0] = (X) => c(O)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", yi, [
          !t.designOnly && c(d).audience.test_mode ? (a(), n("div", fi, [...H[8] || (H[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : h("", !0),
          e("div", ki, [
            e("div", hi, [
              e("label", _i, [
                H[10] || (H[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": H[1] || (H[1] = (X) => me.value = X),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  H[9] || (H[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(c(Ee), (X) => (a(), n("option", {
                    key: X.id,
                    value: X.id
                  }, k(X.label), 9, $i))), 128))
                ], 512), [
                  [Oe, me.value]
                ])
              ])
            ]),
            e("div", wi, [
              e("div", xi, [
                e("div", Si, [
                  e("div", Ci, [
                    H[13] || (H[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", Ii, [
                      e("div", Ui, k(K.value), 1),
                      H[11] || (H[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", Ri, [
                      e("div", Li, [
                        e("span", Bi, k(Be.value), 1),
                        H[12] || (H[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", Ai, [
                    ee(k(we.value) + " characters · ", 1),
                    he.value === 0 ? (a(), n("span", Ti, "0 segments")) : he.value === 1 ? (a(), n("span", Pi, "1 segment")) : (a(), n("span", Vi, k(he.value) + " segments", 1)),
                    H[14] || (H[14] = ee(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    A.value !== null ? (a(), n("span", Ei, " · Est. " + k(A.value), 1)) : h("", !0)
                  ]),
                  D.value ? (a(), n("p", Ni, k(D.value), 1)) : h("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", Oi, [
        o.actionsNote ? (a(), n("div", Mi, k(o.actionsNote), 1)) : h("", !0),
        e("div", Di, [
          t.showDuplicate ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: H[2] || (H[2] = (X) => i("duplicate", JSON.parse(JSON.stringify(c(d)))))
          }, " Duplicate ")) : h("", !0),
          t.showSave ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: ue
          }, " Save ")) : h("", !0),
          t.showClose ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: H[3] || (H[3] = (X) => i("edit"))
          }, " Close ")) : h("", !0)
        ])
      ]),
      L.value ? (a(), n("div", zi, [
        e("div", Wi, [
          H[15] || (H[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          H[16] || (H[16] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Hi, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: H[4] || (H[4] = (X) => {
                L.value = !1, ae.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: H[5] || (H[5] = (X) => ae.value && fe(ae.value))
            }, " Replace ")
          ])
        ])
      ])) : h("", !0)
    ]));
  }
}), _t = /* @__PURE__ */ be(Fi, [["__scopeId", "data-v-8cc0cf01"]]), ji = 30, qi = 60, Ki = 130;
function Yi(t) {
  const r = (t ?? "").trim().length;
  return r < ji ? "too_short" : r <= qi ? "good" : "too_long";
}
function Ji(t) {
  const r = (t ?? "").trim().length;
  return r === 0 ? "too_short" : r <= Ki ? "good" : "too_long";
}
const Gi = [
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
function rt(t) {
  if (!t || typeof t != "string") return [];
  const r = [];
  for (const o of Gi) {
    const i = t.match(o);
    i && r.push(i[0]);
  }
  return r;
}
function Qi(t) {
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
function Xi(t) {
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
const Zi = { class: "em-section" }, er = { class: "em-strip" }, tr = { class: "em-strip-head" }, sr = { class: "em-field" }, ar = ["value"], nr = { class: "em-field" }, lr = ["value"], or = { class: "em-field" }, ir = ["value"], rr = { class: "em-field" }, dr = { class: "em-input-group" }, ur = ["value"], cr = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, pr = { class: "em-field" }, mr = { class: "em-input-group" }, vr = ["value"], br = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, gr = { class: "em-strip em-strip--library" }, yr = { class: "em-library-chips" }, fr = ["onClick"], kr = { class: "em-strip em-strip--blocks" }, hr = { class: "em-block-list" }, _r = ["data-type"], $r = { class: "em-block-bar" }, wr = { class: "em-block-type" }, xr = { class: "em-block-actions" }, Sr = ["disabled", "onClick"], Cr = ["disabled", "onClick"], Ir = ["onClick"], Ur = {
  key: 0,
  class: "em-block-fields"
}, Rr = ["value", "onChange"], Lr = ["value", "onInput"], Br = ["onClick"], Ar = {
  key: 1,
  class: "em-block-fields"
}, Tr = ["value", "onInput"], Pr = ["onClick"], Vr = {
  key: 2,
  class: "em-block-fields"
}, Er = ["value", "onInput"], Nr = ["value", "onInput"], Or = ["value", "onInput"], Mr = {
  key: 3,
  class: "em-block-fields"
}, Dr = ["value", "onInput"], zr = ["value", "onInput"], Wr = { class: "em-block-fields--row" }, Hr = ["value", "onInput"], Fr = { class: "em-check-row" }, jr = ["checked", "onChange"], qr = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, Kr = ["value", "onInput"], Yr = {
  key: 5,
  class: "em-block-fields"
}, Jr = ["value", "onInput"], Gr = ["value", "onInput"], Qr = ["value", "onInput"], Xr = ["onClick"], Zr = {
  key: 6,
  class: "em-block-fields"
}, ed = ["value", "onChange"], td = { class: "em-list-items" }, sd = ["value", "onInput", "placeholder"], ad = ["onClick"], nd = ["onClick"], ld = {
  key: 7,
  class: "em-block-fields"
}, od = ["value", "onChange"], id = ["value", "onInput"], rd = ["onClick"], dd = {
  key: 8,
  class: "em-block-fields"
}, ud = { class: "em-social-links" }, cd = ["value", "onChange"], pd = ["value", "onInput"], md = ["onClick"], vd = ["onClick"], bd = {
  key: 9,
  class: "em-block-fields"
}, gd = ["value", "onInput"], yd = ["value", "onInput"], fd = ["value", "onInput"], kd = {
  key: 10,
  class: "em-block-fields"
}, hd = ["value", "onInput"], _d = { class: "em-link-list-items" }, $d = ["value", "onInput"], wd = ["value", "onInput"], xd = ["onClick"], Sd = ["onClick"], Cd = {
  key: 11,
  class: "em-block-fields"
}, Id = ["value", "onInput"], Ud = ["onClick"], Rd = ["value", "onInput"], Ld = ["onClick"], Bd = {
  key: 12,
  class: "em-block-fields"
}, Ad = { class: "em-block-fields--row" }, Td = ["value", "onInput"], Pd = { class: "em-block-fields--row" }, Vd = ["value", "onInput"], Ed = ["value", "onChange"], Nd = {
  key: 13,
  class: "em-block-fields"
}, Od = ["value", "onChange"], Md = { class: "em-inline-label" }, Dd = ["value", "onInput"], zd = ["onClick"], Wd = {
  key: 14,
  class: "em-block-fields"
}, Hd = ["value", "onInput"], Fd = { class: "em-link-list-items" }, jd = ["value", "onInput"], qd = ["value", "onInput"], Kd = ["onClick"], Yd = ["onClick"], Jd = {
  key: 15,
  class: "em-block-fields"
}, Gd = ["value", "onInput"], Qd = ["value", "onInput"], Xd = ["onClick"], Zd = ["onClick"], eu = {
  key: 16,
  class: "em-block-fields"
}, tu = ["value", "onInput"], su = ["value", "onInput"], au = ["value", "onInput"], nu = ["onClick"], lu = ["onClick"], ou = {
  key: 17,
  class: "em-block-fields"
}, iu = ["value", "onInput"], ru = ["value", "onInput"], du = {
  key: 18,
  class: "em-block-fields"
}, uu = ["value", "onInput"], cu = ["value", "onInput"], pu = ["value", "onInput"], mu = ["value", "onInput"], vu = ["value", "onInput"], bu = {
  key: 19,
  class: "em-block-fields"
}, gu = ["value", "onInput"], yu = ["onClick"], fu = {
  key: 20,
  class: "em-block-fields"
}, ku = ["value", "onInput"], hu = ["value", "onInput"], _u = ["onClick"], $u = {
  key: 21,
  class: "em-block-fields"
}, wu = ["value", "onInput"], xu = { class: "em-block-fields--row" }, Su = ["value", "onInput"], Cu = {
  key: 22,
  class: "em-block-fields"
}, Iu = ["value", "onInput"], Uu = ["value", "onInput"], Ru = ["value", "onInput"], Lu = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Bu = ["value", "onChange"], Au = { class: "em-check-row" }, Tu = ["checked", "onChange"], Pu = { class: "em-add-bar" }, Vu = { class: "em-add-bar-btns" }, Eu = { class: "em-strip em-strip--personalize" }, Nu = { class: "em-field" }, Ou = { class: "em-input-group" }, Mu = ["value"], Du = { class: "em-field" }, zu = { class: "em-input-group" }, Ue = "{{ var }}", Wu = /* @__PURE__ */ re({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: r }) {
    var le;
    function o() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const i = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], d = [
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
    function g(b) {
      switch (b) {
        case "heading":
          return { id: o(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: o(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: o(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: o(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: o(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: o(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: o(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: o(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: o(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: o(), type: "social", links: i.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: o(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: o(),
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
            id: o(),
            type: "columns",
            leftContent: "Left column text or {{ variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: o(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: o(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: o(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: o(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: o(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: o(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: o(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: o(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: o(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: o(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: o(), type: "paragraph", content: "" };
      }
    }
    const $ = t, p = r, v = ["first_name", "last_name", "order_id", "city", "email"], w = Q(
      (le = $.variableOptions) != null && le.length ? [...$.variableOptions] : v
    ), S = Q(w.value[0] ?? "first_name"), B = Q("");
    _e(
      () => $.variableOptions,
      (b) => {
        b != null && b.length && (w.value = [...b], w.value.includes(S.value) || (S.value = w.value[0]));
      }
    );
    const f = C(() => $.message.subject ?? ""), U = C(() => $.message.preview_text ?? ""), O = C(() => Yi(f.value)), W = C(() => Ji(U.value)), R = C(() => rt(f.value)), E = C(() => rt(U.value)), P = C(() => {
      const b = $.message.blocks;
      return Array.isArray(b) && b.length > 0 ? b : [g("paragraph")];
    });
    _e(
      () => $.message.blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && p("update", { blocks: [g("paragraph")] });
      },
      { immediate: !0 }
    );
    function oe(b) {
      p("update", { blocks: b });
    }
    function ce(b) {
      p("update", { subject: b.target.value });
    }
    function de(b) {
      const l = b.target.value;
      p("update", { preview_text: l || void 0 });
    }
    function pe(b) {
      p("update", { from_name: b.target.value || void 0 });
    }
    function ge(b) {
      p("update", { from_address: b.target.value || void 0 });
    }
    function $e(b) {
      p("update", { reply_to: b.target.value || void 0 });
    }
    const ie = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [g("heading"), g("paragraph"), g("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [g("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [g("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [g("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [g("social"), g("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [g("footer"), g("link_list")]
      }
    ];
    function me(b) {
      const l = b.blocks();
      oe([...P.value, ...l]);
    }
    function L(b) {
      const l = [...P.value, g(b)];
      oe(l);
    }
    function ae(b) {
      oe(P.value.filter((l) => l.id !== b));
    }
    function ne(b, l) {
      const s = P.value.findIndex((T) => T.id === b);
      if (s < 0) return;
      const N = l === "up" ? s - 1 : s + 1;
      if (N < 0 || N >= P.value.length) return;
      const u = [...P.value];
      [u[s], u[N]] = [u[N], u[s]], oe(u);
    }
    function x(b, l) {
      const s = P.value.map((N) => N.id === b ? { ...N, ...l } : N);
      oe(s);
    }
    function fe(b, l, s) {
      const N = P.value.find((T) => T.id === b);
      if (!N || N.type !== "list") return;
      const u = [...N.items || []];
      u[l] = s, x(b, { items: u });
    }
    function ke(b) {
      const l = P.value.find((s) => s.id === b);
      !l || l.type !== "list" || x(b, { items: [...l.items || [], "New item"] });
    }
    function Ae(b, l) {
      const s = P.value.find((u) => u.id === b);
      if (!s || s.type !== "list") return;
      const N = (s.items || []).filter((u, T) => T !== l);
      x(b, { items: N });
    }
    function Le(b, l, s, N) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "social") return;
      const T = (u.links || []).map((V, Se) => Se === l ? { ...V, [s]: N } : V);
      x(b, { links: T });
    }
    function Ie(b) {
      const l = P.value.find((s) => s.id === b);
      !l || l.type !== "social" || x(b, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function we(b, l) {
      const s = P.value.find((u) => u.id === b);
      if (!s || s.type !== "social") return;
      const N = (s.links || []).filter((u, T) => T !== l);
      x(b, { links: N });
    }
    function he(b, l, s, N) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "link_list") return;
      const T = (u.links || []).map((V, Se) => Se === l ? { ...V, [s]: N } : V);
      x(b, { links: T });
    }
    function Be(b) {
      const l = P.value.find((s) => s.id === b);
      !l || l.type !== "link_list" || x(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function A(b, l) {
      const s = P.value.find((u) => u.id === b);
      if (!s || s.type !== "link_list") return;
      const N = (s.links || []).filter((u, T) => T !== l);
      x(b, { links: N });
    }
    function D(b, l) {
      const s = P.value.find((Ne) => Ne.id === b);
      if (!s || s.type !== "columns") return;
      const N = ` {{ ${S.value} }}`, u = $.message.variables ?? [], T = Array.from(/* @__PURE__ */ new Set([...u, S.value])), V = l === "left" ? "leftContent" : "rightContent", Ye = (s[V] ?? "") + N;
      x(b, { [V]: Ye }), p("update", { variables: T });
    }
    function K(b, l) {
      const s = P.value.find((N) => N.id === b);
      if (!(!s || s.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== s.columnCount) {
          const N = [...s.cells || []];
          for (; N.length < l.columnCount; ) N.push("Cell content");
          l.cells = N.slice(0, l.columnCount);
        }
        x(b, l);
      }
    }
    function ue(b, l, s) {
      const N = P.value.find((T) => T.id === b);
      if (!N || N.type !== "row") return;
      const u = [...N.cells || []];
      u[l] = s, x(b, { cells: u });
    }
    function z(b, l, s, N) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "navbar") return;
      const T = (u.links || []).map((V, Se) => Se === l ? { ...V, [s]: N } : V);
      x(b, { links: T });
    }
    function H(b) {
      const l = P.value.find((s) => s.id === b);
      !l || l.type !== "navbar" || x(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function X(b, l) {
      const s = P.value.find((N) => N.id === b);
      !s || s.type !== "navbar" || x(b, { links: (s.links || []).filter((N, u) => u !== l) });
    }
    function xe(b, l, s, N) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "accordion") return;
      const T = (u.items || []).map((V, Se) => Se === l ? { ...V, [s]: N } : V);
      x(b, { items: T });
    }
    function F(b) {
      const l = P.value.find((s) => s.id === b);
      !l || l.type !== "accordion" || x(b, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function _(b, l) {
      const s = P.value.find((N) => N.id === b);
      !s || s.type !== "accordion" || x(b, { items: (s.items || []).filter((N, u) => u !== l) });
    }
    function G(b, l, s, N) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "carousel") return;
      const T = (u.slides || []).map((V, Se) => Se === l ? { ...V, [s]: N } : V);
      x(b, { slides: T });
    }
    function Z(b) {
      const l = P.value.find((s) => s.id === b);
      !l || l.type !== "carousel" || x(b, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function I(b, l) {
      const s = P.value.find((N) => N.id === b);
      !s || s.type !== "carousel" || x(b, { slides: (s.slides || []).filter((N, u) => u !== l) });
    }
    function m(b) {
      const l = ` {{ ${S.value} }}`, s = $.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...s, S.value]));
      b === "subject" ? p("update", {
        subject: (f.value || "") + l,
        variables: N
      }) : p("update", {
        preview_text: (U.value || "") + l,
        variables: N
      });
    }
    function y(b) {
      const l = P.value.find((Ne) => Ne.id === b);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const s = ` {{ ${S.value} }}`, N = $.message.variables ?? [], u = Array.from(/* @__PURE__ */ new Set([...N, S.value])), T = (l.type === "footer", "content"), Se = (l[T] ?? "") + s, Ye = P.value.map(
        (Ne) => Ne.id === b ? { ...Ne, [T]: Se } : Ne
      );
      p("update", { blocks: Ye, variables: u });
    }
    function M(b, l) {
      const s = P.value.find((Se) => Se.id === b);
      if (!s || s.type !== "row") return;
      const N = ` {{ ${S.value} }}`, u = $.message.variables ?? [], T = Array.from(/* @__PURE__ */ new Set([...u, S.value])), V = [...s.cells || []];
      V[l] = (V[l] || "") + N, x(b, { cells: V }), p("update", { variables: T });
    }
    function J() {
      const b = B.value.trim();
      !b || w.value.includes(b) || (w.value = [...w.value, b], S.value = b, B.value = "");
    }
    return (b, l) => (a(), n("section", Zi, [
      e("div", er, [
        e("div", tr, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          t.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (s) => b.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", sr, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: t.message.from_name ?? "",
            onInput: pe
          }, null, 40, ar)
        ]),
        e("div", nr, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: t.message.from_address ?? "",
            onInput: ge
          }, null, 40, lr)
        ]),
        e("div", or, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            ee("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: t.message.reply_to ?? "",
            onInput: $e
          }, null, 40, ir)
        ]),
        e("div", rr, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", dr, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: f.value,
              onInput: ce
            }, null, 40, ur),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (s) => m("subject")),
              title: "Insert variable"
            }, k(Ue))
          ]),
          e("span", {
            class: ve(["em-analyzer", `em-analyzer--${O.value}`])
          }, k(c(Qi)(O.value)), 3),
          R.value.length ? (a(), n("span", cr, "Spammy: " + k(R.value.join(", ")), 1)) : h("", !0)
        ]),
        e("div", pr, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            ee("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", mr, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: U.value,
              onInput: de
            }, null, 40, vr),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (s) => m("preview")),
              title: "Insert variable"
            }, k(Ue))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ve(["em-analyzer", `em-analyzer--${W.value}`])
          }, k(c(Xi)(W.value)), 3),
          E.value.length ? (a(), n("span", br, "Spammy: " + k(E.value.join(", ")), 1)) : h("", !0)
        ])
      ]),
      e("div", gr, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", yr, [
          (a(), n(j, null, Y(ie, (s) => e("button", {
            key: s.id,
            type: "button",
            class: "em-library-chip",
            onClick: (N) => me(s)
          }, k(s.label), 9, fr)), 64))
        ])
      ]),
      e("div", kr, [
        l[63] || (l[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[64] || (l[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", hr, [
          (a(!0), n(j, null, Y(P.value, (s, N) => (a(), n("div", {
            key: s.id,
            class: "em-block",
            "data-type": s.type
          }, [
            e("div", $r, [
              e("span", wr, k(s.type), 1),
              e("div", xr, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: N === 0,
                  onClick: (u) => ne(s.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Sr),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: N === P.value.length - 1,
                  onClick: (u) => ne(s.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Cr),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => ae(s.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ir)
              ])
            ]),
            s.type === "heading" ? (a(), n("div", Ur, [
              e("select", {
                value: s.level,
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { level: Number(u.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Rr),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, Lr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(s.id)
              }, k(Ue), 8, Br)
            ])) : s.type === "paragraph" ? (a(), n("div", Ar, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Tr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(s.id)
              }, k(Ue), 8, Pr)
            ])) : s.type === "image" ? (a(), n("div", Vr, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.src,
                onInput: (u) => x(s.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, Er),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.alt,
                onInput: (u) => x(s.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, Nr),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.linkUrl,
                onInput: (u) => x(s.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Or)
            ])) : s.type === "button" ? (a(), n("div", Mr, [
              e("input", {
                type: "text",
                class: "em-input",
                value: s.text,
                onInput: (u) => x(s.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, Dr),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.url,
                onInput: (u) => x(s.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, zr),
              e("div", Wr, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: s.borderRadius ?? 8,
                  onInput: (u) => x(s.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, Hr)
              ]),
              e("label", Fr, [
                e("input", {
                  type: "checkbox",
                  checked: s.ghost,
                  onChange: (u) => x(s.id, { ghost: u.target.checked })
                }, null, 40, jr),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : s.type === "spacer" ? (a(), n("div", qr, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: s.height,
                onInput: (u) => x(s.id, { height: Number(u.target.value) || 24 })
              }, null, 40, Kr),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : s.type === "footer" ? (a(), n("div", Yr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Jr),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.unsubscribeUrl,
                onInput: (u) => x(s.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Gr),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.companyAddress,
                onInput: (u) => x(s.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, Qr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(s.id)
              }, k(Ue), 8, Xr)
            ])) : s.type === "list" ? (a(), n("div", Zr, [
              e("select", {
                value: s.style,
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { style: u.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, ed),
              e("div", td, [
                (a(!0), n(j, null, Y(s.items || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (V) => fe(s.id, T, V.target.value),
                    placeholder: `Item ${T + 1}`
                  }, null, 40, sd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => Ae(s.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, ad)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => ke(s.id)
              }, "+ Add item", 8, nd)
            ])) : s.type === "quote" ? (a(), n("div", ld, [
              e("select", {
                value: s.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { style: u.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, od),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, id),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(s.id)
              }, k(Ue), 8, rd)
            ])) : s.type === "social" ? (a(), n("div", dd, [
              e("div", ud, [
                (a(!0), n(j, null, Y(s.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (V) => Le(s.id, T, "platform", V.target.value)
                  }, [...l[45] || (l[45] = [
                    Me('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, cd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (V) => Le(s.id, T, "url", V.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, pd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => we(s.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, md)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Ie(s.id)
              }, "+ Add link", 8, vd)
            ])) : s.type === "video" ? (a(), n("div", bd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.thumbnailUrl,
                onInput: (u) => x(s.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, gd),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.videoUrl,
                onInput: (u) => x(s.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, yd),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.caption,
                onInput: (u) => x(s.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, fd)
            ])) : s.type === "link_list" ? (a(), n("div", kd, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: s.separator,
                onInput: (u) => x(s.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, hd),
              e("div", _d, [
                (a(!0), n(j, null, Y(s.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (V) => he(s.id, T, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, $d),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (V) => he(s.id, T, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, wd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => A(s.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, xd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Be(s.id)
              }, "+ Add link", 8, Sd)
            ])) : s.type === "columns" ? (a(), n("div", Cd, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.leftContent,
                onInput: (u) => x(s.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Id),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => D(s.id, "left")
              }, k(Ue), 8, Ud),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.rightContent,
                onInput: (u) => x(s.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, Rd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => D(s.id, "right")
              }, k(Ue), 8, Ld)
            ])) : s.type === "divider" ? (a(), n("div", Bd, [
              e("div", Ad, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: s.thickness ?? 1,
                  onInput: (u) => x(s.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, Td),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Pd, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: s.color ?? "#e2e8f0",
                  onInput: (u) => x(s.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Vd)
              ]),
              e("select", {
                value: s.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { lineStyle: u.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Ed)
            ])) : s.type === "row" ? (a(), n("div", Nd, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: s.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => K(s.id, { columnCount: Number(u.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Od),
              (a(!0), n(j, null, Y(s.cells || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-row-cell"
              }, [
                e("label", Md, "Column " + k(T + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (V) => ue(s.id, T, V.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Dd),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (V) => M(s.id, T)
                }, k(Ue), 8, zd)
              ]))), 128))
            ])) : s.type === "navbar" ? (a(), n("div", Wd, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: s.separator,
                onInput: (u) => x(s.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Hd),
              e("div", Fd, [
                (a(!0), n(j, null, Y(s.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (V) => z(s.id, T, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, jd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (V) => z(s.id, T, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, qd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => X(s.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Kd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => H(s.id)
              }, "+ Add link", 8, Yd)
            ])) : s.type === "accordion" ? (a(), n("div", Jd, [
              (a(!0), n(j, null, Y(s.items || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (V) => xe(s.id, T, "title", V.target.value),
                  placeholder: "Section title"
                }, null, 40, Gd),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (V) => xe(s.id, T, "content", V.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Qd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => _(s.id, T),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Xd)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => F(s.id)
              }, "+ Add section", 8, Zd)
            ])) : s.type === "carousel" ? (a(), n("div", eu, [
              (a(!0), n(j, null, Y(s.slides || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (V) => G(s.id, T, "imageUrl", V.target.value),
                  placeholder: "Image URL"
                }, null, 40, tu),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (V) => G(s.id, T, "alt", V.target.value),
                  placeholder: "Alt text"
                }, null, 40, su),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (V) => G(s.id, T, "linkUrl", V.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, au),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => I(s.id, T),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, nu)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Z(s.id)
              }, "+ Add slide", 8, lu)
            ])) : s.type === "countdown" ? (a(), n("div", ou, [
              e("input", {
                type: "text",
                class: "em-input",
                value: s.label,
                onInput: (u) => x(s.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, iu),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: s.endDateTime ? s.endDateTime.slice(0, 16) : "",
                onInput: (u) => x(s.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, ru),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : s.type === "product_card" ? (a(), n("div", du, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.imageUrl,
                onInput: (u) => x(s.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, uu),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.title,
                onInput: (u) => x(s.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, cu),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.price,
                onInput: (u) => x(s.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, pu),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.buttonText,
                onInput: (u) => x(s.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, mu),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.buttonUrl,
                onInput: (u) => x(s.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, vu)
            ])) : s.type === "liquid" ? (a(), n("div", bu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, gu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(s.id)
              }, k(Ue), 8, yu),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : s.type === "code_block" ? (a(), n("div", fu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: s.caption,
                onInput: (u) => x(s.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, ku),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: s.content,
                onInput: (u) => x(s.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, hu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(s.id)
              }, k(Ue), 8, _u),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : s.type === "rss_feed" ? (a(), n("div", $u, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.feedUrl,
                onInput: (u) => x(s.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, wu),
              e("div", xu, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: s.maxItems ?? 5,
                  onInput: (u) => x(s.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, Su)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : s.type === "dynamic_image" ? (a(), n("div", Cu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: s.imageUrl,
                onInput: (u) => x(s.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, Iu),
              e("input", {
                type: "text",
                class: "em-input",
                value: s.alt,
                onInput: (u) => x(s.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, Uu),
              e("input", {
                type: "url",
                class: "em-input",
                value: s.fallbackUrl,
                onInput: (u) => x(s.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, Ru)
            ])) : h("", !0),
            d.includes(s.type) ? (a(), n("div", Lu, [
              l[61] || (l[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: s.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (u) => x(s.id, { alignment: u.target.value })
              }, [...l[59] || (l[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, Bu),
              e("label", Au, [
                e("input", {
                  type: "checkbox",
                  checked: s.fullWidth,
                  onChange: (u) => x(s.id, { fullWidth: u.target.checked })
                }, null, 40, Tu),
                l[60] || (l[60] = e("span", null, "Full width", -1))
              ])
            ])) : h("", !0)
          ], 8, _r))), 128))
        ]),
        e("div", Pu, [
          l[62] || (l[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Vu, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (s) => L("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (s) => L("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (s) => L("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (s) => L("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (s) => L("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (s) => L("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (s) => L("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (s) => L("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (s) => L("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (s) => L("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (s) => L("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (s) => L("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (s) => L("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (s) => L("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (s) => L("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (s) => L("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (s) => L("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (s) => L("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (s) => L("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (s) => L("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (s) => L("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (s) => L("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (s) => L("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Eu, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Nu, [
          l[65] || (l[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Ou, [
            Re(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (s) => S.value = s),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(j, null, Y(w.value, (s) => (a(), n("option", {
                key: s,
                value: s
              }, k(s), 9, Mu))), 128))
            ], 512), [
              [Oe, S.value]
            ])
          ])
        ]),
        e("div", Du, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", zu, [
            Re(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (s) => B.value = s),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [Ge, B.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: J
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Hu = /* @__PURE__ */ be(Wu, [["__scopeId", "data-v-c4398c5d"]]), Fu = { class: "keos-email-builder" }, ju = { class: "kb-builder-top" }, qu = { style: { margin: 0, paddingLeft: "1.25rem" } }, Ku = { class: "kb-email-layout" }, Yu = { class: "kb-email-sidebar" }, Ju = {
  key: 0,
  class: "kb-email-form"
}, Gu = { class: "kb-email-form-head" }, Qu = { class: "kb-wa-form-head-row" }, Xu = ["value"], Zu = { class: "kb-email-canvas" }, ec = {
  key: 0,
  class: "kb-email-test-banner"
}, tc = { class: "kb-email-preview-chrome" }, sc = { class: "kb-push-preview-controls" }, ac = { class: "kb-push-preview-as" }, nc = ["value"], lc = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, oc = { class: "kb-email-inbox-strip" }, ic = { class: "kb-email-inbox-from" }, rc = { class: "kb-email-inbox-from-name" }, dc = { class: "kb-email-inbox-from-addr" }, uc = { class: "kb-email-inbox-subject" }, cc = ["title"], pc = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, mc = { class: "kb-email-body-canvas" }, vc = ["innerHTML"], bc = { class: "kb-email-actions" }, gc = {
  key: 0,
  class: "kb-actions-note"
}, yc = { class: "kb-email-actions-right" }, fc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, kc = { class: "kb-confirm-dialog" }, hc = { class: "kb-confirm-actions" }, _c = /* @__PURE__ */ re({
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
  setup(t, { emit: r }) {
    function o(F) {
      if (!Array.isArray(F) || F.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const _ = (m) => String(m).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), G = [
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
      ], Z = (m, y) => {
        if (!G.includes(y.type)) return m;
        const M = y.alignment || "left", J = !!y.fullWidth;
        return `<div style="text-align:${M};${J ? "width:100%;" : ""}">${m}</div>`;
      }, I = [];
      for (const m of F)
        switch (m.type) {
          case "heading": {
            const y = Math.min(3, Math.max(1, Number(m.level) || 1)), M = _(m.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            I.push(
              Z(
                `<h${y} style="margin:0 0 12px;font-size:${y === 1 ? "22" : y === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${M || "Heading"}</h${y}>`,
                m
              )
            );
            break;
          }
          case "paragraph": {
            const y = _(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            I.push(
              Z(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${y || "Paragraph"}</p>`,
                m
              )
            );
            break;
          }
          case "image": {
            const y = (m.src || "").trim(), M = _(m.alt || ""), J = (m.linkUrl || "").trim(), b = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", l = y ? `<img src="${_(y)}" alt="${M}" style="${b}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            I.push(
              Z(
                `<div style="margin:0 0 12px;">${J ? `<a href="${_(J)}" style="color:#2563eb;">${l}</a>` : l}</div>`,
                m
              )
            );
            break;
          }
          case "button": {
            const y = _(m.text || "Button"), M = (m.url || "#").trim(), J = Math.min(24, Math.max(0, Number(m.borderRadius) ?? 8)), le = !!m.fullWidth, b = !!m.ghost, l = b ? "transparent" : "#0f172a", s = b ? "#0f172a" : "#fff", N = b ? "2px solid #0f172a" : "none", u = le ? "block" : "inline-block", T = le ? "100%" : "auto";
            I.push(
              Z(
                `<p style="margin:0 0 12px;"><a href="${_(M)}" style="display:${u};width:${T};text-align:center;padding:12px 24px;background:${l};color:${s};border:${N};text-decoration:none;font-size:14px;font-weight:600;border-radius:${J}px;">${y}</a></p>`,
                m
              )
            );
            break;
          }
          case "divider": {
            const y = Math.min(8, Math.max(1, Number(m.thickness) || 1)), M = (m.color || "#e2e8f0").trim() || "#e2e8f0", J = m.lineStyle || "solid";
            I.push(
              Z(
                `<hr style="margin:16px 0;border:0;border-top:${y}px ${J} ${M};" />`,
                m
              )
            );
            break;
          }
          case "spacer": {
            const y = Math.min(120, Math.max(8, Number(m.height) || 24));
            I.push(Z(`<div style="height:${y}px;"></div>`, m));
            break;
          }
          case "footer": {
            const y = _(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = (m.unsubscribeUrl || "").trim(), J = _(m.companyAddress || "");
            I.push(
              Z(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${y || "Footer"}` + (M ? `<p style="margin:8px 0 0;"><a href="${_(M)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (J ? `<p style="margin:4px 0 0;">${J}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "list": {
            const y = m.style === "numbered" ? "ol" : "ul", J = (Array.isArray(m.items) ? m.items : []).map(
              (le) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${_(String(le)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            I.push(
              Z(
                `<${y} style="margin:0 0 12px;padding-left:24px;">${J || "<li>Item</li>"}</${y}>`,
                m
              )
            );
            break;
          }
          case "quote": {
            const y = _(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, J = M[m.style || "default"] || M.default;
            I.push(
              Z(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${J}font-size:14px;line-height:1.6;">${y || "Quote"}</div>`,
                m
              )
            );
            break;
          }
          case "social": {
            const M = (Array.isArray(m.links) ? m.links : []).filter((J) => (J.url || "").trim());
            if (M.length === 0)
              I.push(
                Z(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  m
                )
              );
            else {
              const J = (le) => `<a href="${_((le.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${_(le.platform || "Link")}</a>`;
              I.push(
                Z(
                  `<div style="margin:0 0 12px;">${M.map(J).join("")}</div>`,
                  m
                )
              );
            }
            break;
          }
          case "video": {
            const y = (m.thumbnailUrl || "").trim(), M = (m.videoUrl || "#").trim(), J = _(m.caption || ""), b = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", l = y ? `<img src="${_(y)}" alt="Video" style="${b}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            I.push(
              Z(
                `<div style="margin:0 0 12px;"><a href="${_(M)}" style="display:block;color:inherit;">${l}</a>` + (J ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${J}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "link_list": {
            const y = Array.isArray(m.links) ? m.links : [], M = _(m.separator || " | "), le = y.filter(
              (b) => (b.text || b.url) && (b.url || "").trim()
            ).map(
              (b) => `<a href="${_((b.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${_(b.text || "Link")}</a>`
            );
            I.push(
              Z(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${le.join(M)}</p>`,
                m
              )
            );
            break;
          }
          case "columns": {
            const y = _(m.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = _(m.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            I.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${y || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${M || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const y = Math.min(4, Math.max(1, Number(m.columnCount) || 2)), M = Array.isArray(m.cells) ? m.cells.slice(0, y) : [], J = 100 / y, le = Array.from({ length: y }, (b, l) => {
              const s = M[l] ?? "", N = _(s).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${J}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${N || "—"}</td>`;
            }).join("");
            I.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${le}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const y = Array.isArray(m.links) ? m.links : [], M = _(m.separator || " | "), le = y.filter(
              (b) => (b.text || b.url) && (b.url || "").trim()
            ).map(
              (b) => `<a href="${_((b.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${_(b.text || "Link")}</a>`
            );
            I.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${le.length ? le.join(M) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const M = (Array.isArray(m.items) ? m.items : []).map((J) => {
              const le = _(J.title || "Section"), b = _(J.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${le}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${b}</div></details>`;
            }).join("");
            I.push(
              M ? `<div style="margin:0 0 12px;">${M}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const M = (Array.isArray(m.slides) ? m.slides : []).filter(
              (J) => (J.imageUrl || "").trim()
            );
            if (M.length === 0)
              I.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const J = M[0], le = `<img src="${_(J.imageUrl)}" alt="${_(J.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, b = (J.linkUrl || "").trim();
              I.push(
                `<div style="margin:0 0 12px;">${b ? `<a href="${_(b)}">${le}</a>` : le}` + (M.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${M.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const y = _(m.label || "Offer ends in"), M = m.endDateTime ? new Date(m.endDateTime).toLocaleString() : "—";
            I.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${y}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${M}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const y = (m.imageUrl || "").trim(), M = _(m.title || "Product"), J = _(m.price || ""), le = _(m.buttonText || "Buy now"), b = (m.buttonUrl || "#").trim(), l = y ? `<img src="${_(y)}" alt="${_(m.alt || M)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            I.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${l}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${M}</p>` + (J ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${J}</p>` : "") + `<a href="${_(b)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${le}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const y = _((m.content || "").trim());
            I.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${y || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const y = (m.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = _((m.caption || "").trim());
            I.push(
              '<div style="margin:0 0 12px;">' + (M ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${M}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${y || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const y = (m.feedUrl || "").trim(), M = Math.min(20, Math.max(1, Number(m.maxItems) ?? 5));
            I.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (y ? `<p style="margin:0;font-size:12px;color:#64748b;">${_(y)} · max ${M} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const y = (m.imageUrl || "").trim(), M = (m.fallbackUrl || "").trim(), J = _(m.alt || "Dynamic image");
            y ? I.push(
              `<div style="margin:0 0 12px;"><img src="${_(y)}" alt="${J}" style="max-width:100%;height:auto;display:block;border:0;" />` + (M ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${_(M)}</p>` : "") + "</div>"
            ) : I.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return I.join("");
    }
    const i = t, d = r, {
      campaign: g,
      dirty: $,
      customValidatorErrors: p,
      getValidationWithWarnings: v,
      update: w,
      updateMessage: S,
      undo: B,
      redo: f,
      canUndo: U,
      canRedo: O,
      resetMessage: W,
      hooks: R
    } = Fe({
      initial: i.modelValue,
      hooks: {
        ...i.hooks,
        customValidators: async (F) => {
          var I, m, y;
          const _ = [];
          (I = F.name) != null && I.trim() || _.push("Template name is required");
          const G = F.message;
          (m = G == null ? void 0 : G.subject) != null && m.trim() || _.push("Subject is required");
          const Z = (y = i.hooks) != null && y.customValidators ? await i.hooks.customValidators(F) : [];
          return [..._, ...Z];
        }
      },
      onDirty: () => d("change", g.value)
    }), { lastSavedAt: E } = je(g, { channel: "email" });
    function P(F) {
      (F.metaKey || F.ctrlKey) && F.key === "z" && (F.preventDefault(), F.shiftKey ? f() : B());
    }
    De(() => {
      window.addEventListener("keydown", P);
    }), ze(() => {
      window.removeEventListener("keydown", P);
    }), _e(g, (F) => d("update:modelValue", F), { deep: !0 });
    const oe = Q(), ce = Q(!0);
    async function de() {
      if (R.estimateReach)
        try {
          oe.value = await R.estimateReach(g.value.audience);
        } catch {
          oe.value = void 0;
        }
      R.canSend && (ce.value = await Promise.resolve(R.canSend()));
    }
    de(), _e(() => g.value.audience, de, { deep: !0 });
    const pe = C(() => (p.value, v(oe.value))), ge = C(() => pe.value.blockingErrors), $e = C(() => pe.value.warnings), ie = C(() => pe.value.valid), me = C(
      () => g.value.template_type ?? "transactional"
    ), L = Q(""), ae = Q(!1), ne = Q(null), x = C(() => {
      const F = L.value;
      return F ? Ee.find((_) => _.id === F) ?? null : null;
    });
    function fe(F) {
      const _ = g.value, G = F.campaign.message ? { ..._.message, ...F.campaign.message } : _.message;
      w({
        ...F.campaign,
        message: G
      }), ne.value = null, ae.value = !1;
    }
    function ke(F) {
      const _ = F.target.value;
      if (!_) return;
      const G = it.find((Z) => Z.id === _);
      G && ($.value ? (ne.value = G, ae.value = !0) : fe(G), F.target.value = "");
    }
    function Ae(F) {
      w({ template_type: F });
    }
    function Le(F) {
      w({
        name: F,
        tracking: { ...g.value.tracking ?? {}, campaign_name: F }
      });
    }
    const Ie = C(
      () => g.value.message.subject ?? ""
    ), we = C(
      () => g.value.message.preview_text ?? ""
    ), he = C(
      () => g.value.message.html ?? ""
    ), Be = C(
      () => g.value.message.from_name ?? "Your App"
    ), A = C(
      () => g.value.message.from_address ?? "notifications@example.com"
    ), D = C(
      () => g.value.message.blocks ?? []
    ), K = C(() => {
      const F = D.value;
      if (Array.isArray(F) && F.length > 0)
        return o(F);
      const _ = he.value;
      return _ && _.trim() ? _ : o([]);
    }), ue = C(() => {
      const F = Ie.value;
      return x.value ? Pe(F, x.value.data) : F;
    }), z = C(() => {
      const F = we.value;
      return x.value ? Pe(F, x.value.data) : F;
    }), H = C(() => {
      const F = K.value;
      return x.value ? Pe(F, x.value.data) : F;
    }), X = Q("desktop");
    function xe() {
      ie.value && d("save", g.value);
    }
    return (F, _) => (a(), n("div", Fu, [
      e("div", ju, [
        ye(qe, {
          "campaign-name": c(g).name,
          status: c(g).status,
          dirty: c($),
          "last-saved-at": c(E),
          "can-undo": c(U),
          "can-redo": c(O),
          "slugify-name": i.enforceSlugName,
          "onUpdate:campaignName": Le,
          onUndo: c(B),
          onRedo: c(f)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ge.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({
            background: c(te).dangerBg,
            border: `1px solid ${c(te).dangerBorder}`,
            borderRadius: `${c(Ce).input}px`,
            padding: `${c(q)[16]}px ${c(q)[24]}px`,
            marginBottom: `${c(q)[24]}px`
          })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: c(te).danger })
          }, [
            (a(!0), n(j, null, Y(ge.value, (G) => (a(), n("li", {
              key: G.message
            }, k(G.message), 1))), 128))
          ], 4)
        ], 4)) : h("", !0),
        $e.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({
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
            style: se({ display: "block", marginBottom: `${c(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", qu, [
            (a(!0), n(j, null, Y($e.value, (G) => (a(), n("li", {
              key: G.message
            }, k(G.message), 1))), 128))
          ])
        ], 4)) : h("", !0)
      ]),
      e("div", Ku, [
        e("aside", Yu, [
          t.disabledSections.includes("email") ? h("", !0) : (a(), n("div", Ju, [
            e("div", Gu, [
              _[9] || (_[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", Qu, [
                ye(Ke, {
                  "template-type": me.value,
                  onUpdate: Ae
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  _[8] || (_[8] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(c(it), (G) => (a(), n("option", {
                    key: G.id,
                    value: G.id
                  }, k(G.label), 9, Xu))), 128))
                ], 32)
              ])
            ]),
            ye(Hu, {
              message: c(g).message,
              "variable-options": t.variableOptions,
              "show-reset": !0,
              onUpdate: c(S),
              onReset: _[0] || (_[0] = (G) => c(W)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Zu, [
          !t.designOnly && c(g).audience.test_mode ? (a(), n("div", ec, [..._[10] || (_[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : h("", !0),
          e("div", tc, [
            e("div", sc, [
              e("label", ac, [
                _[12] || (_[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": _[1] || (_[1] = (G) => L.value = G),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  _[11] || (_[11] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(c(Ee), (G) => (a(), n("option", {
                    key: G.id,
                    value: G.id
                  }, k(G.label), 9, nc))), 128))
                ], 512), [
                  [Oe, L.value]
                ])
              ])
            ]),
            e("div", lc, [
              e("button", {
                type: "button",
                class: ve(["kb-email-device-btn", {
                  "kb-email-device-btn--active": X.value === "desktop"
                }]),
                onClick: _[2] || (_[2] = (G) => X.value = "desktop")
              }, [..._[13] || (_[13] = [
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
                ee(" Desktop ", -1)
              ])], 2),
              e("button", {
                type: "button",
                class: ve(["kb-email-device-btn", {
                  "kb-email-device-btn--active": X.value === "mobile"
                }]),
                onClick: _[3] || (_[3] = (G) => X.value = "mobile")
              }, [..._[14] || (_[14] = [
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
                ee(" Mobile ", -1)
              ])], 2)
            ]),
            e("div", {
              class: ve(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": X.value === "mobile"
              }])
            }, [
              e("div", oc, [
                e("div", ic, [
                  e("span", rc, k(Be.value), 1),
                  e("span", dc, "<" + k(A.value) + ">", 1)
                ]),
                e("div", uc, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: ue.value || "No subject"
                  }, k(ue.value || "No subject"), 9, cc),
                  z.value ? (a(), n("span", pc, " — " + k(z.value), 1)) : h("", !0)
                ])
              ]),
              e("div", mc, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: H.value
                }, null, 8, vc)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", bc, [
        i.actionsNote ? (a(), n("div", gc, k(i.actionsNote), 1)) : h("", !0),
        e("div", yc, [
          t.showDuplicate ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: _[4] || (_[4] = (G) => d("duplicate", JSON.parse(JSON.stringify(c(g)))))
          }, " Duplicate ")) : h("", !0),
          t.showSave ? (a(), n("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: xe
          }, " Save ")) : h("", !0),
          t.showClose ? (a(), n("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: _[5] || (_[5] = (G) => d("edit"))
          }, " Close ")) : h("", !0)
        ])
      ]),
      ae.value ? (a(), n("div", fc, [
        e("div", kc, [
          _[15] || (_[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          _[16] || (_[16] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", hc, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: _[6] || (_[6] = (G) => {
                ae.value = !1, ne.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: _[7] || (_[7] = (G) => ne.value && fe(ne.value))
            }, " Replace ")
          ])
        ])
      ])) : h("", !0)
    ]));
  }
}), $t = /* @__PURE__ */ be(_c, [["__scopeId", "data-v-9b188271"]]), $c = { class: "kb-shell" }, wc = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, xc = ["aria-selected", "onClick"], Sc = { class: "kb-shell__meta" }, Cc = ["href"], Ic = { class: "kb-shell__body" }, Uc = /* @__PURE__ */ re({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(t, { emit: r }) {
    const o = r, i = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (d, g) => (a(), n("div", $c, [
      e("header", {
        class: "kb-shell__header",
        style: se({ padding: `${c(q)[12]}px ${c(q)[24]}px`, borderBottom: `1px solid ${c(te).neutral.border}`, background: c(te).neutral.bg })
      }, [
        g[0] || (g[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", wc, [
          (a(), n(j, null, Y(i, ($) => e("button", {
            key: $.id,
            type: "button",
            class: ve(["kb-shell__channel", { "kb-shell__channel--active": t.channel === $.id }]),
            role: "tab",
            "aria-selected": t.channel === $.id,
            onClick: (p) => o("switch-channel", $.id)
          }, k($.label), 11, xc)), 64))
        ]),
        e("div", Sc, [
          t.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: se({ padding: "2px 8px", borderRadius: `${c(Ce).input}px`, fontSize: "0.75rem", background: c(te).neutral.bg, color: c(te).neutral.textMuted })
          }, k(t.environment), 5)) : h("", !0),
          t.helpUrl ? (a(), n("a", {
            key: 1,
            href: t.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: se({ color: c(te).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, Cc)) : h("", !0)
        ])
      ], 4),
      e("div", Ic, [
        Te(d.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Rc = /* @__PURE__ */ be(Uc, [["__scopeId", "data-v-0df30803"]]), Lc = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Bc = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Ac = ["onClick"], Tc = /* @__PURE__ */ re({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(t) {
    var g;
    const r = t, o = Q(((g = r.items[0]) == null ? void 0 : g.id) ?? "");
    let i = null;
    function d($) {
      const p = document.getElementById($);
      p && p.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return De(() => {
      const $ = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      $ && (i = new IntersectionObserver(
        (p) => {
          for (const v of p)
            if (v.isIntersecting) {
              const w = v.target.getAttribute("data-outline-id");
              w && (o.value = w);
            }
        },
        { root: $ === document ? null : $, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((p) => {
        const v = document.getElementById(p.id);
        v && (i == null || i.observe(v));
      }));
    }), ze(() => {
      i == null || i.disconnect();
    }), _e(
      () => r.items,
      ($) => {
        $.length && !o.value && (o.value = $[0].id);
      },
      { immediate: !0 }
    ), ($, p) => (a(), n("nav", Lc, [
      e("ul", Bc, [
        (a(!0), n(j, null, Y(t.items, (v) => (a(), n("li", {
          key: v.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ve(["kb-outline__btn", { "kb-outline__btn--active": o.value === v.id }]),
            style: se({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${c(q)[8]}px ${c(q)[12]}px`,
              border: "none",
              borderRadius: `${c(Ce).input}px`,
              background: o.value === v.id ? c(te).neutral.bg : "transparent",
              color: o.value === v.id ? "#0f172a" : c(te).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: o.value === v.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (w) => d(v.id)
          }, k(v.label), 15, Ac)
        ]))), 128))
      ])
    ]));
  }
}), Pc = /* @__PURE__ */ be(Tc, [["__scopeId", "data-v-25c37675"]]), Vc = ["id"], Ec = {
  key: 1,
  class: "kb-form-shell__head"
}, Nc = /* @__PURE__ */ re({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(t) {
    return (r, o) => (a(), n("div", {
      class: "kb-form-shell",
      id: t.sectionId ?? void 0,
      style: se({
        padding: `${c(q)[24]}px ${c(q)[24]}px ${c(q)[32]}px`,
        marginBottom: 0
      })
    }, [
      t.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: se({ marginBottom: c(q)[24], paddingBottom: c(q)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: se({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: c(q)[12] })
        }, k(t.label), 5),
        Te(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", Ec, [
        Te(r.$slots, "head", {}, void 0, !0)
      ])),
      Te(r.$slots, "default", {}, void 0, !0)
    ], 12, Vc));
  }
}), Oc = /* @__PURE__ */ be(Nc, [["__scopeId", "data-v-6504df41"]]), Mc = /* @__PURE__ */ re({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(t) {
    return (r, o) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: se({
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
      Te(r.$slots, "default")
    ], 4));
  }
}), Dc = /* @__PURE__ */ re({
  __name: "BuilderTopShell",
  setup(t) {
    return (r, o) => (a(), n("div", {
      class: "kb-top-shell",
      style: se({
        marginLeft: c(q)[24],
        marginRight: c(q)[24]
      })
    }, [
      Te(r.$slots, "header"),
      Te(r.$slots, "errors"),
      Te(r.$slots, "warnings"),
      Te(r.$slots, "default")
    ], 4));
  }
});
function zc(t) {
  t.component("KeosNotificationBuilder", kt), t.component("KeosWhatsAppBuilder", ht), t.component("KeosSmsBuilder", _t), t.component("KeosEmailBuilder", $t), t.component("BuilderShell", Rc), t.component("BuilderOutline", Pc), t.component("BuilderVersionHistoryModal", ft), t.component("BuilderFormShell", Oc), t.component("BuilderActionsBar", Mc), t.component("BuilderTopShell", Dc);
}
const Hc = {
  install: zc,
  KeosNotificationBuilder: kt,
  KeosWhatsAppBuilder: ht,
  KeosSmsBuilder: _t,
  KeosEmailBuilder: $t
};
export {
  Mc as BuilderActionsBar,
  Oc as BuilderFormShell,
  Pc as BuilderOutline,
  Rc as BuilderShell,
  Dc as BuilderTopShell,
  ft as BuilderVersionHistoryModal,
  Ee as DEFAULT_SAMPLE_PROFILES,
  $t as KeosEmailBuilder,
  kt as KeosNotificationBuilder,
  _t as KeosSmsBuilder,
  ht as KeosWhatsAppBuilder,
  Hc as default,
  zc as install,
  Pe as renderTemplatePreview,
  je as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
