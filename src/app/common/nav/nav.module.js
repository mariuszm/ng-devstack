import angular from 'angular';
import { AppNavComponent } from './nav.component';

const AppNavModule = angular
  .module('appNav', [])
  .component('appNav', AppNavComponent)
  .name;

export { AppNavModule };
