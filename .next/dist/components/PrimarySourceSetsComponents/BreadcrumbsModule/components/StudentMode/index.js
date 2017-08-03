"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _StudentMode = require("./StudentMode.css");

var _StudentMode2 = _interopRequireDefault(_StudentMode);

var _Tooltip = require("../../../../Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js";

var question = "static/images/question.svg";

var isStudentMode = function isStudentMode() {
  return false;
}; //TODO fix this

var StudentMode = (function(_React$Component) {
  (0, _inherits3.default)(StudentMode, _React$Component);

  function StudentMode() {
    (0, _classCallCheck3.default)(this, StudentMode);

    return (0, _possibleConstructorReturn3.default)(
      this,
      (StudentMode.__proto__ || (0, _getPrototypeOf2.default)(StudentMode))
        .apply(this, arguments)
    );
  }

  (0, _createClass3.default)(StudentMode, [
    {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.setState({ showTooltip: false });
      }
    },
    {
      key: "showTooltip",
      value: function showTooltip() {
        this.setState({ showTooltip: true });
      }
    },
    {
      key: "hideTooltip",
      value: function hideTooltip() {
        this.setState({ showTooltip: false });
      }
    },
    {
      key: "toggleTooltip",
      value: function toggleTooltip() {
        this.setState({ showTooltip: !this.state.showTooltip });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        return isStudentMode()
          ? _react2.default.createElement(
              "button",
              {
                "aria-describedby": "student-mode-tooltip",
                className: _StudentMode2.default.studentMode,
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
                  lineNumber: 30
                }
              },
              _react2.default.createElement(
                "h3",
                {
                  className: _StudentMode2.default.studentModeText,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                  }
                },
                "Student Mode"
              ),
              _react2.default.createElement("img", {
                src: question,
                alt: "",
                className: _StudentMode2.default.questionIcon,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 41
                }
              }),
              _react2.default.createElement(
                _Tooltip2.default,
                {
                  id: "student-mode-tooltip",
                  isHidden: !this.state.showTooltip,
                  className: _StudentMode2.default.tooltip,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                  }
                },
                _react2.default.createElement(
                  "p",
                  {
                    className: _StudentMode2.default.tooltipText,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 47
                    }
                  },
                  "You\u2019re viewing this Primary Source Set with the teaching guides hidden."
                ),
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 51
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      className: _StudentMode2.default.tooltipLink,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 52
                      }
                    },
                    "Turn on Teaching Guides"
                  )
                )
              )
            )
          : null;
      }
    }
  ]);

  return StudentMode;
})(_react2.default.Component);

exports.default = StudentMode;
