import express from 'express'
import Todo from '../models/Todo'
import logger from '../config/logger-config'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.status(403).json("You're not getting anywhere, boyo with this api").end()
})

/**
 *
 * @param req
 * @param res
 * @returns {*}
 */
const createValidTodoFromRequest = (req, res) => {
  return new Promise((resolve, reject) => {
    const lText = req.body.text
    const lColor = req.body.color
    if (lText === '' || lText === undefined) {
      reject({ error: 'Todo text required', response: res })
    } else if (lColor === '' || lColor === undefined) {
      reject({ error: 'Todo color required', response: res })
    } else {
      const newTodo = new Todo({
        text: lText,
        color: lColor

      })
      const expirationDate = req.body.expirationDate
      if (expirationDate) newTodo.creationDate = expirationDate
      const user = req.session.user
      if (user) {
        newTodo.userId = user._id
        newTodo.public = false
      }

      resolve({ todo: newTodo, response: res })
    }
  })
}

const saveSuccess = (data) => {
  logger.info('data saved ')
  data.message = 'saved'
  logger.info(data.response)
}
const saveFailure = (data) => {
  data.mesage = 'not saved'
  logger.info(data)
}
/**
 *
 * @param data
 */
const createSuccess = (data) => {
  logger.info('Promise resolved ' + data.todo)
  Todo.saveNew(data).then(saveSuccess, saveFailure)
}

/**
 *
 * @param data
 */
const createFailure = (data) => {
  logger.info('Promise failed ' + data.error)
  data.response.status(400).send('not ok').end()
}
router.post('/create', (req, res) => {
  const promise = createValidTodoFromRequest(req, res)
  logger.info(promise.todo)
  promise.then(createSuccess, createFailure)

  res.end()

  // logger.info(validTodo);
})

router.get('/all', (req, res) => {
  Todo.getAll({}, result => {
    if (result) res.status(200).send(result).end()
    else res.status(404).end()
  })
})
/**
 *
 */
router.delete('/deleteOne/:id', (req, res) => {
  Todo.deleteOne(req.params.id, () => {
    res.status(200).send('ok').end()
  })
})
router.put('/update/:id', (req, res) => {
  Todo.update(req.params.id, req.body, () => {
    res.send('Ok')
  })
})

export default router
