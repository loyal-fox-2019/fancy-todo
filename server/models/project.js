'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ProjectSchema = new Schema({
    title: {
        type:String,
        required:[true,'you must enter your title']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'you must enter your owner']
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]

});

const Model = mongoose.model('Project', ProjectSchema)
module.exports = Model