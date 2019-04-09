var mongoose = require('mongoose');
var crypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
    },
    role: {
        type: String,
        default: "user"
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	crypt.genSalt(10, function (err, salt) {
		crypt.hash(newUser.password, salt, function (err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	crypt.compare(candidatePassword, hash, function (err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
