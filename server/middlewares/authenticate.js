const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        req.userInfo = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        next()
    } catch (err) {
        next(err)
    }
}
