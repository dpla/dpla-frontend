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

var _ItemList = require("./ItemList.css");

var _ItemList2 = _interopRequireDefault(_ItemList);

var _ListView = require("../ListView");

var _ListView2 = _interopRequireDefault(_ListView);

var _GridView = require("../GridView");

var _GridView2 = _interopRequireDefault(_GridView);

var _gridViewIcon = require("../../../../../../../../../../images/grid-view-icon.svg");

var _gridViewIcon2 = _interopRequireDefault(_gridViewIcon);

var _listViewIcon = require("../../../../../../../../../../images/list-view-icon.svg");

var _listViewIcon2 = _interopRequireDefault(_listViewIcon);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/TopicBrowseComponents/SubtopicItemsList/components/ItemList/index.js";

var ItemList = (function(_React$Component) {
  (0, _inherits3.default)(ItemList, _React$Component);

  function ItemList() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ItemList);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (_ret = (
      (_temp = (
        (_this = (0, _possibleConstructorReturn3.default)(
          this,
          (_ref =
            ItemList.__proto__ ||
            (0, _getPrototypeOf2.default)(ItemList)).call.apply(
            _ref,
            [this].concat(args)
          )
        )),
        _this
      )),
      (_this.updateView = function(view) {
        return _this.setState({ view: view });
      }),
      _temp
    )), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ItemList, [
    {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.setState({ view: "grid" });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        var items = this.props.items;
        var view = this.state.view;

        return _react2.default.createElement(
          "div",
          {
            className: _ItemList2.default.itemList,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _ItemList2.default.itemListHeader,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 24
              }
            },
            _react2.default.createElement(
              "p",
              {
                className: _ItemList2.default.itemCount,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 25
                }
              },
              items.length,
              " Items"
            ),
            _react2.default.createElement(
              "div",
              {
                className: _ItemList2.default.viewButtons,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 26
                }
              },
              _react2.default.createElement(
                "button",
                {
                  className: [
                    _ItemList2.default.listViewButton,
                    view === "list"
                      ? _ItemList2.default.viewButtonActive
                      : _ItemList2.default.viewButtonInactive
                  ].join(" "),
                  onClick: function onClick() {
                    if (view !== "list") {
                      _this2.updateView("list");
                    }
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 27
                  }
                },
                _react2.default.createElement("img", {
                  className: _ItemList2.default.viewButtonIcon,
                  src: _listViewIcon2.default,
                  alt: "List View",
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                  }
                })
              ),
              _react2.default.createElement(
                "button",
                {
                  className: [
                    _ItemList2.default.gridViewButton,
                    view === "grid"
                      ? _ItemList2.default.viewButtonActive
                      : _ItemList2.default.viewButtonInactive
                  ].join(" "),
                  onClick: function onClick() {
                    if (view !== "grid") {
                      _this2.updateView("grid");
                    }
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                  }
                },
                _react2.default.createElement("img", {
                  className: _ItemList2.default.viewButtonIcon,
                  src: _gridViewIcon2.default,
                  alt: "Grid View",
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                  }
                })
              )
            )
          ),
          view === "grid"
            ? _react2.default.createElement(_GridView2.default, {
                items: items,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 68
                }
              })
            : _react2.default.createElement(_ListView2.default, {
                items: items,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 69
                }
              })
        );
      }
    }
  ]);

  return ItemList;
})(_react2.default.Component);

exports.default = ItemList;
