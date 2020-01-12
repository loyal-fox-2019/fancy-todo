const router = require('express').Router()
const ProjectController = require('../controller/ProjectController')
const authentication = require('../middleware/authentication')
const authorizationOwner = require('../middleware/authorizationOwner')


// admin tools
router.get('/test', ProjectController.test)
router.get('/adminAll', ProjectController.findAll)
router.delete('/masterDelete', ProjectController.masterDelete)


router.use(authentication)
router.post('/', ProjectController.createProject) //done
router.get('/', ProjectController.findAllProjectByMemberList) //done
router.get('/:projectId', ProjectController.findOneProject)

router.use('/:projectId', authorizationOwner('Project'))
// =========================================================================   
router.patch('/:projectId', ProjectController.patchUpdate) //done
router.delete('/:projectId', ProjectController.deleteProject) //done




module.exports = router
