const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const randomPass = require('../helpers/randomPass')

class UserController {
  static register(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res
          .status(201)
          .json({ token, username: user.username, email: user.email })
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
        res.json({ token, username: user.username, email: user.email })
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

  static googleLogin(req, res, next) {
    let payload = null

    if (!req.body.googleToken) {
      return next({ name: 'BadRequest', message: 'Google token is required' })
    }

    client
      .verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if (user) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
          res.json({ token, username: payload.name, email: payload.email })
        } else {
          return User.create({
            username: payload.name,
            email: payload.email,
            password: randomPass,
          })
        }
      })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, username: payload.name, email: payload.email })
      })
      .catch(next)
  }
}

module.exports = UserController
