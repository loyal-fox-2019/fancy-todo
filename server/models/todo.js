const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate:{
            validator: function(val){
                return Todo.findOne({title:val})
                .then(todo=>{
                    if(todo){
                        throw new Error('Todo title must be unique')
                    }else{
                        return true
                    }
                })
                .catch(err=>{
                    throw new Error(err)
                })
            }
        }
    },
    subtitle: String,
    description:{
        type:String,
        required: true
    },
    status:{
        type: String
    },
    in_date:{
        type: Date
    },
    due_date:{
        type: Date
    },
    userId:{
        type: String,
        required: true
    },
    weather: String
},{
    strict: true
})

todoSchema.pre('save', function(next){
    this.in_date = new Date()
    this.status = false
    next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo