import { IDirective, INgModelController, IParseService } from 'angular';
import { ValidateProvider } from './validate.provider';
export interface IValidateNgModelController extends INgModelController {
    errorMessages: string[];
}
/**
 * @ngInject
 */
export declare function ngModelDirective(validate: ValidateProvider, $parse: IParseService): IDirective;
