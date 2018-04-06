var app = angular.module("app.demotakedata")

app.factory("svLosers", ['$http', function ($http) {

    return {
        get: function () {
            return $http.get("/losers")
        }
    }

}])
