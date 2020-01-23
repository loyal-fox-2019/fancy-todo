const express = require("express");
const router = express.Router();
const {StatusController} = require("../controllers/status");

// status
router.get("/", StatusController.getAllStatuses);
router.post("/", StatusController.addNewStatus);

module.exports = router;
