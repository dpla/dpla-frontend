"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _MainContent = require("./MainContent.css");

var _MainContent2 = _interopRequireDefault(_MainContent);

var _utils = require("../../../../../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/Topic/components/MainContent/index.js";

var MainContent = function MainContent(_ref) {
  var routerProps = _ref.routerProps,
    topic = _ref.topic;
  return _react2.default.createElement(
    "div",
    {
      className: _MainContent2.default.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _utils.module,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      },
      _react2.default.createElement(
        "h1",
        {
          className: _MainContent2.default.header,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          }
        },
        topic.title
      ),
      _react2.default.createElement(
        "p",
        {
          className: _MainContent2.default.topicDescription,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 11
          }
        },
        topic.description
      ),
      _react2.default.createElement("div", {
        className: _MainContent2.default.divider,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }),
      _react2.default.createElement(
        "ul",
        {
          className: _MainContent2.default.subtopics,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          }
        },
        topic.subtopics.map(function(subtopic) {
          return _react2.default.createElement(
            "li",
            {
              className: _MainContent2.default.subtopic,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              }
            },
            _react2.default.createElement(
              _reactRouterDom.Link,
              {
                to: routerProps.match.url + "/" + subtopic.slug,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 16
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: _MainContent2.default.imageWrapper,
                  style: { backgroundImage: "url(" + subtopic.image + ")" },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: _MainContent2.default.gradientBackground,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 21
                    }
                  },
                  _react2.default.createElement(
                    "div",
                    {
                      className:
                        _MainContent2.default.itemCountAndSubtopicTitle,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 22
                      }
                    },
                    _react2.default.createElement(
                      "p",
                      {
                        className: _MainContent2.default.itemCount,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 23
                        }
                      },
                      subtopic.numberOfItems,
                      " Items"
                    ),
                    _react2.default.createElement(
                      "h3",
                      {
                        className: _MainContent2.default.subtopicTitle,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 26
                        }
                      },
                      subtopic.title
                    )
                  )
                )
              ),
              _react2.default.createElement(
                "p",
                {
                  className: _MainContent2.default.subtopicDescription,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                  }
                },
                subtopic.description
              )
            )
          );
        })
      )
    )
  );
};

exports.default = MainContent;
