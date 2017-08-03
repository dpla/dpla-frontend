"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _FromTheBlog = require("./FromTheBlog.css");

var _FromTheBlog2 = _interopRequireDefault(_FromTheBlog);

var _chevronThickOrange = require("../../../static/images/chevron-thick-orange.svg");

var _chevronThickOrange2 = _interopRequireDefault(_chevronThickOrange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/HomePage/FromTheBlog/index.js";


var mockPosts = [{
  headline: "Historypin wins Knight News Challenge award for…",
  date: "June 12, 2017",
  bodyText: "Historypin wins Knight News Challenge award to gather, preserve, and measure the…",
  id: 0
}, {
  headline: "DPLA and the International Image Interoperability Framew…",
  date: "June 6, 2017",
  bodyText: "DPLA, along with representatives of a number of institutions, is presenting at Access to the…",
  id: 1
}, {
  headline: "Announcing the launch of RightsStatements.org",
  date: "June 3, 2017",
  bodyText: "The Digital Public Library of America and Europeana are proud to announce the launch of…",
  id: 2
}];

var FromTheBlog = function FromTheBlog() {
  return (/* data */_react2.default.createElement("div", { className: _FromTheBlog2.default.wrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }, _react2.default.createElement("div", { className: _FromTheBlog2.default.fromTheBlog, __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    }, _react2.default.createElement("div", { className: _FromTheBlog2.default.header, __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    }, _react2.default.createElement("h1", { className: _FromTheBlog2.default.headerText, __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      }
    }, "From the Blog"), _react2.default.createElement(_reactRouterDom.Link, { to: "", className: _FromTheBlog2.default.headerLink, __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    }, _react2.default.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }, "Browse the blog"), _react2.default.createElement("img", {
      alt: "browse the blog",
      src: _chevronThickOrange2.default,
      className: _FromTheBlog2.default.chevron,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }))), _react2.default.createElement("ul", { className: _FromTheBlog2.default.blogPosts, __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      }
    }, mockPosts.map(function (post) {
      return _react2.default.createElement("li", { key: post.id, className: _FromTheBlog2.default.blogPost, __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, _react2.default.createElement(_reactRouterDom.Link, { to: "", className: _FromTheBlog2.default.headline, __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, post.headline), _react2.default.createElement("div", { className: _FromTheBlog2.default.date, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, post.date), _react2.default.createElement("p", { className: _FromTheBlog2.default.bodyText, __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, post.bodyText));
    }))))
  );
};

exports.default = FromTheBlog;