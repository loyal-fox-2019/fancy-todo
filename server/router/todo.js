const router = require('express').Router()
const controller = require('../controllers/todo')
const Authorization = require('../middlewares/authorization')

router.get('/', controller.findByUser)
router.post('/', controller.create)
router.get('/:id', Authorization, controller.findById)
router.delete('/:id', Authorization, controller.delete)
router.put('/:id', Authorization, controller.update)
router.patch('/:id', Authorization, controller.updateStatus)


module.exports = router