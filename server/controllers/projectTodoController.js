'use strict'

class ProjectTodoController {

    static createProjectTodo(req, res, next) {
        res.send('add Project todo')
    }

    static updateProjectTodo(req, res, next) {
        res.send('update project todo')
    }

    static changeProjectTodoStatus(req, res, next) {
        res.send('change status')
    }

    static getAllProjectTodo(req, res, next) {
        res.send('get all project todo')
    }
}

module.exports = ProjectTodoController