"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Tooltip = require("./Tooltip.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Tooltip/index.js";


var Tooltip = function Tooltip(_ref) {
  var className = _ref.className,
      id = _ref.id,
      isHidden = _ref.isHidden,
      children = _ref.children;
  return _react2.default.createElement("div", {
    className: [className, isHidden && _Tooltip.classNames.hidden].join(" "),
    id: id || className,
    role: "tooltip",
    "aria-hidden": isHidden,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, children, _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Tooltip.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }));
};

exports.default = Tooltip;