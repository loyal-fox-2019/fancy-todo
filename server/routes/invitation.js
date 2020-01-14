const router = require('express').Router()
const invitationController = require('../controllers/invitation')
const {authentication, authorization} = require('../middlewares/auth')

// get all user for invitation
router.get('/:username', authentication, invitationController.userForInvite)

// create invitation for user from project
router.post('/:projectId', authentication, invitationController.inviteUser)

// accept project invitation
router.put('/:projectId', authentication, invitationController.acceptInvitation)

// reject project invitation
router.patch('/:projectId', authentication, invitationController.rejectInvitation)

module.exports = router