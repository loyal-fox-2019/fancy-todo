const router = require('express').Router()
const FootballController = require('../controllers/football')

router.get('/league', FootballController.getAllLeagues)
router.get('/schedule', FootballController.getAllSchedule)

module.exports = router