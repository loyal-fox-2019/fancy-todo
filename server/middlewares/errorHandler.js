function errorHandler(err, req, res, next) {
    res.status(500).json({err, msg: 'Internal Server Error'});
}

module.exports = errorHandler;