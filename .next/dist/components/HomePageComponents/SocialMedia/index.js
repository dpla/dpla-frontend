"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _SocialMedia = require("./SocialMedia.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePageComponents/SocialMedia/index.js";

var externalLinkIcon = "static/images/external-link.svg";

var mockImages = [
  { url: "http://lorempixel.com/170/170/food", description: "placeholder" },
  { url: "http://lorempixel.com/170/171/food", description: "placeholder" },
  { url: "http://lorempixel.com/170/172/food", description: "placeholder" },
  { url: "http://lorempixel.com/170/173/food", description: "placeholder" }
];

var Instagram = function Instagram(_ref) {
  var images = _ref.images;
  return _react2.default.createElement(
    "div",
    {
      className: _SocialMedia.classNames.instagram,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    },
    _react2.default.createElement(
      "h1",
      {
        className: _SocialMedia.classNames.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      },
      "On Instagram"
    ),
    _react2.default.createElement(
      "div",
      {
        className: _SocialMedia.classNames.instagramImages,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      },
      images.map(function(_ref2) {
        var url = _ref2.url,
          description = _ref2.description;
        return _react2.default.createElement("img", {
          alt: description,
          className: _SocialMedia.classNames.instagramImage,
          src: url,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        });
      })
    ),
    _react2.default.createElement(
      _link2.default,
      {
        to: "",
        className: _SocialMedia.classNames.visitLink,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      },
      _react2.default.createElement(
        "a",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          }
        },
        _react2.default.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            }
          },
          "Visit @digpublib"
        ),
        _react2.default.createElement("img", {
          className: _SocialMedia.classNames.externalLinkIcon,
          alt: "visit @digpublib",
          src: externalLinkIcon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _SocialMedia.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    })
  );
};

var Twitter = function Twitter(_ref3) {
  var message = _ref3.message,
    time = _ref3.time;
  return _react2.default.createElement(
    "div",
    {
      className: _SocialMedia.classNames.twitter,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    },
    _react2.default.createElement(
      "h1",
      {
        className: _SocialMedia.classNames.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      },
      "On Twitter"
    ),
    _react2.default.createElement("p", {
      className: _SocialMedia.classNames.twitterText,
      dangerouslySetInnerHTML: { __html: message },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      }
    }),
    _react2.default.createElement(
      "p",
      {
        className: _SocialMedia.classNames.twitterDate,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      },
      time
    ),
    _react2.default.createElement(
      _link2.default,
      {
        to: "",
        className: _SocialMedia.classNames.visitLink,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      },
      _react2.default.createElement(
        "a",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          }
        },
        _react2.default.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 52
            }
          },
          "Visit @DPLA"
        ),
        _react2.default.createElement("img", {
          className: _SocialMedia.classNames.externalLinkIcon,
          alt: "visit @DPLA",
          src: externalLinkIcon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 53
          }
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _SocialMedia.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    })
  );
};

var SocialMedia = function SocialMedia() {
  return /* data */ _react2.default.createElement(
    "div",
    {
      className: _SocialMedia.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _SocialMedia.classNames.socialMedia,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      },
      _react2.default.createElement(Twitter, {
        time: "23H AGO",
        message:
          "TODAY: Our friends @internetarchive host a live AMA on their @macfound #100andChange plan to open access to 4M books\u2026",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }),
      _react2.default.createElement(Instagram, {
        images: mockImages,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      })
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _SocialMedia.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      }
    })
  );
};

exports.default = SocialMedia;
