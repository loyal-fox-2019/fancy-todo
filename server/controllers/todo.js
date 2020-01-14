const Todo = require('../models/todo')

class TodoController {
  static create (req, res, next) {
    const { name, description } = req.body,
      user = req.user._id
    let due_date = Number(req.body.due_date)
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
    const id = req.params.id
    Todo.deleteOne({ _id: id })
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
  static done (req, res, next) {
    const id = req.params.id
    Todo.updateOne({ _id: id }, { status: 'done'})
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
}

module.exports = TodoController