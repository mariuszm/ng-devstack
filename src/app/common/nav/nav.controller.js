(function () {
  'use strict';

  angular
    .module('common')
    .controller('AppNavController', AppNavController);


  function AppNavController ($scope) {
    var vm = {
      $onInit    : $onInit,
      $postLink  : $postLink,
      $onDestroy : $onDestroy,

      isCollapsed: true,    // handling UI Bootstrap Collapse plugin
      toggleCollapse: toggleCollapse
    };

    var $ctrl = this;

    angular.extend(this, vm);


    function $onInit () {}
    function $postLink () {}
    function $onDestroy () {}

    function toggleCollapse () {
      $ctrl.isCollapsed = !$ctrl.isCollapsed;
    }
  }

})();
