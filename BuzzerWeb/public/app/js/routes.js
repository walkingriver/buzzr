(function () {
    'use strict';

    angular.module('gameshowBuzzerApp')
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/admin', {
                        templateUrl: 'templates/admin.html',
                        controller: 'adminController'
                    }).
                    when('/buzzer', {
                        templateUrl: 'templates/buzzer.html',
                        controller: 'buzzerController'
                    }).
                    when('/', {
                        templateUrl: 'templates/game.html',
                        controller: 'buzzerController'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
            }]);
})();