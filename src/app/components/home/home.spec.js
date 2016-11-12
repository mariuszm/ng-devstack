/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
  name        : 'home module',
  controllers : 'HomeController',
  modules     : ['components', 'components.home'],
  inject      : ['$rootScope', '$state', '$componentController'],
  tests: function (deps) {
    var controller;
    var scope;
    beforeEach(function () {
      scope = deps.$rootScope.$new();
      controller = deps.$componentController('home', { $scope: scope });
    });

    it('should jump to Home page when /home is accessed', function () {
      deps.$state.go('home');
      deps.$rootScope.$digest();
      expect(deps.$state.current.url).toBe('/home');
      expect(deps.$state.current.name).toBe('home');
    });

    it('should use the correct controller', function () {
      expect(controller.title).toBeDefined();
      expect(controller.title).toBe('Home');
      expect(deps.HomeController).toBeDefined();
      expect(deps.HomeController.$$prevSibling.$ctrl).toEqual(controller);
    });
  }
});

/* jshint ignore: end */
