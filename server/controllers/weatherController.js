const axios = require('axios');

class OpenWeatherController{
    static  cityWeather(req,res,next){
        const paramDate = req.params.date
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.cityname}&APPID=${process.env.OPENWEATHER_API}`
        axios.get(url)
        .then(({data})=>{
            if(data){
                let weatherData = null
                const allWeatherData = data.list
                for(let i=0;i<allWeatherData.length;i++){
                    let completeDate = allWeatherData[i].dt_txt
                    let date = completeDate.split(' ')
                    if(date[0]==paramDate){
                        weatherData = allWeatherData[1]
                    }
                }
                res.send({
                    weather: weatherData
                })
            }else{
                throw new Error('City name not found')
            }
        })
        .catch(next)
    }
}

module.exports = OpenWeatherController