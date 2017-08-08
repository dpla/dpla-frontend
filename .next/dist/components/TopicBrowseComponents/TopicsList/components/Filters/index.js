"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require("react-select/dist/react-select.css");

var _Filters = require("./Filters.css");

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/TopicsList/components/Filters/index.js";

var _module = _utils.classNames.module;

var SortValue = function SortValue(props) {
  return _react2.default.createElement("span", { className: _Filters.classNames.sortValue, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("span", { className: _Filters.classNames.sortByText, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "Sort by "), _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, props.value.label));
};

var Filters = function Filters() {
  return _react2.default.createElement("div", { className: _Filters.classNames.filtersWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement("div", { className: [_module, _Filters.classNames.filters].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement("input", { className: _Filters.classNames.textInput, placeholder: "Filter by title", __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), _react2.default.createElement(_reactSelect2.default, {
    clearable: false,
    searchable: false,
    value: "title",
    className: [_Filters.classNames.select, _Filters.classNames.sortSelect].join(" "),
    valueComponent: SortValue,
    options: [{ value: "title", label: "Title" }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Filters.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }));
};

exports.default = Filters;