"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _jsxFileName =
  "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Footer/FooterStyles.js";

var FooterStyles = function FooterStyles() {
  return _react2.default.createElement(
    "style",
    {
      jsx: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 4
      }
    },
    "\n    .footer {\n      color: white;\n      background-color: blue;\n      padding: 55px 0 0 0;\n    }\n    .dplaLogo {\n      width: 300px;\n    }\n    .linksAndDonate {\n      display: flex;\n      margin: auto;\n      align-items: baseline;\n      padding: 0 70px 57px;\n    }\n    @media screen and (min-width: 1100px) {\n      .linksAndDonate {\n        padding: 0 0 57px;\n        max-width: 1024px;\n      }\n    }\n    .links {\n      display: flex;\n      font-size: 1.125rem;\n      line-height: 1.5625rem;\n      color: gray75;\n      width: 550px;\n      justify-content: space-between;\n    }\n    .linkHeader {\n      font-weight: 600;\n      font-size: 1.25rem;\n      line-height: 2rem;\n      margin-bottom: 12px;\n      color: white;\n\n    .logoAndSocialWrapper {\n      background-color: midnightBlue;\n\n    .logoAndSocial {\n      margin: auto;\n      display: flex;\n      justify-content: space-between;\n      padding: 33px 57px;\n\n    @media screen and (min-width: 1100px) {\n      .logoAndSocial {\n        padding: 33px 0;\n        max-width: 1024px;\n      }\n    }\n    .social {\n      margin-left: auto;\n    }\n    .donateButton {\n      margin-left: auto;\n      font-weight: 600;\n      color: white;\n      padding: 12px 49px;\n      background-color: bambooOrange;\n      border-radius: 2px;\n      font-size: 1.125rem;\n      line-height: 1.4375rem;\n    }\n    .socialButton {\n      width: 24px;\n      height: 24px;\n      padding-right: 17px;\n    }\n    .socialButton:-last-child {\n      padding: none;\n    }\n  "
  );
};

exports.default = FooterStyles;
