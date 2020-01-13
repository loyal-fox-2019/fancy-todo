"use strict"

const express = require('express');
const router = express.Router();
const UserCtr = require('../controllers/user');

router.post('/register', UserCtr.register);
router.post('/login', UserCtr.login);

module.exports = router;