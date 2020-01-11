module.exports = (err, req, res, next) => {
    let statusCode = 404
    let message = 'Data not found!'
    
    if(err.name === 'ValidationError'){
        statusCode = 500
        message = `Internal server error`
    }

    res.status(statusCode).json({
        message: message,
        error: err
    })
}