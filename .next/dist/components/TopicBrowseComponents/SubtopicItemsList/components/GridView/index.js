"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _reactMasonryComponent = require("react-masonry-component");

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

var _GridView = require("./GridView.css");

var _GridView2 = _interopRequireDefault(_GridView);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/components/GridView/index.js";

var GridView = function GridView(_ref) {
  var items = _ref.items;
  return _react2.default.createElement(
    "div",
    {
      className: _GridView2.default.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    },
    _react2.default.createElement("div", {
      className: _GridView2.default.gridSizer,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    }),
    _react2.default.createElement(
      _reactMasonryComponent2.default,
      {
        elementType: "ul",
        className: _GridView2.default.grid,
        options: {
          gutter: 5
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      },
      items.map(function(item) {
        return _react2.default.createElement(
          "li",
          {
            className: _GridView2.default.gridItem,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            }
          },
          _react2.default.createElement(
            _reactRouterDom.Link,
            {
              className: _GridView2.default.link,
              to: item.sourceUrl,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              }
            },
            _react2.default.createElement("img", {
              className: _GridView2.default.image,
              src: item.image,
              alt: item.description,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              }
            })
          )
        );
      })
    )
  );
};

exports.default = GridView;
