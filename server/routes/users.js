const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", userController.signup);

module.exports = router;
