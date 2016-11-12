(function () {
  'use strict';

  var root = {
    templateUrl: './root.html',
    controller: 'RootController'
  };

  function config ($compileProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    // https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476
    $compileProvider.debugInfoEnabled(false);

    // Please enable mod rewrite in server.js when html5Mode is enabled.
    // Don't forget to inject $locationProvider.
    // Depending on your project requirements, you may further want to
    // include <base> tag in your index.html
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
  }

  function run ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }


  angular
    .module('root')
    .component('root', root)
    .config(config)
    .run(run);

})();
