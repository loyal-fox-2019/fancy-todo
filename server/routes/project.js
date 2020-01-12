'use strict'

const router = require('express').Router()
const ProjectController = require('../controllers/projectController')

router.get('/', ProjectController.getAllProject)
router.post('/', ProjectController.createProject)
router.patch('/:projectID', ProjectController.updateProject)
router.post('/:projectID/members', ProjectController.addMember)
router.delete('/:projectID/members/:userID', ProjectController.removeMember)

module.exports = router