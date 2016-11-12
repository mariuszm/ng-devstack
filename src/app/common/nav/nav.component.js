(function () {
  'use strict';

  var appNav = {
    templateUrl: './nav.html',
    controller: 'AppNavController'
  };

  angular
    .module('common')
    .component('appNav', appNav);

})();
