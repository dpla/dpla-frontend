"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SubtopicItemsList = require("../../../../components/TopicBrowseComponents/SubtopicItemsList/SubtopicItemsList.css");

var _BreadcrumbsAndNav = require("../../../../components/TopicBrowseComponents/BreadcrumbsAndNav");

var _BreadcrumbsAndNav2 = _interopRequireDefault(_BreadcrumbsAndNav);

var _ItemList = require("../../../../components/TopicBrowseComponents/SubtopicItemsList/ItemList");

var _ItemList2 = _interopRequireDefault(_ItemList);

var _MainLayout = require("../../../../components/MainLayout");

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _Sidebar = require("../../../../components/TopicBrowseComponents/SubtopicItemsList/Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _mockSubtopic = require("../../../../components/TopicBrowseComponents/SubtopicItemsList/mockSubtopic");

var _mockSubtopic2 = _interopRequireDefault(_mockSubtopic);

var _mockItems = require("../../../../components/TopicBrowseComponents/SubtopicItemsList/mockItems");

var _mockItems2 = _interopRequireDefault(_mockItems);

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/browse-by-topic/topic/source/index.js?entry";

var _module = _utils.classNames.module;

var SubtopicItemsList = function SubtopicItemsList(props) {
  return _react2.default.createElement(
    _MainLayout2.default,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
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
      showNavLinks: true,
      prevAndNextArrows: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    }),
    _react2.default.createElement(
      "div",
      {
        className: [
          _SubtopicItemsList.classNames.sidebarAndItemList,
          _module
        ].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      },
      _react2.default.createElement(_Sidebar2.default, {
        title: _mockSubtopic2.default.title,
        description: _mockSubtopic2.default.description,
        image: "http://lorempixel.com/300/200/food",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }),
      _react2.default.createElement(_ItemList2.default, {
        items: _mockItems2.default,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
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
      showNavLinks: true,
      prevAndNextArrows: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _SubtopicItemsList.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      }
    })
  );
};

exports.default = SubtopicItemsList;
