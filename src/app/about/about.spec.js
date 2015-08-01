/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name: 'about module',
    modules: ['ngDevstack', 'ngDevstack.about'],
    controllers: 'AboutCtrl',
    tests: function (deps) {
        it('should load', function () {
            expect(deps.AboutCtrl).toBeTruthy();
        });
    }
});

/* jshint ignore: end */
