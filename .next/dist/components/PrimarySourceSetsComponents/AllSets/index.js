"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AllSets = require("./AllSets.css");

var _AllSets2 = _interopRequireDefault(_AllSets);

var _Filters = require("./components/Filters");

var _Filters2 = _interopRequireDefault(_Filters);

var _Header = require("./components/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Sets = require("./components/Sets");

var _Sets2 = _interopRequireDefault(_Sets);

var _mockSets = require("./mockSets");

var _mockSets2 = _interopRequireDefault(_mockSets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/AllSets/index.js";


var AllSets = function AllSets(_ref) {
  var route = _ref.route;
  return _react2.default.createElement("div", { className: _AllSets2.default.allSets, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement(_Header2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement(_Filters2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }), _react2.default.createElement(_Sets2.default, { sets: _mockSets2.default, route: route, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }));
};

exports.default = AllSets;