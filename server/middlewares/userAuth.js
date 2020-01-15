'use strict'

const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')


module.exports = {
    authenticate : (req, res, next) => {
        try {    
            const user = verifyToken(req.headers.token)        
            User.findById(user.id)
            .then (user => {
                if (user) {
                    req.user = user
                    next()
                } else {
                    next({
                        message : 'user not Found',
                        status : 404
                    })
                }
            })     
        } 
        catch(err) {  
            next(err)    
        }
    },
    
}