const routes = require('express').Router()
const user = require('./userRoute');
const todo = require('./todoRoute');
const admin = require('./adminRoute');
const authenticator = require('../middlewares/authenticator');
const authorizer = require('../middlewares/authorizer');

routes.use('/user', user)
routes.use(authenticator)
routes.use('/todo', todo)
routes.use('/admin',authorizer, admin)

module.exports = routes
;
