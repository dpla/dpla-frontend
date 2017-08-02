"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require("styled-jsx/style.js");

var _style2 = _interopRequireDefault(_style);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Header = require("./Header.css");

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Header/index.js";

var Header = function Header() {
  return _react2.default.createElement(
    "div",
    {
      className: "header",
      "data-jsx-ext": _Header2.default.__scopedHash,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _Header2.default.linksContainer,
        "data-jsx-ext": _Header2.default.__scopedHash,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _Header2.default.mainLinks,
          "data-jsx-ext": _Header2.default.__scopedHash,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        _react2.default.createElement(
          _link2.default,
          {
            to: "/",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 10
            }
          },
          "Home"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            to: "/browse-by-topic",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 11
            }
          },
          "Browse"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 12
            }
          },
          "Exhibitions"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            to: "/primary-source-sets",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 13
            }
          },
          "Primary Source Sets"
        )
      ),
      _react2.default.createElement("span", {
        className: _Header2.default.divider,
        "data-jsx-ext": _Header2.default.__scopedHash,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }),
      _react2.default.createElement(
        "div",
        {
          className: _Header2.default.secondaryLinks,
          "data-jsx-ext": _Header2.default.__scopedHash,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        },
        _react2.default.createElement(
          _link2.default,
          {
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 17
            }
          },
          "About Us"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            }
          },
          "News"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          },
          "Pro Community"
        )
      ),
      _react2.default.createElement(
        "button",
        {
          className: _Header2.default.login,
          "data-jsx-ext": _Header2.default.__scopedHash,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        },
        "Log In"
      )
    ),
    _react2.default.createElement(_style2.default, {
      styleId: _Header2.default.__scopedHash,
      css: _Header2.default.__scoped
    })
  );
};

exports.default = Header;
