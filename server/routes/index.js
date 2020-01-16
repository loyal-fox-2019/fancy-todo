const routes = require("express").Router();
const apiRouter = require("./api");

routes.use('/api', apiRouter);

routes.get('*', (req,res) => {
    res.status(404).json({
        msg: "Not found"
    });
});

module.exports = routes;