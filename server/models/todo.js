'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    due_date: {
        type: Date
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;