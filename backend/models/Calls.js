const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CallSchema = new Schema({

    operatorName: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    cardSerial: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Call = mongoose.model('call', CallSchema);

module.exports = Call;