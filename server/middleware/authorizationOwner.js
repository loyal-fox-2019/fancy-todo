module.exports = function (modelType) {
    return function(req,res,next){
        console.log(`
            AUTHORIZATION OWNER IS RUNNING - ${modelType}  
            ============================================
        `);
        let modelQuery = require(`../model/${modelType}`)


        const key = Object.keys(req.params)
        modelQuery.findOne({
            _id: req.params[key]
        })
        .then(result=>{
            if(!result)
              next({ status : 404, message: 'resource not found'})
            else
              {
                if( String(result.createdBy) === String(req.decodedUser._id))
                    next()
                else
                  next({ status : 403, message:'unAuthorized Access'})
              }
        })
        .catch(err=>{
            next(err)
        })
    }
}