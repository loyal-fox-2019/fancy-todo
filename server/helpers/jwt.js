'use strict'

const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

const generateToken = (payload) => jwt.sign(payload, jwt_secret)
const decodeToken = (token) => {
    try {
        return jwt.verify(token, jwt_secret)
    } catch (error) {
        
    }
}

module.exports = {
    generateToken,
    decodeToken
}