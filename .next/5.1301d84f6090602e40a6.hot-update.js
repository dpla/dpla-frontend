webpackHotUpdate(5,{

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(36);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(39);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(38);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(540);

var _link2 = _interopRequireDefault(_link);

var _StudentMode = __webpack_require__(563);

var _Tooltip = __webpack_require__(582);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _removeQueryParams = __webpack_require__(545);

var _removeQueryParams2 = _interopRequireDefault(_removeQueryParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js";


var question = "/static/images/question.svg";

var prettifyUrl = function prettifyUrl(url, set, source) {
  var result = url.replace(/\/set/, "/" + set);
  if (source) {
    result = result.replace(/\/sources/, "/sources/" + source);
  }
  return result;
};

var StudentMode = function (_React$Component) {
  (0, _inherits3.default)(StudentMode, _React$Component);

  function StudentMode() {
    (0, _classCallCheck3.default)(this, StudentMode);

    return (0, _possibleConstructorReturn3.default)(this, (StudentMode.__proto__ || (0, _getPrototypeOf2.default)(StudentMode)).apply(this, arguments));
  }

  (0, _createClass3.default)(StudentMode, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({ showTooltip: false });
    }
  }, {
    key: "showTooltip",
    value: function showTooltip() {
      this.setState({ showTooltip: true });
    }
  }, {
    key: "hideTooltip",
    value: function hideTooltip() {
      this.setState({ showTooltip: false });
    }
  }, {
    key: "toggleTooltip",
    value: function toggleTooltip() {
      this.setState({ showTooltip: !this.state.showTooltip });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var route = this.props.route;

      return _react2.default.createElement("button", {
        "aria-describedby": "student-mode-tooltip",
        className: _StudentMode.classNames.studentMode,
        onMouseOver: function onMouseOver() {
          return _this2.showTooltip();
        },
        onFocus: function onFocus() {
          return _this2.showTooltip();
        },
        onBlur: function onBlur() {
          return _this2.hideTooltip();
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.hideTooltip();
        },
        onClick: function onClick() {
          return _this2.toggleTooltip();
        },
        tabIndex: "0",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      }, _react2.default.createElement("h3", { className: _StudentMode.classNames.studentModeText, __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, "Student Mode"), _react2.default.createElement("img", { src: question, alt: "", className: _StudentMode.classNames.questionIcon, __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }), _react2.default.createElement(_Tooltip2.default, {
        id: "student-mode-tooltip",
        isHidden: !this.state.showTooltip,
        className: _StudentMode.classNames.tooltip,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, _react2.default.createElement("p", { className: _StudentMode.classNames.tooltipText, __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, "You\u2019re viewing this Primary Source Set with the teaching guides hidden."), _react2.default.createElement(_link2.default, {
        href: {
          pathname: this.props.route.pathname,
          query: (0, _removeQueryParams2.default)(route.query, ["studentMode"])
        },
        as: {
          pathname: prettifyUrl(route.pathname, route.query.set, route.query.source),
          query: (0, _removeQueryParams2.default)(route.query, ["studentMode", "set", "source"])
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      }, _react2.default.createElement("a", { className: _StudentMode.classNames.tooltipLink, __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, "Turn on Teaching Guides"))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _StudentMode.stylesheet }, __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      }));
    }
  }]);

  return StudentMode;
}(_react2.default.Component);

exports.default = StudentMode;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js"); } } })();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS4xMzAxZDg0ZjYwOTA2MDJlNDBhNi5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvQnJlYWRjcnVtYnNNb2R1bGUvY29tcG9uZW50cy9TdHVkZW50TW9kZS9pbmRleC5qcz80NzUyNWUzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IHsgc3R5bGVzaGVldCwgY2xhc3NOYW1lcyB9IGZyb20gXCIuL1N0dWRlbnRNb2RlLmNzc1wiO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSBcIi4uLy4uLy4uLy4uL1Rvb2x0aXBcIjtcblxuaW1wb3J0IHJlbW92ZVF1ZXJ5UGFyYW1zIGZyb20gXCJ1dGlsRnVuY3Rpb25zL3JlbW92ZVF1ZXJ5UGFyYW1zXCI7XG5cbmNvbnN0IHF1ZXN0aW9uID0gXCIvc3RhdGljL2ltYWdlcy9xdWVzdGlvbi5zdmdcIjtcblxuY29uc3QgcHJldHRpZnlVcmwgPSAodXJsLCBzZXQsIHNvdXJjZSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gdXJsLnJlcGxhY2UoL1xcL3NldC8sIGAvJHtzZXR9YCk7XG4gIGlmIChzb3VyY2UpIHtcbiAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFwvc291cmNlcy8sIGAvc291cmNlcy8ke3NvdXJjZX1gKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY2xhc3MgU3R1ZGVudE1vZGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dUb29sdGlwOiBmYWxzZSB9KTtcbiAgfVxuXG4gIHNob3dUb29sdGlwKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93VG9vbHRpcDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGhpZGVUb29sdGlwKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93VG9vbHRpcDogZmFsc2UgfSk7XG4gIH1cblxuICB0b2dnbGVUb29sdGlwKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93VG9vbHRpcDogIXRoaXMuc3RhdGUuc2hvd1Rvb2x0aXAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByb3V0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwic3R1ZGVudC1tb2RlLXRvb2x0aXBcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc3R1ZGVudE1vZGV9XG4gICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiB0aGlzLnNob3dUb29sdGlwKCl9XG4gICAgICAgIG9uRm9jdXM9eygpID0+IHRoaXMuc2hvd1Rvb2x0aXAoKX1cbiAgICAgICAgb25CbHVyPXsoKSA9PiB0aGlzLmhpZGVUb29sdGlwKCl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gdGhpcy5oaWRlVG9vbHRpcCgpfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnRvZ2dsZVRvb2x0aXAoKX1cbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgID5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zdHVkZW50TW9kZVRleHR9PlN0dWRlbnQgTW9kZTwvaDM+XG4gICAgICAgIDxpbWcgc3JjPXtxdWVzdGlvbn0gYWx0PVwiXCIgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnF1ZXN0aW9uSWNvbn0gLz5cbiAgICAgICAgPFRvb2x0aXBcbiAgICAgICAgICBpZD1cInN0dWRlbnQtbW9kZS10b29sdGlwXCJcbiAgICAgICAgICBpc0hpZGRlbj17IXRoaXMuc3RhdGUuc2hvd1Rvb2x0aXB9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnRvb2x0aXB9XG4gICAgICAgID5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9e2NsYXNzTmFtZXMudG9vbHRpcFRleHR9PlxuICAgICAgICAgICAgWW914oCZcmUgdmlld2luZyB0aGlzIFByaW1hcnkgU291cmNlIFNldCB3aXRoIHRoZSB0ZWFjaGluZyBndWlkZXNcbiAgICAgICAgICAgIGhpZGRlbi5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGhyZWY9e3tcbiAgICAgICAgICAgICAgcGF0aG5hbWU6IHRoaXMucHJvcHMucm91dGUucGF0aG5hbWUsXG4gICAgICAgICAgICAgIHF1ZXJ5OiByZW1vdmVRdWVyeVBhcmFtcyhyb3V0ZS5xdWVyeSwgW1wic3R1ZGVudE1vZGVcIl0pXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYXM9e3tcbiAgICAgICAgICAgICAgcGF0aG5hbWU6IHByZXR0aWZ5VXJsKFxuICAgICAgICAgICAgICAgIHJvdXRlLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHJvdXRlLnF1ZXJ5LnNldCxcbiAgICAgICAgICAgICAgICByb3V0ZS5xdWVyeS5zb3VyY2VcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcXVlcnk6IHJlbW92ZVF1ZXJ5UGFyYW1zKHJvdXRlLnF1ZXJ5LCBbXG4gICAgICAgICAgICAgICAgXCJzdHVkZW50TW9kZVwiLFxuICAgICAgICAgICAgICAgIFwic2V0XCIsXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIlxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9e2NsYXNzTmFtZXMudG9vbHRpcExpbmt9PlR1cm4gb24gVGVhY2hpbmcgR3VpZGVzPC9hPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICA8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZXNoZWV0IH19IC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0dWRlbnRNb2RlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvQnJlYWRjcnVtYnNNb2R1bGUvY29tcG9uZW50cy9TdHVkZW50TW9kZS9pbmRleC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBO0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBTkE7QUFDQTtBQU9BOzs7Ozs7Ozs7OztBQUVBO0FBQUE7Ozs7QUFJQTtBQUFBOzs7O0FBSUE7QUFBQTs7OztBQUlBO0FBQUE7Ozs7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7O0FBUkE7QUFVQTtBQVZBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFBQTtBQUNBOztBQUhBO0FBS0E7QUFMQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBSUE7O0FBRUE7QUFDQTtBQURBOztBQUlBO0FBS0E7QUFMQTs7QUFOQTtBQWtCQTtBQWxCQTtBQUNBO0FBaUJBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFHQTtBQUhBOzs7Ozs7QUE5REE7QUFDQTtBQW1FQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9