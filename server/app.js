"use strict"

if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

mongoose
    .connect(MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Connect to database ${MONGO_URI}`)
    }).catch((err) => {
        console.log(`Fail Connect, err message : ${err}`)
    });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`)
})