const router = require("express").Router();
const controllerProject = require("../controllers/ControllerProject");
const authorization = require("../middlewares/authorization");
const tokenChecking = require('../middlewares/tokenChecking');

router.use(tokenChecking);
router.post("/", controllerProject.createProject);
router.patch(
    "/:projectName/member",
    authorization,
    controllerProject.addMember
);
router.get("/", controllerProject.viewProject);
router.get("/:projectName",
    authorization,
    controllerProject.viewProjectTodos
);

module.exports = router;