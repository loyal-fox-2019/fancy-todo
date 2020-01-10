const router = require('express').Router()
const ProjectController = require('../controllers/project-controller')

router.get('/', ProjectController.getProject)
router.post('/', ProjectController.createProject)
router.patch('/:projectId', ProjectController.editProject)
router.delete('/:projectId', ProjectController.deleteProject)

module.exports = router
