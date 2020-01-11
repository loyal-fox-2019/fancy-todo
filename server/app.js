const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fancy-toDo', {useNewUrlParser: true, useUnifiedTopology:true})
.then(success=>{
    console.log(`connected to mongoDB`)
})
.catch(err=>{
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Server running at PORT ${port}`)
})