const router = require("express").Router();
const controllerProject = require("../controllers/ControllerProject");
const tokenChecking = require('../middlewares/tokenChecking');

router.use(tokenChecking);
router.post("/", controllerProject.createProject);
router.patch("/:projectName/member/:email", controllerProject.addMember);

module.exports = router;