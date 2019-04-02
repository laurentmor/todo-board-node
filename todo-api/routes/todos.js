var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

/* GET home page. */
router.get('/', function (req, res) {
    res.status().send("You're not getting anywhere, boyo with this api");
});

router.post('/create', function (req, res) {
    var user = req.user;
    var newTodo = new Todo({
        text: req.body.text,
        color: req.body.color,
        creationDate: req.body.creationDate,
        expirationDate: req.body.expirationDate,
        public: true


    });
    if (user) {
        newTodo.userId = user._id;
        newTodo.public = false;

    }

    Todo.create(newTodo, function (err, todo) {
        if (err) throw err;

        res.status(200).send(todo).end();
    });
});

router.get('/all', function (req, res) {
    Todo.getAll({}, function (result) {

        if (result) res.status(200).send(result).end();
        else res.status(404).end();
    });

});
router.delete("/delete/:id", function (req, res) {
    Todo.delete(res.params.id, function () {
        res.status(200).send("ok").end();
    })
});



module.exports = router;
