export declare type validationMode = 'feedback' | 'tooltip';
export declare class ValidateProvider {
    mode: validationMode;
    inputGroupFix: boolean;
    errorMessages: {
        required: string;
        min: string;
        max: string;
        pattern: string;
        number: string;
        email: string;
        minlength: string;
        maxlength: string;
        validateEqual: string;
        validateUrl: {
            input: string;
            textarea: string;
        };
        validateHost: {
            input: string;
            textarea: string;
        };
    };
    $get(): this;
}
