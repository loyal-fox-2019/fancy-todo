const express = require('express');
const router = express.Router();
const ControllerTodo = require('../controllers/ControllerTodo');
const tokenChecking = require('../middlewares/tokenChecking');

//checking token
router.use(tokenChecking);

// view todo list
router.get("/", ControllerTodo.viewTodo);
// create todo
router.post("/", ControllerTodo.createTodo);
// update todo
router.put("/:idTodo", ControllerTodo.updateTodo);
// delete todo
router.delete("/:idTodo", ControllerTodo.deleteTodo);

module.exports = router;