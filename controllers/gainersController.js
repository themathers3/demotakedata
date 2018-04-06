var mysql = require("mysql");


module.exports = function (app, connection) {
    app.get("/gainers", function (req, res) {
        var queryString = 'SELECT * FROM test_stock ORDER BY value DESC LIMIT 20';
        connection.query(queryString, function (err, result) {
            if(err){
                throw err;
            }else{
                res.json(result);
            }
        })
    });
    app.get("/losers", function (req, res) {
        var queryString = 'SELECT * FROM test_stock ORDER BY value ASC LIMIT 20';
        connection.query(queryString, function (err, result) {
            if(err){
                throw err;
            }else{
                res.json(result);
            }
        })
    })
};