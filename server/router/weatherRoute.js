const OpenWeatherController = require('../controllers/weatherController')
const router = require('express').Router()


router.get('/:cityname/:date', OpenWeatherController.cityWeather)


module.exports = router
