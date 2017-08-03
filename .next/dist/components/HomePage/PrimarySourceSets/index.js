"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSlick = require("react-slick");

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _PrimarySourceSets = require("./PrimarySourceSets.css");

var _breakpoints = require("../../../css/breakpoints.css");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/PrimarySourceSets/index.js";

var smallChevron = "static/images/chevron-thick-blue.svg";
var largeChevron = "static/images/chevron-thin.svg";

var mockSourceSets = [
  {
    text: "Road to Revolution",
    imageUrl: "http://lorempixel.com/334/245/food",
    id: 0
  },
  {
    text: "Early Chinese Immigration to the U.S.",
    imageUrl: "http://lorempixel.com/334/246/food",
    id: 1
  },
  {
    text: "Mexican Labor and World War II",
    imageUrl: "http://lorempixel.com/334/247/food",
    id: 2
  },
  {
    text: "The Impact of Television on News Media",
    imageUrl: "http://lorempixel.com/334/248/food",
    id: 2
  }
];

var NextArrow = function NextArrow(_ref) {
  var onClick = _ref.onClick,
    className = _ref.className;
  return _react2.default.createElement(
    "button",
    {
      className: _PrimarySourceSets.classNames.nextArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_PrimarySourceSets.classNames.nextChevron, className].join(
        " "
      ),
      src: largeChevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      }
    })
  );
};

var PrevArrow = function PrevArrow(_ref2) {
  var onClick = _ref2.onClick,
    className = _ref2.className;
  return _react2.default.createElement(
    "button",
    {
      className: _PrimarySourceSets.classNames.prevArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_PrimarySourceSets.classNames.backChevron, className].join(
        " "
      ),
      src: largeChevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    })
  );
};

var PrimarySourceSets = function PrimarySourceSets() {
  return /* data */ _react2.default.createElement(
    "div",
    {
      className: _PrimarySourceSets.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _PrimarySourceSets.classNames.primarySourceSets,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _PrimarySourceSets.classNames.headerAndBrowse,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 55
          }
        },
        _react2.default.createElement(
          "h1",
          {
            className: _PrimarySourceSets.classNames.header,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            }
          },
          "Primary Source Sets for Education"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            className: _PrimarySourceSets.classNames.browse,
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 57
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 58
              }
            },
            _react2.default.createElement(
              "span",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 59
                }
              },
              "Browse all Sets"
            ),
            _react2.default.createElement("img", {
              alt: "browse sets",
              className: _PrimarySourceSets.classNames.smallChevron,
              src: smallChevron,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 60
              }
            })
          )
        )
      ),
      _react2.default.createElement(
        _reactSlick2.default,
        {
          slidesToShow: 4,
          infinite: false,
          nextArrow: _react2.default.createElement(NextArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            }
          }),
          prevArrow: _react2.default.createElement(PrevArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 72
            }
          }),
          draggable: false,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: parseInt(_breakpoints2.default.smallPx, 10),
              settings: {
                centerMode: true,
                centerPadding: "12.5%",
                slidesToShow: 1.25,
                arrows: false,
                draggable: true
              }
            }
          ],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68
          }
        },
        mockSourceSets.map(function(_ref3) {
          var text = _ref3.text,
            imageUrl = _ref3.imageUrl,
            id = _ref3.id;
          return _react2.default.createElement(
            "div",
            {
              className: _PrimarySourceSets.classNames.item,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 89
              }
            },
            _react2.default.createElement("img", {
              alt: text,
              className: _PrimarySourceSets.classNames.itemImg,
              src: imageUrl,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 90
              }
            }),
            _react2.default.createElement(
              "p",
              {
                className: _PrimarySourceSets.classNames.itemText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91
                }
              },
              text
            )
          );
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _PrimarySourceSets.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      }
    })
  );
};

exports.default = PrimarySourceSets;
