"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _MainContent = require("./MainContent.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/Topic/MainContent/index.js";

var _module = _utils.classNames.module;

var MainContent = function MainContent(_ref) {
  var topic = _ref.topic;
  return _react2.default.createElement("div", { className: _MainContent.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("div", { className: _module, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("h1", { className: _MainContent.classNames.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, topic.title), _react2.default.createElement("p", { className: _MainContent.classNames.topicDescription, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, topic.description), _react2.default.createElement("div", { className: _MainContent.classNames.divider, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), _react2.default.createElement("ul", { className: _MainContent.classNames.subtopics, __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, topic.subtopics.map(function (subtopic) {
    return _react2.default.createElement("li", { className: _MainContent.classNames.subtopic, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    }, _react2.default.createElement(_link2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    }, _react2.default.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    }, _react2.default.createElement("div", {
      className: _MainContent.classNames.imageWrapper,
      style: { backgroundImage: "url(" + subtopic.image + ")" },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    }, _react2.default.createElement("div", { className: _MainContent.classNames.gradientBackground, __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    }, _react2.default.createElement("div", { className: _MainContent.classNames.itemCountAndSubtopicTitle, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    }, _react2.default.createElement("p", { className: _MainContent.classNames.itemCount, __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      }
    }, subtopic.numberOfItems, " Items"), _react2.default.createElement("h3", { className: _MainContent.classNames.subtopicTitle, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }, subtopic.title)))), _react2.default.createElement("p", { className: _MainContent.classNames.subtopicDescription, __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }, subtopic.description))));
  }))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _MainContent.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  }));
};

exports.default = MainContent;