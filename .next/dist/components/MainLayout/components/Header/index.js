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
  return (
    console.log(_Header.classNames) ||
    _react2.default.createElement(
      "div",
      {
        className: _Header.classNames.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _Header.classNames.linksContainer,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: _Header.classNames.mainLinks,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 10
            }
          },
          _react2.default.createElement(
            _link2.default,
            {
              href: "/",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 11
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 12
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
                lineNumber: 14
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 15
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
                lineNumber: 17
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 18
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
                lineNumber: 20
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 21
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
            lineNumber: 24
          }
        }),
        _react2.default.createElement(
          "div",
          {
            className: _Header.classNames.secondaryLinks,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          },
          _react2.default.createElement(
            _link2.default,
            {
              href: "",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 27
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
                lineNumber: 29
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
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
                lineNumber: 32
              }
            },
            _react2.default.createElement(
              "a",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 33
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
              lineNumber: 36
            }
          },
          "Log In"
        )
      ),
      _react2.default.createElement("style", {
        dangerouslySetInnerHTML: { __html: _Header.stylesheet },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      })
    )
  );
};

exports.default = Header;
