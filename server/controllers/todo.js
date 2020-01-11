const Todo = require('../models/todo')

class TodoController {
  static create (req, res, next) {
    const { name, description, due_date } = req.body,
      user = req.user._id
    Todo.create({ name, description, due_date, user })
      .then(todo => {
        res.send(todo)
      })
      .catch(next)
  }
  static all (req, res, next) {
    Todo.find()
      .populate('user', 'email -_id')
      .then(todos => {
        res.send(todos)
      })
      .catch(next)
  }
  static remove (req, res, next) {
    const { id } = req.params.id
    Todo.deleteOne({ id })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
  static done (req, res, next) {
    const { id } = req.params.id
    Todo.updateOne({ id }, { status: 'done'})
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}

module.exports = TodoController