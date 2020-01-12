'use strict'

require('dotenv').config()

const express = require('express')
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

app.listen(port, () => {
    console.log('RESTFULL API Server Ready')
})