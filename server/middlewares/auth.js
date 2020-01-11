const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user'),
  Todo = require('../models/todo'),
  Project = require('../models/project')

function authenticate(req, res, next) {
  try {
    req.user = decodeToken(req.headers.token)
    User.findById(req.user._id)
      .then(user => {
        if(!user){
          next({status: 401, message: 'Authentication failed'})
        } else {
          next()
        }
      })
  } catch (error) {
    next(error)
  }
}

function authorize(req, res, next) {
  try{
    Todo.findById(req.params.id)
      .then(todo => {
        if(!todo) {
          next({status: 404, message: 'id not found'})
        } else if(todo.user == req.user._id){
          console.log('AYOO NEXT');
          next()
        } else {
          Project.findOne({ id: todo.project })
            .then(project => {
              if(!project) {
                next({status: 401, message: 'Authorization failed'})
              } else if(project.author == req.user._id){
                next()
              } else if(project.members.includes(req.user._id)){
                next()
              } else {
                next({status: 401, message: 'Authorization failed'})
              }
            })
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

function authorizeProject(req, res, next) {
  try{
    Project.findById(req.params.id)
      .then(project => {
        if(!project) {
          next({status: 404, message: 'id not found'})
        } else if(project.author == req.user._id){
          next()
        } else {
          next({status: 401, message: 'Authorization failed'})
        }
      })
  }
  catch (err) {
    next(err)
  }
}

module.exports = { authenticate, authorize, authorizeProject }
