'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTodoSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 500
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15,
        default: 'Pending'
    },
}, { versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const userTodos = mongoose.model('UserTodos', userTodoSchema)

module.exports = userTodos