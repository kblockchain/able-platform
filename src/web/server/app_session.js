var express = require('express');
var session = require*('express-session');
var app = express()

app.use(session({
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: true
}));

app.get('')