const express = require("express");
const router = express.Router();
const {TodoController} = require("../controllers/todo");
const authentication = require('../middlewares/authentication');

router.use("/", authentication);
router.get("/", TodoController.getAllTodos);
router.post("/", TodoController.addNewTodo);
router.put("/:id", TodoController.updateTodoById);
router.delete("/:id", TodoController.deleteTodoById);

module.exports = router;
