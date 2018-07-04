var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('html/intro.html');
});
router.get('/p2pMatching', function (req, res, next) {
    res.render('html/p2pMatching.html');
});
router.get('/send', function (req, res, next) {
    res.render('html/send.html');
});
router.get('/salary', function (req, res, next) {
    res.render('html/salary.html');
});
router.get('/account_manage', function (req, res, next) {
    res.render('html/account_manage.html');
});

/* Post home page. */
router.post('/create_new_account', function (req, res, next) {

    var ableUser_address = req.param('ableUser_address');
    var ableUser_nickname = req.param('ableUser_nickname');

    console.log('ableUser_address : ' + ableUser_address);
    console.log('ableUser_nickname : ' + ableUser_nickname);

    var connection = create_connection();
    var result = 0;
    var q = "SELECT count(ableUser_address) AS count FROM AbleUser WHERE ableUser_address = '" + ableUser_address + "'";
    console.log('q : ' + q);
    connection.query(q, function (err, rows, fields) {
        console.log('--------1---------'+rows[0].count);
        var count = Number(rows[0].count);
        if(count == 0){
            regist_new_account(res, connection, ableUser_address, ableUser_nickname);
        }else{
            console.log('204');
            connection.end();
            res.json({result: '204', message: '이미 등록된 계좌입니다.'});
        }
    });
});

/* ==========================================================================
    Login Session
    ========================================================================== */

router.post('/', function (req, res, next) {

    var ableUser_address = req.param("user_address");
    console.log('index.js user_address : ' + ableUser_address);

    // save data in session
    req.session.ableUser_address = ableUser_address;

    req.session.save(function () {
        // console.log('index.js 옵니까!?');
        //
        // res.redirect('/p2pMatching');
    });

    location.href('/p2pMatching');


    res.send(200);

});

// DB connection
function create_connection(){
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '13.125.18.152',
        user: 'test',
        password: 'test',
        port: 3306,
        database: 'mydb'
    });
    connection.connect();
    return connection;
}

// new account register
function regist_new_account(res, connection, ableUser_address, ableUser_nickname){

        var q = "INSERT INTO AbleUser (ableUser_address, ableUser_nickname) VALUES ('" + ableUser_address + "','" + ableUser_nickname + "')";
        console.log('q : ' + q);
        connection.query(q, function (err, rows, fields) {
            console.log(err);
            console.log(rows);
            if (!err) {
                connection.end();
                res.json({result: '200', message: '정상적으로 등록되었습니다.'});
            } else {
                connection.end();
                res.json({result: '500', message: '오류가 발생되었습니다.'});
            }
        });
}


module.exports = router;