'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')()
const port = process.env.PORT
const router = require('./routes')

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: `RESTFULL API Server Ready`
    })
})

app.use(router)

mongoose.connect('mongodb://localhost:27017/fancy-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connecting to MongoDB Success!`)
    })
    .catch((err) => {
        console.log(`Connecting to MongoDB Failed!`)
        console.log(err)
    })

app.listen(port, () => {
    console.log('RESTFULL API Server Ready')
})