'use strict';

const jwt = require('jsonwebtoken');

function generateToken(user) {
	let resToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
	return resToken;
}

function verifyToken(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
	generateToken,
	verifyToken
};
