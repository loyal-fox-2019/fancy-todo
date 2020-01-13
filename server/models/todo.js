'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const TodoSchema = new Schema({
    title: {
        type:String,
        required:[true,'you must enter your title']
    },
    description: String,
    status:{
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required:[true,'you must enter dueDate'],
        validate :{
            validator: function(v){
                let now = new Date().getTime()
                if(v.getTime() < now){
                    return false
                }else{
                    return true
                }
            },
            message : `dueDate is wrong input`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: undefined
    } 
},{timestamps : true},{versionKey : false});

const Model = mongoose.model('Todo', TodoSchema)
module.exports = Model