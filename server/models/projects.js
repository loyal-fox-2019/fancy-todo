const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // owner:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project