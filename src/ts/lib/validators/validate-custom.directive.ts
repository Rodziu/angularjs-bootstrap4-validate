/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {IDirective} from 'angular';
import {IValidateNgModelController} from '../ng-model.directive';


class ValidateCustomDirectiveController {
    ngModel: IValidateNgModelController;
    validateCustom: (locals: { value: unknown }) => boolean;

    constructor(
        private $element
    ) {
    }

    $onInit() {
        this.ngModel.$validators.validateCustom = (value: unknown): boolean => {
            const isValid = this.validateCustom({value});
            this.$element[0].setCustomValidity(isValid ? '' : ' ');
            return isValid;
        };
    }
}

/**
 * @ngInject
 */
export function validateCustomDirective(): IDirective {
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
