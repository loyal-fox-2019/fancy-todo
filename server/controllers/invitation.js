const User = require('../models/users')
const Project = require('../models/projects')

class Controller {

    // bagian user
    // router -> PATCH /:projectId
    static rejectInvitation(req, res, next) {
        User.findByIdAndUpdate(req.decoded.id, {
            $pull: { invitation: req.params.projectId }
        })
            .then((user) => {
                res.status(200).json(user)
            }).catch(next);
    }

    // router -> PUT /:projectId
    static acceptInvitation(req, res, next) {
        User.findByIdAndUpdate(req.decoded.id, {
            $pull: { invitation: req.params.projectId }
        }, { new: true })
            .then((user) => {
                return Project.findByIdAndUpdate(req.params.projectId, {
                    $push: { members: req.decoded.id }
                })
            }).then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }

    // masuk bagian project
    // router -> POST /:projectId?username=???
    static inviteUser(req, res, next) {
        User.findOneAndUpdate({ name: req.query.username }, {
            $push: { invitation: req.params.projectId }
        })
            .then((user) => {
                res.status(200).json(user.name)
            }).catch(next);
    }

    // router -> GET /invite/:username
    static userForInvite(req, res, next) {
        let regex = new RegExp(`/${req.params.username}/gi`)
        User.find({ name: regex }).limit(10).sort({ name: 1 }).select('name -id')
        .then((userList) => {
            res.status(200).json(userList)
        }).catch(next);
    }

}

module.exports = Controller