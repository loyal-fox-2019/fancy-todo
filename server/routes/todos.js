const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get("/", todoController.listAllTodo);
router.post("/create", todoController.createTodo);

module.exports = router;