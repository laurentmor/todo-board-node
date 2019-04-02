var db = require('mongoose');
var Todo;
var TodoSchema = db.Schema({
    text:{
        type:String
    },
    color:{
        type:String
    },
    creationDate:{
        type:Date
    },
    expirationDate:{
        type:Date
    },
    userId:{
        type:String
    },
    public:{
        type:Boolean
    }
});

try {
    Todo = module.exports = db.model('Todo');

} catch (error) {
    Todo = module.exports = db.model('Todo', TodoSchema);
}

module.exports.create = function (newTodo, callback) {
         newTodo.save(callback);


};

module.exports.getAll = function (filter, callback) {
     Todo.find(filter,function (err, todo) {
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
module.exports.delete = function (id, callback) {
    Todo.findOneAndDelete({_id: id}, function (err, deleted) {
        callback(deleted);
    })

};









