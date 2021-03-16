import { IDirective, IFormController } from 'angular';
import { validationMode, ValidateProvider } from './validate.provider';
export interface IValidateFormController extends IFormController {
    validationMode: validationMode;
    wasValidated: boolean;
    resetValidation: () => void;
    showValidation: () => void;
}
/**
 *  @ngInject
 */
export declare function formDirective(validate: ValidateProvider): IDirective;
export declare function ngFormDirective(): IDirective;
