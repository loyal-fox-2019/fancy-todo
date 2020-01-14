const { verifyToken } = require('../helper/jwt')
const User = require('../model/User')

module.exports = (req,res,next)=>{
    console.log(`
        AUTHENTICATION IS RUNNING
        =========================
    `);
    

    const decodedId = verifyToken(req.headers.token)
    
    User.findOne({
        _id : decodedId
    })
    .then(result=>{
        if(result)
          {
            req.decodedUser = result
            next()
          }
        else
          {
            next({ status: 404, message: 'invalid token used'})
          }
    })
    .catch(err=>{
        next(err)
    })


}