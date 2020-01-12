const router = require('express').Router()
const TodoController = require('../controller/TodoController')
const authentication = require('../middleware/authentication')
const authorizationOwner = require('../middleware/authorizationOwner')
const authorizationAccess = require('../middleware/authorizationAccess')

// admin tools
router.get('/test', TodoController.test)
router.get('/adminAll', TodoController.findAll)
router.delete('/masterdelete', TodoController.masterDelete)



router.use(authentication)
router.post('/freeUser', TodoController.create) //done
router.get('/freeUser', TodoController.findAllTodoByUserId) //done



router.use('/freeUser/:todoId', authorizationOwner('Todo'))
// =================================================================================
router.put('/freeUser/:todoId', TodoController.putUpdate) //done
router.patch('/freeUser/:todoId', TodoController.patchUpdate) //done
router.delete('/freeUser/:todoId', TodoController.delete) //done



router.use('/groupUser/:projectId', authorizationAccess)
// =================================================================================
router.post('/groupUser/:projectId', TodoController.create) //done
router.get('/groupUser/:projectId', TodoController.findTodoByProjectId) //done
router.put('/groupUser/:projectId/:todoId', TodoController.putUpdate) //done
router.patch('/groupUser/:projectId/:todoId', TodoController.patchUpdate) //done
router.delete('/groupUser/:projectId/:todoId', TodoController.delete) //done



module.exports = router