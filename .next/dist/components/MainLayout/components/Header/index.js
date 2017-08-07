"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Header = require("./Header.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Header/index.js";

var Header = function Header() {
  return _react2.default.createElement(
    "div",
    {
      className: _Header.classNames.header,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _Header.classNames.linksContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _Header.classNames.mainLinks,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        _react2.default.createElement(
          _link2.default,
          {
            href: "/",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 10
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 11
              }
            },
            "Home"
          )
        ),
        _react2.default.createElement(
          _link2.default,
          {
            href: "/browse-by-topic",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 13
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 14
              }
            },
            "Browse"
          )
        ),
        _react2.default.createElement(
          _link2.default,
          {
            href: "",
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
            "Exhibitions"
          )
        ),
        _react2.default.createElement(
          _link2.default,
          {
            href: "/primary-source-sets",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              }
            },
            "Primary Source Sets"
          )
        )
      ),
      _react2.default.createElement("span", {
        className: _Header.classNames.divider,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }),
      _react2.default.createElement(
        "div",
        {
          className: _Header.classNames.secondaryLinks,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          }
        },
        _react2.default.createElement(
          _link2.default,
          {
            href: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              }
            },
            "About Us"
          )
        ),
        _react2.default.createElement(
          _link2.default,
          {
            href: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 29
              }
            },
            "News"
          )
        ),
        _react2.default.createElement(
          _link2.default,
          {
            href: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 32
              }
            },
            "Pro Community"
          )
        )
      ),
      _react2.default.createElement(
        "button",
        {
          className: _Header.classNames.login,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        },
        "Log In"
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _Header.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    })
  );
};

exports.default = Header;
