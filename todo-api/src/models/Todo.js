import db from "mongoose";


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


module.exports.saveNew = function (data) {
    return new Promise((resolve, reject) => {
        data.todo.save((error, savedData) => {
            if (error) {
                reject("Error during save" + error);
                data.error = error;
            } else {
                data.response.status(203).end();
                resolve(savedData);
            }
        });
    });


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
const deleteOne = (id, callback) => {
    Todo.findOneAndDelete({_id: id}, function (err, deleted) {
        callback(deleted);
    })

};
export {
    deleteOne
}








