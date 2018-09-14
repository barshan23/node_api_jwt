var express = require('express');
var app = express();
var db = require('./db');
var bcrypt = require('bcrypt');
var AuthController = require('./auth/AuthController');
var UserController = require('./user/UserController');

app.use('/user', UserController);
app.use('/auth', AuthController);

module.exports = app;