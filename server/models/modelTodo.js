const mongoose = require('mongoose')
const Schema = mongoose.Schema
let date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
let tomorrow = date.getDate() + 1

const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        min: [3, "minimal character for name of your todo list is 3"],
        required: [true, "please give name to your todo list"]
    },
    description: {
        type: String,
        default: "Has to do it!"
    },
    status: {
        type: Boolean,
        default: false
    },
    due_date: {
        type: Date,
        default: new Date(year, month, tomorrow)
    },
    location: {
        type: String
    }
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo