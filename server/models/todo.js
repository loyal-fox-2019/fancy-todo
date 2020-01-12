const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Tittle Cannot be Null']
    },
    description: {
        type: String,
    },
    due_date: {
        type: Date,
        required: [true, 'Due Date cannot be Null']
    },
    status: {
        type: String,
        default: 'On Progress'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User cannot be null']
    }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo