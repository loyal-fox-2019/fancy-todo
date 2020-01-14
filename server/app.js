"use strict"

require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { errorHandler } = require('./middlewares/errorHandler')
const Router = require('./routes')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect('mongodb+srv://patradyn:p3tzkn1ght@cluster0-bxx6s.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(_ => console.log('Connect to database'))
    .catch(_ => console.log('cant connect to database'));

app.use('/', Router)

app.use((req, res, next) => {
    const err = {
        msg: 'Page Not Found.',
        status: 404
    }
    next(err);
})

app.use(errorHandler)

app.listen(port, () => console.log('Listening to port ' + port))
