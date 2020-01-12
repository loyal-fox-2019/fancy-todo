'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field cannot be empty']
    },
    description: {
        type: String,
        required: [true, 'Description field cannot be empty']
    },
    status: {
        type: String,
        default: 'OnProgess'
    },
    due_date: {
        type: Date,
        required: [true, 'Due Date field cannot be empty']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;