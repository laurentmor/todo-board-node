var db = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = db.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    mail: {
        type: String
    },
    name: {
        type: String
    }
});

var User;
try {
     User = module.exports = db.model('User');

} catch (error) {
     User = module.exports = db.model('User', UserSchema);

}



module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function (username, callback) {
    var query = {username: "lm"};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.test=function(callback){
    var con= db.connection;
    console.log(con==undefined);
    con.once('open', function() {
        console.log("In open");
    });
    callback.status(200).send({}).end();
};
module.exports.getAllUsers=function(callback){

    User.find({}, function(err, users) {
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        callback.status(200).send(userMap).end();

}); };

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};