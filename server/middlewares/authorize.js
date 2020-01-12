const jwt = require('jsonwebtoken');
function authorize(req, res, next) {
    try {
        let token = req.headers.token
        req.userInfo = jwt.verify(token, process.env.JWT_SECRET);
        next()
    } catch (err) {
        next({
            msg: 'Invalid Token',
            err
        })
    }
}

module.exports = authorize
