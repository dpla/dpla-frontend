"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSlick = require("react-slick");

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactRouterDom = require("react-router-dom");

var _OnlineExhibitions = require("./OnlineExhibitions.css");

var _OnlineExhibitions2 = _interopRequireDefault(_OnlineExhibitions);

var _breakpoints = require("../../../css/breakpoints.css");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _chevronThickOrange = require("../../../static/images/chevron-thick-orange.svg");

var _chevronThickOrange2 = _interopRequireDefault(_chevronThickOrange);

var _chevronThin = require("../../../static/images/chevron-thin.svg");

var _chevronThin2 = _interopRequireDefault(_chevronThin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/OnlineExhibitions/index.js";


var mockExhibitionsData = [{
  text: "Building the First Transcontinental Railroad",
  imageUrl: "http://lorempixel.com/334/241/food",
  id: 0,
  isFeatured: true
}, {
  text: "Race to the Moon",
  imageUrl: "http://lorempixel.com/334/242/food",
  id: 1,
  isFeatured: false
}, {
  text: "In Focus: The Evolution of the Personal Camera",
  imageUrl: "http://lorempixel.com/334/243/food",
  id: 2,
  isFeatured: false
}, {
  text: "Design Tenets",
  imageUrl: "http://lorempixel.com/334/244/food",
  id: 2,
  isFeatured: false
}];

var NextArrow = function NextArrow(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className;
  return _react2.default.createElement("button", { className: _OnlineExhibitions2.default.nextArrow, onClick: onClick, __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }, _react2.default.createElement("img", {
    alt: "",
    className: [_OnlineExhibitions2.default.nextChevron, className].join(" "),
    src: _chevronThin2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    }
  }));
};

var PrevArrow = function PrevArrow(_ref2) {
  var onClick = _ref2.onClick,
      className = _ref2.className;
  return _react2.default.createElement("button", { className: _OnlineExhibitions2.default.prevArrow, onClick: onClick, __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    }
  }, _react2.default.createElement("img", {
    alt: "",
    className: [_OnlineExhibitions2.default.backChevron, className].join(" "),
    src: _chevronThin2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }));
};

var OnlineExhibitions = function OnlineExhibitions() {
  return (/* data */_react2.default.createElement("div", { className: _OnlineExhibitions2.default.wrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      }
    }, _react2.default.createElement("div", { className: _OnlineExhibitions2.default.onlineExhibitions, __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      }
    }, _react2.default.createElement("div", { className: _OnlineExhibitions2.default.headerAndBrowse, __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      }
    }, _react2.default.createElement("h1", { className: _OnlineExhibitions2.default.header, __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    }, "Online Exhibitions"), _react2.default.createElement(_reactRouterDom.Link, { className: _OnlineExhibitions2.default.browse, to: "", __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      }
    }, _react2.default.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      }
    }, "Browse all Exhibitions"), _react2.default.createElement("img", {
      alt: "browse exhibitions",
      className: _OnlineExhibitions2.default.smallChevron,
      src: _chevronThickOrange2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      }
    }))), _react2.default.createElement(_reactSlick2.default, {
      slidesToShow: 3,
      infinite: false,
      nextArrow: _react2.default.createElement(NextArrow, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }),
      prevArrow: _react2.default.createElement(PrevArrow, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }),
      draggable: false,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: parseInt(_breakpoints2.default.smallPx, 10),
        settings: {
          centerMode: true,
          centerPadding: "15.5%",
          slidesToShow: 1.33,
          arrows: false,
          draggable: true
        }
      }],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70
      }
    }, mockExhibitionsData.map(function (_ref3) {
      var text = _ref3.text,
          imageUrl = _ref3.imageUrl,
          id = _ref3.id,
          isFeatured = _ref3.isFeatured;
      return _react2.default.createElement("div", { className: _OnlineExhibitions2.default.item, __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, _react2.default.createElement("img", { alt: text, className: _OnlineExhibitions2.default.itemImg, src: imageUrl, __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }), isFeatured && _react2.default.createElement("div", { className: _OnlineExhibitions2.default.featured, __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, "Featured"), _react2.default.createElement("p", { className: _OnlineExhibitions2.default.itemText, __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, text));
    }))))
  );
};

exports.default = OnlineExhibitions;