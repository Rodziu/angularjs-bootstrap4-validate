/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

import {validate} from './lib/validate.module';

export {ValidateProvider} from './lib/validate.provider';
export {IValidateFormController} from './lib/form.directive';
export {IValidateNgModelController} from './lib/ng-model.directive';
export default validate;
