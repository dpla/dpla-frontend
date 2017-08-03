window.__NEXT_REGISTER_PAGE("/", function() {
  var comp = (module.exports = webpackJsonp(
    [5],
    {
      /***/ /***/ 541: function(module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */ (function(__resourceQuery) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _react = __webpack_require__(12);

          var _react2 = _interopRequireDefault(_react);

          var _Header = __webpack_require__(548);

          var _Header2 = _interopRequireDefault(_Header);

          var _Footer = __webpack_require__(546);

          var _Footer2 = _interopRequireDefault(_Footer);

          var _Head = __webpack_require__(547);

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

      /***/ /***/ 544: function(module, exports) {
        module.exports = {
          classNames: {
            midnightBlue: "undefined",
            ebonyClayBlue: "undefined",
            white: "undefined",
            bambooOrange: "undefined",
            gray75: "undefined",
            footer: "footer-HJlsB",
            dplaLogo: "dplaLogo-3W_10",
            linksAndDonate: "linksAndDonate-3s8AU",
            links: "links-2qEMo",
            linkHeader: "linkHeader-1Q0Hn",
            logoAndSocialWrapper: "logoAndSocialWrapper-3njEc",
            logoAndSocial: "logoAndSocial-QgMtH",
            social: "social-3fkiL",
            donateButton: "donateButton-3en_i",
            socialButton: "socialButton-1zctd"
          },
          stylesheet: `$red:red;.footer-HJlsB{color:__value__white__2;background-color:__value__ebonyClayBlue__1;padding:55px 0 0}.dplaLogo-3W_10{width:300px}.linksAndDonate-3s8AU{display:-webkit-box;display:-ms-flexbox;display:flex;margin:auto;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;padding:0 70px 57px}@media screen and (min-width:1100px){.linksAndDonate-3s8AU{padding:0 0 57px;max-width:1024px}}.links-2qEMo{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:18px;font-size:1.125rem;line-height:25px;line-height:1.5625rem;color:__value__gray75__4;width:550px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.linkHeader-1Q0Hn{font-weight:600;font-size:20px;font-size:1.25rem;line-height:32px;line-height:2rem;margin-bottom:12px;color:__value__white__2}.logoAndSocialWrapper-3njEc{background-color:__value__midnightBlue__0}.logoAndSocial-QgMtH{margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:33px 57px}@media screen and (min-width:1100px){.logoAndSocial-QgMtH{padding:33px 0;max-width:1024px}}.social-3fkiL{margin-left:auto}.donateButton-3en_i{margin-left:auto;font-weight:600;color:__value__white__2;padding:12px 49px;background-color:__value__bambooOrange__3;border-radius:2px;font-size:18px;font-size:1.125rem;line-height:23px;line-height:1.4375rem}.socialButton-1zctd{width:24px;height:24px;padding-right:17px}.socialButton-1zctd:-last-child{padding:none}`
        };

        /***/
      },

      /***/ /***/ 545: function(module, exports) {
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

      /***/ /***/ 546: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _link = __webpack_require__(540);

        var _Footer = __webpack_require__(544);

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
              className: _Footer.classNames.footer,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 12
              }
            },
            _react2.default.createElement(
              "div",
              {
                className: _Footer.classNames.linksAndDonate,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 13
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: _Footer.classNames.linksWrapper,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: _Footer.classNames.links,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 15
                    }
                  },
                  _react2.default.createElement(
                    "div",
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 16
                      }
                    },
                    _react2.default.createElement(
                      "h3",
                      {
                        className: _Footer.classNames.linkHeader,
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
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 18
                        }
                      },
                      _react2.default.createElement(
                        "li",
                        {
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
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 26
                      }
                    },
                    _react2.default.createElement(
                      "h3",
                      {
                        className: _Footer.classNames.linkHeader,
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
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 28
                        }
                      },
                      _react2.default.createElement(
                        "li",
                        {
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
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 36
                      }
                    },
                    _react2.default.createElement(
                      "h3",
                      {
                        className: _Footer.classNames.linkHeader,
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
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 38
                        }
                      },
                      _react2.default.createElement(
                        "li",
                        {
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
                  className: _Footer.classNames.donateButton,
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
                className: _Footer.classNames.logoAndSocialWrapper,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 51
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: _Footer.classNames.logoAndSocial,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                  }
                },
                _react2.default.createElement("img", {
                  className: _Footer.classNames.dplaLogo,
                  alt: "DPLA",
                  src: dplaLogo,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 53
                  }
                }),
                _react2.default.createElement(
                  "div",
                  {
                    className: _Footer.classNames.social,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 54
                    }
                  },
                  _react2.default.createElement("img", {
                    className: _Footer.classNames.socialButton,
                    alt: "Facebook",
                    src: fbIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 55
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: _Footer.classNames.socialButton,
                    alt: "Instagram",
                    src: igIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 61
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: _Footer.classNames.socialButton,
                    alt: "RSS Feed",
                    src: rssIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 67
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: _Footer.classNames.socialButton,
                    alt: "Tumblr",
                    src: tumblrIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 73
                    }
                  })
                )
              )
            ),
            _react2.default.createElement("style", {
              dangerouslySetInnerHTML: { __html: _Footer.stylesheet },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 82
              }
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

      /***/ /***/ 547: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _style = __webpack_require__(549);

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

      /***/ /***/ 548: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _link = __webpack_require__(540);

        var _link2 = _interopRequireDefault(_link);

        var _Header = __webpack_require__(545);

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
        module.exports = __webpack_require__(541);

        /***/
      }
    },
    [550]
  ));
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzPzIyN2Y0YWEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmNzcz8yMjdmNGFhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3M/MjI3ZjRhYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Zvb3Rlci9pbmRleC5qcz8yMjdmNGFhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZC9pbmRleC5qcz8yMjdmNGFhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZGVyL2luZGV4LmpzPzIyN2Y0YWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9vdGVyXCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwiLi4vY29tcG9uZW50cy9IZWFkXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+XG4gIDxkaXY+XG4gICAgPEhlYWQgLz5cbiAgICA8SGVhZGVyIC8+XG4gICAgPEZvb3RlciAvPlxuICA8L2Rpdj47XG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsIm1vZHVsZS5leHBvcnRzID0ge2NsYXNzTmFtZXM6IHtcIm1pZG5pZ2h0Qmx1ZVwiOlwidW5kZWZpbmVkXCIsXCJlYm9ueUNsYXlCbHVlXCI6XCJ1bmRlZmluZWRcIixcIndoaXRlXCI6XCJ1bmRlZmluZWRcIixcImJhbWJvb09yYW5nZVwiOlwidW5kZWZpbmVkXCIsXCJncmF5NzVcIjpcInVuZGVmaW5lZFwiLFwiZm9vdGVyXCI6XCJmb290ZXItSEpsc0JcIixcImRwbGFMb2dvXCI6XCJkcGxhTG9nby0zV18xMFwiLFwibGlua3NBbmREb25hdGVcIjpcImxpbmtzQW5kRG9uYXRlLTNzOEFVXCIsXCJsaW5rc1wiOlwibGlua3MtMnFFTW9cIixcImxpbmtIZWFkZXJcIjpcImxpbmtIZWFkZXItMVEwSG5cIixcImxvZ29BbmRTb2NpYWxXcmFwcGVyXCI6XCJsb2dvQW5kU29jaWFsV3JhcHBlci0zbmpFY1wiLFwibG9nb0FuZFNvY2lhbFwiOlwibG9nb0FuZFNvY2lhbC1RZ010SFwiLFwic29jaWFsXCI6XCJzb2NpYWwtM2ZraUxcIixcImRvbmF0ZUJ1dHRvblwiOlwiZG9uYXRlQnV0dG9uLTNlbl9pXCIsXCJzb2NpYWxCdXR0b25cIjpcInNvY2lhbEJ1dHRvbi0xemN0ZFwifSxzdHlsZXNoZWV0OiBgJHJlZDpyZWQ7LmZvb3Rlci1ISmxzQntjb2xvcjpfX3ZhbHVlX193aGl0ZV9fMjtiYWNrZ3JvdW5kLWNvbG9yOl9fdmFsdWVfX2Vib255Q2xheUJsdWVfXzE7cGFkZGluZzo1NXB4IDAgMH0uZHBsYUxvZ28tM1dfMTB7d2lkdGg6MzAwcHh9LmxpbmtzQW5kRG9uYXRlLTNzOEFVe2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7bWFyZ2luOmF1dG87LXdlYmtpdC1ib3gtYWxpZ246YmFzZWxpbmU7LW1zLWZsZXgtYWxpZ246YmFzZWxpbmU7YWxpZ24taXRlbXM6YmFzZWxpbmU7cGFkZGluZzowIDcwcHggNTdweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjExMDBweCl7LmxpbmtzQW5kRG9uYXRlLTNzOEFVe3BhZGRpbmc6MCAwIDU3cHg7bWF4LXdpZHRoOjEwMjRweH19LmxpbmtzLTJxRU1ve2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtO2xpbmUtaGVpZ2h0OjI1cHg7bGluZS1oZWlnaHQ6MS41NjI1cmVtO2NvbG9yOl9fdmFsdWVfX2dyYXk3NV9fNDt3aWR0aDo1NTBweDstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5saW5rSGVhZGVyLTFRMEhue2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MjBweDtmb250LXNpemU6MS4yNXJlbTtsaW5lLWhlaWdodDozMnB4O2xpbmUtaGVpZ2h0OjJyZW07bWFyZ2luLWJvdHRvbToxMnB4O2NvbG9yOl9fdmFsdWVfX3doaXRlX18yfS5sb2dvQW5kU29jaWFsV3JhcHBlci0zbmpFY3tiYWNrZ3JvdW5kLWNvbG9yOl9fdmFsdWVfX21pZG5pZ2h0Qmx1ZV9fMH0ubG9nb0FuZFNvY2lhbC1RZ010SHttYXJnaW46YXV0bztkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzozM3B4IDU3cHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDoxMTAwcHgpey5sb2dvQW5kU29jaWFsLVFnTXRIe3BhZGRpbmc6MzNweCAwO21heC13aWR0aDoxMDI0cHh9fS5zb2NpYWwtM2ZraUx7bWFyZ2luLWxlZnQ6YXV0b30uZG9uYXRlQnV0dG9uLTNlbl9pe21hcmdpbi1sZWZ0OmF1dG87Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOl9fdmFsdWVfX3doaXRlX18yO3BhZGRpbmc6MTJweCA0OXB4O2JhY2tncm91bmQtY29sb3I6X192YWx1ZV9fYmFtYm9vT3JhbmdlX18zO2JvcmRlci1yYWRpdXM6MnB4O2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbTtsaW5lLWhlaWdodDoyM3B4O2xpbmUtaGVpZ2h0OjEuNDM3NXJlbX0uc29jaWFsQnV0dG9uLTF6Y3Rke3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7cGFkZGluZy1yaWdodDoxN3B4fS5zb2NpYWxCdXR0b24tMXpjdGQ6LWxhc3QtY2hpbGR7cGFkZGluZzpub25lfWB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSA1NDRcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1wiaGVhZGVyXCI6XCJoZWFkZXItMnpHNEZcIixcImxpbmtzQ29udGFpbmVyXCI6XCJsaW5rc0NvbnRhaW5lci0zZHQ0VVwiLFwibWFpbkxpbmtzXCI6XCJtYWluTGlua3MtMkhJd0FcIixcInNlY29uZGFyeUxpbmtzXCI6XCJzZWNvbmRhcnlMaW5rcy1UcUFvT1wiLFwibG9naW5cIjpcImxvZ2luLUxDeUh4XCIsXCJkaXZpZGVyXCI6XCJkaXZpZGVyLTJOaXlrXCJ9LHN0eWxlc2hlZXQ6IGAuaGVhZGVyLTJ6RzRGe2JhY2tncm91bmQtY29sb3I6IzBhMmEzN30ubGlua3NDb250YWluZXItM2R0NFV7bWFyZ2luOmF1dG87ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjAgNzBweDtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtmb250LXdlaWdodDo2MDA7bGluZS1oZWlnaHQ6MThweDtsaW5lLWhlaWdodDoxLjEyNXJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjExMDBweCl7LmxpbmtzQ29udGFpbmVyLTNkdDRVe21heC13aWR0aDoxMDI0cHg7cGFkZGluZzowfX0ubWFpbkxpbmtzLTJISXdBe21hcmdpbjoxNXB4IDA7Y29sb3I6I2ZmZjtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5Oi1tcy1pbmxpbmUtZmxleGJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS5tYWluTGlua3MtMkhJd0EgYXttYXJnaW4tcmlnaHQ6MTdweH0ubWFpbkxpbmtzLTJISXdBIGE6bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MjFweH0uc2Vjb25kYXJ5TGlua3MtVHFBb097bWFyZ2luOjE1cHggMDtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5Oi1tcy1pbmxpbmUtZmxleGJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjcpO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0uc2Vjb25kYXJ5TGlua3MtVHFBb08gYXttYXJnaW4tcmlnaHQ6MzBweH0uc2Vjb25kYXJ5TGlua3MtVHFBb08gYTpmaXJzdC1jaGlsZHttYXJnaW4tbGVmdDoyMXB4fS5sb2dpbi1MQ3lIeHtjb2xvcjojZmZmO21hcmdpbi1sZWZ0OmF1dG87Y3Vyc29yOnBvaW50ZXI7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTouODc1cmVtO2ZvbnQtd2VpZ2h0OjYwMDtsaW5lLWhlaWdodDoxOHB4O2xpbmUtaGVpZ2h0OjEuMTI1cmVtfS5kaXZpZGVyLTJOaXlre2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoyMHB4O3dpZHRoOjFweDtiYWNrZ3JvdW5kLWNvbG9yOmhzbGEoMCwwJSwxMDAlLC42KX1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gNTQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzLCBzdHlsZXNoZWV0IH0gZnJvbSBcIi4vRm9vdGVyLmNzc1wiO1xuXG5jb25zdCBkcGxhTG9nbyA9IFwic3RhdGljL2ltYWdlcy9kcGxhLWxvZ28uc3ZnXCI7XG5jb25zdCBmYkljb24gPSBcInN0YXRpYy9pbWFnZXMvZmFjZWJvb2suc3ZnXCI7XG5jb25zdCBpZ0ljb24gPSBcInN0YXRpYy9pbWFnZXMvaW5zdGFncmFtLnN2Z1wiO1xuY29uc3QgcnNzSWNvbiA9IFwic3RhdGljL2ltYWdlcy9yc3Muc3ZnXCI7XG5jb25zdCB0dW1ibHJJY29uID0gXCJzdGF0aWMvaW1hZ2VzL3R1bWJsci5zdmdcIjtcblxuY29uc3QgRm9vdGVyID0gKCkgPT5cbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuZm9vdGVyfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rc0FuZERvbmF0ZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rc1dyYXBwZXJ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rc30+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua0hlYWRlcn0+RFBMQTwvaDM+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaT5BYm91dCBVczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5GQVE8L2xpPlxuICAgICAgICAgICAgICA8bGk+V2hvIFVzZXMgRFBMQT88L2xpPlxuICAgICAgICAgICAgICA8bGk+VGVybXMgJmFtcDsgQ29uZGl0aW9uczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5Db250YWN0IFVzPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua0hlYWRlcn0+VG9vbHM8L2gzPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGk+U2VhcmNoPC9saT5cbiAgICAgICAgICAgICAgPGxpPkV4aGliaXRpb25zPC9saT5cbiAgICAgICAgICAgICAgPGxpPiBQcmltYXJ5IFNvdXJjZSBTZXRzIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5Ccm93c2UgYnkgVG9waWM8L2xpPlxuICAgICAgICAgICAgICA8bGk+QnJvd3NlIGJ5IFBhcnRuZXI8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rSGVhZGVyfT5Qcm8gQ29tbXVuaXR5PC9oMz5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpPkFib3V0IERQTEE8L2xpPlxuICAgICAgICAgICAgICA8bGk+SHViczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5Qcm9qZWN0czwvbGk+XG4gICAgICAgICAgICAgIDxsaT5HZXQgSW52b2x2ZWQ8L2xpPlxuICAgICAgICAgICAgICA8bGk+RWR1Y2F0b3JzPC9saT5cbiAgICAgICAgICAgICAgPGxpPkRldmVsb3BlcnM8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtjbGFzc05hbWVzLmRvbmF0ZUJ1dHRvbn0+RG9uYXRlPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubG9nb0FuZFNvY2lhbFdyYXBwZXJ9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubG9nb0FuZFNvY2lhbH0+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmRwbGFMb2dvfSBhbHQ9XCJEUExBXCIgc3JjPXtkcGxhTG9nb30gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc29jaWFsfT5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc29jaWFsQnV0dG9ufVxuICAgICAgICAgICAgYWx0PVwiRmFjZWJvb2tcIlxuICAgICAgICAgICAgc3JjPXtmYkljb259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zb2NpYWxCdXR0b259XG4gICAgICAgICAgICBhbHQ9XCJJbnN0YWdyYW1cIlxuICAgICAgICAgICAgc3JjPXtpZ0ljb259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zb2NpYWxCdXR0b259XG4gICAgICAgICAgICBhbHQ9XCJSU1MgRmVlZFwiXG4gICAgICAgICAgICBzcmM9e3Jzc0ljb259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zb2NpYWxCdXR0b259XG4gICAgICAgICAgICBhbHQ9XCJUdW1ibHJcIlxuICAgICAgICAgICAgc3JjPXt0dW1ibHJJY29ufVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZXNoZWV0IH19IC8+XG4gIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9Gb290ZXIvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+XG4gIDxkaXY+XG4gICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgIDpyb290IHtcbiAgICAgICAgLS1jb2xvci1yZWQ6IHJlZDtcbiAgICAgIH1cbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjtcbiAgICAgICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgICB9XG4gICAgICBidXR0b24sIGlucHV0IHtcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgICB9XG4gICAgICBhIHtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuICAgICAgdWwge1xuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgfVxuICAgICAgcCwgdWwsIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICB9XG4gICAgICA6Z2xvYmFsKC5zbGljay1kaXNhYmxlZCkge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgICA8SGVhZD5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICA8bWV0YVxuICAgICAgICBuYW1lPVwidmlld3BvcnRcIlxuICAgICAgICBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEsIHNocmluay10by1maXQ9bm9cIlxuICAgICAgLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjMDAwMDAwXCIgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U291cmNlK1NhbnMrUHJvOjQwMCw2MDB8TG9yYTo0MDAsNzAwXCJcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0L2Nzc1wiXG4gICAgICAgIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay5taW4uY3NzXCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgdHlwZT1cInRleHQvY3NzXCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NsaWNrLWNhcm91c2VsLzEuNi4wL3NsaWNrLXRoZW1lLm1pbi5jc3NcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly91bnBrZy5jb20vcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzc1wiXG4gICAgICAvPlxuICAgICAgPHRpdGxlPlJlYWN0IEFwcDwvdGl0bGU+XG4gICAgPC9IZWFkPlxuICA8L2Rpdj47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0hlYWQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmltcG9ydCB7IHN0eWxlc2hlZXQsIGNsYXNzTmFtZXMgfSBmcm9tIFwiLi9IZWFkZXIuY3NzXCI7XG5cbmNvbnN0IEhlYWRlciA9ICgpID0+XG4gIGNvbnNvbGUubG9nKGNsYXNzTmFtZXMpIHx8XG4gIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmhlYWRlcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua3NDb250YWluZXJ9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubWFpbkxpbmtzfT5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9cIj48YT5Ib21lPC9hPjwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9icm93c2UtYnktdG9waWNcIj48YT5Ccm93c2U8L2E+PC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiXCI+PGE+RXhoaWJpdGlvbnM8L2E+PC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiL3ByaW1hcnktc291cmNlLXNldHNcIj48YT5QcmltYXJ5IFNvdXJjZSBTZXRzPC9hPjwvTGluaz5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzLmRpdmlkZXJ9IC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zZWNvbmRhcnlMaW5rc30+XG4gICAgICAgIDxMaW5rIGhyZWY9XCJcIj48YT5BYm91dCBVczwvYT48L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCJcIj48YT5OZXdzPC9hPjwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIlwiPjxhPlBybyBDb21tdW5pdHk8L2E+PC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5sb2dpbn0+TG9nIEluPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3R5bGVzaGVldCB9fSAvPlxuICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvSGVhZGVyL2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiO0E7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTs7QUFFQTtBQUVBO0FBQUE7O0FBSEE7QUFNQTtBQU5BO0FBQ0E7QUFNQTtBQUVBO0FBQUE7O0FBSEE7QUFNQTtBQU5BO0FBQ0E7QUFNQTtBQUVBO0FBQUE7O0FBSEE7QUFNQTtBQU5BO0FBQ0E7QUFNQTtBQUVBO0FBQUE7O0FBSEE7QUFTQTtBQVRBO0FBQ0E7QUFRQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTs7O0FBRUE7QUFDQTs7Ozs7OztBQURBO0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0NBO0FBbENBOztBQWtDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7O0FBR0E7QUFBQTtBQUZBOztBQUFBO0FBSUE7QUFKQTtBQUNBOztBQUdBO0FBQ0E7QUFEQTs7QUFHQTtBQUFBO0FBRkE7O0FBQUE7QUFJQTtBQUpBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7QUFIQTs7QUFBQTtBQUtBO0FBTEE7QUFDQTtBQU1BO0FBQ0E7QUFBQTtBQUhBOztBQUFBO0FBS0E7QUFMQTtBQUNBO0FBTUE7QUFBQTtBQUZBOztBQUFBO0FBSUE7QUFKQTtBQUNBO0FBR0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE1REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
  return { page: comp.default };
});
