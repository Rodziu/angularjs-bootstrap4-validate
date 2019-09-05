/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */
!function(){
	'use strict';

	/**
	 *  @ngInject
	 */
	function formDirective(validate){
		return {
			restrict: 'E',
			require: 'form',
			link(scope, element, attrs, formCtrl){
				if('novalidate' in attrs){
					return;
				}

				formCtrl.validationMode = attrs['validateMode'] || validate.mode;

				element[0].addEventListener('submit', function(){
					element.addClass('was-validated');
				});

				formCtrl.resetValidation = function(){
					formCtrl.$setPristine();
					angular.element(element[0].querySelectorAll('.was-validated')).removeClass('was-validated');
					element.removeClass('was-validated');
				}

				formCtrl.showValidation = function(){
          element.addClass('was-validated');
        }
			}
		}
	}

	/**
	 * @ngdoc directive
	 * @name form
	 * @param {String} validateMode
	 */
	angular.module('validate').directive('form', formDirective);
}();
