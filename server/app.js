require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const ErrorHandler = require('./middlewares/errorHandler')
const Routes = require('./routes')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fancy-todo-db', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>{
        console.log('=== Connected to Database ===')
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', Routes)


app.use(ErrorHandler)

app.listen(PORT, function(){
    console.log(`This app listening on PORT: ${PORT}`)
})