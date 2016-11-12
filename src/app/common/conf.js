(function () {
  'use strict';

  angular
    .module('common')
    .constant('conf', {
      api: {
        login  : '/api/login',
        logout : '/api/logout',
        signup : '/api/signup',
        expiry : '/api/expiry'
      }
    })
    .value('eventEmitter', function (event) {
      // mirror Angular 2 and keep consistency inside every component
      return {
        $event: event
      };
    });

})();
