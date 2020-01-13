const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect('mongodb+srv://michaelwp:michaelwp@cluster0-sjji7.gcp.mongodb.net/fancytodo?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
}, (err) => {
    if (err) {
        console.log("mongodb failed to connect");
    } else {
        console.log("mongodb successfully connect");
    }
});

module.exports = mongoose;