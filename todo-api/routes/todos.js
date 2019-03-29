var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

/* GET home page. */
router.get('/', function(req, res,cb) {
res.send("You're not getting anywhere, boyo with this api");
});

router.post('/create',function (req, res) {
   var user=req.user;
   var newTodo=new Todo({
       text:req.body.text,
       color:req.body.color,
       creationDate:req.body.creationDate,
       expirationDate:req.body.expirationDate,
       public:true


   });
   if(user){
        newTodo.userId=user._id;
        newTodo.public=false;

   }

   Todo.createTodo(newTodo,function (err,todo) {
       if(err) throw err;

       res.status(200).send(todo).end();
   });
});

module.exports = router;
