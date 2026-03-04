import { ref as ne, watch as Ue, computed as h, defineComponent as Ce, openBlock as a, createElementBlock as s, normalizeStyle as ve, unref as f, createElementVNode as e, normalizeClass as de, Fragment as W, renderList as F, toDisplayString as d, createTextVNode as K, createCommentVNode as g, withDirectives as Re, vModelSelect as Ve, vModelText as nt, createStaticVNode as He, withKeys as Nt, onMounted as je, onUnmounted as Ke, createVNode as Be, createBlock as Mt, withModifiers as Fe, renderSlot as Ee } from "vue";
const pe = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Ne = {
  input: 6,
  card: 12,
  button: 6
}, ke = {
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
ke.neutral.textMuted, ke.neutral.textMeta;
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
}, Dt = ["android", "ios", "web"], xt = "normal", Ct = ["low", "normal", "high"], St = 86400, Wt = [3600, 7200, 86400, 172800], It = "1.0", Ht = ["topic", "segment", "user_list"];
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
function zt(n) {
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
  return r.schema_version || (r.schema_version = It), r.audience || (r.audience = lt()), r.message || (r.message = ot()), r.delivery || (r.delivery = it()), r.tracking || (r.tracking = rt()), Ct.includes(r.delivery.priority) || (r.delivery.priority = xt), r.delivery.ttl === void 0 && (r.delivery.ttl = St), Ht.includes(r.audience.type) || (r.audience.type = "topic"), r.audience.type === "topic" && !r.audience.topic_name && (r.audience.topic_name = "default"), r;
}
const Ft = 1e5;
function qt(n, r) {
  var w, _, y;
  const m = [], b = r ?? n.audience.estimated_reach;
  return b !== void 0 && b >= Ft && m.push({
    message: `Estimated reach is very high (${b.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), n.tracking && !((w = n.tracking.campaign_name) != null && w.trim()) && !((_ = n.name) != null && _.trim()) && m.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (y = n.message.deep_link) != null && y.trim() || m.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), m;
}
function Bt(n, r = "error") {
  return { message: n, severity: r };
}
function Ut(n) {
  const r = [];
  return n.schema_version || r.push(Bt("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function jt(n, r) {
  const m = Ut(n), b = qt(n, r);
  return {
    valid: m.valid,
    errors: [
      ...m.errors,
      ...b.map((w) => Bt(w.message, w.severity))
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
  const { title: r, body: m } = n, b = Me(r || "", Ye.title), w = Me(m || "", Ye.body);
  return {
    title: b.text,
    body: w.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: w.truncated,
    expanded: !1
  };
}
function Gt(n) {
  const { title: r, body: m } = n, b = Me(r || "", Ye.title), w = Me(m || "", Ye.body);
  return {
    title: b.text,
    body: w.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: w.truncated,
    expanded: !0
  };
}
function Xt(n, r = {}) {
  const m = r.expanded ? Gt(n) : Jt(n);
  return r.darkMode !== void 0 && (m.darkMode = r.darkMode), m;
}
const ut = Je.ios;
function Lt(n) {
  const { title: r, body: m } = n, b = Me(r || "", ut.title), w = Me(m || "", ut.body);
  return {
    title: b.text,
    body: w.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: w.truncated,
    expanded: !1
  };
}
function Qt(n) {
  return Lt(n);
}
function Zt(n, r = {}) {
  const m = r.variant === "lockscreen" ? Qt(n) : Lt(n);
  return r.darkMode !== void 0 && (m.darkMode = r.darkMode), m;
}
const ct = Je.web;
function pt(n) {
  const { title: r, body: m } = n, b = Me(r || "", ct.title), w = Me(m || "", ct.body);
  return {
    title: b.text,
    body: w.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: w.truncated
  };
}
function ea(n) {
  return n.map((r) => ({ message: r, severity: "error" }));
}
function Ze(n) {
  return JSON.parse(JSON.stringify(n));
}
function Ge(n = {}) {
  const r = ne(
    At(n.initial ?? zt())
  ), m = n.hooks ?? {}, b = ne(!1), w = ne([]);
  Ue(
    r,
    () => {
      if (!m.customValidators) {
        w.value = [];
        return;
      }
      m.customValidators(r.value).then((U) => {
        w.value = U;
      });
    },
    { deep: !0, immediate: !0 }
  );
  const _ = ne([]), y = ne([]);
  function C() {
    const U = Ze(r.value);
    _.value = [..._.value.slice(-19), U], y.value = [];
  }
  const I = h(() => _.value.length > 0), E = h(() => y.value.length > 0);
  function N() {
    _.value.length !== 0 && (y.value = [Ze(r.value), ...y.value], r.value = _.value[_.value.length - 1], _.value = _.value.slice(0, -1));
  }
  function D() {
    y.value.length !== 0 && (_.value = [..._.value, Ze(r.value)], r.value = y.value[0], y.value = y.value.slice(1));
  }
  Ue(
    r,
    () => {
      var U;
      b.value = !0, (U = n.onDirty) == null || U.call(n);
    },
    { deep: !0 }
  );
  const H = h(() => Ut(r.value));
  function Z(U) {
    const oe = jt(r.value, U), ee = ea(w.value), T = [...Kt(oe), ...ee], be = [...oe.errors, ...ee], ue = oe.valid && ee.length === 0;
    return {
      ...oe,
      errors: be,
      valid: ue,
      blockingErrors: T,
      warnings: Yt(oe)
    };
  }
  function q(U) {
    C(), r.value = { ...r.value, ...U };
  }
  function me(U) {
    C(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...U }
    };
  }
  function X(U) {
    C(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...U }
    };
  }
  function G(U) {
    C(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...U }
    };
  }
  function O(U) {
    C(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...U } : { campaign_name: "", tags: [], ab_test: !1, ...U }
    };
  }
  function re(U) {
    C(), r.value = {
      ...r.value,
      message: { ...ot(), ...U }
    };
  }
  function ge(U) {
    C(), r.value = {
      ...r.value,
      delivery: { ...it(), ...U }
    };
  }
  function $e(U) {
    C(), r.value = {
      ...r.value,
      tracking: { ...rt(), ...U }
    };
  }
  function fe(U) {
    C(), r.value = {
      ...r.value,
      audience: { ...lt(), ...U }
    };
  }
  const ae = h(() => ({
    title: r.value.message.title,
    body: r.value.message.body,
    imageUrl: r.value.message.image_url
  }));
  function j(U, oe) {
    const ee = ae.value;
    let T;
    switch (U) {
      case "android":
        T = Xt(ee, { expanded: oe == null ? void 0 : oe.expanded });
        break;
      case "ios":
        T = Zt(ee);
        break;
      case "web":
        T = pt(ee);
        break;
      default:
        T = pt(ee);
    }
    const be = r.value.message.actions ?? [], ue = r.value.message.location;
    return { ...T, actions: be, location: ue ?? void 0 };
  }
  const v = Je;
  async function $() {
    return m.customValidators ? m.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: b,
    validation: H,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: w,
    getValidationWithWarnings: Z,
    update: q,
    updateAudience: me,
    updateMessage: X,
    updateDelivery: G,
    updateTracking: O,
    undo: N,
    redo: D,
    canUndo: I,
    canRedo: E,
    resetMessage: re,
    resetDelivery: ge,
    resetTracking: $e,
    resetAudience: fe,
    getPreview: j,
    previewInput: ae,
    characterLimits: v,
    runCustomValidators: $,
    hooks: m
  };
}
const ta = "keos-draft", aa = 2e3;
function sa(n, r) {
  return `${ta}-${n}-${r}`;
}
function Xe(n, r) {
  const m = r.channel, b = h(
    () => {
      var N, D;
      return sa(
        m,
        r.key ?? ((N = n.value) == null ? void 0 : N.id) ?? ((D = n.value) == null ? void 0 : D.name) ?? "draft"
      );
    }
  ), w = ne(null);
  let _ = null;
  function y() {
    try {
      const N = JSON.stringify(n.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(b.value, N), w.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function C() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(b.value);
    } catch {
    }
  }
  function I() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const N = window.localStorage.getItem(b.value);
      if (!N) return null;
      const D = JSON.parse(N);
      return At(D);
    } catch {
      return null;
    }
  }
  function E() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return Ue(
    n,
    () => {
      E() && (_ && clearTimeout(_), _ = setTimeout(() => {
        _ = null, y();
      }, aa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: w,
    clearDraft: C,
    getDraft: I,
    persist: y
  };
}
const na = { class: "kb-header__row" }, la = ["value"], oa = { class: "kb-header__actions" }, ia = ["disabled"], ra = ["disabled"], da = ["value"], ua = ["value"], ca = /* @__PURE__ */ Ce({
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
    const m = [
      { value: "draft", label: "Draft" },
      { value: "ready_for_review", label: "Ready for review" },
      { value: "approved", label: "Approved" },
      { value: "archived", label: "Archived" }
    ], b = n, w = r, _ = () => !!(b.campaignName || "").trim();
    function y(E) {
      return b.slugifyName ? E.trim().replace(/\s+/g, "-") : E;
    }
    function C(E) {
      return E.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function I(E) {
      const N = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return N[E] ?? N.draft;
    }
    return (E, N) => (a(), s("header", {
      class: "kb-header",
      style: ve({
        padding: `${f(pe)[16]}px 0`,
        borderBottom: `1px solid ${f(ke).neutral.border}`,
        marginBottom: `${f(pe)[16]}px`
      })
    }, [
      e("div", na, [
        e("div", {
          class: de(["kb-header__name-section", { "kb-header__name-section--filled": _() }])
        }, [
          N[4] || (N[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: n.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: N[0] || (N[0] = (D) => w("update:campaignName", y(D.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, la),
          N[5] || (N[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", oa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !n.canUndo,
            onClick: N[1] || (N[1] = (D) => w("undo"))
          }, " Undo ", 8, ia),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !n.canRedo,
            onClick: N[2] || (N[2] = (D) => w("redo"))
          }, " Redo ", 8, ra)
        ]),
        n.workflowStatus !== void 0 ? (a(), s("select", {
          key: 0,
          value: n.workflowStatus,
          class: "kb-header__status-select",
          style: ve({
            padding: `${f(pe)[4]}px ${f(pe)[8]}px`,
            borderRadius: `${f(Ne).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...I(n.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: N[3] || (N[3] = (D) => w("update:workflowStatus", D.target.value))
        }, [
          (a(), s(W, null, F(m, (D) => e("option", {
            key: D.value,
            value: D.value
          }, d(D.label), 9, ua)), 64))
        ], 44, da)) : (a(), s("span", {
          key: 1,
          class: "kb-header__status",
          style: ve({
            padding: `${f(pe)[4]}px ${f(pe)[8]}px`,
            borderRadius: `${f(Ne).input}px`,
            background: f(ke).neutral.bg,
            fontSize: "0.8125rem",
            color: f(ke).neutral.textMuted
          })
        }, d(n.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: ve({ fontSize: "0.8125rem", color: f(ke).neutral.textMuted, marginTop: `${f(pe)[4]}px` })
      }, [
        n.saving ? (a(), s(W, { key: 0 }, [
          K("Saving…")
        ], 64)) : n.dirty ? (a(), s(W, { key: 1 }, [
          K("Unsaved changes")
        ], 64)) : n.lastSavedAt ? (a(), s(W, { key: 2 }, [
          K("Last saved at " + d(C(n.lastSavedAt)), 1)
        ], 64)) : g("", !0)
      ], 4)
    ], 4));
  }
}), Ie = (n, r) => {
  const m = n.__vccOpts || n;
  for (const [b, w] of r)
    m[b] = w;
  return m;
}, Qe = /* @__PURE__ */ Ie(ca, [["__scopeId", "data-v-56efb3ec"]]), pa = { class: "kb-section" }, ma = { class: "kb-section__head" }, va = { class: "kb-section__desc" }, ba = { class: "kb-field" }, fa = { class: "kb-label" }, ga = { class: "kb-field-with-rail" }, ha = ["value", "aria-invalid", "aria-describedby"], ya = {
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
}, Aa = { class: "kb-field" }, Ba = ["value", "aria-invalid", "aria-describedby"], Ua = {
  key: 0,
  id: "deeplink-error",
  class: "kb-inline-error",
  role: "alert"
}, La = { class: "kb-field" }, Ta = { class: "kb-location-row" }, Ra = ["value"], Pa = ["value"], Va = ["value"], Ea = ["value"], Oa = { class: "kb-field" }, Na = { class: "kb-actions-list" }, Ma = ["value", "onInput"], Da = ["value", "onInput"], Wa = ["onClick"], Ha = ["disabled"], za = { class: "kb-action-chips" }, Fa = ["disabled", "onClick"], qa = /* @__PURE__ */ Ce({
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
    return (m, b) => {
      var w, _, y, C;
      return a(), s("section", pa, [
        e("div", ma, [
          b[10] || (b[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (I) => m.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        e("p", va, " Message body is required. Title is optional. Character limits depend on the selected platform (" + d(n.selectedPlatform) + "). ", 1),
        e("div", ba, [
          e("label", fa, [
            b[11] || (b[11] = K(" Title ", -1)),
            e("span", {
              class: de(["kb-counter", { "kb-counter--warn": n.titleCount > n.titleLimit }])
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
              onInput: b[1] || (b[1] = (I) => m.$emit("update", { title: I.target.value }))
            }, null, 40, ha),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ve({ "--pct": Math.min(100, n.titleCount / n.titleLimit * 100) + "%" })
            }, [...b[12] || (b[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.titleError ? (a(), s("p", ya, d(n.titleError), 1)) : g("", !0)
        ]),
        e("div", ka, [
          e("label", _a, [
            b[13] || (b[13] = K(" Message ", -1)),
            e("span", {
              class: de(["kb-counter", { "kb-counter--warn": n.bodyCount > n.bodyLimit }])
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
              onInput: b[2] || (b[2] = (I) => m.$emit("update", { body: I.target.value }))
            }, null, 40, $a),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: ve({ "--pct": Math.min(100, n.bodyCount / n.bodyLimit * 100) + "%" })
            }, [...b[14] || (b[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.bodyError ? (a(), s("p", xa, d(n.bodyError), 1)) : g("", !0)
        ]),
        e("div", Ca, [
          b[15] || (b[15] = e("label", { class: "kb-label" }, [
            K(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: n.message.image_url,
            "aria-invalid": !!n.imageUrlError,
            "aria-describedby": n.imageUrlError ? "image-url-error" : void 0,
            onInput: b[3] || (b[3] = (I) => m.$emit("update", { image_url: I.target.value || void 0 }))
          }, null, 40, Sa),
          n.imageUrlError ? (a(), s("p", Ia, d(n.imageUrlError), 1)) : g("", !0)
        ]),
        e("div", Aa, [
          b[16] || (b[16] = e("label", { class: "kb-label" }, [
            K(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: n.message.deep_link,
            "aria-invalid": !!n.deepLinkError,
            "aria-describedby": n.deepLinkError ? "deeplink-error" : void 0,
            onInput: b[4] || (b[4] = (I) => m.$emit("update", { deep_link: I.target.value || void 0 }))
          }, null, 40, Ba),
          n.deepLinkError ? (a(), s("p", Ua, d(n.deepLinkError), 1)) : g("", !0)
        ]),
        e("div", La, [
          b[17] || (b[17] = e("label", { class: "kb-label" }, [
            K(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Ta, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((w = n.message.location) == null ? void 0 : w.lat) ?? "",
              onInput: b[5] || (b[5] = (I) => {
                const E = { ...n.message.location ?? {} }, N = I.target.value;
                E.lat = N === "" ? void 0 : Number(N), m.$emit("update", { location: E });
              })
            }, null, 40, Ra),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((_ = n.message.location) == null ? void 0 : _.lon) ?? "",
              onInput: b[6] || (b[6] = (I) => {
                const E = { ...n.message.location ?? {} }, N = I.target.value;
                E.lon = N === "" ? void 0 : Number(N), m.$emit("update", { location: E });
              })
            }, null, 40, Pa)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((y = n.message.location) == null ? void 0 : y.name) ?? "",
            onInput: b[7] || (b[7] = (I) => {
              const E = { ...n.message.location ?? {} };
              E.name = I.target.value || void 0, m.$emit("update", { location: E });
            })
          }, null, 40, Va),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((C = n.message.location) == null ? void 0 : C.address) ?? "",
            onInput: b[8] || (b[8] = (I) => {
              const E = { ...n.message.location ?? {} };
              E.address = I.target.value || void 0, m.$emit("update", { location: E });
            })
          }, null, 40, Ea)
        ]),
        e("div", Oa, [
          b[19] || (b[19] = e("label", { class: "kb-label" }, [
            K(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Na, [
            (a(!0), s(W, null, F(r.message.actions ?? [], (I, E) => (a(), s("div", {
              key: I.id || E,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: I.label,
                onInput: (N) => {
                  var Z;
                  const D = [...r.message.actions ?? []], H = Number(E);
                  D[H] = {
                    ...D[H],
                    id: ((Z = D[H]) == null ? void 0 : Z.id) || `action_${H + 1}`,
                    label: N.target.value
                  }, m.$emit("update", { actions: D });
                }
              }, null, 40, Ma),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: I.url,
                onInput: (N) => {
                  var Z;
                  const D = [...r.message.actions ?? []], H = Number(E);
                  D[H] = {
                    ...D[H],
                    id: ((Z = D[H]) == null ? void 0 : Z.id) || `action_${H + 1}`,
                    url: N.target.value || void 0
                  }, m.$emit("update", { actions: D });
                }
              }, null, 40, Da),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const N = [...r.message.actions ?? []];
                  N.splice(Number(E), 1), m.$emit("update", { actions: N });
                }
              }, " Remove ", 8, Wa)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: b[9] || (b[9] = () => {
                const I = [...r.message.actions ?? []];
                I.push({
                  id: `action_${I.length + 1}`,
                  label: "",
                  url: ""
                }), m.$emit("update", { actions: I });
              })
            }, " Add action ", 8, Ha),
            e("div", za, [
              b[18] || (b[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (a(), s(W, null, F(["View order", "Track shipment", "Open app"], (I) => e("button", {
                key: I,
                type: "button",
                class: "kb-action-chip",
                disabled: (r.message.actions ?? []).length >= 3,
                onClick: () => {
                  const E = [...r.message.actions ?? []];
                  E.push({
                    id: `action_${Date.now()}`,
                    label: I,
                    url: ""
                  }), m.$emit("update", { actions: E });
                }
              }, d(I), 9, Fa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ja = /* @__PURE__ */ Ie(qa, [["__scopeId", "data-v-88ad2281"]]), Ka = { class: "kb-section kb-section--inline-personalization" }, Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = ["value"], Xa = { class: "kb-field" }, Qa = { class: "kb-insert-row" }, Za = { class: "kb-field" }, es = { class: "kb-variable-list" }, ts = /* @__PURE__ */ Ce({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(n, { emit: r }) {
    const m = n, b = r, w = ["first_name", "last_name", "order_id", "city"], _ = ne(m.variableOptions ?? w), y = ne(_.value[0] ?? w[0]), C = ne("");
    Ue(
      () => m.variableOptions,
      (D) => {
        D && D.length && (_.value = [...D], _.value.includes(y.value) || (y.value = _.value[0]));
      }
    );
    const I = h(() => _.value);
    function E(D) {
      b("insertVariable", { variable: y.value, field: D });
    }
    function N() {
      const D = C.value.trim();
      D && (_.value.includes(D) || (_.value = [..._.value, D]), y.value = D, C.value = "");
    }
    return (D, H) => (a(), s("section", Ka, [
      H[8] || (H[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      H[9] || (H[9] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ya, [
        H[4] || (H[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ja, [
          Re(e("select", {
            "onUpdate:modelValue": H[0] || (H[0] = (Z) => y.value = Z),
            class: "kb-select"
          }, [
            (a(!0), s(W, null, F(I.value, (Z) => (a(), s("option", {
              key: Z,
              value: Z
            }, d(Z), 9, Ga))), 128))
          ], 512), [
            [Ve, y.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H[1] || (H[1] = (Z) => E("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H[2] || (H[2] = (Z) => E("body"))
          }, "Into message")
        ])
      ]),
      e("div", Xa, [
        H[5] || (H[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qa, [
          Re(e("input", {
            "onUpdate:modelValue": H[3] || (H[3] = (Z) => C.value = Z),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [nt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: N
          }, " Add ")
        ])
      ]),
      e("div", Za, [
        H[6] || (H[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        H[7] || (H[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", es, [
          (a(!0), s(W, null, F(I.value, (Z) => (a(), s("li", { key: Z }, [
            e("code", null, "{{ ." + d(Z) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Tt = /* @__PURE__ */ Ie(ts, [["__scopeId", "data-v-9d88edb5"]]), as = { class: "kb-section kb-section--template-type" }, ss = { class: "kb-field" }, ns = { class: "kb-radio-group" }, ls = { class: "kb-radio" }, os = ["checked"], is = { class: "kb-radio" }, rs = ["checked"], ds = /* @__PURE__ */ Ce({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(n, { emit: r }) {
    const m = r;
    return (b, w) => (a(), s("section", as, [
      w[5] || (w[5] = e("h3", { class: "kb-section__title" }, "Template type", -1)),
      w[6] || (w[6] = e("p", { class: "kb-section__desc" }, " Choose how this template will be used. Your system uses this to route and apply policies. ", -1)),
      e("div", ss, [
        e("div", ns, [
          e("label", ls, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "transactional",
              checked: n.templateType === "transactional",
              onChange: w[0] || (w[0] = (_) => m("update", "transactional"))
            }, null, 40, os),
            w[2] || (w[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", is, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: n.templateType === "marketing",
              onChange: w[1] || (w[1] = (_) => m("update", "marketing"))
            }, null, 40, rs),
            w[3] || (w[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        w[4] || (w[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), dt = /* @__PURE__ */ Ie(ds, [["__scopeId", "data-v-ff2e1bd8"]]), us = { class: "kb-section" }, cs = { class: "kb-section__head" }, ps = { class: "kb-section__desc" }, ms = { class: "kb-field" }, vs = { class: "kb-radio-group" }, bs = { class: "kb-radio" }, fs = ["checked"], gs = { class: "kb-radio" }, hs = ["checked"], ys = {
  key: 0,
  class: "kb-field kb-row"
}, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Cs = { class: "kb-field" }, Ss = ["value"], Is = ["value"], As = { class: "kb-field" }, Bs = { class: "kb-checkbox" }, Us = ["checked"], Ls = /* @__PURE__ */ Ce({
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
    return (m, b) => {
      var w;
      return a(), s("section", us, [
        e("div", cs, [
          b[8] || (b[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (_) => m.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        e("p", ps, d(n.showPushOptions ? "Choose when this campaign should go out and how it should be delivered." : "Send now or schedule for later."), 1),
        e("div", ms, [
          b[11] || (b[11] = e("label", { class: "kb-label" }, "Send time", -1)),
          e("div", vs, [
            e("label", bs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !n.delivery.scheduled_at,
                onChange: b[1] || (b[1] = (_) => m.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, fs),
              b[9] || (b[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", gs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!n.delivery.scheduled_at,
                onChange: b[2] || (b[2] = (_) => m.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, hs),
              b[10] || (b[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        n.delivery.scheduled_at ? (a(), s("div", ys, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (w = n.delivery.scheduled_at) == null ? void 0 : w.slice(0, 16),
            onInput: b[3] || (b[3] = (_) => m.$emit("update", { scheduled_at: _.target.value }))
          }, null, 40, ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: n.delivery.timezone,
            onInput: b[4] || (b[4] = (_) => m.$emit("update", { timezone: _.target.value }))
          }, null, 40, _s)
        ])) : g("", !0),
        n.showPushOptions ? (a(), s(W, { key: 1 }, [
          e("div", ws, [
            b[12] || (b[12] = e("label", { class: "kb-label" }, [
              K(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.ttl,
              onChange: b[5] || (b[5] = (_) => m.$emit("update", { ttl: Number(_.target.value) }))
            }, [
              (a(!0), s(W, null, F(f(Wt), (_) => (a(), s("option", {
                key: _,
                value: _
              }, d(r[_] ?? _ + "s"), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Cs, [
            b[13] || (b[13] = e("label", { class: "kb-label" }, [
              K(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.priority,
              onChange: b[6] || (b[6] = (_) => m.$emit("update", { priority: _.target.value }))
            }, [
              (a(!0), s(W, null, F(f(Ct), (_) => (a(), s("option", {
                key: _,
                value: _
              }, d(_), 9, Is))), 128))
            ], 40, Ss)
          ]),
          e("div", As, [
            e("label", Bs, [
              e("input", {
                type: "checkbox",
                checked: n.delivery.quiet_hours,
                onChange: b[7] || (b[7] = (_) => m.$emit("update", { quiet_hours: !n.delivery.quiet_hours }))
              }, null, 40, Us),
              b[14] || (b[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : g("", !0)
      ]);
    };
  }
}), Ts = /* @__PURE__ */ Ie(Ls, [["__scopeId", "data-v-5707a2a7"]]), Rs = { class: "kb-accordion" }, Ps = { class: "kb-accordion__body" }, Vs = { class: "kb-field" }, Es = ["value"], Os = { class: "kb-field" }, Ns = { class: "kb-checkbox" }, Ms = ["checked"], Ds = /* @__PURE__ */ Ce({
  __name: "SectionAdvanced",
  props: {
    delivery: {}
  },
  emits: ["update"],
  setup(n) {
    return (r, m) => (a(), s("details", Rs, [
      m[4] || (m[4] = e("summary", { class: "kb-accordion__summary" }, "Advanced push behavior (optional)", -1)),
      e("div", Ps, [
        e("div", Vs, [
          m[2] || (m[2] = e("label", { class: "kb-label" }, [
            K(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: n.delivery.collapse_key,
            onInput: m[0] || (m[0] = (b) => r.$emit("update", { collapse_key: b.target.value || void 0 }))
          }, null, 40, Es)
        ]),
        e("div", Os, [
          e("label", Ns, [
            e("input", {
              type: "checkbox",
              checked: n.delivery.silent_push,
              onChange: m[1] || (m[1] = (b) => r.$emit("update", { silent_push: !n.delivery.silent_push }))
            }, null, 40, Ms),
            m[3] || (m[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ws = /* @__PURE__ */ Ie(Ds, [["__scopeId", "data-v-699e4501"]]);
function Oe(n, r) {
  return !n || typeof n != "string" ? n : n.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, b) => {
    const _ = String(b).trim().replace(/^\./, "");
    return _ in r ? String(r[_]) : m;
  });
}
const De = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Hs = { class: "kb-preview" }, zs = { class: "kb-preview__toggle" }, Fs = { class: "kb-preview__mode" }, qs = { class: "kb-preview__quality" }, js = {
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
}, gn = ["src"], hn = { class: "kb-web-toast" }, yn = { class: "kb-web-body" }, kn = {
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
}, Bn = /* @__PURE__ */ Ce({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(n) {
    const r = n, m = ne("shade"), b = ne("banner"), w = ne("toast"), _ = h(() => m.value === "expanded"), y = h(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? _.value : void 0
      })
    ), C = h(() => {
      const j = y.value;
      return r.previewProfile ? {
        ...j,
        title: Oe((j == null ? void 0 : j.title) ?? "", r.previewProfile.data),
        body: Oe((j == null ? void 0 : j.body) ?? "", r.previewProfile.data)
      } : j;
    }), I = {
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
    function E(j, v) {
      const $ = (j ?? "").trim();
      return $ ? $.length <= v ? $ : `${$.slice(0, Math.max(0, v - 1)).trimEnd()}…` : "";
    }
    const N = h(() => r.selectedPlatform === "android" ? m.value : r.selectedPlatform === "ios" ? b.value : w.value), D = h(() => (I[r.selectedPlatform] ?? I.web)[N.value] ?? { title: 60, body: 160 }), H = h(
      () => {
        var j;
        return E((j = C.value) == null ? void 0 : j.title, D.value.title);
      }
    ), Z = h(
      () => {
        var j;
        return E((j = C.value) == null ? void 0 : j.body, D.value.body);
      }
    ), q = { android: 3, ios: 4, web: 2 }, me = h(
      () => {
        var j;
        return Array.isArray((j = C.value) == null ? void 0 : j.actions) ? C.value.actions : [];
      }
    ), X = h(
      () => me.value.slice(0, q[r.selectedPlatform] ?? 2)
    ), G = h(
      () => Math.max(0, me.value.length - X.value.length)
    ), O = h(() => {
      var j;
      return (((j = r.message) == null ? void 0 : j.deep_link) ?? "").trim();
    }), re = h(() => O.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(O.value) : !1), ge = h(() => O.value ? O.value.length <= 40 ? O.value : `${O.value.slice(0, 37)}…` : ""), $e = h(() => {
      var v, $, U;
      const j = [];
      return (v = r.delivery) != null && v.priority && j.push(`Priority: ${r.delivery.priority}`), typeof (($ = r.delivery) == null ? void 0 : $.ttl) == "number" && j.push(`TTL: ${r.delivery.ttl}s`), (U = r.delivery) != null && U.silent_push && j.push("Silent push"), j;
    }), fe = h(() => {
      var ee;
      const j = (ee = C.value) == null ? void 0 : ee.location;
      if (!j || j.lat == null && j.lon == null) return null;
      const v = Number(j.lat) || 0, $ = Number(j.lon) || 0, U = 8e-3, oe = [$ - U, v - U, $ + U, v + U].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(oe)}&layer=mapnik&marker=${v},${$}`;
    }), ae = h(() => {
      var v;
      const j = (v = C.value) == null ? void 0 : v.location;
      return j && (j.lat != null || j.lon != null || j.name || j.address);
    });
    return (j, v) => {
      var $, U, oe, ee, T, be, ue, _e, we, R, k, A, Y, le, he, ie;
      return a(), s("div", Hs, [
        e("div", zs, [
          e("label", Fs, [
            v[6] || (v[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            n.selectedPlatform === "android" ? Re((a(), s("select", {
              key: 0,
              "onUpdate:modelValue": v[0] || (v[0] = (se) => m.value = se),
              class: "kb-preview__mode-select"
            }, [...v[3] || (v[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ve, m.value]
            ]) : n.selectedPlatform === "ios" ? Re((a(), s("select", {
              key: 1,
              "onUpdate:modelValue": v[1] || (v[1] = (se) => b.value = se),
              class: "kb-preview__mode-select"
            }, [...v[4] || (v[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ve, b.value]
            ]) : Re((a(), s("select", {
              key: 2,
              "onUpdate:modelValue": v[2] || (v[2] = (se) => w.value = se),
              class: "kb-preview__mode-select"
            }, [...v[5] || (v[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ve, w.value]
            ])
          ]),
          e("div", qs, [
            (a(!0), s(W, null, F($e.value, (se) => (a(), s("span", {
              key: se,
              class: "kb-preview__badge"
            }, d(se), 1))), 128))
          ])
        ]),
        n.selectedPlatform === "android" ? (a(), s("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: de(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${m.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          v[9] || (v[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: de(["kb-android-notification", { "kb-android-notification--expanded": _.value }])
          }, [
            v[8] || (v[8] = He('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: de(["kb-android-body", { "kb-android-body--expanded": _.value }])
            }, [
              _.value && C.value.imageUrl ? (a(), s("div", js, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, Ks)
              ])) : g("", !0),
              e("div", Ys, [
                e("div", Js, [
                  H.value ? (a(), s("div", Gs, d(H.value), 1)) : g("", !0),
                  Z.value ? (a(), s("div", Xs, d(Z.value), 1)) : g("", !0),
                  ae.value && !_.value && (($ = C.value.location) != null && $.name || (U = C.value.location) != null && U.address) ? (a(), s("div", Qs, [
                    v[7] || (v[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    K(" " + d(((oe = C.value.location) == null ? void 0 : oe.name) || ((ee = C.value.location) == null ? void 0 : ee.address)), 1)
                  ])) : g("", !0),
                  O.value ? (a(), s("div", {
                    key: 3,
                    class: de(["kb-preview-link", { "kb-preview-link--invalid": !re.value }])
                  }, d(re.value ? ge.value : "Invalid deep link format"), 3)) : g("", !0)
                ]),
                !_.value && C.value.imageUrl ? (a(), s("div", Zs, [
                  e("img", {
                    src: C.value.imageUrl,
                    alt: ""
                  }, null, 8, en)
                ])) : g("", !0)
              ]),
              ae.value && fe.value && _.value ? (a(), s("div", tn, [
                e("iframe", {
                  src: fe.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, an),
                (T = C.value.location) != null && T.name || (be = C.value.location) != null && be.address ? (a(), s("div", sn, d(((ue = C.value.location) == null ? void 0 : ue.name) || ((_e = C.value.location) == null ? void 0 : _e.address)), 1)) : g("", !0)
              ])) : g("", !0),
              X.value.length ? (a(), s("div", nn, [
                (a(!0), s(W, null, F(X.value, (se) => (a(), s("button", {
                  key: se.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, d(se.label || "Action"), 1))), 128))
              ])) : g("", !0),
              G.value > 0 ? (a(), s("p", ln, " Showing " + d(X.value.length) + " of " + d(me.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : g("", !0)
            ], 2)
          ], 2)
        ], 2)) : n.selectedPlatform === "ios" ? (a(), s("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: de(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${b.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          v[12] || (v[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", on, [
            v[11] || (v[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", rn, [
              v[10] || (v[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              H.value ? (a(), s("div", dn, d(H.value), 1)) : g("", !0),
              Z.value ? (a(), s("div", un, d(Z.value), 1)) : g("", !0),
              O.value ? (a(), s("div", {
                key: 2,
                class: de(["kb-preview-link", { "kb-preview-link--invalid": !re.value }])
              }, d(re.value ? ge.value : "Invalid deep link format"), 3)) : g("", !0),
              ae.value && fe.value ? (a(), s("div", cn, [
                e("iframe", {
                  src: fe.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                (we = C.value.location) != null && we.name || (R = C.value.location) != null && R.address ? (a(), s("div", mn, d(((k = C.value.location) == null ? void 0 : k.name) || ((A = C.value.location) == null ? void 0 : A.address)), 1)) : g("", !0)
              ])) : g("", !0),
              X.value.length ? (a(), s("div", vn, [
                (a(!0), s(W, null, F(X.value, (se) => (a(), s("button", {
                  key: se.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, d(se.label || "Action"), 1))), 128))
              ])) : g("", !0),
              G.value > 0 ? (a(), s("p", bn, " Showing " + d(X.value.length) + " of " + d(me.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : g("", !0)
            ]),
            C.value.imageUrl ? (a(), s("div", fn, [
              e("img", {
                src: C.value.imageUrl,
                alt: ""
              }, null, 8, gn)
            ])) : g("", !0)
          ])
        ], 2)) : (a(), s("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: de(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${w.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          v[14] || (v[14] = He('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", hn, [
            v[13] || (v[13] = He('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", yn, [
              H.value ? (a(), s("div", kn, d(H.value), 1)) : g("", !0),
              Z.value ? (a(), s("div", _n, d(Z.value), 1)) : g("", !0),
              O.value ? (a(), s("div", {
                key: 2,
                class: de(["kb-preview-link", { "kb-preview-link--invalid": !re.value }])
              }, d(re.value ? ge.value : "Invalid deep link format"), 3)) : g("", !0),
              C.value.imageUrl ? (a(), s("div", wn, [
                e("img", {
                  src: C.value.imageUrl,
                  alt: ""
                }, null, 8, $n)
              ])) : g("", !0),
              ae.value && fe.value ? (a(), s("div", xn, [
                e("iframe", {
                  src: fe.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Cn),
                (Y = C.value.location) != null && Y.name || (le = C.value.location) != null && le.address ? (a(), s("div", Sn, d(((he = C.value.location) == null ? void 0 : he.name) || ((ie = C.value.location) == null ? void 0 : ie.address)), 1)) : g("", !0)
              ])) : g("", !0)
            ]),
            X.value.length ? (a(), s("div", In, [
              (a(!0), s(W, null, F(X.value, (se, p) => (a(), s("button", {
                key: se.id || p,
                type: "button",
                class: de(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(p) > 0 }])
              }, d(se.label || "Action"), 3))), 128))
            ])) : g("", !0),
            G.value > 0 ? (a(), s("p", An, " Showing " + d(X.value.length) + " of " + d(me.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : g("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Un = /* @__PURE__ */ Ie(Bn, [["__scopeId", "data-v-4fc616d9"]]), Ln = { class: "kb-version-dialog" }, Tn = {
  key: 0,
  class: "kb-version-empty"
}, Rn = {
  key: 1,
  class: "kb-version-list"
}, Pn = { class: "kb-version-item-label" }, Vn = ["onClick"], En = { class: "kb-version-actions" }, On = /* @__PURE__ */ Ce({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(n, { emit: r }) {
    const m = r;
    function b(w) {
      try {
        return new Date(w).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return w;
      }
    }
    return (w, _) => n.open ? (a(), s("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: _[1] || (_[1] = Nt((y) => m("close"), ["escape"]))
    }, [
      e("div", Ln, [
        _[2] || (_[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        _[3] || (_[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        n.versions.length === 0 ? (a(), s("div", Tn, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), s("ul", Rn, [
          (a(!0), s(W, null, F(n.versions, (y) => (a(), s("li", {
            key: y.id,
            class: "kb-version-item"
          }, [
            e("span", Pn, d(y.label || b(y.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (C) => {
                m("restore", y.snapshot), m("close");
              }
            }, " Restore ", 8, Vn)
          ]))), 128))
        ])),
        e("div", En, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: _[0] || (_[0] = (y) => m("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : g("", !0);
  }
}), Rt = /* @__PURE__ */ Ie(On, [["__scopeId", "data-v-ce35a513"]]), mt = [
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
        title: "Order {{ .order_id }} update",
        body: "Hi {{ .first_name }}, your order has shipped.",
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
        body: "Your code is {{ .otp_code }}. Valid for 10 minutes.",
        variables: [],
        template_type: "auth",
        template_category: "authentication",
        template_name: "otp_verification",
        auth_type: "otp",
        auth_label: "Your verification code is {{ .otp_code }}"
      }
    }
  },
  {
    id: "order-status",
    label: "Order status",
    campaign: {
      message: {
        title: "",
        body: "Hi {{ .first_name }}, your order {{ .order_id }} is on its way.",
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
        body: "Hi {{ .first_name }}, we have a special offer for you.",
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
        body: "Hi {{ .first_name }}, we have responded to your request.",
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
        body: "Hi {{ .first_name }}, tap to see the latest arrivals.",
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
        body: "Hi {{ .first_name }}, watch this short video to see what is new.",
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
        body: "Hi {{ .first_name }}, here is your receipt for order {{ .order_id }}.",
        variables: ["first_name", "order_id"],
        template_type: "document",
        template_category: "utility",
        header_type: "document",
        template_name: "order_receipt",
        document_filename: "receipt-{{ .order_id }}.pdf",
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
        body: "Hi {{ .first_name }}, this offer expires soon. Don’t miss out.",
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
        body: "Hi {{ .first_name }}, pick one of these products below.",
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
        auth_label: "Your code is {{ .otp_code }}"
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
        body: "Your code: {{ .otp_code }}",
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
        body: "Hi {{ .first_name }}, your order {{ .order_id }} has shipped.",
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
        body: "Flash sale today! Use SAVE20 at checkout. {{ .link }}",
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
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, here is what's new." }
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
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, here are this week's highlights." },
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
        subject: "Special offer for you, {{ .first_name }}",
        preview_text: "Limited time only",
        from_name: "Your Brand",
        from_address: "offers@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Exclusive offer" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, enjoy 20% off your next order." },
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
        subject: "Receipt for order {{ .order_id }}",
        preview_text: "Thank you for your order",
        from_name: "Your Brand",
        from_address: "orders@example.com",
        blocks: [
          { id: "h1", type: "heading", level: 1, content: "Thank you for your order" },
          { id: "p1", type: "paragraph", content: "Hi {{ .first_name }}, we received your order {{ .order_id }}." }
        ]
      }
    }
  }
], Nn = { class: "keos-notification-builder" }, Mn = { class: "kb-builder-top" }, Dn = { class: "kb-push-layout" }, Wn = { class: "kb-push-sidebar" }, Hn = {
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
}, pl = { key: 0 }, ml = { class: "kb-push-actions-right" }, vl = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "preset-confirm-title"
}, bl = { class: "kb-confirm-dialog" }, fl = { class: "kb-confirm-actions" }, gl = /* @__PURE__ */ Ce({
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
    const m = n, b = r, w = ne("android"), _ = ne(""), y = ne(!1), C = ne(null), I = ne(!1), E = h(
      () => q.value.workflow_status ?? "draft"
    ), N = h(() => {
      const c = _.value;
      return c ? De.find((i) => i.id === c) ?? null : null;
    });
    function D(c) {
      const i = q.value, S = c.campaign.message ? { ...i.message, ...c.campaign.message } : i.message, x = c.campaign.delivery ? { ...i.delivery, ...c.campaign.delivery } : i.delivery;
      O({
        ...c.campaign,
        message: S,
        delivery: x
      }), C.value = null, y.value = !1;
    }
    function H(c) {
      const i = c.target.value;
      if (!i) return;
      const S = mt.find((x) => x.id === i);
      S && (me.value ? (C.value = S, y.value = !0) : D(S), c.target.value = "");
    }
    function Z(c) {
      q.value = c, I.value = !1;
    }
    const {
      campaign: q,
      dirty: me,
      customValidatorErrors: X,
      getValidationWithWarnings: G,
      update: O,
      updateMessage: re,
      updateDelivery: ge,
      undo: $e,
      redo: fe,
      canUndo: ae,
      canRedo: j,
      resetMessage: v,
      resetDelivery: $,
      getPreview: U,
      characterLimits: oe,
      hooks: ee
    } = Ge({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (c) => {
          var x, z, B, u;
          const i = [];
          (x = c.name) != null && x.trim() || i.push("Template name is required"), (B = (z = c.message) == null ? void 0 : z.body) != null && B.trim() || i.push("Message body is required");
          const S = (u = m.hooks) != null && u.customValidators ? await m.hooks.customValidators(c) : [];
          return [...i, ...S];
        }
      },
      onDirty: () => b("change", q.value)
    }), { lastSavedAt: T } = Xe(q, { channel: "push" });
    function be(c) {
      (c.metaKey || c.ctrlKey) && c.key === "z" && (c.preventDefault(), c.shiftKey ? fe() : $e());
    }
    je(() => {
      window.addEventListener("keydown", be);
    }), Ke(() => {
      window.removeEventListener("keydown", be);
    }), Ue(q, (c) => b("update:modelValue", c), { deep: !0 });
    const ue = ne(), _e = ne(!0), we = ne(!0);
    async function R() {
      if (ee.estimateReach)
        try {
          ue.value = await ee.estimateReach(q.value.audience);
        } catch {
          ue.value = void 0;
        }
      ee.canSend && (_e.value = await Promise.resolve(ee.canSend())), ee.canSchedule && (we.value = await Promise.resolve(ee.canSchedule()));
    }
    R(), Ue(() => q.value.audience, R, { deep: !0 });
    const k = h(() => (X.value, G(ue.value))), A = h(() => k.value.blockingErrors), Y = h(() => k.value.warnings), le = h(() => k.value.valid), he = h(() => {
      var x, z, B;
      const c = q.value.message, i = [
        !!((x = q.value.name) != null && x.trim()),
        !!((z = c.title) != null && z.trim()),
        !!((B = c.body) != null && B.trim()),
        !!(c.template_type ?? q.value.template_type),
        Array.isArray(c.actions) ? c.actions.length > 0 : !1
      ], S = i.filter(Boolean).length;
      return Math.round(S / i.length * 100);
    }), ie = h(() => he.value >= 90 ? "Production ready" : he.value >= 70 ? "Strong draft" : he.value >= 40 ? "In progress" : "Needs setup"), se = h(() => {
      const c = q.value.message;
      return !!((c.title ?? "").toString().trim() || (c.body ?? "").toString().trim() || Array.isArray(c.actions) && c.actions.length);
    }), p = h(
      () => oe[w.value].title
    ), L = h(() => oe[w.value].body), Q = h(() => q.value.message.title.length), te = h(() => q.value.message.body.length), ce = h(() => {
      if (Q.value > p.value)
        return `Title exceeds ${p.value} characters for ${w.value}.`;
    }), ye = h(() => {
      const c = A.value.find(
        (i) => i.message === "Message body is required"
      );
      if (c) return c.message;
      if (te.value > L.value)
        return `Body exceeds ${L} characters for ${w.value}.`;
    }), Se = h(
      () => q.value.template_type ?? "transactional"
    );
    function Le(c) {
      O({ template_type: c });
    }
    function Te(c) {
      O({
        name: c,
        tracking: { ...q.value.tracking ?? {}, campaign_name: c }
      });
    }
    function Ae(c) {
      const i = ` {{ .${c.variable} }}`, S = q.value.message.variables ?? [], x = Array.from(/* @__PURE__ */ new Set([...S, c.variable]));
      c.field === "title" ? re({
        title: q.value.message.title + i,
        variables: x
      }) : re({
        body: q.value.message.body + i,
        variables: x
      });
    }
    function J() {
      le.value && b("save", q.value);
    }
    return (c, i) => {
      var S;
      return a(), s("div", Nn, [
        e("div", Mn, [
          Be(Qe, {
            "campaign-name": f(q).name,
            status: f(q).status,
            dirty: f(me),
            "last-saved-at": f(T),
            "can-undo": f(ae),
            "can-redo": f(j),
            "workflow-status": E.value,
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": Te,
            "onUpdate:workflowStatus": i[0] || (i[0] = (x) => f(O)({ workflow_status: x })),
            onUndo: f($e),
            onRedo: f(fe)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          A.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: ve({
              background: f(ke).dangerBg,
              border: `1px solid ${f(ke).dangerBorder}`,
              borderRadius: `${f(Ne).input}px`,
              padding: `${f(pe)[12]}px ${f(pe)[16]}px`,
              marginBottom: `${f(pe)[16]}px`
            })
          }, [
            e("ul", {
              style: ve({ margin: 0, paddingLeft: "1.25rem", color: f(ke).danger })
            }, [
              (a(!0), s(W, null, F(A.value, (x) => (a(), s("li", {
                key: x.message
              }, d(x.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Dn, [
          e("aside", Wn, [
            n.disabledSections.includes("message") ? g("", !0) : (a(), s("div", Hn, [
              !f(q).message.title && !f(q).message.body ? (a(), s("div", zn, " Add a title and message below to get started. ")) : g("", !0),
              e("div", Fn, [
                e("div", qn, [
                  i[12] || (i[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", jn, d(ie.value), 1)
                ]),
                e("div", Kn, [
                  Be(dt, {
                    "template-type": Se.value,
                    onUpdate: Le
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: H
                  }, [
                    i[13] || (i[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, F(f(mt), (x) => (a(), s("option", {
                      key: x.id,
                      value: x.id
                    }, d(x.label), 9, Yn))), 128))
                  ], 32)
                ]),
                e("div", Jn, [
                  e("div", Gn, [
                    i[14] || (i[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", Xn, d(he.value) + "%", 1)
                  ]),
                  e("div", Qn, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: ve({ width: `${he.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(ja, {
                message: f(q).message,
                "title-count": Q.value,
                "body-count": te.value,
                "title-limit": p.value,
                "body-limit": L.value,
                "selected-platform": w.value,
                "show-reset": !0,
                "title-error": ce.value,
                "body-error": ye.value,
                onUpdate: f(re),
                onReset: i[1] || (i[1] = (x) => f(v)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Be(Tt, {
                message: f(q).message,
                "variable-options": n.variableOptions,
                onUpdate: f(re),
                onInsertVariable: Ae
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !n.designOnly && !n.disabledSections.includes("delivery") ? (a(), s("div", Zn, [
              i[15] || (i[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Be(Ts, {
                delivery: f(q).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: f(ge),
                onReset: i[2] || (i[2] = (x) => f($)())
              }, null, 8, ["delivery", "onUpdate"]),
              Be(Ws, {
                delivery: f(q).delivery,
                onUpdate: f(ge)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : g("", !0)
          ]),
          e("main", el, [
            !n.designOnly && f(q).audience.test_mode ? (a(), s("div", tl, [...i[16] || (i[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", al, [
              e("div", sl, [
                e("label", nl, [
                  i[18] || (i[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Re(e("select", {
                    "onUpdate:modelValue": i[3] || (i[3] = (x) => _.value = x),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    i[17] || (i[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, F(f(De), (x) => (a(), s("option", {
                      key: x.id,
                      value: x.id
                    }, d(x.label), 9, ll))), 128))
                  ], 512), [
                    [Ve, _.value]
                  ])
                ]),
                e("div", ol, [
                  i[19] || (i[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(w.value), 1)
                ])
              ]),
              e("div", il, [
                (a(), s(W, null, F(["android", "ios", "web"], (x) => e("button", {
                  key: x,
                  type: "button",
                  class: de(["kb-push-device-btn", { "kb-push-device-btn--active": w.value === x }]),
                  role: "tab",
                  "aria-selected": w.value === x,
                  "aria-controls": `kb-preview-panel-${x}`,
                  onClick: (z) => w.value = x
                }, d(x.toUpperCase()), 11, rl)), 64))
              ]),
              e("div", {
                class: de(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !se.value }])
              }, [
                !f(q).message.title && !f(q).message.body ? (a(), s("div", dl, [...i[20] || (i[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), Mt(Un, {
                  key: 1,
                  "get-preview": f(U),
                  "selected-platform": w.value,
                  "preview-profile": N.value,
                  message: f(q).message,
                  delivery: f(q).delivery,
                  "onUpdate:selectedPlatform": i[4] || (i[4] = (x) => w.value = x)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", ul, [
          Y.value.length > 0 ? (a(), s("div", cl, [
            i[21] || (i[21] = e("strong", null, "Warning:", -1)),
            K(" " + d((S = Y.value[0]) == null ? void 0 : S.message) + " ", 1),
            Y.value.length > 1 ? (a(), s("span", pl, " (+" + d(Y.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", ml, [
            !n.designOnly && n.showHistory ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: i[5] || (i[5] = (x) => I.value = !0)
            }, " Version history ")) : g("", !0),
            !n.designOnly && n.showSaveVersion ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: i[6] || (i[6] = (x) => b("save-version", JSON.parse(JSON.stringify(f(q)))))
            }, " Save as version ")) : g("", !0),
            n.showDuplicate ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: i[7] || (i[7] = (x) => b("duplicate", JSON.parse(JSON.stringify(f(q)))))
            }, " Duplicate ")) : g("", !0),
            n.showSave ? (a(), s("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: J
            }, " Save ")) : g("", !0),
            n.showClose ? (a(), s("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: i[8] || (i[8] = (x) => b("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        y.value ? (a(), s("div", vl, [
          e("div", bl, [
            i[22] || (i[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            i[23] || (i[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", fl, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: i[9] || (i[9] = (x) => {
                  y.value = !1, C.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: i[10] || (i[10] = (x) => C.value && D(C.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0),
        Be(Rt, {
          open: I.value,
          versions: n.versions,
          onClose: i[11] || (i[11] = (x) => I.value = !1),
          onRestore: Z
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Pt = /* @__PURE__ */ Ie(gl, [["__scopeId", "data-v-543f6763"]]), hl = { class: "kb-section" }, yl = { class: "kb-section__head" }, kl = { class: "kb-summary-bar" }, _l = { class: "kb-pill kb-pill--category" }, wl = { class: "kb-pill kb-pill--format" }, $l = { class: "kb-pill kb-pill--status" }, xl = { class: "kb-field" }, Cl = ["value"], Sl = ["value", "disabled"], Il = { class: "kb-field" }, Al = { class: "kb-label" }, Bl = { class: "kb-helper" }, Ul = ["value"], Ll = ["value", "disabled"], Tl = { class: "kb-field" }, Rl = ["value"], Pl = { class: "kb-field kb-field--inline kb-field--language-limits" }, Vl = { class: "kb-field-half" }, El = ["value"], Ol = { class: "kb-field" }, Nl = ["value"], Ml = {
  key: 0,
  class: "kb-field"
}, Dl = { class: "kb-label" }, Wl = ["value"], Hl = {
  key: 1,
  class: "kb-field"
}, zl = ["value"], Fl = {
  key: 2,
  class: "kb-field"
}, ql = ["value"], jl = {
  key: 3,
  class: "kb-field"
}, Kl = ["value"], Yl = {
  key: 4,
  class: "kb-field"
}, Jl = ["value"], Gl = {
  key: 5,
  class: "kb-field"
}, Xl = ["value"], Ql = ["value"], Zl = {
  key: 6,
  class: "kb-field"
}, eo = { class: "kb-wa-buttons" }, to = ["value", "onInput"], ao = ["value", "onInput"], so = ["value", "onInput"], no = ["value", "onInput"], lo = ["onClick"], oo = ["disabled"], io = {
  key: 7,
  class: "kb-field"
}, ro = { class: "kb-wa-buttons" }, uo = ["value", "onInput"], co = ["value", "onInput"], po = ["onClick"], mo = {
  key: 8,
  class: "kb-field"
}, vo = ["value"], bo = ["value"], fo = { class: "kb-field" }, go = { class: "kb-label" }, ho = ["value"], yo = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, ko = { class: "kb-wa-fields-list" }, _o = { class: "kb-wa-field-name" }, wo = { class: "kb-wa-field-status" }, $o = { class: "kb-field" }, xo = ["value"], Co = {
  key: 10,
  class: "kb-field"
}, So = { class: "kb-wa-buttons" }, Io = ["value", "onInput"], Ao = ["value", "onChange"], Bo = ["value", "onInput"], Uo = ["value", "onInput"], Lo = {
  key: 2,
  class: "kb-opt-out-note"
}, To = ["onClick"], Ro = ["disabled"], et = 60, tt = 1024, at = 60, st = 10, gt = 10, Po = /* @__PURE__ */ Ce({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 },
    disabledCategories: { default: () => [] },
    disabledFormats: { default: () => [] }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    const m = n, b = r, w = [
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
    ], _ = [
      { value: "marketing", label: "Marketing" },
      { value: "utility", label: "Utility" },
      { value: "authentication", label: "Authentication" }
    ], y = h(() => m.message), C = h(() => y.value.template_type ?? "text"), I = h(() => y.value.header_type ?? "none"), E = h(() => String(y.value.header ?? "")), N = h(() => String(y.value.body ?? "")), D = h(() => String(y.value.footer ?? "")), H = h(() => y.value.buttons ?? []), Z = h(() => y.value.products ?? []), q = h(() => y.value.cards ?? []), me = h(() => {
      const R = w.find((k) => k.value === C.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), X = h(() => {
      const R = String(y.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), G = h(() => {
      const R = w.find((k) => k.value === C.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), O = h(() => y.value.template_name ? N.value.trim() ? "Ready to validate" : "Draft" : "Needs setup"), re = h(() => new Set((m.disabledCategories ?? []).map((R) => String(R).trim()))), ge = h(() => new Set((m.disabledFormats ?? []).map((R) => String(R).trim())));
    function $e(R) {
      if (!R || typeof R != "string") return [];
      const k = /\{\{\s*([^}]+?)\s*\}\}/g, A = /* @__PURE__ */ new Set();
      let Y;
      for (; (Y = k.exec(R)) !== null; ) A.add(Y[1].trim());
      return Array.from(A);
    }
    const fe = h(() => {
      const R = m.message.header ?? "", k = m.message.body ?? m.message.body ?? "", A = new Set(m.message.variables ?? []), Y = [...$e(R), ...$e(k)];
      return Array.from(new Set(Y)).map((he) => ({ name: he, configured: A.has(he) }));
    });
    function ae(R) {
      b("update", R);
    }
    function j(R) {
      const k = {
        template_category: R || void 0
      };
      R === "authentication" && C.value !== "auth" && (k.template_type = "auth"), ae(k);
    }
    function v(R) {
      const k = { template_type: R };
      R === "auth" && (k.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (k.header_type = R), ae(k);
    }
    function $(R, k) {
      var Y;
      const A = [...H.value];
      A[R] = {
        ...A[R],
        id: ((Y = A[R]) == null ? void 0 : Y.id) || `btn_${R + 1}`,
        ...k
      }, ae({ buttons: A });
    }
    function U(R) {
      const k = [...H.value];
      k.splice(R, 1), ae({ buttons: k });
    }
    function oe() {
      const R = [...H.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), ae({ buttons: R });
    }
    function ee(R, k) {
      var Y;
      const A = [...Z.value];
      A[R] = {
        ...A[R],
        id: ((Y = A[R]) == null ? void 0 : Y.id) || `prod_${R + 1}`,
        ...k
      }, ae({ products: A });
    }
    function T(R) {
      const k = [...Z.value];
      k.splice(R, 1), ae({ products: k });
    }
    function be() {
      const R = [...Z.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), ae({ products: R });
    }
    function ue(R, k) {
      var Y;
      const A = [...q.value];
      A[R] = {
        ...A[R],
        id: ((Y = A[R]) == null ? void 0 : Y.id) || `card_${R + 1}`,
        ...k
      }, ae({ cards: A });
    }
    function _e(R) {
      const k = [...q.value];
      k.splice(R, 1), ae({ cards: k });
    }
    function we() {
      const R = [...q.value];
      R.push({
        id: `card_${R.length + 1}`,
        title: "",
        media_url: "",
        button_label: "",
        button_url: ""
      }), ae({ cards: R });
    }
    return (R, k) => (a(), s("section", hl, [
      e("div", yl, [
        k[16] || (k[16] = e("h3", { class: "kb-section__title" }, "WhatsApp message", -1)),
        n.showReset ? (a(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: k[0] || (k[0] = (A) => R.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      k[42] || (k[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", kl, [
        e("span", _l, d(X.value), 1),
        e("span", wl, d(G.value), 1),
        e("span", $l, d(O.value), 1)
      ]),
      e("div", xl, [
        k[18] || (k[18] = e("label", { class: "kb-label" }, [
          K(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: y.value.template_category ?? "",
          onChange: k[1] || (k[1] = (A) => j(A.target.value))
        }, [
          k[17] || (k[17] = e("option", { value: "" }, "Select category", -1)),
          (a(), s(W, null, F(_, (A) => e("option", {
            key: A.value,
            value: A.value,
            disabled: re.value.has(A.value)
          }, d(A.label) + d(re.value.has(A.value) ? " (Disabled)" : ""), 9, Sl)), 64))
        ], 40, Cl)
      ]),
      e("div", Il, [
        e("label", Al, [
          k[19] || (k[19] = K(" Functional format ", -1)),
          e("span", Bl, d(me.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: C.value,
          onChange: k[2] || (k[2] = (A) => v(A.target.value))
        }, [
          (a(), s(W, null, F(w, (A) => e("option", {
            key: A.value,
            value: A.value,
            disabled: ge.value.has(A.value)
          }, d(A.label) + d(ge.value.has(A.value) ? " (Disabled)" : ""), 9, Ll)), 64))
        ], 40, Ul)
      ]),
      e("div", Tl, [
        k[20] || (k[20] = e("label", { class: "kb-label" }, [
          K(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: y.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, Rl)
      ]),
      e("div", Pl, [
        e("div", Vl, [
          k[21] || (k[21] = e("label", { class: "kb-label" }, [
            K(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: y.value.template_language ?? "",
            onInput: k[3] || (k[3] = (A) => ae({
              template_language: A.target.value || void 0
            }))
          }, null, 40, El)
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
      e("div", Ol, [
        k[24] || (k[24] = e("label", { class: "kb-label" }, [
          K(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: I.value,
          onChange: k[4] || (k[4] = (A) => ae({ header_type: A.target.value }))
        }, [...k[23] || (k[23] = [
          He('<option value="none" data-v-5d59e12f>No header</option><option value="text" data-v-5d59e12f>Text header</option><option value="image" data-v-5d59e12f>Image header</option><option value="video" data-v-5d59e12f>Video header</option><option value="document" data-v-5d59e12f>Document header</option>', 5)
        ])], 40, Nl)
      ]),
      I.value === "text" ? (a(), s("div", Ml, [
        e("label", Dl, [
          k[25] || (k[25] = K(" Header text ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": E.value.length > et }])
          }, d(E.value.length) + "/" + d(et), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: E.value,
          onInput: k[5] || (k[5] = (A) => ae({
            header: A.target.value || void 0
          }))
        }, null, 40, Wl)
      ])) : g("", !0),
      ["image", "video", "document"].includes(I.value) || ["image", "video", "document"].includes(C.value) ? (a(), s("div", Hl, [
        k[26] || (k[26] = e("label", { class: "kb-label" }, [
          K(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: y.value.media_url ?? "",
          onInput: k[6] || (k[6] = (A) => ae({
            media_url: A.target.value || void 0
          }))
        }, null, 40, zl)
      ])) : g("", !0),
      I.value === "document" || C.value === "document" ? (a(), s("div", Fl, [
        k[27] || (k[27] = e("label", { class: "kb-label" }, [
          K(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: y.value.document_filename ?? "",
          onInput: k[7] || (k[7] = (A) => ae({
            document_filename: A.target.value || void 0
          }))
        }, null, 40, ql)
      ])) : g("", !0),
      ["image", "video", "document"].includes(I.value) || ["image", "video", "document"].includes(C.value) ? (a(), s("div", jl, [
        k[28] || (k[28] = e("label", { class: "kb-label" }, [
          K(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: y.value.media_caption ?? "",
          onInput: k[8] || (k[8] = (A) => ae({
            media_caption: A.target.value || void 0
          }))
        }, null, 40, Kl)
      ])) : g("", !0),
      C.value === "lto" ? (a(), s("div", Yl, [
        k[29] || (k[29] = e("label", { class: "kb-label" }, [
          K(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: y.value.lto_expiry ?? "",
          onInput: k[9] || (k[9] = (A) => ae({
            lto_expiry: A.target.value || void 0
          }))
        }, null, 40, Jl)
      ])) : g("", !0),
      C.value === "flow" ? (a(), s("div", Gl, [
        k[30] || (k[30] = e("label", { class: "kb-label" }, [
          K(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: y.value.flow_id ?? "",
          onInput: k[10] || (k[10] = (A) => ae({
            flow_id: A.target.value || void 0
          }))
        }, null, 40, Xl),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: y.value.flow_cta_label ?? "",
          onInput: k[11] || (k[11] = (A) => ae({
            flow_cta_label: A.target.value || void 0
          }))
        }, null, 40, Ql)
      ])) : g("", !0),
      C.value === "carousel" ? (a(), s("div", Zl, [
        e("label", { class: "kb-label" }, [
          k[31] || (k[31] = K(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + d(gt) + " cards.")
        ]),
        e("div", eo, [
          (a(!0), s(W, null, F(q.value, (A, Y) => (a(), s("div", {
            key: A.id || Y,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: A.title ?? "",
              onInput: (le) => ue(Number(Y), { title: le.target.value })
            }, null, 40, to),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: A.media_url ?? "",
              onInput: (le) => ue(Number(Y), { media_url: le.target.value })
            }, null, 40, ao),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: A.button_label ?? "",
              onInput: (le) => ue(Number(Y), { button_label: le.target.value })
            }, null, 40, so),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: A.button_url ?? "",
              onInput: (le) => ue(Number(Y), { button_url: le.target.value })
            }, null, 40, no),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (le) => _e(Number(Y))
            }, "Remove", 8, lo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: q.value.length >= gt,
            onClick: we
          }, " Add card ", 8, oo)
        ])
      ])) : g("", !0),
      ["mpm", "catalog"].includes(C.value) ? (a(), s("div", io, [
        k[32] || (k[32] = e("label", { class: "kb-label" }, [
          K(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", ro, [
          (a(!0), s(W, null, F(Z.value, (A, Y) => (a(), s("div", {
            key: A.id || Y,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: A.productId,
              onInput: (le) => ee(Number(Y), { productId: le.target.value })
            }, null, 40, uo),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: A.sectionTitle,
              onInput: (le) => ee(Number(Y), { sectionTitle: le.target.value || void 0 })
            }, null, 40, co),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (le) => T(Number(Y))
            }, " Remove ", 8, po)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            onClick: be
          }, " Add product ")
        ])
      ])) : g("", !0),
      C.value === "auth" ? (a(), s("div", mo, [
        k[34] || (k[34] = e("label", { class: "kb-label" }, [
          K(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: y.value.auth_type ?? "otp",
          onChange: k[12] || (k[12] = (A) => ae({
            auth_type: A.target.value
          }))
        }, [...k[33] || (k[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, vo),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: y.value.auth_label ?? "",
          onInput: k[13] || (k[13] = (A) => ae({
            auth_label: A.target.value || void 0
          }))
        }, null, 40, bo)
      ])) : g("", !0),
      e("div", fo, [
        e("label", go, [
          k[35] || (k[35] = K(" Body ", -1)),
          k[36] || (k[36] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": N.value.length > tt }])
          }, d(N.value.length) + "/" + d(tt), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
          value: N.value,
          onInput: k[14] || (k[14] = (A) => ae({
            body: A.target.value || void 0
          }))
        }, null, 40, ho)
      ]),
      fe.value.length > 0 ? (a(), s("div", yo, [
        k[37] || (k[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        k[38] || (k[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", ko, [
          (a(!0), s(W, null, F(fe.value, (A) => (a(), s("li", {
            key: A.name,
            class: de(["kb-wa-field-item", { "kb-wa-field-item--ok": A.configured }])
          }, [
            e("span", _o, d(A.name), 1),
            e("span", wo, d(A.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : g("", !0),
      e("div", $o, [
        k[39] || (k[39] = e("label", { class: "kb-label" }, [
          K(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: D.value,
          onInput: k[15] || (k[15] = (A) => ae({
            footer: A.target.value || void 0
          }))
        }, null, 40, xo),
        e("div", {
          class: de(["kb-counter kb-counter--inline", { "kb-counter--warn": D.value.length > at }])
        }, d(D.value.length) + "/" + d(at), 3)
      ]),
      N.value.trim().length > 0 ? (a(), s("div", Co, [
        e("label", { class: "kb-label" }, [
          k[40] || (k[40] = K(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + d(st) + " buttons. ")
        ]),
        e("div", So, [
          (a(!0), s(W, null, F(H.value, (A, Y) => (a(), s("div", {
            key: A.id || Y,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: A.label,
              onInput: (le) => $(Number(Y), { label: le.target.value })
            }, null, 40, Io),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: A.type ?? "quick_reply",
              onChange: (le) => $(Number(Y), { type: le.target.value })
            }, [...k[41] || (k[41] = [
              e("option", { value: "quick_reply" }, "Quick reply", -1),
              e("option", { value: "url" }, "Visit URL", -1),
              e("option", { value: "call" }, "Call phone", -1),
              e("option", { value: "opt_out" }, "Marketing opt-out", -1)
            ])], 40, Ao),
            A.type === "url" ? (a(), s("input", {
              key: 0,
              type: "url",
              class: "kb-input kb-input--btn-target",
              placeholder: "https://...",
              value: A.url,
              onInput: (le) => $(Number(Y), { url: le.target.value || void 0 })
            }, null, 40, Bo)) : A.type === "call" ? (a(), s("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: A.phone,
              onInput: (le) => $(Number(Y), { phone: le.target.value || void 0 })
            }, null, 40, Uo)) : A.type === "opt_out" ? (a(), s("span", Lo, " Sends a built-in opt-out action. ")) : g("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (le) => U(Number(Y))
            }, " Remove ", 8, To)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: H.value.length >= st,
            onClick: oe
          }, " Add button ", 8, Ro)
        ])
      ])) : g("", !0)
    ]));
  }
}), Vo = /* @__PURE__ */ Ie(Po, [["__scopeId", "data-v-5d59e12f"]]), Eo = { class: "wa-preview-root" }, Oo = { class: "wa-device" }, No = { class: "wa-screen" }, Mo = { class: "wa-header" }, Do = { class: "wa-titleblock" }, Wo = { class: "wa-title-row" }, Ho = { class: "wa-title" }, zo = { class: "wa-subtitle" }, Fo = {
  key: 0,
  class: "wa-flow-shell"
}, qo = { class: "wa-flow-header" }, jo = { class: "wa-flow-title" }, Ko = { class: "wa-flow-content" }, Yo = { class: "wa-flow-eyebrow" }, Jo = {
  key: 0,
  class: "wa-flow-products"
}, Go = { class: "wa-flow-footer" }, Xo = {
  key: 0,
  type: "button",
  class: "wa-flow-cta"
}, Qo = { class: "wa-managed" }, Zo = {
  key: 1,
  class: "wa-thread"
}, ei = { class: "wa-secure-banner" }, ti = { class: "wa-msg wa-msg--in" }, ai = { class: "wa-template-card" }, si = {
  key: 0,
  class: "wa-card-media"
}, ni = ["src"], li = {
  key: 1,
  class: "wa-card-media-real wa-card-media-real--video"
}, oi = ["src"], ii = { class: "wa-card-media-doc-icon" }, ri = ["title"], di = {
  key: 3,
  class: "wa-card-media-fallback"
}, ui = { class: "wa-card-media-tag" }, ci = { class: "wa-card-media-sub" }, pi = {
  key: 1,
  class: "wa-card-header-text"
}, mi = ["innerHTML"], vi = {
  key: 2,
  class: "wa-link-preview"
}, bi = { class: "wa-link-preview-head" }, fi = { class: "wa-link-preview-text" }, gi = ["href"], hi = {
  key: 3,
  class: "wa-inline-note"
}, yi = {
  key: 4,
  class: "wa-inline-note"
}, ki = {
  key: 5,
  class: "wa-inline-note"
}, _i = {
  key: 6,
  class: "wa-inline-note wa-inline-note--warn"
}, wi = {
  key: 7,
  class: "wa-inline-note wa-inline-note--muted"
}, $i = {
  key: 8,
  class: "wa-product-list"
}, xi = { class: "wa-product-name" }, Ci = { class: "wa-product-price" }, Si = {
  key: 9,
  type: "button",
  class: "wa-template-cta"
}, Ii = {
  key: 10,
  class: "wa-template-actions"
}, Ai = {
  key: 0,
  class: "wa-msg wa-msg--out"
}, Bi = { class: "wa-order-card" }, Ui = { class: "wa-order-card-top" }, Li = ["src"], Ti = { type: "button" }, Ri = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Pi = { class: "wa-document-card" }, Vi = { class: "wa-document-file" }, Ei = { class: "wa-document-icon" }, Oi = ["title"], Ni = { class: "wa-document-caption" }, Mi = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Di = { class: "wa-voice-card" }, Wi = { class: "wa-voice-top" }, Hi = { class: "wa-voice-profile" }, zi = ["src"], Fi = { class: "wa-voice-duration" }, qi = { class: "wa-voice-transcript" }, ji = {
  key: 3,
  class: "wa-msg wa-msg--in"
}, Ki = { class: "wa-contact-card" }, Yi = {
  key: 4,
  class: "wa-msg wa-msg--in"
}, Ji = { class: "wa-location-card" }, Gi = { class: "wa-location-content" }, Xi = { type: "button" }, Qi = {
  key: 5,
  class: "wa-msg wa-msg--in"
}, Zi = { class: "wa-carousel-track" }, er = { type: "button" }, tr = { class: "wa-msg wa-msg--out" }, ar = { class: "wa-bubble wa-bubble--out" }, sr = { class: "wa-bubble-author" }, nr = {
  key: 0,
  class: "wa-reaction"
}, lr = { class: "wa-msg wa-msg--in" }, or = { class: "wa-bubble wa-bubble--in" }, ir = /* @__PURE__ */ Ce({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(n) {
    const r = n;
    function m(v) {
      return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const b = h(() => {
      var U;
      const v = ((U = r.template) == null ? void 0 : U.body) ?? "";
      return m(v).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), w = h(() => r.template.templateName || "Ecoshop"), _ = h(() => "Business Account"), y = h(() => r.template.format === "flow" || !!r.template.flow), C = h(() => {
      var v;
      return (v = r.template.buttons) == null ? void 0 : v[0];
    }), I = h(() => {
      var v, $;
      return ((v = C.value) == null ? void 0 : v.text) || (($ = r.template.flow) == null ? void 0 : $.ctaLabel) || "";
    }), E = h(() => r.template.buttons ?? []), N = h(() => {
      var v;
      return (((v = r.template.multiProduct) == null ? void 0 : v.length) ?? 0) > 0;
    }), D = h(() => (r.template.format || "text").toUpperCase()), H = h(() => {
      const v = r.template.header;
      return !v || v.type === "text" ? "" : v.type === "image" ? v.url || "Image" : v.type === "video" ? v.url || "Video" : v.filename || v.url || "Document";
    }), Z = h(() => {
      const v = r.template.header;
      if (!(!v || v.type !== "image" || !v.url))
        return { backgroundImage: `url(${v.url})` };
    });
    function q(v) {
      if (!v) return "";
      try {
        const $ = v.split("?")[0].split("#")[0], U = $.substring($.lastIndexOf("/") + 1);
        return decodeURIComponent(U || "");
      } catch {
        return "";
      }
    }
    const me = h(() => {
      const v = r.template.header;
      return !v || v.type !== "document" ? "" : v.filename || q(v.url) || "document.pdf";
    }), X = h(() => {
      const v = (r.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (v == null ? void 0 : v[0]) || "";
    });
    function G(v) {
      try {
        return new URL(v).hostname;
      } catch {
        return "example.com";
      }
    }
    const O = h(() => {
      const v = r.template.linkPreview;
      return !v && !X.value ? null : {
        title: (v == null ? void 0 : v.title) || "Link preview",
        description: (v == null ? void 0 : v.description) || "Preview from your WhatsApp template link.",
        domain: (v == null ? void 0 : v.domain) || (X.value ? G(X.value) : "example.com"),
        url: (v == null ? void 0 : v.url) || X.value || "#",
        thumbnail: (v == null ? void 0 : v.thumbnail) || ""
      };
    }), re = h(() => {
      var U, oe, ee;
      const $ = (ee = (((U = r.template.documentCard) == null ? void 0 : U.filename) || ((oe = r.template.header) == null ? void 0 : oe.filename) || "").split(".").pop()) == null ? void 0 : ee.trim().toUpperCase();
      return $ ? $.slice(0, 4) : "DOC";
    });
    function ge(v, $) {
      return v === "phone_number" ? "wa-btn-icon--phone" : v === "url" ? "wa-btn-icon--external" : v === "copy_code" ? "wa-btn-icon--code" : v === "opt_out" || ($ || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : ($ || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const $e = h(() => {
      var v;
      return r.template.location || r.template.locationRequest ? "wa-side-icon--info" : ((v = r.template.header) == null ? void 0 : v.type) === "video" || r.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), fe = h(() => {
      var $, U, oe;
      const v = r.template;
      return v.format === "flow" ? "Thanks, we received your preferences." : ($ = v.auth) != null && $.code ? "Use the verification code and let us know if it works." : (U = v.coupon) != null && U.code ? `Your coupon ${v.coupon.code} is active now.` : v.limitedOffer ? `Great choice. This offer is valid until ${v.limitedOffer}.` : (oe = r.template.multiProduct) != null && oe.length ? `Here are ${r.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), ae = h(() => {
      var $, U;
      const v = r.template;
      return v.location ? v.location.name || v.location.address || `${v.location.lat}, ${v.location.lng}` : ($ = v.auth) != null && $.code ? `Verification code: ${v.auth.code}` : (U = v.flow) != null && U.id ? `Flow ID: ${v.flow.id}` : v.templateLanguage ? `Template language: ${v.templateLanguage}` : `Category: ${v.templateCategory || "utility"} • Format: ${v.format || "text"}`;
    }), j = h(() => {
      var U, oe;
      const v = r.template;
      if ((U = v.multiProduct) != null && U.length) return v.multiProduct.slice(0, 5).map((ee) => ee.name || "Product");
      if ((oe = v.buttons) != null && oe.length) return v.buttons.slice(0, 5).map((ee) => ee.text || "Option");
      const $ = (v.body || "").split(/\n|\.|,/).map((ee) => ee.trim()).filter(Boolean).slice(0, 5);
      return $.length ? $ : ["Option A", "Option B", "Option C"];
    });
    return (v, $) => {
      var U, oe, ee, T, be, ue, _e, we, R, k, A, Y, le, he;
      return a(), s("div", Eo, [
        e("div", Oo, [
          e("div", No, [
            $[30] || ($[30] = He('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Mo, [
              $[7] || ($[7] = e("span", { class: "wa-back" }, "←", -1)),
              $[8] || ($[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Do, [
                e("div", Wo, [
                  e("span", Ho, d(w.value), 1),
                  $[6] || ($[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", zo, d(_.value), 1)
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
            y.value ? (a(), s("div", Fo, [
              $[14] || ($[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", qo, [
                $[10] || ($[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", jo, d(w.value), 1),
                $[11] || ($[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", Ko, [
                e("p", Yo, d(n.template.body || "Please choose an option below."), 1),
                (a(!0), s(W, null, F(j.value, (ie, se) => (a(), s("div", {
                  key: `flow-opt-${se}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, d(ie), 1),
                  e("span", {
                    class: de(["wa-radio", { "wa-radio--on": se === 0 }])
                  }, null, 2)
                ]))), 128)),
                (U = n.template.multiProduct) != null && U.length ? (a(), s("div", Jo, [
                  (a(!0), s(W, null, F(n.template.multiProduct.slice(0, 3), (ie, se) => (a(), s("div", {
                    key: se,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, d(ie.name || "Product"), 1),
                      e("p", null, d(ie.price || "Price on request"), 1)
                    ]),
                    $[12] || ($[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : g("", !0)
              ]),
              e("div", Go, [
                I.value ? (a(), s("button", Xo, d(I.value), 1)) : g("", !0),
                e("p", Qo, [
                  $[13] || ($[13] = K("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: $[0] || ($[0] = Fe(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), s("div", Zo, [
              $[29] || ($[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", ei, [
                $[15] || ($[15] = e("span", null, "●", -1)),
                $[16] || ($[16] = K(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: $[1] || ($[1] = Fe(() => {
                  }, ["prevent"]))
                }, "Learn more")
              ]),
              e("div", ti, [
                e("div", ai, [
                  n.template.header && n.template.header.type !== "text" ? (a(), s("div", si, [
                    n.template.header.type === "image" && n.template.header.url ? (a(), s("img", {
                      key: 0,
                      class: "wa-card-media-real",
                      src: n.template.header.url,
                      alt: "Header media"
                    }, null, 8, ni)) : n.template.header.type === "video" && n.template.header.url ? (a(), s("div", li, [
                      e("video", {
                        src: n.template.header.url,
                        preload: "metadata",
                        muted: "",
                        playsinline: ""
                      }, null, 8, oi),
                      $[17] || ($[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : n.template.header.type === "document" ? (a(), s("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: $[2] || ($[2] = Fe(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", ii, d(re.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: me.value
                      }, d(me.value), 9, ri)
                    ])) : (a(), s("div", di, [
                      e("div", ui, d(D.value) + " TEMPLATE", 1),
                      e("div", ci, d(H.value), 1),
                      Z.value ? (a(), s("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: ve(Z.value)
                      }, null, 4)) : g("", !0)
                    ]))
                  ])) : (oe = n.template.header) != null && oe.text ? (a(), s("div", pi, d(n.template.header.text), 1)) : g("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: b.value
                  }, null, 8, mi),
                  O.value ? (a(), s("div", vi, [
                    e("div", bi, [
                      O.value.thumbnail ? (a(), s("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: ve({ backgroundImage: `url(${O.value.thumbnail})` })
                      }, null, 4)) : g("", !0),
                      e("div", fi, [
                        e("strong", null, d(O.value.title), 1),
                        e("p", null, d(O.value.description), 1),
                        e("span", null, d(O.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: O.value.url,
                      onClick: $[3] || ($[3] = Fe(() => {
                      }, ["prevent"]))
                    }, d(O.value.url), 9, gi)
                  ])) : g("", !0),
                  n.template.location ? (a(), s("div", hi, " 📍 " + d(n.template.location.name || n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)) : g("", !0),
                  (ee = n.template.coupon) != null && ee.code ? (a(), s("div", yi, [
                    $[18] || ($[18] = K(" Coupon: ", -1)),
                    e("strong", null, d(n.template.coupon.code), 1)
                  ])) : g("", !0),
                  (T = n.template.auth) != null && T.code ? (a(), s("div", ki, [
                    $[19] || ($[19] = K(" Verification code: ", -1)),
                    e("strong", null, d(n.template.auth.code), 1)
                  ])) : g("", !0),
                  n.template.limitedOffer ? (a(), s("div", _i, " Expires: " + d(n.template.limitedOffer), 1)) : g("", !0),
                  n.template.footer ? (a(), s("div", wi, d(n.template.footer), 1)) : g("", !0),
                  N.value ? (a(), s("div", $i, [
                    (a(!0), s(W, null, F((be = n.template.multiProduct) == null ? void 0 : be.slice(0, 4), (ie, se) => (a(), s("div", {
                      key: `prod-${se}`,
                      class: "wa-product-row"
                    }, [
                      e("span", xi, d(ie.name || `Item ${se + 1}`), 1),
                      e("span", Ci, d(ie.price || "-"), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  I.value ? (a(), s("button", Si, [
                    C.value ? (a(), s("span", {
                      key: 0,
                      class: de(["wa-btn-icon", ge(C.value.type, C.value.value || C.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : g("", !0),
                    K(" " + d(I.value), 1)
                  ])) : g("", !0),
                  E.value.length > 1 ? (a(), s("div", Ii, [
                    (a(!0), s(W, null, F(E.value.slice(1, 4), (ie, se) => (a(), s("button", {
                      key: `action-${se}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: de(["wa-btn-icon", ge(ie.type, ie.value || ie.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      K(" " + d(ie.text), 1)
                    ]))), 128))
                  ])) : g("", !0),
                  $[20] || ($[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: de(["wa-side-icon", $e.value]),
                  "aria-hidden": "true"
                }, null, 2)
              ]),
              n.template.orderCard ? (a(), s("div", Ai, [
                e("div", Bi, [
                  e("div", Ui, [
                    n.template.orderCard.image ? (a(), s("img", {
                      key: 0,
                      src: n.template.orderCard.image,
                      alt: "Order image"
                    }, null, 8, Li)) : g("", !0),
                    e("div", null, [
                      e("strong", null, d(n.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, d(n.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Ti, d(n.template.orderCard.buttonLabel || "View"), 1),
                  $[21] || ($[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : g("", !0),
              n.template.documentCard || ((ue = n.template.header) == null ? void 0 : ue.type) === "document" ? (a(), s("div", Ri, [
                e("div", Pi, [
                  e("div", Vi, [
                    e("span", Ei, d(re.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((_e = n.template.documentCard) == null ? void 0 : _e.filename) || ((we = n.template.header) == null ? void 0 : we.filename) || "document.pdf"
                      }, d(((R = n.template.documentCard) == null ? void 0 : R.filename) || ((k = n.template.header) == null ? void 0 : k.filename) || "document.pdf"), 9, Oi),
                      e("p", null, d(((A = n.template.documentCard) == null ? void 0 : A.size) || "243 KB • html"), 1)
                    ]),
                    $[22] || ($[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ni, d(((Y = n.template.documentCard) == null ? void 0 : Y.caption) || n.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : g("", !0),
              n.template.voiceNote ? (a(), s("div", Mi, [
                e("div", Di, [
                  e("div", Wi, [
                    $[24] || ($[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    $[25] || ($[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Hi, [
                      n.template.voiceNote.profileImage ? (a(), s("img", {
                        key: 0,
                        src: n.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, zi)) : g("", !0),
                      $[23] || ($[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", Fi, d(n.template.voiceNote.duration || "0:10"), 1),
                  e("p", qi, d(n.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : g("", !0),
              n.template.contactCard ? (a(), s("div", ji, [
                e("div", Ki, [
                  e("strong", null, d(n.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, d(n.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, d(n.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, d(n.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, d(n.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : g("", !0),
              n.template.location && n.template.locationRequest ? (a(), s("div", Yi, [
                e("div", Ji, [
                  $[26] || ($[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Gi, [
                    e("strong", null, d(n.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: $[4] || ($[4] = Fe(() => {
                      }, ["prevent"]))
                    }, d(n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)
                  ]),
                  e("button", Xi, d(n.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : g("", !0),
              (le = n.template.carouselCards) != null && le.length ? (a(), s("div", Qi, [
                e("div", Zi, [
                  (a(!0), s(W, null, F(n.template.carouselCards.slice(0, 4), (ie, se) => (a(), s("article", {
                    key: `c-${se}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: ve(ie.image ? { backgroundImage: `url(${ie.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, d(ie.title || `Card ${se + 1}`), 1),
                    e("p", null, d(ie.description || "Card description"), 1),
                    e("button", er, d(ie.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : g("", !0),
              e("div", tr, [
                e("div", ar, [
                  e("span", sr, d(w.value), 1),
                  e("p", null, d(fe.value), 1),
                  $[27] || ($[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  n.template.reactionEmoji ? (a(), s("span", nr, d(n.template.reactionEmoji), 1)) : g("", !0)
                ])
              ]),
              e("div", lr, [
                e("div", or, [
                  e("p", null, d(ae.value), 1),
                  (he = n.template.flow) != null && he.id ? (a(), s("a", {
                    key: 0,
                    href: "#",
                    onClick: $[5] || ($[5] = Fe(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + d(n.template.flow.id), 1)) : g("", !0),
                  $[28] || ($[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            $[31] || ($[31] = He('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), rr = /* @__PURE__ */ Ie(ir, [["__scopeId", "data-v-244c945a"]]), dr = { class: "keos-whatsapp-builder" }, ur = { class: "kb-builder-top" }, cr = { class: "kb-wa-layout" }, pr = { class: "kb-wa-sidebar" }, mr = {
  key: 0,
  class: "kb-wa-form"
}, vr = { class: "kb-wa-form-head" }, br = { class: "kb-wa-form-head-top" }, fr = { class: "kb-wa-health-pill" }, gr = { class: "kb-wa-form-head-row" }, hr = ["value"], yr = { class: "kb-wa-health" }, kr = { class: "kb-wa-health-row" }, _r = { class: "kb-wa-health-value" }, wr = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, $r = { class: "kb-wa-canvas" }, xr = {
  key: 0,
  class: "kb-wa-test-banner"
}, Cr = { class: "kb-wa-preview-chrome" }, Sr = { class: "kb-push-preview-controls" }, Ir = { class: "kb-push-preview-as" }, Ar = ["value"], Br = { class: "kb-preview-status" }, Ur = { class: "kb-wa-actions" }, Lr = {
  key: 0,
  class: "kb-actions-note"
}, Tr = { key: 0 }, Rr = { class: "kb-wa-actions-right" }, Pr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Vr = { class: "kb-confirm-dialog" }, Er = { class: "kb-confirm-actions" }, ht = 60, yt = 1024, kt = 60, _t = 10, wt = 10, Or = /* @__PURE__ */ Ce({
  __name: "KeosWhatsAppBuilder",
  props: {
    modelValue: {},
    hooks: {},
    disabledSections: { default: () => [] },
    variableOptions: { default: () => [] },
    disabledTemplateCategories: { default: () => [] },
    disabledTemplateFormats: { default: () => [] },
    showSave: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    showDuplicate: { type: Boolean, default: !0 },
    actionsNote: { default: "" },
    designOnly: { type: Boolean, default: !0 },
    enforceSlugName: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "save", "edit", "send-test", "schedule", "send", "duplicate"],
  setup(n, { emit: r }) {
    function m(p) {
      var c, i, S, x, z;
      const L = [], Q = p.message, te = (Q.template_category ?? "").toString().trim(), ce = (Q.template_type ?? "text").toString(), ye = (Q.header_type ?? "none").toString(), Se = (Q.header ?? "").toString(), Le = (Q.body ?? "").toString(), Te = (Q.footer ?? "").toString(), Ae = Array.isArray(Q.buttons) ? Q.buttons : [], J = Array.isArray(Q.cards) ? Q.cards : [];
      return (c = p.name) != null && c.trim() || L.push("Template name is required"), (i = Q.template_name) != null && i.trim() || L.push("WhatsApp template name is required"), te || L.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), Le.trim() || L.push("Body is required"), ye === "text" && Se.length > ht && L.push(`Header text cannot exceed ${ht} characters`), Le.length > yt && L.push(`Body cannot exceed ${yt} characters`), Te.length > kt && L.push(`Footer cannot exceed ${kt} characters`), Ae.length > _t && L.push(`Buttons cannot exceed ${_t}`), (ce === "image" || ce === "video" || ce === "document" || ye === "image" || ye === "video" || ye === "document") && !Q.media_url && L.push("Media URL is required for rich media templates"), te === "authentication" && ce !== "auth" && L.push("Authentication category must use Authentication format"), ce === "auth" && !((S = Q.auth_label) != null && S.trim()) && !Le.includes("{{") && L.push("Authentication templates should include a code label or placeholder variable"), ce === "lto" && !Q.lto_expiry && L.push("Limited-time offer requires an expiry"), (ce === "mpm" || ce === "catalog") && !((x = Q.products) != null && x.length) && L.push("Catalog and multi-product templates require at least one product"), ce === "flow" && !((z = Q.flow_id) != null && z.trim()) && L.push("WhatsApp Flow format requires a flow ID"), ce === "carousel" && (J.length ? J.length > wt && L.push(`Carousel supports up to ${wt} cards`) : L.push("Carousel format requires at least one card")), L;
    }
    function b(p, L, Q) {
      const te = p.message, ce = String(te.template_category ?? "").trim(), ye = String(te.template_type ?? "text").trim(), Se = [];
      return ce && L.includes(ce) && Se.push(`WhatsApp category "${ce}" is disabled in this builder configuration`), ye && Q.includes(ye) && Se.push(`WhatsApp format "${ye}" is disabled in this builder configuration`), Se;
    }
    const w = n, _ = r, {
      campaign: y,
      dirty: C,
      customValidatorErrors: I,
      getValidationWithWarnings: E,
      update: N,
      updateMessage: D,
      undo: H,
      redo: Z,
      canUndo: q,
      canRedo: me,
      resetMessage: X,
      hooks: G
    } = Ge({
      initial: w.modelValue,
      hooks: {
        ...w.hooks,
        customValidators: async (p) => {
          var te;
          const L = [
            ...m(p),
            ...b(
              p,
              w.disabledTemplateCategories,
              w.disabledTemplateFormats
            )
          ], Q = (te = w.hooks) != null && te.customValidators ? await w.hooks.customValidators(p) : [];
          return [...L, ...Q];
        }
      },
      onDirty: () => _("change", y.value)
    }), { lastSavedAt: O } = Xe(y, { channel: "whatsapp" });
    function re(p) {
      (p.metaKey || p.ctrlKey) && p.key === "z" && (p.preventDefault(), p.shiftKey ? Z() : H());
    }
    je(() => {
      window.addEventListener("keydown", re);
    }), Ke(() => {
      window.removeEventListener("keydown", re);
    }), Ue(y, (p) => _("update:modelValue", p), { deep: !0 });
    const ge = ne(), $e = ne(!0);
    async function fe() {
      if (G.estimateReach)
        try {
          ge.value = await G.estimateReach(y.value.audience);
        } catch {
          ge.value = void 0;
        }
      G.canSend && ($e.value = await Promise.resolve(G.canSend()));
    }
    fe(), Ue(() => y.value.audience, fe, { deep: !0 });
    const ae = h(() => (I.value, E(ge.value))), j = h(() => ae.value.blockingErrors), v = h(() => ae.value.warnings), $ = h(() => ae.value.valid), U = h(() => {
      var te, ce, ye;
      const p = y.value.message, L = [
        !!((te = p.template_name) != null && te.trim()),
        !!((ce = p.template_category) != null && ce.trim()),
        !!(p.body ?? "").toString().trim(),
        !!((ye = p.template_language) != null && ye.trim()),
        Array.isArray(p.buttons) ? p.buttons.length > 0 : !1
      ], Q = L.filter(Boolean).length;
      return Math.round(Q / L.length * 100);
    }), oe = h(() => U.value >= 90 ? "Production ready" : U.value >= 70 ? "Strong draft" : U.value >= 40 ? "In progress" : "Needs setup"), ee = h(() => {
      const p = y.value.message;
      return !!((p.body ?? "").toString().trim() || (p.header ?? "").toString().trim() || p.media_url || p.flow_id || p.coupon_code || p.lto_expiry || p.voice_transcript || p.contact_name || p.link_title || p.order_title || Array.isArray(p.buttons) && p.buttons.length || Array.isArray(p.products) && p.products.length || Array.isArray(p.cards) && p.cards.length);
    }), T = ne(""), be = ne(!1), ue = ne(null), _e = h(() => {
      const p = T.value;
      return p ? De.find((L) => L.id === p) ?? null : null;
    }), we = h(() => {
      const p = y.value.message.body ?? "";
      return _e.value ? Oe(p, _e.value.data) : p;
    }), R = h(() => {
      const p = y.value.message.header ?? "";
      return _e.value ? Oe(p, _e.value.data) : p;
    }), k = h(() => {
      var i;
      const p = y.value.message, L = p.template_type ?? "text", Q = p.header_type ?? "none";
      let te, ce, ye, Se, Le, Te, Ae;
      (L === "image" || Q === "image") && p.media_url ? te = { type: "image", url: p.media_url } : (L === "video" || Q === "video") && p.media_url ? te = { type: "video", url: p.media_url } : L === "document" || Q === "document" ? te = {
        type: "document",
        url: p.media_url || void 0,
        filename: p.document_filename || p.media_url || "document.pdf"
      } : Q === "text" && p.header ? te = { type: "text", text: R.value } : p.header && (te = { type: "text", text: R.value });
      const J = we.value || "Start adding content to see a live preview here.";
      if (L === "location" && p.location) {
        const S = p.location, x = S.lat ?? S.latitude, z = S.lng ?? S.lon ?? S.longitude;
        x != null && z != null && (ce = {
          lat: x,
          lng: z,
          name: S.name ?? S.title,
          address: S.address ?? `${x}, ${z}`
        });
      }
      (L === "catalog" || L === "mpm") && Array.isArray(p.products) && p.products.length && (ye = !0, Se = p.products.map((S) => ({
        image: S.image ?? S.imageUrl,
        name: S.name ?? S.sectionTitle ?? S.title ?? "Product",
        price: S.price ?? S.productId ?? ""
      }))), L === "carousel" && Array.isArray(p.cards) && p.cards.length && (ye = !0, Se = p.cards.map((S) => ({
        image: S.image ?? S.media_url,
        name: S.title ?? "Card",
        price: S.button_label ?? ""
      }))), L === "coupon" && p.coupon_code && (Le = { code: p.coupon_code }), L === "lto" && p.lto_expiry && (Te = p.lto_expiry), L === "auth" && (Ae = { code: p.auth_code ?? p.otp_code ?? "123 456" });
      const c = p.buttons ?? [];
      return L === "flow" && ((i = p.flow_cta_label) != null && i.trim()) && c.push({
        label: p.flow_cta_label
      }), {
        format: L,
        templateName: p.template_name || void 0,
        templateLanguage: p.template_language || void 0,
        templateCategory: p.template_category || void 0,
        header: te,
        body: J,
        mediaCaption: p.media_caption || void 0,
        footer: p.footer || void 0,
        buttons: c.map((S) => ({ text: S.label || "Button", type: S.type, value: S.value })),
        location: ce,
        catalog: ye,
        multiProduct: Se,
        coupon: Le,
        limitedOffer: Te,
        auth: Ae,
        linkPreview: p.link_title || p.link_description || p.link_url ? {
          title: p.link_title || void 0,
          description: p.link_description || void 0,
          domain: p.link_domain || void 0,
          url: p.link_url || void 0,
          thumbnail: p.link_thumbnail_url || void 0
        } : void 0,
        voiceNote: p.voice_transcript || p.voice_duration || p.voice_profile_image ? {
          transcript: p.voice_transcript || void 0,
          duration: p.voice_duration || void 0,
          profileImage: p.voice_profile_image || void 0
        } : void 0,
        contactCard: p.contact_name || p.contact_phone || p.contact_email ? {
          name: p.contact_name || void 0,
          title: p.contact_title || void 0,
          phone: p.contact_phone || void 0,
          email: p.contact_email || void 0,
          address: p.contact_address || void 0
        } : void 0,
        documentCard: p.document_filename || L === "document" || Q === "document" ? {
          filename: p.document_filename || p.media_url || "document.pdf",
          size: p.document_size || void 0,
          caption: p.media_caption || void 0
        } : void 0,
        locationRequest: p.location_request_label ? { label: p.location_request_label } : void 0,
        orderCard: p.order_title || p.order_items || p.order_image ? {
          title: p.order_title || void 0,
          items: p.order_items || void 0,
          image: p.order_image || void 0,
          buttonLabel: p.order_button_label || void 0
        } : void 0,
        carouselCards: L === "carousel" && Array.isArray(p.cards) ? p.cards.map((S) => ({
          title: S.title || void 0,
          description: S.description || p.body || void 0,
          image: S.media_url || void 0,
          button: S.button_label || void 0
        })) : void 0,
        reactionEmoji: p.reaction_emoji || void 0,
        flow: L === "flow" ? {
          id: p.flow_id || void 0,
          ctaLabel: p.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function A(p) {
      const L = y.value, Q = p.campaign.message ? { ...L.message, ...p.campaign.message } : L.message;
      N({
        ...p.campaign,
        message: Q
      }), ue.value = null, be.value = !1;
    }
    function Y(p) {
      const L = p.target.value;
      if (!L) return;
      const Q = vt.find((te) => te.id === L);
      Q && (C.value ? (ue.value = Q, be.value = !0) : A(Q), p.target.value = "");
    }
    function le(p) {
      N({
        name: p,
        message: { ...y.value.message, template_name: p || void 0 },
        tracking: { ...y.value.tracking ?? {}, campaign_name: p }
      });
    }
    function he(p) {
      if (D(p), Object.prototype.hasOwnProperty.call(p ?? {}, "template_name")) {
        const L = String((p == null ? void 0 : p.template_name) ?? "");
        L !== y.value.name && N({
          name: L,
          tracking: {
            ...y.value.tracking ?? {},
            campaign_name: L
          }
        });
      }
    }
    Ue(
      () => y.value.name,
      (p) => {
        const L = String(y.value.message.template_name ?? "");
        (p || "") !== L && D({ template_name: p || void 0 });
      },
      { immediate: !0 }
    );
    function ie(p) {
      const L = ` {{ .${p.variable} }}`, Q = y.value.message.variables ?? [], te = Array.from(/* @__PURE__ */ new Set([...Q, p.variable]));
      if (p.field === "title") {
        const ce = y.value.message.header ?? "";
        D({
          variables: te,
          header: ce + L
        });
      } else {
        const ce = y.value.message.body ?? "";
        D({
          variables: te,
          body: ce + L
        });
      }
    }
    function se() {
      $.value && _("save", y.value);
    }
    return (p, L) => {
      var Q;
      return a(), s("div", dr, [
        e("div", ur, [
          Be(Qe, {
            "campaign-name": f(y).name,
            status: f(y).status,
            dirty: f(C),
            "last-saved-at": f(O),
            "can-undo": f(q),
            "can-redo": f(me),
            "slugify-name": w.enforceSlugName,
            "onUpdate:campaignName": le,
            onUndo: f(H),
            onRedo: f(Z)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          j.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: ve({
              background: f(ke).dangerBg,
              border: `1px solid ${f(ke).dangerBorder}`,
              borderRadius: `${f(Ne).input}px`,
              padding: `${f(pe)[12]}px ${f(pe)[16]}px`,
              marginBottom: `${f(pe)[16]}px`
            })
          }, [
            e("ul", {
              style: ve({ margin: 0, paddingLeft: "1.25rem", color: f(ke).danger })
            }, [
              (a(!0), s(W, null, F(j.value, (te) => (a(), s("li", {
                key: te.message
              }, d(te.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", cr, [
          e("aside", pr, [
            n.disabledSections.includes("whatsapp") ? g("", !0) : (a(), s("div", mr, [
              e("div", vr, [
                e("div", br, [
                  L[6] || (L[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", fr, d(oe.value), 1)
                ]),
                e("div", gr, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: Y
                  }, [
                    L[7] || (L[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, F(f(vt), (te) => (a(), s("option", {
                      key: te.id,
                      value: te.id
                    }, d(te.label), 9, hr))), 128))
                  ], 32)
                ]),
                e("div", yr, [
                  e("div", kr, [
                    L[8] || (L[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", _r, d(U.value) + "%", 1)
                  ]),
                  e("div", wr, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: ve({ width: `${U.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(Vo, {
                message: f(y).message,
                "show-reset": !0,
                "disabled-categories": n.disabledTemplateCategories,
                "disabled-formats": n.disabledTemplateFormats,
                onUpdate: he,
                onReset: L[0] || (L[0] = (te) => f(X)())
              }, null, 8, ["message", "disabled-categories", "disabled-formats"]),
              Be(Tt, {
                message: f(y).message,
                "variable-options": n.variableOptions,
                onUpdate: f(D),
                onInsertVariable: ie
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", $r, [
            !n.designOnly && f(y).audience.test_mode ? (a(), s("div", xr, [...L[9] || (L[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Cr, [
              e("div", Sr, [
                e("label", Ir, [
                  L[11] || (L[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Re(e("select", {
                    "onUpdate:modelValue": L[1] || (L[1] = (te) => T.value = te),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    L[10] || (L[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, F(f(De), (te) => (a(), s("option", {
                      key: te.id,
                      value: te.id
                    }, d(te.label), 9, Ar))), 128))
                  ], 512), [
                    [Ve, T.value]
                  ])
                ]),
                e("div", Br, [
                  L[12] || (L[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(f(y).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: de(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !ee.value }])
              }, [
                Be(rr, { template: k.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Ur, [
          v.value.length > 0 ? (a(), s("div", Lr, [
            L[13] || (L[13] = e("strong", null, "Warning:", -1)),
            K(" " + d((Q = v.value[0]) == null ? void 0 : Q.message) + " ", 1),
            v.value.length > 1 ? (a(), s("span", Tr, " (+" + d(v.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Rr, [
            n.showDuplicate ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: L[2] || (L[2] = (te) => _("duplicate", JSON.parse(JSON.stringify(f(y)))))
            }, " Duplicate ")) : g("", !0),
            n.showSave ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: se
            }, " Save ")) : g("", !0),
            n.showClose ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: L[3] || (L[3] = (te) => _("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        be.value ? (a(), s("div", Pr, [
          e("div", Vr, [
            L[14] || (L[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            L[15] || (L[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Er, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: L[4] || (L[4] = (te) => {
                  be.value = !1, ue.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: L[5] || (L[5] = (te) => ue.value && A(ue.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Vt = /* @__PURE__ */ Ie(Or, [["__scopeId", "data-v-42d5febd"]]), Nr = { class: "kb-section" }, Mr = { class: "kb-section__head" }, Dr = { class: "kb-field" }, Wr = ["value"], Hr = { class: "kb-field" }, zr = { class: "kb-label" }, Fr = { key: 0 }, qr = { key: 1 }, jr = { key: 2 }, Kr = ["value"], Yr = {
  key: 0,
  class: "kb-truncation-hint"
}, Jr = { class: "kb-field" }, Gr = { class: "kb-insert-row" }, Xr = ["value"], Qr = { class: "kb-field" }, Zr = { class: "kb-insert-row" }, ed = /* @__PURE__ */ Ce({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    const m = n, b = r, w = ["first_name", "last_name", "order_id", "city"], _ = ne(m.variableOptions && m.variableOptions.length ? [...m.variableOptions] : w), y = ne(_.value[0] ?? w[0]), C = ne("");
    Ue(
      () => m.variableOptions,
      (X) => {
        X && X.length && (_.value = [...X], _.value.includes(y.value) || (y.value = _.value[0]));
      }
    );
    const I = h(() => m.message.body ?? ""), E = h(() => I.value.length), N = h(() => E.value ? E.value <= 160 ? 1 : Math.ceil(E.value / 153) : 0), D = h(() => {
      const X = E.value;
      return X <= 160 ? null : X <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function H(X) {
      const G = X.target.value;
      b("update", {
        sender_id: G || void 0
      });
    }
    function Z(X) {
      const G = X.target.value;
      b("update", {
        body: G
      });
    }
    function q() {
      const X = y.value;
      if (!X) return;
      const G = ` {{ .${X} }}`, O = I.value || "", re = m.message.variables ?? [], ge = Array.from(/* @__PURE__ */ new Set([...re, X]));
      b("update", {
        body: O + G,
        variables: ge
      });
    }
    function me() {
      const X = C.value.trim();
      X && (_.value.includes(X) || (_.value = [..._.value, X]), y.value = X, C.value = "");
    }
    return (X, G) => (a(), s("section", Nr, [
      e("div", Mr, [
        G[3] || (G[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        n.showReset ? (a(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: G[0] || (G[0] = (O) => X.$emit("reset"))
        }, " Reset section ")) : g("", !0)
      ]),
      G[10] || (G[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Dr, [
        G[4] || (G[4] = e("label", { class: "kb-label" }, [
          K(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: m.message.sender_id ?? "",
          onInput: H
        }, null, 40, Wr)
      ]),
      e("div", Hr, [
        e("label", zr, [
          G[5] || (G[5] = K(" Message body ", -1)),
          e("span", {
            class: de(["kb-counter", { "kb-counter--warn": N.value > 3 }])
          }, [
            K(d(E.value) + " chars · ", 1),
            N.value === 0 ? (a(), s("span", Fr, "0 segments")) : N.value === 1 ? (a(), s("span", qr, "1 segment")) : (a(), s("span", jr, d(N.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
          value: I.value,
          onInput: Z
        }, null, 40, Kr),
        G[6] || (G[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        D.value ? (a(), s("p", Yr, d(D.value), 1)) : g("", !0)
      ]),
      e("div", Jr, [
        G[7] || (G[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Gr, [
          Re(e("select", {
            "onUpdate:modelValue": G[1] || (G[1] = (O) => y.value = O),
            class: "kb-select"
          }, [
            (a(!0), s(W, null, F(_.value, (O) => (a(), s("option", {
              key: O,
              value: O
            }, d(O), 9, Xr))), 128))
          ], 512), [
            [Ve, y.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: q
          }, " Insert into message ")
        ]),
        G[8] || (G[8] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Qr, [
        G[9] || (G[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Zr, [
          Re(e("input", {
            "onUpdate:modelValue": G[2] || (G[2] = (O) => C.value = O),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [nt, C.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: me
          }, " Add ")
        ])
      ])
    ]));
  }
}), td = /* @__PURE__ */ Ie(ed, [["__scopeId", "data-v-f44c4aab"]]), ad = { class: "keos-sms-builder" }, sd = { class: "kb-builder-top" }, nd = { class: "kb-sms-layout" }, ld = { class: "kb-sms-sidebar" }, od = {
  key: 0,
  class: "kb-sms-form"
}, id = { class: "kb-sms-form-head" }, rd = { class: "kb-sms-form-head-top" }, dd = { class: "kb-sms-health-pill" }, ud = { class: "kb-wa-form-head-row" }, cd = ["value"], pd = { class: "kb-sms-health" }, md = { class: "kb-sms-health-row" }, vd = { class: "kb-sms-health-value" }, bd = { class: "kb-sms-health-bar" }, fd = { class: "kb-sms-canvas" }, gd = {
  key: 0,
  class: "kb-sms-test-banner"
}, hd = { class: "kb-sms-preview-chrome" }, yd = { class: "kb-push-preview-controls" }, kd = { class: "kb-push-preview-as" }, _d = ["value"], wd = { class: "kb-preview-status" }, $d = { class: "kb-preview" }, xd = { class: "kb-sms-preview" }, Cd = { class: "kb-sms-phone" }, Sd = { class: "kb-sms-header" }, Id = { class: "kb-sms-sender-avatar" }, Ad = { class: "kb-sms-header-copy" }, Bd = { class: "kb-sms-sender" }, Ud = { class: "kb-sms-meta" }, Ld = { class: "kb-sms-thread" }, Td = {
  key: 0,
  class: "kb-sms-empty"
}, Rd = { class: "kb-sms-text" }, Pd = { class: "kb-sms-bubble-meta" }, Vd = {
  key: 0,
  class: "kb-sms-segment-chip"
}, Ed = {
  key: 0,
  class: "kb-sms-more-segments"
}, Od = { class: "kb-sms-delivery-line" }, Nd = { class: "kb-sms-counter" }, Md = { key: 0 }, Dd = { key: 1 }, Wd = { key: 2 }, Hd = {
  key: 3,
  class: "kb-sms-cost"
}, zd = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, Fd = { class: "kb-sms-actions" }, qd = {
  key: 0,
  class: "kb-actions-note"
}, jd = { key: 0 }, Kd = { class: "kb-sms-actions-right" }, Yd = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Jd = { class: "kb-confirm-dialog" }, Gd = { class: "kb-confirm-actions" }, Xd = /* @__PURE__ */ Ce({
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
    const m = n, b = r, {
      campaign: w,
      dirty: _,
      customValidatorErrors: y,
      getValidationWithWarnings: C,
      update: I,
      updateMessage: E,
      undo: N,
      redo: D,
      canUndo: H,
      canRedo: Z,
      resetMessage: q,
      hooks: me
    } = Ge({
      initial: m.modelValue,
      hooks: {
        ...m.hooks,
        customValidators: async (J) => {
          var S, x;
          const c = [];
          (S = J.name) != null && S.trim() || c.push("Template name is required");
          const i = (x = m.hooks) != null && x.customValidators ? await m.hooks.customValidators(J) : [];
          return [...c, ...i];
        }
      },
      onDirty: () => b("change", w.value)
    }), { lastSavedAt: X } = Xe(w, { channel: "sms" });
    function G(J) {
      (J.metaKey || J.ctrlKey) && J.key === "z" && (J.preventDefault(), J.shiftKey ? D() : N());
    }
    je(() => {
      window.addEventListener("keydown", G);
    }), Ke(() => {
      window.removeEventListener("keydown", G);
    }), Ue(w, (J) => b("update:modelValue", J), { deep: !0 });
    const O = ne(), re = ne(!0);
    async function ge() {
      if (me.estimateReach)
        try {
          O.value = await me.estimateReach(w.value.audience);
        } catch {
          O.value = void 0;
        }
      me.canSend && (re.value = await Promise.resolve(me.canSend()));
    }
    ge(), Ue(() => w.value.audience, ge, { deep: !0 });
    const $e = h(() => (y.value, C(O.value))), fe = h(() => $e.value.blockingErrors), ae = h(() => $e.value.warnings), j = h(() => $e.value.valid), v = h(() => {
      var S, x, z;
      const J = w.value.message, c = [
        !!((S = w.value.name) != null && S.trim()),
        !!((x = J.body) != null && x.trim()),
        !!((z = J.sender_id) != null && z.trim()),
        !!w.value.template_type,
        (J.body ?? "").length > 20
      ], i = c.filter(Boolean).length;
      return Math.round(i / c.length * 100);
    }), $ = h(() => v.value >= 90 ? "Production ready" : v.value >= 70 ? "Strong draft" : v.value >= 40 ? "In progress" : "Needs setup"), U = h(() => !!Y.value.trim()), oe = h(
      () => w.value.template_type ?? "transactional"
    ), ee = ne(""), T = ne(!1), be = ne(null), ue = h(() => {
      const J = ee.value;
      return J ? De.find((c) => c.id === J) ?? null : null;
    }), _e = h(() => {
      const J = Y.value;
      return ue.value ? Oe(J, ue.value.data) : J;
    });
    function we(J) {
      const c = w.value, i = J.campaign.message ? { ...c.message, ...J.campaign.message } : c.message;
      I({
        ...J.campaign,
        message: i
      }), be.value = null, T.value = !1;
    }
    function R(J) {
      const c = J.target.value;
      if (!c) return;
      const i = bt.find((S) => S.id === c);
      i && (_.value ? (be.value = i, T.value = !0) : we(i), J.target.value = "");
    }
    function k(J) {
      I({ template_type: J });
    }
    function A(J) {
      I({
        name: J,
        tracking: { ...w.value.tracking ?? {}, campaign_name: J }
      });
    }
    const Y = h(
      () => (w.value.message.body ?? "") || ""
    ), le = h(() => Y.value.length), he = h(() => /[^\x00-\x7f]/.test(Y.value)), ie = h(() => he.value ? 70 : 160), se = h(() => he.value ? 67 : 153), p = h(() => le.value ? le.value <= ie.value ? 1 : Math.ceil(le.value / se.value) : 0), L = h(() => {
      const J = _e.value.trim();
      if (!J) return [];
      const c = p.value <= 1 ? ie.value : se.value, i = [];
      for (let S = 0; S < J.length; S += c)
        i.push(J.slice(S, S + c));
      return i;
    }), Q = h(() => L.value.slice(0, 3)), te = h(
      () => Math.max(0, L.value.length - Q.value.length)
    ), ce = h(() => he.value ? "Unicode" : "GSM-7"), ye = h(() => U.value ? p.value > 3 ? "Queued" : "Delivered" : "Draft"), Se = h(() => {
      const J = m.costPerSegment ?? 0;
      return !J || p.value === 0 ? null : (p.value * J).toFixed(2);
    }), Le = h(() => {
      const J = le.value, c = ie.value + se.value;
      return J <= ie.value ? null : J <= c ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Te = h(
      () => w.value.message.sender_id ?? "YourBrand"
    );
    function Ae() {
      j.value && b("save", w.value);
    }
    return (J, c) => {
      var i;
      return a(), s("div", ad, [
        e("div", sd, [
          Be(Qe, {
            "campaign-name": f(w).name,
            status: f(w).status,
            dirty: f(_),
            "last-saved-at": f(X),
            "can-undo": f(H),
            "can-redo": f(Z),
            "slugify-name": m.enforceSlugName,
            "onUpdate:campaignName": A,
            onUndo: f(N),
            onRedo: f(D)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          fe.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: ve({
              background: f(ke).dangerBg,
              border: `1px solid ${f(ke).dangerBorder}`,
              borderRadius: `${f(Ne).input}px`,
              padding: `${f(pe)[12]}px ${f(pe)[16]}px`,
              marginBottom: `${f(pe)[16]}px`
            })
          }, [
            e("ul", {
              style: ve({ margin: 0, paddingLeft: "1.25rem", color: f(ke).danger })
            }, [
              (a(!0), s(W, null, F(fe.value, (S) => (a(), s("li", {
                key: S.message
              }, d(S.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", nd, [
          e("aside", ld, [
            n.disabledSections.includes("sms") ? g("", !0) : (a(), s("div", od, [
              e("div", id, [
                e("div", rd, [
                  c[6] || (c[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", dd, d($.value), 1)
                ]),
                e("div", ud, [
                  Be(dt, {
                    "template-type": oe.value,
                    onUpdate: k
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: R
                  }, [
                    c[7] || (c[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, F(f(bt), (S) => (a(), s("option", {
                      key: S.id,
                      value: S.id
                    }, d(S.label), 9, cd))), 128))
                  ], 32)
                ]),
                e("div", pd, [
                  e("div", md, [
                    c[8] || (c[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", vd, d(v.value) + "%", 1)
                  ]),
                  e("div", bd, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: ve({ width: `${v.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(td, {
                message: f(w).message,
                "variable-options": n.variableOptions,
                "show-reset": !0,
                onUpdate: f(E),
                onReset: c[0] || (c[0] = (S) => f(q)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", fd, [
            !n.designOnly && f(w).audience.test_mode ? (a(), s("div", gd, [...c[9] || (c[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", hd, [
              e("div", yd, [
                e("label", kd, [
                  c[11] || (c[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Re(e("select", {
                    "onUpdate:modelValue": c[1] || (c[1] = (S) => ee.value = S),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    c[10] || (c[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, F(f(De), (S) => (a(), s("option", {
                      key: S.id,
                      value: S.id
                    }, d(S.label), 9, _d))), 128))
                  ], 512), [
                    [Ve, ee.value]
                  ])
                ]),
                e("div", wd, [
                  c[12] || (c[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, d(p.value || 0), 1)
                ])
              ]),
              e("div", {
                class: de(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !U.value }])
              }, [
                e("div", $d, [
                  e("div", xd, [
                    e("div", Cd, [
                      c[15] || (c[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Sd, [
                        e("div", Id, d(Te.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Ad, [
                          e("div", Bd, d(Te.value), 1),
                          e("div", Ud, "Text message · " + d(ye.value), 1)
                        ])
                      ]),
                      e("div", Ld, [
                        U.value ? (a(), s(W, { key: 1 }, [
                          (a(!0), s(W, null, F(Q.value, (S, x) => (a(), s("div", {
                            key: `${x}-${S.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", Rd, d(S), 1),
                            e("span", Pd, [
                              c[13] || (c[13] = K(" 09:21 ", -1)),
                              Q.value.length > 1 ? (a(), s("span", Vd, "Part " + d(x + 1), 1)) : g("", !0)
                            ])
                          ]))), 128)),
                          te.value > 0 ? (a(), s("div", Ed, " +" + d(te.value) + " more segments ", 1)) : g("", !0),
                          e("div", Od, [
                            c[14] || (c[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            K(" " + d(ye.value), 1)
                          ])
                        ], 64)) : (a(), s("div", Td, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Nd, [
                      K(d(le.value) + " characters · ", 1),
                      p.value === 0 ? (a(), s("span", Md, "0 segments")) : p.value === 1 ? (a(), s("span", Dd, "1 segment")) : (a(), s("span", Wd, d(p.value) + " segments", 1)),
                      K(" (" + d(ie.value) + " chars single, " + d(se.value) + " multi-part · " + d(ce.value) + ") ", 1),
                      Se.value !== null ? (a(), s("span", Hd, " · Est. " + d(Se.value), 1)) : g("", !0)
                    ]),
                    Le.value ? (a(), s("p", zd, d(Le.value), 1)) : g("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", Fd, [
          ae.value.length > 0 ? (a(), s("div", qd, [
            c[16] || (c[16] = e("strong", null, "Warning:", -1)),
            K(" " + d((i = ae.value[0]) == null ? void 0 : i.message) + " ", 1),
            ae.value.length > 1 ? (a(), s("span", jd, " (+" + d(ae.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", Kd, [
            n.showDuplicate ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: c[2] || (c[2] = (S) => b("duplicate", JSON.parse(JSON.stringify(f(w)))))
            }, " Duplicate ")) : g("", !0),
            n.showSave ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Ae
            }, " Save ")) : g("", !0),
            n.showClose ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: c[3] || (c[3] = (S) => b("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        T.value ? (a(), s("div", Yd, [
          e("div", Jd, [
            c[17] || (c[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            c[18] || (c[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Gd, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: c[4] || (c[4] = (S) => {
                  T.value = !1, be.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: c[5] || (c[5] = (S) => be.value && we(be.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Et = /* @__PURE__ */ Ie(Xd, [["__scopeId", "data-v-5e442b56"]]), Qd = 30, Zd = 60, eu = 130;
function tu(n) {
  const r = (n ?? "").trim().length;
  return r < Qd ? "too_short" : r <= Zd ? "good" : "too_long";
}
function au(n) {
  const r = (n ?? "").trim().length;
  return r === 0 ? "too_short" : r <= eu ? "good" : "too_long";
}
const su = [
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
  for (const m of su) {
    const b = n.match(m);
    b && r.push(b[0]);
  }
  return r;
}
function nu(n) {
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
function lu(n) {
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
const ou = { class: "em-section" }, iu = { class: "em-strip kb-section" }, ru = { class: "em-strip-head" }, du = { class: "em-field kb-field" }, uu = ["value"], cu = { class: "em-field kb-field" }, pu = ["value"], mu = { class: "em-field kb-field" }, vu = ["value"], bu = { class: "em-field kb-field" }, fu = { class: "em-input-group" }, gu = ["value"], hu = { class: "em-var-picker-wrap" }, yu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ku = ["onClick"], _u = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, wu = { class: "em-field kb-field" }, $u = { class: "em-input-group" }, xu = ["value"], Cu = { class: "em-var-picker-wrap" }, Su = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Iu = ["onClick"], Au = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Bu = { class: "em-strip kb-section em-strip--library" }, Uu = { class: "em-library-chips" }, Lu = ["onClick"], Tu = { class: "em-strip kb-section em-strip--blocks" }, Ru = { class: "em-block-list" }, Pu = ["data-type"], Vu = { class: "em-block-bar" }, Eu = { class: "em-block-type" }, Ou = { class: "em-block-actions" }, Nu = ["disabled", "onClick"], Mu = ["disabled", "onClick"], Du = ["onClick"], Wu = {
  key: 0,
  class: "em-block-fields"
}, Hu = ["value", "onChange"], zu = ["value", "onInput"], Fu = { class: "em-var-picker-wrap" }, qu = ["onClick"], ju = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Ku = ["onClick"], Yu = {
  key: 1,
  class: "em-block-fields"
}, Ju = ["value", "onInput"], Gu = { class: "em-var-picker-wrap" }, Xu = ["onClick"], Qu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Zu = ["onClick"], ec = {
  key: 2,
  class: "em-block-fields"
}, tc = ["value", "onInput"], ac = ["value", "onInput"], sc = ["value", "onInput"], nc = {
  key: 3,
  class: "em-block-fields"
}, lc = ["value", "onInput"], oc = ["value", "onInput"], ic = { class: "em-block-fields--row" }, rc = ["value", "onInput"], dc = { class: "em-check-row" }, uc = ["checked", "onChange"], cc = {
  key: 4,
  class: "em-block-fields em-block-fields--row"
}, pc = ["value", "onInput"], mc = {
  key: 5,
  class: "em-block-fields"
}, vc = ["value", "onInput"], bc = ["value", "onInput"], fc = ["value", "onInput"], gc = { class: "em-var-picker-wrap" }, hc = ["onClick"], yc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, kc = ["onClick"], _c = {
  key: 6,
  class: "em-block-fields"
}, wc = ["value", "onChange"], $c = { class: "em-list-items" }, xc = ["value", "onInput", "placeholder"], Cc = ["onClick"], Sc = ["onClick"], Ic = {
  key: 7,
  class: "em-block-fields"
}, Ac = ["value", "onChange"], Bc = ["value", "onInput"], Uc = { class: "em-var-picker-wrap" }, Lc = ["onClick"], Tc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Rc = ["onClick"], Pc = {
  key: 8,
  class: "em-block-fields"
}, Vc = { class: "em-social-links" }, Ec = ["value", "onChange"], Oc = ["value", "onInput"], Nc = ["onClick"], Mc = ["onClick"], Dc = {
  key: 9,
  class: "em-block-fields"
}, Wc = ["value", "onInput"], Hc = ["value", "onInput"], zc = ["value", "onInput"], Fc = {
  key: 10,
  class: "em-block-fields"
}, qc = ["value", "onInput"], jc = { class: "em-link-list-items" }, Kc = ["value", "onInput"], Yc = ["value", "onInput"], Jc = ["onClick"], Gc = ["onClick"], Xc = {
  key: 11,
  class: "em-block-fields"
}, Qc = ["value", "onInput"], Zc = { class: "em-var-picker-wrap" }, ep = ["onClick"], tp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ap = ["onClick"], sp = ["value", "onInput"], np = { class: "em-var-picker-wrap" }, lp = ["onClick"], op = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, ip = ["onClick"], rp = {
  key: 12,
  class: "em-block-fields"
}, dp = { class: "em-block-fields--row" }, up = ["value", "onInput"], cp = { class: "em-block-fields--row" }, pp = ["value", "onInput"], mp = ["value", "onChange"], vp = {
  key: 13,
  class: "em-block-fields"
}, bp = ["value", "onChange"], fp = { class: "em-inline-label" }, gp = ["value", "onInput"], hp = { class: "em-var-picker-wrap" }, yp = ["onClick"], kp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, _p = ["onClick"], wp = {
  key: 14,
  class: "em-block-fields"
}, $p = ["value", "onInput"], xp = { class: "em-link-list-items" }, Cp = ["value", "onInput"], Sp = ["value", "onInput"], Ip = ["onClick"], Ap = ["onClick"], Bp = {
  key: 15,
  class: "em-block-fields"
}, Up = ["value", "onInput"], Lp = ["value", "onInput"], Tp = ["onClick"], Rp = ["onClick"], Pp = {
  key: 16,
  class: "em-block-fields"
}, Vp = ["value", "onInput"], Ep = ["value", "onInput"], Op = ["value", "onInput"], Np = ["onClick"], Mp = ["onClick"], Dp = {
  key: 17,
  class: "em-block-fields"
}, Wp = ["value", "onInput"], Hp = ["value", "onInput"], zp = {
  key: 18,
  class: "em-block-fields"
}, Fp = ["value", "onInput"], qp = ["value", "onInput"], jp = ["value", "onInput"], Kp = ["value", "onInput"], Yp = ["value", "onInput"], Jp = {
  key: 19,
  class: "em-block-fields"
}, Gp = ["value", "onInput"], Xp = { class: "em-var-picker-wrap" }, Qp = ["onClick"], Zp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, em = ["onClick"], tm = {
  key: 20,
  class: "em-block-fields"
}, am = ["value", "onInput"], sm = ["value", "onInput"], nm = { class: "em-var-picker-wrap" }, lm = ["onClick"], om = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, im = ["onClick"], rm = {
  key: 21,
  class: "em-block-fields"
}, dm = ["value", "onInput"], um = { class: "em-block-fields--row" }, cm = ["value", "onInput"], pm = {
  key: 22,
  class: "em-block-fields"
}, mm = ["value", "onInput"], vm = ["value", "onInput"], bm = ["value", "onInput"], fm = {
  key: 23,
  class: "em-block-fields em-block-fields--row em-block-fields--layout"
}, gm = {
  class: "em-align-group",
  role: "group",
  "aria-label": "Block alignment"
}, hm = ["onClick"], ym = ["onClick"], km = ["onClick"], _m = { class: "em-check-row" }, wm = ["checked", "onChange"], $m = { class: "em-add-bar kb-field kb-field--add-bar" }, xm = { class: "em-add-bar-btns" }, Cm = { class: "em-strip kb-section em-strip--personalize" }, Sm = { class: "em-field kb-field" }, Im = { class: "em-input-group" }, Am = ["value"], Bm = { class: "em-field kb-field" }, Um = { class: "em-input-group" }, Pe = "{{ .var }}", Lm = /* @__PURE__ */ Ce({
  __name: "SectionEmail",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    var B;
    function m() {
      return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
    const b = [
      { platform: "facebook", url: "" },
      { platform: "twitter", url: "" },
      { platform: "instagram", url: "" },
      { platform: "linkedin", url: "" }
    ], w = [
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
    function _(u) {
      switch (u) {
        case "heading":
          return { id: m(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: m(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
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
            leftContent: "Left column text or {{ .variable }}.",
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
const example = {{ .order_id }};`,
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
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: m(), type: "paragraph", content: "" };
      }
    }
    const y = n, C = r, I = ["first_name", "last_name", "order_id", "city", "email"], E = ne(
      (B = y.variableOptions) != null && B.length ? [...y.variableOptions] : I
    ), N = ne(E.value[0] ?? "first_name"), D = ne("");
    Ue(
      () => y.variableOptions,
      (u) => {
        u != null && u.length && (E.value = [...u], E.value.includes(N.value) || (N.value = E.value[0]));
      }
    );
    const H = h(() => y.message.subject ?? ""), Z = h(() => y.message.preview_text ?? ""), q = h(() => tu(H.value)), me = h(() => au(Z.value)), X = h(() => $t(H.value)), G = h(() => $t(Z.value)), O = h(() => {
      const u = y.message.blocks;
      return Array.isArray(u) && u.length > 0 ? u : [_("paragraph")];
    });
    Ue(
      () => y.message.blocks,
      (u) => {
        (!Array.isArray(u) || u.length === 0) && C("update", { blocks: [_("paragraph")] });
      },
      { immediate: !0 }
    );
    function re(u) {
      C("update", { blocks: u });
    }
    function ge(u) {
      C("update", { subject: u.target.value });
    }
    function $e(u) {
      const l = u.target.value;
      C("update", { preview_text: l || void 0 });
    }
    function fe(u) {
      C("update", { from_name: u.target.value || void 0 });
    }
    function ae(u) {
      C("update", { from_address: u.target.value || void 0 });
    }
    function j(u) {
      C("update", { reply_to: u.target.value || void 0 });
    }
    const v = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [_("heading"), _("paragraph"), _("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [_("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [_("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [_("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [_("social"), _("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [_("footer"), _("link_list")]
      }
    ];
    function $(u) {
      const l = u.blocks();
      re([...O.value, ...l]);
    }
    function U(u) {
      const l = [...O.value, _(u)];
      re(l);
    }
    function oe(u) {
      re(O.value.filter((l) => l.id !== u));
    }
    function ee(u, l) {
      const t = O.value.findIndex((V) => V.id === u);
      if (t < 0) return;
      const P = l === "up" ? t - 1 : t + 1;
      if (P < 0 || P >= O.value.length) return;
      const o = [...O.value];
      [o[t], o[P]] = [o[P], o[t]], re(o);
    }
    function T(u, l) {
      const t = O.value.map((P) => P.id === u ? { ...P, ...l } : P);
      re(t);
    }
    function be(u, l, t) {
      const P = O.value.find((V) => V.id === u);
      if (!P || P.type !== "list") return;
      const o = [...P.items || []];
      o[l] = t, T(u, { items: o });
    }
    function ue(u) {
      const l = O.value.find((t) => t.id === u);
      !l || l.type !== "list" || T(u, { items: [...l.items || [], "New item"] });
    }
    function _e(u, l) {
      const t = O.value.find((o) => o.id === u);
      if (!t || t.type !== "list") return;
      const P = (t.items || []).filter((o, V) => V !== l);
      T(u, { items: P });
    }
    function we(u, l, t, P) {
      const o = O.value.find((M) => M.id === u);
      if (!o || o.type !== "social") return;
      const V = (o.links || []).map((M, xe) => xe === l ? { ...M, [t]: P } : M);
      T(u, { links: V });
    }
    function R(u) {
      const l = O.value.find((t) => t.id === u);
      !l || l.type !== "social" || T(u, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function k(u, l) {
      const t = O.value.find((o) => o.id === u);
      if (!t || t.type !== "social") return;
      const P = (t.links || []).filter((o, V) => V !== l);
      T(u, { links: P });
    }
    function A(u, l, t, P) {
      const o = O.value.find((M) => M.id === u);
      if (!o || o.type !== "link_list") return;
      const V = (o.links || []).map((M, xe) => xe === l ? { ...M, [t]: P } : M);
      T(u, { links: V });
    }
    function Y(u) {
      const l = O.value.find((t) => t.id === u);
      !l || l.type !== "link_list" || T(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function le(u, l) {
      const t = O.value.find((o) => o.id === u);
      if (!t || t.type !== "link_list") return;
      const P = (t.links || []).filter((o, V) => V !== l);
      T(u, { links: P });
    }
    function he(u, l) {
      const t = O.value.find((P) => P.id === u);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const P = [...t.cells || []];
          for (; P.length < l.columnCount; ) P.push("Cell content");
          l.cells = P.slice(0, l.columnCount);
        }
        T(u, l);
      }
    }
    function ie(u, l, t) {
      const P = O.value.find((V) => V.id === u);
      if (!P || P.type !== "row") return;
      const o = [...P.cells || []];
      o[l] = t, T(u, { cells: o });
    }
    function se(u, l, t, P) {
      const o = O.value.find((M) => M.id === u);
      if (!o || o.type !== "navbar") return;
      const V = (o.links || []).map((M, xe) => xe === l ? { ...M, [t]: P } : M);
      T(u, { links: V });
    }
    function p(u) {
      const l = O.value.find((t) => t.id === u);
      !l || l.type !== "navbar" || T(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function L(u, l) {
      const t = O.value.find((P) => P.id === u);
      !t || t.type !== "navbar" || T(u, { links: (t.links || []).filter((P, o) => o !== l) });
    }
    function Q(u, l, t, P) {
      const o = O.value.find((M) => M.id === u);
      if (!o || o.type !== "accordion") return;
      const V = (o.items || []).map((M, xe) => xe === l ? { ...M, [t]: P } : M);
      T(u, { items: V });
    }
    function te(u) {
      const l = O.value.find((t) => t.id === u);
      !l || l.type !== "accordion" || T(u, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function ce(u, l) {
      const t = O.value.find((P) => P.id === u);
      !t || t.type !== "accordion" || T(u, { items: (t.items || []).filter((P, o) => o !== l) });
    }
    function ye(u, l, t, P) {
      const o = O.value.find((M) => M.id === u);
      if (!o || o.type !== "carousel") return;
      const V = (o.slides || []).map((M, xe) => xe === l ? { ...M, [t]: P } : M);
      T(u, { slides: V });
    }
    function Se(u) {
      const l = O.value.find((t) => t.id === u);
      !l || l.type !== "carousel" || T(u, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Le(u, l) {
      const t = O.value.find((P) => P.id === u);
      !t || t.type !== "carousel" || T(u, { slides: (t.slides || []).filter((P, o) => o !== l) });
    }
    function Te(u, l = N.value) {
      const t = ` {{ .${l} }}`, P = y.message.variables ?? [], o = Array.from(/* @__PURE__ */ new Set([...P, l]));
      u === "subject" ? C("update", {
        subject: (H.value || "") + t,
        variables: o
      }) : C("update", {
        preview_text: (Z.value || "") + t,
        variables: o
      });
    }
    function Ae(u, l = N.value) {
      const t = O.value.find((We) => We.id === u);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const P = ` {{ .${l} }}`, o = y.message.variables ?? [], V = Array.from(/* @__PURE__ */ new Set([...o, l])), M = (t.type === "footer", "content"), ze = (t[M] ?? "") + P, qe = O.value.map(
        (We) => We.id === u ? { ...We, [M]: ze } : We
      );
      C("update", { blocks: qe, variables: V });
    }
    function J(u, l, t = N.value) {
      const P = O.value.find((ze) => ze.id === u);
      if (!P || P.type !== "row") return;
      const o = ` {{ .${t} }}`, V = y.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...V, t])), xe = [...P.cells || []];
      xe[l] = (xe[l] || "") + o, T(u, { cells: xe }), C("update", { variables: M });
    }
    function c(u, l, t = N.value) {
      const P = O.value.find((We) => We.id === u);
      if (!P || P.type !== "columns") return;
      const o = ` {{ .${t} }}`, V = y.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...V, t])), xe = l === "left" ? "leftContent" : "rightContent", qe = (P[xe] ?? "") + o;
      T(u, { [xe]: qe }), C("update", { variables: M });
    }
    const i = ne(null);
    function S(u) {
      i.value = i.value === u ? null : u;
    }
    function x(u, l) {
      if (l) {
        if (u === "subject") Te("subject", l);
        else if (u === "preview") Te("preview", l);
        else if (u.startsWith("block:")) Ae(u.slice(6), l);
        else if (u.startsWith("col-left:")) c(u.slice(9), "left", l);
        else if (u.startsWith("col-right:")) c(u.slice(10), "right", l);
        else if (u.startsWith("row:")) {
          const [, t, P] = u.split(":");
          J(t, Number(P), l);
        }
        i.value = null;
      }
    }
    function z() {
      const u = D.value.trim();
      !u || E.value.includes(u) || (E.value = [...E.value, u], N.value = u, D.value = "");
    }
    return (u, l) => (a(), s("section", ou, [
      e("div", iu, [
        e("div", ru, [
          l[28] || (l[28] = e("h4", { class: "em-strip-title" }, "Sender & envelope", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "em-section-reset",
            onClick: l[0] || (l[0] = (t) => u.$emit("reset"))
          }, " Reset section ")) : g("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", du, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: n.message.from_name ?? "",
            onInput: fe
          }, null, 40, uu)
        ]),
        e("div", cu, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: n.message.from_address ?? "",
            onInput: ae
          }, null, 40, pu)
        ]),
        e("div", mu, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            K("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: n.message.reply_to ?? "",
            onInput: j
          }, null, 40, vu)
        ]),
        e("div", bu, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", fu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: H.value,
              onInput: ge
            }, null, 40, gu),
            e("div", hu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[1] || (l[1] = (t) => S("subject")),
                title: "Insert variable"
              }, d(Pe)),
              i.value === "subject" ? (a(), s("div", yu, [
                (a(!0), s(W, null, F(E.value, (t) => (a(), s("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (P) => x("subject", t)
                }, d(t), 9, ku))), 128))
              ])) : g("", !0)
            ])
          ]),
          e("span", {
            class: de(["em-analyzer", `em-analyzer--${q.value}`])
          }, d(f(nu)(q.value)), 3),
          X.value.length ? (a(), s("span", _u, "Spammy: " + d(X.value.join(", ")), 1)) : g("", !0)
        ]),
        e("div", wu, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            K("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", $u, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: Z.value,
              onInput: $e
            }, null, 40, xu),
            e("div", Cu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => S("preview")),
                title: "Insert variable"
              }, d(Pe)),
              i.value === "preview" ? (a(), s("div", Su, [
                (a(!0), s(W, null, F(E.value, (t) => (a(), s("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (P) => x("preview", t)
                }, d(t), 9, Iu))), 128))
              ])) : g("", !0)
            ])
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: de(["em-analyzer", `em-analyzer--${me.value}`])
          }, d(f(lu)(me.value)), 3),
          G.value.length ? (a(), s("span", Au, "Spammy: " + d(G.value.join(", ")), 1)) : g("", !0)
        ])
      ]),
      e("div", Bu, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Uu, [
          (a(), s(W, null, F(v, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (P) => $(t)
          }, d(t.label), 9, Lu)), 64))
        ])
      ]),
      e("div", Tu, [
        l[64] || (l[64] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[65] || (l[65] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Ru, [
          (a(!0), s(W, null, F(O.value, (t, P) => (a(), s("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Vu, [
              e("span", Eu, d(t.type), 1),
              e("div", Ou, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === 0,
                  onClick: (o) => ee(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Nu),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: P === O.value.length - 1,
                  onClick: (o) => ee(t.id, "down"),
                  title: "Move down",
                  "aria-label": "Move down"
                }, "↓", 8, Mu),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (o) => oe(t.id),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Du)
              ])
            ]),
            t.type === "heading" ? (a(), s("div", Wu, [
              e("select", {
                value: t.level,
                class: "em-select em-select--sm",
                onChange: (o) => T(t.id, { level: Number(o.target.value) })
              }, [...l[38] || (l[38] = [
                e("option", { value: 1 }, "H1", -1),
                e("option", { value: 2 }, "H2", -1),
                e("option", { value: 3 }, "H3", -1)
              ])], 40, Hu),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.content,
                onInput: (o) => T(t.id, { content: o.target.value }),
                placeholder: "Heading text"
              }, null, 40, zu),
              e("div", Fu, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`block:${t.id}`)
                }, d(Pe), 8, qu),
                i.value === `block:${t.id}` ? (a(), s("div", ju, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `block-var-heading-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`block:${t.id}`, o)
                  }, d(o), 9, Ku))), 128))
                ])) : g("", !0)
              ])
            ])) : t.type === "paragraph" ? (a(), s("div", Yu, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => T(t.id, { content: o.target.value }),
                placeholder: "Paragraph text",
                rows: "2"
              }, null, 40, Ju),
              e("div", Gu, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`block:${t.id}`)
                }, d(Pe), 8, Xu),
                i.value === `block:${t.id}` ? (a(), s("div", Qu, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `block-var-paragraph-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`block:${t.id}`, o)
                  }, d(o), 9, Zu))), 128))
                ])) : g("", !0)
              ])
            ])) : t.type === "image" ? (a(), s("div", ec, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.src,
                onInput: (o) => T(t.id, { src: o.target.value }),
                placeholder: "Image URL"
              }, null, 40, tc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => T(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, ac),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.linkUrl,
                onInput: (o) => T(t.id, { linkUrl: o.target.value }),
                placeholder: "Link URL (optional)"
              }, null, 40, sc)
            ])) : t.type === "button" ? (a(), s("div", nc, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.text,
                onInput: (o) => T(t.id, { text: o.target.value }),
                placeholder: "Button text"
              }, null, 40, lc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.url,
                onInput: (o) => T(t.id, { url: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, oc),
              e("div", ic, [
                l[39] || (l[39] = e("label", { class: "em-inline-label" }, "Border radius", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "0",
                  max: "24",
                  value: t.borderRadius ?? 8,
                  onInput: (o) => T(t.id, { borderRadius: Number(o.target.value) || 0 })
                }, null, 40, rc)
              ]),
              e("label", dc, [
                e("input", {
                  type: "checkbox",
                  checked: t.ghost,
                  onChange: (o) => T(t.id, { ghost: o.target.checked })
                }, null, 40, uc),
                l[40] || (l[40] = e("span", null, "Ghost (outline) style", -1))
              ])
            ])) : t.type === "spacer" ? (a(), s("div", cc, [
              l[41] || (l[41] = e("label", { class: "em-inline-label" }, "Height", -1)),
              e("input", {
                type: "number",
                class: "em-input em-input--narrow",
                min: "8",
                max: "120",
                value: t.height,
                onInput: (o) => T(t.id, { height: Number(o.target.value) || 24 })
              }, null, 40, pc),
              l[42] || (l[42] = e("span", { class: "em-inline-label" }, "px", -1))
            ])) : t.type === "footer" ? (a(), s("div", mc, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => T(t.id, { content: o.target.value }),
                placeholder: "Footer text",
                rows: "2"
              }, null, 40, vc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.unsubscribeUrl,
                onInput: (o) => T(t.id, { unsubscribeUrl: o.target.value }),
                placeholder: "Unsubscribe URL"
              }, null, 40, bc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.companyAddress,
                onInput: (o) => T(t.id, { companyAddress: o.target.value }),
                placeholder: "Company address"
              }, null, 40, fc),
              e("div", gc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`block:${t.id}`)
                }, d(Pe), 8, hc),
                i.value === `block:${t.id}` ? (a(), s("div", yc, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `block-var-footer-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`block:${t.id}`, o)
                  }, d(o), 9, kc))), 128))
                ])) : g("", !0)
              ])
            ])) : t.type === "list" ? (a(), s("div", _c, [
              e("select", {
                value: t.style,
                class: "em-select em-select--sm",
                onChange: (o) => T(t.id, { style: o.target.value })
              }, [...l[43] || (l[43] = [
                e("option", { value: "bullet" }, "Bullet list", -1),
                e("option", { value: "numbered" }, "Numbered list", -1)
              ])], 40, wc),
              e("div", $c, [
                (a(!0), s(W, null, F(t.items || [], (o, V) => (a(), s("div", {
                  key: V,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o,
                    onInput: (M) => be(t.id, V, M.target.value),
                    placeholder: `Item ${V + 1}`
                  }, null, 40, xc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => _e(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Cc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => ue(t.id)
              }, "+ Add item", 8, Sc)
            ])) : t.type === "quote" ? (a(), s("div", Ic, [
              e("select", {
                value: t.style || "default",
                class: "em-select em-select--sm",
                onChange: (o) => T(t.id, { style: o.target.value })
              }, [...l[44] || (l[44] = [
                e("option", { value: "default" }, "Default", -1),
                e("option", { value: "info" }, "Info", -1),
                e("option", { value: "success" }, "Success", -1),
                e("option", { value: "warning" }, "Warning", -1)
              ])], 40, Ac),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => T(t.id, { content: o.target.value }),
                placeholder: "Quote or callout text",
                rows: "3"
              }, null, 40, Bc),
              e("div", Uc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`block:${t.id}`)
                }, d(Pe), 8, Lc),
                i.value === `block:${t.id}` ? (a(), s("div", Tc, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `block-var-quote-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`block:${t.id}`, o)
                  }, d(o), 9, Rc))), 128))
                ])) : g("", !0)
              ])
            ])) : t.type === "social" ? (a(), s("div", Pc, [
              e("div", Vc, [
                (a(!0), s(W, null, F(t.links || [], (o, V) => (a(), s("div", {
                  key: V,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: o.platform,
                    class: "em-select em-select--sm",
                    onChange: (M) => we(t.id, V, "platform", M.target.value)
                  }, [...l[45] || (l[45] = [
                    He('<option value="facebook" data-v-64de8497>Facebook</option><option value="twitter" data-v-64de8497>Twitter / X</option><option value="instagram" data-v-64de8497>Instagram</option><option value="linkedin" data-v-64de8497>LinkedIn</option><option value="youtube" data-v-64de8497>YouTube</option><option value="tiktok" data-v-64de8497>TikTok</option><option value="custom" data-v-64de8497>Custom</option>', 7)
                  ])], 40, Ec),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (M) => we(t.id, V, "url", M.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Oc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => k(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Nc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => R(t.id)
              }, "+ Add link", 8, Mc)
            ])) : t.type === "video" ? (a(), s("div", Dc, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.thumbnailUrl,
                onInput: (o) => T(t.id, { thumbnailUrl: o.target.value }),
                placeholder: "Thumbnail image URL"
              }, null, 40, Wc),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.videoUrl,
                onInput: (o) => T(t.id, { videoUrl: o.target.value }),
                placeholder: "Video URL (click destination)"
              }, null, 40, Hc),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => T(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, zc)
            ])) : t.type === "link_list" ? (a(), s("div", Fc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => T(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, qc),
              e("div", jc, [
                (a(!0), s(W, null, F(t.links || [], (o, V) => (a(), s("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (M) => A(t.id, V, "text", M.target.value),
                    placeholder: "Label"
                  }, null, 40, Kc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (M) => A(t.id, V, "url", M.target.value),
                    placeholder: "URL"
                  }, null, 40, Yc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => le(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Jc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Y(t.id)
              }, "+ Add link", 8, Gc)
            ])) : t.type === "columns" ? (a(), s("div", Xc, [
              l[46] || (l[46] = e("label", { class: "em-inline-label" }, "Left column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.leftContent,
                onInput: (o) => T(t.id, { leftContent: o.target.value }),
                placeholder: "Left column text",
                rows: "2"
              }, null, 40, Qc),
              e("div", Zc, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`col-left:${t.id}`)
                }, d(Pe), 8, ep),
                i.value === `col-left:${t.id}` ? (a(), s("div", tp, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `col-left-var-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`col-left:${t.id}`, o)
                  }, d(o), 9, ap))), 128))
                ])) : g("", !0)
              ]),
              l[47] || (l[47] = e("label", { class: "em-inline-label" }, "Right column", -1)),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.rightContent,
                onInput: (o) => T(t.id, { rightContent: o.target.value }),
                placeholder: "Right column text",
                rows: "2"
              }, null, 40, sp),
              e("div", np, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`col-right:${t.id}`)
                }, d(Pe), 8, lp),
                i.value === `col-right:${t.id}` ? (a(), s("div", op, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `col-right-var-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`col-right:${t.id}`, o)
                  }, d(o), 9, ip))), 128))
                ])) : g("", !0)
              ])
            ])) : t.type === "divider" ? (a(), s("div", rp, [
              e("div", dp, [
                l[48] || (l[48] = e("label", { class: "em-inline-label" }, "Thickness", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "8",
                  value: t.thickness ?? 1,
                  onInput: (o) => T(t.id, { thickness: Number(o.target.value) || 1 })
                }, null, 40, up),
                l[49] || (l[49] = e("span", { class: "em-inline-label" }, "px", -1))
              ]),
              e("div", cp, [
                l[50] || (l[50] = e("label", { class: "em-inline-label" }, "Color", -1)),
                e("input", {
                  type: "text",
                  class: "em-input em-input--narrow",
                  value: t.color ?? "#e2e8f0",
                  onInput: (o) => T(t.id, { color: o.target.value || "#e2e8f0" }),
                  placeholder: "#e2e8f0"
                }, null, 40, pp)
              ]),
              e("select", {
                value: t.lineStyle ?? "solid",
                class: "em-select em-select--sm",
                onChange: (o) => T(t.id, { lineStyle: o.target.value })
              }, [...l[51] || (l[51] = [
                e("option", { value: "solid" }, "Solid", -1),
                e("option", { value: "dashed" }, "Dashed", -1),
                e("option", { value: "dotted" }, "Dotted", -1)
              ])], 40, mp)
            ])) : t.type === "row" ? (a(), s("div", vp, [
              l[53] || (l[53] = e("label", { class: "em-inline-label" }, "Columns", -1)),
              e("select", {
                value: t.columnCount,
                class: "em-select em-select--sm",
                onChange: (o) => he(t.id, { columnCount: Number(o.target.value) })
              }, [...l[52] || (l[52] = [
                e("option", { value: 1 }, "1", -1),
                e("option", { value: 2 }, "2", -1),
                e("option", { value: 3 }, "3", -1),
                e("option", { value: 4 }, "4", -1)
              ])], 40, bp),
              (a(!0), s(W, null, F(t.cells || [], (o, V) => (a(), s("div", {
                key: V,
                class: "em-row-cell"
              }, [
                e("label", fp, "Column " + d(V + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o,
                  onInput: (M) => ie(t.id, V, M.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, gp),
                e("div", hp, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (M) => S(`row:${t.id}:${V}`)
                  }, d(Pe), 8, yp),
                  i.value === `row:${t.id}:${V}` ? (a(), s("div", kp, [
                    (a(!0), s(W, null, F(E.value, (M) => (a(), s("button", {
                      key: `row-var-${t.id}-${V}-${M}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (xe) => x(`row:${t.id}:${V}`, M)
                    }, d(M), 9, _p))), 128))
                  ])) : g("", !0)
                ])
              ]))), 128))
            ])) : t.type === "navbar" ? (a(), s("div", wp, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (o) => T(t.id, { separator: o.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, $p),
              e("div", xp, [
                (a(!0), s(W, null, F(t.links || [], (o, V) => (a(), s("div", {
                  key: V,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: o.text,
                    onInput: (M) => se(t.id, V, "text", M.target.value),
                    placeholder: "Label"
                  }, null, 40, Cp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: o.url,
                    onInput: (M) => se(t.id, V, "url", M.target.value),
                    placeholder: "URL"
                  }, null, 40, Sp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => L(t.id, V),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Ip)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => p(t.id)
              }, "+ Add link", 8, Ap)
            ])) : t.type === "accordion" ? (a(), s("div", Bp, [
              (a(!0), s(W, null, F(t.items || [], (o, V) => (a(), s("div", {
                key: V,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.title,
                  onInput: (M) => Q(t.id, V, "title", M.target.value),
                  placeholder: "Section title"
                }, null, 40, Up),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: o.content,
                  onInput: (M) => Q(t.id, V, "content", M.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Lp),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (M) => ce(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Tp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => te(t.id)
              }, "+ Add section", 8, Rp)
            ])) : t.type === "carousel" ? (a(), s("div", Pp, [
              (a(!0), s(W, null, F(t.slides || [], (o, V) => (a(), s("div", {
                key: V,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.imageUrl,
                  onInput: (M) => ye(t.id, V, "imageUrl", M.target.value),
                  placeholder: "Image URL"
                }, null, 40, Vp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: o.alt,
                  onInput: (M) => ye(t.id, V, "alt", M.target.value),
                  placeholder: "Alt text"
                }, null, 40, Ep),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: o.linkUrl,
                  onInput: (M) => ye(t.id, V, "linkUrl", M.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Op),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (M) => Le(t.id, V),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Np)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (o) => Se(t.id)
              }, "+ Add slide", 8, Mp)
            ])) : t.type === "countdown" ? (a(), s("div", Dp, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.label,
                onInput: (o) => T(t.id, { label: o.target.value }),
                placeholder: "Label (e.g. Offer ends in)"
              }, null, 40, Wp),
              e("input", {
                type: "datetime-local",
                class: "em-input",
                value: t.endDateTime ? t.endDateTime.slice(0, 16) : "",
                onInput: (o) => T(t.id, { endDateTime: o.target.value ? new Date(o.target.value).toISOString() : "" }),
                placeholder: "End date & time"
              }, null, 40, Hp),
              l[54] || (l[54] = e("span", { class: "em-hint" }, "Preview shows placeholder; real countdown uses dynamic GIF in send.", -1))
            ])) : t.type === "product_card" ? (a(), s("div", zp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => T(t.id, { imageUrl: o.target.value }),
                placeholder: "Product image URL"
              }, null, 40, Fp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.title,
                onInput: (o) => T(t.id, { title: o.target.value }),
                placeholder: "Product title"
              }, null, 40, qp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.price,
                onInput: (o) => T(t.id, { price: o.target.value }),
                placeholder: "Price (e.g. €29.99)"
              }, null, 40, jp),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.buttonText,
                onInput: (o) => T(t.id, { buttonText: o.target.value }),
                placeholder: "Button text"
              }, null, 40, Kp),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.buttonUrl,
                onInput: (o) => T(t.id, { buttonUrl: o.target.value }),
                placeholder: "Button URL"
              }, null, 40, Yp)
            ])) : t.type === "liquid" ? (a(), s("div", Jp, [
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => T(t.id, { content: o.target.value }),
                placeholder: "Liquid / conditional code (e.g. {% if %})",
                rows: "4"
              }, null, 40, Gp),
              e("div", Xp, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`block:${t.id}`)
                }, d(Pe), 8, Qp),
                i.value === `block:${t.id}` ? (a(), s("div", Zp, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `block-var-liquid-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`block:${t.id}`, o)
                  }, d(o), 9, em))), 128))
                ])) : g("", !0)
              ]),
              l[55] || (l[55] = e("span", { class: "em-hint" }, "Advanced: conditional content. Rendered server-side at send.", -1))
            ])) : t.type === "code_block" ? (a(), s("div", tm, [
              e("input", {
                type: "text",
                class: "em-input",
                value: t.caption,
                onInput: (o) => T(t.id, { caption: o.target.value }),
                placeholder: "Caption (optional)"
              }, null, 40, am),
              e("textarea", {
                class: "em-textarea em-textarea--sm",
                value: t.content,
                onInput: (o) => T(t.id, { content: o.target.value }),
                placeholder: "Code or snippet to display to the recipient",
                rows: "5"
              }, null, 40, sm),
              e("div", nm, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (o) => S(`block:${t.id}`)
                }, d(Pe), 8, lm),
                i.value === `block:${t.id}` ? (a(), s("div", om, [
                  (a(!0), s(W, null, F(E.value, (o) => (a(), s("button", {
                    key: `block-var-code-${t.id}-${o}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (V) => x(`block:${t.id}`, o)
                  }, d(o), 9, im))), 128))
                ])) : g("", !0)
              ]),
              l[56] || (l[56] = e("span", { class: "em-hint" }, "Display formatted code/snippets (e.g. order ID, API key). Supports merge tags.", -1))
            ])) : t.type === "rss_feed" ? (a(), s("div", rm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.feedUrl,
                onInput: (o) => T(t.id, { feedUrl: o.target.value }),
                placeholder: "RSS feed URL"
              }, null, 40, dm),
              e("div", um, [
                l[57] || (l[57] = e("label", { class: "em-inline-label" }, "Max items", -1)),
                e("input", {
                  type: "number",
                  class: "em-input em-input--narrow",
                  min: "1",
                  max: "20",
                  value: t.maxItems ?? 5,
                  onInput: (o) => T(t.id, { maxItems: Number(o.target.value) || 5 })
                }, null, 40, cm)
              ]),
              l[58] || (l[58] = e("span", { class: "em-hint" }, "Feed content is pulled at send time.", -1))
            ])) : t.type === "dynamic_image" ? (a(), s("div", pm, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (o) => T(t.id, { imageUrl: o.target.value }),
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
              }, null, 40, mm),
              e("input", {
                type: "text",
                class: "em-input",
                value: t.alt,
                onInput: (o) => T(t.id, { alt: o.target.value }),
                placeholder: "Alt text"
              }, null, 40, vm),
              e("input", {
                type: "url",
                class: "em-input",
                value: t.fallbackUrl,
                onInput: (o) => T(t.id, { fallbackUrl: o.target.value }),
                placeholder: "Fallback URL (optional)"
              }, null, 40, bm)
            ])) : g("", !0),
            w.includes(t.type) ? (a(), s("div", fm, [
              e("div", gm, [
                e("button", {
                  type: "button",
                  class: de(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (o) => T(t.id, { alignment: "left" })
                }, [...l[59] || (l[59] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, hm),
                e("button", {
                  type: "button",
                  class: de(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (o) => T(t.id, { alignment: "center" })
                }, [...l[60] || (l[60] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, ym),
                e("button", {
                  type: "button",
                  class: de(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (o) => T(t.id, { alignment: "right" })
                }, [...l[61] || (l[61] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, km)
              ]),
              e("label", _m, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (o) => T(t.id, { fullWidth: o.target.checked })
                }, null, 40, wm),
                l[62] || (l[62] = e("span", null, "Full width", -1))
              ])
            ])) : g("", !0)
          ], 8, Pu))), 128))
        ]),
        e("div", $m, [
          l[63] || (l[63] = e("span", { class: "em-add-bar-label" }, "Add block", -1)),
          e("div", xm, [
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
      e("div", Cm, [
        l[68] || (l[68] = e("h4", { class: "em-strip-title" }, "Personalization", -1)),
        l[69] || (l[69] = e("p", { class: "em-strip-desc" }, "Merge tags for subject, preheader, and text blocks.", -1)),
        e("div", Sm, [
          l[66] || (l[66] = e("label", { class: "em-label" }, "Variable", -1)),
          e("div", Im, [
            Re(e("select", {
              "onUpdate:modelValue": l[26] || (l[26] = (t) => N.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), s(W, null, F(E.value, (t) => (a(), s("option", {
                key: t,
                value: t
              }, d(t), 9, Am))), 128))
            ], 512), [
              [Ve, N.value]
            ])
          ])
        ]),
        e("div", Bm, [
          l[67] || (l[67] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Um, [
            Re(e("input", {
              "onUpdate:modelValue": l[27] || (l[27] = (t) => D.value = t),
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. plan_name"
            }, null, 512), [
              [nt, D.value]
            ]),
            e("button", {
              type: "button",
              class: "em-chip",
              onClick: z
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Tm = /* @__PURE__ */ Ie(Lm, [["__scopeId", "data-v-64de8497"]]), Rm = { class: "keos-email-builder" }, Pm = { class: "kb-builder-top" }, Vm = { class: "kb-email-layout" }, Em = { class: "kb-email-sidebar" }, Om = {
  key: 0,
  class: "kb-email-form"
}, Nm = { class: "kb-email-form-head" }, Mm = { class: "kb-email-form-head-top" }, Dm = { class: "kb-email-health-pill" }, Wm = { class: "kb-wa-form-head-row" }, Hm = ["value"], zm = { class: "kb-email-health" }, Fm = { class: "kb-email-health-row" }, qm = { class: "kb-email-health-value" }, jm = { class: "kb-email-health-bar" }, Km = { class: "kb-email-canvas" }, Ym = {
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
}, pv = { key: 0 }, mv = { class: "kb-email-actions-right" }, vv = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, bv = { class: "kb-confirm-dialog" }, fv = { class: "kb-confirm-actions" }, gv = /* @__PURE__ */ Ce({
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
    function m(c) {
      if (!Array.isArray(c) || c.length === 0)
        return '<p style="margin:0 0 12px;color:#64748b;font-size:14px;">Add content blocks to design your email.</p>';
      const i = (B) => String(B).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), S = [
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
      ], x = (B, u) => {
        if (!S.includes(u.type)) return B;
        const l = u.alignment || "left", t = !!u.fullWidth;
        return `<div style="text-align:${l};${t ? "width:100%;" : ""}">${B}</div>`;
      }, z = [];
      for (const B of c)
        switch (B.type) {
          case "heading": {
            const u = Math.min(3, Math.max(1, Number(B.level) || 1)), l = i(B.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            z.push(
              x(
                `<h${u} style="margin:0 0 12px;font-size:${u === 1 ? "22" : u === 2 ? "18" : "16"}px;font-weight:600;line-height:1.3;color:#0f172a;">${l || "Heading"}</h${u}>`,
                B
              )
            );
            break;
          }
          case "paragraph": {
            const u = i(B.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            z.push(
              x(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${u || "Paragraph"}</p>`,
                B
              )
            );
            break;
          }
          case "image": {
            const u = (B.src || "").trim(), l = i(B.alt || ""), t = (B.linkUrl || "").trim(), o = !!B.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", V = u ? `<img src="${i(u)}" alt="${l}" style="${o}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            z.push(
              x(
                `<div style="margin:0 0 12px;">${t ? `<a href="${i(t)}" style="color:#2563eb;">${V}</a>` : V}</div>`,
                B
              )
            );
            break;
          }
          case "button": {
            const u = i(B.text || "Button"), l = (B.url || "#").trim(), t = Math.min(24, Math.max(0, Number(B.borderRadius) ?? 8)), P = !!B.fullWidth, o = !!B.ghost, V = o ? "transparent" : "#0f172a", M = o ? "#0f172a" : "#fff", xe = o ? "2px solid #0f172a" : "none", ze = P ? "block" : "inline-block", qe = P ? "100%" : "auto";
            z.push(
              x(
                `<p style="margin:0 0 12px;"><a href="${i(l)}" style="display:${ze};width:${qe};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${V};color:${M};border:${xe};text-decoration:none;font-size:14px;font-weight:600;border-radius:${t}px;overflow-wrap:anywhere;">${u}</a></p>`,
                B
              )
            );
            break;
          }
          case "divider": {
            const u = Math.min(8, Math.max(1, Number(B.thickness) || 1)), l = (B.color || "#e2e8f0").trim() || "#e2e8f0", t = B.lineStyle || "solid";
            z.push(
              x(
                `<hr style="margin:16px 0;border:0;border-top:${u}px ${t} ${l};" />`,
                B
              )
            );
            break;
          }
          case "spacer": {
            const u = Math.min(120, Math.max(8, Number(B.height) || 24));
            z.push(x(`<div style="height:${u}px;"></div>`, B));
            break;
          }
          case "footer": {
            const u = i(B.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = (B.unsubscribeUrl || "").trim(), t = i(B.companyAddress || "");
            z.push(
              x(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${u || "Footer"}` + (l ? `<p style="margin:8px 0 0;"><a href="${i(l)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (t ? `<p style="margin:4px 0 0;">${t}</p>` : "") + "</div>",
                B
              )
            );
            break;
          }
          case "list": {
            const u = B.style === "numbered" ? "ol" : "ul", t = (Array.isArray(B.items) ? B.items : []).map(
              (P) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${i(String(P)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            z.push(
              x(
                `<${u} style="margin:0 0 12px;padding-left:24px;">${t || "<li>Item</li>"}</${u}>`,
                B
              )
            );
            break;
          }
          case "quote": {
            const u = i(B.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = {
              default: "border-left:4px solid #e2e8f0;background:#f8fafc;color:#334155;",
              info: "border-left:4px solid #3b82f6;background:#eff6ff;color:#1e40af;",
              success: "border-left:4px solid #22c55e;background:#f0fdf4;color:#166534;",
              warning: "border-left:4px solid #f59e0b;background:#fffbeb;color:#b45309;"
            }, t = l[B.style || "default"] || l.default;
            z.push(
              x(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${t}font-size:14px;line-height:1.6;">${u || "Quote"}</div>`,
                B
              )
            );
            break;
          }
          case "social": {
            const l = (Array.isArray(B.links) ? B.links : []).filter((t) => (t.url || "").trim());
            if (l.length === 0)
              z.push(
                x(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  B
                )
              );
            else {
              const t = (P) => `<a href="${i((P.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${i(P.platform || "Link")}</a>`;
              z.push(
                x(
                  `<div style="margin:0 0 12px;">${l.map(t).join("")}</div>`,
                  B
                )
              );
            }
            break;
          }
          case "video": {
            const u = (B.thumbnailUrl || "").trim(), l = (B.videoUrl || "#").trim(), t = i(B.caption || ""), o = !!B.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", V = u ? `<img src="${i(u)}" alt="Video" style="${o}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            z.push(
              x(
                `<div style="margin:0 0 12px;"><a href="${i(l)}" style="display:block;color:inherit;">${V}</a>` + (t ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${t}</p>` : "") + "</div>",
                B
              )
            );
            break;
          }
          case "link_list": {
            const u = Array.isArray(B.links) ? B.links : [], l = i(B.separator || " | "), P = u.filter(
              (o) => (o.text || o.url) && (o.url || "").trim()
            ).map(
              (o) => `<a href="${i((o.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${i(o.text || "Link")}</a>`
            );
            z.push(
              x(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${P.join(l)}</p>`,
                B
              )
            );
            break;
          }
          case "columns": {
            const u = i(B.leftContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = i(B.rightContent || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            z.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${u || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const u = Math.min(4, Math.max(1, Number(B.columnCount) || 2)), l = Array.isArray(B.cells) ? B.cells.slice(0, u) : [], t = 100 / u, P = Array.from({ length: u }, (o, V) => {
              const M = l[V] ?? "", xe = i(M).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${t}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${xe || "—"}</td>`;
            }).join("");
            z.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${P}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const u = Array.isArray(B.links) ? B.links : [], l = i(B.separator || " | "), P = u.filter(
              (o) => (o.text || o.url) && (o.url || "").trim()
            ).map(
              (o) => `<a href="${i((o.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${i(o.text || "Link")}</a>`
            );
            z.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${P.length ? P.join(l) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const l = (Array.isArray(B.items) ? B.items : []).map((t) => {
              const P = i(t.title || "Section"), o = i(t.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${P}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${o}</div></details>`;
            }).join("");
            z.push(
              l ? `<div style="margin:0 0 12px;">${l}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const l = (Array.isArray(B.slides) ? B.slides : []).filter(
              (t) => (t.imageUrl || "").trim()
            );
            if (l.length === 0)
              z.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const t = l[0], P = `<img src="${i(t.imageUrl)}" alt="${i(t.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, o = (t.linkUrl || "").trim();
              z.push(
                `<div style="margin:0 0 12px;">${o ? `<a href="${i(o)}">${P}</a>` : P}` + (l.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${l.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const u = i(B.label || "Offer ends in"), l = B.endDateTime ? new Date(B.endDateTime).toLocaleString() : "—";
            z.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${u}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${l}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const u = (B.imageUrl || "").trim(), l = i(B.title || "Product"), t = i(B.price || ""), P = i(B.buttonText || "Buy now"), o = (B.buttonUrl || "#").trim(), V = u ? `<img src="${i(u)}" alt="${i(B.alt || l)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            z.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${V}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${l}</p>` + (t ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${t}</p>` : "") + `<a href="${i(o)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${P}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const u = i((B.content || "").trim());
            z.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${u || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const u = (B.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = i((B.caption || "").trim());
            z.push(
              '<div style="margin:0 0 12px;">' + (l ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${l}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${u || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const u = (B.feedUrl || "").trim(), l = Math.min(20, Math.max(1, Number(B.maxItems) ?? 5));
            z.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (u ? `<p style="margin:0;font-size:12px;color:#64748b;">${i(u)} · max ${l} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const u = (B.imageUrl || "").trim(), l = (B.fallbackUrl || "").trim(), t = i(B.alt || "Dynamic image");
            u ? z.push(
              `<div style="margin:0 0 12px;"><img src="${i(u)}" alt="${t}" style="max-width:100%;height:auto;display:block;border:0;" />` + (l ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${i(l)}</p>` : "") + "</div>"
            ) : z.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return z.join("");
    }
    function b(c) {
      return /<\s*html[\s>]/i.test(c) || /<!doctype\s+html/i.test(c);
    }
    function w(c) {
      const i = c.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return i ? i[1] : c;
    }
    function _(c, i, S) {
      const x = (i || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), z = (S || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${x}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        z ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${z}</div>` : "",
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;border-collapse:collapse;">',
        '<tr><td align="center" style="padding:24px 12px;">',
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;border-collapse:separate;">',
        `<tr><td style="padding:24px;">${c}</td></tr>`,
        "</table>",
        "</td></tr>",
        "</table>",
        "</body>",
        "</html>"
      ].join("");
    }
    const y = n, C = r, {
      campaign: I,
      dirty: E,
      customValidatorErrors: N,
      getValidationWithWarnings: D,
      update: H,
      updateMessage: Z,
      undo: q,
      redo: me,
      canUndo: X,
      canRedo: G,
      resetMessage: O,
      hooks: re
    } = Ge({
      initial: y.modelValue,
      hooks: {
        ...y.hooks,
        customValidators: async (c) => {
          var z, B, u;
          const i = [];
          (z = c.name) != null && z.trim() || i.push("Template name is required");
          const S = c.message;
          (B = S == null ? void 0 : S.subject) != null && B.trim() || i.push("Subject is required");
          const x = (u = y.hooks) != null && u.customValidators ? await y.hooks.customValidators(c) : [];
          return [...i, ...x];
        }
      },
      onDirty: () => C("change", I.value)
    }), { lastSavedAt: ge } = Xe(I, { channel: "email" });
    function $e(c) {
      (c.metaKey || c.ctrlKey) && c.key === "z" && (c.preventDefault(), c.shiftKey ? me() : q());
    }
    je(() => {
      window.addEventListener("keydown", $e);
    }), Ke(() => {
      window.removeEventListener("keydown", $e);
    }), Ue(
      I,
      (c) => C("update:modelValue", {
        ...c,
        message: {
          ...c.message,
          html: ye.value
        }
      }),
      { deep: !0 }
    );
    const fe = ne(), ae = ne(!0);
    async function j() {
      if (re.estimateReach)
        try {
          fe.value = await re.estimateReach(I.value.audience);
        } catch {
          fe.value = void 0;
        }
      re.canSend && (ae.value = await Promise.resolve(re.canSend()));
    }
    j(), Ue(() => I.value.audience, j, { deep: !0 });
    const v = h(() => (N.value, D(fe.value))), $ = h(() => v.value.blockingErrors), U = h(() => v.value.warnings), oe = h(() => v.value.valid), ee = h(() => {
      var x, z, B;
      const c = I.value.message, i = [
        !!((x = I.value.name) != null && x.trim()),
        !!((z = c.subject) != null && z.trim()),
        !!((B = c.from_address) != null && B.trim()),
        !!(Array.isArray(c.blocks) ? c.blocks.length : (c.html ?? "").trim().length),
        !!I.value.template_type
      ], S = i.filter(Boolean).length;
      return Math.round(S / i.length * 100);
    }), T = h(() => ee.value >= 90 ? "Production ready" : ee.value >= 70 ? "Strong draft" : ee.value >= 40 ? "In progress" : "Needs setup"), be = h(
      () => I.value.template_type ?? "transactional"
    ), ue = ne(""), _e = ne(!1), we = ne(null), R = h(() => {
      const c = ue.value;
      return c ? De.find((i) => i.id === c) ?? null : null;
    });
    function k(c) {
      const i = I.value, S = c.campaign.message ? { ...i.message, ...c.campaign.message } : i.message;
      H({
        ...c.campaign,
        message: S
      }), we.value = null, _e.value = !1;
    }
    function A(c) {
      const i = c.target.value;
      if (!i) return;
      const S = ft.find((x) => x.id === i);
      S && (E.value ? (we.value = S, _e.value = !0) : k(S), c.target.value = "");
    }
    function Y(c) {
      H({ template_type: c });
    }
    function le(c) {
      H({
        name: c,
        tracking: { ...I.value.tracking ?? {}, campaign_name: c }
      });
    }
    const he = h(
      () => I.value.message.subject ?? ""
    ), ie = h(
      () => I.value.message.preview_text ?? ""
    ), se = h(
      () => I.value.message.html ?? ""
    ), p = h(
      () => I.value.message.from_name ?? "Your App"
    ), L = h(
      () => I.value.message.from_address ?? "notifications@example.com"
    ), Q = h(
      () => I.value.message.blocks ?? []
    ), te = h(() => {
      const c = I.value.message, i = (c.html ?? "").trim(), x = (Array.isArray(c.blocks) ? c.blocks : []).some((z) => {
        if (!z || typeof z != "object") return !1;
        const B = (z.type ?? "").toString();
        if (B === "paragraph" || B === "heading" || B === "quote" || B === "footer") {
          const u = (z.content ?? "").toString().trim();
          return !(!u || u === "Heading" || u.startsWith("Your text here."));
        }
        return B === "image" || B === "video" || B === "dynamic_image" ? !!(z.src ?? z.imageUrl ?? z.thumbnailUrl ?? "").toString().trim() : B === "button" ? !!(z.text ?? "").toString().trim() : !0;
      });
      return !!((c.subject ?? "").toString().trim() || (c.preview_text ?? "").toString().trim() || i || x);
    }), ce = h(() => {
      const c = Q.value;
      if (Array.isArray(c) && c.length > 0)
        return m(c);
      const i = se.value;
      return i && i.trim() ? b(i) ? w(i) : i : m([]);
    }), ye = h(() => {
      const c = Q.value;
      if (Array.isArray(c) && c.length > 0)
        return _(
          m(c),
          he.value,
          ie.value
        );
      const i = se.value;
      return i && i.trim() ? b(i) ? i : _(i, he.value, ie.value) : _(
        m([]),
        he.value,
        ie.value
      );
    }), Se = h(() => {
      const c = he.value;
      return R.value ? Oe(c, R.value.data) : c;
    }), Le = h(() => {
      const c = ie.value;
      return R.value ? Oe(c, R.value.data) : c;
    }), Te = h(() => {
      const c = ce.value;
      return R.value ? Oe(c, R.value.data) : c;
    }), Ae = ne("desktop");
    function J() {
      oe.value && C("save", {
        ...I.value,
        message: {
          ...I.value.message,
          html: ye.value
        }
      });
    }
    return (c, i) => {
      var S;
      return a(), s("div", Rm, [
        e("div", Pm, [
          Be(Qe, {
            "campaign-name": f(I).name,
            status: f(I).status,
            dirty: f(E),
            "last-saved-at": f(ge),
            "can-undo": f(X),
            "can-redo": f(G),
            "slugify-name": y.enforceSlugName,
            "onUpdate:campaignName": le,
            onUndo: f(q),
            onRedo: f(me)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          $.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: ve({
              background: f(ke).dangerBg,
              border: `1px solid ${f(ke).dangerBorder}`,
              borderRadius: `${f(Ne).input}px`,
              padding: `${f(pe)[16]}px ${f(pe)[24]}px`,
              marginBottom: `${f(pe)[24]}px`
            })
          }, [
            e("ul", {
              style: ve({ margin: 0, paddingLeft: "1.25rem", color: f(ke).danger })
            }, [
              (a(!0), s(W, null, F($.value, (x) => (a(), s("li", {
                key: x.message
              }, d(x.message), 1))), 128))
            ], 4)
          ], 4)) : g("", !0)
        ]),
        e("div", Vm, [
          e("aside", Em, [
            n.disabledSections.includes("email") ? g("", !0) : (a(), s("div", Om, [
              e("div", Nm, [
                e("div", Mm, [
                  i[8] || (i[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Dm, d(T.value), 1)
                ]),
                e("div", Wm, [
                  Be(dt, {
                    "template-type": be.value,
                    onUpdate: Y
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: A
                  }, [
                    i[9] || (i[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, F(f(ft), (x) => (a(), s("option", {
                      key: x.id,
                      value: x.id
                    }, d(x.label), 9, Hm))), 128))
                  ], 32)
                ]),
                e("div", zm, [
                  e("div", Fm, [
                    i[10] || (i[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", qm, d(ee.value) + "%", 1)
                  ]),
                  e("div", jm, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: ve({ width: `${ee.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Be(Tm, {
                message: f(I).message,
                "variable-options": n.variableOptions,
                "show-reset": !0,
                onUpdate: f(Z),
                onReset: i[0] || (i[0] = (x) => f(O)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", Km, [
            !n.designOnly && f(I).audience.test_mode ? (a(), s("div", Ym, [...i[11] || (i[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              K(" Test mode — only your test segment will receive this. ", -1)
            ])])) : g("", !0),
            e("div", Jm, [
              e("div", Gm, [
                e("label", Xm, [
                  i[13] || (i[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Re(e("select", {
                    "onUpdate:modelValue": i[1] || (i[1] = (x) => ue.value = x),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    i[12] || (i[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, F(f(De), (x) => (a(), s("option", {
                      key: x.id,
                      value: x.id
                    }, d(x.label), 9, Qm))), 128))
                  ], 512), [
                    [Ve, ue.value]
                  ])
                ]),
                e("div", Zm, [
                  i[14] || (i[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, d(Ae.value), 1)
                ])
              ]),
              e("div", ev, [
                e("button", {
                  type: "button",
                  class: de(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ae.value === "desktop"
                  }]),
                  onClick: i[2] || (i[2] = (x) => Ae.value = "desktop")
                }, [...i[15] || (i[15] = [
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
                  class: de(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ae.value === "mobile"
                  }]),
                  onClick: i[3] || (i[3] = (x) => Ae.value = "mobile")
                }, [...i[16] || (i[16] = [
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
                class: de(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Ae.value === "mobile",
                  "kb-email-preview-frame--empty": !te.value
                }])
              }, [
                e("div", tv, [
                  e("div", av, [
                    e("span", sv, d(p.value), 1),
                    e("span", nv, "<" + d(L.value) + ">", 1)
                  ]),
                  e("div", lv, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: Se.value || "No subject"
                    }, d(Se.value || "No subject"), 9, ov),
                    Le.value ? (a(), s("span", iv, " — " + d(Le.value), 1)) : g("", !0)
                  ])
                ]),
                e("div", rv, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: Te.value
                  }, null, 8, dv)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", uv, [
          U.value.length > 0 ? (a(), s("div", cv, [
            i[17] || (i[17] = e("strong", null, "Warning:", -1)),
            K(" " + d((S = U.value[0]) == null ? void 0 : S.message) + " ", 1),
            U.value.length > 1 ? (a(), s("span", pv, " (+" + d(U.value.length - 1) + " more) ", 1)) : g("", !0)
          ])) : g("", !0),
          e("div", mv, [
            n.showDuplicate ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: i[4] || (i[4] = (x) => C("duplicate", JSON.parse(JSON.stringify(f(I)))))
            }, " Duplicate ")) : g("", !0),
            n.showSave ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: J
            }, " Save ")) : g("", !0),
            n.showClose ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: i[5] || (i[5] = (x) => C("edit"))
            }, " Close ")) : g("", !0)
          ])
        ]),
        _e.value ? (a(), s("div", vv, [
          e("div", bv, [
            i[18] || (i[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            i[19] || (i[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", fv, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: i[6] || (i[6] = (x) => {
                  _e.value = !1, we.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: i[7] || (i[7] = (x) => we.value && k(we.value))
              }, " Replace ")
            ])
          ])
        ])) : g("", !0)
      ]);
    };
  }
}), Ot = /* @__PURE__ */ Ie(gv, [["__scopeId", "data-v-f45fc2a3"]]), hv = { class: "kb-shell" }, yv = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, kv = ["aria-selected", "onClick"], _v = { class: "kb-shell__meta" }, wv = ["href"], $v = { class: "kb-shell__body" }, xv = /* @__PURE__ */ Ce({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(n, { emit: r }) {
    const m = r, b = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (w, _) => (a(), s("div", hv, [
      e("header", {
        class: "kb-shell__header",
        style: ve({ padding: `${f(pe)[12]}px ${f(pe)[24]}px`, borderBottom: `1px solid ${f(ke).neutral.border}`, background: f(ke).neutral.bg })
      }, [
        _[0] || (_[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", yv, [
          (a(), s(W, null, F(b, (y) => e("button", {
            key: y.id,
            type: "button",
            class: de(["kb-shell__channel", { "kb-shell__channel--active": n.channel === y.id }]),
            role: "tab",
            "aria-selected": n.channel === y.id,
            onClick: (C) => m("switch-channel", y.id)
          }, d(y.label), 11, kv)), 64))
        ]),
        e("div", _v, [
          n.environment ? (a(), s("span", {
            key: 0,
            class: "kb-shell__env",
            style: ve({ padding: "2px 8px", borderRadius: `${f(Ne).input}px`, fontSize: "0.75rem", background: f(ke).neutral.bg, color: f(ke).neutral.textMuted })
          }, d(n.environment), 5)) : g("", !0),
          n.helpUrl ? (a(), s("a", {
            key: 1,
            href: n.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: ve({ color: f(ke).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, wv)) : g("", !0)
        ])
      ], 4),
      e("div", $v, [
        Ee(w.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Cv = /* @__PURE__ */ Ie(xv, [["__scopeId", "data-v-0df30803"]]), Sv = {
  class: "kb-outline",
  "aria-label": "Sections"
}, Iv = {
  class: "kb-outline__list",
  style: { padding: 0, margin: 0, listStyle: "none" }
}, Av = ["onClick"], Bv = /* @__PURE__ */ Ce({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(n) {
    var _;
    const r = n, m = ne(((_ = r.items[0]) == null ? void 0 : _.id) ?? "");
    let b = null;
    function w(y) {
      const C = document.getElementById(y);
      C && C.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return je(() => {
      const y = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      y && (b = new IntersectionObserver(
        (C) => {
          for (const I of C)
            if (I.isIntersecting) {
              const E = I.target.getAttribute("data-outline-id");
              E && (m.value = E);
            }
        },
        { root: y === document ? null : y, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((C) => {
        const I = document.getElementById(C.id);
        I && (b == null || b.observe(I));
      }));
    }), Ke(() => {
      b == null || b.disconnect();
    }), Ue(
      () => r.items,
      (y) => {
        y.length && !m.value && (m.value = y[0].id);
      },
      { immediate: !0 }
    ), (y, C) => (a(), s("nav", Sv, [
      e("ul", Iv, [
        (a(!0), s(W, null, F(n.items, (I) => (a(), s("li", {
          key: I.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: de(["kb-outline__btn", { "kb-outline__btn--active": m.value === I.id }]),
            style: ve({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${f(pe)[8]}px ${f(pe)[12]}px`,
              border: "none",
              borderRadius: `${f(Ne).input}px`,
              background: m.value === I.id ? f(ke).neutral.bg : "transparent",
              color: m.value === I.id ? "#0f172a" : f(ke).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: m.value === I.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (E) => w(I.id)
          }, d(I.label), 15, Av)
        ]))), 128))
      ])
    ]));
  }
}), Uv = /* @__PURE__ */ Ie(Bv, [["__scopeId", "data-v-25c37675"]]), Lv = ["id"], Tv = {
  key: 1,
  class: "kb-form-shell__head"
}, Rv = /* @__PURE__ */ Ce({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(n) {
    return (r, m) => (a(), s("div", {
      class: "kb-form-shell",
      id: n.sectionId ?? void 0,
      style: ve({
        padding: `${f(pe)[24]}px ${f(pe)[24]}px ${f(pe)[32]}px`,
        marginBottom: 0
      })
    }, [
      n.label ? (a(), s("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: ve({ marginBottom: f(pe)[24], paddingBottom: f(pe)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: ve({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: f(pe)[12] })
        }, d(n.label), 5),
        Ee(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), s("div", Tv, [
        Ee(r.$slots, "head", {}, void 0, !0)
      ])),
      Ee(r.$slots, "default", {}, void 0, !0)
    ], 12, Lv));
  }
}), Pv = /* @__PURE__ */ Ie(Rv, [["__scopeId", "data-v-6504df41"]]), Vv = /* @__PURE__ */ Ce({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(n) {
    return (r, m) => (a(), s("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: ve({
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
}), Ev = /* @__PURE__ */ Ce({
  __name: "BuilderTopShell",
  setup(n) {
    return (r, m) => (a(), s("div", {
      class: "kb-top-shell",
      style: ve({
        marginLeft: f(pe)[24],
        marginRight: f(pe)[24]
      })
    }, [
      Ee(r.$slots, "header"),
      Ee(r.$slots, "errors"),
      Ee(r.$slots, "warnings"),
      Ee(r.$slots, "default")
    ], 4));
  }
});
function Ov(n) {
  n.component("KeosNotificationBuilder", Pt), n.component("KeosWhatsAppBuilder", Vt), n.component("KeosSmsBuilder", Et), n.component("KeosEmailBuilder", Ot), n.component("BuilderShell", Cv), n.component("BuilderOutline", Uv), n.component("BuilderVersionHistoryModal", Rt), n.component("BuilderFormShell", Pv), n.component("BuilderActionsBar", Vv), n.component("BuilderTopShell", Ev);
}
const Mv = {
  install: Ov,
  KeosNotificationBuilder: Pt,
  KeosWhatsAppBuilder: Vt,
  KeosSmsBuilder: Et,
  KeosEmailBuilder: Ot
};
export {
  Vv as BuilderActionsBar,
  Pv as BuilderFormShell,
  Uv as BuilderOutline,
  Cv as BuilderShell,
  Ev as BuilderTopShell,
  Rt as BuilderVersionHistoryModal,
  De as DEFAULT_SAMPLE_PROFILES,
  Ot as KeosEmailBuilder,
  Pt as KeosNotificationBuilder,
  Et as KeosSmsBuilder,
  Vt as KeosWhatsAppBuilder,
  Mv as default,
  Ov as install,
  Oe as renderTemplatePreview,
  Xe as useAutosave,
  Ge as useCampaignState
};
//# sourceMappingURL=index.js.map
