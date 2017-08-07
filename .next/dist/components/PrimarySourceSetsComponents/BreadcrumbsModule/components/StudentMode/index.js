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

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _StudentMode = require("./StudentMode.css");

var _Tooltip = require("../../../../Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _removeQueryParams = require("../../../../../utilFunctions/removeQueryParams");

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