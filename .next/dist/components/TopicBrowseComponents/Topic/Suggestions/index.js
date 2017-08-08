"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _Suggestions = require("./Suggestions.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/Topic/Suggestions/index.js";

var _module = _utils.classNames.module;

var mapTypeToClass = function mapTypeToClass(type) {
  if (type === "Exhibition") {
    return _Suggestions.classNames.exhibition;
  } else if (type === "Topic") {
    return _Suggestions.classNames.topic;
  }
};

var Suggestions = function Suggestions(_ref) {
  var suggestions = _ref.suggestions;
  return _react2.default.createElement("div", { className: _Suggestions.classNames.suggestionsWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement("div", { className: [_Suggestions.classNames.suggestions, _module].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement("h3", { className: _Suggestions.classNames.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, "You might also enjoy"), _react2.default.createElement("ul", { className: _Suggestions.classNames.suggestedResources, __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, suggestions.map(function (suggestion) {
    return _react2.default.createElement("li", {
      className: [_Suggestions.classNames.suggestedItem, mapTypeToClass(suggestion.type)].join(" "),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    }, _react2.default.createElement(_link2.default, { to: "browse-by-topic/" + suggestion.slug, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    }, _react2.default.createElement("a", {
      className: _Suggestions.classNames.imageWrapper,
      style: { backgroundImage: "url(" + suggestion.image + ")" },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      }
    }, _react2.default.createElement("div", { className: _Suggestions.classNames.gradientBackground, __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }, _react2.default.createElement("div", { className: _Suggestions.classNames.typeAndTitle, __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    }, _react2.default.createElement("p", { className: _Suggestions.classNames.resourceType, __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    }, suggestion.type), _react2.default.createElement("h3", { className: _Suggestions.classNames.suggestionTitle, __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }, suggestion.title))))));
  }))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Suggestions.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }));
};

exports.default = Suggestions;