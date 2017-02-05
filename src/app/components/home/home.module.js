import angular from 'angular';
import { HomeComponent } from './home.component';
import './home.scss';

/* @ngInject */
const config = ($stateProvider) => {
  let home = {
    name: 'home',
    url: '/home',
    component: 'home',
    data: {
      pageTitle: 'Home'
    }
  };

  $stateProvider.state(home);
};

const HomeModule = angular
  .module('components.home', [])
  .component('home', HomeComponent)
  .config(config)
  .name;

export { HomeModule };
