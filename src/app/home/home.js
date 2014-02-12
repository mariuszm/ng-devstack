'use strict';

angular.module('ngDevstack.home', [
    'ui.router'
])

.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data: {
            pageTitle: 'Home'
        }
    });
})

.controller('HomeCtrl', function ($scope) {
});
