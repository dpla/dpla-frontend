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

var _OnlineExhibitions = require("./OnlineExhibitions.css");

var _breakpoints = require("../../../css/breakpoints.css");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePageComponents/OnlineExhibitions/index.js";

var smallChevron = "static/images/chevron-thick-orange.svg";
var largeChevron = "static/images/chevron-thin.svg";

var mockExhibitionsData = [
  {
    text: "Building the First Transcontinental Railroad",
    imageUrl: "http://lorempixel.com/334/241/food",
    id: 0,
    isFeatured: true
  },
  {
    text: "Race to the Moon",
    imageUrl: "http://lorempixel.com/334/242/food",
    id: 1,
    isFeatured: false
  },
  {
    text: "In Focus: The Evolution of the Personal Camera",
    imageUrl: "http://lorempixel.com/334/243/food",
    id: 2,
    isFeatured: false
  },
  {
    text: "Design Tenets",
    imageUrl: "http://lorempixel.com/334/244/food",
    id: 2,
    isFeatured: false
  }
];

var NextArrow = function NextArrow(_ref) {
  var onClick = _ref.onClick,
    className = _ref.className;
  return _react2.default.createElement(
    "button",
    {
      className: _OnlineExhibitions.classNames.nextArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_OnlineExhibitions.classNames.nextChevron, className].join(
        " "
      ),
      src: largeChevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
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
      className: _OnlineExhibitions.classNames.prevArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_OnlineExhibitions.classNames.backChevron, className].join(
        " "
      ),
      src: largeChevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      }
    })
  );
};

var OnlineExhibitions = function OnlineExhibitions() {
  return /* data */ _react2.default.createElement(
    "div",
    {
      className: _OnlineExhibitions.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _OnlineExhibitions.classNames.onlineExhibitions,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _OnlineExhibitions.classNames.headerAndBrowse,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          }
        },
        _react2.default.createElement(
          "h1",
          {
            className: _OnlineExhibitions.classNames.header,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            }
          },
          "Online Exhibitions"
        ),
        _react2.default.createElement(
          _link2.default,
          {
            className: _OnlineExhibitions.classNames.browse,
            to: "",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 61
            }
          },
          _react2.default.createElement(
            "a",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 62
              }
            },
            _react2.default.createElement(
              "span",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 63
                }
              },
              "Browse all Exhibitions"
            ),
            _react2.default.createElement("img", {
              alt: "browse exhibitions",
              className: _OnlineExhibitions.classNames.smallChevron,
              src: smallChevron,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 64
              }
            })
          )
        )
      ),
      _react2.default.createElement(
        _reactSlick2.default,
        {
          slidesToShow: 3,
          infinite: false,
          nextArrow: _react2.default.createElement(NextArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 75
            }
          }),
          prevArrow: _react2.default.createElement(PrevArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 76
            }
          }),
          draggable: false,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: parseInt(_breakpoints2.default.smallPx, 10),
              settings: {
                centerMode: true,
                centerPadding: "15.5%",
                slidesToShow: 1.33,
                arrows: false,
                draggable: true
              }
            }
          ],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 72
          }
        },
        mockExhibitionsData.map(function(_ref3) {
          var text = _ref3.text,
            imageUrl = _ref3.imageUrl,
            id = _ref3.id,
            isFeatured = _ref3.isFeatured;
          return _react2.default.createElement(
            "div",
            {
              className: _OnlineExhibitions.classNames.item,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 93
              }
            },
            _react2.default.createElement("img", {
              alt: text,
              className: _OnlineExhibitions.classNames.itemImg,
              src: imageUrl,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 94
              }
            }),
            isFeatured &&
              _react2.default.createElement(
                "div",
                {
                  className: _OnlineExhibitions.classNames.featured,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 95
                  }
                },
                "Featured"
              ),
            _react2.default.createElement(
              "p",
              {
                className: _OnlineExhibitions.classNames.itemText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 96
                }
              },
              text
            )
          );
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _OnlineExhibitions.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      }
    })
  );
};

exports.default = OnlineExhibitions;
