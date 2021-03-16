(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("i18n/en", [], factory);
	else if(typeof exports === 'object')
		exports["i18n/en"] = factory();
	else
		root["i18n/en"] = factory();
})(window, function() {
return (window["webpackChunk_name_"] = window["webpackChunk_name_"] || []).push([["i18n/en"],{

/***/ "./.build/i18n/en.js":
/*!***************************!*\
  !*** ./.build/i18n/en.js ***!
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
function validateEnConfig(validateProvider) {
    validateProvider.errorMessages = {
        required: 'This field is required',
        min: 'Minimum value is %s',
        max: 'Maximum value is %s',
        pattern: 'Please ensure the entered information adheres to this pattern: %s',
        number: 'Please enter a valid number',
        email: 'Please enter a valid e-mail',
        minlength: 'Minimum length of this field is %s characters',
        maxlength: 'Maximum length of this field is %s characters',
        validateEqual: 'These fields needs to be equal',
        validateUrl: {
            input: 'Please enter a valid URL (http(s)://example.com)',
            textarea: 'Please enter valid URLs (http(s)://example.com), each one in new line!'
        },
        validateHost: {
            input: 'Please enter valid host (example.com)',
            textarea: 'Please enter valid hosts (example.com), each one in new line!'
        }
    };
}
angular__WEBPACK_IMPORTED_MODULE_1__.module(_lib_validate_module__WEBPACK_IMPORTED_MODULE_0__.validate).config(validateEnConfig);



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./.build/i18n/en.js"));
/******/ __webpack_exports__ = __webpack_exports__.default;
/******/ }
]);
});
//# sourceMappingURL=en.js.map