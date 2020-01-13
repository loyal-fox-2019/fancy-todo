const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field required']
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'unfinished'
    },
    due_date: {
        type: Date,
        required: [true, 'due date field required']
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;