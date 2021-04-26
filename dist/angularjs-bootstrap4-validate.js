(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("angularjs-bootstrap4-validate", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-bootstrap4-validate"] = factory(require("angular"));
	else
		root["angularjs-bootstrap4-validate"] = factory(root["angular"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angular__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.build/lib/form.directive.js":
/*!**************************************!*\
  !*** ./.build/lib/form.directive.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formDirective": () => (/* binding */ formDirective),
/* harmony export */   "ngFormDirective": () => (/* binding */ ngFormDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

/**
 *  @ngInject
 */
function formDirective(validate, $rootScope) {
    /**
     * @ngdoc component
     * @name form
     * @param {String} validateMode
     */
    return {
        restrict: 'E',
        require: 'form',
        compile() {
            return {
                pre(scope, element, attrs, formCtrl) {
                    if ('novalidate' in attrs) {
                        return;
                    }
                    formCtrl.validationMode = attrs['validateMode'] || validate.mode;
                    formCtrl.wasValidated = element.hasClass('was-validated');
                    element[0].addEventListener('submit', function () {
                        formCtrl.showValidation();
                    });
                    formCtrl.resetValidation = () => {
                        formCtrl.$setPristine();
                        angular__WEBPACK_IMPORTED_MODULE_0__.element(element[0].querySelectorAll('.was-validated'))
                            .removeClass('was-validated');
                        element.removeClass('was-validated');
                        _recursiveValidationReset(formCtrl);
                        formCtrl.wasValidated = false;
                    };
                    formCtrl.showValidation = () => {
                        element.addClass('was-validated');
                        formCtrl.wasValidated = true;
                        if (!$rootScope['$$phase']) {
                            scope.$digest();
                        }
                    };
                }
            };
        }
    };
    //////
    function _recursiveValidationReset(formCtrl) {
        formCtrl['$$controls'].forEach((control) => {
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(control.resetValidation)) {
                control.wasValidated = false;
                _recursiveValidationReset(control);
            }
        });
    }
}
formDirective.$inject = ["validate", "$rootScope"];
function ngFormDirective() {
    return {
        restrict: 'EAC',
        priority: -1,
        require: ['form', '^^form'],
        compile() {
            return {
                pre(scope, element, attrs, ctrl) {
                    const [formCtrl, parentFormCtrl] = ctrl;
                    if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(parentFormCtrl.validationMode)) {
                        formCtrl.validationMode = parentFormCtrl.validationMode;
                        formCtrl.resetValidation = () => {
                            parentFormCtrl.resetValidation();
                        };
                        formCtrl.showValidation = () => {
                            element.addClass('was-validated');
                            formCtrl.wasValidated = true;
                        };
                    }
                },
            };
        },
    };
}



/***/ }),

/***/ "./.build/lib/ng-model.directive.js":
/*!******************************************!*\
  !*** ./.build/lib/ng-model.directive.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ngModelDirective": () => (/* binding */ ngModelDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

/**
 * @ngInject
 */
function ngModelDirective(validate, $parse) {
    return {
        restrict: 'A',
        require: ['ngModel', '?^form'],
        link(scope, element, attrs, ctrl) {
            const ngModel = ctrl[0], formCtrl = ctrl[1];
            if (formCtrl === null
                || formCtrl['$$element'][0].hasAttribute('novalidate')) {
                return;
            }
            let invalidFeedback = null;
            // update feedback on errors
            scope.$watch(() => {
                return ngModel.$error;
            }, (errors) => {
                if (invalidFeedback === null) {
                    invalidFeedback = angular__WEBPACK_IMPORTED_MODULE_0__.element('<div class="invalid-' + formCtrl.validationMode + '"></div>');
                    element.parent().append(invalidFeedback);
                    if (validate.inputGroupFix) {
                        scope.$watch(() => {
                            return element.parent().hasClass('input-group');
                        }, (nV) => {
                            const siblingElement = angular__WEBPACK_IMPORTED_MODULE_0__.element(invalidFeedback[0].previousElementSibling);
                            if (nV) {
                                siblingElement.addClass('rounded-right');
                            }
                            else {
                                siblingElement.removeClass('rounded-right');
                            }
                        });
                    }
                }
                ngModel.errorMessages = [];
                Object.keys(errors).forEach((error) => {
                    let msg = attrs[`${error}ErrorMsg`] || validate.errorMessages[error];
                    if (angular__WEBPACK_IMPORTED_MODULE_0__.isObject(msg)) {
                        msg = element[0].tagName === 'INPUT' ? msg.input : msg.textarea;
                    }
                    if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(msg)) {
                        let value = attrs[error] || attrs[attrs.$normalize('ng-' + error)];
                        try {
                            value = $parse(value)(scope);
                            // try to $parse for expressions, treat them literally on error
                        }
                        catch (e) {
                            // eslint-disable-line no-empty
                        }
                        ngModel.errorMessages.push(msg.replace('%s', value));
                    }
                });
                invalidFeedback.html(ngModel.errorMessages.join(', '));
            }, true);
            // display validation on dirty form controls
            scope.$watch(() => {
                return ngModel.$dirty;
            }, (nV) => {
                if (nV) {
                    if (attrs['type'] === 'radio') {
                        // mark all radio elements with same name attribute as validated
                        ngModel['$$parentForm']
                            .$getControls()
                            .forEach((control) => {
                            if (control.$name === ngModel.$name) {
                                control['$$element'].parent().addClass('was-validated');
                            }
                        });
                    }
                    else {
                        element.parent().addClass('was-validated');
                    }
                }
            });
            // display validation on whole form on submit
            element[0].addEventListener('invalid', (event) => {
                event.preventDefault();
                formCtrl.showValidation();
                scope.$digest();
            });
            // cleanup
            scope.$on('$destroy', () => {
                if (invalidFeedback !== null) {
                    invalidFeedback.remove();
                }
            });
        }
    };
}
ngModelDirective.$inject = ["validate", "$parse"];



