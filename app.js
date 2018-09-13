var express = require('express');
var app = express();
var db = require('./db');
var bcrypt = require('bcrypt');

var UserController = require('./user/UserController');
app.use('/user', UserController);

module.exports = app;