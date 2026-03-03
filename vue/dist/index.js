import { ref as se, watch as Be, computed as y, defineComponent as we, openBlock as a, createElementBlock as s, normalizeStyle as me, unref as g, createElementVNode as e, normalizeClass as re, Fragment as W, renderList as q, toDisplayString as d, createTextVNode as G, createCommentVNode as h, withDirectives as Te, vModelSelect as Ve, vModelText as nt, createStaticVNode as He, withKeys as Ot, onMounted as je, onUnmounted as Ke, createVNode as Ae, createBlock as Mt, withModifiers as qe, renderSlot as Ee } from "vue";
const de = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32
}, Oe = {
  input: 6,
  card: 12,
  button: 6
}, fe = {
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
fe.neutral.textMuted, fe.neutral.textMeta;
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
const qt = 1e5;
function Ft(n, r) {
  var _, m, A;
  const v = [], b = r ?? n.audience.estimated_reach;
  return b !== void 0 && b >= qt && v.push({
    message: `Estimated reach is very high (${b.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), n.tracking && !((_ = n.tracking.campaign_name) != null && _.trim()) && !((m = n.name) != null && m.trim()) && v.push({
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
function Ut(n) {
  const r = [];
  return n.schema_version || r.push(Bt("Missing schema_version")), {
    valid: r.length === 0,
    errors: r
  };
}
function jt(n, r) {
  const v = Ut(n), b = Ft(n, r);
  return {
    valid: v.valid,
    errors: [
      ...v.errors,
      ...b.map((_) => Bt(_.message, _.severity))
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
  const { title: r, body: v } = n, b = Me(r || "", Ye.title), _ = Me(v || "", Ye.body);
  return {
    title: b.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function Gt(n) {
  const { title: r, body: v } = n, b = Me(r || "", Ye.title), _ = Me(v || "", Ye.body);
  return {
    title: b.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: _.truncated,
    expanded: !0
  };
}
function Xt(n, r = {}) {
  const v = r.expanded ? Gt(n) : Jt(n);
  return r.darkMode !== void 0 && (v.darkMode = r.darkMode), v;
}
const ut = Je.ios;
function Lt(n) {
  const { title: r, body: v } = n, b = Me(r || "", ut.title), _ = Me(v || "", ut.body);
  return {
    title: b.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
    bodyTruncated: _.truncated,
    expanded: !1
  };
}
function Qt(n) {
  return Lt(n);
}
function Zt(n, r = {}) {
  const v = r.variant === "lockscreen" ? Qt(n) : Lt(n);
  return r.darkMode !== void 0 && (v.darkMode = r.darkMode), v;
}
const ct = Je.web;
function pt(n) {
  const { title: r, body: v } = n, b = Me(r || "", ct.title), _ = Me(v || "", ct.body);
  return {
    title: b.text,
    body: _.text,
    imageUrl: n.imageUrl,
    titleTruncated: b.truncated,
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
    At(n.initial ?? zt())
  ), v = n.hooks ?? {}, b = se(!1), _ = se([]);
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
  const m = se([]), A = se([]);
  function x() {
    const U = Ze(r.value);
    m.value = [...m.value.slice(-19), U], A.value = [];
  }
  const S = y(() => m.value.length > 0), P = y(() => A.value.length > 0);
  function O() {
    m.value.length !== 0 && (A.value = [Ze(r.value), ...A.value], r.value = m.value[m.value.length - 1], m.value = m.value.slice(0, -1));
  }
  function D() {
    A.value.length !== 0 && (m.value = [...m.value, Ze(r.value)], r.value = A.value[0], A.value = A.value.slice(1));
  }
  Be(
    r,
    () => {
      var U;
      b.value = !0, (U = n.onDirty) == null || U.call(n);
    },
    { deep: !0 }
  );
  const H = y(() => Ut(r.value));
  function Q(U) {
    const le = jt(r.value, U), Y = ea(_.value), L = [...Kt(le), ...Y], ce = [...le.errors, ...Y], R = le.valid && Y.length === 0;
    return {
      ...le,
      errors: ce,
      valid: R,
      blockingErrors: L,
      warnings: Yt(le)
    };
  }
  function j(U) {
    x(), r.value = { ...r.value, ...U };
  }
  function ue(U) {
    x(), r.value = {
      ...r.value,
      audience: { ...r.value.audience, ...U }
    };
  }
  function K(U) {
    x(), r.value = {
      ...r.value,
      message: { ...r.value.message, ...U }
    };
  }
  function ee(U) {
    x(), r.value = {
      ...r.value,
      delivery: { ...r.value.delivery, ...U }
    };
  }
  function N(U) {
    x(), r.value = {
      ...r.value,
      tracking: r.value.tracking ? { ...r.value.tracking, ...U } : { campaign_name: "", tags: [], ab_test: !1, ...U }
    };
  }
  function oe(U) {
    x(), r.value = {
      ...r.value,
      message: { ...ot(), ...U }
    };
  }
  function ae(U) {
    x(), r.value = {
      ...r.value,
      delivery: { ...it(), ...U }
    };
  }
  function he(U) {
    x(), r.value = {
      ...r.value,
      tracking: { ...rt(), ...U }
    };
  }
  function ve(U) {
    x(), r.value = {
      ...r.value,
      audience: { ...lt(), ...U }
    };
  }
  const be = y(() => ({
    title: r.value.message.title,
    body: r.value.message.body,
    imageUrl: r.value.message.image_url
  }));
  function z(U, le) {
    const Y = be.value;
    let L;
    switch (U) {
      case "android":
        L = Xt(Y, { expanded: le == null ? void 0 : le.expanded });
        break;
      case "ios":
        L = Zt(Y);
        break;
      case "web":
        L = pt(Y);
        break;
      default:
        L = pt(Y);
    }
    const ce = r.value.message.actions ?? [], R = r.value.message.location;
    return { ...L, actions: ce, location: R ?? void 0 };
  }
  const f = Je;
  async function w() {
    return v.customValidators ? v.customValidators(r.value) : [];
  }
  return {
    campaign: r,
    dirty: b,
    validation: H,
    /** Reactive ref updated by hooks.customValidators; read this in computed so validation re-runs when async validators resolve. */
    customValidatorErrors: _,
    getValidationWithWarnings: Q,
    update: j,
    updateAudience: ue,
    updateMessage: K,
    updateDelivery: ee,
    updateTracking: N,
    undo: O,
    redo: D,
    canUndo: S,
    canRedo: P,
    resetMessage: oe,
    resetDelivery: ae,
    resetTracking: he,
    resetAudience: ve,
    getPreview: z,
    previewInput: be,
    characterLimits: f,
    runCustomValidators: w,
    hooks: v
  };
}
const ta = "keos-draft", aa = 2e3;
function sa(n, r) {
  return `${ta}-${n}-${r}`;
}
function Xe(n, r) {
  const v = r.channel, b = y(
    () => {
      var O, D;
      return sa(
        v,
        r.key ?? ((O = n.value) == null ? void 0 : O.id) ?? ((D = n.value) == null ? void 0 : D.name) ?? "draft"
      );
    }
  ), _ = se(null);
  let m = null;
  function A() {
    try {
      const O = JSON.stringify(n.value);
      typeof window < "u" && window.localStorage && (window.localStorage.setItem(b.value, O), _.value = /* @__PURE__ */ new Date());
    } catch {
    }
  }
  function x() {
    try {
      typeof window < "u" && window.localStorage && window.localStorage.removeItem(b.value);
    } catch {
    }
  }
  function S() {
    try {
      if (typeof window > "u" || !window.localStorage) return null;
      const O = window.localStorage.getItem(b.value);
      if (!O) return null;
      const D = JSON.parse(O);
      return At(D);
    } catch {
      return null;
    }
  }
  function P() {
    return r.enabled === void 0 ? !0 : typeof r.enabled == "boolean" ? r.enabled : r.enabled.value;
  }
  return Be(
    n,
    () => {
      P() && (m && clearTimeout(m), m = setTimeout(() => {
        m = null, A();
      }, aa));
    },
    { deep: !0 }
  ), {
    lastSavedAt: _,
    clearDraft: x,
    getDraft: S,
    persist: A
  };
}
const na = { class: "kb-header__row" }, la = ["value"], oa = { class: "kb-header__actions" }, ia = ["disabled"], ra = ["disabled"], da = ["value"], ua = ["value"], ca = /* @__PURE__ */ we({
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
    ], b = n, _ = r, m = () => !!(b.campaignName || "").trim();
    function A(P) {
      return b.slugifyName ? P.trim().replace(/\s+/g, "-") : P;
    }
    function x(P) {
      return P.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
    }
    function S(P) {
      const O = {
        draft: { bg: "#f1f5f9", color: "#475569" },
        ready_for_review: { bg: "#dbeafe", color: "#1e40af" },
        approved: { bg: "#dcfce7", color: "#166534" },
        archived: { bg: "#f1f5f9", color: "#64748b" }
      };
      return O[P] ?? O.draft;
    }
    return (P, O) => (a(), s("header", {
      class: "kb-header",
      style: me({
        padding: `${g(de)[16]}px 0`,
        borderBottom: `1px solid ${g(fe).neutral.border}`,
        marginBottom: `${g(de)[16]}px`
      })
    }, [
      e("div", na, [
        e("div", {
          class: re(["kb-header__name-section", { "kb-header__name-section--filled": m() }])
        }, [
          O[4] || (O[4] = e("label", { class: "kb-header__name-label" }, "Template Name", -1)),
          e("input", {
            type: "text",
            class: "kb-header__name",
            value: n.campaignName,
            placeholder: "Name this template (e.g. Spring Sale Push)",
            style: { fontSize: "1rem", fontWeight: 600 },
            onInput: O[0] || (O[0] = (D) => _("update:campaignName", A(D.target.value))),
            "aria-label": "Campaign name"
          }, null, 40, la),
          O[5] || (O[5] = e("span", { class: "kb-header__name-helper" }, " This name is used as your template/campaign label. ", -1))
        ], 2),
        e("div", oa, [
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Undo (⌘Z)",
            "aria-label": "Undo",
            disabled: !n.canUndo,
            onClick: O[1] || (O[1] = (D) => _("undo"))
          }, " Undo ", 8, ia),
          e("button", {
            type: "button",
            class: "kb-header__btn",
            title: "Redo (⇧⌘Z)",
            "aria-label": "Redo",
            disabled: !n.canRedo,
            onClick: O[2] || (O[2] = (D) => _("redo"))
          }, " Redo ", 8, ra)
        ]),
        n.workflowStatus !== void 0 ? (a(), s("select", {
          key: 0,
          value: n.workflowStatus,
          class: "kb-header__status-select",
          style: me({
            padding: `${g(de)[4]}px ${g(de)[8]}px`,
            borderRadius: `${g(Oe).input}px`,
            fontSize: "0.8125rem",
            border: "1px solid transparent",
            cursor: "pointer",
            fontWeight: 500,
            ...S(n.workflowStatus)
          }),
          "aria-label": "Workflow status",
          onChange: O[3] || (O[3] = (D) => _("update:workflowStatus", D.target.value))
        }, [
          (a(), s(W, null, q(v, (D) => e("option", {
            key: D.value,
            value: D.value
          }, d(D.label), 9, ua)), 64))
        ], 44, da)) : (a(), s("span", {
          key: 1,
          class: "kb-header__status",
          style: me({
            padding: `${g(de)[4]}px ${g(de)[8]}px`,
            borderRadius: `${g(Oe).input}px`,
            background: g(fe).neutral.bg,
            fontSize: "0.8125rem",
            color: g(fe).neutral.textMuted
          })
        }, d(n.status), 5))
      ]),
      e("div", {
        class: "kb-header__indicator",
        style: me({ fontSize: "0.8125rem", color: g(fe).neutral.textMuted, marginTop: `${g(de)[4]}px` })
      }, [
        n.saving ? (a(), s(W, { key: 0 }, [
          G("Saving…")
        ], 64)) : n.dirty ? (a(), s(W, { key: 1 }, [
          G("Unsaved changes")
        ], 64)) : n.lastSavedAt ? (a(), s(W, { key: 2 }, [
          G("Last saved at " + d(x(n.lastSavedAt)), 1)
        ], 64)) : h("", !0)
      ], 4)
    ], 4));
  }
}), Ce = (n, r) => {
  const v = n.__vccOpts || n;
  for (const [b, _] of r)
    v[b] = _;
  return v;
}, Qe = /* @__PURE__ */ Ce(ca, [["__scopeId", "data-v-56efb3ec"]]), pa = { class: "kb-section" }, ma = { class: "kb-section__head" }, va = { class: "kb-section__desc" }, ba = { class: "kb-field" }, fa = { class: "kb-label" }, ga = { class: "kb-field-with-rail" }, ha = ["value", "aria-invalid", "aria-describedby"], ya = {
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
}, La = { class: "kb-field" }, Ra = { class: "kb-location-row" }, Ta = ["value"], Pa = ["value"], Va = ["value"], Ea = ["value"], Na = { class: "kb-field" }, Oa = { class: "kb-actions-list" }, Ma = ["value", "onInput"], Da = ["value", "onInput"], Wa = ["onClick"], Ha = ["disabled"], za = { class: "kb-action-chips" }, qa = ["disabled", "onClick"], Fa = /* @__PURE__ */ we({
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
    return (v, b) => {
      var _, m, A, x;
      return a(), s("section", pa, [
        e("div", ma, [
          b[10] || (b[10] = e("h3", { class: "kb-section__title" }, "Message", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (S) => v.$emit("reset"))
          }, " Reset section ")) : h("", !0)
        ]),
        e("p", va, " Message body is required. Title is optional. Character limits depend on the selected platform (" + d(n.selectedPlatform) + "). ", 1),
        e("div", ba, [
          e("label", fa, [
            b[11] || (b[11] = G(" Title ", -1)),
            e("span", {
              class: re(["kb-counter", { "kb-counter--warn": n.titleCount > n.titleLimit }])
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
              onInput: b[1] || (b[1] = (S) => v.$emit("update", { title: S.target.value }))
            }, null, 40, ha),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: me({ "--pct": Math.min(100, n.titleCount / n.titleLimit * 100) + "%" })
            }, [...b[12] || (b[12] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.titleError ? (a(), s("p", ya, d(n.titleError), 1)) : h("", !0)
        ]),
        e("div", ka, [
          e("label", _a, [
            b[13] || (b[13] = G(" Message ", -1)),
            e("span", {
              class: re(["kb-counter", { "kb-counter--warn": n.bodyCount > n.bodyLimit }])
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
              onInput: b[2] || (b[2] = (S) => v.$emit("update", { body: S.target.value }))
            }, null, 40, $a),
            e("div", {
              class: "kb-char-rail",
              role: "presentation",
              style: me({ "--pct": Math.min(100, n.bodyCount / n.bodyLimit * 100) + "%" })
            }, [...b[14] || (b[14] = [
              e("div", { class: "kb-char-rail__fill" }, null, -1)
            ])], 4)
          ]),
          n.bodyError ? (a(), s("p", xa, d(n.bodyError), 1)) : h("", !0)
        ]),
        e("div", Ca, [
          b[15] || (b[15] = e("label", { class: "kb-label" }, [
            G(" Media (image URL) "),
            e("span", { class: "kb-helper" }, "Optional. Large hero images work best on web and Android.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https://...",
            value: n.message.image_url,
            "aria-invalid": !!n.imageUrlError,
            "aria-describedby": n.imageUrlError ? "image-url-error" : void 0,
            onInput: b[3] || (b[3] = (S) => v.$emit("update", { image_url: S.target.value || void 0 }))
          }, null, 40, Sa),
          n.imageUrlError ? (a(), s("p", Ia, d(n.imageUrlError), 1)) : h("", !0)
        ]),
        e("div", Aa, [
          b[16] || (b[16] = e("label", { class: "kb-label" }, [
            G(" Deep link / Action URL "),
            e("span", { class: "kb-helper" }, "Where users land after tapping the notification.")
          ], -1)),
          e("input", {
            type: "url",
            class: "kb-input",
            placeholder: "https:// or app://...",
            value: n.message.deep_link,
            "aria-invalid": !!n.deepLinkError,
            "aria-describedby": n.deepLinkError ? "deeplink-error" : void 0,
            onInput: b[4] || (b[4] = (S) => v.$emit("update", { deep_link: S.target.value || void 0 }))
          }, null, 40, Ba),
          n.deepLinkError ? (a(), s("p", Ua, d(n.deepLinkError), 1)) : h("", !0)
        ]),
        e("div", La, [
          b[17] || (b[17] = e("label", { class: "kb-label" }, [
            G(" Location (optional) "),
            e("span", { class: "kb-helper" }, "Coordinates and label for rich notifications or open-in-maps.")
          ], -1)),
          e("div", Ra, [
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Latitude",
              value: ((_ = n.message.location) == null ? void 0 : _.lat) ?? "",
              onInput: b[5] || (b[5] = (S) => {
                const P = { ...n.message.location ?? {} }, O = S.target.value;
                P.lat = O === "" ? void 0 : Number(O), v.$emit("update", { location: P });
              })
            }, null, 40, Ta),
            e("input", {
              type: "number",
              step: "0.000001",
              class: "kb-input",
              placeholder: "Longitude",
              value: ((m = n.message.location) == null ? void 0 : m.lon) ?? "",
              onInput: b[6] || (b[6] = (S) => {
                const P = { ...n.message.location ?? {} }, O = S.target.value;
                P.lon = O === "" ? void 0 : Number(O), v.$emit("update", { location: P });
              })
            }, null, 40, Pa)
          ]),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Location name (e.g. Store name)",
            value: ((A = n.message.location) == null ? void 0 : A.name) ?? "",
            onInput: b[7] || (b[7] = (S) => {
              const P = { ...n.message.location ?? {} };
              P.name = S.target.value || void 0, v.$emit("update", { location: P });
            })
          }, null, 40, Va),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Address (optional)",
            value: ((x = n.message.location) == null ? void 0 : x.address) ?? "",
            onInput: b[8] || (b[8] = (S) => {
              const P = { ...n.message.location ?? {} };
              P.address = S.target.value || void 0, v.$emit("update", { location: P });
            })
          }, null, 40, Ea)
        ]),
        e("div", Na, [
          b[19] || (b[19] = e("label", { class: "kb-label" }, [
            G(" Actions (optional) "),
            e("span", { class: "kb-helper" }, " Add buttons shown on the notification (where supported). Most platforms support up to 2 actions. ")
          ], -1)),
          e("div", Oa, [
            (a(!0), s(W, null, q(r.message.actions ?? [], (S, P) => (a(), s("div", {
              key: S.id || P,
              class: "kb-action-row"
            }, [
              e("input", {
                type: "text",
                class: "kb-input kb-input--action-label",
                placeholder: "Button label (e.g. View, Dismiss)",
                value: S.label,
                onInput: (O) => {
                  var Q;
                  const D = [...r.message.actions ?? []], H = Number(P);
                  D[H] = {
                    ...D[H],
                    id: ((Q = D[H]) == null ? void 0 : Q.id) || `action_${H + 1}`,
                    label: O.target.value
                  }, v.$emit("update", { actions: D });
                }
              }, null, 40, Ma),
              e("input", {
                type: "url",
                class: "kb-input kb-input--action-url",
                placeholder: "Optional deep link (https:// or app://)",
                value: S.url,
                onInput: (O) => {
                  var Q;
                  const D = [...r.message.actions ?? []], H = Number(P);
                  D[H] = {
                    ...D[H],
                    id: ((Q = D[H]) == null ? void 0 : Q.id) || `action_${H + 1}`,
                    url: O.target.value || void 0
                  }, v.$emit("update", { actions: D });
                }
              }, null, 40, Da),
              e("button", {
                type: "button",
                class: "kb-btn-remove-action",
                onClick: () => {
                  const O = [...r.message.actions ?? []];
                  O.splice(Number(P), 1), v.$emit("update", { actions: O });
                }
              }, " Remove ", 8, Wa)
            ]))), 128)),
            e("button", {
              type: "button",
              class: "kb-btn-add-action",
              disabled: (r.message.actions ?? []).length >= 3,
              onClick: b[9] || (b[9] = () => {
                const S = [...r.message.actions ?? []];
                S.push({
                  id: `action_${S.length + 1}`,
                  label: "",
                  url: ""
                }), v.$emit("update", { actions: S });
              })
            }, " Add action ", 8, Ha),
            e("div", za, [
              b[18] || (b[18] = e("span", { class: "kb-action-chips-label" }, "Suggestions:", -1)),
              (a(), s(W, null, q(["View order", "Track shipment", "Open app"], (S) => e("button", {
                key: S,
                type: "button",
                class: "kb-action-chip",
                disabled: (r.message.actions ?? []).length >= 3,
                onClick: () => {
                  const P = [...r.message.actions ?? []];
                  P.push({
                    id: `action_${Date.now()}`,
                    label: S,
                    url: ""
                  }), v.$emit("update", { actions: P });
                }
              }, d(S), 9, qa)), 64))
            ])
          ])
        ])
      ]);
    };
  }
}), ja = /* @__PURE__ */ Ce(Fa, [["__scopeId", "data-v-88ad2281"]]), Ka = { class: "kb-section kb-section--inline-personalization" }, Ya = { class: "kb-field" }, Ja = { class: "kb-insert-row" }, Ga = ["value"], Xa = { class: "kb-field" }, Qa = { class: "kb-insert-row" }, Za = { class: "kb-field" }, es = { class: "kb-variable-list" }, ts = /* @__PURE__ */ we({
  __name: "SectionPersonalization",
  props: {
    message: {},
    variableOptions: {}
  },
  emits: ["update", "insertVariable"],
  setup(n, { emit: r }) {
    const v = n, b = r, _ = ["first_name", "last_name", "order_id", "city"], m = se(v.variableOptions ?? _), A = se(m.value[0] ?? _[0]), x = se("");
    Be(
      () => v.variableOptions,
      (D) => {
        D && D.length && (m.value = [...D], m.value.includes(A.value) || (A.value = m.value[0]));
      }
    );
    const S = y(() => m.value);
    function P(D) {
      b("insertVariable", { variable: A.value, field: D });
    }
    function O() {
      const D = x.value.trim();
      D && (m.value.includes(D) || (m.value = [...m.value, D]), A.value = D, x.value = "");
    }
    return (D, H) => (a(), s("section", Ka, [
      H[8] || (H[8] = e("h3", { class: "kb-section__title" }, "Insert variables", -1)),
      H[9] || (H[9] = e("p", { class: "kb-section__desc" }, "Add {{ .variable_name }} into the title or message above where you need it.", -1)),
      e("div", Ya, [
        H[4] || (H[4] = e("label", { class: "kb-label" }, "Variable", -1)),
        e("div", Ja, [
          Te(e("select", {
            "onUpdate:modelValue": H[0] || (H[0] = (Q) => A.value = Q),
            class: "kb-select"
          }, [
            (a(!0), s(W, null, q(S.value, (Q) => (a(), s("option", {
              key: Q,
              value: Q
            }, d(Q), 9, Ga))), 128))
          ], 512), [
            [Ve, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H[1] || (H[1] = (Q) => P("title"))
          }, "Into title"),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: H[2] || (H[2] = (Q) => P("body"))
          }, "Into message")
        ])
      ]),
      e("div", Xa, [
        H[5] || (H[5] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qa, [
          Te(e("input", {
            "onUpdate:modelValue": H[3] || (H[3] = (Q) => x.value = Q),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. account_id"
          }, null, 512), [
            [nt, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: O
          }, " Add ")
        ])
      ]),
      e("div", Za, [
        H[6] || (H[6] = e("label", { class: "kb-label" }, "Available variables", -1)),
        H[7] || (H[7] = e("p", { class: "kb-hint" }, " Insert in title or message: {{ .variable_name }}. Fallback can be set when sending. ", -1)),
        e("ul", es, [
          (a(!0), s(W, null, q(S.value, (Q) => (a(), s("li", { key: Q }, [
            e("code", null, "{{ ." + d(Q) + " }}", 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Rt = /* @__PURE__ */ Ce(ts, [["__scopeId", "data-v-9d88edb5"]]), as = { class: "kb-section kb-section--template-type" }, ss = { class: "kb-field" }, ns = { class: "kb-radio-group" }, ls = { class: "kb-radio" }, os = ["checked"], is = { class: "kb-radio" }, rs = ["checked"], ds = /* @__PURE__ */ we({
  __name: "SectionTemplateType",
  props: {
    templateType: {}
  },
  emits: ["update"],
  setup(n, { emit: r }) {
    const v = r;
    return (b, _) => (a(), s("section", as, [
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
              onChange: _[0] || (_[0] = (m) => v("update", "transactional"))
            }, null, 40, os),
            _[2] || (_[2] = e("span", null, "Transactional", -1))
          ]),
          e("label", is, [
            e("input", {
              type: "radio",
              name: "template-type",
              value: "marketing",
              checked: n.templateType === "marketing",
              onChange: _[1] || (_[1] = (m) => v("update", "marketing"))
            }, null, 40, rs),
            _[3] || (_[3] = e("span", null, "Marketing", -1))
          ])
        ]),
        _[4] || (_[4] = e("p", { class: "kb-hint" }, " Transactional: triggered by user action (e.g. order confirmation). Marketing: campaigns and promotions. ", -1))
      ])
    ]));
  }
}), dt = /* @__PURE__ */ Ce(ds, [["__scopeId", "data-v-ff2e1bd8"]]), us = { class: "kb-section" }, cs = { class: "kb-section__head" }, ps = { class: "kb-section__desc" }, ms = { class: "kb-field" }, vs = { class: "kb-radio-group" }, bs = { class: "kb-radio" }, fs = ["checked"], gs = { class: "kb-radio" }, hs = ["checked"], ys = {
  key: 0,
  class: "kb-field kb-row"
}, ks = ["value"], _s = ["value"], ws = { class: "kb-field" }, $s = ["value"], xs = ["value"], Cs = { class: "kb-field" }, Ss = ["value"], Is = ["value"], As = { class: "kb-field" }, Bs = { class: "kb-checkbox" }, Us = ["checked"], Ls = /* @__PURE__ */ we({
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
    return (v, b) => {
      var _;
      return a(), s("section", us, [
        e("div", cs, [
          b[8] || (b[8] = e("h3", { class: "kb-section__title" }, "Schedule", -1)),
          n.showReset ? (a(), s("button", {
            key: 0,
            type: "button",
            class: "kb-section__reset",
            onClick: b[0] || (b[0] = (m) => v.$emit("reset"))
          }, " Reset section ")) : h("", !0)
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
                onChange: b[1] || (b[1] = (m) => v.$emit("update", { scheduled_at: void 0 }))
              }, null, 40, fs),
              b[9] || (b[9] = e("span", null, "Send immediately", -1))
            ]),
            e("label", gs, [
              e("input", {
                type: "radio",
                name: "send-mode",
                checked: !!n.delivery.scheduled_at,
                onChange: b[2] || (b[2] = (m) => v.$emit("update", { scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) }))
              }, null, 40, hs),
              b[10] || (b[10] = e("span", null, "Schedule for later", -1))
            ])
          ])
        ]),
        n.delivery.scheduled_at ? (a(), s("div", ys, [
          e("input", {
            type: "datetime-local",
            class: "kb-input",
            value: (_ = n.delivery.scheduled_at) == null ? void 0 : _.slice(0, 16),
            onInput: b[3] || (b[3] = (m) => v.$emit("update", { scheduled_at: m.target.value }))
          }, null, 40, ks),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "Timezone e.g. UTC",
            value: n.delivery.timezone,
            onInput: b[4] || (b[4] = (m) => v.$emit("update", { timezone: m.target.value }))
          }, null, 40, _s)
        ])) : h("", !0),
        n.showPushOptions ? (a(), s(W, { key: 1 }, [
          e("div", ws, [
            b[12] || (b[12] = e("label", { class: "kb-label" }, [
              G(" Expiration (TTL) "),
              e("span", { class: "kb-helper" }, "How long the push is eligible to deliver before it expires.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.ttl,
              onChange: b[5] || (b[5] = (m) => v.$emit("update", { ttl: Number(m.target.value) }))
            }, [
              (a(!0), s(W, null, q(g(Wt), (m) => (a(), s("option", {
                key: m,
                value: m
              }, d(r[m] ?? m + "s"), 9, xs))), 128))
            ], 40, $s)
          ]),
          e("div", Cs, [
            b[13] || (b[13] = e("label", { class: "kb-label" }, [
              G(" Priority "),
              e("span", { class: "kb-helper" }, "High can wake devices; low is best-effort only.")
            ], -1)),
            e("select", {
              class: "kb-select",
              value: n.delivery.priority,
              onChange: b[6] || (b[6] = (m) => v.$emit("update", { priority: m.target.value }))
            }, [
              (a(!0), s(W, null, q(g(Ct), (m) => (a(), s("option", {
                key: m,
                value: m
              }, d(m), 9, Is))), 128))
            ], 40, Ss)
          ]),
          e("div", As, [
            e("label", Bs, [
              e("input", {
                type: "checkbox",
                checked: n.delivery.quiet_hours,
                onChange: b[7] || (b[7] = (m) => v.$emit("update", { quiet_hours: !n.delivery.quiet_hours }))
              }, null, 40, Us),
              b[14] || (b[14] = e("span", null, "Respect quiet hours", -1))
            ])
          ])
        ], 64)) : h("", !0)
      ]);
    };
  }
}), Rs = /* @__PURE__ */ Ce(Ls, [["__scopeId", "data-v-5707a2a7"]]), Ts = { class: "kb-accordion" }, Ps = { class: "kb-accordion__body" }, Vs = { class: "kb-field" }, Es = ["value"], Ns = { class: "kb-field" }, Os = { class: "kb-checkbox" }, Ms = ["checked"], Ds = /* @__PURE__ */ we({
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
            G(" Collapse key "),
            e("span", { class: "kb-helper" }, "Use the same key to replace older notifications from this campaign.")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. order_updates",
            value: n.delivery.collapse_key,
            onInput: v[0] || (v[0] = (b) => r.$emit("update", { collapse_key: b.target.value || void 0 }))
          }, null, 40, Es)
        ]),
        e("div", Ns, [
          e("label", Os, [
            e("input", {
              type: "checkbox",
              checked: n.delivery.silent_push,
              onChange: v[1] || (v[1] = (b) => r.$emit("update", { silent_push: !n.delivery.silent_push }))
            }, null, 40, Ms),
            v[3] || (v[3] = e("span", null, "Silent push (background only)", -1))
          ])
        ])
      ])
    ]));
  }
}), Ws = /* @__PURE__ */ Ce(Ds, [["__scopeId", "data-v-699e4501"]]);
function Ne(n, r) {
  return !n || typeof n != "string" ? n : n.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (v, b) => {
    const m = String(b).trim().replace(/^\./, "");
    return m in r ? String(r[m]) : v;
  });
}
const De = [
  { id: "alex", label: "Alex (retail)", data: { first_name: "Alex", order_id: "ORD-001", city: "Berlin", last_name: "Müller" } },
  { id: "sam", label: "Sam (support)", data: { first_name: "Sam", order_id: "ORD-782", city: "London", last_name: "Jones" } },
  { id: "jordan", label: "Jordan (promo)", data: { first_name: "Jordan", order_id: "ORD-1024", city: "Paris", last_name: "Lee" } }
], Hs = { class: "kb-preview" }, zs = { class: "kb-preview__toggle" }, qs = { class: "kb-preview__mode" }, Fs = { class: "kb-preview__quality" }, js = {
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
}, Bn = /* @__PURE__ */ we({
  __name: "PreviewPanel",
  props: {
    getPreview: {},
    selectedPlatform: {},
    previewProfile: { default: null },
    message: { default: void 0 },
    delivery: { default: void 0 }
  },
  setup(n) {
    const r = n, v = se("shade"), b = se("banner"), _ = se("toast"), m = y(() => v.value === "expanded"), A = y(
      () => r.getPreview(r.selectedPlatform, {
        expanded: r.selectedPlatform === "android" ? m.value : void 0
      })
    ), x = y(() => {
      const z = A.value;
      return r.previewProfile ? {
        ...z,
        title: Ne((z == null ? void 0 : z.title) ?? "", r.previewProfile.data),
        body: Ne((z == null ? void 0 : z.body) ?? "", r.previewProfile.data)
      } : z;
    }), S = {
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
    function P(z, f) {
      const w = (z ?? "").trim();
      return w ? w.length <= f ? w : `${w.slice(0, Math.max(0, f - 1)).trimEnd()}…` : "";
    }
    const O = y(() => r.selectedPlatform === "android" ? v.value : r.selectedPlatform === "ios" ? b.value : _.value), D = y(() => (S[r.selectedPlatform] ?? S.web)[O.value] ?? { title: 60, body: 160 }), H = y(
      () => {
        var z;
        return P((z = x.value) == null ? void 0 : z.title, D.value.title);
      }
    ), Q = y(
      () => {
        var z;
        return P((z = x.value) == null ? void 0 : z.body, D.value.body);
      }
    ), j = { android: 3, ios: 4, web: 2 }, ue = y(
      () => {
        var z;
        return Array.isArray((z = x.value) == null ? void 0 : z.actions) ? x.value.actions : [];
      }
    ), K = y(
      () => ue.value.slice(0, j[r.selectedPlatform] ?? 2)
    ), ee = y(
      () => Math.max(0, ue.value.length - K.value.length)
    ), N = y(() => {
      var z;
      return (((z = r.message) == null ? void 0 : z.deep_link) ?? "").trim();
    }), oe = y(() => N.value ? /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(N.value) : !1), ae = y(() => N.value ? N.value.length <= 40 ? N.value : `${N.value.slice(0, 37)}…` : ""), he = y(() => {
      var f, w, U;
      const z = [];
      return (f = r.delivery) != null && f.priority && z.push(`Priority: ${r.delivery.priority}`), typeof ((w = r.delivery) == null ? void 0 : w.ttl) == "number" && z.push(`TTL: ${r.delivery.ttl}s`), (U = r.delivery) != null && U.silent_push && z.push("Silent push"), z;
    }), ve = y(() => {
      var Y;
      const z = (Y = x.value) == null ? void 0 : Y.location;
      if (!z || z.lat == null && z.lon == null) return null;
      const f = Number(z.lat) || 0, w = Number(z.lon) || 0, U = 8e-3, le = [w - U, f - U, w + U, f + U].join(",");
      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(le)}&layer=mapnik&marker=${f},${w}`;
    }), be = y(() => {
      var f;
      const z = (f = x.value) == null ? void 0 : f.location;
      return z && (z.lat != null || z.lon != null || z.name || z.address);
    });
    return (z, f) => {
      var w, U, le, Y, L, ce, R, k, B, X, ne, ke, _e, $e, ge, ie;
      return a(), s("div", Hs, [
        e("div", zs, [
          e("label", qs, [
            f[6] || (f[6] = e("span", { class: "kb-preview__mode-label" }, "Surface", -1)),
            n.selectedPlatform === "android" ? Te((a(), s("select", {
              key: 0,
              "onUpdate:modelValue": f[0] || (f[0] = (c) => v.value = c),
              class: "kb-preview__mode-select"
            }, [...f[3] || (f[3] = [
              e("option", { value: "heads_up" }, "Heads-up", -1),
              e("option", { value: "shade" }, "Notification shade", -1),
              e("option", { value: "expanded" }, "Expanded style", -1)
            ])], 512)), [
              [Ve, v.value]
            ]) : n.selectedPlatform === "ios" ? Te((a(), s("select", {
              key: 1,
              "onUpdate:modelValue": f[1] || (f[1] = (c) => b.value = c),
              class: "kb-preview__mode-select"
            }, [...f[4] || (f[4] = [
              e("option", { value: "banner" }, "Banner", -1),
              e("option", { value: "lock" }, "Lock screen", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ve, b.value]
            ]) : Te((a(), s("select", {
              key: 2,
              "onUpdate:modelValue": f[2] || (f[2] = (c) => _.value = c),
              class: "kb-preview__mode-select"
            }, [...f[5] || (f[5] = [
              e("option", { value: "toast" }, "Desktop toast", -1),
              e("option", { value: "center" }, "Notification center", -1)
            ])], 512)), [
              [Ve, _.value]
            ])
          ]),
          e("div", Fs, [
            (a(!0), s(W, null, q(he.value, (c) => (a(), s("span", {
              key: c,
              class: "kb-preview__badge"
            }, d(c), 1))), 128))
          ])
        ]),
        n.selectedPlatform === "android" ? (a(), s("div", {
          key: 0,
          id: "kb-preview-panel-android",
          class: re(["kb-preview__device kb-preview__device--android", `kb-preview__device--android-${v.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-android"
        }, [
          f[9] || (f[9] = e("div", { class: "kb-android-status-bar" }, [
            e("span", { class: "kb-android-time" }, "12:30"),
            e("span", { class: "kb-android-icons" }, "  ")
          ], -1)),
          e("div", {
            class: re(["kb-android-notification", { "kb-android-notification--expanded": m.value }])
          }, [
            f[8] || (f[8] = He('<div class="kb-android-header" data-v-4fc616d9><div class="kb-android-app-icon" data-v-4fc616d9>A</div><div class="kb-android-app-meta" data-v-4fc616d9><div class="kb-android-app-name" data-v-4fc616d9>Your App</div><div class="kb-android-app-channel" data-v-4fc616d9>Promotions · now</div></div><div class="kb-android-more" data-v-4fc616d9>⋮</div></div>', 1)),
            e("div", {
              class: re(["kb-android-body", { "kb-android-body--expanded": m.value }])
            }, [
              m.value && x.value.imageUrl ? (a(), s("div", js, [
                e("img", {
                  src: x.value.imageUrl,
                  alt: ""
                }, null, 8, Ks)
              ])) : h("", !0),
              e("div", Ys, [
                e("div", Js, [
                  H.value ? (a(), s("div", Gs, d(H.value), 1)) : h("", !0),
                  Q.value ? (a(), s("div", Xs, d(Q.value), 1)) : h("", !0),
                  be.value && !m.value && ((w = x.value.location) != null && w.name || (U = x.value.location) != null && U.address) ? (a(), s("div", Qs, [
                    f[7] || (f[7] = e("span", { "aria-hidden": "true" }, "📍", -1)),
                    G(" " + d(((le = x.value.location) == null ? void 0 : le.name) || ((Y = x.value.location) == null ? void 0 : Y.address)), 1)
                  ])) : h("", !0),
                  N.value ? (a(), s("div", {
                    key: 3,
                    class: re(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
                  }, d(oe.value ? ae.value : "Invalid deep link format"), 3)) : h("", !0)
                ]),
                !m.value && x.value.imageUrl ? (a(), s("div", Zs, [
                  e("img", {
                    src: x.value.imageUrl,
                    alt: ""
                  }, null, 8, en)
                ])) : h("", !0)
              ]),
              be.value && ve.value && m.value ? (a(), s("div", tn, [
                e("iframe", {
                  src: ve.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, an),
                (L = x.value.location) != null && L.name || (ce = x.value.location) != null && ce.address ? (a(), s("div", sn, d(((R = x.value.location) == null ? void 0 : R.name) || ((k = x.value.location) == null ? void 0 : k.address)), 1)) : h("", !0)
              ])) : h("", !0),
              K.value.length ? (a(), s("div", nn, [
                (a(!0), s(W, null, q(K.value, (c) => (a(), s("button", {
                  key: c.id,
                  type: "button",
                  class: "kb-android-action-btn"
                }, d(c.label || "Action"), 1))), 128))
              ])) : h("", !0),
              ee.value > 0 ? (a(), s("p", ln, " Showing " + d(K.value.length) + " of " + d(ue.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : h("", !0)
            ], 2)
          ], 2)
        ], 2)) : n.selectedPlatform === "ios" ? (a(), s("div", {
          key: 1,
          id: "kb-preview-panel-ios",
          class: re(["kb-preview__device kb-preview__device--ios", `kb-preview__device--ios-${b.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-ios"
        }, [
          f[12] || (f[12] = e("div", { class: "kb-ios-status-bar" }, [
            e("span", { class: "kb-ios-time" }, "9:41"),
            e("span", { class: "kb-ios-indicators" }, "•••")
          ], -1)),
          e("div", on, [
            f[11] || (f[11] = e("div", { class: "kb-ios-app-icon" }, "A", -1)),
            e("div", rn, [
              f[10] || (f[10] = e("div", { class: "kb-ios-meta" }, [
                e("span", { class: "kb-ios-app-name" }, "Your App"),
                e("span", { class: "kb-ios-time-label" }, "now")
              ], -1)),
              H.value ? (a(), s("div", dn, d(H.value), 1)) : h("", !0),
              Q.value ? (a(), s("div", un, d(Q.value), 1)) : h("", !0),
              N.value ? (a(), s("div", {
                key: 2,
                class: re(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
              }, d(oe.value ? ae.value : "Invalid deep link format"), 3)) : h("", !0),
              be.value && ve.value ? (a(), s("div", cn, [
                e("iframe", {
                  src: ve.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, pn),
                (B = x.value.location) != null && B.name || (X = x.value.location) != null && X.address ? (a(), s("div", mn, d(((ne = x.value.location) == null ? void 0 : ne.name) || ((ke = x.value.location) == null ? void 0 : ke.address)), 1)) : h("", !0)
              ])) : h("", !0),
              K.value.length ? (a(), s("div", vn, [
                (a(!0), s(W, null, q(K.value, (c) => (a(), s("button", {
                  key: c.id,
                  type: "button",
                  class: "kb-ios-action-btn"
                }, d(c.label || "Action"), 1))), 128))
              ])) : h("", !0),
              ee.value > 0 ? (a(), s("p", bn, " Showing " + d(K.value.length) + " of " + d(ue.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : h("", !0)
            ]),
            x.value.imageUrl ? (a(), s("div", fn, [
              e("img", {
                src: x.value.imageUrl,
                alt: ""
              }, null, 8, gn)
            ])) : h("", !0)
          ])
        ], 2)) : (a(), s("div", {
          key: 2,
          id: "kb-preview-panel-web",
          class: re(["kb-preview__device kb-preview__device--web", `kb-preview__device--web-${_.value}`]),
          role: "tabpanel",
          "aria-labelledby": "kb-preview-tab-web"
        }, [
          f[14] || (f[14] = He('<div class="kb-web-browser-chrome" data-v-4fc616d9><span class="kb-web-dots" data-v-4fc616d9><span data-v-4fc616d9></span><span data-v-4fc616d9></span><span data-v-4fc616d9></span></span><div class="kb-web-url-bar" data-v-4fc616d9><span class="kb-web-lock" data-v-4fc616d9>🔒</span><span class="kb-web-origin" data-v-4fc616d9>yourapp.com</span></div></div>', 1)),
          e("div", hn, [
            f[13] || (f[13] = He('<div class="kb-web-header" data-v-4fc616d9><div class="kb-web-site-icon" data-v-4fc616d9>Y</div><div class="kb-web-site-meta" data-v-4fc616d9><div class="kb-web-site-name" data-v-4fc616d9>yourapp.com</div><div class="kb-web-site-time" data-v-4fc616d9>now</div></div></div>', 1)),
            e("div", yn, [
              H.value ? (a(), s("div", kn, d(H.value), 1)) : h("", !0),
              Q.value ? (a(), s("div", _n, d(Q.value), 1)) : h("", !0),
              N.value ? (a(), s("div", {
                key: 2,
                class: re(["kb-preview-link", { "kb-preview-link--invalid": !oe.value }])
              }, d(oe.value ? ae.value : "Invalid deep link format"), 3)) : h("", !0),
              x.value.imageUrl ? (a(), s("div", wn, [
                e("img", {
                  src: x.value.imageUrl,
                  alt: ""
                }, null, 8, $n)
              ])) : h("", !0),
              be.value && ve.value ? (a(), s("div", xn, [
                e("iframe", {
                  src: ve.value,
                  title: "Location map",
                  class: "kb-preview-map__iframe"
                }, null, 8, Cn),
                (_e = x.value.location) != null && _e.name || ($e = x.value.location) != null && $e.address ? (a(), s("div", Sn, d(((ge = x.value.location) == null ? void 0 : ge.name) || ((ie = x.value.location) == null ? void 0 : ie.address)), 1)) : h("", !0)
              ])) : h("", !0)
            ]),
            K.value.length ? (a(), s("div", In, [
              (a(!0), s(W, null, q(K.value, (c, C) => (a(), s("button", {
                key: c.id || C,
                type: "button",
                class: re(["kb-web-action-btn", { "kb-web-action-btn--secondary": Number(C) > 0 }])
              }, d(c.label || "Action"), 3))), 128))
            ])) : h("", !0),
            ee.value > 0 ? (a(), s("p", An, " Showing " + d(K.value.length) + " of " + d(ue.value.length) + " actions on " + d(n.selectedPlatform) + ". ", 1)) : h("", !0)
          ])
        ], 2))
      ]);
    };
  }
}), Un = /* @__PURE__ */ Ce(Bn, [["__scopeId", "data-v-4fc616d9"]]), Ln = { class: "kb-version-dialog" }, Rn = {
  key: 0,
  class: "kb-version-empty"
}, Tn = {
  key: 1,
  class: "kb-version-list"
}, Pn = { class: "kb-version-item-label" }, Vn = ["onClick"], En = { class: "kb-version-actions" }, Nn = /* @__PURE__ */ we({
  __name: "BuilderVersionHistoryModal",
  props: {
    open: { type: Boolean },
    versions: {}
  },
  emits: ["close", "restore"],
  setup(n, { emit: r }) {
    const v = r;
    function b(_) {
      try {
        return new Date(_).toLocaleString(void 0, { dateStyle: "short", timeStyle: "short" });
      } catch {
        return _;
      }
    }
    return (_, m) => n.open ? (a(), s("div", {
      key: 0,
      class: "kb-version-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "version-history-title",
      tabindex: "-1",
      onKeydown: m[1] || (m[1] = Ot((A) => v("close"), ["escape"]))
    }, [
      e("div", Ln, [
        m[2] || (m[2] = e("h2", {
          id: "version-history-title",
          class: "kb-version-title"
        }, " Version history ", -1)),
        m[3] || (m[3] = e("p", { class: "kb-version-desc" }, " Restore a previous version. Current unsaved changes will be replaced. ", -1)),
        n.versions.length === 0 ? (a(), s("div", Rn, ' No versions saved yet. Use "Save as version" to create one. ')) : (a(), s("ul", Tn, [
          (a(!0), s(W, null, q(n.versions, (A) => (a(), s("li", {
            key: A.id,
            class: "kb-version-item"
          }, [
            e("span", Pn, d(A.label || b(A.timestamp)), 1),
            e("button", {
              type: "button",
              class: "kb-version-restore",
              onClick: (x) => {
                v("restore", A.snapshot), v("close");
              }
            }, " Restore ", 8, Vn)
          ]))), 128))
        ])),
        e("div", En, [
          e("button", {
            type: "button",
            class: "kb-version-btn kb-version-btn--primary",
            onClick: m[0] || (m[0] = (A) => v("close"))
          }, " Close ")
        ])
      ])
    ], 32)) : h("", !0);
  }
}), Tt = /* @__PURE__ */ Ce(Nn, [["__scopeId", "data-v-ce35a513"]]), mt = [
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
], On = { class: "keos-notification-builder" }, Mn = { class: "kb-builder-top" }, Dn = { class: "kb-push-layout" }, Wn = { class: "kb-push-sidebar" }, Hn = {
  key: 0,
  class: "kb-push-form"
}, zn = {
  key: 0,
  class: "kb-hint-card"
}, qn = { class: "kb-push-form-head" }, Fn = { class: "kb-push-form-head-top" }, jn = { class: "kb-push-health-pill" }, Kn = { class: "kb-push-form-head-row" }, Yn = ["value"], Jn = { class: "kb-push-health" }, Gn = { class: "kb-push-health-row" }, Xn = { class: "kb-push-health-value" }, Qn = { class: "kb-push-health-bar" }, Zn = {
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
}, bl = { class: "kb-confirm-dialog" }, fl = { class: "kb-confirm-actions" }, gl = /* @__PURE__ */ we({
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
    const v = n, b = r, _ = se("android"), m = se(""), A = se(!1), x = se(null), S = se(!1), P = y(
      () => j.value.workflow_status ?? "draft"
    ), O = y(() => {
      const p = m.value;
      return p ? De.find((o) => o.id === p) ?? null : null;
    });
    function D(p) {
      const o = j.value, V = p.campaign.message ? { ...o.message, ...p.campaign.message } : o.message, $ = p.campaign.delivery ? { ...o.delivery, ...p.campaign.delivery } : o.delivery;
      N({
        ...p.campaign,
        message: V,
        delivery: $
      }), x.value = null, A.value = !1;
    }
    function H(p) {
      const o = p.target.value;
      if (!o) return;
      const V = mt.find(($) => $.id === o);
      V && (ue.value ? (x.value = V, A.value = !0) : D(V), p.target.value = "");
    }
    function Q(p) {
      j.value = p, S.value = !1;
    }
    const {
      campaign: j,
      dirty: ue,
      customValidatorErrors: K,
      getValidationWithWarnings: ee,
      update: N,
      updateMessage: oe,
      updateDelivery: ae,
      undo: he,
      redo: ve,
      canUndo: be,
      canRedo: z,
      resetMessage: f,
      resetDelivery: w,
      getPreview: U,
      characterLimits: le,
      hooks: Y
    } = Ge({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (p) => {
          var $, F, I, u;
          const o = [];
          ($ = p.name) != null && $.trim() || o.push("Template name is required"), (I = (F = p.message) == null ? void 0 : F.body) != null && I.trim() || o.push("Message body is required");
          const V = (u = v.hooks) != null && u.customValidators ? await v.hooks.customValidators(p) : [];
          return [...o, ...V];
        }
      },
      onDirty: () => b("change", j.value)
    }), { lastSavedAt: L } = Xe(j, { channel: "push" });
    function ce(p) {
      (p.metaKey || p.ctrlKey) && p.key === "z" && (p.preventDefault(), p.shiftKey ? ve() : he());
    }
    je(() => {
      window.addEventListener("keydown", ce);
    }), Ke(() => {
      window.removeEventListener("keydown", ce);
    }), Be(j, (p) => b("update:modelValue", p), { deep: !0 });
    const R = se(), k = se(!0), B = se(!0);
    async function X() {
      if (Y.estimateReach)
        try {
          R.value = await Y.estimateReach(j.value.audience);
        } catch {
          R.value = void 0;
        }
      Y.canSend && (k.value = await Promise.resolve(Y.canSend())), Y.canSchedule && (B.value = await Promise.resolve(Y.canSchedule()));
    }
    X(), Be(() => j.value.audience, X, { deep: !0 });
    const ne = y(() => (K.value, ee(R.value))), ke = y(() => ne.value.blockingErrors), _e = y(() => ne.value.warnings), $e = y(() => ne.value.valid), ge = y(() => {
      var $, F, I;
      const p = j.value.message, o = [
        !!(($ = j.value.name) != null && $.trim()),
        !!((F = p.title) != null && F.trim()),
        !!((I = p.body) != null && I.trim()),
        !!(p.template_type ?? j.value.template_type),
        Array.isArray(p.actions) ? p.actions.length > 0 : !1
      ], V = o.filter(Boolean).length;
      return Math.round(V / o.length * 100);
    }), ie = y(() => ge.value >= 90 ? "Production ready" : ge.value >= 70 ? "Strong draft" : ge.value >= 40 ? "In progress" : "Needs setup"), c = y(() => {
      const p = j.value.message;
      return !!((p.title ?? "").toString().trim() || (p.body ?? "").toString().trim() || Array.isArray(p.actions) && p.actions.length);
    }), C = y(
      () => le[_.value].title
    ), te = y(() => le[_.value].body), Z = y(() => j.value.message.title.length), pe = y(() => j.value.message.body.length), xe = y(() => {
      if (Z.value > C.value)
        return `Title exceeds ${C.value} characters for ${_.value}.`;
    }), Se = y(() => {
      const p = ke.value.find(
        (o) => o.message === "Message body is required"
      );
      if (p) return p.message;
      if (pe.value > te.value)
        return `Body exceeds ${te} characters for ${_.value}.`;
    }), Ue = y(
      () => j.value.template_type ?? "transactional"
    );
    function Le(p) {
      N({ template_type: p });
    }
    function Re(p) {
      N({
        name: p,
        tracking: { ...j.value.tracking ?? {}, campaign_name: p }
      });
    }
    function Ie(p) {
      const o = ` {{ .${p.variable} }}`, V = j.value.message.variables ?? [], $ = Array.from(/* @__PURE__ */ new Set([...V, p.variable]));
      p.field === "title" ? oe({
        title: j.value.message.title + o,
        variables: $
      }) : oe({
        body: j.value.message.body + o,
        variables: $
      });
    }
    function J() {
      $e.value && b("save", j.value);
    }
    return (p, o) => {
      var V;
      return a(), s("div", On, [
        e("div", Mn, [
          Ae(Qe, {
            "campaign-name": g(j).name,
            status: g(j).status,
            dirty: g(ue),
            "last-saved-at": g(L),
            "can-undo": g(be),
            "can-redo": g(z),
            "workflow-status": P.value,
            "slugify-name": v.enforceSlugName,
            "onUpdate:campaignName": Re,
            "onUpdate:workflowStatus": o[0] || (o[0] = ($) => g(N)({ workflow_status: $ })),
            onUndo: g(he),
            onRedo: g(ve)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "workflow-status", "slugify-name", "onUndo", "onRedo"]),
          ke.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Oe).input}px`,
              padding: `${g(de)[12]}px ${g(de)[16]}px`,
              marginBottom: `${g(de)[16]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (a(!0), s(W, null, q(ke.value, ($) => (a(), s("li", {
                key: $.message
              }, d($.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", Dn, [
          e("aside", Wn, [
            n.disabledSections.includes("message") ? h("", !0) : (a(), s("div", Hn, [
              !g(j).message.title && !g(j).message.body ? (a(), s("div", zn, " Add a title and message below to get started. ")) : h("", !0),
              e("div", qn, [
                e("div", Fn, [
                  o[12] || (o[12] = e("span", { class: "kb-push-form-head-label" }, "Template", -1)),
                  e("span", jn, d(ie.value), 1)
                ]),
                e("div", Kn, [
                  Ae(dt, {
                    "template-type": Ue.value,
                    onUpdate: Le
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: H
                  }, [
                    o[13] || (o[13] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, q(g(mt), ($) => (a(), s("option", {
                      key: $.id,
                      value: $.id
                    }, d($.label), 9, Yn))), 128))
                  ], 32)
                ]),
                e("div", Jn, [
                  e("div", Gn, [
                    o[14] || (o[14] = e("span", { class: "kb-push-health-title" }, "Setup quality", -1)),
                    e("span", Xn, d(ge.value) + "%", 1)
                  ]),
                  e("div", Qn, [
                    e("span", {
                      class: "kb-push-health-fill",
                      style: me({ width: `${ge.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ae(ja, {
                message: g(j).message,
                "title-count": Z.value,
                "body-count": pe.value,
                "title-limit": C.value,
                "body-limit": te.value,
                "selected-platform": _.value,
                "show-reset": !0,
                "title-error": xe.value,
                "body-error": Se.value,
                onUpdate: g(oe),
                onReset: o[1] || (o[1] = ($) => g(f)())
              }, null, 8, ["message", "title-count", "body-count", "title-limit", "body-limit", "selected-platform", "title-error", "body-error", "onUpdate"]),
              Ae(Rt, {
                message: g(j).message,
                "variable-options": n.variableOptions,
                onUpdate: g(oe),
                onInsertVariable: Ie
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ])),
            !n.designOnly && !n.disabledSections.includes("delivery") ? (a(), s("div", Zn, [
              o[15] || (o[15] = e("div", { class: "kb-push-form-head" }, [
                e("span", { class: "kb-push-form-head-label" }, "Schedule")
              ], -1)),
              Ae(Rs, {
                delivery: g(j).delivery,
                "show-push-options": !0,
                "show-reset": !0,
                onUpdate: g(ae),
                onReset: o[2] || (o[2] = ($) => g(w)())
              }, null, 8, ["delivery", "onUpdate"]),
              Ae(Ws, {
                delivery: g(j).delivery,
                onUpdate: g(ae)
              }, null, 8, ["delivery", "onUpdate"])
            ])) : h("", !0)
          ]),
          e("main", el, [
            !n.designOnly && g(j).audience.test_mode ? (a(), s("div", tl, [...o[16] || (o[16] = [
              e("span", { class: "kb-push-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", al, [
              e("div", sl, [
                e("label", nl, [
                  o[18] || (o[18] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": o[3] || (o[3] = ($) => m.value = $),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[17] || (o[17] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, q(g(De), ($) => (a(), s("option", {
                      key: $.id,
                      value: $.id
                    }, d($.label), 9, ll))), 128))
                  ], 512), [
                    [Ve, m.value]
                  ])
                ]),
                e("div", ol, [
                  o[19] || (o[19] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(_.value), 1)
                ])
              ]),
              e("div", il, [
                (a(), s(W, null, q(["android", "ios", "web"], ($) => e("button", {
                  key: $,
                  type: "button",
                  class: re(["kb-push-device-btn", { "kb-push-device-btn--active": _.value === $ }]),
                  role: "tab",
                  "aria-selected": _.value === $,
                  "aria-controls": `kb-preview-panel-${$}`,
                  onClick: (F) => _.value = $
                }, d($.toUpperCase()), 11, rl)), 64))
              ]),
              e("div", {
                class: re(["kb-push-preview-frame", { "kb-push-preview-frame--empty": !c.value }])
              }, [
                !g(j).message.title && !g(j).message.body ? (a(), s("div", dl, [...o[20] || (o[20] = [
                  e("p", { class: "kb-push-preview-empty-text" }, " Start adding content to see a live preview here. ", -1)
                ])])) : (a(), Mt(Un, {
                  key: 1,
                  "get-preview": g(U),
                  "selected-platform": _.value,
                  "preview-profile": O.value,
                  message: g(j).message,
                  delivery: g(j).delivery,
                  "onUpdate:selectedPlatform": o[4] || (o[4] = ($) => _.value = $)
                }, null, 8, ["get-preview", "selected-platform", "preview-profile", "message", "delivery"]))
              ], 2)
            ])
          ])
        ]),
        e("footer", ul, [
          _e.value.length > 0 ? (a(), s("div", cl, [
            o[21] || (o[21] = e("strong", null, "Warning:", -1)),
            G(" " + d((V = _e.value[0]) == null ? void 0 : V.message) + " ", 1),
            _e.value.length > 1 ? (a(), s("span", pl, " (+" + d(_e.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", ml, [
            !n.designOnly && n.showHistory ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[5] || (o[5] = ($) => S.value = !0)
            }, " Version history ")) : h("", !0),
            !n.designOnly && n.showSaveVersion ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[6] || (o[6] = ($) => b("save-version", JSON.parse(JSON.stringify(g(j)))))
            }, " Save as version ")) : h("", !0),
            n.showDuplicate ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: o[7] || (o[7] = ($) => b("duplicate", JSON.parse(JSON.stringify(g(j)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (a(), s("button", {
              key: 3,
              type: "button",
              class: "kb-push-action kb-push-action--secondary",
              onClick: J
            }, " Save ")) : h("", !0),
            n.showClose ? (a(), s("button", {
              key: 4,
              type: "button",
              class: "kb-push-action kb-push-action--primary",
              onClick: o[8] || (o[8] = ($) => b("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        A.value ? (a(), s("div", vl, [
          e("div", bl, [
            o[22] || (o[22] = e("h2", {
              id: "preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[23] || (o[23] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", fl, [
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--secondary",
                onClick: o[9] || (o[9] = ($) => {
                  A.value = !1, x.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-push-action kb-push-action--primary",
                onClick: o[10] || (o[10] = ($) => x.value && D(x.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0),
        Ae(Tt, {
          open: S.value,
          versions: n.versions,
          onClose: o[11] || (o[11] = ($) => S.value = !1),
          onRestore: Q
        }, null, 8, ["open", "versions"])
      ]);
    };
  }
}), Pt = /* @__PURE__ */ Ce(gl, [["__scopeId", "data-v-543f6763"]]), hl = { class: "kb-section" }, yl = { class: "kb-section__head" }, kl = { class: "kb-summary-bar" }, _l = { class: "kb-pill kb-pill--category" }, wl = { class: "kb-pill kb-pill--format" }, $l = { class: "kb-pill kb-pill--status" }, xl = { class: "kb-field" }, Cl = ["value"], Sl = { class: "kb-field" }, Il = { class: "kb-label" }, Al = { class: "kb-helper" }, Bl = ["value"], Ul = ["value"], Ll = { class: "kb-field" }, Rl = ["value"], Tl = { class: "kb-field kb-field--inline kb-field--language-limits" }, Pl = { class: "kb-field-half" }, Vl = ["value"], El = { class: "kb-field" }, Nl = ["value"], Ol = {
  key: 0,
  class: "kb-field"
}, Ml = { class: "kb-label" }, Dl = ["value"], Wl = {
  key: 1,
  class: "kb-field"
}, Hl = ["value"], zl = {
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
}, mo = ["value"], vo = ["value"], bo = { class: "kb-field" }, fo = { class: "kb-label" }, go = ["value"], ho = {
  key: 9,
  class: "kb-field kb-wa-template-fields"
}, yo = { class: "kb-wa-fields-list" }, ko = { class: "kb-wa-field-name" }, _o = { class: "kb-wa-field-status" }, wo = { class: "kb-field" }, $o = ["value"], xo = {
  key: 10,
  class: "kb-field"
}, Co = { class: "kb-wa-buttons" }, So = ["value", "onInput"], Io = ["value", "onChange"], Ao = ["value", "onInput"], Bo = ["value", "onInput"], Uo = {
  key: 2,
  class: "kb-opt-out-note"
}, Lo = ["onClick"], Ro = ["disabled"], et = 60, tt = 1024, at = 60, st = 10, gt = 10, To = /* @__PURE__ */ we({
  __name: "SectionWhatsApp",
  props: {
    message: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    const v = n, b = r, _ = [
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
    ], m = y(() => v.message), A = y(() => m.value.template_type ?? "text"), x = y(() => m.value.header_type ?? "none"), S = y(() => String(m.value.header ?? "")), P = y(() => String(m.value.body ?? "")), O = y(() => String(m.value.footer ?? "")), D = y(() => m.value.buttons ?? []), H = y(() => m.value.products ?? []), Q = y(() => m.value.cards ?? []), j = y(() => {
      const R = _.find((k) => k.value === A.value);
      return (R == null ? void 0 : R.hint) ?? "Choose the approved WhatsApp template format.";
    }), ue = y(() => {
      const R = String(m.value.template_category ?? "").trim();
      return R ? R.charAt(0).toUpperCase() + R.slice(1) : "Uncategorized";
    }), K = y(() => {
      const R = _.find((k) => k.value === A.value);
      return (R == null ? void 0 : R.label) ?? "Text";
    }), ee = y(() => m.value.template_name ? P.value.trim() ? "Ready to validate" : "Draft" : "Needs setup");
    function N(R) {
      if (!R || typeof R != "string") return [];
      const k = /\{\{\s*([^}]+?)\s*\}\}/g, B = /* @__PURE__ */ new Set();
      let X;
      for (; (X = k.exec(R)) !== null; ) B.add(X[1].trim());
      return Array.from(B);
    }
    const oe = y(() => {
      const R = v.message.header ?? "", k = v.message.body ?? v.message.body ?? "", B = new Set(v.message.variables ?? []), X = [...N(R), ...N(k)];
      return Array.from(new Set(X)).map((ke) => ({ name: ke, configured: B.has(ke) }));
    });
    function ae(R) {
      b("update", R);
    }
    function he(R) {
      const k = {
        template_category: R || void 0
      };
      R === "authentication" && A.value !== "auth" && (k.template_type = "auth"), ae(k);
    }
    function ve(R) {
      const k = { template_type: R };
      R === "auth" && (k.template_category = "authentication"), (R === "image" || R === "video" || R === "document") && (k.header_type = R), ae(k);
    }
    function be(R, k) {
      var X;
      const B = [...D.value];
      B[R] = {
        ...B[R],
        id: ((X = B[R]) == null ? void 0 : X.id) || `btn_${R + 1}`,
        ...k
      }, ae({ buttons: B });
    }
    function z(R) {
      const k = [...D.value];
      k.splice(R, 1), ae({ buttons: k });
    }
    function f() {
      const R = [...D.value];
      R.push({ id: `btn_${R.length + 1}`, label: "", type: "quick_reply" }), ae({ buttons: R });
    }
    function w(R, k) {
      var X;
      const B = [...H.value];
      B[R] = {
        ...B[R],
        id: ((X = B[R]) == null ? void 0 : X.id) || `prod_${R + 1}`,
        ...k
      }, ae({ products: B });
    }
    function U(R) {
      const k = [...H.value];
      k.splice(R, 1), ae({ products: k });
    }
    function le() {
      const R = [...H.value];
      R.push({ id: `prod_${R.length + 1}`, productId: "" }), ae({ products: R });
    }
    function Y(R, k) {
      var X;
      const B = [...Q.value];
      B[R] = {
        ...B[R],
        id: ((X = B[R]) == null ? void 0 : X.id) || `card_${R + 1}`,
        ...k
      }, ae({ cards: B });
    }
    function L(R) {
      const k = [...Q.value];
      k.splice(R, 1), ae({ cards: k });
    }
    function ce() {
      const R = [...Q.value];
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
          onClick: k[0] || (k[0] = (B) => R.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      k[42] || (k[42] = e("p", { class: "kb-section__desc" }, " Configure purpose, format, and components for your approved WhatsApp template. ", -1)),
      e("div", kl, [
        e("span", _l, d(ue.value), 1),
        e("span", wl, d(K.value), 1),
        e("span", $l, d(ee.value), 1)
      ]),
      e("div", xl, [
        k[18] || (k[18] = e("label", { class: "kb-label" }, [
          G(" Category (purpose) "),
          e("span", { class: "kb-helper" }, "Defines the business intent and pricing bucket.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: m.value.template_category ?? "",
          onChange: k[1] || (k[1] = (B) => he(B.target.value))
        }, [...k[17] || (k[17] = [
          e("option", { value: "" }, "Select category", -1),
          e("option", { value: "marketing" }, "Marketing", -1),
          e("option", { value: "utility" }, "Utility", -1),
          e("option", { value: "authentication" }, "Authentication", -1)
        ])], 40, Cl)
      ]),
      e("div", Sl, [
        e("label", Il, [
          k[19] || (k[19] = G(" Functional format ", -1)),
          e("span", Al, d(j.value), 1)
        ]),
        e("select", {
          class: "kb-select",
          value: A.value,
          onChange: k[2] || (k[2] = (B) => ve(B.target.value))
        }, [
          (a(), s(W, null, q(_, (B) => e("option", {
            key: B.value,
            value: B.value
          }, d(B.label), 9, Ul)), 64))
        ], 40, Bl)
      ]),
      e("div", Ll, [
        k[20] || (k[20] = e("label", { class: "kb-label" }, [
          G(" Template name "),
          e("span", { class: "kb-helper" }, "Auto-synced from the campaign name in the header.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          value: m.value.template_name ?? "",
          readonly: "",
          disabled: ""
        }, null, 8, Rl)
      ]),
      e("div", Tl, [
        e("div", Pl, [
          k[21] || (k[21] = e("label", { class: "kb-label" }, [
            G(" Template language "),
            e("span", { class: "kb-helper" }, "Locale code used in WhatsApp (for example, en_US, en_GB, es_ES).")
          ], -1)),
          e("input", {
            type: "text",
            class: "kb-input",
            placeholder: "e.g. en_US",
            value: m.value.template_language ?? "",
            onInput: k[3] || (k[3] = (B) => ae({
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
      e("div", El, [
        k[24] || (k[24] = e("label", { class: "kb-label" }, [
          G(" Header component (optional) "),
          e("span", { class: "kb-helper" }, "Header can be text or rich media.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: x.value,
          onChange: k[4] || (k[4] = (B) => ae({ header_type: B.target.value }))
        }, [...k[23] || (k[23] = [
          He('<option value="none" data-v-d088a85b>No header</option><option value="text" data-v-d088a85b>Text header</option><option value="image" data-v-d088a85b>Image header</option><option value="video" data-v-d088a85b>Video header</option><option value="document" data-v-d088a85b>Document header</option>', 5)
        ])], 40, Nl)
      ]),
      x.value === "text" ? (a(), s("div", Ol, [
        e("label", Ml, [
          k[25] || (k[25] = G(" Header text ", -1)),
          e("span", {
            class: re(["kb-counter", { "kb-counter--warn": S.value.length > et }])
          }, d(S.value.length) + "/" + d(et), 3)
        ]),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Order update",
          value: S.value,
          onInput: k[5] || (k[5] = (B) => ae({
            header: B.target.value || void 0
          }))
        }, null, 40, Dl)
      ])) : h("", !0),
      ["image", "video", "document"].includes(x.value) || ["image", "video", "document"].includes(A.value) ? (a(), s("div", Wl, [
        k[26] || (k[26] = e("label", { class: "kb-label" }, [
          G(" Media URL "),
          e("span", { class: "kb-helper" }, "Public URL for the image, video, or document used in the template.")
        ], -1)),
        e("input", {
          type: "url",
          class: "kb-input",
          placeholder: "https://...",
          value: m.value.media_url ?? "",
          onInput: k[6] || (k[6] = (B) => ae({
            media_url: B.target.value || void 0
          }))
        }, null, 40, Hl)
      ])) : h("", !0),
      x.value === "document" || A.value === "document" ? (a(), s("div", zl, [
        k[27] || (k[27] = e("label", { class: "kb-label" }, [
          G(" Document filename "),
          e("span", { class: "kb-helper" }, "Filename shown in the document preview.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. invoice.pdf",
          value: m.value.document_filename ?? "",
          onInput: k[7] || (k[7] = (B) => ae({
            document_filename: B.target.value || void 0
          }))
        }, null, 40, ql)
      ])) : h("", !0),
      ["image", "video", "document"].includes(x.value) || ["image", "video", "document"].includes(A.value) ? (a(), s("div", Fl, [
        k[28] || (k[28] = e("label", { class: "kb-label" }, [
          G(" Media caption (optional) "),
          e("span", { class: "kb-helper" }, "Short line shown below the media.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Your order is on the way",
          value: m.value.media_caption ?? "",
          onInput: k[8] || (k[8] = (B) => ae({
            media_caption: B.target.value || void 0
          }))
        }, null, 40, jl)
      ])) : h("", !0),
      A.value === "lto" ? (a(), s("div", Kl, [
        k[29] || (k[29] = e("label", { class: "kb-label" }, [
          G(" Offer expiry "),
          e("span", { class: "kb-helper" }, "When this limited-time offer ends (for your reference and preview).")
        ], -1)),
        e("input", {
          type: "datetime-local",
          class: "kb-input",
          value: m.value.lto_expiry ?? "",
          onInput: k[9] || (k[9] = (B) => ae({
            lto_expiry: B.target.value || void 0
          }))
        }, null, 40, Yl)
      ])) : h("", !0),
      A.value === "flow" ? (a(), s("div", Jl, [
        k[30] || (k[30] = e("label", { class: "kb-label" }, [
          G(" Flow "),
          e("span", { class: "kb-helper" }, "Connect this template to a published WhatsApp Flow.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow ID",
          value: m.value.flow_id ?? "",
          onInput: k[10] || (k[10] = (B) => ae({
            flow_id: B.target.value || void 0
          }))
        }, null, 40, Gl),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Flow CTA label (e.g. Start booking)",
          value: m.value.flow_cta_label ?? "",
          onInput: k[11] || (k[11] = (B) => ae({
            flow_cta_label: B.target.value || void 0
          }))
        }, null, 40, Xl)
      ])) : h("", !0),
      A.value === "carousel" ? (a(), s("div", Ql, [
        e("label", { class: "kb-label" }, [
          k[31] || (k[31] = G(" Carousel cards ", -1)),
          e("span", { class: "kb-helper" }, "Each card can include media and one CTA. Max " + d(gt) + " cards.")
        ]),
        e("div", Zl, [
          (a(!0), s(W, null, q(Q.value, (B, X) => (a(), s("div", {
            key: B.id || X,
            class: "kb-card-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Card title",
              value: B.title ?? "",
              onInput: (ne) => Y(Number(X), { title: ne.target.value })
            }, null, 40, eo),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Card media URL",
              value: B.media_url ?? "",
              onInput: (ne) => Y(Number(X), { media_url: ne.target.value })
            }, null, 40, to),
            e("input", {
              type: "text",
              class: "kb-input",
              placeholder: "Button label",
              value: B.button_label ?? "",
              onInput: (ne) => Y(Number(X), { button_label: ne.target.value })
            }, null, 40, ao),
            e("input", {
              type: "url",
              class: "kb-input",
              placeholder: "Button URL",
              value: B.button_url ?? "",
              onInput: (ne) => Y(Number(X), { button_url: ne.target.value })
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
            onClick: ce
          }, " Add card ", 8, lo)
        ])
      ])) : h("", !0),
      ["mpm", "catalog"].includes(A.value) ? (a(), s("div", oo, [
        k[32] || (k[32] = e("label", { class: "kb-label" }, [
          G(" Products "),
          e("span", { class: "kb-helper" }, " Add product identifiers in the order they should appear in the WhatsApp template. ")
        ], -1)),
        e("div", io, [
          (a(!0), s(W, null, q(H.value, (B, X) => (a(), s("div", {
            key: B.id || X,
            class: "kb-product-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Product ID",
              value: B.productId,
              onInput: (ne) => w(Number(X), { productId: ne.target.value })
            }, null, 40, ro),
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-target",
              placeholder: "Section title (optional)",
              value: B.sectionTitle,
              onInput: (ne) => w(Number(X), { sectionTitle: ne.target.value || void 0 })
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
      ])) : h("", !0),
      A.value === "auth" ? (a(), s("div", po, [
        k[34] || (k[34] = e("label", { class: "kb-label" }, [
          G(" Authentication template "),
          e("span", { class: "kb-helper" }, "Configure how OTP / login codes should appear in this template.")
        ], -1)),
        e("select", {
          class: "kb-select",
          value: m.value.auth_type ?? "otp",
          onChange: k[12] || (k[12] = (B) => ae({
            auth_type: B.target.value
          }))
        }, [...k[33] || (k[33] = [
          e("option", { value: "otp" }, "One-time password (OTP)", -1),
          e("option", { value: "login" }, "Login approval", -1)
        ])], 40, mo),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "Code label (e.g. Your code is {{ .otp_code }})",
          value: m.value.auth_label ?? "",
          onInput: k[13] || (k[13] = (B) => ae({
            auth_label: B.target.value || void 0
          }))
        }, null, 40, vo)
      ])) : h("", !0),
      e("div", bo, [
        e("label", fo, [
          k[35] || (k[35] = G(" Body ", -1)),
          k[36] || (k[36] = e("span", { class: "kb-helper" }, " Body is required. Use Go placeholders like {{ .first_name }}, {{ .order_id }}. ", -1)),
          e("span", {
            class: re(["kb-counter", { "kb-counter--warn": P.value.length > tt }])
          }, d(P.value.length) + "/" + d(tt), 3)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} has been shipped...",
          value: P.value,
          onInput: k[14] || (k[14] = (B) => ae({
            body: B.target.value || void 0
          }))
        }, null, 40, go)
      ]),
      oe.value.length > 0 ? (a(), s("div", ho, [
        k[37] || (k[37] = e("label", { class: "kb-label" }, "Template fields", -1)),
        k[38] || (k[38] = e("p", { class: "kb-helper" }, "Placeholders used in header/body and whether they are configured.", -1)),
        e("ul", yo, [
          (a(!0), s(W, null, q(oe.value, (B) => (a(), s("li", {
            key: B.name,
            class: re(["kb-wa-field-item", { "kb-wa-field-item--ok": B.configured }])
          }, [
            e("span", ko, d(B.name), 1),
            e("span", _o, d(B.configured ? "Configured" : "Missing"), 1)
          ], 2))), 128))
        ])
      ])) : h("", !0),
      e("div", wo, [
        k[39] || (k[39] = e("label", { class: "kb-label" }, [
          G(" Footer (optional) "),
          e("span", { class: "kb-helper" }, "Small, muted line shown at the bottom of the message.")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. Reply STOP to unsubscribe",
          value: O.value,
          onInput: k[15] || (k[15] = (B) => ae({
            footer: B.target.value || void 0
          }))
        }, null, 40, $o),
        e("div", {
          class: re(["kb-counter kb-counter--inline", { "kb-counter--warn": O.value.length > at }])
        }, d(O.value.length) + "/" + d(at), 3)
      ]),
      P.value.trim().length > 0 ? (a(), s("div", xo, [
        e("label", { class: "kb-label" }, [
          k[40] || (k[40] = G(" Buttons (optional) ", -1)),
          e("span", { class: "kb-helper" }, " Use quick replies, CTA (URL/phone), or marketing opt-out. Max " + d(st) + " buttons. ")
        ]),
        e("div", Co, [
          (a(!0), s(W, null, q(D.value, (B, X) => (a(), s("div", {
            key: B.id || X,
            class: "kb-wa-button-row"
          }, [
            e("input", {
              type: "text",
              class: "kb-input kb-input--btn-label",
              placeholder: "Button label (e.g. View order)",
              value: B.label,
              onInput: (ne) => be(Number(X), { label: ne.target.value })
            }, null, 40, So),
            e("select", {
              class: "kb-select kb-select--btn-type",
              value: B.type ?? "quick_reply",
              onChange: (ne) => be(Number(X), { type: ne.target.value })
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
              onInput: (ne) => be(Number(X), { url: ne.target.value || void 0 })
            }, null, 40, Ao)) : B.type === "call" ? (a(), s("input", {
              key: 1,
              type: "tel",
              class: "kb-input kb-input--btn-target",
              placeholder: "+1 555 123 4567",
              value: B.phone,
              onInput: (ne) => be(Number(X), { phone: ne.target.value || void 0 })
            }, null, 40, Bo)) : B.type === "opt_out" ? (a(), s("span", Uo, " Sends a built-in opt-out action. ")) : h("", !0),
            e("button", {
              type: "button",
              class: "kb-wa-btn-remove",
              onClick: (ne) => z(Number(X))
            }, " Remove ", 8, Lo)
          ]))), 128)),
          e("button", {
            type: "button",
            class: "kb-wa-btn-add",
            disabled: D.value.length >= st,
            onClick: f
          }, " Add button ", 8, Ro)
        ])
      ])) : h("", !0)
    ]));
  }
}), Po = /* @__PURE__ */ Ce(To, [["__scopeId", "data-v-d088a85b"]]), Vo = { class: "wa-preview-root" }, Eo = { class: "wa-device" }, No = { class: "wa-screen" }, Oo = { class: "wa-header" }, Mo = { class: "wa-titleblock" }, Do = { class: "wa-title-row" }, Wo = { class: "wa-title" }, Ho = { class: "wa-subtitle" }, zo = {
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
}, hi = {
  key: 4,
  class: "wa-inline-note"
}, yi = {
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
}, Ai = { class: "wa-order-card" }, Bi = { class: "wa-order-card-top" }, Ui = ["src"], Li = { type: "button" }, Ri = {
  key: 1,
  class: "wa-msg wa-msg--in"
}, Ti = { class: "wa-document-card" }, Pi = { class: "wa-document-file" }, Vi = { class: "wa-document-icon" }, Ei = ["title"], Ni = { class: "wa-document-caption" }, Oi = {
  key: 2,
  class: "wa-msg wa-msg--in"
}, Mi = { class: "wa-voice-card" }, Di = { class: "wa-voice-top" }, Wi = { class: "wa-voice-profile" }, Hi = ["src"], zi = { class: "wa-voice-duration" }, qi = { class: "wa-voice-transcript" }, Fi = {
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
}, nr = { class: "wa-msg wa-msg--in" }, lr = { class: "wa-bubble wa-bubble--in" }, or = /* @__PURE__ */ we({
  __name: "WhatsAppTemplatePreview",
  props: {
    template: {}
  },
  setup(n) {
    const r = n;
    function v(f) {
      return String(f).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    const b = y(() => {
      var U;
      const f = ((U = r.template) == null ? void 0 : U.body) ?? "";
      return v(f).replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<b>$1</b>").replace(/_(.*?)_/g, "<i>$1</i>");
    }), _ = y(() => r.template.templateName || "Ecoshop"), m = y(() => "Business Account"), A = y(() => r.template.format === "flow" || !!r.template.flow), x = y(() => {
      var f;
      return (f = r.template.buttons) == null ? void 0 : f[0];
    }), S = y(() => {
      var f, w;
      return ((f = x.value) == null ? void 0 : f.text) || ((w = r.template.flow) == null ? void 0 : w.ctaLabel) || "";
    }), P = y(() => r.template.buttons ?? []), O = y(() => {
      var f;
      return (((f = r.template.multiProduct) == null ? void 0 : f.length) ?? 0) > 0;
    }), D = y(() => (r.template.format || "text").toUpperCase()), H = y(() => {
      const f = r.template.header;
      return !f || f.type === "text" ? "" : f.type === "image" ? f.url || "Image" : f.type === "video" ? f.url || "Video" : f.filename || f.url || "Document";
    }), Q = y(() => {
      const f = r.template.header;
      if (!(!f || f.type !== "image" || !f.url))
        return { backgroundImage: `url(${f.url})` };
    });
    function j(f) {
      if (!f) return "";
      try {
        const w = f.split("?")[0].split("#")[0], U = w.substring(w.lastIndexOf("/") + 1);
        return decodeURIComponent(U || "");
      } catch {
        return "";
      }
    }
    const ue = y(() => {
      const f = r.template.header;
      return !f || f.type !== "document" ? "" : f.filename || j(f.url) || "document.pdf";
    }), K = y(() => {
      const f = (r.template.body || "").match(/https?:\/\/[^\s]+/i);
      return (f == null ? void 0 : f[0]) || "";
    });
    function ee(f) {
      try {
        return new URL(f).hostname;
      } catch {
        return "example.com";
      }
    }
    const N = y(() => {
      const f = r.template.linkPreview;
      return !f && !K.value ? null : {
        title: (f == null ? void 0 : f.title) || "Link preview",
        description: (f == null ? void 0 : f.description) || "Preview from your WhatsApp template link.",
        domain: (f == null ? void 0 : f.domain) || (K.value ? ee(K.value) : "example.com"),
        url: (f == null ? void 0 : f.url) || K.value || "#",
        thumbnail: (f == null ? void 0 : f.thumbnail) || ""
      };
    }), oe = y(() => {
      var U, le, Y;
      const w = (Y = (((U = r.template.documentCard) == null ? void 0 : U.filename) || ((le = r.template.header) == null ? void 0 : le.filename) || "").split(".").pop()) == null ? void 0 : Y.trim().toUpperCase();
      return w ? w.slice(0, 4) : "DOC";
    });
    function ae(f, w) {
      return f === "phone_number" ? "wa-btn-icon--phone" : f === "url" ? "wa-btn-icon--external" : f === "copy_code" ? "wa-btn-icon--code" : f === "opt_out" || (w || "").toLowerCase().includes("unsubscribe") ? "wa-btn-icon--optout" : (w || "").toLowerCase().includes("location") ? "wa-btn-icon--location" : "wa-btn-icon--reply";
    }
    const he = y(() => {
      var f;
      return r.template.location || r.template.locationRequest ? "wa-side-icon--info" : ((f = r.template.header) == null ? void 0 : f.type) === "video" || r.template.voiceNote ? "wa-side-icon--play" : "wa-side-icon--share";
    }), ve = y(() => {
      var w, U, le;
      const f = r.template;
      return f.format === "flow" ? "Thanks, we received your preferences." : (w = f.auth) != null && w.code ? "Use the verification code and let us know if it works." : (U = f.coupon) != null && U.code ? `Your coupon ${f.coupon.code} is active now.` : f.limitedOffer ? `Great choice. This offer is valid until ${f.limitedOffer}.` : (le = r.template.multiProduct) != null && le.length ? `Here are ${r.template.multiProduct.length} options based on your selection.` : "Thanks for contacting us. We have shared the latest template details above.";
    }), be = y(() => {
      var w, U;
      const f = r.template;
      return f.location ? f.location.name || f.location.address || `${f.location.lat}, ${f.location.lng}` : (w = f.auth) != null && w.code ? `Verification code: ${f.auth.code}` : (U = f.flow) != null && U.id ? `Flow ID: ${f.flow.id}` : f.templateLanguage ? `Template language: ${f.templateLanguage}` : `Category: ${f.templateCategory || "utility"} • Format: ${f.format || "text"}`;
    }), z = y(() => {
      var U, le;
      const f = r.template;
      if ((U = f.multiProduct) != null && U.length) return f.multiProduct.slice(0, 5).map((Y) => Y.name || "Product");
      if ((le = f.buttons) != null && le.length) return f.buttons.slice(0, 5).map((Y) => Y.text || "Option");
      const w = (f.body || "").split(/\n|\.|,/).map((Y) => Y.trim()).filter(Boolean).slice(0, 5);
      return w.length ? w : ["Option A", "Option B", "Option C"];
    });
    return (f, w) => {
      var U, le, Y, L, ce, R, k, B, X, ne, ke, _e, $e, ge;
      return a(), s("div", Vo, [
        e("div", Eo, [
          e("div", No, [
            w[30] || (w[30] = He('<div class="wa-statusbar" data-v-244c945a><span class="wa-time" data-v-244c945a>11:59</span><div class="wa-status-icons" aria-hidden="true" data-v-244c945a><span class="wa-signal" data-v-244c945a></span><span class="wa-wifi" data-v-244c945a></span><span class="wa-battery" data-v-244c945a></span></div></div>', 1)),
            e("div", Oo, [
              w[7] || (w[7] = e("span", { class: "wa-back" }, "←", -1)),
              w[8] || (w[8] = e("div", { class: "wa-avatar" }, "ES", -1)),
              e("div", Mo, [
                e("div", Do, [
                  e("span", Wo, d(_.value), 1),
                  w[6] || (w[6] = e("span", { class: "wa-verified" }, "✓", -1))
                ]),
                e("span", Ho, d(m.value), 1)
              ]),
              w[9] || (w[9] = e("div", {
                class: "wa-header-actions",
                "aria-hidden": "true"
              }, [
                e("span", { class: "wa-icon wa-icon--store" }),
                e("span", { class: "wa-icon wa-icon--phone" }),
                e("span", { class: "wa-icon wa-icon--menu" })
              ], -1))
            ]),
            A.value ? (a(), s("div", zo, [
              w[14] || (w[14] = e("div", { class: "wa-flow-top-handle" }, null, -1)),
              e("div", qo, [
                w[10] || (w[10] = e("span", { class: "wa-flow-close" }, "✕", -1)),
                e("span", Fo, d(_.value), 1),
                w[11] || (w[11] = e("span", { class: "wa-flow-menu" }, "⋮", -1))
              ]),
              e("div", jo, [
                e("p", Ko, d(n.template.body || "Please choose an option below."), 1),
                (a(!0), s(W, null, q(z.value, (ie, c) => (a(), s("div", {
                  key: `flow-opt-${c}`,
                  class: "wa-flow-option"
                }, [
                  e("span", null, d(ie), 1),
                  e("span", {
                    class: re(["wa-radio", { "wa-radio--on": c === 0 }])
                  }, null, 2)
                ]))), 128)),
                (U = n.template.multiProduct) != null && U.length ? (a(), s("div", Yo, [
                  (a(!0), s(W, null, q(n.template.multiProduct.slice(0, 3), (ie, c) => (a(), s("div", {
                    key: c,
                    class: "wa-flow-product"
                  }, [
                    e("div", null, [
                      e("strong", null, d(ie.name || "Product"), 1),
                      e("p", null, d(ie.price || "Price on request"), 1)
                    ]),
                    w[12] || (w[12] = e("span", { class: "wa-radio" }, null, -1))
                  ]))), 128))
                ])) : h("", !0)
              ]),
              e("div", Jo, [
                S.value ? (a(), s("button", Go, d(S.value), 1)) : h("", !0),
                e("p", Xo, [
                  w[13] || (w[13] = G("Managed by EcoShop. ", -1)),
                  e("a", {
                    href: "#",
                    onClick: w[0] || (w[0] = qe(() => {
                    }, ["prevent"]))
                  }, "Learn more")
                ])
              ])
            ])) : (a(), s("div", Qo, [
              w[29] || (w[29] = e("div", { class: "wa-date-chip" }, "Today", -1)),
              e("div", Zo, [
                w[15] || (w[15] = e("span", null, "●", -1)),
                w[16] || (w[16] = G(" This business uses a secure service from Meta to manage this chat. ", -1)),
                e("a", {
                  href: "#",
                  onClick: w[1] || (w[1] = qe(() => {
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
                      w[17] || (w[17] = e("span", { class: "wa-card-media-play" }, "▶", -1))
                    ])) : n.template.header.type === "document" ? (a(), s("a", {
                      key: 2,
                      href: "#",
                      class: "wa-card-media-doc",
                      onClick: w[2] || (w[2] = qe(() => {
                      }, ["prevent"]))
                    }, [
                      e("span", oi, d(oe.value), 1),
                      e("span", {
                        class: "wa-card-media-doc-name",
                        title: ue.value
                      }, d(ue.value), 9, ii)
                    ])) : (a(), s("div", ri, [
                      e("div", di, d(D.value) + " TEMPLATE", 1),
                      e("div", ui, d(H.value), 1),
                      Q.value ? (a(), s("div", {
                        key: 0,
                        class: "wa-card-media-image",
                        style: me(Q.value)
                      }, null, 4)) : h("", !0)
                    ]))
                  ])) : (le = n.template.header) != null && le.text ? (a(), s("div", ci, d(n.template.header.text), 1)) : h("", !0),
                  e("div", {
                    class: "wa-card-body",
                    innerHTML: b.value
                  }, null, 8, pi),
                  N.value ? (a(), s("div", mi, [
                    e("div", vi, [
                      N.value.thumbnail ? (a(), s("div", {
                        key: 0,
                        class: "wa-link-preview-thumb",
                        style: me({ backgroundImage: `url(${N.value.thumbnail})` })
                      }, null, 4)) : h("", !0),
                      e("div", bi, [
                        e("strong", null, d(N.value.title), 1),
                        e("p", null, d(N.value.description), 1),
                        e("span", null, d(N.value.domain), 1)
                      ])
                    ]),
                    e("a", {
                      href: N.value.url,
                      onClick: w[3] || (w[3] = qe(() => {
                      }, ["prevent"]))
                    }, d(N.value.url), 9, fi)
                  ])) : h("", !0),
                  n.template.location ? (a(), s("div", gi, " 📍 " + d(n.template.location.name || n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)) : h("", !0),
                  (Y = n.template.coupon) != null && Y.code ? (a(), s("div", hi, [
                    w[18] || (w[18] = G(" Coupon: ", -1)),
                    e("strong", null, d(n.template.coupon.code), 1)
                  ])) : h("", !0),
                  (L = n.template.auth) != null && L.code ? (a(), s("div", yi, [
                    w[19] || (w[19] = G(" Verification code: ", -1)),
                    e("strong", null, d(n.template.auth.code), 1)
                  ])) : h("", !0),
                  n.template.limitedOffer ? (a(), s("div", ki, " Expires: " + d(n.template.limitedOffer), 1)) : h("", !0),
                  n.template.footer ? (a(), s("div", _i, d(n.template.footer), 1)) : h("", !0),
                  O.value ? (a(), s("div", wi, [
                    (a(!0), s(W, null, q((ce = n.template.multiProduct) == null ? void 0 : ce.slice(0, 4), (ie, c) => (a(), s("div", {
                      key: `prod-${c}`,
                      class: "wa-product-row"
                    }, [
                      e("span", $i, d(ie.name || `Item ${c + 1}`), 1),
                      e("span", xi, d(ie.price || "-"), 1)
                    ]))), 128))
                  ])) : h("", !0),
                  S.value ? (a(), s("button", Ci, [
                    x.value ? (a(), s("span", {
                      key: 0,
                      class: re(["wa-btn-icon", ae(x.value.type, x.value.value || x.value.text)]),
                      "aria-hidden": "true"
                    }, null, 2)) : h("", !0),
                    G(" " + d(S.value), 1)
                  ])) : h("", !0),
                  P.value.length > 1 ? (a(), s("div", Si, [
                    (a(!0), s(W, null, q(P.value.slice(1, 4), (ie, c) => (a(), s("button", {
                      key: `action-${c}`,
                      type: "button",
                      class: "wa-template-action"
                    }, [
                      e("span", {
                        class: re(["wa-btn-icon", ae(ie.type, ie.value || ie.text)]),
                        "aria-hidden": "true"
                      }, null, 2),
                      G(" " + d(ie.text), 1)
                    ]))), 128))
                  ])) : h("", !0),
                  w[20] || (w[20] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ]),
                e("span", {
                  class: re(["wa-side-icon", he.value]),
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
                    }, null, 8, Ui)) : h("", !0),
                    e("div", null, [
                      e("strong", null, d(n.template.orderCard.title || "Order #238990321"), 1),
                      e("p", null, d(n.template.orderCard.items || "3 items"), 1)
                    ])
                  ]),
                  e("button", Li, d(n.template.orderCard.buttonLabel || "View"), 1),
                  w[21] || (w[21] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1))
                ])
              ])) : h("", !0),
              n.template.documentCard || ((R = n.template.header) == null ? void 0 : R.type) === "document" ? (a(), s("div", Ri, [
                e("div", Ti, [
                  e("div", Pi, [
                    e("span", Vi, d(oe.value), 1),
                    e("div", null, [
                      e("strong", {
                        title: ((k = n.template.documentCard) == null ? void 0 : k.filename) || ((B = n.template.header) == null ? void 0 : B.filename) || "document.pdf"
                      }, d(((X = n.template.documentCard) == null ? void 0 : X.filename) || ((ne = n.template.header) == null ? void 0 : ne.filename) || "document.pdf"), 9, Ei),
                      e("p", null, d(((ke = n.template.documentCard) == null ? void 0 : ke.size) || "243 KB • html"), 1)
                    ]),
                    w[22] || (w[22] = e("span", { class: "wa-document-download" }, "↓", -1))
                  ]),
                  e("p", Ni, d(((_e = n.template.documentCard) == null ? void 0 : _e.caption) || n.template.mediaCaption || "Document attached"), 1)
                ])
              ])) : h("", !0),
              n.template.voiceNote ? (a(), s("div", Oi, [
                e("div", Mi, [
                  e("div", Di, [
                    w[24] || (w[24] = e("span", { class: "wa-voice-play" }, "▶", -1)),
                    w[25] || (w[25] = e("div", { class: "wa-voice-wave" }, null, -1)),
                    e("div", Wi, [
                      n.template.voiceNote.profileImage ? (a(), s("img", {
                        key: 0,
                        src: n.template.voiceNote.profileImage,
                        alt: "Profile"
                      }, null, 8, Hi)) : h("", !0),
                      w[23] || (w[23] = e("span", { class: "wa-voice-profile-mic" }, "🎤", -1))
                    ])
                  ]),
                  e("p", zi, d(n.template.voiceNote.duration || "0:10"), 1),
                  e("p", qi, d(n.template.voiceNote.transcript || "Voice note transcript preview."), 1)
                ])
              ])) : h("", !0),
              n.template.contactCard ? (a(), s("div", Fi, [
                e("div", ji, [
                  e("strong", null, d(n.template.contactCard.name || "Contact Name"), 1),
                  e("p", null, d(n.template.contactCard.title || "Lead Counsel - Legal"), 1),
                  e("p", null, d(n.template.contactCard.phone || "+1 650 555 9999"), 1),
                  e("p", null, d(n.template.contactCard.email || "contact@example.com"), 1),
                  e("p", null, d(n.template.contactCard.address || "1 Business Street"), 1)
                ])
              ])) : h("", !0),
              n.template.location && n.template.locationRequest ? (a(), s("div", Ki, [
                e("div", Yi, [
                  w[26] || (w[26] = e("div", { class: "wa-location-map" }, null, -1)),
                  e("div", Ji, [
                    e("strong", null, d(n.template.location.name || "Location"), 1),
                    e("a", {
                      href: "#",
                      onClick: w[4] || (w[4] = qe(() => {
                      }, ["prevent"]))
                    }, d(n.template.location.address || `${n.template.location.lat}, ${n.template.location.lng}`), 1)
                  ]),
                  e("button", Gi, d(n.template.locationRequest.label || "Send location"), 1)
                ])
              ])) : h("", !0),
              ($e = n.template.carouselCards) != null && $e.length ? (a(), s("div", Xi, [
                e("div", Qi, [
                  (a(!0), s(W, null, q(n.template.carouselCards.slice(0, 4), (ie, c) => (a(), s("article", {
                    key: `c-${c}`,
                    class: "wa-carousel-card"
                  }, [
                    e("div", {
                      class: "wa-carousel-media",
                      style: me(ie.image ? { backgroundImage: `url(${ie.image})` } : void 0)
                    }, null, 4),
                    e("strong", null, d(ie.title || `Card ${c + 1}`), 1),
                    e("p", null, d(ie.description || "Card description"), 1),
                    e("button", Zi, d(ie.button || "Learn more"), 1)
                  ]))), 128))
                ])
              ])) : h("", !0),
              e("div", er, [
                e("div", tr, [
                  e("span", ar, d(_.value), 1),
                  e("p", null, d(ve.value), 1),
                  w[27] || (w[27] = e("div", { class: "wa-meta-time" }, "11:59 ✓✓", -1)),
                  n.template.reactionEmoji ? (a(), s("span", sr, d(n.template.reactionEmoji), 1)) : h("", !0)
                ])
              ]),
              e("div", nr, [
                e("div", lr, [
                  e("p", null, d(be.value), 1),
                  (ge = n.template.flow) != null && ge.id ? (a(), s("a", {
                    key: 0,
                    href: "#",
                    onClick: w[5] || (w[5] = qe(() => {
                    }, ["prevent"]))
                  }, "wa-flow://" + d(n.template.flow.id), 1)) : h("", !0),
                  w[28] || (w[28] = e("div", { class: "wa-meta-time" }, "11:59", -1))
                ])
              ])
            ])),
            w[31] || (w[31] = He('<div class="wa-inputbar" data-v-244c945a><span class="wa-input-icon wa-input-icon--emoji" data-v-244c945a></span><span class="wa-input-placeholder" data-v-244c945a>Message</span><span class="wa-input-icon wa-input-icon--attach" data-v-244c945a></span><span class="wa-input-icon wa-input-icon--camera" data-v-244c945a></span><button type="button" class="wa-mic" data-v-244c945a><span class="wa-input-icon wa-input-icon--mic" data-v-244c945a></span></button></div>', 1))
          ])
        ])
      ]);
    };
  }
}), ir = /* @__PURE__ */ Ce(or, [["__scopeId", "data-v-244c945a"]]), rr = { class: "keos-whatsapp-builder" }, dr = { class: "kb-builder-top" }, ur = { class: "kb-wa-layout" }, cr = { class: "kb-wa-sidebar" }, pr = {
  key: 0,
  class: "kb-wa-form"
}, mr = { class: "kb-wa-form-head" }, vr = { class: "kb-wa-form-head-top" }, br = { class: "kb-wa-health-pill" }, fr = { class: "kb-wa-form-head-row" }, gr = ["value"], hr = { class: "kb-wa-health" }, yr = { class: "kb-wa-health-row" }, kr = { class: "kb-wa-health-value" }, _r = {
  class: "kb-wa-health-bar",
  role: "presentation"
}, wr = { class: "kb-wa-canvas" }, $r = {
  key: 0,
  class: "kb-wa-test-banner"
}, xr = { class: "kb-wa-preview-chrome" }, Cr = { class: "kb-push-preview-controls" }, Sr = { class: "kb-push-preview-as" }, Ir = ["value"], Ar = { class: "kb-preview-status" }, Br = { class: "kb-wa-actions" }, Ur = {
  key: 0,
  class: "kb-actions-note"
}, Lr = { key: 0 }, Rr = { class: "kb-wa-actions-right" }, Tr = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wa-preset-confirm-title"
}, Pr = { class: "kb-confirm-dialog" }, Vr = { class: "kb-confirm-actions" }, ht = 60, yt = 1024, kt = 60, _t = 10, wt = 10, Er = /* @__PURE__ */ we({
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
      var J, p, o, V, $;
      const C = [], te = c.message, Z = (te.template_category ?? "").toString().trim(), pe = (te.template_type ?? "text").toString(), xe = (te.header_type ?? "none").toString(), Se = (te.header ?? "").toString(), Ue = (te.body ?? "").toString(), Le = (te.footer ?? "").toString(), Re = Array.isArray(te.buttons) ? te.buttons : [], Ie = Array.isArray(te.cards) ? te.cards : [];
      return (J = c.name) != null && J.trim() || C.push("Template name is required"), (p = te.template_name) != null && p.trim() || C.push("WhatsApp template name is required"), Z || C.push("WhatsApp category is required (Marketing, Utility, or Authentication)"), Ue.trim() || C.push("Body is required"), xe === "text" && Se.length > ht && C.push(`Header text cannot exceed ${ht} characters`), Ue.length > yt && C.push(`Body cannot exceed ${yt} characters`), Le.length > kt && C.push(`Footer cannot exceed ${kt} characters`), Re.length > _t && C.push(`Buttons cannot exceed ${_t}`), (pe === "image" || pe === "video" || pe === "document" || xe === "image" || xe === "video" || xe === "document") && !te.media_url && C.push("Media URL is required for rich media templates"), Z === "authentication" && pe !== "auth" && C.push("Authentication category must use Authentication format"), pe === "auth" && !((o = te.auth_label) != null && o.trim()) && !Ue.includes("{{") && C.push("Authentication templates should include a code label or placeholder variable"), pe === "lto" && !te.lto_expiry && C.push("Limited-time offer requires an expiry"), (pe === "mpm" || pe === "catalog") && !((V = te.products) != null && V.length) && C.push("Catalog and multi-product templates require at least one product"), pe === "flow" && !(($ = te.flow_id) != null && $.trim()) && C.push("WhatsApp Flow format requires a flow ID"), pe === "carousel" && (Ie.length ? Ie.length > wt && C.push(`Carousel supports up to ${wt} cards`) : C.push("Carousel format requires at least one card")), C;
    }
    const b = n, _ = r, {
      campaign: m,
      dirty: A,
      customValidatorErrors: x,
      getValidationWithWarnings: S,
      update: P,
      updateMessage: O,
      undo: D,
      redo: H,
      canUndo: Q,
      canRedo: j,
      resetMessage: ue,
      hooks: K
    } = Ge({
      initial: b.modelValue,
      hooks: {
        ...b.hooks,
        customValidators: async (c) => {
          var Z;
          const C = v(c), te = (Z = b.hooks) != null && Z.customValidators ? await b.hooks.customValidators(c) : [];
          return [...C, ...te];
        }
      },
      onDirty: () => _("change", m.value)
    }), { lastSavedAt: ee } = Xe(m, { channel: "whatsapp" });
    function N(c) {
      (c.metaKey || c.ctrlKey) && c.key === "z" && (c.preventDefault(), c.shiftKey ? H() : D());
    }
    je(() => {
      window.addEventListener("keydown", N);
    }), Ke(() => {
      window.removeEventListener("keydown", N);
    }), Be(m, (c) => _("update:modelValue", c), { deep: !0 });
    const oe = se(), ae = se(!0);
    async function he() {
      if (K.estimateReach)
        try {
          oe.value = await K.estimateReach(m.value.audience);
        } catch {
          oe.value = void 0;
        }
      K.canSend && (ae.value = await Promise.resolve(K.canSend()));
    }
    he(), Be(() => m.value.audience, he, { deep: !0 });
    const ve = y(() => (x.value, S(oe.value))), be = y(() => ve.value.blockingErrors), z = y(() => ve.value.warnings), f = y(() => ve.value.valid), w = y(() => {
      var Z, pe, xe;
      const c = m.value.message, C = [
        !!((Z = c.template_name) != null && Z.trim()),
        !!((pe = c.template_category) != null && pe.trim()),
        !!(c.body ?? "").toString().trim(),
        !!((xe = c.template_language) != null && xe.trim()),
        Array.isArray(c.buttons) ? c.buttons.length > 0 : !1
      ], te = C.filter(Boolean).length;
      return Math.round(te / C.length * 100);
    }), U = y(() => w.value >= 90 ? "Production ready" : w.value >= 70 ? "Strong draft" : w.value >= 40 ? "In progress" : "Needs setup"), le = y(() => {
      const c = m.value.message;
      return !!((c.body ?? "").toString().trim() || (c.header ?? "").toString().trim() || c.media_url || c.flow_id || c.coupon_code || c.lto_expiry || c.voice_transcript || c.contact_name || c.link_title || c.order_title || Array.isArray(c.buttons) && c.buttons.length || Array.isArray(c.products) && c.products.length || Array.isArray(c.cards) && c.cards.length);
    }), Y = se(""), L = se(!1), ce = se(null), R = y(() => {
      const c = Y.value;
      return c ? De.find((C) => C.id === c) ?? null : null;
    }), k = y(() => {
      const c = m.value.message.body ?? "";
      return R.value ? Ne(c, R.value.data) : c;
    }), B = y(() => {
      const c = m.value.message.header ?? "";
      return R.value ? Ne(c, R.value.data) : c;
    }), X = y(() => {
      var p;
      const c = m.value.message, C = c.template_type ?? "text", te = c.header_type ?? "none";
      let Z, pe, xe, Se, Ue, Le, Re;
      (C === "image" || te === "image") && c.media_url ? Z = { type: "image", url: c.media_url } : (C === "video" || te === "video") && c.media_url ? Z = { type: "video", url: c.media_url } : C === "document" || te === "document" ? Z = {
        type: "document",
        url: c.media_url || void 0,
        filename: c.document_filename || c.media_url || "document.pdf"
      } : te === "text" && c.header ? Z = { type: "text", text: B.value } : c.header && (Z = { type: "text", text: B.value });
      const Ie = k.value || "Start adding content to see a live preview here.";
      if (C === "location" && c.location) {
        const o = c.location, V = o.lat ?? o.latitude, $ = o.lng ?? o.lon ?? o.longitude;
        V != null && $ != null && (pe = {
          lat: V,
          lng: $,
          name: o.name ?? o.title,
          address: o.address ?? `${V}, ${$}`
        });
      }
      (C === "catalog" || C === "mpm") && Array.isArray(c.products) && c.products.length && (xe = !0, Se = c.products.map((o) => ({
        image: o.image ?? o.imageUrl,
        name: o.name ?? o.sectionTitle ?? o.title ?? "Product",
        price: o.price ?? o.productId ?? ""
      }))), C === "carousel" && Array.isArray(c.cards) && c.cards.length && (xe = !0, Se = c.cards.map((o) => ({
        image: o.image ?? o.media_url,
        name: o.title ?? "Card",
        price: o.button_label ?? ""
      }))), C === "coupon" && c.coupon_code && (Ue = { code: c.coupon_code }), C === "lto" && c.lto_expiry && (Le = c.lto_expiry), C === "auth" && (Re = { code: c.auth_code ?? c.otp_code ?? "123 456" });
      const J = c.buttons ?? [];
      return C === "flow" && ((p = c.flow_cta_label) != null && p.trim()) && J.push({
        label: c.flow_cta_label
      }), {
        format: C,
        templateName: c.template_name || void 0,
        templateLanguage: c.template_language || void 0,
        templateCategory: c.template_category || void 0,
        header: Z,
        body: Ie,
        mediaCaption: c.media_caption || void 0,
        footer: c.footer || void 0,
        buttons: J.map((o) => ({ text: o.label || "Button", type: o.type, value: o.value })),
        location: pe,
        catalog: xe,
        multiProduct: Se,
        coupon: Ue,
        limitedOffer: Le,
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
        documentCard: c.document_filename || C === "document" || te === "document" ? {
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
        carouselCards: C === "carousel" && Array.isArray(c.cards) ? c.cards.map((o) => ({
          title: o.title || void 0,
          description: o.description || c.body || void 0,
          image: o.media_url || void 0,
          button: o.button_label || void 0
        })) : void 0,
        reactionEmoji: c.reaction_emoji || void 0,
        flow: C === "flow" ? {
          id: c.flow_id || void 0,
          ctaLabel: c.flow_cta_label || "Open flow"
        } : void 0
      };
    });
    function ne(c) {
      const C = m.value, te = c.campaign.message ? { ...C.message, ...c.campaign.message } : C.message;
      P({
        ...c.campaign,
        message: te
      }), ce.value = null, L.value = !1;
    }
    function ke(c) {
      const C = c.target.value;
      if (!C) return;
      const te = vt.find((Z) => Z.id === C);
      te && (A.value ? (ce.value = te, L.value = !0) : ne(te), c.target.value = "");
    }
    function _e(c) {
      P({
        name: c,
        message: { ...m.value.message, template_name: c || void 0 },
        tracking: { ...m.value.tracking ?? {}, campaign_name: c }
      });
    }
    function $e(c) {
      if (O(c), Object.prototype.hasOwnProperty.call(c ?? {}, "template_name")) {
        const C = String((c == null ? void 0 : c.template_name) ?? "");
        C !== m.value.name && P({
          name: C,
          tracking: {
            ...m.value.tracking ?? {},
            campaign_name: C
          }
        });
      }
    }
    Be(
      () => m.value.name,
      (c) => {
        const C = String(m.value.message.template_name ?? "");
        (c || "") !== C && O({ template_name: c || void 0 });
      },
      { immediate: !0 }
    );
    function ge(c) {
      const C = ` {{ .${c.variable} }}`, te = m.value.message.variables ?? [], Z = Array.from(/* @__PURE__ */ new Set([...te, c.variable]));
      if (c.field === "title") {
        const pe = m.value.message.header ?? "";
        O({
          variables: Z,
          header: pe + C
        });
      } else {
        const pe = m.value.message.body ?? "";
        O({
          variables: Z,
          body: pe + C
        });
      }
    }
    function ie() {
      f.value && _("save", m.value);
    }
    return (c, C) => {
      var te;
      return a(), s("div", rr, [
        e("div", dr, [
          Ae(Qe, {
            "campaign-name": g(m).name,
            status: g(m).status,
            dirty: g(A),
            "last-saved-at": g(ee),
            "can-undo": g(Q),
            "can-redo": g(j),
            "slugify-name": b.enforceSlugName,
            "onUpdate:campaignName": _e,
            onUndo: g(D),
            onRedo: g(H)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          be.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Oe).input}px`,
              padding: `${g(de)[12]}px ${g(de)[16]}px`,
              marginBottom: `${g(de)[16]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (a(!0), s(W, null, q(be.value, (Z) => (a(), s("li", {
                key: Z.message
              }, d(Z.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", ur, [
          e("aside", cr, [
            n.disabledSections.includes("whatsapp") ? h("", !0) : (a(), s("div", pr, [
              e("div", mr, [
                e("div", vr, [
                  C[6] || (C[6] = e("span", { class: "kb-wa-form-head-label" }, "Template", -1)),
                  e("span", br, d(U.value), 1)
                ]),
                e("div", fr, [
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: ke
                  }, [
                    C[7] || (C[7] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, q(g(vt), (Z) => (a(), s("option", {
                      key: Z.id,
                      value: Z.id
                    }, d(Z.label), 9, gr))), 128))
                  ], 32)
                ]),
                e("div", hr, [
                  e("div", yr, [
                    C[8] || (C[8] = e("span", { class: "kb-wa-health-title" }, "Setup quality", -1)),
                    e("span", kr, d(w.value) + "%", 1)
                  ]),
                  e("div", _r, [
                    e("span", {
                      class: "kb-wa-health-fill",
                      style: me({ width: `${w.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ae(Po, {
                message: g(m).message,
                "show-reset": !0,
                onUpdate: $e,
                onReset: C[0] || (C[0] = (Z) => g(ue)())
              }, null, 8, ["message"]),
              Ae(Rt, {
                message: g(m).message,
                "variable-options": n.variableOptions,
                onUpdate: g(O),
                onInsertVariable: ge
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", wr, [
            !n.designOnly && g(m).audience.test_mode ? (a(), s("div", $r, [...C[9] || (C[9] = [
              e("span", { class: "kb-wa-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", xr, [
              e("div", Cr, [
                e("label", Sr, [
                  C[11] || (C[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": C[1] || (C[1] = (Z) => Y.value = Z),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    C[10] || (C[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, q(g(De), (Z) => (a(), s("option", {
                      key: Z.id,
                      value: Z.id
                    }, d(Z.label), 9, Ir))), 128))
                  ], 512), [
                    [Ve, Y.value]
                  ])
                ]),
                e("div", Ar, [
                  C[12] || (C[12] = e("span", { class: "kb-preview-status-label" }, "Live render", -1)),
                  e("strong", null, d(g(m).message.template_type || "text"), 1)
                ])
              ]),
              e("div", {
                class: re(["kb-wa-preview-frame", { "kb-wa-preview-frame--empty": !le.value }])
              }, [
                Ae(ir, { template: X.value }, null, 8, ["template"])
              ], 2)
            ])
          ])
        ]),
        e("footer", Br, [
          z.value.length > 0 ? (a(), s("div", Ur, [
            C[13] || (C[13] = e("strong", null, "Warning:", -1)),
            G(" " + d((te = z.value[0]) == null ? void 0 : te.message) + " ", 1),
            z.value.length > 1 ? (a(), s("span", Lr, " (+" + d(z.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", Rr, [
            n.showDuplicate ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: C[2] || (C[2] = (Z) => _("duplicate", JSON.parse(JSON.stringify(g(m)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-wa-action kb-wa-action--secondary",
              onClick: ie
            }, " Save ")) : h("", !0),
            n.showClose ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-wa-action kb-wa-action--primary",
              onClick: C[3] || (C[3] = (Z) => _("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        L.value ? (a(), s("div", Tr, [
          e("div", Pr, [
            C[14] || (C[14] = e("h2", {
              id: "wa-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            C[15] || (C[15] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Vr, [
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--secondary",
                onClick: C[4] || (C[4] = (Z) => {
                  L.value = !1, ce.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-wa-action kb-wa-action--primary",
                onClick: C[5] || (C[5] = (Z) => ce.value && ne(ce.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Vt = /* @__PURE__ */ Ce(Er, [["__scopeId", "data-v-2c8edf9c"]]), Nr = { class: "kb-section" }, Or = { class: "kb-section__head" }, Mr = { class: "kb-field" }, Dr = ["value"], Wr = { class: "kb-field" }, Hr = { class: "kb-label" }, zr = { key: 0 }, qr = { key: 1 }, Fr = { key: 2 }, jr = ["value"], Kr = {
  key: 0,
  class: "kb-truncation-hint"
}, Yr = { class: "kb-field" }, Jr = { class: "kb-insert-row" }, Gr = ["value"], Xr = { class: "kb-field" }, Qr = { class: "kb-insert-row" }, Zr = /* @__PURE__ */ we({
  __name: "SectionSms",
  props: {
    message: {},
    variableOptions: {},
    showReset: { type: Boolean, default: !1 }
  },
  emits: ["update", "reset"],
  setup(n, { emit: r }) {
    const v = n, b = r, _ = ["first_name", "last_name", "order_id", "city"], m = se(v.variableOptions && v.variableOptions.length ? [...v.variableOptions] : _), A = se(m.value[0] ?? _[0]), x = se("");
    Be(
      () => v.variableOptions,
      (K) => {
        K && K.length && (m.value = [...K], m.value.includes(A.value) || (A.value = m.value[0]));
      }
    );
    const S = y(() => v.message.body ?? ""), P = y(() => S.value.length), O = y(() => P.value ? P.value <= 160 ? 1 : Math.ceil(P.value / 153) : 0), D = y(() => {
      const K = P.value;
      return K <= 160 ? null : K <= 306 ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    });
    function H(K) {
      const ee = K.target.value;
      b("update", {
        sender_id: ee || void 0
      });
    }
    function Q(K) {
      const ee = K.target.value;
      b("update", {
        body: ee
      });
    }
    function j() {
      const K = A.value;
      if (!K) return;
      const ee = ` {{ .${K} }}`, N = S.value || "", oe = v.message.variables ?? [], ae = Array.from(/* @__PURE__ */ new Set([...oe, K]));
      b("update", {
        body: N + ee,
        variables: ae
      });
    }
    function ue() {
      const K = x.value.trim();
      K && (m.value.includes(K) || (m.value = [...m.value, K]), A.value = K, x.value = "");
    }
    return (K, ee) => (a(), s("section", Nr, [
      e("div", Or, [
        ee[3] || (ee[3] = e("h3", { class: "kb-section__title" }, "SMS content", -1)),
        n.showReset ? (a(), s("button", {
          key: 0,
          type: "button",
          class: "kb-section__reset",
          onClick: ee[0] || (ee[0] = (N) => K.$emit("reset"))
        }, " Reset section ")) : h("", !0)
      ]),
      ee[10] || (ee[10] = e("p", { class: "kb-section__desc" }, " Configure sender ID and message body. We’ll estimate characters and segments as you type. ", -1)),
      e("div", Mr, [
        ee[4] || (ee[4] = e("label", { class: "kb-label" }, [
          G(" Sender ID "),
          e("span", { class: "kb-helper" }, " Alphanumeric (up to 11 characters) or phone number depending on country rules. ")
        ], -1)),
        e("input", {
          type: "text",
          class: "kb-input",
          placeholder: "e.g. KEOS, +12025550123",
          value: v.message.sender_id ?? "",
          onInput: H
        }, null, 40, Dr)
      ]),
      e("div", Wr, [
        e("label", Hr, [
          ee[5] || (ee[5] = G(" Message body ", -1)),
          e("span", {
            class: re(["kb-counter", { "kb-counter--warn": O.value > 3 }])
          }, [
            G(d(P.value) + " chars · ", 1),
            O.value === 0 ? (a(), s("span", zr, "0 segments")) : O.value === 1 ? (a(), s("span", qr, "1 segment")) : (a(), s("span", Fr, d(O.value) + " segments", 1))
          ], 2)
        ]),
        e("textarea", {
          class: "kb-textarea",
          rows: "4",
          placeholder: "Hi {{ .first_name }}, your order {{ .order_id }} is out for delivery.",
          value: S.value,
          onInput: Q
        }, null, 40, jr),
        ee[6] || (ee[6] = e("p", { class: "kb-hint" }, " Standard GSM messages are up to 160 characters. Longer messages are sent as multi-part SMS (153 characters per segment). ", -1)),
        D.value ? (a(), s("p", Kr, d(D.value), 1)) : h("", !0)
      ]),
      e("div", Yr, [
        ee[7] || (ee[7] = e("label", { class: "kb-label" }, "Personalization variables", -1)),
        e("div", Jr, [
          Te(e("select", {
            "onUpdate:modelValue": ee[1] || (ee[1] = (N) => A.value = N),
            class: "kb-select"
          }, [
            (a(!0), s(W, null, q(m.value, (N) => (a(), s("option", {
              key: N,
              value: N
            }, d(N), 9, Gr))), 128))
          ], 512), [
            [Ve, A.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: j
          }, " Insert into message ")
        ]),
        ee[8] || (ee[8] = e("p", { class: "kb-hint" }, " Variables render as {{ .variable_name }} at send time (e.g. .first_name, .city). ", -1))
      ]),
      e("div", Xr, [
        ee[9] || (ee[9] = e("label", { class: "kb-label" }, "Add custom variable", -1)),
        e("div", Qr, [
          Te(e("input", {
            "onUpdate:modelValue": ee[2] || (ee[2] = (N) => x.value = N),
            type: "text",
            class: "kb-input",
            placeholder: "e.g. appointment_time"
          }, null, 512), [
            [nt, x.value]
          ]),
          e("button", {
            type: "button",
            class: "kb-btn-insert",
            onClick: ue
          }, " Add ")
        ])
      ])
    ]));
  }
}), ed = /* @__PURE__ */ Ce(Zr, [["__scopeId", "data-v-f44c4aab"]]), td = { class: "keos-sms-builder" }, ad = { class: "kb-builder-top" }, sd = { class: "kb-sms-layout" }, nd = { class: "kb-sms-sidebar" }, ld = {
  key: 0,
  class: "kb-sms-form"
}, od = { class: "kb-sms-form-head" }, id = { class: "kb-sms-form-head-top" }, rd = { class: "kb-sms-health-pill" }, dd = { class: "kb-wa-form-head-row" }, ud = ["value"], cd = { class: "kb-sms-health" }, pd = { class: "kb-sms-health-row" }, md = { class: "kb-sms-health-value" }, vd = { class: "kb-sms-health-bar" }, bd = { class: "kb-sms-canvas" }, fd = {
  key: 0,
  class: "kb-sms-test-banner"
}, gd = { class: "kb-sms-preview-chrome" }, hd = { class: "kb-push-preview-controls" }, yd = { class: "kb-push-preview-as" }, kd = ["value"], _d = { class: "kb-preview-status" }, wd = { class: "kb-preview" }, $d = { class: "kb-sms-preview" }, xd = { class: "kb-sms-phone" }, Cd = { class: "kb-sms-header" }, Sd = { class: "kb-sms-sender-avatar" }, Id = { class: "kb-sms-header-copy" }, Ad = { class: "kb-sms-sender" }, Bd = { class: "kb-sms-meta" }, Ud = { class: "kb-sms-thread" }, Ld = {
  key: 0,
  class: "kb-sms-empty"
}, Rd = { class: "kb-sms-text" }, Td = { class: "kb-sms-bubble-meta" }, Pd = {
  key: 0,
  class: "kb-sms-segment-chip"
}, Vd = {
  key: 0,
  class: "kb-sms-more-segments"
}, Ed = { class: "kb-sms-delivery-line" }, Nd = { class: "kb-sms-counter" }, Od = { key: 0 }, Md = { key: 1 }, Dd = { key: 2 }, Wd = {
  key: 3,
  class: "kb-sms-cost"
}, Hd = {
  key: 0,
  class: "kb-sms-truncation-hint"
}, zd = { class: "kb-sms-actions" }, qd = {
  key: 0,
  class: "kb-actions-note"
}, Fd = { key: 0 }, jd = { class: "kb-sms-actions-right" }, Kd = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "sms-preset-confirm-title"
}, Yd = { class: "kb-confirm-dialog" }, Jd = { class: "kb-confirm-actions" }, Gd = /* @__PURE__ */ we({
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
    const v = n, b = r, {
      campaign: _,
      dirty: m,
      customValidatorErrors: A,
      getValidationWithWarnings: x,
      update: S,
      updateMessage: P,
      undo: O,
      redo: D,
      canUndo: H,
      canRedo: Q,
      resetMessage: j,
      hooks: ue
    } = Ge({
      initial: v.modelValue,
      hooks: {
        ...v.hooks,
        customValidators: async (J) => {
          var V, $;
          const p = [];
          (V = J.name) != null && V.trim() || p.push("Template name is required");
          const o = ($ = v.hooks) != null && $.customValidators ? await v.hooks.customValidators(J) : [];
          return [...p, ...o];
        }
      },
      onDirty: () => b("change", _.value)
    }), { lastSavedAt: K } = Xe(_, { channel: "sms" });
    function ee(J) {
      (J.metaKey || J.ctrlKey) && J.key === "z" && (J.preventDefault(), J.shiftKey ? D() : O());
    }
    je(() => {
      window.addEventListener("keydown", ee);
    }), Ke(() => {
      window.removeEventListener("keydown", ee);
    }), Be(_, (J) => b("update:modelValue", J), { deep: !0 });
    const N = se(), oe = se(!0);
    async function ae() {
      if (ue.estimateReach)
        try {
          N.value = await ue.estimateReach(_.value.audience);
        } catch {
          N.value = void 0;
        }
      ue.canSend && (oe.value = await Promise.resolve(ue.canSend()));
    }
    ae(), Be(() => _.value.audience, ae, { deep: !0 });
    const he = y(() => (A.value, x(N.value))), ve = y(() => he.value.blockingErrors), be = y(() => he.value.warnings), z = y(() => he.value.valid), f = y(() => {
      var V, $, F;
      const J = _.value.message, p = [
        !!((V = _.value.name) != null && V.trim()),
        !!(($ = J.body) != null && $.trim()),
        !!((F = J.sender_id) != null && F.trim()),
        !!_.value.template_type,
        (J.body ?? "").length > 20
      ], o = p.filter(Boolean).length;
      return Math.round(o / p.length * 100);
    }), w = y(() => f.value >= 90 ? "Production ready" : f.value >= 70 ? "Strong draft" : f.value >= 40 ? "In progress" : "Needs setup"), U = y(() => !!_e.value.trim()), le = y(
      () => _.value.template_type ?? "transactional"
    ), Y = se(""), L = se(!1), ce = se(null), R = y(() => {
      const J = Y.value;
      return J ? De.find((p) => p.id === J) ?? null : null;
    }), k = y(() => {
      const J = _e.value;
      return R.value ? Ne(J, R.value.data) : J;
    });
    function B(J) {
      const p = _.value, o = J.campaign.message ? { ...p.message, ...J.campaign.message } : p.message;
      S({
        ...J.campaign,
        message: o
      }), ce.value = null, L.value = !1;
    }
    function X(J) {
      const p = J.target.value;
      if (!p) return;
      const o = bt.find((V) => V.id === p);
      o && (m.value ? (ce.value = o, L.value = !0) : B(o), J.target.value = "");
    }
    function ne(J) {
      S({ template_type: J });
    }
    function ke(J) {
      S({
        name: J,
        tracking: { ..._.value.tracking ?? {}, campaign_name: J }
      });
    }
    const _e = y(
      () => (_.value.message.body ?? "") || ""
    ), $e = y(() => _e.value.length), ge = y(() => /[^\x00-\x7f]/.test(_e.value)), ie = y(() => ge.value ? 70 : 160), c = y(() => ge.value ? 67 : 153), C = y(() => $e.value ? $e.value <= ie.value ? 1 : Math.ceil($e.value / c.value) : 0), te = y(() => {
      const J = k.value.trim();
      if (!J) return [];
      const p = C.value <= 1 ? ie.value : c.value, o = [];
      for (let V = 0; V < J.length; V += p)
        o.push(J.slice(V, V + p));
      return o;
    }), Z = y(() => te.value.slice(0, 3)), pe = y(
      () => Math.max(0, te.value.length - Z.value.length)
    ), xe = y(() => ge.value ? "Unicode" : "GSM-7"), Se = y(() => U.value ? C.value > 3 ? "Queued" : "Delivered" : "Draft"), Ue = y(() => {
      const J = v.costPerSegment ?? 0;
      return !J || C.value === 0 ? null : (C.value * J).toFixed(2);
    }), Le = y(() => {
      const J = $e.value, p = ie.value + c.value;
      return J <= ie.value ? null : J <= p ? "Consider shortening to stay within 2 segments." : "Shorten this message to reduce segment count and cost.";
    }), Re = y(
      () => _.value.message.sender_id ?? "YourBrand"
    );
    function Ie() {
      z.value && b("save", _.value);
    }
    return (J, p) => {
      var o;
      return a(), s("div", td, [
        e("div", ad, [
          Ae(Qe, {
            "campaign-name": g(_).name,
            status: g(_).status,
            dirty: g(m),
            "last-saved-at": g(K),
            "can-undo": g(H),
            "can-redo": g(Q),
            "slugify-name": v.enforceSlugName,
            "onUpdate:campaignName": ke,
            onUndo: g(O),
            onRedo: g(D)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          ve.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Oe).input}px`,
              padding: `${g(de)[12]}px ${g(de)[16]}px`,
              marginBottom: `${g(de)[16]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (a(!0), s(W, null, q(ve.value, (V) => (a(), s("li", {
                key: V.message
              }, d(V.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", sd, [
          e("aside", nd, [
            n.disabledSections.includes("sms") ? h("", !0) : (a(), s("div", ld, [
              e("div", od, [
                e("div", id, [
                  p[6] || (p[6] = e("span", { class: "kb-sms-form-head-label" }, "Template", -1)),
                  e("span", rd, d(w.value), 1)
                ]),
                e("div", dd, [
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
                    (a(!0), s(W, null, q(g(bt), (V) => (a(), s("option", {
                      key: V.id,
                      value: V.id
                    }, d(V.label), 9, ud))), 128))
                  ], 32)
                ]),
                e("div", cd, [
                  e("div", pd, [
                    p[8] || (p[8] = e("span", { class: "kb-sms-health-title" }, "Setup quality", -1)),
                    e("span", md, d(f.value) + "%", 1)
                  ]),
                  e("div", vd, [
                    e("span", {
                      class: "kb-sms-health-fill",
                      style: me({ width: `${f.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ae(ed, {
                message: g(_).message,
                "variable-options": n.variableOptions,
                "show-reset": !0,
                onUpdate: g(P),
                onReset: p[0] || (p[0] = (V) => g(j)())
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", bd, [
            !n.designOnly && g(_).audience.test_mode ? (a(), s("div", fd, [...p[9] || (p[9] = [
              e("span", { class: "kb-sms-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", gd, [
              e("div", hd, [
                e("label", yd, [
                  p[11] || (p[11] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": p[1] || (p[1] = (V) => Y.value = V),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    p[10] || (p[10] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, q(g(De), (V) => (a(), s("option", {
                      key: V.id,
                      value: V.id
                    }, d(V.label), 9, kd))), 128))
                  ], 512), [
                    [Ve, Y.value]
                  ])
                ]),
                e("div", _d, [
                  p[12] || (p[12] = e("span", { class: "kb-preview-status-label" }, "Segments", -1)),
                  e("strong", null, d(C.value || 0), 1)
                ])
              ]),
              e("div", {
                class: re(["kb-sms-preview-frame", { "kb-sms-preview-frame--empty": !U.value }])
              }, [
                e("div", wd, [
                  e("div", $d, [
                    e("div", xd, [
                      p[15] || (p[15] = e("div", { class: "kb-sms-status-bar" }, [
                        e("span", { class: "kb-sms-time" }, "9:41"),
                        e("span", { class: "kb-sms-device-icons" }, [
                          e("i"),
                          e("i"),
                          e("i")
                        ])
                      ], -1)),
                      e("div", Cd, [
                        e("div", Sd, d(Re.value.slice(0, 1).toUpperCase()), 1),
                        e("div", Id, [
                          e("div", Ad, d(Re.value), 1),
                          e("div", Bd, "Text message · " + d(Se.value), 1)
                        ])
                      ]),
                      e("div", Ud, [
                        U.value ? (a(), s(W, { key: 1 }, [
                          (a(!0), s(W, null, q(Z.value, (V, $) => (a(), s("div", {
                            key: `${$}-${V.length}`,
                            class: "kb-sms-bubble kb-sms-bubble--outgoing"
                          }, [
                            e("span", Rd, d(V), 1),
                            e("span", Td, [
                              p[13] || (p[13] = G(" 09:21 ", -1)),
                              Z.value.length > 1 ? (a(), s("span", Pd, "Part " + d($ + 1), 1)) : h("", !0)
                            ])
                          ]))), 128)),
                          pe.value > 0 ? (a(), s("div", Vd, " +" + d(pe.value) + " more segments ", 1)) : h("", !0),
                          e("div", Ed, [
                            p[14] || (p[14] = e("span", { class: "kb-sms-delivery-dot" }, null, -1)),
                            G(" " + d(Se.value), 1)
                          ])
                        ], 64)) : (a(), s("div", Ld, " Start typing your SMS to see a realistic thread preview. "))
                      ])
                    ]),
                    e("p", Nd, [
                      G(d($e.value) + " characters · ", 1),
                      C.value === 0 ? (a(), s("span", Od, "0 segments")) : C.value === 1 ? (a(), s("span", Md, "1 segment")) : (a(), s("span", Dd, d(C.value) + " segments", 1)),
                      G(" (" + d(ie.value) + " chars single, " + d(c.value) + " multi-part · " + d(xe.value) + ") ", 1),
                      Ue.value !== null ? (a(), s("span", Wd, " · Est. " + d(Ue.value), 1)) : h("", !0)
                    ]),
                    Le.value ? (a(), s("p", Hd, d(Le.value), 1)) : h("", !0)
                  ])
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", zd, [
          be.value.length > 0 ? (a(), s("div", qd, [
            p[16] || (p[16] = e("strong", null, "Warning:", -1)),
            G(" " + d((o = be.value[0]) == null ? void 0 : o.message) + " ", 1),
            be.value.length > 1 ? (a(), s("span", Fd, " (+" + d(be.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", jd, [
            n.showDuplicate ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: p[2] || (p[2] = (V) => b("duplicate", JSON.parse(JSON.stringify(g(_)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-sms-action kb-sms-action--secondary",
              onClick: Ie
            }, " Save ")) : h("", !0),
            n.showClose ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-sms-action kb-sms-action--primary",
              onClick: p[3] || (p[3] = (V) => b("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        L.value ? (a(), s("div", Kd, [
          e("div", Yd, [
            p[17] || (p[17] = e("h2", {
              id: "sms-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            p[18] || (p[18] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", Jd, [
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--secondary",
                onClick: p[4] || (p[4] = (V) => {
                  L.value = !1, ce.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-sms-action kb-sms-action--primary",
                onClick: p[5] || (p[5] = (V) => ce.value && B(ce.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Et = /* @__PURE__ */ Ce(Gd, [["__scopeId", "data-v-5e442b56"]]), Xd = 30, Qd = 60, Zd = 130;
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
    const b = n.match(v);
    b && r.push(b[0]);
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
const lu = { class: "em-section" }, ou = { class: "em-strip kb-section" }, iu = { class: "em-strip-head" }, ru = { class: "em-field kb-field" }, du = ["value"], uu = { class: "em-field kb-field" }, cu = ["value"], pu = { class: "em-field kb-field" }, mu = ["value"], vu = { class: "em-field kb-field" }, bu = { class: "em-input-group" }, fu = ["value"], gu = { class: "em-var-picker-wrap" }, hu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, yu = ["onClick"], ku = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, _u = { class: "em-field kb-field" }, wu = { class: "em-input-group" }, $u = ["value"], xu = { class: "em-var-picker-wrap" }, Cu = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Su = ["onClick"], Iu = {
  key: 0,
  class: "em-analyzer em-analyzer--spam"
}, Au = { class: "em-strip kb-section em-strip--library" }, Bu = { class: "em-library-chips" }, Uu = ["onClick"], Lu = { class: "em-strip kb-section em-strip--blocks" }, Ru = { class: "em-block-list" }, Tu = ["data-type"], Pu = { class: "em-block-bar" }, Vu = { class: "em-block-type" }, Eu = { class: "em-block-actions" }, Nu = ["disabled", "onClick"], Ou = ["disabled", "onClick"], Mu = ["onClick"], Du = {
  key: 0,
  class: "em-block-fields"
}, Wu = ["value", "onChange"], Hu = ["value", "onInput"], zu = { class: "em-var-picker-wrap" }, qu = ["onClick"], Fu = {
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
}, mc = ["value", "onInput"], vc = ["value", "onInput"], bc = ["value", "onInput"], fc = { class: "em-var-picker-wrap" }, gc = ["onClick"], hc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, yc = ["onClick"], kc = {
  key: 6,
  class: "em-block-fields"
}, _c = ["value", "onChange"], wc = { class: "em-list-items" }, $c = ["value", "onInput", "placeholder"], xc = ["onClick"], Cc = ["onClick"], Sc = {
  key: 7,
  class: "em-block-fields"
}, Ic = ["value", "onChange"], Ac = ["value", "onInput"], Bc = { class: "em-var-picker-wrap" }, Uc = ["onClick"], Lc = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, Rc = ["onClick"], Tc = {
  key: 8,
  class: "em-block-fields"
}, Pc = { class: "em-social-links" }, Vc = ["value", "onChange"], Ec = ["value", "onInput"], Nc = ["onClick"], Oc = ["onClick"], Mc = {
  key: 9,
  class: "em-block-fields"
}, Dc = ["value", "onInput"], Wc = ["value", "onInput"], Hc = ["value", "onInput"], zc = {
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
}, vp = ["value", "onChange"], bp = { class: "em-inline-label" }, fp = ["value", "onInput"], gp = { class: "em-var-picker-wrap" }, hp = ["onClick"], yp = {
  key: 0,
  class: "em-var-menu",
  role: "menu"
}, kp = ["onClick"], _p = {
  key: 14,
  class: "em-block-fields"
}, wp = ["value", "onInput"], $p = { class: "em-link-list-items" }, xp = ["value", "onInput"], Cp = ["value", "onInput"], Sp = ["onClick"], Ip = ["onClick"], Ap = {
  key: 15,
  class: "em-block-fields"
}, Bp = ["value", "onInput"], Up = ["value", "onInput"], Lp = ["onClick"], Rp = ["onClick"], Tp = {
  key: 16,
  class: "em-block-fields"
}, Pp = ["value", "onInput"], Vp = ["value", "onInput"], Ep = ["value", "onInput"], Np = ["onClick"], Op = ["onClick"], Mp = {
  key: 17,
  class: "em-block-fields"
}, Dp = ["value", "onInput"], Wp = ["value", "onInput"], Hp = {
  key: 18,
  class: "em-block-fields"
}, zp = ["value", "onInput"], qp = ["value", "onInput"], Fp = ["value", "onInput"], jp = ["value", "onInput"], Kp = ["value", "onInput"], Yp = {
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
}, gm = ["onClick"], hm = ["onClick"], ym = ["onClick"], km = { class: "em-check-row" }, _m = ["checked", "onChange"], wm = { class: "em-add-bar kb-field kb-field--add-bar" }, $m = { class: "em-add-bar-btns" }, xm = { class: "em-strip kb-section em-strip--personalize" }, Cm = { class: "em-field kb-field" }, Sm = { class: "em-input-group" }, Im = ["value"], Am = { class: "em-field kb-field" }, Bm = { class: "em-input-group" }, Pe = "{{ .var }}", Um = /* @__PURE__ */ we({
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
    const b = [
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
    function m(u) {
      switch (u) {
        case "heading":
          return { id: v(), type: "heading", level: 1, content: "Heading", alignment: "left", fullWidth: !1 };
        case "paragraph":
          return { id: v(), type: "paragraph", content: "Your text here. Use {{ .first_name }} for personalization.", alignment: "left", fullWidth: !1 };
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
          return { id: v(), type: "social", links: b.map((l) => ({ ...l })), alignment: "center", fullWidth: !1 };
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
            leftContent: "Left column text or {{ .variable }}.",
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
const example = {{ .order_id }};`,
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
            imageUrl: "https://example.com/map/{{ .store_id }}.png",
            alt: "Dynamic image",
            fallbackUrl: ""
          };
        default:
          return { id: v(), type: "paragraph", content: "" };
      }
    }
    const A = n, x = r, S = ["first_name", "last_name", "order_id", "city", "email"], P = se(
      (I = A.variableOptions) != null && I.length ? [...A.variableOptions] : S
    ), O = se(P.value[0] ?? "first_name"), D = se("");
    Be(
      () => A.variableOptions,
      (u) => {
        u != null && u.length && (P.value = [...u], P.value.includes(O.value) || (O.value = P.value[0]));
      }
    );
    const H = y(() => A.message.subject ?? ""), Q = y(() => A.message.preview_text ?? ""), j = y(() => eu(H.value)), ue = y(() => tu(Q.value)), K = y(() => $t(H.value)), ee = y(() => $t(Q.value)), N = y(() => {
      const u = A.message.blocks;
      return Array.isArray(u) && u.length > 0 ? u : [m("paragraph")];
    });
    Be(
      () => A.message.blocks,
      (u) => {
        (!Array.isArray(u) || u.length === 0) && x("update", { blocks: [m("paragraph")] });
      },
      { immediate: !0 }
    );
    function oe(u) {
      x("update", { blocks: u });
    }
    function ae(u) {
      x("update", { subject: u.target.value });
    }
    function he(u) {
      const l = u.target.value;
      x("update", { preview_text: l || void 0 });
    }
    function ve(u) {
      x("update", { from_name: u.target.value || void 0 });
    }
    function be(u) {
      x("update", { from_address: u.target.value || void 0 });
    }
    function z(u) {
      x("update", { reply_to: u.target.value || void 0 });
    }
    const f = [
      {
        id: "hero",
        label: "Hero",
        blocks: () => [m("heading"), m("paragraph"), m("button")]
      },
      {
        id: "row",
        label: "Row (1–4 col)",
        blocks: () => [m("row")]
      },
      {
        id: "two_column",
        label: "2-column",
        blocks: () => [m("columns")]
      },
      {
        id: "menu_navbar",
        label: "Menu / Navbar",
        blocks: () => [m("navbar")]
      },
      {
        id: "social_footer",
        label: "Social footer",
        blocks: () => [m("social"), m("divider")]
      },
      {
        id: "legal_footer",
        label: "Legal footer (Unsubscribe, Address, View in browser)",
        blocks: () => [m("footer"), m("link_list")]
      }
    ];
    function w(u) {
      const l = u.blocks();
      oe([...N.value, ...l]);
    }
    function U(u) {
      const l = [...N.value, m(u)];
      oe(l);
    }
    function le(u) {
      oe(N.value.filter((l) => l.id !== u));
    }
    function Y(u, l) {
      const t = N.value.findIndex((E) => E.id === u);
      if (t < 0) return;
      const T = l === "up" ? t - 1 : t + 1;
      if (T < 0 || T >= N.value.length) return;
      const i = [...N.value];
      [i[t], i[T]] = [i[T], i[t]], oe(i);
    }
    function L(u, l) {
      const t = N.value.map((T) => T.id === u ? { ...T, ...l } : T);
      oe(t);
    }
    function ce(u, l, t) {
      const T = N.value.find((E) => E.id === u);
      if (!T || T.type !== "list") return;
      const i = [...T.items || []];
      i[l] = t, L(u, { items: i });
    }
    function R(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "list" || L(u, { items: [...l.items || [], "New item"] });
    }
    function k(u, l) {
      const t = N.value.find((i) => i.id === u);
      if (!t || t.type !== "list") return;
      const T = (t.items || []).filter((i, E) => E !== l);
      L(u, { items: T });
    }
    function B(u, l, t, T) {
      const i = N.value.find((M) => M.id === u);
      if (!i || i.type !== "social") return;
      const E = (i.links || []).map((M, ye) => ye === l ? { ...M, [t]: T } : M);
      L(u, { links: E });
    }
    function X(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "social" || L(u, { links: [...l.links || [], { platform: "custom", url: "" }] });
    }
    function ne(u, l) {
      const t = N.value.find((i) => i.id === u);
      if (!t || t.type !== "social") return;
      const T = (t.links || []).filter((i, E) => E !== l);
      L(u, { links: T });
    }
    function ke(u, l, t, T) {
      const i = N.value.find((M) => M.id === u);
      if (!i || i.type !== "link_list") return;
      const E = (i.links || []).map((M, ye) => ye === l ? { ...M, [t]: T } : M);
      L(u, { links: E });
    }
    function _e(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "link_list" || L(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function $e(u, l) {
      const t = N.value.find((i) => i.id === u);
      if (!t || t.type !== "link_list") return;
      const T = (t.links || []).filter((i, E) => E !== l);
      L(u, { links: T });
    }
    function ge(u, l) {
      const t = N.value.find((T) => T.id === u);
      if (!(!t || t.type !== "row")) {
        if (l.columnCount !== void 0 && l.columnCount !== t.columnCount) {
          const T = [...t.cells || []];
          for (; T.length < l.columnCount; ) T.push("Cell content");
          l.cells = T.slice(0, l.columnCount);
        }
        L(u, l);
      }
    }
    function ie(u, l, t) {
      const T = N.value.find((E) => E.id === u);
      if (!T || T.type !== "row") return;
      const i = [...T.cells || []];
      i[l] = t, L(u, { cells: i });
    }
    function c(u, l, t, T) {
      const i = N.value.find((M) => M.id === u);
      if (!i || i.type !== "navbar") return;
      const E = (i.links || []).map((M, ye) => ye === l ? { ...M, [t]: T } : M);
      L(u, { links: E });
    }
    function C(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "navbar" || L(u, { links: [...l.links || [], { text: "", url: "" }] });
    }
    function te(u, l) {
      const t = N.value.find((T) => T.id === u);
      !t || t.type !== "navbar" || L(u, { links: (t.links || []).filter((T, i) => i !== l) });
    }
    function Z(u, l, t, T) {
      const i = N.value.find((M) => M.id === u);
      if (!i || i.type !== "accordion") return;
      const E = (i.items || []).map((M, ye) => ye === l ? { ...M, [t]: T } : M);
      L(u, { items: E });
    }
    function pe(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "accordion" || L(u, { items: [...l.items || [], { title: "New section", content: "" }] });
    }
    function xe(u, l) {
      const t = N.value.find((T) => T.id === u);
      !t || t.type !== "accordion" || L(u, { items: (t.items || []).filter((T, i) => i !== l) });
    }
    function Se(u, l, t, T) {
      const i = N.value.find((M) => M.id === u);
      if (!i || i.type !== "carousel") return;
      const E = (i.slides || []).map((M, ye) => ye === l ? { ...M, [t]: T } : M);
      L(u, { slides: E });
    }
    function Ue(u) {
      const l = N.value.find((t) => t.id === u);
      !l || l.type !== "carousel" || L(u, { slides: [...l.slides || [], { imageUrl: "", linkUrl: "", alt: "" }] });
    }
    function Le(u, l) {
      const t = N.value.find((T) => T.id === u);
      !t || t.type !== "carousel" || L(u, { slides: (t.slides || []).filter((T, i) => i !== l) });
    }
    function Re(u, l = O.value) {
      const t = ` {{ .${l} }}`, T = A.message.variables ?? [], i = Array.from(/* @__PURE__ */ new Set([...T, l]));
      u === "subject" ? x("update", {
        subject: (H.value || "") + t,
        variables: i
      }) : x("update", {
        preview_text: (Q.value || "") + t,
        variables: i
      });
    }
    function Ie(u, l = O.value) {
      const t = N.value.find((We) => We.id === u);
      if (!t || t.type !== "paragraph" && t.type !== "heading" && t.type !== "footer" && t.type !== "quote" && t.type !== "liquid" && t.type !== "code_block") return;
      const T = ` {{ .${l} }}`, i = A.message.variables ?? [], E = Array.from(/* @__PURE__ */ new Set([...i, l])), M = (t.type === "footer", "content"), ze = (t[M] ?? "") + T, Fe = N.value.map(
        (We) => We.id === u ? { ...We, [M]: ze } : We
      );
      x("update", { blocks: Fe, variables: E });
    }
    function J(u, l, t = O.value) {
      const T = N.value.find((ze) => ze.id === u);
      if (!T || T.type !== "row") return;
      const i = ` {{ .${t} }}`, E = A.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...E, t])), ye = [...T.cells || []];
      ye[l] = (ye[l] || "") + i, L(u, { cells: ye }), x("update", { variables: M });
    }
    function p(u, l, t = O.value) {
      const T = N.value.find((We) => We.id === u);
      if (!T || T.type !== "columns") return;
      const i = ` {{ .${t} }}`, E = A.message.variables ?? [], M = Array.from(/* @__PURE__ */ new Set([...E, t])), ye = l === "left" ? "leftContent" : "rightContent", Fe = (T[ye] ?? "") + i;
      L(u, { [ye]: Fe }), x("update", { variables: M });
    }
    const o = se(null);
    function V(u) {
      o.value = o.value === u ? null : u;
    }
    function $(u, l) {
      if (l) {
        if (u === "subject") Re("subject", l);
        else if (u === "preview") Re("preview", l);
        else if (u.startsWith("block:")) Ie(u.slice(6), l);
        else if (u.startsWith("col-left:")) p(u.slice(9), "left", l);
        else if (u.startsWith("col-right:")) p(u.slice(10), "right", l);
        else if (u.startsWith("row:")) {
          const [, t, T] = u.split(":");
          J(t, Number(T), l);
        }
        o.value = null;
      }
    }
    function F() {
      const u = D.value.trim();
      !u || P.value.includes(u) || (P.value = [...P.value, u], O.value = u, D.value = "");
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
          }, " Reset section ")) : h("", !0)
        ]),
        l[35] || (l[35] = e("p", { class: "em-strip-desc" }, "Who the email is from and how it appears in the inbox.", -1)),
        e("div", ru, [
          l[29] || (l[29] = e("label", { class: "em-label" }, "From name", -1)),
          e("input", {
            type: "text",
            class: "em-input",
            placeholder: "e.g. Your Brand",
            value: n.message.from_name ?? "",
            onInput: ve
          }, null, 40, du)
        ]),
        e("div", uu, [
          l[30] || (l[30] = e("label", { class: "em-label" }, "From address", -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "notifications@yourdomain.com",
            value: n.message.from_address ?? "",
            onInput: be
          }, null, 40, cu)
        ]),
        e("div", pu, [
          l[31] || (l[31] = e("label", { class: "em-label" }, [
            G("Reply-to "),
            e("span", { class: "em-optional" }, "optional")
          ], -1)),
          e("input", {
            type: "email",
            class: "em-input",
            placeholder: "support@yourdomain.com",
            value: n.message.reply_to ?? "",
            onInput: z
          }, null, 40, mu)
        ]),
        e("div", vu, [
          l[32] || (l[32] = e("label", { class: "em-label" }, "Subject line", -1)),
          e("div", bu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "e.g. Your order {{ .order_id }} has shipped",
              value: H.value,
              onInput: ae
            }, null, 40, fu),
            e("div", gu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[1] || (l[1] = (t) => V("subject")),
                title: "Insert variable"
              }, d(Pe)),
              o.value === "subject" ? (a(), s("div", hu, [
                (a(!0), s(W, null, q(P.value, (t) => (a(), s("button", {
                  key: `subject-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (T) => $("subject", t)
                }, d(t), 9, yu))), 128))
              ])) : h("", !0)
            ])
          ]),
          e("span", {
            class: re(["em-analyzer", `em-analyzer--${j.value}`])
          }, d(g(su)(j.value)), 3),
          K.value.length ? (a(), s("span", ku, "Spammy: " + d(K.value.join(", ")), 1)) : h("", !0)
        ]),
        e("div", _u, [
          l[33] || (l[33] = e("label", { class: "em-label" }, [
            G("Preview text "),
            e("span", { class: "em-optional" }, "preheader")
          ], -1)),
          e("div", wu, [
            e("input", {
              type: "text",
              class: "em-input em-input--flex",
              placeholder: "Shown next to subject in inbox",
              value: Q.value,
              onInput: he
            }, null, 40, $u),
            e("div", xu, [
              e("button", {
                type: "button",
                class: "em-chip",
                onClick: l[2] || (l[2] = (t) => V("preview")),
                title: "Insert variable"
              }, d(Pe)),
              o.value === "preview" ? (a(), s("div", Cu, [
                (a(!0), s(W, null, q(P.value, (t) => (a(), s("button", {
                  key: `preview-var-${t}`,
                  type: "button",
                  class: "em-var-menu-item",
                  onClick: (T) => $("preview", t)
                }, d(t), 9, Su))), 128))
              ])) : h("", !0)
            ])
          ]),
          l[34] || (l[34] = e("span", { class: "em-hint" }, "~130 characters for best display.", -1)),
          e("span", {
            class: re(["em-analyzer", `em-analyzer--${ue.value}`])
          }, d(g(nu)(ue.value)), 3),
          ee.value.length ? (a(), s("span", Iu, "Spammy: " + d(ee.value.join(", ")), 1)) : h("", !0)
        ])
      ]),
      e("div", Au, [
        l[36] || (l[36] = e("h4", { class: "em-strip-title" }, "Block library", -1)),
        l[37] || (l[37] = e("p", { class: "em-strip-desc" }, "Insert reusable blocks.", -1)),
        e("div", Bu, [
          (a(), s(W, null, q(f, (t) => e("button", {
            key: t.id,
            type: "button",
            class: "em-library-chip",
            onClick: (T) => w(t)
          }, d(t.label), 9, Uu)), 64))
        ])
      ]),
      e("div", Lu, [
        l[64] || (l[64] = e("h4", { class: "em-strip-title" }, "Content blocks", -1)),
        l[65] || (l[65] = e("p", { class: "em-strip-desc" }, "Build the body. Reorder with arrows.", -1)),
        e("div", Ru, [
          (a(!0), s(W, null, q(N.value, (t, T) => (a(), s("div", {
            key: t.id,
            class: "em-block",
            "data-type": t.type
          }, [
            e("div", Pu, [
              e("span", Vu, d(t.type), 1),
              e("div", Eu, [
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: T === 0,
                  onClick: (i) => Y(t.id, "up"),
                  title: "Move up",
                  "aria-label": "Move up"
                }, "↑", 8, Nu),
                e("button", {
                  type: "button",
                  class: "em-block-btn",
                  disabled: T === N.value.length - 1,
                  onClick: (i) => Y(t.id, "down"),
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
              }, null, 40, Hu),
              e("div", zu, [
                e("button", {
                  type: "button",
                  class: "em-chip em-chip--sm",
                  onClick: (i) => V(`block:${t.id}`)
                }, d(Pe), 8, qu),
                o.value === `block:${t.id}` ? (a(), s("div", Fu, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `block-var-heading-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`block:${t.id}`, i)
                  }, d(i), 9, ju))), 128))
                ])) : h("", !0)
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
                  onClick: (i) => V(`block:${t.id}`)
                }, d(Pe), 8, Gu),
                o.value === `block:${t.id}` ? (a(), s("div", Xu, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `block-var-paragraph-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`block:${t.id}`, i)
                  }, d(i), 9, Qu))), 128))
                ])) : h("", !0)
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
                  onClick: (i) => V(`block:${t.id}`)
                }, d(Pe), 8, gc),
                o.value === `block:${t.id}` ? (a(), s("div", hc, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `block-var-footer-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`block:${t.id}`, i)
                  }, d(i), 9, yc))), 128))
                ])) : h("", !0)
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
                (a(!0), s(W, null, q(t.items || [], (i, E) => (a(), s("div", {
                  key: E,
                  class: "em-list-item-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i,
                    onInput: (M) => ce(t.id, E, M.target.value),
                    placeholder: `Item ${E + 1}`
                  }, null, 40, $c),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => k(t.id, E),
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
                  onClick: (i) => V(`block:${t.id}`)
                }, d(Pe), 8, Uc),
                o.value === `block:${t.id}` ? (a(), s("div", Lc, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `block-var-quote-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`block:${t.id}`, i)
                  }, d(i), 9, Rc))), 128))
                ])) : h("", !0)
              ])
            ])) : t.type === "social" ? (a(), s("div", Tc, [
              e("div", Pc, [
                (a(!0), s(W, null, q(t.links || [], (i, E) => (a(), s("div", {
                  key: E,
                  class: "em-social-row"
                }, [
                  e("select", {
                    value: i.platform,
                    class: "em-select em-select--sm",
                    onChange: (M) => B(t.id, E, "platform", M.target.value)
                  }, [...l[45] || (l[45] = [
                    He('<option value="facebook" data-v-64de8497>Facebook</option><option value="twitter" data-v-64de8497>Twitter / X</option><option value="instagram" data-v-64de8497>Instagram</option><option value="linkedin" data-v-64de8497>LinkedIn</option><option value="youtube" data-v-64de8497>YouTube</option><option value="tiktok" data-v-64de8497>TikTok</option><option value="custom" data-v-64de8497>Custom</option>', 7)
                  ])], 40, Vc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (M) => B(t.id, E, "url", M.target.value),
                    placeholder: "Profile URL"
                  }, null, 40, Ec),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => ne(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Nc)
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
              }, null, 40, Hc)
            ])) : t.type === "link_list" ? (a(), s("div", zc, [
              e("input", {
                type: "text",
                class: "em-input em-input--narrow",
                value: t.separator,
                onInput: (i) => L(t.id, { separator: i.target.value || " | " }),
                placeholder: "Separator",
                title: "e.g. | or ·"
              }, null, 40, qc),
              e("div", Fc, [
                (a(!0), s(W, null, q(t.links || [], (i, E) => (a(), s("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i.text,
                    onInput: (M) => ke(t.id, E, "text", M.target.value),
                    placeholder: "Label"
                  }, null, 40, jc),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (M) => ke(t.id, E, "url", M.target.value),
                    placeholder: "URL"
                  }, null, 40, Kc),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => $e(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Yc)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => _e(t.id)
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
                  onClick: (i) => V(`col-left:${t.id}`)
                }, d(Pe), 8, Zc),
                o.value === `col-left:${t.id}` ? (a(), s("div", ep, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `col-left-var-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`col-left:${t.id}`, i)
                  }, d(i), 9, tp))), 128))
                ])) : h("", !0)
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
                  onClick: (i) => V(`col-right:${t.id}`)
                }, d(Pe), 8, np),
                o.value === `col-right:${t.id}` ? (a(), s("div", lp, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `col-right-var-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`col-right:${t.id}`, i)
                  }, d(i), 9, op))), 128))
                ])) : h("", !0)
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
              (a(!0), s(W, null, q(t.cells || [], (i, E) => (a(), s("div", {
                key: E,
                class: "em-row-cell"
              }, [
                e("label", bp, "Column " + d(E + 1), 1),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: i,
                  onInput: (M) => ie(t.id, E, M.target.value),
                  placeholder: "Cell content",
                  rows: "2"
                }, null, 40, fp),
                e("div", gp, [
                  e("button", {
                    type: "button",
                    class: "em-chip em-chip--sm",
                    onClick: (M) => V(`row:${t.id}:${E}`)
                  }, d(Pe), 8, hp),
                  o.value === `row:${t.id}:${E}` ? (a(), s("div", yp, [
                    (a(!0), s(W, null, q(P.value, (M) => (a(), s("button", {
                      key: `row-var-${t.id}-${E}-${M}`,
                      type: "button",
                      class: "em-var-menu-item",
                      onClick: (ye) => $(`row:${t.id}:${E}`, M)
                    }, d(M), 9, kp))), 128))
                  ])) : h("", !0)
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
                (a(!0), s(W, null, q(t.links || [], (i, E) => (a(), s("div", {
                  key: E,
                  class: "em-link-list-row"
                }, [
                  e("input", {
                    type: "text",
                    class: "em-input em-input--flex",
                    value: i.text,
                    onInput: (M) => c(t.id, E, "text", M.target.value),
                    placeholder: "Label"
                  }, null, 40, xp),
                  e("input", {
                    type: "url",
                    class: "em-input em-input--flex",
                    value: i.url,
                    onInput: (M) => c(t.id, E, "url", M.target.value),
                    placeholder: "URL"
                  }, null, 40, Cp),
                  e("button", {
                    type: "button",
                    class: "em-block-btn em-block-btn--remove",
                    onClick: (M) => te(t.id, E),
                    title: "Remove",
                    "aria-label": "Remove"
                  }, "×", 8, Sp)
                ]))), 128))
              ]),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => C(t.id)
              }, "+ Add link", 8, Ip)
            ])) : t.type === "accordion" ? (a(), s("div", Ap, [
              (a(!0), s(W, null, q(t.items || [], (i, E) => (a(), s("div", {
                key: E,
                class: "em-accordion-item"
              }, [
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: i.title,
                  onInput: (M) => Z(t.id, E, "title", M.target.value),
                  placeholder: "Section title"
                }, null, 40, Bp),
                e("textarea", {
                  class: "em-textarea em-textarea--sm",
                  value: i.content,
                  onInput: (M) => Z(t.id, E, "content", M.target.value),
                  placeholder: "Expandable content",
                  rows: "2"
                }, null, 40, Up),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (M) => xe(t.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Lp)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => pe(t.id)
              }, "+ Add section", 8, Rp)
            ])) : t.type === "carousel" ? (a(), s("div", Tp, [
              (a(!0), s(W, null, q(t.slides || [], (i, E) => (a(), s("div", {
                key: E,
                class: "em-carousel-slide"
              }, [
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: i.imageUrl,
                  onInput: (M) => Se(t.id, E, "imageUrl", M.target.value),
                  placeholder: "Image URL"
                }, null, 40, Pp),
                e("input", {
                  type: "text",
                  class: "em-input",
                  value: i.alt,
                  onInput: (M) => Se(t.id, E, "alt", M.target.value),
                  placeholder: "Alt text"
                }, null, 40, Vp),
                e("input", {
                  type: "url",
                  class: "em-input",
                  value: i.linkUrl,
                  onInput: (M) => Se(t.id, E, "linkUrl", M.target.value),
                  placeholder: "Link URL (optional)"
                }, null, 40, Ep),
                e("button", {
                  type: "button",
                  class: "em-block-btn em-block-btn--remove",
                  onClick: (M) => Le(t.id, E),
                  title: "Remove",
                  "aria-label": "Remove"
                }, "×", 8, Np)
              ]))), 128)),
              e("button", {
                type: "button",
                class: "em-add-btn em-add-btn--sm",
                onClick: (i) => Ue(t.id)
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
            ])) : t.type === "product_card" ? (a(), s("div", Hp, [
              e("input", {
                type: "url",
                class: "em-input",
                value: t.imageUrl,
                onInput: (i) => L(t.id, { imageUrl: i.target.value }),
                placeholder: "Product image URL"
              }, null, 40, zp),
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
                  onClick: (i) => V(`block:${t.id}`)
                }, d(Pe), 8, Xp),
                o.value === `block:${t.id}` ? (a(), s("div", Qp, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `block-var-liquid-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`block:${t.id}`, i)
                  }, d(i), 9, Zp))), 128))
                ])) : h("", !0)
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
                  onClick: (i) => V(`block:${t.id}`)
                }, d(Pe), 8, nm),
                o.value === `block:${t.id}` ? (a(), s("div", lm, [
                  (a(!0), s(W, null, q(P.value, (i) => (a(), s("button", {
                    key: `block-var-code-${t.id}-${i}`,
                    type: "button",
                    class: "em-var-menu-item",
                    onClick: (E) => $(`block:${t.id}`, i)
                  }, d(i), 9, om))), 128))
                ])) : h("", !0)
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
                placeholder: "Image URL (use {{ .var }} for per-recipient)"
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
            ])) : h("", !0),
            _.includes(t.type) ? (a(), s("div", bm, [
              e("div", fm, [
                e("button", {
                  type: "button",
                  class: re(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "left" }]),
                  title: "Align left",
                  "aria-label": "Align left",
                  onClick: (i) => L(t.id, { alignment: "left" })
                }, [...l[59] || (l[59] = [
                  e("span", { "aria-hidden": "true" }, "≡", -1)
                ])], 10, gm),
                e("button", {
                  type: "button",
                  class: re(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "center" }]),
                  title: "Align center",
                  "aria-label": "Align center",
                  onClick: (i) => L(t.id, { alignment: "center" })
                }, [...l[60] || (l[60] = [
                  e("span", { "aria-hidden": "true" }, "≣", -1)
                ])], 10, hm),
                e("button", {
                  type: "button",
                  class: re(["em-align-btn", { "em-align-btn--active": (t.alignment ?? "left") === "right" }]),
                  title: "Align right",
                  "aria-label": "Align right",
                  onClick: (i) => L(t.id, { alignment: "right" })
                }, [...l[61] || (l[61] = [
                  e("span", { "aria-hidden": "true" }, "☰", -1)
                ])], 10, ym)
              ]),
              e("label", km, [
                e("input", {
                  type: "checkbox",
                  checked: t.fullWidth,
                  onChange: (i) => L(t.id, { fullWidth: i.target.checked })
                }, null, 40, _m),
                l[62] || (l[62] = e("span", null, "Full width", -1))
              ])
            ])) : h("", !0)
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
              "onUpdate:modelValue": l[26] || (l[26] = (t) => O.value = t),
              class: "em-select em-select--flex"
            }, [
              (a(!0), s(W, null, q(P.value, (t) => (a(), s("option", {
                key: t,
                value: t
              }, d(t), 9, Im))), 128))
            ], 512), [
              [Ve, O.value]
            ])
          ])
        ]),
        e("div", Am, [
          l[67] || (l[67] = e("label", { class: "em-label" }, "Add custom", -1)),
          e("div", Bm, [
            Te(e("input", {
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
              onClick: F
            }, "Add")
          ])
        ])
      ])
    ]));
  }
}), Lm = /* @__PURE__ */ Ce(Um, [["__scopeId", "data-v-64de8497"]]), Rm = { class: "keos-email-builder" }, Tm = { class: "kb-builder-top" }, Pm = { class: "kb-email-layout" }, Vm = { class: "kb-email-sidebar" }, Em = {
  key: 0,
  class: "kb-email-form"
}, Nm = { class: "kb-email-form-head" }, Om = { class: "kb-email-form-head-top" }, Mm = { class: "kb-email-health-pill" }, Dm = { class: "kb-wa-form-head-row" }, Wm = ["value"], Hm = { class: "kb-email-health" }, zm = { class: "kb-email-health-row" }, qm = { class: "kb-email-health-value" }, Fm = { class: "kb-email-health-bar" }, jm = { class: "kb-email-canvas" }, Km = {
  key: 0,
  class: "kb-email-test-banner"
}, Ym = { class: "kb-email-preview-chrome" }, Jm = { class: "kb-push-preview-controls" }, Gm = { class: "kb-push-preview-as" }, Xm = ["value"], Qm = { class: "kb-preview-status" }, Zm = {
  class: "kb-email-device-toggle",
  role: "tablist",
  "aria-label": "Viewport"
}, ev = { class: "kb-email-inbox-strip" }, tv = { class: "kb-email-inbox-from" }, av = { class: "kb-email-inbox-from-name" }, sv = { class: "kb-email-inbox-from-addr" }, nv = { class: "kb-email-inbox-subject" }, lv = ["title"], ov = {
  key: 0,
  class: "kb-email-inbox-preheader"
}, iv = { class: "kb-email-body-canvas" }, rv = ["innerHTML"], dv = { class: "kb-email-actions" }, uv = {
  key: 0,
  class: "kb-actions-note"
}, cv = { key: 0 }, pv = { class: "kb-email-actions-right" }, mv = {
  key: 0,
  class: "kb-confirm-overlay",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "email-preset-confirm-title"
}, vv = { class: "kb-confirm-dialog" }, bv = { class: "kb-confirm-actions" }, fv = /* @__PURE__ */ we({
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
      const o = (I) => String(I).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), V = [
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
      ], $ = (I, u) => {
        if (!V.includes(u.type)) return I;
        const l = u.alignment || "left", t = !!u.fullWidth;
        return `<div style="text-align:${l};${t ? "width:100%;" : ""}">${I}</div>`;
      }, F = [];
      for (const I of p)
        switch (I.type) {
          case "heading": {
            const u = Math.min(3, Math.max(1, Number(I.level) || 1)), l = o(I.content || "").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            );
            F.push(
              $(
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
            F.push(
              $(
                `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#334155;">${u || "Paragraph"}</p>`,
                I
              )
            );
            break;
          }
          case "image": {
            const u = (I.src || "").trim(), l = o(I.alt || ""), t = (I.linkUrl || "").trim(), i = !!I.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;" : "max-width:100%;height:auto;display:block;border:0;", E = u ? `<img src="${o(u)}" alt="${l}" style="${i}" />` : '<div style="background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Image URL</div>';
            F.push(
              $(
                `<div style="margin:0 0 12px;">${t ? `<a href="${o(t)}" style="color:#2563eb;">${E}</a>` : E}</div>`,
                I
              )
            );
            break;
          }
          case "button": {
            const u = o(I.text || "Button"), l = (I.url || "#").trim(), t = Math.min(24, Math.max(0, Number(I.borderRadius) ?? 8)), T = !!I.fullWidth, i = !!I.ghost, E = i ? "transparent" : "#0f172a", M = i ? "#0f172a" : "#fff", ye = i ? "2px solid #0f172a" : "none", ze = T ? "block" : "inline-block", Fe = T ? "100%" : "auto";
            F.push(
              $(
                `<p style="margin:0 0 12px;"><a href="${o(l)}" style="display:${ze};width:${Fe};max-width:100%;box-sizing:border-box;text-align:center;padding:12px 24px;background:${E};color:${M};border:${ye};text-decoration:none;font-size:14px;font-weight:600;border-radius:${t}px;overflow-wrap:anywhere;">${u}</a></p>`,
                I
              )
            );
            break;
          }
          case "divider": {
            const u = Math.min(8, Math.max(1, Number(I.thickness) || 1)), l = (I.color || "#e2e8f0").trim() || "#e2e8f0", t = I.lineStyle || "solid";
            F.push(
              $(
                `<hr style="margin:16px 0;border:0;border-top:${u}px ${t} ${l};" />`,
                I
              )
            );
            break;
          }
          case "spacer": {
            const u = Math.min(120, Math.max(8, Number(I.height) || 24));
            F.push($(`<div style="height:${u}px;"></div>`, I));
            break;
          }
          case "footer": {
            const u = o(I.content || "").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = (I.unsubscribeUrl || "").trim(), t = o(I.companyAddress || "");
            F.push(
              $(
                `<div style="margin:16px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${u || "Footer"}` + (l ? `<p style="margin:8px 0 0;"><a href="${o(l)}" style="color:#2563eb;">Unsubscribe</a></p>` : "") + (t ? `<p style="margin:4px 0 0;">${t}</p>` : "") + "</div>",
                I
              )
            );
            break;
          }
          case "list": {
            const u = I.style === "numbered" ? "ol" : "ul", t = (Array.isArray(I.items) ? I.items : []).map(
              (T) => `<li style="margin:4px 0;font-size:14px;line-height:1.5;color:#334155;">${o(String(T)).replace(/\s*\{\{\s*([^}]+)\s*\}\}\s*/g, '<span style="color:#2563eb;">{{ $1 }}</span>')}</li>`
            ).join("");
            F.push(
              $(
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
            F.push(
              $(
                `<div style="margin:0 0 12px;padding:16px 20px;border-radius:8px;${t}font-size:14px;line-height:1.6;">${u || "Quote"}</div>`,
                I
              )
            );
            break;
          }
          case "social": {
            const l = (Array.isArray(I.links) ? I.links : []).filter((t) => (t.url || "").trim());
            if (l.length === 0)
              F.push(
                $(
                  '<p style="margin:0 0 12px;font-size:13px;color:#94a3b8;">Add social profile URLs in the sidebar.</p>',
                  I
                )
              );
            else {
              const t = (T) => `<a href="${o((T.url || "").trim())}" style="display:inline-block;margin:0 8px;color:#2563eb;text-decoration:none;font-size:13px;font-weight:500;">${o(T.platform || "Link")}</a>`;
              F.push(
                $(
                  `<div style="margin:0 0 12px;">${l.map(t).join("")}</div>`,
                  I
                )
              );
            }
            break;
          }
          case "video": {
            const u = (I.thumbnailUrl || "").trim(), l = (I.videoUrl || "#").trim(), t = o(I.caption || ""), i = !!I.fullWidth ? "width:100%;max-width:100%;height:auto;display:block;border:0;border-radius:8px;" : "max-width:100%;height:auto;display:block;border:0;border-radius:8px;", E = u ? `<img src="${o(u)}" alt="Video" style="${i}" />` : '<div style="background:#e2e8f0;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Video thumbnail URL</div>';
            F.push(
              $(
                `<div style="margin:0 0 12px;"><a href="${o(l)}" style="display:block;color:inherit;">${E}</a>` + (t ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;">${t}</p>` : "") + "</div>",
                I
              )
            );
            break;
          }
          case "link_list": {
            const u = Array.isArray(I.links) ? I.links : [], l = o(I.separator || " | "), T = u.filter(
              (i) => (i.text || i.url) && (i.url || "").trim()
            ).map(
              (i) => `<a href="${o((i.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(i.text || "Link")}</a>`
            );
            F.push(
              $(
                `<p style="margin:0 0 12px;font-size:12px;color:#64748b;">${T.join(l)}</p>`,
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
            F.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr><td width="50%" style="padding:0 12px 0 0;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${u || "Left"}</td><td width="50%" style="padding:0 0 0 12px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${l || "Right"}</td></tr></table>`
            );
            break;
          }
          case "row": {
            const u = Math.min(4, Math.max(1, Number(I.columnCount) || 2)), l = Array.isArray(I.cells) ? I.cells.slice(0, u) : [], t = 100 / u, T = Array.from({ length: u }, (i, E) => {
              const M = l[E] ?? "", ye = o(M).replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<td width="${t}%" style="padding:0 8px;font-size:14px;line-height:1.5;color:#334155;vertical-align:top;">${ye || "—"}</td>`;
            }).join("");
            F.push(
              `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 12px;"><tr>${T}</tr></table>`
            );
            break;
          }
          case "navbar": {
            const u = Array.isArray(I.links) ? I.links : [], l = o(I.separator || " | "), T = u.filter(
              (i) => (i.text || i.url) && (i.url || "").trim()
            ).map(
              (i) => `<a href="${o((i.url || "#").trim())}" style="color:#2563eb;text-decoration:none;font-size:12px;">${o(i.text || "Link")}</a>`
            );
            F.push(
              `<div style="margin:0 0 12px;padding:12px 0;border-bottom:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;">${T.length ? T.join(l) : "View in browser · Unsubscribe"}</div>`
            );
            break;
          }
          case "accordion": {
            const l = (Array.isArray(I.items) ? I.items : []).map((t) => {
              const T = o(t.title || "Section"), i = o(t.content || "").replace(/\n/g, "<br/>").replace(
                /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
                '<span style="color:#2563eb;">{{ $1 }}</span>'
              );
              return `<details style="margin:0 0 8px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><summary style="padding:12px 16px;font-weight:600;cursor:pointer;background:#f8fafc;">${T}</summary><div style="padding:12px 16px;font-size:14px;line-height:1.5;color:#334155;">${i}</div></details>`;
            }).join("");
            F.push(
              l ? `<div style="margin:0 0 12px;">${l}</div>` : '<p style="margin:0 0 12px;color:#94a3b8;">Add accordion sections.</p>'
            );
            break;
          }
          case "carousel": {
            const l = (Array.isArray(I.slides) ? I.slides : []).filter(
              (t) => (t.imageUrl || "").trim()
            );
            if (l.length === 0)
              F.push(
                '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:48px 16px;text-align:center;font-size:14px;border-radius:8px;">Carousel — add image URLs</div>'
              );
            else {
              const t = l[0], T = `<img src="${o(t.imageUrl)}" alt="${o(t.alt || "Slide")}" style="max-width:100%;height:auto;display:block;border:0;border-radius:8px;" />`, i = (t.linkUrl || "").trim();
              F.push(
                `<div style="margin:0 0 12px;">${i ? `<a href="${o(i)}">${T}</a>` : T}` + (l.length > 1 ? `<p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">+ ${l.length - 1} more slide(s)</p>` : "") + "</div>"
              );
            }
            break;
          }
          case "countdown": {
            const u = o(I.label || "Offer ends in"), l = I.endDateTime ? new Date(I.endDateTime).toLocaleString() : "—";
            F.push(
              `<div style="margin:0 0 12px;padding:16px;text-align:center;background:#f8fafc;border-radius:8px;"><p style="margin:0 0 8px;font-size:12px;color:#64748b;">${u}</p><p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">${l}</p><p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">(Dynamic countdown GIF at send time)</p></div>`
            );
            break;
          }
          case "product_card": {
            const u = (I.imageUrl || "").trim(), l = o(I.title || "Product"), t = o(I.price || ""), T = o(I.buttonText || "Buy now"), i = (I.buttonUrl || "#").trim(), E = u ? `<img src="${o(u)}" alt="${o(I.alt || l)}" style="width:100%;height:auto;display:block;border:0;border-radius:8px;" />` : '<div style="background:#f1f5f9;color:#64748b;padding:60px 16px;text-align:center;font-size:13px;">Product image</div>';
            F.push(
              `<div style="margin:0 0 12px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><div style="margin:0 0 12px;">${E}</div><div style="padding:0 12px 12px;"><p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#0f172a;">${l}</p>` + (t ? `<p style="margin:0 0 12px;font-size:14px;color:#334155;">${t}</p>` : "") + `<a href="${o(i)}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">${T}</a></div></div>`
            );
            break;
          }
          case "liquid": {
            const u = o((I.content || "").trim());
            F.push(
              `<div style="margin:0 0 12px;padding:12px;background:#f1f5f9;border-radius:8px;font-family:monospace;font-size:12px;color:#475569;white-space:pre-wrap;">${u || "Liquid / conditional block — rendered at send"}</div>`
            );
            break;
          }
          case "code_block": {
            const u = (I.content || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(
              /\s*\{\{\s*([^}]+)\s*\}\}\s*/g,
              '<span style="color:#2563eb;">{{ $1 }}</span>'
            ), l = o((I.caption || "").trim());
            F.push(
              '<div style="margin:0 0 12px;">' + (l ? `<p style="margin:0 0 6px 0;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${l}</p>` : "") + `<div style="padding:14px 16px;background:#1e293b;border-radius:8px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;">${u || "Code snippet"}</div></div>`
            );
            break;
          }
          case "rss_feed": {
            const u = (I.feedUrl || "").trim(), l = Math.min(20, Math.max(1, Number(I.maxItems) ?? 5));
            F.push(
              '<div style="margin:0 0 12px;padding:16px;border:1px dashed #e2e8f0;border-radius:8px;background:#fafafa;"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">RSS Feed</p>' + (u ? `<p style="margin:0;font-size:12px;color:#64748b;">${o(u)} · max ${l} items</p>` : '<p style="margin:0;font-size:12px;color:#94a3b8;">Add feed URL — content at send time</p>') + "</div>"
            );
            break;
          }
          case "dynamic_image": {
            const u = (I.imageUrl || "").trim(), l = (I.fallbackUrl || "").trim(), t = o(I.alt || "Dynamic image");
            u ? F.push(
              `<div style="margin:0 0 12px;"><img src="${o(u)}" alt="${t}" style="max-width:100%;height:auto;display:block;border:0;" />` + (l ? `<p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Fallback: ${o(l)}</p>` : "") + "</div>"
            ) : F.push(
              '<div style="margin:0 0 12px;background:#f1f5f9;color:#64748b;padding:40px 16px;text-align:center;font-size:13px;">Dynamic image (per-recipient URL)</div>'
            );
            break;
          }
        }
      return F.join("");
    }
    function b(p) {
      return /<\s*html[\s>]/i.test(p) || /<!doctype\s+html/i.test(p);
    }
    function _(p) {
      const o = p.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return o ? o[1] : p;
    }
    function m(p, o, V) {
      const $ = (o || "Email").replace(/</g, "&lt;").replace(/>/g, "&gt;"), F = (V || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '<meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<title>${$}</title>`,
        "</head>",
        '<body style="margin:0;padding:0;background:#f4f7fb;">',
        F ? `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${F}</div>` : "",
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
    const A = n, x = r, {
      campaign: S,
      dirty: P,
      customValidatorErrors: O,
      getValidationWithWarnings: D,
      update: H,
      updateMessage: Q,
      undo: j,
      redo: ue,
      canUndo: K,
      canRedo: ee,
      resetMessage: N,
      hooks: oe
    } = Ge({
      initial: A.modelValue,
      hooks: {
        ...A.hooks,
        customValidators: async (p) => {
          var F, I, u;
          const o = [];
          (F = p.name) != null && F.trim() || o.push("Template name is required");
          const V = p.message;
          (I = V == null ? void 0 : V.subject) != null && I.trim() || o.push("Subject is required");
          const $ = (u = A.hooks) != null && u.customValidators ? await A.hooks.customValidators(p) : [];
          return [...o, ...$];
        }
      },
      onDirty: () => x("change", S.value)
    }), { lastSavedAt: ae } = Xe(S, { channel: "email" });
    function he(p) {
      (p.metaKey || p.ctrlKey) && p.key === "z" && (p.preventDefault(), p.shiftKey ? ue() : j());
    }
    je(() => {
      window.addEventListener("keydown", he);
    }), Ke(() => {
      window.removeEventListener("keydown", he);
    }), Be(
      S,
      (p) => x("update:modelValue", {
        ...p,
        message: {
          ...p.message,
          html: Se.value
        }
      }),
      { deep: !0 }
    );
    const ve = se(), be = se(!0);
    async function z() {
      if (oe.estimateReach)
        try {
          ve.value = await oe.estimateReach(S.value.audience);
        } catch {
          ve.value = void 0;
        }
      oe.canSend && (be.value = await Promise.resolve(oe.canSend()));
    }
    z(), Be(() => S.value.audience, z, { deep: !0 });
    const f = y(() => (O.value, D(ve.value))), w = y(() => f.value.blockingErrors), U = y(() => f.value.warnings), le = y(() => f.value.valid), Y = y(() => {
      var $, F, I;
      const p = S.value.message, o = [
        !!(($ = S.value.name) != null && $.trim()),
        !!((F = p.subject) != null && F.trim()),
        !!((I = p.from_address) != null && I.trim()),
        !!(Array.isArray(p.blocks) ? p.blocks.length : (p.html ?? "").trim().length),
        !!S.value.template_type
      ], V = o.filter(Boolean).length;
      return Math.round(V / o.length * 100);
    }), L = y(() => Y.value >= 90 ? "Production ready" : Y.value >= 70 ? "Strong draft" : Y.value >= 40 ? "In progress" : "Needs setup"), ce = y(
      () => S.value.template_type ?? "transactional"
    ), R = se(""), k = se(!1), B = se(null), X = y(() => {
      const p = R.value;
      return p ? De.find((o) => o.id === p) ?? null : null;
    });
    function ne(p) {
      const o = S.value, V = p.campaign.message ? { ...o.message, ...p.campaign.message } : o.message;
      H({
        ...p.campaign,
        message: V
      }), B.value = null, k.value = !1;
    }
    function ke(p) {
      const o = p.target.value;
      if (!o) return;
      const V = ft.find(($) => $.id === o);
      V && (P.value ? (B.value = V, k.value = !0) : ne(V), p.target.value = "");
    }
    function _e(p) {
      H({ template_type: p });
    }
    function $e(p) {
      H({
        name: p,
        tracking: { ...S.value.tracking ?? {}, campaign_name: p }
      });
    }
    const ge = y(
      () => S.value.message.subject ?? ""
    ), ie = y(
      () => S.value.message.preview_text ?? ""
    ), c = y(
      () => S.value.message.html ?? ""
    ), C = y(
      () => S.value.message.from_name ?? "Your App"
    ), te = y(
      () => S.value.message.from_address ?? "notifications@example.com"
    ), Z = y(
      () => S.value.message.blocks ?? []
    ), pe = y(() => {
      const p = S.value.message, o = (p.html ?? "").trim(), $ = (Array.isArray(p.blocks) ? p.blocks : []).some((F) => {
        if (!F || typeof F != "object") return !1;
        const I = (F.type ?? "").toString();
        if (I === "paragraph" || I === "heading" || I === "quote" || I === "footer") {
          const u = (F.content ?? "").toString().trim();
          return !(!u || u === "Heading" || u.startsWith("Your text here."));
        }
        return I === "image" || I === "video" || I === "dynamic_image" ? !!(F.src ?? F.imageUrl ?? F.thumbnailUrl ?? "").toString().trim() : I === "button" ? !!(F.text ?? "").toString().trim() : !0;
      });
      return !!((p.subject ?? "").toString().trim() || (p.preview_text ?? "").toString().trim() || o || $);
    }), xe = y(() => {
      const p = Z.value;
      if (Array.isArray(p) && p.length > 0)
        return v(p);
      const o = c.value;
      return o && o.trim() ? b(o) ? _(o) : o : v([]);
    }), Se = y(() => {
      const p = Z.value;
      if (Array.isArray(p) && p.length > 0)
        return m(
          v(p),
          ge.value,
          ie.value
        );
      const o = c.value;
      return o && o.trim() ? b(o) ? o : m(o, ge.value, ie.value) : m(
        v([]),
        ge.value,
        ie.value
      );
    }), Ue = y(() => {
      const p = ge.value;
      return X.value ? Ne(p, X.value.data) : p;
    }), Le = y(() => {
      const p = ie.value;
      return X.value ? Ne(p, X.value.data) : p;
    }), Re = y(() => {
      const p = xe.value;
      return X.value ? Ne(p, X.value.data) : p;
    }), Ie = se("desktop");
    function J() {
      le.value && x("save", {
        ...S.value,
        message: {
          ...S.value.message,
          html: Se.value
        }
      });
    }
    return (p, o) => {
      var V;
      return a(), s("div", Rm, [
        e("div", Tm, [
          Ae(Qe, {
            "campaign-name": g(S).name,
            status: g(S).status,
            dirty: g(P),
            "last-saved-at": g(ae),
            "can-undo": g(K),
            "can-redo": g(ee),
            "slugify-name": A.enforceSlugName,
            "onUpdate:campaignName": $e,
            onUndo: g(j),
            onRedo: g(ue)
          }, null, 8, ["campaign-name", "status", "dirty", "last-saved-at", "can-undo", "can-redo", "slugify-name", "onUndo", "onRedo"]),
          w.value.length > 0 ? (a(), s("div", {
            key: 0,
            class: "kb-errors",
            style: me({
              background: g(fe).dangerBg,
              border: `1px solid ${g(fe).dangerBorder}`,
              borderRadius: `${g(Oe).input}px`,
              padding: `${g(de)[16]}px ${g(de)[24]}px`,
              marginBottom: `${g(de)[24]}px`
            })
          }, [
            e("ul", {
              style: me({ margin: 0, paddingLeft: "1.25rem", color: g(fe).danger })
            }, [
              (a(!0), s(W, null, q(w.value, ($) => (a(), s("li", {
                key: $.message
              }, d($.message), 1))), 128))
            ], 4)
          ], 4)) : h("", !0)
        ]),
        e("div", Pm, [
          e("aside", Vm, [
            n.disabledSections.includes("email") ? h("", !0) : (a(), s("div", Em, [
              e("div", Nm, [
                e("div", Om, [
                  o[8] || (o[8] = e("span", { class: "kb-email-form-head-label" }, "Template", -1)),
                  e("span", Mm, d(L.value), 1)
                ]),
                e("div", Dm, [
                  Ae(dt, {
                    "template-type": ce.value,
                    onUpdate: _e
                  }, null, 8, ["template-type"]),
                  e("select", {
                    class: "kb-preset-select",
                    "aria-label": "Load template preset",
                    onChange: ke
                  }, [
                    o[9] || (o[9] = e("option", { value: "" }, "Presets…", -1)),
                    (a(!0), s(W, null, q(g(ft), ($) => (a(), s("option", {
                      key: $.id,
                      value: $.id
                    }, d($.label), 9, Wm))), 128))
                  ], 32)
                ]),
                e("div", Hm, [
                  e("div", zm, [
                    o[10] || (o[10] = e("span", { class: "kb-email-health-title" }, "Setup quality", -1)),
                    e("span", qm, d(Y.value) + "%", 1)
                  ]),
                  e("div", Fm, [
                    e("span", {
                      class: "kb-email-health-fill",
                      style: me({ width: `${Y.value}%` })
                    }, null, 4)
                  ])
                ])
              ]),
              Ae(Lm, {
                message: g(S).message,
                "variable-options": n.variableOptions,
                "show-reset": !0,
                onUpdate: g(Q),
                onReset: o[0] || (o[0] = ($) => g(N)({ blocks: [] }))
              }, null, 8, ["message", "variable-options", "onUpdate"])
            ]))
          ]),
          e("main", jm, [
            !n.designOnly && g(S).audience.test_mode ? (a(), s("div", Km, [...o[11] || (o[11] = [
              e("span", { class: "kb-email-test-banner-dot" }, null, -1),
              G(" Test mode — only your test segment will receive this. ", -1)
            ])])) : h("", !0),
            e("div", Ym, [
              e("div", Jm, [
                e("label", Gm, [
                  o[13] || (o[13] = e("span", { class: "kb-push-preview-as-label" }, "Preview as", -1)),
                  Te(e("select", {
                    "onUpdate:modelValue": o[1] || (o[1] = ($) => R.value = $),
                    class: "kb-preset-select",
                    "aria-label": "Preview as profile"
                  }, [
                    o[12] || (o[12] = e("option", { value: "" }, "No substitution", -1)),
                    (a(!0), s(W, null, q(g(De), ($) => (a(), s("option", {
                      key: $.id,
                      value: $.id
                    }, d($.label), 9, Xm))), 128))
                  ], 512), [
                    [Ve, R.value]
                  ])
                ]),
                e("div", Qm, [
                  o[14] || (o[14] = e("span", { class: "kb-preview-status-label" }, "Viewport", -1)),
                  e("strong", null, d(Ie.value), 1)
                ])
              ]),
              e("div", Zm, [
                e("button", {
                  type: "button",
                  class: re(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ie.value === "desktop"
                  }]),
                  onClick: o[2] || (o[2] = ($) => Ie.value = "desktop")
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
                  G(" Desktop ", -1)
                ])], 2),
                e("button", {
                  type: "button",
                  class: re(["kb-email-device-btn", {
                    "kb-email-device-btn--active": Ie.value === "mobile"
                  }]),
                  onClick: o[3] || (o[3] = ($) => Ie.value = "mobile")
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
                  G(" Mobile ", -1)
                ])], 2)
              ]),
              e("div", {
                class: re(["kb-email-preview-frame", {
                  "kb-email-preview-frame--mobile": Ie.value === "mobile",
                  "kb-email-preview-frame--empty": !pe.value
                }])
              }, [
                e("div", ev, [
                  e("div", tv, [
                    e("span", av, d(C.value), 1),
                    e("span", sv, "<" + d(te.value) + ">", 1)
                  ]),
                  e("div", nv, [
                    e("span", {
                      class: "kb-email-inbox-subject-text",
                      title: Ue.value || "No subject"
                    }, d(Ue.value || "No subject"), 9, lv),
                    Le.value ? (a(), s("span", ov, " — " + d(Le.value), 1)) : h("", !0)
                  ])
                ]),
                e("div", iv, [
                  e("div", {
                    class: "kb-email-body-inner",
                    "data-email-body": "",
                    innerHTML: Re.value
                  }, null, 8, rv)
                ])
              ], 2)
            ])
          ])
        ]),
        e("footer", dv, [
          U.value.length > 0 ? (a(), s("div", uv, [
            o[17] || (o[17] = e("strong", null, "Warning:", -1)),
            G(" " + d((V = U.value[0]) == null ? void 0 : V.message) + " ", 1),
            U.value.length > 1 ? (a(), s("span", cv, " (+" + d(U.value.length - 1) + " more) ", 1)) : h("", !0)
          ])) : h("", !0),
          e("div", pv, [
            n.showDuplicate ? (a(), s("button", {
              key: 0,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: o[4] || (o[4] = ($) => x("duplicate", JSON.parse(JSON.stringify(g(S)))))
            }, " Duplicate ")) : h("", !0),
            n.showSave ? (a(), s("button", {
              key: 1,
              type: "button",
              class: "kb-email-action kb-email-action--secondary",
              onClick: J
            }, " Save ")) : h("", !0),
            n.showClose ? (a(), s("button", {
              key: 2,
              type: "button",
              class: "kb-email-action kb-email-action--primary",
              onClick: o[5] || (o[5] = ($) => x("edit"))
            }, " Close ")) : h("", !0)
          ])
        ]),
        k.value ? (a(), s("div", mv, [
          e("div", vv, [
            o[18] || (o[18] = e("h2", {
              id: "email-preset-confirm-title",
              class: "kb-confirm-title"
            }, " Replace content? ", -1)),
            o[19] || (o[19] = e("p", { class: "kb-confirm-text" }, " Current changes will be replaced by the preset. Continue? ", -1)),
            e("div", bv, [
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--secondary",
                onClick: o[6] || (o[6] = ($) => {
                  k.value = !1, B.value = null;
                })
              }, " Cancel "),
              e("button", {
                type: "button",
                class: "kb-email-action kb-email-action--primary",
                onClick: o[7] || (o[7] = ($) => B.value && ne(B.value))
              }, " Replace ")
            ])
          ])
        ])) : h("", !0)
      ]);
    };
  }
}), Nt = /* @__PURE__ */ Ce(fv, [["__scopeId", "data-v-f45fc2a3"]]), gv = { class: "kb-shell" }, hv = {
  class: "kb-shell__nav",
  role: "tablist",
  "aria-label": "Channel"
}, yv = ["aria-selected", "onClick"], kv = { class: "kb-shell__meta" }, _v = ["href"], wv = { class: "kb-shell__body" }, $v = /* @__PURE__ */ we({
  __name: "BuilderShell",
  props: {
    channel: { default: "push" },
    environment: { default: "" },
    helpUrl: { default: "" }
  },
  emits: ["switch-channel"],
  setup(n, { emit: r }) {
    const v = r, b = [
      { id: "push", label: "Push" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "sms", label: "SMS" },
      { id: "email", label: "Email" }
    ];
    return (_, m) => (a(), s("div", gv, [
      e("header", {
        class: "kb-shell__header",
        style: me({ padding: `${g(de)[12]}px ${g(de)[24]}px`, borderBottom: `1px solid ${g(fe).neutral.border}`, background: g(fe).neutral.bg })
      }, [
        m[0] || (m[0] = e("div", { class: "kb-shell__brand" }, [
          e("span", {
            class: "kb-shell__logo",
            "aria-hidden": "true"
          }, "KEOS")
        ], -1)),
        e("nav", hv, [
          (a(), s(W, null, q(b, (A) => e("button", {
            key: A.id,
            type: "button",
            class: re(["kb-shell__channel", { "kb-shell__channel--active": n.channel === A.id }]),
            role: "tab",
            "aria-selected": n.channel === A.id,
            onClick: (x) => v("switch-channel", A.id)
          }, d(A.label), 11, yv)), 64))
        ]),
        e("div", kv, [
          n.environment ? (a(), s("span", {
            key: 0,
            class: "kb-shell__env",
            style: me({ padding: "2px 8px", borderRadius: `${g(Oe).input}px`, fontSize: "0.75rem", background: g(fe).neutral.bg, color: g(fe).neutral.textMuted })
          }, d(n.environment), 5)) : h("", !0),
          n.helpUrl ? (a(), s("a", {
            key: 1,
            href: n.helpUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "kb-shell__help",
            "aria-label": "Help / Documentation",
            style: me({ color: g(fe).neutral.textMuted, fontSize: "1.25rem", textDecoration: "none" })
          }, " ? ", 12, _v)) : h("", !0)
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
}, Iv = ["onClick"], Av = /* @__PURE__ */ we({
  __name: "BuilderOutline",
  props: {
    items: {},
    scrollContainerId: {}
  },
  setup(n) {
    var m;
    const r = n, v = se(((m = r.items[0]) == null ? void 0 : m.id) ?? "");
    let b = null;
    function _(A) {
      const x = document.getElementById(A);
      x && x.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return je(() => {
      const A = r.scrollContainerId ? document.getElementById(r.scrollContainerId) : document;
      A && (b = new IntersectionObserver(
        (x) => {
          for (const S of x)
            if (S.isIntersecting) {
              const P = S.target.getAttribute("data-outline-id");
              P && (v.value = P);
            }
        },
        { root: A === document ? null : A, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      ), r.items.forEach((x) => {
        const S = document.getElementById(x.id);
        S && (b == null || b.observe(S));
      }));
    }), Ke(() => {
      b == null || b.disconnect();
    }), Be(
      () => r.items,
      (A) => {
        A.length && !v.value && (v.value = A[0].id);
      },
      { immediate: !0 }
    ), (A, x) => (a(), s("nav", Cv, [
      e("ul", Sv, [
        (a(!0), s(W, null, q(n.items, (S) => (a(), s("li", {
          key: S.id,
          class: "kb-outline__item"
        }, [
          e("button", {
            type: "button",
            class: re(["kb-outline__btn", { "kb-outline__btn--active": v.value === S.id }]),
            style: me({
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: `${g(de)[8]}px ${g(de)[12]}px`,
              border: "none",
              borderRadius: `${g(Oe).input}px`,
              background: v.value === S.id ? g(fe).neutral.bg : "transparent",
              color: v.value === S.id ? "#0f172a" : g(fe).neutral.textMuted,
              fontSize: "0.8125rem",
              fontWeight: v.value === S.id ? 600 : 500,
              cursor: "pointer"
            }),
            onClick: (P) => _(S.id)
          }, d(S.label), 15, Iv)
        ]))), 128))
      ])
    ]));
  }
}), Bv = /* @__PURE__ */ Ce(Av, [["__scopeId", "data-v-25c37675"]]), Uv = ["id"], Lv = {
  key: 1,
  class: "kb-form-shell__head"
}, Rv = /* @__PURE__ */ we({
  __name: "BuilderFormShell",
  props: {
    label: { default: "" },
    sectionId: {}
  },
  setup(n) {
    return (r, v) => (a(), s("div", {
      class: "kb-form-shell",
      id: n.sectionId ?? void 0,
      style: me({
        padding: `${g(de)[24]}px ${g(de)[24]}px ${g(de)[32]}px`,
        marginBottom: 0
      })
    }, [
      n.label ? (a(), s("div", {
        key: 0,
        class: "kb-form-shell__head",
        style: me({ marginBottom: g(de)[24], paddingBottom: g(de)[24], borderBottom: "1px solid #f1f5f9" })
      }, [
        e("span", {
          class: "kb-form-shell__label",
          style: me({ display: "block", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: g(de)[12] })
        }, d(n.label), 5),
        Ee(r.$slots, "head", {}, void 0, !0)
      ], 4)) : (a(), s("div", Lv, [
        Ee(r.$slots, "head", {}, void 0, !0)
      ])),
      Ee(r.$slots, "default", {}, void 0, !0)
    ], 12, Uv));
  }
}), Tv = /* @__PURE__ */ Ce(Rv, [["__scopeId", "data-v-6504df41"]]), Pv = /* @__PURE__ */ we({
  __name: "BuilderActionsBar",
  props: {
    align: { default: "end" }
  },
  setup(n) {
    return (r, v) => (a(), s("footer", {
      class: "kb-actions-bar",
      role: "contentinfo",
      style: me({
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
}), Vv = /* @__PURE__ */ we({
  __name: "BuilderTopShell",
  setup(n) {
    return (r, v) => (a(), s("div", {
      class: "kb-top-shell",
      style: me({
        marginLeft: g(de)[24],
        marginRight: g(de)[24]
      })
    }, [
      Ee(r.$slots, "header"),
      Ee(r.$slots, "errors"),
      Ee(r.$slots, "warnings"),
      Ee(r.$slots, "default")
    ], 4));
  }
});
function Ev(n) {
  n.component("KeosNotificationBuilder", Pt), n.component("KeosWhatsAppBuilder", Vt), n.component("KeosSmsBuilder", Et), n.component("KeosEmailBuilder", Nt), n.component("BuilderShell", xv), n.component("BuilderOutline", Bv), n.component("BuilderVersionHistoryModal", Tt), n.component("BuilderFormShell", Tv), n.component("BuilderActionsBar", Pv), n.component("BuilderTopShell", Vv);
}
const Ov = {
  install: Ev,
  KeosNotificationBuilder: Pt,
  KeosWhatsAppBuilder: Vt,
  KeosSmsBuilder: Et,
  KeosEmailBuilder: Nt
};
export {
  Pv as BuilderActionsBar,
  Tv as BuilderFormShell,
  Bv as BuilderOutline,
  xv as BuilderShell,
  Vv as BuilderTopShell,
  Tt as BuilderVersionHistoryModal,
  De as DEFAULT_SAMPLE_PROFILES,
  Nt as KeosEmailBuilder,
  Pt as KeosNotificationBuilder,
  Et as KeosSmsBuilder,
  Vt as KeosWhatsAppBuilder,
  Ov as default,
  Ev as install,
  Ne as renderTemplatePreview,
  Xe as useAutosave,
  Ge as useCampaignState
};
//# sourceMappingURL=index.js.map
