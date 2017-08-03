"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LandingSection = require("../components/HomePage/LandingSection");

var _LandingSection2 = _interopRequireDefault(_LandingSection);

var _OnlineExhibitions = require("../components/HomePage/OnlineExhibitions");

var _OnlineExhibitions2 = _interopRequireDefault(_OnlineExhibitions);

var _PrimarySourceSets = require("../components/HomePage/PrimarySourceSets");

var _PrimarySourceSets2 = _interopRequireDefault(_PrimarySourceSets);

var _DPLAUsers = require("../components/HomePage/DPLAUsers");

var _DPLAUsers2 = _interopRequireDefault(_DPLAUsers);

var _SocialMedia = require("../components/HomePage/SocialMedia");

var _SocialMedia2 = _interopRequireDefault(_SocialMedia);

var _FromTheBlog = require("../components/HomePage/FromTheBlog");

var _FromTheBlog2 = _interopRequireDefault(_FromTheBlog);

var _Home = require("../components/HomePage/Home.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/index.js?entry";


var Home = function Home() {
  return _react2.default.createElement("div", { className: _Home.classNames.home, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement(_LandingSection2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }), _react2.default.createElement(_OnlineExhibitions2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }), _react2.default.createElement(_PrimarySourceSets2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }), _react2.default.createElement(_DPLAUsers2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), _react2.default.createElement(_SocialMedia2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), _react2.default.createElement(_FromTheBlog2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Home.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }));
};

exports.default = Home;