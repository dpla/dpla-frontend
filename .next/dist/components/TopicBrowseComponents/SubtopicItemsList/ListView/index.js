"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _ListView = require("./ListView.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/ListView/index.js";

var externalLinkIcon = "/static/images/external-link-blue.svg";

var ListView = function ListView(_ref) {
  var items = _ref.items;
  return _react2.default.createElement("ul", { className: _ListView.classNames.listView, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, items.map(function (item) {
    return _react2.default.createElement("li", { className: _ListView.classNames.listItem, __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    }, _react2.default.createElement("div", { className: _ListView.classNames.imageWrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    }, _react2.default.createElement("img", { src: item.image, alt: item.title, className: _ListView.classNames.image, __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    })), _react2.default.createElement("div", { className: _ListView.classNames.itemInfo, __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }, _react2.default.createElement("span", { className: _ListView.classNames.itemTitle, __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }, item.title), _react2.default.createElement("span", { className: _ListView.classNames.itemType, __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    }, item.type), _react2.default.createElement("span", { className: _ListView.classNames.itemAuthor, __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    }, item.author), _react2.default.createElement("span", { className: _ListView.classNames.itemDescription, __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    }, item.description), _react2.default.createElement(_link2.default, { href: item.sourceUrl, __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    }, _react2.default.createElement("a", { className: _ListView.classNames.itemSource, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    }, _react2.default.createElement("span", { className: _ListView.classNames.itemSourceText, __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      }
    }, "Source"), _react2.default.createElement("img", {
      className: _ListView.classNames.externalLinkIcon,
      src: externalLinkIcon,
      alt: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      }
    })))));
  }), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _ListView.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    }
  }));
};

exports.default = ListView;