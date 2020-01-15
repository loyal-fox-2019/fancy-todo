const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const todoSchema = new Schema({    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    entered_date: {
        type: Date
    },
    due_date: {
        type: Date
    },
    completed_date: {
        type: Date
    },
    location: {
        type: [{type: Number}],
        validate: function(locArr) {
            return locArr.length == 2 || locArr.length == 0;
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    }
});

todoSchema.pre('save',function(next) {
    this.user = ObjectId(this.user);
    if(!this.entered_date)
    {
        this.entered_date = new Date();
    }
    
    if(this.due_date)
    {
        this.due_date = new Date(this.due_date);
    }

    next()
})

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;