/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {IAttributes, IDirective, IFormController, IRootScopeService, IScope} from 'angular';
import * as angular from 'angular';
import {validationMode, ValidateProvider} from './validate.provider';

export interface IValidateFormController extends IFormController {
    validationMode: validationMode,
    wasValidated: boolean,
    resetValidation: () => void,
    showValidation: () => void
}

/**
 *  @ngInject
 */
export function formDirective(validate: ValidateProvider, $rootScope: IRootScopeService): IDirective {
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
                pre(scope: IScope, element: JQLite, attrs: IAttributes, formCtrl: IValidateFormController) {
                    if ('novalidate' in attrs) {
                        return;
                    }

                    formCtrl.validationMode = attrs['validateMode'] || validate.mode;
                    formCtrl.wasValidated = element.hasClass('was-validated');

                    element[0].addEventListener('submit', function() {
                        formCtrl.showValidation();
                    });

                    formCtrl.resetValidation = () => {
                        formCtrl.$setPristine();
                        angular.element(element[0].querySelectorAll('.was-validated'))
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
            }
        }
    };

    //////

    function _recursiveValidationReset(formCtrl: IValidateFormController): void {
        formCtrl['$$controls'].forEach((control) => {
            if (angular.isDefined(control.resetValidation)) {
                control.wasValidated = false;
                _recursiveValidationReset(control);
            }
        });
    }
}

export function ngFormDirective(): IDirective {
    return {
        restrict: 'EAC',
        priority: -1,
        require: ['form', '^^form'],
        compile() {
            return {
                pre(scope: IScope, element: JQLite, attrs: IAttributes, ctrl: IValidateFormController[]) {
                    const [formCtrl, parentFormCtrl] = ctrl;
                    if (angular.isDefined(parentFormCtrl.validationMode)) {
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
