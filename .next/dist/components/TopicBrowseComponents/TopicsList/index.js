"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TopicsList = require("./TopicsList.css");

var _TopicsList2 = _interopRequireDefault(_TopicsList);

var _Filters = require("./components/Filters");

var _Filters2 = _interopRequireDefault(_Filters);

var _Header = require("./components/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Topics = require("./components/Topics");

var _Topics2 = _interopRequireDefault(_Topics);

var _Callout = require("./components/Callout");

var _Callout2 = _interopRequireDefault(_Callout);

var _mockTopics = require("./mockTopics");

var _mockTopics2 = _interopRequireDefault(_mockTopics);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/index.js";

var TopicsList = function TopicsList(props) {
  return _react2.default.createElement(
    "div",
    {
      className: _TopicsList2.default.allTopics,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    },
    _react2.default.createElement(_Header2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }),
    _react2.default.createElement(_Filters2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }),
    _react2.default.createElement(_Topics2.default, {
      topics: _mockTopics2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    }),
    _react2.default.createElement(_Callout2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    })
  );
};

exports.default = TopicsList;
