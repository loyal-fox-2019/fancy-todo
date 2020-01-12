const router = require('express').Router();
const ControllerTodo = require('../controllers/todoC')
const {authentication, authorization} = require('../middlewares/auth')

// get data
router.get('/all', ControllerTodo.seriouslyAllTodo)

router.get('/', authentication, ControllerTodo.showAllTodos)

router.get('/:projectId', authentication, ControllerTodo.showProjectTodo)

// create
router.post('/', authentication, ControllerTodo.create)

router.post('/:projectId', authentication, ControllerTodo.create)

// edit
router.put('/:id', authentication, authorization, ControllerTodo.editTodo)

router.patch('/:id', authentication, authorization, ControllerTodo.statusDone)

// delete
router.delete('/:id', authentication, authorization, ControllerTodo.delete)

module.exports = router