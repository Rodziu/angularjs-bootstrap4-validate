/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	/**
	 * @ngInject
	 */
	function equalDirective($parse){
		return {
			restrict: 'A',
			require: 'ngModel',
			link(scope, element, attrs, ctrl){
				const equalityFn = $parse(attrs['validateEqual']);

				ctrl.$validators.validateEqual = function(value){
					// noinspection EqualityComparisonWithCoercionJS
					let isValid = value == equalityFn(scope);
					element[0].setCustomValidity(isValid ? '' : ' ');
					return isValid;
				};

				scope.$watch(function(){
					return equalityFn(scope);
				}, function(){
					ctrl.$validate();
				});
			}
		};
	}

	angular.module('validate').directive('validateEqual', equalDirective);
}();
