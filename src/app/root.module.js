import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import '../sass/main.scss';
import { RootComponent } from './root.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';

/* @ngInject */
const config = ($compileProvider, $stateProvider, $urlRouterProvider) => {
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
};

/* @ngInject */
const run = ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};

const RootModule = angular
  .module('root', [
    uiRouter,
    ngMaterial,
    ComponentsModule,
    CommonModule
  ])
  .component('root', RootComponent)
  .config(config)
  .run(run)
  .name;

export default RootModule;
