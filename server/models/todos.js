'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    tittle: {
        type: String,
        maxlength: 225
    },
    description: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

module.exports = mongoose.model('Todos', todoSchema)