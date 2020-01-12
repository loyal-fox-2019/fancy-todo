const {Schema, model, models} = require('mongoose');

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        admin: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref:'Todo'
            }
        ]
    }
);

const Project = model('Project', projectSchema);

module.exports = {
    Project
};