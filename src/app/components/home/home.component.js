(function () {
  'use strict';

  var home = {
    templateUrl: './home.html',
    controller: 'HomeController'
  };

  function config ($stateProvider) {
    var home = {
      name: 'home',
      url: '/home',
      component: 'home',
      data: {
        pageTitle: 'Home'
      }
    };

    $stateProvider.state(home);
  }


  angular
    .module('components.home')
    .component('home', home)
    .config(config);

})();
