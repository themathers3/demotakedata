var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var users = require("./controllers/users");
var gainersController = require("./controllers/gainersController");

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

connection.connect();

connection.query("CREATE TABLE IF NOT EXISTS `test_stock` " +
    "( `name` VARCHAR(100) NOT NULL , `stock` VARCHAR(3) NOT NULL , `price` FLOAT NOT NULL , `weight` BIGINT NOT NULL , " +
    "`value` BIGINT NULL , `changevalue` FLOAT NULL , `changerate` FLOAT NULL ) ENGINE = InnoDB;", function (err) {
    if(err){
        throw err
    }else{
        console.log("table created");
    }
});

users();

app.get('/', function (req, res) {
    res.render("home");

});

gainersController(app, connection);

app.listen(3000);



