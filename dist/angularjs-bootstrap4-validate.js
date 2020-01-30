/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

angular.module('validate', []);

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
!function() {
    'use strict';

    /**
     *  @ngInject
     */
    formDirective.$inject = ["validate"];
    function formDirective(validate) {
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

                        element[0].addEventListener('submit', function() {
                            element.addClass('was-validated');
                        });

                        formCtrl.resetValidation = function() {
                            formCtrl.$setPristine();
                            angular.element(element[0].querySelectorAll('.was-validated')).removeClass('was-validated');
                            element.removeClass('was-validated');
                        };

                        formCtrl.showValidation = function() {
                            element.addClass('was-validated');
                        };
                    }
                }
            }
        };
    }

    function ngFormDirective() {
        return {
            restrict: 'EAC',
            priority: -1,
            require: ['form', '^^form'],
            compile() {
                return {
                    pre(scope, element, attrs, ctrl) {
                        const [formCtrl, parentFormCtrl] = ctrl;
                        if (angular.isDefined(parentFormCtrl.validationMode)) {
                            formCtrl.validationMode = parentFormCtrl.validationMode;
                            formCtrl.resetValidation = function() {
                                parentFormCtrl.resetValidation();
                            };
                            formCtrl.showValidation = function() {
                                element.addClass('was-validated');
                            };
                        }
                    },
                };
            },
        };
    }

    /**
     * @ngdoc directive
     * @name form
     * @param {String} validateMode
     */
    angular.module('validate').directive('form', formDirective);

    angular.module('validate').directive('ngForm', ngFormDirective);
}();

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	/**
	 * @ngInject
	 */
	ngModelDirective.$inject = ["validate", "$parse"];
	function ngModelDirective(validate, $parse){
		return {
			restrict: 'A',
			require: ['ngModel', '?^form'],
			link(scope, element, attrs, ctrl){
				const ngModel = ctrl[0],
					formCtrl = ctrl[1];
				if(
					formCtrl === null
					|| formCtrl.$$element[0].hasAttribute('novalidate')
				){
					return;
				}

				let invalidFeedback = null;

				// update feedback on errors
				scope.$watch(function(){
					return ngModel.$error;
				}, function(errors){
					if(invalidFeedback === null){
						invalidFeedback = angular.element(
							'<div class="invalid-' + formCtrl.validationMode + '"></div>'
						);
						element.parent().append(invalidFeedback);
						if(
							element.parent().hasClass('input-group')
						){
							angular.element(invalidFeedback[0].previousElementSibling).addClass('input-group-fix');
						}
					}
					const errorMessages = [];
					for(let e in errors){
						if(errors.hasOwnProperty(e)){
							let msg = attrs[e + 'ErrorMsg'] || validate.errorMessages[e];
							if(angular.isObject(msg)){
								msg = element[0].tagName === 'INPUT' ? msg.input : msg.textarea;
							}
							if(angular.isDefined(msg)){
								let value = attrs[e] || attrs[attrs.$normalize('ng-' + e)];
								try{
									value = $parse(value);
									// try to $parse for expressions, treat them literally on error
								}catch(error){
									// eslint-disable-line no-empty
								}
								errorMessages.push(
									msg.replace('%s', value)
								);
							}
						}
					}
					invalidFeedback.html(errorMessages.join(', '));
				}, true);

				// display validation on dirty form controls
				scope.$watch(function(){
					return ngModel.$dirty;
				}, function(nV){
					if(nV){
            if(attrs['type'] === 'radio') {
              // mark all radio elements with same name attribute as validated
              ngModel.$$parentForm.$getControls().forEach((control) => {
                if (control.$name === ngModel.$name) {
                  control.$$element.parent().addClass('was-validated');
                }
              });
            }else {
              element.parent().addClass('was-validated');
            }
					}
				});

				// display validation on whole form on submit
				element[0].addEventListener('invalid', function(event){
					event.preventDefault();
					formCtrl.$$element.addClass('was-validated');
				});

				// cleanup
				scope.$on('$destroy', function(){
					if (invalidFeedback !== null) {
						invalidFeedback.remove();
					}
				});
			}
		}
	}

	angular.module('validate').directive('ngModel', ngModelDirective);
}();

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	/**
	 * @ngInject
	 */
	validateConfig.$inject = ["$provide"];
	function validateConfig($provide){
		validateDirectivesDecorator.$inject = ["$delegate"];
		$provide.decorator('ngPatternDirective', validateDirectivesDecorator);
		$provide.decorator('ngMinlengthDirective', validateDirectivesDecorator);
		$provide.decorator('ngMaxlengthDirective', validateDirectivesDecorator);

		/**
		 * @ngInject
		 */
		function validateDirectivesDecorator($delegate){
			const originalCompile = $delegate[0].compile,
				name = $delegate[0].name.replace('ng', '').toLowerCase();
			$delegate[0].compile = function(){
				const link = originalCompile.apply(this, arguments);
				return function(scope, element, attrs, ctrl){
					link.apply(this, arguments);
					const validator = ctrl.$validators[name];
					ctrl.$validators[name] = function(){
						const isValid = validator.apply(this, arguments);
						element[0].setCustomValidity(isValid ? '' : ' ');
						return isValid;
					};
				}
			};
			return $delegate;
		}
	}

	angular.module('validate').config(validateConfig);
}();

