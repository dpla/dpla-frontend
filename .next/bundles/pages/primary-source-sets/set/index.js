
          window.__NEXT_REGISTER_PAGE('/primary-source-sets/set', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 542:
/***/ (function(module, exports) {

module.exports = {classNames: {"module":"utils__module___2EEya"},stylesheet: `.utils__module___2EEya{padding:30px 25px;margin:auto}@media (min-width:smallRem){.utils__module___2EEya{padding:30px 50px}}@media (min-width:mediumRem){.utils__module___2EEya{padding:30px 70px}}@media screen and (min-width:1100px){.utils__module___2EEya{padding:30px 0;max-width:1024px}}`}

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _MainLayout = __webpack_require__(579);

var _MainLayout2 = _interopRequireDefault(_MainLayout);

var _PSSFooter = __webpack_require__(582);

var _PSSFooter2 = _interopRequireDefault(_PSSFooter);

var _BreadcrumbsModule = __webpack_require__(581);

var _BreadcrumbsModule2 = _interopRequireDefault(_BreadcrumbsModule);

var _SourceSetInfo = __webpack_require__(585);

var _SourceSetInfo2 = _interopRequireDefault(_SourceSetInfo);

var _RelatedSets = __webpack_require__(583);

var _RelatedSets2 = _interopRequireDefault(_RelatedSets);

var _ResourcesTabs = __webpack_require__(584);

var _ResourcesTabs2 = _interopRequireDefault(_ResourcesTabs);

var _SourceSetSources = __webpack_require__(586);

var _SourceSetSources2 = _interopRequireDefault(_SourceSetSources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/set/index.js?entry";


var mockSet = {
  title: "Civil War and Reconstruction",
  slug: "civil-war-and-reconstruction"
};

var SingleSet = function SingleSet(props) {
  return _react2.default.createElement(_MainLayout2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement(_BreadcrumbsModule2.default, {
    breadcrumbs: [{ title: "Primary Source Sets", url: "/primary-source-sets" }, { title: mockSet.title, search: "" }],
    showStudentMode: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), _react2.default.createElement(_SourceSetInfo2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }), _react2.default.createElement(_ResourcesTabs2.default, { currentTab: "sourceSet", set: mockSet, __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement(_SourceSetSources2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  })), _react2.default.createElement(_RelatedSets2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }), _react2.default.createElement(_PSSFooter2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }));
};

exports.default = SingleSet;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/set/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/pages/primary-source-sets/set/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(85)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/primary-source-sets/set")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 561:
/***/ (function(module, exports) {

module.exports = {classNames: {"bambooOrange":"#dd5c00","activeBreadcrumb":"Breadcrumbs__activeBreadcrumb___1yH3d","breadcrumbLink":"Breadcrumbs__breadcrumbLink___2RtVR","chevron":"Breadcrumbs__chevron___-t3M8"},stylesheet: `.Breadcrumbs__activeBreadcrumb___1yH3d,.Breadcrumbs__breadcrumbLink___2RtVR{display:inline-block;max-width:215px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.Breadcrumbs__breadcrumbLink___2RtVR{color:#dd5c00;border-bottom:1px solid #dd5c00}.Breadcrumbs__chevron___-t3M8{height:9px;padding:0 11px;position:relative;top:-5px}`}

/***/ }),

/***/ 562:
/***/ (function(module, exports) {

module.exports = {classNames: {"minuitBlue":"#232f3c","ebonyClayBlue":"#273443","bambooOrange":"#dd5c00","gray75":"hsla(0,0%,100%,.75)","footer":"Footer__footer___3vgfn","dplaLogo":"Footer__dplaLogo___THn6S","linksAndDonate":"Footer__linksAndDonate___2Xpv5","links":"Footer__links___3-m2I","linkHeader":"Footer__linkHeader___24ttN","logoAndSocialWrapper":"Footer__logoAndSocialWrapper___1bZ0U","logoAndSocial":"Footer__logoAndSocial___8o9Y3","social":"Footer__social___1nX7e","donateButton":"Footer__donateButton___3Y2Bl","socialButton":"Footer__socialButton___1gIOz"},stylesheet: `.Footer__footer___3vgfn{color:#fff;background-color:#273443;padding:55px 0 0}.Footer__dplaLogo___THn6S{width:300px}.Footer__linksAndDonate___2Xpv5{display:-webkit-box;display:-ms-flexbox;display:flex;margin:auto;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;padding:0 70px 57px}@media screen and (min-width:1100px){.Footer__linksAndDonate___2Xpv5{padding:0 0 57px;max-width:1024px}}.Footer__links___3-m2I{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:18px;font-size:1.125rem;line-height:25px;line-height:1.5625rem;color:hsla(0,0%,100%,.75);width:550px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.Footer__linkHeader___24ttN{font-weight:600;font-size:20px;font-size:1.25rem;line-height:32px;line-height:2rem;margin-bottom:12px;color:#fff}.Footer__logoAndSocialWrapper___1bZ0U{background-color:#232f3c}.Footer__logoAndSocial___8o9Y3{margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:33px 57px}@media screen and (min-width:1100px){.Footer__logoAndSocial___8o9Y3{padding:33px 0;max-width:1024px}}.Footer__social___1nX7e{margin-left:auto}.Footer__donateButton___3Y2Bl{margin-left:auto;font-weight:600;color:#fff;padding:12px 49px;background-color:#dd5c00;border-radius:2px;font-size:18px;font-size:1.125rem;line-height:23px;line-height:1.4375rem}.Footer__socialButton___1gIOz{width:24px;height:24px;padding-right:17px}.Footer__socialButton___1gIOz:-last-child{padding:none}`}

/***/ }),

/***/ 563:
/***/ (function(module, exports) {

module.exports = {classNames: {"header":"Header__header___1ZHnm","linksContainer":"Header__linksContainer___2x5pv","mainLinks":"Header__mainLinks___6dG0-","secondaryLinks":"Header__secondaryLinks___2hoUe","login":"Header__login___2J2fV","divider":"Header__divider___yNCMe"},stylesheet: `.Header__header___1ZHnm{background-color:#0a2a37}.Header__linksContainer___2x5pv{margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 70px;font-size:14px;font-size:.875rem;font-weight:600;line-height:18px;line-height:1.125rem}@media screen and (min-width:1100px){.Header__linksContainer___2x5pv{max-width:1024px;padding:0}}.Header__mainLinks___6dG0-{margin:15px 0;color:#fff;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;text-transform:uppercase}.Header__mainLinks___6dG0- a{margin-right:17px}.Header__mainLinks___6dG0- a:last-child{margin-right:21px}.Header__secondaryLinks___2hoUe{margin:15px 0;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;color:hsla(0,0%,100%,.7);text-transform:uppercase}.Header__secondaryLinks___2hoUe a{margin-right:30px}.Header__secondaryLinks___2hoUe a:first-child{margin-left:21px}.Header__login___2J2fV{color:#fff;margin-left:auto;cursor:pointer;text-transform:uppercase;font-size:14px;font-size:.875rem;font-weight:600;line-height:18px;line-height:1.125rem}.Header__divider___yNCMe{display:inline-block;height:20px;width:1px;background-color:hsla(0,0%,100%,.6)}`}

/***/ }),

/***/ 564:
/***/ (function(module, exports) {

module.exports = {classNames: {"hippieBlue":"#639bb4","elephantBlue":"#163f51","mediumRem":"52rem","smallRem":"40rem","headerSearchBar":"HeaderSearchBar__headerSearchBar___35-d0","flexWrapper":"HeaderSearchBar__flexWrapper___3ugqz","searchBar":"HeaderSearchBar__searchBar___7kyje","searchInput":"HeaderSearchBar__searchInput___2QqFO","searchButton":"HeaderSearchBar__searchButton___gg5GU","searchIcon":"HeaderSearchBar__searchIcon___hApi0","logo":"HeaderSearchBar__logo___319Il"},stylesheet: `.HeaderSearchBar__headerSearchBar___35-d0{background-color:#639bb4;width:100%}.HeaderSearchBar__flexWrapper___3ugqz{padding:20px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:42px;margin:auto}@media (min-width:40rem){.HeaderSearchBar__flexWrapper___3ugqz{padding:20px 50px}}@media (min-width:52rem){.HeaderSearchBar__flexWrapper___3ugqz{padding:20px 70px}}@media screen and (min-width:1100px){.HeaderSearchBar__flexWrapper___3ugqz{padding:20px 0;max-width:1024px}}.HeaderSearchBar__searchBar___7kyje{margin-left:auto;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.HeaderSearchBar__searchInput___2QqFO{font-size:18px;font-size:1.125rem;line-height:23px;line-height:1.4375rem;border:none;border-radius:3px 0 0 3px;padding:0 0 0 14px;width:426px;height:100%}.HeaderSearchBar__searchInput___2QqFO::-webkit-input-placeholder{color:#163f51;opacity:.5}.HeaderSearchBar__searchInput___2QqFO:-ms-input-placeholder{color:#163f51;opacity:.5}.searchInput::-webkit-input-placeholder{color:#163f51;opacity:.5}.searchInput:-ms-input-placeholder{color:#163f51;opacity:.5}.HeaderSearchBar__searchInput___2QqFO::placeholder{color:#163f51;opacity:.5}.HeaderSearchBar__searchButton___gg5GU{background-color:#163f51;border-radius:0 3px 3px 0;height:100%;font-size:18px;font-size:1.125rem;line-height:23px;line-height:1.4375rem;font-weight:600;color:#fff;padding:0 20px}.HeaderSearchBar__searchIcon___hApi0{height:21px;width:21px;-webkit-transform:scaleX(-1);transform:scaleX(-1);margin-right:8px;position:relative;top:4px}.HeaderSearchBar__logo___319Il{width:290px;display:inherit;height:35px}`}

/***/ }),

/***/ 565:
/***/ (function(module, exports) {

module.exports = {classNames: {"pampasBrown":"#f3f1ec","wrapper":"BreadcrumbsModule__wrapper___29vO9","breadcrumbsModule":"BreadcrumbsModule__breadcrumbsModule___3FShg"},stylesheet: `.BreadcrumbsModule__wrapper___29vO9{width:100%;height:44px;background-color:#f3f1ec;-webkit-box-shadow:inset 0 -1px 1px 0 rgba(0,0,0,.03);box-shadow:inset 0 -1px 1px 0 rgba(0,0,0,.03)}.BreadcrumbsModule__breadcrumbsModule___3FShg{height:100%;padding-top:0;padding-bottom:0;font-size:16px;font-size:1rem;line-height:20px;line-height:1.25rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}`}

/***/ }),

/***/ 566:
/***/ (function(module, exports) {

module.exports = {classNames: {"colors":"\"../../../../../../../../css/colors.css\"","studentMode":"StudentMode__studentMode___25oA0","studentModeText":"StudentMode__studentModeText___2-nV8","questionIcon":"StudentMode__questionIcon___3fmRF","tooltip":"StudentMode__tooltip___1p4dV","tooltipText":"StudentMode__tooltipText___2xopv","tooltipLink":"StudentMode__tooltipLink___3i8V1"},stylesheet: `.StudentMode__studentMode___25oA0{font-weight:600;color:#797876;text-transform:uppercase;position:relative;padding-bottom:22px;margin-top:20px}.StudentMode__studentModeText___2-nV8{font-size:15px;font-size:.9375rem;line-height:19px;line-height:1.1875rem;display:inline;margin-right:8px}.StudentMode__questionIcon___3fmRF{width:18px;height:18px;position:relative;top:3px}.StudentMode__tooltip___1p4dV{background-color:rgba(22,63,81,.95);color:#fff;font-size:14px;font-size:.875rem;line-height:16px;line-height:1rem;padding:20px;-webkit-box-shadow:0 4px 7px 0 rgba(0,0,0,.19);box-shadow:0 4px 7px 0 rgba(0,0,0,.19);position:absolute;width:266px;text-transform:none;text-align:left;left:-125px;top:45px;border-radius:2px}.StudentMode__tooltip___1p4dV:before{content:"";display:block;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:12px solid rgba(22,63,81,.95);position:absolute;top:-12px;right:23px}.StudentMode__tooltipText___2xopv{margin-bottom:10px;font-weight:400}.StudentMode__tooltipLink___3i8V1{font-weight:600;border-bottom:1px solid #fff}`}

/***/ }),

/***/ 567:
/***/ (function(module, exports) {

module.exports = {classNames: {"pampasBrown":"#f3f1ec","bambooOrange":"#dd5c00","wrapper":"PSSFooter__wrapper___3lrd0","otherInfo":"PSSFooter__otherInfo___14dOT","link":"PSSFooter__link___3wPW4","p":"PSSFooter__p___2kKR9"},stylesheet: `.PSSFooter__wrapper___3lrd0{background-color:#f3f1ec}.PSSFooter__otherInfo___14dOT{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:rgba(0,0,0,.75);-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.PSSFooter__link___3wPW4{color:#dd5c00}.PSSFooter__p___2kKR9{max-width:450px;font-size:14px;font-size:.875rem;line-height:16px;line-height:1rem}`}

/***/ }),

/***/ 568:
/***/ (function(module, exports) {

module.exports = {classNames: {"visualBrown":"#f9f8f5","elephantBlue":"#163f51","wrapper":"RelatedSets__wrapper___163px","relatedSets":"RelatedSets__relatedSets___1aEYH","header":"RelatedSets__header___2Dk4p","sets":"RelatedSets__sets___aPEiF","set":"RelatedSets__set___2ZYGf","setImage":"RelatedSets__setImage___2JmGT"},stylesheet: `.RelatedSets__wrapper___163px{background-color:#f9f8f5;width:100%}.RelatedSets__header___2Dk4p{font-family:Lora;font-weight:700;font-size:16px;font-size:1rem;line-height:20px;line-height:1.25rem;text-transform:uppercase;margin-bottom:25px}.RelatedSets__sets___aPEiF{display:-webkit-box;display:-ms-flexbox;display:flex}.RelatedSets__set___2ZYGf{-ms-flex-preferred-size:20%;flex-basis:20%;margin-right:19px}.RelatedSets__set___2ZYGf:last-child{margin-right:0}.RelatedSets__setImage___2JmGT{width:100%;height:auto}`}

/***/ }),

/***/ 569:
/***/ (function(module, exports) {

module.exports = {classNames: {"visualBrown":"#f9f8f5","bambooOrange":"#dd5c00","wrapper":"ResourcesTabs__wrapper___avqOi","resourcesTabs":"ResourcesTabs__resourcesTabs___2gEUt","tabsWrapper":"ResourcesTabs__tabsWrapper___2ivrL","tabs":"ResourcesTabs__tabs___2unR1","tab":"ResourcesTabs__tab___2fgcL","activeTab":"ResourcesTabs__activeTab___stSnw"},stylesheet: `.ResourcesTabs__wrapper___avqOi{width:100%}.ResourcesTabs__resourcesTabs___2gEUt{padding-top:0;padding-bottom:0}.ResourcesTabs__tabsWrapper___2ivrL{background-color:#f9f8f5;width:100%;border-bottom:1px solid rgba(53,53,53,.1)}.ResourcesTabs__tabs___2unR1{padding-top:0;padding-bottom:0}.ResourcesTabs__tab___2fgcL{text-transform:uppercase;font-weight:600;font-size:16px;font-size:1rem;line-height:20px;line-height:1.25rem;padding:0 18px 16px;margin-right:15px;display:inline-block}.ResourcesTabs__activeTab___stSnw{color:#dd5c00;border-bottom:3px solid #dd5c00}.ResourcesTabs__tab___2fgcL:last-child{margin-right:0}`}

/***/ }),

/***/ 570:
/***/ (function(module, exports) {

module.exports = {classNames: {"visualBrown":"#f9f8f5","cranberry":"#e04f8e","softPeach":"#f6ecf0","iceBlue":"#eaf6fc","curiousBlue":"#269ed4","wrapper":"SourceSetInfo__wrapper___uX7xd","sourceSetInfo":"SourceSetInfo__sourceSetInfo___3kfjr","bannerAndDescription":"SourceSetInfo__bannerAndDescription___DF2ZX","banner":"SourceSetInfo__banner___1kaK0","bannerImage":"SourceSetInfo__bannerImage___1q1SP","bannerTextWrapper":"SourceSetInfo__bannerTextWrapper___2vLEX","bannerResourceType":"SourceSetInfo__bannerResourceType___QtlC2","bannerTitle":"SourceSetInfo__bannerTitle___1dbIj","description":"SourceSetInfo__description___3DZoK","sidebar":"SourceSetInfo__sidebar___3NDuV","metadata":"SourceSetInfo__metadata___2Lnu_","metadatum":"SourceSetInfo__metadatum___KP6AR","metadataHeader":"SourceSetInfo__metadataHeader___2SLmd","button":"SourceSetInfo__button___1R638","favoritesButton":"SourceSetInfo__favoritesButton___3Hk8W","citeButton":"SourceSetInfo__citeButton___2diN7","heart":"SourceSetInfo__heart___2441N"},stylesheet: `.SourceSetInfo__wrapper___uX7xd{width:100%;background-color:#f9f8f5}.SourceSetInfo__sourceSetInfo___3kfjr{display:-webkit-box;display:-ms-flexbox;display:flex;padding-bottom:82px;padding-top:23px}.SourceSetInfo__bannerAndDescription___DF2ZX{-ms-flex-preferred-size:70%;flex-basis:70%;padding-right:18px}.SourceSetInfo__banner___1kaK0{width:100%;position:relative;margin-bottom:25px}.SourceSetInfo__bannerImage___1q1SP{width:100%;height:169px;opacity:.95;background-size:cover;background-repeat:no-repeat;border-radius:3px}.SourceSetInfo__bannerTextWrapper___2vLEX{background:-webkit-gradient(linear,left top,left bottom,from(rgba(54,44,36,0)),to(#312921));background:linear-gradient(180deg,rgba(54,44,36,0),#312921);position:absolute;bottom:0;width:100%;padding:0 0 11px 22px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;border-radius:3px}.SourceSetInfo__bannerResourceType___QtlC2{text-transform:uppercase;padding-right:18px;font-size:16px;font-size:1rem;line-height:15px;line-height:.9375rem;font-weight:700;opacity:.85;margin-bottom:1px;color:#fff}.SourceSetInfo__bannerTitle___1dbIj{font-family:Lora;font-size:46px;font-size:2.875rem;line-height:55px;line-height:3.4375rem;font-weight:400;color:#fff}.SourceSetInfo__description___3DZoK{font-size:18px;font-size:1.125rem;line-height:23px;line-height:1.4375rem}.SourceSetInfo__sidebar___3NDuV{border:1px solid #e7e7e7;background-color:#fff;padding:19px 20px 26px;-webkit-box-flex:1;-ms-flex:1;flex:1 1 0%;border-radius:3px}.SourceSetInfo__metadata___2Lnu_{border-bottom:1px solid rgba(0,0,0,.1);margin-bottom:21px}.SourceSetInfo__metadatum___KP6AR{margin-bottom:20px;font-size:14px;font-size:.875rem;line-height:18px;line-height:1.125rem}.SourceSetInfo__metadataHeader___2SLmd{font-weight:600;font-size:16px;font-size:1rem;line-height:20px;line-height:1.25rem;margin-bottom:6px}.SourceSetInfo__button___1R638{display:block;padding:10px 0;width:100%;border-radius:2px;font-size:18px;font-size:1.125rem;line-height:23px;line-height:1.4375rem;font-weight:600}.SourceSetInfo__favoritesButton___3Hk8W{background-color:#f6ecf0;color:#e04f8e;margin-bottom:15px}.SourceSetInfo__citeButton___2diN7{background-color:#eaf6fc;color:#269ed4}.SourceSetInfo__heart___2441N{width:16px;height:14px;margin-right:9px;position:relative;top:1px}`}

/***/ }),

/***/ 571:
/***/ (function(module, exports) {

module.exports = {classNames: {"visualBrown":"#f9f8f5","sourceSetSources":"SourceSetSources__sourceSetSources___QnHvM","set":"SourceSetSources__set___1iFzy","imageWrapper":"SourceSetSources__imageWrapper___2vKev","title":"SourceSetSources__title___236UF"},stylesheet: `.SourceSetSources__sourceSetSources___QnHvM{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:64px;padding-top:50px}.SourceSetSources__set___1iFzy{-ms-flex-preferred-size:calc(25% - 15px);flex-basis:calc(25% - 15px);margin-right:20px;margin-bottom:28px}.SourceSetSources__set___1iFzy:nth-child(4n){margin-right:0}.SourceSetSources__imageWrapper___2vKev{background-color:#f9f8f5;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:172px;margin-bottom:9px}.SourceSetSources__title___236UF{font-size:14px;font-size:.875rem;line-height:17px;line-height:1.0625rem}`}

/***/ }),

/***/ 572:
/***/ (function(module, exports) {

module.exports = {classNames: {"hidden":"Tooltip__hidden___12UTI"},stylesheet: `.Tooltip__hidden___12UTI{display:none}`}

/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _Breadcrumbs = __webpack_require__(561);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Breadcrumbs/index.js";

var chevron = "/static/images/chevron-thick-orange.svg";

var Breadcrumbs = function Breadcrumbs(_ref) {
  var breadcrumbs = _ref.breadcrumbs;
  return _react2.default.createElement("div", { className: _Breadcrumbs.classNames.breadcrumbs, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, breadcrumbs.map(function (breadcrumb, idx) {
    if (idx < breadcrumbs.length - 1) {
      return _react2.default.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, _react2.default.createElement(_link2.default, { href: breadcrumb.url, as: breadcrumb.as, __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, _react2.default.createElement("a", { className: _Breadcrumbs.classNames.breadcrumbLink, __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, breadcrumb.title)), _react2.default.createElement("img", { alt: "", src: chevron, className: _Breadcrumbs.classNames.chevron, __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }));
    } else {
      return _react2.default.createElement("span", { className: _Breadcrumbs.classNames.activeBreadcrumb, __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, breadcrumb.title);
    }
  }), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Breadcrumbs.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }));
};

exports.default = Breadcrumbs;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Breadcrumbs/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Breadcrumbs/index.js"); } } })();

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(609);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _head = __webpack_require__(194);

var _head2 = _interopRequireDefault(_head);

var _utils = __webpack_require__(542);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Head/index.js"); } } })();

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _Footer = __webpack_require__(562);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Footer/index.js";


var dplaLogo = "/static/images/dpla-logo.svg";
var fbIcon = "/static/images/facebook.svg";
var igIcon = "/static/images/instagram.svg";
var rssIcon = "/static/images/rss.svg";
var tumblrIcon = "/static/images/tumblr.svg";

var Footer = function Footer() {
  return _react2.default.createElement("div", { className: _Footer.classNames.footer, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("div", { className: _Footer.classNames.linksAndDonate, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement("div", { className: _Footer.classNames.linksWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement("div", { className: _Footer.classNames.links, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement("h3", { className: _Footer.classNames.linkHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, "DPLA"), _react2.default.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, "About Us"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, "FAQ"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, "Who Uses DPLA?"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "Terms & Conditions"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, "Contact Us"))), _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement("h3", { className: _Footer.classNames.linkHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, "Tools"), _react2.default.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, "Search"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, "Exhibitions"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, _react2.default.createElement(_link2.default, { href: "/primary-source-sets", __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }, "Primary Source Sets"))), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, _react2.default.createElement(_link2.default, { href: "/browse-by-topic", __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }, "Browse by Topic"))), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    }
  }, "Browse by Partner"))), _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }, _react2.default.createElement("h3", { className: _Footer.classNames.linkHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    }
  }, "Pro Community"), _react2.default.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    }
  }, _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  }, "About DPLA"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    }
  }, "Hubs"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }, "Projects"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }, "Get Involved"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }, "Educators"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }, "Developers"))))), _react2.default.createElement("button", { className: _Footer.classNames.donateButton, __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    }
  }, "Donate")), _react2.default.createElement("div", { className: _Footer.classNames.logoAndSocialWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    }
  }, _react2.default.createElement("div", { className: _Footer.classNames.logoAndSocial, __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    }
  }, _react2.default.createElement("img", { className: _Footer.classNames.dplaLogo, alt: "DPLA", src: dplaLogo, __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    }
  }), _react2.default.createElement("div", { className: _Footer.classNames.social, __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    }
  }, _react2.default.createElement("img", {
    className: _Footer.classNames.socialButton,
    alt: "Facebook",
    src: fbIcon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    }
  }), _react2.default.createElement("img", {
    className: _Footer.classNames.socialButton,
    alt: "Instagram",
    src: igIcon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    }
  }), _react2.default.createElement("img", {
    className: _Footer.classNames.socialButton,
    alt: "RSS Feed",
    src: rssIcon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    }
  }), _react2.default.createElement("img", {
    className: _Footer.classNames.socialButton,
    alt: "Tumblr",
    src: tumblrIcon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    }
  })))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Footer.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    }
  }));
};

