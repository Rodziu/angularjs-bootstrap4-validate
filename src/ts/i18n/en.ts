/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {ValidateProvider} from '../lib/validate.provider';
import {validate} from '../lib/validate.module';
import * as angular from 'angular';

/**
 * @ngAnnotate
 */
function validateEnConfig(validateProvider: ValidateProvider): void {
    validateProvider.errorMessages = {
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

angular.module(validate).config(validateEnConfig);
