(function () {
  'use strict';

  angular
    .module('root')
    .controller('RootController', RootController);


  function RootController ($transitions) {
    var vm = {
      $onInit    : $onInit,
      $postLink  : $postLink,
      $onDestroy : $onDestroy
    };

    angular.extend(this, vm);


    console.time('App init');

    var transitionStart;
    var transitionEnd;

    function $onInit () {
      var stateValid = {
        from: function (state) {
          return !!(state.name);
        }
      };

      transitionStart = $transitions.onStart(stateValid, function ($transition$) {
        console.time('[$transition] ' + $transition$.$from().name + '->' + $transition$.$to().name);
      });

      transitionEnd = $transitions.onSuccess(stateValid, function ($transition$) {
        console.timeEnd('[$transition] ' + $transition$.$from().name + '->' + $transition$.$to().name);
      });
    }

    function $postLink () {
      console.timeEnd('App init');
    }

    function $onDestroy () {
      transitionStart();
      transitionEnd();
    }

  }

})();
