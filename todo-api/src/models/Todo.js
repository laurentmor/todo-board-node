import db from "mongoose";
import logger from "../config/logger-config";

let monthFromNow = () => {
    let future = new Date();
    future.setDate(future.getDate() + 30);
    return future;
};
const TodoSchema = new db.Schema({
    text: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date,
        default: monthFromNow
    },
    userId: {
        type: String
    },
    public: {
        type: Boolean,
        default: true
    }

});


const Todo = module.exports = db.model('Todo', TodoSchema);


module.exports.create = function (newTodo, callback) {
    logger.info(newTodo);
    newTodo.save(callback);


};

module.exports.getAll = function (filter, callback) {
    Todo.find(filter, function (err, todo) {
        callback(todo);
    });
};

module.exports.update = function (id, modifications, callback) {
    var conditions = {_id: id};
    var options = {new: true};


    Todo.findOneAndUpdate(conditions, modifications, options, function (err, updatedTodo) {
        callback(updatedTodo);
    })

};
const deleteOne = (id, callback) => {
    Todo.findOneAndDelete({_id: id}, function (err, deleted) {
        callback(deleted);
    })

};
export {
    deleteOne
}








