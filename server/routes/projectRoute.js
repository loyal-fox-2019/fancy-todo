const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/projectController')
const authenticate = require('../middlewares/authenticate')
const projectMemberAuthorize = require('../middlewares/projectMemberAuthorize')
const projectOwnerAuthorize = require('../middlewares/projectOwnerAuthorize')

router.use(authenticate)
router.get('/', ProjectController.showAll)
router.post('/', ProjectController.createProject)

router.get('/:projectId', projectMemberAuthorize, ProjectController.showOne)

router.use('/:projectId', projectOwnerAuthorize)
router.post('/:projectId/:userId', ProjectController.inviteMember)
router.delete('/:projectId/:userId', ProjectController.removeMember)
router.delete('/:projectId', ProjectController.deleteProject)

module.exports = router