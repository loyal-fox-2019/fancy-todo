const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    // console.log(req.headers)
    if (req.headers.hasOwnProperty('token')) {
        const token = req.headers.token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.payload = payload
            console.log(payload, "ini payload")
            next()
        } catch (err) {
            res.status(404).json({
                err
            })
        }
    } else {
        res.status(404).json({
            message: "please login first"
        })
    }
}