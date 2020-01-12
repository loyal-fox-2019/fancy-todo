const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title todo tak boleh kosong'],
        maxlength: [15, 'Panjang title maksimal 15 huruf']
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: [true, 'There`s no todo without due date']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default: "false"
    }
},{
    timestamps: true
})

TodoSchema.pre('save', function(next){
    if(new Date(this.due_date).toISOString() == new Date().toISOString()) next({status: 400, msg: 'Due date tidak boleh hari ini.'})
    next()
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo