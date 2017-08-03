window.__NEXT_REGISTER_PAGE("/", function() {
  var comp = (module.exports = webpackJsonp(
    [5],
    {
      /***/ /***/ 542: function(module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */ (function(__resourceQuery) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _react = __webpack_require__(12);

          var _react2 = _interopRequireDefault(_react);

          var _Header = __webpack_require__(549);

          var _Header2 = _interopRequireDefault(_Header);

          var _Footer = __webpack_require__(547);

          var _Footer2 = _interopRequireDefault(_Footer);

          var _Head = __webpack_require__(548);

          var _Head2 = _interopRequireDefault(_Head);

          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }

          var _jsxFileName =
            "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/index.js?entry";

          var App = function App() {
            return _react2.default.createElement(
              "div",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 7
                }
              },
              _react2.default.createElement(_Head2.default, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 8
                }
              }),
              _react2.default.createElement(_Header2.default, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 9
                }
              }),
              _react2.default.createElement(_Footer2.default, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 10
                }
              })
            );
          };
          exports.default = App;

          (function register() {
            /* react-hot-loader/webpack */ if (true) {
              if (typeof __REACT_HOT_LOADER__ === "undefined") {
                return;
              }
              if (typeof module.exports === "function") {
                __REACT_HOT_LOADER__.register(
                  module.exports,
                  "module.exports",
                  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/index.js"
                );
                return;
              }
              for (var key in module.exports) {
                if (
                  !Object.prototype.hasOwnProperty.call(module.exports, key)
                ) {
                  continue;
                }
                var namedExport = void 0;
                try {
                  namedExport = module.exports[key];
                } catch (err) {
                  continue;
                }
                __REACT_HOT_LOADER__.register(
                  namedExport,
                  key,
                  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/index.js"
                );
              }
            }
          })();
          (function(Component, route) {
            if (false) return;
            if (false) return;

            var qs = __webpack_require__(85);
            var params = qs.parse(__resourceQuery.slice(1));
            if (params.entry == null) return;

            module.hot.accept();
            Component.__route = route;

            if (module.hot.status() === "idle") return;

            var components = next.router.components;
            for (var r in components) {
              if (!components.hasOwnProperty(r)) continue;

              if (components[r].Component.__route === route) {
                next.router.update(r, Component);
              }
            }
          })(module.exports.default || module.exports, "/");

          /* WEBPACK VAR INJECTION */
        }.call(exports, "?entry"));

        /***/
      },

      /***/ /***/ 545: function(module, exports) {
        throw new Error(
          'Module build failed: Syntax Error \n\n(1:1) Unknown word\n\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 1 | \u001b[39mimport React from \u001b[32m"react"\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 2 | \u001b[39m\n \u001b[90m 3 | \u001b[39mconst FooterStyles =\u001b[36m \u001b[39m\u001b[36m()\u001b[39m =>\n'
        );

        /***/
      },

      /***/ /***/ 546: function(module, exports) {
        module.exports = {
          classNames: {
            header: "header-2zG4F",
            linksContainer: "linksContainer-3dt4U",
            mainLinks: "mainLinks-2HIwA",
            secondaryLinks: "secondaryLinks-TqAoO",
            login: "login-LCyHx",
            divider: "divider-2Niyk"
          },
          stylesheet: `.header-2zG4F{background-color:#0a2a37}.linksContainer-3dt4U{margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 70px;font-size:14px;font-size:.875rem;font-weight:600;line-height:18px;line-height:1.125rem}@media screen and (min-width:1100px){.linksContainer-3dt4U{max-width:1024px;padding:0}}.mainLinks-2HIwA{margin:15px 0;color:#fff;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;text-transform:uppercase}.mainLinks-2HIwA a{margin-right:17px}.mainLinks-2HIwA a:last-child{margin-right:21px}.secondaryLinks-TqAoO{margin:15px 0;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;color:hsla(0,0%,100%,.7);text-transform:uppercase}.secondaryLinks-TqAoO a{margin-right:30px}.secondaryLinks-TqAoO a:first-child{margin-left:21px}.login-LCyHx{color:#fff;margin-left:auto;cursor:pointer;text-transform:uppercase;font-size:14px;font-size:.875rem;font-weight:600;line-height:18px;line-height:1.125rem}.divider-2Niyk{display:inline-block;height:20px;width:1px;background-color:hsla(0,0%,100%,.6)}`
        };

        /***/
      },

      /***/ /***/ 547: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _style = __webpack_require__(540);

        var _style2 = _interopRequireDefault(_style);

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _link = __webpack_require__(541);

        var _FooterStyles = __webpack_require__(545);

        var _FooterStyles2 = _interopRequireDefault(_FooterStyles);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _jsxFileName =
          "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/index.js";

        var dplaLogo = "static/images/dpla-logo.svg";
        var fbIcon = "static/images/facebook.svg";
        var igIcon = "static/images/instagram.svg";
        var rssIcon = "static/images/rss.svg";
        var tumblrIcon = "static/images/tumblr.svg";

        var Footer = function Footer() {
          return _react2.default.createElement(
            "div",
            {
              className: "footer",
              "data-jsx-ext": _FooterStyles2.default.__scopedHash,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 12
              }
            },
            _react2.default.createElement(
              "div",
              {
                className: "linksAndDonate",
                "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 13
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "linksWrapper",
                  "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: "links",
                    "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 15
                    }
                  },
                  _react2.default.createElement(
                    "div",
                    {
                      "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 16
                      }
                    },
                    _react2.default.createElement(
                      "h3",
                      {
                        className: "linkHeader",
                        "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 17
                        }
                      },
                      "DPLA"
                    ),
                    _react2.default.createElement(
                      "ul",
                      {
                        "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 18
                        }
                      },
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 19
                          }
                        },
                        "About Us"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 20
                          }
                        },
                        "FAQ"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 21
                          }
                        },
                        "Who Uses DPLA?"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 22
                          }
                        },
                        "Terms & Conditions"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 23
                          }
                        },
                        "Contact Us"
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    {
                      "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 26
                      }
                    },
                    _react2.default.createElement(
                      "h3",
                      {
                        className: "linkHeader",
                        "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 27
                        }
                      },
                      "Tools"
                    ),
                    _react2.default.createElement(
                      "ul",
                      {
                        "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 28
                        }
                      },
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 29
                          }
                        },
                        "Search"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 30
                          }
                        },
                        "Exhibitions"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 31
                          }
                        },
                        " Primary Source Sets "
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 32
                          }
                        },
                        "Browse by Topic"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 33
                          }
                        },
                        "Browse by Partner"
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    {
                      "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 36
                      }
                    },
                    _react2.default.createElement(
                      "h3",
                      {
                        className: "linkHeader",
                        "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 37
                        }
                      },
                      "Pro Community"
                    ),
                    _react2.default.createElement(
                      "ul",
                      {
                        "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 38
                        }
                      },
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 39
                          }
                        },
                        "About DPLA"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 40
                          }
                        },
                        "Hubs"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 41
                          }
                        },
                        "Projects"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 42
                          }
                        },
                        "Get Involved"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 43
                          }
                        },
                        "Educators"
                      ),
                      _react2.default.createElement(
                        "li",
                        {
                          "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 44
                          }
                        },
                        "Developers"
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                "button",
                {
                  className: "donateButton",
                  "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 49
                  }
                },
                "Donate"
              )
            ),
            _react2.default.createElement(
              "div",
              {
                className: "logoAndSocialWrapper",
                "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 51
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "logoAndSocial",
                  "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                  }
                },
                _react2.default.createElement("img", {
                  className: "dplaLogo",
                  alt: "DPLA",
                  src: dplaLogo,
                  "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 53
                  }
                }),
                _react2.default.createElement(
                  "div",
                  {
                    className: "social",
                    "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 54
                    }
                  },
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "Facebook",
                    src: fbIcon,
                    "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 55
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "Instagram",
                    src: igIcon,
                    "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 57
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "RSS Feed",
                    src: rssIcon,
                    "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 59
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "Tumblr",
                    src: tumblrIcon,
                    "data-jsx-ext": _FooterStyles2.default.__scopedHash,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 61
                    }
                  })
                )
              )
            ),
            _react2.default.createElement(_style2.default, {
              styleId: _FooterStyles2.default.__scopedHash,
              css: _FooterStyles2.default.__scoped
            })
          );
        };

        exports.default = Footer;

        (function register() {
          /* react-hot-loader/webpack */ if (true) {
            if (typeof __REACT_HOT_LOADER__ === "undefined") {
              return;
            }
            if (typeof module.exports === "function") {
              __REACT_HOT_LOADER__.register(
                module.exports,
                "module.exports",
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/index.js"
              );
              return;
            }
            for (var key in module.exports) {
              if (!Object.prototype.hasOwnProperty.call(module.exports, key)) {
                continue;
              }
              var namedExport = void 0;
              try {
                namedExport = module.exports[key];
              } catch (err) {
                continue;
              }
              __REACT_HOT_LOADER__.register(
                namedExport,
                key,
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/index.js"
              );
            }
          }
        })();

        /***/
      },

      /***/ /***/ 548: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _style = __webpack_require__(540);

        var _style2 = _interopRequireDefault(_style);

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _head = __webpack_require__(194);

        var _head2 = _interopRequireDefault(_head);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _jsxFileName =
          "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js";

        exports.default = function() {
          return _react2.default.createElement(
            "div",
            {
              "data-jsx": 2035692206,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 5
              }
            },
            _react2.default.createElement(_style2.default, {
              styleId: 2035692206,
              css:
                ":root{--color-red:red}body{margin:0;padding:0;font-family:'Source Sans Pro', sans-serif;-webkit-font-smoothing:antialiased}button,input{font-family:\"Source Sans Pro\"}a{color:inherit;-webkit-text-decoration:none;text-decoration:none}button{background:none;border:none;cursor:pointer}ul{list-style:none}p,ul,h1,h2,h3,h4,h5,h6{margin:0;padding:0}.slick-disabled{display:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLdUIsQUFHeUIsQUFDUCxBQUNxQixBQUNoQixBQUNFLEFBQ0EsQUFDUCxBQUNJLFVBTmUsQUFLQSxJQUNSLENBSndCLEVBSHJCLEFBSWMsQUFDZCxJQUp3RCxBQUs1QyxTQUYwQixDQUZ4QixlQUUrQixrQkFIdUQsR0FFeEUsaUNBRitFIiwiZmlsZSI6ImNvbXBvbmVudHMvSGVhZC9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZnJhbmtpZXNpbW1zL0Rlc2t0b3AvZHBsYS1lbmR1c2VyLXNpdGUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+XG4gIDxkaXY+XG4gICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgIDpyb290IHtcbiAgICAgICAgLS1jb2xvci1yZWQ6IHJlZDtcbiAgICAgIH1cbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjtcbiAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICB9XG4gICAgICBidXR0b24sIGlucHV0IHtcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgICB9XG4gICAgICBhIHtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuICAgICAgdWwge1xuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgfVxuICAgICAgcCwgdWwsIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICB9XG4gICAgICA6Z2xvYmFsKC5zbGljay1kaXNhYmxlZCkge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgICA8SGVhZD5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICA8bWV0YVxuICAgICAgICBuYW1lPVwidmlld3BvcnRcIlxuICAgICAgICBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEsIHNocmluay10by1maXQ9bm9cIlxuICAgICAgLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjMDAwMDAwXCIgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U291cmNlK1NhbnMrUHJvOjQwMCw2MDB8TG9yYTo0MDAsNzAwXCJcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0L2Nzc1wiXG4gICAgICAgIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay5taW4uY3NzXCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgdHlwZT1cInRleHQvY3NzXCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NsaWNrLWNhcm91c2VsLzEuNi4wL3NsaWNrLXRoZW1lLm1pbi5jc3NcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly91bnBrZy5jb20vcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzc1wiXG4gICAgICAvPlxuICAgICAgPHRpdGxlPlJlYWN0IEFwcDwvdGl0bGU+XG4gICAgPC9IZWFkPlxuICA8L2Rpdj47XG4iXX0= */\n/*@ sourceURL=components/Head/index.js */"
            }),
            _react2.default.createElement(
              _head2.default,
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 39
                }
              },
              _react2.default.createElement("meta", {
                charset: "utf-8",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 40
                }
              }),
              _react2.default.createElement("meta", {
                name: "viewport",
                content:
                  "width=device-width, initial-scale=1, shrink-to-fit=no",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 41
                }
              }),
              _react2.default.createElement("meta", {
                name: "theme-color",
                content: "#000000",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 45
                }
              }),
              _react2.default.createElement("link", {
                href:
                  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Lora:400,700",
                rel: "stylesheet",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 46
                }
              }),
              _react2.default.createElement("link", {
                rel: "stylesheet",
                type: "text/css",
                href:
                  "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 50
                }
              }),
              _react2.default.createElement("link", {
                rel: "stylesheet",
                type: "text/css",
                href:
                  "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 55
                }
              }),
              _react2.default.createElement("link", {
                rel: "stylesheet",
                href: "https://unpkg.com/react-select/dist/react-select.css",
                "data-jsx": 2035692206,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 60
                }
              }),
              _react2.default.createElement(
                "title",
                {
                  "data-jsx": 2035692206,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                  }
                },
                "React App"
              )
            )
          );
        };

        (function register() {
          /* react-hot-loader/webpack */ if (true) {
            if (typeof __REACT_HOT_LOADER__ === "undefined") {
              return;
            }
            if (typeof module.exports === "function") {
              __REACT_HOT_LOADER__.register(
                module.exports,
                "module.exports",
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js"
              );
              return;
            }
            for (var key in module.exports) {
              if (!Object.prototype.hasOwnProperty.call(module.exports, key)) {
                continue;
              }
              var namedExport = void 0;
              try {
                namedExport = module.exports[key];
              } catch (err) {
                continue;
              }
              __REACT_HOT_LOADER__.register(
                namedExport,
                key,
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js"
              );
            }
          }
        })();

        /***/
      },

      /***/ /***/ 549: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _link = __webpack_require__(541);

        var _link2 = _interopRequireDefault(_link);

        var _Header = __webpack_require__(546);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _jsxFileName =
          "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Header/index.js";

        var Header = function Header() {
          return (
            console.log(_Header.classNames) ||
            _react2.default.createElement(
              "div",
              {
                className: _Header.classNames.header,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 8
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: _Header.classNames.linksContainer,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: _Header.classNames.mainLinks,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 10
                    }
                  },
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "/",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 11
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 11
                        }
                      },
                      "Home"
                    )
                  ),
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "/browse-by-topic",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 12
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 12
                        }
                      },
                      "Browse"
                    )
                  ),
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 13
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 13
                        }
                      },
                      "Exhibitions"
                    )
                  ),
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "/primary-source-sets",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 14
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 14
                        }
                      },
                      "Primary Source Sets"
                    )
                  )
                ),
                _react2.default.createElement("span", {
                  className: _Header.classNames.divider,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                  }
                }),
                _react2.default.createElement(
                  "div",
                  {
                    className: _Header.classNames.secondaryLinks,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 17
                    }
                  },
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 18
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 18
                        }
                      },
                      "About Us"
                    )
                  ),
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 19
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 19
                        }
                      },
                      "News"
                    )
                  ),
                  _react2.default.createElement(
                    _link2.default,
                    {
                      href: "",
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 20
                      }
                    },
                    _react2.default.createElement(
                      "a",
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 20
                        }
                      },
                      "Pro Community"
                    )
                  )
                ),
                _react2.default.createElement(
                  "button",
                  {
                    className: _Header.classNames.login,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 22
                    }
                  },
                  "Log In"
                )
              ),
              _react2.default.createElement("style", {
                dangerouslySetInnerHTML: { __html: _Header.stylesheet },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 24
                }
              })
            )
          );
        };

        exports.default = Header;

        (function register() {
          /* react-hot-loader/webpack */ if (true) {
            if (typeof __REACT_HOT_LOADER__ === "undefined") {
              return;
            }
            if (typeof module.exports === "function") {
              __REACT_HOT_LOADER__.register(
                module.exports,
                "module.exports",
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Header/index.js"
              );
              return;
            }
            for (var key in module.exports) {
              if (!Object.prototype.hasOwnProperty.call(module.exports, key)) {
                continue;
              }
              var namedExport = void 0;
              try {
                namedExport = module.exports[key];
              } catch (err) {
                continue;
              }
              __REACT_HOT_LOADER__.register(
                namedExport,
                key,
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Header/index.js"
              );
            }
          }
        })();

        /***/
      },

      /***/ /***/ 550: function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(542);

        /***/
      }
    },
    [550]
  ));
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzPzVjOGQyZDAiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzcz81YzhkMmQwIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvRm9vdGVyL2luZGV4LmpzPzVjOGQyZDAiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWFkL2luZGV4LmpzPzVjOGQyZDAiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWFkZXIvaW5kZXguanM/NWM4ZDJkMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi9jb21wb25lbnRzL0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb290ZXJcIjtcbmltcG9ydCBIZWFkIGZyb20gXCIuLi9jb21wb25lbnRzL0hlYWRcIjtcblxuY29uc3QgQXBwID0gKCkgPT5cbiAgPGRpdj5cbiAgICA8SGVhZCAvPlxuICAgIDxIZWFkZXIgLz5cbiAgICA8Rm9vdGVyIC8+XG4gIDwvZGl2PjtcbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5IiwibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1wiaGVhZGVyXCI6XCJoZWFkZXItMnpHNEZcIixcImxpbmtzQ29udGFpbmVyXCI6XCJsaW5rc0NvbnRhaW5lci0zZHQ0VVwiLFwibWFpbkxpbmtzXCI6XCJtYWluTGlua3MtMkhJd0FcIixcInNlY29uZGFyeUxpbmtzXCI6XCJzZWNvbmRhcnlMaW5rcy1UcUFvT1wiLFwibG9naW5cIjpcImxvZ2luLUxDeUh4XCIsXCJkaXZpZGVyXCI6XCJkaXZpZGVyLTJOaXlrXCJ9LHN0eWxlc2hlZXQ6IGAuaGVhZGVyLTJ6RzRGe2JhY2tncm91bmQtY29sb3I6IzBhMmEzN30ubGlua3NDb250YWluZXItM2R0NFV7bWFyZ2luOmF1dG87ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjAgNzBweDtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtmb250LXdlaWdodDo2MDA7bGluZS1oZWlnaHQ6MThweDtsaW5lLWhlaWdodDoxLjEyNXJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjExMDBweCl7LmxpbmtzQ29udGFpbmVyLTNkdDRVe21heC13aWR0aDoxMDI0cHg7cGFkZGluZzowfX0ubWFpbkxpbmtzLTJISXdBe21hcmdpbjoxNXB4IDA7Y29sb3I6I2ZmZjtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5Oi1tcy1pbmxpbmUtZmxleGJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS5tYWluTGlua3MtMkhJd0EgYXttYXJnaW4tcmlnaHQ6MTdweH0ubWFpbkxpbmtzLTJISXdBIGE6bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MjFweH0uc2Vjb25kYXJ5TGlua3MtVHFBb097bWFyZ2luOjE1cHggMDtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5Oi1tcy1pbmxpbmUtZmxleGJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjcpO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0uc2Vjb25kYXJ5TGlua3MtVHFBb08gYXttYXJnaW4tcmlnaHQ6MzBweH0uc2Vjb25kYXJ5TGlua3MtVHFBb08gYTpmaXJzdC1jaGlsZHttYXJnaW4tbGVmdDoyMXB4fS5sb2dpbi1MQ3lIeHtjb2xvcjojZmZmO21hcmdpbi1sZWZ0OmF1dG87Y3Vyc29yOnBvaW50ZXI7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTouODc1cmVtO2ZvbnQtd2VpZ2h0OjYwMDtsaW5lLWhlaWdodDoxOHB4O2xpbmUtaGVpZ2h0OjEuMTI1cmVtfS5kaXZpZGVyLTJOaXlre2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoyMHB4O3dpZHRoOjFweDtiYWNrZ3JvdW5kLWNvbG9yOmhzbGEoMCwwJSwxMDAlLC42KX1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gNTQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgRm9vdGVyU3R5bGVzIGZyb20gXCIuL0Zvb3RlclN0eWxlcy5jc3NcIjtcblxuY29uc3QgZHBsYUxvZ28gPSBcInN0YXRpYy9pbWFnZXMvZHBsYS1sb2dvLnN2Z1wiO1xuY29uc3QgZmJJY29uID0gXCJzdGF0aWMvaW1hZ2VzL2ZhY2Vib29rLnN2Z1wiO1xuY29uc3QgaWdJY29uID0gXCJzdGF0aWMvaW1hZ2VzL2luc3RhZ3JhbS5zdmdcIjtcbmNvbnN0IHJzc0ljb24gPSBcInN0YXRpYy9pbWFnZXMvcnNzLnN2Z1wiO1xuY29uc3QgdHVtYmxySWNvbiA9IFwic3RhdGljL2ltYWdlcy90dW1ibHIuc3ZnXCI7XG5cbmNvbnN0IEZvb3RlciA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc0FuZERvbmF0ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc1dyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGlua0hlYWRlclwiPkRQTEE8L2gzPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGk+QWJvdXQgVXM8L2xpPlxuICAgICAgICAgICAgICA8bGk+RkFRPC9saT5cbiAgICAgICAgICAgICAgPGxpPldobyBVc2VzIERQTEE/PC9saT5cbiAgICAgICAgICAgICAgPGxpPlRlcm1zICZhbXA7IENvbmRpdGlvbnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+Q29udGFjdCBVczwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGlua0hlYWRlclwiPlRvb2xzPC9oMz5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpPlNlYXJjaDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5FeGhpYml0aW9uczwvbGk+XG4gICAgICAgICAgICAgIDxsaT4gUHJpbWFyeSBTb3VyY2UgU2V0cyA8L2xpPlxuICAgICAgICAgICAgICA8bGk+QnJvd3NlIGJ5IFRvcGljPC9saT5cbiAgICAgICAgICAgICAgPGxpPkJyb3dzZSBieSBQYXJ0bmVyPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJsaW5rSGVhZGVyXCI+UHJvIENvbW11bml0eTwvaDM+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaT5BYm91dCBEUExBPC9saT5cbiAgICAgICAgICAgICAgPGxpPkh1YnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+UHJvamVjdHM8L2xpPlxuICAgICAgICAgICAgICA8bGk+R2V0IEludm9sdmVkPC9saT5cbiAgICAgICAgICAgICAgPGxpPkVkdWNhdG9yczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5EZXZlbG9wZXJzPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRvbmF0ZUJ1dHRvblwiPkRvbmF0ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb0FuZFNvY2lhbFdyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb0FuZFNvY2lhbFwiPlxuICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImRwbGFMb2dvXCIgYWx0PVwiRFBMQVwiIHNyYz17ZHBsYUxvZ299IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic29jaWFsXCI+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzb2NpYWxCdXR0b25cIiBhbHQ9XCJGYWNlYm9va1wiIHNyYz17ZmJJY29ufSAvPlxuXG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzb2NpYWxCdXR0b25cIiBhbHQ9XCJJbnN0YWdyYW1cIiBzcmM9e2lnSWNvbn0gLz5cblxuICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwic29jaWFsQnV0dG9uXCIgYWx0PVwiUlNTIEZlZWRcIiBzcmM9e3Jzc0ljb259IC8+XG5cbiAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInNvY2lhbEJ1dHRvblwiIGFsdD1cIlR1bWJsclwiIHNyYz17dHVtYmxySWNvbn0gLz5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBqc3g+e0Zvb3RlclN0eWxlc308L3N0eWxlPlxuICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvRm9vdGVyL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PlxuICA8ZGl2PlxuICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICA6cm9vdCB7XG4gICAgICAgIC0tY29sb3ItcmVkOiByZWQ7XG4gICAgICB9XG4gICAgICBib2R5IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBmb250LWZhbWlseTogJ1NvdXJjZSBTYW5zIFBybycsIHNhbnMtc2VyaWY7XG4gICAgICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAgICAgfVxuICAgICAgYnV0dG9uLCBpbnB1dCB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgICAgfVxuICAgICAgYSB7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG4gICAgICBidXR0b24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cbiAgICAgIHVsIHtcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgIH1cbiAgICAgIHAsIHVsLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgfVxuICAgICAgOmdsb2JhbCguc2xpY2stZGlzYWJsZWQpIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gICAgPEhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIiAvPlxuICAgICAgPG1ldGFcbiAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgICAgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBzaHJpbmstdG8tZml0PW5vXCJcbiAgICAgIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzAwMDAwMFwiIC8+XG4gICAgICA8bGlua1xuICAgICAgICBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNvdXJjZStTYW5zK1Bybzo0MDAsNjAwfExvcmE6NDAwLDcwMFwiXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICB0eXBlPVwidGV4dC9jc3NcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2subWluLmNzc1wiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0L2Nzc1wiXG4gICAgICAgIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay10aGVtZS5taW4uY3NzXCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vdW5wa2cuY29tL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3NcIlxuICAgICAgLz5cbiAgICAgIDx0aXRsZT5SZWFjdCBBcHA8L3RpdGxlPlxuICAgIDwvSGVhZD5cbiAgPC9kaXY+O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9IZWFkL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuXG5pbXBvcnQgeyBzdHlsZXNoZWV0LCBjbGFzc05hbWVzIH0gZnJvbSBcIi4vSGVhZGVyLmNzc1wiO1xuXG5jb25zdCBIZWFkZXIgPSAoKSA9PlxuICBjb25zb2xlLmxvZyhjbGFzc05hbWVzKSB8fFxuICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5oZWFkZXJ9PlxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmxpbmtzQ29udGFpbmVyfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLm1haW5MaW5rc30+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+PGE+SG9tZTwvYT48L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvYnJvd3NlLWJ5LXRvcGljXCI+PGE+QnJvd3NlPC9hPjwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIlwiPjxhPkV4aGliaXRpb25zPC9hPjwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9wcmltYXJ5LXNvdXJjZS1zZXRzXCI+PGE+UHJpbWFyeSBTb3VyY2UgU2V0czwvYT48L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5kaXZpZGVyfSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc2Vjb25kYXJ5TGlua3N9PlxuICAgICAgICA8TGluayBocmVmPVwiXCI+PGE+QWJvdXQgVXM8L2E+PC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiXCI+PGE+TmV3czwvYT48L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCJcIj48YT5Qcm8gQ29tbXVuaXR5PC9hPjwvTGluaz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubG9naW59PkxvZyBJbjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0hlYWRlci9pbmRleC5qcyJdLCJtYXBwaW5ncyI6IjtBOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7OztBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0E7QUFBQTtBQUFBO0FBRUE7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFFQTtBQUZBO0FBRUE7O0FBQUE7QUFFQTtBQUZBO0FBRUE7O0FBQUE7QUFFQTtBQUZBO0FBRUE7O0FBQUE7QUFBQTtBQUFBOztBQWpEQTtBQUFBO0FBQUE7QUF5REE7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUE7QUFDQTs7O0FBRUE7QUFDQTs7Ozs7OztBQURBO0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0NBO0FBbENBOztBQWtDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7O0FBR0E7QUFBQTtBQUZBOztBQUFBO0FBSUE7QUFKQTtBQUNBOztBQUdBO0FBQ0E7QUFEQTs7QUFHQTtBQUFBO0FBRkE7O0FBQUE7QUFJQTtBQUpBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7QUFIQTs7QUFBQTtBQUtBO0FBTEE7QUFDQTtBQU1BO0FBQ0E7QUFBQTtBQUhBOztBQUFBO0FBS0E7QUFMQTtBQUNBO0FBTUE7QUFBQTtBQUZBOztBQUFBO0FBSUE7QUFKQTtBQUNBO0FBR0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE1REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
  return { page: comp.default };
});
