'use strict'

const projectModel = require('../models/project')

class ProjectController {

    static createProject(req, res, next) {
        const projectData = {
            title: req.body.title,
            description: req.body.description,
            master: req.decode.userID,
        }
        projectModel.create(projectData)
            .then(project => {
                res.status(201).json({
                    message: `create project success!`,
                    project
                })
            })
            .catch(next)
    }

    static getAllProject(req, res, next) {
        projectModel.find({
            $or: [
                { master: req.decode.userID },
                {
                    members: { $elemMatch : { $in: req.decode.userID } }
                }
            ]
        })
            .then(projects => {
                res.status(200).json({
                    message: `success`,
                    projects
                })
            })
            .catch(next)
    }

    static updateProject(req, res, next) {
        const projectUpdateData = {
            title: req.body.title,
            description: req.body.description
        }
        projectModel.findOneAndUpdate({ _id: req.params.projectID }, projectUpdateData, { runValidators: true, new: true })
            .then(project => {
                res.status(200).json({
                    message: `update project with projectID ${req.params.projectID} success!`,
                    project
                })
                return 
            })
            .catch(next)
    }

    static addMember(req, res, next) {
        projectModel.findOneAndUpdate({ _id: req.params.projectID }, {
            members: {
                $push: req.body.memberID
            }
        }, { runValidators: true, new: true })
            .then(project => {
                res.status(200).json({
                    message: `add member with memberID ${req.body.memberID} to project with projectID ${req.params.projectID} success`,
                    project
                })
            })
            .catch(next)
    }

    static removeMember(req, res, next) {
        projectModel.findOneAndUpdate({ _id: req.params.projectID }, {
            members: {
                $pull: req.body.memberID
            }
        }, { runValidators: true, new: true })
            .then(project => {
                res.status(200).json({
                    message: `remove member with memberID ${req.body.memberID} to project with projectID ${req.params.projectID} success`,
                    project
                })
            })
            .catch(next)
    }
}

module.exports = ProjectController