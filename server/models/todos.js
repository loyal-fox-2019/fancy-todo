const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title todo tak boleh kosong'],
        maxlength: [25, 'Panjang title maksimal 15 huruf']
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "todo"
    },
    due_date: {
        type: Date,
        required: [true, 'There`s no todo without due date'],
        // min: new Date()
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
},{
    timestamps: true
})

TodoSchema.pre('save', function(next){
    if(new Date(this.due_date).toISOString() <= new Date().toISOString()) next({status: 400, msg: 'Due date tidak boleh hari ini atau hari yang sudah lewat.'})
    next()
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo