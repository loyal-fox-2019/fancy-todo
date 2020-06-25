if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

const mongoose = require('mongoose');
let urlDB = `mongodb://localhost/todo`
if (process.env.NODE_ENV == "production") {
    urlDB = `mongodb+srv://mydb:${process.env.MONGO_PASSWORD}@cluster0-x8shq.gcp.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`;
}
async function connectDB() { 
    try {
        await mongoose.connect(urlDB, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true,});
    } catch (error) {
        console.log(error)
    }
 }
connectDB()

const PORT = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/ErrorHandler')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/',router)
app.use(errorHandler)
app.listen(PORT, () => console.log('app listened in port: ' + PORT))
