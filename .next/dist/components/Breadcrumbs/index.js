"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Breadcrumbs = require("./Breadcrumbs.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Breadcrumbs/index.js";

var chevron = "/static/images/chevron-thick-orange.svg";

var Breadcrumbs = function Breadcrumbs(_ref) {
  var breadcrumbs = _ref.breadcrumbs;
  return _react2.default.createElement(
    "div",
    {
      className: _Breadcrumbs.classNames.breadcrumbs,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    },
    breadcrumbs.map(function(breadcrumb, idx) {
      if (idx < breadcrumbs.length - 1) {
        return _react2.default.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 12
            }
          },
          _react2.default.createElement(
            _link2.default,
            {
              to: {
                pathname: breadcrumb.url,
                search: breadcrumb.search
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 13
              }
            },
            _react2.default.createElement(
              "a",
              {
                className: _Breadcrumbs.classNames.breadcrumbLink,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 19
                }
              },
              breadcrumb.title
            )
          ),
          _react2.default.createElement("img", {
            alt: "",
            src: chevron,
            className: _Breadcrumbs.classNames.chevron,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            }
          })
        );
      } else {
        return _react2.default.createElement(
          "span",
          {
            className: _Breadcrumbs.classNames.activeBreadcrumb,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28
            }
          },
          breadcrumb.title
        );
      }
    }),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _Breadcrumbs.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    })
  );
};

exports.default = Breadcrumbs;
