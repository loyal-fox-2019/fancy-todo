function errorHandler(err, req, res, next){
  let errors = []
  let errorCode = err.errorCode || 500
  let message = err.message || 'Internal Server Error'
  if(err.errors){
    errorCode = 400
    message = ''
    errors = Object.keys(err.errors)
    errors.forEach((e) => {
      message += err.errors[e].message + '\n'
    })
  }
  if (!errorCode || !message){
    errorCode = 500
    message = 'Internal Server Error'
  }
  res.status(errorCode).json({message})
}

module.exports = errorHandler