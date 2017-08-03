"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _ContentAndMetadata = require("./ContentAndMetadata.css");

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata/index.js";

var _module = _utils.classNames.module;

var link = "/static/images/link.svg";
var external = "/static/images/external-link-black.svg";

var ContentAndMetadata = function ContentAndMetadata(_ref) {
  var source = _ref.source;
  return _react2.default.createElement(
    "div",
    {
      className: _ContentAndMetadata.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [
          _ContentAndMetadata.classNames.contentAndMetadata,
          _module
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _ContentAndMetadata.classNames.content,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        },
        _react2.default.createElement(
          "h2",
          {
            className: _ContentAndMetadata.classNames.contentHeader,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 15
            }
          },
          source.title
        ),
        _react2.default.createElement(
          "div",
          {
            className: _ContentAndMetadata.classNames.imageWrapper,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            }
          },
          _react2.default.createElement("img", {
            src: source.img,
            alt: source.title,
            className: _ContentAndMetadata.classNames.image,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          })
        ),
        _react2.default.createElement(
          "p",
          {
            className: _ContentAndMetadata.classNames.description,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          },
          source.description
        )
      ),
      _react2.default.createElement(
        "div",
        {
          className: _ContentAndMetadata.classNames.metadata,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: _ContentAndMetadata.classNames.sourceInfo,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            }
          },
          _react2.default.createElement(
            "button",
            {
              className: _ContentAndMetadata.classNames.button,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              }
            },
            "Cite this item"
          ),
          _react2.default.createElement(
            "button",
            {
              className: _ContentAndMetadata.classNames.button,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 32
              }
            },
            "Download"
          ),
          _react2.default.createElement(
            "p",
            {
              className: _ContentAndMetadata.classNames.courtesyOf,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              }
            },
            source.courtesyOf
          ),
          _react2.default.createElement(
            "div",
            {
              className: _ContentAndMetadata.classNames.copyrightInfo,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              }
            },
            _react2.default.createElement("img", {
              src: "",
              alt: "",
              className: _ContentAndMetadata.classNames.copyrightIcon,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 37
              }
            }),
            _react2.default.createElement(
              "p",
              {
                className: _ContentAndMetadata.classNames.copyrightText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 38
                }
              },
              source.copyright
            )
          ),
          _react2.default.createElement("div", {
            className: _ContentAndMetadata.classNames.divider,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            }
          }),
          _react2.default.createElement(
            "div",
            {
              className: _ContentAndMetadata.classNames.linkWrapper,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 43
              }
            },
            _react2.default.createElement(
              _link2.default,
              {
                to: source.itemSource,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 44
                }
              },
              _react2.default.createElement(
                "a",
                {
                  className: _ContentAndMetadata.classNames.sourceLink,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 45
                  }
                },
                _react2.default.createElement("img", {
                  alt: "",
                  src: link,
                  className: _ContentAndMetadata.classNames.linkIcon,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                  }
                }),
                _react2.default.createElement(
                  "span",
                  {
                    className: _ContentAndMetadata.classNames.linkText,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 47
                    }
                  },
                  "Item source"
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            {
              className: _ContentAndMetadata.classNames.linkWrapper,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 51
              }
            },
            _react2.default.createElement(
              _link2.default,
              {
                to: source.dplaRecord,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 52
                }
              },
              _react2.default.createElement(
                "a",
                {
                  className: _ContentAndMetadata.classNames.sourceLink,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 53
                  }
                },
                _react2.default.createElement("img", {
                  alt: "",
                  src: external,
                  className: _ContentAndMetadata.classNames.externalIcon,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 54
                  }
                }),
                _react2.default.createElement(
                  "span",
                  {
                    className: _ContentAndMetadata.classNames.linkText,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 59
                    }
                  },
                  "DPLA record"
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: _ContentAndMetadata.classNames.tipsForStudents,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 64
            }
          },
          _react2.default.createElement(
            "h3",
            {
              className: _ContentAndMetadata.classNames.tipsForStudentsHeader,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 65
              }
            },
            "Tips for Students"
          ),
          _react2.default.createElement(
            "p",
            {
              className: _ContentAndMetadata.classNames.tipDirections,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              }
            },
            "For this source, consider:"
          ),
          _react2.default.createElement(
            "ul",
            {
              className: _ContentAndMetadata.classNames.tips,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 69
              }
            },
            _react2.default.createElement(
              "li",
              {
                className: _ContentAndMetadata.classNames.tip,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 70
                }
              },
              "the author's point of view"
            ),
            _react2.default.createElement(
              "li",
              {
                className: _ContentAndMetadata.classNames.tip,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 71
                }
              },
              "the author's purpose"
            ),
            _react2.default.createElement(
              "li",
              {
                className: _ContentAndMetadata.classNames.tip,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 72
                }
              },
              "historical context"
            ),
            _react2.default.createElement(
              "li",
              {
                className: _ContentAndMetadata.classNames.tip,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 73
                }
              },
              "audience"
            )
          )
        )
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _ContentAndMetadata.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      }
    })
  );
};

exports.default = ContentAndMetadata;
