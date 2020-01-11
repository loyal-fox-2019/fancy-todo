const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    owner: {
        type: String,
        ref: 'User'
    }
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = {
    projectModel
};
