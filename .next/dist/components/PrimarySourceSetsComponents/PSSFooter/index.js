"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _PSSFooter = require("./PSSFooter.css");

var _utils = require("../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/PSSFooter/index.js";


var _module = _utils.classNames.module;

var OtherInfo = function OtherInfo() {
  return _react2.default.createElement("div", { className: _PSSFooter.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("div", { className: [_module, _PSSFooter.classNames.otherInfo].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("p", { className: _PSSFooter.classNames.p, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, "These sets were created and reviewed by the teachers on the\xA0"), _react2.default.createElement(_link2.default, { to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement("a", { className: _PSSFooter.classNames.link, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "DPLA's Education Advisory Committee."))), _react2.default.createElement("p", { className: _PSSFooter.classNames.p, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "To give feedback or suggest a Source Set, contact us at\xA0"), _react2.default.createElement("a", { className: _PSSFooter.classNames.link, mailto: "education@dp.la", __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, "education@dp.la"))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _PSSFooter.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }));
};

exports.default = OtherInfo;