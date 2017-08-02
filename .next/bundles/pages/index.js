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
        (function() {
          "use strict";
          var __styledJsxDefaultExport = new String(
            ".header{background-color:#0A2A37}.linksContainer{margin:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 70px;font-size:0.875rem;font-weight:600;line-height:1.125rem}@media screen and (min-width:1100px){.linksContainer{max-width:1024px;padding:0}}.mainLinks{margin:15px 0;color:#FFFFFF;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between;-webkit-text-transform:uppercase;text-transform:uppercase}.mainLinks a{margin-right:17px}.mainLinks a:last-child{margin-right:21px}.secondaryLinks{margin:15px 0;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between;color:rgba(255, 255, 255, 0.7);-webkit-text-transform:uppercase;text-transform:uppercase}.secondaryLinks a{margin-right:30px}.secondaryLinks a:first-child{margin-left:21px}.login{color:#FFFFFF;margin-left:auto;cursor:pointer;-webkit-text-transform:uppercase;text-transform:uppercase;font-size:0.875rem;font-weight:600;line-height:1.125rem}.divider{display:inline-block;height:20px;width:1px;background-color:rgba(255, 255, 255, 0.6)}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFFNEIsQUFFYixBQUdPLEFBRUwsQUFFSSxBQUVBLEFBRUosQUFFSSxBQUVELEFBRUgsQUFFTyxhQW5CTyxFQUtHLEFBTU0sQUFNSCxHQWRBLEFBWWhCLENBUkMsQUFFQSxBQUlBLEdBTWlCLElBckJWLEdBS1csQ0FFaUIsR0FZRixFQUVILFdBQTZDLEdBRmQsd0NBRWUsRUFuQjdDLGtCQWlCb0QsWUFOaEMsUUFNbUQsT0FabEMsVUFZMEQsc0JBQUMsb0JBakI5RSxnQkFBc0Isb0JBQW1CLGlCQUF3QixXQVc3QixXQVg4QixJQUtuQixpQkFNaUIsMkNBTmhCLGlCQU1pQiIsImZpbGUiOiJjb21wb25lbnRzL0hlYWRlci9IZWFkZXIuY3NzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9mcmFua2llc2ltbXMvRGVza3RvcC9kcGxhLWVuZHVzZXItc2l0ZSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwQTJBMzc7XFxufVxcblxcbi5saW5rc0NvbnRhaW5lciB7XFxuICBtYXJnaW46IGF1dG87XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgNzBweDtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5saW5rc0NvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogMTAyNHB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgfVxcbn1cXG5cXG4ubWFpbkxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgY29sb3I6ICNGRkZGRkY7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5tYWluTGlua3MgYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDE3cHg7XFxufVxcblxcbi5tYWluTGlua3MgYTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMjFweDtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIGEge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2Vjb25kYXJ5TGlua3MgYTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tbGVmdDogMjFweDtcXG59XFxuXFxuLmxvZ2luIHtcXG4gIGNvbG9yOiAjRkZGRkZGO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMS4xMjVyZW07XFxufVxcblxcbi5kaXZpZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxufVxcblwiIl19 */\n/*@ sourceURL=components/Header/Header.css */"
          );

          __styledJsxDefaultExport.__hash = "13644796197";
          __styledJsxDefaultExport.__scoped =
            '.header[data-jsx-ext~="23644796197"]{background-color:#0A2A37}.linksContainer[data-jsx-ext~="23644796197"]{margin:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 70px;font-size:0.875rem;font-weight:600;line-height:1.125rem}@media screen and (min-width:1100px){.linksContainer[data-jsx-ext~="23644796197"]{max-width:1024px;padding:0}}.mainLinks[data-jsx-ext~="23644796197"]{margin:15px 0;color:#FFFFFF;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between;-webkit-text-transform:uppercase;text-transform:uppercase}.mainLinks[data-jsx-ext~="23644796197"] a[data-jsx-ext~="23644796197"]{margin-right:17px}.mainLinks[data-jsx-ext~="23644796197"] a[data-jsx-ext~="23644796197"]:last-child{margin-right:21px}.secondaryLinks[data-jsx-ext~="23644796197"]{margin:15px 0;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between;color:rgba(255, 255, 255, 0.7);-webkit-text-transform:uppercase;text-transform:uppercase}.secondaryLinks[data-jsx-ext~="23644796197"] a[data-jsx-ext~="23644796197"]{margin-right:30px}.secondaryLinks[data-jsx-ext~="23644796197"] a[data-jsx-ext~="23644796197"]:first-child{margin-left:21px}.login[data-jsx-ext~="23644796197"]{color:#FFFFFF;margin-left:auto;cursor:pointer;-webkit-text-transform:uppercase;text-transform:uppercase;font-size:0.875rem;font-weight:600;line-height:1.125rem}.divider[data-jsx-ext~="23644796197"]{display:inline-block;height:20px;width:1px;background-color:rgba(255, 255, 255, 0.6)}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFFNEIsQUFFYixBQUdPLEFBRUwsQUFFSSxBQUVBLEFBRUosQUFFSSxBQUVELEFBRUgsQUFFTyxhQW5CTyxFQUtHLEFBTU0sQUFNSCxHQWRBLEFBWWhCLENBUkMsQUFFQSxBQUlBLEdBTWlCLElBckJWLEdBS1csQ0FFaUIsR0FZRixFQUVILFdBQTZDLEdBRmQsd0NBRWUsRUFuQjdDLGtCQWlCb0QsWUFOaEMsUUFNbUQsT0FabEMsVUFZMEQsc0JBQUMsb0JBakI5RSxnQkFBc0Isb0JBQW1CLGlCQUF3QixXQVc3QixXQVg4QixJQUtuQixpQkFNaUIsMkNBTmhCLGlCQU1pQiIsImZpbGUiOiJjb21wb25lbnRzL0hlYWRlci9IZWFkZXIuY3NzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9mcmFua2llc2ltbXMvRGVza3RvcC9kcGxhLWVuZHVzZXItc2l0ZSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwQTJBMzc7XFxufVxcblxcbi5saW5rc0NvbnRhaW5lciB7XFxuICBtYXJnaW46IGF1dG87XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgNzBweDtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5saW5rc0NvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogMTAyNHB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgfVxcbn1cXG5cXG4ubWFpbkxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgY29sb3I6ICNGRkZGRkY7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5tYWluTGlua3MgYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDE3cHg7XFxufVxcblxcbi5tYWluTGlua3MgYTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMjFweDtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIGEge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2Vjb25kYXJ5TGlua3MgYTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tbGVmdDogMjFweDtcXG59XFxuXFxuLmxvZ2luIHtcXG4gIGNvbG9yOiAjRkZGRkZGO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMS4xMjVyZW07XFxufVxcblxcbi5kaXZpZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxufVxcblwiIl19 */\n/*@ sourceURL=components/Header/Header.css */';
          __styledJsxDefaultExport.__scopedHash = "23644796197";
          module.exports = __styledJsxDefaultExport;
        })();

        /***/
      },

      /***/ /***/ 545: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _jsxFileName =
          "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/FooterStyles.js";

        var FooterStyles = function FooterStyles() {
          return _react2.default.createElement(
            "style",
            {
              jsx: true,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 4
              }
            },
            "\n    .footer {\n      color: white;\n      background-color: blue;\n      padding: 55px 0 0 0;\n    }\n    .dplaLogo {\n      width: 300px;\n    }\n    .linksAndDonate {\n      display: flex;\n      margin: auto;\n      align-items: baseline;\n      padding: 0 70px 57px;\n    }\n    @media screen and (min-width: 1100px) {\n      .linksAndDonate {\n        padding: 0 0 57px;\n        max-width: 1024px;\n      }\n    }\n    .links {\n      display: flex;\n      font-size: 1.125rem;\n      line-height: 1.5625rem;\n      color: gray75;\n      width: 550px;\n      justify-content: space-between;\n    }\n    .linkHeader {\n      font-weight: 600;\n      font-size: 1.25rem;\n      line-height: 2rem;\n      margin-bottom: 12px;\n      color: white;\n\n    .logoAndSocialWrapper {\n      background-color: midnightBlue;\n\n    .logoAndSocial {\n      margin: auto;\n      display: flex;\n      justify-content: space-between;\n      padding: 33px 57px;\n\n    @media screen and (min-width: 1100px) {\n      .logoAndSocial {\n        padding: 33px 0;\n        max-width: 1024px;\n      }\n    }\n    .social {\n      margin-left: auto;\n    }\n    .donateButton {\n      margin-left: auto;\n      font-weight: 600;\n      color: white;\n      padding: 12px 49px;\n      background-color: bambooOrange;\n      border-radius: 2px;\n      font-size: 1.125rem;\n      line-height: 1.4375rem;\n    }\n    .socialButton {\n      width: 24px;\n      height: 24px;\n      padding-right: 17px;\n    }\n    .socialButton:-last-child {\n      padding: none;\n    }\n  "
          );
        };

        exports.default = FooterStyles;

        (function register() {
          /* react-hot-loader/webpack */ if (true) {
            if (typeof __REACT_HOT_LOADER__ === "undefined") {
              return;
            }
            if (typeof module.exports === "function") {
              __REACT_HOT_LOADER__.register(
                module.exports,
                "module.exports",
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/FooterStyles.js"
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
                "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/FooterStyles.js"
              );
            }
          }
        })();

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

        var _FooterStyles = __webpack_require__(545);

        var _FooterStyles2 = _interopRequireDefault(_FooterStyles);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _jsxFileName =
          "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/index.js";

        var dplaLogo = "http://lorempixel.com/40/40/food";
        var fbIcon = "http://lorempixel.com/40/40/food";
        var igIcon = "http://lorempixel.com/40/40/food";
        var rssIcon = "http://lorempixel.com/40/40/food";
        var tumblrIcon = "http://lorempixel.com/40/40/food";

        var Footer = function Footer() {
          return _react2.default.createElement(
            "div",
            {
              className: "header",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 12
              }
            },
            _react2.default.createElement(
              "div",
              {
                className: "linksAndDonate",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 13
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "linksWrapper",
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: "links",
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
                        className: "linkHeader",
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
                        className: "linkHeader",
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
                        className: "linkHeader",
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
                  className: "donateButton",
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
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 51
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "logoAndSocial",
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                  }
                },
                _react2.default.createElement("img", {
                  className: "dplaLogo",
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
                    className: "social",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 54
                    }
                  },
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "Facebook",
                    src: fbIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 55
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "Instagram",
                    src: igIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 57
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "RSS Feed",
                    src: rssIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 59
                    }
                  }),
                  _react2.default.createElement("img", {
                    className: "socialButton",
                    alt: "Tumblr",
                    src: tumblrIcon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 61
                    }
                  })
                )
              )
            ),
            _react2.default.createElement(_FooterStyles2.default, {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 66
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
            _head2.default,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 5
              }
            },
            _react2.default.createElement("meta", {
              charset: "utf-8",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 6
              }
            }),
            _react2.default.createElement("meta", {
              name: "viewport",
              content: "width=device-width, initial-scale=1, shrink-to-fit=no",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 7
              }
            }),
            _react2.default.createElement("meta", {
              name: "theme-color",
              content: "#000000",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 11
              }
            }),
            _react2.default.createElement("link", {
              href:
                "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Lora:400,700",
              rel: "stylesheet",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 12
              }
            }),
            _react2.default.createElement("link", {
              rel: "stylesheet",
              type: "text/css",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 16
              }
            }),
            _react2.default.createElement("link", {
              rel: "stylesheet",
              type: "text/css",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 21
              }
            }),
            _react2.default.createElement("link", {
              rel: "stylesheet",
              href: "https://unpkg.com/react-select/dist/react-select.css",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              }
            }),
            _react2.default.createElement(
              "title",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
                }
              },
              "React App"
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

        var _style = __webpack_require__(550);

        var _style2 = _interopRequireDefault(_style);

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _link = __webpack_require__(540);

        var _link2 = _interopRequireDefault(_link);

        var _Header = __webpack_require__(544);

        var _Header2 = _interopRequireDefault(_Header);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        var _jsxFileName =
          "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Header/index.js";

        var Header = function Header() {
          return _react2.default.createElement(
            "div",
            {
              className: "header",
              "data-jsx-ext": _Header2.default.__scopedHash,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 7
              }
            },
            _react2.default.createElement(
              "div",
              {
                className: _Header2.default.linksContainer,
                "data-jsx-ext": _Header2.default.__scopedHash,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 8
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: _Header2.default.mainLinks,
                  "data-jsx-ext": _Header2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                  }
                },
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "/",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 10
                    }
                  },
                  "Home"
                ),
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "/browse-by-topic",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 11
                    }
                  },
                  "Browse"
                ),
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 12
                    }
                  },
                  "Exhibitions"
                ),
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "/primary-source-sets",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 13
                    }
                  },
                  "Primary Source Sets"
                )
              ),
              _react2.default.createElement("span", {
                className: _Header2.default.divider,
                "data-jsx-ext": _Header2.default.__scopedHash,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 15
                }
              }),
              _react2.default.createElement(
                "div",
                {
                  className: _Header2.default.secondaryLinks,
                  "data-jsx-ext": _Header2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                  }
                },
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 17
                    }
                  },
                  "About Us"
                ),
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 18
                    }
                  },
                  "News"
                ),
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 19
                    }
                  },
                  "Pro Community"
                )
              ),
              _react2.default.createElement(
                "button",
                {
                  className: _Header2.default.login,
                  "data-jsx-ext": _Header2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                  }
                },
                "Log In"
              )
            ),
            _react2.default.createElement(_style2.default, {
              styleId: _Header2.default.__scopedHash,
              css: _Header2.default.__scoped
            })
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

      /***/ /***/ 549: function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(541);

        /***/
      }
    },
    [549]
  ));
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzP2JhNDk2ODMiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3M/YmE0OTY4MyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXJTdHlsZXMuanM/YmE0OTY4MyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Zvb3Rlci9pbmRleC5qcz9iYTQ5NjgzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZC9pbmRleC5qcz9iYTQ5NjgzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZGVyL2luZGV4LmpzP2JhNDk2ODMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9vdGVyXCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwiLi4vY29tcG9uZW50cy9IZWFkXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+XG4gIDxkaXY+XG4gICAgPEhlYWQgLz5cbiAgICA8SGVhZGVyIC8+XG4gICAgPEZvb3RlciAvPlxuICA8L2Rpdj47XG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsIm1vZHVsZS5leHBvcnRzID0gXCIuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwQTJBMzc7XFxufVxcblxcbi5saW5rc0NvbnRhaW5lciB7XFxuICBtYXJnaW46IGF1dG87XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgNzBweDtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5saW5rc0NvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogMTAyNHB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgfVxcbn1cXG5cXG4ubWFpbkxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgY29sb3I6ICNGRkZGRkY7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5tYWluTGlua3MgYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDE3cHg7XFxufVxcblxcbi5tYWluTGlua3MgYTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMjFweDtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIGEge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2Vjb25kYXJ5TGlua3MgYTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tbGVmdDogMjFweDtcXG59XFxuXFxuLmxvZ2luIHtcXG4gIGNvbG9yOiAjRkZGRkZGO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMS4xMjVyZW07XFxufVxcblxcbi5kaXZpZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxufVxcblwiXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3MiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IEZvb3RlclN0eWxlcyA9ICgpID0+XG4gIDxzdHlsZSBqc3g+e2BcbiAgICAuZm9vdGVyIHtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG4gICAgICBwYWRkaW5nOiA1NXB4IDAgMCAwO1xuICAgIH1cbiAgICAuZHBsYUxvZ28ge1xuICAgICAgd2lkdGg6IDMwMHB4O1xuICAgIH1cbiAgICAubGlua3NBbmREb25hdGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgICAgIHBhZGRpbmc6IDAgNzBweCA1N3B4O1xuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcbiAgICAgIC5saW5rc0FuZERvbmF0ZSB7XG4gICAgICAgIHBhZGRpbmc6IDAgMCA1N3B4O1xuICAgICAgICBtYXgtd2lkdGg6IDEwMjRweDtcbiAgICAgIH1cbiAgICB9XG4gICAgLmxpbmtzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTYyNXJlbTtcbiAgICAgIGNvbG9yOiBncmF5NzU7XG4gICAgICB3aWR0aDogNTUwcHg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgfVxuICAgIC5saW5rSGVhZGVyIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBjb2xvcjogd2hpdGU7XG5cbiAgICAubG9nb0FuZFNvY2lhbFdyYXBwZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWlkbmlnaHRCbHVlO1xuXG4gICAgLmxvZ29BbmRTb2NpYWwge1xuICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIHBhZGRpbmc6IDMzcHggNTdweDtcblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xuICAgICAgLmxvZ29BbmRTb2NpYWwge1xuICAgICAgICBwYWRkaW5nOiAzM3B4IDA7XG4gICAgICAgIG1heC13aWR0aDogMTAyNHB4O1xuICAgICAgfVxuICAgIH1cbiAgICAuc29jaWFsIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIH1cbiAgICAuZG9uYXRlQnV0dG9uIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDEycHggNDlweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGJhbWJvb09yYW5nZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS40Mzc1cmVtO1xuICAgIH1cbiAgICAuc29jaWFsQnV0dG9uIHtcbiAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgcGFkZGluZy1yaWdodDogMTdweDtcbiAgICB9XG4gICAgLnNvY2lhbEJ1dHRvbjotbGFzdC1jaGlsZCB7XG4gICAgICBwYWRkaW5nOiBub25lO1xuICAgIH1cbiAgYH08L3N0eWxlPjtcblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyU3R5bGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyU3R5bGVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCBGb290ZXJTdHlsZXMgZnJvbSBcIi4vRm9vdGVyU3R5bGVzXCI7XG5cbmNvbnN0IGRwbGFMb2dvID0gXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAvNDAvZm9vZFwiO1xuY29uc3QgZmJJY29uID0gXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAvNDAvZm9vZFwiO1xuY29uc3QgaWdJY29uID0gXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAvNDAvZm9vZFwiO1xuY29uc3QgcnNzSWNvbiA9IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwLzQwL2Zvb2RcIjtcbmNvbnN0IHR1bWJsckljb24gPSBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MC80MC9mb29kXCI7XG5cbmNvbnN0IEZvb3RlciA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc0FuZERvbmF0ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc1dyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGlua0hlYWRlclwiPkRQTEE8L2gzPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGk+QWJvdXQgVXM8L2xpPlxuICAgICAgICAgICAgICA8bGk+RkFRPC9saT5cbiAgICAgICAgICAgICAgPGxpPldobyBVc2VzIERQTEE/PC9saT5cbiAgICAgICAgICAgICAgPGxpPlRlcm1zICZhbXA7IENvbmRpdGlvbnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+Q29udGFjdCBVczwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGlua0hlYWRlclwiPlRvb2xzPC9oMz5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpPlNlYXJjaDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5FeGhpYml0aW9uczwvbGk+XG4gICAgICAgICAgICAgIDxsaT4gUHJpbWFyeSBTb3VyY2UgU2V0cyA8L2xpPlxuICAgICAgICAgICAgICA8bGk+QnJvd3NlIGJ5IFRvcGljPC9saT5cbiAgICAgICAgICAgICAgPGxpPkJyb3dzZSBieSBQYXJ0bmVyPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJsaW5rSGVhZGVyXCI+UHJvIENvbW11bml0eTwvaDM+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaT5BYm91dCBEUExBPC9saT5cbiAgICAgICAgICAgICAgPGxpPkh1YnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+UHJvamVjdHM8L2xpPlxuICAgICAgICAgICAgICA8bGk+R2V0IEludm9sdmVkPC9saT5cbiAgICAgICAgICAgICAgPGxpPkVkdWNhdG9yczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5EZXZlbG9wZXJzPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRvbmF0ZUJ1dHRvblwiPkRvbmF0ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb0FuZFNvY2lhbFdyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb0FuZFNvY2lhbFwiPlxuICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImRwbGFMb2dvXCIgYWx0PVwiRFBMQVwiIHNyYz17ZHBsYUxvZ299IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic29jaWFsXCI+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzb2NpYWxCdXR0b25cIiBhbHQ9XCJGYWNlYm9va1wiIHNyYz17ZmJJY29ufSAvPlxuXG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzb2NpYWxCdXR0b25cIiBhbHQ9XCJJbnN0YWdyYW1cIiBzcmM9e2lnSWNvbn0gLz5cblxuICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwic29jaWFsQnV0dG9uXCIgYWx0PVwiUlNTIEZlZWRcIiBzcmM9e3Jzc0ljb259IC8+XG5cbiAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInNvY2lhbEJ1dHRvblwiIGFsdD1cIlR1bWJsclwiIHNyYz17dHVtYmxySWNvbn0gLz5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxGb290ZXJTdHlsZXMgLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0Zvb3Rlci9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT5cbiAgPEhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCIgLz5cbiAgICA8bWV0YVxuICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgc2hyaW5rLXRvLWZpdD1ub1wiXG4gICAgLz5cbiAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzAwMDAwMFwiIC8+XG4gICAgPGxpbmtcbiAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9U291cmNlK1NhbnMrUHJvOjQwMCw2MDB8TG9yYTo0MDAsNzAwXCJcbiAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgIC8+XG4gICAgPGxpbmtcbiAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgdHlwZT1cInRleHQvY3NzXCJcbiAgICAgIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay5taW4uY3NzXCJcbiAgICAvPlxuICAgIDxsaW5rXG4gICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgIHR5cGU9XCJ0ZXh0L2Nzc1wiXG4gICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2stdGhlbWUubWluLmNzc1wiXG4gICAgLz5cbiAgICA8bGlua1xuICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICBocmVmPVwiaHR0cHM6Ly91bnBrZy5jb20vcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzc1wiXG4gICAgLz5cbiAgICA8dGl0bGU+UmVhY3QgQXBwPC90aXRsZT5cbiAgPC9IZWFkPjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvSGVhZC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9IZWFkZXIuY3NzXCI7XG5cbmNvbnN0IEhlYWRlciA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5saW5rc0NvbnRhaW5lcn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1haW5MaW5rc30+XG4gICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+XG4gICAgICAgIDxMaW5rIHRvPVwiL2Jyb3dzZS1ieS10b3BpY1wiPkJyb3dzZTwvTGluaz5cbiAgICAgICAgPExpbmsgdG89XCJcIj5FeGhpYml0aW9uczwvTGluaz5cbiAgICAgICAgPExpbmsgdG89XCIvcHJpbWFyeS1zb3VyY2Utc2V0c1wiPlByaW1hcnkgU291cmNlIFNldHM8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmRpdmlkZXJ9IC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNlY29uZGFyeUxpbmtzfT5cbiAgICAgICAgPExpbmsgdG89XCJcIj5BYm91dCBVczwvTGluaz5cbiAgICAgICAgPExpbmsgdG89XCJcIj5OZXdzPC9MaW5rPlxuICAgICAgICA8TGluayB0bz1cIlwiPlBybyBDb21tdW5pdHk8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMubG9naW59PkxvZyBJbjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBqc3g+e3N0eWxlc308L3N0eWxlPlxuICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvSGVhZGVyL2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiO0E7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEVBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQUVBO0FBQUE7QUFFQTtBQUZBO0FBRUE7QUFBQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBS0E7QUFMQTtBQUtBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUNBOzs7QUFFQTtBQUNBOzs7Ozs7O0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTs7QUFHQTtBQUFBOztBQUZBO0FBSUE7QUFKQTtBQUNBO0FBR0E7QUFDQTtBQURBOztBQUdBO0FBQUE7O0FBRkE7QUFJQTtBQUpBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7O0FBSEE7QUFLQTtBQUxBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7O0FBSEE7QUFLQTtBQUxBO0FBQ0E7QUFNQTtBQUFBOztBQUZBO0FBSUE7QUFKQTtBQUNBOztBQUdBO0FBQUE7QUFBQTtBQUFBO0FBMUJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7Ozs7OztBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWRBO0FBQUE7QUFBQTtBQW1CQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9
  return { page: comp.default };
});
