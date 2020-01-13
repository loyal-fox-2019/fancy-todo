const { verifyToken }  = require('../helpers/jwt')
const User = require('../models/user')

function authentication (req,res,next) {
    if( req.headers.token ) {

        let decoded =  verifyToken( req.headers.token )

        if( decoded.id ) {
            User.findOne({ _id:decoded.id })
                .then(user=> {
                    if( user ) {
                        req.decoded = decoded
                        next()   
                    }
                    else throw { name:401,message:'You are not authenticated.' }
                })
                .catch(next)
        } else {
            next({name:401,message:'You are not authenticated.'})
        }
    } else {
        next({name:401,message:'You are not authenticated.'})
    }
}

module.exports = authentication