exports.default = Footer;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Footer/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Footer/index.js"); } } })();

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _Header = __webpack_require__(563);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Header/index.js";


var Header = function Header() {
  return _react2.default.createElement("div", { className: _Header.classNames.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement("div", { className: _Header.classNames.linksContainer, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement("div", { className: _Header.classNames.mainLinks, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_link2.default, { href: "/", __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "Home")), _react2.default.createElement(_link2.default, { href: "/browse-by-topic", __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, "Browse")), _react2.default.createElement(_link2.default, { href: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, "Exhibitions")), _react2.default.createElement(_link2.default, { href: "/primary-source-sets", __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, "Primary Source Sets"))), _react2.default.createElement("span", { className: _Header.classNames.divider, __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }), _react2.default.createElement("div", { className: _Header.classNames.secondaryLinks, __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, _react2.default.createElement(_link2.default, { href: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, "About Us")), _react2.default.createElement(_link2.default, { href: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, "News")), _react2.default.createElement(_link2.default, { href: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, "Pro Community"))), _react2.default.createElement("button", { className: _Header.classNames.login, __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }, "Log In")), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _Header.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }));
};

exports.default = Header;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Header/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/Header/index.js"); } } })();

/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _HeaderSearchBar = __webpack_require__(564);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/HeaderSearchBar/index.js";


var dplaLogo = "/static/images/dpla-logo-white.svg";
var searchIcon = "/static/images/search.svg";

var HeaderSearchBar = function HeaderSearchBar() {
  return _react2.default.createElement("div", { className: _HeaderSearchBar.classNames.headerSearchBar, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("div", { className: _HeaderSearchBar.classNames.flexWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(_link2.default, { href: "/", __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement("img", { alt: "DPLA", src: dplaLogo, className: _HeaderSearchBar.classNames.logo, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }))), _react2.default.createElement("div", { className: _HeaderSearchBar.classNames.searchBar, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement("input", {
    className: _HeaderSearchBar.classNames.searchInput,
    placeholder: "Search the collection",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), _react2.default.createElement("button", { className: _HeaderSearchBar.classNames.searchButton, __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, _react2.default.createElement("img", {
    alt: "Search",
    src: searchIcon,
    className: _HeaderSearchBar.classNames.searchIcon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }), _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, "Search")))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _HeaderSearchBar.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }));
};

exports.default = HeaderSearchBar;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/HeaderSearchBar/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/components/HeaderSearchBar/index.js"); } } })();

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _Head = __webpack_require__(575);

var _Head2 = _interopRequireDefault(_Head);

var _Header = __webpack_require__(577);

var _Header2 = _interopRequireDefault(_Header);

var _HeaderSearchBar = __webpack_require__(578);

var _HeaderSearchBar2 = _interopRequireDefault(_HeaderSearchBar);

var _Footer = __webpack_require__(576);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/index.js";


var MainLayout = function MainLayout(_ref) {
  var children = _ref.children,
      hideSearchBar = _ref.hideSearchBar;
  return _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_Head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), _react2.default.createElement(_Header2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }), !hideSearchBar && _react2.default.createElement(_HeaderSearchBar2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), children, _react2.default.createElement(_Footer2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }));
};

exports.default = MainLayout;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/MainLayout/index.js"); } } })();

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(36);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(39);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(38);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(599);

var _StudentMode = __webpack_require__(566);

var _StudentMode2 = _interopRequireDefault(_StudentMode);

var _Tooltip = __webpack_require__(588);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js";


var question = "static/images/question.svg";

var isStudentMode = function isStudentMode() {
  return false;
}; //TODO fix this

