// @ts-ignore
import mongoose from 'mongoose';
import joigoose from 'joigoose';

import joi from 'joi';

const Jg = joigoose(mongoose);
// User Schema

/**
 *
 * @type {mongoose.Schema}
 */
const sch = joi.object({
    username: joi.string()
        .trim()
        .min(5)
        .max(10)
        .required(),
    password: joi.string()
        .trim()
        .min(5)
        .max(10)
        .required(),
    email: joi.string()
        .trim()
        .email()
        .min(5)
        .max(10)
        .optional(),
    role: joi.string()
        .trim()
        .valid('user', 'admin')
        .required()
});
const UserSchema = new mongoose.Schema({
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
let User
try {
    User = mongoose.model('User')
} catch (error) {
    User = mongoose.model('User',mongooseUserSchema)
}
const validateUser = (user, callback, next) => {
    let result = joi.valid(user, sch);
    console.log(sch.validate({}).error.details[0].message);
};
module.exports.autoload=false;
export default {

    validateUser,
    User,

};
