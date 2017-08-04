"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _BreadcrumbsAndNav = require("../../../components/TopicBrowseComponents/BreadcrumbsAndNav");

var _BreadcrumbsAndNav2 = _interopRequireDefault(_BreadcrumbsAndNav);

var _MainContent = require("../../../components/TopicBrowseComponents/Topic/MainContent");

var _MainContent2 = _interopRequireDefault(_MainContent);

var _MainLayout = require("../../../components/MainLayout");

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _Suggestions = require("../../../components/TopicBrowseComponents/Topic/Suggestions");

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _mockTopic = require("../../../components/TopicBrowseComponents/Topic/mockTopic");

var _mockTopic2 = _interopRequireDefault(_mockTopic);

var _mockSuggestions = require("../../../components/TopicBrowseComponents/Topic/mockSuggestions");

var _mockSuggestions2 = _interopRequireDefault(_mockSuggestions);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/browse-by-topic/topic/index.js?entry";

var Topic = function Topic(props) {
  return _react2.default.createElement(
    _MainLayout2.default,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    _react2.default.createElement(_BreadcrumbsAndNav2.default, {
      breadcrumbs: [
        { title: "Browse by Topic", url: "/browse-by-topic" },
        { title: _mockTopic2.default.title, url: "" }
      ],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }),
    _react2.default.createElement(_MainContent2.default, {
      topic: _mockTopic2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    }),
    _react2.default.createElement(_Suggestions2.default, {
      suggestions: _mockSuggestions2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    })
  );
};

exports.default = Topic;
