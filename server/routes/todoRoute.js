const todoCon = require('../controller/todoController');
const route = require('express').Router();

route.post('/',todoCon.create)
route.put('/:_id',todoCon.update)
route.get('/:_id',todoCon.findOne)
route.get('/',todoCon.findAll)
route.delete('/:_id',todoCon.delete)

module.exports = route;
