/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function() {
  'use strict';

  /**
   * @ngInject
   */
  function customDirective() {
    return {
      restrict: 'A',
      require: {
        ngModel: 'ngModel',
      },
      bindToController: {
        validateCustom: '&',
      },
      controller: [
        '$element', function($element) {
          this.$onInit = () => {
            this.ngModel.$validators.validateCustom = (value) => {
              let isValid = this.validateCustom({value});
              $element[0].setCustomValidity(isValid ? '' : ' ');
              return isValid;
            };
          };
        }],
    };
  }

  angular.module('validate').directive('validateCustom', customDirective);
}();
