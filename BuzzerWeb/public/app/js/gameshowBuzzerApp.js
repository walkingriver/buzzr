(function () {
    'use strict';

    angular.module('gameshowBuzzerApp', [])
        .controller('buzzerController', ['$scope', 'comService', buzzerController]);

    function buzzerController($scope, comService) {
        var vm = this;

        // Bindable properties and functions are placed on vm
        vm.winner = false;
        vm.sorry = false;
        vm.isNotReady = function () {
            console.log('checking to see if we are ready');
            return (vm.winner || vm.sorry) ? 'Not Ready' : '';
        };
        vm.title = "Connected";
        vm.buzz = buzz;
        vm.reset = reset;

        activate();

        function activate() {
            comService.initialize();
            doReset();
            setupListeners();
        }

        function doReset() {
            vm.winner = false;
            vm.sorry = false;
            vm.title = "You are connected.";
        }

        // These functions are exposed to the outside world through the VM
        function buzz() {
            comService.buzz();
        }

        function reset() {
            comService.reset();
        };

        function setupListeners() {
            $scope.$on('YOU_WIN', function (event, data) {
                console.log('YOU WIN');
                vm.winner = true;
//                $scope.$apply();
            });
            $scope.$on('SORRY', function (event, data) {
                console.log('sorry');
                vm.sorry = true;
//                $scope.$apply();
            });
            $scope.$on('RESET', function (event, data) {
                console.log('reset');
                doReset();
//                $scope.$apply();
            });
        }
    }
})();
