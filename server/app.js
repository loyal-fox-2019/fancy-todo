'use strict'
if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.port || 3000
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify : false, useCreateIndex: true})
.then(()=>{
    console.log('server is connected !!')
})
.catch(err=>{
    console.log(err)
})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/', routes)

app.use(errorHandler)


app.listen(port,function(){
    console.log('Run on port =====> ', port)
})