"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _NavArrows = require("./NavArrows.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/BreadcrumbsAndNav/components/NavLinks/index.js";

var chevron = "/static/images/chevron-thick-orange.svg";

var NavArrows = function NavArrows(_ref) {
  var prevUrl = _ref.prevUrl,
    nextUrl = _ref.nextUrl;
  return _react2.default.createElement(
    "div",
    {
      className: _NavArrows.classNames.navLinks,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    },
    _react2.default.createElement(
      _link2.default,
      {
        to: prevUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      },
      _react2.default.createElement(
        "a",
        {
          className: _NavArrows.classNames.prevLink,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 11
          }
        },
        _react2.default.createElement("img", {
          src: chevron,
          alt: "",
          className: _NavArrows.classNames.prevArrow,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          }
        }),
        _react2.default.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 13
            }
          },
          "Previous Section"
        )
      )
    ),
    _react2.default.createElement(
      _link2.default,
      {
        to: nextUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      },
      _react2.default.createElement(
        "a",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 17
          }
        },
        _react2.default.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            }
          },
          "Next Section"
        ),
        _react2.default.createElement("img", {
          src: chevron,
          alt: "",
          className: _NavArrows.classNames.nextArrow,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          }
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _NavArrows.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    })
  );
};

exports.default = NavArrows;
