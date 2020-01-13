const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    todo: String,
    desc: String,
    due_date: Date,
    status: String,
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('List', listSchema)