const {Schema, model, models} = require('mongoose');

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 7,
            maxlength: 25,
            validate: {
                validator: (value) => {
                    return models.Todo.findOne({
                        name: value
                    }).then(response => {
                        if (response) return false
                    })
                },
                msg: "Project already registered"
            }
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 50,
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