import mongoose from "mongoose";

import crypt from "bcryptjs";
// User Schema
/**
 *
 * @type {mongoose.Schema}
 */
const UserSchema = mongoose.Schema({
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

const User  = mongoose.model('User', UserSchema,false);
/**
 *
 * @param newUser
 * @param callback
 */
const createUser = (newUser, callback) => {

	/** @namespace crypt.genSalt */
	crypt.genSalt(10, (err, salt) => {
		/** @namespace crypt.hash */
		crypt.hash(newUser.password, salt, (err, hash) => {
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
const getUserByUsername = (username, callback) => {
	const query = {username: username};
	User.findOne(query, callback);
};
/**
 *
 * @param id
 * @param callback
 */
const getUserById = (id, callback) => {
	User.findById(id, callback);
};
/**
 *
 * @param candidatePassword
 * @param hash
 * @param callback
 */
const comparePassword = (candidatePassword, hash, callback) => {
	/** @namespace crypt.compare */
	crypt.compare(candidatePassword, hash, (err, isMatch) => {
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
const hasRole = (user, role) => user.role === role;
export default {
	hasRole,
	comparePassword,
	createUser,
	getUserById,
	getUserByUsername,
	User

}

