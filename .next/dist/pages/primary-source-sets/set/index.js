"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MainLayout = require("../../../components/MainLayout");

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _PSSFooter = require("../../../components/PrimarySourceSetsComponents/PSSFooter");

var _PSSFooter2 = _interopRequireDefault(_PSSFooter);

var _BreadcrumbsModule = require("../../../components/PrimarySourceSetsComponents/BreadcrumbsModule");

var _BreadcrumbsModule2 = _interopRequireDefault(_BreadcrumbsModule);

var _SourceSetInfo = require("../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo");

var _SourceSetInfo2 = _interopRequireDefault(_SourceSetInfo);

var _RelatedSets = require("../../../components/PrimarySourceSetsComponents/SingleSet/RelatedSets");

var _RelatedSets2 = _interopRequireDefault(_RelatedSets);

var _ResourcesTabs = require("../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs");

var _ResourcesTabs2 = _interopRequireDefault(_ResourcesTabs);

var _SourceSetSources = require("../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetSources");

var _SourceSetSources2 = _interopRequireDefault(_SourceSetSources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/set/index.js?entry";


var mockSet = {
  title: "Civil War and Reconstruction",
  slug: "civil-war-and-reconstruction"
};

var SingleSet = function SingleSet(props) {
  return _react2.default.createElement(_MainLayout2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement(_BreadcrumbsModule2.default, {
    breadcrumbs: [{ title: "Primary Source Sets", url: "/primary-source-sets" }, { title: mockSet.title, search: "" }],
    showStudentMode: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), _react2.default.createElement(_SourceSetInfo2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }), _react2.default.createElement(_ResourcesTabs2.default, { currentTab: "sourceSet", set: mockSet, __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement(_SourceSetSources2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  })), _react2.default.createElement(_RelatedSets2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }), _react2.default.createElement(_PSSFooter2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }));
};

exports.default = SingleSet;