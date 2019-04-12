#!/env/node
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var passportConfig = require('./config/passport-config');

var UserRouter = require('./routes/users');
var TodoRouter = require('./routes/todos');

const dotEnv = require('dotenv');
const winstonConfig = require('./config/winston-config');
dotEnv.config();
log = winstonConfig.setup();

// Connect to DB
const DB = process.env.DB;

mongoose.set('useCreateIndex', true);
mongoose.connect(DB, {useNewUrlParser: true}).then(function () {

    log.error("TEST");

    // BodyParser Middleware
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
    app.use(cookieParser());


// Express Session
    const sessionOptions = {

        secret: process.env.secret,
        saveUninitialized: true,
        resave: true

    };
    app.use(session(sessionOptions));

// Passport init
    app.use(passport.initialize({userProperty: 'user'}));
    app.use(passport.session(sessionOptions));

    app.get('/data', function (req, res) {
        var jsf = require('json-schema-faker');
        var schema = require('./datasets/user-schema');
        var fs = require('fs');
        jsf.option({
            failOnInvalidTypes: false,
            maxItems: 20000
        });
        var samples = [];
        for (var i = 0; i < 20000; i++) samples[i] = jsf.generate(schema);
        fs.writeFile('./dataSets/userList.json', JSON.stringify(samples), function (err) {
            if (err) throw err;
            res.send(samples);
        })


    });
    app.use('/users', UserRouter);
    app.use("/todos", TodoRouter, function () {
        log.info("bind: " + TodoRouter);
    });
    passportConfig.setup();


    app.listen(port, log.info('Auth API listening on port ' + port + ' in ' + process.env.NODE_ENV));
});
