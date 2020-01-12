const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const todoSchema = new Schema({
    name: String,
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    due_date: Date,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "You must login first",
    }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;