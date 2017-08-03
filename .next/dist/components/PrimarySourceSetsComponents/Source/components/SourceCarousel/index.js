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

var _SourceCarousel = require("./SourceCarousel.css");

var _breakpoints = require("../../../../../css/breakpoints.css");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _utils = require("../../../../../css/utils.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/Source/components/SourceCarousel/index.js";

var _module = _utils.classNames.module;

var smallChevron = "/static/images/chevron-thick-orange.svg";
var largeChevron = "/static/images/chevron-thin.svg";

var NextArrow = function NextArrow(_ref) {
  var onClick = _ref.onClick,
    className = _ref.className;
  return _react2.default.createElement(
    "button",
    {
      className: _SourceCarousel.classNames.nextArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_SourceCarousel.classNames.nextChevron, className].join(" "),
      src: largeChevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
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
      className: _SourceCarousel.classNames.prevArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_SourceCarousel.classNames.backChevron, className].join(" "),
      src: largeChevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    })
  );
};

var SourceCarousel = function SourceCarousel(_ref3) {
  var sources = _ref3.sources;
  return _react2.default.createElement(
    "div",
    {
      className: _SourceCarousel.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: [_SourceCarousel.classNames.sourceCarousel, _module].join(
          " "
        ),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      },
      _react2.default.createElement(
        "div",
        {
          className: _SourceCarousel.classNames.headerAndNav,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        },
        _react2.default.createElement(
          "h1",
          {
            className: _SourceCarousel.classNames.header,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            }
          },
          _react2.default.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              }
            },
            "Item 2 of 15 in the Primary Source Set "
          ),
          _react2.default.createElement(
            _link2.default,
            {
              to: "",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 37
              }
            },
            _react2.default.createElement(
              "a",
              {
                className: _SourceCarousel.classNames.linkToSourceSet,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 38
                }
              },
              "Women in the Civil War"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: _SourceCarousel.classNames.prevAndNextArrows,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 41
            }
          },
          _react2.default.createElement(
            _link2.default,
            {
              to: "",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 42
              }
            },
            _react2.default.createElement(
              "a",
              {
                className: _SourceCarousel.classNames.nextOrPrevItemArrow,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 43
                }
              },
              _react2.default.createElement("img", {
                alt: "previous item",
                className: [
                  _SourceCarousel.classNames.smallChevron,
                  _SourceCarousel.classNames.prevItemArrow
                ].join(" "),
                src: smallChevron,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 44
                }
              }),
              _react2.default.createElement(
                "span",
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                  }
                },
                "Previous Item"
              )
            )
          ),
          _react2.default.createElement(
            _link2.default,
            {
              to: "",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 55
              }
            },
            _react2.default.createElement(
              "a",
              {
                className: _SourceCarousel.classNames.nextOrPrevItemArrow,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 56
                }
              },
              _react2.default.createElement(
                "span",
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                  }
                },
                "Next Item"
              ),
              _react2.default.createElement("img", {
                alt: "next item",
                className: _SourceCarousel.classNames.smallChevron,
                src: smallChevron,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 58
                }
              })
            )
          )
        )
      ),
      _react2.default.createElement(
        _reactSlick2.default,
        {
          slidesToShow: 6,
          infinite: false,
          nextArrow: _react2.default.createElement(NextArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            }
          }),
          prevArrow: _react2.default.createElement(PrevArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
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
            lineNumber: 67
          }
        },
        sources.map(function(_ref4) {
          var title = _ref4.title,
            img = _ref4.img,
            id = _ref4.id;
          return _react2.default.createElement(
            "div",
            {
              className: _SourceCarousel.classNames.item,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 88
              }
            },
            _react2.default.createElement("img", {
              alt: title,
              className: _SourceCarousel.classNames.itemImg,
              src: img,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 89
              }
            }),
            _react2.default.createElement(
              "p",
              {
                className: _SourceCarousel.classNames.itemText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 90
                }
              },
              title
            )
          );
        })
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _SourceCarousel.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97
      }
    })
  );
};

exports.default = SourceCarousel;
