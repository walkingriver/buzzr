(function () {
    'use strict';

    angular.module('gameshowBuzzerApp')
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/admin/:gameCode', {
                        templateUrl: '/app/js/admin/admin.html',
                        controller: 'adminController'
                    }).
                    when('/game/:gameCode/:playerName', {
                        templateUrl: '/app/js/buzzer/buzzer.html',
                        controller: 'buzzerController'
                    }).
                    when('/', {
                        templateUrl: '/app/js/game/game.html',
                        controller: 'gameController'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
            }]);
})();