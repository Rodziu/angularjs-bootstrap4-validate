/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {IDirective} from 'angular';
import * as angular from 'angular';

export function validateUrlDirective(): IDirective {
    return {
        restrict: 'A',
        require: 'ngModel',
        link(scope, element, attrs, ctrl) {
            ctrl.$validators.validateUrl = function(value: string): boolean {
                let isValid = true;
                if (angular.isDefined(value) && value !== '') {
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
                    } else {
                        isValid = validUrl(value);
                    }
                }
                (element[0] as HTMLInputElement).setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };
        }
    };

    //////

    function validUrl(string: string): boolean {
        return /^https?:\/\/.+/.test(string);
    }
}
