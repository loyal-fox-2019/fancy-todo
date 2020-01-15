'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    master: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'ProjectTodos'
    }]

}, { versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const projects = mongoose.model('Projects', projectSchema)

module.exports = projects