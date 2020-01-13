const {Project} = require("../models/modelProject");

const authorization = (req, res, next) => {
    if (!req.params.projectName) throw({
        name: "ValidationError",
        errMsg: "Project name required"
    });

    Project.findOne({
        name: req.params.projectName
    }).then(response => {
        if (response) {
            if (response.admin.toString() === req.user_id.toString()) {
                req.memberStatus = "admin"
            } else if (response.members.indexOf(req.user_id) >= 0) {
                req.memberStatus = "member"
            } else {
                throw({code: 401})
            }
            req.projectId = response._id;
            req.projectAdmin = response.admin;
            req.projectMembers = response.members;
            next()
        } else {
            throw ({
                code: 404,
                errMsg: "Project"
            })
        }
    }).catch(next)
};

module.exports = authorization;