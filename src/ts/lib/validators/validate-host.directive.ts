/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {IDirective} from 'angular';
import * as angular from 'angular';

export function validateHostDirective(): IDirective {
    return {
        restrict: 'A',
        require: 'ngModel',
        link(scope, element, attrs, ctrl) {
            ctrl.$validators.validateHost = function(value: string): boolean {
                let isValid = true;
                if (angular.isDefined(value) && value !== '') {
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
                    } else {
                        isValid = validHost(value);
                    }
                }
                (element[0] as HTMLInputElement).setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };
        }
    };

    //////

    function validHost(string: string): boolean {
        // eslint-disable-next-line max-len
        return /^([a-z\u00A1-\uFFFF0-9]|[a-z\u00A1-\uFFFF0-9][a-z\u00A1-\uFFFF0-9-]{0,61}[a-z\u00A1-\uFFFF0-9])(\.([a-z\u00A1-\uFFFF0-9]|[a-z\u00A1-\uFFFF0-9][a-z\u00A1-\uFFFF0-9-]{0,61}[a-z\u00A1-\uFFFF0-9]))*$/i.test(string);
    }
}
