import { IDirective, IFormController, IRootScopeService } from 'angular';
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
export declare function formDirective(validate: ValidateProvider, $rootScope: IRootScopeService): IDirective;
export declare function ngFormDirective(): IDirective;
