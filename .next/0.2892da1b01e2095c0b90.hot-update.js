webpackHotUpdate(0, {
  /***/ /***/ 540: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__ = __webpack_require__(
      600
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "i",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Prompt__ = __webpack_require__(
      601
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "h",
      function() {
        return __WEBPACK_IMPORTED_MODULE_1__Prompt__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Redirect__ = __webpack_require__(
      602
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "g",
      function() {
        return __WEBPACK_IMPORTED_MODULE_2__Redirect__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(
      557
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "f",
      function() {
        return __WEBPACK_IMPORTED_MODULE_3__Route__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(
      549
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "e",
      function() {
        return __WEBPACK_IMPORTED_MODULE_4__Router__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__StaticRouter__ = __webpack_require__(
      603
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "d",
      function() {
        return __WEBPACK_IMPORTED_MODULE_5__StaticRouter__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Switch__ = __webpack_require__(
      604
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "c",
      function() {
        return __WEBPACK_IMPORTED_MODULE_6__Switch__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__matchPath__ = __webpack_require__(
      550
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "b",
      function() {
        return __WEBPACK_IMPORTED_MODULE_7__matchPath__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__withRouter__ = __webpack_require__(
      605
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_8__withRouter__["a"];
      }
    );

    /***/
  },

  /***/ /***/ 541: function(module, exports, __webpack_require__) {
    "use strict";
    /**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

    /**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

    var warning = function() {};

    if (true) {
      warning = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === undefined) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning " +
              "message argument"
          );
        }

        if (format.length < 10 || /^[s\W]*$/.test(format)) {
          throw new Error(
            "The warning format should be able to uniquely identify this " +
              "warning. Please, use a more descriptive format than: " +
              format
          );
        }

        if (!condition) {
          var argIndex = 0;
          var message =
            "Warning: " +
            format.replace(/%s/g, function() {
              return args[argIndex++];
            });
          if (typeof console !== "undefined") {
            console.error(message);
          }
          try {
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        }
      };
    }

    module.exports = warning;

    /***/
  },

  /***/ /***/ 542: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    var addLeadingSlash = (exports.addLeadingSlash = function addLeadingSlash(
      path
    ) {
      return path.charAt(0) === "/" ? path : "/" + path;
    });

    var stripLeadingSlash = (exports.stripLeadingSlash = function stripLeadingSlash(
      path
    ) {
      return path.charAt(0) === "/" ? path.substr(1) : path;
    });

    var hasBasename = (exports.hasBasename = function hasBasename(
      path,
      prefix
    ) {
      return new RegExp("^" + prefix + "(\\/|\\?|#|$)", "i").test(path);
    });

    var stripBasename = (exports.stripBasename = function stripBasename(
      path,
      prefix
    ) {
      return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
    });

    var stripTrailingSlash = (exports.stripTrailingSlash = function stripTrailingSlash(
      path
    ) {
      return path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;
    });

    var parsePath = (exports.parsePath = function parsePath(path) {
      var pathname = path || "/";
      var search = "";
      var hash = "";

      var hashIndex = pathname.indexOf("#");
      if (hashIndex !== -1) {
        hash = pathname.substr(hashIndex);
        pathname = pathname.substr(0, hashIndex);
      }

      var searchIndex = pathname.indexOf("?");
      if (searchIndex !== -1) {
        search = pathname.substr(searchIndex);
        pathname = pathname.substr(0, searchIndex);
      }

      return {
        pathname: pathname,
        search: search === "?" ? "" : search,
        hash: hash === "#" ? "" : hash
      };
    });

    var createPath = (exports.createPath = function createPath(location) {
      var pathname = location.pathname,
        search = location.search,
        hash = location.hash;

      var path = pathname || "/";

      if (search && search !== "?")
        path += search.charAt(0) === "?" ? search : "?" + search;

      if (hash && hash !== "#")
        path += hash.charAt(0) === "#" ? hash : "#" + hash;

      return path;
    });

    /***/
  },

  /***/ /***/ 543: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__ = __webpack_require__(
      588
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "BrowserRouter",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HashRouter__ = __webpack_require__(
      589
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "HashRouter",
      function() {
        return __WEBPACK_IMPORTED_MODULE_1__HashRouter__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(
      556
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "Link",
      function() {
        return __WEBPACK_IMPORTED_MODULE_2__Link__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__ = __webpack_require__(
      590
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "MemoryRouter",
      function() {
        return __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NavLink__ = __webpack_require__(
      591
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "NavLink",
      function() {
        return __WEBPACK_IMPORTED_MODULE_4__NavLink__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Prompt__ = __webpack_require__(
      592
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "Prompt",
      function() {
        return __WEBPACK_IMPORTED_MODULE_5__Prompt__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Redirect__ = __webpack_require__(
      593
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "Redirect",
      function() {
        return __WEBPACK_IMPORTED_MODULE_6__Redirect__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Route__ = __webpack_require__(
      594
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "Route",
      function() {
        return __WEBPACK_IMPORTED_MODULE_7__Route__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Router__ = __webpack_require__(
      595
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "Router",
      function() {
        return __WEBPACK_IMPORTED_MODULE_8__Router__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__StaticRouter__ = __webpack_require__(
      596
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "StaticRouter",
      function() {
        return __WEBPACK_IMPORTED_MODULE_9__StaticRouter__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Switch__ = __webpack_require__(
      597
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "Switch",
      function() {
        return __WEBPACK_IMPORTED_MODULE_10__Switch__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__matchPath__ = __webpack_require__(
      598
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "matchPath",
      function() {
        return __WEBPACK_IMPORTED_MODULE_11__matchPath__["a"];
      }
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__withRouter__ = __webpack_require__(
      599
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "withRouter",
      function() {
        return __WEBPACK_IMPORTED_MODULE_12__withRouter__["a"];
      }
    );

    /***/
  },

  /***/ /***/ 544: function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__,
      __WEBPACK_AMD_DEFINE_RESULT__; /*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
    /* global define */

    (function() {
      "use strict";

      var hasOwn = {}.hasOwnProperty;

      function classNames() {
        var classes = [];

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg) continue;

          var argType = typeof arg;

          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(null, arg));
          } else if (argType === "object") {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }

        return classes.join(" ");
      }

      if (typeof module !== "undefined" && module.exports) {
        module.exports = classNames;
      } else if (true) {
        // register as 'classnames', consistent with npm package name
        !(
          (__WEBPACK_AMD_DEFINE_ARRAY__ = []),
          (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return classNames;
          }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
            (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
        );
      } else {
        window.classNames = classNames;
      }
    })();

    /***/
  },

  /***/ /***/ 545: function(module, exports, __webpack_require__) {
    "use strict";
    /**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

    /**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

    var invariant = function(condition, format, a, b, c, d, e, f) {
      if (true) {
        if (format === undefined) {
          throw new Error("invariant requires an error message argument");
        }
      }

      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error(
            "Minified exception occurred; use the non-minified dev environment " +
              "for the full error message and additional helpful warnings."
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() {
              return args[argIndex++];
            })
          );
          error.name = "Invariant Violation";
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
      }
    };

    module.exports = invariant;

    /***/
  },

  /***/ /***/ 546: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    exports.locationsAreEqual = exports.createLocation = undefined;

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _resolvePathname = __webpack_require__(613);

    var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

    var _valueEqual = __webpack_require__(615);

    var _valueEqual2 = _interopRequireDefault(_valueEqual);

    var _PathUtils = __webpack_require__(542);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var createLocation = (exports.createLocation = function createLocation(
      path,
      state,
      key,
      currentLocation
    ) {
      var location = void 0;
      if (typeof path === "string") {
        // Two-arg form: push(path, state)
        location = (0, _PathUtils.parsePath)(path);
        location.state = state;
      } else {
        // One-arg form: push(location)
        location = _extends({}, path);

        if (location.pathname === undefined) location.pathname = "";

        if (location.search) {
          if (location.search.charAt(0) !== "?")
            location.search = "?" + location.search;
        } else {
          location.search = "";
        }

        if (location.hash) {
          if (location.hash.charAt(0) !== "#")
            location.hash = "#" + location.hash;
        } else {
          location.hash = "";
        }

        if (state !== undefined && location.state === undefined)
          location.state = state;
      }

      try {
        location.pathname = decodeURI(location.pathname);
      } catch (e) {
        if (e instanceof URIError) {
          throw new URIError(
            'Pathname "' +
              location.pathname +
              '" could not be decoded. ' +
              "This is likely caused by an invalid percent-encoding."
          );
        } else {
          throw e;
        }
      }

      if (key) location.key = key;

      if (currentLocation) {
        // Resolve incomplete/relative pathname relative to current location.
        if (!location.pathname) {
          location.pathname = currentLocation.pathname;
        } else if (location.pathname.charAt(0) !== "/") {
          location.pathname = (0, _resolvePathname2.default)(
            location.pathname,
            currentLocation.pathname
          );
        }
      } else {
        // When there is no prior location and pathname is empty, set it to /
        if (!location.pathname) {
          location.pathname = "/";
        }
      }

      return location;
    });

    var locationsAreEqual = (exports.locationsAreEqual = function locationsAreEqual(
      a,
      b
    ) {
      return (
        a.pathname === b.pathname &&
        a.search === b.search &&
        a.hash === b.hash &&
        a.key === b.key &&
        (0, _valueEqual2.default)(a.state, b.state)
      );
    });

    /***/
  },

  /***/ /***/ 547: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _warning = __webpack_require__(541);

    var _warning2 = _interopRequireDefault(_warning);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var createTransitionManager = function createTransitionManager() {
      var prompt = null;

      var setPrompt = function setPrompt(nextPrompt) {
        (0, _warning2.default)(
          prompt == null,
          "A history supports only one prompt at a time"
        );

        prompt = nextPrompt;

        return function() {
          if (prompt === nextPrompt) prompt = null;
        };
      };

      var confirmTransitionTo = function confirmTransitionTo(
        location,
        action,
        getUserConfirmation,
        callback
      ) {
        // TODO: If another transition starts while we're still confirming
        // the previous one, we may end up in a weird state. Figure out the
        // best way to handle this.
        if (prompt != null) {
          var result =
            typeof prompt === "function" ? prompt(location, action) : prompt;

          if (typeof result === "string") {
            if (typeof getUserConfirmation === "function") {
              getUserConfirmation(result, callback);
            } else {
              (0, _warning2.default)(
                false,
                "A history needs a getUserConfirmation function in order to use a prompt message"
              );

              callback(true);
            }
          } else {
            // Return false from a transition hook to cancel the transition.
            callback(result !== false);
          }
        } else {
          callback(true);
        }
      };

      var listeners = [];

      var appendListener = function appendListener(fn) {
        var isActive = true;

        var listener = function listener() {
          if (isActive) fn.apply(undefined, arguments);
        };

        listeners.push(listener);

        return function() {
          isActive = false;
          listeners = listeners.filter(function(item) {
            return item !== listener;
          });
        };
      };

      var notifyListeners = function notifyListeners() {
        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        listeners.forEach(function(listener) {
          return listener.apply(undefined, args);
        });
      };

      return {
        setPrompt: setPrompt,
        confirmTransitionTo: confirmTransitionTo,
        appendListener: appendListener,
        notifyListeners: notifyListeners
      };
    };

    exports.default = createTransitionManager;

    /***/
  },

  /***/ /***/ 549: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(
      541
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_warning__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(
      545
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_invariant__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_3_prop_types__
    );
    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for putting history on context.
 */

    var Router = (function(_React$Component) {
      _inherits(Router, _React$Component);

      function Router() {
        var _temp, _this, _ret;

        _classCallCheck(this, Router);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.state = {
            match: _this.computeMatch(_this.props.history.location.pathname)
          }),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      Router.prototype.getChildContext = function getChildContext() {
        return {
          router: _extends({}, this.context.router, {
            history: this.props.history,
            route: {
              location: this.props.history.location,
              match: this.state.match
            }
          })
        };
      };

      Router.prototype.computeMatch = function computeMatch(pathname) {
        return {
          path: "/",
          url: "/",
          params: {},
          isExact: pathname === "/"
        };
      };

      Router.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var _props = this.props,
          children = _props.children,
          history = _props.history;

        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(
          children == null ||
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.count(
              children
            ) === 1,
          "A <Router> may have only one child element"
        );

        // Do this here so we can setState when a <Redirect> changes the
        // location in componentWillMount. This happens e.g. when doing
        // server rendering using a <StaticRouter>.
        this.unlisten = history.listen(function() {
          _this2.setState({
            match: _this2.computeMatch(history.location.pathname)
          });
        });
      };

      Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps
      ) {
        __WEBPACK_IMPORTED_MODULE_0_warning___default()(
          this.props.history === nextProps.history,
          "You cannot change <Router history>"
        );
      };

      Router.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unlisten();
      };

      Router.prototype.render = function render() {
        var children = this.props.children;

        return children
          ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(
              children
            )
          : null;
      };

      return Router;
    })(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

    Router.propTypes = {
      history:
        __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired,
      children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node
    };
    Router.contextTypes = {
      router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object
    };
    Router.childContextTypes = {
      router:
        __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired
    };

    /* harmony default export */ __webpack_exports__["a"] = Router;

    /***/
  },

  /***/ /***/ 550: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(
      581
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__
    );

    var patternCache = {};
    var cacheLimit = 10000;
    var cacheCount = 0;

    var compilePath = function compilePath(pattern, options) {
      var cacheKey = "" + options.end + options.strict;
      var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

      if (cache[pattern]) return cache[pattern];

      var keys = [];
      var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(
        pattern,
        keys,
        options
      );
      var compiledPattern = { re: re, keys: keys };

      if (cacheCount < cacheLimit) {
        cache[pattern] = compiledPattern;
        cacheCount++;
      }

      return compiledPattern;
    };

    /**
 * Public API for matching a URL pathname to a path pattern.
 */
    var matchPath = function matchPath(pathname) {
      var options =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof options === "string") options = { path: options };

      var _options = options,
        _options$path = _options.path,
        path = _options$path === undefined ? "/" : _options$path,
        _options$exact = _options.exact,
        exact = _options$exact === undefined ? false : _options$exact,
        _options$strict = _options.strict,
        strict = _options$strict === undefined ? false : _options$strict;

      var _compilePath = compilePath(path, { end: exact, strict: strict }),
        re = _compilePath.re,
        keys = _compilePath.keys;

      var match = re.exec(pathname);

      if (!match) return null;

      var url = match[0],
        values = match.slice(1);

      var isExact = pathname === url;

      if (exact && !isExact) return null;

      return {
        path: path, // the path pattern used to match
        url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
        isExact: isExact, // whether or not we matched exactly
        params: keys.reduce(function(memo, key, index) {
          memo[key.name] = values[index];
          return memo;
        }, {})
      };
    };

    /* harmony default export */ __webpack_exports__["a"] = matchPath;

    /***/
  },

  /***/ /***/ 551: function(module, exports, __webpack_require__) {
    "use strict";

    module.exports = __webpack_require__(611);

    /***/
  },

  /***/ /***/ 552: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom = __webpack_require__(199);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _trackHelper = __webpack_require__(559);

    var _objectAssign = __webpack_require__(3);

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var helpers = {
      initialize: function initialize(props) {
        var slickList = _reactDom2.default.findDOMNode(this.list);

        var slideCount = _react2.default.Children.count(props.children);
        var listWidth = this.getWidth(slickList);
        var trackWidth = this.getWidth(
          _reactDom2.default.findDOMNode(this.track)
        );
        var slideWidth;

        if (!props.vertical) {
          var centerPaddingAdj =
            props.centerMode && parseInt(props.centerPadding) * 2;
          slideWidth =
            (this.getWidth(_reactDom2.default.findDOMNode(this)) -
              centerPaddingAdj) /
            props.slidesToShow;
        } else {
          slideWidth = this.getWidth(_reactDom2.default.findDOMNode(this));
        }

        var slideHeight = this.getHeight(
          slickList.querySelector('[data-index="0"]')
        );
        var listHeight = slideHeight * props.slidesToShow;

        var currentSlide = props.rtl
          ? slideCount - 1 - props.initialSlide
          : props.initialSlide;

        this.setState(
          {
            slideCount: slideCount,
            slideWidth: slideWidth,
            listWidth: listWidth,
            trackWidth: trackWidth,
            currentSlide: currentSlide,
            slideHeight: slideHeight,
            listHeight: listHeight
          },
          function() {
            var targetLeft = (0, _trackHelper.getTrackLeft)(
              (0, _objectAssign2.default)(
                {
                  slideIndex: this.state.currentSlide,
                  trackRef: this.track
                },
                props,
                this.state
              )
            );
            // getCSS function needs previously set state
            var trackStyle = (0, _trackHelper.getTrackCSS)(
              (0, _objectAssign2.default)(
                { left: targetLeft },
                props,
                this.state
              )
            );

            this.setState({ trackStyle: trackStyle });

            this.autoPlay(); // once we're set up, trigger the initial autoplay.
          }
        );
      },
      update: function update(props) {
        var slickList = _reactDom2.default.findDOMNode(this.list);
        // This method has mostly same code as initialize method.
        // Refactor it
        var slideCount = _react2.default.Children.count(props.children);
        var listWidth = this.getWidth(slickList);
        var trackWidth = this.getWidth(
          _reactDom2.default.findDOMNode(this.track)
        );
        var slideWidth;

        if (!props.vertical) {
          var centerPaddingAdj =
            props.centerMode && parseInt(props.centerPadding) * 2;
          slideWidth =
            (this.getWidth(_reactDom2.default.findDOMNode(this)) -
              centerPaddingAdj) /
            props.slidesToShow;
        } else {
          slideWidth = this.getWidth(_reactDom2.default.findDOMNode(this));
        }

        var slideHeight = this.getHeight(
          slickList.querySelector('[data-index="0"]')
        );
        var listHeight = slideHeight * props.slidesToShow;

        // pause slider if autoplay is set to false
        if (props.autoplay) {
          this.pause();
        } else {
          this.autoPlay();
        }

        this.setState(
          {
            slideCount: slideCount,
            slideWidth: slideWidth,
            listWidth: listWidth,
            trackWidth: trackWidth,
            slideHeight: slideHeight,
            listHeight: listHeight
          },
          function() {
            var targetLeft = (0, _trackHelper.getTrackLeft)(
              (0, _objectAssign2.default)(
                {
                  slideIndex: this.state.currentSlide,
                  trackRef: this.track
                },
                props,
                this.state
              )
            );
            // getCSS function needs previously set state
            var trackStyle = (0, _trackHelper.getTrackCSS)(
              (0, _objectAssign2.default)(
                { left: targetLeft },
                props,
                this.state
              )
            );

            this.setState({ trackStyle: trackStyle });
          }
        );
      },
      getWidth: function getWidth(elem) {
        return elem.getBoundingClientRect().width || elem.offsetWidth || 0;
      },
      getHeight: function getHeight(elem) {
        return elem.getBoundingClientRect().height || elem.offsetHeight || 0;
      },

      adaptHeight: function adaptHeight() {
        if (this.props.adaptiveHeight) {
          var selector = '[data-index="' + this.state.currentSlide + '"]';
          if (this.list) {
            var slickList = _reactDom2.default.findDOMNode(this.list);
            slickList.style.height =
              slickList.querySelector(selector).offsetHeight + "px";
          }
        }
      },
      canGoNext: function canGoNext(opts) {
        var canGo = true;
        if (!opts.infinite) {
          if (opts.centerMode) {
            // check if current slide is last slide
            if (opts.currentSlide >= opts.slideCount - 1) {
              canGo = false;
            }
          } else {
            // check if all slides are shown in slider
            if (
              opts.slideCount <= opts.slidesToShow ||
              opts.currentSlide >= opts.slideCount - opts.slidesToShow
            ) {
              canGo = false;
            }
          }
        }
        return canGo;
      },
      slideHandler: function slideHandler(index) {
        var _this = this;

        // Functionality of animateSlide and postSlide is merged into this function
        // console.log('slideHandler', index);
        var targetSlide, currentSlide;
        var targetLeft, currentLeft;
        var callback;

        if (this.props.waitForAnimate && this.state.animating) {
          return;
        }

        if (this.props.fade) {
          currentSlide = this.state.currentSlide;

          // Don't change slide if it's not infite and current slide is the first or last slide.
          if (
            this.props.infinite === false &&
            (index < 0 || index >= this.state.slideCount)
          ) {
            return;
          }

          //  Shifting targetSlide back into the range
          if (index < 0) {
            targetSlide = index + this.state.slideCount;
          } else if (index >= this.state.slideCount) {
            targetSlide = index - this.state.slideCount;
          } else {
            targetSlide = index;
          }

          if (
            this.props.lazyLoad &&
            this.state.lazyLoadedList.indexOf(targetSlide) < 0
          ) {
            this.setState({
              lazyLoadedList: this.state.lazyLoadedList.concat(targetSlide)
            });
          }

          callback = function callback() {
            _this.setState({
              animating: false
            });
            if (_this.props.afterChange) {
              _this.props.afterChange(targetSlide);
            }
            delete _this.animationEndCallback;
          };

          this.setState(
            {
              animating: true,
              currentSlide: targetSlide
            },
            function() {
              this.animationEndCallback = setTimeout(
                callback,
                this.props.speed
              );
            }
          );

          if (this.props.beforeChange) {
            this.props.beforeChange(this.state.currentSlide, targetSlide);
          }

          this.autoPlay();
          return;
        }

        targetSlide = index;
        if (targetSlide < 0) {
          if (this.props.infinite === false) {
            currentSlide = 0;
          } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
            currentSlide =
              this.state.slideCount -
              this.state.slideCount % this.props.slidesToScroll;
          } else {
            currentSlide = this.state.slideCount + targetSlide;
          }
        } else if (targetSlide >= this.state.slideCount) {
          if (this.props.infinite === false) {
            currentSlide = this.state.slideCount - this.props.slidesToShow;
          } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
            currentSlide = 0;
          } else {
            currentSlide = targetSlide - this.state.slideCount;
          }
        } else {
          currentSlide = targetSlide;
        }

        targetLeft = (0, _trackHelper.getTrackLeft)(
          (0, _objectAssign2.default)(
            {
              slideIndex: targetSlide,
              trackRef: this.track
            },
            this.props,
            this.state
          )
        );

        currentLeft = (0, _trackHelper.getTrackLeft)(
          (0, _objectAssign2.default)(
            {
              slideIndex: currentSlide,
              trackRef: this.track
            },
            this.props,
            this.state
          )
        );

        if (this.props.infinite === false) {
          targetLeft = currentLeft;
        }

        if (this.props.beforeChange) {
          this.props.beforeChange(this.state.currentSlide, currentSlide);
        }

        if (this.props.lazyLoad) {
          var loaded = true;
          var slidesToLoad = [];
          for (
            var i = targetSlide;
            i < targetSlide + this.props.slidesToShow;
            i++
          ) {
            loaded = loaded && this.state.lazyLoadedList.indexOf(i) >= 0;
            if (!loaded) {
              slidesToLoad.push(i);
            }
          }
          if (!loaded) {
            this.setState({
              lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)
            });
          }
        }

        // Slide Transition happens here.
        // animated transition happens to target Slide and
        // non - animated transition happens to current Slide
        // If CSS transitions are false, directly go the current slide.

        if (this.props.useCSS === false) {
          this.setState(
            {
              currentSlide: currentSlide,
              trackStyle: (0, _trackHelper.getTrackCSS)(
                (0, _objectAssign2.default)(
                  { left: currentLeft },
                  this.props,
                  this.state
                )
              )
            },
            function() {
              if (this.props.afterChange) {
                this.props.afterChange(currentSlide);
              }
            }
          );
        } else {
          var nextStateChanges = {
            animating: false,
            currentSlide: currentSlide,
            trackStyle: (0, _trackHelper.getTrackCSS)(
              (0, _objectAssign2.default)(
                { left: currentLeft },
                this.props,
                this.state
              )
            ),
            swipeLeft: null
          };

          callback = function callback() {
            _this.setState(nextStateChanges);
            if (_this.props.afterChange) {
              _this.props.afterChange(currentSlide);
            }
            delete _this.animationEndCallback;
          };

          this.setState(
            {
              animating: true,
              currentSlide: currentSlide,
              trackStyle: (0, _trackHelper.getTrackAnimateCSS)(
                (0, _objectAssign2.default)(
                  { left: targetLeft },
                  this.props,
                  this.state
                )
              )
            },
            function() {
              this.animationEndCallback = setTimeout(
                callback,
                this.props.speed
              );
            }
          );
        }

        this.autoPlay();
      },
      swipeDirection: function swipeDirection(touchObject) {
        var xDist, yDist, r, swipeAngle;

        xDist = touchObject.startX - touchObject.curX;
        yDist = touchObject.startY - touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
          swipeAngle = 360 - Math.abs(swipeAngle);
        }
        if (
          (swipeAngle <= 45 && swipeAngle >= 0) ||
          (swipeAngle <= 360 && swipeAngle >= 315)
        ) {
          return this.props.rtl === false ? "left" : "right";
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
          return this.props.rtl === false ? "right" : "left";
        }
        if (this.props.verticalSwiping === true) {
          if (swipeAngle >= 35 && swipeAngle <= 135) {
            return "down";
          } else {
            return "up";
          }
        }

        return "vertical";
      },
      play: function play() {
        var nextIndex;

        if (!this.state.mounted) {
          return false;
        }

        if (this.props.rtl) {
          nextIndex = this.state.currentSlide - this.props.slidesToScroll;
        } else {
          if (this.canGoNext(_extends({}, this.props, this.state))) {
            nextIndex = this.state.currentSlide + this.props.slidesToScroll;
          } else {
            return false;
          }
        }

        this.slideHandler(nextIndex);
      },
      autoPlay: function autoPlay() {
        if (this.state.autoPlayTimer) {
          clearTimeout(this.state.autoPlayTimer);
        }
        if (this.props.autoplay) {
          this.setState({
            autoPlayTimer: setTimeout(this.play, this.props.autoplaySpeed)
          });
        }
      },
      pause: function pause() {
        if (this.state.autoPlayTimer) {
          clearTimeout(this.state.autoPlayTimer);
          this.setState({
            autoPlayTimer: null
          });
        }
      }
    };

    exports.default = helpers;

    /***/
  },

  /***/ /***/ 554: function(module, exports) {
    /**
 * Helper function for iterating over a collection
 *
 * @param collection
 * @param fn
 */
    function each(collection, fn) {
      var i = 0,
        length = collection.length,
        cont;

      for (i; i < length; i++) {
        cont = fn(collection[i], i);
        if (cont === false) {
          break; //allow early exit
        }
      }
    }

    /**
 * Helper function for determining whether target object is an array
 *
 * @param target the object under test
 * @return {Boolean} true if array, false otherwise
 */
    function isArray(target) {
      return Object.prototype.toString.apply(target) === "[object Array]";
    }

    /**
 * Helper function for determining whether target object is a function
 *
 * @param target the object under test
 * @return {Boolean} true if function, false otherwise
 */
    function isFunction(target) {
      return typeof target === "function";
    }

    module.exports = {
      isFunction: isFunction,
      isArray: isArray,
      each: each
    };

    /***/
  },

  /***/ /***/ 555: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    var canUseDOM = (exports.canUseDOM = !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    ));

    var addEventListener = (exports.addEventListener = function addEventListener(
      node,
      event,
      listener
    ) {
      return node.addEventListener
        ? node.addEventListener(event, listener, false)
        : node.attachEvent("on" + event, listener);
    });

    var removeEventListener = (exports.removeEventListener = function removeEventListener(
      node,
      event,
      listener
    ) {
      return node.removeEventListener
        ? node.removeEventListener(event, listener, false)
        : node.detachEvent("on" + event, listener);
    });

    var getConfirmation = (exports.getConfirmation = function getConfirmation(
      message,
      callback
    ) {
      return callback(window.confirm(message));
    }); // eslint-disable-line no-alert

    /**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
    var supportsHistory = (exports.supportsHistory = function supportsHistory() {
      var ua = window.navigator.userAgent;

      if (
        (ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) &&
        ua.indexOf("Mobile Safari") !== -1 &&
        ua.indexOf("Chrome") === -1 &&
        ua.indexOf("Windows Phone") === -1
      )
        return false;

      return window.history && "pushState" in window.history;
    });

    /**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
    var supportsPopStateOnHashChange = (exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
      return window.navigator.userAgent.indexOf("Trident") === -1;
    });

    /**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
    var supportsGoWithoutReloadUsingHash = (exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
      return window.navigator.userAgent.indexOf("Firefox") === -1;
    });

    /**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
    var isExtraneousPopstateEvent = (exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(
      event
    ) {
      return (
        event.state === undefined && navigator.userAgent.indexOf("CriOS") === -1
      );
    });

    /***/
  },

  /***/ /***/ 556: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var isModifiedEvent = function isModifiedEvent(event) {
      return !!(
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      );
    };

    /**
 * The public API for rendering a history-aware <a>.
 */

    var Link = (function(_React$Component) {
      _inherits(Link, _React$Component);

      function Link() {
        var _temp, _this, _ret;

        _classCallCheck(this, Link);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.handleClick = function(event) {
            if (_this.props.onClick) _this.props.onClick(event);

            if (
              !event.defaultPrevented && // onClick prevented default
              event.button === 0 && // ignore right clicks
              !_this.props.target && // let browser handle "target=_blank" etc.
              !isModifiedEvent(event) // ignore clicks with modifier keys
            ) {
              event.preventDefault();

              var history = _this.context.router.history;
              var _this$props = _this.props,
                replace = _this$props.replace,
                to = _this$props.to;

              if (replace) {
                history.replace(to);
              } else {
                history.push(to);
              }
            }
          }),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      Link.prototype.render = function render() {
        var _props = this.props,
          replace = _props.replace,
          to = _props.to,
          props = _objectWithoutProperties(_props, ["replace", "to"]); // eslint-disable-line no-unused-vars

        var href = this.context.router.history.createHref(
          typeof to === "string" ? { pathname: to } : to
        );

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          _extends({}, props, { onClick: this.handleClick, href: href })
        );
      };

      return Link;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    Link.propTypes = {
      onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      target: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
      ]).isRequired
    };
    Link.defaultProps = {
      replace: false
    };
    Link.contextTypes = {
      router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
          push:
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
          replace:
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
          createHref:
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
        }).isRequired
      }).isRequired
    };

    /* harmony default export */ __webpack_exports__["a"] = Link;

    /***/
  },

  /***/ /***/ 557: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(
      541
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_warning__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matchPath__ = __webpack_require__(
      550
    );
    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for matching a single path and rendering.
 */

    var Route = (function(_React$Component) {
      _inherits(Route, _React$Component);

      function Route() {
        var _temp, _this, _ret;

        _classCallCheck(this, Route);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.state = {
            match: _this.computeMatch(_this.props, _this.context.router)
          }),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      Route.prototype.getChildContext = function getChildContext() {
        return {
          router: _extends({}, this.context.router, {
            route: {
              location:
                this.props.location || this.context.router.route.location,
              match: this.state.match
            }
          })
        };
      };

      Route.prototype.computeMatch = function computeMatch(_ref, _ref2) {
        var computedMatch = _ref.computedMatch,
          location = _ref.location,
          path = _ref.path,
          strict = _ref.strict,
          exact = _ref.exact;
        var route = _ref2.route;

        if (computedMatch) return computedMatch; // <Switch> already computed the match for us

        var pathname = (location || route.location).pathname;

        return path
          ? __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_3__matchPath__["a" /* default */]
            )(pathname, { path: path, strict: strict, exact: exact })
          : route.match;
      };

      Route.prototype.componentWillMount = function componentWillMount() {
        var _props = this.props,
          component = _props.component,
          render = _props.render,
          children = _props.children;

        __WEBPACK_IMPORTED_MODULE_0_warning___default()(
          !(component && render),
          "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
        );

        __WEBPACK_IMPORTED_MODULE_0_warning___default()(
          !(component && children),
          "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"
        );

        __WEBPACK_IMPORTED_MODULE_0_warning___default()(
          !(render && children),
          "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored"
        );
      };

      Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps,
        nextContext
      ) {
        __WEBPACK_IMPORTED_MODULE_0_warning___default()(
          !(nextProps.location && !this.props.location),
          '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
        );

        __WEBPACK_IMPORTED_MODULE_0_warning___default()(
          !(!nextProps.location && this.props.location),
          '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
        );

        this.setState({
          match: this.computeMatch(nextProps, nextContext.router)
        });
      };

      Route.prototype.render = function render() {
        var match = this.state.match;
        var _props2 = this.props,
          children = _props2.children,
          component = _props2.component,
          render = _props2.render;
        var _context$router = this.context.router,
          history = _context$router.history,
          route = _context$router.route,
          staticContext = _context$router.staticContext;

        var location = this.props.location || route.location;
        var props = {
          match: match,
          location: location,
          history: history,
          staticContext: staticContext
        };

        return component // component prop gets first priority, only called if there's a match
          ? match
            ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                component,
                props
              )
            : null
          : render // render prop is next, only called if there's a match
            ? match ? render(props) : null
            : children // children come last, always called
              ? typeof children === "function"
                ? children(props)
                : !Array.isArray(children) || children.length // Preact defaults to empty children array
                  ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.Children.only(
                      children
                    )
                  : null
              : null;
      };

      return Route;
    })(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

    Route.propTypes = {
      computedMatch: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // private, from <Switch>
      path: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
      exact: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
      strict: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
      component: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
      render: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
      children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
      ]),
      location: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
    };
    Route.contextTypes = {
      router: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.shape({
        history:
          __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
        route:
          __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
        staticContext: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
      })
    };
    Route.childContextTypes = {
      router:
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired
    };

    /* harmony default export */ __webpack_exports__["a"] = Route;

    /***/
  },

  /***/ /***/ 558: function(module, exports, __webpack_require__) {
    "use strict";

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var defaultProps = {
      className: "",
      accessibility: true,
      adaptiveHeight: false,
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      centerMode: false,
      centerPadding: "50px",
      cssEase: "ease",
      customPaging: function customPaging(i) {
        return _react2.default.createElement("button", null, i + 1);
      },
      dots: false,
      dotsClass: "slick-dots",
      draggable: true,
      easing: "linear",
      edgeFriction: 0.35,
      fade: false,
      focusOnSelect: false,
      infinite: true,
      initialSlide: 0,
      lazyLoad: false,
      pauseOnHover: true,
      responsive: null,
      rtl: false,
      slide: "div",
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      swipe: true,
      swipeToSlide: false,
      touchMove: true,
      touchThreshold: 5,
      useCSS: true,
      variableWidth: false,
      vertical: false,
      waitForAnimate: true,
      afterChange: null,
      beforeChange: null,
      edgeEvent: null,
      init: null,
      swipeEvent: null,
      // nextArrow, prevArrow are react componets
      nextArrow: null,
      prevArrow: null
    };

    module.exports = defaultProps;

    /***/
  },

  /***/ /***/ 559: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = undefined;

    var _reactDom = __webpack_require__(199);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _objectAssign = __webpack_require__(3);

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
      return keysArray.reduce(function(value, key) {
        return value && spec.hasOwnProperty(key);
      }, true)
        ? null
        : console.error("Keys Missing", spec);
    };

    var getTrackCSS = (exports.getTrackCSS = function getTrackCSS(spec) {
      checkSpecKeys(spec, [
        "left",
        "variableWidth",
        "slideCount",
        "slidesToShow",
        "slideWidth"
      ]);

      var trackWidth, trackHeight;

      var trackChildren = spec.slideCount + 2 * spec.slidesToShow;

      if (!spec.vertical) {
        if (spec.variableWidth) {
          trackWidth =
            (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
        } else if (spec.centerMode) {
          trackWidth =
            (spec.slideCount + 2 * (spec.slidesToShow + 1)) * spec.slideWidth;
        } else {
          trackWidth =
            (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
        }
      } else {
        trackHeight = trackChildren * spec.slideHeight;
      }

      var style = {
        opacity: 1,
        WebkitTransform: !spec.vertical
          ? "translate3d(" + spec.left + "px, 0px, 0px)"
          : "translate3d(0px, " + spec.left + "px, 0px)",
        transform: !spec.vertical
          ? "translate3d(" + spec.left + "px, 0px, 0px)"
          : "translate3d(0px, " + spec.left + "px, 0px)",
        transition: "",
        WebkitTransition: "",
        msTransform: !spec.vertical
          ? "translateX(" + spec.left + "px)"
          : "translateY(" + spec.left + "px)"
      };

      if (trackWidth) {
        (0, _objectAssign2.default)(style, { width: trackWidth });
      }

      if (trackHeight) {
        (0, _objectAssign2.default)(style, { height: trackHeight });
      }

      // Fallback for IE8
      if (window && !window.addEventListener && window.attachEvent) {
        if (!spec.vertical) {
          style.marginLeft = spec.left + "px";
        } else {
          style.marginTop = spec.left + "px";
        }
      }

      return style;
    });

    var getTrackAnimateCSS = (exports.getTrackAnimateCSS = function getTrackAnimateCSS(
      spec
    ) {
      checkSpecKeys(spec, [
        "left",
        "variableWidth",
        "slideCount",
        "slidesToShow",
        "slideWidth",
        "speed",
        "cssEase"
      ]);

      var style = getTrackCSS(spec);
      // useCSS is true by default so it can be undefined
      style.WebkitTransition =
        "-webkit-transform " + spec.speed + "ms " + spec.cssEase;
      style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
      return style;
    });

    var getTrackLeft = (exports.getTrackLeft = function getTrackLeft(spec) {
      checkSpecKeys(spec, [
        "slideIndex",
        "trackRef",
        "infinite",
        "centerMode",
        "slideCount",
        "slidesToShow",
        "slidesToScroll",
        "slideWidth",
        "listWidth",
        "variableWidth",
        "slideHeight"
      ]);

      var slideOffset = 0;
      var targetLeft;
      var targetSlide;
      var verticalOffset = 0;

      if (spec.fade) {
        return 0;
      }

      if (spec.infinite) {
        if (spec.slideCount >= spec.slidesToShow) {
          slideOffset = spec.slideWidth * spec.slidesToShow * -1;
          verticalOffset = spec.slideHeight * spec.slidesToShow * -1;
        }
        if (spec.slideCount % spec.slidesToScroll !== 0) {
          if (
            spec.slideIndex + spec.slidesToScroll > spec.slideCount &&
            spec.slideCount > spec.slidesToShow
          ) {
            if (spec.slideIndex > spec.slideCount) {
              slideOffset =
                (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) *
                spec.slideWidth *
                -1;
              verticalOffset =
                (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) *
                spec.slideHeight *
                -1;
            } else {
              slideOffset =
                spec.slideCount % spec.slidesToScroll * spec.slideWidth * -1;
              verticalOffset =
                spec.slideCount % spec.slidesToScroll * spec.slideHeight * -1;
            }
          }
        }
      } else {
        if (spec.slideCount % spec.slidesToScroll !== 0) {
          if (
            spec.slideIndex + spec.slidesToScroll > spec.slideCount &&
            spec.slideCount > spec.slidesToShow
          ) {
            var slidesToOffset =
              spec.slidesToShow - spec.slideCount % spec.slidesToScroll;
            slideOffset = slidesToOffset * spec.slideWidth;
          }
        }
      }

      if (spec.centerMode) {
        if (spec.infinite) {
          slideOffset += spec.slideWidth * Math.floor(spec.slidesToShow / 2);
        } else {
          slideOffset = spec.slideWidth * Math.floor(spec.slidesToShow / 2);
        }
      }

      if (!spec.vertical) {
        targetLeft = spec.slideIndex * spec.slideWidth * -1 + slideOffset;
      } else {
        targetLeft = spec.slideIndex * spec.slideHeight * -1 + verticalOffset;
      }

      if (spec.variableWidth === true) {
        var targetSlideIndex;
        if (spec.slideCount <= spec.slidesToShow || spec.infinite === false) {
          targetSlide = _reactDom2.default.findDOMNode(spec.trackRef)
            .childNodes[spec.slideIndex];
        } else {
          targetSlideIndex = spec.slideIndex + spec.slidesToShow;
          targetSlide = _reactDom2.default.findDOMNode(spec.trackRef)
            .childNodes[targetSlideIndex];
        }
        targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
        if (spec.centerMode === true) {
          if (spec.infinite === false) {
            targetSlide = _reactDom2.default.findDOMNode(spec.trackRef)
              .children[spec.slideIndex];
          } else {
            targetSlide = _reactDom2.default.findDOMNode(spec.trackRef)
              .children[spec.slideIndex + spec.slidesToShow + 1];
          }

          if (targetSlide) {
            targetLeft =
              targetSlide.offsetLeft * -1 +
              (spec.listWidth - targetSlide.offsetWidth) / 2;
          }
        }
      }

      return targetLeft;
    });

    /***/
  },

  /***/ /***/ 562: function(module, exports) {
    var canUseDOM = !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    );

    module.exports = canUseDOM;

    /***/
  },

  /***/ /***/ 563: function(module, exports, __webpack_require__) {
    "use strict";
    /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

    var React = __webpack_require__(12);
    var factory = __webpack_require__(289);

    if (typeof React === "undefined") {
      throw Error(
        "create-react-class could not find the React object. If you are using script tags, " +
          "make sure that React is being loaded before create-react-class."
      );
    }

    // Hack to grab NoopUpdateQueue from isomorphic React
    var ReactNoopUpdateQueue = new React.Component().updater;

    module.exports = factory(
      React.Component,
      React.isValidElement,
      ReactNoopUpdateQueue
    );

    /***/
  },

  /***/ /***/ 564: function(module, exports, __webpack_require__) {
    var QueryHandler = __webpack_require__(566);
    var each = __webpack_require__(554).each;

    /**
 * Represents a single media query, manages it's state and registered handlers for this query
 *
 * @constructor
 * @param {string} query the media query string
 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
 */
    function MediaQuery(query, isUnconditional) {
      this.query = query;
      this.isUnconditional = isUnconditional;
      this.handlers = [];
      this.mql = window.matchMedia(query);

      var self = this;
      this.listener = function(mql) {
        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
        self.mql = mql.currentTarget || mql;
        self.assess();
      };
      this.mql.addListener(this.listener);
    }

    MediaQuery.prototype = {
      constuctor: MediaQuery,

      /**
     * add a handler for this query, triggering if already active
     *
     * @param {object} handler
     * @param {function} handler.match callback for when query is activated
     * @param {function} [handler.unmatch] callback for when query is deactivated
     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
     */
      addHandler: function(handler) {
        var qh = new QueryHandler(handler);
        this.handlers.push(qh);

        this.matches() && qh.on();
      },

      /**
     * removes the given handler from the collection, and calls it's destroy methods
     *
     * @param {object || function} handler the handler to remove
     */
      removeHandler: function(handler) {
        var handlers = this.handlers;
        each(handlers, function(h, i) {
          if (h.equals(handler)) {
            h.destroy();
            return !handlers.splice(i, 1); //remove from array and exit each early
          }
        });
      },

      /**
     * Determine whether the media query should be considered a match
     *
     * @return {Boolean} true if media query can be considered a match, false otherwise
     */
      matches: function() {
        return this.mql.matches || this.isUnconditional;
      },

      /**
     * Clears all handlers and unbinds events
     */
      clear: function() {
        each(this.handlers, function(handler) {
          handler.destroy();
        });
        this.mql.removeListener(this.listener);
        this.handlers.length = 0; //clear array
      },

      /*
        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
        */
      assess: function() {
        var action = this.matches() ? "on" : "off";

        each(this.handlers, function(handler) {
          handler[action]();
        });
      }
    };

    module.exports = MediaQuery;

    /***/
  },

  /***/ /***/ 565: function(module, exports, __webpack_require__) {
    var MediaQuery = __webpack_require__(564);
    var Util = __webpack_require__(554);
    var each = Util.each;
    var isFunction = Util.isFunction;
    var isArray = Util.isArray;

    /**
 * Allows for registration of query handlers.
 * Manages the query handler's state and is responsible for wiring up browser events
 *
 * @constructor
 */
    function MediaQueryDispatch() {
      if (!window.matchMedia) {
        throw new Error(
          "matchMedia not present, legacy browsers require a polyfill"
        );
      }

      this.queries = {};
      this.browserIsIncapable = !window.matchMedia("only all").matches;
    }

    MediaQueryDispatch.prototype = {
      constructor: MediaQueryDispatch,

      /**
     * Registers a handler for the given media query
     *
     * @param {string} q the media query
     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
     * @param {function} options.match fired when query matched
     * @param {function} [options.unmatch] fired when a query is no longer matched
     * @param {function} [options.setup] fired when handler first triggered
     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
     */
      register: function(q, options, shouldDegrade) {
        var queries = this.queries,
          isUnconditional = shouldDegrade && this.browserIsIncapable;

        if (!queries[q]) {
          queries[q] = new MediaQuery(q, isUnconditional);
        }

        //normalise to object in an array
        if (isFunction(options)) {
          options = { match: options };
        }
        if (!isArray(options)) {
          options = [options];
        }
        each(options, function(handler) {
          if (isFunction(handler)) {
            handler = { match: handler };
          }
          queries[q].addHandler(handler);
        });

        return this;
      },

      /**
     * unregisters a query and all it's handlers, or a specific handler for a query
     *
     * @param {string} q the media query to target
     * @param {object || function} [handler] specific handler to unregister
     */
      unregister: function(q, handler) {
        var query = this.queries[q];

        if (query) {
          if (handler) {
            query.removeHandler(handler);
          } else {
            query.clear();
            delete this.queries[q];
          }
        }

        return this;
      }
    };

    module.exports = MediaQueryDispatch;

    /***/
  },

  /***/ /***/ 566: function(module, exports) {
    /**
 * Delegate to handle a media query being matched and unmatched.
 *
 * @param {object} options
 * @param {function} options.match callback for when the media query is matched
 * @param {function} [options.unmatch] callback for when the media query is unmatched
 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
 * @constructor
 */
    function QueryHandler(options) {
      this.options = options;
      !options.deferSetup && this.setup();
    }

    QueryHandler.prototype = {
      constructor: QueryHandler,

      /**
     * coordinates setup of the handler
     *
     * @function
     */
      setup: function() {
        if (this.options.setup) {
          this.options.setup();
        }
        this.initialised = true;
      },

      /**
     * coordinates setup and triggering of the handler
     *
     * @function
     */
      on: function() {
        !this.initialised && this.setup();
        this.options.match && this.options.match();
      },

      /**
     * coordinates the unmatch event for the handler
     *
     * @function
     */
      off: function() {
        this.options.unmatch && this.options.unmatch();
      },

      /**
     * called when a handler is to be destroyed.
     * delegates to the destroy or unmatch callbacks, depending on availability.
     *
     * @function
     */
      destroy: function() {
        this.options.destroy ? this.options.destroy() : this.off();
      },

      /**
     * determines equality by reference.
     * if object is supplied compare options, if function, compare match callback
     *
     * @function
     * @param {object || function} [target] the target for comparison
     */
      equals: function(target) {
        return this.options === target || this.options.match === target;
      }
    };

    module.exports = QueryHandler;

    /***/
  },

  /***/ /***/ 567: function(module, exports, __webpack_require__) {
    var MediaQueryDispatch = __webpack_require__(565);
    module.exports = new MediaQueryDispatch();

    /***/
  },

  /***/ /***/ 568: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _typeof =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _warning = __webpack_require__(541);

    var _warning2 = _interopRequireDefault(_warning);

    var _invariant = __webpack_require__(545);

    var _invariant2 = _interopRequireDefault(_invariant);

    var _LocationUtils = __webpack_require__(546);

    var _PathUtils = __webpack_require__(542);

    var _createTransitionManager = __webpack_require__(547);

    var _createTransitionManager2 = _interopRequireDefault(
      _createTransitionManager
    );

    var _DOMUtils = __webpack_require__(555);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var PopStateEvent = "popstate";
    var HashChangeEvent = "hashchange";

    var getHistoryState = function getHistoryState() {
      try {
        return window.history.state || {};
      } catch (e) {
        // IE 11 sometimes throws when accessing window.history.state
        // See https://github.com/ReactTraining/history/pull/289
        return {};
      }
    };

    /**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
    var createBrowserHistory = function createBrowserHistory() {
      var props =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _invariant2.default)(
        _DOMUtils.canUseDOM,
        "Browser history needs a DOM"
      );

      var globalHistory = window.history;
      var canUseHistory = (0, _DOMUtils.supportsHistory)();
      var needsHashChangeListener = !(
        0,
        _DOMUtils.supportsPopStateOnHashChange
      )();

      var _props$forceRefresh = props.forceRefresh,
        forceRefresh =
          _props$forceRefresh === undefined ? false : _props$forceRefresh,
        _props$getUserConfirm = props.getUserConfirmation,
        getUserConfirmation =
          _props$getUserConfirm === undefined
            ? _DOMUtils.getConfirmation
            : _props$getUserConfirm,
        _props$keyLength = props.keyLength,
        keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

      var basename = props.basename
        ? (0, _PathUtils.stripTrailingSlash)(
            (0, _PathUtils.addLeadingSlash)(props.basename)
          )
        : "";

      var getDOMLocation = function getDOMLocation(historyState) {
        var _ref = historyState || {},
          key = _ref.key,
          state = _ref.state;

        var _window$location = window.location,
          pathname = _window$location.pathname,
          search = _window$location.search,
          hash = _window$location.hash;

        var path = pathname + search + hash;

        (0, _warning2.default)(
          !basename || (0, _PathUtils.hasBasename)(path, basename),
          "You are attempting to use a basename on a page whose URL path does not begin " +
            'with the basename. Expected path "' +
            path +
            '" to begin with "' +
            basename +
            '".'
        );

        if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

        return (0, _LocationUtils.createLocation)(path, state, key);
      };

      var createKey = function createKey() {
        return Math.random().toString(36).substr(2, keyLength);
      };

      var transitionManager = (0, _createTransitionManager2.default)();

      var setState = function setState(nextState) {
        _extends(history, nextState);

        history.length = globalHistory.length;

        transitionManager.notifyListeners(history.location, history.action);
      };

      var handlePopState = function handlePopState(event) {
        // Ignore extraneous popstate events in WebKit.
        if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

        handlePop(getDOMLocation(event.state));
      };

      var handleHashChange = function handleHashChange() {
        handlePop(getDOMLocation(getHistoryState()));
      };

      var forceNextPop = false;

      var handlePop = function handlePop(location) {
        if (forceNextPop) {
          forceNextPop = false;
          setState();
        } else {
          var action = "POP";

          transitionManager.confirmTransitionTo(
            location,
            action,
            getUserConfirmation,
            function(ok) {
              if (ok) {
                setState({ action: action, location: location });
              } else {
                revertPop(location);
              }
            }
          );
        }
      };

      var revertPop = function revertPop(fromLocation) {
        var toLocation = history.location;

        // TODO: We could probably make this more reliable by
        // keeping a list of keys we've seen in sessionStorage.
        // Instead, we just default to 0 for keys we don't know.

        var toIndex = allKeys.indexOf(toLocation.key);

        if (toIndex === -1) toIndex = 0;

        var fromIndex = allKeys.indexOf(fromLocation.key);

        if (fromIndex === -1) fromIndex = 0;

        var delta = toIndex - fromIndex;

        if (delta) {
          forceNextPop = true;
          go(delta);
        }
      };

      var initialLocation = getDOMLocation(getHistoryState());
      var allKeys = [initialLocation.key];

      // Public interface

      var createHref = function createHref(location) {
        return basename + (0, _PathUtils.createPath)(location);
      };

      var push = function push(path, state) {
        (0, _warning2.default)(
          !(
            (typeof path === "undefined" ? "undefined" : _typeof(path)) ===
              "object" &&
            path.state !== undefined &&
            state !== undefined
          ),
          "You should avoid providing a 2nd state argument to push when the 1st " +
            "argument is a location-like object that already has state; it is ignored"
        );

        var action = "PUSH";
        var location = (0, _LocationUtils.createLocation)(
          path,
          state,
          createKey(),
          history.location
        );

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (!ok) return;

            var href = createHref(location);
            var key = location.key,
              state = location.state;

            if (canUseHistory) {
              globalHistory.pushState({ key: key, state: state }, null, href);

              if (forceRefresh) {
                window.location.href = href;
              } else {
                var prevIndex = allKeys.indexOf(history.location.key);
                var nextKeys = allKeys.slice(
                  0,
                  prevIndex === -1 ? 0 : prevIndex + 1
                );

                nextKeys.push(location.key);
                allKeys = nextKeys;

                setState({ action: action, location: location });
              }
            } else {
              (0, _warning2.default)(
                state === undefined,
                "Browser history cannot push state in browsers that do not support HTML5 history"
              );

              window.location.href = href;
            }
          }
        );
      };

      var replace = function replace(path, state) {
        (0, _warning2.default)(
          !(
            (typeof path === "undefined" ? "undefined" : _typeof(path)) ===
              "object" &&
            path.state !== undefined &&
            state !== undefined
          ),
          "You should avoid providing a 2nd state argument to replace when the 1st " +
            "argument is a location-like object that already has state; it is ignored"
        );

        var action = "REPLACE";
        var location = (0, _LocationUtils.createLocation)(
          path,
          state,
          createKey(),
          history.location
        );

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (!ok) return;

            var href = createHref(location);
            var key = location.key,
              state = location.state;

            if (canUseHistory) {
              globalHistory.replaceState(
                { key: key, state: state },
                null,
                href
              );

              if (forceRefresh) {
                window.location.replace(href);
              } else {
                var prevIndex = allKeys.indexOf(history.location.key);

                if (prevIndex !== -1) allKeys[prevIndex] = location.key;

                setState({ action: action, location: location });
              }
            } else {
              (0, _warning2.default)(
                state === undefined,
                "Browser history cannot replace state in browsers that do not support HTML5 history"
              );

              window.location.replace(href);
            }
          }
        );
      };

      var go = function go(n) {
        globalHistory.go(n);
      };

      var goBack = function goBack() {
        return go(-1);
      };

      var goForward = function goForward() {
        return go(1);
      };

      var listenerCount = 0;

      var checkDOMListeners = function checkDOMListeners(delta) {
        listenerCount += delta;

        if (listenerCount === 1) {
          (0, _DOMUtils.addEventListener)(
            window,
            PopStateEvent,
            handlePopState
          );

          if (needsHashChangeListener)
            (0, _DOMUtils.addEventListener)(
              window,
              HashChangeEvent,
              handleHashChange
            );
        } else if (listenerCount === 0) {
          (0, _DOMUtils.removeEventListener)(
            window,
            PopStateEvent,
            handlePopState
          );

          if (needsHashChangeListener)
            (0, _DOMUtils.removeEventListener)(
              window,
              HashChangeEvent,
              handleHashChange
            );
        }
      };

      var isBlocked = false;

      var block = function block() {
        var prompt =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;

        var unblock = transitionManager.setPrompt(prompt);

        if (!isBlocked) {
          checkDOMListeners(1);
          isBlocked = true;
        }

        return function() {
          if (isBlocked) {
            isBlocked = false;
            checkDOMListeners(-1);
          }

          return unblock();
        };
      };

      var listen = function listen(listener) {
        var unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);

        return function() {
          checkDOMListeners(-1);
          unlisten();
        };
      };

      var history = {
        length: globalHistory.length,
        action: "POP",
        location: initialLocation,
        createHref: createHref,
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
        block: block,
        listen: listen
      };

      return history;
    };

    exports.default = createBrowserHistory;

    /***/
  },

  /***/ /***/ 569: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _warning = __webpack_require__(541);

    var _warning2 = _interopRequireDefault(_warning);

    var _invariant = __webpack_require__(545);

    var _invariant2 = _interopRequireDefault(_invariant);

    var _LocationUtils = __webpack_require__(546);

    var _PathUtils = __webpack_require__(542);

    var _createTransitionManager = __webpack_require__(547);

    var _createTransitionManager2 = _interopRequireDefault(
      _createTransitionManager
    );

    var _DOMUtils = __webpack_require__(555);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var HashChangeEvent = "hashchange";

    var HashPathCoders = {
      hashbang: {
        encodePath: function encodePath(path) {
          return path.charAt(0) === "!"
            ? path
            : "!/" + (0, _PathUtils.stripLeadingSlash)(path);
        },
        decodePath: function decodePath(path) {
          return path.charAt(0) === "!" ? path.substr(1) : path;
        }
      },
      noslash: {
        encodePath: _PathUtils.stripLeadingSlash,
        decodePath: _PathUtils.addLeadingSlash
      },
      slash: {
        encodePath: _PathUtils.addLeadingSlash,
        decodePath: _PathUtils.addLeadingSlash
      }
    };

    var getHashPath = function getHashPath() {
      // We can't use window.location.hash here because it's not
      // consistent across browsers - Firefox will pre-decode it!
      var href = window.location.href;
      var hashIndex = href.indexOf("#");
      return hashIndex === -1 ? "" : href.substring(hashIndex + 1);
    };

    var pushHashPath = function pushHashPath(path) {
      return (window.location.hash = path);
    };

    var replaceHashPath = function replaceHashPath(path) {
      var hashIndex = window.location.href.indexOf("#");

      window.location.replace(
        window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) +
          "#" +
          path
      );
    };

    var createHashHistory = function createHashHistory() {
      var props =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _invariant2.default)(_DOMUtils.canUseDOM, "Hash history needs a DOM");

      var globalHistory = window.history;
      var canGoWithoutReload = (
        0,
        _DOMUtils.supportsGoWithoutReloadUsingHash
      )();

      var _props$getUserConfirm = props.getUserConfirmation,
        getUserConfirmation =
          _props$getUserConfirm === undefined
            ? _DOMUtils.getConfirmation
            : _props$getUserConfirm,
        _props$hashType = props.hashType,
        hashType = _props$hashType === undefined ? "slash" : _props$hashType;

      var basename = props.basename
        ? (0, _PathUtils.stripTrailingSlash)(
            (0, _PathUtils.addLeadingSlash)(props.basename)
          )
        : "";

      var _HashPathCoders$hashT = HashPathCoders[hashType],
        encodePath = _HashPathCoders$hashT.encodePath,
        decodePath = _HashPathCoders$hashT.decodePath;

      var getDOMLocation = function getDOMLocation() {
        var path = decodePath(getHashPath());

        (0, _warning2.default)(
          !basename || (0, _PathUtils.hasBasename)(path, basename),
          "You are attempting to use a basename on a page whose URL path does not begin " +
            'with the basename. Expected path "' +
            path +
            '" to begin with "' +
            basename +
            '".'
        );

        if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

        return (0, _LocationUtils.createLocation)(path);
      };

      var transitionManager = (0, _createTransitionManager2.default)();

      var setState = function setState(nextState) {
        _extends(history, nextState);

        history.length = globalHistory.length;

        transitionManager.notifyListeners(history.location, history.action);
      };

      var forceNextPop = false;
      var ignorePath = null;

      var handleHashChange = function handleHashChange() {
        var path = getHashPath();
        var encodedPath = encodePath(path);

        if (path !== encodedPath) {
          // Ensure we always have a properly-encoded hash.
          replaceHashPath(encodedPath);
        } else {
          var location = getDOMLocation();
          var prevLocation = history.location;

          if (
            !forceNextPop &&
            (0, _LocationUtils.locationsAreEqual)(prevLocation, location)
          )
            return; // A hashchange doesn't always == location change.

          if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

          ignorePath = null;

          handlePop(location);
        }
      };

      var handlePop = function handlePop(location) {
        if (forceNextPop) {
          forceNextPop = false;
          setState();
        } else {
          var action = "POP";

          transitionManager.confirmTransitionTo(
            location,
            action,
            getUserConfirmation,
            function(ok) {
              if (ok) {
                setState({ action: action, location: location });
              } else {
                revertPop(location);
              }
            }
          );
        }
      };

      var revertPop = function revertPop(fromLocation) {
        var toLocation = history.location;

        // TODO: We could probably make this more reliable by
        // keeping a list of paths we've seen in sessionStorage.
        // Instead, we just default to 0 for paths we don't know.

        var toIndex = allPaths.lastIndexOf(
          (0, _PathUtils.createPath)(toLocation)
        );

        if (toIndex === -1) toIndex = 0;

        var fromIndex = allPaths.lastIndexOf(
          (0, _PathUtils.createPath)(fromLocation)
        );

        if (fromIndex === -1) fromIndex = 0;

        var delta = toIndex - fromIndex;

        if (delta) {
          forceNextPop = true;
          go(delta);
        }
      };

      // Ensure the hash is encoded properly before doing anything else.
      var path = getHashPath();
      var encodedPath = encodePath(path);

      if (path !== encodedPath) replaceHashPath(encodedPath);

      var initialLocation = getDOMLocation();
      var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

      // Public interface

      var createHref = function createHref(location) {
        return (
          "#" + encodePath(basename + (0, _PathUtils.createPath)(location))
        );
      };

      var push = function push(path, state) {
        (0, _warning2.default)(
          state === undefined,
          "Hash history cannot push state; it is ignored"
        );

        var action = "PUSH";
        var location = (0, _LocationUtils.createLocation)(
          path,
          undefined,
          undefined,
          history.location
        );

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (!ok) return;

            var path = (0, _PathUtils.createPath)(location);
            var encodedPath = encodePath(basename + path);
            var hashChanged = getHashPath() !== encodedPath;

            if (hashChanged) {
              // We cannot tell if a hashchange was caused by a PUSH, so we'd
              // rather setState here and ignore the hashchange. The caveat here
              // is that other hash histories in the page will consider it a POP.
              ignorePath = path;
              pushHashPath(encodedPath);

              var prevIndex = allPaths.lastIndexOf(
                (0, _PathUtils.createPath)(history.location)
              );
              var nextPaths = allPaths.slice(
                0,
                prevIndex === -1 ? 0 : prevIndex + 1
              );

              nextPaths.push(path);
              allPaths = nextPaths;

              setState({ action: action, location: location });
            } else {
              (0, _warning2.default)(
                false,
                "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"
              );

              setState();
            }
          }
        );
      };

      var replace = function replace(path, state) {
        (0, _warning2.default)(
          state === undefined,
          "Hash history cannot replace state; it is ignored"
        );

        var action = "REPLACE";
        var location = (0, _LocationUtils.createLocation)(
          path,
          undefined,
          undefined,
          history.location
        );

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (!ok) return;

            var path = (0, _PathUtils.createPath)(location);
            var encodedPath = encodePath(basename + path);
            var hashChanged = getHashPath() !== encodedPath;

            if (hashChanged) {
              // We cannot tell if a hashchange was caused by a REPLACE, so we'd
              // rather setState here and ignore the hashchange. The caveat here
              // is that other hash histories in the page will consider it a POP.
              ignorePath = path;
              replaceHashPath(encodedPath);
            }

            var prevIndex = allPaths.indexOf(
              (0, _PathUtils.createPath)(history.location)
            );

            if (prevIndex !== -1) allPaths[prevIndex] = path;

            setState({ action: action, location: location });
          }
        );
      };

      var go = function go(n) {
        (0, _warning2.default)(
          canGoWithoutReload,
          "Hash history go(n) causes a full page reload in this browser"
        );

        globalHistory.go(n);
      };

      var goBack = function goBack() {
        return go(-1);
      };

      var goForward = function goForward() {
        return go(1);
      };

      var listenerCount = 0;

      var checkDOMListeners = function checkDOMListeners(delta) {
        listenerCount += delta;

        if (listenerCount === 1) {
          (0, _DOMUtils.addEventListener)(
            window,
            HashChangeEvent,
            handleHashChange
          );
        } else if (listenerCount === 0) {
          (0, _DOMUtils.removeEventListener)(
            window,
            HashChangeEvent,
            handleHashChange
          );
        }
      };

      var isBlocked = false;

      var block = function block() {
        var prompt =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;

        var unblock = transitionManager.setPrompt(prompt);

        if (!isBlocked) {
          checkDOMListeners(1);
          isBlocked = true;
        }

        return function() {
          if (isBlocked) {
            isBlocked = false;
            checkDOMListeners(-1);
          }

          return unblock();
        };
      };

      var listen = function listen(listener) {
        var unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);

        return function() {
          checkDOMListeners(-1);
          unlisten();
        };
      };

      var history = {
        length: globalHistory.length,
        action: "POP",
        location: initialLocation,
        createHref: createHref,
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
        block: block,
        listen: listen
      };

      return history;
    };

    exports.default = createHashHistory;

    /***/
  },

  /***/ /***/ 570: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _typeof =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _warning = __webpack_require__(541);

    var _warning2 = _interopRequireDefault(_warning);

    var _PathUtils = __webpack_require__(542);

    var _LocationUtils = __webpack_require__(546);

    var _createTransitionManager = __webpack_require__(547);

    var _createTransitionManager2 = _interopRequireDefault(
      _createTransitionManager
    );

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var clamp = function clamp(n, lowerBound, upperBound) {
      return Math.min(Math.max(n, lowerBound), upperBound);
    };

    /**
 * Creates a history object that stores locations in memory.
 */
    var createMemoryHistory = function createMemoryHistory() {
      var props =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var getUserConfirmation = props.getUserConfirmation,
        _props$initialEntries = props.initialEntries,
        initialEntries =
          _props$initialEntries === undefined ? ["/"] : _props$initialEntries,
        _props$initialIndex = props.initialIndex,
        initialIndex =
          _props$initialIndex === undefined ? 0 : _props$initialIndex,
        _props$keyLength = props.keyLength,
        keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

      var transitionManager = (0, _createTransitionManager2.default)();

      var setState = function setState(nextState) {
        _extends(history, nextState);

        history.length = history.entries.length;

        transitionManager.notifyListeners(history.location, history.action);
      };

      var createKey = function createKey() {
        return Math.random().toString(36).substr(2, keyLength);
      };

      var index = clamp(initialIndex, 0, initialEntries.length - 1);
      var entries = initialEntries.map(function(entry) {
        return typeof entry === "string"
          ? (0, _LocationUtils.createLocation)(entry, undefined, createKey())
          : (0, _LocationUtils.createLocation)(
              entry,
              undefined,
              entry.key || createKey()
            );
      });

      // Public interface

      var createHref = _PathUtils.createPath;

      var push = function push(path, state) {
        (0, _warning2.default)(
          !(
            (typeof path === "undefined" ? "undefined" : _typeof(path)) ===
              "object" &&
            path.state !== undefined &&
            state !== undefined
          ),
          "You should avoid providing a 2nd state argument to push when the 1st " +
            "argument is a location-like object that already has state; it is ignored"
        );

        var action = "PUSH";
        var location = (0, _LocationUtils.createLocation)(
          path,
          state,
          createKey(),
          history.location
        );

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (!ok) return;

            var prevIndex = history.index;
            var nextIndex = prevIndex + 1;

            var nextEntries = history.entries.slice(0);
            if (nextEntries.length > nextIndex) {
              nextEntries.splice(
                nextIndex,
                nextEntries.length - nextIndex,
                location
              );
            } else {
              nextEntries.push(location);
            }

            setState({
              action: action,
              location: location,
              index: nextIndex,
              entries: nextEntries
            });
          }
        );
      };

      var replace = function replace(path, state) {
        (0, _warning2.default)(
          !(
            (typeof path === "undefined" ? "undefined" : _typeof(path)) ===
              "object" &&
            path.state !== undefined &&
            state !== undefined
          ),
          "You should avoid providing a 2nd state argument to replace when the 1st " +
            "argument is a location-like object that already has state; it is ignored"
        );

        var action = "REPLACE";
        var location = (0, _LocationUtils.createLocation)(
          path,
          state,
          createKey(),
          history.location
        );

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (!ok) return;

            history.entries[history.index] = location;

            setState({ action: action, location: location });
          }
        );
      };

      var go = function go(n) {
        var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

        var action = "POP";
        var location = history.entries[nextIndex];

        transitionManager.confirmTransitionTo(
          location,
          action,
          getUserConfirmation,
          function(ok) {
            if (ok) {
              setState({
                action: action,
                location: location,
                index: nextIndex
              });
            } else {
              // Mimic the behavior of DOM histories by
              // causing a render after a cancelled POP.
              setState();
            }
          }
        );
      };

      var goBack = function goBack() {
        return go(-1);
      };

      var goForward = function goForward() {
        return go(1);
      };

      var canGo = function canGo(n) {
        var nextIndex = history.index + n;
        return nextIndex >= 0 && nextIndex < history.entries.length;
      };

      var block = function block() {
        var prompt =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;
        return transitionManager.setPrompt(prompt);
      };

      var listen = function listen(listener) {
        return transitionManager.appendListener(listener);
      };

      var history = {
        length: entries.length,
        action: "POP",
        location: entries[index],
        index: index,
        entries: entries,
        createHref: createHref,
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
        canGo: canGo,
        block: block,
        listen: listen
      };

      return history;
    };

    exports.default = createMemoryHistory;

    /***/
  },

  /***/ /***/ 571: function(module, exports, __webpack_require__) {
    "use strict";
    /**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

    var REACT_STATICS = {
      childContextTypes: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };

    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      arguments: true,
      arity: true
    };

    var isGetOwnPropertySymbolsAvailable =
      typeof Object.getOwnPropertySymbols === "function";

    module.exports = function hoistNonReactStatics(
      targetComponent,
      sourceComponent,
      customStatics
    ) {
      if (typeof sourceComponent !== "string") {
        // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
          keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
          if (
            !REACT_STATICS[keys[i]] &&
            !KNOWN_STATICS[keys[i]] &&
            (!customStatics || !customStatics[keys[i]])
          ) {
            try {
              targetComponent[keys[i]] = sourceComponent[keys[i]];
            } catch (error) {}
          }
        }
      }

      return targetComponent;
    };

    /***/
  },

  /***/ /***/ 572: function(module, exports) {
    module.exports =
      Array.isArray ||
      function(arr) {
        return Object.prototype.toString.call(arr) == "[object Array]";
      };

    /***/
  },

  /***/ /***/ 573: function(module, exports, __webpack_require__) {
    var camel2hyphen = __webpack_require__(614);

    var isDimension = function(feature) {
      var re = /[height|width]$/;
      return re.test(feature);
    };

    var obj2mq = function(obj) {
      var mq = "";
      var features = Object.keys(obj);
      features.forEach(function(feature, index) {
        var value = obj[feature];
        feature = camel2hyphen(feature);
        // Add px to dimension features
        if (isDimension(feature) && typeof value === "number") {
          value = value + "px";
        }
        if (value === true) {
          mq += feature;
        } else if (value === false) {
          mq += "not " + feature;
        } else {
          mq += "(" + feature + ": " + value + ")";
        }
        if (index < features.length - 1) {
          mq += " and ";
        }
      });
      return mq;
    };

    var json2mq = function(query) {
      var mq = "";
      if (typeof query === "string") {
        return query;
      }
      // Handling array of media queries
      if (query instanceof Array) {
        query.forEach(function(q, index) {
          mq += obj2mq(q);
          if (index < query.length - 1) {
            mq += ", ";
          }
        });
        return mq;
      }
      // Handling single media query
      return obj2mq(query);
    };

    module.exports = json2mq;

    /***/
  },

  /***/ /***/ 581: function(module, exports, __webpack_require__) {
    var isarray = __webpack_require__(572);

    /**
 * Expose `pathToRegexp`.
 */
    module.exports = pathToRegexp;
    module.exports.parse = parse;
    module.exports.compile = compile;
    module.exports.tokensToFunction = tokensToFunction;
    module.exports.tokensToRegExp = tokensToRegExp;

    /**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
    var PATH_REGEXP = new RegExp(
      [
        // Match escaped characters that would otherwise appear in future matches.
        // This allows the user to escape special characters that won't transform.
        "(\\\\.)",
        // Match Express-style parameters and un-named parameters with a prefix
        // and optional suffixes. Matches appear as:
        //
        // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
        // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
        // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
        "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
      ].join("|"),
      "g"
    );

    /**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
    function parse(str, options) {
      var tokens = [];
      var key = 0;
      var index = 0;
      var path = "";
      var defaultDelimiter = (options && options.delimiter) || "/";
      var res;

      while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;

        // Ignore already escaped sequences.
        if (escaped) {
          path += escaped[1];
          continue;
        }

        var next = str[index];
        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var modifier = res[6];
        var asterisk = res[7];

        // Push the current path onto the tokens.
        if (path) {
          tokens.push(path);
          path = "";
        }

        var partial = prefix != null && next != null && next !== prefix;
        var repeat = modifier === "+" || modifier === "*";
        var optional = modifier === "?" || modifier === "*";
        var delimiter = res[2] || defaultDelimiter;
        var pattern = capture || group;

        tokens.push({
          name: name || key++,
          prefix: prefix || "",
          delimiter: delimiter,
          optional: optional,
          repeat: repeat,
          partial: partial,
          asterisk: !!asterisk,
          pattern: pattern
            ? escapeGroup(pattern)
            : asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?"
        });
      }

      // Match any characters still remaining.
      if (index < str.length) {
        path += str.substr(index);
      }

      // If the path exists, push it onto the end.
      if (path) {
        tokens.push(path);
      }

      return tokens;
    }

    /**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
    function compile(str, options) {
      return tokensToFunction(parse(str, options));
    }

    /**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
    function encodeURIComponentPretty(str) {
      return encodeURI(str).replace(/[\/?#]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
      });
    }

    /**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
    function encodeAsterisk(str) {
      return encodeURI(str).replace(/[?#]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
      });
    }

    /**
 * Expose a method for transforming tokens into the path function.
 */
    function tokensToFunction(tokens) {
      // Compile all the tokens into regexps.
      var matches = new Array(tokens.length);

      // Compile all the patterns before compilation.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === "object") {
          matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$");
        }
      }

      return function(obj, opts) {
        var path = "";
        var data = obj || {};
        var options = opts || {};
        var encode = options.pretty
          ? encodeURIComponentPretty
          : encodeURIComponent;

        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === "string") {
            path += token;

            continue;
          }

          var value = data[token.name];
          var segment;

          if (value == null) {
            if (token.optional) {
              // Prepend partial segment prefixes.
              if (token.partial) {
                path += token.prefix;
              }

              continue;
            } else {
              throw new TypeError(
                'Expected "' + token.name + '" to be defined'
              );
            }
          }

          if (isarray(value)) {
            if (!token.repeat) {
              throw new TypeError(
                'Expected "' +
                  token.name +
                  '" to not repeat, but received `' +
                  JSON.stringify(value) +
                  "`"
              );
            }

            if (value.length === 0) {
              if (token.optional) {
                continue;
              } else {
                throw new TypeError(
                  'Expected "' + token.name + '" to not be empty'
                );
              }
            }

            for (var j = 0; j < value.length; j++) {
              segment = encode(value[j]);

              if (!matches[i].test(segment)) {
                throw new TypeError(
                  'Expected all "' +
                    token.name +
                    '" to match "' +
                    token.pattern +
                    '", but received `' +
                    JSON.stringify(segment) +
                    "`"
                );
              }

              path += (j === 0 ? token.prefix : token.delimiter) + segment;
            }

            continue;
          }

          segment = token.asterisk ? encodeAsterisk(value) : encode(value);

          if (!matches[i].test(segment)) {
            throw new TypeError(
              'Expected "' +
                token.name +
                '" to match "' +
                token.pattern +
                '", but received "' +
                segment +
                '"'
            );
          }

          path += token.prefix + segment;
        }

        return path;
      };
    }

    /**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
    }

    /**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
    function escapeGroup(group) {
      return group.replace(/([=!:$\/()])/g, "\\$1");
    }

    /**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
    function attachKeys(re, keys) {
      re.keys = keys;
      return re;
    }

    /**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
    function flags(options) {
      return options.sensitive ? "" : "i";
    }

    /**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
    function regexpToRegexp(path, keys) {
      // Use a negative lookahead to match only capturing groups.
      var groups = path.source.match(/\((?!\?)/g);

      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: null,
            delimiter: null,
            optional: false,
            repeat: false,
            partial: false,
            asterisk: false,
            pattern: null
          });
        }
      }

      return attachKeys(path, keys);
    }

    /**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
    function arrayToRegexp(path, keys, options) {
      var parts = [];

      for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
      }

      var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));

      return attachKeys(regexp, keys);
    }

    /**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
    function stringToRegexp(path, keys, options) {
      return tokensToRegExp(parse(path, options), keys, options);
    }

    /**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
    function tokensToRegExp(tokens, keys, options) {
      if (!isarray(keys)) {
        options /** @type {!Object} */ = keys || options;
        keys = [];
      }

      options = options || {};

      var strict = options.strict;
      var end = options.end !== false;
      var route = "";

      // Iterate over the tokens and create our regexp string.
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === "string") {
          route += escapeString(token);
        } else {
          var prefix = escapeString(token.prefix);
          var capture = "(?:" + token.pattern + ")";

          keys.push(token);

          if (token.repeat) {
            capture += "(?:" + prefix + capture + ")*";
          }

          if (token.optional) {
            if (!token.partial) {
              capture = "(?:" + prefix + "(" + capture + "))?";
            } else {
              capture = prefix + "(" + capture + ")?";
            }
          } else {
            capture = prefix + "(" + capture + ")";
          }

          route += capture;
        }
      }

      var delimiter = escapeString(options.delimiter || "/");
      var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

      // In non-strict mode we allow a slash at the end of match. If the path to
      // match already ends with a slash, we remove it for consistency. The slash
      // is valid at the end of a path match, not in the middle. This is important
      // in non-ending mode, where "/test/" shouldn't match "/test//route".
      if (!strict) {
        route =
          (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) +
          "(?:" +
          delimiter +
          "(?=$))?";
      }

      if (end) {
        route += "$";
      } else {
        // In non-ending mode, we need the capturing groups to match as much as
        // possible by using a positive lookahead to the end or next path segment.
        route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
      }

      return attachKeys(new RegExp("^" + route, flags(options)), keys);
    }

    /**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
    function pathToRegexp(path, keys, options) {
      if (!isarray(keys)) {
        options /** @type {!Object} */ = keys || options;
        keys = [];
      }

      options = options || {};

      if (path instanceof RegExp) {
        return regexpToRegexp(path /** @type {!Array} */, keys);
      }

      if (isarray(path)) {
        return arrayToRegexp /** @type {!Array} */(
          path /** @type {!Array} */,
          keys,
          options
        );
      }

      return stringToRegexp /** @type {string} */(
        path /** @type {!Array} */,
        keys,
        options
      );
    }

    /***/
  },

  /***/ /***/ 588: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory__ = __webpack_require__(
      568
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(
      540
    );
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for a <Router> that uses HTML5 history.
 */

    var BrowserRouter = (function(_React$Component) {
      _inherits(BrowserRouter, _React$Component);

      function BrowserRouter() {
        var _temp, _this, _ret;

        _classCallCheck(this, BrowserRouter);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.history = __WEBPACK_IMPORTED_MODULE_2_history_createBrowserHistory___default()(
            _this.props
          )),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      BrowserRouter.prototype.render = function render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_router__["e" /* Router */],
          { history: this.history, children: this.props.children }
        );
      };

      return BrowserRouter;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    BrowserRouter.propTypes = {
      basename: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      forceRefresh: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      getUserConfirmation:
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      keyLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
    };

    /* harmony default export */ __webpack_exports__["a"] = BrowserRouter;

    /***/
  },

  /***/ /***/ 589: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory__ = __webpack_require__(
      569
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(
      540
    );
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for a <Router> that uses window.location.hash.
 */

    var HashRouter = (function(_React$Component) {
      _inherits(HashRouter, _React$Component);

      function HashRouter() {
        var _temp, _this, _ret;

        _classCallCheck(this, HashRouter);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.history = __WEBPACK_IMPORTED_MODULE_2_history_createHashHistory___default()(
            _this.props
          )),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      HashRouter.prototype.render = function render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_router__["e" /* Router */],
          { history: this.history, children: this.props.children }
        );
      };

      return HashRouter;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    HashRouter.propTypes = {
      basename: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      getUserConfirmation:
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      hashType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([
        "hashbang",
        "noslash",
        "slash"
      ]),
      children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
    };

    /* harmony default export */ __webpack_exports__["a"] = HashRouter;

    /***/
  },

  /***/ /***/ 590: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["i"];
      }
    );

    /***/
  },

  /***/ /***/ 591: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(
      540
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(
      556
    );
    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _typeof =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };

    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }

    /**
 * A <Link> wrapper that knows if it's "active" or not.
 */
    var NavLink = function NavLink(_ref) {
      var to = _ref.to,
        exact = _ref.exact,
        strict = _ref.strict,
        location = _ref.location,
        activeClassName = _ref.activeClassName,
        className = _ref.className,
        activeStyle = _ref.activeStyle,
        style = _ref.style,
        getIsActive = _ref.isActive,
        rest = _objectWithoutProperties(_ref, [
          "to",
          "exact",
          "strict",
          "location",
          "activeClassName",
          "className",
          "activeStyle",
          "style",
          "isActive"
        ]);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_router__["f" /* Route */],
        {
          path:
            (typeof to === "undefined" ? "undefined" : _typeof(to)) === "object"
              ? to.pathname
              : to,
          exact: exact,
          strict: strict,
          location: location,
          children: function children(_ref2) {
            var location = _ref2.location,
              match = _ref2.match;

            var isActive = !!(getIsActive
              ? getIsActive(match, location)
              : match);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */],
              _extends(
                {
                  to: to,
                  className: isActive
                    ? [activeClassName, className]
                        .filter(function(i) {
                          return i;
                        })
                        .join(" ")
                    : className,
                  style: isActive ? _extends({}, style, activeStyle) : style
                },
                rest
              )
            );
          }
        }
      );
    };

    NavLink.propTypes = {
      to: __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */].propTypes.to,
      exact: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      strict: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
      activeClassName:
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      activeStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
      style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
      isActive: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
    };

    NavLink.defaultProps = {
      activeClassName: "active"
    };

    /* harmony default export */ __webpack_exports__["a"] = NavLink;

    /***/
  },

  /***/ /***/ 592: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["h"];
      }
    );

    /***/
  },

  /***/ /***/ 593: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["g"];
      }
    );

    /***/
  },

  /***/ /***/ 594: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["f"];
      }
    );

    /***/
  },

  /***/ /***/ 595: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["e"];
      }
    );

    /***/
  },

  /***/ /***/ 596: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["d"];
      }
    );

    /***/
  },

  /***/ /***/ 597: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["c"];
      }
    );

    /***/
  },

  /***/ /***/ 598: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["b"];
      }
    );

    /***/
  },

  /***/ /***/ 599: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(
      540
    );
    /* harmony reexport (binding) */ __webpack_require__.d(
      __webpack_exports__,
      "a",
      function() {
        return __WEBPACK_IMPORTED_MODULE_0_react_router__["a"];
      }
    );

    /***/
  },

  /***/ /***/ 600: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory__ = __webpack_require__(
      570
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Router__ = __webpack_require__(
      549
    );
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for a <Router> that stores location in memory.
 */

    var MemoryRouter = (function(_React$Component) {
      _inherits(MemoryRouter, _React$Component);

      function MemoryRouter() {
        var _temp, _this, _ret;

        _classCallCheck(this, MemoryRouter);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.history = __WEBPACK_IMPORTED_MODULE_2_history_createMemoryHistory___default()(
            _this.props
          )),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      MemoryRouter.prototype.render = function render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__Router__["a" /* default */],
          { history: this.history, children: this.props.children }
        );
      };

      return MemoryRouter;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    MemoryRouter.propTypes = {
      initialEntries: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
      initialIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      getUserConfirmation:
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
      keyLength: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
    };

    /* harmony default export */ __webpack_exports__["a"] = MemoryRouter;

    /***/
  },

  /***/ /***/ 601: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

    var Prompt = (function(_React$Component) {
      _inherits(Prompt, _React$Component);

      function Prompt() {
        _classCallCheck(this, Prompt);

        return _possibleConstructorReturn(
          this,
          _React$Component.apply(this, arguments)
        );
      }

      Prompt.prototype.enable = function enable(message) {
        if (this.unblock) this.unblock();

        this.unblock = this.context.router.history.block(message);
      };

      Prompt.prototype.disable = function disable() {
        if (this.unblock) {
          this.unblock();
          this.unblock = null;
        }
      };

      Prompt.prototype.componentWillMount = function componentWillMount() {
        if (this.props.when) this.enable(this.props.message);
      };

      Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps
      ) {
        if (nextProps.when) {
          if (!this.props.when || this.props.message !== nextProps.message)
            this.enable(nextProps.message);
        } else {
          this.disable();
        }
      };

      Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
        this.disable();
      };

      Prompt.prototype.render = function render() {
        return null;
      };

      return Prompt;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    Prompt.propTypes = {
      when: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
      ]).isRequired
    };
    Prompt.defaultProps = {
      when: true
    };
    Prompt.contextTypes = {
      router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
          block:
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
        }).isRequired
      }).isRequired
    };

    /* harmony default export */ __webpack_exports__["a"] = Prompt;

    /***/
  },

  /***/ /***/ 602: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for updating the location programatically
 * with a component.
 */

    var Redirect = (function(_React$Component) {
      _inherits(Redirect, _React$Component);

      function Redirect() {
        _classCallCheck(this, Redirect);

        return _possibleConstructorReturn(
          this,
          _React$Component.apply(this, arguments)
        );
      }

      Redirect.prototype.isStatic = function isStatic() {
        return this.context.router && this.context.router.staticContext;
      };

      Redirect.prototype.componentWillMount = function componentWillMount() {
        if (this.isStatic()) this.perform();
      };

      Redirect.prototype.componentDidMount = function componentDidMount() {
        if (!this.isStatic()) this.perform();
      };

      Redirect.prototype.perform = function perform() {
        var history = this.context.router.history;
        var _props = this.props,
          push = _props.push,
          to = _props.to;

        if (push) {
          history.push(to);
        } else {
          history.replace(to);
        }
      };

      Redirect.prototype.render = function render() {
        return null;
      };

      return Redirect;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    Redirect.propTypes = {
      push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
      from: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
        __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
      ])
    };
    Redirect.defaultProps = {
      push: false
    };
    Redirect.contextTypes = {
      router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
          push:
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
          replace:
            __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
        }).isRequired,
        staticContext: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
      }).isRequired
    };

    /* harmony default export */ __webpack_exports__["a"] = Redirect;

    /***/
  },

  /***/ /***/ 603: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(
      545
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_invariant__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__ = __webpack_require__(
      542
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_PathUtils___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(
      549
    );
    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var normalizeLocation = function normalizeLocation(object) {
      var _object$pathname = object.pathname,
        pathname = _object$pathname === undefined ? "/" : _object$pathname,
        _object$search = object.search,
        search = _object$search === undefined ? "" : _object$search,
        _object$hash = object.hash,
        hash = _object$hash === undefined ? "" : _object$hash;

      return {
        pathname: pathname,
        search: search === "?" ? "" : search,
        hash: hash === "#" ? "" : hash
      };
    };

    var addBasename = function addBasename(basename, location) {
      if (!basename) return location;

      return _extends({}, location, {
        pathname:
          __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["addLeadingSlash"]
          )(basename) + location.pathname
      });
    };

    var stripBasename = function stripBasename(basename, location) {
      if (!basename) return location;

      var base = __webpack_require__.i(
        __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["addLeadingSlash"]
      )(basename);

      if (location.pathname.indexOf(base) !== 0) return location;

      return _extends({}, location, {
        pathname: location.pathname.substr(base.length)
      });
    };

    var createLocation = function createLocation(location) {
      return typeof location === "string"
        ? __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["parsePath"]
          )(location)
        : normalizeLocation(location);
    };

    var createURL = function createURL(location) {
      return typeof location === "string"
        ? location
        : __webpack_require__.i(
            __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["createPath"]
          )(location);
    };

    var staticHandler = function staticHandler(methodName) {
      return function() {
        __WEBPACK_IMPORTED_MODULE_0_invariant___default()(
          false,
          "You cannot %s with <StaticRouter>",
          methodName
        );
      };
    };

    var noop = function noop() {};

    /**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

    var StaticRouter = (function(_React$Component) {
      _inherits(StaticRouter, _React$Component);

      function StaticRouter() {
        var _temp, _this, _ret;

        _classCallCheck(this, StaticRouter);

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              _React$Component.call.apply(_React$Component, [this].concat(args))
            )),
            _this
          )),
          (_this.createHref = function(path) {
            return __webpack_require__.i(
              __WEBPACK_IMPORTED_MODULE_3_history_PathUtils__["addLeadingSlash"]
            )(_this.props.basename + createURL(path));
          }),
          (_this.handlePush = function(location) {
            var _this$props = _this.props,
              basename = _this$props.basename,
              context = _this$props.context;

            context.action = "PUSH";
            context.location = addBasename(basename, createLocation(location));
            context.url = createURL(context.location);
          }),
          (_this.handleReplace = function(location) {
            var _this$props2 = _this.props,
              basename = _this$props2.basename,
              context = _this$props2.context;

            context.action = "REPLACE";
            context.location = addBasename(basename, createLocation(location));
            context.url = createURL(context.location);
          }),
          (_this.handleListen = function() {
            return noop;
          }),
          (_this.handleBlock = function() {
            return noop;
          }),
          _temp
        )), _possibleConstructorReturn(_this, _ret);
      }

      StaticRouter.prototype.getChildContext = function getChildContext() {
        return {
          router: {
            staticContext: this.props.context
          }
        };
      };

      StaticRouter.prototype.render = function render() {
        var _props = this.props,
          basename = _props.basename,
          context = _props.context,
          location = _props.location,
          props = _objectWithoutProperties(_props, [
            "basename",
            "context",
            "location"
          ]);

        var history = {
          createHref: this.createHref,
          action: "POP",
          location: stripBasename(basename, createLocation(location)),
          push: this.handlePush,
          replace: this.handleReplace,
          go: staticHandler("go"),
          goBack: staticHandler("goBack"),
          goForward: staticHandler("goForward"),
          listen: this.handleListen,
          block: this.handleBlock
        };

        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */],
          _extends({}, props, { history: history })
        );
      };

      return StaticRouter;
    })(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

    StaticRouter.propTypes = {
      basename: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
      context:
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired,
      location: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
      ])
    };
    StaticRouter.defaultProps = {
      basename: "",
      location: "/"
    };
    StaticRouter.childContextTypes = {
      router:
        __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired
    };

    /* harmony default export */ __webpack_exports__["a"] = StaticRouter;

    /***/
  },

  /***/ /***/ 604: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(
      541
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_warning__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matchPath__ = __webpack_require__(
      550
    );
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    /**
 * The public API for rendering the first <Route> that matches.
 */

    var Switch = (function(_React$Component) {
      _inherits(Switch, _React$Component);

      function Switch() {
        _classCallCheck(this, Switch);

        return _possibleConstructorReturn(
          this,
          _React$Component.apply(this, arguments)
        );
      }

      Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(
        nextProps
      ) {
        __WEBPACK_IMPORTED_MODULE_2_warning___default()(
          !(nextProps.location && !this.props.location),
          '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
        );

        __WEBPACK_IMPORTED_MODULE_2_warning___default()(
          !(!nextProps.location && this.props.location),
          '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
        );
      };

      Switch.prototype.render = function render() {
        var route = this.context.router.route;
        var children = this.props.children;

        var location = this.props.location || route.location;

        var match = void 0,
          child = void 0;
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(
          children,
          function(element) {
            if (
              !__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(
                element
              )
            )
              return;

            var _element$props = element.props,
              pathProp = _element$props.path,
              exact = _element$props.exact,
              strict = _element$props.strict,
              from = _element$props.from;

            var path = pathProp || from;

            if (match == null) {
              child = element;
              match = path
                ? __webpack_require__.i(
                    __WEBPACK_IMPORTED_MODULE_3__matchPath__["a" /* default */]
                  )(location.pathname, {
                    path: path,
                    exact: exact,
                    strict: strict
                  })
                : route.match;
            }
          }
        );

        return match
          ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, {
              location: location,
              computedMatch: match
            })
          : null;
      };

      return Switch;
    })(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

    Switch.contextTypes = {
      router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        route:
          __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
      }).isRequired
    };
    Switch.propTypes = {
      children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
      location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
    };

    /* harmony default export */ __webpack_exports__["a"] = Switch;

    /***/
  },

  /***/ /***/ 605: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(
      12
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_0_react__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(
      84
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_1_prop_types__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__ = __webpack_require__(
      571
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default = __webpack_require__.n(
      __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__
    );
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(
      557
    );
    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }

    /**
 * A public higher-order component to access the imperative API
 */
    var withRouter = function withRouter(Component) {
      var C = function C(props) {
        var wrappedComponentRef = props.wrappedComponentRef,
          remainingProps = _objectWithoutProperties(props, [
            "wrappedComponentRef"
          ]);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__Route__["a" /* default */],
          {
            render: function render(routeComponentProps) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                Component,
                _extends({}, remainingProps, routeComponentProps, {
                  ref: wrappedComponentRef
                })
              );
            }
          }
        );
      };

      C.displayName =
        "withRouter(" + (Component.displayName || Component.name) + ")";
      C.WrappedComponent = Component;
      C.propTypes = {
        wrappedComponentRef:
          __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
      };

      return __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default()(
        C,
        Component
      );
    };

    /* harmony default export */ __webpack_exports__["a"] = withRouter;

    /***/
  },

  /***/ /***/ 606: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    exports.NextArrow = exports.PrevArrow = undefined;

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _classnames = __webpack_require__(544);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _helpers = __webpack_require__(552);

    var _helpers2 = _interopRequireDefault(_helpers);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var PrevArrow = (exports.PrevArrow = (function(_React$Component) {
      _inherits(PrevArrow, _React$Component);

      function PrevArrow() {
        _classCallCheck(this, PrevArrow);

        return _possibleConstructorReturn(
          this,
          _React$Component.apply(this, arguments)
        );
      }

      PrevArrow.prototype.clickHandler = function clickHandler(options, e) {
        if (e) {
          e.preventDefault();
        }
        this.props.clickHandler(options, e);
      };

      PrevArrow.prototype.render = function render() {
        var prevClasses = { "slick-arrow": true, "slick-prev": true };
        var prevHandler = this.clickHandler.bind(this, { message: "previous" });

        if (
          !this.props.infinite &&
          (this.props.currentSlide === 0 ||
            this.props.slideCount <= this.props.slidesToShow)
        ) {
          prevClasses["slick-disabled"] = true;
          prevHandler = null;
        }

        var prevArrowProps = {
          key: "0",
          "data-role": "none",
          className: (0, _classnames2.default)(prevClasses),
          style: { display: "block" },
          onClick: prevHandler
        };
        var customProps = {
          currentSlide: this.props.currentSlide,
          slideCount: this.props.slideCount
        };
        var prevArrow;

        if (this.props.prevArrow) {
          prevArrow = _react2.default.cloneElement(
            this.props.prevArrow,
            _extends({}, prevArrowProps, customProps)
          );
        } else {
          prevArrow = _react2.default.createElement(
            "button",
            _extends({ key: "0", type: "button" }, prevArrowProps),
            " Previous"
          );
        }

        return prevArrow;
      };

      return PrevArrow;
    })(_react2.default.Component));

    var NextArrow = (exports.NextArrow = (function(_React$Component2) {
      _inherits(NextArrow, _React$Component2);

      function NextArrow() {
        _classCallCheck(this, NextArrow);

        return _possibleConstructorReturn(
          this,
          _React$Component2.apply(this, arguments)
        );
      }

      NextArrow.prototype.clickHandler = function clickHandler(options, e) {
        if (e) {
          e.preventDefault();
        }
        this.props.clickHandler(options, e);
      };

      NextArrow.prototype.render = function render() {
        var nextClasses = { "slick-arrow": true, "slick-next": true };
        var nextHandler = this.clickHandler.bind(this, { message: "next" });

        if (!_helpers2.default.canGoNext(this.props)) {
          nextClasses["slick-disabled"] = true;
          nextHandler = null;
        }

        var nextArrowProps = {
          key: "1",
          "data-role": "none",
          className: (0, _classnames2.default)(nextClasses),
          style: { display: "block" },
          onClick: nextHandler
        };
        var customProps = {
          currentSlide: this.props.currentSlide,
          slideCount: this.props.slideCount
        };
        var nextArrow;

        if (this.props.nextArrow) {
          nextArrow = _react2.default.cloneElement(
            this.props.nextArrow,
            _extends({}, nextArrowProps, customProps)
          );
        } else {
          nextArrow = _react2.default.createElement(
            "button",
            _extends({ key: "1", type: "button" }, nextArrowProps),
            " Next"
          );
        }

        return nextArrow;
      };

      return NextArrow;
    })(_react2.default.Component));

    /***/
  },

  /***/ /***/ 607: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    exports.Dots = undefined;

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _classnames = __webpack_require__(544);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var getDotCount = function getDotCount(spec) {
      var dots;
      dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
      return dots;
    };

    var Dots = (exports.Dots = (function(_React$Component) {
      _inherits(Dots, _React$Component);

      function Dots() {
        _classCallCheck(this, Dots);

        return _possibleConstructorReturn(
          this,
          _React$Component.apply(this, arguments)
        );
      }

      Dots.prototype.clickHandler = function clickHandler(options, e) {
        // In Autoplay the focus stays on clicked button even after transition
        // to next slide. That only goes away by click somewhere outside
        e.preventDefault();
        this.props.clickHandler(options);
      };

      Dots.prototype.render = function render() {
        var _this2 = this;

        var dotCount = getDotCount({
          slideCount: this.props.slideCount,
          slidesToScroll: this.props.slidesToScroll
        });

        // Apply join & split to Array to pre-fill it for IE8
        //
        // Credit: http://stackoverflow.com/a/13735425/1849458
        var dots = Array.apply(
          null,
          Array(dotCount + 1).join("0").split("")
        ).map(function(x, i) {
          var leftBound = i * _this2.props.slidesToScroll;
          var rightBound =
            i * _this2.props.slidesToScroll + (_this2.props.slidesToScroll - 1);
          var className = (0, _classnames2.default)({
            "slick-active":
              _this2.props.currentSlide >= leftBound &&
              _this2.props.currentSlide <= rightBound
          });

          var dotOptions = {
            message: "dots",
            index: i,
            slidesToScroll: _this2.props.slidesToScroll,
            currentSlide: _this2.props.currentSlide
          };

          var onClick = _this2.clickHandler.bind(_this2, dotOptions);

          return _react2.default.createElement(
            "li",
            { key: i, className: className },
            _react2.default.cloneElement(_this2.props.customPaging(i), {
              onClick: onClick
            })
          );
        });

        return _react2.default.createElement(
          "ul",
          { className: this.props.dotsClass, style: { display: "block" } },
          dots
        );
      };

      return Dots;
    })(_react2.default.Component));

    /***/
  },

  /***/ /***/ 608: function(module, exports, __webpack_require__) {
    "use strict";

    var initialState = {
      animating: false,
      dragging: false,
      autoPlayTimer: null,
      currentDirection: 0,
      currentLeft: null,
      currentSlide: 0,
      direction: 1,
      listWidth: null,
      listHeight: null,
      // loadIndex: 0,
      slideCount: null,
      slideWidth: null,
      slideHeight: null,
      // sliding: false,
      // slideOffset: 0,
      swipeLeft: null,
      touchObject: {
        startX: 0,
        startY: 0,
        curX: 0,
        curY: 0
      },

      lazyLoadedList: [],

      // added for react
      initialized: false,
      edgeDragged: false,
      swiped: false, // used by swipeEvent. differentites between touch and swipe.
      trackStyle: {},
      trackWidth: 0

      // Removed
      // transformsEnabled: false,
      // $nextArrow: null,
      // $prevArrow: null,
      // $dots: null,
      // $list: null,
      // $slideTrack: null,
      // $slides: null,
    };

    module.exports = initialState;

    /***/
  },

  /***/ /***/ 609: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    exports.InnerSlider = undefined;

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _eventHandlers = __webpack_require__(610);

    var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

    var _helpers = __webpack_require__(552);

    var _helpers2 = _interopRequireDefault(_helpers);

    var _initialState = __webpack_require__(608);

    var _initialState2 = _interopRequireDefault(_initialState);

    var _defaultProps = __webpack_require__(558);

    var _defaultProps2 = _interopRequireDefault(_defaultProps);

    var _createReactClass = __webpack_require__(563);

    var _createReactClass2 = _interopRequireDefault(_createReactClass);

    var _classnames = __webpack_require__(544);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _objectAssign = __webpack_require__(3);

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    var _track = __webpack_require__(612);

    var _dots = __webpack_require__(607);

    var _arrows = __webpack_require__(606);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var InnerSlider = (exports.InnerSlider = (0, _createReactClass2.default)({
      mixins: [_helpers2.default, _eventHandlers2.default],
      list: null,
      track: null,
      listRefHandler: function listRefHandler(ref) {
        this.list = ref;
      },
      trackRefHandler: function trackRefHandler(ref) {
        this.track = ref;
      },
      getInitialState: function getInitialState() {
        return _extends({}, _initialState2.default, {
          currentSlide: this.props.initialSlide
        });
      },
      getDefaultProps: function getDefaultProps() {
        return _defaultProps2.default;
      },
      componentWillMount: function componentWillMount() {
        if (this.props.init) {
          this.props.init();
        }
        this.setState({
          mounted: true
        });
        var lazyLoadedList = [];
        for (
          var i = 0;
          i < _react2.default.Children.count(this.props.children);
          i++
        ) {
          if (
            i >= this.state.currentSlide &&
            i < this.state.currentSlide + this.props.slidesToShow
          ) {
            lazyLoadedList.push(i);
          }
        }

        if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
          this.setState({
            lazyLoadedList: lazyLoadedList
          });
        }
      },
      componentDidMount: function componentDidMount() {
        // Hack for autoplay -- Inspect Later
        this.initialize(this.props);
        this.adaptHeight();

        // To support server-side rendering
        if (!window) {
          return;
        }
        if (window.addEventListener) {
          window.addEventListener("resize", this.onWindowResized);
        } else {
          window.attachEvent("onresize", this.onWindowResized);
        }
      },
      componentWillUnmount: function componentWillUnmount() {
        if (this.animationEndCallback) {
          clearTimeout(this.animationEndCallback);
        }
        if (window.addEventListener) {
          window.removeEventListener("resize", this.onWindowResized);
        } else {
          window.detachEvent("onresize", this.onWindowResized);
        }
        if (this.state.autoPlayTimer) {
          clearInterval(this.state.autoPlayTimer);
        }
      },
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.slickGoTo != nextProps.slickGoTo) {
          if (true) {
            console.warn(
              "react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead"
            );
          }
          this.changeSlide({
            message: "index",
            index: nextProps.slickGoTo,
            currentSlide: this.state.currentSlide
          });
        } else if (this.state.currentSlide >= nextProps.children.length) {
          this.update(nextProps);
          this.changeSlide({
            message: "index",
            index: nextProps.children.length - nextProps.slidesToShow,
            currentSlide: this.state.currentSlide
          });
        } else {
          this.update(nextProps);
        }
      },
      componentDidUpdate: function componentDidUpdate() {
        this.adaptHeight();
      },
      onWindowResized: function onWindowResized() {
        this.update(this.props);
        // animating state should be cleared while resizing, otherwise autoplay stops working
        this.setState({
          animating: false
        });
        clearTimeout(this.animationEndCallback);
        delete this.animationEndCallback;
      },
      slickPrev: function slickPrev() {
        this.changeSlide({ message: "previous" });
      },
      slickNext: function slickNext() {
        this.changeSlide({ message: "next" });
      },
      slickGoTo: function slickGoTo(slide) {
        typeof slide === "number" &&
          this.changeSlide({
            message: "index",
            index: slide,
            currentSlide: this.state.currentSlide
          });
      },
      render: function render() {
        var className = (
          0,
          _classnames2.default
        )("slick-initialized", "slick-slider", this.props.className, {
          "slick-vertical": this.props.vertical
        });

        var trackProps = {
          fade: this.props.fade,
          cssEase: this.props.cssEase,
          speed: this.props.speed,
          infinite: this.props.infinite,
          centerMode: this.props.centerMode,
          focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
          currentSlide: this.state.currentSlide,
          lazyLoad: this.props.lazyLoad,
          lazyLoadedList: this.state.lazyLoadedList,
          rtl: this.props.rtl,
          slideWidth: this.state.slideWidth,
          slidesToShow: this.props.slidesToShow,
          slidesToScroll: this.props.slidesToScroll,
          slideCount: this.state.slideCount,
          trackStyle: this.state.trackStyle,
          variableWidth: this.props.variableWidth
        };

        var dots;

        if (
          this.props.dots === true &&
          this.state.slideCount >= this.props.slidesToShow
        ) {
          var dotProps = {
            dotsClass: this.props.dotsClass,
            slideCount: this.state.slideCount,
            slidesToShow: this.props.slidesToShow,
            currentSlide: this.state.currentSlide,
            slidesToScroll: this.props.slidesToScroll,
            clickHandler: this.changeSlide,
            children: this.props.children,
            customPaging: this.props.customPaging
          };

          dots = _react2.default.createElement(_dots.Dots, dotProps);
        }

        var prevArrow, nextArrow;

        var arrowProps = {
          infinite: this.props.infinite,
          centerMode: this.props.centerMode,
          currentSlide: this.state.currentSlide,
          slideCount: this.state.slideCount,
          slidesToShow: this.props.slidesToShow,
          prevArrow: this.props.prevArrow,
          nextArrow: this.props.nextArrow,
          clickHandler: this.changeSlide
        };

        if (this.props.arrows) {
          prevArrow = _react2.default.createElement(
            _arrows.PrevArrow,
            arrowProps
          );
          nextArrow = _react2.default.createElement(
            _arrows.NextArrow,
            arrowProps
          );
        }

        var verticalHeightStyle = null;

        if (this.props.vertical) {
          verticalHeightStyle = {
            height: this.state.listHeight
          };
        }

        var centerPaddingStyle = null;

        if (this.props.vertical === false) {
          if (this.props.centerMode === true) {
            centerPaddingStyle = {
              padding: "0px " + this.props.centerPadding
            };
          }
        } else {
          if (this.props.centerMode === true) {
            centerPaddingStyle = {
              padding: this.props.centerPadding + " 0px"
            };
          }
        }

        var listStyle = (0, _objectAssign2.default)(
          {},
          verticalHeightStyle,
          centerPaddingStyle
        );

        return _react2.default.createElement(
          "div",
          {
            className: className,
            onMouseEnter: this.onInnerSliderEnter,
            onMouseLeave: this.onInnerSliderLeave,
            onMouseOver: this.onInnerSliderOver
          },
          prevArrow,
          _react2.default.createElement(
            "div",
            {
              ref: this.listRefHandler,
              className: "slick-list",
              style: listStyle,
              onMouseDown: this.swipeStart,
              onMouseMove: this.state.dragging ? this.swipeMove : null,
              onMouseUp: this.swipeEnd,
              onMouseLeave: this.state.dragging ? this.swipeEnd : null,
              onTouchStart: this.swipeStart,
              onTouchMove: this.state.dragging ? this.swipeMove : null,
              onTouchEnd: this.swipeEnd,
              onTouchCancel: this.state.dragging ? this.swipeEnd : null,
              onKeyDown: this.props.accessibility ? this.keyHandler : null
            },
            _react2.default.createElement(
              _track.Track,
              _extends({ ref: this.trackRefHandler }, trackProps),
              this.props.children
            )
          ),
          nextArrow,
          dots
        );
      }
    }));

    /***/
  },

  /***/ /***/ 610: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _trackHelper = __webpack_require__(559);

    var _helpers = __webpack_require__(552);

    var _helpers2 = _interopRequireDefault(_helpers);

    var _objectAssign = __webpack_require__(3);

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    var _reactDom = __webpack_require__(199);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var EventHandlers = {
      // Event handler for previous and next
      changeSlide: function changeSlide(options) {
        var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
        var _props = this.props,
          slidesToScroll = _props.slidesToScroll,
          slidesToShow = _props.slidesToShow;
        var _state = this.state,
          slideCount = _state.slideCount,
          currentSlide = _state.currentSlide;

        unevenOffset = slideCount % slidesToScroll !== 0;
        indexOffset = unevenOffset
          ? 0
          : (slideCount - currentSlide) % slidesToScroll;

        if (options.message === "previous") {
          slideOffset =
            indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
          targetSlide = currentSlide - slideOffset;
          if (this.props.lazyLoad) {
            previousInt = currentSlide - slideOffset;
            targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
          }
        } else if (options.message === "next") {
          slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
          targetSlide = currentSlide + slideOffset;
          if (this.props.lazyLoad) {
            targetSlide =
              (currentSlide + slidesToScroll) % slideCount + indexOffset;
          }
        } else if (
          options.message === "dots" ||
          options.message === "children"
        ) {
          // Click on dots
          targetSlide = options.index * options.slidesToScroll;
          if (targetSlide === options.currentSlide) {
            return;
          }
        } else if (options.message === "index") {
          targetSlide = parseInt(options.index);
          if (targetSlide === options.currentSlide) {
            return;
          }
        }

        this.slideHandler(targetSlide);
      },

      // Accessiblity handler for previous and next
      keyHandler: function keyHandler(e) {
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!e.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
          if (e.keyCode === 37 && this.props.accessibility === true) {
            this.changeSlide({
              message: this.props.rtl === true ? "next" : "previous"
            });
          } else if (e.keyCode === 39 && this.props.accessibility === true) {
            this.changeSlide({
              message: this.props.rtl === true ? "previous" : "next"
            });
          }
        }
      },
      // Focus on selecting a slide (click handler on track)
      selectHandler: function selectHandler(options) {
        this.changeSlide(options);
      },
      swipeStart: function swipeStart(e) {
        var touches, posX, posY;

        if (
          this.props.swipe === false ||
          ("ontouchend" in document && this.props.swipe === false)
        ) {
          return;
        } else if (
          this.props.draggable === false &&
          e.type.indexOf("mouse") !== -1
        ) {
          return;
        }
        posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
        posY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
        this.setState({
          dragging: true,
          touchObject: {
            startX: posX,
            startY: posY,
            curX: posX,
            curY: posY
          }
        });
      },
      swipeMove: function swipeMove(e) {
        if (!this.state.dragging) {
          e.preventDefault();
          return;
        }
        if (this.state.animating) {
          return;
        }
        if (
          this.props.vertical &&
          this.props.swipeToSlide &&
          this.props.verticalSwiping
        ) {
          e.preventDefault();
        }
        var swipeLeft;
        var curLeft, positionOffset;
        var touchObject = this.state.touchObject;

        curLeft = (0, _trackHelper.getTrackLeft)(
          (0, _objectAssign2.default)(
            {
              slideIndex: this.state.currentSlide,
              trackRef: this.track
            },
            this.props,
            this.state
          )
        );
        touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
        touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
        touchObject.swipeLength = Math.round(
          Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2))
        );

        if (this.props.verticalSwiping) {
          touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2))
          );
        }

        positionOffset =
          (this.props.rtl === false ? 1 : -1) *
          (touchObject.curX > touchObject.startX ? 1 : -1);

        if (this.props.verticalSwiping) {
          positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
        }

        var currentSlide = this.state.currentSlide;
        var dotCount = Math.ceil(
          this.state.slideCount / this.props.slidesToScroll
        );
        var swipeDirection = this.swipeDirection(this.state.touchObject);
        var touchSwipeLength = touchObject.swipeLength;

        if (this.props.infinite === false) {
          if (
            (currentSlide === 0 && swipeDirection === "right") ||
            (currentSlide + 1 >= dotCount && swipeDirection === "left")
          ) {
            touchSwipeLength =
              touchObject.swipeLength * this.props.edgeFriction;

            if (this.state.edgeDragged === false && this.props.edgeEvent) {
              this.props.edgeEvent(swipeDirection);
              this.setState({ edgeDragged: true });
            }
          }
        }

        if (this.state.swiped === false && this.props.swipeEvent) {
          this.props.swipeEvent(swipeDirection);
          this.setState({ swiped: true });
        }

        if (!this.props.vertical) {
          swipeLeft = curLeft + touchSwipeLength * positionOffset;
        } else {
          swipeLeft =
            curLeft +
            touchSwipeLength *
              (this.state.listHeight / this.state.listWidth) *
              positionOffset;
        }

        if (this.props.verticalSwiping) {
          swipeLeft = curLeft + touchSwipeLength * positionOffset;
        }

        this.setState({
          touchObject: touchObject,
          swipeLeft: swipeLeft,
          trackStyle: (0, _trackHelper.getTrackCSS)(
            (0, _objectAssign2.default)(
              { left: swipeLeft },
              this.props,
              this.state
            )
          )
        });

        if (
          Math.abs(touchObject.curX - touchObject.startX) <
          Math.abs(touchObject.curY - touchObject.startY) * 0.8
        ) {
          return;
        }
        if (touchObject.swipeLength > 4) {
          e.preventDefault();
        }
      },
      getNavigableIndexes: function getNavigableIndexes() {
        var max = void 0;
        var breakPoint = 0;
        var counter = 0;
        var indexes = [];

        if (!this.props.infinite) {
          max = this.state.slideCount;
        } else {
          breakPoint = this.props.slidesToShow * -1;
          counter = this.props.slidesToShow * -1;
          max = this.state.slideCount * 2;
        }

        while (breakPoint < max) {
          indexes.push(breakPoint);
          breakPoint = counter + this.props.slidesToScroll;

          counter +=
            this.props.slidesToScroll <= this.props.slidesToShow
              ? this.props.slidesToScroll
              : this.props.slidesToShow;
        }

        return indexes;
      },
      checkNavigable: function checkNavigable(index) {
        var navigables = this.getNavigableIndexes();
        var prevNavigable = 0;

        if (index > navigables[navigables.length - 1]) {
          index = navigables[navigables.length - 1];
        } else {
          for (var n in navigables) {
            if (index < navigables[n]) {
              index = prevNavigable;
              break;
            }

            prevNavigable = navigables[n];
          }
        }

        return index;
      },
      getSlideCount: function getSlideCount() {
        var _this = this;

        var centerOffset = this.props.centerMode
          ? this.state.slideWidth * Math.floor(this.props.slidesToShow / 2)
          : 0;

        if (this.props.swipeToSlide) {
          var swipedSlide = void 0;

          var slickList = _reactDom2.default.findDOMNode(this.list);

          var slides = slickList.querySelectorAll(".slick-slide");

          Array.from(slides).every(function(slide) {
            if (!_this.props.vertical) {
              if (
                slide.offsetLeft - centerOffset + _this.getWidth(slide) / 2 >
                _this.state.swipeLeft * -1
              ) {
                swipedSlide = slide;
                return false;
              }
            } else {
              if (
                slide.offsetTop + _this.getHeight(slide) / 2 >
                _this.state.swipeLeft * -1
              ) {
                swipedSlide = slide;
                return false;
              }
            }

            return true;
          });

          var slidesTraversed =
            Math.abs(swipedSlide.dataset.index - this.state.currentSlide) || 1;

          return slidesTraversed;
        } else {
          return this.props.slidesToScroll;
        }
      },

      swipeEnd: function swipeEnd(e) {
        if (!this.state.dragging) {
          if (this.props.swipe) {
            e.preventDefault();
          }
          return;
        }
        var touchObject = this.state.touchObject;
        var minSwipe = this.state.listWidth / this.props.touchThreshold;
        var swipeDirection = this.swipeDirection(touchObject);

        if (this.props.verticalSwiping) {
          minSwipe = this.state.listHeight / this.props.touchThreshold;
        }

        // reset the state of touch related state variables.
        this.setState({
          dragging: false,
          edgeDragged: false,
          swiped: false,
          swipeLeft: null,
          touchObject: {}
        });
        // Fix for #13
        if (!touchObject.swipeLength) {
          return;
        }
        if (touchObject.swipeLength > minSwipe) {
          e.preventDefault();

          var slideCount = void 0,
            newSlide = void 0;

          switch (swipeDirection) {
            case "left":
            case "down":
              newSlide = this.state.currentSlide + this.getSlideCount();
              slideCount = this.props.swipeToSlide
                ? this.checkNavigable(newSlide)
                : newSlide;
              this.state.currentDirection = 0;
              break;

            case "right":
            case "up":
              newSlide = this.state.currentSlide - this.getSlideCount();
              slideCount = this.props.swipeToSlide
                ? this.checkNavigable(newSlide)
                : newSlide;
              this.state.currentDirection = 1;
              break;

            default:
              slideCount = this.state.currentSlide;
          }

          this.slideHandler(slideCount);
        } else {
          // Adjust the track back to it's original position.
          var currentLeft = (0, _trackHelper.getTrackLeft)(
            (0, _objectAssign2.default)(
              {
                slideIndex: this.state.currentSlide,
                trackRef: this.track
              },
              this.props,
              this.state
            )
          );

          this.setState({
            trackStyle: (0, _trackHelper.getTrackAnimateCSS)(
              (0, _objectAssign2.default)(
                { left: currentLeft },
                this.props,
                this.state
              )
            )
          });
        }
      },
      onInnerSliderEnter: function onInnerSliderEnter(e) {
        if (this.props.autoplay && this.props.pauseOnHover) {
          this.pause();
        }
      },
      onInnerSliderOver: function onInnerSliderOver(e) {
        if (this.props.autoplay && this.props.pauseOnHover) {
          this.pause();
        }
      },
      onInnerSliderLeave: function onInnerSliderLeave(e) {
        if (this.props.autoplay && this.props.pauseOnHover) {
          this.autoPlay();
        }
      }
    };

    exports.default = EventHandlers;

    /***/
  },

  /***/ /***/ 611: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _innerSlider = __webpack_require__(609);

    var _objectAssign = __webpack_require__(3);

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    var _json2mq = __webpack_require__(573);

    var _json2mq2 = _interopRequireDefault(_json2mq);

    var _defaultProps = __webpack_require__(558);

    var _defaultProps2 = _interopRequireDefault(_defaultProps);

    var _canUseDom = __webpack_require__(562);

    var _canUseDom2 = _interopRequireDefault(_canUseDom);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var enquire = _canUseDom2.default && __webpack_require__(567);

    var Slider = (function(_React$Component) {
      _inherits(Slider, _React$Component);

      function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(
          this,
          _React$Component.call(this, props)
        );

        _this.state = {
          breakpoint: null
        };
        _this._responsiveMediaHandlers = [];
        _this.innerSliderRefHandler = _this.innerSliderRefHandler.bind(_this);
        return _this;
      }

      Slider.prototype.innerSliderRefHandler = function innerSliderRefHandler(
        ref
      ) {
        this.innerSlider = ref;
      };

      Slider.prototype.media = function media(query, handler) {
        enquire.register(query, handler);
        this._responsiveMediaHandlers.push({ query: query, handler: handler });
      };

      Slider.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        if (this.props.responsive) {
          var breakpoints = this.props.responsive.map(function(breakpt) {
            return breakpt.breakpoint;
          });
          breakpoints.sort(function(x, y) {
            return x - y;
          });

          breakpoints.forEach(function(breakpoint, index) {
            var bQuery;
            if (index === 0) {
              bQuery = (0, _json2mq2.default)({
                minWidth: 0,
                maxWidth: breakpoint
              });
            } else {
              bQuery = (0, _json2mq2.default)({
                minWidth: breakpoints[index - 1],
                maxWidth: breakpoint
              });
            }
            _canUseDom2.default &&
              _this2.media(bQuery, function() {
                _this2.setState({ breakpoint: breakpoint });
              });
          });

          // Register media query for full screen. Need to support resize from small to large
          var query = (0, _json2mq2.default)({
            minWidth: breakpoints.slice(-1)[0]
          });

          _canUseDom2.default &&
            this.media(query, function() {
              _this2.setState({ breakpoint: null });
            });
        }
      };

      Slider.prototype.componentWillUnmount = function componentWillUnmount() {
        this._responsiveMediaHandlers.forEach(function(obj) {
          enquire.unregister(obj.query, obj.handler);
        });
      };

      Slider.prototype.slickPrev = function slickPrev() {
        this.innerSlider.slickPrev();
      };

      Slider.prototype.slickNext = function slickNext() {
        this.innerSlider.slickNext();
      };

      Slider.prototype.slickGoTo = function slickGoTo(slide) {
        this.innerSlider.slickGoTo(slide);
      };

      Slider.prototype.render = function render() {
        var _this3 = this;

        var settings;
        var newProps;
        if (this.state.breakpoint) {
          newProps = this.props.responsive.filter(function(resp) {
            return resp.breakpoint === _this3.state.breakpoint;
          });
          settings =
            newProps[0].settings === "unslick"
              ? "unslick"
              : (0, _objectAssign2.default)(
                  {},
                  this.props,
                  newProps[0].settings
                );
        } else {
          settings = (0, _objectAssign2.default)(
            {},
            _defaultProps2.default,
            this.props
          );
        }

        var children = this.props.children;
        if (!Array.isArray(children)) {
          children = [children];
        }

        // Children may contain false or null, so we should filter them
        children = children.filter(function(child) {
          return !!child;
        });

        if (settings === "unslick") {
          // if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
          return _react2.default.createElement("div", null, children);
        } else {
          return _react2.default.createElement(
            _innerSlider.InnerSlider,
            _extends({ ref: this.innerSliderRefHandler }, settings),
            children
          );
        }
      };

      return Slider;
    })(_react2.default.Component);

    exports.default = Slider;

    /***/
  },

  /***/ /***/ 612: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;
    exports.Track = undefined;

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _objectAssign = __webpack_require__(3);

    var _objectAssign2 = _interopRequireDefault(_objectAssign);

    var _classnames = __webpack_require__(544);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      }
      return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            typeof superClass
        );
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf
          ? Object.setPrototypeOf(subClass, superClass)
          : (subClass.__proto__ = superClass);
    }

    var getSlideClasses = function getSlideClasses(spec) {
      var slickActive, slickCenter, slickCloned;
      var centerOffset, index;

      if (spec.rtl) {
        index = spec.slideCount - 1 - spec.index;
      } else {
        index = spec.index;
      }

      slickCloned = index < 0 || index >= spec.slideCount;
      if (spec.centerMode) {
        centerOffset = Math.floor(spec.slidesToShow / 2);
        slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
        if (
          index > spec.currentSlide - centerOffset - 1 &&
          index <= spec.currentSlide + centerOffset
        ) {
          slickActive = true;
        }
      } else {
        slickActive =
          spec.currentSlide <= index &&
          index < spec.currentSlide + spec.slidesToShow;
      }
      return (0, _classnames2.default)({
        "slick-slide": true,
        "slick-active": slickActive,
        "slick-center": slickCenter,
        "slick-cloned": slickCloned
      });
    };

    var getSlideStyle = function getSlideStyle(spec) {
      var style = {};

      if (spec.variableWidth === undefined || spec.variableWidth === false) {
        style.width = spec.slideWidth;
      }

      if (spec.fade) {
        style.position = "relative";
        style.left = -spec.index * spec.slideWidth;
        style.opacity = spec.currentSlide === spec.index ? 1 : 0;
        style.transition = "opacity " + spec.speed + "ms " + spec.cssEase;
        style.WebkitTransition = "opacity " + spec.speed + "ms " + spec.cssEase;
      }

      return style;
    };

    var getKey = function getKey(child, fallbackKey) {
      // key could be a zero
      return child.key === null || child.key === undefined
        ? fallbackKey
        : child.key;
    };

    var renderSlides = function renderSlides(spec) {
      var key;
      var slides = [];
      var preCloneSlides = [];
      var postCloneSlides = [];
      var count = _react2.default.Children.count(spec.children);

      _react2.default.Children.forEach(spec.children, function(elem, index) {
        var child = void 0;
        var childOnClickOptions = {
          message: "children",
          index: index,
          slidesToScroll: spec.slidesToScroll,
          currentSlide: spec.currentSlide
        };

        if (
          !spec.lazyLoad |
          (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)
        ) {
          child = elem;
        } else {
          child = _react2.default.createElement("div", null);
        }
        var childStyle = getSlideStyle(
          (0, _objectAssign2.default)({}, spec, { index: index })
        );
        var slickClasses = getSlideClasses(
          (0, _objectAssign2.default)({ index: index }, spec)
        );
        var cssClasses;

        if (child.props.className) {
          cssClasses = (0, _classnames2.default)(
            slickClasses,
            child.props.className
          );
        } else {
          cssClasses = slickClasses;
        }

        var onClick = function onClick(e) {
          child.props && child.props.onClick && child.props.onClick(e);
          if (spec.focusOnSelect) {
            spec.focusOnSelect(childOnClickOptions);
          }
        };

        slides.push(
          _react2.default.cloneElement(child, {
            key: "original" + getKey(child, index),
            "data-index": index,
            className: cssClasses,
            tabIndex: "-1",
            style: (0, _objectAssign2.default)(
              { outline: "none" },
              child.props.style || {},
              childStyle
            ),
            onClick: onClick
          })
        );

        // variableWidth doesn't wrap properly.
        if (spec.infinite && spec.fade === false) {
          var infiniteCount = spec.variableWidth
            ? spec.slidesToShow + 1
            : spec.slidesToShow;

          if (index >= count - infiniteCount) {
            key = -(count - index);
            preCloneSlides.push(
              _react2.default.cloneElement(child, {
                key: "precloned" + getKey(child, key),
                "data-index": key,
                className: cssClasses,
                style: (0, _objectAssign2.default)(
                  {},
                  child.props.style || {},
                  childStyle
                ),
                onClick: onClick
              })
            );
          }

          if (index < infiniteCount) {
            key = count + index;
            postCloneSlides.push(
              _react2.default.cloneElement(child, {
                key: "postcloned" + getKey(child, key),
                "data-index": key,
                className: cssClasses,
                style: (0, _objectAssign2.default)(
                  {},
                  child.props.style || {},
                  childStyle
                ),
                onClick: onClick
              })
            );
          }
        }
      });

      if (spec.rtl) {
        return preCloneSlides.concat(slides, postCloneSlides).reverse();
      } else {
        return preCloneSlides.concat(slides, postCloneSlides);
      }
    };

    var Track = (exports.Track = (function(_React$Component) {
      _inherits(Track, _React$Component);

      function Track() {
        _classCallCheck(this, Track);

        return _possibleConstructorReturn(
          this,
          _React$Component.apply(this, arguments)
        );
      }

      Track.prototype.render = function render() {
        var slides = renderSlides.call(this, this.props);
        return _react2.default.createElement(
          "div",
          { className: "slick-track", style: this.props.trackStyle },
          slides
        );
      };

      return Track;
    })(_react2.default.Component));

    /***/
  },

  /***/ /***/ 613: function(module, exports, __webpack_require__) {
    "use strict";

    var isAbsolute = function isAbsolute(pathname) {
      return pathname.charAt(0) === "/";
    };

    // About 1.5x faster than the two-arg version of Array#splice()
    var spliceOne = function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
      }
      list.pop();
    };

    // This implementation is based heavily on node's url.parse
    var resolvePathname = function resolvePathname(to) {
      var from =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var toParts = (to && to.split("/")) || [];
      var fromParts = (from && from.split("/")) || [];

      var isToAbs = to && isAbsolute(to);
      var isFromAbs = from && isAbsolute(from);
      var mustEndAbs = isToAbs || isFromAbs;

      if (to && isAbsolute(to)) {
        // to is absolute
        fromParts = toParts;
      } else if (toParts.length) {
        // to is relative, drop the filename
        fromParts.pop();
        fromParts = fromParts.concat(toParts);
      }

      if (!fromParts.length) return "/";

      var hasTrailingSlash = void 0;
      if (fromParts.length) {
        var last = fromParts[fromParts.length - 1];
        hasTrailingSlash = last === "." || last === ".." || last === "";
      } else {
        hasTrailingSlash = false;
      }

      var up = 0;
      for (var i = fromParts.length; i >= 0; i--) {
        var part = fromParts[i];

        if (part === ".") {
          spliceOne(fromParts, i);
        } else if (part === "..") {
          spliceOne(fromParts, i);
          up++;
        } else if (up) {
          spliceOne(fromParts, i);
          up--;
        }
      }

      if (!mustEndAbs)
        for (; up--; up) {
          fromParts.unshift("..");
        }
      if (
        mustEndAbs &&
        fromParts[0] !== "" &&
        (!fromParts[0] || !isAbsolute(fromParts[0]))
      )
        fromParts.unshift("");

      var result = fromParts.join("/");

      if (hasTrailingSlash && result.substr(-1) !== "/") result += "/";

      return result;
    };

    module.exports = resolvePathname;

    /***/
  },

  /***/ /***/ 614: function(module, exports) {
    var camel2hyphen = function(str) {
      return str
        .replace(/[A-Z]/g, function(match) {
          return "-" + match.toLowerCase();
        })
        .toLowerCase();
    };

    module.exports = camel2hyphen;

    /***/
  },

  /***/ /***/ 615: function(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var _typeof =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function(obj) {
            return typeof obj;
          }
        : function(obj) {
            return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };

    var valueEqual = function valueEqual(a, b) {
      if (a === b) return true;

      if (a == null || b == null) return false;

      if (Array.isArray(a))
        return (
          Array.isArray(b) &&
          a.length === b.length &&
          a.every(function(item, index) {
            return valueEqual(item, b[index]);
          })
        );

      var aType = typeof a === "undefined" ? "undefined" : _typeof(a);
      var bType = typeof b === "undefined" ? "undefined" : _typeof(b);

      if (aType !== bType) return false;

      if (aType === "object") {
        var aValue = a.valueOf();
        var bValue = b.valueOf();

        if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);

        if (aKeys.length !== bKeys.length) return false;

        return aKeys.every(function(key) {
          return valueEqual(a[key], b[key]);
        });
      }

      return false;
    };

    exports.default = valueEqual;

    /***/
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC4yODkyZGExYjAxZTIwOTVjMGI5MC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvZXMvaW5kZXguanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L3dhcm5pbmcvYnJvd3Nlci5qcz9kMjA1NjRjIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9QYXRoVXRpbHMuanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvaW5kZXguanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L2NsYXNzbmFtZXMvaW5kZXguanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L2ludmFyaWFudC9icm93c2VyLmpzP2QyMDU2NGMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L0xvY2F0aW9uVXRpbHMuanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L2hpc3RvcnkvY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIuanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9lcy9Sb3V0ZXIuanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9lcy9tYXRjaFBhdGguanM/ZDIwNTY0YyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXNsaWNrL2xpYi9pbmRleC5qcz9kMjA1NjRjIiwid2VicGFjazovLy8uL34vcmVhY3Qtc2xpY2svbGliL21peGlucy9oZWxwZXJzLmpzP2QyMDU2NGMiLCJ3ZWJwYWNrOi8vLy4vfi9lbnF1aXJlLmpzL3NyYy9VdGlsLmpzP2QyMDU2NGMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L0RPTVV0aWxzLmpzP2QyMDU2NGMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL0xpbmsuanM/N2RhNGIzYyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9lcy9Sb3V0ZS5qcz83ZGE0YjNjIiwid2VicGFjazovLy8uL34vcmVhY3Qtc2xpY2svbGliL2RlZmF1bHQtcHJvcHMuanM/N2RhNGIzYyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXNsaWNrL2xpYi9taXhpbnMvdHJhY2tIZWxwZXIuanM/N2RhNGIzYyIsIndlYnBhY2s6Ly8vLi9+L2Nhbi11c2UtZG9tL2luZGV4LmpzPzdkYTRiM2MiLCJ3ZWJwYWNrOi8vLy4vfi9jcmVhdGUtcmVhY3QtY2xhc3MvaW5kZXguanM/N2RhNGIzYyIsIndlYnBhY2s6Ly8vLi9+L2VucXVpcmUuanMvc3JjL01lZGlhUXVlcnkuanM/N2RhNGIzYyIsIndlYnBhY2s6Ly8vLi9+L2VucXVpcmUuanMvc3JjL01lZGlhUXVlcnlEaXNwYXRjaC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vZW5xdWlyZS5qcy9zcmMvUXVlcnlIYW5kbGVyLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9lbnF1aXJlLmpzL3NyYy9pbmRleC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeS5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9jcmVhdGVIYXNoSGlzdG9yeS5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vaXNhcnJheS9pbmRleC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vanNvbjJtcS9pbmRleC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcGF0aC10by1yZWdleHAvaW5kZXguanM/Mzg2Y2RhMiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvQnJvd3NlclJvdXRlci5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9IYXNoUm91dGVyLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL01lbW9yeVJvdXRlci5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9OYXZMaW5rLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL1Byb21wdC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9SZWRpcmVjdC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9Sb3V0ZS5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9Sb3V0ZXIuanM/Mzg2Y2RhMiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvU3RhdGljUm91dGVyLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL1N3aXRjaC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9tYXRjaFBhdGguanM/Mzg2Y2RhMiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvd2l0aFJvdXRlci5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2VzL01lbW9yeVJvdXRlci5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2VzL1Byb21wdC5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2VzL1JlZGlyZWN0LmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvZXMvU3RhdGljUm91dGVyLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvZXMvU3dpdGNoLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvZXMvd2l0aFJvdXRlci5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtc2xpY2svbGliL2Fycm93cy5qcz8zODZjZGEyIiwid2VicGFjazovLy8uL34vcmVhY3Qtc2xpY2svbGliL2RvdHMuanM/Mzg2Y2RhMiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXNsaWNrL2xpYi9pbml0aWFsLXN0YXRlLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1zbGljay9saWIvaW5uZXItc2xpZGVyLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1zbGljay9saWIvbWl4aW5zL2V2ZW50LWhhbmRsZXJzLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1zbGljay9saWIvc2xpZGVyLmpzPzM4NmNkYTIiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1zbGljay9saWIvdHJhY2suanM/NWUzOWIxMCIsIndlYnBhY2s6Ly8vLi9+L3Jlc29sdmUtcGF0aG5hbWUvaW5kZXguanM/NWUzOWIxMCIsIndlYnBhY2s6Ly8vLi9+L3N0cmluZy1jb252ZXJ0L2NhbWVsMmh5cGhlbi5qcz81ZTM5YjEwIiwid2VicGFjazovLy8uL34vdmFsdWUtZXF1YWwvaW5kZXguanM/NWUzOWIxMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX01lbW9yeVJvdXRlciBmcm9tICcuL01lbW9yeVJvdXRlcic7XG5leHBvcnQgeyBfTWVtb3J5Um91dGVyIGFzIE1lbW9yeVJvdXRlciB9O1xuaW1wb3J0IF9Qcm9tcHQgZnJvbSAnLi9Qcm9tcHQnO1xuZXhwb3J0IHsgX1Byb21wdCBhcyBQcm9tcHQgfTtcbmltcG9ydCBfUmVkaXJlY3QgZnJvbSAnLi9SZWRpcmVjdCc7XG5leHBvcnQgeyBfUmVkaXJlY3QgYXMgUmVkaXJlY3QgfTtcbmltcG9ydCBfUm91dGUgZnJvbSAnLi9Sb3V0ZSc7XG5leHBvcnQgeyBfUm91dGUgYXMgUm91dGUgfTtcbmltcG9ydCBfUm91dGVyIGZyb20gJy4vUm91dGVyJztcbmV4cG9ydCB7IF9Sb3V0ZXIgYXMgUm91dGVyIH07XG5pbXBvcnQgX1N0YXRpY1JvdXRlciBmcm9tICcuL1N0YXRpY1JvdXRlcic7XG5leHBvcnQgeyBfU3RhdGljUm91dGVyIGFzIFN0YXRpY1JvdXRlciB9O1xuaW1wb3J0IF9Td2l0Y2ggZnJvbSAnLi9Td2l0Y2gnO1xuZXhwb3J0IHsgX1N3aXRjaCBhcyBTd2l0Y2ggfTtcbmltcG9ydCBfbWF0Y2hQYXRoIGZyb20gJy4vbWF0Y2hQYXRoJztcbmV4cG9ydCB7IF9tYXRjaFBhdGggYXMgbWF0Y2hQYXRoIH07XG5pbXBvcnQgX3dpdGhSb3V0ZXIgZnJvbSAnLi93aXRoUm91dGVyJztcbmV4cG9ydCB7IF93aXRoUm91dGVyIGFzIHdpdGhSb3V0ZXIgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyL2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA8IDEwIHx8ICgvXltzXFxXXSokLykudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgd2FybmluZyBmb3JtYXQgc2hvdWxkIGJlIGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyAnICtcbiAgICAgICAgJ3dhcm5pbmcuIFBsZWFzZSwgdXNlIGEgbW9yZSBkZXNjcmlwdGl2ZSBmb3JtYXQgdGhhbjogJyArIGZvcm1hdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2FybmluZy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGFkZExlYWRpbmdTbGFzaCA9IGV4cG9ydHMuYWRkTGVhZGluZ1NsYXNoID0gZnVuY3Rpb24gYWRkTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoIDogJy8nICsgcGF0aDtcbn07XG5cbnZhciBzdHJpcExlYWRpbmdTbGFzaCA9IGV4cG9ydHMuc3RyaXBMZWFkaW5nU2xhc2ggPSBmdW5jdGlvbiBzdHJpcExlYWRpbmdTbGFzaChwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nID8gcGF0aC5zdWJzdHIoMSkgOiBwYXRoO1xufTtcblxudmFyIGhhc0Jhc2VuYW1lID0gZXhwb3J0cy5oYXNCYXNlbmFtZSA9IGZ1bmN0aW9uIGhhc0Jhc2VuYW1lKHBhdGgsIHByZWZpeCkge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXggKyAnKFxcXFwvfFxcXFw/fCN8JCknLCAnaScpLnRlc3QocGF0aCk7XG59O1xuXG52YXIgc3RyaXBCYXNlbmFtZSA9IGV4cG9ydHMuc3RyaXBCYXNlbmFtZSA9IGZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpID8gcGF0aC5zdWJzdHIocHJlZml4Lmxlbmd0aCkgOiBwYXRoO1xufTtcblxudmFyIHN0cmlwVHJhaWxpbmdTbGFzaCA9IGV4cG9ydHMuc3RyaXBUcmFpbGluZ1NsYXNoID0gZnVuY3Rpb24gc3RyaXBUcmFpbGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KHBhdGgubGVuZ3RoIC0gMSkgPT09ICcvJyA/IHBhdGguc2xpY2UoMCwgLTEpIDogcGF0aDtcbn07XG5cbnZhciBwYXJzZVBhdGggPSBleHBvcnRzLnBhcnNlUGF0aCA9IGZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIHZhciBwYXRobmFtZSA9IHBhdGggfHwgJy8nO1xuICB2YXIgc2VhcmNoID0gJyc7XG4gIHZhciBoYXNoID0gJyc7XG5cbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2hJbmRleCAhPT0gLTEpIHtcbiAgICBoYXNoID0gcGF0aG5hbWUuc3Vic3RyKGhhc2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBzZWFyY2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJz8nKTtcbiAgaWYgKHNlYXJjaEluZGV4ICE9PSAtMSkge1xuICAgIHNlYXJjaCA9IHBhdGhuYW1lLnN1YnN0cihzZWFyY2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHIoMCwgc2VhcmNoSW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2ggPT09ICc/JyA/ICcnIDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2ggPT09ICcjJyA/ICcnIDogaGFzaFxuICB9O1xufTtcblxudmFyIGNyZWF0ZVBhdGggPSBleHBvcnRzLmNyZWF0ZVBhdGggPSBmdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uKSB7XG4gIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoLFxuICAgICAgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XG5cblxuICB2YXIgcGF0aCA9IHBhdGhuYW1lIHx8ICcvJztcblxuICBpZiAoc2VhcmNoICYmIHNlYXJjaCAhPT0gJz8nKSBwYXRoICs9IHNlYXJjaC5jaGFyQXQoMCkgPT09ICc/JyA/IHNlYXJjaCA6ICc/JyArIHNlYXJjaDtcblxuICBpZiAoaGFzaCAmJiBoYXNoICE9PSAnIycpIHBhdGggKz0gaGFzaC5jaGFyQXQoMCkgPT09ICcjJyA/IGhhc2ggOiAnIycgKyBoYXNoO1xuXG4gIHJldHVybiBwYXRoO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGlzdG9yeS9QYXRoVXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDU0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgX0Jyb3dzZXJSb3V0ZXIgZnJvbSAnLi9Ccm93c2VyUm91dGVyJztcbmV4cG9ydCB7IF9Ccm93c2VyUm91dGVyIGFzIEJyb3dzZXJSb3V0ZXIgfTtcbmltcG9ydCBfSGFzaFJvdXRlciBmcm9tICcuL0hhc2hSb3V0ZXInO1xuZXhwb3J0IHsgX0hhc2hSb3V0ZXIgYXMgSGFzaFJvdXRlciB9O1xuaW1wb3J0IF9MaW5rIGZyb20gJy4vTGluayc7XG5leHBvcnQgeyBfTGluayBhcyBMaW5rIH07XG5pbXBvcnQgX01lbW9yeVJvdXRlciBmcm9tICcuL01lbW9yeVJvdXRlcic7XG5leHBvcnQgeyBfTWVtb3J5Um91dGVyIGFzIE1lbW9yeVJvdXRlciB9O1xuaW1wb3J0IF9OYXZMaW5rIGZyb20gJy4vTmF2TGluayc7XG5leHBvcnQgeyBfTmF2TGluayBhcyBOYXZMaW5rIH07XG5pbXBvcnQgX1Byb21wdCBmcm9tICcuL1Byb21wdCc7XG5leHBvcnQgeyBfUHJvbXB0IGFzIFByb21wdCB9O1xuaW1wb3J0IF9SZWRpcmVjdCBmcm9tICcuL1JlZGlyZWN0JztcbmV4cG9ydCB7IF9SZWRpcmVjdCBhcyBSZWRpcmVjdCB9O1xuaW1wb3J0IF9Sb3V0ZSBmcm9tICcuL1JvdXRlJztcbmV4cG9ydCB7IF9Sb3V0ZSBhcyBSb3V0ZSB9O1xuaW1wb3J0IF9Sb3V0ZXIgZnJvbSAnLi9Sb3V0ZXInO1xuZXhwb3J0IHsgX1JvdXRlciBhcyBSb3V0ZXIgfTtcbmltcG9ydCBfU3RhdGljUm91dGVyIGZyb20gJy4vU3RhdGljUm91dGVyJztcbmV4cG9ydCB7IF9TdGF0aWNSb3V0ZXIgYXMgU3RhdGljUm91dGVyIH07XG5pbXBvcnQgX1N3aXRjaCBmcm9tICcuL1N3aXRjaCc7XG5leHBvcnQgeyBfU3dpdGNoIGFzIFN3aXRjaCB9O1xuaW1wb3J0IF9tYXRjaFBhdGggZnJvbSAnLi9tYXRjaFBhdGgnO1xuZXhwb3J0IHsgX21hdGNoUGF0aCBhcyBtYXRjaFBhdGggfTtcbmltcG9ydCBfd2l0aFJvdXRlciBmcm9tICcuL3dpdGhSb3V0ZXInO1xuZXhwb3J0IHsgX3dpdGhSb3V0ZXIgYXMgd2l0aFJvdXRlciB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW52YXJpYW50L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmxvY2F0aW9uc0FyZUVxdWFsID0gZXhwb3J0cy5jcmVhdGVMb2NhdGlvbiA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZXNvbHZlUGF0aG5hbWUgPSByZXF1aXJlKCdyZXNvbHZlLXBhdGhuYW1lJyk7XG5cbnZhciBfcmVzb2x2ZVBhdGhuYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Jlc29sdmVQYXRobmFtZSk7XG5cbnZhciBfdmFsdWVFcXVhbCA9IHJlcXVpcmUoJ3ZhbHVlLWVxdWFsJyk7XG5cbnZhciBfdmFsdWVFcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92YWx1ZUVxdWFsKTtcblxudmFyIF9QYXRoVXRpbHMgPSByZXF1aXJlKCcuL1BhdGhVdGlscycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlTG9jYXRpb24gPSBleHBvcnRzLmNyZWF0ZUxvY2F0aW9uID0gZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSwgY3VycmVudExvY2F0aW9uKSB7XG4gIHZhciBsb2NhdGlvbiA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9ICgwLCBfUGF0aFV0aWxzLnBhcnNlUGF0aCkocGF0aCk7XG4gICAgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBPbmUtYXJnIGZvcm06IHB1c2gobG9jYXRpb24pXG4gICAgbG9jYXRpb24gPSBfZXh0ZW5kcyh7fSwgcGF0aCk7XG5cbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24ucGF0aG5hbWUgPSAnJztcblxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2guY2hhckF0KDApICE9PSAnPycpIGxvY2F0aW9uLnNlYXJjaCA9ICc/JyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBsb2NhdGlvbi5oYXNoID0gJyMnICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkICYmIGxvY2F0aW9uLnN0YXRlID09PSB1bmRlZmluZWQpIGxvY2F0aW9uLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICB0cnkge1xuICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgVVJJRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBVUklFcnJvcignUGF0aG5hbWUgXCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCIgY291bGQgbm90IGJlIGRlY29kZWQuICcgKyAnVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGFuIGludmFsaWQgcGVyY2VudC1lbmNvZGluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBpZiAoa2V5KSBsb2NhdGlvbi5rZXkgPSBrZXk7XG5cbiAgaWYgKGN1cnJlbnRMb2NhdGlvbikge1xuICAgIC8vIFJlc29sdmUgaW5jb21wbGV0ZS9yZWxhdGl2ZSBwYXRobmFtZSByZWxhdGl2ZSB0byBjdXJyZW50IGxvY2F0aW9uLlxuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gY3VycmVudExvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gKDAsIF9yZXNvbHZlUGF0aG5hbWUyLmRlZmF1bHQpKGxvY2F0aW9uLnBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHByaW9yIGxvY2F0aW9uIGFuZCBwYXRobmFtZSBpcyBlbXB0eSwgc2V0IGl0IHRvIC9cbiAgICBpZiAoIWxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsb2NhdGlvbi5wYXRobmFtZSA9ICcvJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbG9jYXRpb247XG59O1xuXG52YXIgbG9jYXRpb25zQXJlRXF1YWwgPSBleHBvcnRzLmxvY2F0aW9uc0FyZUVxdWFsID0gZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwoYSwgYikge1xuICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiYgYS5oYXNoID09PSBiLmhhc2ggJiYgYS5rZXkgPT09IGIua2V5ICYmICgwLCBfdmFsdWVFcXVhbDIuZGVmYXVsdCkoYS5zdGF0ZSwgYi5zdGF0ZSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oaXN0b3J5L0xvY2F0aW9uVXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDU0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpIHtcbiAgdmFyIHByb21wdCA9IG51bGw7XG5cbiAgdmFyIHNldFByb21wdCA9IGZ1bmN0aW9uIHNldFByb21wdChuZXh0UHJvbXB0KSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShwcm9tcHQgPT0gbnVsbCwgJ0EgaGlzdG9yeSBzdXBwb3J0cyBvbmx5IG9uZSBwcm9tcHQgYXQgYSB0aW1lJyk7XG5cbiAgICBwcm9tcHQgPSBuZXh0UHJvbXB0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9tcHQgPT09IG5leHRQcm9tcHQpIHByb21wdCA9IG51bGw7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgY29uZmlybVRyYW5zaXRpb25UbyA9IGZ1bmN0aW9uIGNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvLyBUT0RPOiBJZiBhbm90aGVyIHRyYW5zaXRpb24gc3RhcnRzIHdoaWxlIHdlJ3JlIHN0aWxsIGNvbmZpcm1pbmdcbiAgICAvLyB0aGUgcHJldmlvdXMgb25lLCB3ZSBtYXkgZW5kIHVwIGluIGEgd2VpcmQgc3RhdGUuIEZpZ3VyZSBvdXQgdGhlXG4gICAgLy8gYmVzdCB3YXkgdG8gaGFuZGxlIHRoaXMuXG4gICAgaWYgKHByb21wdCAhPSBudWxsKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdHlwZW9mIHByb21wdCA9PT0gJ2Z1bmN0aW9uJyA/IHByb21wdChsb2NhdGlvbiwgYWN0aW9uKSA6IHByb21wdDtcblxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2V0VXNlckNvbmZpcm1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGdldFVzZXJDb25maXJtYXRpb24ocmVzdWx0LCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgJ0EgaGlzdG9yeSBuZWVkcyBhIGdldFVzZXJDb25maXJtYXRpb24gZnVuY3Rpb24gaW4gb3JkZXIgdG8gdXNlIGEgcHJvbXB0IG1lc3NhZ2UnKTtcblxuICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXR1cm4gZmFsc2UgZnJvbSBhIHRyYW5zaXRpb24gaG9vayB0byBjYW5jZWwgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGxpc3RlbmVycyA9IFtdO1xuXG4gIHZhciBhcHBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFwcGVuZExpc3RlbmVyKGZuKSB7XG4gICAgdmFyIGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKGlzQWN0aXZlKSBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gbGlzdGVuZXI7XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBub3RpZnlMaXN0ZW5lcnMgPSBmdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldFByb21wdDogc2V0UHJvbXB0LFxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG86IGNvbmZpcm1UcmFuc2l0aW9uVG8sXG4gICAgYXBwZW5kTGlzdGVuZXI6IGFwcGVuZExpc3RlbmVyLFxuICAgIG5vdGlmeUxpc3RlbmVyczogbm90aWZ5TGlzdGVuZXJzXG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGlzdG9yeS9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gNTQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHV0dGluZyBoaXN0b3J5IG9uIGNvbnRleHQuXG4gKi9cblxudmFyIFJvdXRlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJvdXRlcigpIHtcbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBtYXRjaDogX3RoaXMuY29tcHV0ZU1hdGNoKF90aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24ucGF0aG5hbWUpXG4gICAgfSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBSb3V0ZXIucHJvdG90eXBlLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm91dGVyOiBfZXh0ZW5kcyh7fSwgdGhpcy5jb250ZXh0LnJvdXRlciwge1xuICAgICAgICBoaXN0b3J5OiB0aGlzLnByb3BzLmhpc3RvcnksXG4gICAgICAgIHJvdXRlOiB7XG4gICAgICAgICAgbG9jYXRpb246IHRoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbixcbiAgICAgICAgICBtYXRjaDogdGhpcy5zdGF0ZS5tYXRjaFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH07XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wdXRlTWF0Y2ggPSBmdW5jdGlvbiBjb21wdXRlTWF0Y2gocGF0aG5hbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogJy8nLFxuICAgICAgdXJsOiAnLycsXG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgaXNFeGFjdDogcGF0aG5hbWUgPT09ICcvJ1xuICAgIH07XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIGhpc3RvcnkgPSBfcHJvcHMuaGlzdG9yeTtcblxuXG4gICAgaW52YXJpYW50KGNoaWxkcmVuID09IG51bGwgfHwgUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID09PSAxLCAnQSA8Um91dGVyPiBtYXkgaGF2ZSBvbmx5IG9uZSBjaGlsZCBlbGVtZW50Jyk7XG5cbiAgICAvLyBEbyB0aGlzIGhlcmUgc28gd2UgY2FuIHNldFN0YXRlIHdoZW4gYSA8UmVkaXJlY3Q+IGNoYW5nZXMgdGhlXG4gICAgLy8gbG9jYXRpb24gaW4gY29tcG9uZW50V2lsbE1vdW50LiBUaGlzIGhhcHBlbnMgZS5nLiB3aGVuIGRvaW5nXG4gICAgLy8gc2VydmVyIHJlbmRlcmluZyB1c2luZyBhIDxTdGF0aWNSb3V0ZXI+LlxuICAgIHRoaXMudW5saXN0ZW4gPSBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICBtYXRjaDogX3RoaXMyLmNvbXB1dGVNYXRjaChoaXN0b3J5LmxvY2F0aW9uLnBhdGhuYW1lKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICB3YXJuaW5nKHRoaXMucHJvcHMuaGlzdG9yeSA9PT0gbmV4dFByb3BzLmhpc3RvcnksICdZb3UgY2Fubm90IGNoYW5nZSA8Um91dGVyIGhpc3Rvcnk+Jyk7XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMudW5saXN0ZW4oKTtcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuID8gUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbikgOiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblJvdXRlci5wcm9wVHlwZXMgPSB7XG4gIGhpc3Rvcnk6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG59O1xuUm91dGVyLmNvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuUm91dGVyLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICByb3V0ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXJvdXRlci9lcy9Sb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gJ3BhdGgtdG8tcmVnZXhwJztcblxudmFyIHBhdHRlcm5DYWNoZSA9IHt9O1xudmFyIGNhY2hlTGltaXQgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50ID0gMDtcblxudmFyIGNvbXBpbGVQYXRoID0gZnVuY3Rpb24gY29tcGlsZVBhdGgocGF0dGVybiwgb3B0aW9ucykge1xuICB2YXIgY2FjaGVLZXkgPSAnJyArIG9wdGlvbnMuZW5kICsgb3B0aW9ucy5zdHJpY3Q7XG4gIHZhciBjYWNoZSA9IHBhdHRlcm5DYWNoZVtjYWNoZUtleV0gfHwgKHBhdHRlcm5DYWNoZVtjYWNoZUtleV0gPSB7fSk7XG5cbiAgaWYgKGNhY2hlW3BhdHRlcm5dKSByZXR1cm4gY2FjaGVbcGF0dGVybl07XG5cbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIHJlID0gcGF0aFRvUmVnZXhwKHBhdHRlcm4sIGtleXMsIG9wdGlvbnMpO1xuICB2YXIgY29tcGlsZWRQYXR0ZXJuID0geyByZTogcmUsIGtleXM6IGtleXMgfTtcblxuICBpZiAoY2FjaGVDb3VudCA8IGNhY2hlTGltaXQpIHtcbiAgICBjYWNoZVtwYXR0ZXJuXSA9IGNvbXBpbGVkUGF0dGVybjtcbiAgICBjYWNoZUNvdW50Kys7XG4gIH1cblxuICByZXR1cm4gY29tcGlsZWRQYXR0ZXJuO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBtYXRjaGluZyBhIFVSTCBwYXRobmFtZSB0byBhIHBhdGggcGF0dGVybi5cbiAqL1xudmFyIG1hdGNoUGF0aCA9IGZ1bmN0aW9uIG1hdGNoUGF0aChwYXRobmFtZSkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgb3B0aW9ucyA9IHsgcGF0aDogb3B0aW9ucyB9O1xuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBfb3B0aW9ucyRwYXRoID0gX29wdGlvbnMucGF0aCxcbiAgICAgIHBhdGggPSBfb3B0aW9ucyRwYXRoID09PSB1bmRlZmluZWQgPyAnLycgOiBfb3B0aW9ucyRwYXRoLFxuICAgICAgX29wdGlvbnMkZXhhY3QgPSBfb3B0aW9ucy5leGFjdCxcbiAgICAgIGV4YWN0ID0gX29wdGlvbnMkZXhhY3QgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX29wdGlvbnMkZXhhY3QsXG4gICAgICBfb3B0aW9ucyRzdHJpY3QgPSBfb3B0aW9ucy5zdHJpY3QsXG4gICAgICBzdHJpY3QgPSBfb3B0aW9ucyRzdHJpY3QgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX29wdGlvbnMkc3RyaWN0O1xuXG4gIHZhciBfY29tcGlsZVBhdGggPSBjb21waWxlUGF0aChwYXRoLCB7IGVuZDogZXhhY3QsIHN0cmljdDogc3RyaWN0IH0pLFxuICAgICAgcmUgPSBfY29tcGlsZVBhdGgucmUsXG4gICAgICBrZXlzID0gX2NvbXBpbGVQYXRoLmtleXM7XG5cbiAgdmFyIG1hdGNoID0gcmUuZXhlYyhwYXRobmFtZSk7XG5cbiAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHVybCA9IG1hdGNoWzBdLFxuICAgICAgdmFsdWVzID0gbWF0Y2guc2xpY2UoMSk7XG5cbiAgdmFyIGlzRXhhY3QgPSBwYXRobmFtZSA9PT0gdXJsO1xuXG4gIGlmIChleGFjdCAmJiAhaXNFeGFjdCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoOiBwYXRoLCAvLyB0aGUgcGF0aCBwYXR0ZXJuIHVzZWQgdG8gbWF0Y2hcbiAgICB1cmw6IHBhdGggPT09ICcvJyAmJiB1cmwgPT09ICcnID8gJy8nIDogdXJsLCAvLyB0aGUgbWF0Y2hlZCBwb3J0aW9uIG9mIHRoZSBVUkxcbiAgICBpc0V4YWN0OiBpc0V4YWN0LCAvLyB3aGV0aGVyIG9yIG5vdCB3ZSBtYXRjaGVkIGV4YWN0bHlcbiAgICBwYXJhbXM6IGtleXMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXksIGluZGV4KSB7XG4gICAgICBtZW1vW2tleS5uYW1lXSA9IHZhbHVlc1tpbmRleF07XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9LCB7fSlcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hdGNoUGF0aDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyL2VzL21hdGNoUGF0aC5qc1xuLy8gbW9kdWxlIGlkID0gNTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NsaWRlcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1zbGljay9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIF90cmFja0hlbHBlciA9IHJlcXVpcmUoJy4vdHJhY2tIZWxwZXInKTtcblxudmFyIF9vYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBfb2JqZWN0QXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29iamVjdEFzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBoZWxwZXJzID0ge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKHByb3BzKSB7XG4gICAgdmFyIHNsaWNrTGlzdCA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzLmxpc3QpO1xuXG4gICAgdmFyIHNsaWRlQ291bnQgPSBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4uY291bnQocHJvcHMuY2hpbGRyZW4pO1xuICAgIHZhciBsaXN0V2lkdGggPSB0aGlzLmdldFdpZHRoKHNsaWNrTGlzdCk7XG4gICAgdmFyIHRyYWNrV2lkdGggPSB0aGlzLmdldFdpZHRoKF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzLnRyYWNrKSk7XG4gICAgdmFyIHNsaWRlV2lkdGg7XG5cbiAgICBpZiAoIXByb3BzLnZlcnRpY2FsKSB7XG4gICAgICB2YXIgY2VudGVyUGFkZGluZ0FkaiA9IHByb3BzLmNlbnRlck1vZGUgJiYgcGFyc2VJbnQocHJvcHMuY2VudGVyUGFkZGluZykgKiAyO1xuICAgICAgc2xpZGVXaWR0aCA9ICh0aGlzLmdldFdpZHRoKF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZSh0aGlzKSkgLSBjZW50ZXJQYWRkaW5nQWRqKSAvIHByb3BzLnNsaWRlc1RvU2hvdztcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVXaWR0aCA9IHRoaXMuZ2V0V2lkdGgoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKTtcbiAgICB9XG5cbiAgICB2YXIgc2xpZGVIZWlnaHQgPSB0aGlzLmdldEhlaWdodChzbGlja0xpc3QucXVlcnlTZWxlY3RvcignW2RhdGEtaW5kZXg9XCIwXCJdJykpO1xuICAgIHZhciBsaXN0SGVpZ2h0ID0gc2xpZGVIZWlnaHQgKiBwcm9wcy5zbGlkZXNUb1Nob3c7XG5cbiAgICB2YXIgY3VycmVudFNsaWRlID0gcHJvcHMucnRsID8gc2xpZGVDb3VudCAtIDEgLSBwcm9wcy5pbml0aWFsU2xpZGUgOiBwcm9wcy5pbml0aWFsU2xpZGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlQ291bnQ6IHNsaWRlQ291bnQsXG4gICAgICBzbGlkZVdpZHRoOiBzbGlkZVdpZHRoLFxuICAgICAgbGlzdFdpZHRoOiBsaXN0V2lkdGgsXG4gICAgICB0cmFja1dpZHRoOiB0cmFja1dpZHRoLFxuICAgICAgY3VycmVudFNsaWRlOiBjdXJyZW50U2xpZGUsXG4gICAgICBzbGlkZUhlaWdodDogc2xpZGVIZWlnaHQsXG4gICAgICBsaXN0SGVpZ2h0OiBsaXN0SGVpZ2h0XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgdGFyZ2V0TGVmdCA9ICgwLCBfdHJhY2tIZWxwZXIuZ2V0VHJhY2tMZWZ0KSgoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoe1xuICAgICAgICBzbGlkZUluZGV4OiB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSxcbiAgICAgICAgdHJhY2tSZWY6IHRoaXMudHJhY2tcbiAgICAgIH0sIHByb3BzLCB0aGlzLnN0YXRlKSk7XG4gICAgICAvLyBnZXRDU1MgZnVuY3Rpb24gbmVlZHMgcHJldmlvdXNseSBzZXQgc3RhdGVcbiAgICAgIHZhciB0cmFja1N0eWxlID0gKDAsIF90cmFja0hlbHBlci5nZXRUcmFja0NTUykoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHsgbGVmdDogdGFyZ2V0TGVmdCB9LCBwcm9wcywgdGhpcy5zdGF0ZSkpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgdHJhY2tTdHlsZTogdHJhY2tTdHlsZSB9KTtcblxuICAgICAgdGhpcy5hdXRvUGxheSgpOyAvLyBvbmNlIHdlJ3JlIHNldCB1cCwgdHJpZ2dlciB0aGUgaW5pdGlhbCBhdXRvcGxheS5cbiAgICB9KTtcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocHJvcHMpIHtcbiAgICB2YXIgc2xpY2tMaXN0ID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMubGlzdCk7XG4gICAgLy8gVGhpcyBtZXRob2QgaGFzIG1vc3RseSBzYW1lIGNvZGUgYXMgaW5pdGlhbGl6ZSBtZXRob2QuXG4gICAgLy8gUmVmYWN0b3IgaXRcbiAgICB2YXIgc2xpZGVDb3VudCA9IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi5jb3VudChwcm9wcy5jaGlsZHJlbik7XG4gICAgdmFyIGxpc3RXaWR0aCA9IHRoaXMuZ2V0V2lkdGgoc2xpY2tMaXN0KTtcbiAgICB2YXIgdHJhY2tXaWR0aCA9IHRoaXMuZ2V0V2lkdGgoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMudHJhY2spKTtcbiAgICB2YXIgc2xpZGVXaWR0aDtcblxuICAgIGlmICghcHJvcHMudmVydGljYWwpIHtcbiAgICAgIHZhciBjZW50ZXJQYWRkaW5nQWRqID0gcHJvcHMuY2VudGVyTW9kZSAmJiBwYXJzZUludChwcm9wcy5jZW50ZXJQYWRkaW5nKSAqIDI7XG4gICAgICBzbGlkZVdpZHRoID0gKHRoaXMuZ2V0V2lkdGgoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKSAtIGNlbnRlclBhZGRpbmdBZGopIC8gcHJvcHMuc2xpZGVzVG9TaG93O1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZVdpZHRoID0gdGhpcy5nZXRXaWR0aChfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcykpO1xuICAgIH1cblxuICAgIHZhciBzbGlkZUhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KHNsaWNrTGlzdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbmRleD1cIjBcIl0nKSk7XG4gICAgdmFyIGxpc3RIZWlnaHQgPSBzbGlkZUhlaWdodCAqIHByb3BzLnNsaWRlc1RvU2hvdztcblxuICAgIC8vIHBhdXNlIHNsaWRlciBpZiBhdXRvcGxheSBpcyBzZXQgdG8gZmFsc2VcbiAgICBpZiAocHJvcHMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRvUGxheSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVDb3VudDogc2xpZGVDb3VudCxcbiAgICAgIHNsaWRlV2lkdGg6IHNsaWRlV2lkdGgsXG4gICAgICBsaXN0V2lkdGg6IGxpc3RXaWR0aCxcbiAgICAgIHRyYWNrV2lkdGg6IHRyYWNrV2lkdGgsXG4gICAgICBzbGlkZUhlaWdodDogc2xpZGVIZWlnaHQsXG4gICAgICBsaXN0SGVpZ2h0OiBsaXN0SGVpZ2h0XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgdGFyZ2V0TGVmdCA9ICgwLCBfdHJhY2tIZWxwZXIuZ2V0VHJhY2tMZWZ0KSgoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoe1xuICAgICAgICBzbGlkZUluZGV4OiB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSxcbiAgICAgICAgdHJhY2tSZWY6IHRoaXMudHJhY2tcbiAgICAgIH0sIHByb3BzLCB0aGlzLnN0YXRlKSk7XG4gICAgICAvLyBnZXRDU1MgZnVuY3Rpb24gbmVlZHMgcHJldmlvdXNseSBzZXQgc3RhdGVcbiAgICAgIHZhciB0cmFja1N0eWxlID0gKDAsIF90cmFja0hlbHBlci5nZXRUcmFja0NTUykoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHsgbGVmdDogdGFyZ2V0TGVmdCB9LCBwcm9wcywgdGhpcy5zdGF0ZSkpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgdHJhY2tTdHlsZTogdHJhY2tTdHlsZSB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0V2lkdGg6IGZ1bmN0aW9uIGdldFdpZHRoKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCBlbGVtLm9mZnNldFdpZHRoIHx8IDA7XG4gIH0sXG4gIGdldEhlaWdodDogZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgZWxlbS5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgfSxcblxuICBhZGFwdEhlaWdodDogZnVuY3Rpb24gYWRhcHRIZWlnaHQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRhcHRpdmVIZWlnaHQpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9ICdbZGF0YS1pbmRleD1cIicgKyB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSArICdcIl0nO1xuICAgICAgaWYgKHRoaXMubGlzdCkge1xuICAgICAgICB2YXIgc2xpY2tMaXN0ID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMubGlzdCk7XG4gICAgICAgIHNsaWNrTGlzdC5zdHlsZS5oZWlnaHQgPSBzbGlja0xpc3QucXVlcnlTZWxlY3RvcihzZWxlY3Rvcikub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNhbkdvTmV4dDogZnVuY3Rpb24gY2FuR29OZXh0KG9wdHMpIHtcbiAgICB2YXIgY2FuR28gPSB0cnVlO1xuICAgIGlmICghb3B0cy5pbmZpbml0ZSkge1xuICAgICAgaWYgKG9wdHMuY2VudGVyTW9kZSkge1xuICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHNsaWRlIGlzIGxhc3Qgc2xpZGVcbiAgICAgICAgaWYgKG9wdHMuY3VycmVudFNsaWRlID49IG9wdHMuc2xpZGVDb3VudCAtIDEpIHtcbiAgICAgICAgICBjYW5HbyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjaGVjayBpZiBhbGwgc2xpZGVzIGFyZSBzaG93biBpbiBzbGlkZXJcbiAgICAgICAgaWYgKG9wdHMuc2xpZGVDb3VudCA8PSBvcHRzLnNsaWRlc1RvU2hvdyB8fCBvcHRzLmN1cnJlbnRTbGlkZSA+PSBvcHRzLnNsaWRlQ291bnQgLSBvcHRzLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgIGNhbkdvID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhbkdvO1xuICB9LFxuICBzbGlkZUhhbmRsZXI6IGZ1bmN0aW9uIHNsaWRlSGFuZGxlcihpbmRleCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBGdW5jdGlvbmFsaXR5IG9mIGFuaW1hdGVTbGlkZSBhbmQgcG9zdFNsaWRlIGlzIG1lcmdlZCBpbnRvIHRoaXMgZnVuY3Rpb25cbiAgICAvLyBjb25zb2xlLmxvZygnc2xpZGVIYW5kbGVyJywgaW5kZXgpO1xuICAgIHZhciB0YXJnZXRTbGlkZSwgY3VycmVudFNsaWRlO1xuICAgIHZhciB0YXJnZXRMZWZ0LCBjdXJyZW50TGVmdDtcbiAgICB2YXIgY2FsbGJhY2s7XG5cbiAgICBpZiAodGhpcy5wcm9wcy53YWl0Rm9yQW5pbWF0ZSAmJiB0aGlzLnN0YXRlLmFuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmZhZGUpIHtcbiAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlO1xuXG4gICAgICAvLyBEb24ndCBjaGFuZ2Ugc2xpZGUgaWYgaXQncyBub3QgaW5maXRlIGFuZCBjdXJyZW50IHNsaWRlIGlzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5maW5pdGUgPT09IGZhbHNlICYmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vICBTaGlmdGluZyB0YXJnZXRTbGlkZSBiYWNrIGludG8gdGhlIHJhbmdlXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRhcmdldFNsaWRlID0gaW5kZXggKyB0aGlzLnN0YXRlLnNsaWRlQ291bnQ7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID49IHRoaXMuc3RhdGUuc2xpZGVDb3VudCkge1xuICAgICAgICB0YXJnZXRTbGlkZSA9IGluZGV4IC0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0U2xpZGUgPSBpbmRleDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucHJvcHMubGF6eUxvYWQgJiYgdGhpcy5zdGF0ZS5sYXp5TG9hZGVkTGlzdC5pbmRleE9mKHRhcmdldFNsaWRlKSA8IDApIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbGF6eUxvYWRlZExpc3Q6IHRoaXMuc3RhdGUubGF6eUxvYWRlZExpc3QuY29uY2F0KHRhcmdldFNsaWRlKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiBjYWxsYmFjaygpIHtcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGFuaW1hdGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChfdGhpcy5wcm9wcy5hZnRlckNoYW5nZSkge1xuICAgICAgICAgIF90aGlzLnByb3BzLmFmdGVyQ2hhbmdlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgX3RoaXMuYW5pbWF0aW9uRW5kQ2FsbGJhY2s7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYW5pbWF0aW5nOiB0cnVlLFxuICAgICAgICBjdXJyZW50U2xpZGU6IHRhcmdldFNsaWRlXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kQ2FsbGJhY2sgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aGlzLnByb3BzLnNwZWVkKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5iZWZvcmVDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5iZWZvcmVDaGFuZ2UodGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUsIHRhcmdldFNsaWRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hdXRvUGxheSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRhcmdldFNsaWRlID0gaW5kZXg7XG4gICAgaWYgKHRhcmdldFNsaWRlIDwgMCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuc2xpZGVDb3VudCAlIHRoaXMucHJvcHMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgY3VycmVudFNsaWRlID0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50IC0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50ICUgdGhpcy5wcm9wcy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXMuc3RhdGUuc2xpZGVDb3VudCArIHRhcmdldFNsaWRlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0U2xpZGUgPj0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50KSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY3VycmVudFNsaWRlID0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50IC0gdGhpcy5wcm9wcy5zbGlkZXNUb1Nob3c7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuc2xpZGVDb3VudCAlIHRoaXMucHJvcHMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgY3VycmVudFNsaWRlID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZSA9IHRhcmdldFNsaWRlIC0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50U2xpZGUgPSB0YXJnZXRTbGlkZTtcbiAgICB9XG5cbiAgICB0YXJnZXRMZWZ0ID0gKDAsIF90cmFja0hlbHBlci5nZXRUcmFja0xlZnQpKCgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7XG4gICAgICBzbGlkZUluZGV4OiB0YXJnZXRTbGlkZSxcbiAgICAgIHRyYWNrUmVmOiB0aGlzLnRyYWNrXG4gICAgfSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSkpO1xuXG4gICAgY3VycmVudExlZnQgPSAoMCwgX3RyYWNrSGVscGVyLmdldFRyYWNrTGVmdCkoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHtcbiAgICAgIHNsaWRlSW5kZXg6IGN1cnJlbnRTbGlkZSxcbiAgICAgIHRyYWNrUmVmOiB0aGlzLnRyYWNrXG4gICAgfSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSkpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICB0YXJnZXRMZWZ0ID0gY3VycmVudExlZnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuYmVmb3JlQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLmJlZm9yZUNoYW5nZSh0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSwgY3VycmVudFNsaWRlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5sYXp5TG9hZCkge1xuICAgICAgdmFyIGxvYWRlZCA9IHRydWU7XG4gICAgICB2YXIgc2xpZGVzVG9Mb2FkID0gW107XG4gICAgICBmb3IgKHZhciBpID0gdGFyZ2V0U2xpZGU7IGkgPCB0YXJnZXRTbGlkZSArIHRoaXMucHJvcHMuc2xpZGVzVG9TaG93OyBpKyspIHtcbiAgICAgICAgbG9hZGVkID0gbG9hZGVkICYmIHRoaXMuc3RhdGUubGF6eUxvYWRlZExpc3QuaW5kZXhPZihpKSA+PSAwO1xuICAgICAgICBpZiAoIWxvYWRlZCkge1xuICAgICAgICAgIHNsaWRlc1RvTG9hZC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWxvYWRlZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBsYXp5TG9hZGVkTGlzdDogdGhpcy5zdGF0ZS5sYXp5TG9hZGVkTGlzdC5jb25jYXQoc2xpZGVzVG9Mb2FkKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTbGlkZSBUcmFuc2l0aW9uIGhhcHBlbnMgaGVyZS5cbiAgICAvLyBhbmltYXRlZCB0cmFuc2l0aW9uIGhhcHBlbnMgdG8gdGFyZ2V0IFNsaWRlIGFuZFxuICAgIC8vIG5vbiAtIGFuaW1hdGVkIHRyYW5zaXRpb24gaGFwcGVucyB0byBjdXJyZW50IFNsaWRlXG4gICAgLy8gSWYgQ1NTIHRyYW5zaXRpb25zIGFyZSBmYWxzZSwgZGlyZWN0bHkgZ28gdGhlIGN1cnJlbnQgc2xpZGUuXG5cbiAgICBpZiAodGhpcy5wcm9wcy51c2VDU1MgPT09IGZhbHNlKSB7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50U2xpZGU6IGN1cnJlbnRTbGlkZSxcbiAgICAgICAgdHJhY2tTdHlsZTogKDAsIF90cmFja0hlbHBlci5nZXRUcmFja0NTUykoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHsgbGVmdDogY3VycmVudExlZnQgfSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSkpXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmFmdGVyQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5hZnRlckNoYW5nZShjdXJyZW50U2xpZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICB2YXIgbmV4dFN0YXRlQ2hhbmdlcyA9IHtcbiAgICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgICAgY3VycmVudFNsaWRlOiBjdXJyZW50U2xpZGUsXG4gICAgICAgIHRyYWNrU3R5bGU6ICgwLCBfdHJhY2tIZWxwZXIuZ2V0VHJhY2tDU1MpKCgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7IGxlZnQ6IGN1cnJlbnRMZWZ0IH0sIHRoaXMucHJvcHMsIHRoaXMuc3RhdGUpKSxcbiAgICAgICAgc3dpcGVMZWZ0OiBudWxsXG4gICAgICB9O1xuXG4gICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKCkge1xuICAgICAgICBfdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGVDaGFuZ2VzKTtcbiAgICAgICAgaWYgKF90aGlzLnByb3BzLmFmdGVyQ2hhbmdlKSB7XG4gICAgICAgICAgX3RoaXMucHJvcHMuYWZ0ZXJDaGFuZ2UoY3VycmVudFNsaWRlKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgX3RoaXMuYW5pbWF0aW9uRW5kQ2FsbGJhY2s7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYW5pbWF0aW5nOiB0cnVlLFxuICAgICAgICBjdXJyZW50U2xpZGU6IGN1cnJlbnRTbGlkZSxcbiAgICAgICAgdHJhY2tTdHlsZTogKDAsIF90cmFja0hlbHBlci5nZXRUcmFja0FuaW1hdGVDU1MpKCgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7IGxlZnQ6IHRhcmdldExlZnQgfSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSkpXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kQ2FsbGJhY2sgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aGlzLnByb3BzLnNwZWVkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuYXV0b1BsYXkoKTtcbiAgfSxcbiAgc3dpcGVEaXJlY3Rpb246IGZ1bmN0aW9uIHN3aXBlRGlyZWN0aW9uKHRvdWNoT2JqZWN0KSB7XG4gICAgdmFyIHhEaXN0LCB5RGlzdCwgciwgc3dpcGVBbmdsZTtcblxuICAgIHhEaXN0ID0gdG91Y2hPYmplY3Quc3RhcnRYIC0gdG91Y2hPYmplY3QuY3VyWDtcbiAgICB5RGlzdCA9IHRvdWNoT2JqZWN0LnN0YXJ0WSAtIHRvdWNoT2JqZWN0LmN1clk7XG4gICAgciA9IE1hdGguYXRhbjIoeURpc3QsIHhEaXN0KTtcblxuICAgIHN3aXBlQW5nbGUgPSBNYXRoLnJvdW5kKHIgKiAxODAgLyBNYXRoLlBJKTtcbiAgICBpZiAoc3dpcGVBbmdsZSA8IDApIHtcbiAgICAgIHN3aXBlQW5nbGUgPSAzNjAgLSBNYXRoLmFicyhzd2lwZUFuZ2xlKTtcbiAgICB9XG4gICAgaWYgKHN3aXBlQW5nbGUgPD0gNDUgJiYgc3dpcGVBbmdsZSA+PSAwIHx8IHN3aXBlQW5nbGUgPD0gMzYwICYmIHN3aXBlQW5nbGUgPj0gMzE1KSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydGwgPT09IGZhbHNlID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICB9XG4gICAgaWYgKHN3aXBlQW5nbGUgPj0gMTM1ICYmIHN3aXBlQW5nbGUgPD0gMjI1KSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydGwgPT09IGZhbHNlID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICBpZiAoc3dpcGVBbmdsZSA+PSAzNSAmJiBzd2lwZUFuZ2xlIDw9IDEzNSkge1xuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG4gIH0sXG4gIHBsYXk6IGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgdmFyIG5leHRJbmRleDtcblxuICAgIGlmICghdGhpcy5zdGF0ZS5tb3VudGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucnRsKSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSAtIHRoaXMucHJvcHMuc2xpZGVzVG9TY3JvbGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNhbkdvTmV4dChfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSkpKSB7XG4gICAgICAgIG5leHRJbmRleCA9IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlICsgdGhpcy5wcm9wcy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlSGFuZGxlcihuZXh0SW5kZXgpO1xuICB9LFxuICBhdXRvUGxheTogZnVuY3Rpb24gYXV0b1BsYXkoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuYXV0b1BsYXlUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc3RhdGUuYXV0b1BsYXlUaW1lcik7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYXV0b1BsYXlUaW1lcjogc2V0VGltZW91dCh0aGlzLnBsYXksIHRoaXMucHJvcHMuYXV0b3BsYXlTcGVlZClcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgcGF1c2U6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmF1dG9QbGF5VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnN0YXRlLmF1dG9QbGF5VGltZXIpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGF1dG9QbGF5VGltZXI6IG51bGxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaGVscGVycztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtc2xpY2svbGliL21peGlucy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGl0ZXJhdGluZyBvdmVyIGEgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0gZm5cbiAqL1xuZnVuY3Rpb24gZWFjaChjb2xsZWN0aW9uLCBmbikge1xuICAgIHZhciBpICAgICAgPSAwLFxuICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgY29udDtcblxuICAgIGZvcihpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29udCA9IGZuKGNvbGxlY3Rpb25baV0sIGkpO1xuICAgICAgICBpZihjb250ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYnJlYWs7IC8vYWxsb3cgZWFybHkgZXhpdFxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0YXJnZXQgb2JqZWN0IGlzIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHRhcmdldCB0aGUgb2JqZWN0IHVuZGVyIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXJyYXksIGZhbHNlIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHRhcmdldCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRhcmdldCBvYmplY3QgaXMgYSBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB0YXJnZXQgdGhlIG9iamVjdCB1bmRlciB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGZ1bmN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih0YXJnZXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNGdW5jdGlvbiA6IGlzRnVuY3Rpb24sXG4gICAgaXNBcnJheSA6IGlzQXJyYXksXG4gICAgZWFjaCA6IGVhY2hcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZW5xdWlyZS5qcy9zcmMvVXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gNTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjYW5Vc2VET00gPSBleHBvcnRzLmNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbnZhciBhZGRFdmVudExpc3RlbmVyID0gZXhwb3J0cy5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudCwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIG5vZGUuYWRkRXZlbnRMaXN0ZW5lciA/IG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSA6IG5vZGUuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG59O1xuXG52YXIgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnQsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPyBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSkgOiBub2RlLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xufTtcblxudmFyIGdldENvbmZpcm1hdGlvbiA9IGV4cG9ydHMuZ2V0Q29uZmlybWF0aW9uID0gZnVuY3Rpb24gZ2V0Q29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFjayh3aW5kb3cuY29uZmlybShtZXNzYWdlKSk7XG59OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBpcyBzdXBwb3J0ZWQuIFRha2VuIGZyb20gTW9kZXJuaXpyLlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9oaXN0b3J5LmpzXG4gKiBjaGFuZ2VkIHRvIGF2b2lkIGZhbHNlIG5lZ2F0aXZlcyBmb3IgV2luZG93cyBQaG9uZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gKi9cbnZhciBzdXBwb3J0c0hpc3RvcnkgPSBleHBvcnRzLnN1cHBvcnRzSGlzdG9yeSA9IGZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpIHtcbiAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgaWYgKCh1YS5pbmRleE9mKCdBbmRyb2lkIDIuJykgIT09IC0xIHx8IHVhLmluZGV4T2YoJ0FuZHJvaWQgNC4wJykgIT09IC0xKSAmJiB1YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgIT09IC0xICYmIHVhLmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSAmJiB1YS5pbmRleE9mKCdXaW5kb3dzIFBob25lJykgPT09IC0xKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYnJvd3NlciBmaXJlcyBwb3BzdGF0ZSBvbiBoYXNoIGNoYW5nZS5cbiAqIElFMTAgYW5kIElFMTEgZG8gbm90LlxuICovXG52YXIgc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSA9IGV4cG9ydHMuc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSA9IGZ1bmN0aW9uIHN1cHBvcnRzUG9wU3RhdGVPbkhhc2hDaGFuZ2UoKSB7XG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdUcmlkZW50JykgPT09IC0xO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHVzaW5nIGdvKG4pIHdpdGggaGFzaCBoaXN0b3J5IGNhdXNlcyBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gKi9cbnZhciBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCA9IGV4cG9ydHMuc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2ggPSBmdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIGdpdmVuIHBvcHN0YXRlIGV2ZW50IGlzIGFuIGV4dHJhbmVvdXMgV2ViS2l0IGV2ZW50LlxuICogQWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgQ2hyb21lIG9uIGlPUyBmaXJlcyByZWFsIHBvcHN0YXRlIGV2ZW50c1xuICogY29udGFpbmluZyB1bmRlZmluZWQgc3RhdGUgd2hlbiBwcmVzc2luZyB0aGUgYmFjayBidXR0b24uXG4gKi9cbnZhciBpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50ID0gZXhwb3J0cy5pc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50ID0gZnVuY3Rpb24gaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGlzdG9yeS9ET01VdGlscy5qc1xuLy8gbW9kdWxlIGlkID0gNTU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxudmFyIGlzTW9kaWZpZWRFdmVudCA9IGZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59O1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciByZW5kZXJpbmcgYSBoaXN0b3J5LWF3YXJlIDxhPi5cbiAqL1xuXG52YXIgTGluayA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaW5rKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGluayk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChfdGhpcy5wcm9wcy5vbkNsaWNrKSBfdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcblxuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIC8vIG9uQ2xpY2sgcHJldmVudGVkIGRlZmF1bHRcbiAgICAgIGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiAvLyBpZ25vcmUgcmlnaHQgY2xpY2tzXG4gICAgICAhX3RoaXMucHJvcHMudGFyZ2V0ICYmIC8vIGxldCBicm93c2VyIGhhbmRsZSBcInRhcmdldD1fYmxhbmtcIiBldGMuXG4gICAgICAhaXNNb2RpZmllZEV2ZW50KGV2ZW50KSAvLyBpZ25vcmUgY2xpY2tzIHdpdGggbW9kaWZpZXIga2V5c1xuICAgICAgKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIHZhciBoaXN0b3J5ID0gX3RoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeTtcbiAgICAgICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgcmVwbGFjZSA9IF90aGlzJHByb3BzLnJlcGxhY2UsXG4gICAgICAgICAgICAgIHRvID0gX3RoaXMkcHJvcHMudG87XG5cblxuICAgICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2UodG8pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaXN0b3J5LnB1c2godG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgTGluay5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICByZXBsYWNlID0gX3Byb3BzLnJlcGxhY2UsXG4gICAgICAgIHRvID0gX3Byb3BzLnRvLFxuICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsncmVwbGFjZScsICd0byddKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgdmFyIGhyZWYgPSB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuY3JlYXRlSHJlZih0eXBlb2YgdG8gPT09ICdzdHJpbmcnID8geyBwYXRobmFtZTogdG8gfSA6IHRvKTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdhJywgX2V4dGVuZHMoe30sIHByb3BzLCB7IG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssIGhyZWY6IGhyZWYgfSkpO1xuICB9O1xuXG4gIHJldHVybiBMaW5rO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5MaW5rLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHRhcmdldDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcmVwbGFjZTogUHJvcFR5cGVzLmJvb2wsXG4gIHRvOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSkuaXNSZXF1aXJlZFxufTtcbkxpbmsuZGVmYXVsdFByb3BzID0ge1xuICByZXBsYWNlOiBmYWxzZVxufTtcbkxpbmsuY29udGV4dFR5cGVzID0ge1xuICByb3V0ZXI6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaGlzdG9yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHB1c2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICByZXBsYWNlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgY3JlYXRlSHJlZjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICAgIH0pLmlzUmVxdWlyZWRcbiAgfSkuaXNSZXF1aXJlZFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL0xpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDU1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbWF0Y2hQYXRoIGZyb20gJy4vbWF0Y2hQYXRoJztcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgbWF0Y2hpbmcgYSBzaW5nbGUgcGF0aCBhbmQgcmVuZGVyaW5nLlxuICovXG5cbnZhciBSb3V0ZSA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhSb3V0ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGUoKSB7XG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSb3V0ZSk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBtYXRjaDogX3RoaXMuY29tcHV0ZU1hdGNoKF90aGlzLnByb3BzLCBfdGhpcy5jb250ZXh0LnJvdXRlcilcbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIFJvdXRlLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdXRlcjogX2V4dGVuZHMoe30sIHRoaXMuY29udGV4dC5yb3V0ZXIsIHtcbiAgICAgICAgcm91dGU6IHtcbiAgICAgICAgICBsb2NhdGlvbjogdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCB0aGlzLmNvbnRleHQucm91dGVyLnJvdXRlLmxvY2F0aW9uLFxuICAgICAgICAgIG1hdGNoOiB0aGlzLnN0YXRlLm1hdGNoXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfTtcbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUuY29tcHV0ZU1hdGNoID0gZnVuY3Rpb24gY29tcHV0ZU1hdGNoKF9yZWYsIF9yZWYyKSB7XG4gICAgdmFyIGNvbXB1dGVkTWF0Y2ggPSBfcmVmLmNvbXB1dGVkTWF0Y2gsXG4gICAgICAgIGxvY2F0aW9uID0gX3JlZi5sb2NhdGlvbixcbiAgICAgICAgcGF0aCA9IF9yZWYucGF0aCxcbiAgICAgICAgc3RyaWN0ID0gX3JlZi5zdHJpY3QsXG4gICAgICAgIGV4YWN0ID0gX3JlZi5leGFjdDtcbiAgICB2YXIgcm91dGUgPSBfcmVmMi5yb3V0ZTtcblxuICAgIGlmIChjb21wdXRlZE1hdGNoKSByZXR1cm4gY29tcHV0ZWRNYXRjaDsgLy8gPFN3aXRjaD4gYWxyZWFkeSBjb21wdXRlZCB0aGUgbWF0Y2ggZm9yIHVzXG5cbiAgICB2YXIgcGF0aG5hbWUgPSAobG9jYXRpb24gfHwgcm91dGUubG9jYXRpb24pLnBhdGhuYW1lO1xuXG4gICAgcmV0dXJuIHBhdGggPyBtYXRjaFBhdGgocGF0aG5hbWUsIHsgcGF0aDogcGF0aCwgc3RyaWN0OiBzdHJpY3QsIGV4YWN0OiBleGFjdCB9KSA6IHJvdXRlLm1hdGNoO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIGNvbXBvbmVudCA9IF9wcm9wcy5jb21wb25lbnQsXG4gICAgICAgIHJlbmRlciA9IF9wcm9wcy5yZW5kZXIsXG4gICAgICAgIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuO1xuXG5cbiAgICB3YXJuaW5nKCEoY29tcG9uZW50ICYmIHJlbmRlciksICdZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlIGNvbXBvbmVudD4gYW5kIDxSb3V0ZSByZW5kZXI+IGluIHRoZSBzYW1lIHJvdXRlOyA8Um91dGUgcmVuZGVyPiB3aWxsIGJlIGlnbm9yZWQnKTtcblxuICAgIHdhcm5pbmcoIShjb21wb25lbnQgJiYgY2hpbGRyZW4pLCAnWW91IHNob3VsZCBub3QgdXNlIDxSb3V0ZSBjb21wb25lbnQ+IGFuZCA8Um91dGUgY2hpbGRyZW4+IGluIHRoZSBzYW1lIHJvdXRlOyA8Um91dGUgY2hpbGRyZW4+IHdpbGwgYmUgaWdub3JlZCcpO1xuXG4gICAgd2FybmluZyghKHJlbmRlciAmJiBjaGlsZHJlbiksICdZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlIHJlbmRlcj4gYW5kIDxSb3V0ZSBjaGlsZHJlbj4gaW4gdGhlIHNhbWUgcm91dGU7IDxSb3V0ZSBjaGlsZHJlbj4gd2lsbCBiZSBpZ25vcmVkJyk7XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICB3YXJuaW5nKCEobmV4dFByb3BzLmxvY2F0aW9uICYmICF0aGlzLnByb3BzLmxvY2F0aW9uKSwgJzxSb3V0ZT4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSB1bmNvbnRyb2xsZWQgdG8gY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBpbml0aWFsbHkgdXNlZCBubyBcImxvY2F0aW9uXCIgcHJvcCBhbmQgdGhlbiBwcm92aWRlZCBvbmUgb24gYSBzdWJzZXF1ZW50IHJlbmRlci4nKTtcblxuICAgIHdhcm5pbmcoISghbmV4dFByb3BzLmxvY2F0aW9uICYmIHRoaXMucHJvcHMubG9jYXRpb24pLCAnPFJvdXRlPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJyk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1hdGNoOiB0aGlzLmNvbXB1dGVNYXRjaChuZXh0UHJvcHMsIG5leHRDb250ZXh0LnJvdXRlcilcbiAgICB9KTtcbiAgfTtcblxuICBSb3V0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMuc3RhdGUubWF0Y2g7XG4gICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICBjaGlsZHJlbiA9IF9wcm9wczIuY2hpbGRyZW4sXG4gICAgICAgIGNvbXBvbmVudCA9IF9wcm9wczIuY29tcG9uZW50LFxuICAgICAgICByZW5kZXIgPSBfcHJvcHMyLnJlbmRlcjtcbiAgICB2YXIgX2NvbnRleHQkcm91dGVyID0gdGhpcy5jb250ZXh0LnJvdXRlcixcbiAgICAgICAgaGlzdG9yeSA9IF9jb250ZXh0JHJvdXRlci5oaXN0b3J5LFxuICAgICAgICByb3V0ZSA9IF9jb250ZXh0JHJvdXRlci5yb3V0ZSxcbiAgICAgICAgc3RhdGljQ29udGV4dCA9IF9jb250ZXh0JHJvdXRlci5zdGF0aWNDb250ZXh0O1xuXG4gICAgdmFyIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCByb3V0ZS5sb2NhdGlvbjtcbiAgICB2YXIgcHJvcHMgPSB7IG1hdGNoOiBtYXRjaCwgbG9jYXRpb246IGxvY2F0aW9uLCBoaXN0b3J5OiBoaXN0b3J5LCBzdGF0aWNDb250ZXh0OiBzdGF0aWNDb250ZXh0IH07XG5cbiAgICByZXR1cm4gY29tcG9uZW50ID8gLy8gY29tcG9uZW50IHByb3AgZ2V0cyBmaXJzdCBwcmlvcml0eSwgb25seSBjYWxsZWQgaWYgdGhlcmUncyBhIG1hdGNoXG4gICAgbWF0Y2ggPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpIDogbnVsbCA6IHJlbmRlciA/IC8vIHJlbmRlciBwcm9wIGlzIG5leHQsIG9ubHkgY2FsbGVkIGlmIHRoZXJlJ3MgYSBtYXRjaFxuICAgIG1hdGNoID8gcmVuZGVyKHByb3BzKSA6IG51bGwgOiBjaGlsZHJlbiA/IC8vIGNoaWxkcmVuIGNvbWUgbGFzdCwgYWx3YXlzIGNhbGxlZFxuICAgIHR5cGVvZiBjaGlsZHJlbiA9PT0gJ2Z1bmN0aW9uJyA/IGNoaWxkcmVuKHByb3BzKSA6ICFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSB8fCBjaGlsZHJlbi5sZW5ndGggPyAvLyBQcmVhY3QgZGVmYXVsdHMgdG8gZW1wdHkgY2hpbGRyZW4gYXJyYXlcbiAgICBSZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKSA6IG51bGwgOiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuUm91dGUucHJvcFR5cGVzID0ge1xuICBjb21wdXRlZE1hdGNoOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBwcml2YXRlLCBmcm9tIDxTd2l0Y2g+XG4gIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgc3RyaWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgY29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgcmVuZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMubm9kZV0pLFxuICBsb2NhdGlvbjogUHJvcFR5cGVzLm9iamVjdFxufTtcblJvdXRlLmNvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGhpc3Rvcnk6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICByb3V0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHN0YXRpY0NvbnRleHQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfSlcbn07XG5Sb3V0ZS5jaGlsZENvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXJvdXRlci9lcy9Sb3V0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgYWNjZXNzaWJpbGl0eTogdHJ1ZSxcbiAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgIGNlbnRlclBhZGRpbmc6ICc1MHB4JyxcbiAgICBjc3NFYXNlOiAnZWFzZScsXG4gICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbiBjdXN0b21QYWdpbmcoaSkge1xuICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBpICsgMVxuICAgICAgICApO1xuICAgIH0sXG4gICAgZG90czogZmFsc2UsXG4gICAgZG90c0NsYXNzOiAnc2xpY2stZG90cycsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgZWRnZUZyaWN0aW9uOiAwLjM1LFxuICAgIGZhZGU6IGZhbHNlLFxuICAgIGZvY3VzT25TZWxlY3Q6IGZhbHNlLFxuICAgIGluZmluaXRlOiB0cnVlLFxuICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICBsYXp5TG9hZDogZmFsc2UsXG4gICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgIHJlc3BvbnNpdmU6IG51bGwsXG4gICAgcnRsOiBmYWxzZSxcbiAgICBzbGlkZTogJ2RpdicsXG4gICAgc2xpZGVzVG9TaG93OiAxLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgIHNwZWVkOiA1MDAsXG4gICAgc3dpcGU6IHRydWUsXG4gICAgc3dpcGVUb1NsaWRlOiBmYWxzZSxcbiAgICB0b3VjaE1vdmU6IHRydWUsXG4gICAgdG91Y2hUaHJlc2hvbGQ6IDUsXG4gICAgdXNlQ1NTOiB0cnVlLFxuICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgIHZlcnRpY2FsOiBmYWxzZSxcbiAgICB3YWl0Rm9yQW5pbWF0ZTogdHJ1ZSxcbiAgICBhZnRlckNoYW5nZTogbnVsbCxcbiAgICBiZWZvcmVDaGFuZ2U6IG51bGwsXG4gICAgZWRnZUV2ZW50OiBudWxsLFxuICAgIGluaXQ6IG51bGwsXG4gICAgc3dpcGVFdmVudDogbnVsbCxcbiAgICAvLyBuZXh0QXJyb3csIHByZXZBcnJvdyBhcmUgcmVhY3QgY29tcG9uZXRzXG4gICAgbmV4dEFycm93OiBudWxsLFxuICAgIHByZXZBcnJvdzogbnVsbFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0UHJvcHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXNsaWNrL2xpYi9kZWZhdWx0LXByb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5nZXRUcmFja0xlZnQgPSBleHBvcnRzLmdldFRyYWNrQW5pbWF0ZUNTUyA9IGV4cG9ydHMuZ2V0VHJhY2tDU1MgPSB1bmRlZmluZWQ7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbnZhciBfb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX29iamVjdEFzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RBc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY2hlY2tTcGVjS2V5cyA9IGZ1bmN0aW9uIGNoZWNrU3BlY0tleXMoc3BlYywga2V5c0FycmF5KSB7XG4gIHJldHVybiBrZXlzQXJyYXkucmVkdWNlKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHNwZWMuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfSwgdHJ1ZSkgPyBudWxsIDogY29uc29sZS5lcnJvcignS2V5cyBNaXNzaW5nJywgc3BlYyk7XG59O1xuXG52YXIgZ2V0VHJhY2tDU1MgPSBleHBvcnRzLmdldFRyYWNrQ1NTID0gZnVuY3Rpb24gZ2V0VHJhY2tDU1Moc3BlYykge1xuICBjaGVja1NwZWNLZXlzKHNwZWMsIFsnbGVmdCcsICd2YXJpYWJsZVdpZHRoJywgJ3NsaWRlQ291bnQnLCAnc2xpZGVzVG9TaG93JywgJ3NsaWRlV2lkdGgnXSk7XG5cbiAgdmFyIHRyYWNrV2lkdGgsIHRyYWNrSGVpZ2h0O1xuXG4gIHZhciB0cmFja0NoaWxkcmVuID0gc3BlYy5zbGlkZUNvdW50ICsgMiAqIHNwZWMuc2xpZGVzVG9TaG93O1xuXG4gIGlmICghc3BlYy52ZXJ0aWNhbCkge1xuICAgIGlmIChzcGVjLnZhcmlhYmxlV2lkdGgpIHtcbiAgICAgIHRyYWNrV2lkdGggPSAoc3BlYy5zbGlkZUNvdW50ICsgMiAqIHNwZWMuc2xpZGVzVG9TaG93KSAqIHNwZWMuc2xpZGVXaWR0aDtcbiAgICB9IGVsc2UgaWYgKHNwZWMuY2VudGVyTW9kZSkge1xuICAgICAgdHJhY2tXaWR0aCA9IChzcGVjLnNsaWRlQ291bnQgKyAyICogKHNwZWMuc2xpZGVzVG9TaG93ICsgMSkpICogc3BlYy5zbGlkZVdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFja1dpZHRoID0gKHNwZWMuc2xpZGVDb3VudCArIDIgKiBzcGVjLnNsaWRlc1RvU2hvdykgKiBzcGVjLnNsaWRlV2lkdGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRyYWNrSGVpZ2h0ID0gdHJhY2tDaGlsZHJlbiAqIHNwZWMuc2xpZGVIZWlnaHQ7XG4gIH1cblxuICB2YXIgc3R5bGUgPSB7XG4gICAgb3BhY2l0eTogMSxcbiAgICBXZWJraXRUcmFuc2Zvcm06ICFzcGVjLnZlcnRpY2FsID8gJ3RyYW5zbGF0ZTNkKCcgKyBzcGVjLmxlZnQgKyAncHgsIDBweCwgMHB4KScgOiAndHJhbnNsYXRlM2QoMHB4LCAnICsgc3BlYy5sZWZ0ICsgJ3B4LCAwcHgpJyxcbiAgICB0cmFuc2Zvcm06ICFzcGVjLnZlcnRpY2FsID8gJ3RyYW5zbGF0ZTNkKCcgKyBzcGVjLmxlZnQgKyAncHgsIDBweCwgMHB4KScgOiAndHJhbnNsYXRlM2QoMHB4LCAnICsgc3BlYy5sZWZ0ICsgJ3B4LCAwcHgpJyxcbiAgICB0cmFuc2l0aW9uOiAnJyxcbiAgICBXZWJraXRUcmFuc2l0aW9uOiAnJyxcbiAgICBtc1RyYW5zZm9ybTogIXNwZWMudmVydGljYWwgPyAndHJhbnNsYXRlWCgnICsgc3BlYy5sZWZ0ICsgJ3B4KScgOiAndHJhbnNsYXRlWSgnICsgc3BlYy5sZWZ0ICsgJ3B4KSdcbiAgfTtcblxuICBpZiAodHJhY2tXaWR0aCkge1xuICAgICgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KShzdHlsZSwgeyB3aWR0aDogdHJhY2tXaWR0aCB9KTtcbiAgfVxuXG4gIGlmICh0cmFja0hlaWdodCkge1xuICAgICgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KShzdHlsZSwgeyBoZWlnaHQ6IHRyYWNrSGVpZ2h0IH0pO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgZm9yIElFOFxuICBpZiAod2luZG93ICYmICF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAmJiB3aW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICBpZiAoIXNwZWMudmVydGljYWwpIHtcbiAgICAgIHN0eWxlLm1hcmdpbkxlZnQgPSBzcGVjLmxlZnQgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5tYXJnaW5Ub3AgPSBzcGVjLmxlZnQgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn07XG5cbnZhciBnZXRUcmFja0FuaW1hdGVDU1MgPSBleHBvcnRzLmdldFRyYWNrQW5pbWF0ZUNTUyA9IGZ1bmN0aW9uIGdldFRyYWNrQW5pbWF0ZUNTUyhzcGVjKSB7XG4gIGNoZWNrU3BlY0tleXMoc3BlYywgWydsZWZ0JywgJ3ZhcmlhYmxlV2lkdGgnLCAnc2xpZGVDb3VudCcsICdzbGlkZXNUb1Nob3cnLCAnc2xpZGVXaWR0aCcsICdzcGVlZCcsICdjc3NFYXNlJ10pO1xuXG4gIHZhciBzdHlsZSA9IGdldFRyYWNrQ1NTKHNwZWMpO1xuICAvLyB1c2VDU1MgaXMgdHJ1ZSBieSBkZWZhdWx0IHNvIGl0IGNhbiBiZSB1bmRlZmluZWRcbiAgc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9ICctd2Via2l0LXRyYW5zZm9ybSAnICsgc3BlYy5zcGVlZCArICdtcyAnICsgc3BlYy5jc3NFYXNlO1xuICBzdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAnICsgc3BlYy5zcGVlZCArICdtcyAnICsgc3BlYy5jc3NFYXNlO1xuICByZXR1cm4gc3R5bGU7XG59O1xuXG52YXIgZ2V0VHJhY2tMZWZ0ID0gZXhwb3J0cy5nZXRUcmFja0xlZnQgPSBmdW5jdGlvbiBnZXRUcmFja0xlZnQoc3BlYykge1xuXG4gIGNoZWNrU3BlY0tleXMoc3BlYywgWydzbGlkZUluZGV4JywgJ3RyYWNrUmVmJywgJ2luZmluaXRlJywgJ2NlbnRlck1vZGUnLCAnc2xpZGVDb3VudCcsICdzbGlkZXNUb1Nob3cnLCAnc2xpZGVzVG9TY3JvbGwnLCAnc2xpZGVXaWR0aCcsICdsaXN0V2lkdGgnLCAndmFyaWFibGVXaWR0aCcsICdzbGlkZUhlaWdodCddKTtcblxuICB2YXIgc2xpZGVPZmZzZXQgPSAwO1xuICB2YXIgdGFyZ2V0TGVmdDtcbiAgdmFyIHRhcmdldFNsaWRlO1xuICB2YXIgdmVydGljYWxPZmZzZXQgPSAwO1xuXG4gIGlmIChzcGVjLmZhZGUpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChzcGVjLmluZmluaXRlKSB7XG4gICAgaWYgKHNwZWMuc2xpZGVDb3VudCA+PSBzcGVjLnNsaWRlc1RvU2hvdykge1xuICAgICAgc2xpZGVPZmZzZXQgPSBzcGVjLnNsaWRlV2lkdGggKiBzcGVjLnNsaWRlc1RvU2hvdyAqIC0xO1xuICAgICAgdmVydGljYWxPZmZzZXQgPSBzcGVjLnNsaWRlSGVpZ2h0ICogc3BlYy5zbGlkZXNUb1Nob3cgKiAtMTtcbiAgICB9XG4gICAgaWYgKHNwZWMuc2xpZGVDb3VudCAlIHNwZWMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgIGlmIChzcGVjLnNsaWRlSW5kZXggKyBzcGVjLnNsaWRlc1RvU2Nyb2xsID4gc3BlYy5zbGlkZUNvdW50ICYmIHNwZWMuc2xpZGVDb3VudCA+IHNwZWMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgIGlmIChzcGVjLnNsaWRlSW5kZXggPiBzcGVjLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICBzbGlkZU9mZnNldCA9IChzcGVjLnNsaWRlc1RvU2hvdyAtIChzcGVjLnNsaWRlSW5kZXggLSBzcGVjLnNsaWRlQ291bnQpKSAqIHNwZWMuc2xpZGVXaWR0aCAqIC0xO1xuICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKHNwZWMuc2xpZGVzVG9TaG93IC0gKHNwZWMuc2xpZGVJbmRleCAtIHNwZWMuc2xpZGVDb3VudCkpICogc3BlYy5zbGlkZUhlaWdodCAqIC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gc3BlYy5zbGlkZUNvdW50ICUgc3BlYy5zbGlkZXNUb1Njcm9sbCAqIHNwZWMuc2xpZGVXaWR0aCAqIC0xO1xuICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gc3BlYy5zbGlkZUNvdW50ICUgc3BlYy5zbGlkZXNUb1Njcm9sbCAqIHNwZWMuc2xpZGVIZWlnaHQgKiAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcblxuICAgIGlmIChzcGVjLnNsaWRlQ291bnQgJSBzcGVjLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICBpZiAoc3BlYy5zbGlkZUluZGV4ICsgc3BlYy5zbGlkZXNUb1Njcm9sbCA+IHNwZWMuc2xpZGVDb3VudCAmJiBzcGVjLnNsaWRlQ291bnQgPiBzcGVjLnNsaWRlc1RvU2hvdykge1xuICAgICAgICB2YXIgc2xpZGVzVG9PZmZzZXQgPSBzcGVjLnNsaWRlc1RvU2hvdyAtIHNwZWMuc2xpZGVDb3VudCAlIHNwZWMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgIHNsaWRlT2Zmc2V0ID0gc2xpZGVzVG9PZmZzZXQgKiBzcGVjLnNsaWRlV2lkdGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHNwZWMuY2VudGVyTW9kZSkge1xuICAgIGlmIChzcGVjLmluZmluaXRlKSB7XG4gICAgICBzbGlkZU9mZnNldCArPSBzcGVjLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKHNwZWMuc2xpZGVzVG9TaG93IC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlT2Zmc2V0ID0gc3BlYy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihzcGVjLnNsaWRlc1RvU2hvdyAvIDIpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghc3BlYy52ZXJ0aWNhbCkge1xuICAgIHRhcmdldExlZnQgPSBzcGVjLnNsaWRlSW5kZXggKiBzcGVjLnNsaWRlV2lkdGggKiAtMSArIHNsaWRlT2Zmc2V0O1xuICB9IGVsc2Uge1xuICAgIHRhcmdldExlZnQgPSBzcGVjLnNsaWRlSW5kZXggKiBzcGVjLnNsaWRlSGVpZ2h0ICogLTEgKyB2ZXJ0aWNhbE9mZnNldDtcbiAgfVxuXG4gIGlmIChzcGVjLnZhcmlhYmxlV2lkdGggPT09IHRydWUpIHtcbiAgICB2YXIgdGFyZ2V0U2xpZGVJbmRleDtcbiAgICBpZiAoc3BlYy5zbGlkZUNvdW50IDw9IHNwZWMuc2xpZGVzVG9TaG93IHx8IHNwZWMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICB0YXJnZXRTbGlkZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZShzcGVjLnRyYWNrUmVmKS5jaGlsZE5vZGVzW3NwZWMuc2xpZGVJbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldFNsaWRlSW5kZXggPSBzcGVjLnNsaWRlSW5kZXggKyBzcGVjLnNsaWRlc1RvU2hvdztcbiAgICAgIHRhcmdldFNsaWRlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHNwZWMudHJhY2tSZWYpLmNoaWxkTm9kZXNbdGFyZ2V0U2xpZGVJbmRleF07XG4gICAgfVxuICAgIHRhcmdldExlZnQgPSB0YXJnZXRTbGlkZSA/IHRhcmdldFNsaWRlLm9mZnNldExlZnQgKiAtMSA6IDA7XG4gICAgaWYgKHNwZWMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHNwZWMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRhcmdldFNsaWRlID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHNwZWMudHJhY2tSZWYpLmNoaWxkcmVuW3NwZWMuc2xpZGVJbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRTbGlkZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZShzcGVjLnRyYWNrUmVmKS5jaGlsZHJlbltzcGVjLnNsaWRlSW5kZXggKyBzcGVjLnNsaWRlc1RvU2hvdyArIDFdO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0U2xpZGUpIHtcbiAgICAgICAgdGFyZ2V0TGVmdCA9IHRhcmdldFNsaWRlLm9mZnNldExlZnQgKiAtMSArIChzcGVjLmxpc3RXaWR0aCAtIHRhcmdldFNsaWRlLm9mZnNldFdpZHRoKSAvIDI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldExlZnQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1zbGljay9saWIvbWl4aW5zL3RyYWNrSGVscGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNhblVzZURPTSA9ICEhKFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuVXNlRE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jYW4tdXNlLWRvbS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgZmFjdG9yeSA9IHJlcXVpcmUoJy4vZmFjdG9yeScpO1xuXG5pZiAodHlwZW9mIFJlYWN0ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBFcnJvcihcbiAgICAnY3JlYXRlLXJlYWN0LWNsYXNzIGNvdWxkIG5vdCBmaW5kIHRoZSBSZWFjdCBvYmplY3QuIElmIHlvdSBhcmUgdXNpbmcgc2NyaXB0IHRhZ3MsICcgK1xuICAgICAgJ21ha2Ugc3VyZSB0aGF0IFJlYWN0IGlzIGJlaW5nIGxvYWRlZCBiZWZvcmUgY3JlYXRlLXJlYWN0LWNsYXNzLidcbiAgKTtcbn1cblxuLy8gSGFjayB0byBncmFiIE5vb3BVcGRhdGVRdWV1ZSBmcm9tIGlzb21vcnBoaWMgUmVhY3RcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IG5ldyBSZWFjdC5Db21wb25lbnQoKS51cGRhdGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gIFJlYWN0LkNvbXBvbmVudCxcbiAgUmVhY3QuaXNWYWxpZEVsZW1lbnQsXG4gIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NyZWF0ZS1yZWFjdC1jbGFzcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBRdWVyeUhhbmRsZXIgPSByZXF1aXJlKCcuL1F1ZXJ5SGFuZGxlcicpO1xudmFyIGVhY2ggPSByZXF1aXJlKCcuL1V0aWwnKS5lYWNoO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgbWVkaWEgcXVlcnksIG1hbmFnZXMgaXQncyBzdGF0ZSBhbmQgcmVnaXN0ZXJlZCBoYW5kbGVycyBmb3IgdGhpcyBxdWVyeVxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IHRoZSBtZWRpYSBxdWVyeSBzdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzVW5jb25kaXRpb25hbD1mYWxzZV0gd2hldGhlciB0aGUgbWVkaWEgcXVlcnkgc2hvdWxkIHJ1biByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIGNvbmRpdGlvbnMgYXJlIG1ldC4gUHJpbWFyaWx5IGZvciBoZWxwaW5nIG9sZGVyIGJyb3dzZXJzIGRlYWwgd2l0aCBtb2JpbGUtZmlyc3QgZGVzaWduXG4gKi9cbmZ1bmN0aW9uIE1lZGlhUXVlcnkocXVlcnksIGlzVW5jb25kaXRpb25hbCkge1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLmlzVW5jb25kaXRpb25hbCA9IGlzVW5jb25kaXRpb25hbDtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgdGhpcy5tcWwgPSB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uKG1xbCkge1xuICAgICAgICAvLyBDaHJvbWUgcGFzc2VzIGFuIE1lZGlhUXVlcnlMaXN0RXZlbnQgb2JqZWN0LCB3aGlsZSBvdGhlciBicm93c2VycyBwYXNzIE1lZGlhUXVlcnlMaXN0IGRpcmVjdGx5XG4gICAgICAgIHNlbGYubXFsID0gbXFsLmN1cnJlbnRUYXJnZXQgfHwgbXFsO1xuICAgICAgICBzZWxmLmFzc2VzcygpO1xuICAgIH07XG4gICAgdGhpcy5tcWwuYWRkTGlzdGVuZXIodGhpcy5saXN0ZW5lcik7XG59XG5cbk1lZGlhUXVlcnkucHJvdG90eXBlID0ge1xuXG4gICAgY29uc3R1Y3RvciA6IE1lZGlhUXVlcnksXG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSBoYW5kbGVyIGZvciB0aGlzIHF1ZXJ5LCB0cmlnZ2VyaW5nIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaGFuZGxlclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIubWF0Y2ggY2FsbGJhY2sgZm9yIHdoZW4gcXVlcnkgaXMgYWN0aXZhdGVkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2hhbmRsZXIudW5tYXRjaF0gY2FsbGJhY2sgZm9yIHdoZW4gcXVlcnkgaXMgZGVhY3RpdmF0ZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbaGFuZGxlci5zZXR1cF0gY2FsbGJhY2sgZm9yIGltbWVkaWF0ZSBleGVjdXRpb24gd2hlbiBhIHF1ZXJ5IGhhbmRsZXIgaXMgcmVnaXN0ZXJlZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2hhbmRsZXIuZGVmZXJTZXR1cD1mYWxzZV0gc2hvdWxkIHRoZSBzZXR1cCBjYWxsYmFjayBiZSBkZWZlcnJlZCB1bnRpbCB0aGUgZmlyc3QgdGltZSB0aGUgaGFuZGxlciBpcyBtYXRjaGVkP1xuICAgICAqL1xuICAgIGFkZEhhbmRsZXIgOiBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIHZhciBxaCA9IG5ldyBRdWVyeUhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMucHVzaChxaCk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzKCkgJiYgcWgub24oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlcyB0aGUgZ2l2ZW4gaGFuZGxlciBmcm9tIHRoZSBjb2xsZWN0aW9uLCBhbmQgY2FsbHMgaXQncyBkZXN0cm95IG1ldGhvZHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0IHx8IGZ1bmN0aW9ufSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHJlbW92ZUhhbmRsZXIgOiBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goaGFuZGxlcnMsIGZ1bmN0aW9uKGgsIGkpIHtcbiAgICAgICAgICAgIGlmKGguZXF1YWxzKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgaC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFoYW5kbGVycy5zcGxpY2UoaSwxKTsgLy9yZW1vdmUgZnJvbSBhcnJheSBhbmQgZXhpdCBlYWNoIGVhcmx5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgbWVkaWEgcXVlcnkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSBtYXRjaFxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBtZWRpYSBxdWVyeSBjYW4gYmUgY29uc2lkZXJlZCBhIG1hdGNoLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBtYXRjaGVzIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1xbC5tYXRjaGVzIHx8IHRoaXMuaXNVbmNvbmRpdGlvbmFsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYWxsIGhhbmRsZXJzIGFuZCB1bmJpbmRzIGV2ZW50c1xuICAgICAqL1xuICAgIGNsZWFyIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1xbC5yZW1vdmVMaXN0ZW5lcih0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5sZW5ndGggPSAwOyAvL2NsZWFyIGFycmF5XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgICogQXNzZXNzZXMgdGhlIHF1ZXJ5LCB0dXJuaW5nIG9uIGFsbCBoYW5kbGVycyBpZiBpdCBtYXRjaGVzLCB0dXJuaW5nIHRoZW0gb2ZmIGlmIGl0IGRvZXNuJ3QgbWF0Y2hcbiAgICAgICAgKi9cbiAgICBhc3Nlc3MgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXMubWF0Y2hlcygpID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgICAgIGVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlclthY3Rpb25dKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFRdWVyeTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lbnF1aXJlLmpzL3NyYy9NZWRpYVF1ZXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA1NjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1lZGlhUXVlcnkgPSByZXF1aXJlKCcuL01lZGlhUXVlcnknKTtcbnZhciBVdGlsID0gcmVxdWlyZSgnLi9VdGlsJyk7XG52YXIgZWFjaCA9IFV0aWwuZWFjaDtcbnZhciBpc0Z1bmN0aW9uID0gVXRpbC5pc0Z1bmN0aW9uO1xudmFyIGlzQXJyYXkgPSBVdGlsLmlzQXJyYXk7XG5cbi8qKlxuICogQWxsb3dzIGZvciByZWdpc3RyYXRpb24gb2YgcXVlcnkgaGFuZGxlcnMuXG4gKiBNYW5hZ2VzIHRoZSBxdWVyeSBoYW5kbGVyJ3Mgc3RhdGUgYW5kIGlzIHJlc3BvbnNpYmxlIGZvciB3aXJpbmcgdXAgYnJvd3NlciBldmVudHNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWVkaWFRdWVyeURpc3BhdGNoICgpIHtcbiAgICBpZighd2luZG93Lm1hdGNoTWVkaWEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXRjaE1lZGlhIG5vdCBwcmVzZW50LCBsZWdhY3kgYnJvd3NlcnMgcmVxdWlyZSBhIHBvbHlmaWxsJyk7XG4gICAgfVxuXG4gICAgdGhpcy5xdWVyaWVzID0ge307XG4gICAgdGhpcy5icm93c2VySXNJbmNhcGFibGUgPSAhd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgYWxsJykubWF0Y2hlcztcbn1cblxuTWVkaWFRdWVyeURpc3BhdGNoLnByb3RvdHlwZSA9IHtcblxuICAgIGNvbnN0cnVjdG9yIDogTWVkaWFRdWVyeURpc3BhdGNoLFxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBmb3IgdGhlIGdpdmVuIG1lZGlhIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcSB0aGUgbWVkaWEgcXVlcnlcbiAgICAgKiBAcGFyYW0ge29iamVjdCB8fCBBcnJheSB8fCBGdW5jdGlvbn0gb3B0aW9ucyBlaXRoZXIgYSBzaW5nbGUgcXVlcnkgaGFuZGxlciBvYmplY3QsIGEgZnVuY3Rpb24sIG9yIGFuIGFycmF5IG9mIHF1ZXJ5IGhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5tYXRjaCBmaXJlZCB3aGVuIHF1ZXJ5IG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy51bm1hdGNoXSBmaXJlZCB3aGVuIGEgcXVlcnkgaXMgbm8gbG9uZ2VyIG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5zZXR1cF0gZmlyZWQgd2hlbiBoYW5kbGVyIGZpcnN0IHRyaWdnZXJlZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZGVmZXJTZXR1cD1mYWxzZV0gd2hldGhlciBzZXR1cCBzaG91bGQgYmUgcnVuIGltbWVkaWF0ZWx5IG9yIGRlZmVycmVkIHVudGlsIHF1ZXJ5IGlzIGZpcnN0IG1hdGNoZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzaG91bGREZWdyYWRlPWZhbHNlXSB3aGV0aGVyIHRoaXMgcGFydGljdWxhciBtZWRpYSBxdWVyeSBzaG91bGQgYWx3YXlzIHJ1biBvbiBpbmNhcGFibGUgYnJvd3NlcnNcbiAgICAgKi9cbiAgICByZWdpc3RlciA6IGZ1bmN0aW9uKHEsIG9wdGlvbnMsIHNob3VsZERlZ3JhZGUpIHtcbiAgICAgICAgdmFyIHF1ZXJpZXMgICAgICAgICA9IHRoaXMucXVlcmllcyxcbiAgICAgICAgICAgIGlzVW5jb25kaXRpb25hbCA9IHNob3VsZERlZ3JhZGUgJiYgdGhpcy5icm93c2VySXNJbmNhcGFibGU7XG5cbiAgICAgICAgaWYoIXF1ZXJpZXNbcV0pIHtcbiAgICAgICAgICAgIHF1ZXJpZXNbcV0gPSBuZXcgTWVkaWFRdWVyeShxLCBpc1VuY29uZGl0aW9uYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9ub3JtYWxpc2UgdG8gb2JqZWN0IGluIGFuIGFycmF5XG4gICAgICAgIGlmKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7IG1hdGNoIDogb3B0aW9ucyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmKCFpc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gW29wdGlvbnNdO1xuICAgICAgICB9XG4gICAgICAgIGVhY2gob3B0aW9ucywgZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0geyBtYXRjaCA6IGhhbmRsZXIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJpZXNbcV0uYWRkSGFuZGxlcihoYW5kbGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVucmVnaXN0ZXJzIGEgcXVlcnkgYW5kIGFsbCBpdCdzIGhhbmRsZXJzLCBvciBhIHNwZWNpZmljIGhhbmRsZXIgZm9yIGEgcXVlcnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxIHRoZSBtZWRpYSBxdWVyeSB0byB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge29iamVjdCB8fCBmdW5jdGlvbn0gW2hhbmRsZXJdIHNwZWNpZmljIGhhbmRsZXIgdG8gdW5yZWdpc3RlclxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIgOiBmdW5jdGlvbihxLCBoYW5kbGVyKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1txXTtcblxuICAgICAgICBpZihxdWVyeSkge1xuICAgICAgICAgICAgaWYoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHF1ZXJ5LnJlbW92ZUhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJpZXNbcV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lZGlhUXVlcnlEaXNwYXRjaDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lbnF1aXJlLmpzL3NyYy9NZWRpYVF1ZXJ5RGlzcGF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDU2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIERlbGVnYXRlIHRvIGhhbmRsZSBhIG1lZGlhIHF1ZXJ5IGJlaW5nIG1hdGNoZWQgYW5kIHVubWF0Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5tYXRjaCBjYWxsYmFjayBmb3Igd2hlbiB0aGUgbWVkaWEgcXVlcnkgaXMgbWF0Y2hlZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMudW5tYXRjaF0gY2FsbGJhY2sgZm9yIHdoZW4gdGhlIG1lZGlhIHF1ZXJ5IGlzIHVubWF0Y2hlZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMuc2V0dXBdIG9uZS10aW1lIGNhbGxiYWNrIHRyaWdnZXJlZCB0aGUgZmlyc3QgdGltZSBhIHF1ZXJ5IGlzIG1hdGNoZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZGVmZXJTZXR1cD1mYWxzZV0gc2hvdWxkIHRoZSBzZXR1cCBjYWxsYmFjayBiZSBydW4gaW1tZWRpYXRlbHksIHJhdGhlciB0aGFuIGZpcnN0IHRpbWUgcXVlcnkgaXMgbWF0Y2hlZD9cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBRdWVyeUhhbmRsZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgIW9wdGlvbnMuZGVmZXJTZXR1cCAmJiB0aGlzLnNldHVwKCk7XG59XG5cblF1ZXJ5SGFuZGxlci5wcm90b3R5cGUgPSB7XG5cbiAgICBjb25zdHJ1Y3RvciA6IFF1ZXJ5SGFuZGxlcixcblxuICAgIC8qKlxuICAgICAqIGNvb3JkaW5hdGVzIHNldHVwIG9mIHRoZSBoYW5kbGVyXG4gICAgICpcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBzZXR1cCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLm9wdGlvbnMuc2V0dXApIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXR1cCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb29yZGluYXRlcyBzZXR1cCBhbmQgdHJpZ2dlcmluZyBvZiB0aGUgaGFuZGxlclxuICAgICAqXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgb24gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgIXRoaXMuaW5pdGlhbGlzZWQgJiYgdGhpcy5zZXR1cCgpO1xuICAgICAgICB0aGlzLm9wdGlvbnMubWF0Y2ggJiYgdGhpcy5vcHRpb25zLm1hdGNoKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvb3JkaW5hdGVzIHRoZSB1bm1hdGNoIGV2ZW50IGZvciB0aGUgaGFuZGxlclxuICAgICAqXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgb2ZmIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy51bm1hdGNoICYmIHRoaXMub3B0aW9ucy51bm1hdGNoKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIGEgaGFuZGxlciBpcyB0byBiZSBkZXN0cm95ZWQuXG4gICAgICogZGVsZWdhdGVzIHRvIHRoZSBkZXN0cm95IG9yIHVubWF0Y2ggY2FsbGJhY2tzLCBkZXBlbmRpbmcgb24gYXZhaWxhYmlsaXR5LlxuICAgICAqXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgZGVzdHJveSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGVzdHJveSA/IHRoaXMub3B0aW9ucy5kZXN0cm95KCkgOiB0aGlzLm9mZigpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGVxdWFsaXR5IGJ5IHJlZmVyZW5jZS5cbiAgICAgKiBpZiBvYmplY3QgaXMgc3VwcGxpZWQgY29tcGFyZSBvcHRpb25zLCBpZiBmdW5jdGlvbiwgY29tcGFyZSBtYXRjaCBjYWxsYmFja1xuICAgICAqXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3QgfHwgZnVuY3Rpb259IFt0YXJnZXRdIHRoZSB0YXJnZXQgZm9yIGNvbXBhcmlzb25cbiAgICAgKi9cbiAgICBlcXVhbHMgOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyA9PT0gdGFyZ2V0IHx8IHRoaXMub3B0aW9ucy5tYXRjaCA9PT0gdGFyZ2V0O1xuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWVyeUhhbmRsZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZW5xdWlyZS5qcy9zcmMvUXVlcnlIYW5kbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1lZGlhUXVlcnlEaXNwYXRjaCA9IHJlcXVpcmUoJy4vTWVkaWFRdWVyeURpc3BhdGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBNZWRpYVF1ZXJ5RGlzcGF0Y2goKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9lbnF1aXJlLmpzL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9Mb2NhdGlvblV0aWxzID0gcmVxdWlyZSgnLi9Mb2NhdGlvblV0aWxzJyk7XG5cbnZhciBfUGF0aFV0aWxzID0gcmVxdWlyZSgnLi9QYXRoVXRpbHMnKTtcblxudmFyIF9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlciA9IHJlcXVpcmUoJy4vY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXInKTtcblxudmFyIF9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcik7XG5cbnZhciBfRE9NVXRpbHMgPSByZXF1aXJlKCcuL0RPTVV0aWxzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBQb3BTdGF0ZUV2ZW50ID0gJ3BvcHN0YXRlJztcbnZhciBIYXNoQ2hhbmdlRXZlbnQgPSAnaGFzaGNoYW5nZSc7XG5cbnZhciBnZXRIaXN0b3J5U3RhdGUgPSBmdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cbnZhciBjcmVhdGVCcm93c2VySGlzdG9yeSA9IGZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCkge1xuICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShfRE9NVXRpbHMuY2FuVXNlRE9NLCAnQnJvd3NlciBoaXN0b3J5IG5lZWRzIGEgRE9NJyk7XG5cbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhblVzZUhpc3RvcnkgPSAoMCwgX0RPTVV0aWxzLnN1cHBvcnRzSGlzdG9yeSkoKTtcbiAgdmFyIG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyID0gISgwLCBfRE9NVXRpbHMuc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSkoKTtcblxuICB2YXIgX3Byb3BzJGZvcmNlUmVmcmVzaCA9IHByb3BzLmZvcmNlUmVmcmVzaCxcbiAgICAgIGZvcmNlUmVmcmVzaCA9IF9wcm9wcyRmb3JjZVJlZnJlc2ggPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3Byb3BzJGZvcmNlUmVmcmVzaCxcbiAgICAgIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IHByb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB1bmRlZmluZWQgPyBfRE9NVXRpbHMuZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGtleUxlbmd0aCA9IHByb3BzLmtleUxlbmd0aCxcbiAgICAgIGtleUxlbmd0aCA9IF9wcm9wcyRrZXlMZW5ndGggPT09IHVuZGVmaW5lZCA/IDYgOiBfcHJvcHMka2V5TGVuZ3RoO1xuXG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gKDAsIF9QYXRoVXRpbHMuc3RyaXBUcmFpbGluZ1NsYXNoKSgoMCwgX1BhdGhVdGlscy5hZGRMZWFkaW5nU2xhc2gpKHByb3BzLmJhc2VuYW1lKSkgOiAnJztcblxuICB2YXIgZ2V0RE9NTG9jYXRpb24gPSBmdW5jdGlvbiBnZXRET01Mb2NhdGlvbihoaXN0b3J5U3RhdGUpIHtcbiAgICB2YXIgX3JlZiA9IGhpc3RvcnlTdGF0ZSB8fCB7fSxcbiAgICAgICAga2V5ID0gX3JlZi5rZXksXG4gICAgICAgIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICAgIHZhciBfd2luZG93JGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgICBwYXRobmFtZSA9IF93aW5kb3ckbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaCA9IF93aW5kb3ckbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICBoYXNoID0gX3dpbmRvdyRsb2NhdGlvbi5oYXNoO1xuXG5cbiAgICB2YXIgcGF0aCA9IHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcblxuICAgICgwLCBfd2FybmluZzIuZGVmYXVsdCkoIWJhc2VuYW1lIHx8ICgwLCBfUGF0aFV0aWxzLmhhc0Jhc2VuYW1lKShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpO1xuXG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gKDAsIF9QYXRoVXRpbHMuc3RyaXBCYXNlbmFtZSkocGF0aCwgYmFzZW5hbWUpO1xuXG4gICAgcmV0dXJuICgwLCBfTG9jYXRpb25VdGlscy5jcmVhdGVMb2NhdGlvbikocGF0aCwgc3RhdGUsIGtleSk7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUtleSA9IGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH07XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gKDAsIF9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcjIuZGVmYXVsdCkoKTtcblxuICB2YXIgc2V0U3RhdGUgPSBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH07XG5cbiAgdmFyIGhhbmRsZVBvcFN0YXRlID0gZnVuY3Rpb24gaGFuZGxlUG9wU3RhdGUoZXZlbnQpIHtcbiAgICAvLyBJZ25vcmUgZXh0cmFuZW91cyBwb3BzdGF0ZSBldmVudHMgaW4gV2ViS2l0LlxuICAgIGlmICgoMCwgX0RPTVV0aWxzLmlzRXh0cmFuZW91c1BvcHN0YXRlRXZlbnQpKGV2ZW50KSkgcmV0dXJuO1xuXG4gICAgaGFuZGxlUG9wKGdldERPTUxvY2F0aW9uKGV2ZW50LnN0YXRlKSk7XG4gIH07XG5cbiAgdmFyIGhhbmRsZUhhc2hDaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSkpO1xuICB9O1xuXG4gIHZhciBmb3JjZU5leHRQb3AgPSBmYWxzZTtcblxuICB2YXIgaGFuZGxlUG9wID0gZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG5cbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHsgYWN0aW9uOiBhY3Rpb24sIGxvY2F0aW9uOiBsb2NhdGlvbiB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHJldmVydFBvcCA9IGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247XG5cbiAgICAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIGtleXMgd2UndmUgc2VlbiBpbiBzZXNzaW9uU3RvcmFnZS5cbiAgICAvLyBJbnN0ZWFkLCB3ZSBqdXN0IGRlZmF1bHQgdG8gMCBmb3Iga2V5cyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxLZXlzLmluZGV4T2YodG9Mb2NhdGlvbi5rZXkpO1xuXG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcblxuICAgIHZhciBmcm9tSW5kZXggPSBhbGxLZXlzLmluZGV4T2YoZnJvbUxvY2F0aW9uLmtleSk7XG5cbiAgICBpZiAoZnJvbUluZGV4ID09PSAtMSkgZnJvbUluZGV4ID0gMDtcblxuICAgIHZhciBkZWx0YSA9IHRvSW5kZXggLSBmcm9tSW5kZXg7XG5cbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IHRydWU7XG4gICAgICBnbyhkZWx0YSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbihnZXRIaXN0b3J5U3RhdGUoKSk7XG4gIHZhciBhbGxLZXlzID0gW2luaXRpYWxMb2NhdGlvbi5rZXldO1xuXG4gIC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICB2YXIgY3JlYXRlSHJlZiA9IGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gYmFzZW5hbWUgKyAoMCwgX1BhdGhVdGlscy5jcmVhdGVQYXRoKShsb2NhdGlvbik7XG4gIH07XG5cbiAgdmFyIHB1c2ggPSBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KSghKCh0eXBlb2YgcGF0aCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGF0aCkpID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuXG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSAoMCwgX0xvY2F0aW9uVXRpbHMuY3JlYXRlTG9jYXRpb24pKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG5cbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuXG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucHVzaFN0YXRlKHsga2V5OiBrZXksIHN0YXRlOiBzdGF0ZSB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YoaGlzdG9yeS5sb2NhdGlvbi5rZXkpO1xuICAgICAgICAgIHZhciBuZXh0S2V5cyA9IGFsbEtleXMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcblxuICAgICAgICAgIG5leHRLZXlzLnB1c2gobG9jYXRpb24ua2V5KTtcbiAgICAgICAgICBhbGxLZXlzID0gbmV4dEtleXM7XG5cbiAgICAgICAgICBzZXRTdGF0ZSh7IGFjdGlvbjogYWN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICgwLCBfd2FybmluZzIuZGVmYXVsdCkoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKTtcblxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KSghKCh0eXBlb2YgcGF0aCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGF0aCkpID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byByZXBsYWNlIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuXG4gICAgdmFyIGFjdGlvbiA9ICdSRVBMQUNFJztcbiAgICB2YXIgbG9jYXRpb24gPSAoMCwgX0xvY2F0aW9uVXRpbHMuY3JlYXRlTG9jYXRpb24pKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG5cbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuXG4gICAgICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYobG9jYXRpb24pO1xuICAgICAgdmFyIGtleSA9IGxvY2F0aW9uLmtleSxcbiAgICAgICAgICBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlO1xuXG5cbiAgICAgIGlmIChjYW5Vc2VIaXN0b3J5KSB7XG4gICAgICAgIGdsb2JhbEhpc3RvcnkucmVwbGFjZVN0YXRlKHsga2V5OiBrZXksIHN0YXRlOiBzdGF0ZSB9LCBudWxsLCBocmVmKTtcblxuICAgICAgICBpZiAoZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbEtleXMuaW5kZXhPZihoaXN0b3J5LmxvY2F0aW9uLmtleSk7XG5cbiAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsS2V5c1twcmV2SW5kZXhdID0gbG9jYXRpb24ua2V5O1xuXG4gICAgICAgICAgc2V0U3RhdGUoeyBhY3Rpb246IGFjdGlvbiwgbG9jYXRpb246IGxvY2F0aW9uIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoMCwgX3dhcm5pbmcyLmRlZmF1bHQpKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHJlcGxhY2Ugc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5Jyk7XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoaHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIGdvID0gZnVuY3Rpb24gZ28obikge1xuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH07XG5cbiAgdmFyIGdvQmFjayA9IGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICByZXR1cm4gZ28oLTEpO1xuICB9O1xuXG4gIHZhciBnb0ZvcndhcmQgPSBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgcmV0dXJuIGdvKDEpO1xuICB9O1xuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICB2YXIgY2hlY2tET01MaXN0ZW5lcnMgPSBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSkge1xuICAgICAgKDAsIF9ET01VdGlscy5hZGRFdmVudExpc3RlbmVyKSh3aW5kb3csIFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcblxuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSAoMCwgX0RPTVV0aWxzLmFkZEV2ZW50TGlzdGVuZXIpKHdpbmRvdywgSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgICgwLCBfRE9NVXRpbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcikod2luZG93LCBQb3BTdGF0ZUV2ZW50LCBoYW5kbGVQb3BTdGF0ZSk7XG5cbiAgICAgIGlmIChuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lcikgKDAsIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKSh3aW5kb3csIEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBpc0Jsb2NrZWQgPSBmYWxzZTtcblxuICB2YXIgYmxvY2sgPSBmdW5jdGlvbiBibG9jaygpIHtcbiAgICB2YXIgcHJvbXB0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcblxuICAgIHZhciB1bmJsb2NrID0gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG5cbiAgICBpZiAoIWlzQmxvY2tlZCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGlzQmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmJsb2NrKCk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbGlzdGVuID0gZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgdmFyIHVubGlzdGVuID0gdHJhbnNpdGlvbk1hbmFnZXIuYXBwZW5kTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIHVubGlzdGVuKCk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgaGlzdG9yeSA9IHtcbiAgICBsZW5ndGg6IGdsb2JhbEhpc3RvcnkubGVuZ3RoLFxuICAgIGFjdGlvbjogJ1BPUCcsXG4gICAgbG9jYXRpb246IGluaXRpYWxMb2NhdGlvbixcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgYmxvY2s6IGJsb2NrLFxuICAgIGxpc3RlbjogbGlzdGVuXG4gIH07XG5cbiAgcmV0dXJuIGhpc3Rvcnk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVCcm93c2VySGlzdG9yeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfTG9jYXRpb25VdGlscyA9IHJlcXVpcmUoJy4vTG9jYXRpb25VdGlscycpO1xuXG52YXIgX1BhdGhVdGlscyA9IHJlcXVpcmUoJy4vUGF0aFV0aWxzJyk7XG5cbnZhciBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgPSByZXF1aXJlKCcuL2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyJyk7XG5cbnZhciBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgSGFzaENoYW5nZUV2ZW50ID0gJ2hhc2hjaGFuZ2UnO1xuXG52YXIgSGFzaFBhdGhDb2RlcnMgPSB7XG4gIGhhc2hiYW5nOiB7XG4gICAgZW5jb2RlUGF0aDogZnVuY3Rpb24gZW5jb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGggOiAnIS8nICsgKDAsIF9QYXRoVXRpbHMuc3RyaXBMZWFkaW5nU2xhc2gpKHBhdGgpO1xuICAgIH0sXG4gICAgZGVjb2RlUGF0aDogZnVuY3Rpb24gZGVjb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbiAgICB9XG4gIH0sXG4gIG5vc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBfUGF0aFV0aWxzLnN0cmlwTGVhZGluZ1NsYXNoLFxuICAgIGRlY29kZVBhdGg6IF9QYXRoVXRpbHMuYWRkTGVhZGluZ1NsYXNoXG4gIH0sXG4gIHNsYXNoOiB7XG4gICAgZW5jb2RlUGF0aDogX1BhdGhVdGlscy5hZGRMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogX1BhdGhVdGlscy5hZGRMZWFkaW5nU2xhc2hcbiAgfVxufTtcblxudmFyIGdldEhhc2hQYXRoID0gZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIGhhc2hJbmRleCA9IGhyZWYuaW5kZXhPZignIycpO1xuICByZXR1cm4gaGFzaEluZGV4ID09PSAtMSA/ICcnIDogaHJlZi5zdWJzdHJpbmcoaGFzaEluZGV4ICsgMSk7XG59O1xuXG52YXIgcHVzaEhhc2hQYXRoID0gZnVuY3Rpb24gcHVzaEhhc2hQYXRoKHBhdGgpIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbn07XG5cbnZhciByZXBsYWNlSGFzaFBhdGggPSBmdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB2YXIgaGFzaEluZGV4ID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpO1xuXG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNsaWNlKDAsIGhhc2hJbmRleCA+PSAwID8gaGFzaEluZGV4IDogMCkgKyAnIycgKyBwYXRoKTtcbn07XG5cbnZhciBjcmVhdGVIYXNoSGlzdG9yeSA9IGZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KCkge1xuICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShfRE9NVXRpbHMuY2FuVXNlRE9NLCAnSGFzaCBoaXN0b3J5IG5lZWRzIGEgRE9NJyk7XG5cbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9ICgwLCBfRE9NVXRpbHMuc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2gpKCk7XG5cbiAgdmFyIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IHByb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB1bmRlZmluZWQgPyBfRE9NVXRpbHMuZ2V0Q29uZmlybWF0aW9uIDogX3Byb3BzJGdldFVzZXJDb25maXJtLFxuICAgICAgX3Byb3BzJGhhc2hUeXBlID0gcHJvcHMuaGFzaFR5cGUsXG4gICAgICBoYXNoVHlwZSA9IF9wcm9wcyRoYXNoVHlwZSA9PT0gdW5kZWZpbmVkID8gJ3NsYXNoJyA6IF9wcm9wcyRoYXNoVHlwZTtcblxuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/ICgwLCBfUGF0aFV0aWxzLnN0cmlwVHJhaWxpbmdTbGFzaCkoKDAsIF9QYXRoVXRpbHMuYWRkTGVhZGluZ1NsYXNoKShwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG5cbiAgdmFyIF9IYXNoUGF0aENvZGVycyRoYXNoVCA9IEhhc2hQYXRoQ29kZXJzW2hhc2hUeXBlXSxcbiAgICAgIGVuY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZW5jb2RlUGF0aCxcbiAgICAgIGRlY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZGVjb2RlUGF0aDtcblxuXG4gIHZhciBnZXRET01Mb2NhdGlvbiA9IGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKCkge1xuICAgIHZhciBwYXRoID0gZGVjb2RlUGF0aChnZXRIYXNoUGF0aCgpKTtcblxuICAgICgwLCBfd2FybmluZzIuZGVmYXVsdCkoIWJhc2VuYW1lIHx8ICgwLCBfUGF0aFV0aWxzLmhhc0Jhc2VuYW1lKShwYXRoLCBiYXNlbmFtZSksICdZb3UgYXJlIGF0dGVtcHRpbmcgdG8gdXNlIGEgYmFzZW5hbWUgb24gYSBwYWdlIHdob3NlIFVSTCBwYXRoIGRvZXMgbm90IGJlZ2luICcgKyAnd2l0aCB0aGUgYmFzZW5hbWUuIEV4cGVjdGVkIHBhdGggXCInICsgcGF0aCArICdcIiB0byBiZWdpbiB3aXRoIFwiJyArIGJhc2VuYW1lICsgJ1wiLicpO1xuXG4gICAgaWYgKGJhc2VuYW1lKSBwYXRoID0gKDAsIF9QYXRoVXRpbHMuc3RyaXBCYXNlbmFtZSkocGF0aCwgYmFzZW5hbWUpO1xuXG4gICAgcmV0dXJuICgwLCBfTG9jYXRpb25VdGlscy5jcmVhdGVMb2NhdGlvbikocGF0aCk7XG4gIH07XG5cbiAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gKDAsIF9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcjIuZGVmYXVsdCkoKTtcblxuICB2YXIgc2V0U3RhdGUgPSBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICBfZXh0ZW5kcyhoaXN0b3J5LCBuZXh0U3RhdGUpO1xuXG4gICAgaGlzdG9yeS5sZW5ndGggPSBnbG9iYWxIaXN0b3J5Lmxlbmd0aDtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH07XG5cbiAgdmFyIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICB2YXIgaWdub3JlUGF0aCA9IG51bGw7XG5cbiAgdmFyIGhhbmRsZUhhc2hDaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuICAgIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcbiAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuXG4gICAgaWYgKHBhdGggIT09IGVuY29kZWRQYXRoKSB7XG4gICAgICAvLyBFbnN1cmUgd2UgYWx3YXlzIGhhdmUgYSBwcm9wZXJseS1lbmNvZGVkIGhhc2guXG4gICAgICByZXBsYWNlSGFzaFBhdGgoZW5jb2RlZFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBnZXRET01Mb2NhdGlvbigpO1xuICAgICAgdmFyIHByZXZMb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247XG5cbiAgICAgIGlmICghZm9yY2VOZXh0UG9wICYmICgwLCBfTG9jYXRpb25VdGlscy5sb2NhdGlvbnNBcmVFcXVhbCkocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09ICgwLCBfUGF0aFV0aWxzLmNyZWF0ZVBhdGgpKGxvY2F0aW9uKSkgcmV0dXJuOyAvLyBJZ25vcmUgdGhpcyBjaGFuZ2U7IHdlIGFscmVhZHkgc2V0U3RhdGUgaW4gcHVzaC9yZXBsYWNlLlxuXG4gICAgICBpZ25vcmVQYXRoID0gbnVsbDtcblxuICAgICAgaGFuZGxlUG9wKGxvY2F0aW9uKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGhhbmRsZVBvcCA9IGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuXG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7IGFjdGlvbjogYWN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciByZXZlcnRQb3AgPSBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuXG4gICAgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBwYXRocyB3ZSd2ZSBzZWVuIGluIHNlc3Npb25TdG9yYWdlLlxuICAgIC8vIEluc3RlYWQsIHdlIGp1c3QgZGVmYXVsdCB0byAwIGZvciBwYXRocyB3ZSBkb24ndCBrbm93LlxuXG4gICAgdmFyIHRvSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZigoMCwgX1BhdGhVdGlscy5jcmVhdGVQYXRoKSh0b0xvY2F0aW9uKSk7XG5cbiAgICBpZiAodG9JbmRleCA9PT0gLTEpIHRvSW5kZXggPSAwO1xuXG4gICAgdmFyIGZyb21JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKCgwLCBfUGF0aFV0aWxzLmNyZWF0ZVBhdGgpKGZyb21Mb2NhdGlvbikpO1xuXG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG5cbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfTtcblxuICAvLyBFbnN1cmUgdGhlIGhhc2ggaXMgZW5jb2RlZCBwcm9wZXJseSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuXG4gIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcblxuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgdmFyIGFsbFBhdGhzID0gWygwLCBfUGF0aFV0aWxzLmNyZWF0ZVBhdGgpKGluaXRpYWxMb2NhdGlvbildO1xuXG4gIC8vIFB1YmxpYyBpbnRlcmZhY2VcblxuICB2YXIgY3JlYXRlSHJlZiA9IGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICByZXR1cm4gJyMnICsgZW5jb2RlUGF0aChiYXNlbmFtZSArICgwLCBfUGF0aFV0aWxzLmNyZWF0ZVBhdGgpKGxvY2F0aW9uKSk7XG4gIH07XG5cbiAgdmFyIHB1c2ggPSBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCBwdXNoIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG5cbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9ICgwLCBfTG9jYXRpb25VdGlscy5jcmVhdGVMb2NhdGlvbikocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcblxuICAgICAgdmFyIHBhdGggPSAoMCwgX1BhdGhVdGlscy5jcmVhdGVQYXRoKShsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUFVTSCwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcHVzaEhhc2hQYXRoKGVuY29kZWRQYXRoKTtcblxuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsUGF0aHMubGFzdEluZGV4T2YoKDAsIF9QYXRoVXRpbHMuY3JlYXRlUGF0aCkoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgICB2YXIgbmV4dFBhdGhzID0gYWxsUGF0aHMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcblxuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG5cbiAgICAgICAgc2V0U3RhdGUoeyBhY3Rpb246IGFjdGlvbiwgbG9jYXRpb246IGxvY2F0aW9uIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoOyBhIG5ldyBlbnRyeSB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBzdGFjaycpO1xuXG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG5cbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9ICgwLCBfTG9jYXRpb25VdGlscy5jcmVhdGVMb2NhdGlvbikocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpc3RvcnkubG9jYXRpb24pO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcblxuICAgICAgdmFyIHBhdGggPSAoMCwgX1BhdGhVdGlscy5jcmVhdGVQYXRoKShsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoKDAsIF9QYXRoVXRpbHMuY3JlYXRlUGF0aCkoaGlzdG9yeS5sb2NhdGlvbikpO1xuXG4gICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkgYWxsUGF0aHNbcHJldkluZGV4XSA9IHBhdGg7XG5cbiAgICAgIHNldFN0YXRlKHsgYWN0aW9uOiBhY3Rpb24sIGxvY2F0aW9uOiBsb2NhdGlvbiB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgZ28gPSBmdW5jdGlvbiBnbyhuKSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShjYW5Hb1dpdGhvdXRSZWxvYWQsICdIYXNoIGhpc3RvcnkgZ28obikgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZCBpbiB0aGlzIGJyb3dzZXInKTtcblxuICAgIGdsb2JhbEhpc3RvcnkuZ28obik7XG4gIH07XG5cbiAgdmFyIGdvQmFjayA9IGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICByZXR1cm4gZ28oLTEpO1xuICB9O1xuXG4gIHZhciBnb0ZvcndhcmQgPSBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgcmV0dXJuIGdvKDEpO1xuICB9O1xuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMDtcblxuICB2YXIgY2hlY2tET01MaXN0ZW5lcnMgPSBmdW5jdGlvbiBjaGVja0RPTUxpc3RlbmVycyhkZWx0YSkge1xuICAgIGxpc3RlbmVyQ291bnQgKz0gZGVsdGE7XG5cbiAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSkge1xuICAgICAgKDAsIF9ET01VdGlscy5hZGRFdmVudExpc3RlbmVyKSh3aW5kb3csIEhhc2hDaGFuZ2VFdmVudCwgaGFuZGxlSGFzaENoYW5nZSk7XG4gICAgfSBlbHNlIGlmIChsaXN0ZW5lckNvdW50ID09PSAwKSB7XG4gICAgICAoMCwgX0RPTVV0aWxzLnJlbW92ZUV2ZW50TGlzdGVuZXIpKHdpbmRvdywgSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIHZhciBibG9jayA9IGZ1bmN0aW9uIGJsb2NrKCkge1xuICAgIHZhciBwcm9tcHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBsaXN0ZW4gPSBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcblxuICByZXR1cm4gaGlzdG9yeTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUhhc2hIaXN0b3J5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9oaXN0b3J5L2NyZWF0ZUhhc2hIaXN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA1Njlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX1BhdGhVdGlscyA9IHJlcXVpcmUoJy4vUGF0aFV0aWxzJyk7XG5cbnZhciBfTG9jYXRpb25VdGlscyA9IHJlcXVpcmUoJy4vTG9jYXRpb25VdGlscycpO1xuXG52YXIgX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyID0gcmVxdWlyZSgnLi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcicpO1xuXG52YXIgX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNsYW1wID0gZnVuY3Rpb24gY2xhbXAobiwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobiwgbG93ZXJCb3VuZCksIHVwcGVyQm91bmQpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGlzdG9yeSBvYmplY3QgdGhhdCBzdG9yZXMgbG9jYXRpb25zIGluIG1lbW9yeS5cbiAqL1xudmFyIGNyZWF0ZU1lbW9yeUhpc3RvcnkgPSBmdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KCkge1xuICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICB2YXIgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IHByb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBfcHJvcHMkaW5pdGlhbEVudHJpZXMgPSBwcm9wcy5pbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxFbnRyaWVzID0gX3Byb3BzJGluaXRpYWxFbnRyaWVzID09PSB1bmRlZmluZWQgPyBbJy8nXSA6IF9wcm9wcyRpbml0aWFsRW50cmllcyxcbiAgICAgIF9wcm9wcyRpbml0aWFsSW5kZXggPSBwcm9wcy5pbml0aWFsSW5kZXgsXG4gICAgICBpbml0aWFsSW5kZXggPSBfcHJvcHMkaW5pdGlhbEluZGV4ID09PSB1bmRlZmluZWQgPyAwIDogX3Byb3BzJGluaXRpYWxJbmRleCxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBwcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB1bmRlZmluZWQgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcblxuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9ICgwLCBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIyLmRlZmF1bHQpKCk7XG5cbiAgdmFyIHNldFN0YXRlID0gZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLm5vdGlmeUxpc3RlbmVycyhoaXN0b3J5LmxvY2F0aW9uLCBoaXN0b3J5LmFjdGlvbik7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUtleSA9IGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGtleUxlbmd0aCk7XG4gIH07XG5cbiAgdmFyIGluZGV4ID0gY2xhbXAoaW5pdGlhbEluZGV4LCAwLCBpbml0aWFsRW50cmllcy5sZW5ndGggLSAxKTtcbiAgdmFyIGVudHJpZXMgPSBpbml0aWFsRW50cmllcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycgPyAoMCwgX0xvY2F0aW9uVXRpbHMuY3JlYXRlTG9jYXRpb24pKGVudHJ5LCB1bmRlZmluZWQsIGNyZWF0ZUtleSgpKSA6ICgwLCBfTG9jYXRpb25VdGlscy5jcmVhdGVMb2NhdGlvbikoZW50cnksIHVuZGVmaW5lZCwgZW50cnkua2V5IHx8IGNyZWF0ZUtleSgpKTtcbiAgfSk7XG5cbiAgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIHZhciBjcmVhdGVIcmVmID0gX1BhdGhVdGlscy5jcmVhdGVQYXRoO1xuXG4gIHZhciBwdXNoID0gZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgICgwLCBfd2FybmluZzIuZGVmYXVsdCkoISgodHlwZW9mIHBhdGggPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHBhdGgpKSA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcHVzaCB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKTtcblxuICAgIHZhciBhY3Rpb24gPSAnUFVTSCc7XG4gICAgdmFyIGxvY2F0aW9uID0gKDAsIF9Mb2NhdGlvblV0aWxzLmNyZWF0ZUxvY2F0aW9uKShwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcblxuICAgICAgdmFyIHByZXZJbmRleCA9IGhpc3RvcnkuaW5kZXg7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gcHJldkluZGV4ICsgMTtcblxuICAgICAgdmFyIG5leHRFbnRyaWVzID0gaGlzdG9yeS5lbnRyaWVzLnNsaWNlKDApO1xuICAgICAgaWYgKG5leHRFbnRyaWVzLmxlbmd0aCA+IG5leHRJbmRleCkge1xuICAgICAgICBuZXh0RW50cmllcy5zcGxpY2UobmV4dEluZGV4LCBuZXh0RW50cmllcy5sZW5ndGggLSBuZXh0SW5kZXgsIGxvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnB1c2gobG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICAgIGVudHJpZXM6IG5leHRFbnRyaWVzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgcmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UocGF0aCwgc3RhdGUpIHtcbiAgICAoMCwgX3dhcm5pbmcyLmRlZmF1bHQpKCEoKHR5cGVvZiBwYXRoID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwYXRoKSkgPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHJlcGxhY2Ugd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG5cbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9ICgwLCBfTG9jYXRpb25VdGlscy5jcmVhdGVMb2NhdGlvbikocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG5cbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuXG4gICAgICBzZXRTdGF0ZSh7IGFjdGlvbjogYWN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIGdvID0gZnVuY3Rpb24gZ28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBjbGFtcChoaXN0b3J5LmluZGV4ICsgbiwgMCwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aCAtIDEpO1xuXG4gICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgIHZhciBsb2NhdGlvbiA9IGhpc3RvcnkuZW50cmllc1tuZXh0SW5kZXhdO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgZ29CYWNrID0gZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIHJldHVybiBnbygtMSk7XG4gIH07XG5cbiAgdmFyIGdvRm9yd2FyZCA9IGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICByZXR1cm4gZ28oMSk7XG4gIH07XG5cbiAgdmFyIGNhbkdvID0gZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBoaXN0b3J5LmluZGV4ICsgbjtcbiAgICByZXR1cm4gbmV4dEluZGV4ID49IDAgJiYgbmV4dEluZGV4IDwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgfTtcblxuICB2YXIgYmxvY2sgPSBmdW5jdGlvbiBibG9jaygpIHtcbiAgICB2YXIgcHJvbXB0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH07XG5cbiAgdmFyIGxpc3RlbiA9IGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIH07XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuXG4gIHJldHVybiBoaXN0b3J5O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlTWVtb3J5SGlzdG9yeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaGlzdG9yeS9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA1NzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBtaXhpbnM6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBLTk9XTl9TVEFUSUNTID0ge1xuICAgIG5hbWU6IHRydWUsXG4gICAgbGVuZ3RoOiB0cnVlLFxuICAgIHByb3RvdHlwZTogdHJ1ZSxcbiAgICBjYWxsZXI6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG52YXIgaXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHNBdmFpbGFibGUgPSB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgY3VzdG9tU3RhdGljcykge1xuICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykgeyAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzR2V0T3duUHJvcGVydHlTeW1ib2xzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKCFSRUFDVF9TVEFUSUNTW2tleXNbaV1dICYmICFLTk9XTl9TVEFUSUNTW2tleXNbaV1dICYmICghY3VzdG9tU3RhdGljcyB8fCAhY3VzdG9tU3RhdGljc1trZXlzW2ldXSkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDb21wb25lbnRba2V5c1tpXV0gPSBzb3VyY2VDb21wb25lbnRba2V5c1tpXV07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lzYXJyYXkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2FtZWwyaHlwaGVuID0gcmVxdWlyZSgnc3RyaW5nLWNvbnZlcnQvY2FtZWwyaHlwaGVuJyk7XG5cbnZhciBpc0RpbWVuc2lvbiA9IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gIHZhciByZSA9IC9baGVpZ2h0fHdpZHRoXSQvO1xuICByZXR1cm4gcmUudGVzdChmZWF0dXJlKTtcbn07XG5cbnZhciBvYmoybXEgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBtcSA9ICcnO1xuICB2YXIgZmVhdHVyZXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBmZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZSA9IG9ialtmZWF0dXJlXTtcbiAgICBmZWF0dXJlID0gY2FtZWwyaHlwaGVuKGZlYXR1cmUpO1xuICAgIC8vIEFkZCBweCB0byBkaW1lbnNpb24gZmVhdHVyZXNcbiAgICBpZiAoaXNEaW1lbnNpb24oZmVhdHVyZSkgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZSArICdweCc7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbXEgKz0gZmVhdHVyZTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgbXEgKz0gJ25vdCAnICsgZmVhdHVyZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbXEgKz0gJygnICsgZmVhdHVyZSArICc6ICcgKyB2YWx1ZSArICcpJztcbiAgICB9XG4gICAgaWYgKGluZGV4IDwgZmVhdHVyZXMubGVuZ3RoLTEpIHtcbiAgICAgIG1xICs9ICcgYW5kICdcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbXE7XG59O1xuXG52YXIganNvbjJtcSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICB2YXIgbXEgPSAnJztcbiAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cbiAgLy8gSGFuZGxpbmcgYXJyYXkgb2YgbWVkaWEgcXVlcmllc1xuICBpZiAocXVlcnkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHF1ZXJ5LmZvckVhY2goZnVuY3Rpb24gKHEsIGluZGV4KSB7XG4gICAgICBtcSArPSBvYmoybXEocSk7XG4gICAgICBpZiAoaW5kZXggPCBxdWVyeS5sZW5ndGgtMSkge1xuICAgICAgICBtcSArPSAnLCAnXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1xO1xuICB9XG4gIC8vIEhhbmRsaW5nIHNpbmdsZSBtZWRpYSBxdWVyeVxuICByZXR1cm4gb2JqMm1xKHF1ZXJ5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ganNvbjJtcTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vanNvbjJtcS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc2FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbi8qKlxuICogRXhwb3NlIGBwYXRoVG9SZWdleHBgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhUb1JlZ2V4cFxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZVxubW9kdWxlLmV4cG9ydHMuY29tcGlsZSA9IGNvbXBpbGVcbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb1JlZ0V4cCA9IHRva2Vuc1RvUmVnRXhwXG5cbi8qKlxuICogVGhlIG1haW4gcGF0aCBtYXRjaGluZyByZWdleHAgdXRpbGl0eS5cbiAqXG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG52YXIgUEFUSF9SRUdFWFAgPSBuZXcgUmVnRXhwKFtcbiAgLy8gTWF0Y2ggZXNjYXBlZCBjaGFyYWN0ZXJzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGFwcGVhciBpbiBmdXR1cmUgbWF0Y2hlcy5cbiAgLy8gVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGF0IHdvbid0IHRyYW5zZm9ybS5cbiAgJyhcXFxcXFxcXC4pJyxcbiAgLy8gTWF0Y2ggRXhwcmVzcy1zdHlsZSBwYXJhbWV0ZXJzIGFuZCB1bi1uYW1lZCBwYXJhbWV0ZXJzIHdpdGggYSBwcmVmaXhcbiAgLy8gYW5kIG9wdGlvbmFsIHN1ZmZpeGVzLiBNYXRjaGVzIGFwcGVhciBhczpcbiAgLy9cbiAgLy8gXCIvOnRlc3QoXFxcXGQrKT9cIiA9PiBbXCIvXCIsIFwidGVzdFwiLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCBcIj9cIiwgdW5kZWZpbmVkXVxuICAvLyBcIi9yb3V0ZShcXFxcZCspXCIgID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gIC8vIFwiLypcIiAgICAgICAgICAgID0+IFtcIi9cIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIipcIl1cbiAgJyhbXFxcXC8uXSk/KD86KD86XFxcXDooXFxcXHcrKSg/OlxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpP3xcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKShbKyo/XSk/fChcXFxcKikpJ1xuXS5qb2luKCd8JyksICdnJylcblxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshQXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlIChzdHIsIG9wdGlvbnMpIHtcbiAgdmFyIHRva2VucyA9IFtdXG4gIHZhciBrZXkgPSAwXG4gIHZhciBpbmRleCA9IDBcbiAgdmFyIHBhdGggPSAnJ1xuICB2YXIgZGVmYXVsdERlbGltaXRlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWxpbWl0ZXIgfHwgJy8nXG4gIHZhciByZXNcblxuICB3aGlsZSAoKHJlcyA9IFBBVEhfUkVHRVhQLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIHZhciBtID0gcmVzWzBdXG4gICAgdmFyIGVzY2FwZWQgPSByZXNbMV1cbiAgICB2YXIgb2Zmc2V0ID0gcmVzLmluZGV4XG4gICAgcGF0aCArPSBzdHIuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICBpbmRleCA9IG9mZnNldCArIG0ubGVuZ3RoXG5cbiAgICAvLyBJZ25vcmUgYWxyZWFkeSBlc2NhcGVkIHNlcXVlbmNlcy5cbiAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgcGF0aCArPSBlc2NhcGVkWzFdXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBuZXh0ID0gc3RyW2luZGV4XVxuICAgIHZhciBwcmVmaXggPSByZXNbMl1cbiAgICB2YXIgbmFtZSA9IHJlc1szXVxuICAgIHZhciBjYXB0dXJlID0gcmVzWzRdXG4gICAgdmFyIGdyb3VwID0gcmVzWzVdXG4gICAgdmFyIG1vZGlmaWVyID0gcmVzWzZdXG4gICAgdmFyIGFzdGVyaXNrID0gcmVzWzddXG5cbiAgICAvLyBQdXNoIHRoZSBjdXJyZW50IHBhdGggb250byB0aGUgdG9rZW5zLlxuICAgIGlmIChwYXRoKSB7XG4gICAgICB0b2tlbnMucHVzaChwYXRoKVxuICAgICAgcGF0aCA9ICcnXG4gICAgfVxuXG4gICAgdmFyIHBhcnRpYWwgPSBwcmVmaXggIT0gbnVsbCAmJiBuZXh0ICE9IG51bGwgJiYgbmV4dCAhPT0gcHJlZml4XG4gICAgdmFyIHJlcGVhdCA9IG1vZGlmaWVyID09PSAnKycgfHwgbW9kaWZpZXIgPT09ICcqJ1xuICAgIHZhciBvcHRpb25hbCA9IG1vZGlmaWVyID09PSAnPycgfHwgbW9kaWZpZXIgPT09ICcqJ1xuICAgIHZhciBkZWxpbWl0ZXIgPSByZXNbMl0gfHwgZGVmYXVsdERlbGltaXRlclxuICAgIHZhciBwYXR0ZXJuID0gY2FwdHVyZSB8fCBncm91cFxuXG4gICAgdG9rZW5zLnB1c2goe1xuICAgICAgbmFtZTogbmFtZSB8fCBrZXkrKyxcbiAgICAgIHByZWZpeDogcHJlZml4IHx8ICcnLFxuICAgICAgZGVsaW1pdGVyOiBkZWxpbWl0ZXIsXG4gICAgICBvcHRpb25hbDogb3B0aW9uYWwsXG4gICAgICByZXBlYXQ6IHJlcGVhdCxcbiAgICAgIHBhcnRpYWw6IHBhcnRpYWwsXG4gICAgICBhc3RlcmlzazogISFhc3RlcmlzayxcbiAgICAgIHBhdHRlcm46IHBhdHRlcm4gPyBlc2NhcGVHcm91cChwYXR0ZXJuKSA6IChhc3RlcmlzayA/ICcuKicgOiAnW14nICsgZXNjYXBlU3RyaW5nKGRlbGltaXRlcikgKyAnXSs/JylcbiAgICB9KVxuICB9XG5cbiAgLy8gTWF0Y2ggYW55IGNoYXJhY3RlcnMgc3RpbGwgcmVtYWluaW5nLlxuICBpZiAoaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgcGF0aCArPSBzdHIuc3Vic3RyKGluZGV4KVxuICB9XG5cbiAgLy8gSWYgdGhlIHBhdGggZXhpc3RzLCBwdXNoIGl0IG9udG8gdGhlIGVuZC5cbiAgaWYgKHBhdGgpIHtcbiAgICB0b2tlbnMucHVzaChwYXRoKVxuICB9XG5cbiAgcmV0dXJuIHRva2Vuc1xufVxuXG4vKipcbiAqIENvbXBpbGUgYSBzdHJpbmcgdG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgdGhlIHBhdGguXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICBzdHJcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IWZ1bmN0aW9uKE9iamVjdD0sIE9iamVjdD0pfVxuICovXG5mdW5jdGlvbiBjb21waWxlIChzdHIsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRva2Vuc1RvRnVuY3Rpb24ocGFyc2Uoc3RyLCBvcHRpb25zKSlcbn1cblxuLyoqXG4gKiBQcmV0dGllciBlbmNvZGluZyBvZiBVUkkgcGF0aCBzZWdtZW50cy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudFByZXR0eSAoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUkkoc3RyKS5yZXBsYWNlKC9bXFwvPyNdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEVuY29kZSB0aGUgYXN0ZXJpc2sgcGFyYW1ldGVyLiBTaW1pbGFyIHRvIGBwcmV0dHlgLCBidXQgYWxsb3dzIHNsYXNoZXMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGVBc3RlcmlzayAoc3RyKSB7XG4gIHJldHVybiBlbmNvZGVVUkkoc3RyKS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEV4cG9zZSBhIG1ldGhvZCBmb3IgdHJhbnNmb3JtaW5nIHRva2VucyBpbnRvIHRoZSBwYXRoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0b2tlbnNUb0Z1bmN0aW9uICh0b2tlbnMpIHtcbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHRva2VucyBpbnRvIHJlZ2V4cHMuXG4gIHZhciBtYXRjaGVzID0gbmV3IEFycmF5KHRva2Vucy5sZW5ndGgpXG5cbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHBhdHRlcm5zIGJlZm9yZSBjb21waWxhdGlvbi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRva2Vuc1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKCdeKD86JyArIHRva2Vuc1tpXS5wYXR0ZXJuICsgJykkJylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgb3B0cykge1xuICAgIHZhciBwYXRoID0gJydcbiAgICB2YXIgZGF0YSA9IG9iaiB8fCB7fVxuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fVxuICAgIHZhciBlbmNvZGUgPSBvcHRpb25zLnByZXR0eSA/IGVuY29kZVVSSUNvbXBvbmVudFByZXR0eSA6IGVuY29kZVVSSUNvbXBvbmVudFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoICs9IHRva2VuXG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlID0gZGF0YVt0b2tlbi5uYW1lXVxuICAgICAgdmFyIHNlZ21lbnRcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgLy8gUHJlcGVuZCBwYXJ0aWFsIHNlZ21lbnQgcHJlZml4ZXMuXG4gICAgICAgICAgaWYgKHRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIGJlIGRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc2FycmF5KHZhbHVlKSkge1xuICAgICAgICBpZiAoIXRva2VuLnJlcGVhdCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IHJlcGVhdCwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICsgJ2AnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgYmUgZW1wdHknKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsdWUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBzZWdtZW50ID0gZW5jb2RlKHZhbHVlW2pdKVxuXG4gICAgICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGFsbCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG1hdGNoIFwiJyArIHRva2VuLnBhdHRlcm4gKyAnXCIsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQpICsgJ2AnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhdGggKz0gKGogPT09IDAgPyB0b2tlbi5wcmVmaXggOiB0b2tlbi5kZWxpbWl0ZXIpICsgc2VnbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgc2VnbWVudCA9IHRva2VuLmFzdGVyaXNrID8gZW5jb2RlQXN0ZXJpc2sodmFsdWUpIDogZW5jb2RlKHZhbHVlKVxuXG4gICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG1hdGNoIFwiJyArIHRva2VuLnBhdHRlcm4gKyAnXCIsIGJ1dCByZWNlaXZlZCBcIicgKyBzZWdtZW50ICsgJ1wiJylcbiAgICAgIH1cblxuICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXggKyBzZWdtZW50XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhcbiAgfVxufVxuXG4vKipcbiAqIEVzY2FwZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXNjYXBlU3RyaW5nIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfFxcL1xcXFxdKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBFc2NhcGUgdGhlIGNhcHR1cmluZyBncm91cCBieSBlc2NhcGluZyBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIG1lYW5pbmcuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBncm91cFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVHcm91cCAoZ3JvdXApIHtcbiAgcmV0dXJuIGdyb3VwLnJlcGxhY2UoLyhbPSE6JFxcLygpXSkvZywgJ1xcXFwkMScpXG59XG5cbi8qKlxuICogQXR0YWNoIHRoZSBrZXlzIGFzIGEgcHJvcGVydHkgb2YgdGhlIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshUmVnRXhwfSByZVxuICogQHBhcmFtICB7QXJyYXl9ICAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXR0YWNoS2V5cyAocmUsIGtleXMpIHtcbiAgcmUua2V5cyA9IGtleXNcbiAgcmV0dXJuIHJlXG59XG5cbi8qKlxuICogR2V0IHRoZSBmbGFncyBmb3IgYSByZWdleHAgZnJvbSB0aGUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZmxhZ3MgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuc2Vuc2l0aXZlID8gJycgOiAnaSdcbn1cblxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcbiAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpXG5cbiAgaWYgKGdyb3Vwcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXlzLnB1c2goe1xuICAgICAgICBuYW1lOiBpLFxuICAgICAgICBwcmVmaXg6IG51bGwsXG4gICAgICAgIGRlbGltaXRlcjogbnVsbCxcbiAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICBwYXJ0aWFsOiBmYWxzZSxcbiAgICAgICAgYXN0ZXJpc2s6IGZhbHNlLFxuICAgICAgICBwYXR0ZXJuOiBudWxsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHBhdGgsIGtleXMpXG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IUFycmF5fSAgcGF0aFxuICogQHBhcmFtICB7QXJyYXl9ICAga2V5c1xuICogQHBhcmFtICB7IU9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICB2YXIgcGFydHMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSlcbiAgfVxuXG4gIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzonICsgcGFydHMuam9pbignfCcpICsgJyknLCBmbGFncyhvcHRpb25zKSlcblxuICByZXR1cm4gYXR0YWNoS2V5cyhyZWdleHAsIGtleXMpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcGF0aCByZWdleHAgZnJvbSBzdHJpbmcgaW5wdXQuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHBhcmFtICB7IU9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRva2Vuc1RvUmVnRXhwKHBhcnNlKHBhdGgsIG9wdGlvbnMpLCBrZXlzLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEV4cG9zZSBhIGZ1bmN0aW9uIGZvciB0YWtpbmcgdG9rZW5zIGFuZCByZXR1cm5pbmcgYSBSZWdFeHAuXG4gKlxuICogQHBhcmFtICB7IUFycmF5fSAgICAgICAgICB0b2tlbnNcbiAqIEBwYXJhbSAgeyhBcnJheXxPYmplY3QpPX0ga2V5c1xuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiB0b2tlbnNUb1JlZ0V4cCAodG9rZW5zLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpXG4gICAga2V5cyA9IFtdXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBzdHJpY3QgPSBvcHRpb25zLnN0cmljdFxuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlXG4gIHZhciByb3V0ZSA9ICcnXG5cbiAgLy8gSXRlcmF0ZSBvdmVyIHRoZSB0b2tlbnMgYW5kIGNyZWF0ZSBvdXIgcmVnZXhwIHN0cmluZy5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcodG9rZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwcmVmaXggPSBlc2NhcGVTdHJpbmcodG9rZW4ucHJlZml4KVxuICAgICAgdmFyIGNhcHR1cmUgPSAnKD86JyArIHRva2VuLnBhdHRlcm4gKyAnKSdcblxuICAgICAga2V5cy5wdXNoKHRva2VuKVxuXG4gICAgICBpZiAodG9rZW4ucmVwZWF0KSB7XG4gICAgICAgIGNhcHR1cmUgKz0gJyg/OicgKyBwcmVmaXggKyBjYXB0dXJlICsgJykqJ1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5wYXJ0aWFsKSB7XG4gICAgICAgICAgY2FwdHVyZSA9ICcoPzonICsgcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpKT8nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKT8nXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcHR1cmUgPSBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyknXG4gICAgICB9XG5cbiAgICAgIHJvdXRlICs9IGNhcHR1cmVcbiAgICB9XG4gIH1cblxuICB2YXIgZGVsaW1pdGVyID0gZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJylcbiAgdmFyIGVuZHNXaXRoRGVsaW1pdGVyID0gcm91dGUuc2xpY2UoLWRlbGltaXRlci5sZW5ndGgpID09PSBkZWxpbWl0ZXJcblxuICAvLyBJbiBub24tc3RyaWN0IG1vZGUgd2UgYWxsb3cgYSBzbGFzaCBhdCB0aGUgZW5kIG9mIG1hdGNoLiBJZiB0aGUgcGF0aCB0b1xuICAvLyBtYXRjaCBhbHJlYWR5IGVuZHMgd2l0aCBhIHNsYXNoLCB3ZSByZW1vdmUgaXQgZm9yIGNvbnNpc3RlbmN5LiBUaGUgc2xhc2hcbiAgLy8gaXMgdmFsaWQgYXQgdGhlIGVuZCBvZiBhIHBhdGggbWF0Y2gsIG5vdCBpbiB0aGUgbWlkZGxlLiBUaGlzIGlzIGltcG9ydGFudFxuICAvLyBpbiBub24tZW5kaW5nIG1vZGUsIHdoZXJlIFwiL3Rlc3QvXCIgc2hvdWxkbid0IG1hdGNoIFwiL3Rlc3QvL3JvdXRlXCIuXG4gIGlmICghc3RyaWN0KSB7XG4gICAgcm91dGUgPSAoZW5kc1dpdGhEZWxpbWl0ZXIgPyByb3V0ZS5zbGljZSgwLCAtZGVsaW1pdGVyLmxlbmd0aCkgOiByb3V0ZSkgKyAnKD86JyArIGRlbGltaXRlciArICcoPz0kKSk/J1xuICB9XG5cbiAgaWYgKGVuZCkge1xuICAgIHJvdXRlICs9ICckJ1xuICB9IGVsc2Uge1xuICAgIC8vIEluIG5vbi1lbmRpbmcgbW9kZSwgd2UgbmVlZCB0aGUgY2FwdHVyaW5nIGdyb3VwcyB0byBtYXRjaCBhcyBtdWNoIGFzXG4gICAgLy8gcG9zc2libGUgYnkgdXNpbmcgYSBwb3NpdGl2ZSBsb29rYWhlYWQgdG8gdGhlIGVuZCBvciBuZXh0IHBhdGggc2VnbWVudC5cbiAgICByb3V0ZSArPSBzdHJpY3QgJiYgZW5kc1dpdGhEZWxpbWl0ZXIgPyAnJyA6ICcoPz0nICsgZGVsaW1pdGVyICsgJ3wkKSdcbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKG5ldyBSZWdFeHAoJ14nICsgcm91dGUsIGZsYWdzKG9wdGlvbnMpKSwga2V5cylcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHBhdGggc3RyaW5nLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQW4gZW1wdHkgYXJyYXkgY2FuIGJlIHBhc3NlZCBpbiBmb3IgdGhlIGtleXMsIHdoaWNoIHdpbGwgaG9sZCB0aGVcbiAqIHBsYWNlaG9sZGVyIGtleSBkZXNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCB1c2luZyBgL3VzZXIvOmlkYCwgYGtleXNgIHdpbGxcbiAqIGNvbnRhaW4gYFt7IG5hbWU6ICdpZCcsIGRlbGltaXRlcjogJy8nLCBvcHRpb25hbDogZmFsc2UsIHJlcGVhdDogZmFsc2UgfV1gLlxuICpcbiAqIEBwYXJhbSAgeyhzdHJpbmd8UmVnRXhwfEFycmF5KX0gcGF0aFxuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSAgICAgICBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHBhdGhUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcbiAgICBvcHRpb25zID0gLyoqIEB0eXBlIHshT2JqZWN0fSAqLyAoa2V5cyB8fCBvcHRpb25zKVxuICAgIGtleXMgPSBbXVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBpZiAocGF0aCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiByZWdleHBUb1JlZ2V4cChwYXRoLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpKVxuICB9XG5cbiAgaWYgKGlzYXJyYXkocGF0aCkpIHtcbiAgICByZXR1cm4gYXJyYXlUb1JlZ2V4cCgvKiogQHR5cGUgeyFBcnJheX0gKi8gKHBhdGgpLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpLCBvcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ1RvUmVnZXhwKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcGF0aC10by1yZWdleHAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNyZWF0ZUhpc3RvcnkgZnJvbSAnaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyBIVE1MNSBoaXN0b3J5LlxuICovXG5cbnZhciBCcm93c2VyUm91dGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEJyb3dzZXJSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEJyb3dzZXJSb3V0ZXIoKSB7XG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCcm93c2VyUm91dGVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShfdGhpcy5wcm9wcyksIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgQnJvd3NlclJvdXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwgeyBoaXN0b3J5OiB0aGlzLmhpc3RvcnksIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuIH0pO1xuICB9O1xuXG4gIHJldHVybiBCcm93c2VyUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5Ccm93c2VyUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZvcmNlUmVmcmVzaDogUHJvcFR5cGVzLmJvb2wsXG4gIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyUm91dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL0Jyb3dzZXJSb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNyZWF0ZUhpc3RvcnkgZnJvbSAnaGlzdG9yeS9jcmVhdGVIYXNoSGlzdG9yeSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgdXNlcyB3aW5kb3cubG9jYXRpb24uaGFzaC5cbiAqL1xuXG52YXIgSGFzaFJvdXRlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhIYXNoUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBIYXNoUm91dGVyKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSGFzaFJvdXRlcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUhpc3RvcnkoX3RoaXMucHJvcHMpLCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIEhhc2hSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHsgaGlzdG9yeTogdGhpcy5oaXN0b3J5LCBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiB9KTtcbiAgfTtcblxuICByZXR1cm4gSGFzaFJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuSGFzaFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgaGFzaFR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ2hhc2hiYW5nJywgJ25vc2xhc2gnLCAnc2xhc2gnXSksXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIYXNoUm91dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL0hhc2hSb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgeyBNZW1vcnlSb3V0ZXIgYXMgZGVmYXVsdCB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvTWVtb3J5Um91dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1OTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IExpbmsgZnJvbSAnLi9MaW5rJztcblxuLyoqXG4gKiBBIDxMaW5rPiB3cmFwcGVyIHRoYXQga25vd3MgaWYgaXQncyBcImFjdGl2ZVwiIG9yIG5vdC5cbiAqL1xudmFyIE5hdkxpbmsgPSBmdW5jdGlvbiBOYXZMaW5rKF9yZWYpIHtcbiAgdmFyIHRvID0gX3JlZi50byxcbiAgICAgIGV4YWN0ID0gX3JlZi5leGFjdCxcbiAgICAgIHN0cmljdCA9IF9yZWYuc3RyaWN0LFxuICAgICAgbG9jYXRpb24gPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgYWN0aXZlQ2xhc3NOYW1lID0gX3JlZi5hY3RpdmVDbGFzc05hbWUsXG4gICAgICBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZSxcbiAgICAgIGFjdGl2ZVN0eWxlID0gX3JlZi5hY3RpdmVTdHlsZSxcbiAgICAgIHN0eWxlID0gX3JlZi5zdHlsZSxcbiAgICAgIGdldElzQWN0aXZlID0gX3JlZi5pc0FjdGl2ZSxcbiAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWyd0bycsICdleGFjdCcsICdzdHJpY3QnLCAnbG9jYXRpb24nLCAnYWN0aXZlQ2xhc3NOYW1lJywgJ2NsYXNzTmFtZScsICdhY3RpdmVTdHlsZScsICdzdHlsZScsICdpc0FjdGl2ZSddKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwge1xuICAgIHBhdGg6ICh0eXBlb2YgdG8gPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRvKSkgPT09ICdvYmplY3QnID8gdG8ucGF0aG5hbWUgOiB0byxcbiAgICBleGFjdDogZXhhY3QsXG4gICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgIGNoaWxkcmVuOiBmdW5jdGlvbiBjaGlsZHJlbihfcmVmMikge1xuICAgICAgdmFyIGxvY2F0aW9uID0gX3JlZjIubG9jYXRpb24sXG4gICAgICAgICAgbWF0Y2ggPSBfcmVmMi5tYXRjaDtcblxuICAgICAgdmFyIGlzQWN0aXZlID0gISEoZ2V0SXNBY3RpdmUgPyBnZXRJc0FjdGl2ZShtYXRjaCwgbG9jYXRpb24pIDogbWF0Y2gpO1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCBfZXh0ZW5kcyh7XG4gICAgICAgIHRvOiB0byxcbiAgICAgICAgY2xhc3NOYW1lOiBpc0FjdGl2ZSA/IFthY3RpdmVDbGFzc05hbWUsIGNsYXNzTmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pLmpvaW4oJyAnKSA6IGNsYXNzTmFtZSxcbiAgICAgICAgc3R5bGU6IGlzQWN0aXZlID8gX2V4dGVuZHMoe30sIHN0eWxlLCBhY3RpdmVTdHlsZSkgOiBzdHlsZVxuICAgICAgfSwgcmVzdCkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5OYXZMaW5rLnByb3BUeXBlcyA9IHtcbiAgdG86IExpbmsucHJvcFR5cGVzLnRvLFxuICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gIHN0cmljdDogUHJvcFR5cGVzLmJvb2wsXG4gIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICBhY3RpdmVDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aXZlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc0FjdGl2ZTogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbk5hdkxpbmsuZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmVDbGFzc05hbWU6ICdhY3RpdmUnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZMaW5rO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL05hdkxpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDU5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgeyBQcm9tcHQgYXMgZGVmYXVsdCB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvUHJvbXB0LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHsgUmVkaXJlY3QgYXMgZGVmYXVsdCB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvUmVkaXJlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDU5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgeyBSb3V0ZSBhcyBkZWZhdWx0IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9Sb3V0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCB7IFJvdXRlciBhcyBkZWZhdWx0IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9Sb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgeyBTdGF0aWNSb3V0ZXIgYXMgZGVmYXVsdCB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXJvdXRlci1kb20vZXMvU3RhdGljUm91dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1OTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHsgU3dpdGNoIGFzIGRlZmF1bHQgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL1N3aXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gNTk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCB7IG1hdGNoUGF0aCBhcyBkZWZhdWx0IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyLWRvbS9lcy9tYXRjaFBhdGguanNcbi8vIG1vZHVsZSBpZCA9IDU5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgeyB3aXRoUm91dGVyIGFzIGRlZmF1bHQgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXItZG9tL2VzL3dpdGhSb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNyZWF0ZUhpc3RvcnkgZnJvbSAnaGlzdG9yeS9jcmVhdGVNZW1vcnlIaXN0b3J5JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9Sb3V0ZXInO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgc3RvcmVzIGxvY2F0aW9uIGluIG1lbW9yeS5cbiAqL1xuXG52YXIgTWVtb3J5Um91dGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE1lbW9yeVJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTWVtb3J5Um91dGVyKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVtb3J5Um91dGVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShfdGhpcy5wcm9wcyksIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgTWVtb3J5Um91dGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7IGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSwgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW4gfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1lbW9yeVJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuTWVtb3J5Um91dGVyLnByb3BUeXBlcyA9IHtcbiAgaW5pdGlhbEVudHJpZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgaW5pdGlhbEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAga2V5TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGVcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWVtb3J5Um91dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXIvZXMvTWVtb3J5Um91dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHJvbXB0aW5nIHRoZSB1c2VyIGJlZm9yZSBuYXZpZ2F0aW5nIGF3YXlcbiAqIGZyb20gYSBzY3JlZW4gd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG52YXIgUHJvbXB0ID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFByb21wdCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUHJvbXB0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm9tcHQpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBQcm9tcHQucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZShtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMudW5ibG9jaykgdGhpcy51bmJsb2NrKCk7XG5cbiAgICB0aGlzLnVuYmxvY2sgPSB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuYmxvY2sobWVzc2FnZSk7XG4gIH07XG5cbiAgUHJvbXB0LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICBpZiAodGhpcy51bmJsb2NrKSB7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIHRoaXMudW5ibG9jayA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIFByb21wdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLndoZW4pIHRoaXMuZW5hYmxlKHRoaXMucHJvcHMubWVzc2FnZSk7XG4gIH07XG5cbiAgUHJvbXB0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLndoZW4pIHtcbiAgICAgIGlmICghdGhpcy5wcm9wcy53aGVuIHx8IHRoaXMucHJvcHMubWVzc2FnZSAhPT0gbmV4dFByb3BzLm1lc3NhZ2UpIHRoaXMuZW5hYmxlKG5leHRQcm9wcy5tZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICB9O1xuXG4gIFByb21wdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmRpc2FibGUoKTtcbiAgfTtcblxuICBQcm9tcHQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gUHJvbXB0O1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5Qcm9tcHQucHJvcFR5cGVzID0ge1xuICB3aGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5zdHJpbmddKS5pc1JlcXVpcmVkXG59O1xuUHJvbXB0LmRlZmF1bHRQcm9wcyA9IHtcbiAgd2hlbjogdHJ1ZVxufTtcblByb21wdC5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBoaXN0b3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgYmxvY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9KS5pc1JlcXVpcmVkXG4gIH0pLmlzUmVxdWlyZWRcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvbXB0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXIvZXMvUHJvbXB0LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgdXBkYXRpbmcgdGhlIGxvY2F0aW9uIHByb2dyYW1hdGljYWxseVxuICogd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG52YXIgUmVkaXJlY3QgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoUmVkaXJlY3QsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJlZGlyZWN0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWRpcmVjdCk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIFJlZGlyZWN0LnByb3RvdHlwZS5pc1N0YXRpYyA9IGZ1bmN0aW9uIGlzU3RhdGljKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyICYmIHRoaXMuY29udGV4dC5yb3V0ZXIuc3RhdGljQ29udGV4dDtcbiAgfTtcblxuICBSZWRpcmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICh0aGlzLmlzU3RhdGljKCkpIHRoaXMucGVyZm9ybSgpO1xuICB9O1xuXG4gIFJlZGlyZWN0LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICghdGhpcy5pc1N0YXRpYygpKSB0aGlzLnBlcmZvcm0oKTtcbiAgfTtcblxuICBSZWRpcmVjdC5wcm90b3R5cGUucGVyZm9ybSA9IGZ1bmN0aW9uIHBlcmZvcm0oKSB7XG4gICAgdmFyIGhpc3RvcnkgPSB0aGlzLmNvbnRleHQucm91dGVyLmhpc3Rvcnk7XG4gICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIHB1c2ggPSBfcHJvcHMucHVzaCxcbiAgICAgICAgdG8gPSBfcHJvcHMudG87XG5cblxuICAgIGlmIChwdXNoKSB7XG4gICAgICBoaXN0b3J5LnB1c2godG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaXN0b3J5LnJlcGxhY2UodG8pO1xuICAgIH1cbiAgfTtcblxuICBSZWRpcmVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBSZWRpcmVjdDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuUmVkaXJlY3QucHJvcFR5cGVzID0ge1xuICBwdXNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgZnJvbTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG86IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKVxufTtcblJlZGlyZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgcHVzaDogZmFsc2Vcbn07XG5SZWRpcmVjdC5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBoaXN0b3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgcHVzaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlcGxhY2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9KS5pc1JlcXVpcmVkLFxuICAgIHN0YXRpY0NvbnRleHQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfSkuaXNSZXF1aXJlZFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSZWRpcmVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyL2VzL1JlZGlyZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgYWRkTGVhZGluZ1NsYXNoLCBjcmVhdGVQYXRoLCBwYXJzZVBhdGggfSBmcm9tICdoaXN0b3J5L1BhdGhVdGlscyc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4vUm91dGVyJztcblxudmFyIG5vcm1hbGl6ZUxvY2F0aW9uID0gZnVuY3Rpb24gbm9ybWFsaXplTG9jYXRpb24ob2JqZWN0KSB7XG4gIHZhciBfb2JqZWN0JHBhdGhuYW1lID0gb2JqZWN0LnBhdGhuYW1lLFxuICAgICAgcGF0aG5hbWUgPSBfb2JqZWN0JHBhdGhuYW1lID09PSB1bmRlZmluZWQgPyAnLycgOiBfb2JqZWN0JHBhdGhuYW1lLFxuICAgICAgX29iamVjdCRzZWFyY2ggPSBvYmplY3Quc2VhcmNoLFxuICAgICAgc2VhcmNoID0gX29iamVjdCRzZWFyY2ggPT09IHVuZGVmaW5lZCA/ICcnIDogX29iamVjdCRzZWFyY2gsXG4gICAgICBfb2JqZWN0JGhhc2ggPSBvYmplY3QuaGFzaCxcbiAgICAgIGhhc2ggPSBfb2JqZWN0JGhhc2ggPT09IHVuZGVmaW5lZCA/ICcnIDogX29iamVjdCRoYXNoO1xuXG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2ggPT09ICc/JyA/ICcnIDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2ggPT09ICcjJyA/ICcnIDogaGFzaFxuICB9O1xufTtcblxudmFyIGFkZEJhc2VuYW1lID0gZnVuY3Rpb24gYWRkQmFzZW5hbWUoYmFzZW5hbWUsIGxvY2F0aW9uKSB7XG4gIGlmICghYmFzZW5hbWUpIHJldHVybiBsb2NhdGlvbjtcblxuICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgcGF0aG5hbWU6IGFkZExlYWRpbmdTbGFzaChiYXNlbmFtZSkgKyBsb2NhdGlvbi5wYXRobmFtZVxuICB9KTtcbn07XG5cbnZhciBzdHJpcEJhc2VuYW1lID0gZnVuY3Rpb24gc3RyaXBCYXNlbmFtZShiYXNlbmFtZSwgbG9jYXRpb24pIHtcbiAgaWYgKCFiYXNlbmFtZSkgcmV0dXJuIGxvY2F0aW9uO1xuXG4gIHZhciBiYXNlID0gYWRkTGVhZGluZ1NsYXNoKGJhc2VuYW1lKTtcblxuICBpZiAobG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZihiYXNlKSAhPT0gMCkgcmV0dXJuIGxvY2F0aW9uO1xuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHtcbiAgICBwYXRobmFtZTogbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyKGJhc2UubGVuZ3RoKVxuICB9KTtcbn07XG5cbnZhciBjcmVhdGVMb2NhdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gIHJldHVybiB0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnID8gcGFyc2VQYXRoKGxvY2F0aW9uKSA6IG5vcm1hbGl6ZUxvY2F0aW9uKGxvY2F0aW9uKTtcbn07XG5cbnZhciBjcmVhdGVVUkwgPSBmdW5jdGlvbiBjcmVhdGVVUkwobG9jYXRpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycgPyBsb2NhdGlvbiA6IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xufTtcblxudmFyIHN0YXRpY0hhbmRsZXIgPSBmdW5jdGlvbiBzdGF0aWNIYW5kbGVyKG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpbnZhcmlhbnQoZmFsc2UsICdZb3UgY2Fubm90ICVzIHdpdGggPFN0YXRpY1JvdXRlcj4nLCBtZXRob2ROYW1lKTtcbiAgfTtcbn07XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgdG9wLWxldmVsIEFQSSBmb3IgYSBcInN0YXRpY1wiIDxSb3V0ZXI+LCBzby1jYWxsZWQgYmVjYXVzZSBpdFxuICogY2FuJ3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBjdXJyZW50IGxvY2F0aW9uLiBJbnN0ZWFkLCBpdCBqdXN0IHJlY29yZHNcbiAqIGxvY2F0aW9uIGNoYW5nZXMgaW4gYSBjb250ZXh0IG9iamVjdC4gVXNlZnVsIG1haW5seSBpbiB0ZXN0aW5nIGFuZFxuICogc2VydmVyLXJlbmRlcmluZyBzY2VuYXJpb3MuXG4gKi9cblxudmFyIFN0YXRpY1JvdXRlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhTdGF0aWNSb3V0ZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN0YXRpY1JvdXRlcigpIHtcbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0YXRpY1JvdXRlcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuY3JlYXRlSHJlZiA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICByZXR1cm4gYWRkTGVhZGluZ1NsYXNoKF90aGlzLnByb3BzLmJhc2VuYW1lICsgY3JlYXRlVVJMKHBhdGgpKTtcbiAgICB9LCBfdGhpcy5oYW5kbGVQdXNoID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBiYXNlbmFtZSA9IF90aGlzJHByb3BzLmJhc2VuYW1lLFxuICAgICAgICAgIGNvbnRleHQgPSBfdGhpcyRwcm9wcy5jb250ZXh0O1xuXG4gICAgICBjb250ZXh0LmFjdGlvbiA9ICdQVVNIJztcbiAgICAgIGNvbnRleHQubG9jYXRpb24gPSBhZGRCYXNlbmFtZShiYXNlbmFtZSwgY3JlYXRlTG9jYXRpb24obG9jYXRpb24pKTtcbiAgICAgIGNvbnRleHQudXJsID0gY3JlYXRlVVJMKGNvbnRleHQubG9jYXRpb24pO1xuICAgIH0sIF90aGlzLmhhbmRsZVJlcGxhY2UgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczIgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICBiYXNlbmFtZSA9IF90aGlzJHByb3BzMi5iYXNlbmFtZSxcbiAgICAgICAgICBjb250ZXh0ID0gX3RoaXMkcHJvcHMyLmNvbnRleHQ7XG5cbiAgICAgIGNvbnRleHQuYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgICAgY29udGV4dC5sb2NhdGlvbiA9IGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpO1xuICAgICAgY29udGV4dC51cmwgPSBjcmVhdGVVUkwoY29udGV4dC5sb2NhdGlvbik7XG4gICAgfSwgX3RoaXMuaGFuZGxlTGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfSwgX3RoaXMuaGFuZGxlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIFN0YXRpY1JvdXRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICByb3V0ZXI6IHtcbiAgICAgICAgc3RhdGljQ29udGV4dDogdGhpcy5wcm9wcy5jb250ZXh0XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBTdGF0aWNSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgYmFzZW5hbWUgPSBfcHJvcHMuYmFzZW5hbWUsXG4gICAgICAgIGNvbnRleHQgPSBfcHJvcHMuY29udGV4dCxcbiAgICAgICAgbG9jYXRpb24gPSBfcHJvcHMubG9jYXRpb24sXG4gICAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydiYXNlbmFtZScsICdjb250ZXh0JywgJ2xvY2F0aW9uJ10pO1xuXG4gICAgdmFyIGhpc3RvcnkgPSB7XG4gICAgICBjcmVhdGVIcmVmOiB0aGlzLmNyZWF0ZUhyZWYsXG4gICAgICBhY3Rpb246ICdQT1AnLFxuICAgICAgbG9jYXRpb246IHN0cmlwQmFzZW5hbWUoYmFzZW5hbWUsIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKSksXG4gICAgICBwdXNoOiB0aGlzLmhhbmRsZVB1c2gsXG4gICAgICByZXBsYWNlOiB0aGlzLmhhbmRsZVJlcGxhY2UsXG4gICAgICBnbzogc3RhdGljSGFuZGxlcignZ28nKSxcbiAgICAgIGdvQmFjazogc3RhdGljSGFuZGxlcignZ29CYWNrJyksXG4gICAgICBnb0ZvcndhcmQ6IHN0YXRpY0hhbmRsZXIoJ2dvRm9yd2FyZCcpLFxuICAgICAgbGlzdGVuOiB0aGlzLmhhbmRsZUxpc3RlbixcbiAgICAgIGJsb2NrOiB0aGlzLmhhbmRsZUJsb2NrXG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwgX2V4dGVuZHMoe30sIHByb3BzLCB7IGhpc3Rvcnk6IGhpc3RvcnkgfSkpO1xuICB9O1xuXG4gIHJldHVybiBTdGF0aWNSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblN0YXRpY1JvdXRlci5wcm9wVHlwZXMgPSB7XG4gIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGxvY2F0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSlcbn07XG5TdGF0aWNSb3V0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBiYXNlbmFtZTogJycsXG4gIGxvY2F0aW9uOiAnLydcbn07XG5TdGF0aWNSb3V0ZXIuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRpY1JvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyL2VzL1N0YXRpY1JvdXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNjAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCBtYXRjaFBhdGggZnJvbSAnLi9tYXRjaFBhdGgnO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciByZW5kZXJpbmcgdGhlIGZpcnN0IDxSb3V0ZT4gdGhhdCBtYXRjaGVzLlxuICovXG5cbnZhciBTd2l0Y2ggPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoU3dpdGNoLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTd2l0Y2goKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN3aXRjaCk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIFN3aXRjaC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgd2FybmluZyghKG5leHRQcm9wcy5sb2NhdGlvbiAmJiAhdGhpcy5wcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIHVuY29udHJvbGxlZCB0byBjb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IGluaXRpYWxseSB1c2VkIG5vIFwibG9jYXRpb25cIiBwcm9wIGFuZCB0aGVuIHByb3ZpZGVkIG9uZSBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpO1xuXG4gICAgd2FybmluZyghKCFuZXh0UHJvcHMubG9jYXRpb24gJiYgdGhpcy5wcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJyk7XG4gIH07XG5cbiAgU3dpdGNoLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIHJvdXRlID0gdGhpcy5jb250ZXh0LnJvdXRlci5yb3V0ZTtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG4gICAgdmFyIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCByb3V0ZS5sb2NhdGlvbjtcblxuICAgIHZhciBtYXRjaCA9IHZvaWQgMCxcbiAgICAgICAgY2hpbGQgPSB2b2lkIDA7XG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkpIHJldHVybjtcblxuICAgICAgdmFyIF9lbGVtZW50JHByb3BzID0gZWxlbWVudC5wcm9wcyxcbiAgICAgICAgICBwYXRoUHJvcCA9IF9lbGVtZW50JHByb3BzLnBhdGgsXG4gICAgICAgICAgZXhhY3QgPSBfZWxlbWVudCRwcm9wcy5leGFjdCxcbiAgICAgICAgICBzdHJpY3QgPSBfZWxlbWVudCRwcm9wcy5zdHJpY3QsXG4gICAgICAgICAgZnJvbSA9IF9lbGVtZW50JHByb3BzLmZyb207XG5cbiAgICAgIHZhciBwYXRoID0gcGF0aFByb3AgfHwgZnJvbTtcblxuICAgICAgaWYgKG1hdGNoID09IG51bGwpIHtcbiAgICAgICAgY2hpbGQgPSBlbGVtZW50O1xuICAgICAgICBtYXRjaCA9IHBhdGggPyBtYXRjaFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcGF0aDogcGF0aCwgZXhhY3Q6IGV4YWN0LCBzdHJpY3Q6IHN0cmljdCB9KSA6IHJvdXRlLm1hdGNoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hdGNoID8gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7IGxvY2F0aW9uOiBsb2NhdGlvbiwgY29tcHV0ZWRNYXRjaDogbWF0Y2ggfSkgOiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBTd2l0Y2g7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblN3aXRjaC5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByb3V0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0pLmlzUmVxdWlyZWRcbn07XG5Td2l0Y2gucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtcm91dGVyL2VzL1N3aXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gNjA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgaG9pc3RTdGF0aWNzIGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcbmltcG9ydCBSb3V0ZSBmcm9tICcuL1JvdXRlJztcblxuLyoqXG4gKiBBIHB1YmxpYyBoaWdoZXItb3JkZXIgY29tcG9uZW50IHRvIGFjY2VzcyB0aGUgaW1wZXJhdGl2ZSBBUElcbiAqL1xudmFyIHdpdGhSb3V0ZXIgPSBmdW5jdGlvbiB3aXRoUm91dGVyKENvbXBvbmVudCkge1xuICB2YXIgQyA9IGZ1bmN0aW9uIEMocHJvcHMpIHtcbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudFJlZiA9IHByb3BzLndyYXBwZWRDb21wb25lbnRSZWYsXG4gICAgICAgIHJlbWFpbmluZ1Byb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbJ3dyYXBwZWRDb21wb25lbnRSZWYnXSk7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwgeyByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihyb3V0ZUNvbXBvbmVudFByb3BzKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHJlbWFpbmluZ1Byb3BzLCByb3V0ZUNvbXBvbmVudFByb3BzLCB7IHJlZjogd3JhcHBlZENvbXBvbmVudFJlZiB9KSk7XG4gICAgICB9IH0pO1xuICB9O1xuXG4gIEMuZGlzcGxheU5hbWUgPSAnd2l0aFJvdXRlcignICsgKENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSkgKyAnKSc7XG4gIEMuV3JhcHBlZENvbXBvbmVudCA9IENvbXBvbmVudDtcbiAgQy5wcm9wVHlwZXMgPSB7XG4gICAgd3JhcHBlZENvbXBvbmVudFJlZjogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICByZXR1cm4gaG9pc3RTdGF0aWNzKEMsIENvbXBvbmVudCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1yb3V0ZXIvZXMvd2l0aFJvdXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNjA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuTmV4dEFycm93ID0gZXhwb3J0cy5QcmV2QXJyb3cgPSB1bmRlZmluZWQ7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4vbWl4aW5zL2hlbHBlcnMnKTtcblxudmFyIF9oZWxwZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcmV2QXJyb3cgPSBleHBvcnRzLlByZXZBcnJvdyA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhQcmV2QXJyb3csIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFByZXZBcnJvdygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJldkFycm93KTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgUHJldkFycm93LnByb3RvdHlwZS5jbGlja0hhbmRsZXIgPSBmdW5jdGlvbiBjbGlja0hhbmRsZXIob3B0aW9ucywgZSkge1xuICAgIGlmIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMuY2xpY2tIYW5kbGVyKG9wdGlvbnMsIGUpO1xuICB9O1xuXG4gIFByZXZBcnJvdy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBwcmV2Q2xhc3NlcyA9IHsgJ3NsaWNrLWFycm93JzogdHJ1ZSwgJ3NsaWNrLXByZXYnOiB0cnVlIH07XG4gICAgdmFyIHByZXZIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzLCB7IG1lc3NhZ2U6ICdwcmV2aW91cycgfSk7XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuaW5maW5pdGUgJiYgKHRoaXMucHJvcHMuY3VycmVudFNsaWRlID09PSAwIHx8IHRoaXMucHJvcHMuc2xpZGVDb3VudCA8PSB0aGlzLnByb3BzLnNsaWRlc1RvU2hvdykpIHtcbiAgICAgIHByZXZDbGFzc2VzWydzbGljay1kaXNhYmxlZCddID0gdHJ1ZTtcbiAgICAgIHByZXZIYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcHJldkFycm93UHJvcHMgPSB7XG4gICAgICBrZXk6ICcwJyxcbiAgICAgICdkYXRhLXJvbGUnOiAnbm9uZScsXG4gICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkocHJldkNsYXNzZXMpLFxuICAgICAgc3R5bGU6IHsgZGlzcGxheTogJ2Jsb2NrJyB9LFxuICAgICAgb25DbGljazogcHJldkhhbmRsZXJcbiAgICB9O1xuICAgIHZhciBjdXN0b21Qcm9wcyA9IHtcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5wcm9wcy5jdXJyZW50U2xpZGUsXG4gICAgICBzbGlkZUNvdW50OiB0aGlzLnByb3BzLnNsaWRlQ291bnRcbiAgICB9O1xuICAgIHZhciBwcmV2QXJyb3c7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5wcmV2QXJyb3cpIHtcbiAgICAgIHByZXZBcnJvdyA9IF9yZWFjdDIuZGVmYXVsdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5wcmV2QXJyb3csIF9leHRlbmRzKHt9LCBwcmV2QXJyb3dQcm9wcywgY3VzdG9tUHJvcHMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldkFycm93ID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICBfZXh0ZW5kcyh7IGtleTogJzAnLCB0eXBlOiAnYnV0dG9uJyB9LCBwcmV2QXJyb3dQcm9wcyksXG4gICAgICAgICcgUHJldmlvdXMnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2QXJyb3c7XG4gIH07XG5cbiAgcmV0dXJuIFByZXZBcnJvdztcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbnZhciBOZXh0QXJyb3cgPSBleHBvcnRzLk5leHRBcnJvdyA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50Mikge1xuICBfaW5oZXJpdHMoTmV4dEFycm93LCBfUmVhY3QkQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gTmV4dEFycm93KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOZXh0QXJyb3cpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgTmV4dEFycm93LnByb3RvdHlwZS5jbGlja0hhbmRsZXIgPSBmdW5jdGlvbiBjbGlja0hhbmRsZXIob3B0aW9ucywgZSkge1xuICAgIGlmIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMuY2xpY2tIYW5kbGVyKG9wdGlvbnMsIGUpO1xuICB9O1xuXG4gIE5leHRBcnJvdy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBuZXh0Q2xhc3NlcyA9IHsgJ3NsaWNrLWFycm93JzogdHJ1ZSwgJ3NsaWNrLW5leHQnOiB0cnVlIH07XG4gICAgdmFyIG5leHRIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzLCB7IG1lc3NhZ2U6ICduZXh0JyB9KTtcblxuICAgIGlmICghX2hlbHBlcnMyLmRlZmF1bHQuY2FuR29OZXh0KHRoaXMucHJvcHMpKSB7XG4gICAgICBuZXh0Q2xhc3Nlc1snc2xpY2stZGlzYWJsZWQnXSA9IHRydWU7XG4gICAgICBuZXh0SGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIG5leHRBcnJvd1Byb3BzID0ge1xuICAgICAga2V5OiAnMScsXG4gICAgICAnZGF0YS1yb2xlJzogJ25vbmUnLFxuICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKG5leHRDbGFzc2VzKSxcbiAgICAgIHN0eWxlOiB7IGRpc3BsYXk6ICdibG9jaycgfSxcbiAgICAgIG9uQ2xpY2s6IG5leHRIYW5kbGVyXG4gICAgfTtcbiAgICB2YXIgY3VzdG9tUHJvcHMgPSB7XG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMucHJvcHMuY3VycmVudFNsaWRlLFxuICAgICAgc2xpZGVDb3VudDogdGhpcy5wcm9wcy5zbGlkZUNvdW50XG4gICAgfTtcbiAgICB2YXIgbmV4dEFycm93O1xuXG4gICAgaWYgKHRoaXMucHJvcHMubmV4dEFycm93KSB7XG4gICAgICBuZXh0QXJyb3cgPSBfcmVhY3QyLmRlZmF1bHQuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMubmV4dEFycm93LCBfZXh0ZW5kcyh7fSwgbmV4dEFycm93UHJvcHMsIGN1c3RvbVByb3BzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRBcnJvdyA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgX2V4dGVuZHMoeyBrZXk6ICcxJywgdHlwZTogJ2J1dHRvbicgfSwgbmV4dEFycm93UHJvcHMpLFxuICAgICAgICAnIE5leHQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0QXJyb3c7XG4gIH07XG5cbiAgcmV0dXJuIE5leHRBcnJvdztcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXNsaWNrL2xpYi9hcnJvd3MuanNcbi8vIG1vZHVsZSBpZCA9IDYwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkRvdHMgPSB1bmRlZmluZWQ7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGdldERvdENvdW50ID0gZnVuY3Rpb24gZ2V0RG90Q291bnQoc3BlYykge1xuICB2YXIgZG90cztcbiAgZG90cyA9IE1hdGguY2VpbChzcGVjLnNsaWRlQ291bnQgLyBzcGVjLnNsaWRlc1RvU2Nyb2xsKTtcbiAgcmV0dXJuIGRvdHM7XG59O1xuXG52YXIgRG90cyA9IGV4cG9ydHMuRG90cyA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhEb3RzLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBEb3RzKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEb3RzKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgRG90cy5wcm90b3R5cGUuY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gY2xpY2tIYW5kbGVyKG9wdGlvbnMsIGUpIHtcbiAgICAvLyBJbiBBdXRvcGxheSB0aGUgZm9jdXMgc3RheXMgb24gY2xpY2tlZCBidXR0b24gZXZlbiBhZnRlciB0cmFuc2l0aW9uXG4gICAgLy8gdG8gbmV4dCBzbGlkZS4gVGhhdCBvbmx5IGdvZXMgYXdheSBieSBjbGljayBzb21ld2hlcmUgb3V0c2lkZVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLmNsaWNrSGFuZGxlcihvcHRpb25zKTtcbiAgfTtcblxuICBEb3RzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgZG90Q291bnQgPSBnZXREb3RDb3VudCh7XG4gICAgICBzbGlkZUNvdW50OiB0aGlzLnByb3BzLnNsaWRlQ291bnQsXG4gICAgICBzbGlkZXNUb1Njcm9sbDogdGhpcy5wcm9wcy5zbGlkZXNUb1Njcm9sbFxuICAgIH0pO1xuXG4gICAgLy8gQXBwbHkgam9pbiAmIHNwbGl0IHRvIEFycmF5IHRvIHByZS1maWxsIGl0IGZvciBJRThcbiAgICAvL1xuICAgIC8vIENyZWRpdDogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTM3MzU0MjUvMTg0OTQ1OFxuICAgIHZhciBkb3RzID0gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkoZG90Q291bnQgKyAxKS5qb2luKCcwJykuc3BsaXQoJycpKS5tYXAoZnVuY3Rpb24gKHgsIGkpIHtcblxuICAgICAgdmFyIGxlZnRCb3VuZCA9IGkgKiBfdGhpczIucHJvcHMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICB2YXIgcmlnaHRCb3VuZCA9IGkgKiBfdGhpczIucHJvcHMuc2xpZGVzVG9TY3JvbGwgKyAoX3RoaXMyLnByb3BzLnNsaWRlc1RvU2Nyb2xsIC0gMSk7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSh7XG4gICAgICAgICdzbGljay1hY3RpdmUnOiBfdGhpczIucHJvcHMuY3VycmVudFNsaWRlID49IGxlZnRCb3VuZCAmJiBfdGhpczIucHJvcHMuY3VycmVudFNsaWRlIDw9IHJpZ2h0Qm91bmRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZG90T3B0aW9ucyA9IHtcbiAgICAgICAgbWVzc2FnZTogJ2RvdHMnLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IF90aGlzMi5wcm9wcy5zbGlkZXNUb1Njcm9sbCxcbiAgICAgICAgY3VycmVudFNsaWRlOiBfdGhpczIucHJvcHMuY3VycmVudFNsaWRlXG4gICAgICB9O1xuXG4gICAgICB2YXIgb25DbGljayA9IF90aGlzMi5jbGlja0hhbmRsZXIuYmluZChfdGhpczIsIGRvdE9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdsaScsXG4gICAgICAgIHsga2V5OiBpLCBjbGFzc05hbWU6IGNsYXNzTmFtZSB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY2xvbmVFbGVtZW50KF90aGlzMi5wcm9wcy5jdXN0b21QYWdpbmcoaSksIHsgb25DbGljazogb25DbGljayB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICd1bCcsXG4gICAgICB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5kb3RzQ2xhc3MsIHN0eWxlOiB7IGRpc3BsYXk6ICdibG9jaycgfSB9LFxuICAgICAgZG90c1xuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIERvdHM7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1zbGljay9saWIvZG90cy5qc1xuLy8gbW9kdWxlIGlkID0gNjA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgIGF1dG9QbGF5VGltZXI6IG51bGwsXG4gICAgY3VycmVudERpcmVjdGlvbjogMCxcbiAgICBjdXJyZW50TGVmdDogbnVsbCxcbiAgICBjdXJyZW50U2xpZGU6IDAsXG4gICAgZGlyZWN0aW9uOiAxLFxuICAgIGxpc3RXaWR0aDogbnVsbCxcbiAgICBsaXN0SGVpZ2h0OiBudWxsLFxuICAgIC8vIGxvYWRJbmRleDogMCxcbiAgICBzbGlkZUNvdW50OiBudWxsLFxuICAgIHNsaWRlV2lkdGg6IG51bGwsXG4gICAgc2xpZGVIZWlnaHQ6IG51bGwsXG4gICAgLy8gc2xpZGluZzogZmFsc2UsXG4gICAgLy8gc2xpZGVPZmZzZXQ6IDAsXG4gICAgc3dpcGVMZWZ0OiBudWxsLFxuICAgIHRvdWNoT2JqZWN0OiB7XG4gICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgc3RhcnRZOiAwLFxuICAgICAgICBjdXJYOiAwLFxuICAgICAgICBjdXJZOiAwXG4gICAgfSxcblxuICAgIGxhenlMb2FkZWRMaXN0OiBbXSxcblxuICAgIC8vIGFkZGVkIGZvciByZWFjdFxuICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICBlZGdlRHJhZ2dlZDogZmFsc2UsXG4gICAgc3dpcGVkOiBmYWxzZSwgLy8gdXNlZCBieSBzd2lwZUV2ZW50LiBkaWZmZXJlbnRpdGVzIGJldHdlZW4gdG91Y2ggYW5kIHN3aXBlLlxuICAgIHRyYWNrU3R5bGU6IHt9LFxuICAgIHRyYWNrV2lkdGg6IDBcblxuICAgIC8vIFJlbW92ZWRcbiAgICAvLyB0cmFuc2Zvcm1zRW5hYmxlZDogZmFsc2UsXG4gICAgLy8gJG5leHRBcnJvdzogbnVsbCxcbiAgICAvLyAkcHJldkFycm93OiBudWxsLFxuICAgIC8vICRkb3RzOiBudWxsLFxuICAgIC8vICRsaXN0OiBudWxsLFxuICAgIC8vICRzbGlkZVRyYWNrOiBudWxsLFxuICAgIC8vICRzbGlkZXM6IG51bGwsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRpYWxTdGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtc2xpY2svbGliL2luaXRpYWwtc3RhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDYwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLklubmVyU2xpZGVyID0gdW5kZWZpbmVkO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfZXZlbnRIYW5kbGVycyA9IHJlcXVpcmUoJy4vbWl4aW5zL2V2ZW50LWhhbmRsZXJzJyk7XG5cbnZhciBfZXZlbnRIYW5kbGVyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudEhhbmRsZXJzKTtcblxudmFyIF9oZWxwZXJzID0gcmVxdWlyZSgnLi9taXhpbnMvaGVscGVycycpO1xuXG52YXIgX2hlbHBlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVycyk7XG5cbnZhciBfaW5pdGlhbFN0YXRlID0gcmVxdWlyZSgnLi9pbml0aWFsLXN0YXRlJyk7XG5cbnZhciBfaW5pdGlhbFN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaXRpYWxTdGF0ZSk7XG5cbnZhciBfZGVmYXVsdFByb3BzID0gcmVxdWlyZSgnLi9kZWZhdWx0LXByb3BzJyk7XG5cbnZhciBfZGVmYXVsdFByb3BzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRQcm9wcyk7XG5cbnZhciBfY3JlYXRlUmVhY3RDbGFzcyA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcycpO1xuXG52YXIgX2NyZWF0ZVJlYWN0Q2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlUmVhY3RDbGFzcyk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX29iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIF9vYmplY3RBc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0QXNzaWduKTtcblxudmFyIF90cmFjayA9IHJlcXVpcmUoJy4vdHJhY2snKTtcblxudmFyIF9kb3RzID0gcmVxdWlyZSgnLi9kb3RzJyk7XG5cbnZhciBfYXJyb3dzID0gcmVxdWlyZSgnLi9hcnJvd3MnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIElubmVyU2xpZGVyID0gZXhwb3J0cy5Jbm5lclNsaWRlciA9ICgwLCBfY3JlYXRlUmVhY3RDbGFzczIuZGVmYXVsdCkoe1xuICBtaXhpbnM6IFtfaGVscGVyczIuZGVmYXVsdCwgX2V2ZW50SGFuZGxlcnMyLmRlZmF1bHRdLFxuICBsaXN0OiBudWxsLFxuICB0cmFjazogbnVsbCxcbiAgbGlzdFJlZkhhbmRsZXI6IGZ1bmN0aW9uIGxpc3RSZWZIYW5kbGVyKHJlZikge1xuICAgIHRoaXMubGlzdCA9IHJlZjtcbiAgfSxcbiAgdHJhY2tSZWZIYW5kbGVyOiBmdW5jdGlvbiB0cmFja1JlZkhhbmRsZXIocmVmKSB7XG4gICAgdGhpcy50cmFjayA9IHJlZjtcbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBfaW5pdGlhbFN0YXRlMi5kZWZhdWx0LCB7XG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMucHJvcHMuaW5pdGlhbFNsaWRlXG4gICAgfSk7XG4gIH0sXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiBfZGVmYXVsdFByb3BzMi5kZWZhdWx0O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5pbml0KSB7XG4gICAgICB0aGlzLnByb3BzLmluaXQoKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3VudGVkOiB0cnVlXG4gICAgfSk7XG4gICAgdmFyIGxhenlMb2FkZWRMaXN0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik7IGkrKykge1xuICAgICAgaWYgKGkgPj0gdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUgJiYgaSA8IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlICsgdGhpcy5wcm9wcy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgbGF6eUxvYWRlZExpc3QucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5sYXp5TG9hZCAmJiB0aGlzLnN0YXRlLmxhenlMb2FkZWRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxhenlMb2FkZWRMaXN0OiBsYXp5TG9hZGVkTGlzdFxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gSGFjayBmb3IgYXV0b3BsYXkgLS0gSW5zcGVjdCBMYXRlclxuICAgIHRoaXMuaW5pdGlhbGl6ZSh0aGlzLnByb3BzKTtcbiAgICB0aGlzLmFkYXB0SGVpZ2h0KCk7XG5cbiAgICAvLyBUbyBzdXBwb3J0IHNlcnZlci1zaWRlIHJlbmRlcmluZ1xuICAgIGlmICghd2luZG93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemVkKTtcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmRDYWxsYmFjaykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYW5pbWF0aW9uRW5kQ2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5kZXRhY2hFdmVudCgnb25yZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlLmF1dG9QbGF5VGltZXIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5hdXRvUGxheVRpbWVyKTtcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2xpY2tHb1RvICE9IG5leHRQcm9wcy5zbGlja0dvVG8pIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUud2FybigncmVhY3Qtc2xpY2sgZGVwcmVjYXRpb24gd2FybmluZzogc2xpY2tHb1RvIHByb3AgaXMgZGVwcmVjYXRlZCBhbmQgaXQgd2lsbCBiZSByZW1vdmVkIGluIG5leHQgcmVsZWFzZS4gVXNlIHNsaWNrR29UbyBtZXRob2QgaW5zdGVhZCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdpbmRleCcsXG4gICAgICAgIGluZGV4OiBuZXh0UHJvcHMuc2xpY2tHb1RvLFxuICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFNsaWRlID49IG5leHRQcm9wcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMudXBkYXRlKG5leHRQcm9wcyk7XG4gICAgICB0aGlzLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgbWVzc2FnZTogJ2luZGV4JyxcbiAgICAgICAgaW5kZXg6IG5leHRQcm9wcy5jaGlsZHJlbi5sZW5ndGggLSBuZXh0UHJvcHMuc2xpZGVzVG9TaG93LFxuICAgICAgICBjdXJyZW50U2xpZGU6IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGUobmV4dFByb3BzKTtcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuYWRhcHRIZWlnaHQoKTtcbiAgfSxcbiAgb25XaW5kb3dSZXNpemVkOiBmdW5jdGlvbiBvbldpbmRvd1Jlc2l6ZWQoKSB7XG4gICAgdGhpcy51cGRhdGUodGhpcy5wcm9wcyk7XG4gICAgLy8gYW5pbWF0aW5nIHN0YXRlIHNob3VsZCBiZSBjbGVhcmVkIHdoaWxlIHJlc2l6aW5nLCBvdGhlcndpc2UgYXV0b3BsYXkgc3RvcHMgd29ya2luZ1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYW5pbWF0aW5nOiBmYWxzZVxuICAgIH0pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1hdGlvbkVuZENhbGxiYWNrKTtcbiAgICBkZWxldGUgdGhpcy5hbmltYXRpb25FbmRDYWxsYmFjaztcbiAgfSxcbiAgc2xpY2tQcmV2OiBmdW5jdGlvbiBzbGlja1ByZXYoKSB7XG4gICAgdGhpcy5jaGFuZ2VTbGlkZSh7IG1lc3NhZ2U6ICdwcmV2aW91cycgfSk7XG4gIH0sXG4gIHNsaWNrTmV4dDogZnVuY3Rpb24gc2xpY2tOZXh0KCkge1xuICAgIHRoaXMuY2hhbmdlU2xpZGUoeyBtZXNzYWdlOiAnbmV4dCcgfSk7XG4gIH0sXG4gIHNsaWNrR29UbzogZnVuY3Rpb24gc2xpY2tHb1RvKHNsaWRlKSB7XG4gICAgdHlwZW9mIHNsaWRlID09PSAnbnVtYmVyJyAmJiB0aGlzLmNoYW5nZVNsaWRlKHtcbiAgICAgIG1lc3NhZ2U6ICdpbmRleCcsXG4gICAgICBpbmRleDogc2xpZGUsXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlXG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBjbGFzc05hbWUgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdzbGljay1pbml0aWFsaXplZCcsICdzbGljay1zbGlkZXInLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuICAgICAgJ3NsaWNrLXZlcnRpY2FsJzogdGhpcy5wcm9wcy52ZXJ0aWNhbFxuICAgIH0pO1xuXG4gICAgdmFyIHRyYWNrUHJvcHMgPSB7XG4gICAgICBmYWRlOiB0aGlzLnByb3BzLmZhZGUsXG4gICAgICBjc3NFYXNlOiB0aGlzLnByb3BzLmNzc0Vhc2UsXG4gICAgICBzcGVlZDogdGhpcy5wcm9wcy5zcGVlZCxcbiAgICAgIGluZmluaXRlOiB0aGlzLnByb3BzLmluZmluaXRlLFxuICAgICAgY2VudGVyTW9kZTogdGhpcy5wcm9wcy5jZW50ZXJNb2RlLFxuICAgICAgZm9jdXNPblNlbGVjdDogdGhpcy5wcm9wcy5mb2N1c09uU2VsZWN0ID8gdGhpcy5zZWxlY3RIYW5kbGVyIDogbnVsbCxcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUsXG4gICAgICBsYXp5TG9hZDogdGhpcy5wcm9wcy5sYXp5TG9hZCxcbiAgICAgIGxhenlMb2FkZWRMaXN0OiB0aGlzLnN0YXRlLmxhenlMb2FkZWRMaXN0LFxuICAgICAgcnRsOiB0aGlzLnByb3BzLnJ0bCxcbiAgICAgIHNsaWRlV2lkdGg6IHRoaXMuc3RhdGUuc2xpZGVXaWR0aCxcbiAgICAgIHNsaWRlc1RvU2hvdzogdGhpcy5wcm9wcy5zbGlkZXNUb1Nob3csXG4gICAgICBzbGlkZXNUb1Njcm9sbDogdGhpcy5wcm9wcy5zbGlkZXNUb1Njcm9sbCxcbiAgICAgIHNsaWRlQ291bnQ6IHRoaXMuc3RhdGUuc2xpZGVDb3VudCxcbiAgICAgIHRyYWNrU3R5bGU6IHRoaXMuc3RhdGUudHJhY2tTdHlsZSxcbiAgICAgIHZhcmlhYmxlV2lkdGg6IHRoaXMucHJvcHMudmFyaWFibGVXaWR0aFxuICAgIH07XG5cbiAgICB2YXIgZG90cztcblxuICAgIGlmICh0aGlzLnByb3BzLmRvdHMgPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5zbGlkZUNvdW50ID49IHRoaXMucHJvcHMuc2xpZGVzVG9TaG93KSB7XG4gICAgICB2YXIgZG90UHJvcHMgPSB7XG4gICAgICAgIGRvdHNDbGFzczogdGhpcy5wcm9wcy5kb3RzQ2xhc3MsXG4gICAgICAgIHNsaWRlQ291bnQ6IHRoaXMuc3RhdGUuc2xpZGVDb3VudCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiB0aGlzLnByb3BzLnNsaWRlc1RvU2hvdyxcbiAgICAgICAgY3VycmVudFNsaWRlOiB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IHRoaXMucHJvcHMuc2xpZGVzVG9TY3JvbGwsXG4gICAgICAgIGNsaWNrSGFuZGxlcjogdGhpcy5jaGFuZ2VTbGlkZSxcbiAgICAgICAgY2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIGN1c3RvbVBhZ2luZzogdGhpcy5wcm9wcy5jdXN0b21QYWdpbmdcbiAgICAgIH07XG5cbiAgICAgIGRvdHMgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfZG90cy5Eb3RzLCBkb3RQcm9wcyk7XG4gICAgfVxuXG4gICAgdmFyIHByZXZBcnJvdywgbmV4dEFycm93O1xuXG4gICAgdmFyIGFycm93UHJvcHMgPSB7XG4gICAgICBpbmZpbml0ZTogdGhpcy5wcm9wcy5pbmZpbml0ZSxcbiAgICAgIGNlbnRlck1vZGU6IHRoaXMucHJvcHMuY2VudGVyTW9kZSxcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUsXG4gICAgICBzbGlkZUNvdW50OiB0aGlzLnN0YXRlLnNsaWRlQ291bnQsXG4gICAgICBzbGlkZXNUb1Nob3c6IHRoaXMucHJvcHMuc2xpZGVzVG9TaG93LFxuICAgICAgcHJldkFycm93OiB0aGlzLnByb3BzLnByZXZBcnJvdyxcbiAgICAgIG5leHRBcnJvdzogdGhpcy5wcm9wcy5uZXh0QXJyb3csXG4gICAgICBjbGlja0hhbmRsZXI6IHRoaXMuY2hhbmdlU2xpZGVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvcHMuYXJyb3dzKSB7XG4gICAgICBwcmV2QXJyb3cgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfYXJyb3dzLlByZXZBcnJvdywgYXJyb3dQcm9wcyk7XG4gICAgICBuZXh0QXJyb3cgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfYXJyb3dzLk5leHRBcnJvdywgYXJyb3dQcm9wcyk7XG4gICAgfVxuXG4gICAgdmFyIHZlcnRpY2FsSGVpZ2h0U3R5bGUgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucHJvcHMudmVydGljYWwpIHtcbiAgICAgIHZlcnRpY2FsSGVpZ2h0U3R5bGUgPSB7XG4gICAgICAgIGhlaWdodDogdGhpcy5zdGF0ZS5saXN0SGVpZ2h0XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBjZW50ZXJQYWRkaW5nU3R5bGUgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucHJvcHMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgIGNlbnRlclBhZGRpbmdTdHlsZSA9IHtcbiAgICAgICAgICBwYWRkaW5nOiAnMHB4ICcgKyB0aGlzLnByb3BzLmNlbnRlclBhZGRpbmdcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjZW50ZXJQYWRkaW5nU3R5bGUgPSB7XG4gICAgICAgICAgcGFkZGluZzogdGhpcy5wcm9wcy5jZW50ZXJQYWRkaW5nICsgJyAwcHgnXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxpc3RTdHlsZSA9ICgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7fSwgdmVydGljYWxIZWlnaHRTdHlsZSwgY2VudGVyUGFkZGluZ1N0eWxlKTtcblxuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgb25Nb3VzZUVudGVyOiB0aGlzLm9uSW5uZXJTbGlkZXJFbnRlcixcbiAgICAgICAgb25Nb3VzZUxlYXZlOiB0aGlzLm9uSW5uZXJTbGlkZXJMZWF2ZSxcbiAgICAgICAgb25Nb3VzZU92ZXI6IHRoaXMub25Jbm5lclNsaWRlck92ZXJcbiAgICAgIH0sXG4gICAgICBwcmV2QXJyb3csXG4gICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IHRoaXMubGlzdFJlZkhhbmRsZXIsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnc2xpY2stbGlzdCcsXG4gICAgICAgICAgc3R5bGU6IGxpc3RTdHlsZSxcbiAgICAgICAgICBvbk1vdXNlRG93bjogdGhpcy5zd2lwZVN0YXJ0LFxuICAgICAgICAgIG9uTW91c2VNb3ZlOiB0aGlzLnN0YXRlLmRyYWdnaW5nID8gdGhpcy5zd2lwZU1vdmUgOiBudWxsLFxuICAgICAgICAgIG9uTW91c2VVcDogdGhpcy5zd2lwZUVuZCxcbiAgICAgICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuc3RhdGUuZHJhZ2dpbmcgPyB0aGlzLnN3aXBlRW5kIDogbnVsbCxcbiAgICAgICAgICBvblRvdWNoU3RhcnQ6IHRoaXMuc3dpcGVTdGFydCxcbiAgICAgICAgICBvblRvdWNoTW92ZTogdGhpcy5zdGF0ZS5kcmFnZ2luZyA/IHRoaXMuc3dpcGVNb3ZlIDogbnVsbCxcbiAgICAgICAgICBvblRvdWNoRW5kOiB0aGlzLnN3aXBlRW5kLFxuICAgICAgICAgIG9uVG91Y2hDYW5jZWw6IHRoaXMuc3RhdGUuZHJhZ2dpbmcgPyB0aGlzLnN3aXBlRW5kIDogbnVsbCxcbiAgICAgICAgICBvbktleURvd246IHRoaXMucHJvcHMuYWNjZXNzaWJpbGl0eSA/IHRoaXMua2V5SGFuZGxlciA6IG51bGwgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgX3RyYWNrLlRyYWNrLFxuICAgICAgICAgIF9leHRlbmRzKHsgcmVmOiB0aGlzLnRyYWNrUmVmSGFuZGxlciB9LCB0cmFja1Byb3BzKSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBuZXh0QXJyb3csXG4gICAgICBkb3RzXG4gICAgKTtcbiAgfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXNsaWNrL2xpYi9pbm5lci1zbGlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDYwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHJhY2tIZWxwZXIgPSByZXF1aXJlKCcuL3RyYWNrSGVscGVyJyk7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG52YXIgX2hlbHBlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVycyk7XG5cbnZhciBfb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX29iamVjdEFzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RBc3NpZ24pO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRXZlbnRIYW5kbGVycyA9IHtcbiAgLy8gRXZlbnQgaGFuZGxlciBmb3IgcHJldmlvdXMgYW5kIG5leHRcbiAgY2hhbmdlU2xpZGU6IGZ1bmN0aW9uIGNoYW5nZVNsaWRlKG9wdGlvbnMpIHtcbiAgICB2YXIgaW5kZXhPZmZzZXQsIHByZXZpb3VzSW50LCBzbGlkZU9mZnNldCwgdW5ldmVuT2Zmc2V0LCB0YXJnZXRTbGlkZTtcbiAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGwgPSBfcHJvcHMuc2xpZGVzVG9TY3JvbGwsXG4gICAgICAgIHNsaWRlc1RvU2hvdyA9IF9wcm9wcy5zbGlkZXNUb1Nob3c7XG4gICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgIHNsaWRlQ291bnQgPSBfc3RhdGUuc2xpZGVDb3VudCxcbiAgICAgICAgY3VycmVudFNsaWRlID0gX3N0YXRlLmN1cnJlbnRTbGlkZTtcblxuICAgIHVuZXZlbk9mZnNldCA9IHNsaWRlQ291bnQgJSBzbGlkZXNUb1Njcm9sbCAhPT0gMDtcbiAgICBpbmRleE9mZnNldCA9IHVuZXZlbk9mZnNldCA/IDAgOiAoc2xpZGVDb3VudCAtIGN1cnJlbnRTbGlkZSkgJSBzbGlkZXNUb1Njcm9sbDtcblxuICAgIGlmIChvcHRpb25zLm1lc3NhZ2UgPT09ICdwcmV2aW91cycpIHtcbiAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBzbGlkZXNUb1Njcm9sbCA6IHNsaWRlc1RvU2hvdyAtIGluZGV4T2Zmc2V0O1xuICAgICAgdGFyZ2V0U2xpZGUgPSBjdXJyZW50U2xpZGUgLSBzbGlkZU9mZnNldDtcbiAgICAgIGlmICh0aGlzLnByb3BzLmxhenlMb2FkKSB7XG4gICAgICAgIHByZXZpb3VzSW50ID0gY3VycmVudFNsaWRlIC0gc2xpZGVPZmZzZXQ7XG4gICAgICAgIHRhcmdldFNsaWRlID0gcHJldmlvdXNJbnQgPT09IC0xID8gc2xpZGVDb3VudCAtIDEgOiBwcmV2aW91c0ludDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMubWVzc2FnZSA9PT0gJ25leHQnKSB7XG4gICAgICBzbGlkZU9mZnNldCA9IGluZGV4T2Zmc2V0ID09PSAwID8gc2xpZGVzVG9TY3JvbGwgOiBpbmRleE9mZnNldDtcbiAgICAgIHRhcmdldFNsaWRlID0gY3VycmVudFNsaWRlICsgc2xpZGVPZmZzZXQ7XG4gICAgICBpZiAodGhpcy5wcm9wcy5sYXp5TG9hZCkge1xuICAgICAgICB0YXJnZXRTbGlkZSA9IChjdXJyZW50U2xpZGUgKyBzbGlkZXNUb1Njcm9sbCkgJSBzbGlkZUNvdW50ICsgaW5kZXhPZmZzZXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLm1lc3NhZ2UgPT09ICdkb3RzJyB8fCBvcHRpb25zLm1lc3NhZ2UgPT09ICdjaGlsZHJlbicpIHtcbiAgICAgIC8vIENsaWNrIG9uIGRvdHNcbiAgICAgIHRhcmdldFNsaWRlID0gb3B0aW9ucy5pbmRleCAqIG9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICBpZiAodGFyZ2V0U2xpZGUgPT09IG9wdGlvbnMuY3VycmVudFNsaWRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMubWVzc2FnZSA9PT0gJ2luZGV4Jykge1xuICAgICAgdGFyZ2V0U2xpZGUgPSBwYXJzZUludChvcHRpb25zLmluZGV4KTtcbiAgICAgIGlmICh0YXJnZXRTbGlkZSA9PT0gb3B0aW9ucy5jdXJyZW50U2xpZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2xpZGVIYW5kbGVyKHRhcmdldFNsaWRlKTtcbiAgfSxcblxuICAvLyBBY2Nlc3NpYmxpdHkgaGFuZGxlciBmb3IgcHJldmlvdXMgYW5kIG5leHRcbiAga2V5SGFuZGxlcjogZnVuY3Rpb24ga2V5SGFuZGxlcihlKSB7XG4gICAgLy9Eb250IHNsaWRlIGlmIHRoZSBjdXJzb3IgaXMgaW5zaWRlIHRoZSBmb3JtIGZpZWxkcyBhbmQgYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgIGlmICghZS50YXJnZXQudGFnTmFtZS5tYXRjaCgnVEVYVEFSRUF8SU5QVVR8U0VMRUNUJykpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM3ICYmIHRoaXMucHJvcHMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLnByb3BzLnJ0bCA9PT0gdHJ1ZSA/ICduZXh0JyA6ICdwcmV2aW91cydcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkgJiYgdGhpcy5wcm9wcy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU2xpZGUoe1xuICAgICAgICAgIG1lc3NhZ2U6IHRoaXMucHJvcHMucnRsID09PSB0cnVlID8gJ3ByZXZpb3VzJyA6ICduZXh0J1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIEZvY3VzIG9uIHNlbGVjdGluZyBhIHNsaWRlIChjbGljayBoYW5kbGVyIG9uIHRyYWNrKVxuICBzZWxlY3RIYW5kbGVyOiBmdW5jdGlvbiBzZWxlY3RIYW5kbGVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNoYW5nZVNsaWRlKG9wdGlvbnMpO1xuICB9LFxuICBzd2lwZVN0YXJ0OiBmdW5jdGlvbiBzd2lwZVN0YXJ0KGUpIHtcbiAgICB2YXIgdG91Y2hlcywgcG9zWCwgcG9zWTtcblxuICAgIGlmICh0aGlzLnByb3BzLnN3aXBlID09PSBmYWxzZSB8fCAnb250b3VjaGVuZCcgaW4gZG9jdW1lbnQgJiYgdGhpcy5wcm9wcy5zd2lwZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZHJhZ2dhYmxlID09PSBmYWxzZSAmJiBlLnR5cGUuaW5kZXhPZignbW91c2UnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcG9zWCA9IGUudG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gZS50b3VjaGVzWzBdLnBhZ2VYIDogZS5jbGllbnRYO1xuICAgIHBvc1kgPSBlLnRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IGUudG91Y2hlc1swXS5wYWdlWSA6IGUuY2xpZW50WTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiB0cnVlLFxuICAgICAgdG91Y2hPYmplY3Q6IHtcbiAgICAgICAgc3RhcnRYOiBwb3NYLFxuICAgICAgICBzdGFydFk6IHBvc1ksXG4gICAgICAgIGN1clg6IHBvc1gsXG4gICAgICAgIGN1clk6IHBvc1lcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgc3dpcGVNb3ZlOiBmdW5jdGlvbiBzd2lwZU1vdmUoZSkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGF0ZS5hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMudmVydGljYWwgJiYgdGhpcy5wcm9wcy5zd2lwZVRvU2xpZGUgJiYgdGhpcy5wcm9wcy52ZXJ0aWNhbFN3aXBpbmcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgdmFyIHN3aXBlTGVmdDtcbiAgICB2YXIgY3VyTGVmdCwgcG9zaXRpb25PZmZzZXQ7XG4gICAgdmFyIHRvdWNoT2JqZWN0ID0gdGhpcy5zdGF0ZS50b3VjaE9iamVjdDtcblxuICAgIGN1ckxlZnQgPSAoMCwgX3RyYWNrSGVscGVyLmdldFRyYWNrTGVmdCkoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHtcbiAgICAgIHNsaWRlSW5kZXg6IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlLFxuICAgICAgdHJhY2tSZWY6IHRoaXMudHJhY2tcbiAgICB9LCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlKSk7XG4gICAgdG91Y2hPYmplY3QuY3VyWCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5wYWdlWCA6IGUuY2xpZW50WDtcbiAgICB0b3VjaE9iamVjdC5jdXJZID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdLnBhZ2VZIDogZS5jbGllbnRZO1xuICAgIHRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID0gTWF0aC5yb3VuZChNYXRoLnNxcnQoTWF0aC5wb3codG91Y2hPYmplY3QuY3VyWCAtIHRvdWNoT2JqZWN0LnN0YXJ0WCwgMikpKTtcblxuICAgIGlmICh0aGlzLnByb3BzLnZlcnRpY2FsU3dpcGluZykge1xuICAgICAgdG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChNYXRoLnBvdyh0b3VjaE9iamVjdC5jdXJZIC0gdG91Y2hPYmplY3Quc3RhcnRZLCAyKSkpO1xuICAgIH1cblxuICAgIHBvc2l0aW9uT2Zmc2V0ID0gKHRoaXMucHJvcHMucnRsID09PSBmYWxzZSA/IDEgOiAtMSkgKiAodG91Y2hPYmplY3QuY3VyWCA+IHRvdWNoT2JqZWN0LnN0YXJ0WCA/IDEgOiAtMSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy52ZXJ0aWNhbFN3aXBpbmcpIHtcbiAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gdG91Y2hPYmplY3QuY3VyWSA+IHRvdWNoT2JqZWN0LnN0YXJ0WSA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudFNsaWRlID0gdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGU7XG4gICAgdmFyIGRvdENvdW50ID0gTWF0aC5jZWlsKHRoaXMuc3RhdGUuc2xpZGVDb3VudCAvIHRoaXMucHJvcHMuc2xpZGVzVG9TY3JvbGwpO1xuICAgIHZhciBzd2lwZURpcmVjdGlvbiA9IHRoaXMuc3dpcGVEaXJlY3Rpb24odGhpcy5zdGF0ZS50b3VjaE9iamVjdCk7XG4gICAgdmFyIHRvdWNoU3dpcGVMZW5ndGggPSB0b3VjaE9iamVjdC5zd2lwZUxlbmd0aDtcblxuICAgIGlmICh0aGlzLnByb3BzLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgaWYgKGN1cnJlbnRTbGlkZSA9PT0gMCAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ3JpZ2h0JyB8fCBjdXJyZW50U2xpZGUgKyAxID49IGRvdENvdW50ICYmIHN3aXBlRGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgdG91Y2hTd2lwZUxlbmd0aCA9IHRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoICogdGhpcy5wcm9wcy5lZGdlRnJpY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRnZURyYWdnZWQgPT09IGZhbHNlICYmIHRoaXMucHJvcHMuZWRnZUV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5lZGdlRXZlbnQoc3dpcGVEaXJlY3Rpb24pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlZGdlRHJhZ2dlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLnN3aXBlZCA9PT0gZmFsc2UgJiYgdGhpcy5wcm9wcy5zd2lwZUV2ZW50KSB7XG4gICAgICB0aGlzLnByb3BzLnN3aXBlRXZlbnQoc3dpcGVEaXJlY3Rpb24pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN3aXBlZDogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvcHMudmVydGljYWwpIHtcbiAgICAgIHN3aXBlTGVmdCA9IGN1ckxlZnQgKyB0b3VjaFN3aXBlTGVuZ3RoICogcG9zaXRpb25PZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlTGVmdCA9IGN1ckxlZnQgKyB0b3VjaFN3aXBlTGVuZ3RoICogKHRoaXMuc3RhdGUubGlzdEhlaWdodCAvIHRoaXMuc3RhdGUubGlzdFdpZHRoKSAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnZlcnRpY2FsU3dpcGluZykge1xuICAgICAgc3dpcGVMZWZ0ID0gY3VyTGVmdCArIHRvdWNoU3dpcGVMZW5ndGggKiBwb3NpdGlvbk9mZnNldDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRvdWNoT2JqZWN0OiB0b3VjaE9iamVjdCxcbiAgICAgIHN3aXBlTGVmdDogc3dpcGVMZWZ0LFxuICAgICAgdHJhY2tTdHlsZTogKDAsIF90cmFja0hlbHBlci5nZXRUcmFja0NTUykoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHsgbGVmdDogc3dpcGVMZWZ0IH0sIHRoaXMucHJvcHMsIHRoaXMuc3RhdGUpKVxuICAgIH0pO1xuXG4gICAgaWYgKE1hdGguYWJzKHRvdWNoT2JqZWN0LmN1clggLSB0b3VjaE9iamVjdC5zdGFydFgpIDwgTWF0aC5hYnModG91Y2hPYmplY3QuY3VyWSAtIHRvdWNoT2JqZWN0LnN0YXJ0WSkgKiAwLjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID4gNCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0TmF2aWdhYmxlSW5kZXhlczogZnVuY3Rpb24gZ2V0TmF2aWdhYmxlSW5kZXhlcygpIHtcbiAgICB2YXIgbWF4ID0gdm9pZCAwO1xuICAgIHZhciBicmVha1BvaW50ID0gMDtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIGluZGV4ZXMgPSBbXTtcblxuICAgIGlmICghdGhpcy5wcm9wcy5pbmZpbml0ZSkge1xuICAgICAgbWF4ID0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVha1BvaW50ID0gdGhpcy5wcm9wcy5zbGlkZXNUb1Nob3cgKiAtMTtcbiAgICAgIGNvdW50ZXIgPSB0aGlzLnByb3BzLnNsaWRlc1RvU2hvdyAqIC0xO1xuICAgICAgbWF4ID0gdGhpcy5zdGF0ZS5zbGlkZUNvdW50ICogMjtcbiAgICB9XG5cbiAgICB3aGlsZSAoYnJlYWtQb2ludCA8IG1heCkge1xuICAgICAgaW5kZXhlcy5wdXNoKGJyZWFrUG9pbnQpO1xuICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyB0aGlzLnByb3BzLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICBjb3VudGVyICs9IHRoaXMucHJvcHMuc2xpZGVzVG9TY3JvbGwgPD0gdGhpcy5wcm9wcy5zbGlkZXNUb1Nob3cgPyB0aGlzLnByb3BzLnNsaWRlc1RvU2Nyb2xsIDogdGhpcy5wcm9wcy5zbGlkZXNUb1Nob3c7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4ZXM7XG4gIH0sXG4gIGNoZWNrTmF2aWdhYmxlOiBmdW5jdGlvbiBjaGVja05hdmlnYWJsZShpbmRleCkge1xuICAgIHZhciBuYXZpZ2FibGVzID0gdGhpcy5nZXROYXZpZ2FibGVJbmRleGVzKCk7XG4gICAgdmFyIHByZXZOYXZpZ2FibGUgPSAwO1xuXG4gICAgaWYgKGluZGV4ID4gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICBpbmRleCA9IG5hdmlnYWJsZXNbbmF2aWdhYmxlcy5sZW5ndGggLSAxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgbiBpbiBuYXZpZ2FibGVzKSB7XG4gICAgICAgIGlmIChpbmRleCA8IG5hdmlnYWJsZXNbbl0pIHtcbiAgICAgICAgICBpbmRleCA9IHByZXZOYXZpZ2FibGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2TmF2aWdhYmxlID0gbmF2aWdhYmxlc1tuXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH0sXG4gIGdldFNsaWRlQ291bnQ6IGZ1bmN0aW9uIGdldFNsaWRlQ291bnQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBjZW50ZXJPZmZzZXQgPSB0aGlzLnByb3BzLmNlbnRlck1vZGUgPyB0aGlzLnN0YXRlLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKHRoaXMucHJvcHMuc2xpZGVzVG9TaG93IC8gMikgOiAwO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuc3dpcGVUb1NsaWRlKSB7XG4gICAgICB2YXIgc3dpcGVkU2xpZGUgPSB2b2lkIDA7XG5cbiAgICAgIHZhciBzbGlja0xpc3QgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodGhpcy5saXN0KTtcblxuICAgICAgdmFyIHNsaWRlcyA9IHNsaWNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgQXJyYXkuZnJvbShzbGlkZXMpLmV2ZXJ5KGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBpZiAoIV90aGlzLnByb3BzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgaWYgKHNsaWRlLm9mZnNldExlZnQgLSBjZW50ZXJPZmZzZXQgKyBfdGhpcy5nZXRXaWR0aChzbGlkZSkgLyAyID4gX3RoaXMuc3RhdGUuc3dpcGVMZWZ0ICogLTEpIHtcbiAgICAgICAgICAgIHN3aXBlZFNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzbGlkZS5vZmZzZXRUb3AgKyBfdGhpcy5nZXRIZWlnaHQoc2xpZGUpIC8gMiA+IF90aGlzLnN0YXRlLnN3aXBlTGVmdCAqIC0xKSB7XG4gICAgICAgICAgICBzd2lwZWRTbGlkZSA9IHNsaWRlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBzbGlkZXNUcmF2ZXJzZWQgPSBNYXRoLmFicyhzd2lwZWRTbGlkZS5kYXRhc2V0LmluZGV4IC0gdGhpcy5zdGF0ZS5jdXJyZW50U2xpZGUpIHx8IDE7XG5cbiAgICAgIHJldHVybiBzbGlkZXNUcmF2ZXJzZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNsaWRlc1RvU2Nyb2xsO1xuICAgIH1cbiAgfSxcblxuICBzd2lwZUVuZDogZnVuY3Rpb24gc3dpcGVFbmQoZSkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc3dpcGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdG91Y2hPYmplY3QgPSB0aGlzLnN0YXRlLnRvdWNoT2JqZWN0O1xuICAgIHZhciBtaW5Td2lwZSA9IHRoaXMuc3RhdGUubGlzdFdpZHRoIC8gdGhpcy5wcm9wcy50b3VjaFRocmVzaG9sZDtcbiAgICB2YXIgc3dpcGVEaXJlY3Rpb24gPSB0aGlzLnN3aXBlRGlyZWN0aW9uKHRvdWNoT2JqZWN0KTtcblxuICAgIGlmICh0aGlzLnByb3BzLnZlcnRpY2FsU3dpcGluZykge1xuICAgICAgbWluU3dpcGUgPSB0aGlzLnN0YXRlLmxpc3RIZWlnaHQgLyB0aGlzLnByb3BzLnRvdWNoVGhyZXNob2xkO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHRoZSBzdGF0ZSBvZiB0b3VjaCByZWxhdGVkIHN0YXRlIHZhcmlhYmxlcy5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGVkZ2VEcmFnZ2VkOiBmYWxzZSxcbiAgICAgIHN3aXBlZDogZmFsc2UsXG4gICAgICBzd2lwZUxlZnQ6IG51bGwsXG4gICAgICB0b3VjaE9iamVjdDoge31cbiAgICB9KTtcbiAgICAvLyBGaXggZm9yICMxM1xuICAgIGlmICghdG91Y2hPYmplY3Quc3dpcGVMZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID4gbWluU3dpcGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHNsaWRlQ291bnQgPSB2b2lkIDAsXG4gICAgICAgICAgbmV3U2xpZGUgPSB2b2lkIDA7XG5cbiAgICAgIHN3aXRjaCAoc3dpcGVEaXJlY3Rpb24pIHtcblxuICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgbmV3U2xpZGUgPSB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSArIHRoaXMuZ2V0U2xpZGVDb3VudCgpO1xuICAgICAgICAgIHNsaWRlQ291bnQgPSB0aGlzLnByb3BzLnN3aXBlVG9TbGlkZSA/IHRoaXMuY2hlY2tOYXZpZ2FibGUobmV3U2xpZGUpIDogbmV3U2xpZGU7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RGlyZWN0aW9uID0gMDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICBuZXdTbGlkZSA9IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlIC0gdGhpcy5nZXRTbGlkZUNvdW50KCk7XG4gICAgICAgICAgc2xpZGVDb3VudCA9IHRoaXMucHJvcHMuc3dpcGVUb1NsaWRlID8gdGhpcy5jaGVja05hdmlnYWJsZShuZXdTbGlkZSkgOiBuZXdTbGlkZTtcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnREaXJlY3Rpb24gPSAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgc2xpZGVDb3VudCA9IHRoaXMuc3RhdGUuY3VycmVudFNsaWRlO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2xpZGVIYW5kbGVyKHNsaWRlQ291bnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBZGp1c3QgdGhlIHRyYWNrIGJhY2sgdG8gaXQncyBvcmlnaW5hbCBwb3NpdGlvbi5cbiAgICAgIHZhciBjdXJyZW50TGVmdCA9ICgwLCBfdHJhY2tIZWxwZXIuZ2V0VHJhY2tMZWZ0KSgoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoe1xuICAgICAgICBzbGlkZUluZGV4OiB0aGlzLnN0YXRlLmN1cnJlbnRTbGlkZSxcbiAgICAgICAgdHJhY2tSZWY6IHRoaXMudHJhY2tcbiAgICAgIH0sIHRoaXMucHJvcHMsIHRoaXMuc3RhdGUpKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRyYWNrU3R5bGU6ICgwLCBfdHJhY2tIZWxwZXIuZ2V0VHJhY2tBbmltYXRlQ1NTKSgoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoeyBsZWZ0OiBjdXJyZW50TGVmdCB9LCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgb25Jbm5lclNsaWRlckVudGVyOiBmdW5jdGlvbiBvbklubmVyU2xpZGVyRW50ZXIoZSkge1xuICAgIGlmICh0aGlzLnByb3BzLmF1dG9wbGF5ICYmIHRoaXMucHJvcHMucGF1c2VPbkhvdmVyKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9LFxuICBvbklubmVyU2xpZGVyT3ZlcjogZnVuY3Rpb24gb25Jbm5lclNsaWRlck92ZXIoZSkge1xuICAgIGlmICh0aGlzLnByb3BzLmF1dG9wbGF5ICYmIHRoaXMucHJvcHMucGF1c2VPbkhvdmVyKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9LFxuICBvbklubmVyU2xpZGVyTGVhdmU6IGZ1bmN0aW9uIG9uSW5uZXJTbGlkZXJMZWF2ZShlKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuYXV0b3BsYXkgJiYgdGhpcy5wcm9wcy5wYXVzZU9uSG92ZXIpIHtcbiAgICAgIHRoaXMuYXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50SGFuZGxlcnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LXNsaWNrL2xpYi9taXhpbnMvZXZlbnQtaGFuZGxlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDYxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9pbm5lclNsaWRlciA9IHJlcXVpcmUoJy4vaW5uZXItc2xpZGVyJyk7XG5cbnZhciBfb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX29iamVjdEFzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RBc3NpZ24pO1xuXG52YXIgX2pzb24ybXEgPSByZXF1aXJlKCdqc29uMm1xJyk7XG5cbnZhciBfanNvbjJtcTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qc29uMm1xKTtcblxudmFyIF9kZWZhdWx0UHJvcHMgPSByZXF1aXJlKCcuL2RlZmF1bHQtcHJvcHMnKTtcblxudmFyIF9kZWZhdWx0UHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdFByb3BzKTtcblxudmFyIF9jYW5Vc2VEb20gPSByZXF1aXJlKCdjYW4tdXNlLWRvbScpO1xuXG52YXIgX2NhblVzZURvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYW5Vc2VEb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBlbnF1aXJlID0gX2NhblVzZURvbTIuZGVmYXVsdCAmJiByZXF1aXJlKCdlbnF1aXJlLmpzJyk7XG5cbnZhciBTbGlkZXIgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoU2xpZGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTbGlkZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2xpZGVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBicmVha3BvaW50OiBudWxsXG4gICAgfTtcbiAgICBfdGhpcy5fcmVzcG9uc2l2ZU1lZGlhSGFuZGxlcnMgPSBbXTtcbiAgICBfdGhpcy5pbm5lclNsaWRlclJlZkhhbmRsZXIgPSBfdGhpcy5pbm5lclNsaWRlclJlZkhhbmRsZXIuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgU2xpZGVyLnByb3RvdHlwZS5pbm5lclNsaWRlclJlZkhhbmRsZXIgPSBmdW5jdGlvbiBpbm5lclNsaWRlclJlZkhhbmRsZXIocmVmKSB7XG4gICAgdGhpcy5pbm5lclNsaWRlciA9IHJlZjtcbiAgfTtcblxuICBTbGlkZXIucHJvdG90eXBlLm1lZGlhID0gZnVuY3Rpb24gbWVkaWEocXVlcnksIGhhbmRsZXIpIHtcbiAgICBlbnF1aXJlLnJlZ2lzdGVyKHF1ZXJ5LCBoYW5kbGVyKTtcbiAgICB0aGlzLl9yZXNwb25zaXZlTWVkaWFIYW5kbGVycy5wdXNoKHsgcXVlcnk6IHF1ZXJ5LCBoYW5kbGVyOiBoYW5kbGVyIH0pO1xuICB9O1xuXG4gIFNsaWRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMucHJvcHMucmVzcG9uc2l2ZSkge1xuICAgICAgdmFyIGJyZWFrcG9pbnRzID0gdGhpcy5wcm9wcy5yZXNwb25zaXZlLm1hcChmdW5jdGlvbiAoYnJlYWtwdCkge1xuICAgICAgICByZXR1cm4gYnJlYWtwdC5icmVha3BvaW50O1xuICAgICAgfSk7XG4gICAgICBicmVha3BvaW50cy5zb3J0KGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB4IC0geTtcbiAgICAgIH0pO1xuXG4gICAgICBicmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChicmVha3BvaW50LCBpbmRleCkge1xuICAgICAgICB2YXIgYlF1ZXJ5O1xuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICBiUXVlcnkgPSAoMCwgX2pzb24ybXEyLmRlZmF1bHQpKHsgbWluV2lkdGg6IDAsIG1heFdpZHRoOiBicmVha3BvaW50IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJRdWVyeSA9ICgwLCBfanNvbjJtcTIuZGVmYXVsdCkoeyBtaW5XaWR0aDogYnJlYWtwb2ludHNbaW5kZXggLSAxXSwgbWF4V2lkdGg6IGJyZWFrcG9pbnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgX2NhblVzZURvbTIuZGVmYXVsdCAmJiBfdGhpczIubWVkaWEoYlF1ZXJ5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgYnJlYWtwb2ludDogYnJlYWtwb2ludCB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gUmVnaXN0ZXIgbWVkaWEgcXVlcnkgZm9yIGZ1bGwgc2NyZWVuLiBOZWVkIHRvIHN1cHBvcnQgcmVzaXplIGZyb20gc21hbGwgdG8gbGFyZ2VcbiAgICAgIHZhciBxdWVyeSA9ICgwLCBfanNvbjJtcTIuZGVmYXVsdCkoeyBtaW5XaWR0aDogYnJlYWtwb2ludHMuc2xpY2UoLTEpWzBdIH0pO1xuXG4gICAgICBfY2FuVXNlRG9tMi5kZWZhdWx0ICYmIHRoaXMubWVkaWEocXVlcnksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgYnJlYWtwb2ludDogbnVsbCB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBTbGlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fcmVzcG9uc2l2ZU1lZGlhSGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICBlbnF1aXJlLnVucmVnaXN0ZXIob2JqLnF1ZXJ5LCBvYmouaGFuZGxlcik7XG4gICAgfSk7XG4gIH07XG5cbiAgU2xpZGVyLnByb3RvdHlwZS5zbGlja1ByZXYgPSBmdW5jdGlvbiBzbGlja1ByZXYoKSB7XG4gICAgdGhpcy5pbm5lclNsaWRlci5zbGlja1ByZXYoKTtcbiAgfTtcblxuICBTbGlkZXIucHJvdG90eXBlLnNsaWNrTmV4dCA9IGZ1bmN0aW9uIHNsaWNrTmV4dCgpIHtcbiAgICB0aGlzLmlubmVyU2xpZGVyLnNsaWNrTmV4dCgpO1xuICB9O1xuXG4gIFNsaWRlci5wcm90b3R5cGUuc2xpY2tHb1RvID0gZnVuY3Rpb24gc2xpY2tHb1RvKHNsaWRlKSB7XG4gICAgdGhpcy5pbm5lclNsaWRlci5zbGlja0dvVG8oc2xpZGUpO1xuICB9O1xuXG4gIFNsaWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIHNldHRpbmdzO1xuICAgIHZhciBuZXdQcm9wcztcbiAgICBpZiAodGhpcy5zdGF0ZS5icmVha3BvaW50KSB7XG4gICAgICBuZXdQcm9wcyA9IHRoaXMucHJvcHMucmVzcG9uc2l2ZS5maWx0ZXIoZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgcmV0dXJuIHJlc3AuYnJlYWtwb2ludCA9PT0gX3RoaXMzLnN0YXRlLmJyZWFrcG9pbnQ7XG4gICAgICB9KTtcbiAgICAgIHNldHRpbmdzID0gbmV3UHJvcHNbMF0uc2V0dGluZ3MgPT09ICd1bnNsaWNrJyA/ICd1bnNsaWNrJyA6ICgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHNbMF0uc2V0dGluZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXR0aW5ncyA9ICgwLCBfb2JqZWN0QXNzaWduMi5kZWZhdWx0KSh7fSwgX2RlZmF1bHRQcm9wczIuZGVmYXVsdCwgdGhpcy5wcm9wcyk7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICBjaGlsZHJlbiA9IFtjaGlsZHJlbl07XG4gICAgfVxuXG4gICAgLy8gQ2hpbGRyZW4gbWF5IGNvbnRhaW4gZmFsc2Ugb3IgbnVsbCwgc28gd2Ugc2hvdWxkIGZpbHRlciB0aGVtXG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gISFjaGlsZDtcbiAgICB9KTtcblxuICAgIGlmIChzZXR0aW5ncyA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAvLyBpZiAndW5zbGljaycgcmVzcG9uc2l2ZSBicmVha3BvaW50IHNldHRpbmcgdXNlZCwganVzdCByZXR1cm4gdGhlIDxTbGlkZXI+IHRhZyBuZXN0ZWQgSFRNTFxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgX2lubmVyU2xpZGVyLklubmVyU2xpZGVyLFxuICAgICAgICBfZXh0ZW5kcyh7IHJlZjogdGhpcy5pbm5lclNsaWRlclJlZkhhbmRsZXIgfSwgc2V0dGluZ3MpLFxuICAgICAgICBjaGlsZHJlblxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNsaWRlcjtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNsaWRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qtc2xpY2svbGliL3NsaWRlci5qc1xuLy8gbW9kdWxlIGlkID0gNjExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuVHJhY2sgPSB1bmRlZmluZWQ7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9vYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBfb2JqZWN0QXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29iamVjdEFzc2lnbik7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBnZXRTbGlkZUNsYXNzZXMgPSBmdW5jdGlvbiBnZXRTbGlkZUNsYXNzZXMoc3BlYykge1xuICB2YXIgc2xpY2tBY3RpdmUsIHNsaWNrQ2VudGVyLCBzbGlja0Nsb25lZDtcbiAgdmFyIGNlbnRlck9mZnNldCwgaW5kZXg7XG5cbiAgaWYgKHNwZWMucnRsKSB7XG4gICAgaW5kZXggPSBzcGVjLnNsaWRlQ291bnQgLSAxIC0gc3BlYy5pbmRleDtcbiAgfSBlbHNlIHtcbiAgICBpbmRleCA9IHNwZWMuaW5kZXg7XG4gIH1cblxuICBzbGlja0Nsb25lZCA9IGluZGV4IDwgMCB8fCBpbmRleCA+PSBzcGVjLnNsaWRlQ291bnQ7XG4gIGlmIChzcGVjLmNlbnRlck1vZGUpIHtcbiAgICBjZW50ZXJPZmZzZXQgPSBNYXRoLmZsb29yKHNwZWMuc2xpZGVzVG9TaG93IC8gMik7XG4gICAgc2xpY2tDZW50ZXIgPSAoaW5kZXggLSBzcGVjLmN1cnJlbnRTbGlkZSkgJSBzcGVjLnNsaWRlQ291bnQgPT09IDA7XG4gICAgaWYgKGluZGV4ID4gc3BlYy5jdXJyZW50U2xpZGUgLSBjZW50ZXJPZmZzZXQgLSAxICYmIGluZGV4IDw9IHNwZWMuY3VycmVudFNsaWRlICsgY2VudGVyT2Zmc2V0KSB7XG4gICAgICBzbGlja0FjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNsaWNrQWN0aXZlID0gc3BlYy5jdXJyZW50U2xpZGUgPD0gaW5kZXggJiYgaW5kZXggPCBzcGVjLmN1cnJlbnRTbGlkZSArIHNwZWMuc2xpZGVzVG9TaG93O1xuICB9XG4gIHJldHVybiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKHtcbiAgICAnc2xpY2stc2xpZGUnOiB0cnVlLFxuICAgICdzbGljay1hY3RpdmUnOiBzbGlja0FjdGl2ZSxcbiAgICAnc2xpY2stY2VudGVyJzogc2xpY2tDZW50ZXIsXG4gICAgJ3NsaWNrLWNsb25lZCc6IHNsaWNrQ2xvbmVkXG4gIH0pO1xufTtcblxudmFyIGdldFNsaWRlU3R5bGUgPSBmdW5jdGlvbiBnZXRTbGlkZVN0eWxlKHNwZWMpIHtcbiAgdmFyIHN0eWxlID0ge307XG5cbiAgaWYgKHNwZWMudmFyaWFibGVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNwZWMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIHtcbiAgICBzdHlsZS53aWR0aCA9IHNwZWMuc2xpZGVXaWR0aDtcbiAgfVxuXG4gIGlmIChzcGVjLmZhZGUpIHtcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgc3R5bGUubGVmdCA9IC1zcGVjLmluZGV4ICogc3BlYy5zbGlkZVdpZHRoO1xuICAgIHN0eWxlLm9wYWNpdHkgPSBzcGVjLmN1cnJlbnRTbGlkZSA9PT0gc3BlYy5pbmRleCA/IDEgOiAwO1xuICAgIHN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSAnICsgc3BlYy5zcGVlZCArICdtcyAnICsgc3BlYy5jc3NFYXNlO1xuICAgIHN0eWxlLldlYmtpdFRyYW5zaXRpb24gPSAnb3BhY2l0eSAnICsgc3BlYy5zcGVlZCArICdtcyAnICsgc3BlYy5jc3NFYXNlO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcblxudmFyIGdldEtleSA9IGZ1bmN0aW9uIGdldEtleShjaGlsZCwgZmFsbGJhY2tLZXkpIHtcbiAgLy8ga2V5IGNvdWxkIGJlIGEgemVyb1xuICByZXR1cm4gY2hpbGQua2V5ID09PSBudWxsIHx8IGNoaWxkLmtleSA9PT0gdW5kZWZpbmVkID8gZmFsbGJhY2tLZXkgOiBjaGlsZC5rZXk7XG59O1xuXG52YXIgcmVuZGVyU2xpZGVzID0gZnVuY3Rpb24gcmVuZGVyU2xpZGVzKHNwZWMpIHtcbiAgdmFyIGtleTtcbiAgdmFyIHNsaWRlcyA9IFtdO1xuICB2YXIgcHJlQ2xvbmVTbGlkZXMgPSBbXTtcbiAgdmFyIHBvc3RDbG9uZVNsaWRlcyA9IFtdO1xuICB2YXIgY291bnQgPSBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4uY291bnQoc3BlYy5jaGlsZHJlbik7XG5cbiAgX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLmZvckVhY2goc3BlYy5jaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW0sIGluZGV4KSB7XG4gICAgdmFyIGNoaWxkID0gdm9pZCAwO1xuICAgIHZhciBjaGlsZE9uQ2xpY2tPcHRpb25zID0ge1xuICAgICAgbWVzc2FnZTogJ2NoaWxkcmVuJyxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiBzcGVjLnNsaWRlc1RvU2Nyb2xsLFxuICAgICAgY3VycmVudFNsaWRlOiBzcGVjLmN1cnJlbnRTbGlkZVxuICAgIH07XG5cbiAgICBpZiAoIXNwZWMubGF6eUxvYWQgfCAoc3BlYy5sYXp5TG9hZCAmJiBzcGVjLmxhenlMb2FkZWRMaXN0LmluZGV4T2YoaW5kZXgpID49IDApKSB7XG4gICAgICBjaGlsZCA9IGVsZW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwpO1xuICAgIH1cbiAgICB2YXIgY2hpbGRTdHlsZSA9IGdldFNsaWRlU3R5bGUoKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHt9LCBzcGVjLCB7IGluZGV4OiBpbmRleCB9KSk7XG4gICAgdmFyIHNsaWNrQ2xhc3NlcyA9IGdldFNsaWRlQ2xhc3NlcygoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoeyBpbmRleDogaW5kZXggfSwgc3BlYykpO1xuICAgIHZhciBjc3NDbGFzc2VzO1xuXG4gICAgaWYgKGNoaWxkLnByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgY3NzQ2xhc3NlcyA9ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoc2xpY2tDbGFzc2VzLCBjaGlsZC5wcm9wcy5jbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjc3NDbGFzc2VzID0gc2xpY2tDbGFzc2VzO1xuICAgIH1cblxuICAgIHZhciBvbkNsaWNrID0gZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICBjaGlsZC5wcm9wcyAmJiBjaGlsZC5wcm9wcy5vbkNsaWNrICYmIGNoaWxkLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgICBpZiAoc3BlYy5mb2N1c09uU2VsZWN0KSB7XG4gICAgICAgIHNwZWMuZm9jdXNPblNlbGVjdChjaGlsZE9uQ2xpY2tPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2xpZGVzLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAga2V5OiAnb3JpZ2luYWwnICsgZ2V0S2V5KGNoaWxkLCBpbmRleCksXG4gICAgICAnZGF0YS1pbmRleCc6IGluZGV4LFxuICAgICAgY2xhc3NOYW1lOiBjc3NDbGFzc2VzLFxuICAgICAgdGFiSW5kZXg6ICctMScsXG4gICAgICBzdHlsZTogKDAsIF9vYmplY3RBc3NpZ24yLmRlZmF1bHQpKHsgb3V0bGluZTogJ25vbmUnIH0sIGNoaWxkLnByb3BzLnN0eWxlIHx8IHt9LCBjaGlsZFN0eWxlKSxcbiAgICAgIG9uQ2xpY2s6IG9uQ2xpY2tcbiAgICB9KSk7XG5cbiAgICAvLyB2YXJpYWJsZVdpZHRoIGRvZXNuJ3Qgd3JhcCBwcm9wZXJseS5cbiAgICBpZiAoc3BlYy5pbmZpbml0ZSAmJiBzcGVjLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICB2YXIgaW5maW5pdGVDb3VudCA9IHNwZWMudmFyaWFibGVXaWR0aCA/IHNwZWMuc2xpZGVzVG9TaG93ICsgMSA6IHNwZWMuc2xpZGVzVG9TaG93O1xuXG4gICAgICBpZiAoaW5kZXggPj0gY291bnQgLSBpbmZpbml0ZUNvdW50KSB7XG4gICAgICAgIGtleSA9IC0oY291bnQgLSBpbmRleCk7XG4gICAgICAgIHByZUNsb25lU2xpZGVzLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgIGtleTogJ3ByZWNsb25lZCcgKyBnZXRLZXkoY2hpbGQsIGtleSksXG4gICAgICAgICAgJ2RhdGEtaW5kZXgnOiBrZXksXG4gICAgICAgICAgY2xhc3NOYW1lOiBjc3NDbGFzc2VzLFxuICAgICAgICAgIHN0eWxlOiAoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoe30sIGNoaWxkLnByb3BzLnN0eWxlIHx8IHt9LCBjaGlsZFN0eWxlKSxcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4IDwgaW5maW5pdGVDb3VudCkge1xuICAgICAgICBrZXkgPSBjb3VudCArIGluZGV4O1xuICAgICAgICBwb3N0Q2xvbmVTbGlkZXMucHVzaChfcmVhY3QyLmRlZmF1bHQuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAga2V5OiAncG9zdGNsb25lZCcgKyBnZXRLZXkoY2hpbGQsIGtleSksXG4gICAgICAgICAgJ2RhdGEtaW5kZXgnOiBrZXksXG4gICAgICAgICAgY2xhc3NOYW1lOiBjc3NDbGFzc2VzLFxuICAgICAgICAgIHN0eWxlOiAoMCwgX29iamVjdEFzc2lnbjIuZGVmYXVsdCkoe30sIGNoaWxkLnByb3BzLnN0eWxlIHx8IHt9LCBjaGlsZFN0eWxlKSxcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGlmIChzcGVjLnJ0bCkge1xuICAgIHJldHVybiBwcmVDbG9uZVNsaWRlcy5jb25jYXQoc2xpZGVzLCBwb3N0Q2xvbmVTbGlkZXMpLnJldmVyc2UoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcHJlQ2xvbmVTbGlkZXMuY29uY2F0KHNsaWRlcywgcG9zdENsb25lU2xpZGVzKTtcbiAgfVxufTtcblxudmFyIFRyYWNrID0gZXhwb3J0cy5UcmFjayA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhUcmFjaywgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVHJhY2soKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRyYWNrKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUmVhY3QkQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgVHJhY2sucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgc2xpZGVzID0gcmVuZGVyU2xpZGVzLmNhbGwodGhpcywgdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2RpdicsXG4gICAgICB7IGNsYXNzTmFtZTogJ3NsaWNrLXRyYWNrJywgc3R5bGU6IHRoaXMucHJvcHMudHJhY2tTdHlsZSB9LFxuICAgICAgc2xpZGVzXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gVHJhY2s7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1zbGljay9saWIvdHJhY2suanNcbi8vIG1vZHVsZSBpZCA9IDYxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlID0gZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBBYm91dCAxLjV4IGZhc3RlciB0aGFuIHRoZSB0d28tYXJnIHZlcnNpb24gb2YgQXJyYXkjc3BsaWNlKClcbnZhciBzcGxpY2VPbmUgPSBmdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICh2YXIgaSA9IGluZGV4LCBrID0gaSArIDEsIG4gPSBsaXN0Lmxlbmd0aDsgayA8IG47IGkgKz0gMSwgayArPSAxKSB7XG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIH1saXN0LnBvcCgpO1xufTtcblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbnZhciByZXNvbHZlUGF0aG5hbWUgPSBmdW5jdGlvbiByZXNvbHZlUGF0aG5hbWUodG8pIHtcbiAgdmFyIGZyb20gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuXG4gIHZhciB0b1BhcnRzID0gdG8gJiYgdG8uc3BsaXQoJy8nKSB8fCBbXTtcbiAgdmFyIGZyb21QYXJ0cyA9IGZyb20gJiYgZnJvbS5zcGxpdCgnLycpIHx8IFtdO1xuXG4gIHZhciBpc1RvQWJzID0gdG8gJiYgaXNBYnNvbHV0ZSh0byk7XG4gIHZhciBpc0Zyb21BYnMgPSBmcm9tICYmIGlzQWJzb2x1dGUoZnJvbSk7XG4gIHZhciBtdXN0RW5kQWJzID0gaXNUb0FicyB8fCBpc0Zyb21BYnM7XG5cbiAgaWYgKHRvICYmIGlzQWJzb2x1dGUodG8pKSB7XG4gICAgLy8gdG8gaXMgYWJzb2x1dGVcbiAgICBmcm9tUGFydHMgPSB0b1BhcnRzO1xuICB9IGVsc2UgaWYgKHRvUGFydHMubGVuZ3RoKSB7XG4gICAgLy8gdG8gaXMgcmVsYXRpdmUsIGRyb3AgdGhlIGZpbGVuYW1lXG4gICAgZnJvbVBhcnRzLnBvcCgpO1xuICAgIGZyb21QYXJ0cyA9IGZyb21QYXJ0cy5jb25jYXQodG9QYXJ0cyk7XG4gIH1cblxuICBpZiAoIWZyb21QYXJ0cy5sZW5ndGgpIHJldHVybiAnLyc7XG5cbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSB2b2lkIDA7XG4gIGlmIChmcm9tUGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGxhc3QgPSBmcm9tUGFydHNbZnJvbVBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJyB8fCBsYXN0ID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICBoYXNUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG4gIH1cblxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gZnJvbVBhcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcGFydCA9IGZyb21QYXJ0c1tpXTtcblxuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNwbGljZU9uZShmcm9tUGFydHMsIGkpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW11c3RFbmRBYnMpIGZvciAoOyB1cC0tOyB1cCkge1xuICAgIGZyb21QYXJ0cy51bnNoaWZ0KCcuLicpO1xuICB9aWYgKG11c3RFbmRBYnMgJiYgZnJvbVBhcnRzWzBdICE9PSAnJyAmJiAoIWZyb21QYXJ0c1swXSB8fCAhaXNBYnNvbHV0ZShmcm9tUGFydHNbMF0pKSkgZnJvbVBhcnRzLnVuc2hpZnQoJycpO1xuXG4gIHZhciByZXN1bHQgPSBmcm9tUGFydHMuam9pbignLycpO1xuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIHJlc3VsdC5zdWJzdHIoLTEpICE9PSAnLycpIHJlc3VsdCArPSAnLyc7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzb2x2ZVBhdGhuYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZXNvbHZlLXBhdGhuYW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNhbWVsMmh5cGhlbiA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0clxuICAgICAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiAnLScgKyBtYXRjaC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsMmh5cGhlbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3RyaW5nLWNvbnZlcnQvY2FtZWwyaHlwaGVuLmpzXG4vLyBtb2R1bGUgaWQgPSA2MTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciB2YWx1ZUVxdWFsID0gZnVuY3Rpb24gdmFsdWVFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGEpKSByZXR1cm4gQXJyYXkuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICByZXR1cm4gdmFsdWVFcXVhbChpdGVtLCBiW2luZGV4XSk7XG4gIH0pO1xuXG4gIHZhciBhVHlwZSA9IHR5cGVvZiBhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhKTtcbiAgdmFyIGJUeXBlID0gdHlwZW9mIGIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGIpO1xuXG4gIGlmIChhVHlwZSAhPT0gYlR5cGUpIHJldHVybiBmYWxzZTtcblxuICBpZiAoYVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFWYWx1ZSA9IGEudmFsdWVPZigpO1xuICAgIHZhciBiVmFsdWUgPSBiLnZhbHVlT2YoKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKTtcblxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIGFLZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGFba2V5XSwgYltrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHZhbHVlRXF1YWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3ZhbHVlLWVxdWFsL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pFQTtBQUNBOzs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25VQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDemFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3Q0E7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoRUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9
