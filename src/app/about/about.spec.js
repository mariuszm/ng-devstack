/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('home module', function () {
    beforeEach(module('ngDevstack'));
    beforeEach(module('ngDevstack.about'));
    beforeEach(inject(function ($rootScope, $controller) {
        $controller('AboutCtrl', {
            $scope: $rootScope.$new()
        });
    }));

    it('should load', inject(function () {
        expect(true).toBeTruthy();
    }));
});

/* jshint ignore: end */
