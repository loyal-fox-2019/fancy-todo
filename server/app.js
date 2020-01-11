const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', router)





mongoose.connect(`mongodb://localhost:27017/fancy-todo`, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then((sc)=>{
    console.log(`connected to Database`)
})
app.listen(port, ()=>{
    console.log('server sedang berjalan di port '+port)
})