const jwt = require('jsonwebtoken')

function generateToken(payload) {
    let token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

module.exports = generateToken