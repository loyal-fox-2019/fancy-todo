module.exports = function (err, req, res, next) {
    console.log(err);
    switch (err.status) {
        case 400:
            if (err.err.code == 11000) {
                res.json({
                    status: 400,
                    msg: 'Username or Email are already taken'
                })
            } else if (err.err.errors) {
                res.json({
                    status: 400,
                    msg: err.err.errors
                })
            } else {
                res.json(err)
            }
            break;

        default:
            res.json(err)
            break;
    }
}
