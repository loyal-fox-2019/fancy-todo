const router = require('express').Router()
const invitationController = require('../controllers/invitation')

router.get('/:username', invitationController.userForInvite)

router.post('/:projectId', invitationController.inviteUser)

router.put('/:projectId', invitationController.acceptInvitation)

router.patch('/:projectId', invitationController.rejectInvitation)

module.exports = router