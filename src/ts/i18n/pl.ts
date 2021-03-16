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
function validatePlConfig(validateProvider: ValidateProvider): void {
    validateProvider.errorMessages = {
        required: 'To pole jest wymagane!',
        min: 'Minimalna wartość to %s!',
        max: 'Maksymalna wartość to %s!',
        pattern: 'Wartość musi spełniać następujące wyrażenie regularne: %s!',
        number: 'Wartość musi być liczbą!',
        email: 'Podaj poprawny adres e-mail!',
        minlength: 'Minimalna długość tego pola to %s znaków!',
        maxlength: 'Maksymalna długość tego pola to %s znaków!',
        validateEqual: 'Pola muszą być jednakowe!',
        validateUrl: {
            input: 'Podaj poprawny adres URL (http(s)://domena.pl)',
            textarea: 'Podaj poprawne adresy URL (http(s)://domena.pl), każdy od nowej linii!'
        },
        validateHost: {
            input: 'Podaj poprawny host (domena.pl)!',
            textarea: 'Podaj poprawne adresy host (domena.pl), każdy od nowej linii!'
        }
    };
}

angular.module(validate).config(validatePlConfig);
