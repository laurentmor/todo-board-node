import db from "mongoose";

let monthFromNow = function () {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    return future;
};
const TodoSchema = new db.Schema({
    text: {
        type: String
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


let Todo = module.exports = db.model('Todo', TodoSchema);


module.exports.create = function (newTodo, callback) {
    newTodo.save(callback);


};

module.exports.getAll = function (filter, callback) {
    Todo.find(filter, function (err, todo) {
        callback(todo);
    });
};

module.exports.update = function (id, modifications, callback) {
    let conditions = {_id: id};
    let options = {new: true};


    Todo.findOneAndUpdate(conditions, modifications, options, function (err, updatedTodo) {
        callback(updatedTodo);
    })

};
module.exports.delete = function (id, callback) {
    Todo.findOneAndDelete({_id: id}, function (err, deleted) {
        callback(deleted);
    })

};









