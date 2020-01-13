function errorHandler (err,req,res,next) {
    if(err.name && err.message){
        res.status(400).json({ name:err.name,message:err.message })
    }else{
        res.status(500).json({ name:500,message:'internal server error' })
    }
}

module.exports = errorHandler