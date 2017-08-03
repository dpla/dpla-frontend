"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _ResourcesTabs = require("./ResourcesTabs.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs/index.js";

var _module = _utils.classNames.module;

// import SourceSetSources from "../SourceSetSources";
// import TeachingGuide from "../TeachingGuide";

var ResourcesTabs = (function(_React$Component) {
  (0, _inherits3.default)(ResourcesTabs, _React$Component);

  function ResourcesTabs() {
    (0, _classCallCheck3.default)(this, ResourcesTabs);

    return (0, _possibleConstructorReturn3.default)(
      this,
      (ResourcesTabs.__proto__ || (0, _getPrototypeOf2.default)(ResourcesTabs))
        .apply(this, arguments)
    );
  }

  (0, _createClass3.default)(ResourcesTabs, [
    {
      key: "componentWillMount",
      value: function componentWillMount() {
        // const { location, history } = this.props.routerProps;
        // const isStudentMode = location.search.includes("student");
        // if (/\/primary-source-sets\/.+\/teaching-guide/.exec(location.pathname)) {
        //   if (isStudentMode) {
        //     history.push(`${location.pathname}`);
        //   }
        //   this.setState({ currentTab: "teachingGuide" });
        // } else if (
        //   /\/primary-source-sets\/.+\/additional-resources/.exec(location.pathname)
        // ) {
        //   this.setState({ currentTab: "additionalResources" });
        // } else {
        //   this.setState({ currentTab: "sourceSet" });
        // }

        this.setState({ studentMode: false });
      }
    },
    {
      key: "onTabChange",
      value: function onTabChange(newTab) {
        this.setState({ currentTab: newTab });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        var isStudentMode = false;

        return _react2.default.createElement(
          "div",
          {
            className: _ResourcesTabs.classNames.wrapper,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 40
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _ResourcesTabs.classNames.tabsWrapper,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 41
              }
            },
            _react2.default.createElement(
              "div",
              {
                className: [_ResourcesTabs.classNames.tabs, _module].join(" "),
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 42
                }
              },
              _react2.default.createElement(
                _link2.default,
                {
                  onClick: function onClick() {
                    return _this2.onTabChange("sourceSet");
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                  }
                },
                _react2.default.createElement(
                  "a",
                  {
                    className: [
                      _ResourcesTabs.classNames.tab,
                      _ResourcesTabs.classNames.activeTab
                    ].join(" "),
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 44
                    }
                  },
                  "Source Set"
                )
              ),
              _react2.default.createElement(
                _link2.default,
                {
                  onClick: function onClick() {
                    return _this2.onTabChange("additionalResources");
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                  }
                },
                _react2.default.createElement(
                  "a",
                  {
                    className: [
                      _ResourcesTabs.classNames.tab,
                      this.state.currentTab === "additionalResources" &&
                        _ResourcesTabs.classNames.activeTab
                    ].join(" "),
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 49
                    }
                  },
                  "Additional Resources"
                )
              ),
              !isStudentMode &&
                _react2.default.createElement(
                  _link2.default,
                  {
                    onClick: function onClick() {
                      return _this2.onTabChange("teachingGuide");
                    },
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 60
                    }
                  },
                  _react2.default.createElement(
                    "a",
                    {
                      className: [
                        _ResourcesTabs.classNames.tab,
                        this.state.currentTab === "teachingGuide" &&
                          _ResourcesTabs.classNames.activeTab
                      ].join(" "),
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 61
                      }
                    },
                    "Teaching Guide"
                  )
                )
            )
          ),
          this.props.children,
          _react2.default.createElement("style", {
            dangerouslySetInnerHTML: { __html: _ResourcesTabs.stylesheet },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            }
          })
        );
      }
    }
  ]);

  return ResourcesTabs;
})(_react2.default.Component);

exports.default = ResourcesTabs;
