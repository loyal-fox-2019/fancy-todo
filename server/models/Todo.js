const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const todoSchema = new Schema({
    name: String,
    description: String,
    status: String,
    due_date: Date,
    UserId: Schema.Types.ObjectId
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;