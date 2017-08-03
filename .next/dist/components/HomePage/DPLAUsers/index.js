"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSlick = require("react-slick");

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _DPLAUsers = require("./DPLAUsers.css");

var _breakpoints = require("../../../css/breakpoints.css");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/DPLAUsers/index.js";

var chevron = "static/images/chevron-thin.svg";

var NextArrow = function NextArrow(_ref) {
  var onClick = _ref.onClick,
    className = _ref.className;
  return _react2.default.createElement(
    "button",
    {
      className: _DPLAUsers.classNames.nextArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_DPLAUsers.classNames.nextChevron, className].join(" "),
      src: chevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
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
      className: _DPLAUsers.classNames.prevArrow,
      onClick: onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    },
    _react2.default.createElement("img", {
      alt: "",
      className: [_DPLAUsers.classNames.backChevron, className].join(" "),
      src: chevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    })
  );
};

var DPLAUsers = function DPLAUsers() {
  return /* data */ _react2.default.createElement(
    "div",
    {
      className: _DPLAUsers.classNames.wrapper,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      }
    },
    _react2.default.createElement(
      "div",
      {
        className: _DPLAUsers.classNames.DPLAUsers,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      },
      _react2.default.createElement(
        "h1",
        {
          className: _DPLAUsers.classNames.header,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        },
        "Who Uses DPLA?"
      ),
      _react2.default.createElement("div", {
        className: _DPLAUsers.classNames.divider,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }),
      _react2.default.createElement(
        _reactSlick2.default,
        {
          slidesToShow: 3,
          infinite: false,
          adaptiveHeight: true,
          nextArrow: _react2.default.createElement(NextArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            }
          }),
          prevArrow: _react2.default.createElement(PrevArrow, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 37
            }
          }),
          draggable: false,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: parseInt(_breakpoints2.default.smallPx, 10),
              settings: {
                centerMode: true,
                centerPadding: "18%",
                slidesToShow: 1.5,
                arrows: false,
                draggable: true
              }
            },
            {
              breakpoint: parseInt(_breakpoints2.default.largePx, 10),
              settings: {
                centerMode: false,
                slidesToShow: 2,
                arrows: true,
                draggable: false
              }
            }
          ],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: [
              _DPLAUsers.classNames.item,
              _DPLAUsers.classNames.learners
            ].join(" "),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.imageDiv,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 63
              }
            },
            _react2.default.createElement("img", {
              alt: "text",
              className: _DPLAUsers.classNames.itemImg,
              src: "http://lorempixel.com/187/211/food",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 64
              }
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.content,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 70
              }
            },
            _react2.default.createElement(
              "h1",
              {
                className: _DPLAUsers.classNames.itemHeader,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 71
                }
              },
              "Lifelong learners"
            ),
            _react2.default.createElement(
              "p",
              {
                className: _DPLAUsers.classNames.text,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 72
                }
              },
              "Lifelong learners will enjoy browsing Exhibitions or using our Topic Browse index to find library artifacts related to their interests."
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: [
              _DPLAUsers.classNames.item,
              _DPLAUsers.classNames.educators
            ].join(" "),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.imageDiv,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 80
              }
            },
            _react2.default.createElement("img", {
              alt: "text",
              className: _DPLAUsers.classNames.itemImg,
              src: "http://lorempixel.com/187/212/food",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 81
              }
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.content,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 87
              }
            },
            _react2.default.createElement(
              "h1",
              {
                className: _DPLAUsers.classNames.itemHeader,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 88
                }
              },
              "Educators"
            ),
            _react2.default.createElement(
              "p",
              {
                className: _DPLAUsers.classNames.text,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 89
                }
              },
              "The DPLA content team creates curated Primary Source Sets, complete with teacher\u2019s notes for use in the classroom."
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: [
              _DPLAUsers.classNames.item,
              _DPLAUsers.classNames.genealogists
            ].join(" "),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 95
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.imageDiv,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 96
              }
            },
            _react2.default.createElement("img", {
              alt: "text",
              className: _DPLAUsers.classNames.itemImg,
              src: "http://lorempixel.com/187/213/food",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 97
              }
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.content,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              }
            },
            _react2.default.createElement(
              "h1",
              {
                className: _DPLAUsers.classNames.itemHeader,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 104
                }
              },
              "Genealogists"
            ),
            _react2.default.createElement(
              "p",
              {
                className: _DPLAUsers.classNames.text,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 105
                }
              },
              "Genealogists and historians enjoy using our search tools and filter controls for finding artifacts related to their family or research topic."
            )
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: [
              _DPLAUsers.classNames.item,
              _DPLAUsers.classNames.researchers
            ].join(" "),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 112
            }
          },
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.imageDiv,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 113
              }
            },
            _react2.default.createElement("img", {
              alt: "text",
              className: _DPLAUsers.classNames.itemImg,
              src: "http://lorempixel.com/187/214/food",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 114
              }
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: _DPLAUsers.classNames.content,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              }
            },
            _react2.default.createElement(
              "h1",
              {
                className: _DPLAUsers.classNames.itemHeader,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 121
                }
              },
              "Researchers"
            ),
            _react2.default.createElement(
              "p",
              {
                className: _DPLAUsers.classNames.text,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 122
                }
              },
              "Researchers Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stand"
            )
          )
        )
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _DPLAUsers.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      }
    })
  );
};

exports.default = DPLAUsers;
