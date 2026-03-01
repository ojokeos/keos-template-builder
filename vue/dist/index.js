import { ref as Q, watch as _e, computed as C, defineComponent as re, openBlock as a, createElementBlock as n, normalizeStyle as se, unref as p, createElementVNode as e, Fragment as j, renderList as Y, toDisplayString as k, createTextVNode as ee, createCommentVNode as _, normalizeClass as ve, withDirectives as Re, vModelSelect as Me, vModelText as Ge, vModelCheckbox as wt, createStaticVNode as Ne, withKeys as xt, onMounted as De, onUnmounted as ze, createVNode as ye, createBlock as Ct, renderSlot as Te } from "vue";
const q = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Se = {
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
}, St = ["android", "ios", "web"], dt = "normal", ut = ["low", "normal", "high"], ct = 86400, It = [3600, 7200, 86400, 172800], pt = "1.0", Ut = ["topic", "segment", "user_list"];
function Qe() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...St],
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
function Rt(s) {
  return {
    schema_version: pt,
    name: "",
    status: "draft",
    audience: Qe(),
    message: Xe(),
    delivery: Ze(),
    tracking: et(),
    ...s
  };
}
function mt(s) {
  const r = s;
  return r.schema_version || (r.schema_version = pt), r.audience || (r.audience = Qe()), r.message || (r.message = Xe()), r.delivery || (r.delivery = Ze()), r.tracking || (r.tracking = et()), ut.includes(r.delivery.priority) || (r.delivery.priority = dt), r.delivery.ttl === void 0 && (r.delivery.ttl = ct), Ut.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const Lt = 1e5;
function At(s, r) {
  var c, g, $;
  const o = [], i = r ?? s.audience.estimated_reach;
  return i !== void 0 && i >= Lt && o.push({
    message: `Estimated reach is very high (${i.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), s.tracking && !((c = s.tracking.campaign_name) != null && c.trim()) && !((g = s.name) != null && g.trim()) && o.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), ($ = s.message.deep_link) != null && $.trim() || o.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), o;
}
function vt(s, r = "error") {
  return { message: s, severity: r };
}
function bt(s) {
  const r = [];
  return s.schema_version || r.push(vt("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function Bt(s, r) {
  const o = bt(s), i = At(s, r);
  return {
    valid: o.valid,
    errors: [
      ...o.errors,
      ...i.map((c) => vt(c.message, c.severity))
    ]
  };
}
function Tt(s) {
  return s.errors.filter((r) => r.severity === "error");
}
function Pt(s) {
  return s.errors.filter((r) => r.severity !== "error");
}
function Ve(s, r) {
  return s.length <= r ? { text: s, truncated: !1 } : { text: s.slice(0, Math.max(0, r - 3)) + "...", truncated: !0 };
}
const We = He.android;
function Vt(s) {
  const { title: r, body: o } = s, i = Ve(r || "", We.title), c = Ve(o || "", We.body);
  return {
    title: i.text,
    body: c.text,
    imageUrl: s.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: c.truncated,
    expanded: !1
  };
}
function Et(s) {
  const { title: r, body: o } = s, i = Ve(r || "", We.title), c = Ve(o || "", We.body);
  return {
    title: i.text,
    body: c.text,
    imageUrl: s.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: c.truncated,
    expanded: !0
  };
}
function Ot(s, r = {}) {
  const o = r.expanded ? Et(s) : Vt(s);
  return r.darkMode !== void 0 && (o.darkMode = r.darkMode), o;
}
const tt = He.ios;
function gt(s) {
  const { title: r, body: o } = s, i = Ve(r || "", tt.title), c = Ve(o || "", tt.body);
  return {
    title: i.text,
    body: c.text,
    imageUrl: s.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: c.truncated,
    expanded: !1
  };
}
function Mt(s) {
  return gt(s);
}
function Nt(s, r = {}) {
  const o = r.variant === "lockscreen" ? Mt(s) : gt(s);
  return r.darkMode !== void 0 && (o.darkMode = r.darkMode), o;
}
const st = He.web;
function at(s) {
  const { title: r, body: o } = s, i = Ve(r || "", st.title), c = Ve(o || "", st.body);
  return {
    title: i.text,
    body: c.text,
    imageUrl: s.imageUrl,
    titleTruncated: i.truncated,
    bodyTruncated: c.truncated
  };
}
function Dt(s) {
  return s.map((r) => ({ message: r, severity: "error" }));
}
function Je(s) {
  return JSON.parse(JSON.stringify(s));
}
function Fe(s = {}) {
  const r = Q(
    mt(s.initial ?? Rt())
  ), o = s.hooks ?? {}, i = Q(!1), c = Q([]);
  _e(
    r,
    () => {
      if (!o.customValidators) {
        c.value = [];
        return;
      }
      o.customValidators(r.value).then((L) => {
        c.value = L;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const g = Q([]), $ = Q([]);
  function d() {
    const L = Je(r.value);
    g.value = [...g.value.slice(-19), L], $.value = [];
  }
  const v = C(() => g.value.length > 0), x = C(() => $.value.length > 0);
  function I() {
    g.value.length !== 0 && ($.value = [Je(r.value), ...$.value], r.value = g.value[g.value.length - 1], g.value = g.value.slice(0, -1));
  }
  function A() {
    $.value.length !== 0 && (g.value = [...g.value, Je(r.value)], r.value = $.value[0], $.value = $.value.slice(1));
  }
  _e(
    r,
    () => {
      var L;
      i.value = !0, (L = s.onDirty) == null || L.call(s);
    },
    { deep: !0 }
  );
  const f = C(() => bt(r.value));
  function U(L) {
    const ae = Bt(r.value, L), ne = Dt(c.value), w = [...Tt(ae), ...ne], fe = [...ae.errors, ...ne], ke = ae.valid && ne.length === 0;
    return {
      ...ae,
      errors: fe,
      valid: ke,
      blockingErrors: w,
      warnings: Pt(ae)
    };
  }
  function M(L) {
    d(), r.value = { ...r.value, ...L };
  }
  function W(L) {
    d(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...L }
    };
  }
  function R(L) {
    d(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...L }
    };
  }
  function E(L) {
    d(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...L }
    };
  }
  function P(L) {
    d(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...L } : { campaign_name: "", tags: [], ab_test: !1, ...L }
    };
  }
  function oe(L) {
    d(), r.value = {
      ...r.value,
      message: { ...Xe(), ...L }
    };
  }
  function ce(L) {
    d(), r.value = {
      ...r.value,
      delivery: { ...Ze(), ...L }
    };
  }
  function de(L) {
    d(), r.value = {
      ...r.value,
      tracking: { ...et(), ...L }
    };
  }
  function pe(L) {
    d(), r.value = {
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
    let w;
    switch (L) {
      case "android":
        w = Ot(ne, { expanded: ae == null ? void 0 : ae.expanded });
        break;
      case "ios":
        w = Nt(ne);
        break;
      case "web":
        w = at(ne);
        break;
      default:
        w = at(ne);
    }
    const fe = r.value.message.actions ?? [], ke = r.value.message.location;
    return { ...w, actions: fe, location: ke ?? void 0 };
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
    customValidatorErrors: c,
    getValidationWithWarnings: U,
    update: M,
    updateAudience: W,
    updateMessage: R,
    updateDelivery: E,
    updateTracking: P,
    undo: I,
    redo: A,
    canUndo: v,
    canRedo: x,
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
function Ht(s, r) {
  return `${zt}-${s}-${r}`;
}
function je(s, r) {
  const o = r.channel, i = C(
    () => {
      var I, A;
      return Ht(
        o,
        r.key ?? ((I = s.value) == null ? void 0 : I.id) ?? ((A = s.value) == null ? void 0 : A.name) ?? "draft"
      );
    }
  ), c = Q(null);
  let g = null;
  function $() {
    try {
      const I = JSON.stringify(s.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(i.value, I), c.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function d() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(i.value);
    } catch {
    }
  }
  function v() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const I = window.localStorage.getItem(i.value);
      if (!I) return null;
      const A = JSON.parse(I);
      return mt(A);
    } catch {
      return null;
    }
  }
  function x() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return _e(
    s,
    () => {
      x() && (g && clearTimeout(g), g = setTimeout(() => {
        g = null, $();
      }, Wt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: c,
    clearDraft: d,
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
    workflowStatus: {}
  },
  emits: ["update:campaignName", "update:workflowStatus", "undo", "redo"],
  setup(s, { emit: r }) {
    const o = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], i = r;
    function c($) {
      return $.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function g($) {
      const d = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return d[$] ?? d.draft;
    }
    return ($, d) => (a(), n("header", {
      class: "kb-header",
      style: se({
        padding: `${p(q)[16]}px 0`,
        borderBottom: `1px solid ${p(te).neutral.border}`,
        marginBottom: `${p(q)[16]}px`
      })
    }, [
      e("div", Ft, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: s.campaignName,
          placeholder: "Name this campaign (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: d[0] || (d[0] = (v) => i("update:campaignName", v.target.value)),
          "aria-label": "Campaign name"
        }, null, 40, jt),
        e("div", qt, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !s.canUndo,
            onClick: d[1] || (d[1] = (v) => i("undo"))
          }, " Undo ", 8, Kt),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !s.canRedo,
            onClick: d[2] || (d[2] = (v) => i("redo"))
          }, " Redo ", 8, Yt)
        ]),
        s.workflowStatus !== void 0 ? (a(), n("select", {
          key: 0,
          value: s.workflowStatus,
          class: "kb-header__status-select",
          style: se({
            padding: `${p(q)[4]}px ${p(q)[8]}px`,
            borderRadius: `${p(Se).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...g(s.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: d[3] || (d[3] = (v) => i("update:workflowStatus", v.target.value))
        }, [
          (a(), n(j, null, Y(o, (v) => e("option", {
            key: v.value,
            value: v.value
          }, k(v.label), 9, Gt)), 64))
        ], 44, Jt)) : (a(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: se({
            padding: `${p(q)[4]}px ${p(q)[8]}px`,
            borderRadius: `${p(Se).input}px`,
            background: p(te).neutral.bg,
            fontSize: "0.8125rem",
            color: p(te).neutral.textMuted
          })
        }, k(s.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: se({ fontSize: "0.8125rem", color: p(te).neutral.textMuted, marginTop: `${p(q)[4]}px` })
      }, [
        s.saving ? (a(), n(j, { key: 0 }, [
          ee("Saving…")
        ], 64)) : s.dirty ? (a(), n(j, { key: 1 }, [
          ee("Unsaved changes")
        ], 64)) : s.lastSavedAt ? (a(), n(j, { key: 2 }, [
          ee("Last saved at " + k(c(s.lastSavedAt)), 1)
        ], 64)) : _("", !0)
      ], 4)
    ], 4));
  }
}), be = (s, r) => {
  const o = s.__vccOpts || s;
  for (const [i, c] of r)
    o[i] = c;
  return o;
}, qe = /* @__PURE__ */ be(Qt, [["__scopeId", "data-v-bf624780"]]), Xt = { class: "kb-section" }, Zt = { class: "kb-section__head" }, es = { class: "kb-section__desc" }, ts = { class: "kb-field" }, ss = { class: "kb-label" }, as = { class: "kb-field-with-rail" }, ns = ["value", "aria-invalid", "aria-describedby"], ls = {
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
}, ys = { class: "kb-field" }, fs = { class: "kb-location-row" }, ks = ["value"], hs = ["value"], _s = ["value"], $s = ["value"], ws = { class: "kb-field" }, xs = { class: "kb-actions-list" }, Cs = ["value", "onInput"], Ss = ["value", "onInput"], Is = ["onClick"], Us = ["disabled"], Rs = { class: "kb-action-chips" }, Ls = ["disabled", "onClick"], As = /* @__PURE__ */ re({
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
    return (o, i) => {
      var c, g, $, d;
      return a(), n("section", Xt, [
        e("div", Zt, [
          i[10] || (i[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: i[0] || (i[0] = (v) => o.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", es, " Message body is required. Title is optional. Character limits depend on the selected platform (" + k(s.selectedPlatform) + "). ", 1),
        e("div", ts, [
          e("label", ss, [
            i[11] || (i[11] = ee(" Title ", -1)),
            e("span", {
              class: ve(["kb-counter", { "kb-counter--warn": s.titleCount > s.titleLimit }])
            }, k(s.titleCount) + "/" + k(s.titleLimit), 3)
          ]),
          e("div", as, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: s.message.title,
              "aria-invalid": !!s.titleError,
              "aria-describedby": s.titleError ? "title-error" : void 0,
              onInput: i[1] || (i[1] = (v) => o.$emit("update", { title: v.target.value }))
            }, null, 40, ns),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: se({ "--pct": Math.min(100, s.titleCount / s.titleLimit * 100) + "%" })
            }, [...i[12] || (i[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          s.titleError ? (a(), n("p", ls, k(s.titleError), 1)) : _("", !0)
        ]),
        e("div", os, [
          e("label", is, [
            i[13] || (i[13] = ee(" Message ", -1)),
            e("span", {
              class: ve(["kb-counter", { "kb-counter--warn": s.bodyCount > s.bodyLimit }])
            }, k(s.bodyCount) + "/" + k(s.bodyLimit), 3)
          ]),
          e("div", rs, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: s.message.body,
              "aria-invalid": !!s.bodyError,
              "aria-describedby": s.bodyError ? "body-error" : void 0,
              onInput: i[2] || (i[2] = (v) => o.$emit("update", { body: v.target.value }))
            }, null, 40, ds),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: se({ "--pct": Math.min(100, s.bodyCount / s.bodyLimit * 100) + "%" })
            }, [...i[14] || (i[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          s.bodyError ? (a(), n("p", us, k(s.bodyError), 1)) : _("", !0)
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
            value: s.message.image_url,
            "aria-invalid": !!s.imageUrlError,
            "aria-describedby": s.imageUrlError ? "image-url-error" : void 0,
            onInput: i[3] || (i[3] = (v) => o.$emit("update", { image_url: v.target.value || void 0 }))
          }, null, 40, ps),
          s.imageUrlError ? (a(), n("p", ms, k(s.imageUrlError), 1)) : _("", !0)
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
            value: s.message.deep_link,
            "aria-invalid": !!s.deepLinkError,
            "aria-describedby": s.deepLinkError ? "deeplink-error" : void 0,
            onInput: i[4] || (i[4] = (v) => o.$emit("update", { deep_link: v.target.value || void 0 }))
          }, null, 40, bs),
          s.deepLinkError ? (a(), n("p", gs, k(s.deepLinkError), 1)) : _("", !0)
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
              value: ((c = s.message.location) == null ? void 0 : c.lat) ?? "",
              onInput: i[5] || (i[5] = (v) => {
                const x = { ...s.message.location ?? {} }, I = v.target.value;
                x.lat = I === "" ? void 0 : Number(I), o.$emit("update", { location: x });
              })
            }, null, 40, ks),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((g = s.message.location) == null ? void 0 : g.lon) ?? "",
              onInput: i[6] || (i[6] = (v) => {
                const x = { ...s.message.location ?? {} }, I = v.target.value;
                x.lon = I === "" ? void 0 : Number(I), o.$emit("update", { location: x });
              })
            }, null, 40, hs)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: (($ = s.message.location) == null ? void 0 : $.name) ?? "",
            onInput: i[7] || (i[7] = (v) => {
              const x = { ...s.message.location ?? {} };
              x.name = v.target.value || void 0, o.$emit("update", { location: x });
            })
          }, null, 40, _s),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((d = s.message.location) == null ? void 0 : d.address) ?? "",
            onInput: i[8] || (i[8] = (v) => {
              const x = { ...s.message.location ?? {} };
              x.address = v.target.value || void 0, o.$emit("update", { location: x });
            })
          }, null, 40, $s)
        ]),
        e("div", ws, [
          i[19] || (i[19] = e("label", { class: "kb-label" }, [
            ee(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", xs, [
            (a(!0), n(j, null, Y(r.message.actions ?? [], (v, x) => (a(), n("div", {
              key: v.id || x,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: v.label,
                onInput: (I) => {
                  var U;
                  const A = [...r.message.actions ?? []], f = Number(x);
                  A[f] = {
                    ...A[f],
                    id: ((U = A[f]) == null ? void 0 : U.id) || `action_${f + 1}`,
                    label: I.target.value
                  }, o.$emit("update", { actions: A });
                }
              }, null, 40, Cs),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: v.url,
                onInput: (I) => {
                  var U;
                  const A = [...r.message.actions ?? []], f = Number(x);
                  A[f] = {
                    ...A[f],
                    id: ((U = A[f]) == null ? void 0 : U.id) || `action_${f + 1}`,
                    url: I.target.value || void 0
                  }, o.$emit("update", { actions: A });
                }
              }, null, 40, Ss),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const I = [...r.message.actions ?? []];
                  I.splice(Number(x), 1), o.$emit("update", { actions: I });
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
                  const x = [...r.message.actions ?? []];
                  x.push({
                    id: `action_${Date.now()}`,
                    label: v,
                    url: ""
                  }), o.$emit("update", { actions: x });
                }
              }, k(v), 9, Ls)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), Bs = /* @__PURE__ */ be(As, [["__scopeId", "data-v-7bc3a44c"]]), Ts = { class: "kb-section kb-section--inline-personalization" }, Ps = { class: "kb-field" }, Vs = { class: "kb-insert-row" }, Es = ["value"], Os = { class: "kb-field" }, Ms = { class: "kb-insert-row" }, Ns = { class: "kb-field" }, Ds = { class: "kb-variable-list" }, zs = /* @__PURE__ */ re({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(s, { emit: r }) {
    const o = s, i = r, c = ["first_name", "last_name", "order_id", "city"], g = Q(o.variableOptions ?? c), $ = Q(g.value[0] ?? c[0]), d = Q("");
    _e(
      () => o.variableOptions,
      (A) => {
        A && A.length && (g.value = [...A], g.value.includes($.value) || ($.value = g.value[0]));
      }
    );
    const v = C(() => g.value);
    function x(A) {
      i("insertVariable", { variable: $.value, field: A });
    }
    function I() {
      const A = d.value.trim();
      A && (g.value.includes(A) || (g.value = [...g.value, A]), $.value = A, d.value = "");
    }
    return (A, f) => (a(), n("section", Ts, [
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
            [Me, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: f[1] || (f[1] = (U) => x("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: f[2] || (f[2] = (U) => x("body"))
          }, "Into message")
        ])
      ]),
      e("div", Os, [
        f[5] || (f[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ms, [
          Re(e("input", {
            "onUpdate:modelValue": f[3] || (f[3] = (U) => d.value = U),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [Ge, d.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: I
          }, " Add ")
        ])
      ]),
      e("div", Ns, [
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
  setup(s, { emit: r }) {
    const o = r;
    return (i, c) => (a(), n("section", Ws, [
      c[5] || (c[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      c[6] || (c[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Hs, [
        e("div", Fs, [
          e("label", js, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: s.templateType === "transactional",
              onChange: c[0] || (c[0] = (g) => o("update", "transactional"))
            }, null, 40, qs),
            c[2] || (c[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", Ks, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: s.templateType === "marketing",
              onChange: c[1] || (c[1] = (g) => o("update", "marketing"))
            }, null, 40, Ys),
            c[3] || (c[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        c[4] || (c[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
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
  setup(s) {
    const r = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (o, i) => {
      var c;
      return a(), n("section", Gs, [
        e("div", Qs, [
          i[8] || (i[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: i[0] || (i[0] = (g) => o.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        e("p", Xs, k(s.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", Zs, [
          i[11] || (i[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", ea, [
            e("label", ta, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !s.delivery.scheduled_at,
                onChange: i[1] || (i[1] = (g) => o.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, sa),
              i[9] || (i[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", aa, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!s.delivery.scheduled_at,
                onChange: i[2] || (i[2] = (g) => o.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, na),
              i[10] || (i[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        s.delivery.scheduled_at ? (a(), n("div", la, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (c = s.delivery.scheduled_at) == null ? void 0 : c.slice(0, 16),
            onInput: i[3] || (i[3] = (g) => o.$emit("update", { scheduled_at: g.target.value }))
          }, null, 40, oa),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: s.delivery.timezone,
            onInput: i[4] || (i[4] = (g) => o.$emit("update", { timezone: g.target.value }))
          }, null, 40, ia)
        ])) : _("", !0),
        s.showPushOptions ? (a(), n(j, { key: 1 }, [
          e("div", ra, [
            i[12] || (i[12] = e("label", { class: "kb-label" }, [
              ee(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: s.delivery.ttl,
              onChange: i[5] || (i[5] = (g) => o.$emit("update", { ttl: Number(g.target.value) }))
            }, [
              (a(!0), n(j, null, Y(p(It), (g) => (a(), n("option", {
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
              value: s.delivery.priority,
              onChange: i[6] || (i[6] = (g) => o.$emit("update", { priority: g.target.value }))
            }, [
              (a(!0), n(j, null, Y(p(ut), (g) => (a(), n("option", {
                key: g,
                value: g
              }, k(g), 9, ma))), 128))
            ], 40, pa)
          ]),
          e("div", va, [
            e("label", ba, [
              e("input", {
                type: "checkbox",
                checked: s.delivery.quiet_hours,
                onChange: i[7] || (i[7] = (g) => o.$emit("update", { quiet_hours: !s.delivery.quiet_hours }))
              }, null, 40, ga),
              i[14] || (i[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : _("", !0)
      ]);
    };
  }
}), fa = /* @__PURE__ */ be(ya, [["__scopeId", "data-v-a208b72f"]]), ka = { class: "kb-accordion" }, ha = { class: "kb-accordion__body" }, _a = { class: "kb-field" }, $a = ["value"], wa = { class: "kb-field" }, xa = { class: "kb-checkbox" }, Ca = ["checked"], Sa = /* @__PURE__ */ re({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(s) {
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
            value: s.delivery.collapse_key,
            onInput: o[0] || (o[0] = (i) => r.$emit("update", { collapse_key: i.target.value || void 0 }))
          }, null, 40, $a)
        ]),
        e("div", wa, [
          e("label", xa, [
            e("input", {
              type: "checkbox",
              checked: s.delivery.silent_push,
              onChange: o[1] || (o[1] = (i) => r.$emit("update", { silent_push: !s.delivery.silent_push }))
            }, null, 40, Ca),
            o[3] || (o[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ia = /* @__PURE__ */ be(Sa, [["__scopeId", "data-v-e0f5c559"]]);
function Pe(s, r) {
  return !s || typeof s != "string" ? s : s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (o, i) => {
    const c = i.trim();
    return c in r ? String(r[c]) : `{{ ${i} }}`;
  });
}
const Ee = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Ua = { class: "kb-preview" }, Ra = {
  key: 0,
  class: "kb-preview__toggle"
}, La = { class: "kb-checkbox" }, Aa = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, Ba = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, Ta = ["src"], Pa = { class: "kb-android-body-row" }, Va = { class: "kb-android-body-content" }, Ea = {
  key: 0,
  class: "kb-android-title"
}, Oa = {
  key: 1,
  class: "kb-android-text"
}, Ma = {
  key: 2,
  class: "kb-android-location-line"
}, Na = {
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
  setup(s) {
    const r = s, o = Q(!1), i = C(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? o.value : void 0
      })
    ), c = C(() => {
      const d = i.value;
      return r.previewProfile ? {
        ...d,
        title: Pe((d == null ? void 0 : d.title) ?? "", r.previewProfile.data),
        body: Pe((d == null ? void 0 : d.body) ?? "", r.previewProfile.data)
      } : d;
    }), g = C(() => {
      var f;
      const d = (f = c.value) == null ? void 0 : f.location;
      if (!d || d.lat == null && d.lon == null) return null;
      const v = Number(d.lat) || 0, x = Number(d.lon) || 0, I = 8e-3, A = [x - I, v - I, x + I, v + I].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(A)}&layer=mapnik&marker=${v},${x}`;
    }), $ = C(() => {
      var v;
      const d = (v = c.value) == null ? void 0 : v.location;
      return d && (d.lat != null || d.lon != null || d.name || d.address);
    });
    return (d, v) => {
      var x, I, A, f, U, M, W, R, E, P, oe, ce, de, pe, ge, $e;
      return a(), n("div", Ua, [
        s.selectedPlatform === "android" ? (a(), n("div", Ra, [
          e("label", La, [
            Re(e("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (ie) => o.value = ie),
              type: "checkbox"
            }, null, 512), [
              [wt, o.value]
            ]),
            v[1] || (v[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : _("", !0),
        s.selectedPlatform === "android" ? (a(), n("div", Aa, [
          v[4] || (v[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ve(["kb-android-notification", { "kb-android-notification--expanded": o.value }])
          }, [
            v[3] || (v[3] = Ne('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: ve(["kb-android-body", { "kb-android-body--expanded": o.value }])
            }, [
              o.value && c.value.imageUrl ? (a(), n("div", Ba, [
                e("img", {
                  src: c.value.imageUrl,
                  alt: ""
                }, null, 8, Ta)
              ])) : _("", !0),
              e("div", Pa, [
                e("div", Va, [
                  c.value.title ? (a(), n("div", Ea, k(c.value.title), 1)) : _("", !0),
                  c.value.body ? (a(), n("div", Oa, k(c.value.body), 1)) : _("", !0),
                  $.value && !o.value && ((x = c.value.location) != null && x.name || (I = c.value.location) != null && I.address) ? (a(), n("div", Ma, [
                    v[2] || (v[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    ee(" " + k(((A = c.value.location) == null ? void 0 : A.name) || ((f = c.value.location) == null ? void 0 : f.address)), 1)
                  ])) : _("", !0)
                ]),
                !o.value && c.value.imageUrl ? (a(), n("div", Na, [
                  e("img", {
                    src: c.value.imageUrl,
                    alt: ""
                  }, null, 8, Da)
                ])) : _("", !0)
              ]),
              $.value && g.value && o.value ? (a(), n("div", za, [
                e("iframe", {
                  src: g.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Wa),
                (U = c.value.location) != null && U.name || (M = c.value.location) != null && M.address ? (a(), n("div", Ha, k(((W = c.value.location) == null ? void 0 : W.name) || ((R = c.value.location) == null ? void 0 : R.address)), 1)) : _("", !0)
              ])) : _("", !0),
              c.value.actions && c.value.actions.length ? (a(), n("div", Fa, [
                (a(!0), n(j, null, Y(c.value.actions, (ie) => (a(), n("button", {
                  key: ie.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, k(ie.label || "Action"), 1))), 128))
              ])) : _("", !0)
            ], 2)
          ], 2)
        ])) : s.selectedPlatform === "ios" ? (a(), n("div", ja, [
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
              c.value.title ? (a(), n("div", Ya, k(c.value.title), 1)) : _("", !0),
              c.value.body ? (a(), n("div", Ja, k(c.value.body), 1)) : _("", !0),
              $.value && g.value ? (a(), n("div", Ga, [
                e("iframe", {
                  src: g.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Qa),
                (E = c.value.location) != null && E.name || (P = c.value.location) != null && P.address ? (a(), n("div", Xa, k(((oe = c.value.location) == null ? void 0 : oe.name) || ((ce = c.value.location) == null ? void 0 : ce.address)), 1)) : _("", !0)
              ])) : _("", !0),
              c.value.actions && c.value.actions.length ? (a(), n("div", Za, [
                (a(!0), n(j, null, Y(c.value.actions, (ie) => (a(), n("button", {
                  key: ie.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, k(ie.label || "Action"), 1))), 128))
              ])) : _("", !0)
            ]),
            c.value.imageUrl ? (a(), n("div", en, [
              e("img", {
                src: c.value.imageUrl,
                alt: ""
              }, null, 8, tn)
            ])) : _("", !0)
          ])
        ])) : (a(), n("div", sn, [
          v[9] || (v[9] = Ne('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", an, [
            v[8] || (v[8] = Ne('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", nn, [
              c.value.title ? (a(), n("div", ln, k(c.value.title), 1)) : _("", !0),
              c.value.body ? (a(), n("div", on, k(c.value.body), 1)) : _("", !0),
              c.value.imageUrl ? (a(), n("div", rn, [
                e("img", {
                  src: c.value.imageUrl,
                  alt: ""
                }, null, 8, dn)
              ])) : _("", !0),
              $.value && g.value ? (a(), n("div", un, [
                e("iframe", {
                  src: g.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, cn),
                (de = c.value.location) != null && de.name || (pe = c.value.location) != null && pe.address ? (a(), n("div", pn, k(((ge = c.value.location) == null ? void 0 : ge.name) || (($e = c.value.location) == null ? void 0 : $e.address)), 1)) : _("", !0)
              ])) : _("", !0)
            ]),
            c.value.actions && c.value.actions.length ? (a(), n("div", mn, [
              (a(!0), n(j, null, Y(c.value.actions, (ie, me) => (a(), n("button", {
                key: ie.id || me,
                type: "button",
                class: ve(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(me) > 0 }])
              }, k(ie.label || "Action"), 3))), 128))
            ])) : _("", !0)
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
  setup(s, { emit: r }) {
    const o = r;
    function i(c) {
      try {
        return new Date(c).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return c;
      }
    }
    return (c, g) => s.open ? (a(), n("div", {
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
        s.versions.length === 0 ? (a(), n("div", yn, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), n("ul", fn, [
          (a(!0), n(j, null, Y(s.versions, ($) => (a(), n("li", {
            key: $.id,
            class: "kb-version-item"
          }, [
            e("span", kn, k($.label || i($.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (d) => {
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
    ], 32)) : _("", !0);
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
], wn = { class: "keos-notification-builder" }, xn = { class: "kb-builder-top" }, Cn = { style: { margin: 0, paddingLeft: "1.25rem" } }, Sn = { class: "kb-push-layout" }, In = { class: "kb-push-sidebar" }, Un = {
  key: 0,
  class: "kb-push-form"
}, Rn = {
  key: 0,
  class: "kb-hint-card"
}, Ln = { class: "kb-push-form-head" }, An = { class: "kb-push-form-head-row" }, Bn = ["value"], Tn = {
  key: 1,
  class: "kb-push-form"
}, Pn = { class: "kb-push-canvas" }, Vn = {
  key: 0,
  class: "kb-push-test-banner"
}, En = { class: "kb-push-preview-chrome" }, On = { class: "kb-push-preview-controls" }, Mn = { class: "kb-push-preview-as" }, Nn = ["value"], Dn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, zn = ["aria-selected", "aria-controls", "onClick"], Wn = { class: "kb-push-preview-frame" }, Hn = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, Fn = { class: "kb-push-actions" }, jn = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, qn = { class: "kb-confirm-dialog" }, Kn = { class: "kb-confirm-actions" }, Yn = /* @__PURE__ */ re({
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
    const o = s, i = r, c = Q("android"), g = Q(""), $ = Q(!1), d = Q(null), v = Q(!1), x = C(() => M.value.workflow_status ?? "draft"), I = C(() => {
      const S = g.value;
      return S ? Ee.find((m) => m.id === S) ?? null : null;
    });
    function A(S) {
      const m = M.value, y = S.campaign.message ? { ...m.message, ...S.campaign.message } : m.message, N = S.campaign.delivery ? { ...m.delivery, ...S.campaign.delivery } : m.delivery;
      P({
        ...S.campaign,
        message: y,
        delivery: N
      }), d.value = null, $.value = !1;
    }
    function f(S) {
      const m = S.target.value;
      if (!m) return;
      const y = nt.find((N) => N.id === m);
      y && (W.value ? (d.value = y, $.value = !0) : A(y), S.target.value = "");
    }
    function U(S) {
      M.value = S, v.value = !1;
    }
    const {
      campaign: M,
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
        customValidators: async (S) => {
          var N, J, le, b;
          const m = [];
          (N = S.name) != null && N.trim() || m.push("Template name is required"), (le = (J = S.message) == null ? void 0 : J.body) != null && le.trim() || m.push("Message body is required");
          const y = (b = o.hooks) != null && b.customValidators ? await o.hooks.customValidators(S) : [];
          return [...m, ...y];
        }
      },
      onDirty: () => i("change", M.value)
    }), { lastSavedAt: w } = je(M, { channel: "push" });
    function fe(S) {
      (S.metaKey || S.ctrlKey) && S.key === "z" && (S.preventDefault(), S.shiftKey ? pe() : de());
    }
    De(() => {
      window.addEventListener("keydown", fe);
    }), ze(() => {
      window.removeEventListener("keydown", fe);
    }), _e(
      M,
      (S) => i("update:modelValue", S),
      { deep: !0 }
    );
    const ke = Q(), Be = Q(!0), Le = Q(!0);
    async function Ie() {
      if (ne.estimateReach)
        try {
          ke.value = await ne.estimateReach(M.value.audience);
        } catch {
          ke.value = void 0;
        }
      ne.canSend && (Be.value = await Promise.resolve(ne.canSend())), ne.canSchedule && (Le.value = await Promise.resolve(ne.canSchedule()));
    }
    Ie(), _e(() => M.value.audience, Ie, { deep: !0 });
    const we = C(() => (R.value, E(ke.value))), he = C(() => we.value.blockingErrors), Ae = C(() => we.value.warnings), B = C(() => we.value.valid), D = C(() => ae[c.value].title), K = C(() => ae[c.value].body), ue = C(() => M.value.message.title.length), z = C(() => M.value.message.body.length), H = C(() => {
      if (ue.value > D.value) return `Title exceeds ${D.value} characters for ${c.value}.`;
    }), X = C(() => {
      const S = he.value.find((m) => m.message === "Message body is required");
      if (S) return S.message;
      if (z.value > K.value) return `Body exceeds ${K} characters for ${c.value}.`;
    }), xe = C(() => M.value.template_type ?? "transactional");
    function F(S) {
      P({ template_type: S });
    }
    function h(S) {
      P({
        name: S,
        tracking: { ...M.value.tracking ?? {}, campaign_name: S }
      });
    }
    function G(S) {
      const m = ` {{ ${S.variable} }}`, y = M.value.message.variables ?? [], N = Array.from(/* @__PURE__ */ new Set([...y, S.variable]));
      S.field === "title" ? oe({
        title: M.value.message.title + m,
        variables: N
      }) : oe({
        body: M.value.message.body + m,
        variables: N
      });
    }
    function Z() {
      B.value && i("save", M.value);
    }
    return (S, m) => (a(), n("div", wn, [
      e("div", xn, [
        ye(qe, {
          "campaign-name": p(M).name,
          status: p(M).status,
          dirty: p(W),
          "last-saved-at": p(w),
          "can-undo": p(ge),
          "can-redo": p($e),
          "workflow-status": x.value,
          "onUpdate:campaignName": h,
          "onUpdate:workflowStatus": m[0] || (m[0] = (y) => p(P)({ workflow_status: y })),
          onUndo: p(de),
          onRedo: p(pe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "onUndo", "onRedo"]),
        he.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({ background: p(te).dangerBg, border: `1px solid ${p(te).dangerBorder}`, borderRadius: `${p(Se).input}px`, padding: `${p(q)[12]}px ${p(q)[16]}px`, marginBottom: `${p(q)[16]}px` })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: p(te).danger })
          }, [
            (a(!0), n(j, null, Y(he.value, (y) => (a(), n("li", {
              key: y.message
            }, k(y.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        Ae.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({ background: p(te).neutral.bg, border: `1px solid ${p(te).neutral.border}`, borderRadius: `${p(Se).input}px`, padding: `${p(q)[12]}px ${p(q)[16]}px`, marginBottom: `${p(q)[16]}px`, fontSize: "0.875rem", color: p(te).neutral.textMuted })
        }, [
          e("strong", {
            style: se({ display: "block", marginBottom: `${p(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Cn, [
            (a(!0), n(j, null, Y(Ae.value, (y) => (a(), n("li", {
              key: y.message
            }, k(y.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", Sn, [
        e("aside", In, [
          s.disabledSections.includes("message") ? _("", !0) : (a(), n("div", Un, [
            !p(M).message.title && !p(M).message.body ? (a(), n("div", Rn, " Add a title and message below to get started. ")) : _("", !0),
            e("div", Ln, [
              m[13] || (m[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", An, [
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
                  (a(!0), n(j, null, Y(p(nt), (y) => (a(), n("option", {
                    key: y.id,
                    value: y.id
                  }, k(y.label), 9, Bn))), 128))
                ], 32)
              ])
            ]),
            ye(Bs, {
              message: p(M).message,
              "title-count": ue.value,
              "body-count": z.value,
              "title-limit": D.value,
              "body-limit": K.value,
              "selected-platform": c.value,
              "show-reset": !0,
              "title-error": H.value,
              "body-error": X.value,
              onUpdate: p(oe),
              onReset: m[1] || (m[1] = (y) => p(ie)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            ye(yt, {
              message: p(M).message,
              "variable-options": s.variableOptions,
              onUpdate: p(oe),
              onInsertVariable: G
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !s.designOnly && !s.disabledSections.includes("delivery") ? (a(), n("div", Tn, [
            m[14] || (m[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            ye(fa, {
              delivery: p(M).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: p(ce),
              onReset: m[2] || (m[2] = (y) => p(me)())
            }, null, 8, ["delivery", "onUpdate"]),
            ye(Ia, {
              delivery: p(M).delivery,
              onUpdate: p(ce)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : _("", !0)
        ]),
        e("main", Pn, [
          !s.designOnly && p(M).audience.test_mode ? (a(), n("div", Vn, [...m[15] || (m[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", En, [
            e("div", On, [
              e("label", Mn, [
                m[17] || (m[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": m[3] || (m[3] = (y) => g.value = y),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  m[16] || (m[16] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(p(Ee), (y) => (a(), n("option", {
                    key: y.id,
                    value: y.id
                  }, k(y.label), 9, Nn))), 128))
                ], 512), [
                  [Me, g.value]
                ])
              ])
            ]),
            e("div", Dn, [
              (a(), n(j, null, Y(["android", "ios", "web"], (y) => e("button", {
                key: y,
                type: "button",
                class: ve(["kb-push-device-btn", { "kb-push-device-btn--active": c.value === y }]),
                role: "tab",
                "aria-selected": c.value === y,
                "aria-controls": `kb-preview-panel-${y}`,
                onClick: (N) => c.value = y
              }, k(y.toUpperCase()), 11, zn)), 64))
            ]),
            e("div", Wn, [
              !p(M).message.title && !p(M).message.body ? (a(), n("div", Hn, [...m[18] || (m[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, "Start adding content to see a live preview here.", -1)
              ])])) : (a(), Ct(bn, {
                key: 1,
                "get-preview": p(L),
                "selected-platform": c.value,
                "preview-profile": I.value,
                "onUpdate:selectedPlatform": m[4] || (m[4] = (y) => c.value = y)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", Fn, [
        !s.designOnly && s.showHistory ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: m[5] || (m[5] = (y) => v.value = !0)
        }, " Version history ")) : _("", !0),
        !s.designOnly && s.showSaveVersion ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: m[6] || (m[6] = (y) => i("save-version", JSON.parse(JSON.stringify(p(M)))))
        }, " Save as version ")) : _("", !0),
        s.showDuplicate ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: m[7] || (m[7] = (y) => i("duplicate", JSON.parse(JSON.stringify(p(M)))))
        }, " Duplicate ")) : _("", !0),
        s.showSave ? (a(), n("button", {
          key: 3,
          type: "button",
          class: "kb-push-action kb-push-action--secondary",
          onClick: Z
        }, " Save ")) : _("", !0),
        s.showClose ? (a(), n("button", {
          key: 4,
          type: "button",
          class: "kb-push-action kb-push-action--primary",
          onClick: m[8] || (m[8] = (y) => i("edit"))
        }, " Close ")) : _("", !0)
      ]),
      $.value ? (a(), n("div", jn, [
        e("div", qn, [
          m[19] || (m[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          m[20] || (m[20] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Kn, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: m[9] || (m[9] = (y) => {
                $.value = !1, d.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: m[10] || (m[10] = (y) => d.value && A(d.value))
            }, "Replace")
          ])
        ])
      ])) : _("", !0),
      ye(ft, {
        open: v.value,
        versions: s.versions,
        onClose: m[11] || (m[11] = (y) => v.value = !1),
        onRestore: U
      }, null, 8, ["open", "versions"])
    ]));
  }
}), kt = /* @__PURE__ */ be(Yn, [["__scopeId", "data-v-11b2a325"]]), Jn = { class: "kb-section" }, Gn = { class: "kb-section__head" }, Qn = { class: "kb-field" }, Xn = ["value"], Zn = { class: "kb-field" }, el = ["value"], tl = {
  key: 0,
  class: "kb-field"
}, sl = ["value"], al = {
  key: 1,
  class: "kb-field"
}, nl = ["value"], ll = {
  key: 2,
  class: "kb-field kb-field--inline"
}, ol = { class: "kb-location-row" }, il = ["value"], rl = ["value"], dl = ["value"], ul = ["value"], cl = {
  key: 3,
  class: "kb-field"
}, pl = ["value"], ml = {
  key: 4,
  class: "kb-field"
}, vl = ["value"], bl = {
  key: 5,
  class: "kb-field"
}, gl = { class: "kb-wa-buttons" }, yl = ["value", "onInput"], fl = ["value", "onInput"], kl = ["onClick"], hl = {
  key: 6,
  class: "kb-field"
}, _l = ["value"], $l = ["value"], wl = { class: "kb-field" }, xl = ["value"], Cl = { class: "kb-field" }, Sl = ["value"], Il = {
  key: 7,
  class: "kb-field kb-wa-template-fields"
}, Ul = { class: "kb-wa-fields-list" }, Rl = { class: "kb-wa-field-name" }, Ll = { class: "kb-wa-field-status" }, Al = { class: "kb-field" }, Bl = ["value"], Tl = { class: "kb-field" }, Pl = { class: "kb-wa-buttons" }, Vl = ["value", "onInput"], El = ["value", "onChange"], Ol = ["value", "onInput"], Ml = ["value", "onInput"], Nl = ["onClick"], Dl = ["disabled"], zl = /* @__PURE__ */ re({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: r }) {
    const o = s, i = r;
    function c($) {
      if (!$ || typeof $ != "string") return [];
      const d = /\{\{\s*([^}]+?)\s*\}\}/g, v = /* @__PURE__ */ new Set();
      let x;
      for (; (x = d.exec($)) !== null; ) v.add(x[1].trim());
      return Array.from(v);
    }
    const g = C(() => {
      const $ = o.message.header ?? "", d = o.message.body ?? o.message.body ?? "", v = new Set(o.message.variables ?? []), x = [...c($), ...c(d)];
      return Array.from(new Set(x)).map((A) => ({ name: A, configured: v.has(A) }));
    });
    return ($, d) => {
      var v, x, I, A;
      return a(), n("section", Jn, [
        e("div", Gn, [
          d[18] || (d[18] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: d[0] || (d[0] = (f) => $.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        d[37] || (d[37] = e("p", { class: "kb-section__desc" }, " Configure how this campaign will look when sent as a WhatsApp template message. ", -1)),
        e("div", Qn, [
          d[20] || (d[20] = e("label", { class: "kb-label" }, [
            ee(" Template type "),
            e("span", { class: "kb-helper" }, "Match the content type approved in WhatsApp (text, media, coupon, offer, catalog, etc.).")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: o.message.template_type ?? "text",
            onChange: d[1] || (d[1] = (f) => i("update", {
              template_type: f.target.value
            }))
          }, [...d[19] || (d[19] = [
            Ne('<option value="text" data-v-b3ddb55c>Text</option><option value="image" data-v-b3ddb55c>Image</option><option value="video" data-v-b3ddb55c>Video</option><option value="document" data-v-b3ddb55c>Document</option><option value="location" data-v-b3ddb55c>Location</option><option value="coupon" data-v-b3ddb55c>Coupon code</option><option value="lto" data-v-b3ddb55c>Limited time offer</option><option value="mpm" data-v-b3ddb55c>Multi product message</option><option value="catalog" data-v-b3ddb55c>Catalog</option><option value="auth" data-v-b3ddb55c>Authentication</option>', 10)
          ])], 40, Xn)
        ]),
        e("div", Zn, [
          d[21] || (d[21] = e("label", { class: "kb-label" }, [
            ee(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: o.message.template_name ?? "",
            onInput: d[2] || (d[2] = (f) => i("update", {
              template_name: f.target.value || void 0
            }))
          }, null, 40, el)
        ]),
        ["image", "video", "document"].includes(o.message.template_type ?? "text") ? (a(), n("div", tl, [
          d[22] || (d[22] = e("label", { class: "kb-label" }, [
            ee(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: o.message.media_url ?? "",
            onInput: d[3] || (d[3] = (f) => i("update", {
              media_url: f.target.value || void 0
            }))
          }, null, 40, sl)
        ])) : _("", !0),
        ["image", "video", "document"].includes(o.message.template_type ?? "text") ? (a(), n("div", al, [
          d[23] || (d[23] = e("label", { class: "kb-label" }, [
            ee(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: o.message.media_caption ?? "",
            onInput: d[4] || (d[4] = (f) => i("update", {
              media_caption: f.target.value || void 0
            }))
          }, null, 40, nl)
        ])) : _("", !0),
        o.message.template_type === "location" ? (a(), n("div", ll, [
          d[24] || (d[24] = e("label", { class: "kb-label" }, [
            ee(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", ol, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((v = o.message.location) == null ? void 0 : v.lat) ?? "",
              onInput: d[5] || (d[5] = (f) => {
                const U = { ...o.message.location ?? {} };
                U.lat = Number(f.target.value), i("update", { location: U });
              })
            }, null, 40, il),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((x = o.message.location) == null ? void 0 : x.lon) ?? "",
              onInput: d[6] || (d[6] = (f) => {
                const U = { ...o.message.location ?? {} };
                U.lon = Number(f.target.value), i("update", { location: U });
              })
            }, null, 40, rl)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((I = o.message.location) == null ? void 0 : I.name) ?? "",
            onInput: d[7] || (d[7] = (f) => {
              const U = { ...o.message.location ?? {} };
              U.name = f.target.value || void 0, i("update", { location: U });
            })
          }, null, 40, dl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((A = o.message.location) == null ? void 0 : A.address) ?? "",
            onInput: d[8] || (d[8] = (f) => {
              const U = { ...o.message.location ?? {} };
              U.address = f.target.value || void 0, i("update", { location: U });
            })
          }, null, 40, ul)
        ])) : _("", !0),
        o.message.template_type === "coupon" ? (a(), n("div", cl, [
          d[25] || (d[25] = e("label", { class: "kb-label" }, [
            ee(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: o.message.coupon_code ?? "",
            onInput: d[9] || (d[9] = (f) => i("update", {
              coupon_code: f.target.value || void 0
            }))
          }, null, 40, pl)
        ])) : _("", !0),
        o.message.template_type === "lto" ? (a(), n("div", ml, [
          d[26] || (d[26] = e("label", { class: "kb-label" }, [
            ee(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: o.message.lto_expiry ?? "",
            onInput: d[10] || (d[10] = (f) => i("update", {
              lto_expiry: f.target.value || void 0
            }))
          }, null, 40, vl)
        ])) : _("", !0),
        ["mpm", "catalog"].includes(o.message.template_type) ? (a(), n("div", bl, [
          d[27] || (d[27] = e("label", { class: "kb-label" }, [
            ee(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", gl, [
            (a(!0), n(j, null, Y(o.message.products ?? [], (f, U) => (a(), n("div", {
              key: f.id || U,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: f.productId,
                onInput: (M) => {
                  var E;
                  const W = [...o.message.products ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `prod_${R + 1}`,
                    productId: M.target.value
                  }, i("update", { products: W });
                }
              }, null, 40, yl),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: f.sectionTitle,
                onInput: (M) => {
                  var E;
                  const W = [...o.message.products ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `prod_${R + 1}`,
                    sectionTitle: M.target.value || void 0
                  }, i("update", { products: W });
                }
              }, null, 40, fl),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const M = [...o.message.products ?? []];
                  M.splice(Number(U), 1), i("update", { products: M });
                }
              }, " Remove ", 8, kl)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: d[11] || (d[11] = () => {
                const U = [...o.message.products ?? []];
                U.push({
                  id: `prod_${U.length + 1}`,
                  productId: ""
                }), i("update", { products: U });
              })
            }, " Add product ")
          ])
        ])) : _("", !0),
        o.message.template_type === "auth" ? (a(), n("div", hl, [
          d[29] || (d[29] = e("label", { class: "kb-label" }, [
            ee(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: o.message.auth_type ?? "otp",
            onChange: d[12] || (d[12] = (f) => i("update", {
              auth_type: f.target.value
            }))
          }, [...d[28] || (d[28] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, _l),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: o.message.auth_label ?? "",
            onInput: d[13] || (d[13] = (f) => i("update", {
              auth_label: f.target.value || void 0
            }))
          }, null, 40, $l)
        ])) : _("", !0),
        e("div", wl, [
          d[30] || (d[30] = e("label", { class: "kb-label" }, [
            ee(" Header (optional) "),
            e("span", { class: "kb-helper" }, "Short text or variable used as the WhatsApp template header.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: o.message.header ?? "",
            onInput: d[14] || (d[14] = (f) => i("update", {
              header: f.target.value || void 0
            }))
          }, null, 40, xl)
        ]),
        e("div", Cl, [
          d[31] || (d[31] = e("label", { class: "kb-label" }, [
            ee(" Body "),
            e("span", { class: "kb-helper" }, " Use the exact template body including variables like " + k(1) + ", " + k(2) + " as approved in WhatsApp. ")
          ], -1)),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: o.message.body ?? "",
            onInput: d[15] || (d[15] = (f) => i("update", {
              body: f.target.value || void 0
            }))
          }, null, 40, Sl)
        ]),
        g.value.length > 0 ? (a(), n("div", Il, [
          d[32] || (d[32] = e("label", { class: "kb-label" }, "Template fields", -1)),
          d[33] || (d[33] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", Ul, [
            (a(!0), n(j, null, Y(g.value, (f) => (a(), n("li", {
              key: f.name,
              class: ve(["kb-wa-field-item", { "kb-wa-field-item--ok": f.configured }])
            }, [
              e("span", Rl, k(f.name), 1),
              e("span", Ll, k(f.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : _("", !0),
        e("div", Al, [
          d[34] || (d[34] = e("label", { class: "kb-label" }, [
            ee(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: o.message.footer ?? "",
            onInput: d[16] || (d[16] = (f) => i("update", {
              footer: f.target.value || void 0
            }))
          }, null, 40, Bl)
        ]),
        e("div", Tl, [
          d[36] || (d[36] = e("label", { class: "kb-label" }, [
            ee(" Buttons (optional) "),
            e("span", { class: "kb-helper" }, " Add quick replies or call-to-action buttons. Order should match your provider configuration. ")
          ], -1)),
          e("div", Pl, [
            (a(!0), n(j, null, Y(o.message.buttons ?? [], (f, U) => (a(), n("div", {
              key: f.id || U,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: f.label,
                onInput: (M) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    label: M.target.value
                  }, i("update", { buttons: W });
                }
              }, null, 40, Vl),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: f.type ?? "quick_reply",
                onChange: (M) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    type: M.target.value
                  }, i("update", { buttons: W });
                }
              }, [...d[35] || (d[35] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1)
              ])], 40, El),
              f.type === "url" ? (a(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: f.url,
                onInput: (M) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    url: M.target.value || void 0
                  }, i("update", { buttons: W });
                }
              }, null, 40, Ol)) : f.type === "call" ? (a(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: f.phone,
                onInput: (M) => {
                  var E;
                  const W = [...o.message.buttons ?? []], R = Number(U);
                  W[R] = {
                    ...W[R],
                    id: ((E = W[R]) == null ? void 0 : E.id) || `btn_${R + 1}`,
                    phone: M.target.value || void 0
                  }, i("update", { buttons: W });
                }
              }, null, 40, Ml)) : _("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: () => {
                  const M = [...o.message.buttons ?? []];
                  M.splice(Number(U), 1), i("update", { buttons: M });
                }
              }, " Remove ", 8, Nl)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: (o.message.buttons ?? []).length >= 3,
              onClick: d[17] || (d[17] = () => {
                const U = [...o.message.buttons ?? []];
                U.push({
                  id: `btn_${U.length + 1}`,
                  label: "",
                  type: "quick_reply"
                }), i("update", { buttons: U });
              })
            }, " Add button ", 8, Dl)
          ])
        ])
      ]);
    };
  }
}), Wl = /* @__PURE__ */ be(zl, [["__scopeId", "data-v-b3ddb55c"]]), Hl = { class: "phone-theme-toggle" }, Fl = { class: "chat-area" }, jl = { class: "bubble" }, ql = {
  key: 0,
  class: "header"
}, Kl = {
  key: 0,
  class: "header-text"
}, Yl = ["src"], Jl = ["src"], Gl = {
  key: 3,
  class: "document"
}, Ql = ["innerHTML"], Xl = {
  key: 1,
  class: "location-card"
}, Zl = ["src"], eo = { class: "location-info" }, to = {
  key: 2,
  class: "catalog-card"
}, so = { class: "catalog-header" }, ao = { class: "catalog-title" }, no = {
  key: 3,
  class: "multi-products"
}, lo = ["src"], oo = { class: "product-info" }, io = { class: "title" }, ro = { class: "price" }, uo = {
  key: 4,
  class: "coupon"
}, co = { class: "coupon-code" }, po = {
  key: 5,
  class: "offer"
}, mo = {
  key: 6,
  class: "auth"
}, vo = { class: "auth-code" }, bo = {
  key: 7,
  class: "footer"
}, go = {
  key: 8,
  class: "buttons"
}, yo = /* @__PURE__ */ re({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(s) {
    const r = s, o = Q("light"), i = C(() => o.value === "dark");
    function c(d) {
      return String(d).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const g = C(() => {
      var x;
      const d = ((x = r.template) == null ? void 0 : x.body) ?? "";
      return c(d).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), $ = C(() => {
      const d = r.template.location;
      if (!d) return "";
      const { lat: v, lng: x } = d;
      return v == null || x == null ? "" : `https://maps.googleapis.com/maps/api/staticmap?center=${v},${x}&zoom=15&size=600x300&markers=${v},${x}`;
    });
    return (d, v) => {
      var x, I;
      return a(), n("div", {
        class: ve(["wa-wrapper", { "wa-wrapper--dark": i.value }])
      }, [
        e("div", {
          class: ve(["phone", { "phone--dark": i.value }])
        }, [
          e("div", Hl, [
            e("button", {
              type: "button",
              class: ve(["phone-theme-btn", { "phone-theme-btn--active": !i.value }]),
              onClick: v[0] || (v[0] = (A) => o.value = "light")
            }, " Light ", 2),
            e("button", {
              type: "button",
              class: ve(["phone-theme-btn", { "phone-theme-btn--active": i.value }]),
              onClick: v[1] || (v[1] = (A) => o.value = "dark")
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
          e("div", Fl, [
            e("div", jl, [
              s.template.header ? (a(), n("div", ql, [
                s.template.header.type === "text" ? (a(), n("div", Kl, k(s.template.header.text), 1)) : s.template.header.type === "image" ? (a(), n("img", {
                  key: 1,
                  src: s.template.header.url,
                  class: "media",
                  alt: ""
                }, null, 8, Yl)) : s.template.header.type === "video" ? (a(), n("video", {
                  key: 2,
                  src: s.template.header.url,
                  controls: "",
                  class: "media"
                }, null, 8, Jl)) : s.template.header.type === "document" ? (a(), n("div", Gl, " 📄 " + k(s.template.header.filename), 1)) : _("", !0)
              ])) : _("", !0),
              e("div", {
                class: "body",
                innerHTML: g.value
              }, null, 8, Ql),
              s.template.location ? (a(), n("div", Xl, [
                $.value ? (a(), n("img", {
                  key: 0,
                  src: $.value,
                  class: "map",
                  alt: ""
                }, null, 8, Zl)) : _("", !0),
                e("div", eo, [
                  e("strong", null, k(s.template.location.name), 1),
                  e("div", null, k(s.template.location.address), 1)
                ])
              ])) : _("", !0),
              s.template.catalog ? (a(), n("div", to, [
                e("div", so, [
                  v[2] || (v[2] = ee(" 🛍 ", -1)),
                  e("span", ao, k(typeof s.template.catalog == "object" && s.template.catalog.label ? s.template.catalog.label : "Full catalog"), 1)
                ]),
                v[3] || (v[3] = e("div", { class: "catalog-sub" }, "Browse all items", -1)),
                v[4] || (v[4] = e("div", { class: "catalog-cta" }, "VIEW CATALOG", -1))
              ])) : _("", !0),
              (x = s.template.multiProduct) != null && x.length ? (a(), n("div", no, [
                (a(!0), n(j, null, Y(s.template.multiProduct, (A, f) => (a(), n("div", {
                  key: f,
                  class: "product"
                }, [
                  A.image ? (a(), n("img", {
                    key: 0,
                    src: A.image,
                    alt: ""
                  }, null, 8, lo)) : _("", !0),
                  e("div", oo, [
                    e("div", io, k(A.name), 1),
                    e("div", ro, k(A.price), 1)
                  ])
                ]))), 128))
              ])) : _("", !0),
              s.template.coupon ? (a(), n("div", uo, [
                v[6] || (v[6] = e("div", { class: "coupon-discount" }, "Special offer", -1)),
                e("div", co, [
                  v[5] || (v[5] = ee(" Code: ", -1)),
                  e("span", null, k(s.template.coupon.code), 1)
                ]),
                v[7] || (v[7] = e("div", { class: "coupon-cta" }, "COPY CODE", -1))
              ])) : _("", !0),
              s.template.limitedOffer ? (a(), n("div", po, " ⏳ Offer expires " + k(s.template.limitedOffer), 1)) : _("", !0),
              s.template.auth ? (a(), n("div", mo, [
                v[8] || (v[8] = e("div", { class: "auth-icon" }, "🔐", -1)),
                v[9] || (v[9] = e("div", { class: "auth-title" }, "Confirm your phone number", -1)),
                e("div", vo, k(s.template.auth.code), 1),
                v[10] || (v[10] = e("button", {
                  type: "button",
                  class: "auth-btn"
                }, "CONTINUE", -1))
              ])) : _("", !0),
              s.template.footer ? (a(), n("div", bo, k(s.template.footer), 1)) : _("", !0),
              (I = s.template.buttons) != null && I.length ? (a(), n("div", go, [
                (a(!0), n(j, null, Y(s.template.buttons, (A, f) => (a(), n("button", {
                  key: f,
                  type: "button",
                  class: "button"
                }, k(A.text), 1))), 128))
              ])) : _("", !0),
              v[11] || (v[11] = e("div", { class: "time" }, " 12:45 ✓✓ ", -1))
            ])
          ])
        ], 2)
      ], 2);
    };
  }
}), fo = /* @__PURE__ */ be(yo, [["__scopeId", "data-v-76cc6100"]]), ko = { class: "keos-whatsapp-builder" }, ho = { class: "kb-builder-top" }, _o = { style: { margin: 0, paddingLeft: "1.25rem" } }, $o = { class: "kb-wa-layout" }, wo = { class: "kb-wa-sidebar" }, xo = {
  key: 0,
  class: "kb-wa-form"
}, Co = { class: "kb-wa-form-head" }, So = { class: "kb-wa-form-head-row" }, Io = ["value"], Uo = { class: "kb-wa-canvas" }, Ro = {
  key: 0,
  class: "kb-wa-test-banner"
}, Lo = { class: "kb-wa-preview-chrome" }, Ao = { class: "kb-push-preview-controls" }, Bo = { class: "kb-push-preview-as" }, To = ["value"], Po = { class: "kb-wa-preview-frame" }, Vo = { class: "kb-wa-actions" }, Eo = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Oo = { class: "kb-confirm-dialog" }, Mo = { class: "kb-confirm-actions" }, No = /* @__PURE__ */ re({
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
    const o = s, i = r, {
      campaign: c,
      dirty: g,
      customValidatorErrors: $,
      getValidationWithWarnings: d,
      update: v,
      updateMessage: x,
      undo: I,
      redo: A,
      canUndo: f,
      canRedo: U,
      resetMessage: M,
      hooks: W
    } = Fe({
      initial: o.modelValue,
      hooks: {
        ...o.hooks,
        customValidators: async (B) => {
          var ue, z;
          const D = [];
          (ue = B.name) != null && ue.trim() || D.push("Template name is required");
          const K = (z = o.hooks) != null && z.customValidators ? await o.hooks.customValidators(B) : [];
          return [...D, ...K];
        }
      },
      onDirty: () => i("change", c.value)
    }), { lastSavedAt: R } = je(c, { channel: "whatsapp" });
    function E(B) {
      (B.metaKey || B.ctrlKey) && B.key === "z" && (B.preventDefault(), B.shiftKey ? A() : I());
    }
    De(() => {
      window.addEventListener("keydown", E);
    }), ze(() => {
      window.removeEventListener("keydown", E);
    }), _e(
      c,
      (B) => i("update:modelValue", B),
      { deep: !0 }
    );
    const P = Q(), oe = Q(!0);
    async function ce() {
      if (W.estimateReach)
        try {
          P.value = await W.estimateReach(c.value.audience);
        } catch {
          P.value = void 0;
        }
      W.canSend && (oe.value = await Promise.resolve(W.canSend()));
    }
    ce(), _e(() => c.value.audience, ce, { deep: !0 });
    const de = C(() => ($.value, d(P.value))), pe = C(() => de.value.blockingErrors), ge = C(() => de.value.warnings), $e = C(() => de.value.valid), ie = Q(""), me = Q(!1), L = Q(null), ae = C(() => {
      const B = ie.value;
      return B ? Ee.find((D) => D.id === B) ?? null : null;
    }), ne = C(() => {
      const B = c.value.message.body ?? "";
      return ae.value ? Pe(B, ae.value.data) : B;
    }), w = C(() => {
      const B = c.value.message.header ?? "";
      return ae.value ? Pe(B, ae.value.data) : B;
    }), fe = C(() => {
      const B = c.value.message, D = B.template_type ?? "text";
      let K, ue, z, H, X, xe, F;
      D === "image" && B.media_url ? K = { type: "image", url: B.media_url } : D === "video" && B.media_url ? K = { type: "video", url: B.media_url } : D === "document" && B.document_filename ? K = { type: "document", filename: B.document_filename } : B.header && (K = { type: "text", text: w.value });
      const h = ne.value || "Start adding content to see a live preview here.";
      if (D === "location" && B.location) {
        const Z = B.location, S = Z.lat ?? Z.latitude, m = Z.lng ?? Z.lon ?? Z.longitude;
        S != null && m != null && (ue = {
          lat: S,
          lng: m,
          name: Z.name ?? Z.title,
          address: Z.address ?? `${S}, ${m}`
        });
      }
      (D === "catalog" || D === "mpm") && Array.isArray(B.products) && B.products.length && (z = !0, H = B.products.map((Z) => ({
        image: Z.image ?? Z.imageUrl,
        name: Z.name ?? Z.sectionTitle ?? Z.title ?? "Product",
        price: Z.price ?? Z.productId ?? ""
      }))), D === "coupon" && B.coupon_code && (X = { code: B.coupon_code }), D === "lto" && B.lto_expiry && (xe = B.lto_expiry), D === "auth" && (F = { code: B.auth_code ?? B.otp_code ?? "123 456" });
      const G = B.buttons ?? [];
      return {
        header: K,
        body: h,
        footer: B.footer || void 0,
        buttons: G.map((Z) => ({ text: Z.label || "Button" })),
        location: ue,
        catalog: z,
        multiProduct: H,
        coupon: X,
        limitedOffer: xe,
        auth: F
      };
    });
    function ke(B) {
      const D = c.value, K = B.campaign.message ? { ...D.message, ...B.campaign.message } : D.message;
      v({
        ...B.campaign,
        message: K
      }), L.value = null, me.value = !1;
    }
    function Be(B) {
      const D = B.target.value;
      if (!D) return;
      const K = lt.find((ue) => ue.id === D);
      K && (g.value ? (L.value = K, me.value = !0) : ke(K), B.target.value = "");
    }
    const Le = C(() => c.value.template_type ?? "transactional");
    function Ie(B) {
      v({ template_type: B });
    }
    function we(B) {
      v({
        name: B,
        tracking: { ...c.value.tracking ?? {}, campaign_name: B }
      });
    }
    function he(B) {
      const D = ` {{ ${B.variable} }}`, K = c.value.message.variables ?? [], ue = Array.from(/* @__PURE__ */ new Set([...K, B.variable]));
      if (B.field === "title") {
        const z = c.value.message.header ?? "";
        x(
          {
            variables: ue
          }
        ), c.value.message.header = z + D;
      } else {
        const z = c.value.message.body ?? "";
        x(
          {
            variables: ue
          }
        ), c.value.message.body = z + D;
      }
    }
    function Ae() {
      $e.value && i("save", c.value);
    }
    return (B, D) => (a(), n("div", ko, [
      e("div", ho, [
        ye(qe, {
          "campaign-name": p(c).name,
          status: p(c).status,
          dirty: p(g),
          "last-saved-at": p(R),
          "can-undo": p(f),
          "can-redo": p(U),
          "onUpdate:campaignName": we,
          onUndo: p(I),
          onRedo: p(A)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({ background: p(te).dangerBg, border: `1px solid ${p(te).dangerBorder}`, borderRadius: `${p(Se).input}px`, padding: `${p(q)[12]}px ${p(q)[16]}px`, marginBottom: `${p(q)[16]}px` })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: p(te).danger })
          }, [
            (a(!0), n(j, null, Y(pe.value, (K) => (a(), n("li", {
              key: K.message
            }, k(K.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        ge.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({ background: p(te).neutral.bg, border: `1px solid ${p(te).neutral.border}`, borderRadius: `${p(Se).input}px`, padding: `${p(q)[12]}px ${p(q)[16]}px`, marginBottom: `${p(q)[16]}px`, fontSize: "0.875rem", color: p(te).neutral.textMuted })
        }, [
          e("strong", {
            style: se({ display: "block", marginBottom: `${p(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", _o, [
            (a(!0), n(j, null, Y(ge.value, (K) => (a(), n("li", {
              key: K.message
            }, k(K.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", $o, [
        e("aside", wo, [
          s.disabledSections.includes("whatsapp") ? _("", !0) : (a(), n("div", xo, [
            e("div", Co, [
              D[7] || (D[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", So, [
                ye(Ke, {
                  "template-type": Le.value,
                  onUpdate: Ie
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: Be
                }, [
                  D[6] || (D[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(p(lt), (K) => (a(), n("option", {
                    key: K.id,
                    value: K.id
                  }, k(K.label), 9, Io))), 128))
                ], 32)
              ])
            ]),
            ye(Wl, {
              message: p(c).message,
              "show-reset": !0,
              onUpdate: p(x),
              onReset: D[0] || (D[0] = (K) => p(M)())
            }, null, 8, ["message", "onUpdate"]),
            ye(yt, {
              message: p(c).message,
              "variable-options": s.variableOptions,
              onUpdate: p(x),
              onInsertVariable: he
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Uo, [
          !s.designOnly && p(c).audience.test_mode ? (a(), n("div", Ro, [...D[8] || (D[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Lo, [
            e("div", Ao, [
              e("label", Bo, [
                D[10] || (D[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": D[1] || (D[1] = (K) => ie.value = K),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  D[9] || (D[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(p(Ee), (K) => (a(), n("option", {
                    key: K.id,
                    value: K.id
                  }, k(K.label), 9, To))), 128))
                ], 512), [
                  [Me, ie.value]
                ])
              ])
            ]),
            e("div", Po, [
              ye(fo, { template: fe.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", Vo, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: D[2] || (D[2] = (K) => i("duplicate", JSON.parse(JSON.stringify(p(c)))))
        }, " Duplicate ")) : _("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-wa-action kb-wa-action--secondary",
          onClick: Ae
        }, " Save ")) : _("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-wa-action kb-wa-action--primary",
          onClick: D[3] || (D[3] = (K) => i("edit"))
        }, " Close ")) : _("", !0)
      ]),
      me.value ? (a(), n("div", Eo, [
        e("div", Oo, [
          D[11] || (D[11] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          D[12] || (D[12] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Mo, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: D[4] || (D[4] = (K) => {
                me.value = !1, L.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: D[5] || (D[5] = (K) => L.value && ke(L.value))
            }, "Replace")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ be(No, [["__scopeId", "data-v-85513d7b"]]), Do = { class: "kb-section" }, zo = { class: "kb-section__head" }, Wo = { class: "kb-field" }, Ho = ["value"], Fo = { class: "kb-field" }, jo = { class: "kb-label" }, qo = { key: 0 }, Ko = { key: 1 }, Yo = { key: 2 }, Jo = ["value"], Go = {
  key: 0,
  class: "kb-truncation-hint"
}, Qo = { class: "kb-field" }, Xo = { class: "kb-insert-row" }, Zo = ["value"], ei = { class: "kb-field" }, ti = { class: "kb-insert-row" }, si = /* @__PURE__ */ re({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: r }) {
    const o = s, i = r, c = ["first_name", "last_name", "order_id", "city"], g = Q(o.variableOptions && o.variableOptions.length ? [...o.variableOptions] : c), $ = Q(g.value[0] ?? c[0]), d = Q("");
    _e(
      () => o.variableOptions,
      (R) => {
        R && R.length && (g.value = [...R], g.value.includes($.value) || ($.value = g.value[0]));
      }
    );
    const v = C(() => o.message.body ?? ""), x = C(() => v.value.length), I = C(() => x.value ? x.value <= 160 ? 1 : Math.ceil(x.value / 153) : 0), A = C(() => {
      const R = x.value;
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
    function M() {
      const R = $.value;
      if (!R) return;
      const E = ` {{ ${R} }}`, P = v.value || "", oe = o.message.variables ?? [], ce = Array.from(/* @__PURE__ */ new Set([...oe, R]));
      i("update", {
        body: P + E,
        variables: ce
      });
    }
    function W() {
      const R = d.value.trim();
      R && (g.value.includes(R) || (g.value = [...g.value, R]), $.value = R, d.value = "");
    }
    return (R, E) => (a(), n("section", Do, [
      e("div", zo, [
        E[3] || (E[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        s.showReset ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: E[0] || (E[0] = (P) => R.$emit("reset"))
        }, " Reset section ")) : _("", !0)
      ]),
      E[10] || (E[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Wo, [
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
        }, null, 40, Ho)
      ]),
      e("div", Fo, [
        e("label", jo, [
          E[5] || (E[5] = ee(" Message body ", -1)),
          e("span", {
            class: ve(["kb-counter", { "kb-counter--warn": I.value > 3 }])
          }, [
            ee(k(x.value) + " chars · ", 1),
            I.value === 0 ? (a(), n("span", qo, "0 segments")) : I.value === 1 ? (a(), n("span", Ko, "1 segment")) : (a(), n("span", Yo, k(I.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: v.value,
          onInput: U
        }, null, 40, Jo),
        E[6] || (E[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        A.value ? (a(), n("p", Go, k(A.value), 1)) : _("", !0)
      ]),
      e("div", Qo, [
        E[7] || (E[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Xo, [
          Re(e("select", {
            "onUpdate:modelValue": E[1] || (E[1] = (P) => $.value = P),
            class: "kb-select"
          }, [
            (a(!0), n(j, null, Y(g.value, (P) => (a(), n("option", {
              key: P,
              value: P
            }, k(P), 9, Zo))), 128))
          ], 512), [
            [Me, $.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: M
          }, " Insert into message ")
        ]),
        E[8] || (E[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", ei, [
        E[9] || (E[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", ti, [
          Re(e("input", {
            "onUpdate:modelValue": E[2] || (E[2] = (P) => d.value = P),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [Ge, d.value]
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
}), ai = /* @__PURE__ */ be(si, [["__scopeId", "data-v-5e9aa8e6"]]), ni = { class: "keos-sms-builder" }, li = { class: "kb-builder-top" }, oi = { style: { margin: 0, paddingLeft: "1.25rem" } }, ii = { class: "kb-sms-layout" }, ri = { class: "kb-sms-sidebar" }, di = {
  key: 0,
  class: "kb-sms-form"
}, ui = { class: "kb-sms-form-head" }, ci = { class: "kb-wa-form-head-row" }, pi = ["value"], mi = { class: "kb-sms-canvas" }, vi = {
  key: 0,
  class: "kb-sms-test-banner"
}, bi = { class: "kb-sms-preview-chrome" }, gi = { class: "kb-push-preview-controls" }, yi = { class: "kb-push-preview-as" }, fi = ["value"], ki = { class: "kb-sms-preview-frame" }, hi = { class: "kb-preview" }, _i = { class: "kb-sms-preview" }, $i = { class: "kb-sms-phone" }, wi = { class: "kb-sms-header" }, xi = { class: "kb-sms-sender" }, Ci = { class: "kb-sms-thread" }, Si = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, Ii = { class: "kb-sms-text" }, Ui = { class: "kb-sms-counter" }, Ri = { key: 0 }, Li = { key: 1 }, Ai = { key: 2 }, Bi = {
  key: 3,
  class: "kb-sms-cost"
}, Ti = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Pi = { class: "kb-sms-actions" }, Vi = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Ei = { class: "kb-confirm-dialog" }, Oi = { class: "kb-confirm-actions" }, Mi = /* @__PURE__ */ re({
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
    const o = s, i = r, {
      campaign: c,
      dirty: g,
      customValidatorErrors: $,
      getValidationWithWarnings: d,
      update: v,
      updateMessage: x,
      undo: I,
      redo: A,
      canUndo: f,
      canRedo: U,
      resetMessage: M,
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
      onDirty: () => i("change", c.value)
    }), { lastSavedAt: R } = je(c, { channel: "sms" });
    function E(z) {
      (z.metaKey || z.ctrlKey) && z.key === "z" && (z.preventDefault(), z.shiftKey ? A() : I());
    }
    De(() => {
      window.addEventListener("keydown", E);
    }), ze(() => {
      window.removeEventListener("keydown", E);
    }), _e(
      c,
      (z) => i("update:modelValue", z),
      { deep: !0 }
    );
    const P = Q(), oe = Q(!0);
    async function ce() {
      if (W.estimateReach)
        try {
          P.value = await W.estimateReach(c.value.audience);
        } catch {
          P.value = void 0;
        }
      W.canSend && (oe.value = await Promise.resolve(W.canSend()));
    }
    ce(), _e(() => c.value.audience, ce, { deep: !0 });
    const de = C(() => ($.value, d(P.value))), pe = C(() => de.value.blockingErrors), ge = C(() => de.value.warnings), $e = C(() => de.value.valid), ie = C(() => c.value.template_type ?? "transactional"), me = Q(""), L = Q(!1), ae = Q(null), ne = C(() => {
      const z = me.value;
      return z ? Ee.find((H) => H.id === z) ?? null : null;
    }), w = C(() => {
      const z = Ie.value;
      return ne.value ? Pe(z, ne.value.data) : z;
    });
    function fe(z) {
      const H = c.value, X = z.campaign.message ? { ...H.message, ...z.campaign.message } : H.message;
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
    function Be(z) {
      v({ template_type: z });
    }
    function Le(z) {
      v({
        name: z,
        tracking: { ...c.value.tracking ?? {}, campaign_name: z }
      });
    }
    const Ie = C(() => (c.value.message.body ?? "") || ""), we = C(() => Ie.value.length), he = C(() => we.value ? we.value <= 160 ? 1 : Math.ceil(we.value / 153) : 0), Ae = C(() => {
      const z = w.value;
      return z.trim().length ? z : "Your SMS message preview will appear here.";
    }), B = C(() => {
      const z = o.costPerSegment ?? 0;
      return !z || he.value === 0 ? null : (he.value * z).toFixed(2);
    }), D = C(() => {
      const z = we.value;
      return z <= 160 ? null : z <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), K = C(
      () => c.value.message.sender_id ?? "YourBrand"
    );
    function ue() {
      $e.value && i("save", c.value);
    }
    return (z, H) => (a(), n("div", ni, [
      e("div", li, [
        ye(qe, {
          "campaign-name": p(c).name,
          status: p(c).status,
          dirty: p(g),
          "last-saved-at": p(R),
          "can-undo": p(f),
          "can-redo": p(U),
          "onUpdate:campaignName": Le,
          onUndo: p(I),
          onRedo: p(A)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        pe.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({
            background: p(te).dangerBg,
            border: `1px solid ${p(te).dangerBorder}`,
            borderRadius: `${p(Se).input}px`,
            padding: `${p(q)[12]}px ${p(q)[16]}px`,
            marginBottom: `${p(q)[16]}px`
          })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: p(te).danger })
          }, [
            (a(!0), n(j, null, Y(pe.value, (X) => (a(), n("li", {
              key: X.message
            }, k(X.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        ge.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({
            background: p(te).neutral.bg,
            border: `1px solid ${p(te).neutral.border}`,
            borderRadius: `${p(Se).input}px`,
            padding: `${p(q)[12]}px ${p(q)[16]}px`,
            marginBottom: `${p(q)[16]}px`,
            fontSize: "0.875rem",
            color: p(te).neutral.textMuted
          })
        }, [
          e("strong", {
            style: se({ display: "block", marginBottom: `${p(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", oi, [
            (a(!0), n(j, null, Y(ge.value, (X) => (a(), n("li", {
              key: X.message
            }, k(X.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", ii, [
        e("aside", ri, [
          s.disabledSections.includes("sms") ? _("", !0) : (a(), n("div", di, [
            e("div", ui, [
              H[7] || (H[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", ci, [
                ye(Ke, {
                  "template-type": ie.value,
                  onUpdate: Be
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  H[6] || (H[6] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(p(ot), (X) => (a(), n("option", {
                    key: X.id,
                    value: X.id
                  }, k(X.label), 9, pi))), 128))
                ], 32)
              ])
            ]),
            ye(ai, {
              message: p(c).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: p(x),
              onReset: H[0] || (H[0] = (X) => p(M)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", mi, [
          !s.designOnly && p(c).audience.test_mode ? (a(), n("div", vi, [...H[8] || (H[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", bi, [
            e("div", gi, [
              e("label", yi, [
                H[10] || (H[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": H[1] || (H[1] = (X) => me.value = X),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  H[9] || (H[9] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(p(Ee), (X) => (a(), n("option", {
                    key: X.id,
                    value: X.id
                  }, k(X.label), 9, fi))), 128))
                ], 512), [
                  [Me, me.value]
                ])
              ])
            ]),
            e("div", ki, [
              e("div", hi, [
                e("div", _i, [
                  e("div", $i, [
                    H[13] || (H[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", wi, [
                      e("div", xi, k(K.value), 1),
                      H[11] || (H[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", Ci, [
                      e("div", Si, [
                        e("span", Ii, k(Ae.value), 1),
                        H[12] || (H[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", Ui, [
                    ee(k(we.value) + " characters · ", 1),
                    he.value === 0 ? (a(), n("span", Ri, "0 segments")) : he.value === 1 ? (a(), n("span", Li, "1 segment")) : (a(), n("span", Ai, k(he.value) + " segments", 1)),
                    H[14] || (H[14] = ee(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    B.value !== null ? (a(), n("span", Bi, " · Est. " + k(B.value), 1)) : _("", !0)
                  ]),
                  D.value ? (a(), n("p", Ti, k(D.value), 1)) : _("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", Pi, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: H[2] || (H[2] = (X) => i("duplicate", JSON.parse(JSON.stringify(p(c)))))
        }, " Duplicate ")) : _("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-sms-action kb-sms-action--secondary",
          onClick: ue
        }, " Save ")) : _("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-sms-action kb-sms-action--primary",
          onClick: H[3] || (H[3] = (X) => i("edit"))
        }, " Close ")) : _("", !0)
      ]),
      L.value ? (a(), n("div", Vi, [
        e("div", Ei, [
          H[15] || (H[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          H[16] || (H[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", Oi, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: H[4] || (H[4] = (X) => {
                L.value = !1, ae.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: H[5] || (H[5] = (X) => ae.value && fe(ae.value))
            }, "Replace")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), _t = /* @__PURE__ */ be(Mi, [["__scopeId", "data-v-edeb9be3"]]), Ni = 30, Di = 60, zi = 130;
function Wi(s) {
  const r = (s ?? "").trim().length;
  return r < Ni ? "too_short" : r <= Di ? "good" : "too_long";
}
function Hi(s) {
  const r = (s ?? "").trim().length;
  return r === 0 ? "too_short" : r <= zi ? "good" : "too_long";
}
const Fi = [
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
  const r = [];
  for (const o of Fi) {
    const i = s.match(o);
    i && r.push(i[0]);
  }
  return r;
}
function ji(s) {
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
function qi(s) {
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
const Ki = { class: "em-section" }, Yi = { class: "em-strip" }, Ji = { class: "em-strip-head" }, Gi = { class: "em-field" }, Qi = ["value"], Xi = { class: "em-field" }, Zi = ["value"], er = { class: "em-field" }, tr = ["value"], sr = { class: "em-field" }, ar = { class: "em-input-group" }, nr = ["value"], lr = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, or = { class: "em-field" }, ir = { class: "em-input-group" }, rr = ["value"], dr = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, ur = { class: "em-strip em-strip--library" }, cr = { class: "em-library-chips" }, pr = ["onClick"], mr = { class: "em-strip em-strip--blocks" }, vr = { class: "em-block-list" }, br = ["data-type"], gr = { class: "em-block-bar" }, yr = { class: "em-block-type" }, fr = { class: "em-block-actions" }, kr = ["disabled", "onClick"], hr = ["disabled", "onClick"], _r = ["onClick"], $r = {
  key: 0,
  class: "em-block-fields"
}, wr = ["value", "onChange"], xr = ["value", "onInput"], Cr = ["onClick"], Sr = {
  key: 1,
  class: "em-block-fields"
}, Ir = ["value", "onInput"], Ur = ["onClick"], Rr = {
  key: 2,
  class: "em-block-fields"
}, Lr = ["value", "onInput"], Ar = ["value", "onInput"], Br = ["value", "onInput"], Tr = {
  key: 3,
  class: "em-block-fields"
}, Pr = ["value", "onInput"], Vr = ["value", "onInput"], Er = { class: "em-block-fields--row" }, Or = ["value", "onInput"], Mr = { class: "em-check-row" }, Nr = ["checked", "onChange"], Dr = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, zr = ["value", "onInput"], Wr = {
  key: 5,
  class: "em-block-fields"
}, Hr = ["value", "onInput"], Fr = ["value", "onInput"], jr = ["value", "onInput"], qr = ["onClick"], Kr = {
  key: 6,
  class: "em-block-fields"
}, Yr = ["value", "onChange"], Jr = { class: "em-list-items" }, Gr = ["value", "onInput", "placeholder"], Qr = ["onClick"], Xr = ["onClick"], Zr = {
  key: 7,
  class: "em-block-fields"
}, ed = ["value", "onChange"], td = ["value", "onInput"], sd = ["onClick"], ad = {
  key: 8,
  class: "em-block-fields"
}, nd = { class: "em-social-links" }, ld = ["value", "onChange"], od = ["value", "onInput"], id = ["onClick"], rd = ["onClick"], dd = {
  key: 9,
  class: "em-block-fields"
}, ud = ["value", "onInput"], cd = ["value", "onInput"], pd = ["value", "onInput"], md = {
  key: 10,
  class: "em-block-fields"
}, vd = ["value", "onInput"], bd = { class: "em-link-list-items" }, gd = ["value", "onInput"], yd = ["value", "onInput"], fd = ["onClick"], kd = ["onClick"], hd = {
  key: 11,
  class: "em-block-fields"
}, _d = ["value", "onInput"], $d = ["onClick"], wd = ["value", "onInput"], xd = ["onClick"], Cd = {
  key: 12,
  class: "em-block-fields"
}, Sd = { class: "em-block-fields--row" }, Id = ["value", "onInput"], Ud = { class: "em-block-fields--row" }, Rd = ["value", "onInput"], Ld = ["value", "onChange"], Ad = {
  key: 13,
  class: "em-block-fields"
}, Bd = ["value", "onChange"], Td = { class: "em-inline-label" }, Pd = ["value", "onInput"], Vd = ["onClick"], Ed = {
  key: 14,
  class: "em-block-fields"
}, Od = ["value", "onInput"], Md = { class: "em-link-list-items" }, Nd = ["value", "onInput"], Dd = ["value", "onInput"], zd = ["onClick"], Wd = ["onClick"], Hd = {
  key: 15,
  class: "em-block-fields"
}, Fd = ["value", "onInput"], jd = ["value", "onInput"], qd = ["onClick"], Kd = ["onClick"], Yd = {
  key: 16,
  class: "em-block-fields"
}, Jd = ["value", "onInput"], Gd = ["value", "onInput"], Qd = ["value", "onInput"], Xd = ["onClick"], Zd = ["onClick"], eu = {
  key: 17,
  class: "em-block-fields"
}, tu = ["value", "onInput"], su = ["value", "onInput"], au = {
  key: 18,
  class: "em-block-fields"
}, nu = ["value", "onInput"], lu = ["value", "onInput"], ou = ["value", "onInput"], iu = ["value", "onInput"], ru = ["value", "onInput"], du = {
  key: 19,
  class: "em-block-fields"
}, uu = ["value", "onInput"], cu = ["onClick"], pu = {
  key: 20,
  class: "em-block-fields"
}, mu = ["value", "onInput"], vu = ["value", "onInput"], bu = ["onClick"], gu = {
  key: 21,
  class: "em-block-fields"
}, yu = ["value", "onInput"], fu = { class: "em-block-fields--row" }, ku = ["value", "onInput"], hu = {
  key: 22,
  class: "em-block-fields"
}, _u = ["value", "onInput"], $u = ["value", "onInput"], wu = ["value", "onInput"], xu = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, Cu = ["value", "onChange"], Su = { class: "em-check-row" }, Iu = ["checked", "onChange"], Uu = { class: "em-add-bar" }, Ru = { class: "em-add-bar-btns" }, Lu = { class: "em-strip em-strip--personalize" }, Au = { class: "em-field" }, Bu = { class: "em-input-group" }, Tu = ["value"], Pu = { class: "em-field" }, Vu = { class: "em-input-group" }, Ue = "{{ var }}", Eu = /* @__PURE__ */ re({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(s, { emit: r }) {
    var le;
    function o() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const i = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], c = [
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
    const $ = s, d = r, v = ["first_name", "last_name", "order_id", "city", "email"], x = Q(
      (le = $.variableOptions) != null && le.length ? [...$.variableOptions] : v
    ), I = Q(x.value[0] ?? "first_name"), A = Q("");
    _e(
      () => $.variableOptions,
      (b) => {
        b != null && b.length && (x.value = [...b], x.value.includes(I.value) || (I.value = x.value[0]));
      }
    );
    const f = C(() => $.message.subject ?? ""), U = C(() => $.message.preview_text ?? ""), M = C(() => Wi(f.value)), W = C(() => Hi(U.value)), R = C(() => rt(f.value)), E = C(() => rt(U.value)), P = C(() => {
      const b = $.message.blocks;
      return Array.isArray(b) && b.length > 0 ? b : [g("paragraph")];
    });
    _e(
      () => $.message.blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && d("update", { blocks: [g("paragraph")] });
      },
      { immediate: !0 }
    );
    function oe(b) {
      d("update", { blocks: b });
    }
    function ce(b) {
      d("update", { subject: b.target.value });
    }
    function de(b) {
      const l = b.target.value;
      d("update", { preview_text: l || void 0 });
    }
    function pe(b) {
      d("update", { from_name: b.target.value || void 0 });
    }
    function ge(b) {
      d("update", { from_address: b.target.value || void 0 });
    }
    function $e(b) {
      d("update", { reply_to: b.target.value || void 0 });
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
      const t = P.value.findIndex((T) => T.id === b);
      if (t < 0) return;
      const O = l === "up" ? t - 1 : t + 1;
      if (O < 0 || O >= P.value.length) return;
      const u = [...P.value];
      [u[t], u[O]] = [u[O], u[t]], oe(u);
    }
    function w(b, l) {
      const t = P.value.map((O) => O.id === b ? { ...O, ...l } : O);
      oe(t);
    }
    function fe(b, l, t) {
      const O = P.value.find((T) => T.id === b);
      if (!O || O.type !== "list") return;
      const u = [...O.items || []];
      u[l] = t, w(b, { items: u });
    }
    function ke(b) {
      const l = P.value.find((t) => t.id === b);
      !l || l.type !== "list" || w(b, { items: [...l.items || [], "New item"] });
    }
    function Be(b, l) {
      const t = P.value.find((u) => u.id === b);
      if (!t || t.type !== "list") return;
      const O = (t.items || []).filter((u, T) => T !== l);
      w(b, { items: O });
    }
    function Le(b, l, t, O) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "social") return;
      const T = (u.links || []).map((V, Ce) => Ce === l ? { ...V, [t]: O } : V);
      w(b, { links: T });
    }
    function Ie(b) {
      const l = P.value.find((t) => t.id === b);
      !l || l.type !== "social" || w(b, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function we(b, l) {
      const t = P.value.find((u) => u.id === b);
      if (!t || t.type !== "social") return;
      const O = (t.links || []).filter((u, T) => T !== l);
      w(b, { links: O });
    }
    function he(b, l, t, O) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "link_list") return;
      const T = (u.links || []).map((V, Ce) => Ce === l ? { ...V, [t]: O } : V);
      w(b, { links: T });
    }
    function Ae(b) {
      const l = P.value.find((t) => t.id === b);
      !l || l.type !== "link_list" || w(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function B(b, l) {
      const t = P.value.find((u) => u.id === b);
      if (!t || t.type !== "link_list") return;
      const O = (t.links || []).filter((u, T) => T !== l);
      w(b, { links: O });
    }
    function D(b, l) {
      const t = P.value.find((Oe) => Oe.id === b);
      if (!t || t.type !== "columns") return;
      const O = ` {{ ${I.value} }}`, u = $.message.variables ?? [], T = Array.from(/* @__PURE__ */ new Set([...u, I.value])), V = l === "left" ? "leftContent" : "rightContent", Ye = (t[V] ?? "") + O;
      w(b, { [V]: Ye }), d("update", { variables: T });
    }
    function K(b, l) {
      const t = P.value.find((O) => O.id === b);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const O = [...t.cells || []];
          for (; O.length < l.columnCount; ) O.push("Cell content");
          l.cells = O.slice(0, l.columnCount);
        }
        w(b, l);
      }
    }
    function ue(b, l, t) {
      const O = P.value.find((T) => T.id === b);
      if (!O || O.type !== "row") return;
      const u = [...O.cells || []];
      u[l] = t, w(b, { cells: u });
    }
    function z(b, l, t, O) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "navbar") return;
      const T = (u.links || []).map((V, Ce) => Ce === l ? { ...V, [t]: O } : V);
      w(b, { links: T });
    }
    function H(b) {
      const l = P.value.find((t) => t.id === b);
      !l || l.type !== "navbar" || w(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function X(b, l) {
      const t = P.value.find((O) => O.id === b);
      !t || t.type !== "navbar" || w(b, { links: (t.links || []).filter((O, u) => u !== l) });
    }
    function xe(b, l, t, O) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "accordion") return;
      const T = (u.items || []).map((V, Ce) => Ce === l ? { ...V, [t]: O } : V);
      w(b, { items: T });
    }
    function F(b) {
      const l = P.value.find((t) => t.id === b);
      !l || l.type !== "accordion" || w(b, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function h(b, l) {
      const t = P.value.find((O) => O.id === b);
      !t || t.type !== "accordion" || w(b, { items: (t.items || []).filter((O, u) => u !== l) });
    }
    function G(b, l, t, O) {
      const u = P.value.find((V) => V.id === b);
      if (!u || u.type !== "carousel") return;
      const T = (u.slides || []).map((V, Ce) => Ce === l ? { ...V, [t]: O } : V);
      w(b, { slides: T });
    }
    function Z(b) {
      const l = P.value.find((t) => t.id === b);
      !l || l.type !== "carousel" || w(b, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function S(b, l) {
      const t = P.value.find((O) => O.id === b);
      !t || t.type !== "carousel" || w(b, { slides: (t.slides || []).filter((O, u) => u !== l) });
    }
    function m(b) {
      const l = ` {{ ${I.value} }}`, t = $.message.variables ?? [], O = Array.from(/* @__PURE__ */ new Set([...t, I.value]));
      b === "subject" ? d("update", {
        subject: (f.value || "") + l,
        variables: O
      }) : d("update", {
        preview_text: (U.value || "") + l,
        variables: O
      });
    }
    function y(b) {
      const l = P.value.find((Oe) => Oe.id === b);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const t = ` {{ ${I.value} }}`, O = $.message.variables ?? [], u = Array.from(/* @__PURE__ */ new Set([...O, I.value])), T = (l.type === "footer", "content"), Ce = (l[T] ?? "") + t, Ye = P.value.map(
        (Oe) => Oe.id === b ? { ...Oe, [T]: Ce } : Oe
      );
      d("update", { blocks: Ye, variables: u });
    }
    function N(b, l) {
      const t = P.value.find((Ce) => Ce.id === b);
      if (!t || t.type !== "row") return;
      const O = ` {{ ${I.value} }}`, u = $.message.variables ?? [], T = Array.from(/* @__PURE__ */ new Set([...u, I.value])), V = [...t.cells || []];
      V[l] = (V[l] || "") + O, w(b, { cells: V }), d("update", { variables: T });
    }
    function J() {
      const b = A.value.trim();
      !b || x.value.includes(b) || (x.value = [...x.value, b], I.value = b, A.value = "");
    }
    return (b, l) => (a(), n("section", Ki, [
      e("div", Yi, [
        e("div", Ji, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          s.showReset ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => b.$emit("reset"))
          }, " Reset section ")) : _("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", Gi, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: s.message.from_name ?? "",
            onInput: pe
          }, null, 40, Qi)
        ]),
        e("div", Xi, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: s.message.from_address ?? "",
            onInput: ge
          }, null, 40, Zi)
        ]),
        e("div", er, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            ee("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: s.message.reply_to ?? "",
            onInput: $e
          }, null, 40, tr)
        ]),
        e("div", sr, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", ar, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: f.value,
              onInput: ce
            }, null, 40, nr),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (t) => m("subject")),
              title: "Insert variable"
            }, k(Ue))
          ]),
          e("span", {
            class: ve(["em-analyzer", `em-analyzer--${M.value}`])
          }, k(p(ji)(M.value)), 3),
          R.value.length ? (a(), n("span", lr, "Spammy: " + k(R.value.join(", ")), 1)) : _("", !0)
        ]),
        e("div", or, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            ee("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", ir, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: U.value,
              onInput: de
            }, null, 40, rr),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (t) => m("preview")),
              title: "Insert variable"
            }, k(Ue))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ve(["em-analyzer", `em-analyzer--${W.value}`])
          }, k(p(qi)(W.value)), 3),
          E.value.length ? (a(), n("span", dr, "Spammy: " + k(E.value.join(", ")), 1)) : _("", !0)
        ])
      ]),
      e("div", ur, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", cr, [
          (a(), n(j, null, Y(ie, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (O) => me(t)
          }, k(t.label), 9, pr)), 64))
        ])
      ]),
      e("div", mr, [
        l[63] || (l[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[64] || (l[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", vr, [
          (a(!0), n(j, null, Y(P.value, (t, O) => (a(), n("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", gr, [
              e("span", yr, k(t.type), 1),
              e("div", fr, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: O === 0,
                  onClick: (u) => ne(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, kr),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: O === P.value.length - 1,
                  onClick: (u) => ne(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, hr),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (u) => ae(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, _r)
              ])
            ]),
            t.type === "heading" ? (a(), n("div", $r, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (u) => w(t.id, { level: Number(u.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, wr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (u) => w(t.id, { content: u.target.value }),
                placeholder: "Heading text"
              }, null, 40, xr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(t.id)
              }, k(Ue), 8, Cr)
            ])) : t.type === "paragraph" ? (a(), n("div", Sr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => w(t.id, { content: u.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Ir),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(t.id)
              }, k(Ue), 8, Ur)
            ])) : t.type === "image" ? (a(), n("div", Rr, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (u) => w(t.id, { src: u.target.value }),
                placeholder: "Image URL"
              }, null, 40, Lr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => w(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, Ar),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (u) => w(t.id, { linkUrl: u.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Br)
            ])) : t.type === "button" ? (a(), n("div", Tr, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (u) => w(t.id, { text: u.target.value }),
                placeholder: "Button text"
              }, null, 40, Pr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (u) => w(t.id, { url: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, Vr),
              e("div", Er, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (u) => w(t.id, { borderRadius: Number(u.target.value) || 0 })
                }, null, 40, Or)
              ]),
              e("label", Mr, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (u) => w(t.id, { ghost: u.target.checked })
                }, null, 40, Nr),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), n("div", Dr, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (u) => w(t.id, { height: Number(u.target.value) || 24 })
              }, null, 40, zr),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), n("div", Wr, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => w(t.id, { content: u.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Hr),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (u) => w(t.id, { unsubscribeUrl: u.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Fr),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (u) => w(t.id, { companyAddress: u.target.value }),
                placeholder: "Company address"
              }, null, 40, jr),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(t.id)
              }, k(Ue), 8, qr)
            ])) : t.type === "list" ? (a(), n("div", Kr, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (u) => w(t.id, { style: u.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Yr),
              e("div", Jr, [
                (a(!0), n(j, null, Y(t.items || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u,
                    onInput: (V) => fe(t.id, T, V.target.value),
                    placeholder: `Item ${T + 1}`
                  }, null, 40, Gr),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => Be(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Qr)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => ke(t.id)
              }, "+ Add item", 8, Xr)
            ])) : t.type === "quote" ? (a(), n("div", Zr, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (u) => w(t.id, { style: u.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, ed),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => w(t.id, { content: u.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, td),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(t.id)
              }, k(Ue), 8, sd)
            ])) : t.type === "social" ? (a(), n("div", ad, [
              e("div", nd, [
                (a(!0), n(j, null, Y(t.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: u.platform,
                    class: "em-select em-select--sm",
                    onChange: (V) => Le(t.id, T, "platform", V.target.value)
                  }, [...l[45] || (l[45] = [
                    Ne('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, ld),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (V) => Le(t.id, T, "url", V.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, od),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => we(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, id)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Ie(t.id)
              }, "+ Add link", 8, rd)
            ])) : t.type === "video" ? (a(), n("div", dd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (u) => w(t.id, { thumbnailUrl: u.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, ud),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (u) => w(t.id, { videoUrl: u.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, cd),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => w(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, pd)
            ])) : t.type === "link_list" ? (a(), n("div", md, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => w(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, vd),
              e("div", bd, [
                (a(!0), n(j, null, Y(t.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (V) => he(t.id, T, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, gd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (V) => he(t.id, T, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, yd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => B(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, fd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Ae(t.id)
              }, "+ Add link", 8, kd)
            ])) : t.type === "columns" ? (a(), n("div", hd, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (u) => w(t.id, { leftContent: u.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, _d),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => D(t.id, "left")
              }, k(Ue), 8, $d),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (u) => w(t.id, { rightContent: u.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, wd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => D(t.id, "right")
              }, k(Ue), 8, xd)
            ])) : t.type === "divider" ? (a(), n("div", Cd, [
              e("div", Sd, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (u) => w(t.id, { thickness: Number(u.target.value) || 1 })
                }, null, 40, Id),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", Ud, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (u) => w(t.id, { color: u.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Rd)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (u) => w(t.id, { lineStyle: u.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Ld)
            ])) : t.type === "row" ? (a(), n("div", Ad, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (u) => K(t.id, { columnCount: Number(u.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Bd),
              (a(!0), n(j, null, Y(t.cells || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-row-cell"
              }, [
                e("label", Td, "Column " + k(T + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u,
                  onInput: (V) => ue(t.id, T, V.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Pd),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (V) => N(t.id, T)
                }, k(Ue), 8, Vd)
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), n("div", Ed, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (u) => w(t.id, { separator: u.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Od),
              e("div", Md, [
                (a(!0), n(j, null, Y(t.links || [], (u, T) => (a(), n("div", {
                  key: T,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: u.text,
                    onInput: (V) => z(t.id, T, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, Nd),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: u.url,
                    onInput: (V) => z(t.id, T, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, Dd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => X(t.id, T),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, zd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => H(t.id)
              }, "+ Add link", 8, Wd)
            ])) : t.type === "accordion" ? (a(), n("div", Hd, [
              (a(!0), n(j, null, Y(t.items || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.title,
                  onInput: (V) => xe(t.id, T, "title", V.target.value),
                  placeholder: "Section title"
                }, null, 40, Fd),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: u.content,
                  onInput: (V) => xe(t.id, T, "content", V.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, jd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => h(t.id, T),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, qd)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => F(t.id)
              }, "+ Add section", 8, Kd)
            ])) : t.type === "carousel" ? (a(), n("div", Yd, [
              (a(!0), n(j, null, Y(t.slides || [], (u, T) => (a(), n("div", {
                key: T,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.imageUrl,
                  onInput: (V) => G(t.id, T, "imageUrl", V.target.value),
                  placeholder: "Image URL"
                }, null, 40, Jd),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: u.alt,
                  onInput: (V) => G(t.id, T, "alt", V.target.value),
                  placeholder: "Alt text"
                }, null, 40, Gd),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: u.linkUrl,
                  onInput: (V) => G(t.id, T, "linkUrl", V.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Qd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => S(t.id, T),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Xd)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (u) => Z(t.id)
              }, "+ Add slide", 8, Zd)
            ])) : t.type === "countdown" ? (a(), n("div", eu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (u) => w(t.id, { label: u.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, tu),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (u) => w(t.id, { endDateTime: u.target.value ? new Date(u.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, su),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), n("div", au, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => w(t.id, { imageUrl: u.target.value }),
                placeholder: "Product image URL"
              }, null, 40, nu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (u) => w(t.id, { title: u.target.value }),
                placeholder: "Product title"
              }, null, 40, lu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (u) => w(t.id, { price: u.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, ou),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (u) => w(t.id, { buttonText: u.target.value }),
                placeholder: "Button text"
              }, null, 40, iu),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (u) => w(t.id, { buttonUrl: u.target.value }),
                placeholder: "Button URL"
              }, null, 40, ru)
            ])) : t.type === "liquid" ? (a(), n("div", du, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => w(t.id, { content: u.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, uu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(t.id)
              }, k(Ue), 8, cu),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), n("div", pu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (u) => w(t.id, { caption: u.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, mu),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (u) => w(t.id, { content: u.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, vu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (u) => y(t.id)
              }, k(Ue), 8, bu),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), n("div", gu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (u) => w(t.id, { feedUrl: u.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, yu),
              e("div", fu, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (u) => w(t.id, { maxItems: Number(u.target.value) || 5 })
                }, null, 40, ku)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), n("div", hu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (u) => w(t.id, { imageUrl: u.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, _u),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (u) => w(t.id, { alt: u.target.value }),
                placeholder: "Alt text"
              }, null, 40, $u),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (u) => w(t.id, { fallbackUrl: u.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, wu)
            ])) : _("", !0),
            c.includes(t.type) ? (a(), n("div", xu, [
              l[61] || (l[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: t.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (u) => w(t.id, { alignment: u.target.value })
              }, [...l[59] || (l[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, Cu),
              e("label", Su, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (u) => w(t.id, { fullWidth: u.target.checked })
                }, null, 40, Iu),
                l[60] || (l[60] = e("span", null, "Full width", -1))
              ])
            ])) : _("", !0)
          ], 8, br))), 128))
        ]),
        e("div", Uu, [
          l[62] || (l[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Ru, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (t) => L("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (t) => L("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (t) => L("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (t) => L("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (t) => L("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (t) => L("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (t) => L("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (t) => L("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (t) => L("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (t) => L("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (t) => L("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (t) => L("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (t) => L("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (t) => L("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (t) => L("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (t) => L("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (t) => L("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (t) => L("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (t) => L("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (t) => L("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (t) => L("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (t) => L("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (t) => L("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Lu, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Au, [
          l[65] || (l[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Bu, [
            Re(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => I.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), n(j, null, Y(x.value, (t) => (a(), n("option", {
                key: t,
                value: t
              }, k(t), 9, Tu))), 128))
            ], 512), [
              [Me, I.value]
            ])
          ])
        ]),
        e("div", Pu, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Vu, [
            Re(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => A.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [Ge, A.value]
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
}), Ou = /* @__PURE__ */ be(Eu, [["__scopeId", "data-v-c4398c5d"]]), Mu = { class: "keos-email-builder" }, Nu = { class: "kb-builder-top" }, Du = { style: { margin: 0, paddingLeft: "1.25rem" } }, zu = { class: "kb-email-layout" }, Wu = { class: "kb-email-sidebar" }, Hu = {
  key: 0,
  class: "kb-email-form"
}, Fu = { class: "kb-email-form-head" }, ju = { class: "kb-wa-form-head-row" }, qu = ["value"], Ku = { class: "kb-email-canvas" }, Yu = {
  key: 0,
  class: "kb-email-test-banner"
}, Ju = { class: "kb-email-preview-chrome" }, Gu = { class: "kb-push-preview-controls" }, Qu = { class: "kb-push-preview-as" }, Xu = ["value"], Zu = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, ec = { class: "kb-email-inbox-strip" }, tc = { class: "kb-email-inbox-from" }, sc = { class: "kb-email-inbox-from-name" }, ac = { class: "kb-email-inbox-from-addr" }, nc = { class: "kb-email-inbox-subject" }, lc = ["title"], oc = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, ic = { class: "kb-email-body-canvas" }, rc = ["innerHTML"], dc = { class: "kb-email-actions" }, uc = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, cc = { class: "kb-confirm-dialog" }, pc = { class: "kb-confirm-actions" }, mc = /* @__PURE__ */ re({
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
    function o(F) {
      if (!Array.isArray(F) || F.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const h = (m) => String(m).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), G = ["heading", "paragraph", "image", "button", "divider", "spacer", "footer", "quote", "list", "social", "video", "link_list"], Z = (m, y) => {
        if (!G.includes(y.type)) return m;
        const N = y.alignment || "left", J = !!y.fullWidth;
        return `<div style="text-align:${N};${J ? "width:100%;" : ""}">${m}</div>`;
      }, S = [];
      for (const m of F)
        switch (m.type) {
          case "heading": {
            const y = Math.min(3, Math.max(1, Number(m.level) || 1)), N = h(m.content || "").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            S.push(Z(`<h${y} style="margin:0 0 12px;font-size:${y === 1 ? "22" : y === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${N || "Heading"}</h${y}>`, m));
            break;
          }
          case "paragraph": {
            const y = h(m.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            S.push(Z(`<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${y || "Paragraph"}</p>`, m));
            break;
          }
          case "image": {
            const y = (m.src || "").trim(), N = h(m.alt || ""), J = (m.linkUrl || "").trim(), b = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", l = y ? `<img src="${h(y)}" alt="${N}" style="${b}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            S.push(
              Z(`<div style="margin:0 0 12px;">${J ? `<a href="${h(J)}" style="color:#2563eb;">${l}</a>` : l}</div>`, m)
            );
            break;
          }
          case "button": {
            const y = h(m.text || "Button"), N = (m.url || "#").trim(), J = Math.min(24, Math.max(0, Number(m.borderRadius) ?? 8)), le = !!m.fullWidth, b = !!m.ghost, l = b ? "transparent" : "#0f172a", t = b ? "#0f172a" : "#fff", O = b ? "2px solid #0f172a" : "none", u = le ? "block" : "inline-block", T = le ? "100%" : "auto";
            S.push(
              Z(`<p style="margin:0 0 12px;"><a href="${h(N)}" style="display:${u};width:${T};text-align:center;padding:12px 24px;background:${l};color:${t};border:${O};text-decoration:none;font-size:14px;font-weight:600;border-radius:${J}px;">${y}</a></p>`, m)
            );
            break;
          }
          case "divider": {
            const y = Math.min(8, Math.max(1, Number(m.thickness) || 1)), N = (m.color || "#e2e8f0").trim() || "#e2e8f0", J = m.lineStyle || "solid";
            S.push(
              Z(`<hr style="margin:16px 0;border:0;border-top:${y}px ${J} ${N};" />`, m)
            );
            break;
          }
          case "spacer": {
            const y = Math.min(120, Math.max(8, Number(m.height) || 24));
            S.push(Z(`<div style="height:${y}px;"></div>`, m));
            break;
          }
          case "footer": {
            const y = h(m.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), N = (m.unsubscribeUrl || "").trim(), J = h(m.companyAddress || "");
            S.push(
              Z(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${y || "Footer"}` + (N ? `<p style="margin:8px 0 0;"><a href="${h(N)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (J ? `<p style="margin:4px 0 0;">${J}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "list": {
            const y = m.style === "numbered" ? "ol" : "ul", J = (Array.isArray(m.items) ? m.items : []).map(
              (le) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${h(String(le)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            S.push(Z(`<${y} style="margin:0 0 12px;padding-left:24px;">${J || "<li>Item</li>"}</${y}>`, m));
            break;
          }
          case "quote": {
            const y = h(m.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), N = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, J = N[m.style || "default"] || N.default;
            S.push(
              Z(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${J}font-size:14px;line-height:1.6;">${y || "Quote"}</div>`,
                m
              )
            );
            break;
          }
          case "social": {
            const N = (Array.isArray(m.links) ? m.links : []).filter((J) => (J.url || "").trim());
            if (N.length === 0)
              S.push(
                Z('<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>', m)
              );
            else {
              const J = (le) => `<a href="${h((le.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${h(le.platform || "Link")}</a>`;
              S.push(Z(`<div style="margin:0 0 12px;">${N.map(J).join("")}</div>`, m));
            }
            break;
          }
          case "video": {
            const y = (m.thumbnailUrl || "").trim(), N = (m.videoUrl || "#").trim(), J = h(m.caption || ""), b = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", l = y ? `<img src="${h(y)}" alt="Video" style="${b}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            S.push(
              Z(
                `<div style="margin:0 0 12px;"><a href="${h(N)}" style="display:block;color:inherit;">${l}</a>` + (J ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${J}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "link_list": {
            const y = Array.isArray(m.links) ? m.links : [], N = h(m.separator || " | "), le = y.filter((b) => (b.text || b.url) && (b.url || "").trim()).map(
              (b) => `<a href="${h((b.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${h(b.text || "Link")}</a>`
            );
            S.push(
              Z(`<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${le.join(N)}</p>`, m)
            );
            break;
          }
          case "columns": {
            const y = h(m.leftContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), N = h(m.rightContent || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
            S.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${y || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${N || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const y = Math.min(4, Math.max(1, Number(m.columnCount) || 2)), N = Array.isArray(m.cells) ? m.cells.slice(0, y) : [], J = 100 / y, le = Array.from({ length: y }, (b, l) => {
              const t = N[l] ?? "", O = h(t).replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<td width="${J}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${O || "—"}</td>`;
            }).join("");
            S.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${le}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const y = Array.isArray(m.links) ? m.links : [], N = h(m.separator || " | "), le = y.filter((b) => (b.text || b.url) && (b.url || "").trim()).map(
              (b) => `<a href="${h((b.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${h(b.text || "Link")}</a>`
            );
            S.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${le.length ? le.join(N) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const N = (Array.isArray(m.items) ? m.items : []).map((J) => {
              const le = h(J.title || "Section"), b = h(J.content || "").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>');
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${le}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${b}</div></details>`;
            }).join("");
            S.push(N ? `<div style="margin:0 0 12px;">${N}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>');
            break;
          }
          case "carousel": {
            const N = (Array.isArray(m.slides) ? m.slides : []).filter((J) => (J.imageUrl || "").trim());
            if (N.length === 0)
              S.push('<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>');
            else {
              const J = N[0], le = `<img src="${h(J.imageUrl)}" alt="${h(J.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, b = (J.linkUrl || "").trim();
              S.push(
                `<div style="margin:0 0 12px;">${b ? `<a href="${h(b)}">${le}</a>` : le}` + (N.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${N.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const y = h(m.label || "Offer ends in"), N = m.endDateTime ? new Date(m.endDateTime).toLocaleString() : "—";
            S.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${y}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${N}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const y = (m.imageUrl || "").trim(), N = h(m.title || "Product"), J = h(m.price || ""), le = h(m.buttonText || "Buy now"), b = (m.buttonUrl || "#").trim(), l = y ? `<img src="${h(y)}" alt="${h(m.alt || N)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            S.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${l}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${N}</p>` + (J ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${J}</p>` : "") + `<a href="${h(b)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${le}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const y = h((m.content || "").trim());
            S.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${y || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const y = (m.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>'), N = h((m.caption || "").trim());
            S.push(
              '<div style="margin:0 0 12px;">' + (N ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${N}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${y || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const y = (m.feedUrl || "").trim(), N = Math.min(20, Math.max(1, Number(m.maxItems) ?? 5));
            S.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (y ? `<p style="margin:0;font-size:12px;color:#64748b;">${h(y)} · max ${N} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const y = (m.imageUrl || "").trim(), N = (m.fallbackUrl || "").trim(), J = h(m.alt || "Dynamic image");
            y ? S.push(
              `<div style="margin:0 0 12px;"><img src="${h(y)}" alt="${J}" style="max-width:100%;height:auto;display:block;border:0;" />` + (N ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${h(N)}</p>` : "") + "</div>"
            ) : S.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return S.join("");
    }
    const i = s, c = r, {
      campaign: g,
      dirty: $,
      customValidatorErrors: d,
      getValidationWithWarnings: v,
      update: x,
      updateMessage: I,
      undo: A,
      redo: f,
      canUndo: U,
      canRedo: M,
      resetMessage: W,
      hooks: R
    } = Fe({
      initial: i.modelValue,
      hooks: {
        ...i.hooks,
        customValidators: async (F) => {
          var S, m, y;
          const h = [];
          (S = F.name) != null && S.trim() || h.push("Template name is required");
          const G = F.message;
          (m = G == null ? void 0 : G.subject) != null && m.trim() || h.push("Subject is required");
          const Z = (y = i.hooks) != null && y.customValidators ? await i.hooks.customValidators(F) : [];
          return [...h, ...Z];
        }
      },
      onDirty: () => c("change", g.value)
    }), { lastSavedAt: E } = je(g, { channel: "email" });
    function P(F) {
      (F.metaKey || F.ctrlKey) && F.key === "z" && (F.preventDefault(), F.shiftKey ? f() : A());
    }
    De(() => {
      window.addEventListener("keydown", P);
    }), ze(() => {
      window.removeEventListener("keydown", P);
    }), _e(
      g,
      (F) => c("update:modelValue", F),
      { deep: !0 }
    );
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
    const pe = C(() => (d.value, v(oe.value))), ge = C(() => pe.value.blockingErrors), $e = C(() => pe.value.warnings), ie = C(() => pe.value.valid), me = C(() => g.value.template_type ?? "transactional"), L = Q(""), ae = Q(!1), ne = Q(null), w = C(() => {
      const F = L.value;
      return F ? Ee.find((h) => h.id === F) ?? null : null;
    });
    function fe(F) {
      const h = g.value, G = F.campaign.message ? { ...h.message, ...F.campaign.message } : h.message;
      x({
        ...F.campaign,
        message: G
      }), ne.value = null, ae.value = !1;
    }
    function ke(F) {
      const h = F.target.value;
      if (!h) return;
      const G = it.find((Z) => Z.id === h);
      G && ($.value ? (ne.value = G, ae.value = !0) : fe(G), F.target.value = "");
    }
    function Be(F) {
      x({ template_type: F });
    }
    function Le(F) {
      x({
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
    ), Ae = C(
      () => g.value.message.from_name ?? "Your App"
    ), B = C(
      () => g.value.message.from_address ?? "notifications@example.com"
    ), D = C(() => g.value.message.blocks ?? []), K = C(() => {
      const F = D.value;
      if (Array.isArray(F) && F.length > 0) return o(F);
      const h = he.value;
      return h && h.trim() ? h : o([]);
    }), ue = C(() => {
      const F = Ie.value;
      return w.value ? Pe(F, w.value.data) : F;
    }), z = C(() => {
      const F = we.value;
      return w.value ? Pe(F, w.value.data) : F;
    }), H = C(() => {
      const F = K.value;
      return w.value ? Pe(F, w.value.data) : F;
    }), X = Q("desktop");
    function xe() {
      ie.value && c("save", g.value);
    }
    return (F, h) => (a(), n("div", Mu, [
      e("div", Nu, [
        ye(qe, {
          "campaign-name": p(g).name,
          status: p(g).status,
          dirty: p($),
          "last-saved-at": p(E),
          "can-undo": p(U),
          "can-redo": p(M),
          "onUpdate:campaignName": Le,
          onUndo: p(A),
          onRedo: p(f)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "onUndo", "onRedo"]),
        ge.value.length > 0 ? (a(), n("div", {
          key: 0,
          class: "kb-errors",
          style: se({
            background: p(te).dangerBg,
            border: `1px solid ${p(te).dangerBorder}`,
            borderRadius: `${p(Se).input}px`,
            padding: `${p(q)[16]}px ${p(q)[24]}px`,
            marginBottom: `${p(q)[24]}px`
          })
        }, [
          e("ul", {
            style: se({ margin: 0, paddingLeft: "1.25rem", color: p(te).danger })
          }, [
            (a(!0), n(j, null, Y(ge.value, (G) => (a(), n("li", {
              key: G.message
            }, k(G.message), 1))), 128))
          ], 4)
        ], 4)) : _("", !0),
        $e.value.length > 0 ? (a(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: se({
            background: p(te).neutral.bg,
            border: `1px solid ${p(te).neutral.border}`,
            borderRadius: `${p(Se).input}px`,
            padding: `${p(q)[16]}px ${p(q)[24]}px`,
            marginBottom: `${p(q)[24]}px`,
            fontSize: "0.875rem",
            color: p(te).neutral.textMuted
          })
        }, [
          e("strong", {
            style: se({ display: "block", marginBottom: `${p(q)[4]}px` })
          }, "Warnings", 4),
          e("ul", Du, [
            (a(!0), n(j, null, Y($e.value, (G) => (a(), n("li", {
              key: G.message
            }, k(G.message), 1))), 128))
          ])
        ], 4)) : _("", !0)
      ]),
      e("div", zu, [
        e("aside", Wu, [
          s.disabledSections.includes("email") ? _("", !0) : (a(), n("div", Hu, [
            e("div", Fu, [
              h[9] || (h[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", ju, [
                ye(Ke, {
                  "template-type": me.value,
                  onUpdate: Be
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  h[8] || (h[8] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), n(j, null, Y(p(it), (G) => (a(), n("option", {
                    key: G.id,
                    value: G.id
                  }, k(G.label), 9, qu))), 128))
                ], 32)
              ])
            ]),
            ye(Ou, {
              message: p(g).message,
              "variable-options": s.variableOptions,
              "show-reset": !0,
              onUpdate: p(I),
              onReset: h[0] || (h[0] = (G) => p(W)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Ku, [
          !s.designOnly && p(g).audience.test_mode ? (a(), n("div", Yu, [...h[10] || (h[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            ee(" Test mode — only your test segment will receive this. ", -1)
          ])])) : _("", !0),
          e("div", Ju, [
            e("div", Gu, [
              e("label", Qu, [
                h[12] || (h[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Re(e("select", {
                  "onUpdate:modelValue": h[1] || (h[1] = (G) => L.value = G),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  h[11] || (h[11] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), n(j, null, Y(p(Ee), (G) => (a(), n("option", {
                    key: G.id,
                    value: G.id
                  }, k(G.label), 9, Xu))), 128))
                ], 512), [
                  [Me, L.value]
                ])
              ])
            ]),
            e("div", Zu, [
              e("button", {
                type: "button",
                class: ve(["kb-email-device-btn", { "kb-email-device-btn--active": X.value === "desktop" }]),
                onClick: h[2] || (h[2] = (G) => X.value = "desktop")
              }, [...h[13] || (h[13] = [
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
                class: ve(["kb-email-device-btn", { "kb-email-device-btn--active": X.value === "mobile" }]),
                onClick: h[3] || (h[3] = (G) => X.value = "mobile")
              }, [...h[14] || (h[14] = [
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
              class: ve(["kb-email-preview-frame", { "kb-email-preview-frame--mobile": X.value === "mobile" }])
            }, [
              e("div", ec, [
                e("div", tc, [
                  e("span", sc, k(Ae.value), 1),
                  e("span", ac, "<" + k(B.value) + ">", 1)
                ]),
                e("div", nc, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: ue.value || "No subject"
                  }, k(ue.value || "No subject"), 9, lc),
                  z.value ? (a(), n("span", oc, " — " + k(z.value), 1)) : _("", !0)
                ])
              ]),
              e("div", ic, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: H.value
                }, null, 8, rc)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", dc, [
        s.showDuplicate ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: h[4] || (h[4] = (G) => c("duplicate", JSON.parse(JSON.stringify(p(g)))))
        }, " Duplicate ")) : _("", !0),
        s.showSave ? (a(), n("button", {
          key: 1,
          type: "button",
          class: "kb-email-action kb-email-action--secondary",
          onClick: xe
        }, " Save ")) : _("", !0),
        s.showClose ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "kb-email-action kb-email-action--primary",
          onClick: h[5] || (h[5] = (G) => c("edit"))
        }, " Close ")) : _("", !0)
      ]),
      ae.value ? (a(), n("div", uc, [
        e("div", cc, [
          h[15] || (h[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, "Replace content?", -1)),
          h[16] || (h[16] = e("p", { class: "kb-confirm-text" }, "Current changes will be replaced by the preset. Continue?", -1)),
          e("div", pc, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: h[6] || (h[6] = (G) => {
                ae.value = !1, ne.value = null;
              })
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: h[7] || (h[7] = (G) => ne.value && fe(ne.value))
            }, "Replace")
          ])
        ])
      ])) : _("", !0)
    ]));
  }
}), $t = /* @__PURE__ */ be(mc, [["__scopeId", "data-v-decf5e15"]]), vc = { class: "kb-shell" }, bc = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, gc = ["aria-selected", "onClick"], yc = { class: "kb-shell__meta" }, fc = ["href"], kc = { class: "kb-shell__body" }, hc = /* @__PURE__ */ re({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(s, { emit: r }) {
    const o = r, i = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (c, g) => (a(), n("div", vc, [
      e("header", {
        class: "kb-shell__header",
        style: se({ padding: `${p(q)[12]}px ${p(q)[24]}px`, borderBottom: `1px solid ${p(te).neutral.border}`, background: p(te).neutral.bg })
      }, [
        g[0] || (g[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", bc, [
          (a(), n(j, null, Y(i, ($) => e("button", {
            key: $.id,
            type: "button",
            class: ve(["kb-shell__channel", { "kb-shell__channel--active": s.channel === $.id }]),
            role: "tab",
            "aria-selected": s.channel === $.id,
            onClick: (d) => o("switch-channel", $.id)
          }, k($.label), 11, gc)), 64))
        ]),
        e("div", yc, [
          s.environment ? (a(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: se({ padding: "2px 8px", borderRadius: `${p(Se).input}px`, fontSize: "0.75rem", background: p(te).neutral.bg, color: p(te).neutral.textMuted })
          }, k(s.environment), 5)) : _("", !0),
          s.helpUrl ? (a(), n("a", {
            key: 1,
            href: s.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: se({ color: p(te).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, fc)) : _("", !0)
        ])
      ], 4),
      e("div", kc, [
        Te(c.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), _c = /* @__PURE__ */ be(hc, [["__scopeId", "data-v-0df30803"]]), $c = {
  class: "kb-outline",
  "aria-label": "Sections"
}, wc = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, xc = ["onClick"], Cc = /* @__PURE__ */ re({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(s) {
    var g;
    const r = s, o = Q(((g = r.items[0]) == null ? void 0 : g.id) ?? "");
    let i = null;
    function c($) {
      const d = document.getElementById($);
      d && d.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return De(() => {
      const $ = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      $ && (i = new IntersectionObserver(
        (d) => {
          for (const v of d)
            if (v.isIntersecting) {
              const x = v.target.getAttribute("data-outline-id");
              x && (o.value = x);
            }
        },
        { root: $ === document ? null : $, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((d) => {
        const v = document.getElementById(d.id);
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
    ), ($, d) => (a(), n("nav", $c, [
      e("ul", wc, [
        (a(!0), n(j, null, Y(s.items, (v) => (a(), n("li", {
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
              padding: `${p(q)[8]}px ${p(q)[12]}px`,
              border: "none",
              borderRadius: `${p(Se).input}px`,
              background: o.value === v.id ? p(te).neutral.bg : "transparent",
              color: o.value === v.id ? "#0f172a" : p(te).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: o.value === v.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (x) => c(v.id)
          }, k(v.label), 15, xc)
        ]))), 128))
      ])
    ]));
  }
}), Sc = /* @__PURE__ */ be(Cc, [["__scopeId", "data-v-25c37675"]]), Ic = ["id"], Uc = {
  key: 1,
  class: "kb-form-shell__head"
}, Rc = /* @__PURE__ */ re({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(s) {
    return (r, o) => (a(), n("div", {
      class: "kb-form-shell",
      id: s.sectionId ?? void 0,
      style: se({
        padding: `${p(q)[24]}px ${p(q)[24]}px ${p(q)[32]}px`,
        marginBottom: 0
      })
    }, [
      s.label ? (a(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: se({ marginBottom: p(q)[24], paddingBottom: p(q)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: se({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: p(q)[12] })
        }, k(s.label), 5),
        Te(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), n("div", Uc, [
        Te(r.$slots, "head", {}, void 0, !0)
      ])),
      Te(r.$slots, "default", {}, void 0, !0)
    ], 12, Ic));
  }
}), Lc = /* @__PURE__ */ be(Rc, [["__scopeId", "data-v-6504df41"]]), Ac = /* @__PURE__ */ re({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(s) {
    return (r, o) => (a(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: se({
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
      Te(r.$slots, "default")
    ], 4));
  }
}), Bc = /* @__PURE__ */ re({
  __name: "BuilderTopShell",
  setup(s) {
    return (r, o) => (a(), n("div", {
      class: "kb-top-shell",
      style: se({
        marginLeft: p(q)[24],
        marginRight: p(q)[24]
      })
    }, [
      Te(r.$slots, "header"),
      Te(r.$slots, "errors"),
      Te(r.$slots, "warnings"),
      Te(r.$slots, "default")
    ], 4));
  }
});
function Tc(s) {
  s.component("KeosNotificationBuilder", kt), s.component("KeosWhatsAppBuilder", ht), s.component("KeosSmsBuilder", _t), s.component("KeosEmailBuilder", $t), s.component("BuilderShell", _c), s.component("BuilderOutline", Sc), s.component("BuilderVersionHistoryModal", ft), s.component("BuilderFormShell", Lc), s.component("BuilderActionsBar", Ac), s.component("BuilderTopShell", Bc);
}
const Vc = {
  install: Tc,
  KeosNotificationBuilder: kt,
  KeosWhatsAppBuilder: ht,
  KeosSmsBuilder: _t,
  KeosEmailBuilder: $t
};
export {
  Ac as BuilderActionsBar,
  Lc as BuilderFormShell,
  Sc as BuilderOutline,
  _c as BuilderShell,
  Bc as BuilderTopShell,
  ft as BuilderVersionHistoryModal,
  Ee as DEFAULT_SAMPLE_PROFILES,
  $t as KeosEmailBuilder,
  kt as KeosNotificationBuilder,
  _t as KeosSmsBuilder,
  ht as KeosWhatsAppBuilder,
  Vc as default,
  Tc as install,
  Pe as renderTemplatePreview,
  je as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
