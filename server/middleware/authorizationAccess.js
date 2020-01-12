const Project = require('../model/Project')
const User = require('../model/User')

module.exports = (req,res,next)=>{

    console.log(`
        AUTHORIZATION ACCESS IS RUNNING
        ================================
    `);
    
    Project.findOne({
        _id : req.params.projectId
    })
    .then(result=>{
        if(!result)
          next({ status : 404, message: 'resource not found'})
        else
          {
              if(result.memberList.indexOf( req.decodedUser._id ) === -1)
                next({ status : 403, message: 'unAuthorized Access'})
              else
                {
                    console.log('ACCESS GRANTED');
                    next()
                }
          }
    })
    .catch(err=>{
        next(err)
    })
}