module.exports = (err,req,res,next)=>{
    let status = err.status || 500
    let message = err.message || 'INTERNAL SERVER ERROR'

    switch (err.name) {
        case 'ValidationError':
            status = 406
            break;

        case 'MongoError':
            break;

        case 'SongKickError':
            status = 400
            break;

        default:
            break;
    }

    res.status(status).json({
        status,
        message
    })
}