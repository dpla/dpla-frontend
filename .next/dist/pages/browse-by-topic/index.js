"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MainLayout = require("../../components/MainLayout");

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _TopicsList = require("../../components/TopicBrowseComponents/TopicsList");

var _TopicsList2 = _interopRequireDefault(_TopicsList);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/browse-by-topic/index.js?entry";

var TopicBrowse = function TopicBrowse() {
  return _react2.default.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    },
    _react2.default.createElement(
      _MainLayout2.default,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      _react2.default.createElement(_TopicsList2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      })
    )
  );
};

exports.default = TopicBrowse;
