const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    let token = req.headers.token
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload)
        req.loggedIn = payload
        // bisa langsung cek user dari sini, gausah cek ketersediaan token
        next()
    }catch(e){
        res.status(404).json({
            message: 'Not found'
        })
        res.status(403).json({
            message: 'not authorized',
            error: e
        })
    }
}