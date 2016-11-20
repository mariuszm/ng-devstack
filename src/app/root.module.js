import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import { RootComponent } from './root.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';
import '../sass/main.scss';

const config = ($compileProvider, $stateProvider, $urlRouterProvider) => {
  'ngInject';
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

const run = ($rootScope, $state, $stateParams) => {
  'ngInject';
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};

const RootModule = angular
  .module('root', [
    uiRouter,
    uiBootstrap,
    ComponentsModule,
    CommonModule
  ])
  .component('root', RootComponent)
  .config(config)
  .run(run)
  .name;

export default RootModule;
