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

var dotEnv = require('dotenv');
var winstonConfig = require('./config/winston-config');
var MongoStore = require('connect-mongo')(session);
dotEnv.config();
log = winstonConfig.setup();

// Connect to DB

var DB = process.env.DB;

mongoose.set('useCreateIndex', true);
mongoose.connect(DB, {useNewUrlParser: true}).then(function () {


    // BodyParser Middleware
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
    app.use(cookieParser());


// Express Session depending on ENV
    var sessionOptions = {

        secret: process.env.secret,
        saveUninitialized: true,
        resave: true


    };
    //use DB session storage only in production as session won't need to be persisted upon server restart in development

    if (process.env.NODE_ENV == "production") {
        sessionOptions.store = new MongoStore({
            mongooseConnection: mongoose.connection
        });
    }
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
    app.use('/user', UserRouter, function () {
        log.info("bind: " + UserRouter);
    });
    app.use("/todos", TodoRouter, function () {
        log.info("bind: " + TodoRouter);
    });
    passportConfig.setup();


    app.listen(port, log.info('Auth API listening on port ' + port + ' in ' + process.env.NODE_ENV));
});
