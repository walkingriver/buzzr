(function () {
    'use strict';

    angular.module('gameshowBuzzerApp')
        .factory('comService', ['$rootScope', comService]);

    function comService($rootScope) {
        var socket,
            userId = '';

        return {
            initialize: initialize,
            buzz: sendBuzz,
            reset: sendReset,
            setPlayerName: setPlayerName
        };

        function initialize() {
            if (socket) return;

            socket = io.connect('http://localhost:8080');
            socket.on('info', onInfo);
            socket.on('winner', onWinner);
            socket.on('reset', onReset);
            socket.on('playerConnected', onPlayerConnected);
            socket.on('playerDisconnected', onPlayerDisconnected);
        }

        function onInfo(data) {
            console.log('We are connected to the socket.io server.');
            socket.emit('message', 'hello server');

            // Initially set the winner, if one
            $rootScope.$broadcast('WINNER', {winner: data.winner});
            $rootScope.$broadcast('PLAYERS', {players: data.players});
            userId = data.playerId;

            // And now we need to enter the game.
            $rootScope.$broadcast('PLAYER_SET');
        }

        function sendBuzz() {
            console.log('client sending buzz for user ' + userId);
            socket.emit('buzz', {userId: userId});
        }

        function sendReset() {
            console.log('client sending reset');
            socket.emit('reset');
        }

        function setPlayerName(name) {
            console.log('Setting player name to ' + name);
            socket.emit('announce', {name: name});
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
            // Tell the admin who actually won
            $rootScope.$broadcast('WINNER', {winner: winnerId});
            $rootScope.$apply();
        }

        function onReset(data) {
            console.log('client onReset');
            $rootScope.$broadcast('RESET');
            $rootScope.$apply();
        }

        function onPlayerConnected(data) {
            $rootScope.$broadcast('CONNECT', data.clientId);
            $rootScope.$apply();
        }

        function onPlayerDisconnected(data) {
            $rootScope.$broadcast('DISCONNECT', data.clientId);
            $rootScope.$apply();
        }
    }
})();

