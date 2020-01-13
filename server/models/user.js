'user strict';

const moongoose = require('mongoose');
const Schema = moongoose.Schema;
const bcrypt = require('../helpers/bcrypt');

const UserSchema = new Schema({
	username : {
		type     : String,
		required : [ true, 'username is required' ]
	},
	email    : {
		type     : String,
		required : [ true, 'email is equired' ],
		match    : [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address' ],
		validate : {
			validator : function(value) {
				return User.findOne({ email: value }).then((user) => {
					if (user) {
						return false;
					} else {
						return true;
					}
				});
			},
			message   : 'email already used'
		}
	},
	password : {
		type      : String,
		required  : [ true, 'password is required' ],
		minlength : [ 6, 'minimum password is 6' ]
	}
});

UserSchema.pre('save', async function() {
	let data = this.get('password');
	let newPassword = bcrypt.hashPassword(data);
	this.set({ password: newPassword });
});

const User = moongoose.model('User', UserSchema);

module.exports = User;
