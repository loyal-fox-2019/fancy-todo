const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req,res,next)=>{
    // console.log('=======masuk satu')
    // console.log(req.headers)
    if(req.headers.hasOwnProperty('token')){
        // console.log('=================masuk dua')
        const decoded = verifyToken(req.headers.token)
        req.body.payload = decoded
        next()
    }else{
        throw new Error('User not logged in')
    }
}