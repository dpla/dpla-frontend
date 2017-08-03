"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _FromTheBlog = require("./FromTheBlog.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/FromTheBlog/index.js";

var smallChevron = "static/images/chevron-thick-orange.svg";

var mockPosts = [
  {
    headline: "Historypin wins Knight News Challenge award for…",
    date: "June 12, 2017",
    bodyText:
      "Historypin wins Knight News Challenge award to gather, preserve, and measure the…",
    id: 0
  },
  {
    headline: "DPLA and the International Image Interoperability Framew…",
    date: "June 6, 2017",
    bodyText:
      "DPLA, along with representatives of a number of institutions, is presenting at Access to the…",
    id: 1
  },
  {
    headline: "Announcing the launch of RightsStatements.org",
    date: "June 3, 2017",
    bodyText:
      "The Digital Public Library of America and Europeana are proud to announce the launch of…",
    id: 2
  }
];

var FromTheBlog = function FromTheBlog() {
  return /* data */ _react2.default.createElement(
    "div",
    {
      className: _FromTheBlog.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _FromTheBlog.classNames.fromTheBlog,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _FromTheBlog.classNames.header,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        },
        _react2.default.createElement(
          "h1",
          {
            className: _FromTheBlog.classNames.headerText,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            }
          },
          "From the Blog"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 37
            }
          },
          _react2.default.createElement(
            "a",
            {
              className: _FromTheBlog.classNames.headerLink,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              }
            },
            _react2.default.createElement(
              "span",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 39
                }
              },
              "Browse the blog"
            ),
            _react2.default.createElement("img", {
              alt: "browse the blog",
              src: smallChevron,
              className: _FromTheBlog.classNames.chevron,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              }
            })
          )
        )
      ),
      _react2.default.createElement(
        "ul",
        {
          className: _FromTheBlog.classNames.blogPosts,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          }
        },
        mockPosts.map(function(post) {
          return _react2.default.createElement(
            "li",
            {
              key: post.id,
              className: _FromTheBlog.classNames.blogPost,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 50
              }
            },
            _react2.default.createElement(
              _link2.default,
              {
                to: "",
                className: _FromTheBlog.classNames.headline,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 51
                }
              },
              _react2.default.createElement(
                "a",
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                  }
                },
                post.headline
              )
            ),
            _react2.default.createElement(
              "div",
              {
                className: _FromTheBlog.classNames.date,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 56
                }
              },
              post.date
            ),
            _react2.default.createElement(
              "p",
              {
                className: _FromTheBlog.classNames.bodyText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 59
                }
              },
              post.bodyText
            )
          );
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _FromTheBlog.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      }
    })
  );
};

exports.default = FromTheBlog;
