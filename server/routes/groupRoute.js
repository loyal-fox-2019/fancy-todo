const groupController = require('../controllers/groupController')
const router = require('express').Router()
const authentication = require('../middlewares/auth')

router.use(authentication)
router.post('/',groupController.create)
router.get('/:id',groupController.getOneGroup)
router.get('/',groupController.getCreatorGroup)
router.patch('/',groupController.sendInvitation)

module.exports = router