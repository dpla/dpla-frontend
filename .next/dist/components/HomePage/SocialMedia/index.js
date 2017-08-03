"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _SocialMedia = require("./SocialMedia.css");

var _SocialMedia2 = _interopRequireDefault(_SocialMedia);

var _externalLink = require("../../../static/images/external-link.svg");

var _externalLink2 = _interopRequireDefault(_externalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/SocialMedia/index.js";


var mockImages = [{ url: "http://lorempixel.com/170/170/food", description: "placeholder" }, { url: "http://lorempixel.com/170/171/food", description: "placeholder" }, { url: "http://lorempixel.com/170/172/food", description: "placeholder" }, { url: "http://lorempixel.com/170/173/food", description: "placeholder" }];

var Instagram = function Instagram(_ref) {
  var images = _ref.images;
  return _react2.default.createElement("div", { className: _SocialMedia2.default.instagram, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement("h1", { className: _SocialMedia2.default.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, "On Instagram"), _react2.default.createElement("div", { className: _SocialMedia2.default.instagramImages, __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, images.map(function (_ref2) {
    var url = _ref2.url,
        description = _ref2.description;
    return _react2.default.createElement("img", { alt: description, className: _SocialMedia2.default.instagramImage, src: url, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    });
  })), _react2.default.createElement(_reactRouterDom.Link, { to: "", className: _SocialMedia2.default.visitLink, __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, "Visit @digpublib"), _react2.default.createElement("img", {
    className: _SocialMedia2.default.externalLinkIcon,
    alt: "visit @digpublib",
    src: _externalLink2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  })));
};

var Twitter = function Twitter(_ref3) {
  var message = _ref3.message,
      time = _ref3.time;
  return _react2.default.createElement("div", { className: _SocialMedia2.default.twitter, __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  }, _react2.default.createElement("h1", { className: _SocialMedia2.default.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }, "On Twitter"), _react2.default.createElement("p", {
    className: _SocialMedia2.default.twitterText,
    dangerouslySetInnerHTML: { __html: message },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }), _react2.default.createElement("p", { className: _SocialMedia2.default.twitterDate, __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    }
  }, time), _react2.default.createElement(_reactRouterDom.Link, { to: "", className: _SocialMedia2.default.visitLink, __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }, "Visit @DPLA"), _react2.default.createElement("img", {
    className: _SocialMedia2.default.externalLinkIcon,
    alt: "visit @DPLA",
    src: _externalLink2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    }
  })));
};

var SocialMedia = function SocialMedia() {
  return (/* data */_react2.default.createElement("div", { className: _SocialMedia2.default.wrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      }
    }, _react2.default.createElement("div", { className: _SocialMedia2.default.socialMedia, __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      }
    }, _react2.default.createElement(Twitter, {
      time: "23H AGO",
      message: "TODAY: Our friends @internetarchive host a live AMA on their @macfound #100andChange plan to open access to 4M books\u2026",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      }
    }), _react2.default.createElement(Instagram, { images: mockImages, __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    })))
  );
};

exports.default = SocialMedia;