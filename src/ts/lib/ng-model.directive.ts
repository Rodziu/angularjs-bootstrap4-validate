/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {IController, IDirective, INgModelController, IParseService} from 'angular';
import {ValidateProvider} from './validate.provider';
import {IValidateFormController} from './form.directive';
import * as angular from 'angular';

export interface IValidateNgModelController extends INgModelController {
    errorMessages: string[]
}

/**
 * @ngInject
 */
export function ngModelDirective(validate: ValidateProvider, $parse: IParseService): IDirective {
    return {
        restrict: 'A',
        require: ['ngModel', '?^form'],
        link(scope, element, attrs, ctrl: IController[]) {
            const ngModel = ctrl[0] as IValidateNgModelController,
                formCtrl = ctrl[1] as IValidateFormController;
            if (
                formCtrl === null
                || formCtrl['$$element'][0].hasAttribute('novalidate')
            ) {
                return;
            }

            let invalidFeedback = null;

            // update feedback on errors
            scope.$watch(() => {
                return ngModel.$error;
            }, (errors) => {
                if (invalidFeedback === null) {
                    invalidFeedback = angular.element(
                        '<div class="invalid-' + formCtrl.validationMode + '"></div>'
                    );
                    element.parent().append(invalidFeedback);
                    if (validate.inputGroupFix) {
                        scope.$watch(() => {
                            return element.parent().hasClass('input-group');
                        }, (nV) => {
                            const siblingElement = angular.element(invalidFeedback[0].previousElementSibling);
                            if (nV) {
                                siblingElement.addClass('rounded-right');
                            } else {
                                siblingElement.removeClass('rounded-right');
                            }
                        });
                    }
                }

                ngModel.errorMessages = [];
                Object.keys(errors).forEach((error) => {
                    let msg = attrs[`${error}ErrorMsg`] || validate.errorMessages[error];
                    if (angular.isObject(msg)) {
                        msg = element[0].tagName === 'INPUT' ? msg.input : msg.textarea;
                    }
                    if (angular.isDefined(msg)) {
                        let value = attrs[error] || attrs[attrs.$normalize('ng-' + error)];
                        try {
                            value = $parse(value)(scope);
                            // try to $parse for expressions, treat them literally on error
                        } catch (e) {
                            // eslint-disable-line no-empty
                        }
                        ngModel.errorMessages.push(
                            msg.replace('%s', value)
                        );
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
                    } else {
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
    }
}
