import angular from 'angular';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';

const ComponentsModule = angular
  .module('components', [
    HomeModule,
    AboutModule
  ])
  .name;

export { ComponentsModule };
