(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("i18n/pl", [], factory);
	else if(typeof exports === 'object')
		exports["i18n/pl"] = factory();
	else
		root["i18n/pl"] = factory();
})(window, function() {
return (window["webpackChunk_name_"] = window["webpackChunk_name_"] || []).push([["i18n/pl"],{

/***/ "./.build/i18n/pl.js":
/*!***************************!*\
  !*** ./.build/i18n/pl.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_validate_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/validate.module */ "./.build/lib/validate.module.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */


/**
 * @ngAnnotate
 */
function validatePlConfig(validateProvider) {
    validateProvider.errorMessages = {
        required: 'To pole jest wymagane!',
        min: 'Minimalna wartość to %s!',
        max: 'Maksymalna wartość to %s!',
        pattern: 'Wartość musi spełniać następujące wyrażenie regularne: %s!',
        number: 'Wartość musi być liczbą!',
        email: 'Podaj poprawny adres e-mail!',
        minlength: 'Minimalna długość tego pola to %s znaków!',
        maxlength: 'Maksymalna długość tego pola to %s znaków!',
        validateEqual: 'Pola muszą być jednakowe!',
        validateUrl: {
            input: 'Podaj poprawny adres URL (http(s)://domena.pl)',
            textarea: 'Podaj poprawne adresy URL (http(s)://domena.pl), każdy od nowej linii!'
        },
        validateHost: {
            input: 'Podaj poprawny host (domena.pl)!',
            textarea: 'Podaj poprawne adresy host (domena.pl), każdy od nowej linii!'
        }
    };
}
angular__WEBPACK_IMPORTED_MODULE_1__.module(_lib_validate_module__WEBPACK_IMPORTED_MODULE_0__.validate).config(validatePlConfig);



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./.build/i18n/pl.js"));
/******/ __webpack_exports__ = __webpack_exports__.default;
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=pl.js.map