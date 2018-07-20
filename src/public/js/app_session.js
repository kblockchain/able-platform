/*// 1.로그인 화면
app.get('/auth/login', function (req, res) {
    var output=`
    <form action="/auth/login" method="post">
    
    <p> 
    <input type="text" name="username" placeholder="username">
    <input type="text" name="password" placeholder="password">
    </p>
    
    <p>
    <input type="submit">
</p>
    
    </form>
    `;
    res.send(output);
});*/

// 2.로그인 버튼 클릭 시 발생하는 이벤트
app.post('/auth/login', function (req, res) {

    var user = {
        username:'inseop',
        password:'111',
        displayName:'hihihi'
    };

    // request (사용자로부터 받아오는 데이터)
    var name = req.body.username;
    var pwd = req.body.password;

    // 사용자로부투 받아온 데이터와 데이터 베이스에 저장되어 있는 사용자 데이터를 비교
    if(name == user.username && pwd == user.password) {
        req.session.username_server = user.username;
        req.session.password_server = user.password;
        req.session.displayName_server = user.displayName;

        req.session.save(function () {
            res.redirect('/welcome');
        });

    }

    else {
        res.send("Denied");
    }

});


// 3.로그인 성공 페이지
app.get('/welcome', function (req, res) {

    if(req.session.displayName_server) {
        res.send(req.session); // 세션 정보를 사용자에게 보내주는 코드
    }
});

// 로그아웃
app.get('/auth/logout', function (req, res) {
    delete req.session.displayName;
    // save 함수 => 데이터 저장이 끝났을 때 웰컴 페이지로 이동하게끔 구현
    res.session.save(function () {
        res.redirect('/welcome');
    });
});


app.listen(8080, function () {
     console.log("Connected 8080 port!");
 });