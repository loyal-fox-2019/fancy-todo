const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    due_date: {
        type: Date
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo