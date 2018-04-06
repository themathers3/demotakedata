var app = angular.module("app.demotakedata", ['ngAnimate', 'ui.bootstrap']);

app.controller("gainerController", ['$scope', 'svStocks', function ($scope, svStocks) {

    $scope.stocks = [];

    svStocks.get().then(successCallback, errorCallback);

    function successCallback(res) {
        $scope.stocks = res.data;
    }

    $scope.userClass = function(user) {
        return user.changevalue < 0 ? 'red': 'green';
    };

    $scope.userRate = function(user) {
        return user.changerate < 0 ? 'red': 'green';
    };

    function errorCallback(error) {
        throw error;
    }

}]);

app.controller("losersController", ['$scope', 'svLosers', function ($scope, svLosers) {

    $scope.stocks = [];

    svLosers.get().then(successCallback, errorCallback);

    function successCallback(res) {
        $scope.stocks = res.data;
    }

    $scope.userClass = function(user) {
        return user.changevalue < 0 ? 'red': 'green';
    };

    $scope.userRate = function(user) {
        return user.changerate < 0 ? 'red': 'green';
    };

    function errorCallback(error) {
        throw error;
    }

}]);

