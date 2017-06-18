(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    /** @ngInject */
    loginController.$inject = ['$scope','$location'];
    function loginController($scope, $location) {
       
        $scope.conectionRegisterUs = function(regUserConection){
            $location.path(regUserConection);
        }
        
        $scope.conectionHome = function(pageHome){
            $location.path(pageHome);
        }
    }
})();

