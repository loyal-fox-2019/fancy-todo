const jwt = require('jsonwebtoken')

function generateToken(payload){
    const token = jwt.sign(payload, process.env.JWT_TOKEN)
    return token
}

function verifyToken(token){
    const decoded = jwt.verify(token,process.env.JWT_TOKEN)
    return decoded
}

module.exports = {
    generateToken,verifyToken
}