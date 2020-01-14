const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jap:jap@cluster0-ki8rr.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true,  })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected')
});


