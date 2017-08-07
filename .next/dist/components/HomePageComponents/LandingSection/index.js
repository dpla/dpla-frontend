"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LandingSection = require("./LandingSection.css");

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePageComponents/LandingSection/index.js";

var searchIcon = "static/images/search.svg";
var dplaLogo = "static/images/dpla-logo.svg";
var chevron = "static/images/chevron-thick-dark-blue.svg";

var LandingSection = function LandingSection() {
  return _react2.default.createElement(
    "div",
    {
      className: _LandingSection.classNames.home,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _LandingSection.classNames.logoAndDonate,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      _react2.default.createElement("img", {
        className: _LandingSection.classNames.dplaLogo,
        alt: "DPLA",
        src: dplaLogo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }),
      _react2.default.createElement(
        "button",
        {
          className: _LandingSection.classNames.donateButton,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        },
        "Donate"
      )
    ),
    _react2.default.createElement(
      "div",
      {
        className: _LandingSection.classNames.content,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      },
      _react2.default.createElement(
        "p",
        {
          className: _LandingSection.classNames.text,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 17
          }
        },
        "A collection of 16,340,976 free digital artifacts from over 120 libraries, archives and museums"
      ),
      _react2.default.createElement(
        "div",
        {
          className: _LandingSection.classNames.search,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        },
        _react2.default.createElement("input", {
          className: _LandingSection.classNames.searchInput,
          placeholder: "Search the collection",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          }
        }),
        _react2.default.createElement(
          "div",
          {
            className: _LandingSection.classNames.searchOptions,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            }
          },
          _react2.default.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 27
              }
            },
            "All types"
          ),
          _react2.default.createElement("img", {
            alt: "select types",
            className: _LandingSection.classNames.chevron,
            src: chevron,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28
            }
          })
        ),
        _react2.default.createElement(
          "button",
          {
            className: _LandingSection.classNames.searchButton,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            }
          },
          _react2.default.createElement("img", {
            alt: "search",
            className: _LandingSection.classNames.searchIcon,
            src: searchIcon,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            }
          }),
          _react2.default.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              }
            },
            "Search"
          )
        )
      ),
      _react2.default.createElement(
        "div",
        {
          className: _LandingSection.classNames.links,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          }
        },
        _react2.default.createElement(
          _link2.default,
          {
            className: _LandingSection.classNames.link,
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            }
          },
          "Browse by Topic"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            className: _LandingSection.classNames.link,
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 47
            }
          },
          "New? Start Here"
        )
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _LandingSection.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      }
    })
  );
};

exports.default = LandingSection;
