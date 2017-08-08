"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Header = require("./Header.css");

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Header/index.js";

var _module = _utils.classNames.module;

var Header = function Header() {
  return _react2.default.createElement("div", { className: _Header.classNames.headerWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement("div", { className: [_module, _Header.classNames.headerContent].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("h1", { className: _Header.classNames.headerText, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "Browse By Topic"), _react2.default.createElement("p", { className: _Header.classNames.headerDescription, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "Materials from libraries, archives and museums across the United States, organized by DPLA's content curation staff into easy to navigate sub-topics.")), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Header.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }));
};

exports.default = Header;