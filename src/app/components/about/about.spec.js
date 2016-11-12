/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
  name        : 'about module',
  controllers : 'AboutController',
  modules     : ['components', 'components.about'],
  inject      : ['$rootScope', '$state', '$componentController'],
  tests: function (deps) {
    var controller;
    var scope;
    beforeEach(function () {
      scope = deps.$rootScope.$new();
      controller = deps.$componentController('about', { $scope: scope });
    });

    it('should jump to About page when /about is accessed', function () {
      deps.$state.go('about');
      deps.$rootScope.$digest();
      expect(deps.$state.current.url).toBe('/about');
      expect(deps.$state.current.name).toBe('about');
    });

    it('should use the correct controller', function () {
      expect(controller.title).toBeDefined();
      expect(controller.title).toBe('About');
      expect(deps.AboutController).toBeDefined();
      expect(deps.AboutController.$$prevSibling.$ctrl).toEqual(controller);
    });
  }
});

/* jshint ignore: end */
