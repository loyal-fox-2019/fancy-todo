const {Schema, model, models} = require('mongoose');

const todoSchema = new Schema(
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
                msg: "Todo Already registered"
            }
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 50,
        },
        status: {
            type: String,
            required: true
        },
        due_date: Date,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    }
);

const Todo = model('Todo', todoSchema);

module.exports = {
    Todo
};