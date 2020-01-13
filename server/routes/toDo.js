const router = require('express').Router()
const controller = require('../controllers/toDoController')
const authentication = require('../middlewares/authentication')

router.use(authentication)

router.get('/', controller.findAll)

router.get('/:id', controller.findOneTodo)

router.get('/all', controller.findAllTodos)

router.get('/today', controller.findToday)

router.get('/tomorrow', controller.findTomorrow)

router.get('/expired', controller.findExpired)

router.get('/finished', controller.findFinished)

router.get('/inactive', controller.findInactive)

router.get('/important', controller.findImportant)

router.get('/normal', controller.findNormal)

router.get('/urgent', controller.findUrgent)

router.post('/', controller.create)

router.post('/search', controller.findOne)
// router.post('/search', controller.findOne)

router.delete('/:id', controller.delete)

router.put('/:id', controller.editOne)

router.patch('/:id', controller.changeStatus)

module.exports = router