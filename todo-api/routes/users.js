var express  = require('express');
var router      = express.Router();


var passport = require('passport');
var User = require('../models/user');





router.get('/',function (req,res) {
 res.send("No, no!");
});

// Register User
router.post('/register', function(req, res){
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2){
    var newUser = new User({
      name: req.body.name,
      mail: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      res.send(user).end()
    });
  } else{
    res.status(500).send("{erros: \"Passwords don't match\"}").end()
  }
});


// Using LocalStrategy with passport
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'Unknown User'});
        }

        User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        });
      });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


// Endpoint to login
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.send(req.user);
    }
);

// Endpoint to get current user
router.get('/user', function(req, res){
  res.send(req.user);
});

router.get('/all', function (req, res) {

  User.getAllUser({}, function (result) {
    if(!req.user){
      res.status(403).send().end();
    }
    else{
      if (result) res.status(200).send(result).end();
      else res.status(404).end();
    }

  });

});


// Endpoint to logout
router.get('/logout', function(req, res){
  req.logout();
  res.send(null)
});
module.exports = router;
