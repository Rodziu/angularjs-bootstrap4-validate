/*
 * AngularJS validation plugin for  Bootstrap 4
 *  Copyright (c) 2019-2021 Rodziu <mateusz.rohde@gmail.com>
 *  License: MIT
 */

angular.module('exampleApp', ['validate'])
    .controller('exampleCtrl', ['$rootScope', function($rootScope) {
        this.ex1 = {
            first_name: 'Mark',
            last_name: 'Otto',
            username: '',
            gender: '',
            check: false,
            radio: '',
            submitted: false
        };
        this.ex2 = {
            first_name: 'Mark',
            last_name: 'Otto',
            username: '',
            gender: '',
            check: false,
            radio: '',
            submitted: false
        };
        this.ex3 = '';
        this.ex4 = {
            required: '',
            min: -1,
            max: 11,
            pattern: 'aaa',
            number: '',
            email: '123',
            ngRequired: '',
            ngPattern: 'aaa',
            ngMinlength: '1',
            ngMaxlength: '123'
        };
        this.ex5 = {
            url: 'not an url',
            host: 'not a host',
            urls: 'http://example.com\nhttps://www.example.com',
            hosts: 'example.com\nwww.example.com',
            eq1: '1',
            eq2: '2',
            custom: 'test'
        };
        this.ngfEx = {
            first_name: 'Mark',
            last_name: '',
            username: '',
            gender: ''
        };

        this.validateCustom = function(value) {
            return value === 'test';
        };

        $rootScope.nav = [];

        this.sub = function(arg) {
            console.log(arg);
        };
    }])
    /**
     * @ngdoc component
     * @name codeExample
     */
    .component('codeExample', {
        transclude: true,
        bindings: {
            html: '<'
        },
        controllerAs: 'ctrl',
        template: '<div class="card-footer"><pre><code>{{ctrl.html}}</code></pre></div>'
    })
    /**
     * @ngdoc directive
     * @name codeExampleHook
     */
    .directive('codeExampleHook', ['$compile', function($compile) {
        return {
            restrict: 'A',
            priority: 999999999999,
            compile: function(element) {
                let html = element.clone().removeAttr('code-example-hook')[0].innerHTML,
                    whitespace = html.match(/^\s+/)[0].replace(/\n/, '');
                html = html.replace(new RegExp('^' + whitespace, 'gm'), '').trim();
                return function(scope) {
                    const newScope = scope.$new(),
                        newElement = angular.element('<code-example html="html"></code-example>');
                    newScope.html = html;
                    element.after(newElement);
                    $compile(newElement)(newScope);
                }
            }
        };
    }])
    .directive('pageHeader', [function() {
        return {
            restrict: 'C',
            controller: ['$rootScope', '$element', '$attrs', function($rootScope, $element, $attrs) {
                if (angular.isUndefined($attrs.id)) {
                    return;
                }
                $rootScope.nav.push({
                    id: $attrs.id,
                    title: $element.text().trim()
                });
            }]
        }
    }]);
