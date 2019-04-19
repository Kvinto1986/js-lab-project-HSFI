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
    }
});

const Organization = mongoose.model('organization', OrganizationSchema);

module.exports = Organization;