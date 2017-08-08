"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Sets = require("./Sets.css");

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/AllSets/components/Sets/index.js";


var _module = _utils.classNames.module;

var Sets = function Sets(_ref) {
  var sets = _ref.sets,
      route = _ref.route;
  return _react2.default.createElement("div", { className: [_module, _Sets.classNames.setsWrapper].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("ul", { className: _Sets.classNames.sets, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, sets.map(function (set) {
    return _react2.default.createElement("li", { className: _Sets.classNames.set, __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }, _react2.default.createElement(_link2.default, {
      href: {
        pathname: "/primary-source-sets/set",
        query: (0, _assign2.default)({}, route.query, { set: set.slug })
      },
      as: {
        pathname: "/primary-source-sets/" + set.slug,
        query: route.query
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }, _react2.default.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    }, _react2.default.createElement("img", {
      alt: set.title,
      src: set.image,
      className: _Sets.classNames.image,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      }
    }))), _react2.default.createElement("p", { className: _Sets.classNames.itemCount, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }, "65 Items"), _react2.default.createElement(_link2.default, {
      href: "/primary-source-sets/set?set=" + set.slug,
      as: "/primary-source-sets/" + set.slug,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }, _react2.default.createElement("a", { className: _Sets.classNames.title, __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    }, set.title)), _react2.default.createElement("p", { className: _Sets.classNames.subtitle, __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    }, set.subtitle), _react2.default.createElement("ul", { className: _Sets.classNames.tags, __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }, set.tags.map(function (tag, i) {
      return _react2.default.createElement("li", { className: _Sets.classNames.tag, __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, _react2.default.createElement(_link2.default, { href: "", __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, tag), i < set.tags.length - 1 && _react2.default.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, ",\xA0"));
    })));
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Sets.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    }
  }));
};

exports.default = Sets;