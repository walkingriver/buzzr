(function () {
    'use strict';

    angular.module('gameshowBuzzerApp')
        .factory('signalRSvc', ['$rootScope', signalRSvc]);

    function signalRSvc($rootScope) {
        //Getting the connection object
        var hub = $.connection.buzzer;

        var initialize = function () {
            hub.client.youWin = function () {
                $rootScope.$broadcast('YOU_WIN');
                console.log('you win');
            };

            hub.client.sorry = function () {
                $rootScope.$broadcast('SORRY');
                $rootScope.$apply();
                console.log('sorry');
            };

            var reset = function () {
                $rootScope.$broadcast('RESET');
                $rootScope.$apply();
                console.log('reset');
            };
            hub.client.reset = reset;

            //Starting connection
            $.connection.hub.start().done(function () {
                // Do something cool here
            });
        };

        function sendBuzz() {
            hub.server.buzz();
        };

        function sendReset() {
            hub.server.reset();
        };

        return {
            initialize: initialize,
            buzz: sendBuzz,
            reset: sendReset
        };
    }
})();

