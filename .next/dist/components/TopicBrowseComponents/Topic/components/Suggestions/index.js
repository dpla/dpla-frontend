"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _Suggestions = require("./Suggestions.css");

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _utils = require("../../../../../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/Topic/components/Suggestions/index.js";

var mapTypeToClass = function mapTypeToClass(type) {
  if (type === "Exhibition") {
    return _Suggestions2.default.exhibition;
  } else if (type === "Topic") {
    return _Suggestions2.default.topic;
  }
};

var Suggestions = function Suggestions(_ref) {
  var suggestions = _ref.suggestions;
  return _react2.default.createElement(
    "div",
    {
      className: _Suggestions2.default.suggestionsWrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [_Suggestions2.default.suggestions, _utils.module].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      },
      _react2.default.createElement(
        "h3",
        {
          className: _Suggestions2.default.header,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          }
        },
        "You might also enjoy"
      ),
      _react2.default.createElement(
        "ul",
        {
          className: _Suggestions2.default.suggestedResources,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          }
        },
        suggestions.map(function(suggestion) {
          return _react2.default.createElement(
            "li",
            {
              className: [
                _Suggestions2.default.suggestedItem,
                mapTypeToClass(suggestion.type)
              ].join(" "),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 21
              }
            },
            _react2.default.createElement(
              _reactRouterDom.Link,
              {
                to: "browse-by-topic/" + suggestion.slug,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 27
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: _Suggestions2.default.imageWrapper,
                  style: { backgroundImage: "url(" + suggestion.image + ")" },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 28
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: _Suggestions2.default.gradientBackground,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 32
                    }
                  },
                  _react2.default.createElement(
                    "div",
                    {
                      className: _Suggestions2.default.typeAndTitle,
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 33
                      }
                    },
                    _react2.default.createElement(
                      "p",
                      {
                        className: _Suggestions2.default.resourceType,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 34
                        }
                      },
                      suggestion.type
                    ),
                    _react2.default.createElement(
                      "h3",
                      {
                        className: _Suggestions2.default.suggestionTitle,
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 35
                        }
                      },
                      suggestion.title
                    )
                  )
                )
              )
            )
          );
        })
      )
    )
  );
};

exports.default = Suggestions;
