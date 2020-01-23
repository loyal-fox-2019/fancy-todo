const express = require("express");
const router = express.Router();
const {OcrController} = require("../controllers/ocr");

router.post("/", OcrController.detect);

module.exports = router;
