var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    owner : {
        type : Array,
        required : true
    },
    status : {
        type : Boolean,
        default : false
    },
    due_date : {
        type : Date,
        required : true
    }
});

// Compile model from schema
var TodoModel = mongoose.model('TodoModel', todoSchema);

module.exports = TodoModel;
