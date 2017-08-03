"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _HeaderSearchBar = require("./HeaderSearchBar.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/HeaderSearchBar/index.js";

var dplaLogo = "static/images/dpla-logo-white.svg";
var searchIcon = "static/images/search.svg";

var HeaderSearchBar = function HeaderSearchBar() {
  return _react2.default.createElement(
    "div",
    {
      className: _HeaderSearchBar.classNames.headerSearchBar,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _HeaderSearchBar.classNames.flexWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      },
      _react2.default.createElement(
        _link2.default,
        {
          to: "/",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          }
        },
        _react2.default.createElement("img", {
          alt: "DPLA",
          src: dplaLogo,
          className: _HeaderSearchBar.classNames.logo,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          }
        })
      ),
      _react2.default.createElement(
        "div",
        {
          className: _HeaderSearchBar.classNames.searchBar,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        },
        _react2.default.createElement("input", {
          className: _HeaderSearchBar.classNames.searchInput,
          placeholder: "Search the collection",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        }),
        _react2.default.createElement(
          "button",
          {
            className: _HeaderSearchBar.classNames.searchButton,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            }
          },
          _react2.default.createElement("img", {
            alt: "Search",
            src: searchIcon,
            className: _HeaderSearchBar.classNames.searchIcon,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            }
          }),
          _react2.default.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              }
            },
            "Search"
          )
        )
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _HeaderSearchBar.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      }
    })
  );
};

exports.default = HeaderSearchBar;
