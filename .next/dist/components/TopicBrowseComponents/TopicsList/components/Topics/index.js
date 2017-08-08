"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Topics = require("./Topics.css");

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Topics/index.js";

var _module = _utils.classNames.module;

var Topics = function Topics(_ref) {
  var topics = _ref.topics;
  return _react2.default.createElement("div", { className: [_module, _Topics.classNames.topicsWrapper].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("ul", { className: _Topics.classNames.topics, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, topics.map(function (topic) {
    return _react2.default.createElement("li", { className: _Topics.classNames.topic, __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }, _react2.default.createElement(_link2.default, {
      as: "/browse-by-topic/" + topic.slug,
      href: "/browse-by-topic/topic?topic=" + topic.slug,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }, _react2.default.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    }, _react2.default.createElement("img", {
      alt: topic.title,
      src: topic.image,
      className: _Topics.classNames.image,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    }), _react2.default.createElement("h3", { className: _Topics.classNames.title, __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    }, topic.title))), topic.isFeatured && _react2.default.createElement("div", { className: _Topics.classNames.ribbon, __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      }
    }, "Featured"), topic.isNew && !topic.isFeatured && _react2.default.createElement("div", { className: _Topics.classNames.ribbon, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }, "New"));
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Topics.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }));
};

exports.default = Topics;