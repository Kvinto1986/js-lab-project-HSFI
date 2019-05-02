const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InspectionSchema = new Schema({
    operatorName:{
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerPhoto:{
        default:'none',
        type: String,
    },
    license:{
        type: String,
        required: true
    },

    location: {
        type: Object,
        required: true
    },
    foodGroup: {
        type: String,
        required: true
    },
    questions:{
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Inspection = mongoose.model('inspection', InspectionSchema);

module.exports = Inspection;