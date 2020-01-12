const axios = require('axios')
require('dotenv').config()

class WeatherController{
    static getWeather(req, res, next){
        axios.get(`http://api.weatherbit.io/v2.0/current?city=Jakarta,ID&key=${process.env.WEATHERBIT_KEY}`)
        .then(weatherData=>{
            // console.log(weatherData.data.data[0].weather.description)
            weatherData = weatherData.data.data[0]
            let weatherCode = weatherData.weather.code
            // let weatherCode = '800'
            // console.log(weatherCode)
            let bg
            if(weatherCode[0] == '8' && weatherCode[2] != '0'){
                bg = 'https://wallpaperaccess.com/full/175910.jpg'
            }else if(weatherCode[0] == '8' && weatherCode[2] == '0'){
                bg = 'https://wallpaperplay.com/walls/full/a/f/3/14766.jpg'
            }else if(weatherCode[0] == '3'){
                bg = 'https://images.pexels.com/photos/268715/pexels-photo-268715.jpeg?cs=srgb&dl=bubble-clear-dew-droplets-268715.jpg&fm=jpg'
            }else if(weatherCode[0] == '2'){
                bg = 'http://eskipaper.com/images/thunderstorm-wallpaper-1.jpg'
            }else if(weatherCode[0] == '5'){
                bg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8L_Ojdb5J-nsZrGPRvpuzEIAyKFtUIqcTqFFnLL5WjpFth5Iy&s'
            }else{
                bg = 'https://wallpaperplay.com/walls/full/a/f/3/14766.jpg'
            }
            // console.log(weatherData.weather.description)
            res.status(200).json({weather:weatherData.weather.description, bg:bg})

        })
        .catch(err=>{
            next('505 Internal Server Error')
        })
    }
}

module.exports = WeatherController