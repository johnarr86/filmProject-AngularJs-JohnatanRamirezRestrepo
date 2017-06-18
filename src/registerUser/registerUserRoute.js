(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/registerUser', {
                controller: 'registerUserController',
                templateUrl: 'src/registerUser/registerUser.html',
                controllerAs: 'registerUser'
            })
    }

})();



