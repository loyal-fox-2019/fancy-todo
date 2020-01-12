const router = require('express').Router()
const controller = require('../controllers/todo')

router.get('/:userid', controller.findByUser)
router.post('/', controller.create)
router.delete('/:id', controller.delete)
router.put('/:id', controller.update)
router.patch('/:id', controller.updateStatus)


module.exports = router