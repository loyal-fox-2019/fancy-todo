const jwt = require('jsonwebtoken')

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
  },
  verifyToken(payload) {
    return jwt.verify(payload, process.env.JWT_SECRET)
  }
}