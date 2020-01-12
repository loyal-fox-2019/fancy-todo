'use strict'

const jwt = require('../helpers/jwt')
const userModel = require('../models/user')

function authentication(req, res, next) {
    const decode = jwt.decodeToken(req.headers.access_token)
    req.decode = decode
    // console.log(req.decode);
    if (req.decode) {
        userModel.findById(req.decode.userID)
            .then(user => {
                if (!user) {
                    next({
                        code: 400,
                        name: `AccessTokenError`,
                        message: `Invalid Access Token`
                    })
                }
                else{
                    next()
                }
            })
            .catch(err => {
                next({
                    code: 400,
                    name: `AccessTokenError`,
                    message: `Invalid Access Token`
                })
            })
        
    }
    else (
        next({
            code: 400,
            name: `AccessTokenError`,
            message: `Invalid Access Token`
        })
    )
}

module.exports = authentication