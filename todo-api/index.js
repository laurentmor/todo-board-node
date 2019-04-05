#!/env/node
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var passportConfig = require('./config/passport-config');

var UserRouter = require('./routes/users');


// Conenct to DB
const DB = 'mongodb://localhost/todo-DB';

mongoose.connect(DB, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

// BodyParser Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.get('/data', function (req, res) {
    var jsf = require('json-schema-faker');
    var schema = require('./datasets/user-schema');
    var fs = require('fs');
    jsf.option({
        failOnInvalidTypes: false,
        maxItems: 20000
    });
    var samples = [];
    for (var i = 0; i < 20000; i++) {
        samples[i] = jsf.generate(schema);
    }
    fs.writeFile('./datasets/userList.json', JSON.stringify(samples), function (err) {
        if (err) throw err;
        res.send(samples);
    })


});
app.use('/users', UserRouter);
passportConfig.setup();


app.listen(port, console.log('Auth API listening on port ' + port));