"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _NavArrows = require("./NavArrows.css");

var _NavArrows2 = _interopRequireDefault(_NavArrows);

var _chevronThickOrange = require("../../../../../../../../../../images/chevron-thick-orange.svg");

var _chevronThickOrange2 = _interopRequireDefault(_chevronThickOrange);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/BreadcrumbsAndNav/components/NavLinks/index.js";

var NavArrows = function NavArrows(_ref) {
  var prevUrl = _ref.prevUrl,
    nextUrl = _ref.nextUrl;
  return _react2.default.createElement(
    "div",
    {
      className: _NavArrows2.default.navLinks,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    },
    _react2.default.createElement(
      _reactRouterDom.Link,
      {
        to: prevUrl,
        className: _NavArrows2.default.prevLink,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      },
      _react2.default.createElement("img", {
        src: _chevronThickOrange2.default,
        alt: "",
        className: _NavArrows2.default.prevArrow,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }),
      _react2.default.createElement(
        "span",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          }
        },
        "Previous Section"
      )
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      {
        to: nextUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      },
      _react2.default.createElement(
        "span",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        },
        "Next Section"
      ),
      _react2.default.createElement("img", {
        src: _chevronThickOrange2.default,
        alt: "",
        className: _NavArrows2.default.nextArrow,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      })
    )
  );
};

exports.default = NavArrows;
