'use strict';
const { Project, Todo } = require('../models');

class ProjectController {
  static async createProject(req, res, next) {
    const { _id } = req.decoded;
    const { name } = req.body;
    const newProject = {
      name,
      members: [_id],
    };
    try {
      const project = await Project.create(newProject);
      res.status(201).json(project);
    } catch (err) {
      next(err);
    }
  }

  static async addMember(req, res, next) {
    const { projectId } = req.params;
    const { usersId } = req.body;
    try {
      const members = await Project.updateOne({ _id: projectId }, { $push: { members: { $each: usersId } } })
      res.status(202).json({ message: 'User added to project' })
    } catch (err) {
      next(err);
    };
  }

  static viewProject(req, res, next) {
    const { projectId } = req.params;
    const detail = {};
    Project
      .findById(projectId)
      .populate({ path: 'members', select: '-password -email -_id' })
      .then((success) => {
        detail.project = success;
        return Todo.find({ projectId })
      })
      .then((todos) => {
        detail.todos = todos;
        res.status(200).json(detail);
      })
      .catch(next);
  }

  static listProject(req, res, next) {
    if (req.query.p) {
      Project
        .find({ name: { $regex: req.query.p, $options: 'i' } })
        .populate({ path: 'members', select: '-password -email -_id' })
        .then((project) => {
          res.status(200).json(project)
        })
        .catch(next);
    } else {
      Project
        .find({ members: { $in: [ req.decoded._id ] } })
        .populate({ path: 'members', select: '-password -_id -email' })
        .then((projects) => {
          res.status(200).json(projects);
        })
        .catch(next);
    }
  }
};

module.exports = ProjectController;
