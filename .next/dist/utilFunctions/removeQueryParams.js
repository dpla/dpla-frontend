"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeQueryParams = function removeQueryParams(query, paramsToRemove) {
  var dupedQuery = (0, _assign2.default)({}, query);
  paramsToRemove.forEach(function (param) {
    return delete dupedQuery[param];
  });
  return dupedQuery;
};

exports.default = removeQueryParams;