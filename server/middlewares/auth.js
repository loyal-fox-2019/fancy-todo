const jwt = require('jsonwebtoken')
const Todo = require('../models/Todo')
const Project = require('../models/Project')

function authentication(req, res, next) {
   try { 
      if(!req.headers || !req.headers.token) throw {
         errorCode: 403,
         message: 'Need authentication'
      }

      jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
         if(err && err.name == 'JsonWebTokenError') throw {
            errorCode: 401,
            message: err.message
         }
         
         req.decoded = decoded
         next()
      })
   }
   catch (error) {
      next(error)
   }
}

async function authorization(req, res, next) {
   try {
      const todo = await Todo.findOne({_id: req.params.id})
      
      if(!todo) throw {
         errorCode: 400,
         message: 'Invalid todo id'
      }

      if(todo.user != req.decoded.userId) throw {
         errorCode: 401,
         message: 'You are not authorized to perform this action'
      }

      next()
   }
   catch (error) {
      next(error)
   }
}

function joinProjectAuthentication(req, res, next) {
   try {
      console.log(req.headers)
      if(!req.headers || !req.headers.project_token) throw {
         errorCode: 401,
         message: 'This action requires project authentication'
      }

      jwt.verify(req.headers.project_token, process.env.JWT_SECRET, (err, decoded) => {
         if(err && err.name == 'JsonWebTokenError') throw {
            errorCode: 401,
            message: err.message
         }
         
         if(req.decoded.email != decoded.email) throw {
            errorCode: 401,
            message: 'Your project token is invalid'
         }

         req.decoded.projectId = decoded.projectId
         next()
      })
   }
   catch (error) {
      next(error)
   }
}

async function projectOwnerAuthorization(req, res, next) {
   try {
      const project = await Project.findOne({_id: req.params.id})

      if(!project) throw {
         errorCode: 400,
         message: 'Invalid project id'
      }
   
      if(project.users[0] != req.decoded.userId) throw {
         errorCode: 401,
         message: 'You are not the owner of this project'
      }
   
      next()
   }
   catch (error) {
      next(error)
   }
}

// useful for when a user wants to add their todo into a project
async function projectAuthorization(req, res, next) {
   try {
      const project = await Project.findOne({_id: req.params.id})
      
      if(!project) throw {
         errorCode: 404,
         message: 'Project not found'
      }

      if(!project.users.includes(req.decoded.userId)) throw {
         errorCode: 401,
         message: 'You are not authorized to perform this action'
      }

      next()
   }
   catch (error) {
      next(error)
   }
}

module.exports = {
   authentication,
   authorization,
   joinProjectAuthentication,
   projectOwnerAuthorization,
   projectAuthorization
}