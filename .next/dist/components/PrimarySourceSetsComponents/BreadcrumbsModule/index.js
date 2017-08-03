"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Breadcrumbs = require("../../Breadcrumbs");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _StudentMode = require("./components/StudentMode");

var _StudentMode2 = _interopRequireDefault(_StudentMode);

var _BreadcrumbsModule = require("./BreadcrumbsModule.css");

var _utils = require("../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/index.js";

var _module = _utils.classNames.module;

var BreadcrumbsModule = function BreadcrumbsModule(_ref) {
  var showStudentMode = _ref.showStudentMode,
    breadcrumbs = _ref.breadcrumbs;
  return _react2.default.createElement(
    "div",
    {
      className: _BreadcrumbsModule.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [
          _module,
          _BreadcrumbsModule.classNames.breadcrumbsModule
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      },
      _react2.default.createElement(_Breadcrumbs2.default, {
        breadcrumbs: breadcrumbs,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }),
      showStudentMode &&
        _react2.default.createElement(_StudentMode2.default, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        })
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _BreadcrumbsModule.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    })
  );
};

exports.default = BreadcrumbsModule;
