const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name:{type: String},
    description: {type: String},
    status: {type: Boolean},
    due_date: {type: Date},
    important: {type:Boolean},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo