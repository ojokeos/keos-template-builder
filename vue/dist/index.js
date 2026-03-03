import { ref as se, watch as Be, computed as h, defineComponent as _e, openBlock as a, createElementBlock as s, normalizeStyle as re, unref as m, createElementVNode as e, Fragment as M, renderList as z, toDisplayString as d, createTextVNode as Z, createCommentVNode as y, normalizeClass as ue, withDirectives as Te, vModelSelect as Ne, vModelText as nt, createStaticVNode as ze, withKeys as Ot, onMounted as je, onUnmounted as Ke, createVNode as Ae, createBlock as Mt, withModifiers as qe, renderSlot as Ee } from "vue";
const ae = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Pe = {
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
const Je = {
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
}, Dt = ["android", "ios", "web"], xt = "normal", Ct = ["low", "normal", "high"], St = 86400, Wt = [3600, 7200, 86400, 172800], It = "1.0", zt = ["topic", "segment", "user_list"];
function lt() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Dt],
    test_mode: !1
  };
}
function ot() {
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
function it() {
  return {
    priority: xt,
    ttl: St,
    quiet_hours: !1,
    local_time: !1,
    silent_push: !1
  };
}
function rt() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function Ht(n) {
  return {
    schema_version: It,
    name: "",
    status: "draft",
    audience: lt(),
    message: ot(),
    delivery: it(),
    tracking: rt(),
    ...n
  };
}
function At(n) {
  const r = n;
  return r.schema_version || (r.schema_version = It), r.audience || (r.audience = lt()), r.message || (r.message = ot()), r.delivery || (r.delivery = it()), r.tracking || (r.tracking = rt()), Ct.includes(r.delivery.priority) || (r.delivery.priority = xt), r.delivery.ttl === void 0 && (r.delivery.ttl = St), zt.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const qt = 1e5;
function Ft(n, r) {
  var _, b, A;
  const v = [], f = r ?? n.audience.estimated_reach;
  return f !== void 0 && f >= qt && v.push({
    message: `Estimated reach is very high (${f.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), n.tracking && !((_ = n.tracking.campaign_name) != null && _.trim()) && !((b = n.name) != null && b.trim()) && v.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (A = n.message.deep_link) != null && A.trim() || v.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), v;
}
function Bt(n, r = "error") {
  return { message: n, severity: r };
}
function Lt(n) {
  const r = [];
  return n.schema_version || r.push(Bt("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function jt(n, r) {
  const v = Lt(n), f = Ft(n, r);
  return {
    valid: v.valid,
    errors: [
      ...v.errors,
      ...f.map((_) => Bt(_.message, _.severity))
    ]
  };
}
function Kt(n) {
  return n.errors.filter((r) => r.severity === "error");
}
function Yt(n) {
  return n.errors.filter((r) => r.severity !== "error");
}
function Me(n, r) {
  return n.length <= r ? { text: n, truncated: !1 } : { text: n.slice(0, Math.max(0, r - 3)) + "...", truncated: !0 };
}
const Ye = Je.android;
function Jt(n) {
  const { title: r, body: v } = n, f = Me(r || "", Ye.title), _ = Me(v || "", Ye.body);
  return {
    title: f.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: f.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function Gt(n) {
  const { title: r, body: v } = n, f = Me(r || "", Ye.title), _ = Me(v || "", Ye.body);
  return {
    title: f.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: f.truncated,
    bodyTruncated: _.truncated,
    expanded: !0
  };
}
function Xt(n, r = {}) {
  const v = r.expanded ? Gt(n) : Jt(n);
  return r.darkMode !== void 0 && (v.darkMode = r.darkMode), v;
}
const ut = Je.ios;
function Ut(n) {
  const { title: r, body: v } = n, f = Me(r || "", ut.title), _ = Me(v || "", ut.body);
  return {
    title: f.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: f.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function Qt(n) {
  return Ut(n);
}
function Zt(n, r = {}) {
  const v = r.variant === "lockscreen" ? Qt(n) : Ut(n);
  return r.darkMode !== void 0 && (v.darkMode = r.darkMode), v;
}
const ct = Je.web;
function pt(n) {
  const { title: r, body: v } = n, f = Me(r || "", ct.title), _ = Me(v || "", ct.body);
  return {
    title: f.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: f.truncated,
    bodyTruncated: _.truncated
  };
}
function ea(n) {
  return n.map((r) => ({ message: r, severity: "error" }));
}
function Ze(n) {
  return JSON.parse(JSON.stringify(n));
}
function Ge(n = {}) {
  const r = se(
    At(n.initial ?? Ht())
  ), v = n.hooks ?? {}, f = se(!1), _ = se([]);
  Be(
    r,
    () => {
      if (!v.customValidators) {
        _.value = [];
        return;
      }
      v.customValidators(r.value).then((U) => {
        _.value = U;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const b = se([]), A = se([]);
  function C() {
    const U = Ze(r.value);
    b.value = [...b.value.slice(-19), U], A.value = [];
  }
  const x = h(() => b.value.length > 0), T = h(() => A.value.length > 0);
  function E() {
    b.value.length !== 0 && (A.value = [Ze(r.value), ...A.value], r.value = b.value[b.value.length - 1], b.value = b.value.slice(0, -1));
  }
  function F() {
    A.value.length !== 0 && (b.value = [...b.value, Ze(r.value)], r.value = A.value[0], A.value = A.value.slice(1));
  }
  Be(
    r,
    () => {
      var U;
      f.value = !0, (U = n.onDirty) == null || U.call(n);
    },
    { deep: !0 }
  );
  const W = h(() => Lt(r.value));
  function Q(U) {
    const le = jt(r.value, U), J = ea(_.value), L = [...Kt(le), ...J], me = [...le.errors, ...J], R = le.valid && J.length === 0;
    return {
      ...le,
      errors: me,
      valid: R,
      blockingErrors: L,
      warnings: Yt(le)
    };
  }
  function K(U) {
    C(), r.value = { ...r.value, ...U };
  }
  function pe(U) {
    C(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...U }
    };
  }
  function Y(U) {
    C(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...U }
    };
  }
  function ee(U) {
    C(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...U }
    };
  }
  function N(U) {
    C(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...U } : { campaign_name: "", tags: [], ab_test: !1, ...U }
    };
  }
  function oe(U) {
    C(), r.value = {
      ...r.value,
      message: { ...ot(), ...U }
    };
  }
  function te(U) {
    C(), r.value = {
      ...r.value,
      delivery: { ...it(), ...U }
    };
  }
  function ye(U) {
    C(), r.value = {
      ...r.value,
      tracking: { ...rt(), ...U }
    };
  }
  function be(U) {
    C(), r.value = {
      ...r.value,
      audience: { ...lt(), ...U }
    };
  }
  const fe = h(() => ({
    title: r.value.message.title,
    body: r.value.message.body,
    imageUrl: r.value.message.image_url
  }));
  function q(U, le) {
    const J = fe.value;
    let L;
    switch (U) {
      case "android":
        L = Xt(J, { expanded: le == null ? void 0 : le.expanded });
        break;
      case "ios":
        L = Zt(J);
        break;
      case "web":
        L = pt(J);
        break;
      default:
        L = pt(J);
    }
    const me = r.value.message.actions ?? [], R = r.value.message.location;
    return { ...L, actions: me, location: R ?? void 0 };
  }
  const g = Je;
  async function $() {
    return v.customValidators ? v.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: f,
    validation: W,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: _,
    getValidationWithWarnings: Q,
    update: K,
    updateAudience: pe,
    updateMessage: Y,
    updateDelivery: ee,
    updateTracking: N,
    undo: E,
    redo: F,
    canUndo: x,
    canRedo: T,
    resetMessage: oe,
    resetDelivery: te,
    resetTracking: ye,
    resetAudience: be,
    getPreview: q,
    previewInput: fe,
    characterLimits: g,
    runCustomValidators: $,
    hooks: v
  };
}
const ta = "keos-draft", aa = 2e3;
function sa(n, r) {
  return `${ta}-${n}-${r}`;
}
function Xe(n, r) {
  const v = r.channel, f = h(
    () => {
      var E, F;
      return sa(
        v,
        r.key ?? ((E = n.value) == null ? void 0 : E.id) ?? ((F = n.value) == null ? void 0 : F.name) ?? "draft"
      );
    }
  ), _ = se(null);
  let b = null;
  function A() {
    try {
      const E = JSON.stringify(n.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(f.value, E), _.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(f.value);
    } catch {
    }
  }
  function x() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const E = window.localStorage.getItem(f.value);
      if (!E) return null;
      const F = JSON.parse(E);
      return At(F);
    } catch {
      return null;
    }
  }
  function T() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return Be(
    n,
    () => {
      T() && (b && clearTimeout(b), b = setTimeout(() => {
        b = null, A();
      }, aa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: _,
    clearDraft: C,
    getDraft: x,
    persist: A
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
  setup(n, { emit: r }) {
    const v = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], f = n, _ = r;
    function b(x) {
      return f.slugifyName ? x.trim().replace(/\s+/g, "-") : x;
    }
    function A(x) {
      return x.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function C(x) {
      const T = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return T[x] ?? T.draft;
    }
    return (x, T) => (a(), s("header", {
      class: "kb-header",
      style: re({
        padding: `${m(ae)[16]}px 0`,
        borderBottom: `1px solid ${m(de).neutral.border}`,
        marginBottom: `${m(ae)[16]}px`
      })
    }, [
      e("div", na, [
        e("input", {
          type: "text",
          class: "kb-header__name",
          value: n.campaignName,
          placeholder: "Name this template (e.g. Spring Sale Push)",
          style: { fontSize: "1rem", fontWeight: 600 },
          onInput: T[0] || (T[0] = (E) => _("update:campaignName", b(E.target.value))),
          "aria-label": "Campaign name"
        }, null, 40, la),
        e("div", oa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !n.canUndo,
            onClick: T[1] || (T[1] = (E) => _("undo"))
          }, " Undo ", 8, ia),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !n.canRedo,
            onClick: T[2] || (T[2] = (E) => _("redo"))
          }, " Redo ", 8, ra)
        ]),
        n.workflowStatus !== void 0 ? (a(), s("select", {
          key: 0,
          value: n.workflowStatus,
          class: "kb-header__status-select",
          style: re({
            padding: `${m(ae)[4]}px ${m(ae)[8]}px`,
            borderRadius: `${m(Pe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...C(n.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: T[3] || (T[3] = (E) => _("update:workflowStatus", E.target.value))
        }, [
          (a(), s(M, null, z(v, (E) => e("option", {
            key: E.value,
            value: E.value
          }, d(E.label), 9, ua)), 64))
        ], 44, da)) : (a(), s("span", {
          key: 1,
          class: "kb-header__status",
          style: re({
            padding: `${m(ae)[4]}px ${m(ae)[8]}px`,
            borderRadius: `${m(Pe).input}px`,
            background: m(de).neutral.bg,
            fontSize: "0.8125rem",
            color: m(de).neutral.textMuted
          })
        }, d(n.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: re({ fontSize: "0.8125rem", color: m(de).neutral.textMuted, marginTop: `${m(ae)[4]}px` })
      }, [
        n.saving ? (a(), s(M, { key: 0 }, [
          Z("Saving…")
        ], 64)) : n.dirty ? (a(), s(M, { key: 1 }, [
          Z("Unsaved changes")
        ], 64)) : n.lastSavedAt ? (a(), s(M, { key: 2 }, [
          Z("Last saved at " + d(A(n.lastSavedAt)), 1)
        ], 64)) : y("", !0)
      ], 4)
    ], 4));
  }
}), Ce = (n, r) => {
  const v = n.__vccOpts || n;
  for (const [f, _] of r)
    v[f] = _;
  return v;
}, Qe = /* @__PURE__ */ Ce(ca, [["__scopeId", "data-v-ef058bcb"]]), pa = { class: "kb-section" }, ma = { class: "kb-section__head" }, va = { class: "kb-section__desc" }, ba = { class: "kb-field" }, fa = { class: "kb-label" }, ga = { class: "kb-field-with-rail" }, ya = ["value", "aria-invalid", "aria-describedby"], ha = {
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
}, Aa = { class: "kb-field" }, Ba = ["value", "aria-invalid", "aria-describedby"], La = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, Ua = { class: "kb-field" }, Ra = { class: "kb-location-row" }, Ta = ["value"], Pa = ["value"], Va = ["value"], Na = ["value"], Ea = { class: "kb-field" }, Oa = { class: "kb-actions-list" }, Ma = ["value", "onInput"], Da = ["value", "onInput"], Wa = ["onClick"], za = ["disabled"], Ha = { class: "kb-action-chips" }, qa = ["disabled", "onClick"], Fa = /* @__PURE__ */ _e({
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
  setup(n) {
    const r = n;
    return (v, f) => {
      var _, b, A, C;
      return a(), s("section", pa, [
        e("div", ma, [
          f[10] || (f[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: f[0] || (f[0] = (x) => v.$emit("reset"))
          }, " Reset section ")) : y("", !0)
        ]),
        e("p", va, " Message body is required. Title is optional. Character limits depend on the selected platform (" + d(n.selectedPlatform) + "). ", 1),
        e("div", ba, [
          e("label", fa, [
            f[11] || (f[11] = Z(" Title ", -1)),
            e("span", {
              class: ue(["kb-counter", { "kb-counter--warn": n.titleCount > n.titleLimit }])
            }, d(n.titleCount) + "/" + d(n.titleLimit), 3)
          ]),
          e("div", ga, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Notification title",
              value: n.message.title,
              "aria-invalid": !!n.titleError,
              "aria-describedby": n.titleError ? "title-error" : void 0,
              onInput: f[1] || (f[1] = (x) => v.$emit("update", { title: x.target.value }))
            }, null, 40, ya),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: re({ "--pct": Math.min(100, n.titleCount / n.titleLimit * 100) + "%" })
            }, [...f[12] || (f[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.titleError ? (a(), s("p", ha, d(n.titleError), 1)) : y("", !0)
        ]),
        e("div", ka, [
          e("label", _a, [
            f[13] || (f[13] = Z(" Message ", -1)),
            e("span", {
              class: ue(["kb-counter", { "kb-counter--warn": n.bodyCount > n.bodyLimit }])
            }, d(n.bodyCount) + "/" + d(n.bodyLimit), 3)
          ]),
          e("div", wa, [
            e("textarea", {
              class: "kb-textarea",
              rows: "3",
              placeholder: "Notification body",
              value: n.message.body,
              "aria-invalid": !!n.bodyError,
              "aria-describedby": n.bodyError ? "body-error" : void 0,
              onInput: f[2] || (f[2] = (x) => v.$emit("update", { body: x.target.value }))
            }, null, 40, $a),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: re({ "--pct": Math.min(100, n.bodyCount / n.bodyLimit * 100) + "%" })
            }, [...f[14] || (f[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.bodyError ? (a(), s("p", xa, d(n.bodyError), 1)) : y("", !0)
        ]),
        e("div", Ca, [
          f[15] || (f[15] = e("label", { class: "kb-label" }, [
            Z(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: n.message.image_url,
            "aria-invalid": !!n.imageUrlError,
            "aria-describedby": n.imageUrlError ? "image-url-error" : void 0,
            onInput: f[3] || (f[3] = (x) => v.$emit("update", { image_url: x.target.value || void 0 }))
          }, null, 40, Sa),
          n.imageUrlError ? (a(), s("p", Ia, d(n.imageUrlError), 1)) : y("", !0)
        ]),
        e("div", Aa, [
          f[16] || (f[16] = e("label", { class: "kb-label" }, [
            Z(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: n.message.deep_link,
            "aria-invalid": !!n.deepLinkError,
            "aria-describedby": n.deepLinkError ? "deeplink-error" : void 0,
            onInput: f[4] || (f[4] = (x) => v.$emit("update", { deep_link: x.target.value || void 0 }))
          }, null, 40, Ba),
          n.deepLinkError ? (a(), s("p", La, d(n.deepLinkError), 1)) : y("", !0)
        ]),
        e("div", Ua, [
          f[17] || (f[17] = e("label", { class: "kb-label" }, [
            Z(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Ra, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((_ = n.message.location) == null ? void 0 : _.lat) ?? "",
              onInput: f[5] || (f[5] = (x) => {
                const T = { ...n.message.location ?? {} }, E = x.target.value;
                T.lat = E === "" ? void 0 : Number(E), v.$emit("update", { location: T });
              })
            }, null, 40, Ta),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((b = n.message.location) == null ? void 0 : b.lon) ?? "",
              onInput: f[6] || (f[6] = (x) => {
                const T = { ...n.message.location ?? {} }, E = x.target.value;
                T.lon = E === "" ? void 0 : Number(E), v.$emit("update", { location: T });
              })
            }, null, 40, Pa)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((A = n.message.location) == null ? void 0 : A.name) ?? "",
            onInput: f[7] || (f[7] = (x) => {
              const T = { ...n.message.location ?? {} };
              T.name = x.target.value || void 0, v.$emit("update", { location: T });
            })
          }, null, 40, Va),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((C = n.message.location) == null ? void 0 : C.address) ?? "",
            onInput: f[8] || (f[8] = (x) => {
              const T = { ...n.message.location ?? {} };
              T.address = x.target.value || void 0, v.$emit("update", { location: T });
            })
          }, null, 40, Na)
        ]),
        e("div", Ea, [
          f[19] || (f[19] = e("label", { class: "kb-label" }, [
            Z(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Oa, [
            (a(!0), s(M, null, z(r.message.actions ?? [], (x, T) => (a(), s("div", {
              key: x.id || T,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: x.label,
                onInput: (E) => {
                  var Q;
                  const F = [...r.message.actions ?? []], W = Number(T);
                  F[W] = {
                    ...F[W],
                    id: ((Q = F[W]) == null ? void 0 : Q.id) || `action_${W + 1}`,
                    label: E.target.value
                  }, v.$emit("update", { actions: F });
                }
              }, null, 40, Ma),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: x.url,
                onInput: (E) => {
                  var Q;
                  const F = [...r.message.actions ?? []], W = Number(T);
                  F[W] = {
                    ...F[W],
                    id: ((Q = F[W]) == null ? void 0 : Q.id) || `action_${W + 1}`,
                    url: E.target.value || void 0
                  }, v.$emit("update", { actions: F });
                }
              }, null, 40, Da),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const E = [...r.message.actions ?? []];
                  E.splice(Number(T), 1), v.$emit("update", { actions: E });
                }
              }, " Remove ", 8, Wa)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: f[9] || (f[9] = () => {
                const x = [...r.message.actions ?? []];
                x.push({
                  id: `action_${x.length + 1}`,
                  label: "",
                  url: ""
                }), v.$emit("update", { actions: x });
              })
            }, " Add action ", 8, za),
            e("div", Ha, [
              f[18] || (f[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (a(), s(M, null, z(["View order", "Track shipment", "Open app"], (x) => e("button", {
                key: x,
                type: "button",
                class: "kb-action-chip",
                disabled: (r.message.actions ?? []).length >= 3,
                onClick: () => {
                  const T = [...r.message.actions ?? []];
                  T.push({
                    id: `action_${Date.now()}`,
                    label: x,
                    url: ""
                  }), v.$emit("update", { actions: T });
                }
              }, d(x), 9, qa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ja = /* @__PURE__ */ Ce(Fa, [["__scopeId", "data-v-88ad2281"]]), Ka = { class: "kb-section kb-section--inline-personalization" }, Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = ["value"], Xa = { class: "kb-field" }, Qa = { class: "kb-insert-row" }, Za = { class: "kb-field" }, es = { class: "kb-variable-list" }, ts = /* @__PURE__ */ _e({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(n, { emit: r }) {
    const v = n, f = r, _ = ["first_name", "last_name", "order_id", "city"], b = se(v.variableOptions ?? _), A = se(b.value[0] ?? _[0]), C = se("");
    Be(
      () => v.variableOptions,
      (F) => {
        F && F.length && (b.value = [...F], b.value.includes(A.value) || (A.value = b.value[0]));
      }
    );
    const x = h(() => b.value);
    function T(F) {
      f("insertVariable", { variable: A.value, field: F });
    }
    function E() {
      const F = C.value.trim();
      F && (b.value.includes(F) || (b.value = [...b.value, F]), A.value = F, C.value = "");
    }
    return (F, W) => (a(), s("section", Ka, [
      W[8] || (W[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      W[9] || (W[9] = e("p", { class: "kb-section__desc" }, "Add {{ variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ya, [
        W[4] || (W[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ja, [
          Te(e("select", {
            "onUpdate:modelValue": W[0] || (W[0] = (Q) => A.value = Q),
            class: "kb-select"
          }, [
            (a(!0), s(M, null, z(x.value, (Q) => (a(), s("option", {
              key: Q,
              value: Q
            }, d(Q), 9, Ga))), 128))
          ], 512), [
            [Ne, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W[1] || (W[1] = (Q) => T("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: W[2] || (W[2] = (Q) => T("body"))
          }, "Into message")
        ])
      ]),
      e("div", Xa, [
        W[5] || (W[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qa, [
          Te(e("input", {
            "onUpdate:modelValue": W[3] || (W[3] = (Q) => C.value = Q),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [nt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: E
          }, " Add ")
        ])
      ]),
      e("div", Za, [
        W[6] || (W[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        W[7] || (W[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", es, [
          (a(!0), s(M, null, z(x.value, (Q) => (a(), s("li", { key: Q }, [
            e("code", null, "{{ " + d(Q) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Rt = /* @__PURE__ */ Ce(ts, [["__scopeId", "data-v-4e8a043e"]]), as = { class: "kb-section kb-section--template-type" }, ss = { class: "kb-field" }, ns = { class: "kb-radio-group" }, ls = { class: "kb-radio" }, os = ["checked"], is = { class: "kb-radio" }, rs = ["checked"], ds = /* @__PURE__ */ _e({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(n, { emit: r }) {
    const v = r;
    return (f, _) => (a(), s("section", as, [
      _[5] || (_[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      _[6] || (_[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", ss, [
        e("div", ns, [
          e("label", ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: n.templateType === "transactional",
              onChange: _[0] || (_[0] = (b) => v("update", "transactional"))
            }, null, 40, os),
            _[2] || (_[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", is, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: n.templateType === "marketing",
              onChange: _[1] || (_[1] = (b) => v("update", "marketing"))
            }, null, 40, rs),
            _[3] || (_[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        _[4] || (_[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), dt = /* @__PURE__ */ Ce(ds, [["__scopeId", "data-v-ff2e1bd8"]]), us = { class: "kb-section" }, cs = { class: "kb-section__head" }, ps = { class: "kb-section__desc" }, ms = { class: "kb-field" }, vs = { class: "kb-radio-group" }, bs = { class: "kb-radio" }, fs = ["checked"], gs = { class: "kb-radio" }, ys = ["checked"], hs = {
  key: 0,
  class: "kb-field kb-row"
}, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Cs = { class: "kb-field" }, Ss = ["value"], Is = ["value"], As = { class: "kb-field" }, Bs = { class: "kb-checkbox" }, Ls = ["checked"], Us = /* @__PURE__ */ _e({
  __name: "SectionDelivery",
  props: {
    delivery: {},
    showPushOptions: { type: Boolean, default: !0 },
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n) {
    const r = {
      3600: "1 hour",
      7200: "2 hours",
      86400: "24 hours",
      172800: "48 hours"
    };
    return (v, f) => {
      var _;
      return a(), s("section", us, [
        e("div", cs, [
          f[8] || (f[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: f[0] || (f[0] = (b) => v.$emit("reset"))
          }, " Reset section ")) : y("", !0)
        ]),
        e("p", ps, d(n.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ms, [
          f[11] || (f[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", vs, [
            e("label", bs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !n.delivery.scheduled_at,
                onChange: f[1] || (f[1] = (b) => v.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, fs),
              f[9] || (f[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", gs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!n.delivery.scheduled_at,
                onChange: f[2] || (f[2] = (b) => v.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, ys),
              f[10] || (f[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        n.delivery.scheduled_at ? (a(), s("div", hs, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (_ = n.delivery.scheduled_at) == null ? void 0 : _.slice(0, 16),
            onInput: f[3] || (f[3] = (b) => v.$emit("update", { scheduled_at: b.target.value }))
          }, null, 40, ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: n.delivery.timezone,
            onInput: f[4] || (f[4] = (b) => v.$emit("update", { timezone: b.target.value }))
          }, null, 40, _s)
        ])) : y("", !0),
        n.showPushOptions ? (a(), s(M, { key: 1 }, [
          e("div", ws, [
            f[12] || (f[12] = e("label", { class: "kb-label" }, [
              Z(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.ttl,
              onChange: f[5] || (f[5] = (b) => v.$emit("update", { ttl: Number(b.target.value) }))
            }, [
              (a(!0), s(M, null, z(m(Wt), (b) => (a(), s("option", {
                key: b,
                value: b
              }, d(r[b] ?? b + "s"), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Cs, [
            f[13] || (f[13] = e("label", { class: "kb-label" }, [
              Z(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.priority,
              onChange: f[6] || (f[6] = (b) => v.$emit("update", { priority: b.target.value }))
            }, [
              (a(!0), s(M, null, z(m(Ct), (b) => (a(), s("option", {
                key: b,
                value: b
              }, d(b), 9, Is))), 128))
            ], 40, Ss)
          ]),
          e("div", As, [
            e("label", Bs, [
              e("input", {
                type: "checkbox",
                checked: n.delivery.quiet_hours,
                onChange: f[7] || (f[7] = (b) => v.$emit("update", { quiet_hours: !n.delivery.quiet_hours }))
              }, null, 40, Ls),
              f[14] || (f[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : y("", !0)
      ]);
    };
  }
}), Rs = /* @__PURE__ */ Ce(Us, [["__scopeId", "data-v-5707a2a7"]]), Ts = { class: "kb-accordion" }, Ps = { class: "kb-accordion__body" }, Vs = { class: "kb-field" }, Ns = ["value"], Es = { class: "kb-field" }, Os = { class: "kb-checkbox" }, Ms = ["checked"], Ds = /* @__PURE__ */ _e({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(n) {
    return (r, v) => (a(), s("details", Ts, [
      v[4] || (v[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Ps, [
        e("div", Vs, [
          v[2] || (v[2] = e("label", { class: "kb-label" }, [
            Z(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: n.delivery.collapse_key,
            onInput: v[0] || (v[0] = (f) => r.$emit("update", { collapse_key: f.target.value || void 0 }))
          }, null, 40, Ns)
        ]),
        e("div", Es, [
          e("label", Os, [
            e("input", {
              type: "checkbox",
              checked: n.delivery.silent_push,
              onChange: v[1] || (v[1] = (f) => r.$emit("update", { silent_push: !n.delivery.silent_push }))
            }, null, 40, Ms),
            v[3] || (v[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ws = /* @__PURE__ */ Ce(Ds, [["__scopeId", "data-v-699e4501"]]);
function Oe(n, r) {
  return !n || typeof n != "string" ? n : n.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (v, f) => {
    const _ = f.trim();
    return _ in r ? String(r[_]) : `{{ ${f} }}`;
  });
}
const De = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], zs = { class: "kb-preview" }, Hs = { class: "kb-preview__toggle" }, qs = { class: "kb-preview__mode" }, Fs = { class: "kb-preview__quality" }, js = {
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
  key: 3,
  class: "kb-preview-warning"
}, on = { class: "kb-ios-banner" }, rn = { class: "kb-ios-content" }, dn = {
  key: 0,
  class: "kb-ios-title"
}, un = {
  key: 1,
  class: "kb-ios-text"
}, cn = {
  key: 3,
  class: "kb-preview-map kb-preview-map--ios"
}, pn = ["src"], mn = {
  key: 0,
  class: "kb-preview-map__caption"
}, vn = {
  key: 4,
  class: "kb-ios-actions"
}, bn = {
  key: 5,
  class: "kb-preview-warning"
}, fn = {
  key: 0,
  class: "kb-ios-thumb"
}, gn = ["src"], yn = { class: "kb-web-toast" }, hn = { class: "kb-web-body" }, kn = {
  key: 0,
  class: "kb-web-title"
}, _n = {
  key: 1,
  class: "kb-web-text"
}, wn = {
  key: 3,
  class: "kb-web-image"
}, $n = ["src"], xn = {
  key: 4,
  class: "kb-preview-map kb-preview-map--web"
}, Cn = ["src"], Sn = {
  key: 0,
  class: "kb-preview-map__caption"
}, In = {
  key: 0,
  class: "kb-web-actions"
}, An = {
  key: 1,
  class: "kb-preview-warning"
}, Bn = /* @__PURE__ */ _e({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(n) {
    const r = n, v = se("shade"), f = se("banner"), _ = se("toast"), b = h(() => v.value === "expanded"), A = h(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? b.value : void 0
      })
    ), C = h(() => {
      const q = A.value;
      return r.previewProfile ? {
        ...q,
        title: Oe((q == null ? void 0 : q.title) ?? "", r.previewProfile.data),
        body: Oe((q == null ? void 0 : q.body) ?? "", r.previewProfile.data)
      } : q;
    }), x = {
      android: {
        heads_up: { title: 38, body: 72 },
        shade: { title: 46, body: 132 },
        expanded: { title: 60, body: 260 }
      },
      ios: {
        banner: { title: 44, body: 92 },
        lock: { title: 56, body: 160 },
        center: { title: 72, body: 260 }
      },
      web: {
        toast: { title: 58, body: 130 },
        center: { title: 72, body: 260 }
      }
    };
    function T(q, g) {
      const $ = (q ?? "").trim();
      return $ ? $.length <= g ? $ : `${$.slice(0, Math.max(0, g - 1)).trimEnd()}…` : "";
    }
    const E = h(() => r.selectedPlatform === "android" ? v.value : r.selectedPlatform === "ios" ? f.value : _.value), F = h(() => (x[r.selectedPlatform] ?? x.web)[E.value] ?? { title: 60, body: 160 }), W = h(
      () => {
        var q;
        return T((q = C.value) == null ? void 0 : q.title, F.value.title);
      }
    ), Q = h(
      () => {
        var q;
        return T((q = C.value) == null ? void 0 : q.body, F.value.body);
      }
    ), K = { android: 3, ios: 4, web: 2 }, pe = h(
      () => {
        var q;
        return Array.isArray((q = C.value) == null ? void 0 : q.actions) ? C.value.actions : [];
      }
    ), Y = h(
      () => pe.value.slice(0, K[r.selectedPlatform] ?? 2)
    ), ee = h(
      () => Math.max(0, pe.value.length - Y.value.length)
    ), N = h(() => {
      var q;
      return (((q = r.message) == null ? void 0 : q.deep_link) ?? "").trim();
    }), oe = h(() => N.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(N.value) : !1), te = h(() => N.value ? N.value.length <= 40 ? N.value : `${N.value.slice(0, 37)}…` : ""), ye = h(() => {
      var g, $, U;
      const q = [];
      return (g = r.delivery) != null && g.priority && q.push(`Priority: ${r.delivery.priority}`), typeof (($ = r.delivery) == null ? void 0 : $.ttl) == "number" && q.push(`TTL: ${r.delivery.ttl}s`), (U = r.delivery) != null && U.silent_push && q.push("Silent push"), q;
    }), be = h(() => {
      var J;
      const q = (J = C.value) == null ? void 0 : J.location;
      if (!q || q.lat == null && q.lon == null) return null;
      const g = Number(q.lat) || 0, $ = Number(q.lon) || 0, U = 8e-3, le = [$ - U, g - U, $ + U, g + U].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(le)}&layer=mapnik&marker=${g},${$}`;
    }), fe = h(() => {
      var g;
      const q = (g = C.value) == null ? void 0 : g.location;
      return q && (q.lat != null || q.lon != null || q.name || q.address);
    });
    return (q, g) => {
      var $, U, le, J, L, me, R, k, B, X, ne, ke, we, $e, ge, ie;
      return a(), s("div", zs, [
        e("div", Hs, [
          e("label", qs, [
            g[6] || (g[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            n.selectedPlatform === "android" ? Te((a(), s("select", {
              key: 0,
              "onUpdate:modelValue": g[0] || (g[0] = (c) => v.value = c),
              class: "kb-preview__mode-select"
            }, [...g[3] || (g[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ne, v.value]
            ]) : n.selectedPlatform === "ios" ? Te((a(), s("select", {
              key: 1,
              "onUpdate:modelValue": g[1] || (g[1] = (c) => f.value = c),
              class: "kb-preview__mode-select"
            }, [...g[4] || (g[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ne, f.value]
            ]) : Te((a(), s("select", {
              key: 2,
              "onUpdate:modelValue": g[2] || (g[2] = (c) => _.value = c),
              class: "kb-preview__mode-select"
            }, [...g[5] || (g[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ne, _.value]
            ])
          ]),
          e("div", Fs, [
            (a(!0), s(M, null, z(ye.value, (c) => (a(), s("span", {
              key: c,
              class: "kb-preview__badge"
            }, d(c), 1))), 128))
          ])
        ]),
        n.selectedPlatform === "android" ? (a(), s("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: ue(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${v.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          g[9] || (g[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: ue(["kb-android-notification", { "kb-android-notification--expanded": b.value }])
          }, [
            g[8] || (g[8] = ze('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: ue(["kb-android-body", { "kb-android-body--expanded": b.value }])
            }, [
              b.value && C.value.imageUrl ? (a(), s("div", js, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, Ks)
              ])) : y("", !0),
              e("div", Ys, [
                e("div", Js, [
                  W.value ? (a(), s("div", Gs, d(W.value), 1)) : y("", !0),
                  Q.value ? (a(), s("div", Xs, d(Q.value), 1)) : y("", !0),
                  fe.value && !b.value && (($ = C.value.location) != null && $.name || (U = C.value.location) != null && U.address) ? (a(), s("div", Qs, [
                    g[7] || (g[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    Z(" " + d(((le = C.value.location) == null ? void 0 : le.name) || ((J = C.value.location) == null ? void 0 : J.address)), 1)
                  ])) : y("", !0),
                  N.value ? (a(), s("div", {
                    key: 3,
                    class: ue(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
                  }, d(oe.value ? te.value : "Invalid deep link format"), 3)) : y("", !0)
                ]),
                !b.value && C.value.imageUrl ? (a(), s("div", Zs, [
                  e("img", {
                    src: C.value.imageUrl,
                    alt: ""
                  }, null, 8, en)
                ])) : y("", !0)
              ]),
              fe.value && be.value && b.value ? (a(), s("div", tn, [
                e("iframe", {
                  src: be.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, an),
                (L = C.value.location) != null && L.name || (me = C.value.location) != null && me.address ? (a(), s("div", sn, d(((R = C.value.location) == null ? void 0 : R.name) || ((k = C.value.location) == null ? void 0 : k.address)), 1)) : y("", !0)
              ])) : y("", !0),
              Y.value.length ? (a(), s("div", nn, [
                (a(!0), s(M, null, z(Y.value, (c) => (a(), s("button", {
                  key: c.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, d(c.label || "Action"), 1))), 128))
              ])) : y("", !0),
              ee.value > 0 ? (a(), s("p", ln, " Showing " + d(Y.value.length) + " of " + d(pe.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : y("", !0)
            ], 2)
          ], 2)
        ], 2)) : n.selectedPlatform === "ios" ? (a(), s("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: ue(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${f.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          g[12] || (g[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", on, [
            g[11] || (g[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", rn, [
              g[10] || (g[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              W.value ? (a(), s("div", dn, d(W.value), 1)) : y("", !0),
              Q.value ? (a(), s("div", un, d(Q.value), 1)) : y("", !0),
              N.value ? (a(), s("div", {
                key: 2,
                class: ue(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
              }, d(oe.value ? te.value : "Invalid deep link format"), 3)) : y("", !0),
              fe.value && be.value ? (a(), s("div", cn, [
                e("iframe", {
                  src: be.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                (B = C.value.location) != null && B.name || (X = C.value.location) != null && X.address ? (a(), s("div", mn, d(((ne = C.value.location) == null ? void 0 : ne.name) || ((ke = C.value.location) == null ? void 0 : ke.address)), 1)) : y("", !0)
              ])) : y("", !0),
              Y.value.length ? (a(), s("div", vn, [
                (a(!0), s(M, null, z(Y.value, (c) => (a(), s("button", {
                  key: c.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, d(c.label || "Action"), 1))), 128))
              ])) : y("", !0),
              ee.value > 0 ? (a(), s("p", bn, " Showing " + d(Y.value.length) + " of " + d(pe.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : y("", !0)
            ]),
            C.value.imageUrl ? (a(), s("div", fn, [
              e("img", {
                src: C.value.imageUrl,
                alt: ""
              }, null, 8, gn)
            ])) : y("", !0)
          ])
        ], 2)) : (a(), s("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: ue(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${_.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          g[14] || (g[14] = ze('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", yn, [
            g[13] || (g[13] = ze('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", hn, [
              W.value ? (a(), s("div", kn, d(W.value), 1)) : y("", !0),
              Q.value ? (a(), s("div", _n, d(Q.value), 1)) : y("", !0),
              N.value ? (a(), s("div", {
                key: 2,
                class: ue(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
              }, d(oe.value ? te.value : "Invalid deep link format"), 3)) : y("", !0),
              C.value.imageUrl ? (a(), s("div", wn, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, $n)
              ])) : y("", !0),
              fe.value && be.value ? (a(), s("div", xn, [
                e("iframe", {
                  src: be.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Cn),
                (we = C.value.location) != null && we.name || ($e = C.value.location) != null && $e.address ? (a(), s("div", Sn, d(((ge = C.value.location) == null ? void 0 : ge.name) || ((ie = C.value.location) == null ? void 0 : ie.address)), 1)) : y("", !0)
              ])) : y("", !0)
            ]),
            Y.value.length ? (a(), s("div", In, [
              (a(!0), s(M, null, z(Y.value, (c, S) => (a(), s("button", {
                key: c.id || S,
                type: "button",
                class: ue(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(S) > 0 }])
              }, d(c.label || "Action"), 3))), 128))
            ])) : y("", !0),
            ee.value > 0 ? (a(), s("p", An, " Showing " + d(Y.value.length) + " of " + d(pe.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : y("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Ln = /* @__PURE__ */ Ce(Bn, [["__scopeId", "data-v-4fc616d9"]]), Un = { class: "kb-version-dialog" }, Rn = {
  key: 0,
  class: "kb-version-empty"
}, Tn = {
  key: 1,
  class: "kb-version-list"
}, Pn = { class: "kb-version-item-label" }, Vn = ["onClick"], Nn = { class: "kb-version-actions" }, En = /* @__PURE__ */ _e({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(n, { emit: r }) {
    const v = r;
    function f(_) {
      try {
        return new Date(_).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return _;
      }
    }
    return (_, b) => n.open ? (a(), s("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: b[1] || (b[1] = Ot((A) => v("close"), ["escape"]))
    }, [
      e("div", Un, [
        b[2] || (b[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        b[3] || (b[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        n.versions.length === 0 ? (a(), s("div", Rn, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), s("ul", Tn, [
          (a(!0), s(M, null, z(n.versions, (A) => (a(), s("li", {
            key: A.id,
            class: "kb-version-item"
          }, [
            e("span", Pn, d(A.label || f(A.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                v("restore", A.snapshot), v("close");
              }
            }, " Restore ", 8, Vn)
          ]))), 128))
        ])),
        e("div", Nn, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: b[0] || (b[0] = (A) => v("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : y("", !0);
  }
}), Tt = /* @__PURE__ */ Ce(En, [["__scopeId", "data-v-ce35a513"]]), mt = [
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
], vt = [
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
], bt = [
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
], ft = [
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
], On = { class: "keos-notification-builder" }, Mn = { class: "kb-builder-top" }, Dn = { style: { margin: 0, paddingLeft: "1.25rem" } }, Wn = { class: "kb-push-layout" }, zn = { class: "kb-push-sidebar" }, Hn = {
  key: 0,
  class: "kb-push-form"
}, qn = {
  key: 0,
  class: "kb-hint-card"
}, Fn = { class: "kb-push-form-head" }, jn = { class: "kb-push-form-head-top" }, Kn = { class: "kb-push-health-pill" }, Yn = { class: "kb-push-form-head-row" }, Jn = ["value"], Gn = { class: "kb-push-health" }, Xn = { class: "kb-push-health-row" }, Qn = { class: "kb-push-health-value" }, Zn = { class: "kb-push-health-bar" }, el = {
  key: 1,
  class: "kb-push-form"
}, tl = { class: "kb-push-canvas" }, al = {
  key: 0,
  class: "kb-push-test-banner"
}, sl = { class: "kb-push-preview-chrome" }, nl = { class: "kb-push-preview-controls" }, ll = { class: "kb-push-preview-as" }, ol = ["value"], il = { class: "kb-preview-status" }, rl = {
  class: "kb-push-device-toggle",
  role: "tablist",
  "aria-label": "Preview platform"
}, dl = ["aria-selected", "aria-controls", "onClick"], ul = {
  key: 0,
  class: "kb-push-preview-empty",
  "data-preview-empty": ""
}, cl = { class: "kb-push-actions" }, pl = {
  key: 0,
  class: "kb-actions-note"
}, ml = { class: "kb-push-actions-right" }, vl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, bl = { class: "kb-confirm-dialog" }, fl = { class: "kb-confirm-actions" }, gl = /* @__PURE__ */ _e({
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
  setup(n, { emit: r }) {
    const v = n, f = r, _ = se("android"), b = se(""), A = se(!1), C = se(null), x = se(!1), T = h(
      () => K.value.workflow_status ?? "draft"
    ), E = h(() => {
      const p = b.value;
      return p ? De.find((o) => o.id === p) ?? null : null;
    });
    function F(p) {
      const o = K.value, w = p.campaign.message ? { ...o.message, ...p.campaign.message } : o.message, H = p.campaign.delivery ? { ...o.delivery, ...p.campaign.delivery } : o.delivery;
      N({
        ...p.campaign,
        message: w,
        delivery: H
      }), C.value = null, A.value = !1;
    }
    function W(p) {
      const o = p.target.value;
      if (!o) return;
      const w = mt.find((H) => H.id === o);
      w && (pe.value ? (C.value = w, A.value = !0) : F(w), p.target.value = "");
    }
    function Q(p) {
      K.value = p, x.value = !1;
    }
    const {
      campaign: K,
      dirty: pe,
      customValidatorErrors: Y,
      getValidationWithWarnings: ee,
      update: N,
      updateMessage: oe,
      updateDelivery: te,
      undo: ye,
      redo: be,
      canUndo: fe,
      canRedo: q,
      resetMessage: g,
      resetDelivery: $,
      getPreview: U,
      characterLimits: le,
      hooks: J
    } = Ge({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (p) => {
          var H, j, I, u;
          const o = [];
          (H = p.name) != null && H.trim() || o.push("Template name is required"), (I = (j = p.message) == null ? void 0 : j.body) != null && I.trim() || o.push("Message body is required");
          const w = (u = v.hooks) != null && u.customValidators ? await v.hooks.customValidators(p) : [];
          return [...o, ...w];
        }
      },
      onDirty: () => f("change", K.value)
    }), { lastSavedAt: L } = Xe(K, { channel: "push" });
    function me(p) {
      (p.metaKey || p.ctrlKey) && p.key === "z" && (p.preventDefault(), p.shiftKey ? be() : ye());
    }
    je(() => {
      window.addEventListener("keydown", me);
    }), Ke(() => {
      window.removeEventListener("keydown", me);
    }), Be(K, (p) => f("update:modelValue", p), { deep: !0 });
    const R = se(), k = se(!0), B = se(!0);
    async function X() {
      if (J.estimateReach)
        try {
          R.value = await J.estimateReach(K.value.audience);
        } catch {
          R.value = void 0;
        }
      J.canSend && (k.value = await Promise.resolve(J.canSend())), J.canSchedule && (B.value = await Promise.resolve(J.canSchedule()));
    }
    X(), Be(() => K.value.audience, X, { deep: !0 });
    const ne = h(() => (Y.value, ee(R.value))), ke = h(() => ne.value.blockingErrors), we = h(() => ne.value.warnings), $e = h(() => ne.value.valid), ge = h(() => {
      var H, j, I;
      const p = K.value.message, o = [
        !!((H = K.value.name) != null && H.trim()),
        !!((j = p.title) != null && j.trim()),
        !!((I = p.body) != null && I.trim()),
        !!(p.template_type ?? K.value.template_type),
        Array.isArray(p.actions) ? p.actions.length > 0 : !1
      ], w = o.filter(Boolean).length;
      return Math.round(w / o.length * 100);
    }), ie = h(() => ge.value >= 90 ? "Production ready" : ge.value >= 70 ? "Strong draft" : ge.value >= 40 ? "In progress" : "Needs setup"), c = h(() => {
      const p = K.value.message;
      return !!((p.title ?? "").toString().trim() || (p.body ?? "").toString().trim() || Array.isArray(p.actions) && p.actions.length);
    }), S = h(
      () => le[_.value].title
    ), D = h(() => le[_.value].body), ce = h(() => K.value.message.title.length), ve = h(() => K.value.message.body.length), xe = h(() => {
      if (ce.value > S.value)
        return `Title exceeds ${S.value} characters for ${_.value}.`;
    }), Se = h(() => {
      const p = ke.value.find(
        (o) => o.message === "Message body is required"
      );
      if (p) return p.message;
      if (ve.value > D.value)
        return `Body exceeds ${D} characters for ${_.value}.`;
    }), Le = h(
      () => K.value.template_type ?? "transactional"
    );
    function Ue(p) {
      N({ template_type: p });
    }
    function Re(p) {
      N({
        name: p,
        tracking: { ...K.value.tracking ?? {}, campaign_name: p }
      });
    }
    function Ie(p) {
      const o = ` {{ ${p.variable} }}`, w = K.value.message.variables ?? [], H = Array.from(/* @__PURE__ */ new Set([...w, p.variable]));
      p.field === "title" ? oe({
        title: K.value.message.title + o,
        variables: H
      }) : oe({
        body: K.value.message.body + o,
        variables: H
      });
    }
    function G() {
      $e.value && f("save", K.value);
    }
    return (p, o) => (a(), s("div", On, [
      e("div", Mn, [
        Ae(Qe, {
          "campaign-name": m(K).name,
          status: m(K).status,
          dirty: m(pe),
          "last-saved-at": m(L),
          "can-undo": m(fe),
          "can-redo": m(q),
          "workflow-status": T.value,
          "slugify-name": v.enforceSlugName,
          "onUpdate:campaignName": Re,
          "onUpdate:workflowStatus": o[0] || (o[0] = (w) => m(N)({ workflow_status: w })),
          onUndo: m(ye),
          onRedo: m(be)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
        ke.value.length > 0 ? (a(), s("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: m(de).dangerBg,
            border: `1px solid ${m(de).dangerBorder}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[12]}px ${m(ae)[16]}px`,
            marginBottom: `${m(ae)[16]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: m(de).danger })
          }, [
            (a(!0), s(M, null, z(ke.value, (w) => (a(), s("li", {
              key: w.message
            }, d(w.message), 1))), 128))
          ], 4)
        ], 4)) : y("", !0),
        we.value.length > 0 ? (a(), s("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: m(de).neutral.bg,
            border: `1px solid ${m(de).neutral.border}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[12]}px ${m(ae)[16]}px`,
            marginBottom: `${m(ae)[16]}px`,
            fontSize: "0.875rem",
            color: m(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${m(ae)[4]}px` })
          }, "Warnings", 4),
          e("ul", Dn, [
            (a(!0), s(M, null, z(we.value, (w) => (a(), s("li", {
              key: w.message
            }, d(w.message), 1))), 128))
          ])
        ], 4)) : y("", !0)
      ]),
      e("div", Wn, [
        e("aside", zn, [
          n.disabledSections.includes("message") ? y("", !0) : (a(), s("div", Hn, [
            !m(K).message.title && !m(K).message.body ? (a(), s("div", qn, " Add a title and message below to get started. ")) : y("", !0),
            e("div", Fn, [
              e("div", jn, [
                o[12] || (o[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                e("span", Kn, d(ie.value), 1)
              ]),
              e("div", Yn, [
                Ae(dt, {
                  "template-type": Le.value,
                  onUpdate: Ue
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: W
                }, [
                  o[13] || (o[13] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), s(M, null, z(m(mt), (w) => (a(), s("option", {
                    key: w.id,
                    value: w.id
                  }, d(w.label), 9, Jn))), 128))
                ], 32)
              ]),
              e("div", Gn, [
                e("div", Xn, [
                  o[14] || (o[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                  e("span", Qn, d(ge.value) + "%", 1)
                ]),
                e("div", Zn, [
                  e("span", {
                    class: "kb-push-health-fill",
                    style: re({ width: `${ge.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ae(ja, {
              message: m(K).message,
              "title-count": ce.value,
              "body-count": ve.value,
              "title-limit": S.value,
              "body-limit": D.value,
              "selected-platform": _.value,
              "show-reset": !0,
              "title-error": xe.value,
              "body-error": Se.value,
              onUpdate: m(oe),
              onReset: o[1] || (o[1] = (w) => m(g)())
            }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
            Ae(Rt, {
              message: m(K).message,
              "variable-options": n.variableOptions,
              onUpdate: m(oe),
              onInsertVariable: Ie
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ])),
          !n.designOnly && !n.disabledSections.includes("delivery") ? (a(), s("div", el, [
            o[15] || (o[15] = e("div", { class: "kb-push-form-head" }, [
              e("span", { class: "kb-push-form-head-label" }, "Schedule")
            ], -1)),
            Ae(Rs, {
              delivery: m(K).delivery,
              "show-push-options": !0,
              "show-reset": !0,
              onUpdate: m(te),
              onReset: o[2] || (o[2] = (w) => m($)())
            }, null, 8, ["delivery", "onUpdate"]),
            Ae(Ws, {
              delivery: m(K).delivery,
              onUpdate: m(te)
            }, null, 8, ["delivery", "onUpdate"])
          ])) : y("", !0)
        ]),
        e("main", tl, [
          !n.designOnly && m(K).audience.test_mode ? (a(), s("div", al, [...o[16] || (o[16] = [
            e("span", { class: "kb-push-test-banner-dot" }, null, -1),
            Z(" Test mode — only your test segment will receive this. ", -1)
          ])])) : y("", !0),
          e("div", sl, [
            e("div", nl, [
              e("label", ll, [
                o[18] || (o[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Te(e("select", {
                  "onUpdate:modelValue": o[3] || (o[3] = (w) => b.value = w),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  o[17] || (o[17] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), s(M, null, z(m(De), (w) => (a(), s("option", {
                    key: w.id,
                    value: w.id
                  }, d(w.label), 9, ol))), 128))
                ], 512), [
                  [Ne, b.value]
                ])
              ]),
              e("div", il, [
                o[19] || (o[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, d(_.value), 1)
              ])
            ]),
            e("div", rl, [
              (a(), s(M, null, z(["android", "ios", "web"], (w) => e("button", {
                key: w,
                type: "button",
                class: ue(["kb-push-device-btn", { "kb-push-device-btn--active": _.value === w }]),
                role: "tab",
                "aria-selected": _.value === w,
                "aria-controls": `kb-preview-panel-${w}`,
                onClick: (H) => _.value = w
              }, d(w.toUpperCase()), 11, dl)), 64))
            ]),
            e("div", {
              class: ue(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !c.value }])
            }, [
              !m(K).message.title && !m(K).message.body ? (a(), s("div", ul, [...o[20] || (o[20] = [
                e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
              ])])) : (a(), Mt(Ln, {
                key: 1,
                "get-preview": m(U),
                "selected-platform": _.value,
                "preview-profile": E.value,
                message: m(K).message,
                delivery: m(K).delivery,
                "onUpdate:selectedPlatform": o[4] || (o[4] = (w) => _.value = w)
              }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
            ], 2)
          ])
        ])
      ]),
      e("footer", cl, [
        v.actionsNote ? (a(), s("div", pl, d(v.actionsNote), 1)) : y("", !0),
        e("div", ml, [
          !n.designOnly && n.showHistory ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: o[5] || (o[5] = (w) => x.value = !0)
          }, " Version history ")) : y("", !0),
          !n.designOnly && n.showSaveVersion ? (a(), s("button", {
            key: 1,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: o[6] || (o[6] = (w) => f("save-version", JSON.parse(JSON.stringify(m(K)))))
          }, " Save as version ")) : y("", !0),
          n.showDuplicate ? (a(), s("button", {
            key: 2,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: o[7] || (o[7] = (w) => f("duplicate", JSON.parse(JSON.stringify(m(K)))))
          }, " Duplicate ")) : y("", !0),
          n.showSave ? (a(), s("button", {
            key: 3,
            type: "button",
            class: "kb-push-action kb-push-action--secondary",
            onClick: G
          }, " Save ")) : y("", !0),
          n.showClose ? (a(), s("button", {
            key: 4,
            type: "button",
            class: "kb-push-action kb-push-action--primary",
            onClick: o[8] || (o[8] = (w) => f("edit"))
          }, " Close ")) : y("", !0)
        ])
      ]),
      A.value ? (a(), s("div", vl, [
        e("div", bl, [
          o[21] || (o[21] = e("h2", {
            id: "preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          o[22] || (o[22] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", fl, [
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[9] || (o[9] = (w) => {
                A.value = !1, C.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: o[10] || (o[10] = (w) => C.value && F(C.value))
            }, " Replace ")
          ])
        ])
      ])) : y("", !0),
      Ae(Tt, {
        open: x.value,
        versions: n.versions,
        onClose: o[11] || (o[11] = (w) => x.value = !1),
        onRestore: Q
      }, null, 8, ["open", "versions"])
    ]));
  }
}), Pt = /* @__PURE__ */ Ce(gl, [["__scopeId", "data-v-24377da7"]]), yl = { class: "kb-section" }, hl = { class: "kb-section__head" }, kl = { class: "kb-summary-bar" }, _l = { class: "kb-pill kb-pill--category" }, wl = { class: "kb-pill kb-pill--format" }, $l = { class: "kb-pill kb-pill--status" }, xl = { class: "kb-field" }, Cl = ["value"], Sl = { class: "kb-field" }, Il = { class: "kb-label" }, Al = { class: "kb-helper" }, Bl = ["value"], Ll = ["value"], Ul = { class: "kb-field" }, Rl = ["value"], Tl = { class: "kb-field kb-field--inline kb-field--language-limits" }, Pl = { class: "kb-field-half" }, Vl = ["value"], Nl = { class: "kb-field" }, El = ["value"], Ol = {
  key: 0,
  class: "kb-field"
}, Ml = { class: "kb-label" }, Dl = ["value"], Wl = {
  key: 1,
  class: "kb-field"
}, zl = ["value"], Hl = {
  key: 2,
  class: "kb-field"
}, ql = ["value"], Fl = {
  key: 3,
  class: "kb-field"
}, jl = ["value"], Kl = {
  key: 4,
  class: "kb-field"
}, Yl = ["value"], Jl = {
  key: 5,
  class: "kb-field"
}, Gl = ["value"], Xl = ["value"], Ql = {
  key: 6,
  class: "kb-field"
}, Zl = { class: "kb-wa-buttons" }, eo = ["value", "onInput"], to = ["value", "onInput"], ao = ["value", "onInput"], so = ["value", "onInput"], no = ["onClick"], lo = ["disabled"], oo = {
  key: 7,
  class: "kb-field"
}, io = { class: "kb-wa-buttons" }, ro = ["value", "onInput"], uo = ["value", "onInput"], co = ["onClick"], po = {
  key: 8,
  class: "kb-field"
}, mo = ["value"], vo = ["value"], bo = { class: "kb-field" }, fo = { class: "kb-label" }, go = ["value"], yo = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, ho = { class: "kb-wa-fields-list" }, ko = { class: "kb-wa-field-name" }, _o = { class: "kb-wa-field-status" }, wo = { class: "kb-field" }, $o = ["value"], xo = {
  key: 10,
  class: "kb-field"
}, Co = { class: "kb-wa-buttons" }, So = ["value", "onInput"], Io = ["value", "onChange"], Ao = ["value", "onInput"], Bo = ["value", "onInput"], Lo = {
  key: 2,
  class: "kb-opt-out-note"
}, Uo = ["onClick"], Ro = ["disabled"], et = 60, tt = 1024, at = 60, st = 10, gt = 10, To = /* @__PURE__ */ _e({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    const v = n, f = r, _ = [
      { value: "text", label: "Text", hint: "Standard text template." },
      { value: "image", label: "Rich media (image header)", hint: "Body with image in header." },
      { value: "video", label: "Rich media (video header)", hint: "Body with video in header." },
      { value: "document", label: "Rich media (document header)", hint: "Body with PDF/document in header." },
      { value: "carousel", label: "Carousel", hint: "Up to 10 cards with media + buttons." },
      { value: "flow", label: "WhatsApp Flow", hint: "Launch a multi-step in-chat flow." },
      { value: "lto", label: "Limited-time offer", hint: "Adds expiry urgency to the offer." },
      { value: "catalog", label: "Catalog", hint: "Open WhatsApp catalog or product list." },
      { value: "mpm", label: "Multi-product", hint: "Show multiple products in one template." },
      { value: "auth", label: "Authentication", hint: "OTP/login verification template." }
    ], b = h(() => v.message), A = h(() => b.value.template_type ?? "text"), C = h(() => b.value.header_type ?? "none"), x = h(() => String(b.value.header ?? "")), T = h(() => String(b.value.body ?? "")), E = h(() => String(b.value.footer ?? "")), F = h(() => b.value.buttons ?? []), W = h(() => b.value.products ?? []), Q = h(() => b.value.cards ?? []), K = h(() => {
      const R = _.find((k) => k.value === A.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), pe = h(() => {
      const R = String(b.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), Y = h(() => {
      const R = _.find((k) => k.value === A.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), ee = h(() => b.value.template_name ? T.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function N(R) {
      if (!R || typeof R != "string") return [];
      const k = /\{\{\s*([^}]+?)\s*\}\}/g, B = /* @__PURE__ */ new Set();
      let X;
      for (; (X = k.exec(R)) !== null; ) B.add(X[1].trim());
      return Array.from(B);
    }
    const oe = h(() => {
      const R = v.message.header ?? "", k = v.message.body ?? v.message.body ?? "", B = new Set(v.message.variables ?? []), X = [...N(R), ...N(k)];
      return Array.from(new Set(X)).map((ke) => ({ name: ke, configured: B.has(ke) }));
    });
    function te(R) {
      f("update", R);
    }
    function ye(R) {
      const k = {
        template_category: R || void 0
      };
      R === "authentication" && A.value !== "auth" && (k.template_type = "auth"), te(k);
    }
    function be(R) {
      const k = { template_type: R };
      R === "auth" && (k.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (k.header_type = R), te(k);
    }
    function fe(R, k) {
      var X;
      const B = [...F.value];
      B[R] = {
        ...B[R],
        id: ((X = B[R]) == null ? void 0 : X.id) || `btn_${R + 1}`,
        ...k
      }, te({ buttons: B });
    }
    function q(R) {
      const k = [...F.value];
      k.splice(R, 1), te({ buttons: k });
    }
    function g() {
      const R = [...F.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), te({ buttons: R });
    }
    function $(R, k) {
      var X;
      const B = [...W.value];
      B[R] = {
        ...B[R],
        id: ((X = B[R]) == null ? void 0 : X.id) || `prod_${R + 1}`,
        ...k
      }, te({ products: B });
    }
    function U(R) {
      const k = [...W.value];
      k.splice(R, 1), te({ products: k });
    }
    function le() {
      const R = [...W.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), te({ products: R });
    }
    function J(R, k) {
      var X;
      const B = [...Q.value];
      B[R] = {
        ...B[R],
        id: ((X = B[R]) == null ? void 0 : X.id) || `card_${R + 1}`,
        ...k
      }, te({ cards: B });
    }
    function L(R) {
      const k = [...Q.value];
      k.splice(R, 1), te({ cards: k });
    }
    function me() {
      const R = [...Q.value];
      R.push({
        id: `card_${R.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), te({ cards: R });
    }
    return (R, k) => (a(), s("section", yl, [
      e("div", hl, [
        k[16] || (k[16] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        n.showReset ? (a(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: k[0] || (k[0] = (B) => R.$emit("reset"))
        }, " Reset section ")) : y("", !0)
      ]),
      k[42] || (k[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", kl, [
        e("span", _l, d(pe.value), 1),
        e("span", wl, d(Y.value), 1),
        e("span", $l, d(ee.value), 1)
      ]),
      e("div", xl, [
        k[18] || (k[18] = e("label", { class: "kb-label" }, [
          Z(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: b.value.template_category ?? "",
          onChange: k[1] || (k[1] = (B) => ye(B.target.value))
        }, [...k[17] || (k[17] = [
          e("option", { value: "" }, "Select category", -1),
          e("option", { value: "marketing" }, "Marketing", -1),
          e("option", { value: "utility" }, "Utility", -1),
          e("option", { value: "authentication" }, "Authentication", -1)
        ])], 40, Cl)
      ]),
      e("div", Sl, [
        e("label", Il, [
          k[19] || (k[19] = Z(" Functional format ", -1)),
          e("span", Al, d(K.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: A.value,
          onChange: k[2] || (k[2] = (B) => be(B.target.value))
        }, [
          (a(), s(M, null, z(_, (B) => e("option", {
            key: B.value,
            value: B.value
          }, d(B.label), 9, Ll)), 64))
        ], 40, Bl)
      ]),
      e("div", Ul, [
        k[20] || (k[20] = e("label", { class: "kb-label" }, [
          Z(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: b.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, Rl)
      ]),
      e("div", Tl, [
        e("div", Pl, [
          k[21] || (k[21] = e("label", { class: "kb-label" }, [
            Z(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: b.value.template_language ?? "",
            onInput: k[3] || (k[3] = (B) => te({
              template_language: B.target.value || void 0
            }))
          }, null, 40, Vl)
        ]),
        e("div", { class: "kb-field-half" }, [
          e("div", { class: "kb-meta-card" }, [
            k[22] || (k[22] = e("span", { class: "kb-meta-title" }, "Component limits", -1)),
            e("ul", { class: "kb-meta-list" }, [
              e("li", null, "Header text: " + d(et) + " chars"),
              e("li", null, "Body: " + d(tt) + " chars"),
              e("li", null, "Footer: " + d(at) + " chars"),
              e("li", null, "Buttons: up to " + d(st))
            ])
          ])
        ])
      ]),
      e("div", Nl, [
        k[24] || (k[24] = e("label", { class: "kb-label" }, [
          Z(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: C.value,
          onChange: k[4] || (k[4] = (B) => te({ header_type: B.target.value }))
        }, [...k[23] || (k[23] = [
          ze('<option value="none" data-v-0f0ce1de>No header</option><option value="text" data-v-0f0ce1de>Text header</option><option value="image" data-v-0f0ce1de>Image header</option><option value="video" data-v-0f0ce1de>Video header</option><option value="document" data-v-0f0ce1de>Document header</option>', 5)
        ])], 40, El)
      ]),
      C.value === "text" ? (a(), s("div", Ol, [
        e("label", Ml, [
          k[25] || (k[25] = Z(" Header text ", -1)),
          e("span", {
            class: ue(["kb-counter", { "kb-counter--warn": x.value.length > et }])
          }, d(x.value.length) + "/" + d(et), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: x.value,
          onInput: k[5] || (k[5] = (B) => te({
            header: B.target.value || void 0
          }))
        }, null, 40, Dl)
      ])) : y("", !0),
      ["image", "video", "document"].includes(C.value) || ["image", "video", "document"].includes(A.value) ? (a(), s("div", Wl, [
        k[26] || (k[26] = e("label", { class: "kb-label" }, [
          Z(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: b.value.media_url ?? "",
          onInput: k[6] || (k[6] = (B) => te({
            media_url: B.target.value || void 0
          }))
        }, null, 40, zl)
      ])) : y("", !0),
      C.value === "document" || A.value === "document" ? (a(), s("div", Hl, [
        k[27] || (k[27] = e("label", { class: "kb-label" }, [
          Z(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: b.value.document_filename ?? "",
          onInput: k[7] || (k[7] = (B) => te({
            document_filename: B.target.value || void 0
          }))
        }, null, 40, ql)
      ])) : y("", !0),
      ["image", "video", "document"].includes(C.value) || ["image", "video", "document"].includes(A.value) ? (a(), s("div", Fl, [
        k[28] || (k[28] = e("label", { class: "kb-label" }, [
          Z(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: b.value.media_caption ?? "",
          onInput: k[8] || (k[8] = (B) => te({
            media_caption: B.target.value || void 0
          }))
        }, null, 40, jl)
      ])) : y("", !0),
      A.value === "lto" ? (a(), s("div", Kl, [
        k[29] || (k[29] = e("label", { class: "kb-label" }, [
          Z(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: b.value.lto_expiry ?? "",
          onInput: k[9] || (k[9] = (B) => te({
            lto_expiry: B.target.value || void 0
          }))
        }, null, 40, Yl)
      ])) : y("", !0),
      A.value === "flow" ? (a(), s("div", Jl, [
        k[30] || (k[30] = e("label", { class: "kb-label" }, [
          Z(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: b.value.flow_id ?? "",
          onInput: k[10] || (k[10] = (B) => te({
            flow_id: B.target.value || void 0
          }))
        }, null, 40, Gl),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: b.value.flow_cta_label ?? "",
          onInput: k[11] || (k[11] = (B) => te({
            flow_cta_label: B.target.value || void 0
          }))
        }, null, 40, Xl)
      ])) : y("", !0),
      A.value === "carousel" ? (a(), s("div", Ql, [
        e("label", { class: "kb-label" }, [
          k[31] || (k[31] = Z(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + d(gt) + " cards.")
        ]),
        e("div", Zl, [
          (a(!0), s(M, null, z(Q.value, (B, X) => (a(), s("div", {
            key: B.id || X,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: B.title ?? "",
              onInput: (ne) => J(Number(X), { title: ne.target.value })
            }, null, 40, eo),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: B.media_url ?? "",
              onInput: (ne) => J(Number(X), { media_url: ne.target.value })
            }, null, 40, to),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: B.button_label ?? "",
              onInput: (ne) => J(Number(X), { button_label: ne.target.value })
            }, null, 40, ao),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: B.button_url ?? "",
              onInput: (ne) => J(Number(X), { button_url: ne.target.value })
            }, null, 40, so),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => L(Number(X))
            }, "Remove", 8, no)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: Q.value.length >= gt,
            onClick: me
          }, " Add card ", 8, lo)
        ])
      ])) : y("", !0),
      ["mpm", "catalog"].includes(A.value) ? (a(), s("div", oo, [
        k[32] || (k[32] = e("label", { class: "kb-label" }, [
          Z(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", io, [
          (a(!0), s(M, null, z(W.value, (B, X) => (a(), s("div", {
            key: B.id || X,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: B.productId,
              onInput: (ne) => $(Number(X), { productId: ne.target.value })
            }, null, 40, ro),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: B.sectionTitle,
              onInput: (ne) => $(Number(X), { sectionTitle: ne.target.value || void 0 })
            }, null, 40, uo),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => U(Number(X))
            }, " Remove ", 8, co)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: le
          }, " Add product ")
        ])
      ])) : y("", !0),
      A.value === "auth" ? (a(), s("div", po, [
        k[34] || (k[34] = e("label", { class: "kb-label" }, [
          Z(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: b.value.auth_type ?? "otp",
          onChange: k[12] || (k[12] = (B) => te({
            auth_type: B.target.value
          }))
        }, [...k[33] || (k[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, mo),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{1}})",
          value: b.value.auth_label ?? "",
          onInput: k[13] || (k[13] = (B) => te({
            auth_label: B.target.value || void 0
          }))
        }, null, 40, vo)
      ])) : y("", !0),
      e("div", bo, [
        e("label", fo, [
          k[35] || (k[35] = Z(" Body ", -1)),
          k[36] || (k[36] = e("span", { class: "kb-helper" }, " Body is required. Use the exact approved text with variables like " + d(1) + ", " + d(2) + ". ", -1)),
          e("span", {
            class: ue(["kb-counter", { "kb-counter--warn": T.value.length > tt }])
          }, d(T.value.length) + "/" + d(tt), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{1}}, your order {{2}} has been shipped...",
          value: T.value,
          onInput: k[14] || (k[14] = (B) => te({
            body: B.target.value || void 0
          }))
        }, null, 40, go)
      ]),
      oe.value.length > 0 ? (a(), s("div", yo, [
        k[37] || (k[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        k[38] || (k[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", ho, [
          (a(!0), s(M, null, z(oe.value, (B) => (a(), s("li", {
            key: B.name,
            class: ue(["kb-wa-field-item", { "kb-wa-field-item--ok": B.configured }])
          }, [
            e("span", ko, d(B.name), 1),
            e("span", _o, d(B.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : y("", !0),
      e("div", wo, [
        k[39] || (k[39] = e("label", { class: "kb-label" }, [
          Z(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: E.value,
          onInput: k[15] || (k[15] = (B) => te({
            footer: B.target.value || void 0
          }))
        }, null, 40, $o),
        e("div", {
          class: ue(["kb-counter kb-counter--inline", { "kb-counter--warn": E.value.length > at }])
        }, d(E.value.length) + "/" + d(at), 3)
      ]),
      T.value.trim().length > 0 ? (a(), s("div", xo, [
        e("label", { class: "kb-label" }, [
          k[40] || (k[40] = Z(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + d(st) + " buttons. ")
        ]),
        e("div", Co, [
          (a(!0), s(M, null, z(F.value, (B, X) => (a(), s("div", {
            key: B.id || X,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: B.label,
              onInput: (ne) => fe(Number(X), { label: ne.target.value })
            }, null, 40, So),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: B.type ?? "quick_reply",
              onChange: (ne) => fe(Number(X), { type: ne.target.value })
            }, [...k[41] || (k[41] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, Io),
            B.type === "url" ? (a(), s("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: B.url,
              onInput: (ne) => fe(Number(X), { url: ne.target.value || void 0 })
            }, null, 40, Ao)) : B.type === "call" ? (a(), s("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: B.phone,
              onInput: (ne) => fe(Number(X), { phone: ne.target.value || void 0 })
            }, null, 40, Bo)) : B.type === "opt_out" ? (a(), s("span", Lo, " Sends a built-in opt-out action. ")) : y("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => q(Number(X))
            }, " Remove ", 8, Uo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: F.value.length >= st,
            onClick: g
          }, " Add button ", 8, Ro)
        ])
      ])) : y("", !0)
    ]));
  }
}), Po = /* @__PURE__ */ Ce(To, [["__scopeId", "data-v-0f0ce1de"]]), Vo = { class: "wa-preview-root" }, No = { class: "wa-device" }, Eo = { class: "wa-screen" }, Oo = { class: "wa-header" }, Mo = { class: "wa-titleblock" }, Do = { class: "wa-title-row" }, Wo = { class: "wa-title" }, zo = { class: "wa-subtitle" }, Ho = {
  key: 0,
  class: "wa-flow-shell"
}, qo = { class: "wa-flow-header" }, Fo = { class: "wa-flow-title" }, jo = { class: "wa-flow-content" }, Ko = { class: "wa-flow-eyebrow" }, Yo = {
  key: 0,
  class: "wa-flow-products"
}, Jo = { class: "wa-flow-footer" }, Go = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, Xo = { class: "wa-managed" }, Qo = {
  key: 1,
  class: "wa-thread"
}, Zo = { class: "wa-secure-banner" }, ei = { class: "wa-msg wa-msg--in" }, ti = { class: "wa-template-card" }, ai = {
  key: 0,
  class: "wa-card-media"
}, si = ["src"], ni = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, li = ["src"], oi = { class: "wa-card-media-doc-icon" }, ii = ["title"], ri = {
  key: 3,
  class: "wa-card-media-fallback"
}, di = { class: "wa-card-media-tag" }, ui = { class: "wa-card-media-sub" }, ci = {
  key: 1,
  class: "wa-card-header-text"
}, pi = ["innerHTML"], mi = {
  key: 2,
  class: "wa-link-preview"
}, vi = { class: "wa-link-preview-head" }, bi = { class: "wa-link-preview-text" }, fi = ["href"], gi = {
  key: 3,
  class: "wa-inline-note"
}, yi = {
  key: 4,
  class: "wa-inline-note"
}, hi = {
  key: 5,
  class: "wa-inline-note"
}, ki = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, _i = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, wi = {
  key: 8,
  class: "wa-product-list"
}, $i = { class: "wa-product-name" }, xi = { class: "wa-product-price" }, Ci = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Si = {
  key: 10,
  class: "wa-template-actions"
}, Ii = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Ai = { class: "wa-order-card" }, Bi = { class: "wa-order-card-top" }, Li = ["src"], Ui = { type: "button" }, Ri = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Ti = { class: "wa-document-card" }, Pi = { class: "wa-document-file" }, Vi = { class: "wa-document-icon" }, Ni = ["title"], Ei = { class: "wa-document-caption" }, Oi = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Mi = { class: "wa-voice-card" }, Di = { class: "wa-voice-top" }, Wi = { class: "wa-voice-profile" }, zi = ["src"], Hi = { class: "wa-voice-duration" }, qi = { class: "wa-voice-transcript" }, Fi = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, ji = { class: "wa-contact-card" }, Ki = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, Yi = { class: "wa-location-card" }, Ji = { class: "wa-location-content" }, Gi = { type: "button" }, Xi = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Qi = { class: "wa-carousel-track" }, Zi = { type: "button" }, er = { class: "wa-msg wa-msg--out" }, tr = { class: "wa-bubble wa-bubble--out" }, ar = { class: "wa-bubble-author" }, sr = {
  key: 0,
  class: "wa-reaction"
}, nr = { class: "wa-msg wa-msg--in" }, lr = { class: "wa-bubble wa-bubble--in" }, or = /* @__PURE__ */ _e({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(n) {
    const r = n;
    function v(g) {
      return String(g).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const f = h(() => {
      var U;
      const g = ((U = r.template) == null ? void 0 : U.body) ?? "";
      return v(g).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), _ = h(() => r.template.templateName || "Ecoshop"), b = h(() => "Business Account"), A = h(() => r.template.format === "flow" || !!r.template.flow), C = h(() => {
      var g;
      return (g = r.template.buttons) == null ? void 0 : g[0];
    }), x = h(() => {
      var g, $;
      return ((g = C.value) == null ? void 0 : g.text) || (($ = r.template.flow) == null ? void 0 : $.ctaLabel) || "";
    }), T = h(() => r.template.buttons ?? []), E = h(() => {
      var g;
      return (((g = r.template.multiProduct) == null ? void 0 : g.length) ?? 0) > 0;
    }), F = h(() => (r.template.format || "text").toUpperCase()), W = h(() => {
      const g = r.template.header;
      return !g || g.type === "text" ? "" : g.type === "image" ? g.url || "Image" : g.type === "video" ? g.url || "Video" : g.filename || g.url || "Document";
    }), Q = h(() => {
      const g = r.template.header;
      if (!(!g || g.type !== "image" || !g.url))
        return { backgroundImage: `url(${g.url})` };
    });
    function K(g) {
      if (!g) return "";
      try {
        const $ = g.split("?")[0].split("#")[0], U = $.substring($.lastIndexOf("/") + 1);
        return decodeURIComponent(U || "");
      } catch {
        return "";
      }
    }
    const pe = h(() => {
      const g = r.template.header;
      return !g || g.type !== "document" ? "" : g.filename || K(g.url) || "document.pdf";
    }), Y = h(() => {
      const g = (r.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (g == null ? void 0 : g[0]) || "";
    });
    function ee(g) {
      try {
        return new URL(g).hostname;
      } catch {
        return "example.com";
      }
    }
    const N = h(() => {
      const g = r.template.linkPreview;
      return !g && !Y.value ? null : {
        title: (g == null ? void 0 : g.title) || "Link preview",
        description: (g == null ? void 0 : g.description) || "Preview from your WhatsApp template link.",
        domain: (g == null ? void 0 : g.domain) || (Y.value ? ee(Y.value) : "example.com"),
        url: (g == null ? void 0 : g.url) || Y.value || "#",
        thumbnail: (g == null ? void 0 : g.thumbnail) || ""
      };
    }), oe = h(() => {
      var U, le, J;
      const $ = (J = (((U = r.template.documentCard) == null ? void 0 : U.filename) || ((le = r.template.header) == null ? void 0 : le.filename) || "").split(".").pop()) == null ? void 0 : J.trim().toUpperCase();
      return $ ? $.slice(0, 4) : "DOC";
    });
    function te(g, $) {
      return g === "phone_number" ? "wa-btn-icon--phone" : g === "url" ? "wa-btn-icon--external" : g === "copy_code" ? "wa-btn-icon--code" : g === "opt_out" || ($ || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : ($ || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const ye = h(() => {
      var g;
      return r.template.location || r.template.locationRequest ? "wa-side-icon--info" : ((g = r.template.header) == null ? void 0 : g.type) === "video" || r.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), be = h(() => {
      var $, U, le;
      const g = r.template;
      return g.format === "flow" ? "Thanks, we received your preferences." : ($ = g.auth) != null && $.code ? "Use the verification code and let us know if it works." : (U = g.coupon) != null && U.code ? `Your coupon ${g.coupon.code} is active now.` : g.limitedOffer ? `Great choice. This offer is valid until ${g.limitedOffer}.` : (le = r.template.multiProduct) != null && le.length ? `Here are ${r.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), fe = h(() => {
      var $, U;
      const g = r.template;
      return g.location ? g.location.name || g.location.address || `${g.location.lat}, ${g.location.lng}` : ($ = g.auth) != null && $.code ? `Verification code: ${g.auth.code}` : (U = g.flow) != null && U.id ? `Flow ID: ${g.flow.id}` : g.templateLanguage ? `Template language: ${g.templateLanguage}` : `Category: ${g.templateCategory || "utility"} • Format: ${g.format || "text"}`;
    }), q = h(() => {
      var U, le;
      const g = r.template;
      if ((U = g.multiProduct) != null && U.length) return g.multiProduct.slice(0, 5).map((J) => J.name || "Product");
      if ((le = g.buttons) != null && le.length) return g.buttons.slice(0, 5).map((J) => J.text || "Option");
      const $ = (g.body || "").split(/\n|\.|,/).map((J) => J.trim()).filter(Boolean).slice(0, 5);
      return $.length ? $ : ["Option A", "Option B", "Option C"];
    });
    return (g, $) => {
      var U, le, J, L, me, R, k, B, X, ne, ke, we, $e, ge;
      return a(), s("div", Vo, [
        e("div", No, [
          e("div", Eo, [
            $[30] || ($[30] = ze('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Oo, [
              $[7] || ($[7] = e("span", { class: "wa-back" }, "←", -1)),
              $[8] || ($[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Mo, [
                e("div", Do, [
                  e("span", Wo, d(_.value), 1),
                  $[6] || ($[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", zo, d(b.value), 1)
              ]),
              $[9] || ($[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            A.value ? (a(), s("div", Ho, [
              $[14] || ($[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", qo, [
                $[10] || ($[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Fo, d(_.value), 1),
                $[11] || ($[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", jo, [
                e("p", Ko, d(n.template.body || "Please choose an option below."), 1),
                (a(!0), s(M, null, z(q.value, (ie, c) => (a(), s("div", {
                  key: `flow-opt-${c}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, d(ie), 1),
                  e("span", {
                    class: ue(["wa-radio", { "wa-radio--on": c === 0 }])
                  }, null, 2)
                ]))), 128)),
                (U = n.template.multiProduct) != null && U.length ? (a(), s("div", Yo, [
                  (a(!0), s(M, null, z(n.template.multiProduct.slice(0, 3), (ie, c) => (a(), s("div", {
                    key: c,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, d(ie.name || "Product"), 1),
                      e("p", null, d(ie.price || "Price on request"), 1)
                    ]),
                    $[12] || ($[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : y("", !0)
              ]),
              e("div", Jo, [
                x.value ? (a(), s("button", Go, d(x.value), 1)) : y("", !0),
                e("p", Xo, [
                  $[13] || ($[13] = Z("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: $[0] || ($[0] = qe(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), s("div", Qo, [
              $[29] || ($[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Zo, [
                $[15] || ($[15] = e("span", null, "●", -1)),
                $[16] || ($[16] = Z(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: $[1] || ($[1] = qe(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", ei, [
                e("div", ti, [
                  n.template.header && n.template.header.type !== "text" ? (a(), s("div", ai, [
                    n.template.header.type === "image" && n.template.header.url ? (a(), s("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: n.template.header.url,
                      alt: "Header media"
                    }, null, 8, si)) : n.template.header.type === "video" && n.template.header.url ? (a(), s("div", ni, [
                      e("video", {
                        src: n.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, li),
                      $[17] || ($[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : n.template.header.type === "document" ? (a(), s("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: $[2] || ($[2] = qe(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", oi, d(oe.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: pe.value
                      }, d(pe.value), 9, ii)
                    ])) : (a(), s("div", ri, [
                      e("div", di, d(F.value) + " TEMPLATE", 1),
                      e("div", ui, d(W.value), 1),
                      Q.value ? (a(), s("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: re(Q.value)
                      }, null, 4)) : y("", !0)
                    ]))
                  ])) : (le = n.template.header) != null && le.text ? (a(), s("div", ci, d(n.template.header.text), 1)) : y("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: f.value
                  }, null, 8, pi),
                  N.value ? (a(), s("div", mi, [
                    e("div", vi, [
                      N.value.thumbnail ? (a(), s("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: re({ backgroundImage: `url(${N.value.thumbnail})` })
                      }, null, 4)) : y("", !0),
                      e("div", bi, [
                        e("strong", null, d(N.value.title), 1),
                        e("p", null, d(N.value.description), 1),
                        e("span", null, d(N.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: N.value.url,
                      onClick: $[3] || ($[3] = qe(() => {
                      }, ["prevent"]))
                    }, d(N.value.url), 9, fi)
                  ])) : y("", !0),
                  n.template.location ? (a(), s("div", gi, " 📍 " + d(n.template.location.name || n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)) : y("", !0),
                  (J = n.template.coupon) != null && J.code ? (a(), s("div", yi, [
                    $[18] || ($[18] = Z(" Coupon: ", -1)),
                    e("strong", null, d(n.template.coupon.code), 1)
                  ])) : y("", !0),
                  (L = n.template.auth) != null && L.code ? (a(), s("div", hi, [
                    $[19] || ($[19] = Z(" Verification code: ", -1)),
                    e("strong", null, d(n.template.auth.code), 1)
                  ])) : y("", !0),
                  n.template.limitedOffer ? (a(), s("div", ki, " Expires: " + d(n.template.limitedOffer), 1)) : y("", !0),
                  n.template.footer ? (a(), s("div", _i, d(n.template.footer), 1)) : y("", !0),
                  E.value ? (a(), s("div", wi, [
                    (a(!0), s(M, null, z((me = n.template.multiProduct) == null ? void 0 : me.slice(0, 4), (ie, c) => (a(), s("div", {
                      key: `prod-${c}`,
                      class: "wa-product-row"
                    }, [
                      e("span", $i, d(ie.name || `Item ${c + 1}`), 1),
                      e("span", xi, d(ie.price || "-"), 1)
                    ]))), 128))
                  ])) : y("", !0),
                  x.value ? (a(), s("button", Ci, [
                    C.value ? (a(), s("span", {
                      key: 0,
                      class: ue(["wa-btn-icon", te(C.value.type, C.value.value || C.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : y("", !0),
                    Z(" " + d(x.value), 1)
                  ])) : y("", !0),
                  T.value.length > 1 ? (a(), s("div", Si, [
                    (a(!0), s(M, null, z(T.value.slice(1, 4), (ie, c) => (a(), s("button", {
                      key: `action-${c}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: ue(["wa-btn-icon", te(ie.type, ie.value || ie.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      Z(" " + d(ie.text), 1)
                    ]))), 128))
                  ])) : y("", !0),
                  $[20] || ($[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: ue(["wa-side-icon", ye.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              n.template.orderCard ? (a(), s("div", Ii, [
                e("div", Ai, [
                  e("div", Bi, [
                    n.template.orderCard.image ? (a(), s("img", {
                      key: 0,
                      src: n.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Li)) : y("", !0),
                    e("div", null, [
                      e("strong", null, d(n.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, d(n.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Ui, d(n.template.orderCard.buttonLabel || "View"), 1),
                  $[21] || ($[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : y("", !0),
              n.template.documentCard || ((R = n.template.header) == null ? void 0 : R.type) === "document" ? (a(), s("div", Ri, [
                e("div", Ti, [
                  e("div", Pi, [
                    e("span", Vi, d(oe.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((k = n.template.documentCard) == null ? void 0 : k.filename) || ((B = n.template.header) == null ? void 0 : B.filename) || "document.pdf"
                      }, d(((X = n.template.documentCard) == null ? void 0 : X.filename) || ((ne = n.template.header) == null ? void 0 : ne.filename) || "document.pdf"), 9, Ni),
                      e("p", null, d(((ke = n.template.documentCard) == null ? void 0 : ke.size) || "243 KB • html"), 1)
                    ]),
                    $[22] || ($[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ei, d(((we = n.template.documentCard) == null ? void 0 : we.caption) || n.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : y("", !0),
              n.template.voiceNote ? (a(), s("div", Oi, [
                e("div", Mi, [
                  e("div", Di, [
                    $[24] || ($[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    $[25] || ($[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Wi, [
                      n.template.voiceNote.profileImage ? (a(), s("img", {
                        key: 0,
                        src: n.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, zi)) : y("", !0),
                      $[23] || ($[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Hi, d(n.template.voiceNote.duration || "0:10"), 1),
                  e("p", qi, d(n.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : y("", !0),
              n.template.contactCard ? (a(), s("div", Fi, [
                e("div", ji, [
                  e("strong", null, d(n.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, d(n.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, d(n.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, d(n.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, d(n.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : y("", !0),
              n.template.location && n.template.locationRequest ? (a(), s("div", Ki, [
                e("div", Yi, [
                  $[26] || ($[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Ji, [
                    e("strong", null, d(n.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: $[4] || ($[4] = qe(() => {
                      }, ["prevent"]))
                    }, d(n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)
                  ]),
                  e("button", Gi, d(n.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : y("", !0),
              ($e = n.template.carouselCards) != null && $e.length ? (a(), s("div", Xi, [
                e("div", Qi, [
                  (a(!0), s(M, null, z(n.template.carouselCards.slice(0, 4), (ie, c) => (a(), s("article", {
                    key: `c-${c}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: re(ie.image ? { backgroundImage: `url(${ie.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, d(ie.title || `Card ${c + 1}`), 1),
                    e("p", null, d(ie.description || "Card description"), 1),
                    e("button", Zi, d(ie.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : y("", !0),
              e("div", er, [
                e("div", tr, [
                  e("span", ar, d(_.value), 1),
                  e("p", null, d(be.value), 1),
                  $[27] || ($[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  n.template.reactionEmoji ? (a(), s("span", sr, d(n.template.reactionEmoji), 1)) : y("", !0)
                ])
              ]),
              e("div", nr, [
                e("div", lr, [
                  e("p", null, d(fe.value), 1),
                  (ge = n.template.flow) != null && ge.id ? (a(), s("a", {
                    key: 0,
                    href: "#",
                    onClick: $[5] || ($[5] = qe(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + d(n.template.flow.id), 1)) : y("", !0),
                  $[28] || ($[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            $[31] || ($[31] = ze('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), ir = /* @__PURE__ */ Ce(or, [["__scopeId", "data-v-244c945a"]]), rr = { class: "keos-whatsapp-builder" }, dr = { class: "kb-builder-top" }, ur = { style: { margin: 0, paddingLeft: "1.25rem" } }, cr = { class: "kb-wa-layout" }, pr = { class: "kb-wa-sidebar" }, mr = {
  key: 0,
  class: "kb-wa-form"
}, vr = { class: "kb-wa-form-head" }, br = { class: "kb-wa-form-head-top" }, fr = { class: "kb-wa-health-pill" }, gr = { class: "kb-wa-form-head-row" }, yr = ["value"], hr = { class: "kb-wa-health" }, kr = { class: "kb-wa-health-row" }, _r = { class: "kb-wa-health-value" }, wr = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, $r = { class: "kb-wa-canvas" }, xr = {
  key: 0,
  class: "kb-wa-test-banner"
}, Cr = { class: "kb-wa-preview-chrome" }, Sr = { class: "kb-push-preview-controls" }, Ir = { class: "kb-push-preview-as" }, Ar = ["value"], Br = { class: "kb-preview-status" }, Lr = { class: "kb-wa-actions" }, Ur = {
  key: 0,
  class: "kb-actions-note"
}, Rr = { class: "kb-wa-actions-right" }, Tr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Pr = { class: "kb-confirm-dialog" }, Vr = { class: "kb-confirm-actions" }, yt = 60, ht = 1024, kt = 60, _t = 10, wt = 10, Nr = /* @__PURE__ */ _e({
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
  setup(n, { emit: r }) {
    function v(c) {
      var G, p, o, w, H;
      const S = [], D = c.message, ce = (D.template_category ?? "").toString().trim(), ve = (D.template_type ?? "text").toString(), xe = (D.header_type ?? "none").toString(), Se = (D.header ?? "").toString(), Le = (D.body ?? "").toString(), Ue = (D.footer ?? "").toString(), Re = Array.isArray(D.buttons) ? D.buttons : [], Ie = Array.isArray(D.cards) ? D.cards : [];
      return (G = c.name) != null && G.trim() || S.push("Template name is required"), (p = D.template_name) != null && p.trim() || S.push("WhatsApp template name is required"), ce || S.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), Le.trim() || S.push("Body is required"), xe === "text" && Se.length > yt && S.push(`Header text cannot exceed ${yt} characters`), Le.length > ht && S.push(`Body cannot exceed ${ht} characters`), Ue.length > kt && S.push(`Footer cannot exceed ${kt} characters`), Re.length > _t && S.push(`Buttons cannot exceed ${_t}`), (ve === "image" || ve === "video" || ve === "document" || xe === "image" || xe === "video" || xe === "document") && !D.media_url && S.push("Media URL is required for rich media templates"), ce === "authentication" && ve !== "auth" && S.push("Authentication category must use Authentication format"), ve === "auth" && !((o = D.auth_label) != null && o.trim()) && !Le.includes("{{") && S.push("Authentication templates should include a code label or placeholder variable"), ve === "lto" && !D.lto_expiry && S.push("Limited-time offer requires an expiry"), (ve === "mpm" || ve === "catalog") && !((w = D.products) != null && w.length) && S.push("Catalog and multi-product templates require at least one product"), ve === "flow" && !((H = D.flow_id) != null && H.trim()) && S.push("WhatsApp Flow format requires a flow ID"), ve === "carousel" && (Ie.length ? Ie.length > wt && S.push(`Carousel supports up to ${wt} cards`) : S.push("Carousel format requires at least one card")), S;
    }
    const f = n, _ = r, {
      campaign: b,
      dirty: A,
      customValidatorErrors: C,
      getValidationWithWarnings: x,
      update: T,
      updateMessage: E,
      undo: F,
      redo: W,
      canUndo: Q,
      canRedo: K,
      resetMessage: pe,
      hooks: Y
    } = Ge({
      initial: f.modelValue,
      hooks: {
        ...f.hooks,
        customValidators: async (c) => {
          var ce;
          const S = v(c), D = (ce = f.hooks) != null && ce.customValidators ? await f.hooks.customValidators(c) : [];
          return [...S, ...D];
        }
      },
      onDirty: () => _("change", b.value)
    }), { lastSavedAt: ee } = Xe(b, { channel: "whatsapp" });
    function N(c) {
      (c.metaKey || c.ctrlKey) && c.key === "z" && (c.preventDefault(), c.shiftKey ? W() : F());
    }
    je(() => {
      window.addEventListener("keydown", N);
    }), Ke(() => {
      window.removeEventListener("keydown", N);
    }), Be(b, (c) => _("update:modelValue", c), { deep: !0 });
    const oe = se(), te = se(!0);
    async function ye() {
      if (Y.estimateReach)
        try {
          oe.value = await Y.estimateReach(b.value.audience);
        } catch {
          oe.value = void 0;
        }
      Y.canSend && (te.value = await Promise.resolve(Y.canSend()));
    }
    ye(), Be(() => b.value.audience, ye, { deep: !0 });
    const be = h(() => (C.value, x(oe.value))), fe = h(() => be.value.blockingErrors), q = h(() => be.value.warnings), g = h(() => be.value.valid), $ = h(() => {
      var ce, ve, xe;
      const c = b.value.message, S = [
        !!((ce = c.template_name) != null && ce.trim()),
        !!((ve = c.template_category) != null && ve.trim()),
        !!(c.body ?? "").toString().trim(),
        !!((xe = c.template_language) != null && xe.trim()),
        Array.isArray(c.buttons) ? c.buttons.length > 0 : !1
      ], D = S.filter(Boolean).length;
      return Math.round(D / S.length * 100);
    }), U = h(() => $.value >= 90 ? "Production ready" : $.value >= 70 ? "Strong draft" : $.value >= 40 ? "In progress" : "Needs setup"), le = h(() => {
      const c = b.value.message;
      return !!((c.body ?? "").toString().trim() || (c.header ?? "").toString().trim() || c.media_url || c.flow_id || c.coupon_code || c.lto_expiry || c.voice_transcript || c.contact_name || c.link_title || c.order_title || Array.isArray(c.buttons) && c.buttons.length || Array.isArray(c.products) && c.products.length || Array.isArray(c.cards) && c.cards.length);
    }), J = se(""), L = se(!1), me = se(null), R = h(() => {
      const c = J.value;
      return c ? De.find((S) => S.id === c) ?? null : null;
    }), k = h(() => {
      const c = b.value.message.body ?? "";
      return R.value ? Oe(c, R.value.data) : c;
    }), B = h(() => {
      const c = b.value.message.header ?? "";
      return R.value ? Oe(c, R.value.data) : c;
    }), X = h(() => {
      var p;
      const c = b.value.message, S = c.template_type ?? "text", D = c.header_type ?? "none";
      let ce, ve, xe, Se, Le, Ue, Re;
      (S === "image" || D === "image") && c.media_url ? ce = { type: "image", url: c.media_url } : (S === "video" || D === "video") && c.media_url ? ce = { type: "video", url: c.media_url } : S === "document" || D === "document" ? ce = {
        type: "document",
        url: c.media_url || void 0,
        filename: c.document_filename || c.media_url || "document.pdf"
      } : D === "text" && c.header ? ce = { type: "text", text: B.value } : c.header && (ce = { type: "text", text: B.value });
      const Ie = k.value || "Start adding content to see a live preview here.";
      if (S === "location" && c.location) {
        const o = c.location, w = o.lat ?? o.latitude, H = o.lng ?? o.lon ?? o.longitude;
        w != null && H != null && (ve = {
          lat: w,
          lng: H,
          name: o.name ?? o.title,
          address: o.address ?? `${w}, ${H}`
        });
      }
      (S === "catalog" || S === "mpm") && Array.isArray(c.products) && c.products.length && (xe = !0, Se = c.products.map((o) => ({
        image: o.image ?? o.imageUrl,
        name: o.name ?? o.sectionTitle ?? o.title ?? "Product",
        price: o.price ?? o.productId ?? ""
      }))), S === "carousel" && Array.isArray(c.cards) && c.cards.length && (xe = !0, Se = c.cards.map((o) => ({
        image: o.image ?? o.media_url,
        name: o.title ?? "Card",
        price: o.button_label ?? ""
      }))), S === "coupon" && c.coupon_code && (Le = { code: c.coupon_code }), S === "lto" && c.lto_expiry && (Ue = c.lto_expiry), S === "auth" && (Re = { code: c.auth_code ?? c.otp_code ?? "123 456" });
      const G = c.buttons ?? [];
      return S === "flow" && ((p = c.flow_cta_label) != null && p.trim()) && G.push({
        label: c.flow_cta_label
      }), {
        format: S,
        templateName: c.template_name || void 0,
        templateLanguage: c.template_language || void 0,
        templateCategory: c.template_category || void 0,
        header: ce,
        body: Ie,
        mediaCaption: c.media_caption || void 0,
        footer: c.footer || void 0,
        buttons: G.map((o) => ({ text: o.label || "Button", type: o.type, value: o.value })),
        location: ve,
        catalog: xe,
        multiProduct: Se,
        coupon: Le,
        limitedOffer: Ue,
        auth: Re,
        linkPreview: c.link_title || c.link_description || c.link_url ? {
          title: c.link_title || void 0,
          description: c.link_description || void 0,
          domain: c.link_domain || void 0,
          url: c.link_url || void 0,
          thumbnail: c.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: c.voice_transcript || c.voice_duration || c.voice_profile_image ? {
          transcript: c.voice_transcript || void 0,
          duration: c.voice_duration || void 0,
          profileImage: c.voice_profile_image || void 0
        } : void 0,
        contactCard: c.contact_name || c.contact_phone || c.contact_email ? {
          name: c.contact_name || void 0,
          title: c.contact_title || void 0,
          phone: c.contact_phone || void 0,
          email: c.contact_email || void 0,
          address: c.contact_address || void 0
        } : void 0,
        documentCard: c.document_filename || S === "document" || D === "document" ? {
          filename: c.document_filename || c.media_url || "document.pdf",
          size: c.document_size || void 0,
          caption: c.media_caption || void 0
        } : void 0,
        locationRequest: c.location_request_label ? { label: c.location_request_label } : void 0,
        orderCard: c.order_title || c.order_items || c.order_image ? {
          title: c.order_title || void 0,
          items: c.order_items || void 0,
          image: c.order_image || void 0,
          buttonLabel: c.order_button_label || void 0
        } : void 0,
        carouselCards: S === "carousel" && Array.isArray(c.cards) ? c.cards.map((o) => ({
          title: o.title || void 0,
          description: o.description || c.body || void 0,
          image: o.media_url || void 0,
          button: o.button_label || void 0
        })) : void 0,
        reactionEmoji: c.reaction_emoji || void 0,
        flow: S === "flow" ? {
          id: c.flow_id || void 0,
          ctaLabel: c.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function ne(c) {
      const S = b.value, D = c.campaign.message ? { ...S.message, ...c.campaign.message } : S.message;
      T({
        ...c.campaign,
        message: D
      }), me.value = null, L.value = !1;
    }
    function ke(c) {
      const S = c.target.value;
      if (!S) return;
      const D = vt.find((ce) => ce.id === S);
      D && (A.value ? (me.value = D, L.value = !0) : ne(D), c.target.value = "");
    }
    function we(c) {
      T({
        name: c,
        message: { ...b.value.message, template_name: c || void 0 },
        tracking: { ...b.value.tracking ?? {}, campaign_name: c }
      });
    }
    function $e(c) {
      if (E(c), Object.prototype.hasOwnProperty.call(c ?? {}, "template_name")) {
        const S = String((c == null ? void 0 : c.template_name) ?? "");
        S !== b.value.name && T({
          name: S,
          tracking: {
            ...b.value.tracking ?? {},
            campaign_name: S
          }
        });
      }
    }
    Be(
      () => b.value.name,
      (c) => {
        const S = String(b.value.message.template_name ?? "");
        (c || "") !== S && E({ template_name: c || void 0 });
      },
      { immediate: !0 }
    );
    function ge(c) {
      const S = ` {{ ${c.variable} }}`, D = b.value.message.variables ?? [], ce = Array.from(/* @__PURE__ */ new Set([...D, c.variable]));
      if (c.field === "title") {
        const ve = b.value.message.header ?? "";
        E({
          variables: ce,
          header: ve + S
        });
      } else {
        const ve = b.value.message.body ?? "";
        E({
          variables: ce,
          body: ve + S
        });
      }
    }
    function ie() {
      g.value && _("save", b.value);
    }
    return (c, S) => (a(), s("div", rr, [
      e("div", dr, [
        Ae(Qe, {
          "campaign-name": m(b).name,
          status: m(b).status,
          dirty: m(A),
          "last-saved-at": m(ee),
          "can-undo": m(Q),
          "can-redo": m(K),
          "slugify-name": f.enforceSlugName,
          "onUpdate:campaignName": we,
          onUndo: m(F),
          onRedo: m(W)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        fe.value.length > 0 ? (a(), s("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: m(de).dangerBg,
            border: `1px solid ${m(de).dangerBorder}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[12]}px ${m(ae)[16]}px`,
            marginBottom: `${m(ae)[16]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: m(de).danger })
          }, [
            (a(!0), s(M, null, z(fe.value, (D) => (a(), s("li", {
              key: D.message
            }, d(D.message), 1))), 128))
          ], 4)
        ], 4)) : y("", !0),
        q.value.length > 0 ? (a(), s("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: m(de).neutral.bg,
            border: `1px solid ${m(de).neutral.border}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[12]}px ${m(ae)[16]}px`,
            marginBottom: `${m(ae)[16]}px`,
            fontSize: "0.875rem",
            color: m(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${m(ae)[4]}px` })
          }, "Warnings", 4),
          e("ul", ur, [
            (a(!0), s(M, null, z(q.value, (D) => (a(), s("li", {
              key: D.message
            }, d(D.message), 1))), 128))
          ])
        ], 4)) : y("", !0)
      ]),
      e("div", cr, [
        e("aside", pr, [
          n.disabledSections.includes("whatsapp") ? y("", !0) : (a(), s("div", mr, [
            e("div", vr, [
              e("div", br, [
                S[6] || (S[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                e("span", fr, d(U.value), 1)
              ]),
              e("div", gr, [
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  S[7] || (S[7] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), s(M, null, z(m(vt), (D) => (a(), s("option", {
                    key: D.id,
                    value: D.id
                  }, d(D.label), 9, yr))), 128))
                ], 32)
              ]),
              e("div", hr, [
                e("div", kr, [
                  S[8] || (S[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                  e("span", _r, d($.value) + "%", 1)
                ]),
                e("div", wr, [
                  e("span", {
                    class: "kb-wa-health-fill",
                    style: re({ width: `${$.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ae(Po, {
              message: m(b).message,
              "show-reset": !0,
              onUpdate: $e,
              onReset: S[0] || (S[0] = (D) => m(pe)())
            }, null, 8, ["message"]),
            Ae(Rt, {
              message: m(b).message,
              "variable-options": n.variableOptions,
              onUpdate: m(E),
              onInsertVariable: ge
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", $r, [
          !n.designOnly && m(b).audience.test_mode ? (a(), s("div", xr, [...S[9] || (S[9] = [
            e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
            Z(" Test mode — only your test segment will receive this. ", -1)
          ])])) : y("", !0),
          e("div", Cr, [
            e("div", Sr, [
              e("label", Ir, [
                S[11] || (S[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Te(e("select", {
                  "onUpdate:modelValue": S[1] || (S[1] = (D) => J.value = D),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  S[10] || (S[10] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), s(M, null, z(m(De), (D) => (a(), s("option", {
                    key: D.id,
                    value: D.id
                  }, d(D.label), 9, Ar))), 128))
                ], 512), [
                  [Ne, J.value]
                ])
              ]),
              e("div", Br, [
                S[12] || (S[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                e("strong", null, d(m(b).message.template_type || "text"), 1)
              ])
            ]),
            e("div", {
              class: ue(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !le.value }])
            }, [
              Ae(ir, { template: X.value }, null, 8, ["template"])
            ], 2)
          ])
        ])
      ]),
      e("footer", Lr, [
        f.actionsNote ? (a(), s("div", Ur, d(f.actionsNote), 1)) : y("", !0),
        e("div", Rr, [
          n.showDuplicate ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: S[2] || (S[2] = (D) => _("duplicate", JSON.parse(JSON.stringify(m(b)))))
          }, " Duplicate ")) : y("", !0),
          n.showSave ? (a(), s("button", {
            key: 1,
            type: "button",
            class: "kb-wa-action kb-wa-action--secondary",
            onClick: ie
          }, " Save ")) : y("", !0),
          n.showClose ? (a(), s("button", {
            key: 2,
            type: "button",
            class: "kb-wa-action kb-wa-action--primary",
            onClick: S[3] || (S[3] = (D) => _("edit"))
          }, " Close ")) : y("", !0)
        ])
      ]),
      L.value ? (a(), s("div", Tr, [
        e("div", Pr, [
          S[13] || (S[13] = e("h2", {
            id: "wa-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          S[14] || (S[14] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Vr, [
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: S[4] || (S[4] = (D) => {
                L.value = !1, me.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: S[5] || (S[5] = (D) => me.value && ne(me.value))
            }, " Replace ")
          ])
        ])
      ])) : y("", !0)
    ]));
  }
}), Vt = /* @__PURE__ */ Ce(Nr, [["__scopeId", "data-v-9890dd3c"]]), Er = { class: "kb-section" }, Or = { class: "kb-section__head" }, Mr = { class: "kb-field" }, Dr = ["value"], Wr = { class: "kb-field" }, zr = { class: "kb-label" }, Hr = { key: 0 }, qr = { key: 1 }, Fr = { key: 2 }, jr = ["value"], Kr = {
  key: 0,
  class: "kb-truncation-hint"
}, Yr = { class: "kb-field" }, Jr = { class: "kb-insert-row" }, Gr = ["value"], Xr = { class: "kb-field" }, Qr = { class: "kb-insert-row" }, Zr = /* @__PURE__ */ _e({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    const v = n, f = r, _ = ["first_name", "last_name", "order_id", "city"], b = se(v.variableOptions && v.variableOptions.length ? [...v.variableOptions] : _), A = se(b.value[0] ?? _[0]), C = se("");
    Be(
      () => v.variableOptions,
      (Y) => {
        Y && Y.length && (b.value = [...Y], b.value.includes(A.value) || (A.value = b.value[0]));
      }
    );
    const x = h(() => v.message.body ?? ""), T = h(() => x.value.length), E = h(() => T.value ? T.value <= 160 ? 1 : Math.ceil(T.value / 153) : 0), F = h(() => {
      const Y = T.value;
      return Y <= 160 ? null : Y <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function W(Y) {
      const ee = Y.target.value;
      f("update", {
        sender_id: ee || void 0
      });
    }
    function Q(Y) {
      const ee = Y.target.value;
      f("update", {
        body: ee
      });
    }
    function K() {
      const Y = A.value;
      if (!Y) return;
      const ee = ` {{ ${Y} }}`, N = x.value || "", oe = v.message.variables ?? [], te = Array.from(/* @__PURE__ */ new Set([...oe, Y]));
      f("update", {
        body: N + ee,
        variables: te
      });
    }
    function pe() {
      const Y = C.value.trim();
      Y && (b.value.includes(Y) || (b.value = [...b.value, Y]), A.value = Y, C.value = "");
    }
    return (Y, ee) => (a(), s("section", Er, [
      e("div", Or, [
        ee[3] || (ee[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        n.showReset ? (a(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: ee[0] || (ee[0] = (N) => Y.$emit("reset"))
        }, " Reset section ")) : y("", !0)
      ]),
      ee[10] || (ee[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Mr, [
        ee[4] || (ee[4] = e("label", { class: "kb-label" }, [
          Z(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: v.message.sender_id ?? "",
          onInput: W
        }, null, 40, Dr)
      ]),
      e("div", Wr, [
        e("label", zr, [
          ee[5] || (ee[5] = Z(" Message body ", -1)),
          e("span", {
            class: ue(["kb-counter", { "kb-counter--warn": E.value > 3 }])
          }, [
            Z(d(T.value) + " chars · ", 1),
            E.value === 0 ? (a(), s("span", Hr, "0 segments")) : E.value === 1 ? (a(), s("span", qr, "1 segment")) : (a(), s("span", Fr, d(E.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ first_name }}, your order {{ order_id }} is out for delivery.",
          value: x.value,
          onInput: Q
        }, null, 40, jr),
        ee[6] || (ee[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        F.value ? (a(), s("p", Kr, d(F.value), 1)) : y("", !0)
      ]),
      e("div", Yr, [
        ee[7] || (ee[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Jr, [
          Te(e("select", {
            "onUpdate:modelValue": ee[1] || (ee[1] = (N) => A.value = N),
            class: "kb-select"
          }, [
            (a(!0), s(M, null, z(b.value, (N) => (a(), s("option", {
              key: N,
              value: N
            }, d(N), 9, Gr))), 128))
          ], 512), [
            [Ne, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: K
          }, " Insert into message ")
        ]),
        ee[8] || (ee[8] = e("p", { class: "kb-hint" }, " Variables render as {{ variable_name }} at send time (e.g. first_name, city). ", -1))
      ]),
      e("div", Xr, [
        ee[9] || (ee[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qr, [
          Te(e("input", {
            "onUpdate:modelValue": ee[2] || (ee[2] = (N) => C.value = N),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [nt, C.value]
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
}), ed = /* @__PURE__ */ Ce(Zr, [["__scopeId", "data-v-ed9aa1f7"]]), td = { class: "keos-sms-builder" }, ad = { class: "kb-builder-top" }, sd = { style: { margin: 0, paddingLeft: "1.25rem" } }, nd = { class: "kb-sms-layout" }, ld = { class: "kb-sms-sidebar" }, od = {
  key: 0,
  class: "kb-sms-form"
}, id = { class: "kb-sms-form-head" }, rd = { class: "kb-sms-form-head-top" }, dd = { class: "kb-sms-health-pill" }, ud = { class: "kb-wa-form-head-row" }, cd = ["value"], pd = { class: "kb-sms-health" }, md = { class: "kb-sms-health-row" }, vd = { class: "kb-sms-health-value" }, bd = { class: "kb-sms-health-bar" }, fd = { class: "kb-sms-canvas" }, gd = {
  key: 0,
  class: "kb-sms-test-banner"
}, yd = { class: "kb-sms-preview-chrome" }, hd = { class: "kb-push-preview-controls" }, kd = { class: "kb-push-preview-as" }, _d = ["value"], wd = { class: "kb-preview-status" }, $d = { class: "kb-preview" }, xd = { class: "kb-sms-preview" }, Cd = { class: "kb-sms-phone" }, Sd = { class: "kb-sms-header" }, Id = { class: "kb-sms-sender-avatar" }, Ad = { class: "kb-sms-header-copy" }, Bd = { class: "kb-sms-sender" }, Ld = { class: "kb-sms-meta" }, Ud = { class: "kb-sms-thread" }, Rd = {
  key: 0,
  class: "kb-sms-empty"
}, Td = { class: "kb-sms-text" }, Pd = { class: "kb-sms-bubble-meta" }, Vd = {
  key: 0,
  class: "kb-sms-segment-chip"
}, Nd = {
  key: 0,
  class: "kb-sms-more-segments"
}, Ed = { class: "kb-sms-delivery-line" }, Od = { class: "kb-sms-counter" }, Md = { key: 0 }, Dd = { key: 1 }, Wd = { key: 2 }, zd = {
  key: 3,
  class: "kb-sms-cost"
}, Hd = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, qd = { class: "kb-sms-actions" }, Fd = {
  key: 0,
  class: "kb-actions-note"
}, jd = { class: "kb-sms-actions-right" }, Kd = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Yd = { class: "kb-confirm-dialog" }, Jd = { class: "kb-confirm-actions" }, Gd = /* @__PURE__ */ _e({
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
  setup(n, { emit: r }) {
    const v = n, f = r, {
      campaign: _,
      dirty: b,
      customValidatorErrors: A,
      getValidationWithWarnings: C,
      update: x,
      updateMessage: T,
      undo: E,
      redo: F,
      canUndo: W,
      canRedo: Q,
      resetMessage: K,
      hooks: pe
    } = Ge({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (G) => {
          var w, H;
          const p = [];
          (w = G.name) != null && w.trim() || p.push("Template name is required");
          const o = (H = v.hooks) != null && H.customValidators ? await v.hooks.customValidators(G) : [];
          return [...p, ...o];
        }
      },
      onDirty: () => f("change", _.value)
    }), { lastSavedAt: Y } = Xe(_, { channel: "sms" });
    function ee(G) {
      (G.metaKey || G.ctrlKey) && G.key === "z" && (G.preventDefault(), G.shiftKey ? F() : E());
    }
    je(() => {
      window.addEventListener("keydown", ee);
    }), Ke(() => {
      window.removeEventListener("keydown", ee);
    }), Be(_, (G) => f("update:modelValue", G), { deep: !0 });
    const N = se(), oe = se(!0);
    async function te() {
      if (pe.estimateReach)
        try {
          N.value = await pe.estimateReach(_.value.audience);
        } catch {
          N.value = void 0;
        }
      pe.canSend && (oe.value = await Promise.resolve(pe.canSend()));
    }
    te(), Be(() => _.value.audience, te, { deep: !0 });
    const ye = h(() => (A.value, C(N.value))), be = h(() => ye.value.blockingErrors), fe = h(() => ye.value.warnings), q = h(() => ye.value.valid), g = h(() => {
      var w, H, j;
      const G = _.value.message, p = [
        !!((w = _.value.name) != null && w.trim()),
        !!((H = G.body) != null && H.trim()),
        !!((j = G.sender_id) != null && j.trim()),
        !!_.value.template_type,
        (G.body ?? "").length > 20
      ], o = p.filter(Boolean).length;
      return Math.round(o / p.length * 100);
    }), $ = h(() => g.value >= 90 ? "Production ready" : g.value >= 70 ? "Strong draft" : g.value >= 40 ? "In progress" : "Needs setup"), U = h(() => !!we.value.trim()), le = h(
      () => _.value.template_type ?? "transactional"
    ), J = se(""), L = se(!1), me = se(null), R = h(() => {
      const G = J.value;
      return G ? De.find((p) => p.id === G) ?? null : null;
    }), k = h(() => {
      const G = we.value;
      return R.value ? Oe(G, R.value.data) : G;
    });
    function B(G) {
      const p = _.value, o = G.campaign.message ? { ...p.message, ...G.campaign.message } : p.message;
      x({
        ...G.campaign,
        message: o
      }), me.value = null, L.value = !1;
    }
    function X(G) {
      const p = G.target.value;
      if (!p) return;
      const o = bt.find((w) => w.id === p);
      o && (b.value ? (me.value = o, L.value = !0) : B(o), G.target.value = "");
    }
    function ne(G) {
      x({ template_type: G });
    }
    function ke(G) {
      x({
        name: G,
        tracking: { ..._.value.tracking ?? {}, campaign_name: G }
      });
    }
    const we = h(
      () => (_.value.message.body ?? "") || ""
    ), $e = h(() => we.value.length), ge = h(() => /[^\x00-\x7f]/.test(we.value)), ie = h(() => ge.value ? 70 : 160), c = h(() => ge.value ? 67 : 153), S = h(() => $e.value ? $e.value <= ie.value ? 1 : Math.ceil($e.value / c.value) : 0), D = h(() => {
      const G = k.value.trim();
      if (!G) return [];
      const p = S.value <= 1 ? ie.value : c.value, o = [];
      for (let w = 0; w < G.length; w += p)
        o.push(G.slice(w, w + p));
      return o;
    }), ce = h(() => D.value.slice(0, 3)), ve = h(
      () => Math.max(0, D.value.length - ce.value.length)
    ), xe = h(() => ge.value ? "Unicode" : "GSM-7"), Se = h(() => U.value ? S.value > 3 ? "Queued" : "Delivered" : "Draft"), Le = h(() => {
      const G = v.costPerSegment ?? 0;
      return !G || S.value === 0 ? null : (S.value * G).toFixed(2);
    }), Ue = h(() => {
      const G = $e.value, p = ie.value + c.value;
      return G <= ie.value ? null : G <= p ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Re = h(
      () => _.value.message.sender_id ?? "YourBrand"
    );
    function Ie() {
      q.value && f("save", _.value);
    }
    return (G, p) => (a(), s("div", td, [
      e("div", ad, [
        Ae(Qe, {
          "campaign-name": m(_).name,
          status: m(_).status,
          dirty: m(b),
          "last-saved-at": m(Y),
          "can-undo": m(W),
          "can-redo": m(Q),
          "slugify-name": v.enforceSlugName,
          "onUpdate:campaignName": ke,
          onUndo: m(E),
          onRedo: m(F)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        be.value.length > 0 ? (a(), s("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: m(de).dangerBg,
            border: `1px solid ${m(de).dangerBorder}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[12]}px ${m(ae)[16]}px`,
            marginBottom: `${m(ae)[16]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: m(de).danger })
          }, [
            (a(!0), s(M, null, z(be.value, (o) => (a(), s("li", {
              key: o.message
            }, d(o.message), 1))), 128))
          ], 4)
        ], 4)) : y("", !0),
        fe.value.length > 0 ? (a(), s("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: m(de).neutral.bg,
            border: `1px solid ${m(de).neutral.border}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[12]}px ${m(ae)[16]}px`,
            marginBottom: `${m(ae)[16]}px`,
            fontSize: "0.875rem",
            color: m(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${m(ae)[4]}px` })
          }, "Warnings", 4),
          e("ul", sd, [
            (a(!0), s(M, null, z(fe.value, (o) => (a(), s("li", {
              key: o.message
            }, d(o.message), 1))), 128))
          ])
        ], 4)) : y("", !0)
      ]),
      e("div", nd, [
        e("aside", ld, [
          n.disabledSections.includes("sms") ? y("", !0) : (a(), s("div", od, [
            e("div", id, [
              e("div", rd, [
                p[6] || (p[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                e("span", dd, d($.value), 1)
              ]),
              e("div", ud, [
                Ae(dt, {
                  "template-type": le.value,
                  onUpdate: ne
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: X
                }, [
                  p[7] || (p[7] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), s(M, null, z(m(bt), (o) => (a(), s("option", {
                    key: o.id,
                    value: o.id
                  }, d(o.label), 9, cd))), 128))
                ], 32)
              ]),
              e("div", pd, [
                e("div", md, [
                  p[8] || (p[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                  e("span", vd, d(g.value) + "%", 1)
                ]),
                e("div", bd, [
                  e("span", {
                    class: "kb-sms-health-fill",
                    style: re({ width: `${g.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ae(ed, {
              message: m(_).message,
              "variable-options": n.variableOptions,
              "show-reset": !0,
              onUpdate: m(T),
              onReset: p[0] || (p[0] = (o) => m(K)())
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", fd, [
          !n.designOnly && m(_).audience.test_mode ? (a(), s("div", gd, [...p[9] || (p[9] = [
            e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
            Z(" Test mode — only your test segment will receive this. ", -1)
          ])])) : y("", !0),
          e("div", yd, [
            e("div", hd, [
              e("label", kd, [
                p[11] || (p[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Te(e("select", {
                  "onUpdate:modelValue": p[1] || (p[1] = (o) => J.value = o),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  p[10] || (p[10] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), s(M, null, z(m(De), (o) => (a(), s("option", {
                    key: o.id,
                    value: o.id
                  }, d(o.label), 9, _d))), 128))
                ], 512), [
                  [Ne, J.value]
                ])
              ]),
              e("div", wd, [
                p[12] || (p[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                e("strong", null, d(S.value || 0), 1)
              ])
            ]),
            e("div", {
              class: ue(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !U.value }])
            }, [
              e("div", $d, [
                e("div", xd, [
                  e("div", Cd, [
                    p[15] || (p[15] = e("div", { class: "kb-sms-status-bar" }, [
                      e("span", { class: "kb-sms-time" }, "9:41"),
                      e("span", { class: "kb-sms-device-icons" }, [
                        e("i"),
                        e("i"),
                        e("i")
                      ])
                    ], -1)),
                    e("div", Sd, [
                      e("div", Id, d(Re.value.slice(0, 1).toUpperCase()), 1),
                      e("div", Ad, [
                        e("div", Bd, d(Re.value), 1),
                        e("div", Ld, "Text message · " + d(Se.value), 1)
                      ])
                    ]),
                    e("div", Ud, [
                      U.value ? (a(), s(M, { key: 1 }, [
                        (a(!0), s(M, null, z(ce.value, (o, w) => (a(), s("div", {
                          key: `${w}-${o.length}`,
                          class: "kb-sms-bubble kb-sms-bubble--outgoing"
                        }, [
                          e("span", Td, d(o), 1),
                          e("span", Pd, [
                            p[13] || (p[13] = Z(" 09:21 ", -1)),
                            ce.value.length > 1 ? (a(), s("span", Vd, "Part " + d(w + 1), 1)) : y("", !0)
                          ])
                        ]))), 128)),
                        ve.value > 0 ? (a(), s("div", Nd, " +" + d(ve.value) + " more segments ", 1)) : y("", !0),
                        e("div", Ed, [
                          p[14] || (p[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                          Z(" " + d(Se.value), 1)
                        ])
                      ], 64)) : (a(), s("div", Rd, " Start typing your SMS to see a realistic thread preview. "))
                    ])
                  ]),
                  e("p", Od, [
                    Z(d($e.value) + " characters · ", 1),
                    S.value === 0 ? (a(), s("span", Md, "0 segments")) : S.value === 1 ? (a(), s("span", Dd, "1 segment")) : (a(), s("span", Wd, d(S.value) + " segments", 1)),
                    Z(" (" + d(ie.value) + " chars single, " + d(c.value) + " multi-part · " + d(xe.value) + ") ", 1),
                    Le.value !== null ? (a(), s("span", zd, " · Est. " + d(Le.value), 1)) : y("", !0)
                  ]),
                  Ue.value ? (a(), s("p", Hd, d(Ue.value), 1)) : y("", !0)
                ])
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", qd, [
        v.actionsNote ? (a(), s("div", Fd, d(v.actionsNote), 1)) : y("", !0),
        e("div", jd, [
          n.showDuplicate ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: p[2] || (p[2] = (o) => f("duplicate", JSON.parse(JSON.stringify(m(_)))))
          }, " Duplicate ")) : y("", !0),
          n.showSave ? (a(), s("button", {
            key: 1,
            type: "button",
            class: "kb-sms-action kb-sms-action--secondary",
            onClick: Ie
          }, " Save ")) : y("", !0),
          n.showClose ? (a(), s("button", {
            key: 2,
            type: "button",
            class: "kb-sms-action kb-sms-action--primary",
            onClick: p[3] || (p[3] = (o) => f("edit"))
          }, " Close ")) : y("", !0)
        ])
      ]),
      L.value ? (a(), s("div", Kd, [
        e("div", Yd, [
          p[16] || (p[16] = e("h2", {
            id: "sms-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          p[17] || (p[17] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", Jd, [
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: p[4] || (p[4] = (o) => {
                L.value = !1, me.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: p[5] || (p[5] = (o) => me.value && B(me.value))
            }, " Replace ")
          ])
        ])
      ])) : y("", !0)
    ]));
  }
}), Nt = /* @__PURE__ */ Ce(Gd, [["__scopeId", "data-v-777ccabe"]]), Xd = 30, Qd = 60, Zd = 130;
function eu(n) {
  const r = (n ?? "").trim().length;
  return r < Xd ? "too_short" : r <= Qd ? "good" : "too_long";
}
function tu(n) {
  const r = (n ?? "").trim().length;
  return r === 0 ? "too_short" : r <= Zd ? "good" : "too_long";
}
const au = [
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
function $t(n) {
  if (!n || typeof n != "string") return [];
  const r = [];
  for (const v of au) {
    const f = n.match(v);
    f && r.push(f[0]);
  }
  return r;
}
function su(n) {
  switch (n) {
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
function nu(n) {
  switch (n) {
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
const lu = { class: "em-section" }, ou = { class: "em-strip kb-section" }, iu = { class: "em-strip-head" }, ru = { class: "em-field kb-field" }, du = ["value"], uu = { class: "em-field kb-field" }, cu = ["value"], pu = { class: "em-field kb-field" }, mu = ["value"], vu = { class: "em-field kb-field" }, bu = { class: "em-input-group" }, fu = ["value"], gu = { class: "em-var-picker-wrap" }, yu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, hu = ["onClick"], ku = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, _u = { class: "em-field kb-field" }, wu = { class: "em-input-group" }, $u = ["value"], xu = { class: "em-var-picker-wrap" }, Cu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Su = ["onClick"], Iu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Au = { class: "em-strip kb-section em-strip--library" }, Bu = { class: "em-library-chips" }, Lu = ["onClick"], Uu = { class: "em-strip kb-section em-strip--blocks" }, Ru = { class: "em-block-list" }, Tu = ["data-type"], Pu = { class: "em-block-bar" }, Vu = { class: "em-block-type" }, Nu = { class: "em-block-actions" }, Eu = ["disabled", "onClick"], Ou = ["disabled", "onClick"], Mu = ["onClick"], Du = {
  key: 0,
  class: "em-block-fields"
}, Wu = ["value", "onChange"], zu = ["value", "onInput"], Hu = { class: "em-var-picker-wrap" }, qu = ["onClick"], Fu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ju = ["onClick"], Ku = {
  key: 1,
  class: "em-block-fields"
}, Yu = ["value", "onInput"], Ju = { class: "em-var-picker-wrap" }, Gu = ["onClick"], Xu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Qu = ["onClick"], Zu = {
  key: 2,
  class: "em-block-fields"
}, ec = ["value", "onInput"], tc = ["value", "onInput"], ac = ["value", "onInput"], sc = {
  key: 3,
  class: "em-block-fields"
}, nc = ["value", "onInput"], lc = ["value", "onInput"], oc = { class: "em-block-fields--row" }, ic = ["value", "onInput"], rc = { class: "em-check-row" }, dc = ["checked", "onChange"], uc = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, cc = ["value", "onInput"], pc = {
  key: 5,
  class: "em-block-fields"
}, mc = ["value", "onInput"], vc = ["value", "onInput"], bc = ["value", "onInput"], fc = { class: "em-var-picker-wrap" }, gc = ["onClick"], yc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, hc = ["onClick"], kc = {
  key: 6,
  class: "em-block-fields"
}, _c = ["value", "onChange"], wc = { class: "em-list-items" }, $c = ["value", "onInput", "placeholder"], xc = ["onClick"], Cc = ["onClick"], Sc = {
  key: 7,
  class: "em-block-fields"
}, Ic = ["value", "onChange"], Ac = ["value", "onInput"], Bc = { class: "em-var-picker-wrap" }, Lc = ["onClick"], Uc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Rc = ["onClick"], Tc = {
  key: 8,
  class: "em-block-fields"
}, Pc = { class: "em-social-links" }, Vc = ["value", "onChange"], Nc = ["value", "onInput"], Ec = ["onClick"], Oc = ["onClick"], Mc = {
  key: 9,
  class: "em-block-fields"
}, Dc = ["value", "onInput"], Wc = ["value", "onInput"], zc = ["value", "onInput"], Hc = {
  key: 10,
  class: "em-block-fields"
}, qc = ["value", "onInput"], Fc = { class: "em-link-list-items" }, jc = ["value", "onInput"], Kc = ["value", "onInput"], Yc = ["onClick"], Jc = ["onClick"], Gc = {
  key: 11,
  class: "em-block-fields"
}, Xc = ["value", "onInput"], Qc = { class: "em-var-picker-wrap" }, Zc = ["onClick"], ep = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, tp = ["onClick"], ap = ["value", "onInput"], sp = { class: "em-var-picker-wrap" }, np = ["onClick"], lp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, op = ["onClick"], ip = {
  key: 12,
  class: "em-block-fields"
}, rp = { class: "em-block-fields--row" }, dp = ["value", "onInput"], up = { class: "em-block-fields--row" }, cp = ["value", "onInput"], pp = ["value", "onChange"], mp = {
  key: 13,
  class: "em-block-fields"
}, vp = ["value", "onChange"], bp = { class: "em-inline-label" }, fp = ["value", "onInput"], gp = { class: "em-var-picker-wrap" }, yp = ["onClick"], hp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, kp = ["onClick"], _p = {
  key: 14,
  class: "em-block-fields"
}, wp = ["value", "onInput"], $p = { class: "em-link-list-items" }, xp = ["value", "onInput"], Cp = ["value", "onInput"], Sp = ["onClick"], Ip = ["onClick"], Ap = {
  key: 15,
  class: "em-block-fields"
}, Bp = ["value", "onInput"], Lp = ["value", "onInput"], Up = ["onClick"], Rp = ["onClick"], Tp = {
  key: 16,
  class: "em-block-fields"
}, Pp = ["value", "onInput"], Vp = ["value", "onInput"], Np = ["value", "onInput"], Ep = ["onClick"], Op = ["onClick"], Mp = {
  key: 17,
  class: "em-block-fields"
}, Dp = ["value", "onInput"], Wp = ["value", "onInput"], zp = {
  key: 18,
  class: "em-block-fields"
}, Hp = ["value", "onInput"], qp = ["value", "onInput"], Fp = ["value", "onInput"], jp = ["value", "onInput"], Kp = ["value", "onInput"], Yp = {
  key: 19,
  class: "em-block-fields"
}, Jp = ["value", "onInput"], Gp = { class: "em-var-picker-wrap" }, Xp = ["onClick"], Qp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Zp = ["onClick"], em = {
  key: 20,
  class: "em-block-fields"
}, tm = ["value", "onInput"], am = ["value", "onInput"], sm = { class: "em-var-picker-wrap" }, nm = ["onClick"], lm = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, om = ["onClick"], im = {
  key: 21,
  class: "em-block-fields"
}, rm = ["value", "onInput"], dm = { class: "em-block-fields--row" }, um = ["value", "onInput"], cm = {
  key: 22,
  class: "em-block-fields"
}, pm = ["value", "onInput"], mm = ["value", "onInput"], vm = ["value", "onInput"], bm = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, fm = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, gm = ["onClick"], ym = ["onClick"], hm = ["onClick"], km = { class: "em-check-row" }, _m = ["checked", "onChange"], wm = { class: "em-add-bar kb-field kb-field--add-bar" }, $m = { class: "em-add-bar-btns" }, xm = { class: "em-strip kb-section em-strip--personalize" }, Cm = { class: "em-field kb-field" }, Sm = { class: "em-input-group" }, Im = ["value"], Am = { class: "em-field kb-field" }, Bm = { class: "em-input-group" }, Ve = "{{ var }}", Lm = /* @__PURE__ */ _e({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    var I;
    function v() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const f = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], _ = [
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
    function b(u) {
      switch (u) {
        case "heading":
          return { id: v(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: v(), type: "paragraph", content: "Your text here. Use {{ first_name }} for personalization.", alignment: "left", fullWidth: !1 };
        case "image":
          return { id: v(), type: "image", src: "", alt: "", linkUrl: "", alignment: "left", fullWidth: !1 };
        case "button":
          return { id: v(), type: "button", text: "Click here", url: "https://", borderRadius: 8, fullWidth: !1, ghost: !1, alignment: "left" };
        case "divider":
          return { id: v(), type: "divider", thickness: 1, color: "#e2e8f0", lineStyle: "solid", alignment: "left", fullWidth: !1 };
        case "spacer":
          return { id: v(), type: "spacer", height: 24 };
        case "footer":
          return {
            id: v(),
            type: "footer",
            content: "You received this email because you signed up at our site.",
            unsubscribeUrl: "",
            companyAddress: "",
            alignment: "left",
            fullWidth: !1
          };
        case "list":
          return { id: v(), type: "list", style: "bullet", items: ["First item", "Second item", "Third item"], alignment: "left", fullWidth: !1 };
        case "quote":
          return { id: v(), type: "quote", content: "Highlight a key message or testimonial here.", style: "default", alignment: "left", fullWidth: !1 };
        case "social":
          return { id: v(), type: "social", links: f.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
        case "video":
          return { id: v(), type: "video", thumbnailUrl: "", videoUrl: "https://", caption: "", alignment: "left", fullWidth: !1 };
        case "link_list":
          return {
            id: v(),
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
            id: v(),
            type: "columns",
            leftContent: "Left column text or {{ variable }}.",
            rightContent: "Right column text."
          };
        case "row":
          return {
            id: v(),
            type: "row",
            columnCount: 2,
            cells: ["Left column content.", "Right column content."]
          };
        case "navbar":
          return {
            id: v(),
            type: "navbar",
            links: [
              { text: "View in browser", url: "" },
              { text: "Unsubscribe", url: "" }
            ],
            separator: " | "
          };
        case "accordion":
          return {
            id: v(),
            type: "accordion",
            items: [
              { title: "Section 1", content: "Expandable content for section 1." },
              { title: "Section 2", content: "Expandable content for section 2." }
            ]
          };
        case "carousel":
          return {
            id: v(),
            type: "carousel",
            slides: [
              { imageUrl: "", linkUrl: "", alt: "Slide 1" },
              { imageUrl: "", linkUrl: "", alt: "Slide 2" }
            ]
          };
        case "countdown":
          return {
            id: v(),
            type: "countdown",
            endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
            label: "Offer ends in"
          };
        case "product_card":
          return {
            id: v(),
            type: "product_card",
            imageUrl: "",
            title: "Product name",
            price: "€0.00",
            buttonText: "Buy now",
            buttonUrl: "https://"
          };
        case "liquid":
          return {
            id: v(),
            type: "liquid",
            content: `{% if user.last_purchase %}
  <!-- conditional content -->
{% endif %}`
          };
        case "code_block":
          return {
            id: v(),
            type: "code_block",
            content: `// Code or snippet to display
const example = {{ order_id }};`,
            caption: ""
          };
        case "rss_feed":
          return {
            id: v(),
            type: "rss_feed",
            feedUrl: "https://",
            maxItems: 5
          };
        case "dynamic_image":
          return {
            id: v(),
            type: "dynamic_image",
            imageUrl: "https://example.com/map/{{ store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: v(), type: "paragraph", content: "" };
      }
    }
    const A = n, C = r, x = ["first_name", "last_name", "order_id", "city", "email"], T = se(
      (I = A.variableOptions) != null && I.length ? [...A.variableOptions] : x
    ), E = se(T.value[0] ?? "first_name"), F = se("");
    Be(
      () => A.variableOptions,
      (u) => {
        u != null && u.length && (T.value = [...u], T.value.includes(E.value) || (E.value = T.value[0]));
      }
    );
    const W = h(() => A.message.subject ?? ""), Q = h(() => A.message.preview_text ?? ""), K = h(() => eu(W.value)), pe = h(() => tu(Q.value)), Y = h(() => $t(W.value)), ee = h(() => $t(Q.value)), N = h(() => {
      const u = A.message.blocks;
      return Array.isArray(u) && u.length > 0 ? u : [b("paragraph")];
    });
    Be(
      () => A.message.blocks,
      (u) => {
        (!Array.isArray(u) || u.length === 0) && C("update", { blocks: [b("paragraph")] });
      },
      { immediate: !0 }
    );
    function oe(u) {
      C("update", { blocks: u });
    }
    function te(u) {
      C("update", { subject: u.target.value });
    }
    function ye(u) {
      const l = u.target.value;
      C("update", { preview_text: l || void 0 });
    }
    function be(u) {
      C("update", { from_name: u.target.value || void 0 });
    }
    function fe(u) {
      C("update", { from_address: u.target.value || void 0 });
    }
    function q(u) {
      C("update", { reply_to: u.target.value || void 0 });
    }
    const g = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [b("heading"), b("paragraph"), b("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [b("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [b("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [b("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [b("social"), b("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [b("footer"), b("link_list")]
      }
    ];
    function $(u) {
      const l = u.blocks();
      oe([...N.value, ...l]);
    }
    function U(u) {
      const l = [...N.value, b(u)];
      oe(l);
    }
    function le(u) {
      oe(N.value.filter((l) => l.id !== u));
    }
    function J(u, l) {
      const t = N.value.findIndex((V) => V.id === u);
      if (t < 0) return;
      const P = l === "up" ? t - 1 : t + 1;
      if (P < 0 || P >= N.value.length) return;
      const i = [...N.value];
      [i[t], i[P]] = [i[P], i[t]], oe(i);
    }
    function L(u, l) {
      const t = N.value.map((P) => P.id === u ? { ...P, ...l } : P);
      oe(t);
    }
    function me(u, l, t) {
      const P = N.value.find((V) => V.id === u);
      if (!P || P.type !== "list") return;
      const i = [...P.items || []];
      i[l] = t, L(u, { items: i });
    }
    function R(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "list" || L(u, { items: [...l.items || [], "New item"] });
    }
    function k(u, l) {
      const t = N.value.find((i) => i.id === u);
      if (!t || t.type !== "list") return;
      const P = (t.items || []).filter((i, V) => V !== l);
      L(u, { items: P });
    }
    function B(u, l, t, P) {
      const i = N.value.find((O) => O.id === u);
      if (!i || i.type !== "social") return;
      const V = (i.links || []).map((O, he) => he === l ? { ...O, [t]: P } : O);
      L(u, { links: V });
    }
    function X(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "social" || L(u, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function ne(u, l) {
      const t = N.value.find((i) => i.id === u);
      if (!t || t.type !== "social") return;
      const P = (t.links || []).filter((i, V) => V !== l);
      L(u, { links: P });
    }
    function ke(u, l, t, P) {
      const i = N.value.find((O) => O.id === u);
      if (!i || i.type !== "link_list") return;
      const V = (i.links || []).map((O, he) => he === l ? { ...O, [t]: P } : O);
      L(u, { links: V });
    }
    function we(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "link_list" || L(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function $e(u, l) {
      const t = N.value.find((i) => i.id === u);
      if (!t || t.type !== "link_list") return;
      const P = (t.links || []).filter((i, V) => V !== l);
      L(u, { links: P });
    }
    function ge(u, l) {
      const t = N.value.find((P) => P.id === u);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const P = [...t.cells || []];
          for (; P.length < l.columnCount; ) P.push("Cell content");
          l.cells = P.slice(0, l.columnCount);
        }
        L(u, l);
      }
    }
    function ie(u, l, t) {
      const P = N.value.find((V) => V.id === u);
      if (!P || P.type !== "row") return;
      const i = [...P.cells || []];
      i[l] = t, L(u, { cells: i });
    }
    function c(u, l, t, P) {
      const i = N.value.find((O) => O.id === u);
      if (!i || i.type !== "navbar") return;
      const V = (i.links || []).map((O, he) => he === l ? { ...O, [t]: P } : O);
      L(u, { links: V });
    }
    function S(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "navbar" || L(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function D(u, l) {
      const t = N.value.find((P) => P.id === u);
      !t || t.type !== "navbar" || L(u, { links: (t.links || []).filter((P, i) => i !== l) });
    }
    function ce(u, l, t, P) {
      const i = N.value.find((O) => O.id === u);
      if (!i || i.type !== "accordion") return;
      const V = (i.items || []).map((O, he) => he === l ? { ...O, [t]: P } : O);
      L(u, { items: V });
    }
    function ve(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "accordion" || L(u, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function xe(u, l) {
      const t = N.value.find((P) => P.id === u);
      !t || t.type !== "accordion" || L(u, { items: (t.items || []).filter((P, i) => i !== l) });
    }
    function Se(u, l, t, P) {
      const i = N.value.find((O) => O.id === u);
      if (!i || i.type !== "carousel") return;
      const V = (i.slides || []).map((O, he) => he === l ? { ...O, [t]: P } : O);
      L(u, { slides: V });
    }
    function Le(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "carousel" || L(u, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Ue(u, l) {
      const t = N.value.find((P) => P.id === u);
      !t || t.type !== "carousel" || L(u, { slides: (t.slides || []).filter((P, i) => i !== l) });
    }
    function Re(u, l = E.value) {
      const t = ` {{ ${l} }}`, P = A.message.variables ?? [], i = Array.from(/* @__PURE__ */ new Set([...P, l]));
      u === "subject" ? C("update", {
        subject: (W.value || "") + t,
        variables: i
      }) : C("update", {
        preview_text: (Q.value || "") + t,
        variables: i
      });
    }
    function Ie(u, l = E.value) {
      const t = N.value.find((We) => We.id === u);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const P = ` {{ ${l} }}`, i = A.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...i, l])), O = (t.type === "footer", "content"), He = (t[O] ?? "") + P, Fe = N.value.map(
        (We) => We.id === u ? { ...We, [O]: He } : We
      );
      C("update", { blocks: Fe, variables: V });
    }
    function G(u, l, t = E.value) {
      const P = N.value.find((He) => He.id === u);
      if (!P || P.type !== "row") return;
      const i = ` {{ ${t} }}`, V = A.message.variables ?? [], O = Array.from(/* @__PURE__ */ new Set([...V, t])), he = [...P.cells || []];
      he[l] = (he[l] || "") + i, L(u, { cells: he }), C("update", { variables: O });
    }
    function p(u, l, t = E.value) {
      const P = N.value.find((We) => We.id === u);
      if (!P || P.type !== "columns") return;
      const i = ` {{ ${t} }}`, V = A.message.variables ?? [], O = Array.from(/* @__PURE__ */ new Set([...V, t])), he = l === "left" ? "leftContent" : "rightContent", Fe = (P[he] ?? "") + i;
      L(u, { [he]: Fe }), C("update", { variables: O });
    }
    const o = se(null);
    function w(u) {
      o.value = o.value === u ? null : u;
    }
    function H(u, l) {
      if (l) {
        if (u === "subject") Re("subject", l);
        else if (u === "preview") Re("preview", l);
        else if (u.startsWith("block:")) Ie(u.slice(6), l);
        else if (u.startsWith("col-left:")) p(u.slice(9), "left", l);
        else if (u.startsWith("col-right:")) p(u.slice(10), "right", l);
        else if (u.startsWith("row:")) {
          const [, t, P] = u.split(":");
          G(t, Number(P), l);
        }
        o.value = null;
      }
    }
    function j() {
      const u = F.value.trim();
      !u || T.value.includes(u) || (T.value = [...T.value, u], E.value = u, F.value = "");
    }
    return (u, l) => (a(), s("section", lu, [
      e("div", ou, [
        e("div", iu, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => u.$emit("reset"))
          }, " Reset section ")) : y("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", ru, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: n.message.from_name ?? "",
            onInput: be
          }, null, 40, du)
        ]),
        e("div", uu, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: n.message.from_address ?? "",
            onInput: fe
          }, null, 40, cu)
        ]),
        e("div", pu, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            Z("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: n.message.reply_to ?? "",
            onInput: q
          }, null, 40, mu)
        ]),
        e("div", vu, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", bu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ order_id }} has shipped",
              value: W.value,
              onInput: te
            }, null, 40, fu),
            e("div", gu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[1] || (l[1] = (t) => w("subject")),
                title: "Insert variable"
              }, d(Ve)),
              o.value === "subject" ? (a(), s("div", yu, [
                (a(!0), s(M, null, z(T.value, (t) => (a(), s("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (P) => H("subject", t)
                }, d(t), 9, hu))), 128))
              ])) : y("", !0)
            ])
          ]),
          e("span", {
            class: ue(["em-analyzer", `em-analyzer--${K.value}`])
          }, d(m(su)(K.value)), 3),
          Y.value.length ? (a(), s("span", ku, "Spammy: " + d(Y.value.join(", ")), 1)) : y("", !0)
        ]),
        e("div", _u, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            Z("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", wu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: Q.value,
              onInput: ye
            }, null, 40, $u),
            e("div", xu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => w("preview")),
                title: "Insert variable"
              }, d(Ve)),
              o.value === "preview" ? (a(), s("div", Cu, [
                (a(!0), s(M, null, z(T.value, (t) => (a(), s("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (P) => H("preview", t)
                }, d(t), 9, Su))), 128))
              ])) : y("", !0)
            ])
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: ue(["em-analyzer", `em-analyzer--${pe.value}`])
          }, d(m(nu)(pe.value)), 3),
          ee.value.length ? (a(), s("span", Iu, "Spammy: " + d(ee.value.join(", ")), 1)) : y("", !0)
        ])
      ]),
      e("div", Au, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Bu, [
          (a(), s(M, null, z(g, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (P) => $(t)
          }, d(t.label), 9, Lu)), 64))
        ])
      ]),
      e("div", Uu, [
        l[64] || (l[64] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[65] || (l[65] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Ru, [
          (a(!0), s(M, null, z(N.value, (t, P) => (a(), s("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Pu, [
              e("span", Vu, d(t.type), 1),
              e("div", Nu, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === 0,
                  onClick: (i) => J(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Eu),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === N.value.length - 1,
                  onClick: (i) => J(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Ou),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (i) => le(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Mu)
              ])
            ]),
            t.type === "heading" ? (a(), s("div", Du, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { level: Number(i.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Wu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Heading text"
              }, null, 40, zu),
              e("div", Hu, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`block:${t.id}`)
                }, d(Ve), 8, qu),
                o.value === `block:${t.id}` ? (a(), s("div", Fu, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `block-var-heading-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`block:${t.id}`, i)
                  }, d(i), 9, ju))), 128))
                ])) : y("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), s("div", Ku, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Yu),
              e("div", Ju, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`block:${t.id}`)
                }, d(Ve), 8, Gu),
                o.value === `block:${t.id}` ? (a(), s("div", Xu, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `block-var-paragraph-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`block:${t.id}`, i)
                  }, d(i), 9, Qu))), 128))
                ])) : y("", !0)
              ])
            ])) : t.type === "image" ? (a(), s("div", Zu, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (i) => L(t.id, { src: i.target.value }),
                placeholder: "Image URL"
              }, null, 40, ec),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (i) => L(t.id, { alt: i.target.value }),
                placeholder: "Alt text"
              }, null, 40, tc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (i) => L(t.id, { linkUrl: i.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, ac)
            ])) : t.type === "button" ? (a(), s("div", sc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (i) => L(t.id, { text: i.target.value }),
                placeholder: "Button text"
              }, null, 40, nc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (i) => L(t.id, { url: i.target.value }),
                placeholder: "Button URL"
              }, null, 40, lc),
              e("div", oc, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (i) => L(t.id, { borderRadius: Number(i.target.value) || 0 })
                }, null, 40, ic)
              ]),
              e("label", rc, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (i) => L(t.id, { ghost: i.target.checked })
                }, null, 40, dc),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), s("div", uc, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (i) => L(t.id, { height: Number(i.target.value) || 24 })
              }, null, 40, cc),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), s("div", pc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, mc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (i) => L(t.id, { unsubscribeUrl: i.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, vc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (i) => L(t.id, { companyAddress: i.target.value }),
                placeholder: "Company address"
              }, null, 40, bc),
              e("div", fc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`block:${t.id}`)
                }, d(Ve), 8, gc),
                o.value === `block:${t.id}` ? (a(), s("div", yc, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `block-var-footer-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`block:${t.id}`, i)
                  }, d(i), 9, hc))), 128))
                ])) : y("", !0)
              ])
            ])) : t.type === "list" ? (a(), s("div", kc, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { style: i.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, _c),
              e("div", wc, [
                (a(!0), s(M, null, z(t.items || [], (i, V) => (a(), s("div", {
                  key: V,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i,
                    onInput: (O) => me(t.id, V, O.target.value),
                    placeholder: `Item ${V + 1}`
                  }, null, 40, $c),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => k(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, xc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => R(t.id)
              }, "+ Add item", 8, Cc)
            ])) : t.type === "quote" ? (a(), s("div", Sc, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { style: i.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Ic),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Ac),
              e("div", Bc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`block:${t.id}`)
                }, d(Ve), 8, Lc),
                o.value === `block:${t.id}` ? (a(), s("div", Uc, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `block-var-quote-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`block:${t.id}`, i)
                  }, d(i), 9, Rc))), 128))
                ])) : y("", !0)
              ])
            ])) : t.type === "social" ? (a(), s("div", Tc, [
              e("div", Pc, [
                (a(!0), s(M, null, z(t.links || [], (i, V) => (a(), s("div", {
                  key: V,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: i.platform,
                    class: "em-select em-select--sm",
                    onChange: (O) => B(t.id, V, "platform", O.target.value)
                  }, [...l[45] || (l[45] = [
                    ze('<option value="facebook" data-v-4f118746>Facebook</option><option value="twitter" data-v-4f118746>Twitter / X</option><option value="instagram" data-v-4f118746>Instagram</option><option value="linkedin" data-v-4f118746>LinkedIn</option><option value="youtube" data-v-4f118746>YouTube</option><option value="tiktok" data-v-4f118746>TikTok</option><option value="custom" data-v-4f118746>Custom</option>', 7)
                  ])], 40, Vc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (O) => B(t.id, V, "url", O.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Nc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => ne(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Ec)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => X(t.id)
              }, "+ Add link", 8, Oc)
            ])) : t.type === "video" ? (a(), s("div", Mc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (i) => L(t.id, { thumbnailUrl: i.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Dc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (i) => L(t.id, { videoUrl: i.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Wc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (i) => L(t.id, { caption: i.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, zc)
            ])) : t.type === "link_list" ? (a(), s("div", Hc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (i) => L(t.id, { separator: i.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, qc),
              e("div", Fc, [
                (a(!0), s(M, null, z(t.links || [], (i, V) => (a(), s("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i.text,
                    onInput: (O) => ke(t.id, V, "text", O.target.value),
                    placeholder: "Label"
                  }, null, 40, jc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (O) => ke(t.id, V, "url", O.target.value),
                    placeholder: "URL"
                  }, null, 40, Kc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => $e(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Yc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => we(t.id)
              }, "+ Add link", 8, Jc)
            ])) : t.type === "columns" ? (a(), s("div", Gc, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (i) => L(t.id, { leftContent: i.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Xc),
              e("div", Qc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`col-left:${t.id}`)
                }, d(Ve), 8, Zc),
                o.value === `col-left:${t.id}` ? (a(), s("div", ep, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `col-left-var-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`col-left:${t.id}`, i)
                  }, d(i), 9, tp))), 128))
                ])) : y("", !0)
              ]),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (i) => L(t.id, { rightContent: i.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, ap),
              e("div", sp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`col-right:${t.id}`)
                }, d(Ve), 8, np),
                o.value === `col-right:${t.id}` ? (a(), s("div", lp, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `col-right-var-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`col-right:${t.id}`, i)
                  }, d(i), 9, op))), 128))
                ])) : y("", !0)
              ])
            ])) : t.type === "divider" ? (a(), s("div", ip, [
              e("div", rp, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (i) => L(t.id, { thickness: Number(i.target.value) || 1 })
                }, null, 40, dp),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", up, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (i) => L(t.id, { color: i.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, cp)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (i) => L(t.id, { lineStyle: i.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, pp)
            ])) : t.type === "row" ? (a(), s("div", mp, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (i) => ge(t.id, { columnCount: Number(i.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, vp),
              (a(!0), s(M, null, z(t.cells || [], (i, V) => (a(), s("div", {
                key: V,
                class: "em-row-cell"
              }, [
                e("label", bp, "Column " + d(V + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: i,
                  onInput: (O) => ie(t.id, V, O.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, fp),
                e("div", gp, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (O) => w(`row:${t.id}:${V}`)
                  }, d(Ve), 8, yp),
                  o.value === `row:${t.id}:${V}` ? (a(), s("div", hp, [
                    (a(!0), s(M, null, z(T.value, (O) => (a(), s("button", {
                      key: `row-var-${t.id}-${V}-${O}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (he) => H(`row:${t.id}:${V}`, O)
                    }, d(O), 9, kp))), 128))
                  ])) : y("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), s("div", _p, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (i) => L(t.id, { separator: i.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, wp),
              e("div", $p, [
                (a(!0), s(M, null, z(t.links || [], (i, V) => (a(), s("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i.text,
                    onInput: (O) => c(t.id, V, "text", O.target.value),
                    placeholder: "Label"
                  }, null, 40, xp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (O) => c(t.id, V, "url", O.target.value),
                    placeholder: "URL"
                  }, null, 40, Cp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (O) => D(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Sp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => S(t.id)
              }, "+ Add link", 8, Ip)
            ])) : t.type === "accordion" ? (a(), s("div", Ap, [
              (a(!0), s(M, null, z(t.items || [], (i, V) => (a(), s("div", {
                key: V,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: i.title,
                  onInput: (O) => ce(t.id, V, "title", O.target.value),
                  placeholder: "Section title"
                }, null, 40, Bp),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: i.content,
                  onInput: (O) => ce(t.id, V, "content", O.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Lp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (O) => xe(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Up)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => ve(t.id)
              }, "+ Add section", 8, Rp)
            ])) : t.type === "carousel" ? (a(), s("div", Tp, [
              (a(!0), s(M, null, z(t.slides || [], (i, V) => (a(), s("div", {
                key: V,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: i.imageUrl,
                  onInput: (O) => Se(t.id, V, "imageUrl", O.target.value),
                  placeholder: "Image URL"
                }, null, 40, Pp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: i.alt,
                  onInput: (O) => Se(t.id, V, "alt", O.target.value),
                  placeholder: "Alt text"
                }, null, 40, Vp),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: i.linkUrl,
                  onInput: (O) => Se(t.id, V, "linkUrl", O.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Np),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (O) => Ue(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Ep)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => Le(t.id)
              }, "+ Add slide", 8, Op)
            ])) : t.type === "countdown" ? (a(), s("div", Mp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (i) => L(t.id, { label: i.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Dp),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (i) => L(t.id, { endDateTime: i.target.value ? new Date(i.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Wp),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), s("div", zp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (i) => L(t.id, { imageUrl: i.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Hp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (i) => L(t.id, { title: i.target.value }),
                placeholder: "Product title"
              }, null, 40, qp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (i) => L(t.id, { price: i.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, Fp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (i) => L(t.id, { buttonText: i.target.value }),
                placeholder: "Button text"
              }, null, 40, jp),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (i) => L(t.id, { buttonUrl: i.target.value }),
                placeholder: "Button URL"
              }, null, 40, Kp)
            ])) : t.type === "liquid" ? (a(), s("div", Yp, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Jp),
              e("div", Gp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`block:${t.id}`)
                }, d(Ve), 8, Xp),
                o.value === `block:${t.id}` ? (a(), s("div", Qp, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `block-var-liquid-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`block:${t.id}`, i)
                  }, d(i), 9, Zp))), 128))
                ])) : y("", !0)
              ]),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), s("div", em, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (i) => L(t.id, { caption: i.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, tm),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (i) => L(t.id, { content: i.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, am),
              e("div", sm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => w(`block:${t.id}`)
                }, d(Ve), 8, nm),
                o.value === `block:${t.id}` ? (a(), s("div", lm, [
                  (a(!0), s(M, null, z(T.value, (i) => (a(), s("button", {
                    key: `block-var-code-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => H(`block:${t.id}`, i)
                  }, d(i), 9, om))), 128))
                ])) : y("", !0)
              ]),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), s("div", im, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (i) => L(t.id, { feedUrl: i.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, rm),
              e("div", dm, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (i) => L(t.id, { maxItems: Number(i.target.value) || 5 })
                }, null, 40, um)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), s("div", cm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (i) => L(t.id, { imageUrl: i.target.value }),
                placeholder: "Image URL (use {{ var }} for per-recipient)"
              }, null, 40, pm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (i) => L(t.id, { alt: i.target.value }),
                placeholder: "Alt text"
              }, null, 40, mm),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (i) => L(t.id, { fallbackUrl: i.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, vm)
            ])) : y("", !0),
            _.includes(t.type) ? (a(), s("div", bm, [
              e("div", fm, [
                e("button", {
                  type: "button",
                  class: ue(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (i) => L(t.id, { alignment: "left" })
                }, [...l[59] || (l[59] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, gm),
                e("button", {
                  type: "button",
                  class: ue(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (i) => L(t.id, { alignment: "center" })
                }, [...l[60] || (l[60] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, ym),
                e("button", {
                  type: "button",
                  class: ue(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (i) => L(t.id, { alignment: "right" })
                }, [...l[61] || (l[61] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, hm)
              ]),
              e("label", km, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (i) => L(t.id, { fullWidth: i.target.checked })
                }, null, 40, _m),
                l[62] || (l[62] = e("span", null, "Full width", -1))
              ])
            ])) : y("", !0)
          ], 8, Tu))), 128))
        ]),
        e("div", wm, [
          l[63] || (l[63] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", $m, [
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
      e("div", xm, [
        l[68] || (l[68] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[69] || (l[69] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Cm, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Sm, [
            Te(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => E.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), s(M, null, z(T.value, (t) => (a(), s("option", {
                key: t,
                value: t
              }, d(t), 9, Im))), 128))
            ], 512), [
              [Ne, E.value]
            ])
          ])
        ]),
        e("div", Am, [
          l[67] || (l[67] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Bm, [
            Te(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => F.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [nt, F.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: j
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Um = /* @__PURE__ */ Ce(Lm, [["__scopeId", "data-v-4f118746"]]), Rm = { class: "keos-email-builder" }, Tm = { class: "kb-builder-top" }, Pm = { style: { margin: 0, paddingLeft: "1.25rem" } }, Vm = { class: "kb-email-layout" }, Nm = { class: "kb-email-sidebar" }, Em = {
  key: 0,
  class: "kb-email-form"
}, Om = { class: "kb-email-form-head" }, Mm = { class: "kb-email-form-head-top" }, Dm = { class: "kb-email-health-pill" }, Wm = { class: "kb-wa-form-head-row" }, zm = ["value"], Hm = { class: "kb-email-health" }, qm = { class: "kb-email-health-row" }, Fm = { class: "kb-email-health-value" }, jm = { class: "kb-email-health-bar" }, Km = { class: "kb-email-canvas" }, Ym = {
  key: 0,
  class: "kb-email-test-banner"
}, Jm = { class: "kb-email-preview-chrome" }, Gm = { class: "kb-push-preview-controls" }, Xm = { class: "kb-push-preview-as" }, Qm = ["value"], Zm = { class: "kb-preview-status" }, ev = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, tv = { class: "kb-email-inbox-strip" }, av = { class: "kb-email-inbox-from" }, sv = { class: "kb-email-inbox-from-name" }, nv = { class: "kb-email-inbox-from-addr" }, lv = { class: "kb-email-inbox-subject" }, ov = ["title"], iv = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, rv = { class: "kb-email-body-canvas" }, dv = ["innerHTML"], uv = { class: "kb-email-actions" }, cv = {
  key: 0,
  class: "kb-actions-note"
}, pv = { class: "kb-email-actions-right" }, mv = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, vv = { class: "kb-confirm-dialog" }, bv = { class: "kb-confirm-actions" }, fv = /* @__PURE__ */ _e({
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
  setup(n, { emit: r }) {
    function v(p) {
      if (!Array.isArray(p) || p.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const o = (I) => String(I).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), w = [
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
      ], H = (I, u) => {
        if (!w.includes(u.type)) return I;
        const l = u.alignment || "left", t = !!u.fullWidth;
        return `<div style="text-align:${l};${t ? "width:100%;" : ""}">${I}</div>`;
      }, j = [];
      for (const I of p)
        switch (I.type) {
          case "heading": {
            const u = Math.min(3, Math.max(1, Number(I.level) || 1)), l = o(I.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              H(
                `<h${u} style="margin:0 0 12px;font-size:${u === 1 ? "22" : u === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${l || "Heading"}</h${u}>`,
                I
              )
            );
            break;
          }
          case "paragraph": {
            const u = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              H(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${u || "Paragraph"}</p>`,
                I
              )
            );
            break;
          }
          case "image": {
            const u = (I.src || "").trim(), l = o(I.alt || ""), t = (I.linkUrl || "").trim(), i = !!I.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", V = u ? `<img src="${o(u)}" alt="${l}" style="${i}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            j.push(
              H(
                `<div style="margin:0 0 12px;">${t ? `<a href="${o(t)}" style="color:#2563eb;">${V}</a>` : V}</div>`,
                I
              )
            );
            break;
          }
          case "button": {
            const u = o(I.text || "Button"), l = (I.url || "#").trim(), t = Math.min(24, Math.max(0, Number(I.borderRadius) ?? 8)), P = !!I.fullWidth, i = !!I.ghost, V = i ? "transparent" : "#0f172a", O = i ? "#0f172a" : "#fff", he = i ? "2px solid #0f172a" : "none", He = P ? "block" : "inline-block", Fe = P ? "100%" : "auto";
            j.push(
              H(
                `<p style="margin:0 0 12px;"><a href="${o(l)}" style="display:${He};width:${Fe};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${V};color:${O};border:${he};text-decoration:none;font-size:14px;font-weight:600;border-radius:${t}px;overflow-wrap:anywhere;">${u}</a></p>`,
                I
              )
            );
            break;
          }
          case "divider": {
            const u = Math.min(8, Math.max(1, Number(I.thickness) || 1)), l = (I.color || "#e2e8f0").trim() || "#e2e8f0", t = I.lineStyle || "solid";
            j.push(
              H(
                `<hr style="margin:16px 0;border:0;border-top:${u}px ${t} ${l};" />`,
                I
              )
            );
            break;
          }
          case "spacer": {
            const u = Math.min(120, Math.max(8, Number(I.height) || 24));
            j.push(H(`<div style="height:${u}px;"></div>`, I));
            break;
          }
          case "footer": {
            const u = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = (I.unsubscribeUrl || "").trim(), t = o(I.companyAddress || "");
            j.push(
              H(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${u || "Footer"}` + (l ? `<p style="margin:8px 0 0;"><a href="${o(l)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (t ? `<p style="margin:4px 0 0;">${t}</p>` : "") + "</div>",
                I
              )
            );
            break;
          }
          case "list": {
            const u = I.style === "numbered" ? "ol" : "ul", t = (Array.isArray(I.items) ? I.items : []).map(
              (P) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${o(String(P)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            j.push(
              H(
                `<${u} style="margin:0 0 12px;padding-left:24px;">${t || "<li>Item</li>"}</${u}>`,
                I
              )
            );
            break;
          }
          case "quote": {
            const u = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, t = l[I.style || "default"] || l.default;
            j.push(
              H(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${t}font-size:14px;line-height:1.6;">${u || "Quote"}</div>`,
                I
              )
            );
            break;
          }
          case "social": {
            const l = (Array.isArray(I.links) ? I.links : []).filter((t) => (t.url || "").trim());
            if (l.length === 0)
              j.push(
                H(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  I
                )
              );
            else {
              const t = (P) => `<a href="${o((P.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${o(P.platform || "Link")}</a>`;
              j.push(
                H(
                  `<div style="margin:0 0 12px;">${l.map(t).join("")}</div>`,
                  I
                )
              );
            }
            break;
          }
          case "video": {
            const u = (I.thumbnailUrl || "").trim(), l = (I.videoUrl || "#").trim(), t = o(I.caption || ""), i = !!I.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", V = u ? `<img src="${o(u)}" alt="Video" style="${i}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            j.push(
              H(
                `<div style="margin:0 0 12px;"><a href="${o(l)}" style="display:block;color:inherit;">${V}</a>` + (t ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${t}</p>` : "") + "</div>",
                I
              )
            );
            break;
          }
          case "link_list": {
            const u = Array.isArray(I.links) ? I.links : [], l = o(I.separator || " | "), P = u.filter(
              (i) => (i.text || i.url) && (i.url || "").trim()
            ).map(
              (i) => `<a href="${o((i.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(i.text || "Link")}</a>`
            );
            j.push(
              H(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${P.join(l)}</p>`,
                I
              )
            );
            break;
          }
          case "columns": {
            const u = o(I.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = o(I.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            j.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${u || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const u = Math.min(4, Math.max(1, Number(I.columnCount) || 2)), l = Array.isArray(I.cells) ? I.cells.slice(0, u) : [], t = 100 / u, P = Array.from({ length: u }, (i, V) => {
              const O = l[V] ?? "", he = o(O).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${t}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${he || "—"}</td>`;
            }).join("");
            j.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${P}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const u = Array.isArray(I.links) ? I.links : [], l = o(I.separator || " | "), P = u.filter(
              (i) => (i.text || i.url) && (i.url || "").trim()
            ).map(
              (i) => `<a href="${o((i.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(i.text || "Link")}</a>`
            );
            j.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${P.length ? P.join(l) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const l = (Array.isArray(I.items) ? I.items : []).map((t) => {
              const P = o(t.title || "Section"), i = o(t.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${P}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${i}</div></details>`;
            }).join("");
            j.push(
              l ? `<div style="margin:0 0 12px;">${l}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const l = (Array.isArray(I.slides) ? I.slides : []).filter(
              (t) => (t.imageUrl || "").trim()
            );
            if (l.length === 0)
              j.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const t = l[0], P = `<img src="${o(t.imageUrl)}" alt="${o(t.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, i = (t.linkUrl || "").trim();
              j.push(
                `<div style="margin:0 0 12px;">${i ? `<a href="${o(i)}">${P}</a>` : P}` + (l.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${l.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const u = o(I.label || "Offer ends in"), l = I.endDateTime ? new Date(I.endDateTime).toLocaleString() : "—";
            j.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${u}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${l}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const u = (I.imageUrl || "").trim(), l = o(I.title || "Product"), t = o(I.price || ""), P = o(I.buttonText || "Buy now"), i = (I.buttonUrl || "#").trim(), V = u ? `<img src="${o(u)}" alt="${o(I.alt || l)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            j.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${V}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${l}</p>` + (t ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${t}</p>` : "") + `<a href="${o(i)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${P}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const u = o((I.content || "").trim());
            j.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${u || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const u = (I.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = o((I.caption || "").trim());
            j.push(
              '<div style="margin:0 0 12px;">' + (l ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${l}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${u || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const u = (I.feedUrl || "").trim(), l = Math.min(20, Math.max(1, Number(I.maxItems) ?? 5));
            j.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (u ? `<p style="margin:0;font-size:12px;color:#64748b;">${o(u)} · max ${l} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const u = (I.imageUrl || "").trim(), l = (I.fallbackUrl || "").trim(), t = o(I.alt || "Dynamic image");
            u ? j.push(
              `<div style="margin:0 0 12px;"><img src="${o(u)}" alt="${t}" style="max-width:100%;height:auto;display:block;border:0;" />` + (l ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${o(l)}</p>` : "") + "</div>"
            ) : j.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return j.join("");
    }
    function f(p) {
      return /<\s*html[\s>]/i.test(p) || /<!doctype\s+html/i.test(p);
    }
    function _(p) {
      const o = p.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return o ? o[1] : p;
    }
    function b(p, o, w) {
      const H = (o || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), j = (w || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${H}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        j ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${j}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${p}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const A = n, C = r, {
      campaign: x,
      dirty: T,
      customValidatorErrors: E,
      getValidationWithWarnings: F,
      update: W,
      updateMessage: Q,
      undo: K,
      redo: pe,
      canUndo: Y,
      canRedo: ee,
      resetMessage: N,
      hooks: oe
    } = Ge({
      initial: A.modelValue,
      hooks: {
        ...A.hooks,
        customValidators: async (p) => {
          var j, I, u;
          const o = [];
          (j = p.name) != null && j.trim() || o.push("Template name is required");
          const w = p.message;
          (I = w == null ? void 0 : w.subject) != null && I.trim() || o.push("Subject is required");
          const H = (u = A.hooks) != null && u.customValidators ? await A.hooks.customValidators(p) : [];
          return [...o, ...H];
        }
      },
      onDirty: () => C("change", x.value)
    }), { lastSavedAt: te } = Xe(x, { channel: "email" });
    function ye(p) {
      (p.metaKey || p.ctrlKey) && p.key === "z" && (p.preventDefault(), p.shiftKey ? pe() : K());
    }
    je(() => {
      window.addEventListener("keydown", ye);
    }), Ke(() => {
      window.removeEventListener("keydown", ye);
    }), Be(
      x,
      (p) => C("update:modelValue", {
        ...p,
        message: {
          ...p.message,
          html: Se.value
        }
      }),
      { deep: !0 }
    );
    const be = se(), fe = se(!0);
    async function q() {
      if (oe.estimateReach)
        try {
          be.value = await oe.estimateReach(x.value.audience);
        } catch {
          be.value = void 0;
        }
      oe.canSend && (fe.value = await Promise.resolve(oe.canSend()));
    }
    q(), Be(() => x.value.audience, q, { deep: !0 });
    const g = h(() => (E.value, F(be.value))), $ = h(() => g.value.blockingErrors), U = h(() => g.value.warnings), le = h(() => g.value.valid), J = h(() => {
      var H, j, I;
      const p = x.value.message, o = [
        !!((H = x.value.name) != null && H.trim()),
        !!((j = p.subject) != null && j.trim()),
        !!((I = p.from_address) != null && I.trim()),
        !!(Array.isArray(p.blocks) ? p.blocks.length : (p.html ?? "").trim().length),
        !!x.value.template_type
      ], w = o.filter(Boolean).length;
      return Math.round(w / o.length * 100);
    }), L = h(() => J.value >= 90 ? "Production ready" : J.value >= 70 ? "Strong draft" : J.value >= 40 ? "In progress" : "Needs setup"), me = h(
      () => x.value.template_type ?? "transactional"
    ), R = se(""), k = se(!1), B = se(null), X = h(() => {
      const p = R.value;
      return p ? De.find((o) => o.id === p) ?? null : null;
    });
    function ne(p) {
      const o = x.value, w = p.campaign.message ? { ...o.message, ...p.campaign.message } : o.message;
      W({
        ...p.campaign,
        message: w
      }), B.value = null, k.value = !1;
    }
    function ke(p) {
      const o = p.target.value;
      if (!o) return;
      const w = ft.find((H) => H.id === o);
      w && (T.value ? (B.value = w, k.value = !0) : ne(w), p.target.value = "");
    }
    function we(p) {
      W({ template_type: p });
    }
    function $e(p) {
      W({
        name: p,
        tracking: { ...x.value.tracking ?? {}, campaign_name: p }
      });
    }
    const ge = h(
      () => x.value.message.subject ?? ""
    ), ie = h(
      () => x.value.message.preview_text ?? ""
    ), c = h(
      () => x.value.message.html ?? ""
    ), S = h(
      () => x.value.message.from_name ?? "Your App"
    ), D = h(
      () => x.value.message.from_address ?? "notifications@example.com"
    ), ce = h(
      () => x.value.message.blocks ?? []
    ), ve = h(() => {
      const p = x.value.message, o = (p.html ?? "").trim(), H = (Array.isArray(p.blocks) ? p.blocks : []).some((j) => {
        if (!j || typeof j != "object") return !1;
        const I = (j.type ?? "").toString();
        if (I === "paragraph" || I === "heading" || I === "quote" || I === "footer") {
          const u = (j.content ?? "").toString().trim();
          return !(!u || u === "Heading" || u.startsWith("Your text here."));
        }
        return I === "image" || I === "video" || I === "dynamic_image" ? !!(j.src ?? j.imageUrl ?? j.thumbnailUrl ?? "").toString().trim() : I === "button" ? !!(j.text ?? "").toString().trim() : !0;
      });
      return !!((p.subject ?? "").toString().trim() || (p.preview_text ?? "").toString().trim() || o || H);
    }), xe = h(() => {
      const p = ce.value;
      if (Array.isArray(p) && p.length > 0)
        return v(p);
      const o = c.value;
      return o && o.trim() ? f(o) ? _(o) : o : v([]);
    }), Se = h(() => {
      const p = ce.value;
      if (Array.isArray(p) && p.length > 0)
        return b(
          v(p),
          ge.value,
          ie.value
        );
      const o = c.value;
      return o && o.trim() ? f(o) ? o : b(o, ge.value, ie.value) : b(
        v([]),
        ge.value,
        ie.value
      );
    }), Le = h(() => {
      const p = ge.value;
      return X.value ? Oe(p, X.value.data) : p;
    }), Ue = h(() => {
      const p = ie.value;
      return X.value ? Oe(p, X.value.data) : p;
    }), Re = h(() => {
      const p = xe.value;
      return X.value ? Oe(p, X.value.data) : p;
    }), Ie = se("desktop");
    function G() {
      le.value && C("save", {
        ...x.value,
        message: {
          ...x.value.message,
          html: Se.value
        }
      });
    }
    return (p, o) => (a(), s("div", Rm, [
      e("div", Tm, [
        Ae(Qe, {
          "campaign-name": m(x).name,
          status: m(x).status,
          dirty: m(T),
          "last-saved-at": m(te),
          "can-undo": m(Y),
          "can-redo": m(ee),
          "slugify-name": A.enforceSlugName,
          "onUpdate:campaignName": $e,
          onUndo: m(K),
          onRedo: m(pe)
        }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
        $.value.length > 0 ? (a(), s("div", {
          key: 0,
          class: "kb-errors",
          style: re({
            background: m(de).dangerBg,
            border: `1px solid ${m(de).dangerBorder}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[16]}px ${m(ae)[24]}px`,
            marginBottom: `${m(ae)[24]}px`
          })
        }, [
          e("ul", {
            style: re({ margin: 0, paddingLeft: "1.25rem", color: m(de).danger })
          }, [
            (a(!0), s(M, null, z($.value, (w) => (a(), s("li", {
              key: w.message
            }, d(w.message), 1))), 128))
          ], 4)
        ], 4)) : y("", !0),
        U.value.length > 0 ? (a(), s("div", {
          key: 1,
          class: "kb-warnings",
          style: re({
            background: m(de).neutral.bg,
            border: `1px solid ${m(de).neutral.border}`,
            borderRadius: `${m(Pe).input}px`,
            padding: `${m(ae)[16]}px ${m(ae)[24]}px`,
            marginBottom: `${m(ae)[24]}px`,
            fontSize: "0.875rem",
            color: m(de).neutral.textMuted
          })
        }, [
          e("strong", {
            style: re({ display: "block", marginBottom: `${m(ae)[4]}px` })
          }, "Warnings", 4),
          e("ul", Pm, [
            (a(!0), s(M, null, z(U.value, (w) => (a(), s("li", {
              key: w.message
            }, d(w.message), 1))), 128))
          ])
        ], 4)) : y("", !0)
      ]),
      e("div", Vm, [
        e("aside", Nm, [
          n.disabledSections.includes("email") ? y("", !0) : (a(), s("div", Em, [
            e("div", Om, [
              e("div", Mm, [
                o[8] || (o[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                e("span", Dm, d(L.value), 1)
              ]),
              e("div", Wm, [
                Ae(dt, {
                  "template-type": me.value,
                  onUpdate: we
                }, null, 8, ["template-type"]),
                e("select", {
                  class: "kb-preset-select",
                  "aria-label": "Load template preset",
                  onChange: ke
                }, [
                  o[9] || (o[9] = e("option", { value: "" }, "Presets…", -1)),
                  (a(!0), s(M, null, z(m(ft), (w) => (a(), s("option", {
                    key: w.id,
                    value: w.id
                  }, d(w.label), 9, zm))), 128))
                ], 32)
              ]),
              e("div", Hm, [
                e("div", qm, [
                  o[10] || (o[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                  e("span", Fm, d(J.value) + "%", 1)
                ]),
                e("div", jm, [
                  e("span", {
                    class: "kb-email-health-fill",
                    style: re({ width: `${J.value}%` })
                  }, null, 4)
                ])
              ])
            ]),
            Ae(Um, {
              message: m(x).message,
              "variable-options": n.variableOptions,
              "show-reset": !0,
              onUpdate: m(Q),
              onReset: o[0] || (o[0] = (w) => m(N)({ blocks: [] }))
            }, null, 8, ["message", "variable-options", "onUpdate"])
          ]))
        ]),
        e("main", Km, [
          !n.designOnly && m(x).audience.test_mode ? (a(), s("div", Ym, [...o[11] || (o[11] = [
            e("span", { class: "kb-email-test-banner-dot" }, null, -1),
            Z(" Test mode — only your test segment will receive this. ", -1)
          ])])) : y("", !0),
          e("div", Jm, [
            e("div", Gm, [
              e("label", Xm, [
                o[13] || (o[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                Te(e("select", {
                  "onUpdate:modelValue": o[1] || (o[1] = (w) => R.value = w),
                  class: "kb-preset-select",
                  "aria-label": "Preview as profile"
                }, [
                  o[12] || (o[12] = e("option", { value: "" }, "No substitution", -1)),
                  (a(!0), s(M, null, z(m(De), (w) => (a(), s("option", {
                    key: w.id,
                    value: w.id
                  }, d(w.label), 9, Qm))), 128))
                ], 512), [
                  [Ne, R.value]
                ])
              ]),
              e("div", Zm, [
                o[14] || (o[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                e("strong", null, d(Ie.value), 1)
              ])
            ]),
            e("div", ev, [
              e("button", {
                type: "button",
                class: ue(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Ie.value === "desktop"
                }]),
                onClick: o[2] || (o[2] = (w) => Ie.value = "desktop")
              }, [...o[15] || (o[15] = [
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
                Z(" Desktop ", -1)
              ])], 2),
              e("button", {
                type: "button",
                class: ue(["kb-email-device-btn", {
                  "kb-email-device-btn--active": Ie.value === "mobile"
                }]),
                onClick: o[3] || (o[3] = (w) => Ie.value = "mobile")
              }, [...o[16] || (o[16] = [
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
                Z(" Mobile ", -1)
              ])], 2)
            ]),
            e("div", {
              class: ue(["kb-email-preview-frame", {
                "kb-email-preview-frame--mobile": Ie.value === "mobile",
                "kb-email-preview-frame--empty": !ve.value
              }])
            }, [
              e("div", tv, [
                e("div", av, [
                  e("span", sv, d(S.value), 1),
                  e("span", nv, "<" + d(D.value) + ">", 1)
                ]),
                e("div", lv, [
                  e("span", {
                    class: "kb-email-inbox-subject-text",
                    title: Le.value || "No subject"
                  }, d(Le.value || "No subject"), 9, ov),
                  Ue.value ? (a(), s("span", iv, " — " + d(Ue.value), 1)) : y("", !0)
                ])
              ]),
              e("div", rv, [
                e("div", {
                  class: "kb-email-body-inner",
                  "data-email-body": "",
                  innerHTML: Re.value
                }, null, 8, dv)
              ])
            ], 2)
          ])
        ])
      ]),
      e("footer", uv, [
        A.actionsNote ? (a(), s("div", cv, d(A.actionsNote), 1)) : y("", !0),
        e("div", pv, [
          n.showDuplicate ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: o[4] || (o[4] = (w) => C("duplicate", JSON.parse(JSON.stringify(m(x)))))
          }, " Duplicate ")) : y("", !0),
          n.showSave ? (a(), s("button", {
            key: 1,
            type: "button",
            class: "kb-email-action kb-email-action--secondary",
            onClick: G
          }, " Save ")) : y("", !0),
          n.showClose ? (a(), s("button", {
            key: 2,
            type: "button",
            class: "kb-email-action kb-email-action--primary",
            onClick: o[5] || (o[5] = (w) => C("edit"))
          }, " Close ")) : y("", !0)
        ])
      ]),
      k.value ? (a(), s("div", mv, [
        e("div", vv, [
          o[17] || (o[17] = e("h2", {
            id: "email-preset-confirm-title",
            class: "kb-confirm-title"
          }, " Replace content? ", -1)),
          o[18] || (o[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
          e("div", bv, [
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: o[6] || (o[6] = (w) => {
                k.value = !1, B.value = null;
              })
            }, " Cancel "),
            e("button", {
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: o[7] || (o[7] = (w) => B.value && ne(B.value))
            }, " Replace ")
          ])
        ])
      ])) : y("", !0)
    ]));
  }
}), Et = /* @__PURE__ */ Ce(fv, [["__scopeId", "data-v-b283d87d"]]), gv = { class: "kb-shell" }, yv = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, hv = ["aria-selected", "onClick"], kv = { class: "kb-shell__meta" }, _v = ["href"], wv = { class: "kb-shell__body" }, $v = /* @__PURE__ */ _e({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(n, { emit: r }) {
    const v = r, f = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (_, b) => (a(), s("div", gv, [
      e("header", {
        class: "kb-shell__header",
        style: re({ padding: `${m(ae)[12]}px ${m(ae)[24]}px`, borderBottom: `1px solid ${m(de).neutral.border}`, background: m(de).neutral.bg })
      }, [
        b[0] || (b[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", yv, [
          (a(), s(M, null, z(f, (A) => e("button", {
            key: A.id,
            type: "button",
            class: ue(["kb-shell__channel", { "kb-shell__channel--active": n.channel === A.id }]),
            role: "tab",
            "aria-selected": n.channel === A.id,
            onClick: (C) => v("switch-channel", A.id)
          }, d(A.label), 11, hv)), 64))
        ]),
        e("div", kv, [
          n.environment ? (a(), s("span", {
            key: 0,
            class: "kb-shell__env",
            style: re({ padding: "2px 8px", borderRadius: `${m(Pe).input}px`, fontSize: "0.75rem", background: m(de).neutral.bg, color: m(de).neutral.textMuted })
          }, d(n.environment), 5)) : y("", !0),
          n.helpUrl ? (a(), s("a", {
            key: 1,
            href: n.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: re({ color: m(de).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, _v)) : y("", !0)
        ])
      ], 4),
      e("div", wv, [
        Ee(_.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), xv = /* @__PURE__ */ Ce($v, [["__scopeId", "data-v-0df30803"]]), Cv = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Sv = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Iv = ["onClick"], Av = /* @__PURE__ */ _e({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(n) {
    var b;
    const r = n, v = se(((b = r.items[0]) == null ? void 0 : b.id) ?? "");
    let f = null;
    function _(A) {
      const C = document.getElementById(A);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return je(() => {
      const A = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      A && (f = new IntersectionObserver(
        (C) => {
          for (const x of C)
            if (x.isIntersecting) {
              const T = x.target.getAttribute("data-outline-id");
              T && (v.value = T);
            }
        },
        { root: A === document ? null : A, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((C) => {
        const x = document.getElementById(C.id);
        x && (f == null || f.observe(x));
      }));
    }), Ke(() => {
      f == null || f.disconnect();
    }), Be(
      () => r.items,
      (A) => {
        A.length && !v.value && (v.value = A[0].id);
      },
      { immediate: !0 }
    ), (A, C) => (a(), s("nav", Cv, [
      e("ul", Sv, [
        (a(!0), s(M, null, z(n.items, (x) => (a(), s("li", {
          key: x.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: ue(["kb-outline__btn", { "kb-outline__btn--active": v.value === x.id }]),
            style: re({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${m(ae)[8]}px ${m(ae)[12]}px`,
              border: "none",
              borderRadius: `${m(Pe).input}px`,
              background: v.value === x.id ? m(de).neutral.bg : "transparent",
              color: v.value === x.id ? "#0f172a" : m(de).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: v.value === x.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (T) => _(x.id)
          }, d(x.label), 15, Iv)
        ]))), 128))
      ])
    ]));
  }
}), Bv = /* @__PURE__ */ Ce(Av, [["__scopeId", "data-v-25c37675"]]), Lv = ["id"], Uv = {
  key: 1,
  class: "kb-form-shell__head"
}, Rv = /* @__PURE__ */ _e({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(n) {
    return (r, v) => (a(), s("div", {
      class: "kb-form-shell",
      id: n.sectionId ?? void 0,
      style: re({
        padding: `${m(ae)[24]}px ${m(ae)[24]}px ${m(ae)[32]}px`,
        marginBottom: 0
      })
    }, [
      n.label ? (a(), s("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: re({ marginBottom: m(ae)[24], paddingBottom: m(ae)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: re({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: m(ae)[12] })
        }, d(n.label), 5),
        Ee(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), s("div", Uv, [
        Ee(r.$slots, "head", {}, void 0, !0)
      ])),
      Ee(r.$slots, "default", {}, void 0, !0)
    ], 12, Lv));
  }
}), Tv = /* @__PURE__ */ Ce(Rv, [["__scopeId", "data-v-6504df41"]]), Pv = /* @__PURE__ */ _e({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(n) {
    return (r, v) => (a(), s("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: re({
        display: "flex",
        justifyContent: n.align === "start" ? "flex-start" : n.align === "between" ? "space-between" : "flex-end",
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
      Ee(r.$slots, "default")
    ], 4));
  }
}), Vv = /* @__PURE__ */ _e({
  __name: "BuilderTopShell",
  setup(n) {
    return (r, v) => (a(), s("div", {
      class: "kb-top-shell",
      style: re({
        marginLeft: m(ae)[24],
        marginRight: m(ae)[24]
      })
    }, [
      Ee(r.$slots, "header"),
      Ee(r.$slots, "errors"),
      Ee(r.$slots, "warnings"),
      Ee(r.$slots, "default")
    ], 4));
  }
});
function Nv(n) {
  n.component("KeosNotificationBuilder", Pt), n.component("KeosWhatsAppBuilder", Vt), n.component("KeosSmsBuilder", Nt), n.component("KeosEmailBuilder", Et), n.component("BuilderShell", xv), n.component("BuilderOutline", Bv), n.component("BuilderVersionHistoryModal", Tt), n.component("BuilderFormShell", Tv), n.component("BuilderActionsBar", Pv), n.component("BuilderTopShell", Vv);
}
const Ov = {
  install: Nv,
  KeosNotificationBuilder: Pt,
  KeosWhatsAppBuilder: Vt,
  KeosSmsBuilder: Nt,
  KeosEmailBuilder: Et
};
export {
  Pv as BuilderActionsBar,
  Tv as BuilderFormShell,
  Bv as BuilderOutline,
  xv as BuilderShell,
  Vv as BuilderTopShell,
  Tt as BuilderVersionHistoryModal,
  De as DEFAULT_SAMPLE_PROFILES,
  Et as KeosEmailBuilder,
  Pt as KeosNotificationBuilder,
  Nt as KeosSmsBuilder,
  Vt as KeosWhatsAppBuilder,
  Ov as default,
  Nv as install,
  Oe as renderTemplatePreview,
  Xe as useAutosave,
  Ge as useCampaignState
};
//# sourceMappingURL=index.js.map
