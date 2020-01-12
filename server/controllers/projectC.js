const Project = require('../models/projects')

class Controller {

    static createProject(req, res, next) {
        Project.create({
            name: req.body.projectName,
            owner: req.decoded.name
        })
            .then((project) => {
                res.status(201).json(project)
            }).catch(next);
    }

    static addMember(req, res, next) {
        Project.findByIdAndUpdate(req.params.projectId, {
            $push: { members: req.body.memberId }
        }, { new: true })
            .then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }

    static removeMember(req, res, next) {
        Project.findByIdAndUpdate(req.params.projectId, {
            $pull: { members: req.body.memberId }
        }, { new: true })
            .then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }

}

module.exports = Controller