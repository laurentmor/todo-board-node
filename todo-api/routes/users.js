var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path'),
    User = require('../models/user');

router.get('/', function displayHomer(req, res) {
    res.sendFile(path.join(__dirname, '.', '../homer.png'));

});

function createValidUserFromRequest(req) {
    var password = req.body.password;


    /** @namespace req.body.password2 */
    if (password === req.body.password2) {
        return new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role

        });

    } else {
        return null;
    }
}

// Register User
router.post('/create', function (req, res) {

    var validUser = createValidUserFromRequest(req, res);
    if (validUser) {
        User.createUser(validUser, function (err, user) {
            if (err) throw err;
            res.send(user).end()
        });
    } else res.status(500).send("{error: \"Passwords don't match\"}").end();

});


// Endpoint to login
router.post('/login',
    // wrap passport.authenticate call in a middleware function
    function (req, res, next) {
        // call passport authentication passing the "local" strategy name and a callback function
        passport.authenticate('local', function (error, user, info) {

            if (error) {
                res.status(401).send(error);
            } else if (!user) {
                res.status(401).send(info);
            } else {
                req.session.user = user;

                next();
            }

            res.status(401).send(info);
        })(req, res);
    },

    // function to call once successfully authenticated
    function (req, res) {
        res.status(200).send(req.session.user);
    });





// Endpoint to get current user
router.get('/profile', function (req, res) {
    res.send(req.session.user);
});


// Endpoint to logout
router.get('/logout', function (req, res) {
    req.logout();
    res.send(null)
});

router.get('/all', function (req, res) {
    var user = req.session.user;
    if (user && User.hasRole(user, "admin")) {
        User.find({}, function (err, result) {
            if (err) throw err;
            else res.status(200).send(result).end();
        })
    } else {
        res.status(401).end();
    }
});

// noinspection JSUndefinedPropertyAssignment
module.exports = router;