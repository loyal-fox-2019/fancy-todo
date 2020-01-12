'use strict';

const jwt = require('../helper/jwt');

function authentication(req, res, next) {
    const payload = jwt.decodeToken(req.headers.usertoken);
    if(!payload) {
        res.status(400).json({
            message: "BadRequest"
        })
    } else {
        req.headers.userId = payload.data;
        next()
    }
}

module.exports = authentication