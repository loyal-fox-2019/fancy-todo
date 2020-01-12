const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: [true, 'name is required']
    },
    due_date: {
        type: Date,   
    },
    ownerTodo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo