'use strict';

const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
    generateToken,
    verifyToken
}