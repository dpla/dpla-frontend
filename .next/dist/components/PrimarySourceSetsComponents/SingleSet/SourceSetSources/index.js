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

var _mockSources = require("../mockSources");

var _mockSources2 = _interopRequireDefault(_mockSources);

var _SourceSetSources = require("./SourceSetSources.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetSources/index.js";


var _module = _utils.classNames.module;

var SourceSetSources = function SourceSetSources(_ref) {
  var route = _ref.route;
  return _react2.default.createElement("div", { className: _SourceSetSources.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("div", { className: [_SourceSetSources.classNames.sourceSetSources, _module].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _mockSources2.default.map(function (_ref2) {
    var title = _ref2.title,
        img = _ref2.img,
        id = _ref2.id,
        setSlug = _ref2.setSlug;
    return _react2.default.createElement(_link2.default, {
      as: "/primary-source-sets/" + setSlug + "/sources/" + id,
      href: {
        pathname: "/primary-source-sets/set/sources",
        query: (0, _assign2.default)({}, route.query, { source: id, set: setSlug })
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }, _react2.default.createElement("a", { className: _SourceSetSources.classNames.set, __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    }, _react2.default.createElement("div", { className: _SourceSetSources.classNames.imageWrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    }, _react2.default.createElement("img", { alt: title, src: img, className: _SourceSetSources.classNames.image, __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    })), _react2.default.createElement("p", { className: _SourceSetSources.classNames.title, __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      }
    }, title)));
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _SourceSetSources.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }));
};

exports.default = SourceSetSources;