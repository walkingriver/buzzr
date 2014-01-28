(function () {
    'use strict';

    angular.module('gameshowBuzzerApp', [])
        .controller('buzzerController', ['$scope', 'signalRSvc', buzzerController]);

    function buzzerController($scope, signalRSvc) {
        var vm = this;

        // Bindable properties and functions are placed on vm
        vm.winner = false;
        vm.sorry = false;
        vm.ready = function () { return !winner && !sorry; };
        vm.title = "Connected";
        vm.buzz = buzz;
        vm.reset = reset;

        var _reset = function () {
            vm.winner = false;
            vm.sorry = false;
            vm.title = "You are connected.";
            $scope.$apply();
        }

        signalRSvc.initialize();

        $scope.$on('YOU_WIN', function (event, data) {
            vm.winner = true;
            $scope.$apply();
        });
        $scope.$on('SORRY', function (event, data) {
            vm.sorry = true;
            $scope.$apply();
        });
        $scope.$on('RESET', function (event, data) {
            _reset();
        });

        // These functions are exposed to the outside world through the VM
        function buzz () {
            signalRSvc.buzz();
        }

        function reset() {
            signalRSvc.reset();
        };

        _reset();
    }
})();
