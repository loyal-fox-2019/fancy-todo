const errorHandler = (err, req, res, next) => {

    if (err.name === "ValidationError") {
        res.status(400).json({
            code: 400,
            errMsg: err
        })
    } else if (err.code === 401) {
        res.status(err.code).json({
            code: err.code,
            errMsg: "You dont have authorized for this action"
        });
    } else if (err.code === 404) {
        res.status(err.code).json({
            code: err.code,
            errMsg: err.errMsg + " not found"
        })
    } else {
        res.status(500).json(err);
    }
};

module.exports = errorHandler;