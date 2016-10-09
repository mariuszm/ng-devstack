'use strict';

angular.module('ngDevstack')

.controller('AppCtrl', function ($scope, $transitions) {

    // handling UI Bootstrap Collapse plugin
    $scope.isCollapsed = true;

    $transitions.onSuccess({}, function (transition) {
        var pageTitle = transition.$to().data.pageTitle;
        if (pageTitle) {
            $scope.pageTitle = pageTitle + ' | ng-devstack';
        }
    });

});
