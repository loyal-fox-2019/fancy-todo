"use strict"

const express = require('express');
const router = express.Router();
const TodoCtr = require('../controllers/todo');

router.post('/', TodoCtr.create);
router.get('/', TodoCtr.read);
router.put('/:id', TodoCtr.update);
router.delete('/:id', TodoCtr.delete);

module.exports = router;