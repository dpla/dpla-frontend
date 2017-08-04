"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Sidebar = require("./Sidebar.css");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/components/Sidebar/index.js";

var RelatedResource = function RelatedResource(_ref) {
  var type = _ref.type,
    title = _ref.title,
    image = _ref.image;
  return _react2.default.createElement(
    "div",
    {
      className: _Sidebar2.default.relatedResource,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    _react2.default.createElement("img", {
      alt: title,
      src: image,
      className: _Sidebar2.default.relatedResourceImage,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    }),
    _react2.default.createElement(
      "p",
      {
        className: _Sidebar2.default.relatedResourceTitle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      title
    ),
    _react2.default.createElement(
      "p",
      {
        className: _Sidebar2.default.relatedResourceType,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      },
      type
    )
  );
};

var Sidebar = function Sidebar(_ref2) {
  var image = _ref2.image,
    title = _ref2.title,
    description = _ref2.description;
  return _react2.default.createElement(
    "div",
    {
      className: _Sidebar2.default.sidebar,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _Sidebar2.default.subtopicInfo,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      },
      _react2.default.createElement("img", {
        src: image,
        alt: title,
        className: _Sidebar2.default.image,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }),
      _react2.default.createElement(
        "div",
        {
          className: _Sidebar2.default.subtopicInfoText,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        },
        _react2.default.createElement(
          "h2",
          {
            className: _Sidebar2.default.title,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 17
            }
          },
          title
        ),
        _react2.default.createElement(
          "p",
          {
            className: _Sidebar2.default.description,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            }
          },
          description
        )
      )
    ),
    _react2.default.createElement(
      "h3",
      {
        className: _Sidebar2.default.relatedHeader,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      },
      "You might also enjoy"
    ),
    _react2.default.createElement(
      "div",
      {
        className: _Sidebar2.default.relatedResources,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      },
      _react2.default.createElement(RelatedResource, {
        type: "Exhibition",
        title: "Race to the Moon",
        image: "http://lorempixel.com/140/100/food",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }),
      _react2.default.createElement(RelatedResource, {
        type: "Exhibition",
        title: "Race to the Moon",
        image: "http://lorempixel.com/140/100/food",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      })
    )
  );
};

exports.default = Sidebar;
