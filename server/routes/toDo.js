const router = require('express').Router()
const controller = require('../controllers/toDoController')

router.get('/', controller.findAll)

router.post('/', controller.create)

router.get('/:id', controller.findOne)

router.delete('/:id', controller.delete)

router.put('/:id', controller.editOne)

router.patch('/:id', controller.changeStatus)

module.exports = router