const router = require('express').Router()
const FootballController = require('../controllers/football')

router.get('/league', FootballController.getAllLeagues)
router.get('/schedule/:league_id/:date', FootballController.getAllSchedule)

module.exports = router