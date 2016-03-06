'use strict';

angular.module('ngDevstack.myServiceModule', [])

.factory('myService', function () {
    return {
        hello: function (yourName) {
            return 'Hello ' + yourName + '!';
        }
    };
});
