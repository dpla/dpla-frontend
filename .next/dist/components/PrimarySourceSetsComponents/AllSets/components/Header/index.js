"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Header = require("./Header.css");

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/AllSets/components/Header/index.js";


var _module = _utils.classNames.module;

var Header = function Header() {
  return _react2.default.createElement("div", { className: _Header.classNames.headerWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("div", { className: [_module, _Header.classNames.headerContent].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("h1", { className: _Header.classNames.headerText, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, "Primary"), _react2.default.createElement("div", { className: _Header.classNames.nowrap, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, "Source Sets")), _react2.default.createElement("p", { className: _Header.classNames.headerDescription, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, "Primary source collections exploring topics in history, literature, and culture developed by educators \u2014 complete with teaching guides for class use.")), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Header.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }));
};

exports.default = Header;