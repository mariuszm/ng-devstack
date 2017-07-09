import 'angular';
import 'angular-mocks';
import './root.module';

describe('Component: Root', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module('root'));

  beforeEach(inject(($injector) => {
    $rootScope           = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state               = $injector.get('$state');
    $location            = $injector.get('$location');
    $compile             = $injector.get('$compile');
  }));


  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming

    it('has location service', function () {
      expect(typeof $location).toEqual('object');
    });

    it('init path is correct', function () {
      $rootScope.$emit('$locationChangeSuccess');
      expect($location.path()).toBe('/home');
    });

    it('should redirect to /home if page does not exist', function () {
      $location.path('/nonExistentPath');
      $rootScope.$emit('$locationChangeSuccess');
      expect($location.path()).toBe('/home');
    });
  });

  describe('Controller', () => {
    // controller specs

    let controller;

    beforeEach(() => {
      controller = $componentController('root', {
        $scope: $rootScope.$new()
      });
    });

    it('exists', () => {
      expect(controller).toBeDefined();
    });
  });

});
