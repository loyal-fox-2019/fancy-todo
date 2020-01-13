'use strict'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const { errorHandler } = require('./middlewares/errorHandler.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('connected to the database'))
  .catch(() => console.log('database connection error'))

app.use(morgan('dev'))
app.use('/', routes)
app.use(errorHandler)

module.exports = app;