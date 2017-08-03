"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MainLayout = require("../../components/MainLayout");

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _AllSets = require("../../components/PrimarySourceSetsComponents/AllSets");

var _AllSets2 = _interopRequireDefault(_AllSets);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/index.js?entry";

var PrimarySourceSets = function PrimarySourceSets(_ref) {
  var match = _ref.match;
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
      _react2.default.createElement(_AllSets2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      })
    )
  );
};

exports.default = PrimarySourceSets;
