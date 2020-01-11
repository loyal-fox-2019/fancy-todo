const {Project} = require('../models/modelProject');
const {User} = require('../models/modelUser');

class ControllerProject {
    static createProject(req, res, next) {
        Project.create({
            name: req.body.name,
            description: req.body.description,
            admin: req.user_id
        }).then(response => {
            res.status(201).json({
                message: "Project successfully created",
                data: response
            });
        }).catch(next)
    }

    static addMember(req, res, next) {
        if (!req.params.projectName || !req.params.email) throw({
            name: "ValidationError",
            errMsg: "Project name/ email member required"
        });

        Project.findOne({
            name: req.params.projectName
        }).then(responseProject => {
            if (responseProject) {
                return User.findOne({
                    email
                })
            } else {
                throw ({
                    code: 404,
                    errMsg: "Project"
                })
            }
        }).catch(next)


        Project.update({
            _id: req.params.projectId
        })
    }
}

module.exports = ControllerProject;