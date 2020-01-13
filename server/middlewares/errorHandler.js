const Project = require("../models/Project")

function errorHandler(err, req, res, next) {
   
   console.log(Object.keys(err))

   if(err.name == 'CastError' && err.message.includes('Project')) {
      err.errorCode = 400,
      err.message = 'Invalid project id'
   }

   let errorCode = 500
   let message = 'Internal server error'

   if(err.errorCode) errorCode = err.errorCode
   if(err.message) message = err.message

   res.status(errorCode).json(message)
}

module.exports = errorHandler