const jwt = require('jsonwebtoken')

function genToken(payload) {
    return jwt.sign(payload, process.env.JWT)
}

function verify(token) {
    return jwt.verify(token, process.env.JWT)
}

module.exports = {
    genToken,
    verify
}