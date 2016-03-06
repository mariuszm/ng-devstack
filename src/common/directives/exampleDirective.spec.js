/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name    : 'example directive',
    modules : 'ngDevstack.myDirectiveModule',
    element : '<my-directive></my-directive>',
    tests: function (deps) {
        it('can update DOM using binding', function () {
            expect(deps.element).toBeDefined();

            var scope = deps.element.scope();
            scope.foo = 'ng-devstack';
            scope.$apply();
            expect(deps.element.html()).toEqual('ng-devstack');
        });
    }
});

/* jshint ignore: end */
