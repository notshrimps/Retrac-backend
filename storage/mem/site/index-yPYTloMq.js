var Cl = (e, t, n) => {
  if (!t.has(e)) throw TypeError("Cannot " + n);
};
var P = (e, t, n) => (
    Cl(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  A = (e, t, n) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  L = (e, t, n, r) => (
    Cl(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
  );
var ao = (e, t, n, r) => ({
    set _(i) {
      L(e, t, i, n);
    },
    get _() {
      return P(e, t, r);
    },
  }),
  z = (e, t, n) => (Cl(e, t, "access private method"), n);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = n(i);
    fetch(i.href, s);
  }
})();
function Yc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Wm = { exports: {} },
  La = {},
  Qm = { exports: {} },
  b = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hs = Symbol.for("react.element"),
  M1 = Symbol.for("react.portal"),
  j1 = Symbol.for("react.fragment"),
  I1 = Symbol.for("react.strict_mode"),
  L1 = Symbol.for("react.profiler"),
  A1 = Symbol.for("react.provider"),
  N1 = Symbol.for("react.context"),
  F1 = Symbol.for("react.forward_ref"),
  V1 = Symbol.for("react.suspense"),
  b1 = Symbol.for("react.memo"),
  B1 = Symbol.for("react.lazy"),
  Af = Symbol.iterator;
function z1(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Af && e[Af]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Gm = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  qm = Object.assign,
  Ym = {};
function Ci(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ym),
    (this.updater = n || Gm);
}
Ci.prototype.isReactComponent = {};
Ci.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ci.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Xm() {}
Xm.prototype = Ci.prototype;
function Xc(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ym),
    (this.updater = n || Gm);
}
var Jc = (Xc.prototype = new Xm());
Jc.constructor = Xc;
qm(Jc, Ci.prototype);
Jc.isPureReactComponent = !0;
var Nf = Array.isArray,
  Jm = Object.prototype.hasOwnProperty,
  Zc = { current: null },
  Zm = { key: !0, ref: !0, __self: !0, __source: !0 };
function ey(e, t, n) {
  var r,
    i = {},
    s = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (s = "" + t.key),
    t))
      Jm.call(t, r) && !Zm.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: Hs,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: Zc.current,
  };
}
function U1(e, t) {
  return {
    $$typeof: Hs,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ed(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Hs;
}
function $1(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Ff = /\/+/g;
function El(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? $1("" + e.key)
    : t.toString(36);
}
function Mo(e, t, n, r, i) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (s) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Hs:
          case M1:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + El(o, 0) : r),
      Nf(i)
        ? ((n = ""),
          e != null && (n = e.replace(Ff, "$&/") + "/"),
          Mo(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (ed(i) &&
            (i = U1(
              i,
              n +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(Ff, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Nf(e)))
    for (var a = 0; a < e.length; a++) {
      s = e[a];
      var l = r + El(s, a);
      o += Mo(s, t, n, l, i);
    }
  else if (((l = z1(e)), typeof l == "function"))
    for (e = l.call(e), a = 0; !(s = e.next()).done; )
      (s = s.value), (l = r + El(s, a++)), (o += Mo(s, t, n, l, i));
  else if (s === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return o;
}
function lo(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Mo(e, r, "", "", function (s) {
      return t.call(n, s, i++);
    }),
    r
  );
}
function H1(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Be = { current: null },
  jo = { transition: null },
  K1 = {
    ReactCurrentDispatcher: Be,
    ReactCurrentBatchConfig: jo,
    ReactCurrentOwner: Zc,
  };
b.Children = {
  map: lo,
  forEach: function (e, t, n) {
    lo(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      lo(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      lo(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ed(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
b.Component = Ci;
b.Fragment = j1;
b.Profiler = L1;
b.PureComponent = Xc;
b.StrictMode = I1;
b.Suspense = V1;
b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K1;
b.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = qm({}, e.props),
    i = e.key,
    s = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((s = t.ref), (o = Zc.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (l in t)
      Jm.call(t, l) &&
        !Zm.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: Hs, type: e.type, key: i, ref: s, props: r, _owner: o };
};
b.createContext = function (e) {
  return (
    (e = {
      $$typeof: N1,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: A1, _context: e }),
    (e.Consumer = e)
  );
};
b.createElement = ey;
b.createFactory = function (e) {
  var t = ey.bind(null, e);
  return (t.type = e), t;
};
b.createRef = function () {
  return { current: null };
};
b.forwardRef = function (e) {
  return { $$typeof: F1, render: e };
};
b.isValidElement = ed;
b.lazy = function (e) {
  return { $$typeof: B1, _payload: { _status: -1, _result: e }, _init: H1 };
};
b.memo = function (e, t) {
  return { $$typeof: b1, type: e, compare: t === void 0 ? null : t };
};
b.startTransition = function (e) {
  var t = jo.transition;
  jo.transition = {};
  try {
    e();
  } finally {
    jo.transition = t;
  }
};
b.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
b.useCallback = function (e, t) {
  return Be.current.useCallback(e, t);
};
b.useContext = function (e) {
  return Be.current.useContext(e);
};
b.useDebugValue = function () {};
b.useDeferredValue = function (e) {
  return Be.current.useDeferredValue(e);
};
b.useEffect = function (e, t) {
  return Be.current.useEffect(e, t);
};
b.useId = function () {
  return Be.current.useId();
};
b.useImperativeHandle = function (e, t, n) {
  return Be.current.useImperativeHandle(e, t, n);
};
b.useInsertionEffect = function (e, t) {
  return Be.current.useInsertionEffect(e, t);
};
b.useLayoutEffect = function (e, t) {
  return Be.current.useLayoutEffect(e, t);
};
b.useMemo = function (e, t) {
  return Be.current.useMemo(e, t);
};
b.useReducer = function (e, t, n) {
  return Be.current.useReducer(e, t, n);
};
b.useRef = function (e) {
  return Be.current.useRef(e);
};
b.useState = function (e) {
  return Be.current.useState(e);
};
b.useSyncExternalStore = function (e, t, n) {
  return Be.current.useSyncExternalStore(e, t, n);
};
b.useTransition = function () {
  return Be.current.useTransition();
};
b.version = "18.2.0";
Qm.exports = b;
var T = Qm.exports;
const Rn = Yc(T);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var W1 = T,
  Q1 = Symbol.for("react.element"),
  G1 = Symbol.for("react.fragment"),
  q1 = Object.prototype.hasOwnProperty,
  Y1 = W1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  X1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function ty(e, t, n) {
  var r,
    i = {},
    s = null,
    o = null;
  n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) q1.call(t, r) && !X1.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Q1,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: Y1.current,
  };
}
La.Fragment = G1;
La.jsx = ty;
La.jsxs = ty;
Wm.exports = La;
var S = Wm.exports,
  Eu = {},
  ny = { exports: {} },
  tt = {},
  ry = { exports: {} },
  iy = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(D, F) {
    var V = D.length;
    D.push(F);
    e: for (; 0 < V; ) {
      var Y = (V - 1) >>> 1,
        oe = D[Y];
      if (0 < i(oe, F)) (D[Y] = F), (D[V] = oe), (V = Y);
      else break e;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function r(D) {
    if (D.length === 0) return null;
    var F = D[0],
      V = D.pop();
    if (V !== F) {
      D[0] = V;
      e: for (var Y = 0, oe = D.length, zt = oe >>> 1; Y < zt; ) {
        var ke = 2 * (Y + 1) - 1,
          Rt = D[ke],
          Ue = ke + 1,
          B = D[Ue];
        if (0 > i(Rt, V))
          Ue < oe && 0 > i(B, Rt)
            ? ((D[Y] = B), (D[Ue] = V), (Y = Ue))
            : ((D[Y] = Rt), (D[ke] = V), (Y = ke));
        else if (Ue < oe && 0 > i(B, V)) (D[Y] = B), (D[Ue] = V), (Y = Ue);
        else break e;
      }
    }
    return F;
  }
  function i(D, F) {
    var V = D.sortIndex - F.sortIndex;
    return V !== 0 ? V : D.id - F.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    e.unstable_now = function () {
      return s.now();
    };
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function () {
      return o.now() - a;
    };
  }
  var l = [],
    u = [],
    c = 1,
    d = null,
    f = 3,
    g = !1,
    m = !1,
    y = !1,
    w = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(D) {
    for (var F = n(u); F !== null; ) {
      if (F.callback === null) r(u);
      else if (F.startTime <= D)
        r(u), (F.sortIndex = F.expirationTime), t(l, F);
      else break;
      F = n(u);
    }
  }
  function x(D) {
    if (((y = !1), v(D), !m))
      if (n(l) !== null) (m = !0), se(E);
      else {
        var F = n(u);
        F !== null && $(x, F.startTime - D);
      }
  }
  function E(D, F) {
    (m = !1), y && ((y = !1), p(C), (C = -1)), (g = !0);
    var V = f;
    try {
      for (
        v(F), d = n(l);
        d !== null && (!(d.expirationTime > F) || (D && !K()));

      ) {
        var Y = d.callback;
        if (typeof Y == "function") {
          (d.callback = null), (f = d.priorityLevel);
          var oe = Y(d.expirationTime <= F);
          (F = e.unstable_now()),
            typeof oe == "function" ? (d.callback = oe) : d === n(l) && r(l),
            v(F);
        } else r(l);
        d = n(l);
      }
      if (d !== null) var zt = !0;
      else {
        var ke = n(u);
        ke !== null && $(x, ke.startTime - F), (zt = !1);
      }
      return zt;
    } finally {
      (d = null), (f = V), (g = !1);
    }
  }
  var k = !1,
    _ = null,
    C = -1,
    M = 5,
    I = -1;
  function K() {
    return !(e.unstable_now() - I < M);
  }
  function W() {
    if (_ !== null) {
      var D = e.unstable_now();
      I = D;
      var F = !0;
      try {
        F = _(!0, D);
      } finally {
        F ? ce() : ((k = !1), (_ = null));
      }
    } else k = !1;
  }
  var ce;
  if (typeof h == "function")
    ce = function () {
      h(W);
    };
  else if (typeof MessageChannel < "u") {
    var ie = new MessageChannel(),
      Q = ie.port2;
    (ie.port1.onmessage = W),
      (ce = function () {
        Q.postMessage(null);
      });
  } else
    ce = function () {
      w(W, 0);
    };
  function se(D) {
    (_ = D), k || ((k = !0), ce());
  }
  function $(D, F) {
    C = w(function () {
      D(e.unstable_now());
    }, F);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (D) {
      D.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      m || g || ((m = !0), se(E));
    }),
    (e.unstable_forceFrameRate = function (D) {
      0 > D || 125 < D
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (M = 0 < D ? Math.floor(1e3 / D) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (D) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = f;
      }
      var V = f;
      f = F;
      try {
        return D();
      } finally {
        f = V;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (D, F) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var V = f;
      f = D;
      try {
        return F();
      } finally {
        f = V;
      }
    }),
    (e.unstable_scheduleCallback = function (D, F, V) {
      var Y = e.unstable_now();
      switch (
        (typeof V == "object" && V !== null
          ? ((V = V.delay), (V = typeof V == "number" && 0 < V ? Y + V : Y))
          : (V = Y),
        D)
      ) {
        case 1:
          var oe = -1;
          break;
        case 2:
          oe = 250;
          break;
        case 5:
          oe = 1073741823;
          break;
        case 4:
          oe = 1e4;
          break;
        default:
          oe = 5e3;
      }
      return (
        (oe = V + oe),
        (D = {
          id: c++,
          callback: F,
          priorityLevel: D,
          startTime: V,
          expirationTime: oe,
          sortIndex: -1,
        }),
        V > Y
          ? ((D.sortIndex = V),
            t(u, D),
            n(l) === null &&
              D === n(u) &&
              (y ? (p(C), (C = -1)) : (y = !0), $(x, V - Y)))
          : ((D.sortIndex = oe), t(l, D), m || g || ((m = !0), se(E))),
        D
      );
    }),
    (e.unstable_shouldYield = K),
    (e.unstable_wrapCallback = function (D) {
      var F = f;
      return function () {
        var V = f;
        f = F;
        try {
          return D.apply(this, arguments);
        } finally {
          f = V;
        }
      };
    });
})(iy);
ry.exports = iy;
var J1 = ry.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sy = T,
  Ze = J1;
function O(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var oy = new Set(),
  ls = {};
function wr(e, t) {
  ci(e, t), ci(e + "Capture", t);
}
function ci(e, t) {
  for (ls[e] = t, e = 0; e < t.length; e++) oy.add(t[e]);
}
var tn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Tu = Object.prototype.hasOwnProperty,
  Z1 =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Vf = {},
  bf = {};
function eS(e) {
  return Tu.call(bf, e)
    ? !0
    : Tu.call(Vf, e)
    ? !1
    : Z1.test(e)
    ? (bf[e] = !0)
    : ((Vf[e] = !0), !1);
}
function tS(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function nS(e, t, n, r) {
  if (t === null || typeof t > "u" || tS(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ze(e, t, n, r, i, s, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = s),
    (this.removeEmptyString = o);
}
var Re = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Re[e] = new ze(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Re[t] = new ze(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Re[e] = new ze(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Re[e] = new ze(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Re[e] = new ze(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Re[e] = new ze(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Re[e] = new ze(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Re[e] = new ze(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Re[e] = new ze(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var td = /[\-:]([a-z])/g;
function nd(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(td, nd);
    Re[t] = new ze(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(td, nd);
    Re[t] = new ze(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(td, nd);
  Re[t] = new ze(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Re[e] = new ze(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Re.xlinkHref = new ze(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Re[e] = new ze(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function rd(e, t, n, r) {
  var i = Re.hasOwnProperty(t) ? Re[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (nS(t, n, i, r) && (n = null),
    r || i === null
      ? eS(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var an = sy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  uo = Symbol.for("react.element"),
  _r = Symbol.for("react.portal"),
  Or = Symbol.for("react.fragment"),
  id = Symbol.for("react.strict_mode"),
  Ru = Symbol.for("react.profiler"),
  ay = Symbol.for("react.provider"),
  ly = Symbol.for("react.context"),
  sd = Symbol.for("react.forward_ref"),
  ku = Symbol.for("react.suspense"),
  _u = Symbol.for("react.suspense_list"),
  od = Symbol.for("react.memo"),
  hn = Symbol.for("react.lazy"),
  uy = Symbol.for("react.offscreen"),
  Bf = Symbol.iterator;
function Mi(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Bf && e[Bf]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ue = Object.assign,
  Tl;
function zi(e) {
  if (Tl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Tl = (t && t[1]) || "";
    }
  return (
    `
` +
    Tl +
    e
  );
}
var Rl = !1;
function kl(e, t) {
  if (!e || Rl) return "";
  Rl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          s = r.stack.split(`
`),
          o = i.length - 1,
          a = s.length - 1;
        1 <= o && 0 <= a && i[o] !== s[a];

      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (i[o] !== s[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || i[o] !== s[a])) {
                var l =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    (Rl = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? zi(e) : "";
}
function rS(e) {
  switch (e.tag) {
    case 5:
      return zi(e.type);
    case 16:
      return zi("Lazy");
    case 13:
      return zi("Suspense");
    case 19:
      return zi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = kl(e.type, !1)), e;
    case 11:
      return (e = kl(e.type.render, !1)), e;
    case 1:
      return (e = kl(e.type, !0)), e;
    default:
      return "";
  }
}
function Ou(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Or:
      return "Fragment";
    case _r:
      return "Portal";
    case Ru:
      return "Profiler";
    case id:
      return "StrictMode";
    case ku:
      return "Suspense";
    case _u:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case ly:
        return (e.displayName || "Context") + ".Consumer";
      case ay:
        return (e._context.displayName || "Context") + ".Provider";
      case sd:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case od:
        return (
          (t = e.displayName || null), t !== null ? t : Ou(e.type) || "Memo"
        );
      case hn:
        (t = e._payload), (e = e._init);
        try {
          return Ou(e(t));
        } catch {}
    }
  return null;
}
function iS(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Ou(t);
    case 8:
      return t === id ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Vn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function cy(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function sS(e) {
  var t = cy(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      s = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          (r = "" + o), s.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function co(e) {
  e._valueTracker || (e._valueTracker = sS(e));
}
function dy(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = cy(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Yo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Du(e, t) {
  var n = t.checked;
  return ue({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function zf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Vn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function fy(e, t) {
  (t = t.checked), t != null && rd(e, "checked", t, !1);
}
function Mu(e, t) {
  fy(e, t);
  var n = Vn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? ju(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && ju(e, t.type, Vn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Uf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function ju(e, t, n) {
  (t !== "number" || Yo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ui = Array.isArray;
function Kr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Vn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Iu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(O(91));
  return ue({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function $f(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(O(92));
      if (Ui(n)) {
        if (1 < n.length) throw Error(O(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Vn(n) };
}
function hy(e, t) {
  var n = Vn(t.value),
    r = Vn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Hf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function py(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Lu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? py(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var fo,
  my = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        fo = fo || document.createElement("div"),
          fo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = fo.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function us(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Qi = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  oS = ["Webkit", "ms", "Moz", "O"];
Object.keys(Qi).forEach(function (e) {
  oS.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Qi[t] = Qi[e]);
  });
});
function yy(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Qi.hasOwnProperty(e) && Qi[e])
    ? ("" + t).trim()
    : t + "px";
}
function gy(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = yy(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var aS = ue(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Au(e, t) {
  if (t) {
    if (aS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(O(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(O(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(O(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(O(62));
  }
}
function Nu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Fu = null;
function ad(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Vu = null,
  Wr = null,
  Qr = null;
function Kf(e) {
  if ((e = Qs(e))) {
    if (typeof Vu != "function") throw Error(O(280));
    var t = e.stateNode;
    t && ((t = ba(t)), Vu(e.stateNode, e.type, t));
  }
}
function vy(e) {
  Wr ? (Qr ? Qr.push(e) : (Qr = [e])) : (Wr = e);
}
function Sy() {
  if (Wr) {
    var e = Wr,
      t = Qr;
    if (((Qr = Wr = null), Kf(e), t)) for (e = 0; e < t.length; e++) Kf(t[e]);
  }
}
function wy(e, t) {
  return e(t);
}
function xy() {}
var _l = !1;
function Py(e, t, n) {
  if (_l) return e(t, n);
  _l = !0;
  try {
    return wy(e, t, n);
  } finally {
    (_l = !1), (Wr !== null || Qr !== null) && (xy(), Sy());
  }
}
function cs(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ba(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(O(231, t, typeof n));
  return n;
}
var bu = !1;
if (tn)
  try {
    var ji = {};
    Object.defineProperty(ji, "passive", {
      get: function () {
        bu = !0;
      },
    }),
      window.addEventListener("test", ji, ji),
      window.removeEventListener("test", ji, ji);
  } catch {
    bu = !1;
  }
function lS(e, t, n, r, i, s, o, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var Gi = !1,
  Xo = null,
  Jo = !1,
  Bu = null,
  uS = {
    onError: function (e) {
      (Gi = !0), (Xo = e);
    },
  };
function cS(e, t, n, r, i, s, o, a, l) {
  (Gi = !1), (Xo = null), lS.apply(uS, arguments);
}
function dS(e, t, n, r, i, s, o, a, l) {
  if ((cS.apply(this, arguments), Gi)) {
    if (Gi) {
      var u = Xo;
      (Gi = !1), (Xo = null);
    } else throw Error(O(198));
    Jo || ((Jo = !0), (Bu = u));
  }
}
function xr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Cy(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Wf(e) {
  if (xr(e) !== e) throw Error(O(188));
}
function fS(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = xr(e)), t === null)) throw Error(O(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var s = i.alternate;
    if (s === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === s.child) {
      for (s = i.child; s; ) {
        if (s === n) return Wf(i), e;
        if (s === r) return Wf(i), t;
        s = s.sibling;
      }
      throw Error(O(188));
    }
    if (n.return !== r.return) (n = i), (r = s);
    else {
      for (var o = !1, a = i.child; a; ) {
        if (a === n) {
          (o = !0), (n = i), (r = s);
          break;
        }
        if (a === r) {
          (o = !0), (r = i), (n = s);
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = s.child; a; ) {
          if (a === n) {
            (o = !0), (n = s), (r = i);
            break;
          }
          if (a === r) {
            (o = !0), (r = s), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(O(189));
      }
    }
    if (n.alternate !== r) throw Error(O(190));
  }
  if (n.tag !== 3) throw Error(O(188));
  return n.stateNode.current === n ? e : t;
}
function Ey(e) {
  return (e = fS(e)), e !== null ? Ty(e) : null;
}
function Ty(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ty(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ry = Ze.unstable_scheduleCallback,
  Qf = Ze.unstable_cancelCallback,
  hS = Ze.unstable_shouldYield,
  pS = Ze.unstable_requestPaint,
  pe = Ze.unstable_now,
  mS = Ze.unstable_getCurrentPriorityLevel,
  ld = Ze.unstable_ImmediatePriority,
  ky = Ze.unstable_UserBlockingPriority,
  Zo = Ze.unstable_NormalPriority,
  yS = Ze.unstable_LowPriority,
  _y = Ze.unstable_IdlePriority,
  Aa = null,
  At = null;
function gS(e) {
  if (At && typeof At.onCommitFiberRoot == "function")
    try {
      At.onCommitFiberRoot(Aa, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Pt = Math.clz32 ? Math.clz32 : wS,
  vS = Math.log,
  SS = Math.LN2;
function wS(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((vS(e) / SS) | 0)) | 0;
}
var ho = 64,
  po = 4194304;
function $i(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ea(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    s = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~i;
    a !== 0 ? (r = $i(a)) : ((s &= o), s !== 0 && (r = $i(s)));
  } else (o = n & ~i), o !== 0 ? (r = $i(o)) : s !== 0 && (r = $i(s));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (s = t & -t), i >= s || (i === 16 && (s & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Pt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function xS(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function PS(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      s = e.pendingLanes;
    0 < s;

  ) {
    var o = 31 - Pt(s),
      a = 1 << o,
      l = i[o];
    l === -1
      ? (!(a & n) || a & r) && (i[o] = xS(a, t))
      : l <= t && (e.expiredLanes |= a),
      (s &= ~a);
  }
}
function zu(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Oy() {
  var e = ho;
  return (ho <<= 1), !(ho & 4194240) && (ho = 64), e;
}
function Ol(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ks(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Pt(t)),
    (e[t] = n);
}
function CS(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Pt(n),
      s = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~s);
  }
}
function ud(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Pt(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var G = 0;
function Dy(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var My,
  cd,
  jy,
  Iy,
  Ly,
  Uu = !1,
  mo = [],
  kn = null,
  _n = null,
  On = null,
  ds = new Map(),
  fs = new Map(),
  yn = [],
  ES =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Gf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      kn = null;
      break;
    case "dragenter":
    case "dragleave":
      _n = null;
      break;
    case "mouseover":
    case "mouseout":
      On = null;
      break;
    case "pointerover":
    case "pointerout":
      ds.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      fs.delete(t.pointerId);
  }
}
function Ii(e, t, n, r, i, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [i],
      }),
      t !== null && ((t = Qs(t)), t !== null && cd(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function TS(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (kn = Ii(kn, e, t, n, r, i)), !0;
    case "dragenter":
      return (_n = Ii(_n, e, t, n, r, i)), !0;
    case "mouseover":
      return (On = Ii(On, e, t, n, r, i)), !0;
    case "pointerover":
      var s = i.pointerId;
      return ds.set(s, Ii(ds.get(s) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (s = i.pointerId), fs.set(s, Ii(fs.get(s) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Ay(e) {
  var t = er(e.target);
  if (t !== null) {
    var n = xr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Cy(n)), t !== null)) {
          (e.blockedOn = t),
            Ly(e.priority, function () {
              jy(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Io(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = $u(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Fu = r), n.target.dispatchEvent(r), (Fu = null);
    } else return (t = Qs(n)), t !== null && cd(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function qf(e, t, n) {
  Io(e) && n.delete(t);
}
function RS() {
  (Uu = !1),
    kn !== null && Io(kn) && (kn = null),
    _n !== null && Io(_n) && (_n = null),
    On !== null && Io(On) && (On = null),
    ds.forEach(qf),
    fs.forEach(qf);
}
function Li(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Uu ||
      ((Uu = !0),
      Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority, RS)));
}
function hs(e) {
  function t(i) {
    return Li(i, e);
  }
  if (0 < mo.length) {
    Li(mo[0], e);
    for (var n = 1; n < mo.length; n++) {
      var r = mo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    kn !== null && Li(kn, e),
      _n !== null && Li(_n, e),
      On !== null && Li(On, e),
      ds.forEach(t),
      fs.forEach(t),
      n = 0;
    n < yn.length;
    n++
  )
    (r = yn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < yn.length && ((n = yn[0]), n.blockedOn === null); )
    Ay(n), n.blockedOn === null && yn.shift();
}
var Gr = an.ReactCurrentBatchConfig,
  ta = !0;
function kS(e, t, n, r) {
  var i = G,
    s = Gr.transition;
  Gr.transition = null;
  try {
    (G = 1), dd(e, t, n, r);
  } finally {
    (G = i), (Gr.transition = s);
  }
}
function _S(e, t, n, r) {
  var i = G,
    s = Gr.transition;
  Gr.transition = null;
  try {
    (G = 4), dd(e, t, n, r);
  } finally {
    (G = i), (Gr.transition = s);
  }
}
function dd(e, t, n, r) {
  if (ta) {
    var i = $u(e, t, n, r);
    if (i === null) bl(e, t, r, na, n), Gf(e, r);
    else if (TS(i, e, t, n, r)) r.stopPropagation();
    else if ((Gf(e, r), t & 4 && -1 < ES.indexOf(e))) {
      for (; i !== null; ) {
        var s = Qs(i);
        if (
          (s !== null && My(s),
          (s = $u(e, t, n, r)),
          s === null && bl(e, t, r, na, n),
          s === i)
        )
          break;
        i = s;
      }
      i !== null && r.stopPropagation();
    } else bl(e, t, r, null, n);
  }
}
var na = null;
function $u(e, t, n, r) {
  if (((na = null), (e = ad(r)), (e = er(e)), e !== null))
    if (((t = xr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Cy(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (na = e), null;
}
function Ny(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (mS()) {
        case ld:
          return 1;
        case ky:
          return 4;
        case Zo:
        case yS:
          return 16;
        case _y:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var En = null,
  fd = null,
  Lo = null;
function Fy() {
  if (Lo) return Lo;
  var e,
    t = fd,
    n = t.length,
    r,
    i = "value" in En ? En.value : En.textContent,
    s = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[s - r]; r++);
  return (Lo = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Ao(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function yo() {
  return !0;
}
function Yf() {
  return !1;
}
function nt(e) {
  function t(n, r, i, s, o) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = s),
      (this.target = o),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(s) : s[a]));
    return (
      (this.isDefaultPrevented = (
        s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
      )
        ? yo
        : Yf),
      (this.isPropagationStopped = Yf),
      this
    );
  }
  return (
    ue(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = yo));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = yo));
      },
      persist: function () {},
      isPersistent: yo,
    }),
    t
  );
}
var Ei = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  hd = nt(Ei),
  Ws = ue({}, Ei, { view: 0, detail: 0 }),
  OS = nt(Ws),
  Dl,
  Ml,
  Ai,
  Na = ue({}, Ws, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: pd,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Ai &&
            (Ai && e.type === "mousemove"
              ? ((Dl = e.screenX - Ai.screenX), (Ml = e.screenY - Ai.screenY))
              : (Ml = Dl = 0),
            (Ai = e)),
          Dl);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ml;
    },
  }),
  Xf = nt(Na),
  DS = ue({}, Na, { dataTransfer: 0 }),
  MS = nt(DS),
  jS = ue({}, Ws, { relatedTarget: 0 }),
  jl = nt(jS),
  IS = ue({}, Ei, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  LS = nt(IS),
  AS = ue({}, Ei, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  NS = nt(AS),
  FS = ue({}, Ei, { data: 0 }),
  Jf = nt(FS),
  VS = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  bS = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  BS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function zS(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = BS[e]) ? !!t[e] : !1;
}
function pd() {
  return zS;
}
var US = ue({}, Ws, {
    key: function (e) {
      if (e.key) {
        var t = VS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ao(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? bS[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: pd,
    charCode: function (e) {
      return e.type === "keypress" ? Ao(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ao(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  $S = nt(US),
  HS = ue({}, Na, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Zf = nt(HS),
  KS = ue({}, Ws, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: pd,
  }),
  WS = nt(KS),
  QS = ue({}, Ei, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  GS = nt(QS),
  qS = ue({}, Na, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  YS = nt(qS),
  XS = [9, 13, 27, 32],
  md = tn && "CompositionEvent" in window,
  qi = null;
tn && "documentMode" in document && (qi = document.documentMode);
var JS = tn && "TextEvent" in window && !qi,
  Vy = tn && (!md || (qi && 8 < qi && 11 >= qi)),
  eh = " ",
  th = !1;
function by(e, t) {
  switch (e) {
    case "keyup":
      return XS.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function By(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Dr = !1;
function ZS(e, t) {
  switch (e) {
    case "compositionend":
      return By(t);
    case "keypress":
      return t.which !== 32 ? null : ((th = !0), eh);
    case "textInput":
      return (e = t.data), e === eh && th ? null : e;
    default:
      return null;
  }
}
function ew(e, t) {
  if (Dr)
    return e === "compositionend" || (!md && by(e, t))
      ? ((e = Fy()), (Lo = fd = En = null), (Dr = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Vy && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var tw = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function nh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!tw[e.type] : t === "textarea";
}
function zy(e, t, n, r) {
  vy(r),
    (t = ra(t, "onChange")),
    0 < t.length &&
      ((n = new hd("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Yi = null,
  ps = null;
function nw(e) {
  Jy(e, 0);
}
function Fa(e) {
  var t = Ir(e);
  if (dy(t)) return e;
}
function rw(e, t) {
  if (e === "change") return t;
}
var Uy = !1;
if (tn) {
  var Il;
  if (tn) {
    var Ll = "oninput" in document;
    if (!Ll) {
      var rh = document.createElement("div");
      rh.setAttribute("oninput", "return;"),
        (Ll = typeof rh.oninput == "function");
    }
    Il = Ll;
  } else Il = !1;
  Uy = Il && (!document.documentMode || 9 < document.documentMode);
}
function ih() {
  Yi && (Yi.detachEvent("onpropertychange", $y), (ps = Yi = null));
}
function $y(e) {
  if (e.propertyName === "value" && Fa(ps)) {
    var t = [];
    zy(t, ps, e, ad(e)), Py(nw, t);
  }
}
function iw(e, t, n) {
  e === "focusin"
    ? (ih(), (Yi = t), (ps = n), Yi.attachEvent("onpropertychange", $y))
    : e === "focusout" && ih();
}
function sw(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Fa(ps);
}
function ow(e, t) {
  if (e === "click") return Fa(t);
}
function aw(e, t) {
  if (e === "input" || e === "change") return Fa(t);
}
function lw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Tt = typeof Object.is == "function" ? Object.is : lw;
function ms(e, t) {
  if (Tt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Tu.call(t, i) || !Tt(e[i], t[i])) return !1;
  }
  return !0;
}
function sh(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function oh(e, t) {
  var n = sh(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = sh(n);
  }
}
function Hy(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Hy(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Ky() {
  for (var e = window, t = Yo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Yo(e.document);
  }
  return t;
}
function yd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function uw(e) {
  var t = Ky(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Hy(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && yd(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          s = Math.min(r.start, i);
        (r = r.end === void 0 ? s : Math.min(r.end, i)),
          !e.extend && s > r && ((i = r), (r = s), (s = i)),
          (i = oh(n, s));
        var o = oh(n, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          s > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var cw = tn && "documentMode" in document && 11 >= document.documentMode,
  Mr = null,
  Hu = null,
  Xi = null,
  Ku = !1;
function ah(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ku ||
    Mr == null ||
    Mr !== Yo(r) ||
    ((r = Mr),
    "selectionStart" in r && yd(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Xi && ms(Xi, r)) ||
      ((Xi = r),
      (r = ra(Hu, "onSelect")),
      0 < r.length &&
        ((t = new hd("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Mr))));
}
function go(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var jr = {
    animationend: go("Animation", "AnimationEnd"),
    animationiteration: go("Animation", "AnimationIteration"),
    animationstart: go("Animation", "AnimationStart"),
    transitionend: go("Transition", "TransitionEnd"),
  },
  Al = {},
  Wy = {};
tn &&
  ((Wy = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete jr.animationend.animation,
    delete jr.animationiteration.animation,
    delete jr.animationstart.animation),
  "TransitionEvent" in window || delete jr.transitionend.transition);
function Va(e) {
  if (Al[e]) return Al[e];
  if (!jr[e]) return e;
  var t = jr[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Wy) return (Al[e] = t[n]);
  return e;
}
var Qy = Va("animationend"),
  Gy = Va("animationiteration"),
  qy = Va("animationstart"),
  Yy = Va("transitionend"),
  Xy = new Map(),
  lh =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function $n(e, t) {
  Xy.set(e, t), wr(t, [e]);
}
for (var Nl = 0; Nl < lh.length; Nl++) {
  var Fl = lh[Nl],
    dw = Fl.toLowerCase(),
    fw = Fl[0].toUpperCase() + Fl.slice(1);
  $n(dw, "on" + fw);
}
$n(Qy, "onAnimationEnd");
$n(Gy, "onAnimationIteration");
$n(qy, "onAnimationStart");
$n("dblclick", "onDoubleClick");
$n("focusin", "onFocus");
$n("focusout", "onBlur");
$n(Yy, "onTransitionEnd");
ci("onMouseEnter", ["mouseout", "mouseover"]);
ci("onMouseLeave", ["mouseout", "mouseover"]);
ci("onPointerEnter", ["pointerout", "pointerover"]);
ci("onPointerLeave", ["pointerout", "pointerover"]);
wr(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
wr(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
wr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
wr(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
wr(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
wr(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Hi =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  hw = new Set("cancel close invalid load scroll toggle".split(" ").concat(Hi));
function uh(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), dS(r, t, void 0, e), (e.currentTarget = null);
}
function Jy(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            l = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), l !== s && i.isPropagationStopped())) break e;
          uh(i, a, u), (s = l);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (l = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            l !== s && i.isPropagationStopped())
          )
            break e;
          uh(i, a, u), (s = l);
        }
    }
  }
  if (Jo) throw ((e = Bu), (Jo = !1), (Bu = null), e);
}
function ee(e, t) {
  var n = t[Yu];
  n === void 0 && (n = t[Yu] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Zy(t, e, 2, !1), n.add(r));
}
function Vl(e, t, n) {
  var r = 0;
  t && (r |= 4), Zy(n, e, r, t);
}
var vo = "_reactListening" + Math.random().toString(36).slice(2);
function ys(e) {
  if (!e[vo]) {
    (e[vo] = !0),
      oy.forEach(function (n) {
        n !== "selectionchange" && (hw.has(n) || Vl(n, !1, e), Vl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[vo] || ((t[vo] = !0), Vl("selectionchange", !1, t));
  }
}
function Zy(e, t, n, r) {
  switch (Ny(t)) {
    case 1:
      var i = kS;
      break;
    case 4:
      i = _S;
      break;
    default:
      i = dd;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !bu ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function bl(e, t, n, r, i) {
  var s = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var l = o.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = o.stateNode.containerInfo),
              l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; a !== null; ) {
          if (((o = er(a)), o === null)) return;
          if (((l = o.tag), l === 5 || l === 6)) {
            r = s = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Py(function () {
    var u = s,
      c = ad(n),
      d = [];
    e: {
      var f = Xy.get(e);
      if (f !== void 0) {
        var g = hd,
          m = e;
        switch (e) {
          case "keypress":
            if (Ao(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = $S;
            break;
          case "focusin":
            (m = "focus"), (g = jl);
            break;
          case "focusout":
            (m = "blur"), (g = jl);
            break;
          case "beforeblur":
          case "afterblur":
            g = jl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Xf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = MS;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = WS;
            break;
          case Qy:
          case Gy:
          case qy:
            g = LS;
            break;
          case Yy:
            g = GS;
            break;
          case "scroll":
            g = OS;
            break;
          case "wheel":
            g = YS;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = NS;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Zf;
        }
        var y = (t & 4) !== 0,
          w = !y && e === "scroll",
          p = y ? (f !== null ? f + "Capture" : null) : f;
        y = [];
        for (var h = u, v; h !== null; ) {
          v = h;
          var x = v.stateNode;
          if (
            (v.tag === 5 &&
              x !== null &&
              ((v = x),
              p !== null && ((x = cs(h, p)), x != null && y.push(gs(h, x, v)))),
            w)
          )
            break;
          h = h.return;
        }
        0 < y.length &&
          ((f = new g(f, m, null, n, c)), d.push({ event: f, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          f &&
            n !== Fu &&
            (m = n.relatedTarget || n.fromElement) &&
            (er(m) || m[nn]))
        )
          break e;
        if (
          (g || f) &&
          ((f =
            c.window === c
              ? c
              : (f = c.ownerDocument)
              ? f.defaultView || f.parentWindow
              : window),
          g
            ? ((m = n.relatedTarget || n.toElement),
              (g = u),
              (m = m ? er(m) : null),
              m !== null &&
                ((w = xr(m)), m !== w || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((g = null), (m = u)),
          g !== m)
        ) {
          if (
            ((y = Xf),
            (x = "onMouseLeave"),
            (p = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = Zf),
              (x = "onPointerLeave"),
              (p = "onPointerEnter"),
              (h = "pointer")),
            (w = g == null ? f : Ir(g)),
            (v = m == null ? f : Ir(m)),
            (f = new y(x, h + "leave", g, n, c)),
            (f.target = w),
            (f.relatedTarget = v),
            (x = null),
            er(c) === u &&
              ((y = new y(p, h + "enter", m, n, c)),
              (y.target = v),
              (y.relatedTarget = w),
              (x = y)),
            (w = x),
            g && m)
          )
            t: {
              for (y = g, p = m, h = 0, v = y; v; v = kr(v)) h++;
              for (v = 0, x = p; x; x = kr(x)) v++;
              for (; 0 < h - v; ) (y = kr(y)), h--;
              for (; 0 < v - h; ) (p = kr(p)), v--;
              for (; h--; ) {
                if (y === p || (p !== null && y === p.alternate)) break t;
                (y = kr(y)), (p = kr(p));
              }
              y = null;
            }
          else y = null;
          g !== null && ch(d, f, g, y, !1),
            m !== null && w !== null && ch(d, w, m, y, !0);
        }
      }
      e: {
        if (
          ((f = u ? Ir(u) : window),
          (g = f.nodeName && f.nodeName.toLowerCase()),
          g === "select" || (g === "input" && f.type === "file"))
        )
          var E = rw;
        else if (nh(f))
          if (Uy) E = aw;
          else {
            E = sw;
            var k = iw;
          }
        else
          (g = f.nodeName) &&
            g.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (E = ow);
        if (E && (E = E(e, u))) {
          zy(d, E, n, c);
          break e;
        }
        k && k(e, f, u),
          e === "focusout" &&
            (k = f._wrapperState) &&
            k.controlled &&
            f.type === "number" &&
            ju(f, "number", f.value);
      }
      switch (((k = u ? Ir(u) : window), e)) {
        case "focusin":
          (nh(k) || k.contentEditable === "true") &&
            ((Mr = k), (Hu = u), (Xi = null));
          break;
        case "focusout":
          Xi = Hu = Mr = null;
          break;
        case "mousedown":
          Ku = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Ku = !1), ah(d, n, c);
          break;
        case "selectionchange":
          if (cw) break;
        case "keydown":
        case "keyup":
          ah(d, n, c);
      }
      var _;
      if (md)
        e: {
          switch (e) {
            case "compositionstart":
              var C = "onCompositionStart";
              break e;
            case "compositionend":
              C = "onCompositionEnd";
              break e;
            case "compositionupdate":
              C = "onCompositionUpdate";
              break e;
          }
          C = void 0;
        }
      else
        Dr
          ? by(e, n) && (C = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C &&
        (Vy &&
          n.locale !== "ko" &&
          (Dr || C !== "onCompositionStart"
            ? C === "onCompositionEnd" && Dr && (_ = Fy())
            : ((En = c),
              (fd = "value" in En ? En.value : En.textContent),
              (Dr = !0))),
        (k = ra(u, C)),
        0 < k.length &&
          ((C = new Jf(C, e, null, n, c)),
          d.push({ event: C, listeners: k }),
          _ ? (C.data = _) : ((_ = By(n)), _ !== null && (C.data = _)))),
        (_ = JS ? ZS(e, n) : ew(e, n)) &&
          ((u = ra(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new Jf("onBeforeInput", "beforeinput", null, n, c)),
            d.push({ event: c, listeners: u }),
            (c.data = _)));
    }
    Jy(d, t);
  });
}
function gs(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ra(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      s = i.stateNode;
    i.tag === 5 &&
      s !== null &&
      ((i = s),
      (s = cs(e, n)),
      s != null && r.unshift(gs(e, s, i)),
      (s = cs(e, t)),
      s != null && r.push(gs(e, s, i))),
      (e = e.return);
  }
  return r;
}
function kr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ch(e, t, n, r, i) {
  for (var s = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      u = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      i
        ? ((l = cs(n, s)), l != null && o.unshift(gs(n, l, a)))
        : i || ((l = cs(n, s)), l != null && o.push(gs(n, l, a)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var pw = /\r\n?/g,
  mw = /\u0000|\uFFFD/g;
function dh(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      pw,
      `
`
    )
    .replace(mw, "");
}
function So(e, t, n) {
  if (((t = dh(t)), dh(e) !== t && n)) throw Error(O(425));
}
function ia() {}
var Wu = null,
  Qu = null;
function Gu(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var qu = typeof setTimeout == "function" ? setTimeout : void 0,
  yw = typeof clearTimeout == "function" ? clearTimeout : void 0,
  fh = typeof Promise == "function" ? Promise : void 0,
  gw =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof fh < "u"
      ? function (e) {
          return fh.resolve(null).then(e).catch(vw);
        }
      : qu;
function vw(e) {
  setTimeout(function () {
    throw e;
  });
}
function Bl(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), hs(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  hs(t);
}
function Dn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function hh(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ti = Math.random().toString(36).slice(2),
  It = "__reactFiber$" + Ti,
  vs = "__reactProps$" + Ti,
  nn = "__reactContainer$" + Ti,
  Yu = "__reactEvents$" + Ti,
  Sw = "__reactListeners$" + Ti,
  ww = "__reactHandles$" + Ti;
function er(e) {
  var t = e[It];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[nn] || n[It])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = hh(e); e !== null; ) {
          if ((n = e[It])) return n;
          e = hh(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Qs(e) {
  return (
    (e = e[It] || e[nn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Ir(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(O(33));
}
function ba(e) {
  return e[vs] || null;
}
var Xu = [],
  Lr = -1;
function Hn(e) {
  return { current: e };
}
function te(e) {
  0 > Lr || ((e.current = Xu[Lr]), (Xu[Lr] = null), Lr--);
}
function J(e, t) {
  Lr++, (Xu[Lr] = e.current), (e.current = t);
}
var bn = {},
  Le = Hn(bn),
  We = Hn(!1),
  mr = bn;
function di(e, t) {
  var n = e.type.contextTypes;
  if (!n) return bn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    s;
  for (s in n) i[s] = t[s];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Qe(e) {
  return (e = e.childContextTypes), e != null;
}
function sa() {
  te(We), te(Le);
}
function ph(e, t, n) {
  if (Le.current !== bn) throw Error(O(168));
  J(Le, t), J(We, n);
}
function eg(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(O(108, iS(e) || "Unknown", i));
  return ue({}, n, r);
}
function oa(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || bn),
    (mr = Le.current),
    J(Le, e),
    J(We, We.current),
    !0
  );
}
function mh(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(O(169));
  n
    ? ((e = eg(e, t, mr)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      te(We),
      te(Le),
      J(Le, e))
    : te(We),
    J(We, n);
}
var Kt = null,
  Ba = !1,
  zl = !1;
function tg(e) {
  Kt === null ? (Kt = [e]) : Kt.push(e);
}
function xw(e) {
  (Ba = !0), tg(e);
}
function Kn() {
  if (!zl && Kt !== null) {
    zl = !0;
    var e = 0,
      t = G;
    try {
      var n = Kt;
      for (G = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Kt = null), (Ba = !1);
    } catch (i) {
      throw (Kt !== null && (Kt = Kt.slice(e + 1)), Ry(ld, Kn), i);
    } finally {
      (G = t), (zl = !1);
    }
  }
  return null;
}
var Ar = [],
  Nr = 0,
  aa = null,
  la = 0,
  ut = [],
  ct = 0,
  yr = null,
  Qt = 1,
  Gt = "";
function qn(e, t) {
  (Ar[Nr++] = la), (Ar[Nr++] = aa), (aa = e), (la = t);
}
function ng(e, t, n) {
  (ut[ct++] = Qt), (ut[ct++] = Gt), (ut[ct++] = yr), (yr = e);
  var r = Qt;
  e = Gt;
  var i = 32 - Pt(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var s = 32 - Pt(t) + i;
  if (30 < s) {
    var o = i - (i % 5);
    (s = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (Qt = (1 << (32 - Pt(t) + i)) | (n << i) | r),
      (Gt = s + e);
  } else (Qt = (1 << s) | (n << i) | r), (Gt = e);
}
function gd(e) {
  e.return !== null && (qn(e, 1), ng(e, 1, 0));
}
function vd(e) {
  for (; e === aa; )
    (aa = Ar[--Nr]), (Ar[Nr] = null), (la = Ar[--Nr]), (Ar[Nr] = null);
  for (; e === yr; )
    (yr = ut[--ct]),
      (ut[ct] = null),
      (Gt = ut[--ct]),
      (ut[ct] = null),
      (Qt = ut[--ct]),
      (ut[ct] = null);
}
var Je = null,
  Xe = null,
  ne = !1,
  xt = null;
function rg(e, t) {
  var n = dt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function yh(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Je = e), (Xe = Dn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Je = e), (Xe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = yr !== null ? { id: Qt, overflow: Gt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = dt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Je = e),
            (Xe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ju(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Zu(e) {
  if (ne) {
    var t = Xe;
    if (t) {
      var n = t;
      if (!yh(e, t)) {
        if (Ju(e)) throw Error(O(418));
        t = Dn(n.nextSibling);
        var r = Je;
        t && yh(e, t)
          ? rg(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ne = !1), (Je = e));
      }
    } else {
      if (Ju(e)) throw Error(O(418));
      (e.flags = (e.flags & -4097) | 2), (ne = !1), (Je = e);
    }
  }
}
function gh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Je = e;
}
function wo(e) {
  if (e !== Je) return !1;
  if (!ne) return gh(e), (ne = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Gu(e.type, e.memoizedProps))),
    t && (t = Xe))
  ) {
    if (Ju(e)) throw (ig(), Error(O(418)));
    for (; t; ) rg(e, t), (t = Dn(t.nextSibling));
  }
  if ((gh(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(O(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Xe = Dn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Xe = null;
    }
  } else Xe = Je ? Dn(e.stateNode.nextSibling) : null;
  return !0;
}
function ig() {
  for (var e = Xe; e; ) e = Dn(e.nextSibling);
}
function fi() {
  (Xe = Je = null), (ne = !1);
}
function Sd(e) {
  xt === null ? (xt = [e]) : xt.push(e);
}
var Pw = an.ReactCurrentBatchConfig;
function vt(e, t) {
  if (e && e.defaultProps) {
    (t = ue({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var ua = Hn(null),
  ca = null,
  Fr = null,
  wd = null;
function xd() {
  wd = Fr = ca = null;
}
function Pd(e) {
  var t = ua.current;
  te(ua), (e._currentValue = t);
}
function ec(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function qr(e, t) {
  (ca = e),
    (wd = Fr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ke = !0), (e.firstContext = null));
}
function mt(e) {
  var t = e._currentValue;
  if (wd !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Fr === null)) {
      if (ca === null) throw Error(O(308));
      (Fr = e), (ca.dependencies = { lanes: 0, firstContext: e });
    } else Fr = Fr.next = e;
  return t;
}
var tr = null;
function Cd(e) {
  tr === null ? (tr = [e]) : tr.push(e);
}
function sg(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Cd(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    rn(e, r)
  );
}
function rn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var pn = !1;
function Ed(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function og(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Yt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Mn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), H & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      rn(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Cd(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    rn(e, n)
  );
}
function No(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ud(e, n);
  }
}
function vh(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      s = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        s === null ? (i = s = o) : (s = s.next = o), (n = n.next);
      } while (n !== null);
      s === null ? (i = s = t) : (s = s.next = t);
    } else i = s = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: s,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function da(e, t, n, r) {
  var i = e.updateQueue;
  pn = !1;
  var s = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var l = a,
      u = l.next;
    (l.next = null), o === null ? (s = u) : (o.next = u), (o = l);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== o &&
        (a === null ? (c.firstBaseUpdate = u) : (a.next = u),
        (c.lastBaseUpdate = l)));
  }
  if (s !== null) {
    var d = i.baseState;
    (o = 0), (c = u = l = null), (a = s);
    do {
      var f = a.lane,
        g = a.eventTime;
      if ((r & f) === f) {
        c !== null &&
          (c = c.next =
            {
              eventTime: g,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var m = e,
            y = a;
          switch (((f = t), (g = n), y.tag)) {
            case 1:
              if (((m = y.payload), typeof m == "function")) {
                d = m.call(g, d, f);
                break e;
              }
              d = m;
              break e;
            case 3:
              m.flags = (m.flags & -65537) | 128;
            case 0:
              if (
                ((m = y.payload),
                (f = typeof m == "function" ? m.call(g, d, f) : m),
                f == null)
              )
                break e;
              d = ue({}, d, f);
              break e;
            case 2:
              pn = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (f = i.effects),
          f === null ? (i.effects = [a]) : f.push(a));
      } else
        (g = {
          eventTime: g,
          lane: f,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((u = c = g), (l = d)) : (c = c.next = g),
          (o |= f);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (f = a),
          (a = f.next),
          (f.next = null),
          (i.lastBaseUpdate = f),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (l = d),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (o |= i.lane), (i = i.next);
      while (i !== t);
    } else s === null && (i.shared.lanes = 0);
    (vr |= o), (e.lanes = o), (e.memoizedState = d);
  }
}
function Sh(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(O(191, i));
        i.call(r);
      }
    }
}
var ag = new sy.Component().refs;
function tc(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ue({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var za = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? xr(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = be(),
      i = In(e),
      s = Yt(r, i);
    (s.payload = t),
      n != null && (s.callback = n),
      (t = Mn(e, s, i)),
      t !== null && (Ct(t, e, i, r), No(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = be(),
      i = In(e),
      s = Yt(r, i);
    (s.tag = 1),
      (s.payload = t),
      n != null && (s.callback = n),
      (t = Mn(e, s, i)),
      t !== null && (Ct(t, e, i, r), No(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = be(),
      r = In(e),
      i = Yt(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = Mn(e, i, r)),
      t !== null && (Ct(t, e, r, n), No(t, e, r));
  },
};
function wh(e, t, n, r, i, s, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, s, o)
      : t.prototype && t.prototype.isPureReactComponent
      ? !ms(n, r) || !ms(i, s)
      : !0
  );
}
function lg(e, t, n) {
  var r = !1,
    i = bn,
    s = t.contextType;
  return (
    typeof s == "object" && s !== null
      ? (s = mt(s))
      : ((i = Qe(t) ? mr : Le.current),
        (r = t.contextTypes),
        (s = (r = r != null) ? di(e, i) : bn)),
    (t = new t(n, s)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = za),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    t
  );
}
function xh(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && za.enqueueReplaceState(t, t.state, null);
}
function nc(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = ag), Ed(e);
  var s = t.contextType;
  typeof s == "object" && s !== null
    ? (i.context = mt(s))
    : ((s = Qe(t) ? mr : Le.current), (i.context = di(e, s))),
    (i.state = e.memoizedState),
    (s = t.getDerivedStateFromProps),
    typeof s == "function" && (tc(e, t, s, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && za.enqueueReplaceState(i, i.state, null),
      da(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ni(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(O(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(O(147, e));
      var i = r,
        s = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === s
        ? t.ref
        : ((t = function (o) {
            var a = i.refs;
            a === ag && (a = i.refs = {}),
              o === null ? delete a[s] : (a[s] = o);
          }),
          (t._stringRef = s),
          t);
    }
    if (typeof e != "string") throw Error(O(284));
    if (!n._owner) throw Error(O(290, e));
  }
  return e;
}
function xo(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      O(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ph(e) {
  var t = e._init;
  return t(e._payload);
}
function ug(e) {
  function t(p, h) {
    if (e) {
      var v = p.deletions;
      v === null ? ((p.deletions = [h]), (p.flags |= 16)) : v.push(h);
    }
  }
  function n(p, h) {
    if (!e) return null;
    for (; h !== null; ) t(p, h), (h = h.sibling);
    return null;
  }
  function r(p, h) {
    for (p = new Map(); h !== null; )
      h.key !== null ? p.set(h.key, h) : p.set(h.index, h), (h = h.sibling);
    return p;
  }
  function i(p, h) {
    return (p = Ln(p, h)), (p.index = 0), (p.sibling = null), p;
  }
  function s(p, h, v) {
    return (
      (p.index = v),
      e
        ? ((v = p.alternate),
          v !== null
            ? ((v = v.index), v < h ? ((p.flags |= 2), h) : v)
            : ((p.flags |= 2), h))
        : ((p.flags |= 1048576), h)
    );
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, h, v, x) {
    return h === null || h.tag !== 6
      ? ((h = Gl(v, p.mode, x)), (h.return = p), h)
      : ((h = i(h, v)), (h.return = p), h);
  }
  function l(p, h, v, x) {
    var E = v.type;
    return E === Or
      ? c(p, h, v.props.children, x, v.key)
      : h !== null &&
        (h.elementType === E ||
          (typeof E == "object" &&
            E !== null &&
            E.$$typeof === hn &&
            Ph(E) === h.type))
      ? ((x = i(h, v.props)), (x.ref = Ni(p, h, v)), (x.return = p), x)
      : ((x = Uo(v.type, v.key, v.props, null, p.mode, x)),
        (x.ref = Ni(p, h, v)),
        (x.return = p),
        x);
  }
  function u(p, h, v, x) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== v.containerInfo ||
      h.stateNode.implementation !== v.implementation
      ? ((h = ql(v, p.mode, x)), (h.return = p), h)
      : ((h = i(h, v.children || [])), (h.return = p), h);
  }
  function c(p, h, v, x, E) {
    return h === null || h.tag !== 7
      ? ((h = hr(v, p.mode, x, E)), (h.return = p), h)
      : ((h = i(h, v)), (h.return = p), h);
  }
  function d(p, h, v) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = Gl("" + h, p.mode, v)), (h.return = p), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case uo:
          return (
            (v = Uo(h.type, h.key, h.props, null, p.mode, v)),
            (v.ref = Ni(p, null, h)),
            (v.return = p),
            v
          );
        case _r:
          return (h = ql(h, p.mode, v)), (h.return = p), h;
        case hn:
          var x = h._init;
          return d(p, x(h._payload), v);
      }
      if (Ui(h) || Mi(h))
        return (h = hr(h, p.mode, v, null)), (h.return = p), h;
      xo(p, h);
    }
    return null;
  }
  function f(p, h, v, x) {
    var E = h !== null ? h.key : null;
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return E !== null ? null : a(p, h, "" + v, x);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case uo:
          return v.key === E ? l(p, h, v, x) : null;
        case _r:
          return v.key === E ? u(p, h, v, x) : null;
        case hn:
          return (E = v._init), f(p, h, E(v._payload), x);
      }
      if (Ui(v) || Mi(v)) return E !== null ? null : c(p, h, v, x, null);
      xo(p, v);
    }
    return null;
  }
  function g(p, h, v, x, E) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return (p = p.get(v) || null), a(h, p, "" + x, E);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case uo:
          return (p = p.get(x.key === null ? v : x.key) || null), l(h, p, x, E);
        case _r:
          return (p = p.get(x.key === null ? v : x.key) || null), u(h, p, x, E);
        case hn:
          var k = x._init;
          return g(p, h, v, k(x._payload), E);
      }
      if (Ui(x) || Mi(x)) return (p = p.get(v) || null), c(h, p, x, E, null);
      xo(h, x);
    }
    return null;
  }
  function m(p, h, v, x) {
    for (
      var E = null, k = null, _ = h, C = (h = 0), M = null;
      _ !== null && C < v.length;
      C++
    ) {
      _.index > C ? ((M = _), (_ = null)) : (M = _.sibling);
      var I = f(p, _, v[C], x);
      if (I === null) {
        _ === null && (_ = M);
        break;
      }
      e && _ && I.alternate === null && t(p, _),
        (h = s(I, h, C)),
        k === null ? (E = I) : (k.sibling = I),
        (k = I),
        (_ = M);
    }
    if (C === v.length) return n(p, _), ne && qn(p, C), E;
    if (_ === null) {
      for (; C < v.length; C++)
        (_ = d(p, v[C], x)),
          _ !== null &&
            ((h = s(_, h, C)), k === null ? (E = _) : (k.sibling = _), (k = _));
      return ne && qn(p, C), E;
    }
    for (_ = r(p, _); C < v.length; C++)
      (M = g(_, p, C, v[C], x)),
        M !== null &&
          (e && M.alternate !== null && _.delete(M.key === null ? C : M.key),
          (h = s(M, h, C)),
          k === null ? (E = M) : (k.sibling = M),
          (k = M));
    return (
      e &&
        _.forEach(function (K) {
          return t(p, K);
        }),
      ne && qn(p, C),
      E
    );
  }
  function y(p, h, v, x) {
    var E = Mi(v);
    if (typeof E != "function") throw Error(O(150));
    if (((v = E.call(v)), v == null)) throw Error(O(151));
    for (
      var k = (E = null), _ = h, C = (h = 0), M = null, I = v.next();
      _ !== null && !I.done;
      C++, I = v.next()
    ) {
      _.index > C ? ((M = _), (_ = null)) : (M = _.sibling);
      var K = f(p, _, I.value, x);
      if (K === null) {
        _ === null && (_ = M);
        break;
      }
      e && _ && K.alternate === null && t(p, _),
        (h = s(K, h, C)),
        k === null ? (E = K) : (k.sibling = K),
        (k = K),
        (_ = M);
    }
    if (I.done) return n(p, _), ne && qn(p, C), E;
    if (_ === null) {
      for (; !I.done; C++, I = v.next())
        (I = d(p, I.value, x)),
          I !== null &&
            ((h = s(I, h, C)), k === null ? (E = I) : (k.sibling = I), (k = I));
      return ne && qn(p, C), E;
    }
    for (_ = r(p, _); !I.done; C++, I = v.next())
      (I = g(_, p, C, I.value, x)),
        I !== null &&
          (e && I.alternate !== null && _.delete(I.key === null ? C : I.key),
          (h = s(I, h, C)),
          k === null ? (E = I) : (k.sibling = I),
          (k = I));
    return (
      e &&
        _.forEach(function (W) {
          return t(p, W);
        }),
      ne && qn(p, C),
      E
    );
  }
  function w(p, h, v, x) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === Or &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case uo:
          e: {
            for (var E = v.key, k = h; k !== null; ) {
              if (k.key === E) {
                if (((E = v.type), E === Or)) {
                  if (k.tag === 7) {
                    n(p, k.sibling),
                      (h = i(k, v.props.children)),
                      (h.return = p),
                      (p = h);
                    break e;
                  }
                } else if (
                  k.elementType === E ||
                  (typeof E == "object" &&
                    E !== null &&
                    E.$$typeof === hn &&
                    Ph(E) === k.type)
                ) {
                  n(p, k.sibling),
                    (h = i(k, v.props)),
                    (h.ref = Ni(p, k, v)),
                    (h.return = p),
                    (p = h);
                  break e;
                }
                n(p, k);
                break;
              } else t(p, k);
              k = k.sibling;
            }
            v.type === Or
              ? ((h = hr(v.props.children, p.mode, x, v.key)),
                (h.return = p),
                (p = h))
              : ((x = Uo(v.type, v.key, v.props, null, p.mode, x)),
                (x.ref = Ni(p, h, v)),
                (x.return = p),
                (p = x));
          }
          return o(p);
        case _r:
          e: {
            for (k = v.key; h !== null; ) {
              if (h.key === k)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === v.containerInfo &&
                  h.stateNode.implementation === v.implementation
                ) {
                  n(p, h.sibling),
                    (h = i(h, v.children || [])),
                    (h.return = p),
                    (p = h);
                  break e;
                } else {
                  n(p, h);
                  break;
                }
              else t(p, h);
              h = h.sibling;
            }
            (h = ql(v, p.mode, x)), (h.return = p), (p = h);
          }
          return o(p);
        case hn:
          return (k = v._init), w(p, h, k(v._payload), x);
      }
      if (Ui(v)) return m(p, h, v, x);
      if (Mi(v)) return y(p, h, v, x);
      xo(p, v);
    }
    return (typeof v == "string" && v !== "") || typeof v == "number"
      ? ((v = "" + v),
        h !== null && h.tag === 6
          ? (n(p, h.sibling), (h = i(h, v)), (h.return = p), (p = h))
          : (n(p, h), (h = Gl(v, p.mode, x)), (h.return = p), (p = h)),
        o(p))
      : n(p, h);
  }
  return w;
}
var hi = ug(!0),
  cg = ug(!1),
  Gs = {},
  Nt = Hn(Gs),
  Ss = Hn(Gs),
  ws = Hn(Gs);
function nr(e) {
  if (e === Gs) throw Error(O(174));
  return e;
}
function Td(e, t) {
  switch ((J(ws, t), J(Ss, e), J(Nt, Gs), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Lu(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Lu(t, e));
  }
  te(Nt), J(Nt, t);
}
function pi() {
  te(Nt), te(Ss), te(ws);
}
function dg(e) {
  nr(ws.current);
  var t = nr(Nt.current),
    n = Lu(t, e.type);
  t !== n && (J(Ss, e), J(Nt, n));
}
function Rd(e) {
  Ss.current === e && (te(Nt), te(Ss));
}
var ae = Hn(0);
function fa(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Ul = [];
function kd() {
  for (var e = 0; e < Ul.length; e++)
    Ul[e]._workInProgressVersionPrimary = null;
  Ul.length = 0;
}
var Fo = an.ReactCurrentDispatcher,
  $l = an.ReactCurrentBatchConfig,
  gr = 0,
  le = null,
  ge = null,
  Se = null,
  ha = !1,
  Ji = !1,
  xs = 0,
  Cw = 0;
function _e() {
  throw Error(O(321));
}
function _d(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Tt(e[n], t[n])) return !1;
  return !0;
}
function Od(e, t, n, r, i, s) {
  if (
    ((gr = s),
    (le = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Fo.current = e === null || e.memoizedState === null ? kw : _w),
    (e = n(r, i)),
    Ji)
  ) {
    s = 0;
    do {
      if (((Ji = !1), (xs = 0), 25 <= s)) throw Error(O(301));
      (s += 1),
        (Se = ge = null),
        (t.updateQueue = null),
        (Fo.current = Ow),
        (e = n(r, i));
    } while (Ji);
  }
  if (
    ((Fo.current = pa),
    (t = ge !== null && ge.next !== null),
    (gr = 0),
    (Se = ge = le = null),
    (ha = !1),
    t)
  )
    throw Error(O(300));
  return e;
}
function Dd() {
  var e = xs !== 0;
  return (xs = 0), e;
}
function _t() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Se === null ? (le.memoizedState = Se = e) : (Se = Se.next = e), Se;
}
function yt() {
  if (ge === null) {
    var e = le.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ge.next;
  var t = Se === null ? le.memoizedState : Se.next;
  if (t !== null) (Se = t), (ge = e);
  else {
    if (e === null) throw Error(O(310));
    (ge = e),
      (e = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null,
      }),
      Se === null ? (le.memoizedState = Se = e) : (Se = Se.next = e);
  }
  return Se;
}
function Ps(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Hl(e) {
  var t = yt(),
    n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var r = ge,
    i = r.baseQueue,
    s = n.pending;
  if (s !== null) {
    if (i !== null) {
      var o = i.next;
      (i.next = s.next), (s.next = o);
    }
    (r.baseQueue = i = s), (n.pending = null);
  }
  if (i !== null) {
    (s = i.next), (r = r.baseState);
    var a = (o = null),
      l = null,
      u = s;
    do {
      var c = u.lane;
      if ((gr & c) === c)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        l === null ? ((a = l = d), (o = r)) : (l = l.next = d),
          (le.lanes |= c),
          (vr |= c);
      }
      u = u.next;
    } while (u !== null && u !== s);
    l === null ? (o = r) : (l.next = a),
      Tt(r, t.memoizedState) || (Ke = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (s = i.lane), (le.lanes |= s), (vr |= s), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Kl(e) {
  var t = yt(),
    n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    s = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = (i = i.next);
    do (s = e(s, o.action)), (o = o.next);
    while (o !== i);
    Tt(s, t.memoizedState) || (Ke = !0),
      (t.memoizedState = s),
      t.baseQueue === null && (t.baseState = s),
      (n.lastRenderedState = s);
  }
  return [s, r];
}
function fg() {}
function hg(e, t) {
  var n = le,
    r = yt(),
    i = t(),
    s = !Tt(r.memoizedState, i);
  if (
    (s && ((r.memoizedState = i), (Ke = !0)),
    (r = r.queue),
    Md(yg.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || (Se !== null && Se.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Cs(9, mg.bind(null, n, r, i, t), void 0, null),
      we === null)
    )
      throw Error(O(349));
    gr & 30 || pg(n, t, i);
  }
  return i;
}
function pg(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = le.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (le.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function mg(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), gg(t) && vg(e);
}
function yg(e, t, n) {
  return n(function () {
    gg(t) && vg(e);
  });
}
function gg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Tt(e, n);
  } catch {
    return !0;
  }
}
function vg(e) {
  var t = rn(e, 1);
  t !== null && Ct(t, e, 1, -1);
}
function Ch(e) {
  var t = _t();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ps,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Rw.bind(null, le, e)),
    [t.memoizedState, e]
  );
}
function Cs(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = le.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (le.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Sg() {
  return yt().memoizedState;
}
function Vo(e, t, n, r) {
  var i = _t();
  (le.flags |= e),
    (i.memoizedState = Cs(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ua(e, t, n, r) {
  var i = yt();
  r = r === void 0 ? null : r;
  var s = void 0;
  if (ge !== null) {
    var o = ge.memoizedState;
    if (((s = o.destroy), r !== null && _d(r, o.deps))) {
      i.memoizedState = Cs(t, n, s, r);
      return;
    }
  }
  (le.flags |= e), (i.memoizedState = Cs(1 | t, n, s, r));
}
function Eh(e, t) {
  return Vo(8390656, 8, e, t);
}
function Md(e, t) {
  return Ua(2048, 8, e, t);
}
function wg(e, t) {
  return Ua(4, 2, e, t);
}
function xg(e, t) {
  return Ua(4, 4, e, t);
}
function Pg(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Cg(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Ua(4, 4, Pg.bind(null, t, e), n)
  );
}
function jd() {}
function Eg(e, t) {
  var n = yt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _d(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Tg(e, t) {
  var n = yt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _d(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Rg(e, t, n) {
  return gr & 21
    ? (Tt(n, t) || ((n = Oy()), (le.lanes |= n), (vr |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ke = !0)), (e.memoizedState = n));
}
function Ew(e, t) {
  var n = G;
  (G = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = $l.transition;
  $l.transition = {};
  try {
    e(!1), t();
  } finally {
    (G = n), ($l.transition = r);
  }
}
function kg() {
  return yt().memoizedState;
}
function Tw(e, t, n) {
  var r = In(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    _g(e))
  )
    Og(t, n);
  else if (((n = sg(e, t, n, r)), n !== null)) {
    var i = be();
    Ct(n, e, r, i), Dg(n, t, r);
  }
}
function Rw(e, t, n) {
  var r = In(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (_g(e)) Og(t, i);
  else {
    var s = e.alternate;
    if (
      e.lanes === 0 &&
      (s === null || s.lanes === 0) &&
      ((s = t.lastRenderedReducer), s !== null)
    )
      try {
        var o = t.lastRenderedState,
          a = s(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), Tt(a, o))) {
          var l = t.interleaved;
          l === null
            ? ((i.next = i), Cd(t))
            : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = sg(e, t, i, r)),
      n !== null && ((i = be()), Ct(n, e, r, i), Dg(n, t, r));
  }
}
function _g(e) {
  var t = e.alternate;
  return e === le || (t !== null && t === le);
}
function Og(e, t) {
  Ji = ha = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Dg(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ud(e, n);
  }
}
var pa = {
    readContext: mt,
    useCallback: _e,
    useContext: _e,
    useEffect: _e,
    useImperativeHandle: _e,
    useInsertionEffect: _e,
    useLayoutEffect: _e,
    useMemo: _e,
    useReducer: _e,
    useRef: _e,
    useState: _e,
    useDebugValue: _e,
    useDeferredValue: _e,
    useTransition: _e,
    useMutableSource: _e,
    useSyncExternalStore: _e,
    useId: _e,
    unstable_isNewReconciler: !1,
  },
  kw = {
    readContext: mt,
    useCallback: function (e, t) {
      return (_t().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: mt,
    useEffect: Eh,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Vo(4194308, 4, Pg.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Vo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Vo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = _t();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = _t();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Tw.bind(null, le, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = _t();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Ch,
    useDebugValue: jd,
    useDeferredValue: function (e) {
      return (_t().memoizedState = e);
    },
    useTransition: function () {
      var e = Ch(!1),
        t = e[0];
      return (e = Ew.bind(null, e[1])), (_t().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = le,
        i = _t();
      if (ne) {
        if (n === void 0) throw Error(O(407));
        n = n();
      } else {
        if (((n = t()), we === null)) throw Error(O(349));
        gr & 30 || pg(r, t, n);
      }
      i.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return (
        (i.queue = s),
        Eh(yg.bind(null, r, s, e), [e]),
        (r.flags |= 2048),
        Cs(9, mg.bind(null, r, s, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = _t(),
        t = we.identifierPrefix;
      if (ne) {
        var n = Gt,
          r = Qt;
        (n = (r & ~(1 << (32 - Pt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = xs++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Cw++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  _w = {
    readContext: mt,
    useCallback: Eg,
    useContext: mt,
    useEffect: Md,
    useImperativeHandle: Cg,
    useInsertionEffect: wg,
    useLayoutEffect: xg,
    useMemo: Tg,
    useReducer: Hl,
    useRef: Sg,
    useState: function () {
      return Hl(Ps);
    },
    useDebugValue: jd,
    useDeferredValue: function (e) {
      var t = yt();
      return Rg(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Hl(Ps)[0],
        t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: fg,
    useSyncExternalStore: hg,
    useId: kg,
    unstable_isNewReconciler: !1,
  },
  Ow = {
    readContext: mt,
    useCallback: Eg,
    useContext: mt,
    useEffect: Md,
    useImperativeHandle: Cg,
    useInsertionEffect: wg,
    useLayoutEffect: xg,
    useMemo: Tg,
    useReducer: Kl,
    useRef: Sg,
    useState: function () {
      return Kl(Ps);
    },
    useDebugValue: jd,
    useDeferredValue: function (e) {
      var t = yt();
      return ge === null ? (t.memoizedState = e) : Rg(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Kl(Ps)[0],
        t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: fg,
    useSyncExternalStore: hg,
    useId: kg,
    unstable_isNewReconciler: !1,
  };
function mi(e, t) {
  try {
    var n = "",
      r = t;
    do (n += rS(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (s) {
    i =
      `
Error generating stack: ` +
      s.message +
      `
` +
      s.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Wl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function rc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Dw = typeof WeakMap == "function" ? WeakMap : Map;
function Mg(e, t, n) {
  (n = Yt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ya || ((ya = !0), (hc = r)), rc(e, t);
    }),
    n
  );
}
function jg(e, t, n) {
  (n = Yt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        rc(e, t);
      });
  }
  var s = e.stateNode;
  return (
    s !== null &&
      typeof s.componentDidCatch == "function" &&
      (n.callback = function () {
        rc(e, t),
          typeof r != "function" &&
            (jn === null ? (jn = new Set([this])) : jn.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function Th(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Dw();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Hw.bind(null, e, t, n)), t.then(e, e));
}
function Rh(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function kh(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Yt(-1, 1)), (t.tag = 2), Mn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Mw = an.ReactCurrentOwner,
  Ke = !1;
function Ve(e, t, n, r) {
  t.child = e === null ? cg(t, null, n, r) : hi(t, e.child, n, r);
}
function _h(e, t, n, r, i) {
  n = n.render;
  var s = t.ref;
  return (
    qr(t, i),
    (r = Od(e, t, n, r, s, i)),
    (n = Dd()),
    e !== null && !Ke
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        sn(e, t, i))
      : (ne && n && gd(t), (t.flags |= 1), Ve(e, t, r, i), t.child)
  );
}
function Oh(e, t, n, r, i) {
  if (e === null) {
    var s = n.type;
    return typeof s == "function" &&
      !Bd(s) &&
      s.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = s), Ig(e, t, s, r, i))
      : ((e = Uo(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((s = e.child), !(e.lanes & i))) {
    var o = s.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ms), n(o, r) && e.ref === t.ref)
    )
      return sn(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Ln(s, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Ig(e, t, n, r, i) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (ms(s, r) && e.ref === t.ref)
      if (((Ke = !1), (t.pendingProps = r = s), (e.lanes & i) !== 0))
        e.flags & 131072 && (Ke = !0);
      else return (t.lanes = e.lanes), sn(e, t, i);
  }
  return ic(e, t, n, r, i);
}
function Lg(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    s = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        J(br, Ye),
        (Ye |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = s !== null ? s.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          J(br, Ye),
          (Ye |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = s !== null ? s.baseLanes : n),
        J(br, Ye),
        (Ye |= r);
    }
  else
    s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
      J(br, Ye),
      (Ye |= r);
  return Ve(e, t, i, n), t.child;
}
function Ag(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function ic(e, t, n, r, i) {
  var s = Qe(n) ? mr : Le.current;
  return (
    (s = di(t, s)),
    qr(t, i),
    (n = Od(e, t, n, r, s, i)),
    (r = Dd()),
    e !== null && !Ke
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        sn(e, t, i))
      : (ne && r && gd(t), (t.flags |= 1), Ve(e, t, n, i), t.child)
  );
}
function Dh(e, t, n, r, i) {
  if (Qe(n)) {
    var s = !0;
    oa(t);
  } else s = !1;
  if ((qr(t, i), t.stateNode === null))
    bo(e, t), lg(t, n, r), nc(t, n, r, i), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var l = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = mt(u))
      : ((u = Qe(n) ? mr : Le.current), (u = di(t, u)));
    var c = n.getDerivedStateFromProps,
      d =
        typeof c == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    d ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== r || l !== u) && xh(t, o, r, u)),
      (pn = !1);
    var f = t.memoizedState;
    (o.state = f),
      da(t, r, o, i),
      (l = t.memoizedState),
      a !== r || f !== l || We.current || pn
        ? (typeof c == "function" && (tc(t, n, c, r), (l = t.memoizedState)),
          (a = pn || wh(t, n, a, r, f, l, u))
            ? (d ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (o.props = r),
          (o.state = l),
          (o.context = u),
          (r = a))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      og(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : vt(t.type, a)),
      (o.props = u),
      (d = t.pendingProps),
      (f = o.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = mt(l))
        : ((l = Qe(n) ? mr : Le.current), (l = di(t, l)));
    var g = n.getDerivedStateFromProps;
    (c =
      typeof g == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== d || f !== l) && xh(t, o, r, l)),
      (pn = !1),
      (f = t.memoizedState),
      (o.state = f),
      da(t, r, o, i);
    var m = t.memoizedState;
    a !== d || f !== m || We.current || pn
      ? (typeof g == "function" && (tc(t, n, g, r), (m = t.memoizedState)),
        (u = pn || wh(t, n, u, r, f, m, l) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, m, l),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, m, l)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = m)),
        (o.props = r),
        (o.state = m),
        (o.context = l),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return sc(e, t, n, r, s, i);
}
function sc(e, t, n, r, i, s) {
  Ag(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return i && mh(t, n, !1), sn(e, t, s);
  (r = t.stateNode), (Mw.current = t);
  var a =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = hi(t, e.child, null, s)), (t.child = hi(t, null, a, s)))
      : Ve(e, t, a, s),
    (t.memoizedState = r.state),
    i && mh(t, n, !0),
    t.child
  );
}
function Ng(e) {
  var t = e.stateNode;
  t.pendingContext
    ? ph(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ph(e, t.context, !1),
    Td(e, t.containerInfo);
}
function Mh(e, t, n, r, i) {
  return fi(), Sd(i), (t.flags |= 256), Ve(e, t, n, r), t.child;
}
var oc = { dehydrated: null, treeContext: null, retryLane: 0 };
function ac(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Fg(e, t, n) {
  var r = t.pendingProps,
    i = ae.current,
    s = !1,
    o = (t.flags & 128) !== 0,
    a;
  if (
    ((a = o) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((s = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    J(ae, i & 1),
    e === null)
  )
    return (
      Zu(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          s
            ? ((r = t.mode),
              (s = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && s !== null
                ? ((s.childLanes = 0), (s.pendingProps = o))
                : (s = Ka(o, r, 0, null)),
              (e = hr(e, r, n, null)),
              (s.return = t),
              (e.return = t),
              (s.sibling = e),
              (t.child = s),
              (t.child.memoizedState = ac(n)),
              (t.memoizedState = oc),
              e)
            : Id(t, o))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return jw(e, t, o, r, a, i, n);
  if (s) {
    (s = r.fallback), (o = t.mode), (i = e.child), (a = i.sibling);
    var l = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (t.deletions = null))
        : ((r = Ln(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (s = Ln(a, s)) : ((s = hr(s, o, n, null)), (s.flags |= 2)),
      (s.return = t),
      (r.return = t),
      (r.sibling = s),
      (t.child = r),
      (r = s),
      (s = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? ac(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (s.memoizedState = o),
      (s.childLanes = e.childLanes & ~n),
      (t.memoizedState = oc),
      r
    );
  }
  return (
    (s = e.child),
    (e = s.sibling),
    (r = Ln(s, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Id(e, t) {
  return (
    (t = Ka({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Po(e, t, n, r) {
  return (
    r !== null && Sd(r),
    hi(t, e.child, null, n),
    (e = Id(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function jw(e, t, n, r, i, s, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Wl(Error(O(422)))), Po(e, t, o, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((s = r.fallback),
        (i = t.mode),
        (r = Ka({ mode: "visible", children: r.children }, i, 0, null)),
        (s = hr(s, i, o, null)),
        (s.flags |= 2),
        (r.return = t),
        (s.return = t),
        (r.sibling = s),
        (t.child = r),
        t.mode & 1 && hi(t, e.child, null, o),
        (t.child.memoizedState = ac(o)),
        (t.memoizedState = oc),
        s);
  if (!(t.mode & 1)) return Po(e, t, o, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (s = Error(O(419))), (r = Wl(s, r, void 0)), Po(e, t, o, r);
  }
  if (((a = (o & e.childLanes) !== 0), Ke || a)) {
    if (((r = we), r !== null)) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | o) ? 0 : i),
        i !== 0 &&
          i !== s.retryLane &&
          ((s.retryLane = i), rn(e, i), Ct(r, e, i, -1));
    }
    return bd(), (r = Wl(Error(O(421)))), Po(e, t, o, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Kw.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = s.treeContext),
      (Xe = Dn(i.nextSibling)),
      (Je = t),
      (ne = !0),
      (xt = null),
      e !== null &&
        ((ut[ct++] = Qt),
        (ut[ct++] = Gt),
        (ut[ct++] = yr),
        (Qt = e.id),
        (Gt = e.overflow),
        (yr = t)),
      (t = Id(t, r.children)),
      (t.flags |= 4096),
      t);
}
function jh(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ec(e.return, t, n);
}
function Ql(e, t, n, r, i) {
  var s = e.memoizedState;
  s === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((s.isBackwards = t),
      (s.rendering = null),
      (s.renderingStartTime = 0),
      (s.last = r),
      (s.tail = n),
      (s.tailMode = i));
}
function Vg(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    s = r.tail;
  if ((Ve(e, t, r.children, n), (r = ae.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && jh(e, n, t);
        else if (e.tag === 19) jh(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((J(ae, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && fa(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Ql(t, !1, i, n, s);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && fa(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Ql(t, !0, n, null, s);
        break;
      case "together":
        Ql(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function bo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function sn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (vr |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(O(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Ln(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Ln(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Iw(e, t, n) {
  switch (t.tag) {
    case 3:
      Ng(t), fi();
      break;
    case 5:
      dg(t);
      break;
    case 1:
      Qe(t.type) && oa(t);
      break;
    case 4:
      Td(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      J(ua, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (J(ae, ae.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Fg(e, t, n)
          : (J(ae, ae.current & 1),
            (e = sn(e, t, n)),
            e !== null ? e.sibling : null);
      J(ae, ae.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Vg(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        J(ae, ae.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Lg(e, t, n);
  }
  return sn(e, t, n);
}
var bg, lc, Bg, zg;
bg = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
lc = function () {};
Bg = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), nr(Nt.current);
    var s = null;
    switch (n) {
      case "input":
        (i = Du(e, i)), (r = Du(e, r)), (s = []);
        break;
      case "select":
        (i = ue({}, i, { value: void 0 })),
          (r = ue({}, r, { value: void 0 })),
          (s = []);
        break;
      case "textarea":
        (i = Iu(e, i)), (r = Iu(e, r)), (s = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ia);
    }
    Au(n, r);
    var o;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var a = i[u];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (ls.hasOwnProperty(u)
              ? s || (s = [])
              : (s = s || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((a = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && l !== a && (l != null || a != null))
      )
        if (u === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) ||
                (l && l.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in l)
              l.hasOwnProperty(o) &&
                a[o] !== l[o] &&
                (n || (n = {}), (n[o] = l[o]));
          } else n || (s || (s = []), s.push(u, n)), (n = l);
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (s = s || []).push(u, l))
            : u === "children"
            ? (typeof l != "string" && typeof l != "number") ||
              (s = s || []).push(u, "" + l)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (ls.hasOwnProperty(u)
                ? (l != null && u === "onScroll" && ee("scroll", e),
                  s || a === l || (s = []))
                : (s = s || []).push(u, l));
    }
    n && (s = s || []).push("style", n);
    var u = s;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
zg = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Fi(e, t) {
  if (!ne)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Lw(e, t, n) {
  var r = t.pendingProps;
  switch ((vd(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Oe(t), null;
    case 1:
      return Qe(t.type) && sa(), Oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        pi(),
        te(We),
        te(Le),
        kd(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (wo(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), xt !== null && (yc(xt), (xt = null)))),
        lc(e, t),
        Oe(t),
        null
      );
    case 5:
      Rd(t);
      var i = nr(ws.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Bg(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(O(166));
          return Oe(t), null;
        }
        if (((e = nr(Nt.current)), wo(t))) {
          (r = t.stateNode), (n = t.type);
          var s = t.memoizedProps;
          switch (((r[It] = t), (r[vs] = s), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              ee("cancel", r), ee("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ee("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Hi.length; i++) ee(Hi[i], r);
              break;
            case "source":
              ee("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ee("error", r), ee("load", r);
              break;
            case "details":
              ee("toggle", r);
              break;
            case "input":
              zf(r, s), ee("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!s.multiple }),
                ee("invalid", r);
              break;
            case "textarea":
              $f(r, s), ee("invalid", r);
          }
          Au(n, s), (i = null);
          for (var o in s)
            if (s.hasOwnProperty(o)) {
              var a = s[o];
              o === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (s.suppressHydrationWarning !== !0 &&
                      So(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (s.suppressHydrationWarning !== !0 &&
                      So(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : ls.hasOwnProperty(o) &&
                  a != null &&
                  o === "onScroll" &&
                  ee("scroll", r);
            }
          switch (n) {
            case "input":
              co(r), Uf(r, s, !0);
              break;
            case "textarea":
              co(r), Hf(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (r.onclick = ia);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = py(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = o.createElement(n, { is: r.is }))
                : ((e = o.createElement(n)),
                  n === "select" &&
                    ((o = e),
                    r.multiple
                      ? (o.multiple = !0)
                      : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[It] = t),
            (e[vs] = r),
            bg(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = Nu(n, r)), n)) {
              case "dialog":
                ee("cancel", e), ee("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ee("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Hi.length; i++) ee(Hi[i], e);
                i = r;
                break;
              case "source":
                ee("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                ee("error", e), ee("load", e), (i = r);
                break;
              case "details":
                ee("toggle", e), (i = r);
                break;
              case "input":
                zf(e, r), (i = Du(e, r)), ee("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ue({}, r, { value: void 0 })),
                  ee("invalid", e);
                break;
              case "textarea":
                $f(e, r), (i = Iu(e, r)), ee("invalid", e);
                break;
              default:
                i = r;
            }
            Au(n, i), (a = i);
            for (s in a)
              if (a.hasOwnProperty(s)) {
                var l = a[s];
                s === "style"
                  ? gy(e, l)
                  : s === "dangerouslySetInnerHTML"
                  ? ((l = l ? l.__html : void 0), l != null && my(e, l))
                  : s === "children"
                  ? typeof l == "string"
                    ? (n !== "textarea" || l !== "") && us(e, l)
                    : typeof l == "number" && us(e, "" + l)
                  : s !== "suppressContentEditableWarning" &&
                    s !== "suppressHydrationWarning" &&
                    s !== "autoFocus" &&
                    (ls.hasOwnProperty(s)
                      ? l != null && s === "onScroll" && ee("scroll", e)
                      : l != null && rd(e, s, l, o));
              }
            switch (n) {
              case "input":
                co(e), Uf(e, r, !1);
                break;
              case "textarea":
                co(e), Hf(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Vn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (s = r.value),
                  s != null
                    ? Kr(e, !!r.multiple, s, !1)
                    : r.defaultValue != null &&
                      Kr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = ia);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Oe(t), null;
    case 6:
      if (e && t.stateNode != null) zg(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(O(166));
        if (((n = nr(ws.current)), nr(Nt.current), wo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[It] = t),
            (s = r.nodeValue !== n) && ((e = Je), e !== null))
          )
            switch (e.tag) {
              case 3:
                So(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  So(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          s && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[It] = t),
            (t.stateNode = r);
      }
      return Oe(t), null;
    case 13:
      if (
        (te(ae),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ne && Xe !== null && t.mode & 1 && !(t.flags & 128))
          ig(), fi(), (t.flags |= 98560), (s = !1);
        else if (((s = wo(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!s) throw Error(O(318));
            if (
              ((s = t.memoizedState),
              (s = s !== null ? s.dehydrated : null),
              !s)
            )
              throw Error(O(317));
            s[It] = t;
          } else
            fi(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Oe(t), (s = !1);
        } else xt !== null && (yc(xt), (xt = null)), (s = !0);
        if (!s) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ae.current & 1 ? ve === 0 && (ve = 3) : bd())),
          t.updateQueue !== null && (t.flags |= 4),
          Oe(t),
          null);
    case 4:
      return (
        pi(), lc(e, t), e === null && ys(t.stateNode.containerInfo), Oe(t), null
      );
    case 10:
      return Pd(t.type._context), Oe(t), null;
    case 17:
      return Qe(t.type) && sa(), Oe(t), null;
    case 19:
      if ((te(ae), (s = t.memoizedState), s === null)) return Oe(t), null;
      if (((r = (t.flags & 128) !== 0), (o = s.rendering), o === null))
        if (r) Fi(s, !1);
        else {
          if (ve !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = fa(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    Fi(s, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (s = n),
                    (e = r),
                    (s.flags &= 14680066),
                    (o = s.alternate),
                    o === null
                      ? ((s.childLanes = 0),
                        (s.lanes = e),
                        (s.child = null),
                        (s.subtreeFlags = 0),
                        (s.memoizedProps = null),
                        (s.memoizedState = null),
                        (s.updateQueue = null),
                        (s.dependencies = null),
                        (s.stateNode = null))
                      : ((s.childLanes = o.childLanes),
                        (s.lanes = o.lanes),
                        (s.child = o.child),
                        (s.subtreeFlags = 0),
                        (s.deletions = null),
                        (s.memoizedProps = o.memoizedProps),
                        (s.memoizedState = o.memoizedState),
                        (s.updateQueue = o.updateQueue),
                        (s.type = o.type),
                        (e = o.dependencies),
                        (s.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return J(ae, (ae.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          s.tail !== null &&
            pe() > yi &&
            ((t.flags |= 128), (r = !0), Fi(s, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = fa(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Fi(s, !0),
              s.tail === null && s.tailMode === "hidden" && !o.alternate && !ne)
            )
              return Oe(t), null;
          } else
            2 * pe() - s.renderingStartTime > yi &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Fi(s, !1), (t.lanes = 4194304));
        s.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = s.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (s.last = o));
      }
      return s.tail !== null
        ? ((t = s.tail),
          (s.rendering = t),
          (s.tail = t.sibling),
          (s.renderingStartTime = pe()),
          (t.sibling = null),
          (n = ae.current),
          J(ae, r ? (n & 1) | 2 : n & 1),
          t)
        : (Oe(t), null);
    case 22:
    case 23:
      return (
        Vd(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ye & 1073741824 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(O(156, t.tag));
}
function Aw(e, t) {
  switch ((vd(t), t.tag)) {
    case 1:
      return (
        Qe(t.type) && sa(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        pi(),
        te(We),
        te(Le),
        kd(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Rd(t), null;
    case 13:
      if (
        (te(ae), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(O(340));
        fi();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return te(ae), null;
    case 4:
      return pi(), null;
    case 10:
      return Pd(t.type._context), null;
    case 22:
    case 23:
      return Vd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Co = !1,
  je = !1,
  Nw = typeof WeakSet == "function" ? WeakSet : Set,
  j = null;
function Vr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        fe(e, t, r);
      }
    else n.current = null;
}
function uc(e, t, n) {
  try {
    n();
  } catch (r) {
    fe(e, t, r);
  }
}
var Ih = !1;
function Fw(e, t) {
  if (((Wu = ta), (e = Ky()), yd(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            s = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, s.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            l = -1,
            u = 0,
            c = 0,
            d = e,
            f = null;
          t: for (;;) {
            for (
              var g;
              d !== n || (i !== 0 && d.nodeType !== 3) || (a = o + i),
                d !== s || (r !== 0 && d.nodeType !== 3) || (l = o + r),
                d.nodeType === 3 && (o += d.nodeValue.length),
                (g = d.firstChild) !== null;

            )
              (f = d), (d = g);
            for (;;) {
              if (d === e) break t;
              if (
                (f === n && ++u === i && (a = o),
                f === s && ++c === r && (l = o),
                (g = d.nextSibling) !== null)
              )
                break;
              (d = f), (f = d.parentNode);
            }
            d = g;
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Qu = { focusedElem: e, selectionRange: n }, ta = !1, j = t; j !== null; )
    if (((t = j), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (j = e);
    else
      for (; j !== null; ) {
        t = j;
        try {
          var m = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var y = m.memoizedProps,
                    w = m.memoizedState,
                    p = t.stateNode,
                    h = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : vt(t.type, y),
                      w
                    );
                  p.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(O(163));
            }
        } catch (x) {
          fe(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (j = e);
          break;
        }
        j = t.return;
      }
  return (m = Ih), (Ih = !1), m;
}
function Zi(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var s = i.destroy;
        (i.destroy = void 0), s !== void 0 && uc(t, n, s);
      }
      i = i.next;
    } while (i !== r);
  }
}
function $a(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function cc(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Ug(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Ug(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[It], delete t[vs], delete t[Yu], delete t[Sw], delete t[ww])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function $g(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Lh(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || $g(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function dc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ia));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (dc(e, t, n), e = e.sibling; e !== null; ) dc(e, t, n), (e = e.sibling);
}
function fc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (fc(e, t, n), e = e.sibling; e !== null; ) fc(e, t, n), (e = e.sibling);
}
var xe = null,
  wt = !1;
function ln(e, t, n) {
  for (n = n.child; n !== null; ) Hg(e, t, n), (n = n.sibling);
}
function Hg(e, t, n) {
  if (At && typeof At.onCommitFiberUnmount == "function")
    try {
      At.onCommitFiberUnmount(Aa, n);
    } catch {}
  switch (n.tag) {
    case 5:
      je || Vr(n, t);
    case 6:
      var r = xe,
        i = wt;
      (xe = null),
        ln(e, t, n),
        (xe = r),
        (wt = i),
        xe !== null &&
          (wt
            ? ((e = xe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : xe.removeChild(n.stateNode));
      break;
    case 18:
      xe !== null &&
        (wt
          ? ((e = xe),
            (n = n.stateNode),
            e.nodeType === 8
              ? Bl(e.parentNode, n)
              : e.nodeType === 1 && Bl(e, n),
            hs(e))
          : Bl(xe, n.stateNode));
      break;
    case 4:
      (r = xe),
        (i = wt),
        (xe = n.stateNode.containerInfo),
        (wt = !0),
        ln(e, t, n),
        (xe = r),
        (wt = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !je &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var s = i,
            o = s.destroy;
          (s = s.tag),
            o !== void 0 && (s & 2 || s & 4) && uc(n, t, o),
            (i = i.next);
        } while (i !== r);
      }
      ln(e, t, n);
      break;
    case 1:
      if (
        !je &&
        (Vr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          fe(n, t, a);
        }
      ln(e, t, n);
      break;
    case 21:
      ln(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((je = (r = je) || n.memoizedState !== null), ln(e, t, n), (je = r))
        : ln(e, t, n);
      break;
    default:
      ln(e, t, n);
  }
}
function Ah(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Nw()),
      t.forEach(function (r) {
        var i = Ww.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function gt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var s = e,
          o = t,
          a = o;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (xe = a.stateNode), (wt = !1);
              break e;
            case 3:
              (xe = a.stateNode.containerInfo), (wt = !0);
              break e;
            case 4:
              (xe = a.stateNode.containerInfo), (wt = !0);
              break e;
          }
          a = a.return;
        }
        if (xe === null) throw Error(O(160));
        Hg(s, o, i), (xe = null), (wt = !1);
        var l = i.alternate;
        l !== null && (l.return = null), (i.return = null);
      } catch (u) {
        fe(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Kg(t, e), (t = t.sibling);
}
function Kg(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((gt(t, e), kt(e), r & 4)) {
        try {
          Zi(3, e, e.return), $a(3, e);
        } catch (y) {
          fe(e, e.return, y);
        }
        try {
          Zi(5, e, e.return);
        } catch (y) {
          fe(e, e.return, y);
        }
      }
      break;
    case 1:
      gt(t, e), kt(e), r & 512 && n !== null && Vr(n, n.return);
      break;
    case 5:
      if (
        (gt(t, e),
        kt(e),
        r & 512 && n !== null && Vr(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          us(i, "");
        } catch (y) {
          fe(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var s = e.memoizedProps,
          o = n !== null ? n.memoizedProps : s,
          a = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            a === "input" && s.type === "radio" && s.name != null && fy(i, s),
              Nu(a, o);
            var u = Nu(a, s);
            for (o = 0; o < l.length; o += 2) {
              var c = l[o],
                d = l[o + 1];
              c === "style"
                ? gy(i, d)
                : c === "dangerouslySetInnerHTML"
                ? my(i, d)
                : c === "children"
                ? us(i, d)
                : rd(i, c, d, u);
            }
            switch (a) {
              case "input":
                Mu(i, s);
                break;
              case "textarea":
                hy(i, s);
                break;
              case "select":
                var f = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!s.multiple;
                var g = s.value;
                g != null
                  ? Kr(i, !!s.multiple, g, !1)
                  : f !== !!s.multiple &&
                    (s.defaultValue != null
                      ? Kr(i, !!s.multiple, s.defaultValue, !0)
                      : Kr(i, !!s.multiple, s.multiple ? [] : "", !1));
            }
            i[vs] = s;
          } catch (y) {
            fe(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((gt(t, e), kt(e), r & 4)) {
        if (e.stateNode === null) throw Error(O(162));
        (i = e.stateNode), (s = e.memoizedProps);
        try {
          i.nodeValue = s;
        } catch (y) {
          fe(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (gt(t, e), kt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          hs(t.containerInfo);
        } catch (y) {
          fe(e, e.return, y);
        }
      break;
    case 4:
      gt(t, e), kt(e);
      break;
    case 13:
      gt(t, e),
        kt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((s = i.memoizedState !== null),
          (i.stateNode.isHidden = s),
          !s ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Nd = pe())),
        r & 4 && Ah(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((je = (u = je) || c), gt(t, e), (je = u)) : gt(t, e),
        kt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (j = e, c = e.child; c !== null; ) {
            for (d = j = c; j !== null; ) {
              switch (((f = j), (g = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Zi(4, f, f.return);
                  break;
                case 1:
                  Vr(f, f.return);
                  var m = f.stateNode;
                  if (typeof m.componentWillUnmount == "function") {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount();
                    } catch (y) {
                      fe(r, n, y);
                    }
                  }
                  break;
                case 5:
                  Vr(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    Fh(d);
                    continue;
                  }
              }
              g !== null ? ((g.return = f), (j = g)) : Fh(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                (i = d.stateNode),
                  u
                    ? ((s = i.style),
                      typeof s.setProperty == "function"
                        ? s.setProperty("display", "none", "important")
                        : (s.display = "none"))
                    : ((a = d.stateNode),
                      (l = d.memoizedProps.style),
                      (o =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (a.style.display = yy("display", o)));
              } catch (y) {
                fe(e, e.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (y) {
                fe(e, e.return, y);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            c === d && (c = null), (d = d.return);
          }
          c === d && (c = null), (d.sibling.return = d.return), (d = d.sibling);
        }
      }
      break;
    case 19:
      gt(t, e), kt(e), r & 4 && Ah(e);
      break;
    case 21:
      break;
    default:
      gt(t, e), kt(e);
  }
}
function kt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if ($g(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(O(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (us(i, ""), (r.flags &= -33));
          var s = Lh(e);
          fc(e, s, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = Lh(e);
          dc(e, a, o);
          break;
        default:
          throw Error(O(161));
      }
    } catch (l) {
      fe(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Vw(e, t, n) {
  (j = e), Wg(e);
}
function Wg(e, t, n) {
  for (var r = (e.mode & 1) !== 0; j !== null; ) {
    var i = j,
      s = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || Co;
      if (!o) {
        var a = i.alternate,
          l = (a !== null && a.memoizedState !== null) || je;
        a = Co;
        var u = je;
        if (((Co = o), (je = l) && !u))
          for (j = i; j !== null; )
            (o = j),
              (l = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Vh(i)
                : l !== null
                ? ((l.return = o), (j = l))
                : Vh(i);
        for (; s !== null; ) (j = s), Wg(s), (s = s.sibling);
        (j = i), (Co = a), (je = u);
      }
      Nh(e);
    } else
      i.subtreeFlags & 8772 && s !== null ? ((s.return = i), (j = s)) : Nh(e);
  }
}
function Nh(e) {
  for (; j !== null; ) {
    var t = j;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              je || $a(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !je)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : vt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var s = t.updateQueue;
              s !== null && Sh(t, s, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Sh(t, o, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var d = c.dehydrated;
                    d !== null && hs(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(O(163));
          }
        je || (t.flags & 512 && cc(t));
      } catch (f) {
        fe(t, t.return, f);
      }
    }
    if (t === e) {
      j = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (j = n);
      break;
    }
    j = t.return;
  }
}
function Fh(e) {
  for (; j !== null; ) {
    var t = j;
    if (t === e) {
      j = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (j = n);
      break;
    }
    j = t.return;
  }
}
function Vh(e) {
  for (; j !== null; ) {
    var t = j;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            $a(4, t);
          } catch (l) {
            fe(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              fe(t, i, l);
            }
          }
          var s = t.return;
          try {
            cc(t);
          } catch (l) {
            fe(t, s, l);
          }
          break;
        case 5:
          var o = t.return;
          try {
            cc(t);
          } catch (l) {
            fe(t, o, l);
          }
      }
    } catch (l) {
      fe(t, t.return, l);
    }
    if (t === e) {
      j = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (j = a);
      break;
    }
    j = t.return;
  }
}
var bw = Math.ceil,
  ma = an.ReactCurrentDispatcher,
  Ld = an.ReactCurrentOwner,
  ft = an.ReactCurrentBatchConfig,
  H = 0,
  we = null,
  me = null,
  Te = 0,
  Ye = 0,
  br = Hn(0),
  ve = 0,
  Es = null,
  vr = 0,
  Ha = 0,
  Ad = 0,
  es = null,
  He = null,
  Nd = 0,
  yi = 1 / 0,
  Ht = null,
  ya = !1,
  hc = null,
  jn = null,
  Eo = !1,
  Tn = null,
  ga = 0,
  ts = 0,
  pc = null,
  Bo = -1,
  zo = 0;
function be() {
  return H & 6 ? pe() : Bo !== -1 ? Bo : (Bo = pe());
}
function In(e) {
  return e.mode & 1
    ? H & 2 && Te !== 0
      ? Te & -Te
      : Pw.transition !== null
      ? (zo === 0 && (zo = Oy()), zo)
      : ((e = G),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Ny(e.type))),
        e)
    : 1;
}
function Ct(e, t, n, r) {
  if (50 < ts) throw ((ts = 0), (pc = null), Error(O(185)));
  Ks(e, n, r),
    (!(H & 2) || e !== we) &&
      (e === we && (!(H & 2) && (Ha |= n), ve === 4 && gn(e, Te)),
      Ge(e, r),
      n === 1 && H === 0 && !(t.mode & 1) && ((yi = pe() + 500), Ba && Kn()));
}
function Ge(e, t) {
  var n = e.callbackNode;
  PS(e, t);
  var r = ea(e, e === we ? Te : 0);
  if (r === 0)
    n !== null && Qf(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Qf(n), t === 1))
      e.tag === 0 ? xw(bh.bind(null, e)) : tg(bh.bind(null, e)),
        gw(function () {
          !(H & 6) && Kn();
        }),
        (n = null);
    else {
      switch (Dy(r)) {
        case 1:
          n = ld;
          break;
        case 4:
          n = ky;
          break;
        case 16:
          n = Zo;
          break;
        case 536870912:
          n = _y;
          break;
        default:
          n = Zo;
      }
      n = ev(n, Qg.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Qg(e, t) {
  if (((Bo = -1), (zo = 0), H & 6)) throw Error(O(327));
  var n = e.callbackNode;
  if (Yr() && e.callbackNode !== n) return null;
  var r = ea(e, e === we ? Te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = va(e, r);
  else {
    t = r;
    var i = H;
    H |= 2;
    var s = qg();
    (we !== e || Te !== t) && ((Ht = null), (yi = pe() + 500), fr(e, t));
    do
      try {
        Uw();
        break;
      } catch (a) {
        Gg(e, a);
      }
    while (!0);
    xd(),
      (ma.current = s),
      (H = i),
      me !== null ? (t = 0) : ((we = null), (Te = 0), (t = ve));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = zu(e)), i !== 0 && ((r = i), (t = mc(e, i)))), t === 1)
    )
      throw ((n = Es), fr(e, 0), gn(e, r), Ge(e, pe()), n);
    if (t === 6) gn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Bw(i) &&
          ((t = va(e, r)),
          t === 2 && ((s = zu(e)), s !== 0 && ((r = s), (t = mc(e, s)))),
          t === 1))
      )
        throw ((n = Es), fr(e, 0), gn(e, r), Ge(e, pe()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(O(345));
        case 2:
          Yn(e, He, Ht);
          break;
        case 3:
          if (
            (gn(e, r), (r & 130023424) === r && ((t = Nd + 500 - pe()), 10 < t))
          ) {
            if (ea(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              be(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = qu(Yn.bind(null, e, He, Ht), t);
            break;
          }
          Yn(e, He, Ht);
          break;
        case 4:
          if ((gn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - Pt(r);
            (s = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~s);
          }
          if (
            ((r = i),
            (r = pe() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * bw(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = qu(Yn.bind(null, e, He, Ht), r);
            break;
          }
          Yn(e, He, Ht);
          break;
        case 5:
          Yn(e, He, Ht);
          break;
        default:
          throw Error(O(329));
      }
    }
  }
  return Ge(e, pe()), e.callbackNode === n ? Qg.bind(null, e) : null;
}
function mc(e, t) {
  var n = es;
  return (
    e.current.memoizedState.isDehydrated && (fr(e, t).flags |= 256),
    (e = va(e, t)),
    e !== 2 && ((t = He), (He = n), t !== null && yc(t)),
    e
  );
}
function yc(e) {
  He === null ? (He = e) : He.push.apply(He, e);
}
function Bw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            s = i.getSnapshot;
          i = i.value;
          try {
            if (!Tt(s(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function gn(e, t) {
  for (
    t &= ~Ad,
      t &= ~Ha,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Pt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function bh(e) {
  if (H & 6) throw Error(O(327));
  Yr();
  var t = ea(e, 0);
  if (!(t & 1)) return Ge(e, pe()), null;
  var n = va(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = zu(e);
    r !== 0 && ((t = r), (n = mc(e, r)));
  }
  if (n === 1) throw ((n = Es), fr(e, 0), gn(e, t), Ge(e, pe()), n);
  if (n === 6) throw Error(O(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Yn(e, He, Ht),
    Ge(e, pe()),
    null
  );
}
function Fd(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    (H = n), H === 0 && ((yi = pe() + 500), Ba && Kn());
  }
}
function Sr(e) {
  Tn !== null && Tn.tag === 0 && !(H & 6) && Yr();
  var t = H;
  H |= 1;
  var n = ft.transition,
    r = G;
  try {
    if (((ft.transition = null), (G = 1), e)) return e();
  } finally {
    (G = r), (ft.transition = n), (H = t), !(H & 6) && Kn();
  }
}
function Vd() {
  (Ye = br.current), te(br);
}
function fr(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), yw(n)), me !== null))
    for (n = me.return; n !== null; ) {
      var r = n;
      switch ((vd(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && sa();
          break;
        case 3:
          pi(), te(We), te(Le), kd();
          break;
        case 5:
          Rd(r);
          break;
        case 4:
          pi();
          break;
        case 13:
          te(ae);
          break;
        case 19:
          te(ae);
          break;
        case 10:
          Pd(r.type._context);
          break;
        case 22:
        case 23:
          Vd();
      }
      n = n.return;
    }
  if (
    ((we = e),
    (me = e = Ln(e.current, null)),
    (Te = Ye = t),
    (ve = 0),
    (Es = null),
    (Ad = Ha = vr = 0),
    (He = es = null),
    tr !== null)
  ) {
    for (t = 0; t < tr.length; t++)
      if (((n = tr[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          s = n.pending;
        if (s !== null) {
          var o = s.next;
          (s.next = i), (r.next = o);
        }
        n.pending = r;
      }
    tr = null;
  }
  return e;
}
function Gg(e, t) {
  do {
    var n = me;
    try {
      if ((xd(), (Fo.current = pa), ha)) {
        for (var r = le.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        ha = !1;
      }
      if (
        ((gr = 0),
        (Se = ge = le = null),
        (Ji = !1),
        (xs = 0),
        (Ld.current = null),
        n === null || n.return === null)
      ) {
        (ve = 1), (Es = t), (me = null);
        break;
      }
      e: {
        var s = e,
          o = n.return,
          a = n,
          l = t;
        if (
          ((t = Te),
          (a.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            c = a,
            d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var f = c.alternate;
            f
              ? ((c.updateQueue = f.updateQueue),
                (c.memoizedState = f.memoizedState),
                (c.lanes = f.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var g = Rh(o);
          if (g !== null) {
            (g.flags &= -257),
              kh(g, o, a, s, t),
              g.mode & 1 && Th(s, u, t),
              (t = g),
              (l = u);
            var m = t.updateQueue;
            if (m === null) {
              var y = new Set();
              y.add(l), (t.updateQueue = y);
            } else m.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Th(s, u, t), bd();
              break e;
            }
            l = Error(O(426));
          }
        } else if (ne && a.mode & 1) {
          var w = Rh(o);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256),
              kh(w, o, a, s, t),
              Sd(mi(l, a));
            break e;
          }
        }
        (s = l = mi(l, a)),
          ve !== 4 && (ve = 2),
          es === null ? (es = [s]) : es.push(s),
          (s = o);
        do {
          switch (s.tag) {
            case 3:
              (s.flags |= 65536), (t &= -t), (s.lanes |= t);
              var p = Mg(s, l, t);
              vh(s, p);
              break e;
            case 1:
              a = l;
              var h = s.type,
                v = s.stateNode;
              if (
                !(s.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch == "function" &&
                    (jn === null || !jn.has(v))))
              ) {
                (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                var x = jg(s, a, t);
                vh(s, x);
                break e;
              }
          }
          s = s.return;
        } while (s !== null);
      }
      Xg(n);
    } catch (E) {
      (t = E), me === n && n !== null && (me = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function qg() {
  var e = ma.current;
  return (ma.current = pa), e === null ? pa : e;
}
function bd() {
  (ve === 0 || ve === 3 || ve === 2) && (ve = 4),
    we === null || (!(vr & 268435455) && !(Ha & 268435455)) || gn(we, Te);
}
function va(e, t) {
  var n = H;
  H |= 2;
  var r = qg();
  (we !== e || Te !== t) && ((Ht = null), fr(e, t));
  do
    try {
      zw();
      break;
    } catch (i) {
      Gg(e, i);
    }
  while (!0);
  if ((xd(), (H = n), (ma.current = r), me !== null)) throw Error(O(261));
  return (we = null), (Te = 0), ve;
}
function zw() {
  for (; me !== null; ) Yg(me);
}
function Uw() {
  for (; me !== null && !hS(); ) Yg(me);
}
function Yg(e) {
  var t = Zg(e.alternate, e, Ye);
  (e.memoizedProps = e.pendingProps),
    t === null ? Xg(e) : (me = t),
    (Ld.current = null);
}
function Xg(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Aw(n, t)), n !== null)) {
        (n.flags &= 32767), (me = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ve = 6), (me = null);
        return;
      }
    } else if (((n = Lw(n, t, Ye)), n !== null)) {
      me = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      me = t;
      return;
    }
    me = t = e;
  } while (t !== null);
  ve === 0 && (ve = 5);
}
function Yn(e, t, n) {
  var r = G,
    i = ft.transition;
  try {
    (ft.transition = null), (G = 1), $w(e, t, n, r);
  } finally {
    (ft.transition = i), (G = r);
  }
  return null;
}
function $w(e, t, n, r) {
  do Yr();
  while (Tn !== null);
  if (H & 6) throw Error(O(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(O(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var s = n.lanes | n.childLanes;
  if (
    (CS(e, s),
    e === we && ((me = we = null), (Te = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Eo ||
      ((Eo = !0),
      ev(Zo, function () {
        return Yr(), null;
      })),
    (s = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || s)
  ) {
    (s = ft.transition), (ft.transition = null);
    var o = G;
    G = 1;
    var a = H;
    (H |= 4),
      (Ld.current = null),
      Fw(e, n),
      Kg(n, e),
      uw(Qu),
      (ta = !!Wu),
      (Qu = Wu = null),
      (e.current = n),
      Vw(n),
      pS(),
      (H = a),
      (G = o),
      (ft.transition = s);
  } else e.current = n;
  if (
    (Eo && ((Eo = !1), (Tn = e), (ga = i)),
    (s = e.pendingLanes),
    s === 0 && (jn = null),
    gS(n.stateNode),
    Ge(e, pe()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (ya) throw ((ya = !1), (e = hc), (hc = null), e);
  return (
    ga & 1 && e.tag !== 0 && Yr(),
    (s = e.pendingLanes),
    s & 1 ? (e === pc ? ts++ : ((ts = 0), (pc = e))) : (ts = 0),
    Kn(),
    null
  );
}
function Yr() {
  if (Tn !== null) {
    var e = Dy(ga),
      t = ft.transition,
      n = G;
    try {
      if (((ft.transition = null), (G = 16 > e ? 16 : e), Tn === null))
        var r = !1;
      else {
        if (((e = Tn), (Tn = null), (ga = 0), H & 6)) throw Error(O(331));
        var i = H;
        for (H |= 4, j = e.current; j !== null; ) {
          var s = j,
            o = s.child;
          if (j.flags & 16) {
            var a = s.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (j = u; j !== null; ) {
                  var c = j;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Zi(8, c, s);
                  }
                  var d = c.child;
                  if (d !== null) (d.return = c), (j = d);
                  else
                    for (; j !== null; ) {
                      c = j;
                      var f = c.sibling,
                        g = c.return;
                      if ((Ug(c), c === u)) {
                        j = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = g), (j = f);
                        break;
                      }
                      j = g;
                    }
                }
              }
              var m = s.alternate;
              if (m !== null) {
                var y = m.child;
                if (y !== null) {
                  m.child = null;
                  do {
                    var w = y.sibling;
                    (y.sibling = null), (y = w);
                  } while (y !== null);
                }
              }
              j = s;
            }
          }
          if (s.subtreeFlags & 2064 && o !== null) (o.return = s), (j = o);
          else
            e: for (; j !== null; ) {
              if (((s = j), s.flags & 2048))
                switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Zi(9, s, s.return);
                }
              var p = s.sibling;
              if (p !== null) {
                (p.return = s.return), (j = p);
                break e;
              }
              j = s.return;
            }
        }
        var h = e.current;
        for (j = h; j !== null; ) {
          o = j;
          var v = o.child;
          if (o.subtreeFlags & 2064 && v !== null) (v.return = o), (j = v);
          else
            e: for (o = h; j !== null; ) {
              if (((a = j), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $a(9, a);
                  }
                } catch (E) {
                  fe(a, a.return, E);
                }
              if (a === o) {
                j = null;
                break e;
              }
              var x = a.sibling;
              if (x !== null) {
                (x.return = a.return), (j = x);
                break e;
              }
              j = a.return;
            }
        }
        if (
          ((H = i), Kn(), At && typeof At.onPostCommitFiberRoot == "function")
        )
          try {
            At.onPostCommitFiberRoot(Aa, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (G = n), (ft.transition = t);
    }
  }
  return !1;
}
function Bh(e, t, n) {
  (t = mi(n, t)),
    (t = Mg(e, t, 1)),
    (e = Mn(e, t, 1)),
    (t = be()),
    e !== null && (Ks(e, 1, t), Ge(e, t));
}
function fe(e, t, n) {
  if (e.tag === 3) Bh(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Bh(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (jn === null || !jn.has(r)))
        ) {
          (e = mi(n, e)),
            (e = jg(t, e, 1)),
            (t = Mn(t, e, 1)),
            (e = be()),
            t !== null && (Ks(t, 1, e), Ge(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Hw(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = be()),
    (e.pingedLanes |= e.suspendedLanes & n),
    we === e &&
      (Te & n) === n &&
      (ve === 4 || (ve === 3 && (Te & 130023424) === Te && 500 > pe() - Nd)
        ? fr(e, 0)
        : (Ad |= n)),
    Ge(e, t);
}
function Jg(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = po), (po <<= 1), !(po & 130023424) && (po = 4194304))
      : (t = 1));
  var n = be();
  (e = rn(e, t)), e !== null && (Ks(e, t, n), Ge(e, n));
}
function Kw(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Jg(e, n);
}
function Ww(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(O(314));
  }
  r !== null && r.delete(t), Jg(e, n);
}
var Zg;
Zg = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || We.current) Ke = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ke = !1), Iw(e, t, n);
      Ke = !!(e.flags & 131072);
    }
  else (Ke = !1), ne && t.flags & 1048576 && ng(t, la, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      bo(e, t), (e = t.pendingProps);
      var i = di(t, Le.current);
      qr(t, n), (i = Od(null, t, r, e, i, n));
      var s = Dd();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Qe(r) ? ((s = !0), oa(t)) : (s = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Ed(t),
            (i.updater = za),
            (t.stateNode = i),
            (i._reactInternals = t),
            nc(t, r, e, n),
            (t = sc(null, t, r, !0, s, n)))
          : ((t.tag = 0), ne && s && gd(t), Ve(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (bo(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Gw(r)),
          (e = vt(r, e)),
          i)
        ) {
          case 0:
            t = ic(null, t, r, e, n);
            break e;
          case 1:
            t = Dh(null, t, r, e, n);
            break e;
          case 11:
            t = _h(null, t, r, e, n);
            break e;
          case 14:
            t = Oh(null, t, r, vt(r.type, e), n);
            break e;
        }
        throw Error(O(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : vt(r, i)),
        ic(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : vt(r, i)),
        Dh(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Ng(t), e === null)) throw Error(O(387));
        (r = t.pendingProps),
          (s = t.memoizedState),
          (i = s.element),
          og(e, t),
          da(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), s.isDehydrated))
          if (
            ((s = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            (i = mi(Error(O(423)), t)), (t = Mh(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = mi(Error(O(424)), t)), (t = Mh(e, t, r, n, i));
            break e;
          } else
            for (
              Xe = Dn(t.stateNode.containerInfo.firstChild),
                Je = t,
                ne = !0,
                xt = null,
                n = cg(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((fi(), r === i)) {
            t = sn(e, t, n);
            break e;
          }
          Ve(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        dg(t),
        e === null && Zu(t),
        (r = t.type),
        (i = t.pendingProps),
        (s = e !== null ? e.memoizedProps : null),
        (o = i.children),
        Gu(r, i) ? (o = null) : s !== null && Gu(r, s) && (t.flags |= 32),
        Ag(e, t),
        Ve(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && Zu(t), null;
    case 13:
      return Fg(e, t, n);
    case 4:
      return (
        Td(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = hi(t, null, r, n)) : Ve(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : vt(r, i)),
        _h(e, t, r, i, n)
      );
    case 7:
      return Ve(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ve(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ve(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (s = t.memoizedProps),
          (o = i.value),
          J(ua, r._currentValue),
          (r._currentValue = o),
          s !== null)
        )
          if (Tt(s.value, o)) {
            if (s.children === i.children && !We.current) {
              t = sn(e, t, n);
              break e;
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null; ) {
              var a = s.dependencies;
              if (a !== null) {
                o = s.child;
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (s.tag === 1) {
                      (l = Yt(-1, n & -n)), (l.tag = 2);
                      var u = s.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (l.next = l)
                          : ((l.next = c.next), (c.next = l)),
                          (u.pending = l);
                      }
                    }
                    (s.lanes |= n),
                      (l = s.alternate),
                      l !== null && (l.lanes |= n),
                      ec(s.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (s.tag === 10) o = s.type === t.type ? null : s.child;
              else if (s.tag === 18) {
                if (((o = s.return), o === null)) throw Error(O(341));
                (o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  ec(o, n, t),
                  (o = s.sibling);
              } else o = s.child;
              if (o !== null) o.return = s;
              else
                for (o = s; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((s = o.sibling), s !== null)) {
                    (s.return = o.return), (o = s);
                    break;
                  }
                  o = o.return;
                }
              s = o;
            }
        Ve(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        qr(t, n),
        (i = mt(i)),
        (r = r(i)),
        (t.flags |= 1),
        Ve(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = vt(r, t.pendingProps)),
        (i = vt(r.type, i)),
        Oh(e, t, r, i, n)
      );
    case 15:
      return Ig(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : vt(r, i)),
        bo(e, t),
        (t.tag = 1),
        Qe(r) ? ((e = !0), oa(t)) : (e = !1),
        qr(t, n),
        lg(t, r, i),
        nc(t, r, i, n),
        sc(null, t, r, !0, e, n)
      );
    case 19:
      return Vg(e, t, n);
    case 22:
      return Lg(e, t, n);
  }
  throw Error(O(156, t.tag));
};
function ev(e, t) {
  return Ry(e, t);
}
function Qw(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function dt(e, t, n, r) {
  return new Qw(e, t, n, r);
}
function Bd(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Gw(e) {
  if (typeof e == "function") return Bd(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === sd)) return 11;
    if (e === od) return 14;
  }
  return 2;
}
function Ln(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = dt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Uo(e, t, n, r, i, s) {
  var o = 2;
  if (((r = e), typeof e == "function")) Bd(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Or:
        return hr(n.children, i, s, t);
      case id:
        (o = 8), (i |= 8);
        break;
      case Ru:
        return (
          (e = dt(12, n, t, i | 2)), (e.elementType = Ru), (e.lanes = s), e
        );
      case ku:
        return (e = dt(13, n, t, i)), (e.elementType = ku), (e.lanes = s), e;
      case _u:
        return (e = dt(19, n, t, i)), (e.elementType = _u), (e.lanes = s), e;
      case uy:
        return Ka(n, i, s, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case ay:
              o = 10;
              break e;
            case ly:
              o = 9;
              break e;
            case sd:
              o = 11;
              break e;
            case od:
              o = 14;
              break e;
            case hn:
              (o = 16), (r = null);
              break e;
          }
        throw Error(O(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = dt(o, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = s), t
  );
}
function hr(e, t, n, r) {
  return (e = dt(7, e, r, t)), (e.lanes = n), e;
}
function Ka(e, t, n, r) {
  return (
    (e = dt(22, e, r, t)),
    (e.elementType = uy),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Gl(e, t, n) {
  return (e = dt(6, e, null, t)), (e.lanes = n), e;
}
function ql(e, t, n) {
  return (
    (t = dt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function qw(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ol(0)),
    (this.expirationTimes = Ol(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ol(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function zd(e, t, n, r, i, s, o, a, l) {
  return (
    (e = new qw(e, t, n, a, l)),
    t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
    (s = dt(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (s.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ed(s),
    e
  );
}
function Yw(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: _r,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function tv(e) {
  if (!e) return bn;
  e = e._reactInternals;
  e: {
    if (xr(e) !== e || e.tag !== 1) throw Error(O(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Qe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(O(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Qe(n)) return eg(e, n, t);
  }
  return t;
}
function nv(e, t, n, r, i, s, o, a, l) {
  return (
    (e = zd(n, r, !0, e, i, s, o, a, l)),
    (e.context = tv(null)),
    (n = e.current),
    (r = be()),
    (i = In(n)),
    (s = Yt(r, i)),
    (s.callback = t ?? null),
    Mn(n, s, i),
    (e.current.lanes = i),
    Ks(e, i, r),
    Ge(e, r),
    e
  );
}
function Wa(e, t, n, r) {
  var i = t.current,
    s = be(),
    o = In(i);
  return (
    (n = tv(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Yt(s, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Mn(i, t, o)),
    e !== null && (Ct(e, i, o, s), No(e, i, o)),
    o
  );
}
function Sa(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function zh(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ud(e, t) {
  zh(e, t), (e = e.alternate) && zh(e, t);
}
function Xw() {
  return null;
}
var rv =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function $d(e) {
  this._internalRoot = e;
}
Qa.prototype.render = $d.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(O(409));
  Wa(e, t, null, null);
};
Qa.prototype.unmount = $d.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Sr(function () {
      Wa(null, e, null, null);
    }),
      (t[nn] = null);
  }
};
function Qa(e) {
  this._internalRoot = e;
}
Qa.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Iy();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < yn.length && t !== 0 && t < yn[n].priority; n++);
    yn.splice(n, 0, e), n === 0 && Ay(e);
  }
};
function Hd(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ga(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Uh() {}
function Jw(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var s = r;
      r = function () {
        var u = Sa(o);
        s.call(u);
      };
    }
    var o = nv(t, r, e, 0, null, !1, !1, "", Uh);
    return (
      (e._reactRootContainer = o),
      (e[nn] = o.current),
      ys(e.nodeType === 8 ? e.parentNode : e),
      Sr(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var u = Sa(l);
      a.call(u);
    };
  }
  var l = zd(e, 0, !1, null, null, !1, !1, "", Uh);
  return (
    (e._reactRootContainer = l),
    (e[nn] = l.current),
    ys(e.nodeType === 8 ? e.parentNode : e),
    Sr(function () {
      Wa(t, l, n, r);
    }),
    l
  );
}
function qa(e, t, n, r, i) {
  var s = n._reactRootContainer;
  if (s) {
    var o = s;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var l = Sa(o);
        a.call(l);
      };
    }
    Wa(t, o, e, i);
  } else o = Jw(n, t, e, i, r);
  return Sa(o);
}
My = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $i(t.pendingLanes);
        n !== 0 &&
          (ud(t, n | 1), Ge(t, pe()), !(H & 6) && ((yi = pe() + 500), Kn()));
      }
      break;
    case 13:
      Sr(function () {
        var r = rn(e, 1);
        if (r !== null) {
          var i = be();
          Ct(r, e, 1, i);
        }
      }),
        Ud(e, 1);
  }
};
cd = function (e) {
  if (e.tag === 13) {
    var t = rn(e, 134217728);
    if (t !== null) {
      var n = be();
      Ct(t, e, 134217728, n);
    }
    Ud(e, 134217728);
  }
};
jy = function (e) {
  if (e.tag === 13) {
    var t = In(e),
      n = rn(e, t);
    if (n !== null) {
      var r = be();
      Ct(n, e, t, r);
    }
    Ud(e, t);
  }
};
Iy = function () {
  return G;
};
Ly = function (e, t) {
  var n = G;
  try {
    return (G = e), t();
  } finally {
    G = n;
  }
};
Vu = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Mu(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = ba(r);
            if (!i) throw Error(O(90));
            dy(r), Mu(r, i);
          }
        }
      }
      break;
    case "textarea":
      hy(e, n);
      break;
    case "select":
      (t = n.value), t != null && Kr(e, !!n.multiple, t, !1);
  }
};
wy = Fd;
xy = Sr;
var Zw = { usingClientEntryPoint: !1, Events: [Qs, Ir, ba, vy, Sy, Fd] },
  Vi = {
    findFiberByHostInstance: er,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  ex = {
    bundleType: Vi.bundleType,
    version: Vi.version,
    rendererPackageName: Vi.rendererPackageName,
    rendererConfig: Vi.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: an.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Ey(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Vi.findFiberByHostInstance || Xw,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var To = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!To.isDisabled && To.supportsFiber)
    try {
      (Aa = To.inject(ex)), (At = To);
    } catch {}
}
tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zw;
tt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Hd(t)) throw Error(O(200));
  return Yw(e, t, null, n);
};
tt.createRoot = function (e, t) {
  if (!Hd(e)) throw Error(O(299));
  var n = !1,
    r = "",
    i = rv;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = zd(e, 1, !1, null, null, n, !1, r, i)),
    (e[nn] = t.current),
    ys(e.nodeType === 8 ? e.parentNode : e),
    new $d(t)
  );
};
tt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(O(188))
      : ((e = Object.keys(e).join(",")), Error(O(268, e)));
  return (e = Ey(t)), (e = e === null ? null : e.stateNode), e;
};
tt.flushSync = function (e) {
  return Sr(e);
};
tt.hydrate = function (e, t, n) {
  if (!Ga(t)) throw Error(O(200));
  return qa(null, e, t, !0, n);
};
tt.hydrateRoot = function (e, t, n) {
  if (!Hd(e)) throw Error(O(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    s = "",
    o = rv;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = nv(t, null, e, 1, n ?? null, i, !1, s, o)),
    (e[nn] = t.current),
    ys(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Qa(t);
};
tt.render = function (e, t, n) {
  if (!Ga(t)) throw Error(O(200));
  return qa(null, e, t, !1, n);
};
tt.unmountComponentAtNode = function (e) {
  if (!Ga(e)) throw Error(O(40));
  return e._reactRootContainer
    ? (Sr(function () {
        qa(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[nn] = null);
        });
      }),
      !0)
    : !1;
};
tt.unstable_batchedUpdates = Fd;
tt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ga(n)) throw Error(O(200));
  if (e == null || e._reactInternals === void 0) throw Error(O(38));
  return qa(e, t, n, !1, r);
};
tt.version = "18.2.0-next-9e3b772b8-20220608";
function iv() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(iv);
    } catch (e) {
      console.error(e);
    }
}
iv(), (ny.exports = tt);
var sv = ny.exports;
const tx = Yc(sv);
var $h = sv;
(Eu.createRoot = $h.createRoot), (Eu.hydrateRoot = $h.hydrateRoot);
const Hh = "pushstate",
  Kh = "popstate",
  ov = "beforeunload",
  av = (e) => (e.preventDefault(), (e.returnValue = "")),
  nx = () => {
    removeEventListener(ov, av, { capture: !0 });
  };
function lv(e) {
  let t = e.getLocation(),
    n = new Set(),
    r = [];
  const i = () => {
      (t = e.getLocation()), n.forEach((o) => o());
    },
    s = async (o) => {
      var a;
      if (typeof document < "u" && r.length) {
        for (let l of r)
          if (!(await l())) {
            (a = e.onBlocked) == null || a.call(e, i);
            return;
          }
      }
      o();
    };
  return {
    get location() {
      return t;
    },
    subscribe: (o) => (
      n.add(o),
      () => {
        n.delete(o);
      }
    ),
    push: (o, a) => {
      (a = Wh(a)),
        s(() => {
          e.pushState(o, a), i();
        });
    },
    replace: (o, a) => {
      (a = Wh(a)),
        s(() => {
          e.replaceState(o, a), i();
        });
    },
    go: (o) => {
      s(() => {
        e.go(o);
      });
    },
    back: () => {
      s(() => {
        e.back();
      });
    },
    forward: () => {
      s(() => {
        e.forward();
      });
    },
    createHref: (o) => e.createHref(o),
    block: (o) => (
      r.push(o),
      r.length === 1 && addEventListener(ov, av, { capture: !0 }),
      () => {
        (r = r.filter((a) => a !== o)), r.length || nx();
      }
    ),
    flush: () => {
      var o;
      return (o = e.flush) == null ? void 0 : o.call(e);
    },
    destroy: () => {
      var o;
      return (o = e.destroy) == null ? void 0 : o.call(e);
    },
    notify: i,
  };
}
function Wh(e) {
  return e || (e = {}), { ...e, key: uv() };
}
function rx(e) {
  const t =
      (e == null ? void 0 : e.window) ??
      (typeof document < "u" ? window : void 0),
    n = (e == null ? void 0 : e.createHref) ?? ((p) => p),
    r =
      (e == null ? void 0 : e.parseLocation) ??
      (() =>
        gc(
          `${t.location.pathname}${t.location.search}${t.location.hash}`,
          t.history.state
        ));
  let i = r(),
    s;
  const o = () => i;
  let a,
    l = !0,
    u;
  const c = (p) => {
      (l = !1), p(), (l = !0);
    },
    d = () => {
      c(() => {
        a &&
          (t.history[a.isPush ? "pushState" : "replaceState"](
            a.state,
            "",
            a.href
          ),
          (a = void 0),
          (u = void 0),
          (s = void 0));
      });
    },
    f = (p, h, v) => {
      const x = n(h);
      u || (s = i),
        (i = gc(h, v)),
        (a = {
          href: x,
          state: v,
          isPush: (a == null ? void 0 : a.isPush) || p === "push",
        }),
        u || (u = Promise.resolve().then(() => d()));
    },
    g = () => {
      (i = r()), w.notify();
    };
  var m = t.history.pushState,
    y = t.history.replaceState;
  const w = lv({
    getLocation: o,
    pushState: (p, h) => f("push", p, h),
    replaceState: (p, h) => f("replace", p, h),
    back: () => t.history.back(),
    forward: () => t.history.forward(),
    go: (p) => t.history.go(p),
    createHref: (p) => n(p),
    flush: d,
    destroy: () => {
      (t.history.pushState = m),
        (t.history.replaceState = y),
        t.removeEventListener(Hh, g),
        t.removeEventListener(Kh, g);
    },
    onBlocked: (p) => {
      s && i !== s && ((i = s), p());
    },
  });
  return (
    t.addEventListener(Hh, g),
    t.addEventListener(Kh, g),
    (t.history.pushState = function () {
      let p = m.apply(t.history, arguments);
      return l && w.notify(), p;
    }),
    (t.history.replaceState = function () {
      let p = y.apply(t.history, arguments);
      return l && w.notify(), p;
    }),
    w
  );
}
function ix(e = { initialEntries: ["/"] }) {
  const t = e.initialEntries;
  let n = e.initialIndex ?? t.length - 1,
    r = { key: uv() };
  return lv({
    getLocation: () => gc(t[n], r),
    pushState: (s, o) => {
      (r = o), t.push(s), n++;
    },
    replaceState: (s, o) => {
      (r = o), (t[n] = s);
    },
    back: () => {
      n--;
    },
    forward: () => {
      n = Math.min(n + 1, t.length - 1);
    },
    go: (s) => {
      n = Math.min(Math.max(n + s, 0), t.length - 1);
    },
    createHref: (s) => s,
  });
}
function gc(e, t) {
  let n = e.indexOf("#"),
    r = e.indexOf("?");
  return {
    href: e,
    pathname: e.substring(
      0,
      n > 0 ? (r > 0 ? Math.min(n, r) : n) : r > 0 ? r : e.length
    ),
    hash: n > -1 ? e.substring(n) : "",
    search: r > -1 ? e.slice(r, n === -1 ? void 0 : n) : "",
    state: t || {},
  };
}
function uv() {
  return (Math.random() + 1).toString(36).substring(7);
}
var sx = "Invariant failed";
function Me(e, t) {
  if (!e) throw new Error(sx);
}
let Yl = T.createContext(null);
function cv() {
  return typeof document > "u"
    ? Yl
    : window.__TSR_ROUTER_CONTEXT__
    ? window.__TSR_ROUTER_CONTEXT__
    : ((window.__TSR_ROUTER_CONTEXT__ = Yl), Yl);
}
function Vt(e) {
  const t = T.useContext(cv());
  return e == null || e.warn, t;
}
var dv = { exports: {} },
  fv = {},
  hv = { exports: {} },
  pv = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gi = T;
function ox(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ax = typeof Object.is == "function" ? Object.is : ox,
  lx = gi.useState,
  ux = gi.useEffect,
  cx = gi.useLayoutEffect,
  dx = gi.useDebugValue;
function fx(e, t) {
  var n = t(),
    r = lx({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    s = r[1];
  return (
    cx(
      function () {
        (i.value = n), (i.getSnapshot = t), Xl(i) && s({ inst: i });
      },
      [e, n, t]
    ),
    ux(
      function () {
        return (
          Xl(i) && s({ inst: i }),
          e(function () {
            Xl(i) && s({ inst: i });
          })
        );
      },
      [e]
    ),
    dx(n),
    n
  );
}
function Xl(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ax(e, n);
  } catch {
    return !0;
  }
}
function hx(e, t) {
  return t();
}
var px =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? hx
    : fx;
pv.useSyncExternalStore =
  gi.useSyncExternalStore !== void 0 ? gi.useSyncExternalStore : px;
hv.exports = pv;
var mx = hv.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ya = T,
  yx = mx;
function gx(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var vx = typeof Object.is == "function" ? Object.is : gx,
  Sx = yx.useSyncExternalStore,
  wx = Ya.useRef,
  xx = Ya.useEffect,
  Px = Ya.useMemo,
  Cx = Ya.useDebugValue;
fv.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var s = wx(null);
  if (s.current === null) {
    var o = { hasValue: !1, value: null };
    s.current = o;
  } else o = s.current;
  s = Px(
    function () {
      function l(g) {
        if (!u) {
          if (((u = !0), (c = g), (g = r(g)), i !== void 0 && o.hasValue)) {
            var m = o.value;
            if (i(m, g)) return (d = m);
          }
          return (d = g);
        }
        if (((m = d), vx(c, g))) return m;
        var y = r(g);
        return i !== void 0 && i(m, y) ? m : ((c = g), (d = y));
      }
      var u = !1,
        c,
        d,
        f = n === void 0 ? null : n;
      return [
        function () {
          return l(t());
        },
        f === null
          ? void 0
          : function () {
              return l(f());
            },
      ];
    },
    [t, n, r, i]
  );
  var a = Sx(e, s[0], s[1]);
  return (
    xx(
      function () {
        (o.hasValue = !0), (o.value = a);
      },
      [a]
    ),
    Cx(a),
    a
  );
};
dv.exports = fv;
var mv = dv.exports;
const Ex = Yc(mv);
var Tx = class {
  constructor(e, t) {
    (this.listeners = new Set()),
      (this._batching = !1),
      (this._flushing = 0),
      (this._nextPriority = null),
      (this.subscribe = (n) => {
        var i, s;
        this.listeners.add(n);
        const r =
          (s = (i = this.options) == null ? void 0 : i.onSubscribe) == null
            ? void 0
            : s.call(i, n, this);
        return () => {
          this.listeners.delete(n), r == null || r();
        };
      }),
      (this.setState = (n, r) => {
        var o, a, l, u, c;
        const i = this.state;
        this.state =
          (o = this.options) != null && o.updateFn
            ? this.options.updateFn(i)(n)
            : n(i);
        const s =
          (r == null ? void 0 : r.priority) ??
          ((a = this.options) == null ? void 0 : a.defaultPriority) ??
          "high";
        this._nextPriority === null
          ? (this._nextPriority = s)
          : this._nextPriority === "high"
          ? (this._nextPriority = s)
          : (this._nextPriority =
              ((l = this.options) == null ? void 0 : l.defaultPriority) ??
              "high"),
          (c = (u = this.options) == null ? void 0 : u.onUpdate) == null ||
            c.call(u, { priority: this._nextPriority }),
          this._flush();
      }),
      (this._flush = () => {
        if (this._batching) return;
        const n = ++this._flushing;
        this.listeners.forEach((r) => {
          this._flushing === n && r({ priority: this._nextPriority ?? "high" });
        });
      }),
      (this.batch = (n) => {
        if (this._batching) return n();
        (this._batching = !0), n(), (this._batching = !1), this._flush();
      }),
      (this.state = e),
      (this.options = t);
  }
};
function Rx(e, t = (n) => n) {
  return mv.useSyncExternalStoreWithSelector(
    e.subscribe,
    () => e.state,
    () => e.state,
    t,
    kx
  );
}
function kx(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !1;
  for (let r = 0; r < n.length; r++)
    if (
      !Object.prototype.hasOwnProperty.call(t, n[r]) ||
      !Object.is(e[n[r]], t[n[r]])
    )
      return !1;
  return !0;
}
function Kd(e) {
  const t = e.errorComponent ?? Xa;
  return S.jsx(_x, {
    getResetKey: e.getResetKey,
    onCatch: e.onCatch,
    children: ({ error: n }) =>
      n ? T.createElement(t, { error: n }) : e.children,
  });
}
class _x extends T.Component {
  constructor() {
    super(...arguments), (this.state = { error: null });
  }
  static getDerivedStateFromProps(t) {
    var n;
    return { resetKey: (n = t.getResetKey) == null ? void 0 : n.call(t) };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidUpdate(t, n) {
    n.error &&
      n.resetKey !== this.state.resetKey &&
      this.setState({ error: null });
  }
  componentDidCatch(t) {
    var n, r;
    this.props.onCatch
      ? (r = (n = this.props).onCatch) == null || r.call(n, t)
      : console.error(t);
  }
  render() {
    return this.props.children(this.state);
  }
}
function Xa({ error: e }) {
  const [t, n] = T.useState(!1);
  return S.jsxs("div", {
    style: { padding: ".5rem", maxWidth: "100%" },
    children: [
      S.jsxs("div", {
        style: { display: "flex", alignItems: "center", gap: ".5rem" },
        children: [
          S.jsx("strong", {
            style: { fontSize: "1rem" },
            children: "Something went wrong!",
          }),
          S.jsx("button", {
            style: {
              appearance: "none",
              fontSize: ".6em",
              border: "1px solid currentColor",
              padding: ".1rem .2rem",
              fontWeight: "bold",
              borderRadius: ".25rem",
            },
            onClick: () => n((r) => !r),
            children: t ? "Hide Error" : "Show Error",
          }),
        ],
      }),
      S.jsx("div", { style: { height: ".25rem" } }),
      t
        ? S.jsx("div", {
            children: S.jsx("pre", {
              style: {
                fontSize: ".7em",
                border: "1px solid red",
                borderRadius: ".25rem",
                padding: ".3rem",
                color: "red",
                overflow: "auto",
              },
              children: e.message
                ? S.jsx("code", { children: e.message })
                : null,
            }),
          })
        : null,
    ],
  });
}
function ht(e) {
  const t = Vt({ warn: (e == null ? void 0 : e.router) === void 0 });
  return Rx(
    ((e == null ? void 0 : e.router) || t).__store,
    e == null ? void 0 : e.select
  );
}
const yv = typeof document > "u";
function wa(e) {
  return e[e.length - 1];
}
function Ox(e) {
  return typeof e == "function";
}
function Br(e, t) {
  return Ox(e) ? e(t) : e;
}
function ns(e, t) {
  return t.reduce((n, r) => ((n[r] = e[r]), n), {});
}
function cn(e, t) {
  if (e === t) return e;
  const n = t,
    r = Gh(e) && Gh(n);
  if (r || (xa(e) && xa(n))) {
    const i = r ? e : Object.keys(e),
      s = i.length,
      o = r ? n : Object.keys(n),
      a = o.length,
      l = r ? [] : {};
    let u = 0;
    for (let c = 0; c < a; c++) {
      const d = r ? c : o[c];
      !r && e[d] === void 0 && n[d] === void 0 && i.includes(d)
        ? ((l[d] = void 0), u++)
        : ((l[d] = cn(e[d], n[d])), l[d] === e[d] && e[d] !== void 0 && u++);
    }
    return s === a && u === s ? e : l;
  }
  return n;
}
function xa(e) {
  if (!Qh(e)) return !1;
  const t = e.constructor;
  if (typeof t > "u") return !0;
  const n = t.prototype;
  return !(!Qh(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function Qh(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Gh(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ts(e, t, n = !1) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (xa(e) && xa(t)) {
    const r = Object.keys(e),
      i = Object.keys(t);
    return !n && r.length !== i.length
      ? !1
      : !i.some((s) => !(s in e) || !Ts(e[s], t[s], n));
  }
  return Array.isArray(e) && Array.isArray(t)
    ? !e.some((r, i) => !Ts(r, t[i], n))
    : !1;
}
const Jl = typeof window < "u" ? T.useLayoutEffect : T.useEffect;
function Dx(e) {
  return e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}
function Wt(e) {
  return !!(e != null && e.isNotFound);
}
function Mx(e) {
  const t = ht({
    select: (n) => `not-found-${n.location.pathname}-${n.status}`,
  });
  return S.jsx(Kd, {
    getResetKey: () => t,
    onCatch: (n) => {
      var r;
      if (Wt(n)) (r = e.onCatch) == null || r.call(e, n);
      else throw n;
    },
    errorComponent: ({ error: n }) => {
      var r;
      return (r = e.fallback) == null ? void 0 : r.call(e, n);
    },
    children: e.children,
  });
}
function jx() {
  return S.jsx("p", { children: "Not Found" });
}
function Ut(e) {
  return !!(e != null && e.isRedirect);
}
const Ja = T.createContext(void 0);
function qh() {
  const e = Vt(),
    t = ht({
      select: (n) => {
        var r;
        return (r = Et(n)[0]) == null ? void 0 : r.id;
      },
    });
  return S.jsx(Ja.Provider, {
    value: t,
    children: S.jsx(Kd, {
      getResetKey: () => {
        var n;
        return (n = e.state.resolvedLocation.state) == null ? void 0 : n.key;
      },
      errorComponent: Xa,
      onCatch: (n) => {
        console.error(n);
      },
      children: t ? S.jsx(gv, { matchId: t }) : null,
    }),
  });
}
function Zl(e) {
  return S.jsx(S.Fragment, { children: e.children });
}
function gv({ matchId: e }) {
  var t, n, r, i;
  const s = Vt(),
    o = ht({
      select: (y) => {
        var w;
        return (w = Et(y).find((p) => p.id === e)) == null ? void 0 : w.routeId;
      },
    });
  Me(o);
  const a = s.routesById[o],
    l = a.options.pendingComponent ?? s.options.defaultPendingComponent,
    u = l ? S.jsx(l, {}) : null,
    c = a.options.errorComponent ?? s.options.defaultErrorComponent ?? Xa,
    d = a.isRoot
      ? a.options.notFoundComponent ??
        ((t = s.options.notFoundRoute) == null ? void 0 : t.options.component)
      : a.options.notFoundComponent,
    f =
      a.options.wrapInSuspense ??
      l ??
      ((n = a.options.component) == null ? void 0 : n.preload) ??
      ((r = a.options.pendingComponent) == null ? void 0 : r.preload) ??
      ((i = a.options.errorComponent) == null ? void 0 : i.preload)
        ? T.Suspense
        : Zl,
    g = c ? Kd : Zl,
    m = d ? Mx : Zl;
  return S.jsx(Ja.Provider, {
    value: e,
    children: S.jsx(f, {
      fallback: u,
      children: S.jsx(g, {
        getResetKey: () => {
          var y;
          return (y = s.state.resolvedLocation.state) == null ? void 0 : y.key;
        },
        errorComponent: c,
        onCatch: (y) => {
          if (Wt(y)) throw y;
          console.error(y);
        },
        children: S.jsx(m, {
          fallback: (y) => {
            if (
              !d ||
              (y.routeId && y.routeId !== o) ||
              (!y.routeId && !a.isRoot)
            )
              throw y;
            return T.createElement(d, y);
          },
          children: S.jsx(Ix, { matchId: e, pendingElement: u }),
        }),
      }),
    }),
  });
}
function Ix({ matchId: e, pendingElement: t }) {
  var n, r;
  const i = Vt(),
    s = ht({
      select: (u) => {
        var c;
        return (c = Et(u).find((d) => d.id === e)) == null ? void 0 : c.routeId;
      },
    }),
    o = i.routesById[s],
    a = ht({
      select: (u) =>
        ns(
          Et(u).find((c) => c.id === e),
          ["status", "error", "showPending", "loadPromise"]
        ),
    }),
    l = (o.options.errorComponent ?? i.options.defaultErrorComponent) || Xa;
  if (a.status === "notFound") {
    let u;
    return (
      Yh(a.error)
        ? (u = (
            ((n = i.options.errorSerializer) == null
              ? void 0
              : n.deserialize) ?? Xh
          )(a.error.data))
        : (u = a.error),
      Me(Wt(u)),
      vv(i, o, u)
    );
  }
  if (a.status === "redirected") return Me(Ut(a.error)), null;
  if (a.status === "error") {
    if (yv) return S.jsx(l, { error: a.error, info: { componentStack: "" } });
    throw Yh(a.error)
      ? (
          ((r = i.options.errorSerializer) == null ? void 0 : r.deserialize) ??
          Xh
        )(a.error.data)
      : a.error;
  }
  if (a.status === "pending") {
    if (a.showPending) return t;
    throw a.loadPromise;
  }
  if (a.status === "success") {
    let u = o.options.component ?? i.options.defaultComponent;
    return u ? S.jsx(u, {}) : S.jsx(Wd, {});
  }
  Me(!1);
}
const Wd = T.memo(function () {
  const t = Vt(),
    n = T.useContext(Ja),
    r = ht({
      select: (a) => {
        var l;
        return (l = Et(a).find((u) => u.id === n)) == null ? void 0 : l.routeId;
      },
    }),
    i = t.routesById[r],
    { parentGlobalNotFound: s } = ht({
      select: (a) => {
        const u = Et(a).find((c) => c.id === n);
        return Me(u), { parentGlobalNotFound: u.globalNotFound };
      },
    }),
    o = ht({
      select: (a) => {
        var l;
        const u = Et(a),
          c = u.findIndex((d) => d.id === n);
        return (l = u[c + 1]) == null ? void 0 : l.id;
      },
    });
  return s ? vv(t, i, void 0) : o ? S.jsx(gv, { matchId: o }) : null;
});
function vv(e, t, n) {
  return t.options.notFoundComponent
    ? S.jsx(t.options.notFoundComponent, { data: n })
    : e.options.defaultNotFoundComponent
    ? S.jsx(e.options.defaultNotFoundComponent, { data: n })
    : S.jsx(jx, {});
}
function Et(e) {
  var t;
  return (t = e.pendingMatches) != null && t.some((n) => n.showPending)
    ? e.pendingMatches
    : e.matches;
}
function Bn(e) {
  var t;
  const n = Vt(),
    r = T.useContext(Ja),
    i = (t = Et(n.state).find((a) => a.id === r)) == null ? void 0 : t.routeId,
    s = (() => {
      const a = Et(n.state);
      return (
        e != null && e.from
          ? a.find((u) => u.routeId === (e == null ? void 0 : e.from))
          : a.find((u) => u.id === r)
      ).routeId;
    })();
  return (
    ((e == null ? void 0 : e.strict) ?? !0) && Me(i == s),
    ht({
      select: (a) => {
        const l = Et(a).find((u) =>
          e != null && e.from
            ? (e == null ? void 0 : e.from) === u.routeId
            : u.id === r
        );
        return (
          Me(
            l,
            `Could not find ${
              e != null && e.from
                ? `an active match from "${e.from}"`
                : "a nearest match!"
            }`
          ),
          e != null && e.select ? e.select(l) : l
        );
      },
    })
  );
}
function Lx(e) {
  return Bn({
    ...e,
    select: (t) =>
      typeof e.select == "function"
        ? e.select(t == null ? void 0 : t.loaderDeps)
        : t == null
        ? void 0
        : t.loaderDeps,
  });
}
function Ax(e) {
  return Bn({
    ...e,
    select: (t) =>
      typeof e.select == "function"
        ? e.select(t == null ? void 0 : t.loaderData)
        : t == null
        ? void 0
        : t.loaderData,
  });
}
function Yh(e) {
  return !(typeof e == "object" && e && "data" in e) ||
    !("__isServerError" in e && e.__isServerError) ||
    !(typeof e.data == "object" && e.data)
    ? !1
    : e.__isServerError === !0;
}
function Xh(e) {
  if ("name" in e && "message" in e) {
    const t = new Error(e.message);
    return (t.name = e.name), t;
  }
  return e.data;
}
function An(e) {
  return Za(e.filter(Boolean).join("/"));
}
function Za(e) {
  return e.replace(/\/{2,}/g, "/");
}
function Qd(e) {
  return e === "/" ? e : e.replace(/^\/{1,}/, "");
}
function $o(e) {
  return e === "/" ? e : e.replace(/\/{1,}$/, "");
}
function Nx(e) {
  return $o(Qd(e));
}
function Fx(e, t, n) {
  (t = t.replace(new RegExp(`^${e}`), "/")),
    (n = n.replace(new RegExp(`^${e}`), "/"));
  let r = vi(t);
  const i = vi(n);
  i.forEach((o, a) => {
    var l;
    if (o.value === "/") a ? a === i.length - 1 && r.push(o) : (r = [o]);
    else if (o.value === "..")
      r.length > 1 &&
        ((l = wa(r)) == null ? void 0 : l.value) === "/" &&
        r.pop(),
        r.pop();
    else {
      if (o.value === ".") return;
      r.push(o);
    }
  });
  const s = An([e, ...r.map((o) => o.value)]);
  return Za(s);
}
function vi(e) {
  if (!e) return [];
  e = Za(e);
  const t = [];
  if (
    (e.slice(0, 1) === "/" &&
      ((e = e.substring(1)), t.push({ type: "pathname", value: "/" })),
    !e)
  )
    return t;
  const n = e.split("/").filter(Boolean);
  return (
    t.push(
      ...n.map((r) =>
        r === "$" || r === "*"
          ? { type: "wildcard", value: r }
          : r.charAt(0) === "$"
          ? { type: "param", value: r }
          : { type: "pathname", value: r }
      )
    ),
    e.slice(-1) === "/" &&
      ((e = e.substring(1)), t.push({ type: "pathname", value: "/" })),
    t
  );
}
function eu({ path: e, params: t, leaveWildcards: n, leaveParams: r }) {
  const i = vi(e);
  return An(
    i.map((s) => {
      if (s.type === "wildcard") {
        const o = t._splat;
        return n ? `${s.value}${o ?? ""}` : o;
      }
      if (s.type === "param") {
        if (r) {
          const o = t[s.value];
          return `${s.value}${o ?? ""}`;
        }
        return t[s.value.substring(1)] ?? "undefined";
      }
      return s.value;
    })
  );
}
function tu(e, t, n) {
  const r = Vx(e, t, n);
  if (!(n.to && !r)) return r ?? {};
}
function Jh(e, t) {
  return e != "/" ? t.replace(e, "") : t;
}
function Vx(e, t, n) {
  t = Jh(e, t);
  const r = Jh(e, `${n.to ?? "$"}`),
    i = vi(t),
    s = vi(r);
  t.startsWith("/") || i.unshift({ type: "pathname", value: "/" }),
    r.startsWith("/") || s.unshift({ type: "pathname", value: "/" });
  const o = {};
  return (() => {
    for (let l = 0; l < Math.max(i.length, s.length); l++) {
      const u = i[l],
        c = s[l],
        d = l >= i.length - 1,
        f = l >= s.length - 1;
      if (c) {
        if (c.type === "wildcard") {
          if (u != null && u.value) {
            const g = decodeURI(An(i.slice(l).map((m) => m.value)));
            return (o["*"] = g), (o._splat = g), !0;
          }
          return !1;
        }
        if (c.type === "pathname") {
          if (c.value === "/" && !(u != null && u.value)) return !0;
          if (u) {
            if (n.caseSensitive) {
              if (c.value !== u.value) return !1;
            } else if (c.value.toLowerCase() !== u.value.toLowerCase())
              return !1;
          }
        }
        if (!u) return !1;
        if (c.type === "param") {
          if ((u == null ? void 0 : u.value) === "/") return !1;
          u.value.charAt(0) !== "$" &&
            (o[c.value.substring(1)] = decodeURI(u.value));
        }
      }
      if (!d && f)
        return (
          (o["**"] = An(i.slice(l + 1).map((g) => g.value))),
          !!n.fuzzy && (c == null ? void 0 : c.value) !== "/"
        );
    }
    return !0;
  })()
    ? o
    : void 0;
}
function bx(e) {
  return ht({
    select: (t) => {
      var n;
      const r = (n = wa(Et(t))) == null ? void 0 : n.params;
      return e != null && e.select ? e.select(r) : r;
    },
  });
}
function Bx(e) {
  return Bn({
    ...e,
    select: (t) => (e != null && e.select ? e.select(t.search) : t.search),
  });
}
const lt = "__root__";
class Sv {
  constructor(t) {
    (this.init = (n) => {
      var r, i;
      this.originalIndex = n.originalIndex;
      const s = this.options,
        o = !(s != null && s.path) && !(s != null && s.id);
      (this.parentRoute =
        (i = (r = this.options) == null ? void 0 : r.getParentRoute) == null
          ? void 0
          : i.call(r)),
        o ? (this.path = lt) : Me(this.parentRoute);
      let a = o ? lt : s.path;
      a && a !== "/" && (a = Qd(a));
      const l = (s == null ? void 0 : s.id) || a;
      let u = o
        ? lt
        : An([this.parentRoute.id === lt ? "" : this.parentRoute.id, l]);
      a === lt && (a = "/"), u !== lt && (u = An(["/", u]));
      const c = u === lt ? "/" : An([this.parentRoute.fullPath, a]);
      (this.path = a), (this.id = u), (this.fullPath = c), (this.to = c);
    }),
      (this.addChildren = (n) => ((this.children = n), this)),
      (this.updateLoader = (n) => (Object.assign(this.options, n), this)),
      (this.update = (n) => (Object.assign(this.options, n), this)),
      (this.lazy = (n) => ((this.lazyFn = n), this)),
      (this.useMatch = (n) => Bn({ ...n, from: this.id })),
      (this.useRouteContext = (n) =>
        Bn({
          ...n,
          from: this.id,
          select: (r) =>
            n != null && n.select ? n.select(r.context) : r.context,
        })),
      (this.useSearch = (n) => Bx({ ...n, from: this.id })),
      (this.useParams = (n) => bx({ ...n, from: this.id })),
      (this.useLoaderDeps = (n) => Lx({ ...n, from: this.id })),
      (this.useLoaderData = (n) => Ax({ ...n, from: this.id })),
      (this.options = t || {}),
      (this.isRoot = !(t != null && t.getParentRoute)),
      Me(!(t != null && t.id && t != null && t.path)),
      (this.$$typeof = Symbol.for("react.memo"));
  }
}
function Ri(e) {
  return new Sv(e);
}
class zx extends Sv {
  constructor(t) {
    super(t);
  }
}
function Ux(e) {
  return new zx(e);
}
function $x(e, t) {
  var n,
    r,
    i,
    s = "";
  for (n in e)
    if ((i = e[n]) !== void 0)
      if (Array.isArray(i))
        for (r = 0; r < i.length; r++)
          s && (s += "&"),
            (s += encodeURIComponent(n) + "=" + encodeURIComponent(i[r]));
      else
        s && (s += "&"),
          (s += encodeURIComponent(n) + "=" + encodeURIComponent(i));
  return (t || "") + s;
}
function Zh(e) {
  if (!e) return "";
  var t = decodeURIComponent(e);
  return t === "false"
    ? !1
    : t === "true"
    ? !0
    : +t * 0 === 0 && +t + "" === t
    ? +t
    : t;
}
function Hx(e, t) {
  for (
    var n, r, i = {}, s = (t ? e.substr(t.length) : e).split("&");
    (n = s.shift());

  )
    (n = n.split("=")),
      (r = n.shift()),
      i[r] !== void 0
        ? (i[r] = [].concat(i[r], Zh(n.shift())))
        : (i[r] = Zh(n.shift()));
  return i;
}
const Kx = Qx(JSON.parse),
  Wx = Gx(JSON.stringify, JSON.parse);
function Qx(e) {
  return (t) => {
    t.substring(0, 1) === "?" && (t = t.substring(1));
    let n = Hx(t);
    for (let r in n) {
      const i = n[r];
      if (typeof i == "string")
        try {
          n[r] = e(i);
        } catch {}
    }
    return n;
  };
}
function Gx(e, t) {
  function n(r) {
    if (typeof r == "object" && r !== null)
      try {
        return e(r);
      } catch {}
    else if (typeof r == "string" && typeof t == "function")
      try {
        return t(r), e(r);
      } catch {}
    return r;
  }
  return (r) => {
    (r = { ...r }),
      r &&
        Object.keys(r).forEach((s) => {
          const o = r[s];
          typeof o > "u" || o === void 0 ? delete r[s] : (r[s] = n(o));
        });
    const i = $x(r).toString();
    return i ? `?${i}` : "";
  };
}
const qx =
  T.useTransition ||
  (() => [
    !1,
    (e) => {
      e();
    },
  ]);
function Yx({ router: e, ...t }) {
  e.update({
    ...e.options,
    ...t,
    context: { ...e.options.context, ...(t == null ? void 0 : t.context) },
  });
  const n = e.options.InnerWrap
      ? S.jsx(e.options.InnerWrap, { children: S.jsx(qh, {}) })
      : S.jsx(qh, {}),
    r = cv(),
    i = S.jsxs(r.Provider, { value: e, children: [n, S.jsx(Xx, {})] });
  return e.options.Wrap ? S.jsx(e.options.Wrap, { children: i }) : i;
}
function Xx() {
  const e = Vt(),
    t = T.useRef({ router: e, mounted: !1 }),
    n = ht({
      select: (o) =>
        ns(o, ["isLoading", "location", "resolvedLocation", "isTransitioning"]),
    }),
    [r, i] = qx();
  (e.startReactTransition = i),
    T.useEffect(() => {
      r && e.__store.setState((o) => ({ ...o, isTransitioning: r }));
    }, [r]);
  const s = () => {
    ((a) => {
      n.isTransitioning ? a() : i(() => a());
    })(() => {
      try {
        e.load();
      } catch (a) {
        console.error(a);
      }
    });
  };
  return (
    Jl(() => {
      const o = e.history.subscribe(() => {
          (e.latestLocation = e.parseLocation(e.latestLocation)),
            e.state.location !== e.latestLocation && s();
        }),
        a = e.buildLocation({
          to: e.latestLocation.pathname,
          search: !0,
          params: !0,
          hash: !0,
          state: !0,
        });
      return (
        n.location.href !== a.href && e.commitLocation({ ...a, replace: !0 }),
        () => {
          o();
        }
      );
    }, [e.history]),
    Jl(() => {
      var o;
      if (
        T.useTransition
          ? n.isTransitioning && !r
          : !n.isLoading && n.resolvedLocation !== n.location
      ) {
        if (
          (e.emit({
            type: "onResolved",
            fromLocation: n.resolvedLocation,
            toLocation: n.location,
            pathChanged:
              n.location.href !==
              ((o = n.resolvedLocation) == null ? void 0 : o.href),
          }),
          document.querySelector && n.location.hash !== "")
        ) {
          const a = document.getElementById(n.location.hash);
          a && a.scrollIntoView();
        }
        e.__store.setState((a) => ({
          ...a,
          isTransitioning: !1,
          resolvedLocation: a.location,
        }));
      }
    }, [n.isTransitioning, r, n.isLoading, n.resolvedLocation, n.location]),
    Jl(() => {
      window.__TSR_DEHYDRATED__ ||
        (t.current.router === e && t.current.mounted) ||
        ((t.current = { router: e, mounted: !0 }), s());
    }, [e]),
    null
  );
}
function ep(e, t) {
  return [...e.cachedMatches, ...(e.pendingMatches ?? []), ...e.matches].find(
    (n) => n.id === t
  );
}
const Jx = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent",
];
function Zx(e) {
  return new eP(e);
}
class eP {
  constructor(t) {
    (this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
      (this.resetNextScroll = !0),
      (this.navigateTimeout = null),
      (this.latestLoadPromise = Promise.resolve()),
      (this.subscribers = new Set()),
      (this.injectedHtml = []),
      (this.startReactTransition = (n) => n()),
      (this.update = (n) => {
        n.notFoundRoute &&
          console.warn(
            "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/guide/not-found-errors#migrating-from-notfoundroute for more info."
          );
        const r = this.options;
        (this.options = { ...this.options, ...n }),
          (!this.basepath || (n.basepath && n.basepath !== r.basepath)) &&
            (n.basepath === void 0 || n.basepath === "" || n.basepath === "/"
              ? (this.basepath = "/")
              : (this.basepath = `/${Nx(n.basepath)}`)),
          (!this.history ||
            (this.options.history && this.options.history !== this.history)) &&
            ((this.history =
              this.options.history ??
              (typeof document < "u"
                ? rx()
                : ix({ initialEntries: [this.options.basepath || "/"] }))),
            (this.latestLocation = this.parseLocation())),
          this.options.routeTree !== this.routeTree &&
            ((this.routeTree = this.options.routeTree), this.buildRouteTree()),
          this.__store ||
            (this.__store = new Tx(rP(this.latestLocation), {
              onUpdate: () => {
                this.__store.state = {
                  ...this.state,
                  status:
                    this.state.isTransitioning || this.state.isLoading
                      ? "pending"
                      : "idle",
                  cachedMatches: this.state.cachedMatches.filter(
                    (i) => !["redirected"].includes(i.status)
                  ),
                };
              },
            }));
      }),
      (this.buildRouteTree = () => {
        (this.routesById = {}), (this.routesByPath = {});
        const n = this.options.notFoundRoute;
        n &&
          (n.init({ originalIndex: 99999999999 }), (this.routesById[n.id] = n));
        const r = (s) => {
          s.forEach((o, a) => {
            o.init({ originalIndex: a });
            const l = this.routesById[o.id];
            if (
              (Me(!l, `Duplicate routes found with id: ${String(o.id)}`),
              (this.routesById[o.id] = o),
              !o.isRoot && o.path)
            ) {
              const c = $o(o.fullPath);
              (!this.routesByPath[c] || o.fullPath.endsWith("/")) &&
                (this.routesByPath[c] = o);
            }
            const u = o.children;
            u != null && u.length && r(u);
          });
        };
        r([this.routeTree]);
        const i = [];
        Object.values(this.routesById).forEach((s, o) => {
          var a;
          if (s.isRoot || !s.path) return;
          const l = Qd(s.fullPath),
            u = vi(l);
          for (
            ;
            u.length > 1 && ((a = u[0]) == null ? void 0 : a.value) === "/";

          )
            u.shift();
          const c = u.map((d) =>
            d.value === "/"
              ? 0.75
              : d.type === "param"
              ? 0.5
              : d.type === "wildcard"
              ? 0.25
              : 1
          );
          i.push({ child: s, trimmed: l, parsed: u, index: o, scores: c });
        }),
          (this.flatRoutes = i
            .sort((s, o) => {
              const a = Math.min(s.scores.length, o.scores.length);
              for (let l = 0; l < a; l++)
                if (s.scores[l] !== o.scores[l])
                  return o.scores[l] - s.scores[l];
              if (s.scores.length !== o.scores.length)
                return o.scores.length - s.scores.length;
              for (let l = 0; l < a; l++)
                if (s.parsed[l].value !== o.parsed[l].value)
                  return s.parsed[l].value > o.parsed[l].value ? 1 : -1;
              return s.index - o.index;
            })
            .map((s, o) => ((s.child.rank = o), s.child)));
      }),
      (this.subscribe = (n, r) => {
        const i = { eventType: n, fn: r };
        return (
          this.subscribers.add(i),
          () => {
            this.subscribers.delete(i);
          }
        );
      }),
      (this.emit = (n) => {
        this.subscribers.forEach((r) => {
          r.eventType === n.type && r.fn(n);
        });
      }),
      (this.checkLatest = (n) =>
        this.latestLoadPromise !== n ? this.latestLoadPromise : void 0),
      (this.parseLocation = (n) => {
        const r = ({ pathname: a, search: l, hash: u, state: c }) => {
            const d = this.options.parseSearch(l),
              f = this.options.stringifySearch(d);
            return {
              pathname: a,
              searchStr: f,
              search: cn(n == null ? void 0 : n.search, d),
              hash: u.split("#").reverse()[0] ?? "",
              href: `${a}${f}${u}`,
              state: cn(n == null ? void 0 : n.state, c),
            };
          },
          i = r(this.history.location);
        let { __tempLocation: s, __tempKey: o } = i.state;
        if (s && (!o || o === this.tempLocationKey)) {
          const a = r(s);
          return (
            (a.state.key = i.state.key),
            delete a.state.__tempLocation,
            { ...a, maskedLocation: i }
          );
        }
        return i;
      }),
      (this.resolvePathWithBase = (n, r) => Fx(this.basepath, n, Za(r))),
      (this.matchRoutes = (n, r, i) => {
        let s = {},
          o = this.flatRoutes.find((g) => {
            const m = tu(this.basepath, $o(n), {
              to: g.fullPath,
              caseSensitive:
                g.options.caseSensitive ?? this.options.caseSensitive,
              fuzzy: !0,
            });
            return m ? ((s = m), !0) : !1;
          }),
          a = o || this.routesById[lt],
          l = [a],
          u = !1;
        for (
          (o ? o.path !== "/" && s["**"] : $o(n)) &&
          (this.options.notFoundRoute
            ? l.push(this.options.notFoundRoute)
            : (u = !0));
          a != null && a.parentRoute;

        )
          (a = a.parentRoute), a && l.unshift(a);
        const c = (() => {
            if (u) {
              if (this.options.notFoundMode !== "root")
                for (let g = l.length - 1; g >= 0; g--) {
                  const m = l[g];
                  if (m.children) return m.id;
                }
              return lt;
            }
          })(),
          d = l.map((g) => {
            let m;
            if (g.options.parseParams)
              try {
                const y = g.options.parseParams(s);
                Object.assign(s, y);
              } catch (y) {
                if (
                  ((m = new nP(y.message, { cause: y })),
                  i != null && i.throwOnError)
                )
                  throw m;
                return m;
              }
          }),
          f = [];
        return (
          l.forEach((g, m) => {
            var y, w, p, h, v, x;
            const E = f[m - 1],
              [k, _] = (() => {
                const Q = (E == null ? void 0 : E.search) ?? r;
                try {
                  const se =
                    typeof g.options.validateSearch == "object"
                      ? g.options.validateSearch.parse
                      : g.options.validateSearch;
                  let $ = (se == null ? void 0 : se(Q)) ?? {};
                  return [{ ...Q, ...$ }, void 0];
                } catch (se) {
                  const $ = new tP(se.message, { cause: se });
                  if (i != null && i.throwOnError) throw $;
                  return [Q, $];
                }
              })(),
              C =
                ((w = (y = g.options).loaderDeps) == null
                  ? void 0
                  : w.call(y, { search: k })) ?? "",
              M = C ? JSON.stringify(C) : "",
              I = eu({ path: g.fullPath, params: s }),
              K = eu({ path: g.id, params: s, leaveWildcards: !0 }) + M;
            let W = ep(this.state, K);
            const ce = this.state.matches.find((Q) => Q.id === K)
                ? "stay"
                : "enter",
              ie = W
                ? { ...W, cause: ce, params: s }
                : {
                    id: K,
                    routeId: g.id,
                    params: s,
                    pathname: An([this.basepath, I]),
                    updatedAt: Date.now(),
                    search: {},
                    searchError: void 0,
                    status: "pending",
                    showPending: !1,
                    isFetching: !1,
                    error: void 0,
                    paramsError: d[m],
                    loadPromise: Promise.resolve(),
                    routeContext: void 0,
                    context: void 0,
                    abortController: new AbortController(),
                    fetchCount: 0,
                    cause: ce,
                    loaderDeps: C,
                    invalid: !1,
                    preload: !1,
                    links:
                      (h = (p = g.options).links) == null ? void 0 : h.call(p),
                    scripts:
                      (x = (v = g.options).scripts) == null
                        ? void 0
                        : x.call(v),
                    staticData: g.options.staticData || {},
                  };
            (i != null && i.preload) || (ie.globalNotFound = c === g.id),
              (ie.search = cn(ie.search, k)),
              (ie.searchError = _),
              f.push(ie);
          }),
          f
        );
      }),
      (this.cancelMatch = (n) => {}),
      (this.cancelMatches = () => {
        var n;
        (n = this.state.pendingMatches) == null ||
          n.forEach((r) => {
            this.cancelMatch(r.id);
          });
      }),
      (this.buildLocation = (n) => {
        const r = (s = {}, o) => {
            var a, l, u;
            const c = this.state.pendingMatches || this.state.matches,
              d =
                ((a = c[c.length - 1]) == null ? void 0 : a.search) ||
                this.latestLocation.search,
              f = this.matchRoutes(this.latestLocation.pathname, d),
              g =
                o == null
                  ? void 0
                  : o.filter((W) =>
                      f == null
                        ? void 0
                        : f.find((ce) => ce.routeId === W.routeId)
                    ),
              m =
                this.looseRoutesById[(l = wa(f)) == null ? void 0 : l.routeId];
            let y = s.to
              ? this.resolvePathWithBase(
                  s.from ?? this.latestLocation.pathname,
                  `${s.to}`
                )
              : this.resolvePathWithBase(
                  m == null ? void 0 : m.fullPath,
                  m == null ? void 0 : m.fullPath
                );
            const w = { ...((u = wa(f)) == null ? void 0 : u.params) };
            let p = (s.params ?? !0) === !0 ? w : { ...w, ...Br(s.params, w) };
            Object.keys(p).length > 0 &&
              (o == null ||
                o
                  .map(
                    (W) =>
                      this.looseRoutesById[W.routeId].options.stringifyParams
                  )
                  .filter(Boolean)
                  .forEach((W) => {
                    p = { ...p, ...W(p) };
                  })),
              (y = eu({
                path: y,
                params: p ?? {},
                leaveWildcards: !1,
                leaveParams: n.leaveParams,
              }));
            const h =
                (g == null
                  ? void 0
                  : g
                      .map(
                        (W) =>
                          this.looseRoutesById[W.routeId].options
                            .preSearchFilters ?? []
                      )
                      .flat()
                      .filter(Boolean)) ?? [],
              v =
                (g == null
                  ? void 0
                  : g
                      .map(
                        (W) =>
                          this.looseRoutesById[W.routeId].options
                            .postSearchFilters ?? []
                      )
                      .flat()
                      .filter(Boolean)) ?? [],
              x =
                h != null && h.length
                  ? h == null
                    ? void 0
                    : h.reduce((W, ce) => ce(W), d)
                  : d,
              E =
                s.search === !0
                  ? x
                  : s.search
                  ? Br(s.search, x) ?? {}
                  : h != null && h.length
                  ? x
                  : {},
              k = v != null && v.length ? v.reduce((W, ce) => ce(W), E) : E,
              _ = cn(d, k),
              C = this.options.stringifySearch(_),
              M =
                s.hash === !0
                  ? this.latestLocation.hash
                  : s.hash
                  ? Br(s.hash, this.latestLocation.hash)
                  : void 0,
              I = M ? `#${M}` : "";
            let K =
              s.state === !0
                ? this.latestLocation.state
                : s.state
                ? Br(s.state, this.latestLocation.state)
                : {};
            return (
              (K = cn(this.latestLocation.state, K)),
              {
                pathname: y,
                search: _,
                searchStr: C,
                state: K,
                hash: M ?? "",
                href: `${y}${C}${I}`,
                unmaskOnReload: s.unmaskOnReload,
              }
            );
          },
          i = (s = {}, o) => {
            var a;
            let l = r(s),
              u = o ? r(o) : void 0;
            if (!u) {
              let m = {},
                y =
                  (a = this.options.routeMasks) == null
                    ? void 0
                    : a.find((w) => {
                        const p = tu(this.basepath, l.pathname, {
                          to: w.from,
                          caseSensitive: !1,
                          fuzzy: !1,
                        });
                        return p ? ((m = p), !0) : !1;
                      });
              y && ((o = { ...ns(n, ["from"]), ...y, params: m }), (u = r(o)));
            }
            const c = this.matchRoutes(l.pathname, l.search),
              d = u ? this.matchRoutes(u.pathname, u.search) : void 0,
              f = u ? r(o, d) : void 0,
              g = r(s, c);
            return f && (g.maskedLocation = f), g;
          };
        return n.mask ? i(n, { ...ns(n, ["from"]), ...n.mask }) : i(n);
      }),
      (this.commitLocation = async ({ startTransition: n, ...r }) => {
        if (
          (this.navigateTimeout && clearTimeout(this.navigateTimeout),
          !(this.latestLocation.href === r.href))
        ) {
          let { maskedLocation: s, ...o } = r;
          s &&
            ((o = {
              ...s,
              state: {
                ...s.state,
                __tempKey: void 0,
                __tempLocation: {
                  ...o,
                  search: o.searchStr,
                  state: {
                    ...o.state,
                    __tempKey: void 0,
                    __tempLocation: void 0,
                    key: void 0,
                  },
                },
              },
            }),
            (o.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) &&
              (o.state.__tempKey = this.tempLocationKey));
          const a = () => {
            this.history[r.replace ? "replace" : "push"](o.href, o.state);
          };
          n ?? !0 ? this.startReactTransition(a) : a();
        }
        return (
          (this.resetNextScroll = r.resetScroll ?? !0), this.latestLoadPromise
        );
      }),
      (this.buildAndCommitLocation = ({
        replace: n,
        resetScroll: r,
        startTransition: i,
        ...s
      } = {}) => {
        const o = this.buildLocation(s);
        return this.commitLocation({
          ...o,
          startTransition: i,
          replace: n,
          resetScroll: r,
        });
      }),
      (this.navigate = ({ from: n, to: r, ...i }) => {
        const s = String(r);
        let o;
        try {
          new URL(`${s}`), (o = !0);
        } catch {}
        return Me(!o), this.buildAndCommitLocation({ ...i, from: n, to: r });
      }),
      (this.loadMatches = async ({
        checkLatest: n,
        location: r,
        matches: i,
        preload: s,
      }) => {
        var o, a;
        let l, u;
        const c = (m, y) => {
            var w;
            const p =
                (w = this.state.pendingMatches) == null
                  ? void 0
                  : w.find((x) => x.id === m.id),
              h = this.state.matches.find((x) => x.id === m.id),
              v = p ? "pendingMatches" : h ? "matches" : "cachedMatches";
            this.__store.setState((x) => {
              var E, k;
              return {
                ...x,
                [v]:
                  y != null && y.remove
                    ? (E = x[v]) == null
                      ? void 0
                      : E.filter((_) => _.id !== m.id)
                    : (k = x[v]) == null
                    ? void 0
                    : k.map((_) => (_.id === m.id ? m : _)),
              };
            });
          },
          d = (m, y) => {
            throw (
              ((m = {
                ...m,
                status: Ut(y) ? "redirected" : Wt(y) ? "notFound" : "error",
                isFetching: !1,
                error: y,
              }),
              c(m),
              y.routeId || (y.routeId = m.routeId),
              y)
            );
          };
        for (let [m, y] of i.entries()) {
          const w = i[m - 1],
            p = this.looseRoutesById[y.routeId],
            h = new AbortController(),
            v = (x, E) => {
              var k, _;
              (x.routerCode = E), (u = u ?? m), (Ut(x) || Wt(x)) && d(y, x);
              try {
                (_ = (k = p.options).onError) == null || _.call(k, x);
              } catch (C) {
                (x = C), (Ut(x) || Wt(x)) && d(y, C);
              }
              i[m] = y = {
                ...y,
                error: x,
                status: "error",
                updatedAt: Date.now(),
                abortController: new AbortController(),
              };
            };
          y.paramsError && v(y.paramsError, "PARSE_PARAMS"),
            y.searchError && v(y.searchError, "VALIDATE_SEARCH");
          try {
            const x =
                (w == null ? void 0 : w.context) ?? this.options.context ?? {},
              E = p.options.pendingMs ?? this.options.defaultPendingMs,
              k =
                typeof E == "number" && E <= 0
                  ? Promise.resolve()
                  : new Promise((M) => setTimeout(M, E)),
              _ =
                (await ((a = (o = p.options).beforeLoad) == null
                  ? void 0
                  : a.call(o, {
                      search: y.search,
                      abortController: h,
                      params: y.params,
                      preload: !!s,
                      context: x,
                      location: r,
                      navigate: (M) =>
                        this.navigate({ ...M, from: y.pathname }),
                      buildLocation: this.buildLocation,
                      cause: s ? "preload" : y.cause,
                    }))) ?? {};
            (Ut(_) || Wt(_)) && v(_, "BEFORE_LOAD");
            const C = { ...x, ..._ };
            i[m] = y = {
              ...y,
              routeContext: cn(y.routeContext, _),
              context: cn(y.context, C),
              abortController: h,
              pendingPromise: k,
            };
          } catch (x) {
            v(x, "BEFORE_LOAD");
            break;
          }
        }
        const f = i.slice(0, u),
          g = [];
        return (
          f.forEach((m, y) => {
            g.push(
              new Promise(async (w, p) => {
                var h;
                const v = g[y - 1],
                  x = this.looseRoutesById[m.routeId],
                  E = ($) => {
                    (Ut($) || Wt($)) && d(m, $);
                  };
                let k;
                i[y] = m = { ...m, showPending: !1 };
                let _ = !1;
                const C = x.options.pendingMs ?? this.options.defaultPendingMs,
                  M =
                    x.options.pendingMinMs ?? this.options.defaultPendingMinMs,
                  I = {
                    params: m.params,
                    deps: m.loaderDeps,
                    preload: !!s,
                    parentMatchPromise: v,
                    abortController: m.abortController,
                    context: m.context,
                    location: r,
                    navigate: ($) => this.navigate({ ...$, from: m.pathname }),
                    cause: s ? "preload" : m.cause,
                    route: x,
                  },
                  K = async () => {
                    var $, D, F, V, Y, oe, zt, ke, Rt, Ue;
                    try {
                      if (m.isFetching)
                        k =
                          ($ = ep(this.state, m.id)) == null
                            ? void 0
                            : $.loadPromise;
                      else {
                        i[y] = m = {
                          ...m,
                          isFetching: !0,
                          fetchCount: m.fetchCount + 1,
                        };
                        const Rr =
                            ((D = x.lazyFn) == null
                              ? void 0
                              : D.call(x).then((Qn) => {
                                  Object.assign(x.options, Qn.options);
                                })) || Promise.resolve(),
                          xl = Rr.then(() =>
                            Promise.all(
                              Jx.map(async (Qn) => {
                                const Di = x.options[Qn];
                                Di != null &&
                                  Di.preload &&
                                  (await Di.preload());
                              })
                            )
                          ),
                          Pl =
                            (V = (F = x.options).loader) == null
                              ? void 0
                              : V.call(F, I);
                        k = Promise.all([xl, Pl, Rr]).then((Qn) => Qn[1]);
                      }
                      (i[y] = m = { ...m, loadPromise: k }), c(m);
                      const B = await k;
                      if ((l = n())) return await l;
                      if (
                        (E(B),
                        _ &&
                          M &&
                          (await new Promise((Rr) => setTimeout(Rr, M))),
                        (l = n()))
                      )
                        return await l;
                      const [ye, oo] = await Promise.all([
                        (oe = (Y = x.options).meta) == null
                          ? void 0
                          : oe.call(Y, { params: m.params, loaderData: B }),
                        (ke = (zt = x.options).headers) == null
                          ? void 0
                          : ke.call(zt, { loaderData: B }),
                      ]);
                      i[y] = m = {
                        ...m,
                        error: void 0,
                        status: "success",
                        isFetching: !1,
                        updatedAt: Date.now(),
                        loaderData: B,
                        loadPromise: void 0,
                        meta: ye,
                        headers: oo,
                      };
                    } catch (B) {
                      if ((l = n())) return await l;
                      E(B);
                      try {
                        (Ue = (Rt = x.options).onError) == null ||
                          Ue.call(Rt, B);
                      } catch (ye) {
                        (B = ye), E(ye);
                      }
                      i[y] = m = {
                        ...m,
                        error: B,
                        status: "error",
                        isFetching: !1,
                      };
                    }
                    c(m);
                  },
                  W = Date.now() - m.updatedAt;
                let ce = s
                    ? x.options.preloadStaleTime ??
                      this.options.defaultPreloadStaleTime ??
                      3e4
                    : x.options.staleTime ?? this.options.defaultStaleTime ?? 0,
                  ie;
                const Q = x.options.shouldReload;
                if (
                  ((ie = typeof Q == "function" ? Q(I) : Q),
                  (i[y] = m =
                    {
                      ...m,
                      preload:
                        !!s && !this.state.matches.find(($) => $.id === m.id),
                    }),
                  m.status === "success" && (m.invalid || (ie ?? W > ce)))
                )
                  return (
                    (async () => {
                      try {
                        await K();
                      } catch ($) {
                        console.info("Background Fetching Error", $),
                          Ut($) &&
                            ((
                              this.state.pendingMatches || this.state.matches
                            ).find((D) => D.id === m.id),
                            E($),
                            Me(!1));
                      }
                    })(),
                    w()
                  );
                const se =
                  !s &&
                  typeof C == "number" &&
                  (x.options.pendingComponent ??
                    this.options.defaultPendingComponent);
                if (m.status !== "success")
                  try {
                    se &&
                      ((h = m.pendingPromise) == null ||
                        h.then(async () => {
                          if ((l = n())) return l;
                          (_ = !0),
                            (i[y] = m = { ...m, showPending: !0 }),
                            c(m),
                            w();
                        })),
                      await K();
                  } catch ($) {
                    p($);
                  }
                w();
              })
            );
          }),
          await Promise.all(g),
          i
        );
      }),
      (this.invalidate = () => {
        const n = (r) => ({ ...r, invalid: !0 });
        this.__store.setState((r) => {
          var i;
          return {
            ...r,
            matches: r.matches.map(n),
            cachedMatches: r.cachedMatches.map(n),
            pendingMatches: (i = r.pendingMatches) == null ? void 0 : i.map(n),
          };
        }),
          this.load();
      }),
      (this.load = async () => {
        const n = new Promise(async (r, i) => {
          const s = this.latestLocation,
            o = this.state.resolvedLocation,
            a = o.href !== s.href;
          let l;
          this.cancelMatches(),
            this.emit({
              type: "onBeforeLoad",
              fromLocation: o,
              toLocation: s,
              pathChanged: a,
            });
          let u;
          const c = this.state.matches;
          this.__store.batch(() => {
            this.cleanCache(),
              (u = this.matchRoutes(s.pathname, s.search, { debug: !0 })),
              this.__store.setState((d) => ({
                ...d,
                isLoading: !0,
                location: s,
                pendingMatches: u,
                cachedMatches: d.cachedMatches.filter(
                  (f) => !u.find((g) => g.id === f.id)
                ),
              }));
          });
          try {
            let d, f;
            try {
              await this.loadMatches({
                matches: u,
                location: s,
                checkLatest: () => this.checkLatest(n),
              });
            } catch (w) {
              Ut(w)
                ? ((d = this.resolveRedirect(w)),
                  yv || this.navigate({ ...d, replace: !0 }))
                : Wt(w) && ((f = w), this.handleNotFound(u, w));
            }
            if ((l = this.checkLatest(n))) return l;
            const g = c.filter((w) => !u.find((p) => p.id === w.id)),
              m = u.filter((w) => !c.find((p) => p.id === w.id)),
              y = c.filter((w) => u.find((p) => p.id === w.id));
            this.__store.batch(() => {
              this.__store.setState((w) => ({
                ...w,
                isLoading: !1,
                matches: w.pendingMatches,
                pendingMatches: void 0,
                cachedMatches: [
                  ...w.cachedMatches,
                  ...g.filter((p) => p.status !== "error"),
                ],
                statusCode:
                  (d != null && d.statusCode) || f
                    ? 404
                    : w.matches.some((p) => p.status === "error")
                    ? 500
                    : 200,
                redirect: d,
              })),
                this.cleanCache();
            }),
              [
                [g, "onLeave"],
                [m, "onEnter"],
                [y, "onStay"],
              ].forEach(([w, p]) => {
                w.forEach((h) => {
                  var v, x;
                  (x = (v = this.looseRoutesById[h.routeId].options)[p]) ==
                    null || x.call(v, h);
                });
              }),
              this.emit({
                type: "onLoad",
                fromLocation: o,
                toLocation: s,
                pathChanged: a,
              }),
              r();
          } catch (d) {
            if ((l = this.checkLatest(n))) return l;
            console.log("Load Error", d), i(d);
          }
        });
        return (this.latestLoadPromise = n), this.latestLoadPromise;
      }),
      (this.resolveRedirect = (n) => {
        let r = n;
        return r.href || (r.href = this.buildLocation(r).href), r;
      }),
      (this.cleanCache = () => {
        this.__store.setState((n) => ({
          ...n,
          cachedMatches: n.cachedMatches.filter((r) => {
            const i = this.looseRoutesById[r.routeId];
            if (!i.options.loader) return !1;
            const s =
              (r.preload
                ? i.options.preloadGcTime ?? this.options.defaultPreloadGcTime
                : i.options.gcTime ?? this.options.defaultGcTime) ??
              5 * 60 * 1e3;
            return r.status !== "error" && Date.now() - r.updatedAt < s;
          }),
        }));
      }),
      (this.preloadRoute = async (n) => {
        var r;
        let i = this.buildLocation(n),
          s = this.matchRoutes(i.pathname, i.search, {
            throwOnError: !0,
            preload: !0,
          });
        const o = Object.fromEntries(
          (r = [
            ...this.state.matches,
            ...(this.state.pendingMatches ?? []),
            ...this.state.cachedMatches,
          ]) == null
            ? void 0
            : r.map((a) => [a.id, !0])
        );
        this.__store.batch(() => {
          s.forEach((a) => {
            o[a.id] ||
              this.__store.setState((l) => ({
                ...l,
                cachedMatches: [...l.cachedMatches, a],
              }));
          });
        });
        try {
          return (
            (s = await this.loadMatches({
              matches: s,
              location: i,
              preload: !0,
              checkLatest: () => {},
            })),
            s
          );
        } catch (a) {
          if (Ut(a)) return await this.preloadRoute(a);
          console.error(a);
          return;
        }
      }),
      (this.matchRoute = (n, r) => {
        const i = {
            ...n,
            to: n.to ? this.resolvePathWithBase(n.from || "", n.to) : void 0,
            params: n.params || {},
            leaveParams: !0,
          },
          s = this.buildLocation(i);
        if (r != null && r.pending && this.state.status !== "pending")
          return !1;
        const o =
          r != null && r.pending
            ? this.latestLocation
            : this.state.resolvedLocation;
        if (!o) return !1;
        const a = tu(this.basepath, o.pathname, { ...r, to: s.pathname });
        return !a || (n.params && !Ts(a, n.params, !0))
          ? !1
          : a && ((r == null ? void 0 : r.includeSearch) ?? !0)
          ? Ts(o.search, s.search, !0)
            ? a
            : !1
          : a;
      }),
      (this.injectHtml = async (n) => {
        this.injectedHtml.push(n);
      }),
      (this.registeredDeferredsIds = new Map()),
      (this.registeredDeferreds = new WeakMap()),
      (this.getDeferred = (n) => {
        const r = this.registeredDeferredsIds.get(n);
        if (r) return this.registeredDeferreds.get(r);
      }),
      (this.dehydrateData = (n, r) => {
        if (typeof document > "u") {
          const i = typeof n == "string" ? n : JSON.stringify(n);
          return (
            this.injectHtml(async () => {
              const s = `__TSR_DEHYDRATED__${i}`,
                o = typeof r == "function" ? await r() : r;
              return `<script id='${s}' suppressHydrationWarning>
  window["__TSR_DEHYDRATED__${Dx(i)}"] = ${JSON.stringify(
                this.options.transformer.stringify(o)
              )}
<\/script>`;
            }),
            () => this.hydrateData(n)
          );
        }
        return () => {};
      }),
      (this.hydrateData = (n) => {
        if (typeof document < "u") {
          const r = typeof n == "string" ? n : JSON.stringify(n);
          return this.options.transformer.parse(
            window[`__TSR_DEHYDRATED__${r}`]
          );
        }
      }),
      (this.dehydrate = () => {
        var n;
        const r =
          ((n = this.options.errorSerializer) == null ? void 0 : n.serialize) ??
          iP;
        return {
          state: {
            dehydratedMatches: this.state.matches.map((i) => ({
              ...ns(i, ["id", "status", "updatedAt", "loaderData"]),
              error: i.error
                ? { data: r(i.error), __isServerError: !0 }
                : void 0,
            })),
          },
        };
      }),
      (this.hydrate = async (n) => {
        var r, i, s;
        let o = n;
        typeof document < "u" &&
          (o = (r = window.__TSR_DEHYDRATED__) == null ? void 0 : r.data),
          Me(o);
        const a = this.options.transformer.parse(o);
        (this.dehydratedData = a.payload),
          (s = (i = this.options).hydrate) == null || s.call(i, a.payload);
        const l = a.router.state;
        let u = this.matchRoutes(
          this.state.location.pathname,
          this.state.location.search
        ).map((c) => {
          var d, f, g, m, y, w;
          const p = l.dehydratedMatches.find((h) => h.id === c.id);
          if (
            (Me(
              p,
              `Could not find a client-side match for dehydrated match with id: ${c.id}!`
            ),
            p)
          ) {
            const h = this.looseRoutesById[c.routeId],
              v =
                p.status === "notFound" || p.status === "redirected"
                  ? {}
                  : {
                      meta:
                        (f = (d = h.options).meta) == null
                          ? void 0
                          : f.call(d, {
                              params: c.params,
                              loaderData: p.loaderData,
                            }),
                      links:
                        (m = (g = h.options).links) == null
                          ? void 0
                          : m.call(g),
                      scripts:
                        (w = (y = h.options).scripts) == null
                          ? void 0
                          : w.call(y),
                    };
            return { ...c, ...p, ...v };
          }
          return c;
        });
        this.__store.setState((c) => ({
          ...c,
          matches: u,
          lastUpdated: Date.now(),
        }));
      }),
      (this.handleNotFound = (n, r) => {
        const i = Object.fromEntries(n.map((a) => [a.routeId, a]));
        let s =
          (r.global
            ? this.looseRoutesById[lt]
            : this.looseRoutesById[r.routeId]) || this.looseRoutesById[lt];
        for (
          ;
          !s.options.notFoundComponent &&
          !this.options.defaultNotFoundComponent &&
          s.id !== lt;

        )
          (s = s == null ? void 0 : s.parentRoute), Me(s);
        let o = i[s.id];
        Me(o, "Could not find match for route: " + s.id),
          Object.assign(o, { status: "notFound", error: r, isFetching: !1 });
      }),
      (this.hasNotFoundMatch = () =>
        this.__store.state.matches.some(
          (n) => n.status === "notFound" || n.globalNotFound
        )),
      this.update({
        defaultPreloadDelay: 50,
        defaultPendingMs: 1e3,
        defaultPendingMinMs: 500,
        context: void 0,
        ...t,
        stringifySearch: (t == null ? void 0 : t.stringifySearch) ?? Wx,
        parseSearch: (t == null ? void 0 : t.parseSearch) ?? Kx,
        transformer: (t == null ? void 0 : t.transformer) ?? JSON,
      }),
      typeof document < "u" && (window.__TSR__ROUTER__ = this);
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
}
class tP extends Error {}
class nP extends Error {}
function rP(e) {
  return {
    isLoading: !1,
    isTransitioning: !1,
    status: "idle",
    resolvedLocation: { ...e },
    location: e,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    lastUpdated: 0,
    statusCode: 200,
  };
}
function iP(e) {
  return e instanceof Error
    ? { name: e.name, message: e.message }
    : { data: e };
}
const sP = "Error preloading route! ☝️";
function oP(e) {
  const t = Vt(),
    n = Bn({ strict: !1, select: (B) => B.pathname }),
    {
      activeProps: r = () => ({ className: "active" }),
      inactiveProps: i = () => ({}),
      activeOptions: s,
      hash: o,
      search: a,
      params: l,
      to: u,
      state: c,
      mask: d,
      preload: f,
      preloadDelay: g,
      replace: m,
      startTransition: y,
      resetScroll: w,
      children: p,
      target: h,
      disabled: v,
      style: x,
      className: E,
      onClick: k,
      onFocus: _,
      onMouseEnter: C,
      onMouseLeave: M,
      onTouchStart: I,
      ...K
    } = e,
    W = { from: e.to ? n : void 0, ...e };
  let ce = "internal";
  try {
    new URL(`${u}`), (ce = "external");
  } catch {}
  const ie = t.buildLocation(W),
    Q = f ?? t.options.defaultPreload,
    se = g ?? t.options.defaultPreloadDelay ?? 0,
    $ = ht({
      select: (B) => {
        const ye = B.location.pathname.split("/"),
          Rr = ie.pathname.split("/").every((Di, D1) => Di === ye[D1]),
          xl = s != null && s.exact ? B.location.pathname === ie.pathname : Rr,
          Pl = s != null && s.includeHash ? B.location.hash === ie.hash : !0,
          Qn =
            (s == null ? void 0 : s.includeSearch) ?? !0
              ? Ts(B.location.search, ie.search, !(s != null && s.exact))
              : !0;
        return xl && Pl && Qn;
      },
    });
  if (ce === "external")
    return {
      ...K,
      type: ce,
      href: u,
      children: p,
      target: h,
      disabled: v,
      style: x,
      className: E,
      onClick: k,
      onFocus: _,
      onMouseEnter: C,
      onMouseLeave: M,
      onTouchStart: I,
    };
  const D = (B) => {
      !v &&
        !lP(B) &&
        !B.defaultPrevented &&
        (!h || h === "_self") &&
        B.button === 0 &&
        (B.preventDefault(),
        t.commitLocation({
          ...ie,
          replace: m,
          resetScroll: w,
          startTransition: y,
        }));
    },
    F = () => {
      T.startTransition(() => {
        t.preloadRoute(W).catch((B) => {
          console.warn(B), console.warn(sP);
        });
      });
    },
    V = (B) => {
      v || (Q && F());
    },
    Y = V,
    oe = (B) => {
      if (v) return;
      const ye = B.target || {};
      if (Q) {
        if (ye.preloadTimeout) return;
        ye.preloadTimeout = setTimeout(() => {
          (ye.preloadTimeout = null), F();
        }, se);
      }
    },
    zt = (B) => {
      if (v) return;
      const ye = B.target || {};
      ye.preloadTimeout &&
        (clearTimeout(ye.preloadTimeout), (ye.preloadTimeout = null));
    },
    ke = (B) => (ye) => {
      ye.persist && ye.persist(),
        B.filter(Boolean).forEach((oo) => {
          ye.defaultPrevented || oo(ye);
        });
    },
    Rt = $ ? Br(r, {}) ?? {} : {},
    Ue = $ ? {} : Br(i, {}) ?? {};
  return {
    ...Rt,
    ...Ue,
    ...K,
    href: v ? void 0 : ie.maskedLocation ? ie.maskedLocation.href : ie.href,
    onClick: ke([k, D]),
    onFocus: ke([_, V]),
    onMouseEnter: ke([C, oe]),
    onMouseLeave: ke([M, zt]),
    onTouchStart: ke([I, Y]),
    target: h,
    style: { ...x, ...Rt.style, ...Ue.style },
    className:
      [E, Rt.className, Ue.className].filter(Boolean).join(" ") || void 0,
    ...(v ? { role: "link", "aria-disabled": !0 } : void 0),
    "data-status": $ ? "active" : void 0,
  };
}
const aP = T.forwardRef((e, t) => {
  const { _asChild: n, ...r } = e,
    { type: i, ...s } = oP(r),
    o =
      typeof r.children == "function"
        ? r.children({ isActive: s["data-status"] === "active" })
        : r.children;
  return T.createElement(n || "a", { ...s, ref: t }, o);
});
function lP(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Gd(e) {
  const { navigate: t } = Vt(),
    n = Bn({ strict: !1, select: (i) => i.pathname }),
    r = ({ from: i, ...s }) =>
      t({ from: s != null && s.to ? n : void 0, ...s });
  return T.useCallback(r, []);
}
function uP(e) {
  const { navigate: t } = Vt(),
    n = Bn({ strict: !1 });
  return (
    T.useEffect(() => {
      t({ from: e.to ? n.pathname : void 0, ...e });
    }, []),
    null
  );
}
const cP = () =>
  S.jsx("div", {
    className: "home",
    children: S.jsxs("header", {
      className: "mainHeader",
      children: [
        S.jsx("h1", {
          className: "mainHeader",
          children: "Nostalgic Fortnite like you've never seen before.",
        }),
        S.jsx("p", {
          className: "mainBody",
          children:
            "The only open-source nostalgic Fortnite private you can trust. Powered with Go, Retrac is the fastest server you can find.",
        }),
        S.jsxs("section", {
          className: "buttons",
          children: [
            S.jsx("a", {
              href: "https://discord.gg/kBefMZA4Qp",
              className: "link",
              children: "Join the Discord Community",
            }),
            S.jsx("a", {
              href: "https://github.com/retracfn/launcher/releases/tag/master",
              className: "link",
              children: "Download the Fortnite Client",
            }),
          ],
        }),
      ],
    }),
  });
function wv(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: dP } = Object.prototype,
  { getPrototypeOf: qd } = Object,
  el = ((e) => (t) => {
    const n = dP.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  bt = (e) => ((e = e.toLowerCase()), (t) => el(t) === e),
  tl = (e) => (t) => typeof t === e,
  { isArray: ki } = Array,
  Rs = tl("undefined");
function fP(e) {
  return (
    e !== null &&
    !Rs(e) &&
    e.constructor !== null &&
    !Rs(e.constructor) &&
    pt(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const xv = bt("ArrayBuffer");
function hP(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && xv(e.buffer)),
    t
  );
}
const pP = tl("string"),
  pt = tl("function"),
  Pv = tl("number"),
  nl = (e) => e !== null && typeof e == "object",
  mP = (e) => e === !0 || e === !1,
  Ho = (e) => {
    if (el(e) !== "object") return !1;
    const t = qd(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  yP = bt("Date"),
  gP = bt("File"),
  vP = bt("Blob"),
  SP = bt("FileList"),
  wP = (e) => nl(e) && pt(e.pipe),
  xP = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (pt(e.append) &&
          ((t = el(e)) === "formdata" ||
            (t === "object" &&
              pt(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  PP = bt("URLSearchParams"),
  CP = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function qs(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, i;
  if ((typeof e != "object" && (e = [e]), ki(e)))
    for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      o = s.length;
    let a;
    for (r = 0; r < o; r++) (a = s[r]), t.call(null, e[a], a, e);
  }
}
function Cv(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    i;
  for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
  return null;
}
const Ev =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Tv = (e) => !Rs(e) && e !== Ev;
function vc() {
  const { caseless: e } = (Tv(this) && this) || {},
    t = {},
    n = (r, i) => {
      const s = (e && Cv(t, i)) || i;
      Ho(t[s]) && Ho(r)
        ? (t[s] = vc(t[s], r))
        : Ho(r)
        ? (t[s] = vc({}, r))
        : ki(r)
        ? (t[s] = r.slice())
        : (t[s] = r);
    };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && qs(arguments[r], n);
  return t;
}
const EP = (e, t, n, { allOwnKeys: r } = {}) => (
    qs(
      t,
      (i, s) => {
        n && pt(i) ? (e[s] = wv(i, n)) : (e[s] = i);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  TP = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  RP = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  kP = (e, t, n, r) => {
    let i, s, o;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (i = Object.getOwnPropertyNames(e), s = i.length; s-- > 0; )
        (o = i[s]), (!r || r(o, e, t)) && !a[o] && ((t[o] = e[o]), (a[o] = !0));
      e = n !== !1 && qd(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  _P = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  OP = (e) => {
    if (!e) return null;
    if (ki(e)) return e;
    let t = e.length;
    if (!Pv(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  DP = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && qd(Uint8Array)),
  MP = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let i;
    for (; (i = r.next()) && !i.done; ) {
      const s = i.value;
      t.call(e, s[0], s[1]);
    }
  },
  jP = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  IP = bt("HTMLFormElement"),
  LP = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, i) {
      return r.toUpperCase() + i;
    }),
  tp = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  AP = bt("RegExp"),
  Rv = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    qs(n, (i, s) => {
      let o;
      (o = t(i, s, e)) !== !1 && (r[s] = o || i);
    }),
      Object.defineProperties(e, r);
  },
  NP = (e) => {
    Rv(e, (t, n) => {
      if (pt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (pt(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  FP = (e, t) => {
    const n = {},
      r = (i) => {
        i.forEach((s) => {
          n[s] = !0;
        });
      };
    return ki(e) ? r(e) : r(String(e).split(t)), n;
  },
  VP = () => {},
  bP = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  nu = "abcdefghijklmnopqrstuvwxyz",
  np = "0123456789",
  kv = { DIGIT: np, ALPHA: nu, ALPHA_DIGIT: nu + nu.toUpperCase() + np },
  BP = (e = 16, t = kv.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function zP(e) {
  return !!(
    e &&
    pt(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const UP = (e) => {
    const t = new Array(10),
      n = (r, i) => {
        if (nl(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[i] = r;
            const s = ki(r) ? [] : {};
            return (
              qs(r, (o, a) => {
                const l = n(o, i + 1);
                !Rs(l) && (s[a] = l);
              }),
              (t[i] = void 0),
              s
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  $P = bt("AsyncFunction"),
  HP = (e) => e && (nl(e) || pt(e)) && pt(e.then) && pt(e.catch),
  R = {
    isArray: ki,
    isArrayBuffer: xv,
    isBuffer: fP,
    isFormData: xP,
    isArrayBufferView: hP,
    isString: pP,
    isNumber: Pv,
    isBoolean: mP,
    isObject: nl,
    isPlainObject: Ho,
    isUndefined: Rs,
    isDate: yP,
    isFile: gP,
    isBlob: vP,
    isRegExp: AP,
    isFunction: pt,
    isStream: wP,
    isURLSearchParams: PP,
    isTypedArray: DP,
    isFileList: SP,
    forEach: qs,
    merge: vc,
    extend: EP,
    trim: CP,
    stripBOM: TP,
    inherits: RP,
    toFlatObject: kP,
    kindOf: el,
    kindOfTest: bt,
    endsWith: _P,
    toArray: OP,
    forEachEntry: MP,
    matchAll: jP,
    isHTMLForm: IP,
    hasOwnProperty: tp,
    hasOwnProp: tp,
    reduceDescriptors: Rv,
    freezeMethods: NP,
    toObjectSet: FP,
    toCamelCase: LP,
    noop: VP,
    toFiniteNumber: bP,
    findKey: Cv,
    global: Ev,
    isContextDefined: Tv,
    ALPHABET: kv,
    generateString: BP,
    isSpecCompliantForm: zP,
    toJSONObject: UP,
    isAsyncFn: $P,
    isThenable: HP,
  };
function U(e, t, n, r, i) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    i && (this.response = i);
}
R.inherits(U, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: R.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const _v = U.prototype,
  Ov = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Ov[e] = { value: e };
});
Object.defineProperties(U, Ov);
Object.defineProperty(_v, "isAxiosError", { value: !0 });
U.from = (e, t, n, r, i, s) => {
  const o = Object.create(_v);
  return (
    R.toFlatObject(
      e,
      o,
      function (l) {
        return l !== Error.prototype;
      },
      (a) => a !== "isAxiosError"
    ),
    U.call(o, e.message, t, n, r, i),
    (o.cause = e),
    (o.name = e.name),
    s && Object.assign(o, s),
    o
  );
};
const KP = null;
function Sc(e) {
  return R.isPlainObject(e) || R.isArray(e);
}
function Dv(e) {
  return R.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function rp(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (i, s) {
          return (i = Dv(i)), !n && s ? "[" + i + "]" : i;
        })
        .join(n ? "." : "")
    : t;
}
function WP(e) {
  return R.isArray(e) && !e.some(Sc);
}
const QP = R.toFlatObject(R, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function rl(e, t, n) {
  if (!R.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = R.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, w) {
        return !R.isUndefined(w[y]);
      }
    ));
  const r = n.metaTokens,
    i = n.visitor || c,
    s = n.dots,
    o = n.indexes,
    l = (n.Blob || (typeof Blob < "u" && Blob)) && R.isSpecCompliantForm(t);
  if (!R.isFunction(i)) throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (R.isDate(m)) return m.toISOString();
    if (!l && R.isBlob(m))
      throw new U("Blob is not supported. Use a Buffer instead.");
    return R.isArrayBuffer(m) || R.isTypedArray(m)
      ? l && typeof Blob == "function"
        ? new Blob([m])
        : Buffer.from(m)
      : m;
  }
  function c(m, y, w) {
    let p = m;
    if (m && !w && typeof m == "object") {
      if (R.endsWith(y, "{}"))
        (y = r ? y : y.slice(0, -2)), (m = JSON.stringify(m));
      else if (
        (R.isArray(m) && WP(m)) ||
        ((R.isFileList(m) || R.endsWith(y, "[]")) && (p = R.toArray(m)))
      )
        return (
          (y = Dv(y)),
          p.forEach(function (v, x) {
            !(R.isUndefined(v) || v === null) &&
              t.append(
                o === !0 ? rp([y], x, s) : o === null ? y : y + "[]",
                u(v)
              );
          }),
          !1
        );
    }
    return Sc(m) ? !0 : (t.append(rp(w, y, s), u(m)), !1);
  }
  const d = [],
    f = Object.assign(QP, {
      defaultVisitor: c,
      convertValue: u,
      isVisitable: Sc,
    });
  function g(m, y) {
    if (!R.isUndefined(m)) {
      if (d.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      d.push(m),
        R.forEach(m, function (p, h) {
          (!(R.isUndefined(p) || p === null) &&
            i.call(t, p, R.isString(h) ? h.trim() : h, y, f)) === !0 &&
            g(p, y ? y.concat(h) : [h]);
        }),
        d.pop();
    }
  }
  if (!R.isObject(e)) throw new TypeError("data must be an object");
  return g(e), t;
}
function ip(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Yd(e, t) {
  (this._pairs = []), e && rl(e, this, t);
}
const Mv = Yd.prototype;
Mv.append = function (t, n) {
  this._pairs.push([t, n]);
};
Mv.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, ip);
      }
    : ip;
  return this._pairs
    .map(function (i) {
      return n(i[0]) + "=" + n(i[1]);
    }, "")
    .join("&");
};
function GP(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function jv(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || GP,
    i = n && n.serialize;
  let s;
  if (
    (i
      ? (s = i(t, n))
      : (s = R.isURLSearchParams(t) ? t.toString() : new Yd(t, n).toString(r)),
    s)
  ) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + s);
  }
  return e;
}
class sp {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    R.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Iv = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  qP = typeof URLSearchParams < "u" ? URLSearchParams : Yd,
  YP = typeof FormData < "u" ? FormData : null,
  XP = typeof Blob < "u" ? Blob : null,
  JP = {
    isBrowser: !0,
    classes: { URLSearchParams: qP, FormData: YP, Blob: XP },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Lv = typeof window < "u" && typeof document < "u",
  ZP = ((e) => Lv && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(
    typeof navigator < "u" && navigator.product
  ),
  eC =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  tC = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Lv,
        hasStandardBrowserEnv: ZP,
        hasStandardBrowserWebWorkerEnv: eC,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Lt = { ...tC, ...JP };
function nC(e, t) {
  return rl(
    e,
    new Lt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, i, s) {
          return Lt.isNode && R.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : s.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function rC(e) {
  return R.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function iC(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const i = n.length;
  let s;
  for (r = 0; r < i; r++) (s = n[r]), (t[s] = e[s]);
  return t;
}
function Av(e) {
  function t(n, r, i, s) {
    let o = n[s++];
    if (o === "__proto__") return !0;
    const a = Number.isFinite(+o),
      l = s >= n.length;
    return (
      (o = !o && R.isArray(i) ? i.length : o),
      l
        ? (R.hasOwnProp(i, o) ? (i[o] = [i[o], r]) : (i[o] = r), !a)
        : ((!i[o] || !R.isObject(i[o])) && (i[o] = []),
          t(n, r, i[o], s) && R.isArray(i[o]) && (i[o] = iC(i[o])),
          !a)
    );
  }
  if (R.isFormData(e) && R.isFunction(e.entries)) {
    const n = {};
    return (
      R.forEachEntry(e, (r, i) => {
        t(rC(r), i, n, 0);
      }),
      n
    );
  }
  return null;
}
function sC(e, t, n) {
  if (R.isString(e))
    try {
      return (t || JSON.parse)(e), R.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Xd = {
  transitional: Iv,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        i = r.indexOf("application/json") > -1,
        s = R.isObject(t);
      if ((s && R.isHTMLForm(t) && (t = new FormData(t)), R.isFormData(t)))
        return i ? JSON.stringify(Av(t)) : t;
      if (
        R.isArrayBuffer(t) ||
        R.isBuffer(t) ||
        R.isStream(t) ||
        R.isFile(t) ||
        R.isBlob(t)
      )
        return t;
      if (R.isArrayBufferView(t)) return t.buffer;
      if (R.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let a;
      if (s) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return nC(t, this.formSerializer).toString();
        if ((a = R.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const l = this.env && this.env.FormData;
          return rl(
            a ? { "files[]": t } : t,
            l && new l(),
            this.formSerializer
          );
        }
      }
      return s || i ? (n.setContentType("application/json", !1), sC(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Xd.transitional,
        r = n && n.forcedJSONParsing,
        i = this.responseType === "json";
      if (t && R.isString(t) && ((r && !this.responseType) || i)) {
        const o = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (o)
            throw a.name === "SyntaxError"
              ? U.from(a, U.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Lt.classes.FormData, Blob: Lt.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
R.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Xd.headers[e] = {};
});
const Jd = Xd,
  oC = R.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  aC = (e) => {
    const t = {};
    let n, r, i;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (o) {
            (i = o.indexOf(":")),
              (n = o.substring(0, i).trim().toLowerCase()),
              (r = o.substring(i + 1).trim()),
              !(!n || (t[n] && oC[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  op = Symbol("internals");
function bi(e) {
  return e && String(e).trim().toLowerCase();
}
function Ko(e) {
  return e === !1 || e == null ? e : R.isArray(e) ? e.map(Ko) : String(e);
}
function lC(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const uC = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ru(e, t, n, r, i) {
  if (R.isFunction(r)) return r.call(this, t, n);
  if ((i && (t = n), !!R.isString(t))) {
    if (R.isString(r)) return t.indexOf(r) !== -1;
    if (R.isRegExp(r)) return r.test(t);
  }
}
function cC(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function dC(e, t) {
  const n = R.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (i, s, o) {
        return this[r].call(this, t, i, s, o);
      },
      configurable: !0,
    });
  });
}
class il {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function s(a, l, u) {
      const c = bi(l);
      if (!c) throw new Error("header name must be a non-empty string");
      const d = R.findKey(i, c);
      (!d || i[d] === void 0 || u === !0 || (u === void 0 && i[d] !== !1)) &&
        (i[d || l] = Ko(a));
    }
    const o = (a, l) => R.forEach(a, (u, c) => s(u, c, l));
    return (
      R.isPlainObject(t) || t instanceof this.constructor
        ? o(t, n)
        : R.isString(t) && (t = t.trim()) && !uC(t)
        ? o(aC(t), n)
        : t != null && s(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = bi(t)), t)) {
      const r = R.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n) return i;
        if (n === !0) return lC(i);
        if (R.isFunction(n)) return n.call(this, i, r);
        if (R.isRegExp(n)) return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = bi(t)), t)) {
      const r = R.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || ru(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function s(o) {
      if (((o = bi(o)), o)) {
        const a = R.findKey(r, o);
        a && (!n || ru(r, r[a], a, n)) && (delete r[a], (i = !0));
      }
    }
    return R.isArray(t) ? t.forEach(s) : s(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      i = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || ru(this, this[s], s, t, !0)) && (delete this[s], (i = !0));
    }
    return i;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      R.forEach(this, (i, s) => {
        const o = R.findKey(r, s);
        if (o) {
          (n[o] = Ko(i)), delete n[s];
          return;
        }
        const a = t ? cC(s) : String(s).trim();
        a !== s && delete n[s], (n[a] = Ko(i)), (r[a] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      R.forEach(this, (r, i) => {
        r != null && r !== !1 && (n[i] = t && R.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[op] = this[op] = { accessors: {} }).accessors,
      i = this.prototype;
    function s(o) {
      const a = bi(o);
      r[a] || (dC(i, o), (r[a] = !0));
    }
    return R.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
il.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
R.reduceDescriptors(il.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
R.freezeMethods(il);
const Xt = il;
function iu(e, t) {
  const n = this || Jd,
    r = t || n,
    i = Xt.from(r.headers);
  let s = r.data;
  return (
    R.forEach(e, function (a) {
      s = a.call(n, s, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    s
  );
}
function Nv(e) {
  return !!(e && e.__CANCEL__);
}
function Ys(e, t, n) {
  U.call(this, e ?? "canceled", U.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
R.inherits(Ys, U, { __CANCEL__: !0 });
function fC(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new U(
          "Request failed with status code " + n.status,
          [U.ERR_BAD_REQUEST, U.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const hC = Lt.hasStandardBrowserEnv
  ? {
      write(e, t, n, r, i, s) {
        const o = [e + "=" + encodeURIComponent(t)];
        R.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()),
          R.isString(r) && o.push("path=" + r),
          R.isString(i) && o.push("domain=" + i),
          s === !0 && o.push("secure"),
          (document.cookie = o.join("; "));
      },
      read(e) {
        const t = document.cookie.match(
          new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
        );
        return t ? decodeURIComponent(t[3]) : null;
      },
      remove(e) {
        this.write(e, "", Date.now() - 864e5);
      },
    }
  : {
      write() {},
      read() {
        return null;
      },
      remove() {},
    };
function pC(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function mC(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Fv(e, t) {
  return e && !pC(t) ? mC(e, t) : t;
}
const yC = Lt.hasStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function i(s) {
        let o = s;
        return (
          t && (n.setAttribute("href", o), (o = n.href)),
          n.setAttribute("href", o),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = i(window.location.href)),
        function (o) {
          const a = R.isString(o) ? i(o) : o;
          return a.protocol === r.protocol && a.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function gC(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function vC(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let i = 0,
    s = 0,
    o;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (l) {
      const u = Date.now(),
        c = r[s];
      o || (o = u), (n[i] = l), (r[i] = u);
      let d = s,
        f = 0;
      for (; d !== i; ) (f += n[d++]), (d = d % e);
      if (((i = (i + 1) % e), i === s && (s = (s + 1) % e), u - o < t)) return;
      const g = c && u - c;
      return g ? Math.round((f * 1e3) / g) : void 0;
    }
  );
}
function ap(e, t) {
  let n = 0;
  const r = vC(50, 250);
  return (i) => {
    const s = i.loaded,
      o = i.lengthComputable ? i.total : void 0,
      a = s - n,
      l = r(a),
      u = s <= o;
    n = s;
    const c = {
      loaded: s,
      total: o,
      progress: o ? s / o : void 0,
      bytes: a,
      rate: l || void 0,
      estimated: l && o && u ? (o - s) / l : void 0,
      event: i,
    };
    (c[t ? "download" : "upload"] = !0), e(c);
  };
}
const SC = typeof XMLHttpRequest < "u",
  wC =
    SC &&
    function (e) {
      return new Promise(function (n, r) {
        let i = e.data;
        const s = Xt.from(e.headers).normalize();
        let { responseType: o, withXSRFToken: a } = e,
          l;
        function u() {
          e.cancelToken && e.cancelToken.unsubscribe(l),
            e.signal && e.signal.removeEventListener("abort", l);
        }
        let c;
        if (R.isFormData(i)) {
          if (Lt.hasStandardBrowserEnv || Lt.hasStandardBrowserWebWorkerEnv)
            s.setContentType(!1);
          else if ((c = s.getContentType()) !== !1) {
            const [y, ...w] = c
              ? c
                  .split(";")
                  .map((p) => p.trim())
                  .filter(Boolean)
              : [];
            s.setContentType([y || "multipart/form-data", ...w].join("; "));
          }
        }
        let d = new XMLHttpRequest();
        if (e.auth) {
          const y = e.auth.username || "",
            w = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          s.set("Authorization", "Basic " + btoa(y + ":" + w));
        }
        const f = Fv(e.baseURL, e.url);
        d.open(e.method.toUpperCase(), jv(f, e.params, e.paramsSerializer), !0),
          (d.timeout = e.timeout);
        function g() {
          if (!d) return;
          const y = Xt.from(
              "getAllResponseHeaders" in d && d.getAllResponseHeaders()
            ),
            p = {
              data:
                !o || o === "text" || o === "json"
                  ? d.responseText
                  : d.response,
              status: d.status,
              statusText: d.statusText,
              headers: y,
              config: e,
              request: d,
            };
          fC(
            function (v) {
              n(v), u();
            },
            function (v) {
              r(v), u();
            },
            p
          ),
            (d = null);
        }
        if (
          ("onloadend" in d
            ? (d.onloadend = g)
            : (d.onreadystatechange = function () {
                !d ||
                  d.readyState !== 4 ||
                  (d.status === 0 &&
                    !(d.responseURL && d.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(g);
              }),
          (d.onabort = function () {
            d &&
              (r(new U("Request aborted", U.ECONNABORTED, e, d)), (d = null));
          }),
          (d.onerror = function () {
            r(new U("Network Error", U.ERR_NETWORK, e, d)), (d = null);
          }),
          (d.ontimeout = function () {
            let w = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const p = e.transitional || Iv;
            e.timeoutErrorMessage && (w = e.timeoutErrorMessage),
              r(
                new U(
                  w,
                  p.clarifyTimeoutError ? U.ETIMEDOUT : U.ECONNABORTED,
                  e,
                  d
                )
              ),
              (d = null);
          }),
          Lt.hasStandardBrowserEnv &&
            (a && R.isFunction(a) && (a = a(e)), a || (a !== !1 && yC(f))))
        ) {
          const y =
            e.xsrfHeaderName && e.xsrfCookieName && hC.read(e.xsrfCookieName);
          y && s.set(e.xsrfHeaderName, y);
        }
        i === void 0 && s.setContentType(null),
          "setRequestHeader" in d &&
            R.forEach(s.toJSON(), function (w, p) {
              d.setRequestHeader(p, w);
            }),
          R.isUndefined(e.withCredentials) ||
            (d.withCredentials = !!e.withCredentials),
          o && o !== "json" && (d.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            d.addEventListener("progress", ap(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            d.upload &&
            d.upload.addEventListener("progress", ap(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((l = (y) => {
              d &&
                (r(!y || y.type ? new Ys(null, e, d) : y),
                d.abort(),
                (d = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(l),
            e.signal &&
              (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
        const m = gC(f);
        if (m && Lt.protocols.indexOf(m) === -1) {
          r(new U("Unsupported protocol " + m + ":", U.ERR_BAD_REQUEST, e));
          return;
        }
        d.send(i || null);
      });
    },
  wc = { http: KP, xhr: wC };
R.forEach(wc, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const lp = (e) => `- ${e}`,
  xC = (e) => R.isFunction(e) || e === null || e === !1,
  Vv = {
    getAdapter: (e) => {
      e = R.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const i = {};
      for (let s = 0; s < t; s++) {
        n = e[s];
        let o;
        if (
          ((r = n),
          !xC(n) && ((r = wc[(o = String(n)).toLowerCase()]), r === void 0))
        )
          throw new U(`Unknown adapter '${o}'`);
        if (r) break;
        i[o || "#" + s] = r;
      }
      if (!r) {
        const s = Object.entries(i).map(
          ([a, l]) =>
            `adapter ${a} ` +
            (l === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let o = t
          ? s.length > 1
            ? `since :
` +
              s.map(lp).join(`
`)
            : " " + lp(s[0])
          : "as no adapter specified";
        throw new U(
          "There is no suitable adapter to dispatch the request " + o,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: wc,
  };
function su(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ys(null, e);
}
function up(e) {
  return (
    su(e),
    (e.headers = Xt.from(e.headers)),
    (e.data = iu.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Vv.getAdapter(e.adapter || Jd.adapter)(e).then(
      function (r) {
        return (
          su(e),
          (r.data = iu.call(e, e.transformResponse, r)),
          (r.headers = Xt.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Nv(r) ||
            (su(e),
            r &&
              r.response &&
              ((r.response.data = iu.call(e, e.transformResponse, r.response)),
              (r.response.headers = Xt.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const cp = (e) => (e instanceof Xt ? { ...e } : e);
function Si(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, d) {
    return R.isPlainObject(u) && R.isPlainObject(c)
      ? R.merge.call({ caseless: d }, u, c)
      : R.isPlainObject(c)
      ? R.merge({}, c)
      : R.isArray(c)
      ? c.slice()
      : c;
  }
  function i(u, c, d) {
    if (R.isUndefined(c)) {
      if (!R.isUndefined(u)) return r(void 0, u, d);
    } else return r(u, c, d);
  }
  function s(u, c) {
    if (!R.isUndefined(c)) return r(void 0, c);
  }
  function o(u, c) {
    if (R.isUndefined(c)) {
      if (!R.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, c);
  }
  function a(u, c, d) {
    if (d in t) return r(u, c);
    if (d in e) return r(void 0, u);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: a,
    headers: (u, c) => i(cp(u), cp(c), !0),
  };
  return (
    R.forEach(Object.keys(Object.assign({}, e, t)), function (c) {
      const d = l[c] || i,
        f = d(e[c], t[c], c);
      (R.isUndefined(f) && d !== a) || (n[c] = f);
    }),
    n
  );
}
const bv = "1.6.8",
  Zd = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Zd[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const dp = {};
Zd.transitional = function (t, n, r) {
  function i(s, o) {
    return (
      "[Axios v" +
      bv +
      "] Transitional option '" +
      s +
      "'" +
      o +
      (r ? ". " + r : "")
    );
  }
  return (s, o, a) => {
    if (t === !1)
      throw new U(
        i(o, " has been removed" + (n ? " in " + n : "")),
        U.ERR_DEPRECATED
      );
    return (
      n &&
        !dp[o] &&
        ((dp[o] = !0),
        console.warn(
          i(
            o,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(s, o, a) : !0
    );
  };
};
function PC(e, t, n) {
  if (typeof e != "object")
    throw new U("options must be an object", U.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const s = r[i],
      o = t[s];
    if (o) {
      const a = e[s],
        l = a === void 0 || o(a, s, e);
      if (l !== !0)
        throw new U("option " + s + " must be " + l, U.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new U("Unknown option " + s, U.ERR_BAD_OPTION);
  }
}
const xc = { assertOptions: PC, validators: Zd },
  un = xc.validators;
class Pa {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new sp(), response: new sp() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i;
        Error.captureStackTrace
          ? Error.captureStackTrace((i = {}))
          : (i = new Error());
        const s = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        r.stack
          ? s &&
            !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) &&
            (r.stack +=
              `
` + s)
          : (r.stack = s);
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Si(this.defaults, n));
    const { transitional: r, paramsSerializer: i, headers: s } = n;
    r !== void 0 &&
      xc.assertOptions(
        r,
        {
          silentJSONParsing: un.transitional(un.boolean),
          forcedJSONParsing: un.transitional(un.boolean),
          clarifyTimeoutError: un.transitional(un.boolean),
        },
        !1
      ),
      i != null &&
        (R.isFunction(i)
          ? (n.paramsSerializer = { serialize: i })
          : xc.assertOptions(
              i,
              { encode: un.function, serialize: un.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let o = s && R.merge(s.common, s[n.method]);
    s &&
      R.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (m) => {
          delete s[m];
        }
      ),
      (n.headers = Xt.concat(o, s));
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function (y) {
      (typeof y.runWhen == "function" && y.runWhen(n) === !1) ||
        ((l = l && y.synchronous), a.unshift(y.fulfilled, y.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (y) {
      u.push(y.fulfilled, y.rejected);
    });
    let c,
      d = 0,
      f;
    if (!l) {
      const m = [up.bind(this), void 0];
      for (
        m.unshift.apply(m, a),
          m.push.apply(m, u),
          f = m.length,
          c = Promise.resolve(n);
        d < f;

      )
        c = c.then(m[d++], m[d++]);
      return c;
    }
    f = a.length;
    let g = n;
    for (d = 0; d < f; ) {
      const m = a[d++],
        y = a[d++];
      try {
        g = m(g);
      } catch (w) {
        y.call(this, w);
        break;
      }
    }
    try {
      c = up.call(this, g);
    } catch (m) {
      return Promise.reject(m);
    }
    for (d = 0, f = u.length; d < f; ) c = c.then(u[d++], u[d++]);
    return c;
  }
  getUri(t) {
    t = Si(this.defaults, t);
    const n = Fv(t.baseURL, t.url);
    return jv(n, t.params, t.paramsSerializer);
  }
}
R.forEach(["delete", "get", "head", "options"], function (t) {
  Pa.prototype[t] = function (n, r) {
    return this.request(
      Si(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
R.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (s, o, a) {
      return this.request(
        Si(a || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: s,
          data: o,
        })
      );
    };
  }
  (Pa.prototype[t] = n()), (Pa.prototype[t + "Form"] = n(!0));
});
const Wo = Pa;
class ef {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (s) {
      n = s;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; ) r._listeners[s](i);
      r._listeners = null;
    }),
      (this.promise.then = (i) => {
        let s;
        const o = new Promise((a) => {
          r.subscribe(a), (s = a);
        }).then(i);
        return (
          (o.cancel = function () {
            r.unsubscribe(s);
          }),
          o
        );
      }),
      t(function (s, o, a) {
        r.reason || ((r.reason = new Ys(s, o, a)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new ef(function (i) {
        t = i;
      }),
      cancel: t,
    };
  }
}
const CC = ef;
function EC(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function TC(e) {
  return R.isObject(e) && e.isAxiosError === !0;
}
const Pc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Pc).forEach(([e, t]) => {
  Pc[t] = e;
});
const RC = Pc;
function Bv(e) {
  const t = new Wo(e),
    n = wv(Wo.prototype.request, t);
  return (
    R.extend(n, Wo.prototype, t, { allOwnKeys: !0 }),
    R.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (i) {
      return Bv(Si(e, i));
    }),
    n
  );
}
const Z = Bv(Jd);
Z.Axios = Wo;
Z.CanceledError = Ys;
Z.CancelToken = CC;
Z.isCancel = Nv;
Z.VERSION = bv;
Z.toFormData = rl;
Z.AxiosError = U;
Z.Cancel = Z.CanceledError;
Z.all = function (t) {
  return Promise.all(t);
};
Z.spread = EC;
Z.isAxiosError = TC;
Z.mergeConfig = Si;
Z.AxiosHeaders = Xt;
Z.formToJSON = (e) => Av(R.isHTMLForm(e) ? new FormData(e) : e);
Z.getAdapter = Vv.getAdapter;
Z.HttpStatusCode = RC;
Z.default = Z;
var kC = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const fp = (e) => {
    let t;
    const n = new Set(),
      r = (c, d) => {
        const f = typeof c == "function" ? c(t) : c;
        if (!Object.is(f, t)) {
          const g = t;
          (t =
            d ?? (typeof f != "object" || f === null)
              ? f
              : Object.assign({}, t, f)),
            n.forEach((m) => m(t, g));
        }
      },
      i = () => t,
      l = {
        setState: r,
        getState: i,
        getInitialState: () => u,
        subscribe: (c) => (n.add(c), () => n.delete(c)),
        destroy: () => {
          (kC ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
            ),
            n.clear();
        },
      },
      u = (t = e(r, i, l));
    return l;
  },
  _C = (e) => (e ? fp(e) : fp);
var zv = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const { useDebugValue: OC } = Rn,
  { useSyncExternalStoreWithSelector: DC } = Ex;
let hp = !1;
const MC = (e) => e;
function jC(e, t = MC, n) {
  (zv ? "production" : void 0) !== "production" &&
    n &&
    !hp &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    ),
    (hp = !0));
  const r = DC(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return OC(r), r;
}
const pp = (e) => {
    (zv ? "production" : void 0) !== "production" &&
      typeof e != "function" &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
      );
    const t = typeof e == "function" ? _C(e) : e,
      n = (r, i) => jC(t, r, i);
    return Object.assign(n, t), n;
  },
  Xs = (e) => (e ? pp(e) : pp),
  Pr = Xs((e, t) => ({
    retrac_items: {},
    load: async () => {
      const n = await UC();
      e({ retrac_items: n });
    },
    find: (n) => t().retrac_items[n] || null,
    find_all_by_type: (n) =>
      Object.values(t().retrac_items).filter(
        (r) =>
          r.type.value.includes(n) ||
          r.type.displayValue.includes(n) ||
          r.type.backendValue.includes(n)
      ),
    find_all_by_set: (n) =>
      Object.values(t().retrac_items).filter(
        (r) =>
          r.set.value.includes(n) ||
          r.set.text.includes(n) ||
          r.set.backendValue.includes(n)
      ),
    find_all_by_name: (n) =>
      Object.values(t().retrac_items).filter(
        (r) =>
          r.name.toLowerCase().includes(n.toLowerCase()) ||
          r.id.toLowerCase().includes(n.toLowerCase())
      ),
  })),
  IC = async (e) => {
    const t = new TextEncoder().encode(e),
      n = await window.crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(n))
      .map((s) => s.toString(16).padStart(2, "0"))
      .join("");
  },
  LC = async (e, t) => {
    const n = await IC(Math.random().toString());
    return {
      ID: n,
      ShopSectionID: e,
      Type: "item",
      Rewards: [
        {
          ID: crypto.randomUUID(),
          Template: "CID_031_Athena_Commando_M_Retro",
          BackendValue: "AthenaCharacter",
          Quantity: 1,
          ProfileType: "athena",
          Status: 0,
          ShopOfferID: n,
        },
      ],
      Price: {
        ID: crypto.randomUUID(),
        ShopOfferID: n,
        PriceType: "MtxCurrency",
        SaleType: "AmountOff",
        OriginalPrice: 0,
        FinalPrice: 0,
      },
      Display: {
        ID: crypto.randomUUID(),
        ShopOfferID: n,
        Title: "",
        Description: "",
        ShortDescription: "",
        LongDescription: "",
      },
      Meta: {
        ID: crypto.randomUUID(),
        ShopOfferID: n,
        TileSize: "",
        SectionID: t,
        DisplayAssetPath: "",
        NewDisplayAssetPath: "",
        BannerOverride: "",
        Giftable: !0,
        Refundable: !0,
        PriorityShop: 0,
        PriorityCategory: 0,
        OnlyOnce: !1,
        OriginalOffer: 0,
        ExtraBonus: 0,
        FeaturedImageURL: "",
        ReleaseSeason: 0,
        IconSize: "",
        CurrencyAnalyticsName: "",
        Categories: [],
      },
    };
  },
  _i = "https://retrac.site";
var AC = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function Uv(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (i) => {
      var s;
      const o = (l) =>
          l === null ? null : JSON.parse(l, t == null ? void 0 : t.reviver),
        a = (s = n.getItem(i)) != null ? s : null;
      return a instanceof Promise ? a.then(o) : o(a);
    },
    setItem: (i, s) =>
      n.setItem(i, JSON.stringify(s, t == null ? void 0 : t.replacer)),
    removeItem: (i) => n.removeItem(i),
  };
}
const ks = (e) => (t) => {
    try {
      const n = e(t);
      return n instanceof Promise
        ? n
        : {
            then(r) {
              return ks(r)(n);
            },
            catch(r) {
              return this;
            },
          };
    } catch (n) {
      return {
        then(r) {
          return this;
        },
        catch(r) {
          return ks(r)(n);
        },
      };
    }
  },
  NC = (e, t) => (n, r, i) => {
    let s = {
        getStorage: () => localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        partialize: (w) => w,
        version: 0,
        merge: (w, p) => ({ ...p, ...w }),
        ...t,
      },
      o = !1;
    const a = new Set(),
      l = new Set();
    let u;
    try {
      u = s.getStorage();
    } catch {}
    if (!u)
      return e(
        (...w) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`
          ),
            n(...w);
        },
        r,
        i
      );
    const c = ks(s.serialize),
      d = () => {
        const w = s.partialize({ ...r() });
        let p;
        const h = c({ state: w, version: s.version })
          .then((v) => u.setItem(s.name, v))
          .catch((v) => {
            p = v;
          });
        if (p) throw p;
        return h;
      },
      f = i.setState;
    i.setState = (w, p) => {
      f(w, p), d();
    };
    const g = e(
      (...w) => {
        n(...w), d();
      },
      r,
      i
    );
    let m;
    const y = () => {
      var w;
      if (!u) return;
      (o = !1), a.forEach((h) => h(r()));
      const p =
        ((w = s.onRehydrateStorage) == null ? void 0 : w.call(s, r())) ||
        void 0;
      return ks(u.getItem.bind(u))(s.name)
        .then((h) => {
          if (h) return s.deserialize(h);
        })
        .then((h) => {
          if (h)
            if (typeof h.version == "number" && h.version !== s.version) {
              if (s.migrate) return s.migrate(h.state, h.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return h.state;
        })
        .then((h) => {
          var v;
          return (m = s.merge(h, (v = r()) != null ? v : g)), n(m, !0), d();
        })
        .then(() => {
          p == null || p(m, void 0), (o = !0), l.forEach((h) => h(m));
        })
        .catch((h) => {
          p == null || p(void 0, h);
        });
    };
    return (
      (i.persist = {
        setOptions: (w) => {
          (s = { ...s, ...w }), w.getStorage && (u = w.getStorage());
        },
        clearStorage: () => {
          u == null || u.removeItem(s.name);
        },
        getOptions: () => s,
        rehydrate: () => y(),
        hasHydrated: () => o,
        onHydrate: (w) => (
          a.add(w),
          () => {
            a.delete(w);
          }
        ),
        onFinishHydration: (w) => (
          l.add(w),
          () => {
            l.delete(w);
          }
        ),
      }),
      y(),
      m || g
    );
  },
  FC = (e, t) => (n, r, i) => {
    let s = {
        storage: Uv(() => localStorage),
        partialize: (y) => y,
        version: 0,
        merge: (y, w) => ({ ...w, ...y }),
        ...t,
      },
      o = !1;
    const a = new Set(),
      l = new Set();
    let u = s.storage;
    if (!u)
      return e(
        (...y) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`
          ),
            n(...y);
        },
        r,
        i
      );
    const c = () => {
        const y = s.partialize({ ...r() });
        return u.setItem(s.name, { state: y, version: s.version });
      },
      d = i.setState;
    i.setState = (y, w) => {
      d(y, w), c();
    };
    const f = e(
      (...y) => {
        n(...y), c();
      },
      r,
      i
    );
    i.getInitialState = () => f;
    let g;
    const m = () => {
      var y, w;
      if (!u) return;
      (o = !1),
        a.forEach((h) => {
          var v;
          return h((v = r()) != null ? v : f);
        });
      const p =
        ((w = s.onRehydrateStorage) == null
          ? void 0
          : w.call(s, (y = r()) != null ? y : f)) || void 0;
      return ks(u.getItem.bind(u))(s.name)
        .then((h) => {
          if (h)
            if (typeof h.version == "number" && h.version !== s.version) {
              if (s.migrate) return s.migrate(h.state, h.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return h.state;
        })
        .then((h) => {
          var v;
          return (g = s.merge(h, (v = r()) != null ? v : f)), n(g, !0), c();
        })
        .then(() => {
          p == null || p(g, void 0),
            (g = r()),
            (o = !0),
            l.forEach((h) => h(g));
        })
        .catch((h) => {
          p == null || p(void 0, h);
        });
    };
    return (
      (i.persist = {
        setOptions: (y) => {
          (s = { ...s, ...y }), y.storage && (u = y.storage);
        },
        clearStorage: () => {
          u == null || u.removeItem(s.name);
        },
        getOptions: () => s,
        rehydrate: () => m(),
        hasHydrated: () => o,
        onHydrate: (y) => (
          a.add(y),
          () => {
            a.delete(y);
          }
        ),
        onFinishHydration: (y) => (
          l.add(y),
          () => {
            l.delete(y);
          }
        ),
      }),
      s.skipHydration || m(),
      g || f
    );
  },
  VC = (e, t) =>
    "getStorage" in t || "serialize" in t || "deserialize" in t
      ? ((AC ? "production" : void 0) !== "production" &&
          console.warn(
            "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
          ),
        NC(e, t))
      : FC(e, t),
  bC = VC,
  Cr = Xs()(
    bC(
      (e) => ({
        access_token: "",
        new_token: async (t) => e({ access_token: t }),
        kill_token: () => {
          e({ access_token: "" });
        },
      }),
      { name: "user.control", storage: Uv(() => localStorage) }
    )
  ),
  BC = async () => {
    const e = await Z.get("/_fake_shop.json").catch(() => null);
    return e == null || e.data === null || e.status !== 200 || !e.data
      ? null
      : e.data;
  },
  sl = async (e) => {
    const n = Pr.getState().find(e);
    return (
      n || {
        id: "CID_Nothing",
        name: "Nothing",
        description: "",
        type: { value: "", displayValue: "", backendValue: "" },
        rarity: {
          value: "common",
          displayValue: "cegendary",
          backendValue: "EFortRarity::Common",
        },
        set: { value: "", text: "", backendValue: "" },
        images: {
          smallIcon: "",
          icon: "",
          featured: "",
          lego: { small: "", large: "", wide: "" },
        },
        variants: [],
        gameplayTags: [],
        path: "",
        added: "",
      }
    );
  },
  mp = [
    "AthenaCharacter",
    "AthenaBackpack",
    "AthenaDance",
    "AthenaPickaxe",
    "AthenaGlider",
    "AthenaEmoji",
    "AthenaLoadingScreen",
    "AthenaMusicPack",
    "AthenaPet",
    "AthenaSkyDiveContrail",
    "AthenaSpray",
    "AthenaToy",
    "AthenaWrap",
  ],
  zC = async (e) => {
    const t = Pr.getState(),
      [n, r] = await Promise.all([
        t.find_all_by_name(e),
        t.find_all_by_set(e),
        t.find_all_by_type(e),
      ]);
    return [...(n || []), ...(r || [])].slice(0, 10).sort((i, s) => {
      const o = mp.indexOf(i.type.backendValue),
        a = mp.indexOf(s.type.backendValue);
      return o === -1 && a === -1 ? 0 : o === -1 ? 1 : a === -1 ? -1 : o - a;
    });
  },
  UC = async () => {
    const e = await Z.get(`${_i}/snow/cosmetics`).catch(() => null);
    return e == null || e.data === null || e.status !== 200 || !e.data
      ? {}
      : e.data.items;
  },
  yp = async () => {
    const e = await Z.get(`${_i}/snow/discord?panel=true`).catch(() => null);
    return e == null || e.data === null || e.status !== 200 || !e.data
      ? ""
      : e.data;
  },
  $C = async () => {
    const e = Cr.getState(),
      t = await Z.get(`${_i}/admin`, {
        headers: { Authorization: e.access_token },
      }).catch(() => null);
    return t == null || t.data === null || t.status !== 200 || !t.data
      ? "FAILED"
      : t.data;
  },
  HC = async () => {
    const e = Cr.getState(),
      t = await Z.get(`${_i}/admin/shops`, {
        headers: { Authorization: e.access_token },
      }).catch(() => null);
    return t == null || t.data === null || t.status !== 200 || !t.data
      ? []
      : t.data;
  },
  KC = async (e) => {
    const t = Cr.getState(),
      n = await Z.get(`${_i}/admin/shop/${e}`, {
        headers: { Authorization: t.access_token },
      }).catch(() => null);
    return n == null || n.data === null || n.status !== 200 || !n.data
      ? null
      : n.data;
  },
  WC = async (e) => {
    const t = Cr.getState(),
      n = await Z.post(`${_i}/admin/shop`, e, {
        headers: { Authorization: t.access_token },
      }).catch(() => null);
    return n == null || n.data === null || n.status !== 200 || !n.data
      ? null
      : n.data;
  },
  Bt = Xs((e, t) => ({
    catalog: null,
    setCatalog: (n) => e({ catalog: n }),
    add_new_offer: async (n, r) => {
      const i = t().catalog;
      if (!i) return;
      const s = i.Sections.find((u) => u.ID === n);
      if (!s) return;
      const o = await LC(n, r);
      o.Meta.PriorityShop = s.itemOffers.length + 1;
      const a = { ...s, itemOffers: [...s.itemOffers, o] },
        l = { ...i, Sections: i.Sections.map((u) => (u.ID === a.ID ? a : u)) };
      e({ catalog: l });
    },
    add_new_reward: async (n) => {
      const r = t().catalog;
      if (!r) return;
      const i = r.Sections.flatMap((u) => u.itemOffers).find((u) => u.ID === n);
      if (!i) return;
      const s = {
        ID: crypto.randomUUID(),
        Template: "CID_031_Athena_Commando_M_Retro",
        BackendValue: "AthenaCharacter",
        Quantity: 1,
        ProfileType: "athena",
        Status: 0,
        ShopOfferID: i.ID,
      };
      s.Quantity = 1;
      const o = { ...i, Rewards: [...i.Rewards, s] },
        a = r.Sections.flatMap((u) => u.itemOffers).map((u) =>
          u.ID === o.ID ? o : u
        ),
        l = {
          ...r,
          Sections: r.Sections.map((u) => ({
            ...u,
            itemOffers: a.filter((c) => c.ShopSectionID === u.ID),
          })),
        };
      e({ catalog: l });
    },
    add_new_reward_from_api: async (n, r) => {
      const i = t().catalog;
      if (!i) return;
      const s = i.Sections.flatMap((c) => c.itemOffers).find((c) => c.ID === n);
      if (!s) return;
      const o = {
          ID: crypto.randomUUID(),
          Template: r.id,
          BackendValue: r.type.backendValue,
          Quantity: 1,
          ProfileType: "athena",
          Status: 0,
          ShopOfferID: s.ID,
        },
        a = { ...s, Rewards: [...s.Rewards, o] },
        l = i.Sections.flatMap((c) => c.itemOffers).map((c) =>
          c.ID === a.ID ? a : c
        ),
        u = {
          ...i,
          Sections: i.Sections.map((c) => ({
            ...c,
            itemOffers: l.filter((d) => d.ShopSectionID === c.ID),
          })),
        };
      e({ catalog: u });
    },
    remove_offer: (n) => {
      const r = t().catalog;
      if (!r) return;
      const i = r.Sections.find((a) => a.itemOffers.find((l) => l.ID === n));
      if (!i) return;
      const s = { ...i, itemOffers: i.itemOffers.filter((a) => a.ID !== n) },
        o = { ...r, Sections: r.Sections.map((a) => (a.ID === s.ID ? s : a)) };
      e({ catalog: o });
    },
    remove_reward: (n) => {
      const r = t().catalog;
      if (!r) return;
      const i = r.Sections.flatMap((c) => c.itemOffers).find((c) =>
        c.Rewards.find((d) => d.ID === n)
      );
      if (!i) return;
      if (i.Rewards.length === 1) return t().remove_offer(i.ID);
      const s = r.Sections.find((c) => c.ID === i.ShopSectionID);
      if (!s) return;
      const o = { ...i, Rewards: i.Rewards.filter((c) => c.ID !== n) },
        a = s.itemOffers.map((c) => (c.ID === o.ID ? o : c)),
        l = { ...s, itemOffers: a },
        u = { ...r, Sections: r.Sections.map((c) => (c.ID === l.ID ? l : c)) };
      e({ catalog: u });
    },
    find_section: (n) => {
      const r = t().catalog;
      if (r) return r.Sections.find((i) => i.ID === n);
    },
    find_offer: (n) => {
      const r = t().catalog;
      if (r)
        return r.Sections.flatMap((i) => i.itemOffers).find((i) => i.ID === n);
    },
    find_reward: (n) => {
      const r = t().catalog;
      if (r)
        return r.Sections.flatMap((i) => i.itemOffers)
          .flatMap((i) => i.Rewards)
          .find((i) => i.ID === n);
    },
    set_reward_quantity: (n, r) => {
      const i = t().catalog;
      if (!i) return;
      const s = i.Sections.flatMap((m) => m.itemOffers)
        .flatMap((m) => m.Rewards)
        .find((m) => m.ID === n);
      if (!s) return;
      const o = i.Sections.flatMap((m) => m.itemOffers).find(
        (m) => m.ID === s.ShopOfferID
      );
      if (!o) return;
      if (r < 1) return t().remove_reward(n);
      const a = i.Sections.find((m) => m.ID === o.ShopSectionID);
      if (!a) return;
      const l = { ...s, Quantity: r },
        u = o.Rewards.map((m) => (m.ID === l.ID ? l : m)),
        c = { ...o, Rewards: u },
        d = a.itemOffers.map((m) => (m.ID === c.ID ? c : m)),
        f = { ...a, itemOffers: d },
        g = { ...i, Sections: i.Sections.map((m) => (m.ID === f.ID ? f : m)) };
      e({ catalog: g });
    },
    set_reward_any: (n, r, i) => {
      const s = t().catalog;
      if (!s) return;
      const o = s.Sections.flatMap((y) => y.itemOffers)
        .flatMap((y) => y.Rewards)
        .find((y) => y.ID === n);
      if (!o) return;
      const a = s.Sections.flatMap((y) => y.itemOffers).find(
        (y) => y.ID === o.ShopOfferID
      );
      if (!a) return;
      const l = s.Sections.find((y) => y.ID === a.ShopSectionID);
      if (!l) return;
      const u = { ...o, [r]: i },
        c = a.Rewards.map((y) => (y.ID === u.ID ? u : y)),
        d = { ...a, Rewards: c },
        f = l.itemOffers.map((y) => (y.ID === d.ID ? d : y)),
        g = { ...l, itemOffers: f },
        m = { ...s, Sections: s.Sections.map((y) => (y.ID === g.ID ? g : y)) };
      e({ catalog: m });
    },
    set_offer_meta: (n, r, i) => {
      const s = t().catalog;
      if (!s) return;
      const o = s.Sections.flatMap((f) => f.itemOffers).find((f) => f.ID === n);
      if (!o) return;
      const a = s.Sections.find((f) => f.ID === o.ShopSectionID);
      if (!a) return;
      const l = { ...o, Meta: { ...o.Meta, [r]: i } },
        u = a.itemOffers.map((f) => (f.ID === l.ID ? l : f)),
        c = { ...a, itemOffers: u },
        d = { ...s, Sections: s.Sections.map((f) => (f.ID === c.ID ? c : f)) };
      e({ catalog: d });
    },
    set_offer_price: (n, r, i) => {
      const s = t().catalog;
      if (!s) return;
      const o = s.Sections.flatMap((f) => f.itemOffers).find((f) => f.ID === n);
      if (!o) return;
      const a = s.Sections.find((f) => f.ID === o.ShopSectionID);
      if (!a) return;
      const l = { ...o, Price: { ...o.Price, [r]: i } },
        u = a.itemOffers.map((f) => (f.ID === l.ID ? l : f)),
        c = { ...a, itemOffers: u },
        d = { ...s, Sections: s.Sections.map((f) => (f.ID === c.ID ? c : f)) };
      e({ catalog: d });
    },
  })),
  QC = () => {
    const e = Cr(),
      t = Gd(),
      n = () => {
        e.kill_token(), t({ to: "/credentials" });
      };
    return S.jsxs("div", {
      className: "drawer",
      children: [
        S.jsx(Ro, { path: "/shop", title: "Shops" }),
        S.jsx(Ro, { path: "/ini", title: "Hotfixes" }),
        S.jsx(Ro, { path: "/paks", title: "Paks" }),
        S.jsx(Ro, { path: "/cdn", title: "Assets" }),
        S.jsx("button", { onClick: n, className: "link", children: "Log Out" }),
      ],
    });
  },
  Ro = (e) =>
    S.jsx(aP, {
      className: "link",
      to: "/panel" + e.path,
      activeOptions: { exact: !0 },
      children: S.jsx("span", { children: e.title }),
    }),
  GC = () => {
    const e = Gd(),
      [t, n] = Bt((s) => [s.setCatalog, s.catalog]),
      [r] = Pr((s) => [s.load]),
      [i] = Cr((s) => [s.kill_token]);
    return (
      T.useEffect(() => {
        (async () => (t(await BC()), r()))();
      }, []),
      T.useEffect(() => {
        (async () => (await $C()) === "FAILED" && (i(), e({ to: "/" })))();
      }, [n]),
      S.jsxs("div", {
        className: "panel",
        children: [
          S.jsx(QC, {}),
          S.jsx("div", { className: "content", children: S.jsx(Wd, {}) }),
        ],
      })
    );
  };
var $v = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  gp = Rn.createContext && Rn.createContext($v),
  qC = ["attr", "size", "title"];
function YC(e, t) {
  if (e == null) return {};
  var n = XC(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (i = 0; i < s.length; i++)
      (r = s[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function XC(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Ca() {
  return (
    (Ca = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ca.apply(this, arguments)
  );
}
function vp(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ea(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? vp(Object(n), !0).forEach(function (r) {
          JC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : vp(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function JC(e, t, n) {
  return (
    (t = ZC(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function ZC(e) {
  var t = eE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function eE(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Hv(e) {
  return (
    e &&
    e.map((t, n) =>
      Rn.createElement(t.tag, Ea({ key: n }, t.attr), Hv(t.child))
    )
  );
}
function rt(e) {
  return (t) =>
    Rn.createElement(tE, Ca({ attr: Ea({}, e.attr) }, t), Hv(e.child));
}
function tE(e) {
  var t = (n) => {
    var { attr: r, size: i, title: s } = e,
      o = YC(e, qC),
      a = i || n.size || "1em",
      l;
    return (
      n.className && (l = n.className),
      e.className && (l = (l ? l + " " : "") + e.className),
      Rn.createElement(
        "svg",
        Ca(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          o,
          {
            className: l,
            style: Ea(Ea({ color: e.color || n.color }, n.style), e.style),
            height: a,
            width: a,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        s && Rn.createElement("title", null, s),
        e.children
      )
    );
  };
  return gp !== void 0
    ? Rn.createElement(gp.Consumer, null, (n) => t(n))
    : t($v);
}
function nE(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z",
        },
        child: [],
      },
    ],
  })(e);
}
const rE = () => {
  const e = Cr();
  return (
    T.useEffect(() => {
      if (window.location.search.includes("token")) {
        const r = window.location.search.split("token=")[1];
        e.new_token(r), (window.location.href = "/panel");
      }
      const n = setInterval(async () => {
        await yp();
      }, 1e3);
      return () => clearInterval(n);
    }, []),
    S.jsx("div", {
      className: "credentialsContainer",
      children: S.jsx("div", {
        className: "half blurred",
        children: S.jsxs("div", {
          className: "modal",
          children: [
            S.jsxs("header", {
              className: "loginHead",
              children: [
                S.jsx("h2", { children: "Retrac Panel" }),
                S.jsx("p", {
                  children:
                    "Sign in with your discord account to gain access to the panel!",
                }),
              ],
            }),
            S.jsxs("button", {
              className: "discordRedirect",
              onClick: async () => {
                const t = await yp();
                t && (window.location.href = t);
              },
              children: [
                S.jsx(nE, { className: "icon" }),
                S.jsx("span", { children: "Login via Discord" }),
              ],
            }),
          ],
        }),
      }),
    })
  );
};
var Js = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          this.listeners.delete(e), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  wi = typeof window > "u" || "Deno" in globalThis;
function at() {}
function iE(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Cc(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Kv(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Sp(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: i,
    predicate: s,
    queryKey: o,
    stale: a,
  } = e;
  if (o) {
    if (r) {
      if (t.queryHash !== tf(o, t.options)) return !1;
    } else if (!Os(t.queryKey, o)) return !1;
  }
  if (n !== "all") {
    const l = t.isActive();
    if ((n === "active" && !l) || (n === "inactive" && l)) return !1;
  }
  return !(
    (typeof a == "boolean" && t.isStale() !== a) ||
    (i && i !== t.state.fetchStatus) ||
    (s && !s(t))
  );
}
function wp(e, t) {
  const { exact: n, status: r, predicate: i, mutationKey: s } = e;
  if (s) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (_s(t.options.mutationKey) !== _s(s)) return !1;
    } else if (!Os(t.options.mutationKey, s)) return !1;
  }
  return !((r && t.state.status !== r) || (i && !i(t)));
}
function tf(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || _s)(e);
}
function _s(e) {
  return JSON.stringify(e, (t, n) =>
    Tc(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, i) => ((r[i] = n[i]), r), {})
      : n
  );
}
function Os(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
    ? !1
    : e && t && typeof e == "object" && typeof t == "object"
    ? !Object.keys(t).some((n) => !Os(e[n], t[n]))
    : !1;
}
function Wv(e, t) {
  if (e === t) return e;
  const n = xp(e) && xp(t);
  if (n || (Tc(e) && Tc(t))) {
    const r = n ? e : Object.keys(e),
      i = r.length,
      s = n ? t : Object.keys(t),
      o = s.length,
      a = n ? [] : {};
    let l = 0;
    for (let u = 0; u < o; u++) {
      const c = n ? u : s[u];
      ((!n && r.includes(c)) || n) && e[c] === void 0 && t[c] === void 0
        ? ((a[c] = void 0), l++)
        : ((a[c] = Wv(e[c], t[c])), a[c] === e[c] && e[c] !== void 0 && l++);
    }
    return i === o && l === i ? e : a;
  }
  return t;
}
function Ec(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function xp(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Tc(e) {
  if (!Pp(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !Pp(n) ||
    !n.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Pp(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function sE(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function Rc(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
    ? Wv(e, t)
    : t;
}
function oE(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function aE(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var nf = Symbol(),
  ir,
  vn,
  Xr,
  Fm,
  lE =
    ((Fm = class extends Js {
      constructor() {
        super();
        A(this, ir, void 0);
        A(this, vn, void 0);
        A(this, Xr, void 0);
        L(this, Xr, (t) => {
          if (!wi && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener("visibilitychange", n, !1),
              () => {
                window.removeEventListener("visibilitychange", n);
              }
            );
          }
        });
      }
      onSubscribe() {
        P(this, vn) || this.setEventListener(P(this, Xr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = P(this, vn)) == null || t.call(this), L(this, vn, void 0));
      }
      setEventListener(t) {
        var n;
        L(this, Xr, t),
          (n = P(this, vn)) == null || n.call(this),
          L(
            this,
            vn,
            t((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            })
          );
      }
      setFocused(t) {
        P(this, ir) !== t && (L(this, ir, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach((n) => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof P(this, ir) == "boolean"
          ? P(this, ir)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !==
              "hidden";
      }
    }),
    (ir = new WeakMap()),
    (vn = new WeakMap()),
    (Xr = new WeakMap()),
    Fm),
  rf = new lE(),
  Jr,
  Sn,
  Zr,
  Vm,
  uE =
    ((Vm = class extends Js {
      constructor() {
        super();
        A(this, Jr, !0);
        A(this, Sn, void 0);
        A(this, Zr, void 0);
        L(this, Zr, (t) => {
          if (!wi && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener("online", n, !1),
              window.addEventListener("offline", r, !1),
              () => {
                window.removeEventListener("online", n),
                  window.removeEventListener("offline", r);
              }
            );
          }
        });
      }
      onSubscribe() {
        P(this, Sn) || this.setEventListener(P(this, Zr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = P(this, Sn)) == null || t.call(this), L(this, Sn, void 0));
      }
      setEventListener(t) {
        var n;
        L(this, Zr, t),
          (n = P(this, Sn)) == null || n.call(this),
          L(this, Sn, t(this.setOnline.bind(this)));
      }
      setOnline(t) {
        P(this, Jr) !== t &&
          (L(this, Jr, t),
          this.listeners.forEach((r) => {
            r(t);
          }));
      }
      isOnline() {
        return P(this, Jr);
      }
    }),
    (Jr = new WeakMap()),
    (Sn = new WeakMap()),
    (Zr = new WeakMap()),
    Vm),
  Ta = new uE();
function cE(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Qv(e) {
  return (e ?? "online") === "online" ? Ta.isOnline() : !0;
}
var Gv = class {
  constructor(e) {
    (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent);
  }
};
function ou(e) {
  return e instanceof Gv;
}
function qv(e) {
  let t = !1,
    n = 0,
    r = !1,
    i,
    s,
    o;
  const a = new Promise((p, h) => {
      (s = p), (o = h);
    }),
    l = (p) => {
      var h;
      r || (m(new Gv(p)), (h = e.abort) == null || h.call(e));
    },
    u = () => {
      t = !0;
    },
    c = () => {
      t = !1;
    },
    d = () =>
      rf.isFocused() &&
      (e.networkMode === "always" || Ta.isOnline()) &&
      e.canRun(),
    f = () => Qv(e.networkMode) && e.canRun(),
    g = (p) => {
      var h;
      r ||
        ((r = !0),
        (h = e.onSuccess) == null || h.call(e, p),
        i == null || i(),
        s(p));
    },
    m = (p) => {
      var h;
      r ||
        ((r = !0),
        (h = e.onError) == null || h.call(e, p),
        i == null || i(),
        o(p));
    },
    y = () =>
      new Promise((p) => {
        var h;
        (i = (v) => {
          (r || d()) && p(v);
        }),
          (h = e.onPause) == null || h.call(e);
      }).then(() => {
        var p;
        (i = void 0), r || (p = e.onContinue) == null || p.call(e);
      }),
    w = () => {
      if (r) return;
      let p;
      try {
        p = e.fn();
      } catch (h) {
        p = Promise.reject(h);
      }
      Promise.resolve(p)
        .then(g)
        .catch((h) => {
          var _;
          if (r) return;
          const v = e.retry ?? (wi ? 0 : 3),
            x = e.retryDelay ?? cE,
            E = typeof x == "function" ? x(n, h) : x,
            k =
              v === !0 ||
              (typeof v == "number" && n < v) ||
              (typeof v == "function" && v(n, h));
          if (t || !k) {
            m(h);
            return;
          }
          n++,
            (_ = e.onFail) == null || _.call(e, n, h),
            sE(E)
              .then(() => (d() ? void 0 : y()))
              .then(() => {
                t ? m(h) : w();
              });
        });
    };
  return {
    promise: a,
    cancel: l,
    continue: () => (i == null || i(), a),
    cancelRetry: u,
    continueRetry: c,
    canStart: f,
    start: () => (f() ? w() : y().then(w), a),
  };
}
function dE() {
  let e = [],
    t = 0,
    n = (f) => {
      f();
    },
    r = (f) => {
      f();
    },
    i = (f) => setTimeout(f, 0);
  const s = (f) => {
      i = f;
    },
    o = (f) => {
      let g;
      t++;
      try {
        g = f();
      } finally {
        t--, t || u();
      }
      return g;
    },
    a = (f) => {
      t
        ? e.push(f)
        : i(() => {
            n(f);
          });
    },
    l =
      (f) =>
      (...g) => {
        a(() => {
          f(...g);
        });
      },
    u = () => {
      const f = e;
      (e = []),
        f.length &&
          i(() => {
            r(() => {
              f.forEach((g) => {
                n(g);
              });
            });
          });
    };
  return {
    batch: o,
    batchCalls: l,
    schedule: a,
    setNotifyFunction: (f) => {
      n = f;
    },
    setBatchNotifyFunction: (f) => {
      r = f;
    },
    setScheduler: s,
  };
}
var Ce = dE(),
  sr,
  bm,
  Yv =
    ((bm = class {
      constructor() {
        A(this, sr, void 0);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          Cc(this.gcTime) &&
            L(
              this,
              sr,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            );
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (wi ? 1 / 0 : 5 * 60 * 1e3)
        );
      }
      clearGcTimeout() {
        P(this, sr) && (clearTimeout(P(this, sr)), L(this, sr, void 0));
      }
    }),
    (sr = new WeakMap()),
    bm),
  ei,
  ti,
  ot,
  Ae,
  Is,
  or,
  St,
  $t,
  Bm,
  fE =
    ((Bm = class extends Yv {
      constructor(t) {
        super();
        A(this, St);
        A(this, ei, void 0);
        A(this, ti, void 0);
        A(this, ot, void 0);
        A(this, Ae, void 0);
        A(this, Is, void 0);
        A(this, or, void 0);
        L(this, or, !1),
          L(this, Is, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          L(this, ot, t.cache),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          L(this, ei, t.state || hE(this.options)),
          (this.state = P(this, ei)),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      setOptions(t) {
        (this.options = { ...P(this, Is), ...t }),
          this.updateGcTime(this.options.gcTime);
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          P(this, ot).remove(this);
      }
      setData(t, n) {
        const r = Rc(this.state.data, t, this.options);
        return (
          z(this, St, $t).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        z(this, St, $t).call(this, {
          type: "setState",
          state: t,
          setStateOptions: n,
        });
      }
      cancel(t) {
        var r, i;
        const n = (r = P(this, Ae)) == null ? void 0 : r.promise;
        return (
          (i = P(this, Ae)) == null || i.cancel(t),
          n ? n.then(at).catch(at) : Promise.resolve()
        );
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(P(this, ei));
      }
      isActive() {
        return this.observers.some((t) => t.options.enabled !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0 && !this.isActive();
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
          ? this.observers.some((t) => t.getCurrentResult().isStale)
          : this.state.data === void 0;
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !Kv(this.state.dataUpdatedAt, t)
        );
      }
      onFocus() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        t == null || t.refetch({ cancelRefetch: !1 }),
          (n = P(this, Ae)) == null || n.continue();
      }
      onOnline() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnReconnect());
        t == null || t.refetch({ cancelRefetch: !1 }),
          (n = P(this, Ae)) == null || n.continue();
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          P(this, ot).notify({
            type: "observerAdded",
            query: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((n) => n !== t)),
          this.observers.length ||
            (P(this, Ae) &&
              (P(this, or)
                ? P(this, Ae).cancel({ revert: !0 })
                : P(this, Ae).cancelRetry()),
            this.scheduleGc()),
          P(this, ot).notify({
            type: "observerRemoved",
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          z(this, St, $t).call(this, { type: "invalidate" });
      }
      fetch(t, n) {
        var u, c, d;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (P(this, Ae))
            return P(this, Ae).continueRetry(), P(this, Ae).promise;
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const f = this.observers.find((g) => g.options.queryFn);
          f && this.setOptions(f.options);
        }
        const r = new AbortController(),
          i = { queryKey: this.queryKey, meta: this.meta },
          s = (f) => {
            Object.defineProperty(f, "signal", {
              enumerable: !0,
              get: () => (L(this, or, !0), r.signal),
            });
          };
        s(i);
        const o = () =>
            !this.options.queryFn || this.options.queryFn === nf
              ? Promise.reject(
                  new Error(`Missing queryFn: '${this.options.queryHash}'`)
                )
              : (L(this, or, !1),
                this.options.persister
                  ? this.options.persister(this.options.queryFn, i, this)
                  : this.options.queryFn(i)),
          a = {
            fetchOptions: n,
            options: this.options,
            queryKey: this.queryKey,
            state: this.state,
            fetchFn: o,
          };
        s(a),
          (u = this.options.behavior) == null || u.onFetch(a, this),
          L(this, ti, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !==
              ((c = a.fetchOptions) == null ? void 0 : c.meta)) &&
            z(this, St, $t).call(this, {
              type: "fetch",
              meta: (d = a.fetchOptions) == null ? void 0 : d.meta,
            });
        const l = (f) => {
          var g, m, y, w;
          (ou(f) && f.silent) ||
            z(this, St, $t).call(this, { type: "error", error: f }),
            ou(f) ||
              ((m = (g = P(this, ot).config).onError) == null ||
                m.call(g, f, this),
              (w = (y = P(this, ot).config).onSettled) == null ||
                w.call(y, this.state.data, f, this)),
            this.isFetchingOptimistic || this.scheduleGc(),
            (this.isFetchingOptimistic = !1);
        };
        return (
          L(
            this,
            Ae,
            qv({
              fn: a.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (f) => {
                var g, m, y, w;
                if (f === void 0) {
                  l(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                this.setData(f),
                  (m = (g = P(this, ot).config).onSuccess) == null ||
                    m.call(g, f, this),
                  (w = (y = P(this, ot).config).onSettled) == null ||
                    w.call(y, f, this.state.error, this),
                  this.isFetchingOptimistic || this.scheduleGc(),
                  (this.isFetchingOptimistic = !1);
              },
              onError: l,
              onFail: (f, g) => {
                z(this, St, $t).call(this, {
                  type: "failed",
                  failureCount: f,
                  error: g,
                });
              },
              onPause: () => {
                z(this, St, $t).call(this, { type: "pause" });
              },
              onContinue: () => {
                z(this, St, $t).call(this, { type: "continue" });
              },
              retry: a.options.retry,
              retryDelay: a.options.retryDelay,
              networkMode: a.options.networkMode,
              canRun: () => !0,
            })
          ),
          P(this, Ae).start()
        );
      }
    }),
    (ei = new WeakMap()),
    (ti = new WeakMap()),
    (ot = new WeakMap()),
    (Ae = new WeakMap()),
    (Is = new WeakMap()),
    (or = new WeakMap()),
    (St = new WeakSet()),
    ($t = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...Xv(r.data, this.options),
              fetchMeta: t.meta ?? null,
            };
          case "success":
            return {
              ...r,
              data: t.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const i = t.error;
            return ou(i) && i.revert && P(this, ti)
              ? { ...P(this, ti), fetchStatus: "idle" }
              : {
                  ...r,
                  error: i,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: i,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...t.state };
        }
      };
      (this.state = n(this.state)),
        Ce.batch(() => {
          this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            P(this, ot).notify({ query: this, type: "updated", action: t });
        });
    }),
    Bm);
function Xv(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Qv(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function hE(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var Ot,
  zm,
  pE =
    ((zm = class extends Js {
      constructor(t = {}) {
        super();
        A(this, Ot, void 0);
        (this.config = t), L(this, Ot, new Map());
      }
      build(t, n, r) {
        const i = n.queryKey,
          s = n.queryHash ?? tf(i, n);
        let o = this.get(s);
        return (
          o ||
            ((o = new fE({
              cache: this,
              queryKey: i,
              queryHash: s,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(i),
            })),
            this.add(o)),
          o
        );
      }
      add(t) {
        P(this, Ot).has(t.queryHash) ||
          (P(this, Ot).set(t.queryHash, t),
          this.notify({ type: "added", query: t }));
      }
      remove(t) {
        const n = P(this, Ot).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && P(this, Ot).delete(t.queryHash),
          this.notify({ type: "removed", query: t }));
      }
      clear() {
        Ce.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return P(this, Ot).get(t);
      }
      getAll() {
        return [...P(this, Ot).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => Sp(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((r) => Sp(t, r)) : n;
      }
      notify(t) {
        Ce.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        Ce.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        Ce.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (Ot = new WeakMap()),
    zm),
  Dt,
  Ne,
  ar,
  Mt,
  dn,
  Um,
  mE =
    ((Um = class extends Yv {
      constructor(t) {
        super();
        A(this, Mt);
        A(this, Dt, void 0);
        A(this, Ne, void 0);
        A(this, ar, void 0);
        (this.mutationId = t.mutationId),
          L(this, Ne, t.mutationCache),
          L(this, Dt, []),
          (this.state = t.state || yE()),
          this.setOptions(t.options),
          this.scheduleGc();
      }
      setOptions(t) {
        (this.options = t), this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        P(this, Dt).includes(t) ||
          (P(this, Dt).push(t),
          this.clearGcTimeout(),
          P(this, Ne).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        L(
          this,
          Dt,
          P(this, Dt).filter((n) => n !== t)
        ),
          this.scheduleGc(),
          P(this, Ne).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          });
      }
      optionalRemove() {
        P(this, Dt).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : P(this, Ne).remove(this));
      }
      continue() {
        var t;
        return (
          ((t = P(this, ar)) == null ? void 0 : t.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(t) {
        var i, s, o, a, l, u, c, d, f, g, m, y, w, p, h, v, x, E, k, _;
        L(
          this,
          ar,
          qv({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (C, M) => {
              z(this, Mt, dn).call(this, {
                type: "failed",
                failureCount: C,
                error: M,
              });
            },
            onPause: () => {
              z(this, Mt, dn).call(this, { type: "pause" });
            },
            onContinue: () => {
              z(this, Mt, dn).call(this, { type: "continue" });
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => P(this, Ne).canRun(this),
          })
        );
        const n = this.state.status === "pending",
          r = !P(this, ar).canStart();
        try {
          if (!n) {
            z(this, Mt, dn).call(this, {
              type: "pending",
              variables: t,
              isPaused: r,
            }),
              await ((s = (i = P(this, Ne).config).onMutate) == null
                ? void 0
                : s.call(i, t, this));
            const M = await ((a = (o = this.options).onMutate) == null
              ? void 0
              : a.call(o, t));
            M !== this.state.context &&
              z(this, Mt, dn).call(this, {
                type: "pending",
                context: M,
                variables: t,
                isPaused: r,
              });
          }
          const C = await P(this, ar).start();
          return (
            await ((u = (l = P(this, Ne).config).onSuccess) == null
              ? void 0
              : u.call(l, C, t, this.state.context, this)),
            await ((d = (c = this.options).onSuccess) == null
              ? void 0
              : d.call(c, C, t, this.state.context)),
            await ((g = (f = P(this, Ne).config).onSettled) == null
              ? void 0
              : g.call(
                  f,
                  C,
                  null,
                  this.state.variables,
                  this.state.context,
                  this
                )),
            await ((y = (m = this.options).onSettled) == null
              ? void 0
              : y.call(m, C, null, t, this.state.context)),
            z(this, Mt, dn).call(this, { type: "success", data: C }),
            C
          );
        } catch (C) {
          try {
            throw (
              (await ((p = (w = P(this, Ne).config).onError) == null
                ? void 0
                : p.call(w, C, t, this.state.context, this)),
              await ((v = (h = this.options).onError) == null
                ? void 0
                : v.call(h, C, t, this.state.context)),
              await ((E = (x = P(this, Ne).config).onSettled) == null
                ? void 0
                : E.call(
                    x,
                    void 0,
                    C,
                    this.state.variables,
                    this.state.context,
                    this
                  )),
              await ((_ = (k = this.options).onSettled) == null
                ? void 0
                : _.call(k, void 0, C, t, this.state.context)),
              C)
            );
          } finally {
            z(this, Mt, dn).call(this, { type: "error", error: C });
          }
        } finally {
          P(this, Ne).runNext(this);
        }
      }
    }),
    (Dt = new WeakMap()),
    (Ne = new WeakMap()),
    (ar = new WeakMap()),
    (Mt = new WeakSet()),
    (dn = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = n(this.state)),
        Ce.batch(() => {
          P(this, Dt).forEach((r) => {
            r.onMutationUpdate(t);
          }),
            P(this, Ne).notify({ mutation: this, type: "updated", action: t });
        });
    }),
    Um);
function yE() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var qe,
  Ls,
  $m,
  gE =
    (($m = class extends Js {
      constructor(t = {}) {
        super();
        A(this, qe, void 0);
        A(this, Ls, void 0);
        (this.config = t), L(this, qe, new Map()), L(this, Ls, Date.now());
      }
      build(t, n, r) {
        const i = new mE({
          mutationCache: this,
          mutationId: ++ao(this, Ls)._,
          options: t.defaultMutationOptions(n),
          state: r,
        });
        return this.add(i), i;
      }
      add(t) {
        const n = ko(t),
          r = P(this, qe).get(n) ?? [];
        r.push(t),
          P(this, qe).set(n, r),
          this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        var r;
        const n = ko(t);
        if (P(this, qe).has(n)) {
          const i =
            (r = P(this, qe).get(n)) == null
              ? void 0
              : r.filter((s) => s !== t);
          i && (i.length === 0 ? P(this, qe).delete(n) : P(this, qe).set(n, i));
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        var r;
        const n =
          (r = P(this, qe).get(ko(t))) == null
            ? void 0
            : r.find((i) => i.state.status === "pending");
        return !n || n === t;
      }
      runNext(t) {
        var r;
        const n =
          (r = P(this, qe).get(ko(t))) == null
            ? void 0
            : r.find((i) => i !== t && i.state.isPaused);
        return (n == null ? void 0 : n.continue()) ?? Promise.resolve();
      }
      clear() {
        Ce.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      getAll() {
        return [...P(this, qe).values()].flat();
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => wp(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter((n) => wp(t, n));
      }
      notify(t) {
        Ce.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((n) => n.state.isPaused);
        return Ce.batch(() =>
          Promise.all(t.map((n) => n.continue().catch(at)))
        );
      }
    }),
    (qe = new WeakMap()),
    (Ls = new WeakMap()),
    $m);
function ko(e) {
  var t;
  return (
    ((t = e.options.scope) == null ? void 0 : t.id) ?? String(e.mutationId)
  );
}
function vE(e) {
  return {
    onFetch: (t, n) => {
      const r = async () => {
        var m, y, w, p, h;
        const i = t.options,
          s =
            (w =
              (y = (m = t.fetchOptions) == null ? void 0 : m.meta) == null
                ? void 0
                : y.fetchMore) == null
              ? void 0
              : w.direction,
          o = ((p = t.state.data) == null ? void 0 : p.pages) || [],
          a = ((h = t.state.data) == null ? void 0 : h.pageParams) || [],
          l = { pages: [], pageParams: [] };
        let u = !1;
        const c = (v) => {
            Object.defineProperty(v, "signal", {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (u = !0)
                  : t.signal.addEventListener("abort", () => {
                      u = !0;
                    }),
                t.signal
              ),
            });
          },
          d =
            t.options.queryFn && t.options.queryFn !== nf
              ? t.options.queryFn
              : () =>
                  Promise.reject(
                    new Error(`Missing queryFn: '${t.options.queryHash}'`)
                  ),
          f = async (v, x, E) => {
            if (u) return Promise.reject();
            if (x == null && v.pages.length) return Promise.resolve(v);
            const k = {
              queryKey: t.queryKey,
              pageParam: x,
              direction: E ? "backward" : "forward",
              meta: t.options.meta,
            };
            c(k);
            const _ = await d(k),
              { maxPages: C } = t.options,
              M = E ? aE : oE;
            return {
              pages: M(v.pages, _, C),
              pageParams: M(v.pageParams, x, C),
            };
          };
        let g;
        if (s && o.length) {
          const v = s === "backward",
            x = v ? SE : Cp,
            E = { pages: o, pageParams: a },
            k = x(i, E);
          g = await f(E, k, v);
        } else {
          g = await f(l, a[0] ?? i.initialPageParam);
          const v = e ?? o.length;
          for (let x = 1; x < v; x++) {
            const E = Cp(i, g);
            g = await f(g, E);
          }
        }
        return g;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var i, s;
            return (s = (i = t.options).persister) == null
              ? void 0
              : s.call(
                  i,
                  r,
                  {
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal,
                  },
                  n
                );
          })
        : (t.fetchFn = r);
    },
  };
}
function Cp(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return e.getNextPageParam(t[r], t, n[r], n);
}
function SE(e, { pages: t, pageParams: n }) {
  var r;
  return (r = e.getPreviousPageParam) == null
    ? void 0
    : r.call(e, t[0], t, n[0], n);
}
var de,
  wn,
  xn,
  ni,
  ri,
  Pn,
  ii,
  si,
  Hm,
  wE =
    ((Hm = class {
      constructor(e = {}) {
        A(this, de, void 0);
        A(this, wn, void 0);
        A(this, xn, void 0);
        A(this, ni, void 0);
        A(this, ri, void 0);
        A(this, Pn, void 0);
        A(this, ii, void 0);
        A(this, si, void 0);
        L(this, de, e.queryCache || new pE()),
          L(this, wn, e.mutationCache || new gE()),
          L(this, xn, e.defaultOptions || {}),
          L(this, ni, new Map()),
          L(this, ri, new Map()),
          L(this, Pn, 0);
      }
      mount() {
        ao(this, Pn)._++,
          P(this, Pn) === 1 &&
            (L(
              this,
              ii,
              rf.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), P(this, de).onFocus());
              })
            ),
            L(
              this,
              si,
              Ta.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), P(this, de).onOnline());
              })
            ));
      }
      unmount() {
        var e, t;
        ao(this, Pn)._--,
          P(this, Pn) === 0 &&
            ((e = P(this, ii)) == null || e.call(this),
            L(this, ii, void 0),
            (t = P(this, si)) == null || t.call(this),
            L(this, si, void 0));
      }
      isFetching(e) {
        return P(this, de).findAll({ ...e, fetchStatus: "fetching" }).length;
      }
      isMutating(e) {
        return P(this, wn).findAll({ ...e, status: "pending" }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = P(this, de).get(t.queryHash)) == null
          ? void 0
          : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.getQueryData(e.queryKey);
        if (t === void 0) return this.fetchQuery(e);
        {
          const n = this.defaultQueryOptions(e),
            r = P(this, de).build(this, n);
          return (
            e.revalidateIfStale &&
              r.isStaleByTime(n.staleTime) &&
              this.prefetchQuery(n),
            Promise.resolve(t)
          );
        }
      }
      getQueriesData(e) {
        return P(this, de)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          i = P(this, de).get(r.queryHash),
          s = i == null ? void 0 : i.state.data,
          o = iE(t, s);
        if (o !== void 0)
          return P(this, de)
            .build(this, r)
            .setData(o, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return Ce.batch(() =>
          P(this, de)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)])
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = P(this, de).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = P(this, de);
        Ce.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = P(this, de),
          r = { type: "active", ...e };
        return Ce.batch(
          () => (
            n.findAll(e).forEach((i) => {
              i.reset();
            }),
            this.refetchQueries(r, t)
          )
        );
      }
      cancelQueries(e = {}, t = {}) {
        const n = { revert: !0, ...t },
          r = Ce.batch(() =>
            P(this, de)
              .findAll(e)
              .map((i) => i.cancel(n))
          );
        return Promise.all(r).then(at).catch(at);
      }
      invalidateQueries(e = {}, t = {}) {
        return Ce.batch(() => {
          if (
            (P(this, de)
              .findAll(e)
              .forEach((r) => {
                r.invalidate();
              }),
            e.refetchType === "none")
          )
            return Promise.resolve();
          const n = { ...e, type: e.refetchType ?? e.type ?? "active" };
          return this.refetchQueries(n, t);
        });
      }
      refetchQueries(e = {}, t) {
        const n = {
            ...t,
            cancelRefetch: (t == null ? void 0 : t.cancelRefetch) ?? !0,
          },
          r = Ce.batch(() =>
            P(this, de)
              .findAll(e)
              .filter((i) => !i.isDisabled())
              .map((i) => {
                let s = i.fetch(void 0, n);
                return (
                  n.throwOnError || (s = s.catch(at)),
                  i.state.fetchStatus === "paused" ? Promise.resolve() : s
                );
              })
          );
        return Promise.all(r).then(at);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = P(this, de).build(this, t);
        return n.isStaleByTime(t.staleTime)
          ? n.fetch(t)
          : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(at).catch(at);
      }
      fetchInfiniteQuery(e) {
        return (e.behavior = vE(e.pages)), this.fetchQuery(e);
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(at).catch(at);
      }
      resumePausedMutations() {
        return Ta.isOnline()
          ? P(this, wn).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return P(this, de);
      }
      getMutationCache() {
        return P(this, wn);
      }
      getDefaultOptions() {
        return P(this, xn);
      }
      setDefaultOptions(e) {
        L(this, xn, e);
      }
      setQueryDefaults(e, t) {
        P(this, ni).set(_s(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...P(this, ni).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Os(e, r.queryKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        P(this, ri).set(_s(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...P(this, ri).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Os(e, r.mutationKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...P(this, xn).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = tf(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== "always"),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
          t.enabled !== !0 && t.queryFn === nf && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...P(this, xn).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        P(this, de).clear(), P(this, wn).clear();
      }
    }),
    (de = new WeakMap()),
    (wn = new WeakMap()),
    (xn = new WeakMap()),
    (ni = new WeakMap()),
    (ri = new WeakMap()),
    (Pn = new WeakMap()),
    (ii = new WeakMap()),
    (si = new WeakMap()),
    Hm),
  $e,
  X,
  As,
  Fe,
  lr,
  oi,
  jt,
  Ns,
  ai,
  li,
  ur,
  cr,
  Cn,
  ui,
  dr,
  Ki,
  Fs,
  kc,
  Vs,
  _c,
  bs,
  Oc,
  Bs,
  Dc,
  zs,
  Mc,
  Us,
  jc,
  $s,
  Ic,
  Ia,
  Jv,
  Km,
  xE =
    ((Km = class extends Js {
      constructor(t, n) {
        super();
        A(this, dr);
        A(this, Fs);
        A(this, Vs);
        A(this, bs);
        A(this, Bs);
        A(this, zs);
        A(this, Us);
        A(this, $s);
        A(this, Ia);
        A(this, $e, void 0);
        A(this, X, void 0);
        A(this, As, void 0);
        A(this, Fe, void 0);
        A(this, lr, void 0);
        A(this, oi, void 0);
        A(this, jt, void 0);
        A(this, Ns, void 0);
        A(this, ai, void 0);
        A(this, li, void 0);
        A(this, ur, void 0);
        A(this, cr, void 0);
        A(this, Cn, void 0);
        A(this, ui, new Set());
        (this.options = n),
          L(this, $e, t),
          L(this, jt, null),
          this.bindMethods(),
          this.setOptions(n);
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (P(this, X).addObserver(this),
          Ep(P(this, X), this.options)
            ? z(this, dr, Ki).call(this)
            : this.updateResult(),
          z(this, Bs, Dc).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return Lc(P(this, X), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return Lc(P(this, X), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set()),
          z(this, zs, Mc).call(this),
          z(this, Us, jc).call(this),
          P(this, X).removeObserver(this);
      }
      setOptions(t, n) {
        const r = this.options,
          i = P(this, X);
        if (
          ((this.options = P(this, $e).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean")
        )
          throw new Error("Expected enabled to be a boolean");
        z(this, $s, Ic).call(this),
          P(this, X).setOptions(this.options),
          r._defaulted &&
            !Ec(this.options, r) &&
            P(this, $e)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: P(this, X),
                observer: this,
              });
        const s = this.hasListeners();
        s && Tp(P(this, X), i, this.options, r) && z(this, dr, Ki).call(this),
          this.updateResult(n),
          s &&
            (P(this, X) !== i ||
              this.options.enabled !== r.enabled ||
              this.options.staleTime !== r.staleTime) &&
            z(this, Fs, kc).call(this);
        const o = z(this, Vs, _c).call(this);
        s &&
          (P(this, X) !== i ||
            this.options.enabled !== r.enabled ||
            o !== P(this, Cn)) &&
          z(this, bs, Oc).call(this, o);
      }
      getOptimisticResult(t) {
        const n = P(this, $e).getQueryCache().build(P(this, $e), t),
          r = this.createResult(n, t);
        return (
          CE(this, r) &&
            (L(this, Fe, r),
            L(this, oi, this.options),
            L(this, lr, P(this, X).state)),
          r
        );
      }
      getCurrentResult() {
        return P(this, Fe);
      }
      trackResult(t, n) {
        const r = {};
        return (
          Object.keys(t).forEach((i) => {
            Object.defineProperty(r, i, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(i), n == null || n(i), t[i]),
            });
          }),
          r
        );
      }
      trackProp(t) {
        P(this, ui).add(t);
      }
      getCurrentQuery() {
        return P(this, X);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = P(this, $e).defaultQueryOptions(t),
          r = P(this, $e).getQueryCache().build(P(this, $e), n);
        return (
          (r.isFetchingOptimistic = !0),
          r.fetch().then(() => this.createResult(r, n))
        );
      }
      fetch(t) {
        return z(this, dr, Ki)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), P(this, Fe)));
      }
      createResult(t, n) {
        var _;
        const r = P(this, X),
          i = this.options,
          s = P(this, Fe),
          o = P(this, lr),
          a = P(this, oi),
          u = t !== r ? t.state : P(this, As),
          { state: c } = t;
        let d = { ...c },
          f = !1,
          g;
        if (n._optimisticResults) {
          const C = this.hasListeners(),
            M = !C && Ep(t, n),
            I = C && Tp(t, r, n, i);
          (M || I) && (d = { ...d, ...Xv(c.data, t.options) }),
            n._optimisticResults === "isRestoring" && (d.fetchStatus = "idle");
        }
        let { error: m, errorUpdatedAt: y, status: w } = d;
        if (n.select && d.data !== void 0)
          if (
            s &&
            d.data === (o == null ? void 0 : o.data) &&
            n.select === P(this, Ns)
          )
            g = P(this, ai);
          else
            try {
              L(this, Ns, n.select),
                (g = n.select(d.data)),
                (g = Rc(s == null ? void 0 : s.data, g, n)),
                L(this, ai, g),
                L(this, jt, null);
            } catch (C) {
              L(this, jt, C);
            }
        else g = d.data;
        if (n.placeholderData !== void 0 && g === void 0 && w === "pending") {
          let C;
          if (
            s != null &&
            s.isPlaceholderData &&
            n.placeholderData === (a == null ? void 0 : a.placeholderData)
          )
            C = s.data;
          else if (
            ((C =
              typeof n.placeholderData == "function"
                ? n.placeholderData(
                    (_ = P(this, li)) == null ? void 0 : _.state.data,
                    P(this, li)
                  )
                : n.placeholderData),
            n.select && C !== void 0)
          )
            try {
              (C = n.select(C)), L(this, jt, null);
            } catch (M) {
              L(this, jt, M);
            }
          C !== void 0 &&
            ((w = "success"),
            (g = Rc(s == null ? void 0 : s.data, C, n)),
            (f = !0));
        }
        P(this, jt) &&
          ((m = P(this, jt)),
          (g = P(this, ai)),
          (y = Date.now()),
          (w = "error"));
        const p = d.fetchStatus === "fetching",
          h = w === "pending",
          v = w === "error",
          x = h && p,
          E = g !== void 0;
        return {
          status: w,
          fetchStatus: d.fetchStatus,
          isPending: h,
          isSuccess: w === "success",
          isError: v,
          isInitialLoading: x,
          isLoading: x,
          data: g,
          dataUpdatedAt: d.dataUpdatedAt,
          error: m,
          errorUpdatedAt: y,
          failureCount: d.fetchFailureCount,
          failureReason: d.fetchFailureReason,
          errorUpdateCount: d.errorUpdateCount,
          isFetched: d.dataUpdateCount > 0 || d.errorUpdateCount > 0,
          isFetchedAfterMount:
            d.dataUpdateCount > u.dataUpdateCount ||
            d.errorUpdateCount > u.errorUpdateCount,
          isFetching: p,
          isRefetching: p && !h,
          isLoadingError: v && !E,
          isPaused: d.fetchStatus === "paused",
          isPlaceholderData: f,
          isRefetchError: v && E,
          isStale: sf(t, n),
          refetch: this.refetch,
        };
      }
      updateResult(t) {
        const n = P(this, Fe),
          r = this.createResult(P(this, X), this.options);
        if (
          (L(this, lr, P(this, X).state),
          L(this, oi, this.options),
          P(this, lr).data !== void 0 && L(this, li, P(this, X)),
          Ec(r, n))
        )
          return;
        L(this, Fe, r);
        const i = {},
          s = () => {
            if (!n) return !0;
            const { notifyOnChangeProps: o } = this.options,
              a = typeof o == "function" ? o() : o;
            if (a === "all" || (!a && !P(this, ui).size)) return !0;
            const l = new Set(a ?? P(this, ui));
            return (
              this.options.throwOnError && l.add("error"),
              Object.keys(P(this, Fe)).some((u) => {
                const c = u;
                return P(this, Fe)[c] !== n[c] && l.has(c);
              })
            );
          };
        (t == null ? void 0 : t.listeners) !== !1 && s() && (i.listeners = !0),
          z(this, Ia, Jv).call(this, { ...i, ...t });
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && z(this, Bs, Dc).call(this);
      }
    }),
    ($e = new WeakMap()),
    (X = new WeakMap()),
    (As = new WeakMap()),
    (Fe = new WeakMap()),
    (lr = new WeakMap()),
    (oi = new WeakMap()),
    (jt = new WeakMap()),
    (Ns = new WeakMap()),
    (ai = new WeakMap()),
    (li = new WeakMap()),
    (ur = new WeakMap()),
    (cr = new WeakMap()),
    (Cn = new WeakMap()),
    (ui = new WeakMap()),
    (dr = new WeakSet()),
    (Ki = function (t) {
      z(this, $s, Ic).call(this);
      let n = P(this, X).fetch(this.options, t);
      return (t != null && t.throwOnError) || (n = n.catch(at)), n;
    }),
    (Fs = new WeakSet()),
    (kc = function () {
      if (
        (z(this, zs, Mc).call(this),
        wi || P(this, Fe).isStale || !Cc(this.options.staleTime))
      )
        return;
      const n = Kv(P(this, Fe).dataUpdatedAt, this.options.staleTime) + 1;
      L(
        this,
        ur,
        setTimeout(() => {
          P(this, Fe).isStale || this.updateResult();
        }, n)
      );
    }),
    (Vs = new WeakSet()),
    (_c = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(P(this, X))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (bs = new WeakSet()),
    (Oc = function (t) {
      z(this, Us, jc).call(this),
        L(this, Cn, t),
        !(
          wi ||
          this.options.enabled === !1 ||
          !Cc(P(this, Cn)) ||
          P(this, Cn) === 0
        ) &&
          L(
            this,
            cr,
            setInterval(() => {
              (this.options.refetchIntervalInBackground || rf.isFocused()) &&
                z(this, dr, Ki).call(this);
            }, P(this, Cn))
          );
    }),
    (Bs = new WeakSet()),
    (Dc = function () {
      z(this, Fs, kc).call(this),
        z(this, bs, Oc).call(this, z(this, Vs, _c).call(this));
    }),
    (zs = new WeakSet()),
    (Mc = function () {
      P(this, ur) && (clearTimeout(P(this, ur)), L(this, ur, void 0));
    }),
    (Us = new WeakSet()),
    (jc = function () {
      P(this, cr) && (clearInterval(P(this, cr)), L(this, cr, void 0));
    }),
    ($s = new WeakSet()),
    (Ic = function () {
      const t = P(this, $e).getQueryCache().build(P(this, $e), this.options);
      if (t === P(this, X)) return;
      const n = P(this, X);
      L(this, X, t),
        L(this, As, t.state),
        this.hasListeners() &&
          (n == null || n.removeObserver(this), t.addObserver(this));
    }),
    (Ia = new WeakSet()),
    (Jv = function (t) {
      Ce.batch(() => {
        t.listeners &&
          this.listeners.forEach((n) => {
            n(P(this, Fe));
          }),
          P(this, $e)
            .getQueryCache()
            .notify({ query: P(this, X), type: "observerResultsUpdated" });
      });
    }),
    Km);
function PE(e, t) {
  return (
    t.enabled !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Ep(e, t) {
  return PE(e, t) || (e.state.data !== void 0 && Lc(e, t, t.refetchOnMount));
}
function Lc(e, t, n) {
  if (t.enabled !== !1) {
    const r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && sf(e, t));
  }
  return !1;
}
function Tp(e, t, n, r) {
  return (
    (e !== t || r.enabled === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    sf(e, n)
  );
}
function sf(e, t) {
  return t.enabled !== !1 && e.isStaleByTime(t.staleTime);
}
function CE(e, t) {
  return !Ec(e.getCurrentResult(), t);
}
var Zv = T.createContext(void 0),
  ol = (e) => {
    const t = T.useContext(Zv);
    if (e) return e;
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  EE = ({ client: e, children: t }) => (
    T.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    S.jsx(Zv.Provider, { value: e, children: t })
  ),
  e0 = T.createContext(!1),
  TE = () => T.useContext(e0);
e0.Provider;
function RE() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var kE = T.createContext(RE()),
  _E = () => T.useContext(kE);
function OE(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var DE = (e, t) => {
    (e.suspense || e.throwOnError) && (t.isReset() || (e.retryOnMount = !1));
  },
  ME = (e) => {
    T.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  jE = ({ result: e, errorResetBoundary: t, throwOnError: n, query: r }) =>
    e.isError && !t.isReset() && !e.isFetching && r && OE(n, [e.error, r]),
  IE = (e) => {
    e.suspense && typeof e.staleTime != "number" && (e.staleTime = 1e3);
  },
  LE = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  AE = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function NE(e, t, n) {
  const r = ol(n),
    i = TE(),
    s = _E(),
    o = r.defaultQueryOptions(e);
  (o._optimisticResults = i ? "isRestoring" : "optimistic"),
    IE(o),
    DE(o, s),
    ME(s);
  const [a] = T.useState(() => new t(r, o)),
    l = a.getOptimisticResult(o);
  if (
    (T.useSyncExternalStore(
      T.useCallback(
        (u) => {
          const c = i ? () => {} : a.subscribe(Ce.batchCalls(u));
          return a.updateResult(), c;
        },
        [a, i]
      ),
      () => a.getCurrentResult(),
      () => a.getCurrentResult()
    ),
    T.useEffect(() => {
      a.setOptions(o, { listeners: !1 });
    }, [o, a]),
    LE(o, l))
  )
    throw AE(o, a, s);
  if (
    jE({
      result: l,
      errorResetBoundary: s,
      throwOnError: o.throwOnError,
      query: r.getQueryCache().get(o.queryHash),
    })
  )
    throw l.error;
  return o.notifyOnChangeProps ? l : a.trackResult(l);
}
function Zs(e, t) {
  return NE(e, xE, t);
}
const al = Xs((e) => ({
    editing: !1,
    close: () => e({ editing: !1 }),
    edit: (t) => e({ editing: !0, section_editing: t }),
    section_editing: "",
  })),
  ll = Xs((e) => ({
    editing: !1,
    close: () => e({ editing: !1 }),
    edit: (t) => e({ editing: !0, offer_editing: t }),
    offer_editing: "",
  })),
  ul = T.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  }),
  cl = T.createContext({}),
  dl = T.createContext(null),
  of = typeof document < "u",
  fl = of ? T.useLayoutEffect : T.useEffect,
  t0 = T.createContext({ strict: !1 }),
  af = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  FE = "framerAppearId",
  n0 = "data-" + af(FE),
  VE = { skipAnimations: !1, useManualTiming: !1 };
class Rp {
  constructor() {
    (this.order = []), (this.scheduled = new Set());
  }
  add(t) {
    if (!this.scheduled.has(t))
      return this.scheduled.add(t), this.order.push(t), !0;
  }
  remove(t) {
    const n = this.order.indexOf(t);
    n !== -1 && (this.order.splice(n, 1), this.scheduled.delete(t));
  }
  clear() {
    (this.order.length = 0), this.scheduled.clear();
  }
}
function bE(e) {
  let t = new Rp(),
    n = new Rp(),
    r = 0,
    i = !1,
    s = !1;
  const o = new WeakSet(),
    a = {
      schedule: (l, u = !1, c = !1) => {
        const d = c && i,
          f = d ? t : n;
        return u && o.add(l), f.add(l) && d && i && (r = t.order.length), l;
      },
      cancel: (l) => {
        n.remove(l), o.delete(l);
      },
      process: (l) => {
        if (i) {
          s = !0;
          return;
        }
        if (((i = !0), ([t, n] = [n, t]), n.clear(), (r = t.order.length), r))
          for (let u = 0; u < r; u++) {
            const c = t.order[u];
            o.has(c) && (a.schedule(c), e()), c(l);
          }
        (i = !1), s && ((s = !1), a.process(l));
      },
    };
  return a;
}
const _o = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  BE = 40;
function r0(e, t) {
  let n = !1,
    r = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    s = _o.reduce((d, f) => ((d[f] = bE(() => (n = !0))), d), {}),
    o = (d) => {
      s[d].process(i);
    },
    a = () => {
      const d = performance.now();
      (n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(d - i.timestamp, BE), 1)),
        (i.timestamp = d),
        (i.isProcessing = !0),
        _o.forEach(o),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(a));
    },
    l = () => {
      (n = !0), (r = !0), i.isProcessing || e(a);
    };
  return {
    schedule: _o.reduce((d, f) => {
      const g = s[f];
      return (d[f] = (m, y = !1, w = !1) => (n || l(), g.schedule(m, y, w))), d;
    }, {}),
    cancel: (d) => _o.forEach((f) => s[f].cancel(d)),
    state: i,
    steps: s,
  };
}
const { schedule: lf, cancel: q_ } = r0(queueMicrotask, !1);
function zE(e, t, n, r) {
  const { visualElement: i } = T.useContext(cl),
    s = T.useContext(t0),
    o = T.useContext(dl),
    a = T.useContext(ul).reducedMotion,
    l = T.useRef();
  (r = r || s.renderer),
    !l.current &&
      r &&
      (l.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceContext: o,
        blockInitialAnimation: o ? o.initial === !1 : !1,
        reducedMotionConfig: a,
      }));
  const u = l.current;
  T.useInsertionEffect(() => {
    u && u.update(n, o);
  });
  const c = T.useRef(!!(n[n0] && !window.HandoffComplete));
  return (
    fl(() => {
      u &&
        (lf.postRender(u.render),
        c.current && u.animationState && u.animationState.animateChanges());
    }),
    T.useEffect(() => {
      u &&
        (u.updateFeatures(),
        !c.current && u.animationState && u.animationState.animateChanges(),
        c.current && ((c.current = !1), (window.HandoffComplete = !0)));
    }),
    u
  );
}
function zr(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function UE(e, t, n) {
  return T.useCallback(
    (r) => {
      r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : zr(n) && (n.current = r));
    },
    [t]
  );
}
function Ds(e) {
  return typeof e == "string" || Array.isArray(e);
}
function hl(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const uf = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  cf = ["initial", ...uf];
function pl(e) {
  return hl(e.animate) || cf.some((t) => Ds(e[t]));
}
function i0(e) {
  return !!(pl(e) || e.variants);
}
function $E(e, t) {
  if (pl(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || Ds(n) ? n : void 0,
      animate: Ds(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function HE(e) {
  const { initial: t, animate: n } = $E(e, T.useContext(cl));
  return T.useMemo(() => ({ initial: t, animate: n }), [kp(t), kp(n)]);
}
function kp(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const _p = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  Ms = {};
for (const e in _p) Ms[e] = { isEnabled: (t) => _p[e].some((n) => !!t[n]) };
function KE(e) {
  for (const t in e) Ms[t] = { ...Ms[t], ...e[t] };
}
const df = T.createContext({}),
  s0 = T.createContext({}),
  WE = Symbol.for("motionComponentSymbol");
function QE({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  e && KE(e);
  function s(a, l) {
    let u;
    const c = { ...T.useContext(ul), ...a, layoutId: GE(a) },
      { isStatic: d } = c,
      f = HE(a),
      g = r(a, d);
    if (!d && of) {
      f.visualElement = zE(i, g, c, t);
      const m = T.useContext(s0),
        y = T.useContext(t0).strict;
      f.visualElement && (u = f.visualElement.loadFeatures(c, y, e, m));
    }
    return S.jsxs(cl.Provider, {
      value: f,
      children: [
        u && f.visualElement
          ? S.jsx(u, { visualElement: f.visualElement, ...c })
          : null,
        n(i, a, UE(g, f.visualElement, l), g, d, f.visualElement),
      ],
    });
  }
  const o = T.forwardRef(s);
  return (o[WE] = i), o;
}
function GE({ layoutId: e }) {
  const t = T.useContext(df).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function qE(e) {
  function t(r, i = {}) {
    return QE(e(r, i));
  }
  if (typeof Proxy > "u") return t;
  const n = new Map();
  return new Proxy(t, {
    get: (r, i) => (n.has(i) || n.set(i, t(i)), n.get(i)),
  });
}
const YE = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function ff(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(YE.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
const Ra = {};
function XE(e) {
  Object.assign(Ra, e);
}
const eo = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Er = new Set(eo);
function o0(e, { layout: t, layoutId: n }) {
  return (
    Er.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!Ra[e] || e === "opacity"))
  );
}
const Ee = (e) => !!(e && e.getVelocity),
  JE = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  ZE = eo.length;
function eT(
  e,
  { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 },
  r,
  i
) {
  let s = "";
  for (let o = 0; o < ZE; o++) {
    const a = eo[o];
    if (e[a] !== void 0) {
      const l = JE[a] || a;
      s += `${l}(${e[a]}) `;
    }
  }
  return (
    t && !e.z && (s += "translateZ(0)"),
    (s = s.trim()),
    i ? (s = i(e, r ? "" : s)) : n && r && (s = "none"),
    s
  );
}
const a0 = (e) => (t) => typeof t == "string" && t.startsWith(e),
  l0 = a0("--"),
  tT = a0("var(--"),
  hf = (e) => (tT(e) ? nT.test(e.split("/*")[0].trim()) : !1),
  nT =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  rT = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  zn = (e, t, n) => (n > t ? t : n < e ? e : n),
  Oi = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  rs = { ...Oi, transform: (e) => zn(0, 1, e) },
  Oo = { ...Oi, default: 1 },
  is = (e) => Math.round(e * 1e5) / 1e5,
  pf = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
  iT =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
  sT =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function to(e) {
  return typeof e == "string";
}
const no = (e) => ({
    test: (t) => to(t) && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  fn = no("deg"),
  Ft = no("%"),
  N = no("px"),
  oT = no("vh"),
  aT = no("vw"),
  Op = {
    ...Ft,
    parse: (e) => Ft.parse(e) / 100,
    transform: (e) => Ft.transform(e * 100),
  },
  Dp = { ...Oi, transform: Math.round },
  u0 = {
    borderWidth: N,
    borderTopWidth: N,
    borderRightWidth: N,
    borderBottomWidth: N,
    borderLeftWidth: N,
    borderRadius: N,
    radius: N,
    borderTopLeftRadius: N,
    borderTopRightRadius: N,
    borderBottomRightRadius: N,
    borderBottomLeftRadius: N,
    width: N,
    maxWidth: N,
    height: N,
    maxHeight: N,
    size: N,
    top: N,
    right: N,
    bottom: N,
    left: N,
    padding: N,
    paddingTop: N,
    paddingRight: N,
    paddingBottom: N,
    paddingLeft: N,
    margin: N,
    marginTop: N,
    marginRight: N,
    marginBottom: N,
    marginLeft: N,
    rotate: fn,
    rotateX: fn,
    rotateY: fn,
    rotateZ: fn,
    scale: Oo,
    scaleX: Oo,
    scaleY: Oo,
    scaleZ: Oo,
    skew: fn,
    skewX: fn,
    skewY: fn,
    distance: N,
    translateX: N,
    translateY: N,
    translateZ: N,
    x: N,
    y: N,
    z: N,
    perspective: N,
    transformPerspective: N,
    opacity: rs,
    originX: Op,
    originY: Op,
    originZ: N,
    zIndex: Dp,
    backgroundPositionX: N,
    backgroundPositionY: N,
    fillOpacity: rs,
    strokeOpacity: rs,
    numOctaves: Dp,
  };
function mf(e, t, n, r) {
  const { style: i, vars: s, transform: o, transformOrigin: a } = e;
  let l = !1,
    u = !1,
    c = !0;
  for (const d in t) {
    const f = t[d];
    if (l0(d)) {
      s[d] = f;
      continue;
    }
    const g = u0[d],
      m = rT(f, g);
    if (Er.has(d)) {
      if (((l = !0), (o[d] = m), !c)) continue;
      f !== (g.default || 0) && (c = !1);
    } else d.startsWith("origin") ? ((u = !0), (a[d] = m)) : (i[d] = m);
  }
  if (
    (t.transform ||
      (l || r
        ? (i.transform = eT(e.transform, n, c, r))
        : i.transform && (i.transform = "none")),
    u)
  ) {
    const { originX: d = "50%", originY: f = "50%", originZ: g = 0 } = a;
    i.transformOrigin = `${d} ${f} ${g}`;
  }
}
const yf = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function c0(e, t, n) {
  for (const r in t) !Ee(t[r]) && !o0(r, n) && (e[r] = t[r]);
}
function lT({ transformTemplate: e }, t, n) {
  return T.useMemo(() => {
    const r = yf();
    return (
      mf(r, t, { enableHardwareAcceleration: !n }, e),
      Object.assign({}, r.vars, r.style)
    );
  }, [t]);
}
function uT(e, t, n) {
  const r = e.style || {},
    i = {};
  return c0(i, r, e), Object.assign(i, lT(e, t, n)), i;
}
function cT(e, t, n) {
  const r = {},
    i = uT(e, t, n);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
      (i.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (r.tabIndex = 0),
    (r.style = i),
    r
  );
}
const dT = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function ka(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    dT.has(e)
  );
}
let d0 = (e) => !ka(e);
function fT(e) {
  e && (d0 = (t) => (t.startsWith("on") ? !ka(t) : e(t)));
}
try {
  fT(require("@emotion/is-prop-valid").default);
} catch {}
function hT(e, t, n) {
  const r = {};
  for (const i in e)
    (i === "values" && typeof e.values == "object") ||
      ((d0(i) ||
        (n === !0 && ka(i)) ||
        (!t && !ka(i)) ||
        (e.draggable && i.startsWith("onDrag"))) &&
        (r[i] = e[i]));
  return r;
}
function Mp(e, t, n) {
  return typeof e == "string" ? e : N.transform(t + n * e);
}
function pT(e, t, n) {
  const r = Mp(t, e.x, e.width),
    i = Mp(n, e.y, e.height);
  return `${r} ${i}`;
}
const mT = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  yT = { offset: "strokeDashoffset", array: "strokeDasharray" };
function gT(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const s = i ? mT : yT;
  e[s.offset] = N.transform(-r);
  const o = N.transform(t),
    a = N.transform(n);
  e[s.array] = `${o} ${a}`;
}
function gf(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: s,
    pathLength: o,
    pathSpacing: a = 1,
    pathOffset: l = 0,
    ...u
  },
  c,
  d,
  f
) {
  if ((mf(e, u, c, f), d)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: g, style: m, dimensions: y } = e;
  g.transform && (y && (m.transform = g.transform), delete g.transform),
    y &&
      (i !== void 0 || s !== void 0 || m.transform) &&
      (m.transformOrigin = pT(
        y,
        i !== void 0 ? i : 0.5,
        s !== void 0 ? s : 0.5
      )),
    t !== void 0 && (g.x = t),
    n !== void 0 && (g.y = n),
    r !== void 0 && (g.scale = r),
    o !== void 0 && gT(g, o, a, l, !1);
}
const f0 = () => ({ ...yf(), attrs: {} }),
  vf = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function vT(e, t, n, r) {
  const i = T.useMemo(() => {
    const s = f0();
    return (
      gf(s, t, { enableHardwareAcceleration: !1 }, vf(r), e.transformTemplate),
      { ...s.attrs, style: { ...s.style } }
    );
  }, [t]);
  if (e.style) {
    const s = {};
    c0(s, e.style, e), (i.style = { ...s, ...i.style });
  }
  return i;
}
function ST(e = !1) {
  return (n, r, i, { latestValues: s }, o) => {
    const l = (ff(n) ? vT : cT)(r, s, o, n),
      u = hT(r, typeof n == "string", e),
      c = n !== T.Fragment ? { ...u, ...l, ref: i } : {},
      { children: d } = r,
      f = T.useMemo(() => (Ee(d) ? d.get() : d), [d]);
    return T.createElement(n, { ...c, children: f });
  };
}
function h0(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const s in n) e.style.setProperty(s, n[s]);
}
const p0 = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function m0(e, t, n, r) {
  h0(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(p0.has(i) ? i : af(i), t.attrs[i]);
}
function Sf(e, t, n) {
  var r;
  const { style: i } = e,
    s = {};
  for (const o in i)
    (Ee(i[o]) ||
      (t.style && Ee(t.style[o])) ||
      o0(o, e) ||
      ((r = n == null ? void 0 : n.getValue(o)) === null || r === void 0
        ? void 0
        : r.liveStyle) !== void 0) &&
      (s[o] = i[o]);
  return s;
}
function y0(e, t, n) {
  const r = Sf(e, t, n);
  for (const i in e)
    if (Ee(e[i]) || Ee(t[i])) {
      const s =
        eo.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      r[s] = e[i];
    }
  return r;
}
function wf(e, t, n, r = {}, i = {}) {
  return (
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function" && (t = t(n !== void 0 ? n : e.custom, r, i)),
    t
  );
}
function Tr(e) {
  const t = T.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const Ac = (e) => Array.isArray(e),
  wT = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  xT = (e) => (Ac(e) ? e[e.length - 1] || 0 : e);
function Qo(e) {
  const t = Ee(e) ? e.get() : e;
  return wT(t) ? t.toValue() : t;
}
function PT(
  { scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n },
  r,
  i,
  s
) {
  const o = { latestValues: CT(r, i, s, e), renderState: t() };
  return n && (o.mount = (a) => n(r, a, o)), o;
}
const g0 = (e) => (t, n) => {
  const r = T.useContext(cl),
    i = T.useContext(dl),
    s = () => PT(e, t, r, i);
  return n ? s() : Tr(s);
};
function CT(e, t, n, r) {
  const i = {},
    s = r(e, {});
  for (const f in s) i[f] = Qo(s[f]);
  let { initial: o, animate: a } = e;
  const l = pl(e),
    u = i0(e);
  t &&
    u &&
    !l &&
    e.inherit !== !1 &&
    (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const d = c ? a : o;
  return (
    d &&
      typeof d != "boolean" &&
      !hl(d) &&
      (Array.isArray(d) ? d : [d]).forEach((g) => {
        const m = wf(e, g);
        if (!m) return;
        const { transitionEnd: y, transition: w, ...p } = m;
        for (const h in p) {
          let v = p[h];
          if (Array.isArray(v)) {
            const x = c ? v.length - 1 : 0;
            v = v[x];
          }
          v !== null && (i[h] = v);
        }
        for (const h in y) i[h] = y[h];
      }),
    i
  );
}
const Ie = (e) => e,
  {
    schedule: q,
    cancel: on,
    state: Pe,
    steps: au,
  } = r0(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ie, !0),
  ET = {
    useVisualState: g0({
      scrapeMotionValuesFromProps: y0,
      createRenderState: f0,
      onMount: (e, t, { renderState: n, latestValues: r }) => {
        q.read(() => {
          try {
            n.dimensions =
              typeof t.getBBox == "function"
                ? t.getBBox()
                : t.getBoundingClientRect();
          } catch {
            n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
          }
        }),
          q.render(() => {
            gf(
              n,
              r,
              { enableHardwareAcceleration: !1 },
              vf(t.tagName),
              e.transformTemplate
            ),
              m0(t, n);
          });
      },
    }),
  },
  TT = {
    useVisualState: g0({
      scrapeMotionValuesFromProps: Sf,
      createRenderState: yf,
    }),
  };
function RT(e, { forwardMotionProps: t = !1 }, n, r) {
  return {
    ...(ff(e) ? ET : TT),
    preloadedFeatures: n,
    useRender: ST(t),
    createVisualElement: r,
    Component: e,
  };
}
function qt(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const v0 = (e) =>
  e.pointerType === "mouse"
    ? typeof e.button != "number" || e.button <= 0
    : e.isPrimary !== !1;
function ml(e, t = "page") {
  return { point: { x: e[`${t}X`], y: e[`${t}Y`] } };
}
const kT = (e) => (t) => v0(t) && e(t, ml(t));
function Jt(e, t, n, r) {
  return qt(e, t, kT(n), r);
}
const _T = (e, t) => (n) => t(e(n)),
  Zt = (...e) => e.reduce(_T);
function S0(e) {
  let t = null;
  return () => {
    const n = () => {
      t = null;
    };
    return t === null ? ((t = e), n) : !1;
  };
}
const jp = S0("dragHorizontal"),
  Ip = S0("dragVertical");
function w0(e) {
  let t = !1;
  if (e === "y") t = Ip();
  else if (e === "x") t = jp();
  else {
    const n = jp(),
      r = Ip();
    n && r
      ? (t = () => {
          n(), r();
        })
      : (n && n(), r && r());
  }
  return t;
}
function x0() {
  const e = w0(!0);
  return e ? (e(), !1) : !0;
}
class Wn {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
function Lp(e, t) {
  const n = t ? "pointerenter" : "pointerleave",
    r = t ? "onHoverStart" : "onHoverEnd",
    i = (s, o) => {
      if (s.pointerType === "touch" || x0()) return;
      const a = e.getProps();
      e.animationState &&
        a.whileHover &&
        e.animationState.setActive("whileHover", t);
      const l = a[r];
      l && q.postRender(() => l(s, o));
    };
  return Jt(e.current, n, i, { passive: !e.getProps()[r] });
}
class OT extends Wn {
  mount() {
    this.unmount = Zt(Lp(this.node, !0), Lp(this.node, !1));
  }
  unmount() {}
}
class DT extends Wn {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Zt(
      qt(this.node.current, "focus", () => this.onFocus()),
      qt(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
const P0 = (e, t) => (t ? (e === t ? !0 : P0(e, t.parentElement)) : !1);
function lu(e, t) {
  if (!t) return;
  const n = new PointerEvent("pointer" + e);
  t(n, ml(n));
}
class MT extends Wn {
  constructor() {
    super(...arguments),
      (this.removeStartListeners = Ie),
      (this.removeEndListeners = Ie),
      (this.removeAccessibleListeners = Ie),
      (this.startPointerPress = (t, n) => {
        if (this.isPressing) return;
        this.removeEndListeners();
        const r = this.node.getProps(),
          s = Jt(
            window,
            "pointerup",
            (a, l) => {
              if (!this.checkPressEnd()) return;
              const {
                  onTap: u,
                  onTapCancel: c,
                  globalTapTarget: d,
                } = this.node.getProps(),
                f = !d && !P0(this.node.current, a.target) ? c : u;
              f && q.update(() => f(a, l));
            },
            { passive: !(r.onTap || r.onPointerUp) }
          ),
          o = Jt(window, "pointercancel", (a, l) => this.cancelPress(a, l), {
            passive: !(r.onTapCancel || r.onPointerCancel),
          });
        (this.removeEndListeners = Zt(s, o)), this.startPress(t, n);
      }),
      (this.startAccessiblePress = () => {
        const t = (s) => {
            if (s.key !== "Enter" || this.isPressing) return;
            const o = (a) => {
              a.key !== "Enter" ||
                !this.checkPressEnd() ||
                lu("up", (l, u) => {
                  const { onTap: c } = this.node.getProps();
                  c && q.postRender(() => c(l, u));
                });
            };
            this.removeEndListeners(),
              (this.removeEndListeners = qt(this.node.current, "keyup", o)),
              lu("down", (a, l) => {
                this.startPress(a, l);
              });
          },
          n = qt(this.node.current, "keydown", t),
          r = () => {
            this.isPressing && lu("cancel", (s, o) => this.cancelPress(s, o));
          },
          i = qt(this.node.current, "blur", r);
        this.removeAccessibleListeners = Zt(n, i);
      });
  }
  startPress(t, n) {
    this.isPressing = !0;
    const { onTapStart: r, whileTap: i } = this.node.getProps();
    i &&
      this.node.animationState &&
      this.node.animationState.setActive("whileTap", !0),
      r && q.postRender(() => r(t, n));
  }
  checkPressEnd() {
    return (
      this.removeEndListeners(),
      (this.isPressing = !1),
      this.node.getProps().whileTap &&
        this.node.animationState &&
        this.node.animationState.setActive("whileTap", !1),
      !x0()
    );
  }
  cancelPress(t, n) {
    if (!this.checkPressEnd()) return;
    const { onTapCancel: r } = this.node.getProps();
    r && q.postRender(() => r(t, n));
  }
  mount() {
    const t = this.node.getProps(),
      n = Jt(
        t.globalTapTarget ? window : this.node.current,
        "pointerdown",
        this.startPointerPress,
        { passive: !(t.onTapStart || t.onPointerStart) }
      ),
      r = qt(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = Zt(n, r);
  }
  unmount() {
    this.removeStartListeners(),
      this.removeEndListeners(),
      this.removeAccessibleListeners();
  }
}
const Nc = new WeakMap(),
  uu = new WeakMap(),
  jT = (e) => {
    const t = Nc.get(e.target);
    t && t(e);
  },
  IT = (e) => {
    e.forEach(jT);
  };
function LT({ root: e, ...t }) {
  const n = e || document;
  uu.has(n) || uu.set(n, {});
  const r = uu.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(IT, { root: e, ...t })), r[i];
}
function AT(e, t, n) {
  const r = LT(t);
  return (
    Nc.set(e, n),
    r.observe(e),
    () => {
      Nc.delete(e), r.unobserve(e);
    }
  );
}
const NT = { some: 0, all: 1 };
class FT extends Wn {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: i = "some", once: s } = t,
      o = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == "number" ? i : NT[i],
      },
      a = (l) => {
        const { isIntersecting: u } = l;
        if (
          this.isInView === u ||
          ((this.isInView = u), s && !u && this.hasEnteredView)
        )
          return;
        u && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", u);
        const { onViewportEnter: c, onViewportLeave: d } = this.node.getProps(),
          f = u ? c : d;
        f && f(l);
      };
    return AT(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(VT(t, n)) && this.startObserver();
  }
  unmount() {}
}
function VT({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const bT = {
  inView: { Feature: FT },
  tap: { Feature: MT },
  focus: { Feature: DT },
  hover: { Feature: OT },
};
function C0(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function BT(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.get())), t;
}
function zT(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.getVelocity())), t;
}
function yl(e, t, n) {
  const r = e.getProps();
  return wf(r, t, n !== void 0 ? n : r.custom, BT(e), zT(e));
}
const Nn = (e) => e * 1e3,
  en = (e) => e / 1e3,
  UT = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  $T = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  HT = { type: "keyframes", duration: 0.8 },
  KT = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  WT = (e, { keyframes: t }) =>
    t.length > 2
      ? HT
      : Er.has(e)
      ? e.startsWith("scale")
        ? $T(t[1])
        : UT
      : KT;
function QT({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: s,
  repeatType: o,
  repeatDelay: a,
  from: l,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
function xf(e, t) {
  return e[t] || e.default || e;
}
const GT = (e) => e !== null;
function gl(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(GT),
    s = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !s || r === void 0 ? i[s] : r;
}
let Go;
function qT() {
  Go = void 0;
}
const Fn = {
    now: () => (
      Go === void 0 &&
        Fn.set(
          Pe.isProcessing || VE.useManualTiming
            ? Pe.timestamp
            : performance.now()
        ),
      Go
    ),
    set: (e) => {
      (Go = e), queueMicrotask(qT);
    },
  },
  E0 = (e) => /^0[^.\s]+$/u.test(e);
function YT(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
    ? e === "none" || e === "0" || E0(e)
    : !0;
}
let T0 = Ie;
const R0 = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  XT = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function JT(e) {
  const t = XT.exec(e);
  if (!t) return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
function k0(e, t, n = 1) {
  const [r, i] = JT(e);
  if (!r) return;
  const s = window.getComputedStyle(t).getPropertyValue(r);
  if (s) {
    const o = s.trim();
    return R0(o) ? parseFloat(o) : o;
  }
  return hf(i) ? k0(i, t, n + 1) : i;
}
const ZT = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
    "translateX",
    "translateY",
  ]),
  Ap = (e) => e === Oi || e === N,
  Np = (e, t) => parseFloat(e.split(", ")[t]),
  Fp =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/u);
      if (i) return Np(i[1], t);
      {
        const s = r.match(/^matrix\((.+)\)$/u);
        return s ? Np(s[1], e) : 0;
      }
    },
  eR = new Set(["x", "y", "z"]),
  tR = eo.filter((e) => !eR.has(e));
function nR(e) {
  const t = [];
  return (
    tR.forEach((n) => {
      const r = e.getValue(n);
      r !== void 0 &&
        (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const xi = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: Fp(4, 13),
  y: Fp(5, 14),
};
xi.translateX = xi.x;
xi.translateY = xi.y;
const _0 = (e) => (t) => t.test(e),
  rR = { test: (e) => e === "auto", parse: (e) => e },
  O0 = [Oi, N, Ft, fn, aT, oT, rR],
  Vp = (e) => O0.find(_0(e)),
  pr = new Set();
let Fc = !1,
  Vc = !1;
function D0() {
  if (Vc) {
    const e = Array.from(pr).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = new Map();
    t.forEach((r) => {
      const i = nR(r);
      i.length && (n.set(r, i), r.render());
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render();
        const i = n.get(r);
        i &&
          i.forEach(([s, o]) => {
            var a;
            (a = r.getValue(s)) === null || a === void 0 || a.set(o);
          });
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (Vc = !1), (Fc = !1), pr.forEach((e) => e.complete()), pr.clear();
}
function M0() {
  pr.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Vc = !0);
  });
}
function iR() {
  M0(), D0();
}
class Pf {
  constructor(t, n, r, i, s, o = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = i),
      (this.element = s),
      (this.isAsync = o);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (pr.add(this), Fc || ((Fc = !0), q.read(M0), q.resolveKeyframes(D0)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: r,
      motionValue: i,
    } = this;
    for (let s = 0; s < t.length; s++)
      if (t[s] === null)
        if (s === 0) {
          const o = i == null ? void 0 : i.get(),
            a = t[t.length - 1];
          if (o !== void 0) t[0] = o;
          else if (r && n) {
            const l = r.readValue(n, a);
            l != null && (t[0] = l);
          }
          t[0] === void 0 && (t[0] = a), i && o === void 0 && i.set(t[0]);
        } else t[s] = t[s - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      pr.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), pr.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Cf = (e, t) => (n) =>
    !!(
      (to(n) && sT.test(n) && n.startsWith(e)) ||
      (t && Object.prototype.hasOwnProperty.call(n, t))
    ),
  j0 = (e, t, n) => (r) => {
    if (!to(r)) return r;
    const [i, s, o, a] = r.match(pf);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(s),
      [n]: parseFloat(o),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  sR = (e) => zn(0, 255, e),
  cu = { ...Oi, transform: (e) => Math.round(sR(e)) },
  rr = {
    test: Cf("rgb", "red"),
    parse: j0("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      cu.transform(e) +
      ", " +
      cu.transform(t) +
      ", " +
      cu.transform(n) +
      ", " +
      is(rs.transform(r)) +
      ")",
  };
function oR(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const bc = { test: Cf("#"), parse: oR, transform: rr.transform },
  Ur = {
    test: Cf("hsl", "hue"),
    parse: j0("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      Ft.transform(is(t)) +
      ", " +
      Ft.transform(is(n)) +
      ", " +
      is(rs.transform(r)) +
      ")",
  },
  De = {
    test: (e) => rr.test(e) || bc.test(e) || Ur.test(e),
    parse: (e) =>
      rr.test(e) ? rr.parse(e) : Ur.test(e) ? Ur.parse(e) : bc.parse(e),
    transform: (e) =>
      to(e) ? e : e.hasOwnProperty("red") ? rr.transform(e) : Ur.transform(e),
  };
function aR(e) {
  var t, n;
  return (
    isNaN(e) &&
    to(e) &&
    (((t = e.match(pf)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(iT)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const I0 = "number",
  L0 = "color",
  lR = "var",
  uR = "var(",
  bp = "${}",
  cR =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function _a(e) {
  const t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    i = [];
  let s = 0;
  const a = t
    .replace(
      cR,
      (l) => (
        De.test(l)
          ? (r.color.push(s), i.push(L0), n.push(De.parse(l)))
          : l.startsWith(uR)
          ? (r.var.push(s), i.push(lR), n.push(l))
          : (r.number.push(s), i.push(I0), n.push(parseFloat(l))),
        ++s,
        bp
      )
    )
    .split(bp);
  return { values: n, split: a, indexes: r, types: i };
}
function A0(e) {
  return _a(e).values;
}
function N0(e) {
  const { split: t, types: n } = _a(e),
    r = t.length;
  return (i) => {
    let s = "";
    for (let o = 0; o < r; o++)
      if (((s += t[o]), i[o] !== void 0)) {
        const a = n[o];
        a === I0
          ? (s += is(i[o]))
          : a === L0
          ? (s += De.transform(i[o]))
          : (s += i[o]);
      }
    return s;
  };
}
const dR = (e) => (typeof e == "number" ? 0 : e);
function fR(e) {
  const t = A0(e);
  return N0(e)(t.map(dR));
}
const Un = {
    test: aR,
    parse: A0,
    createTransformer: N0,
    getAnimatableNone: fR,
  },
  hR = new Set(["brightness", "contrast", "saturate", "opacity"]);
function pR(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(pf) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let s = hR.has(t) ? 1 : 0;
  return r !== n && (s *= 100), t + "(" + s + i + ")";
}
const mR = /\b([a-z-]*)\(.*?\)/gu,
  Bc = {
    ...Un,
    getAnimatableNone: (e) => {
      const t = e.match(mR);
      return t ? t.map(pR).join(" ") : e;
    },
  },
  yR = {
    ...u0,
    color: De,
    backgroundColor: De,
    outlineColor: De,
    fill: De,
    stroke: De,
    borderColor: De,
    borderTopColor: De,
    borderRightColor: De,
    borderBottomColor: De,
    borderLeftColor: De,
    filter: Bc,
    WebkitFilter: Bc,
  },
  Ef = (e) => yR[e];
function F0(e, t) {
  let n = Ef(e);
  return (
    n !== Bc && (n = Un), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
const gR = new Set(["auto", "none", "0"]);
function vR(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i; ) {
    const s = e[r];
    typeof s == "string" && !gR.has(s) && (i = e[r]), r++;
  }
  if (i && n) for (const s of t) e[s] = F0(n, i);
}
class V0 extends Pf {
  constructor(t, n, r, i) {
    super(t, n, r, i, i == null ? void 0 : i.owner, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n.current) return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      const u = t[l];
      if (typeof u == "string" && hf(u)) {
        const c = k0(u, n.current);
        c !== void 0 && (t[l] = c),
          l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if ((this.resolveNoneKeyframes(), !ZT.has(r) || t.length !== 2)) return;
    const [i, s] = t,
      o = Vp(i),
      a = Vp(s);
    if (o !== a)
      if (Ap(o) && Ap(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = [];
    for (let i = 0; i < t.length; i++) YT(t[i]) && r.push(i);
    r.length && vR(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = xi[r](
        t.measureViewportBox(),
        window.getComputedStyle(t.current)
      )),
      (n[0] = this.measuredOrigin);
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: r, unresolvedKeyframes: i } = this;
    if (!n.current) return;
    const s = n.getValue(r);
    s && s.jump(this.measuredOrigin, !1);
    const o = i.length - 1,
      a = i[o];
    (i[o] = xi[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([l, u]) => {
          n.getValue(l).set(u);
        }),
      this.resolveNoneKeyframes();
  }
}
function SR(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Bp = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (Un.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function wR(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function xR(e, t, n, r) {
  const i = e[0];
  if (i === null) return !1;
  const s = e[e.length - 1],
    o = Bp(i, t),
    a = Bp(s, t);
  return !o || !a ? !1 : wR(e) || (n === "spring" && r);
}
class b0 {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: s = 0,
    repeatType: o = "loop",
    ...a
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.options = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: i,
        repeatDelay: s,
        repeatType: o,
        ...a,
      }),
      this.updateFinishedPromise();
  }
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && iR(), this._resolved;
  }
  onKeyframesResolved(t, n) {
    this.hasAttemptedResolve = !0;
    const {
      name: r,
      type: i,
      velocity: s,
      delay: o,
      onComplete: a,
      onUpdate: l,
      isGenerator: u,
    } = this.options;
    if (!u && !xR(t, r, i, s))
      if (o) this.options.duration = 0;
      else {
        l == null || l(gl(t, this.options, n)),
          a == null || a(),
          this.resolveFinishedPromise();
        return;
      }
    const c = this.initPlayback(t, n);
    c !== !1 &&
      ((this._resolved = { keyframes: t, finalKeyframe: n, ...c }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(t, n) {
    return this.currentFinishedPromise.then(t, n);
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
function B0(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const PR = 5;
function z0(e, t, n) {
  const r = Math.max(t - PR, 0);
  return B0(n - e(r), t - r);
}
const du = 0.001,
  CR = 0.01,
  ER = 10,
  TR = 0.05,
  RR = 1;
function kR({
  duration: e = 800,
  bounce: t = 0.25,
  velocity: n = 0,
  mass: r = 1,
}) {
  let i,
    s,
    o = 1 - t;
  (o = zn(TR, RR, o)),
    (e = zn(CR, ER, en(e))),
    o < 1
      ? ((i = (u) => {
          const c = u * o,
            d = c * e,
            f = c - n,
            g = zc(u, o),
            m = Math.exp(-d);
          return du - (f / g) * m;
        }),
        (s = (u) => {
          const d = u * o * e,
            f = d * n + n,
            g = Math.pow(o, 2) * Math.pow(u, 2) * e,
            m = Math.exp(-d),
            y = zc(Math.pow(u, 2), o);
          return ((-i(u) + du > 0 ? -1 : 1) * ((f - g) * m)) / y;
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * e),
            d = (u - n) * e + 1;
          return -du + c * d;
        }),
        (s = (u) => {
          const c = Math.exp(-u * e),
            d = (n - u) * (e * e);
          return c * d;
        }));
  const a = 5 / e,
    l = OR(i, s, a);
  if (((e = Nn(e)), isNaN(l)))
    return { stiffness: 100, damping: 10, duration: e };
  {
    const u = Math.pow(l, 2) * r;
    return { stiffness: u, damping: o * 2 * Math.sqrt(r * u), duration: e };
  }
}
const _R = 12;
function OR(e, t, n) {
  let r = n;
  for (let i = 1; i < _R; i++) r = r - e(r) / t(r);
  return r;
}
function zc(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const DR = ["duration", "bounce"],
  MR = ["stiffness", "damping", "mass"];
function zp(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function jR(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!zp(e, MR) && zp(e, DR)) {
    const n = kR(e);
    (t = { ...t, ...n, mass: 1 }), (t.isResolvedFromDuration = !0);
  }
  return t;
}
function U0({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
  const i = e[0],
    s = e[e.length - 1],
    o = { done: !1, value: i },
    {
      stiffness: a,
      damping: l,
      mass: u,
      duration: c,
      velocity: d,
      isResolvedFromDuration: f,
    } = jR({ ...r, velocity: -en(r.velocity || 0) }),
    g = d || 0,
    m = l / (2 * Math.sqrt(a * u)),
    y = s - i,
    w = en(Math.sqrt(a / u)),
    p = Math.abs(y) < 5;
  n || (n = p ? 0.01 : 2), t || (t = p ? 0.005 : 0.5);
  let h;
  if (m < 1) {
    const v = zc(w, m);
    h = (x) => {
      const E = Math.exp(-m * w * x);
      return (
        s - E * (((g + m * w * y) / v) * Math.sin(v * x) + y * Math.cos(v * x))
      );
    };
  } else if (m === 1) h = (v) => s - Math.exp(-w * v) * (y + (g + w * y) * v);
  else {
    const v = w * Math.sqrt(m * m - 1);
    h = (x) => {
      const E = Math.exp(-m * w * x),
        k = Math.min(v * x, 300);
      return (
        s - (E * ((g + m * w * y) * Math.sinh(k) + v * y * Math.cosh(k))) / v
      );
    };
  }
  return {
    calculatedDuration: (f && c) || null,
    next: (v) => {
      const x = h(v);
      if (f) o.done = v >= c;
      else {
        let E = g;
        v !== 0 && (m < 1 ? (E = z0(h, v, x)) : (E = 0));
        const k = Math.abs(E) <= n,
          _ = Math.abs(s - x) <= t;
        o.done = k && _;
      }
      return (o.value = o.done ? s : x), o;
    },
  };
}
function Up({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: s = 500,
  modifyTarget: o,
  min: a,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const d = e[0],
    f = { done: !1, value: d },
    g = (C) => (a !== void 0 && C < a) || (l !== void 0 && C > l),
    m = (C) =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - C) < Math.abs(l - C)
        ? a
        : l;
  let y = n * t;
  const w = d + y,
    p = o === void 0 ? w : o(w);
  p !== w && (y = p - d);
  const h = (C) => -y * Math.exp(-C / r),
    v = (C) => p + h(C),
    x = (C) => {
      const M = h(C),
        I = v(C);
      (f.done = Math.abs(M) <= u), (f.value = f.done ? p : I);
    };
  let E, k;
  const _ = (C) => {
    g(f.value) &&
      ((E = C),
      (k = U0({
        keyframes: [f.value, m(f.value)],
        velocity: z0(v, C, f.value),
        damping: i,
        stiffness: s,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    _(0),
    {
      calculatedDuration: null,
      next: (C) => {
        let M = !1;
        return (
          !k && E === void 0 && ((M = !0), x(C), _(C)),
          E !== void 0 && C >= E ? k.next(C - E) : (!M && x(C), f)
        );
      },
    }
  );
}
const $0 = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  IR = 1e-7,
  LR = 12;
function AR(e, t, n, r, i) {
  let s,
    o,
    a = 0;
  do (o = t + (n - t) / 2), (s = $0(o, r, i) - e), s > 0 ? (n = o) : (t = o);
  while (Math.abs(s) > IR && ++a < LR);
  return o;
}
function ro(e, t, n, r) {
  if (e === t && n === r) return Ie;
  const i = (s) => AR(s, 0, 1, e, n);
  return (s) => (s === 0 || s === 1 ? s : $0(i(s), t, r));
}
const NR = ro(0.42, 0, 1, 1),
  FR = ro(0, 0, 0.58, 1),
  H0 = ro(0.42, 0, 0.58, 1),
  VR = (e) => Array.isArray(e) && typeof e[0] != "number",
  K0 = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
  W0 = (e) => (t) => 1 - e(1 - t),
  Tf = (e) => 1 - Math.sin(Math.acos(e)),
  Q0 = W0(Tf),
  bR = K0(Tf),
  G0 = ro(0.33, 1.53, 0.69, 0.99),
  Rf = W0(G0),
  BR = K0(Rf),
  zR = (e) =>
    (e *= 2) < 1 ? 0.5 * Rf(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  UR = {
    linear: Ie,
    easeIn: NR,
    easeInOut: H0,
    easeOut: FR,
    circIn: Tf,
    circInOut: bR,
    circOut: Q0,
    backIn: Rf,
    backInOut: BR,
    backOut: G0,
    anticipate: zR,
  },
  $p = (e) => {
    if (Array.isArray(e)) {
      T0(e.length === 4);
      const [t, n, r, i] = e;
      return ro(t, n, r, i);
    } else if (typeof e == "string") return UR[e];
    return e;
  },
  js = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  re = (e, t, n) => e + (t - e) * n;
function fu(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function $R({ hue: e, saturation: t, lightness: n, alpha: r }) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    s = 0,
    o = 0;
  if (!t) i = s = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a;
    (i = fu(l, a, e + 1 / 3)), (s = fu(l, a, e)), (o = fu(l, a, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: r,
  };
}
const hu = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  HR = [bc, rr, Ur],
  KR = (e) => HR.find((t) => t.test(e));
function Hp(e) {
  const t = KR(e);
  let n = t.parse(e);
  return t === Ur && (n = $R(n)), n;
}
const Kp = (e, t) => {
  const n = Hp(e),
    r = Hp(t),
    i = { ...n };
  return (s) => (
    (i.red = hu(n.red, r.red, s)),
    (i.green = hu(n.green, r.green, s)),
    (i.blue = hu(n.blue, r.blue, s)),
    (i.alpha = re(n.alpha, r.alpha, s)),
    rr.transform(i)
  );
};
function Uc(e, t) {
  return (n) => (n > 0 ? t : e);
}
function WR(e, t) {
  return (n) => re(e, t, n);
}
function kf(e) {
  return typeof e == "number"
    ? WR
    : typeof e == "string"
    ? hf(e)
      ? Uc
      : De.test(e)
      ? Kp
      : qR
    : Array.isArray(e)
    ? q0
    : typeof e == "object"
    ? De.test(e)
      ? Kp
      : QR
    : Uc;
}
function q0(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((s, o) => kf(s)(s, t[o]));
  return (s) => {
    for (let o = 0; o < r; o++) n[o] = i[o](s);
    return n;
  };
}
function QR(e, t) {
  const n = { ...e, ...t },
    r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = kf(e[i])(e[i], t[i]));
  return (i) => {
    for (const s in r) n[s] = r[s](i);
    return n;
  };
}
function GR(e, t) {
  var n;
  const r = [],
    i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < t.values.length; s++) {
    const o = t.types[s],
      a = e.indexes[o][i[o]],
      l = (n = e.values[a]) !== null && n !== void 0 ? n : 0;
    (r[s] = l), i[o]++;
  }
  return r;
}
const qR = (e, t) => {
  const n = Un.createTransformer(t),
    r = _a(e),
    i = _a(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? Zt(q0(GR(r, i), i.values), n)
    : Uc(e, t);
};
function Y0(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? re(e, t, n)
    : kf(e)(e, t);
}
function YR(e, t, n) {
  const r = [],
    i = n || Y0,
    s = e.length - 1;
  for (let o = 0; o < s; o++) {
    let a = i(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || Ie : t;
      a = Zt(l, a);
    }
    r.push(a);
  }
  return r;
}
function X0(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const s = e.length;
  if ((T0(s === t.length), s === 1)) return () => t[0];
  if (s === 2 && e[0] === e[1]) return () => t[1];
  e[0] > e[s - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const o = YR(t, r, i),
    a = o.length,
    l = (u) => {
      let c = 0;
      if (a > 1) for (; c < e.length - 2 && !(u < e[c + 1]); c++);
      const d = js(e[c], e[c + 1], u);
      return o[c](d);
    };
  return n ? (u) => l(zn(e[0], e[s - 1], u)) : l;
}
function XR(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = js(0, t, r);
    e.push(re(n, 1, i));
  }
}
function JR(e) {
  const t = [0];
  return XR(t, e.length - 1), t;
}
function ZR(e, t) {
  return e.map((n) => n * t);
}
function ek(e, t) {
  return e.map(() => t || H0).splice(0, e.length - 1);
}
function Oa({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: r = "easeInOut",
}) {
  const i = VR(r) ? r.map($p) : $p(r),
    s = { done: !1, value: t[0] },
    o = ZR(n && n.length === t.length ? n : JR(t), e),
    a = X0(o, t, { ease: Array.isArray(i) ? i : ek(t, i) });
  return {
    calculatedDuration: e,
    next: (l) => ((s.value = a(l)), (s.done = l >= e), s),
  };
}
const Wp = 2e4;
function tk(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < Wp; ) (t += n), (r = e.next(t));
  return t >= Wp ? 1 / 0 : t;
}
const nk = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: () => q.update(t, !0),
      stop: () => on(t),
      now: () => (Pe.isProcessing ? Pe.timestamp : Fn.now()),
    };
  },
  rk = { decay: Up, inertia: Up, tween: Oa, keyframes: Oa, spring: U0 },
  ik = (e) => e / 100;
class _f extends b0 {
  constructor({ KeyframeResolver: t = Pf, ...n }) {
    super(n),
      (this.holdTime = null),
      (this.startTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.state = "idle"),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
        )
          return;
        this.teardown();
        const { onStop: a } = this.options;
        a && a();
      });
    const { name: r, motionValue: i, keyframes: s } = this.options,
      o = (a, l) => this.onKeyframesResolved(a, l);
    r && i && i.owner
      ? (this.resolver = i.owner.resolveKeyframes(s, o, r, i))
      : (this.resolver = new t(s, o, r, i)),
      this.resolver.scheduleResolve();
  }
  initPlayback(t) {
    const {
        type: n = "keyframes",
        repeat: r = 0,
        repeatDelay: i = 0,
        repeatType: s,
        velocity: o = 0,
      } = this.options,
      a = rk[n] || Oa;
    let l, u;
    a !== Oa &&
      typeof t[0] != "number" &&
      ((l = Zt(ik, Y0(t[0], t[1]))), (t = [0, 100]));
    const c = a({ ...this.options, keyframes: t });
    s === "mirror" &&
      (u = a({ ...this.options, keyframes: [...t].reverse(), velocity: -o })),
      c.calculatedDuration === null && (c.calculatedDuration = tk(c));
    const { calculatedDuration: d } = c,
      f = d + i,
      g = f * (r + 1) - i;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: l,
      calculatedDuration: d,
      resolvedDuration: f,
      totalDuration: g,
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(),
      this.pendingPlayState === "paused" || !t
        ? this.pause()
        : (this.state = this.pendingPlayState);
  }
  tick(t, n = !1) {
    const { resolved: r } = this;
    if (!r) {
      const { keyframes: C } = this.options;
      return { done: !0, value: C[C.length - 1] };
    }
    const {
      finalKeyframe: i,
      generator: s,
      mirroredGenerator: o,
      mapPercentToKeyframes: a,
      keyframes: l,
      calculatedDuration: u,
      totalDuration: c,
      resolvedDuration: d,
    } = r;
    if (this.startTime === null) return s.next(0);
    const {
      delay: f,
      repeat: g,
      repeatType: m,
      repeatDelay: y,
      onUpdate: w,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - c / this.speed, this.startTime)),
      n
        ? (this.currentTime = t)
        : this.holdTime !== null
        ? (this.currentTime = this.holdTime)
        : (this.currentTime = Math.round(t - this.startTime) * this.speed);
    const p = this.currentTime - f * (this.speed >= 0 ? 1 : -1),
      h = this.speed >= 0 ? p < 0 : p > c;
    (this.currentTime = Math.max(p, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = c);
    let v = this.currentTime,
      x = s;
    if (g) {
      const C = Math.min(this.currentTime, c) / d;
      let M = Math.floor(C),
        I = C % 1;
      !I && C >= 1 && (I = 1),
        I === 1 && M--,
        (M = Math.min(M, g + 1)),
        !!(M % 2) &&
          (m === "reverse"
            ? ((I = 1 - I), y && (I -= y / d))
            : m === "mirror" && (x = o)),
        (v = zn(0, 1, I) * d);
    }
    const E = h ? { done: !1, value: l[0] } : x.next(v);
    a && (E.value = a(E.value));
    let { done: k } = E;
    !h &&
      u !== null &&
      (k = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const _ =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && k));
    return (
      _ && i !== void 0 && (E.value = gl(l, this.options, i)),
      w && w(E.value),
      _ && this.finish(),
      E
    );
  }
  get duration() {
    const { resolved: t } = this;
    return t ? en(t.calculatedDuration) : 0;
  }
  get time() {
    return en(this.currentTime);
  }
  set time(t) {
    (t = Nn(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    (this.playbackSpeed = t), n && (this.time = en(this.currentTime));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: t = nk, onPlay: n } = this.options;
    this.driver || (this.driver = t((i) => this.tick(i))), n && n();
    const r = this.driver.now();
    this.holdTime !== null
      ? (this.startTime = r - this.holdTime)
      : (!this.startTime || this.state === "finished") && (this.startTime = r),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    (this.state = "paused"),
      (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = "finished");
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return (this.startTime = 0), this.tick(t, !0);
  }
}
const J0 = (e) => Array.isArray(e) && typeof e[0] == "number";
function Z0(e) {
  return !!(
    !e ||
    (typeof e == "string" && e in Of) ||
    J0(e) ||
    (Array.isArray(e) && e.every(Z0))
  );
}
const Wi = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Of = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Wi([0, 0.65, 0.55, 1]),
    circOut: Wi([0.55, 0, 1, 0.45]),
    backIn: Wi([0.31, 0.01, 0.66, -0.59]),
    backOut: Wi([0.33, 1.53, 0.69, 0.99]),
  };
function sk(e) {
  return e1(e) || Of.easeOut;
}
function e1(e) {
  if (e) return J0(e) ? Wi(e) : Array.isArray(e) ? e.map(sk) : Of[e];
}
function ok(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: s = 0,
    repeatType: o = "loop",
    ease: a,
    times: l,
  } = {}
) {
  const u = { [t]: n };
  l && (u.offset = l);
  const c = e1(a);
  return (
    Array.isArray(c) && (u.easing = c),
    e.animate(u, {
      delay: r,
      duration: i,
      easing: Array.isArray(c) ? "linear" : c,
      fill: "both",
      iterations: s + 1,
      direction: o === "reverse" ? "alternate" : "normal",
    })
  );
}
const ak = SR(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  lk = new Set(["opacity", "clipPath", "filter", "transform"]),
  Da = 10,
  uk = 2e4;
function ck(e) {
  return e.type === "spring" || e.name === "backgroundColor" || !Z0(e.ease);
}
function dk(e, t) {
  const n = new _f({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let r = { done: !1, value: e[0] };
  const i = [];
  let s = 0;
  for (; !r.done && s < uk; ) (r = n.sample(s)), i.push(r.value), (s += Da);
  return { times: void 0, keyframes: i, duration: s - Da, ease: "linear" };
}
class Qp extends b0 {
  constructor(t) {
    super(t);
    const { name: n, motionValue: r, keyframes: i } = this.options;
    (this.resolver = new V0(i, (s, o) => this.onKeyframesResolved(s, o), n, r)),
      this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    var r;
    let {
      duration: i = 300,
      times: s,
      ease: o,
      type: a,
      motionValue: l,
      name: u,
    } = this.options;
    if (!(!((r = l.owner) === null || r === void 0) && r.current)) return !1;
    if (ck(this.options)) {
      const { onComplete: d, onUpdate: f, motionValue: g, ...m } = this.options,
        y = dk(t, m);
      (t = y.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (i = y.duration),
        (s = y.times),
        (o = y.ease),
        (a = "keyframes");
    }
    const c = ok(l.owner.current, u, t, {
      ...this.options,
      duration: i,
      times: s,
      ease: o,
    });
    return (
      (c.startTime = Fn.now()),
      this.pendingTimeline
        ? ((c.timeline = this.pendingTimeline), (this.pendingTimeline = void 0))
        : (c.onfinish = () => {
            const { onComplete: d } = this.options;
            l.set(gl(t, this.options, n)),
              d && d(),
              this.cancel(),
              this.resolveFinishedPromise();
          }),
      { animation: c, duration: i, times: s, type: a, ease: o, keyframes: t }
    );
  }
  get duration() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { duration: n } = t;
    return en(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { animation: n } = t;
    return en(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.currentTime = Nn(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t) return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t) return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n) return Ie;
      const { animation: r } = n;
      (r.timeline = t), (r.onfinish = null);
    }
    return Ie;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    const { resolved: t } = this;
    if (!t) return;
    const {
      animation: n,
      keyframes: r,
      duration: i,
      type: s,
      ease: o,
      times: a,
    } = t;
    if (!(n.playState === "idle" || n.playState === "finished")) {
      if (this.time) {
        const {
            motionValue: l,
            onUpdate: u,
            onComplete: c,
            ...d
          } = this.options,
          f = new _f({
            ...d,
            keyframes: r,
            duration: i,
            type: s,
            ease: o,
            times: a,
            isGenerator: !0,
          }),
          g = Nn(this.time);
        l.setWithVelocity(f.sample(g - Da).value, f.sample(g).value, Da);
      }
      this.cancel();
    }
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const {
      motionValue: n,
      name: r,
      repeatDelay: i,
      repeatType: s,
      damping: o,
      type: a,
    } = t;
    return (
      ak() &&
      r &&
      lk.has(r) &&
      n &&
      n.owner &&
      n.owner.current instanceof HTMLElement &&
      !n.owner.getProps().onUpdate &&
      !i &&
      s !== "mirror" &&
      o !== 0 &&
      a !== "inertia"
    );
  }
}
const Df =
  (e, t, n, r = {}, i, s) =>
  (o) => {
    const a = xf(r, e) || {},
      l = a.delay || r.delay || 0;
    let { elapsed: u = 0 } = r;
    u = u - Nn(l);
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...a,
      delay: -u,
      onUpdate: (f) => {
        t.set(f), a.onUpdate && a.onUpdate(f);
      },
      onComplete: () => {
        o(), a.onComplete && a.onComplete();
      },
      name: e,
      motionValue: t,
      element: s ? void 0 : i,
    };
    QT(a) || (c = { ...c, ...WT(e, c) }),
      c.duration && (c.duration = Nn(c.duration)),
      c.repeatDelay && (c.repeatDelay = Nn(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from);
    let d = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        ((c.duration = 0), c.delay === 0 && (d = !0)),
      d && !s && t.get() !== void 0)
    ) {
      const f = gl(c.keyframes, a);
      if (f !== void 0) {
        q.update(() => {
          c.onUpdate(f), c.onComplete();
        });
        return;
      }
    }
    return !s && Qp.supports(c) ? new Qp(c) : new _f(c);
  };
function Ma(e) {
  return !!(Ee(e) && e.add);
}
function Mf(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function jf(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function fk([...e], t, n) {
  const r = t < 0 ? e.length + t : t;
  if (r >= 0 && r < e.length) {
    const i = n < 0 ? e.length + n : n,
      [s] = e.splice(t, 1);
    e.splice(i, 0, s);
  }
  return e;
}
class If {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Mf(this.subscriptions, t), () => jf(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let s = 0; s < i; s++) {
          const o = this.subscriptions[s];
          o && o(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Gp = 30,
  hk = (e) => !isNaN(parseFloat(e)),
  ss = { current: void 0 };
class pk {
  constructor(t, n = {}) {
    (this.version = "11.1.9"),
      (this.canTrackVelocity = !1),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        const s = Fn.now();
        this.updatedAt !== s && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.canTrackVelocity = hk(this.current)),
      (this.owner = n.owner);
  }
  setCurrent(t) {
    (this.current = t), (this.updatedAt = Fn.now());
  }
  setPrevFrameValue(t = this.current) {
    (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new If());
    const r = this.events[t].add(n);
    return t === "change"
      ? () => {
          r(),
            q.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    (this.passiveEffect = t), (this.stopPassiveEffect = n);
  }
  set(t, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - r);
  }
  jump(t, n = !0) {
    this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return ss.current && ss.current.push(this), this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = Fn.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > Gp
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Gp);
    return B0(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Pi(e, t) {
  return new pk(e, t);
}
function mk(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Pi(n));
}
function yk(e, t) {
  const n = yl(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...s } = n || {};
  s = { ...s, ...r };
  for (const o in s) {
    const a = xT(s[o]);
    mk(e, o, a);
  }
}
function gk({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
function t1(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var s;
  let { transition: o = e.getDefaultTransition(), transitionEnd: a, ...l } = t;
  const u = e.getValue("willChange");
  r && (o = r);
  const c = [],
    d = i && e.animationState && e.animationState.getState()[i];
  for (const f in l) {
    const g = e.getValue(
        f,
        (s = e.latestValues[f]) !== null && s !== void 0 ? s : null
      ),
      m = l[f];
    if (m === void 0 || (d && gk(d, f))) continue;
    const y = { delay: n, elapsed: 0, ...xf(o || {}, f) };
    let w = !1;
    if (window.HandoffAppearAnimations) {
      const v = e.getProps()[n0];
      if (v) {
        const x = window.HandoffAppearAnimations(v, f);
        x !== null && ((y.elapsed = x), (w = !0));
      }
    }
    g.start(
      Df(f, g, m, e.shouldReduceMotion && Er.has(f) ? { type: !1 } : y, e, w)
    );
    const p = g.animation;
    p && (Ma(u) && (u.add(f), p.then(() => u.remove(f))), c.push(p));
  }
  return (
    a &&
      Promise.all(c).then(() => {
        q.update(() => {
          a && yk(e, a);
        });
      }),
    c
  );
}
function $c(e, t, n = {}) {
  var r;
  const i = yl(
    e,
    t,
    n.type === "exit"
      ? (r = e.presenceContext) === null || r === void 0
        ? void 0
        : r.custom
      : void 0
  );
  let { transition: s = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(t1(e, i, n)) : () => Promise.resolve(),
    a =
      e.variantChildren && e.variantChildren.size
        ? (u = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: d,
              staggerDirection: f,
            } = s;
            return vk(e, t, c + u, d, f, n);
          }
        : () => Promise.resolve(),
    { when: l } = s;
  if (l) {
    const [u, c] = l === "beforeChildren" ? [o, a] : [a, o];
    return u().then(() => c());
  } else return Promise.all([o(), a(n.delay)]);
}
function vk(e, t, n = 0, r = 0, i = 1, s) {
  const o = [],
    a = (e.variantChildren.size - 1) * r,
    l = i === 1 ? (u = 0) => u * r : (u = 0) => a - u * r;
  return (
    Array.from(e.variantChildren)
      .sort(Sk)
      .forEach((u, c) => {
        u.notify("AnimationStart", t),
          o.push(
            $c(u, t, { ...s, delay: n + l(c) }).then(() =>
              u.notify("AnimationComplete", t)
            )
          );
      }),
    Promise.all(o)
  );
}
function Sk(e, t) {
  return e.sortNodePosition(t);
}
function wk(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((s) => $c(e, s, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = $c(e, t, n);
  else {
    const i = typeof t == "function" ? yl(e, t, n.custom) : t;
    r = Promise.all(t1(e, i, n));
  }
  return r.then(() => {
    q.postRender(() => {
      e.notify("AnimationComplete", t);
    });
  });
}
const xk = [...uf].reverse(),
  Pk = uf.length;
function Ck(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: r }) => wk(e, n, r)));
}
function Ek(e) {
  let t = Ck(e);
  const n = Rk();
  let r = !0;
  const i = (l) => (u, c) => {
    var d;
    const f = yl(
      e,
      c,
      l === "exit"
        ? (d = e.presenceContext) === null || d === void 0
          ? void 0
          : d.custom
        : void 0
    );
    if (f) {
      const { transition: g, transitionEnd: m, ...y } = f;
      u = { ...u, ...y, ...m };
    }
    return u;
  };
  function s(l) {
    t = l(e);
  }
  function o(l) {
    const u = e.getProps(),
      c = e.getVariantContext(!0) || {},
      d = [],
      f = new Set();
    let g = {},
      m = 1 / 0;
    for (let w = 0; w < Pk; w++) {
      const p = xk[w],
        h = n[p],
        v = u[p] !== void 0 ? u[p] : c[p],
        x = Ds(v),
        E = p === l ? h.isActive : null;
      E === !1 && (m = w);
      let k = v === c[p] && v !== u[p] && x;
      if (
        (k && r && e.manuallyAnimateOnMount && (k = !1),
        (h.protectedKeys = { ...g }),
        (!h.isActive && E === null) ||
          (!v && !h.prevProp) ||
          hl(v) ||
          typeof v == "boolean")
      )
        continue;
      let C =
          Tk(h.prevProp, v) ||
          (p === l && h.isActive && !k && x) ||
          (w > m && x),
        M = !1;
      const I = Array.isArray(v) ? v : [v];
      let K = I.reduce(i(p), {});
      E === !1 && (K = {});
      const { prevResolvedValues: W = {} } = h,
        ce = { ...W, ...K },
        ie = (Q) => {
          (C = !0),
            f.has(Q) && ((M = !0), f.delete(Q)),
            (h.needsAnimating[Q] = !0);
          const se = e.getValue(Q);
          se && (se.liveStyle = !1);
        };
      for (const Q in ce) {
        const se = K[Q],
          $ = W[Q];
        if (g.hasOwnProperty(Q)) continue;
        let D = !1;
        Ac(se) && Ac($) ? (D = !C0(se, $)) : (D = se !== $),
          D
            ? se != null
              ? ie(Q)
              : f.add(Q)
            : se !== void 0 && f.has(Q)
            ? ie(Q)
            : (h.protectedKeys[Q] = !0);
      }
      (h.prevProp = v),
        (h.prevResolvedValues = K),
        h.isActive && (g = { ...g, ...K }),
        r && e.blockInitialAnimation && (C = !1),
        C &&
          (!k || M) &&
          d.push(...I.map((Q) => ({ animation: Q, options: { type: p } })));
    }
    if (f.size) {
      const w = {};
      f.forEach((p) => {
        const h = e.getBaseTarget(p),
          v = e.getValue(p);
        v && (v.liveStyle = !0), (w[p] = h ?? null);
      }),
        d.push({ animation: w });
    }
    let y = !!d.length;
    return (
      r &&
        (u.initial === !1 || u.initial === u.animate) &&
        !e.manuallyAnimateOnMount &&
        (y = !1),
      (r = !1),
      y ? t(d) : Promise.resolve()
    );
  }
  function a(l, u) {
    var c;
    if (n[l].isActive === u) return Promise.resolve();
    (c = e.variantChildren) === null ||
      c === void 0 ||
      c.forEach((f) => {
        var g;
        return (g = f.animationState) === null || g === void 0
          ? void 0
          : g.setActive(l, u);
      }),
      (n[l].isActive = u);
    const d = o(l);
    for (const f in n) n[f].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: s,
    getState: () => n,
  };
}
function Tk(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !C0(t, e) : !1;
}
function Gn(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Rk() {
  return {
    animate: Gn(!0),
    whileInView: Gn(),
    whileHover: Gn(),
    whileTap: Gn(),
    whileDrag: Gn(),
    whileFocus: Gn(),
    exit: Gn(),
  };
}
class kk extends Wn {
  constructor(t) {
    super(t), t.animationState || (t.animationState = Ek(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    this.unmount(), hl(t) && (this.unmount = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {}
}
let _k = 0;
class Ok extends Wn {
  constructor() {
    super(...arguments), (this.id = _k++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r) return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const Dk = { animation: { Feature: kk }, exit: { Feature: Ok } },
  qp = (e, t) => Math.abs(e - t);
function Mk(e, t) {
  const n = qp(e.x, t.x),
    r = qp(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class n1 {
  constructor(
    t,
    n,
    { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: s = !1 } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const d = mu(this.lastMoveEventInfo, this.history),
          f = this.startEvent !== null,
          g = Mk(d.offset, { x: 0, y: 0 }) >= 3;
        if (!f && !g) return;
        const { point: m } = d,
          { timestamp: y } = Pe;
        this.history.push({ ...m, timestamp: y });
        const { onStart: w, onMove: p } = this.handlers;
        f ||
          (w && w(this.lastMoveEvent, d),
          (this.startEvent = this.lastMoveEvent)),
          p && p(this.lastMoveEvent, d);
      }),
      (this.handlePointerMove = (d, f) => {
        (this.lastMoveEvent = d),
          (this.lastMoveEventInfo = pu(f, this.transformPagePoint)),
          q.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (d, f) => {
        this.end();
        const { onEnd: g, onSessionEnd: m, resumeAnimation: y } = this.handlers;
        if (
          (this.dragSnapToOrigin && y && y(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const w = mu(
          d.type === "pointercancel"
            ? this.lastMoveEventInfo
            : pu(f, this.transformPagePoint),
          this.history
        );
        this.startEvent && g && g(d, w), m && m(d, w);
      }),
      !v0(t))
    )
      return;
    (this.dragSnapToOrigin = s),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.contextWindow = i || window);
    const o = ml(t),
      a = pu(o, this.transformPagePoint),
      { point: l } = a,
      { timestamp: u } = Pe;
    this.history = [{ ...l, timestamp: u }];
    const { onSessionStart: c } = n;
    c && c(t, mu(a, this.history)),
      (this.removeListeners = Zt(
        Jt(this.contextWindow, "pointermove", this.handlePointerMove),
        Jt(this.contextWindow, "pointerup", this.handlePointerUp),
        Jt(this.contextWindow, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), on(this.updatePoint);
  }
}
function pu(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Yp(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function mu({ point: e }, t) {
  return {
    point: e,
    delta: Yp(e, r1(t)),
    offset: Yp(e, jk(t)),
    velocity: Ik(t, 0.1),
  };
}
function jk(e) {
  return e[0];
}
function r1(e) {
  return e[e.length - 1];
}
function Ik(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null;
  const i = r1(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > Nn(t))); ) n--;
  if (!r) return { x: 0, y: 0 };
  const s = en(i.timestamp - r.timestamp);
  if (s === 0) return { x: 0, y: 0 };
  const o = { x: (i.x - r.x) / s, y: (i.y - r.y) / s };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function et(e) {
  return e.max - e.min;
}
function Hc(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function Xp(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = re(t.min, t.max, e.origin)),
    (e.scale = et(n) / et(t)),
    (Hc(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
    (e.translate = re(n.min, n.max, e.origin) - e.originPoint),
    (Hc(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function os(e, t, n, r) {
  Xp(e.x, t.x, n.x, r ? r.originX : void 0),
    Xp(e.y, t.y, n.y, r ? r.originY : void 0);
}
function Jp(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + et(t));
}
function Lk(e, t, n) {
  Jp(e.x, t.x, n.x), Jp(e.y, t.y, n.y);
}
function Zp(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + et(t));
}
function as(e, t, n) {
  Zp(e.x, t.x, n.x), Zp(e.y, t.y, n.y);
}
function Ak(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? re(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? re(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function em(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function Nk(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: em(e.x, n, i), y: em(e.y, t, r) };
}
function tm(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function Fk(e, t) {
  return { x: tm(e.x, t.x), y: tm(e.y, t.y) };
}
function Vk(e, t) {
  let n = 0.5;
  const r = et(e),
    i = et(t);
  return (
    i > r
      ? (n = js(t.min, t.max - r, e.min))
      : r > i && (n = js(e.min, e.max - i, t.min)),
    zn(0, 1, n)
  );
}
function bk(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const Kc = 0.35;
function Bk(e = Kc) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Kc),
    { x: nm(e, "left", "right"), y: nm(e, "top", "bottom") }
  );
}
function nm(e, t, n) {
  return { min: rm(e, t), max: rm(e, n) };
}
function rm(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const im = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  $r = () => ({ x: im(), y: im() }),
  sm = () => ({ min: 0, max: 0 }),
  he = () => ({ x: sm(), y: sm() });
function st(e) {
  return [e("x"), e("y")];
}
function i1({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function zk({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Uk(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function yu(e) {
  return e === void 0 || e === 1;
}
function Wc({ scale: e, scaleX: t, scaleY: n }) {
  return !yu(e) || !yu(t) || !yu(n);
}
function Xn(e) {
  return (
    Wc(e) ||
    s1(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function s1(e) {
  return om(e.x) || om(e.y);
}
function om(e) {
  return e && e !== "0%";
}
function ja(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function am(e, t, n, r, i) {
  return i !== void 0 && (e = ja(e, i, r)), ja(e, n, r) + t;
}
function Qc(e, t = 0, n = 1, r, i) {
  (e.min = am(e.min, t, n, r, i)), (e.max = am(e.max, t, n, r, i));
}
function o1(e, { x: t, y: n }) {
  Qc(e.x, t.translate, t.scale, t.originPoint),
    Qc(e.y, n.translate, n.scale, n.originPoint);
}
function $k(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let s, o;
  for (let a = 0; a < i; a++) {
    (s = n[a]), (o = s.projectionDelta);
    const l = s.instance;
    (l && l.style && l.style.display === "contents") ||
      (r &&
        s.options.layoutScroll &&
        s.scroll &&
        s !== s.root &&
        Hr(e, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
      o && ((t.x *= o.x.scale), (t.y *= o.y.scale), o1(e, o)),
      r && Xn(s.latestValues) && Hr(e, s.latestValues));
  }
  (t.x = lm(t.x)), (t.y = lm(t.y));
}
function lm(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999
    ? e
    : 1;
}
function mn(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function um(e, t, [n, r, i]) {
  const s = t[i] !== void 0 ? t[i] : 0.5,
    o = re(e.min, e.max, s);
  Qc(e, t[n], t[r], o, t.scale);
}
const Hk = ["x", "scaleX", "originX"],
  Kk = ["y", "scaleY", "originY"];
function Hr(e, t) {
  um(e.x, t, Hk), um(e.y, t, Kk);
}
function a1(e, t) {
  return i1(Uk(e.getBoundingClientRect(), t));
}
function Wk(e, t, n) {
  const r = a1(e, n),
    { scroll: i } = t;
  return i && (mn(r.x, i.offset.x), mn(r.y, i.offset.y)), r;
}
const l1 = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  Qk = new WeakMap();
class Gk {
  constructor(t) {
    (this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = he()),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1) return;
    const i = (c) => {
        const { dragSnapToOrigin: d } = this.getProps();
        d ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(ml(c, "page").point);
      },
      s = (c, d) => {
        const { drag: f, dragPropagation: g, onDragStart: m } = this.getProps();
        if (
          f &&
          !g &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = w0(f)),
          !this.openGlobalLock)
        )
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          st((w) => {
            let p = this.getAxisMotionValue(w).get() || 0;
            if (Ft.test(p)) {
              const { projection: h } = this.visualElement;
              if (h && h.layout) {
                const v = h.layout.layoutBox[w];
                v && (p = et(v) * (parseFloat(p) / 100));
              }
            }
            this.originPoint[w] = p;
          }),
          m && q.postRender(() => m(c, d));
        const { animationState: y } = this.visualElement;
        y && y.setActive("whileDrag", !0);
      },
      o = (c, d) => {
        const {
          dragPropagation: f,
          dragDirectionLock: g,
          onDirectionLock: m,
          onDrag: y,
        } = this.getProps();
        if (!f && !this.openGlobalLock) return;
        const { offset: w } = d;
        if (g && this.currentDirection === null) {
          (this.currentDirection = qk(w)),
            this.currentDirection !== null && m && m(this.currentDirection);
          return;
        }
        this.updateAxis("x", d.point, w),
          this.updateAxis("y", d.point, w),
          this.visualElement.render(),
          y && y(c, d);
      },
      a = (c, d) => this.stop(c, d),
      l = () =>
        st((c) => {
          var d;
          return (
            this.getAnimationState(c) === "paused" &&
            ((d = this.getAxisMotionValue(c).animation) === null || d === void 0
              ? void 0
              : d.play())
          );
        }),
      { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new n1(
      t,
      {
        onSessionStart: i,
        onStart: s,
        onMove: o,
        onSessionEnd: a,
        resumeAnimation: l,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        contextWindow: l1(this.visualElement),
      }
    );
  }
  stop(t, n) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: s } = this.getProps();
    s && q.postRender(() => s(t, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: r } = this.getProps();
    !r &&
      this.openGlobalLock &&
      (this.openGlobalLock(), (this.openGlobalLock = null)),
      n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Do(t, i, this.currentDirection)) return;
    const s = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + r[t];
    this.constraints &&
      this.constraints[t] &&
      (o = Ak(o, this.constraints[t], this.elastic[t])),
      s.set(o);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: r } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
          ? void 0
          : t.layout,
      s = this.constraints;
    n && zr(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
      ? (this.constraints = Nk(i.layoutBox, n))
      : (this.constraints = !1),
      (this.elastic = Bk(r)),
      s !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        st((o) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(o) &&
            (this.constraints[o] = bk(i.layoutBox[o], this.constraints[o]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !zr(t)) return !1;
    const r = t.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const s = Wk(r, i.root, this.visualElement.getTransformPagePoint());
    let o = Fk(i.layout.layoutBox, s);
    if (n) {
      const a = n(zk(o));
      (this.hasMutatedConstraints = !!a), a && (o = i1(a));
    }
    return o;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: s,
        dragSnapToOrigin: o,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      u = st((c) => {
        if (!Do(c, n, this.currentDirection)) return;
        let d = (l && l[c]) || {};
        o && (d = { min: 0, max: 0 });
        const f = i ? 200 : 1e6,
          g = i ? 40 : 1e7,
          m = {
            type: "inertia",
            velocity: r ? t[c] : 0,
            bounceStiffness: f,
            bounceDamping: g,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...s,
            ...d,
          };
        return this.startAxisValueAnimation(c, m);
      });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return r.start(Df(t, r, 0, n, this.visualElement));
  }
  stopAnimation() {
    st((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    st((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      i = r[n];
    return (
      i ||
      this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    st((n) => {
      const { drag: r } = this.getProps();
      if (!Do(n, r, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        s = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n];
        s.set(t[n] - re(o, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!zr(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    st((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[o] = Vk({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = s ? s({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      st((o) => {
        if (!Do(o, t, null)) return;
        const a = this.getAxisMotionValue(o),
          { min: l, max: u } = this.constraints[o];
        a.set(re(l, u, i[o]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    Qk.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Jt(t, "pointerdown", (l) => {
        const { drag: u, dragListener: c = !0 } = this.getProps();
        u && c && this.start(l);
      }),
      r = () => {
        const { dragConstraints: l } = this.getProps();
        zr(l) && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      s = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), r();
    const o = qt(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener(
        "didUpdate",
        ({ delta: l, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (st((c) => {
              const d = this.getAxisMotionValue(c);
              d &&
                ((this.originPoint[c] += l[c].translate),
                d.set(d.get() + l[c].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      o(), n(), s(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: s = !1,
        dragElastic: o = Kc,
        dragMomentum: a = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: s,
      dragElastic: o,
      dragMomentum: a,
    };
  }
}
function Do(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function qk(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n;
}
class Yk extends Wn {
  constructor(t) {
    super(t),
      (this.removeGroupControls = Ie),
      (this.removeListeners = Ie),
      (this.controls = new Gk(t));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Ie);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const cm = (e) => (t, n) => {
  e && q.postRender(() => e(t, n));
};
class Xk extends Wn {
  constructor() {
    super(...arguments), (this.removePointerDownListener = Ie);
  }
  onPointerDown(t) {
    this.session = new n1(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: l1(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: r,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: cm(t),
      onStart: cm(n),
      onMove: r,
      onEnd: (s, o) => {
        delete this.session, i && q.postRender(() => i(s, o));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Jt(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function Jk() {
  const e = T.useContext(dl);
  if (e === null) return [!0, null];
  const { isPresent: t, onExitComplete: n, register: r } = e,
    i = T.useId();
  return T.useEffect(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0];
}
const qo = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function dm(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const Bi = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (N.test(e)) e = parseFloat(e);
        else return e;
      const n = dm(e, t.target.x),
        r = dm(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  Zk = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = Un.parse(e);
      if (i.length > 5) return r;
      const s = Un.createTransformer(e),
        o = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * t.x,
        l = n.y.scale * t.y;
      (i[0 + o] /= a), (i[1 + o] /= l);
      const u = re(a, l, 0.5);
      return (
        typeof i[2 + o] == "number" && (i[2 + o] /= u),
        typeof i[3 + o] == "number" && (i[3 + o] /= u),
        s(i)
      );
    },
  };
class e2 extends T.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      { projection: s } = t;
    XE(t2),
      s &&
        (n.group && n.group.add(s),
        r && r.register && i && r.register(s),
        s.root.didUpdate(),
        s.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        s.setOptions({
          ...s.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (qo.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: r,
        drag: i,
        isPresent: s,
      } = this.props,
      o = r.projection;
    return (
      o &&
        ((o.isPresent = s),
        i || t.layoutDependency !== n || n === void 0
          ? o.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== s &&
          (s
            ? o.promote()
            : o.relegate() ||
              q.postRender(() => {
                const a = o.getStack();
                (!a || !a.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      lf.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
      } = this.props,
      { projection: i } = t;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function u1(e) {
  const [t, n] = Jk(),
    r = T.useContext(df);
  return S.jsx(e2, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: T.useContext(s0),
    isPresent: t,
    safeToRemove: n,
  });
}
const t2 = {
    borderRadius: {
      ...Bi,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: Bi,
    borderTopRightRadius: Bi,
    borderBottomLeftRadius: Bi,
    borderBottomRightRadius: Bi,
    boxShadow: Zk,
  },
  c1 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  n2 = c1.length,
  fm = (e) => (typeof e == "string" ? parseFloat(e) : e),
  hm = (e) => typeof e == "number" || N.test(e);
function r2(e, t, n, r, i, s) {
  i
    ? ((e.opacity = re(0, n.opacity !== void 0 ? n.opacity : 1, i2(r))),
      (e.opacityExit = re(t.opacity !== void 0 ? t.opacity : 1, 0, s2(r))))
    : s &&
      (e.opacity = re(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r
      ));
  for (let o = 0; o < n2; o++) {
    const a = `border${c1[o]}Radius`;
    let l = pm(t, a),
      u = pm(n, a);
    if (l === void 0 && u === void 0) continue;
    l || (l = 0),
      u || (u = 0),
      l === 0 || u === 0 || hm(l) === hm(u)
        ? ((e[a] = Math.max(re(fm(l), fm(u), r), 0)),
          (Ft.test(u) || Ft.test(l)) && (e[a] += "%"))
        : (e[a] = u);
  }
  (t.rotate || n.rotate) && (e.rotate = re(t.rotate || 0, n.rotate || 0, r));
}
function pm(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const i2 = d1(0, 0.5, Q0),
  s2 = d1(0.5, 0.95, Ie);
function d1(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(js(e, t, r)));
}
function mm(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function it(e, t) {
  mm(e.x, t.x), mm(e.y, t.y);
}
function ym(e, t, n, r, i) {
  return (
    (e -= t), (e = ja(e, 1 / n, r)), i !== void 0 && (e = ja(e, 1 / i, r)), e
  );
}
function o2(e, t = 0, n = 1, r = 0.5, i, s = e, o = e) {
  if (
    (Ft.test(t) &&
      ((t = parseFloat(t)), (t = re(o.min, o.max, t / 100) - o.min)),
    typeof t != "number")
  )
    return;
  let a = re(s.min, s.max, r);
  e === s && (a -= t),
    (e.min = ym(e.min, t, n, a, i)),
    (e.max = ym(e.max, t, n, a, i));
}
function gm(e, t, [n, r, i], s, o) {
  o2(e, t[n], t[r], t[i], t.scale, s, o);
}
const a2 = ["x", "scaleX", "originX"],
  l2 = ["y", "scaleY", "originY"];
function vm(e, t, n, r) {
  gm(e.x, t, a2, n ? n.x : void 0, r ? r.x : void 0),
    gm(e.y, t, l2, n ? n.y : void 0, r ? r.y : void 0);
}
function Sm(e) {
  return e.translate === 0 && e.scale === 1;
}
function f1(e) {
  return Sm(e.x) && Sm(e.y);
}
function u2(e, t) {
  return (
    e.x.min === t.x.min &&
    e.x.max === t.x.max &&
    e.y.min === t.y.min &&
    e.y.max === t.y.max
  );
}
function h1(e, t) {
  return (
    Math.round(e.x.min) === Math.round(t.x.min) &&
    Math.round(e.x.max) === Math.round(t.x.max) &&
    Math.round(e.y.min) === Math.round(t.y.min) &&
    Math.round(e.y.max) === Math.round(t.y.max)
  );
}
function wm(e) {
  return et(e.x) / et(e.y);
}
class c2 {
  constructor() {
    this.members = [];
  }
  add(t) {
    Mf(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (jf(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const s = this.members[i];
      if (s.isPresent !== !1) {
        r = s;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((t.snapshot = r.snapshot),
          (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function xm(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    s = e.y.translate / t.y,
    o = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || s || o) && (r = `translate3d(${i}px, ${s}px, ${o}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const {
      transformPerspective: u,
      rotate: c,
      rotateX: d,
      rotateY: f,
      skewX: g,
      skewY: m,
    } = n;
    u && (r = `perspective(${u}px) ${r}`),
      c && (r += `rotate(${c}deg) `),
      d && (r += `rotateX(${d}deg) `),
      f && (r += `rotateY(${f}deg) `),
      g && (r += `skewX(${g}deg) `),
      m && (r += `skewY(${m}deg) `);
  }
  const a = e.x.scale * t.x,
    l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none";
}
const d2 = (e, t) => e.depth - t.depth;
class f2 {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    Mf(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    jf(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(d2),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
function h2(e, t) {
  const n = Fn.now(),
    r = ({ timestamp: i }) => {
      const s = i - n;
      s >= t && (on(r), e(s - t));
    };
  return q.read(r, !0), () => on(r);
}
function p2(e) {
  window.MotionDebug && window.MotionDebug.record(e);
}
function m2(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
function y2(e, t, n) {
  const r = Ee(e) ? e : Pi(e);
  return r.start(Df("", r, t, n)), r.animation;
}
const gu = ["", "X", "Y", "Z"],
  g2 = { visibility: "hidden" },
  Pm = 1e3;
let v2 = 0;
const Jn = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0,
};
function vu(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function p1({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      (this.id = v2++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            (Jn.totalNodes =
              Jn.resolvedTargetDeltas =
              Jn.recalculatedProjection =
                0),
            this.nodes.forEach(x2),
            this.nodes.forEach(R2),
            this.nodes.forEach(k2),
            this.nodes.forEach(P2),
            p2(Jn);
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = o),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0);
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new f2());
    }
    addEventListener(o, a) {
      return (
        this.eventHandlers.has(o) || this.eventHandlers.set(o, new If()),
        this.eventHandlers.get(o).add(a)
      );
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    mount(o, a = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = m2(o)), (this.instance = o);
      const { layoutId: l, layout: u, visualElement: c } = this.options;
      if (
        (c && !c.current && c.mount(o),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        a && (u || l) && (this.isLayoutDirty = !0),
        e)
      ) {
        let d;
        const f = () => (this.root.updateBlockedByResize = !1);
        e(o, () => {
          (this.root.updateBlockedByResize = !0),
            d && d(),
            (d = h2(f, 250)),
            qo.hasAnimatedSinceResize &&
              ((qo.hasAnimatedSinceResize = !1), this.nodes.forEach(Em));
        });
      }
      l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          c &&
          (l || u) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: d,
              hasLayoutChanged: f,
              hasRelativeTargetChanged: g,
              layout: m,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const y =
                  this.options.transition || c.getDefaultTransition() || j2,
                { onLayoutAnimationStart: w, onLayoutAnimationComplete: p } =
                  c.getProps(),
                h = !this.targetLayout || !h1(this.targetLayout, m) || g,
                v = !f && g;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                v ||
                (f && (h || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(d, v);
                const x = { ...xf(y, "layout"), onPlay: w, onComplete: p };
                (c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((x.delay = 0), (x.type = !1)),
                  this.startAnimation(x);
              } else
                f || Em(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = m;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        on(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(_2),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const d = this.path[c];
        (d.shouldResetTransform = !0),
          d.updateScroll("snapshot"),
          d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l) return;
      const u = this.getTransformTemplate();
      (this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        o && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Cm);
        return;
      }
      this.isUpdating || this.nodes.forEach(E2),
        (this.isUpdating = !1),
        window.HandoffCancelAllAnimations &&
          window.HandoffCancelAllAnimations(),
        this.nodes.forEach(T2),
        this.nodes.forEach(S2),
        this.nodes.forEach(w2),
        this.clearAllSnapshots();
      const a = Fn.now();
      (Pe.delta = zn(0, 1e3 / 60, a - Pe.timestamp)),
        (Pe.timestamp = a),
        (Pe.isProcessing = !0),
        au.update.process(Pe),
        au.preRender.process(Pe),
        au.render.process(Pe),
        (Pe.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), lf.read(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(C2), this.sharedNodes.forEach(O2);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        q.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      q.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const o = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = he()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a &&
        a.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          o ? o.layoutBox : void 0
        );
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === o &&
        (a = !1),
        a &&
          (this.scroll = {
            animationId: this.root.animationId,
            phase: o,
            isRoot: r(this.instance),
            offset: n(this.instance),
          });
    }
    resetTransform() {
      if (!i) return;
      const o = this.isLayoutDirty || this.shouldResetTransform,
        a = this.projectionDelta && !f1(this.projectionDelta),
        l = this.getTransformTemplate(),
        u = l ? l(this.latestValues, "") : void 0,
        c = u !== this.prevTransformTemplateValue;
      o &&
        (a || Xn(this.latestValues) || c) &&
        (i(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return (
        o && (l = this.removeTransform(l)),
        I2(l),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: o } = this.options;
      if (!o) return he();
      const a = o.measureViewportBox(),
        { scroll: l } = this.root;
      return l && (mn(a.x, l.offset.x), mn(a.y, l.offset.y)), a;
    }
    removeElementScroll(o) {
      const a = he();
      it(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l],
          { scroll: c, options: d } = u;
        if (u !== this.root && c && d.layoutScroll) {
          if (c.isRoot) {
            it(a, o);
            const { scroll: f } = this.root;
            f && (mn(a.x, -f.offset.x), mn(a.y, -f.offset.y));
          }
          mn(a.x, c.offset.x), mn(a.y, c.offset.y);
        }
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const l = he();
      it(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          Hr(l, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Xn(c.latestValues) && Hr(l, c.latestValues);
      }
      return Xn(this.latestValues) && Hr(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = he();
      it(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !Xn(u.latestValues)) continue;
        Wc(u.latestValues) && u.updateSnapshot();
        const c = he(),
          d = u.measurePageBox();
        it(c, d),
          vm(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return Xn(this.latestValues) && vm(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      (this.targetDelta = o),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Pe.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var a;
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== l;
      if (
        !(
          o ||
          (u && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((a = this.parent) === null || a === void 0) &&
            a.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget
        )
      )
        return;
      const { layout: d, layoutId: f } = this.options;
      if (!(!this.layout || !(d || f))) {
        if (
          ((this.resolvedRelativeTargetAt = Pe.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const g = this.getClosestProjectingParent();
          g && g.layout && this.animationProgress !== 1
            ? ((this.relativeParent = g),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = he()),
              (this.relativeTargetOrigin = he()),
              as(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                g.layout.layoutBox
              ),
              it(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = he()), (this.targetWithTransforms = he())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                Lk(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target
                ))
              : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : it(this.target, this.layout.layoutBox),
                o1(this.target, this.targetDelta))
              : it(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const g = this.getClosestProjectingParent();
            g &&
            !!g.resumingFrom == !!this.resumingFrom &&
            !g.options.layoutScroll &&
            g.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = g),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = he()),
                (this.relativeTargetOrigin = he()),
                as(this.relativeTargetOrigin, this.target, g.target),
                it(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          Jn.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Wc(this.parent.latestValues) ||
          s1(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var o;
      const a = this.getLead(),
        l = !!this.resumingFrom || this !== a;
      let u = !0;
      if (
        ((this.isProjectionDirty ||
          (!((o = this.parent) === null || o === void 0) &&
            o.isProjectionDirty)) &&
          (u = !1),
        l &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (u = !1),
        this.resolvedRelativeTargetAt === Pe.timestamp && (u = !1),
        u)
      )
        return;
      const { layout: c, layoutId: d } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || d))
      )
        return;
      it(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x,
        g = this.treeScale.y;
      $k(this.layoutCorrected, this.treeScale, this.path, l),
        a.layout &&
          !a.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((a.target = a.layout.layoutBox), (a.targetWithTransforms = he()));
      const { target: m } = a;
      if (!m) {
        this.projectionTransform &&
          ((this.projectionDelta = $r()),
          (this.projectionTransform = "none"),
          this.scheduleRender());
        return;
      }
      this.projectionDelta ||
        ((this.projectionDelta = $r()),
        (this.projectionDeltaWithTransform = $r()));
      const y = this.projectionTransform;
      os(this.projectionDelta, this.layoutCorrected, m, this.latestValues),
        (this.projectionTransform = xm(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== y ||
          this.treeScale.x !== f ||
          this.treeScale.y !== g) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", m)),
        Jn.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      if ((this.options.scheduleRender && this.options.scheduleRender(), o)) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot,
        u = l ? l.latestValues : {},
        c = { ...this.latestValues },
        d = $r();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a);
      const f = he(),
        g = l ? l.source : void 0,
        m = this.layout ? this.layout.source : void 0,
        y = g !== m,
        w = this.getStack(),
        p = !w || w.members.length <= 1,
        h = !!(y && !p && this.options.crossfade === !0 && !this.path.some(M2));
      this.animationProgress = 0;
      let v;
      (this.mixTargetDelta = (x) => {
        const E = x / 1e3;
        Tm(d.x, o.x, E),
          Tm(d.y, o.y, E),
          this.setTargetDelta(d),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (as(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            D2(this.relativeTarget, this.relativeTargetOrigin, f, E),
            v && u2(this.relativeTarget, v) && (this.isProjectionDirty = !1),
            v || (v = he()),
            it(v, this.relativeTarget)),
          y &&
            ((this.animationValues = c), r2(c, u, this.latestValues, E, h, p)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = E);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (on(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = q.update(() => {
          (qo.hasAnimatedSinceResize = !0),
            (this.currentAnimation = y2(0, Pm, {
              ...o,
              onUpdate: (a) => {
                this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
              },
              onComplete: () => {
                o.onComplete && o.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const o = this.getStack();
      o && o.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Pm),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let {
        targetWithTransforms: a,
        target: l,
        layout: u,
        latestValues: c,
      } = o;
      if (!(!a || !l || !u)) {
        if (
          this !== o &&
          this.layout &&
          u &&
          m1(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          l = this.target || he();
          const d = et(this.layout.layoutBox.x);
          (l.x.min = o.target.x.min), (l.x.max = l.x.min + d);
          const f = et(this.layout.layoutBox.y);
          (l.y.min = o.target.y.min), (l.y.max = l.y.min + f);
        }
        it(a, l),
          Hr(a, c),
          os(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new c2()),
        this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity
            ? u.shouldPreserveFollowOpacity(a)
            : void 0,
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var o;
      const { layoutId: a } = this.options;
      return a
        ? ((o = this.getStack()) === null || o === void 0 ? void 0 : o.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var o;
      const { layoutId: a } = this.options;
      return a
        ? (o = this.getStack()) === null || o === void 0
          ? void 0
          : o.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o) return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l),
        o && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o) return;
      let a = !1;
      const { latestValues: l } = o;
      if (
        ((l.z ||
          l.rotate ||
          l.rotateX ||
          l.rotateY ||
          l.rotateZ ||
          l.skewX ||
          l.skewY) &&
          (a = !0),
        !a)
      )
        return;
      const u = {};
      l.z && vu("z", o, u, this.animationValues);
      for (let c = 0; c < gu.length; c++)
        vu(`rotate${gu[c]}`, o, u, this.animationValues),
          vu(`skew${gu[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]),
          this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    getProjectionStyles(o) {
      var a, l;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return g2;
      const u = { visibility: "" },
        c = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ""),
          (u.pointerEvents = Qo(o == null ? void 0 : o.pointerEvents) || ""),
          (u.transform = c ? c(this.latestValues, "") : "none"),
          u
        );
      const d = this.getLead();
      if (!this.projectionDelta || !this.layout || !d.target) {
        const y = {};
        return (
          this.options.layoutId &&
            ((y.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (y.pointerEvents = Qo(o == null ? void 0 : o.pointerEvents) || "")),
          this.hasProjected &&
            !Xn(this.latestValues) &&
            ((y.transform = c ? c({}, "") : "none"), (this.hasProjected = !1)),
          y
        );
      }
      const f = d.animationValues || d.latestValues;
      this.applyTransformsToTarget(),
        (u.transform = xm(
          this.projectionDeltaWithTransform,
          this.treeScale,
          f
        )),
        c && (u.transform = c(f, u.transform));
      const { x: g, y: m } = this.projectionDelta;
      (u.transformOrigin = `${g.origin * 100}% ${m.origin * 100}% 0`),
        d.animationValues
          ? (u.opacity =
              d === this
                ? (l =
                    (a = f.opacity) !== null && a !== void 0
                      ? a
                      : this.latestValues.opacity) !== null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : f.opacityExit)
          : (u.opacity =
              d === this
                ? f.opacity !== void 0
                  ? f.opacity
                  : ""
                : f.opacityExit !== void 0
                ? f.opacityExit
                : 0);
      for (const y in Ra) {
        if (f[y] === void 0) continue;
        const { correct: w, applyTo: p } = Ra[y],
          h = u.transform === "none" ? f[y] : w(f[y], d);
        if (p) {
          const v = p.length;
          for (let x = 0; x < v; x++) u[p[x]] = h;
        } else u[y] = h;
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents =
            d === this
              ? Qo(o == null ? void 0 : o.pointerEvents) || ""
              : "none"),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) === null || a === void 0
          ? void 0
          : a.stop();
      }),
        this.root.nodes.forEach(Cm),
        this.root.sharedNodes.clear();
    }
  };
}
function S2(e) {
  e.updateLayout();
}
function w2(e) {
  var t;
  const n =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: s } = e.options,
      o = n.source !== e.layout.source;
    s === "size"
      ? st((d) => {
          const f = o ? n.measuredBox[d] : n.layoutBox[d],
            g = et(f);
          (f.min = r[d].min), (f.max = f.min + g);
        })
      : m1(s, n.layoutBox, r) &&
        st((d) => {
          const f = o ? n.measuredBox[d] : n.layoutBox[d],
            g = et(r[d]);
          (f.max = f.min + g),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[d].max = e.relativeTarget[d].min + g));
        });
    const a = $r();
    os(a, r, n.layoutBox);
    const l = $r();
    o ? os(l, e.applyTransform(i, !0), n.measuredBox) : os(l, r, n.layoutBox);
    const u = !f1(a);
    let c = !1;
    if (!e.resumeFrom) {
      const d = e.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: f, layout: g } = d;
        if (f && g) {
          const m = he();
          as(m, n.layoutBox, f.layoutBox);
          const y = he();
          as(y, r, g.layoutBox),
            h1(m, y) || (c = !0),
            d.options.layoutRoot &&
              ((e.relativeTarget = y),
              (e.relativeTargetOrigin = m),
              (e.relativeParent = d));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: c,
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function x2(e) {
  Jn.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function P2(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function C2(e) {
  e.clearSnapshot();
}
function Cm(e) {
  e.clearMeasurements();
}
function E2(e) {
  e.isLayoutDirty = !1;
}
function T2(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform();
}
function Em(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function R2(e) {
  e.resolveTargetDelta();
}
function k2(e) {
  e.calcProjection();
}
function _2(e) {
  e.resetSkewAndRotation();
}
function O2(e) {
  e.removeLeadSnapshot();
}
function Tm(e, t, n) {
  (e.translate = re(t.translate, 0, n)),
    (e.scale = re(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function Rm(e, t, n, r) {
  (e.min = re(t.min, n.min, r)), (e.max = re(t.max, n.max, r));
}
function D2(e, t, n, r) {
  Rm(e.x, t.x, n.x, r), Rm(e.y, t.y, n.y, r);
}
function M2(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const j2 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  km = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  _m = km("applewebkit/") && !km("chrome/") ? Math.round : Ie;
function Om(e) {
  (e.min = _m(e.min)), (e.max = _m(e.max));
}
function I2(e) {
  Om(e.x), Om(e.y);
}
function m1(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !Hc(wm(t), wm(n), 0.2))
  );
}
const L2 = p1({
    attachResizeListener: (e, t) => qt(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Su = { current: void 0 },
  y1 = p1({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Su.current) {
        const e = new L2({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (Su.current = e);
      }
      return Su.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  A2 = {
    pan: { Feature: Xk },
    drag: { Feature: Yk, ProjectionNode: y1, MeasureLayout: u1 },
  },
  Gc = { current: null },
  g1 = { current: !1 };
function N2() {
  if (((g1.current = !0), !!of))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (Gc.current = e.matches);
      e.addListener(t), t();
    } else Gc.current = !1;
}
function F2(e, t, n) {
  const { willChange: r } = t;
  for (const i in t) {
    const s = t[i],
      o = n[i];
    if (Ee(s)) e.addValue(i, s), Ma(r) && r.add(i);
    else if (Ee(o)) e.addValue(i, Pi(s, { owner: e })), Ma(r) && r.remove(i);
    else if (o !== s)
      if (e.hasValue(i)) {
        const a = e.getValue(i);
        a.liveStyle === !0 ? a.jump(s) : a.hasAnimated || a.set(s);
      } else {
        const a = e.getStaticValue(i);
        e.addValue(i, Pi(a !== void 0 ? a : s, { owner: e }));
      }
  }
  for (const i in n) t[i] === void 0 && e.removeValue(i);
  return t;
}
const Dm = new WeakMap(),
  V2 = [...O0, De, Un],
  b2 = (e) => V2.find(_0(e)),
  v1 = Object.keys(Ms),
  B2 = v1.length,
  Mm = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ],
  z2 = cf.length;
function S1(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : S1(e.parent);
}
class U2 {
  scrapeMotionValuesFromProps(t, n, r) {
    return {};
  }
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: r,
      reducedMotionConfig: i,
      blockInitialAnimation: s,
      visualState: o,
    },
    a = {}
  ) {
    (this.resolveKeyframes = (f, g, m, y) =>
      new this.KeyframeResolver(f, g, m, y, this)),
      (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Pf),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.scheduleRender = () => q.render(this.render, !1, !0));
    const { latestValues: l, renderState: u } = o;
    (this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = n.initial ? { ...l } : {}),
      (this.renderState = u),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!s),
      (this.isControllingVariants = pl(n)),
      (this.isVariantNode = i0(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: c, ...d } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this
    );
    for (const f in d) {
      const g = d[f];
      l[f] !== void 0 && Ee(g) && (g.set(l[f], !1), Ma(c) && c.add(f));
    }
  }
  mount(t) {
    (this.current = t),
      Dm.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      g1.current || N2(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : Gc.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    Dm.delete(this.current),
      this.projection && this.projection.unmount(),
      on(this.notifyUpdate),
      on(this.render),
      this.valueSubscriptions.forEach((n) => n()),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const n in this.events) this.events[n].clear();
    for (const n in this.features)
      (t = this.features[n]) === null || t === void 0 || t.unmount();
    this.current = null;
  }
  bindToMotionValue(t, n) {
    const r = Er.has(t),
      i = n.on("change", (o) => {
        (this.latestValues[t] = o),
          this.props.onUpdate && q.preRender(this.notifyUpdate),
          r && this.projection && (this.projection.isTransformDirty = !0);
      }),
      s = n.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(t, () => {
      i(), s(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  loadFeatures({ children: t, ...n }, r, i, s) {
    let o, a;
    for (let l = 0; l < B2; l++) {
      const u = v1[l],
        {
          isEnabled: c,
          Feature: d,
          ProjectionNode: f,
          MeasureLayout: g,
        } = Ms[u];
      f && (o = f),
        c(n) &&
          (!this.features[u] && d && (this.features[u] = new d(this)),
          g && (a = g));
    }
    if (
      (this.type === "html" || this.type === "svg") &&
      !this.projection &&
      o
    ) {
      this.projection = new o(this.latestValues, S1(this.parent));
      const {
        layoutId: l,
        layout: u,
        drag: c,
        dragConstraints: d,
        layoutScroll: f,
        layoutRoot: g,
      } = n;
      this.projection.setOptions({
        layoutId: l,
        layout: u,
        alwaysMeasureLayout: !!c || (d && zr(d)),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        animationType: typeof u == "string" ? u : "both",
        initialPromotionConfig: s,
        layoutScroll: f,
        layoutRoot: g,
      });
    }
    return a;
  }
  updateFeatures() {
    for (const t in this.features) {
      const n = this.features[t];
      n.isMounted ? n.update() : (n.mount(), (n.isMounted = !0));
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : he();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let r = 0; r < Mm.length; r++) {
      const i = Mm[r];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const s = "on" + i,
        o = t[s];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    (this.prevMotionValues = F2(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  getVariantContext(t = !1) {
    if (t) return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const r = this.parent ? this.parent.getVariantContext() || {} : {};
      return (
        this.props.initial !== void 0 && (r.initial = this.props.initial), r
      );
    }
    const n = {};
    for (let r = 0; r < z2; r++) {
      const i = cf[r],
        s = this.props[i];
      (Ds(s) || s === !1) && (n[i] = s);
    }
    return n;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r &&
      (r && this.removeValue(t),
      this.bindToMotionValue(t, n),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = Pi(n === null ? void 0 : n, { owner: this })),
        this.addValue(t, r)),
      r
    );
  }
  readValue(t, n) {
    var r;
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (r = this.getBaseTargetFromProps(this.props, t)) !== null &&
          r !== void 0
        ? r
        : this.readValueFromInstance(this.current, t, this.options);
    return (
      i != null &&
        (typeof i == "string" && (R0(i) || E0(i))
          ? (i = parseFloat(i))
          : !b2(i) && Un.test(n) && (i = F0(t, n)),
        this.setBaseTarget(t, Ee(i) ? i.get() : i)),
      Ee(i) ? i.get() : i
    );
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var n;
    const { initial: r } = this.props;
    let i;
    if (typeof r == "string" || typeof r == "object") {
      const o = wf(
        this.props,
        r,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom
      );
      o && (i = o[t]);
    }
    if (r && i !== void 0) return i;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !Ee(s)
      ? s
      : this.initialValues[t] !== void 0 && i === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new If()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class w1 extends U2 {
  constructor() {
    super(...arguments), (this.KeyframeResolver = V0);
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
}
function $2(e) {
  return window.getComputedStyle(e);
}
class H2 extends w1 {
  constructor() {
    super(...arguments), (this.type = "html");
  }
  readValueFromInstance(t, n) {
    if (Er.has(n)) {
      const r = Ef(n);
      return (r && r.default) || 0;
    } else {
      const r = $2(t),
        i = (l0(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return a1(t, n);
  }
  build(t, n, r, i) {
    mf(t, n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return Sf(t, n, r);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Ee(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
  renderInstance(t, n, r, i) {
    h0(t, n, r, i);
  }
}
class K2 extends w1 {
  constructor() {
    super(...arguments), (this.type = "svg"), (this.isSVGTag = !1);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Er.has(n)) {
      const r = Ef(n);
      return (r && r.default) || 0;
    }
    return (n = p0.has(n) ? n : af(n)), t.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return he();
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return y0(t, n, r);
  }
  build(t, n, r, i) {
    gf(t, n, r, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    m0(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = vf(t.tagName)), super.mount(t);
  }
}
const W2 = (e, t) =>
    ff(e)
      ? new K2(t, { enableHardwareAcceleration: !1 })
      : new H2(t, {
          allowProjection: e !== T.Fragment,
          enableHardwareAcceleration: !0,
        }),
  Q2 = { layout: { ProjectionNode: y1, MeasureLayout: u1 } },
  G2 = { ...Dk, ...bT, ...A2, ...Q2 },
  io = qE((e, t) => RT(e, t, G2, W2));
function x1() {
  const e = T.useRef(!1);
  return (
    fl(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      []
    ),
    e
  );
}
function q2() {
  const e = x1(),
    [t, n] = T.useState(0),
    r = T.useCallback(() => {
      e.current && n(t + 1);
    }, [t]);
  return [T.useCallback(() => q.postRender(r), [r]), t];
}
class Y2 extends T.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const r = this.props.sizeRef.current;
      (r.height = n.offsetHeight || 0),
        (r.width = n.offsetWidth || 0),
        (r.top = n.offsetTop),
        (r.left = n.offsetLeft);
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function X2({ children: e, isPresent: t }) {
  const n = T.useId(),
    r = T.useRef(null),
    i = T.useRef({ width: 0, height: 0, top: 0, left: 0 }),
    { nonce: s } = T.useContext(ul);
  return (
    T.useInsertionEffect(() => {
      const { width: o, height: a, top: l, left: u } = i.current;
      if (t || !r.current || !o || !a) return;
      r.current.dataset.motionPopId = n;
      const c = document.createElement("style");
      return (
        s && (c.nonce = s),
        document.head.appendChild(c),
        c.sheet &&
          c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${o}px !important;
            height: ${a}px !important;
            top: ${l}px !important;
            left: ${u}px !important;
          }
        `),
        () => {
          document.head.removeChild(c);
        }
      );
    }, [t]),
    S.jsx(Y2, {
      isPresent: t,
      childRef: r,
      sizeRef: i,
      children: T.cloneElement(e, { ref: r }),
    })
  );
}
const wu = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: s,
  mode: o,
}) => {
  const a = Tr(J2),
    l = T.useId(),
    u = T.useMemo(
      () => ({
        id: l,
        initial: t,
        isPresent: n,
        custom: i,
        onExitComplete: (c) => {
          a.set(c, !0);
          for (const d of a.values()) if (!d) return;
          r && r();
        },
        register: (c) => (a.set(c, !1), () => a.delete(c)),
      }),
      s ? [Math.random()] : [n]
    );
  return (
    T.useMemo(() => {
      a.forEach((c, d) => a.set(d, !1));
    }, [n]),
    T.useEffect(() => {
      !n && !a.size && r && r();
    }, [n]),
    o === "popLayout" && (e = S.jsx(X2, { isPresent: n, children: e })),
    S.jsx(dl.Provider, { value: u, children: e })
  );
};
function J2() {
  return new Map();
}
function Z2(e) {
  return T.useEffect(() => () => e(), []);
}
const Zn = (e) => e.key || "";
function e_(e, t) {
  e.forEach((n) => {
    const r = Zn(n);
    t.set(r, n);
  });
}
function t_(e) {
  const t = [];
  return (
    T.Children.forEach(e, (n) => {
      T.isValidElement(n) && t.push(n);
    }),
    t
  );
}
const n_ = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    exitBeforeEnter: i,
    presenceAffectsLayout: s = !0,
    mode: o = "sync",
  }) => {
    const a = T.useContext(df).forceRender || q2()[0],
      l = x1(),
      u = t_(e);
    let c = u;
    const d = T.useRef(new Map()).current,
      f = T.useRef(c),
      g = T.useRef(new Map()).current,
      m = T.useRef(!0);
    if (
      (fl(() => {
        (m.current = !1), e_(u, g), (f.current = c);
      }),
      Z2(() => {
        (m.current = !0), g.clear(), d.clear();
      }),
      m.current)
    )
      return S.jsx(S.Fragment, {
        children: c.map((h) =>
          S.jsx(
            wu,
            {
              isPresent: !0,
              initial: n ? void 0 : !1,
              presenceAffectsLayout: s,
              mode: o,
              children: h,
            },
            Zn(h)
          )
        ),
      });
    c = [...c];
    const y = f.current.map(Zn),
      w = u.map(Zn),
      p = y.length;
    for (let h = 0; h < p; h++) {
      const v = y[h];
      w.indexOf(v) === -1 && !d.has(v) && d.set(v, void 0);
    }
    return (
      o === "wait" && d.size && (c = []),
      d.forEach((h, v) => {
        if (w.indexOf(v) !== -1) return;
        const x = g.get(v);
        if (!x) return;
        const E = y.indexOf(v);
        let k = h;
        if (!k) {
          const _ = () => {
            d.delete(v);
            const C = Array.from(g.keys()).filter((M) => !w.includes(M));
            if (
              (C.forEach((M) => g.delete(M)),
              (f.current = u.filter((M) => {
                const I = Zn(M);
                return I === v || C.includes(I);
              })),
              !d.size)
            ) {
              if (l.current === !1) return;
              a(), r && r();
            }
          };
          (k = S.jsx(
            wu,
            {
              isPresent: !1,
              onExitComplete: _,
              custom: t,
              presenceAffectsLayout: s,
              mode: o,
              children: x,
            },
            Zn(x)
          )),
            d.set(v, k);
        }
        c.splice(E, 0, k);
      }),
      (c = c.map((h) => {
        const v = h.key;
        return d.has(v)
          ? h
          : S.jsx(
              wu,
              { isPresent: !0, presenceAffectsLayout: s, mode: o, children: h },
              Zn(h)
            );
      })),
      S.jsx(S.Fragment, {
        children: d.size ? c : c.map((h) => T.cloneElement(h)),
      })
    );
  },
  P1 = T.createContext(null);
function r_(e, t, n, r) {
  if (!r) return e;
  const i = e.findIndex((c) => c.value === t);
  if (i === -1) return e;
  const s = r > 0 ? 1 : -1,
    o = e[i + s];
  if (!o) return e;
  const a = e[i],
    l = o.layout,
    u = re(l.min, l.max, 0.5);
  return (s === 1 && a.layout.max + n > u) || (s === -1 && a.layout.min + n < u)
    ? fk(e, i, i + s)
    : e;
}
function i_(
  { children: e, as: t = "ul", axis: n = "y", onReorder: r, values: i, ...s },
  o
) {
  const a = Tr(() => io(t)),
    l = [],
    u = T.useRef(!1),
    c = {
      axis: n,
      registerItem: (d, f) => {
        const g = l.findIndex((m) => d === m.value);
        g !== -1 ? (l[g].layout = f[n]) : l.push({ value: d, layout: f[n] }),
          l.sort(a_);
      },
      updateOrder: (d, f, g) => {
        if (u.current) return;
        const m = r_(l, d, f, g);
        l !== m &&
          ((u.current = !0), r(m.map(o_).filter((y) => i.indexOf(y) !== -1)));
      },
    };
  return (
    T.useEffect(() => {
      u.current = !1;
    }),
    S.jsx(a, {
      ...s,
      ref: o,
      ignoreStrict: !0,
      children: S.jsx(P1.Provider, { value: c, children: e }),
    })
  );
}
const s_ = T.forwardRef(i_);
function o_(e) {
  return e.value;
}
function a_(e, t) {
  return e.layout.min - t.layout.min;
}
function C1(e) {
  const t = Tr(() => Pi(e)),
    { isStatic: n } = T.useContext(ul);
  if (n) {
    const [, r] = T.useState(e);
    T.useEffect(() => t.on("change", r), []);
  }
  return t;
}
const l_ = (e) => e && typeof e == "object" && e.mix,
  u_ = (e) => (l_(e) ? e.mix : void 0);
function c_(...e) {
  const t = !Array.isArray(e[0]),
    n = t ? 0 : -1,
    r = e[0 + n],
    i = e[1 + n],
    s = e[2 + n],
    o = e[3 + n],
    a = X0(i, s, { mixer: u_(s[0]), ...o });
  return t ? a(r) : a;
}
function E1(e, t) {
  const n = C1(t()),
    r = () => n.set(t());
  return (
    r(),
    fl(() => {
      const i = () => q.preRender(r, !1, !0),
        s = e.map((o) => o.on("change", i));
      return () => {
        s.forEach((o) => o()), on(r);
      };
    }),
    n
  );
}
function d_(e) {
  (ss.current = []), e();
  const t = E1(ss.current, e);
  return (ss.current = void 0), t;
}
function f_(e, t, n, r) {
  if (typeof e == "function") return d_(e);
  const i = typeof t == "function" ? t : c_(t, n, r);
  return Array.isArray(e) ? jm(e, i) : jm([e], ([s]) => i(s));
}
function jm(e, t) {
  const n = Tr(() => []);
  return E1(e, () => {
    n.length = 0;
    const r = e.length;
    for (let i = 0; i < r; i++) n[i] = e[i].get();
    return t(n);
  });
}
function Im(e, t = 0) {
  return Ee(e) ? e : C1(t);
}
function h_(
  {
    children: e,
    style: t = {},
    value: n,
    as: r = "li",
    onDrag: i,
    layout: s = !0,
    ...o
  },
  a
) {
  const l = Tr(() => io(r)),
    u = T.useContext(P1),
    c = { x: Im(t.x), y: Im(t.y) },
    d = f_([c.x, c.y], ([y, w]) => (y || w ? 1 : "unset")),
    { axis: f, registerItem: g, updateOrder: m } = u;
  return S.jsx(l, {
    drag: f,
    ...o,
    dragSnapToOrigin: !0,
    style: { ...t, x: c.x, y: c.y, zIndex: d },
    layout: s,
    onDrag: (y, w) => {
      const { velocity: p } = w;
      p[f] && m(n, c[f].get(), p[f]), i && i(y, w);
    },
    onLayoutMeasure: (y) => g(n, y),
    ref: a,
    ignoreStrict: !0,
    children: e,
  });
}
const p_ = T.forwardRef(h_),
  vl = { Group: s_, Item: p_ };
class m_ {
  constructor() {
    this.componentControls = new Set();
  }
  subscribe(t) {
    return (
      this.componentControls.add(t), () => this.componentControls.delete(t)
    );
  }
  start(t, n) {
    this.componentControls.forEach((r) => {
      r.start(t.nativeEvent || t, n);
    });
  }
}
const y_ = () => new m_();
function T1() {
  return Tr(y_);
}
function xu(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function g_(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function v_(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function Sl(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z",
        },
        child: [],
      },
    ],
  })(e);
}
function Lf(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function S_(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function w_(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function x_(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function R1(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
    child: [
      {
        tag: "path",
        attr: {
          fillRule: "evenodd",
          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
          clipRule: "evenodd",
        },
        child: [],
      },
    ],
  })(e);
}
function P_(e) {
  return rt({
    tag: "svg",
    attr: {
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      "aria-hidden": "true",
    },
    child: [
      {
        tag: "path",
        attr: {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
        },
        child: [],
      },
    ],
  })(e);
}
function k1(e) {
  return rt({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
        },
        child: [],
      },
    ],
  })(e);
}
const C_ = () => {
    var s;
    const e = al(),
      t = Bt(),
      n =
        (s = t.catalog) == null
          ? void 0
          : s.Sections.find((o) => o.ID === e.section_editing),
      r =
        (n == null
          ? void 0
          : n.itemOffers.sort(
              (o, a) => o.Meta.PriorityShop - a.Meta.PriorityShop
            )) || [],
      i = (o) => {
        const a = o.map((c, d) => ((c.Meta.PriorityShop = d + 1), c)),
          l = { ...n, Offers: a },
          u = {
            ...t.catalog,
            Sections: t.catalog.Sections.map((c) => (c.ID === l.ID ? l : c)),
          };
        t.setCatalog(u);
      };
    return n
      ? S.jsxs(
          io.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 },
            className: "shopModal",
            children: [
              S.jsxs("header", {
                className: "shopModalHeader",
                children: [
                  S.jsxs("div", {
                    className: "info",
                    children: [
                      S.jsx("h2", { children: "Edit Section" }),
                      S.jsxs("p", {
                        children: ["Editing ", n.Name, " ", n.ID],
                      }),
                    ],
                  }),
                  S.jsx("button", {
                    onClick: () => e.close(),
                    children: S.jsx(R1, {}),
                  }),
                ],
              }),
              S.jsx("h4", { children: "Offers" }),
              S.jsxs(vl.Group, {
                axis: "y",
                values: r,
                onReorder: i,
                className: "shopModalSectionOffers",
                children: [
                  r.map((o) => S.jsx(E_, { offer: o }, o.ID)),
                  S.jsx("button", {
                    className: "shopModalSectionOffer empty",
                    onClick: () => {
                      t.add_new_offer(
                        n.ID,
                        n.Name === "BRWeeklyStorefront" ? "Featured" : "Daily"
                      );
                    },
                    children: S.jsx(Lf, {}),
                  }),
                ],
              }),
            ],
          },
          "modal"
        )
      : S.jsx("div", { className: "shopModal" });
  },
  E_ = (e) => {
    var o, a;
    const t = T1(),
      [n] = al((l) => [l.close]),
      [r] = ll((l) => [l.edit]),
      i = e.offer.Rewards.map((l) => `${l.Quantity}x ${l.Template}`).join(", "),
      { data: s } = Zs({
        queryKey: [
          "shop",
          ((o = e.offer.Rewards[0]) == null ? void 0 : o.Template) || "",
        ],
        queryFn: () => {
          var l;
          return sl(
            ((l = e.offer.Rewards[0]) == null ? void 0 : l.Template) || ""
          );
        },
      });
    return S.jsxs(
      vl.Item,
      {
        value: e.offer,
        dragListener: !1,
        dragControls: t,
        className: "shopModalSectionOffer",
        children: [
          S.jsx("div", {
            className: `preview ${
              s == null ? void 0 : s.rarity.backendValue.split("::")[1]
            }`,
            children: S.jsx("img", {
              src: `https://fortnite-api.com/images/cosmetics/br/${
                ((a = e.offer.Rewards[0]) == null ? void 0 : a.Template) || ""
              }/icon.png`,
              alt: "",
            }),
          }),
          S.jsxs("div", {
            className: "information",
            children: [
              S.jsx("h3", { children: i }),
              S.jsxs("p", {
                children: [
                  s == null ? void 0 : s.rarity.displayValue,
                  " offer for",
                  " ",
                  e.offer.Price.FinalPrice,
                  " V-Bucks.",
                ],
              }),
            ],
          }),
          S.jsxs("div", {
            className: "actions",
            children: [
              S.jsx("button", {
                className: "drag",
                onPointerDown: (l) => t.start(l),
                children: S.jsx(k1, {}),
              }),
              S.jsx("button", {
                onClick: () => {
                  r(e.offer.ID), n();
                },
                children: S.jsx(Sl, {}),
              }),
            ],
          }),
        ],
      },
      e.offer.ID
    );
  },
  T_ = (e, t) => {
    const [n, r] = T.useState(null);
    return (
      T.useEffect(() => {
        e.then((i) => r(i));
      }, t),
      n
    );
  };
function R_(e) {
  return rt({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M3 10l2 -2v8" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5",
        },
        child: [],
      },
    ],
  })(e);
}
const k_ = (e) => {
    const t = T.useRef(null),
      [n, r] = T.useState(""),
      [i, s] = T.useState([]),
      o = (u) => {
        e.found(u);
      },
      a = async (u) => {
        u.preventDefault(), r(u.target.value);
        const c = await zC(u.target.value);
        s(c);
      };
    T.useEffect(() => {
      if (t.current) {
        setTimeout(() => {
          var c;
          document.body.focus(), (c = t.current) == null || c.focus();
        }, 0);
        var u = t.current.value.length;
        setTimeout(() => {
          var c;
          (c = t.current) == null || c.setSelectionRange(u, u);
        }, 0);
      }
    }, [t.current]);
    const l = (u) => {
      u.key === "Escape" && e.hide();
    };
    return (
      T.useEffect(
        () => (
          document.addEventListener("keydown", l),
          () => {
            document.removeEventListener("keydown", l);
          }
        ),
        []
      ),
      S.jsxs(io.div, {
        initial: { opacity: 0, scale: 0.9, left: "0.5rem" },
        animate: { opacity: 1, scale: 1, left: "0.5rem" },
        exit: { opacity: 0, scale: 0.9, left: "0.5rem" },
        className: "itemSearch",
        children: [
          S.jsx("input", {
            ref: t,
            type: "text",
            className: "searchKeys",
            placeholder: "Name, Set, Type...",
            value: n,
            onChange: a,
          }),
          i.length > 0 &&
            S.jsx("div", {
              className: "results",
              children: i.map((u) =>
                S.jsx(__, { result: u, add: () => o(u) }, u.id)
              ),
            }),
        ],
      })
    );
  },
  __ = (e) => {
    var r, i;
    const t = Pr((s) => s.retrac_items),
      n = () => {
        const s = t[e.result.id];
        return s && s.images && s.images.icon
          ? s.images.icon
          : "https://images-ext-1.discordapp.net/external/SjPyXyT8PSH89j4m1TfcnnmoKWGS6bq9jHe4H5YH8wI/%3Fsize%3D4096/https/cdn.discordapp.com/icons/1175919536839610512/717699b2d0405acce0c4645662997f58.png?format=webp&quality=lossless";
      };
    return S.jsxs("div", {
      className: "result",
      onClick: e.add,
      children: [
        S.jsx("div", {
          className: `preview ${e.result.rarity.backendValue.split("::")[1]}`,
          children: S.jsx("img", { src: n(), alt: "" }),
        }),
        S.jsxs("div", {
          className: "information",
          children: [
            S.jsx("h3", { children: e.result.name }),
            S.jsx("p", { children: e.result.description }),
          ],
        }),
        S.jsxs("div", {
          className: "extra",
          children: [
            e.result.set &&
              e.result.set.value != "" &&
              S.jsxs("span", {
                className: `set ${e.result.rarity.backendValue.split("::")[1]}`,
                children: [
                  (r = e.result.set) == null ? void 0 : r.value,
                  " Set",
                ],
              }),
            e.result.type.value &&
              S.jsx("span", {
                className: `set ${e.result.rarity.backendValue.split("::")[1]}`,
                children: (i = e.result.type) == null ? void 0 : i.value,
              }),
          ],
        }),
      ],
    });
  },
  Lm = (e) => {
    const [t, n] = T.useState(!1);
    return S.jsxs("div", {
      className: "dropdown",
      children: [
        S.jsxs("button", {
          onClick: () => n(!t),
          children: [e.currentOption, " ", S.jsx("span", { children: "▼" })],
        }),
        t &&
          S.jsx("div", {
            className: "dropdown-content",
            children: e.options.map((r) =>
              S.jsx(
                "button",
                {
                  onClick: () => {
                    e.setOption(r), n(!1);
                  },
                  children: r,
                },
                r
              )
            ),
          }),
      ],
    });
  },
  O_ = () => {
    var l, u, c, d;
    const e = ll(),
      t = Bt(),
      [n, r] = T.useState(!1),
      i =
        (l = t.catalog) == null
          ? void 0
          : l.Sections.flatMap((f) => f.itemOffers).find(
              (f) => f.ID === e.offer_editing
            ),
      s = () => {
        var f;
        return (
          ((f = i == null ? void 0 : i.Rewards) == null
            ? void 0
            : f.map(async (g) => {
                const m = await sl(g.Template);
                return `${g.Quantity}x ${m.name}`;
              })) || []
        );
      },
      o =
        ((u = T_(Promise.all(s()), [i])) == null ? void 0 : u.join(", ")) ||
        "Offer",
      a = (f) => {
        var h;
        const g =
            (h = t.catalog) == null
              ? void 0
              : h.Sections.find(
                  (v) => v.ID === (i == null ? void 0 : i.ShopSectionID)
                ),
          m = { ...i, Rewards: f },
          y =
            g == null
              ? void 0
              : g.itemOffers.map((v) => (v.ID === m.ID ? m : v)),
          w = { ...g, itemOffers: y || [] },
          p = {
            ...t.catalog,
            Sections: t.catalog.Sections.map((v) => (v.ID === w.ID ? w : v)),
          };
        t.setCatalog(p);
      };
    return (
      i || e.close(),
      S.jsxs(
        io.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          className: "shopModal",
          children: [
            S.jsxs("header", {
              className: "shopModalHeader",
              children: [
                S.jsxs("div", {
                  className: "info",
                  children: [
                    S.jsx("h2", { children: "Edit Offer" }),
                    S.jsxs("p", {
                      children: [
                        "Editing ",
                        o,
                        " for",
                        " ",
                        ((c = i == null ? void 0 : i.Price) == null
                          ? void 0
                          : c.FinalPrice.toLocaleString()) || "0",
                        " V-Bucks",
                      ],
                    }),
                  ],
                }),
                S.jsx("button", {
                  onClick: () => e.close(),
                  children: S.jsx(R1, {}),
                }),
              ],
            }),
            S.jsx("h4", { children: "Grants" }),
            S.jsxs(vl.Group, {
              axis: "y",
              values: (i == null ? void 0 : i.Rewards) || [],
              onReorder: a,
              className: "shopModalSectionOffers",
              children: [
                ((i == null ? void 0 : i.Rewards) || []).map((f) =>
                  S.jsx(D_, { reward: f }, f.ID)
                ),
                S.jsxs("div", {
                  className: "options-control",
                  children: [
                    S.jsx("button", {
                      className: "shopModalSectionOffer empty",
                      style: { height: "2.85rem" },
                      onClick: () => {
                        t.add_new_reward(i.ID);
                      },
                      children: S.jsx(Lf, {}),
                    }),
                    S.jsx("button", {
                      className: "shopModalSectionOffer empty small",
                      style: { height: "2.85rem" },
                      onClick: () => r(!0),
                      children: S.jsx(w_, {}),
                    }),
                    n &&
                      S.jsx(k_, {
                        hide: () => r(!1),
                        found: (f) => {
                          t.add_new_reward_from_api(i.ID, f), r(!1);
                        },
                      }),
                  ],
                }),
              ],
            }),
            S.jsx("h4", { children: "OPTIONS" }),
            S.jsx(M_, {
              offer: i,
              section:
                (d = t.catalog) == null
                  ? void 0
                  : d.Sections.find(
                      (f) => f.ID === (i == null ? void 0 : i.ShopSectionID)
                    ),
            }),
          ],
        },
        "modal"
      )
    );
  },
  D_ = (e) => {
    const t = Pr((w) => w.retrac_items),
      n = T1(),
      r = Bt(),
      { data: i } = Zs({
        queryKey: ["shop", e.reward.Template || ""],
        queryFn: () => sl(e.reward.Template),
      }),
      [s, o] = T.useState(!1),
      a = T.useRef(null),
      [l, u] = T.useState(!1),
      c = T.useRef(null);
    T.useEffect(() => {
      a.current &&
        (a.current.focus(),
        a.current.innerText === "" &&
          (a.current.innerHTML = e.reward.Quantity.toString()));
    }, [a]);
    const d = (w) => {
        var h;
        if (w.key !== "Enter") return;
        const p = parseInt(
          ((h = a.current) == null ? void 0 : h.innerText) || "0"
        );
        r.set_reward_quantity(e.reward.ID, p), o(!1);
      },
      f = T.useCallback(() => {
        for (o(!0); !a.current; ) setTimeout(() => {}, 200);
        (a.current.innerHTML = e.reward.Quantity.toString()),
          setTimeout(() => {
            var h;
            document.body.focus(),
              (h = a == null ? void 0 : a.current) == null || h.focus();
          }, 0);
        const w = document.createRange(),
          p = window.getSelection();
        w.selectNodeContents(a.current),
          p == null || p.removeAllRanges(),
          p == null || p.addRange(w);
      }, [a]),
      g = T.useCallback(() => {
        if ((u(!0), !c.current)) return;
        (c.current.innerHTML = e.reward.BackendValue + ":" + e.reward.Template),
          setTimeout(() => {
            var h;
            document.body.focus(),
              (h = c == null ? void 0 : c.current) == null || h.focus();
          }, 0);
        const w = document.createRange(),
          p = window.getSelection();
        w.selectNodeContents(c.current),
          p == null || p.removeAllRanges(),
          p == null || p.addRange(w);
      }, [c]),
      m = (w) => {
        var v;
        if (w.key !== "Enter") return;
        const [p, h] = ((v = c.current) == null
          ? void 0
          : v.innerText.split(":").map((x) => x.trim())) || ["", ""];
        r.set_reward_any(e.reward.ID, "BackendValue", p),
          r.set_reward_any(e.reward.ID, "Template", h),
          u(!1);
      },
      y = () => {
        const w = t[e.reward.Template];
        return w && w.images && w.images.icon
          ? w.images.icon
          : "https://images-ext-1.discordapp.net/external/SjPyXyT8PSH89j4m1TfcnnmoKWGS6bq9jHe4H5YH8wI/%3Fsize%3D4096/https/cdn.discordapp.com/icons/1175919536839610512/717699b2d0405acce0c4645662997f58.png?format=webp&quality=lossless";
      };
    return S.jsxs(
      vl.Item,
      {
        value: e.reward,
        dragListener: !1,
        dragControls: n,
        className: "shopModalSectionOffer smol",
        children: [
          S.jsx("div", {
            className: `preview ${
              i == null ? void 0 : i.rarity.backendValue.split("::")[1]
            }`,
            children: S.jsx("img", { src: y(), alt: "" }),
          }),
          S.jsxs("div", {
            className: "information",
            children: [
              S.jsxs("h3", {
                children: [
                  e.reward.Quantity,
                  "x ",
                  i == null ? void 0 : i.name,
                ],
              }),
              S.jsx("a", {
                ref: c,
                contentEditable: !0,
                className: `idvalue ${l && "showme"}`,
                onKeyDown: m,
                onBlur: () => {
                  var h;
                  const [w, p] = ((h = c.current) == null
                    ? void 0
                    : h.innerText.split(":").map((v) => v.trim())) || ["", ""];
                  r.set_reward_any(e.reward.ID, "BackendValue", w),
                    r.set_reward_any(e.reward.ID, "Template", p),
                    u(!1);
                },
                spellCheck: !1,
              }),
              !l &&
                S.jsxs("p", {
                  children: [e.reward.BackendValue, ":", e.reward.Template],
                }),
            ],
          }),
          S.jsxs("div", {
            className: "actions",
            children: [
              S.jsx("button", {
                className: "drag",
                onPointerDown: (w) => n.start(w),
                children: S.jsx(k1, {}),
              }),
              S.jsx("button", {
                onClick: () => r.set_reward_quantity(e.reward.ID, 0),
                children: S.jsx(P_, {}),
              }),
              S.jsx("button", { onClick: f, children: S.jsx(R_, {}) }),
              S.jsx("button", { onClick: g, children: S.jsx(Sl, {}) }),
              S.jsx("div", {
                className: `editText ${s && "showme"}`,
                children: S.jsx("a", {
                  ref: a,
                  contentEditable: !0,
                  className: "quantityvalue",
                  onKeyDown: d,
                  onBlur: () => {
                    var p;
                    const w = parseInt(
                      ((p = a.current) == null ? void 0 : p.innerText) || "0"
                    );
                    r.set_reward_quantity(e.reward.ID, w), o(!1);
                  },
                  spellCheck: !1,
                }),
              }),
            ],
          }),
        ],
      },
      e.reward.ID
    );
  },
  M_ = (e) => {
    const t = Bt(),
      n = e.offer;
    return S.jsxs("div", {
      children: [
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "Original Price" }),
            S.jsx("img", {
              className: "vbuck",
              src: "https://vignette.wikia.nocookie.net/fortnite/images/4/48/Fortnite_V-Bucks.png/revision/latest/scale-to-width-down/480?cb=20180608105648&path-prefix=de",
            }),
            S.jsx("input", {
              className: "price",
              value: n.Price.OriginalPrice,
              onChange: (r) => {
                t.set_offer_price(
                  n.ID,
                  "OriginalPrice",
                  parseInt(r.target.value) || 0
                );
              },
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "Final Price" }),
            S.jsx("img", {
              className: "vbuck",
              src: "https://vignette.wikia.nocookie.net/fortnite/images/4/48/Fortnite_V-Bucks.png/revision/latest/scale-to-width-down/480?cb=20180608105648&path-prefix=de",
            }),
            S.jsx("input", {
              className: "price",
              value: n.Price.FinalPrice,
              onChange: (r) => {
                t.set_offer_price(
                  n.ID,
                  "FinalPrice",
                  parseInt(r.target.value) || 0
                );
              },
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "USE FULFILMENT" }),
            S.jsx("button", {
              className: `checkbox ${n.Meta.OnlyOnce && "active"}`,
              onClick: () => {
                t.set_offer_meta(n.ID, "OnlyOnce", !n.Meta.OnlyOnce);
              },
              children: S.jsx(xu, {}),
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "REFUNDABLE" }),
            S.jsx("button", {
              className: `checkbox ${n.Meta.Refundable && "active"}`,
              onClick: () => {
                t.set_offer_meta(n.ID, "Refundable", !n.Meta.Refundable);
              },
              children: S.jsx(xu, {}),
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "GIFTABLE" }),
            S.jsx("button", {
              className: `checkbox ${n.Meta.Giftable && "active"}`,
              onClick: () => {
                t.set_offer_meta(n.ID, "Giftable", !n.Meta.Giftable);
              },
              children: S.jsx(xu, {}),
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "CATEGORY" }),
            S.jsx("input", {
              className: "price",
              value: e.offer.Meta.Categories[0] || "none",
              onChange: (r) => {
                t.set_offer_meta(n.ID, "Categories", [r.target.value]);
              },
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "Tile Size" }),
            S.jsx(Lm, {
              options: ["Mini", "Small", "Normal", "DoubleWide"],
              currentOption: e.offer.Meta.TileSize || "Small",
              setOption: (r) => {
                t.set_offer_meta(n.ID, "TileSize", r);
              },
            }),
          ],
        }),
        e.section.Name === "BRWeeklyStorefront" &&
          S.jsxs("div", {
            className: "shopModalMetaOption",
            children: [
              S.jsx("p", { children: "Section" }),
              S.jsx(Lm, {
                options: ["Featured", "Retrac"],
                currentOption: e.offer.Meta.SectionID || "Featured",
                setOption: (r) => {
                  t.set_offer_meta(n.ID, "SectionID", r);
                },
              }),
            ],
          }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "Display Asset" }),
            S.jsx("input", {
              className: "price",
              value: e.offer.Meta.DisplayAssetPath || "",
              onChange: (r) => {
                t.set_offer_meta(n.ID, "DisplayAssetPath", r.target.value);
              },
            }),
          ],
        }),
        S.jsxs("div", {
          className: "shopModalMetaOption",
          children: [
            S.jsx("p", { children: "DAV2" }),
            S.jsx("input", {
              className: "price",
              value: e.offer.Meta.NewDisplayAssetPath || "",
              onChange: (r) => {
                t.set_offer_meta(n.ID, "NewDisplayAssetPath", r.target.value);
              },
            }),
          ],
        }),
      ],
    });
  },
  j_ = () => {
    const e = al((n) => n.editing),
      t = ll((n) => n.editing);
    return tx.createPortal(
      S.jsx(n_, {
        children: S.jsxs("div", {
          className: "modalContainer",
          children: [e && S.jsx(C_, {}), t && S.jsx(O_, {})],
        }),
      }),
      document.getElementById("modal-root")
    );
  },
  Pu = (e) => e instanceof Date,
  I_ = (e) => Object.keys(e).length === 0,
  qc = (e) => e != null && typeof e == "object",
  Am = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t),
  Cu = (e) => qc(e) && I_(e),
  L_ = () => Object.create(null),
  _1 = (e, t) => {
    if (e === t) return {};
    if (!qc(e) || !qc(t)) return t;
    const n = Object.keys(e).reduce(
      (r, i) => (Am(t, i) || (r[i] = void 0), r),
      L_()
    );
    return Pu(e) || Pu(t)
      ? e.valueOf() == t.valueOf()
        ? {}
        : t
      : Object.keys(t).reduce((r, i) => {
          if (!Am(e, i)) return (r[i] = t[i]), r;
          const s = _1(e[i], t[i]);
          return (Cu(s) && !Pu(s) && (Cu(e[i]) || !Cu(t[i]))) || (r[i] = s), r;
        }, n);
  },
  A_ = (e) => {
    const t = ol(),
      { data: n } = Zs({ queryKey: ["shop", e.shopId] }),
      [r, i] = Bt((a) => [a.catalog, a.setCatalog]),
      [s, o] = T.useState(!1);
    return (
      T.useEffect(() => {
        if (!n || !r) return;
        const a = _1(n, r);
        console.log(a), o(Object.keys(a).length > 0);
      }, [r, e]),
      n && s
        ? S.jsxs("div", {
            className: "shopDetectSave",
            children: [
              S.jsx("button", {
                onClick: async () => {
                  r &&
                    (await WC(r).then((a) => {
                      a && (t.setQueryData(["shop", e.shopId], a), i(a), o(!1));
                    }));
                },
                children: "Save Changes",
              }),
              S.jsx("button", {
                onClick: () => {
                  i(n), o(!1);
                },
                className: "alt",
                children: "Cancel",
              }),
            ],
          })
        : null
    );
  },
  N_ = () => {
    const e = ol(),
      [t] = Bt((i) => [i.setCatalog]),
      { base64EncodedShopId: n } = O1.useParams(),
      r = atob(n);
    return (
      T.useEffect(() => {
        console.log("fetching shop"),
          KC(n).then((i) => (i && t(i), e.setQueryData(["shop", r], i), i));
      }, []),
      console.log(r, n),
      S.jsxs(S.Fragment, {
        children: [
          S.jsx(j_, {}),
          S.jsx(A_, { base64EncodedShopId: n, shopId: r }),
          S.jsx(F_, {}),
        ],
      })
    );
  },
  F_ = () => {
    const [e] = Pr((i) => [i.retrac_items]),
      [t] = Bt((i) => [i.catalog]),
      n =
        t == null
          ? void 0
          : t.Sections.reduce((i, s) => ((i[s.Name] = s), i), {}),
      r = new Date(t ? t.ID : "0");
    return Object.keys(e).length === 0
      ? "please wait"
      : S.jsx("div", {
          className: "shopMain",
          children: S.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            },
            children: [
              S.jsx("div", {
                className: "shopHeaderContainer",
                children: S.jsx("h1", {
                  className: "shopHeader",
                  children: r
                    .toLocaleDateString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .toLocaleUpperCase(),
                }),
              }),
              S.jsx("div", {
                className: "shopSections",
                children:
                  n &&
                  S.jsxs(S.Fragment, {
                    children: [
                      S.jsx(Nm, { section: n.BRWeeklyStorefront }),
                      S.jsx(Nm, { section: n.BRDailyStorefront }),
                    ],
                  }),
              }),
            ],
          }),
        });
  },
  Nm = (e) => {
    var n, r;
    const t =
      ((r = (n = e.section) == null ? void 0 : n.itemOffers) == null
        ? void 0
        : r.reduce(
            (i, s) => (
              i[s.Meta.SectionID] || (i[s.Meta.SectionID] = []),
              i[s.Meta.SectionID].push(s),
              i
            ),
            {}
          )) || {};
    return (
      console.log("sectionMap", t),
      S.jsx(S.Fragment, {
        children: Object.entries(t).map(([i, s]) =>
          S.jsx(
            V_,
            { offers: s, name: i, section: e.section, sectionMetaID: i },
            i
          )
        ),
      })
    );
  },
  V_ = (e) => {
    const t = Bt((s) => s.add_new_offer),
      n = al((s) => s.edit),
      i = (
        e.offers.sort((s, o) => s.Meta.PriorityShop - o.Meta.PriorityShop) || []
      ).reduce(
        (s, o) => (
          o.Meta.Categories[0] === void 0 && (o.Meta.Categories[0] = o.ID),
          s[o.Meta.Categories[0]] || (s[o.Meta.Categories[0]] = []),
          s[o.Meta.Categories[0]].push(o),
          s
        ),
        {}
      );
    return S.jsxs("div", {
      className: "section",
      children: [
        S.jsxs("header", {
          className: "header",
          children: [
            S.jsxs("h2", { children: [e.name, " Items"] }),
            S.jsx("time", {}),
            S.jsxs("div", {
              style: { display: "flex", gap: "0.5rem" },
              children: [
                S.jsx("button", {
                  className: "shop-style-btn",
                  children: S.jsx(S_, {}),
                }),
                S.jsx("button", {
                  onClick: () => n(e.section.ID),
                  className: "shop-style-btn",
                  children: S.jsx(Sl, {}),
                }),
                S.jsx("button", {
                  className: "shop-style-btn",
                  onClick: () => t(e.section.ID, e.sectionMetaID),
                  children: S.jsx(Lf, {}),
                }),
              ],
            }),
          ],
        }),
        S.jsx("section", {
          className: "children featured",
          style: { minHeight: "max-content" },
          children: Object.entries(i).map(([s, o]) =>
            S.jsx(b_, { category: s, offers: o }, s)
          ),
        }),
      ],
    });
  },
  b_ = (e) => {
    const [t, n] = T.useState(e.offers.length - 1),
      r = e.offers
        .filter((s) => s.Meta.Categories[0] === e.category)
        .sort((s, o) => s.Meta.PriorityCategory + o.Meta.PriorityCategory),
      i = (s) => {
        if (r[t + s] === void 0) {
          n(0);
          return;
        }
        n((o) => o + s);
      };
    return (
      T.useEffect(() => {
        r[t] === void 0 && n(0);
      }, [r]),
      S.jsx(
        B_,
        {
          offer: r[t],
          indexInCategory: t + 1,
          maxIndexInCategory: r.length,
          category: e.category,
          next: i,
        },
        e.category
      )
    );
  },
  B_ = (e) => {
    var a, l, u;
    const [t] = Pr((c) => [c.retrac_items]),
      [n] = ll((c) => [c.edit]),
      [r] = Bt((c) => [c.remove_offer]),
      { data: i } = Zs({
        queryKey: [
          "shop",
          ((l =
            (a = e == null ? void 0 : e.offer) == null
              ? void 0
              : a.Rewards[0]) == null
            ? void 0
            : l.Template) || "",
        ],
        queryFn: () => {
          var c;
          return sl(
            ((c = e.offer.Rewards[0]) == null ? void 0 : c.Template) || ""
          );
        },
      }),
      s = () => {
        r(e.offer.ID), e.next(1);
      },
      o = () => {
        var f, g;
        if (!(i != null && i.id.includes("_Retrac")))
          return (
            (!e.daily &&
            ((f = i == null ? void 0 : i.images) == null
              ? void 0
              : f.featured) != null
              ? i == null
                ? void 0
                : i.images.featured
              : i == null
              ? void 0
              : i.images.icon) ||
            (i == null ? void 0 : i.images.icon) ||
            "https://media.discordapp.net/attachments/1225817618011918448/1240023559917535362/Fortnite-Item-Pattern-512.png?ex=66450d6f&is=6643bbef&hm=40d5fd7324f3a2a82266c0da94641e2d6aff6867c6df028ad90629fb97b507d0&=&format=webp&quality=lossless"
          );
        const c = i.id.replace("_Retrac", ""),
          d = t[c];
        return (
          (!e.daily &&
          ((g = d == null ? void 0 : d.images) == null ? void 0 : g.featured) !=
            null
            ? d == null
              ? void 0
              : d.images.featured
            : d == null
            ? void 0
            : d.images.icon) ||
          "https://media.discordapp.net/attachments/1225817618011918448/1240023559917535362/Fortnite-Item-Pattern-512.png?ex=66450d6f&is=6643bbef&hm=40d5fd7324f3a2a82266c0da94641e2d6aff6867c6df028ad90629fb97b507d0&=&format=webp&quality=lossless"
        );
      };
    return !i || !e.offer
      ? "loading"
      : S.jsxs(
          "div",
          {
            className: `shopEntry ${
              (u = i == null ? void 0 : i.rarity) == null
                ? void 0
                : u.backendValue.split("::")[1]
            }`,
            children: [
              S.jsxs("div", {
                className: "imageContainer",
                style: { backgroundImage: `url("${o()}")` },
                children: [
                  e.maxIndexInCategory > 1 &&
                    S.jsx("div", {
                      className: "multiple",
                      children: S.jsxs("span", {
                        children: [
                          e.indexInCategory,
                          " of ",
                          e.maxIndexInCategory,
                        ],
                      }),
                    }),
                  S.jsxs("div", {
                    className: "info",
                    children: [
                      S.jsx("h2", {
                        children: i == null ? void 0 : i.name.toUpperCase(),
                      }),
                      S.jsx("small", {
                        children:
                          i == null ? void 0 : i.type.value.toUpperCase(),
                      }),
                    ],
                  }),
                  S.jsxs("div", {
                    className: "price",
                    children: [
                      S.jsx("img", {
                        className: "vbuck",
                        src: "https://vignette.wikia.nocookie.net/fortnite/images/4/48/Fortnite_V-Bucks.png/revision/latest/scale-to-width-down/480?cb=20180608105648&path-prefix=de",
                      }),
                      S.jsx("span", {
                        className: "text",
                        children: e.offer.Price.FinalPrice.toLocaleString(),
                      }),
                    ],
                  }),
                ],
              }),
              S.jsx("div", {
                className: "optionsOverlay",
                children: S.jsxs("div", {
                  className: "controlCentre",
                  children: [
                    e.maxIndexInCategory > 1 &&
                      S.jsx("button", {
                        className: "controlOption",
                        onClick: () => e.next(-1),
                        children: S.jsx(g_, {}),
                      }),
                    S.jsx("div", {}),
                    S.jsx("button", {
                      className: "controlOption centre",
                      onClick: () => n(e.offer.ID),
                      children: S.jsx(Sl, {}),
                    }),
                    S.jsx("button", {
                      className: "controlOption trash",
                      onClick: s,
                      children: S.jsx(x_, {}),
                    }),
                    S.jsx("div", {}),
                    e.maxIndexInCategory > 1 &&
                      S.jsx("button", {
                        className: "controlOption",
                        onClick: () => e.next(1),
                        children: S.jsx(v_, {}),
                      }),
                  ],
                }),
              }),
            ],
          },
          e.category
        );
  },
  z_ = () => {
    const e = Gd(),
      t = ol(),
      { data: n } = Zs({
        queryKey: ["shops"],
        queryFn: async () =>
          await HC().then(
            (i) => (
              i.forEach((s) => {
                t.setQueryData(["shops", s.ID], s);
              }),
              i
            )
          ),
      });
    if (!n) return "Loading...";
    const r = n.sort(
      (i, s) =>
        Date.now() -
        new Date(i.ID).getTime() -
        (Date.now() - new Date(s.ID).getTime())
    );
    return S.jsx("div", {
      className: "allshops",
      children: S.jsx("div", {
        className: "shops",
        children: r.map((i) =>
          S.jsx(
            "button",
            {
              onClick: () => {
                e({ to: "/panel/shop/" + btoa(i.ID) });
              },
              children: new Date(i.ID).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
            i.ID
          )
        ),
      }),
    });
  },
  wl = Ux({ component: () => S.jsx(S.Fragment, { children: S.jsx(Wd, {}) }) }),
  U_ = Ri({ getParentRoute: () => wl, path: "/", component: cP }),
  $_ = Ri({ getParentRoute: () => wl, path: "/credentials", component: rE }),
  so = Ri({ getParentRoute: () => wl, path: "/panel", component: GC }),
  H_ = Ri({
    getParentRoute: () => so,
    path: "/",
    component: () => S.jsx(uP, { to: "/panel/shop" }),
  }),
  K_ = Ri({ getParentRoute: () => so, path: "/shop", component: z_ }),
  O1 = Ri({
    getParentRoute: () => so,
    path: "/shop/$base64EncodedShopId",
    component: N_,
  });
so.addChildren([H_, K_, O1]);
const W_ = wl.addChildren([U_, $_, so]),
  Q_ = Zx({ routeTree: W_ });
Eu.createRoot(document.getElementById("root")).render(
  S.jsx(EE, { client: new wE(), children: S.jsx(Yx, { router: Q_ }) })
);
