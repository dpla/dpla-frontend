"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LandingSection = require("./LandingSection.css");

var _LandingSection2 = _interopRequireDefault(_LandingSection);

var _reactRouterDom = require("react-router-dom");

var _dplaLogo = require("../../../static/images/dpla-logo.svg");

var _dplaLogo2 = _interopRequireDefault(_dplaLogo);

var _search = require("../../../static/images/search.svg");

var _search2 = _interopRequireDefault(_search);

var _chevronThickDarkBlue = require("../../../static/images/chevron-thick-dark-blue.svg");

var _chevronThickDarkBlue2 = _interopRequireDefault(_chevronThickDarkBlue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/LandingSection/index.js";


var LandingSection = function LandingSection() {
  return _react2.default.createElement("div", { className: _LandingSection2.default.home, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement("div", { className: _LandingSection2.default.logoAndDonate, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("img", { className: _LandingSection2.default.dplaLogo, alt: "DPLA", src: _dplaLogo2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement("button", { className: _LandingSection2.default.donateButton, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, "Donate")), _react2.default.createElement("div", { className: _LandingSection2.default.content, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement("p", { className: _LandingSection2.default.text, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, "A collection of 16,340,976 free digital artifacts from over 120 libraries, archives and museums"), _react2.default.createElement("div", { className: _LandingSection2.default.search, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement("input", {
    className: _LandingSection2.default.searchInput,
    placeholder: "Search the collection",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }), _react2.default.createElement("div", { className: _LandingSection2.default.searchOptions, __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, "All types"), _react2.default.createElement("img", { alt: "select types", className: _LandingSection2.default.chevron, src: _chevronThickDarkBlue2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  })), _react2.default.createElement("button", { className: _LandingSection2.default.searchButton, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, _react2.default.createElement("img", { alt: "search", className: _LandingSection2.default.searchIcon, src: _search2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }), _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, "Search"))), _react2.default.createElement("div", { className: _LandingSection2.default.links, __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }, _react2.default.createElement(_reactRouterDom.Link, { className: _LandingSection2.default.link, to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, "Browse by Topic"), _react2.default.createElement(_reactRouterDom.Link, { className: _LandingSection2.default.link, to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }, "New? Start Here"))));
};

exports.default = LandingSection;