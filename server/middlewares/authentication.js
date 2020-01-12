const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    if(req.headers.hasOwnProperty('token')){
        let token = req.headers.token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.loggedInUser = payload

            next()
        }catch(e){
            res.status(403).json({
                error: e
            })
        }
    }else{
        res.status(404).json({
            message: 'Not found'
        })
    }
}