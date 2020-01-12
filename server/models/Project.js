const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
// https://docs.mongodb.com/manual/reference/operator/update/pullAll/