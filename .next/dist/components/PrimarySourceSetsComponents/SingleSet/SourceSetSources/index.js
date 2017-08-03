"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _mockSources = require("../mockSources");

var _mockSources2 = _interopRequireDefault(_mockSources);

var _SourceSetSources = require("./SourceSetSources.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetSources/index.js";

var _module = _utils.classNames.module;

var SourceSetSources = function SourceSetSources(_ref) {
  var match = _ref.match,
    location = _ref.location;
  return _react2.default.createElement(
    "div",
    {
      className: _SourceSetSources.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [
          _SourceSetSources.classNames.sourceSetSources,
          _module
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      },
      _mockSources2.default.map(function(_ref2) {
        var title = _ref2.title,
          img = _ref2.img,
          id = _ref2.id;
        return _react2.default.createElement(
          _link2.default,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 15
            }
          },
          _react2.default.createElement(
            "a",
            {
              className: _SourceSetSources.classNames.set,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 16
              }
            },
            _react2.default.createElement(
              "div",
              {
                className: _SourceSetSources.classNames.imageWrapper,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 17
                }
              },
              _react2.default.createElement("img", {
                alt: title,
                src: img,
                className: _SourceSetSources.classNames.image,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 18
                }
              })
            ),
            _react2.default.createElement(
              "p",
              {
                className: _SourceSetSources.classNames.title,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 20
                }
              },
              title
            )
          )
        );
      })
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _SourceSetSources.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    })
  );
};

exports.default = SourceSetSources;