/***/ }),

/***/ "./.build/lib/validate.config.js":
/*!***************************************!*\
  !*** ./.build/lib/validate.config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateConfig": () => (/* binding */ validateConfig)
/* harmony export */ });
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
/**
 * @ngInject
 */
function validateConfig($provide) {
    validateDirectivesDecorator.$inject = ["$delegate"];
    $provide.decorator('ngPatternDirective', validateDirectivesDecorator);
    $provide.decorator('ngMinlengthDirective', validateDirectivesDecorator);
    $provide.decorator('ngMaxlengthDirective', validateDirectivesDecorator);
    /**
     * @ngInject
     */
    function validateDirectivesDecorator($delegate) {
        const originalCompile = $delegate[0].compile, name = $delegate[0].name.replace('ng', '').toLowerCase();
        $delegate[0].compile = (...args) => {
            const link = originalCompile.apply(this, args);
            return function (scope, element, attrs, ctrl) {
                link.apply(this, [scope, element, attrs, ctrl]);
                const validator = ctrl.$validators[name];
                ctrl.$validators[name] = function (...args) {
                    const isValid = validator.apply(this, args);
                    element[0].setCustomValidity(isValid ? '' : ' ');
                    return isValid;
                };
            };
        };
        return $delegate;
    }
}
validateConfig.$inject = ["$provide"];



/***/ }),

/***/ "./.build/lib/validate.module.js":
/*!***************************************!*\
  !*** ./.build/lib/validate.module.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validate_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validate.provider */ "./.build/lib/validate.provider.js");
/* harmony import */ var _form_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.directive */ "./.build/lib/form.directive.js");
/* harmony import */ var _ng_model_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ng-model.directive */ "./.build/lib/ng-model.directive.js");
/* harmony import */ var _validate_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validate.config */ "./.build/lib/validate.config.js");
/* harmony import */ var _validators_validate_custom_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validators/validate-custom.directive */ "./.build/lib/validators/validate-custom.directive.js");
/* harmony import */ var _validators_validate_equal_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validators/validate-equal.directive */ "./.build/lib/validators/validate-equal.directive.js");
/* harmony import */ var _validators_validate_host_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./validators/validate-host.directive */ "./.build/lib/validators/validate-host.directive.js");
/* harmony import */ var _validators_validate_url_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./validators/validate-url.directive */ "./.build/lib/validators/validate-url.directive.js");
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */









const validateModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('validate', [])
    .provider('validate', _validate_provider__WEBPACK_IMPORTED_MODULE_1__.ValidateProvider)
    .config(_validate_config__WEBPACK_IMPORTED_MODULE_4__.validateConfig)
    .directive('form', _form_directive__WEBPACK_IMPORTED_MODULE_2__.formDirective)
    .directive('ngForm', _form_directive__WEBPACK_IMPORTED_MODULE_2__.ngFormDirective)
    .directive('ngModel', _ng_model_directive__WEBPACK_IMPORTED_MODULE_3__.ngModelDirective)
    .directive('validateCustom', _validators_validate_custom_directive__WEBPACK_IMPORTED_MODULE_5__.validateCustomDirective)
    .directive('validateEqual', _validators_validate_equal_directive__WEBPACK_IMPORTED_MODULE_6__.validateEqualDirective)
    .directive('validateHost', _validators_validate_host_directive__WEBPACK_IMPORTED_MODULE_7__.validateHostDirective)
    .directive('validateUrl', _validators_validate_url_directive__WEBPACK_IMPORTED_MODULE_8__.validateUrlDirective);
const validate = validateModule.name;



/***/ }),

/***/ "./.build/lib/validate.provider.js":
/*!*****************************************!*\
  !*** ./.build/lib/validate.provider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProvider": () => (/* binding */ ValidateProvider)
