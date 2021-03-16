/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import IProvideService = angular.auto.IProvideService;
import {IDirective} from 'angular';

/**
 * @ngInject
 */
export function validateConfig($provide: IProvideService): void {
    $provide.decorator('ngPatternDirective', validateDirectivesDecorator);
    $provide.decorator('ngMinlengthDirective', validateDirectivesDecorator);
    $provide.decorator('ngMaxlengthDirective', validateDirectivesDecorator);

    /**
     * @ngInject
     */
    function validateDirectivesDecorator($delegate: IDirective) {
        const originalCompile = $delegate[0].compile,
            name = $delegate[0].name.replace('ng', '').toLowerCase();
        $delegate[0].compile = (...args: unknown[]) => {
            const link = originalCompile.apply(this, args);
            return function(scope, element, attrs, ctrl) {
                link.apply(this, [scope, element, attrs, ctrl]);
                const validator = ctrl.$validators[name];
                ctrl.$validators[name] = function(...args: unknown[]) {
                    const isValid = validator.apply(this, args);
                    element[0].setCustomValidity(isValid ? '' : ' ');
                    return isValid;
                };
            }
        };
        return $delegate;
    }
}
