const express = require("express");
const router = express.Router();
const {TodoController} = require("../controllers/todo");

router.get("/", TodoController.getAllTodos);
router.get("/:id", TodoController.getTodoById);
router.get("/status/:statusId", TodoController.getAllTodosByStatus);
router.post("/", TodoController.addNewTodo);
router.put("/:id", TodoController.updateTodoById);
router.delete("/", TodoController.deleteTodoById);

module.exports = router;
