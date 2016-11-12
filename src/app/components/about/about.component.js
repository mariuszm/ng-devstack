(function () {
  'use strict';

  var about = {
    templateUrl: './about.html',
    controller: 'AboutController'
  };

  function config ($stateProvider) {
    var about = {
      name: 'about',
      url: '/about',
      component: 'about',
      data: {
        pageTitle: 'About'
      }
    };

    $stateProvider.state(about);
  }


  angular
    .module('components.about')
    .component('about', about)
    .config(config);

})();
