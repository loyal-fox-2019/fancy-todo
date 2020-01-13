'use strict'
'use strict'

module.exports = function (req, res, next) {
    try {
        const jwt = require('jsonwebtoken');
        const userToken = req.headers.token 
        const decode = jwt.verify(userToken, process.env.KEY_TOKEN)
       
        console.log(decode)
        req.decode = decode
        next()
    }
    catch(err) {
        res.status(403).json({message: 'forbidden'})
    }
}