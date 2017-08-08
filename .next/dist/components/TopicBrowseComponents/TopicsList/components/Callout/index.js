"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Callout = require("./Callout.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Callout/index.js";


var Callout = function Callout(_ref) {
  var topics = _ref.topics;
  return _react2.default.createElement("div", { className: _Callout.classNames.calloutWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement("div", { className: _Callout.classNames.callout, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("h2", { className: _Callout.classNames.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "Enjoying these topics?"), _react2.default.createElement("p", { className: _Callout.classNames.text, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "You might also like our Online Exhibitions.")), _react2.default.createElement(_link2.default, { href: "/exhibitions", __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement("a", { className: _Callout.classNames.link, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "Visit Online Exhibitions"))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Callout.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }));
};

exports.default = Callout;