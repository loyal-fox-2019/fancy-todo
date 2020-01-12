const router = require('express').Router()
const ControllerProject = require('../controllers/projectC')
const {authentication,authorization} = require('../middlewares/auth')

router.get('/all', ControllerProject.seriouslyAllProject)

router.get('/',authentication, ControllerProject.showAllProject)

router.post('/',authentication, ControllerProject.createProject)

// // add member
// router.put('/:projectId',authentication, ControllerProject.addMember)

// // remove member
// router.patch('/:projectId',authentication, ControllerProject.removeMember)

module.exports = router