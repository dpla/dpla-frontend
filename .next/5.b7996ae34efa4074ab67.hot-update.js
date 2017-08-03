webpackHotUpdate(5, {
  /***/ /***/ 588: function(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _link = __webpack_require__(624);

    var _link2 = _interopRequireDefault(_link);

    var _FromTheBlog = __webpack_require__(580);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var _jsxFileName =
      "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/FromTheBlog/index.js";

    var smallChevron = "static/images/chevron-thick-orange.svg";

    var mockPosts = [
      {
        headline: "Historypin wins Knight News Challenge award for…",
        date: "June 12, 2017",
        bodyText:
          "Historypin wins Knight News Challenge award to gather, preserve, and measure the…",
        id: 0
      },
      {
        headline: "DPLA and the International Image Interoperability Framew…",
        date: "June 6, 2017",
        bodyText:
          "DPLA, along with representatives of a number of institutions, is presenting at Access to the…",
        id: 1
      },
      {
        headline: "Announcing the launch of RightsStatements.org",
        date: "June 3, 2017",
        bodyText:
          "The Digital Public Library of America and Europeana are proud to announce the launch of…",
        id: 2
      }
    ];

    var FromTheBlog = function FromTheBlog() {
      return /* data */ _react2.default.createElement(
        "div",
        {
          className: _FromTheBlog.classNames.wrapper,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: _FromTheBlog.classNames.fromTheBlog,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _FromTheBlog.classNames.header,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 35
              }
            },
            _react2.default.createElement(
              "h1",
              {
                className: _FromTheBlog.classNames.headerText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 36
                }
              },
              "From the Blog"
            ),
            _react2.default.createElement(
              _link2.default,
              {
                to: "",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 37
                }
              },
              _react2.default.createElement(
                "a",
                {
                  className: _FromTheBlog.classNames.headerLink,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                  }
                },
                _react2.default.createElement(
                  "span",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 39
                    }
                  },
                  "Browse the blog"
                ),
                _react2.default.createElement("img", {
                  alt: "browse the blog",
                  src: smallChevron,
                  className: _FromTheBlog.classNames.chevron,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            "ul",
            {
              className: _FromTheBlog.classNames.blogPosts,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 48
              }
            },
            mockPosts.map(function(post) {
              return _react2.default.createElement(
                "li",
                {
                  key: post.id,
                  className: _FromTheBlog.classNames.blogPost,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                  }
                },
                _react2.default.createElement(
                  _link2.default,
                  {
                    to: "",
                    className: _FromTheBlog.classNames.headline,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 51
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 52
                      }
                    },
                    post.headline
                  )
                ),
                _react2.default.createElement(
                  "div",
                  {
                    className: _FromTheBlog.classNames.date,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 56
                    }
                  },
                  post.date
                ),
                _react2.default.createElement(
                  "p",
                  {
                    className: _FromTheBlog.classNames.bodyText,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 59
                    }
                  },
                  post.bodyText
                )
              );
            })
          )
        ),
        _react2.default.createElement("style", {
          dangerouslySetInnerHTML: { __html: _FromTheBlog.stylesheet },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 66
          }
        })
      );
    };

    exports.default = FromTheBlog;

    (function register() {
      /* react-hot-loader/webpack */ if (true) {
        if (typeof __REACT_HOT_LOADER__ === "undefined") {
          return;
        }
        if (typeof module.exports === "function") {
          __REACT_HOT_LOADER__.register(
            module.exports,
            "module.exports",
            "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/FromTheBlog/index.js"
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
            "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/FromTheBlog/index.js"
          );
        }
      }
    })();

    /***/
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5iNzk5NmFlMzRlZmE0MDc0YWI2Ny5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ib21lUGFnZS9Gcm9tVGhlQmxvZy9pbmRleC5qcz81YjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IHsgc3R5bGVzaGVldCwgY2xhc3NOYW1lcyB9IGZyb20gXCIuL0Zyb21UaGVCbG9nLmNzc1wiO1xuXG5jb25zdCBzbWFsbENoZXZyb24gPSBcInN0YXRpYy9pbWFnZXMvY2hldnJvbi10aGljay1vcmFuZ2Uuc3ZnXCI7XG5cbmNvbnN0IG1vY2tQb3N0cyA9IFtcbiAge1xuICAgIGhlYWRsaW5lOiBcIkhpc3RvcnlwaW4gd2lucyBLbmlnaHQgTmV3cyBDaGFsbGVuZ2UgYXdhcmQgZm9y4oCmXCIsXG4gICAgZGF0ZTogXCJKdW5lIDEyLCAyMDE3XCIsXG4gICAgYm9keVRleHQ6XG4gICAgICBcIkhpc3RvcnlwaW4gd2lucyBLbmlnaHQgTmV3cyBDaGFsbGVuZ2UgYXdhcmQgdG8gZ2F0aGVyLCBwcmVzZXJ2ZSwgYW5kIG1lYXN1cmUgdGhl4oCmXCIsXG4gICAgaWQ6IDBcbiAgfSxcbiAge1xuICAgIGhlYWRsaW5lOiBcIkRQTEEgYW5kIHRoZSBJbnRlcm5hdGlvbmFsIEltYWdlIEludGVyb3BlcmFiaWxpdHkgRnJhbWV34oCmXCIsXG4gICAgZGF0ZTogXCJKdW5lIDYsIDIwMTdcIixcbiAgICBib2R5VGV4dDpcbiAgICAgIFwiRFBMQSwgYWxvbmcgd2l0aCByZXByZXNlbnRhdGl2ZXMgb2YgYSBudW1iZXIgb2YgaW5zdGl0dXRpb25zLCBpcyBwcmVzZW50aW5nIGF0IEFjY2VzcyB0byB0aGXigKZcIixcbiAgICBpZDogMVxuICB9LFxuICB7XG4gICAgaGVhZGxpbmU6IFwiQW5ub3VuY2luZyB0aGUgbGF1bmNoIG9mIFJpZ2h0c1N0YXRlbWVudHMub3JnXCIsXG4gICAgZGF0ZTogXCJKdW5lIDMsIDIwMTdcIixcbiAgICBib2R5VGV4dDpcbiAgICAgIFwiVGhlIERpZ2l0YWwgUHVibGljIExpYnJhcnkgb2YgQW1lcmljYSBhbmQgRXVyb3BlYW5hIGFyZSBwcm91ZCB0byBhbm5vdW5jZSB0aGUgbGF1bmNoIG9m4oCmXCIsXG4gICAgaWQ6IDJcbiAgfVxuXTtcblxuY29uc3QgRnJvbVRoZUJsb2cgPSAoLyogZGF0YSAqLykgPT5cbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMud3JhcHBlcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuZnJvbVRoZUJsb2d9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuaGVhZGVyfT5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5oZWFkZXJUZXh0fT5Gcm9tIHRoZSBCbG9nPC9oMT5cbiAgICAgICAgPExpbmsgdG89XCJcIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2NsYXNzTmFtZXMuaGVhZGVyTGlua30+XG4gICAgICAgICAgICA8c3Bhbj5Ccm93c2UgdGhlIGJsb2c8L3NwYW4+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIGFsdD1cImJyb3dzZSB0aGUgYmxvZ1wiXG4gICAgICAgICAgICAgIHNyYz17c21hbGxDaGV2cm9ufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuY2hldnJvbn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzTmFtZXMuYmxvZ1Bvc3RzfT5cbiAgICAgICAge21vY2tQb3N0cy5tYXAocG9zdCA9PlxuICAgICAgICAgIDxsaSBrZXk9e3Bvc3QuaWR9IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5ibG9nUG9zdH0+XG4gICAgICAgICAgICA8TGluayB0bz1cIlwiIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5oZWFkbGluZX0+XG4gICAgICAgICAgICAgIDxhPlxuICAgICAgICAgICAgICAgIHtwb3N0LmhlYWRsaW5lfVxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5kYXRlfT5cbiAgICAgICAgICAgICAge3Bvc3QuZGF0ZX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmJvZHlUZXh0fT5cbiAgICAgICAgICAgICAge3Bvc3QuYm9keVRleHR9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKX1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3R5bGVzaGVldCB9fSAvPlxuICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEZyb21UaGVCbG9nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9Ib21lUGFnZS9Gcm9tVGhlQmxvZy9pbmRleC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQUE7QUFKQTtBQVFBO0FBQ0E7QUFFQTtBQUFBO0FBSkE7QUFRQTtBQUNBO0FBRUE7QUFBQTtBQUpBO0FBQ0E7QUFPQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBOztBQUhBO0FBUUE7QUFSQTtBQUNBO0FBT0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBTUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9
