/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

!function(){
	'use strict';

	function validateUrlDirective(){
		function validUrl(string){
			return /^https?:\/\/.+/.test(string);
		}

		return {
			restrict: 'A',
			require: 'ngModel',
			link(scope, element, attrs, ctrl){
				ctrl.$validators.validateUrl = function(value){
					let isValid = true;
					if(angular.isDefined(value) && value !== ''){
						if(element[0].tagName === 'TEXTAREA'){
							const rows = value.split(/\r\n|\r|\n/);
							for(let r = 0; r < rows.length; r++){
								const line = rows[r].trim();
								if(line !== ''){
									if(!validUrl(line)){
										isValid = false;
										break;
									}
								}
							}
						}else{
							isValid = validUrl(value);
						}
					}
					element[0].setCustomValidity(isValid ? '' : ' ');
					return isValid;
				};
			}
		};
	}

	angular.module('validate').directive('validateUrl', validateUrlDirective);
}();
