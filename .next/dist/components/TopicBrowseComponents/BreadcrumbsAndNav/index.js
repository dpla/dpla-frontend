"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Breadcrumbs = require("../../../../../../components/Breadcrumbs");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _NavLinks = require("./components/NavLinks");

var _NavLinks2 = _interopRequireDefault(_NavLinks);

var _BreadcrumbsAndNav = require("./BreadcrumbsAndNav.css");

var _BreadcrumbsAndNav2 = _interopRequireDefault(_BreadcrumbsAndNav);

var _utils = require("../../../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/BreadcrumbsAndNav/index.js";

var BreadcrumbsAndNav = function BreadcrumbsAndNav(_ref) {
  var routerProps = _ref.routerProps,
    showNavLinks = _ref.showNavLinks,
    breadcrumbs = _ref.breadcrumbs;
  return _react2.default.createElement(
    "div",
    {
      className: _BreadcrumbsAndNav2.default.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [
          _BreadcrumbsAndNav2.default.breadcrumbsAndNav,
          _utils.module
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      },
      _react2.default.createElement(_Breadcrumbs2.default, {
        breadcrumbs: breadcrumbs,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }),
      showNavLinks &&
        _react2.default.createElement(_NavLinks2.default, {
          prevUrl: "",
          nextUrl: "",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          }
        })
    )
  );
};

exports.default = BreadcrumbsAndNav;
