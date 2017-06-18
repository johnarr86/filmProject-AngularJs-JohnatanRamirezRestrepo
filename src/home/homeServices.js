(function () {
    'use strict';

    angular
        .module('app')
        .factory('homeServices', homeServices);

    /** @ngInject */
    homeServices.$inject = ['$http', '$q', 'DataHome'];
    function homeServices($http, $q, DataHome) {
        var homeService = {};



        var url = DataHome.getData;
        console.log(url);
        var _getData = function (user) {
            return $http.get(url).then(
                function (response) {
                    if (typeof response.data === 'object') {
                        return $q.resolve(response.data);
                    } else {
                        return $q.reject(response.data);
                    }
                },
                function (response) {
                    return $q.reject(response.data);
                });
        };
        homeService.getData = _getData;



        return homeService;
    }
})();


