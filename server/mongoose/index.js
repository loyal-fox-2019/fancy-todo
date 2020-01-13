'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log('Database mongodb connected ...');
})
.catch(err => {
    console.log('Database fail to cannect: ' +err);
});

module.exports = mongoose;