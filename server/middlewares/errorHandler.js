const errorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        res.status(400).json({
            code: 400,
            errMsg: err
        })
    } else if (err.code === 401) {
        res.status(err.code).json({
            code: err.code,
            errMsg: "You dont have authorization for doing this action"
        });
    } else if (err.code === 404) {
        res.status(err.code).json({
            code: err.code,
            errMsg: err.errMsg + " not found"
        })
    } else if (err.name === "MongoError") {
        res.status(400).json({
            code: 400,
            errMsg: err.errmsg
        })
    } else {
        res.status(500).json({
            code: 500,
            errMsg: "Internal Server Error"
        });
    }
};

module.exports = errorHandler;