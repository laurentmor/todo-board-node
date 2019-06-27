const passport = require('passport');
const User = require('../models/User');
module["exports"].setup = () => {

    log.info("*** configuring passport ***");


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
    //endregion
    //region using google

    //endregion

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.getUserById(id, (err, user) => {
            done(err, user);
        });
    });

};