'use stract'

require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandlers')
const router = require('./routers')
const PORT = process.env.PORT
const db = mongoose.connection

mongoose.connect( process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!")
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`app listen on PORT ${PORT}`))