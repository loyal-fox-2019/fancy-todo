"use strict"

module.exports = function (err, req, res, next) {
    console.log(err)

    if (err.name === "ValidationError") {
        res.status(400).json({
            message: err.message
        })
    } else if (err.status === 404) {
        res.status(404).json({
            message: err.message
        })
    } else if (err.message === "username/password wrong") {
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.message === "User validation failed: email: Email address already registered") {
        res.status(err.status).json({
            message: "Email address already registered"
        })
    }
}