/* harmony export */ });
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
class ValidateProvider {
    constructor() {
        this.mode = 'feedback';
        this.inputGroupFix = true;
        this.errorMessages = {
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
    $get() {
        return this;
    }
}



/***/ }),

/***/ "./.build/lib/validators/validate-custom.directive.js":
/*!************************************************************!*\
  !*** ./.build/lib/validators/validate-custom.directive.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateCustomDirective": () => (/* binding */ validateCustomDirective)
/* harmony export */ });
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
/**
 * @ngInject
 */
class ValidateCustomDirectiveController {
    constructor($element) {
        this.$element = $element;
    }
    $onInit() {
        this.ngModel.$validators.validateCustom = (value) => {
            const isValid = this.validateCustom({ value });
            this.$element[0].setCustomValidity(isValid ? '' : ' ');
            return isValid;
        };
    }
}
ValidateCustomDirectiveController.$inject = ["$element"];
function validateCustomDirective() {
    return {
        restrict: 'A',
        require: {
            ngModel: 'ngModel',
        },
        bindToController: {
            validateCustom: '&',
        },
        controller: ValidateCustomDirectiveController
    };
}



/***/ }),

/***/ "./.build/lib/validators/validate-equal.directive.js":
/*!***********************************************************!*\
  !*** ./.build/lib/validators/validate-equal.directive.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateEqualDirective": () => (/* binding */ validateEqualDirective)
/* harmony export */ });
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
/**
 * @ngInject
 */
function validateEqualDirective($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link(scope, element, attrs, ctrl) {
            const equalityFn = $parse(attrs['validateEqual']);
            ctrl.$validators.validateEqual = function (value) {
                // eslint-disable-next-line eqeqeq
                const isValid = value == equalityFn(scope);
                element[0].setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };
            scope.$watch(function () {
                return equalityFn(scope);
            }, function () {
                ctrl.$validate();
            });
        }
    };
}
validateEqualDirective.$inject = ["$parse"];



/***/ }),

/***/ "./.build/lib/validators/validate-host.directive.js":
/*!**********************************************************!*\
  !*** ./.build/lib/validators/validate-host.directive.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateHostDirective": () => (/* binding */ validateHostDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

function validateHostDirective() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link(scope, element, attrs, ctrl) {
            ctrl.$validators.validateHost = function (value) {
                let isValid = true;
                if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(value) && value !== '') {
                    if (element[0].tagName === 'TEXTAREA') {
                        const rows = value.split(/\r\n|\r|\n/);
                        for (let r = 0; r < rows.length; r++) {
                            const line = rows[r].trim();
                            if (line !== '') {
                                if (!validHost(line)) {
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        isValid = validHost(value);
                    }
                }
                element[0].setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };
        }
    };
    //////
    function validHost(string) {
        // eslint-disable-next-line max-len
        return /^([a-z\u00A1-\uFFFF0-9]|[a-z\u00A1-\uFFFF0-9][a-z\u00A1-\uFFFF0-9-]{0,61}[a-z\u00A1-\uFFFF0-9])(\.([a-z\u00A1-\uFFFF0-9]|[a-z\u00A1-\uFFFF0-9][a-z\u00A1-\uFFFF0-9-]{0,61}[a-z\u00A1-\uFFFF0-9]))*$/i.test(string);
    }
}



/***/ }),

/***/ "./.build/lib/validators/validate-url.directive.js":
/*!*********************************************************!*\
  !*** ./.build/lib/validators/validate-url.directive.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateUrlDirective": () => (/* binding */ validateUrlDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

function validateUrlDirective() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link(scope, element, attrs, ctrl) {
            ctrl.$validators.validateUrl = function (value) {
                let isValid = true;
                if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(value) && value !== '') {
                    if (element[0].tagName === 'TEXTAREA') {
                        const rows = value.split(/\r\n|\r|\n/);
                        for (let r = 0; r < rows.length; r++) {
                            const line = rows[r].trim();
                            if (line !== '') {
                                if (!validUrl(line)) {
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        isValid = validUrl(value);
                    }
                }
                element[0].setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };
        }
    };
    //////
    function validUrl(string) {
        return /^https?:\/\/.+/.test(string);
    }
}



/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"angularjs-bootstrap4-validate": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = window["webpackChunk_name_"] = window["webpackChunk_name_"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************************!*\
  !*** ./.build/angularjs-bootstrap4-validate.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidateProvider": () => (/* reexport safe */ _lib_validate_provider__WEBPACK_IMPORTED_MODULE_1__.ValidateProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_validate_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/validate.module */ "./.build/lib/validate.module.js");
/* harmony import */ var _lib_validate_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/validate.provider */ "./.build/lib/validate.provider.js");
/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_validate_module__WEBPACK_IMPORTED_MODULE_0__.validate);


})();

__webpack_require__.O();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=angularjs-bootstrap4-validate.js.map