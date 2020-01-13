'use strict'
const jwt = require('jsonwebtoken')

module.exports = {
    generateToken : (user) => {
        let encoded = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        return encoded
    },
    verifyToken : (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}