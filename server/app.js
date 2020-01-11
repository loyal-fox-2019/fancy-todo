if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/fancy-todo', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use('/', routes)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})


