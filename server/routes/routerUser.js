const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/ControllerUser');
const tokenChecking = require('../middlewares/tokenChecking');
const roleChecking = require('../middlewares/roleChecking');
const googleTokenChecking = require('../middlewares/googleTokenChecking');

//register
router.post("/register", ControllerUser.createUser);
//login
router.post("/login", ControllerUser.login);
// login user google
router.post("/oauth2/google", googleTokenChecking, ControllerUser.loginGoogle);
//checking token
router.use(tokenChecking);
// view user
router.get("/", ControllerUser.viewUser);
// create user
router.post("/", roleChecking, ControllerUser.createUser);

module.exports = router;