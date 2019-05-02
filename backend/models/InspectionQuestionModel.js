const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InspectionQuestionsSchema = new Schema({

    question: {
        type: String,
        required: true
    }
});

const InspectionQuestionModel = mongoose.model('inspectionQuestions', InspectionQuestionsSchema);

module.exports = InspectionQuestionModel;