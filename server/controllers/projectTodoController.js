'use strict'

const projectTodoModel = require('../models/projectTodo')

class ProjectTodoController {

    static createProjectTodo(req, res, next) {
        const projectTodoData = {
            projectID: req.params.projectID,
            assignedTo: req.body.userID,
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
        projectTodoModel.create(projectTodoData)
            .then(projectTodo => {
                res.status(201).json({
                    message: `Create Project Todo on Project ${req.params.projectID} success`,
                    projectTodo
                })
            })
            .catch(next)
    }

    static updateProjectTodo(req, res, next) {
        const projectTodoUpdateData = {
            assignedTo: req.body.userID,
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
        projectTodoModel.findOneAndUpdate({ _id: req.params.projectTodoID }, projectTodoUpdateData, { runValidators: true, new: true })
            .then(projectTodo => {
                res.status(200).json({
                    message: `Update Project Todo on With Project Todo ID ${req.params.projectTodoID} success`,
                    projectTodo
                })
            })
            .catch(next)
    }

    static getAllProjectTodo(req, res, next) {
        projectTodoModel.find({
            $and: [
                { projectID: req.params.projectID },
                { assignedTo: req.decode.userID }
            ]
        })
            .then(projectTodos => {
                res.status(200).json({
                    message: `success`,
                    projectTodos
                })
            })
            .catch(next)
    }
}

module.exports = ProjectTodoController