/*
* AngularJS validation plugin for  Bootstrap 4
*  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
*  License: MIT
*/
!function(){
	'use strict';

	class validateProvider {
		constructor(){
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

		$get(){
			return this;
		}
	}

	angular.module('validate').provider('validate', validateProvider);
}();

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function() {
  'use strict';

  /**
   * @ngInject
   */
  function customDirective() {
    return {
      restrict: 'A',
      require: {
        ngModel: 'ngModel',
      },
      bindToController: {
        validateCustom: '&',
      },
      controller: [
        '$element', function($element) {
          this.$onInit = () => {
            this.ngModel.$validators.validateCustom = (value) => {
              let isValid = this.validateCustom({value});
              $element[0].setCustomValidity(isValid ? '' : ' ');
              return isValid;
            };
          };
        }],
    };
  }

  angular.module('validate').directive('validateCustom', customDirective);
}();

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	/**
	 * @ngInject
	 */
	equalDirective.$inject = ["$parse"];
	function equalDirective($parse){
		return {
			restrict: 'A',
			require: 'ngModel',
			link(scope, element, attrs, ctrl){
				const equalityFn = $parse(attrs['validateEqual']);

				ctrl.$validators.validateEqual = function(value){
					// noinspection EqualityComparisonWithCoercionJS
					let isValid = value == equalityFn(scope);
					element[0].setCustomValidity(isValid ? '' : ' ');
					return isValid;
				};

				scope.$watch(function(){
					return equalityFn(scope);
				}, function(){
					ctrl.$validate();
				});
			}
		};
	}

	angular.module('validate').directive('validateEqual', equalDirective);
}();

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	function validateHostDirective(){
		function validHost(string){
			return /^([a-z\u00A1-\uFFFF0-9]|[a-z\u00A1-\uFFFF0-9][a-z\u00A1-\uFFFF0-9-]{0,61}[a-z\u00A1-\uFFFF0-9])(\.([a-z\u00A1-\uFFFF0-9]|[a-z\u00A1-\uFFFF0-9][a-z\u00A1-\uFFFF0-9-]{0,61}[a-z\u00A1-\uFFFF0-9]))*$/i.test(string);
		}

		return {
			restrict: 'A',
			require: 'ngModel',
			link(scope, element, attrs, ctrl){
				ctrl.$validators.validateHost = function(value){
					let isValid = true;
					if(angular.isDefined(value) && value !== ''){
						if(element[0].tagName === 'TEXTAREA'){
							const rows = value.split(/\r\n|\r|\n/);
							for(let r = 0; r < rows.length; r++){
								const line = rows[r].trim();
								if(line !== ''){
									if(!validHost(line)){
										isValid = false;
										break;
									}
								}
							}
						}else{
							isValid = validHost(value);
						}
					}
					element[0].setCustomValidity(isValid ? '' : ' ');
					return isValid;
				};
			}
		};
	}

	angular.module('validate').directive('validateHost', validateHostDirective);
}();

/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	function validateUrlDirective(){
		function validUrl(string){
			return /^https?:\/\/.+/.test(string);
		}

		return {
			restrict: 'A',
			require: 'ngModel',
			link(scope, element, attrs, ctrl){
				ctrl.$validators.validateUrl = function(value){
					let isValid = true;
					if(angular.isDefined(value) && value !== ''){
						if(element[0].tagName === 'TEXTAREA'){
							const rows = value.split(/\r\n|\r|\n/);
							for(let r = 0; r < rows.length; r++){
								const line = rows[r].trim();
								if(line !== ''){
									if(!validUrl(line)){
										isValid = false;
										break;
									}
								}
							}
						}else{
							isValid = validUrl(value);
						}
					}
					element[0].setCustomValidity(isValid ? '' : ' ');
					return isValid;
				};
			}
		};
	}

	angular.module('validate').directive('validateUrl', validateUrlDirective);
}();
