const mongoose = require('mongoose')
const { Schema } = mongoose

const toDoSchema = new Schema({
    name: {
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String
    },
    importanceLevel:{
        type: String
    },
    due_date:{
        type: Date
    }
})

const toDo = mongoose.model('toDos', toDoSchema)

module.exports = toDo