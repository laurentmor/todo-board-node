import   mongoose from 'mongoose';
import joigoose from 'joigoose';


import  joi from 'joi'

import crypt from 'bcryptjs';


const Jg = joigoose(mongoose);
// User Schema


/**
 *
 * @type {mongoose.Schema}
 */
const sch=joi.object({
  username: joi.string().trim().min(5).max(10).required(),
  password: joi.string().trim().min(5).max(10).required(),
  email: joi.string().trim().email().min(5).max(10).optional(),
  role: joi.string().trim().valid('user','admin').required()
});
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },
  name: {
    type: String,
  },
  role: {
    type: String,

  },
});

const mongooseUserSchema = new mongoose.Schema(
  Jg.convert(sch, {})
);
const User = mongoose.model('User', mongooseUserSchema, false);
const validateUser=(user,callback,next)=>{
  let result=joi.valid(user,sch);
  console.log(sch.validate({}).error.details[0].message);
}
/**
 *
 * @param newUser
 * @param callback
 */
const createUser = (newUser, callback) => {
  /** @namespace crypt.genSalt */
  crypt.genSalt(10, (err, salt) => {
    /** @namespace crypt.hash */
    crypt.hash(newUser.password, salt, (error, hash) => {
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
  const query = { username };
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
    if (err) throw err;
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
  validateUser,
  User,

};
