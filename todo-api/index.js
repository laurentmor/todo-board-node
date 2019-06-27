#!/env/node
require('dotenv').config();
const express = require('express');
let app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./config/passport-config');

const UserRouter = require('./routes/users');
const TodoRouter = require('./routes/todos');


const winstonConfig = require('./config/winston-config');
const MongoStore = require('connect-mongo')(session);

log = winstonConfig.setup();

// Connect to DB

const DB = process.env.DB;
app.get("/", function (req, res) {
    res.status(200).send("Hello World!").end();
});

mongoose.set('useCreateIndex', true);
mongoose.connect(DB, {useNewUrlParser: true}).then(function () {


    // BodyParser Middleware
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
    app.use(cookieParser());


// Express Session depending on ENV
    const sessionOptions = {

        secret: process.env.secret,
        saveUninitialized: true,
        resave: true


    };
    //use DB session storage only in production as session won't need to be persisted upon server restart in development

    if (process.env.NODE_ENV === "production") {
        sessionOptions.store = new MongoStore({
            mongooseConnection: mongoose.connection
        });
    }
    app.use(session(sessionOptions));

// Passport init
    app.use(passport.initialize({userProperty: 'User.js'}));
    app.use(passport.session(sessionOptions));

    /*app.get('/data', function (req, res) {
        const jsf = require('json-schema-faker');
        const schema = require('./datasets/user-schema');
        const fs = require('fs');
        jsf.option({
            failOnInvalidTypes: false,
            maxItems: 20000
        });
        const samples = [];
        for (let i = 0; i < 20000; i++) samples[i] = jsf.generate(schema);
        fs.writeFile('./dataSets/userList.json', JSON.stringify(samples), function (err) {
            if (err) throw err;
            res.send(samples);
        })


    });*/
    app.use('/user', UserRouter, () => {
        log.info("bind: " + UserRouter.routes);
    });
    app.use("/todo", TodoRouter, () => {
        log.info("bind: " + TodoRouter);
    });
    passportConfig.setup();


    app.listen(port, log.info('Auth API listening on port ' + port + ' in ' + NODE_ENV));
});

module["exports"] = app;
