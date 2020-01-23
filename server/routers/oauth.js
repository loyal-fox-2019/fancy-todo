const express = require("express");
const router = express.Router();
const {OAuthController} = require("../controllers/oauth");

router.post("/login", OAuthController.login);

module.exports = router;
