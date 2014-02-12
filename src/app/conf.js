'use strict';

angular.module('ngDevstack.conf', [])

.constant('conf', {
    api: {
        login  : '/api/login',
        logout : '/api/logout',
        signup : '/api/users',
        expiry : '/api/current_user',
        registerClient: '/api/create_profile',
        uploadLogo : '/api/attachments'
    }
});
