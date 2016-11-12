/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
  name        : 'app main module',
  controllers : 'RootController',
  modules     : 'root',
  inject      : ['$location', '$rootScope'],
  tests: function (deps) {
    // should pass a dummy test
    it('has location service', function () {
      expect(typeof deps.$location).toEqual('object');
    });

    it('init path is correct', function () {
      deps.$rootScope.$emit('$locationChangeSuccess');
      expect(deps.$location.path()).toBe('/home');
    });

    it('should redirect to /home if page does not exist', function () {
      deps.$location.path('/nonExistentPath');
      deps.$rootScope.$emit('$locationChangeSuccess');
      expect(deps.$location.path()).toBe('/home');
    });

    // deps.RootController is the $scope object injected into RootController
    it('is a scope for controller', function () {
      expect(deps.RootController).toBeDefined();
      expect(typeof deps.RootController).toEqual('object');
    });
  }
});

/* jshint ignore: end */
