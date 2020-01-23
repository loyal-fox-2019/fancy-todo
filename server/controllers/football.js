const axios = require('axios')

class FootballController{
    static getAllLeagues(req,res,next){
        axios.get('https://api-football-v1.p.rapidapi.com/v2/leagues', {
            headers: {"X-RapidAPI-Host": process.env.RAPID_HOST, "X-RapidAPI-Key": process.env.RAPID_KEY}
        })
            .then(results => {
                let data = results.data.api.leagues
                let finalData = []
                // Filteringnya berdasarkan tahun, tipe league, dan logo tidak null
                data.forEach(el => {
                    if(el.season == '2019' && el.type == "League" && el.logo !== null){
                        finalData.push(el)
                    }
                })
                res.status(200).json(finalData)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getAllSchedule(req,res,next){
        let league_id = req.params.league_id
        let date = req.params.date
        axios.get(`https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${league_id}/${date}`, {
            headers: {"X-RapidAPI-Host": process.env.RAPID_HOST, "X-RapidAPI-Key": process.env.RAPID_KEY}
        })
            .then(results => {
                let data = results.data.api.fixtures
                console.log(results)
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = FootballController