import passport from "passport";


import logger from "./logger-config";



import User from "../models/User";

//endregion
//region using google
import {Strategy as GoogleStrategy} from "passport-google-oauth2";


//let logger=new Logger();
logger.info("*** configuring passport ***");


//region  Using LocalStrategy with passport

const LocalStrategy = require('passport-local').Strategy;

 passport.use('local', new LocalStrategy({usernameField: 'username', passwordField: 'password'},
    (username, password, done) => {
        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }
));
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
//logger.info("google auth");
 passport.use(
    new GoogleStrategy(
        {
            clientID: "GOOGLE_CLIENT_ID",
            clientSecret: "GOOGLE_CLIENT_SECRET",
            callbackURL: "http://www.example.com/auth/google/callback"
        },
        function(token, tokenSecret, profile, done) {
            User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
        }
    )
);/*
passport.use('google',new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/user/profile"
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
    }
));*/


//endregion

 passport.serializeUser((user, done) => {
    logger.info('serializeUser');
     done(null, user.id);
});


 passport.deserializeUser((id, done) => {
     logger.info('deserializeUser');
     User.getUserById(id, (err, user) => {
        done(err, user);
    });
});


export default passport;