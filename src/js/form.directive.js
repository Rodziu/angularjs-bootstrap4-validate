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
                        formCtrl.wasValidated = element.hasClass('was-validated');

                        element[0].addEventListener('submit', function() {
                            formCtrl.showValidation();
                        });

                        formCtrl.resetValidation = function() {
                            formCtrl.$setPristine();
                            angular.element(element[0].querySelectorAll('.was-validated')).removeClass('was-validated');
                            element.removeClass('was-validated');
                            _recursiveValidationReset(formCtrl);
                            formCtrl.wasValidated = false;
                        };

                        formCtrl.showValidation = function() {
                            element.addClass('was-validated');
                            formCtrl.wasValidated = true;
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
                                formCtrl.wasValidated = true;
                            };
                        }
                    },
                };
            },
        };
    }

    //////

    function _recursiveValidationReset(formCtrl) {
        formCtrl.$$controls.forEach((control) => {
            if (angular.isDefined(control.resetValidation)) {
                control.wasValidated = false;
                _recursiveValidationReset(control);
            }
        });
    }

    /**
     * @ngdoc directive
     * @name form
     * @param {String} validateMode
     */
    angular.module('validate').directive('form', formDirective);

    angular.module('validate').directive('ngForm', ngFormDirective);
}();
