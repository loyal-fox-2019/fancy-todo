'use strict'

class ProjectController {

    static createProject(req, res, next) {
        res.send('create project')
    }

    static getAllProject(req, res, next) {
        res.send('get project')
    }

    static updateProject(req, res, next) {
        res.send('update project')
    }

    static addMember(req, res, next) {
        res.send('add member')
    }

    static removeMember(req, res, next) {
        res.send('remove member')
    }
}

module.exports = ProjectController