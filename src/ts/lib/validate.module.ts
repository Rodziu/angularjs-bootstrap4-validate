/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import * as angular from 'angular';
import {ValidateProvider} from './validate.provider';
import {formDirective, ngFormDirective} from './form.directive';
import {ngModelDirective} from './ng-model.directive';
import {validateConfig} from './validate.config';
import {validateCustomDirective} from './validators/validate-custom.directive';
import {validateEqualDirective} from './validators/validate-equal.directive';
import {validateHostDirective} from './validators/validate-host.directive';
import {validateUrlDirective} from './validators/validate-url.directive';

const validateModule = angular.module('validate', [])
    .provider('validate', ValidateProvider)
    .config(validateConfig)
    .directive('form', formDirective)
    .directive('ngForm', ngFormDirective)
    .directive('ngModel', ngModelDirective)
    .directive('validateCustom', validateCustomDirective)
    .directive('validateEqual', validateEqualDirective)
    .directive('validateHost', validateHostDirective)
    .directive('validateUrl', validateUrlDirective);

export const validate = validateModule.name;
