"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Topic = require("./Topic.css");

var _Topic2 = _interopRequireDefault(_Topic);

var _BreadcrumbsAndNav = require("../../components/BreadcrumbsAndNav");

var _BreadcrumbsAndNav2 = _interopRequireDefault(_BreadcrumbsAndNav);

var _MainContent = require("./components/MainContent");

var _MainContent2 = _interopRequireDefault(_MainContent);

var _Suggestions = require("./components/Suggestions");

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _mockTopic = require("./mockTopic");

var _mockTopic2 = _interopRequireDefault(_mockTopic);

var _mockSuggestions = require("./mockSuggestions");

var _mockSuggestions2 = _interopRequireDefault(_mockSuggestions);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/Topic/index.js";

var Topic = function Topic(props) {
  return _react2.default.createElement(
    "div",
    {
      className: _Topic2.default.topic,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    },
    _react2.default.createElement(_BreadcrumbsAndNav2.default, {
      breadcrumbs: [
        { title: "Browse by Topic", url: "/browse-by-topic" },
        { title: _mockTopic2.default.title, url: props.match.url }
      ],
      routerProps: props,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }),
    _react2.default.createElement(_MainContent2.default, {
      routerProps: props,
      topic: _mockTopic2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    }),
    _react2.default.createElement(_Suggestions2.default, {
      suggestions: _mockSuggestions2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    })
  );
};

exports.default = Topic;
