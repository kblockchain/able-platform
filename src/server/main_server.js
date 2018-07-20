var express = require('express');

var routes = require('./routes');

var user = require('./routes/user');

var http = require('http');

var path = require('path');


var mysql = require('mysql');

// 다음 로딩된 모듈로부터 Connection 객체를 생성한다. 이 때 실제적인 Connection 연결은 이루어지지 않는다.
    var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'terry',
    password : 'asdf1234',
    database:'terry'
});
