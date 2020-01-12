const router = require('express').Router()
const ProjectCotroller = require('../controllers/ProjectController')
const TodoRoutes = require('./TodoRoutes')

router.get('/', ProjectCotroller.findAll)
router.post('/', ProjectCotroller.create)
router.get('/:id', ProjectCotroller.findOne)
router.put('/:id', ProjectCotroller.update)

router.patch('/:id/members', ProjectCotroller.addMember)
router.delete('/:id/members', ProjectCotroller.delMember)

router.delete('/:id', ProjectCotroller.delete)

router.use(TodoRoutes)

module.exports = router