"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Breadcrumbs = require("../../../components/Breadcrumbs");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _NavLinks = require("./components/NavLinks");

var _NavLinks2 = _interopRequireDefault(_NavLinks);

var _BreadcrumbsAndNav = require("./BreadcrumbsAndNav.css");

var _utils = require("../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/BreadcrumbsAndNav/index.js";

var _module = _utils.classNames.module;

var BreadcrumbsAndNav = function BreadcrumbsAndNav(_ref) {
  var showNavLinks = _ref.showNavLinks,
    breadcrumbs = _ref.breadcrumbs;
  return _react2.default.createElement(
    "div",
    {
      className: _BreadcrumbsAndNav.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [
          _BreadcrumbsAndNav.classNames.breadcrumbsAndNav,
          _module
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      _react2.default.createElement(_Breadcrumbs2.default, {
        breadcrumbs: breadcrumbs,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }),
      showNavLinks &&
        _react2.default.createElement(_NavLinks2.default, {
          prevUrl: "",
          nextUrl: "",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        })
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _BreadcrumbsAndNav.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    })
  );
};

exports.default = BreadcrumbsAndNav;
