const mongoose = require('mongoose')
const URI = process.env.MONGO_URI || 'mongodb://localhost/fancy_todo'

mongoose.connect(URI, {useNewUrlParser:true,useUnifiedTopology:true})