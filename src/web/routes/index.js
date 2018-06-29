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

router.get('/create_new_account', function(req, res, next) {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : 3306,
        database : 'mydb'
    });

    connection.connect();

    connection.query('INSERT INTO ABLEUSER (ableUser_address, ableUser_nickname) VALUES ("ox1111111","snpo")' , function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });

    connection.end();

    res.render('index', { title: 'Express' });
});

module.exports = router;
