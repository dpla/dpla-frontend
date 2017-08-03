"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MainLayout = require("../../../../components/MainLayout");

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _PSSFooter = require("../../../../components/PrimarySourceSetsComponents/PSSFooter");

var _PSSFooter2 = _interopRequireDefault(_PSSFooter);

var _BreadcrumbsModule = require("../../../../components/PrimarySourceSetsComponents/BreadcrumbsModule");

var _BreadcrumbsModule2 = _interopRequireDefault(_BreadcrumbsModule);

var _ContentAndMetadata = require("../../../../components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata");

var _ContentAndMetadata2 = _interopRequireDefault(_ContentAndMetadata);

var _SourceCarousel = require("../../../../components/PrimarySourceSetsComponents/Source/components/SourceCarousel");

var _SourceCarousel2 = _interopRequireDefault(_SourceCarousel);

var _mockSource = require("../../../../components/PrimarySourceSetsComponents/Source/mockSource");

var _mockSource2 = _interopRequireDefault(_mockSource);

var _mockSources = require("../../../../components/PrimarySourceSetsComponents/SingleSet/mockSources");

var _mockSources2 = _interopRequireDefault(_mockSources);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/set/sources/source.js?entry";

// const getSourceSetURL = url => /(\/[\w-]+\/[\w-]+)\/sources/.exec(url)[1];

var Source = function Source(props) {
  return _react2.default.createElement(
    _MainLayout2.default,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    },
    _react2.default.createElement(_BreadcrumbsModule2.default, {
      breadcrumbs: [
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        {
          title: _mockSource2.default.set,
          url: "",
          search: ""
        },
        { title: _mockSource2.default.title, url: "" }
      ],
      routerProps: props,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    }),
    _react2.default.createElement(_ContentAndMetadata2.default, {
      source: _mockSource2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    }),
    _react2.default.createElement(_SourceCarousel2.default, {
      sources: _mockSources2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      }
    }),
    _react2.default.createElement(_PSSFooter2.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      }
    })
  );
};

exports.default = Source;
