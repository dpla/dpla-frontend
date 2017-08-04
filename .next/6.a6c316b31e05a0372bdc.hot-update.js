webpackHotUpdate(6, {
  /***/ /***/ 692: function(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _reactSelect = __webpack_require__(662);

    var _reactSelect2 = _interopRequireDefault(_reactSelect);

    __webpack_require__(671);

    var _Filters = __webpack_require__(688);

    var _utils = __webpack_require__(542);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var _jsxFileName =
      "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Filters/index.js";

    var _module = _utils.classNames.module;

    var SortValue = function SortValue(props) {
      return _react2.default.createElement(
        "span",
        {
          className: _Filters.classNames.sortValue,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          }
        },
        _react2.default.createElement(
          "span",
          {
            className: _Filters.classNames.sortByText,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 11
            }
          },
          "Sort by "
        ),
        _react2.default.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 12
            }
          },
          props.value.label
        )
      );
    };

    var Filters = function Filters() {
      return _react2.default.createElement(
        "div",
        {
          className: _Filters.classNames.filtersWrapper,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: [_module, _Filters.classNames.filters].join(" "),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          },
          _react2.default.createElement("input", {
            className: _Filters.classNames.textInput,
            placeholder: "Filter by title",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            }
          }),
          _react2.default.createElement(_reactSelect2.default, {
            clearable: false,
            searchable: false,
            value: "title",
            className: [
              _Filters.classNames.select,
              _Filters.classNames.sortSelect
            ].join(" "),
            valueComponent: SortValue,
            options: [{ value: "title", label: "Title" }],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            }
          })
        ),
        _react2.default.createElement("style", {
          dangerouslySetInnerHTML: { __html: _Filters.stylesheet },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        })
      );
    };

    exports.default = Filters;

    (function register() {
      /* react-hot-loader/webpack */ if (true) {
        if (typeof __REACT_HOT_LOADER__ === "undefined") {
          return;
        }
        if (typeof module.exports === "function") {
          __REACT_HOT_LOADER__.register(
            module.exports,
            "module.exports",
            "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Filters/index.js"
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
            "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Filters/index.js"
          );
        }
      }
    })();

    /***/
  },

  /***/ /***/ 694: function(module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _react = __webpack_require__(12);

    var _react2 = _interopRequireDefault(_react);

    var _link = __webpack_require__(541);

    var _link2 = _interopRequireDefault(_link);

    var _Topics = __webpack_require__(690);

    var _utils = __webpack_require__(542);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var _jsxFileName =
      "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Topics/index.js";

    var _module = _utils.classNames.module;

    var Topics = function Topics(_ref) {
      var topics = _ref.topics;
      return _react2.default.createElement(
        "div",
        {
          className: [_module, _Topics.classNames.topicsWrapper].join(" "),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        _react2.default.createElement(
          "ul",
          {
            className: _Topics.classNames.topics,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 10
            }
          },
          topics.map(function(topic) {
            return _react2.default.createElement(
              "li",
              {
                className: _Topics.classNames.topic,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 12
                }
              },
              _react2.default.createElement(
                _link2.default,
                {
                  to: "browse-by-topic/" + topic.slug,
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
                      lineNumber: 14
                    }
                  },
                  _react2.default.createElement("img", {
                    alt: topic.title,
                    src: topic.image,
                    className: _Topics.classNames.image,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 15
                    }
                  }),
                  _react2.default.createElement(
                    "h3",
                    {
                      className: _Topics.classNames.title,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 20
                      }
                    },
                    topic.title
                  )
                )
              ),
              topic.isFeatured &&
                _react2.default.createElement(
                  "div",
                  {
                    className: _Topics.classNames.ribbon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 26
                    }
                  },
                  "Featured"
                ),
              topic.isNew &&
                !topic.isFeatured &&
                _react2.default.createElement(
                  "div",
                  {
                    className: _Topics.classNames.ribbon,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 29
                    }
                  },
                  "New"
                )
            );
          })
        ),
        _react2.default.createElement("style", {
          dangerouslySetInnerHTML: { __html: _Topics.stylesheet },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          }
        })
      );
    };

    exports.default = Topics;

    (function register() {
      /* react-hot-loader/webpack */ if (true) {
        if (typeof __REACT_HOT_LOADER__ === "undefined") {
          return;
        }
        if (typeof module.exports === "function") {
          __REACT_HOT_LOADER__.register(
            module.exports,
            "module.exports",
            "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Topics/index.js"
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
            "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Topics/index.js"
          );
        }
      }
    })();

    /***/
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5hNmMzMTZiMzFlMDVhMDM3MmJkYy5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ub3BpY0Jyb3dzZUNvbXBvbmVudHMvVG9waWNzTGlzdC9jb21wb25lbnRzL0ZpbHRlcnMvaW5kZXguanM/MjgyNiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1RvcGljQnJvd3NlQ29tcG9uZW50cy9Ub3BpY3NMaXN0L2NvbXBvbmVudHMvVG9waWNzL2luZGV4LmpzPzk1ZGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tIFwicmVhY3Qtc2VsZWN0XCI7XG5cbmltcG9ydCBcInJlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3NcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMsIHN0eWxlc2hlZXQgfSBmcm9tIFwiLi9GaWx0ZXJzLmNzc1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyBhcyB1dGlsQ2xhc3NOYW1lcyB9IGZyb20gXCJjc3MvdXRpbHMuY3NzXCI7XG5jb25zdCB7IG1vZHVsZSB9ID0gdXRpbENsYXNzTmFtZXM7XG5cbmNvbnN0IFNvcnRWYWx1ZSA9IHByb3BzID0+XG4gIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zb3J0VmFsdWV9PlxuICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zb3J0QnlUZXh0fT5Tb3J0IGJ5IDwvc3Bhbj5cbiAgICA8c3Bhbj5cbiAgICAgIHtwcm9wcy52YWx1ZS5sYWJlbH1cbiAgICA8L3NwYW4+XG4gIDwvc3Bhbj47XG5cbmNvbnN0IEZpbHRlcnMgPSAoKSA9PlxuICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5maWx0ZXJzV3JhcHBlcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e1ttb2R1bGUsIGNsYXNzTmFtZXMuZmlsdGVyc10uam9pbihcIiBcIil9PlxuICAgICAgPGlucHV0IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy50ZXh0SW5wdXR9IHBsYWNlaG9sZGVyPVwiRmlsdGVyIGJ5IHRpdGxlXCIgLz5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgY2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgIHZhbHVlPVwidGl0bGVcIlxuICAgICAgICBjbGFzc05hbWU9e1tjbGFzc05hbWVzLnNlbGVjdCwgY2xhc3NOYW1lcy5zb3J0U2VsZWN0XS5qb2luKFwiIFwiKX1cbiAgICAgICAgdmFsdWVDb21wb25lbnQ9e1NvcnRWYWx1ZX1cbiAgICAgICAgb3B0aW9ucz17W3sgdmFsdWU6IFwidGl0bGVcIiwgbGFiZWw6IFwiVGl0bGVcIiB9XX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3R5bGVzaGVldCB9fSAvPlxuICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlcnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL1RvcGljQnJvd3NlQ29tcG9uZW50cy9Ub3BpY3NMaXN0L2NvbXBvbmVudHMvRmlsdGVycy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IHsgc3R5bGVzaGVldCwgY2xhc3NOYW1lcyB9IGZyb20gXCIuL1RvcGljcy5jc3NcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgYXMgdXRpbENsYXNzTmFtZXMgfSBmcm9tIFwiY3NzL3V0aWxzLmNzc1wiO1xuY29uc3QgeyBtb2R1bGUgfSA9IHV0aWxDbGFzc05hbWVzO1xuXG5jb25zdCBUb3BpY3MgPSAoeyB0b3BpY3MgfSkgPT5cbiAgPGRpdiBjbGFzc05hbWU9e1ttb2R1bGUsIGNsYXNzTmFtZXMudG9waWNzV3JhcHBlcl0uam9pbihcIiBcIil9PlxuICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzTmFtZXMudG9waWNzfT5cbiAgICAgIHt0b3BpY3MubWFwKHRvcGljID0+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZXMudG9waWN9PlxuICAgICAgICAgIDxMaW5rIHRvPXtgYnJvd3NlLWJ5LXRvcGljLyR7dG9waWMuc2x1Z31gfT5cbiAgICAgICAgICAgIDxhPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgYWx0PXt0b3BpYy50aXRsZX1cbiAgICAgICAgICAgICAgICBzcmM9e3RvcGljLmltYWdlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5pbWFnZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy50aXRsZX0+XG4gICAgICAgICAgICAgICAge3RvcGljLnRpdGxlfVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICB7dG9waWMuaXNGZWF0dXJlZCAmJlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMucmliYm9ufT5GZWF0dXJlZDwvZGl2Pn1cbiAgICAgICAgICB7dG9waWMuaXNOZXcgJiZcbiAgICAgICAgICAgICF0b3BpYy5pc0ZlYXR1cmVkICYmXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5yaWJib259Pk5ldzwvZGl2Pn1cbiAgICAgICAgPC9saT5cbiAgICAgICl9XG4gICAgPC91bD5cbiAgICA8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZXNoZWV0IH19IC8+XG4gIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgVG9waWNzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9Ub3BpY0Jyb3dzZUNvbXBvbmVudHMvVG9waWNzTGlzdC9jb21wb25lbnRzL1RvcGljcy9pbmRleC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUhBO0FBQ0E7QUFPQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBOztBQU5BO0FBU0E7QUFUQTtBQUNBO0FBUUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7O0FBSEE7QUFLQTtBQUxBO0FBQ0E7QUFJQTtBQUNBO0FBREE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
