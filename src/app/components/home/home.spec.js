import 'angular';
import 'angular-mocks';
import '../../root.module';

describe('Component: Home', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module('root', 'components', 'components.home'));

  beforeEach(inject(($injector) => {
    $rootScope           = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state               = $injector.get('$state');
    $location            = $injector.get('$location');
    $compile             = $injector.get('$compile');
  }));


  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming

    it('should jump to Home page when /home is accessed', function () {
      $state.go('home');
      $rootScope.$digest();
      expect($state.current.url).toBe('/home');
      expect($state.current.name).toBe('home');
    });
  });

  describe('Controller', () => {
    // controller specs

    let controller;

    beforeEach(() => {
      controller = $componentController('home', {
        $scope: $rootScope.$new()
      });
    });

    it('should use the correct controller', function () {
      expect(controller.title).toBeDefined();
      expect(controller.title).toBe('Home');
    });
  });

});
