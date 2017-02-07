import angular from 'angular';
import { AppNavModule } from './nav/nav.module';

const conf = {
  appName: 'ngDevstack',
  appVersion: '1.0.1'
};

const CommonModule = angular
  .module('common', [
    AppNavModule
  ])
  .constant('conf', conf)
  .value('EventEmitter', event => ({ $event: event }))
  .name;

export { CommonModule };
