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
                            ['resetValidation', 'showValidation'].forEach((fn) => {
                                formCtrl[fn] = function() {
                                    parentFormCtrl[fn]();
                                };
                            });
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
