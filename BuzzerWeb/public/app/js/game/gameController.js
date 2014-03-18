(function () {
    'use strict';

    var controllerId = 'gameController';

    //TODO: Put your dependencies here
    angular.module('gameshowBuzzerApp')
        .controller(controllerId, ['$scope', '$location', gameController]);

    function gameController($scope, $location) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'gameController';

        vm.join = function (playerName, gameCode) {
            $location.path('/game/' + playerName + '/' + gameCode);
        };

        activate();

        function activate() {
            vm.playerName = '';
            vm.gameCode = '';
            vm.newGameCode = createGameCode();
        }

        function createGameCode() {
            return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).substr(-4);
        }
    }
})();