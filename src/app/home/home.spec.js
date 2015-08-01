/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name: 'home module',
    modules: ['ngDevstack', 'ngDevstack.home'],
    controllers: 'HomeCtrl',
    tests: function (deps) {
        it('should load', function () {
            expect(deps.HomeCtrl).toBeTruthy();
        });
    }
});

/* jshint ignore: end */
