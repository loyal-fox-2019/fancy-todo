const todoController = require('../controllers/todoController')
const router = require('express').Router()
const authentication = require('../middlewares/auth')

router.use(authentication)
router.post('/',todoController.create)
router.get('/',todoController.getAll)
router.delete('/:id',todoController.delete)
router.put('/:id',todoController.update)
router.patch('/:id',todoController.patch)

module.exports = router