const User = require('../models/users')
const Project = require('../models/projects')

class Controller {

    // bagian user
    // router -> PATCH /:projectId
    // checked
    static rejectInvitation(req, res, next) {
        User.findByIdAndUpdate(req.decoded.id, {
            $pull: { invitation: req.params.projectId }
        }, { new: true })
            .then((user) => {
                res.status(200).json(user)
            }).catch(next);
    }

    // router -> PUT /:projectId
    // checked
    static acceptInvitation(req, res, next) {
        User.findByIdAndUpdate(req.decoded.id, {
            $pull: { invitation: req.params.projectId }
        }, { new: true })
            .then((user) => {
                return Project.findByIdAndUpdate(req.params.projectId, {
                    $push: { members: req.decoded.id }
                }, { new: true })
            }).then((project) => {
                res.status(200).json(project)
            }).catch(next);
    }

    // masuk bagian project
    // router -> POST /:projectId?username=???
    // checked
    static inviteUser(req, res, next) {
        User.findOneAndUpdate({ email: req.query.email }, {
            $push: { invitation: req.params.projectId }
        })
            .then((user) => {
                if (!user) throw ({ status: 404, msg: 'User not found' })
                else res.status(200).json(user.name)
            }).catch(next);
    }

    // router -> GET /invite/:username
    // checked but not used
    static userForInvite(req, res, next) {
        let regexQuery = new RegExp(req.params.username)
        // console.log(regexQuery);
        User.find({ name: { $regex: regexQuery, $options: 'i' } })
            // .limit(10).sort({ name: 1 })
            .then((userList) => {
                res.status(200).json(userList)
            }).catch(next);
    }

    // static userForInvite(req, res, next) {
    //     User.find({ email: req.body.invitatedUser })
    //         .then((user) => {
    //             if(user)
    //             res.status(200).json(userList)
    //         }).catch(next);
    // }

}

module.exports = Controller