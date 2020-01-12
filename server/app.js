if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose');
const cors = require('cors')

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {console.log(`Connected to MongoDB`)})
  .catch((err) => {console.log(err)});

app.use(router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})