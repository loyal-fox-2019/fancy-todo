const express = require('express');
const { TodoController } = require('../controllers');
const { authentication } = require('../middlewares');

const router = express.Router();

router.use(authentication);

// create
router.post('/', TodoController.create);

// read one
router.get('/', TodoController.readAll);

// read all
router.get('/:id', TodoController.readOne);

// update
router.put('/:id', TodoController.update);

// destroy
router.delete('/:id', TodoController.destroy);

module.exports = router;
