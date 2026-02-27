import Ze, { useState as B, useCallback as L, useMemo as te, useEffect as It } from "react";
var Te = { exports: {} }, Q = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function Mt() {
  if (qe) return Q;
  qe = 1;
  var r = Ze, n = Symbol.for("react.element"), l = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(_, R, P) {
    var E, k = {}, D = null, z = null;
    P !== void 0 && (D = "" + P), R.key !== void 0 && (D = "" + R.key), R.ref !== void 0 && (z = R.ref);
    for (E in R) s.call(R, E) && !c.hasOwnProperty(E) && (k[E] = R[E]);
    if (_ && _.defaultProps) for (E in R = _.defaultProps, R) k[E] === void 0 && (k[E] = R[E]);
    return { $$typeof: n, type: _, key: D, ref: z, props: k, _owner: u.current };
  }
  return Q.Fragment = l, Q.jsx = h, Q.jsxs = h, Q;
}
var ee = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He;
function Bt() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && function() {
    var r = Ze, n = Symbol.for("react.element"), l = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), _ = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), z = Symbol.for("react.offscreen"), Y = Symbol.iterator, J = "@@iterator";
    function K(e) {
      if (e === null || typeof e != "object")
        return null;
      var a = Y && e[Y] || e[J];
      return typeof a == "function" ? a : null;
    }
    var d = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function p(e) {
      {
        for (var a = arguments.length, o = new Array(a > 1 ? a - 1 : 0), f = 1; f < a; f++)
          o[f - 1] = arguments[f];
        j("error", e, o);
      }
    }
    function j(e, a, o) {
      {
        var f = d.ReactDebugCurrentFrame, x = f.getStackAddendum();
        x !== "" && (a += "%s", o = o.concat([x]));
        var v = o.map(function(g) {
          return String(g);
        });
        v.unshift("Warning: " + a), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var re = !1, ne = !1, N = !1, pe = !1, me = !1, ie;
    ie = Symbol.for("react.module.reference");
    function ge(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === s || e === c || me || e === u || e === P || e === E || pe || e === z || re || ne || N || typeof e == "object" && e !== null && (e.$$typeof === D || e.$$typeof === k || e.$$typeof === h || e.$$typeof === _ || e.$$typeof === R || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function he(e, a, o) {
      var f = e.displayName;
      if (f)
        return f;
      var x = a.displayName || a.name || "";
      return x !== "" ? o + "(" + x + ")" : o;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function A(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case s:
          return "Fragment";
        case l:
          return "Portal";
        case c:
          return "Profiler";
        case u:
          return "StrictMode";
        case P:
          return "Suspense";
        case E:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            var a = e;
            return ae(a) + ".Consumer";
          case h:
            var o = e;
            return ae(o._context) + ".Provider";
          case R:
            return he(e, e.render, "ForwardRef");
          case k:
            var f = e.displayName || null;
            return f !== null ? f : A(e.type) || "Memo";
          case D: {
            var x = e, v = x._payload, g = x._init;
            try {
              return A(g(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var $ = Object.assign, U = 0, se, w, X, Ee, ke, we, Ce;
    function Oe() {
    }
    Oe.__reactDisabledLog = !0;
    function dt() {
      {
        if (U === 0) {
          se = console.log, w = console.info, X = console.warn, Ee = console.error, ke = console.group, we = console.groupCollapsed, Ce = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Oe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        U++;
      }
    }
    function ut() {
      {
        if (U--, U === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $({}, e, {
              value: se
            }),
            info: $({}, e, {
              value: w
            }),
            warn: $({}, e, {
              value: X
            }),
            error: $({}, e, {
              value: Ee
            }),
            group: $({}, e, {
              value: ke
            }),
            groupCollapsed: $({}, e, {
              value: we
            }),
            groupEnd: $({}, e, {
              value: Ce
            })
          });
        }
        U < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ye = d.ReactCurrentDispatcher, xe;
    function le(e, a, o) {
      {
        if (xe === void 0)
          try {
            throw Error();
          } catch (x) {
            var f = x.stack.trim().match(/\n( *(at )?)/);
            xe = f && f[1] || "";
          }
        return `
` + xe + e;
      }
    }
    var ve = !1, oe;
    {
      var ft = typeof WeakMap == "function" ? WeakMap : Map;
      oe = new ft();
    }
    function Pe(e, a) {
      if (!e || ve)
        return "";
      {
        var o = oe.get(e);
        if (o !== void 0)
          return o;
      }
      var f;
      ve = !0;
      var x = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = ye.current, ye.current = null, dt();
      try {
        if (a) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (O) {
              f = O;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (O) {
              f = O;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            f = O;
          }
          e();
        }
      } catch (O) {
        if (O && f && typeof O.stack == "string") {
          for (var m = O.stack.split(`
`), C = f.stack.split(`
`), S = m.length - 1, T = C.length - 1; S >= 1 && T >= 0 && m[S] !== C[T]; )
            T--;
          for (; S >= 1 && T >= 0; S--, T--)
            if (m[S] !== C[T]) {
              if (S !== 1 || T !== 1)
                do
                  if (S--, T--, T < 0 || m[S] !== C[T]) {
                    var W = `
` + m[S].replace(" at new ", " at ");
                    return e.displayName && W.includes("<anonymous>") && (W = W.replace("<anonymous>", e.displayName)), typeof e == "function" && oe.set(e, W), W;
                  }
                while (S >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        ve = !1, ye.current = v, ut(), Error.prepareStackTrace = x;
      }
      var H = e ? e.displayName || e.name : "", V = H ? le(H) : "";
      return typeof e == "function" && oe.set(e, V), V;
    }
    function pt(e, a, o) {
      return Pe(e, !1);
    }
    function mt(e) {
      var a = e.prototype;
      return !!(a && a.isReactComponent);
    }
    function ce(e, a, o) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Pe(e, mt(e));
      if (typeof e == "string")
        return le(e);
      switch (e) {
        case P:
          return le("Suspense");
        case E:
          return le("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            return pt(e.render);
          case k:
            return ce(e.type, a, o);
          case D: {
            var f = e, x = f._payload, v = f._init;
            try {
              return ce(v(x), a, o);
            } catch {
            }
          }
        }
      return "";
    }
    var Z = Object.prototype.hasOwnProperty, De = {}, We = d.ReactDebugCurrentFrame;
    function de(e) {
      if (e) {
        var a = e._owner, o = ce(e.type, e._source, a ? a.type : null);
        We.setExtraStackFrame(o);
      } else
        We.setExtraStackFrame(null);
    }
    function gt(e, a, o, f, x) {
      {
        var v = Function.call.bind(Z);
        for (var g in e)
          if (v(e, g)) {
            var m = void 0;
            try {
              if (typeof e[g] != "function") {
                var C = Error((f || "React class") + ": " + o + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              m = e[g](a, g, f, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              m = S;
            }
            m && !(m instanceof Error) && (de(x), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", o, g, typeof m), de(null)), m instanceof Error && !(m.message in De) && (De[m.message] = !0, de(x), p("Failed %s type: %s", o, m.message), de(null));
          }
      }
    }
    var ht = Array.isArray;
    function be(e) {
      return ht(e);
    }
    function yt(e) {
      {
        var a = typeof Symbol == "function" && Symbol.toStringTag, o = a && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o;
      }
    }
    function xt(e) {
      try {
        return Ae(e), !1;
      } catch {
        return !0;
      }
    }
    function Ae(e) {
      return "" + e;
    }
    function Le(e) {
      if (xt(e))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yt(e)), Ae(e);
    }
    var $e = d.ReactCurrentOwner, vt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ie, Me;
    function bt(e) {
      if (Z.call(e, "ref")) {
        var a = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function jt(e) {
      if (Z.call(e, "key")) {
        var a = Object.getOwnPropertyDescriptor(e, "key").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function _t(e, a) {
      typeof e.ref == "string" && $e.current;
    }
    function Rt(e, a) {
      {
        var o = function() {
          Ie || (Ie = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
    }
    function St(e, a) {
      {
        var o = function() {
          Me || (Me = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: o,
          configurable: !0
        });
      }
    }
    var Tt = function(e, a, o, f, x, v, g) {
      var m = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: a,
        ref: o,
        props: g,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return m._store = {}, Object.defineProperty(m._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(m, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.defineProperty(m, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
    };
    function Et(e, a, o, f, x) {
      {
        var v, g = {}, m = null, C = null;
        o !== void 0 && (Le(o), m = "" + o), jt(a) && (Le(a.key), m = "" + a.key), bt(a) && (C = a.ref, _t(a, x));
        for (v in a)
          Z.call(a, v) && !vt.hasOwnProperty(v) && (g[v] = a[v]);
        if (e && e.defaultProps) {
          var S = e.defaultProps;
          for (v in S)
            g[v] === void 0 && (g[v] = S[v]);
        }
        if (m || C) {
          var T = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          m && Rt(g, T), C && St(g, T);
        }
        return Tt(e, m, C, x, f, $e.current, g);
      }
    }
    var je = d.ReactCurrentOwner, Be = d.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var a = e._owner, o = ce(e.type, e._source, a ? a.type : null);
        Be.setExtraStackFrame(o);
      } else
        Be.setExtraStackFrame(null);
    }
    var _e;
    _e = !1;
    function Re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function ze() {
      {
        if (je.current) {
          var e = A(je.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function kt(e) {
      return "";
    }
    var Fe = {};
    function wt(e) {
      {
        var a = ze();
        if (!a) {
          var o = typeof e == "string" ? e : e.displayName || e.name;
          o && (a = `

Check the top-level render call using <` + o + ">.");
        }
        return a;
      }
    }
    function Ne(e, a) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var o = wt(a);
        if (Fe[o])
          return;
        Fe[o] = !0;
        var f = "";
        e && e._owner && e._owner !== je.current && (f = " It was passed a child from " + A(e._owner.type) + "."), q(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, f), q(null);
      }
    }
    function Ue(e, a) {
      {
        if (typeof e != "object")
          return;
        if (be(e))
          for (var o = 0; o < e.length; o++) {
            var f = e[o];
            Re(f) && Ne(f, a);
          }
        else if (Re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var x = K(e);
          if (typeof x == "function" && x !== e.entries)
            for (var v = x.call(e), g; !(g = v.next()).done; )
              Re(g.value) && Ne(g.value, a);
        }
      }
    }
    function Ct(e) {
      {
        var a = e.type;
        if (a == null || typeof a == "string")
          return;
        var o;
        if (typeof a == "function")
          o = a.propTypes;
        else if (typeof a == "object" && (a.$$typeof === R || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        a.$$typeof === k))
          o = a.propTypes;
        else
          return;
        if (o) {
          var f = A(a);
          gt(o, e.props, "prop", f, e);
        } else if (a.PropTypes !== void 0 && !_e) {
          _e = !0;
          var x = A(a);
          p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", x || "Unknown");
        }
        typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ot(e) {
      {
        for (var a = Object.keys(e.props), o = 0; o < a.length; o++) {
          var f = a[o];
          if (f !== "children" && f !== "key") {
            q(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), q(null);
            break;
          }
        }
        e.ref !== null && (q(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), q(null));
      }
    }
    var Ve = {};
    function Ye(e, a, o, f, x, v) {
      {
        var g = ge(e);
        if (!g) {
          var m = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var C = kt();
          C ? m += C : m += ze();
          var S;
          e === null ? S = "null" : be(e) ? S = "array" : e !== void 0 && e.$$typeof === n ? (S = "<" + (A(e.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : S = typeof e, p("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", S, m);
        }
        var T = Et(e, a, o, x, v);
        if (T == null)
          return T;
        if (g) {
          var W = a.children;
          if (W !== void 0)
            if (f)
              if (be(W)) {
                for (var H = 0; H < W.length; H++)
                  Ue(W[H], e);
                Object.freeze && Object.freeze(W);
              } else
                p("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ue(W, e);
        }
        if (Z.call(a, "key")) {
          var V = A(e), O = Object.keys(a).filter(function($t) {
            return $t !== "key";
          }), Se = O.length > 0 ? "{key: someKey, " + O.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ve[V + Se]) {
            var Lt = O.length > 0 ? "{" + O.join(": ..., ") + ": ...}" : "{}";
            p(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Se, V, Lt, V), Ve[V + Se] = !0;
          }
        }
        return e === s ? Ot(T) : Ct(T), T;
      }
    }
    function Pt(e, a, o) {
      return Ye(e, a, o, !0);
    }
    function Dt(e, a, o) {
      return Ye(e, a, o, !1);
    }
    var Wt = Dt, At = Pt;
    ee.Fragment = s, ee.jsx = Wt, ee.jsxs = At;
  }()), ee;
}
process.env.NODE_ENV === "production" ? Te.exports = Mt() : Te.exports = Bt();
var t = Te.exports;
const fe = {
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
}, Qe = ["android", "ios", "web"], et = "normal", tt = ["low", "normal", "high"], zt = 86400, Ft = [3600, 7200, 86400, 172800], rt = "1.0", nt = ["topic", "segment", "user_list"];
function it() {
  return {
    type: "topic",
    topic_name: "default",
    platforms: [...Qe],
    test_mode: !1
  };
}
function at() {
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
function st() {
  return {
    priority: et,
    ttl_seconds: zt,
    quiet_hours_respected: !1,
    send_local_time: !1,
    silent_push: !1
  };
}
function lt() {
  return {
    campaign_name: "",
    tags: [],
    ab_test: !1
  };
}
function Nt(r) {
  return {
    schema_version: rt,
    name: "",
    status: "draft",
    audience: it(),
    message: at(),
    delivery: st(),
    tracking: lt(),
    ...r
  };
}
function Ut(r) {
  const n = r;
  return n.schema_version || (n.schema_version = rt), n.audience || (n.audience = it()), n.message || (n.message = at()), n.delivery || (n.delivery = st()), n.tracking || (n.tracking = lt()), tt.includes(n.delivery.priority) || (n.delivery.priority = et), nt.includes(n.audience.type) || (n.audience.type = "topic"), n.audience.type === "topic" && !n.audience.topic_name && (n.audience.topic_name = "default"), n;
}
const Vt = {
  3600: "1 hour",
  7200: "2 hours",
  86400: "24 hours",
  172800: "48 hours"
};
function Yt(r) {
  if (!(r != null && r.trim()))
    return "Now";
  try {
    const n = new Date(r);
    return Number.isNaN(n.getTime()) ? r : n.toLocaleString(void 0, {
      dateStyle: "short",
      timeStyle: "short"
    });
  } catch {
    return r;
  }
}
function qt(r, n) {
  const { audience: l, delivery: s } = r, u = n ?? l.estimated_reach, c = Vt[s.ttl_seconds] ?? `${s.ttl_seconds}s`;
  return {
    sendTime: Yt(s.scheduled_at),
    audienceType: l.type,
    estimatedReach: u,
    platforms: [...l.platforms],
    priority: s.priority,
    ttlLabel: c
  };
}
const Ht = 1e5;
function Gt(r, n) {
  var u, c, h;
  const l = [], s = n ?? r.audience.estimated_reach;
  return s !== void 0 && s >= Ht && l.push({
    message: `Estimated reach is very high (${s.toLocaleString()} users). Consider rate limits.`,
    severity: "warning"
  }), r.tracking && !((u = r.tracking.campaign_name) != null && u.trim()) && !((c = r.name) != null && c.trim()) && l.push({
    message: "No campaign name set for reporting.",
    severity: "warning"
  }), (h = r.message.deep_link) != null && h.trim() || l.push({
    message: "Consider adding a deep link for better engagement.",
    severity: "info"
  }), l;
}
function I(r, n = "error") {
  return { message: r, severity: n };
}
function ot(r) {
  var l, s, u, c, h, _;
  const n = [];
  return r.schema_version || n.push(I("Missing schema_version")), (l = r.name) != null && l.trim() || n.push(I("Template name is required")), (s = r.message.title_template) != null && s.trim() || n.push(I("Title is required")), (u = r.message.body_template) != null && u.trim() || n.push(I("Message body is required")), r.audience.type === "topic" && !((c = r.audience.topic_name) != null && c.trim()) && n.push(I("Topic name is required when targeting by topic")), r.audience.platforms.length === 0 && n.push(I("At least one platform (iOS, Android, Web) must be selected")), r.tracking && !((h = r.tracking.campaign_name) != null && h.trim()) && !((_ = r.name) != null && _.trim()) && n.push(I("Campaign name is required for tracking")), r.delivery.ttl_seconds <= 0 && n.push(I("TTL must be greater than 0")), {
    valid: n.length === 0,
    errors: n
  };
}
function Jt(r, n) {
  const l = ot(r), s = Gt(r, n);
  return {
    valid: l.valid,
    errors: [
      ...l.errors,
      ...s.map((u) => I(u.message, u.severity))
    ]
  };
}
function Kt(r) {
  return r.errors.filter((n) => n.severity === "error");
}
function Xt(r) {
  return r.errors.filter((n) => n.severity !== "error");
}
function F(r, n) {
  return r.length <= n ? { text: r, truncated: !1 } : { text: r.slice(0, Math.max(0, n - 3)) + "...", truncated: !0 };
}
const ue = fe.android;
function Zt(r) {
  const { title: n, body: l } = r, s = F(n || "", ue.title), u = F(l || "", ue.body);
  return {
    title: s.text,
    body: u.text,
    imageUrl: r.imageUrl,
    titleTruncated: s.truncated,
    bodyTruncated: u.truncated,
    expanded: !1
  };
}
function Qt(r) {
  const { title: n, body: l } = r, s = F(n || "", ue.title), u = F(l || "", ue.body);
  return {
    title: s.text,
    body: u.text,
    imageUrl: r.imageUrl,
    titleTruncated: s.truncated,
    bodyTruncated: u.truncated,
    expanded: !0
  };
}
function er(r, n = {}) {
  const l = n.expanded ? Qt(r) : Zt(r);
  return n.darkMode !== void 0 && (l.darkMode = n.darkMode), l;
}
const Ge = fe.ios;
function ct(r) {
  const { title: n, body: l } = r, s = F(n || "", Ge.title), u = F(l || "", Ge.body);
  return {
    title: s.text,
    body: u.text,
    imageUrl: r.imageUrl,
    titleTruncated: s.truncated,
    bodyTruncated: u.truncated,
    expanded: !1
  };
}
function tr(r) {
  return ct(r);
}
function rr(r, n = {}) {
  const l = n.variant === "lockscreen" ? tr(r) : ct(r);
  return n.darkMode !== void 0 && (l.darkMode = n.darkMode), l;
}
const Je = fe.web;
function Ke(r) {
  const { title: n, body: l } = r, s = F(n || "", Je.title), u = F(l || "", Je.body);
  return {
    title: s.text,
    body: u.text,
    imageUrl: r.imageUrl,
    titleTruncated: s.truncated,
    bodyTruncated: u.truncated
  };
}
const b = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24
}, M = {
  input: 6,
  card: 12,
  button: 6
}, y = {
  primary: "#0f172a",
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
}, Xe = {
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600
  }
}, nr = {
  stickyBar: "0 -1px 4px rgba(0,0,0,0.08)"
};
function ir(r = {}) {
  const [n, l] = B(
    () => Ut(r.initial ?? Nt())
  ), s = r.hooks ?? {}, [u, c] = B(!1), h = L(
    (d) => {
      var p;
      l((j) => ({ ...j, ...d })), c(!0), (p = r.onDirty) == null || p.call(r);
    },
    [r]
  ), _ = L(
    (d) => {
      var p;
      l((j) => ({ ...j, audience: { ...j.audience, ...d } })), c(!0), (p = r.onDirty) == null || p.call(r);
    },
    [r]
  ), R = L(
    (d) => {
      var p;
      l((j) => ({ ...j, message: { ...j.message, ...d } })), c(!0), (p = r.onDirty) == null || p.call(r);
    },
    [r]
  ), P = L(
    (d) => {
      var p;
      l((j) => ({ ...j, delivery: { ...j.delivery, ...d } })), c(!0), (p = r.onDirty) == null || p.call(r);
    },
    [r]
  ), E = L(
    (d) => {
      var p;
      l((j) => ({
        ...j,
        tracking: j.tracking ? { ...j.tracking, ...d } : { campaign_name: "", tags: [], ab_test: !1, ...d }
      })), c(!0), (p = r.onDirty) == null || p.call(r);
    },
    [r]
  ), k = te(() => ot(n), [n]), D = L(
    (d) => {
      const p = Jt(n, d);
      return {
        ...p,
        blockingErrors: Kt(p),
        warnings: Xt(p),
        valid: p.valid
      };
    },
    [n]
  ), z = te(
    () => ({
      title: n.message.title_template,
      body: n.message.body_template,
      imageUrl: n.message.image_url
    }),
    [n.message]
  ), Y = L(
    (d, p) => {
      const j = {
        title: n.message.title_template,
        body: n.message.body_template,
        imageUrl: n.message.image_url
      };
      switch (d) {
        case "android":
          return er(j, { expanded: p == null ? void 0 : p.expanded });
        case "ios":
          return rr(j);
        case "web":
          return Ke(j);
        default:
          return Ke(j);
      }
    },
    [n.message]
  ), J = fe, K = L(async () => s.customValidators ? s.customValidators(n) : [], [s, n]);
  return {
    campaign: n,
    setCampaign: l,
    dirty: u,
    validation: k,
    getValidationWithWarnings: D,
    update: h,
    updateAudience: _,
    updateMessage: R,
    updateDelivery: P,
    updateTracking: E,
    getPreview: Y,
    previewInput: z,
    characterLimits: J,
    runCustomValidators: K,
    hooks: s
  };
}
function G({
  icon: r,
  title: n,
  subtitle: l,
  children: s
}) {
  return /* @__PURE__ */ t.jsxs(
    "section",
    {
      style: {
        padding: `${b[24]}px`,
        borderRadius: `${M.card}px`,
        background: y.neutral.bgCard
      },
      children: [
        /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: b[8] }, children: [
          r && /* @__PURE__ */ t.jsx(
            "span",
            {
              style: {
                width: 20,
                height: 20,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem"
              },
              children: r
            }
          ),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("h3", { style: { fontSize: Xe.sectionTitle.fontSize, fontWeight: Xe.sectionTitle.fontWeight, margin: "0 0 4px 0" }, children: n }),
            l && /* @__PURE__ */ t.jsx("p", { style: { fontSize: 14, color: y.neutral.textMuted, margin: 0, lineHeight: 1.3 }, children: l })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { style: { marginTop: b[16] }, children: s })
      ]
    }
  );
}
function ar({
  campaignName: r,
  status: n,
  dirty: l,
  saving: s,
  onCampaignNameChange: u
}) {
  return /* @__PURE__ */ t.jsxs(
    "header",
    {
      style: {
        padding: `${b[16]}px 0`,
        borderBottom: `1px solid ${y.neutral.border}`,
        marginBottom: `${b[16]}px`
      },
      children: [
        /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }, children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "text",
              value: r,
              placeholder: "Campaign name",
              onChange: (c) => u(c.target.value),
              style: {
                flex: 1,
                minWidth: 120,
                border: "none",
                background: "transparent",
                fontSize: "1rem",
                fontWeight: 600,
                outline: "none"
              }
            }
          ),
          /* @__PURE__ */ t.jsx(
            "span",
            {
              style: {
                padding: `${b[4]}px ${b[8]}px`,
                borderRadius: `${M.input}px`,
                background: y.neutral.bg,
                fontSize: "0.8125rem",
                color: y.neutral.textMuted
              },
              children: n
            }
          )
        ] }),
        (l || s) && /* @__PURE__ */ t.jsx("div", { style: { fontSize: "0.8125rem", color: y.neutral.textMuted, marginTop: `${b[4]}px` }, children: s ? "Saving…" : "Unsaved changes" })
      ]
    }
  );
}
function sr({ summary: r }) {
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      style: {
        padding: `${b[16]}px`,
        borderRadius: `${M.card}px`,
        background: y.neutral.bgCard,
        border: `1px solid ${y.neutral.border}`,
        marginTop: `${b[16]}px`
      },
      children: [
        /* @__PURE__ */ t.jsx("h4", { style: { fontSize: "0.875rem", fontWeight: 600, margin: `0 0 ${b[8]}px 0` }, children: "Delivery summary" }),
        /* @__PURE__ */ t.jsxs("dl", { style: { margin: 0, fontSize: "0.8125rem", color: y.neutral.textMeta }, children: [
          /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0" }, children: [
            /* @__PURE__ */ t.jsx("dt", { style: { margin: 0, color: y.neutral.textMuted }, children: "Send time" }),
            /* @__PURE__ */ t.jsx("dd", { style: { margin: 0 }, children: r.sendTime })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0" }, children: [
            /* @__PURE__ */ t.jsx("dt", { style: { margin: 0, color: y.neutral.textMuted }, children: "Audience" }),
            /* @__PURE__ */ t.jsx("dd", { style: { margin: 0 }, children: r.audienceType })
          ] }),
          r.estimatedReach !== void 0 && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0" }, children: [
            /* @__PURE__ */ t.jsx("dt", { style: { margin: 0, color: y.neutral.textMuted }, children: "Estimated reach" }),
            /* @__PURE__ */ t.jsx("dd", { style: { margin: 0 }, children: r.estimatedReach.toLocaleString() })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0" }, children: [
            /* @__PURE__ */ t.jsx("dt", { style: { margin: 0, color: y.neutral.textMuted }, children: "Platforms" }),
            /* @__PURE__ */ t.jsx("dd", { style: { margin: 0 }, children: r.platforms.join(", ") })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0" }, children: [
            /* @__PURE__ */ t.jsx("dt", { style: { margin: 0, color: y.neutral.textMuted }, children: "Priority" }),
            /* @__PURE__ */ t.jsx("dd", { style: { margin: 0 }, children: r.priority })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0" }, children: [
            /* @__PURE__ */ t.jsx("dt", { style: { margin: 0, color: y.neutral.textMuted }, children: "TTL" }),
            /* @__PURE__ */ t.jsx("dd", { style: { margin: 0 }, children: r.ttlLabel })
          ] })
        ] })
      ]
    }
  );
}
const i = {
  section: { marginBottom: "1.25rem" },
  sectionTitle: { fontSize: "1rem", fontWeight: 600, margin: "0 0 0.25rem 0" },
  sectionDesc: { fontSize: "0.875rem", color: "#64748b", margin: "0 0 0.75rem 0" },
  field: { marginBottom: "0.75rem" },
  label: { display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    fontSize: "0.875rem"
  },
  textarea: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    fontSize: "0.875rem",
    minHeight: "4rem",
    resize: "vertical"
  },
  select: { padding: "0.5rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: "0.875rem", minWidth: "10rem" },
  radioGroup: { display: "flex", flexWrap: "wrap", gap: "0.75rem" },
  checkboxGroup: { display: "flex", flexWrap: "wrap", gap: "0.75rem" },
  radio: { display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", cursor: "pointer" },
  checkbox: { display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", cursor: "pointer" },
  preview: { border: "1px solid #e2e8f0", borderRadius: 8, padding: "1rem", background: "#f8fafc" },
  previewTabs: { display: "flex", gap: "0.25rem", marginBottom: "0.75rem" },
  previewTab: { padding: "0.35rem 0.75rem", fontSize: "0.8125rem", border: "1px solid #e2e8f0", background: "#fff", borderRadius: 4, cursor: "pointer" },
  previewTabActive: { background: "#0f172a", color: "#fff", borderColor: "#0f172a" },
  previewDevice: { background: "#fff", borderRadius: 8, padding: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  previewTitle: { fontWeight: 600, marginBottom: "0.25rem" },
  previewBody: { color: "#475569", lineHeight: 1.4 },
  accordion: { border: "1px solid #e2e8f0", borderRadius: 6, marginBottom: "1.25rem" },
  accordionSummary: { padding: "0.75rem 1rem", fontWeight: 500, cursor: "pointer" },
  accordionBody: { padding: "0 1rem 1rem", borderTop: "1px solid #e2e8f0" },
  counter: { fontWeight: 400, color: "#64748b", marginLeft: "0.25rem" },
  counterWarn: { color: "#dc2626" },
  reach: { fontSize: "0.875rem", color: "#64748b", marginTop: "0.5rem" },
  variableList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  variableCode: { fontSize: "0.8125rem", padding: "0.2rem 0.5rem", background: "#f1f5f9", borderRadius: 4 },
  hint: { fontSize: "0.8125rem", color: "#64748b", margin: "0 0 0.5rem 0" }
};
function lr({
  audience: r,
  estimatedReach: n,
  canUseTestMode: l = !0,
  onUpdate: s
}) {
  var u;
  return /* @__PURE__ */ t.jsxs("section", { style: i.section, children: [
    /* @__PURE__ */ t.jsx("h3", { style: i.sectionTitle, children: "Audience" }),
    /* @__PURE__ */ t.jsx("p", { style: i.sectionDesc, children: "Who receives this push?" }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Delivery type" }),
      /* @__PURE__ */ t.jsx("div", { style: i.radioGroup, children: nt.map((c) => /* @__PURE__ */ t.jsxs("label", { style: i.radio, children: [
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "radio",
            name: "delivery-type",
            checked: r.type === c,
            onChange: () => s({ type: c })
          }
        ),
        /* @__PURE__ */ t.jsx("span", { children: c })
      ] }, c)) })
    ] }),
    r.type === "topic" && /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Topic name" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          style: i.input,
          placeholder: "e.g. promo_users, sports_updates",
          value: r.topic_name ?? "",
          onChange: (c) => s({ topic_name: c.target.value })
        }
      )
    ] }),
    r.type === "segment" && /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Segment query (JSON)" }),
      /* @__PURE__ */ t.jsx(
        "textarea",
        {
          style: { ...i.input, ...i.textarea },
          rows: 3,
          placeholder: '{"property": "country", "op": "eq", "value": "US"}',
          value: r.segment_query_json ?? "",
          onChange: (c) => s({ segment_query_json: c.target.value })
        }
      )
    ] }),
    r.type === "user_list" && /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "User IDs or tokens (one per line)" }),
      /* @__PURE__ */ t.jsx(
        "textarea",
        {
          style: { ...i.input, ...i.textarea },
          rows: 3,
          placeholder: `user_123
user_456`,
          value: ((u = r.user_list) == null ? void 0 : u.join(`
`)) ?? "",
          onChange: (c) => s({
            user_list: c.target.value.split(`
`).map((h) => h.trim()).filter(Boolean)
          })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Platforms" }),
      /* @__PURE__ */ t.jsx("div", { style: i.checkboxGroup, children: Qe.map((c) => /* @__PURE__ */ t.jsxs("label", { style: i.checkbox, children: [
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "checkbox",
            checked: r.platforms.includes(c),
            onChange: () => s({
              platforms: r.platforms.includes(c) ? r.platforms.filter((h) => h !== c) : [...r.platforms, c]
            })
          }
        ),
        /* @__PURE__ */ t.jsx("span", { children: c })
      ] }, c)) })
    ] }),
    l && /* @__PURE__ */ t.jsx("div", { style: i.field, children: /* @__PURE__ */ t.jsxs("label", { style: i.checkbox, children: [
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "checkbox",
          checked: r.test_mode ?? !1,
          onChange: () => s({ test_mode: !r.test_mode })
        }
      ),
      /* @__PURE__ */ t.jsx("span", { children: "Send to test device / test group only" })
    ] }) }),
    n !== void 0 && /* @__PURE__ */ t.jsxs("div", { style: i.reach, children: [
      "Estimated reach: ",
      n.toLocaleString()
    ] })
  ] });
}
function or({
  message: r,
  titleCount: n,
  bodyCount: l,
  titleLimit: s,
  bodyLimit: u,
  onUpdate: c
}) {
  return /* @__PURE__ */ t.jsxs("section", { style: i.section, children: [
    /* @__PURE__ */ t.jsx("h3", { style: i.sectionTitle, children: "Message content" }),
    /* @__PURE__ */ t.jsx("p", { style: i.sectionDesc, children: "What users see" }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsxs("label", { style: i.label, children: [
        "Title",
        /* @__PURE__ */ t.jsxs("span", { style: { ...i.counter, ...n > s ? i.counterWarn : {} }, children: [
          n,
          "/",
          s
        ] })
      ] }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          style: i.input,
          placeholder: "Notification title",
          value: r.title_template,
          onChange: (h) => c({ title_template: h.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsxs("label", { style: i.label, children: [
        "Message",
        /* @__PURE__ */ t.jsxs("span", { style: { ...i.counter, ...l > u ? i.counterWarn : {} }, children: [
          l,
          "/",
          u
        ] })
      ] }),
      /* @__PURE__ */ t.jsx(
        "textarea",
        {
          style: i.textarea,
          rows: 3,
          placeholder: "Notification body",
          value: r.body_template,
          onChange: (h) => c({ body_template: h.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Media (image URL)" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "url",
          style: i.input,
          placeholder: "https://...",
          value: r.image_url ?? "",
          onChange: (h) => c({ image_url: h.target.value || void 0 })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Deep link / Action URL" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "url",
          style: i.input,
          placeholder: "https:// or app://...",
          value: r.deep_link ?? "",
          onChange: (h) => c({ deep_link: h.target.value || void 0 })
        }
      )
    ] })
  ] });
}
const cr = ["first_name", "last_name", "order_id", "city"];
function dr({
  variableOptions: r,
  onInsertVariable: n
}) {
  const l = r ?? cr, [s, u] = B(l[0] ?? "first_name");
  return /* @__PURE__ */ t.jsxs("section", { style: i.section, children: [
    /* @__PURE__ */ t.jsx("h3", { style: i.sectionTitle, children: "Personalization (optional)" }),
    /* @__PURE__ */ t.jsx("p", { style: i.sectionDesc, children: "Use variables like {{ first_name }}" }),
    n && /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Insert variable" }),
      /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ t.jsx(
          "select",
          {
            value: s,
            onChange: (c) => u(c.target.value),
            style: { padding: "0.35rem 0.5rem", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: "0.875rem", minWidth: "8rem" },
            children: l.map((c) => /* @__PURE__ */ t.jsx("option", { value: c, children: c }, c))
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "button",
            onClick: () => n({ variable: s, field: "title" }),
            style: { padding: "0.35rem 0.75rem", fontSize: "0.8125rem", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" },
            children: "Into title"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "button",
            onClick: () => n({ variable: s, field: "body" }),
            style: { padding: "0.35rem 0.75rem", fontSize: "0.8125rem", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" },
            children: "Into message"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Available variables" }),
      /* @__PURE__ */ t.jsx("p", { style: i.hint, children: "Insert in title or message: {{ variable_name }}. Fallback can be set when sending." }),
      /* @__PURE__ */ t.jsx("ul", { style: i.variableList, children: l.map((c) => /* @__PURE__ */ t.jsx("li", { children: /* @__PURE__ */ t.jsxs("code", { style: i.variableCode, children: [
        "{{ ",
        c,
        " }}"
      ] }) }, c)) })
    ] })
  ] });
}
const ur = {
  3600: "1 hour",
  7200: "2 hours",
  86400: "24 hours",
  172800: "48 hours"
};
function fr({
  delivery: r,
  onUpdate: n
}) {
  var l;
  return /* @__PURE__ */ t.jsxs("section", { style: i.section, children: [
    /* @__PURE__ */ t.jsx("h3", { style: i.sectionTitle, children: "Delivery controls" }),
    /* @__PURE__ */ t.jsx("p", { style: i.sectionDesc, children: "When and how it sends" }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Send" }),
      /* @__PURE__ */ t.jsxs("div", { style: i.radioGroup, children: [
        /* @__PURE__ */ t.jsxs("label", { style: i.radio, children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "radio",
              name: "send-mode",
              checked: !r.scheduled_at,
              onChange: () => n({ scheduled_at: void 0 })
            }
          ),
          /* @__PURE__ */ t.jsx("span", { children: "Now" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { style: i.radio, children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "radio",
              name: "send-mode",
              checked: !!r.scheduled_at,
              onChange: () => n({ scheduled_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16) })
            }
          ),
          /* @__PURE__ */ t.jsx("span", { children: "Schedule" })
        ] })
      ] })
    ] }),
    r.scheduled_at && /* @__PURE__ */ t.jsxs("div", { style: { ...i.field, display: "flex", gap: "0.5rem" }, children: [
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "datetime-local",
          style: { ...i.input, flex: 1 },
          value: ((l = r.scheduled_at) == null ? void 0 : l.slice(0, 16)) ?? "",
          onChange: (s) => n({ scheduled_at: s.target.value })
        }
      ),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          style: { ...i.input, flex: 1 },
          placeholder: "Timezone e.g. UTC",
          value: r.timezone ?? "",
          onChange: (s) => n({ timezone: s.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Expiration (TTL)" }),
      /* @__PURE__ */ t.jsx(
        "select",
        {
          style: i.select,
          value: r.ttl_seconds,
          onChange: (s) => n({ ttl_seconds: Number(s.target.value) }),
          children: Ft.map((s) => /* @__PURE__ */ t.jsx("option", { value: s, children: ur[s] ?? s + "s" }, s))
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsxs("label", { style: i.label, children: [
        "Priority",
        /* @__PURE__ */ t.jsx("span", { title: "High: wakes device immediately. Normal: batched. Low: may be delayed.", children: "ⓘ" })
      ] }),
      /* @__PURE__ */ t.jsx(
        "select",
        {
          style: i.select,
          value: r.priority,
          onChange: (s) => n({ priority: s.target.value }),
          children: tt.map((s) => /* @__PURE__ */ t.jsx("option", { value: s, children: s }, s))
        }
      )
    ] }),
    /* @__PURE__ */ t.jsx("div", { style: i.field, children: /* @__PURE__ */ t.jsxs("label", { style: i.checkbox, children: [
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "checkbox",
          checked: r.quiet_hours_respected ?? !1,
          onChange: () => n({ quiet_hours_respected: !r.quiet_hours_respected })
        }
      ),
      /* @__PURE__ */ t.jsx("span", { children: "Respect quiet hours" })
    ] }) })
  ] });
}
function pr({
  delivery: r,
  onUpdate: n
}) {
  const [l, s] = B(!1);
  return /* @__PURE__ */ t.jsxs("div", { style: i.accordion, children: [
    /* @__PURE__ */ t.jsx("div", { style: i.accordionSummary, onClick: () => s(!l), role: "button", tabIndex: 0, onKeyDown: (u) => u.key === "Enter" && s(!l), children: "Advanced push behavior" }),
    l && /* @__PURE__ */ t.jsxs("div", { style: i.accordionBody, children: [
      /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
        /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Collapse key (replace previous notifications)" }),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "text",
            style: i.input,
            placeholder: "e.g. order_updates",
            value: r.collapse_key ?? "",
            onChange: (u) => n({ collapse_key: u.target.value || void 0 })
          }
        )
      ] }),
      /* @__PURE__ */ t.jsx("div", { style: i.field, children: /* @__PURE__ */ t.jsxs("label", { style: i.checkbox, children: [
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "checkbox",
            checked: r.silent_push ?? !1,
            onChange: () => n({ silent_push: !r.silent_push })
          }
        ),
        /* @__PURE__ */ t.jsx("span", { children: "Silent push (background only)" })
      ] }) })
    ] })
  ] });
}
function mr({
  tracking: r,
  onUpdate: n
}) {
  var l;
  return /* @__PURE__ */ t.jsxs("section", { style: i.section, children: [
    /* @__PURE__ */ t.jsx("h3", { style: i.sectionTitle, children: "Tracking & analytics" }),
    /* @__PURE__ */ t.jsx("p", { style: i.sectionDesc, children: "Campaign name is required for reporting" }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Campaign name" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          style: i.input,
          placeholder: "e.g. Spring Sale Promo",
          value: r.campaign_name,
          onChange: (s) => n({ campaign_name: s.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Tags" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          style: i.input,
          placeholder: "sale, promo, march",
          value: ((l = r.tags) == null ? void 0 : l.join(", ")) ?? "",
          onChange: (s) => n({
            tags: s.target.value.split(",").map((u) => u.trim()).filter(Boolean)
          })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsx("div", { style: i.field, children: /* @__PURE__ */ t.jsxs("label", { style: i.checkbox, children: [
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "checkbox",
          checked: r.ab_test ?? !1,
          onChange: () => n({ ab_test: !r.ab_test })
        }
      ),
      /* @__PURE__ */ t.jsx("span", { children: "A/B test" })
    ] }) }),
    /* @__PURE__ */ t.jsxs("div", { style: i.field, children: [
      /* @__PURE__ */ t.jsx("label", { style: i.label, children: "Conversion event" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          style: i.input,
          placeholder: "e.g. purchase_completed",
          value: r.conversion_event ?? "",
          onChange: (s) => n({ conversion_event: s.target.value || void 0 })
        }
      )
    ] })
  ] });
}
function gr({
  getPreview: r,
  selectedPlatform: n,
  onPlatformChange: l
}) {
  const [s, u] = B(!1), c = te(
    () => r(n, {
      expanded: n === "android" ? s : void 0
    }),
    [r, n, s]
  ), h = ["android", "ios", "web"];
  return /* @__PURE__ */ t.jsxs("div", { style: i.preview, children: [
    /* @__PURE__ */ t.jsx("div", { style: i.previewTabs, children: h.map((_) => /* @__PURE__ */ t.jsx(
      "button",
      {
        type: "button",
        style: {
          ...i.previewTab,
          ...n === _ ? i.previewTabActive : {}
        },
        onClick: () => l(_),
        children: _
      },
      _
    )) }),
    n === "android" && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: "0.5rem" }, children: /* @__PURE__ */ t.jsxs("label", { style: i.checkbox, children: [
      /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: s, onChange: (_) => u(_.target.checked) }),
      /* @__PURE__ */ t.jsx("span", { children: "Expanded" })
    ] }) }),
    /* @__PURE__ */ t.jsx("div", { style: i.previewDevice, children: /* @__PURE__ */ t.jsxs("div", { style: { fontSize: "0.875rem" }, children: [
      c.title && /* @__PURE__ */ t.jsx("div", { style: i.previewTitle, children: c.title }),
      c.body && /* @__PURE__ */ t.jsx("div", { style: i.previewBody, children: c.body }),
      c.imageUrl && /* @__PURE__ */ t.jsx("div", { style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ t.jsx("img", { src: c.imageUrl, alt: "", style: { maxWidth: "100%", height: "auto", borderRadius: 4 } }) })
    ] }) })
  ] });
}
function yr({
  campaign: r,
  hooks: n,
  disabledSections: l = [],
  variableOptions: s,
  onChange: u,
  onSave: c,
  onSendTest: h,
  onSchedule: _,
  onSend: R
}) {
  const [P, E] = B("android"), [k, D] = B(), [z, Y] = B(!0), [J, K] = B(!0), d = ir({
    initial: r,
    hooks: n,
    onDirty: () => u == null ? void 0 : u(d.campaign)
  }), p = L(async () => {
    if (n != null && n.estimateReach)
      try {
        const w = await n.estimateReach(d.campaign.audience);
        D(w);
      } catch {
        D(void 0);
      }
    n != null && n.canSend && Y(await Promise.resolve(n.canSend())), n != null && n.canSchedule && K(await Promise.resolve(n.canSchedule()));
  }, [n, d.campaign.audience]);
  It(() => {
    p();
  }, [p]);
  const j = te(
    () => d.getValidationWithWarnings(k),
    [d.campaign, k, d.getValidationWithWarnings]
  ), re = j.blockingErrors, ne = j.warnings, N = j.valid, pe = te(
    () => qt(d.campaign, k),
    [d.campaign, k]
  ), me = d.characterLimits[P].title, ie = d.characterLimits[P].body, ge = d.campaign.message.title_template.length, he = d.campaign.message.body_template.length, ae = L(
    (w) => {
      d.update({ name: w });
    },
    [d]
  ), A = () => {
    N && (c == null || c(d.campaign));
  }, $ = () => h == null ? void 0 : h(d.campaign), U = () => {
    N && (_ == null || _(d.campaign));
  }, se = () => {
    N && (R == null || R(d.campaign));
  };
  return /* @__PURE__ */ t.jsxs("div", { style: { fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 14, color: y.neutral.text, maxWidth: "100%" }, children: [
    /* @__PURE__ */ t.jsx(
      ar,
      {
        campaignName: d.campaign.name,
        status: d.campaign.status,
        dirty: d.dirty,
        onCampaignNameChange: ae
      }
    ),
    re.length > 0 && /* @__PURE__ */ t.jsx(
      "div",
      {
        style: {
          background: y.dangerBg,
          border: `1px solid ${y.dangerBorder}`,
          borderRadius: M.input,
          padding: `${b[12]}px ${b[16]}px`,
          marginBottom: b[16]
        },
        children: /* @__PURE__ */ t.jsx("ul", { style: { margin: 0, paddingLeft: "1.25rem", color: y.danger }, children: re.map((w) => /* @__PURE__ */ t.jsx("li", { children: w.message }, w.message)) })
      }
    ),
    ne.length > 0 && /* @__PURE__ */ t.jsxs(
      "div",
      {
        style: {
          background: y.neutral.bg,
          border: `1px solid ${y.neutral.border}`,
          borderRadius: M.input,
          padding: `${b[12]}px ${b[16]}px`,
          marginBottom: b[16],
          fontSize: "0.875rem",
          color: y.neutral.textMuted
        },
        children: [
          /* @__PURE__ */ t.jsx("strong", { style: { display: "block", marginBottom: b[4] }, children: "Warnings" }),
          /* @__PURE__ */ t.jsx("ul", { style: { margin: 0, paddingLeft: "1.25rem" }, children: ne.map((w) => /* @__PURE__ */ t.jsx("li", { children: w.message }, w.message)) })
        ]
      }
    ),
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr minmax(320px, 400px)",
          gap: 24,
          alignItems: "start",
          marginBottom: 24
        },
        className: "kb-two-pane",
        children: [
          /* @__PURE__ */ t.jsxs("div", { style: { minWidth: 0, maxWidth: 640, overflowY: "auto" }, className: "kb-pane-left", children: [
            !l.includes("audience") && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: b[16] }, children: /* @__PURE__ */ t.jsx(G, { icon: "📣", title: "Audience", subtitle: "Choose who receives this notification", children: /* @__PURE__ */ t.jsx(
              lr,
              {
                audience: d.campaign.audience,
                estimatedReach: k,
                canUseTestMode: !0,
                onUpdate: d.updateAudience
              }
            ) }) }),
            !l.includes("message") && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: b[16] }, children: /* @__PURE__ */ t.jsx(G, { icon: "✉️", title: "Message content", subtitle: "What users see", children: /* @__PURE__ */ t.jsx(
              or,
              {
                message: d.campaign.message,
                titleCount: ge,
                bodyCount: he,
                titleLimit: me,
                bodyLimit: ie,
                selectedPlatform: P,
                onUpdate: d.updateMessage
              }
            ) }) }),
            !l.includes("personalization") && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: b[16] }, children: /* @__PURE__ */ t.jsx(G, { icon: "🔤", title: "Personalization", subtitle: "Optional variables", children: /* @__PURE__ */ t.jsx(
              dr,
              {
                message: d.campaign.message,
                variableOptions: s,
                onInsertVariable: (w) => {
                  const X = ` {{ ${w.variable} }}`;
                  w.field === "title" ? d.updateMessage({ title_template: d.campaign.message.title_template + X }) : d.updateMessage({ body_template: d.campaign.message.body_template + X });
                }
              }
            ) }) }),
            !l.includes("delivery") && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: b[16] }, children: /* @__PURE__ */ t.jsx(G, { icon: "⏱", title: "Delivery controls", subtitle: "When and how it sends", children: /* @__PURE__ */ t.jsx(fr, { delivery: d.campaign.delivery, onUpdate: d.updateDelivery }) }) }),
            !l.includes("advanced") && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: b[16] }, children: /* @__PURE__ */ t.jsx(G, { icon: "⚙️", title: "Advanced", subtitle: "Collapse key, silent push", children: /* @__PURE__ */ t.jsx(pr, { delivery: d.campaign.delivery, onUpdate: d.updateDelivery }) }) }),
            !l.includes("tracking") && d.campaign.tracking && /* @__PURE__ */ t.jsx("div", { style: { marginBottom: b[16] }, children: /* @__PURE__ */ t.jsx(G, { icon: "📊", title: "Tracking & analytics", subtitle: "Campaign name and tags", children: /* @__PURE__ */ t.jsx(mr, { tracking: d.campaign.tracking, onUpdate: d.updateTracking }) }) })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { style: { position: "sticky", top: 0, overflowY: "auto", maxHeight: "calc(100vh - 180px)" }, className: "kb-pane-right", children: [
            /* @__PURE__ */ t.jsxs("details", { open: !0, style: { marginBottom: 16 }, children: [
              /* @__PURE__ */ t.jsx("summary", { style: { padding: "12px 16px", cursor: "pointer", fontWeight: 600, listStyle: "none" }, className: "kb-preview-summary", children: "Live preview" }),
              /* @__PURE__ */ t.jsxs("div", { style: { maxHeight: 320, overflowY: "auto", padding: "0 16px 16px" }, children: [
                /* @__PURE__ */ t.jsx("h3", { style: { fontSize: "1rem", fontWeight: 600, margin: `0 0 ${b[8]}px 0` }, children: "Live preview" }),
                /* @__PURE__ */ t.jsx(
                  gr,
                  {
                    getPreview: d.getPreview,
                    selectedPlatform: P,
                    onPlatformChange: E
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ t.jsx(sr, { summary: pe })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: b[8],
          padding: `${b[16]}px 0`,
          borderTop: `1px solid ${y.neutral.border}`,
          background: "#fff",
          boxShadow: nr.stickyBar,
          position: "sticky",
          bottom: 0,
          zIndex: 10
        },
        children: [
          /* @__PURE__ */ t.jsx(
            "button",
            {
              type: "button",
              style: { padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, borderRadius: M.button, cursor: "pointer", border: `1px solid ${y.neutral.border}`, background: "#fff", color: y.neutral.text },
              onClick: A,
              children: "Save template"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              type: "button",
              style: { padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, borderRadius: M.button, cursor: "pointer", border: `1px solid ${y.neutral.border}`, background: "#fff", color: y.neutral.text },
              onClick: $,
              children: "Send test"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              type: "button",
              style: { padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, borderRadius: M.button, cursor: "pointer", border: `1px solid ${y.neutral.border}`, background: "#fff", color: y.neutral.text },
              disabled: !J || !N,
              onClick: U,
              children: "Schedule"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              type: "button",
              style: { padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, borderRadius: M.button, cursor: "pointer", border: `1px solid ${y.primary}`, background: y.primary, color: "#fff" },
              disabled: !z || !N,
              onClick: se,
              children: "Send"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t.jsx(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: `
@media (max-width: 899px) {
  .kb-two-pane { grid-template-columns: 1fr !important; grid-template-rows: auto 1fr; }
  .kb-pane-right { order: -1; position: static !important; max-height: none !important; }
  .kb-pane-left { max-width: none !important; }
}
@media (min-width: 600px) {
  .kb-preview-summary { display: none; }
}
`
        }
      }
    )
  ] });
}
export {
  yr as KeosNotificationBuilder,
  ir as useCampaignState
};
//# sourceMappingURL=index.js.map
