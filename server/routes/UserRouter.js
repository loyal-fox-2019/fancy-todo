'use strict';

const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googlesignin', UserController.googleSignIn);

module.exports = router;