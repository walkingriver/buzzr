(function () {
    'use strict';

    angular.module('gameshowBuzzerApp')
        .factory('comService', ['$rootScope', comService]);

    function comService($rootScope) {
        var socket = io.connect('http://localhost:8080'),
            userId = '';

        return {
            initialize: initialize,
            buzz: sendBuzz,
            reset: sendReset
        };

        function initialize() {
            socket.on('info', function () {
                console.log('we are connected to the socket.io server.');
                socket.emit('message', 'hello server');
            });
            socket.on('winner', onWinner);
            socket.on('reset', onReset);
            userId = makeUserId();
        }

        function makeUserId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        function sendBuzz() {
            console.log('client sending buzz for user ' + userId);
            socket.emit('buzz', {userId: userId});
        }

        function sendReset() {
            console.log('client sending reset');
            socket.emit('reset');
        }

        function onWinner(data) {
            var winnerId = data.winner;
            console.log('client onWinner for ' + winnerId);
            if (winnerId === userId) {
                $rootScope.$broadcast('YOU_WIN');
            } else {
                console.log('client onSorry');
                $rootScope.$broadcast('SORRY');
            }
            $rootScope.$apply();
        }

        function onReset(data) {
            console.log('client onReset');
            $rootScope.$broadcast('RESET');
            $rootScope.$apply();
        }
    }
})();

