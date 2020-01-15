'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')()
const port = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler');

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: `RESTFULL API Server Ready`
    })
})

app.use(router)

mongoose.connect(`${process.env.DB_CONNECTION}/${process.env.DB_NAME}`, {
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

app.use(errorHandler)
app.listen(port, () => {
    console.log('RESTFULL API Server Ready')
})