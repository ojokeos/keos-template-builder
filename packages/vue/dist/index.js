import { ref as ae, watch as Ae, computed as C, defineComponent as ke, openBlock as s, createElementBlock as n, normalizeStyle as ie, unref as d, createElementVNode as e, Fragment as z, renderList as Y, toDisplayString as f, createTextVNode as G, createCommentVNode as k, normalizeClass as Ce, withDirectives as Be, vModelSelect as Me, vModelText as Ze, vModelCheckbox as Tt, createStaticVNode as Oe, withKeys as Pt, onMounted as De, onUnmounted as We, createVNode as Se, createBlock as Vt, renderSlot as Te } from "vue";
const X = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Re = {
  input: 6,
  card: 12,
  button: 6
}, ne = {
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
ne.neutral.textMuted, ne.neutral.textMeta;
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
}, Et = ["android", "ios", "web"], ht = "normal", kt = ["low", "normal", "high"], _t = 86400, Nt = [3600, 7200, 86400, 172800], wt = "1.0", Mt = ["topic", "segment", "user_list"];
function et() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Et],
    test_mode: !1
  };
}
function tt() {
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
function at() {
  return {
    priority: ht,
    ttl: _t,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function st() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function Ot(t) {
  return {
    schema_version: wt,
    name: "",
    status: "draft",
    audience: et(),
    message: tt(),
    delivery: at(),
    tracking: st(),
    ...t
  };
}
function $t(t) {
  const o = t;
  return o.schema_version || (o.schema_version = wt), o.audience || (o.audience = et()), o.message || (o.message = tt()), o.delivery || (o.delivery = at()), o.tracking || (o.tracking = st()), kt.includes(o.delivery.priority) || (o.delivery.priority = ht), o.delivery.ttl === void 0 && (o.delivery.ttl = _t), Mt.includes(o.audience.type) || (o.audience.type = "topic"), o.audience.type === "topic" && !o.audience.topic_name && (o.audience.topic_name = "default"), o;
}
const Dt = 1e5;
function Wt(t, o) {
  var c, i, x;
  const u = [], p = o ?? t.audience.estimated_reach;
  return p !== void 0 && p >= Dt && u.push({
    message: `Estimated reach is very high (${p.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), t.tracking && !((c = t.tracking.campaign_name) != null && c.trim()) && !((i = t.name) != null && i.trim()) && u.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (x = t.message.deep_link) != null && x.trim() || u.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), u;
}
function xt(t, o = "error") {
  return { message: t, severity: o };
}
function Ct(t) {
  const o = [];
  return t.schema_version || o.push(xt("Missing schema_version")), {
    valid: o.length === 0,
    errors: o
  };
}
function Ht(t, o) {
  const u = Ct(t), p = Wt(t, o);
  return {
    valid: u.valid,
    errors: [
      ...u.errors,
      ...p.map((c) => xt(c.message, c.severity))
    ]
  };
}
function zt(t) {
  return t.errors.filter((o) => o.severity === "error");
}
function Ft(t) {
  return t.errors.filter((o) => o.severity !== "error");
}
function Ve(t, o) {
  return t.length <= o ? { text: t, truncated: !1 } : { text: t.slice(0, Math.max(0, o - 3)) + "...", truncated: !0 };
}
const He = ze.android;
function qt(t) {
  const { title: o, body: u } = t, p = Ve(o || "", He.title), c = Ve(u || "", He.body);
  return {
    title: p.text,
    body: c.text,
    imageUrl: t.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: c.truncated,
    expanded: !1
  };
}
function jt(t) {
  const { title: o, body: u } = t, p = Ve(o || "", He.title), c = Ve(u || "", He.body);
  return {
    title: p.text,
    body: c.text,
    imageUrl: t.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: c.truncated,
    expanded: !0
  };
}
function Kt(t, o = {}) {
  const u = o.expanded ? jt(t) : qt(t);
  return o.darkMode !== void 0 && (u.darkMode = o.darkMode), u;
}
const lt = ze.ios;
function St(t) {
  const { title: o, body: u } = t, p = Ve(o || "", lt.title), c = Ve(u || "", lt.body);
  return {
    title: p.text,
    body: c.text,
    imageUrl: t.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: c.truncated,
    expanded: !1
  };
}
function Yt(t) {
  return St(t);
}
function Jt(t, o = {}) {
  const u = o.variant === "lockscreen" ? Yt(t) : St(t);
  return o.darkMode !== void 0 && (u.darkMode = o.darkMode), u;
}
const ot = ze.web;
function it(t) {
  const { title: o, body: u } = t, p = Ve(o || "", ot.title), c = Ve(u || "", ot.body);
  return {
    title: p.text,
    body: c.text,
    imageUrl: t.imageUrl,
    titleTruncated: p.truncated,
    bodyTruncated: c.truncated
  };
}
function Gt(t) {
  return t.map((o) => ({ message: o, severity: "error" }));
}
function Ye(t) {
  return JSON.parse(JSON.stringify(t));
}
function Fe(t = {}) {
  const o = ae(
    $t(t.initial ?? Ot())
  ), u = t.hooks ?? {}, p = ae(!1), c = ae([]);
  Ae(
    o,
    () => {
      if (!u.customValidators) {
        c.value = [];
        return;
      }
      u.customValidators(o.value).then((B) => {
        c.value = B;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const i = ae([]), x = ae([]);
  function w() {
    const B = Ye(o.value);
    i.value = [...i.value.slice(-19), B], x.value = [];
  }
  const y = C(() => i.value.length > 0), A = C(() => x.value.length > 0);
  function U() {
    i.value.length !== 0 && (x.value = [Ye(o.value), ...x.value], o.value = i.value[i.value.length - 1], i.value = i.value.slice(0, -1));
  }
  function O() {
    x.value.length !== 0 && (i.value = [...i.value, Ye(o.value)], o.value = x.value[0], x.value = x.value.slice(1));
  }
  Ae(
    o,
    () => {
      var B;
      p.value = !0, (B = t.onDirty) == null || B.call(t);
    },
    { deep: !0 }
  );
  const N = C(() => Ct(o.value));
  function q(B) {
    const le = Ht(o.value, B), se = Gt(c.value), S = [...zt(le), ...se], _e = [...le.errors, ...se], R = le.valid && se.length === 0;
    return {
      ...le,
      errors: _e,
      valid: R,
      blockingErrors: S,
      warnings: Ft(le)
    };
  }
  function F(B) {
    w(), o.value = { ...o.value, ...B };
  }
  function ve(B) {
    w(), o.value = {
      ...o.value,
      audience: { ...o.value.audience, ...B }
    };
  }
  function Z(B) {
    w(), o.value = {
      ...o.value,
      message: { ...o.value.message, ...B }
    };
  }
  function J(B) {
    w(), o.value = {
      ...o.value,
      delivery: { ...o.value.delivery, ...B }
    };
  }
  function T(B) {
    w(), o.value = {
      ...o.value,
      tracking: o.value.tracking ? { ...o.value.tracking, ...B } : { campaign_name: "", tags: [], ab_test: !1, ...B }
    };
  }
  function re(B) {
    w(), o.value = {
      ...o.value,
      message: { ...tt(), ...B }
    };
  }
  function j(B) {
    w(), o.value = {
      ...o.value,
      delivery: { ...at(), ...B }
    };
  }
  function fe(B) {
    w(), o.value = {
      ...o.value,
      tracking: { ...st(), ...B }
    };
  }
  function ge(B) {
    w(), o.value = {
      ...o.value,
      audience: { ...et(), ...B }
    };
  }
  const be = C(() => ({
    title: o.value.message.title,
    body: o.value.message.body,
    imageUrl: o.value.message.image_url
  }));
  function xe(B, le) {
    const se = be.value;
    let S;
    switch (B) {
      case "android":
        S = Kt(se, { expanded: le == null ? void 0 : le.expanded });
        break;
      case "ios":
        S = Jt(se);
        break;
      case "web":
        S = it(se);
        break;
      default:
        S = it(se);
    }
    const _e = o.value.message.actions ?? [], R = o.value.message.location;
    return { ...S, actions: _e, location: R ?? void 0 };
  }
  const me = ze;
  async function he() {
    return u.customValidators ? u.customValidators(o.value) : [];
  }
  return {
    campaign: o,
    dirty: p,
    validation: N,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: c,
    getValidationWithWarnings: q,
    update: F,
    updateAudience: ve,
    updateMessage: Z,
    updateDelivery: J,
    updateTracking: T,
    undo: U,
    redo: O,
    canUndo: y,
    canRedo: A,
    resetMessage: re,
    resetDelivery: j,
    resetTracking: fe,
    resetAudience: ge,
    getPreview: xe,
    previewInput: be,
    characterLimits: me,
    runCustomValidators: he,
    hooks: u
  };
}
const Xt = "keos-draft", Qt = 2e3;
function Zt(t, o) {
  return `${Xt}-${t}-${o}`;
}
function qe(t, o) {
  const u = o.channel, p = C(
    () => {
      var U, O;
      return Zt(
        u,
        o.key ?? ((U = t.value) == null ? void 0 : U.id) ?? ((O = t.value) == null ? void 0 : O.name) ?? "draft"
      );
    }
  ), c = ae(null);
  let i = null;
  function x() {
    try {
      const U = JSON.stringify(t.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(p.value, U), c.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function w() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(p.value);
    } catch {
    }
  }
  function y() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const U = window.localStorage.getItem(p.value);
      if (!U) return null;
      const O = JSON.parse(U);
      return $t(O);
    } catch {
      return null;
    }
  }
  function A() {
    return o.enabled === void 0 ? !0 : typeof o.enabled == "boolean" ? o.enabled : o.enabled.value;
  }
  return Ae(
    t,
    () => {
      A() && (i && clearTimeout(i), i = setTimeout(() => {
        i = null, x();
      }, Qt));
    },
    { deep: !0 }
  ), {
    lastSavedAt: c,
    clearDraft: w,
    getDraft: y,
    persist: x
  };
}
const ea = { class: "kb-header__row" }, ta = ["value"], aa = { class: "kb-header__actions" }, sa = ["disabled"], na = ["disabled"], la = ["value"], oa = ["value"], ia = /* @__PURE__ */ ke({
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
  setup(t, { emit: o }) {
    const u = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], p = t, c = o;
    function i(y) {
      return p.slugifyName ? y.trim().replace(/\s+/g, "-") : y;
    }
    function x(y) {
      return y.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function w(y) {
      const A = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return A[y] ?? A.draft;
    }
    return (y, A) => (s(), n("header", {
      class: "kb-header",
      style: ie({
        padding: `${d(X)[16]}px 0`,
        borderBottom: `1px solid ${d(ne).neutral.border}`,
        marginBottom: `${d(X)[16]}px`
      })
    }, [
      e("div", ea, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: t.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: A[0] || (A[0] = (U) => c("update:campaignName", i(U.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, ta),
        e("div", aa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !t.canUndo,
            onClick: A[1] || (A[1] = (U) => c("undo"))
          }, " Undo ", 8, sa),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !t.canRedo,
            onClick: A[2] || (A[2] = (U) => c("redo"))
          }, " Redo ", 8, na)
        ]),
        t.workflowStatus !== void 0 ? (s(), n("select", {
          key: 0,
          value: t.workflowStatus,
          class: "kb-header__status-select",
          style: ie({
            padding: `${d(X)[4]}px ${d(X)[8]}px`,
            borderRadius: `${d(Re).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...w(t.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: A[3] || (A[3] = (U) => c("update:workflowStatus", U.target.value))
        }, [
          (s(), n(z, null, Y(u, (U) => e("option", {
            key: U.value,
            value: U.value
          }, f(U.label), 9, oa)), 64))
        ], 44, la)) : (s(), n("span", {
          key: 1,
          class: "kb-header__status",
          style: ie({
            padding: `${d(X)[4]}px ${d(X)[8]}px`,
            borderRadius: `${d(Re).input}px`,
            background: d(ne).neutral.bg,
            fontSize: "0.8125rem",
            color: d(ne).neutral.textMuted
          })
        }, f(t.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ie({ fontSize: "0.8125rem", color: d(ne).neutral.textMuted, marginTop: `${d(X)[4]}px` })
      }, [
        t.saving ? (s(), n(z, { key: 0 }, [
          G("Saving…")
        ], 64)) : t.dirty ? (s(), n(z, { key: 1 }, [
          G("Unsaved changes")
        ], 64)) : t.lastSavedAt ? (s(), n(z, { key: 2 }, [
          G("Last saved at " + f(x(t.lastSavedAt)), 1)
        ], 64)) : k("", !0)
      ], 4)
    ], 4));
  }
}), $e = (t, o) => {
  const u = t.__vccOpts || t;
  for (const [p, c] of o)
    u[p] = c;
  return u;
}, je = /* @__PURE__ */ $e(ia, [["__scopeId", "data-v-ef058bcb"]]), ra = { class: "kb-section" }, da = { class: "kb-section__head" }, ua = { class: "kb-section__desc" }, ca = { class: "kb-field" }, pa = { class: "kb-label" }, ma = { class: "kb-field-with-rail" }, va = ["value", "aria-invalid", "aria-describedby"], ba = {
  key: 0,
  id: "title-error",
  class: "kb-inline-error",
  role: "alert"
}, ga = { class: "kb-field" }, ya = { class: "kb-label" }, fa = { class: "kb-field-with-rail" }, ha = ["value", "aria-invalid", "aria-describedby"], ka = {
  key: 0,
  id: "body-error",
  class: "kb-inline-error",
  role: "alert"
}, _a = { class: "kb-field" }, wa = ["value", "aria-invalid", "aria-describedby"], $a = {
  key: 0,
  id: "image-url-error",
  class: "kb-inline-error",
  role: "alert"
}, xa = { class: "kb-field" }, Ca = ["value", "aria-invalid", "aria-describedby"], Sa = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Ia = { class: "kb-field" }, Aa = { class: "kb-location-row" }, Ua = ["value"], Ra = ["value"], La = ["value"], Ba = ["value"], Ta = { class: "kb-field" }, Pa = { class: "kb-actions-list" }, Va = ["value", "onInput"], Ea = ["value", "onInput"], Na = ["onClick"], Ma = ["disabled"], Oa = { class: "kb-action-chips" }, Da = ["disabled", "onClick"], Wa = /* @__PURE__ */ ke({
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
    const o = t;
    return (u, p) => {
      var c, i, x, w;
      return s(), n("section", ra, [
        e("div", da, [
          p[10] || (p[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          t.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (y) => u.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        e("p", ua, " Message body is required. Title is optional. Character limits depend on the selected platform (" + f(t.selectedPlatform) + "). ", 1),
        e("div", ca, [
          e("label", pa, [
            p[11] || (p[11] = G(" Title ", -1)),
            e("span", {
              class: Ce(["kb-counter", { "kb-counter--warn": t.titleCount > t.titleLimit }])
            }, f(t.titleCount) + "/" + f(t.titleLimit), 3)
          ]),
          e("div", ma, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: t.message.title,
              "aria-invalid": !!t.titleError,
              "aria-describedby": t.titleError ? "title-error" : void 0,
              onInput: p[1] || (p[1] = (y) => u.$emit("update", { title: y.target.value }))
            }, null, 40, va),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ie({ "--pct": Math.min(100, t.titleCount / t.titleLimit * 100) + "%" })
            }, [...p[12] || (p[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          t.titleError ? (s(), n("p", ba, f(t.titleError), 1)) : k("", !0)
        ]),
        e("div", ga, [
          e("label", ya, [
            p[13] || (p[13] = G(" Message ", -1)),
            e("span", {
              class: Ce(["kb-counter", { "kb-counter--warn": t.bodyCount > t.bodyLimit }])
            }, f(t.bodyCount) + "/" + f(t.bodyLimit), 3)
          ]),
          e("div", fa, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: t.message.body,
              "aria-invalid": !!t.bodyError,
              "aria-describedby": t.bodyError ? "body-error" : void 0,
              onInput: p[2] || (p[2] = (y) => u.$emit("update", { body: y.target.value }))
            }, null, 40, ha),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ie({ "--pct": Math.min(100, t.bodyCount / t.bodyLimit * 100) + "%" })
            }, [...p[14] || (p[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          t.bodyError ? (s(), n("p", ka, f(t.bodyError), 1)) : k("", !0)
        ]),
        e("div", _a, [
          p[15] || (p[15] = e("label", { class: "kb-label" }, [
            G(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: t.message.image_url,
            "aria-invalid": !!t.imageUrlError,
            "aria-describedby": t.imageUrlError ? "image-url-error" : void 0,
            onInput: p[3] || (p[3] = (y) => u.$emit("update", { image_url: y.target.value || void 0 }))
          }, null, 40, wa),
          t.imageUrlError ? (s(), n("p", $a, f(t.imageUrlError), 1)) : k("", !0)
        ]),
        e("div", xa, [
          p[16] || (p[16] = e("label", { class: "kb-label" }, [
            G(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: t.message.deep_link,
            "aria-invalid": !!t.deepLinkError,
            "aria-describedby": t.deepLinkError ? "deeplink-error" : void 0,
            onInput: p[4] || (p[4] = (y) => u.$emit("update", { deep_link: y.target.value || void 0 }))
          }, null, 40, Ca),
          t.deepLinkError ? (s(), n("p", Sa, f(t.deepLinkError), 1)) : k("", !0)
        ]),
        e("div", Ia, [
          p[17] || (p[17] = e("label", { class: "kb-label" }, [
            G(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Aa, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((c = t.message.location) == null ? void 0 : c.lat) ?? "",
              onInput: p[5] || (p[5] = (y) => {
                const A = { ...t.message.location ?? {} }, U = y.target.value;
                A.lat = U === "" ? void 0 : Number(U), u.$emit("update", { location: A });
              })
            }, null, 40, Ua),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((i = t.message.location) == null ? void 0 : i.lon) ?? "",
              onInput: p[6] || (p[6] = (y) => {
                const A = { ...t.message.location ?? {} }, U = y.target.value;
                A.lon = U === "" ? void 0 : Number(U), u.$emit("update", { location: A });
              })
            }, null, 40, Ra)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((x = t.message.location) == null ? void 0 : x.name) ?? "",
            onInput: p[7] || (p[7] = (y) => {
              const A = { ...t.message.location ?? {} };
              A.name = y.target.value || void 0, u.$emit("update", { location: A });
            })
          }, null, 40, La),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((w = t.message.location) == null ? void 0 : w.address) ?? "",
            onInput: p[8] || (p[8] = (y) => {
              const A = { ...t.message.location ?? {} };
              A.address = y.target.value || void 0, u.$emit("update", { location: A });
            })
          }, null, 40, Ba)
        ]),
        e("div", Ta, [
          p[19] || (p[19] = e("label", { class: "kb-label" }, [
            G(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Pa, [
            (s(!0), n(z, null, Y(o.message.actions ?? [], (y, A) => (s(), n("div", {
              key: y.id || A,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: y.label,
                onInput: (U) => {
                  var q;
                  const O = [...o.message.actions ?? []], N = Number(A);
                  O[N] = {
                    ...O[N],
                    id: ((q = O[N]) == null ? void 0 : q.id) || `action_${N + 1}`,
                    label: U.target.value
                  }, u.$emit("update", { actions: O });
                }
              }, null, 40, Va),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: y.url,
                onInput: (U) => {
                  var q;
                  const O = [...o.message.actions ?? []], N = Number(A);
                  O[N] = {
                    ...O[N],
                    id: ((q = O[N]) == null ? void 0 : q.id) || `action_${N + 1}`,
                    url: U.target.value || void 0
                  }, u.$emit("update", { actions: O });
                }
              }, null, 40, Ea),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const U = [...o.message.actions ?? []];
                  U.splice(Number(A), 1), u.$emit("update", { actions: U });
                }
              }, " Remove ", 8, Na)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (o.message.actions ?? []).length >= 3,
              onClick: p[9] || (p[9] = () => {
                const y = [...o.message.actions ?? []];
                y.push({
                  id: `action_${y.length + 1}`,
                  label: "",
                  url: ""
                }), u.$emit("update", { actions: y });
              })
            }, " Add action ", 8, Ma),
            e("div", Oa, [
              p[18] || (p[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (s(), n(z, null, Y(["View order", "Track shipment", "Open app"], (y) => e("button", {
                key: y,
                type: "button",
                class: "kb-action-chip",
                disabled: (o.message.actions ?? []).length >= 3,
                onClick: () => {
                  const A = [...o.message.actions ?? []];
                  A.push({
                    id: `action_${Date.now()}`,
                    label: y,
                    url: ""
                  }), u.$emit("update", { actions: A });
                }
              }, f(y), 9, Da)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), Ha = /* @__PURE__ */ $e(Wa, [["__scopeId", "data-v-7bc3a44c"]]), za = { class: "kb-section kb-section--inline-personalization" }, Fa = { class: "kb-field" }, qa = { class: "kb-insert-row" }, ja = ["value"], Ka = { class: "kb-field" }, Ya = { class: "kb-insert-row" }, Ja = { class: "kb-field" }, Ga = { class: "kb-variable-list" }, Xa = /* @__PURE__ */ ke({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(t, { emit: o }) {
    const u = t, p = o, c = ["first_name", "last_name", "order_id", "city"], i = ae(u.variableOptions ?? c), x = ae(i.value[0] ?? c[0]), w = ae("");
    Ae(
      () => u.variableOptions,
      (O) => {
        O && O.length && (i.value = [...O], i.value.includes(x.value) || (x.value = i.value[0]));
      }
    );
    const y = C(() => i.value);
    function A(O) {
      p("insertVariable", { variable: x.value, field: O });
    }
    function U() {
      const O = w.value.trim();
      O && (i.value.includes(O) || (i.value = [...i.value, O]), x.value = O, w.value = "");
    }
    return (O, N) => (s(), n("section", za, [
      N[8] || (N[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      N[9] || (N[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Fa, [
        N[4] || (N[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", qa, [
          Be(e("select", {
            "onUpdate:modelValue": N[0] || (N[0] = (q) => x.value = q),
            class: "kb-select"
          }, [
            (s(!0), n(z, null, Y(y.value, (q) => (s(), n("option", {
              key: q,
              value: q
            }, f(q), 9, ja))), 128))
          ], 512), [
            [Me, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: N[1] || (N[1] = (q) => A("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: N[2] || (N[2] = (q) => A("body"))
          }, "Into message")
        ])
      ]),
      e("div", Ka, [
        N[5] || (N[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ya, [
          Be(e("input", {
            "onUpdate:modelValue": N[3] || (N[3] = (q) => w.value = q),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [Ze, w.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: U
          }, " Add ")
        ])
      ]),
      e("div", Ja, [
        N[6] || (N[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        N[7] || (N[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", Ga, [
          (s(!0), n(z, null, Y(y.value, (q) => (s(), n("li", { key: q }, [
            e("code", null, "{{ " + f(q) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), It = /* @__PURE__ */ $e(Xa, [["__scopeId", "data-v-6d49f6dc"]]), Qa = { class: "kb-section kb-section--template-type" }, Za = { class: "kb-field" }, es = { class: "kb-radio-group" }, ts = { class: "kb-radio" }, as = ["checked"], ss = { class: "kb-radio" }, ns = ["checked"], ls = /* @__PURE__ */ ke({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(t, { emit: o }) {
    const u = o;
    return (p, c) => (s(), n("section", Qa, [
      c[5] || (c[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      c[6] || (c[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", Za, [
        e("div", es, [
          e("label", ts, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: t.templateType === "transactional",
              onChange: c[0] || (c[0] = (i) => u("update", "transactional"))
            }, null, 40, as),
            c[2] || (c[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", ss, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: t.templateType === "marketing",
              onChange: c[1] || (c[1] = (i) => u("update", "marketing"))
            }, null, 40, ns),
            c[3] || (c[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        c[4] || (c[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), nt = /* @__PURE__ */ $e(ls, [["__scopeId", "data-v-991f74e5"]]), os = { class: "kb-section" }, is = { class: "kb-section__head" }, rs = { class: "kb-section__desc" }, ds = { class: "kb-field" }, us = { class: "kb-radio-group" }, cs = { class: "kb-radio" }, ps = ["checked"], ms = { class: "kb-radio" }, vs = ["checked"], bs = {
  key: 0,
  class: "kb-field kb-row"
}, gs = ["value"], ys = ["value"], fs = { class: "kb-field" }, hs = ["value"], ks = ["value"], _s = { class: "kb-field" }, ws = ["value"], $s = ["value"], xs = { class: "kb-field" }, Cs = { class: "kb-checkbox" }, Ss = ["checked"], Is = /* @__PURE__ */ ke({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t) {
    const o = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (u, p) => {
      var c;
      return s(), n("section", os, [
        e("div", is, [
          p[8] || (p[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          t.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: p[0] || (p[0] = (i) => u.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        e("p", rs, f(t.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ds, [
          p[11] || (p[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", us, [
            e("label", cs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !t.delivery.scheduled_at,
                onChange: p[1] || (p[1] = (i) => u.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, ps),
              p[9] || (p[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", ms, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!t.delivery.scheduled_at,
                onChange: p[2] || (p[2] = (i) => u.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, vs),
              p[10] || (p[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        t.delivery.scheduled_at ? (s(), n("div", bs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (c = t.delivery.scheduled_at) == null ? void 0 : c.slice(0, 16),
            onInput: p[3] || (p[3] = (i) => u.$emit("update", { scheduled_at: i.target.value }))
          }, null, 40, gs),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: t.delivery.timezone,
            onInput: p[4] || (p[4] = (i) => u.$emit("update", { timezone: i.target.value }))
          }, null, 40, ys)
        ])) : k("", !0),
        t.showPushOptions ? (s(), n(z, { key: 1 }, [
          e("div", fs, [
            p[12] || (p[12] = e("label", { class: "kb-label" }, [
              G(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: t.delivery.ttl,
              onChange: p[5] || (p[5] = (i) => u.$emit("update", { ttl: Number(i.target.value) }))
            }, [
              (s(!0), n(z, null, Y(d(Nt), (i) => (s(), n("option", {
                key: i,
                value: i
              }, f(o[i] ?? i + "s"), 9, ks))), 128))
            ], 40, hs)
          ]),
          e("div", _s, [
            p[13] || (p[13] = e("label", { class: "kb-label" }, [
              G(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: t.delivery.priority,
              onChange: p[6] || (p[6] = (i) => u.$emit("update", { priority: i.target.value }))
            }, [
              (s(!0), n(z, null, Y(d(kt), (i) => (s(), n("option", {
                key: i,
                value: i
              }, f(i), 9, $s))), 128))
            ], 40, ws)
          ]),
          e("div", xs, [
            e("label", Cs, [
              e("input", {
                type: "checkbox",
                checked: t.delivery.quiet_hours,
                onChange: p[7] || (p[7] = (i) => u.$emit("update", { quiet_hours: !t.delivery.quiet_hours }))
              }, null, 40, Ss),
              p[14] || (p[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : k("", !0)
      ]);
    };
  }
}), As = /* @__PURE__ */ $e(Is, [["__scopeId", "data-v-a208b72f"]]), Us = { class: "kb-accordion" }, Rs = { class: "kb-accordion__body" }, Ls = { class: "kb-field" }, Bs = ["value"], Ts = { class: "kb-field" }, Ps = { class: "kb-checkbox" }, Vs = ["checked"], Es = /* @__PURE__ */ ke({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(t) {
    return (o, u) => (s(), n("details", Us, [
      u[4] || (u[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Rs, [
        e("div", Ls, [
          u[2] || (u[2] = e("label", { class: "kb-label" }, [
            G(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: t.delivery.collapse_key,
            onInput: u[0] || (u[0] = (p) => o.$emit("update", { collapse_key: p.target.value || void 0 }))
          }, null, 40, Bs)
        ]),
        e("div", Ts, [
          e("label", Ps, [
            e("input", {
              type: "checkbox",
              checked: t.delivery.silent_push,
              onChange: u[1] || (u[1] = (p) => o.$emit("update", { silent_push: !t.delivery.silent_push }))
            }, null, 40, Vs),
            u[3] || (u[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ns = /* @__PURE__ */ $e(Es, [["__scopeId", "data-v-e0f5c559"]]);
function Pe(t, o) {
  return !t || typeof t != "string" ? t : t.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (u, p) => {
    const c = p.trim();
    return c in o ? String(o[c]) : `{{ ${p} }}`;
  });
}
const Ee = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Ms = { class: "kb-preview" }, Os = {
  key: 0,
  class: "kb-preview__toggle"
}, Ds = { class: "kb-checkbox" }, Ws = {
  key: 1,
  id: "kb-preview-panel-android",
  class: "kb-preview__device kb-preview__device--android",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-android"
}, Hs = {
  key: 0,
  class: "kb-android-image kb-android-image--expanded"
}, zs = ["src"], Fs = { class: "kb-android-body-row" }, qs = { class: "kb-android-body-content" }, js = {
  key: 0,
  class: "kb-android-title"
}, Ks = {
  key: 1,
  class: "kb-android-text"
}, Ys = {
  key: 2,
  class: "kb-android-location-line"
}, Js = {
  key: 0,
  class: "kb-android-thumb"
}, Gs = ["src"], Xs = {
  key: 1,
  class: "kb-preview-map kb-preview-map--android"
}, Qs = ["src"], Zs = {
  key: 0,
  class: "kb-preview-map__caption"
}, en = {
  key: 2,
  class: "kb-android-actions"
}, tn = {
  key: 2,
  id: "kb-preview-panel-ios",
  class: "kb-preview__device kb-preview__device--ios",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-ios"
}, an = { class: "kb-ios-banner" }, sn = { class: "kb-ios-content" }, nn = {
  key: 0,
  class: "kb-ios-title"
}, ln = {
  key: 1,
  class: "kb-ios-text"
}, on = {
  key: 2,
  class: "kb-preview-map kb-preview-map--ios"
}, rn = ["src"], dn = {
  key: 0,
  class: "kb-preview-map__caption"
}, un = {
  key: 3,
  class: "kb-ios-actions"
}, cn = {
  key: 0,
  class: "kb-ios-thumb"
}, pn = ["src"], mn = {
  key: 3,
  id: "kb-preview-panel-web",
  class: "kb-preview__device kb-preview__device--web",
  role: "tabpanel",
  "aria-labelledby": "kb-preview-tab-web"
}, vn = { class: "kb-web-toast" }, bn = { class: "kb-web-body" }, gn = {
  key: 0,
  class: "kb-web-title"
}, yn = {
  key: 1,
  class: "kb-web-text"
}, fn = {
  key: 2,
  class: "kb-web-image"
}, hn = ["src"], kn = {
  key: 3,
  class: "kb-preview-map kb-preview-map--web"
}, _n = ["src"], wn = {
  key: 0,
  class: "kb-preview-map__caption"
}, $n = {
  key: 0,
  class: "kb-web-actions"
}, xn = /* @__PURE__ */ ke({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null }
  },
  setup(t) {
    const o = t, u = ae(!1), p = C(
      () => o.getPreview(o.selectedPlatform, {
        expanded: o.selectedPlatform === "android" ? u.value : void 0
      })
    ), c = C(() => {
      const w = p.value;
      return o.previewProfile ? {
        ...w,
        title: Pe((w == null ? void 0 : w.title) ?? "", o.previewProfile.data),
        body: Pe((w == null ? void 0 : w.body) ?? "", o.previewProfile.data)
      } : w;
    }), i = C(() => {
      var N;
      const w = (N = c.value) == null ? void 0 : N.location;
      if (!w || w.lat == null && w.lon == null) return null;
      const y = Number(w.lat) || 0, A = Number(w.lon) || 0, U = 8e-3, O = [A - U, y - U, A + U, y + U].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(O)}&layer=mapnik&marker=${y},${A}`;
    }), x = C(() => {
      var y;
      const w = (y = c.value) == null ? void 0 : y.location;
      return w && (w.lat != null || w.lon != null || w.name || w.address);
    });
    return (w, y) => {
      var A, U, O, N, q, F, ve, Z, J, T, re, j, fe, ge, be, xe;
      return s(), n("div", Ms, [
        t.selectedPlatform === "android" ? (s(), n("div", Os, [
          e("label", Ds, [
            Be(e("input", {
              "onUpdate:modelValue": y[0] || (y[0] = (me) => u.value = me),
              type: "checkbox"
            }, null, 512), [
              [Tt, u.value]
            ]),
            y[1] || (y[1] = e("span", null, "Expanded notification", -1))
          ])
        ])) : k("", !0),
        t.selectedPlatform === "android" ? (s(), n("div", Ws, [
          y[4] || (y[4] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: Ce(["kb-android-notification", { "kb-android-notification--expanded": u.value }])
          }, [
            y[3] || (y[3] = Oe('<div class="kb-android-header" data-v-1d6293a0><div class="kb-android-app-icon" data-v-1d6293a0>A</div><div class="kb-android-app-meta" data-v-1d6293a0><div class="kb-android-app-name" data-v-1d6293a0>Your App</div><div class="kb-android-app-channel" data-v-1d6293a0>Promotions · now</div></div><div class="kb-android-more" data-v-1d6293a0>⋮</div></div>', 1)),
            e("div", {
              class: Ce(["kb-android-body", { "kb-android-body--expanded": u.value }])
            }, [
              u.value && c.value.imageUrl ? (s(), n("div", Hs, [
                e("img", {
                  src: c.value.imageUrl,
                  alt: ""
                }, null, 8, zs)
              ])) : k("", !0),
              e("div", Fs, [
                e("div", qs, [
                  c.value.title ? (s(), n("div", js, f(c.value.title), 1)) : k("", !0),
                  c.value.body ? (s(), n("div", Ks, f(c.value.body), 1)) : k("", !0),
                  x.value && !u.value && ((A = c.value.location) != null && A.name || (U = c.value.location) != null && U.address) ? (s(), n("div", Ys, [
                    y[2] || (y[2] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    G(" " + f(((O = c.value.location) == null ? void 0 : O.name) || ((N = c.value.location) == null ? void 0 : N.address)), 1)
                  ])) : k("", !0)
                ]),
                !u.value && c.value.imageUrl ? (s(), n("div", Js, [
                  e("img", {
                    src: c.value.imageUrl,
                    alt: ""
                  }, null, 8, Gs)
                ])) : k("", !0)
              ]),
              x.value && i.value && u.value ? (s(), n("div", Xs, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Qs),
                (q = c.value.location) != null && q.name || (F = c.value.location) != null && F.address ? (s(), n("div", Zs, f(((ve = c.value.location) == null ? void 0 : ve.name) || ((Z = c.value.location) == null ? void 0 : Z.address)), 1)) : k("", !0)
              ])) : k("", !0),
              c.value.actions && c.value.actions.length ? (s(), n("div", en, [
                (s(!0), n(z, null, Y(c.value.actions, (me) => (s(), n("button", {
                  key: me.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, f(me.label || "Action"), 1))), 128))
              ])) : k("", !0)
            ], 2)
          ], 2)
        ])) : t.selectedPlatform === "ios" ? (s(), n("div", tn, [
          y[7] || (y[7] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", an, [
            y[6] || (y[6] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", sn, [
              y[5] || (y[5] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              c.value.title ? (s(), n("div", nn, f(c.value.title), 1)) : k("", !0),
              c.value.body ? (s(), n("div", ln, f(c.value.body), 1)) : k("", !0),
              x.value && i.value ? (s(), n("div", on, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, rn),
                (J = c.value.location) != null && J.name || (T = c.value.location) != null && T.address ? (s(), n("div", dn, f(((re = c.value.location) == null ? void 0 : re.name) || ((j = c.value.location) == null ? void 0 : j.address)), 1)) : k("", !0)
              ])) : k("", !0),
              c.value.actions && c.value.actions.length ? (s(), n("div", un, [
                (s(!0), n(z, null, Y(c.value.actions, (me) => (s(), n("button", {
                  key: me.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, f(me.label || "Action"), 1))), 128))
              ])) : k("", !0)
            ]),
            c.value.imageUrl ? (s(), n("div", cn, [
              e("img", {
                src: c.value.imageUrl,
                alt: ""
              }, null, 8, pn)
            ])) : k("", !0)
          ])
        ])) : (s(), n("div", mn, [
          y[9] || (y[9] = Oe('<div class="kb-web-browser-chrome" data-v-1d6293a0><span class="kb-web-dots" data-v-1d6293a0><span data-v-1d6293a0></span><span data-v-1d6293a0></span><span data-v-1d6293a0></span></span><div class="kb-web-url-bar" data-v-1d6293a0><span class="kb-web-lock" data-v-1d6293a0>🔒</span><span class="kb-web-origin" data-v-1d6293a0>yourapp.com</span></div></div>', 1)),
          e("div", vn, [
            y[8] || (y[8] = Oe('<div class="kb-web-header" data-v-1d6293a0><div class="kb-web-site-icon" data-v-1d6293a0>Y</div><div class="kb-web-site-meta" data-v-1d6293a0><div class="kb-web-site-name" data-v-1d6293a0>yourapp.com</div><div class="kb-web-site-time" data-v-1d6293a0>now</div></div></div>', 1)),
            e("div", bn, [
              c.value.title ? (s(), n("div", gn, f(c.value.title), 1)) : k("", !0),
              c.value.body ? (s(), n("div", yn, f(c.value.body), 1)) : k("", !0),
              c.value.imageUrl ? (s(), n("div", fn, [
                e("img", {
                  src: c.value.imageUrl,
                  alt: ""
                }, null, 8, hn)
              ])) : k("", !0),
              x.value && i.value ? (s(), n("div", kn, [
                e("iframe", {
                  src: i.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, _n),
                (fe = c.value.location) != null && fe.name || (ge = c.value.location) != null && ge.address ? (s(), n("div", wn, f(((be = c.value.location) == null ? void 0 : be.name) || ((xe = c.value.location) == null ? void 0 : xe.address)), 1)) : k("", !0)
              ])) : k("", !0)
            ]),
            c.value.actions && c.value.actions.length ? (s(), n("div", $n, [
              (s(!0), n(z, null, Y(c.value.actions, (me, he) => (s(), n("button", {
                key: me.id || he,
                type: "button",
                class: Ce(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(he) > 0 }])
              }, f(me.label || "Action"), 3))), 128))
            ])) : k("", !0)
          ])
        ]))
      ]);
    };
  }
}), Cn = /* @__PURE__ */ $e(xn, [["__scopeId", "data-v-1d6293a0"]]), Sn = { class: "kb-version-dialog" }, In = {
  key: 0,
  class: "kb-version-empty"
}, An = {
  key: 1,
  class: "kb-version-list"
}, Un = { class: "kb-version-item-label" }, Rn = ["onClick"], Ln = { class: "kb-version-actions" }, Bn = /* @__PURE__ */ ke({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(t, { emit: o }) {
    const u = o;
    function p(c) {
      try {
        return new Date(c).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return c;
      }
    }
    return (c, i) => t.open ? (s(), n("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: i[1] || (i[1] = Pt((x) => u("close"), ["escape"]))
    }, [
      e("div", Sn, [
        i[2] || (i[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        i[3] || (i[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        t.versions.length === 0 ? (s(), n("div", In, ' No versions saved yet. Use "Save as version" to create one. ')) : (s(), n("ul", An, [
          (s(!0), n(z, null, Y(t.versions, (x) => (s(), n("li", {
            key: x.id,
            class: "kb-version-item"
          }, [
            e("span", Un, f(x.label || p(x.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (w) => {
                u("restore", x.snapshot), u("close");
              }
            }, " Restore ", 8, Rn)
          ]))), 128))
        ])),
        e("div", Ln, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: i[0] || (i[0] = (x) => u("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : k("", !0);
  }
}), At = /* @__PURE__ */ $e(Bn, [["__scopeId", "data-v-ce35a513"]]), rt = [
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
], dt = [
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
], ut = [
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
], ct = [
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
], Tn = { class: "keos-notification-builder" }, Pn = { class: "kb-builder-top" }, Vn = { style: { margin: 0, paddingLeft: "1.25rem" } }, En = { class: "kb-push-layout" }, Nn = { class: "kb-push-sidebar" }, Mn = {
  key: 0,
  class: "kb-push-form"
}, On = {
  key: 0,
  class: "kb-hint-card"
}, Dn = { class: "kb-push-form-head" }, Wn = { class: "kb-push-form-head-row" }, Hn = ["value"], zn = {
  key: 1,
  class: "kb-push-form"
}, Fn = { class: "kb-push-canvas" }, qn = {
  key: 0,
  class: "kb-push-test-banner"
}, jn = { class: "kb-push-preview-chrome" }, Kn = { class: "kb-push-preview-controls" }, Yn = { class: "kb-push-preview-as" }, Jn = ["value"], Gn = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, Xn = ["aria-selected", "aria-controls", "onClick"], Qn = { class: "kb-push-preview-frame" }, Zn = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, el = { class: "kb-push-actions" }, tl = {
  key: 0,
  class: "kb-actions-note"
}, al = { class: "kb-push-actions-right" }, sl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, nl = { class: "kb-confirm-dialog" }, ll = { class: "kb-confirm-actions" }, ol = /* @__PURE__ */ ke({
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
  setup(t, { emit: o }) {
    const u = t, p = o, c = ae("android"), i = ae(""), x = ae(!1), w = ae(null), y = ae(!1), A = C(
      () => F.value.workflow_status ?? "draft"
    ), U = C(() => {
      const L = i.value;
      return L ? Ee.find((m) => m.id === L) ?? null : null;
    });
    function O(L) {
      const m = F.value, h = L.campaign.message ? { ...m.message, ...L.campaign.message } : m.message, M = L.campaign.delivery ? { ...m.delivery, ...L.campaign.delivery } : m.delivery;
      T({
        ...L.campaign,
        message: h,
        delivery: M
      }), w.value = null, x.value = !1;
    }
    function N(L) {
      const m = L.target.value;
      if (!m) return;
      const h = rt.find((M) => M.id === m);
      h && (ve.value ? (w.value = h, x.value = !0) : O(h), L.target.value = "");
    }
    function q(L) {
      F.value = L, y.value = !1;
    }
    const {
      campaign: F,
      dirty: ve,
      customValidatorErrors: Z,
      getValidationWithWarnings: J,
      update: T,
      updateMessage: re,
      updateDelivery: j,
      undo: fe,
      redo: ge,
      canUndo: be,
      canRedo: xe,
      resetMessage: me,
      resetDelivery: he,
      getPreview: B,
      characterLimits: le,
      hooks: se
    } = Fe({
      initial: u.modelValue,
      hooks: {
        ...u.hooks,
        customValidators: async (L) => {
          var M, te, de, b;
          const m = [];
          (M = L.name) != null && M.trim() || m.push("Template name is required"), (de = (te = L.message) == null ? void 0 : te.body) != null && de.trim() || m.push("Message body is required");
          const h = (b = u.hooks) != null && b.customValidators ? await u.hooks.customValidators(L) : [];
          return [...m, ...h];
        }
      },
      onDirty: () => p("change", F.value)
    }), { lastSavedAt: S } = qe(F, { channel: "push" });
    function _e(L) {
      (L.metaKey || L.ctrlKey) && L.key === "z" && (L.preventDefault(), L.shiftKey ? ge() : fe());
    }
    De(() => {
      window.addEventListener("keydown", _e);
    }), We(() => {
      window.removeEventListener("keydown", _e);
    }), Ae(F, (L) => p("update:modelValue", L), { deep: !0 });
    const R = ae(), g = ae(!0), oe = ae(!0);
    async function ue() {
      if (se.estimateReach)
        try {
          R.value = await se.estimateReach(F.value.audience);
        } catch {
          R.value = void 0;
        }
      se.canSend && (g.value = await Promise.resolve(se.canSend())), se.canSchedule && (oe.value = await Promise.resolve(se.canSchedule()));
    }
    ue(), Ae(() => F.value.audience, ue, { deep: !0 });
    const we = C(() => (Z.value, J(R.value))), ye = C(() => we.value.blockingErrors), v = C(() => we.value.warnings), _ = C(() => we.value.valid), I = C(
      () => le[c.value].title
    ), ce = C(() => le[c.value].body), pe = C(() => F.value.message.title.length), W = C(() => F.value.message.body.length), D = C(() => {
      if (pe.value > I.value)
        return `Title exceeds ${I.value} characters for ${c.value}.`;
    }), ee = C(() => {
      const L = ye.value.find(
        (m) => m.message === "Message body is required"
      );
      if (L) return L.message;
      if (W.value > ce.value)
        return `Body exceeds ${ce} characters for ${c.value}.`;
    }), Ie = C(
      () => F.value.template_type ?? "transactional"
    );
    function H(L) {
      T({ template_type: L });
    }
    function $(L) {
      T({
        name: L,
        tracking: { ...F.value.tracking ?? {}, campaign_name: L }
      });
    }
    function Q(L) {
      const m = ` {{ ${L.variable} }}`, h = F.value.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...h, L.variable]));
      L.field === "title" ? re({
        title: F.value.message.title + m,
        variables: M
      }) : re({
        body: F.value.message.body + m,
        variables: M
      });
    }
    function K() {
      _.value && p("save", F.value);
    }
    return (L, m) => (s(), n("div", Tn, [
      e("div", Pn, [
        Se(je, {
          "campaign-name": d(F).name,
          status: d(F).status,
          dirty: d(ve),
          "last-saved-at": d(S),
          "can-undo": d(be),
          "can-redo": d(xe),
          "workflow-status": A.value,
          "slugify-name": u.enforceSlugName,
          "onUpdate:campaignName": $,
          "onUpdate:workflowStatus": m[0] || (m[0] = (h) => d(T)({ workflow_status: h })),
          onUndo: d(fe),
          onRedo: d(ge)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        ye.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(ne).dangerBg,
            border: `1px solid ${d(ne).dangerBorder}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[12]}px ${d(X)[16]}px`,
            marginBottom: `${d(X)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(ne).danger })
          }, [
            (s(!0), n(z, null, Y(ye.value, (h) => (s(), n("li", {
              key: h.message
            }, f(h.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        v.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(ne).neutral.bg,
            border: `1px solid ${d(ne).neutral.border}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[12]}px ${d(X)[16]}px`,
            marginBottom: `${d(X)[16]}px`,
            fontSize: "0.875rem",
            color: d(ne).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(X)[4]}px` })
          }, "Warnings", 4),
          e("ul", Vn, [
            (s(!0), n(z, null, Y(v.value, (h) => (s(), n("li", {
              key: h.message
            }, f(h.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", En, [
        e("aside", Nn, [
          t.disabledSections.includes("message") ? k("", !0) : (s(), n("div", Mn, [
            !d(F).message.title && !d(F).message.body ? (s(), n("div", On, " Add a title and message below to get started. ")) : k("", !0),
            e("div", Dn, [
              m[13] || (m[13] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
              e("div", Wn, [
                Se(nt, {
                  "template-type": Ie.value,
                  onUpdate: H
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: N
                }, [
                  m[12] || (m[12] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(z, null, Y(d(rt), (h) => (s(), n("option", {
                    key: h.id,
                    value: h.id
                  }, f(h.label), 9, Hn))), 128))
                ], 32)
              ])
            ]),
            Se(Ha, {
              message: d(F).message,
              "title-count": pe.value,
              "body-count": W.value,
              "title-limit": I.value,
              "body-limit": ce.value,
              "selected-platform": c.value,
              "show-reset": !0,
              "title-error": D.value,
              "body-error": ee.value,
              onUpdate: d(re),
              onReset: m[1] || (m[1] = (h) => d(me)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            Se(It, {
              message: d(F).message,
              "variable-options": t.variableOptions,
              onUpdate: d(re),
              onInsertVariable: Q
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !t.designOnly && !t.disabledSections.includes("delivery") ? (s(), n("div", zn, [
            m[14] || (m[14] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            Se(As, {
              delivery: d(F).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: d(j),
              onReset: m[2] || (m[2] = (h) => d(he)())
            }, null, 8, ["delivery", "onUpdate"]),
            Se(Ns, {
              delivery: d(F).delivery,
              onUpdate: d(j)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : k("", !0)
        ]),
        e("main", Fn, [
          !t.designOnly && d(F).audience.test_mode ? (s(), n("div", qn, [...m[15] || (m[15] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            G(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", jn, [
            e("div", Kn, [
              e("label", Yn, [
                m[17] || (m[17] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Be(e("select", {
                  "onUpdate:modelValue": m[3] || (m[3] = (h) => i.value = h),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  m[16] || (m[16] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(z, null, Y(d(Ee), (h) => (s(), n("option", {
                    key: h.id,
                    value: h.id
                  }, f(h.label), 9, Jn))), 128))
                ], 512), [
                  [Me, i.value]
                ])
              ])
            ]),
            e("div", Gn, [
              (s(), n(z, null, Y(["android", "ios", "web"], (h) => e("button", {
                key: h,
                type: "button",
                class: Ce(["kb-push-device-btn", { "kb-push-device-btn--active": c.value === h }]),
                role: "tab",
                "aria-selected": c.value === h,
                "aria-controls": `kb-preview-panel-${h}`,
                onClick: (M) => c.value = h
              }, f(h.toUpperCase()), 11, Xn)), 64))
            ]),
            e("div", Qn, [
              !d(F).message.title && !d(F).message.body ? (s(), n("div", Zn, [...m[18] || (m[18] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (s(), Vt(Cn, {
                key: 1,
                "get-preview": d(B),
                "selected-platform": c.value,
                "preview-profile": U.value,
                "onUpdate:selectedPlatform": m[4] || (m[4] = (h) => c.value = h)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile"]))
            ])
          ])
        ])
      ]),
      e("footer", el, [
        u.actionsNote ? (s(), n("div", tl, f(u.actionsNote), 1)) : k("", !0),
        e("div", al, [
          !t.designOnly && t.showHistory ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[5] || (m[5] = (h) => y.value = !0)
          }, " Version history ")) : k("", !0),
          !t.designOnly && t.showSaveVersion ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[6] || (m[6] = (h) => p("save-version", JSON.parse(JSON.stringify(d(F)))))
          }, " Save as version ")) : k("", !0),
          t.showDuplicate ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: m[7] || (m[7] = (h) => p("duplicate", JSON.parse(JSON.stringify(d(F)))))
          }, " Duplicate ")) : k("", !0),
          t.showSave ? (s(), n("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: K
          }, " Save ")) : k("", !0),
          t.showClose ? (s(), n("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: m[8] || (m[8] = (h) => p("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      x.value ? (s(), n("div", sl, [
        e("div", nl, [
          m[19] || (m[19] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          m[20] || (m[20] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", ll, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: m[9] || (m[9] = (h) => {
                x.value = !1, w.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: m[10] || (m[10] = (h) => w.value && O(w.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0),
      Se(At, {
        open: y.value,
        versions: t.versions,
        onClose: m[11] || (m[11] = (h) => y.value = !1),
        onRestore: q
      }, null, 8, ["open", "versions"])
    ]));
  }
}), Ut = /* @__PURE__ */ $e(ol, [["__scopeId", "data-v-64f25140"]]), il = { class: "kb-section" }, rl = { class: "kb-section__head" }, dl = { class: "kb-summary-bar" }, ul = { class: "kb-pill kb-pill--category" }, cl = { class: "kb-pill kb-pill--format" }, pl = { class: "kb-pill kb-pill--status" }, ml = { class: "kb-field" }, vl = ["value"], bl = { class: "kb-field" }, gl = { class: "kb-label" }, yl = { class: "kb-helper" }, fl = ["value"], hl = ["value"], kl = { class: "kb-field" }, _l = ["value"], wl = { class: "kb-field kb-field--inline" }, $l = { class: "kb-field-half" }, xl = ["value"], Cl = { class: "kb-field" }, Sl = ["value"], Il = {
  key: 0,
  class: "kb-field"
}, Al = { class: "kb-label" }, Ul = ["value"], Rl = {
  key: 1,
  class: "kb-field"
}, Ll = ["value"], Bl = {
  key: 2,
  class: "kb-field"
}, Tl = ["value"], Pl = {
  key: 3,
  class: "kb-field"
}, Vl = ["value"], El = {
  key: 4,
  class: "kb-field kb-field--inline"
}, Nl = { class: "kb-location-row" }, Ml = ["value"], Ol = ["value"], Dl = ["value"], Wl = ["value"], Hl = {
  key: 5,
  class: "kb-field"
}, zl = ["value"], Fl = {
  key: 6,
  class: "kb-field"
}, ql = ["value"], jl = {
  key: 7,
  class: "kb-field"
}, Kl = ["value"], Yl = ["value"], Jl = {
  key: 8,
  class: "kb-field"
}, Gl = { class: "kb-wa-buttons" }, Xl = ["value", "onInput"], Ql = ["value", "onInput"], Zl = ["value", "onInput"], eo = ["value", "onInput"], to = ["onClick"], ao = ["disabled"], so = {
  key: 9,
  class: "kb-field"
}, no = { class: "kb-wa-buttons" }, lo = ["value", "onInput"], oo = ["value", "onInput"], io = ["onClick"], ro = {
  key: 10,
  class: "kb-field"
}, uo = ["value"], co = ["value"], po = { class: "kb-field" }, mo = { class: "kb-label" }, vo = ["value"], bo = {
  key: 11,
  class: "kb-field kb-wa-template-fields"
}, go = { class: "kb-wa-fields-list" }, yo = { class: "kb-wa-field-name" }, fo = { class: "kb-wa-field-status" }, ho = { class: "kb-field" }, ko = ["value"], _o = { class: "kb-field" }, wo = { class: "kb-wa-buttons" }, $o = ["value", "onInput"], xo = ["value", "onChange"], Co = ["value", "onInput"], So = ["value", "onInput"], Io = {
  key: 2,
  class: "kb-opt-out-note"
}, Ao = ["onClick"], Uo = ["disabled"], Je = 60, Ge = 1024, Xe = 60, Qe = 10, pt = 10, Ro = /* @__PURE__ */ ke({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: o }) {
    const u = t, p = o, c = [
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
    ], i = C(() => u.message), x = C(() => i.value.template_type ?? "text"), w = C(() => i.value.header_type ?? "none"), y = C(() => String(i.value.header ?? "")), A = C(() => String(i.value.body ?? "")), U = C(() => String(i.value.footer ?? "")), O = C(() => i.value.buttons ?? []), N = C(() => i.value.products ?? []), q = C(() => i.value.cards ?? []), F = C(() => {
      const R = c.find((g) => g.value === x.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), ve = C(() => {
      const R = String(i.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), Z = C(() => {
      const R = c.find((g) => g.value === x.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), J = C(() => i.value.template_name ? A.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function T(R) {
      if (!R || typeof R != "string") return [];
      const g = /\{\{\s*([^}]+?)\s*\}\}/g, oe = /* @__PURE__ */ new Set();
      let ue;
      for (; (ue = g.exec(R)) !== null; ) oe.add(ue[1].trim());
      return Array.from(oe);
    }
    const re = C(() => {
      const R = u.message.header ?? "", g = u.message.body ?? u.message.body ?? "", oe = new Set(u.message.variables ?? []), ue = [...T(R), ...T(g)];
      return Array.from(new Set(ue)).map((ye) => ({ name: ye, configured: oe.has(ye) }));
    });
    function j(R) {
      p("update", R);
    }
    function fe(R) {
      const g = {
        template_category: R || void 0
      };
      R === "authentication" && x.value !== "auth" && (g.template_type = "auth"), j(g);
    }
    function ge(R) {
      const g = { template_type: R };
      R === "auth" && (g.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (g.header_type = R), j(g);
    }
    function be(R, g) {
      var ue;
      const oe = [...O.value];
      oe[R] = {
        ...oe[R],
        id: ((ue = oe[R]) == null ? void 0 : ue.id) || `btn_${R + 1}`,
        ...g
      }, j({ buttons: oe });
    }
    function xe(R) {
      const g = [...O.value];
      g.splice(R, 1), j({ buttons: g });
    }
    function me() {
      const R = [...O.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), j({ buttons: R });
    }
    function he(R, g) {
      var ue;
      const oe = [...N.value];
      oe[R] = {
        ...oe[R],
        id: ((ue = oe[R]) == null ? void 0 : ue.id) || `prod_${R + 1}`,
        ...g
      }, j({ products: oe });
    }
    function B(R) {
      const g = [...N.value];
      g.splice(R, 1), j({ products: g });
    }
    function le() {
      const R = [...N.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), j({ products: R });
    }
    function se(R, g) {
      var ue;
      const oe = [...q.value];
      oe[R] = {
        ...oe[R],
        id: ((ue = oe[R]) == null ? void 0 : ue.id) || `card_${R + 1}`,
        ...g
      }, j({ cards: oe });
    }
    function S(R) {
      const g = [...q.value];
      g.splice(R, 1), j({ cards: g });
    }
    function _e() {
      const R = [...q.value];
      R.push({
        id: `card_${R.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), j({ cards: R });
    }
    return (R, g) => {
      var oe, ue, we, ye;
      return s(), n("section", il, [
        e("div", rl, [
          g[22] || (g[22] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
          t.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: g[0] || (g[0] = (v) => R.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        g[50] || (g[50] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
        e("div", dl, [
          e("span", ul, f(ve.value), 1),
          e("span", cl, f(Z.value), 1),
          e("span", pl, f(J.value), 1)
        ]),
        e("div", ml, [
          g[24] || (g[24] = e("label", { class: "kb-label" }, [
            G(" Category (purpose) "),
            e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.value.template_category ?? "",
            onChange: g[1] || (g[1] = (v) => fe(v.target.value))
          }, [...g[23] || (g[23] = [
            e("option", { value: "" }, "Select category", -1),
            e("option", { value: "marketing" }, "Marketing", -1),
            e("option", { value: "utility" }, "Utility", -1),
            e("option", { value: "authentication" }, "Authentication", -1)
          ])], 40, vl)
        ]),
        e("div", bl, [
          e("label", gl, [
            g[25] || (g[25] = G(" Functional format ", -1)),
            e("span", yl, f(F.value), 1)
          ]),
          e("select", {
            class: "kb-select",
            value: x.value,
            onChange: g[2] || (g[2] = (v) => ge(v.target.value))
          }, [
            (s(), n(z, null, Y(c, (v) => e("option", {
              key: v.value,
              value: v.value
            }, f(v.label), 9, hl)), 64))
          ], 40, fl)
        ]),
        e("div", kl, [
          g[26] || (g[26] = e("label", { class: "kb-label" }, [
            G(" Template name "),
            e("span", { class: "kb-helper" }, "Match the approved template name in your WhatsApp Business provider.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_update_1",
            value: i.value.template_name ?? "",
            onInput: g[3] || (g[3] = (v) => j({
              template_name: v.target.value || void 0
            }))
          }, null, 40, _l)
        ]),
        e("div", wl, [
          e("div", $l, [
            g[27] || (g[27] = e("label", { class: "kb-label" }, [
              G(" Template language "),
              e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
            ], -1)),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "e.g. en_US",
              value: i.value.template_language ?? "",
              onInput: g[4] || (g[4] = (v) => j({
                template_language: v.target.value || void 0
              }))
            }, null, 40, xl)
          ]),
          e("div", { class: "kb-field-half" }, [
            e("div", { class: "kb-meta-card" }, [
              g[28] || (g[28] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
              e("ul", { class: "kb-meta-list" }, [
                e("li", null, "Header text: " + f(Je) + " chars"),
                e("li", null, "Body: " + f(Ge) + " chars"),
                e("li", null, "Footer: " + f(Xe) + " chars"),
                e("li", null, "Buttons: up to " + f(Qe))
              ])
            ])
          ])
        ]),
        e("div", Cl, [
          g[30] || (g[30] = e("label", { class: "kb-label" }, [
            G(" Header component (optional) "),
            e("span", { class: "kb-helper" }, "Header can be text or rich media.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: w.value,
            onChange: g[5] || (g[5] = (v) => j({ header_type: v.target.value }))
          }, [...g[29] || (g[29] = [
            Oe('<option value="none" data-v-c91895f8>No header</option><option value="text" data-v-c91895f8>Text header</option><option value="image" data-v-c91895f8>Image header</option><option value="video" data-v-c91895f8>Video header</option><option value="document" data-v-c91895f8>Document header</option>', 5)
          ])], 40, Sl)
        ]),
        w.value === "text" ? (s(), n("div", Il, [
          e("label", Al, [
            g[31] || (g[31] = G(" Header text ", -1)),
            e("span", {
              class: Ce(["kb-counter", { "kb-counter--warn": y.value.length > Je }])
            }, f(y.value.length) + "/" + f(Je), 3)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Order update",
            value: y.value,
            onInput: g[6] || (g[6] = (v) => j({
              header: v.target.value || void 0
            }))
          }, null, 40, Ul)
        ])) : k("", !0),
        ["image", "video", "document"].includes(w.value) || ["image", "video", "document"].includes(x.value) ? (s(), n("div", Rl, [
          g[32] || (g[32] = e("label", { class: "kb-label" }, [
            G(" Media URL "),
            e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: i.value.media_url ?? "",
            onInput: g[7] || (g[7] = (v) => j({
              media_url: v.target.value || void 0
            }))
          }, null, 40, Ll)
        ])) : k("", !0),
        w.value === "document" || x.value === "document" ? (s(), n("div", Bl, [
          g[33] || (g[33] = e("label", { class: "kb-label" }, [
            G(" Document filename "),
            e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. invoice.pdf",
            value: i.value.document_filename ?? "",
            onInput: g[8] || (g[8] = (v) => j({
              document_filename: v.target.value || void 0
            }))
          }, null, 40, Tl)
        ])) : k("", !0),
        ["image", "video", "document"].includes(w.value) || ["image", "video", "document"].includes(x.value) ? (s(), n("div", Pl, [
          g[34] || (g[34] = e("label", { class: "kb-label" }, [
            G(" Media caption (optional) "),
            e("span", { class: "kb-helper" }, "Short line shown below the media.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Your order is on the way",
            value: i.value.media_caption ?? "",
            onInput: g[9] || (g[9] = (v) => j({
              media_caption: v.target.value || void 0
            }))
          }, null, 40, Vl)
        ])) : k("", !0),
        x.value === "location" ? (s(), n("div", El, [
          g[35] || (g[35] = e("label", { class: "kb-label" }, [
            G(" Location "),
            e("span", { class: "kb-helper" }, "Coordinates and label for the location card.")
          ], -1)),
          e("div", Nl, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((oe = i.value.location) == null ? void 0 : oe.lat) ?? "",
              onInput: g[10] || (g[10] = (v) => {
                const _ = { ...i.value.location ?? {} };
                _.lat = Number(v.target.value), j({ location: _ });
              })
            }, null, 40, Ml),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((ue = i.value.location) == null ? void 0 : ue.lon) ?? "",
              onInput: g[11] || (g[11] = (v) => {
                const _ = { ...i.value.location ?? {} };
                _.lon = Number(v.target.value), j({ location: _ });
              })
            }, null, 40, Ol)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name",
            value: ((we = i.value.location) == null ? void 0 : we.name) ?? "",
            onInput: g[12] || (g[12] = (v) => {
              const _ = { ...i.value.location ?? {} };
              _.name = v.target.value || void 0, j({ location: _ });
            })
          }, null, 40, Dl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((ye = i.value.location) == null ? void 0 : ye.address) ?? "",
            onInput: g[13] || (g[13] = (v) => {
              const _ = { ...i.value.location ?? {} };
              _.address = v.target.value || void 0, j({ location: _ });
            })
          }, null, 40, Wl)
        ])) : k("", !0),
        x.value === "coupon" ? (s(), n("div", Hl, [
          g[36] || (g[36] = e("label", { class: "kb-label" }, [
            G(" Coupon code "),
            e("span", { class: "kb-helper" }, "Single coupon code placeholder used in the template.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. SAVE20",
            value: i.value.coupon_code ?? "",
            onInput: g[14] || (g[14] = (v) => j({
              coupon_code: v.target.value || void 0
            }))
          }, null, 40, zl)
        ])) : k("", !0),
        x.value === "lto" ? (s(), n("div", Fl, [
          g[37] || (g[37] = e("label", { class: "kb-label" }, [
            G(" Offer expiry "),
            e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
          ], -1)),
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: i.value.lto_expiry ?? "",
            onInput: g[15] || (g[15] = (v) => j({
              lto_expiry: v.target.value || void 0
            }))
          }, null, 40, ql)
        ])) : k("", !0),
        x.value === "flow" ? (s(), n("div", jl, [
          g[38] || (g[38] = e("label", { class: "kb-label" }, [
            G(" Flow "),
            e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow ID",
            value: i.value.flow_id ?? "",
            onInput: g[16] || (g[16] = (v) => j({
              flow_id: v.target.value || void 0
            }))
          }, null, 40, Kl),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Flow CTA label (e.g. Start booking)",
            value: i.value.flow_cta_label ?? "",
            onInput: g[17] || (g[17] = (v) => j({
              flow_cta_label: v.target.value || void 0
            }))
          }, null, 40, Yl)
        ])) : k("", !0),
        x.value === "carousel" ? (s(), n("div", Jl, [
          e("label", { class: "kb-label" }, [
            g[39] || (g[39] = G(" Carousel cards ", -1)),
            e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + f(pt) + " cards.")
          ]),
          e("div", Gl, [
            (s(!0), n(z, null, Y(q.value, (v, _) => (s(), n("div", {
              key: v.id || _,
              class: "kb-card-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Card title",
                value: v.title ?? "",
                onInput: (I) => se(Number(_), { title: I.target.value })
              }, null, 40, Xl),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Card media URL",
                value: v.media_url ?? "",
                onInput: (I) => se(Number(_), { media_url: I.target.value })
              }, null, 40, Ql),
              e("input", {
                type: "text",
                class: "kb-input",
                placeholder: "Button label",
                value: v.button_label ?? "",
                onInput: (I) => se(Number(_), { button_label: I.target.value })
              }, null, 40, Zl),
              e("input", {
                type: "url",
                class: "kb-input",
                placeholder: "Button URL",
                value: v.button_url ?? "",
                onInput: (I) => se(Number(_), { button_url: I.target.value })
              }, null, 40, eo),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (I) => S(Number(_))
              }, "Remove", 8, to)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: q.value.length >= pt,
              onClick: _e
            }, " Add card ", 8, ao)
          ])
        ])) : k("", !0),
        ["mpm", "catalog"].includes(x.value) ? (s(), n("div", so, [
          g[40] || (g[40] = e("label", { class: "kb-label" }, [
            G(" Products "),
            e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
          ], -1)),
          e("div", no, [
            (s(!0), n(z, null, Y(N.value, (v, _) => (s(), n("div", {
              key: v.id || _,
              class: "kb-product-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Product ID",
                value: v.productId,
                onInput: (I) => he(Number(_), { productId: I.target.value })
              }, null, 40, lo),
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-target",
                placeholder: "Section title (optional)",
                value: v.sectionTitle,
                onInput: (I) => he(Number(_), { sectionTitle: I.target.value || void 0 })
              }, null, 40, oo),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (I) => B(Number(_))
              }, " Remove ", 8, io)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              onClick: le
            }, " Add product ")
          ])
        ])) : k("", !0),
        x.value === "auth" ? (s(), n("div", ro, [
          g[42] || (g[42] = e("label", { class: "kb-label" }, [
            G(" Authentication template "),
            e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
          ], -1)),
          e("select", {
            class: "kb-select",
            value: i.value.auth_type ?? "otp",
            onChange: g[18] || (g[18] = (v) => j({
              auth_type: v.target.value
            }))
          }, [...g[41] || (g[41] = [
            e("option", { value: "otp" }, "One-time password (OTP)", -1),
            e("option", { value: "login" }, "Login approval", -1)
          ])], 40, uo),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Code label (e.g. Your code is {{1}})",
            value: i.value.auth_label ?? "",
            onInput: g[19] || (g[19] = (v) => j({
              auth_label: v.target.value || void 0
            }))
          }, null, 40, co)
        ])) : k("", !0),
        e("div", po, [
          e("label", mo, [
            g[43] || (g[43] = G(" Body ", -1)),
            g[44] || (g[44] = e("span", { class: "kb-helper" }, " Body is required. Use the exact approved text with variables like " + f(1) + ", " + f(2) + ". ", -1)),
            e("span", {
              class: Ce(["kb-counter", { "kb-counter--warn": A.value.length > Ge }])
            }, f(A.value.length) + "/" + f(Ge), 3)
          ]),
          e("textarea", {
            class: "kb-textarea",
            rows: "4",
            placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
            value: A.value,
            onInput: g[20] || (g[20] = (v) => j({
              body: v.target.value || void 0
            }))
          }, null, 40, vo)
        ]),
        re.value.length > 0 ? (s(), n("div", bo, [
          g[45] || (g[45] = e("label", { class: "kb-label" }, "Template fields", -1)),
          g[46] || (g[46] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
          e("ul", go, [
            (s(!0), n(z, null, Y(re.value, (v) => (s(), n("li", {
              key: v.name,
              class: Ce(["kb-wa-field-item", { "kb-wa-field-item--ok": v.configured }])
            }, [
              e("span", yo, f(v.name), 1),
              e("span", fo, f(v.configured ? "Configured" : "Missing"), 1)
            ], 2))), 128))
          ])
        ])) : k("", !0),
        e("div", ho, [
          g[47] || (g[47] = e("label", { class: "kb-label" }, [
            G(" Footer (optional) "),
            e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. Reply STOP to unsubscribe",
            value: U.value,
            onInput: g[21] || (g[21] = (v) => j({
              footer: v.target.value || void 0
            }))
          }, null, 40, ko),
          e("div", {
            class: Ce(["kb-counter kb-counter--inline", { "kb-counter--warn": U.value.length > Xe }])
          }, f(U.value.length) + "/" + f(Xe), 3)
        ]),
        e("div", _o, [
          e("label", { class: "kb-label" }, [
            g[48] || (g[48] = G(" Buttons (optional) ", -1)),
            e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + f(Qe) + " buttons. ")
          ]),
          e("div", wo, [
            (s(!0), n(z, null, Y(O.value, (v, _) => (s(), n("div", {
              key: v.id || _,
              class: "kb-wa-button-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--btn-label",
                placeholder: "Button label (e.g. View order)",
                value: v.label,
                onInput: (I) => be(Number(_), { label: I.target.value })
              }, null, 40, $o),
              e("select", {
                class: "kb-select kb-select--btn-type",
                value: v.type ?? "quick_reply",
                onChange: (I) => be(Number(_), { type: I.target.value })
              }, [...g[49] || (g[49] = [
                e("option", { value: "quick_reply" }, "Quick reply", -1),
                e("option", { value: "url" }, "Visit URL", -1),
                e("option", { value: "call" }, "Call phone", -1),
                e("option", { value: "opt_out" }, "Marketing opt-out", -1)
              ])], 40, xo),
              v.type === "url" ? (s(), n("input", {
                key: 0,
                type: "url",
                class: "kb-input kb-input--btn-target",
                placeholder: "https://...",
                value: v.url,
                onInput: (I) => be(Number(_), { url: I.target.value || void 0 })
              }, null, 40, Co)) : v.type === "call" ? (s(), n("input", {
                key: 1,
                type: "tel",
                class: "kb-input kb-input--btn-target",
                placeholder: "+1 555 123 4567",
                value: v.phone,
                onInput: (I) => be(Number(_), { phone: I.target.value || void 0 })
              }, null, 40, So)) : v.type === "opt_out" ? (s(), n("span", Io, " Sends a built-in opt-out action. ")) : k("", !0),
              e("button", {
                type: "button",
                class: "kb-wa-btn-remove",
                onClick: (I) => xe(Number(_))
              }, " Remove ", 8, Ao)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-wa-btn-add",
              disabled: O.value.length >= Qe,
              onClick: me
            }, " Add button ", 8, Uo)
          ])
        ])
      ]);
    };
  }
}), Lo = /* @__PURE__ */ $e(Ro, [["__scopeId", "data-v-c91895f8"]]), Bo = { class: "wa-preview-root" }, To = { class: "wa-device" }, Po = { class: "wa-app" }, Vo = { class: "wa-topbar" }, Eo = { class: "wa-chat-meta" }, No = { class: "wa-chat-title" }, Mo = { class: "wa-thread" }, Oo = { class: "wa-row wa-row--out" }, Do = { class: "wa-bubble wa-bubble--out wa-template" }, Wo = { class: "wa-template-meta" }, Ho = { key: 0 }, zo = {
  key: 0,
  class: "wa-media"
}, Fo = {
  key: 0,
  class: "wa-media-meta"
}, qo = {
  key: 1,
  class: "wa-media-meta"
}, jo = {
  key: 1,
  class: "wa-header"
}, Ko = ["innerHTML"], Yo = {
  key: 2,
  class: "wa-media-caption"
}, Jo = {
  key: 3,
  class: "wa-location-inline"
}, Go = {
  key: 4,
  class: "wa-footer"
}, Xo = {
  key: 5,
  class: "wa-coupon"
}, Qo = {
  key: 6,
  class: "wa-lto"
}, Zo = {
  key: 7,
  class: "wa-auth"
}, ei = { class: "wa-auth-code" }, ti = {
  key: 8,
  class: "wa-flow"
}, ai = {
  key: 0,
  class: "wa-flow-id"
}, si = { class: "wa-flow-cta" }, ni = {
  key: 9,
  class: "wa-products"
}, li = { class: "wa-product-name" }, oi = { class: "wa-product-price" }, ii = {
  key: 0,
  class: "wa-product-more"
}, ri = {
  key: 10,
  class: "wa-buttons"
}, di = /* @__PURE__ */ ke({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(t) {
    const o = t;
    function u(w) {
      return String(w).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const p = C(() => {
      var A;
      const w = ((A = o.template) == null ? void 0 : A.body) ?? "";
      return u(w).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), c = C(() => {
      var w;
      return ((w = o.template) == null ? void 0 : w.templateName) || "Business Account";
    }), i = C(() => {
      var y;
      const w = (y = o.template) == null ? void 0 : y.templateCategory;
      return w ? w.charAt(0).toUpperCase() + w.slice(1) : "";
    }), x = C(() => {
      var w;
      return ((w = o.template) == null ? void 0 : w.format) || "text";
    });
    return (w, y) => {
      var A, U, O, N;
      return s(), n("div", Bo, [
        e("div", To, [
          y[11] || (y[11] = e("div", { class: "wa-notch" }, null, -1)),
          e("div", Po, [
            e("div", Vo, [
              y[1] || (y[1] = e("div", { class: "wa-left" }, [
                e("span", { class: "wa-back" }, "‹"),
                e("div", { class: "wa-avatar" }, [
                  e("span", { class: "wa-avatar-icon" }, "B")
                ])
              ], -1)),
              e("div", Eo, [
                e("div", No, f(c.value), 1),
                y[0] || (y[0] = e("div", { class: "wa-chat-status" }, "Business account", -1))
              ]),
              y[2] || (y[2] = e("div", {
                class: "wa-actions",
                "aria-hidden": "true"
              }, [
                e("span", null, "📹"),
                e("span", null, "📞"),
                e("span", null, "⋮")
              ], -1))
            ]),
            e("div", Mo, [
              y[8] || (y[8] = Oe('<div class="wa-encryption-banner" data-v-e2408df9> Messages and calls are end-to-end encrypted. No one outside this chat can read or listen. </div><div class="wa-date-chip" data-v-e2408df9>Today</div><div class="wa-row wa-row--in" data-v-e2408df9><div class="wa-bubble wa-bubble--in" data-v-e2408df9><div class="wa-bubble-text" data-v-e2408df9>Hello, I just placed an order. Any update?</div><div class="wa-meta" data-v-e2408df9>12:29</div></div></div>', 3)),
              e("div", Oo, [
                e("div", Do, [
                  e("div", Wo, [
                    e("span", null, f(i.value || "utility"), 1),
                    e("span", null, f(x.value), 1),
                    t.template.templateLanguage ? (s(), n("span", Ho, f(t.template.templateLanguage), 1)) : k("", !0)
                  ]),
                  t.template.header && t.template.header.type !== "text" ? (s(), n("div", zo, [
                    e("strong", null, f(t.template.header.type.toUpperCase()), 1),
                    t.template.header.url ? (s(), n("span", Fo, f(t.template.header.url), 1)) : t.template.header.filename ? (s(), n("span", qo, f(t.template.header.filename), 1)) : k("", !0)
                  ])) : k("", !0),
                  t.template.header && t.template.header.type === "text" ? (s(), n("div", jo, f(t.template.header.text), 1)) : k("", !0),
                  e("div", {
                    class: "wa-body",
                    innerHTML: p.value
                  }, null, 8, Ko),
                  t.template.mediaCaption ? (s(), n("div", Yo, f(t.template.mediaCaption), 1)) : k("", !0),
                  t.template.location ? (s(), n("div", Jo, [
                    y[3] || (y[3] = e("span", { class: "wa-pin" }, "📍", -1)),
                    e("span", null, f(t.template.location.name || t.template.location.address || `${t.template.location.lat}, ${t.template.location.lng}`), 1)
                  ])) : k("", !0),
                  t.template.footer ? (s(), n("div", Go, f(t.template.footer), 1)) : k("", !0),
                  (A = t.template.coupon) != null && A.code ? (s(), n("div", Xo, [
                    y[4] || (y[4] = G(" Coupon: ", -1)),
                    e("strong", null, f(t.template.coupon.code), 1)
                  ])) : k("", !0),
                  t.template.limitedOffer ? (s(), n("div", Qo, " Limited-time offer ends: " + f(t.template.limitedOffer), 1)) : k("", !0),
                  (U = t.template.auth) != null && U.code ? (s(), n("div", Zo, [
                    y[5] || (y[5] = e("span", { class: "wa-auth-label" }, "Verification code", -1)),
                    e("strong", ei, f(t.template.auth.code), 1)
                  ])) : k("", !0),
                  t.template.flow ? (s(), n("div", ti, [
                    y[6] || (y[6] = e("span", { class: "wa-flow-label" }, "WhatsApp Flow", -1)),
                    t.template.flow.id ? (s(), n("span", ai, "ID: " + f(t.template.flow.id), 1)) : k("", !0),
                    e("span", si, f(t.template.flow.ctaLabel || "Open flow"), 1)
                  ])) : k("", !0),
                  (O = t.template.multiProduct) != null && O.length ? (s(), n("div", ni, [
                    (s(!0), n(z, null, Y(t.template.multiProduct.slice(0, 3), (q, F) => (s(), n("div", {
                      key: F,
                      class: "wa-product"
                    }, [
                      e("div", li, f(q.name || "Product"), 1),
                      e("div", oi, f(q.price || "-"), 1)
                    ]))), 128)),
                    t.template.multiProduct.length > 3 ? (s(), n("div", ii, " +" + f(t.template.multiProduct.length - 3) + " more ", 1)) : k("", !0)
                  ])) : k("", !0),
                  (N = t.template.buttons) != null && N.length ? (s(), n("div", ri, [
                    (s(!0), n(z, null, Y(t.template.buttons, (q, F) => (s(), n("div", {
                      key: F,
                      class: "wa-btn"
                    }, f(q.text), 1))), 128))
                  ])) : k("", !0),
                  y[7] || (y[7] = e("div", { class: "wa-meta" }, [
                    G("12:34 "),
                    e("span", { class: "wa-ticks" }, "✓✓")
                  ], -1))
                ])
              ]),
              y[9] || (y[9] = e("div", { class: "wa-row wa-row--in" }, [
                e("div", { class: "wa-bubble wa-bubble--in" }, [
                  e("div", { class: "wa-bubble-text" }, "Perfect, thank you."),
                  e("div", { class: "wa-meta" }, "12:35")
                ])
              ], -1))
            ]),
            y[10] || (y[10] = e("div", { class: "wa-inputbar" }, [
              e("span", null, "😊"),
              e("span", { class: "wa-placeholder" }, "Message"),
              e("span", null, "📎"),
              e("span", null, "📷"),
              e("button", {
                class: "wa-mic",
                type: "button",
                "aria-label": "voice"
              }, "🎤")
            ], -1))
          ])
        ])
      ]);
    };
  }
}), ui = /* @__PURE__ */ $e(di, [["__scopeId", "data-v-e2408df9"]]), ci = { class: "keos-whatsapp-builder" }, pi = { class: "kb-builder-top" }, mi = { style: { margin: 0, paddingLeft: "1.25rem" } }, vi = { class: "kb-wa-layout" }, bi = { class: "kb-wa-sidebar" }, gi = {
  key: 0,
  class: "kb-wa-form"
}, yi = { class: "kb-wa-form-head" }, fi = { class: "kb-wa-form-head-row" }, hi = ["value"], ki = { class: "kb-wa-canvas" }, _i = {
  key: 0,
  class: "kb-wa-test-banner"
}, wi = { class: "kb-wa-preview-chrome" }, $i = { class: "kb-push-preview-controls" }, xi = { class: "kb-push-preview-as" }, Ci = ["value"], Si = { class: "kb-wa-preview-frame" }, Ii = { class: "kb-wa-actions" }, Ai = {
  key: 0,
  class: "kb-actions-note"
}, Ui = { class: "kb-wa-actions-right" }, Ri = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Li = { class: "kb-confirm-dialog" }, Bi = { class: "kb-confirm-actions" }, mt = 60, vt = 1024, bt = 60, gt = 10, yt = 10, Ti = /* @__PURE__ */ ke({
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
  setup(t, { emit: o }) {
    function u(v) {
      var Q, K, L, m, h;
      const _ = [], I = v.message, ce = (I.template_category ?? "").toString().trim(), pe = (I.template_type ?? "text").toString(), W = (I.header_type ?? "none").toString(), D = (I.header ?? "").toString(), ee = (I.body ?? "").toString(), Ie = (I.footer ?? "").toString(), H = Array.isArray(I.buttons) ? I.buttons : [], $ = Array.isArray(I.cards) ? I.cards : [];
      return (Q = v.name) != null && Q.trim() || _.push("Template name is required"), (K = I.template_name) != null && K.trim() || _.push("WhatsApp template name is required"), ce || _.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), ee.trim() || _.push("Body is required"), W === "text" && D.length > mt && _.push(`Header text cannot exceed ${mt} characters`), ee.length > vt && _.push(`Body cannot exceed ${vt} characters`), Ie.length > bt && _.push(`Footer cannot exceed ${bt} characters`), H.length > gt && _.push(`Buttons cannot exceed ${gt}`), (pe === "image" || pe === "video" || pe === "document" || W === "image" || W === "video" || W === "document") && !I.media_url && _.push("Media URL is required for rich media templates"), ce === "authentication" && pe !== "auth" && _.push("Authentication category must use Authentication format"), pe === "auth" && !((L = I.auth_label) != null && L.trim()) && !ee.includes("{{") && _.push("Authentication templates should include a code label or placeholder variable"), pe === "lto" && !I.lto_expiry && _.push("Limited-time offer requires an expiry"), (pe === "mpm" || pe === "catalog") && !((m = I.products) != null && m.length) && _.push("Catalog and multi-product templates require at least one product"), pe === "flow" && !((h = I.flow_id) != null && h.trim()) && _.push("WhatsApp Flow format requires a flow ID"), pe === "carousel" && ($.length ? $.length > yt && _.push(`Carousel supports up to ${yt} cards`) : _.push("Carousel format requires at least one card")), _;
    }
    const p = t, c = o, {
      campaign: i,
      dirty: x,
      customValidatorErrors: w,
      getValidationWithWarnings: y,
      update: A,
      updateMessage: U,
      undo: O,
      redo: N,
      canUndo: q,
      canRedo: F,
      resetMessage: ve,
      hooks: Z
    } = Fe({
      initial: p.modelValue,
      hooks: {
        ...p.hooks,
        customValidators: async (v) => {
          var ce;
          const _ = u(v), I = (ce = p.hooks) != null && ce.customValidators ? await p.hooks.customValidators(v) : [];
          return [..._, ...I];
        }
      },
      onDirty: () => c("change", i.value)
    }), { lastSavedAt: J } = qe(i, { channel: "whatsapp" });
    function T(v) {
      (v.metaKey || v.ctrlKey) && v.key === "z" && (v.preventDefault(), v.shiftKey ? N() : O());
    }
    De(() => {
      window.addEventListener("keydown", T);
    }), We(() => {
      window.removeEventListener("keydown", T);
    }), Ae(i, (v) => c("update:modelValue", v), { deep: !0 });
    const re = ae(), j = ae(!0);
    async function fe() {
      if (Z.estimateReach)
        try {
          re.value = await Z.estimateReach(i.value.audience);
        } catch {
          re.value = void 0;
        }
      Z.canSend && (j.value = await Promise.resolve(Z.canSend()));
    }
    fe(), Ae(() => i.value.audience, fe, { deep: !0 });
    const ge = C(() => (w.value, y(re.value))), be = C(() => ge.value.blockingErrors), xe = C(() => ge.value.warnings), me = C(() => ge.value.valid), he = ae(""), B = ae(!1), le = ae(null), se = C(() => {
      const v = he.value;
      return v ? Ee.find((_) => _.id === v) ?? null : null;
    }), S = C(() => {
      const v = i.value.message.body ?? "";
      return se.value ? Pe(v, se.value.data) : v;
    }), _e = C(() => {
      const v = i.value.message.header ?? "";
      return se.value ? Pe(v, se.value.data) : v;
    }), R = C(() => {
      const v = i.value.message, _ = v.template_type ?? "text", I = v.header_type ?? "none";
      let ce, pe, W, D, ee, Ie, H;
      (_ === "image" || I === "image") && v.media_url ? ce = { type: "image", url: v.media_url } : (_ === "video" || I === "video") && v.media_url ? ce = { type: "video", url: v.media_url } : _ === "document" || I === "document" ? ce = {
        type: "document",
        filename: v.document_filename || v.media_url || "document.pdf"
      } : I === "text" && v.header ? ce = { type: "text", text: _e.value } : v.header && (ce = { type: "text", text: _e.value });
      const $ = S.value || "Start adding content to see a live preview here.";
      if (_ === "location" && v.location) {
        const K = v.location, L = K.lat ?? K.latitude, m = K.lng ?? K.lon ?? K.longitude;
        L != null && m != null && (pe = {
          lat: L,
          lng: m,
          name: K.name ?? K.title,
          address: K.address ?? `${L}, ${m}`
        });
      }
      (_ === "catalog" || _ === "mpm") && Array.isArray(v.products) && v.products.length && (W = !0, D = v.products.map((K) => ({
        image: K.image ?? K.imageUrl,
        name: K.name ?? K.sectionTitle ?? K.title ?? "Product",
        price: K.price ?? K.productId ?? ""
      }))), _ === "carousel" && Array.isArray(v.cards) && v.cards.length && (W = !0, D = v.cards.map((K) => ({
        image: K.image ?? K.media_url,
        name: K.title ?? "Card",
        price: K.button_label ?? ""
      }))), _ === "coupon" && v.coupon_code && (ee = { code: v.coupon_code }), _ === "lto" && v.lto_expiry && (Ie = v.lto_expiry), _ === "auth" && (H = { code: v.auth_code ?? v.otp_code ?? "123 456" });
      const Q = v.buttons ?? [];
      return _ === "flow" && Q.push({
        label: v.flow_cta_label ?? "Open flow"
      }), {
        format: _,
        templateName: v.template_name || void 0,
        templateLanguage: v.template_language || void 0,
        templateCategory: v.template_category || void 0,
        header: ce,
        body: $,
        mediaCaption: v.media_caption || void 0,
        footer: v.footer || void 0,
        buttons: Q.map((K) => ({ text: K.label || "Button" })),
        location: pe,
        catalog: W,
        multiProduct: D,
        coupon: ee,
        limitedOffer: Ie,
        auth: H,
        flow: _ === "flow" ? {
          id: v.flow_id || void 0,
          ctaLabel: v.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function g(v) {
      const _ = i.value, I = v.campaign.message ? { ..._.message, ...v.campaign.message } : _.message;
      A({
        ...v.campaign,
        message: I
      }), le.value = null, B.value = !1;
    }
    function oe(v) {
      const _ = v.target.value;
      if (!_) return;
      const I = dt.find((ce) => ce.id === _);
      I && (x.value ? (le.value = I, B.value = !0) : g(I), v.target.value = "");
    }
    function ue(v) {
      A({
        name: v,
        tracking: { ...i.value.tracking ?? {}, campaign_name: v }
      });
    }
    function we(v) {
      const _ = ` {{ ${v.variable} }}`, I = i.value.message.variables ?? [], ce = Array.from(/* @__PURE__ */ new Set([...I, v.variable]));
      if (v.field === "title") {
        const pe = i.value.message.header ?? "";
        U({
          variables: ce,
          header: pe + _
        });
      } else {
        const pe = i.value.message.body ?? "";
        U({
          variables: ce,
          body: pe + _
        });
      }
    }
    function ye() {
      me.value && c("save", i.value);
    }
    return (v, _) => (s(), n("div", ci, [
      e("div", pi, [
        Se(je, {
          "campaign-name": d(i).name,
          status: d(i).status,
          dirty: d(x),
          "last-saved-at": d(J),
          "can-undo": d(q),
          "can-redo": d(F),
          "slugify-name": p.enforceSlugName,
          "onUpdate:campaignName": ue,
          onUndo: d(O),
          onRedo: d(N)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        be.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(ne).dangerBg,
            border: `1px solid ${d(ne).dangerBorder}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[12]}px ${d(X)[16]}px`,
            marginBottom: `${d(X)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(ne).danger })
          }, [
            (s(!0), n(z, null, Y(be.value, (I) => (s(), n("li", {
              key: I.message
            }, f(I.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        xe.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(ne).neutral.bg,
            border: `1px solid ${d(ne).neutral.border}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[12]}px ${d(X)[16]}px`,
            marginBottom: `${d(X)[16]}px`,
            fontSize: "0.875rem",
            color: d(ne).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(X)[4]}px` })
          }, "Warnings", 4),
          e("ul", mi, [
            (s(!0), n(z, null, Y(xe.value, (I) => (s(), n("li", {
              key: I.message
            }, f(I.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", vi, [
        e("aside", bi, [
          t.disabledSections.includes("whatsapp") ? k("", !0) : (s(), n("div", gi, [
            e("div", yi, [
              _[7] || (_[7] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
              e("div", fi, [
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: oe
                }, [
                  _[6] || (_[6] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(z, null, Y(d(dt), (I) => (s(), n("option", {
                    key: I.id,
                    value: I.id
                  }, f(I.label), 9, hi))), 128))
                ], 32)
              ])
            ]),
            Se(Lo, {
              message: d(i).message,
              "show-reset": !0,
              onUpdate: d(U),
              onReset: _[0] || (_[0] = (I) => d(ve)())
            }, null, 8, ["message", "onUpdate"]),
            Se(It, {
              message: d(i).message,
              "variable-options": t.variableOptions,
              onUpdate: d(U),
              onInsertVariable: we
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", ki, [
          !t.designOnly && d(i).audience.test_mode ? (s(), n("div", _i, [..._[8] || (_[8] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            G(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", wi, [
            e("div", $i, [
              e("label", xi, [
                _[10] || (_[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Be(e("select", {
                  "onUpdate:modelValue": _[1] || (_[1] = (I) => he.value = I),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  _[9] || (_[9] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(z, null, Y(d(Ee), (I) => (s(), n("option", {
                    key: I.id,
                    value: I.id
                  }, f(I.label), 9, Ci))), 128))
                ], 512), [
                  [Me, he.value]
                ])
              ])
            ]),
            e("div", Si, [
              Se(ui, { template: R.value }, null, 8, ["template"])
            ])
          ])
        ])
      ]),
      e("footer", Ii, [
        p.actionsNote ? (s(), n("div", Ai, f(p.actionsNote), 1)) : k("", !0),
        e("div", Ui, [
          t.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: _[2] || (_[2] = (I) => c("duplicate", JSON.parse(JSON.stringify(d(i)))))
          }, " Duplicate ")) : k("", !0),
          t.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: ye
          }, " Save ")) : k("", !0),
          t.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: _[3] || (_[3] = (I) => c("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      B.value ? (s(), n("div", Ri, [
        e("div", Li, [
          _[11] || (_[11] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          _[12] || (_[12] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Bi, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: _[4] || (_[4] = (I) => {
                B.value = !1, le.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: _[5] || (_[5] = (I) => le.value && g(le.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0)
    ]));
  }
}), Rt = /* @__PURE__ */ $e(Ti, [["__scopeId", "data-v-0f697bc0"]]), Pi = { class: "kb-section" }, Vi = { class: "kb-section__head" }, Ei = { class: "kb-field" }, Ni = ["value"], Mi = { class: "kb-field" }, Oi = { class: "kb-label" }, Di = { key: 0 }, Wi = { key: 1 }, Hi = { key: 2 }, zi = ["value"], Fi = {
  key: 0,
  class: "kb-truncation-hint"
}, qi = { class: "kb-field" }, ji = { class: "kb-insert-row" }, Ki = ["value"], Yi = { class: "kb-field" }, Ji = { class: "kb-insert-row" }, Gi = /* @__PURE__ */ ke({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: o }) {
    const u = t, p = o, c = ["first_name", "last_name", "order_id", "city"], i = ae(u.variableOptions && u.variableOptions.length ? [...u.variableOptions] : c), x = ae(i.value[0] ?? c[0]), w = ae("");
    Ae(
      () => u.variableOptions,
      (Z) => {
        Z && Z.length && (i.value = [...Z], i.value.includes(x.value) || (x.value = i.value[0]));
      }
    );
    const y = C(() => u.message.body ?? ""), A = C(() => y.value.length), U = C(() => A.value ? A.value <= 160 ? 1 : Math.ceil(A.value / 153) : 0), O = C(() => {
      const Z = A.value;
      return Z <= 160 ? null : Z <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function N(Z) {
      const J = Z.target.value;
      p("update", {
        sender_id: J || void 0
      });
    }
    function q(Z) {
      const J = Z.target.value;
      p("update", {
        body: J
      });
    }
    function F() {
      const Z = x.value;
      if (!Z) return;
      const J = ` {{ ${Z} }}`, T = y.value || "", re = u.message.variables ?? [], j = Array.from(/* @__PURE__ */ new Set([...re, Z]));
      p("update", {
        body: T + J,
        variables: j
      });
    }
    function ve() {
      const Z = w.value.trim();
      Z && (i.value.includes(Z) || (i.value = [...i.value, Z]), x.value = Z, w.value = "");
    }
    return (Z, J) => (s(), n("section", Pi, [
      e("div", Vi, [
        J[3] || (J[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        t.showReset ? (s(), n("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: J[0] || (J[0] = (T) => Z.$emit("reset"))
        }, " Reset section ")) : k("", !0)
      ]),
      J[10] || (J[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Ei, [
        J[4] || (J[4] = e("label", { class: "kb-label" }, [
          G(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: u.message.sender_id ?? "",
          onInput: N
        }, null, 40, Ni)
      ]),
      e("div", Mi, [
        e("label", Oi, [
          J[5] || (J[5] = G(" Message body ", -1)),
          e("span", {
            class: Ce(["kb-counter", { "kb-counter--warn": U.value > 3 }])
          }, [
            G(f(A.value) + " chars · ", 1),
            U.value === 0 ? (s(), n("span", Di, "0 segments")) : U.value === 1 ? (s(), n("span", Wi, "1 segment")) : (s(), n("span", Hi, f(U.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: y.value,
          onInput: q
        }, null, 40, zi),
        J[6] || (J[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        O.value ? (s(), n("p", Fi, f(O.value), 1)) : k("", !0)
      ]),
      e("div", qi, [
        J[7] || (J[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", ji, [
          Be(e("select", {
            "onUpdate:modelValue": J[1] || (J[1] = (T) => x.value = T),
            class: "kb-select"
          }, [
            (s(!0), n(z, null, Y(i.value, (T) => (s(), n("option", {
              key: T,
              value: T
            }, f(T), 9, Ki))), 128))
          ], 512), [
            [Me, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: F
          }, " Insert into message ")
        ]),
        J[8] || (J[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", Yi, [
        J[9] || (J[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Ji, [
          Be(e("input", {
            "onUpdate:modelValue": J[2] || (J[2] = (T) => w.value = T),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [Ze, w.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ve
          }, " Add ")
        ])
      ])
    ]));
  }
}), Xi = /* @__PURE__ */ $e(Gi, [["__scopeId", "data-v-5e9aa8e6"]]), Qi = { class: "keos-sms-builder" }, Zi = { class: "kb-builder-top" }, er = { style: { margin: 0, paddingLeft: "1.25rem" } }, tr = { class: "kb-sms-layout" }, ar = { class: "kb-sms-sidebar" }, sr = {
  key: 0,
  class: "kb-sms-form"
}, nr = { class: "kb-sms-form-head" }, lr = { class: "kb-wa-form-head-row" }, or = ["value"], ir = { class: "kb-sms-canvas" }, rr = {
  key: 0,
  class: "kb-sms-test-banner"
}, dr = { class: "kb-sms-preview-chrome" }, ur = { class: "kb-push-preview-controls" }, cr = { class: "kb-push-preview-as" }, pr = ["value"], mr = { class: "kb-sms-preview-frame" }, vr = { class: "kb-preview" }, br = { class: "kb-sms-preview" }, gr = { class: "kb-sms-phone" }, yr = { class: "kb-sms-header" }, fr = { class: "kb-sms-sender" }, hr = { class: "kb-sms-thread" }, kr = { class: "kb-sms-bubble kb-sms-bubble--outgoing" }, _r = { class: "kb-sms-text" }, wr = { class: "kb-sms-counter" }, $r = { key: 0 }, xr = { key: 1 }, Cr = { key: 2 }, Sr = {
  key: 3,
  class: "kb-sms-cost"
}, Ir = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Ar = { class: "kb-sms-actions" }, Ur = {
  key: 0,
  class: "kb-actions-note"
}, Rr = { class: "kb-sms-actions-right" }, Lr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Br = { class: "kb-confirm-dialog" }, Tr = { class: "kb-confirm-actions" }, Pr = /* @__PURE__ */ ke({
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
  setup(t, { emit: o }) {
    const u = t, p = o, {
      campaign: c,
      dirty: i,
      customValidatorErrors: x,
      getValidationWithWarnings: w,
      update: y,
      updateMessage: A,
      undo: U,
      redo: O,
      canUndo: N,
      canRedo: q,
      resetMessage: F,
      hooks: ve
    } = Fe({
      initial: u.modelValue,
      hooks: {
        ...u.hooks,
        customValidators: async (W) => {
          var Ie, H;
          const D = [];
          (Ie = W.name) != null && Ie.trim() || D.push("Template name is required");
          const ee = (H = u.hooks) != null && H.customValidators ? await u.hooks.customValidators(W) : [];
          return [...D, ...ee];
        }
      },
      onDirty: () => p("change", c.value)
    }), { lastSavedAt: Z } = qe(c, { channel: "sms" });
    function J(W) {
      (W.metaKey || W.ctrlKey) && W.key === "z" && (W.preventDefault(), W.shiftKey ? O() : U());
    }
    De(() => {
      window.addEventListener("keydown", J);
    }), We(() => {
      window.removeEventListener("keydown", J);
    }), Ae(c, (W) => p("update:modelValue", W), { deep: !0 });
    const T = ae(), re = ae(!0);
    async function j() {
      if (ve.estimateReach)
        try {
          T.value = await ve.estimateReach(c.value.audience);
        } catch {
          T.value = void 0;
        }
      ve.canSend && (re.value = await Promise.resolve(ve.canSend()));
    }
    j(), Ae(() => c.value.audience, j, { deep: !0 });
    const fe = C(() => (x.value, w(T.value))), ge = C(() => fe.value.blockingErrors), be = C(() => fe.value.warnings), xe = C(() => fe.value.valid), me = C(
      () => c.value.template_type ?? "transactional"
    ), he = ae(""), B = ae(!1), le = ae(null), se = C(() => {
      const W = he.value;
      return W ? Ee.find((D) => D.id === W) ?? null : null;
    }), S = C(() => {
      const W = ue.value;
      return se.value ? Pe(W, se.value.data) : W;
    });
    function _e(W) {
      const D = c.value, ee = W.campaign.message ? { ...D.message, ...W.campaign.message } : D.message;
      y({
        ...W.campaign,
        message: ee
      }), le.value = null, B.value = !1;
    }
    function R(W) {
      const D = W.target.value;
      if (!D) return;
      const ee = ut.find((Ie) => Ie.id === D);
      ee && (i.value ? (le.value = ee, B.value = !0) : _e(ee), W.target.value = "");
    }
    function g(W) {
      y({ template_type: W });
    }
    function oe(W) {
      y({
        name: W,
        tracking: { ...c.value.tracking ?? {}, campaign_name: W }
      });
    }
    const ue = C(
      () => (c.value.message.body ?? "") || ""
    ), we = C(() => ue.value.length), ye = C(() => we.value ? we.value <= 160 ? 1 : Math.ceil(we.value / 153) : 0), v = C(() => {
      const W = S.value;
      return W.trim().length ? W : "Your SMS message preview will appear here.";
    }), _ = C(() => {
      const W = u.costPerSegment ?? 0;
      return !W || ye.value === 0 ? null : (ye.value * W).toFixed(2);
    }), I = C(() => {
      const W = we.value;
      return W <= 160 ? null : W <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), ce = C(
      () => c.value.message.sender_id ?? "YourBrand"
    );
    function pe() {
      xe.value && p("save", c.value);
    }
    return (W, D) => (s(), n("div", Qi, [
      e("div", Zi, [
        Se(je, {
          "campaign-name": d(c).name,
          status: d(c).status,
          dirty: d(i),
          "last-saved-at": d(Z),
          "can-undo": d(N),
          "can-redo": d(q),
          "slugify-name": u.enforceSlugName,
          "onUpdate:campaignName": oe,
          onUndo: d(U),
          onRedo: d(O)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        ge.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(ne).dangerBg,
            border: `1px solid ${d(ne).dangerBorder}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[12]}px ${d(X)[16]}px`,
            marginBottom: `${d(X)[16]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(ne).danger })
          }, [
            (s(!0), n(z, null, Y(ge.value, (ee) => (s(), n("li", {
              key: ee.message
            }, f(ee.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        be.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(ne).neutral.bg,
            border: `1px solid ${d(ne).neutral.border}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[12]}px ${d(X)[16]}px`,
            marginBottom: `${d(X)[16]}px`,
            fontSize: "0.875rem",
            color: d(ne).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(X)[4]}px` })
          }, "Warnings", 4),
          e("ul", er, [
            (s(!0), n(z, null, Y(be.value, (ee) => (s(), n("li", {
              key: ee.message
            }, f(ee.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", tr, [
        e("aside", ar, [
          t.disabledSections.includes("sms") ? k("", !0) : (s(), n("div", sr, [
            e("div", nr, [
              D[7] || (D[7] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
              e("div", lr, [
                Se(nt, {
                  "template-type": me.value,
                  onUpdate: g
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: R
                }, [
                  D[6] || (D[6] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(z, null, Y(d(ut), (ee) => (s(), n("option", {
                    key: ee.id,
                    value: ee.id
                  }, f(ee.label), 9, or))), 128))
                ], 32)
              ])
            ]),
            Se(Xi, {
              message: d(c).message,
              "variable-options": t.variableOptions,
              "show-reset": !0,
              onUpdate: d(A),
              onReset: D[0] || (D[0] = (ee) => d(F)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", ir, [
          !t.designOnly && d(c).audience.test_mode ? (s(), n("div", rr, [...D[8] || (D[8] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            G(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", dr, [
            e("div", ur, [
              e("label", cr, [
                D[10] || (D[10] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Be(e("select", {
                  "onUpdate:modelValue": D[1] || (D[1] = (ee) => he.value = ee),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  D[9] || (D[9] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(z, null, Y(d(Ee), (ee) => (s(), n("option", {
                    key: ee.id,
                    value: ee.id
                  }, f(ee.label), 9, pr))), 128))
                ], 512), [
                  [Me, he.value]
                ])
              ])
            ]),
            e("div", mr, [
              e("div", vr, [
                e("div", br, [
                  e("div", gr, [
                    D[13] || (D[13] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-icons" }, "◆ ◆ ◆")
                    ], -1)),
                    e("div", yr, [
                      e("div", fr, f(ce.value), 1),
                      D[11] || (D[11] = e("div", { class: "kb-sms-meta" }, "Text message", -1))
                    ]),
                    e("div", hr, [
                      e("div", kr, [
                        e("span", _r, f(v.value), 1),
                        D[12] || (D[12] = e("span", { class: "kb-sms-bubble-meta" }, " 09:21 ", -1))
                      ])
                    ])
                  ]),
                  e("p", wr, [
                    G(f(we.value) + " characters · ", 1),
                    ye.value === 0 ? (s(), n("span", $r, "0 segments")) : ye.value === 1 ? (s(), n("span", xr, "1 segment")) : (s(), n("span", Cr, f(ye.value) + " segments", 1)),
                    D[14] || (D[14] = G(" (160 chars for 1 segment, 153 for multi-part) ", -1)),
                    _.value !== null ? (s(), n("span", Sr, " · Est. " + f(_.value), 1)) : k("", !0)
                  ]),
                  I.value ? (s(), n("p", Ir, f(I.value), 1)) : k("", !0)
                ])
              ])
            ])
          ])
        ])
      ]),
      e("footer", Ar, [
        u.actionsNote ? (s(), n("div", Ur, f(u.actionsNote), 1)) : k("", !0),
        e("div", Rr, [
          t.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: D[2] || (D[2] = (ee) => p("duplicate", JSON.parse(JSON.stringify(d(c)))))
          }, " Duplicate ")) : k("", !0),
          t.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: pe
          }, " Save ")) : k("", !0),
          t.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: D[3] || (D[3] = (ee) => p("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      B.value ? (s(), n("div", Lr, [
        e("div", Br, [
          D[15] || (D[15] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          D[16] || (D[16] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Tr, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: D[4] || (D[4] = (ee) => {
                B.value = !1, le.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: D[5] || (D[5] = (ee) => le.value && _e(le.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0)
    ]));
  }
}), Lt = /* @__PURE__ */ $e(Pr, [["__scopeId", "data-v-8cc0cf01"]]), Vr = 30, Er = 60, Nr = 130;
function Mr(t) {
  const o = (t ?? "").trim().length;
  return o < Vr ? "too_short" : o <= Er ? "good" : "too_long";
}
function Or(t) {
  const o = (t ?? "").trim().length;
  return o === 0 ? "too_short" : o <= Nr ? "good" : "too_long";
}
const Dr = [
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
function ft(t) {
  if (!t || typeof t != "string") return [];
  const o = [];
  for (const u of Dr) {
    const p = t.match(u);
    p && o.push(p[0]);
  }
  return o;
}
function Wr(t) {
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
function Hr(t) {
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
const zr = { class: "em-section" }, Fr = { class: "em-strip" }, qr = { class: "em-strip-head" }, jr = { class: "em-field" }, Kr = ["value"], Yr = { class: "em-field" }, Jr = ["value"], Gr = { class: "em-field" }, Xr = ["value"], Qr = { class: "em-field" }, Zr = { class: "em-input-group" }, ed = ["value"], td = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, ad = { class: "em-field" }, sd = { class: "em-input-group" }, nd = ["value"], ld = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, od = { class: "em-strip em-strip--library" }, id = { class: "em-library-chips" }, rd = ["onClick"], dd = { class: "em-strip em-strip--blocks" }, ud = { class: "em-block-list" }, cd = ["data-type"], pd = { class: "em-block-bar" }, md = { class: "em-block-type" }, vd = { class: "em-block-actions" }, bd = ["disabled", "onClick"], gd = ["disabled", "onClick"], yd = ["onClick"], fd = {
  key: 0,
  class: "em-block-fields"
}, hd = ["value", "onChange"], kd = ["value", "onInput"], _d = ["onClick"], wd = {
  key: 1,
  class: "em-block-fields"
}, $d = ["value", "onInput"], xd = ["onClick"], Cd = {
  key: 2,
  class: "em-block-fields"
}, Sd = ["value", "onInput"], Id = ["value", "onInput"], Ad = ["value", "onInput"], Ud = {
  key: 3,
  class: "em-block-fields"
}, Rd = ["value", "onInput"], Ld = ["value", "onInput"], Bd = { class: "em-block-fields--row" }, Td = ["value", "onInput"], Pd = { class: "em-check-row" }, Vd = ["checked", "onChange"], Ed = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, Nd = ["value", "onInput"], Md = {
  key: 5,
  class: "em-block-fields"
}, Od = ["value", "onInput"], Dd = ["value", "onInput"], Wd = ["value", "onInput"], Hd = ["onClick"], zd = {
  key: 6,
  class: "em-block-fields"
}, Fd = ["value", "onChange"], qd = { class: "em-list-items" }, jd = ["value", "onInput", "placeholder"], Kd = ["onClick"], Yd = ["onClick"], Jd = {
  key: 7,
  class: "em-block-fields"
}, Gd = ["value", "onChange"], Xd = ["value", "onInput"], Qd = ["onClick"], Zd = {
  key: 8,
  class: "em-block-fields"
}, eu = { class: "em-social-links" }, tu = ["value", "onChange"], au = ["value", "onInput"], su = ["onClick"], nu = ["onClick"], lu = {
  key: 9,
  class: "em-block-fields"
}, ou = ["value", "onInput"], iu = ["value", "onInput"], ru = ["value", "onInput"], du = {
  key: 10,
  class: "em-block-fields"
}, uu = ["value", "onInput"], cu = { class: "em-link-list-items" }, pu = ["value", "onInput"], mu = ["value", "onInput"], vu = ["onClick"], bu = ["onClick"], gu = {
  key: 11,
  class: "em-block-fields"
}, yu = ["value", "onInput"], fu = ["onClick"], hu = ["value", "onInput"], ku = ["onClick"], _u = {
  key: 12,
  class: "em-block-fields"
}, wu = { class: "em-block-fields--row" }, $u = ["value", "onInput"], xu = { class: "em-block-fields--row" }, Cu = ["value", "onInput"], Su = ["value", "onChange"], Iu = {
  key: 13,
  class: "em-block-fields"
}, Au = ["value", "onChange"], Uu = { class: "em-inline-label" }, Ru = ["value", "onInput"], Lu = ["onClick"], Bu = {
  key: 14,
  class: "em-block-fields"
}, Tu = ["value", "onInput"], Pu = { class: "em-link-list-items" }, Vu = ["value", "onInput"], Eu = ["value", "onInput"], Nu = ["onClick"], Mu = ["onClick"], Ou = {
  key: 15,
  class: "em-block-fields"
}, Du = ["value", "onInput"], Wu = ["value", "onInput"], Hu = ["onClick"], zu = ["onClick"], Fu = {
  key: 16,
  class: "em-block-fields"
}, qu = ["value", "onInput"], ju = ["value", "onInput"], Ku = ["value", "onInput"], Yu = ["onClick"], Ju = ["onClick"], Gu = {
  key: 17,
  class: "em-block-fields"
}, Xu = ["value", "onInput"], Qu = ["value", "onInput"], Zu = {
  key: 18,
  class: "em-block-fields"
}, ec = ["value", "onInput"], tc = ["value", "onInput"], ac = ["value", "onInput"], sc = ["value", "onInput"], nc = ["value", "onInput"], lc = {
  key: 19,
  class: "em-block-fields"
}, oc = ["value", "onInput"], ic = ["onClick"], rc = {
  key: 20,
  class: "em-block-fields"
}, dc = ["value", "onInput"], uc = ["value", "onInput"], cc = ["onClick"], pc = {
  key: 21,
  class: "em-block-fields"
}, mc = ["value", "onInput"], vc = { class: "em-block-fields--row" }, bc = ["value", "onInput"], gc = {
  key: 22,
  class: "em-block-fields"
}, yc = ["value", "onInput"], fc = ["value", "onInput"], hc = ["value", "onInput"], kc = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, _c = ["value", "onChange"], wc = { class: "em-check-row" }, $c = ["checked", "onChange"], xc = { class: "em-add-bar" }, Cc = { class: "em-add-bar-btns" }, Sc = { class: "em-strip em-strip--personalize" }, Ic = { class: "em-field" }, Ac = { class: "em-input-group" }, Uc = ["value"], Rc = { class: "em-field" }, Lc = { class: "em-input-group" }, Le = "{{ var }}", Bc = /* @__PURE__ */ ke({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(t, { emit: o }) {
    var de;
    function u() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const p = [
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
    function i(b) {
      switch (b) {
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
          return { id: u(), type: "social", links: p.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
    const x = t, w = o, y = ["first_name", "last_name", "order_id", "city", "email"], A = ae(
      (de = x.variableOptions) != null && de.length ? [...x.variableOptions] : y
    ), U = ae(A.value[0] ?? "first_name"), O = ae("");
    Ae(
      () => x.variableOptions,
      (b) => {
        b != null && b.length && (A.value = [...b], A.value.includes(U.value) || (U.value = A.value[0]));
      }
    );
    const N = C(() => x.message.subject ?? ""), q = C(() => x.message.preview_text ?? ""), F = C(() => Mr(N.value)), ve = C(() => Or(q.value)), Z = C(() => ft(N.value)), J = C(() => ft(q.value)), T = C(() => {
      const b = x.message.blocks;
      return Array.isArray(b) && b.length > 0 ? b : [i("paragraph")];
    });
    Ae(
      () => x.message.blocks,
      (b) => {
        (!Array.isArray(b) || b.length === 0) && w("update", { blocks: [i("paragraph")] });
      },
      { immediate: !0 }
    );
    function re(b) {
      w("update", { blocks: b });
    }
    function j(b) {
      w("update", { subject: b.target.value });
    }
    function fe(b) {
      const l = b.target.value;
      w("update", { preview_text: l || void 0 });
    }
    function ge(b) {
      w("update", { from_name: b.target.value || void 0 });
    }
    function be(b) {
      w("update", { from_address: b.target.value || void 0 });
    }
    function xe(b) {
      w("update", { reply_to: b.target.value || void 0 });
    }
    const me = [
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
    function he(b) {
      const l = b.blocks();
      re([...T.value, ...l]);
    }
    function B(b) {
      const l = [...T.value, i(b)];
      re(l);
    }
    function le(b) {
      re(T.value.filter((l) => l.id !== b));
    }
    function se(b, l) {
      const a = T.value.findIndex((P) => P.id === b);
      if (a < 0) return;
      const E = l === "up" ? a - 1 : a + 1;
      if (E < 0 || E >= T.value.length) return;
      const r = [...T.value];
      [r[a], r[E]] = [r[E], r[a]], re(r);
    }
    function S(b, l) {
      const a = T.value.map((E) => E.id === b ? { ...E, ...l } : E);
      re(a);
    }
    function _e(b, l, a) {
      const E = T.value.find((P) => P.id === b);
      if (!E || E.type !== "list") return;
      const r = [...E.items || []];
      r[l] = a, S(b, { items: r });
    }
    function R(b) {
      const l = T.value.find((a) => a.id === b);
      !l || l.type !== "list" || S(b, { items: [...l.items || [], "New item"] });
    }
    function g(b, l) {
      const a = T.value.find((r) => r.id === b);
      if (!a || a.type !== "list") return;
      const E = (a.items || []).filter((r, P) => P !== l);
      S(b, { items: E });
    }
    function oe(b, l, a, E) {
      const r = T.value.find((V) => V.id === b);
      if (!r || r.type !== "social") return;
      const P = (r.links || []).map((V, Ue) => Ue === l ? { ...V, [a]: E } : V);
      S(b, { links: P });
    }
    function ue(b) {
      const l = T.value.find((a) => a.id === b);
      !l || l.type !== "social" || S(b, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function we(b, l) {
      const a = T.value.find((r) => r.id === b);
      if (!a || a.type !== "social") return;
      const E = (a.links || []).filter((r, P) => P !== l);
      S(b, { links: E });
    }
    function ye(b, l, a, E) {
      const r = T.value.find((V) => V.id === b);
      if (!r || r.type !== "link_list") return;
      const P = (r.links || []).map((V, Ue) => Ue === l ? { ...V, [a]: E } : V);
      S(b, { links: P });
    }
    function v(b) {
      const l = T.value.find((a) => a.id === b);
      !l || l.type !== "link_list" || S(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function _(b, l) {
      const a = T.value.find((r) => r.id === b);
      if (!a || a.type !== "link_list") return;
      const E = (a.links || []).filter((r, P) => P !== l);
      S(b, { links: E });
    }
    function I(b, l) {
      const a = T.value.find((Ne) => Ne.id === b);
      if (!a || a.type !== "columns") return;
      const E = ` {{ ${U.value} }}`, r = x.message.variables ?? [], P = Array.from(/* @__PURE__ */ new Set([...r, U.value])), V = l === "left" ? "leftContent" : "rightContent", Ke = (a[V] ?? "") + E;
      S(b, { [V]: Ke }), w("update", { variables: P });
    }
    function ce(b, l) {
      const a = T.value.find((E) => E.id === b);
      if (!(!a || a.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== a.columnCount) {
          const E = [...a.cells || []];
          for (; E.length < l.columnCount; ) E.push("Cell content");
          l.cells = E.slice(0, l.columnCount);
        }
        S(b, l);
      }
    }
    function pe(b, l, a) {
      const E = T.value.find((P) => P.id === b);
      if (!E || E.type !== "row") return;
      const r = [...E.cells || []];
      r[l] = a, S(b, { cells: r });
    }
    function W(b, l, a, E) {
      const r = T.value.find((V) => V.id === b);
      if (!r || r.type !== "navbar") return;
      const P = (r.links || []).map((V, Ue) => Ue === l ? { ...V, [a]: E } : V);
      S(b, { links: P });
    }
    function D(b) {
      const l = T.value.find((a) => a.id === b);
      !l || l.type !== "navbar" || S(b, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function ee(b, l) {
      const a = T.value.find((E) => E.id === b);
      !a || a.type !== "navbar" || S(b, { links: (a.links || []).filter((E, r) => r !== l) });
    }
    function Ie(b, l, a, E) {
      const r = T.value.find((V) => V.id === b);
      if (!r || r.type !== "accordion") return;
      const P = (r.items || []).map((V, Ue) => Ue === l ? { ...V, [a]: E } : V);
      S(b, { items: P });
    }
    function H(b) {
      const l = T.value.find((a) => a.id === b);
      !l || l.type !== "accordion" || S(b, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function $(b, l) {
      const a = T.value.find((E) => E.id === b);
      !a || a.type !== "accordion" || S(b, { items: (a.items || []).filter((E, r) => r !== l) });
    }
    function Q(b, l, a, E) {
      const r = T.value.find((V) => V.id === b);
      if (!r || r.type !== "carousel") return;
      const P = (r.slides || []).map((V, Ue) => Ue === l ? { ...V, [a]: E } : V);
      S(b, { slides: P });
    }
    function K(b) {
      const l = T.value.find((a) => a.id === b);
      !l || l.type !== "carousel" || S(b, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function L(b, l) {
      const a = T.value.find((E) => E.id === b);
      !a || a.type !== "carousel" || S(b, { slides: (a.slides || []).filter((E, r) => r !== l) });
    }
    function m(b) {
      const l = ` {{ ${U.value} }}`, a = x.message.variables ?? [], E = Array.from(/* @__PURE__ */ new Set([...a, U.value]));
      b === "subject" ? w("update", {
        subject: (N.value || "") + l,
        variables: E
      }) : w("update", {
        preview_text: (q.value || "") + l,
        variables: E
      });
    }
    function h(b) {
      const l = T.value.find((Ne) => Ne.id === b);
      if (!l || l.type !== "paragraph" && l.type !== "heading" && l.type !== "footer" && l.type !== "quote" && l.type !== "liquid" && l.type !== "code_block") return;
      const a = ` {{ ${U.value} }}`, E = x.message.variables ?? [], r = Array.from(/* @__PURE__ */ new Set([...E, U.value])), P = (l.type === "footer", "content"), Ue = (l[P] ?? "") + a, Ke = T.value.map(
        (Ne) => Ne.id === b ? { ...Ne, [P]: Ue } : Ne
      );
      w("update", { blocks: Ke, variables: r });
    }
    function M(b, l) {
      const a = T.value.find((Ue) => Ue.id === b);
      if (!a || a.type !== "row") return;
      const E = ` {{ ${U.value} }}`, r = x.message.variables ?? [], P = Array.from(/* @__PURE__ */ new Set([...r, U.value])), V = [...a.cells || []];
      V[l] = (V[l] || "") + E, S(b, { cells: V }), w("update", { variables: P });
    }
    function te() {
      const b = O.value.trim();
      !b || A.value.includes(b) || (A.value = [...A.value, b], U.value = b, O.value = "");
    }
    return (b, l) => (s(), n("section", zr, [
      e("div", Fr, [
        e("div", qr, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          t.showReset ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (a) => b.$emit("reset"))
          }, " Reset section ")) : k("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", jr, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: t.message.from_name ?? "",
            onInput: ge
          }, null, 40, Kr)
        ]),
        e("div", Yr, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: t.message.from_address ?? "",
            onInput: be
          }, null, 40, Jr)
        ]),
        e("div", Gr, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            G("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: t.message.reply_to ?? "",
            onInput: xe
          }, null, 40, Xr)
        ]),
        e("div", Qr, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", Zr, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: N.value,
              onInput: j
            }, null, 40, ed),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[1] || (l[1] = (a) => m("subject")),
              title: "Insert variable"
            }, f(Le))
          ]),
          e("span", {
            class: Ce(["em-analyzer", `em-analyzer--${F.value}`])
          }, f(d(Wr)(F.value)), 3),
          Z.value.length ? (s(), n("span", td, "Spammy: " + f(Z.value.join(", ")), 1)) : k("", !0)
        ]),
        e("div", ad, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            G("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", sd, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: q.value,
              onInput: fe
            }, null, 40, nd),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: l[2] || (l[2] = (a) => m("preview")),
              title: "Insert variable"
            }, f(Le))
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: Ce(["em-analyzer", `em-analyzer--${ve.value}`])
          }, f(d(Hr)(ve.value)), 3),
          J.value.length ? (s(), n("span", ld, "Spammy: " + f(J.value.join(", ")), 1)) : k("", !0)
        ])
      ]),
      e("div", od, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", id, [
          (s(), n(z, null, Y(me, (a) => e("button", {
            key: a.id,
            type: "button",
            class: "em-library-chip",
            onClick: (E) => he(a)
          }, f(a.label), 9, rd)), 64))
        ])
      ]),
      e("div", dd, [
        l[63] || (l[63] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[64] || (l[64] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", ud, [
          (s(!0), n(z, null, Y(T.value, (a, E) => (s(), n("div", {
            key: a.id,
            class: "em-block",
            "data-type": a.type
          }, [
            e("div", pd, [
              e("span", md, f(a.type), 1),
              e("div", vd, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: E === 0,
                  onClick: (r) => se(a.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, bd),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: E === T.value.length - 1,
                  onClick: (r) => se(a.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, gd),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (r) => le(a.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, yd)
              ])
            ]),
            a.type === "heading" ? (s(), n("div", fd, [
              e("select", {
                value: a.level,
                class: "em-select em-select--sm",
                onChange: (r) => S(a.id, { level: Number(r.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, hd),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.content,
                onInput: (r) => S(a.id, { content: r.target.value }),
                placeholder: "Heading text"
              }, null, 40, kd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => h(a.id)
              }, f(Le), 8, _d)
            ])) : a.type === "paragraph" ? (s(), n("div", wd, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => S(a.id, { content: r.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, $d),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => h(a.id)
              }, f(Le), 8, xd)
            ])) : a.type === "image" ? (s(), n("div", Cd, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.src,
                onInput: (r) => S(a.id, { src: r.target.value }),
                placeholder: "Image URL"
              }, null, 40, Sd),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.alt,
                onInput: (r) => S(a.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, Id),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.linkUrl,
                onInput: (r) => S(a.id, { linkUrl: r.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, Ad)
            ])) : a.type === "button" ? (s(), n("div", Ud, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.text,
                onInput: (r) => S(a.id, { text: r.target.value }),
                placeholder: "Button text"
              }, null, 40, Rd),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.url,
                onInput: (r) => S(a.id, { url: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, Ld),
              e("div", Bd, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: a.borderRadius ?? 8,
                  onInput: (r) => S(a.id, { borderRadius: Number(r.target.value) || 0 })
                }, null, 40, Td)
              ]),
              e("label", Pd, [
                e("input", {
                  type: "checkbox",
                  checked: a.ghost,
                  onChange: (r) => S(a.id, { ghost: r.target.checked })
                }, null, 40, Vd),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : a.type === "spacer" ? (s(), n("div", Ed, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: a.height,
                onInput: (r) => S(a.id, { height: Number(r.target.value) || 24 })
              }, null, 40, Nd),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : a.type === "footer" ? (s(), n("div", Md, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => S(a.id, { content: r.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, Od),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.unsubscribeUrl,
                onInput: (r) => S(a.id, { unsubscribeUrl: r.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, Dd),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.companyAddress,
                onInput: (r) => S(a.id, { companyAddress: r.target.value }),
                placeholder: "Company address"
              }, null, 40, Wd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => h(a.id)
              }, f(Le), 8, Hd)
            ])) : a.type === "list" ? (s(), n("div", zd, [
              e("select", {
                value: a.style,
                class: "em-select em-select--sm",
                onChange: (r) => S(a.id, { style: r.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, Fd),
              e("div", qd, [
                (s(!0), n(z, null, Y(a.items || [], (r, P) => (s(), n("div", {
                  key: P,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r,
                    onInput: (V) => _e(a.id, P, V.target.value),
                    placeholder: `Item ${P + 1}`
                  }, null, 40, jd),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => g(a.id, P),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Kd)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => R(a.id)
              }, "+ Add item", 8, Yd)
            ])) : a.type === "quote" ? (s(), n("div", Jd, [
              e("select", {
                value: a.style || "default",
                class: "em-select em-select--sm",
                onChange: (r) => S(a.id, { style: r.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Gd),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => S(a.id, { content: r.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Xd),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => h(a.id)
              }, f(Le), 8, Qd)
            ])) : a.type === "social" ? (s(), n("div", Zd, [
              e("div", eu, [
                (s(!0), n(z, null, Y(a.links || [], (r, P) => (s(), n("div", {
                  key: P,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: r.platform,
                    class: "em-select em-select--sm",
                    onChange: (V) => oe(a.id, P, "platform", V.target.value)
                  }, [...l[45] || (l[45] = [
                    Oe('<option value="facebook" data-v-c4398c5d>Facebook</option><option value="twitter" data-v-c4398c5d>Twitter / X</option><option value="instagram" data-v-c4398c5d>Instagram</option><option value="linkedin" data-v-c4398c5d>LinkedIn</option><option value="youtube" data-v-c4398c5d>YouTube</option><option value="tiktok" data-v-c4398c5d>TikTok</option><option value="custom" data-v-c4398c5d>Custom</option>', 7)
                  ])], 40, tu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (V) => oe(a.id, P, "url", V.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, au),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => we(a.id, P),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, su)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => ue(a.id)
              }, "+ Add link", 8, nu)
            ])) : a.type === "video" ? (s(), n("div", lu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.thumbnailUrl,
                onInput: (r) => S(a.id, { thumbnailUrl: r.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, ou),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.videoUrl,
                onInput: (r) => S(a.id, { videoUrl: r.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, iu),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.caption,
                onInput: (r) => S(a.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, ru)
            ])) : a.type === "link_list" ? (s(), n("div", du, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: a.separator,
                onInput: (r) => S(a.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, uu),
              e("div", cu, [
                (s(!0), n(z, null, Y(a.links || [], (r, P) => (s(), n("div", {
                  key: P,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (V) => ye(a.id, P, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, pu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (V) => ye(a.id, P, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, mu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => _(a.id, P),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, vu)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => v(a.id)
              }, "+ Add link", 8, bu)
            ])) : a.type === "columns" ? (s(), n("div", gu, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.leftContent,
                onInput: (r) => S(a.id, { leftContent: r.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, yu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => I(a.id, "left")
              }, f(Le), 8, fu),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.rightContent,
                onInput: (r) => S(a.id, { rightContent: r.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, hu),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => I(a.id, "right")
              }, f(Le), 8, ku)
            ])) : a.type === "divider" ? (s(), n("div", _u, [
              e("div", wu, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: a.thickness ?? 1,
                  onInput: (r) => S(a.id, { thickness: Number(r.target.value) || 1 })
                }, null, 40, $u),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", xu, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: a.color ?? "#e2e8f0",
                  onInput: (r) => S(a.id, { color: r.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, Cu)
              ]),
              e("select", {
                value: a.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (r) => S(a.id, { lineStyle: r.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, Su)
            ])) : a.type === "row" ? (s(), n("div", Iu, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: a.columnCount,
                class: "em-select em-select--sm",
                onChange: (r) => ce(a.id, { columnCount: Number(r.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, Au),
              (s(!0), n(z, null, Y(a.cells || [], (r, P) => (s(), n("div", {
                key: P,
                class: "em-row-cell"
              }, [
                e("label", Uu, "Column " + f(P + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r,
                  onInput: (V) => pe(a.id, P, V.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, Ru),
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (V) => M(a.id, P)
                }, f(Le), 8, Lu)
              ]))), 128))
            ])) : a.type === "navbar" ? (s(), n("div", Bu, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: a.separator,
                onInput: (r) => S(a.id, { separator: r.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, Tu),
              e("div", Pu, [
                (s(!0), n(z, null, Y(a.links || [], (r, P) => (s(), n("div", {
                  key: P,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: r.text,
                    onInput: (V) => W(a.id, P, "text", V.target.value),
                    placeholder: "Label"
                  }, null, 40, Vu),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: r.url,
                    onInput: (V) => W(a.id, P, "url", V.target.value),
                    placeholder: "URL"
                  }, null, 40, Eu),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (V) => ee(a.id, P),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Nu)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => D(a.id)
              }, "+ Add link", 8, Mu)
            ])) : a.type === "accordion" ? (s(), n("div", Ou, [
              (s(!0), n(z, null, Y(a.items || [], (r, P) => (s(), n("div", {
                key: P,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.title,
                  onInput: (V) => Ie(a.id, P, "title", V.target.value),
                  placeholder: "Section title"
                }, null, 40, Du),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: r.content,
                  onInput: (V) => Ie(a.id, P, "content", V.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Wu),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => $(a.id, P),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Hu)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => H(a.id)
              }, "+ Add section", 8, zu)
            ])) : a.type === "carousel" ? (s(), n("div", Fu, [
              (s(!0), n(z, null, Y(a.slides || [], (r, P) => (s(), n("div", {
                key: P,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.imageUrl,
                  onInput: (V) => Q(a.id, P, "imageUrl", V.target.value),
                  placeholder: "Image URL"
                }, null, 40, qu),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: r.alt,
                  onInput: (V) => Q(a.id, P, "alt", V.target.value),
                  placeholder: "Alt text"
                }, null, 40, ju),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: r.linkUrl,
                  onInput: (V) => Q(a.id, P, "linkUrl", V.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Ku),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (V) => L(a.id, P),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Yu)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (r) => K(a.id)
              }, "+ Add slide", 8, Ju)
            ])) : a.type === "countdown" ? (s(), n("div", Gu, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.label,
                onInput: (r) => S(a.id, { label: r.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Xu),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: a.endDateTime ? a.endDateTime.slice(0, 16) : "",
                onInput: (r) => S(a.id, { endDateTime: r.target.value ? new Date(r.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Qu),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : a.type === "product_card" ? (s(), n("div", Zu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.imageUrl,
                onInput: (r) => S(a.id, { imageUrl: r.target.value }),
                placeholder: "Product image URL"
              }, null, 40, ec),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.title,
                onInput: (r) => S(a.id, { title: r.target.value }),
                placeholder: "Product title"
              }, null, 40, tc),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.price,
                onInput: (r) => S(a.id, { price: r.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, ac),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.buttonText,
                onInput: (r) => S(a.id, { buttonText: r.target.value }),
                placeholder: "Button text"
              }, null, 40, sc),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.buttonUrl,
                onInput: (r) => S(a.id, { buttonUrl: r.target.value }),
                placeholder: "Button URL"
              }, null, 40, nc)
            ])) : a.type === "liquid" ? (s(), n("div", lc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => S(a.id, { content: r.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, oc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => h(a.id)
              }, f(Le), 8, ic),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : a.type === "code_block" ? (s(), n("div", rc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: a.caption,
                onInput: (r) => S(a.id, { caption: r.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, dc),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: a.content,
                onInput: (r) => S(a.id, { content: r.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, uc),
              e("button", {
                type: "button",
                class: "em-chip em-chip--sm",
                onClick: (r) => h(a.id)
              }, f(Le), 8, cc),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : a.type === "rss_feed" ? (s(), n("div", pc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.feedUrl,
                onInput: (r) => S(a.id, { feedUrl: r.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, mc),
              e("div", vc, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: a.maxItems ?? 5,
                  onInput: (r) => S(a.id, { maxItems: Number(r.target.value) || 5 })
                }, null, 40, bc)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : a.type === "dynamic_image" ? (s(), n("div", gc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: a.imageUrl,
                onInput: (r) => S(a.id, { imageUrl: r.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, yc),
              e("input", {
                type: "text",
                class: "em-input",
                value: a.alt,
                onInput: (r) => S(a.id, { alt: r.target.value }),
                placeholder: "Alt text"
              }, null, 40, fc),
              e("input", {
                type: "url",
                class: "em-input",
                value: a.fallbackUrl,
                onInput: (r) => S(a.id, { fallbackUrl: r.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, hc)
            ])) : k("", !0),
            c.includes(a.type) ? (s(), n("div", kc, [
              l[61] || (l[61] = e("label", { class: "em-inline-label" }, "Alignment", -1)),
              e("select", {
                value: a.alignment ?? "left",
                class: "em-select em-select--sm",
                onChange: (r) => S(a.id, { alignment: r.target.value })
              }, [...l[59] || (l[59] = [
                e("option", { value: "left" }, "Left", -1),
                e("option", { value: "center" }, "Center", -1),
                e("option", { value: "right" }, "Right", -1)
              ])], 40, _c),
              e("label", wc, [
                e("input", {
                  type: "checkbox",
                  checked: a.fullWidth,
                  onChange: (r) => S(a.id, { fullWidth: r.target.checked })
                }, null, 40, $c),
                l[60] || (l[60] = e("span", null, "Full width", -1))
              ])
            ])) : k("", !0)
          ], 8, cd))), 128))
        ]),
        e("div", xc, [
          l[62] || (l[62] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", Cc, [
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[3] || (l[3] = (a) => B("heading")),
              title: "Heading"
            }, "H"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[4] || (l[4] = (a) => B("paragraph")),
              title: "Text"
            }, "T"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[5] || (l[5] = (a) => B("image")),
              title: "Image"
            }, "🖼"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[6] || (l[6] = (a) => B("button")),
              title: "Button"
            }, "Btn"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[7] || (l[7] = (a) => B("list")),
              title: "List"
            }, "List"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[8] || (l[8] = (a) => B("quote")),
              title: "Quote"
            }, "Quote"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[9] || (l[9] = (a) => B("row")),
              title: "Row (1–4 columns)"
            }, "Row"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[10] || (l[10] = (a) => B("columns")),
              title: "Two columns"
            }, "2 col"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[11] || (l[11] = (a) => B("divider")),
              title: "Divider"
            }, "—"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[12] || (l[12] = (a) => B("spacer")),
              title: "Spacer"
            }, "▢"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[13] || (l[13] = (a) => B("navbar")),
              title: "Menu / Navbar"
            }, "Nav"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[14] || (l[14] = (a) => B("video")),
              title: "Video"
            }, "Video"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[15] || (l[15] = (a) => B("social")),
              title: "Social links"
            }, "Social"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[16] || (l[16] = (a) => B("accordion")),
              title: "Accordion"
            }, "Accord"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[17] || (l[17] = (a) => B("carousel")),
              title: "Carousel"
            }, "Carousel"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[18] || (l[18] = (a) => B("countdown")),
              title: "Countdown"
            }, "Timer"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[19] || (l[19] = (a) => B("product_card")),
              title: "Product card"
            }, "Product"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[20] || (l[20] = (a) => B("liquid")),
              title: "Liquid / code"
            }, "Liquid"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[21] || (l[21] = (a) => B("code_block")),
              title: "Code block"
            }, "Code"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[22] || (l[22] = (a) => B("rss_feed")),
              title: "RSS feed"
            }, "RSS"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[23] || (l[23] = (a) => B("dynamic_image")),
              title: "Dynamic image"
            }, "Dyn img"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[24] || (l[24] = (a) => B("link_list")),
              title: "Link list"
            }, "Links"),
            e("button", {
              type: "button",
              class: "em-add-btn",
              onClick: l[25] || (l[25] = (a) => B("footer")),
              title: "Footer"
            }, "Footer")
          ])
        ])
      ]),
      e("div", Sc, [
        l[67] || (l[67] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[68] || (l[68] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Ic, [
          l[65] || (l[65] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Ac, [
            Be(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (a) => U.value = a),
              class: "em-select em-select--flex"
            }, [
              (s(!0), n(z, null, Y(A.value, (a) => (s(), n("option", {
                key: a,
                value: a
              }, f(a), 9, Uc))), 128))
            ], 512), [
              [Me, U.value]
            ])
          ])
        ]),
        e("div", Rc, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Lc, [
            Be(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (a) => O.value = a),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [Ze, O.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: te
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Tc = /* @__PURE__ */ $e(Bc, [["__scopeId", "data-v-c4398c5d"]]), Pc = { class: "keos-email-builder" }, Vc = { class: "kb-builder-top" }, Ec = { style: { margin: 0, paddingLeft: "1.25rem" } }, Nc = { class: "kb-email-layout" }, Mc = { class: "kb-email-sidebar" }, Oc = {
  key: 0,
  class: "kb-email-form"
}, Dc = { class: "kb-email-form-head" }, Wc = { class: "kb-wa-form-head-row" }, Hc = ["value"], zc = { class: "kb-email-canvas" }, Fc = {
  key: 0,
  class: "kb-email-test-banner"
}, qc = { class: "kb-email-preview-chrome" }, jc = { class: "kb-push-preview-controls" }, Kc = { class: "kb-push-preview-as" }, Yc = ["value"], Jc = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, Gc = { class: "kb-email-inbox-strip" }, Xc = { class: "kb-email-inbox-from" }, Qc = { class: "kb-email-inbox-from-name" }, Zc = { class: "kb-email-inbox-from-addr" }, ep = { class: "kb-email-inbox-subject" }, tp = ["title"], ap = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, sp = { class: "kb-email-body-canvas" }, np = ["innerHTML"], lp = { class: "kb-email-actions" }, op = {
  key: 0,
  class: "kb-actions-note"
}, ip = { class: "kb-email-actions-right" }, rp = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, dp = { class: "kb-confirm-dialog" }, up = { class: "kb-confirm-actions" }, cp = /* @__PURE__ */ ke({
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
  setup(t, { emit: o }) {
    function u(H) {
      if (!Array.isArray(H) || H.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const $ = (m) => String(m).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Q = [
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
      ], K = (m, h) => {
        if (!Q.includes(h.type)) return m;
        const M = h.alignment || "left", te = !!h.fullWidth;
        return `<div style="text-align:${M};${te ? "width:100%;" : ""}">${m}</div>`;
      }, L = [];
      for (const m of H)
        switch (m.type) {
          case "heading": {
            const h = Math.min(3, Math.max(1, Number(m.level) || 1)), M = $(m.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            L.push(
              K(
                `<h${h} style="margin:0 0 12px;font-size:${h === 1 ? "22" : h === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${M || "Heading"}</h${h}>`,
                m
              )
            );
            break;
          }
          case "paragraph": {
            const h = $(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            L.push(
              K(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${h || "Paragraph"}</p>`,
                m
              )
            );
            break;
          }
          case "image": {
            const h = (m.src || "").trim(), M = $(m.alt || ""), te = (m.linkUrl || "").trim(), b = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", l = h ? `<img src="${$(h)}" alt="${M}" style="${b}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            L.push(
              K(
                `<div style="margin:0 0 12px;">${te ? `<a href="${$(te)}" style="color:#2563eb;">${l}</a>` : l}</div>`,
                m
              )
            );
            break;
          }
          case "button": {
            const h = $(m.text || "Button"), M = (m.url || "#").trim(), te = Math.min(24, Math.max(0, Number(m.borderRadius) ?? 8)), de = !!m.fullWidth, b = !!m.ghost, l = b ? "transparent" : "#0f172a", a = b ? "#0f172a" : "#fff", E = b ? "2px solid #0f172a" : "none", r = de ? "block" : "inline-block", P = de ? "100%" : "auto";
            L.push(
              K(
                `<p style="margin:0 0 12px;"><a href="${$(M)}" style="display:${r};width:${P};text-align:center;padding:12px 24px;background:${l};color:${a};border:${E};text-decoration:none;font-size:14px;font-weight:600;border-radius:${te}px;">${h}</a></p>`,
                m
              )
            );
            break;
          }
          case "divider": {
            const h = Math.min(8, Math.max(1, Number(m.thickness) || 1)), M = (m.color || "#e2e8f0").trim() || "#e2e8f0", te = m.lineStyle || "solid";
            L.push(
              K(
                `<hr style="margin:16px 0;border:0;border-top:${h}px ${te} ${M};" />`,
                m
              )
            );
            break;
          }
          case "spacer": {
            const h = Math.min(120, Math.max(8, Number(m.height) || 24));
            L.push(K(`<div style="height:${h}px;"></div>`, m));
            break;
          }
          case "footer": {
            const h = $(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = (m.unsubscribeUrl || "").trim(), te = $(m.companyAddress || "");
            L.push(
              K(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${h || "Footer"}` + (M ? `<p style="margin:8px 0 0;"><a href="${$(M)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (te ? `<p style="margin:4px 0 0;">${te}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "list": {
            const h = m.style === "numbered" ? "ol" : "ul", te = (Array.isArray(m.items) ? m.items : []).map(
              (de) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${$(String(de)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            L.push(
              K(
                `<${h} style="margin:0 0 12px;padding-left:24px;">${te || "<li>Item</li>"}</${h}>`,
                m
              )
            );
            break;
          }
          case "quote": {
            const h = $(m.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, te = M[m.style || "default"] || M.default;
            L.push(
              K(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${te}font-size:14px;line-height:1.6;">${h || "Quote"}</div>`,
                m
              )
            );
            break;
          }
          case "social": {
            const M = (Array.isArray(m.links) ? m.links : []).filter((te) => (te.url || "").trim());
            if (M.length === 0)
              L.push(
                K(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  m
                )
              );
            else {
              const te = (de) => `<a href="${$((de.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${$(de.platform || "Link")}</a>`;
              L.push(
                K(
                  `<div style="margin:0 0 12px;">${M.map(te).join("")}</div>`,
                  m
                )
              );
            }
            break;
          }
          case "video": {
            const h = (m.thumbnailUrl || "").trim(), M = (m.videoUrl || "#").trim(), te = $(m.caption || ""), b = !!m.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", l = h ? `<img src="${$(h)}" alt="Video" style="${b}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            L.push(
              K(
                `<div style="margin:0 0 12px;"><a href="${$(M)}" style="display:block;color:inherit;">${l}</a>` + (te ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${te}</p>` : "") + "</div>",
                m
              )
            );
            break;
          }
          case "link_list": {
            const h = Array.isArray(m.links) ? m.links : [], M = $(m.separator || " | "), de = h.filter(
              (b) => (b.text || b.url) && (b.url || "").trim()
            ).map(
              (b) => `<a href="${$((b.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${$(b.text || "Link")}</a>`
            );
            L.push(
              K(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${de.join(M)}</p>`,
                m
              )
            );
            break;
          }
          case "columns": {
            const h = $(m.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = $(m.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            L.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${h || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${M || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const h = Math.min(4, Math.max(1, Number(m.columnCount) || 2)), M = Array.isArray(m.cells) ? m.cells.slice(0, h) : [], te = 100 / h, de = Array.from({ length: h }, (b, l) => {
              const a = M[l] ?? "", E = $(a).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${te}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${E || "—"}</td>`;
            }).join("");
            L.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${de}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const h = Array.isArray(m.links) ? m.links : [], M = $(m.separator || " | "), de = h.filter(
              (b) => (b.text || b.url) && (b.url || "").trim()
            ).map(
              (b) => `<a href="${$((b.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${$(b.text || "Link")}</a>`
            );
            L.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${de.length ? de.join(M) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const M = (Array.isArray(m.items) ? m.items : []).map((te) => {
              const de = $(te.title || "Section"), b = $(te.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${de}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${b}</div></details>`;
            }).join("");
            L.push(
              M ? `<div style="margin:0 0 12px;">${M}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const M = (Array.isArray(m.slides) ? m.slides : []).filter(
              (te) => (te.imageUrl || "").trim()
            );
            if (M.length === 0)
              L.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const te = M[0], de = `<img src="${$(te.imageUrl)}" alt="${$(te.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, b = (te.linkUrl || "").trim();
              L.push(
                `<div style="margin:0 0 12px;">${b ? `<a href="${$(b)}">${de}</a>` : de}` + (M.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${M.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const h = $(m.label || "Offer ends in"), M = m.endDateTime ? new Date(m.endDateTime).toLocaleString() : "—";
            L.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${h}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${M}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const h = (m.imageUrl || "").trim(), M = $(m.title || "Product"), te = $(m.price || ""), de = $(m.buttonText || "Buy now"), b = (m.buttonUrl || "#").trim(), l = h ? `<img src="${$(h)}" alt="${$(m.alt || M)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            L.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${l}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${M}</p>` + (te ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${te}</p>` : "") + `<a href="${$(b)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${de}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const h = $((m.content || "").trim());
            L.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${h || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const h = (m.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), M = $((m.caption || "").trim());
            L.push(
              '<div style="margin:0 0 12px;">' + (M ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${M}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${h || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const h = (m.feedUrl || "").trim(), M = Math.min(20, Math.max(1, Number(m.maxItems) ?? 5));
            L.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (h ? `<p style="margin:0;font-size:12px;color:#64748b;">${$(h)} · max ${M} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const h = (m.imageUrl || "").trim(), M = (m.fallbackUrl || "").trim(), te = $(m.alt || "Dynamic image");
            h ? L.push(
              `<div style="margin:0 0 12px;"><img src="${$(h)}" alt="${te}" style="max-width:100%;height:auto;display:block;border:0;" />` + (M ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${$(M)}</p>` : "") + "</div>"
            ) : L.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return L.join("");
    }
    const p = t, c = o, {
      campaign: i,
      dirty: x,
      customValidatorErrors: w,
      getValidationWithWarnings: y,
      update: A,
      updateMessage: U,
      undo: O,
      redo: N,
      canUndo: q,
      canRedo: F,
      resetMessage: ve,
      hooks: Z
    } = Fe({
      initial: p.modelValue,
      hooks: {
        ...p.hooks,
        customValidators: async (H) => {
          var L, m, h;
          const $ = [];
          (L = H.name) != null && L.trim() || $.push("Template name is required");
          const Q = H.message;
          (m = Q == null ? void 0 : Q.subject) != null && m.trim() || $.push("Subject is required");
          const K = (h = p.hooks) != null && h.customValidators ? await p.hooks.customValidators(H) : [];
          return [...$, ...K];
        }
      },
      onDirty: () => c("change", i.value)
    }), { lastSavedAt: J } = qe(i, { channel: "email" });
    function T(H) {
      (H.metaKey || H.ctrlKey) && H.key === "z" && (H.preventDefault(), H.shiftKey ? N() : O());
    }
    De(() => {
      window.addEventListener("keydown", T);
    }), We(() => {
      window.removeEventListener("keydown", T);
    }), Ae(i, (H) => c("update:modelValue", H), { deep: !0 });
    const re = ae(), j = ae(!0);
    async function fe() {
      if (Z.estimateReach)
        try {
          re.value = await Z.estimateReach(i.value.audience);
        } catch {
          re.value = void 0;
        }
      Z.canSend && (j.value = await Promise.resolve(Z.canSend()));
    }
    fe(), Ae(() => i.value.audience, fe, { deep: !0 });
    const ge = C(() => (w.value, y(re.value))), be = C(() => ge.value.blockingErrors), xe = C(() => ge.value.warnings), me = C(() => ge.value.valid), he = C(
      () => i.value.template_type ?? "transactional"
    ), B = ae(""), le = ae(!1), se = ae(null), S = C(() => {
      const H = B.value;
      return H ? Ee.find(($) => $.id === H) ?? null : null;
    });
    function _e(H) {
      const $ = i.value, Q = H.campaign.message ? { ...$.message, ...H.campaign.message } : $.message;
      A({
        ...H.campaign,
        message: Q
      }), se.value = null, le.value = !1;
    }
    function R(H) {
      const $ = H.target.value;
      if (!$) return;
      const Q = ct.find((K) => K.id === $);
      Q && (x.value ? (se.value = Q, le.value = !0) : _e(Q), H.target.value = "");
    }
    function g(H) {
      A({ template_type: H });
    }
    function oe(H) {
      A({
        name: H,
        tracking: { ...i.value.tracking ?? {}, campaign_name: H }
      });
    }
    const ue = C(
      () => i.value.message.subject ?? ""
    ), we = C(
      () => i.value.message.preview_text ?? ""
    ), ye = C(
      () => i.value.message.html ?? ""
    ), v = C(
      () => i.value.message.from_name ?? "Your App"
    ), _ = C(
      () => i.value.message.from_address ?? "notifications@example.com"
    ), I = C(
      () => i.value.message.blocks ?? []
    ), ce = C(() => {
      const H = I.value;
      if (Array.isArray(H) && H.length > 0)
        return u(H);
      const $ = ye.value;
      return $ && $.trim() ? $ : u([]);
    }), pe = C(() => {
      const H = ue.value;
      return S.value ? Pe(H, S.value.data) : H;
    }), W = C(() => {
      const H = we.value;
      return S.value ? Pe(H, S.value.data) : H;
    }), D = C(() => {
      const H = ce.value;
      return S.value ? Pe(H, S.value.data) : H;
    }), ee = ae("desktop");
    function Ie() {
      me.value && c("save", i.value);
    }
    return (H, $) => (s(), n("div", Pc, [
      e("div", Vc, [
        Se(je, {
          "campaign-name": d(i).name,
          status: d(i).status,
          dirty: d(x),
          "last-saved-at": d(J),
          "can-undo": d(q),
          "can-redo": d(F),
          "slugify-name": p.enforceSlugName,
          "onUpdate:campaignName": oe,
          onUndo: d(O),
          onRedo: d(N)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        be.value.length > 0 ? (s(), n("div", {
          key: 0,
          class: "kb-errors",
          style: ie({
            background: d(ne).dangerBg,
            border: `1px solid ${d(ne).dangerBorder}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[16]}px ${d(X)[24]}px`,
            marginBottom: `${d(X)[24]}px`
          })
        }, [
          e("ul", {
            style: ie({ margin: 0, paddingLeft: "1.25rem", color: d(ne).danger })
          }, [
            (s(!0), n(z, null, Y(be.value, (Q) => (s(), n("li", {
              key: Q.message
            }, f(Q.message), 1))), 128))
          ], 4)
        ], 4)) : k("", !0),
        xe.value.length > 0 ? (s(), n("div", {
          key: 1,
          class: "kb-warnings",
          style: ie({
            background: d(ne).neutral.bg,
            border: `1px solid ${d(ne).neutral.border}`,
            borderRadius: `${d(Re).input}px`,
            padding: `${d(X)[16]}px ${d(X)[24]}px`,
            marginBottom: `${d(X)[24]}px`,
            fontSize: "0.875rem",
            color: d(ne).neutral.textMuted
          })
        }, [
          e("strong", {
            style: ie({ display: "block", marginBottom: `${d(X)[4]}px` })
          }, "Warnings", 4),
          e("ul", Ec, [
            (s(!0), n(z, null, Y(xe.value, (Q) => (s(), n("li", {
              key: Q.message
            }, f(Q.message), 1))), 128))
          ])
        ], 4)) : k("", !0)
      ]),
      e("div", Nc, [
        e("aside", Mc, [
          t.disabledSections.includes("email") ? k("", !0) : (s(), n("div", Oc, [
            e("div", Dc, [
              $[9] || ($[9] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
              e("div", Wc, [
                Se(nt, {
                  "template-type": he.value,
                  onUpdate: g
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: R
                }, [
                  $[8] || ($[8] = e("option", { value: "" }, "Presets…", -1)),
                  (s(!0), n(z, null, Y(d(ct), (Q) => (s(), n("option", {
                    key: Q.id,
                    value: Q.id
                  }, f(Q.label), 9, Hc))), 128))
                ], 32)
              ])
            ]),
            Se(Tc, {
              message: d(i).message,
              "variable-options": t.variableOptions,
              "show-reset": !0,
              onUpdate: d(U),
              onReset: $[0] || ($[0] = (Q) => d(ve)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", zc, [
          !t.designOnly && d(i).audience.test_mode ? (s(), n("div", Fc, [...$[10] || ($[10] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            G(" Test mode — only your test segment will receive this. ", -1)
          ])])) : k("", !0),
          e("div", qc, [
            e("div", jc, [
              e("label", Kc, [
                $[12] || ($[12] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Be(e("select", {
                  "onUpdate:modelValue": $[1] || ($[1] = (Q) => B.value = Q),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  $[11] || ($[11] = e("option", { value: "" }, "No substitution", -1)),
                  (s(!0), n(z, null, Y(d(Ee), (Q) => (s(), n("option", {
                    key: Q.id,
                    value: Q.id
                  }, f(Q.label), 9, Yc))), 128))
                ], 512), [
                  [Me, B.value]
                ])
              ])
            ]),
            e("div", Jc, [
              e("button", {
                type: "button",
                class: Ce(["kb-email-device-btn", {
                  "kb-email-device-btn--active": ee.value === "desktop"
                }]),
                onClick: $[2] || ($[2] = (Q) => ee.value = "desktop")
              }, [...$[13] || ($[13] = [
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
                G(" Desktop ", -1)
              ])], 2),
              e("button", {
                type: "button",
                class: Ce(["kb-email-device-btn", {
                  "kb-email-device-btn--active": ee.value === "mobile"
                }]),
                onClick: $[3] || ($[3] = (Q) => ee.value = "mobile")
              }, [...$[14] || ($[14] = [
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
                G(" Mobile ", -1)
              ])], 2)
            ]),
            e("div", {
              class: Ce(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": ee.value === "mobile"
              }])
            }, [
              e("div", Gc, [
                e("div", Xc, [
                  e("span", Qc, f(v.value), 1),
                  e("span", Zc, "<" + f(_.value) + ">", 1)
                ]),
                e("div", ep, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: pe.value || "No subject"
                  }, f(pe.value || "No subject"), 9, tp),
                  W.value ? (s(), n("span", ap, " — " + f(W.value), 1)) : k("", !0)
                ])
              ]),
              e("div", sp, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: D.value
                }, null, 8, np)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", lp, [
        p.actionsNote ? (s(), n("div", op, f(p.actionsNote), 1)) : k("", !0),
        e("div", ip, [
          t.showDuplicate ? (s(), n("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: $[4] || ($[4] = (Q) => c("duplicate", JSON.parse(JSON.stringify(d(i)))))
          }, " Duplicate ")) : k("", !0),
          t.showSave ? (s(), n("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: Ie
          }, " Save ")) : k("", !0),
          t.showClose ? (s(), n("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: $[5] || ($[5] = (Q) => c("edit"))
          }, " Close ")) : k("", !0)
        ])
      ]),
      le.value ? (s(), n("div", rp, [
        e("div", dp, [
          $[15] || ($[15] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          $[16] || ($[16] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", up, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: $[6] || ($[6] = (Q) => {
                le.value = !1, se.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: $[7] || ($[7] = (Q) => se.value && _e(se.value))
            }, " Replace ")
          ])
        ])
      ])) : k("", !0)
    ]));
  }
}), Bt = /* @__PURE__ */ $e(cp, [["__scopeId", "data-v-9b188271"]]), pp = { class: "kb-shell" }, mp = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, vp = ["aria-selected", "onClick"], bp = { class: "kb-shell__meta" }, gp = ["href"], yp = { class: "kb-shell__body" }, fp = /* @__PURE__ */ ke({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(t, { emit: o }) {
    const u = o, p = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (c, i) => (s(), n("div", pp, [
      e("header", {
        class: "kb-shell__header",
        style: ie({ padding: `${d(X)[12]}px ${d(X)[24]}px`, borderBottom: `1px solid ${d(ne).neutral.border}`, background: d(ne).neutral.bg })
      }, [
        i[0] || (i[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", mp, [
          (s(), n(z, null, Y(p, (x) => e("button", {
            key: x.id,
            type: "button",
            class: Ce(["kb-shell__channel", { "kb-shell__channel--active": t.channel === x.id }]),
            role: "tab",
            "aria-selected": t.channel === x.id,
            onClick: (w) => u("switch-channel", x.id)
          }, f(x.label), 11, vp)), 64))
        ]),
        e("div", bp, [
          t.environment ? (s(), n("span", {
            key: 0,
            class: "kb-shell__env",
            style: ie({ padding: "2px 8px", borderRadius: `${d(Re).input}px`, fontSize: "0.75rem", background: d(ne).neutral.bg, color: d(ne).neutral.textMuted })
          }, f(t.environment), 5)) : k("", !0),
          t.helpUrl ? (s(), n("a", {
            key: 1,
            href: t.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ie({ color: d(ne).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, gp)) : k("", !0)
        ])
      ], 4),
      e("div", yp, [
        Te(c.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), hp = /* @__PURE__ */ $e(fp, [["__scopeId", "data-v-0df30803"]]), kp = {
  class: "kb-outline",
  "aria-label": "Sections"
}, _p = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, wp = ["onClick"], $p = /* @__PURE__ */ ke({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(t) {
    var i;
    const o = t, u = ae(((i = o.items[0]) == null ? void 0 : i.id) ?? "");
    let p = null;
    function c(x) {
      const w = document.getElementById(x);
      w && w.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return De(() => {
      const x = o.scrollContainerId ? document.getElementById(o.scrollContainerId) : document;
      x && (p = new IntersectionObserver(
        (w) => {
          for (const y of w)
            if (y.isIntersecting) {
              const A = y.target.getAttribute("data-outline-id");
              A && (u.value = A);
            }
        },
        { root: x === document ? null : x, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), o.items.forEach((w) => {
        const y = document.getElementById(w.id);
        y && (p == null || p.observe(y));
      }));
    }), We(() => {
      p == null || p.disconnect();
    }), Ae(
      () => o.items,
      (x) => {
        x.length && !u.value && (u.value = x[0].id);
      },
      { immediate: !0 }
    ), (x, w) => (s(), n("nav", kp, [
      e("ul", _p, [
        (s(!0), n(z, null, Y(t.items, (y) => (s(), n("li", {
          key: y.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: Ce(["kb-outline__btn", { "kb-outline__btn--active": u.value === y.id }]),
            style: ie({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${d(X)[8]}px ${d(X)[12]}px`,
              border: "none",
              borderRadius: `${d(Re).input}px`,
              background: u.value === y.id ? d(ne).neutral.bg : "transparent",
              color: u.value === y.id ? "#0f172a" : d(ne).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: u.value === y.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (A) => c(y.id)
          }, f(y.label), 15, wp)
        ]))), 128))
      ])
    ]));
  }
}), xp = /* @__PURE__ */ $e($p, [["__scopeId", "data-v-25c37675"]]), Cp = ["id"], Sp = {
  key: 1,
  class: "kb-form-shell__head"
}, Ip = /* @__PURE__ */ ke({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(t) {
    return (o, u) => (s(), n("div", {
      class: "kb-form-shell",
      id: t.sectionId ?? void 0,
      style: ie({
        padding: `${d(X)[24]}px ${d(X)[24]}px ${d(X)[32]}px`,
        marginBottom: 0
      })
    }, [
      t.label ? (s(), n("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ie({ marginBottom: d(X)[24], paddingBottom: d(X)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ie({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: d(X)[12] })
        }, f(t.label), 5),
        Te(o.$slots, "head", {}, void 0, !0)
      ], 4)) : (s(), n("div", Sp, [
        Te(o.$slots, "head", {}, void 0, !0)
      ])),
      Te(o.$slots, "default", {}, void 0, !0)
    ], 12, Cp));
  }
}), Ap = /* @__PURE__ */ $e(Ip, [["__scopeId", "data-v-6504df41"]]), Up = /* @__PURE__ */ ke({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(t) {
    return (o, u) => (s(), n("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ie({
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
      Te(o.$slots, "default")
    ], 4));
  }
}), Rp = /* @__PURE__ */ ke({
  __name: "BuilderTopShell",
  setup(t) {
    return (o, u) => (s(), n("div", {
      class: "kb-top-shell",
      style: ie({
        marginLeft: d(X)[24],
        marginRight: d(X)[24]
      })
    }, [
      Te(o.$slots, "header"),
      Te(o.$slots, "errors"),
      Te(o.$slots, "warnings"),
      Te(o.$slots, "default")
    ], 4));
  }
});
function Lp(t) {
  t.component("KeosNotificationBuilder", Ut), t.component("KeosWhatsAppBuilder", Rt), t.component("KeosSmsBuilder", Lt), t.component("KeosEmailBuilder", Bt), t.component("BuilderShell", hp), t.component("BuilderOutline", xp), t.component("BuilderVersionHistoryModal", At), t.component("BuilderFormShell", Ap), t.component("BuilderActionsBar", Up), t.component("BuilderTopShell", Rp);
}
const Tp = {
  install: Lp,
  KeosNotificationBuilder: Ut,
  KeosWhatsAppBuilder: Rt,
  KeosSmsBuilder: Lt,
  KeosEmailBuilder: Bt
};
export {
  Up as BuilderActionsBar,
  Ap as BuilderFormShell,
  xp as BuilderOutline,
  hp as BuilderShell,
  Rp as BuilderTopShell,
  At as BuilderVersionHistoryModal,
  Ee as DEFAULT_SAMPLE_PROFILES,
  Bt as KeosEmailBuilder,
  Ut as KeosNotificationBuilder,
  Lt as KeosSmsBuilder,
  Rt as KeosWhatsAppBuilder,
  Tp as default,
  Lp as install,
  Pe as renderTemplatePreview,
  qe as useAutosave,
  Fe as useCampaignState
};
//# sourceMappingURL=index.js.map
