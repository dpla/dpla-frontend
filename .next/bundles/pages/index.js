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

      /***/ /***/ 546: function(module, exports) {
        (function() {
          "use strict";
          var __styledJsxDefaultExport = new String(
            ".footer{color:red;background-color:--col;padding:55px 0 0 0}.dplaLogo{width:300px}.linksAndDonate{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:auto;-webkit-align-items:baseline;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;padding:0 70px 57px}@media screen and (min-width:1100px){.linksAndDonate{padding:0 0 57px;max-width:1024px}}.links{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:1.125rem;line-height:1.5625rem;color:gray75;width:550px;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between}.linkHeader{font-weight:600;font-size:1.25rem;line-height:2rem;margin-bottom:12px;color:white}.logoAndSocialWrapper{background-color:midnightBlue}.logoAndSocial{margin:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between;padding:33px 57px}@media screen and (min-width:1100px){.logoAndSocial{padding:33px 0;max-width:1024px}}.social{margin-left:auto}.donateButton{margin-left:auto;font-weight:600;color:white;padding:12px 49px;background-color:bambooOrange;border-radius:2px;font-size:1.125rem;line-height:1.4375rem}.socialButton{width:24px;height:24px;padding-right:17px}.socialButton:-last-child{padding:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvRm9vdGVyL0Zvb3RlclN0eWxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRWEsQUFFRSxBQUVDLEFBR00sQUFFTixBQUVHLEFBRWMsQUFFbEIsQUFHSyxBQUVBLEFBRUEsQUFFTixBQUVFLFdBMUJ1QixDQXdCVixDQXRCYixBQWFlLENBV2QsRUFSeUIsQ0FQRixDQUpJLEFBYXZCLEFBRWtCLE9BRVksTUFYakIsR0FLUyxDQWxCa0IsQUFzQlAsQ0FmVCxBQUllLFNBYVIsR0FGdUIsTUFYTyxDQVhwQixZQXNCOEMsT0FYWCxJQVBsRSxBQUtPLFNBRTRELElBUDNDLEFBV1MsT0FORCxBQWFrRSxtQkFBc0IsSUFieEUsY0FBZSxFQWFrRixXQWJqRCxZQWFrRCxvQ0FsQm5HLHFCQUFDLEtBV00sbUJBQUMsc0NBTjBDIiwiZmlsZSI6ImNvbXBvbmVudHMvRm9vdGVyL0Zvb3RlclN0eWxlcy5zY3NzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9mcmFua2llc2ltbXMvRGVza3RvcC9kcGxhLWVuZHVzZXItc2l0ZSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIuZm9vdGVyIHtcXG4gIGNvbG9yOiByZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAtLWNvbDtcXG4gIHBhZGRpbmc6IDU1cHggMCAwIDA7IH1cXG5cXG4uZHBsYUxvZ28ge1xcbiAgd2lkdGg6IDMwMHB4OyB9XFxuXFxuLmxpbmtzQW5kRG9uYXRlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW46IGF1dG87XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBwYWRkaW5nOiAwIDcwcHggNTdweDsgfVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmxpbmtzQW5kRG9uYXRlIHtcXG4gICAgcGFkZGluZzogMCAwIDU3cHg7XFxuICAgIG1heC13aWR0aDogMTAyNHB4OyB9IH1cXG5cXG4ubGlua3Mge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxuICBsaW5lLWhlaWdodDogMS41NjI1cmVtO1xcbiAgY29sb3I6IGdyYXk3NTtcXG4gIHdpZHRoOiA1NTBweDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxcblxcbi5saW5rSGVhZGVyIHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBsaW5lLWhlaWdodDogMnJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4ubG9nb0FuZFNvY2lhbFdyYXBwZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbWlkbmlnaHRCbHVlOyB9XFxuXFxuLmxvZ29BbmRTb2NpYWwge1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHBhZGRpbmc6IDMzcHggNTdweDsgfVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmxvZ29BbmRTb2NpYWwge1xcbiAgICBwYWRkaW5nOiAzM3B4IDA7XFxuICAgIG1heC13aWR0aDogMTAyNHB4OyB9IH1cXG5cXG4uc29jaWFsIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvOyB9XFxuXFxuLmRvbmF0ZUJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMnB4IDQ5cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiYW1ib29PcmFuZ2U7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBmb250LXNpemU6IDEuMTI1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDM3NXJlbTsgfVxcblxcbi5zb2NpYWxCdXR0b24ge1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAxN3B4OyB9XFxuXFxuLnNvY2lhbEJ1dHRvbjotbGFzdC1jaGlsZCB7XFxuICBwYWRkaW5nOiBub25lOyB9XFxuXCIiXX0= */\n/*@ sourceURL=components/Footer/FooterStyles.scss */"
          );

          __styledJsxDefaultExport.__hash = "12895528169";
          __styledJsxDefaultExport.__scoped =
            '.footer[data-jsx-ext~="22895528169"]{color:red;background-color:--col;padding:55px 0 0 0}.dplaLogo[data-jsx-ext~="22895528169"]{width:300px}.linksAndDonate[data-jsx-ext~="22895528169"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:auto;-webkit-align-items:baseline;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;padding:0 70px 57px}@media screen and (min-width:1100px){.linksAndDonate[data-jsx-ext~="22895528169"]{padding:0 0 57px;max-width:1024px}}.links[data-jsx-ext~="22895528169"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:1.125rem;line-height:1.5625rem;color:gray75;width:550px;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between}.linkHeader[data-jsx-ext~="22895528169"]{font-weight:600;font-size:1.25rem;line-height:2rem;margin-bottom:12px;color:white}.logoAndSocialWrapper[data-jsx-ext~="22895528169"]{background-color:midnightBlue}.logoAndSocial[data-jsx-ext~="22895528169"]{margin:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:space-between;-webkit-justify-content:space-between;-ms-flex-pack:space-between;justify-content:space-between;padding:33px 57px}@media screen and (min-width:1100px){.logoAndSocial[data-jsx-ext~="22895528169"]{padding:33px 0;max-width:1024px}}.social[data-jsx-ext~="22895528169"]{margin-left:auto}.donateButton[data-jsx-ext~="22895528169"]{margin-left:auto;font-weight:600;color:white;padding:12px 49px;background-color:bambooOrange;border-radius:2px;font-size:1.125rem;line-height:1.4375rem}.socialButton[data-jsx-ext~="22895528169"]{width:24px;height:24px;padding-right:17px}.socialButton[data-jsx-ext~="22895528169"]:-last-child{padding:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvRm9vdGVyL0Zvb3RlclN0eWxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRWEsQUFFRSxBQUVDLEFBR00sQUFFTixBQUVHLEFBRWMsQUFFbEIsQUFHSyxBQUVBLEFBRUEsQUFFTixBQUVFLFdBMUJ1QixDQXdCVixDQXRCYixBQWFlLENBV2QsRUFSeUIsQ0FQRixDQUpJLEFBYXZCLEFBRWtCLE9BRVksTUFYakIsR0FLUyxDQWxCa0IsQUFzQlAsQ0FmVCxBQUllLFNBYVIsR0FGdUIsTUFYTyxDQVhwQixZQXNCOEMsT0FYWCxJQVBsRSxBQUtPLFNBRTRELElBUDNDLEFBV1MsT0FORCxBQWFrRSxtQkFBc0IsSUFieEUsY0FBZSxFQWFrRixXQWJqRCxZQWFrRCxvQ0FsQm5HLHFCQUFDLEtBV00sbUJBQUMsc0NBTjBDIiwiZmlsZSI6ImNvbXBvbmVudHMvRm9vdGVyL0Zvb3RlclN0eWxlcy5zY3NzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9mcmFua2llc2ltbXMvRGVza3RvcC9kcGxhLWVuZHVzZXItc2l0ZSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIuZm9vdGVyIHtcXG4gIGNvbG9yOiByZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAtLWNvbDtcXG4gIHBhZGRpbmc6IDU1cHggMCAwIDA7IH1cXG5cXG4uZHBsYUxvZ28ge1xcbiAgd2lkdGg6IDMwMHB4OyB9XFxuXFxuLmxpbmtzQW5kRG9uYXRlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW46IGF1dG87XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBwYWRkaW5nOiAwIDcwcHggNTdweDsgfVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmxpbmtzQW5kRG9uYXRlIHtcXG4gICAgcGFkZGluZzogMCAwIDU3cHg7XFxuICAgIG1heC13aWR0aDogMTAyNHB4OyB9IH1cXG5cXG4ubGlua3Mge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxuICBsaW5lLWhlaWdodDogMS41NjI1cmVtO1xcbiAgY29sb3I6IGdyYXk3NTtcXG4gIHdpZHRoOiA1NTBweDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxcblxcbi5saW5rSGVhZGVyIHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBsaW5lLWhlaWdodDogMnJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4ubG9nb0FuZFNvY2lhbFdyYXBwZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbWlkbmlnaHRCbHVlOyB9XFxuXFxuLmxvZ29BbmRTb2NpYWwge1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHBhZGRpbmc6IDMzcHggNTdweDsgfVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmxvZ29BbmRTb2NpYWwge1xcbiAgICBwYWRkaW5nOiAzM3B4IDA7XFxuICAgIG1heC13aWR0aDogMTAyNHB4OyB9IH1cXG5cXG4uc29jaWFsIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvOyB9XFxuXFxuLmRvbmF0ZUJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMnB4IDQ5cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiYW1ib29PcmFuZ2U7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBmb250LXNpemU6IDEuMTI1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNDM3NXJlbTsgfVxcblxcbi5zb2NpYWxCdXR0b24ge1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAxN3B4OyB9XFxuXFxuLnNvY2lhbEJ1dHRvbjotbGFzdC1jaGlsZCB7XFxuICBwYWRkaW5nOiBub25lOyB9XFxuXCIiXX0= */\n/*@ sourceURL=components/Footer/FooterStyles.scss */';
          __styledJsxDefaultExport.__scopedHash = "22895528169";
          module.exports = __styledJsxDefaultExport;
        })();

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

        var _FooterStyles = __webpack_require__(546);

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

        var _style = __webpack_require__(540);

        var _style2 = _interopRequireDefault(_style);

        var _react = __webpack_require__(12);

        var _react2 = _interopRequireDefault(_react);

        var _link = __webpack_require__(541);

        var _link2 = _interopRequireDefault(_link);

        var _Header = __webpack_require__(545);

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
                className: "linksContainer",
                "data-jsx-ext": _Header2.default.__scopedHash,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 8
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "mainLinks",
                  "data-jsx-ext": _Header2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                  }
                },
                _react2.default.createElement(
                  _link2.default,
                  {
                    href: "/",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 10
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 10
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
                      lineNumber: 11
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 11
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
                      lineNumber: 12
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 12
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
                      lineNumber: 13
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 13
                      }
                    },
                    "Primary Source Sets"
                  )
                )
              ),
              _react2.default.createElement("span", {
                className: "divider",
                "data-jsx-ext": _Header2.default.__scopedHash,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 15
                }
              }),
              _react2.default.createElement(
                "div",
                {
                  className: "secondaryLinks",
                  "data-jsx-ext": _Header2.default.__scopedHash,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                  }
                },
                _react2.default.createElement(
                  _link2.default,
                  {
                    href: "",
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 17
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 17
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
                      lineNumber: 18
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 18
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
                      lineNumber: 19
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      "data-jsx-ext": _Header2.default.__scopedHash,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 19
                      }
                    },
                    "Pro Community"
                  )
                )
              ),
              _react2.default.createElement(
                "button",
                {
                  className: "login",
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

      /***/ /***/ 550: function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(542);

        /***/
      }
    },
    [550]
  ));
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzP2I2ZWJlZjkiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3M/YjZlYmVmOSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyU3R5bGVzLnNjc3M/YjZlYmVmOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Zvb3Rlci9pbmRleC5qcz9iNmViZWY5Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZC9pbmRleC5qcz9iNmViZWY5Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSGVhZGVyL2luZGV4LmpzP2I2ZWJlZjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9vdGVyXCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwiLi4vY29tcG9uZW50cy9IZWFkXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+XG4gIDxkaXY+XG4gICAgPEhlYWQgLz5cbiAgICA8SGVhZGVyIC8+XG4gICAgPEZvb3RlciAvPlxuICA8L2Rpdj47XG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsIm1vZHVsZS5leHBvcnRzID0gXCIuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwQTJBMzc7XFxufVxcblxcbi5saW5rc0NvbnRhaW5lciB7XFxuICBtYXJnaW46IGF1dG87XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgNzBweDtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5saW5rc0NvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogMTAyNHB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgfVxcbn1cXG5cXG4ubWFpbkxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgY29sb3I6ICNGRkZGRkY7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5tYWluTGlua3MgYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDE3cHg7XFxufVxcblxcbi5tYWluTGlua3MgYTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMjFweDtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnNlY29uZGFyeUxpbmtzIGEge1xcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2Vjb25kYXJ5TGlua3MgYTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tbGVmdDogMjFweDtcXG59XFxuXFxuLmxvZ2luIHtcXG4gIGNvbG9yOiAjRkZGRkZGO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBsaW5lLWhlaWdodDogMS4xMjVyZW07XFxufVxcblxcbi5kaXZpZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxufVxcblwiXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3MiLCJtb2R1bGUuZXhwb3J0cyA9IFwiLmZvb3RlciB7XFxuICBjb2xvcjogcmVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogLS1jb2w7XFxuICBwYWRkaW5nOiA1NXB4IDAgMCAwOyB9XFxuXFxuLmRwbGFMb2dvIHtcXG4gIHdpZHRoOiAzMDBweDsgfVxcblxcbi5saW5rc0FuZERvbmF0ZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgcGFkZGluZzogMCA3MHB4IDU3cHg7IH1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5saW5rc0FuZERvbmF0ZSB7XFxuICAgIHBhZGRpbmc6IDAgMCA1N3B4O1xcbiAgICBtYXgtd2lkdGg6IDEwMjRweDsgfSB9XFxuXFxuLmxpbmtzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmb250LXNpemU6IDEuMTI1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNTYyNXJlbTtcXG4gIGNvbG9yOiBncmF5NzU7XFxuICB3aWR0aDogNTUwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IH1cXG5cXG4ubGlua0hlYWRlciB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDJyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLmxvZ29BbmRTb2NpYWxXcmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG1pZG5pZ2h0Qmx1ZTsgfVxcblxcbi5sb2dvQW5kU29jaWFsIHtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBwYWRkaW5nOiAzM3B4IDU3cHg7IH1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5sb2dvQW5kU29jaWFsIHtcXG4gICAgcGFkZGluZzogMzNweCAwO1xcbiAgICBtYXgtd2lkdGg6IDEwMjRweDsgfSB9XFxuXFxuLnNvY2lhbCB7XFxuICBtYXJnaW4tbGVmdDogYXV0bzsgfVxcblxcbi5kb25hdGVCdXR0b24ge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMTJweCA0OXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmFtYm9vT3JhbmdlO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQzNzVyZW07IH1cXG5cXG4uc29jaWFsQnV0dG9uIHtcXG4gIHdpZHRoOiAyNHB4O1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgcGFkZGluZy1yaWdodDogMTdweDsgfVxcblxcbi5zb2NpYWxCdXR0b246LWxhc3QtY2hpbGQge1xcbiAgcGFkZGluZzogbm9uZTsgfVxcblwiXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNvbXBvbmVudHMvRm9vdGVyL0Zvb3RlclN0eWxlcy5zY3NzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCBGb290ZXJTdHlsZXMgZnJvbSBcIi4vRm9vdGVyU3R5bGVzLnNjc3NcIjtcblxuY29uc3QgZHBsYUxvZ28gPSBcInN0YXRpYy9pbWFnZXMvZHBsYS1sb2dvLnN2Z1wiO1xuY29uc3QgZmJJY29uID0gXCJzdGF0aWMvaW1hZ2VzL2ZhY2Vib29rLnN2Z1wiO1xuY29uc3QgaWdJY29uID0gXCJzdGF0aWMvaW1hZ2VzL2luc3RhZ3JhbS5zdmdcIjtcbmNvbnN0IHJzc0ljb24gPSBcInN0YXRpYy9pbWFnZXMvcnNzLnN2Z1wiO1xuY29uc3QgdHVtYmxySWNvbiA9IFwic3RhdGljL2ltYWdlcy90dW1ibHIuc3ZnXCI7XG5cbmNvbnN0IEZvb3RlciA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc0FuZERvbmF0ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc1dyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5rc1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGlua0hlYWRlclwiPkRQTEE8L2gzPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGk+QWJvdXQgVXM8L2xpPlxuICAgICAgICAgICAgICA8bGk+RkFRPC9saT5cbiAgICAgICAgICAgICAgPGxpPldobyBVc2VzIERQTEE/PC9saT5cbiAgICAgICAgICAgICAgPGxpPlRlcm1zICZhbXA7IENvbmRpdGlvbnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+Q29udGFjdCBVczwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGlua0hlYWRlclwiPlRvb2xzPC9oMz5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpPlNlYXJjaDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5FeGhpYml0aW9uczwvbGk+XG4gICAgICAgICAgICAgIDxsaT4gUHJpbWFyeSBTb3VyY2UgU2V0cyA8L2xpPlxuICAgICAgICAgICAgICA8bGk+QnJvd3NlIGJ5IFRvcGljPC9saT5cbiAgICAgICAgICAgICAgPGxpPkJyb3dzZSBieSBQYXJ0bmVyPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJsaW5rSGVhZGVyXCI+UHJvIENvbW11bml0eTwvaDM+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaT5BYm91dCBEUExBPC9saT5cbiAgICAgICAgICAgICAgPGxpPkh1YnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+UHJvamVjdHM8L2xpPlxuICAgICAgICAgICAgICA8bGk+R2V0IEludm9sdmVkPC9saT5cbiAgICAgICAgICAgICAgPGxpPkVkdWNhdG9yczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5EZXZlbG9wZXJzPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRvbmF0ZUJ1dHRvblwiPkRvbmF0ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb0FuZFNvY2lhbFdyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb0FuZFNvY2lhbFwiPlxuICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImRwbGFMb2dvXCIgYWx0PVwiRFBMQVwiIHNyYz17ZHBsYUxvZ299IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic29jaWFsXCI+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzb2NpYWxCdXR0b25cIiBhbHQ9XCJGYWNlYm9va1wiIHNyYz17ZmJJY29ufSAvPlxuXG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzb2NpYWxCdXR0b25cIiBhbHQ9XCJJbnN0YWdyYW1cIiBzcmM9e2lnSWNvbn0gLz5cblxuICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwic29jaWFsQnV0dG9uXCIgYWx0PVwiUlNTIEZlZWRcIiBzcmM9e3Jzc0ljb259IC8+XG5cbiAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInNvY2lhbEJ1dHRvblwiIGFsdD1cIlR1bWJsclwiIHNyYz17dHVtYmxySWNvbn0gLz5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBqc3g+e0Zvb3RlclN0eWxlc308L3N0eWxlPlxuICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvRm9vdGVyL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PlxuICA8ZGl2PlxuICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICA6cm9vdCB7XG4gICAgICAgIC0tY29sb3ItcmVkOiByZWQ7XG4gICAgICB9XG4gICAgICBib2R5IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBmb250LWZhbWlseTogJ1NvdXJjZSBTYW5zIFBybycsIHNhbnMtc2VyaWY7XG4gICAgICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAgICAgfVxuICAgICAgYnV0dG9uLCBpbnB1dCB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiO1xuICAgICAgfVxuICAgICAgYSB7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG4gICAgICBidXR0b24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cbiAgICAgIHVsIHtcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgIH1cbiAgICAgIHAsIHVsLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgfVxuICAgICAgOmdsb2JhbCguc2xpY2stZGlzYWJsZWQpIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gICAgPEhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIiAvPlxuICAgICAgPG1ldGFcbiAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgICAgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBzaHJpbmstdG8tZml0PW5vXCJcbiAgICAgIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzAwMDAwMFwiIC8+XG4gICAgICA8bGlua1xuICAgICAgICBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNvdXJjZStTYW5zK1Bybzo0MDAsNjAwfExvcmE6NDAwLDcwMFwiXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICB0eXBlPVwidGV4dC9jc3NcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2subWluLmNzc1wiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0L2Nzc1wiXG4gICAgICAgIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay10aGVtZS5taW4uY3NzXCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vdW5wa2cuY29tL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3NcIlxuICAgICAgLz5cbiAgICAgIDx0aXRsZT5SZWFjdCBBcHA8L3RpdGxlPlxuICAgIDwvSGVhZD5cbiAgPC9kaXY+O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9IZWFkL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL0hlYWRlci5jc3NcIjtcblxuY29uc3QgSGVhZGVyID0gKCkgPT5cbiAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImxpbmtzQ29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW5MaW5rc1wiPlxuICAgICAgICA8TGluayBocmVmPVwiL1wiPjxhPkhvbWU8L2E+PC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiL2Jyb3dzZS1ieS10b3BpY1wiPjxhPkJyb3dzZTwvYT48L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCJcIj48YT5FeGhpYml0aW9uczwvYT48L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvcHJpbWFyeS1zb3VyY2Utc2V0c1wiPjxhPlByaW1hcnkgU291cmNlIFNldHM8L2E+PC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJkaXZpZGVyXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Vjb25kYXJ5TGlua3NcIj5cbiAgICAgICAgPExpbmsgaHJlZj1cIlwiPjxhPkFib3V0IFVzPC9hPjwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIlwiPjxhPk5ld3M8L2E+PC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiXCI+PGE+UHJvIENvbW11bml0eTwvYT48L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibG9naW5cIj5Mb2cgSW48L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8c3R5bGUganN4PntzdHlsZXN9PC9zdHlsZT5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0hlYWRlci9pbmRleC5qcyJdLCJtYXBwaW5ncyI6IjtBOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7OztBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUVBO0FBRkE7QUFFQTs7QUFBQTtBQUVBO0FBRkE7QUFFQTs7QUFBQTtBQUVBO0FBRkE7QUFFQTs7QUFBQTtBQUFBO0FBQUE7O0FBakRBO0FBQUE7QUFBQTtBQXlEQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUNBOzs7QUFFQTtBQUNBOzs7Ozs7O0FBREE7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQ0E7QUFsQ0E7O0FBa0NBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTs7QUFHQTtBQUFBO0FBRkE7O0FBQUE7QUFJQTtBQUpBO0FBQ0E7O0FBR0E7QUFDQTtBQURBOztBQUdBO0FBQUE7QUFGQTs7QUFBQTtBQUlBO0FBSkE7QUFDQTtBQUtBO0FBQ0E7QUFBQTtBQUhBOztBQUFBO0FBS0E7QUFMQTtBQUNBO0FBTUE7QUFDQTtBQUFBO0FBSEE7O0FBQUE7QUFLQTtBQUxBO0FBQ0E7QUFNQTtBQUFBO0FBRkE7O0FBQUE7QUFJQTtBQUpBO0FBQ0E7QUFHQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTVEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQWRBO0FBQUE7QUFBQTtBQW1CQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9
  return { page: comp.default };
});
