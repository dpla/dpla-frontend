"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Sidebar = require("./Sidebar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/Sidebar/index.js";


var RelatedResource = function RelatedResource(_ref) {
  var type = _ref.type,
      title = _ref.title,
      image = _ref.image;
  return _react2.default.createElement("div", { className: _Sidebar.classNames.relatedResource, __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement("img", { alt: title, src: image, className: _Sidebar.classNames.relatedResourceImage, __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), _react2.default.createElement("p", { className: _Sidebar.classNames.relatedResourceTitle, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, title), _react2.default.createElement("p", { className: _Sidebar.classNames.relatedResourceType, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, type));
};

var Sidebar = function Sidebar(_ref2) {
  var image = _ref2.image,
      title = _ref2.title,
      description = _ref2.description;
  return _react2.default.createElement("div", { className: _Sidebar.classNames.sidebar, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement("div", { className: _Sidebar.classNames.subtopicInfo, __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement("img", { src: image, alt: title, className: _Sidebar.classNames.image, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }), _react2.default.createElement("div", { className: _Sidebar.classNames.subtopicInfoText, __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, _react2.default.createElement("h2", { className: _Sidebar.classNames.title, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, title), _react2.default.createElement("p", { className: _Sidebar.classNames.description, __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, description))), _react2.default.createElement("h3", { className: _Sidebar.classNames.relatedHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, "You might also enjoy"), _react2.default.createElement("div", { className: _Sidebar.classNames.relatedResources, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, _react2.default.createElement(RelatedResource, {
    type: "Exhibition",
    title: "Race to the Moon",
    image: "http://lorempixel.com/140/100/food",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }), _react2.default.createElement(RelatedResource, {
    type: "Exhibition",
    title: "Race to the Moon",
    image: "http://lorempixel.com/140/100/food",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Sidebar.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    }
  }));
};

exports.default = Sidebar;