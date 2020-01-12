module.exports = (err,req,res,next)=>{
    console.log(`
        ERROR HAPPENED - LOG FROM ERROR HANDLER
        =======================================
    `)
    console.log(err)
    
    let status = err.status || 500
    let message = err.message || 'INTERNAL SERVER ERROR'


    switch (err.name) {
        case 'ValidationError':
            status = 406
            break;
        
        case 'MongoError':
            status = 406
            message = ` ${Object.keys(err.keyPattern)} has already been used`
            break;

        default:
            break;
    }

    res.status(status).json(message)
}