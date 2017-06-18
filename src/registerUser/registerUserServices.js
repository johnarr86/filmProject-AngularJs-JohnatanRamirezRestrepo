(function () {
    'use strict';

    angular
        .module('app')
        .factory('registerUserServices', registerUserServices);

    /** @ngInject */
    registerUserServices.$inject = ['$http', '$q', 'DataHome'];
    function registerUserServices($http, $q, DataHome) {
        var registerUserService = {};
        return registerUserService;
    }
})();
