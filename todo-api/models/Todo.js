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

module.exports.createTodo=function(newTodo,callback){
         newTodo.save(callback);


};

module.exports.getAllTodo=function (filter,callback) {
     Todo.find(filter,function (err, todo) {
         callback(todo);
     });
};











