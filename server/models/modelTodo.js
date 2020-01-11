const {Schema, model, models} = require('mongoose');

const todoSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        due_date: Date,
        user_id: {type: Schema.Types.ObjectId, ref: 'User'}
    }
);

const Todo = model('Todo', todoSchema);

module.exports = {
    Todo
};