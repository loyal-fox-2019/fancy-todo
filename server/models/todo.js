"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Required Name Todo"]
    },
    description: {
        type: String,
        required: [true, "Required description"]
    },
    status: {
        type: String,
        default: "uncomplete"
    },
    dueDate: {
        type: Date,
        require: [true, "Required Date"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo