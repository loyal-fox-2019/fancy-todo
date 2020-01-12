'use strict'

class ProjectController {

    static createProject(req, res, next) {
        res.send('create project')
    }

    static getProject(req, res, next) {
        res.send('get project')
    }

    static updateProject(req, res, next) {
        res.send('update project')
    }

    static addMember(req,res,next) {
        res.send('add member')
    }
}

module.exports = ProjectController