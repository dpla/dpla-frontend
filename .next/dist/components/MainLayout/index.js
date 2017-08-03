"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Head = require("../Head");

var _Head2 = _interopRequireDefault(_Head);

var _Header = require("./components/Header");

var _Header2 = _interopRequireDefault(_Header);

var _HeaderSearchBar = require("./components/HeaderSearchBar");

var _HeaderSearchBar2 = _interopRequireDefault(_HeaderSearchBar);

var _Footer = require("./components/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/index.js";

var MainLayout = function MainLayout(props) {
  return _react2.default.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    },
    _react2.default.createElement(_Head2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    }),
    _react2.default.createElement(_Header2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    }),
    _react2.default.createElement(_HeaderSearchBar2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }),
    props.children,
    _react2.default.createElement(_Footer2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    })
  );
};

exports.default = MainLayout;
