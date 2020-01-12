const router = require('express').Router();
const ControllerTodo = require('../controllers/todoC')
// const Auth = require('../middlewares/tokenCheck')

// get data
router.get('/all', ControllerTodo.seriouslyAllTodo)

router.get('/', ControllerTodo.showAllTodos)

router.get('/:projectId', ControllerTodo.showProjectTodo)

// create
router.post('/', ControllerTodo.create)

router.post('/:projectId', ControllerTodo.create)

// delete and edit
router.put('/:id', ControllerTodo.editTodo)

router.patch('/:id', ControllerTodo.statusDone)

router.delete('/:id', ControllerTodo.delete)

module.exports = router