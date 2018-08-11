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

router.get('/dummy', function (req, res, next) {
    res.render('html/dummy.html');
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
    console.log(insert_query);

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



/* ==========================================================================
    DB) Input Tranfer History to DB
    ========================================================================== */

router.post('/add_transfer_history', function (req, res, next) {
    var connection = create_connection();

    var ableAccount_from    = req.param('ableAccount_from');
    var ableAccount_to      = req.param('ableAccount_to');
    var token_address       = req.param('token_address');
    var token_amount        = req.param('token_amount');

    var insert_query = "INSERT INTO TransferHistory (ableAccount_from, ableAccount_to, token_address, token_amount, reg_date, st_cd) VALUES ('" + ableAccount_from + "','" + ableAccount_to + "','" + token_address + "','" + token_amount + "',now(), 'A01_10')";

    console.log(insert_query)
    connection.query(insert_query, function (err, result) {
        console.log("result.insertId : "+result.insertId);
        res.json({result: '200',  insertId : result.insertId,  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();
});

router.post('/update_transfer_history', function (req, res, next) {
    var connection = create_connection();
    var insertId    = req.param('insertId');
    var update_query = "UPDATE TransferHistory SET st_cd = 'A01_30' WHERE thid = '"+ insertId +"'";
    console.log(update_query)
    connection.query(update_query, function (err, result) {
        res.json({result: '200',  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();
});

router.post('/add_deposit_history', function (req, res, next) {
    var connection = create_connection();

    var ableAccount_number      = req.param('ableAccount_number');
    var token_address           = req.param('token_address');
    var token_amount            = req.param('token_amount');

    var insert_query = "INSERT INTO DepositHistory (ableAccount_number, token_address, token_amount, reg_date, st_cd) VALUES ('" + ableAccount_number + "','" + token_address + "','" + token_amount + "',now(), 'A02_10')";

    console.log(insert_query)
    connection.query(insert_query, function (err, result) {
        res.json({result: '200',  insertId : result.insertId,  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();
});

router.post('/update_deposit_history', function (req, res, next) {
    var connection = create_connection();
    var insertId    = req.param('insertId');
    var update_query = "UPDATE DepositHistory SET st_cd = 'A02_30' WHERE dhid = '"+ insertId +"'";
    console.log(update_query)
    connection.query(update_query, function (err, result) {
        res.json({result: '200',  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();
});

router.post('/add_withdraw_history', function (req, res, next) {
    var connection = create_connection();

    var ableAccount_number      = req.param('ableAccount_number');
    var token_address           = req.param('token_address');
    var token_amount            = req.param('token_amount');

    var insert_query = "INSERT INTO WithdrawHistory (ableAccount_number, token_address, token_amount, reg_date, st_cd) VALUES ('" + ableAccount_number + "','" + token_address + "','" + token_amount  + "',now(), 'A03_10')";

    console.log(insert_query)
    connection.query(insert_query, function (err, result) {
        res.json({result: '200', insertId : result.insertId,  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();
});

router.post('/update_withdraw_history', function (req, res, next) {
    var connection = create_connection();
    var insertId    = req.param('insertId');
    var update_query = "UPDATE WithdrawHistory SET st_cd = 'A03_30' WHERE whid = '"+ insertId +"'";
    console.log(update_query)
    connection.query(update_query, function (err, result) {
        res.json({result: '200',  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();
});

router.post('/get_transfer_history', function (req, res, next){
    var connection = create_connection();
    var user_address = req.session.ableUser_address;

    var select_query = "SELECT A.*, if( st_cd = 'A01_10' &&  date_add(A.reg_date,interval+1 day) < now() , 'A01_20',st_cd ) AS st_cd2 FROM  TransferHistory A left join AbleAccount B on B.ableAccount_number = RPAD(A.ableAccount_from, 66,'0') OR RPAD(A.ableAccount_to, 66,'0')  WHERE B.ableUser_address  = '"+ user_address +"' ORDER BY reg_date DESC";

    console.log(select_query);
    connection.query(select_query, function (err, rows, fields) {
        res.json({result: '200', history_list: rows, message: '정상적으로 조회 되었습니다.'});
    });
    connection.end();
});

router.post('/get_deposit_history', function (req, res, next){
    var connection = create_connection();
    var user_address = req.session.ableUser_address;

    var select_query = "SELECT A.* , if( st_cd = 'A02_10' &&  date_add(A.reg_date,interval+1 day) < now() , 'A02_20',st_cd ) AS st_cd2 FROM DepositHistory A left join AbleAccount B on B.ableAccount_number = RPAD(A.ableAccount_number, 66,'0')   WHERE B.ableUser_address  = '"+ user_address +"' ORDER BY reg_date DESC";

    console.log(select_query)
    connection.query(select_query, function (err, rows, fields) {
        res.json({result: '200', history_list: rows, message: '정상적으로 조회 되었습니다.'});
    });
    connection.end();
});

router.post('/get_withdraw_history', function (req, res, next){
    var connection = create_connection();
    var user_address = req.session.ableUser_address;

    var select_query = "SELECT A.* , if( st_cd = 'A03_10' &&  date_add(A.reg_date,interval+1 day) < now() , 'A03_20',st_cd ) AS st_cd2 FROM  WithdrawHistory A left join AbleAccount B on B.ableAccount_number = RPAD(A.ableAccount_number, 66,'0')  WHERE B.ableUser_address  = '"+ user_address +"' ORDER BY reg_date DESC";

    console.log(select_query)
    connection.query(select_query, function (err, rows, fields) {
        res.json({result: '200', history_list: rows, message: '정상적으로 조회 되었습니다.'});
    });
    connection.end();
});


/*
* order history DB insert
*
* */

router.post('/add_order_history', function (req, res, next) {
    var connection = create_connection();

    var ableAccount_number      = req.param('ableAccount_number');
    var order_type      = req.param('order_type');
    var token_address           = req.param('token_address');
    var token_amount            = req.param('token_amount');
    var token_priceOfWei            = req.param('token_priceOfWei');

    var insert_query = "INSERT INTO OrderHistory (ableAccount_number, order_type, token_address, token_amount,token_priceOfWei, reg_date ) VALUES ('" + ableAccount_number + "','" + order_type + "','" + token_address + "','" + token_amount  + "','" + token_priceOfWei + "',now())";
    console.log(insert_query)
    connection.query(insert_query, function (err, result) {
        res.json({result: '200', insertId : result.insertId,  message: '정상적으로 입력 되었습니다.'});
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


/* ==========================================================================
    DB) Order History to DB
    ========================================================================== */

// INSERT market trades order history
router.post('/add_market_history', function (req, res, next) {

    var connection = create_connection();

    var ableAccount_number      = req.param('ableAccount_number');
    var order_type      = req.param('order_type');
    var token_address           = req.param('token_address');
    var token_amount            = req.param('token_amount');
    // var token_priceOfWei            = req.param('token_priceOfWei');

    var insert_query = "INSERT INTO OrderHistory (ableAccount_number, order_type, token_address, token_amount, token_priceOfWei, reg_date) " +
        "VALUES ('" + ableAccount_number + "','" + order_type + "','" + token_address + "','" + token_amount  + "','" + "123123" + "',now())";

    console.log("add_market_history : " + insert_query);
    connection.query(insert_query, function (err, result) {
        res.json({result: '200', insertId : result.insertId,  message: '정상적으로 입력 되었습니다.'});
    });
    connection.end();

});

// SELECT market trades order history
router.post('/get_marketorder_history', function (req, res, next) {

    var connection = create_connection();

    // todo id값의 역순대로 해줘야함
    var select_query = "SELECT * FROM OrderHistory";
    console.log("get_marketorder_history : " + select_query);

    connection.query(select_query, function (err, rows, fields) {
        history_list = rows;
        res.json({result: '200', history_list: rows, message: '정상적으로 조회 되었습니다.'});
    });

    connection.end();

});

// SELECT my trades order history
router.post('/get_myorder_history', function (req, res, next) {

    var connection = create_connection();

    var select_query = "SELECT * FROM OrderHistory WHERE ableAccount_number = '" + req.param('ableAccount_number') + "'";
    console.log("get_myorder_history : " + select_query);

    connection.query(select_query, function (err, rows, fields) {
        history_list = rows;
        res.json({result: '200', history_list: rows, message: '정상적으로 조회 되었습니다.'});
    });

    connection.end();

});

/* ==========================================================================
    DB) Chart Data
    ========================================================================== */

// SELECT chart data
router.post('/get_chartdata', function (req, res, next) {

    var connection = create_connection();

    // todo id값의 역순대로 해줘야함
    var select_query = "SELECT * FROM OrderHistory";
    console.log("get_marketorder_history : " + select_query);

    connection.query(select_query, function (err, rows, fields) {
        history_list = rows;
        res.json({result: '200', history_list: rows, message: '정상적으로 조회 되었습니다.'});
    });

    connection.end();

});


module.exports = router;