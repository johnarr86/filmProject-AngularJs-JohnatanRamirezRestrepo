(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    /** @ngInject */
    homeController.$inject = ['$scope', '$http', 'localStorageService', '$location', 'homeServices'];
    function homeController($scope, $http, localStorageService, $location, homeServices) {

        $scope.getData = function () {
            homeServices.getData().then(
                function (response) {
                    $scope.movies = response.datosMovie;
                    localStorageService.set("datosMovie", $scope.movies);
                });
         }
            
        $scope.saveStart = function(index, value){
            $scope.movies[index].start = value;
            localStorageService.set("datosMovie", $scope.movies);
        };

        $scope.conectionDetailFilm = function(detailConection){
            $location.path(detailConection);
        };

        $scope.removeItem = function(index){
            $scope.movies.splice(index,1);
            localStorageService.set("datosMovie", $scope.movies);
        };

        $scope.resetData = function(){
            localStorageService.clearAll();
            $scope.movies = $scope.getData();
            localStorageService.set("datosMovie", $scope.movies);
        };

        if (localStorageService.get("datosMovie")) {
            $scope.movies = localStorageService.get("datosMovie");
        } else {
            $scope.getData();
            // $scope.movies = $scope.getData();
            // localStorageService.set("datosMovie", $scope.movies);
        }
      }

      
})();



  