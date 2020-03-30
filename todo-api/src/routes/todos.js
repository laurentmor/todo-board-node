import  express from 'express';
const router = express.Router();
import Todo from "../models/Todo";

/* GET home page. */
router.get('/', (req, res) => {
    res.status().send("You're not getting anywhere, boyo with this api");
});

const createValidTodoFromRequest = req => {
    const newTodo = new Todo({
        text: req.body.text,
        color: req.body.color

    });
    const creationDate = req.body.creationDate;
    if (creationDate) newTodo.creationDate = creationDate;
    const expirationDate = req.body.expirationDate;
    if (expirationDate) newTodo.creationDate = expirationDate;
    const user = req.session.user;
    if (user) {
        newTodo.userId = user._id;
        newTodo.public = false;

    }
    return newTodo;

};

router.post('/create', (req, res) => {

    const validTodo = createValidTodoFromRequest(req);
    log.info(validTodo);
    // noinspection JSUnusedLocalSymbols
    Todo.create(validTodo, error => {


    }).then(() => {
        if (!error) res.status(200).send(validTodo).end();
        else res.status(500).send(error).end();

    })

});

router.get('/all', (req, res) => {
    Todo.getAll({}, result => {

        if (result) res.status(200).send(result).end();
        else res.status(404).end();
    });

});
router.delete("/delete/:id", (req, res) => {
    Todo.delete(req.params.id, () => {
        res.status(200).send("ok").end();
    })
});
router.put("/update/:id", (req, res) => {
    Todo.update(req.params.id, req.body, () => {
        res.send("Ok");
    })
});


export default router;
