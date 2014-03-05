'use strict';

angular.module('ngDevstack', [
    'ngDevstack.templates',
    'ngDevstack.conf',
    'ngDevstack.home',
    'ngDevstack.about',
    'ui.bootstrap',
    'ui.router'
])

.config(function ($urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    // Please enable mod rewrite in server.js when html5Mode is enabled.
    // Don't forget to inject $locationProvider.
    // $locationProvider.html5Mode(true);


    /*
    Make a trailing slash optional for all routes
     */
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(),
            search = $location.search(),
            params;

        if (path[path.length - 1] === '/') {
            return;
        }

        if (!Object.keys(search).length) {
            return path + '/';
        }

        params = [];
        angular.forEach(search, function (v, k) {
            params.push(k + '=' + v);
        });

        return path + '/?' + params.join('&');
    });
})

.controller('AppCtrl', function ($rootScope, $scope) {

    // handling UI Bootstrap Collapse plugin
    $scope.isCollapsed = true;

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | ng-devstack';
        }
    });
});
