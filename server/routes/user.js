const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

// sign in
router.post('/sign-in', UserController.signIn);

// register
// router.post('/register', UserController.register);

module.exports = router;
