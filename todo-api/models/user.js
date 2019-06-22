var mongoose = require('mongoose'),
	crypt = require('bcryptjs');

// User Schema
/**
 *
 * @type {mongoose.Schema}
 */
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},

	email: {
		type: String
	},
	name: {
		type: String
	},
	role: {
		type: String

	}
});

var User = module["exports"] = mongoose.model('User', UserSchema);
/**
 *
 * @param newUser
 * @param callback
 */
module["exports"].createUser = function (newUser, callback) {
	/** @namespace crypt.genSalt */
	crypt.genSalt(10, function (err, salt) {
		/** @namespace crypt.hash */
		crypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};
/**
 *
 * @param username
 * @param callback
 */
module["exports"].getUserByUsername = function (username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
};
/**
 *
 * @param id
 * @param callback
 */
module["exports"].getUserById = function (id, callback) {
	User.findById(id, callback);
};
/**
 *
 * @param candidatePassword
 * @param hash
 * @param callback
 */
module["exports"].comparePassword = function (candidatePassword, hash, callback) {
	/** @namespace crypt.compare */
	crypt.compare(candidatePassword, hash, function (err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
/**
 *
 * @param user
 * @param role
 * @returns {boolean}
 */
module["exports"].hasRole = function (user, role) {
    return user.role === role;
};
