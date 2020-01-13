const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name:{
        type:String,
        required:[true,'name required']
    },
    description:{
        type:String,
        required:[true,'description required']
    },
    status:String,
    createdBy:{ type: Schema.Types.ObjectId, ref: 'User' },
    group: { type: Schema.Types.ObjectId, ref: 'Group'},
    dueDate: {
        type:Date,
        required:[true,'Please input due date']
    }
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo