if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const router = require('./router')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/fancy-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(success => {
        console.log('Fancy Todos connected to DB')
    })
    .catch(err => {
        console.log(err)
    })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', router)
app.use(errorHandler)
app.listen(port, () => { console.log('Fancy Todo Server Running on port : ' + port) })

