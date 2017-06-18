(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerUserController', registerUserController);

    /** @ngInject */
    registerUserController.$inject = ['$scope', '$location'];
    
    function registerUserController($scope, $location) {
        $scope.conectionLogin = function(loginPage){
            $location.path(loginPage);
        }
        // console.log('holaaa');
    }
})();

