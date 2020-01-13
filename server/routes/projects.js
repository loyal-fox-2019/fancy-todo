'use strict'

const router = require('express').Router()
const projectsController = require('../controllers/projectsController.js')
const { memberAuthorization, ownerAuthorization } = require('../middlewares/auth.js')

router.post('/', projectsController.create) //done
router.get('/', projectsController.findAll) //done

router.delete('/:id', ownerAuthorization, projectsController.destroy)
router.post('/:id/members', ownerAuthorization, projectsController.addMember)
router.delete('/:id/members/:email', ownerAuthorization, projectsController.deleteMember)

router.use('/:id', memberAuthorization)
router.get('/:id', projectsController.findOne)
router.post('/:id/tasks', projectsController.addTask)
router.get('/:id/tasks/:taskId', projectsController.findTask)
router.put('/:id/tasks/:taskId', projectsController.updateTask)
router.patch('/:id/tasks/:taskId/done', projectsController.updateTaskProgress)
router.delete('/:id/tasks/:taskId', projectsController.deleteTask)

module.exports = router