"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SubtopicItemsList = require("./SubtopicItemsList.css");

var _SubtopicItemsList2 = _interopRequireDefault(_SubtopicItemsList);

var _BreadcrumbsAndNav = require("../../components/BreadcrumbsAndNav");

var _BreadcrumbsAndNav2 = _interopRequireDefault(_BreadcrumbsAndNav);

var _Sidebar = require("./components/Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _ItemList = require("./components/ItemList");

var _ItemList2 = _interopRequireDefault(_ItemList);

var _utils = require("../../../../../../css/utils.css");

var _mockSubtopic = require("./mockSubtopic");

var _mockSubtopic2 = _interopRequireDefault(_mockSubtopic);

var _mockItems = require("./mockItems");

var _mockItems2 = _interopRequireDefault(_mockItems);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/index.js";

var SubtopicItemsList = function SubtopicItemsList(props) {
  return _react2.default.createElement(
    "div",
    {
      className: _SubtopicItemsList2.default.subtopicItemsList,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    },
    _react2.default.createElement(_BreadcrumbsAndNav2.default, {
      breadcrumbs: [
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: _mockSubtopic2.default.topicTitle,
          url: "/browse-by-topic/" + _mockSubtopic2.default.topicSlug
        },
        { title: _mockSubtopic2.default.title, url: "" }
      ],
      routerProps: props,
      showNavLinks: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }),
    _react2.default.createElement(
      "div",
      {
        className: [
          _SubtopicItemsList2.default.sidebarAndItemList,
          _utils.module
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      },
      _react2.default.createElement(_Sidebar2.default, {
        title: _mockSubtopic2.default.title,
        description: _mockSubtopic2.default.description,
        image: "http://lorempixel.com/300/200/food",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }),
      _react2.default.createElement(_ItemList2.default, {
        items: _mockItems2.default,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      })
    ),
    _react2.default.createElement(_BreadcrumbsAndNav2.default, {
      breadcrumbs: [
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: _mockSubtopic2.default.topicTitle,
          url: "/browse-by-topic/" + _mockSubtopic2.default.topicSlug
        },
        { title: _mockSubtopic2.default.title, url: "" }
      ],
      routerProps: props,
      showNavLinks: true,
      prevAndNextArrows: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    })
  );
};

exports.default = SubtopicItemsList;
