const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    name: {
        type: String
    }
});

const statusModel = mongoose.model('Status', statusSchema);

module.exports = {
    statusModel
};
