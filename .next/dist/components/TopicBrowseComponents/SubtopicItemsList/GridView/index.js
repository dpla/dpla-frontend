"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _reactMasonryComponent = require("react-masonry-component");

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

var _GridView = require("./GridView.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/GridView/index.js";


var GridView = function GridView(_ref) {
  var items = _ref.items;
  return _react2.default.createElement("div", { className: _GridView.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement("div", { className: _GridView.classNames.gridSizer, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }), _react2.default.createElement(_reactMasonryComponent2.default, {
    elementType: "ul",
    className: _GridView.classNames.grid,
    options: {
      gutter: 5
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, items.map(function (item) {
    return _react2.default.createElement("li", { className: _GridView.classNames.gridItem, __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    }, _react2.default.createElement(_link2.default, { to: item.sourceUrl, __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    }, _react2.default.createElement("a", { className: _GridView.classNames.link, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    }, _react2.default.createElement("img", {
      className: _GridView.classNames.image,
      src: item.image,
      alt: item.description,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    }))));
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _GridView.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }));
};

exports.default = GridView;