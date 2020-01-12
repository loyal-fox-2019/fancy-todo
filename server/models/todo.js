const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoname: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'Description must not empty']
    },
    status: {
        type: Boolean
    },
    created_at: {
        type: Date
    },
    due_date: {
        type: Date
    },
    userId: {
        type: String,
        ref: 'User'
    }
});

todoSchema.pre('save', function (next) {
    if (this.todoname == '') this.todoname = '(No Title)';
    this.status = false
    this.created_at = new Date()
    next()
})

todoSchema.pre('findOneAndUpdate', function (next) {
    if (this.status == '1') {
        this.status = true
    } else if (this.status == '0') {
        this.status = false
    }
    next()
})

module.exports = mongoose.model('Todo', todoSchema);
