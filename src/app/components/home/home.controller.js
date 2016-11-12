(function () {
  'use strict';

  angular
    .module('components.home')
    .controller('HomeController', HomeController);


  function HomeController () {
    var vm = {
      $onInit    : $onInit,
      $postLink  : $postLink,
      $onDestroy : $onDestroy,

      title      : 'Home'   // just for unit-testing
    };

    angular.extend(this, vm);


    function $onInit () {}
    function $postLink () {}
    function $onDestroy () {}
  }

})();
