/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name        : 'app main module',
    controllers : 'AppCtrl',
    modules     : 'ngDevstack',
    inject      : [ '$location', '$rootScope', '$state' ],
    tests: function (deps) {
        // should pass a dummy test
        it('has location service', function () {
            expect(typeof deps.$location).toEqual('object');
        });

        it('init path is correct', function () {
            deps.$rootScope.$emit('$locationChangeSuccess');
            expect(deps.$location.path()).toBe('/');
        });

        it('should redirect to / if page does not exist', function () {
            deps.$location.path('/nonExistentPath');
            deps.$rootScope.$broadcast('$locationChangeSuccess');
            expect(deps.$location.path()).toBe('/');
        });

        // deps.AppCtrl is the $scope object injected into AppCtrl
        it('is a scope for controller', function () {
            expect(deps.AppCtrl).toBeDefined();
            expect(typeof deps.AppCtrl).toEqual('object');
        });

        it('should update page title on state change', function () {
            deps.$state.go('about');
            deps.$rootScope.$apply();
            expect(deps.AppCtrl.pageTitle).toBe(deps.$state.current.data.pageTitle + ' | ng-devstack');
        });
    }
});

/* jshint ignore: end */
