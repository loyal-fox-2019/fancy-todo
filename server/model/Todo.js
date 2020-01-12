const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    description:{
        type: String,
        required: [true, 'Description is Required']
    },
    status:{
        type: String,
        enum: ['unFinish', 'Finish']
    },
    dueDate:{
        type: Date,
        required: [true, 'Due Date is Required']
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        required: [true, 'CreatedBy need to filled']
    },
    createdAt:{
        type: Date,
        required: true
    },
    updatedBy:{
        type: Schema.Types.ObjectId, ref:'User'
    },
    updatedAt:{
        type: Date,
    },
    projectId:{
        type: Schema.Types.ObjectId, ref:'Project'
    }

})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo