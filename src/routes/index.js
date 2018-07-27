var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('html/intro.html');
});
router.get('/p2pMatching', function (req, res, next) {
    res.render('html/p2pMatching.html');
});
router.get('/dex', function (req, res, next) {
    res.render('html/dex.html');
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
router.get('/dex', function (req, res, next) {
    res.render('html/dex.html');
});

router.get('/deposit_token', function (req, res, next) {
    res.render('html/deposit_token.html');
});

router.get('/withdraw_token', function (req, res, next) {
    res.render('html/withdraw_token.html');
});

router.get('/main', function (req, res, next) {
    res.render('html/main.html');
});

// router.get('/dummy', function (req, res, next) {
//     res.render('html/dummy.html');
// });

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
        console.log('user count : ' + rows[0].count);
        var count = Number(rows[0].count);

        // if there no ableUser_address in db
        if (count == 0) {
            // insert query start
            regist_new_account(req, res, connection, ableUser_address, ableUser_nickname);
        }

        // already exist ableUser_address in db
        else {
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
    var insert_query = "INSERT INTO AbleAccount (ableAccount_number, ableUser_address, ableAccount_password, ableAccount_info, ableAccount_type, reg_date) " +
        "VALUES ('" + user_accountNumber + "','" + user_Address + "','" + ableAccount_password + "','" + ableAccount_info + "','" + user_accountType + "',now())";

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
    if (req.session.ableUser_address != null && req.session.ableUser_address != '') {
        var ableUser_address = req.session.ableUser_address;
        console.log(ableUser_address)
        res.json({
            result: '200',
            user_address: ableUser_address,
            message: '세션이 존재합니다.'
        });
    } else {
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
function create_connection() {
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

// new account register
function regist_new_account(req, res, connection, ableUser_address, ableUser_nickname) {
    console.log('222222222 '+ableUser_nickname);
    var insert_query = "INSERT INTO AbleUser (ableUser_address, ableUser_nickname, reg_date) VALUES ('" + ableUser_address + "','" + ableUser_nickname + "',now())";
    console.log('insert_query : ' + insert_query);
    connection.query(insert_query, function (err, rows, fields) {
        console.log(rows);
        if (!err) {
            connection.end();
            req.session.ableUser_address = ableUser_address;
            req.session.save();
            res.json({result: '200', message: '정상적으로 등록되었습니다.'});
        } else {
            console.log(err);
            connection.end();
            res.json({result: '500', message: '오류가 발생되었습니다.'});
        }
    });
}


/* ==========================================================================
    DB) Get User_Accounts
    ========================================================================== */
router.post('/get_accounts', function (req, res, next) {

    var account_list;

    var connection = create_connection();
    // var q = "SELECT count(*) AS account_count FROM AbleAccount WHERE ableUser_address = '" + req.session.ableUser_address + "'";
    //
    // connection.query(q, function (err, rows, fields) {
    //     console.log('account_count : ' + rows[0].count);
    //     account_count = Number(rows[0].count);
    // });

    q = "SELECT * FROM AbleAccount WHERE ableUser_address = '" + req.session.ableUser_address + "'";

    connection.query(q, function (err, rows, fields) {

        console.log(q);
        console.dir(rows);
        // for (i=0;i<rows.length();i++){
        //     var q2= "SELECT A.* FROM TokenBalance A LEFT JOIN AbleAccount B ON A.ableAccount_number = B. ableAccount_number WHERE A.ableAccount_number =  '"+rows[i].ableAccount_number+"'";
        //
        //     connection.query(q2, function (err, rows, fields) {
        //         console.log('account_count : '+rows[0].count);
        //         account_count = Number(rows[0].count);
        //     });
        // }
        account_list = rows;
        res.json({result: '200', account_count: rows.length, account_list: account_list, message: '정상적으로 조회 되었습니다.'});
    });

    connection.end();

});


/* ==========================================================================
    DB) Get User_Name
    ========================================================================== */
router.post('/get_username', function (req, res, next) {

    var connection = create_connection();

    q = "SELECT ableUser_nickname FROM AbleUser WHERE ableUser_address = '" + req.param('user_address') + "'";

    console.log(q)
    connection.query(q, function (err, rows, fields) {

        account_list = rows;
        res.json({result: '200', data: rows, message: '정상적으로 조회 되었습니다.'});
    });

    connection.end();

});



router.post('/get_tokens', function (req, res, next) {
    var token_list;

    var connection = create_connection();
    // var q = "SELECT count(*) AS account_count FROM AbleAccount WHERE ableUser_address = '" + req.session.ableUser_address + "'";
    //
    // connection.query(q, function (err, rows, fields) {
    //     console.log('account_count : ' + rows[0].count);
    //     account_count = Number(rows[0].count);
    // });

    q = "SELECT * FROM TokenBalance WHERE ableAccount_number = '" + ("ableAccount_number") + "'";

    console.log(q);
    connection.query(q, function (err, rows, fields) {

        console.dir(rows);

        token_list = rows;
        res.json({result: '200', account_count: rows.length, token_list: token_list, message: '정상적으로 조회 되었습니다.'});
    });

    connection.end();
});



router.post('/check_sum', function (req, res, next) {
    var test = req.param('account');
    console.log("param : "+test);
    var ret = toChecksumAddress(test);
    console.log(ret);
    res.json({result: ret});
});

const createKeccakHash = require('keccak');

function toChecksumAddress (address) {
    address = address.toLowerCase().replace('0x', '');
    var hash = createKeccakHash('keccak256').update(address).digest('hex');
    var ret = '0x';

    for (var i = 0; i < address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
            ret += address[i].toUpperCase();
        } else {
            ret += address[i];
        }
    }

    return ret
}


module.exports = router;