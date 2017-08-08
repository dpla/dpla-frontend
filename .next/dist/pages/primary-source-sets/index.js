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

var _PSSFooter = require("../../components/PrimarySourceSetsComponents/PSSFooter");

var _PSSFooter2 = _interopRequireDefault(_PSSFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/index.js?entry";


var PrimarySourceSets = function PrimarySourceSets(_ref) {
  var url = _ref.url;
  return _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement(_MainLayout2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_AllSets2.default, { route: url, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), _react2.default.createElement(_PSSFooter2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  })));
};

exports.default = PrimarySourceSets;