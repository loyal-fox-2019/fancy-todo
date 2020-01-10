const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user')

function authenticate(req, res, next) {
  try {
    req.loggedUser = decodeToken(req.headers.token)
    User.findById(req.loggedUser.id)
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
}

module.exports = { authenticate, authorize }
