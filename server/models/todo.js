const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'Status'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    due_date: {
        type: Date
    }
});

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = {
    todoModel
};
