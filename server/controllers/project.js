const {projectModel} = require('../models/project');

class ProjectController {
    static getAllProjects(req, res, next) {
        projectModel.find().populate(['owner'])
            .then((projects) => {
                res.status(200).json({projects});
            }).catch(next);
    }

    static addNewProject(req, res, next) {
        projectModel.create({
            name: req.body.name,
            description: req.body.description,
            owner: ObjectId(req.body.owner)
        })
            .then((createdProject) => {
                res.status(201).json({createdProject});
            }).catch(next);
    }
}

module.exports = {
    ProjectController
};
