import 'angular';
import 'angular-mocks';
import '../../root.module';

describe('Component: About', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module('root', 'components', 'components.about'));

  beforeEach(inject(($injector) => {
    $rootScope           = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state               = $injector.get('$state');
    $location            = $injector.get('$location');
    $compile             = $injector.get('$compile');
  }));


  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming

    it('should jump to About page when /about is accessed', function () {
      $state.go('about');
      $rootScope.$digest();
      expect($state.current.url).toBe('/about');
      expect($state.current.name).toBe('about');
    });
  });

  describe('Controller', () => {
    // controller specs

    let controller;

    beforeEach(() => {
      controller = $componentController('about', {
        $scope: $rootScope.$new()
      });
    });

    it('should use the correct controller', function () {
      expect(controller.title).toBeDefined();
      expect(controller.title).toBe('About');
    });
  });

});
