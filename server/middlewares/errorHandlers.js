'use strict'

module.exports = (err, req, res, next) => {
    console.log(err.name)
    console.log(err.message)

    let status, message

    switch (err.name) {
        case "ValidationError":
            status = 401
            message = err.message
            break;
            
        case "NotFound":
            status = 404
            message = err.message
            break;

        default:
            status = err.status || 500;
            message = err.message || 'internal server error'
    }

    res.status(status).json({message})
}