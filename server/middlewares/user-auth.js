const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  if (!req.headers.token) {
    return next({ name: 'BadRequest', message: 'Token is missing' })
  }

  try {
    const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    User.findOne({ _id: payload.id })
      .then(user => {
        if (!user) throw { name: 'NotFound', message: 'Bad token' }
        req.payload = payload
        next()
      })
      .catch(next)
  } catch (err) {
    next(err)
  }
}
