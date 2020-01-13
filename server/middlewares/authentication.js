const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if(!req.headers.hasOwnProperty('token')){
        res.status(400).json({'message':'Please login to view this page!'})
    }else{
        try {
            require('dotenv').config()
            req.loggedUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)

            next()
        }
        catch(e){
            res.status(400).json('Invalid token')
        }
    }
}