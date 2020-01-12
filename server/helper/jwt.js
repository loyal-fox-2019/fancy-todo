'use strict';

const jwt = require('jsonwebtoken');

class Token {
    static generateToken(id) {
        return jwt.sign({data: id}, process.env.JWT_SECRET);
    }

    static decodeToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = Token;