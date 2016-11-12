(function () {
  'use strict';

  angular
    .module('components.about')
    .controller('AboutController', AboutController);


  function AboutController () {
    var vm = {
      $onInit    : $onInit,
      $postLink  : $postLink,
      $onDestroy : $onDestroy,

      title      : 'About'   // just for unit-testing
    };

    angular.extend(this, vm);


    function $onInit () {}
    function $postLink () {}
    function $onDestroy () {}
  }

})();
