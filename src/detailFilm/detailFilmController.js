(function () {
    'use strict';

    angular
        .module('app')
        .controller('detailFilmController', detailFilmController);

    /** @ngInject */
    detailFilmController.$inject = ['$scope', '$routeParams', 'homeServices', 'localStorageService','$location'];
    function detailFilmController($scope, $routeParams, homeServices, localStorageService, $location) {
        $scope.error = null;
        $scope.index = $routeParams.index || null;
        $scope.detailsModal = {};
        $scope.allMovies = []; 

        $scope.saveStartDetail = function (index, value) {
            $scope.allMovies[$scope.index].star = value;
            $scope.detailsModal.start = value;
            localStorageService.set("datosMovie", $scope.allMovies);
        }

        $scope.getData = function () {
            homeServices.getData().then(
                function (response) {
                    if (response.datosMovie[$scope.index] !== undefined) {
                        $scope.detailsModal = response.datosMovie[$scope.index];
                        $scope.allMovies = response.datosMovie;
                        localStorageService.set("Data", $scope.allMovies);
                    } else {
                        $scope.error = 'Movie not available';
                    }
                });
        }

        $scope.conectionHome = function(homePage){
            $location.path(homePage);
        }

        if ($scope.index && !isNaN($scope.index)) {
            if (localStorageService.get("datosMovie")) {
                $scope.allMovies = localStorageService.get("datosMovie");
                if ($scope.allMovies[$scope.index] !== undefined) {
                    $scope.detailsModal = $scope.allMovies[$scope.index];
                }
            }else{
                $scope.getData();
            }
        } else {
            $scope.error = 'Movie not available';
        }
    }
})();


