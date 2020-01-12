'use strict'

const errorHandler = (err, req, res, next) => {
    console.log(err)
    switch (err.name) {
        default:
            if (err.code) {
                res.status(err.code).json({
                    message: err.message
                })
            }
            else {
                res.status(500).json({
                    message: `Internal Server Error`
                })
            }

    }
}

module.exports = errorHandler
