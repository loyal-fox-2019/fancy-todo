const express = require("express");
const router = express.Router();
const {OAuthController} = require("../controllers/oauth");

// middleware that is specific to this router
router.post("/login", OAuthController.login);

module.exports = router;
