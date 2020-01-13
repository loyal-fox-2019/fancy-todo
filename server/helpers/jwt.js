const jwt = require('jsonwebtoken')

function generateJWT(payload){
    let token = jwt.sign(payload, process.env.JWT_KEY)
    return token
}

function verifyJWT(token){
    let payload = jwt.verify(token, process.env.JWT_KEY)
    return payload
}

module.exports = {
    generateJWT,
    verifyJWT
}