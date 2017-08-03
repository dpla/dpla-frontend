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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js";

var _module = _utils.classNames.module;

exports.default = function() {
  return _react2.default.createElement(
    "div",
    {
      "data-jsx": 2558384623,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    _react2.default.createElement(_style2.default, {
      styleId: 2558384623,
      css:
        "body{margin:0;padding:0;font-family:'Source Sans Pro', sans-serif;-webkit-font-smoothing:antialiased}button,input{font-family:\"Source Sans Pro\"}a{color:inherit;-webkit-text-decoration:none;text-decoration:none}button{background:none;border:none;cursor:pointer}ul{list-style:none}p,ul,h1,h2,h3,h4,h5,h6{margin:0;padding:0}.slick-disabled{display:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZdUIsQUFHa0IsQUFFcUIsQUFDaEIsQUFDRSxBQUNBLEFBUVAsQUFDSSxVQWRlLEFBYUEsSUFDUixDQVh3QixFQUNQLEFBQ2QsSUFMd0QsQUFhNUMsU0FUMEIsQ0FGeEIsZUFFK0Isa0JBSnVELEdBR3hFLGlDQUgrRSIsImZpbGUiOiJjb21wb25lbnRzL0hlYWQvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ZyYW5raWVzaW1tcy9EZXNrdG9wL2RwbGEtZW5kdXNlci1zaXRlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuXG5pbXBvcnQge1xuICBzdHlsZXNoZWV0IGFzIHV0aWxTdHlsZXNoZWV0LFxuICBjbGFzc05hbWVzIGFzIHV0aWxDbGFzc05hbWVzXG59IGZyb20gXCJjc3MvdXRpbHMuY3NzXCI7XG5cbmNvbnN0IHsgbW9kdWxlIH0gPSB1dGlsQ2xhc3NOYW1lcztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT5cbiAgPGRpdj5cbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgYm9keSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLCBzYW5zLXNlcmlmO1xuICAgICAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbixcbiAgICAgIGlucHV0IHtcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCI7XG4gICAgICB9XG4gICAgICBhIHtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuICAgICAgdWwge1xuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgfVxuICAgICAgcCxcbiAgICAgIHVsLFxuICAgICAgaDEsXG4gICAgICBoMixcbiAgICAgIGgzLFxuICAgICAgaDQsXG4gICAgICBoNSxcbiAgICAgIGg2IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgfVxuICAgICAgOmdsb2JhbCguc2xpY2stZGlzYWJsZWQpIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gICAgPEhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIiAvPlxuICAgICAgPG1ldGFcbiAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgICAgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBzaHJpbmstdG8tZml0PW5vXCJcbiAgICAgIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiIzAwMDAwMFwiIC8+XG4gICAgICA8bGlua1xuICAgICAgICBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNvdXJjZStTYW5zK1Bybzo0MDAsNjAwfExvcmE6NDAwLDcwMFwiXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICB0eXBlPVwidGV4dC9jc3NcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2subWluLmNzc1wiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0L2Nzc1wiXG4gICAgICAgIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay10aGVtZS5taW4uY3NzXCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vdW5wa2cuY29tL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3NcIlxuICAgICAgLz5cbiAgICAgIDx0aXRsZT5SZWFjdCBBcHA8L3RpdGxlPlxuICAgIDwvSGVhZD5cbiAgICA8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiB1dGlsU3R5bGVzaGVldCB9fSAvPlxuICA8L2Rpdj47XG4iXX0= */\n/*@ sourceURL=components/Head/index.js */"
    }),
    _react2.default.createElement(
      _head2.default,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      },
      _react2.default.createElement("meta", {
        charset: "utf-8",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }),
      _react2.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }),
      _react2.default.createElement("meta", {
        name: "theme-color",
        content: "#000000",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }),
      _react2.default.createElement("link", {
        href:
          "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Lora:400,700",
        rel: "stylesheet",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }),
      _react2.default.createElement("link", {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }),
      _react2.default.createElement("link", {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }),
      _react2.default.createElement("link", {
        rel: "stylesheet",
        href: "https://unpkg.com/react-select/dist/react-select.css",
        "data-jsx": 2558384623,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }),
      _react2.default.createElement(
        "title",
        {
          "data-jsx": 2558384623,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 76
          }
        },
        "React App"
      )
    ),
    _react2.default.createElement("style", {
      dangerouslySetInnerHTML: { __html: _utils.stylesheet },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      }
    })
  );
};
