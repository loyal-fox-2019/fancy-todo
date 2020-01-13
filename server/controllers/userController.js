'use strict';

const User = require('../models/user');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

class Usercontroller {
	static findAll(req, res, next) {
		User.find()
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static loginGoogle(req, res, next) {
		let email = req.body.email;
		User.findOne({
			email : email
		})
			.then((user) => {
				let password = 'kodok';
				if (!user) {
					return User.create({
						name     : email,
						email    : email,
						password
					});
				} else {
					return user;
				}
			})
			.then((user) => {
				let { email, _id } = user;
				let token = jwt.generateToken(user);
				res.json({
					status  : 200,
					message : 'login success',
					token   : token,
					user    : {
						email,
						_id
					}
				});
			})
			.catch(next);
	}

	static register(req, res, next) {
		const obj = {
			username : req.body.username,
			email    : req.body.email,
			password : req.body.password
		};
		User.create(obj)
			.then((user) => {
				res.status(200).json({
					message : 'login success'
					// // token   : token,
					// user    : {
					// 	email,
					// 	_id
					// }
				});
			})
			.catch(next);
	}

	static delete(req, res, next) {
		User.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).json({ message: 'berhasil menghapus' });
			})
			.catch(next);
	}

	static login(req, res, next) {
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					next({ message: 'user/password salah' });
				} else {
					if (!bcrypt.checkPassword(req.body.password, user.password)) {
						next({ message: 'user/password salah' });
					} else {
						let myToken = jwt.generateToken(user);
						res.status(200).json({
							message : 'login success',
							name    : user.name,
							email   : user.email,
							token   : myToken
						});
					}
				}
			})
			.catch(next);
	}
}

module.exports = Usercontroller;
