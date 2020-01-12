const userCon = require('../controller/userController');
const route = require('express').Router();

route.post('/signup',userCon.create)
route.post('/signin',userCon.signin)
route.post('/google',userCon.google)
module.exports = route;