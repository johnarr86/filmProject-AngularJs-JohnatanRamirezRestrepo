angular.module('app', [
  "ngRoute",
  "ngResource",
  "ngAnimate",
  "ngSanitize",
  "ngMessages",
  "LocalStorageModule"
]);
(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();

(function() {
  'use strict';

  angular
    .module('app')
    .constant('version', '1.0')

})();

(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  /** @ngInject */
  function run($log) {
    //$log.debug('runBlock end');
  }

})();

(function () {
  'use strict';

  angular
    .module('app')
    .constant('DataRegisterUser', {
      registerUserData: 'registerUserData'
    })
})();


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

(function(){
  'use strict';

  angular
    .module('app')
    .constant('DataLogin', {
      loginData: 'loginData'
    })
})();

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


(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'loginController',
                templateUrl: 'src/login/login.html',
                controllerAs: 'login'
            })
    }

})();

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

(function(){
  'use strict';

  angular
    .module('app')
    .constant('DataDetailFilm', {
      detailFilmData: 'detailFilmData'
    })
})();
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

(function () {
  'use strict';

  angular
    .module('app')
    .constant('DataHome', {
      getData:"http://demo9129706.mockable.io/JohnatanMovie"
    })
})();

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



  
(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'src/home/home.html',
                controllerAs: 'home'
            })
    }

})();



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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbnN0YW50cy5qcyIsInJ1bi5qcyIsInJlZ2lzdGVyVXNlci9yZWdpc3RlclVzZXJDb25zdGFudHMuanMiLCJyZWdpc3RlclVzZXIvcmVnaXN0ZXJVc2VyQ29udHJvbGxlci5qcyIsInJlZ2lzdGVyVXNlci9yZWdpc3RlclVzZXJSb3V0ZS5qcyIsInJlZ2lzdGVyVXNlci9yZWdpc3RlclVzZXJTZXJ2aWNlcy5qcyIsImxvZ2luL2xvZ2luQ29uc3RhbnRzLmpzIiwibG9naW4vbG9naW5Db250cm9sbGVyLmpzIiwibG9naW4vbG9naW5Sb3V0ZS5qcyIsImxvZ2luL2xvZ2luU2VydmljZXMuanMiLCJkZXRhaWxGaWxtL2RldGFpbEZpbG1Db25zdGFudHMuanMiLCJkZXRhaWxGaWxtL2RldGFpbEZpbG1Db250cm9sbGVyLmpzIiwiZGV0YWlsRmlsbS9kZXRhaWxGaWxtUm91dGUuanMiLCJkZXRhaWxGaWxtL2RldGFpbEZpbG1TZXJ2aWNlcy5qcyIsImhvbWUvaG9tZUNvbnN0YW50cy5qcyIsImhvbWUvaG9tZUNvbnRyb2xsZXIuanMiLCJob21lL2hvbWVSb3V0ZS5qcyIsImhvbWUvaG9tZVNlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICBcIm5nUm91dGVcIixcbiAgXCJuZ1Jlc291cmNlXCIsXG4gIFwibmdBbmltYXRlXCIsXG4gIFwibmdTYW5pdGl6ZVwiLFxuICBcIm5nTWVzc2FnZXNcIixcbiAgXCJMb2NhbFN0b3JhZ2VNb2R1bGVcIlxuXSk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhjb25maWcpO1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgZnVuY3Rpb24gY29uZmlnKCRsb2dQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xuICAgIC8vIEVuYWJsZSBsb2dcbiAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwJylcbiAgICAuY29uc3RhbnQoJ3ZlcnNpb24nLCAnMS4wJylcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5ydW4ocnVuKTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGZ1bmN0aW9uIHJ1bigkbG9nKSB7XG4gICAgLy8kbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbiAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAuY29uc3RhbnQoJ0RhdGFSZWdpc3RlclVzZXInLCB7XHJcbiAgICAgIHJlZ2lzdGVyVXNlckRhdGE6ICdyZWdpc3RlclVzZXJEYXRhJ1xyXG4gICAgfSlcclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyVXNlckNvbnRyb2xsZXInLCByZWdpc3RlclVzZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICAvKiogQG5nSW5qZWN0ICovXHJcbiAgICByZWdpc3RlclVzZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckbG9jYXRpb24nXTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgICRzY29wZS5jb25lY3Rpb25Mb2dpbiA9IGZ1bmN0aW9uKGxvZ2luUGFnZSl7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKGxvZ2luUGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdob2xhYWEnKTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIC8qKiBAbmdJbmplY3QgKi9cclxuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlciddO1xyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvcmVnaXN0ZXJVc2VyJywge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyVXNlckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvcmVnaXN0ZXJVc2VyL3JlZ2lzdGVyVXNlci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3JlZ2lzdGVyVXNlcidcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3JlZ2lzdGVyVXNlclNlcnZpY2VzJywgcmVnaXN0ZXJVc2VyU2VydmljZXMpO1xyXG5cclxuICAgIC8qKiBAbmdJbmplY3QgKi9cclxuICAgIHJlZ2lzdGVyVXNlclNlcnZpY2VzLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgJ0RhdGFIb21lJ107XHJcbiAgICBmdW5jdGlvbiByZWdpc3RlclVzZXJTZXJ2aWNlcygkaHR0cCwgJHEsIERhdGFIb21lKSB7XHJcbiAgICAgICAgdmFyIHJlZ2lzdGVyVXNlclNlcnZpY2UgPSB7fTtcclxuICAgICAgICByZXR1cm4gcmVnaXN0ZXJVc2VyU2VydmljZTtcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwJylcbiAgICAuY29uc3RhbnQoJ0RhdGFMb2dpbicsIHtcbiAgICAgIGxvZ2luRGF0YTogJ2xvZ2luRGF0YSdcbiAgICB9KVxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxuICAgICAgICAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgbG9naW5Db250cm9sbGVyKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBsb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywnJGxvY2F0aW9uJ107XG4gICAgZnVuY3Rpb24gbG9naW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgXG4gICAgICAgICRzY29wZS5jb25lY3Rpb25SZWdpc3RlclVzID0gZnVuY3Rpb24ocmVnVXNlckNvbmVjdGlvbil7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChyZWdVc2VyQ29uZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmNvbmVjdGlvbkhvbWUgPSBmdW5jdGlvbihwYWdlSG9tZSl7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChwYWdlSG9tZSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xuXG4gICAgLyoqIEBuZ0luamVjdCAqL1xuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIGNvbmZpZygkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2xvZ2luJ1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmZhY3RvcnkoJ2xvZ2luU2VydmljZXMnLCBsb2dpblNlcnZpY2VzKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBsb2dpblNlcnZpY2VzLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XG4gICAgZnVuY3Rpb24gbG9naW5TZXJ2aWNlcygkaHR0cCwgJHEsIERhdGFMb2dpbikge1xuICAgICAgICB2YXIgbG9naW5TZXJ2aWNlID0ge307XG4gICAgICAgIHJldHVybiBsb2dpblNlcnZpY2U7XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnYXBwJylcclxuICAgIC5jb25zdGFudCgnRGF0YURldGFpbEZpbG0nLCB7XHJcbiAgICAgIGRldGFpbEZpbG1EYXRhOiAnZGV0YWlsRmlsbURhdGEnXHJcbiAgICB9KVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2RldGFpbEZpbG1Db250cm9sbGVyJywgZGV0YWlsRmlsbUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIC8qKiBAbmdJbmplY3QgKi9cclxuICAgIGRldGFpbEZpbG1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm91dGVQYXJhbXMnLCAnaG9tZVNlcnZpY2VzJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCckbG9jYXRpb24nXTtcclxuICAgIGZ1bmN0aW9uIGRldGFpbEZpbG1Db250cm9sbGVyKCRzY29wZSwgJHJvdXRlUGFyYW1zLCBob21lU2VydmljZXMsIGxvY2FsU3RvcmFnZVNlcnZpY2UsICRsb2NhdGlvbikge1xyXG4gICAgICAgICRzY29wZS5lcnJvciA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLmluZGV4ID0gJHJvdXRlUGFyYW1zLmluZGV4IHx8IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLmRldGFpbHNNb2RhbCA9IHt9O1xyXG4gICAgICAgICRzY29wZS5hbGxNb3ZpZXMgPSBbXTsgXHJcblxyXG4gICAgICAgICRzY29wZS5zYXZlU3RhcnREZXRhaWwgPSBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5hbGxNb3ZpZXNbJHNjb3BlLmluZGV4XS5zdGFyID0gdmFsdWU7XHJcbiAgICAgICAgICAgICRzY29wZS5kZXRhaWxzTW9kYWwuc3RhcnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoXCJkYXRvc01vdmllXCIsICRzY29wZS5hbGxNb3ZpZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdldERhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhvbWVTZXJ2aWNlcy5nZXREYXRhKCkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRvc01vdmllWyRzY29wZS5pbmRleF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGV0YWlsc01vZGFsID0gcmVzcG9uc2UuZGF0b3NNb3ZpZVskc2NvcGUuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxsTW92aWVzID0gcmVzcG9uc2UuZGF0b3NNb3ZpZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoXCJEYXRhXCIsICRzY29wZS5hbGxNb3ZpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvciA9ICdNb3ZpZSBub3QgYXZhaWxhYmxlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jb25lY3Rpb25Ib21lID0gZnVuY3Rpb24oaG9tZVBhZ2Upe1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChob21lUGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHNjb3BlLmluZGV4ICYmICFpc05hTigkc2NvcGUuaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChcImRhdG9zTW92aWVcIikpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hbGxNb3ZpZXMgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChcImRhdG9zTW92aWVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmFsbE1vdmllc1skc2NvcGUuaW5kZXhdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGV0YWlsc01vZGFsID0gJHNjb3BlLmFsbE1vdmllc1skc2NvcGUuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICRzY29wZS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSAnTW92aWUgbm90IGF2YWlsYWJsZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuXHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICAvKiogQG5nSW5qZWN0ICovXHJcbiAgICBjb25maWcuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInXTtcclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2RldGFpbEZpbG0vOmluZGV4Jywge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2RldGFpbEZpbG1Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2RldGFpbEZpbG0vZGV0YWlsRmlsbS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2RldGFpbEZpbG0nXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAud2hlbignL2RldGFpbEZpbG0nLCB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZGV0YWlsRmlsbUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvZGV0YWlsRmlsbS9lcnJvci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2Vycm9yJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdkZXRhaWxGaWxtU2VydmljZXMnLCBkZXRhaWxGaWxtU2VydmljZXMpO1xyXG5cclxuICAgIC8qKiBAbmdJbmplY3QgKi9cclxuICAgIGRldGFpbEZpbG1TZXJ2aWNlcy4kaW5qZWN0ID0gWyckaHR0cCcsICckcSddO1xyXG4gICAgZnVuY3Rpb24gZGV0YWlsRmlsbVNlcnZpY2VzKCRodHRwLCAkcSkge1xyXG4gICAgICAgIHZhciBkZXRhaWxGaWxtU2VydmljZSA9IHt9O1xyXG4gICAgICAgIHJldHVybiBkZXRhaWxGaWxtU2VydmljZTtcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5jb25zdGFudCgnRGF0YUhvbWUnLCB7XG4gICAgICBnZXREYXRhOlwiaHR0cDovL2RlbW85MTI5NzA2Lm1vY2thYmxlLmlvL0pvaG5hdGFuTW92aWVcIlxuICAgIH0pXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGhvbWVDb250cm9sbGVyKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBob21lQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnbG9jYWxTdG9yYWdlU2VydmljZScsICckbG9jYXRpb24nLCAnaG9tZVNlcnZpY2VzJ107XG4gICAgZnVuY3Rpb24gaG9tZUNvbnRyb2xsZXIoJHNjb3BlLCAkaHR0cCwgbG9jYWxTdG9yYWdlU2VydmljZSwgJGxvY2F0aW9uLCBob21lU2VydmljZXMpIHtcblxuICAgICAgICAkc2NvcGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhvbWVTZXJ2aWNlcy5nZXREYXRhKCkudGhlbihcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vdmllcyA9IHJlc3BvbnNlLmRhdG9zTW92aWU7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwiZGF0b3NNb3ZpZVwiLCAkc2NvcGUubW92aWVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAkc2NvcGUuc2F2ZVN0YXJ0ID0gZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcbiAgICAgICAgICAgICRzY29wZS5tb3ZpZXNbaW5kZXhdLnN0YXJ0ID0gdmFsdWU7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldChcImRhdG9zTW92aWVcIiwgJHNjb3BlLm1vdmllcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNvbmVjdGlvbkRldGFpbEZpbG0gPSBmdW5jdGlvbihkZXRhaWxDb25lY3Rpb24pe1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoZGV0YWlsQ29uZWN0aW9uKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICAgICRzY29wZS5tb3ZpZXMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoXCJkYXRvc01vdmllXCIsICRzY29wZS5tb3ZpZXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5yZXNldERhdGEgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgJHNjb3BlLm1vdmllcyA9ICRzY29wZS5nZXREYXRhKCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldChcImRhdG9zTW92aWVcIiwgJHNjb3BlLm1vdmllcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KFwiZGF0b3NNb3ZpZVwiKSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vdmllcyA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KFwiZGF0b3NNb3ZpZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5nZXREYXRhKCk7XG4gICAgICAgICAgICAvLyAkc2NvcGUubW92aWVzID0gJHNjb3BlLmdldERhdGEoKTtcbiAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwiZGF0b3NNb3ZpZVwiLCAkc2NvcGUubW92aWVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBcbn0pKCk7XG5cblxuXG4gICIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XG5cbiAgICAvKiogQG5nSW5qZWN0ICovXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJ107XG4gICAgZnVuY3Rpb24gY29uZmlnKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2hvbWUnXG4gICAgICAgICAgICB9KVxuICAgIH1cblxufSkoKTtcblxuXG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmZhY3RvcnkoJ2hvbWVTZXJ2aWNlcycsIGhvbWVTZXJ2aWNlcyk7XG5cbiAgICAvKiogQG5nSW5qZWN0ICovXG4gICAgaG9tZVNlcnZpY2VzLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJywgJ0RhdGFIb21lJ107XG4gICAgZnVuY3Rpb24gaG9tZVNlcnZpY2VzKCRodHRwLCAkcSwgRGF0YUhvbWUpIHtcbiAgICAgICAgdmFyIGhvbWVTZXJ2aWNlID0ge307XG5cblxuXG4gICAgICAgIHZhciB1cmwgPSBEYXRhSG9tZS5nZXREYXRhO1xuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICB2YXIgX2dldERhdGEgPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmwpLnRoZW4oXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGhvbWVTZXJ2aWNlLmdldERhdGEgPSBfZ2V0RGF0YTtcblxuXG5cbiAgICAgICAgcmV0dXJuIGhvbWVTZXJ2aWNlO1xuICAgIH1cbn0pKCk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
