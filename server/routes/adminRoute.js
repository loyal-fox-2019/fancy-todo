const adminCon = require('../controller/adminController');
const route = require('express').Router();

route.put('/:_id',adminCon.update)
route.get('/',adminCon.findAll)
route.delete('/:_id',adminCon.delete)

module.exports = route;