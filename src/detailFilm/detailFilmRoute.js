(function(){
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/detailFilm/:index', {
                controller: 'detailFilmController',
                templateUrl: 'src/detailFilm/detailFilm.html',
                controllerAs: 'detailFilm'
            })

            .when('/detailFilm', {
                controller: 'detailFilmController',
                templateUrl: 'src/detailFilm/error.html',
                controllerAs: 'error'
            })
    }

})();