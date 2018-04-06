var mysql = require("mysql");
var rFloat = require("random-float");
var rInt = require("random-int");
var users = function () {


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'test'
    });

    connection.connect();
    var stockdata = [[
        ["VINAMILK", "VNM", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["GASOLINE", "GAS", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["DONNIE POCKET", "DPM", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["PVC PLASTIC", "PVC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["VINCENT CORP ", "VCF", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["MICROSOFT NOW", "MSN", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["DRIVE PINATUS", "DPR", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["DAMIEN HIGHGROUND", "DHG", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["PHARMA", "PHR", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["VINGROUP", "VIC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["PETROLIMEX ", "PVS", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["SAM SOLUTION", "SLS", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["TRACKERS", "TRC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["SOMETHING BIG", "SBT", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["FPT SHOP", "FPT", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["ENGRISK", "EIB", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["LASSO", "LAS", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["FROSTBITE", "FCN", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["PACIFIC XS", "PXS", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["TRADA", "TRA", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["BITMAP", "BMP", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["MB BANK", "MBB", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["CTG CORP", "CTG", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["JVC TELEVISION", "JVC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["DIAGNOSIS PROVIDE", "DVP", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["KID EDUCATION", "KDC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["NSC JEWELS", "NSC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["TACTICAL COMPANY", "TAC", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["SERVR VIRY", "SVI", rFloat(99.99).toFixed(2), rInt(1000, 1000000)],
        ["AC Group.,JSC", "ACM", rFloat(99.99).toFixed(2), rInt(1000, 1000000)]
    ]];

    connection.query('SELECT * from test_stock', function (error, results) {
        if (results.length != 0) {
            results.forEach(function (user) {
                var firstPrice = user.price;
                setInterval(
                    function () {
                        var chance = rInt(1, 2);
                        var change = rFloat(0.05).toFixed(2);
                        var weightChange = rInt(10, 30);
                        console.log(chance);
                        console.log(change);
                        switch (chance){
                            case 1:
                                user.price = user.price - (user.price * change);
                                user.weight = user.weight + weightChange;
                                console.log("case1");
                                break;
                            case 2:
                                user.price = user.price + (user.price * change);
                                user.weight = user.weight + weightChange;
                                console.log("case2");
                                break;
                        }
                        console.log("code: ", user.stock, " price: ", parseFloat(user.price).toFixed(2), " weight: ", user.weight);
                        user.value = user.price * user.weight;
                        console.log("code: ", user.stock, " value: ", parseInt(user.value));
                        user.changerate = ((user.price / firstPrice) - 1) * 100;
                        user.changevalue = user.price - firstPrice;
                        connection.query('UPDATE test_stock SET price=?,weight=?, value=?, changerate=?, changevalue=?  WHERE stock = ?', [parseFloat(user.price).toFixed(2), parseInt(user.weight), parseInt(user.value), parseFloat(user.changerate).toFixed(2), parseFloat(user.changevalue).toFixed(2), user.stock], function (err, result) {
                            if (err) {
                                throw err;
                            }
                        })
                    }, 5000);
            })
        } else {
            connection.query("INSERT into test_stock (`name`, `stock`, `price`, `weight`) VALUES ? ", stockdata, function (err, result) {
                if (err) {
                    throw err;
                }else{
                    connection.query('SELECT * from test_stock', function (error, results) {
                        results.forEach(function (user) {
                            user.value = user.price * user.weight;
                            connection.query("UPDATE test_stock SET value=? WHERE stock = ? ", [parseInt(user.value), user.stock], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                            });
                        });
                    });
                }
            });
        }
    });
};
module.exports = users;