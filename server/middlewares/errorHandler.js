module.exports = (err, req, res, next) => {
    if (err.code) {
        res.status(err.code).json(err)
    } else {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}