const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InspectionQuestionsSchema = new Schema({

    question: {
        type: String,
        required: true
    }
});

const InspectionQuestions = mongoose.model('inspectionQuestions', InspectionQuestionsSchema);

module.exports = InspectionQuestions;