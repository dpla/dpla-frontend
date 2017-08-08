"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require("styled-jsx/style.js");

var _style2 = _interopRequireDefault(_style);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

var _utils = require("../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js";


var _module = _utils.classNames.module;

exports.default = function () {
  return _react2.default.createElement("div", {
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement(_style2.default, {
    styleId: 1456602351,
    css: "body{margin:0;padding:0;font-family:'Source Sans Pro', sans-serif;-webkit-font-smoothing:antialiased}button,input{font-family:\"Source Sans Pro\"}a{color:inherit;-webkit-text-decoration:none;text-decoration:none}button{background:none;border:none;cursor:pointer}ul{list-style:none}p,ul,h1,h2,h3,h4,h5,h6{margin:0;padding:0}.slick-disabled{display:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZdUIsQUFHa0IsQUFDcUIsQUFDaEIsQUFDRSxBQUNBLEFBQ1AsQUFDSSxVQU5lLEFBS0EsSUFDUixDQUp3QixFQUNQLEFBQ2QsSUFKd0QsQUFLNUMsU0FGMEIsQ0FGeEIsZUFFK0Isa0JBSHVELEdBRXhFLGlDQUYrRSIsImZpbGUiOiJjb21wb25lbnRzL0hlYWQvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ZyYW5raWVzaW1tcy9EZXNrdG9wL2RwbGEtZW5kdXNlci1zaXRlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuXG5pbXBvcnQge1xuICBzdHlsZXNoZWV0IGFzIHV0aWxTdHlsZXNoZWV0LFxuICBjbGFzc05hbWVzIGFzIHV0aWxDbGFzc05hbWVzXG59IGZyb20gXCJjc3MvdXRpbHMuY3NzXCI7XG5cbmNvbnN0IHsgbW9kdWxlIH0gPSB1dGlsQ2xhc3NOYW1lcztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT5cbiAgPGRpdj5cbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgYm9keSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLCBzYW5zLXNlcmlmO1xuICAgICAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiwgaW5wdXQge1xuICAgICAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIjtcbiAgICAgIH1cbiAgICAgIGEge1xuICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuICAgICAgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgICB1bCB7XG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICB9XG4gICAgICBwLCB1bCwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgIH1cbiAgICAgIDpnbG9iYWwoLnNsaWNrLWRpc2FibGVkKSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICAgIDxIZWFkPlxuICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCIgLz5cbiAgICAgIDxtZXRhXG4gICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgc2hyaW5rLXRvLWZpdD1ub1wiXG4gICAgICAvPlxuICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwMDAwMDBcIiAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Tb3VyY2UrU2FucytQcm86NDAwLDYwMHxMb3JhOjQwMCw3MDBcIlxuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgdHlwZT1cInRleHQvY3NzXCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NsaWNrLWNhcm91c2VsLzEuNi4wL3NsaWNrLm1pbi5jc3NcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICB0eXBlPVwidGV4dC9jc3NcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2stdGhlbWUubWluLmNzc1wiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIGhyZWY9XCJodHRwczovL3VucGtnLmNvbS9yZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzXCJcbiAgICAgIC8+XG4gICAgICA8dGl0bGU+UmVhY3QgQXBwPC90aXRsZT5cbiAgICA8L0hlYWQ+XG4gICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdXRpbFN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuIl19 */\n/*@ sourceURL=components/Head/index.js */"
  }), _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }, _react2.default.createElement("meta", { charset: "utf-8", "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }), _react2.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    }
  }), _react2.default.createElement("meta", { name: "theme-color", content: "#000000", "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }), _react2.default.createElement("link", {
    href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Lora:400,700",
    rel: "stylesheet",
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }), _react2.default.createElement("link", {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    }
  }), _react2.default.createElement("link", {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    }
  }), _react2.default.createElement("link", {
    rel: "stylesheet",
    href: "https://unpkg.com/react-select/dist/react-select.css",
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    }
  }), _react2.default.createElement("title", {
    "data-jsx": 1456602351,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    }
  }, "React App")), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _utils.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    }
  }));
};