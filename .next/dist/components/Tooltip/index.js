"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Tooltip = require("./Tooltip.css");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Tooltip/index.js";


var Tooltip = function Tooltip(_ref) {
  var className = _ref.className,
      id = _ref.id,
      isHidden = _ref.isHidden,
      children = _ref.children;
  return _react2.default.createElement("div", {
    className: [className, isHidden && _Tooltip2.default.hidden].join(" "),
    id: id || className,
    role: "tooltip",
    "aria-hidden": isHidden,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, children);
};

exports.default = Tooltip;