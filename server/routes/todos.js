const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post("/create", todoController.createTodo)

module.exports = router;