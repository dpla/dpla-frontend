"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _ListView = require("./ListView.css");

var _ListView2 = _interopRequireDefault(_ListView);

var _externalLinkBlue = require("../../../../../../../../../../images/external-link-blue.svg");

var _externalLinkBlue2 = _interopRequireDefault(_externalLinkBlue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/components/ListView/index.js";

var ListView = function ListView(_ref) {
  var items = _ref.items;
  return _react2.default.createElement(
    "ul",
    {
      className: _ListView2.default.listView,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    },
    items.map(function(item) {
      return _react2.default.createElement(
        "li",
        {
          className: _ListView2.default.listItem,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 11
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: _ListView2.default.imageWrapper,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 12
            }
          },
          _react2.default.createElement("img", {
            src: item.image,
            alt: item.title,
            className: _ListView2.default.image,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 13
            }
          })
        ),
        _react2.default.createElement(
          "div",
          {
            className: _ListView2.default.itemInfo,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 15
            }
          },
          _react2.default.createElement(
            "span",
            {
              className: _ListView2.default.itemTitle,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 16
              }
            },
            item.title
          ),
          _react2.default.createElement(
            "span",
            {
              className: _ListView2.default.itemType,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 17
              }
            },
            item.type
          ),
          _react2.default.createElement(
            "span",
            {
              className: _ListView2.default.itemAuthor,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 18
              }
            },
            item.author
          ),
          _react2.default.createElement(
            "span",
            {
              className: _ListView2.default.itemDescription,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              }
            },
            item.description
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            {
              to: item.sourceUrl,
              className: _ListView2.default.itemSource,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              }
            },
            _react2.default.createElement(
              "span",
              {
                className: _ListView2.default.itemSourceText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 21
                }
              },
              "Source"
            ),
            _react2.default.createElement("img", {
              className: _ListView2.default.externalLinkIcon,
              src: _externalLinkBlue2.default,
              alt: "",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 22
              }
            })
          )
        )
      );
    })
  );
};

exports.default = ListView;
