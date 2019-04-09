var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path'),
    User = require('../models/user');

router.get('/', function displayHomer(req, res) {
    res.sendFile(path.join(__dirname, '.', '../homer.png'));
    //res.sendFile('homer.png');
});

function createValidUserFromRequest(req, res) {
    var password = req.body.password;
    var password2 = req.body.password2;

    if (password === password2) {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        return newUser;
    } else {
        res.status(500).send("{erros: \"Passwords don't match\"}").end()
    }
}

// Register User
router.post('/create', function (req, res) {

    var validUser = createValidUserFromRequest(req, res);
    User.createUser(validUser, function (err, user) {
            if (err) throw err;
            res.send(user).end()
        });

});


// Endpoint to login
router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.send(req.user);


    }
);

// Endpoint to get current user
router.get('/user', function (req, res) {
    res.send("User " + req.user);
});


// Endpoint to logout
router.get('/logout', function (req, res) {
    req.logout();
    res.send(null)
});

router.get('/all', function (req, res) {
    var user = req.user;
    if (req.isAuthenticated() && hasRole(user, "admin")) {
        User.find({}, function (err, result) {
            if (err) throw err;
            else res.status(200).send(result).end();
        })
    } else {
        res.status(401).end();
    }
});
hasRole = function (user, role) {
    return user.role === role;
};
module.exports = router;