const User = require('../models/user'),
  { compare } = require('../helpers/bcrypt'),
  { generateToken } = require('../helpers/jwt'),
  Todo = require('../models/todo'),
  Project = require('../models/project')

class UserController {
  static all (req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
  }
  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({email})
      .then(user => {
        if(!user){
          next({status: 400, message: 'invalid email or password'})
        } else if(!compare(password, user.password)){
          next({status: 400, message: 'invalid password or email'})
        } else {
          res.status(200).json({token: generateToken({_id: user._id}), username: user.username})
        }
      })
      .catch(next)
  }
  static register (req, res, next) {
    const { username, email, password } = req.body
    User.create({
      email,
      password
    })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }
  static getTodo (req, res, next) {
    const id = req.user._id
    Todo.find({user: id})
      .then(todos => {
        res.send(todos)
      })
      .catch(next)
  }
  static getProject (req, res, next) {
    const id = req.user._id
    Project.find({$or: [{members: id}, {author: id}]})
      .then(projects => {
        res.send(projects)
      })
      .catch(next)
  }
}

module.exports = UserController
