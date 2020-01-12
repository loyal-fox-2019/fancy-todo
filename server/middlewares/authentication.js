const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    if (req.headers.token) {
        try {
            let payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            req.loginData = payload
            // console.log(payload)
            next()
        }
        catch (err) {
            res.status(400).json({ message: "Invalid Token" })
        }
    } else {
        res.status(403).json({
            message: 'You Don\'t have Token, Please Login First'
        })
    }
}