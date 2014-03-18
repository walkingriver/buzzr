(function () {
    'use strict';

    angular.module('gameshowBuzzerApp')
        .controller('adminController', ['$scope', '$routeParams', 'comService', adminController]);

    function adminController($scope, $routeParams, comService) {
        var vm = this;

        // Bindable properties and functions are placed on vm
        vm.gameId = $routeParams.gameId;
        vm.winner = false;
        vm.ready = false;
        vm.title = "Connected";
        vm.reset = reset;
        vm.players = [];

        activate();

        function activate() {
            comService.initialize();
            doReset();
            setupListeners();
        }

        function doReset() {
            vm.winner = '';
            vm.ready = true;
            vm.title = "You are connected.";
        }

        // These functions are exposed to the outside world through the VM
        function reset() {
            comService.reset();
        };

        function setupListeners() {
            $scope.$on('RESET', function (event, data) {
                console.log('reset');
                doReset();
            });
            $scope.$on('WINNER', function (event, data){
                console.log('Winner declared: ' + data)
                vm.ready = false;
                vm.winner = data.winner;
            });
            $scope.$on('CONNECT',function (event, data){
                console.log('Player connected: ' + data);
                for(var i = vm.players.length - 1; i >= 0; i--) {
                    if(vm.players[i] === data) {
                        console.log('Already have player...moving on.');
                        return;
                    }
                }
                vm.players.push(data);
            });
            $scope.$on('DISCONNECT', function(event,data){
                console.log('Player disconnected: ' + data);
                for(var i = vm.players.length - 1; i >= 0; i--) {
                    if(vm.players[i] === data) {
                        vm.players.splice(i, 1);
                    }
                }
            });
            $scope.$on('PLAYERS', function(event,data){
                console.log('Player list received: ' + data);
                vm.players = data;
            });
        }
    }
})();