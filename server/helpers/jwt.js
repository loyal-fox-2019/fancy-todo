const jwt = require('jsonwebtoken')

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
  },
  verifyToken(payload) {
    return jwt.verify(payload, process.env.JWT_SECRET)
  }
}