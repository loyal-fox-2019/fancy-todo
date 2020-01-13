'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	name        : {
		type     : String,
		required : [ true, 'name is required' ]
	},
	description : {
		type     : String,
		required : [ true, 'description is required' ]
	},
	status      : {
		type    : String,
		default : 'not completed'
	},
	due_date    : {
		type     : Date,
		required : [ true, 'due_date is required' ]
	},
	userId      : {
		type : Schema.Types.ObjectId,
		ref  : 'User'
	}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
