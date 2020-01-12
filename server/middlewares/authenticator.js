const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    console.log(req.headers.token)
    try{
        let username = jwt.verify(req.headers.token,process.env.JWTSECRET)
        req.username = username
        next()
    } catch(err) {
        next(err)
    }
};
