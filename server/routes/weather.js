const express = require('express')
const router = express.Router()
const WeatherController = require('../controllers/weather')

router.get('/:lat/:lon', WeatherController.getWeather)

module.exports = router