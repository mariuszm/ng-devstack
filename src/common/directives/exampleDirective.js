'use strict';

angular.module('ngDevstack.myDirectiveModule', [])

.directive('myDirective', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<span>{{ foo }}</span>'
    };
});
