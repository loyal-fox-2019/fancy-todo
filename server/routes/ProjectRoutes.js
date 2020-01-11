const router = require('express').Router()
const ProjectCotroller = require('../controllers/ProjectController')

router.get('/', ProjectCotroller.findAll)
router.post('/', ProjectCotroller.create)
router.get('/:id', ProjectCotroller.findOne)
router.put('/:id', ProjectCotroller.update)

router.patch('/:id/member/:memberId', ProjectCotroller.addMember)
router.delete('/:id/member/:memberId', ProjectCotroller.delMember)

router.delete('/:id', ProjectCotroller.delete)

module.exports = router