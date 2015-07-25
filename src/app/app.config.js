'use strict';

angular.module('ngDevstack')

.config(function ($urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    // Please enable mod rewrite in server.js when html5Mode is enabled.
    // Don't forget to inject $locationProvider.
    // Depending on your project requirements, you may further want to
    // include <base> tag in your index.html
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });


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
});
