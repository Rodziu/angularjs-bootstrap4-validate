/*
* AngularJS validation plugin for  Bootstrap 4
*  Copyright (c) 2019 Rodziu <mateusz.rohde@gmail.com>
*  License: MIT
*/
!function(){
	'use strict';

	class validateProvider {
		constructor(){
			this.mode = 'feedback';
			this.inputGroupFix = true;
			this.errorMessages = {
				required: 'This field is required',
				min: 'Minimum value is %s',
				max: 'Maximum value is %s',
				pattern: 'Please ensure the entered information adheres to this pattern: %s',
				number: 'Please enter a valid number',
				email: 'Please enter a valid e-mail',
				minlength: 'Minimum length of this field is %s characters',
				maxlength: 'Maximum length of this field is %s characters',
				validateEqual: 'These fields needs to be equal',
				validateUrl: {
					input: 'Please enter a valid URL (http(s)://example.com)',
					textarea: 'Please enter valid URLs (http(s)://example.com), each one in new line!'
				},
				validateHost: {
					input: 'Please enter valid host (example.com)',
					textarea: 'Please enter valid hosts (example.com), each one in new line!'
				}
			};
		}

		$get(){
			return this;
		}
	}

	angular.module('validate').provider('validate', validateProvider);
}();
