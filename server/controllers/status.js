const {statusModel} = require('../models/status');

class StatusController {
    static getAllStatuses(req, res, next) {
        statusModel.find()
            .then((statuses) => {
                res.status(200).json({statuses});
            }).catch(next);
    }

    static addNewStatus(req, res, next) {
        statusModel.create(req.body)
            .then((createdStatus) => {
                res.status(201).json({createdStatus});
            }).catch(next);
    }
}

module.exports = {
    StatusController
};
