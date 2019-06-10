const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({

    country: {
        type: String,
        required: true
    }
});

const Country = mongoose.model('country', CountrySchema);

module.exports = Country;