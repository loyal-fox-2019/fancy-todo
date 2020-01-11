module.exports = function (err, req, res, next) {
    let status = 500
    let msg = err
    console.log(err)
    if (err.name === 'ValidationError') {
        status = 422
        msg = err.message
    }else if (err.name === 'CastError') {
        status = 404
        msg = 'id not found'
    }   
    res.status(status).json({
        message: msg
    })
}