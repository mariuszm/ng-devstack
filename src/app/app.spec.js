/* jshint ignore: start */

ngDescribe({
    name: 'is current url',
    modules: 'ngDevstack',
    controllers: 'AppCtrl',
    inject: ['$location'],
    tests: function (deps) {
        // should pass a dummy test
        it('has location service', function () {
            expect(typeof deps.$location).toEqual('object');
        });

        // deps.AppCtrl is the $scope object injected into AppCtrl
        it('is a scope for controller', function () {
            expect(deps.AppCtrl).toBeTruthy();
            expect(typeof deps.AppCtrl).toEqual('object');
        });
    }
});

/* jshint ignore: end */
