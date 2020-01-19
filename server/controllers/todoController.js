const Todo = require('../models/Todo')

class todoController{
  static showNonProjectTodo(req, res, next){
    Todo
      .find({owner: req.userData.id, project: null})
      .populate('owner', 'username')
      .then((todos) => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static showProjectTodo(req, res, next){
    Todo
      .find({project: req.params.projectId})
      .populate('project')
      .populate('owner', 'username')
      .then((todos) => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { name, description, due_date, status, project } = req.body
    if (!due_date){
      due_date = undefined
    }
    Todo
      .create({
        name,
        description,
        status,
        due_date,
        owner: req.userData.id,
        project
      })
      .then((todo) => {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static edit(req, res, next){
    const { name, description, due_date, status} = req.body
    const updateObj = { name, description, due_date, status }
    const options = {omitUndefined: true, new: true}
    Todo
      .findByIdAndUpdate(req.params.id, updateObj, options)
      .then((todo) => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static remove(req, res, next){
    Todo
      .findByIdAndDelete(req.params.id)
      .then((todo) => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

}

module.exports = todoController