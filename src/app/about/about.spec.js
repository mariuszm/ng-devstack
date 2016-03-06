/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name        : 'about module',
    controllers : 'AboutCtrl',
    modules     : [ 'ngDevstack', 'ngDevstack.about' ],
    inject      : [ '$rootScope', '$state' ],
    tests: function (deps) {
        it('should have a AboutCtrl controller', function () {
            expect(deps.AboutCtrl).toBeDefined();
        });

        it('should jump to About page when /about is accessed', function () {
            deps.$state.go('about');
            deps.$rootScope.$apply();
            expect(deps.$state.current.url).toBe('/about');
            expect(deps.$state.current.name).toBe('about');
        });
    }
});

/* jshint ignore: end */
