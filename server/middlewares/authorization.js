'use strict'

const User = require('../models/users')

module.exports = function (res, req, next) {

    User.findById({id: req.decode.id})
    .then(result => {
        if(!result){
            throw {status: 404, message: 'not found'}
        }
        else {
            next()
        }
    })
    .catch(next)
}