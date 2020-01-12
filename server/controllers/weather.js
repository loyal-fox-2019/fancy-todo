const axios = require('axios')
const url = 'https://api.openweathermap.org/data/2.5/weather'

class WeatherController {
    static getWeather(req,res,next){
        let lat = req.params.lat
        let lon = req.params.lon
        axios.get(`${url}/?lat=${lat}&lon=${lon}&APPID=${process.env.WEATHER_API_KEY}&units=metric`)
        .then(({data})=>{
            let toSend = {
                main: data.weather[0].main,
                temp: data.main.temp,
                img_url: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            }
            res.status(200).json(toSend)
        })
        .catch(next)
    }
}

module.exports = WeatherController