var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

/* GET home page. */
router.get('/', function (req, res) {
    res.status().send("You're not getting anywhere, boyo with this api");
});

function createValidTodoFromRequest(req) {
    var newTodo = new Todo({
        text: req.body.text,
        color: req.body.color

    });
    var creationDate = req.body.creationDate;
    if (creationDate) newTodo.creationDate = creationDate;
    var expirationDate = req.body.expirationDate;
    if (expirationDate) newTodo.creationDate = expirationDate;
    var user = req.session.user;
    if (user) {
        newTodo.userId = user._id;
        newTodo.public = false;

    }
    return newTodo;

}

router.post('/create', function (req, res) {

    var validTodo = createValidTodoFromRequest(req);
    log.info(validTodo);
    Todo.create(validTodo, function (error) {
        if (!error) res.status(200).send(validTodo).end();
        else res.status(500).send({}).end();
    })

});

router.get('/all', function (req, res) {
    Todo.getAll({}, function (result) {

        if (result) res.status(200).send(result).end();
        else res.status(404).end();
    });

});
router.delete("/delete/:id", function (req, res) {
    Todo.delete(req.params.id, function () {
        res.status(200).send("ok").end();
    })
});
router.put("/update/:id", function (req, res) {
    Todo.update(req.params.id, req.body, function () {
        res.send("Ok");
    })
});


module.exports = router;
