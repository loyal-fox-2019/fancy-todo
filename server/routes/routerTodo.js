const express = require('express');
const router = express.Router();
const ControllerTodo = require('../controllers/ControllerTodo');
const tokenChecking = require('../middlewares/tokenChecking');
const authorization = require('../middlewares/authorization');
const authorizationTodo = require('../middlewares/authorizationTodo');

//checking token
router.use(tokenChecking);
// create todo
router.post(
    "/:projectName",
    authorization,
    ControllerTodo.createTodo
);
// view todo list
router.get(
    "/:projectName/:todoName",
    authorization,
    ControllerTodo.viewTodo
);
// update todo
router.put(
    "/:projectName/:idTodo",
    authorization,
    authorizationTodo,
    ControllerTodo.updateTodo
);
// delete todo
router.delete("/:projectName/:idTodo",
    authorization,
    authorizationTodo,
    ControllerTodo.deleteTodo
);

module.exports = router;