import angular from 'angular';
import { AboutComponent } from './about.component';
import './about.scss';

const config = ($stateProvider) => {
  'ngInject';
  let about = {
    name: 'about',
    url: '/about',
    component: 'about',
    data: {
      pageTitle: 'About'
    }
  };

  $stateProvider.state(about);
};

const AboutModule = angular
  .module('components.about', [])
  .component('about', AboutComponent)
  .config(config)
  .name;

export { AboutModule };
