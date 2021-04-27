(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/shared/UI_service/custom-icons.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/UI_service/custom-icons.service.ts ***!
  \***********************************************************/
/*! exports provided: CustomIconsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomIconsService", function() { return CustomIconsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");



class CustomIconsService {
    constructor(_ds) {
        this._ds = _ds;
    }
    setIcon(param) {
        return this._ds.bypassSecurityTrustHtml(param);
    }
}
CustomIconsService.ɵfac = function CustomIconsService_Factory(t) { return new (t || CustomIconsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"])); };
CustomIconsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CustomIconsService, factory: CustomIconsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CustomIconsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"] }]; }, null); })();


/***/ }),

/***/ "./src/app/shared/icon/custom-icon.ts":
/*!********************************************!*\
  !*** ./src/app/shared/icon/custom-icon.ts ***!
  \********************************************/
/*! exports provided: allIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allIcons", function() { return allIcons; });
let allIcons = {
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="15.25" height="18.769" viewBox="0 0 15.25 18.769"><g transform="translate(-48)"><path d="M61.784,2.409H58.558v-.6A1.784,1.784,0,0,0,56.8,0H54.452a1.784,1.784,0,0,0-1.76,1.807v.6H49.466A1.486,1.486,0,0,0,48,3.914v1.2a.6.6,0,0,0,.587.6H62.663a.6.6,0,0,0,.587-.6v-1.2A1.486,1.486,0,0,0,61.784,2.409Zm-7.918-.6a.6.6,0,0,1,.587-.6H56.8a.6.6,0,0,1,.587.6v.6H53.865Z" fill="#fff"/><path d="M73.547,184a.186.186,0,0,0-.182.2l.482,10.427a1.775,1.775,0,0,0,1.751,1.721h8.874a1.775,1.775,0,0,0,1.751-1.721L86.7,184.2a.186.186,0,0,0-.182-.2Zm8.825,1.506a.585.585,0,1,1,1.169,0v7.829a.585.585,0,1,1-1.169,0Zm-2.922,0a.585.585,0,1,1,1.169,0v7.829a.585.585,0,1,1-1.169,0Zm-2.922,0a.585.585,0,1,1,1.169,0v7.829a.585.585,0,1,1-1.169,0Z" transform="translate(-24.41 -177.576)" fill="#fff"/></g></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 23.596 21.333"><path d="M935.9,1802.268a6.544,6.544,0,0,1,8.88,9.6h0l-8.88,7.831-8.88-7.831h0a6.543,6.543,0,0,1,4.62-11.169A6.585,6.585,0,0,1,935.9,1802.268Zm0,1.515a5.484,5.484,0,1,1,8.128,7.344l-8.128,7.067-8.138-7.067a5.488,5.488,0,1,1,8.138-7.344Z" transform="translate(-924.1 -1799.7)" fill="none" stroke="#fff" stroke-width="2" fill-rule="evenodd"/></svg>`,
    Edit: `<svg xmlns="http://www.w3.org/2000/svg" width="17.385" height="17.385" viewBox="0 0 17.385 17.385"><g transform="translate(0 -0.004)"><g transform="translate(0 1.245)"><path d="M14.28,41.588a.621.621,0,0,0-.621.621v6.209a.621.621,0,0,1-.621.621H1.863a.621.621,0,0,1-.621-.621V36a.621.621,0,0,1,.621-.621H9.313a.621.621,0,1,0,0-1.242H1.863A1.863,1.863,0,0,0,0,36V48.417A1.863,1.863,0,0,0,1.863,50.28H13.038A1.863,1.863,0,0,0,14.9,48.417V42.208A.621.621,0,0,0,14.28,41.588Z" transform="translate(0 -34.137)" fill="#fff"/></g><g transform="translate(3.726 0.004)"><g transform="translate(0 0)"><path d="M115.372.7a2.377,2.377,0,0,0-3.362,0l-8.178,8.178a.628.628,0,0,0-.15.243l-1.242,3.725a.621.621,0,0,0,.589.817.631.631,0,0,0,.2-.032l3.725-1.242a.621.621,0,0,0,.243-.15l8.178-8.178A2.377,2.377,0,0,0,115.372.7Z" transform="translate(-102.409 -0.004)" fill="#fff"/></g></g></g></svg>`,
    bookAppointment: `<svg xmlns="http://www.w3.org/2000/svg" width="19.563" height="22.357" viewBox="0 0 19.563 22.357"><path d="M19.039,6.987H.524A.526.526,0,0,1,0,6.463V4.891a2.1,2.1,0,0,1,2.1-2.1h2.1V.524A.526.526,0,0,1,4.716,0H6.463a.526.526,0,0,1,.524.524V2.795h5.589V.524A.526.526,0,0,1,13.1,0h1.747a.526.526,0,0,1,.524.524V2.795h2.1a2.1,2.1,0,0,1,2.1,2.1V6.463A.526.526,0,0,1,19.039,6.987ZM.524,8.384H19.039a.526.526,0,0,1,.524.524V20.261a2.1,2.1,0,0,1-2.1,2.1H2.1a2.1,2.1,0,0,1-2.1-2.1V8.908A.526.526,0,0,1,.524,8.384Zm13.8,6.113a.526.526,0,0,0-.524-.524h-2.62v-2.62a.526.526,0,0,0-.524-.524H8.908a.526.526,0,0,0-.524.524v2.62H5.764a.526.526,0,0,0-.524.524v1.747a.526.526,0,0,0,.524.524h2.62v2.62a.526.526,0,0,0,.524.524h1.747a.526.526,0,0,0,.524-.524v-2.62H13.8a.526.526,0,0,0,.524-.524Z" fill="#fff"/></svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18"><g transform="translate(-60 -4)"><g transform="translate(60 4)"><path d="M67,4a7.008,7.008,0,0,0-7,7c0,1.875,1.136,4.283,3.376,7.156A38.066,38.066,0,0,0,66.7,21.881a.429.429,0,0,0,.592,0,38.063,38.063,0,0,0,3.327-3.725C72.864,15.283,74,12.875,74,11a7.008,7.008,0,0,0-7-7Zm0,12a5,5,0,1,1,5-5A5.006,5.006,0,0,1,67,16Z" transform="translate(-60 -4)" fill="#fff"/><path d="M163,102.969l-3.143-2.857a.429.429,0,0,0-.577,0l-3.143,2.857a.429.429,0,0,0-.08.537.44.44,0,0,0,.381.209h.416v2.714a.429.429,0,0,0,.429.429h1a.429.429,0,0,0,.429-.429v-1.571a.429.429,0,0,1,.429-.429H160a.429.429,0,0,1,.429.429v1.571a.429.429,0,0,0,.429.429h1a.429.429,0,0,0,.429-.429v-2.714h.416a.44.44,0,0,0,.381-.209A.429.429,0,0,0,163,102.969Z" transform="translate(-152.57 -96.572)" fill="#fff"/></g></g></svg>`,
    pen: `<svg xmlns="http://www.w3.org/2000/svg" width="12.09" height="12.09" viewBox="0 0 12.09 12.09"><g transform="translate(8.374 0)"><path d="M357.959,1.471l-1.1-1.1a1.285,1.285,0,0,0-1.816,0L354.619.8l2.911,2.911.429-.429A1.283,1.283,0,0,0,357.959,1.471Z" transform="translate(-354.619 0)" fill="#fff"/></g><g transform="translate(0 8.896)"><path d="M.52,376.747l-.514,2.775a.354.354,0,0,0,.413.413l2.775-.514Z" transform="translate(0 -376.747)" fill="#fff"/></g><g transform="translate(0.902 1.305)"><path d="M45.169,55.274,38.2,62.245l2.911,2.911,6.971-6.971Z" transform="translate(-38.198 -55.274)" fill="#fff"/></g></svg>`,
    more: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="5" viewBox="0 0 17 5"><g transform="translate(-7484 -5093)"><g transform="translate(7484 5093)" fill="#707070" stroke="#707070" stroke-width="1"><circle cx="2.5" cy="2.5" r="2.5" stroke="none"/><circle cx="2.5" cy="2.5" r="2" fill="none"/></g><g transform="translate(7496 5093)" fill="#707070" stroke="#707070" stroke-width="1"><circle cx="2.5" cy="2.5" r="2.5" stroke="none"/><circle cx="2.5" cy="2.5" r="2" fill="none"/></g><g transform="translate(7490 5093)" fill="#707070" stroke="#707070" stroke-width="1"><circle cx="2.5" cy="2.5" r="2.5" stroke="none"/><circle cx="2.5" cy="2.5" r="2" fill="none"/></g></g></svg>`,
    video: `<svg xmlns="http://www.w3.org/2000/svg" width="17.281" height="9.677" viewBox="0 0 17.281 9.677"><g transform="translate(-2 -7.5)"><path d="M12.369,17.177H3.382A1.382,1.382,0,0,1,2,15.795V8.882A1.382,1.382,0,0,1,3.382,7.5h8.986a1.382,1.382,0,0,1,1.382,1.382v6.912A1.382,1.382,0,0,1,12.369,17.177Z" fill="#fff"/><path d="M21,10.533v4.147l3.073,2.049a.691.691,0,0,0,1.075-.576V9.06a.691.691,0,0,0-1.075-.575Z" transform="translate(-5.866 -0.268)" fill="#fff"/></g></svg>`,
    rechedule: `<svg xmlns="http://www.w3.org/2000/svg" width="16.199" height="16.199" viewBox="0 0 16.199 16.199"><g transform="translate(-213.898 5298.268)"><path d="M11.1,3a8.1,8.1,0,1,0,8.1,8.1A8.092,8.092,0,0,0,11.1,3Z" transform="translate(210.898 -5279.069) rotate(-90)" fill="#fff"/><g transform="translate(193.007 -5318.998)"><path d="M28.8,33.607a4.8,4.8,0,1,1,4.628-6.1.5.5,0,1,1-.957.267,3.836,3.836,0,0,0-1.348-1.995,3.774,3.774,0,0,0-2.323-.79,3.81,3.81,0,0,0,0,7.621,3.774,3.774,0,0,0,2.323-.79,3.836,3.836,0,0,0,1.348-1.995.5.5,0,1,1,.957.267,4.837,4.837,0,0,1-1.7,2.515A4.76,4.76,0,0,1,28.8,33.607Z" transform="translate(0 0)" fill="#ebc008"/><path d="M299.314,35.976a.5.5,0,0,1-.14-.02l-2.816-.828a.5.5,0,0,1,.28-.954l2.215.651.131-2.356a.5.5,0,1,1,.992.055l-.166,2.982A.5.5,0,0,1,299.314,35.976Z" transform="translate(-266.375 -7.836)" fill="#ebc008"/></g></g></svg>`,
    directions: `<svg xmlns="http://www.w3.org/2000/svg" width="16.132" height="16.132" viewBox="0 0 16.132 16.132"><path d="M15.836,7.351,8.781.3A1.011,1.011,0,0,0,7.351.3L.3,7.351a1.011,1.011,0,0,0,0,1.429l7.056,7.056a1.01,1.01,0,0,0,1.429,0l7.056-7.056a1.011,1.011,0,0,0,0-1.429Zm-3.182.4L10,10.2a.252.252,0,0,1-.423-.185V8.318H6.553v2.017a.252.252,0,0,1-.252.252H5.293a.252.252,0,0,1-.252-.252V7.814A1.008,1.008,0,0,1,6.049,6.806H9.578V5.113A.252.252,0,0,1,10,4.928l2.653,2.449a.252.252,0,0,1,0,.371Z" fill="#fff"/></svg>`,
    pay: `<svg xmlns="http://www.w3.org/2000/svg" width="15.449" height="15.449" viewBox="0 0 15.449 15.449"><g transform="translate(1170.775 5195.473)"><path d="M16.012,8.287A7.725,7.725,0,1,1,8.287.563,7.725,7.725,0,0,1,16.012,8.287Z" transform="translate(-1171.337 -5196.035)" fill="#fff"/><g transform="translate(-1168 -5276.334)"><path d="M0,212.905v2.626A1.369,1.369,0,0,0,1.369,216.9H8.778a1.369,1.369,0,0,0,1.369-1.369v-2.626a.238.238,0,0,0-.238-.238H.238A.238.238,0,0,0,0,212.905Zm2.533,1.667H1.9a.417.417,0,1,1,0-.833h.635a.417.417,0,1,1,0,.833Z" transform="translate(0 -124.806)" fill="#39bf11"/><path d="M10.147,86.789V86.7a1.369,1.369,0,0,0-1.369-1.369H1.369A1.369,1.369,0,0,0,0,86.7v.086a.238.238,0,0,0,.238.238H9.909A.238.238,0,0,0,10.147,86.789Z" transform="translate(0 0)" fill="#39bf11"/></g></g></svg>`,
    cancel: `<svg xmlns="http://www.w3.org/2000/svg" width="16.199" height="16.199" viewBox="0 0 16.199 16.199"><path d="M11.1,3a8.1,8.1,0,1,0,8.1,8.1A8.092,8.092,0,0,0,11.1,3Zm4.05,11.007-1.142,1.142L11.1,12.242,8.192,15.149,7.05,14.007,9.958,11.1,7.05,8.192,8.192,7.05,11.1,9.958,14.007,7.05l1.142,1.142L12.242,11.1Z" transform="translate(-3 19.199) rotate(-90)" fill="#fff"/></svg>`
};


/***/ })

}]);
//# sourceMappingURL=common.js.map