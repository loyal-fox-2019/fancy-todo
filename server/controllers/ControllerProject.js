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
        if (req.memberStatus !== "admin") throw({
            code: 401
        });

        if (!req.body.email) throw({
            name: "ValidationError",
            errMsg: "email member required"
        });

        User.findOne({
            email: req.body.email
        }).then(responseUser => {
            if (responseUser) {
                if (responseUser._id.toString() === req.user_id.toString()) throw({
                    name: "ValidationError",
                    errMsg: "You already admin for this project"
                });

                if (req.projectMembers.indexOf(responseUser._id) >= 0) throw({
                    name: "ValidationError",
                    errMsg: "Member already registered"
                });

                return Project.updateOne({
                    _id: req.projectId
                }, {
                    $push: {
                        members: responseUser._id
                    }
                })
            } else {
                throw ({
                    code: 404,
                    errMsg: "Email Member"
                })
            }
        }).then(response => {
            res.status(201).json({
                message: "Member successfully added",
                data: response
            });
        }).catch(next);
    }

    static viewProject(req, res, next) {
        Project.find({
            $or: [
                {admin: req.user_id},
                {
                    members: {
                        $in: req.user_id
                    }
                }
            ]
        }).populate('todos')
            .then(response => {
                res.status(201).json({
                    data: response
                })
            }).catch(next)
    }

    static viewProjectTodos(req, res, next) {
        Project.findOne({
            _id: req.projectId
        }).populate('todos')
            .then(response => {
                res.status(201).json({
                    data: response
                })
            }).catch(next)
    }
}

module.exports = ControllerProject;