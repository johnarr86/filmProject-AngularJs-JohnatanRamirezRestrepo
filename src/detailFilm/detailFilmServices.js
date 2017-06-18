(function () {
    'use strict';

    angular
        .module('app')
        .factory('detailFilmServices', detailFilmServices);

    /** @ngInject */
    detailFilmServices.$inject = ['$http', '$q'];
    function detailFilmServices($http, $q) {
        var detailFilmService = {};
        return detailFilmService;
    }
})();
