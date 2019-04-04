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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use('/users', UserRouter);
passportConfig.setup();

/*

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: "145658462755484",
    clientSecret: "ed6555b4e3c8b42764659a2b9c861825",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) return done(null, user);
      else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // set all of the facebook information in our user model
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name  = profile.displayName;
        if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
          newUser.facebook.email = profile.emails[0].value;

        // save our user to the database
        newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
        });
      }
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  }
);


const CanCan = require('cancan');
const cancan = new CanCan();
const {allow, can} = cancan;

allow(User, ['view', 'edit'], Post, (user, post) => post.ownerId === user.id);

app.get("/posts/:id", function(req, res){
  Post.find({}, function(err, all) {
    console.log(all)
  })
  Post.findById(req.params.id, function(err, post){
    if (can(req.user, 'view', post)) {
      res.send(JSON.stringify(post))
    }else{
      res.status(403).send("{errors: \"Unauthorized to view this post\"}").end()
    }
  });
});



// Just for testing as we don't have an interface to add posts
app.get("/createDummies", function(req, res){
  var newPost1 = new Post({
    title: "Dimmie1",
    ownerId: req.user.id,
    body: "Dummie body for post"
  });
  newPost1.save()

  var newPost2 = new Post({
    title: "Dimmie2",
    ownerId: req.user.id,
    body: "Dummie body for post"
  });
  newPost2.save()

  res.send(JSON.stringify([newPost1, newPost2]))
})
*/

// noinspection BadExpressionStatementJS
//app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.listen(port, console.log('Auth API listening on port ' + port));