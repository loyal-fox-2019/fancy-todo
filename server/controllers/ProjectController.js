const Project = require('../models/Project')
class ProjectController {

    static create(req, res, next){
        let members = [req.userId]
        console.log(req.body)
        if (req.body.members) {
            members = members.concat(req.body.members)
        }
        Project
            .create({
                name: req.body.name,
                description: req.body.description,
                owner: req.userId,
                members: members,
            })
            .then(project => {
                res.status(201).json({
                    project
                })
            })
            .catch(next)
    }

    static findAll(req, res, next){
        Project
            .find({
                members: {
                    $in: [req.userId]
                }
            })
            .populate({
                path: 'members',
                select: 'username'
            })
            .populate({
                path: 'owner',
                select: 'username'
            })
            .then(projects => {
                res.status(200).json({
                    projects
                })
            })
            .catch(next)
    }

    static findOne(req, res, next){
        Project
            .findOne({
                _id: req.params.id,
                members: {
                    $in: [req.userId]
                }
            })
            .populate({
                path: 'members',
                select: 'username'
            })
            .populate({
                path: 'owner',
                select: 'username'
            })
            .then(project => {
                res.status(200).json({
                    project
                })
            })
            .catch(next)
    }

    static update(req, res, next){
        Project
            .updateOne({
                _id: req.params.id,
                members: {
                    $in: [req.userId]
                }
            }, {
                name: req.body.name,
                description: req.body.description,
            })
            .then(project => {
                res.status(200).json({
                    project
                })
            })
            .catch(next)
    }

    static addMember(req, res, next){
        Project
            .updateOne({
                _id: req.params.id,
                members: {
                    $in: [req.userId]
                }
            }, {
                $push: {
                    members: [req.body.members]
                }
            })
            .then(project => {
                res.status(200).json({
                    project
                })
            })
            .catch(next)
    }

    static delMember(req, res, next){
        Project
            .updateOne({
                _id: req.params.id,
                members: {
                    $in: [req.userId]
                }
            }, {
                $pullAll: {
                    members: [req.body.members]
                }
            })
            .then(project => {
                res.status(200).json({
                    project
                })
            })
            .catch(next)
    }

    static delete(req, res, next){
        Project
            .deleteOne({
                _id: req.params.id,
                owner: req.userId
            })
            .then(project => {
                res.status(200).json({
                    project
                })
            })
            .catch(next)
    }
}

module.exports = ProjectController