const { generateJWT, verifyJWT } = require('../helpers/jwt')

function authenticate(req,res,next) {
    if(req.headers.hasOwnProperty('token')){
        try{
            const payload = verifyJWT(req.headers.token)
            req.user = payload
            next()
        }
        catch(err){
            res.status(400).json({
                message: 'authentication fail'
            })
        }
    }
    else {
        res.status(400).json({
            message: 'please login first'
        })
    }
}

module.exports = authenticate