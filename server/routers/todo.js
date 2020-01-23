const express = require("express");
const router = express.Router();
const {TodoController} = require("../controllers/todo");
const Authorization = require("../middlewares/authorization");

router.get("/", TodoController.getAllTodos);
router.post("/", TodoController.addNewTodo);
router.get("/status/:statusId", TodoController.getAllTodosByStatus);

router.use('/:id', Authorization);
router.get("/:id", TodoController.getTodoById);
router.put("/:id", TodoController.updateTodoById);
router.patch("/:id", TodoController.updateTodoById);
router.delete("/:id", TodoController.deleteTodoById);

module.exports = router;
