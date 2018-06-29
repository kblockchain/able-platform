var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('html/intro.html');
});
router.get('/p2pMatching', function(req, res, next) {
    res.render('html/p2pMatching.html');
});
router.get('/send', function(req, res, next) {
    res.render('html/send.html');
});
router.get('/salary', function(req, res, next) {
    res.render('html/salary.html');
});
router.get('/account_manage', function(req, res, next) {
    res.render('html/account_manage.html');
});

router.post('/create_new_account', function(req, res, next) {

    var ableUser_address = req.param('ableUser_address');
    var ableUser_nickname = req.param('ableUser_nickname');
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : 3306,
        database : 'mydb'
    });

    console.log(ableUser_address);
    console.log(ableUser_nickname);

    connection.connect();
    var q = "INSERT INTO ABLEUSER (ableUser_address, ableUser_nickname) VALUES ('" + ableUser_address + "','"+ ableUser_nickname +"')";
    console.log('q : '+ q);
    connection.query( q, function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
    connection.end();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("Updated Successfully");
});

module.exports = router;
