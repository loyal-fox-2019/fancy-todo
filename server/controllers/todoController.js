'use strict';

const Todo = require('../models/todo');
const User = require('../models/user');
const mail = require('nodemailer');

var transporter = mail.createTransport({
	service : 'gmail',
	auth    : {
		user : 'fancytodo99@gmail.com',
		pass : 'kudaliar'
	}
});

class TodoController {
	static findAll(req, res, next) {
		Todo.find({ userId: req.user._id })
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static create(req, res, next) {
		const obj = {
			name        : req.body.name,
			description : req.body.description,
			due_date    : req.body.due_date,
			userId      : req.user._id
		};
		let todo = null;
		Todo.create(obj)
			.then((result) => {
				todo = result;
				return User.findById(req.user._id);
			})
			.then((user) => {
				const mailOptions = {
					from    : 'fancytodo99@gmail.com',
					to      : `${user.email}`,
					subject : `New To Do: ${obj.name}`,
					text    : `Due date is : ${obj.due_date}`
				};
				return transporter.sendMail(mailOptions);
			})
			.then(() => {
				res.status(200).json({ message: 'success' });
			})
			.catch(next);
	}

	static delete(req, res, next) {
		Todo.deleteOne({ _id: req.params.id })
			.then((result) => {
				res.status(200).json(result);
			})
			.catch(next);
	}

	static update(req, res, next) {
		const obj = {
			status : req.body.status
		};
		Todo.updateOne({ _id: req.params.id }, obj)
			.then((todo) => {
				res.status(200).json(todo);
			})
			.catch(next);
	}
}

module.exports = TodoController;
