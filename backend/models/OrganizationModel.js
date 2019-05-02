const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({

    organization: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    GPS: {
        type: Object,
        required: true
    }
});

const OrganizationModel = mongoose.model('organization', OrganizationSchema);

module.exports = OrganizationModel;