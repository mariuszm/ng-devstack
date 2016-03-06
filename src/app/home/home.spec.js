/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name        : 'home module',
    controllers : 'HomeCtrl',
    modules     : [ 'ngDevstack', 'ngDevstack.home' ],
    inject      : [ '$rootScope', '$state' ],
    tests: function (deps) {
        it('should have a HomeCtrl controller', function () {
            expect(deps.HomeCtrl).toBeDefined();
        });

        it('should jump to Home page when / is accessed', function () {
            deps.$state.go('home');
            deps.$rootScope.$apply();
            expect(deps.$state.current.url).toBe('/');
            expect(deps.$state.current.name).toBe('home');
        });
    }
});

/* jshint ignore: end */
