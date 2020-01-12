const Todo = require('../models/Todo')

module.exports = {
  async authorizeTodo(req, res, next) {
    try {
      const id = req.params.id
      let todo = await Todo.findById(id)
      if (todo) {
        if (todo.owner == req.decodedId) next()
        else next({status: 401, message: 'You are not authorized!'})
      } else {
        next({status: 404, message: 'Todo is not found!'})
      }
    } catch (error) {
      next(error)
    }
  }
}