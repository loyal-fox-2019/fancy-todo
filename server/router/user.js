'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.findAll);
router.post('/register', UserController.register);
router.post('/login-google', UserController.loginGoogle);
router.post('/login', UserController.login);
router.delete('/:id', UserController.delete);

module.exports = router;
