'use strict';

const jwt = require('jsonwebtoken');

class Token {
    static generateToken(id) {
        return jwt.sign({data: id}, process.env.JWT_SECRET);
    }
}

module.exports = Token;