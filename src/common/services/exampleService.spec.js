/* jshint ignore: start */

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

ngDescribe({
    name    : 'example service',
    modules : 'ngDevstack.myServiceModule',
    inject  : 'myService',
    tests: function (deps) {
        it('is a function', function () {
            expect(typeof deps.myService.hello).toEqual('function');
        });

        it('appends value of Hello function to any string', function () {
          var result = deps.myService.hello('John');
          expect(result).toBe('Hello John!');
        });
    }
});

/* jshint ignore: end */
