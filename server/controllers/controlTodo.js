const modelTodo = require('../models/modelTodo')
// const ObjectId = require('mongoose').Types.ObjectId
const modelUser = require('../models/modelUser')
const axios = require('axios')

class ControlTodo {
    static createTodo(req, res, next) {
        // console.log(req.body)
        // console.log(req.headers.token, "ini token dari header di control todo")
        console.log("halo dari createTodo Controler")
        console.log(req.payload, "ini payload dari createTodo")

        modelUser.findById(req.payload.id)
            .then(idFound => {
                console.log(idFound, "oke sudah ada")
                if (idFound) {
                    // console.log(idFound._id)
                    return modelTodo.create({
                        userId: idFound._id,
                        name: req.body.name,
                        description: req.body.description,
                        status: req.body.status,
                        due_date: req.body.due_date
                    })

                } else {
                    res.status(500).json({ message: "error dari modelUser createTodo, idnotfound" })
                }
            })
            .then(todoCreated => {
                res.status(200).json({ todoCreated, message: "Your todo list has been successfully created" })
            })
            .catch(err => {
                // console.log(err)
                res.status(500).json({ err, message: "Internal server error from createTodo" })
            })
    }

    static findAllMyTodo(req, res, next) {
        // console.log("halo dari read all")
        let milikUser = []
        // console.log(req.headers, "in headers dari readAll")
        //req.headers.userid => userIdnya
        modelTodo.find().populate(['userId'])
            .then(semuaTodo => {
                // console.log(semuaTodo[semuaTodo.length - 1])
                // console.log(semuaTodo[semuaTodo.length - 1].userId.id, "ini idnya")
                if (!semuaTodo[0]) {
                    res.status(200).json({ semuaTodo, message: "User has no to do" })
                } else {
                    for (let perTodo of semuaTodo) {
                        if (perTodo.userId) {

                            if (perTodo.userId.id === req.headers.userid) {
                                milikUser.push(perTodo)
                            }
                        }
                    }
                    res.status(200).json(milikUser)
                }
            })
    }
    static updateTodo(req, res, next) {
        // console.log(req.params.id)
        console.log(req.body)
        // console.log("halo dari controller update")
        modelTodo.findByIdAndUpdate(req.params.id, req.body)
            .then(updated => {
                // console.log(updated)
                res.status(200).json({ updated, message: "updated successfully" })
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error from updateTodo" })
            })
    }

    static deleteTodo(req, res, next) {
        modelTodo.findByIdAndDelete(req.params.id)
            .then(foundTodoAndDelete => {
                // console.log(foundTodoAndDelete)
                if (foundTodoAndDelete) {
                    res.status(200).json({ foundTodoAndDelete, message: "To do successfully deleted" })
                } else {
                    res.status(400).json("Todo Not Found")
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error from deleteTodo" })
            })
    }

    static getWeather(req, res, next) {
        axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: process.env.WEATHER_APIKEY,
                query: "Jakarta"
            }
        })
            .then(response => {
                if (response) {
                    let icons = response.data.current.weather_icons
                    let temperature = response.data.current.temperature
                    let weather_descriptions = response.data.current.weather_descriptions
                    let is_night = response.data.current.is_night
                    res.status(200).json({ icons, temperature, weather_descriptions, is_night })
                    console.log(response.data.current.weather_icons, "weather icons", response.data.current.weather_descriptions)
                } else {
                    console.log("no response")
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server error from getWeather Control" })
            })
    }
    static findByusername(req, res, next) {

        modelUser.find({ username: new RegExp(req.params.username, "i") })
            .then(foundUsername => {
                if (foundUsername[0]) {
                    res.status(200).json(foundUsername)
                } else {
                    res.status(404).json({ message: "username not found" })
                }
            })

    }

}
module.exports = ControlTodo