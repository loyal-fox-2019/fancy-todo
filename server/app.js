if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const erroHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
})

mongoose.connect('mongodb://localhost:27017/FancyTodo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected to databse');    
})
.catch(err=>{
    console.log('connection ERROR');
})

app.use('/', routes)
app.use(erroHandler)