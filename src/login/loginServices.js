(function () {
    'use strict';

    angular
        .module('app')
        .factory('loginServices', loginServices);

    /** @ngInject */
    loginServices.$inject = ['$http', '$q'];
    function loginServices($http, $q, DataLogin) {
        var loginService = {};
        return loginService;
    }
})();
