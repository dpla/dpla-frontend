"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RelatedSets = require("./RelatedSets.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/RelatedSets/index.js";

var _module = _utils.classNames.module;

var mockSets = [
  {
    img: "http://lorempixel.com/400/200/food",
    title: "New York City"
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "Early Chinese Immigration to the US"
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "Mexican Labor and World War II: The Bracero..."
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "The Impact of Television on News Media"
  }
];

var RelatedSets = function RelatedSets() {
  return _react2.default.createElement(
    "div",
    {
      className: _RelatedSets.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [_module, _RelatedSets.classNames.relatedSets].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      },
      _react2.default.createElement(
        "h3",
        {
          className: _RelatedSets.classNames.header,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        },
        "Related Primary Source Sets"
      ),
      _react2.default.createElement(
        "div",
        {
          className: _RelatedSets.classNames.sets,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        },
        mockSets.map(function(_ref) {
          var img = _ref.img,
            title = _ref.title;
          return _react2.default.createElement(
            "div",
            {
              className: _RelatedSets.classNames.set,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              }
            },
            _react2.default.createElement("img", {
              alt: title,
              src: img,
              className: _RelatedSets.classNames.setImage,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 34
              }
            }),
            _react2.default.createElement(
              "p",
              {
                className: _RelatedSets.classNames.title,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 35
                }
              },
              title
            )
          );
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _RelatedSets.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    })
  );
};

exports.default = RelatedSets;
