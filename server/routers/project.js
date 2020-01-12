const express = require('express');
const router = express.Router();
const {ProjectController} = require('../controllers/project');

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.addNewProject);

module.exports = router;