var StudentMode = function (_React$Component) {
  (0, _inherits3.default)(StudentMode, _React$Component);

  function StudentMode() {
    (0, _classCallCheck3.default)(this, StudentMode);

    return (0, _possibleConstructorReturn3.default)(this, (StudentMode.__proto__ || (0, _getPrototypeOf2.default)(StudentMode)).apply(this, arguments));
  }

  (0, _createClass3.default)(StudentMode, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({ showTooltip: false });
    }
  }, {
    key: "showTooltip",
    value: function showTooltip() {
      this.setState({ showTooltip: true });
    }
  }, {
    key: "hideTooltip",
    value: function hideTooltip() {
      this.setState({ showTooltip: false });
    }
  }, {
    key: "toggleTooltip",
    value: function toggleTooltip() {
      this.setState({ showTooltip: !this.state.showTooltip });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return isStudentMode() ? _react2.default.createElement("button", {
        "aria-describedby": "student-mode-tooltip",
        className: _StudentMode2.default.studentMode,
        onMouseOver: function onMouseOver() {
          return _this2.showTooltip();
        },
        onFocus: function onFocus() {
          return _this2.showTooltip();
        },
        onBlur: function onBlur() {
          return _this2.hideTooltip();
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.hideTooltip();
        },
        onClick: function onClick() {
          return _this2.toggleTooltip();
        },
        tabIndex: "0",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, _react2.default.createElement("h3", { className: _StudentMode2.default.studentModeText, __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }, "Student Mode"), _react2.default.createElement("img", { src: question, alt: "", className: _StudentMode2.default.questionIcon, __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }), _react2.default.createElement(_Tooltip2.default, {
        id: "student-mode-tooltip",
        isHidden: !this.state.showTooltip,
        className: _StudentMode2.default.tooltip,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, _react2.default.createElement("p", { className: _StudentMode2.default.tooltipText, __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, "You\u2019re viewing this Primary Source Set with the teaching guides hidden."), _react2.default.createElement(_reactRouterDom.Link, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, _react2.default.createElement("a", { className: _StudentMode2.default.tooltipLink, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, "Turn on Teaching Guides")))) : null;
    }
  }]);

  return StudentMode;
}(_react2.default.Component);

exports.default = StudentMode;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/components/StudentMode/index.js"); } } })();

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _Breadcrumbs = __webpack_require__(574);

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _StudentMode = __webpack_require__(580);

var _StudentMode2 = _interopRequireDefault(_StudentMode);

var _BreadcrumbsModule = __webpack_require__(565);

var _utils = __webpack_require__(542);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/index.js";


var _module = _utils.classNames.module;

var BreadcrumbsModule = function BreadcrumbsModule(_ref) {
  var showStudentMode = _ref.showStudentMode,
      breadcrumbs = _ref.breadcrumbs;
  return _react2.default.createElement("div", { className: _BreadcrumbsModule.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("div", { className: [_module, _BreadcrumbsModule.classNames.breadcrumbsModule].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement(_Breadcrumbs2.default, { breadcrumbs: breadcrumbs, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }), showStudentMode && _react2.default.createElement(_StudentMode2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _BreadcrumbsModule.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }));
};

exports.default = BreadcrumbsModule;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/BreadcrumbsModule/index.js"); } } })();

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _PSSFooter = __webpack_require__(567);

var _utils = __webpack_require__(542);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/PSSFooter/index.js";


var _module = _utils.classNames.module;

var OtherInfo = function OtherInfo() {
  return _react2.default.createElement("div", { className: _PSSFooter.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement("div", { className: [_module, _PSSFooter.classNames.otherInfo].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement("p", { className: _PSSFooter.classNames.p, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, "These sets were created and reviewed by the teachers on the\xA0"), _react2.default.createElement(_link2.default, { to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement("a", { className: _PSSFooter.classNames.link, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "DPLA's Education Advisory Committee."))), _react2.default.createElement("p", { className: _PSSFooter.classNames.p, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "To give feedback or suggest a Source Set, contact us at\xA0"), _react2.default.createElement("a", { className: _PSSFooter.classNames.link, mailto: "education@dp.la", __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, "education@dp.la"))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _PSSFooter.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }));
};

exports.default = OtherInfo;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/PSSFooter/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/PSSFooter/index.js"); } } })();

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _RelatedSets = __webpack_require__(568);

var _utils = __webpack_require__(542);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/RelatedSets/index.js";


var _module = _utils.classNames.module;

var mockSets = [{
  img: "http://lorempixel.com/400/200/food",
  title: "New York City"
}, {
  img: "http://lorempixel.com/400/200/food",
  title: "Early Chinese Immigration to the US"
}, {
  img: "http://lorempixel.com/400/200/food",
  title: "Mexican Labor and World War II: The Bracero..."
}, {
  img: "http://lorempixel.com/400/200/food",
  title: "The Impact of Television on News Media"
}];

var RelatedSets = function RelatedSets() {
  return _react2.default.createElement("div", { className: _RelatedSets.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, _react2.default.createElement("div", { className: [_module, _RelatedSets.classNames.relatedSets].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, _react2.default.createElement("h3", { className: _RelatedSets.classNames.header, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, "Related Primary Source Sets"), _react2.default.createElement("div", { className: _RelatedSets.classNames.sets, __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, mockSets.map(function (_ref) {
    var img = _ref.img,
        title = _ref.title;
    return _react2.default.createElement("div", { className: _RelatedSets.classNames.set, __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }, _react2.default.createElement("img", { alt: title, src: img, className: _RelatedSets.classNames.setImage, __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    }), _react2.default.createElement("p", { className: _RelatedSets.classNames.title, __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    }, title));
  }))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _RelatedSets.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    }
  }));
};

exports.default = RelatedSets;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/RelatedSets/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/RelatedSets/index.js"); } } })();

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(36);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(39);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(38);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _ResourcesTabs = __webpack_require__(569);

var _utils = __webpack_require__(542);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs/index.js";


var _module = _utils.classNames.module;

// import SourceSetSources from "../SourceSetSources";
// import TeachingGuide from "../TeachingGuide";

var ResourcesTabs = function (_React$Component) {
  (0, _inherits3.default)(ResourcesTabs, _React$Component);

  function ResourcesTabs() {
    (0, _classCallCheck3.default)(this, ResourcesTabs);

    return (0, _possibleConstructorReturn3.default)(this, (ResourcesTabs.__proto__ || (0, _getPrototypeOf2.default)(ResourcesTabs)).apply(this, arguments));
  }

  (0, _createClass3.default)(ResourcesTabs, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // const { location, history } = this.props.routerProps;
      // const isStudentMode = location.search.includes("student");
      // if (/\/primary-source-sets\/.+\/teaching-guide/.exec(location.pathname)) {
      //   if (isStudentMode) {
      //     history.push(`${location.pathname}`);
      //   }
      //   this.setState({ currentTab: "teachingGuide" });
      // } else if (
      //   /\/primary-source-sets\/.+\/additional-resources/.exec(location.pathname)
      // ) {
      //   this.setState({ currentTab: "additionalResources" });
      // } else {
      //   this.setState({ currentTab: "sourceSet" });
      // }

      this.setState({ studentMode: false });
    }
  }, {
    key: "onTabChange",
    value: function onTabChange(newTab) {
      this.setState({ currentTab: newTab });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isStudentMode = false;
      var slug = this.props.set.slug;
      var currentTab = this.props.currentTab;

      console.log(currentTab);
      return _react2.default.createElement("div", { className: _ResourcesTabs.classNames.wrapper, __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, _react2.default.createElement("div", { className: _ResourcesTabs.classNames.tabsWrapper, __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, _react2.default.createElement("div", { className: [_ResourcesTabs.classNames.tabs, _module].join(" "), __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement(_link2.default, {
        href: "/primary-source-sets/set?set=" + slug,
        as: "/primary-source-sets/" + slug,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, _react2.default.createElement("a", {
        className: [_ResourcesTabs.classNames.tab, currentTab === "sourceSet" && _ResourcesTabs.classNames.activeTab].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, "Source Set")), _react2.default.createElement(_link2.default, { onClick: function onClick() {
          return _this2.onTabChange("additionalResources");
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement("a", {
        className: [_ResourcesTabs.classNames.tab, currentTab === "additionalResources" && _ResourcesTabs.classNames.activeTab].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, "Additional Resources")), !isStudentMode && _react2.default.createElement(_link2.default, {
        href: "/primary-source-sets/set/teaching-guide?set=" + slug,
        as: "/primary-source-sets/" + slug + "/teaching-guide",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement("a", {
        className: [_ResourcesTabs.classNames.tab, currentTab === "teachingGuide" && _ResourcesTabs.classNames.activeTab].join(" "),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, "Teaching Guide")))), this.props.children, _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _ResourcesTabs.stylesheet }, __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }));
    }
  }]);

  return ResourcesTabs;
}(_react2.default.Component);

exports.default = ResourcesTabs;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs/index.js"); } } })();

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _SourceSetInfo = __webpack_require__(570);

var _utils = __webpack_require__(542);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo/index.js";


var _module = _utils.classNames.module;

var heart = "/static/images/heart.svg";

var SourceSetInfo = function SourceSetInfo() {
  return _react2.default.createElement("div", { className: _SourceSetInfo.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement("div", { className: [_SourceSetInfo.classNames.sourceSetInfo, _module].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("div", { className: _SourceSetInfo.classNames.bannerAndDescription, __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement("div", { className: _SourceSetInfo.classNames.banner, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement("div", {
    className: _SourceSetInfo.classNames.bannerImage,
    style: {
      backgroundImage: "url(http://lorempixel.com/400/200/food)"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }), _react2.default.createElement("div", { className: _SourceSetInfo.classNames.bannerTextWrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement("h3", { className: _SourceSetInfo.classNames.bannerResourceType, __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "Primary Source Set"), _react2.default.createElement("h1", { className: _SourceSetInfo.classNames.bannerTitle, __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, "Women in the Civil War"))), _react2.default.createElement("p", { className: _SourceSetInfo.classNames.description, __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, "The American Civil War brought women new responsibilities on the battlefield and at home. Many became providers for their families, managing farms and businesses while male relatives served in the military. Many also contributed to the Union or Confederacy. Some raised money and supplies through ladies\u2019 aid and soldiers\u2019 aid societies as well as the US Sanitary Commission, a private agency that operated across the North and became critical to the Union victory. Others nursed soldiers (Louisa May Alcott, author of the beloved novel Little Women, worked as an army nurse), spied on the enemy, cooked and laundered for enlisted men, and served as uniformed battlefield\u2026")), _react2.default.createElement("div", { className: _SourceSetInfo.classNames.sidebar, __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    }
  }, _react2.default.createElement("div", { className: _SourceSetInfo.classNames.metadata, __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    }
  }, _react2.default.createElement("div", { className: _SourceSetInfo.classNames.metadatum, __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }, _react2.default.createElement("h3", { className: _SourceSetInfo.classNames.metadataHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }, "Prepared By"), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    }
  }, "Melissa Strong, Community College of Philadelphia, Philadelphia, Pennsylvania")), _react2.default.createElement("div", { className: _SourceSetInfo.classNames.metadatum, __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }, _react2.default.createElement("h3", { className: _SourceSetInfo.classNames.metadataHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }, "Time Period"), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }, "Civil War and Reconstruction (1850-1877)")), _react2.default.createElement("div", { className: _SourceSetInfo.classNames.metadatum, __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    }
  }, _react2.default.createElement("h3", { className: _SourceSetInfo.classNames.metadataHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    }
  }, "Subjects"), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    }
  }, "U.S. History, Women"))), _react2.default.createElement("button", {
    className: [_SourceSetInfo.classNames.favoritesButton, _SourceSetInfo.classNames.button].join(" "),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    }
  }, _react2.default.createElement("img", { alt: "", src: heart, className: _SourceSetInfo.classNames.heart, __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    }
  }), _react2.default.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    }
  }, "Add to favorites")), _react2.default.createElement("button", {
    className: [_SourceSetInfo.classNames.citeButton, _SourceSetInfo.classNames.button].join(" "),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    }
  }, "Cite this set"))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _SourceSetInfo.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    }
  }));
};

exports.default = SourceSetInfo;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo/index.js"); } } })();

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(541);

var _link2 = _interopRequireDefault(_link);

var _mockSources = __webpack_require__(587);

var _mockSources2 = _interopRequireDefault(_mockSources);

var _SourceSetSources = __webpack_require__(571);

var _utils = __webpack_require__(542);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetSources/index.js";


var _module = _utils.classNames.module;

var SourceSetSources = function SourceSetSources() {
  return _react2.default.createElement("div", { className: _SourceSetSources.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("div", { className: [_SourceSetSources.classNames.sourceSetSources, _module].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _mockSources2.default.map(function (_ref) {
    var title = _ref.title,
        img = _ref.img,
        id = _ref.id,
        setSlug = _ref.setSlug;
    return _react2.default.createElement(_link2.default, {
      as: "/primary-source-sets/" + setSlug + "/sources/" + id,
      href: "/primary-source-sets/set/sources?source=" + id + "&set=" + setSlug,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }, _react2.default.createElement("a", { className: _SourceSetSources.classNames.set, __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    }, _react2.default.createElement("div", { className: _SourceSetSources.classNames.imageWrapper, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    }, _react2.default.createElement("img", { alt: title, src: img, className: _SourceSetSources.classNames.image, __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    })), _react2.default.createElement("p", { className: _SourceSetSources.classNames.title, __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    }, title)));
  })), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _SourceSetSources.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }));
};

exports.default = SourceSetSources;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetSources/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/SourceSetSources/index.js"); } } })();

/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mockSources = [{
  img: "http://lorempixel.com/152/168/food",
  id: 0,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 1,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 2,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 3,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 4,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 5,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 6,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 7,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 8,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 9,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 10,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}, {
  img: "http://lorempixel.com/152/168/food",
  id: 11,
  setSlug: "civil-war-and-reconstruction",
  title: "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
}];

exports.default = mockSources;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/mockSources.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/mockSources.js"); } } })();

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _Tooltip = __webpack_require__(572);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Tooltip/index.js";


var Tooltip = function Tooltip(_ref) {
  var className = _ref.className,
      id = _ref.id,
      isHidden = _ref.isHidden,
      children = _ref.children;
  return _react2.default.createElement("div", {
    className: [className, isHidden && _Tooltip2.default.hidden].join(" "),
    id: id || className,
    role: "tooltip",
    "aria-hidden": isHidden,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, children);
};

exports.default = Tooltip;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Tooltip/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/frankiesimms/Desktop/dpla-enduser-site/components/Tooltip/index.js"); } } })();

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(553);


/***/ })

},[611]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9wcmltYXJ5LXNvdXJjZS1zZXRzL3NldC9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Nzcy91dGlscy5jc3M/YjdjZjNlYSIsIndlYnBhY2s6Ly8vLi9wYWdlcy9wcmltYXJ5LXNvdXJjZS1zZXRzL3NldD9iN2NmM2VhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzP2I3Y2YzZWEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NYWluTGF5b3V0L2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3M/YjdjZjNlYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01haW5MYXlvdXQvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmNzcz9iN2NmM2VhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWFpbkxheW91dC9jb21wb25lbnRzL0hlYWRlclNlYXJjaEJhci9IZWFkZXJTZWFyY2hCYXIuY3NzP2I3Y2YzZWEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvQnJlYWRjcnVtYnNNb2R1bGUvQnJlYWRjcnVtYnNNb2R1bGUuY3NzP2I3Y2YzZWEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvQnJlYWRjcnVtYnNNb2R1bGUvY29tcG9uZW50cy9TdHVkZW50TW9kZS9TdHVkZW50TW9kZS5jc3M/YjdjZjNlYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9QU1NGb290ZXIvUFNTRm9vdGVyLmNzcz9iN2NmM2VhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL1NpbmdsZVNldC9SZWxhdGVkU2V0cy9SZWxhdGVkU2V0cy5jc3M/YjdjZjNlYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9TaW5nbGVTZXQvUmVzb3VyY2VzVGFicy9SZXNvdXJjZXNUYWJzLmNzcz9iN2NmM2VhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL1NpbmdsZVNldC9Tb3VyY2VTZXRJbmZvL1NvdXJjZVNldEluZm8uY3NzP2I3Y2YzZWEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1NvdXJjZVNldFNvdXJjZXMvU291cmNlU2V0U291cmNlcy5jc3M/YjdjZjNlYSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Rvb2x0aXAvVG9vbHRpcC5jc3M/YWY4N2FlZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0JyZWFkY3J1bWJzL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9IZWFkL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NYWluTGF5b3V0L2NvbXBvbmVudHMvRm9vdGVyL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NYWluTGF5b3V0L2NvbXBvbmVudHMvSGVhZGVyL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NYWluTGF5b3V0L2NvbXBvbmVudHMvSGVhZGVyU2VhcmNoQmFyL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NYWluTGF5b3V0L2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvQnJlYWRjcnVtYnNNb2R1bGUvY29tcG9uZW50cy9TdHVkZW50TW9kZS9pbmRleC5qcz9hZjg3YWVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL0JyZWFkY3J1bWJzTW9kdWxlL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvUFNTRm9vdGVyL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1JlbGF0ZWRTZXRzL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1Jlc291cmNlc1RhYnMvaW5kZXguanM/YWY4N2FlZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9TaW5nbGVTZXQvU291cmNlU2V0SW5mby9pbmRleC5qcz9hZjg3YWVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL1NpbmdsZVNldC9Tb3VyY2VTZXRTb3VyY2VzL2luZGV4LmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L21vY2tTb3VyY2VzLmpzP2FmODdhZWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ub29sdGlwL2luZGV4LmpzP2FmODdhZWUiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1wibW9kdWxlXCI6XCJ1dGlsc19fbW9kdWxlX19fMkVFeWFcIn0sc3R5bGVzaGVldDogYC51dGlsc19fbW9kdWxlX19fMkVFeWF7cGFkZGluZzozMHB4IDI1cHg7bWFyZ2luOmF1dG99QG1lZGlhIChtaW4td2lkdGg6c21hbGxSZW0pey51dGlsc19fbW9kdWxlX19fMkVFeWF7cGFkZGluZzozMHB4IDUwcHh9fUBtZWRpYSAobWluLXdpZHRoOm1lZGl1bVJlbSl7LnV0aWxzX19tb2R1bGVfX18yRUV5YXtwYWRkaW5nOjMwcHggNzBweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDoxMTAwcHgpey51dGlsc19fbW9kdWxlX19fMkVFeWF7cGFkZGluZzozMHB4IDA7bWF4LXdpZHRoOjEwMjRweH19YH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy91dGlscy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IE1haW5MYXlvdXQgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvTWFpbkxheW91dFwiO1xuaW1wb3J0IFBTU0Zvb3RlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvUFNTRm9vdGVyXCI7XG5pbXBvcnQgQnJlYWRjcnVtYnNNb2R1bGUgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL0JyZWFkY3J1bWJzTW9kdWxlXCI7XG5pbXBvcnQgU291cmNlU2V0SW5mbyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1NvdXJjZVNldEluZm9cIjtcbmltcG9ydCBSZWxhdGVkU2V0cyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1JlbGF0ZWRTZXRzXCI7XG5pbXBvcnQgUmVzb3VyY2VzVGFicyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1Jlc291cmNlc1RhYnNcIjtcbmltcG9ydCBTb3VyY2VTZXRTb3VyY2VzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9TaW5nbGVTZXQvU291cmNlU2V0U291cmNlc1wiO1xuXG5jb25zdCBtb2NrU2V0ID0ge1xuICB0aXRsZTogXCJDaXZpbCBXYXIgYW5kIFJlY29uc3RydWN0aW9uXCIsXG4gIHNsdWc6IFwiY2l2aWwtd2FyLWFuZC1yZWNvbnN0cnVjdGlvblwiXG59O1xuXG5jb25zdCBTaW5nbGVTZXQgPSBwcm9wcyA9PlxuICA8TWFpbkxheW91dD5cbiAgICA8QnJlYWRjcnVtYnNNb2R1bGVcbiAgICAgIGJyZWFkY3J1bWJzPXtbXG4gICAgICAgIHsgdGl0bGU6IFwiUHJpbWFyeSBTb3VyY2UgU2V0c1wiLCB1cmw6IFwiL3ByaW1hcnktc291cmNlLXNldHNcIiB9LFxuICAgICAgICB7IHRpdGxlOiBtb2NrU2V0LnRpdGxlLCBzZWFyY2g6IFwiXCIgfVxuICAgICAgXX1cbiAgICAgIHNob3dTdHVkZW50TW9kZT17dHJ1ZX1cbiAgICAvPlxuICAgIDxTb3VyY2VTZXRJbmZvIC8+XG4gICAgPFJlc291cmNlc1RhYnMgY3VycmVudFRhYj1cInNvdXJjZVNldFwiIHNldD17bW9ja1NldH0+XG4gICAgICA8U291cmNlU2V0U291cmNlcyAvPlxuICAgIDwvUmVzb3VyY2VzVGFicz5cbiAgICA8UmVsYXRlZFNldHMgLz5cbiAgICA8UFNTRm9vdGVyIC8+XG4gIDwvTWFpbkxheW91dD47XG5cbmV4cG9ydCBkZWZhdWx0IFNpbmdsZVNldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzL3ByaW1hcnktc291cmNlLXNldHMvc2V0P2VudHJ5IiwibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1wiYmFtYm9vT3JhbmdlXCI6XCIjZGQ1YzAwXCIsXCJhY3RpdmVCcmVhZGNydW1iXCI6XCJCcmVhZGNydW1ic19fYWN0aXZlQnJlYWRjcnVtYl9fXzF5SDNkXCIsXCJicmVhZGNydW1iTGlua1wiOlwiQnJlYWRjcnVtYnNfX2JyZWFkY3J1bWJMaW5rX19fMlJ0VlJcIixcImNoZXZyb25cIjpcIkJyZWFkY3J1bWJzX19jaGV2cm9uX19fLXQzTThcIn0sc3R5bGVzaGVldDogYC5CcmVhZGNydW1ic19fYWN0aXZlQnJlYWRjcnVtYl9fXzF5SDNkLC5CcmVhZGNydW1ic19fYnJlYWRjcnVtYkxpbmtfX18yUnRWUntkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6MjE1cHg7d2hpdGUtc3BhY2U6bm93cmFwO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7b3ZlcmZsb3c6aGlkZGVufS5CcmVhZGNydW1ic19fYnJlYWRjcnVtYkxpbmtfX18yUnRWUntjb2xvcjojZGQ1YzAwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkZDVjMDB9LkJyZWFkY3J1bWJzX19jaGV2cm9uX19fLXQzTTh7aGVpZ2h0OjlweDtwYWRkaW5nOjAgMTFweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTVweH1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsIm1vZHVsZS5leHBvcnRzID0ge2NsYXNzTmFtZXM6IHtcIm1pbnVpdEJsdWVcIjpcIiMyMzJmM2NcIixcImVib255Q2xheUJsdWVcIjpcIiMyNzM0NDNcIixcImJhbWJvb09yYW5nZVwiOlwiI2RkNWMwMFwiLFwiZ3JheTc1XCI6XCJoc2xhKDAsMCUsMTAwJSwuNzUpXCIsXCJmb290ZXJcIjpcIkZvb3Rlcl9fZm9vdGVyX19fM3ZnZm5cIixcImRwbGFMb2dvXCI6XCJGb290ZXJfX2RwbGFMb2dvX19fVEhuNlNcIixcImxpbmtzQW5kRG9uYXRlXCI6XCJGb290ZXJfX2xpbmtzQW5kRG9uYXRlX19fMlhwdjVcIixcImxpbmtzXCI6XCJGb290ZXJfX2xpbmtzX19fMy1tMklcIixcImxpbmtIZWFkZXJcIjpcIkZvb3Rlcl9fbGlua0hlYWRlcl9fXzI0dHROXCIsXCJsb2dvQW5kU29jaWFsV3JhcHBlclwiOlwiRm9vdGVyX19sb2dvQW5kU29jaWFsV3JhcHBlcl9fXzFiWjBVXCIsXCJsb2dvQW5kU29jaWFsXCI6XCJGb290ZXJfX2xvZ29BbmRTb2NpYWxfX184bzlZM1wiLFwic29jaWFsXCI6XCJGb290ZXJfX3NvY2lhbF9fXzFuWDdlXCIsXCJkb25hdGVCdXR0b25cIjpcIkZvb3Rlcl9fZG9uYXRlQnV0dG9uX19fM1kyQmxcIixcInNvY2lhbEJ1dHRvblwiOlwiRm9vdGVyX19zb2NpYWxCdXR0b25fX18xZ0lPelwifSxzdHlsZXNoZWV0OiBgLkZvb3Rlcl9fZm9vdGVyX19fM3ZnZm57Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiMyNzM0NDM7cGFkZGluZzo1NXB4IDAgMH0uRm9vdGVyX19kcGxhTG9nb19fX1RIbjZTe3dpZHRoOjMwMHB4fS5Gb290ZXJfX2xpbmtzQW5kRG9uYXRlX19fMlhwdjV7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDttYXJnaW46YXV0bzstd2Via2l0LWJveC1hbGlnbjpiYXNlbGluZTstbXMtZmxleC1hbGlnbjpiYXNlbGluZTthbGlnbi1pdGVtczpiYXNlbGluZTtwYWRkaW5nOjAgNzBweCA1N3B4fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTEwMHB4KXsuRm9vdGVyX19saW5rc0FuZERvbmF0ZV9fXzJYcHY1e3BhZGRpbmc6MCAwIDU3cHg7bWF4LXdpZHRoOjEwMjRweH19LkZvb3Rlcl9fbGlua3NfX18zLW0ySXtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbTtsaW5lLWhlaWdodDoyNXB4O2xpbmUtaGVpZ2h0OjEuNTYyNXJlbTtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNzUpO3dpZHRoOjU1MHB4Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LkZvb3Rlcl9fbGlua0hlYWRlcl9fXzI0dHROe2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MjBweDtmb250LXNpemU6MS4yNXJlbTtsaW5lLWhlaWdodDozMnB4O2xpbmUtaGVpZ2h0OjJyZW07bWFyZ2luLWJvdHRvbToxMnB4O2NvbG9yOiNmZmZ9LkZvb3Rlcl9fbG9nb0FuZFNvY2lhbFdyYXBwZXJfX18xYlowVXtiYWNrZ3JvdW5kLWNvbG9yOiMyMzJmM2N9LkZvb3Rlcl9fbG9nb0FuZFNvY2lhbF9fXzhvOVkze21hcmdpbjphdXRvO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpqdXN0aWZ5Oy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjMzcHggNTdweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjExMDBweCl7LkZvb3Rlcl9fbG9nb0FuZFNvY2lhbF9fXzhvOVkze3BhZGRpbmc6MzNweCAwO21heC13aWR0aDoxMDI0cHh9fS5Gb290ZXJfX3NvY2lhbF9fXzFuWDdle21hcmdpbi1sZWZ0OmF1dG99LkZvb3Rlcl9fZG9uYXRlQnV0dG9uX19fM1kyQmx7bWFyZ2luLWxlZnQ6YXV0bztmb250LXdlaWdodDo2MDA7Y29sb3I6I2ZmZjtwYWRkaW5nOjEycHggNDlweDtiYWNrZ3JvdW5kLWNvbG9yOiNkZDVjMDA7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtO2xpbmUtaGVpZ2h0OjIzcHg7bGluZS1oZWlnaHQ6MS40Mzc1cmVtfS5Gb290ZXJfX3NvY2lhbEJ1dHRvbl9fXzFnSU96e3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7cGFkZGluZy1yaWdodDoxN3B4fS5Gb290ZXJfX3NvY2lhbEJ1dHRvbl9fXzFnSU96Oi1sYXN0LWNoaWxke3BhZGRpbmc6bm9uZX1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9NYWluTGF5b3V0L2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsIm1vZHVsZS5leHBvcnRzID0ge2NsYXNzTmFtZXM6IHtcImhlYWRlclwiOlwiSGVhZGVyX19oZWFkZXJfX18xWkhubVwiLFwibGlua3NDb250YWluZXJcIjpcIkhlYWRlcl9fbGlua3NDb250YWluZXJfX18yeDVwdlwiLFwibWFpbkxpbmtzXCI6XCJIZWFkZXJfX21haW5MaW5rc19fXzZkRzAtXCIsXCJzZWNvbmRhcnlMaW5rc1wiOlwiSGVhZGVyX19zZWNvbmRhcnlMaW5rc19fXzJob1VlXCIsXCJsb2dpblwiOlwiSGVhZGVyX19sb2dpbl9fXzJKMmZWXCIsXCJkaXZpZGVyXCI6XCJIZWFkZXJfX2RpdmlkZXJfX195TkNNZVwifSxzdHlsZXNoZWV0OiBgLkhlYWRlcl9faGVhZGVyX19fMVpIbm17YmFja2dyb3VuZC1jb2xvcjojMGEyYTM3fS5IZWFkZXJfX2xpbmtzQ29udGFpbmVyX19fMng1cHZ7bWFyZ2luOmF1dG87ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjAgNzBweDtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtmb250LXdlaWdodDo2MDA7bGluZS1oZWlnaHQ6MThweDtsaW5lLWhlaWdodDoxLjEyNXJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjExMDBweCl7LkhlYWRlcl9fbGlua3NDb250YWluZXJfX18yeDVwdnttYXgtd2lkdGg6MTAyNHB4O3BhZGRpbmc6MH19LkhlYWRlcl9fbWFpbkxpbmtzX19fNmRHMC17bWFyZ2luOjE1cHggMDtjb2xvcjojZmZmO2Rpc3BsYXk6LXdlYmtpdC1pbmxpbmUtYm94O2Rpc3BsYXk6LW1zLWlubGluZS1mbGV4Ym94O2Rpc3BsYXk6aW5saW5lLWZsZXg7LXdlYmtpdC1ib3gtcGFjazpqdXN0aWZ5Oy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LkhlYWRlcl9fbWFpbkxpbmtzX19fNmRHMC0gYXttYXJnaW4tcmlnaHQ6MTdweH0uSGVhZGVyX19tYWluTGlua3NfX182ZEcwLSBhOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0OjIxcHh9LkhlYWRlcl9fc2Vjb25kYXJ5TGlua3NfX18yaG9VZXttYXJnaW46MTVweCAwO2Rpc3BsYXk6LXdlYmtpdC1pbmxpbmUtYm94O2Rpc3BsYXk6LW1zLWlubGluZS1mbGV4Ym94O2Rpc3BsYXk6aW5saW5lLWZsZXg7LXdlYmtpdC1ib3gtcGFjazpqdXN0aWZ5Oy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNyk7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS5IZWFkZXJfX3NlY29uZGFyeUxpbmtzX19fMmhvVWUgYXttYXJnaW4tcmlnaHQ6MzBweH0uSGVhZGVyX19zZWNvbmRhcnlMaW5rc19fXzJob1VlIGE6Zmlyc3QtY2hpbGR7bWFyZ2luLWxlZnQ6MjFweH0uSGVhZGVyX19sb2dpbl9fXzJKMmZWe2NvbG9yOiNmZmY7bWFyZ2luLWxlZnQ6YXV0bztjdXJzb3I6cG9pbnRlcjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOi44NzVyZW07Zm9udC13ZWlnaHQ6NjAwO2xpbmUtaGVpZ2h0OjE4cHg7bGluZS1oZWlnaHQ6MS4xMjVyZW19LkhlYWRlcl9fZGl2aWRlcl9fX3lOQ01le2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoyMHB4O3dpZHRoOjFweDtiYWNrZ3JvdW5kLWNvbG9yOmhzbGEoMCwwJSwxMDAlLC42KX1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9NYWluTGF5b3V0L2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsIm1vZHVsZS5leHBvcnRzID0ge2NsYXNzTmFtZXM6IHtcImhpcHBpZUJsdWVcIjpcIiM2MzliYjRcIixcImVsZXBoYW50Qmx1ZVwiOlwiIzE2M2Y1MVwiLFwibWVkaXVtUmVtXCI6XCI1MnJlbVwiLFwic21hbGxSZW1cIjpcIjQwcmVtXCIsXCJoZWFkZXJTZWFyY2hCYXJcIjpcIkhlYWRlclNlYXJjaEJhcl9faGVhZGVyU2VhcmNoQmFyX19fMzUtZDBcIixcImZsZXhXcmFwcGVyXCI6XCJIZWFkZXJTZWFyY2hCYXJfX2ZsZXhXcmFwcGVyX19fM3VncXpcIixcInNlYXJjaEJhclwiOlwiSGVhZGVyU2VhcmNoQmFyX19zZWFyY2hCYXJfX183a3lqZVwiLFwic2VhcmNoSW5wdXRcIjpcIkhlYWRlclNlYXJjaEJhcl9fc2VhcmNoSW5wdXRfX18yUXFGT1wiLFwic2VhcmNoQnV0dG9uXCI6XCJIZWFkZXJTZWFyY2hCYXJfX3NlYXJjaEJ1dHRvbl9fX2dnNUdVXCIsXCJzZWFyY2hJY29uXCI6XCJIZWFkZXJTZWFyY2hCYXJfX3NlYXJjaEljb25fX19oQXBpMFwiLFwibG9nb1wiOlwiSGVhZGVyU2VhcmNoQmFyX19sb2dvX19fMzE5SWxcIn0sc3R5bGVzaGVldDogYC5IZWFkZXJTZWFyY2hCYXJfX2hlYWRlclNlYXJjaEJhcl9fXzM1LWQwe2JhY2tncm91bmQtY29sb3I6IzYzOWJiNDt3aWR0aDoxMDAlfS5IZWFkZXJTZWFyY2hCYXJfX2ZsZXhXcmFwcGVyX19fM3VncXp7cGFkZGluZzoyMHB4IDA7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6NDJweDttYXJnaW46YXV0b31AbWVkaWEgKG1pbi13aWR0aDo0MHJlbSl7LkhlYWRlclNlYXJjaEJhcl9fZmxleFdyYXBwZXJfX18zdWdxentwYWRkaW5nOjIwcHggNTBweH19QG1lZGlhIChtaW4td2lkdGg6NTJyZW0pey5IZWFkZXJTZWFyY2hCYXJfX2ZsZXhXcmFwcGVyX19fM3VncXp7cGFkZGluZzoyMHB4IDcwcHh9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTEwMHB4KXsuSGVhZGVyU2VhcmNoQmFyX19mbGV4V3JhcHBlcl9fXzN1Z3F6e3BhZGRpbmc6MjBweCAwO21heC13aWR0aDoxMDI0cHh9fS5IZWFkZXJTZWFyY2hCYXJfX3NlYXJjaEJhcl9fXzdreWple21hcmdpbi1sZWZ0OmF1dG87aGVpZ2h0OjEwMCU7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uSGVhZGVyU2VhcmNoQmFyX19zZWFyY2hJbnB1dF9fXzJRcUZPe2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbTtsaW5lLWhlaWdodDoyM3B4O2xpbmUtaGVpZ2h0OjEuNDM3NXJlbTtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjNweCAwIDAgM3B4O3BhZGRpbmc6MCAwIDAgMTRweDt3aWR0aDo0MjZweDtoZWlnaHQ6MTAwJX0uSGVhZGVyU2VhcmNoQmFyX19zZWFyY2hJbnB1dF9fXzJRcUZPOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOiMxNjNmNTE7b3BhY2l0eTouNX0uSGVhZGVyU2VhcmNoQmFyX19zZWFyY2hJbnB1dF9fXzJRcUZPOi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjojMTYzZjUxO29wYWNpdHk6LjV9LnNlYXJjaElucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOiMxNjNmNTE7b3BhY2l0eTouNX0uc2VhcmNoSW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOiMxNjNmNTE7b3BhY2l0eTouNX0uSGVhZGVyU2VhcmNoQmFyX19zZWFyY2hJbnB1dF9fXzJRcUZPOjpwbGFjZWhvbGRlcntjb2xvcjojMTYzZjUxO29wYWNpdHk6LjV9LkhlYWRlclNlYXJjaEJhcl9fc2VhcmNoQnV0dG9uX19fZ2c1R1V7YmFja2dyb3VuZC1jb2xvcjojMTYzZjUxO2JvcmRlci1yYWRpdXM6MCAzcHggM3B4IDA7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtO2xpbmUtaGVpZ2h0OjIzcHg7bGluZS1oZWlnaHQ6MS40Mzc1cmVtO2ZvbnQtd2VpZ2h0OjYwMDtjb2xvcjojZmZmO3BhZGRpbmc6MCAyMHB4fS5IZWFkZXJTZWFyY2hCYXJfX3NlYXJjaEljb25fX19oQXBpMHtoZWlnaHQ6MjFweDt3aWR0aDoyMXB4Oy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCgtMSk7dHJhbnNmb3JtOnNjYWxlWCgtMSk7bWFyZ2luLXJpZ2h0OjhweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NHB4fS5IZWFkZXJTZWFyY2hCYXJfX2xvZ29fX18zMTlJbHt3aWR0aDoyOTBweDtkaXNwbGF5OmluaGVyaXQ7aGVpZ2h0OjM1cHh9YH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvTWFpbkxheW91dC9jb21wb25lbnRzL0hlYWRlclNlYXJjaEJhci9IZWFkZXJTZWFyY2hCYXIuY3NzXG4vLyBtb2R1bGUgaWQgPSA1NjRcbi8vIG1vZHVsZSBjaHVua3MgPSA1IDYiLCJtb2R1bGUuZXhwb3J0cyA9IHtjbGFzc05hbWVzOiB7XCJwYW1wYXNCcm93blwiOlwiI2YzZjFlY1wiLFwid3JhcHBlclwiOlwiQnJlYWRjcnVtYnNNb2R1bGVfX3dyYXBwZXJfX18yOXZPOVwiLFwiYnJlYWRjcnVtYnNNb2R1bGVcIjpcIkJyZWFkY3J1bWJzTW9kdWxlX19icmVhZGNydW1ic01vZHVsZV9fXzNGU2hnXCJ9LHN0eWxlc2hlZXQ6IGAuQnJlYWRjcnVtYnNNb2R1bGVfX3dyYXBwZXJfX18yOXZPOXt3aWR0aDoxMDAlO2hlaWdodDo0NHB4O2JhY2tncm91bmQtY29sb3I6I2YzZjFlYzstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAtMXB4IDFweCAwIHJnYmEoMCwwLDAsLjAzKTtib3gtc2hhZG93Omluc2V0IDAgLTFweCAxcHggMCByZ2JhKDAsMCwwLC4wMyl9LkJyZWFkY3J1bWJzTW9kdWxlX19icmVhZGNydW1ic01vZHVsZV9fXzNGU2hne2hlaWdodDoxMDAlO3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MDtmb250LXNpemU6MTZweDtmb250LXNpemU6MXJlbTtsaW5lLWhlaWdodDoyMHB4O2xpbmUtaGVpZ2h0OjEuMjVyZW07ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufWB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9CcmVhZGNydW1ic01vZHVsZS9CcmVhZGNydW1ic01vZHVsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsIm1vZHVsZS5leHBvcnRzID0ge2NsYXNzTmFtZXM6IHtcImNvbG9yc1wiOlwiXFxcIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Nzcy9jb2xvcnMuY3NzXFxcIlwiLFwic3R1ZGVudE1vZGVcIjpcIlN0dWRlbnRNb2RlX19zdHVkZW50TW9kZV9fXzI1b0EwXCIsXCJzdHVkZW50TW9kZVRleHRcIjpcIlN0dWRlbnRNb2RlX19zdHVkZW50TW9kZVRleHRfX18yLW5WOFwiLFwicXVlc3Rpb25JY29uXCI6XCJTdHVkZW50TW9kZV9fcXVlc3Rpb25JY29uX19fM2ZtUkZcIixcInRvb2x0aXBcIjpcIlN0dWRlbnRNb2RlX190b29sdGlwX19fMXA0ZFZcIixcInRvb2x0aXBUZXh0XCI6XCJTdHVkZW50TW9kZV9fdG9vbHRpcFRleHRfX18yeG9wdlwiLFwidG9vbHRpcExpbmtcIjpcIlN0dWRlbnRNb2RlX190b29sdGlwTGlua19fXzNpOFYxXCJ9LHN0eWxlc2hlZXQ6IGAuU3R1ZGVudE1vZGVfX3N0dWRlbnRNb2RlX19fMjVvQTB7Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOiM3OTc4NzY7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctYm90dG9tOjIycHg7bWFyZ2luLXRvcDoyMHB4fS5TdHVkZW50TW9kZV9fc3R1ZGVudE1vZGVUZXh0X19fMi1uVjh7Zm9udC1zaXplOjE1cHg7Zm9udC1zaXplOi45Mzc1cmVtO2xpbmUtaGVpZ2h0OjE5cHg7bGluZS1oZWlnaHQ6MS4xODc1cmVtO2Rpc3BsYXk6aW5saW5lO21hcmdpbi1yaWdodDo4cHh9LlN0dWRlbnRNb2RlX19xdWVzdGlvbkljb25fX18zZm1SRnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDozcHh9LlN0dWRlbnRNb2RlX190b29sdGlwX19fMXA0ZFZ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIyLDYzLDgxLC45NSk7Y29sb3I6I2ZmZjtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtsaW5lLWhlaWdodDoxNnB4O2xpbmUtaGVpZ2h0OjFyZW07cGFkZGluZzoyMHB4Oy13ZWJraXQtYm94LXNoYWRvdzowIDRweCA3cHggMCByZ2JhKDAsMCwwLC4xOSk7Ym94LXNoYWRvdzowIDRweCA3cHggMCByZ2JhKDAsMCwwLC4xOSk7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MjY2cHg7dGV4dC10cmFuc2Zvcm06bm9uZTt0ZXh0LWFsaWduOmxlZnQ7bGVmdDotMTI1cHg7dG9wOjQ1cHg7Ym9yZGVyLXJhZGl1czoycHh9LlN0dWRlbnRNb2RlX190b29sdGlwX19fMXA0ZFY6YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmJsb2NrO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWxlZnQ6MTJweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTJweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItYm90dG9tOjEycHggc29saWQgcmdiYSgyMiw2Myw4MSwuOTUpO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMTJweDtyaWdodDoyM3B4fS5TdHVkZW50TW9kZV9fdG9vbHRpcFRleHRfX18yeG9wdnttYXJnaW4tYm90dG9tOjEwcHg7Zm9udC13ZWlnaHQ6NDAwfS5TdHVkZW50TW9kZV9fdG9vbHRpcExpbmtfX18zaThWMXtmb250LXdlaWdodDo2MDA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2ZmZn1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvQnJlYWRjcnVtYnNNb2R1bGUvY29tcG9uZW50cy9TdHVkZW50TW9kZS9TdHVkZW50TW9kZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsIm1vZHVsZS5leHBvcnRzID0ge2NsYXNzTmFtZXM6IHtcInBhbXBhc0Jyb3duXCI6XCIjZjNmMWVjXCIsXCJiYW1ib29PcmFuZ2VcIjpcIiNkZDVjMDBcIixcIndyYXBwZXJcIjpcIlBTU0Zvb3Rlcl9fd3JhcHBlcl9fXzNscmQwXCIsXCJvdGhlckluZm9cIjpcIlBTU0Zvb3Rlcl9fb3RoZXJJbmZvX19fMTRkT1RcIixcImxpbmtcIjpcIlBTU0Zvb3Rlcl9fbGlua19fXzN3UFc0XCIsXCJwXCI6XCJQU1NGb290ZXJfX3BfX18ya0tSOVwifSxzdHlsZXNoZWV0OiBgLlBTU0Zvb3Rlcl9fd3JhcHBlcl9fXzNscmQwe2JhY2tncm91bmQtY29sb3I6I2YzZjFlY30uUFNTRm9vdGVyX19vdGhlckluZm9fX18xNGRPVHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2NvbG9yOnJnYmEoMCwwLDAsLjc1KTstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5QU1NGb290ZXJfX2xpbmtfX18zd1BXNHtjb2xvcjojZGQ1YzAwfS5QU1NGb290ZXJfX3BfX18ya0tSOXttYXgtd2lkdGg6NDUwcHg7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOi44NzVyZW07bGluZS1oZWlnaHQ6MTZweDtsaW5lLWhlaWdodDoxcmVtfWB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9QU1NGb290ZXIvUFNTRm9vdGVyLmNzc1xuLy8gbW9kdWxlIGlkID0gNTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gNSA2IiwibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1widmlzdWFsQnJvd25cIjpcIiNmOWY4ZjVcIixcImVsZXBoYW50Qmx1ZVwiOlwiIzE2M2Y1MVwiLFwid3JhcHBlclwiOlwiUmVsYXRlZFNldHNfX3dyYXBwZXJfX18xNjNweFwiLFwicmVsYXRlZFNldHNcIjpcIlJlbGF0ZWRTZXRzX19yZWxhdGVkU2V0c19fXzFhRVlIXCIsXCJoZWFkZXJcIjpcIlJlbGF0ZWRTZXRzX19oZWFkZXJfX18yRGs0cFwiLFwic2V0c1wiOlwiUmVsYXRlZFNldHNfX3NldHNfX19hUEVpRlwiLFwic2V0XCI6XCJSZWxhdGVkU2V0c19fc2V0X19fMlpZR2ZcIixcInNldEltYWdlXCI6XCJSZWxhdGVkU2V0c19fc2V0SW1hZ2VfX18ySm1HVFwifSxzdHlsZXNoZWV0OiBgLlJlbGF0ZWRTZXRzX193cmFwcGVyX19fMTYzcHh7YmFja2dyb3VuZC1jb2xvcjojZjlmOGY1O3dpZHRoOjEwMCV9LlJlbGF0ZWRTZXRzX19oZWFkZXJfX18yRGs0cHtmb250LWZhbWlseTpMb3JhO2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MTZweDtmb250LXNpemU6MXJlbTtsaW5lLWhlaWdodDoyMHB4O2xpbmUtaGVpZ2h0OjEuMjVyZW07dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO21hcmdpbi1ib3R0b206MjVweH0uUmVsYXRlZFNldHNfX3NldHNfX19hUEVpRntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS5SZWxhdGVkU2V0c19fc2V0X19fMlpZR2Z7LW1zLWZsZXgtcHJlZmVycmVkLXNpemU6MjAlO2ZsZXgtYmFzaXM6MjAlO21hcmdpbi1yaWdodDoxOXB4fS5SZWxhdGVkU2V0c19fc2V0X19fMlpZR2Y6bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MH0uUmVsYXRlZFNldHNfX3NldEltYWdlX19fMkptR1R7d2lkdGg6MTAwJTtoZWlnaHQ6YXV0b31gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1JlbGF0ZWRTZXRzL1JlbGF0ZWRTZXRzLmNzc1xuLy8gbW9kdWxlIGlkID0gNTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gNSA2IiwibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1widmlzdWFsQnJvd25cIjpcIiNmOWY4ZjVcIixcImJhbWJvb09yYW5nZVwiOlwiI2RkNWMwMFwiLFwid3JhcHBlclwiOlwiUmVzb3VyY2VzVGFic19fd3JhcHBlcl9fX2F2cU9pXCIsXCJyZXNvdXJjZXNUYWJzXCI6XCJSZXNvdXJjZXNUYWJzX19yZXNvdXJjZXNUYWJzX19fMmdFVXRcIixcInRhYnNXcmFwcGVyXCI6XCJSZXNvdXJjZXNUYWJzX190YWJzV3JhcHBlcl9fXzJpdnJMXCIsXCJ0YWJzXCI6XCJSZXNvdXJjZXNUYWJzX190YWJzX19fMnVuUjFcIixcInRhYlwiOlwiUmVzb3VyY2VzVGFic19fdGFiX19fMmZnY0xcIixcImFjdGl2ZVRhYlwiOlwiUmVzb3VyY2VzVGFic19fYWN0aXZlVGFiX19fc3RTbndcIn0sc3R5bGVzaGVldDogYC5SZXNvdXJjZXNUYWJzX193cmFwcGVyX19fYXZxT2l7d2lkdGg6MTAwJX0uUmVzb3VyY2VzVGFic19fcmVzb3VyY2VzVGFic19fXzJnRVV0e3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0uUmVzb3VyY2VzVGFic19fdGFic1dyYXBwZXJfX18yaXZyTHtiYWNrZ3JvdW5kLWNvbG9yOiNmOWY4ZjU7d2lkdGg6MTAwJTtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDUzLDUzLDUzLC4xKX0uUmVzb3VyY2VzVGFic19fdGFic19fXzJ1blIxe3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0uUmVzb3VyY2VzVGFic19fdGFiX19fMmZnY0x7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTZweDtmb250LXNpemU6MXJlbTtsaW5lLWhlaWdodDoyMHB4O2xpbmUtaGVpZ2h0OjEuMjVyZW07cGFkZGluZzowIDE4cHggMTZweDttYXJnaW4tcmlnaHQ6MTVweDtkaXNwbGF5OmlubGluZS1ibG9ja30uUmVzb3VyY2VzVGFic19fYWN0aXZlVGFiX19fc3RTbnd7Y29sb3I6I2RkNWMwMDtib3JkZXItYm90dG9tOjNweCBzb2xpZCAjZGQ1YzAwfS5SZXNvdXJjZXNUYWJzX190YWJfX18yZmdjTDpsYXN0LWNoaWxke21hcmdpbi1yaWdodDowfWB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL1ByaW1hcnlTb3VyY2VTZXRzQ29tcG9uZW50cy9TaW5nbGVTZXQvUmVzb3VyY2VzVGFicy9SZXNvdXJjZXNUYWJzLmNzc1xuLy8gbW9kdWxlIGlkID0gNTY5XG4vLyBtb2R1bGUgY2h1bmtzID0gNSA2IiwibW9kdWxlLmV4cG9ydHMgPSB7Y2xhc3NOYW1lczoge1widmlzdWFsQnJvd25cIjpcIiNmOWY4ZjVcIixcImNyYW5iZXJyeVwiOlwiI2UwNGY4ZVwiLFwic29mdFBlYWNoXCI6XCIjZjZlY2YwXCIsXCJpY2VCbHVlXCI6XCIjZWFmNmZjXCIsXCJjdXJpb3VzQmx1ZVwiOlwiIzI2OWVkNFwiLFwid3JhcHBlclwiOlwiU291cmNlU2V0SW5mb19fd3JhcHBlcl9fX3VYN3hkXCIsXCJzb3VyY2VTZXRJbmZvXCI6XCJTb3VyY2VTZXRJbmZvX19zb3VyY2VTZXRJbmZvX19fM2tmanJcIixcImJhbm5lckFuZERlc2NyaXB0aW9uXCI6XCJTb3VyY2VTZXRJbmZvX19iYW5uZXJBbmREZXNjcmlwdGlvbl9fX0RGMlpYXCIsXCJiYW5uZXJcIjpcIlNvdXJjZVNldEluZm9fX2Jhbm5lcl9fXzFrYUswXCIsXCJiYW5uZXJJbWFnZVwiOlwiU291cmNlU2V0SW5mb19fYmFubmVySW1hZ2VfX18xcTFTUFwiLFwiYmFubmVyVGV4dFdyYXBwZXJcIjpcIlNvdXJjZVNldEluZm9fX2Jhbm5lclRleHRXcmFwcGVyX19fMnZMRVhcIixcImJhbm5lclJlc291cmNlVHlwZVwiOlwiU291cmNlU2V0SW5mb19fYmFubmVyUmVzb3VyY2VUeXBlX19fUXRsQzJcIixcImJhbm5lclRpdGxlXCI6XCJTb3VyY2VTZXRJbmZvX19iYW5uZXJUaXRsZV9fXzFkYklqXCIsXCJkZXNjcmlwdGlvblwiOlwiU291cmNlU2V0SW5mb19fZGVzY3JpcHRpb25fX18zRFpvS1wiLFwic2lkZWJhclwiOlwiU291cmNlU2V0SW5mb19fc2lkZWJhcl9fXzNORHVWXCIsXCJtZXRhZGF0YVwiOlwiU291cmNlU2V0SW5mb19fbWV0YWRhdGFfX18yTG51X1wiLFwibWV0YWRhdHVtXCI6XCJTb3VyY2VTZXRJbmZvX19tZXRhZGF0dW1fX19LUDZBUlwiLFwibWV0YWRhdGFIZWFkZXJcIjpcIlNvdXJjZVNldEluZm9fX21ldGFkYXRhSGVhZGVyX19fMlNMbWRcIixcImJ1dHRvblwiOlwiU291cmNlU2V0SW5mb19fYnV0dG9uX19fMVI2MzhcIixcImZhdm9yaXRlc0J1dHRvblwiOlwiU291cmNlU2V0SW5mb19fZmF2b3JpdGVzQnV0dG9uX19fM0hrOFdcIixcImNpdGVCdXR0b25cIjpcIlNvdXJjZVNldEluZm9fX2NpdGVCdXR0b25fX18yZGlON1wiLFwiaGVhcnRcIjpcIlNvdXJjZVNldEluZm9fX2hlYXJ0X19fMjQ0MU5cIn0sc3R5bGVzaGVldDogYC5Tb3VyY2VTZXRJbmZvX193cmFwcGVyX19fdVg3eGR7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmOWY4ZjV9LlNvdXJjZVNldEluZm9fX3NvdXJjZVNldEluZm9fX18za2ZqcntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3BhZGRpbmctYm90dG9tOjgycHg7cGFkZGluZy10b3A6MjNweH0uU291cmNlU2V0SW5mb19fYmFubmVyQW5kRGVzY3JpcHRpb25fX19ERjJaWHstbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTo3MCU7ZmxleC1iYXNpczo3MCU7cGFkZGluZy1yaWdodDoxOHB4fS5Tb3VyY2VTZXRJbmZvX19iYW5uZXJfX18xa2FLMHt3aWR0aDoxMDAlO3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbi1ib3R0b206MjVweH0uU291cmNlU2V0SW5mb19fYmFubmVySW1hZ2VfX18xcTFTUHt3aWR0aDoxMDAlO2hlaWdodDoxNjlweDtvcGFjaXR5Oi45NTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JvcmRlci1yYWRpdXM6M3B4fS5Tb3VyY2VTZXRJbmZvX19iYW5uZXJUZXh0V3JhcHBlcl9fXzJ2TEVYe2JhY2tncm91bmQ6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sZnJvbShyZ2JhKDU0LDQ0LDM2LDApKSx0bygjMzEyOTIxKSk7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLHJnYmEoNTQsNDQsMzYsMCksIzMxMjkyMSk7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMCAxMXB4IDIycHg7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O2NvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czozcHh9LlNvdXJjZVNldEluZm9fX2Jhbm5lclJlc291cmNlVHlwZV9fX1F0bEMye3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtwYWRkaW5nLXJpZ2h0OjE4cHg7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07bGluZS1oZWlnaHQ6MTVweDtsaW5lLWhlaWdodDouOTM3NXJlbTtmb250LXdlaWdodDo3MDA7b3BhY2l0eTouODU7bWFyZ2luLWJvdHRvbToxcHg7Y29sb3I6I2ZmZn0uU291cmNlU2V0SW5mb19fYmFubmVyVGl0bGVfX18xZGJJantmb250LWZhbWlseTpMb3JhO2ZvbnQtc2l6ZTo0NnB4O2ZvbnQtc2l6ZToyLjg3NXJlbTtsaW5lLWhlaWdodDo1NXB4O2xpbmUtaGVpZ2h0OjMuNDM3NXJlbTtmb250LXdlaWdodDo0MDA7Y29sb3I6I2ZmZn0uU291cmNlU2V0SW5mb19fZGVzY3JpcHRpb25fX18zRFpvS3tmb250LXNpemU6MThweDtmb250LXNpemU6MS4xMjVyZW07bGluZS1oZWlnaHQ6MjNweDtsaW5lLWhlaWdodDoxLjQzNzVyZW19LlNvdXJjZVNldEluZm9fX3NpZGViYXJfX18zTkR1Vntib3JkZXI6MXB4IHNvbGlkICNlN2U3ZTc7YmFja2dyb3VuZC1jb2xvcjojZmZmO3BhZGRpbmc6MTlweCAyMHB4IDI2cHg7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxIDEgMCU7Ym9yZGVyLXJhZGl1czozcHh9LlNvdXJjZVNldEluZm9fX21ldGFkYXRhX19fMkxudV97Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgwLDAsMCwuMSk7bWFyZ2luLWJvdHRvbToyMXB4fS5Tb3VyY2VTZXRJbmZvX19tZXRhZGF0dW1fX19LUDZBUnttYXJnaW4tYm90dG9tOjIwcHg7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOi44NzVyZW07bGluZS1oZWlnaHQ6MThweDtsaW5lLWhlaWdodDoxLjEyNXJlbX0uU291cmNlU2V0SW5mb19fbWV0YWRhdGFIZWFkZXJfX18yU0xtZHtmb250LXdlaWdodDo2MDA7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07bGluZS1oZWlnaHQ6MjBweDtsaW5lLWhlaWdodDoxLjI1cmVtO21hcmdpbi1ib3R0b206NnB4fS5Tb3VyY2VTZXRJbmZvX19idXR0b25fX18xUjYzOHtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MTBweCAwO3dpZHRoOjEwMCU7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtO2xpbmUtaGVpZ2h0OjIzcHg7bGluZS1oZWlnaHQ6MS40Mzc1cmVtO2ZvbnQtd2VpZ2h0OjYwMH0uU291cmNlU2V0SW5mb19fZmF2b3JpdGVzQnV0dG9uX19fM0hrOFd7YmFja2dyb3VuZC1jb2xvcjojZjZlY2YwO2NvbG9yOiNlMDRmOGU7bWFyZ2luLWJvdHRvbToxNXB4fS5Tb3VyY2VTZXRJbmZvX19jaXRlQnV0dG9uX19fMmRpTjd7YmFja2dyb3VuZC1jb2xvcjojZWFmNmZjO2NvbG9yOiMyNjllZDR9LlNvdXJjZVNldEluZm9fX2hlYXJ0X19fMjQ0MU57d2lkdGg6MTZweDtoZWlnaHQ6MTRweDttYXJnaW4tcmlnaHQ6OXB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxcHh9YH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL1NpbmdsZVNldC9Tb3VyY2VTZXRJbmZvL1NvdXJjZVNldEluZm8uY3NzXG4vLyBtb2R1bGUgaWQgPSA1NzBcbi8vIG1vZHVsZSBjaHVua3MgPSA1IDYiLCJtb2R1bGUuZXhwb3J0cyA9IHtjbGFzc05hbWVzOiB7XCJ2aXN1YWxCcm93blwiOlwiI2Y5ZjhmNVwiLFwic291cmNlU2V0U291cmNlc1wiOlwiU291cmNlU2V0U291cmNlc19fc291cmNlU2V0U291cmNlc19fX1FuSHZNXCIsXCJzZXRcIjpcIlNvdXJjZVNldFNvdXJjZXNfX3NldF9fXzFpRnp5XCIsXCJpbWFnZVdyYXBwZXJcIjpcIlNvdXJjZVNldFNvdXJjZXNfX2ltYWdlV3JhcHBlcl9fXzJ2S2V2XCIsXCJ0aXRsZVwiOlwiU291cmNlU2V0U291cmNlc19fdGl0bGVfX18yMzZVRlwifSxzdHlsZXNoZWV0OiBgLlNvdXJjZVNldFNvdXJjZXNfX3NvdXJjZVNldFNvdXJjZXNfX19Rbkh2TXtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LXdyYXA6d3JhcDtmbGV4LXdyYXA6d3JhcDttYXJnaW4tYm90dG9tOjY0cHg7cGFkZGluZy10b3A6NTBweH0uU291cmNlU2V0U291cmNlc19fc2V0X19fMWlGenl7LW1zLWZsZXgtcHJlZmVycmVkLXNpemU6Y2FsYygyNSUgLSAxNXB4KTtmbGV4LWJhc2lzOmNhbGMoMjUlIC0gMTVweCk7bWFyZ2luLXJpZ2h0OjIwcHg7bWFyZ2luLWJvdHRvbToyOHB4fS5Tb3VyY2VTZXRTb3VyY2VzX19zZXRfX18xaUZ6eTpudGgtY2hpbGQoNG4pe21hcmdpbi1yaWdodDowfS5Tb3VyY2VTZXRTb3VyY2VzX19pbWFnZVdyYXBwZXJfX18ydktldntiYWNrZ3JvdW5kLWNvbG9yOiNmOWY4ZjU7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmNlbnRlcjstbXMtZmxleC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2hlaWdodDoxNzJweDttYXJnaW4tYm90dG9tOjlweH0uU291cmNlU2V0U291cmNlc19fdGl0bGVfX18yMzZVRntmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtsaW5lLWhlaWdodDoxN3B4O2xpbmUtaGVpZ2h0OjEuMDYyNXJlbX1gfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1NvdXJjZVNldFNvdXJjZXMvU291cmNlU2V0U291cmNlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCJtb2R1bGUuZXhwb3J0cyA9IHtjbGFzc05hbWVzOiB7XCJoaWRkZW5cIjpcIlRvb2x0aXBfX2hpZGRlbl9fXzEyVVRJXCJ9LHN0eWxlc2hlZXQ6IGAuVG9vbHRpcF9faGlkZGVuX19fMTJVVEl7ZGlzcGxheTpub25lfWB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL1Rvb2x0aXAvVG9vbHRpcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDUgNiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IHsgc3R5bGVzaGVldCwgY2xhc3NOYW1lcyB9IGZyb20gXCIuL0JyZWFkY3J1bWJzLmNzc1wiO1xuY29uc3QgY2hldnJvbiA9IFwiL3N0YXRpYy9pbWFnZXMvY2hldnJvbi10aGljay1vcmFuZ2Uuc3ZnXCI7XG5cbmNvbnN0IEJyZWFkY3J1bWJzID0gKHsgYnJlYWRjcnVtYnMgfSkgPT5cbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuYnJlYWRjcnVtYnN9PlxuICAgIHticmVhZGNydW1icy5tYXAoKGJyZWFkY3J1bWIsIGlkeCkgPT4ge1xuICAgICAgaWYgKGlkeCA8IGJyZWFkY3J1bWJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e2JyZWFkY3J1bWIudXJsfSBhcz17YnJlYWRjcnVtYi5hc30+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5icmVhZGNydW1iTGlua30+XG4gICAgICAgICAgICAgICAge2JyZWFkY3J1bWIudGl0bGV9XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPXtjaGV2cm9ufSBjbGFzc05hbWU9e2NsYXNzTmFtZXMuY2hldnJvbn0gLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5hY3RpdmVCcmVhZGNydW1ifT5cbiAgICAgICAgICAgIHticmVhZGNydW1iLnRpdGxlfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KX1cbiAgICA8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZXNoZWV0IH19IC8+XG4gIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0JyZWFkY3J1bWJzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuXG5pbXBvcnQge1xuICBzdHlsZXNoZWV0IGFzIHV0aWxTdHlsZXNoZWV0LFxuICBjbGFzc05hbWVzIGFzIHV0aWxDbGFzc05hbWVzXG59IGZyb20gXCJjc3MvdXRpbHMuY3NzXCI7XG5cbmNvbnN0IHsgbW9kdWxlIH0gPSB1dGlsQ2xhc3NOYW1lcztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT5cbiAgPGRpdj5cbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgYm9keSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLCBzYW5zLXNlcmlmO1xuICAgICAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiwgaW5wdXQge1xuICAgICAgICBmb250LWZhbWlseTogXCJTb3VyY2UgU2FucyBQcm9cIjtcbiAgICAgIH1cbiAgICAgIGEge1xuICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuICAgICAgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgICB1bCB7XG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICB9XG4gICAgICBwLCB1bCwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgIH1cbiAgICAgIDpnbG9iYWwoLnNsaWNrLWRpc2FibGVkKSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICAgIDxIZWFkPlxuICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCIgLz5cbiAgICAgIDxtZXRhXG4gICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgc2hyaW5rLXRvLWZpdD1ub1wiXG4gICAgICAvPlxuICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwMDAwMDBcIiAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Tb3VyY2UrU2FucytQcm86NDAwLDYwMHxMb3JhOjQwMCw3MDBcIlxuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgIC8+XG4gICAgICA8bGlua1xuICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgdHlwZT1cInRleHQvY3NzXCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NsaWNrLWNhcm91c2VsLzEuNi4wL3NsaWNrLm1pbi5jc3NcIlxuICAgICAgLz5cbiAgICAgIDxsaW5rXG4gICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICB0eXBlPVwidGV4dC9jc3NcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2stdGhlbWUubWluLmNzc1wiXG4gICAgICAvPlxuICAgICAgPGxpbmtcbiAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgIGhyZWY9XCJodHRwczovL3VucGtnLmNvbS9yZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzXCJcbiAgICAgIC8+XG4gICAgICA8dGl0bGU+UmVhY3QgQXBwPC90aXRsZT5cbiAgICA8L0hlYWQ+XG4gICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogdXRpbFN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9IZWFkL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcywgc3R5bGVzaGVldCB9IGZyb20gXCIuL0Zvb3Rlci5jc3NcIjtcblxuY29uc3QgZHBsYUxvZ28gPSBcIi9zdGF0aWMvaW1hZ2VzL2RwbGEtbG9nby5zdmdcIjtcbmNvbnN0IGZiSWNvbiA9IFwiL3N0YXRpYy9pbWFnZXMvZmFjZWJvb2suc3ZnXCI7XG5jb25zdCBpZ0ljb24gPSBcIi9zdGF0aWMvaW1hZ2VzL2luc3RhZ3JhbS5zdmdcIjtcbmNvbnN0IHJzc0ljb24gPSBcIi9zdGF0aWMvaW1hZ2VzL3Jzcy5zdmdcIjtcbmNvbnN0IHR1bWJsckljb24gPSBcIi9zdGF0aWMvaW1hZ2VzL3R1bWJsci5zdmdcIjtcblxuY29uc3QgRm9vdGVyID0gKCkgPT5cbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuZm9vdGVyfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rc0FuZERvbmF0ZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rc1dyYXBwZXJ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5saW5rc30+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua0hlYWRlcn0+RFBMQTwvaDM+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaT5BYm91dCBVczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5GQVE8L2xpPlxuICAgICAgICAgICAgICA8bGk+V2hvIFVzZXMgRFBMQT88L2xpPlxuICAgICAgICAgICAgICA8bGk+VGVybXMgJmFtcDsgQ29uZGl0aW9uczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5Db250YWN0IFVzPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua0hlYWRlcn0+VG9vbHM8L2gzPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGk+U2VhcmNoPC9saT5cbiAgICAgICAgICAgICAgPGxpPkV4aGliaXRpb25zPC9saT5cbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvcHJpbWFyeS1zb3VyY2Utc2V0c1wiPlxuICAgICAgICAgICAgICAgICAgPGE+UHJpbWFyeSBTb3VyY2UgU2V0czwvYT5cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2Jyb3dzZS1ieS10b3BpY1wiPlxuICAgICAgICAgICAgICAgICAgPGE+QnJvd3NlIGJ5IFRvcGljPC9hPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpPkJyb3dzZSBieSBQYXJ0bmVyPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua0hlYWRlcn0+UHJvIENvbW11bml0eTwvaDM+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaT5BYm91dCBEUExBPC9saT5cbiAgICAgICAgICAgICAgPGxpPkh1YnM8L2xpPlxuICAgICAgICAgICAgICA8bGk+UHJvamVjdHM8L2xpPlxuICAgICAgICAgICAgICA8bGk+R2V0IEludm9sdmVkPC9saT5cbiAgICAgICAgICAgICAgPGxpPkVkdWNhdG9yczwvbGk+XG4gICAgICAgICAgICAgIDxsaT5EZXZlbG9wZXJzPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5kb25hdGVCdXR0b259PkRvbmF0ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmxvZ29BbmRTb2NpYWxXcmFwcGVyfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmxvZ29BbmRTb2NpYWx9PlxuICAgICAgICA8aW1nIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5kcGxhTG9nb30gYWx0PVwiRFBMQVwiIHNyYz17ZHBsYUxvZ299IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnNvY2lhbH0+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnNvY2lhbEJ1dHRvbn1cbiAgICAgICAgICAgIGFsdD1cIkZhY2Vib29rXCJcbiAgICAgICAgICAgIHNyYz17ZmJJY29ufVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc29jaWFsQnV0dG9ufVxuICAgICAgICAgICAgYWx0PVwiSW5zdGFncmFtXCJcbiAgICAgICAgICAgIHNyYz17aWdJY29ufVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc29jaWFsQnV0dG9ufVxuICAgICAgICAgICAgYWx0PVwiUlNTIEZlZWRcIlxuICAgICAgICAgICAgc3JjPXtyc3NJY29ufVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc29jaWFsQnV0dG9ufVxuICAgICAgICAgICAgYWx0PVwiVHVtYmxyXCJcbiAgICAgICAgICAgIHNyYz17dHVtYmxySWNvbn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL01haW5MYXlvdXQvY29tcG9uZW50cy9Gb290ZXIvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmltcG9ydCB7IHN0eWxlc2hlZXQsIGNsYXNzTmFtZXMgfSBmcm9tIFwiLi9IZWFkZXIuY3NzXCI7XG5cbmNvbnN0IEhlYWRlciA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmhlYWRlcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua3NDb250YWluZXJ9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubWFpbkxpbmtzfT5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICA8YT5Ib21lPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIvYnJvd3NlLWJ5LXRvcGljXCI+XG4gICAgICAgICAgPGE+QnJvd3NlPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9XCJcIj5cbiAgICAgICAgICA8YT5FeGhpYml0aW9uczwvYT5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiL3ByaW1hcnktc291cmNlLXNldHNcIj5cbiAgICAgICAgICA8YT5QcmltYXJ5IFNvdXJjZSBTZXRzPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5kaXZpZGVyfSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc2Vjb25kYXJ5TGlua3N9PlxuICAgICAgICA8TGluayBocmVmPVwiXCI+XG4gICAgICAgICAgPGE+QWJvdXQgVXM8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIlwiPlxuICAgICAgICAgIDxhPk5ld3M8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIlwiPlxuICAgICAgICAgIDxhPlBybyBDb21tdW5pdHk8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubG9naW59PkxvZyBJbjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL01haW5MYXlvdXQvY29tcG9uZW50cy9IZWFkZXIvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmltcG9ydCB7IHN0eWxlc2hlZXQsIGNsYXNzTmFtZXMgfSBmcm9tIFwiLi9IZWFkZXJTZWFyY2hCYXIuY3NzXCI7XG5cbmNvbnN0IGRwbGFMb2dvID0gXCIvc3RhdGljL2ltYWdlcy9kcGxhLWxvZ28td2hpdGUuc3ZnXCI7XG5jb25zdCBzZWFyY2hJY29uID0gXCIvc3RhdGljL2ltYWdlcy9zZWFyY2guc3ZnXCI7XG5cbmNvbnN0IEhlYWRlclNlYXJjaEJhciA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmhlYWRlclNlYXJjaEJhcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuZmxleFdyYXBwZXJ9PlxuICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgPGE+XG4gICAgICAgICAgPGltZyBhbHQ9XCJEUExBXCIgc3JjPXtkcGxhTG9nb30gY2xhc3NOYW1lPXtjbGFzc05hbWVzLmxvZ299IC8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvTGluaz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnNlYXJjaEJhcn0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zZWFyY2hJbnB1dH1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCB0aGUgY29sbGVjdGlvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtjbGFzc05hbWVzLnNlYXJjaEJ1dHRvbn0+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgYWx0PVwiU2VhcmNoXCJcbiAgICAgICAgICAgIHNyYz17c2VhcmNoSWNvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zZWFyY2hJY29ufVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNwYW4+U2VhcmNoPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTZWFyY2hCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL01haW5MYXlvdXQvY29tcG9uZW50cy9IZWFkZXJTZWFyY2hCYXIvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCBIZWFkIGZyb20gXCIuLi9IZWFkXCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL2NvbXBvbmVudHMvSGVhZGVyXCI7XG5pbXBvcnQgSGVhZGVyU2VhcmNoQmFyIGZyb20gXCIuL2NvbXBvbmVudHMvSGVhZGVyU2VhcmNoQmFyXCI7XG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuL2NvbXBvbmVudHMvRm9vdGVyXCI7XG5cbmNvbnN0IE1haW5MYXlvdXQgPSAoeyBjaGlsZHJlbiwgaGlkZVNlYXJjaEJhciB9KSA9PlxuICA8ZGl2PlxuICAgIDxIZWFkIC8+XG4gICAgPEhlYWRlciAvPlxuICAgIHshaGlkZVNlYXJjaEJhciAmJiA8SGVhZGVyU2VhcmNoQmFyIC8+fVxuICAgIHtjaGlsZHJlbn1cbiAgICA8Rm9vdGVyIC8+XG4gIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkxheW91dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvTWFpbkxheW91dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL1N0dWRlbnRNb2RlLmNzc1wiO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSBcIi4uLy4uLy4uLy4uL1Rvb2x0aXBcIjtcblxuY29uc3QgcXVlc3Rpb24gPSBcInN0YXRpYy9pbWFnZXMvcXVlc3Rpb24uc3ZnXCI7XG5cbmNvbnN0IGlzU3R1ZGVudE1vZGUgPSAoKSA9PiBmYWxzZTsgLy9UT0RPIGZpeCB0aGlzXG5cbmNsYXNzIFN0dWRlbnRNb2RlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93VG9vbHRpcDogZmFsc2UgfSk7XG4gIH1cblxuICBzaG93VG9vbHRpcCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1Rvb2x0aXA6IHRydWUgfSk7XG4gIH1cblxuICBoaWRlVG9vbHRpcCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1Rvb2x0aXA6IGZhbHNlIH0pO1xuICB9XG5cbiAgdG9nZ2xlVG9vbHRpcCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1Rvb2x0aXA6ICF0aGlzLnN0YXRlLnNob3dUb29sdGlwIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBpc1N0dWRlbnRNb2RlKClcbiAgICAgID8gPGJ1dHRvblxuICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJzdHVkZW50LW1vZGUtdG9vbHRpcFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc3R1ZGVudE1vZGV9XG4gICAgICAgICAgb25Nb3VzZU92ZXI9eygpID0+IHRoaXMuc2hvd1Rvb2x0aXAoKX1cbiAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB0aGlzLnNob3dUb29sdGlwKCl9XG4gICAgICAgICAgb25CbHVyPXsoKSA9PiB0aGlzLmhpZGVUb29sdGlwKCl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB0aGlzLmhpZGVUb29sdGlwKCl9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy50b2dnbGVUb29sdGlwKCl9XG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9e3N0eWxlcy5zdHVkZW50TW9kZVRleHR9PlN0dWRlbnQgTW9kZTwvaDM+XG4gICAgICAgICAgPGltZyBzcmM9e3F1ZXN0aW9ufSBhbHQ9XCJcIiBjbGFzc05hbWU9e3N0eWxlcy5xdWVzdGlvbkljb259IC8+XG4gICAgICAgICAgPFRvb2x0aXBcbiAgICAgICAgICAgIGlkPVwic3R1ZGVudC1tb2RlLXRvb2x0aXBcIlxuICAgICAgICAgICAgaXNIaWRkZW49eyF0aGlzLnN0YXRlLnNob3dUb29sdGlwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMudG9vbHRpcH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy50b29sdGlwVGV4dH0+XG4gICAgICAgICAgICAgIFlvdeKAmXJlIHZpZXdpbmcgdGhpcyBQcmltYXJ5IFNvdXJjZSBTZXQgd2l0aCB0aGUgdGVhY2hpbmcgZ3VpZGVzXG4gICAgICAgICAgICAgIGhpZGRlbi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxMaW5rPlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e3N0eWxlcy50b29sdGlwTGlua30+VHVybiBvbiBUZWFjaGluZyBHdWlkZXM8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHVkZW50TW9kZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL0JyZWFkY3J1bWJzTW9kdWxlL2NvbXBvbmVudHMvU3R1ZGVudE1vZGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCBCcmVhZGNydW1icyBmcm9tIFwiLi4vLi4vQnJlYWRjcnVtYnNcIjtcbmltcG9ydCBTdHVkZW50TW9kZSBmcm9tIFwiLi9jb21wb25lbnRzL1N0dWRlbnRNb2RlXCI7XG5cbmltcG9ydCB7IHN0eWxlc2hlZXQsIGNsYXNzTmFtZXMgfSBmcm9tIFwiLi9CcmVhZGNydW1ic01vZHVsZS5jc3NcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgYXMgdXRpbENsYXNzTmFtZXMgfSBmcm9tIFwiY3NzL3V0aWxzLmNzc1wiO1xuXG5jb25zdCB7IG1vZHVsZSB9ID0gdXRpbENsYXNzTmFtZXM7XG5cbmNvbnN0IEJyZWFkY3J1bWJzTW9kdWxlID0gKHsgc2hvd1N0dWRlbnRNb2RlLCBicmVhZGNydW1icyB9KSA9PlxuICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy53cmFwcGVyfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17W21vZHVsZSwgY2xhc3NOYW1lcy5icmVhZGNydW1ic01vZHVsZV0uam9pbihcIiBcIil9PlxuICAgICAgPEJyZWFkY3J1bWJzIGJyZWFkY3J1bWJzPXticmVhZGNydW1ic30gLz5cbiAgICAgIHtzaG93U3R1ZGVudE1vZGUgJiYgPFN0dWRlbnRNb2RlIC8+fVxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBCcmVhZGNydW1ic01vZHVsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL0JyZWFkY3J1bWJzTW9kdWxlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuXG5pbXBvcnQgeyBjbGFzc05hbWVzLCBzdHlsZXNoZWV0IH0gZnJvbSBcIi4vUFNTRm9vdGVyLmNzc1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyBhcyB1dGlsQ2xhc3NOYW1lcyB9IGZyb20gXCJjc3MvdXRpbHMuY3NzXCI7XG5cbmNvbnN0IHsgbW9kdWxlIH0gPSB1dGlsQ2xhc3NOYW1lcztcbmNvbnN0IE90aGVySW5mbyA9ICgpID0+XG4gIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLndyYXBwZXJ9PlxuICAgIDxkaXYgY2xhc3NOYW1lPXtbbW9kdWxlLCBjbGFzc05hbWVzLm90aGVySW5mb10uam9pbihcIiBcIil9PlxuICAgICAgPHAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnB9PlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICBUaGVzZSBzZXRzIHdlcmUgY3JlYXRlZCBhbmQgcmV2aWV3ZWQgYnkgdGhlIHRlYWNoZXJzIG9uIHRoZSZuYnNwO1xuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxMaW5rIHRvPVwiXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmxpbmt9PlxuICAgICAgICAgICAgRFBMQSdzIEVkdWNhdGlvbiBBZHZpc29yeSBDb21taXR0ZWUuXG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L3A+XG4gICAgICA8cCBjbGFzc05hbWU9e2NsYXNzTmFtZXMucH0+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIFRvIGdpdmUgZmVlZGJhY2sgb3Igc3VnZ2VzdCBhIFNvdXJjZSBTZXQsIGNvbnRhY3QgdXMgYXQmbmJzcDtcbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8YSBjbGFzc05hbWU9e2NsYXNzTmFtZXMubGlua30gbWFpbHRvPVwiZWR1Y2F0aW9uQGRwLmxhXCI+XG4gICAgICAgICAgZWR1Y2F0aW9uQGRwLmxhXG4gICAgICAgIDwvYT5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZXNoZWV0IH19IC8+XG4gIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgT3RoZXJJbmZvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvUFNTRm9vdGVyL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBzdHlsZXNoZWV0LCBjbGFzc05hbWVzIH0gZnJvbSBcIi4vUmVsYXRlZFNldHMuY3NzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIGFzIHV0aWxDbGFzc05hbWVzIH0gZnJvbSBcImNzcy91dGlscy5jc3NcIjtcblxuY29uc3QgeyBtb2R1bGUgfSA9IHV0aWxDbGFzc05hbWVzO1xuXG5jb25zdCBtb2NrU2V0cyA9IFtcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzIwMC9mb29kXCIsXG4gICAgdGl0bGU6IFwiTmV3IFlvcmsgQ2l0eVwiXG4gIH0sXG4gIHtcbiAgICBpbWc6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC8yMDAvZm9vZFwiLFxuICAgIHRpdGxlOiBcIkVhcmx5IENoaW5lc2UgSW1taWdyYXRpb24gdG8gdGhlIFVTXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzIwMC9mb29kXCIsXG4gICAgdGl0bGU6IFwiTWV4aWNhbiBMYWJvciBhbmQgV29ybGQgV2FyIElJOiBUaGUgQnJhY2Vyby4uLlwiXG4gIH0sXG4gIHtcbiAgICBpbWc6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC8yMDAvZm9vZFwiLFxuICAgIHRpdGxlOiBcIlRoZSBJbXBhY3Qgb2YgVGVsZXZpc2lvbiBvbiBOZXdzIE1lZGlhXCJcbiAgfVxuXTtcblxuY29uc3QgUmVsYXRlZFNldHMgPSAoKSA9PlxuICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy53cmFwcGVyfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17W21vZHVsZSwgY2xhc3NOYW1lcy5yZWxhdGVkU2V0c10uam9pbihcIiBcIil9PlxuICAgICAgPGgzIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5oZWFkZXJ9PlJlbGF0ZWQgUHJpbWFyeSBTb3VyY2UgU2V0czwvaDM+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zZXRzfT5cbiAgICAgICAge21vY2tTZXRzLm1hcCgoeyBpbWcsIHRpdGxlIH0pID0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuc2V0fT5cbiAgICAgICAgICAgIDxpbWcgYWx0PXt0aXRsZX0gc3JjPXtpbWd9IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zZXRJbWFnZX0gLz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy50aXRsZX0+XG4gICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBSZWxhdGVkU2V0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL1NpbmdsZVNldC9SZWxhdGVkU2V0cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IHsgc3R5bGVzaGVldCwgY2xhc3NOYW1lcyB9IGZyb20gXCIuL1Jlc291cmNlc1RhYnMuY3NzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIGFzIHV0aWxDbGFzc05hbWVzIH0gZnJvbSBcImNzcy91dGlscy5jc3NcIjtcblxuY29uc3QgeyBtb2R1bGUgfSA9IHV0aWxDbGFzc05hbWVzO1xuXG4vLyBpbXBvcnQgU291cmNlU2V0U291cmNlcyBmcm9tIFwiLi4vU291cmNlU2V0U291cmNlc1wiO1xuLy8gaW1wb3J0IFRlYWNoaW5nR3VpZGUgZnJvbSBcIi4uL1RlYWNoaW5nR3VpZGVcIjtcblxuY2xhc3MgUmVzb3VyY2VzVGFicyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAvLyBjb25zdCB7IGxvY2F0aW9uLCBoaXN0b3J5IH0gPSB0aGlzLnByb3BzLnJvdXRlclByb3BzO1xuICAgIC8vIGNvbnN0IGlzU3R1ZGVudE1vZGUgPSBsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoXCJzdHVkZW50XCIpO1xuICAgIC8vIGlmICgvXFwvcHJpbWFyeS1zb3VyY2Utc2V0c1xcLy4rXFwvdGVhY2hpbmctZ3VpZGUvLmV4ZWMobG9jYXRpb24ucGF0aG5hbWUpKSB7XG4gICAgLy8gICBpZiAoaXNTdHVkZW50TW9kZSkge1xuICAgIC8vICAgICBoaXN0b3J5LnB1c2goYCR7bG9jYXRpb24ucGF0aG5hbWV9YCk7XG4gICAgLy8gICB9XG4gICAgLy8gICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFRhYjogXCJ0ZWFjaGluZ0d1aWRlXCIgfSk7XG4gICAgLy8gfSBlbHNlIGlmIChcbiAgICAvLyAgIC9cXC9wcmltYXJ5LXNvdXJjZS1zZXRzXFwvLitcXC9hZGRpdGlvbmFsLXJlc291cmNlcy8uZXhlYyhsb2NhdGlvbi5wYXRobmFtZSlcbiAgICAvLyApIHtcbiAgICAvLyAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50VGFiOiBcImFkZGl0aW9uYWxSZXNvdXJjZXNcIiB9KTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRUYWI6IFwic291cmNlU2V0XCIgfSk7XG4gICAgLy8gfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHN0dWRlbnRNb2RlOiBmYWxzZSB9KTtcbiAgfVxuXG4gIG9uVGFiQ2hhbmdlKG5ld1RhYikge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50VGFiOiBuZXdUYWIgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaXNTdHVkZW50TW9kZSA9IGZhbHNlO1xuICAgIGNvbnN0IHsgc2x1ZyB9ID0gdGhpcy5wcm9wcy5zZXQ7XG4gICAgY29uc3QgeyBjdXJyZW50VGFiIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRUYWIpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy53cmFwcGVyfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMudGFic1dyYXBwZXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtbY2xhc3NOYW1lcy50YWJzLCBtb2R1bGVdLmpvaW4oXCIgXCIpfT5cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgIGhyZWY9e2AvcHJpbWFyeS1zb3VyY2Utc2V0cy9zZXQ/c2V0PSR7c2x1Z31gfVxuICAgICAgICAgICAgICBhcz17YC9wcmltYXJ5LXNvdXJjZS1zZXRzLyR7c2x1Z31gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17W1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcy50YWIsXG4gICAgICAgICAgICAgICAgICBjdXJyZW50VGFiID09PSBcInNvdXJjZVNldFwiICYmIGNsYXNzTmFtZXMuYWN0aXZlVGFiXG4gICAgICAgICAgICAgICAgXS5qb2luKFwiIFwiKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNvdXJjZSBTZXRcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmsgb25DbGljaz17KCkgPT4gdGhpcy5vblRhYkNoYW5nZShcImFkZGl0aW9uYWxSZXNvdXJjZXNcIil9PlxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17W1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcy50YWIsXG4gICAgICAgICAgICAgICAgICBjdXJyZW50VGFiID09PSBcImFkZGl0aW9uYWxSZXNvdXJjZXNcIiAmJiBjbGFzc05hbWVzLmFjdGl2ZVRhYlxuICAgICAgICAgICAgICAgIF0uam9pbihcIiBcIil9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBBZGRpdGlvbmFsIFJlc291cmNlc1xuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICB7IWlzU3R1ZGVudE1vZGUgJiZcbiAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICBocmVmPXtgL3ByaW1hcnktc291cmNlLXNldHMvc2V0L3RlYWNoaW5nLWd1aWRlP3NldD0ke3NsdWd9YH1cbiAgICAgICAgICAgICAgICBhcz17YC9wcmltYXJ5LXNvdXJjZS1zZXRzLyR7c2x1Z30vdGVhY2hpbmctZ3VpZGVgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17W1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnRhYixcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhYiA9PT0gXCJ0ZWFjaGluZ0d1aWRlXCIgJiYgY2xhc3NOYW1lcy5hY3RpdmVUYWJcbiAgICAgICAgICAgICAgICAgIF0uam9pbihcIiBcIil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgVGVhY2hpbmcgR3VpZGVcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvTGluaz59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3R5bGVzaGVldCB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXNvdXJjZXNUYWJzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1Jlc291cmNlc1RhYnMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IHN0eWxlc2hlZXQsIGNsYXNzTmFtZXMgfSBmcm9tIFwiLi9Tb3VyY2VTZXRJbmZvLmNzc1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyBhcyB1dGlsQ2xhc3NOYW1lcyB9IGZyb20gXCJjc3MvdXRpbHMuY3NzXCI7XG5cbmNvbnN0IHsgbW9kdWxlIH0gPSB1dGlsQ2xhc3NOYW1lcztcblxuY29uc3QgaGVhcnQgPSBcIi9zdGF0aWMvaW1hZ2VzL2hlYXJ0LnN2Z1wiO1xuXG5jb25zdCBTb3VyY2VTZXRJbmZvID0gKCkgPT5cbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMud3JhcHBlcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e1tjbGFzc05hbWVzLnNvdXJjZVNldEluZm8sIG1vZHVsZV0uam9pbihcIiBcIil9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuYmFubmVyQW5kRGVzY3JpcHRpb259PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5iYW5uZXJ9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5iYW5uZXJJbWFnZX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC8yMDAvZm9vZClcIlxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmJhbm5lclRleHRXcmFwcGVyfT5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMuYmFubmVyUmVzb3VyY2VUeXBlfT5cbiAgICAgICAgICAgICAgUHJpbWFyeSBTb3VyY2UgU2V0XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5iYW5uZXJUaXRsZX0+V29tZW4gaW4gdGhlIENpdmlsIFdhcjwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9e2NsYXNzTmFtZXMuZGVzY3JpcHRpb259PlxuICAgICAgICAgIFRoZSBBbWVyaWNhbiBDaXZpbCBXYXIgYnJvdWdodCB3b21lbiBuZXcgcmVzcG9uc2liaWxpdGllcyBvbiB0aGVcbiAgICAgICAgICBiYXR0bGVmaWVsZCBhbmQgYXQgaG9tZS4gTWFueSBiZWNhbWUgcHJvdmlkZXJzIGZvciB0aGVpciBmYW1pbGllcyxcbiAgICAgICAgICBtYW5hZ2luZyBmYXJtcyBhbmQgYnVzaW5lc3NlcyB3aGlsZSBtYWxlIHJlbGF0aXZlcyBzZXJ2ZWQgaW4gdGhlXG4gICAgICAgICAgbWlsaXRhcnkuIE1hbnkgYWxzbyBjb250cmlidXRlZCB0byB0aGUgVW5pb24gb3IgQ29uZmVkZXJhY3kuIFNvbWVcbiAgICAgICAgICByYWlzZWQgbW9uZXkgYW5kIHN1cHBsaWVzIHRocm91Z2ggbGFkaWVz4oCZIGFpZCBhbmQgc29sZGllcnPigJkgYWlkXG4gICAgICAgICAgc29jaWV0aWVzIGFzIHdlbGwgYXMgdGhlIFVTIFNhbml0YXJ5IENvbW1pc3Npb24sIGEgcHJpdmF0ZSBhZ2VuY3kgdGhhdFxuICAgICAgICAgIG9wZXJhdGVkIGFjcm9zcyB0aGUgTm9ydGggYW5kIGJlY2FtZSBjcml0aWNhbCB0byB0aGUgVW5pb24gdmljdG9yeS5cbiAgICAgICAgICBPdGhlcnMgbnVyc2VkIHNvbGRpZXJzIChMb3Vpc2EgTWF5IEFsY290dCwgYXV0aG9yIG9mIHRoZSBiZWxvdmVkIG5vdmVsXG4gICAgICAgICAgTGl0dGxlIFdvbWVuLCB3b3JrZWQgYXMgYW4gYXJteSBudXJzZSksIHNwaWVkIG9uIHRoZSBlbmVteSwgY29va2VkIGFuZFxuICAgICAgICAgIGxhdW5kZXJlZCBmb3IgZW5saXN0ZWQgbWVuLCBhbmQgc2VydmVkIGFzIHVuaWZvcm1lZCBiYXR0bGVmaWVsZOKAplxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLnNpZGViYXJ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5tZXRhZGF0YX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMubWV0YWRhdHVtfT5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2NsYXNzTmFtZXMubWV0YWRhdGFIZWFkZXJ9PlByZXBhcmVkIEJ5PC9oMz5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBNZWxpc3NhIFN0cm9uZywgQ29tbXVuaXR5IENvbGxlZ2Ugb2YgUGhpbGFkZWxwaGlhLCBQaGlsYWRlbHBoaWEsXG4gICAgICAgICAgICAgIFBlbm5zeWx2YW5pYVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLm1ldGFkYXR1bX0+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtjbGFzc05hbWVzLm1ldGFkYXRhSGVhZGVyfT5UaW1lIFBlcmlvZDwvaDM+XG4gICAgICAgICAgICA8cD5DaXZpbCBXYXIgYW5kIFJlY29uc3RydWN0aW9uICgxODUwLTE4NzcpPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLm1ldGFkYXR1bX0+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtjbGFzc05hbWVzLm1ldGFkYXRhSGVhZGVyfT5TdWJqZWN0czwvaDM+XG4gICAgICAgICAgICA8cD5VLlMuIEhpc3RvcnksIFdvbWVuPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT17W2NsYXNzTmFtZXMuZmF2b3JpdGVzQnV0dG9uLCBjbGFzc05hbWVzLmJ1dHRvbl0uam9pbihcIiBcIil9XG4gICAgICAgID5cbiAgICAgICAgICA8aW1nIGFsdD1cIlwiIHNyYz17aGVhcnR9IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5oZWFydH0gLz5cbiAgICAgICAgICA8c3Bhbj5BZGQgdG8gZmF2b3JpdGVzPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT17W2NsYXNzTmFtZXMuY2l0ZUJ1dHRvbiwgY2xhc3NOYW1lcy5idXR0b25dLmpvaW4oXCIgXCIpfVxuICAgICAgICA+XG4gICAgICAgICAgQ2l0ZSB0aGlzIHNldFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBTb3VyY2VTZXRJbmZvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1NvdXJjZVNldEluZm8vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IG1vY2tTb3VyY2VzIGZyb20gXCIuLi9tb2NrU291cmNlc1wiO1xuaW1wb3J0IHsgc3R5bGVzaGVldCwgY2xhc3NOYW1lcyB9IGZyb20gXCIuL1NvdXJjZVNldFNvdXJjZXMuY3NzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIGFzIHV0aWxDbGFzc05hbWVzIH0gZnJvbSBcImNzcy91dGlscy5jc3NcIjtcblxuY29uc3QgeyBtb2R1bGUgfSA9IHV0aWxDbGFzc05hbWVzO1xuXG5jb25zdCBTb3VyY2VTZXRTb3VyY2VzID0gKCkgPT5cbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMud3JhcHBlcn0+XG4gICAgPGRpdiBjbGFzc05hbWU9e1tjbGFzc05hbWVzLnNvdXJjZVNldFNvdXJjZXMsIG1vZHVsZV0uam9pbihcIiBcIil9PlxuICAgICAge21vY2tTb3VyY2VzLm1hcCgoeyB0aXRsZSwgaW1nLCBpZCwgc2V0U2x1ZyB9KSA9PlxuICAgICAgICA8TGlua1xuICAgICAgICAgIGFzPXtgL3ByaW1hcnktc291cmNlLXNldHMvJHtzZXRTbHVnfS9zb3VyY2VzLyR7aWR9YH1cbiAgICAgICAgICBocmVmPXtgL3ByaW1hcnktc291cmNlLXNldHMvc2V0L3NvdXJjZXM/c291cmNlPSR7aWR9JnNldD0ke3NldFNsdWd9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5zZXR9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuaW1hZ2VXcmFwcGVyfT5cbiAgICAgICAgICAgICAgPGltZyBhbHQ9e3RpdGxlfSBzcmM9e2ltZ30gY2xhc3NOYW1lPXtjbGFzc05hbWVzLmltYWdlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e2NsYXNzTmFtZXMudGl0bGV9PlxuICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICAgIDxzdHlsZSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlc2hlZXQgfX0gLz5cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBTb3VyY2VTZXRTb3VyY2VzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9QcmltYXJ5U291cmNlU2V0c0NvbXBvbmVudHMvU2luZ2xlU2V0L1NvdXJjZVNldFNvdXJjZXMvaW5kZXguanMiLCJjb25zdCBtb2NrU291cmNlcyA9IFtcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDAsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDEsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDIsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDMsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDQsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDUsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDYsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDcsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDgsXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDksXG4gICAgc2V0U2x1ZzogXCJjaXZpbC13YXItYW5kLXJlY29uc3RydWN0aW9uXCIsXG4gICAgdGl0bGU6XG4gICAgICBcIkEgcGhvdG9ncmFwaGljIHBvcnRyYWl0IG9mIENsYXJhIEJhcnRvbiBhdHRyaWJ1dGVkIHRvIE1hdGhldyBCcmFkeSwgY2EuIDE4NjUuXCJcbiAgfSxcbiAge1xuICAgIGltZzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMTUyLzE2OC9mb29kXCIsXG4gICAgaWQ6IDEwLFxuICAgIHNldFNsdWc6IFwiY2l2aWwtd2FyLWFuZC1yZWNvbnN0cnVjdGlvblwiLFxuICAgIHRpdGxlOlxuICAgICAgXCJBIHBob3RvZ3JhcGhpYyBwb3J0cmFpdCBvZiBDbGFyYSBCYXJ0b24gYXR0cmlidXRlZCB0byBNYXRoZXcgQnJhZHksIGNhLiAxODY1LlwiXG4gIH0sXG4gIHtcbiAgICBpbWc6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzE1Mi8xNjgvZm9vZFwiLFxuICAgIGlkOiAxMSxcbiAgICBzZXRTbHVnOiBcImNpdmlsLXdhci1hbmQtcmVjb25zdHJ1Y3Rpb25cIixcbiAgICB0aXRsZTpcbiAgICAgIFwiQSBwaG90b2dyYXBoaWMgcG9ydHJhaXQgb2YgQ2xhcmEgQmFydG9uIGF0dHJpYnV0ZWQgdG8gTWF0aGV3IEJyYWR5LCBjYS4gMTg2NS5cIlxuICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBtb2NrU291cmNlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvUHJpbWFyeVNvdXJjZVNldHNDb21wb25lbnRzL1NpbmdsZVNldC9tb2NrU291cmNlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9Ub29sdGlwLmNzc1wiO1xuXG5jb25zdCBUb29sdGlwID0gKHsgY2xhc3NOYW1lLCBpZCwgaXNIaWRkZW4sIGNoaWxkcmVuIH0pID0+XG4gIDxkaXZcbiAgICBjbGFzc05hbWU9e1tjbGFzc05hbWUsIGlzSGlkZGVuICYmIHN0eWxlcy5oaWRkZW5dLmpvaW4oXCIgXCIpfVxuICAgIGlkPXtpZCB8fCBjbGFzc05hbWV9XG4gICAgcm9sZT1cInRvb2x0aXBcIlxuICAgIGFyaWEtaGlkZGVuPXtpc0hpZGRlbn1cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+O1xuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9Ub29sdGlwL2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiO0E7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTtBQUVBO0FBQUE7QUFEQTtBQUNBO0FBR0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUVBO0FBSUE7O0FBTEE7QUFPQTtBQVBBO0FBQ0E7O0FBTUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUVBO0FBRkE7QUFBQTs7QUFFQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUVBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBR0E7QUFIQTs7QUFSQTtBQWFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStCQTtBQS9CQTs7QUErQkE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBOztBQUdBO0FBQUE7QUFGQTs7QUFBQTtBQUlBO0FBSkE7QUFDQTs7QUFHQTtBQUNBO0FBREE7O0FBR0E7QUFBQTtBQUZBOztBQUFBO0FBSUE7QUFKQTtBQUNBO0FBS0E7QUFDQTtBQUFBO0FBSEE7O0FBQUE7QUFLQTtBQUxBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7QUFIQTs7QUFBQTtBQUtBO0FBTEE7QUFDQTtBQU1BO0FBQUE7QUFGQTs7QUFBQTtBQUlBO0FBSkE7QUFDQTtBQUdBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBOztBQTNEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7O0FBRUE7QUFFQTtBQUFBOztBQUhBO0FBTUE7QUFOQTtBQUNBO0FBTUE7QUFFQTtBQUFBOztBQUhBO0FBTUE7QUFOQTtBQUNBO0FBTUE7QUFFQTtBQUFBOztBQUhBO0FBTUE7QUFOQTtBQUNBO0FBTUE7QUFFQTtBQUFBOztBQUhBO0FBUUE7QUFSQTtBQUNBO0FBT0E7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1RkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBR0E7QUFIQTtBQUdBO0FBQUE7QUFDQTtBQURBOztBQUVBO0FBQ0E7O0FBRkE7QUFJQTtBQUpBO0FBQ0E7QUFHQTtBQUNBO0FBREE7O0FBR0E7QUFDQTtBQUFBOztBQUhBO0FBS0E7QUFMQTtBQUNBOztBQUlBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFFQTtBQUFBOzs7O0FBSUE7QUFBQTs7OztBQUlBO0FBQUE7Ozs7QUFJQTtBQUFBOzs7O0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7O0FBUkE7QUFVQTtBQVZBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBRUE7QUFBQTtBQUNBOztBQUhBO0FBS0E7QUFMQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBSUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7Ozs7QUF6Q0E7QUFDQTtBQWdEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUVBO0FBRkE7QUFBQTtBQUVBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBOztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFEQTtBQUtBO0FBQUE7QUFEQTtBQUtBO0FBQUE7QUFEQTtBQUtBO0FBQUE7QUFEQTtBQUNBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBT0E7QUFBQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTs7OztBQUdBO0FBQ0E7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUFBOztBQUZBO0FBSUE7QUFKQTtBQUNBO0FBSUE7O0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFRQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTs7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQVdBO0FBQUE7O0FBRkE7QUFJQTtBQUpBO0FBQ0E7QUFJQTs7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQVdBO0FBR0E7QUFIQTs7Ozs7O0FBekVBO0FBQ0E7QUE4RUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0ZBO0FBQ0E7OztBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7O0FBRUE7O0FBRUE7QUFBQTs7QUFIQTtBQU1BO0FBTkE7QUFDQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQWFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBOztBQURBO0FBR0E7QUFIQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTs7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFGQTtBQUlBO0FBSkE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBT0E7QUFBQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFLQTtBQVJBO0FBQ0E7QUFPQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4RkE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTs7QUFKQTtBQU1BO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        