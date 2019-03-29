var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

var logger=require('morgan');

var todoRouter = require('./routes/todos');
var usersRouter = require('./routes/users');
var URL = require("./config/config.json").DB.URL;
// Connect to DB
mongoose.connect(URL).then(function (value) {});
var db = mongoose.connection;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: '6D59713374367739',
    saveUninitialized: true,
    resave: true
}));




// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use('/todos', todoRouter);
app.use('/users', usersRouter);

module.exports = app;
