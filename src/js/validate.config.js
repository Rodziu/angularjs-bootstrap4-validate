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
	function validateConfig($provide){
		$provide.decorator('ngPatternDirective', validateDirectivesDecorator);
		$provide.decorator('ngMinlengthDirective', validateDirectivesDecorator);
		$provide.decorator('ngMaxlengthDirective', validateDirectivesDecorator);

		/**
		 * @ngInject
		 */
		function validateDirectivesDecorator($delegate){
			const originalCompile = $delegate[0].compile,
				name = $delegate[0].name.replace('ng', '').toLowerCase();
			$delegate[0].compile = function(){
				const link = originalCompile.apply(this, arguments);
				return function(scope, element, attrs, ctrl){
					link.apply(this, arguments);
					const validator = ctrl.$validators[name];
					ctrl.$validators[name] = function(){
						const isValid = validator.apply(this, arguments);
						element[0].setCustomValidity(isValid ? '' : ' ');
						return isValid;
					};
				}
			};
			return $delegate;
		}
	}

	angular.module('validate').config(validateConfig);
}();
