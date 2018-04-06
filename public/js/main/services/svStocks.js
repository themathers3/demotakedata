var app = angular.module("app.demotakedata")

app.factory("svStocks", ['$http', function ($http) {

    return {
        get: function () {
            return $http.get("/gainers")
        }
    }

}])
