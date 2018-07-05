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

/* ==========================================================================
    DB) Able user insert
    ========================================================================== */
router.post('/create_new_account', function (req, res, next) {

    var ableUser_address = req.param('ableUser_address');
    var ableUser_nickname = req.param('ableUser_nickname');

    console.log('ableUser_address : ' + ableUser_address);
    console.log('ableUser_nickname : ' + ableUser_nickname);

    var connection = create_connection();
    var q = "SELECT count(ableUser_address) AS count FROM AbleUser WHERE ableUser_address = '" + ableUser_address + "'";
    console.log('q : ' + q);
    connection.query(q, function (err, rows, fields) {
        console.log('--------1---------'+rows[0].count);
        var count = Number(rows[0].count);

        // if there no ableUser_address in db
        if(count == 0){
            // insert query start
            regist_new_account(res, connection, ableUser_address, ableUser_nickname);
        }

        // already exist ableUser_address in db
        else{
            console.log('204');
            connection.end();
            res.json({result: '204', message: '이미 등록된 계좌입니다.'});
        }
    });
});



/* ==========================================================================
    DB) Able account insert
    ========================================================================== */
router.post('/open_new_account', function (req, res, next) {

    var user_accountNumber = req.param('user_accountNumber');
    var user_Address = req.param('user_Address');
    var ableAccount_password = req.param('ableAccount_password');
    var user_accountType = req.param('user_accountType');

    var ableAccount_info = "Default free ABLE account";

    console.log('index.js user_Address : ' + user_Address);
    console.log('index.js user_accountNumber : ' + user_accountNumber);
    console.log('index.js user_accountType : ' + user_accountType);


    var connection = create_connection();
    var insert_query = "INSERT INTO AbleAccount (ableAccount_number, ableUser_address, ableAccount_password, ableAccount_info, ableAccount_type) " +
        "VALUES ('" + user_accountNumber + "','" + user_Address +"','" + ableAccount_password +"','" + ableAccount_info + "','" + user_accountType + "')";

    connection.query(insert_query, function (err, rows, fields) {
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


});

/* ==========================================================================
    Login Session
    ========================================================================== */
router.post('/save_session', function (req, res, next) {

    var ableUser_address = req.param("user_address");
    console.log('index.js user_address : ' + ableUser_address);

    console.dir(req.session)

    // save data in session
    req.session.ableUser_address = ableUser_address;

    req.session.save(function () {
        // res.redirect('/p2pMatching');
        res.json({result: '200', message: '세션에 등록되었습니다.'});


    });
});


/* ==========================================================================
    Check Session
    ========================================================================== */
router.post('/check_session', function (req, res, next) {
    if(req.session.ableUser_address != null && req.session.ableUser_address !=''){
        var ableUser_address = req.session.ableUser_address;
        console.log(ableUser_address)
        res.json({
            result: '200',
            user_address : ableUser_address ,
            message: '세션이 존재합니다.'
        });
    }else{
        res.json({result: '204', message: '세션이 존재하지 않습니다.'});
    }
});

/* ==========================================================================
    Session Delete
   ========================================================================== */
router.post('/session_delete', function (req, res) {
    delete req.session.ableUser_address;
    // save 함수 => 데이터 저장이 끝났을 때 웰컴 페이지로 이동하게끔 구현
    res.json({
        result: '200',
        message: '세션이 삭제 완료.'
    });
});




/* ==========================================================================
    DB) Connect to db
    ========================================================================== */
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

/* ==========================================================================
    DB) Input db to ableUser_address, albeUser_nickname
    ========================================================================== */
function regist_new_account(res, connection, ableUser_address, ableUser_nickname){

        var insert_query = "INSERT INTO AbleUser (ableUser_address, ableUser_nickname) VALUES ('" + ableUser_address + "','" + ableUser_nickname + "')";
        console.log('insert_query : ' + insert_query);
        connection.query(insert_query, function (err, rows, fields) {
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