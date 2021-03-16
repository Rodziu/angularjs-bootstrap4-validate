/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {IDirective, IParseService} from 'angular';

/**
 * @ngInject
 */
export function validateEqualDirective($parse: IParseService): IDirective {
    return {
        restrict: 'A',
        require: 'ngModel',
        link(scope, element, attrs, ctrl) {
            const equalityFn = $parse(attrs['validateEqual']);

            ctrl.$validators.validateEqual = function(value: unknown): boolean {
                // eslint-disable-next-line eqeqeq
                const isValid = value == equalityFn(scope);
                (element[0] as HTMLInputElement).setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };

            scope.$watch(function() {
                return equalityFn(scope);
            }, function() {
                ctrl.$validate();
            });
        }
    };
}
