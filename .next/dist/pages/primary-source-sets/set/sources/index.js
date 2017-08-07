"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

var _removeQueryParams = require("../../../../utilFunctions/removeQueryParams");

var _removeQueryParams2 = _interopRequireDefault(_removeQueryParams);

var _mockSource = require("../../../../components/PrimarySourceSetsComponents/Source/mockSource");

var _mockSource2 = _interopRequireDefault(_mockSource);

var _mockSources = require("../../../../components/PrimarySourceSetsComponents/SingleSet/mockSources");

var _mockSources2 = _interopRequireDefault(_mockSources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/set/sources/index.js?entry";


// const getSourceSetURL = url => /(\/[\w-]+\/[\w-]+)\/sources/.exec(url)[1];

var Source = function Source(_ref) {
  var url = _ref.url;
  return _react2.default.createElement(_MainLayout2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement(_BreadcrumbsModule2.default, {
    breadcrumbs: [{
      title: "Primary Source Sets",
      url: {
        pathname: "/primary-source-sets",
        query: (0, _removeQueryParams2.default)(url.query, ["set", "source"])
      }
    }, {
      title: _mockSource2.default.set,
      as: {
        pathname: "/primary-source-sets/" + _mockSource2.default.slug,
        query: (0, _removeQueryParams2.default)(url.query, ["set", "source"])
      },
      url: {
        pathname: "/primary-source-sets/set/",
        query: (0, _assign2.default)({}, url.query, { set: _mockSource2.default.slug })
      }
    }, { title: _mockSource2.default.title, url: "" }],
    route: url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), _react2.default.createElement(_ContentAndMetadata2.default, { source: _mockSource2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    }
  }), _react2.default.createElement(_SourceCarousel2.default, { sources: _mockSources2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }), _react2.default.createElement(_PSSFooter2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }));
};

exports.default = Source;