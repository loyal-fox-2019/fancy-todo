const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

class UserController {
  static register(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.status(201).json({ token, username: user.username })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const errors = []

    if (!req.body.email) errors.push('Email is required')
    if (!req.body.password) errors.push('Password is required')

    if (errors.length > 0) return next({ name: 'BadRequest', message: errors })

    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user)
          throw { name: 'NotFound', message: 'Email or email is wrong' }
        if (!bcryptjs.compareSync(req.body.password, user.password)) {
          throw { name: 'NotFound', message: 'Email or password is wrong' }
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, username: user.username })
      })
      .catch(next)
  }

  static getUserTodos(req, res, next) {
    User.findOne({ _id: req.payload.id })
      .then(user => {
        res.json({ todos: user.todos })
      })
      .catch(next)
  }

  static createTodo(req, res, next) {
    let userFound = null

    User.findOne({ _id: req.payload.id })
      .then(user => {
        userFound = user
        userFound.todos.push({
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
        })

        return userFound.todos[userFound.todos.length - 1].validate()
      })
      .then(() => {
        userFound.save({ validateBeforeSave: false })
      })
      .then(user => {
        res.status(201).json({ message: 'Todo created' })
      })
      .catch(next)
  }

  static editTodo(req, res, next) {
    let userFound = null

    User.findOne({ _id: req.payload.id })
      .then(user => {
        userFound = user
        const todo = userFound.todos.id(req.params.todoId)

        if (!todo) throw { name: 'NotFound', message: 'Todo not found' }

        todo.title = req.body.title || todo.title
        todo.description = req.body.description || todo.description
        todo.dueDate = req.body.dueDate || todo.dueDate
        todo.status = req.body.status || todo.status

        return todo.validate()
      })
      .then(() => {
        userFound.save({ validateBeforeSave: false })
      })
      .then(user => {
        res.json({ message: 'Todo edited' })
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    User.findOne({ _id: req.payload.id })
      .then(user => {
        const todo = user.todos.id(req.params.todoId)

        if (!todo) throw { name: 'NotFound', message: 'Todo not found' }

        todo.remove()

        return user.save({ validateBeforeSave: false })
      })
      .then(user => {
        res.json({ message: 'Todo deleted' })
      })
      .catch(next)
  }

  static getAllUsers(req, res, next) {
    User.find()
      .then(users => {
        res.json(users)
      })
      .catch(next)
  }
}

module.exports = UserController
