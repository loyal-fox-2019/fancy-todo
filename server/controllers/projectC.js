const Project = require('../models/projects')

class Controller {
    // checked
    static seriouslyAllProject(req, res, next) {
        Project.find().populate('members', 'name')
            .then((projects) => {
                res.status(200).json(projects)
            }).catch(next);
    }

    // 
    static showProjectData(req,res,next){
        Project.findById(req.params.id).populate('members', 'name')
        .then((project) => {
            res.status(200).json(project)
        }).catch(next);
    }

    // checked
    static createProject(req, res, next) {
        console.log(req.body);
        Project.create({
            name: req.body.projectName,
            // owner: req.decoded.name
        })
            .then((project) => {
                return Project.findByIdAndUpdate(project._id, { $push: { members: req.decoded.id } }, { new: true })
                    .populate('members', 'name')
            })
            .then((updated) => {
                res.status(201).json(updated)
            }).catch(next);
    }
    // checked
    static showAllProject(req, res, next) {
        // Project.find({ $or: [{ owner: req.decoded.id }, { members: { $in: [req.decoded.id] } }] })
        // .populate('owner')
        Project.find({ members: { $in: [req.decoded.id] } })
            .populate('members', 'name')
            .then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }


    // static addMember(req, res, next) {
    //     Project.findByIdAndUpdate(req.params.projectId, {
    //         $push: { members: req.body.memberName }
    //     }, { new: true }).populate('members', 'name')
    //         .then((project) => {
    //             res.status(200).json(project)
    //         }).catch(next);
    // }

    static removeMember(req, res, next) {
        console.log(req.body);
        Project.findByIdAndUpdate(req.params.projectId, {
            $pull: { members: req.body.memberId }
        }, { new: true }).populate('members', 'name')
            .then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }

}

module.exports = Controller