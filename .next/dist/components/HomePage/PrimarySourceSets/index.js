"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSlick = require("react-slick");

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactRouterDom = require("react-router-dom");

var _PrimarySourceSets = require("./PrimarySourceSets.css");

var _PrimarySourceSets2 = _interopRequireDefault(_PrimarySourceSets);

var _breakpoints = require("../../../css/breakpoints.css");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _chevronThickBlue = require("../../../static/images/chevron-thick-blue.svg");

var _chevronThickBlue2 = _interopRequireDefault(_chevronThickBlue);

var _chevronThin = require("../../../static/images/chevron-thin.svg");

var _chevronThin2 = _interopRequireDefault(_chevronThin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/PrimarySourceSets/index.js";


var mockSourceSets = [{
  text: "Road to Revolution",
  imageUrl: "http://lorempixel.com/334/245/food",
  id: 0
}, {
  text: "Early Chinese Immigration to the U.S.",
  imageUrl: "http://lorempixel.com/334/246/food",
  id: 1
}, {
  text: "Mexican Labor and World War II",
  imageUrl: "http://lorempixel.com/334/247/food",
  id: 2
}, {
  text: "The Impact of Television on News Media",
  imageUrl: "http://lorempixel.com/334/248/food",
  id: 2
}];

var NextArrow = function NextArrow(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className;
  return _react2.default.createElement("button", { className: _PrimarySourceSets2.default.nextArrow, onClick: onClick, __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }, _react2.default.createElement("img", {
    alt: "",
    className: [_PrimarySourceSets2.default.nextChevron, className].join(" "),
    src: _chevronThin2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }));
};

var PrevArrow = function PrevArrow(_ref2) {
  var onClick = _ref2.onClick,
      className = _ref2.className;
  return _react2.default.createElement("button", { className: _PrimarySourceSets2.default.prevArrow, onClick: onClick, __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }, _react2.default.createElement("img", {
    alt: "",
    className: [_PrimarySourceSets2.default.backChevron, className].join(" "),
    src: _chevronThin2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    }
  }));
};

var PrimarySourceSets = function PrimarySourceSets() {
  return (/* data */_react2.default.createElement("div", { className: _PrimarySourceSets2.default.wrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      }
    }, _react2.default.createElement("div", { className: _PrimarySourceSets2.default.primarySourceSets, __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      }
    }, _react2.default.createElement("div", { className: _PrimarySourceSets2.default.headerAndBrowse, __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      }
    }, _react2.default.createElement("h1", { className: _PrimarySourceSets2.default.header, __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      }
    }, "Primary Source Sets for Education"), _react2.default.createElement(_reactRouterDom.Link, { className: _PrimarySourceSets2.default.browse, to: "", __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      }
    }, _react2.default.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      }
    }, "Browse all Sets"), _react2.default.createElement("img", {
      alt: "browse sets",
      className: _PrimarySourceSets2.default.smallChevron,
      src: _chevronThickBlue2.default,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      }
    }))), _react2.default.createElement(_reactSlick2.default, {
      slidesToShow: 4,
      infinite: false,
      nextArrow: _react2.default.createElement(NextArrow, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }),
      prevArrow: _react2.default.createElement(PrevArrow, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }),
      draggable: false,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: parseInt(_breakpoints2.default.smallPx, 10),
        settings: {
          centerMode: true,
          centerPadding: "12.5%",
          slidesToShow: 1.25,
          arrows: false,
          draggable: true
        }
      }],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      }
    }, mockSourceSets.map(function (_ref3) {
      var text = _ref3.text,
          imageUrl = _ref3.imageUrl,
          id = _ref3.id;
      return _react2.default.createElement("div", { className: _PrimarySourceSets2.default.item, __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, _react2.default.createElement("img", { alt: text, className: _PrimarySourceSets2.default.itemImg, src: imageUrl, __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }), _react2.default.createElement("p", { className: _PrimarySourceSets2.default.itemText, __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }, text));
    }))))
  );
};

exports.default = PrimarySourceSets;